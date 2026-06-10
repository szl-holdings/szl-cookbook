# Memory-attested reasoning

> **Drive a11oy's memory cortex (internal codename *amaru* — retired) and read back the
> DSSE-wrapped receipt chain — every inference carries its provenance, every memory carries its receipt.**
>
> **Headline number: 1 recall → N cited memories → 1 hash-chained DSSE receipt.**

The **a11oy Memory** role — the memory cortex historically prototyped under the internal
codename *amaru* — is shipped today **inside a11oy**, not as a separate Space. Its contract is
unusual: it refuses to surface a recalled memory without also surfacing the receipt for the write
that created it. This recipe drives the live a11oy memory path and shows the cited receipt chain.

> **Honest scope.** There is no standalone `amaru` Space or repo (retired codename). The live
> memory cortex is `a11oy`'s `/api/a11oy/v2/unay/recall` and `/api/a11oy/v1/mcp/call` endpoints.
> Cardano anchoring is demo-seeded, not on-chain mainnet. Live tick signatures are PLACEHOLDER;
> the lake's `khipu/*.ndjson` carries a **real** ECDSA-P256 signature you can verify
> (**[recipe 01](01-verify-a-receipt-end-to-end.md)**).

---

## Prerequisites

```bash
# curl + jq. The a11oy Space is live and the doctrine/recall probes need no credentials.
```

---

## Quickstart (live, verified)

```bash
A11OY=https://szlholdings-a11oy.hf.space

# Recall memory with cited receipts. Returns recalled chunks each carrying the receipt_seq
# of the write that created them.
curl -s -X POST $A11OY/api/a11oy/v2/unay/recall -d '{"query":"doctrine","k":5}' | jq '{
  total: .total,
  items: [.items[] | {text: .text, receipt_seq: .receipt_seq}]
}'
```

Each recalled memory cites the `receipt_seq` of its write — that sequence number is the
citation index into the hash-chained receipt log.

---

## Full walkthrough

### Step 1 — Read the honest cortex posture

```bash
curl -s $A11OY/api/a11oy/v1/honest | jq '{doctrine, memory, receipts, lambda}'
# memory: "recall is cited; Cardano-anchored receipts are demo-seeded, not on-chain mainnet."
# receipts: "DSSE envelopes; Sigstore CI signing roadmap (live sigs PLACEHOLDER)."
# lambda: "Λ = Conjecture 1 (machine-checked false as a universal theorem); conditional Λ proven."
```

> **Honest note.** Live recall/tick signatures are `PLACEHOLDER`; the lake's
> `khipu/*.ndjson` carries a **real** ECDSA-P256 signature you can verify
> (**[recipe 01](01-verify-a-receipt-end-to-end.md)**). Cardano anchoring is demo-seeded — see
> **[recipe 10](10-cardano-dsse-blood-ledger.md)**.

### Step 2 — Inspect the cited memory steps

```bash
curl -s -X POST $A11OY/api/a11oy/v2/unay/recall -d '{"query":"locked","k":5}' \
  | jq '.items[] | {text, receipt_seq, source}'
```

Each recalled chunk emits its own `receipt_seq` — that sequence number is the citation index into
the chain. The historical 7-chakra serpentine framing (root → … → crown) was the *amaru*
prototype's internal scheduler; the shipping recall path exposes the same cited-receipt contract.

### Step 3 — Decode the DSSE payload

```bash
curl -s -X POST $A11OY/api/a11oy/v1/mcp/call \
  -d '{"tool":"a11oy_gate","args":{}}' \
  | jq -r '.dsse.payload' | base64 -d | jq .
# => {"hash":"…","prevHash":"…","seq":N}  — the signed body of the tick receipt
```

The payload is the canonical receipt body. The signature covers the DSSE PAE of this payload
(see **[recipe 01](01-verify-a-receipt-end-to-end.md)** for the PAE math).

### Step 4 — Cited reasoning: every claim points to a receipt

The contract is "every recalled memory cites its source." In a RAG answer, each cited memory
chunk carries the `receipt_seq` of the write that created it, so a reader can pull and verify the
exact receipt behind any sentence.

```bash
curl -s "$A11OY/khipu/log?limit=5" | jq '{total, head_seq, items}'
# (total resets to 0 on Space restart; run a recall/tick first to populate the chain)
```

### Step 5 — Overwatch invariants

```bash
curl -s $A11OY/api/a11oy/v1/honest | jq '.invariants'
# The cortex self-audit board: locked 749/14/163, trust < 100%, Λ = Conjecture 1.
```

---

## What you proved

A recalled memory in a11oy is inseparable from its receipt. You can take any cited memory, find
its `receipt_seq`, decode the DSSE payload, and (for lake receipts) verify the signature — closing
the loop from *claim* to *cryptographic provenance*.

---

## See also

- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)** — verify the receipts this cites.
- **[10 — Cardano-anchored DSSE blood ledger](10-cardano-dsse-blood-ledger.md)** — anchor the chain.
- **[08 — Receipt knot algebra](08-receipt-knot-algebra.md)** — the chain's topology.
- Live: [a11oy](https://szlholdings-a11oy.hf.space) (hosts the a11oy Memory; codename *amaru* retired)

## Cite this recipe

```bibtex
@misc{szl_cookbook_memory_attested_2026,
  title        = {Memory-attested reasoning (SZL Cookbook recipe 05)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/05-memory-attested-reasoning.md}},
  note         = {Cited recall inside a11oy; live sigs PLACEHOLDER, lake sigs real. Doctrine v11 c7c0ba17.}
}
```

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
