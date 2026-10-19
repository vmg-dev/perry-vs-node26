const N = 64;
const ITERATIONS = 100000000;
function benchmark() {
let seed = 42;
const x           = [];
for (let i = 0; i < N; i++) {
    // Math.imul makes the intended 32-bit LCG multiplication explicit.
    // Plain Number multiplication rounds above 2^53 before the bitwise mask,
    // producing a different sequence from the native-language implementations.
    seed = (Math.imul(seed, 1103515245) + 12345) & 0x7fffffff;
    x.push(0.5 + (seed / 2147483647) * 0.5);
}
const start = performance.now();
let sum = 1.0;
for (let i = 0; i < ITERATIONS; i++) {
    sum = sum * x[i & 63] + x[(i * 7) & 63];
}
const elapsed = performance.now() - start;
console.log("loop_data_dependent:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
