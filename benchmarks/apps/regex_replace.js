const N = 1000;
function benchmark() {
let line = "Visit https://example.com/users/12345 or email alice@example.com (id=42, score=3.14). ";
let body = "";
for (let i = 0; i < 100; i++) body += line;
let totalReplacements = 0;
for (let iter = 0; iter < N; iter++) {
    // Three common replace patterns.
    const a = body.replace(/https?:\/\/[^\s)]+/g, "[URL]");
    const b = a.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[EMAIL]");
    const c = b.replace(/\b\d+(?:\.\d+)?\b/g, "[N]");
    totalReplacements += c.length;
}
console.log("checksum:", totalReplacements);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
