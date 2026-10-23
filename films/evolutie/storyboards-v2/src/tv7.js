const TV7 = {
  dieren(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 7A · WALVIS EN VOOROUDERS', 60, 50, C.text2);
    bultrug(ctx, 540, 240, 0.9, {}); naamBij(ctx, 'bultrug', '±15 m', 140, 110);
    bultrug(ctx, 1420, 240, 0.9, { rontgen: 1, heup: 1 }); naamBij(ctx, 'röntgen', 'heupbotjes goud', 1060, 110);
    pakicetus(ctx, 220, 640, 0.9); naamBij(ctx, 'Pakicetus', '', 60, 440);
    ambulocetus(ctx, 700, 620, 0.7); naamBij(ctx, 'Ambulocetus', '', 480, 480);
    rodhocetus(ctx, 1150, 560, 0.7); naamBij(ctx, 'Rodhocetus', '', 980, 470);
    basilosaurus(ctx, 1500, 720, 0.45, { poot: 1 }); naamBij(ctx, 'Basilosaurus', '', 1300, 640);
    nijlpaard(ctx, 300, 960, 0.6); koe7(ctx, 760, 960, 0.6); zeehond(ctx, 1150, 940, 0.8);
  },
  armen(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 7B · HOMOLOGE VOORPOTEN', 60, 50, C.text2);
    armSkelet(ctx, 'mens', 260, 180, 600); armSkelet(ctx, 'vleermuis', 520, 180, 600); armSkelet(ctx, 'walvis', 1160, 180, 600); armSkelet(ctx, 'paard', 1560, 180, 600);
    ['mens', 'vleermuis', 'walvis', 'paard'].forEach((n, i) => naamBij(ctx, n, '', [260, 640, 1160, 1560][i], 150, 1, 'center'));
  },
  rest(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 7C · LAGEN, DNA, GRAFIEK', 60, 50, C.text2);
    gesteente(ctx, 80, 120, 700, 420, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 1 }], { fossielen: [{ laag: 0, soort: 'pakicetus', x: 0.3 }, { laag: 1, soort: 'ambulocetus', x: 0.6 }, { laag: 2, soort: 'schelp', x: 0.2 }, { laag: 3, soort: 'basilosaurus', x: 0.5, s: 0.8 }, { laag: 4, soort: 'vis', x: 0.7 }] });
    gesteente(ctx, 900, 140, 500, 300, [{ dik: 1 }, { dik: 1 }, { dik: 1 }, { dik: 1 }], { rot: 0.5, nadruk: 0 });
    dnaRijen(ctx, 80, 640, [{ naam: 'walvis', seq: 'ATGGCTAAGTTC' }, { naam: 'nijlpaard', seq: 'ATGGCAAAGTTC' }, { naam: 'koe', seq: 'ATCGCAAGGTAC' }]);
    halveringsGrafiek(ctx, 1300, 900, 500, 300);
    staartbeen(ctx, 1660, 400, 0.8);
  },
};
const TV8 = {
  zwemmers(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 8A · ZWEMMERS (zelfde schaal: ±2–3 m)', 60, 50, C.text2);
    haai(ctx, 420, 220, 0.9); dolfijn(ctx, 1000, 220, 0.9); ichthyosaurus(ctx, 1560, 220, 0.8);
    haai(ctx, 420, 560, 0.9, { rontgen: 1 }); dolfijn(ctx, 1000, 560, 0.9, { rontgen: 1 });
    ['haai', 'dolfijn', 'ichthyosaurus'].forEach((n, i) => naamBij(ctx, n, '', [420, 1000, 1560][i], 360, 1, 'center'));
    krokodil(ctx, 400, 960, 0.6); hagedis(ctx, 960, 960, 0.6); vogel(ctx, 1500, 1000, 0.75);
  },
  katten(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'TESTVEL 8B · KATACHTIGEN', 60, 50, C.text2);
    leeuw(ctx, 420, 700, 1); tijger(ctx, 1100, 700, 1.08); huiskat(ctx, 1640, 700, 0.24);
    naamVak(ctx, 80, 760, 900, 260, 'geslacht', 'Panthera', { nadruk: true });
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1200, 1000); ctx.lineTo(1500, 800); ctx.stroke(); kenmerkStreep(ctx, 1200, 1000, 1500, 800, 0.5, 'vier poten');
  },
};
