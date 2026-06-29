# Evidence pack for auditors

> **Pull a single, offline-verifiable auditor evidence pack from the live a11oy Space and recompute its `sha3_256` self-digest yourself — zero server round-trip, zero trust required.**
>
> **Headline number: 1 GET → an envelope whose `pack_sha3_256` you recompute locally and confirm bit-for-bit.**

Auditors do not want a slide deck; they want artifacts they can verify without trusting the
server. The `evidence-pack` endpoint assembles one pack at request time from already-live a11oy
surfaces (assurance matrix, Khipu organ chain heads, lake health, doctrine, cosign public key)
and stamps it with a SHA3-256 self-digest that anyone can recompute offline.

> **Honest scope.** The pack is **stdlib-only, no fabrication** — assembled from live surfaces.
> The `sha3_256` self-digest is **independently recomputable offline**. The DSSE signature is
> **`signed: false` / `DSSE_PLACEHOLDER`** when no demo signing key is present in the runtime —
> **honest-unsigned**, never a fabricated signature. Doctrine numbers in the pack are the locked
> 749/14/163 @ `c7c0ba17`; Λ = Conjecture 1.

---

## Prerequisites

```bash
python3 -m pip install httpx   # hashlib + json are stdlib
```

Live base: `https://a-11-oy.com`.

---

## Quickstart (live, verified — offline self-digest check)

```python
import httpx, json, hashlib

BASE = "https://a-11-oy.com"
env = httpx.get(f"{BASE}/api/a11oy/v1/assurance/evidence-pack", timeout=60).json()

# Recompute the self-digest exactly as documented in env["digest_canonicalization"]:
canon = json.dumps(env["pack"], sort_keys=True, separators=(",", ":"), ensure_ascii=False)
recomputed = hashlib.sha3_256(canon.encode("utf-8")).hexdigest()

assert recomputed == env["pack_sha3_256"], "TAMPER DETECTED"
print("offline self-digest verified:", recomputed)
print("signature:", env["signature"]["status"], "signed?", env["signature"]["signed"])
print("doctrine:", env["pack"]["doctrine"])
print("requirements in assurance matrix:", env["pack"]["assurance_matrix"]["requirement_count"])
```

If `recomputed == pack_sha3_256`, the pack is intact — and you proved it **without trusting the
server**, because you canonicalised and hashed the `pack` object yourself.

---

## Full walkthrough

### Step 1 — Fetch the envelope

```bash
curl -s https://a-11-oy.com/api/a11oy/v1/assurance/evidence-pack \
  | jq '{schema, pack_sha3_256, digest_alg, digest_canonicalization, offline_verify, signature}'
```

The envelope (`szl.a11oy.assurance.evidence-pack.envelope.v1`) wraps the `pack` plus
`pack_sha3_256`, `digest_alg`, the exact `digest_canonicalization` recipe, an `offline_verify`
instruction, and the `signature` block.

### Step 2 — What's in the pack

| Section | Content |
|---|---|
| `assurance_matrix` | Compliance requirements (e.g. MC-1 Model Card → live artifact + status) with source URLs |
| `khipu_organs` | Per-organ receipt chain heads (the same heads exposed at `/api/lake/v1/health`) |
| `lake_health` | Receipt ledger state (`chain_alg: sha3_256`, total receipts) |
| `doctrine` | Locked 749/14/163 @ `c7c0ba17`, 8 locked-proven, Λ = Conjecture 1 |
| `cosign_public_key` | Demo cosign key id + `sha256_fingerprint` + verify-key URL |
| `honest_disclosure` | The honest-labels statement |

### Step 3 — Recompute the digest (the trust move)

Canonicalise the `pack` with `json.dumps(pack, sort_keys=True, separators=(",",":"),
ensure_ascii=False)`, UTF-8 encode, `sha3_256`, hex. Confirm it equals `pack_sha3_256`. This is
the entire audit — no round-trip, no API key, no trust in the server's claim.

### Step 4 — Read the signature honestly

```python
print(env["signature"])
# {"signed": false, "status": "DSSE_PLACEHOLDER",
#  "note": "no demo signing key in runtime (SZL_DEMO_SIGN_KEY absent) — honest-unsigned.
#           The sha3_256 self-digest is independently recomputable offline; NEVER a fabricated signature."}
```

When a signing key *is* present the pack is DSSE-signed; when absent it says so plainly. The
integrity guarantee (self-digest) holds either way; the *authenticity* guarantee (signature) is
only as strong as the present key — and the endpoint never pretends otherwise.

---

## Honest scope table

| Claim | Status |
|---|---|
| Pack assembled from live surfaces | **REAL** — stdlib-only, no fabrication |
| `sha3_256` self-digest | **REAL** — recomputable offline, zero round-trip |
| DSSE signature | **`DSSE_PLACEHOLDER`** when no runtime key — honest-unsigned |
| Doctrine numbers | locked **749/14/163 @ `c7c0ba17`** |
| Λ | **Conjecture 1** — advisory, never a theorem |

---

## See also

- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)** — single-receipt verification.
- **[06 — cosign + Rekor SLSA L1](06-cosign-rekor-slsa-l1.md)** — image-signing provenance.
- **[12 — Doctrine ledger query](12-doctrine-ledger-query.md)** — assert the locked numbers across sources.

## Cite this recipe

```bibtex
@misc{szl_cookbook_evidence_pack_2026,
  title        = {Evidence pack for auditors (SZL Cookbook recipe 20)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/20-evidence-pack-for-auditors.md}},
  note         = {Offline-verifiable sha3_256 self-digest; honest-unsigned DSSE. Locked 749/14/163. Λ = Conjecture 1.}
}
```

References: FIPS 202 (SHA-3 / SHA3-256); DSSE — Secure Systems Lab, in-toto Attestation Framework;
DoDM 5000.101 (DoD AI Acquisition Policy, assurance matrix source).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
