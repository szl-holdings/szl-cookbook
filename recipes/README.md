# SZL Cookbook — Recipe Index

The customer-facing recipe library for the SZL flagships. **Only two flagships ship live today:
[a11oy](https://szlholdings-a11oy.hf.space) and [killinchu](https://szlholdings-killinchu.hf.space).**
The **a11oy Memory**, **a11oy Operator**, and **a11oy Sentinel** verticals (internal codenames
*amaru*, *rosie*, *sentra* — retired) ship **inside a11oy**, not as separate Spaces or repos.

Start with **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)**; it needs no
credentials and cryptographically verifies a real receipt in under a minute.

## Flagship recipes (01–15)

The "Vertical(s)" column names the a11oy vertical (or product) each recipe exercises. Where a
vertical's live equivalent ships inside a11oy, the recipe drives the a11oy endpoint.

| # | Recipe | Vertical(s) |
|---|--------|---------|
| 01 | [Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md) | a11oy Memory + Sentinel |
| 02 | [Deploy the SZL UDS bundle](02-deploy-5-flagship-uds-bundle.md) | a11oy · killinchu (2 shipping images) |
| 03 | [Fine-tune a customer compliance regime](03-fine-tune-compliance-regime.md) | a11oy Sentinel · killinchu |
| 04 | [Drone counter-UAS verdict](04-drone-counter-uas-verdict.md) | killinchu |
| 05 | [Memory-attested reasoning](05-memory-attested-reasoning.md) | a11oy Memory |
| 06 | [Verify cosign + Rekor for SLSA L1](06-cosign-rekor-slsa-l1.md) | a11oy · killinchu |
| 07 | [Build your own organ](07-build-your-own-organ.md) | a11oy Operator (pattern) |
| 08 | [Receipt knot algebra](08-receipt-knot-algebra.md) | a11oy Operator |
| 09 | [PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md) | a11oy Sentinel |
| 10 | [Cardano-anchored DSSE blood ledger](10-cardano-dsse-blood-ledger.md) | a11oy Memory |
| 11 | [Kitaev surface drift detection](11-kitaev-surface-drift-detection.md) | killinchu · a11oy Sentinel |
| 12 | [Doctrine ledger query](12-doctrine-ledger-query.md) | a11oy · killinchu + lake |
| 13 | [Build a UDS bundle from scratch](13-build-uds-bundle-from-scratch.md) | a11oy · killinchu |
| 14 | [Replicate the Walrus α-gap measurement](14-replicate-walrus-alpha-gap.md) | killinchu |
| 15 | [Air-gapped install](15-air-gapped-install.md) | a11oy · killinchu |

> **Codename note.** *amaru* (→ a11oy Memory), *rosie* (→ a11oy Operator), and *sentra* (→ a11oy
> Sentinel) are retired internal codenames preserved here only as historical references. They are
> **not** live products or separate services. File names like `05-memory-attested-reasoning.md`
> and example identifiers may retain the old names to avoid breaking links.

## In-repo engineering recipes (runnable)

- [`knot-calculus-v1/`](knot-calculus-v1/) — khipu receipt DAG + PAC-Bayes + knot-invariant tag (TypeScript).
- [`anatomy-evolved-v1/`](anatomy-evolved-v1/) — multi-organ anatomy with doctrine guard.
- [`chakra-unification.md`](chakra-unification.md), [`anatomy-build-report.md`](anatomy-build-report.md).

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
