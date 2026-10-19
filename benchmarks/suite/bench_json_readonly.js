const ITERATIONS = 50;
function benchmark() {
const items        = [];
for (let i = 0; i < 10000; i++) {
  items.push({
    id: i,
    name: "item_" + i,
    value: i * 3.14159,
    tags: ["tag_" + (i % 10), "tag_" + (i % 5)],
    nested: { x: i, y: i * 2 }
  });
}
const blob = JSON.stringify(items);
for (let w = 0; w < 3; w++) {
  const p = JSON.parse(blob);
  // just reads — no indexed access that would materialize
  const _ = p.length;
}
const start = performance.now();
let checksum = 0;
for (let iter = 0; iter < ITERATIONS; iter++) {
  const parsed = JSON.parse(blob);
  checksum += parsed.length;
  // Read a handful of specific indices + fields. With lazy + force-
  // materialize-on-index, this triggers ONE full materialization
  // per parse, so expected to be slower than pure .length-only but
  // still much lighter than stringify-every-time (which the other
  // bench exercises).
  // Actually: we only read .length here to isolate the pure lazy
  // win. A sibling bench that adds indexed reads is separate.
}
const elapsed = performance.now() - start;
console.log("json_readonly:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
