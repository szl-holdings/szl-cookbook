#!/usr/bin/env bash
# SPDX-License-Identifier: Apache-2.0
# check_zenodo_dois.sh — Ping all 12 known Zenodo DOIs and report status.

. "$(dirname "$0")/_lib.sh"
require_curl

DOIS=(
  19867281 19934129 19983066 20020841 20020846 20020845
  20020848 20020849 20053148 20053163 20119582 20162352
)

OUT="$OUT_DIR/zenodo_doi_status.md"
{
  echo "# Zenodo DOI Reachability"
  echo
  echo "Generated: $(date -u +%FT%TZ)"
  echo
  echo "| DOI | HTTP | Status |"
  echo "|-----|------|--------|"
} > "$OUT"

FAILS=0
for id in "${DOIS[@]}"; do
  code=$(curl -sIL -o /dev/null -w '%{http_code}' "https://doi.org/10.5281/zenodo.$id" 2>/dev/null || echo "000")
  if [ "$code" = "200" ]; then
    ok "zenodo.$id -> $code"
    printf '| %s | %s | ✅ |\n' "$id" "$code" >> "$OUT"
  else
    err "zenodo.$id -> $code"
    printf '| %s | %s | ❌ |\n' "$id" "$code" >> "$OUT"
    FAILS=$((FAILS+1))
  fi
done

log "Report: $OUT"
[ "$FAILS" -eq 0 ]
