const N = 50_000;
function benchmark() {
const lines           = [];
for (let i = 0; i < N; i++) {
    lines.push(i + ",user_" + i + ",user_" + i + "@example.com," + (i * 1.5).toFixed(2));
}
const out           = [];
for (let k = 0; k < lines.length; k++) {
    const parts = lines[k].split(",");
    const id = +parts[0];
    if (id % 3 === 0) continue; // filter: keep 2/3 of rows
    const upper = parts[1].toUpperCase();
    out.push([upper, parts[2], parts[3]].join("|"));
}
let total = 0;
for (let i = 0; i < out.length; i++) total += out[i].length;
console.log("checksum:", total, "kept:", out.length);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
