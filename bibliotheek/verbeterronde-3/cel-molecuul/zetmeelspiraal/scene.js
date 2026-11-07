// boven: amylose zoals nu (n 30); midden: amylopectine (vertakt om de 26, zijketens van 26); rechts: amylopectine open en los; klein rechtsonder
function scene(ctx){ const t = 0.5;
  zetmeelSpiraal(ctx, 70, 110, 30, 12, { t });
  zetmeelSpiraal(ctx, 70, 400, 64, 9, { t, vertakt: 26 });
  zetmeelSpiraal(ctx, 760, 560, 34, 6, { t, vertakt: 26, takN: 12, open: 0.6 });
  zetmeelSpiraal(ctx, 760, 670, 34, 6, { t, vertakt: 26, takN: 12, los: 0.8, spreid: 0.5 });
  zetmeelSpiraal(ctx, 1080, 650, 40, 3, { t, vertakt: 26 });
}
