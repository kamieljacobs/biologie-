function scene(ctx){ const t=0.7;
  chlamydiaCel(ctx, 300, 340, 220, { t, groei: 0.9 });
  spirocheet(ctx, 820, 120, 420, { t });
  for (let k=0;k<3;k++) gonokok(ctx, 700 + k*110, 260, 2.4, k*0.7);
  chlamydiaCel(ctx, 760, 480, 100, { t, groei: 0.35 });
  chlamydiaCel(ctx, 1040, 480, 100, { t, groei: 1, barst: 0.7 });
  spirocheet(ctx, 1150, 640, 160, { t: 1.4, rot: -0.2 });
  gonokok(ctx, 1060, 650, 1.0, 0.4);
}
