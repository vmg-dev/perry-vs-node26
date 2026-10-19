
function factory(x) {let value=x;return function(delta){value=(value+delta)|0;return value;};}
function kernel(seed) {
  const callbacks=[];
  for(let i=0;i<10000;i++) callbacks.push(factory(i^seed));
  let sum=0;
  for(let pass=0;pass<1000;pass++) {
    for(let i=0;i<callbacks.length;i++) sum=(sum+callbacks[i](pass&7))|0;
  }
  return sum;
}

const inputSeed = Number(process.argv[2] || '12345');
for(let round=0;round<12;round++) {
  const start=performance.now();
  const checksum=kernel(inputSeed+round);
  const elapsed=performance.now()-start;
  console.log('round:'+round);
  console.log('elapsed:'+elapsed);
  console.log('checksum:'+checksum);
}
