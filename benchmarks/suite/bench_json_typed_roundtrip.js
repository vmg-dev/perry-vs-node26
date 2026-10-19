const ITERATIONS = 50;
function benchmark() {
const items         = [];
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
for (let i = 0; i < 3; i++) {
  const parsed = JSON.parse        (blob);
  JSON.stringify(parsed);
}
const start = performance.now();
let checksum = 0;
for (let iter = 0; iter < ITERATIONS; iter++) {
  const parsed = JSON.parse        (blob);
  checksum += parsed.length;
  const reStringified = JSON.stringify(parsed);
  checksum += reStringified.length;
}
const elapsed = performance.now() - start;
console.log("json_typed_roundtrip:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
