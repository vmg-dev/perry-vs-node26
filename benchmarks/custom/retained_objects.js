
function kernel(seed) {
  const rows=[];
  for(let i=0;i<100000;i++) rows.push({x:(i+seed)&65535,y:(i*3)^seed});
  let sum=0;
  for(let pass=0;pass<12;pass++) {
    for(let i=0;i<rows.length;i++) {
      const r=rows[(i*8191)%rows.length];
      r.x=(r.x+pass)&65535;
      sum=(sum+r.x+r.y)|0;
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
