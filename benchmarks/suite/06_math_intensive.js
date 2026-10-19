const ITERATIONS = 50000000;
function benchmark() {
let result = 1.0;
const start = performance.now();
for (let i = 1; i < ITERATIONS; i++) {
    result = result + (1.0 / i);
}
const elapsed = performance.now() - start;
console.log("math_intensive:" + elapsed);
console.log("result:" + result);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
