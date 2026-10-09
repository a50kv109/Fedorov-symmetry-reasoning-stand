# FSS - Limitations

## 1. Mathematical Limitations
- Completeness of symmetry discovery (`NOT_IMPLEMENTED`) cannot be verified due to potential numerical ambiguity.
- Crystallographic space-group classification is `NOT_IMPLEMENTED`.
- Robustness is dependent on `DIMENSION_TOLERANCES` (`DIMENSION_EPSILON`, `COINCIDENCE_EPSILON`, etc.).

## 2. Engineering Limitations
- Prototype status: Performance optimization is required.
- UI layer is minimal (integration shell only).
- `EVIDENCE_CONTRACT` is only partially defined for the current M-6A.1 scope.
