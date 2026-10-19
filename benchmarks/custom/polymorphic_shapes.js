
function read(o) {return o.x+o.y;}
function kernel(seed) {
  const rows=[];
  for(let i=0;i<20000;i++) {
    if(i%3===0) rows.push({x:i^seed,y:i+1});
    else if(i%3===1) rows.push({y:i+1,z:seed,x:i^seed});
    else rows.push({tag:'record',x:i^seed,y:i+1,extra:true});
  }
  let sum=0;
  for(let pass=0;pass<1000;pass++) {
    for(let i=0;i<rows.length;i++) sum=(sum+read(rows[i]))|0;
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
