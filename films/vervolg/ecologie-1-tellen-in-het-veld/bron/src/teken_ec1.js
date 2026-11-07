// Wat word jij? · Ecologie en natuurbeheer · film 1 Tellen in het veld — eigen tekeningen (fase A, 25 okt 2026)
// Reeksobjecten (wolf zoals in Plek genoeg?, heideblauwtje, keutel, wildcamera, DNA-profiel, buisje, grove den, gebiedskaart, Nederland, struikhei)
// staan in /home/claude/hw/ec_reeks.js; hier alleen wat alleen deze film nodig heeft.
// Schaal in de veldscènes: persoon 430 px ≈ 1,70 m → ± 250 px per meter (heideplant 30 cm ≈ 75 px; vlinder ± 3 cm wordt in een zoom getoond).
// Kleuren: groen = heide/plant, oker = bodem, teal = water, koraal = let op, paars ALLEEN DNA, goud = focus.

const FLOOR = 840;                  // voetlijn personen
const VELD = { outfit: 'veld' };
// Daan met nitrilhandschoenen bij het oprapen van de keutel: tijdelijke garderobe-variant van 'veld' (alleen in deze film, niet in lib_cast)
if (typeof CAST !== 'undefined' && CAST.daan && CAST.daan.garderobe && CAST.daan.garderobe.veld && !CAST.daan.garderobe.veldHand)
  CAST.daan.garderobe.veldHand = Object.assign({}, CAST.daan.garderobe.veld, { accessoire: ['bril', 'sproeten', 'handschoenen'] });
function daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.voet || FLOOR, o.h || 430, Object.assign({ t, uit: 'neutraal', kijk: 1 }, VELD, o)); }
function bas(ctx, x, t, o = {}) { return persoon(ctx, 'bas', x, o.voet || FLOOR, o.h || 430, Object.assign({ t, uit: 'neutraal', kijk: -1 }, VELD, o)); }
// de vrijwilliger in H2: figurant zonder naam (castboek: Mevrouw Jansen, garderobe 'buiten')
function vrijwilliger(ctx, x, t, o = {}) { return persoon(ctx, 'buurvrouw', x, o.voet || FLOOR, o.h || 410, Object.assign({ t, uit: 'neutraal', kijk: 1, outfit: 'buiten' }, o)); }

function ec1Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function mono(ctx, s2, x, y, a = 1, col = C.text, px = 64, al = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, `600 ${px}px ${F.meta}`, col, al); ctx.restore(); }

// ---------- landschap (alleen onder scènes die echt in het veld spelen) ----------
// grondstrook met heide; o.zand = kaal zandpad links-rechts; o.bloei
function heideGrond(ctx, o = {}) { const { a = 1, y = FLOOR - 10, bloei = 1, zand = 0, seed = 5, x0 = -40, x1 = W + 40 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2E3A36'; ctx.fillRect(0, y, W, CAPTION_Y - y + 20);
  if (zand > 0.01) { ctx.save(); ctx.globalAlpha *= zand; ctx.fillStyle = KL_ZAND_D; ecPad(ctx, [[x0, y + 10], [W * 0.3, y + 2], [W * 0.7, y + 6], [x1, y + 12], [x1, y + 60], [x0, y + 60]]); ctx.fill(); ctx.restore(); }
  heideRij(ctx, x0, x1, y + 4, 70, { seed, bloei });
  ctx.restore(); }
// rij grove dennen als bosrand op de achtergrond (zacht, 70 %)
function bosrand(ctx, o = {}) { const { a = 1, y = FLOOR - 6, x0 = 0, x1 = W, h = 520, seed = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.7; const R = ecRng(seed); let x = x0 + 40;
  while (x < x1) { groveDen(ctx, x, y, h * (0.8 + R() * 0.35), { seed: Math.floor(R() * 50) }); x += 120 + R() * 140; } ctx.restore(); }
// ven (teal) met oever
function ven(ctx, x, y, rx, ry, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, rx + 18, ry + 8, 0, 0, 6.283); ctx.fillStyle = KL_ZAND_D; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.7), C.teal, 2);
  ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - rx * 0.5 + i * rx * 0.3, y - ry * 0.2 + i * 6); ctx.lineTo(x - rx * 0.3 + i * rx * 0.3, y - ry * 0.2 + i * 6); ctx.stroke(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.ellipse(x, y, rx + 26, ry + 14, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// geel nummerbordje (tentje) bij een gevonden spoor
function ecBordje(ctx, x, y, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y); ctx.lineTo(x - 14, y - 50); ctx.lineTo(x + 14, y - 50); ctx.lineTo(x + 26, y); ctx.closePath(); shape(ctx, '#E6C64A', '#B89A2A', 2);
  text(ctx, String(n), x, y - 14, fTekst(28, 800), '#1A1A1A', 'center'); ctx.restore(); }

// ---------- dingen in de hand (o.hold van persoon: x, y = hand, ang = richting onderarm) ----------
function holdNet(ctx, x, y, ang) { ctx.save(); ctx.lineCap = 'round'; const ex = x + 150, ey = y - 230; ctx.strokeStyle = '#B89A6A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 20, y + 30); ctx.lineTo(ex, ey); ctx.stroke();
  ctx.save(); ctx.translate(ex + 40, ey - 30); ctx.rotate(0.5); ctx.beginPath(); ctx.ellipse(0, 0, 58, 22, 0, 0, 6.283); ctx.strokeStyle = '#C8CCD0'; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-56, 4); ctx.quadraticCurveTo(-10, 110, 10, 120); ctx.quadraticCurveTo(40, 100, 56, 4); ctx.fillStyle = rgba('#E8ECEF', 0.22); ctx.fill(); ctx.strokeStyle = rgba('#E8ECEF', 0.5); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = rgba('#E8ECEF', 0.25); ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 20, 10); ctx.lineTo(i * 6 + 10, 112); ctx.stroke(); } ctx.restore(); ctx.restore(); }
function holdKlembord(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 10, y - 40); ctx.rotate(-0.15); roundRect(ctx, -34, -46, 68, 92, 6); shape(ctx, '#8A6A4A', '#6A4E36', 2); roundRect(ctx, -28, -38, 56, 78, 3); shape(ctx, '#F2EEE4', null);
  ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-20, -24 + i * 14); ctx.lineTo(20, -24 + i * 14); ctx.stroke(); } roundRect(ctx, -14, -52, 28, 12, 3); shape(ctx, '#9AA3B2', null); ctx.restore(); }
function holdFles(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 6, y - 6); roundRect(ctx, -16, -70, 32, 80, 8); shape(ctx, rgba('#DCE5EC', 0.3), '#AFC0D0', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-14, -40, 28, 48); roundRect(ctx, -10, -84, 20, 16, 3); shape(ctx, '#5B8CC9', null); ctx.restore(); }
function holdBuisje(ctx, x, y, ang) { monsterBuisje(ctx, x + 4, y + 10, 0.55, { inhoud: 'keutel' }); }
function holdBoekje(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 4, y - 20); ctx.rotate(-0.2); roundRect(ctx, -36, -26, 72, 52, 4); shape(ctx, '#3E6A8A', '#2E5272', 2); roundRect(ctx, -30, -22, 60, 44, 2); shape(ctx, '#F2EEE4', null); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 1.5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-24, -12 + i * 10); ctx.lineTo(22, -12 + i * 10); ctx.stroke(); } ctx.restore(); }

// ---------- UI-kaartjes ----------
function defKaart(ctx, term, def, x, y, w, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 400); const words = def.split(' '); const L = []; let l = '';
  for (const wd of words) { const tt = l ? l + ' ' + wd : wd; if (ctx.measureText(tt).width > w - 60 && l) { L.push(l); l = wd; } else l = tt; } if (l) L.push(l);
  const h = 96 + L.length * 42; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.85), rgba(col, 0.8), 2); ctx.fillStyle = col; ctx.fillRect(x, y + 16, 6, h - 32);
  text(ctx, term, x + 30, y + 54, fTekst(40, 700), col, 'left'); L.forEach((s2, i) => text(ctx, s2, x + 30, y + 100 + i * 42, fTekst(32, 400), C.text, 'left')); ctx.restore(); return h; }
function kaartjeEc(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = C.goud, hl = 0, px = 32 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.85), hl > 0.01 ? C.goud : rgba(col, 0.7), hl > 0.01 ? 3 : 1.5);
  text(ctx, kop, x + 24, y + (sub ? 46 : h / 2 + px * 0.35), fTekst(px, 700), C.text, 'left'); if (sub) { ctx.save(); ctx.font = fMeta(22); ctx.letterSpacing = '2px'; ctx.fillStyle = C.grain; ctx.textAlign = 'left'; ctx.fillText(sub.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + 24, y + 84); ctx.restore(); } ctx.restore(); }
function verhoudingBalk(ctx, x, y, w, frac, label, rechts, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 46, 10); shape(ctx, '#2A3446', C.line, 1.5);
  if (frac > 0.005) { roundRect(ctx, x, y, Math.max(20, w * frac), 46, 10); shape(ctx, rgba(col, 0.7), col, 2); }
  for (let i = 1; i < 5; i++) { ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + w * i / 5, y + 6); ctx.lineTo(x + w * i / 5, y + 40); ctx.stroke(); }
  if (label) text(ctx, label, x - 20, y + 34, fTekst(32, 700), C.text, 'right'); if (rechts) text(ctx, rechts, x + w + 20, y + 34, fTekst(32, 700), C.text, 'left'); ctx.restore(); }
// raster van n vlindertjes (bovenaanzicht, klein); goud = indices met goud kader (gemerkt), koraal = indices koraal (nieuw, ongemerkt)
function vlinderRaster(ctx, x, y, n, per, gap, o = {}) { const { a = 1, goud = [], koraal = [], t = 0, s = 1.5, dim = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const px = x + (i % per) * gap, py = y + Math.floor(i / per) * gap, fl = 0.35 + 0.25 * Math.sin(t * 6 + i * 1.7);
    ctx.save(); if (dim.includes(i)) ctx.globalAlpha *= 0.35; heideblauwtje(ctx, px, py, s, { flap: fl, hl: goud.includes(i) ? 1 : 0, koraal: koraal.includes(i) ? 1 : 0 }); ctx.restore(); } ctx.restore(); }
function loep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#DCE5EC', 0.12), '#C8CCD0', 5); ctx.strokeStyle = '#8A6A4A'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.5, y + r * 1.5); ctx.stroke(); ctx.restore(); }
// 'dicht': ring om het gebied met een slot (niemand erbij, niemand weg)
function dichtIcoon(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.groen, 0.12), C.groen, 3);
  heideRij(ctx, x - r * 0.7, x + r * 0.7, y + r * 0.35, r * 0.5, { seed: 11 }); for (const d of [-1, 1]) { pijl(ctx, x + d * (r + 90), y, x + d * (r + 14), y, C.koraal, 1, 4, 14); kruis(ctx, x + d * (r + 52), y - 34, 12, 1); } ctx.restore(); }

// ---------- H2: telroute, doos, proefvlak, index ----------
// telroute van bovenaf langs de bosrand, in stukken van 50 m; o.k = 0..1 positie van de teller, o.doos, o.bloemen (alternatieve route), o.nieuw 0..1
function routeKaart(ctx, x, y, w, h, o = {}) { const { a = 1, k = 0, doos = 0, stukken = 1, bloemen = 0, nieuw = 0, hlStuk = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); ctx.fillStyle = '#2E3A36'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  ctx.fillStyle = KL_BOS; ctx.fillRect(x, y, w, h * 0.38); const R = ecRng(21); for (let i = 0; i < 60; i++) circ(ctx, x + R() * w, y + R() * h * 0.36, 14 + R() * 12, i % 3 ? KL_BOS_L : '#356249');
  ctx.fillStyle = KL_HEIDE; ctx.fillRect(x, y + h * 0.5, w, h * 0.5); const R2 = ecRng(5); for (let i = 0; i < 90; i++) circ(ctx, x + R2() * w, y + h * 0.52 + R2() * h * 0.46, 2 + R2() * 2, i % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D);
  if (bloemen > 0.01) { ctx.save(); ctx.globalAlpha *= bloemen; const R3 = ecRng(8); for (let i = 0; i < 26; i++) { const bx = x + w * (0.35 + R3() * 0.3), by = y + h * (0.74 + R3() * 0.2); for (let j = 0; j < 5; j++) circ(ctx, bx + Math.cos(j * 1.26) * 5, by + Math.sin(j * 1.26) * 5, 3.5, '#E8D27A'); circ(ctx, bx, by, 3, '#C8823A'); } ctx.restore(); }
  ctx.restore();
  const ry = y + h * 0.44, x0 = x + 50, x1 = x + w - 50; ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, ry); ctx.lineTo(x1, ry); ctx.stroke();
  if (stukken > 0.01) { ctx.save(); ctx.globalAlpha *= stukken; const n = 10; for (let i = 0; i <= n; i++) { const sx = lerp(x0, x1, i / n); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, ry - 16); ctx.lineTo(sx, ry + 16); ctx.stroke(); }
    if (hlStuk >= 0) { const sx = lerp(x0, x1, hlStuk / n); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(sx, ry); ctx.lineTo(sx + (x1 - x0) / n, ry); ctx.stroke(); } ctx.restore(); }
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(x0, ry); ctx.bezierCurveTo(x + w * 0.3, ry, x + w * 0.35, y + h * 0.84, x + w * 0.5, y + h * 0.84); ctx.bezierCurveTo(x + w * 0.65, y + h * 0.84, x + w * 0.7, ry, x1, ry); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  const px = lerp(x0, x1, k); circ(ctx, px, ry, 12, C.goud, '#121A26', 2.5);
  if (doos > 0.01) { ctx.save(); ctx.globalAlpha *= doos; const d = (x1 - x0) / 10 * 0.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.strokeRect(px, ry - d / 2, d, d); ctx.setLineDash([]); ctx.fillStyle = rgba(C.goud, 0.15); ctx.fillRect(px, ry - d / 2, d, d); ctx.restore(); }
  ctx.restore(); return { ry, x0, x1, px }; }
// denkbeeldige doos in perspectief vóór de teller: voorvlak (x, y onderkant links) w × h, diepte dx, dy
function telDoos(ctx, x, y, w, h, dx, dy, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([12, 8]);
  ctx.fillStyle = rgba(C.goud, 0.07); ctx.beginPath(); ctx.moveTo(x + dx, y - dy); ctx.lineTo(x + w + dx, y - dy); ctx.lineTo(x + w + dx, y - h - dy); ctx.lineTo(x + dx, y - h - dy); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = rgba(C.goud, 0.08); ctx.beginPath(); ctx.rect(x, y - h, w, h); ctx.fill(); ctx.stroke();
  for (const [px, py] of [[x, y], [x + w, y], [x + w, y - h], [x, y - h]]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + dx, py - dy); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// klokjesgentiaan (Gentiana pneumonanthe): rechte stengel 15–40 cm, smalle tegenoverstaande blaadjes, blauwe klokken bovenaan; eitjes van het gentiaanblauwtje als witte stipjes op de knoppen
function klokjesgentiaan(ctx, x, y, h, o = {}) { const { a = 1, eitjes = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(2, h * 0.025); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h * 0.82); ctx.stroke();
  for (let i = 0; i < 5; i++) { const py = y - h * (0.12 + i * 0.13); for (const d of [-1, 1]) { ctx.fillStyle = '#7FA060'; ctx.beginPath(); ctx.ellipse(x + d * h * 0.07, py - h * 0.02, h * 0.075, h * 0.018, d * -0.5, 0, 6.283); ctx.fill(); } }
  [[0, 0.92], [-0.08, 0.8], [0.08, 0.76]].forEach(([dx, dy], i) => { const bx = x + dx * h, by = y - dy * h; ctx.save(); ctx.translate(bx, by); ctx.rotate(dx * 3); ctx.beginPath(); ctx.moveTo(-h * 0.04, h * 0.06); ctx.lineTo(-h * 0.05, -h * 0.05); ctx.lineTo(-h * 0.02, -h * 0.08); ctx.lineTo(0, -h * 0.05); ctx.lineTo(h * 0.02, -h * 0.08); ctx.lineTo(h * 0.05, -h * 0.05); ctx.lineTo(h * 0.04, h * 0.06); ctx.closePath(); shape(ctx, '#4A6AC0', '#6A8AE0', 1.5);
    if (eitjes > 0.01) { ctx.globalAlpha *= eitjes; for (let k = 0; k < 3; k++) circ(ctx, -h * 0.02 + k * h * 0.02, h * (0.0 + (k % 2) * 0.02), Math.max(2, h * 0.012), '#F2F2EE'); } ctx.restore(); });
  ctx.restore(); }
function proefvlak(ctx, x, y, s, o = {}) { const { a = 1, eitjes = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3A36'; ctx.fillRect(x, y, s, s);
  const R = ecRng(13); for (let i = 0; i < 30; i++) circ(ctx, x + 8 + R() * (s - 16), y + 8 + R() * (s - 16), 2 + R() * 2, i % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x, y, s, s); for (const [px, py] of [[x, y], [x + s, y], [x + s, y + s], [x, y + s]]) { roundRect(ctx, px - 5, py - 5, 10, 10, 2); shape(ctx, '#C8A06A', null); }
  [[0.3, 0.75], [0.62, 0.55], [0.78, 0.9]].forEach(([u, v], i) => klokjesgentiaan(ctx, x + u * s, y + v * s, s * 0.42, { eitjes }));
  metaA(ctx, '10 × 10 M', x + s / 2, y + s + 34, 1, C.grain, 'center', 24); ctx.restore(); }
// CBS-vlinderindex dagvlinders (54 soorten), 1992 = 100: waarneming, trend en onzekerheid van de trend. Bron: CBS, 'Steeds minder vlinders …', 23 april 2025 (tabel bij de grafiek).
const VLINDER_JAAR = Array.from({ length: 33 }, (_, i) => 1992 + i);
const VLINDER_WAARN = [105.17, 95.85, 70.94, 97.51, 89.19, 81.7, 83.65, 63.53, 81.83, 58.02, 71, 84.86, 60.52, 66.46, 62.89, 51.94, 49.07, 79.41, 83.45, 75.69, 48.06, 71.41, 78.3, 60.85, 57.26, 72.44, 66.89, 55.87, 52.95, 50.88, 59.71, 46.85, 40.83];
const VLINDER_TREND = [100, 95.05, 90.58, 86.52, 82.89, 79.62, 76.68, 74.08, 71.83, 69.74, 67.77, 66.08, 64.85, 64.26, 64.2, 64.35, 64.39, 64.72, 65.61, 66.5, 66.79, 66.68, 66.55, 66.07, 64.94, 63.24, 61.23, 58.9, 56.28, 53.4, 50.33, 47.13, 43.85];
const VLINDER_LO = [90.17, 87.38, 84.65, 81.85, 79.01, 76.11, 73.35, 70.82, 68.62, 66.67, 64.84, 63.2, 61.95, 61.45, 61.47, 61.57, 61.54, 61.99, 63.05, 63.89, 64.15, 64.13, 64.06, 63.65, 62.62, 61.07, 59.25, 57.11, 54.58, 51.69, 48.46, 44.96, 41.35];
const VLINDER_HI = [110.74, 103.19, 96.94, 91.54, 87.1, 83.44, 80.31, 77.62, 75.31, 73.09, 70.97, 69.18, 67.9, 67.24, 67.05, 67.19, 67.27, 67.49, 68.3, 69.23, 69.59, 69.39, 69.14, 68.56, 67.34, 65.46, 63.25, 60.74, 58.02, 55.16, 52.28, 49.36, 46.48];
// o.punten 0..1 (waarnemingen), o.trend 0..1 (lijn tekent zich), o.band 0..1, o.hl2024, o.klein (mini-versie zonder jaartallen), o.lijnKl
function indexGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, punten = 1, trend = 0, band = 0, hl2024 = 0, klein = false, ymax = 120 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = i => x + (i / 32) * w, Y = v => y + h - (v / ymax) * h;
  ctx.strokeStyle = rgba('#FFFFFF', 0.03); ctx.lineWidth = 1; for (let v = 20; v <= ymax; v += 20) { ctx.beginPath(); ctx.moveTo(x, Y(v)); ctx.lineTo(x + w, Y(v)); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const px = klein ? 22 : 28; [0, 50, 100].forEach(v => { text(ctx, String(v), x - 14, Y(v) + 9, fMeta(px), C.text2, 'right'); });
  if (!klein) [0, 8, 18, 28, 32].forEach(i => text(ctx, String(VLINDER_JAAR[i]), X(i), y + h + 40, fMeta(px), C.text2, 'center'));
  else { text(ctx, '1992', X(0), y + h + 30, fMeta(px), C.text2, 'center'); text(ctx, '2024', X(32), y + h + 30, fMeta(px), C.text2, 'center'); }
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x, Y(100)); ctx.lineTo(x + w, Y(100)); ctx.stroke(); ctx.setLineDash([]);
  if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; ctx.beginPath(); VLINDER_HI.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); for (let i = 32; i >= 0; i--) ctx.lineTo(X(i), Y(VLINDER_LO[i])); ctx.closePath(); ctx.fillStyle = rgba(C.groen, 0.28); ctx.fill(); ctx.restore(); }
  if (punten > 0.01) { const n = Math.round(punten * 33); for (let i = 0; i < n; i++) circ(ctx, X(i), Y(VLINDER_WAARN[i]), klein ? 4 : 6, i === 32 && hl2024 > 0.01 ? C.koraal : rgba(C.text2, 0.9)); }
  if (hl2024 > 0.01) { ctx.save(); ctx.globalAlpha *= hl2024; ctx.beginPath(); ctx.arc(X(32), Y(VLINDER_WAARN[32]), 16, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (trend > 0.01) { const n = trend * 32; ctx.strokeStyle = C.groen; ctx.lineWidth = klein ? 3 : 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= Math.floor(n); i++) i ? ctx.lineTo(X(i), Y(VLINDER_TREND[i])) : ctx.moveTo(X(i), Y(VLINDER_TREND[i]));
    if (n < 32) { const i = Math.floor(n), f = n - i; ctx.lineTo(lerp(X(i), X(i + 1), f), lerp(Y(VLINDER_TREND[i]), Y(VLINDER_TREND[i + 1]), f)); } ctx.stroke(); }
  ctx.restore(); return { X, Y }; }

// ---------- H3: zoom in de keutel ----------
// darmwandcellen (los, rond, met kern) die in een keutel zitten
function darmcellen(ctx, cx, cy, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[-0.35, -0.2, 0.36], [0.32, -0.28, 0.32], [0.05, 0.32, 0.38], [-0.55, 0.42, 0.22], [0.62, 0.36, 0.24]].forEach(([u, v, s], i) => { const x = cx + u * r + Math.sin(t * 0.6 + i) * 3, y = cy + v * r + Math.cos(t * 0.5 + i) * 3, R = s * r;
    ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); shape(ctx, '#3A3530', '#9A8A78', 1.5); for (let k = 0; k < 8; k++) circ(ctx, x + (hash(i * 9 + k) - 0.5) * R * 1.3, y + (hash(i * 7 + k + 3) - 0.5) * R * 1.3, 1.5, rgba(C.grain, 0.15));
    ctx.beginPath(); ctx.arc(x + R * 0.12, y - R * 0.08, R * 0.36, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.2);
    ctx.strokeStyle = rgba(C.kernR, 0.7); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + R * (0.0 + k * 0.08), y - R * 0.2); ctx.quadraticCurveTo(x + R * 0.3, y - R * (0.05 - k * 0.08), x + R * 0.1, y + R * 0.12); ctx.stroke(); } });
  ctx.restore(); }
// stuk DNA (rechtsdraaiende dubbele helix, paars) van x0 naar x1 op hoogte y; o.herh = [[u0,u1],…] stukken met herhalingen (goud gemarkeerd), o.breuk (losse stukjes)
function ecDNA(ctx, x0, x1, y, r, o = {}) { const { a = 1, herh = [], fase = 0, hl = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const pitch = r * 3.4, N = Math.ceil((x1 - x0) / 3), P = (k, i) => { const x = x0 + i * 3, ph = (x - x0) / pitch * 6.283 + fase + (k ? 2.2 : 0); return [x, y + Math.sin(ph) * r, Math.cos(ph)]; };
  herh.forEach(([u0, u1]) => { ctx.fillStyle = rgba(C.goud, 0.18 * hl); ctx.fillRect(lerp(x0, x1, u0), y - r * 1.6, (u1 - u0) * (x1 - x0), r * 3.2); ctx.strokeStyle = rgba(C.goud, 0.8 * hl); ctx.lineWidth = 1.5; ctx.strokeRect(lerp(x0, x1, u0), y - r * 1.6, (u1 - u0) * (x1 - x0), r * 3.2);
    const n = Math.max(2, Math.round((u1 - u0) * 12)); ctx.strokeStyle = rgba(C.goud, 0.6 * hl); for (let k = 1; k < n; k++) { const xx = lerp(lerp(x0, x1, u0), lerp(x0, x1, u1), k / n); ctx.beginPath(); ctx.moveTo(xx, y - r * 1.6); ctx.lineTo(xx, y - r * 1.25); ctx.stroke(); } });
  const streng = (k, voor) => { ctx.strokeStyle = voor ? C.kernR : C.kern; ctx.lineWidth = Math.max(2, r * 0.32); ctx.beginPath(); let on = false; for (let i = 0; i <= N; i++) { const [x, yy, z] = P(k, i); if ((z >= 0) === voor) { on ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); on = true; } else on = false; } ctx.stroke(); };
  streng(0, false); streng(1, false); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = Math.max(1, r * 0.14); for (let x = x0; x <= x1; x += pitch / 5) { const i = Math.round((x - x0) / 3); const A = P(0, i), B = P(1, i); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); }
  streng(0, true); streng(1, true); ctx.restore(); }
// losse stukjes DNA in water (omgevings-DNA)
function dnaStukjes(ctx, cx, cy, rx, ry, n, a = 1, t = 0) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const w = wander(i, t, 10, 0.4), x = cx + (hash(i * 3) - 0.5) * rx * 2 + w.x, y = cy + (hash(i * 5 + 1) - 0.5) * ry * 2 + w.y, L = 80 + hash(i) * 60;
    ecDNA(ctx, x - L / 2, x + L / 2, y, 9, { a, fase: i }); } }

// ---------- H4: keet, laptop, kaartjes ----------
function keet(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324E'; ctx.fillRect(0, 100, W, 600); ctx.fillStyle = '#2C3B57'; ctx.fillRect(0, 700, W, 200);
  ctx.strokeStyle = rgba(C.line, 0.18); ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 130, 100); ctx.lineTo(i * 130, 700); ctx.stroke(); }
  roundRect(ctx, 1560, 190, 260, 200, 8); shape(ctx, '#141E33', rgba(C.line, 0.5), 3); ctx.strokeStyle = rgba(C.line, 0.5); ctx.beginPath(); ctx.moveTo(1690, 190); ctx.lineTo(1690, 390); ctx.moveTo(1560, 290); ctx.lineTo(1820, 290); ctx.stroke(); circ(ctx, 1770, 230, 14, '#E8E2C8');
  ctx.restore(); }
function tafel(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6A5444'; ctx.fillRect(300, 690, 1320, 22); ctx.fillStyle = '#5A4636'; ctx.fillRect(300, 712, 1320, 60); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(340, 772, 18, 70); ctx.fillRect(1560, 772, 18, 70); ctx.restore(); }
function laptop(ctx, x, y, w, a = 1, scherm) { if (a <= 0.01) return; const h = w * 0.62; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h, w, h, 12); shape(ctx, '#3A4458', '#5A6478', 2); roundRect(ctx, x - w / 2 + 16, y - h + 16, w - 32, h - 32, 6); shape(ctx, '#121A26', null);
  ctx.beginPath(); ctx.moveTo(x - w / 2 - 40, y + 26); ctx.lineTo(x + w / 2 + 40, y + 26); ctx.lineTo(x + w / 2, y); ctx.lineTo(x - w / 2, y); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 2);
  if (scherm) { ctx.save(); roundRect(ctx, x - w / 2 + 16, y - h + 16, w - 32, h - 32, 6); ctx.clip(); scherm(x - w / 2 + 16, y - h + 16, w - 32, h - 32); ctx.restore(); } ctx.restore(); }
// staafjes wolven met DNA aangetoond (BIJ12): 2024 101, 2025 131
function wolvenStaven(ctx, x, y, w, h, o = {}) { const { a = 1, a24 = 1, a25 = 1, px = 34 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w * 0.26, sc = h / 150;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  [[0.22, 101, '2024', a24], [0.62, 131, '2025', a25]].forEach(([u, v, j, aa]) => { if (aa <= 0.01) return; ctx.save(); ctx.globalAlpha *= aa; const bx = x + w * u, bh = v * sc * aa; roundRect(ctx, bx, y + h - bh, bw, bh, 6); shape(ctx, rgba(C.paars, 0.55), C.paars, 2);
    text(ctx, String(v), bx + bw / 2, y + h - bh - 14, fTekst(px, 800), C.text, 'center'); text(ctx, j, bx + bw / 2, y + h + px + 6, fMeta(Math.max(22, px * 0.75)), C.text2, 'center'); ctx.restore(); });
  ctx.restore(); }
// 14 roedels in 2025 (ligging schematisch, verdeling volgens NOS 9 apr 2026: 7 Veluwe, 4 Drenthe, 2 Gelderse Vallei, 1 Utrechtse Heuvelrug); de eerste = het roedel van 2019
const EC_ROEDELS = [[5.86, 52.24], [5.98, 52.16], [5.70, 52.17], [5.80, 52.07], [5.66, 52.30], [5.93, 52.30], [5.62, 52.10],
  [6.58, 52.86], [6.33, 52.97], [6.22, 52.86], [6.45, 52.74], [5.53, 52.15], [5.47, 52.03], [5.33, 52.06]];
function bergKaartje(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.85), rgba(C.line, 0.7), 1.5);
  ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); const by = y + 150; [[0.18, 90], [0.42, 120], [0.68, 100], [0.88, 80]].forEach(([u, hh]) => { const bx = x + u * w; ctx.beginPath(); ctx.moveTo(bx - hh, by); ctx.lineTo(bx, by - hh); ctx.lineTo(bx + hh, by); ctx.closePath(); ctx.fillStyle = C.berg; ctx.fill(); ctx.beginPath(); ctx.moveTo(bx - hh * 0.25, by - hh * 0.75); ctx.lineTo(bx, by - hh); ctx.lineTo(bx + hh * 0.25, by - hh * 0.75); ctx.closePath(); ctx.fillStyle = C.bergTop; ctx.fill(); });
  ctx.fillStyle = '#2F4A3A'; ctx.fillRect(x, by, w, 10); ctx.restore();
  metaA(ctx, 'ROEMEENSE KARPATEN', x + 24, y + 196, 1, C.grain, 'left', 22);
  text(ctx, '≈ 70 wolven (49–89)', x + 24, y + 246, fTekst(38, 700), C.text, 'left');
  text(ctx, 'één studiegebied van ± 1400 km²', x + 24, y + 292, fTekst(28, 400), C.text, 'left');
  metaA(ctx, 'IOSIF E.A. 2025', x + 24, y + 336, 1, C.text2, 'left', 22); ctx.restore(); }
// werkplek-icoon (lijnicoon in een afgerond vierkant): 'beheer' (boom), 'provincie' (gebouw), 'instituut' (microscoop)
function werkplekIcoon(ctx, x, y, soort, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 70, 140, 140, 20); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'beheer') { ctx.beginPath(); ctx.moveTo(x, y + 44); ctx.lineTo(x, y + 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 36, y + 10); ctx.lineTo(x, y - 44); ctx.lineTo(x + 36, y + 10); ctx.closePath(); ctx.stroke(); }
  if (soort === 'provincie') { ctx.beginPath(); ctx.moveTo(x - 44, y - 14); ctx.lineTo(x, y - 44); ctx.lineTo(x + 44, y - 14); ctx.closePath(); ctx.stroke(); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x + i * 26, y - 6); ctx.lineTo(x + i * 26, y + 34); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 46, y + 42); ctx.lineTo(x + 46, y + 42); ctx.stroke(); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 30, y + 44); ctx.lineTo(x + 34, y + 44); ctx.moveTo(x - 4, y + 44); ctx.lineTo(x - 4, y + 22); ctx.moveTo(x - 14, y + 22); ctx.quadraticCurveTo(x + 30, y + 14, x + 18, y - 22); ctx.stroke(); ctx.save(); ctx.translate(x - 4, y - 18); ctx.rotate(-0.5); ctx.strokeRect(-9, -30, 18, 46); ctx.restore(); }
  text(ctx, naam, x, y + 112, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
// zonsondergang boven de heide (recap): lage zon en warme lucht in vlakke banden (geen verloop)
function avondHeide(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [['#2A3350', 120], ['#3A3A58', 360], ['#5A4458', 520], ['#7A5250', 640]].forEach(([c, y0]) => { ctx.fillStyle = c; ctx.fillRect(0, y0, W, 760 - y0); });
  ctx.beginPath(); ctx.arc(1540, 700, 70, Math.PI, 0); ctx.fillStyle = '#E8A060'; ctx.fill(); ctx.fillStyle = '#2E3A36'; ctx.fillRect(0, 700, W, 200); heideRij(ctx, -40, W + 40, 706, 70, { seed: 9 }); ctx.restore(); }
// telroutes als stippen in Nederland. (nederland() in ec_reeks.js test punten met isPointInPath zonder rekening te houden met de schaal van het canvas,
// waardoor in de speler maar één stip verschijnt; deze functie rekent de transformatie mee en laat nederland() ongemoeid.)
function nlStippen(ctx, M, n, o = {}) { const { a = 1, kl = C.goud, r = 4.5, seed = 160 } = o; if (a <= 0.01 || n <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  const T = ctx.getTransform(), dev = (x, y) => [T.a * x + T.c * y + T.e, T.b * x + T.d * y + T.f];
  const nl = new Path2D(); NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = M.xy(lo, la); i ? nl.lineTo(px, py) : nl.moveTo(px, py); }); nl.closePath();
  const ij = new Path2D(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = M.xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
  const R = ecRng(seed); let k = 0, tries = 0; while (k < n && tries < 8000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = M.xy(lo, la), [dx, dy] = dev(px, py);
    if (ctx.isPointInPath(nl, dx, dy) && !ctx.isPointInPath(ij, dx, dy)) { circ(ctx, px, py, r, kl); k++; } }
  ctx.restore(); }

// ---------- WOLF uit de goedgekeurde dierenbibliotheek (hoofdsessie 25 okt 2026; vervangt wolfEc in deze film) ----------
// wolfBib(ctx, x, y, sEc, o): zelfde aanroep en maat als wolfEc (sEc = 1: schofthoogte ± 104 px), tekent wolf() uit lib_wolf.js
// (WolfPop, s = px per cm bij 80 cm schofthoogte). o: a, t (s), kijk, loop (0/1: lopen), draf, houding, ir (camerabeeld: grijs + wazig)
function wolfBib(ctx, x, y, sEc = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const houding = o.houding || (o.draf ? 'draven' : o.loop ? 'lopen' : 'staan'), f = houding === 'draven' ? 1.8 : 1.1;
  const fase = ((o.t || 0) * f) % 1;
  ctx.save(); if (o.ir) ctx.filter = 'grayscale(1) brightness(1.15) contrast(0.85) blur(1.1px)';
  wolf(ctx, x, y, sEc * 1.3, { houding, t: fase, kijk: o.kijk || 1, a, kopHoek: o.kopHoek || 0 });
  ctx.restore(); }
// camerabeeld zoals wildcameraBeeld (ec_reeks.js), maar met de bibliotheekwolf
function camBeeldEc1(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, n = 2, welp = 0, regel = '02:14 · IR · CAM 3' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 10, y - 10, w + 20, h + 54, 6); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#3C4440'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#4A524C'; ctx.fillRect(x, y + h * 0.55, w, h * 0.45);
  for (let i = 0; i < 14; i++) { ctx.fillStyle = rgba('#28302C', 0.9); ctx.beginPath(); ctx.ellipse(x + i * w / 13, y + h * 0.48, w * 0.06, h * 0.1 + (i % 3) * h * 0.03, 0, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 30; i++) { ctx.fillStyle = rgba('#7A8274', 0.3); ctx.fillRect(x + hash(i) * w, y + h * 0.6 + hash(i + 40) * h * 0.38, 24 + hash(i + 9) * 30, 2); }
  const s = w / 640;
  // stilstaande houdingen: een lopende wolf op één plek glijdt (C10.3); snuffelen en staan zijn bibliotheekhoudingen
  if (n >= 1) wolfBib(ctx, x + w * 0.34, y + h * 0.9, s * 1.05, { t, houding: 'snuffelen', ir: 1 });
  if (n >= 2) wolfBib(ctx, x + w * 0.74, y + h * 0.86, s * 0.95, { t: t + 0.4, kijk: -1, ir: 1 });
  if (welp > 0.01) wolfBib(ctx, x + w * 0.55, y + h * 0.93, s * 0.5, { t: t + 0.6, a: welp, ir: 1 });
  ctx.fillStyle = 'rgba(30,40,34,0.18)'; ctx.fillRect(x, y, w, h);
  ctx.restore(); text(ctx, regel, x + 12, y + h + 32, fMeta(22), '#C8CCD0', 'left'); ctx.restore(); }
