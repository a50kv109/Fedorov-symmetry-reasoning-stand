# FSS - Evidence Contract

This defines the schema for evidence verification in the system (M-6A.1).

## 1. Evidence Schema (`IMPLEMENTED`)

Based on `core/dimension.ts` (`DimensionAnalysisResult`):

| Field | Type | Meaning |
| :--- | :--- | :--- |
| `vertexCount` | `number` | Total input vertices |
| `uniqueGeometricCount` | `number` | Unique vertex positions |
| `hasCoincidentVertices` | `boolean` | Are there coincident vertices? |
| `barycenter` | `[number, number, number]` | Barycenter position |
| `affineDimension` | `0 \| 1 \| 2 \| 3` | Computed dimension |
| `conditionStatus` | `'WELL_CONDITIONED' \| ...` | Stability status |
| `anchorFrame` | `AnchorFrame \| null` | Computed frame |
| `diagnostic` | `string` | Diagnostic details |

## 2. Status Semantics

-   `WELL_CONDITIONED` / `ILL_CONDITIONED` / `DEGENERATE`: Status of numerical stability.
-   Early rejection logic: If `dim < 2` (0 or 1), `anchorFrame` is `null` (not applicable).

## 3. Future Requirements (M-6A.2)
- Need to extend this structure to include symmetry-specific findings (e.g., `transformation`, `group_member`, `is_isometric`).
- `verdict` and `rejection_reason` are currently `NOT_IMPLEMENTED`.
