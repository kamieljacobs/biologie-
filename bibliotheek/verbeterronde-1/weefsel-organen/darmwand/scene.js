function scene(ctx){ const t=1;
  darmwand(ctx, 40, 1240, 240, 110, (x)=>Math.exp(-((x-700)**2)/30000), {dikte:62, vlokken:true, t});
  darmwand(ctx, 40, 600, 545, 48, ()=>0, {dikte:26, vlokken:false, t});
  darmwand(ctx, 660, 1100, 545, 48, (x)=>Math.exp(-((x-880)**2)/6000), {dikte:26, vlokken:true, t});
  darmwand(ctx, 1150, 1260, 670, 16, ()=>0, {dikte:9, vlokken:true, t});
}
