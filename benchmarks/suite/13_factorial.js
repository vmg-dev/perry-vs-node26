const ITERATIONS = 100000000;
function benchmark() {
let sum = 0;
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    sum = sum + (i % 1000);
}
const elapsed = performance.now() - start;
console.log("accumulate:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
