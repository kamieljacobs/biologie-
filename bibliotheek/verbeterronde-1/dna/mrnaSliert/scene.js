function scene(ctx){ const t=1.2;
  vak(ctx,40,40,1840,520); const R=mrnaSliert(ctx,120,300,1680,{t,basen:1,codons:1,cap:1,polyA:1,slap:0.8});
  vak(ctx,40,600,600,440); mrnaSliert(ctx,80,820,520,{t,slap:1});
  vak(ctx,660,600,600,440); mrnaSliert(ctx,700,820,520,{t,slap:0.25,basen:0.4,codons:1});
  vak(ctx,1280,600,600,440); mrnaSliert(ctx,1320,820,520,{t,slap:0.8,afbraak:0.55});
  mrnaSliert(ctx,1640,1050,220,{t,slap:0.8});
}
