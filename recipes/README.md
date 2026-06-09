# SZL Cookbook — Recipe Index

The customer-facing recipe library for the SZL flagships. **Only two flagships ship live today:
[a11oy](https://szlholdings-a11oy.hf.space) and [killinchu](https://szlholdings-killinchu.hf.space).**
The Provenance Anchor, Operator, and Policy roles (internal codenames *amaru*, *rosie*, *sentra* —
retired) ship their live equivalents **inside a11oy**, not as separate Spaces or repos.

Start with **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)**; it needs no
credentials and cryptographically verifies a real receipt in under a minute.

## Flagship recipes (01–15)

The "Role(s)" column names the honest doctrine role each recipe exercises. Where a role's live
equivalent ships inside a11oy, the recipe drives the a11oy endpoint.

| # | Recipe | Role(s) |
|---|--------|---------|
| 01 | [Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md) | a11oy · Provenance Anchor + Policy (in a11oy) |
| 02 | [Deploy the SZL UDS bundle](02-deploy-5-flagship-uds-bundle.md) | a11oy · killinchu (2 shipping images) |
| 03 | [Fine-tune a customer compliance regime](03-fine-tune-compliance-regime.md) | Policy role (in a11oy) · killinchu |
| 04 | [Drone counter-UAS verdict](04-drone-counter-uas-verdict.md) | killinchu |
| 05 | [Memory-attested reasoning](05-memory-attested-reasoning.md) | Provenance Anchor role (in a11oy) |
| 06 | [Verify cosign + Rekor for SLSA L1](06-cosign-rekor-slsa-l1.md) | a11oy · killinchu |
| 07 | [Build your own organ](07-build-your-own-organ.md) | Operator role (pattern) |
| 08 | [Receipt knot algebra](08-receipt-knot-algebra.md) | a11oy · Operator role |
| 09 | [PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md) | a11oy · Policy role |
| 10 | [Cardano-anchored DSSE blood ledger](10-cardano-dsse-blood-ledger.md) | Provenance Anchor role (in a11oy) |
| 11 | [Kitaev surface drift detection](11-kitaev-surface-drift-detection.md) | killinchu · Policy role |
| 12 | [Doctrine ledger query](12-doctrine-ledger-query.md) | a11oy · killinchu + lake |
| 13 | [Build a UDS bundle from scratch](13-build-uds-bundle-from-scratch.md) | a11oy · killinchu |
| 14 | [Replicate the Walrus α-gap measurement](14-replicate-walrus-alpha-gap.md) | killinchu |
| 15 | [Air-gapped install](15-air-gapped-install.md) | a11oy · killinchu |

> **Codename note.** *amaru* (→ Provenance Anchor), *rosie* (→ Operator), and *sentra* (→ Policy)
> are retired internal codenames preserved here only as historical references. They are **not**
> live products or separate services. File names like `05-memory-attested-reasoning.md` and
> example identifiers may retain the old names to avoid breaking links.

## In-repo engineering recipes (runnable)

- [`knot-calculus-v1/`](knot-calculus-v1/) — khipu receipt DAG + PAC-Bayes + knot-invariant tag (TypeScript).
- [`anatomy-evolved-v1/`](anatomy-evolved-v1/) — multi-organ anatomy with doctrine guard.
- [`chakra-unification.md`](chakra-unification.md), [`anatomy-build-report.md`](anatomy-build-report.md).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
