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
  let _x = p.length + p[0].id + p[p.length - 1].id;
}
const start = performance.now();
let checksum = 0;
for (let iter = 0; iter < ITERATIONS; iter++) {
  const parsed = JSON.parse(blob);
  checksum += parsed.length;
  // Read 3 specific records' ids — forces full materialize on
  // first access, subsequent reads are O(1) on the tree.
  checksum += parsed[0].id;
  checksum += parsed[5000].id;
  checksum += parsed[9999].id;
}
const elapsed = performance.now() - start;
console.log("json_readonly_indexed:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
