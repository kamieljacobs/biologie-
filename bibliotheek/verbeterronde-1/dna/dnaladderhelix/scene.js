function scene(ctx){ const seq='ATGCGTACCTTAGCAGTCCAT';
  vak(ctx,40,40,1840,560); dnaLadderHelix(ctx,140,320,84,seq,{draai:1,R:190,s:1});
  vak(ctx,40,640,600,400); dnaLadderHelix(ctx,110,840,66,seq.slice(0,8),{draai:0,R:120,s:0.6});
  vak(ctx,660,640,600,400); dnaLadderHelix(ctx,710,840,34,seq.slice(0,16),{draai:0.5,R:110,s:0.55});
  vak(ctx,1280,640,600,370); dnaLadderHelix(ctx,1330,825,34,seq.slice(0,16),{draai:1,R:100,s:0.55,sep:0.4});
  dnaLadderHelix(ctx,1740,1048,7,seq.slice(0,16),{draai:1,R:20,s:0.12});
}
