# Conformal prediction sets — replacing bare percentages with coverage-guaranteed sets

> **Replace a bare "87% confidence" with a conformal prediction SET — `{allow}` or `{allow, review}` — that provably contains the true class with ≥95% marginal coverage. Then import the same `szl_conformal` helper Dev D uses for threat classification.**
>
> **Headline number: `GET /gov/conformal` → a singleton `{allow}` set with q_hat=0.31 and `coverage_pct: 95.0`. One number is replaced by a set.**

A bare "87% confidence" sounds precise but gives no coverage guarantee — the model can be
systematically wrong. **Split/inductive conformal prediction** (Vovk 2005; Angelopoulos & Bates,
arXiv:2107.07511) converts any softmax output into a prediction *set* guaranteed — under
exchangeability — to contain the true class at least 1−α of the time. SZL surfaces this helper
as the `szl_conformal` module: the same code that ships inside the a11oy governance pipeline is
importable by any downstream organ (Dev D uses it for threat classification).

> **Honest posture.** The 95% guarantee is **marginal** (over many draws), not per-instance.
> It assumes **exchangeability**, not i.i.d. A singleton set `{allow}` still has coverage ≥95%
> only when averaged across calibration; it is NOT a 95% guarantee for *this specific prompt*.
> q_hat is calibrated from `calibration_n=20` bootstrap samples (cold start) — label is
> `SAMPLE` until n ≥ 500 held-out calibration points. Λ = Conjecture 1. Locked = 8.

---

## Prerequisites

```bash
python3 -m pip install httpx
```

Live base: `https://a-11-oy.com`.

---

## Quickstart (live, verified)

```python
import httpx

BASE = "https://a-11-oy.com"

# GET with default alpha=0.05 (95% coverage target)
r = httpx.get(f"{BASE}/api/a11oy/v1/gov/conformal", timeout=20).json()

cs = r["conformal_set"]
print("Prediction set:", cs["set"])               # e.g. ["allow"]
print("Coverage target:", cs["coverage_pct"], "%") # 95.0%
print("q_hat:", cs["q_hat"])                       # calibration quantile
print("Set size:", cs["set_size"])                 # 1 = singleton; 2+ = uncertain
print("Guarantee:", cs["guarantee"])               # exchangeability assumed, NOT per-instance

# The set REPLACES the bare confidence percentage
bare = r["bare_pct_replacement"]
print("\nBare pct display:", bare.get("display"))
# → "{allow} — true class in this singleton set with >=95% coverage"
```

---

## Full walkthrough

### Step 1 — understand the bare-pct problem

A bare softmax probability (e.g. `{"allow": 0.87, "review": 0.10, "deny": 0.03}`) is a
point estimate — it says nothing about whether 87% is a calibrated frequency. Conformal
prediction wraps this in a *set*:

```
α = 0.05  → coverage target 95%
q_hat = calibration quantile (the 1−α quantile of held-out nonconformity scores)
Set = {label : softmax_score[label] ≥ 1 − q_hat}
```

When q_hat=0.31, labels with score ≥ 0.69 enter the set. With softmax `{allow: 0.87}`,
only `allow` makes the cut → singleton set `{allow}`.

### Step 2 — call with a custom alpha

```python
r2 = httpx.get(
    f"{BASE}/api/a11oy/v1/gov/conformal",
    params={"alpha": 0.1},   # 90% coverage target
    timeout=20,
).json()
print("Coverage target:", r2["coverage_target"])   # 0.9
```

### Step 3 — use szl_conformal directly in your code

The shared helper is the same module that `a11oy_governance_endpoints` imports:

```python
# Pattern only — reimplement in your own code (MIT/Apache-2.0 pattern):
# from szl_conformal import ConformalClassifier, conformal_set

# Reference the API surface (as documented at /gov/conformal):
api_surface = {
    "functions": [
        "conformal_quantile(scores, alpha)",
        "prediction_set(probs, q_hat, labels)",
        "conformal_set(probs, calib_scores, alpha, labels)",
        "bare_pct_to_set(probs, calib_scores, alpha, labels)",
    ],
    "class": "ConformalClassifier(labels, alpha, window).calibrate(true, probs).predict_set(probs)",
}

# In your pipeline, replace bare_pct with a conformal set:
# cs = ConformalClassifier(["allow","review","deny"], alpha=0.05, window=500)
# cs.calibrate(true_label, probs)     # call per calibration sample
# prediction_set = cs.predict_set(probs)
```

### Step 4 — interpret the calibration label

| `calibration_n` | Label | Meaning |
|---|---|---|
| < 500 | `SAMPLE` | Bootstrap seed, not real held-out data |
| ≥ 500 | `MEASURED` | Real held-out split, marginal coverage guarantee applies |

The endpoint is honest: `calibration_n=20` today means `SAMPLE`, not `MEASURED`.

---

## Expected response shape

```json
{
  "surface": "conformal",
  "helper_version": "szl_conformal/1.0.0",
  "alpha": 0.05,
  "coverage_target": 0.95,
  "conformal_set": {
    "set": ["allow"],
    "set_size": 1,
    "argmax": "allow",
    "argmax_p": 0.87,
    "q_hat": 0.31,
    "coverage_pct": 95.0,
    "calibration_n": 20,
    "guarantee": "true class in set with >= 95% marginal coverage (exchangeability assumed; NOT a per-instance or 100% guarantee)",
    "method": "Split/inductive conformal prediction (Vovk 2005; Angelopoulos & Bates arXiv:2107.07511; LLM sets Kumar et al. arXiv:2305.18404)."
  },
  "shared_helper_api": {
    "module": "szl_conformal",
    "version": "szl_conformal/1.0.0",
    "note": "Dev D imports this SAME module for threat classification."
  },
  "citations": {
    "conformal_llm": "arXiv:2305.18404",
    "conformal_theory": "arXiv:2107.07511 (Angelopoulos & Bates)"
  }
}
```

---

## Why this matters

| Old behavior | New behavior |
|---|---|
| "87% confident → allow" | `{allow}` — singleton set; true class in set ≥95% of the time |
| "73% confident → allow or review?" | `{allow, review}` — uncertainty surfaced honestly |
| Bare probability, no guarantee | Covered prediction set, exchangeability guarantee |

The conformal set **replaces** the bare percentage in governed outputs. Size-2 sets signal
genuine epistemic uncertainty — honesty over false precision.

---

## Doctrine

| Field | Value |
|---|---|
| Locked-proven | 8 ({F1,F4,F7,F11,F12,F18,F19,F22}) |
| Λ | Conjecture 1 (advisory, ≤0.99, NOT a theorem) |
| Coverage guarantee | Marginal (over population); NOT per-instance or 100% |
| Calibration status today | SAMPLE (n=20 bootstrap); upgrades to MEASURED at n≥500 |
| Citations | arXiv:2305.18404 (Kumar et al., LLM conformal sets); arXiv:2107.07511 (Angelopoulos & Bates); Vovk 2005 |

---
*Doctrine v11 LOCKED · Λ = Conjecture 1 · SLSA L1*
