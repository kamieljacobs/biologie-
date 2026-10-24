// Testvel film 10: alle nieuwe tekeningen los
const TV10 = {
  moleculen(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 10A · MOLECULEN', 60, 50, C.text2);
    ['h2o', 'ch4', 'nh3', 'h2', 'n2', 'co2'].forEach((m, i) => { olMolecuul(ctx, m, 160 + i * 150, 170, 2.2); metaText(ctx, m, 160 + i * 150, 270, C.text2, 'center', 26); });
    olAminozuur(ctx, 1200, 180, 1.6, { soort: 'glycine' }); olAminozuur(ctx, 1600, 180, 1.6, { soort: 'alanine' }); metaText(ctx, 'glycine', 1200, 330, C.text2, 'center', 26); metaText(ctx, 'alanine', 1600, 330, C.text2, 'center', 26);
    ['A', 'U', 'G', 'C'].forEach((b, i) => olNucleotide(ctx, 160 + i * 260, 440, b, 1.1));
    olRnaStreng(ctx, olSlap(500, 640, 760, 0, 1), 'AUGGCUAAGUUCGACGAUCC', { w: 6 });
    olRnaStreng(ctx, [[60, 820], [400, 800], [800, 830]], 'GCUAAGUC', { w: 10, groot: 0.5, letters: true });
    olRibozym(ctx, 1150, 720, 0.85, { fold: 0 }); olRibozym(ctx, 1600, 700, 0.75, { fold: 1 });
    olEiwit(ctx, 1500, 420, 0.8); olCodon(ctx, 950, 960, 0.8);
  },
  vet(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 10B · VETZUUR, BLAASJE, CELLEN', 60, 50, C.text2);
    olVetzuur(ctx, 120, 160, 0, 3); olBlaasje(ctx, 480, 300, 170, { inhoud: () => olRnaStreng(ctx, olSlap(480, 300, 160, 0.4, 2), 'AUGGCUAAGU', { w: 4 }) });
    olBlaasje(ctx, 900, 300, 150, { deling: 0.5 }); olBlaasje(ctx, 1330, 300, 150, { deling: 0.95 });
    olLuca(ctx, 400, 780, 260, 170); olCelIcoon(ctx, 'bacterie', 900, 700, 1.4); olCelIcoon(ctx, 'archaeon', 1150, 700, 1.4); olCelIcoon(ctx, 'eukaryoot', 1450, 700, 1.4);
    olRibosoom(ctx, 1000, 980, 0.55); olPaddenstoel(ctx, 1500, 1000, 160); olEik(ctx, 1750, 1000, 260);
  },
  macro(ctx) { olJongeAarde(ctx); metaText(ctx, 'TESTVEL 10C · JONGE AARDE + MILLER', 60, 50, C.text2);
    olMiller(ctx, 1150, 700, 0.62, { kleur: 1 }); persoon(ctx, 'miller', 300, 1000, 420, { pose: 'wijs', kijk: 1 });
    olMeteorietBrok(ctx, 1700, 900, 80); olVuurbal(ctx, 1600, 200, 2.6, 300);
  },
  plek(ctx) { olDiepzee(ctx, { x0: 0, w: 960 }); olPoelLand(ctx, { x0: 960, w: 960 }); metaText(ctx, 'TESTVEL 10D · BRON, POEL, STROMATOLIET', 60, 50, C.text2);
    olStromatoliet(ctx, 300, 1040, 260, 160); olStromatoliet(ctx, 700, 1040, 300, 200, { doorsnede: true });
    olMolecuul(ctx, 'co2', 1300, 300, 2); olMeteorietBrok(ctx, 1600, 300, 60);
  },
};
