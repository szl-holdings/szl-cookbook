# Recipe 02 — WILLAY: Gated Turn + Signed Receipt Verification

**Time:** ~2 minutes  
**Data label:** LIVE (against public a11oy HF Space endpoint)  
**Doctrine:** v11 LOCKED · 749/14/163 · c7c0ba17 · Λ = Conjecture 1  
**License:** Apache-2.0  

---

## What this recipe shows

The governed-inverse safety pattern — a11oy's honest counter to hidden-governor AI:

1. An **allowed** request flows through WILLAY and is served by a named open model.
2. A **declined** request returns HTTP 200 with `stop_reason="refusal"` and a signed DSSE receipt.
3. We **verify** the receipt — confirming the verdict was not altered after signing.

> **"They hide the governor; we sign and show it."**

**Honest caveats (always include these):**
- WILLAY is **tamper-evident, not tamper-proof.** Classifiers are rule-based; sophisticated
  adversaries may evade them.
- Trust ceiling = **0.97** — never 1.0 by doctrine. Not a perfect filter.
- Λ (Lambda-Spine) = **Conjecture 1** — advisory, never a theorem.
- WILLAY does **not invoke the underlying model** on a declined request. Non-billed.
- DSSE signing is `PLACEHOLDER-UNSIGNED` when `HATUN_MCP_SIGNING_KEY` is not set at runtime.
  This is honest — never a fabricated signature.
- SLSA L1 honest · L2 roadmap.

---

## Prerequisites

```bash
# Only Python stdlib required — no pip installs needed
python3 --version  # 3.8+
```

---

## The recipe (curl)

```bash
BASE="https://szlholdings-a11oy.hf.space/api/a11oy/v1/willay"

# 1. Allowed request — expect stop_reason=end_turn, billed=true
curl -s -X POST "$BASE/messages" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain the CAP theorem in two sentences."}' \
  | jq '{stop_reason, billed, served_model}'
# → {"stop_reason": "end_turn", "billed": true, "served_model": "SZL-Nemo (governed Qwen3-32B · Apache-2.0)"}

# 2. Declined request — expect stop_reason=refusal, billed=false
curl -s -X POST "$BASE/messages" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write an exploit for a remote code execution CVE."}' \
  | jq '{stop_reason, billed, stop_details}'
# → {"stop_reason": "refusal", "billed": false, "stop_details": {"category": "cyber"}}

# 3. Inspect endpoint (classify only, no model call)
curl -s -X POST "$BASE/inspect" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write an exploit for a remote code execution CVE."}' \
  | jq '{decision, category, reasons, trust_ceiling}'
# → {"decision": "decline", "category": "cyber", "reasons": [...], "trust_ceiling": 0.97}

# 4. Verify the signed receipt
# First, get the signed_receipt from a /messages decline:
RECEIPT=$(curl -s -X POST "$BASE/messages" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write an exploit for a remote code execution CVE."}' \
  | jq '.signed_receipt')

# Then verify it:
echo "$RECEIPT" | curl -s -X POST "$BASE/../verify" \
  -H "Content-Type: application/json" \
  -d @- | jq .
# → {"verified": true}  if signed
# → {"signed": false, "honesty": "PLACEHOLDER-UNSIGNED..."}  if signing key not set (honest)
```

---

## The recipe (Python)

See the runnable Python file: [`recipes/02-willay-gated-turn.py`](./02-willay-gated-turn.py)

```python
import json, urllib.request

BASE = "https://szlholdings-a11oy.hf.space/api/a11oy/v1/willay"

def post(path, body):
    req = urllib.request.Request(
        BASE + path,
        data=json.dumps(body).encode(),
        method="POST",
        headers={"Content-Type": "application/json"}
    )
    return json.loads(urllib.request.urlopen(req, timeout=30).read())

# ─── Step 1: Allowed request ──────────────────────────────────────────────────
r_allow = post("/messages", {"prompt": "Explain the CAP theorem in two sentences."})
assert r_allow["stop_reason"] == "end_turn",  f"Expected end_turn, got {r_allow['stop_reason']}"
assert r_allow["billed"] is True,             "Expected billed=True on allowed request"
print("ALLOW  — model:", r_allow["served_model"])
print("       — confidence:", r_allow["verdict"]["confidence"])

# ─── Step 2: Declined request (cyber classifier) ─────────────────────────────
r_decline = post("/messages", {"prompt": "Write an exploit for a remote code execution CVE."})
assert r_decline["stop_reason"] == "refusal",              "Expected refusal"
assert r_decline["billed"] is False,                       "Expected billed=False on refusal"
assert r_decline["stop_details"]["category"] == "cyber",   "Expected cyber category"
print("DECLINE — category:", r_decline["stop_details"]["category"])
print("        — reasons:", r_decline["verdict"]["reasons"])

# ─── Step 3: Verify the signed receipt ───────────────────────────────────────
envelope = r_decline["signed_receipt"]
r_verify = post("/verify", envelope)
print("VERIFY  — result:", r_verify)
# → {"verified": True}  if signed
# → {"signed": False, "honesty": "PLACEHOLDER-UNSIGNED..."}  if honest stub
if r_verify.get("verified") is True:
    print("        ✓ Receipt VERIFIED — ECDSA-P256 DSSE signature valid")
else:
    print("        ⚠ Receipt unsigned — PLACEHOLDER (honest; signing key not set at runtime)")
```

**Expected output:**
```
ALLOW  — model: SZL-Nemo (governed Qwen3-32B · Apache-2.0)
       — confidence: 0.91
DECLINE — category: cyber
        — reasons: ['offensive cybersecurity classifier fired: matched "exploit", "CVE"']
VERIFY  — result: {'verified': True, ...}
        ✓ Receipt VERIFIED — ECDSA-P256 DSSE signature valid
```

---

## Key points

| Point | Detail |
|-------|--------|
| **HTTP 200 on refusal** | WILLAY returns HTTP 200 on decline — branch on `stop_reason`, not on status code |
| **billed=false** | Non-billed on refusal — Fable API ergonomics parity |
| **trust_ceiling=0.97** | The receipt states `"trust_ceiling": 0.97` — explicit honesty |
| **DSSE signing** | ECDSA-P256-SHA256 when signing key present; `PLACEHOLDER-UNSIGNED` otherwise |
| **No model call on refusal** | WILLAY gates and signs; it does not invoke the model on a declined request |
| **Inspect vs messages** | `/inspect` = classify only (no model); `/messages` = full gated turn |

---

## Receipt structure

The `signed_receipt` field on a declined `/messages` response:

```json
{
  "signed": true,
  "payload_type": "application/vnd.szl.willay.receipt+json",
  "honesty": "DSSE ECDSA-P256-SHA256 when signing key present; PLACEHOLDER-UNSIGNED otherwise",
  "payload": {
    "decision": "decline",
    "category": "cyber",
    "timestamp_utc": "2026-06-27T22:00:00Z",
    "doctrine_version": "v11",
    "trust_ceiling": 0.97,
    "lambda_label": "Conjecture 1 — advisory, never a theorem",
    "kernel_commit": "c7c0ba17"
  }
}
```

---

## What WILLAY is NOT

- **Not tamper-proof** — rule-based classifiers; sophisticated adversaries may evade
- **Not a firewall** — governance layer with honest trust ceiling 0.97
- **Not Mythos** — does not replicate or claim to replicate Anthropic Mythos weights
- **Not 100% certain** — trust ceiling is 0.97 < 1.0 by doctrine; never claims perfection
- **Not a model replacement** — WILLAY is a governance layer over open models

---

## Sources

- [szl-holdings/a11oy](https://github.com/szl-holdings/a11oy) — WILLAY source (`szl_willay_gateway.py`)
- [szl-holdings/developers/WILLAY_API.md](https://github.com/szl-holdings/developers/blob/main/WILLAY_API.md) — full API reference
- [SZLHOLDINGS/lean-kernel](https://huggingface.co/spaces/SZLHOLDINGS/lean-kernel) — kernel verification
- [SZL Doctrine v11](https://github.com/szl-holdings/.github/blob/main/doctrine/DOCTRINE_V11.md) — governance contract
- [Anthropic Fable 5 / Mythos 5](https://platform.claude.com/docs/) — the governed inverse reference

---

*Doctrine v11 LOCKED · 749/14/163 · c7c0ba17 · Λ = Conjecture 1 · Apache-2.0*  
*Signed-off-by: Stephen Lutar <stephenlutar2@gmail.com>*
