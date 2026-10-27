function scene(ctx){
  eicelEcht(ctx, 270, 300, 120, 1, true);
  ctx.fillStyle=C.bgSchema; ctx.fillRect(0,0,1,1);
  follikel(ctx, 590, 300, 0, {R:150, seed:1}); follikel(ctx, 680, 300, 0.3, {R:150, seed:2}); follikel(ctx, 820, 300, 0.6, {R:150, seed:3}); follikel(ctx, 1085, 300, 1, {R:150, seed:4});
  eicelEcht(ctx, 1180, 650, 13, 1, true); follikel(ctx, 1080, 650, 1, {R:36, seed:5}); eicelEcht(ctx, 980, 660, 7, 1, true);
}
