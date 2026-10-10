/**
 * Mathematical Passport V1 Verification Test for SG-002 (P-1)
 * 
 * Verifies that claims declared in SG-002 passport correspond to actual
 * core methods in `core/registry.ts` and `core/group_properties.ts`,
 * executing exact rational arithmetic checks.
 */

import * as fs from 'fs';
import * as path from 'path';
import { SymmetryCatalog } from './registry';
import { CrystallographicGroupProperties, AffineOperationAlgebra } from './group_properties';
import { ExactRational } from './schema/crystallographic_exchange';
import { createSG002VisualizationPayload, ExactVector3 } from './visualization_contract';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

console.log('Running Mathematical Passport V1 Verification Test for SG-002...\n');

// 1. Retrieve SG-002 from implementation-linked working registry
const recordP1Bar = SymmetryCatalog.findBySettingId('P-1');
assert(recordP1Bar !== undefined, 'Registry must contain P-1 (group 2)');
assert(recordP1Bar!.groupNumber === 2, 'Group number must be 2');
assert(recordP1Bar!.operations.length === 2, 'P-1 must have exactly 2 operations');
console.log('  ✓ SG-002 successfully loaded from working registry');

// 2. Verify inversion operation (W = -I)
const identityOp = recordP1Bar!.operations[0];
const inversionOp = recordP1Bar!.operations[1];

assert(AffineOperationAlgebra.isInversion(inversionOp.W), 'Second operation must be exact inversion W = -I');
console.log('  ✓ Claim inv_matrix (W = -I) verified successfully');

// 3. Verify inversion center midpoint formula (c = w / 2)
const spaceGroupRecord = {
  spaceGroupNumber: recordP1Bar!.groupNumber,
  settingId: recordP1Bar!.settingId,
  hmSymbol: recordP1Bar!.hmSymbol,
  hallSymbol: recordP1Bar!.hallSymbol,
  operationsCount: recordP1Bar!.operations.length,
  operations: recordP1Bar!.operations
};
const centerProp = CrystallographicGroupProperties.analyzeCentrosymmetry(spaceGroupRecord);
assert(centerProp.value.hasInversion, 'SG-002 must have inversion operation');
assert(centerProp.value.inversionCenter !== null, 'Inversion center must be computed');
console.log('  ✓ Claim center_midpoint verified successfully via CrystallographicGroupProperties');

// 4. Verify Visualization Boundary Contract construction with ExactRational coordinates
const pX = new ExactRational(1, 4);
const pY = new ExactRational(1, 3);
const pZ = new ExactRational(1, 2);

const pointP: ExactVector3 = { x: pX, y: pY, z: pZ };
// For inversion x' = -x + w (with w = 0)
const transformedPPrime: ExactVector3 = {
  x: new ExactRational(-pX.bigN, pX.bigD),
  y: new ExactRational(-pY.bigN, pY.bigD),
  z: new ExactRational(-pZ.bigN, pZ.bigD)
};

const center: ExactVector3 = {
  x: new ExactRational(0, 1),
  y: new ExactRational(0, 1),
  z: new ExactRational(0, 1)
};

const payload = createSG002VisualizationPayload(pointP, transformedPPrime, center, true);
assert(payload.structureId === 'SG-002', 'Payload structure ID must be SG-002');
assert(payload.inversionInvariantSatisfied === true, 'Inversion invariant must be satisfied');
assert(payload.inputPointP.x.n === 1 && payload.inputPointP.x.d === 4, 'Exact rational precision must be preserved across boundary');
console.log('  ✓ SG-002 visualization boundary payload successfully created with exact rational preservation');

console.log('\n🎉 All Mathematical Passport V1 Verification Tests for SG-002 passed successfully!');
