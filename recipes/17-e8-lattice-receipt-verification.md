# E8 lattice receipt verification

> **Encode a 256-bit Khipu receipt digest onto the E8 lattice — the densest sphere packing in ℝ⁸ — and read its minimum-distance integrity geometry. Error-DETECTION only; not security.**
>
> **Headline number: 1 GET → an on-lattice receipt reports `min_squared_distance = 0`; E8's minimal separation is exactly 2.**

E8 is the unique densest lattice sphere packing in eight dimensions — a result that won
**Maryna Viazovska the 2022 Fields Medal** (proof: Viazovska 2017, *Annals of Mathematics*
185:991–1015; later formalized in Lean at EPFL). This recipe maps a receipt digest onto E8 and
uses the nearest-lattice-point distance as a structural integrity metric.

> **Honest posture — read this first.** E8 gives **error-DETECTION geometry only**: the minimum
> distance between distinct lattice codepoints (squared distance 2) is a separation metric. It
> does **NOT** give adversarial-substitution resistance, collision resistance, tamper-proofing,
> or BFT safety — adversarial substitution is **Conjecture 2 (Khipu BFT), NOT proven**. The
> Viazovska proof is **cited prior art, not produced here**. This encoding adds **zero** to the
> locked-proven count (stays **8**). Λ = Conjecture 1.

---

## Prerequisites

```bash
python3 -m pip install httpx   # plus stdlib hashlib for the offline check
```

Live base: `https://a-11-oy.com`.

---

## Quickstart (live, verified)

```python
import httpx

BASE = "https://a-11-oy.com"

# GET verifies the current ledger head; POST verifies any digest you supply.
digest = "d0361e9f2c8d8ac96a1cdab46a6f45de3ed697a9e767d7ccccce2d69b60ae73c"
r = httpx.post(f"{BASE}/api/a11oy/v1/e8/verify", json={"digest": digest}, timeout=30).json()

print("coords (8 × 32-bit):", r["encoding"]["coords"])
print("on_lattice:", r["on_lattice"])                       # => True
print("min_squared_distance:", r["min_squared_distance"])   # => 0.0 ⇒ exact lattice member
print("E8 minimal separation:", r["e8_min_squared_distance"])  # => 2
print("algorithm:", r["algorithm"])   # Conway & Sloane closest-point (decode D8 and D8+glue)
```

---

## Full walkthrough

### Step 1 — Encode the digest

A SHA3-256 digest is 64 hex chars. Split it into 8 × 8-hex groups; each becomes a 32-bit unsigned
integer coordinate. That gives an 8-vector in ℝ⁸ — the input to the E8 closest-point search.

### Step 2 — Find the nearest lattice point

E8 = D8 ∪ (D8 + glue), where D8 is the even-coordinate-sum integer lattice and the glue vector is
(½,…,½). The Conway & Sloane algorithm decodes the input in both cosets and picks the nearer
point. `min_squared_distance` is the squared Euclidean distance to that point.

```python
# min_squared_distance == 0  ⇒  the encoded vector lies EXACTLY on E8 (a lattice member)
# min_squared_distance > 0   ⇒  off-lattice by that amount (a perturbation / corruption signal)
assert r["error_detection"]["is_member"] is True
print(r["error_detection"]["interpretation"])
```

### Step 3 — Interpret it as error-detection geometry

The minimal squared distance between two distinct E8 points is **2**. So any perturbation that
moves a codepoint less than that separation is detectable as "off-lattice by δ." This is exactly
sphere-packing error-detection — the same family of idea as a lattice code's minimum distance.

### Step 4 — Do NOT overclaim

The endpoint ships a `do_not_claim` block. Honor it:

```python
import json
print(json.dumps(r["do_not_claim"]["must_not_claim"], indent=2))
# - "E8 gives sphere-packing / minimum-distance error-DETECTION geometry ONLY."
# - "E8 does NOT give adversarial-substitution resistance, tamper-proofing, or BFT safety."
# - "This encoding adds ZERO to the locked-proven count (stays 8)."
# - "Λ = Conjecture 1, never a theorem."
```

---

## Honest scope table

| Claim | Status |
|---|---|
| E8 is the densest packing in ℝ⁸ | **PROVEN** — Viazovska 2017 (*cited*, formalized in Lean at EPFL) |
| Closest-point decode | **REAL** — Conway & Sloane deterministic algorithm |
| `min_squared_distance` integrity metric | **REAL** error-DETECTION geometry |
| Adversarial / collision / BFT resistance | **NOT claimed** — Conjecture 2, OPEN |
| Locked-proven count contribution | **0** (stays 8 @ `c7c0ba17`) |

---

## See also

- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)** — the receipt the digest comes from.
- **[08 — Receipt knot algebra](08-receipt-knot-algebra.md)** — another structural integrity lens.
- **[20 — Evidence pack for auditors](20-evidence-pack-for-auditors.md)** — bundles ledger heads for offline audit.

## Cite this recipe

```bibtex
@misc{szl_cookbook_e8_verify_2026,
  title        = {E8 lattice receipt verification (SZL Cookbook recipe 17)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/17-e8-lattice-receipt-verification.md}},
  note         = {E8 error-DETECTION geometry; cites Viazovska 2017; NOT security. Λ = Conjecture 1; locked count stays 8.}
}
```

References: M. Viazovska, "The sphere packing problem in dimension 8," *Annals of Mathematics*
185 (2017) 991–1015. J. H. Conway & N. J. A. Sloane, *Sphere Packings, Lattices and Groups*,
3rd ed., Springer 1999 (E8 closest-point algorithm).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
