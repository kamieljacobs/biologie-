// Testvel tekenronde 2 · Micro-objecten. Render zonder micro_evo (oud) en met micro_evo (nieuw):
// python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,tv_micro TV_micro
// python3 render.py teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,micro_evo,tv_micro TV_micro
const _tvNieuw = () => typeof dnaDraad === 'function';
const _tvKop = (ctx, t) => metaText(ctx, 'TESTVEL MICRO · ' + t + (_tvNieuw() ? ' · NIEUW' : ' · OUD'), 80, 70, C.text2);
const TV_micro = {
  groot(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'E. COLI GROOT (ZOALS E4S16)');
    bacterie(ctx, 900, 470, 980, 0, { type: 'resistent', plasmide: 2, seed: 5 }); },
  cellen(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'E. COLI: GEVOELIG · DELING · RESISTENT · DOOD · KLEIN');
    bacterie(ctx, 330, 300, 360, 0, { seed: 2 }); bacterie(ctx, 960, 300, 400, 0, { deling: 0.75, seed: 3 }); bacterie(ctx, 1600, 300, 300, 0.05, { seed: 4, type: 'resistent', plasmide: 1 });
    bacterie(ctx, 330, 650, 300, 0.3, { type: 'gevoelig', dood: 1, seed: 6 }); bacterie(ctx, 820, 640, 120, 0.4, { type: 'resistent', seed: 8 }); bacterie(ctx, 1040, 640, 110, 0.4, { focus: true, seed: 3, zweep: false });
    for (let i = 0; i < 14; i++) bacterie(ctx, 1300 + (i % 7) * 80, 600 + Math.floor(i / 7) * 90 + (i % 2) * 20, 58 * (0.85 + 0.3 * hash(i)), hash(i * 5) * 3.14, { seed: i, zweep: false, a: 0.8 }); },
  dna(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'DNA-DRAAD · NUCLEOÏDE · PLASMIDE · PILUS');
    if (_tvNieuw()) { [3, 5, 8, 14].forEach((w, i) => { const P = []; for (let k = 0; k <= 8; k++) P.push([120 + k * 70, 170 + i * 70 + Math.sin(k * 0.9) * 20]); dnaDraad(ctx, P, { w }); metaText(ctx, 'w ' + w, 760, 178 + i * 70, C.text2); });
      nucleoide(ctx, 1150, 300, 180, 110, { w: 3 }); nucleoide(ctx, 1600, 300, 180, 110, { w: 6.5, seed: 4 }); }
    [8, 24, 44].forEach((r, i) => plasmideRing(ctx, 180 + i * 150, 620, r));
    bacterie(ctx, 900, 650, 360, 0, { type: 'resistent', plasmide: 1, zweep: false, seed: 2 }); bacterie(ctx, 1640, 680, 330, 0.08, { type: 'gevoelig', zweep: false, seed: 9 });
    pilus(ctx, 1080, 640, 1475, 680, 0.5, 24); },
  virus(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'GRIEPVIRUS · ANTIBIOTICUM (BÈTALACTAM)');
    griepVirus(ctx, 320, 420, 180); griepVirus(ctx, 760, 420, 70); griepVirus(ctx, 960, 420, 40);
    antibioticum(ctx, 1400, 400, 90, 0); for (let i = 0; i < 6; i++) antibioticum(ctx, 1200 + i * 90, 700, 12, i); for (let i = 0; i < 4; i++) antibioticum(ctx, 1220 + i * 140, 820, 30, i * 0.7); },
  chrom(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); _tvKop(ctx, 'CHROMOSOMEN · GESLACHTSCELLEN');
    chromosoomPaar(ctx, 260, 470, 420, {}); chromosoomPaar(ctx, 560, 470, 240, { allelen: [EVO.a1, EVO.a2] }); chromosoomPaar(ctx, 820, 470, 240, { nieuw: [1, _lt(C.paars, 0.6)] });
    [[150, 120, 1], [130, 100, 1], [110, 0, 0], [90, 90, 0]].forEach(([l1, l2, past], i) => { const xx = 1060 + i * 150; chromosoom(ctx, xx, 300, l1, '#A392D6'); if (l2) chromosoom(ctx, xx + 26 + (past ? 0 : 12), 300 + (past ? 0 : 18), l2, '#5A4A8A'); });
    geslachtscel(ctx, 1150, 720, 'ei', EVO.a1, 1.1); geslachtscel(ctx, 1500, 720, 'zaad', EVO.a2, 1.1); geslachtscel(ctx, 1500, 860, 'zaad', EVO.a1, 1); },
  bloed(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'RODE BLOEDCEL (KANT 0 · 0,3 · 0,6 · 0,8 · 1) · SIKKELCEL');
    [0, 0.3, 0.6, 0.8, 1].forEach((k, i) => rodeBloedcel(ctx, 200 + i * 220, 300, 80, 0, k));
    sikkelcel(ctx, 1450, 300, 90, 0); sikkelcel(ctx, 1750, 300, 46, 0.3);
    for (const [x, y, an, sk] of [[260, 640, 0.2, 0], [520, 600, -0.3, 1], [780, 660, 0.1, 0], [1040, 700, 0.5, 1], [1300, 660, -0.2, 1], [1560, 640, 0.3, 0], [1760, 690, -0.1, 1]]) sk ? sikkelcel(ctx, x, y, 46, an) : rodeBloedcel(ctx, x, y, 52, an, 0); },
  zoom(ctx) { bg(ctx, 'micro'); _tvKop(ctx, 'INGEZOOMD: POOL MET FLAGELLEN · PLASMIDE · ZAADKOP · NUCLEOÏDE');
    const vak = (vx, vy, vw, vh, sc, cx, cy, f) => { ctx.save(); ctx.beginPath(); ctx.rect(vx, vy, vw, vh); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(vx, vy, vw, vh); ctx.translate(vx + vw / 2, vy + vh / 2); ctx.scale(sc, sc); ctx.translate(-cx, -cy); f(); ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.strokeRect(vx, vy, vw, vh); };
    vak(60, 120, 880, 420, 2.5, 280, 470, () => bacterie(ctx, 420, 470, 360, 0, { seed: 2 }));
    vak(980, 120, 880, 420, 3, 1135, 410, () => bacterie(ctx, 900, 470, 980, 0, { type: 'resistent', plasmide: 2, seed: 5 }));
    vak(60, 580, 880, 300, 2.2, 1500, 720, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1200, 600, 600, 300); geslachtscel(ctx, 1500, 720, 'zaad', EVO.a2, 1.1); });
    vak(980, 580, 880, 300, 2.5, 1600, 700, () => { griepVirus(ctx, 1600, 700, 70); }); },
};
