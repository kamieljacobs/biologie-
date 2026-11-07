function scene(ctx) {
  antistofY(ctx, 380, 300, 2.4, { k: 0, bind: [1, 0], t: 0 });
  // standen: open zonder antigeen · één arm gebonden en gebogen · als B-celreceptor in het membraan
  antistofY(ctx, 850, 250, 0.95, { k: 1, open: 1.05 });
  antistofY(ctx, 1060, 250, 0.95, { k: 1, open: 0.5, buig: [0, 0.35], bind: [0, 0.6] });
  membraanBoog(ctx, 960, 1480, 1000, -Math.PI / 2 - 0.24, -Math.PI / 2 + 0.24, { s: 0.5 });
  antistofY(ctx, 960, 400, 0.95, { k: 3, op: 'bcel', bind: [1, 1] });
  antistofY(ctx, 1190, 625, 0.42, { k: 0 });
}
