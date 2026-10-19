const ITERATIONS = 1000000;
class Point {
    x        ;
    y        ;
    constructor(x        , y        ) {
        this.x = x;
        this.y = y;
    }
}
function benchmark() {
let sum = 0;
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    const p = new Point(i, i + 1);
    sum = sum + p.x + p.y;
}
const elapsed = performance.now() - start;
console.log("object_create:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
