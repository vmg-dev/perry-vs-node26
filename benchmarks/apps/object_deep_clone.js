const N = 50_000;
function deepClone(o      )       {
    return {
        id: o.id,
        name: o.name,
        meta: {
            created: o.meta.created,
            updated: o.meta.updated,
            tags: [...o.meta.tags],
        },
        inners: o.inners.map((x) => ({ code: x.code, weight: x.weight })),
    };
}
function benchmark() {
const proto       = {
    id: 0,
    name: "item",
    meta: { created: "2026-01-01", updated: "2026-05-09", tags: ["a", "b", "c"] },
    inners: [
        { code: "x1", weight: 0.5 },
        { code: "x2", weight: 1.5 },
        { code: "x3", weight: 2.5 },
    ],
};
let totalIds = 0;
for (let i = 0; i < N; i++) {
    proto.id = i;
    const clone = deepClone(proto);
    totalIds += clone.id;
}
console.log("checksum:", totalIds);
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
