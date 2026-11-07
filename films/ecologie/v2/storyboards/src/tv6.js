// Ecologie 6 — testvel nieuwe tekeningen (29 okt 2026): Carboon-planten, mijnwerker, centrale, lagen, kringloop, badkuip
const TV6 = {
  planten(ctx) { e6Bg(ctx); metaText(ctx, 'TESTVEL ECO 6 · CARBOONPLANTEN', 80, 60, C.text2); e6Boomvaren(ctx, 400, 900, 600, { seed: 11, licht: true }); e6Schubboom(ctx, 1000, 900, 760, { seed: 3 }); e6Paardenstaart(ctx, 1500, 900, 400);
    naamBij(ctx, 'boomvaren', '± 8 m', 400, 960, 1, 'center'); naamBij(ctx, 'wolfsklauwboom', 'tot ± 30 m (hier verkleind)', 1000, 960, 1, 'center'); naamBij(ctx, 'reuzenpaardenstaart', '5–10 m', 1500, 960, 1, 'center'); },
  objecten(ctx) { e6Bg(ctx); e6Lagen(ctx, 80, 120, 400, 500, 0.5); e6Mijn(ctx, 560, 260, 600, 400); e6Mijnwerker(ctx, 900, 600, 120); e6Centrale(ctx, 1500, 700, 0.8); e6Co2(ctx, 300, 800, 3, { goud: true }); e6Atoom(ctx, 600, 820, 24); e6Badkuip(ctx, 900, 1000, 500, 200, { peil: 0.5, stijg: 30 }); },
};
