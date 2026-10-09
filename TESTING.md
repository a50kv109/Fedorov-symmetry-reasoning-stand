# FSS - Testing

## 1. Environment
- **Runner**: `tsx` (via `npx tsx <test-file>`).
- **Core Tests**: Located in `/core/*.test.ts`.

## 2. Status (`TESTED`)
- **Core Geometry (M-6A.1)**: Fully verified.
- **Suite**: 11 tests in `/core/dimension.test.ts`.
- **Coverage**: Tetrahedron (3D), Square (2D), Triangle (2D), Collinear (1D), Point (0D), Coincident vertices, Scale/Translation invariance, Determinism (100 runs).

## 3. Execution (`IMPLEMENTED`)
```bash
npx tsx core/dimension.test.ts
npx tsx core/engine.test.ts
```
*(Note: No `npm test` script is defined; tests are executed individually as needed.)*
