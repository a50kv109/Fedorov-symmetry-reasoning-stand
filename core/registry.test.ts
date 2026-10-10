import { SymmetryCatalog } from './registry';
import { SymmetryAdapter } from './symmetry_adapter';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

console.log('Running KB-06 Completeness & Registry Tests...');

const expectedCounts: Record<string, number> = {
  "P1": 1,
  "P-1": 2,
  "P212121": 4,
  "P21/c": 4,
  "C2": 4
};

// Helper for rational arithmetic
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

class Rat {
  n: number;
  d: number;
  constructor(n: number, d: number = 1) {
    if (d === 0) throw new Error("Zero denominator");
    const common = gcd(Math.abs(n), Math.abs(d));
    this.n = (n / common);
    this.d = (d / common);
    if (this.d < 0) {
      this.n = -this.n;
      this.d = -this.d;
    }
  }
  add(o: Rat): Rat { return new Rat(this.n * o.d + o.n * this.d, this.d * o.d); }
  mul(o: Rat): Rat { return new Rat(this.n * o.n, this.d * o.d); }
  mod1(): Rat {
    let num = (this.n * 1) % (1 * this.d);
    if (num < 0) num += this.d;
    return new Rat(num, this.d);
  }
  equals(o: Rat): boolean { return this.n * o.d === o.n * this.d; }
}

function matMul(W1: number[][], W2: number[][]): number[][] {
  let res = [[0,0,0],[0,0,0],[0,0,0]];
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      res[i][j] = W1[i][0]*W2[0][j] + W1[i][1]*W2[1][j] + W1[i][2]*W2[2][j];
    }
  }
  return res;
}

function composeOps(op1: any, op2: any) {
  const W1 = op1.W;
  const w1 = op1.w.map((x: any) => new Rat(x.numerator, x.denominator));
  const W2 = op2.W;
  const w2 = op2.w.map((x: any) => new Rat(x.numerator, x.denominator));

  const W3 = matMul(W1, W2);
  const w3 = [0,1,2].map(i => {
    let sum = new Rat(0);
    for(let k=0; k<3; k++) {
      sum = sum.add(new Rat(W1[i][k]).mul(w2[k]));
    }
    return w1[i].add(sum).mod1();
  });
  return { W: W3, w: w3 };
}

// 1. Check operation counts and contents against expected
for (const [settingId, expectedCount] of Object.entries(expectedCounts)) {
  const record = SymmetryCatalog.findBySettingId(settingId);
  assert(!!record, `Record ${settingId} not found`);
  assert(record!.operations.length === expectedCount, `${settingId} expected ${expectedCount} ops, got ${record!.operations.length}`);
  
  // Check no duplicates
  const opStrings = record!.operations.map(op => JSON.stringify(op));
  const uniqueOps = new Set(opStrings);
  assert(uniqueOps.size === record!.operations.length, `${settingId} contains duplicate operations`);

  // Check identity presence
  const hasIdentity = record!.operations.some(op => {
    const isIdMat = op.W[0][0]===1 && op.W[1][1]===1 && op.W[2][2]===1 &&
                    op.W[0][1]===0 && op.W[0][2]===0 && op.W[1][0]===0 && op.W[1][2]===0 && op.W[2][0]===0 && op.W[2][1]===0;
    const isZeroTrans = op.w.every(t => t.numerator === 0);
    return isIdMat && isZeroTrans;
  });
  assert(hasIdentity, `${settingId} missing identity operation`);

  // Check closure
  for (const op1 of record!.operations) {
    for (const op2 of record!.operations) {
      const comp = composeOps(op1, op2);
      const matchesAny = record!.operations.some(target => {
        const tW = target.W;
        const tw = target.w.map((x: any) => new Rat(x.numerator, x.denominator));
        const matEq = tW.every((row, i) => row.every((val, j) => val === comp.W[i][j]));
        const vecEq = tw.every((val, i) => val.equals(comp.w[i]));
        return matEq && vecEq;
      });
      assert(matchesAny, `${settingId} is not closed under composition`);
    }
  }

  // Check adapter compatibility
  const adapted = SymmetryAdapter.adapt(record!);
  assert(adapted.length === expectedCount, `${settingId} adapter output length mismatch`);
}

// Provenance check
const p1 = SymmetryCatalog.findBySettingId("P1");
assert(!!p1?.provenanceDetails && !!p1.provenanceDetails.license, 'Provenance details missing');

console.log('All KB-06 completeness and closure tests passed successfully!');
