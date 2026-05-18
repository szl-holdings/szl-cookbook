/**
 * a11oy-ks18-witness.ts — Kochen-Specker 18-vector contextuality test
 * Organ: a11oy (BRAIN / GOVERNANCE CORTEX)
 * Source: Cabello, Estebaranz & García-Alcaine (1996), arXiv:quant-ph/9706009
 *         R08 — quantum_bohr_kochen_specker_18.ts
 * Author: Stephen P. Lutar Jr., SZL Holdings
 */

export interface KSObservation {
  contextId: string;   // which measurement context (1..18)
  vectorIdx: number;   // which of the 18 KS vectors
  response: 0 | 1;     // agent's binary response
}

export interface KSWitnessResult {
  contextualityFraction: number;   // fraction of inconsistent assignments
  isNCHVConsistent: boolean;       // true = classical (bad for governance)
  anomalyFlag: "CLASSICAL" | "BOHR_NORMAL" | "BOHR_ELEVATED" | "BOHR_ANOMALOUS";
  totalObservations: number;
  inconsistencies: number;
}

// 18 KS vectors (simplified 3D orthogonality relations — Cabello 1996 §2)
// In governance terms: 18 distinct policy measurement contexts
export const KS_CONTEXTS = [
  [0, 1, 2], [0, 3, 4], [1, 5, 6], [2, 7, 8], [3, 9, 10],
  [4, 11, 12],[5, 13, 14],[6, 15, 16],[7, 9, 17],[8, 10, 17],
  [11, 13, 17],[12, 14, 17],[0, 9, 15],[1, 10, 16],[2, 11, 13],
  [3, 12, 14],[4, 15, 16],[5, 6, 17],
] as const;

export class KochenSpecker18Witness {
  private observations: KSObservation[] = [];
  private windowSize: number;

  constructor(windowSize = 100) { this.windowSize = windowSize; }

  record(obs: KSObservation): void {
    this.observations.push(obs);
    if (this.observations.length > this.windowSize) {
      this.observations.shift();
    }
  }

  evaluate(): KSWitnessResult {
    const responseMap = new Map<number, 0 | 1>();
    for (const obs of this.observations) {
      responseMap.set(obs.vectorIdx, obs.response);
    }

    let inconsistencies = 0;
    let contextsChecked = 0;

    for (const ctx of KS_CONTEXTS) {
      const vals = ctx.map(i => responseMap.get(i));
      if (vals.every(v => v !== undefined)) {
        contextsChecked++;
        // KS constraint: in each orthogonal triple, exactly one is 1
        const ones = vals.filter(v => v === 1).length;
        if (ones !== 1) inconsistencies++;
      }
    }

    const cf = contextsChecked > 0 ? inconsistencies / contextsChecked : 0;
    const flag: KSWitnessResult["anomalyFlag"] =
      cf === 0 ? "CLASSICAL"
      : cf <= 0.3 ? "BOHR_NORMAL"
      : cf <= 0.6 ? "BOHR_ELEVATED"
      : "BOHR_ANOMALOUS";

    return {
      contextualityFraction: cf,
      isNCHVConsistent: inconsistencies === 0,
      anomalyFlag: flag,
      totalObservations: this.observations.length,
      inconsistencies,
    };
  }
}

// ─── Usage Example ────────────────────────────────────────────────────────────
/*
const witness = new KochenSpecker18Witness(50);
witness.record({ contextId: "ctx_01", vectorIdx: 0, response: 1 });
witness.record({ contextId: "ctx_01", vectorIdx: 1, response: 0 });
witness.record({ contextId: "ctx_01", vectorIdx: 2, response: 0 });
const result = witness.evaluate();
console.log("KS anomaly flag:", result.anomalyFlag); // CLASSICAL or BOHR_NORMAL
*/