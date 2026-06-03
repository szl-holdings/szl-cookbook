# PAC-Bayes confidence margin

> **Put a non-vacuous, distribution-free upper bound on your governance head's risk using the McAllester-1999 PAC-Bayes inequality — the runnable implementation ships in this repo.**
>
> **Headline number: n=100,000, KL=0.5, δ=0.05, R̂=0.05 → risk bound ≈ 0.057 (non-vacuous).**

How confident can you be that a passing Λ-gate generalizes beyond the sample you measured it on?
PAC-Bayes answers with a tail bound. The implementation is real:
[`recipes/knot-calculus-v1/code/src/pac-bayes-bound.ts`](knot-calculus-v1/code/src/pac-bayes-bound.ts).

> **Honest scope.** The closed-form arithmetic is proved in Lean (**TH13**
> `governanceHead_PACBayes_bound`); the probabilistic `Pr ≥ 1−δ` quantifier is the documented
> residual `sorry`. The bound is a *bound*, not a guarantee of optimality, and Λ remains
> **Conjecture 1**.

---

## The inequality

With probability ≥ 1−δ over an i.i.d. n-sample, for posterior Q and prior P over governance
policies,

\[
R(Q) \le \hat{R}(Q) + \sqrt{\frac{\mathrm{KL}(Q\,\|\,P) + \ln\!\frac{2\sqrt{n}}{\delta}}{2n}}.
\]

---

## Prerequisites

```bash
cd recipes/knot-calculus-v1/code && npm install
```

---

## Quickstart (runnable, in this repo)

```bash
cd recipes/knot-calculus-v1/code
npx tsx tests/demo.ts          # step 3 prints the PAC-Bayes bound for the worked example
```

Or call the function directly:

```ts
import { pacBayesBound } from "./src/pac-bayes-bound";
const r = pacBayesBound({ empiricalRisk: 0.05, klDivergence: 0.5, sampleSize: 100_000, delta: 0.05 });
console.log(r);
// => { slack: ~0.0070, upperBound: ~0.0571, nonVacuous: true }
```

Reproduce in pure Python (no deps):

```python
import math
def pac_bayes(R_hat, KL, n, delta):
    slack = math.sqrt((KL + math.log(2 * math.sqrt(n) / delta)) / (2 * n))
    ub = R_hat + slack
    return {"slack": slack, "upperBound": ub, "nonVacuous": ub < 1.0}
print(pac_bayes(0.05, 0.5, 100_000, 0.05))
# => {'slack': 0.00705…, 'upperBound': 0.05705…, 'nonVacuous': True}
```

---

## Full walkthrough

### Step 1 — Estimate the empirical risk R̂(Q)

Replay your receipts (e.g., a compliance regime from **[recipe 03](03-fine-tune-compliance-regime.md)**)
and count the fraction where the gate's decision disagreed with the ground-truth label. That
fraction is R̂(Q) on bounded 0–1 loss.

### Step 2 — Estimate KL(Q‖P)

P is the doctrine prior over policies (the locked axis priors); Q is your tuned posterior. For a
diagonal-Gaussian parameterization, KL is the usual closed form. Keep KL small by staying close to
the doctrine prior — the bound rewards that directly.

### Step 3 — Choose n and δ

n is your evaluation sample size; δ is the failure probability (0.05 is standard). The slack
shrinks like \(1/\sqrt{n}\): going from n=10⁴ to n=10⁵ roughly cuts the slack by ~3×.

### Step 4 — Read the margin

The **confidence margin** is `lambda_floor − upperBound_on_failure`. If your Λ floor is 0.9 and the
bound says failure risk ≤ 0.057, you have a real, distribution-free safety margin — not a vibe.

### Step 5 — Non-vacuity check

`nonVacuous` must be `true` (upperBound < 1). A vacuous bound means you need more samples or a
posterior closer to the prior. Lotfi et al. 2023 show non-vacuous bounds are achievable even for
LLM-scale heads.

---

## Lean obligation

| Theorem | File | Status |
|---|---|---|
| TH13 `governanceHead_PACBayes_bound` | `lutar-lean/Lutar/PACBayes.lean` | closed-form proved; Pr-quantifier open |

---

## See also

- **[03 — Fine-tune a compliance regime](03-fine-tune-compliance-regime.md)** — produces R̂ and KL.
- **[08 — Receipt knot algebra](08-receipt-knot-algebra.md)** — same demo program.
- Code: [pac-bayes-bound.ts](knot-calculus-v1/code/src/pac-bayes-bound.ts)

## Cite this recipe

```bibtex
@misc{szl_cookbook_pac_bayes_2026,
  title        = {PAC-Bayes confidence margin (SZL Cookbook recipe 09)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/09-pac-bayes-confidence-margin.md}},
  note         = {McAllester-1999; TH13 closed-form proved, Pr-quantifier open. Λ = Conjecture 1.}
}
```

References: McAllester 1999, COLT; McAllester 2003, *Machine Learning* 51:5–21; Lotfi et al. 2023,
arXiv:2312.17173 (NeurIPS); Amari 1985 (Springer LNS 28), 2016 (Springer).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
