// Monohybride kruisingen v2.0 (Erfelijkheid 2/6) — scènes, één functie per gesproken alinea. 28 okt 2026.
// Cue-woorden: q.on/q.at zoeken een stukje van een woord (hoofdletterongevoelig). Nooit cuen op 'a', 'aa' of 'Aa' (zit in 'maar', 'paars').
// Gebruikt: teken_chr1.js (kamer, gezin, allelChip, chromatide1, termKaart, misvatting), muis_pop.js (muizenpop), teken_erf2.js.

const _nB = (ctx, lab, sub, x, y, a, al = 'left', kl = C.text) => naamBij(ctx, lab, sub, x, y, a, al, kl);
function meta2(ctx, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, 70, 851, C.text2, 'left', 28); ctx.restore(); }
// generatieladder met plantjes (P, F1, F2); st: p, f1, f2 (0..1), lus, hl ('P'|'F1'|'F2'), chips, f2kleur ('?'|'uit')
const LAD = { x: 110, y: 240, xP: [560, 900], xF1: [560, 730, 900], xF2: [480, 620, 840, 980] };
function ladder(ctx, t, st = {}) { const L = generatieLadder(ctx, LAD.x, LAD.y, { p: st.p ?? 1, f1: st.f1 ?? 0, f2: st.f2 ?? 0, hl: st.hl }, 230), y0 = L.rij(0) + 80, y1 = L.rij(1) + 80, y2 = L.rij(2) + 80;
  const pa = st.p ?? 1; if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; plantje(ctx, LAD.xP[0], y0, 200, 'paars'); plantje(ctx, LAD.xP[1], y0, 200, 'wit'); text(ctx, '×', 730, y0 - 70, fTekst(64, 700), C.text, 'center'); ctx.restore();
    allelChip(ctx, 'AA', LAD.xP[0] - 110, y0 - 130, pa * (st.chips ?? 1), { px: 34 }); allelChip(ctx, 'aa', LAD.xP[1] + 110, y0 - 130, pa * (st.chips ?? 1), { px: 34 }); }
  const f1 = st.f1 ?? 0; if (f1 > 0.01) { pijl(ctx, 730, y0 + 20, 730, y1 - 210, C.line, f1, 3, 14); ctx.save(); ctx.globalAlpha *= f1; LAD.xF1.forEach((x, i) => plantje(ctx, x, y1, 200 * (0.6 + 0.4 * clamp(f1 * 1.4 - i * 0.2, 0, 1)), 'paars')); ctx.restore();
    if (st.f1chip) allelChip(ctx, 'Aa', LAD.xF1[2] + 120, y1 - 130, st.f1chip, { px: 34 }); }
  if ((st.lus || 0) > 0.01) zelfLus(ctx, 1110, y1 - 90, 46, st.lus, st.lusLab || 'F1 × F1: zelfbestuiving');
  const f2 = st.f2 ?? 0; if (f2 > 0.01) { pijl(ctx, 730, y1 + 20, 730, y2 - 210, C.line, f2, 3, 14); ctx.save(); ctx.globalAlpha *= f2 * 0.3; LAD.xF2.forEach(x => plantje(ctx, x, y2, 200, 'wit')); ctx.restore();
    vraagteken(ctx, 730, y2 - 50, f2, 120); }
  return { y0, y1, y2 }; }

Object.assign(SCENES, {
  // ---------------- titel: een paarse en een witte erwtenbloem
  title(ctx, t) { const w = Math.sin(t * 1.3) * 0.03; erwtBloem(ctx, 1170, 600, 10, { kleur: 'paars', rot: w }); text(ctx, '×', 1470, 560, fTekst(80, 700), C.text2, 'center'); erwtBloem(ctx, 1600, 600, 10, { kleur: 'wit', rot: -w }); },

  // ---------------- Cold open (Macro: de kamer uit Chromosomen)
  s01(ctx, t, q) { kamer(ctx); const ou = q.on('ouders', 1, 0.5), k = q.on('kind', 1, 0.5), v = q.on('verborgen', 1, 0.5);
    gezin(ctx, t, { hl: { dennis: ou, marieke: ou, levi: k } });
    _nB(ctx, 'albinisme', null, gx('levi'), kopY('levi') - 30, k * (1 - v), 'center', C.goud);
    ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, v, { acc: 1, accA: v })); allelChip(ctx, 'aa', gx('levi'), kopY('levi') - 60, v, { px: 40 }); },
  s02(ctx, t, q) { const cut = q.at('gregor');
    if (t < cut) { kamer(ctx); gezin(ctx, t, { hl: { dennis: 1, marieke: 1 } }); ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, 1, { acc: 1 })); allelChip(ctx, 'aa', gx('levi'), kopY('levi') - 60, 1, { px: 40 });
      card(ctx, 1450, 300, 430, 250, 'Puzzel', 'Twee ouders met Aa. Hoe groot is de kans op een kind met aa?', q.on('kans', 1, 0.5)); return; }
    tuin(ctx); const er = q.on('erwten', 1, 0.6);
    [[260, 'paars', 3], [480, 'wit', 5], [1240, 'paars', 7], [1460, 'wit', 9], [1680, 'paars', 11]].forEach(([x, k, s]) => erwtenplant(ctx, x, VLOER2, 430, { kleur: k, bloemen: 2, peulen: 1, seed: s, t: t * 0.3, hl: er }));
    persoon(ctx, 'mendel', 860, VLOER2, 560, { uit: 'blij', t, kijk: 1 }); _nB(ctx, 'Gregor Mendel', 'proeven gepubliceerd in 1866', 860, 230, ramp(t, cut, 0.6), 'center'); },

  // ---------------- Hoofdstuk 1 — Van P naar F1
  s04(ctx, t, q) { tuin(ctx); const P = erwtenplant(ctx, 420, VLOER2, 560, { kleur: 'paars', bloemen: 3, peulen: 2, seed: 3, t: t * 0.3 }); const b = P.bloemen[1] || P.bloemen[0];
    const z = q.on('bestuift', 1, 0.8), kiel = q.on('kiel', 1, 0.8), md = q.on('meeldraden', 1, 0.5), st = q.on('stamper', 1, 0.5), ei = q.on('eigen', 1, 1.2), op = q.on('opengaat', 1, 1.0);
    _nB(ctx, 'erwtenplant', 'klimt met ranken', 420, 230, 1 - z * 0.6, 'center');
    zoomCircle(ctx, 1290, 430, 340, b.kiel[0], b.kiel[1], 'erwtenbloem, opengesneden · vergroot', z, () => { bg(ctx, 'schema');
      const r = erwtBloem(ctx, 1060, 540, 24, { kleur: 'paars', open: kiel * (1 - op * 0.9), stuif: ei, knop: 0.6 * (1 - op) });
      _nB(ctx, 'meeldraden', 'met stuifmeel', r.meeldraad[0] - 90, r.meeldraad[1] - 110, md * kiel * (1 - op), 'center');
      _nB(ctx, 'stamper', null, r.stempel[0] - 230, r.stempel[1] + 165, st * kiel * (1 - op), 'center');
      _nB(ctx, 'kiel', null, 1330, 690, kiel, 'center'); });
    if (z > 0.5) { ctx.save(); ctx.globalAlpha *= z; ctx.fillStyle = C.text; ctx.fillRect(1000, 830, 24 * 5, 5); metaText(ctx, '5 millimeter (in de cirkel)', 1000 + 24 * 5 + 16, 841, C.text2, 'left', 26); ctx.restore(); } },
  s05(ctx, t, q) { tuin(ctx); const g = q.on('generatie', 1, 2.4), ho = q.on('homozygoot', 1, 0.5), pa = q.on('paarse', 1, 0.5), wi = q.on('witte', 1, 0.5);
    // drie generaties achter elkaar: achteraan klein, vooraan groot (paars links, wit rechts)
    [0, 1, 2].forEach(i => { const u = i === 0 ? 1 : clamp(g * 3 - i + 0.5, 0, 1);
      ctx.save(); ctx.globalAlpha *= u; plantje(ctx, 160 + i * 220, 800, 300, 'paars'); plantje(ctx, 1100 + i * 220, 800, 300, 'wit');
      if (i > 0) { pijl(ctx, 160 + i * 220 - 150, 640, 160 + i * 220 - 80, 640, C.line, 1, 3, 12); pijl(ctx, 1100 + i * 220 - 150, 640, 1100 + i * 220 - 80, 640, C.line, 1, 3, 12); } ctx.restore(); });
    metaText(ctx, 'generatie na generatie', 960, 300, C.text2, 'center', 28);
    allelChip(ctx, 'AA', 380, 400, pa * ho, { px: 40 }); allelChip(ctx, 'aa', 1320, 400, wi * ho, { px: 40 });
    _nB(ctx, 'raszuiver', 'homozygoot', 960, 210, ho, 'center', C.goud); },
  s06(ctx, t, q) { tuin(ctx); const P1 = erwtenplant(ctx, 300, VLOER2, 470, { kleur: 'paars', bloemen: 2, peulen: 1, seed: 5, t: t * 0.3 }); erwtenplant(ctx, 820, VLOER2, 470, { kleur: 'wit', bloemen: 2, peulen: 1, seed: 8, t: t * 0.3 });
    const md = q.on('meeldraden', 1, 1.2), sm = ramp(t, q.at('stuifmeel'), 1.6), st = q.on('stamper', 1, 0.6), z = q.on('hand', 1, 0.8);
    persoon(ctx, 'mendel', 560, VLOER2, 560, { pose: 'vasthouden', uit: 'neutraal', t, kijk: -1, hold: (c, x, y) => pincet(c, x, y, Math.PI * 0.85, 70, 1) });
    const b = P1.bloemen[0];
    zoomCircle(ctx, 1450, 420, 320, b.kiel[0], b.kiel[1], 'jonge paarse bloem, kiel open · vergroot', z, () => { bg(ctx, 'schema');
      const r = erwtBloem(ctx, 1290, 520, 14, { kleur: 'paars', open: 1, zonder: md, stuif: st, knop: 0.6 });
      const [px, py] = r.stempel; // pincet: eerst meeldraden eruit (naar rechtsboven), daarna wit stuifmeel naar de stempel
      const pin = md < 0.99 ? [lerp(px - 20, px + 140, ease(md)), lerp(py + 10, py - 140, ease(md))] : [lerp(px + 220, px + 16, ease(sm)), lerp(py - 200, py - 8, ease(sm))];
      pincet(ctx, pin[0], pin[1], -0.75, 220, z, md >= 0.99 ? 1 : 0.0);
      _nB(ctx, 'meeldraden weg', null, 1420, 640, md * (1 - sm), 'center'); _nB(ctx, 'stuifmeel', 'van een witte bloem', 1560, 290, sm, 'center'); });
    _nB(ctx, 'Gregor Mendel', null, 560, 230, 1 - z * 0.7, 'center'); },
  s07(ctx, t, q) { bg(ctx, 'schema'); const p = q.on('generatie', 1, 0.5), f1 = q.on('nakomelingen', 1, 1.2), pa = q.on('bloeiden', 1, 0.5);
    ladder(ctx, t, { p: 1, f1, hl: f1 > 0.5 ? 'F1' : (p > 0.5 ? 'P' : null) });
    card(ctx, 1400, 300, 440, 200, 'P', 'van het Latijnse woord voor ouders', p * (1 - f1 * 0.0)); card(ctx, 1400, 540, 440, 200, 'F', 'van het woord voor kinderen', f1);
    if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; metaText(ctx, 'alle f1-planten paars', 730, 690, C.goud, 'center', 28); ctx.restore(); } },
  s08(ctx, t, q) { bg(ctx, 'schema'); const L = ladder(ctx, t, { p: 1, f1: 1, f1chip: q.on('allemaal', 1, 0.5) });
    const va = ramp(t, q.at('kreeg'), 1.4), vb = ramp(t, q.at('andere'), 1.4), dom = q.on('dominant', 1, 0.5), mo = q.on('eigenschap', 1, 0.5);
    const ch = q.on('allemaal', 1, 0.5); if (ch < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ch; vliegLetter(ctx, 'A', LAD.xP[0] - 110, L.y0 - 120, LAD.xF1[2] + 95, L.y1 - 120, va, CH.moeder, 40);
    vliegLetter(ctx, 'a', LAD.xP[1] + 110, L.y0 - 120, LAD.xF1[2] + 145, L.y1 - 120, vb, CH.vader, 40); ctx.restore(); }
    termKaart(ctx, 'dominant', 'Aa ziet eruit als AA: paars', 1620, 260, dom * (1 - mo), C.goud);
    termKaart(ctx, 'monohybride kruising', 'je let op één eigenschap', 1620, 260, mo, C.goud); },

  // ---------------- Hoofdstuk 2 — De F2
  s09(ctx, t, q) { bg(ctx, 'schema'); const el = q.on('elkaar', 1, 0.8), be = q.on('bestuiven', 1, 0.8), sm = q.on('stuifmeel', 1, 1.0);
    ladder(ctx, t, { p: 0.45, f1: 1, f1chip: 1, lus: el, hl: 'F1' });
    if (be > 0.01) { ctx.save(); ctx.globalAlpha *= be; roundRect(ctx, 1300, 540, 560, 330, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5);
      const r = erwtBloem(ctx, 1400, 770, 12, { kleur: 'paars', open: 1, stuif: sm }); metaText(ctx, 'f1-bloem · eigen stuifmeel', 1580, 850, C.text2, 'center', 24);
      text(ctx, 'A of a', r.stempel[0] + 60, r.stempel[1] - 60, fTekst(36, 700), C.text, 'left'); ctx.restore(); } },
  s10(ctx, t, q) { bg(ctx, 'schema'); const f2 = q.on('tweede', 1, 0.8), hp = q.on('ouders', 1, 0.4), hk = q.on('kinderen', 1, 0.4), hf = ramp(t, q.at('F2', 2), 0.4);
    const hl = hf > 0.5 ? 'F2' : hk > 0.5 ? 'F1' : hp > 0.5 ? 'P' : (f2 > 0.5 ? 'F2' : null);
    ladder(ctx, t, { p: 1, f1: 1, f2, lus: 1, lusLab: 'zelfbestuiving', hl });
    card(ctx, 1400, 560, 440, 230, 'Generaties', 'P = ouders · F1 = hun kinderen · F2 = kinderen van de F1', hp); },
  s11(ctx, t, q) { bg(ctx, 'schema'); const L = generatieLadder(ctx, LAD.x, LAD.y, { p: 1, f1: q.on('kruis', 1, 0.8), f2: q.on('kruis', 1, 0.8), hl: 'F1' }, 230), y0 = L.rij(0) + 50, y1 = L.rij(1) + 50, y2 = L.rij(2);
    const m = q.on('muis', 1, 0.6), kr = q.on('kruis', 1, 0.8), bz = q.on('broer', 1, 0.5), it = q.on('inteelt', 1, 0.5), ze = q.on('zeker', 1, 0.5);
    muisMet(ctx, 560, y0, 'zwart', 1, Math.max(0.3, m)); muisMet(ctx, 920, y0, 'wit', -1, Math.max(0.3, m)); text(ctx, '×', 740, y0 - 40, fTekst(64, 700), C.text, 'center');
    _nB(ctx, 'zwart', null, 560, y0 + 50, m, 'center'); _nB(ctx, 'wit (albino)', null, 920, y0 + 50, m, 'center');
    pijl(ctx, 740, y0 + 40, 740, y1 - 110, C.line, kr, 3, 14); muisMet(ctx, 560, y1, 'zwart', 1, kr); muisMet(ctx, 920, y1, 'zwart', -1, kr); ctx.save(); ctx.globalAlpha *= kr; text(ctx, '×', 740, y1 - 40, fTekst(64, 700), C.goud, 'center'); ctx.restore();
    if (bz > 0.01) { ctx.save(); ctx.globalAlpha *= bz; metaText(ctx, 'broer', 560, y1 + 50, C.text2, 'center', 26); metaText(ctx, 'zus', 920, y1 + 50, C.text2, 'center', 26); ctx.restore(); }
    allelChip(ctx, 'Aa', 560, y1 - 100, ze, { px: 30 }); allelChip(ctx, 'Aa', 920, y1 - 100, ze, { px: 30 });
    pijl(ctx, 740, y1 + 70, 740, y2 - 60, C.line, kr, 3, 14); vraagteken(ctx, 740, y2 + 30, kr, 120);
    card(ctx, 1260, 330, 560, 300, 'Inteelt', 'Een fokker vermijdt broer × zus. In een proef weet je zo zeker: beide ouders zijn Aa.', it, C.koraal); },
  s12(ctx, t, q) { bg(ctx, 'schema'); ladder(ctx, t, { p: 1, f1: 1, f2: 1, lus: 1, lusLab: 'zelfbestuiving', hl: 'F2' }); },
  s14(ctx, t, q) { bg(ctx, 'schema'); const n = ramp(t, 0.2, 3.2), te = q.on('mendel', 1, 0.5), ra = q.on('ongeveer', 1, 0.5), ve = q.on('verborgen', 1, 0.5);
    f2Veld(ctx, 120, 160, 1020, 620, n); metaText(ctx, 'f2 · 929 planten · elke stip = één plant', 120, 851, C.text2, 'left', 28);
    card(ctx, 1260, 200, 560, 200, 'Mendel telde', '705 paars · 224 wit', te);
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, '705 : 224 ≈ 3 : 1', 1540, 520, fTekst(60, 700), C.text, 'center'); ctx.restore(); }
    card(ctx, 1260, 620, 560, 170, 'Verborgen', 'Het allel a zat in de F1, naast een A.', ve, C.groen); },

  // ---------------- Hoofdstuk 3 — Waarom drie op één?
  s15(ctx, t, q) { bg(ctx, 'schema'); const z = q.on('neem', 1, 0.8), ch = q.on('chromosoom', 1, 0.6);
    plantje(ctx, 300, 780, 380, 'paars'); allelChip(ctx, 'Aa', 300, 340, 1, { px: 36 }); metaText(ctx, 'f1-plant', 300, 851, C.text2, 'center', 28);
    zoomCircle(ctx, 1150, 450, 330, 300, 560, 'één cel van de f1-plant · vereenvoudigd', z, () => { bg(ctx, 'schema'); meioseAa(ctx, 1150, 470, 0, { R: 200 });
      _nB(ctx, 'van paars', null, 1050, 650, ch, 'center', CH.moeder); _nB(ctx, 'van wit', null, 1250, 650, ch, 'center', CH.vader); }); },
  s16(ctx, t, q) { bg(ctx, 'schema'); const p = ramp(t, q.at('uit'), 2.2), gm = q.on('geslachtscel', 3, 0.5);
    meioseAa(ctx, 760, 470, p, { R: 190 }); metaText(ctx, 'meiose · vereenvoudigd (alleen het chromosoompaar met het gen)', 70, 851, C.text2, 'left', 26);
    termKaart(ctx, 'gameet', 'geslachtscel: één chromosoom van elk paar', 1500, 300, gm, C.goud); },
  s17(ctx, t, q) { bg(ctx, 'schema'); meioseAa(ctx, 760, 470, 1, { R: 190 }); const h = q.on('helft', 1, 0.5), k = q.on('kans', 1, 0.5), sm = q.on('stuifmeel', 1, 0.5), ei = q.on('eicellen', 1, 0.5);
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; text(ctx, 'A', 465, 820, fTekst(48, 700), C.text, 'center'); text(ctx, 'a', 1055, 820, fTekst(48, 700), C.text, 'center'); ctx.restore(); }
    if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; text(ctx, 'kans ½', 465, 880 - 20, fTekst(36, 700), C.goud, 'center'); text(ctx, 'kans ½', 1055, 860, fTekst(36, 700), C.goud, 'center'); ctx.restore(); }
    card(ctx, 1400, 260, 440, 170, 'Stuifmeel', 'A ½ · a ½', sm, CH.vader); card(ctx, 1400, 470, 440, 170, 'Eicellen', 'A ½ · a ½', ei, CH.moeder); },
  s18(ctx, t, q) { bg(ctx, 'schema'); const bo = q.on('boven', 1, 0.6), li = q.on('links', 1, 0.6), va = q.on('vakje', 1, 0.5);
    ctx.save(); ctx.globalAlpha *= Math.max(0.2, Math.max(bo, li)); kruisSchema(ctx, 640, 320, 230, { n: 0, hl: va > 0.5 ? 0 : -1, bt: bo > 0.3 ? ['A', 'a'] : ['', ''], lt: li > 0.3 ? ['A', 'a'] : ['', ''] }); ctx.restore();
    card(ctx, 1380, 640, 470, 150, null, 'Elk vakje is één mogelijke bevruchting.', va, C.goud); },
  s19(ctx, t, q) { bg(ctx, 'schema'); const n = [1, 2, 3, 4].reduce((s, k) => s + q.on('geeft', k, 0.5), 0);
    kruisSchema(ctx, 640, 320, 230, { n, hl: n < 4.99 ? Math.max(0, Math.ceil(n) - 1) : -1 }); },
  s20(ctx, t, q) { bg(ctx, 'schema'); const pa = q.on('paars', 1, 0.6), wi = q.on('wit', 1, 0.5), ge = q.on('genotypen', 1, 0.5), fe = q.on('fenotypen', 1, 0.5);
    kruisSchema(ctx, 420, 300, 230, { n: 4, feno: pa, hl: wi > 0.5 ? 3 : -1 });
    card(ctx, 1260, 260, 560, 200, 'Genotypen', '1 AA : 2 Aa : 1 aa', ge); card(ctx, 1260, 520, 560, 200, 'Fenotypen', '3 paars : 1 wit', fe, C.groen); },

  // ---------------- Hoofdstuk 4 — Kansen, geen aantallen
  s21(ctx, t, q) { bg(ctx, 'schema'); const sm = q.on('stuifmeel', 1, 0.5), ei = q.on('eicel', 1, 0.5), h = q.on('keer', 1, 0.6), pr = q.on('productregel', 1, 0.5);
    kruisSchema(ctx, 200, 300, 230, { n: 4, hl: 3, dimNiet: 3 });
    if (sm > 0.01) { ctx.save(); ctx.globalAlpha *= sm; text(ctx, '½', 200 + 230 * 2 + 115 - 6, 300 - 150, fTekst(40, 700), C.goud, 'center'); ctx.restore(); }
    if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; text(ctx, '½', 200 + 115 - 100, 300 + 230 + 130, fTekst(40, 700), C.goud, 'center'); ctx.restore(); }
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; text(ctx, 'kans op aa = ½ × ½ = ¼', 1400, 400, fTekst(52, 700), C.text, 'center'); ctx.restore(); }
    termKaart(ctx, 'productregel', 'kansen die allebei moeten gebeuren: vermenigvuldigen', 1360, 520, pr, C.goud); },
  s22(ctx, t, q) { bg(ctx, 'schema'); plantje(ctx, 520, 800, 460, 'paars'); allelChip(ctx, 'Aa', 520, 300, 1, { px: 36 }); const z = q.on('vier', 1, 0.6);
    [0, 1, 2, 3].forEach(i => { ctx.save(); ctx.globalAlpha *= clamp(z * 4 - i, 0, 1); circ(ctx, 1000 + i * 140, 560, 38, ERW.peul, ERW.peulD, 3); ctx.restore(); });
    if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; metaText(ctx, 'vier zaden', 1210, 660, C.text2, 'center', 28); ctx.restore(); } },
  s23(ctx, t, q) { bg(ctx, 'schema'); plantje(ctx, 520, 800, 460, 'paars'); allelChip(ctx, 'Aa', 520, 300, 1, { px: 36 });
    [0, 1, 2, 3].forEach(i => { circ(ctx, 1000 + i * 140, 560, 38, ERW.peul, ERW.peulD, 3); vraagteken(ctx, 1000 + i * 140, 470, 1, 60); }); },
  s25(ctx, t, q) { bg(ctx, 'schema'); const t0 = 0.4, sp = Math.max(0, t - t0) * (t > q.at('heel') ? 1 : 1);
    // tempo: tot 'heel' alleen de eerste vier, daarna de rest in ± 5 s
    const th = q.at('heel'), tt = t < th ? Math.min(simT(3) + 0.6, t - t0) : simT(3) + 0.6 + (t - th) * 1.15;
    const X0 = 200, Y0 = 330, c = 150; kruisSchema(ctx, X0, Y0, c, { n: 4 });
    const cel = (k) => [X0 + c * ((k % 2) + 1) + (c - 12) / 2, Y0 + c * Math.floor(k / 2) + (c - 12) / 2];
    const r = simKolommen(ctx, tt, null, { schema: cel, x1: 760, x2: 1040 });
    text(ctx, 'paars ' + r.paars, 850, 820, fTekst(36, 700), C.text, 'center'); text(ctx, 'wit ' + r.wit, 1130, 820, fTekst(36, 700), C.text, 'center');
    metaText(ctx, 'simulatie · toevallige bevruchtingen', 70, 851, C.text2, 'left', 26);
    card(ctx, 1460, 200, 400, 180, 'Na 4', '2 paars · 2 wit', q.on('twee', 1, 0.5), C.koraal);
    const n = r.paars + r.wit; if (n >= 400) card(ctx, 1460, 410, 400, 180, 'Na 400', `${r.paars} : ${r.wit} ≈ 3 : 1`, 1, C.groen);
    misvatting(ctx, 'De 4 vakjes zijn 4 kinderen', 'Elk vakje is een kans van ¼', 1600, 640, 600, q.on('vakjes', 1, 0.5), 1); },

  // ---------------- Hoofdstuk 5 — Stappenplan
  s26(ctx, t, q) { bg(ctx, 'schema'); text(ctx, 'Stappenplan kruisingsvraag', 960, 190, fTitel(64), C.text, 'center');
    const ks = [['1', 'genotypen ouders', 'Aa × Aa', q.on('Eén', 1, 0.5)], ['2', 'gameten per ouder', 'A, a · A, a', q.on('Twee', 1, 0.5)], ['3', 'kruisingsschema', '2 × 2 vakjes', q.on('Drie', 1, 0.5)], ['4', 'verhoudingen aflezen', 'genotypen, dan fenotypen', q.on('Vier', 2, 0.5)]];
    ks.forEach(([nr, kop, sub, a], i) => { if (a <= 0.01) return; const x = 130 + i * 430; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 300, 390, 420, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
      text(ctx, nr, x + 195, 420, fTitel(96), C.goud, 'center'); text(ctx, kop, x + 195, 520, fTekst(38, 700), C.text, 'center'); text(ctx, sub, x + 195, 600, fTekst(32, 500), C.text2, 'center'); ctx.restore(); }); },

  // ---------------- Hoofdstuk 6 — De terugkruising
  s27(ctx, t, q) { bg(ctx, 'schema'); const kr = q.on('kruis', 1, 0.6), tk = q.on('homozygoot', 1, 0.5);
    plantje(ctx, 400, 760, 420, 'paars'); allelChip(ctx, 'A?', 400, 300, 1, { px: 40 }); _nB(ctx, 'AA of Aa?', 'van buiten gelijk', 400, 230, q.on('buiten', 1, 0.5), 'center');
    ctx.save(); ctx.globalAlpha *= kr; text(ctx, '×', 680, 560, fTekst(80, 700), C.text, 'center'); plantje(ctx, 960, 760, 420, 'wit'); ctx.restore(); allelChip(ctx, 'aa', 960, 300, kr, { px: 40 });
    termKaart(ctx, 'terugkruising', 'kruisen met een homozygoot recessieve plant (aa)', 1520, 420, tk, C.goud); },
  s28(ctx, t, q) { bg(ctx, 'schema'); plantje(ctx, 400, 520, 300, 'paars'); allelChip(ctx, 'A?', 400, 180, 1, { px: 34 }); text(ctx, '×', 620, 400, fTekst(64, 700), C.text, 'center'); plantje(ctx, 840, 520, 300, 'wit'); allelChip(ctx, 'aa', 840, 180, 1, { px: 34 });
    const al = q.on('altijd', 1, 0.6), he = q.on('helft', 1, 0.8);
    [0, 1, 2, 3].forEach(i => vliegLetter(ctx, 'a', 840, 560, 1150 + i * 170, 640, clamp(al * 1.6 - i * 0.2, 0, 1), CH.vader, 36));
    ['paars', 'wit', 'paars', 'wit'].forEach((k, i) => { ctx.save(); ctx.globalAlpha *= clamp(he * 4 - i, 0, 1); plantje(ctx, 1150 + i * 170, 860, 220, k); ctx.restore(); });
    _nB(ctx, 'geeft altijd a', null, 840, 610, al, 'center'); },
  s29(ctx, t, q) { bg(ctx, 'schema'); plantje(ctx, 400, 520, 300, 'paars'); allelChip(ctx, 'A?', 400, 180, 1, { px: 34 }); text(ctx, '×', 620, 400, fTekst(64, 700), C.text, 'center'); plantje(ctx, 840, 520, 300, 'wit'); allelChip(ctx, 'aa', 840, 180, 1, { px: 34 });
    ['paars', 'wit', 'paars', 'wit'].forEach((k, i) => plantje(ctx, 1150 + i * 170, 860, 220, k)); vraagteken(ctx, 480, 220, 1, 90); },
  s31(ctx, t, q) { bg(ctx, 'schema'); const pA = q.on('was', 1, 0.6), pB = q.on('dus', 1, 0.6), een = q.on('één', 1, 0.5), wi = q.on('witte', 1, 0.5);
    const paneel = (x, kop, g, kids, a, rat) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 150, 780, 640, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, kop, x + 390, 220, fTekst(40, 700), C.text, 'center');
      allelChip(ctx, g, x + 230, 300, 1, { px: 38 }); text(ctx, '×', x + 390, 315, fTekst(56, 700), C.text, 'center'); allelChip(ctx, 'aa', x + 550, 300, 1, { px: 38 });
      kids.forEach((k, i) => plantje(ctx, x + 120 + i * 180, 720, 260, k)); text(ctx, rat, x + 390, 780 - 2, fTekst(34, 700), rat.includes(':') ? C.groen : C.text2, 'center'); ctx.restore(); };
    paneel(120, 'als de plant AA is', 'AA', ['paars', 'paars', 'paars', 'paars'], pA, 'alles paars'); paneel(1020, 'als de plant Aa is', 'Aa', ['paars', 'wit', 'paars', 'wit'], pB, '1 paars : 1 wit');
    if (wi > 0.01) { ctx.save(); ctx.globalAlpha *= wi; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1020 + 120 + 180, 640, 100, 140, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } },

  // ---------------- Recap (Macro: terug in de kamer)
  s32(ctx, t, q) { kamer(ctx); gezin(ctx, t, { hl: { dennis: 1, marieke: 1 } }); ['dennis', 'marieke'].forEach(id => allelChip(ctx, 'Aa', gx(id), kopY(id) - 60, 1)); const f = q.on('mendel', 1, 0.6), k = q.on('kwart', 1, 0.6);
    card(ctx, 1450, 300, 430, 200, 'Zoals de F1', 'Aa × Aa', f); card(ctx, 1450, 520, 430, 200, 'Per kind', 'kans op aa: ¼, steeds opnieuw', k, C.goud); },
  s33(ctx, t, q) { kamer(ctx); const d = q.on('kinderen', 1, 0.6); gezin(ctx, t, { hl: { sara: d, levi: d, jens: d } });
    allelChip(ctx, 'Aa', gx('dennis'), kopY('dennis') - 60, 1); allelChip(ctx, 'Aa', gx('marieke'), kopY('marieke') - 60, 1);
    const c1 = ramp(t, q.at('kinderen') + 0.6, 0.4), c2 = ramp(t, q.at('kinderen') + 1.5, 0.4), c3 = ramp(t, q.at('kinderen') + 2.4, 0.4);
    allelChip(ctx, 'AA', gx('sara'), kopY('sara') - 60, c1, { px: 40 }); allelChip(ctx, 'Aa', gx('jens'), kopY('jens') - 60, c2, { px: 40 }); allelChip(ctx, 'aa', gx('levi'), kopY('levi') - 60, c3, { px: 40 });
    card(ctx, 1450, 300, 430, 290, 'Per kind', 'kans op aa: ¼, bij elk kind opnieuw. Drie kinderen zeggen weinig over de verhouding.', q.on('weinig', 1, 0.5)); },
  s34(ctx, t, q) { bg(ctx, 'schema'); text(ctx, 'Samengevat', 960, 170, fTitel(64), C.text, 'center');
    const K = [['Per gen', 'één allel per ouder, elk met kans ½', q.on('elke', 1, 0.5)], ['Kruisingsschema', 'alle combinaties op een rij', q.on('kruisingsschema', 1, 0.5)], ['Aa × Aa', '3 : 1 in de F2', q.on('twee', 1, 0.5)], ['Aa × aa', '1 : 1 (terugkruising)', ramp(t, q.at('kruisingsschema') + 4.3, 0.5)]];
    K.forEach(([kop, sub, a], i) => card(ctx, 130 + i * 430, 270, 400, 230, kop, sub, a, i > 1 ? C.groen : C.goud));
    const vf = q.on('volgende', 1, 0.6); if (vf > 0.01) { ctx.save(); ctx.globalAlpha *= vf; text(ctx, 'Volgende film: voorbij dominant en recessief', 960, 640, fTekst(44, 700), C.goud, 'center');
      metaText(ctx, 'niet altijd drie op één', 960, 700, C.text2, 'center', 28); ctx.restore(); } }
});
