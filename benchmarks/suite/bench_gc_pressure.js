const ITERATIONS = 500000;
function benchmark() {
for (let i = 0; i < 1000; i++) {
  const obj = { x: i, y: i * 2, name: "item_" + i };
}
const start = performance.now();
let checksum = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const obj      = { x: i, y: i * 2, name: "item_" + i };
  const arr = [i, i + 1, i + 2];
  checksum += obj.x + arr[0];
}
const elapsed = performance.now() - start;
console.log("gc_pressure:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
