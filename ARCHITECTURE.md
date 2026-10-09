# FSS - Architecture

The Fedorov Symmetry Reasoning Stand (FSS) is a modular TypeScript application built with React/Vite.

## 1. Component Boundaries

1.  **`core/`**: Mathematical core. Includes barycenter calculation (`computeBarycenter`), geometric clustering (`clusterVertices`), anchor frame construction (`buildAnchorFrame`), and affine dimensionality assessment (`analyzeAffineDimension`). This component is strictly isolated and maintains a functional, stateless design.
2.  **`components/`**: React UI components (UI layer).
3.  **`services/`**: Integration layer (e.g., API interactions, if any).
4.  **`server.ts`**: Express backend entry point.

## 2. Responsibility Boundaries

-   **`core/` (`IMPLEMENTED`)**: Exclusively handles mathematical verification and geometric analysis (M-6A.1).
-   **`App` (`IMPLEMENTED`)**: Handles visualization and user interaction.
-   **Integration (`IMPLEMENTED`)**: `server.ts` provides the execution environment for backend logic.

## 3. Data Flow
Input (Vertex Array) → `analyzeAffineDimension` → `DimensionAnalysisResult` (containing barycenter, affine dimension, condition status, anchor frame) → Evidence Generation → Output/Visualization.

## 4. Future Architecture (M-6A.2)
The M-6A.2 phase will introduce an independent "Discovery Engine" module, responsible for enumerating symmetry candidates and verifying them against the core mathematical model.
