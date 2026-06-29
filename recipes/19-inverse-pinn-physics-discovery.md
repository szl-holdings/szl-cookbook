# Inverse-PINN physics discovery

> **Identify the governing parameters of a nonlinear dynamical system from data with a physics-informed inverse engine — and get a self-doubt RED gate when a parameter is not identifiable.**
>
> **Headline number: 1 POST → the Duffing cubic stiffness α recovered ≈ 0.989 (truth 1.0), GREEN, grad-norm 2e-16, with a signed receipt.**

The Duffing oscillator \(m\,x'' + c\,x' + \delta\,x + \alpha\,x^3 = F\cos(\omega t)\) is the
canonical nonlinear test system. Given a trajectory, the inverse problem is: recover \(\alpha\)
(and friends). The SZL inverse-PINN does this with a **NumPy-only spectral surrogate** (Fourier
modes + polynomial, exact analytic derivatives) — no torch, no DeepXDE — and gates the answer on
identifiability.

> **Honest scope.** Recovered values are **`MODELED`** (fit to data; not measured). The
> convergence gate (causal weight, gradient norm, FIM condition number, Fisher floor) is **REAL**.
> The F19 Bekenstein bound is a **PROVEN inequality** (locked-8 @ `c7c0ba17`); its application
> here is MODELED with SAMPLE R, E. Λ is **Conjecture 1** (advisory, ≤ 0.99). Live a11oy Space.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`. Probe the organ:

```bash
curl -s https://a-11-oy.com/api/a11oy/v1/pinn/health | jq '{ok, supported_systems, self_doubt_gate: .honesty.self_doubt_gate}'
```

---

## Quickstart (live, verified)

```python
import httpx
BASE = "https://a-11-oy.com"

r = httpx.post(f"{BASE}/api/a11oy/v1/pinn/identify", json={"demo": "duffing"}, timeout=120).json()

print("system:", r["system"], "| convergence:", r["convergence"]["label"])   # duffing | GREEN
alpha = r["discovered"][0]
print(f"{alpha['name']} = {alpha['value']:.4f}  CI95 {alpha['ci95']}  label {alpha['label']}")
# => alpha = 0.9894  CI95 [0.942, 1.014]  label MODELED
print("grad_norm:", r["convergence"]["grad_norm"])        # ~2e-16 (GREEN < 1e-05)
print("kappa_fim:", r["convergence"]["kappa_fim"])         # ~1.0 (well-conditioned ⇒ identifiable)
print("lambda_advisory:", r["lambda_advisory"]["value"], r["lambda_advisory"]["status"])
print("Bekenstein:", alpha["bekenstein"]["label"])         # PHYSICALLY_PLAUSIBLE
```

---

## Full walkthrough

### Step 1 — The surrogate

The engine fits a spectral surrogate to the trajectory (Fourier 24 modes + polynomial deg 3) so
that derivatives are *exact analytic* rather than finite-differenced. Linear parameters solve by
exact least-squares; nonlinear ones by Adam gradient descent on the physics residual.

### Step 2 — The self-doubt gate

This is the governance heart. A fit is only asserted GREEN when **all** hold:

| Criterion | GREEN threshold |
|---|---|
| `min_causal_weight` | `> 0.99` (RED `≤ 0.5`) |
| `grad_norm` | `< 1e-05` |
| `kappa_fim` | `< 1e+06` (IDENT); `≥ 1e+08` ⇒ RED |
| `min_fisher` | above `1e-08` floor; below ⇒ UNIDENTIFIABLE |

A non-identifiable parameter (Fisher below floor or FIM ill-conditioned) is labelled
**RED/UNIDENTIFIABLE** and **not asserted**. The engine refuses to pretend it knows.

### Step 3 — Read the discovery

Each parameter ships `value`, analytic `ci95`, `std`, `fisher_information`, `identifiable`,
`convergence_label`, and a Bekenstein plausibility check. The Duffing α comes back ≈ 0.989 with a
tight CI bracketing the ground-truth 1.0.

### Step 4 — The receipt

`receipt.payload` is a `szl.lake.receipt/v1` envelope (organ `a11oy-pinn`, kind
`inverse_pinn_identify`) recording the system description, method, and discovered parameters,
hash-chained into szl-lake. Cross-check the head:

```python
print(httpx.get(f"{BASE}/api/lake/v1/health", timeout=30).json()["organs"]["a11oy-pinn"]["chain_head"])
```

---

## Honest scope table

| Claim | Status |
|---|---|
| Parameter recovery (α, …) | **MODELED** — fit to data, not measured |
| Convergence / identifiability gate | **REAL** — causal weight, grad norm, Fisher, κ(FIM) |
| F19 Bekenstein bound | inequality **PROVEN** (locked-8); application MODELED |
| Λ advisory | **Conjecture 1** — advisory, ≤ 0.99, never a proof |
| Receipt | SHA3-256 chained; signed or honest `DSSE_PLACEHOLDER` |

---

## See also

- **[16 — CALPHAD inverse-discovery](16-calphad-inverse-discovery.md)** — same engine, materials vertical.
- **[18 — Governed materials prediction](18-governed-materials-prediction.md)** — novelty + certify.
- **[12 — Doctrine ledger query](12-doctrine-ledger-query.md)** — assert the locked numbers live.

## Cite this recipe

```bibtex
@misc{szl_cookbook_inverse_pinn_2026,
  title        = {Inverse-PINN physics discovery (SZL Cookbook recipe 19)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/19-inverse-pinn-physics-discovery.md}},
  note         = {Duffing parameter ID; values MODELED; self-doubt RED gate REAL. Λ = Conjecture 1.}
}
```

References: Raissi, Perdikaris & Karniadakis 2019, *J. Comput. Phys.* 378:686 (PINNs); Duffing
1918. Bekenstein 1981, *Phys. Rev. D* 23:287 (F19, locked-8 @ `c7c0ba17`).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
