function scene(ctx){ const t=1.0; const kinds=Array.from({length:44},(_,i)=>Math.floor(hash(i*13+5)*20));
  const o={ t, kleur:'eiwit' };
  eiwitVouw(ctx, 400, 380, 1.35, 1, kinds, o);
  eiwitVouw(ctx, 960, 120, 0.42, 0, kinds, o);
  eiwitVouw(ctx, 860, 330, 0.5, 0.5, kinds, o);
  eiwitVouw(ctx, 1110, 330, 0.5, 1, kinds, o);
  eiwitVouw(ctx, 1180, 640, 0.3, 1, kinds, o);
}
