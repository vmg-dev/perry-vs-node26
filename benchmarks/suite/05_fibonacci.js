function fib(n        )         {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
const N = 40;
function benchmark() {
const start = performance.now();
const result = fib(N);
const elapsed = performance.now() - start;
console.log("fibonacci:" + elapsed);
console.log("fib(" + N + "):" + result);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
