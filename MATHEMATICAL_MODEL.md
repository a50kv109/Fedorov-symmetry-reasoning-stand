# FSS - Mathematical Model

This document outlines the mathematics *currently* implemented in the `core/` module.

## 1. Implemented Features (`IMPLEMENTED`)

1.  **Barycenter Calculation (`computeBarycenter`)**: `c = (1/N) * sum(v_i)`. Ensures translational invariance.
2.  **Affine Dimensionality (`analyzeAffineDimension`)**: Computes affine dimension (0, 1, 2, or 3) using normalized coordinates.
3.  **Vertex Normalization (`analyzeAffineDimension`)**: Vertices are normalized around the barycenter, then by `maxRadius` to improve numerical stability and achieve scale-invariance.
4.  **Deterministic Anchor Selection (`buildAnchorFrame`)**: Robust anchor selection based on the affine dimension (Dim 2: Planar, Dim 3: Spatial).
5.  **Eigenvalue Solver (`solveSymmetric3x3Eigenvalues`)**: Analytical solver for 3x3 symmetric matrix eigenvalues using Cardano’s formula. `IMPLEMENTED`, `TESTED` (see `dimension.test.ts`).

## 2. Implementation Details

-   All calculations use double-precision floating-point arithmetic.
-   `DIMENSION_TOLERANCES` (e.g., `DIMENSION_EPSILON`, `COINCIDENCE_EPSILON`) govern dimensionality assessment.
-   `conditionStatus` ('WELL_CONDITIONED', 'ILL_CONDITIONED', 'DEGENERATE') tracks stability.
-   Numerical precision concerns: All eigenvalue-based decisions are subject to these thresholds.
