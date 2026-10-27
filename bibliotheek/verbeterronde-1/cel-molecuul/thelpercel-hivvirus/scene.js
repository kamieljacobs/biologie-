function scene(ctx){ const t=1.0;
  tHelperCel(ctx, 300, 340, 200, { t, bindAn: -0.6 });
  hivVirus(ctx, 300 + Math.cos(-0.6)*290, 340 + Math.sin(-0.6)*290, 60, { t, rot: 0.3 });
  hivVirus(ctx, 760, 150, 60, { t, fuseer: 0 });
  hivVirus(ctx, 960, 150, 60, { t, fuseer: 0.6 });
  hivVirus(ctx, 1160, 150, 60, { t, fuseer: 1 });
  tHelperCel(ctx, 820, 460, 95, { t, geinfecteerd: 1 });
  tHelperCel(ctx, 1080, 460, 95, { t, sterft: 0.8 });
  tHelperCel(ctx, 1200, 650, 38, { t });
}
