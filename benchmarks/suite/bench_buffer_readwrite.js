const SIZE = 1000000;
const ITERATIONS = 100;
function benchmark() {
const buf = new Uint8Array(SIZE);
for (let i = 0; i < SIZE; i++) {
  buf[i] = i % 256;
}
for (let w = 0; w < 3; w++) {
  let s = 0;
  for (let i = 0; i < SIZE; i++) s += buf[i];
}
const start = performance.now();
let checksum = 0;
for (let iter = 0; iter < ITERATIONS; iter++) {
  let sum = 0;
  for (let i = 0; i < SIZE; i++) {
    sum += buf[i];
  }
  checksum += sum;
}
const elapsed = performance.now() - start;
console.log("buffer_readwrite:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
