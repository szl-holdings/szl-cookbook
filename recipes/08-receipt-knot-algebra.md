# Receipt knot algebra

> **Read a receipt chain as a knotted khipu cord and apply Reidemeister moves R1/R2/R3 — local rewrites that must leave the chain's knot-invariant tag unchanged.**
>
> **Headline number: 3 moves, 1 invariant tag — R1/R2/R3 preserve the 16-hex knot signature.**

The Inka khipu is a knotted-cord record whose primary cord value equals the sum of its pendant
values. SZL reads a receipt DAG as exactly that structure, and the
[knot-calculus-v1](knot-calculus-v1/) recipe in this repo ships a **runnable** TypeScript
implementation. This recipe explains the algebra and how to run it.

> **Honest scope.** The Reidemeister invariance for receipt chains is **Conjecture R1/R2/R3** in
> Lean (`lutar-lean/Lutar/Knot/ReidemeisterConjecture.lean`, all `sorry`-tagged, target v16). The
> code *checks* invariance on concrete chains; it does not *prove* it for all chains.

---

## Prerequisites

```bash
cd recipes/knot-calculus-v1/code && npm install
```

---

## Quickstart (runnable, in this repo)

```bash
cd recipes/knot-calculus-v1/code
npx tsx tests/demo.ts
# Prints:
#   1. a 3-organ × 5-decision khipu root receipt with the sum-of-sums invariant verified (TH11 pass)
#   2. the 16-hex knot-invariant tag of that root
#   3. a McAllester-1999 PAC-Bayes upper bound (see recipe 09)
#   4. a TH11 failure demo: a tampered pendant value is rejected by verifySumInvariant
```

---

## Full walkthrough

### Step 1 — The khipu summation invariant (TH11)

A receipt DAG is a three-tier pendant-cord tree: decisions → organ pendants → root. The invariant
is *sum-of-sums*: each pendant value equals the sum of its decision values, and the root equals the
sum of the pendants. The check is `verifySumInvariant` in
[`code/src/khipu-receipt.ts`](knot-calculus-v1/code/src/khipu-receipt.ts); the Lean obligation is
**TH11** `khipuReceipt_checksum_invariant` (two routine `sorry`s).

### Step 2 — The knot-invariant tag

The pendant–subsidiary tree is a chord diagram of Vassiliev–Bar-Natan type
([Bar-Natan 1995](https://doi.org/10.1016/0040-9383(95)93237-2);
[Vassiliev 1990]); the summation cord supplies the 4T closure relation. The 16-hex tag is a knot
invariant of the chain: two chains with the same knot type get the same tag.

### Step 3 — Reidemeister moves on receipt chains

A *move* is a local rewrite of the chain that does not change what it records:

| Move | Receipt-chain meaning | Invariant requirement |
|---|---|---|
| **R1** (twist) | insert/remove a no-op self-referential receipt | tag unchanged |
| **R2** (poke) | add then immediately revoke a paired receipt | tag unchanged |
| **R3** (slide) | reorder two independent, commuting receipts | tag unchanged |

```ts
// Conceptual check (pattern mirrors the demo): a valid move preserves the tag.
import { buildRoot, knotTag } from "./src/khipu-receipt";
const before = knotTag(buildRoot(chain));
const after  = knotTag(buildRoot(applyR3(chain)));   // R3: swap two commuting receipts
console.assert(before === after, "R3 must preserve the knot-invariant tag");
```

### Step 4 — When the invariant *should* break

Tampering is **not** a Reidemeister move. Editing a pendant value changes the recorded total, so
`verifySumInvariant` fails (TH11 failure) and the tag changes — exactly the demo's step 4. This is
the difference between a legitimate rewrite and a forgery.

### Step 5 — Tie it to live receipts

Pull a live receipt chain from a11oy's memory cortex (a11oy Memory; codename *amaru*
retired) (**[recipe 05](05-memory-attested-reasoning.md)**), build its khipu tree,
and compute the tag. Two ticks that differ only by commuting steps share a tag; a tampered tick
does not.

---

## Lean obligations referenced

| Theorem | File | Status |
|---|---|---|
| TH11 `khipuReceipt_checksum_invariant` | `lutar-lean/Lutar/Khipu/SummationInvariant.lean` | two routine `sorry`s |
| Conjecture R1/R2/R3 | `lutar-lean/Lutar/Knot/ReidemeisterConjecture.lean` | all `sorry`-tagged, target v16 |

---

## See also

- **[09 — PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md)** — the demo's step 3.
- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)**
- Code: [knot-calculus-v1](knot-calculus-v1/) (runnable TypeScript in this repo)

## Cite this recipe

```bibtex
@misc{szl_cookbook_knot_algebra_2026,
  title        = {Receipt knot algebra (SZL Cookbook recipe 08)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/08-receipt-knot-algebra.md}},
  note         = {Reidemeister R1/R2/R3 are Conjecture in Lean (target v16). Doctrine v11 c7c0ba17.}
}
```

References: Reidemeister 1927, *Abh. Math. Sem. Univ. Hamburg* 5:24–32; Bar-Natan 1995, *Topology*
34:423–472; Vassiliev 1990, *Adv. Sov. Math.* 1:23–69; Ascher & Ascher 1981, *Code of the Quipu*;
Urton 2003, *Signs of the Inka Khipu*.

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
