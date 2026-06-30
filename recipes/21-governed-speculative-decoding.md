# Governed speculative decoding — speedup model + receipt

> **Probe the speculative-decoding surface: get the acceptance-rejection cost curve, the expected per-step token yield, and a receipted snapshot — all honestly labeled MODELED until a same-family draft+target pair is live on the sovereign tower.**
>
> **Headline number: `GET /specdec/health` → `label: "SPEC-DECODE ROADMAP"` (draft not yet pulled) or `"SPEC-DECODE MEASURED"` once the llama3.2:1b draft is present on the tower.**

Speculative decoding (Leviathan et al. 2023, arXiv:2211.17192; Chen et al. 2023, arXiv:2302.01318)
pairs a small **draft** model with a large **target** — the draft proposes *k* tokens in one pass;
the target accepts or rejects them via sampling-preserving verification. Throughput scales as
\(1 + k\alpha\) where α is the per-token acceptance rate. The SZL surface computes this curve,
stores the speedup accounting, and wraps the whole result in a governance receipt.

> **Honest posture.** Until both draft and target are on the same sovereign node (shared tokenizer
> required), the surface returns `label: "SPEC-DECODE ROADMAP"` and `measured: "UNAVAILABLE"`.
> The acceptance-rate curve is `MODELED` (Leviathan Lemma 1 applied to the configured *k*).
> Λ = Conjecture 1 (advisory). No joules fabricated. No throughput fabricated.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`. Check current state:

```bash
curl -s https://a-11-oy.com/api/a11oy/v1/specdec/health \
  | python3 -m json.tool \
  | grep -E '"status"|"label"|"same_family_pair"|"measured_run_possible"'
```

Expected (tower down today):
```json
"status": "LIVE",
"label": "SPEC-DECODE ROADMAP (no same-family pair)",
"measured_run_possible": false
```

---

## Quickstart — run the surface

```python
import httpx, json

BASE = "https://a-11-oy.com"

# POST a prompt (tower reachable → MEASURED; tower down → MODELED cost curve)
r = httpx.post(
    f"{BASE}/api/a11oy/v1/specdec/run",
    json={"prompt": "The sovereign GPU mesh uses governed speculative decoding to"},
    timeout=60,
).json()

# Always present (even when tower is down)
acctg  = r["payload"]["accounting_modeled"]
k      = acctg["k"]
label  = r["payload"]["label"]
digest = r["payload_sha3_256"]

print(f"k (draft steps):         {k}")
print(f"State label:             {label}")
print(f"Expected speedup @ α=0.7: {acctg['expected_speedup_at_alpha']['0.7']:.3f}×")
print(f"Receipt digest (SHA3-256): {digest}")
print(f"Signed: {r['signature']['signed']}")

# Offline verify the receipt (zero server round-trip)
import json as _j, hashlib
payload_bytes = _j.dumps(
    r["payload"], sort_keys=True, separators=(",", ":"), ensure_ascii=False
).encode("utf-8")
recomputed = hashlib.sha3_256(payload_bytes).hexdigest()
assert recomputed == digest, "RECEIPT TAMPERED"
print("Offline receipt verify: OK ✓")
```

---

## Full walkthrough

### Step 1 — health check

```python
h = httpx.get(f"{BASE}/api/a11oy/v1/specdec/health", timeout=15).json()
print(h["same_family_pair"])   # {"found": false, "reason": "tower unreachable"} until pair pulled
```

### Step 2 — cost curve (always available)

The `accounting_modeled` block applies **Leviathan et al. 2023 Lemma 1** (cited, not re-derived):

| α (acceptance rate) | Expected tokens/step | Expected speedup |
|---|---|---|
| 0.5 | 1.94 | 1.08× |
| 0.7 | 2.77 | 1.54× |
| 0.9 | 4.10 | 2.28× |

These are MODELED projections — not measurements. Honest `label: "MODELED"`.

### Step 3 — offline receipt verification

Every `/specdec/run` response includes a `payload_sha3_256` field and a `digest_canonicalization`
note. Verify in one line:

```python
import json, hashlib
payload_bytes = json.dumps(
    r["payload"], sort_keys=True, separators=(",", ":"), ensure_ascii=False
).encode()
assert hashlib.sha3_256(payload_bytes).hexdigest() == r["payload_sha3_256"]
```

### Step 4 — activate MEASURED mode (founder / tower operator)

When the tower (RTX 4060 Ti, `https://gpu.a-11-oy.com`) is reachable and holds a
same-family draft+target pair, the endpoint auto-detects and runs a MEASURED block:

```bash
# On the tower
ollama pull llama3.2:1b    # draft (same llama family as existing llama3.1:8b)
ollama pull llama3.1:8b    # target (likely already present)

# Confirm
curl -s https://gpu.a-11-oy.com/api/tags | python3 -m json.tool | grep '"name"'
```

After this, `POST /specdec/run` returns `label: "SPEC-DECODE MEASURED"` with a real
`accepted_rate`, `mean_accepted_len`, and `speedup_modeled` derived from live token sampling.

---

## Expected response shape

```json
{
  "schema": "szl.a11oy.specdec.receipt.v1",
  "payload": {
    "schema": "szl.a11oy.specdec.v1",
    "label": "SPEC-DECODE ROADMAP",
    "measured": "UNAVAILABLE",
    "accounting_modeled": {
      "label": "MODELED (acceptance-rejection accounting curve, not a measurement)",
      "k": 4,
      "expected_speedup_at_alpha": {"0.5": 1.0764, "0.7": 1.5406, "0.9": 2.2751}
    }
  },
  "payload_sha3_256": "<sha3-256 of canonicalised payload>",
  "signature": {"signed": false, "status": "DSSE_PLACEHOLDER"}
}
```

When tower is live and same-family pair present:

```json
{
  "payload": {
    "label": "SPEC-DECODE MEASURED",
    "measured": "MEASURED",
    "accepted_rate": 0.73,
    "mean_accepted_len": 3.1,
    "speedup_modeled": 1.63,
    "n": 50,
    "draft_model": "llama3.2:1b",
    "target_model": "llama3.1:8b",
    "quality_delta": {"identical_rate": 1.0, "label": "MEASURED (lossless)"}
  }
}
```

---

## Doctrine

| Field | Value |
|---|---|
| Locked-proven | 8 ({F1,F4,F7,F11,F12,F18,F19,F22}) |
| Λ | Conjecture 1 (advisory, ≤0.99, NOT a theorem) |
| Energy | UNAVAILABLE until NVML meter live |
| Throughput | MODELED until same-family pair on tower |
| Citations | arXiv:2211.17192 (Leviathan 2023); arXiv:2302.01318 (Chen 2023); arXiv:2406.02532 (SpecExec, MIT reference); arXiv:2402.12374 (Sequoia, MIT reference) |

---
*Doctrine v11 LOCKED · Λ = Conjecture 1 · SLSA L1*
