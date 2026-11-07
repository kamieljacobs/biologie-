function scene(ctx){
  embryoEcht(ctx, 330, 360, 1.45, {t:0.2});
  [4,5,7,8].forEach((w,i)=> embryoEcht(ctx, 760+i*130 - (i>1?0:0), 240 + (i>1?260:0) - 0, 0.5, {t:0.2, week:w}));
  embryoEcht(ctx, 1200, 660, 0.17, {t:0.2});
}
