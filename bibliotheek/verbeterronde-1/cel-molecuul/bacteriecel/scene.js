function scene(ctx){ const t=1.2;
  bacterieCel(ctx, 380, 360, 600, { t, flagel: true, rot: -0.12 });
  bacterieGroot(ctx, 900, 200, 260, 104, { t, wandKapot: 0 });
  bacterieGroot(ctx, 900, 400, 260, 104, { t, wandKapot: 0.6, riboHl: 0 });
  bacterieGroot(ctx, 1150, 300, 180, 72, { t, wandKapot: 1 });
  bacterieGroot(ctx, 1170, 650, 200, 80, { t, riboHl: 1 });
}
