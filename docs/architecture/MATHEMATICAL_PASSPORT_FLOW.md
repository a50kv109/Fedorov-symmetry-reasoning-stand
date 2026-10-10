# Architectural Flow: Mathematical Passports in FSS

**Document:** `docs/architecture/MATHEMATICAL_PASSPORT_FLOW.md`  
**Status:** `IMPLEMENTED` (V1 Baseline)

---

## 1. Pipeline Overview

The end-to-end data and verification flow for Mathematical Passports in Fedorov Symmetry Stand (FSS) follows a strict, unidirectional architecture:

$$\text{YAML Passport} \longrightarrow \text{Schema / Validation} \longrightarrow \text{Canonical Registry} \longrightarrow \text{Deterministic Verification} \longrightarrow \text{Verification Result} \longrightarrow \text{Visualization Contract} \longrightarrow \text{UI Boundary}$$

---

## 2. Stage Breakdown

1. **Declarative Description (YAML):**
   - Files such as `docs/math/SG-002-P-1.passport.yaml` store declarative metadata, claims, provenance links, and visualization binding rules.
   - Does *not* store raw operations or static verification verdicts.

2. **Schema & Types (TypeScript):**
   - `core/schema/passport_schema.ts` defines types (`MathematicalPassportRecord`, `MathematicalClaim`, `VerificationContract`, `VerificationResult`).

3. **Canonical Registry & Data:**
   - Raw operations and group definitions are retrieved exclusively from `core/registry.ts` (`SymmetryCatalog`). Passports reference registry keys rather than duplicating operation matrices.

4. **Deterministic Verification:**
   - Executable methods in `core/group_properties.ts` (`AffineOperationAlgebra`, `CrystallographicGroupProperties`) and tests (`core/passport_verification.test.ts`) evaluate claims against actual group operations using exact rational arithmetic (`ExactRational`).

5. **Verification Result Generation:**
   - Results (`VerificationResult`) are computed dynamically at runtime, indicating whether specific claims passed or failed.

6. **Visualization Contract Boundary:**
   - `core/visualization_contract.ts` packages verified exact coordinates (`ExactVector3` using `ExactRational`) into immutable payloads (`SG002VisualizationPayload`).
   - Exact mathematical precision is strictly preserved up to this boundary.

7. **UI / Screen Rendering:**
   - Screen projection and graphic rendering happen on the UI side, consuming payloads without performing unverified math calculations.
