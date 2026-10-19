const ITERATIONS = 1000000;
function benchmark() {
let result = "";
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    result = result + "x";
}
const elapsed = performance.now() - start;
let checksum = 0;
for (let i = 0; i < result.length; i += 997) {
    checksum = checksum + result.charCodeAt(i);
}
console.log("string_concat:" + elapsed);
console.log("length:" + result.length);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
