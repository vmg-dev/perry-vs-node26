const ITERATIONS = 10000000;
class Counter {
    value        ;
    constructor() {
        this.value = 0;
    }
    increment()       {
        this.value = this.value + 1;
    }
    get()         {
        return this.value;
    }
}
function benchmark() {
const counter = new Counter();
const start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    counter.increment();
}
const elapsed = performance.now() - start;
console.log("method_calls:" + elapsed);
console.log("value:" + counter.get());
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
