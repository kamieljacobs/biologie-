function scene(ctx){
  eierstokDoorsnede(ctx, 340, 300, 300, 200, {groei:1, eis:0, t:1});
  eierstokDoorsnede(ctx, 950, 170, 160, 106, {groei:1, eis:0.65, t:1});
  eierstokDoorsnede(ctx, 950, 470, 160, 106, {groei:1, eis:1, geel:1, t:1});
  eierstokDoorsnede(ctx, 1190, 660, 56, 36, {n:26, groei:0.6, t:1});
}
