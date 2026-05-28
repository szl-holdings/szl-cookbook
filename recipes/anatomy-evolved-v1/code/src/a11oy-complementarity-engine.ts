/**
 * a11oy-complementarity-engine.ts — frame-pair dispatcher
 * Organ: a11oy (BRAIN / GOVERNANCE CORTEX)
 *
 * STATUS: TUTORIAL FIXTURE — runnable copy for the recipe smoke tests.
 *   The CANONICAL implementation is:
 *     a11oy/web/packages/a11oy-core/src/quantum/bohr_complementarity_engine.ts
 *
 * Source: R07/R08 — quantum_bohr_complementarity_engine.ts
 *         Bohr (1928), Nature 121:580–590
 * Author: Stephen P. Lutar Jr., SZL Holdings
 */

export const COMPLEMENTARITY_FLOOR = 0.25; // σA · σB ≥ this

export interface FramePair {
  id: string;
  frameA: string;
  frameB: string;
  description: string;
}

export const FRAME_PAIRS: FramePair[] = [
  { id: "intent_effect",      frameA: "Intent",      frameB: "Effect",      description: "What was meant vs. what happened" },
  { id: "accuracy_coverage",  frameA: "Accuracy",    frameB: "Coverage",    description: "Precision vs. recall of governance scope" },
  { id: "autonomy_safety",    frameA: "Autonomy",    frameB: "Safety",      description: "Agent independence vs. harm prevention" },
  { id: "speed_rigor",        frameA: "Speed",       frameB: "Rigor",       description: "Time-to-verdict vs. proof depth" },
  { id: "transparency_sec",   frameA: "Transparency",frameB: "Security",    description: "Explainability vs. confidentiality" },
  { id: "individual_collective",frameA:"Individual", frameB: "Collective",  description: "Per-agent vs. systemic outcome" },
  { id: "present_future",     frameA: "Present",     frameB: "Future",      description: "Immediate vs. long-term compliance" },
  { id: "letter_spirit",      frameA: "Letter",      frameB: "Spirit",      description: "Rule compliance vs. intent compliance" },
  { id: "observe_participate",frameA: "Observe",     frameB: "Participate", description: "Monitoring vs. acting" },
  { id: "certainty_adapt",    frameA: "Certainty",   frameB: "Adaptability",description: "Fixed rule vs. contextual flexibility" },
  { id: "local_global",       frameA: "Local",       frameB: "Global",      description: "Per-agent vs. multi-agent frame" },
  { id: "evidence_credence",  frameA: "Evidence",    frameB: "Credence",    description: "What is known vs. what is believed" },
];

export interface FrameScore {
  frameId: string;
  score: number;    // ∈ [0,1]
  confidence: number; // σ value
}

export interface ComplementaryDecisionPayload {
  pairId: string;
  frameA: FrameScore;
  frameB: FrameScore;
  uncertaintyProduct: number;  // σA · σB — must be ≥ FLOOR
  complementarityFloor: number;
  violatesFloor: boolean;
  timestamp: number;
  pesherFormulaId?: string;
}

/** Render a dual-frame decision — NEVER collapses to single frame */
export function renderDecision(
  pairId: string,
  scoreA: number,
  confidenceA: number,
  scoreB: number,
  confidenceB: number,
): ComplementaryDecisionPayload {
  const pair = FRAME_PAIRS.find(p => p.id === pairId);
  if (!pair) throw new Error(`Unknown frame pair: ${pairId}`);
  const product = confidenceA * confidenceB;
  return {
    pairId,
    frameA: { frameId: pair.frameA, score: scoreA, confidence: confidenceA },
    frameB: { frameId: pair.frameB, score: scoreB, confidence: confidenceB },
    uncertaintyProduct: product,
    complementarityFloor: COMPLEMENTARITY_FLOOR,
    violatesFloor: product < COMPLEMENTARITY_FLOOR,
    timestamp: Date.now(),
  };
}

/** Assert duality invariant — throws if single-frame collapse detected */
export function assertDuality(payload: ComplementaryDecisionPayload): void {
  // Duality enforced structurally — frameA and frameB are both required by the type system.
  // Runtime check: both frames must carry non-empty observable names.
  if (!payload.frameA?.frameId || !payload.frameB?.frameId) {
    throw new Error("COMPLEMENTARITY VIOLATION: must have both frameA and frameB observables");
  }
  if (payload.violatesFloor) {
    throw new Error(
      `COMPLEMENTARITY FLOOR VIOLATION: σA·σB = ${payload.uncertaintyProduct} < ${COMPLEMENTARITY_FLOOR}`,
    );
  }
}

/** Merge all 12 pair payloads into a governance verdict */
export function mergeAllPairs(
  payloads: ComplementaryDecisionPayload[],
): { verdictSummary: string; hasViolations: boolean; worstPair: string | null } {
  const violations = payloads.filter(p => p.violatesFloor);
  const worst = violations.sort((a, b) => a.uncertaintyProduct - b.uncertaintyProduct)[0];
  return {
    verdictSummary: violations.length === 0 ? "BOHR_COMPLIANT" : "BOHR_VIOLATION",
    hasViolations: violations.length > 0,
    worstPair: worst?.pairId ?? null,
  };
}

// ─── Usage Example ────────────────────────────────────────────────────────────
/*
const verdict = renderDecision("intent_effect", 0.8, 0.6, 0.4, 0.5);
assertDuality(verdict); // throws if floor violated
console.log("Uncertainty product:", verdict.uncertaintyProduct); // 0.3 ≥ 0.25 ✓
*/