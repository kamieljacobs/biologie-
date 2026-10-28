function scene(ctx) {
  antistofY(ctx, 360, 330, 2.3, { k: 0, bind: [1, 0], t: 0 });
  antistofY(ctx, 830, 250, 0.95, { k: 1, open: 1.05 });
  antistofY(ctx, 1070, 250, 0.95, { k: 1, open: 0.5, buig: [0, 0.35], bind: [0, 0.6] });
  membraanBoog(ctx, 960, 1480, 1000, -Math.PI / 2 - 0.24, -Math.PI / 2 + 0.24, { s: 0.5 });
  antistofY(ctx, 960, 395, 0.95, { k: 3, op: 'bcel', bind: [1, 1] });
  antistofY(ctx, 1190, 630, 0.42, { k: 0 });
}
