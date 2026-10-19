const SIZE = 3000;
function benchmark() {
const arr           = [];
for (let i = 0; i < SIZE; i++) {
    arr[i] = i;
}
let sum = 0;
const start = performance.now();
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        sum = sum + arr[i] + arr[j];
    }
}
const elapsed = performance.now() - start;
console.log("nested_loops:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
