# CALPHAD inverse-discovery

> **Recover Redlich-Kister binary interaction parameters (L0, L1, L2) from a phase-diagram target using the governed inverse-PINN engine — and refuse the answer when the problem is ill-posed.**
>
> **Headline number: 1 POST → L0/L1/L2 recovered within ~0.7% of ground truth, GREEN, with a signed Khipu receipt.**

CALPHAD (CALculation of PHAse Diagrams) models the excess Gibbs energy of a binary solution as a
Redlich-Kister polynomial. Inverse-discovery is the materials-by-design move: given measured
thermochemistry, recover the interaction parameters. The SZL inverse-PINN does this *with a
self-doubt gate* — it labels a non-identifiable fit **RED/REFUSE** instead of asserting a number.

> **Honest scope.** Recovered values are labelled **`MODELED`** (fit to data, not measured). The
> identifiability gate is real (Fisher information / FIM condition number). Λ is **Conjecture 1**
> (advisory, ≤ 0.99). PDD-fingerprint injectivity for the materials registry is **Conjecture 2 —
> OPEN, NOT proven**. This recipe runs against the **live** a11oy Space.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`. Check the organ first:

```bash
curl -s https://a-11-oy.com/api/a11oy/v1/pinn/health | jq '{calphad_available, supported_systems}'
# => {"calphad_available": true, "supported_systems": ["duffing","redlich_kister"]}
```

---

## Quickstart (live, verified)

```python
import httpx

BASE = "https://a-11-oy.com"

# GREEN case: well-posed CALPHAD target → recover L0,L1,L2
r = httpx.post(f"{BASE}/api/a11oy/v1/pinn/identify", json={"demo": "calphad"}, timeout=120).json()
print("convergence:", r["convergence"]["label"])           # => GREEN
for p in r["discovered"]:
    print(p["name"], "=", round(p["value"], 1), p["units"],
          "ground_truth", p["ground_truth"], "label", p["label"])
# => L0 = -40262.9 J/mol ground_truth -40000.0 label MODELED
# => L1 =   7880.4 J/mol ground_truth   8000.0 label MODELED
# => L2 = ...                                        label MODELED
print("lambda_advisory:", r["lambda_advisory"]["value"], r["lambda_advisory"]["status"])
print("receipt organ:", r["receipt"]["payload"]["organ"])  # => a11oy-pinn
```

Now the **ill-posed** case — too few points, too much noise — must REFUSE:

```python
r = httpx.post(f"{BASE}/api/a11oy/v1/pinn/identify",
               json={"demo": "calphad", "case": "ill_posed"}, timeout=120).json()
print(r["convergence"]["label"])         # => RED
print(r["convergence"]["criteria"]["min_fisher"])   # below floor ⇒ unidentifiable
# The engine reports RED and does NOT assert the parameters as trustworthy.
```

---

## Full walkthrough

### Step 1 — The model

The excess Gibbs energy of a binary A–B solution:

\[
G^{xs} = x_A x_B \sum_{k=0}^{n} L_k \,(x_A - x_B)^k
       = x_A x_B \big[L_0 + L_1 (x_A - x_B) + L_2 (x_A - x_B)^2 + \dots\big].
\]

The unknowns are the Redlich-Kister coefficients \(L_0, L_1, L_2\) (units J/mol).

### Step 2 — Why governed inverse, not a black-box fit

A least-squares fit will always return *some* numbers. The governance question is: *are those
numbers identifiable from the data you actually have?* The engine computes the Fisher information
matrix and its condition number κ(FIM). If `min_fisher < 1e-08` or `κ(FIM) ≥ 1e+08`, the
parameter is **UNIDENTIFIABLE** and the convergence label flips to **RED**.

| Criterion | GREEN | RED |
|---|---|---|
| `κ(FIM)` | `< 1e+06` (IDENT) | `≥ 1e+08` |
| `min_fisher` | above `1e-08` floor | below floor ⇒ UNIDENTIFIABLE |
| `normalised_data_rms` | `< 0.05` | — |

### Step 3 — Read the recovery

Each discovered parameter carries `value`, a 95% CI (analytic + bootstrap), `std`,
`fisher_information`, `ground_truth`, `recovery_abs_err`, and an F19 Bekenstein plausibility
check (the inequality is locked-proven; the application is MODELED with SAMPLE R, E). The
`GREEN` demo recovers L0 ≈ −40 263 J/mol against a −40 000 ground truth (~0.7% error).

### Step 4 — Keep the receipt

The `receipt.payload` is a `szl.lake.receipt/v1` envelope (organ `a11oy-pinn`, kind
`inverse_pinn_identify`) hash-chained into szl-lake. Verify the chain head against the lake:

```python
h = httpx.get(f"{BASE}/api/lake/v1/health", timeout=30).json()
print(h["organs"]["a11oy-pinn"]["chain_head"])
```

---

## Honest scope table

| Claim | Status |
|---|---|
| Redlich-Kister recovery | **MODELED** (fit to data; not measured) |
| Identifiability gate (Fisher / κ(FIM)) | **REAL**, deterministic |
| F19 Bekenstein bound | inequality **PROVEN** (locked-8 @ `c7c0ba17`); application MODELED |
| Λ advisory | **Conjecture 1** — advisory, ≤ 0.99, never a proof |
| PDD-fingerprint injectivity | **Conjecture 2** — OPEN, `Lutar/Materials/PDDInjective.lean` |
| Receipt | SHA3-256 chained; signed or honest `DSSE_PLACEHOLDER` |

---

## See also

- **[19 — Inverse-PINN physics discovery](19-inverse-pinn-physics-discovery.md)** — the Duffing demo, same engine.
- **[18 — Governed materials prediction](18-governed-materials-prediction.md)** — novelty + PAC-Bayes certify.
- **[09 — PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md)** — the certified-bound primitive.

## Cite this recipe

```bibtex
@misc{szl_cookbook_calphad_inverse_2026,
  title        = {CALPHAD inverse-discovery (SZL Cookbook recipe 16)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/16-calphad-inverse-discovery.md}},
  note         = {Redlich-Kister L0/L1/L2 recovery; values MODELED; identifiability gate REAL. Λ = Conjecture 1.}
}
```

References: Redlich & Kister 1948, *Ind. Eng. Chem.* 40:345; Lukas, Fries & Sundman 2007,
*Computational Thermodynamics: The Calphad Method* (CUP). Bekenstein 1981, *Phys. Rev. D* 23:287
(F19).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
