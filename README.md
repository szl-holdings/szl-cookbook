# szl-cookbook — Recipes and SKILL Patterns for Governed AI Systems

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-0B1F3A.svg?style=flat-square&logo=apache&logoColor=00D4FF)](https://www.apache.org/licenses/LICENSE-2.0)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20434308.svg)](https://doi.org/10.5281/zenodo.20434308)
[![CI](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml)
[![Tests](https://github.com/szl-holdings/szl-cookbook/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/tests.yml)
[![CodeQL](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml)
[![SBOM](https://github.com/szl-holdings/szl-cookbook/actions/workflows/sbom.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/sbom.yml)
[![SLSA L1 (SBOM + DCO)](https://img.shields.io/badge/SLSA-L1_(SBOM_%2B_DCO)-0B1F3A.svg?style=flat-square)](https://slsa.dev/spec/v1.0/levels)
[![DCO](https://github.com/szl-holdings/szl-cookbook/actions/workflows/dco.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/dco.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/szl-holdings/szl-cookbook/badge)](https://securityscorecards.dev/viewer/?uri=github.com/szl-holdings/szl-cookbook)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0001--0110--4173-A6CE39.svg?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0001-0110-4173)

> Pattern library and executable recipe repository for building governed AI systems on the SZL substrate — 9 SKILL.md patterns, 9 recipes, Lean 4 cross-references, and a live exec runner.  
> Doctrine v6 · DOI [10.5281/zenodo.20434308](https://doi.org/10.5281/zenodo.20434308)

**szl-cookbook** provides reusable SKILL.md agent-instruction patterns and executable recipes for engineering teams building governed AI applications. A Doctrine v6 ban-word sweep runs on every CI push.

---

## On Hugging Face

[SZLHOLDINGS on Hugging Face](https://huggingface.co/SZLHOLDINGS) — 27 Spaces · 31 datasets · 2 models

| Surface | Artifact |
|---------|----------|
| Live demo | [szl-cookbook-runner](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-runner) · [szl-cookbook-platform](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-platform) |
| Deep-dive | [szl-cookbook-deep-dive](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-deep-dive) |
| Source mirror | [szl-cookbook-source](https://huggingface.co/datasets/SZLHOLDINGS/szl-cookbook-source) |

---

## Contents

| Item | Count | Path |
|------|-------|------|
| SKILL.md agent-instruction patterns | 9 | `skills/` |
| Executable recipes | 9 | `recipes/` |
| Recipe domains | 3 | governance, audit, runtime |
| Lean 4 proof cross-references | via lutar-lean | [DOI 10.5281/zenodo.20434308](https://doi.org/10.5281/zenodo.20434308) |
| Doctrine v6 ban-word CI check | active | `.github/workflows/doctrine.yml` |

---

## Doctrine v6 ban-word list

CI fails on: `revolutionary`, `unprecedented`, `world-class`, `seamless`, `industry-leading`, `cutting-edge`, `game-changing`, `breakthrough`, `only` (superlative), `first` (superlative).

---

## What is real today

| Metric | Count | Verify |
|--------|-------|--------|
| Lean declarations (org) | 217 | [lutar-lean](https://github.com/szl-holdings/lutar-lean) |
| Lean axioms (org) | 12 | [lutar-lean](https://github.com/szl-holdings/lutar-lean) |
| Zenodo DOIs (org) | 7 | [Zenodo community](https://zenodo.org/communities/szl-holdings) |
| HF Spaces (org) | 27 | [SZLHOLDINGS HF org](https://huggingface.co/SZLHOLDINGS) |
| HF datasets (org) | 31 | [SZLHOLDINGS HF org](https://huggingface.co/SZLHOLDINGS) |

---

## Quick start

```bash
pnpm install
pnpm exec:recipe governance/policy-gate-scaffold
pnpm doctrine:check   # Doctrine v6 ban-word sweep
```

---

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — SZL Holdings

---

## Citation

```
S. P. Lutar Jr., "szl-cookbook — Recipes for Governed AI Systems,"
Zenodo, DOI 10.5281/zenodo.20434308, 2026.
```
ORCID: [0009-0001-0110-4173](https://orcid.org/0009-0001-0110-4173)

---

## Security

See [SECURITY.md](./SECURITY.md) for responsible-disclosure policy.
