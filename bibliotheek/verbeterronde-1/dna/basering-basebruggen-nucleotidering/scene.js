function scene(ctx){
  vak(ctx,40,40,900,1000); nucleotideRing(ctx,560,420,'G',{s:3.2,nummers:1,oh:1});
  vak(ctx,980,40,900,560); const s=1.15; 'ATCG'.split('').forEach((b,i)=>{ const x=1130+i*200, y1=110, y2=y1+184*s+16*s; baseRing(ctx,x,y1,b,1,{s,plekA:1,bindA:1}); baseRing(ctx,x,y2,DNA_BASE.comp[b],-1,{s,plekA:1,bindA:1}); baseBruggen(ctx,x,y1+DNA_BASE.len*s,y2-DNA_BASE.len*s,b,s,1); });
  vak(ctx,980,640,900,400); nucleotideRing(ctx,1200,840,'A',{s:1.4,explode:0.7}); nucleotideRing(ctx,1560,820,'T',{s:1.4,nummers:1});
  nucleotideRing(ctx,1810,985,'C',{s:0.55});
}
