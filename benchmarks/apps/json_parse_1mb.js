const N = 30;
function benchmark() {
const records            = [];
for (let i = 0; i < 5000; i++) {
    records.push({
        id: i,
        name: "user_" + i,
        email: "user_" + i + "@example.com",
        created_at: "2026-05-09T12:00:00Z",
        active: i % 3 !== 0,
        score: i * 1.5,
        tags: ["tag_" + (i % 10), "tag_" + (i % 7)],
    });
}
const payload = JSON.stringify({ users: records });
let total = 0;
for (let i = 0; i < N; i++) {
    const parsed = JSON.parse(payload)                                              ;
    for (let j = 0; j < parsed.users.length; j++) {
        total += parsed.users[j].id;
    }
}
console.log("checksum:", total, "bytes:", payload.length);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
