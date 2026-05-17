# DOI Manifest — SZL Holdings Zenodo Ledger

**Last verified:** 2026-05-16 EDT — `./scripts/check_zenodo_dois.sh`
**Status:** **12/12 DOIs resolve HTTP 200** ✅

| # | DOI | URL | Status |
|---|-----|-----|--------|
| 1 | 10.5281/zenodo.19867281 | <https://doi.org/10.5281/zenodo.19867281> | ✅ 200 |
| 2 | 10.5281/zenodo.19934129 | <https://doi.org/10.5281/zenodo.19934129> | ✅ 200 |
| 3 | 10.5281/zenodo.19983066 | <https://doi.org/10.5281/zenodo.19983066> | ✅ 200 |
| 4 | 10.5281/zenodo.20020841 | <https://doi.org/10.5281/zenodo.20020841> | ✅ 200 |
| 5 | 10.5281/zenodo.20020845 | <https://doi.org/10.5281/zenodo.20020845> | ✅ 200 |
| 6 | 10.5281/zenodo.20020846 | <https://doi.org/10.5281/zenodo.20020846> | ✅ 200 |
| 7 | 10.5281/zenodo.20020848 | <https://doi.org/10.5281/zenodo.20020848> | ✅ 200 |
| 8 | 10.5281/zenodo.20020849 | <https://doi.org/10.5281/zenodo.20020849> | ✅ 200 |
| 9 | 10.5281/zenodo.20053148 | <https://doi.org/10.5281/zenodo.20053148> | ✅ 200 (Lean baseline) |
| 10 | 10.5281/zenodo.20053163 | <https://doi.org/10.5281/zenodo.20053163> | ✅ 200 |
| 11 | 10.5281/zenodo.20119582 | <https://doi.org/10.5281/zenodo.20119582> | ✅ 200 (ρ-closure benchmark) |
| 12 | 10.5281/zenodo.20162352 | <https://doi.org/10.5281/zenodo.20162352> | ✅ 200 (latest concept DOI — Verifiable Multi-Agent Anatomy) |

## Pending mint (operator action required)

- **arXiv v2 final** — paired with versioned DOI under concept 20162352. Operator must:
  1. Submit `arxiv/arxiv_v2.zip` to arXiv after the D1 honesty edit (committed to PR #44).
  2. Update Zenodo with new versioned DOI.
  3. Rebind szl-trust#11 from concept DOI 19944926 → versioned 20195368 once minted.

- **lutar-lean concept DOI** — for the Lean proof corpus, separate from the runtime DOIs. Not yet minted. Tracks lutar-lean PR #18.

## CITATION.cff cross-validation

All 14 repos have CITATION.cff with canonical fields:
- given-names: `Stephen P.` (note: `Jr.` is in git author only, never in CITATION.cff prose)
- family-names: `Lutar`
- orcid: `https://orcid.org/0009-0001-0110-4173`
- affiliation: `SZL Holdings`
- email: `stephen@szlholdings.com`

Confirmed clean by Doctrine V6 sweep 2.

Author: Stephen P. Lutar Jr. — `stephen@szlholdings.com` — SZL Holdings
