// teken_eco3.js — film-eigen tekeningen Ecologie v2 film 3 "Wie eet wie?" (voorvoegsel e3), 29 okt 2026.
// ======================= Achtergronden (Macro-nacht, duinen) =======================
// Duinen: vlakke lucht, lagen duin naar voren lichter/groener; geen verlopen.
function e3Duin(ctx, o = {}) { const hz = o.horizon || 600; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hz - 110, W, 110);
  vul(ctx, [[-60, hz], [260, hz - 80], [560, hz - 40], [900, hz - 110], [1260, hz - 50], [1600, hz - 95], [1990, hz - 40], [1990, H], [-60, H]], '#3B4A52');
  vul(ctx, [[-60, hz + 70], [420, hz + 20], [820, hz + 80], [1280, hz + 30], [1990, hz + 70], [1990, H], [-60, H]], C.bgMacroHill);
  vul(ctx, [[-60, hz + 170], [600, hz + 140], [1200, hz + 180], [1990, hz + 150], [1990, H], [-60, H]], C.bgMacroFront);
  if (o.helm !== false) (o.helmPos || [[120, hz + 150, 1.1], [360, hz + 168, 0.8], [1500, hz + 160, 1.0], [1780, hz + 150, 1.2], [980, hz + 172, 0.7]]).forEach(([x, y, k], i) => e3HelmBoven(ctx, x, y, 2.2 * k, { t: i * 0.3, wind: 0.2 })); }
// helm zonder ondergrondse delen (in een landschap zie je de wortelstokken niet)
function e3HelmBoven(ctx, x, y, s, o = {}) { ctx.save(); ctx.beginPath(); ctx.rect(x - 400, y - 600, 800, 600 + 2); ctx.clip(); ecoHelm(ctx, x, y, s, o); ctx.restore(); }
// Sneeuwbos (Canada, winter): vlakke lucht, sneeuwvlak, sparrensilhouetten in drie lagen
function e3Sneeuwbos(ctx, o = {}) { const hz = o.horizon || 640; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hz - 120, W, 120);
  const spar = (x, y, h, kl) => { ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(x, y - h); for (let i = 0; i < 5; i++) { const yy = y - h + h * (i + 1) / 5, b = h * 0.11 * (i + 1) * 0.55; ctx.lineTo(x + b, yy); ctx.lineTo(x + b * 0.45, yy); } for (let i = 4; i >= 0; i--) { const yy = y - h + h * (i + 1) / 5, b = h * 0.11 * (i + 1) * 0.55; ctx.lineTo(x - b * 0.45, yy); ctx.lineTo(x - b, yy); } ctx.closePath(); ctx.fill(); ctx.fillRect(x - h * 0.02, y - 4, h * 0.04, 10); };
  for (let i = 0; i < 22; i++) spar(hash(i) * 2000 - 40, hz - 10, 170 + 90 * hash(i + 9), '#2A3B46');
  ctx.fillStyle = '#C9D3DE'; ctx.fillRect(0, hz, W, H - hz); vul(ctx, [[-50, hz + 60], [500, hz + 30], [1100, hz + 70], [1990, hz + 40], [1990, H], [-50, H]], '#DCE3EC');
  for (let i = 0; i < 9; i++) spar(80 + i * 230 + 60 * hash(i + 3), hz + 50 + 20 * hash(i + 4), 300 + 120 * hash(i + 5), '#324A44'); }

// ======================= Kleine planten =======================
// Braamtak (Rubus fruticosus): boog met stekels (kort, naar achter gericht), drietallig blad, een paar bramen. Stekels 3–6 mm.
function e3Braam(ctx, x, y, s, o = {}) { const { a = 1, bramen = 3, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const P = [[0, 0], [30, -60], [90, -100], [170, -110], [240, -80]]; lijn(ctx, P, '#7A4A52', 7);
  for (let i = 1; i < 16; i++) { const u = i / 16, k = Math.floor(u * 4), v = u * 4 - k, p = P[k], q = P[k + 1]; const px = p[0] + (q[0] - p[0]) * v, py = p[1] + (q[1] - p[1]) * v; const an = Math.atan2(q[1] - p[1], q[0] - p[0]), zij = i % 2 ? -1 : 1;
    ctx.fillStyle = '#C9A0A8'; ctx.beginPath(); ctx.moveTo(px + Math.cos(an) * 4, py + Math.sin(an) * 4); ctx.lineTo(px - Math.cos(an) * 6 + Math.cos(an + zij * 1.57) * 9, py - Math.sin(an) * 6 + Math.sin(an + zij * 1.57) * 9); ctx.lineTo(px - Math.cos(an) * 3, py - Math.sin(an) * 3); ctx.closePath(); ctx.fill(); }
  const blaadje = (bx, by, r, l) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(r); vul(ctx, [[0, 0], [l * 0.3, -l * 0.18], [l * 0.75, -l * 0.15], [l, 0], [l * 0.75, l * 0.15], [l * 0.3, l * 0.18]], '#4F8C5C', '#6FAE7C', 1.2); lijn(ctx, [[0, 0], [l * 0.95, 0]], '#3E7049', 1.2); ctx.restore(); };
  for (const [bx, by, r] of [[60, -80, -2.2], [150, -108, -1.4], [205, -95, -0.6]]) { blaadje(bx, by, r, 50); blaadje(bx, by, r - 0.7, 40); blaadje(bx, by, r + 0.7, 40); }
  for (let i = 0; i < bramen; i++) { const bx = 110 + i * 48, by = -96 + (i % 2) * 14; lijn(ctx, [[bx, by], [bx + 4, by + 20]], '#5E6B3E', 2); for (let k = 0; k < 9; k++) circ(ctx, bx + 4 + (k % 3 - 1) * 5.5, by + 24 + Math.floor(k / 3) * 5.5, 3.6, i === 0 ? '#7A2E3C' : '#2A1E2C', '#5A4458', 0.8); }
  ctx.restore(); }

// ======================= Relatieteken (+ / − / 0) =======================
function e3Teken(ctx, x, y, t, o = {}) { const { r = 34, a = 1 } = o; if (a <= 0.01) return; const kl = t === '+' ? C.groen : t === '−' ? C.koraal : C.text2; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(C.bgMicro, 0.85), kl, 3); ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  if (t === '+') { ctx.moveTo(x - r * 0.45, y); ctx.lineTo(x + r * 0.45, y); ctx.moveTo(x, y - r * 0.45); ctx.lineTo(x, y + r * 0.45); }
  else if (t === '−') { ctx.moveTo(x - r * 0.45, y); ctx.lineTo(x + r * 0.45, y); }
  else { ctx.ellipse(x, y, r * 0.3, r * 0.42, 0, 0, 6.283); } ctx.stroke(); ctx.restore(); }

// ======================= Voedselweb-schema =======================
// knoop: pictogram (kleine pop) op een ronde schijf + naam eronder. Pijlen: van voedsel naar eter (oker = voedsel/stof, open pijlkop).
function e3Knoop(ctx, x, y, naam, teken, o = {}) { const { r = 78, a = 1, focus = false, rand = C.line } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(C.fill, 0.9), focus ? C.goud : rand, focus ? 3 : 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip(); teken(ctx, x, y, r); ctx.restore();
  if (naam) naamBij(ctx, naam, o.meta || null, x, y + r + 44, 1, 'center'); ctx.restore(); }
function e3Pijl(ctx, x1, y1, x2, y2, o = {}) { const { r1 = 82, r2 = 82, kl = C.oker, lw = 4, a = 1 } = o; const an = Math.atan2(y2 - y1, x2 - x1);
  pijl(ctx, x1 + Math.cos(an) * r1, y1 + Math.sin(an) * r1, x2 - Math.cos(an) * r2, y2 - Math.sin(an) * r2, kl, a, lw, 20); }
// pictogrammen in een knoop (dieren uit de bibliotheek, geschaald zodat ze in de schijf passen)
const E3P = {
  helm: (ctx, x, y, r) => e3HelmBoven(ctx, x, y + r * 0.6, r / 50, {}),
  gras: (ctx, x, y, r) => e3HelmBoven(ctx, x, y + r * 0.6, r / 55, {}),
  eik: (ctx, x, y, r) => e3Boom(ctx, 'eik', x, y + r * 0.72, r / 62, {}),
  konijn: (ctx, x, y, r) => ecoKonijn(ctx, x - r * 0.05, y + r * 0.45, r / 26, { houding: 'zitten' }),
  vos: (ctx, x, y, r) => ecoVos(ctx, x - r * 0.08, y + r * 0.42, r / 44, { houding: 'staan' }),
  muis: (ctx, x, y, r) => muis(ctx, x, y + r * 0.3, r / 9, {}),
  gaai: (ctx, x, y, r) => ecoGaai(ctx, x - r * 0.1, y + r * 0.62, r / 22, { houding: 'staan' }),
  merel: (ctx, x, y, r) => merel(ctx, x - r * 0.15, y + r * 0.5, r / 110, {}),
  rups: (ctx, x, y, r) => { blad(ctx, x - r * 0.5, y + r * 0.1, r * 1.1, { rot: -0.15 }); e3Rups(ctx, x - r * 0.35, y - r * 0.02, r / 26, -0.15); },
  braam: (ctx, x, y, r) => e3Braam(ctx, x - r * 0.75, y + r * 0.55, r / 150, { bramen: 2 }),
  schaap: (ctx, x, y, r) => ecoSchaap(ctx, x - r * 0.05, y + r * 0.5, r / 72, { houding: 'staan' }),
  slak: (ctx, x, y, r) => ecoLeverbotslak(ctx, x, y + r * 0.35, r / 0.9, {}),
  lynx: (ctx, x, y, r) => ecoLynx(ctx, x - r * 0.05, y + r * 0.5, r / 52, { houding: 'staan' }),
  haas: (ctx, x, y, r) => ecoSneeuwschoenhaas(ctx, x, y + r * 0.5, r / 30, { houding: 'zitten', vacht: 'winter' }),
};
// posities van het duinweb (gebruikt in e3s09–e3s11, e3s41, e3s42)
const E3WEB = { helm: [330, 790], eik: [760, 800], braam: [1190, 800], konijn: [330, 540], muis: [760, 540], rups: [1190, 540], vos: [540, 270], gaai: [960, 290], merel: [1380, 290] };
const E3WEBP = [['helm', 'konijn'], ['eik', 'muis'], ['eik', 'rups'], ['eik', 'gaai'], ['rups', 'merel'], ['konijn', 'vos'], ['muis', 'vos'], ['braam', 'vos']];
function e3Web(ctx, o = {}) { const { toon = Object.keys(E3WEB), dim = [], focus = [], pijlen = E3WEBP, dik = [], extra = null, namen = true } = o;
  for (const [a, b] of pijlen) { if (!toon.includes(a) || !toon.includes(b)) continue; const [x1, y1] = E3WEB[a], [x2, y2] = E3WEB[b]; const d = dim.includes(a) || dim.includes(b); e3Pijl(ctx, x1, y1, x2, y2, { r1: 70, r2: 74, a: d ? 0.35 : 1, lw: dik.includes(a + '-' + b) ? 9 : 4 }); }
  for (const k of toon) { const [x, y] = E3WEB[k]; e3Knoop(ctx, x, y, namen ? k : null, E3P[k], { r: 66, a: dim.includes(k) ? 0.35 : 1, focus: focus.includes(k) }); }
  if (extra) extra(ctx); }

// ======================= Pelsgrafiek haas en lynx 1900–1920 (Odum 1953; vangsten in duizenden vellen) =======================
const E3HAAS = [30, 47.2, 70.2, 77.4, 36.3, 20.6, 18.1, 21.4, 22, 25.4, 27.1, 40.3, 57, 76.6, 52.3, 19.5, 11.2, 7.6, 14.6, 16.2, 24.7];
const E3LYNX = [4, 6.1, 9.8, 35.2, 59.4, 41.7, 19, 13, 8.3, 9.1, 7.4, 8, 12.3, 19.5, 45.7, 51.1, 29.7, 15.8, 9.7, 10.1, 8.6];
function e3Grafiek(ctx, o = {}) { const { x = 230, y = 790, w = 1400, h = 560, tot = 21, lynx = true, pieken = false, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1; for (let v = 20; v <= 80; v += 20) { const yy = y - v / 80 * h; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w + 10, y); ctx.stroke();
  for (let v = 0; v <= 80; v += 20) metaText(ctx, String(v), x - 18, y - v / 80 * h + 10, C.text2, 'right', 28);
  for (let j = 0; j <= 20; j += 5) metaText(ctx, String(1900 + j), x + j / 20 * w, y + 44, C.text2, 'center', 28);
  metaText(ctx, 'VELLEN (× 1000)', x - 10, y - h - 30, C.text2, 'left', 28); metaText(ctx, 'JAAR', x + w, y + 84, C.text2, 'right', 28);
  const P = (arr, n) => arr.slice(0, n).map((v, i) => [x + i / 20 * w, y - v / 80 * h]);
  const tek = (arr, kl) => { const p = P(arr, tot); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); p.forEach(q => circ(ctx, q[0], q[1], 5, kl)); };
  tek(E3HAAS, C.teal); if (lynx) tek(E3LYNX, C.oker);
  if (pieken) { for (const [i, kl] of [[3, C.teal], [13, C.teal], [4, C.oker], [15, C.oker]]) { const px = x + i / 20 * w; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y - h); ctx.stroke(); ctx.setLineDash([]); } }
  ctx.restore(); }

// ======================= Leverbot, lever, stadia =======================
// Leverbot (Fasciola hepatica): blad- of lancetvormig, 2–3,5 cm × 1–1,5 cm, voorste 'kegel' met mondzuignap, buikzuignap kort erachter; grijsbruin met donker vertakte darm.
function e3Leverbot(ctx, x, y, s, o = {}) { const { rot = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); // eenheid 1 = 0,1 mm; lengte 300
  const om = [[150, 0], [138, -12], [118, -16], [110, -34], [80, -62], [20, -72], [-50, -64], [-110, -40], [-150, -8], [-152, 0], [-150, 8], [-110, 40], [-50, 64], [20, 72], [80, 62], [110, 34], [118, 16], [138, 12]];
  vul(ctx, om, '#9C8676', '#B9A595', 3);
  ctx.strokeStyle = '#6E5848'; ctx.lineWidth = 4; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(104, k * 6); ctx.quadraticCurveTo(40, k * 30, -120, k * 18); ctx.stroke(); for (let i = 0; i < 6; i++) { const xx = 70 - i * 32; ctx.beginPath(); ctx.moveTo(xx, k * (20 + i)); ctx.lineTo(xx - 22, k * (48 + i * 1.5)); ctx.stroke(); } }
  circ(ctx, 140, 0, 8, '#7E6858', '#C9B5A5', 2); circ(ctx, 96, 0, 11, '#7E6858', '#C9B5A5', 2); ctx.restore(); }
// Schapenlever als schema (doorsnede): bruinrode lobben, galgangen als vertakte gele buizen
function e3Lever(ctx, x, y, s, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  vul(ctx, [[-200, -40], [-130, -110], [0, -120], [140, -90], [210, -20], [160, 60], [40, 90], [-90, 80], [-190, 40]], '#8C4A42', '#B0685E', 3);
  const gang = [[[-10, 70], [0, 20], [-20, -40], [-90, -80]], [[0, 20], [60, -30], [140, -50]], [[-20, -40], [30, -90]], [[0, 20], [-100, 20], [-160, 0]]];
  for (const g of gang) lijn(ctx, g, '#C9A35C', 16); for (const g of gang) lijn(ctx, g, '#7A5A40', 9); ctx.restore(); }
// stadia van de levenscyclus (vergroot, schematisch)
function e3Ei(ctx, x, y, r = 14) { ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.62, -0.2, 0, 6.283); shape(ctx, '#B89A5A', '#D8BC80', 2); ctx.beginPath(); ctx.ellipse(x - r * 0.82, y + r * 0.15, r * 0.22, r * 0.4, -0.2, 0, 6.283); ctx.strokeStyle = '#7A6040'; ctx.lineWidth = 1.5; ctx.stroke(); }
function e3Trilhaarlarve(ctx, x, y, r = 20) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.quadraticCurveTo(x + r * 0.6, y - r * 0.6, x - r * 0.4, y - r * 0.5); ctx.quadraticCurveTo(x - r * 1.1, y, x - r * 0.4, y + r * 0.5); ctx.quadraticCurveTo(x + r * 0.6, y + r * 0.6, x + r, y); shape(ctx, '#8FB8C9', '#B8D6E2', 1.5);
  ctx.strokeStyle = '#B8D6E2'; ctx.lineWidth = 1.2; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.52); ctx.lineTo(x + Math.cos(an) * r * 0.98, y + Math.sin(an) * r * 0.72); ctx.stroke(); } }
function e3Cercarie(ctx, x, y, r = 14, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.65, 0, 0, 6.283); shape(ctx, '#C9B896', '#E2D4B4', 1.5); lijn(ctx, [[-r, 0], [-r * 1.8, r * 0.3], [-r * 2.6, -r * 0.1]], '#C9B896', r * 0.28); ctx.restore(); }
function e3Cyste(ctx, x, y, r = 12) { circ(ctx, x, y, r, '#E2D4B4', '#F2E8D0', 2); circ(ctx, x, y, r * 0.6, '#B8A07A'); }
function e3Grasspriet(ctx, x, y, h) { vul(ctx, [[x - 6, y], [x - 3, y - h * 0.6], [x + 4, y - h], [x + 6, y - h * 0.5], [x + 6, y]], '#5FA86E', '#7FC48F', 1.5); }

// ======================= Micro: darmbacteriën en mycorrhiza =======================
function e3Bacterie(ctx, x, y, l = 46, rot = 0, kl = '#5BA4C9') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -l / 2, -l * 0.2, l, l * 0.4, l * 0.2); shape(ctx, rgba(kl, 0.85), _lt(kl, 0.35), 1.5); ctx.restore(); }
function e3Darm(ctx, cx, cy, R) { // darmslijmvlies met plooien (micro), bacteriën in het lumen
  ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  const P = []; for (let i = 0; i <= 40; i++) { const xx = cx - R + i / 40 * 2 * R; P.push([xx, cy + R * 0.38 + Math.sin(i * 0.95) * R * 0.16]); } P.push([cx + R, cy + R], [cx - R, cy + R]);
  vul(ctx, P, '#B87A6E', '#D89A8E', 2); for (let i = 0; i < 9; i++) circ(ctx, cx - R * 0.85 + i * R * 0.22, cy + R * 0.7, 6, '#8C5A50');
  for (let i = 0; i < 26; i++) { const xx = cx - R * 0.85 + hash(i) * R * 1.7, yy = cy - R * 0.75 + hash(i + 30) * R * 1.0; e3Bacterie(ctx, xx, yy, 30 + 16 * hash(i + 5), hash(i + 7) * 3, i % 3 ? C.teal : '#7FAFC0'); }
  for (let i = 0; i < 6; i++) { const xx = cx - R * 0.6 + i * R * 0.25, yy = cy - R * 0.15 + (i % 2) * 30; lijn(ctx, [[xx - 30, yy], [xx, yy - 8], [xx + 34, yy + 2]], '#8C9A5A', 5); } } // vezelresten (oker-groen)
function e3Mycorrhiza(ctx, cx, cy, R, o = {}) { ctx.fillStyle = '#2E2620'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  for (let i = 0; i < 40; i++) circ(ctx, cx - R + hash(i) * 2 * R, cy - R + hash(i + 50) * 2 * R, 6 + 10 * hash(i + 9), '#4A3C30');
  lijn(ctx, [[cx - R * 0.15, cy - R], [cx - R * 0.05, cy - R * 0.2], [cx + R * 0.1, cy + R * 0.5]], '#C9A880', 34); lijn(ctx, [[cx - R * 0.05, cy - R * 0.2], [cx - R * 0.5, cy + R * 0.3]], '#C9A880', 20);
  for (let i = 0; i < 14; i++) { const sx = cx + (hash(i) - 0.5) * R * 0.3, sy = cy - R * 0.4 + hash(i + 3) * R * 0.9, an = hash(i + 6) * 6.283, L = R * (0.5 + 0.5 * hash(i + 8));
    lijn(ctx, [[sx, sy], [sx + Math.cos(an) * L * 0.5, sy + Math.sin(an) * L * 0.5 + 20], [sx + Math.cos(an) * L, sy + Math.sin(an) * L]], '#E8E2D4', 2.5); }
  if (o.stofjes !== false) for (let i = 0; i < 10; i++) { const u = i / 10, an = hash(i + 20) * 6.283, d = R * (0.35 + 0.4 * u); circ(ctx, cx + Math.cos(an) * d, cy + Math.sin(an) * d, 7, i % 2 ? ECO_N() : C.groen); } }
function ECO_N() { return ECOK.stikstof; } // mineralen blauw (seriekleur stikstof)

// Rups (spanner-/uilrups, ± 2,5 cm): één doorlopende lijfvorm met segmentbanden, 3 paar borstpoten, buikpoten, naschuivers; eenheid 1 = 1 mm.
function e3Rups(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  vul(ctx, [[0, -2], [6, -2.6], [14, -2.8], [22, -2.6], [26, -1.6], [26.5, 0.4], [22, 1.6], [14, 1.8], [6, 1.6], [0, 1.4], [-1, 0]], '#6BA872', '#8EC492', 0.25);
  ctx.strokeStyle = '#4E8A56'; ctx.lineWidth = 0.25; for (let i = 1; i < 11; i++) { const xx = i * 2.3; ctx.beginPath(); ctx.moveTo(xx, -2.6); ctx.lineTo(xx, 1.6); ctx.stroke(); }
  circ(ctx, 25.4, -0.6, 1.6, '#4E7A50'); ctx.fillStyle = '#2E4A30'; for (const px of [20.5, 22, 23.5]) ctx.fillRect(px, 1.6, 0.5, 1.1); for (const px of [9, 11, 13, 15, 0.5]) ctx.fillRect(px, 1.5, 1, 1.0);
  ctx.restore(); }

// boom zonder wortels (in een landschap); s: zoals ecoZomereik (s=1 → jonge eik 1,6 m = 160 px)
function e3Boom(ctx, soort, x, y, s, o = {}) { ctx.save(); ctx.beginPath(); ctx.rect(x - 2000, y - 3000, 4000, 3000 + 2); ctx.clip(); (soort === 'den' ? ecoGroveDen : soort === 'berk' ? ecoBerk : ecoZomereik)(ctx, x, y, s, o); ctx.restore(); }

// Bergeend (Tadorna tadorna), zijaanzicht, lengte ± 60 cm, kop naar rechts; eenheid = cm (s = px/cm), grondpunt onder de poten.
// Kenmerken: donkergroene kop en hals, rode snavel (♀ zonder knobbel), witte romp, brede kastanjebruine borstband, zwarte schouderstreep, roze poten.
function e3Bergeend(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  for (const dx of [-3, 3]) { lijn(ctx, [[dx, -14], [dx + 1, -5], [dx + 1, 0]], '#E89A9A', 1.3); vul(ctx, [[dx - 2, 0], [dx + 5, 0], [dx + 2, -1.5]], '#E89A9A'); }
  vul(ctx, [[-30, -22], [-24, -30], [-6, -34], [10, -33], [18, -28], [19, -20], [12, -14], [-6, -12], [-22, -15]], '#F2F0EA', '#FFFFFF', 0.4); // romp
  vul(ctx, [[-28, -24], [-30, -27], [-33, -26], [-30, -22]], '#2A2A2A'); // staartpunt
  vul(ctx, [[-20, -30], [-4, -33], [8, -31], [2, -27], [-14, -26]], '#2A2A2A'); // zwarte schouderstreep
  vul(ctx, [[8, -32], [16, -30], [19, -22], [14, -17], [10, -21], [9, -27]], '#A0522D'); // kastanjebruine borstband
  vul(ctx, [[11, -31], [13, -40], [14, -46], [19, -50], [24, -48], [24, -44], [19, -41], [17, -33]], '#1F3A30', '#2E5444', 0.4); // hals en kop
  vul(ctx, [[23, -48], [30, -46], [31, -44.5], [24, -44]], '#C8303A'); // snavel
  circ(ctx, 20.5, -47.5, 0.9, '#120E0C'); ctx.restore(); }
// konijnenhol in een duinhelling: donkere ovale opening met wat uitgegraven zand ervoor
function e3Hol(ctx, x, y, s = 1) { ctx.beginPath(); ctx.ellipse(x, y - 18 * s, 34 * s, 26 * s, 0, Math.PI, 0); ctx.lineTo(x + 34 * s, y); ctx.lineTo(x - 34 * s, y); ctx.closePath(); shape(ctx, '#1E1A16', '#4A3E30', 2);
  vul(ctx, [[x - 60 * s, y + 4], [x - 10 * s, y - 6 * s], [x + 50 * s, y + 4]], '#C9A86A'); }
