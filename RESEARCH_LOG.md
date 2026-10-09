# FSS - Research Log

A chronological log of research and development stages for FSS.

| Stage | Focus | Key Findings / Result | Status |
| :--- | :--- | :--- | :--- |
| M-6A.1 | Dimension Analysis | Barycenter, Normalization, Affine Dim (0-3) | `IMPLEMENTED` |
| M-6A.1C | Stability & Determinism | Sorted eigenvalues, clustering, scale-independence | `IMPLEMENTED` |
| M-6A.2 | Symmetry Discovery | Candidate generation, anchor transformations | `PROPOSED` |

## Stage Details

### M-6A.1 / M-6A.1C
- **Question**: Can we deterministically assess the dimensionality of an arbitrary vertex structure?
- **Result**: Yes, using covariance tensor eigenvalues and robust anchor frame construction.
- **Tests**: `dimension.test.ts` (11 tests, including tetrahedron, square, triangle, collinear, scale/translation invariance).
- **Known Issues**: Potential numerical instability near thresholds. BORDERLINE cases exist (`ILL_CONDITIONED`).

### M-6A.2 (Projected)
- **Question**: How to identify all candidate symmetry transformations?
- **Actions**: Design of anchor-based transformation enumeration.
- **Hypothesis**: Candidate generation and deterministic verification are logically distinct.

## Research Experiments

### FSS-EXP-02 — Registry-Free Structure Input
- **Changes**:
  - Added field "structure?: CanonicalStructure".
  - "structureId" is now optional.
  - If "structure" is provided, it is used directly.
  - If "structure" is missing, it falls back to lookup via "structureId".
  - Throws explicit error if structure lookup fails.
- **Result**: 27/27 tests passed.

### FSS-EXP-03 — Deformation & Symmetry
- **Setup**:
  - S0: Correct tetrahedron.
  - S1: Uniform scaling of coordinates by 1.1.
  - S2: Deformation of vertex v0 to coordinates (1.5, 1, 1).
- **Operation Tested**: "(x,y,z) → (z,x,y)".
- **Engine-Reported Results**:
  - S0 — VERIFIED
  - S1 — VERIFIED
  - S2 — REJECTED
- **Mathematically Verified**: The operation preserves vertex sets for S0 and S1, but not S2.
- **Limitation**: The experiment verified only a single transformation operation, not the full symmetry group closure.
