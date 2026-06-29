# Governed materials prediction

> **Check whether a crystal is novel against a registry using an isometry-invariant fingerprint, then attach a PAC-Bayes certified risk bound — both emitting hash-chained Khipu receipts.**
>
> **Headline number: 1 crystal → a deterministic PDD fingerprint + a McAllester bound (e.g. family `intermetallics` → risk ≤ 0.0772 at δ=0.05).**

Materials-by-design needs two governed surfaces: *is this structure new?* and *how much can I
trust a stability prediction about it?* The a11oy materials organ answers both — novelty via a
Kurlin-style Pointwise Distance Distribution (PDD) fingerprint, and trust via a PAC-Bayes bound.

> **Honest scope.** The fingerprint comparison is **REAL** (deterministic, isometry-invariant).
> The receipt chain is **REAL** (SHA3-256, tamper-evident). Signatures are
> **`DSSE_PLACEHOLDER`** (Sigstore not wired — honest). PDD **injectivity is Conjecture 2 —
> ROADMAP, NOT proven** (`Lutar/Materials/PDDInjective.lean`). The McAllester bound *formula* is
> proven on paper and the *computation* is exact, but the **Lean proof is an open SORRY/ROADMAP**
> (`Lutar/Materials/PACBayesMaterials.lean`) — **not** in the locked-8. Preset inputs are
> `SAMPLE/MODELED`. There is **no** `/materials/predict` route. Trust ceiling is never 100%.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`. Two routes: `POST /materials/novelty`, `POST /materials/certify`.

---

## Quickstart (live, verified)

### Novelty — submit a crystal

```python
import httpx
BASE = "https://a-11-oy.com"

crystal = {
    "a": 3.6, "b": 3.6, "c": 3.6, "alpha": 90, "beta": 90, "gamma": 90,
    "sites": [{"el": "Cu", "x": 0, "y": 0, "z": 0},
              {"el": "Au", "x": 0.5, "y": 0.5, "z": 0.5}],
}
r = httpx.post(f"{BASE}/api/a11oy/v1/materials/novelty", json=crystal, timeout=60).json()
print("novel:", r["novel"], "| registered_id:", r["registered_id"])
print("fingerprint:", r["fingerprint"])              # e.g. "31:0.0909;36:0.0682;..."
print("fingerprint_digest:", r["fingerprint_digest"])
print("invariant:", r["invariant"])                  # Kurlin-style PDD, isometry-invariant via G=LᵀL
print("receipt chain_head:", r["receipt"]["chain_head"], "depth", r["receipt"]["chain_depth"])
```

### Certify — attach a PAC-Bayes risk bound

```python
# Use a known family preset, OR supply explicit {empirical_risk, kl, n, delta}
r = httpx.post(f"{BASE}/api/a11oy/v1/materials/certify",
               json={"family": "intermetallics"}, timeout=60).json()
print("bound:", r["bound"])                          # => 0.0772... (normalized risk, [0,1])
print(r["certificate_text"])
print("proof_status:", r["proof_status"])
print("input_label:", r["inputs"]["input_label"])    # SAMPLE/MODELED — illustrative, NOT measured
```

The bound formula:

\[
R(Q) \le \hat{R}(Q) + \sqrt{\frac{\mathrm{KL}(Q\,\|\,P) + \ln\!\frac{2\sqrt{n}}{\delta}}{2n}}.
\]

---

## Full walkthrough

### Step 1 — The PDD fingerprint

Submit the unit cell (`a,b,c,alpha,beta,gamma`) and fractional `sites`. The organ computes the
metric tensor `G = LᵀL`, then a sorted pairwise-distance histogram (Pointwise Distance
Distribution). Because it is built from the metric tensor, it is **isometry-invariant** — a
rotated/translated copy of the same crystal yields the same fingerprint.

### Step 2 — Novelty verdict + registry

`novel: true` means no registry entry within the matching tolerance; the structure is registered
with a `mat-…` id and a `fingerprint_digest`. `nearest_match_id`/`distance` are populated when a
near-match exists.

> **Do not claim** the fingerprint is a *proof* of distinctness. Injectivity (distinct crystals ⇒
> distinct fingerprints) is **Conjecture 2 — OPEN**. Two distinct structures could in principle
> collide; the honest claim is "no match found in the registry," not "provably new."

### Step 3 — Certify the trust

`certify` returns the McAllester (1999) PAC-Bayes bound. Supply explicit
`{empirical_risk, kl, n, delta}` for your own evaluation, or a `{family}` preset
(`intermetallics`, `oxides`, `refractory_hea`) for an illustrative `SAMPLE/MODELED` number.
The bound *computation* is exact; the **Lean proof is an open SORRY** — the bound is a bound,
not a Lean-certified guarantee.

### Step 4 — Verify the receipt chain

Both routes return `receipt` envelopes (`SZL.Materials.NoveltyCert.v1` /
`SZL.Materials.PACBayesCert.v1`) with `prev`, `digest`, and `chain_head`. They form a SHA3-256
hash chain — recompute or cross-check against the lake ledger as in
**[recipe 01](01-verify-a-receipt-end-to-end.md)**.

---

## Honest scope table

| Claim | Status |
|---|---|
| PDD fingerprint comparison | **REAL** — deterministic, isometry-invariant |
| Receipt chain | **REAL** — SHA3-256, tamper-evident |
| Receipt signature | **`DSSE_PLACEHOLDER`** — Sigstore not wired (honest) |
| PDD injectivity | **Conjecture 2** — ROADMAP, NOT proven |
| McAllester bound formula | **PROVEN on paper** (McAllester 1999, COLT) |
| McAllester bound computation | **EXACT** |
| McAllester Lean proof | **SORRY/ROADMAP** — not in locked-8 |
| Preset inputs | **SAMPLE/MODELED** — illustrative, not measured |

---

## See also

- **[16 — CALPHAD inverse-discovery](16-calphad-inverse-discovery.md)** — recover interaction parameters.
- **[09 — PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md)** — the bound, explained.
- **[17 — E8 lattice receipt verification](17-e8-lattice-receipt-verification.md)** — receipt integrity geometry.

## Cite this recipe

```bibtex
@misc{szl_cookbook_governed_materials_2026,
  title        = {Governed materials prediction (SZL Cookbook recipe 18)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/18-governed-materials-prediction.md}},
  note         = {PDD novelty (Conjecture 2, open) + McAllester PAC-Bayes (formula proven, Lean SORRY). Λ = Conjecture 1.}
}
```

References: McAllester 1999, COLT; D. Widdowson & V. Kurlin 2022, "Resolving the data ambiguity
for periodic crystals," *NeurIPS* (Pointwise Distance Distribution); Redlich & Kister 1948.

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
