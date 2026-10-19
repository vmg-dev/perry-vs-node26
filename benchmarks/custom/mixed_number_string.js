
function add(a,b) {return a+b;}
function kernel(seed) {
  const values=[];
  for(let i=0;i<10000;i++) values.push(i%4===0 ? String(i^seed) : (i^seed));
  let sum=0;
  for(let pass=0;pass<1000;pass++) {
    for(let i=0;i<values.length;i++) {
      const v=add(values[i],1);
      if(typeof v==='string') sum=(sum+v.length+v.charCodeAt(v.length-1))|0;
      else sum=(sum+v)|0;
    }
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
