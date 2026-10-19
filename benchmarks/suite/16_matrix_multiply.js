const SIZE = 256;
function matmul(a          , b          , c          , size        )       {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum = sum + a[i * size + k] * b[k * size + j];
            }
            c[i * size + j] = sum;
        }
    }
}
function benchmark() {
const n = SIZE * SIZE;
const a           = [];
const b           = [];
const c           = [];
for (let i = 0; i < n; i++) {
    a.push(i % 100);
    b.push(i % 100);
    c.push(0);
}
const start = performance.now();
matmul(a, b, c, SIZE);
const elapsed = performance.now() - start;
let checksum = 0;
for (let i = 0; i < n; i++) {
    checksum = checksum + c[i];
}
console.log("matrix_multiply:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
