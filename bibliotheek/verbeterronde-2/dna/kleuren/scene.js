// kleurenvel: alleen het palet verschilt (bibliotheekfuncties ongewijzigd)
function scene(ctx){
  vak(ctx,40,40,900,470); 'ATCG'.split('').forEach((b,i)=>baseRing(ctx,130+i*175,90,b,1,{s:2.1,plekA:0})); baseRingRNA(ctx,130+4*175,90,'U',1,{s:2.1,plekA:0});
  vak(ctx,980,40,900,470); dnaLadderHelix(ctx,1050,275,92,'ATGCGTAC',{draai:0,R:170,s:0.9});
  vak(ctx,40,550,1180,490); dnaLadderHelix(ctx,110,795,56,'ATGCGTACCTTAGCAGTC',{draai:1,R:170,s:0.8});
  vak(ctx,1260,550,620,490);
  cdChromosoom(ctx,1440,800,330,{w:30,kl:CD.vader}); cdChromosoom(ctx,1700,800,330,{w:30,kl:CD.moeder});
  cdChromosoom(ctx,1570,975,90,{w:12}); // standaard (zonder herkomst), klein
}
