// teken_eco7.js — Ecologie v2, film 7 'Stikstof gaat rond': film-eigen tekeningen (29 okt 2026). Laden na lib_eco.js en de pop_*-bestanden.
// Kleuren: stikstof = ECOK.stikstof (blauw); ammonium licht stikstofblauw, nitraat vol stikstofblauw; fosfor = ECOK.fosfor (oranje);
// organische stof = ECOK.organisch (groen); bacteriën teal-grijs (Part C: bacteriën teal en grijs); bodem oker/bruin.
function _m7(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _d7 = (h, k = 0.25) => _m7(h, k, '#000000'), _l7 = (h, k = 0.25) => _m7(h, k, '#FFFFFF');
const E7 = {
  amm: '#8DB6E2', nit: ECOK.stikstof, n2: '#A9B8CC', fos: ECOK.fosfor, org: ECOK.organisch,
  zand: '#C9A86A', zandD: '#A8884E', klei: '#7A6248', kleiD: '#5E4A36', humus: '#4A3A2C', mest: '#5C4630', mestL: '#7A5E40',
  glas: '#AFC0D0', water: '#2E6FBF', bact: '#6FA3A8', bactR: '#A6CED2', gras: '#7FC48F', grasD: '#5FA86E', sloot: '#2A5A6E', kroos: '#7FB84F'
};

// ---------- deeltjes (moleculen en ionen) ----------
function e7N2(ctx, x, y, r = 14, o = {}) { const { a = 1, rot = 0, kleur = E7.n2 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  for (const s of [-1, 1]) circ(ctx, s * r * 0.62, 0, r * 0.8, kleur, _l7(kleur, 0.35), 1.5);
  ctx.strokeStyle = _d7(kleur, 0.45); ctx.lineWidth = Math.max(1.5, r * 0.12); for (const d of [-0.3, 0, 0.3]) { ctx.beginPath(); ctx.moveTo(-r * 0.25, d * r); ctx.lineTo(r * 0.25, d * r); ctx.stroke(); } ctx.restore(); }
function e7Ion(ctx, x, y, r, soort, o = {}) { const { a = 1, teken = true } = o; const kl = soort === 'amm' ? E7.amm : soort === 'nit' ? E7.nit : soort === 'fos' ? E7.fos : E7.n2;
  ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, kl, _l7(kl, 0.35), 1.5);
  if (teken) { ctx.strokeStyle = _d7(kl, 0.6); ctx.lineWidth = Math.max(1.5, r * 0.16); ctx.beginPath(); ctx.moveTo(x - r * 0.45, y); ctx.lineTo(x + r * 0.45, y); if (soort === 'amm') { ctx.moveTo(x, y - r * 0.45); ctx.lineTo(x, y + r * 0.45); } ctx.stroke(); }
  ctx.restore(); }

// ---------- bacteriën ----------
function e7Bacterie(ctx, x, y, l = 60, o = {}) { const { a = 1, rot = 0, kleur = E7.bact, nadruk = false } = o; const b = l * 0.38; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -l / 2, -b / 2, l, b, b / 2); shape(ctx, kleur, _l7(kleur, 0.35), 1.5);
  ctx.strokeStyle = rgba(_l7(kleur, 0.5), 0.6); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-l * 0.25, -b * 0.08); ctx.bezierCurveTo(-l * 0.1, b * 0.18, l * 0.05, -b * 0.2, l * 0.22, b * 0.06); ctx.stroke(); // nucleoïde
  for (let i = 0; i < 5; i++) circ(ctx, -l * 0.32 + i * l * 0.15, (i % 2 ? 1 : -1) * b * 0.22, 1.6, rgba(C.grain, 0.5));
  if (nadruk) { roundRect(ctx, -l / 2 - 6, -b / 2 - 6, l + 12, b + 12, b / 2 + 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.restore(); }
function e7Anammox(ctx, x, y, r = 50, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; // anammoxbacterie: bolvormig met een eigen binnenzak (anammoxosoom)
  circ(ctx, x, y, r, '#6E9A9E', _l7('#6E9A9E', 0.35), 1.5); circ(ctx, x + r * 0.08, y + r * 0.05, r * 0.58, '#5A8488', _l7('#5A8488', 0.3), 1.2);
  ctx.strokeStyle = rgba('#B6D6D8', 0.55); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x + r * 0.08, y + r * 0.05, r * (0.18 + k * 0.12), 0.3 + k, 2.4 + k); ctx.stroke(); }
  ctx.restore(); }

// ---------- teststrip en klok ----------
function e7Strip(ctx, x, y, soort, sterkte, o = {}) { const { h = 300, w = 46, a = 1, label = true } = o; const kl = soort === 'amm' ? E7.amm : E7.nit; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h, w, h, 6); shape(ctx, '#E8E4DA', '#FFFFFF', 1);
  roundRect(ctx, x - w / 2 + 5, y - h + 8, w - 10, (w - 10) * 1.4, 4); shape(ctx, sterkte > 0.02 ? _m7('#F2F0EA', Math.min(1, sterkte), _d7(kl, 0.25)) : '#F2F0EA', _d7(kl, 0.2), 1.5);
  if (label) naamBij(ctx, soort === 'amm' ? 'ammonium' : 'nitraat', null, x, y + 44, 1, 'center', soort === 'amm' ? E7.amm : _l7(E7.nit, 0.35));
  ctx.restore(); }
function e7Klok(ctx, x, y, week, o = {}) { const { max = 8, r = 54 } = o; ctx.save(); circ(ctx, x, y, r, rgba(C.fill, 0.85), C.line, 1.5);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r - 10, -Math.PI / 2, -Math.PI / 2 + 6.283 * Math.min(1, week / max)); ctx.stroke();
  text(ctx, String(week), x, y + 16, fTekst(46, 700), C.text, 'center'); metaText(ctx, week === 1 ? 'WEEK' : 'WEKEN', x, y + r + 34, C.text2, 'center', 26); ctx.restore(); }

// ---------- planten in een bak (kleine schaal, zijaanzicht) ----------
function e7Gras(ctx, x, y, w, hoogte, o = {}) { const { kleur = E7.gras, n = 14, a = 1, seed = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, bx = x - w / 2 + u * w + (hash(seed + i) - 0.5) * 6, hh = hoogte * (0.65 + 0.45 * hash(seed + i * 3)), lean = (hash(seed + i * 7) - 0.5) * 0.5;
    const top = [bx + lean * hh, y - hh]; vul(ctx, [[bx - 3, y], [bx + lean * hh * 0.5 - 1.5, y - hh * 0.55], top, [bx + lean * hh * 0.5 + 2.5, y - hh * 0.5], [bx + 3, y]], i % 3 ? kleur : _d7(kleur, 0.12)); }
  ctx.restore(); }
function e7Wortels(ctx, x, y, diep, w, o = {}) { const { kleur = '#C8AA84', knol = 0, seed = 3, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const x0 = x - w / 2 + (i + 0.5) * w / 5, P = [[x0, y]]; let p = [x0, y]; for (let k = 1; k <= 5; k++) { p = [p[0] + (hash(seed + i * 9 + k) - 0.5) * 16, p[1] + diep / 5]; P.push(p); }
    lijn(ctx, P, kleur, 2.4); for (let k = 1; k < 5; k++) { const q = P[k], s = k % 2 ? 1 : -1; lijn(ctx, [q, [q[0] + s * 14, q[1] + 10]], kleur, 1.4);
      if (knol && (i + k) % 2 === 0) { ctx.save(); ctx.translate(q[0] + s * 9, q[1] + 6); ctx.rotate(s * 0.6); ctx.beginPath(); ctx.ellipse(0, 0, 5 * knol, 3.4 * knol, 0, 0, 6.283); shape(ctx, '#E8809E', '#9A3E5E', 1); ctx.restore(); } } }
  ctx.restore(); }
function e7Klaver(ctx, x, y, w, hoogte, o = {}) { const { a = 1, n = 6, seed = 5 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const bx = x - w / 2 + (i + 0.5) * w / n + (hash(seed + i) - 0.5) * 8, hh = hoogte * (0.7 + 0.4 * hash(seed + i * 5)), top = [bx + (hash(i * 3 + seed) - 0.5) * 14, y - hh];
    lijn(ctx, [[bx, y], [(bx + top[0]) / 2, y - hh * 0.5], top], '#78A058', 2.2);
    for (const da of [-1.15, 0, 1.15]) { const an = -Math.PI / 2 + da * 0.9, r = hoogte * 0.16, c = [top[0] + Math.cos(an) * r * 0.75, top[1] + Math.sin(an) * r * 0.75]; ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.55, r * 0.75, 0, 0, 6.283); shape(ctx, da ? '#4A8442' : '#56944C', '#6EA460', 1); ctx.strokeStyle = '#B2D49C'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-r * 0.3, -r * 0.1); ctx.lineTo(0, r * 0.15); ctx.lineTo(r * 0.3, -r * 0.1); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }

// ---------- proefbak (doorzichtig, zijaanzicht) ----------
// o.lagen: [[kleur, dikte], ...] van onder naar boven; o.plant: 'gras'|'klaver'|'grasGeel'|null; o.mest: dikte van de mestlaag bovenop;
// o.water: waterpeil boven de grond (px) ; o.dicht: luchtdicht deksel; o.druppels: regen erboven; o.opvang: niveau 0..1 in de beker; o.label
function e7Bak(ctx, x, y, o = {}) { const { w = 240, h = 300, lagen = [[E7.zand, 160]], plant = null, plantH = 90, mest = 0, water = 0, dicht = false, druppels = 0, opvang = 0.3, label = null, meta = null, a = 1, wortelKnol = 0, kraanOpen = true, ionen = null, seed = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; const x0 = x - w / 2, bodem = y - 70; // y = tafelblad; bak staat op pootjes boven de beker
  // pootjes en beker
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * (w / 2 - 14), bodem); ctx.lineTo(x + s * (w / 2 - 14), y); ctx.stroke(); }
  const bw = 64, bh = 50; ctx.beginPath(); ctx.moveTo(x - bw / 2, y - bh); ctx.lineTo(x - bw / 2 + 5, y); ctx.lineTo(x + bw / 2 - 5, y); ctx.lineTo(x + bw / 2, y - bh); ctx.strokeStyle = E7.glas; ctx.lineWidth = 2; ctx.stroke();
  if (opvang > 0) { ctx.fillStyle = rgba(E7.water, 0.55); ctx.beginPath(); const yv = y - bh * opvang; ctx.moveTo(x - bw / 2 + 5 * (1 - opvang) + 1, yv); ctx.lineTo(x - bw / 2 + 6, y - 1); ctx.lineTo(x + bw / 2 - 6, y - 1); ctx.lineTo(x + bw / 2 - 5 * (1 - opvang) - 1, yv); ctx.fill(); }
  // kraantje
  ctx.fillStyle = C.line; ctx.fillRect(x - 6, bodem, 12, 14); ctx.fillRect(x - 14, bodem + 6, 28, 5); if (kraanOpen && opvang > 0) { circ(ctx, x, bodem + 26, 3.5, rgba(E7.water, 0.9)); }
  // grondlagen
  let yy = bodem; const top0 = bodem - lagen.reduce((s, l) => s + l[1], 0);
  for (const [kl, d] of lagen) { ctx.fillStyle = kl; ctx.fillRect(x0 + 3, yy - d, w - 6, d); ctx.fillStyle = _d7(kl, 0.12); for (let i = 0; i < d * w / 260; i++) { const px = x0 + 6 + hash(seed + i * 1.7 + d) * (w - 12), py = yy - d + 3 + hash(seed + i * 2.9 + d) * (d - 6); ctx.fillRect(px, py, 2.4, 2.4); } yy -= d; }
  if (mest) { vul(ctx, [[x0 + 3, top0], [x0 + 3, top0 - mest * 0.7], [x0 + w * 0.3, top0 - mest], [x0 + w * 0.6, top0 - mest * 0.8], [x - x0 + x0 + w / 2 - 3, top0 - mest * 0.9], [x0 + w - 3, top0]], E7.mest); }
  const grond = top0 - mest * 0.6;
  if (plant) { ctx.save(); ctx.beginPath(); ctx.rect(x0 + 3, top0 - 4, w - 6, bodem - top0 + 4); ctx.clip(); e7Wortels(ctx, x, top0, Math.min(110, (bodem - top0) * 0.75), w * 0.7, { knol: plant === 'klaver' ? (wortelKnol || 1) : 0, seed }); ctx.restore();
    if (plant === 'gras') e7Gras(ctx, x, grond, w - 30, plantH, { seed }); if (plant === 'grasGeel') e7Gras(ctx, x, grond, w - 30, plantH, { kleur: '#B8B06A', n: 9, seed }); if (plant === 'klaver') e7Klaver(ctx, x, grond, w - 40, plantH, { seed, n: 8 }); }
  if (ionen) ionen(ctx, x0, top0, w, bodem);
  if (water) { ctx.fillStyle = rgba(E7.water, 0.42); ctx.fillRect(x0 + 3, top0 - water, w - 6, bodem - top0 + water); ctx.strokeStyle = rgba('#9CCBE3', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + 3, top0 - water); ctx.lineTo(x0 + w - 3, top0 - water); ctx.stroke(); }
  // glaswand
  ctx.strokeStyle = E7.glas; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, bodem - h); ctx.lineTo(x0, bodem); ctx.lineTo(x0 + w, bodem); ctx.lineTo(x0 + w, bodem - h); ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0 + 14, bodem - h + 16); ctx.lineTo(x0 + 14, bodem - h + 90); ctx.stroke();
  if (dicht) { roundRect(ctx, x0 - 8, bodem - h - 14, w + 16, 18, 5); shape(ctx, '#5E6A80', '#97A3B6', 1.5); }
  if (druppels) { for (let i = 0; i < 9; i++) { const dx = x0 + 20 + hash(seed + i * 4.1) * (w - 40), dy = bodem - h + 24 + hash(seed + i * 2.3) * Math.max(10, top0 - (bodem - h) - 60); ctx.fillStyle = rgba('#9CCBE3', 0.85); ctx.beginPath(); ctx.moveTo(dx, dy - 10); ctx.quadraticCurveTo(dx + 6, dy, dx, dy + 5); ctx.quadraticCurveTo(dx - 6, dy, dx, dy - 10); ctx.fill(); } }
  if (label) naamBij(ctx, label, meta, x, bodem - h - (dicht ? 36 : 22) - (meta ? 30 : 0), 1, 'center');
  ctx.restore(); return { top0, bodem, x0, w }; }

// ---------- stikstofkringloop (Schema) ----------
// Planaire indeling (geen kruisende pijlen): buitenring lucht → nitraat → plant → dier → dood → ammonium → lucht, nitrificatie als koorde.
// o.licht = stappen die oplichten (rest 35 %); o.zuurstof = markeer 'met/zonder zuurstof'; o.knoopDim = knopen die dimmen.
const E7_KNOOP = { lucht: [420, 210, 'stikstofgas', 'IN DE LUCHT'], nit: [1000, 250, 'nitraat', 'IN DE BODEM'], plant: [1540, 330, 'eiwit in plant', 'ORGANISCH'],
  dier: [1540, 640, 'eiwit in dier', 'ORGANISCH'], dood: [1000, 790, 'mest, urine, dood', 'ORGANISCH'], amm: [420, 640, 'ammonium', 'IN DE BODEM'] };
// [van, naar, x1, y1, x2, y2, naam, meta, labelX, labelY, uitlijning]
const E7_STAP = {
  binding: ['lucht', 'amm', 420, 262, 420, 588, 'stikstofbinding', 'BACTERIËN', 390, 430, 'right'],
  denitrificatie: ['nit', 'lucht', 866, 238, 556, 218, 'denitrificatie', 'ZONDER ZUURSTOF', 711, 168, 'center'],
  nitrificatie: ['amm', 'nit', 520, 594, 910, 300, 'nitrificatie', 'MET ZUURSTOF', 735, 500, 'left'],
  opname: ['nit', 'plant', 1134, 262, 1406, 318, 'stikstofassimilatie', 'PLANT', 1270, 226, 'center'],
  eten: ['plant', 'dier', 1540, 380, 1540, 590, 'eten', 'DIER', 1510, 500, 'right'],
  dood: ['dier', 'dood', 1408, 676, 1136, 770, '', '', 0, 0, 'left'],
  ammonificatie: ['dood', 'amm', 866, 786, 556, 676, 'ammonificatie', 'AFBREKERS', 690, 838, 'center'] };
function e7Kringloop(ctx, o = {}) { const { licht = Object.keys(E7_STAP), schaal = 1, dx = 0, dy = 0, labels = true, zuurstof = false, knoopDim = [] } = o; ctx.save(); ctx.translate(dx, dy); ctx.scale(schaal, schaal);
  const kleurK = (k) => (k === 'plant' || k === 'dier' || k === 'dood') ? E7.org : (k === 'lucht' ? E7.n2 : E7.nit);
  for (const [id, S] of Object.entries(E7_STAP)) { const [, , x1, y1, x2, y2, naam, meta, lx, ly, al] = S; const on = licht.includes(id); const kl = (id === 'eten' || id === 'dood') ? E7.org : E7.nit;
    pijl(ctx, x1, y1, x2, y2, on ? kl : C.line, on ? 1 : 0.35, on ? 5 : 3, 18);
    if (labels && naam) { const mkl = zuurstof && (id === 'nitrificatie' || id === 'denitrificatie') ? C.goud : null; ctx.save(); ctx.globalAlpha *= on ? 1 : 0.35; naamBij(ctx, naam, meta, lx, ly, 1, al, mkl || C.text); ctx.restore(); } }
  for (const [k, [x, y, naam, meta]] of Object.entries(E7_KNOOP)) { const kl = kleurK(k); ctx.save(); ctx.globalAlpha *= knoopDim.includes(k) ? 0.35 : 1; roundRect(ctx, x - 135, y - 46, 270, 92, 46); shape(ctx, _m7(kl, 0.72, C.bgSchema), kl, 2); text(ctx, naam, x, y + 4, fTekst(36, 600), C.text, 'center'); metaText(ctx, meta, x, y + 34, C.text2, 'center', 22); ctx.restore(); }
  ctx.restore(); }

// ---------- kleideeltje met ladingen ----------
function e7Kleideeltje(ctx, x, y, w, h, o = {}) { const { a = 1, n = 7 } = o; ctx.save(); ctx.globalAlpha *= a;
  vul(ctx, [[x - w / 2, y], [x - w / 2 + 20, y - h], [x + w / 2 - 10, y - h + 6], [x + w / 2, y - 4], [x + w / 2 - 30, y + h * 0.3], [x - w / 2 + 30, y + h * 0.25]], E7.klei, _l7(E7.klei, 0.3), 2);
  for (let i = 0; i < n; i++) { const px = x - w / 2 + 60 + i * (w - 120) / (n - 1), py = y - h * 0.45; circ(ctx, px, py, 17, _l7(E7.klei, 0.25), _l7(E7.klei, 0.5), 1.5); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.stroke(); }
  ctx.restore(); }

// ---------- stikstofbalans (staafdiagram) ----------
function e7Balans(ctx, x, y, o = {}) { const { k = 2.2, overschot = false, splits = false } = o; ctx.save(); // y = basislijn; k = px per kg
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x + 720, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x - 40, y - 250 * k); ctx.stroke();
  for (let v = 0; v <= 250; v += 50) { ctx.beginPath(); ctx.moveTo(x - 48, y - v * k); ctx.lineTo(x - 40, y - v * k); ctx.stroke(); metaText(ctx, String(v), x - 58, y - v * k + 9, C.text2, 'right', 26); }
  metaText(ctx, 'KG N PER HA PER JAAR', x - 40, y - 250 * k - 26, C.text2, 'left', 26);
  const blok = (bx, v0, v, kl, naam) => { roundRect(ctx, bx, y - (v0 + v) * k, 200, v * k - 3, 6); shape(ctx, _m7(kl, 0.25, C.bgSchema), _l7(kl, 0.3), 1.5); text(ctx, naam, bx + 100, y - (v0 + v / 2) * k + 13, fTekst(36, 600), C.text, 'center'); };
  blok(x + 40, 0, 120, E7.nit, 'kunstmest 120'); blok(x + 40, 120, 80, ECOK.organisch, 'mest 80'); blok(x + 40, 200, 20, E7.n2, '');
  text(ctx, 'lucht 20', x + 260, y - 210 * k + 12, fTekst(36, 600), C.text, 'left');
  blok(x + 440, 0, 140, C.oker, 'oogst 140');
  text(ctx, 'erop', x + 140, y + 54, fTekst(40, 700), C.text, 'center'); text(ctx, 'eraf', x + 540, y + 54, fTekst(40, 700), C.text, 'center');
  if (overschot) { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x + 440, y - 220 * k, 200, 80 * k - 3, 6); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'overschot 80', x + 540, y - 180 * k + 13, fTekst(36, 700), C.goud, 'center'); }
  metaText(ctx, 'VOORBEELD', x + 720, y - 250 * k - 26, C.text2, 'right', 26);
  ctx.restore(); }

// ---------- landschap: weiland met sloot (Macro, nacht) ----------
function e7Weiland(ctx, o = {}) { const { groen = 0, horizon = 520, sloot = true, slootY = 760, koeien = true, t = 0 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  vul(ctx, [[-50, horizon], [400, horizon - 50], [900, horizon - 20], [1400, horizon - 60], [1980, horizon - 30], [1980, H], [-50, H]], C.bgMacroHill);
  for (let i = 0; i < 9; i++) { const bx = 80 + i * 230 + hash(i) * 60, s = 0.8 + 0.4 * hash(i * 3); ctx.fillStyle = '#2A4434'; ctx.beginPath(); ctx.ellipse(bx, horizon - 30 * s, 60 * s, 48 * s, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#3A3028'; ctx.fillRect(bx - 4, horizon - 10 * s, 8, 14 * s); }
  vul(ctx, [[-50, horizon + 30], [600, horizon + 10], [1200, horizon + 40], [1980, horizon + 20], [1980, H], [-50, H]], C.bgMacroFront);
  if (sloot) { const y0 = slootY; vul(ctx, [[-50, y0 - 18], [700, y0 - 26], [1400, y0 - 14], [1980, y0 - 22], [1980, y0 + 70], [1400, y0 + 82], [700, y0 + 72], [-50, y0 + 80]], groen > 0.5 ? _m7(E7.sloot, groen * 0.35, E7.kroos) : E7.sloot);
    ctx.strokeStyle = rgba('#9CCBE3', 0.45 * (1 - groen)); ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < W; x += 24) { const y = y0 + 6 + Math.sin(x / 70 + t) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    if (groen > 0) { for (let i = 0; i < 520 * groen; i++) { const px = hash(i * 1.37) * W, py = y0 - 14 + hash(i * 2.11) * 84; ctx.fillStyle = i % 3 ? E7.kroos : '#6AA040'; ctx.beginPath(); ctx.ellipse(px, py, 7, 4, hash(i) * 3, 0, 6.283); ctx.fill(); } }
    vul(ctx, [[-50, y0 + 74], [700, y0 + 70], [1400, y0 + 84], [1980, y0 + 76], [1980, H], [-50, H]], '#3F5C44'); }
  // gras-sprietjes langs de oever
  for (let i = 0; i < 70; i++) { const gx = hash(i * 5.3) * W, gy = slootY - 22 + hash(i * 7.1) * 6; lijn(ctx, [[gx, gy], [gx + (hash(i) - 0.5) * 10, gy - 16 - hash(i * 2) * 14]], '#5F8A5E', 3); }
}
function e7Waterplant(ctx, x, y, h, a = 1) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const P = [[x + i * 6 - 12, y]]; for (let k = 1; k <= 5; k++) P.push([x + i * 6 - 12 + Math.sin(k + i) * 8, y - h * k / 5 * (0.7 + 0.3 * hash(i))]); lijn(ctx, P, '#5FA86E', 3); } ctx.restore(); }

// ---------- doorsnede bodem en sloot (Schema/Macro) ----------
function _vh7(ctx, P, fill, stroke = null, lw = 2) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function e7Doorsnede(ctx, o = {}) { const { slootX = 1340, maaiveld = 470, gw = 700, kroos = 1, winter = false, slootB = 300 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, maaiveld + 2);
  const s0 = slootX - 60, s1 = slootX + slootB + 60, sd = maaiveld + 150; // bovenrand en bodem van de sloot
  _vh7(ctx, [[0, maaiveld], [s0, maaiveld], [s0 + 70, sd], [s1 - 70, sd], [s1, maaiveld], [W, maaiveld], [W, H], [0, H]], '#5A4632');
  _vh7(ctx, [[0, maaiveld], [s0, maaiveld], [s0 + 8, maaiveld + 34], [0, maaiveld + 34]], '#4A3A2A'); _vh7(ctx, [[s1, maaiveld], [W, maaiveld], [W, maaiveld + 34], [s1 - 8, maaiveld + 34]], '#4A3A2A');
  _vh7(ctx, [[0, gw], [W, gw], [W, H], [0, H]], '#3E5A6E'); ctx.strokeStyle = rgba('#9CCBE3', 0.5); ctx.lineWidth = 2; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.moveTo(0, gw); ctx.lineTo(W, gw); ctx.stroke(); ctx.setLineDash([]);
  _vh7(ctx, [[s0 + 14, maaiveld + 26], [s0 + 72, sd - 4], [s1 - 72, sd - 4], [s1 - 14, maaiveld + 26]], '#2E6A8A');
  ctx.strokeStyle = rgba('#9CCBE3', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s0 + 14, maaiveld + 26); ctx.lineTo(s1 - 14, maaiveld + 26); ctx.stroke();
  if (kroos) { for (let i = 0; i < 70 * kroos; i++) { const px = s0 + 20 + hash(i * 1.7) * (s1 - s0 - 40), py = maaiveld + 24 + hash(i * 2.3) * 5; ctx.fillStyle = i % 3 ? E7.kroos : '#6AA040'; ctx.beginPath(); ctx.ellipse(px, py, 9, 4, 0, 0, 6.283); ctx.fill(); } }
  const grasK = winter ? '#7A8A5E' : '#6FAA6A';
  for (let i = 0; i < 160; i++) { const gx = hash(i * 3.3) * W; if (gx > s0 - 10 && gx < s1 + 10) continue; lijn(ctx, [[gx, maaiveld + 2], [gx + (hash(i) - 0.5) * 8, maaiveld - (winter ? 8 : 18) - hash(i * 5) * (winter ? 6 : 16)]], grasK, 3); }
  for (let i = 0; i < 18; i++) { const wx = 40 + i * 100 + hash(i) * 30; if (wx > s0 - 40 && wx < s1 + 40) continue; e7Wortels(ctx, wx, maaiveld + 2, winter ? 40 : 90, 40, { seed: i, a: 0.7 }); }
  metaText(ctx, 'GRONDWATER', 80, gw + 50, '#9CCBE3', 'left', 26);
}
// ---------- rioolwaterzuivering (Schema) ----------
function e7Rwzi(ctx, x, y, o = {}) { const { focus = null, t = 0, dim = 0.35, labels = true } = o; // y = bodem van de tanks
  const tank = (tx, w, h, naam, meta, id, binnen) => { const on = !focus || focus.includes(id); ctx.save(); ctx.globalAlpha *= on ? 1 : dim; roundRect(ctx, tx, y - h, w, h, 14); shape(ctx, rgba('#2A4A66', 0.9), E7.glas, 2);
    ctx.fillStyle = rgba(E7.water, 0.5); ctx.fillRect(tx + 4, y - h + 30, w - 8, h - 34); if (binnen) binnen(tx, w, h); if (labels) naamBij(ctx, naam, meta, tx + w / 2, y + 50, 1, 'center'); ctx.restore(); };
  const buis = (x1, x2, yy) => { ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.stroke(); pijl(ctx, x2 - 30, yy, x2 - 6, yy, C.line, 1, 3, 14); };
  // rooster
  tank(x, 150, 220, 'rooster', 'GROF VUIL', 'rooster', (tx, w, h) => { ctx.strokeStyle = '#C8D2DE'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(tx + 25 + i * 20, y - h + 40); ctx.lineTo(tx + 25 + i * 20, y - 8); ctx.stroke(); } });
  buis(x + 150, x + 210, y - 150);
  tank(x + 210, 230, 220, 'bezinktank', 'ZAND EN SLIB', 'bezink', (tx, w, h) => { vul(ctx, [[tx + 6, y - 6], [tx + 6, y - 38], [tx + w * 0.5, y - 52], [tx + w - 6, y - 36], [tx + w - 6, y - 6]], '#6E5A44'); });
  buis(x + 440, x + 500, y - 150);
  tank(x + 500, 360, 260, 'beluchtingstank', 'MET ZUURSTOF', 'lucht', (tx, w, h) => { for (let i = 0; i < 40; i++) { const bx = tx + 25 + hash(i * 1.3) * (w - 50), by = y - 20 - ((hash(i * 2.7) * (h - 60) + t * 120) % (h - 60)); circ(ctx, bx, by, 4 + hash(i) * 5, rgba('#DCE8F2', 0.55), rgba('#FFFFFF', 0.6), 1); }
    ctx.strokeStyle = '#97A3B6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(tx + 20, y - 14); ctx.lineTo(tx + w - 20, y - 14); ctx.stroke(); });
  buis(x + 860, x + 920, y - 150);
  tank(x + 920, 300, 260, 'zonder lucht', 'GEEN ZUURSTOF', 'anox', (tx, w, h) => { ctx.strokeStyle = rgba('#97A3B6', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(tx + w / 2, y - h / 2 + 10, 60, 0.2, 5.6); ctx.stroke(); pijl(ctx, tx + w / 2 + 50, y - h / 2 - 25, tx + w / 2 + 58, y - h / 2 - 6, '#97A3B6', 0.7, 3, 10); });
  buis(x + 1220, x + 1280, y - 150);
  tank(x + 1280, 230, 220, 'nabezinktank', 'SCHOON WATER ERUIT', 'na', (tx, w, h) => { vul(ctx, [[tx + 6, y - 6], [tx + 6, y - 26], [tx + w - 6, y - 30], [tx + w - 6, y - 6]], '#5E6A50'); });
  if (labels) metaText(ctx, 'VEREENVOUDIGD', x, y + 130, C.text2, 'left', 26);
}

// ---------- kraan en glas ----------
function e7Kraan(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#B8C0CC'; roundRect(ctx, -20, -120, 40, 120, 10); ctx.fill(); roundRect(ctx, -20, -130, 130, 34, 14); ctx.fill(); roundRect(ctx, 86, -110, 26, 30, 6); ctx.fill(); ctx.fillStyle = '#8F98A6'; roundRect(ctx, -40, -150, 80, 22, 8); ctx.fill(); ctx.restore(); }
function e7Glas(ctx, x, y, h = 160, vol = 0.7) { const w = h * 0.6; ctx.save(); ctx.fillStyle = rgba('#9CCBE3', 0.35); ctx.beginPath(); ctx.moveTo(x - w / 2 + 6 + 6 * (1 - vol), y - h * vol); ctx.lineTo(x - w / 2 + 12, y); ctx.lineTo(x + w / 2 - 12, y); ctx.lineTo(x + w / 2 - 6 - 6 * (1 - vol), y - h * vol); ctx.fill();
  ctx.strokeStyle = E7.glas; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 12, y); ctx.lineTo(x + w / 2 - 12, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke(); ctx.restore(); }

// ---------- toilet (zijaanzicht, eenvoudig lijnwerk in Schema-stijl) ----------
function e7Toilet(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#DCE3EC'; ctx.strokeStyle = '#97A3B6'; ctx.lineWidth = 2;
  roundRect(ctx, -10, -230, 70, 110, 10); ctx.fill(); ctx.stroke(); vul(ctx, [[-80, -120], [60, -120], [60, -100], [30, -40], [20, 0], [-40, 0], [-50, -40], [-90, -100]], '#DCE3EC', '#97A3B6', 2); ctx.fillStyle = '#97A3B6'; roundRect(ctx, 14, -222, 30, 10, 4); ctx.fill(); ctx.restore(); }

// ---------- wortelknolletje in doorsnede (Micro) — twijfelscène ----------
// Recept (bron: botmuc.snsb.de 'Bean nodules'; methodekennis): knolletje 2–4 mm (witte klaver langwerpig); buiten een schors van lege plantencellen,
// binnen een rode/roze zone van grote cellen vol bacteroïden (rood door leghemoglobine, dat zuurstof bindt); vaatbundels lopen langs de rand.
function e7Knol(ctx, x, y, r, o = {}) { const { a = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); shape(ctx, '#C8B08A', '#E2CFAE', 1.5); // schors
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); ctx.clip();
  // cellen: schors (licht) en infectiezone (roze)
  for (let i = 0; i < 160; i++) { const u = hash(i * 1.7) * 2 - 1, v = hash(i * 2.9) * 2 - 1; if (u * u + v * v > 1) continue; const px = x + u * r * 1.25, py = y + v * r, d = Math.hypot(u, v), rc = (d < 0.72 ? 0.17 : 0.1) * r;
    ctx.beginPath(); ctx.ellipse(px, py, rc * 1.1, rc, hash(i) * 3, 0, 6.283); ctx.fillStyle = d < 0.72 ? '#D87A90' : '#D6C2A0'; ctx.fill(); ctx.strokeStyle = d < 0.72 ? '#F0B4C2' : '#EADCC2'; ctx.lineWidth = 1.2; ctx.stroke();
    if (d < 0.72) { for (let k = 0; k < 7; k++) { const bx = px + (hash(i * 9 + k) - 0.5) * rc * 1.3, by = py + (hash(i * 7 + k) - 0.5) * rc * 1.1; ctx.save(); ctx.translate(bx, by); ctx.rotate(hash(i + k * 3) * 3); roundRect(ctx, -rc * 0.22, -rc * 0.08, rc * 0.44, rc * 0.16, rc * 0.08); ctx.fillStyle = '#7A3A50'; ctx.fill(); ctx.restore(); } } }
  ctx.restore(); ctx.strokeStyle = '#9C7A50'; ctx.lineWidth = 4; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.12, r * 0.86, 0, s > 0 ? 0.3 : 3.4, s > 0 ? 1.4 : 4.5); ctx.stroke(); }
  ctx.restore(); }

// ---------- stal-doorsnede: koe op een roostervloer met mestput ----------
function e7Stal(ctx, o = {}) { const { vloer = 640 } = o; ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2E3A52'; ctx.fillRect(0, 0, W, vloer); ctx.strokeStyle = '#4A5878'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(200, vloer); ctx.lineTo(200, 160); ctx.lineTo(960, 60); ctx.lineTo(1720, 160); ctx.lineTo(1720, vloer); ctx.stroke();
  ctx.fillStyle = '#5E6A80'; for (let x = 200; x < 1720; x += 46) ctx.fillRect(x, vloer, 34, 18); // roosters
  ctx.fillStyle = '#3E3426'; ctx.fillRect(200, vloer + 18, 1520, 200); ctx.fillStyle = '#5C4630'; ctx.fillRect(200, vloer + 110, 1520, 108); metaText(ctx, 'MESTPUT', 230, vloer + 180, C.text2, 'left', 26); }

// ---------- eiwitketen (kralenketting die zich vouwt; BEELDAFSPRAKEN: eiwit = keten, geen bol) ----------
// o.vouw 0 (los, golvend) .. 1 (kluwen van helix + lussen); o.n kralen; o.stikstof = elk aminozuur een blauw stipje
function e7Eiwit(ctx, cx, cy, s = 1, o = {}) { const { vouw = 0.8, n = 30, stikstof = true, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  const los = (i) => [(i - n / 2) * 22 * s, Math.sin(i * 0.6) * 30 * s];
  const kluw = (i) => { const u = i / n; if (u < 0.35) { const k = i; return [(-120 + k * 7) * s, (-60 + Math.sin(k * 1.7) * 26) * s]; } if (u < 0.55) { const k = i - 0.35 * n; return [(30 + Math.cos(k * 0.9) * 60) * s, (-10 + k * 12) * s]; } const k = i - 0.55 * n; return [(90 - k * 14) * s, (70 + Math.sin(k * 1.6) * 22) * s]; };
  const P = Array.from({ length: n }, (_, i) => { const A = los(i), B = kluw(i), f = ease(vouw); return [cx + A[0] + (B[0] - A[0]) * f, cy + A[1] + (B[1] - A[1]) * f]; });
  lijn(ctx, P, '#9AA8C0', 3 * s);
  P.forEach((p, i) => { circ(ctx, p[0], p[1], 11 * s, i % 4 === 0 ? '#8C9DBA' : '#7A8BA8', '#A9B8D0', 1.2); if (stikstof) circ(ctx, p[0] + 4 * s, p[1] - 4 * s, 3.6 * s, E7.nit); });
  ctx.restore(); }
