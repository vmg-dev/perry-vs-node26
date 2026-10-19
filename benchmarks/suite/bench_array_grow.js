const SIZE = 2000000;
function benchmark() {
let warmup           = [];
for (let i = 0; i < 10000; i++) warmup.push(i);
const start = performance.now();
const arr           = [];
for (let i = 0; i < SIZE; i++) {
  arr.push(i * 1.5);
}
let checksum = 0;
for (let i = 0; i < arr.length; i += 1000) {
  checksum += arr[i];
}
const elapsed = performance.now() - start;
console.log("array_grow:" + elapsed);
console.log("length:" + arr.length);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
