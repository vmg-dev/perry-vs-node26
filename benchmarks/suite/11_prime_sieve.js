const LIMIT = 1000000;
function benchmark() {
const sieve            = [];
for (let i = 0; i < LIMIT; i++) {
    sieve[i] = true;
}
sieve[0] = false;
sieve[1] = false;
const start = performance.now();
for (let i = 2; i * i < LIMIT; i++) {
    if (sieve[i]) {
        for (let j = i * i; j < LIMIT; j = j + i) {
            sieve[j] = false;
        }
    }
}
let count = 0;
for (let i = 0; i < LIMIT; i++) {
    if (sieve[i]) {
        count = count + 1;
    }
}
const elapsed = performance.now() - start;
console.log("prime_sieve:" + elapsed);
console.log("primes:" + count);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
