// Illustrations only, not benchmark variants. No unsafe casts or explicit any.
// Check: npx --package typescript@7.0.2 tsc --strict --noEmit --target es2022 validation/strict-examples.ts

type XY = { x: number; y: number };
function read(o: XY): number { return o.x + o.y; }
const a = { x: 1, y: 2 };
const b = { y: 2, z: 3, x: 1 };
const c = { tag: 'record', x: 1, y: 2, extra: true };
const rows: XY[] = [a, b, c]; // Runtime shape variation is legal strict TS.
for (const row of rows) read(row);

function retainedObjects(seed: number): number {
  const retained: XY[] = [];
  for (let i = 0; i < 100; i++) retained.push({ x: i ^ seed, y: i + 1 });
  let sum = 0;
  for (const row of retained) { row.x++; sum += row.x + row.y; }
  return sum;
}

function factory(x: number): (delta: number) => number {
  let value = x;
  return function(delta) { value = (value + delta) | 0; return value; };
}
const callbacks: Array<(delta: number) => number> = [factory(1), factory(2)];
for (const callback of callbacks) callback(3); // Escaping mutable closures are legal.

function uncheckedAdd(a: number | string, b: number): number | string {
  // @ts-expect-error A union must be narrowed before this overloaded + operation.
  return a + b;
}
function checkedAdd(a: number | string, b: number): number | string {
  return typeof a === 'string' ? a + b : a + b;
}

type Cell = number | string | { value: number };
const mixed: Cell[] = [1, 2, { value: 7 }, 'payload']; // Union arrays are legal.
function uncheckedCell(index: number): number {
  // @ts-expect-error Index position alone does not prove this is a number.
  return mixed[index] + 1;
}
function uncheckedProperty(index: number): number {
  // @ts-expect-error Index position alone does not prove the object variant.
  return mixed[index].value;
}
