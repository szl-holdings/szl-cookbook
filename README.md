# szl-cookbook

> Recipes for building governed AI systems on the SZL substrate

[![CI](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml/badge.svg)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml)
[![CodeQL](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml/badge.svg)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/szl-holdings/szl-cookbook/badge)](https://securityscorecards.dev/viewer/?uri=github.com/szl-holdings/szl-cookbook)
[![License](https://img.shields.io/badge/license-Apache%202.0-2DA44E?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.20434276-805AD5?style=flat-square&logo=doi&logoColor=white)](https://doi.org/10.5281/zenodo.20434276)
[![Series-A Engineering](https://img.shields.io/badge/Series--A-Engineering-28251D?style=flat-square)](https://github.com/szl-holdings)
[![Doctrine v6](https://img.shields.io/badge/Doctrine-v6-01696F?style=flat-square)](https://github.com/szl-holdings/platform/blob/main/docs/doctrine/szl-doctrine.md)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0001--0110--4173-A6CE39?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0001-0110-4173)

> **Frontier Capability:** First engineering cookbook with Λ-axis governance skills and Doctrine v6 CI gate — `szl-meta-lambda` recipe target and `Lutar.AgentLoop` skill anchor (v18.0 Frontiers 4 & 5 · [Ouroboros Thesis DOI 10.5281/zenodo.20434276](https://doi.org/10.5281/zenodo.20434276)).

`szl-cookbook` is the SZL Holdings engineering cookbook — structured recipes for building governed AI systems using the Anthropic skills pattern, SZL substrate libraries, and Doctrine v6 conventions. It provides 9 composable skill recipes covering the full development lifecycle: pre-flight reasoning, refactoring, review, debugging, dependencies, dead code, documentation, and commit hygiene.

---

## Your First Recipe

```bash
# Clone the cookbook
git clone https://github.com/szl-holdings/szl-cookbook.git
cd szl-cookbook

# Run a recipe (e.g., pre-flight thinking before any change)
cat recipes/pre-flight-thinking.md

# List all available recipes
ls recipes/
```

---

## Recipe Index

| Recipe | Purpose | When to Use |
|--------|---------|-------------|
| `pre-flight-thinking` | Structured reasoning before any code change | Before starting any task |
| `refactoring` | Safe refactor checklist with invariant preservation | Before restructuring code |
| `review` | Code review checklist — correctness, doctrine, security | Before opening a PR |
| `debugging` | Systematic debugging protocol | When diagnosing failures |
| `dependencies` | Dependency addition/upgrade workflow | Before adding any package |
| `dead-code` | Dead code identification and safe removal | Codebase cleanup passes |
| `docs` | Documentation generation and quality standards | After any API change |
| `commit-hygiene` | Conventional commit message construction | Before every commit |
| `governance-gate` | Doctrine v6 governance gate checklist | Before any consequential change |

---

## Skills Pattern

Each recipe implements the Anthropic skills pattern: a structured `SKILL.md` file with:
1. **Role** — what the skill does
2. **Pre-conditions** — when to invoke it
3. **Steps** — ordered procedure
4. **Checklist** — verification items
5. **Post-conditions** — what done looks like

```bash
# Skills are in skills/
ls skills/

# Each skill is a SKILL.md file
cat skills/a11oy-code/SKILL.md
```

---

## Repository Structure

| Path | Contents |
|------|---------|
| `recipes/` | Markdown recipe files — one per engineering pattern |
| `skills/` | Anthropic skill SKILL.md files |
| `meta/` | Cookbook metadata, index, and doctrine alignment |
| `ops/` | Operational recipes — CI, deployment, environment |

---

## Security and Governance

- OpenSSF Scorecard: **6.8** (as of 2026-05-28) — see [scorecard report](https://securityscorecards.dev/viewer/?uri=github.com/szl-holdings/szl-cookbook)
- CodeQL scanning on every push
- All recipes are doctrine-v6 reviewed before merge
- Governance gate recipe is required before any change to policy-adjacent systems

---

## How to Cite

```bibtex
@software{szl_holdings_cookbook_2026,
  title  = {szl-cookbook — Engineering Recipes for Governed AI Systems},
  author = {{SZL Holdings}},
  year   = {2026},
  doi    = {10.5281/zenodo.20434276},
  url    = {https://github.com/szl-holdings/szl-cookbook}
}
```

[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.20434276-805AD5?style=flat-square&logo=doi&logoColor=white)](https://doi.org/10.5281/zenodo.20434276)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). New recipes require: (1) follows the skills pattern structure, (2) doctrine-v6 tone, (3) CI green, (4) one reviewer approval.

Related: [`szl-holdings/platform`](https://github.com/szl-holdings/platform) · [`szl-holdings/a11oy`](https://github.com/szl-holdings/a11oy) · [`szl-holdings/szl-brand`](https://github.com/szl-holdings/szl-brand)

---

## License

Apache-2.0 — See [LICENSE](./LICENSE). Copyright (c) 2024-2026 SZL Holdings.

---

## Related repositories in the SZL substrate

The 13 substrate repos cross-link reciprocally. This footer is maintained by GH Admin #1 (org-wide).

- [`a11oy`](https://github.com/szl-holdings/a11oy) — vertical alignment substrate (policy · measurement · knowledge · QEC-integrity)
- [`amaru`](https://github.com/szl-holdings/amaru) — Shor-encoded receipt minting (Cardano-anchored)
- [`rosie`](https://github.com/szl-holdings/rosie) — CSS-ingress receipt orchestration
- [`sentra`](https://github.com/szl-holdings/sentra) — Kitaev-surface drift detection on audit fibers
- [`uds-mesh`](https://github.com/szl-holdings/uds-mesh) — UDS span schemas + governance receipts
- [`lutar-lean`](https://github.com/szl-holdings/lutar-lean) — Lean 4 + Mathlib v4.13.0 kernel proofs (30 GREEN modules)
- [`ouroboros`](https://github.com/szl-holdings/ouroboros) — bounded-recursion runtime
- [`ouroboros-thesis`](https://github.com/szl-holdings/ouroboros-thesis) — DOI-pinned thesis substrate (v3 → v18)
- [`platform`](https://github.com/szl-holdings/platform) — composing monorepo (76 packages, 1,220 tests)
- [`szl-brand`](https://github.com/szl-holdings/szl-brand) — anatomy + visual doctrine (PDFs hosted in-repo)
- [`szl-cookbook`](https://github.com/szl-holdings/szl-cookbook) — governed-AI recipes
- [`agi-forecast`](https://github.com/szl-holdings/agi-forecast) — PAC-Bayes + Bekenstein governance-trajectory forecasts
- [`vsp-otel`](https://github.com/szl-holdings/vsp-otel) — OpenTelemetry exporter for Λ-axis spans

Org page: [github.com/szl-holdings](https://github.com/szl-holdings) · Doctrine v6 · 11 axioms · 30 GREEN modules · v18.0 DOI [`10.5281/zenodo.20434276`](https://doi.org/10.5281/zenodo.20434276)
