function scene(ctx){ const t=2.3;
  bloedvat(ctx, [[60,170],[400,140],[760,190],[1220,150]], 60, t, {wand:'slagader', n:12, cel:26});
  bloedvat(ctx, [[60,380],[420,410],[800,370],[1220,400]], 78, t, {wand:'ader', n:14, cel:26, deeltjes:{n:8,col:C.teal,rr:7}});
  bloedvat(ctx, [[60,580],[400,600],[760,570],[1080,590]], 16, t, {wand:'haarvat', n:9, cel:14});
  bloedvat(ctx, [[1130,680],[1260,670]], 6, t, {haarvat:true, n:4});
}
