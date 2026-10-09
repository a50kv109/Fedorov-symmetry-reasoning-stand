# FSS - Graph Model

This document distinguishes the five required graph architectures in the FSS project.

| Graph Type | Purpose | Status |
| :--- | :--- | :--- |
| **Geometry-dependency** | Define dependencies between geometric primitives | `IMPLEMENTED` |
| **Structural-relation** | Define spatial/relational links (e.g., edge-based) | `IMPLEMENTED` |
| **Symmetry-transformation** | Define transformation candidates | `NOT_IMPLEMENTED` |
| **Epistemic-status** | Track verification status of structures | `PROPOSED` |
| **Provenance/evidence** | Map origin of symmetry claims | `PARTIALLY_IMPLEMENTED` |

## Graph Definitions

### 1. Geometry-dependency Graph
- **Purpose**: Ensure stability in geometric construction.
- **Node Types**: `Vertex`, `Barycenter`, `AnchorFrame`.
- **Edge Types**: `DependentOn`.
- **Rules**: Directed Acyclic Graph (DAG). Cycles are forbidden and must be detected during build.

### 2. Structural-relation Graph
- **Purpose**: Define input structural topology.
- **Node Types**: `Vertex`.
- **Edge Types**: `ConnectedTo` (derived from input edges).
- **Rules**: Topology preservation is mandatory.

### 3. Symmetry-transformation Graph (M-6A.2)
- **Purpose**: Represent candidate group transformations.
- **Node Types**: `Transformation`.
- **Edge Types**: `Composer`, `InverseOf`.
- **Rules**: May contain cycles (group structure).

### 4. Epistemic-status Graph
- **Purpose**: Track knowledge about a structure.
- **Node Types**: `Structure`.
- **Edge Types**: `VerifiedBy`.
- **Status**: `PROPOSED`.

### 5. Provenance/evidence Graph
- **Purpose**: Link claim to verification result.
- **Node Types**: `Claim`, `Evidence`.
- **Edge Types**: `SupportedBy`.
- **Rules**: Every claim must have an associated evidence trail.
