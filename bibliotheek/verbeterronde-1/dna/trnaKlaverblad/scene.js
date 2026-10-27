function scene(ctx){ const t=1;
  vak(ctx,40,40,1000,1000); trnaKlaverblad(ctx,560,470,2.3,{vorm:0,anti:'UAC',aa:1,t});
  vak(ctx,1080,40,800,640); [[0.5,1300],[1,1640]].forEach(([v,x])=>trnaKlaverblad(ctx,x,300,1.0,{vorm:v,anti:'UAC',aa:1,t}));
  vak(ctx,1080,720,800,320); trnaKlaverblad(ctx,1300,820,0.6,{vorm:1,anti:'GCC',aa:0,t}); trnaKlaverblad(ctx,1620,820,0.6,{vorm:0,anti:'GCC',aa:0.5,t});
  trnaKlaverblad(ctx,1835,1000,0.22,{vorm:1,anti:'UAC',aa:1,t});
}
