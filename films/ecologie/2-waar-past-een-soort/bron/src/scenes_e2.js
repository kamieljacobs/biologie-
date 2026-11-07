// scenes_e2.js — Ecologie v2 · film 2 Waar past een soort? — animatie op de stem (29 okt 2026).
// Elke scène bouwt het goedgekeurde keyframe uit sb2.js op in de maat van de stem (q.on). Hulpfuncties: teken_e2.js.
// helft van het openingsbeeld: Noor in de beek met (of zonder) opgetilde steen
function _e2Half(ctx, x0, helder, t, o = {}) { const { a = 1, steen = 0 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x0, 110, 955, 970); ctx.clip(); ctx.translate(x0, 0);
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 110, 955, 970); vul(ctx, [[-20, 520], [300, 470], [650, 500], [980, 460], [980, 620], [-20, 620]], C.bgMacroHill);
  ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 600, 955, 480); ctx.fillStyle = helder ? E2.helder : E2.troebel; ctx.fillRect(0, 690, 955, 240);
  const p = persoon(ctx, 'noor', 330, 900, 330, { outfit: 'zomer', pose: steen > 0.5 ? 'vasthouden' : 'staan', uit: helder && steen > 0.5 ? 'verbaasd' : 'neutraal', t });
  ctx.fillStyle = helder ? E2.helder : E2.troebel; ctx.fillRect(0, 812, 955, 120); ctx.strokeStyle = helder ? '#7FB0E0' : '#7E9A86'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 812); ctx.lineTo(955, 812); ctx.stroke();
  if (helder) e2Stroom(ctx, 0, 955, 820, 925, t, 160, 8); else e2Zweef(ctx, 0, 955, 820, 925, t, 12);
  let r = null; if (steen > 0.5 && p.handR) { vul(ctx, [[p.handR.x - 26, p.handR.y + 6], [p.handR.x - 18, p.handR.y - 18], [p.handR.x + 20, p.handR.y - 22], [p.handR.x + 30, p.handR.y + 4], [p.handR.x + 4, p.handR.y + 16]], E2.steen, E2.steenL, 2); r = { x: p.handR.x + x0, y: p.handR.y }; }
  ctx.restore(); return r; }
const _e2Ax = 260, _e2Ay = 800, _e2Aw = 1400, _e2Ah = 520;
const _e2Tab = (ctx, kleuren) => e2Tabel(ctx, 300, 240, ['larve', 'zuurstof (mg/l)', 'temperatuur (°C)'], [['steenvlieglarve', '7 – 14', '4 – 18'], ['eendagsvlieglarve', '5 – 14', '4 – 22'], ['rode muggenlarve', '1 – 14', '4 – 30']], { bw: [500, 400, 400], kleuren });
// kettingschakels
function _e2Ketting(ctx, t, zw, extra = {}) { const n = ['temperatuur', 'stroming', 'voedsel', 'zuurstof'];
  n.forEach((naam, i) => { const cx = 360 + i * 400, cy = 460 + 4 * Math.sin(t * 1.5 + i * 0.6), d = i === 3 ? zw : 0; const lw = lerp(34, 6, d) + (extra[naam] || 0);
    ctx.strokeStyle = d > 0.5 ? C.koraal : '#8FA0B5'; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(cx, cy, 190, 90, 0, 0, 6.283); ctx.stroke(); text(ctx, naam, cx, 460 + 170, fTekst(40, 700), d > 0.5 ? C.koraal : C.text, 'center'); }); }
// twee oeverstroken met planten die groeien (g 0..1) en wiegen
function _e2Oevers(ctx, t, g) { e2Split(ctx);
  [[0, 0.35], [965, 1]].forEach(([x0, d], k) => { ctx.save(); ctx.beginPath(); ctx.rect(x0, 110, 955, 790); ctx.clip(); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x0, 110, 955, 790); circ(ctx, x0 + 800, 230, 50, rgba(C.goud, 0.9)); ctx.fillStyle = E2.helder; ctx.fillRect(x0, 760, 955, 140); e2Stroom(ctx, x0, 955, 765, 895, t, 60, 5); vul(ctx, [[x0, 620], [x0 + 955, 600], [x0 + 955, 770], [x0, 770]], '#4A3E30');
    for (let i = 0; i < 14; i++) { const px = x0 + 60 + i * 64, hh = (70 + hash(i * 3 + k) * 60) * (0.4 + d * 0.9) * ease(g * 1.3 - i * 0.02), sw = 5 * Math.sin(t * 1.2 + i * 0.7) * hh / 150; if (hh < 2) continue;
      lijn(ctx, [[px, 620], [px + 3 + sw * 0.5, 620 - hh * 0.5], [px + 6 + sw, 620 - hh]], '#5E9A62', 3 + d * 2); const nb = 2 + Math.round(d * 2); for (let b = 0; b < nb; b++) { const f = 0.35 + 0.6 * b / nb, bx = px + 3 + sw * f, by = 620 - hh * f, kk = b % 2 ? 1 : -1, L = (14 + 10 * d) * (1.1 - f * 0.4); ctx.save(); ctx.translate(bx, by); ctx.rotate(kk * 0.9); ctx.fillStyle = C.groen; ctx.beginPath(); ctx.ellipse(0, -L / 2, L * 0.32, L / 2, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.save(); ctx.translate(px + 6 + sw, 620 - hh); ctx.fillStyle = C.groen; ctx.beginPath(); ctx.ellipse(0, -8, 6, 11, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); });
  text(ctx, 'oever links', 480, 170, fTekst(44, 700), C.text, 'center'); text(ctx, 'oever rechts', 1440, 170, fTekst(44, 700), C.text, 'center'); }
// eik met twee mezen (voorjaar)
function _e2Eikmezen(ctx, t, ap = 1, ak = 1) { e1Macro(ctx, { horizon: 640 }); e2Eik(ctx, 960, 1100, 1.2, {});
  const sw = Math.sin(t * 1.3) * 6; e2Twijg(ctx, [[1260, 420], [1420, 380 + sw * 0.4], [1560, 330 + sw]], 5);
  A2(ctx, ap, () => ecoPimpelmees(ctx, 1480, 360 + sw * 0.6, 12, { houding: 'klampen', rot: 3.0 + 0.06 * Math.sin(t * 1.3 + 0.4) }));
  e2Twijg(ctx, [[960, 640], [740, 600], [560, 560]], 26, E2.stam); A2(ctx, ak, () => e2Koolmees(ctx, 720, 590, 12, { houding: Math.sin(t * 0.9) > 0.6 ? 'pikken' : 'staan' })); }
function _e2Kast(ctx) { e1Macro(ctx, { horizon: 640 }); ctx.fillStyle = E2.stam; ctx.fillRect(840, 0, 240, 1080); ctx.strokeStyle = E2.stamD; ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(860 + i * 32, 0); ctx.lineTo(866 + i * 32 + (i % 2) * 8, 1080); ctx.stroke(); } }
// daglengte en temperatuur over een jaar; warm = 0..1 (warme winter), uT/uD = hoe ver getekend
function _e2Jaar(ctx, warm, uT, uD) { const x = 240, y = 760, w = 1440, h = 460;
  e1As(ctx, x, y, w, h, { xLabel: 'maand', yLabel: '', xt: [[0, 'jan'], [0.25, 'apr'], [0.5, 'jul'], [0.75, 'okt'], [1, 'jan']] });
  const D = [], T = []; for (let i = 0; i <= 120; i++) { const u = i / 120; D.push([x + u * w, y - h * (0.5 - 0.38 * Math.cos(u * 6.283 - 0.33))]);
    T.push([x + u * w, y - h * lerp(0.45 - 0.3 * Math.cos(u * 6.283 - 0.6), 0.6 - 0.25 * Math.cos(u * 6.283 - 0.6), warm) + Math.sin(i * 1.7) * 18 + Math.sin(i * 0.43) * 22 * (1 - warm)]); }
  if (uT > 0.01) lijn(ctx, e2Deel2(T, uT), C.koraal, 4); if (uD > 0.01) lijn(ctx, e2Deel2(D, uD), C.goud, 6); return { x, y, w, h, D, T }; }
// witte sorteerbak op echte maat: ± 40 × 15 cm bij Noor (330 px = 1,60 m → 2,06 px per cm)
function _e2BakKlein(ctx, x, y) { roundRect(ctx, x, y - 28, 82, 28, 6); shape(ctx, E2.bak, '#B8BCC4', 2); ctx.fillStyle = rgba('#A8C8DC', 0.5); ctx.fillRect(x + 5, y - 24, 72, 8); }
function e2Deel2(P, u) { const n = Math.max(2, Math.round(P.length * clamp(u, 0, 1))); return P.slice(0, n); }

Object.assign(SCENES, {
  title(ctx, t) { e2BeekA(ctx, 1340, 560, 260, 320, t, { soort: 'snel', seed: 2 }); e2BeekA(ctx, 1610, 560, 260, 320, t, { soort: 'traag', seed: 5 });
    ecoSteenvlieglarve(ctx, 1470, 830, 6, {}); ecoMuggenlarve(ctx, 1740, 850, 6, { t: t * 0.5 }); },

  // ---------------- Opening
  s01(ctx, t, q) { _bg2(ctx); const st = q.on('tilt', 1, 0.3);
    const p = _e2Half(ctx, 0, true, t, { steen: st }); _e2Half(ctx, 965, false, t, { a: q.on('kilometer', 1, 0.3) }); e2Split(ctx);
    const az = q.on('steenvlieglarve', 1, 0.6); if (p && az > 0.01) zoomCircle(ctx, 720, 420, 170, p.x + 4, p.y + 10, '', az, () => { ctx.fillStyle = E2.steenD; ctx.fillRect(540, 240, 360, 360); ctx.fillStyle = E2.steen; ctx.beginPath(); ctx.ellipse(720, 440, 200, 120, 0, 0, 6.283); ctx.fill();
      ecoSteenvlieglarve(ctx, 650, 440, 70, { houding: 'boven', lopen: true, vooruit: true, t: Math.max(0, t - q.at('steenvlieglarve')) * 0.8 }); });
    naamBij(ctx, 'steenvlieglarve', 'onderkant van de steen · vergroot', 720, 200, az, 'center');
    naamBij(ctx, 'beek A', 'snel · helder', 120, 200, ramp(t, 0.2, 0.5), 'left'); naamBij(ctx, 'beek B', 'traag · troebel', 1440, 200, q.on('kilometer', 1, 0.5), 'center'); A2(ctx, az, () => ecoSchaal(ctx, 'larve ± 2 cm')); },
  s02(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, 955, 790, t, { soort: 'snel', seed: 2 }); e2BeekA(ctx, 965, 110, 955, 790, t, { soort: 'traag', seed: 5 }); e2Split(ctx);
    const az = q.on('slib', 1, 0.8); zoomCircle(ctx, 1440, 460, 230, 1440, 840, 'slib met rode muggenlarven · vergroot', az, () => { ctx.fillStyle = E2.slib; ctx.fillRect(1200, 230, 480, 480);
      [[1330, 380], [1500, 470], [1400, 600], [1560, 340], [1310, 520]].forEach(([x, y], i) => ecoMuggenlarve(ctx, x, y, 30, { houding: i % 2 ? 'rust' : 'zij', t: t * 0.6 + i * 0.3 })); });
    A2(ctx, q.on('nooit', 1, 0.5), () => { roundRect(ctx, 1600, 230, 220, 120, 16); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); ecoSteenvlieglarve(ctx, 1680, 292, 30, { houding: 'boven' }); kruis(ctx, 1770, 290, 26, 1, C.koraal); });
    ecoSteenvlieglarve(ctx, 400, 790, 90, { lopen: true, vooruit: true, t: t * 0.5 }); naamBij(ctx, 'steenvlieglarve', 'vergroot', 480, 640, 1, 'center');
    A2(ctx, q.on('Waarom', 1, 0.6), () => text(ctx, '?', 1440, 160 - 10 * Math.sin(t * 2) * 0, fTitel(96), C.goud, 'center')); },

  // ---------------- H1 Wat is er anders?
  s04(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, W, 790, t, { soort: 'snel', seed: 2 });
    ecoSteenvlieglarve(ctx, 380, 735, 80, { lopen: true, vooruit: true, t: t * 0.4 }); ecoEendagsvlieglarve(ctx, 1150, 690, 110, { t: t * 0.6 }); ecoEikenblad(ctx, 700 + 30 * t, 730 + 8 * Math.sin(t), 3, { hoek: 0.3 + 0.1 * Math.sin(t * 0.7), stadium: 0.3 });
    e2Forel(ctx, 1300 + 120 * Math.sin(t * 0.25), 420 + 10 * Math.sin(t * 0.9), 6, { kijk: Math.cos(t * 0.25) >= 0 ? 1 : -1 });
    naamBij(ctx, 'ecosysteem', 'water · bodem · licht · organismen', 300, 300, q.on('ecosysteem', 1, 0.6), 'left'); naamBij(ctx, 'levensgemeenschap', 'alle populaties samen', 1200, 300, q.on('levensgemeenschap', 1, 0.6), 'left');
    naamBij(ctx, 'habitat', 'onder stenen in stromend water', 430, 640, q.on('habitat', 1, 0.6), 'center'); ecoSchaal(ctx, 'larven vergroot'); },
  s05(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, 955, 790, t, { soort: 'snel', seed: 2 }); e2BeekA(ctx, 965, 110, 955, 790, t, { soort: 'traag', seed: 5 });
    ctx.fillStyle = C.bgSchema; ctx.fillRect(955, 0, 10, H); ctx.fillStyle = C.goud; ctx.fillRect(958.5, 110, 3, (H - 110) * ease(t / 1.5));
    naamBij(ctx, 'beek A', 'snel · koud · helder', 480, 170, 1, 'center'); naamBij(ctx, 'beek B', 'traag · warm · troebel', 1440, 170, 1, 'center');
    const aL = q.on('Links', 1, 0.5), aR = q.on('Rechts', 1, 0.5);
    A2(ctx, aL, () => { ecoSteenvlieglarve(ctx, 220, 735, 70, { lopen: true, vooruit: true, t: t * 0.4 }); ecoEendagsvlieglarve(ctx, 640, 650, 100, { t: t * 0.6 }); e2Forel(ctx, 560 + 60 * Math.sin(t * 0.3), 440 + 8 * Math.sin(t), 5, {}); });
    A2(ctx, aR, () => { [[1130, 760], [1330, 790], [1530, 765], [1730, 800]].forEach(([x, y], i) => ecoMuggenlarve(ctx, x, y, 70, { houding: i % 2 ? 'rust' : 'zij', t: t * 0.5 + i * 0.25 }));
      const k = 6 * Math.sin(t * 2); lijn(ctx, [[1700, 800], [1730, 780 + k], [1760, 805 - k], [1790, 785 + k]], '#C88A7A', 4); });
    naamBij(ctx, 'steenvlieg- en eendagsvlieglarven', 'forel', 420, 330, aL, 'center'); naamBij(ctx, 'rode muggenlarven', 'slijkwormen', 1440, 330, aR, 'center'); ecoSchaal(ctx, 'larven vergroot'); },
  s06(ctx, t, q) { _bg2(ctx); e2Split(ctx); _hl(ctx, 'beek A', 480); _hl(ctx, 'beek B', 1440);
    const M = [['temperatuur', 0.25, 0.65, '12 °C', '20 °C', 'warmer'], ['stroming', 0.85, 0.15, 'snel', 'traag', 'trager'], ['zuurstof', 0.83, 0.25, '10 mg/l', '3 mg/l', 'minder']], am = q.on('niet-levende', 1, 0.6);
    M.forEach(([n, a, b, wa, wb, c], i) => { const u = q.on(c, 1, 1.2); A2(ctx, am, () => { e2Meter(ctx, 140, 320 + i * 170, 680, { naam: n, v: a, kleur: C.teal, waarde: wa }); e2Meter(ctx, 1100, 320 + i * 170, 680, { naam: n, v: lerp(a, b, u), kleur: u > 0.5 ? C.koraal : C.teal, waarde: u > 0.5 ? wb : wa }); }); });
    haak(ctx, 140, 1780, 790, 'abiotische factoren: niet-levend', C.goud, q.on('abiotische', 1, 0.6)); },
  s07(ctx, t, q) { _bg2(ctx); const ag = q.on('warm', 1, 0.6);
    A2(ctx, ag, () => { [[300, 24, 'koud', 1], [640, 8, 'warm', 2]].forEach(([x, n, l, sd]) => { ctx.fillStyle = rgba(C.teal, 0.25); ctx.fillRect(x, 700 - 255, 200, 255); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x, 700); ctx.lineTo(x + 200, 700); ctx.lineTo(x + 200, 400); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.rect(x + 6, 450, 188, 245); ctx.clip(); e2BolAnim(ctx, x + 14, 460, 172, 230, n, t, sd); ctx.restore(); text(ctx, l, x + 100, 752, fTekst(40, 700), C.text, 'center'); }); });
    naamBij(ctx, 'zuurstof', 'opgelost in water', 470, 330, ag, 'center');
    const as = q.on('snel', 1, 0.8), x0 = 1020; A2(ctx, as, () => { ctx.fillStyle = E2.helder; ctx.fillRect(x0, 420, 760, 220); [0, 1, 2].forEach(i => vul(ctx, [[x0 + 120 + i * 240, 640], [x0 + 200 + i * 240, 560], [x0 + 280 + i * 240, 640]], E2.steen));
      e2Stroom(ctx, x0, 760, 440, 600, t, 220, 10); ctx.strokeStyle = '#E8F2FA'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const ph = (t * 2 + i) % 6.283; ctx.beginPath(); ctx.arc(x0 + 160 + i * 110 + 6 * Math.sin(ph), 430, 26, Math.PI, 0); ctx.stroke(); }
      for (let i = 0; i < 20; i++) { const u = ((t * 0.35 + hash(i * 3.1)) % 1), bx = x0 + 60 + hash(i * 5.3) * 640 + u * 60, by = 432 + u * 170; A2(ctx, Math.sin(Math.PI * u), () => circ(ctx, bx, by, 7, rgba(C.teal, 0.85), _lt(C.teal, 0.3), 1.5)); } });
    naamBij(ctx, 'stroomversnelling', 'lucht wordt het water in gemengd', x0 + 380, 360, as, 'center');
    A2(ctx, q.on('bacteriën', 1, 0.6), () => { for (let i = 0; i < 6; i++) { const d = wander(i + 9, t, 12, 0.6); ctx.save(); ctx.translate(670 + hash(i * 2.2) * 140 + d.x, 500 + hash(i * 4.4) * 160 + d.y); ctx.rotate(hash(i) * 3); roundRect(ctx, -12, -5, 24, 10, 5); shape(ctx, '#B8A880'); ctx.restore(); } metaText(ctx, 'bacteriën verbruiken zuurstof', 740, 810, C.text2, 'center', 24); }); },
  s08(ctx, t, q) { _bg2(ctx); e2Split(ctx); _hl(ctx, 'beek A', 480); _hl(ctx, 'beek B', 1440);
    const ik = [['voedsel', 'bladafval', 'voedsel'], ['rover', 'forel', 'rovers'], ['concurrent', 'andere larven', 'concurrenten'], ['parasiet', '', 'parasieten']];
    ik.forEach(([n, m, c], i) => { const a = q.on(c, 1, 0.5); naamBij(ctx, n, m, 160 + (i % 2) * 380, 360 + Math.floor(i / 2) * 200, a, 'left'); naamBij(ctx, n, m, 1120 + (i % 2) * 380, 360 + Math.floor(i / 2) * 200, a, 'left'); });
    A2(ctx, q.on('voedsel', 1, 0.5), () => ecoEikenblad(ctx, 400, 330, 2.4, { stadium: 0.3, hoek: 0.15 * Math.sin(t) })); A2(ctx, q.on('rovers', 1, 0.5), () => e2Forel(ctx, 820 + 20 * Math.sin(t * 0.8), 330, 3, {}));
    const am = q.on('mens', 1, 0.5); A2(ctx, am, () => { roundRect(ctx, 1500, 700, 240, 60, 20); shape(ctx, '#7A7F88', '#5A606A', 2); });
    A2(ctx, q.on('loost', 1, 0.6), () => { ctx.fillStyle = rgba('#8A7A5A', 0.8); ctx.beginPath(); ctx.moveTo(1740, 715); ctx.quadraticCurveTo(1800, 740, 1790, 850); ctx.lineTo(1760, 850); ctx.quadraticCurveTo(1770, 760, 1740, 745); ctx.fill();
      for (let i = 0; i < 5; i++) { const u = (t * 0.6 + i / 5) % 1; circ(ctx, 1770 + 10 * u, 730 + u * 120, 6, rgba('#A89A70', 0.9)); } });
    naamBij(ctx, 'de mens', 'loost afvalwater · verandert zuurstof', 1180, 640, am, 'left'); haak(ctx, 140, 1780, 820, 'biotische factoren: van andere organismen', C.groen, q.on('biotische', 1, 0.6)); },
  s09(ctx, t, q) { _bg2(ctx); const r = e2BeekA(ctx, 0, 110, W, 790, t, { soort: 'snel', seed: 7 });
    const fx = lerp(2150, 900, ease(t / 4.5)) - Math.max(0, t - 4.5) * 30; e2Forel(ctx, fx, 480 + 10 * Math.sin(t * 1.1), 14, { kijk: -1 });
    naamBij(ctx, 'beekforel', 'rover · biotische factor', fx, 330, q.on('forellen', 1, 0.6), 'center');
    const tk = q.at('kruipt'), lt = Math.max(0, t - tk) * 1.2, lx = 1330 + Math.min(260, 0.35 * 40 * lt); ecoSteenvlieglarve(ctx, lx, 772, 40, { lopen: t > tk && lx < 1590, t: lt });
    const sx = 0.82 * W, sy = r.by + 4, rw = 0.06, rh = 0.07, w = W, h = 790; vul(ctx, [[sx - rw * w, sy], [sx - rw * w * 0.8, sy - rh * h], [sx - rw * w * 0.1, sy - rh * h * 1.35], [sx + rw * w * 0.7, sy - rh * h * 1.05], [sx + rw * w, sy]], E2.steen, E2.steenL, 1.5);
    naamBij(ctx, 'steenvlieglarve', 'kruipt weg onder de steen', 1450, 660, q.on('kruipt', 1, 0.6), 'center'); ecoSchaal(ctx, 'forel ± 30 cm · larve vergroot'); },
  s10(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, 955, 790, t, { soort: 'snel', seed: 2 }); e2BeekA(ctx, 965, 110, 955, 790, t, { soort: 'traag', seed: 5 }); e2Split(ctx);
    [[100, 330, 0], [520, 520, 1], [1080, 360, 2], [1500, 560, 3]].forEach(([x, y, i]) => { const v = x < 955 ? 40 : 10, x0 = x < 955 ? 0 : 965, xx = x0 + ((x - x0 + v * t) % 955); ctx.save(); ctx.beginPath(); ctx.rect(x0, 110, 955, 790); ctx.clip(); ecoEikenblad(ctx, xx, y + 6 * Math.sin(t + i), 6, { stadium: 0.2 + i * 0.1, hoek: 0.4 * Math.sin(t * 0.5 + i) }); ctx.restore(); }); },
  s12(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, W, 790, t, { soort: 'snel', seed: 9, stenen: false });
    const tk = q.at('knagen'), st = 0.45 + 0.35 * clamp((t - tk) / 6, 0, 1); ecoEikenblad(ctx, 900, 720, 12, { stadium: st, hoek: 0.2 });
    ecoSteenvlieglarve(ctx, 1240 - 12 * Math.max(0, Math.sin(t * 2.2)), 760, 90, { kijk: -1 });
    naamBij(ctx, 'dood blad = voedsel', 'telt als biotische factor', 960, 470, q.on('voedsel', 1, 0.6), 'center');
    A2(ctx, q.on('Abiotisch', 1, 0.6), () => metaText(ctx, 'abiotisch: temperatuur · licht · zuurstof · stroming', 960, 300, C.text2, 'center', 26)); ecoSchaal(ctx, 'larve vergroot'); },

  // ---------------- H2 Binnen de grenzen
  s13(ctx, t, q) { _bg2(ctx); const x = _e2Ax, y = _e2Ay, w = _e2Aw, h = _e2Ah; _e2As(ctx, x, y, w, h);
    e2KrommeU(ctx, x, y, w, h, q.on('zuurstof', 1, 2.5), { min: _u(6), max: _u(13.5), opt: _u(10.5) });
    const am = q.on('minimumtolerantiegrens', 1, 0.6); A2(ctx, am, () => e2Vlijn(ctx, x + _u(6) * w, y, y - h * 0.55, C.line, '')); naamBij(ctx, 'minimumtolerantiegrens', '', x + _u(6) * w - 20, y - h * 0.3, am, 'right');
    A2(ctx, q.on('maximumtolerantiegrens', 1, 0.6), () => { pijl(ctx, x + w - 60, y - h * 0.15, x + w + 40, y - h * 0.15, C.line, 1, 3, 14); metaText(ctx, 'maximumgrens: verder rechts', x + w + 40, y - h * 0.15 - 24, C.text2, 'right', 22); });
    const ao = q.on('optimum', 1, 0.6); A2(ctx, ao, () => { e2Vlijn(ctx, x + _u(10.5) * w, y, y - h * 1.02, C.goud, ''); text(ctx, 'optimum', x + _u(10.5) * w + 20, y - h * 0.8, fTekst(36, 700), C.goud, 'left'); });
    const ag = q.on('tolerantiegebied', 1, 0.6); haak(ctx, x + _u(6) * w, x + _u(13.5) * w, y - h - 110, '', C.groen, ag); A2(ctx, ag, () => text(ctx, 'tolerantiegebied', x + _u(6) * w - 20, y - h - 80, fTekst(36, 700), C.groen, 'right'));
    naamBij(ctx, 'optimumkromme', 'steenvlieglarve · zuurstof', 400, 360, q.on('optimumkromme', 1, 0.6), 'left'); ecoSchaal(ctx, 'model · voorbeeldwaarden'); },
  s14(ctx, t, q) { _bg2(ctx); const x = _e2Ax, y = _e2Ay, w = _e2Aw, h = _e2Ah; _e2As(ctx, x, y, w, h); e2Kromme(ctx, x, y, w, h, { min: _u(6), max: _u(13.5), opt: _u(10.5) });
    const a = q.on('tien', 1, 1.0), b = q.on('drie', 1, 1.0);
    if (a > 0.01) { e2Vlijn(ctx, x + _u(10) * w, y, lerp(y, y - h - 20, a), C.teal, a > 0.95 ? 'beek A · 10 mg/l' : '', { dash: [] }); A2(ctx, q.on('optimum', 1, 0.6), () => circ(ctx, x + _u(10) * w, y - h * 0.98, 14 + 3 * Math.sin(t * 3), null, C.goud, 4)); }
    if (b > 0.01) e2Vlijn(ctx, x + _u(3) * w, y, lerp(y, y - h * 0.5, b), C.koraal, b > 0.95 ? 'beek B · 3 mg/l' : '', { dash: [] });
    A2(ctx, q.on('minimumgrens', 1, 0.6), () => text(ctx, 'onder de minimumgrens', x + _u(3) * w, y - h * 0.5 - 70, fTekst(36, 600), C.koraal, 'center')); ecoSchaal(ctx, 'voorbeeldwaarden'); },
  s15(ctx, t, q) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); const ak = q.on('ademt', 1, 0.8), st = q.on('stilstaand', 1, 1.0), v = lerp(1, 0.12, st);
    ecoSteenvlieglarve(ctx, 360, 660, 30, { houding: 'boven' });
    zoomCircle(ctx, 1100, 480, 330, 360, 640, 'onderkant · vergroot', ak, () => { ctx.fillStyle = rgba(st > 0.5 ? E2.troebel : E2.helder, 0.5); ctx.fillRect(770, 150, 660, 660); e2Kieuwen(ctx, 1100, 480, 260);
      const n = Math.round(lerp(14, 4, st)); for (let i = 0; i < n; i++) { const u = (t * 0.25 * v + hash(i * 2.9)) % 1; circ(ctx, 780 + u * 640, 220 + hash(i * 5.1) * 520 + 10 * Math.sin(t + i), 7, rgba(C.teal, 0.85), _lt(C.teal, 0.3), 1.5); }
      A2(ctx, q.on('stroomt', 1, 0.6) * (1 - st), () => { for (let i = 0; i < 4; i++) { const o = (t * 60) % 110; pijl(ctx, 790 + o, 260 + i * 140, 900 + o, 260 + i * 140, rgba(C.teal, 0.8), 1, 4, 14); } }); });
    naamBij(ctx, 'kieuwbosjes', 'onder het borststuk', 1560, 300, ak, 'left'); },
  s16(ctx, t, q) { _bg2(ctx); const x = _e2Ax, y = _e2Ay, w = _e2Aw, h = _e2Ah; _e2As(ctx, x, y, w, h, 'zuurstof (mg per liter)', ''); metaText(ctx, 'groei en overleving', x, y - h - 90, C.text2, 'left', 28);
    e2Kromme(ctx, x, y, w, h, { min: _u(6), max: _u(13.5), opt: _u(10.5), a: 0.5 }); const ab = q.on('bredere', 1, 1.6);
    if (ab > 0.01) e2Kromme(ctx, x, y, w, h, { min: _u(0.6), max: _u(13.5), opt: _u(7), kleur: C.koraal, piek: 0.75 * ab });
    e2Vlijn(ctx, x + _u(10) * w, y, y - h - 20, C.teal, 'A'); e2Vlijn(ctx, x + _u(3) * w, y, y - h - 20, C.teal, 'B');
    naamBij(ctx, 'rode muggenlarve', 'brede tolerantie · hemoglobine', x + _u(6.6) * w, y - h * 0.86, q.on('hemoglobine', 1, 0.6), 'center'); naamBij(ctx, 'steenvlieglarve', 'smal', x + _u(12.4) * w, y - h * 1.04, 0.8, 'center');
    A2(ctx, q.on('muggenlarve', 1, 0.6), () => ecoMuggenlarve(ctx, 420, 300, 50, { t: t * 0.6 }));
    A2(ctx, q.on('beide', 1, 0.6), () => { [3, 10].forEach(m => circ(ctx, x + _u(m) * w, y - h * 0.75 * (m === 3 ? 0.62 : 0.86), 12, C.koraal, C.bgSchema, 3)); }); ecoSchaal(ctx, 'model · voorbeeldwaarden'); },
  s17(ctx, t, q) { _bg2(ctx); const F = [['zuurstof', 0.35, 0.9, 0.7, 0.2, 'Zo'], ['temperatuur', 0.1, 0.6, 0.35, 0.8, 'temperatuur'], ['stroming', 0.4, 1.0, 0.8, 0.12, 'stroming']], ab = q.on('warm', 1, 1.0);
    F.forEach(([n, mi, ma, op, b, c], i) => { const x = 140 + i * 590, y = 720, w = 480, h = 330, a = q.on(c, 1, 0.8); if (a <= 0.01) return;
      A2(ctx, a, () => e1As(ctx, x, y, w, h, { xLabel: n, yLabel: '' })); e2KrommeU(ctx, x, y, w, h, a, { min: mi, max: ma, opt: op });
      const uit = b < mi || b > ma; if (ab > 0.01) e2Vlijn(ctx, x + b * w, y, lerp(y, y - h - 10, ab), uit ? C.koraal : C.teal, ab > 0.95 ? (uit ? 'B buiten' : 'B') : '', { dash: [] }); });
    haak(ctx, 140, 1760, 860, 'alle factoren moeten binnen de grenzen liggen', C.groen, q.on('alle', 1, 0.6)); },
  s18(ctx, t, q) { e1Macro(ctx, { horizon: 500 }); ctx.fillStyle = E2.helder; ctx.fillRect(0, 560, W, 120); e2Stroom(ctx, 0, W, 565, 675, t, 120, 8); e1Oever(ctx, 676, { golf: 5 });
    persoon(ctx, 'noor', 760, 880, 330, { outfit: 'zomer', uit: 'blij', pose: q.on('indicatorsoort', 1, 0.3) > 0.5 ? 'wijs' : 'staan', t });
    _e2BakKlein(ctx, 850, 880); // witte bak op echte maat (± 40 cm) aan haar voeten
    const L = [['s', 0.2, 0.5, 'steenvlieglarven'], ['e', 0.5, 0.35, 'steenvlieglarven'], ['e', 0.62, 0.72, 'steenvlieglarven'], ['m', 0.84, 0.45, 'muggenlarve']], ai = q.on('indicatorsoort', 1, 0.6);
    zoomCircle(ctx, 1380, 430, 300, 891, 866, 'witte bak · larven vergroot', ramp(t, 0.2, 0.6), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1080, 130, 600, 600); e2Bak(ctx, 1110, 280, 540, 300, 22, { larven: [] });
      L.forEach(([k, u, v, c], i) => { const a = ramp(t, q.at(c) + i * 0.4, 0.4); if (a <= 0.01) return; const lx = 1110 + u * 540 + 8 * Math.sin(t * 0.7 + i), ly = 280 + v * 300;
        A2(ctx, a, () => { if (k === 's') ecoSteenvlieglarve(ctx, lx, ly, 22, { houding: 'boven' }); else if (k === 'e') ecoEendagsvlieglarve(ctx, lx, ly, 22, { houding: 'boven', t: t * 0.6 }); else ecoMuggenlarve(ctx, lx, ly, 22, { houding: 'boven', t: t * 0.6 }); }); });
      A2(ctx, ai, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1110 + 0.2 * 540, 280 + 0.5 * 300, 70, 0, 6.283); ctx.stroke(); }); });
    naamBij(ctx, 'indicatorsoort', 'steenvlieglarve: smalle tolerantie', 1380, 90, ai, 'center'); ecoSchaal(ctx, 'larven ± 1 tot 2 cm · vergroot'); },
  s19(ctx, t, q) { _bg2(ctx); const at = q.on('tabel', 1, 0.5), t3 = q.at('drie');
    A2clip(ctx, at, 0, 230, W, 80, () => _e2Tab(ctx)); [0, 1, 2].forEach(i => A2clip(ctx, ramp(t, t3 + i * 0.5, 0.5), 0, 240 + 74 * (i + 1) - 4, W, 74, () => _e2Tab(ctx)));
    const yy = 240 + 74 * 4; A2(ctx, q.on('derde', 1, 0.6), () => { roundRect(ctx, 300, yy + 60, 1290, 100, 16); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); text(ctx, 'beek C:  6 mg zuurstof per liter  ·  19 °C', 945, yy + 125, fTekst(44, 700), C.goud, 'center'); });
    A2(ctx, at, () => metaText(ctx, 'voorbeeldwaarden', 300, yy + 210, C.text2, 'left', 26)); },
  s20(ctx, t, q) { SCENES.s19(ctx, t, ALLES2); },
  s22(ctx, t, q) { _bg2(ctx); const R = C.koraal, G = C.groen; const yy = _e2Tab(ctx);
    const cel = (r, c, a, kl) => { const K = [[null, null, null], [null, null, null], [null, null, null]]; K[r][c] = kl; A2clip(ctx, a, c === 1 ? 800 : 1200, 240 + 74 * (r + 1), 400, 74, () => _e2Tab(ctx, K)); };
    cel(0, 1, q.on('zes', 1, 0.6), R); cel(0, 2, q.on('Negentien', 1, 0.6), R); const ag = q.on('eendagsvlieglarve', 1, 0.6); [1, 2].forEach(r => [1, 2].forEach(c => cel(r, c, ramp(t, q.at('eendagsvlieglarve') + (r - 1) * 0.6, 0.6), G)));
    text(ctx, 'beek C:  6 mg/l  ·  19 °C', 945, yy + 90, fTekst(44, 700), C.goud, 'center'); haak(ctx, 300, 1590, yy + 130, 'één factor buiten de grens is genoeg', C.koraal, q.on('buiten', 1, 0.6)); },

  // ---------------- H3 De zwakste schakel
  s23(ctx, t, q) { _bg2(ctx); const zw = q.on('beperkende', 1, 1.5), av = q.on('voedsel', 1, 0.6);
    _e2Ketting(ctx, t, zw, { voedsel: 10 * av * (0.5 + 0.5 * Math.sin(t * 3)) });
    naamBij(ctx, 'beperkende factor', 'steenvlieglarve in beek B: zuurstof', 960, 260, q.on('beperkende', 1, 0.6), 'center');
    A2(ctx, av, () => kruis(ctx, 1160, 340, 22, 1, C.koraal)); },
  s24(ctx, t, q) { _bg2(ctx); _e2Oevers(ctx, t, clamp(t / 4, 0, 1)); A2(ctx, q.on('zon', 1, 0.6), () => metaText(ctx, 'evenveel zon · evenveel water', 80, 880, C.text2, 'left', 26)); },
  s25(ctx, t, q) { _bg2(ctx); _e2Oevers(ctx, t, 1); metaText(ctx, 'evenveel zon · evenveel water', 80, 880, C.text2, 'left', 26); },
  s27(ctx, t, q) { _bg2(ctx); const ag = q.on('toevoegt', 1, 2.0), sk = lerp(0.42, 0.8, ag);
    const D = [['licht', 0.92], ['water', 0.88], ['kalium', 0.76], ['stikstof', sk], ['fosfaat', 0.64]]; e2Ton(ctx, 560, 860, 800, 620, D);
    naamBij(ctx, 'wet van het minimum', 'de kortste duig bepaalt het niveau', 1460, 400, q.on('minimum', 1, 0.6), 'left');
    naamBij(ctx, 'beperkende factor', sk < 0.64 ? 'hier: stikstof' : 'nu: fosfaat', 1460, 560, q.on('beperkende', 1, 0.6), 'left'); },
  s28(ctx, t, q) { _bg2(ctx); ctx.fillStyle = E2.helder; ctx.fillRect(300, 200, 1320, 660); e2Stroom(ctx, 300, 1320, 210, 300, t, 40, 6);
    const al = q.on('Dieper', 1, 1.2); for (let i = 0; i < 6; i++) { ctx.fillStyle = rgba(C.goud, (0.3 - i * 0.05) * (0.35 + 0.65 * al)); ctx.fillRect(300, 200 + i * 110, 1320, 110); }
    ctx.fillStyle = E2.slib; ctx.beginPath(); ctx.moveTo(300, 320); ctx.lineTo(1620, 820); ctx.lineTo(1620, 860); ctx.lineTo(300, 860); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 40; i++) { const u = hash(i * 3.3); const bx = 330 + u * 1260, by = 320 + (bx - 300) / 1320 * 500; if (hash(i * 7.1) < u * 1.05) continue; const hh = 70 * (1 - u * 0.8), s = 6 * Math.sin(t * 1.1 + i) * (1 - u * 0.5);
      lijn(ctx, [[bx, by], [bx - 8 + s * 0.5, by - hh * 0.5], [bx + 4 + s, by - hh]], C.groen, 5); lijn(ctx, [[bx, by], [bx + 10 + s * 0.7, by - hh * 0.6]], C.groen, 4); }
    metaText(ctx, 'ondiep', 280, 260, C.text2, 'right', 28); metaText(ctx, 'diep', 280, 840, C.text2, 'right', 28); naamBij(ctx, 'licht', 'neemt af met de diepte', 1620, 160, al, 'right'); naamBij(ctx, 'wieren', 'dicht waar het ondiep is · ijl in de diepte', 900, 820, q.on('Wieren', 1, 0.6), 'center'); },

  // ---------------- H4 Eén boom, twee mezen
  s29(ctx, t, q) { const ak = q.on('koolmees', 1, 0.4), ap = q.on('pimpelmees', 1, 0.4); _e2Eikmezen(ctx, t, ap, ak);
    naamBij(ctx, 'pimpelmees', 'dunne buitentwijg', 1480, 250, ap, 'center'); naamBij(ctx, 'koolmees', 'dikke tak', 700, 470, ak, 'center'); naamBij(ctx, 'zelfde habitat', '', 960, 850, q.on('habitat', 1, 0.6), 'center'); ecoSchaal(ctx, 'mezen vergroot'); },
  s30(ctx, t, q) { _e2Eikmezen(ctx, t); naamBij(ctx, 'pimpelmees', 'dunne buitentwijg', 1480, 250, 1, 'center'); naamBij(ctx, 'koolmees', 'dikke tak', 700, 470, 1, 'center'); ecoSchaal(ctx, 'mezen vergroot'); },
  s32(ctx, t, q) { _bg2(ctx); const P1 = '#C9B896', P2 = C.okerD, P3 = C.teal;
    const te = q.at('Elk'), ts = q.at('Samen'), ta = q.at('andere'), u1 = clamp((t - te) / 4, 0, 1), u3 = clamp((t - ts) / 5, 0, 1), u4 = clamp((t - ta) / 4, 0, 1);
    A2(ctx, ramp(t, Math.min(te, 1.5), 0.6), () => { e2BuisA(ctx, 300, 880, 300, { soorten: [[9, P1, 'boven']], titel: 'soort 1 alleen', lijnen: [[P1]], u: u1, t }); e2BuisA(ctx, 720, 880, 300, { soorten: [[9, P2, 'boven']], titel: 'soort 2 alleen', lijnen: [[P2]], u: u1, t }); });
    A2(ctx, q.on('Samen', 1, 0.6), () => e2BuisA(ctx, 1140, 880, 300, { soorten: [[10, P1, 'boven'], [9, P2, 'boven', 'weg']], titel: 'samen', lijnen: [[P1], [P2, 'weg']], u: u3, t }));
    A2(ctx, q.on('andere', 1, 0.6), () => e2BuisA(ctx, 1560, 880, 300, { soorten: [[7, P1, 'boven'], [6, P3, 'onder']], titel: 'andere voedselplek', lijnen: [[P1], [P3]], u: u4, t }));
    naamBij(ctx, 'concurrentie-uitsluitingsprincipe', 'pantoffeldiertjes · gause, jaren 1930', 960, 210, q.on('concurrentie-uitsluitingsprincipe', 1, 0.6), 'center'); },
  s33(ctx, t, q) { _bg2(ctx); e2Split(ctx); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 110, 955, 790); ctx.fillRect(965, 110, 955, 790); const sw = 5 * Math.sin(t * 1.4);
    e2Twijg(ctx, [[60, 300], [300, 340], [560, 330 + sw * 0.5], [860, 380 + sw]], 6); e2Twijg(ctx, [[300, 340], [420, 420 + sw * 0.5], [520, 470 + sw]], 4);
    const ap = q.on('pimpelmees', 1, 0.4); A2(ctx, ap, () => ecoPimpelmees(ctx, 440, 430 + sw * 0.6, 11, { houding: 'klampen', rot: 2.9 + 0.05 * Math.sin(t * 1.4) }));
    A2(ctx, q.on('kleinere', 1, 0.5), () => e2Rups(ctx, 610, 360 + sw * 0.4, 50, '#7FA85A', 0.05 * Math.sin(t * 2))); A2(ctx, q.on('spinnen', 1, 0.5), () => { lijn(ctx, [[760, 330], [760, 420 + 10 * Math.sin(t)]], 'rgba(220,220,220,0.5)', 1); e2Spin(ctx, 760, 430 + 10 * Math.sin(t), 16); });
    e2Twijg(ctx, [[980, 400], [1400, 380], [1900, 420]], 30, E2.stam); const ak = q.on('koolmees', 1, 0.4); A2(ctx, ak, () => e2Koolmees(ctx, 1300, 382, 11, { houding: Math.sin(t * 1.1) > 0.5 ? 'pikken' : 'staan' }));
    A2(ctx, q.on('grotere', 1, 0.5), () => e2Rups(ctx, 1540, 360, 90, '#6E9A4E', 0.04 * Math.sin(t * 1.6)));
    ctx.fillStyle = C.bgMacroFront; ctx.fillRect(965, 780, 955, 120); A2(ctx, q.on('grond', 1, 0.5), () => { const hx = 1600 + 30 * Math.sin(t * 0.8); e2Koolmees(ctx, hx, 800, 8, { houding: Math.sin(t * 2) > 0 ? 'pikken' : 'staan' }); vul(ctx, [[1720, 800], [1736, 776], [1752, 800]], '#8A6A4A'); });
    naamBij(ctx, 'pimpelmees', 'dunne twijgen · kleine prooi', 480, 220, ap, 'center'); naamBij(ctx, 'koolmees', 'grote rupsen · ook op de grond', 1440, 220, ak, 'center');
    haak(ctx, 100, 1820, 820, 'zelfde habitat, andere niche', C.groen, q.on('Zelfde', 1, 0.6)); },
  s34(ctx, t, q) { _e2Kast(ctx); e2Nestkast(ctx, 960, 620, 14, 28); lijn(ctx, [[1080, 760], [1500, 750]], E2.stamD, 16);
    e2Koolmees(ctx, 1320, 752, 14, { kijk: -1, houding: Math.sin(t * 0.9) > 0.7 ? 'pikken' : 'staan' });
    const tp = q.at('opening'); let px, py, a = 1; if (t < tp) { px = 1350 + 90 * Math.cos(t * 0.7); py = 420 + 40 * Math.sin(t * 1.1); } else { const u = ease((t - tp) / 1.6); px = lerp(1350 + 90 * Math.cos(tp * 0.7), 990, u); py = lerp(420 + 40 * Math.sin(tp * 1.1), 410, u); a = 1 - ramp(t, tp + 1.4, 0.3); }
    A2(ctx, a, () => ecoPimpelmees(ctx, px, py + 60, 14, { houding: 'vliegen', t: t * 3, kijk: -1 }));
    naamBij(ctx, 'invlieggat 28 mm', 'koolmees past er niet door', 815, 400, q.on('achtentwintig', 1, 0.6), 'right'); naamBij(ctx, 'interspecifieke concurrentie', 'om nestholtes', 1400, 300, q.on('interspecifieke', 1, 0.6), 'left'); },
  s35(ctx, t, q) { _bg2(ctx); const d = 4 * Math.sin(t * 1.2);
    circ(ctx, 600 - d, 500, 260, rgba(C.teal, 0.25), C.teal, 4); circ(ctx, 1320 + d, 500, 260, rgba(C.okerD, 0.25), C.okerD, 4);
    text(ctx, 'niche pimpelmees', 600, 510, fTekst(40, 700), C.text, 'center'); text(ctx, 'niche koolmees', 1320, 510, fTekst(40, 700), C.text, 'center'); },
  s37(ctx, t, q) { _bg2(ctx); const u = q.on('overlappen', 1, 2.5), xa = lerp(600, 760, u), xb = lerp(1320, 1160, u), r = lerp(260, 300, u);
    circ(ctx, xa, 500, r, rgba(C.teal, 0.25), C.teal, 4); circ(ctx, xb, 500, r, rgba(C.okerD, 0.25), C.okerD, 4);
    if (u > 0.3) { ctx.save(); ctx.beginPath(); ctx.arc(xa, 500, r, 0, 6.283); ctx.clip(); circ(ctx, xb, 500, r, rgba(C.koraal, 0.45 * ramp(u, 0.3, 0.7))); ctx.restore(); }
    text(ctx, 'niche pimpelmees', xa - 160, 500, fTekst(40, 700), C.text, 'center'); text(ctx, 'niche koolmees', xb + 160, 500, fTekst(40, 700), C.text, 'center');
    A2(ctx, q.on('nestholtes', 1, 0.6), () => text(ctx, 'nestholtes', 960, 470, fTekst(36, 700), C.text, 'center')); A2(ctx, q.on('rupsen', 1, 0.6), () => text(ctx, 'rupsen', 960, 530, fTekst(36, 700), C.text, 'center'));
    naamBij(ctx, 'overlap = concurrentie', '', 960, 880, q.on('feller', 1, 0.6), 'center'); },
  s38(ctx, t, q) { _e2Kast(ctx); e2Nestkast(ctx, 960, 620, 14, 32); lijn(ctx, [[840, 700], [600, 690]], E2.stamD, 14); lijn(ctx, [[1080, 700], [1320, 690]], E2.stamD, 14);
    const ak = q.on('koolmezen', 1, 0.4), dx = 30 * Math.max(0, Math.sin(t * 1.6)); A2(ctx, ak, () => { e2Koolmees(ctx, 700 + dx, 692, 12, { houding: Math.sin(t * 1.6) > 0.3 ? 'schuin' : 'staan' }); e2Koolmees(ctx, 1220 - dx, 692, 12, { kijk: -1, houding: Math.sin(t * 1.6) > 0.3 ? 'schuin' : 'staan' }); });
    naamBij(ctx, 'intraspecifieke concurrentie', 'zelfde soort · zelfde niche', 500, 250, q.on('intraspecifieke', 1, 0.6), 'center');
    const ah = q.on('helemaal', 1, 1.5); A2(ctx, q.on('helemaal', 1, 0.4), () => { const o = lerp(70, 0, ah); circ(ctx, 1560 - o, 380, 90, rgba(C.okerD, 0.25), C.okerD, 3); circ(ctx, 1560 + o, 380, 90, rgba(C.koraal, 0.35), C.okerD, 3); metaText(ctx, 'niches overlappen helemaal', 1560, 510, C.text2, 'center', 22); }); },
  s39(ctx, t, q) { e1Macro(ctx, { horizon: 640 }); const sw = 6 * Math.sin(t * 1.2); e2Twijg(ctx, [[200, 260], [700, 330 + sw * 0.6], [1100, 300 + sw]], 6);
    ecoPimpelmees(ctx, 620, 420 + sw * 0.6, 30, { houding: 'klampen', rot: 3.0 + 0.04 * Math.sin(t * 1.2) });
    zoomCircle(ctx, 1450, 560, 260, 1450, 560, 'steenvlieglarve · plat in de stroming', q.on('steenvlieglarve', 1, 0.6), () => { ctx.fillStyle = E2.helder; ctx.fillRect(1190, 300, 520, 520); vul(ctx, [[1190, 700], [1300, 610], [1600, 600], [1710, 700], [1710, 820], [1190, 820]], E2.steen);
      ecoSteenvlieglarve(ctx, 1450, 604, 100, {}); for (let i = 0; i < 4; i++) { const o = (t * 90 + i * 30) % 160; pijl(ctx, 1200 + o, 420 + i * 45, 1320 + o, 420 + i * 45, rgba('#9ACBEA', 0.8), 1, 4, 14); } });
    naamBij(ctx, 'adaptatie', 'erfelijk · ontstaan door natuurlijke selectie', 600, 800, q.on('adaptaties', 1, 0.6), 'center'); },
  s40(ctx, t, q) { _bg2(ctx); const x = 260, y = 780, w = 1400, h = 480;
    e1As(ctx, x, y, w, h, { xLabel: 'watertemperatuur (°C)', yLabel: 'overleving', xt: [[0, '0'], [0.5, '15'], [1, '30']] });
    const s = q.on('schuift', 1, 2.5); e2Kromme(ctx, x, y, w, h, { min: 0.1, max: 0.62, opt: 0.38, a: s > 0.01 ? 0.4 : 1 }); if (s > 0.01) e2Kromme(ctx, x, y, w, h, { min: lerp(0.1, 0.16, s), max: lerp(0.62, 0.7, s), opt: lerp(0.38, 0.45, s) });
    A2(ctx, q.on('langzaam', 1, 0.6), () => { pijl(ctx, x + 0.4 * w, y - h - 30, x + 0.48 * w, y - h - 30, C.groen, 1, 5, 18); text(ctx, 'langzaam', x + 0.44 * w, y - h - 60, fTekst(32, 700), C.groen, 'center'); });
    A2(ctx, q.on('keer', 1, 0.6), () => { kruis(ctx, x + 0.86 * w, y - h - 30, 20, 1, C.koraal); text(ctx, 'in één keer', x + 0.86 * w, y - h - 70, fTekst(32, 700), C.koraal, 'center'); });
    naamBij(ctx, 'acclimatisatie', 'in weken · niet erfelijk', x + 0.82 * w, y - h * 0.55, q.on('acclimatisatie', 1, 0.6), 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  s41(ctx, t, q) { _bg2(ctx); const av = q.on('vismigratierivier', 1, 0.6);
    A2(ctx, av, () => { for (let i = 0; i < 40; i++) { ctx.fillStyle = _mixHex('#7FB8DC', '#24507A', i / 40); ctx.fillRect(160 + i * 40, 380, 41, 220); } e2Stroom(ctx, 160, 1600, 390, 590, t, 50, 8); });
    const tz = q.at('zwemt'); const fx = t < tz ? 300 : 300 + Math.min(1300, (t - tz) * 160); A2(ctx, av, () => e2Forel(ctx, fx, 490 + 8 * Math.sin(t * 1.3), 8, {}));
    naamBij(ctx, 'zeeforel', '', fx, 660, av, 'center'); A2(ctx, q.on('Zoet', 1, 0.6), () => { text(ctx, 'zoet', 160, 650, fTekst(40, 700), C.text, 'left'); text(ctx, 'zout', 1760, 650, fTekst(40, 700), C.text, 'right'); });
    naamBij(ctx, 'vismigratierivier', 'geleidelijke overgang · tijd om te acclimatiseren', 960, 300, av, 'center');
    A2(ctx, q.on('schok', 1, 0.6), () => { ctx.fillStyle = '#7FB8DC'; ctx.fillRect(640, 740, 320, 90); ctx.fillStyle = '#24507A'; ctx.fillRect(960, 740, 320, 90); kruis(ctx, 960, 785, 26, 1, C.koraal); metaText(ctx, 'in één keer: schok', 960, 870, C.koraal, 'center', 24); }); },
  s42(ctx, t, q) { _bg2(ctx); const uT = q.on('temperatuur', 1, 2.0), uD = q.on('daglengte', 1, 2.0); const G = _e2Jaar(ctx, 0, uT, uD);
    A2(ctx, uD, () => text(ctx, 'daglengte', G.x + G.w * 0.5, G.y - G.h * 0.95, fTekst(40, 700), C.goud, 'center')); A2(ctx, uT, () => text(ctx, 'temperatuur', G.x + G.w * 0.32, G.y - G.h * 0.16, fTekst(40, 700), C.koraal, 'center'));
    naamBij(ctx, 'fotoperiodiciteit', 'daglengte als signaal', 1600, 190, q.on('fotoperiodiciteit', 1, 0.6), 'center');
    A2(ctx, q.on('herfst', 1, 0.6), () => { const xx = G.x + 0.8 * G.w; e2Vlijn(ctx, xx, G.y, G.y - G.h - 10, C.goud, 'signaal'); });
    if (uD > 0.99) { const u = (t * 0.08) % 1, i = Math.round(u * 120); circ(ctx, G.D[i][0], G.D[i][1], 11, C.goud, C.bgSchema, 3); } },
  s43(ctx, t, q) { _bg2(ctx); const G = _e2Jaar(ctx, 0, 1, 1); text(ctx, 'daglengte', G.x + G.w * 0.5, G.y - G.h * 0.95, fTekst(40, 700), C.goud, 'center'); text(ctx, 'temperatuur', G.x + G.w * 0.32, G.y - G.h * 0.16, fTekst(40, 700), C.koraal, 'center'); },
  s45(ctx, t, q) { _bg2(ctx); const wm = q.on('warme', 1, 2.0); const G = _e2Jaar(ctx, wm, 1, 1);
    A2(ctx, wm, () => text(ctx, 'warme winter', G.x + G.w * 0.08, G.y - G.h * 0.48 - 40 * (1 - wm), fTekst(36, 700), C.koraal, 'left'));
    A2(ctx, q.on('daglengte', 1, 0.6), () => text(ctx, 'daglengte gelijk', G.x + G.w * 0.62, G.y - G.h * 0.95, fTekst(36, 700), C.goud, 'left'));
    A2(ctx, q.on('Bloeit', 1, 0.6), () => e2Vlijn(ctx, G.x + 0.33 * G.w, G.y, G.y - G.h - 10, C.groen, 'bloei')); },

  // ---------------- Samenvatting
  s46(ctx, t, q) { _bg2(ctx); e2BeekA(ctx, 0, 110, 955, 790, t, { soort: 'snel', seed: 2 }); e2BeekA(ctx, 965, 110, 955, 790, t, { soort: 'traag', seed: 5 }); e2Split(ctx);
    naamBij(ctx, 'beek A', 'snel · koud · helder', 480, 170, 1, 'center'); naamBij(ctx, 'beek B', 'traag · warm · troebel', 1440, 170, 1, 'center');
    const az = q.on('zuurstof', 1, 1.2); e2Meter(ctx, 140, 320, 680, { naam: 'zuurstof', v: 0.83, kleur: C.teal, waarde: '10 mg/l' }); e2Meter(ctx, 1100, 320, 680, { naam: 'zuurstof', v: lerp(0.83, 0.25, az), kleur: az > 0.5 ? C.koraal : C.teal, waarde: az > 0.5 ? '3 mg/l' : '' });
    ecoSteenvlieglarve(ctx, 380, 750, 90, { lopen: true, vooruit: true, t: t * 0.4 }); [[1180, 790], [1420, 770], [1660, 800]].forEach(([x, y], i) => ecoMuggenlarve(ctx, x, y, 70, { t: t * 0.5 + i * 0.3 }));
    A2(ctx, q.on('allebei', 1, 0.6), () => ecoMuggenlarve(ctx, 760, 790, 70, { t: t * 0.5 })); ecoSchaal(ctx, 'larven vergroot');
    naamBij(ctx, 'beperkende factor', 'zuurstof', 1440, 520, q.on('beperkende', 1, 0.6), 'center'); },
  s47(ctx, t, q) { e1Macro(ctx, { horizon: 640 }); e2Eik(ctx, 760, 1100, 1.1, {}); const sw = 5 * Math.sin(t * 1.3);
    e2Twijg(ctx, [[1000, 430], [1120, 390 + sw]], 5); ecoPimpelmees(ctx, 1080, 410 + sw * 0.7, 7, { houding: 'klampen', rot: 3.0 + 0.05 * Math.sin(t * 1.3) }); e2Koolmees(ctx, 560, 620, 7, { houding: Math.sin(t) > 0.6 ? 'pikken' : 'staan' });
    naamBij(ctx, 'andere niche', '', 760, 230, q.on('niches', 1, 0.6), 'center');
    A2(ctx, q.on('mineraal', 1, 0.6), () => { roundRect(ctx, 1320, 300, 570, 520, 24); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); e2Ton(ctx, 1530, 760, 320, 380, [['licht', 0.9], ['water', 0.86], ['kalium', 0.74], ['stikstof', 0.42], ['fosfaat', 0.62]]); }); },
  s48(ctx, t, q) { e1Macro(ctx, { horizon: 500 }); ctx.fillStyle = E2.helder; ctx.fillRect(0, 560, W, 120); e2Stroom(ctx, 0, W, 565, 675, t, 120, 8); e1Oever(ctx, 676, { golf: 5 });
    const p = persoon(ctx, 'noor', 720, 880, 330, { outfit: 'zomer', uit: q.on('gedaan', 1, 0.3) > 0.5 ? 'lacht' : 'blij', pose: 'vasthouden', t });
    if (p.handR) { const b = 14 * Math.sin(t * 0.9); lijn(ctx, [[p.handR.x, p.handR.y], [p.handR.x + 170, p.handR.y - 200 + b]], '#8A6A4A', 5); ctx.strokeStyle = '#C8CCD4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(p.handR.x + 195, p.handR.y - 208 + b, 42, 24, 0.3, 0, 6.283); ctx.stroke(); }
    _e2BakKlein(ctx, 840, 880);
    zoomCircle(ctx, 1380, 430, 300, 881, 866, 'witte bak · larven vergroot', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1080, 130, 600, 600); e2Bak(ctx, 1110, 280, 540, 300, 22, { larven: [] });
      [['s', 0.2, 0.5], ['e', 0.48, 0.35], ['s', 0.68, 0.62], ['e', 0.86, 0.4]].forEach(([k, u, v], i) => { const lx = 1110 + u * 540 + 10 * Math.sin(t * 0.6 + i), ly = 280 + v * 300;
        if (k === 's') ecoSteenvlieglarve(ctx, lx, ly, 22, { houding: 'boven' }); else ecoEendagsvlieglarve(ctx, lx, ly, 22, { houding: 'boven', t: t * 0.6 }); }); });
    ecoSchaal(ctx, 'bak ± 40 cm · larven vergroot'); },
});
