// scenes_e1.js — Ecologie v2 · film 1 Hoeveel passen er? — animatie op de stem (29 okt 2026).
// Elke scène bouwt het goedgekeurde keyframe uit sb1.js op in de maat van de stem (q.on). Hulpfuncties: teken_e1.js.
const _S1b = 1.83;
function _e1Twee(ctx, s1, s2, cx, y, font, k1, k2, a1, a2) { ctx.save(); ctx.font = font; const w1 = ctx.measureText(s1).width, w2 = ctx.measureText(s2).width, x0 = cx - (w1 + w2) / 2;
  A1(ctx, a1, () => text(ctx, s1, x0, y, font, k1, 'left')); A1(ctx, a2, () => text(ctx, s2, x0 + w1, y, font, k2, 'left')); ctx.restore(); }
const _e1F = (j) => j <= 2004 ? 128 * Math.pow(220 / 128, (j - 2000) / 4) : (j <= 2019 ? 220 * Math.pow(3500 / 220, (j - 2004) / 15) : 3500 * Math.pow(6000 / 3500, (j - 2019) / 4));
function _e1MwLijn() { const x = 260, y = 800, w = 1200, h = 560, P = []; for (let i = 0; i <= 40; i++) { const u = i / 40, n = 18 / (1 + Math.exp(-(u - 0.3) * 14)) + (u > 0.5 ? Math.sin(u * 30) * 0.6 : 0); P.push([x + u * w, y - n / 20 * h]); } return P; }
// hoogwater-doorsnede (s38/s40): lvl 0 = normale waterlijn (640), 1 = boven de woonkamer (470)
function _e1Hoog(ctx, t, lvl, o = {}) { const { zwem = 0, dimB = 0 } = o; e1Macro(ctx, { horizon: 420, heuvel: false }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 300);
  e1Burcht(ctx, 1100, 640, 0.95, { doorsnede: true, waterW: 2.4, bewoners: (x, y) => ecoBever(ctx, x, y, 0.8, { houding: 'staan', kijk: -1, a: 1 - 0.4 * dimB }) });
  const yt = lerp(640, 470, lvl); if (lvl > 0.01) { ctx.fillStyle = rgba(E1.water, 0.6); ctx.fillRect(0, yt, W, 640 - yt + 1); ctx.strokeStyle = E1.waterL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, yt); ctx.lineTo(W, yt); ctx.stroke(); e1Golf(ctx, 0, W, yt, yt + 60, t, 8); }
  e1Golf(ctx, 0, 560, 650, 840, t, 6);
  A1(ctx, lvl > 0.3 ? 1 : 0, () => metaText(ctx, 'normale waterlijn', 80, 630, C.text2, 'left', 26));
  if (zwem > 0.01) { const ys = yt; A1(ctx, zwem, () => { ecoBever(ctx, 640 - 30 * Math.sin(t * 0.3), ys + lerp(80, 0, zwem), 2.4, { houding: 'zwemmen', water: false, t: t * 1.2, kijk: -1 }); ecoBever(ctx, 800 - 30 * Math.sin(t * 0.3), ys + lerp(90, 0, zwem), 1.3, { houding: 'zwemmen', water: false, t: t * 1.6 + 0.3, kijk: -1 }); }); } }

Object.assign(SCENES, {
  // ---------------- titel: beeld rechts van de titel
  title(ctx, t) { roundRect(ctx, 1320, 300, 540, 560, 24); shape(ctx, rgba(C.bgMacroFront, 0.9)); ecoBever(ctx, 1600, 820, 5.2, { houding: 'knagen', t: t * 0.8 }); },

  // ---------------- Opening
  s01(ctx, t, q) { _e1Sloot(ctx); e1Golf(ctx, 0, W, 664, 740, t);
    const uit = q.on('omgeknaagd', 1, 0.3) > 0.5 ? 'verbaasd' : 'neutraal';
    e1GerritLoop(ctx, t, 0.2, 140, 700, { uit, kijk: 1 });
    A1(ctx, q.on('Twintig', 1, 0.6), () => ecoSchaal(ctx, 'mens 1,80 m · wilgenstam ± 25 cm')); },
  s02(ctx, t, q) { _e1Sloot(ctx); e1Golf(ctx, 0, W, 664, 740, t);
    const bx = 880 + 48 * t, a = ramp(t, 0.1, 0.8);
    A1(ctx, a, () => { _vSpoor(ctx, bx - 90, 690, Math.min(300, 60 + 48 * t)); ecoBever(ctx, bx, 700, _S1b, { houding: 'zwemmen', water: false, t: t * 1.2 }); });
    const d = q.on('Hoeveel', 1, 0.3) > 0.5; persoon(ctx, 'gerrit', 720, 900, 330, { outfit: 'gewoon', uit: d ? 'denkt' : 'neutraal', pose: d ? 'denk' : 'staan', kijk: 1, t });
    naamBij(ctx, 'bever', 'alleen kop en rug boven water', bx + 120, 640, q.on('sloten', 1, 0.6), 'left');
    A1(ctx, q.on('sloten', 1, 0.6), () => ecoSchaal(ctx, 'bever ± 1,2 m met staart')); },

  // ---------------- H1 Wie tel je mee?
  s04(ctx, t, q) { _e1Kreek(ctx); e1Golf(ctx, 0, W, 566, 756, t);
    const a26 = q.on('1826', 1, 0.5) * (1 - q.on('1988', 1, 0.4)); naamBij(ctx, 'het jaar 1826', 'laatste bever in nederland gedood', 1000, 320, a26, 'center'); const tg = q.at('gedood') + 0.4; A1(ctx, a26 * (1 - ramp(t, tg, 0.3)), () => ecoBever(ctx, 700, 830, 2.4, { houding: 'staan' })); kruis(ctx, 700, 790, 30, a26 * ramp(t, tg, 0.3), C.koraal);
    naamBij(ctx, 'het jaar 1988', 'biesbosch · eerste uitzetting', 1000, 320, q.on('1988', 1, 0.5), 'center');
    const ak = q.on('kist', 1, 0.5); e1Kist(ctx, 1180, 860, 2.4, { open: q.on('open', 1, 1.4), a: ak });
    const tb = q.at('bever', 2); if (t > tb) { const ab = ramp(t, tb, 0.3); const v = 24 * 2.4 * E1_BEVERV, L = e1Loop(t, tb + 0.4, 1110, 640, v);
      if (!L.klaar) A1(ctx, ab, () => ecoBever(ctx, L.x, 830, 2.4, { houding: L.loopt ? 'lopen' : 'staan', t: L.s / (24 * 2.4), kijk: -1 }));
      else { const te = tb + 0.4 + 470 / v, u = t - te; ecoBever(ctx, 640 - 60 * u, lerp(780, 700, ease(u / 0.8)), 2.4, { houding: 'zwemmen', water: false, t: u * 1.2, kijk: -1 }); } }
    A1(ctx, ak, () => ecoSchaal(ctx, 'kist ± 1 m'));
    const t42 = q.at('1991'); for (let i = 0; i < 42; i++) A1(ctx, ramp(t, t42 + i * 0.045, 0.25), () => e1Icoon(ctx, 580 + (i % 21) * 40, 165 + Math.floor(i / 21) * 46, 15, { kleur: C.okerD }));
    A1(ctx, q.on('1991', 1, 0.6), () => metaText(ctx, '42 bevers · tot het jaar 1991', 1000, 260, C.goud, 'center', 26)); },
  s05(ctx, t, q) { _e1Kreek(ctx); e1Golf(ctx, 0, W, 566, 756, t);
    const tp = q.at('populatie'); const B = [[260, 800, 1], [600, 812, -1], [1000, 806, 1], [1460, 818, -1]];
    B.forEach(([x, y, k], i) => { const ti = Math.min(tp, 0.4) + i * 0.3; const a = ramp(t, ti, 0.3); if (a <= 0.01) return;
      if (i === 0) A1(ctx, a, () => e1BeverLoop(ctx, t, ti, 100, x, y, 1.6));
      else if (i === 2) A1(ctx, a, () => e1BeverLoop(ctx, t, ti, 860, x, y, 1.6));
      else A1(ctx, a, () => ecoBever(ctx, x, y, 1.6, { houding: 'staan', kijk: k })); });
    const tg = q.at('populatiegrootte'), ad = q.on('populatiedichtheid', 1, 0.4);
    B.forEach(([x, y], i) => A1(ctx, ramp(t, tg + i * 0.35, 0.3) * (1 - ad), () => text(ctx, String(i + 1), x, y - 80, fTekst(44, 800), C.goud, 'center')));
    naamBij(ctx, 'populatiegrootte', 'aantal dieren', 840, 330, q.on('populatiegrootte', 1, 0.5) * (1 - ad), 'center');
    const rx = lerp(-900, 430, q.on('kilometer', 1, 1.6));
    A1(ctx, q.on('kilometer', 1, 0.3), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.strokeRect(rx, 700, 820, 150); metaText(ctx, '1 km oever', rx + 410, 684, C.goud, 'center', 28); });
    naamBij(ctx, 'populatiedichtheid', 'bevers per kilometer oever', 840, 330, ad, 'center');
    naamBij(ctx, 'populatie', 'één soort · één gebied · onderling voortplanten', 840, 190, q.on('populatie', 1, 0.6), 'center');
    A1(ctx, q.on('populatie', 1, 0.6), () => ecoSchaal(ctx, 'schematisch · niet op schaal')); },
  s06(ctx, t, q) { e1Macro(ctx, { horizon: 420, heuvel: false }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 420);
    A1(ctx, q.on('nachts', 1, 1.0), () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.moveTo(1780, 140); ctx.arc(1740, 140, 40, 0, 6.283); ctx.clip('evenodd'); circ(ctx, 1720, 150, 46, '#E8E2C8'); ctx.restore(); });
    e1Burcht(ctx, 1100, 640, 0.95, { doorsnede: true, waterW: 2.4, bewoners: (x, y) => ecoBever(ctx, x, y, 1.0, { houding: 'knagen', kijk: -1, t: t * 0.6, tak: false }) });
    e1Golf(ctx, 0, 560, 650, 840, t, 6);
    naamBij(ctx, 'burcht', 'takken en modder', 1150, 300, q.on('burcht', 1, 0.6), 'center');
    naamBij(ctx, 'woonkamer', 'boven de waterlijn', 1460, 590, q.on('ingang', 1, 0.6), 'left'); naamBij(ctx, 'ingang', 'onder water', 815, 790, q.on('ingang', 1, 0.6), 'right');
    A1(ctx, q.on('burchten', 1, 0.5), () => { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -t * 20; ctx.beginPath(); ctx.ellipse(1100, 560, 330, 140, 0, 0, 6.283); ctx.stroke(); ctx.restore(); });
    A1(ctx, q.on('knaagsporen', 1, 0.6), () => { e1Stomp(ctx, 1835, 628, 1.8, { val: false }); metaText(ctx, 'knaagsporen', 1890, 540, C.text2, 'right', 24); });
    A1(ctx, q.on('ingang', 1, 0.6), () => ecoSchaal(ctx, 'doorsnede · burcht ± 5 m breed')); },
  s07(ctx, t, q) { _e1Sloot(ctx, { wilgen: false }); e1Golf(ctx, 0, W, 664, 740, t);
    const tel = q.on('telefoon', 1, 0.3) > 0.5; const g = persoon(ctx, 'gerrit', 760, 900, 330, { outfit: 'gewoon', pose: tel ? 'vasthouden' : 'staan', uit: 'neutraal', t });
    if (tel && g.handR) { e1Telefoon(ctx, g.handR.x, g.handR.y - 18, 1.3); const tf = q.at('foto'), f = clamp(1 - Math.abs(t - tf - 0.15) / 0.25, 0, 1); if (f > 0) circ(ctx, g.handR.x, g.handR.y - 30, 30 + 40 * f, `rgba(255,255,255,${0.5 * f})`); }
    A1(ctx, q.on('meldt', 1, 0.6), () => { roundRect(ctx, 1180, 150, 600, 470, 20); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2);
      vul(ctx, [[1260, 210], [1500, 190], [1700, 260], [1720, 470], [1600, 580], [1330, 590], [1230, 430]], '#33503E');
      [[[1270, 560], [1420, 470], [1560, 430], [1700, 400]], [[1300, 330], [1450, 360], [1600, 300]]].forEach(r => lijn(ctx, r, E1.water, 7)); });
    A1(ctx, q.on('plek', 1, 0.4), () => circ(ctx, 1480, 470, 13 * (1 + 0.15 * Math.sin(t * 3)), C.goud, C.bgSchema, 3));
    const tm = q.at('meldingen'); for (let i = 0; i < 26; i++) { const r = i % 2 ? [[1270, 560], [1700, 400]] : [[1300, 330], [1600, 300]]; const u = hash(i * 3.3);
      A1(ctx, ramp(t, tm + i * 0.1, 0.25), () => circ(ctx, r[0][0] + (r[1][0] - r[0][0]) * u + (hash(i) - 0.5) * 30, r[0][1] + (r[1][1] - r[0][1]) * u + (hash(i * 2) - 0.5) * 30, 7, rgba(C.goud, 0.85))); }
    A1(ctx, q.on('meldingen', 1, 0.6), () => metaText(ctx, 'meldingen van knaagsporen', 1480, 660, C.text2, 'center', 26));
    vraagteken(ctx, 1720, 250, q.on('precies', 1, 0.6), 80); },
  s08(ctx, t, q) { _bg1(ctx); e1Haarval(ctx, 420, 560, 1.6); e1BeverLoop(ctx, t, 0.3, 120, 560, 650, 1.5);
    zoomCircle(ctx, 900, 330, 120, 430, 495, 'één haar · vergroot', q.on('haar', 1, 0.6), () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(780, 210, 240, 240); lijn(ctx, [[830, 430], [880, 330], [940, 250]], '#7A5A42', 10); circ(ctx, 828, 432, 14, '#C9A890'); });
    const tp = q.at('DNA-profiel'), hl = q.on('herken', 1, 0.5);
    [1, 2, 3].forEach((k, i) => { const u = ramp(t, tp + i * 0.5, 0.9); if (u <= 0.01) return; ctx.save(); ctx.beginPath(); ctx.rect(1170, 0, 540 * u, H); ctx.clip();
      e1Profiel(ctx, 1180, 220 + i * 170, 520, 110, k * 7, C.text); ctx.restore(); A1(ctx, u, () => metaText(ctx, 'bever ' + k, 1740, 290 + i * 170, C.text2, 'left', 26));
      if (i === 1) A1(ctx, hl, () => { roundRect(ctx, 1176, 386, 528, 118, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }); });
    naamBij(ctx, 'DNA-profiel', 'elk dier een eigen patroon', 1440, 760, q.on('eigen', 1, 0.6), 'center'); },
  s09(ctx, t, q) { _bg1(ctx);
    A1(ctx, q.on('verzamelt', 1, 0.5), () => text(ctx, 'ronde 1', 330, 210, fTekst(44, 700), C.text, 'center'));
    const tv = q.at('verzamelt') + 0.3, t40 = q.at('veertig');
    for (let i = 0; i < 40; i++) { const a = ramp(t, Math.min(tv + i * 0.05, t40 - 0.3), 0.25); if (a > 0.01) e1Icoon(ctx, 150 + (i % 8) * 52, 290 + Math.floor(i / 8) * 70, 19, { merk: t > t40 + i * 0.03, a }); }
    A1(ctx, q.on('veertig', 1, 0.6), () => text(ctx, '40 gevonden', 330, 740, fTekst(48, 700), C.goud, 'center'));
    A1(ctx, q.on('maand', 1, 0.6), () => { metaText(ctx, 'een maand later', 810, 470, C.text2, 'center', 28); pijl(ctx, 680, 500, lerp(690, 940, q.on('maand', 1, 1.0)), 500, C.line, 1, 3, 16); text(ctx, 'ronde 2', 1290, 210, fTekst(44, 700), C.text, 'center'); });
    const t30 = q.at('dertig'), t12 = q.at('Twaalf');
    for (let i = 0; i < 30; i++) { const a = ramp(t, t30 - 0.2 + i * 0.05, 0.25); if (a <= 0.01) continue; const m = i < 12 && t > t12 + i * 0.06;
      e1Icoon(ctx, 1110 + (i % 6) * 70, 290 + Math.floor(i / 6) * 70, 19, { merk: m, kleur: m ? C.okerD : '#6E6A64', a }); }
    A1(ctx, q.on('dertig', 1, 0.6), () => text(ctx, '30 gevonden', 1290, 740, fTekst(48, 700), C.text, 'center'));
    A1(ctx, q.on('Twaalf', 1, 0.6), () => text(ctx, '12 al bekend', 1290, 800, fTekst(48, 700), C.goud, 'center')); },
  s10(ctx, t, q) { SCENES.s09(ctx, 99, ALLES1); },
  s12(ctx, t, q) { _bg1(ctx); const a12 = q.on('Twaalf', 1, 0.6);
    for (let i = 0; i < 30; i++) e1Icoon(ctx, 160 + (i % 6) * 70, 260 + Math.floor(i / 6) * 70, 19, { merk: i < 12, kleur: i < 12 ? _mixHex(C.okerD, C.goud, a12) : '#6E6A64', a: i < 12 ? 1 : 1 - 0.5 * a12 });
    A1(ctx, q.on('vijf', 1, 0.6), () => text(ctx, '12 van 30 = 2 op de 5', 360, 690, fTekst(48, 700), C.goud, 'center'));
    A1(ctx, q.on('Veertig', 1, 0.6), () => text(ctx, '40 bekende bevers = 2/5 van alle bevers', 1260, 330, fTekst(48, 600), C.text, 'center'));
    A1(ctx, q.on('honderd', 1, 0.6), () => text(ctx, 'alle bevers ≈ 40 × 5/2 = 100', 1260, 440, fTekst(56, 800), C.goud, 'center'));
    haak(ctx, 860, 1660, 490, 'vangen, merken en terugvangen', C.groen, q.on('vangen', 1, 0.6));
    A1(ctx, q.on('klopt', 1, 0.6), () => metaText(ctx, 'voorwaarden: tussen de rondes niemand erbij of eraf', 1260, 680, C.text2, 'center', 26));
    A1(ctx, q.on('evenveel', 1, 0.6), () => metaText(ctx, 'elke bever evenveel kans om gevonden te worden', 1260, 720, C.text2, 'center', 26)); },

  // ---------------- H2 Erbij en eraf
  s13(ctx, t, q) { _e1Kreek(ctx); e1Golf(ctx, 0, W, 566, 756, t); e1Burcht(ctx, 1260, 770, 0.6, {});
    const ao = q.on('ouderpaar', 1, 0.3); A1(ctx, ao, () => { ecoBever(ctx, 760, 830, 1.6, { houding: 'staan' }); ecoBever(ctx, 980, 840, 1.6, { houding: 'knagen', kijk: -1, t: t * 0.6 }); });
    naamBij(ctx, 'ouderpaar', '', 870, 700, ao, 'center');
    const aj = q.on('laatste', 1, 0.3); A1(ctx, aj, () => ecoBever(ctx, 1640, 842, 1.15, { houding: 'staan', kijk: -1 })); naamBij(ctx, 'jong van vorig jaar', '', 1640, 780, aj, 'center');
    const tg = q.at('geboren'); [[520, 700], [400, 712], [280, 704]].forEach(([x, y], i) => { const t0 = tg + i * 0.7; if (t < t0) return; const u = ease((t - t0) / 3.2);
      A1(ctx, ramp(t, t0, 0.4), () => ecoBever(ctx, lerp(1120, x, u) + (u >= 1 ? 6 * Math.sin(t * 0.8 + i) : 0), lerp(740, y, u), 1.15, { houding: 'zwemmen', water: false, kijk: -1, t: t * 1.6 + i * 0.3 })); });
    naamBij(ctx, 'jongen van dit jaar', '2 tot 3 per worp', 400, 630, q.on('drie', 1, 0.6), 'center');
    const ad = q.on('verkeer', 1, 0.6), af = q.on('verkeer', 1, 1.8); A1(ctx, ad, () => { roundRect(ctx, 760, 200, 400, 50, 6); shape(ctx, '#4A4E56'); ctx.save(); ctx.setLineDash([24, 18]); lijn(ctx, [[770, 225], [1150, 225]], '#D8D4C8', 3); ctx.restore(); ecoBever(ctx, 960, 242, 0.75, { houding: 'staan', a: 1 - ramp(t, q.at('verkeer') + 0.8, 0.3) }); kruis(ctx, 960, 225, 22, ramp(t, q.at('verkeer') + 0.8, 0.3), C.koraal); }); naamBij(ctx, 'sterfte', 'bijvoorbeeld verkeer', 960, 300, ad, 'center');
    A1(ctx, ao, () => ecoSchaal(ctx, 'volwassen bever ± 85 cm zonder staart')); },
  s14(ctx, t, q) { ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 0, W, H);
    const R = [[-40, 860], [300, 760], [560, 640], [820, 600], [1100, 470], [1400, 400], [1700, 260], [1980, 180]]; lijn(ctx, R, E1.water, 90); lijn(ctx, [[820, 600], [900, 760], [1000, 980]], E1.water, 30); lijn(ctx, [[1400, 400], [1560, 600], [1600, 880]], E1.water, 22);
    for (let k = 0; k < 10; k++) { const p = e1Langs(R, (t * 0.02 + k / 10) % 1); circ(ctx, p.x + (hash(k) - 0.5) * 40, p.y + (hash(k * 3) - 0.5) * 30, 4, rgba(E1.waterL, 0.6)); }
    e1Burcht(ctx, 560, 600, 0.28, {}); naamBij(ctx, 'familie', '', 560, 520, 1, 'center');
    const RT = [[600, 640], [820, 600], [1100, 470], [1400, 400], [1540, 580], [1590, 760]];
    const tz = q.at('zwemmen'), to = Math.max(tz + 3, q.at('oever')), u = clamp((t - tz) / (to - tz), 0, 1);
    if (u > 0) { ctx.save(); ctx.setLineDash([12, 12]); lijn(ctx, e1Deel(RT, u), C.goud, 4); ctx.restore(); }
    const p = e1Langs(RT, u); A1(ctx, ramp(t, 0.2, 0.4), () => ecoBever(ctx, p.x, p.y + 20, 0.9, { houding: 'zwemmen', water: false, kijk: p.dx >= 0 ? 1 : -1, t: t * 1.4 }));
    A1(ctx, q.on('kilometer', 1, 0.6), () => metaText(ctx, 'meestal 10 tot 20 km', 1100, 380, C.goud, 'center', 28));
    const as = q.on('sloot', 1, 0.5); A1(ctx, as, () => circ(ctx, 1600, 870, 18, C.goud, C.bgSchema, 3)); naamBij(ctx, 'sloot van de boer', '', 1650, 860, as, 'left');
    ecoSchaal(ctx, 'kaart · niet op schaal'); },
  s15(ctx, t, q) { _bg1(ctx); e1PopAnim(ctx, 960, 470, 170, t, [q.on('populatie', 1, 0.6), q.on('Geboorte', 1, 0.6), q.on('immigratie', 1, 0.6), q.on('Sterfte', 1, 0.6), q.on('emigratie', 1, 0.6)]);
    A1(ctx, q.on('groei', 1, 0.6), () => text(ctx, 'groei = (geboorte + immigratie) − (sterfte + emigratie)', 960, 850, fTekst(46, 700), C.text, 'center')); },
  s16(ctx, t, q) { _bg1(ctx); e1PopAnim(ctx, 960, 470, 150, t, [1, 1, 1, 1, 1], { getallen: ['120', '10', '60', '30'], gA: [q.on('honderdtwintig', 1, 0.5), q.on('tien', 1, 0.5), q.on('zestig', 1, 0.5), q.on('dertig', 1, 0.5)] });
    A1(ctx, q.on('vierhonderd', 1, 0.5), () => { text(ctx, '400', 960, 540, fTekst(48, 800), C.goud, 'center'); metaText(ctx, 'begin van het jaar', 960, 690, C.text2, 'center', 26); }); },
  s17(ctx, t, q) { SCENES.s16(ctx, t, ALLES1); },
  s19(ctx, t, q) { _bg1(ctx);
    const r = (y, a, b1, b2, kl, aA, aB) => { A1(ctx, aA, () => text(ctx, a, 760, y, fTekst(48, 600), kl, 'right')); ctx.font = fTekst(48, 800); const w1 = ctx.measureText(b1).width;
      A1(ctx, aA, () => text(ctx, b1, 820, y, fTekst(48, 800), kl, 'left')); A1(ctx, aB, () => text(ctx, b2, 820 + w1, y, fTekst(48, 800), kl, 'left')); };
    r(260, 'erbij', '120 + 10', ' = 130', C.groen, q.on('erbij', 1, 0.5), q.on('honderddertig', 1, 0.5));
    r(360, 'eraf', '60 + 30', ' = 90', C.koraal, q.on('eraf', 1, 0.5), q.on('negentig', 1, 0.5));
    r(480, 'groei', '130 − 90', ' = 40', C.text, q.on('veertig', 1, 0.5), q.on('veertig', 1, 0.5));
    A1(ctx, q.on('procent', 1, 0.6), () => text(ctx, '40 / 400 = 10 % per jaar', 960, 650, fTekst(64, 800), C.goud, 'center'));
    haak(ctx, 620, 1300, 690, 'groeisnelheid', C.groen, q.on('groeisnelheid', 1, 0.6)); },

  // ---------------- H3 Steeds sneller
  s20(ctx, t, q) { _bg1(ctx); _asNat(ctx);
    const tot = 1991 + 9 * q.on('2000', 1, 1.4) + 4 * q.on('2004', 1, 1.0);
    if (tot > 1991.4) { const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot }); naamBij(ctx, '± 130', '2000', X(2000) - 20, Y(128) - 70, tot >= 1999.95 ? 1 : 0, 'right'); naamBij(ctx, 'minstens 220', '2004', X(2004) + 20, Y(220) - 70, tot >= 2003.95 ? 1 : 0, 'left'); }
    A1(ctx, q.on('schattingen', 1, 0.6), () => metaText(ctx, 'schattingen', 1660, 210, C.text2, 'right', 26)); },
  s21(ctx, t, q) { _bg1(ctx); _asNat(ctx); metaText(ctx, 'schattingen', 1660, 210, C.text2, 'right', 26);
    const tot = 2004 + 15 * q.on('2019', 1, 1.8) + 4 * q.on('2023', 1, 1.0);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot });
    const as = q.on('steiler', 1, 0.8); if (as > 0.01) { const Q = []; for (let j = 2012; j <= 2023; j += 0.5) Q.push([X(j), Y(_e1F(j))]); A1(ctx, as * (0.6 + 0.4 * Math.sin(t * 3)), () => e1Lijn(ctx, Q, rgba(C.goud, 0.35), 18)); }
    naamBij(ctx, '± 3500', '2019', X(2019) - 30, Y(3500) - 20, tot >= 2018.95 ? 1 : 0, 'right'); naamBij(ctx, '± 6000', '2023', X(2023) - 30, Y(6000) - 20, tot >= 2022.95 ? 1 : 0, 'right'); },
  s22(ctx, t, q) { _bg1(ctx); _asNat(ctx, 'aantal bevers');
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, punten: false });
    const trap = (j, n, lbl, u) => { if (u <= 0.01) return; const n2 = n * 1.2, u1 = clamp(u * 2, 0, 1), u2 = clamp(u * 2 - 1, 0, 1); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(j), Y(n)); ctx.lineTo(X(j + u1), Y(n)); if (u2 > 0) ctx.lineTo(X(j + 1), Y(n + (n2 - n) * u2)); ctx.stroke();
      A1(ctx, u2, () => text(ctx, lbl, X(j + 1) + 20, Y((n + n2) / 2) + 14, fTekst(40, 700), C.groen, 'left')); };
    trap(2005.2, 200, '+40', q.on('tweehonderd', 1, 1.2)); A1(ctx, q.on('tweehonderd', 1, 1.2) > 0.6 ? 1 : 0, () => { ctx.strokeStyle = C.groen; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(2006.2), Y(220), 30, 0, 6.283); ctx.stroke(); }); trap(2016.1, 2000, '+400', q.on('tweeduizend', 1, 1.2));
    naamBij(ctx, 'exponentiële groei', 'j-curve · ± 20 % per jaar', 800, 300, q.on('exponentiële', 1, 0.6), 'center');
    A1(ctx, q.on('J-curve', 1, 0.8) * 0.55, () => text(ctx, 'J', 1720, 520, fTitel(160), C.goud, 'center')); },
  s23(ctx, t, q) { SCENES.s22(ctx, t, ALLES1); },
  s25(ctx, t, q) { _bg1(ctx);
    const v = [100, 120, 144, 173, 207], cue = ['honderd', 'honderdtwintig', 'honderdvierenveertig', 'honderddrieënzeventig', 'tweehonderdzeven'], x0 = 300, y0 = 800, sc = 2.4, ad = q.on('dubbele', 1, 0.6);
    A1(ctx, ad, () => { ctx.save(); ctx.setLineDash([10, 10]); lijn(ctx, [[x0 - 40, y0 - 200 * sc], [x0 + 5 * 180, y0 - 200 * sc]], C.goud, 3); ctx.restore(); metaText(ctx, 'dubbel = 200', x0 + 5 * 180 + 10, y0 - 200 * sc + 10, C.goud, 'left', 28); });
    v.forEach((n, i) => { const u = q.on(cue[i], 1, 0.8); if (u <= 0.01) return; const hh = n * sc * ease(u); roundRect(ctx, x0 + i * 180, y0 - hh, 120, hh, 8); shape(ctx, rgba(i === 4 && ad > 0.5 ? C.goud : C.okerD, 0.9), C.line, 1.5);
      A1(ctx, u, () => { text(ctx, String(n), x0 + i * 180 + 60, y0 - hh - 18, fTekst(40, 700), C.text, 'center'); metaText(ctx, 'jaar ' + i, x0 + i * 180 + 60, y0 + 44, C.text2, 'center', 28); }); });
    naamBij(ctx, 'verdubbelingstijd', '', 1440, 470, q.on('verdubbelingstijd', 1, 0.6), 'left');
    A1(ctx, q.on('vuistregel', 1, 0.6), () => text(ctx, 'regel van 70:', 1440, 560, fTekst(44, 600), C.text, 'left'));
    A1(ctx, q.on('gedeeld', 1, 0.6), () => text(ctx, '70 / 20 = 3,5 jaar', 1440, 640, fTekst(52, 800), C.goud, 'left'));
    A1(ctx, q.on('precies', 1, 0.6), () => metaText(ctx, 'precies: 3,8 jaar', 1440, 700, C.text2, 'left', 28)); },
  s26(ctx, t, q) { _bg1(ctx); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, kleur: C.okerD }); A1(ctx, q.on('2019', 2, 0.8), () => e1Nationaal(ctx, ..._gNat, { tot: 2023, deel: [2019, 2023, C.goud], kleur: C.okerD }));
    A1(ctx, q.on('schattingen', 1, 0.6), () => metaText(ctx, 'schattingen · verschillende methoden', 1660, 210, C.text2, 'right', 26));
    naamBij(ctx, '± 20 % per jaar', '2004 – 2019', X(2012), Y(1600) - 30, q.on('twintig', 1, 0.6), 'right'); naamBij(ctx, '± 14 % per jaar', '2019 – 2023', X(2020) - 50, Y(5400) - 40, q.on('veertien', 1, 0.6), 'right'); },
  s27(ctx, t, q) { SCENES.s26(ctx, t, ALLES1); },
  s29(ctx, t, q) { _bg1(ctx); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, deel: [2019, 2023, C.goud], kleur: C.okerD });
    const j = 2019 + ((t * 0.6) % 4); circ(ctx, X(j), Y(_e1F(j)), 12, C.goud, C.bgSchema, 3);
    A1(ctx, q.on('draagkracht', 1, 0.6), () => text(ctx, 'draagkracht van Nederland: niet in deze gegevens', 1660, 150, fTekst(36, 600), C.text2, 'right'));
    naamBij(ctx, 'stijgt nog', 'de groei remt af', X(2020) - 40, Y(5000), q.on('stijgt', 1, 0.6), 'right'); },

  // ---------------- H4 Wanneer is het vol?
  s30(ctx, t, q) { _e1Kreek(ctx); e1Golf(ctx, 0, W, 566, 756, t);
    const ag = q.on('geurhoopjes', 1, 1.2); if (ag > 0.01) { ctx.save(); ctx.translate(890, 800); ctx.scale(1, ag); vul(ctx, [[-70, 0], [-30, -28], [30, -32], [70, 0]], E1.klei); ctx.restore(); }
    naamBij(ctx, 'geurhoopje', 'modder en bevergeil', 900, 720, ag, 'left');
    const tw = q.at('weggejaagd'); if (t < tw) ecoBever(ctx, 680, 812, 2.2, { houding: 'staan' }); else e1BeverLoop(ctx, t, tw, 680, 760, 812, 2.2);
    const tv = q.at('vreemde'); if (t > tv) { let x, k; if (t < tw) { x = lerp(2060, 1500, ease((t - tv) / 2.4)); k = -1; } else { x = 1500 + 90 * (t - tw); k = 1; }
      ecoBever(ctx, x, 690, 1.8, { houding: 'zwemmen', water: false, kijk: k, t: t * 1.3 }); naamBij(ctx, 'vreemde bever', t < tw ? 'komt aan' : 'zwemt weg', x, 610, q.on('vreemde', 1, 0.5) * (1 - ramp(t, tw + 4, 0.6)), 'center'); }
    A1(ctx, q.on('eigen', 1, 0.8), () => { lijn(ctx, [[300, 774], [1120, 774]], C.goud, 5); metaText(ctx, 'eigen stuk oever', 710, 860, C.goud, 'center', 26); }); },
  s31(ctx, t, q) { ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 0, W, H);
    const R1 = [[-40, 520], [400, 470], [800, 520], [1200, 470], [1600, 520], [1980, 480]], R2 = [[300, 690], [700, 720], [1100, 700], [1500, 760]];
    lijn(ctx, R1, E1.water, 180); lijn(ctx, R2, E1.water, 40);
    for (let k = 0; k < 12; k++) { const p = e1Langs(R1, (t * 0.025 + k / 12) % 1); const dy = (hash(k) - 0.5) * 110; lijn(ctx, [[p.x, p.y + dy], [p.x + 50, p.y + dy]], rgba(E1.waterL, 0.5), 3); }
    const T = [[120, 360], [420, 330], [720, 360], [1020, 330], [1320, 360], [1620, 330], [260, 620], [700, 640], [1150, 630]];
    const t0 = q.at('verdedigt'), t1 = Math.max(t0 + 2, q.at('bezet'));
    T.forEach(([x, y], i) => A1(ctx, ramp(t, t0 + (t1 - t0) * i / 9, 0.4), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, x, y, 270, 60, 14); ctx.stroke(); e1Burcht(ctx, x + 135, y + 56, 0.13, {}); }));
    naamBij(ctx, 'Millingerwaard', 'gelderse poort · 9 territoria', 960, 810, q.on('Millingerwaard', 1, 0.6), 'center'); ecoSchaal(ctx, 'kaart · schematisch'); },
  s32(ctx, t, q) { SCENES.s31(ctx, t, ALLES1); },
  s34(ctx, t, q) { _bg1(ctx); const x = 260, y = 800, w = 1200, h = 560;
    e1As(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'volwassen bevers in de millingerwaard', xt: [[0, '1995'], [0.5, '2005'], [1, '2015']], yt: [[0, '0'], [0.5, '10'], [0.9, '18']] });
    const P = _e1MwLijn(), u = 0.5 * q.on('jaar', 1, 2.2) + 0.5 * q.on('gelijk', 1, 2.4); if (u > 0.01) e1Lijn(ctx, e1Deel(P, u), C.okerD, 6);
    A1(ctx, q.on('draagkracht', 1, 0.6), () => { ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 18 / 20 * h], [x + w, y - 18 / 20 * h]], C.goud, 4); ctx.restore(); text(ctx, 'draagkracht', x + w + 20, y - 18 / 20 * h + 14, fTekst(40, 700), C.goud, 'left'); });
    const at = q.on('trekken', 1, 0.6); if (at > 0.01) { [0.7, 0.8, 0.9].forEach((uu, i) => { const f = (t * 0.6 + i * 0.33) % 1; A1(ctx, at * Math.sin(Math.PI * f), () => pijl(ctx, x + uu * w + f * 40, y - 0.82 * h + f * 70, x + uu * w + 60 + f * 40, y - 0.72 * h + f * 70, C.koraal, 1, 4, 14)); });
      A1(ctx, at, () => text(ctx, 'jongen trekken weg', x + 0.8 * w, y - 0.5 * h, fTekst(36, 600), C.koraal, 'center')); }
    ecoSchaal(ctx, 'vereenvoudigd · kaandorp & lange 2010'); },
  s35(ctx, t, q) { _bg1(ctx); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const N0 = 0.02, r = 7.5, K = 0.7, J = [], S = []; for (let i = 0; i <= 80; i++) { const u = i / 80, j = N0 * Math.exp(r * u), s = K / (1 + (K - N0) / N0 * Math.exp(-r * u)); if (j < 1.05) J.push([x + u * w, y - j * h]); S.push([x + u * w, y - s * h]); }
    e1Lijn(ctx, J, rgba(C.goud, 0.5), 5, [12, 10]); text(ctx, 'J', x + 0.6 * w, y - 0.95 * h, fTitel(90), rgba(C.goud, 0.7), 'center');
    const u = 0.35 * q.on('snel', 1, 1.6) + 0.3 * q.on('langzamer', 1, 1.6) + 0.35 * q.on('niet', 1, 2.0); if (u > 0.01) e1Lijn(ctx, e1Deel(S, u), C.okerD, 7);
    A1(ctx, 0.35 + 0.65 * q.on('draagkracht', 1, 0.6), () => { ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.7 * h], [x + w, y - 0.7 * h]], C.goud, 3); ctx.restore(); });
    A1(ctx, q.on('draagkracht', 1, 0.6), () => text(ctx, 'draagkracht', x + w - 10, y - 0.7 * h - 20, fTekst(40, 700), C.goud, 'right'));
    A1(ctx, q.on('logistische', 1, 0.6), () => text(ctx, 'S', x + 0.95 * w, y - 0.5 * h, fTitel(90), C.okerD, 'center'));
    naamBij(ctx, 'logistische groei', 's-curve', x + 0.75 * w, y - 0.3 * h, q.on('logistische', 1, 0.6), 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  s36(ctx, t, q) { _bg1(ctx); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80; let n = 0.62 / (1 + Math.exp(-(u - 0.3) * 16)); n += 0.3 * Math.exp(-Math.pow((u - 0.45) / 0.08, 2)) - 0.12 * Math.exp(-Math.pow((u - 0.62) / 0.07, 2)); P.push([x + u * w, y - n * h]); }
    ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.62 * h], [x + w, y - 0.62 * h]], C.goud, 3); ctx.restore(); text(ctx, 'draagkracht', x + w - 10, y - 0.62 * h + 50, fTekst(40, 700), C.goud, 'right');
    const u = 0.45 * q.on('Soms', 1, 2.6) + 0.2 * q.on('overshoot', 1, 1.6) + 0.35 * q.on('zakt', 1, 2.2); const D = e1Deel(P, u);
    if (u > 0.01) { e1Lijn(ctx, D, C.okerD, 7); A1(ctx, q.on('overshoot', 1, 0.6), () => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, w, y - 0.62 * h); ctx.clip(); e1Lijn(ctx, D, C.koraal, 9); ctx.restore(); }); }
    naamBij(ctx, 'overshoot', 'meer dieren dan het gebied kan voeden', x + 0.45 * w, y - 0.98 * h, q.on('overshoot', 1, 0.6), 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },

  // ---------------- H5 Wat houdt het aantal in toom?
  s37(ctx, t, q) { _bg1(ctx); const am = q.on('meer', 1, 0.5);
    text(ctx, 'weinig bevers', 480, 230, fTekst(44, 700), C.text, 'center'); e1Oeverlint(ctx, 140, 300, 680, 8, { bezet: 2 });
    A1(ctx, am, () => { text(ctx, 'veel bevers', 1440, 230, fTekst(44, 700), C.text, 'center'); e1Oeverlint(ctx, 1100, 300, 680, 8, { bezet: 2 + Math.round(6 * q.on('meer', 1, 2.4)) }); });
    [['geen plek', 'territorium', 'plek'], ['minder voedsel', 'per bever', 'voedsel'], ['ziekte', 'springt over', 'Ziekte']].forEach(([a, b, c], i) => naamBij(ctx, a, b, 1190 + i * 270, 480, q.on(c, 1, 0.6), 'center'));
    haak(ctx, 1100, 1780, 560, 'dichtheidsafhankelijk', C.koraal, q.on('dichtheidsafhankelijke', 1, 0.6)); },
  s38(ctx, t, q) { _e1Hoog(ctx, t, 0.3 * ease(t / 6)); },
  s40(ctx, t, q) { const lvl = 0.3 + 0.7 * q.on('Hoog', 1, 4.0); _e1Hoog(ctx, t, lvl, { zwem: q.on('vast', 1, 1.2), dimB: lvl });
    naamBij(ctx, 'hoogwater', 'dichtheidsonafhankelijk', 300, 400, q.on('dichtheidsonafhankelijk', 1, 0.6), 'left');
    const aw = q.on('winter', 1, 0.8); A1(ctx, aw, () => { e1Sneeuw(ctx, t, 900, 1900, 20, 290); metaText(ctx, 'strenge winter', 1500, 260, C.text2, 'center', 26); });
    ecoSchaal(ctx, 'doorsnede · schematisch'); },
  s41(ctx, t, q) { _bg1(ctx); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const P = []; for (let i = 0; i <= 100; i++) { const u = i / 100; let n = 0.62 / (1 + Math.exp(-(u - 0.18) * 20)); if (u > 0.3) n += 0.06 * Math.sin(u * 34) * Math.min(1, (u - 0.3) * 5); P.push([x + u * w, y - n * h]); }
    ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.62 * h], [x + w, y - 0.62 * h]], C.goud, 3); ctx.restore();
    const u = 0.32 + 0.33 * q.on('omlaag', 1, 2.5) + 0.35 * q.on('schommelt', 1, 3.0); const D = e1Deel(P, u); e1Lijn(ctx, D, C.okerD, 7); const e = D[D.length - 1]; circ(ctx, e[0], e[1], 10, C.okerD, C.bgSchema, 3);
    const b = 6 * Math.sin(t * 2.5); A1(ctx, q.on('omlaag', 1, 0.6), () => pijl(ctx, x + 0.62 * w, y - 0.8 * h + b, x + 0.62 * w, y - 0.7 * h + b, C.koraal, 1, 5, 18));
    A1(ctx, q.on('groeien', 1, 0.6), () => pijl(ctx, x + 0.71 * w, y - 0.44 * h - b, x + 0.71 * w, y - 0.54 * h - b, C.groen, 1, 5, 18));
    naamBij(ctx, 'populatieregulatie', 'dynamiek rond de draagkracht', x + 0.5 * w, y - 0.2 * h, q.on('populatieregulatie', 1, 0.6), 'center');
    haak(ctx, x + 0.35 * w, x + w, y - 0.84 * h - 60, 'biologisch evenwicht', C.groen, q.on('evenwicht', 1, 0.6)); },
  s42(ctx, t, q) { e1Macro(ctx, { horizon: 520 });
    ctx.fillStyle = E1.water; ctx.fillRect(0, 700, 860, 140); ctx.fillRect(860, 590, W - 860, 140); e1Golf(ctx, 0, 860, 702, 836, t, 6); e1Golf(ctx, 880, W, 592, 726, t, 7); e1Oever(ctx, 840, { golf: 4 }); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(860, 730, W - 860, 120);
    e1Wilg(ctx, 1500, 600, 0.4, { knot: true }); e1Wilg(ctx, 1800, 600, 0.35, { knot: true });
    const ap = q.on('loopplank', 1, 0.8); e1Stuw(ctx, 860, 640, 0.9, { plank: false }); A1(ctx, ap, () => e1Stuw(ctx, 860, 640, 0.9, { plank: true }));
    // bever: loopt naar de stuw, wacht, klimt over de plank en zwemt verder
    const s = 1.3, v1 = 24 * s * E1_BEVERV, L = e1Loop(t, 0.3, 430, 707, v1), th = Math.max(q.at('heft'), 0.3 + 277 / v1 + 0.5), v2 = 24 * s * 2.0, dPl = 435, s2 = clamp((t - th) * v2, 0, dPl), te = th + dPl / v2;
    if (t < th) ecoBever(ctx, L.x, 640, s, { houding: L.loopt ? 'lopen' : 'staan', t: L.s / (24 * s) });
    else if (t < te) { ctx.save(); ctx.translate(707 + s2 * 0.913, 640 - s2 * 0.408); ctx.rotate(-0.42); ecoBever(ctx, 0, 0, s, { houding: 'lopen', t: (277 + s2) / (24 * s) }); ctx.restore(); }
    else { const u = t - te; ecoBever(ctx, 1104 + 70 * u + 40 * ease(u / 0.7), lerp(500, 600, ease(u / 0.7)), s, { houding: 'zwemmen', water: false, t: u * 1.3 }); }
    naamBij(ctx, 'barrière', 'stuw', 520, 420, q.on('barrière', 1, 0.6) * (1 - q.on('heft', 1, 0.4)), 'center'); naamBij(ctx, 'barrière opgeheven', 'loopplank langs de stuw', 520, 420, q.on('heft', 1, 0.6), 'center');
    naamBij(ctx, 'lege oevers', '', 1640, 560, q.on('oevers', 1, 0.6), 'center');
    const ah = q.on('herintroductie', 1, 0.6); A1(ctx, ah, () => e1Kist(ctx, 1300, 846, 1.3, { open: 1 })); naamBij(ctx, 'herintroductie', '', 1300, 770, ah, 'center'); },
  s43(ctx, t, q) { e1Macro(ctx, { horizon: 520 });
    const am = ramp(t, 0.1, 0.4); A1(ctx, am, () => e1Veldmuis(ctx, 360, 640, 9, {}));
    const tj = q.at('jongen'), gr = q.on('geslachtsrijp', 1, 2.0); for (let i = 0; i < 7; i++) A1(ctx, ramp(t, tj + i * 0.3, 0.3), () => e1Veldmuis(ctx, 200 + i * 64, 760, 9 * lerp(1, 1.5, gr), { jong: true, kijk: i % 2 ? 1 : -1 }));
    const ab = q.on('bever', 1, 0.3), ak = q.on('paar', 1, 0.3);
    A1(ctx, ab, () => ecoBever(ctx, 1360, 760, 2.0, { houding: 'staan', kijk: -1 })); A1(ctx, ak, () => { ecoBever(ctx, 1600, 770, 1.0, { houding: 'staan', kijk: -1 }); e1BeverLoop(ctx, t, q.at('paar') + 0.5, 1840, 1760, 772, 0.9); });
    naamBij(ctx, 'r-strateeg', 'veel jongen · weinig zorg', 420, 300, q.on('r-strateeg', 1, 0.6), 'center'); naamBij(ctx, 'K-strateeg', 'weinig jongen · lang zorgen', 1460, 300, q.on('K-strateeg', 1, 0.6), 'center');
    ecoSchaal(ctx, 'muis vergroot · niet op dezelfde schaal'); },
  s44(ctx, t, q) { e1Macro(ctx, { horizon: 460 }); ctx.fillStyle = E1.gras; ctx.fillRect(0, 560, W, 340);
    const ak = q.on('kaal', 1, 2.0), as = q.on('stort', 1, 2.5), td = q.at('Daarom');
    for (let i = 0; i < 26; i++) { const x = 80 + hash(i * 3.1) * 1300, y = 600 + hash(i * 7.7) * 260, g = ramp(t, td + i * 0.18, 0.6) * (0.55 + 0.45 * ak); if (g <= 0.01) continue;
      A1(ctx, 1 - 0.6 * as, () => { ctx.fillStyle = '#7A6A50'; ctx.beginPath(); ctx.ellipse(x, y, (60 + hash(i) * 70) * g, (18 + hash(i * 2) * 14) * g, 0, 0, 6.283); ctx.fill(); circ(ctx, x + (hash(i * 5) - 0.5) * 50, y + 2, 8, '#2A2018'); }); }
    A1(ctx, q.on('Friesland', 1, 0.3), () => persoon(ctx, 'gerrit', 1640, 900, 330, { outfit: 'gewoon', uit: 'bezorgd', kijk: -1, t }));
    [[900, 760, 1, 0], [600, 820, -1, 1], [300, 700, 1, 2]].forEach(([x0, y, k, i]) => { const x = 100 + ((x0 - 100 + k * 70 * t) % 1300 + 1300) % 1300; A1(ctx, ramp(t, td + i * 0.8, 0.3) * (1 - as), () => e1Veldmuis(ctx, x, y, 8, { kijk: k, houding: 'rennen', t: t * 3 + i })); });
    naamBij(ctx, 'muizenplaag', 'het jaar 2026 · ± 18 000 ha grasland', 700, 400, q.on('hectare', 1, 0.6), 'center'); ecoSchaal(ctx, 'muizen vergroot'); },
  s45(ctx, t, q) { _bg1(ctx);
    const pir = (x, y, vals, t0) => { vals.forEach((v, i) => { const e = ramp(t, t0 + i * 0.4, 0.6); if (e <= 0.01) return; const yy = y - (i + 1) * 98, ww = v * 4 * e; roundRect(ctx, x - ww / 2, yy, ww, 90, 6); shape(ctx, rgba(C.okerD, 0.9), _lt(C.okerD, 0.3), 1.5); });
      if (t > t0) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - vals.length * 98 - 10); ctx.stroke(); } };
    const lb = ['0–1 jaar', '1–2 jaar', '2–3 jaar', '3+ jaar']; A1(ctx, q.on('leeftijdsopbouw', 1, 0.6), () => lb.forEach((s, i) => metaText(ctx, s, 460, 800 - (i + 1) * 98 + 55, C.text2, 'right', 28)));
    const tL = q.at('leeftijdsopbouw'); A1(ctx, q.on('leeftijdsopbouw', 1, 0.6), () => { [720, 1450].forEach(x => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 260, 800); ctx.lineTo(x + 260, 800); ctx.stroke(); }); }); pir(720, 800, [110, 70, 46, 30], Math.min(q.at('groeiende'), tL + 2.5)); pir(1450, 800, [52, 46, 42, 38], q.at('smallere'));
    A1(ctx, q.on('groeiende', 1, 0.6), () => text(ctx, 'groeiende populatie', 720, 300, fTekst(44, 700), C.text, 'center'));
    A1(ctx, q.on('draagkracht', 1, 0.6), () => text(ctx, 'rond de draagkracht', 1450, 300, fTekst(44, 700), C.text, 'center'));
    A1(ctx, q.on('zuil', 1, 0.6), () => { ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(1330, 390, 240, 410); ctx.restore(); });
    metaText(ctx, 'leeftijdsopbouw · voorbeeld', 960, 870, C.text2, 'center', 26); },
  s46(ctx, t, q) { _bg1(ctx); e1KaartMM(ctx, 200, 180, 1.0, { eil: q.on('eilanden', 1, 2.0), groen: q.on('vierhonderd', 1, 2.5) });
    const av = q.on('vliegend', 1, 0.6), aw = q.on('wind', 1, 0.6), ad = q.on('drijvend', 1, 0.6);
    A1(ctx, aw, () => { pijl(ctx, 230, 330, 700, 400, C.teal, 1, 5, 20); text(ctx, 'wind', 400, 320, fTekst(36, 600), C.teal, 'center'); e1Reis(ctx, 230, 330, 700, 400, t, C.teal); });
    A1(ctx, av, () => { pijl(ctx, 1020, 240, 790, 380, C.groen, 1, 5, 20); text(ctx, 'vogels', 960, 220, fTekst(36, 600), C.groen, 'center'); e1Reis(ctx, 1020, 240, 790, 380, t, C.groen); });
    A1(ctx, ad, () => { pijl(ctx, 420, 760, 680, 500, C.goud, 1, 5, 20); text(ctx, 'water', 470, 660, fTekst(36, 600), C.goud, 'center'); e1Reis(ctx, 420, 760, 680, 500, t, C.goud); });
    const n = q.on('vierhonderd', 1, 0.3) > 0.5; naamBij(ctx, 'Marker Wadden', n ? 'vanaf 2016 · ± 400 soorten in 2021' : 'vanaf 2016 · kaal zand en slib', 1460, 420, q.on('Wadden', 1, 0.6), 'left');
    ecoSchaal(ctx, 'kaart · schematisch'); },
  s47(ctx, t, q) { _bg1(ctx); ctx.fillStyle = E1.water; ctx.fillRect(0, 150, W, 680); e1Golf(ctx, 300, W, 160, 820, t, 16);
    vul(ctx, [[-20, 150], [250, 150], [300, 400], [240, 620], [290, 830], [-20, 830]], '#3A5540'); metaText(ctx, 'kust', 130, 500, C.text2, 'center', 26);
    const eil = (x, y, rx, ry, a) => A1(ctx, a, () => { ctx.fillStyle = '#C9A86A'; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = C.groen; ctx.beginPath(); ctx.ellipse(x - rx * 0.12, y - ry * 0.1, rx * 0.6, ry * 0.55, 0, 0, 6.283); ctx.fill(); });
    eil(620, 480, 190, 120, q.on('groot', 1, 0.8)); naamBij(ctx, 'groot eiland', 'dicht bij de kust', 620, 680, q.on('groot', 1, 0.8), 'center');
    eil(1560, 470, 60, 38, q.on('klein', 1, 0.8)); naamBij(ctx, 'klein eiland', 'ver op zee', 1560, 580, q.on('klein', 1, 0.8), 'center');
    ecoSchaal(ctx, 'schematisch · niet op schaal'); },
  s49(ctx, t, q) { _bg1(ctx); const x = 300, y = 800, w = 1200, h = 560;
    e1As(ctx, x, y, w, h, { xLabel: 'aantal soorten op het eiland', yLabel: 'snelheid' });
    const im = (k) => [[x, y - h * 0.9 * k], [x + w, y - 0.02 * h]], ex = (k) => [[x, y - 0.02 * h], [x + w, y - h * 0.9 * k]];
    const a1 = q.on('vestigen', 1, 1.2), a2 = q.on('sterven', 1, 1.2), ak = q.on('kust', 1, 0.6), ag = q.on('groot', 1, 0.6);
    if (a1 > 0.01) { e1Lijn(ctx, e1Deel(im(1), a1), C.groen, 6); A1(ctx, ak, () => e1Lijn(ctx, im(0.55), rgba(C.groen, 0.55), 5, [12, 10])); }
    if (a2 > 0.01) { e1Lijn(ctx, e1Deel(ex(0.55), a2), C.koraal, 6); A1(ctx, ag, () => e1Lijn(ctx, ex(1), rgba(C.koraal, 0.55), 5, [12, 10])); }
    A1(ctx, a1, () => text(ctx, 'vestigen · dichtbij', x + 20, y - h * 0.9 - 14, fTekst(36, 700), C.groen, 'left')); A1(ctx, ak, () => text(ctx, 'vestigen · ver weg', x + 20, y - h * 0.5 - 20, fTekst(36, 600), rgba(C.groen, 0.8), 'left'));
    A1(ctx, ag, () => text(ctx, 'uitsterven · klein eiland', x + w, y - h * 0.9 - 14, fTekst(36, 600), rgba(C.koraal, 0.8), 'right')); A1(ctx, a2, () => text(ctx, 'uitsterven · groot eiland', x + w, y - h * 0.5 - 20, fTekst(36, 700), C.koraal, 'right'));
    // het evenwichtspunt glijdt langs de vestigingslijn naar het snijpunt
    const ae = q.on('even', 1, 1.5); if (ae > 0.01) { const f = (1 / 1.55) * ease(ae); circ(ctx, x + w * f, y - h * 0.9 + (h * 0.9 - 0.02 * h) * f, 14, C.goud, C.bgSchema, 3); }
    A1(ctx, q.on('minste', 1, 0.6), () => circ(ctx, x + w * (0.55 / 1.55), y - h * 0.9 * 0.55 / 1.55, 14, rgba(C.goud, 0.5), C.bgSchema, 3));
    A1(ctx, q.on('eilandtheorie', 1, 0.6), () => metaText(ctx, 'meeste soorten', x + w * (1 / 1.55), y + 60, C.goud, 'center', 26)); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  s50(ctx, t, q) { _bg1(ctx); const tm = q.at('allelen', 2), al = t > tm + 1.2;
    pot(ctx, 340, 640, 1.0, al ? { p: 0.85, n: 27, seed: 3, label: 'kleine populatie', extra: [[C.teal, 1]] } : { p: 0.85, n: 26, seed: 3, label: 'kleine populatie' }); pot(ctx, 1320, 640, 1.0, { p: 0.4, n: 40, seed: 5, label: 'buurpopulatie' });
    const tb = q.at('buiten'), ab = q.on('buiten', 1, 0.4); if (t > tb) { A1(ctx, ab, () => e1BeverLoop(ctx, t, tb, 1190, 730, 800, 2.4)); A1(ctx, ab, () => pijl(ctx, 1190, 860, 730, 860, C.teal, 1, 5, 20)); }
    if (t > tm && !al) { const u = ease((t - tm) / 1.2); circ(ctx, lerp(760, 380, u), lerp(700, 560, u) - 160 * Math.sin(Math.PI * u), 13, C.teal, _lt(C.teal, 0.4), 2); }
    naamBij(ctx, 'immigrant', 'brengt nieuwe allelen mee', 900, 520, q.on('nieuwe', 1, 0.6), 'center'); A1(ctx, q.on('evolutiereeks', 1, 0.6), () => ecoSchaal(ctx, 'drift en inteelt: evolutie 4 en 5')); },

  // ---------------- Samenvatting
  s51(ctx, t, q) { _bg1(ctx); const tf = q.at('familie'); e1Oeverlint(ctx, 160, 380, 1600, 12, { h: 70, bezet: t < tf ? 0 : Math.min(12, Math.floor((t - tf) / 0.25) + 1) });
    naamBij(ctx, 'één territorium', '2 tot 4 km oever · 4 tot 6 bevers', 300, 560, q.on('kilometer', 1, 0.6), 'left');
    A1(ctx, q.on('draagkracht', 1, 0.6), () => text(ctx, 'draagkracht = geschikte oever ÷ oever per familie', 960, 760, fTekst(48, 700), C.goud, 'center')); },
  s52(ctx, t, q) { _bg1(ctx); const F = fTekst(56, 800);
    A1(ctx, q.on('aannames', 1, 0.6), () => text(ctx, '2 km oever per familie · 5 bevers per familie', 960, 240, fTekst(44, 600), C.text2, 'center'));
    _e1Twee(ctx, '3000 km ÷ 2 km = 1500 families', ' × 5 ≈ 7500 bevers', 960, 380, F, C.goud, C.goud, q.on('drieduizend', 1, 0.6), q.on('zevenduizendvijfhonderd', 1, 0.6));
    _e1Twee(ctx, '6000 km ÷ 2 km = 3000 families', ' × 5 ≈ 15 000 bevers', 960, 490, F, C.goud, C.goud, q.on('zesduizend', 1, 0.6), q.on('vijftienduizend', 1, 0.6));
    A1(ctx, q.on('rekenvoorbeeld', 1, 0.6), () => metaText(ctx, 'rekenvoorbeeld · aangenomen getallen', 960, 580, C.text2, 'center', 28));
    haak(ctx, 420, 1500, 630, 'het antwoord hangt af van hoeveel geschikte oever er is', C.groen, q.on('antwoord', 1, 0.6)); },
  s53(ctx, t, q) { _e1Sloot(ctx); e1Golf(ctx, 0, W, 664, 740, t);
    const bx = 1080 + 36 * t; _vSpoor(ctx, bx - 90, 690, 300); ecoBever(ctx, bx, 700, _S1b, { houding: 'zwemmen', water: false, t: t * 1.2 });
    persoon(ctx, 'gerrit', 600, 900, 330, { outfit: 'gewoon', uit: 'blij', t });
    const x = 1240, y = 380, w = 420, h = 200, aM = q.on('Millingerwaard', 1, 2.0);
    A1(ctx, ramp(t, 0.2, 0.6) * (1 - 0.75 * aM), () => { const J = []; for (let i = 0; i <= 30; i++) { const u = i / 30; J.push([x + u * w * 0.75, y - h * (Math.exp(3 * u) - 1) / (Math.exp(3) - 1)]); } e1Lijn(ctx, J, C.okerD, 5); });
    const sw = q.on('schommelt', 1, 1.0), P = []; for (let i = 0; i <= 30; i++) { const u = i / 30; P.push([x + u * w, y - h / (1 + Math.exp(-(u - 0.45) * 11)) + (u > 0.75 ? 32 * sw * Math.sin(u * 40 + t * 2) * (u - 0.75) : 0)]); }
    if (aM > 0.01) e1Lijn(ctx, e1Deel(P, aM), C.goud, 6); A1(ctx, aM, () => text(ctx, 'S', x + w + 30, y - h + 30, fTitel(72), C.goud, 'left'));
    A1(ctx, q.on('draagkracht', 1, 0.6), () => { ctx.save(); ctx.setLineDash([10, 10]); lijn(ctx, [[x, y - h], [x + w, y - h]], rgba(C.goud, 0.7), 3); ctx.restore(); }); },
});
