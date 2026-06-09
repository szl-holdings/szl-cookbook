# Build your own organ

> **Add a new organ to the mesh: a FastAPI service that speaks the SZL contract — `/healthz`, `/v1/honest`, and a DSSE-receipted action endpoint — so it deploys in the UDS bundle next to the shipping flagships (a11oy, killinchu).**
>
> **Headline number: 1 contract, 3 required endpoints, 0 kernel changes.**

Every SZL flagship is the same shape: a small FastAPI app that (1) reports the locked doctrine on
`/v1/honest`, (2) answers `/healthz`, and (3) emits a hash-chained DSSE Khipu receipt for every
governed action. Implement that contract and your organ joins the mesh.

---

## Prerequisites

```bash
python3 -m pip install fastapi uvicorn cryptography
```

---

## Quickstart — the minimal organ

```python
# organ.py — a sixth organ ("yupay", a tally/counter organ) that honors the SZL contract.
import hashlib, json, time
from fastapi import FastAPI, Request

DOCTRINE = {"doctrine": "v11", "declarations": 749, "axioms_unique": 14,
            "sorries_total": 163, "kernel_commit": "c7c0ba17",
            "lambda_uniqueness": "Conjecture 1 — NOT a theorem",
            "slsa": "L1 (honest)", "hatun_willay": True}

app = FastAPI(title="yupay")
_chain = [{"seq": 0, "hash": "0" * 64, "prevHash": None}]

@app.get("/api/yupay/healthz")
def healthz(): return {"ok": True, "organ": "yupay", **{k: DOCTRINE[k] for k in ("doctrine",)}}

@app.get("/api/yupay/v1/honest")
def honest(): return DOCTRINE                      # NEVER report numbers other than 749/14/163

@app.post("/api/yupay/v1/evaluate")
async def evaluate(req: Request):
    body = await req.json()
    prev = _chain[-1]
    payload = {"seq": prev["seq"] + 1, "input": body, "ts": time.time()}
    h = hashlib.sha256((prev["hash"] + json.dumps(payload, sort_keys=True)).encode()).hexdigest()
    rec = {"seq": payload["seq"], "hash": h, "prevHash": prev["hash"]}
    _chain.append(rec)
    return {"verdict": "ALLOW", "receipt": rec, "doctrine": "v11",
            "signature": "PLACEHOLDER — wire Sigstore/cosign per recipe 06"}
```

```bash
uvicorn organ:app --port 8080
curl -s localhost:8080/api/yupay/v1/honest | jq .kernel_commit   # => "c7c0ba17"
```

---

## Full walkthrough

### Step 1 — Honor the doctrine contract

The one rule that cannot bend: `/v1/honest` reports **exactly** `749 / 14 / 163 / c7c0ba17` and
states Λ is **Conjecture 1**. The `DoctrineLock` CRD (shipped by the UDS bundle) fails CLOSED if
an organ declares anything else. Copy the `DOCTRINE` dict above verbatim.

### Step 2 — Hash-chain your receipts

Each receipt's `prevHash` must equal the previous receipt's `hash`. This is the same invariant
every flagship uses; it makes the chain tamper-evident and is what
**[recipe 01](01-verify-a-receipt-end-to-end.md)** checks.

### Step 3 — Sign for real (don't ship PLACEHOLDER)

To go beyond the demo, sign the DSSE PAE with an ECDSA-P256 key and publish the public key like the
org does at [`.github/cosign.pub`](https://github.com/szl-holdings/.github/blob/main/cosign.pub):

```python
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes, serialization
def sign_pae(priv, payload_type: str, body: bytes) -> bytes:
    pae = b"DSSEv1 %d %b %d %b" % (len(payload_type), payload_type.encode(), len(body), body)
    return priv.sign(hashlib.sha256(pae).digest(), ec.ECDSA(ec.Prehashed(hashes.SHA256())))
```

### Step 4 — Package as a UDS bundle entry

Add a `zarf.yaml` + `uds-bundle.yaml` for your organ and fold it into the bundle per
**[recipe 13 — Build a UDS bundle from scratch](13-build-uds-bundle-from-scratch.md)**. Reuse the
three CRDs: `LambdaGate`, `KhipuReceipt`, `DoctrineLock`.

### Step 5 — Register with the Operator console

The **Operator** role (internal codename *rosie* — retired; ships inside a11oy, not a standalone
service) is the operator console / nervous system. Expose your organ's `/v1/*` surface and it
appears in the mesh health board. Confirm with `curl https://szlholdings-a11oy.hf.space/api/a11oy/v1/mcp/tools`.

---

## See also

- **[13 — Build a UDS bundle from scratch](13-build-uds-bundle-from-scratch.md)**
- **[06 — Verify cosign + Rekor](06-cosign-rekor-slsa-l1.md)** — sign your organ image.
- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)**
- Reference organs: [a11oy](https://github.com/szl-holdings/a11oy) · [killinchu](https://github.com/szl-holdings/killinchu)

## Cite this recipe

```bibtex
@misc{szl_cookbook_build_organ_2026,
  title        = {Build your own organ (SZL Cookbook recipe 07)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/07-build-your-own-organ.md}},
  note         = {Doctrine contract: 749/14/163, c7c0ba17, Λ = Conjecture 1.}
}
```

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
