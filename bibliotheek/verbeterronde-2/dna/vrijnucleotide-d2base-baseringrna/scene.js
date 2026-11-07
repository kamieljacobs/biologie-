function scene(ctx){
  vak(ctx,40,40,900,1000); vrijNucleotide(ctx,560,760,'G',0,4.6,{});
  vak(ctx,980,40,900,420); 'AUCG'.split('').forEach((b,i)=>baseRingRNA(ctx,1110+i*210,90,b,1,{s:2.6,plekA:0}));
  vak(ctx,980,500,900,540);
  // kleine strengen: DNA en RNA met basen van ± 8, 6 en 3 px breed (filmgrootte)
  [[560,4,false],[650,4,true],[750,3,false],[830,3,true],[900,1.6,false],[950,1.6,true]].forEach(([y,hw,rna])=>{ const kl=rna?D2.rna:D2.oud; d2Rug(ctx,[[1010,y],[1850,y]],{kleur:kl,bw:Math.max(4,hw*2)}); for(let i=0;i<Math.floor(820/(hw*3.2));i++){ const b=rna?'AUCG'[(i*7+3)%4]:d2seq(i); d2Base(ctx,1020+i*hw*3.2,y+hw*0.8,Math.PI/2,b,hw*6,hw,{rna}); } });
  vrijNucleotide(ctx,1450,1005,'C',0,0.9,{}); vrijNucleotide(ctx,1700,1005,'A',0,0.9,{pp:1});
}
