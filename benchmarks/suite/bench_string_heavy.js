const ITERATIONS = 1000;
function benchmark() {
let base = "";
for (let i = 0; i < 1000; i++) {
  base += "word" + i + " ";
}
for (let w = 0; w < 3; w++) {
  const parts = base.split(" ");
  const joined = parts.join("-");
  joined.indexOf("word500");
}
const start = performance.now();
let checksum = 0;
for (let iter = 0; iter < ITERATIONS; iter++) {
  // Split + join
  const parts = base.split(" ");
  checksum += parts.length;
  const joined = parts.join("-");
  checksum += joined.length;

  // indexOf searches
  const idx1 = joined.indexOf("word500");
  const idx2 = joined.indexOf("word999");
  const idx3 = joined.indexOf("nonexistent");
  checksum += idx1 + idx2 + idx3;

  // Slice operations
  const sliced = joined.slice(100, 500);
  checksum += sliced.length;

  // startsWith/endsWith
  checksum += joined.startsWith("word0") ? 1 : 0;
  checksum += joined.endsWith("word999 ") ? 1 : 0;
}
const elapsed = performance.now() - start;
console.log("string_heavy:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
