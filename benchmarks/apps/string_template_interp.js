const N = 200_000;
function benchmark() {
const out           = [];
for (let i = 0; i < N; i++) {
    const id = i;
    const status = i % 4 === 0 ? "ok" : "fail";
    const took = (i % 1000) * 0.1;
    const s = `[${id}] status=${status} took=${took.toFixed(1)}ms user=${"u" + (i % 100)}`;
    out.push(s);
}
let total = 0;
for (let i = 0; i < out.length; i++) total += out[i].length;
console.log("checksum:", total);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
