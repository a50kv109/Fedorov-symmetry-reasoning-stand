# FSS — Mathematical Passport V1 Specification

**Document:** `docs/math/MATHEMATICAL_PASSPORT_V1.md`  
**Status:** `PARTIAL / BASELINE VALIDATED FOR SG-002`  
**Scope:** Architecture, data contracts, and deterministic verification of Mathematical Passports in Fedorov Symmetry Stand (FSS).

---

## 1. Purpose and Mission

The **Mathematical Passport** is a structured, declarative metadata and verification layer in the Fedorov Symmetry Stand (FSS). Its primary purpose is to bridge raw crystallographic data from the working registry (`core/registry.ts`) and verified reference artifacts (`data/crystallography/gemmi_benchmark_4.json`) with formal mathematical claims, runtime verification contracts, and visualization boundaries.

**Core Principles:**
1. **Separation of Concerns:** The passport does **not** duplicate raw operation data or act as a second registry. Operations are referenced by space group identifier and setting ID.
2. **Dynamic Verification:** Mathematical claims are verified dynamically by executable code (`core/group_properties.ts`) and unit tests (`core/passport_verification.test.ts`). Verification statuses are never hardcoded as static truth in the YAML file.
3. **Exact Arithmetic:** All underlying spatial and matrix operations use exact rational arithmetic (`ExactRational` backed by `bigint`), avoiding floating-point rounding errors.

---

## 2. Architectural Role of YAML and TypeScript

- **YAML (`docs/math/*.passport.yaml`):** Holds declarative descriptive metadata, human-readable mathematical descriptions, claims, provenance links, and visualization bindings.
- **TypeScript (`core/schema/passport_schema.ts`):** Provides strict typing, schema validation interfaces, and executable verification bindings.

---

## 3. SG-002 Verified Checks

The validated baseline test (`core/passport_verification.test.ts`) explicitly checks 7 criteria for SG-002 ($P\bar{1}$):
1. Inversion matrix $W = -I$.
2. Exact inversion center $c = (0, 0, 0)$.
3. Fixed point equation $Wc + w = c$.
4. Test point transformation $P' = WP + w$ using registry operations.
5. Computed boolean results `fixedPointOk` and `pointTransformOk`.
6. Result flag `satisfied = fixedPointOk && pointTransformOk`.
7. Transmission of computed values into the visualization DTO (`createSG002VisualizationPayload`).

---

## 4. Verification Flow and Evidence

The pipeline connecting a claim to runtime evidence:

$$\text{Registry} \longrightarrow \text{SG-002 Test} \longrightarrow \text{Exact Math Checks} \longrightarrow \text{Computed Results} \longrightarrow \text{Visualization DTO}$$

- **Result (`VerificationResult`):** Generated dynamically at runtime with status (`VERIFIED`, `REJECTED`, `CONFLICT`, `PENDING`, `STALE`).

---

## 5. Command Execution Results (Verified Checkpoint)

| Command | Status & Exit Code |
|---|---|
| `npx tsx core/passport_verification.test.ts` | **PASS** (Exit code 0) |
| `npm run lint` (`tsc --noEmit`) | **PASS** (Exit code 0) |
| `npm run build` (`vite build`) | **PASS** (Exit code 0) |

---

## 6. Scope and Limitations of V1

- **V1 Coverage:** Validated baseline for SG-002 ($P\bar{1}$, setting `P-1`).
- **Deferred / Not Implemented:** Automated runtime YAML loader engine, runtime schema validation of YAML files, automatic contract dispatch by ID, and universal Canvas/WebGL passport visualizers are intentionally deferred beyond V1.
