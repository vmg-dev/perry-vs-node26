const ITERATIONS = 1000000;
class Point3D {
    x        ;
    y        ;
    z        ;

    constructor(x        , y        , z        ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
function benchmark() {
let sum = 0;
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    const p = new Point3D(i, i + 1, i + 2);
    sum = sum + p.x + p.y + p.z;
}
const elapsed = performance.now() - start;
console.log("object_alloc:" + elapsed);
console.log("sum:" + sum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
