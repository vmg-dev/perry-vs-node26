const N = 100_000;
function benchmark() {
let total = 0;
for (let i = 0; i < N; i++) {
    // Vary the input so the JIT can't constant-fold.
    const d = new Date(1_700_000_000_000 + i * 1000);
    const iso = d.toISOString();
    const parsed = new Date(iso).getTime();
    total += parsed;
}
console.log("checksum:", total);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
