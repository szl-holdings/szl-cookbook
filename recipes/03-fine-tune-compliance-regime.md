# Fine-tune a customer compliance regime

> **Take the doctrine pretrain set, project new receipts through the a11oy Sentinel's σ-algebra of governance signals (internal codename *sentra* — retired; live equivalent ships inside a11oy), and emit a customer-specific Λ-extension that runs as an overlay — without touching the locked kernel.**
>
> **Headline number: 1 customer regime, 0 changes to 749/14/163.**

A "compliance regime" in SZL is **not** a model fine-tune that mutates the kernel. The kernel
(`c7c0ba17`, 749/14/163) is LOCKED. Instead you define an **overlay**: a measurable function on
the receipt-bus σ-algebra that *tightens* gates for your context (e.g., EU AI Act high-risk,
NIST AI RMF; CMMC alignment is roadmap). This recipe builds and tests one.

> **Honest scope.** There is no standalone `sentra` Space or repo (retired codename). The live
> policy/drift inspector is exposed inside `a11oy` via `/api/a11oy/v1/mcp/call` (tool `a11oy_gate`).
> Λ axis scores come from the live `killinchu` gate. An overlay is *your* engineering policy on
> top of these signals — never a change to the locked kernel.

> **Honest framing.** Λ is **Conjecture 1**, not a theorem. The overlay you build is an
> engineering policy on top of the gate; it inherits Λ's *measured* axis scores, not a proof of
> optimality. We say "extension," never "improvement to the proof."

---

## Prerequisites

```bash
python3 -m pip install requests
```
No kernel write access required (and none is possible — that is the design).

---

## Quickstart

```python
import requests

# a11oy Sentinel (codename sentra retired) ships inside a11oy.
A11OY = "https://szlholdings-a11oy.hf.space/api/a11oy"

# A customer regime = a set of axis floors + required gates, applied as an overlay.
regime = {
    "name": "acme-eu-ai-act-high-risk",
    "axis_floors": {"transparency": 0.95, "fairness": 0.95, "auditability": 0.95},
    "required_gates": ["dual-use", "STIX/TAXII", "receipt-hash"],
    "inherit": "doctrine-v11",         # never rewrites the kernel
}

# Project a candidate action through the a11oy gate; overlay decides PASS/FAIL on top of the base verdict.
action = {"kind": "model_output", "text": "…", "context": {"sector": "credit_scoring"}}
base = requests.post(f"{A11OY}/v1/mcp/call",
                     json={"tool": "a11oy_gate", "args": {"action": action}}, timeout=60).json()
print("base verdict:", base.get("verdict"))
```

The overlay never asks the gate to change; it reads the per-axis signals and applies
*stricter* floors locally.

---

## Full walkthrough

### Step 1 — The σ-algebra of governance signals

Every governed action produces a vector of 13 trust-axis scores (the `yuyay_v3` axes:
soundness, calibration, robustness, provenance, consent, reversibility, transparency, fairness,
containment, attestation, freshness, authority, auditability). These axes generate a σ-algebra
\(\Sigma\) over the receipt bus: events are measurable sets like "fairness < 0.9 ∧ sector =
credit." A *regime* is a measurable predicate on \(\Sigma\).

```python
AXES = ["soundness","calibration","robustness","provenance","consent","reversibility",
        "transparency","fairness","containment","attestation","freshness","authority","auditability"]
```

### Step 2 — Pull the doctrine pretrain set (axis priors)

The doctrine axis priors come from the locked kernel and the lake. Use the live Λ axis snapshot
as the canonical prior (this is exactly what the gate uses):

```python
import requests
axes = requests.get("https://szlholdings-killinchu.hf.space/api/killinchu/v1/lambda", timeout=60).json()
prior = {a["name"]: a["score"] for a in axes["axes"]}
print("Λ prior:", round(axes["lambda"], 6), "floor:", axes["lambda_floor"], "pass:", axes["pass"])
# => Λ prior: 0.922181 floor: 0.9 pass: True
```

### Step 3 — Define the Λ-extension (overlay)

```python
def lambda_extension(axis_scores: dict, regime: dict) -> dict:
    floors = {**{a: regime["inherit_floor"] for a in AXES}, **regime["axis_floors"]}
    failures = [a for a in AXES if axis_scores.get(a, 0.0) < floors[a]]
    # geometric mean (yuyay_v3 canonical aggregate) — same operator as the base gate
    import math
    geo = math.exp(sum(math.log(max(axis_scores.get(a, 1e-9), 1e-9)) for a in AXES) / len(AXES))
    return {"regime": regime["name"], "lambda_overlay": round(geo, 6),
            "pass": not failures, "failed_axes": failures, "inherits": "c7c0ba17"}

regime = {"name": "acme-eu-ai-act-high-risk", "inherit_floor": 0.90,
          "axis_floors": {"transparency": 0.95, "fairness": 0.95, "auditability": 0.95}}
print(lambda_extension(prior, regime))
# Fairness/transparency 0.90 < 0.95 → fails the tightened regime, as intended.
```

### Step 4 — Bind the regime to a receipt

Wrap the overlay decision as a Khipu receipt so it is itself auditable (verify it with
**[recipe 01](01-verify-a-receipt-end-to-end.md)**). Submit candidate receipts back through the
a11oy gate (`/v1/mcp/call`) for the chained, signed base verdict; store the overlay decision alongside.

### Step 5 — Validate against your corpus

Replay your historical receipts through the overlay and report the confusion matrix vs. your
manual compliance labels. Pair this with **[recipe 09 — PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md)**
to put a tail bound on the regime's empirical risk.

---

## See also

- **[09 — PAC-Bayes confidence margin](09-pac-bayes-confidence-margin.md)** — bound the regime's risk.
- **[12 — Doctrine ledger query](12-doctrine-ledger-query.md)** — read the locked priors.
- **[01 — Verify a receipt end-to-end](01-verify-a-receipt-end-to-end.md)**
- Live: [a11oy gate](https://szlholdings-a11oy.hf.space) (hosts the a11oy Sentinel; codename *sentra* retired) · [killinchu Λ axes](https://szlholdings-killinchu.hf.space/api/killinchu/v1/lambda)

## Cite this recipe

```bibtex
@misc{szl_cookbook_compliance_regime_2026,
  title        = {Fine-tune a customer compliance regime (SZL Cookbook recipe 03)},
  author       = {{SZL Holdings}},
  year         = {2026},
  howpublished = {\url{https://github.com/szl-holdings/szl-cookbook/blob/main/recipes/03-fine-tune-compliance-regime.md}},
  note         = {Λ = Conjecture 1; overlay never mutates the locked kernel c7c0ba17.}
}
```

---
*Doctrine v11 LOCKED — 749/14/163 — kernel `c7c0ba17` · Λ = Conjecture 1 · SLSA L1 (honest)*
