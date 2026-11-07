function scene(ctx){
  sarcomeer(ctx, 400, 260, 210, {L:2.4, rijen:3, dz:0.5, kop:0.3});
  myofibril(ctx, 60, 560, 1160, 70, 120, {L:2.4, hlIdx:2});
  sarcomeer(ctx, 1000, 150, 80, {L:2.5, rijen:2, dz:0.5, kop:0.1});
  sarcomeer(ctx, 1000, 330, 80, {L:2.0, rijen:2, dz:0.5, kop:0.6});
  myofibril(ctx, 1140, 670, 120, 14, 18, {L:2.4});
}
