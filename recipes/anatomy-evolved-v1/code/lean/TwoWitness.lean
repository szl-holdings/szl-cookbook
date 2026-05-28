/-
# TwoWitness.lean — MOVED

The canonical home of the KS-18 Two-Witness soundness theorem is now:

  lutar-lean/Lutar/TwoWitness.lean

The prior content of this file proved a Metatron fixed-point theorem
unrelated to the KS-18 contextuality claim made in ch9 §9.2.2.
The new file proves:

  theorem two_witness_KS18_soundness :
      ∀ f : Fin 18 → Bool,
        ExactlyOnePerContext f →
          inconsistencies f = 0 ∧ anomalyFlag f = CLASSICAL

and also captures the Cabello-Estebaranz-García-Alcaine 1996 parity
hardness as `no_NCHV`.

Sources:
  Cabello, A., Estebaranz, J. M., & García-Alcaine, G. (1996).
  "Bell-Kochen-Specker theorem: A proof with 18 vectors."
  Physics Letters A 212(4), 183–187. arXiv:quant-ph/9706009.

This stub remains so that prior references resolve to a non-empty file.
-/
