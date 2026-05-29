# szl-cookbook — Recipes and SKILL Patterns for Governed AI Systems

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-0B1F3A.svg?style=flat-square&logo=apache&logoColor=00D4FF)](https://www.apache.org/licenses/LICENSE-2.0)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20434308.svg)](https://doi.org/10.5281/zenodo.20434308)
[![CI](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/ci.yml)
[![Tests](https://github.com/szl-holdings/szl-cookbook/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/tests.yml)
[![CodeQL](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/codeql.yml)
[![SBOM](https://github.com/szl-holdings/szl-cookbook/actions/workflows/sbom.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/sbom.yml)
[![SLSA 3](https://github.com/szl-holdings/szl-cookbook/actions/workflows/slsa.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/slsa.yml)
[![DCO](https://github.com/szl-holdings/szl-cookbook/actions/workflows/dco.yml/badge.svg?branch=main)](https://github.com/szl-holdings/szl-cookbook/actions/workflows/dco.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/szl-holdings/szl-cookbook/badge)](https://securityscorecards.dev/viewer/?uri=github.com/szl-holdings/szl-cookbook)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0001--0110--4173-A6CE39.svg?style=flat-square&logo=orcid&logoColor=white)](https://orcid.org/0009-0001-0110-4173)

**szl-cookbook** is the pattern library and recipe repository for building governed AI systems.
It contains 9 SKILL.md agent-instruction patterns, 9 executable recipes across 3 domains,
Lean 4 formal proofs, and a live exec runner. Doctrine v6 ban-word sweep enforced on CI.

---

## On Hugging Face

This repository's live demos, dataset mirror, and org showcase live on the [SZLHOLDINGS Hugging Face org](https://huggingface.co/SZLHOLDINGS):

| Surface | Hugging Face artifact |
|---------|---------------------|
| **Live demo** | [szl-cookbook-runner](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-runner) · [szl-cookbook-platform](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-platform) |
| **Deep-dive showcase** | [szl-cookbook-deep-dive](https://huggingface.co/spaces/SZLHOLDINGS/szl-cookbook-deep-dive) |
| **Source mirror** | [szl-cookbook-source](https://huggingface.co/datasets/SZLHOLDINGS/szl-cookbook-source) |
| **Org showcase** | [SZLHOLDINGS on Hugging Face](https://huggingface.co/SZLHOLDINGS) — 24 datasets · 19+ Spaces · 2 models |

## What is real today

All counts are grep-verifiable from this repository.

| Metric | Count | How to verify |
|--------|-------|---------------|
| SKILL.md patterns | 9 | `ls skills/ \| wc -l` |
| Recipe markdown files | 9 | `find recipes -name "*.md" \| wc -l` |
| TypeScript recipe files | 17 | `find recipes -name "*.ts" \| wc -l` |
| Lean 4 proof files | 2 | `find recipes -name "*.lean" \| wc -l` |
| Total source files | 119 | `find . -not -path './.git/*' -type f \| wc -l` |
| Zenodo DOI | 10.5281/zenodo.20434308 | https://doi.org/10.5281/zenodo.20434308 |

---

## SKILL.md Patterns

| Pattern | Purpose |
|---------|---------|
| `pre-flight-thinking` | Structured pre-conditions reasoning before agent action |
| `debug-protocol` | Hypothesis-driven debugging with falsification steps |
| `commit-hygiene` | Signed, atomic, descriptive commit discipline |
| `dead-code-detector` | Identify and remove unused code paths |
| `dependency-health` | Audit direct + transitive dependencies for risk |
| `doc-comment-hygiene` | Keep doc-comments accurate, terse, and grep-friendly |
| `monorepo-impact-analysis` | Trace change blast radius across a monorepo |
| `react-component-review` | Structured review of React/TSX component code |
| `typescript-refactor` | Safe TypeScript refactoring with type-preservation |

---

## Architecture

```
skills/ (9 × SKILL.md — agent instruction patterns)
        │
        │ loaded by AI agents at task start
        ▼
recipes/ (executable code + formal proofs)
  ├─ knot-calculus-v1/
  │    ├─ code/src/pac-bayes-bound.ts     ← PAC-Bayes bound computation
  │    └─ code/src/khipu-receipt.ts       ← receipt DAG reference impl
  ├─ anatomy-evolved-v1/
  │    ├─ code/src/ (8 TypeScript modules — KS18 witness, POVM, etc.)
  │    └─ code/lean/
  │         ├─ TwoWitness.lean            ← Lean 4 formal proof
  │         └─ GatedBoundedness.lean      ← Lean 4 formal proof
  └─ chakra-unification.md                ← design recipe
        │
        ▼
ops/REPLIT_HARDCODE_PAYLOAD/
  ├─ scorecard/ (security posture CSV, scanner inventory)
  ├─ anatomy/   (system diagrams: brain, skeleton, heart, nervous, blood/immune)
  └─ docs/      (operator quickstart, DOI manifest, doctrine test pass)
        │
        ▼
szl-cookbook-runner (HF Space) — live exec for TypeScript recipe code

DOCTRINE V6 BAN-WORD SWEEP — enforced by .pre-commit-config.yaml on every commit
```

---

## How to use

```bash
# Run a recipe locally
git clone https://github.com/szl-holdings/szl-cookbook.git
cd szl-cookbook/recipes/knot-calculus-v1/code
pnpm install
npx tsx tests/demo.ts

# Run anatomy-evolved-v1 tests
cd ../../anatomy-evolved-v1/code
pnpm install
pnpm test
```

```typescript
// Using the PAC-Bayes bound pattern
import { pacBayesBound } from './recipes/knot-calculus-v1/code/src/pac-bayes-bound'

const bound = pacBayesBound({ trainError: 0.02, klDivergence: 1.4, n: 50000, delta: 0.05 })
// Returns upper bound on expected test error under the PAC-Bayes theorem
```

---

## Doctrine v6 compliance

The `.pre-commit-config.yaml` runs a ban-word sweep on every commit. CI rejects artifacts
containing banned marketing vocabulary. Every file in this repository passes the sweep.

```bash
# Verify compliance locally
grep -rE "(revolutionary|unprecedented|world.class|seamless|cutting.edge|game.changing|industry.leading|best.in.class)" . \
  --include="*.md" --include="*.ts" --include="*.html" && echo FAIL || echo CLEAN
```

---

## What this is NOT

- Not a general-purpose agent framework — SKILL.md patterns target the SZL substrate, not LangChain/AutoGen
- Not a formal methods textbook — Lean 4 proofs address specific substrate theorems (TwoWitness, GatedBoundedness)
- Not production-ready turn-key library packaging — recipes are reference implementations requiring adaptation

---

## Sibling repositories

| Repo | Role |
|------|------|
| [a11oy-platform](https://huggingface.co/spaces/SZLHOLDINGS/a11oy-platform) | a11oy agents load SKILL.md patterns to structure their behavior |
| [amaru](https://github.com/szl-holdings/amaru) | knot-calculus-v1 is the reference impl for amaru's TypeScript bindings |
| [rosie](https://github.com/szl-holdings/rosie) | rosie's khipu-receipt.ts implements the knot-calculus-v1 pattern |
| [lutar-lean](https://github.com/szl-holdings/lutar-lean) | TwoWitness.lean + GatedBoundedness.lean feed lutar-lean's theorem library |
| [agi-forecast](https://github.com/szl-holdings/agi-forecast) | pre-flight-thinking SKILL.md defines agi-forecast gauge reasoning protocol |

---

## How to cite

```bibtex
@software{lutar_szl_cookbook_2025,
  author    = {Lutar, Stephen Paul JR},
  title     = {szl-cookbook — Pattern Library for Governed AI Systems},
  year      = {2025},
  doi       = {10.5281/zenodo.20434308},
  url       = {https://doi.org/10.5281/zenodo.20434308},
  license   = {Apache-2.0}
}
```

---

## References

- Lean 4 Theorem Prover: https://leanprover.github.io/lean4/
- SZL Holdings Doctrine v6: https://doi.org/10.5281/zenodo.19944926
- PAC-Bayes bound: Germain et al. (2012), JMLR 13. https://jmlr.org/papers/v13/germain12a.html

---

## License + DCO

Licensed under [Apache License 2.0](./LICENSE).

All commits require Developer Certificate of Origin sign-off (`git commit -s`).
Doctrine v6 ban-word sweep enforced via `.pre-commit-config.yaml` on CI.

ORCID: [0009-0001-0110-4173](https://orcid.org/0009-0001-0110-4173) · Doctrine v6 compliant

Signed-off-by: Stephen Paul Lutar JR <stephen@szlholdings.com>
