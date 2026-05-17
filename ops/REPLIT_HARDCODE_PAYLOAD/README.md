# SZL Holdings — Replit Hardcode Payload (Consolidated)

**One single payload.** Combines the prior `REPLIT_OPERATOR_PAYLOAD` (5-wave merge plan + verifiers) with the full Doctrine V6 Close-Out: 4 PhD pod reports, 17 named defects (D1–D18 with D17 corrected), defect ratchet, the **full 16-figure anatomy bundle (brain / heart / wires / full body + 4 more, PDF + PNG)**, the **DOI manifest (12/12 verified)**, and the **OpenSSF Scorecard → 10/10 plan with the operator script ready to run**.

### Confirmed clean (no operator action required)

- ✅ **12/12 Zenodo DOIs resolve HTTP 200** — see `DOI_MANIFEST.md` + `scripts/check_zenodo_dois.sh`
- ✅ **All 14 repos: 0 Dependabot high/critical, 0 secret-scan alerts**
- ✅ **Scanner identity verified:** every code-scanning alert is from **OpenSSF Scorecard** (your own configured workflow). No external scanners. No attacks.
- ✅ **D1 abstract honesty patch committed** to ouroboros-thesis PR #44 (sorry-count = 0 → sorry-count = 4 with file:line citations)
- ✅ **3 new draft PRs** for D15/D16 fixes: agi-forecast#9, ouroboros#33, ouroboros-thesis#47
- ✅ **16 anatomy figures** bundled under `anatomy/` — brain, heart, wires, full body, nervous, skeleton, blood/immune, body graph (PDF + PNG each)

### What's in this payload

**Operator:** Stephen P. Lutar Jr. — `stephen@szlholdings.com` — ORCID `0009-0001-0110-4173`
**Org:** [szl-holdings](https://github.com/szl-holdings)
**Doctrine:** V6 (public-only, 9-axis Λ ≥ 0.90 conjunctive MIN, license allowlist Apache-2.0 / MIT / BSD-3 / CC-BY)
**License:** Apache-2.0 (this payload). See SPDX headers on every script.

This payload boots on [Replit](https://replit.com) (or any bash + nix shell) and lets the operator verify every push, audit every doctrine claim, refresh live PR state, and execute the documented 5-wave merge plan — all using **the right places** (GitHub CLI + REST API + Zenodo public records API), not screen scraping.

---

## Quick Start

1. **Import this repo into a fresh Replit.** Replit auto-detects `.replit` and `replit.nix`.
2. Click **Run**. Bootstrap will:
   - Verify `gh`, `jq`, `curl`, `git` are present
   - Confirm GitHub auth (prompts to `gh auth login` if not)
   - Refresh `data/all_open_prs.json` from live GitHub
   - Print the verifier menu

3. From the shell:
   ```bash
   ./scripts/verify_all.sh          # full sweep (6 checks)
   ```

Every report lands in `out/` as Markdown + JSON.

---

## What this payload verifies

| # | Check | Script | Source of truth |
|---|-------|--------|-----------------|
| 1 | Open PRs across all 16 repos | `pull_pr_state.sh` | `gh pr list --state open --json …` |
| 2 | CI rollup per PR | `check_ci_status.sh` | `statusCheckRollup` from GitHub GraphQL |
| 3 | Doctrine V6 sweep (forbidden patterns, canonical author, Λ ≥ 0.90, SHA-pinned actions) | `check_doctrine.sh` | `gh pr view --json title,body,commits` + `gh pr diff` |
| 4 | 16-figure anatomy bundle present on every relevant branch | `verify_anatomy_pushes.sh` | `gh api /repos/{org}/{repo}/contents/docs/anatomy?ref={branch}` |
| 5 | DOI-title CI gate fix present in 3 PRs + live concept-DOI follow works | `verify_doi_gate_fix.sh` | `gh pr view --json commits` + `curl -sSL` against Zenodo records API |
| 6 | All 12 Zenodo DOIs return HTTP 200 | `check_zenodo_dois.sh` | `curl -sIL https://doi.org/10.5281/zenodo.{id}` |
| 7 | **PhD defect ratchet (D1–D18)** — fails if any of the 18 known defects regress | `check_phd_defects.sh` | `gh api` against live repo trees, lakefile, Lean sources, workflow files |

---

## Layout

```
REPLIT_OPERATOR_PAYLOAD/
├── .replit                # Replit run config
├── replit.nix             # Nix deps (gh, jq, curl, git, python311)
├── bootstrap.sh           # Boot dashboard + prereq check
├── README.md              # This file
├── scripts/
│   ├── _lib.sh                       # Shared identity, repo list, doctrine patterns
│   ├── pull_pr_state.sh              # Refresh data/all_open_prs.json
│   ├── verify_all.sh                 # Run every check
│   ├── check_ci_status.sh            # CI rollup per PR
│   ├── check_doctrine.sh             # Doctrine V6 sweep
│   ├── verify_anatomy_pushes.sh      # Anatomy figures present
│   ├── verify_doi_gate_fix.sh        # DOI gate fix landed + live test
│   ├── check_zenodo_dois.sh          # 12 Zenodo DOIs reachable
│   ├── check_phd_defects.sh          # D1–D18 ratchet (NEW)
│   └── merge_wave.sh                 # Operator-only: execute Wave 1–5
├── data/
│   ├── all_open_prs.json             # Live PR snapshot (refreshed by bootstrap)
│   ├── cto_pushes.json               # Every push CTO made in audit sweeps
│   └── cto_prs_opened_recent.json    # Categorized PRs by wave
├── docs/
│   ├── UNIFIED_OPERATOR_HANDOFF.md   # 5-wave merge plan (canonical)
│   ├── OPERATOR_QUICKSTART.md        # Fast path for the operator
│   ├── CTO_AUTHORITY.md              # What CTO can / cannot do
│   ├── ANATOMY_SWEEP_REPORT.md       # 16-figure verification report
│   ├── DOI_GATE_POSTMORTEM.md        # Root cause + fix
│   └── doi-title-gate.fixed.yml      # The fixed workflow (golden copy)
├── phd_pods/                         # NEW — 4 PhD pod reports
│   ├── dev_pod_report.md             # Dev (596 lines): ouroboros C+, sentra D, vsp-otel F, agi-forecast F
│   ├── ml_pod_report.md              # ML (518 lines): 9 axes underspecified, forecast gauge = dashboard
│   ├── math_pod_report.md            # Math: 4 real sorries, TH8 not in lakefile, sha256_inj false, weight_eq tautology
│   └── systems_pod_report.md         # Systems (535 lines): vsp-otel + agi-forecast empty, ouroboros has zero @opentelemetry/* deps
├── truth_audit/                      # NEW — Doctrine V6 truth record
│   └── TRUTH_AUDIT_RECORD.md         # 255 lines, D1–D18 with file:line citations, what was claimed vs what is real
└── out/                  # Generated reports (gitignored)
```

---

## The 18 Defects (D1–D18) — short form

Full detail in `truth_audit/TRUTH_AUDIT_RECORD.md`. Mapped to ratchet checks in `scripts/check_phd_defects.sh`.

**Critical (block ready-for-review):**
- **D1** — 4 real sorries in `Lutar/Bound.lean` (L25, L30) and `Lutar/Uniqueness.lean` (L36, L42); PR #44 abstract claims fewer
- **D2** — `TH8/` directory is not in `lakefile.lean`; PRs frame it as a closed theorem
- **D3** — `sha256_inj` is taken as an axiom but is mathematically false (SHA-256 is not injective)
- **D4** — Lean Λ uses geometric mean; production runtime Λ is conjunctive `min`. Two different Λs called the same name.
- **D5** — `vsp-otel` and `agi-forecast` repos are README-only; PRs frame them as implementations

**High:**
- **D6** — `runLoop` has zero integration tests
- **D7** — `Array(9).fill(0.7)` synthetic Λ in monitoring dashboard
- **D8** — no `AbortSignal` plumbed through `runLoop`
- **D9** — GAP-AXIS: two incompatible 9-axis enumerations exist across docs (ouroboros#31, #32)
- **D10** — "forecast gauge" is a monitoring dashboard, not a forecaster
- **D11** — `weight_eq` reduces to a tautology `1/k = 1/k`
- **D12** — `TH8b_grade_one_unique` proves `True` via `trivial`; not a uniqueness theorem
- **D13** — `Term.instantiate` is a stub returning input unchanged
- **D14** — `sentra` is doc-only; no implementation

**Low–medium:**
- **D15** — Hardcoded May 2026 benchmarks in `agi-forecast` README
- **D16** — "SZL Consulting LTD" drift in `runtime-contract.v2.json` (canonical is SZL Holdings)
- **D17** — `.github` SHA-pin policy exempts `szl-holdings/*` (supply-chain regression)
- **D18** — `branch_protection_rule` Scorecard probe bug on `ouroboros-thesis`

---

## Doctrine V6 Truth-Correction Comments Posted (operator record)

All comments authored as Stephen P. Lutar Jr. / `stephen@szlholdings.com`.

### Sweep 1 (initial)
- [lutar-lean#18](https://github.com/szl-holdings/lutar-lean/pull/18#issuecomment-4467391875) — 7-sorry close framing is false
- [ouroboros-thesis#44](https://github.com/szl-holdings/ouroboros-thesis/pull/44#issuecomment-4467393182) — abstract overclaims (D1)
- [vsp-otel#4](https://github.com/szl-holdings/vsp-otel/pull/4#issuecomment-4467395214) — empty repo (D5)
- [agi-forecast#4](https://github.com/szl-holdings/agi-forecast/pull/4#issuecomment-4467395270) — empty repo (D5)
- [ouroboros#31 + #32](https://github.com/szl-holdings/ouroboros/pull/31#issuecomment-4467395315) — runLoop untested, Λ synthetic, GAP-AXIS (D6, D7, D9)
- [ouroboros-thesis#46](https://github.com/szl-holdings/ouroboros-thesis/pull/46#issuecomment-4467395463) — anatomy is doc-only footnote

### Sweep 2 (final close-out)
- **[agi-forecast#9](https://github.com/szl-holdings/agi-forecast/pull/9)** — D15 README snapshot-honesty banner (draft PR)
- **[ouroboros#33](https://github.com/szl-holdings/ouroboros/pull/33)** — D16 `SZL Consulting LTD` → `SZL Holdings` in runtime-contract.v3.json (draft PR)
- **[ouroboros-thesis#47](https://github.com/szl-holdings/ouroboros-thesis/pull/47)** — D16 same fix across 3 runtime-contract files (draft PR)
- [lutar-lean#18 consolidated](https://github.com/szl-holdings/lutar-lean/pull/18#issuecomment-4467522329) — D2/D3/D11/D12 specific Lean defects
- [ouroboros#31 GAP-AXIS](https://github.com/szl-holdings/ouroboros/pull/31#issuecomment-4467525726) + [ouroboros-thesis#44 GAP-AXIS](https://github.com/szl-holdings/ouroboros-thesis/pull/44#issuecomment-4467525771) — D9 per-axis diff: **5 of 9 names differ**, one with reversed polarity
- [sentra#22](https://github.com/szl-holdings/sentra/pull/22#issuecomment-4467521037) + [sentra#20](https://github.com/szl-holdings/sentra/pull/20#issuecomment-4467521090) — D14 doc-only framing
- [.github#37](https://github.com/szl-holdings/.github/pull/37#issuecomment-4467527160) — **D17 CORRECTION**: downgraded to non-defect (false-positive) after re-verification

---

## Authentication

This payload uses GitHub's **official** APIs through `gh`. No browser scraping, no flaky page parsing.

Required scopes for a fine-grained PAT:
- `repo` (full — for private repos in the org)
- `read:org`
- `workflow`
- `security_events` (for code-scanning + Dependabot reads)

Set as:
```bash
export GH_TOKEN=ghp_xxx
```

Or interactively:
```bash
gh auth login --git-protocol https --web
```

The bootstrap checks `gh api /user` (more reliable than `gh auth status` which is sometimes stale).

---

## CTO Authority Boundary

This payload **can**: open draft PRs, commit, push branches, comment, close superseded PRs, add labels, request CI re-runs.

This payload **cannot**: force-push, edit branch protection, mint Zenodo DOIs, submit to arXiv, publish npm, delete anything, change org/profile/crons, spend money, hand out credentials, mark draft PRs ready-for-review, or merge.

The `merge_wave.sh` script refuses to run without `--i-am-the-operator` and defaults to dry-run. The operator must explicitly pass `--execute` to actually merge.

See `docs/CTO_AUTHORITY.md` for the full table.

---

## Live State Snapshot (at time of payload build)

- **58 open PRs** across 16 repos
- **16/16 repos green** on `main`
- **0 stale branches** (>90 days)
- **0 Dependabot high/critical** alerts
- **Scorecard avg 6.59/10** (projected ~7.5 after Wave 1+2)
- **8 CTO pushes** this session, **30 PRs opened** by CTO across audit sweeps
- **DOI gate fix** pushed and CI-passing on ouroboros#28 and ouroboros-thesis#38; szl-trust#11 has a separate failing root cause

---

## Citations

- GitHub REST: [docs.github.com/en/rest](https://docs.github.com/en/rest)
- GitHub CLI: [cli.github.com/manual](https://cli.github.com/manual/)
- Zenodo REST: [developers.zenodo.org](https://developers.zenodo.org/)
- OpenSSF Scorecard: [securityscorecards.dev](https://securityscorecards.dev/)
- SPDX License List: [spdx.org/licenses](https://spdx.org/licenses/)
