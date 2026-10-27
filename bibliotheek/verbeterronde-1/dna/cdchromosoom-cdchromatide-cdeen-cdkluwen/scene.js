function scene(ctx){
  vak(ctx,40,40,860,1000); cdChromosoom(ctx,470,470,620,{w:62,kin:true,ringen:1,xv:0.25});
  vak(ctx,940,40,940,480); cdChromosoom(ctx,1080,280,300,{w:26,kl:CD.vader,segsR:[[0,0.55,CD.vader],[0.55,1,CD.moeder]]}); cdChromosoom(ctx,1230,280,300,{w:26,kl:CD.moeder,segsL:[[0,0.55,CD.moeder],[0.55,1,CD.vader]]});
  cdEen(ctx,1480,280,300,{w:24,zwaai:0.7,kant:1,kin:true}); cdEen(ctx,1700,280,300,{w:24,zwaai:0.7,kant:-1,kin:true,kl:CD.moeder});
  vak(ctx,940,560,940,480); [[0,1100],[0.45,1410],[0.85,1720]].forEach(([c,x])=>cdKluwen(ctx,x,800,280,{c,w:26,seed:3}));
  cdChromosoom(ctx,1830,1040,64,{w:8});
}
