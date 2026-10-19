const SIZE = 10000000;
function benchmark() {
const arr           = [];
for (let i = 0; i < SIZE; i++) {
    arr[i] = i;
}
let sum = 0;
const start = performance.now();
for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
}
const elapsed = performance.now() - start;
console.log("array_read:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
