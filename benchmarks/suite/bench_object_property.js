const OBJECTS = 10000;
const FIELDS = 20;
function benchmark() {
for (let i = 0; i < 100; i++) {
  const obj      = {};
  for (let j = 0; j < FIELDS; j++) {
    obj["field_" + j] = j;
  }
}
const start = performance.now();
let checksum = 0;
for (let i = 0; i < OBJECTS; i++) {
  const obj      = {};
  for (let j = 0; j < FIELDS; j++) {
    obj["field_" + j] = i * FIELDS + j;
  }
  checksum += obj["field_0"] + obj["field_" + (FIELDS - 1)];
}
const elapsed = performance.now() - start;
console.log("object_property:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
