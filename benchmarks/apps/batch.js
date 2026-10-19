const N = 40_000;
class Row {
    id        ;
    bucket        ;
    weight        ;
    score        ;

    constructor(id        , bucket        , weight        ) {
        this.id = id;
        this.bucket = bucket;
        this.weight = weight;
        this.score = 0;
    }

    rescore(factor        )         {
        this.score = this.weight * factor + this.id % 7;
        return this.score;
    }
}
const BUCKETS = ["alpha", "beta", "gamma", "delta"];
function buildRows(n        )        {
    const rows        = [];
    for (let i = 0; i < n; i++) {
        const row = new Row(i, BUCKETS[i % 4], (i % 97) * 0.5);
        rows.push(row);
    }
    return rows;
}
function shape(rows       )           {
    return rows.map((r) => ({
        key: r.bucket + ":" + r.id,
        value: r.rescore(1.5),
        tag: r.id % 2 === 0 ? "even" : "odd",
    }));
}
function ranked(items          )           {
    const copy = items.slice();
    copy.sort((a, b) => {
        if (a.value !== b.value) {
            return b.value - a.value;
        }
        return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    });
    return copy;
}
function summarize(rows       )            {
    const byBucket            = [];
    for (let b = 0; b < BUCKETS.length; b++) {
        const s          = {
            bucket: BUCKETS[b],
            count: 0,
            total: 0,
            peak: 0,
        };
        byBucket.push(s);
    }
    rows.reduce((acc           , r     ) => {
        const idx = BUCKETS.indexOf(r.bucket);
        const slot = acc[idx];
        slot.count = slot.count + 1;
        slot.total = slot.total + r.score;
        if (r.score > slot.peak) {
            slot.peak = r.score;
        }
        return acc;
    }, byBucket);
    return byBucket;
}
function totalsRow(summaries           )      {
    const acc = new Row(0, "acc", 0);
    for (let i = 0; i < summaries.length; i++) {
        acc.weight = acc.weight + summaries[i].total;
        acc.score = acc.score + summaries[i].peak;
    }
    return acc;
}
function benchmark() {
const rows = buildRows(N);
const shaped = shape(rows);
const top = ranked(shaped);
const summaries = summarize(rows);
let checksum = 0;
for (let i = 0; i < 16; i++) {
    checksum = checksum + top[i].value;
}
for (let i = 0; i < summaries.length; i++) {
    checksum = checksum + summaries[i].count + summaries[i].peak;
}
const totals = totalsRow(summaries);
checksum = checksum + totals.weight + totals.score;
console.log("checksum: " + checksum.toFixed(4));
}
for(let round=0;round<12;round++){console.log("round:"+round);const t0=performance.now();benchmark();console.log("elapsed:"+(performance.now()-t0));}
