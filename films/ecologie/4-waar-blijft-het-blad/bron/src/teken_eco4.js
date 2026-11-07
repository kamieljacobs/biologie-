// teken_eco4.js — film-eigen tekeningen Ecologie v2 film 4 "Waar blijft het blad?" (voorvoegsel e4), 29 okt 2026. Laadt na lib_eco.js en pop_eco_*.js.
// Seriekleuren uit lib_eco.js (ECOK): organisch groen, anorganisch grijs, stikstof blauw, fosfor oranje, energie goud, warmte koraal.

// ======================= Achtergronden =======================
// Eikenbos (Macro-nacht): vlakke lucht, achterste boomlaag gedempt, strooisellaag als bruine strook
function e4Bos(ctx, o = {}) { const hz = o.horizon || 640; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hz - 120, W, 120);
  for (let i = 0; i < 9; i++) { ctx.save(); ctx.globalAlpha = 0.45; e4BoomZonder(ctx, 60 + i * 230 + 50 * hash(i), hz + 20, 2.6 + hash(i + 3) * 0.8); ctx.restore(); }
  vul(ctx, [[-60, hz + 40], [500, hz + 10], [1100, hz + 50], [1990, hz + 20], [1990, H], [-60, H]], C.bgMacroHill);
  vul(ctx, [[-60, hz + 150], [700, hz + 130], [1400, hz + 160], [1990, hz + 140], [1990, H], [-60, H]], '#4A3A2C'); // strooisellaag
  if (o.blad !== false) for (let i = 0; i < 70; i++) { const x = hash(i) * W, y = hz + 150 + hash(i + 40) * 160; ctx.save(); ctx.translate(x, y); ctx.rotate(hash(i + 9) * 6.28); ctx.beginPath(); ctx.ellipse(0, 0, 13, 6, 0, 0, 6.283); ctx.fillStyle = ['#8C5A3A', '#A06C36', '#6E4A30'][i % 3]; ctx.fill(); ctx.restore(); } }
function e4BoomZonder(ctx, x, y, s, o = {}) { ctx.save(); ctx.beginPath(); ctx.rect(x - 2000, y - 3000, 4000, 3000 + 2); ctx.clip(); ecoZomereik(ctx, x, y, s, o); ctx.restore(); }
// Hoogveen: veenmoskussens (Sphagnum) als bolle rood-groene kussens, plassen
function e4Hoogveen(ctx, o = {}) { const hz = o.horizon || 600; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hz - 100, W, 100);
  vul(ctx, [[-60, hz], [600, hz - 20], [1300, hz + 10], [1990, hz - 10], [1990, H], [-60, H]], '#3C4A3A');
  for (let i = 0; i < 26; i++) { const x = hash(i) * 2000 - 40, y = hz + 60 + hash(i + 20) * 240, r = 50 + 50 * hash(i + 7); ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.38, 0, Math.PI, 0); ctx.fillStyle = i % 3 ? '#6E7A44' : '#8A5A4A'; ctx.fill(); }
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(300 + i * 450, hz + 150 + (i % 2) * 90, 120, 22, 0, 0, 6.283); ctx.fillStyle = '#2A4A5A'; ctx.fill(); }
  for (let i = 0; i < 8; i++) e4Wollegras(ctx, 200 + i * 220 + 40 * hash(i), hz + 120 + 60 * hash(i + 2)); }
function e4Wollegras(ctx, x, y) { lijn(ctx, [[x, y], [x + 2, y - 60]], '#8A9A5A', 3); circ(ctx, x + 2, y - 66, 9, '#ECE8DC'); }

// ======================= Logboek, weegschaal, gaaszakje =======================
function e4Logboek(ctx, x, y, w, regels, o = {}) { const { titel = 'LOGBOEK · ÉÉN EIKENBLAD', kolom = ['datum', 'massa', 'wie', 'vrijgekomen'], kw = [0, 0.15, 0.28, 0.72] } = o; const rh = 64;
  roundRect(ctx, x, y, w, 110 + regels.length * rh, 16); shape(ctx, rgba(C.bgMicro, 0.92), C.line, 1.5); metaText(ctx, titel, x + 24, y + 40, C.goud, 'left', 26);
  kolom.forEach((k, i) => metaText(ctx, k, x + 24 + kw[i] * w, y + 86, C.text2, 'left', 26));
  regels.forEach((r, j) => { const yy = y + 110 + j * rh + 40; r.forEach((c, i) => { if (c == null) return; if (typeof c === 'function') c(ctx, x + 24 + kw[i] * w, yy); else text(ctx, c, x + 24 + kw[i] * w, yy, fTekst(i === 2 ? 34 : 36, i === 1 ? 700 : 500), i === 1 ? C.text : C.text2, 'left'); }); }); }
function e4Weegschaal(ctx, x, y, w, getal) { roundRect(ctx, x - w / 2, y - w * 0.18, w, w * 0.18, 8); shape(ctx, '#3A4458', '#5A6478', 1.5); roundRect(ctx, x - w * 0.42, y - w * 0.24, w * 0.84, w * 0.06, 4); shape(ctx, '#8FA0B5', '#AFC0D0', 1);
  roundRect(ctx, x - w * 0.22, y - w * 0.15, w * 0.44, w * 0.11, 4); shape(ctx, '#1A2A20', null); text(ctx, getal, x, y - w * 0.065, fTekst(Math.round(w * 0.085), 700), '#9FE0A8', 'center'); }
// gaaszakje (bovenaanzicht, schuin): ruitjespatroon met maaswijdte; inhoud = functie
function e4Zakje(ctx, x, y, w, h, maas, inhoud, o = {}) { ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.fillStyle = rgba('#2A2018', 0.5); ctx.fill(); ctx.clip(); if (inhoud) inhoud(ctx);
  ctx.strokeStyle = rgba('#D8D0BE', 0.55); ctx.lineWidth = maas > 20 ? 2.5 : 1.2; for (let i = -h; i < w + h; i += maas) { ctx.beginPath(); ctx.moveTo(x - w / 2 + i, y - h / 2); ctx.lineTo(x - w / 2 + i - h, y + h / 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - w / 2 + i - h, y - h / 2); ctx.lineTo(x - w / 2 + i, y + h / 2); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.strokeStyle = '#C9C0AA'; ctx.lineWidth = 3; ctx.stroke(); }

// ======================= Moleculen (vereenvoudigde vormen) =======================
function e4Keten(ctx, x, y, n, r, kl = C.groen, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); for (let i = 0; i < n; i++) { const xx = i * r * 1.9, yy = (i % 2) * r * 0.5; if (i) lijn(ctx, [[xx - r * 1.9, ((i - 1) % 2) * r * 0.5], [xx, yy]], _lt(kl, 0.2), 3);
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + 0.52; ctx[k ? 'lineTo' : 'moveTo'](xx + Math.cos(a) * r, yy + Math.sin(a) * r); } ctx.closePath(); shape(ctx, rgba(kl, 0.85), _lt(kl, 0.35), 1.5); } ctx.restore(); }
function e4Kraal(ctx, x, y, n, r, kl = C.groen) { for (let i = 0; i < n; i++) { const a = i * 0.9; circ(ctx, x + i * r * 1.6, y + Math.sin(a) * r * 1.2, r, rgba(kl, 0.9), _lt(kl, 0.35), 1.5); } } // eiwit als kralenketen
function e4CO2(ctx, x, y, r = 14) { circ(ctx, x - r * 1.6, y, r * 0.85, '#C9D2DE', '#E8EEF4', 1.5); circ(ctx, x, y, r, ECOK.koolstof, _lt(ECOK.koolstof, 0.3), 1.5); circ(ctx, x + r * 1.6, y, r * 0.85, '#C9D2DE', '#E8EEF4', 1.5); }
function e4H2O(ctx, x, y, r = 12) { circ(ctx, x, y, r, C.teal, _lt(C.teal, 0.35), 1.5); circ(ctx, x - r * 0.9, y + r * 0.7, r * 0.55, '#E8EEF4'); circ(ctx, x + r * 0.9, y + r * 0.7, r * 0.55, '#E8EEF4'); }
function e4Ion(ctx, x, y, r, kl, rand = null) { ctx.beginPath(); for (let k = 0; k < 3; k++) { const a = k / 3 * 6.283 - 1.57; ctx[k ? 'lineTo' : 'moveTo'](x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); shape(ctx, kl, _lt(kl, 0.35), 1.5); circ(ctx, x, y, r * 0.35, _lt(kl, 0.4)); if (rand) { circ(ctx, x, y, r * 1.35, null, rand, 3); } }
const e4Nitraat = (ctx, x, y, r = 14, focus = false) => e4Ion(ctx, x, y, r, ECOK.stikstof, focus ? C.goud : null);
const e4Fosfaat = (ctx, x, y, r = 14) => { ctx.beginPath(); for (let k = 0; k < 4; k++) { const a = k / 4 * 6.283 + 0.785; ctx[k ? 'lineTo' : 'moveTo'](x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.closePath(); shape(ctx, ECOK.fosfor, _lt(ECOK.fosfor, 0.35), 1.5); };
const e4Ammonium = (ctx, x, y, r = 14) => { circ(ctx, x, y, r, _lt(ECOK.stikstof, 0.3), _lt(ECOK.stikstof, 0.55), 1.5); text(ctx, '+', x, y + r * 0.45, fTekst(Math.round(r * 1.3), 700), C.bgMicro, 'center'); };
function e4Warmte(ctx, x, y, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let i = 0; i <= 12; i++) { const yy = y - i * 5 * s, xx = x + k * 14 * s + Math.sin(i * 0.8) * 5 * s; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }

// ======================= Bacteriën, schimmels, enzymen =======================
function e4Bacterie(ctx, x, y, l = 40, rot = 0, kl = C.teal) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -l / 2, -l * 0.2, l, l * 0.4, l * 0.2); shape(ctx, rgba(kl, 0.85), _lt(kl, 0.35), 1.5); ctx.restore(); }
function e4Schimmel(ctx, x, y, L, an, seed = 1, kl = '#E8E2D4') { const tak = (px, py, a, l, d) => { if (d > 3 || l < 12) return; const qx = px + Math.cos(a) * l, qy = py + Math.sin(a) * l; lijn(ctx, [[px, py], [(px + qx) / 2 + Math.sin(a) * 6, (py + qy) / 2 - Math.cos(a) * 6], [qx, qy]], kl, 2.5 - d * 0.4); tak(qx, qy, a + 0.5 * (hash(seed + d * 7 + l) - 0.3), l * 0.7, d + 1); tak(qx, qy, a - 0.7 * hash(seed + d * 3 + l), l * 0.55, d + 1); }; tak(x, y, an, L, 0); }
// Micro-bodem: donkere bodem met korrels, bladsnipper (groen-bruin), bacteriën en schimmeldraden
function e4BodemMicro(ctx, cx, cy, R, o = {}) { ctx.fillStyle = '#2A221C'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  for (let i = 0; i < 30; i++) circ(ctx, cx - R + hash(i) * 2 * R, cy - R + hash(i + 50) * 2 * R, 8 + 14 * hash(i + 9), '#3E3228');
  if (o.snipper !== false) vul(ctx, [[cx - R * 0.45, cy - R * 0.1], [cx - R * 0.1, cy - R * 0.32], [cx + R * 0.35, cy - R * 0.18], [cx + R * 0.4, cy + R * 0.15], [cx - R * 0.05, cy + R * 0.25], [cx - R * 0.42, cy + R * 0.12]], '#7A6A3E', '#9A8A5A', 2);
  if (o.schimmel !== false) { e4Schimmel(ctx, cx - R * 0.9, cy + R * 0.5, R * 0.45, -0.5, 3); e4Schimmel(ctx, cx + R * 0.8, cy - R * 0.6, R * 0.4, 2.6, 8); }
  for (let i = 0; i < (o.nb || 14); i++) { const a = hash(i + 3) * 6.283, d = R * (0.35 + 0.25 * hash(i + 6)); e4Bacterie(ctx, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8, 26 + 10 * hash(i), a, i % 3 ? C.teal : '#7FAFC0'); } }

// ======================= Composthoop, veen =======================
function e4Compost(ctx, x, y, w, h, o = {}) { const P = [[x - w / 2, y], [x - w * 0.38, y - h * 0.7], [x - w * 0.12, y - h], [x + w * 0.15, y - h * 0.96], [x + w * 0.4, y - h * 0.6], [x + w / 2, y]];
  vul(ctx, P, '#4E3A28', '#6E5A44', 2);
  if (o.doorsnede) { vul(ctx, P.map(([px, py]) => [x + (px - x) * 0.6, y - (y - py) * 0.6]), '#3A2A1E'); for (let i = 0; i < 8; i++) lijn(ctx, [[x - w * 0.3 + i * w * 0.08, y - 10], [x - w * 0.25 + i * w * 0.07, y - h * 0.55]], o.nat ? rgba(C.teal, 0.8) : rgba('#8FA0B5', 0.6), o.nat ? 9 : 5); }
  else for (let i = 0; i < 30; i++) { const xx = x - w * 0.4 + hash(i) * w * 0.8, yy = y - h * 0.1 - hash(i + 9) * h * 0.75; if (yy < y - h * (1 - Math.abs(xx - x) / w * 1.4)) continue; ctx.save(); ctx.translate(xx, yy); ctx.rotate(hash(i + 3) * 6); ctx.beginPath(); ctx.ellipse(0, 0, 16, 7, 0, 0, 6.283); ctx.fillStyle = ['#7A8A44', '#C98A3E', '#8C5A3A', '#A0A050'][i % 4]; ctx.fill(); ctx.restore(); } }
function e4Thermometer(ctx, x, y, h, frac, label) { roundRect(ctx, x - 10, y - h, 20, h, 10); shape(ctx, '#2A3448', C.line, 1.5); circ(ctx, x, y + 8, 18, C.koraal, _lt(C.koraal, 0.3), 1.5); roundRect(ctx, x - 5, y - h * frac, 10, h * frac, 5); ctx.fillStyle = C.koraal; ctx.fill(); if (label) naamBij(ctx, label, null, x + 30, y - h * frac + 12, 1, 'left', C.koraal); }
function e4VeenDoorsnede(ctx, x, y, w, h, o = {}) { const lagen = ['#6E7A44', '#5A4A32', '#4E3E2A', '#44352A', '#3A2E24', '#30261E']; const lh = h / lagen.length;
  lagen.forEach((k, i) => { ctx.fillStyle = k; ctx.fillRect(x, y + i * lh, w, lh + 1); ctx.strokeStyle = rgba('#000000', 0.15); ctx.lineWidth = 2; ctx.beginPath(); for (let j = 0; j <= 20; j++) { const xx = x + j * w / 20, yy = y + i * lh + Math.sin(j * 1.3 + i) * 4; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
    for (let j = 0; j < 14; j++) lijn(ctx, [[x + hash(i * 30 + j) * w, y + i * lh + lh * 0.3 + hash(j + i) * lh * 0.4], [x + hash(i * 30 + j) * w + 26, y + i * lh + lh * 0.35 + hash(j + i + 1) * lh * 0.4]], rgba('#C9A86A', 0.35), 2); });
  ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(x, y + lh * 0.6, w, h - lh * 0.6); }
// silhouet van een liggend lichaam onder een wollen omslagdoek (geen gezicht), voor het meisje van Yde
function e4Yde(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[-150, 10], [-120, -22], [-40, -30], [60, -28], [120, -18], [150, 4], [120, 18], [-120, 20]], '#7A5A3E', '#9A7A5A', 2);
  ctx.strokeStyle = '#5E4430'; ctx.lineWidth = 2; for (let i = -100; i < 120; i += 22) { ctx.beginPath(); ctx.moveTo(i, -26); ctx.lineTo(i + 6, 16); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-168, -2, 24, 20, 0, 0, 6.283); shape(ctx, '#6A4A30', '#8A6A4A', 2); for (let i = 0; i < 6; i++) lijn(ctx, [[-180 + i * 5, -18], [-196 + i * 4, 10]], '#B8704A', 3); ctx.restore(); }
function e4ZwarteRoker(ctx, cx, cy, R) { ctx.fillStyle = '#0E1622'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); vul(ctx, [[cx - R, cy + R * 0.7], [cx - R * 0.3, cy + R * 0.55], [cx + R * 0.4, cy + R * 0.65], [cx + R, cy + R * 0.6], [cx + R, cy + R], [cx - R, cy + R]], '#2E2A2A');
  vul(ctx, [[cx - 40, cy + R * 0.62], [cx - 22, cy - R * 0.1], [cx + 20, cy - R * 0.12], [cx + 42, cy + R * 0.62]], '#3A3434', '#5A5050', 2);
  for (let i = 0; i < 7; i++) circ(ctx, cx + Math.sin(i) * 14 * i * 0.6, cy - R * 0.2 - i * 34, 22 + i * 8, rgba('#4A4646', 0.85 - i * 0.08));
  for (let i = 0; i < 10; i++) { const a = hash(i) * 6.283, d = 70 + 50 * hash(i + 4); e4Bacterie(ctx, cx + Math.cos(a) * d, cy + R * 0.2 + Math.sin(a) * d * 0.4, 24, a, '#E0B64A'); } }

// Achtertuin (Macro-nacht): schutting van planken, gazon, moestuinbak; geen bos (BEELDAFSPRAKEN: decor alleen waar de scène speelt)
function e4Tuin(ctx, o = {}) { const hz = o.horizon || 560; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3E3A34'; ctx.fillRect(0, hz - 220, W, 220); ctx.strokeStyle = '#2E2A26'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, hz - 220); ctx.lineTo(x, hz); ctx.stroke(); }
  ctx.fillStyle = '#4A453E'; ctx.fillRect(0, hz - 160, W, 14); ctx.fillRect(0, hz - 60, W, 14);
  ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, hz, W, H - hz); }
function e4Moestuinbak(ctx, x, y, w) { ctx.fillStyle = '#6E5440'; ctx.fillRect(x, y - 60, w, 60); ctx.strokeStyle = '#5A4432'; ctx.lineWidth = 3; ctx.strokeRect(x, y - 60, w, 60); ctx.fillStyle = '#3A2A1E'; ctx.fillRect(x + 8, y - 62, w - 16, 10); }
// staafdiagram van de gaasproef: beginmassa 125 g, na 6 maanden grof 53 g, fijn 89 g
function e4ProefStaaf(ctx, x, y, w, h) { const stv = [[125, 'begin', C.text2], [53, 'grof gaas', C.oker], [89, 'fijn gaas', C.teal]]; const bw = w / 5;
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; for (let v = 25; v <= 125; v += 25) { ctx.beginPath(); ctx.moveTo(x, y - v / 125 * h); ctx.lineTo(x + w, y - v / 125 * h); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let v = 0; v <= 125; v += 25) metaText(ctx, String(v), x - 14, y - v / 125 * h + 10, C.text2, 'right', 28); metaText(ctx, 'MASSA BLAD (G)', x - 60, y - h - 50, C.text2, 'left', 28);
  stv.forEach(([v, n, kl], i) => { const bx = x + bw * (0.6 + i * 1.5); roundRect(ctx, bx, y - v / 125 * h, bw, v / 125 * h, 6); shape(ctx, rgba(kl, 0.85), _lt(kl, 0.3), 1.5); text(ctx, v + ' g', bx + bw / 2, y - v / 125 * h - 16, fTekst(36, 700), C.text, 'center'); metaText(ctx, n, bx + bw / 2, y + 44, C.text2, 'center', 26); });
  metaText(ctx, 'NA 6 MAANDEN · VOORBEELDPROEF', x + w, y + 92, C.text2, 'right', 26); }
