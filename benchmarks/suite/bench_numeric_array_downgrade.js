const SIZE = 250000;
const ITERATIONS = 25;
const OBJECT_INDEX = 125000;
const STRING_INDEX = 125001;
function buildDowngradedArray()        {
  const arr        = [];
  for (let i = 0; i < SIZE; i++) {
    arr.push(i);
  }

  arr[OBJECT_INDEX] = { value: 7 };
  arr[STRING_INDEX] = "numeric-array-downgrade-payload";
  return arr;
}
function runDowngradedArray()         {
  const arr = buildDowngradedArray();
  let checksum = 0;

  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (let i = 0; i < OBJECT_INDEX; i++) {
      arr[i] = arr[i] + 1;
    }
    for (let i = STRING_INDEX + 1; i < arr.length; i++) {
      arr[i] = arr[i] + 1;
    }

    checksum = checksum + arr[0] + arr[arr.length - 1] + arr[OBJECT_INDEX].value;
    if (arr[STRING_INDEX] !== "") {
      checksum = checksum + 3;
    }
  }

  return checksum + arr.length;
}
function benchmark() {
for (let i = 0; i < 3; i++) {
  runDowngradedArray();
}
const start = performance.now();
const checksum = runDowngradedArray();
const elapsed = performance.now() - start;
console.log("numeric_array_downgrade:" + elapsed);
console.log("checksum:" + checksum);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
