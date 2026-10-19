const N = 500_000;
function benchmark() {
const m = new Map                ();
for (let i = 0; i < N; i++) {
    m.set("key_" + i, i * 2);
}
let lookupSum = 0;
for (let i = 0; i < N; i++) {
    const v = m.get("key_" + i);
    if (v !== undefined) lookupSum += v;
}
let iterSum = 0;
for (const v of m.values()) iterSum += v;
let missCount = 0;
for (let i = 0; i < 10_000; i++) {
    if (!m.has("missing_" + i)) missCount++;
}
console.log("checksum:", lookupSum, iterSum, missCount, "size:", m.size);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
