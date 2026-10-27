function demo(ctx, v) {
  const B = v === 'B' || v === 'C';
  if (B) { microscoop(ctx, 620, 660, 1.4, { licht: true, scherp: 0.1, beeld: true, kijk: 1 }); microscoop(ctx, 1520, 660, 1.4, { licht: true, scherp: 1, beeld: true, tafel: 1, kijk: 1 }); }
  else { microscoop(ctx, 330, 660, 1.4, { licht: false, tafel: 0 }); microscoop(ctx, 960, 660, 1.4, { licht: true, tafel: 1 }); microscoop(ctx, 1590, 660, 1.4, { licht: true, tafel: 0.5, kijk: -1 }); }
  // stand kijken: Noor zit aan tafel (0,3 px/mm), oculair ter hoogte van haar ogen
  const k = 0.32, vloer = 1060, blad = vloer - 750 * k; ctx.fillStyle = '#2A3A58'; ctx.fillRect(1180, blad, 360, 22 * k); ctx.fillRect(1500, blad, 10, 750 * k);
  microscoop(ctx, 1330, blad, k, { kijk: -1, licht: true });
  persoon(ctx, 'noor', 1245, vloer, 1650 * k, { zij: true, kijk: 1, pose: 'zit', zitHoogte: 460 * k });
  microscoop(ctx, 1830, 1060, 0.3, { licht: true });
}
