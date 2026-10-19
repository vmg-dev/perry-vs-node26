const SIZE = 250000;
const ITERATIONS = 25;
function buildNumericArray()           {
  const arr           = [];
  for (let i = 0; i < SIZE; i++) {
    arr.push(i);
  }
  return arr;
}
function runNumericArray()         {
  const arr = buildNumericArray();
  let checksum = 0;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] + 1;
    }
    checksum = checksum + arr[0] + arr[arr.length - 1];
  }

  return checksum + arr.length;
}
function benchmark() {
for (let i = 0; i < 3; i++) {
  runNumericArray();
}
const start = performance.now();
const checksum = runNumericArray();
const elapsed = performance.now() - start;
console.log("numeric_array_numeric:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
