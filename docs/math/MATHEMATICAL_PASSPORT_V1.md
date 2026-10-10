# FSS — Mathematical Passport V1 Specification

**Document:** `docs/math/MATHEMATICAL_PASSPORT_V1.md`  
**Status:** `IMPLEMENTED` (V1 Baseline)  
**Scope:** Architecture, data contracts, and deterministic verification of Mathematical Passports in Fedorov Symmetry Stand (FSS).

---

## 1. Purpose and Mission

The **Mathematical Passport** is a structured, declarative metadata and verification layer in the Fedorov Symmetry Stand (FSS). Its primary purpose is to bridge raw crystallographic data from the working registry (`core/registry.ts`) and verified reference artifacts (`data/crystallography/gemmi_benchmark_4.json`) with formal mathematical claims, runtime verification contracts, and visualization boundaries.

**Core Principles:**
1. **Separation of Concerns:** The passport does **not** duplicate raw operation data or act as a second registry. Operations are referenced by space group identifier and setting ID.
2. **Dynamic Verification:** Mathematical claims are verified dynamically by executable code (`core/group_properties.ts`) and unit tests. Verification statuses (e.g. `VERIFIED`, `REJECTED`, `CONFLICT`) are never hardcoded as static truth in the YAML file.
3. **Exact Arithmetic:** All underlying spatial and matrix operations use exact rational arithmetic (`ExactRational` backed by `bigint`), avoiding floating-point rounding errors.

---

## 2. Architectural Role of YAML and TypeScript

- **YAML (`docs/math/*.passport.yaml`):** Holds declarative descriptive metadata, human-readable mathematical descriptions, claims, provenance links, and visualization bindings. It can be read and reviewed independently of code implementation.
- **TypeScript (`core/schema/passport_schema.ts`):** Provides strict typing, schema validation interfaces, and executable verification bindings.

---

## 3. Structure of Mathematical Passports

A Mathematical Passport V1 record consists of:
- **Header & Provenance:** Group number, Hermann-Mauguin symbol, Hall symbol, setting ID, crystal system, and source artifact hashes.
- **Mode:** Either `implementation-linked` (backed by working registry implementation) or `reference-only` (describing reference records without requiring active working code implementation).
- **Registry Reference:** Pointers to `core/registry.ts` and the exact registry entry key.
- **Mathematical Claims (`mathematical_claims`):** Formal mathematical statements (e.g. $W = -I$, fixed point formulas) associated with verification contract IDs.
- **Verification Contracts (`verification_contracts`):** Links to specific core methods (`AffineOperationAlgebra`, `CrystallographicGroupProperties`) and test files (`core/group_properties.test.ts`).
- **Visualization Binding (`visualization_binding`):** Declares primitive rendering roles and coordinate data sources for UI experiments.
- **Limitations:** Explicit notes on coordinate system dependence, setting choices, or scope boundaries.

---

## 4. Verification Flow and Evidence

The pipeline connecting a claim to runtime evidence follows a strict unidirectional dependency:

$$\text{YAML Claim} \longrightarrow \text{Verification Contract} \longrightarrow \text{Core Method Execution} \longrightarrow \text{Verification Result} \longrightarrow \text{Visualization Contract}$$

- **Claim:** States what must be true.
- **Contract:** Points to the exact validating function and test.
- **Result (`VerificationResult`):** Generated dynamically at runtime with status (`VERIFIED`, `REJECTED`, `CONFLICT`, `PENDING`, `STALE`), computed timestamp, and input checksum.

---

## 5. Kernel-to-Visualizer Boundary

To prevent UI components from performing unverified mathematical calculations:
- Exact rational coordinates (`ExactRational`) are preserved across the core math engine.
- The visualization boundary contract (`core/visualization_contract.ts`) packages exact vectors (`ExactVector3`) and invariant flags into immutable payloads (`SG002VisualizationPayload`).
- Screen projection and rendering happens strictly on the UI side.

---

## 6. Scope and Limitations of V1

- **V1 Coverage:** Currently implemented for SG-002 ($P\bar{1}$, setting `P-1`).
- **Deferred:** Mass generation of passports for all 230 space groups, automated YAML loader engines with file-watching, and universal Canvas/WebGL rendering plugins are intentionally deferred beyond V1.
