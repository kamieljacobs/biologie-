// Film 6 · Hoe één soort er twee wordt — geanimeerde scènes (keyframes uit sb6.js als eindbeeld, opgebouwd in de maat van de stem).
// Elke scène tekent eerst haar eigen achtergrond.

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (paard, muilezel, ezel op schaal, rustig levend)
  title(ctx, t) { const g = 900, s = 2.3; ctx.save(); ctx.translate(-70, 0);
    paard(ctx, 980, g, s, { kopHoek: 0.04 * Math.sin(t * 0.8) }); muilezel(ctx, 1400, g, s, { kopHoek: 0.05 * Math.sin(t * 0.7 + 1) }); ezel(ctx, 1760, g, s, { kopHoek: 0.05 * Math.sin(t * 0.9 + 2) });
    naamBij(ctx, 'paard', null, 980, 470, 1, 'center'); naamBij(ctx, 'muilezel', null, 1400, 540, 1, 'center'); naamBij(ctx, 'ezel', null, 1760, 580, 1, 'center'); ctx.restore(); },

  // ---------------- Opening: Gerrit en zijn muilezel
  s01(ctx, t, q) { _erf(ctx);
    paard(ctx, 300, 640, 1.6, { a: lerp(0.55, 1, q.on('paard')), houding: 'grazen' });
    ezel(ctx, 1650, 640, 1.6, { a: lerp(0.55, 1, q.on('moeder')), kijk: -1, houding: 'grazen' });
    muilezel(ctx, 900, 900, 2.9, { kopHoek: 0.05 * Math.sin(t * 0.9) });
    ctx.save(); ctx.translate(2 * 1440, 0); ctx.scale(-1, 1); persoon(ctx, 'gerrit', 1440, 900, 520, { pose: E6.klop(t), t }); ctx.restore();
    naamBij(ctx, 'Veehouder Gerrit', null, 1440, 330, q.on('Gerrit', 1, 0.4), 'center');
    naamBij(ctx, 'muilezel', q.on('nooit') > 0.5 ? 'krijgt nooit jongen' : null, 860, 300, q.on('muilezel', 1, 0.4), 'center');
    naamBij(ctx, 'vader', null, 300, 330, q.on('vader') * (1 - q.on('Maar')), 'center'); naamBij(ctx, 'moeder', null, 1720, 420, q.on('moeder') * (1 - q.on('Maar')), 'center');
    vraagteken(ctx, 1180, 260, q.on('soort?', 1, 0.5), 110);
    evoSchaal(ctx, 'Gerrit 1,80 m · muilezel 1,30 m schofthoogte'); },

  // ---------------- H1 Wat is een soort?
  s03(ctx, t, q) { macroNacht(ctx, { horizon: 560 });
    const w = E6.gang(t, 1.4, 3.8, 560, E6.S.wolf, 5.4, 1.2); wolf(ctx, w.x, 820, 5.4, { houding: w.h, t: w.t });
    const c = E6.gang(t, 1.8, 2.8, 1300, E6.S.chihuahua, 5.4, 0.5, -1); const cA = 1 - q.on('Toch', 1, 0.6); hond(ctx, 'chihuahua', c.x, 820, 5.4, { kijk: -1, houding: c.h, t: c.t, a: cA });
    naamBij(ctx, 'chihuahua', null, 1300, 640, q.on('chihuahua') * cA, 'center'); naamBij(ctx, 'wolf', null, 560, 230, q.on('wolf'), 'center');
    const hT = q.at('honden'), hd = E6.gang(t, hT - 1.6, hT + 0.2, 1640, E6.S.herder, 5.4, 0.9, -1); if (t > hT - 1.6) hond(ctx, 'herder', hd.x, 820, 5.4, { kijk: -1, houding: hd.h, t: hd.t });
    naamBij(ctx, 'hond', null, 1640, 400, q.on('honden'), 'center');
    E6.stippel(ctx, 900, 600, 1420, 600, q.on('samen', 1, 0.8));
    const pup = q.on('jongen', 1, 0.3); if (pup > 0.01) wolf(ctx, 1160, 840, 1.8, { houding: 'zitten', a: pup, kijk: 1, t });
    naamBij(ctx, 'samen vruchtbare jongen', 'één soort: Canis lupus', 1170, 230, q.on('kunnen'), 'center', C.groen);
    evoSchaal(ctx, 'op schaal'); },

  s04(ctx, t, q) { E6.schema(ctx);
    text(ctx, 'soort', 160, 300, fTitel(80), C.text, 'left');
    const W_ = 'een groep individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen'.split(' '), CH = [0, 0, 0, 1, 1, 1, 1, 1, 2, 3, 4, 4], CUE = ['groep', 'natuur', 'vruchtbare', 'nakomelingen', 'kunnen'];
    ctx.font = fTekst(52, 500); const sp = ctx.measureText(' ').width; let x = 160, y = 400; let vx0 = 0, vx1 = 0, vy = 0;
    W_.forEach((w, i) => { ctx.font = fTekst(52, 500); const ww = ctx.measureText(w).width; if (x + ww > 160 + 1600) { x = 160; y += 64; } const a = 0.4 + 0.6 * q.on(CUE[CH[i]], 1, 0.5);
      if (a > 0.01) { ctx.fillStyle = rgba(C.text, a); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(w, x, y); }
      if (w === 'vruchtbare') { vx0 = x; vx1 = x + ww; vy = y; } x += ww + sp; });
    const ul = ramp(t, q.at('vruchtbare') + 0.3, 0.7); if (ul > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(vx0, vy + 14); ctx.lineTo(lerp(vx0, vx1, ul), vy + 14); ctx.stroke(); }
    const g1 = q.on('Hond'), g2 = q.on('hondenras');
    if (g1 > 0.01) text(ctx, 'hond en wolf: één soort', 160, 640, fTekst(40, 600), rgba(C.groen, g1), 'left');
    if (g2 > 0.01) { ctx.font = fTekst(40, 600); const xx = 160 + ctx.measureText('hond en wolf: één soort').width; text(ctx, ' · hondenras ≈ ondersoort in de natuur', xx, 640, fTekst(40, 600), rgba(C.groen, g2), 'left'); }
    wolf(ctx, 300, 850, 1.6, { a: q.on('Hond', 1, 0.3) }); hond(ctx, 'herder', 560, 850, 1.6, { a: q.on('Hond', 1, 0.3), kijk: -1 });
    hond(ctx, 'teckel', 790, 850, 1.6, { a: q.on('hondenras', 1, 0.3) }); hond(ctx, 'chihuahua', 960, 850, 1.6, { a: q.on('hondenras', 1, 0.3), kijk: -1 }); },

  // vraag-alinea: paard en ezel met hun muilezel (de vraagkaart volgt)
  s05(ctx, t, q) { macroNacht(ctx, { horizon: 560 }); const s = 2.3;
    const p = E6.gang(t, 0, 1.2, 330, E6.S.paard, s, 1.2); paard(ctx, p.x, 700, s, { houding: p.h, t: p.t });
    const e = E6.gang(t, 0.6, 2.0, 1600, E6.S.ezel, s, 1.4, -1); ezel(ctx, e.x, 700, s, { kijk: -1, houding: e.h, t: e.t });
    muilezel(ctx, 960, 760, s, { a: q.on('muilezel', 1, 0.3), kopHoek: 0.04 * Math.sin(t) });
    naamBij(ctx, 'paard', null, 330, 270, q.on('paard'), 'center'); naamBij(ctx, 'ezel', null, 1600, 400, q.on('ezel'), 'center');
    naamBij(ctx, 'muilezel', q.on('onvruchtbaar') > 0.5 ? 'gezond, maar onvruchtbaar' : null, 960, 330, q.on('muilezel'), 'center');
    vraagteken(ctx, 960, 200, q.on('soort?', 1, 0.5), 110); },

  s07(ctx, t, q) { macroNacht(ctx, { horizon: 560 }); const s = 2.3;
    paard(ctx, 330, 700, s); ezel(ctx, 1600, 700, s, { kijk: -1 }); muilezel(ctx, 960, 760, s, { kopHoek: 0.04 * Math.sin(t) });
    naamBij(ctx, 'paard', q.on('twee') > 0.5 ? 'soort 1' : null, 330, 270, 1, 'center'); naamBij(ctx, 'ezel', q.on('twee') > 0.5 ? 'soort 2' : null, 1600, 400, 1, 'center');
    naamBij(ctx, 'hybride', null, 960, 330, q.on('hybride'), 'center', C.goud);
    E6.pijl(ctx, 960, 790, 960, 860, ramp(t, q.at('onvruchtbaar'), 0.7)); E6.kruis(ctx, 960, 865, 35, ramp(t, q.at('onvruchtbaar') + 0.7, 0.5), 6); },

  s08(ctx, t, q) { E6.schema(ctx);
    text(ctx, 'paard 64', 160, 200, fTekst(44, 700), rgba('#A392D6', q.on('vierenzestig')), 'left'); text(ctx, '+', 470, 200, fTekst(44, 700), rgba(C.text2, q.on('tweeënzestig')), 'left');
    text(ctx, 'ezel 62', 520, 200, fTekst(44, 700), rgba('#8C7BBF', q.on('tweeënzestig')), 'left'); text(ctx, '→ muilezel 63', 820, 200, fTekst(44, 700), rgba(C.text, q.on('drieënzestig')), 'left');
    metaText(ctx, 'meiose: chromosomen zoeken hun partner', 160, 300, rgba(C.grain, q.on('meiose')), 'left', 26);
    const SET = [[150, 150, true], [130, 128, true], [120, 100, false], [100, 95, true], [90, 70, false], [80, 80, true], [70, null, false]];
    const aL = q.on('vierenzestig'), aD = q.on('tweeënzestig'), pr = q.on('paren', 1, 1.6), y = 560;
    SET.forEach(([l1, l2, past], i) => { const xx = 200 + i * 150;
      chromosoom(ctx, lerp(xx - 30 + (hash(i) - 0.5) * 60, xx, pr), lerp(y - 80 + hash(i + 3) * 60, y, pr), l1, '#A392D6', aL);
      if (l2) { const fx = xx + 26 + (past ? 0 : 12), fy = y + (past ? 0 : 18); chromosoom(ctx, lerp(xx + 70 + (hash(i + 9) - 0.5) * 60, fx, pr), lerp(y + 90 + hash(i + 5) * 50, fy, pr), l2, '#5A4A8A', aD); }
      const ring = q.on('passen', 1, 0.6); if (!past && ring > 0.01) { ctx.save(); ctx.globalAlpha = ring; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(xx + 20, y + 8, 56, 92, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } });
    naamBij(ctx, 'paart niet', null, 200 + 2 * 150 + 20, 715, q.on('passen'), 'center', C.koraal); naamBij(ctx, 'geen partner', null, 200 + 6 * 150 + 10, 715, q.on('passen'), 'center', C.koraal);
    haak(ctx, 160, 1180, 770, 'bijna geen werkende geslachtscellen', C.koraal, q.on('bijna'));
    metaText(ctx, 'licht: paard · donker: ezel', 1240, 420, rgba(C.grain, aD), 'left', 24); metaText(ctx, 'schematisch · 7 van de 63', 1240, 470, rgba(C.text2, q.on('drieënzestig')), 'left', 24); },

  s09(ctx, t, q) { E6.schema(ctx);
    const rij = (r, t0) => { const y = 330 + r * 190, a = ramp(t, t0, 0.3); if (a <= 0.01) return; paard(ctx, 230, y, 0.75, { a }); text(ctx, '×', 420, y - 50, fTekst(48, 700), rgba(C.text2, a), 'center'); ezel(ctx, 570, y, 0.75, { a });
      E6.pijl(ctx, 700, y - 60, 820, y - 60, ramp(t, t0 + 0.4, 0.5), C.line, 3); muilezel(ctx, 950, y, 0.75, { a: ramp(t, t0 + 0.8, 0.3) }); };
    rij(0, 0); rij(1, q.at('Nee')); rij(2, q.at('groep'));
    const fl = q.on('opnieuw', 1, 0.4) * (1 - ramp(t, q.at('paard') + 0.4, 0.6)); if (fl > 0.01) for (let r = 0; r < 3; r++) { ctx.save(); ctx.globalAlpha = fl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(950, 330 + r * 190 - 60, 80, 0, 6.283); ctx.stroke(); ctx.restore(); }
    E6.pijl(ctx, 1080, 520, 1260, 520, ramp(t, q.at('voortplant') - 0.2, 0.5)); E6.kruis(ctx, 1350, 520, 50, ramp(t, q.at('voortplant') + 0.3, 0.5));
    naamBij(ctx, 'geen soort', q.on('opnieuw') > 0.5 ? 'elke muilezel: opnieuw paard × ezel' : null, 1450, 680, q.on('Nee'), 'center', C.koraal); },

  // ---------------- H2 Eén pot wordt twee
  s10(ctx, t, q) { E6.schema(ctx);
    const a0 = q.at('populatie'), tr = q.on('trekken', 1, 1.5);
    const st = E6.st0.map((d, i) => { const [x, y] = E6.zwerf(i, t, 1, tr); return [x, y, d[2], ramp(t, a0 + i * 0.06, 0.3)]; });
    E6.kaart(ctx, 160, 200, 900, 560, { stippen: st }); naamBij(ctx, 'één populatie', null, 610, 850, q.on('populatie'), 'center');
    pot(ctx, 1460, 720, 1.4, { p: 0.55, n: 90, seed: 5, label: 'één genenpool', a: q.on('Zo', 1, 0.6) });
    const f0 = q.at('allelen'); for (let k = 0; k < 10; k++) { const u = (t - f0 - k * 0.45) / 1.3; if (u <= 0 || u >= 1) continue; const d = st[(k * 5) % 18];
      const sx = 160 + d[0] * 900, sy = 200 + d[1] * 560, ex = 1400 + (k % 4) * 40, ey = 470; populatieStip(ctx, lerp(sx, ex, ease(u)), lerp(sy, ey, ease(u)) - Math.sin(u * Math.PI) * 120, 11, d[2], 1 - ramp(u, 0.85, 0.15)); }
    allelBalk(ctx, 1280, 160, 360, 0.55, { procent: false, a: q.on('genenstroom') }); metaText(ctx, 'genenstroom: allelen gaan heen en weer', 1460, 250, rgba(C.grain, q.on('genenstroom')), 'center', 24); },

  s11(ctx, t, q) { E6.schema(ctx);
    const mx = lerp(160, 510, ramp(t, 0, 1.4)), out = 1 - ramp(t, 0, 0.7);
    pot(ctx, 1460, 720, 1.4, { p: 0.55, n: 90, seed: 5, label: 'één genenpool', a: out });
    const r0 = q.at('rivier'), len = ramp(t, r0, 1.6), w = lerp(0.3, 1, ramp(t, r0 + 1, 1.5)), sp = q.on('ene', 1, 1.6);
    const st = E6.st0.map((d, i) => { const [x, y] = E6.zwerf(i, t + 8, 1, 1 - ramp(t, r0 - 0.5, 1.2)); const [kx, ky] = E6.kant(i); const x0 = d[0] < 0.5 ? Math.min(x, 0.44) : Math.max(x, 0.56);
      return [lerp(t > r0 ? x0 : x, kx + 0.02 * Math.sin(t * 0.5 + i), sp), lerp(y, ky, sp), d[2]]; });
    E6.kaart(ctx, mx, 200, 900, 560, { riv: w, len, stippen: st });
    naamBij(ctx, 'barrière', q.on('rivier') > 0.5 ? 'rivier' : null, mx + 500, 160, q.on('barrière'), 'center', '#9CCBE3');
    const ic = (i, cue, teken, lab) => { const a = q.on(cue, 1, 0.4) * (1 - q.on('dieren', 1, 0.6)); if (a <= 0.01) return; const y = 330 + i * 190; ctx.save(); ctx.globalAlpha = a; teken(1680, y); ctx.restore(); metaText(ctx, lab, 1680, y + 70, rgba(C.grain, a), 'center', 24); };
    ic(0, 'zee', (x, y) => { ctx.strokeStyle = C.water; ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let j = 0; j <= 20; j++) { const xx = x - 80 + j * 8, yy = y + k * 24 + Math.sin(j * 0.8 + t * 2) * 8; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }, 'zee stijgt');
    ic(1, 'bergrug', (x, y) => { vul(ctx, [[x - 90, y + 30], [x - 30, y - 50], [x + 10, y], [x + 40, y - 30], [x + 90, y + 30]], C.berg); vul(ctx, [[x - 45, y - 28], [x - 30, y - 50], [x - 15, y - 28]], C.bergTop); }, 'bergrug');
    ic(2, 'woestijn', (x, y) => { vul(ctx, [[x - 90, y + 30], [x - 40, y - 10], [x + 10, y + 10], [x + 50, y - 20], [x + 90, y + 30]], '#C9A35C'); }, 'woestijn');
    naamBij(ctx, 'geografische isolatie', null, 960, 850, q.on('geografische'), 'center'); },

  s12(ctx, t, q) { macroNacht(ctx, { horizon: 440 });
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.moveTo(880, 440); ctx.quadraticCurveTo(960, 650, 840, H); ctx.lineTo(1080, H); ctx.quadraticCurveTo(1180, 650, 1000, 440); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = rgba('#9CCBE3', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 5; k++) { const y = 480 + E6.fr(t * 0.12 + k / 5) * 380; ctx.beginPath(); ctx.moveTo(950, y); ctx.lineTo(990, y + 14); ctx.stroke(); }
    const m0 = q.at('muis') - 1.8, m = E6.gang(t, m0, m0 + 1.8, 660, E6.S.muis, 14, 0.3);
    muis(ctx, m.x, 760, 14, t > q.at('tegen') ? { houding: 'rechtop' } : { houding: m.h, t: m.t });
    naamBij(ctx, 'muis', q.on('tegen') > 0.5 ? 'kan niet over' : null, 640, 590, q.on('muis'), 'center');
    const v0 = q.at('vogel') - 1.4, vu = (t - v0) / 4; if (vu > 0 && vu < 1) zwaluw(ctx, lerp(380, 1560, vu), 300 + Math.sin(vu * 6) * 12, 14, { t: 0.62 + 0.36 * E6.fr(t * 0.35) });
    naamBij(ctx, 'vogel', 'vliegt eroverheen', 960, 180, q.on('vogel') * (1 - ramp(t, v0 + 3.4, 0.5)), 'center');
    ctx.fillStyle = '#4A4A4A'; ctx.fillRect(1240, 820, 680, 70); ctx.fillStyle = '#E6E0D4'; for (let i = 0; i < 6; i++) ctx.fillRect(1270 + i * 110, 850, 60, 8);
    const sx = lerp(1380, 1500, clamp(t / q.at('weg'), 0, 1)); slak(ctx, sx, 818, 20, { t: Math.min(t, q.at('weg')) });
    naamBij(ctx, 'slak', 'weg is al een barrière', 1520, 660, q.on('slak'), 'center'); },

  // vraag-alinea: de rivier blijft liggen; de generaties tellen op
  s13(ctx, t, q) { E6.schema(ctx);
    const st = E6.st0.map((d, i) => { const [kx, ky] = E6.kant(i); return [kx + 0.02 * Math.sin(t * 0.5 + i), ky + 0.02 * Math.sin(t * 0.4 + i * 2), d[2]]; });
    E6.kaart(ctx, 510, 200, 900, 560, { riv: 1, stippen: st });
    const g = Math.round(lerp(0, 3000, ramp(t, q.at('generaties'), 2.4)) / 50) * 50;
    metaText(ctx, 'generatie ' + E6.getal(g), 960, 850, rgba(C.text2, q.on('generaties')), 'center', 30);
    vraagteken(ctx, 960 - 230, 160, q.on('genenpools', 1, 0.5), 90); vraagteken(ctx, 960 + 230, 160, q.on('genenpools', 1, 0.5), 90); },

  s15(ctx, t, q) { E6.schema(ctx);
    const sp = q.on('potten', 1, 1.2), sel = ramp(t, q.at('selectiedruk'), 6.5);
    const pL = 0.55 + 0.17 * sel, pR = 0.55 - 0.25 * sel, mL = q.on('mutaties', 1, 0.3) > 0.5 ? [[EVO.kracht.mutatie, 2]] : null, mR = t > q.at('mutaties') + 0.6 ? [[EVO.kracht.mutatie, 2]] : null;
    pot(ctx, lerp(960, 520, sp), 680, 1.35, { p: pL, n: 85, seed: 3, extra: mL, label: sp > 0.9 ? 'links' : null });
    if (sp > 0.01) pot(ctx, lerp(960, 1400, sp), 680, 1.35, { p: pR, n: 85, seed: 8, extra: mR, label: sp > 0.9 ? 'rechts' : null });
    const rv = ramp(t, q.at('potten') + 0.6, 1.0); if (rv > 0.01) { ctx.strokeStyle = C.water; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(960, 200); ctx.quadraticCurveTo(990, lerp(200, 500, rv), 960 - 10 * rv, lerp(200, 820, rv)); ctx.stroke(); }
    metaText(ctx, 'geen genenstroom meer', 960, 170, rgba(C.grain, q.on('stopt')), 'center', 26);
    E6.sneeuw(ctx, 520, 225, 30, q.on('kouder')); E6.dobbel(ctx, 250, 470, 26, t * 0.8, 1 + Math.floor(E6.fr(t * 0.7) * 6), q.on('toeval')); E6.dobbel(ctx, 1670, 470, 26, -t * 0.8, 1 + Math.floor(E6.fr(t * 0.7 + 0.5) * 6), q.on('toeval'));
    const parts = [['eigen mutaties', 'mutaties'], [' · eigen selectie', 'selectiedruk'], [' · eigen toeval', 'toeval']]; ctx.font = fTekst(38, 600); const tw = parts.reduce((s, p) => s + ctx.measureText(p[0]).width, 0); let x = 960 - tw / 2;
    for (const [s, c] of parts) { text(ctx, s, x, 860, fTekst(38, 600), rgba(C.text, q.on(c)), 'left'); ctx.font = fTekst(38, 600); x += ctx.measureText(s).width; } },

  s16(ctx, t, q) { E6.schema(ctx);
    text(ctx, 'links', 820, 200, fTekst(40, 600), C.text, 'center'); text(ctx, 'rechts', 1480, 200, fTekst(40, 600), C.text, 'center');
    const f = (g) => Math.log(1 + g / 100) / Math.log(51), P1 = (g) => 0.55 + 0.30 * f(g), P2 = (g) => 0.55 - 0.37 * f(g);
    const tA = q.at('lopen'), tB = q.at('Eerst'), tC = q.at('groot');
    const g = t < tB ? 500 * ease(clamp((t - tA) / (tB - tA), 0, 1)) : 500 + 4500 * ease(clamp((t - tB - 0.3) / (tC - tB - 0.3), 0, 1));
    const row = (i, gg, lab, a = 1) => { if (a <= 0.01) return; const y = 260 + i * 200; metaText(ctx, lab, 160, y + 28, rgba(C.text2, a), 'left', 26); allelBalk(ctx, 560, y, 520, P1(gg), { procent: false, a }); allelBalk(ctx, 1220, y, 520, P2(gg), { procent: false, a }); };
    const rnd = (v) => Math.round(v / 50) * 50;
    row(0, 0, 'generatie 0'); row(1, Math.min(g, 500), 'generatie ' + rnd(Math.min(g, 500)), ramp(t, tA - 0.4, 0.4)); if (t > tB) row(2, g, 'generatie ' + E6.getal(rnd(g)), ramp(t, tB, 0.4));
    haak(ctx, 560, 1740, 720, 'divergente evolutie', C.groen, q.on('divergente')); },

  s17(ctx, t, q) { macroNacht(ctx, { horizon: 600 });
    for (let i = 0; i < 9; i++) { const x = 40 + i * 70; vul(ctx, [[x, 640], [x + 40, 420 + (i % 3) * 30], [x + 80, 640]], '#2E4A38'); }
    const w = E6.gang(t, 0, 2.2, 520, E6.S.wolf, 3.0, 1.1); wolf(ctx, w.x, 870, 3.0, { houding: w.h, t: w.t });
    persoon(ctx, 'gerrit', 1680, 880, 530, { kijk: -1, t }); hond(ctx, 'herder', 1330, 870, 3.0, { kijk: -1, houding: 'zitten', t });
    metaText(ctx, 'al minstens 15 000 jaar elk een eigen weg', 960, 250, rgba(C.text2, q.on('vijftienduizend')), 'center', 26);
    E6.stippel(ctx, 760, 660, 1160, 660, q.on('tegenkomen', 1, 0.8));
    const pup = q.on('jongen', 1, 0.3); if (pup > 0.01) wolf(ctx, 960, 875, 1.5, { houding: 'zitten', a: pup, t });
    naamBij(ctx, 'nog genenstroom', q.on('genenpools') > 0.5 ? 'nog één soort' : null, 960, 420, q.on('genenstroom'), 'center', C.groen); },

  // ---------------- H3 Wanneer is het echt een tweede soort?
  s18(ctx, t, q) { E6.schema(ctx);
    const mix = q.on('tegen', 1, 2.2), riv = lerp(1, 0.0, q.on('verdwijnt', 1, 1.4));
    const st = []; for (let i = 0; i < 22; i++) { const kf = [0.12 + hash(i * 3) * 0.76, 0.15 + hash(i * 3 + 1) * 0.7], x0 = (i % 2 ? 0.12 : 0.58) + hash(i * 3) * 0.3;
      st.push([lerp(x0, kf[0], mix) + 0.012 * Math.sin(t * 0.6 + i), kf[1] + 0.012 * Math.sin(t * 0.5 + i * 2), i % 2 ? EVO.a1 : EVO.a2]); }
    E6.kaart(ctx, 510, 200, 900, 560, { riv, stippen: st });
    naamBij(ctx, 'samen, maar paren ze nog?', null, 960, 850, q.on('Zijn') * (1 - q.on('reproductieve', 1, 0.4)), 'center');
    naamBij(ctx, 'reproductieve isolatie', 'geen vruchtbare jongen meer', 960, 830, q.on('reproductieve', 1, 0.5), 'center', C.groen);
    const pa = q.on('vruchtbare', 1, 0.5) * (1 - q.on('reproductieve', 1, 0.5)); if (pa > 0.01) { ctx.save(); ctx.globalAlpha = pa; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(960, 470, 70, 0, 6.283); ctx.stroke(); ctx.restore(); populatieStip(ctx, 935, 470, 13, EVO.a1, pa); populatieStip(ctx, 985, 470, 13, EVO.a2, pa); vraagteken(ctx, 960, 380, pa, 70); } },

  s19(ctx, t, q) { E6.schema(ctx); text(ctx, 'vóór de bevruchting', 140, 200, fTekst(48, 700), rgba(C.text, q.on('bevruchting')), 'left');
    const w = 390, y = 260, h = 470, aan = [q.on('moment'), q.on('plek'), q.on('balts'), q.on('geslachtsorganen')];
    const tg = (i, x, titel, sub, fn) => _tegel(ctx, x, y, w, h, titel, sub, fn, 0.25 + 0.75 * aan[i]);
    tg(0, 140, 'tijd', 'ander moment', (cx, cy) => { circ(ctx, cx, cy, 90, rgba(C.fill, 0.8), C.line, 3); const an = -Math.PI / 2 + ramp(t, q.at('moment'), 3) * 6.283 * 1.25; ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * 66, cy + Math.sin(an) * 66); ctx.moveTo(cx, cy); ctx.lineTo(cx + 46, cy + 10); ctx.stroke(); });
    tg(1, 560, 'plek', 'andere plek', (cx, cy) => { ctx.fillStyle = C.water; ctx.beginPath(); ctx.ellipse(cx + 50, cy + 50, 90, 34, 0, 0, 6.283); ctx.fill(); const z = 0.04 * Math.sin(t * 1.2) * aan[1];
      ctx.save(); ctx.translate(cx - 80, cy + 60); ctx.rotate(z); vul(ctx, [[-40, 0], [0, -160], [40, 0]], '#5FA86E'); ctx.restore(); });
    tg(2, 980, 'gedrag', 'ander lied of balts', (cx, cy) => { const b = -Math.abs(Math.sin(t * 3)) * 16 * aan[2]; ctx.save(); ctx.translate(0, b); ctx.fillStyle = C.text; ctx.beginPath(); ctx.ellipse(cx - 30, cy + 50, 30, 22, -0.4, 0, 6.283); ctx.fill(); ctx.fillRect(cx - 4, cy - 90, 8, 140);
      ctx.beginPath(); ctx.moveTo(cx + 4, cy - 90); ctx.quadraticCurveTo(cx + 60, cy - 60, cx + 50, cy - 10); ctx.lineWidth = 8; ctx.strokeStyle = C.text; ctx.stroke(); ctx.restore(); });
    tg(3, 1400, 'bouw', 'past niet op elkaar', (cx, cy) => { roundRect(ctx, cx - 80, cy - 50, 90, 110, 16); shape(ctx, rgba(C.goud, 0.2), C.goud, 4); circ(ctx, cx - 35, cy, 14, C.bgSchema);
      const tp = t - q.at('passen'), dx = 30 * (1 - ease(clamp(tp / 0.8, 0, 1))) + 6 * Math.sin(Math.max(0, tp - 0.8) * 9) * Math.exp(-Math.max(0, tp - 0.8) * 2);
      ctx.save(); ctx.translate(dx, 0); ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx + 30, cy); ctx.lineTo(cx + 110, cy); ctx.moveTo(cx + 90, cy); ctx.lineTo(cx + 90, cy + 26); ctx.stroke(); circ(ctx, cx + 30, cy, 22, null, C.line, 8); ctx.restore(); }); },

  s20(ctx, t, q) { E6.schema(ctx); text(ctx, 'ná de bevruchting', 140, 200, fTekst(48, 700), rgba(C.text, q.on('ná')), 'left');
    const ta = q.on('ontstaat', 1, 0.5), m0 = q.at('jong') - 0.3, m = E6.gang(t, m0, m0 + 2.2, 840, E6.S.muilezel, 1.55, 1.1);
    _tegel(ctx, 140, 260, 1640, 520, 'het jong sterft jong of is onvruchtbaar', q.on('muilezel') > 0.5 ? 'zoals de muilezel' : null, (cx, cy) => {
      muilezel(ctx, m.x, cy + 170, 1.55, { houding: m.h, t: m.t, a: ramp(t, m0, 0.3) });
      E6.pijl(ctx, cx + 180, cy, cx + 400, cy, ramp(t, q.at('onvruchtbaar'), 0.6), C.line, 5); E6.kruis(ctx, cx + 470, cy, 40, ramp(t, q.at('onvruchtbaar') + 0.6, 0.5)); }, ta);
    metaText(ctx, 'geen genenstroom', 960, 850, rgba(C.koraal, q.on('gen', 1, 0.4)), 'center', 28); },

  // vraag-alinea: twee kikkersoorten in één vijver
  s21(ctx, t, q) { E6.schema(ctx);
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.ellipse(960, 470, 640, 170, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba('#9CCBE3', 0.4); ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { const f = E6.fr(t * 0.25 + k / 3); ctx.save(); ctx.globalAlpha = 1 - f; ctx.beginPath(); ctx.ellipse(960, 460, 80 + f * 300, 20 + f * 80, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'dezelfde vijver', null, 960, 260, q.on('vijver'), 'center');
    const f1 = q.on('kikkersoorten', 1, 0.3), f2 = clamp(f1 * 2 - 0.3, 0, 1);
    kikker(ctx, 720, 740, 22, { kleur: '#7E8A4E', a: f1 }); kikker(ctx, 1200, 740, 22, { kleur: '#8C6A3E', kijk: -1, a: f2 });
    E6.geluid(ctx, 820, 640, t, q.on('april') * (1 - q.on('juni')), EVO.a1R); E6.geluid(ctx, 1100, 640, t, q.on('juni'), EVO.a2R);
    tag(ctx, 'april', 720, 600, EVO.a1, q.on('april')); tag(ctx, 'juni', 1200, 600, EVO.a2, q.on('juni'));
    vraagteken(ctx, 960, 200, q.on('dit?', 1, 0.5), 100); },

  s23(ctx, t, q) { E6.schema(ctx);
    const M = ['maart', 'april', 'mei', 'juni', 'juli']; const x0 = 260, mw = 280;
    const pv = 1; ctx.fillStyle = C.water; ctx.beginPath(); ctx.ellipse(960, lerp(470, 300, pv), lerp(640, 520, pv), lerp(170, 90, pv), 0, 0, 6.283); ctx.fill(); naamBij(ctx, 'dezelfde vijver', null, 960, lerp(260, 210, pv), 1, 'center');
    M.forEach((m, i) => E6.maand(ctx, x0 + i * mw, 600, mw - 10, m, ramp(t, q.at('paart') - 0.4 + i * 0.12, 0.4), i === 1 && q.on('april') > 0.01 ? rgba(EVO.a1, q.on('april')) : i === 3 && q.on('juni') > 0.01 ? rgba(EVO.a2, q.on('juni')) : null));
    const hop = (xa, ya, xb, yb, t0, kleur, kijk) => { const u = clamp((t - t0) / 0.7, 0, 1), x = lerp(xa, xb, u), y = lerp(ya, yb, u) - Math.sin(u * Math.PI) * 120; kikker(ctx, x, y, 22, { kleur, kijk, houding: u > 0 && u < 1 ? 'springen' : 'zitten' }); };
    hop(800, 510, x0 + mw + 135, 560, q.at('april') - 0.3, '#7E8A4E', -1); hop(1120, 510, x0 + 3 * mw + 135, 560, q.at('juni') - 0.3, '#8C6A3E', 1);
    naamBij(ctx, 'soort 1 paart', q.on('klaar') > 0.5 ? 'al klaar' : null, x0 + mw + 135, 760, q.on('april'), 'center', EVO.a1R); naamBij(ctx, 'soort 2 paart', null, x0 + 3 * mw + 135, 760, q.on('juni'), 'center', EVO.a2R);
    E6.geluid(ctx, x0 + 3 * mw + 190, 480, t, q.on('roepen'), EVO.a2R);
    const ti = q.on('tijd', 1, 0.6) * (1 - q.on('vrouwtjes')); if (ti > 0.01) metaText(ctx, 'scheiding in de tijd', 960, 860, rgba(C.goud, ti), 'center', 26);
    E6.kruis(ctx, x0 + 2 * mw + 135, 520, 30, ramp(t, q.at('bevruchting') - 0.4, 0.5), 5); },

  s24(ctx, t, q) { E6.schema(ctx);
    const st = [['barrière', 'genenstroom stopt', 'barrière'], ['verschillen', 'mutatie, selectie, toeval', 'verschillen'], ['reproductieve isolatie', 'twee soorten', 'reproductieve']];
    st.forEach(([tt, m, c], i) => { const x = 200 + i * 560, a = q.on(c, 1, 0.5); if (a > 0.01) { ctx.save(); ctx.globalAlpha = a; roundRect(ctx, x, 230, 480, 120, 16); shape(ctx, rgba(C.fill, 0.7), i === 2 ? C.groen : C.line, i === 2 ? 2 + 2 * q.on('twee') : 2);
      text(ctx, tt, x + 240, 285, fTekst(40, 700), C.text, 'center'); metaText(ctx, m, x + 240, 325, C.grain, 'center', 24); ctx.restore(); } if (i < 2) E6.pijl(ctx, x + 490, 290, x + 550, 290, ramp(t, q.at(st[i + 1][2]) - 0.5, 0.5)); });
    pot(ctx, 440, 760, 0.9, { p: 0.55, n: 60, seed: 2, a: q.on('barrière') });
    const d = ramp(t, q.at('opstapelen'), 2.5), a2 = q.on('verschillen'); pot(ctx, 920, 760, 0.75, { p: 0.55 + 0.2 * d, n: 45, seed: 3, a: a2 }); pot(ctx, 1120, 760, 0.75, { p: 0.55 - 0.2 * d, n: 45, seed: 4, a: a2 });
    const a3 = q.on('reproductieve'); pot(ctx, 1500, 760, 0.75, { p: 0.92, n: 45, seed: 5, a: a3 }); pot(ctx, 1700, 760, 0.75, { p: 0.1, n: 45, seed: 6, a: a3 });
    const gl = ramp(t, q.at('isolatie') + 0.2, 0.8); if (gl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1600, 520); ctx.lineTo(1600, lerp(520, 780, gl)); ctx.stroke(); }
    if (q.on('tienduizenden') > 0.01) metaText(ctx, 'meestal tienduizenden generaties of meer', 80, 880, rgba(C.text2, q.on('tienduizenden')), 'left', 26); },

  // ---------------- H4 Zonder barrière (vwo)
  s25(ctx, t, q) { E6.schema(ctx);
    const L = [[0.25, 0.4, EVO.a1], [0.3, 0.62, EVO.a1], [0.2, 0.55, EVO.a1], [0.72, 0.38, EVO.a2], [0.78, 0.6, EVO.a2], [0.68, 0.52, EVO.a2]].map(([x, y, k], i) => [x + 0.02 * Math.sin(t * 0.6 + i), y + 0.02 * Math.sin(t * 0.5 + i * 2), k]);
    E6.kaart(ctx, 140, 260, 760, 480, { riv: 1, stippen: L });
    naamBij(ctx, 'allopatrisch', q.on('gescheiden') > 0.5 ? 'gescheiden plaatsen' : null, 520, 840, q.on('allopatrische'), 'center');
    const ma = q.on('dezelfde', 1, 0.6); if (ma > 0.01) { ctx.save(); ctx.globalAlpha = ma; vul(ctx, [[1080, 420], [1300, 290], [1600, 300], [1800, 450], [1760, 680], [1480, 760], [1180, 700]], '#2E5A8A', '#5BA4C9', 2.5); ctx.restore();
      for (let i = 0; i < 10; i++) { const x = 1200 + hash(i * 7) * 520 + 40 * Math.sin(t * 0.35 + i * 1.9), y = 380 + hash(i * 7 + 2) * 300 + 25 * Math.sin(t * 0.3 + i); populatieStip(ctx, x, y, 11, i % 2 ? EVO.a1 : EVO.a2, ramp(t, q.at('dezelfde') + 0.3 + i * 0.08, 0.3)); } }
    naamBij(ctx, 'sympatrisch', q.on('sympatrische') > 0.5 ? 'dezelfde plaats' : null, 1460, 840, q.on('sympatrische'), 'center'); },

  s26(ctx, t, q) { macroNacht(ctx, { horizon: 480, heuvel: false });
    const vol = q.on('liep', 1, 2.2), top = lerp(780, 480, vol);
    ctx.fillStyle = '#4A3E30'; ctx.fillRect(0, 480, W, CAPTION_Y - 480); ctx.fillStyle = '#1F4466'; ctx.fillRect(0, top, W, CAPTION_Y - top);
    vul(ctx, [[-40, 480], [300, 440], [700, 470], [1100, 430], [1500, 460], [1960, 440], [1960, 490], [-40, 490]], '#2F4A3A');
    metaText(ctx, 'bijna droog', 960, 700, rgba(C.text2, q.on('Rond') * (1 - q.on('liep'))), 'center', 26);
    ctx.save(); ctx.beginPath(); ctx.rect(0, top + 20, W, CAPTION_Y - top - 20); ctx.clip();
    const v = ['blauw', 'rood', 'vrouw', 'blauw', 'rood', 'blauw', 'vrouw', 'rood', 'blauw', 'rood'];
    v.forEach((k, i) => { const a = ramp(t, q.at('Sindsdien') + i * 0.3, 0.5); if (a <= 0.01) return; const kijk = i % 2 ? -1 : 1, sp = 35 + 10 * hash(i);
      const x = 100 + ((200 + i * 170 + (i % 2) * 40 - 100 + kijk * sp * t) % 1720 + 1720) % 1720, ed = Math.min(1, (x - 100) / 80, (1820 - x) / 80);
      E6.vis(ctx, x, 600 + (i % 3) * 90, 1.1, k, t, { kijk, a: a * clamp(ed, 0, 1), f: i * 0.13 }); });
    ctx.restore();
    naamBij(ctx, 'Victoriameer', q.on('vijfhonderd') > 0.5 ? '±500 soorten cichliden · in ±15 000 jaar' : null, 960, 360, q.on('Victoriameer'), 'center'); },

  s27(ctx, t, q) { E6.schema(ctx);
    const u = q.on('ondiep', 1, 1.0), d = q.on('dieper', 1, 1.0);
    ctx.fillStyle = _mixHex('#2A4560', '#2C5A86', u); ctx.fillRect(0, 160, W, 300); ctx.fillStyle = _mixHex('#2A4560', '#5A3A4A', d); ctx.fillRect(0, 460, W, 380);
    const zw = (x0, x1, y, t0, vorm, f) => { if (t < t0) return; const uu = ease(clamp((t - t0) / 2.4, 0, 1)); E6.vis(ctx, lerp(x0, x1, uu), y, 3.2, vorm, t * (1 + (1 - uu) * 0.8), { f }); };
    zw(-250, 720, 320, 0.2, 'blauw', 0.1); zw(-250, 1200, 640, 1.0, 'rood', 0.35);
    naamBij(ctx, 'Pundamilia pundamilia', q.on('ondiep') > 0.5 ? 'ondiep · blauw licht' : null, 1060, 260, q.on('blauw'), 'left');
    naamBij(ctx, 'Pundamilia nyererei', q.on('dieper') > 0.5 ? 'dieper · vooral rood licht' : null, 840, 580, q.on('rood'), 'right');
    metaText(ctx, 'ondiep', 1820, 200, rgba(C.text2, u), 'right', 26); metaText(ctx, 'dieper', 1820, 820, rgba(C.text2, d), 'right', 26); },

  // vraag-alinea: geen muur in het water, toch twee kleuren apart
  s28(ctx, t, q) { E6.schema(ctx);
    ctx.fillStyle = '#2C5A86'; ctx.fillRect(0, 160, W, 300); ctx.fillStyle = '#5A3A4A'; ctx.fillRect(0, 460, W, 380);
    E6.vis(ctx, 720 + 30 * Math.sin(t * 0.4), 320, 3.2, 'blauw', t, { f: 0.1 }); E6.vis(ctx, 1200 - 30 * Math.sin(t * 0.35), 640, 3.2, 'rood', t, { f: 0.35 });
    const m = q.on('muur', 1, 0.5) * (1 - q.on('Hoe', 1, 0.8)); if (m > 0.01) { ctx.save(); ctx.globalAlpha = m; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.setLineDash([16, 12]); ctx.strokeRect(940, 180, 40, 640); ctx.restore(); E6.kruis(ctx, 960, 500, 40, m, 6); }
    vraagteken(ctx, 960, 520, q.on('blijven', 1, 0.5), 120); },

  s30(ctx, t, q) { E6.schema(ctx);
    ctx.fillStyle = '#2C5A86'; ctx.fillRect(0, 160, W, 300); ctx.fillStyle = '#5A3A4A'; ctx.fillRect(0, 460, W, 380);
    const lb = q.on('licht', 1, 0.6); if (lb > 0.01) { ctx.save(); ctx.globalAlpha = lb; const gr = ctx.createLinearGradient(0, 180, 0, 820); gr.addColorStop(0, '#5BA4E0'); gr.addColorStop(0.4, '#7A86C0'); gr.addColorStop(1, '#D0503A'); roundRect(ctx, 1840, 180, 30, 640, 15); ctx.fillStyle = gr; ctx.fill(); ctx.restore(); metaText(ctx, 'blauw licht', 1820, 215, rgba('#9CCBE3', lb), 'right', 22); metaText(ctx, 'rood licht', 1820, 810, rgba('#E8907A', lb), 'right', 22); }
    E6.vis(ctx, 520, 360, 2.4, 'blauw', t, { a: lerp(1, 0.45, q.on('kiezen', 1, 1.0)), f: 0.2 }); E6.vis(ctx, 1400, 640, 2.6, 'rood', t, { f: 0.05 });
    const f0 = q.at('vrouwtjes'), uu = ease(clamp((t - f0) / (q.at('kleur') - f0), 0, 1)), fx = lerp(-150, 1000, uu), fy = lerp(420, 580, ease(clamp((t - q.at('Diep')) / 2.5, 0, 1)));
    const tr = q.on('troebel', 1, 1.2), tw = Math.sin(Math.max(0, t - q.at('troebel')) * 0.9);
    E6.vis(ctx, lerp(fx, 900 + 260 * tw, tr), lerp(fy, 470 - 60 * tw, tr), 2.6, 'vrouw', t * (1 + (1 - uu) * 0.6), { f: 0.3, kijk: tr > 0.5 && Math.cos(Math.max(0, t - q.at('troebel')) * 0.9) < 0 ? -1 : 1 });
    const pk = q.on('kleur', 1, 0.6) * (1 - tr); pijl(ctx, 1180, 600, 1260, 620, C.goud, pk, 4); naamBij(ctx, 'vrouwtje kiest rood', 'haar ogen zien rood het best', 1000, 760, pk, 'center', C.goud);
    naamBij(ctx, 'partnerkeuze stopt de genenstroom', null, 960, 230, q.on('partnerkeuze') * (1 - tr), 'center');
    if (tr > 0.01) { ctx.fillStyle = rgba('#6A6448', 0.55 * tr); ctx.fillRect(0, 160, W, 680); naamBij(ctx, 'troebel water', 'kleuren niet te zien · ze kiezen willekeurig', 960, 260, q.on('scheiding', 1, 0.5), 'center'); } },

  s31(ctx, t, q) { E6.schema(ctx);
    const d = q.on('lopen', 1, 1.6); pot(ctx, 600, 700, 1.3, { p: 0.55 + 0.3 * d, n: 80, seed: 2 }); pot(ctx, 1320, 700, 1.3, { p: 0.55 - 0.4 * d, n: 80, seed: 7 });
    const gl = ramp(t, q.at('stopt'), 0.8); if (gl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(960, 300); ctx.lineTo(960, lerp(300, 720, gl)); ctx.stroke(); }
    const aL = q.on('Allopatrisch'), aR = q.on('sympatrisch');
    text(ctx, 'rivier of berg', 600, 260, fTekst(40, 600), rgba(C.text, aL), 'center'); metaText(ctx, 'allopatrisch', 600, 300, rgba(C.grain, aL), 'center', 24);
    text(ctx, 'partnerkeuze', 1320, 260, fTekst(40, 600), rgba(C.text, aR), 'center'); metaText(ctx, 'sympatrisch', 1320, 300, rgba(C.grain, aR), 'center', 24);
    const v = ramp(t, q.at('verschil'), 0.8); if (v > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.globalAlpha = v; for (const [x, w] of [[600, 250], [1320, 230]]) { ctx.beginPath(); ctx.moveTo(x - w / 2, 214); ctx.lineTo(x + w / 2, 214); ctx.stroke(); } ctx.restore(); }
    haak(ctx, 400, 1520, 790, 'in beide gevallen stopt de genenstroom', C.groen, q.on('stopt')); },

  // ---------------- Samenvatting
  s32(ctx, t, q) { E6.schema(ctx);
    const a1 = q.on('soort', 1, 0.5), a2 = q.on('Paard', 1, 0.5), a3 = q.on('nieuwe', 1, 0.5), d = q.on('lopen', 1, 2.0);
    _tegel(ctx, 120, 200, 540, 600, 'soort', 'samen vruchtbare jongen', (cx, cy) => { wolf(ctx, cx - 90, cy + 90, 2.2); hond(ctx, 'teckel', cx + 150, cy + 90, 2.2, { kijk: -1 }); }, a1);
    _tegel(ctx, 690, 200, 540, 600, 'hybride', 'muilezel: onvruchtbaar', (cx, cy) => { muilezel(ctx, cx, cy + 130, 1.3, { kopHoek: 0.04 * Math.sin(t) }); E6.kruis(ctx, cx + 170, cy - 60, 22, q.on('onvruchtbaar', 1, 0.5), 5); }, a2);
    _tegel(ctx, 1260, 200, 540, 600, 'één pot wordt twee', 'genenstroom stopt', (cx, cy) => { pot(ctx, cx - 110, cy + 110, 0.65, { p: 0.55 + 0.25 * d, n: 40, seed: 2 }); pot(ctx, cx + 110, cy + 110, 0.65, { p: 0.55 - 0.35 * d, n: 40, seed: 3 });
      const g = ramp(t, q.at('stopt'), 0.6); if (g > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy - 90); ctx.lineTo(cx, lerp(cy - 90, cy + 120, g)); ctx.stroke(); } }, a3);
  },
});
