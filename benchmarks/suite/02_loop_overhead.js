const ITERATIONS = 100000000;
function benchmark() {
let checksum = 0x811c9dc5 | 0;
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    checksum = Math.imul(checksum ^ i, 0x01000193);
}
const elapsed = performance.now() - start;
console.log("loop_overhead:" + elapsed);
console.log("checksum:" + (checksum >>> 0));
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
