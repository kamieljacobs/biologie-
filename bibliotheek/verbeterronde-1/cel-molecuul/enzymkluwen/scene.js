function scene(ctx){ const t=1.0;
  enzymKluwen(ctx, 360, 360, 200, { sluit: 0, t });
  enzymKluwen(ctx, 830, 250, 95, { sluit: 0, t });
  const r=95, x=1110, y=250; enzymKluwen(ctx, x, y, r, { sluit: 1, t });
  hexagon(ctx, x + r*0.62, y, r*0.17, V.kh, lighten(V.kh,0.35)); hexagon(ctx, x + r*0.62 + r*0.36, y-r*0.05, r*0.17, V.kh, lighten(V.kh,0.35));
  enzymKluwen(ctx, 1190, 640, 40, { t });
  enzymKluwen(ctx, 1060, 650, 16, { t, an: 0.5 });
}
