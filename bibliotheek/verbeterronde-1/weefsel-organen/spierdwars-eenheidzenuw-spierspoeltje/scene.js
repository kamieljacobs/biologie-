function scene(ctx){ const t=1.2;
  const D = spierDwars(ctx, 300, 330, 230, {n:150, eenheden:[{n:9,kleur:C.goud},{n:9,kleur:C.teal}], aan:1});
  eenheidZenuw(ctx, [300, 40], D.punten(0), C.goud, {});
  spierspoeltje(ctx, 900, 250, 340, {rek:0, vuur:0.2, t});
  spierspoeltje(ctx, 900, 540, 340, {rek:1, vuur:1, t});
  spierDwars(ctx, 1215, 665, 45, {n:60, eenheden:[{n:6,kleur:C.goud}], aan:1});
}
