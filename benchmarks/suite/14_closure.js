const ITERATIONS = 50000000;
function compute(x        )         {
    return x * 2 + 1;
}
function benchmark() {
let sum = 0;
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    sum = sum + compute(i);
}
const elapsed = performance.now() - start;
console.log("function_calls:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
