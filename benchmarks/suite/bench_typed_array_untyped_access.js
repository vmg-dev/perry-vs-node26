function encipherUntyped(lr     , off        , P     , S     )       {
  let n        ;
  let l = lr[off];
  let r = lr[off + 1];
  l ^= P[0];
  let i = 0;
  while (i < 16) {
    n = S[l >>> 24];
    n += S[0x100 | ((l >> 16) & 0xff)];
    n ^= S[0x200 | ((l >> 8) & 0xff)];
    n += S[0x300 | (l & 0xff)];
    r ^= n ^ P[++i];
    n = S[r >>> 24];
    n += S[0x100 | ((r >> 16) & 0xff)];
    n ^= S[0x200 | ((r >> 8) & 0xff)];
    n += S[0x300 | (r & 0xff)];
    l ^= n ^ P[++i];
  }
  lr[off] = r ^ P[17];
  lr[off + 1] = l;
}
function encipherTyped(
  lr          ,
  off        ,
  P            ,
  S            ,
)       {
  let n        ;
  let l = lr[off];
  let r = lr[off + 1];
  l ^= P[0];
  let i = 0;
  while (i < 16) {
    n = S[l >>> 24];
    n += S[0x100 | ((l >> 16) & 0xff)];
    n ^= S[0x200 | ((l >> 8) & 0xff)];
    n += S[0x300 | (l & 0xff)];
    r ^= n ^ P[++i];
    n = S[r >>> 24];
    n += S[0x100 | ((r >> 16) & 0xff)];
    n ^= S[0x200 | ((r >> 8) & 0xff)];
    n += S[0x300 | (r & 0xff)];
    l ^= n ^ P[++i];
  }
  lr[off] = r ^ P[17];
  lr[off + 1] = l;
}
const CALLS = 4270000;
const lrU = [0x01234567, 0x89abcdef];
const lrT = [0x01234567, 0x89abcdef];
function benchmark() {
const P = new Int32Array(18);
const S = new Int32Array(1024);
for (let i = 0; i < P.length; i++) P[i] = (i * 40503 + 7) | 0;
for (let i = 0; i < S.length; i++) S[i] = (i * 2654435761) | 0;
let t = performance.now();
for (let c = 0; c < CALLS; c++) encipherUntyped(lrU, 0, P, S);
const untyped = performance.now() - t;
t = performance.now();
for (let c = 0; c < CALLS; c++) encipherTyped(lrT, 0, P, S);
const typed = performance.now() - t;
if (lrU[0] !== lrT[0] || lrU[1] !== lrT[1]) {
  throw new Error(
    `checksum mismatch: untyped=[${lrU[0]},${lrU[1]}] typed=[${lrT[0]},${lrT[1]}]`,
  );
}
const ratio = untyped / typed;
console.log("ta_untyped_typed_ratio:" + ratio);
console.log("ta_untyped_access:" + untyped);
console.log("ta_typed_access:" + typed);
console.log("checksum:" + lrU[0]);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
