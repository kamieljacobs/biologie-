// Film 4 · De mens als selectiefactor — geanimeerde scènes (keyframes uit sb4.js als eindbeeld, opgebouwd in de maat van de stem).
// Elke scène tekent eerst haar eigen achtergrond (E4.sch / E4.mic / macroNacht). Plasmiden en DNA blijven binnen het membraan, behalve onderweg door de pilus.
const E4_RES = [4, 17, 29];             // resistente bacteriën in de blaaskolonie (sb4 e4s08/e4s10, seed 11)
const E4_DARMRES = [6, 13, 22, 30, 35]; // resistente darmbacteriën (sb4 e4s14, seed 21)
// antibioticummoleculen die rustig drijven; enter 0..1 = van links binnendrijven
function e4Mol(ctx, n, t, a = 1, enter = 1, seed = 0, x0 = 120, w = 1680, y0 = 120, h = 700, r = 13) { if (a <= 0.01 || enter <= 0) return;
  for (let i = 0; i < n; i++) { const hx = hash(i * 9 + seed), hy = hash(i * 9 + 1 + seed); const e = ease(clamp(enter * 1.6 - hx * 0.6, 0, 1)); if (e <= 0) continue;
    const x = lerp(-60 - hash(i * 3 + seed) * 200, x0 + hx * w, e) + Math.sin(t * 0.35 + i) * 18, y = y0 + hy * h + Math.cos(t * 0.3 + i * 1.3) * 14;
    antibioticum(ctx, x, y, r, hash(i + seed) * 6 + t * 0.15 * (i % 2 ? 1 : -1), a * Math.min(1, e * 2)); } }
// twee rondes deling achter elkaar (u1, u2 0..1)
function e4Deler2(ctx, x, y, len, rot, u1, u2, o) { if (u2 <= 0) { E4.deler(ctx, x, y, len, rot, u1, o); return; }
  const off = len * 0.47, L2 = len * 0.82, c = Math.cos(rot), s = Math.sin(rot);
  for (const k of [-1, 1]) E4.deler(ctx, x + c * off * k, y + s * off * k, L2, rot + k * 0.04, u2, Object.assign({}, o, { seed: (o.seed || 1) + (k > 0 ? 50 : 0) })); }
const e4Pot = (ctx, x, y, s, p, seed, label, a = 1, la = 1) => { if (a <= 0.01) return; pot(ctx, x, y, s, { p, n: 75, seed, a }); if (label && la > 0.01) regel(ctx, label, x, y + 52 * Math.max(0.7, s), la * a, C.text, 36, 'center', 600); };
const e4Balk = (ctx, x, y, w, p, n1, n2, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _balk(ctx, x, y, w, p, n1, n2); ctx.restore(); };
const e4Meta = (ctx, s, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; evoSchaal(ctx, s); ctx.restore(); };

const e4Toonbank = (ctx, x0 = 820, x1 = 1320, y = 560) => { roundRect(ctx, x0, y, x1 - x0, 760 - y, 6); shape(ctx, '#4A5A78', C.line, 2); ctx.fillStyle = '#3A4A66'; ctx.fillRect(x0, y, x1 - x0, 18); };
// labelpositie bij een bacterie uit de kolonie
const e4Bij = (cx, cy, rx, ry, n, len, seed, i, t) => { const p = E4.kolPos(cx, cy, rx, ry, n, len, seed)[i]; return E4.leef(p, t); };

Object.assign(SCENES, {
  // ---------------- titel: alleen het beeld rechts (kolonie met één resistente bacterie, rustig levend)
  title(ctx, t) {
    E4.venster(ctx, 1460, 760, 280, () => E4.kol(ctx, 1460, 760, 230, 230, 22, 120, (i) => ({ type: i === 3 ? 'resistent' : 'gevoelig', focus: i === 3, plasmide: i === 3 ? 1 : 0 }), 3, t)); },

  // ---------------- Opening: apotheek
  s01(ctx, t, q) { E4.apotheek(ctx); _balie(ctx, 700);
    const tA = q.at('doosje'), tB = q.at('Iedereen');
    const r = persoon(ctx, 'ravi', 1000, 760, 520, { pose: t < tA + 0.5 ? 'vasthouden' : 'staan', t });
    persoon(ctx, 'henk', 1500, 880, 560, { kijk: -1, uit: q.on('klopt') > 0.5 ? 'verbaasd' : 'neutraal', t });
    // doosje: in Ravi's hand → op de balie → over de balie naar Opa Henk geschoven
    const hR = r && r.handR ? [r.handR.x + 40, r.handR.y + 10] : [1100, 520];
    e4Toonbank(ctx, 860, 1340);
    let dx, dy;
    if (t < tA + 0.5) [dx, dy] = hR;
    else if (t < tA + 1.1) { const u = ease((t - tA - 0.5) / 0.6); dx = lerp(hR[0], 1060, u); dy = lerp(hR[1], 560, u); }
    else { const u = ease((t - Math.max(tA + 1.1, tB - 0.8)) / 1.6); dx = lerp(1060, 1270, u); dy = 560; }
    E4.doosje(ctx, dx, dy, 120);
    naamBij(ctx, 'Apotheker Ravi', null, 1000, 200, q.on('Ravi', 1, 0.5), 'center'); naamBij(ctx, 'Opa Henk', null, 1500, 280, q.on('Henk', 1, 0.5), 'center');
    text(ctx, '"maak je kuur af"', 1500, 170, fTitel(56), rgba(C.goud, q.on('advies', 1, 0.6)), 'center');
    vraagteken(ctx, 1800, 175, q.on('klopt', 1, 0.5) * (1 - q.on('griep', 1, 0.5)), 80); },

  // ---------------- H1 Bacteriën evolueren snel
  s03(ctx, t, q) { E4.mic(ctx);
    const a2 = q.on('delen', 1, 0.6), d2 = clamp((t - q.at('wordt')) / 1.8, 0, 1), a3 = q.on('vier', 1, 0.5), d3 = ease((t - q.at('vier')) / 1.6);
    bacterie(ctx, 420, 470, 360, 0, { seed: 2, flagel: 0.5, t });
    pijl(ctx, 650, 470, 760, 470, C.line, a2, 4);
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; bacterie(ctx, 1000, 470, 400, 0, { deling: 0.75 * ease(d2), seed: 3, flagel: 0.5, t }); ctx.restore(); }
    pijl(ctx, 1240, 470, 1350, 470, C.line, a3, 4);
    if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; for (const k of [-1, 1]) bacterie(ctx, 1600, 470 + k * lerp(30, 110, d3), 300, 0.05, { seed: 4 + k * 110, flagel: 0.5, t }); ctx.restore(); }
    text(ctx, '1', 420, 330, fTekst(56, 700), C.text, 'center'); text(ctx, '2', 1000, 330, fTekst(56, 700), rgba(C.text, q.on('twee', 1, 0.4)), 'center'); text(ctx, '4 …', 1600, 280, fTekst(56, 700), rgba(C.text, q.on('vier', 1, 0.4)), 'center');
    naamBij(ctx, 'E. coli', 'darmbacterie · 2 micrometer', 420, 640, q.on('coli', 1, 0.5), 'center');
    e4Meta(ctx, 'deling elke ±20 min (lab, 37 °C)', q.on('twintig')); },
  s04(ctx, t, q) { E4.mic(ctx);
    const z = lerp(2.4, 1, ease(t / (q.at('miljarden') + 1.5)));
    ctx.save(); E4.cam(ctx, 1220, 380, z);
    const tK = q.at('gekopieerd');
    E4.kol(ctx, 960, 470, 860, 380, 160, 58, (i) => { const o = { type: 'gevoelig', a: 0.8 }; if (i % 9 === 2 && t > tK - 1) o.deler = clamp(((t - tK + 1 + hash(i) * 3) % 5) / 2.5, 0, 1); return o; }, 7, t, 0.6);
    const m = q.on('mutatie', 1, 0.5);
    bacterie(ctx, 1220, 380, 110, 0.4, { type: 'gevoelig', focus: m > 0.5, seed: 3, zweep: false });
    if (m > 0.01) circ(ctx, 1220, 380, 9, rgba(EVO.kracht.mutatie, m), _mvL(EVO.kracht.mutatie, 0.3), 2);
    ctx.restore();
    if (m > 0.01) { ctx.save(); ctx.fillStyle = rgba(C.bgMicro, 0.6 * m); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.arc(1220, 380, 95, 0, 6.283, true); ctx.fill(); ctx.restore(); }
    naamBij(ctx, 'mutatie', 'NIEUW ALLEL', 1300, 330, m, 'left', EVO.kracht.mutatie);
    e4Meta(ctx, 'in je darmen: ±38 000 miljard bacteriën', q.on('miljarden')); },
  s05(ctx, t, q) { E4.sch(ctx);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 820); ctx.lineTo(820, 820); ctx.stroke();
    persoon(ctx, 'noor', 330, 820, 470, { t }); persoon(ctx, 'daan', 520, 820, 450, { t }); persoon(ctx, 'sam', 700, 820, 490, { t, kijk: -1 });
    naamBij(ctx, 'mensen', null, 520, 300, q.on('mensen', 1, 0.4), 'center');
    E4.venster(ctx, 1360, 470, 300, () => { const u = ((t + 1.2) % 4.2) / 3.2; E4.kol(ctx, 1360, 470, 210, 210, 8, 120, (i) => ({ type: 'gevoelig', deler: i % 2 ? clamp(u, 0, 1) : clamp(u - 0.3, 0, 1) }), 4, t); });
    naamBij(ctx, 'bacteriën', null, 1360, 830, q.on('bacteriën', 1, 0.4), 'center');
    vraagteken(ctx, 960, 470, q.on('Waarom', 1, 0.5), 120); },
  s07(ctx, t, q) { E4.sch(ctx);
    const aM = q.on('mens', 1, 0.5);
    E4.tijdlijn(ctx, 140, 340, 1100, 1, C.koraal, 'mens', '1 generatie per ±30 jaar', aM, q.on('dertig'), q.on('dertig') > 0.5 ? 1 : 0);
    persoon(ctx, 'henk', 1320, 420, 180, { a: q.on('mens', 1, 0.3), t });
    const kB = 72 * clamp((t - q.at('lab')) / Math.max(1.5, q.at('generaties', 2) + 0.6 - q.at('lab')), 0, 1);
    E4.tijdlijn(ctx, 140, 640, 1100, 72, EVO.a1, 'bacterie', 'in het lab tot 72 generaties per dag', q.on('bacterie', 1, 0.5), q.on('tientallen'), kB);
    const aP = q.on('Meer', 1, 0.6), mut = Math.round(3 * q.on('mutaties', 1, 1.2));
    const p = 0.62 - 0.14 * ease((t - q.at('genenpool')) / 3);
    if (aP > 0.01) { pot(ctx, 1620, 760, 0.95, { p, n: 75, extra: mut ? [[EVO.kracht.mutatie, mut]] : null, seed: 4, a: aP }); regel(ctx, 'genenpool kolonie', 1620, 760 + 52 * 0.95, q.on('genenpool', 1, 0.5), C.text, 36, 'center', 600); }
    haak(ctx, 140, 1240, 700, 'meer generaties = vaker mutatie en selectie', C.groen, q.on('selectie', 1, 0.6)); },

  // ---------------- H2 Het antibioticum kiest
  s08(ctx, t, q) { E4.sch(ctx);
    const dA = q.on('schrijft', 1, 0.5);
    persoon(ctx, 'henk', 420, 860, 560, { uit: 'moe', t, pose: dA > 0.5 ? 'vasthouden' : 'staan', hold: dA > 0.5 ? (c, x, y) => medicijnDoosje(c, x + 30, y + 10, 100) : null });
    const houd = t > q.at('urine');
    const k = persoon(ctx, 'kim', 900, 860, 580, { kijk: -1, pose: houd ? 'vasthouden' : 'staan', a: q.on('Kim', 1, 0.3), t, hold: houd ? (c, x, y) => { roundRect(c, x - 18, y - 70, 36, 70, 8); shape(c, rgba('#E8D86A', 0.5), C.er, 2); } : null });
    naamBij(ctx, 'Opa Henk', q.on('blaasontsteking') > 0.01 ? 'blaasontsteking' : null, 420, 250, 1, 'center'); naamBij(ctx, 'Dr. Kim', null, 900, 230, q.on('Kim', 1, 0.4), 'center');
    const z = q.on('bacteriën', 1, 1.0); const hx = k && k.handR ? k.handR.x : 930, hy = k && k.handR ? k.handR.y - 40 : 330;
    if (z > 0.01) zoomCircle(ctx, 1460, 440, 300 * z, hx, hy, z > 0.9 ? 'URINE · VERGROOT ±2000×' : null, 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1100, 100, 720, 700); E4.kol(ctx, 1460, 440, 250, 250, 18, 120, () => ({ type: 'gevoelig' }), 5, t); });
  },
  s09(ctx, t, q) { E4.mic(ctx);
    const m = q.on('mutatie', 1, 0.8), g = q.on('gevoelig', 1, 0.5);
    E4.kol(ctx, 960, 520, 820, 340, 44, 120, (i) => E4_RES.includes(i) ? (m < 1 ? { type: 'gevoelig', a: 0.75 * (1 - m) } : null) : { type: 'gevoelig', a: 0.75 }, 11, t);
    if (m > 0.01) E4.kol(ctx, 960, 520, 820, 340, 44, 120, (i) => E4_RES.includes(i) ? { type: 'resistent', focus: m > 0.6, a: m } : null, 11, t);
    { const a = e4Bij(960, 520, 820, 340, 44, 120, 11, 0, t), b = e4Bij(960, 520, 820, 340, 44, 120, 11, 17, t);
      naamBij(ctx, 'gevoelig', 'allel 1', a.x, a.y - 80, g, 'center', EVO.a1R); naamBij(ctx, 'resistent', 'allel 2 · door mutatie', b.x, b.y - 80, q.on('allel', 1, 0.5), 'center', EVO.a2R); } },
  s10(ctx, t, q) { E4.mic(ctx);
    E4.kol(ctx, 960, 460, 820, 360, 44, 120, (i) => E4_RES.includes(i) ? { type: 'resistent' } : { type: 'gevoelig' }, 11, t);
    e4Mol(ctx, 40, t, 1, clamp((t - q.at('slikt')) / 2.5, 0, 1));
    antibioticum(ctx, 1700, 92, 16, 0.3, q.on('slikt', 1, 0.5)); naamBij(ctx, 'antibioticum', null, 1670, 104, q.on('slikt', 1, 0.5), 'right', C.koraal); },
  s12(ctx, t, q) { E4.mic(ctx);
    const d = q.on('gaan', 1, 1.6), f = q.on('resistente', 1, 0.5), u1 = clamp((t - q.at('delen')) / 2.5, 0, 1), dimA = 1 - 0.4 * q.on('populatie', 1, 1.5);
    for (const p of E4.kolPos(960, 460, 820, 360, 44, 120, 11)) { const res = E4_RES.includes(p.i), l = E4.leef(p, t, res ? 1 : 1 - d);
      if (res) E4.deler(ctx, l.x, l.y, p.len, l.rot, p.i === 29 ? clamp(u1 * 1.3 - 0.3, 0, 1) : u1, { type: 'resistent', focus: f > 0.5 && u1 < 0.05, seed: p.i, t });
      else { if (d < 1) bacterie(ctx, l.x, l.y, p.len, l.rot, { type: 'gevoelig', a: (1 - d) * dimA, seed: p.i, t }); if (d > 0) bacterie(ctx, l.x, l.y, p.len, l.rot, { type: 'gevoelig', dood: 1, a: d * dimA, seed: p.i }); } }
    e4Mol(ctx, 40, t + 6, 1, 1);
    antibioticum(ctx, 1700, 92, 16, 0.3); naamBij(ctx, 'antibioticum', null, 1670, 104, 1, 'right', C.koraal); },
  s13(ctx, t, q) { E4.sch(ctx);
    e4Pot(ctx, 560, 640, 1.2, 0.94, 3, 'vóór de kuur'); e4Balk(ctx, 330, 760, 460, 0.94, 'gevoelig', 'resistent', q.on('zeldzaam', 1, 0.6));
    const tO = q.at('Overleven'), u = ease((t - tO - 0.4) / Math.max(1.5, q.at('gewoon') - tO)), a2 = q.on('Overleven', 1, 0.6);
    pijl(ctx, 820, 470, 1080, 470, C.koraal, a2, 6, 22);
    const p2 = lerp(0.94, 0.08, u); e4Pot(ctx, 1360, 640, 1.2, p2, 6, 'na de kuur', a2); e4Balk(ctx, 1130, 760, 460, p2, 'gevoelig', 'resistent', a2);
    const sd = q.on('selectiedruk', 1, 0.6); if (sd > 0.01) metaText(ctx, 'antibioticum = selectiedruk', 960, 250, rgba(C.koraal, sd), 'center', 26); },
  s14(ctx, t, q) { E4.mic(ctx);
    const V = [[640, 320], [960, 560], [560, 640], [1300, 300], [1380, 620]];
    V.forEach(([x, y], i) => griepVirus(ctx, x + Math.sin(t * 0.4 + i) * 10, y + Math.cos(t * 0.35 + i * 2) * 8, 70, clamp(t / 0.4 - i * 0.15, 0, 1)));
    e4Mol(ctx, 18, t, 1, clamp((t - q.at('antibioticum')) / 2.2, 0, 1), 4, 300, 1320, 160, 620, 12);
    naamBij(ctx, 'griepvirus', '0,1 micrometer · geen bacterie', 960, 800, q.on('bacterie', 1, 0.5), 'center');
    naamBij(ctx, 'antibioticum', 'doet niets tegen een virus', 1800, 150, q.on('niets', 1, 0.5), 'right', C.koraal);
    e4Meta(ctx, 'vergroot · virus niet op schaal met het antibioticum', 1); },
  s15(ctx, t, q) { E4.sch(ctx);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 860); ctx.lineTo(900, 860); ctx.stroke();
    persoon(ctx, 'sam', 600, 860, 560, { uit: 'moe', pose: 'vasthouden', t, hold: (c, x, y) => medicijnDoosje(c, x + 30, y + 10, 110) });
    E4.venster(ctx, 1360, 460, 280, () => { [[1260, 380], [1450, 520], [1330, 590], [1480, 340]].forEach(([x, y], i) => griepVirus(ctx, x + Math.sin(t * 0.4 + i) * 8, y, 62)); });
    naamBij(ctx, 'griep', null, 1360, 810, q.on('griep', 1, 0.4), 'center');
    vraagteken(ctx, 1000, 420, q.on('doet', 1, 0.5), 110); },
  s17(ctx, t, q) { E4.mic(ctx);
    const z = lerp(1.25, 1, ease(t / 3)); ctx.save(); E4.cam(ctx, 960, 470, z);
    const d = q.on('concurrenten', 1, 1.8), f = q.on('resistente', 1, 0.5);
    const u1 = clamp((t - q.at('nadelen')) / 2.4, 0, 1), u2 = clamp((t - q.at('voordeel') - 0.6) / 2.4, 0, 1);
    for (const p of E4.kolPos(960, 470, 820, 360, 40, 120, 21)) { const res = E4_DARMRES.includes(p.i), l = E4.leef(p, t, res ? 1 : 1 - d);
      if (res) e4Deler2(ctx, l.x, l.y, p.len, l.rot, u1, u2, { type: 'resistent', focus: f > 0.5 && u1 < 0.05, seed: p.i, t });
      else { if (d < 1) bacterie(ctx, l.x, l.y, p.len, l.rot, { type: 'gevoelig', a: 1 - d, seed: p.i, t }); if (d > 0) bacterie(ctx, l.x, l.y, p.len, l.rot, { type: 'gevoelig', dood: 1, a: d * (1 - 0.6 * q.on('puzzel', 1, 2)), seed: p.i }); } }
    ctx.restore();
    e4Mol(ctx, 26, t, 1 - 0.5 * q.on('nadelen', 1, 2), clamp(t / 2.5, 0, 1), 7);
    naamBij(ctx, 'darmbacteriën', null, 960, 150, q.on('darmen', 1, 0.5) * (1 - q.on('ruimt', 1, 0.5)), 'center');
    naamBij(ctx, 'resistente darmbacteriën krijgen de ruimte', null, 960, 150, q.on('ruimt', 1, 0.6), 'center', EVO.a2R); },
  s18(ctx, t, q) { E4.sch(ctx); _balie(ctx, 700);
    persoon(ctx, 'ravi', 520, 760, 520, { pose: q.on('voorschrijft') > 0.5 ? 'wijs' : 'staan', t });
    persoon(ctx, 'henk', 1500, 880, 560, { kijk: -1, uit: q.on('restje') > 0.5 ? 'blij' : 'neutraal', t });
    const oud = q.on('oude', 1, 0.6), weg = q.on('Daarom', 1, 0.8);
    if (oud * (1 - weg) > 0.01) { const a = oud * (1 - weg); text(ctx, '"maak hem altijd af"', 1040, 400, fTitel(52), rgba(C.goud, a), 'center');
      const s = q.on('extra', 1, 0.8); if (s > 0.01) { ctx.strokeStyle = rgba(C.koraal, a); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(800, 384); ctx.lineTo(800 + 480 * s, 384); ctx.stroke(); } }
    const kA = q.on('voorschrijft', 1, 0.6);
    if (kA > 0.01) { ctx.save(); ctx.globalAlpha *= kA; roundRect(ctx, 760, 260, 560, 300, 14); shape(ctx, '#EDE6D2', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(760, 290, 560, 26);
      text(ctx, 'Neem zoals voorgeschreven', 1040, 380, fTekst(38, 700), '#2A2A2A', 'center');
      text(ctx, 'Eerder stoppen? Overleg.', 1040, 440, fTekst(36, 500), rgba('#2A2A2A', q.on('stoppen', 1, 0.5)), 'center');
      text(ctx, 'Restje: terug naar de apotheek', 1040, 500, fTekst(34, 500), rgba('#2A2A2A', q.on('restje', 1, 0.5)), 'center'); ctx.restore(); }
    e4Toonbank(ctx, 700, 1360, 600); if (t > q.at('breng')) { const r = ease((t - q.at('breng')) / 1.6); E4.doosje(ctx, lerp(1300, 820, r), 600, 110); } },

  // ---------------- H3 De pot lekt
  s19(ctx, t, q) { E4.mic(ctx);
    const z = lerp(0.5, 1, ease(t / Math.max(2, q.at('Naast')))); ctx.save(); E4.cam(ctx, 900, 470, z);
    for (const [x, y, r, s] of [[2100, 1050, -0.2, 22], [-250, 1100, -0.15, 24]]) bacterie(ctx, x, y, 900, r, { type: 'gevoelig', seed: s, t });
    bacterie(ctx, 900, 470, 980, 0, { type: 'resistent', plasmide: 2, seed: 5, t: t * 0.6 });
    ctx.restore();
    const pl = q.on('ringetjes', 1, 0.5); if (pl > 0.01) for (let i = 0; i < 2; i++) { const P = E4.plasPos(900, 470, 980, 0, 5, i); circ(ctx, P.x, P.y, P.r * (1.5 + 0.08 * Math.sin(t * 3)), null, rgba(C.goud, pl), 3); }
    { const P0 = E4.plasPos(900, 470, 980, 0, 5, 0), P1 = E4.plasPos(900, 470, 980, 0, 5, 1);
      naamBij(ctx, 'plasmide', 'klein ringetje DNA', P1.x, 660, pl, 'center', C.kernR); naamBij(ctx, 'resistentiegen', null, P0.x + 30, 300, q.on('resistentiegen', 1, 0.5), 'center', EVO.a2R); }
    naamBij(ctx, 'groot DNA-molecuul', null, 900, 800, q.on('DNA-molecuul', 1, 0.5), 'center', C.kernR);
    if (z > 0.95) evoSchaal(ctx, 'vergroot · E. coli is 2 micrometer lang'); },
  s20(ctx, t, q) { E4.mic(ctx);
    const T0 = q.at('doorgeven'), u = clamp((t - T0) / 3.4, 0, 1), aan = u >= 1;
    bacterie(ctx, 560, 480, 560, 0, { type: 'resistent', plasmide: 1, zweep: false, seed: 2, t });
    bacterie(ctx, 1460, 520, 500, 0.08, { type: aan && t > T0 + 4.4 ? 'resistent' : 'gevoelig', zweep: false, seed: 9, plasmide: aan ? 1 : 0, t });
    const g = q.on('kopie', 1, 1.2); if (g > 0.01) pilus(ctx, 830, 470, lerp(830, 1220, g), lerp(470, 500, g));
    if (u > 0 && !aan) { const A = E4.plasPos(560, 480, 560, 0, 2, 0), B = E4.plasPos(1460, 520, 500, 0.08, 9, 0); let x, y, r;
      if (u < 0.25) { const v = ease(u / 0.25); x = lerp(A.x, 812, v); y = lerp(A.y, 472, v); r = lerp(A.r, 14, v); }
      else if (u < 0.8) { const v = ease((u - 0.25) / 0.55), mx = 1025, my = 467; x = (1 - v) ** 2 * 830 + 2 * (1 - v) * v * mx + v * v * 1220; y = (1 - v) ** 2 * 470 + 2 * (1 - v) * v * my + v * v * 500; r = 14; }
      else { const v = ease((u - 0.8) / 0.2); x = lerp(1236, B.x, v); y = lerp(501, B.y, v); r = lerp(14, B.r, v); }
      plasmideRing(ctx, x, y, r, { seed: 1 }); }
    naamBij(ctx, 'kopie van het plasmide', null, 1030, 370, q.on('doorgeven', 1, 0.5), 'center', EVO.a2R);
    naamBij(ctx, 'E. coli', null, 560, 680, 1, 'center'); naamBij(ctx, 'andere soort', 'BV. KLEBSIELLA', 1460, 710, q.on('soort', 1, 0.5), 'center'); },
  s21(ctx, t, q) { E4.mic(ctx);
    bacterie(ctx, 560, 480, 560, 0, { type: 'resistent', plasmide: 1, zweep: false, seed: 2, t });
    bacterie(ctx, 1460, 520, 500, 0.08, { type: 'gevoelig', zweep: false, seed: 9, t });
    const P = E4.plasPos(560, 480, 560, 0, 2, 0); const pa = q.on('plasmide', 1, 0.5); if (pa > 0.01) circ(ctx, P.x, P.y, P.r * 1.6, null, rgba(C.goud, pa * (0.6 + 0.4 * Math.sin(t * 3))), 3);
    naamBij(ctx, 'E. coli', null, 560, 680, q.on('coli', 1, 0.4), 'center'); naamBij(ctx, 'andere soort', null, 1460, 710, q.on('soort', 1, 0.4), 'center');
    vraagteken(ctx, 1030, 330, q.on('gebeuren', 1, 0.5), 110); },
  s23(ctx, t, q) { E4.sch(ctx);
    const T0 = q.at('gaan'), nAan = [0, 1, 2].filter(k => t > T0 + k * 1.6 + 2.0).length, p2 = 0.95 - 0.04 * nAan;
    e4Pot(ctx, 560, 700, 1.25, 0.4, 2, 'E. coli'); e4Pot(ctx, 1360, 700, 1.25, p2, 9, 'Klebsiella', 1, q.on('Klebsiella', 1, 0.5));
    const tb = q.on('Resistentie', 1, 0.8), gl = q.on('gaatje', 1, 0.6);
    ctx.save(); ctx.globalAlpha *= tb; ctx.strokeStyle = gl > 0.5 ? C.goud : EVO.glas; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(723, 560); ctx.lineTo(1197, 560); ctx.moveTo(723, 600); ctx.lineTo(1197, 600); ctx.stroke(); ctx.restore();
    for (let k = 0; k < 3; k++) { const u = (t - T0 - k * 1.6) / 2.0; if (u < 0 || u > 1.15) continue; const v = ease(Math.min(1, u)); E4.knikker(ctx, lerp(700, 1220, v), 580, 15, true, u > 1 ? 1 - (u - 1) / 0.15 : Math.min(1, u * 6)); }
    if (t < T0) E4.knikker(ctx, 960, 580, 15, true, q.on('ESBL', 1, 0.5));
    pijl(ctx, 1000, 520, 1110, 520, EVO.a2, q.on('ESBL', 1, 0.5), 4);
    naamBij(ctx, 'ESBL-gen op een plasmide', null, 960, 460, q.on('ESBL', 1, 0.5), 'center', EVO.a2R);
    if (gl > 0.01) metaText(ctx, 'twee soorten · één lek', 960, 200, rgba(C.grain, gl), 'center', 28); },
  s24(ctx, t, q) { E4.sch(ctx);
    const zi = q.on('ziekenhuis', 1, 0.6); ctx.save(); ctx.globalAlpha *= zi; ziekenhuisIcoon(ctx, 560, 720, 2.1); ctx.restore();
    const k = [['veel antibiotica', 300, 'antibiotica'], ['zieke mensen dicht bij elkaar', 450, 'zieke'], ['handen en bedden', 600, 'wassen']];
    k.forEach(([s, y, w]) => { const a = q.on(w, 1, 0.5); if (a <= 0.01) return; circ(ctx, 1160, y - 12, 14 * (1 + 0.15 * Math.sin(t * 2.5 + y)), rgba(C.koraal, a)); text(ctx, s, 1200, y, fTekst(44, 600), rgba(C.text, a), 'left'); });
    haak(ctx, 1140, 1760, 680, 'grootste selectiedruk', C.koraal, q.on('grootst', 1, 0.6));
    const pt = q.on('testen', 1, 0.6); if (pt > 0.01) petrischaal(ctx, 930, 640, 80, [[-0.3, -0.2, 9, EVO.a2], [0.25, 0.1, 11, EVO.a2], [-0.1, 0.35, 8, EVO.a2]], { a: pt, schijfje: true }); },

  // ---------------- H4 De mens kiest
  s25(ctx, t, q) { macroNacht(ctx, { horizon: 600 });
    circ(ctx, 1600, 200, 60, '#E6E0C8');
    const s = 3.6, z = lerp(1.08, 1, ease(t / 5)); ctx.save(); E4.cam(ctx, 900, 820, z);
    wolf(ctx, 820, 860, s, { houding: 'huilen', t });
    persoon(ctx, 'erik', 1180, 860, 175 * s, { zij: true, kijk: -1, a: q.on('mensen', 1, 0.3), t }); ctx.restore();
    naamBij(ctx, 'wolf', 'Canis lupus · schofthoogte 80 cm', 560, 560, q.on('wolven', 1, 0.5), 'center');
    const tH = q.at('honden'), fase = clamp((t - tH) * 1.1, 0, 2.5);
    if (t > tH) hond(ctx, 'herder', 1520 + 72 * s * (2.5 - fase), 860, s, { houding: fase < 2.5 ? 'lopen' : 'staan', t: fase % 1, kijk: -1 });
    if (t > tH + 1) naamBij(ctx, 'hond', null, 1520, 600, clamp((t - tH - 1) / 0.5, 0, 1), 'center');
    e4Meta(ctx, 'minstens 15 000 jaar geleden · op schaal', q.on('vijftienduizend')); },
  s26(ctx, t, q) { macroNacht(ctx, { horizon: 520 });
    const g = 820, s = 4.5; wolf(ctx, 270, g, s, { t });
    const R = [['herder', 990, 'Fokkers', 72, 990, 470], ['teckel', 1380, 'kunstmatige', 22, 1380, 680], ['mops', 1610, 'rassen', 26, 1610, 650], ['chihuahua', 1800, 'groepen', 18, 1800, 700]];
    for (const [ras, x, w, Sc, lx, ly] of R) { const t0 = q.at(w); if (t < t0) continue; const fase = clamp((t - t0) * 1.0, 0, 2);
      hond(ctx, ras, x + Sc * s * (2 - fase), g, s, { houding: fase < 2 ? 'lopen' : 'staan', t: fase % 1, kijk: -1 });
      naamBij(ctx, ras, null, lx, ly, clamp((t - t0 - 1.6) / 0.5, 0, 1), 'center'); }
    naamBij(ctx, 'wolf', null, 280, 380, 1, 'center');
    const ks = q.on('kunstmatige', 1, 0.5); if (ks > 0.01) metaText(ctx, 'kunstmatige selectie', 960, 160, rgba(C.goud, ks), 'center', 30);
    e4Meta(ctx, 'op schaal · één soort: Canis lupus', q.on('rassen')); },
  s27(ctx, t, q) { macroNacht(ctx, { horizon: 520 });
    wolf(ctx, 600, 820, 5, { t }); hond(ctx, 'chihuahua', 1360, 820, 5, { kijk: -1, t });
    naamBij(ctx, 'wolf', null, 600, 320, q.on('wolf', 1, 0.4), 'center'); naamBij(ctx, 'chihuahua', null, 1360, 690, q.on('chihuahua', 1, 0.4), 'center');
    vraagteken(ctx, 1080, 360, q.on('Hoe', 1, 0.5), 110); },
  s29(ctx, t, q) { E4.sch(ctx);
    e4Pot(ctx, 460, 700, 1.15, 0.75, 4, 'generatie 1'); e4Balk(ctx, 270, 790, 380, 0.75, 'groot', 'klein');
    const tK = q.at('kleinste'), u = clamp((t - tK) / 1.4, 0, 1);
    const gp = persoon(ctx, 'erik', 900, 640, 330, { pose: u > 0 ? 'vasthouden' : 'staan', t, hold: u >= 1 ? (c, x, y) => { circ(c, x + 4, y - 6, 15, EVO.a2, EVO.a2R, 2); circ(c, x + 30, y + 4, 15, EVO.a2, EVO.a2R, 2); } : null });
    if (u > 0 && u < 1 && gp && gp.handR) for (const [k, ox, oy] of [[0, 4, -6], [1, 30, 4]]) { const v = ease(clamp(u * 1.2 - k * 0.2, 0, 1)), sx = 430 + k * 50, sy = 600;
      E4.knikker(ctx, lerp(sx, gp.handR.x + ox, v), lerp(sy, gp.handR.y + oy, v) - Math.sin(Math.PI * v) * 120, 15, true); }
    naamBij(ctx, 'de fokker kiest', null, 900, 260, q.on('fokker', 1, 0.5) > 0 ? 1 : q.on('kleinste', 1, 0.5), 'center', C.goud);
    const tA = q.at('Allelen'), v = ease((t - tA - 0.5) / 4.5), a2 = q.on('Allelen', 1, 0.6), gen = 1 + Math.round(9 * v), p2 = lerp(0.75, 0.35, v);
    pijl(ctx, 1040, 560, 1200, 560, C.line, a2, 4);
    e4Pot(ctx, 1380, 700, 1.15, p2, 8, 'generatie ' + Math.max(2, gen), a2); e4Balk(ctx, 1190, 790, 380, p2, 'groot', 'klein', a2); },
  s30(ctx, t, q) { E4.sch(ctx);
    const gw = q.on('wilde', 1, 1.0); if (gw > 0.01) kool(ctx, 'wild', 960, 560, 3.6 * (0.3 + 0.7 * gw), { a: gw }); naamBij(ctx, 'wilde kool', 'BRASSICA OLERACEA', 960, 620, gw, 'center');
    e4Meta(ctx, 'wild: kalkkliffen langs het Kanaal', q.on('Kanaal') * (1 - q.on('boerenkool', 1, 0.6)));
    const nd = q.on('deel', 1, 0.6);
    const r = [['boerenkool', 'blad', 260, 470, [0, -40, 22, 34], [820, 420, 380, 300]], ['spruitjes', 'zijknoppen', 520, 760, [0, -40, 14, 40], [830, 560, 640, 640]], ['koolrabi', 'stengel', 1400, 790, [0, -13, 15, 15], [1100, 560, 1300, 680]], ['broccoli', 'bloeiwijze', 1660, 470, [0, -32, 17, 12], [1110, 420, 1540, 340]], ['bloemkool', 'bloeiwijze', 1660, 780, [0, -18, 16, 14], [1130, 520, 1560, 700]]];
    for (const [k, deel, x, y, n, pl] of r) { const g = q.on(k, 1, 1.0); if (g <= 0.01) continue; const s = (k === 'spruitjes' ? 2.6 : 3) * (0.3 + 0.7 * g);
      pijl(ctx, pl[0], pl[1], lerp(pl[0], pl[2], g), lerp(pl[1], pl[3], g), C.line, 0.6, 3);
      kool(ctx, k, x, y, s, { a: g, nadruk: nd > 0.5 ? n : false }); naamBij(ctx, k, nd > 0.01 ? deel : null, x, y + 50, g, 'center'); }
    const vd = q.on('veredeling', 1, 0.5) * (1 - q.on('wilde', 1, 0.6)); if (vd > 0.01) text(ctx, 'veredeling', 960, 520, fTitel(64), rgba(C.goud, vd), 'center'); },

  // ---------------- H5 Inteelt en de genenbank
  s31(ctx, t, q) { E4.sch(ctx);
    persoon(ctx, 'mila', 520, 860, 560, { pose: q.on('rashonden') > 0.5 && q.on('Hoe') < 0.5 ? 'wijs' : 'staan', t, uit: q.on('ziekten') > 0.5 ? 'bezorgd' : 'neutraal' });
    hond(ctx, 'mops', 780, 860, 3.3, { kijk: -1, houding: 'zitten', t: t * 1.6 });
    naamBij(ctx, 'Dierenarts Mila', null, 520, 250, 1, 'center');
    E4.stamboom(ctx, clamp((t - q.at('pups')) / 1.6, 0, 1), q.on('familie', 1, 0.8), q.on('pups', 1, 0.5));
    naamBij(ctx, 'populaire dekreu', null, 1580, 290, q.on('populaire', 1, 0.5), 'left', C.goud);
    const vp = q.on('vader', 1, 0.5); if (vp > 0.01) metaText(ctx, 'veel pups · één vader', 1500, 560, rgba(C.grain, vp), 'center', 26);
    const it = q.on('inteelt', 1, 0.5); if (it > 0.01) text(ctx, 'inteelt', 1500, 680, fTitel(56), rgba(C.koraal, it), 'center'); },
  s32(ctx, t, q) { E4.sch(ctx);
    persoon(ctx, 'mila', 520, 860, 560, { t, uit: 'bezorgd' }); hond(ctx, 'mops', 780, 860, 3.3, { kijk: -1, houding: 'zitten', t: t * 1.6 });
    naamBij(ctx, 'rashond', null, 790, 720, q.on('rashonden', 1, 0.4), 'center');
    vraagteken(ctx, 1460, 470, q.on('erfelijke', 1, 0.5), 130); },
  s34(ctx, t, q) { E4.sch(ctx);
    e4Pot(ctx, 300, 640, 1, 0.8, 3, 'zelfde pot'); allelBalk(ctx, 110, 740, 380, 0.8, { procent: false });
    text(ctx, 'gezond allel 80%', 110, 812, fTekst(30, 700), EVO.a1R, 'left'); text(ctx, 'ziekte-allel 20%', 110, 850, fTekst(30, 700), EVO.a2R, 'left');
    const bl = q.on('dezelfde', 1, 0.6); if (bl > 0.01) metaText(ctx, 'allelfrequentie blijft 20%', 1220, 230, rgba(C.grain, bl), 'center', 26);
    const rij = (y, paren, t0) => { paren.forEach((p, i) => { const u = clamp((t - t0 - i * 0.35) / 0.8, 0, 1); if (u <= 0) return; const v = ease(u), kr = 18, xx = 640 + i * kr * 5;
      for (const [j, dx] of [[0, 0], [1, kr * 2.1]]) E4.knikker(ctx, lerp(280 + j * 40, xx + dx, v), lerp(400, y, v) - Math.sin(Math.PI * v) * 90, kr, !!p[j]); }); };
    const A = [[0, 0], [1, 0], [0, 0], [0, 1], [0, 0], [0, 0]], B = [[1, 1], [0, 0], [0, 0], [1, 1], [0, 0], [0, 0]];
    const tP = q.at('paren'), tV = q.at('Verwante');
    if (t > tP) text(ctx, 'vrij paren', 620, 330, fTekst(40, 600), rgba(C.text, q.on('paren', 1, 0.5)), 'left'); rij(410, A, tP);
    if (t > tV) text(ctx, 'inteelt', 620, 590, fTekst(40, 600), rgba(C.text, q.on('Verwante', 1, 0.5)), 'left'); rij(670, B, tV);
    const hz = q.on('homozygoot', 1, 0.6); if (hz > 0.01) for (const i of [0, 3]) { const kr = 18, xx = 640 + i * kr * 5; ctx.strokeStyle = rgba(C.koraal, hz); ctx.lineWidth = 3; roundRect(ctx, xx - kr - 6, 670 - kr - 6, kr * 4.1 + 12, kr * 2 + 12, kr + 6); ctx.stroke(); }
    naamBij(ctx, 'homozygoot: ziekte zichtbaar', null, 1220, 760, q.on('recessieve', 1, 0.5), 'center', C.koraal); },
  s35(ctx, t, q) { E4.sch(ctx);
    const kleuren = ['#C9A35C', '#8C6A3A', '#D8C08A', '#6E5A3E', '#B08A5C', '#E0D2A8'];
    const rjA = q.on('gewassen', 1, 0.5) * (1 - q.on('genenbank', 1, 0.8)), weg = q.on('beeld', 1, 1.2);
    if (rjA > 0.01) { ctx.save(); ctx.globalAlpha *= rjA; kleuren.forEach((k, i) => { ctx.save(); ctx.globalAlpha *= (i === 1 || i === 4) ? 1 : 1 - 0.8 * weg; zaadPotje(ctx, 600 + (i - 2.5) * 130, 560, 130, k, true); ctx.restore(); });
      naamBij(ctx, 'rassen', null, 600, 650, 1, 'center'); ctx.restore(); }
    const gb = q.on('genenbank', 1, 0.8); genenbankRek(ctx, 140, 220, 860, 520, { a: gb }); naamBij(ctx, 'genenbank', q.on('Wageningen') > 0.01 ? 'CGN WAGENINGEN · −20 °C' : null, 570, 800, gb, 'center');
    const bA = q.on('reservekopie', 1, 0.8); if (bA > 0.01) { ctx.save(); ctx.globalAlpha *= bA;
      const berg = (P, k) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = k; ctx.fill(); };
      berg([[1180, 780], [1450, 300], [1580, 430], [1700, 270], [1900, 780]], C.berg); berg([[1450, 300], [1505, 398], [1475, 385], [1440, 410], [1405, 372]], C.bergTop); berg([[1700, 270], [1760, 370], [1725, 360], [1690, 380], [1650, 345]], C.bergTop);
      roundRect(ctx, 1490, 620, 160, 140, 8); shape(ctx, '#2A3A58', C.line, 2); ctx.restore(); }
    const tR = q.at('reservekopie'), u = clamp((t - tR - 0.6) / 2.6, 0, 1);
    if (u > 0) { pijl(ctx, 1010, 480, 1440, 640, C.goud, ease(Math.min(1, u * 2)), 4); const v = ease(u); zaadPotje(ctx, lerp(870, 1570, v), lerp(330, 740, v) - Math.sin(Math.PI * v) * 120, lerp(105, 90, v), '#C9A35C', true); }
    naamBij(ctx, 'reservekopie', q.on('miljoen') > 0.01 ? 'Spitsbergen · >1,3 miljoen monsters' : 'Spitsbergen', 1540, 210, q.on('Spitsbergen', 1, 0.5), 'center'); },
  s36(ctx, t, q) { macroNacht(ctx, { horizon: 520 });
    const tZ = q.at('plantenziekte');
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 160 + i * 130 + (r % 2) * 50, y = 640 + r * 100, z = clamp((t - tZ - (i * 0.12 + r * 0.25)) / 1.2, 0, 1);
      ctx.save(); ctx.globalAlpha = 1 - 0.55 * z; kool(ctx, 'sluitkool', x, y, 2.2); ctx.restore();
      if (z > 0) { circ(ctx, x + 10, y - 50, 11 * z, rgba(C.koraal, 0.85)); circ(ctx, x - 14, y - 40, 7 * z, rgba(C.koraal, 0.85)); } }
    naamBij(ctx, 'één modern ras · nieuwe ziekte', null, 700, 520, q.on('plantenziekte', 1, 0.5), 'center');
    const tO = q.at('oud'), g = clamp((t - tO) / 1.6, 0, 1);
    { const pa = clamp((t - tO + 1.0) / 0.4, 0, 1) * (1 - g); if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; zaadPotje(ctx, 1560, 760, 90, '#C9A35C', true); ctx.restore(); } }
    if (g > 0) kool(ctx, 'sluitkool', 1560, 760, 4.2 * (0.25 + 0.75 * ease(g)), { a: Math.min(1, g * 2) });
    naamBij(ctx, 'oud ras', 'ALLEL VOOR RESISTENTIE', 1560, 500, q.on('oud', 1, 0.5), 'center', C.groen);
    const vz = q.on('verzekering', 1, 0.5); if (vz > 0.01) metaText(ctx, 'variatie = verzekering', 960, 160, rgba(C.goud, vz), 'center', 30); },

  // ---------------- Recap
  s37(ctx, t, q) { E4.sch(ctx);
    const T = [['antibioticum', 'selecteert resistente bacteriën', 0.1, 'antibioticum', 'selecteert'], ['fokken', 'kiest kleine honden', 0.4, 'honden', 'opzet'], ['veredelen', 'kiest blad, knop of bloem', 0.55, 'kool', 'opzet']];
    T.forEach(([titel, s2, p, w, ws], i) => { const a = q.on(w, 1, 0.6); if (a <= 0.01) return; const x = 140 + i * 580; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, x, 180, 520, 620, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5);
      text(ctx, titel, x + 260, 250, fTekst(44, 700), C.text, 'center'); text(ctx, s2, x + 260, 300, fTekst(32, 400), C.text2, 'center');
      if (i === 0) { const d = q.on('doodt', 1, 1.2); ctx.save(); ctx.beginPath(); ctx.rect(x + 20, 320, 480, 150); ctx.clip();
        E4.kol(ctx, x + 260, 395, 200, 55, 8, 70, (k) => k < 2 ? { type: 'resistent', zweep: false } : (d < 0.5 ? { type: 'gevoelig', zweep: false } : { type: 'gevoelig', dood: 1, zweep: false }), 2, t, 0.5); ctx.restore(); }
      if (i === 1) { hond(ctx, 'chihuahua', x + 340, 515, 2.0, { t }); wolf(ctx, x + 160, 515, 2.0, { t }); }
      if (i === 2) { kool(ctx, 'boerenkool', x + 160, 490, 1.9); kool(ctx, 'spruitjes', x + 360, 490, 1.5); }
      const pp = lerp(0.6, p, ease((t - q.at(ws)) / 2.5)); pot(ctx, x + 260, 730, 0.62, { p: pp, n: 40, seed: i + 2 }); ctx.restore(); });
    haak(ctx, 140, 1780, 820, 'de mens bepaalt welke allelen vaker worden', C.groen, q.on('genenpool', 1, 0.6)); },
});
