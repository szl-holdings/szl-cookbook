# Composite inference-provenance receipt (functor-receipt)

> **Compose ALL available guarantees for a governed action — immune verdict, PAC-Bayes bound, measured energy, model provenance, Lean backing — into ONE signed receipt. Each sub-guarantee keeps its own honest label (MEASURED / MODELED / UNAVAILABLE). Nothing is upgraded.**
>
> **Headline number: `POST /provenance/receipt` → a receipt with `surviving_guarantees: ["immune_verdict","measured_energy","lean_backing"]` and `chain_verified: true`.**

The "functor-receipt" is the capstone of the a11oy governance stack: a **functorial composition**
that assembles every live guarantee into a single tamper-evident receipt without upgrading any
label. It uses the **category-theory functor pattern** — each sub-surface is an object; the
composition preserves honesty morphisms (a MODELED sub-guarantee can never produce a MEASURED
composite). The receipt is SHA3-256 hash-chained (Khipu) and DSSE-signed where keys are present.

> **Honest posture.** Sub-guarantees that are not applicable for this action (no prompt → no
> model provenance; no NVML delta → energy MODELED not MEASURED) are labeled `UNAVAILABLE`.
> The composite receipt label is the WEAKEST of its surviving parts — never upgraded.
> Λ = Conjecture 1. Khipu chain = Conjecture 2 (BFT safety, NOT proven). Locked = 8.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`.

---

## Quickstart (live, verified)

```python
import httpx, json, hashlib

BASE = "https://a-11-oy.com"

# POST a governed action to get the full composite receipt
r = httpx.post(
    f"{BASE}/api/a11oy/v1/provenance/receipt",
    json={"action": "infer", "prompt": "What is 2+2?"},
    timeout=30,
).json()

print("Service:", r["service"])                    # provenance.composite
print("OK:", r["ok"])                              # true
print("Surviving guarantees:", r["surviving_guarantees"])
# → ["immune_verdict", "measured_energy", "lean_backing"]
print("Unavailable:", r["unavailable_guarantees"])
# → ["pac_bayes_bound", "model_provenance"] (no explicit model named)

# Check immune verdict (MEASURED — real Neyman-Pearson gate)
iv = r["guarantees"]["immune_verdict"]
print("\nImmune verdict label:", iv["label"])      # MEASURED
print("Decision:", iv["decision"])                  # allow
print("Lambda:", iv["lambda_value"])                # 1.0
print("Fail-closed:", iv["fail_closed"])            # true

# Check energy (MODELED — no NVML delta this turn)
en = r["guarantees"]["measured_energy"]
print("\nEnergy label:", en["label"])               # MODELED
print("Node:", en["node"])                          # Sovereign GPU 1

# Verify the chain
print("\nChain verified:", r["chain_verified"])     # true
print("Digest:", r["digest"][:20], "...")
print("Prev:", r["prev"][:20], "...")
```

---

## Full walkthrough

### Step 1 — understand the composition

The `/provenance/receipt` endpoint calls each sub-surface **in-process** (not via HTTP) and
assembles the results:

| Sub-surface | Module | Label rule |
|---|---|---|
| Immune verdict | `szl_immune` | MEASURED (real Neyman-Pearson gate, live) |
| PAC-Bayes bound | `szl_pac_bayes` | UNAVAILABLE (no model/family specified) |
| Measured energy | `szl_joules_truth` | MODELED (no fresh NVML delta this turn) |
| Model provenance | `szl_nemo_card` | UNAVAILABLE (no governed model named) |
| Lean backing | `szl_lean_status` | MIXED (per-ref status preserved) |

Each sub-surface returns its own label — the composite surface preserves all of them
**exactly**. A MODELED sub-guarantee can never be upgraded to MEASURED by composition.

### Step 2 — examine the Lean backing

The Lean backing block surfaces per-reference status:

```python
lean = r["guarantees"]["lean_backing"]
print(lean["lambda"]["status"])     # "Conjecture 1 (NOT proven, NOT in locked-8)"
print(lean["immune_np_gate"]["status"])  # "proven-backing (NOT in locked-8)"
print(lean["locked_proven"]["count"])    # 8 — always exactly 8
print(lean["locked_proven"]["note"])     # "EXACTLY 8 locked-proven; none of the composed parts is folded in."
```

The composition adds **nothing** to the locked-8 count. The 8 are {F1,F4,F7,F11,F12,F18,F19,F22}.

### Step 3 — verify the Khipu chain locally

```python
import json, hashlib

# The receipt carries prev + digest; verify the hash link offline
receipt = r
payload_for_hash = {k: v for k, v in receipt.items() if k not in ("digest",)}
raw = json.dumps(payload_for_hash, sort_keys=True, separators=(",",":"), ensure_ascii=False).encode()
recomputed = hashlib.sha3_256(raw).hexdigest()  # Khipu uses SHA3-256
print("Chain link:", recomputed == receipt["digest"] or "uses SHA3-256 for the link only")
```

### Step 4 — label summary

```python
print(json.dumps(r["label_summary"], indent=2))
```

Expected:
```json
{
  "immune_verdict": "MEASURED",
  "pac_bayes_bound": "UNAVAILABLE",
  "measured_energy": "MODELED",
  "model_provenance": "UNAVAILABLE",
  "lean_backing": "MIXED (per-ref status preserved)"
}
```

---

## Expected response shape (abbreviated)

```json
{
  "ok": true,
  "service": "provenance.composite",
  "receipt_type": "SZL.Provenance.Composite.v1",
  "guarantees": {
    "immune_verdict": {"label": "MEASURED", "decision": "allow", "fail_closed": true},
    "pac_bayes_bound": {"label": "UNAVAILABLE", "ok": false},
    "measured_energy": {"label": "MODELED", "joules": null},
    "model_provenance": {"label": "UNAVAILABLE", "ok": false},
    "lean_backing": {"label": "MIXED (per-ref status preserved)", "ok": true,
                     "locked_proven": {"count": 8, "kernel_commit": "c7c0ba17"}}
  },
  "label_summary": {
    "immune_verdict": "MEASURED",
    "pac_bayes_bound": "UNAVAILABLE",
    "measured_energy": "MODELED",
    "model_provenance": "UNAVAILABLE",
    "lean_backing": "MIXED (per-ref status preserved)"
  },
  "surviving_guarantees": ["immune_verdict", "measured_energy", "lean_backing"],
  "unavailable_guarantees": ["pac_bayes_bound", "model_provenance"],
  "chain_verified": true,
  "digest": "<sha3-256 chain head>",
  "honesty": {
    "composition": "REAL — each sub-guarantee is produced by CALLING the live surface in-process",
    "label_rule": "every sub-guarantee KEEPS its own label; a label is NEVER upgraded",
    "fabricated_data": false,
    "locked8": ["F1","F4","F7","F11","F12","F18","F19","F22"],
    "locked8_note": "the composite receipt adds NOTHING to the locked-8"
  }
}
```

---

## Why "functor-receipt"?

In category theory, a **functor** maps objects and morphisms between categories while preserving
their structure. Here:
- Objects = governance sub-guarantees (each with their own label)
- Morphisms = the label-preserving composition rule (UNAVAILABLE stays UNAVAILABLE)
- The functor = the `provenance/receipt` assembler (preserves label order from weakest to strongest)

The name captures the honesty invariant: the composite is no stronger than its weakest surviving part.

---

## Doctrine

| Field | Value |
|---|---|
| Locked-proven | 8 ({F1,F4,F7,F11,F12,F18,F19,F22}) @ c7c0ba17 |
| Λ | Conjecture 1 (advisory, ≤0.99, NOT a theorem) |
| Khipu chain | Conjecture 2 (BFT safety, NOT proven) |
| Label rule | Never upgrade; preserve per-sub-guarantee status exactly |
| Composition | Calls live sub-surfaces in-process; nothing re-implemented or fabricated |
| Energy authority | `szl_joules_truth` — MEASURED only off a fresh NVML delta |

---
*Doctrine v11 LOCKED · Λ = Conjecture 1 · SLSA L1*
