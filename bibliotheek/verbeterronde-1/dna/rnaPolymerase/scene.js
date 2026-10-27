function scene(ctx){ const t=1.1;
  vak(ctx,40,40,1840,600); rnaPolymerase(ctx,1000,380,2.6,{stand:'lees',mrna:420,x0:60,x1:1860,t});
  [['bind',40],['open',660],['los',1280]].forEach(([st,x])=>{ vak(ctx,x,680,600,360); rnaPolymerase(ctx,x+300,880,0.95,{stand:st,mrna:st==='los'?200:0,x0:x+20,x1:x+580,t}); });
  rnaPolymerase(ctx,1780,1045,0.32,{stand:'lees',mrna:60,x0:1690,x1:1880,t});
}
