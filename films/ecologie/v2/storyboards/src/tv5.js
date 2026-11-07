// Ecologie 5 — testvel: bibliotheekdieren op echte maat naast elkaar (29 okt 2026)
const TV5 = {
  dieren(ctx) { macroNacht(ctx, { horizon: 560 }); metaText(ctx, 'TESTVEL ECO 5 · BIBLIOTHEEK OP SCHAAL (2 PX/CM)', 80, 60, C.text2);
    const s = 2; koe7(ctx, 420, 880, s / 1.7, { houding: 'grazen' }); persoon(ctx, 'gerrit', 900, 880, 180 * s * 0.98, { uit: 'neutraal' });
    ecoVos(ctx, 1250, 880, s, { houding: 'staan' }); ecoSpitsmuis(ctx, 1500, 880, s * 3, { houding: 'staan' }); hagedis(ctx, 1700, 880, 3 * 0.6, {});
    muis(ctx, 1550, 760, s * 3, {}); ecoKonijn(ctx, 1700, 760, s, {});
    metaText(ctx, 'spitsmuis, muis, hagedis 3× vergroot', 1400, 980, C.text2, 'left', 26); },
  klein(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoSpitsmuis(ctx, 500, 600, 30, { houding: 'staan' }); hagedis(ctx, 1350, 600, 2.4, {}); ecoSpitsmuis(ctx, 500, 900, 30, { houding: 'snuffelen', t: 0.3 }); },
};
