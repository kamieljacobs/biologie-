// =====================================================================================
// nieuw_erf3.js — nieuwe tekeningen voor Voorbij dominant en recessief (remake fase 1, 28 okt 2026)
// Kandidaten voor bibliotheek/lib_bio.js ná Kamiels keuring. Vereist lib.js (C, rgba, lighten, shape, roundRect,
// text, fTekst, fMeta, metaText, naamBij), lib_bio.js (rodeBloedcel, enzymKluwen, blastocyste) en lib_dieren.js (HondPop, MUIS_DEF).
// =====================================================================================

// ---------- kleuren van deze film (betekenis vast over de reeks) ----------
// bloemkleur = het kenmerk (eigen tinten, geen betekeniskleur); antigeen A groen, B teal (vader/moeder-kleuren staan in deze film
// niet op allelchips, alleen op chromosomen, zoals Chromosomen 2.1); basisketen (H-stof) neutraal grijs.
const E3 = { rood: '#C8414B', roodD: '#9E2F38', roze: '#E79AB0', rozeD: '#C67A92', wit: '#EEEAE0', witD: '#C9C3B4', geel: '#E8C547',
  steel: '#5E8F5A', blad: '#4F7F4E', bladL: '#6E9E66', kelk: '#5E8F5A',
  agA: C.groen, agB: C.teal, keten: '#9AA3B2', kleurstof: '#C8414B',
  muisGeel: { basis: '#D9B356', donker: '#C29A3E', licht: '#F0E2B8', roze: '#E0B0A4', oorbin: '#E4B4A4', staart: '#C8A088', neus: '#C08478', klauw: '#9A7A60' },
  muisGrijs: { basis: '#8A8478', donker: '#6E6A60', licht: '#D8D2C4', roze: '#D8A8A0', oorbin: '#D8A898', staart: '#A89488', neus: '#B57E78', klauw: '#8A6A60' } };

function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
// uit Chromosomen 2.1 (teken_chr1.js), ongewijzigd
function enzym(ctx, x, y, werkt, s = 1, a = 1, an = 0) { if (a <= 0.01) return; if (werkt) enzymKluwen(ctx, x, y, 17 * s, { a, an, seed: 4 });
  else { enzymKluwen(ctx, x, y, 17 * s, { a: a * 0.75, an, seed: 9, col: '#5E6676', sluit: 1 }); kruis(ctx, x, y, 9 * s, a, C.koraal); } }
function allelChip(ctx, s, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { px = 46 } = o; const L = [...s]; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700);
  const w = Math.max(px * 1.9, ctx.measureText(s).width + px * 0.9), h = px * 1.35;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.95), o.rand || C.line, o.rand ? 2.5 : 1.5);
  text(ctx, s, x, y + px * 0.36, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
function termKaart(ctx, term, uitleg, x, y, a = 1, kl = C.goud, w = 0, px = 44) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w1 = ctx.measureText(term).width; ctx.font = fTekst(32, 500); const w2 = uitleg ? ctx.measureText(uitleg).width : 0;
  const bw = w || Math.max(w1, w2) + 64, bh = uitleg ? px + 84 : px + 40; roundRect(ctx, x - bw / 2, y, bw, bh, 14); shape(ctx, rgba(C.bgSchema, 0.95), kl, 2);
  text(ctx, term, x, y + px + 12, fTekst(px, 700), kl, 'center'); if (uitleg) text(ctx, uitleg, x, y + px + 60, fTekst(32, 500), C.text, 'center'); ctx.restore(); }
function misvatting(ctx, fout, goed, x, y, w, a = 1, g = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 150, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5);
  kruis(ctx, x - w / 2 + 50, y + 46, 16, 1, C.koraal); text(ctx, fout, x - w / 2 + 90, y + 58, fTekst(36, 600), C.text2, 'left');
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.font = fTekst(36, 600); const fw = ctx.measureText(fout).width; ctx.beginPath(); ctx.moveTo(x - w / 2 + 88, y + 46); ctx.lineTo(x - w / 2 + 92 + fw, y + 46); ctx.stroke();
  if (g > 0.01) { ctx.globalAlpha *= g; vink_(ctx, x - w / 2 + 50, y + 108, 16, 1, C.groen); text(ctx, goed, x - w / 2 + 90, y + 120, fTekst(36, 600), C.text, 'left'); } ctx.restore(); }

// =====================================================================================
// LEEUWENBEK (Antirrhinum majus) — nieuw object
// Recept (NC State Extension, B-bron; te bevestigen met een referentieplaat): rechtopstaande plant 15–90 cm; bladeren smal lancetvormig,
// 8–15 cm, onderaan tegenoverstaand, hoger verspreid; bloemen in een eindstandige tros (aar), van onder naar boven open, bovenaan knoppen;
// bloem tweelippig, 2,5–7 cm, de onderlip sluit de keel af (de 'bek'), op de onderlip een geel gehemelte; groene kelk.
// Maat: h = hoogte van de plant in px (standaard 60 cm), bloem ± 6 % van h. Bekende fouten: losse rondjes als bloemen; bloemen overal
// even groot; een tros zonder knoppen bovenaan; bladeren rondom de bloemen.
// =====================================================================================
function _lbBloem(ctx, x, y, s, kl, kant = 1, open = 1, a = 1) { // s = bloemhoogte; zijaanzicht, bek naar 'kant'
  if (a <= 0.01) return; const k = E3[kl] || kl, kd = E3[kl + 'D'] || lighten(k, -0.2); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kant * s / 100, s / 100);
  // kelk aan de steel (links), buis naar rechts
  ctx.fillStyle = E3.kelk; ctx.beginPath(); ctx.moveTo(-46, -8); ctx.lineTo(-30, -18); ctx.lineTo(-24, 6); ctx.lineTo(-44, 10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-34, -14); ctx.bezierCurveTo(-10, -30, 20, -34, 30, -26); ctx.lineTo(32, 8); ctx.bezierCurveTo(10, 16, -14, 14, -32, 6); ctx.closePath(); shape(ctx, kd, null); // buis
  if (open < 0.5) { ctx.beginPath(); ctx.ellipse(10, -8, 34, 20, -0.15, 0, 6.283); shape(ctx, k, lighten(k, 0.2), 1); ctx.restore(); return; } // knop
  // bovenlip: twee lobben die omhoog en naar voren buigen
  ctx.beginPath(); ctx.moveTo(18, -24); ctx.bezierCurveTo(30, -58, 58, -62, 66, -40); ctx.bezierCurveTo(72, -26, 60, -10, 44, -8); ctx.bezierCurveTo(36, -12, 26, -16, 18, -24); shape(ctx, k, lighten(k, 0.18), 1);
  ctx.strokeStyle = rgba(kd, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(30, -30); ctx.quadraticCurveTo(46, -42, 58, -38); ctx.stroke();
  // onderlip: drie lobben, bolt op (gehemelte) en sluit de keel
  ctx.beginPath(); ctx.moveTo(20, 6); ctx.bezierCurveTo(30, 30, 58, 40, 80, 30); ctx.bezierCurveTo(96, 22, 92, 4, 76, -2); ctx.bezierCurveTo(62, -8, 48, -6, 40, -4); ctx.bezierCurveTo(30, -2, 24, 2, 20, 6); shape(ctx, k, lighten(k, 0.18), 1);
  ctx.beginPath(); ctx.ellipse(52, 0, 16, 8, -0.2, 0, 6.283); ctx.fillStyle = E3.geel; ctx.fill(); // geel gehemelte
  ctx.strokeStyle = rgba(kd, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(44, -6); ctx.quadraticCurveTo(58, -10, 70, -4); ctx.stroke(); // bek-lijn
  ctx.restore(); }
function leeuwenbek(ctx, x, y, h, kl = 'rood', o = {}) {
  const { a = 1, seed = 1, n = 13, zwaai = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const top = y - h, rnd = (i) => hash(seed * 31 + i), sw = (f) => Math.sin(zwaai + f * 1.3) * h * 0.012 * f;
  const P = (f) => [x + sw(f) + Math.sin(f * 2.2 + seed) * h * 0.012, y - h * f];
  // steel
  ctx.strokeStyle = E3.steel; ctx.lineWidth = Math.max(3, h * 0.014); ctx.beginPath(); for (let i = 0; i <= 20; i++) { const p = P(i / 20 * 0.97); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  // bladeren (onderste 55 %): smal lancetvormig, 12–20 % van h
  for (let i = 0; i < 9; i++) { const f = 0.04 + i * 0.058, p = P(f), kant = i % 2 ? 1 : -1, L = h * (0.22 - i * 0.013) * (0.85 + rnd(i) * 0.3), an = kant * (0.55 + rnd(i + 9) * 0.35) - Math.PI / 2;
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(kant * L * 0.2, -L * 0.45, 0, -L); ctx.quadraticCurveTo(-kant * L * 0.16, -L * 0.45, 0, 0);
    shape(ctx, i % 3 ? E3.blad : E3.bladL, null); ctx.strokeStyle = rgba('#2E4A2E', 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -L * 0.92); ctx.stroke(); ctx.restore(); }
  // tros: bloemen in een spiraal van onder (open, groot) naar boven (knoppen, klein)
  const fb = 0.52, s0 = h * 0.11;
  const lijst = []; for (let i = 0; i < n; i++) { const u = i / (n - 1), f = fb + u * 0.47, p = P(f), kant = (i % 2 ? 1 : -1), z = Math.cos(i * 2.4 + seed);
    lijst.push({ i, u, p, kant, z, s: s0 * (1 - u * 0.55), open: u < 0.72 ? 1 : 0 }); }
  lijst.sort((A, B) => A.z - B.z).forEach(b => { const off = b.kant * h * 0.03; ctx.save(); ctx.globalAlpha *= b.z < 0 ? 0.85 : 1; _lbBloem(ctx, b.p[0] + off, b.p[1], b.s, kl, b.kant, b.open, 1); ctx.restore(); });
  ctx.restore(); }

// =====================================================================================
// RODE BLOEDCEL MET ANTIGENEN — uitbreiding op rodeBloedcel (lib_bio.js)
// Recept (B5 Dean 2015, B6 Reactome): op de rode bloedcel zitten korte suikerketens (de H-stof). Het Iᴬ-enzym zet er één extra suiker aan
// (N-acetylgalactosamine) = antigeen A; het Iᴮ-enzym een andere (galactose) = antigeen B. Bloedgroep O: de keten blijft kaal.
// Tekening: keten = 2 kleine zeshoekjes (suikerringen, BEELDAFSPRAKEN 'kleine moleculen herkenbaar') in neutraal grijs, loodrecht op het
// membraan (BEELDAFSPRAKEN antigenen); eindsuiker A = groen zeshoekje, B = teal vijfhoekje (ook zonder kleur te onderscheiden).
// soort: 'A', 'B', 'AB' (afwisselend), 'O' (kale keten) of 'glad' (alternatief T1: helemaal niets). Bekende fout (oude film): bij O een
// gekleurd bolletje op de keten, dat als een derde antigeen leest (k8).
// =====================================================================================
function _zeshoek(ctx, x, y, r, an, fill, stroke, n = 6) { ctx.beginPath(); for (let i = 0; i < n; i++) { const a = an + i * 6.283 / n; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, fill, stroke, 1.2); }
function suikerKeten(ctx, x, y, nx, ny, r, eind = null, a = 1, o = {}) { // x,y op het membraan, (nx,ny) naar buiten
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = r * 1.75, an = Math.atan2(ny, nx);
  const ka = o.ketenA ?? 1; ctx.strokeStyle = rgba(E3.keten, 0.8 * ka); ctx.lineWidth = Math.max(1, r * 0.25);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + nx * st * (eind ? 2.6 : 1.6), y + ny * st * (eind ? 2.6 : 1.6)); ctx.stroke();
  for (let k = 0; k < 2; k++) { const px = x + nx * st * (k + 0.55), py = y + ny * st * (k + 0.55); ctx.save(); ctx.globalAlpha *= ka; _zeshoek(ctx, px, py, r, an + k * 0.3, '#5E6878', '#9AA3B2'); ctx.restore(); }
  if (eind) { const px = x + nx * st * 2.65, py = y + ny * st * 2.65, ins = (o.eindIn ?? 1); if (ins > 0.01) { ctx.save(); ctx.globalAlpha *= ins;
    if (eind === 'A') _zeshoek(ctx, px, py, r * 1.12, an, E3.agA, lighten(E3.agA, 0.3)); else _zeshoek(ctx, px, py, r * 1.15, an + 0.3, E3.agB, lighten(E3.agB, 0.3), 5); ctx.restore(); } }
  ctx.restore(); }
function bloedcelAntigeen(ctx, x, y, r, soort = 'A', o = {}) { // van boven: schijf met deuk, ketens rondom loodrecht op de rand
  const { a = 1, n = 14, rk = r * 0.06, eindIn = 1, ketenA = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (soort !== 'glad') for (let k = 0; k < n; k++) { const an = rot + k / n * 6.283 + (hash(k + r) - 0.5) * 0.12, nx = Math.cos(an), ny = Math.sin(an);
    const e = soort === 'O' ? null : soort === 'AB' ? (k % 2 ? 'B' : 'A') : soort; suikerKeten(ctx, x + nx * r * 0.99, y + ny * r * 0.99, nx, ny, rk, e, 1, { eindIn, ketenA }); }
  rodeBloedcel(ctx, x, y, r, 0, 0, 1);
  ctx.restore(); }

// =====================================================================================
// MUIS IN EEN EIGEN VACHTKLEUR — variant op de goedgekeurde muizenpop (lib_dieren.js, MUIS_DEF), alleen het palet anders
// geel = 'lethal yellow' (Aʸ), grijs = wildkleur (agouti). Zelfde rig, houdingen en schaal (s = px per cm, kop-romp ± 10 cm).
// =====================================================================================
const _MUISPOP = {};
function muisKleur(ctx, x, y, s, kleur = 'geel', o = {}) { if ((o.a ?? 1) <= 0.01) return;
  if (!_MUISPOP[kleur]) _MUISPOP[kleur] = HondPop.maak(Object.assign({}, MUIS_DEF, { PAL: kleur === 'geel' ? E3.muisGeel : E3.muisGrijs }));
  const P = _MUISPOP[kleur], oo = Object.assign({ houding: 'staan' }, o); if (!P.GANGEN?.[oo.houding] && !P.D?.HOUDING?.[oo.houding]) oo.houding = 'staan'; return P.teken(ctx, x, y, s, oo); }

// =====================================================================================
// KRUISINGSSCHEMA 2×2 (zelfde opbouw als film 2: gameten van de ene ouder links, van de andere boven; elk vakje = één bevruchting)
// cel(i, j, cx, cy, cs) tekent de inhoud; o.uit[k] = vakje k (0..3) weg (letaal: gedimd + kruis); o.hl[k] = goud kader
// =====================================================================================
function kruisSchema(ctx, x, y, cs, links, boven, cel, o = {}) {
  const { a = 1, uit = [], hl = [], kopL = null, kopB = null, gA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  boven.forEach((g, j) => allelChip(ctx, g, x + cs * (j + 0.5), y - 62, gA, { px: 40 }));
  links.forEach((g, i) => allelChip(ctx, g, x - 78, y + cs * (i + 0.5), gA, { px: 40 }));
  if (kopB) metaText(ctx, kopB, x + cs, y - 128, C.text2, 'center', 26); if (kopL) { ctx.save(); ctx.translate(x - 150, y + cs); ctx.rotate(-Math.PI / 2); metaText(ctx, kopL, 0, 0, C.text2, 'center', 26); ctx.restore(); }
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const k = i * 2 + j, cx = x + cs * (j + 0.5), cy = y + cs * (i + 0.5);
    roundRect(ctx, x + j * cs + 4, y + i * cs + 4, cs - 8, cs - 8, 10); shape(ctx, rgba(C.fill, 0.55), C.line, 1);
    ctx.save(); if (uit[k]) ctx.globalAlpha *= 1 - 0.7 * uit[k]; cel(i, j, cx, cy, cs); ctx.restore();
    if (uit[k] > 0.01) kruis(ctx, cx, cy, cs * 0.3, uit[k], C.koraal);
    if (hl[k] > 0.01) { ctx.save(); ctx.globalAlpha *= hl[k]; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, x + j * cs + 8, y + i * cs + 8, cs - 16, cs - 16, 8); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }

// =====================================================================================
// KLEURSTOFMETER (zelfde vorm als melMeter in Chromosomen 2.1, nu met eigen kleur en een MODEL-label)
// =====================================================================================
function kleurstofMeter(ctx, x, y, w, v, kl = E3.kleurstof, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 28, 14); shape(ctx, '#202B3E', C.line, 1);
  if (v > 0.01) { roundRect(ctx, x, y, Math.max(28, w * clamp(v, 0, 1)), 28, 14); shape(ctx, kl, null); } ctx.restore(); }

// =====================================================================================
// HISTOGRAM (model: n genen, elk allel voor lang telt één stapje) — binomiaal 2n+1 klassen
// =====================================================================================
function _binom(n) { const r = [1]; for (let k = 1; k <= n; k++) r.push(r[k - 1] * (n - k + 1) / k); return r; }
function histModel(ctx, x, y, w, h, nGen, o = {}) { const { a = 1, kl = C.teal, titel = null, klok = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const v = _binom(2 * nGen), m = Math.max(...v), bw = w / v.length;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  v.forEach((c, i) => { const bh = c / m * h; roundRect(ctx, x + i * bw + 3, y - bh, bw - 6, bh, 4); shape(ctx, rgba(kl, 0.7), kl, 1); });
  if (klok > 0.01) { ctx.save(); ctx.globalAlpha *= klok; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, z = (u - 0.5) * 6; const px = x + u * w, py = y - Math.exp(-z * z / 2) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  if (titel) metaText(ctx, titel, x + w / 2, y + 44, C.text2, 'center', 26);
  ctx.restore(); }

// =====================================================================================
// Decor en kleine hulpen voor de scènes (alleen deze film)
// =====================================================================================
function chMicro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // Micro zonder korrel (BEELDAFSPRAKEN)
function chSchema(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function chMeta(ctx, s, a = 1, x = 70, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, 851, C.text2, al, 28); ctx.restore(); }
const VLOER = 846;
function kamer(ctx) { ctx.fillStyle = '#20304C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#2F4268'; ctx.fillRect(0, VLOER - 10, W, 10); ctx.fillStyle = '#34405A'; ctx.fillRect(0, VLOER, W, H - VLOER);
  roundRect(ctx, 120, 170, 260, 330, 8); shape(ctx, '#2C4A6E', '#3E5E86', 3); ctx.fillStyle = '#3E5E86'; ctx.fillRect(247, 170, 6, 330); ctx.fillRect(120, 330, 260, 6);
  roundRect(ctx, 1560, 610, 260, 226, 8); shape(ctx, '#3A3248', '#4A4058', 2); ctx.fillStyle = '#4A4058'; ctx.fillRect(1560, 720, 260, 4);
  ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.ellipse(1660, 580, 40, 36, 0, 0, 6.283); ctx.fill(); roundRect(ctx, 1640, 590, 40, 22, 4); shape(ctx, '#B08A5C', null); }
function bloembed(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#26385A'; ctx.fillRect(0, 520, W, 160);
  ctx.fillStyle = C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0, 640); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 610 + Math.sin(x / 260) * 26); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 760, W, H - 760); ctx.fillStyle = '#4A3A2C'; roundRect(ctx, 120, 800, 1680, 60, 20); ctx.fill(); }
// plant die opgroeit: g 0..1 (schaal vanaf de grond)
function groeiPlant(ctx, x, y, h, kl, g, o = {}) { if (g <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(1, ease(clamp(g, 0, 1))); ctx.translate(-x, -y); leeuwenbek(ctx, x, y, h, kl, o); ctx.restore(); }
function tagKaart(ctx, s, x, y, a = 1, kl = C.line, px = 36) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + 44; roundRect(ctx, x - w / 2, y - px - 8, w, px + 26, (px + 26) / 2); shape(ctx, rgba(C.bgSchema, 0.92), kl, 2); text(ctx, s, x, y + 2, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
function verfKlodder(ctx, x, y, r, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.85, 0.12, x % 7); shape(ctx, kl, lighten(kl, 0.2), 1.5); ctx.restore(); }
// histogram met n smalle staven (heel veel genen): binomiaal benaderd, plus klok
function histVeel(ctx, x, y, w, h, a = 1, kl = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 25; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < n; i++) { const z = (i - (n - 1) / 2) / ((n - 1) / 6), bh = Math.exp(-z * z / 2) * h; roundRect(ctx, x + i * w / n + 1, y - bh, w / n - 2, bh, 2); shape(ctx, rgba(kl, 0.7), kl, 1); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, z = (u - 0.5) * 6; const px = x + u * w, py = y - Math.exp(-z * z / 2) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// stuk chromosoom met kleurgen (geel) en buurgen (groen); weg 0..1 = het stuk dat ontbreekt (rond de grens van beide) verdwijnt
function deletie(ctx, x, y, w, weg = 0, toon = 1, buurLab = 1) { const h = 56, k0 = x + w * 0.36, k1 = x + w * 0.46, b0 = x + w * 0.50, b1 = x + w * 0.62, d0 = x + w * 0.42, d1 = x + w * 0.66;
  const e = ease(clamp(weg, 0, 1)), dicht = (d1 - d0) * e; // rechterdeel schuift dicht
  const deel = (a, b, dx = 0, al = 1) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, a + dx, y - h / 2, b - a, h, 10); shape(ctx, '#4A4268', C.kernR, 1.5); ctx.restore(); };
  deel(x, d0); deel(d1, x + w, -dicht);
  // het stuk dat wegvalt: koraal omrand, vervaagt
  ctx.save(); ctx.globalAlpha *= 1 - e; roundRect(ctx, d0, y - h / 2, d1 - d0, h, 4); shape(ctx, '#4A4268', toon > 0.5 ? C.koraal : C.kernR, toon > 0.5 ? 3 : 1.5);
  ctx.fillStyle = E3.geel; ctx.fillRect(d0, y - h / 2 + 3, k1 - d0, h - 6); ctx.fillStyle = C.groen; ctx.fillRect(b0, y - h / 2 + 3, b1 - b0, h - 6); ctx.restore();
  ctx.fillStyle = E3.geel; ctx.fillRect(k0, y - h / 2 + 3, d0 - k0, h - 6); // begin van het kleurgen blijft (vereenvoudigd)
  naamBij(ctx, 'kleurgen', null, (k0 + k1) / 2, y - 60, 1, 'center', E3.geel);
  naamBij(ctx, 'buurgen', 'nodig voor het embryo', (b0 + b1) / 2 + 40, y + 100, buurLab * (1 - e), 'center', C.groen);
  naamBij(ctx, 'stuk DNA ontbreekt', null, d0 + 40, y + 100, e, 'center', C.koraal);
  metaText(ctx, 'stuk van een chromosoom · vereenvoudigd', x, y + 190, C.text2, 'left', 24); }
