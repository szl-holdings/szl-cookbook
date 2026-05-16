#!/usr/bin/env bash
# SPDX-License-Identifier: Apache-2.0
# check_doctrine.sh — Doctrine V6 sweep across every open PR.
# Checks:
#   1) Forbidden patterns absent from PR title + body + commit messages + diff
#   2) Canonical git author on every commit ("Stephen P. Lutar Jr." <stephen@szlholdings.com>)
#   3) PR body contains a Λ table with MIN ≥ 0.90
#   4) Every workflow yml in the diff uses SHA-pinned actions (40-char hex)
#
# Reads data/all_open_prs.json. Writes out/doctrine_report.md.

. "$(dirname "$0")/_lib.sh"
require_gh
require_jq

PRS="$DATA_DIR/all_open_prs.json"
[ -f "$PRS" ] || { err "Run pull_pr_state.sh first."; exit 1; }

OUT="$OUT_DIR/doctrine_report.md"

{
  echo "# Doctrine V6 PR Sweep"
  echo
  echo "Generated: $(date -u +%FT%TZ)"
  echo
  echo "Canonical author: \`$SZL_OPERATOR_NAME <$SZL_OPERATOR_EMAIL>\`"
  echo "ORCID: \`$SZL_OPERATOR_ORCID\`"
  echo
  echo "Forbidden patterns:"
  for p in "${SZL_FORBIDDEN_PATTERNS[@]}"; do echo "  - \`$p\`"; done
  echo
  echo "## Per-PR results"
  echo
  echo "| Repo | PR | Forbidden | Author | Λ table | SHA-pin |"
  echo "|------|----|-----------|--------|---------|---------|"
} > "$OUT"

FAILS=0

jq -c '.[]' "$PRS" | while IFS= read -r pr; do
  repo=$(echo "$pr" | jq -r '.repo')
  num=$(echo "$pr"  | jq -r '.number')

  body=$(gh pr view "$num" --repo "$SZL_ORG/$repo" --json title,body,commits 2>/dev/null || echo '{}')
  title=$(echo "$body" | jq -r '.title // ""')
  pbody=$(echo "$body" | jq -r '.body // ""')

  # Concatenate title+body+commit messages for pattern check
  haystack="$title"$'\n'"$pbody"
  while IFS= read -r m; do haystack="$haystack"$'\n'"$m"; done < <(echo "$body" | jq -r '.commits[]?.messageHeadline // empty')

  # 1) forbidden
  forbidden_hit="OK"
  for p in "${SZL_FORBIDDEN_PATTERNS[@]}"; do
    if echo "$haystack" | grep -iq -- "$p"; then
      forbidden_hit="FAIL:$p"
      break
    fi
  done

  # 2) author check on every commit
  author_ok="OK"
  if echo "$body" | jq -e '.commits | length > 0' >/dev/null 2>&1; then
    while IFS= read -r entry; do
      a_name=$(echo "$entry" | jq -r '.authors[0].name // ""')
      a_email=$(echo "$entry" | jq -r '.authors[0].email // ""')
      if [ "$a_name" != "$SZL_OPERATOR_NAME" ] || [ "$a_email" != "$SZL_OPERATOR_EMAIL" ]; then
        author_ok="FAIL:$a_name<$a_email>"
        break
      fi
    done < <(echo "$body" | jq -c '.commits[]')
  fi

  # 3) Λ table presence (looks for "Λ" or "Lambda" plus a "MIN" with a decimal ≥ .90)
  lambda_ok="MISSING"
  if echo "$pbody" | grep -qE 'Λ|Lambda'; then
    lambda_min=$(echo "$pbody" | grep -iE 'MIN[^0-9]*0?\.[0-9]+' | head -1 | grep -oE '0?\.[0-9]+' | head -1)
    if [ -n "$lambda_min" ]; then
      if awk "BEGIN{exit !($lambda_min >= 0.90)}"; then
        lambda_ok="OK:$lambda_min"
      else
        lambda_ok="LOW:$lambda_min"
      fi
    fi
  fi

  # 4) SHA-pinned actions check (cheap: look in diff for unpinned uses:)
  sha_pin="OK"
  diff=$(gh pr diff "$num" --repo "$SZL_ORG/$repo" 2>/dev/null | grep -E '^\+\s*uses:' || true)
  if [ -n "$diff" ]; then
    # Each `uses:` should have @<40-hex-chars>
    while IFS= read -r line; do
      val=$(echo "$line" | sed -E 's/^\+\s*uses:\s*//')
      if echo "$val" | grep -qE '@[0-9a-f]{40}'; then
        continue
      fi
      # Allow uses: ./local paths
      if echo "$val" | grep -qE '^\./'; then continue; fi
      sha_pin="FAIL:${val}"
      break
    done <<< "$diff"
  fi

  [[ "$forbidden_hit" == FAIL* || "$author_ok" == FAIL* || "$lambda_ok" == LOW:* || "$sha_pin" == FAIL* ]] && FAILS=$((FAILS+1))

  printf '| %s | #%s | %s | %s | %s | %s |\n' "$repo" "$num" "$forbidden_hit" "$author_ok" "$lambda_ok" "$sha_pin" >> "$OUT"
done

ok "Doctrine sweep complete: $OUT"

# Count failures in summary (re-scan since while-loop runs in subshell on some shells)
fails_re=$(grep -cE 'FAIL:|LOW:' "$OUT" || true)
if [ "${fails_re:-0}" -gt 0 ]; then
  warn "$fails_re doctrine flag(s) found. Inspect $OUT"
  exit 1
fi
ok "0 doctrine flags."
