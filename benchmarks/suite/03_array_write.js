const SIZE = 10000000;
function benchmark() {
const arr           = [];
for (let i = 0; i < SIZE; i++) {
    arr[i] = 0;
}
const start = performance.now();
for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
}
const elapsed = performance.now() - start;
console.log("array_write:" + elapsed);
console.log("checksum:" + arr[SIZE - 1]);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
