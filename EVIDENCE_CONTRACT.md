# FSS - Evidence Contract

This defines the schema for evidence verification in the system (M-6A.1).

## 1. Dimension Analysis Result (`DimensionAnalysisResult`)
Based on `core/dimension.ts`:

| Field | Type | Meaning |
| :--- | :--- | :--- |
| `vertexCount` | `number` | Total input vertices |
| `uniqueGeometricCount` | `number` | Unique vertex positions |
| `hasCoincidentVertices` | `boolean` | Are there coincident vertices? |
| `clusters` | `GeometricCluster[]` | Clusters of coincident vertices |
| `barycenter` | `Point3D` | Barycenter position |
| `maxRadius` | `number` | Max distance from barycenter |
| `rmsRadius` | `number` | RMS radius |
| `eigenvalues` | `[number, number, number]` | Sorted eigenvalues |
| `dimensionRatios` | `{ r2: number, r3: number }` | Eigenvalue ratios |
| `affineDimension` | `AffineDimension` | Computed dimension (0-3) |
| `conditionStatus` | `ConditionStatus` | Numerical stability status |
| `diagnostic` | `string` | Diagnostic details |
| `anchorFrame` | `AnchorFrame` | Computed frame or null |

## 2. Evidence Contract (`Evidence`)
Based on `core/types.ts`:

| Field | Type | Meaning |
| :--- | :--- | :--- |
| `experiment_id` | `string` | ID of the experiment |
| `structure_id` | `string` | ID of the structure |
| `operation` | `object` | Transformation details |
| `predicate` | `VerificationPredicate` | Verification type |
| `epsilon` | `number` | Numerical tolerance |
| `is_isometric` | `boolean` | Isometric verification result |
| `orthogonality_delta` | `number` | Orthogonality check result |
| `determinant` | `number` | Transformation determinant |
| `verdict` | `ExperimentVerdict` | Result of verification |

## 3. Status Semantics
- `ConditionStatus`: `WELL_CONDITIONED` \| `ILL_CONDITIONED` \| `DEGENERATE`.
- `ExperimentVerdict`: `VERIFIED` \| `REJECTED`.
