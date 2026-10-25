// ===== Wat word jij? · Ecologie en natuurbeheer — gedeelde reeksobjecten (aangemaakt 25 okt 2026 door de bouwhelper van film 3) =====
// Plak na lib_bio.js en vóór het eigen teken-bestand. Andere films van de reeks breiden dit bestand uit: bestaande functies niet veranderen.
// Kleuren volgens de reeksbrief: groen = plant, heide, gras, gewas · oker = bodem, mest · teal = water · koraal = let op · paars ALLEEN DNA · goud = focus.
// Heide krijgt daarom geen C.paars maar een gedempte heidetint (KL_HEIDE*), los van de betekeniskleuren.
const KL_HEIDE = '#5E4E62', KL_HEIDE_L = '#7E6A80', KL_HEIDEBLOEM = '#B48AAE', KL_HEIDEBLOEM_D = '#946C90';
const KL_BOS = '#2F5A40', KL_BOS_L = '#3E6E4A', KL_AKKER = '#7A6A40', KL_AKKER_L = '#9A8A56', KL_ZAND = '#D8C49A', KL_ZAND_D = '#BFA878';
const KL_BOUWVOOR = '#3A2E26', KL_BOUWVOOR_L = '#4E3E32', KL_WEG = '#4A5264', KL_LAND = '#26385A';

// vloeiende gesloten (of open) vorm door punten: kwadratische bogen door de middens
function ecPad(ctx, P, dicht = true) { const n = P.length; ctx.beginPath(); if (n < 3) { ctx.moveTo(P[0][0], P[0][1]); if (n > 1) ctx.lineTo(P[1][0], P[1][1]); return; }
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]); for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function ecRng(seed) { let a = (seed * 9301 + 49297) >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }
function ecA(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- STRUIKHEI (Calluna vulgaris) ----------
// Recept: dwergstruik 20–50 cm, sterk vertakt vanaf een houtige voet; stengels bruin, schuin omhoog; blaadjes schubvormig, heel klein, in vier rijen
// (op deze schaal: korte groene streepjes langs de twijgen); bloemen klein, roze-lila, in lange eenzijdige trossen aan het bovenste deel van de twijgen.
// Bekende fouten: een paarse bol zonder takken; bloemen los naast de plant. Bron: Heukels' Flora (beschrijving Calluna), Natura 2000-profiel H4030.
// x, y = voet op de grond; h = hoogte in px; o.bloei 0..1; o.seed variant; o.jong = kleiner, minder vertakt (jonge heide).
function struikhei(ctx, x, y, h, o = {}) { const { a = 1, bloei = 1, seed = 1, jong = 0 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const R = ecRng(seed * 31 + 7), nS = jong ? 3 : 5, tips = [];
  for (let i = 0; i < nS; i++) { const an = -Math.PI / 2 + (i - (nS - 1) / 2) * (0.32 + R() * 0.12), L = h * (0.75 + R() * 0.3);
    const bx = x + (i - (nS - 1) / 2) * h * 0.04, ex = bx + Math.cos(an) * L, ey = y + Math.sin(an) * L, mx = bx + Math.cos(an) * L * 0.45 + (R() - 0.5) * h * 0.08, my = y + Math.sin(an) * L * 0.45;
    ctx.strokeStyle = '#6A4E3C'; ctx.lineWidth = Math.max(1.2, h * 0.035); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    // zijtwijgjes
    for (let k = 0; k < (jong ? 1 : 2); k++) { const u = 0.45 + k * 0.2, px = lerp(bx, ex, u), py = lerp(y, ey, u), sa = an + (k % 2 ? 0.55 : -0.55), sl = L * 0.35;
      const qx = px + Math.cos(sa) * sl, qy = py + Math.sin(sa) * sl; ctx.lineWidth = Math.max(1, h * 0.022); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke(); tips.push([px, py, qx, qy]); }
    tips.push([mx, my, ex, ey]); }
  // blaadjes: korte groene streepjes langs de twijgen
  ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(1, h * 0.02);
  tips.forEach(([x0, y0, x1, y1]) => { for (let k = 1; k < 6; k++) { const u = k / 6, px = lerp(x0, x1, u), py = lerp(y0, y1, u), d = (k % 2 ? 1 : -1) * h * 0.035; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + d, py - h * 0.03); ctx.stroke(); } });
  // bloemtrossen aan het bovenste deel van de twijgen (eenzijdig)
  if (bloei > 0.01) { ctx.globalAlpha *= bloei; tips.forEach(([x0, y0, x1, y1], j) => { for (let k = 0; k < 6; k++) { const u = 0.45 + k * 0.1, px = lerp(x0, x1, u), py = lerp(y0, y1, u);
    circ(ctx, px + h * 0.03, py, Math.max(1.2, h * 0.032), (k + j) % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D); } }); }
  ctx.restore(); }

// ---------- GRASPOL ----------
// Pol van een snel gras (bv. pijpenstrootje, gestreepte witbol): smalle bladeren vanuit één voet, de buitenste buigen over. o.rijk = hoger en voller (rijke grond).
function grasPol(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, kl = '#8FB860', n = 9 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const R = ecRng(seed * 17 + 3);
  for (let i = 0; i < n; i++) { const u = (i / (n - 1)) * 2 - 1, L = h * (0.7 + R() * 0.35), bx = x + u * h * 0.08, ex = x + u * h * (0.55 + R() * 0.2), ey = y - L * (1 - Math.abs(u) * 0.35);
    ctx.strokeStyle = i % 3 ? kl : _ecMix(kl, '#2A3A28', 0.25); ctx.lineWidth = Math.max(1.2, h * 0.035); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(x + u * h * 0.12, y - L * 0.8, ex, ey); ctx.stroke(); }
  ctx.restore(); }
function _ecMix(a, b, k) { const p = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)]; const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); }

// rij heide langs een grondlijn (landschap, Schema-look): struikheiplanten in varianten, geschaald 80–120 %, niet gelijk verdeeld
function heideRij(ctx, x0, x1, y, h, o = {}) { const { a = 1, seed = 3, bloei = 1, jong = 0 } = o; if (a <= 0.01) return; const R = ecRng(seed); let x = x0 + R() * h * 0.4;
  while (x < x1) { struikhei(ctx, x, y, h * (0.8 + R() * 0.4), { a, bloei, seed: Math.floor(R() * 99), jong }); x += h * (0.45 + R() * 0.45); } }

// ---------- TAPUIT (Oenanthe oenanthe), man in broedkleed ----------
// Recept (Natura 2000-profiel A277; Sovon/Vogelbescherming 2014; veldgidsmaten): 14,5–16 cm, slank, rechtop op een paaltje of steen; lange zwarte poten
// (loopbeen ± 27 mm), dunne zwarte snavel ± 13 mm. Kruin en rug blauwgrijs, zwart masker van snavel door het oog, witte wenkbrauwstreep,
// keel en borst warm bleekoranje, buik wit, vleugels zwart; stuit wit; staart wit met een zwarte eindband (omgekeerde T).
// Eenheid 1 = 1 mm; x, y = grondpunt (bovenkant paaltje); s = px per mm. Bekende fouten: korte poten (lijkt op roodborst), dikke vinkensnavel, staart te lang.
function tapuit(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, wip = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const grijs = '#9AA6B4', grijsD = '#7E8A98', zwart = '#202024', zwartL = '#3A3A42', oranje = '#E6C49C', wit = '#F2EFE8', rand = '#5A6270';
  const bob = wip * Math.sin(t * 9) * 3; // staartwippen (typisch gedrag), klein
  // poten: zwart, lang; tenen plat op de grond
  ctx.strokeStyle = zwart; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-4, -44); ctx.lineTo(-7, -2); ctx.moveTo(4, -44); ctx.lineTo(5, -2); ctx.stroke();
  ctx.lineWidth = 1.8; for (const fx of [-7, 5]) { ctx.beginPath(); ctx.moveTo(fx - 7, 0); ctx.lineTo(fx + 9, 0); ctx.moveTo(fx, -1); ctx.lineTo(fx + 7, -1); ctx.stroke(); }
  // staart: korte waaier schuin omlaag, wit met zwarte eindband
  ctx.save(); ctx.translate(-36, -54); ctx.rotate(0.62 + bob * 0.02); ecPad(ctx, [[0, -7], [46, -9], [52, 0], [46, 9], [0, 7]]); ctx.fillStyle = wit; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.fillStyle = zwart; ctx.fillRect(30, -12, 30, 24); ctx.fillRect(10, -2, 40, 4); ctx.restore(); ctx.restore();
  // lijf: rechtop (± 35°), borst vol
  const L = [[30, -78], [32, -62], [24, -48], [8, -40], [-12, -40], [-30, -48], [-40, -60], [-34, -74], [-18, -88], [2, -96], [20, -94]];
  ecPad(ctx, L); ctx.fillStyle = grijs; ctx.fill(); ctx.save(); ctx.clip();
  ctx.fillStyle = wit; ecPad(ctx, [[40, -70], [20, -50], [-10, -36], [-50, -40], [-50, -20], [40, -20]]); ctx.fill(); // buik
  ctx.fillStyle = oranje; ecPad(ctx, [[40, -100], [36, -66], [18, -56], [0, -64], [10, -90]]); ctx.fill(); // borst
  ctx.fillStyle = wit; ctx.beginPath(); ctx.ellipse(-38, -58, 9, 10, 0, 0, 6.283); ctx.fill(); // witte stuit
  ctx.restore(); ecPad(ctx, L); ctx.strokeStyle = rand; ctx.lineWidth = 1.4; ctx.stroke();
  // vleugel: zwart, gevouwen langs de flank, punt tot over de stuit
  const V = [[16, -86], [8, -70], [-10, -58], [-38, -52], [-30, -64], [-12, -78], [4, -88]]; ecPad(ctx, V); ctx.fillStyle = zwart; ctx.fill(); ctx.strokeStyle = zwartL; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.strokeStyle = rgba('#8A8A92', 0.6); ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-4 - i * 7, -70 + i * 3); ctx.lineTo(-20 - i * 6, -58 + i * 1.5); ctx.stroke(); }
  // kop
  ctx.save(); ctx.translate(26, -102);
  const K = [[-14, 8], [-12, -6], [-2, -14], [10, -13], [17, -6], [18, 4], [12, 12], [-2, 14]]; ecPad(ctx, K); ctx.fillStyle = grijs; ctx.fill(); ctx.save(); ctx.clip();
  ctx.fillStyle = oranje; ctx.fillRect(-20, 6, 50, 20); // keel
  ctx.fillStyle = wit; ecPad(ctx, [[-10, -6], [4, -9], [20, -6], [20, -3], [4, -5], [-10, -2]]); ctx.fill(); // wenkbrauwstreep
  ctx.fillStyle = zwart; ecPad(ctx, [[20, -3], [20, 4], [6, 6], [-8, 6], [-10, 0], [2, -3]]); ctx.fill(); // masker
  ctx.restore(); ecPad(ctx, K); ctx.strokeStyle = rand; ctx.lineWidth = 1.3; ctx.stroke();
  // snavel: dun, recht, zwart
  ctx.fillStyle = zwart; ctx.beginPath(); ctx.moveTo(16, -2.5); ctx.lineTo(30, 0.2); ctx.lineTo(16, 2.6); ctx.closePath(); ctx.fill();
  // oog in het masker: donker met een lichte rand
  circ(ctx, 8, 0, 2.6, '#0C0C0E', '#5A5A62', 0.8); circ(ctx, 8.8, -0.8, 0.7, '#C8CCD4');
  ctx.restore();
  ctx.restore(); }
// paaltje met kaal zand en een konijnenhol (leefgebied van de tapuit); x, y = grond; s schaal (1 = paal 90 px)
function tapuitPaal(ctx, x, y, s = 1, o = {}) { const { a = 1, hol = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = KL_ZAND; ecPad(ctx, [[x - 170 * s, y + 4], [x - 120 * s, y - 14 * s], [x + 60 * s, y - 12 * s], [x + 190 * s, y + 4], [x + 120 * s, y + 18 * s], [x - 120 * s, y + 18 * s]]); ctx.fill();
  if (hol > 0.01) { ctx.save(); ctx.globalAlpha *= hol; ctx.fillStyle = '#2A2018'; ctx.beginPath(); ctx.ellipse(x + 110 * s, y - 2 * s, 20 * s, 11 * s, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = KL_ZAND_D; ctx.beginPath(); ctx.ellipse(x + 150 * s, y + 2 * s, 22 * s, 6 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  roundRect(ctx, x - 9 * s, y - 92 * s, 18 * s, 96 * s, 3 * s); shape(ctx, '#7A5E44', '#5A4430', 1.5); ctx.strokeStyle = '#5A4430'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 5 * s, y - 92 * s + i * 22 * s); ctx.lineTo(x + 3 * s, y - 86 * s + i * 22 * s); ctx.stroke(); }
  ctx.restore(); return [x, y - 92 * s]; }

// ---------- LOOPKEVER (Carabidae), bovenaanzicht ----------
// Recept: kop met kaken en draadvormige sprieten (11 leden, hier als dunne lijn met knikjes), halsschild (pronotum), dekschilden met lengtegroeven;
// drie poten per kant, alle zes aan het borststuk (tussen halsschild en dekschilden); lengte 1–3 cm. o.zeldzaam = metaalglans (goudgroen, bv. Carabus nitens).
// x, y = midden; s = px per mm (lengte ± 20 mm); o.rot = richting (0 = naar rechts); o.t voor de stap (poten in driepootgang).
function loopkever(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, t = 0, zeldzaam = false, kl = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  const k = kl || (zeldzaam ? '#5E8A4A' : '#3A3A40'), kL = zeldzaam ? '#C8B04A' : '#6A6A74', poot = zeldzaam ? '#2E3A26' : '#26262A';
  const ph = Math.sin(t * 12); ctx.strokeStyle = poot; ctx.lineWidth = 0.9;
  // poten (driepootgang: L1, R2, L3 tegelijk)
  [[2.5, 1], [0, -1], [-2.5, 1]].forEach(([px, f], i) => { for (const sd of [-1, 1]) { const sw = ph * f * sd * 1.6; ctx.beginPath(); ctx.moveTo(px, sd * 1.6); ctx.lineTo(px + 1.2 + sw * 0.5 - i * 1.4, sd * 4.6); ctx.lineTo(px + 2.4 + sw - i * 3, sd * 7.2); ctx.stroke(); } });
  // sprieten
  ctx.lineWidth = 0.6; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(9, sd * 1.2); ctx.quadraticCurveTo(12, sd * 3.4, 15.5, sd * 5.4); ctx.stroke(); }
  // dekschilden
  ecPad(ctx, [[1, -3.6], [-4, -4.6], [-9, -3.8], [-11.5, 0], [-9, 3.8], [-4, 4.6], [1, 3.6]]); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = kL; ctx.lineWidth = 0.6; ctx.stroke();
  ctx.strokeStyle = rgba('#000000', 0.35); ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(1, 0); ctx.lineTo(-11, 0); for (const v of [-2.4, 2.4]) { ctx.moveTo(0, v * 0.8); ctx.quadraticCurveTo(-5, v * 1.15, -10, v * 0.6); } ctx.stroke();
  // halsschild en kop met kaken
  ecPad(ctx, [[5.4, -2.6], [1.2, -3.2], [0.8, 0], [1.2, 3.2], [5.4, 2.6], [6, 0]]); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = kL; ctx.lineWidth = 0.6; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(7.8, 0, 2.3, 1.9, 0, 0, 6.283); ctx.fillStyle = k; ctx.fill(); ctx.stroke();
  ctx.strokeStyle = poot; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(9.6, -0.8); ctx.quadraticCurveTo(11, -0.6, 11.2, 0.2); ctx.moveTo(9.6, 0.8); ctx.quadraticCurveTo(11, 0.6, 11.2, -0.2); ctx.stroke();
  ctx.restore(); }

// ---------- NEDERLAND (omtrek, schematisch maar herkenbaar) ----------
// Omtrek uit lengte/breedtegraden (± 0,05°), projectie x = (lon − 3,3) · 0,616, y = (53,6 − lat); IJsselmeer en Waddenzee als water.
const NL_LONLAT = [[3.37, 51.37], [3.52, 51.44], [3.44, 51.54], [3.62, 51.62], [3.72, 51.72], [3.86, 51.82], [4.12, 51.98], [4.27, 52.12], [4.43, 52.28], [4.57, 52.46], [4.63, 52.7], [4.71, 52.9], [4.76, 52.96],
  [5.05, 52.93], [5.4, 53.08], [5.42, 53.2], [5.6, 53.32], [5.95, 53.4], [6.25, 53.41], [6.6, 53.44], [6.88, 53.45], [6.95, 53.33], [7.2, 53.24], [7.21, 53.0], [7.07, 52.65], [6.72, 52.62], [6.7, 52.48],
  [7.06, 52.42], [7.0, 52.23], [6.76, 52.1], [6.7, 51.92], [6.4, 51.83], [6.16, 51.88], [5.96, 51.8], [6.1, 51.66], [6.22, 51.5], [6.08, 51.23], [5.88, 51.05], [6.08, 50.84], [5.98, 50.76], [5.7, 50.76],
  [5.65, 50.84], [5.78, 51.08], [5.84, 51.16], [5.56, 51.27], [5.12, 51.43], [4.83, 51.42], [4.67, 51.44], [4.53, 51.48], [4.4, 51.37], [4.24, 51.37], [3.98, 51.22], [3.68, 51.27], [3.37, 51.3]];
const NL_IJSSEL = [[5.08, 52.64], [5.3, 52.6], [5.65, 52.6], [5.85, 52.62], [5.6, 52.82], [5.4, 52.95], [5.28, 53.0], [5.07, 52.92], [5.02, 52.72]];
function nlIn(pts, lo, la) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > la) !== (yj > la) && lo < (xj - xi) * (la - yi) / (yj - yi) + xi) c = !c; } return c; }
nlIn.land = (lo, la) => nlIn(NL_LONLAT, lo, la) && !nlIn(NL_IJSSEL, lo, la); // punt-in-veelhoek in lon/lat: onafhankelijk van de canvasschaal (isPointInPath faalde in de speler)
function nlXY(lon, lat) { return [(lon - 3.3) * 0.616, 53.6 - lat]; }
// x, y = linksboven; s = px per eenheid (1 eenheid ≈ 1 breedtegraad ≈ 111 km). Geeft {pad, xy} terug. o.vul, o.rand, o.stippen (aantal), o.stipA, o.pin [lon,lat], o.pinA
function nederland(ctx, x, y, s, o = {}) { const { a = 1, vul = rgba(C.groen, 0.14), rand = rgba(C.groen, 0.6), stippen = 0, stipA = 1, pin = null, pinA = 1, stipKl = C.goud } = o; const xy = (lon, lat) => { const [u, v] = nlXY(lon, lat); return [x + u * s, y + v * s]; };
  if (a <= 0.01) return { xy }; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); };
  pad(); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  if (stippen > 0 && stipA > 0.01) { const R = ecRng(160); let n = 0, tries = 0; ctx.save(); ctx.globalAlpha *= stipA; pad();
    const ij = new Path2D(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
    while (n < stippen && tries < 6000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = xy(lo, la); if (nlIn.land(lo, la)) { (nederland._p = nederland._p || []).push([px, py]); n++; } } for (const [px, py] of (nederland._p || [])) circ(ctx, px, py, Math.max(2.2, s * 0.022), stipKl); nederland._p = []; // fix 25 okt: eerst alle punten zoeken, dan tekenen (circ begint een nieuw pad)
    ctx.restore(); }
  if (pin && pinA > 0.01) { const [px, py] = xy(pin[0], pin[1]); ctx.save(); ctx.globalAlpha *= pinA; circ(ctx, px, py, 11, C.goud, '#121A26', 2.5); ctx.restore(); }
  ctx.restore(); return { xy }; }

// ---------- KAART VAN HET REEKSGEBIED (fictief, Veluwe-achtig) ----------
// Vaste onderdelen (reeksbrief): heide met een ven in het midden, bos eromheen, snelweg rechts (noord-zuid) met een ecoduct,
// en rechtsonder een landbouwenclave met de maisakker die natuur wordt en een stal. Schema-look, geen echte topografie.
// x, y, w, h = kader. o: a, labels (0..1), natura (gouden rand + label rond de heide), akkerHl (gouden rand akker), akkerHeide (0..1 akker wordt heide),
// randHl (strook van de akker die aan de heide grenst), ecoductHl, venHl, t. Geeft de punten terug (P.heide, P.ven, P.akker, P.stal, P.ecoduct, P.bos, P.weg, P.rand).
function gebiedKaart(ctx, x, y, w, h, o = {}) { const { a = 1, labels = 0, natura = 0, akkerHl = 0, akkerHeide = 0, randHl = 0, ecoductHl = 0, venHl = 0, t = 0 } = o;
  // Schema-stijl (Kamiel 25 okt 2026, keuring film 3: 'kleuren lijken niet op onze stijl'): navy blijft zichtbaar, vlakken als doorschijnende tinten
  // van het C-palet met dunne lichtere randen, structuur met lijnen en stippels (naar waalKaart en nederland()). Groen = heide (fijne stippels) en bos
  // (donkerder tint, kruinen in lijn), teal = ven, oker = akker en stal, grijs = snelweg, groen = ecoduct. Geen paars of mauve.
  const X = u => x + u * w, Y = v => y + v * h, Q = (u, v) => [X(u), Y(v)], k = Math.max(0.6, Math.min(1.4, w / 700)), fN = Math.max(0.12, Math.min(1.6, w * h / (700 * 480)));
  const P = { heide: Q(0.4, 0.46), ven: Q(0.34, 0.4), akker: Q(0.69, 0.78), stal: Q(0.77, 0.9), ecoduct: Q(0.87, 0.36), bos: Q(0.12, 0.14), weg: Q(0.87, 0.75), rand: Q(0.62, 0.72) };
  if (a <= 0.01) return P; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x, y, w, h, 18); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  const vlak = (pts, fill, stroke, lw) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } };
  const HP = [Q(0.12, 0.38), Q(0.2, 0.2), Q(0.42, 0.16), Q(0.62, 0.22), Q(0.72, 0.4), Q(0.64, 0.62), Q(0.46, 0.74), Q(0.26, 0.7), Q(0.12, 0.56)];
  const AK = [Q(0.56, 0.64), Q(0.82, 0.6), Q(0.83, 1.02), Q(0.53, 1.02)];
  const MA = [Q(0.58, 0.67), Q(0.8, 0.65), Q(0.8, 0.86), Q(0.6, 0.88)];
  const wx = X(0.87), ww = w * 0.045;
  // bos: donkerder groene tint over het hele kader, kruinen als lijnrondjes (niet in heide, enclave of weg)
  ctx.fillStyle = rgba('#2F6A46', 0.3); ctx.fillRect(x, y, w, h);
  const inPoly = (pts, px, py) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; } return c; };
  const R = ecRng(41); ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 1.3 * k;
  for (let i = 0, nB = Math.round(150 * Math.sqrt(fN)); i < nB; i++) { const u = R(), v = R(), r = (0.016 + R() * 0.008) * w, px = X(u), py = Y(v); if (inPoly(HP, px, py) || inPoly(AK, px, py) || Math.abs(px - wx) < ww * 0.5 + r) continue;
    ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = rgba('#2F6A46', 0.35); ctx.fill(); ctx.stroke(); if (i % 3 === 0) { ctx.beginPath(); ctx.arc(px - r * 0.25, py - r * 0.2, r * 0.45, 3.4, 5.6); ctx.stroke(); } }
  // heide: lichte groene tint, dunne rand, fijne stippels (dopheide/struikhei als structuur, geen vlakke kleur)
  ecPad(ctx, HP); ctx.fillStyle = C.bgSchema; ctx.fill(); ecPad(ctx, HP); ctx.fillStyle = rgba(C.groen, 0.13); ctx.fill(); ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 1.6 * k; ctx.stroke();
  const stipVeld = (clipFn, u0, u1, v0, v1, n, seed) => { ctx.save(); clipFn(); ctx.clip(); const Rs = ecRng(seed); for (let i = 0; i < n; i++) { const px = X(u0 + Rs() * (u1 - u0)), py = Y(v0 + Rs() * (v1 - v0)); ctx.fillStyle = rgba(C.groen, i % 4 ? 0.6 : 0.95); ctx.beginPath(); ctx.arc(px, py, (1.2 + Rs() * 1.1) * k, 0, 6.283); ctx.fill(); } ctx.restore(); };
  stipVeld(() => ecPad(ctx, HP), 0.1, 0.74, 0.14, 0.76, Math.round(1100 * fN), 7);
  // ven: teal tint met lichtere rand en twee rimpellijnen
  ctx.beginPath(); ctx.ellipse(P.ven[0], P.ven[1], w * 0.07, h * 0.06, -0.3, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(C.teal, 0.24); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 1.6 * k; ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 1.2 * k; for (const d of [-0.2, 0.25]) { ctx.beginPath(); ctx.ellipse(P.ven[0] + d * w * 0.05, P.ven[1] + d * h * 0.06, w * 0.03, h * 0.012, -0.3, 0.3, 2.8); ctx.stroke(); }
  if (venHl > 0.01) ecA(ctx, venHl, () => { ctx.beginPath(); ctx.ellipse(P.ven[0], P.ven[1], w * 0.08, h * 0.072, -0.3, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  // landbouwenclave: zwakke okertint met dunne rand
  vlak(AK, C.bgSchema, null); vlak(AK, rgba(C.oker, 0.06), rgba(C.oker, 0.35), 1.2 * k);
  // de maisakker: okertint met ploegvoren als lijnen
  const maPad = () => { ctx.beginPath(); MA.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); };
  maPad(); ctx.fillStyle = rgba(C.oker, 0.16); ctx.fill(); ctx.save(); maPad(); ctx.clip(); ctx.strokeStyle = rgba(C.oker, 0.55); ctx.lineWidth = 1.3 * k;
  for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(X(0.56 + i * 0.016), Y(0.64)); ctx.lineTo(X(0.58 + i * 0.016), Y(0.9)); ctx.stroke(); }
  if (akkerHeide > 0.01) ecA(ctx, akkerHeide, () => { maPad(); ctx.fillStyle = C.bgSchema; ctx.fill(); maPad(); ctx.fillStyle = rgba(C.groen, 0.13); ctx.fill(); stipVeld(maPad, 0.58, 0.8, 0.65, 0.88, Math.round(280 * fN), 9); });
  if (randHl > 0.01) ecA(ctx, randHl, () => { ctx.fillStyle = rgba(C.goud, 0.3); ctx.beginPath(); ctx.moveTo(...MA[0]); ctx.lineTo(...Q(0.7, 0.66)); ctx.lineTo(...Q(0.66, 0.76)); ctx.lineTo(...Q(0.59, 0.77)); ctx.closePath(); ctx.fill(); });
  ctx.restore();
  maPad(); ctx.strokeStyle = akkerHl > 0.01 ? rgba(C.goud, akkerHl) : rgba(C.oker, 0.75); ctx.lineWidth = akkerHl > 0.01 ? 4 : 1.5 * k; ctx.stroke();
  // stal: lijnicoon in oker
  { const [sx, sy] = P.stal, sw = w * 0.05; ctx.beginPath(); ctx.moveTo(sx - sw, sy + sw * 0.5); ctx.lineTo(sx - sw, sy - sw * 0.2); ctx.lineTo(sx, sy - sw * 0.75); ctx.lineTo(sx + sw, sy - sw * 0.2); ctx.lineTo(sx + sw, sy + sw * 0.5); ctx.closePath();
    ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(C.oker, 0.18); ctx.fill(); ctx.strokeStyle = rgba(C.oker, 0.9); ctx.lineWidth = 1.6 * k; ctx.stroke();
    ctx.strokeRect(sx - sw * 0.25, sy, sw * 0.5, sw * 0.5); ctx.beginPath(); ctx.moveTo(sx - sw, sy - sw * 0.2); ctx.lineTo(sx + sw, sy - sw * 0.2); ctx.stroke(); }
  // snelweg: twee grijze bermlijnen met gestippelde middenstreep (rijdt mee met t)
  ctx.fillStyle = C.bgSchema; ctx.fillRect(wx - ww / 2, y, ww, h); ctx.fillStyle = rgba(C.line, 0.1); ctx.fillRect(wx - ww / 2, y, ww, h);
  ctx.strokeStyle = rgba(C.line, 0.75); ctx.lineWidth = 1.5 * k; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.moveTo(wx + s2 * ww / 2, y); ctx.lineTo(wx + s2 * ww / 2, y + h); ctx.stroke(); }
  ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 1.2 * k; ctx.setLineDash([10 * k, 10 * k]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(wx, y); ctx.lineTo(wx, y + h); ctx.stroke(); ctx.setLineDash([]);
  // ecoduct: groene tint, groene rand, stippels als begroeiing
  { const [ex, ey] = P.ecoduct, eh = h * 0.07, EP = [[ex - ww * 1.5, ey - eh], [ex + ww * 1.5, ey - eh * 1.15], [ex + ww * 1.5, ey + eh * 1.15], [ex - ww * 1.5, ey + eh]];
    vlak(EP, C.bgSchema, null); vlak(EP, rgba(C.groen, 0.22), ecoductHl > 0.01 ? rgba(C.goud, Math.max(0.5, ecoductHl)) : rgba(C.groen, 0.85), ecoductHl > 0.01 ? 4 : 1.6 * k);
    ctx.save(); vlak(EP); ctx.clip(); const Re = ecRng(23); for (let i = 0, nE = Math.round(40 * fN); i < nE; i++) { ctx.fillStyle = rgba(C.groen, 0.7); ctx.beginPath(); ctx.arc(ex + (Re() - 0.5) * ww * 3, ey + (Re() - 0.5) * eh * 2.2, 1.1 * k, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore();
  // Natura 2000: gouden rand om de heide
  if (natura > 0.01) ecA(ctx, natura, () => { ecPad(ctx, HP.map(([px, py]) => [P.heide[0] + (px - P.heide[0]) * 1.07, P.heide[1] + (py - P.heide[1]) * 1.07])); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([16, 10]); ctx.stroke(); ctx.setLineDash([]); });
  roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  if (labels > 0.01) { naamBij(ctx, 'heide', '', X(0.3), Y(0.62), labels, 'center'); naamBij(ctx, 'ven', '', P.ven[0], P.ven[1] + 12, labels, 'center'); naamBij(ctx, 'bos', '', X(0.1), Y(0.9), labels, 'center');
    naamBij(ctx, 'akker', '', P.akker[0], P.akker[1] + 10, labels, 'center'); naamBij(ctx, 'ecoduct', '', P.ecoduct[0] - 40, P.ecoduct[1] - h * 0.11, labels, 'right'); }
  ctx.restore(); return P; }

// ---------- TELFORMULIER (klembord met rijen) ----------
// x, y = linksboven; w breedte; rijen = [[naam, waarde], …]; o.n = hoeveel rijen al ingevuld (mag een breuk zijn: de laatste rij schrijft zich in); o.kop
function telformulier(ctx, x, y, w, rijen, o = {}) { const { a = 1, n = rijen.length, kop = 'TELFORMULIER', px = 30, hl = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rh = px * 1.55, h = 110 + rijen.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#8A6A4A', '#6A4E36', 2); roundRect(ctx, x + 14, y + 26, w - 28, h - 40, 6); shape(ctx, '#F2EEE4', '#C8C0B0', 1.5);
  roundRect(ctx, x + w / 2 - 60, y + 6, 120, 34, 8); shape(ctx, '#9AA3B2', '#6A7282', 1.5);
  metaText(ctx, kop, x + 34, y + 80, '#5A6478', 'left', 22);
  rijen.forEach(([nm, val], i) => { const ry = y + 96 + i * rh; ctx.strokeStyle = '#C8C0B0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 30, ry + rh * 0.55); ctx.lineTo(x + w - 30, ry + rh * 0.55); ctx.stroke();
    const f = clamp(n - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; if (i === hl) { ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(x + 24, ry - rh * 0.35, w - 48, rh * 0.85); }
    text(ctx, nm, x + 36, ry + rh * 0.35, fTekst(px, 600), '#1A2740', 'left'); if (val) text(ctx, val, x + w - 36, ry + rh * 0.35, fTekst(px, 700), '#1A2740', 'right'); ctx.restore(); });
  ctx.restore(); return h; }

// ---------- MAISPLANT (Zea mays), zijaanzicht ----------
// Recept: 2–3 m hoog; één stevige stengel met knopen; 12–18 lange lintvormige bladeren afwisselend links en rechts, die halverwege overbuigen;
// bovenaan de mannelijke pluim (vertakt), halverwege in een bladoksel de kolf met schutbladen en een pluk 'baard' (stijlen). Bron: teelthandleiding mais (WUR/kennisakker), algemene plantenmorfologie.
// x, y = voet; h = hoogte in px; o.kolf (0/1), o.seed, o.t (heel licht wiegen), o.kl (bladkleur). Bekende fout: bladeren als stokjes; kolf los naast de stengel.
function maisPlant(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, t = 0, kolf = 1, kl = '#7FA855' } = o; if (a <= 0.01 || h < 4) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const R = ecRng(seed * 13 + 5), sway = Math.sin(t * 0.9 + seed) * h * 0.008, top = [x + sway * 2, y - h];
  const sx = u => lerp(x, top[0], u * u), sy = u => lerp(y, top[1], u);
  ctx.strokeStyle = '#8AA860'; ctx.lineWidth = Math.max(1.5, h * 0.018); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x, y - h * 0.5, top[0], top[1] + h * 0.06); ctx.stroke();
  const nB = 9; for (let i = 0; i < nB; i++) { const u = 0.12 + i * 0.085, px = sx(u), py = sy(u), d = i % 2 ? 1 : -1, L = h * (0.42 - Math.abs(i - 4) * 0.025) * (0.9 + R() * 0.2);
    const mx = px + d * L * 0.45, my = py - L * 0.38, ex = px + d * L * (0.85 + R() * 0.1), ey = py - L * 0.05 + L * 0.25 * R();
    ctx.fillStyle = i % 3 ? kl : _ecMix(kl, '#2A3A28', 0.2); ctx.beginPath(); ctx.moveTo(px, py + h * 0.006); ctx.quadraticCurveTo(mx, my - h * 0.012, ex, ey); ctx.quadraticCurveTo(mx, my + h * 0.02, px, py + h * 0.02); ctx.closePath(); ctx.fill(); }
  if (kolf) { const u = 0.47, px = sx(u), py = sy(u); ctx.save(); ctx.translate(px + h * 0.012, py); ctx.rotate(0.35); ctx.beginPath(); ctx.ellipse(h * 0.02, -h * 0.05, h * 0.022, h * 0.075, 0, 0, 6.283); ctx.fillStyle = '#9CB86A'; ctx.fill(); ctx.strokeStyle = '#6E8A48'; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = '#B88A5A'; ctx.lineWidth = Math.max(1, h * 0.004); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(h * 0.02, -h * 0.12); ctx.quadraticCurveTo(h * (0.02 + k * 0.01), -h * 0.15, h * (0.02 + k * 0.02), -h * 0.16); ctx.stroke(); } ctx.restore(); }
  // pluim
  ctx.strokeStyle = '#C8B878'; ctx.lineWidth = Math.max(1, h * 0.007); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + (k - 2) * 0.32; ctx.beginPath(); ctx.moveTo(top[0], top[1] + h * 0.05); ctx.quadraticCurveTo(top[0] + Math.cos(an) * h * 0.05, top[1] + Math.sin(an) * h * 0.05, top[0] + Math.cos(an) * h * 0.1, top[1] + Math.sin(an) * h * 0.06 + h * 0.03); ctx.stroke(); }
  ctx.restore(); }

// ===================================================================================================================
// Toegevoegd door de bouwhelper van film 1 (Tellen in het veld, 25 okt 2026). Bestaande functies hierboven niet veranderd.
// ===================================================================================================================

// ---------- WOLF, in de stijl van *Plek genoeg?* (Ecologie 1) ----------
// Overgenomen uit films/ecologie/plek-genoeg/index.html (D.quad met soort 'wolf', drawTail 'brush', drawHead, drawEar 'point', legPath),
// zelfde maten en kleuren (vacht #a7b4c8, donker #6b7891, licht #dfe5ee), zodat de wolf er in deze reeks hetzelfde uitziet.
// x, y = grondpunt onder het midden; s = schaal (s = 1: schofthoogte ± 104 px; naast een persoon van 420 px ≈ 1,70 m is s ≈ 1,9 op ware grootte).
// o: a, t, walk (0..1 benen zwaaien), kijk (±1), headUp (rad), col/dark/light (bv. camerabeeld), blur (px, camerabeeld)
const EC_WOLF = { bl: 118, bh: 46, legH: 58, legW: 12, chest: 1.18, neckL: 30, neckA: 0.62, neckW: 30, headL: 30, headH: 24, snoutL: 24, snoutH: 12, earL: 17, tailL: 62, col: '#a7b4c8', dark: '#6b7891', light: '#dfe5ee', step: 7 };
function _ecSmooth(ctx, pts) { const n = pts.length, m = i => [(pts[i % n][0] + pts[(i + 1) % n][0]) / 2, (pts[i % n][1] + pts[(i + 1) % n][1]) / 2]; ctx.beginPath(); const s0 = m(n - 1); ctx.moveTo(s0[0], s0[1]); for (let i = 0; i < n; i++) { const q = m(i); ctx.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); } ctx.closePath(); }
function _ecLeg(ctx, x0, y0, len, w, ang, bend, color) { const k = [x0 + Math.sin(ang) * len * 0.52, y0 + Math.cos(ang) * len * 0.52], a2 = ang + bend, f = [k[0] + Math.sin(a2) * len * 0.5, k[1] + Math.cos(a2) * len * 0.5];
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(k[0], k[1]); ctx.lineWidth = w; ctx.stroke(); ctx.beginPath(); ctx.moveTo(k[0], k[1]); ctx.lineTo(f[0], f[1]); ctx.lineWidth = w * 0.62; ctx.stroke(); ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; }
function wolfEc(ctx, x, y, s = 1, o = {}) { const sp = EC_WOLF, a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0, walk = o.walk || 0;
  ctx.save(); ctx.globalAlpha *= a; if (o.blur) ctx.filter = `blur(${o.blur}px)`; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
  const col = o.col || sp.col, dark = o.dark || sp.dark, light = o.light || sp.light, L = sp.legH, BL = sp.bl, BH = sp.bh, top = -L - BH, fx = BL * 0.34, hx = -BL * 0.34;
  const ph = t * sp.step, A = 0.38 * clamp(walk * 2, 0, 1), sw = k => walk ? Math.sin(ph + k) * A : 0, bob = walk ? Math.abs(Math.sin(ph)) * 2.2 * clamp(walk * 2, 0, 1) : 0;
  ctx.translate(0, -bob); const legTop = -L - BH * 0.22;
  _ecLeg(ctx, fx - 4, legTop, L + BH * 0.22, sp.legW * 0.92, sw(Math.PI), -sw(Math.PI) * 0.6 - 0.05, dark);
  _ecLeg(ctx, hx - 4, legTop, L + BH * 0.22, sp.legW, sw(0) - 0.08, 0.22 - sw(0) * 0.3, dark);
  // staart: dik en hangend, donkere punt
  { const TL = sp.tailL, wag = Math.sin(t * 3) * 0.06 + (walk ? Math.sin(t * sp.step) * 0.05 : 0); ctx.save(); ctx.translate(hx - BL * 0.16, top + BH * 0.18); ctx.rotate(wag);
    const pts = [[6, -7], [-TL * 0.22, -5], [-TL * 0.42, TL * 0.16], [-TL * 0.56, TL * 0.5], [-TL * 0.56, TL * 0.84], [-TL * 0.44, TL * 0.98], [-TL * 0.32, TL * 0.82], [-TL * 0.26, TL * 0.5], [-TL * 0.12, TL * 0.24], [4, 12]];
    _ecSmooth(ctx, pts); ctx.fillStyle = col; ctx.fill(); ctx.save(); _ecSmooth(ctx, pts); ctx.clip(); ctx.beginPath(); ctx.ellipse(-TL * 0.44, TL * 0.96, TL * 0.2, TL * 0.16, 0.3, 0, 6.283); ctx.fillStyle = dark; ctx.fill(); ctx.restore(); ctx.restore(); }
  // romp met lichtere buik
  const ch = sp.chest, pts = [[-BL * 0.52, top + BH * 0.30], [-BL * 0.42, top + 2], [-BL * 0.1, top + 4], [BL * 0.22, top], [BL * 0.44, top + 2], [BL * 0.56, top + BH * 0.42], [BL * 0.46, top + BH * ch], [BL * 0.18, top + BH * 1.02], [-BL * 0.12, top + BH * 0.92], [-BL * 0.40, top + BH * 0.98], [-BL * 0.54, top + BH * 0.66]];
  _ecSmooth(ctx, pts); ctx.fillStyle = col; ctx.fill(); ctx.save(); _ecSmooth(ctx, pts); ctx.clip(); ctx.fillStyle = rgba(light.length === 7 ? light : '#dfe5ee', 0.32); ctx.beginPath(); ctx.ellipse(BL * 0.05, top + BH * 1.05, BL * 0.42, BH * 0.28, 0, 0, 6.283); ctx.fill(); ctx.restore();
  _ecLeg(ctx, fx + 4, legTop, L + BH * 0.22, sp.legW, sw(0), -sw(0) * 0.6 - 0.05, col);
  _ecLeg(ctx, hx + 4, legTop, L + BH * 0.22, sp.legW * 1.05, sw(Math.PI) - 0.08, 0.22 - sw(Math.PI) * 0.3, col);
  // nek en kop
  const na = sp.neckA + (o.headUp || 0), nx0 = BL * 0.42, ny0 = top + BH * 0.32, hxp = nx0 + Math.cos(na) * sp.neckL, hyp = ny0 - Math.sin(na) * sp.neckL;
  ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = sp.neckW; ctx.beginPath(); ctx.moveTo(nx0 - 4, ny0 + 4); ctx.lineTo(hxp, hyp); ctx.stroke(); ctx.lineCap = 'butt';
  ctx.save(); ctx.translate(hxp, hyp); ctx.rotate(0.32 + (o.headTilt || 0)); const HL = sp.headL, HH = sp.headH, sL = sp.snoutL, sH = sp.snoutH, EL = sp.earL;
  const oor = (ex, ey, kl, back) => { ctx.save(); ctx.translate(ex + (back ? -3 : 0), ey); ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(-EL * 0.42, 4); ctx.lineTo(-EL * 0.1, -EL); ctx.lineTo(EL * 0.38, 3); ctx.fill(); ctx.restore(); };
  oor(-HL * 0.2, -HH * 0.36, dark, true);
  ctx.beginPath(); ctx.ellipse(0, 0, HL * 0.52, HH * 0.5, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.moveTo(HL * 0.25, -HH * 0.36); ctx.quadraticCurveTo(HL * 0.25 + sL * 0.7, -sH * 0.62, HL * 0.25 + sL, -sH * 0.2); ctx.quadraticCurveTo(HL * 0.25 + sL * 1.04, sH * 0.4, HL * 0.25 + sL * 0.82, sH * 0.5); ctx.quadraticCurveTo(HL * 0.4, HH * 0.42, HL * 0.12, HH * 0.4); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.ellipse(HL * 0.25 + sL * 0.98, -sH * 0.12, 3.4, 3, 0, 0, 6.283); ctx.fillStyle = '#1c2230'; ctx.fill();
  const blink = Math.sin(t * 0.9 + 1) > 0.985 ? 0.2 : 1; ctx.beginPath(); ctx.ellipse(HL * 0.12, -HH * 0.12, 3, 3 * blink, 0, 0, 6.283); ctx.fillStyle = '#10131b'; ctx.fill();
  ctx.beginPath(); ctx.arc(HL * 0.12 + 0.9, -HH * 0.12 - 0.9, 0.9, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
  oor(-HL * 0.08, -HH * 0.4, col, false);
  ctx.restore(); ctx.restore(); }
// nachtelijk camerabeeld (infrarood, grijs) zoals in *Plek genoeg?*: kader met datumregel; o.n wolven, o.welp 0..1, o.t
function wildcameraBeeld(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, n = 2, welp = 0, regel = '02:14 · IR · CAM 3' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 10, y - 10, w + 20, h + 54, 6); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#3C4440'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#4A524C'; ctx.fillRect(x, y + h * 0.55, w, h * 0.45);
  for (let i = 0; i < 14; i++) { ctx.fillStyle = rgba('#28302C', 0.9); ctx.beginPath(); ctx.ellipse(x + i * w / 13, y + h * 0.48, w * 0.06, h * 0.1 + (i % 3) * h * 0.03, 0, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 30; i++) { ctx.fillStyle = rgba('#7A8274', 0.3); ctx.fillRect(x + hash(i) * w, y + h * 0.6 + hash(i + 40) * h * 0.38, 24 + hash(i + 9) * 30, 2); }
  const s = w / 640; const G = { col: '#b8bcbc', dark: '#7a7f82', light: '#e2e4e2', blur: 1.2 };
  if (n >= 1) wolfEc(ctx, x + w * 0.36, y + h * 0.9, s * 1.05, Object.assign({ t }, G));
  if (n >= 2) wolfEc(ctx, x + w * 0.72, y + h * 0.86, s * 0.95, Object.assign({ t: t + 1.3, kijk: -1, headUp: -0.15 }, G));
  if (welp > 0.01) wolfEc(ctx, x + w * 0.55, y + h * 0.93, s * 0.48, Object.assign({ t: t * 1.3 + 0.6, a: welp, headUp: 0.1 }, G));
  ctx.restore(); text(ctx, regel, x + 12, y + h + 32, fMeta(22), '#C8CCD0', 'left'); ctx.restore(); }

// ---------- POOTAFDRUK van een wolf ----------
// Recept: ovaal, ± 10–12 cm lang (groter dan bij de meeste honden), vier tenen met nagelafdruk, de twee middelste tenen steken ver naar voren;
// grote driehoekige voetzool. x, y = midden; s = px per cm; rot = looprichting (0 = omhoog). Bron: BIJ12/Wolvenmeldpunt (sporen herkennen).
function pootafdrukWolf(ctx, x, y, s = 3, rot = 0, o = {}) { const { a = 1, kl = '#3A3024', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = kl;
  ctx.beginPath(); ctx.moveTo(0, -0.6); ctx.bezierCurveTo(2.6, -0.4, 3.0, 2.2, 2.0, 3.2); ctx.quadraticCurveTo(0, 4.0, -2.0, 3.2); ctx.bezierCurveTo(-3.0, 2.2, -2.6, -0.4, 0, -0.6); ctx.fill();
  [[-1.0, -3.6, 0.95, 1.35], [1.0, -3.6, 0.95, 1.35], [-2.8, -1.6, 0.85, 1.1], [2.8, -1.6, 0.85, 1.1]].forEach(([tx, ty, rx, ry]) => { ctx.beginPath(); ctx.ellipse(tx, ty, rx, ry, tx * 0.08, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(tx * 1.05, ty - ry - 0.5, 0.25, 0.4, 0, 0, 6.283); ctx.fill(); });
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.ellipse(0, -0.4, 4.8, 6.0, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }

// ---------- HEIDEBLAUWTJE (Plebejus argus) ----------
// Recept (De Vlinderstichting, soortpagina; Bos e.a. *Dagvlinders van Nederland*): klein, spanwijdte 2,6–3,2 cm. Man boven blauw met een brede
// donkere rand en witte franje; onderkant grijsbruin met zwarte, wit omrande stippen en een rij oranje maantjes langs de achterrand, op de achtervleugel
// zwarte randvlekjes met blauwgroen glanzende kern. In rust: vleugels dicht boven het lijf (je ziet de onderkant). Sprieten met zwart-wit geringde schacht en knopje.
// Merken: met een stift een nummer op de onderkant van de achtervleugel (Ehrlich & Davidson 1960).
// x, y = midden van het lijf; s = px per mm. o.zij = zijaanzicht in rust (onderkant), anders bovenaanzicht vliegend; o.flap 0..1 (bovenaanzicht), o.nr (tekst op de vleugel),
// o.hl (gouden rand), o.rot, o.kijk. Bekende fouten: vlinder als twee driehoekjes zonder lijf; sprieten zonder knop; nummer op de bovenkant.
function heideblauwtje(ctx, x, y, s = 3, o = {}) { const { a = 1, zij = false, flap = 0.5, nr = '', hl = 0, rot = 0, kijk = 1, koraal = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const onder = '#B8AFA2', onderD = '#8E857A', blauw = '#6E8FD8', blauwD = '#4A66B0', rand = '#2A2A36', oranje = '#E0A050', franje = '#F2EFE8';
  if (zij) { // vleugels dicht, onderkant zichtbaar, lijf eronder, kop rechts
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.5; [[3, 4], [1, 5], [-1.5, 4.6]].forEach(([px, l]) => { ctx.beginPath(); ctx.moveTo(px, 1.2); ctx.lineTo(px + 0.8, 1.2 + l * 0.6); ctx.lineTo(px + 0.3, 1.2 + l); ctx.stroke(); });
    ctx.beginPath(); ctx.ellipse(0, 0.4, 7.5, 1.3, 0, 0, 6.283); ctx.fillStyle = '#3A3A44'; ctx.fill();
    ctx.beginPath(); ctx.arc(8.2, -0.1, 1.5, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(8.8, -1.2); ctx.quadraticCurveTo(10.5, -6, 11.4, -10); ctx.stroke(); ctx.beginPath(); ctx.ellipse(11.5, -10.4, 0.55, 0.9, 0.3, 0, 6.283); ctx.fillStyle = '#2A2A30'; ctx.fill();
    const VW = [[7, -0.4], [9.5, -9], [6, -14.5], [-2, -14], [-9, -10], [-10.5, -4], [-6.5, -0.6]]; ecPad(ctx, VW); ctx.fillStyle = onder; ctx.fill(); ctx.save(); ecPad(ctx, VW); ctx.clip();
    ctx.fillStyle = onderD; ecPad(ctx, [[8, -2], [9.5, -9], [6, -14.5], [2, -14], [1, -6], [3, -1]]); ctx.fill(); // voorvleugel iets donkerder
    for (let i = 0; i < 6; i++) { const px = -8 + i * 2.6, py = -2.4 - Math.sin(i * 0.5) * 0.6; circ(ctx, px, py, 0.95, oranje); circ(ctx, px, py + 1.4, 0.6, rand); circ(ctx, px, py + 1.4, 0.3, '#5AB8A8'); }
    [[-6, -8.5], [-2.5, -10.5], [1.5, -11.5], [5, -10], [-4, -6], [0.5, -7.5], [4.5, -6]].forEach(([px, py]) => { circ(ctx, px, py, 0.9, franje); circ(ctx, px, py, 0.55, rand); });
    if (koraal > 0.01) { ctx.fillStyle = rgba(C.koraal, 0.35 * koraal); ctx.fillRect(-12, -16, 24, 18); }
    ctx.restore(); ecPad(ctx, VW); ctx.strokeStyle = franje; ctx.lineWidth = 0.7; ctx.stroke();
    if (nr) { ctx.save(); ctx.scale(kijk, 1); ctx.font = `800 ${5.2}px ${F.tekst}`; ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; ctx.fillText(nr, -2.5 * kijk, -4.6); ctx.restore(); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ecPad(ctx, VW.map(([px, py]) => [px * 1.18, (py + 7) * 1.18 - 7])); ctx.strokeStyle = C.goud; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
  } else { // bovenaanzicht, vleugels open (flap 0 = plat, 1 = bijna dicht)
    const k = 1 - 0.75 * flap; ctx.save(); ctx.scale(k, 1);
    for (const d of [-1, 1]) { const VV = [[0.8 * d, -1], [8 * d, -9], [14 * d, -8], [13 * d, -2], [1 * d, 0.5]], AV = [[0.8 * d, 0.5], [11 * d, 1], [11.5 * d, 7], [6 * d, 10], [1 * d, 3.5]];
      for (const V of [AV, VV]) { ecPad(ctx, V); ctx.fillStyle = blauw; ctx.fill(); ctx.save(); ecPad(ctx, V); ctx.clip(); ctx.strokeStyle = rand; ctx.lineWidth = 2.6; ecPad(ctx, V); ctx.stroke(); ctx.strokeStyle = blauwD; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(1 * d, 0); ctx.lineTo(V[2][0] * 0.8, V[2][1] * 0.8); ctx.stroke(); ctx.restore(); ecPad(ctx, V); ctx.strokeStyle = franje; ctx.lineWidth = 0.6; ctx.stroke(); } }
    ctx.restore(); ctx.beginPath(); ctx.ellipse(0, 1.5, 1.1, 6.5, 0, 0, 6.283); ctx.fillStyle = '#2E2E3A'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -5.6, 1.4, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.35; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0.4 * d, -6.6); ctx.quadraticCurveTo(2 * d, -10, 3.4 * d, -12.5); ctx.stroke(); circ(ctx, 3.5 * d, -12.8, 0.6, '#2A2A30'); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
    if (koraal > 0.01) { ctx.save(); ctx.globalAlpha *= koraal; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
  }
  ctx.restore(); }

// ---------- GROVE DEN (Pinus sylvestris) ----------
// Recept: 15–30 m; stam onderaan grijsbruin, bovenin oranjerood; kroon hoog, onregelmatig, in platte groepjes (schermvormig bij oude bomen);
// lange kale stam in het bos. x, y = voet; h = hoogte in px; o.seed. Bekende fout: kerstboomvorm (dat is een spar).
function groveDen(ctx, x, y, h, o = {}) { const { a = 1, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = ecRng(seed * 7 + 2);
  const lean = (R() - 0.5) * h * 0.06, tx = x + lean; ctx.lineCap = 'round';
  ctx.strokeStyle = '#6A5444'; ctx.lineWidth = h * 0.045; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + lean * 0.3, y - h * 0.5, tx, y - h * 0.62); ctx.stroke();
  ctx.strokeStyle = '#B0644A'; ctx.lineWidth = h * 0.032; ctx.beginPath(); ctx.moveTo(x + lean * 0.4, y - h * 0.5); ctx.lineTo(tx, y - h * 0.86); ctx.stroke();
  const groep = [[0, -0.9, 0.2], [-0.16, -0.78, 0.15], [0.17, -0.74, 0.14], [-0.06, -0.66, 0.13], [0.1, -0.97, 0.1]];
  groep.forEach(([gx, gy, gr], i) => { const cx = tx + gx * h, cy = y + gy * h; if (i) { ctx.strokeStyle = '#8A5A44'; ctx.lineWidth = h * 0.012; ctx.beginPath(); ctx.moveTo(tx, cy + gr * h * 0.2); ctx.lineTo(cx, cy); ctx.stroke(); }
    ctx.fillStyle = i % 2 ? '#3E6A4A' : '#35603F'; ctx.beginPath(); ctx.ellipse(cx, cy, gr * h, gr * h * 0.42, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#4A7A55'; ctx.beginPath(); ctx.ellipse(cx - gr * h * 0.2, cy - gr * h * 0.12, gr * h * 0.6, gr * h * 0.2, 0, 0, 6.283); ctx.fill(); });
  ctx.restore(); }

// ---------- WILDCAMERA (cameraval) aan een boom ----------
// Recept: kastje ± 15 × 10 × 7 cm in camouflagekleur, ronde lens in het midden, eronder een veld infraroodleds en de bewegingssensor; met een band om de stam.
// x, y = midden; s = px per cm. o.ir 0..1 = leds gloeien (rood) bij een opname.
function wildcamera(ctx, x, y, s = 2, o = {}) { const { a = 1, ir = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3A3A30'; ctx.fillRect(-12, -1.5, 24, 3); // band
  roundRect(ctx, -5.5, -8, 11, 16, 2); shape(ctx, '#5E6248', '#3E4232', 0.5);
  ctx.fillStyle = '#4A4E38'; [[-3, -5, 2.2], [2.5, 3, 2.6], [-2, 5, 1.8]].forEach(([px, py, r]) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.6, 0.5, 0, 6.283); ctx.fill(); });
  circ(ctx, 0, -3.2, 2.2, '#1A1C22', '#8A8E7A', 0.4); circ(ctx, -0.6, -3.8, 0.5, '#5A6A8A');
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) circ(ctx, -2.4 + j * 1.6, 1.2 + i * 1.3, 0.45, ir > 0.01 ? rgba('#E05040', 0.4 + 0.6 * ir) : '#2A2C30');
  roundRect(ctx, -1.8, 5.4, 3.6, 1.6, 0.6); shape(ctx, '#C8CCD0', null);
  ctx.restore(); }

// ---------- KEUTEL van een wolf (nette tekening) ----------
// Recept: 2–4 cm dik, 15–25 cm lang, in 2–4 stukken met een gedraaid uiteinde; vaak zichtbaar haar en botsplintertjes van prooi; grijsbruin.
// Bron: BIJ12, 'Sporen van de wolf'; Wolven in Nederland (FREE Nature), sporenkaart. x, y = midden op de grond; s = px per cm. Geen bloed, geen prooi.
function wolfKeutel(ctx, x, y, s = 3, o = {}) { const { a = 1, rot = -0.08, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 1.6, 11, 1.2, 0, 0, 6.283); ctx.fill();
  const seg = [[-7.5, 0, 3.4, 1.5], [-2.2, -0.4, 2.9, 1.45], [2.8, 0.2, 2.6, 1.4], [7, -0.2, 2.2, 1.1]];
  seg.forEach(([sx, sy, rx, ry], i) => { ctx.beginPath(); ctx.ellipse(sx, sy, rx, ry, 0.05 * i, 0, 6.283); ctx.fillStyle = i % 2 ? '#6E6052' : '#625446'; ctx.fill(); ctx.strokeStyle = '#4A3E32'; ctx.lineWidth = 0.18; ctx.stroke(); });
  ctx.fillStyle = '#5A4C3E'; ctx.beginPath(); ctx.moveTo(8.8, -0.6); ctx.quadraticCurveTo(11.2, -0.6, 11.6, -1.6); ctx.quadraticCurveTo(10.6, 0.4, 8.8, 0.6); ctx.fill(); // gedraaid puntje
  ctx.strokeStyle = '#B8AC98'; ctx.lineWidth = 0.15; for (let i = 0; i < 14; i++) { const hx = -9 + hash(i * 3) * 17, hy = -1 + hash(i * 5) * 1.6; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 0.8 + hash(i) * 0.6, hy - 0.2); ctx.stroke(); } // haren
  ctx.fillStyle = '#E2DCCD'; [[-6, -0.6], [1.5, 0.4], [5, -0.5]].forEach(([bx, by]) => { ctx.beginPath(); ctx.ellipse(bx, by, 0.35, 0.18, 0.4, 0, 6.283); ctx.fill(); }); // botsplintertjes
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.ellipse(0, 0, 13.5, 3.6, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }

// ---------- DNA-PROFIEL als streepjescode (paars = DNA) ----------
// Zoals in *DNA lezen*: per plek in het DNA een band op een andere hoogte (aantal herhalingen); hier per plek een streepje op een vaste rij.
// EC_PROFIEL[letter] = posities van de banden (0..1) per kolom; kolom = één plek in het DNA. x, y = linksboven; w, h; o.kl (tint van paars), o.leeg (grijs 'geen profiel')
const EC_PROFIEL = { A: [0.2, 0.62, 0.35, 0.8, 0.5, 0.28], B: [0.55, 0.3, 0.7, 0.42, 0.18, 0.66], C: [0.35, 0.78, 0.2, 0.6, 0.72, 0.45], D: [0.7, 0.45, 0.55, 0.22, 0.35, 0.8] };
const EC_PAARS = { A: '#A392D6', B: '#8C7BBF', C: '#6E5A9E', D: '#B9A8E8' };
function dnaProfiel(ctx, x, y, w, h, letter, o = {}) { const { a = 1, kl = EC_PAARS[letter] || C.paars, leeg = false, hl = 0, label = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#121A26', leeg ? '#5A6272' : rgba(kl, 0.9), hl > 0.01 ? 3 : 1.5);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - 5, y - 5, w + 10, h + 10, 11); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  const P = EC_PROFIEL[letter] || EC_PROFIEL.A, n = P.length, cw = (w - 16) / n;
  for (let i = 0; i < n; i++) { const cx = x + 8 + cw * (i + 0.5); ctx.strokeStyle = rgba('#8FA0B5', 0.18); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, y + 8); ctx.lineTo(cx, y + h - 8); ctx.stroke();
    if (!leeg) { const by = y + 10 + P[i] * (h - 20); ctx.fillStyle = kl; ctx.fillRect(cx - cw * 0.34, by - 3, cw * 0.68, 6); const by2 = y + 10 + ((P[i] + 0.37) % 1) * (h - 20); ctx.fillRect(cx - cw * 0.34, by2 - 3, cw * 0.68, 6); } }
  if (leeg) text(ctx, '—', x + w / 2, y + h / 2 + 10, fTekst(30, 700), '#5A6272', 'center');
  if (label && !leeg) text(ctx, letter, x + w / 2, y - 12, fTekst(32, 800), kl, 'center');
  ctx.restore(); }

// ---------- MONSTERBUISJE (keutel of water naar het lab) ----------
// x, y = onderkant midden; s = schaal (1 = 120 px hoog); o.inhoud 'keutel'|'water'|null, o.nr, o.dop (kleur)
function monsterBuisje(ctx, x, y, s = 1, o = {}) { const { a = 1, inhoud = 'keutel', nr = '', dop = '#E0B64A', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, -26, -132, 52, 140, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  roundRect(ctx, -16, -104, 32, 104, 14); shape(ctx, rgba('#DCE5EC', 0.22), '#AFC0D0', 2);
  ctx.save(); roundRect(ctx, -16, -104, 32, 104, 14); ctx.clip();
  if (inhoud === 'keutel') { ctx.fillStyle = '#625446'; ctx.beginPath(); ctx.ellipse(0, -22, 11, 15, 0.2, 0, 6.283); ctx.fill(); ctx.fillStyle = rgba('#DCE5EC', 0.35); ctx.fillRect(-16, -60, 32, 60); }
  if (inhoud === 'water') { ctx.fillStyle = rgba(C.teal, 0.55); ctx.fillRect(-16, -70, 32, 70); }
  ctx.restore(); roundRect(ctx, -19, -122, 38, 20, 5); shape(ctx, dop, null);
  if (nr) { roundRect(ctx, -15, -88, 30, 26, 4); shape(ctx, '#F2EEE4', null); text(ctx, nr, 0, -68, fTekst(20, 800), '#1A2740', 'center'); }
  ctx.restore(); }

// ---------- MEETPLEKKEN OP NEDERLAND (toegevoegd door film 2, 25 okt 2026) ----------
// Stippen binnen de omtrek van nederland() (zelfde x, y, s), buiten het IJsselmeer; niet de echte plekken. n = aantal; o.a, o.kl, o.r, o.seed.
// (Losse functie, want nederland() met o.stippen tekent maar één stip: circ() vervangt het pad vóór isPointInPath.)
function nederlandStippen(ctx, x, y, s, n, o = {}) { const { a = 1, kl = C.goud, r = Math.max(2.2, s * 0.022), seed = 160 } = o; if (a <= 0.01 || n <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  const xy = (lon, lat) => { const [u, v] = nlXY(lon, lat); return [x + u * s, y + v * s]; }; const land = new Path2D(), ij = new Path2D();
  NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? land.lineTo(px, py) : land.moveTo(px, py); }); land.closePath();
  NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
  const R = ecRng(seed); let k = 0, tries = 0; while (k < n && tries < 8000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = xy(lo, la); if (nlIn.land(lo, la)) { circ(ctx, px, py, r, kl); k++; } }
  ctx.restore(); }

// ===== Toegevoegd door film 2 Stikstof (25 okt 2026): gebouwen in zijaanzicht, heideplanten, nestkast, ei, slakkenhuis, zeshoek =====
const KL_SCHETS = '#7E889A';            // grijs gestippeld schetsje (een voorgenomen project, geen keuze)
// ---------- ZESHOEKJES (Aerius rekent per zeshoekje van ± 1 hectare) ----------
function zeshoek(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
// ---------- STAL met silo, zijaanzicht (veehouderij; geen persoon, geen naam) ----------
// x = midden, y = grond, s = schaal (1 = stal ± 340 px breed). o.kelder = mestkelder zichtbaar (doorsnede), o.hl
function stalZij(ctx, x, y, s = 1, o = {}) { const { a = 1, kelder = 0, hl = 0, schets = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const wand = schets ? 'rgba(126,136,154,0.18)' : '#8A5A44', dak = schets ? 'rgba(126,136,154,0.25)' : '#5E4A40', lijn = schets ? KL_SCHETS : '#B88A6A';
  if (schets) ctx.setLineDash([10, 8]);
  // silo
  roundRect(ctx, 110, -300, 64, 300, 10); shape(ctx, schets ? wand : '#9AA3B2', schets ? lijn : '#C9CED6', 2); ctx.beginPath(); ctx.arc(142, -300, 32, Math.PI, 0); shape(ctx, schets ? wand : '#B8C0CA', schets ? lijn : '#C9CED6', 2);
  // stal: lage wanden, groot zadeldak, ventilatie in de nok
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(-170, -110); ctx.lineTo(100, -110); ctx.lineTo(100, 0); ctx.closePath(); shape(ctx, wand, lijn, 2);
  ctx.beginPath(); ctx.moveTo(-190, -104); ctx.lineTo(-35, -200); ctx.lineTo(120, -104); ctx.closePath(); shape(ctx, dak, lijn, 2);
  if (!schets) { ctx.fillStyle = '#3E2E26'; for (let i = 0; i < 5; i++) ctx.fillRect(-150 + i * 50, -86, 30, 26); ctx.fillStyle = '#4A3A30'; ctx.fillRect(-60, -60, 56, 60); }
  if (kelder > 0.01) ecA(ctx, kelder, () => { ctx.setLineDash([]); roundRect(ctx, -170, 4, 270, 46, 6); shape(ctx, '#5A4632', C.oker, 2); ctx.fillStyle = rgba(C.oker, 0.55); ctx.fillRect(-164, 22, 258, 24); });
  if (hl > 0.01) ecA(ctx, hl, () => { ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(-200, 8); ctx.lineTo(-200, -112); ctx.lineTo(-35, -212); ctx.lineTo(190, -112); ctx.lineTo(190, 8); ctx.closePath(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
  ctx.setLineDash([]); ctx.restore(); }
// ---------- FABRIEK met schoorsteen, zijaanzicht (geen naam, geen logo) ----------
function fabriekZij(ctx, x, y, s = 1, o = {}) { const { a = 1, schets = false, t = 0, rook = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const wand = schets ? 'rgba(126,136,154,0.18)' : '#5A6478', lijn = schets ? KL_SCHETS : '#8FA0B5'; if (schets) ctx.setLineDash([10, 8]);
  roundRect(ctx, 60, -330, 40, 330, 4); shape(ctx, wand, lijn, 2);
  ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(-130, -120); for (let i = 0; i < 3; i++) { ctx.lineTo(-130 + i * 60, -170); ctx.lineTo(-70 + i * 60, -120); } ctx.lineTo(130, -120); ctx.lineTo(130, 0); ctx.closePath(); shape(ctx, wand, lijn, 2);
  ctx.setLineDash([]); if (!schets) { ctx.fillStyle = '#3A4458'; for (let i = 0; i < 4; i++) ctx.fillRect(-110 + i * 56, -90, 34, 30); }
  ctx.restore(); }
// ---------- SNELWEG in dwarsdoorsnede met auto's en ecoduct (zijaanzicht) ----------
function snelwegZij(ctx, x0, x1, y, o = {}) { const { a = 1, t = 0, ecoduct = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = KL_WEG; ctx.fillRect(x0, y - 10, x1 - x0, 22); ctx.strokeStyle = rgba('#E8E4DA', 0.7); ctx.lineWidth = 2; ctx.setLineDash([22, 18]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(x0, y + 1); ctx.lineTo(x1, y + 1); ctx.stroke(); ctx.setLineDash([]);
  if (ecoduct > 0.01) ecA(ctx, ecoduct, () => { const mx = (x0 + x1) / 2; ctx.beginPath(); ctx.moveTo(x0 + 10, y - 10); ctx.lineTo(x0 + 10, y - 120); ctx.lineTo(x1 - 10, y - 120); ctx.lineTo(x1 - 10, y - 10); ctx.lineTo(x1 - 40, y - 10); ctx.quadraticCurveTo(mx, y - 130, x0 + 40, y - 10); ctx.closePath(); shape(ctx, '#4E5A54', '#7FA870', 2);
    ctx.fillStyle = '#4E7A4A'; ctx.fillRect(x0 + 6, y - 134, x1 - x0 - 12, 16); for (let i = 0; i < 4; i++) struikhei(ctx, x0 + 30 + i * (x1 - x0 - 60) / 3, y - 132, 40, { seed: 60 + i, bloei: 0.6 }); });
  // auto's (klein, zijaanzicht), rijden langzaam
  const span = x1 - x0; for (let i = 0; i < 3; i++) { const cx = x0 + ((i * 0.37 + t * 0.06) % 1) * span, col = ['#C9CED6', '#7A8BA8', '#5A6478'][i];
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y - 60, span, 70); ctx.clip(); roundRect(ctx, cx - 30, y - 34, 60, 22, 8); shape(ctx, col, null); roundRect(ctx, cx - 16, y - 48, 34, 18, 6); shape(ctx, col, null); circ(ctx, cx - 18, y - 10, 7, '#1A1A1A'); circ(ctx, cx + 18, y - 10, 7, '#1A1A1A'); ctx.restore(); }
  ctx.restore(); }
// ---------- PLANTEN VAN DE HEIDE ----------
// TORMENTIL (Potentilla erecta): laag kruid 10–30 cm, dunne stengels, drietallige blaadjes (lijken vijftallig door steunblaadjes), gele bloempjes met VIER kroonbladen (± 1 cm).
// Bekende fout: vijf kroonbladen (dat is ganzerik). x, y = voet; h = hoogte px.
function tormentil(ctx, x, y, h, o = {}) { const { a = 1, seed = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const R = ecRng(seed * 13 + 5);
  for (let i = 0; i < 4; i++) { const an = -Math.PI / 2 + (i - 1.5) * 0.45 + (R() - 0.5) * 0.2, L = h * (0.7 + R() * 0.35), ex = x + Math.cos(an) * L, ey = y + Math.sin(an) * L;
    ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(1, h * 0.025); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an) * L * 0.5 + (R() - 0.5) * h * 0.2, y + Math.sin(an) * L * 0.5, ex, ey); ctx.stroke();
    const lx = lerp(x, ex, 0.5), ly = lerp(y, ey, 0.5); for (let k = 0; k < 3; k++) { const la = an + (k - 1) * 0.7; ctx.beginPath(); ctx.ellipse(lx + Math.cos(la) * h * 0.07, ly + Math.sin(la) * h * 0.07, h * 0.07, h * 0.03, la, 0, 6.283); ctx.fillStyle = '#7A9A5A'; ctx.fill(); }
    const r = Math.max(2.5, h * 0.06); for (let k = 0; k < 4; k++) { const pa = k * Math.PI / 2 + 0.4; circ(ctx, ex + Math.cos(pa) * r * 0.75, ey + Math.sin(pa) * r * 0.75, r * 0.62, '#E8C840'); } circ(ctx, ex, ey, r * 0.35, '#C99A2A'); }
  ctx.restore(); }
// BRAAM (Rubus): bogen (ranken) van 1–2 m die overbuigen en weer wortelen, bladeren drie- tot vijftallig, getand; witte/roze bloemen, bramen. Hier: dichte struik van bogen.
function braam(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, bes = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const R = ecRng(seed * 7 + 11);
  const bogen = []; for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, L = h * (0.8 + R() * 0.5), top = [x + s * L * (0.25 + R() * 0.2), y - h * (0.75 + R() * 0.3)], end = [x + s * L * (0.7 + R() * 0.3), y - h * 0.05]; bogen.push([top, end]);
    ctx.strokeStyle = '#6A4A4A'; ctx.lineWidth = Math.max(1.5, h * 0.03); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(top[0], top[1] - h * 0.2, end[0], end[1]); ctx.stroke(); }
  bogen.forEach(([top, end], i) => { for (let k = 0; k < 4; k++) { const u = 0.3 + k * 0.18, bx = lerp(x, end[0], u) + (top[0] - x) * Math.sin(u * Math.PI) * 0.4, by = lerp(y, end[1], u) - (y - top[1]) * Math.sin(u * Math.PI) * 1.05;
    for (let l = 0; l < 3; l++) { const la = -Math.PI / 2 + (l - 1) * 0.8 + i; ctx.beginPath(); ctx.ellipse(bx + Math.cos(la) * h * 0.06, by + Math.sin(la) * h * 0.06, h * 0.07, h * 0.04, la, 0, 6.283); ctx.fillStyle = l % 2 ? '#4E7A44' : '#5E8A4E'; ctx.fill(); }
    if (bes > 0.01 && (k + i) % 3 === 0) ecA(ctx, bes, () => { for (let m = 0; m < 4; m++) circ(ctx, bx + (m % 2) * 4 - 2, by + h * 0.08 + Math.floor(m / 2) * 4, Math.max(2, h * 0.018), '#3A2A3E'); }); } });
  ctx.restore(); }
// nestkast (koolmees: invlieggat ± 28 mm); x, y = midden; s (1 = ± 30 cm hoog ≈ 150 px)
function nestkast(ctx, x, y, s = 1, o = {}) { const { a = 1, open = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-52, -55); ctx.lineTo(52, -55); ctx.lineTo(52, 75); ctx.lineTo(-52, 75); ctx.closePath(); shape(ctx, '#9A7A54', '#B8966A', 2);
  ctx.save(); ctx.translate(-62, -60); ctx.rotate(-0.35 * open); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(124, -12); ctx.lineTo(124, 4); ctx.lineTo(0, 16); ctx.closePath(); shape(ctx, '#6A5038', '#8A6A4A', 2); ctx.restore();
  circ(ctx, 0, -10, 15, '#1E1610'); roundRect(ctx, -6, 18, 12, 18, 3); ctx.fillStyle = '#6A5038'; ctx.fill(); ctx.restore(); }
// ei van een koolmees (± 17 × 13 mm, wit met roodbruine spikkels); o.dun = dunne schaal (bleker, doorschijnend, schaal als dunne rand)
function ei(ctx, x, y, h, o = {}) { const { a = 1, dun = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.76;
  const pad = (k) => { ctx.beginPath(); ctx.moveTo(x, y - h / 2 * k); ctx.bezierCurveTo(x + w / 2 * k * 1.1, y - h / 2 * k, x + w / 2 * k, y + h / 2 * k, x, y + h / 2 * k); ctx.bezierCurveTo(x - w / 2 * k, y + h / 2 * k, x - w / 2 * k * 1.1, y - h / 2 * k, x, y - h / 2 * k); ctx.closePath(); };
  pad(1); ctx.fillStyle = dun ? '#E6DCCC' : '#F6F0E6'; ctx.fill(); ctx.strokeStyle = dun ? '#C8B8A0' : '#9A8A70'; ctx.lineWidth = dun ? 1.5 : Math.max(3, h * 0.05); ctx.stroke();
  const R = ecRng(dun ? 3 : 8); for (let i = 0; i < 22; i++) { const u = R() * 6.283, v = Math.sqrt(R()) * 0.42; circ(ctx, x + Math.cos(u) * w * v, y + Math.sin(u) * h * v * 0.95 - h * 0.08, Math.max(1.5, h * 0.025), rgba('#9A4A30', dun ? 0.45 : 0.8)); }
  if (dun) { ctx.save(); pad(1); ctx.clip(); ctx.strokeStyle = rgba('#8A7A6A', 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - w * 0.1, y - h * 0.35); ctx.lineTo(x + w * 0.05, y - h * 0.15); ctx.lineTo(x - w * 0.02, y + h * 0.05); ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) ecA(ctx, hl, () => { pad(1.18); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.restore(); }
// slakkenhuisje (zijaanzicht, spiraal); x, y = midden; r
function slakkenhuis(ctx, x, y, r, o = {}) { const { a = 1, slak = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (slak > 0.01) ecA(ctx, slak, () => { ctx.beginPath(); ctx.moveTo(x - r * 1.6, y + r * 0.95); ctx.quadraticCurveTo(x - r * 2.1, y + r * 0.2, x - r * 1.75, y - r * 0.15); ctx.lineTo(x - r * 1.5, y + r * 0.2); ctx.lineTo(x + r * 1.5, y + r * 0.95); ctx.closePath(); shape(ctx, '#8A7A66', '#A89880', 1.5); ctx.strokeStyle = '#8A7A66'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 1.75, y - r * 0.1); ctx.lineTo(x - r * 1.95, y - r * 0.7); ctx.moveTo(x - r * 1.6, y - r * 0.05); ctx.lineTo(x - r * 1.55, y - r * 0.65); ctx.stroke(); });
  circ(ctx, x, y, r, '#D8C49A', '#A8905A', 2); ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i / 60 * 6.283 * 2.3, rr = r * 0.95 * (1 - i / 66); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.restore(); }
