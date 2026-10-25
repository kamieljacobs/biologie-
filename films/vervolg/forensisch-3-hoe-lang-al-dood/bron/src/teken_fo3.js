// Wat word jij? · Forensisch onderzoek 3 · Hoe lang al dood? — eigen tekeningen (25 okt 2026)
// De overledene komt nooit in beeld, ook niet als silhouet: alleen de kamer, schema's en Kim en Bilal.
// Getallen: getallen.md en reken.py (Grassberger & Reiter 2001, drempel 8 graden, 80 graaddagen in het vereenvoudigde model).
// Uit lib_bio.js (in de bundel): celRond, enzymKluwen, membraanBoog, spierVezel, rodeBloedcel, bioPad.

function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function fadeUit(t, t0, d = 0.6) { return 1 - clamp((t - t0) / d, 0, 1); }

// buurvrouw (Mevrouw Jansen) en Lieke (forensisch entomoloog) staan sinds 25 okt 2026 in lib_cast.js

// ---------- kleuren van de kamer en de dieren ----------
const KL = { muur: '#22324E', muurD: '#1E2C46', vloer: '#2C3B57', plint: '#3A4A66', hout: '#8C6A4E', houtD: '#6E5240', stof: '#5E7C8C', stofD: '#4C6878', stofL: '#6F8E9E',
  lucht: '#2E4466', kozijn: '#D8DEE4', radiator: '#C9CED6', radD: '#9AA3B2', zand: '#C9A35C', glasR: '#C9CED6',
  made: '#EDE4CC', madeS: '#D2C5A6', madeL: '#F6F0E2', pop: '#8C4A2E', popD: '#6A3420', ei: '#F2EBD8', eiS: '#D8CCB0',
  vliegBorst: '#2F6A5C', vliegAch: '#3E8A6E', vliegAchL: '#5FAE8C', vliegOog: '#9A3E30', poot: '#232A36', vleugel: '#D8E4EC',
  actine: '#9FC6D6', actineD: '#7AA8BC', myosine: '#C9A88A', myosineD: '#A88A6E', zschijf: '#D8DEE4', atp: '#E07A5F' };

// =====================================================================================
// BROMVLIEG (groene bromvlieg, Lucilia sericata) van boven. Recept: lijf ± 10 mm; kop met twee grote roodbruine
// facetogen die bij het vrouwtje niet raken; borststuk met drie pootparen (zes poten, allemaal aan het borststuk);
// achterlijf rond-ovaal, metaalglanzend groen; twee doorzichtige vleugels in rust schuin naar achteren, iets
// gespreid over het achterlijf, met een paar aders; korte sprieten. Bron: Wikipedia 'Lucilia sericata', Natural
// History Museum (blow fly). Bekende fouten: poten aan het achterlijf; vier vleugels; ogen als stipjes.
// s = schaal (1 = 10 mm ≈ 140 px lang), rot = draaiing, o.vliegt 0..1 (vleugels slaan), o.t
// =====================================================================================
function vlieg(ctx, x, y, s = 1, o = {}) {
  const { a = 1, rot = 0, t = 0, vliegt = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; circ(ctx, 0, 6, 96, null, C.goud, 3); ctx.restore(); }
  // poten (zes, aan het borststuk), eerst zodat lijf erover valt
  const poot = (sx, sy, k, e, v, dikte) => { ctx.strokeStyle = KL.poot; ctx.lineWidth = dikte; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(k[0], k[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.lineWidth = dikte * 0.7; ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(v[0], v[1]); ctx.stroke(); };
  for (const sd of [-1, 1]) {
    poot(sd * 10, -22, [sd * 30, -42], [sd * 40, -66], [sd * 46, -78], 4.5);
    poot(sd * 12, -10, [sd * 40, -8], [sd * 58, 12], [sd * 64, 22], 4.5);
    poot(sd * 10, 2, [sd * 32, 22], [sd * 44, 54], [sd * 48, 68], 4.5);
  }
  // vleugels (twee), in rust schuin naar achter; bij vliegen een vage slagwaaier
  const vleugel = (sd, an) => { ctx.save(); ctx.translate(sd * 9, -16); ctx.rotate(sd * an);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(sd * 20, 10, sd * 30, 50, sd * 18, 84); ctx.bezierCurveTo(sd * 8, 96, -sd * 6, 84, -sd * 4, 50); ctx.bezierCurveTo(-sd * 4, 26, -sd * 2, 8, 0, 0); ctx.closePath();
    ctx.fillStyle = rgba(KL.vleugel, 0.34); ctx.fill(); ctx.strokeStyle = rgba('#B8C6D0', 0.85); ctx.lineWidth = 1.6; ctx.stroke();
    ctx.strokeStyle = rgba('#8FA0B5', 0.7); ctx.lineWidth = 1.1; [[2, 6, sd * 14, 70], [1, 4, sd * 4, 78], [3, 10, sd * 22, 52]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1 * sd, b1); ctx.quadraticCurveTo((a1 * sd + a2) / 2 + sd * 4, (b1 + b2) / 2, a2, b2); ctx.stroke(); });
    ctx.restore(); };
  // achterlijf
  ctx.beginPath(); ctx.ellipse(0, 30, 26, 34, 0, 0, 6.283); ctx.fillStyle = KL.vliegAch; ctx.fill();
  ctx.strokeStyle = rgba('#1E4A3C', 0.6); ctx.lineWidth = 1.6; [16, 32, 46].forEach(yy => { ctx.beginPath(); ctx.ellipse(0, yy, 24 * Math.sqrt(1 - Math.pow((yy - 30) / 36, 2)), 3, 0, 0, Math.PI); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(-8, 22, 7, 13, -0.2, 0, 6.283); ctx.fillStyle = rgba(KL.vliegAchL, 0.55); ctx.fill();
  // borststuk
  ctx.beginPath(); ctx.ellipse(0, -14, 21, 19, 0, 0, 6.283); ctx.fillStyle = KL.vliegBorst; ctx.fill();
  ctx.strokeStyle = rgba('#1A3A32', 0.7); ctx.lineWidth = 1.4; for (const sd of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(sd * 7, -28); ctx.lineTo(sd * 8, -4); ctx.stroke(); }
  // vleugels over het lijf
  if (vliegt > 0.01) { const sl = Math.sin(t * 60) * 0.5 + 0.5; for (const sd of [-1, 1]) { ctx.save(); ctx.globalAlpha *= vliegt * 0.5; vleugel(sd, lerp(0.2, 1.3, sl)); ctx.restore(); ctx.save(); ctx.globalAlpha *= vliegt * 0.5; vleugel(sd, lerp(1.3, 0.2, sl)); ctx.restore(); } }
  if (vliegt < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - vliegt; vleugel(-1, 0.32); vleugel(1, 0.32); ctx.restore(); }
  // kop met facetogen en sprieten
  ctx.beginPath(); ctx.ellipse(0, -40, 17, 11, 0, 0, 6.283); ctx.fillStyle = '#3A4A44'; ctx.fill();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 10, -41, 9, 10, sd * 0.3, 0, 6.283); ctx.fillStyle = KL.vliegOog; ctx.fill(); ctx.beginPath(); ctx.ellipse(sd * 12, -44, 3, 3.5, 0, 0, 6.283); ctx.fillStyle = rgba('#E0A090', 0.35); ctx.fill();
    ctx.strokeStyle = KL.poot; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(sd * 3, -50); ctx.lineTo(sd * 5, -57); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// MADE (larve van een bromvlieg), van opzij/boven. Recept: wit-crème, zonder poten en zonder echte kop; 12 segmenten,
// spits aan de voorkant met twee donkere mondhaakjes, stomp en recht afgesneden achteraan met twee bruine
// ademopeningen (stigmata). Lengte larve 1 ± 2–5 mm, larve 2 ± 5–10 mm, larve 3 tot ± 14–17 mm (L. sericata).
// Beweging: een samentrekkingsgolf loopt van achter naar voren (peristaltiek). Bron: Wikipedia 'Maggot',
// Amendt e.a. 2007 (Forensic entomology, Naturwissenschaften). Bekende fouten: poten, een bolle kop met ogen.
// L = lengte in px, rot = richting (kop naar rechts bij 0), o.kruip 0..1 (golf), o.t
// =====================================================================================
function made(ctx, x, y, L, o = {}) {
  const { a = 1, rot = 0, t = 0, kruip = 1, kleur = KL.made, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const r = L * 0.13, N = 12, pts = [], terug = [];
  for (let i = 0; i <= 40; i++) { const u = i / 40; // u = 0 achter, 1 kop
    const golf = 1 + 0.08 * kruip * Math.sin(u * 9 - t * 5); const breed = r * (u < 0.12 ? 0.86 + u : (u > 0.7 ? Math.max(0.12, 1 - Math.pow((u - 0.7) / 0.3, 1.6) * 0.88) : 1)) * golf;
    const xx = (u - 0.5) * L * (1 + 0.04 * kruip * Math.sin(t * 5)), yy = Math.sin(u * 3 + t * 1.2) * r * 0.25 * kruip;
    pts.push([xx, yy - breed]); terug.push([xx, yy + breed]); }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); pts.forEach(p => ctx.lineTo(p[0], p[1])); for (let i = terug.length - 1; i >= 0; i--) ctx.lineTo(terug[i][0], terug[i][1]); ctx.closePath();
  ctx.fillStyle = kleur; ctx.fill(); ctx.strokeStyle = KL.madeS; ctx.lineWidth = Math.max(1, L * 0.012); ctx.stroke();
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  // segmenten als lichte banden
  ctx.strokeStyle = rgba('#B8AA88', 0.55); ctx.lineWidth = Math.max(0.8, L * 0.008);
  for (let k = 1; k < N; k++) { const i = Math.round(k / N * 40); if (i <= 1 || i >= 39) continue; ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1] + 1); ctx.quadraticCurveTo(pts[i][0] + r * 0.18, (pts[i][1] + terug[i][1]) / 2, terug[i][0], terug[i][1] - 1); ctx.stroke(); }
  // glans
  ctx.beginPath(); ctx.ellipse(-L * 0.08, -r * 0.42, L * 0.26, r * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(KL.madeL, 0.6); ctx.fill();
  // mondhaakjes (kop) en ademopeningen (achter)
  const kp = pts[40]; ctx.strokeStyle = '#2A2420'; ctx.lineWidth = Math.max(1.2, L * 0.016); ctx.beginPath(); ctx.moveTo(kp[0] - L * 0.04, kp[1] + r * 0.12); ctx.lineTo(kp[0] + L * 0.01, kp[1] + r * 0.12); ctx.stroke();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(pts[1][0] + L * 0.01, sd * r * 0.32 + (pts[1][1] + terug[1][1]) / 2, Math.max(1.2, r * 0.13), 0, 6.283); ctx.fillStyle = '#7A5A3A'; ctx.fill(); }
  ctx.restore();
}
// eitjes: een pakketje van langwerpige crèmewitte eitjes (± 1,5 mm), dicht op elkaar
function eitjes(ctx, x, y, n, len, o = {}) {
  const { a = 1, seed = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const g = Math.floor(i / 6), k = i % 6; const ex = x + (k - 2.5) * len * 0.34 + (hash(i + seed) - 0.5) * len * 0.12 + g * len * 0.12, ey = y + (g - 1) * len * 0.42 + (hash(i * 3 + seed) - 0.5) * len * 0.1;
    ctx.save(); ctx.translate(ex, ey); ctx.rotate(1.35 + (hash(i * 7 + seed) - 0.5) * 0.35); ctx.beginPath(); ctx.ellipse(0, 0, len * 0.5, len * 0.17, 0, 0, 6.283); shape(ctx, KL.ei, KL.eiS, 1.2); ctx.restore(); }
  ctx.restore();
}
// pop (puparium): tonvormig, roodbruin, met segmentlijnen; donkerder als hij ouder is
function pop(ctx, x, y, L, o = {}) {
  const { a = 1, rot = 0, oud = 0.5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const kl = _mixHex(KL.pop, KL.popD, oud); roundRect(ctx, -L / 2, -L * 0.2, L, L * 0.4, L * 0.2); shape(ctx, kl, lighten(kl, 0.2), 1.5);
  ctx.strokeStyle = rgba('#3A1A10', 0.45); ctx.lineWidth = 1.4; for (let k = 1; k < 10; k++) { const xx = -L / 2 + k * L / 10; ctx.beginPath(); ctx.moveTo(xx, -L * 0.19); ctx.quadraticCurveTo(xx + L * 0.02, 0, xx, L * 0.19); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-L * 0.06, -L * 0.1, L * 0.3, L * 0.04, 0, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.fill();
  ctx.restore();
}
// liniaal met millimeterstreepjes; pxMm = pixels per millimeter
function liniaal(ctx, x, y, mm, pxMm, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 10, y - 4, mm * pxMm + 20, 46, 6); shape(ctx, rgba('#E8E2D2', 0.9), '#B9B09A', 1.5);
  ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 1.5; for (let k = 0; k <= mm; k++) { const xx = x + k * pxMm, h = k % 10 === 0 ? 22 : (k % 5 === 0 ? 15 : 9); ctx.beginPath(); ctx.moveTo(xx, y - 4); ctx.lineTo(xx, y - 4 + h); ctx.stroke(); }
  for (let k = 0; k <= mm; k += 10) text(ctx, String(k / 10), x + k * pxMm, y + 36, fTekst(18, 700), '#3A3A3A', 'center');
  ctx.restore();
}

// =====================================================================================
// ZANDLOPER (een klok die leegloopt). frac = deel zand dat nog boven zit (1 = net gedraaid, 0 = leeg).
// =====================================================================================
function zandloper(ctx, x, y, h, frac, o = {}) {
  const { a = 1, t = 0, loopt = frac > 0.01 && frac < 0.99, hl = 0, dim: dm = 0, vliegje = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * dm);
  const w = h * 0.5, mid = y, top = y - h / 2, bot = y + h / 2, nek = w * 0.07;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - w * 0.8, top - h * 0.14, w * 1.6, h * 1.28, 14); shape(ctx, rgba(C.goud, 0.1), C.goud, 2.5); ctx.restore(); }
  const bol = (s) => { ctx.beginPath(); ctx.moveTo(x - w * 0.44, mid - s * h * 0.44); ctx.bezierCurveTo(x - w * 0.46, mid - s * h * 0.2, x - nek * 2, mid - s * h * 0.08, x - nek, mid); ctx.lineTo(x + nek, mid); ctx.bezierCurveTo(x + nek * 2, mid - s * h * 0.08, x + w * 0.46, mid - s * h * 0.2, x + w * 0.44, mid - s * h * 0.44); ctx.closePath(); };
  // zand boven
  const f = clamp(frac, 0, 1);
  if (f > 0.005) { ctx.save(); bol(1); ctx.clip(); const lvl = mid - h * 0.42 * Math.sqrt(f); ctx.fillStyle = KL.zand; ctx.fillRect(x - w, lvl, 2 * w, mid - lvl + 2); ctx.restore(); }
  // zand onder (berg)
  if (f < 0.995) { ctx.save(); bol(-1); ctx.clip(); const hb = h * 0.4 * Math.sqrt(1 - f); ctx.beginPath(); ctx.moveTo(x - w * 0.5, bot - h * 0.04); ctx.lineTo(x - w * 0.5, bot - h * 0.04 - hb * 0.45); ctx.quadraticCurveTo(x, bot - h * 0.04 - hb * 1.25, x + w * 0.5, bot - h * 0.04 - hb * 0.45); ctx.lineTo(x + w * 0.5, bot - h * 0.04); ctx.closePath(); ctx.fillStyle = KL.zand; ctx.fill(); ctx.restore(); }
  if (loopt) { ctx.strokeStyle = KL.zand; ctx.lineWidth = Math.max(1.5, h * 0.018); ctx.setLineDash([h * 0.03, h * 0.02]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(x, mid); ctx.lineTo(x, bot - h * 0.06); ctx.stroke(); ctx.setLineDash([]); }
  // glas
  for (const s of [1, -1]) { bol(s); ctx.fillStyle = rgba('#AFC0D0', 0.08); ctx.fill(); ctx.strokeStyle = rgba(KL.glasR, 0.9); ctx.lineWidth = 2; ctx.stroke(); }
  // houten plankjes en stijlen
  ctx.fillStyle = KL.hout; roundRect(ctx, x - w * 0.6, top - h * 0.06, w * 1.2, h * 0.07, 4); ctx.fill(); roundRect(ctx, x - w * 0.6, bot - h * 0.01, w * 1.2, h * 0.07, 4); ctx.fill();
  ctx.strokeStyle = KL.houtD; ctx.lineWidth = Math.max(2, h * 0.025); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sd * w * 0.52, top); ctx.lineTo(x + sd * w * 0.52, bot); ctx.stroke(); }
  if (vliegje > 0.01) vlieg(ctx, x, top - h * 0.16, h * 0.0018 * 100 / 100 * 1.1, { a: vliegje, rot: 0.2, t });
  ctx.restore();
}
// de rij van vier zandlopers rechtsboven: fr = [warmte, bloed, spieren, vlieg], zicht = [0..1 ×4], hl = index of -1
const ZL_NAMEN = ['warmte', 'bloed', 'spieren', 'vlieg'];
function zandlopers(ctx, t, st = {}) {
  const { fr = [1, 1, 1, 1], zicht = [1, 1, 1, 0], hl = -1, dimAnder = 0, x0 = 1290, dx = 160, y = 128, h = 132 } = st;
  for (let i = 0; i < 4; i++) { const a = zicht[i]; if (a <= 0.01) continue; const x = x0 + i * dx; const isH = i === hl;
    zandloper(ctx, x, y, h, fr[i], { a, t, hl: isH ? 1 : 0, dim: (hl >= 0 && !isH) ? dimAnder : 0, vliegje: i === 3 ? 1 : 0, loopt: fr[i] > 0.01 && (i === 3 || fr[i] < 0.99) });
    metaA(ctx, ZL_NAMEN[i], x, y + h / 2 + 46, a * ((hl >= 0 && !isH) ? 1 - 0.6 * dimAnder : 1), isH ? C.goud : C.grain, 'center', 26); }
}

// =====================================================================================
// TIJDBALK onderin: links 'gevonden · vandaag', rechts 'laatst gezien · 14 dagen geleden' (de tijd loopt naar rechts terug).
// o.venster = [van, tot] in dagen geleden (bv. [11, 14]); o.vaag 0..1 = vage linkerrand; o.pmi = label 'postmortaal interval'
// =====================================================================================
function tijdbalkX(x0, x1, d) { return x0 + (d / 14) * (x1 - x0); }
function tijdbalk(ctx, x0, x1, y, o = {}) {
  const { a = 1, pmi = 0, venster = null, vensterA = 0, vaag = 1, hlL = 0, hlR = 0, ondergrens = 0, onderD = 11, dagen = 1, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - 7, x1 - x0, 14, 7); shape(ctx, '#2A3A58', C.line, 1.5);
  if (dagen > 0.01) { ctx.save(); ctx.globalAlpha *= dagen; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; for (let d = 1; d < 14; d++) { const xx = tijdbalkX(x0, x1, d); ctx.beginPath(); ctx.moveTo(xx, y - 14); ctx.lineTo(xx, y - 7); ctx.stroke(); } ctx.restore(); }
  if (venster && vensterA > 0.01) { ctx.save(); ctx.globalAlpha *= vensterA; const xa = tijdbalkX(x0, x1, venster[0]), xb = tijdbalkX(x0, x1, venster[1]);
    roundRect(ctx, xa, y - 12, xb - xa, 24, 8); ctx.fillStyle = rgba(C.goud, 0.75); ctx.fill();
    // vage linkerrand: vlakke treden die lichter worden (geen verloop)
    if (vaag > 0.01) for (let k = 1; k <= 5; k++) { const w = (xb - xa) * 0.06; ctx.fillStyle = rgba(C.goud, 0.62 * (1 - k / 6) * vaag); ctx.fillRect(xa - k * w, y - 12, w, 24); }
    ctx.restore(); }
  const end = (xx, hl) => { circ(ctx, xx, y, 13, '#2A3A58', hl > 0.01 ? C.goud : C.line, hl > 0.01 ? 4 : 2); };
  end(x0, hlL); end(x1, hlR);
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels;
    regel(ctx, 'gevonden', x0, y - 30, 1, hlL > 0.5 ? C.goud : C.text, 30, 'left', 700); metaA(ctx, 'vandaag', x0, y + 46, 1, C.grain, 'left', 26);
    regel(ctx, 'laatst gezien', x1, y - 30, 1, hlR > 0.5 ? C.goud : C.text, 30, 'right', 700); metaA(ctx, '14 dagen geleden', x1, y + 46, 1, C.grain, 'right', 26); ctx.restore(); }
  if (pmi > 0.01) regel(ctx, 'postmortaal interval', (x0 + x1) / 2, y - 30, pmi, C.goud, 32, 'center', 700);
  if (ondergrens > 0.01) { const xx = tijdbalkX(x0, x1, onderD); ctx.save(); ctx.globalAlpha *= ondergrens; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, y - 20); ctx.lineTo(xx, y + 20); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// DE KAMER (Schema): wand, vloer, deur links, thermometer aan de muur, lege leesstoel met bijzettafel en kopje,
// raam met vensterbank rechts, radiator met de knop op 0 eronder. Geen mens in de stoel.
// =====================================================================================
function kamerThermometer(ctx, x, y, s = 1, o = {}) {
  const { a = 1, waarde = 15, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -34, -120, 68, 240, 12); shape(ctx, '#E8E2D2', hl > 0.01 ? C.goud : '#B9B09A', hl > 0.01 ? 4 : 2);
  const yv = v => 80 - (v - 0) / 40 * 170; // 0..40 graden
  ctx.strokeStyle = '#5A5A5A'; ctx.lineWidth = 1.5; for (let v = 0; v <= 40; v += 5) { ctx.beginPath(); ctx.moveTo(4, yv(v)); ctx.lineTo(v % 10 === 0 ? 20 : 14, yv(v)); ctx.stroke(); if (v % 10 === 0) text(ctx, String(v), 23, yv(v) + 6, fTekst(16, 700), '#4A4A4A', 'left'); }
  roundRect(ctx, -10, -96, 12, 182, 6); shape(ctx, '#F6F2EA', '#B9B09A', 1.2);
  ctx.fillStyle = C.koraal; ctx.fillRect(-7, yv(waarde), 6, 86 - yv(waarde)); circ(ctx, -4, 94, 13, C.koraal);
  ctx.restore();
}
function radiator(ctx, x, y, w, h, o = {}) {
  const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.round(w / 26); for (let i = 0; i < n; i++) { roundRect(ctx, x + i * (w / n) + 2, y, w / n - 4, h, 6); shape(ctx, KL.radiator, KL.radD, 1.2); }
  ctx.fillStyle = KL.radD; ctx.fillRect(x, y + 10, w, 6); ctx.fillRect(x, y + h - 16, w, 6);
  // thermostaatknop met de 0 naar boven
  circ(ctx, x + w + 26, y + h * 0.4, 20, '#E8ECF0', hl > 0.01 ? C.goud : KL.radD, hl > 0.01 ? 4 : 2); text(ctx, '0', x + w + 26, y + h * 0.4 + 7, fTekst(20, 800), '#3A3A3A', 'center');
  ctx.restore();
}
function leesstoel(ctx, x, y, s = 1, o = {}) { // x = midden, y = vloer
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = KL.houtD; for (const sd of [-1, 1]) { ctx.fillRect(sd * 118 - 7, -46, 14, 46); }
  roundRect(ctx, -110, -330, 220, 230, 40); shape(ctx, KL.stof, null);               // rugleuning
  roundRect(ctx, -82, -300, 164, 170, 26); shape(ctx, KL.stofL, null);
  roundRect(ctx, -130, -150, 260, 104, 22); shape(ctx, KL.stofD, null);               // zitting
  roundRect(ctx, -112, -158, 224, 40, 16); shape(ctx, KL.stofL, null);                // kussen
  for (const sd of [-1, 1]) { roundRect(ctx, sd * 128 - 30, -230, 60, 186, 24); shape(ctx, KL.stof, null); roundRect(ctx, sd * 128 - 30, -232, 60, 30, 15); shape(ctx, KL.stofL, null); }
  ctx.restore();
}
function kopje(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 2, 40, 8, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 1.5);
  ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(26, -40); ctx.quadraticCurveTo(24, -4, 14, 0); ctx.lineTo(-14, 0); ctx.quadraticCurveTo(-24, -4, -26, -40); ctx.closePath(); shape(ctx, '#F2F2EE', '#B8B0A0', 1.5);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(30, -24, 11, -1.4, 1.4); ctx.stroke();
  ctx.fillStyle = C.koraal; ctx.fillRect(-25, -30, 50, 5);
  ctx.restore(); }
function bijzettafel(ctx, x, y, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 70, y - 190, 140, 16, 6); shape(ctx, KL.hout, null); ctx.fillStyle = KL.houtD; ctx.fillRect(x - 6, y - 176, 12, 176); ctx.fillRect(x - 46, y - 8, 92, 8); ctx.restore(); }
// raam: x,y = linksboven glas; vensterbank onder
function raam(ctx, x, y, w, h, o = {}) {
  const { a = 1, hlBank = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 16, y - 16, w + 32, h + 32, 6); shape(ctx, KL.kozijn, null);
  ctx.fillStyle = KL.lucht; ctx.fillRect(x, y, w, h);
  // buiten: boom en dak aan de overkant, vlak
  ctx.fillStyle = '#3A5A4A'; ctx.beginPath(); ctx.ellipse(x + w * 0.28, y + h * 0.62, w * 0.2, h * 0.3, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#4A3A30'; ctx.fillRect(x + w * 0.27, y + h * 0.8, 10, h * 0.2);
  ctx.fillStyle = '#3A4458'; ctx.beginPath(); ctx.moveTo(x + w * 0.55, y + h); ctx.lineTo(x + w * 0.55, y + h * 0.7); ctx.lineTo(x + w * 0.78, y + h * 0.5); ctx.lineTo(x + w, y + h * 0.68); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.06); ctx.beginPath(); ctx.moveTo(x + w * 0.1, y); ctx.lineTo(x + w * 0.3, y); ctx.lineTo(x + w * 0.05, y + h); ctx.lineTo(x - 0, y + h); ctx.closePath(); ctx.fill();
  ctx.fillStyle = KL.kozijn; ctx.fillRect(x + w / 2 - 7, y, 14, h); ctx.fillRect(x, y + h * 0.45 - 6, w, 12);
  roundRect(ctx, x - 40, y + h + 14, w + 80, 22, 4); shape(ctx, '#E8ECF0', hlBank > 0.01 ? C.goud : '#B8C0CC', hlBank > 0.01 ? 3 : 1.5);
  ctx.restore();
}
function deur(ctx, x, y, w, h, o = {}) { const { a = 1, nummer = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - 12, w + 24, h + 12, 4); shape(ctx, '#D8DEE4', null);
  roundRect(ctx, x, y, w, h, 3); shape(ctx, '#3E6E5A', null); roundRect(ctx, x + 22, y + 24, w - 44, h * 0.32, 4); shape(ctx, '#33594A', null); roundRect(ctx, x + 22, y + h * 0.42, w - 44, h * 0.48, 4); shape(ctx, '#33594A', null);
  circ(ctx, x + w - 26, y + h * 0.52, 8, '#C9A35C'); if (nummer) { roundRect(ctx, x + w / 2 - 30, y + h * 0.36, 60, 34, 4); shape(ctx, '#E8E2D2', null); text(ctx, nummer, x + w / 2, y + h * 0.36 + 27, fTekst(26, 700), '#3A3A3A', 'center'); }
  ctx.restore(); }
function vloer(ctx) { ctx.fillStyle = KL.muurD; ctx.fillRect(0, 0, W, 800); ctx.fillStyle = KL.plint; ctx.fillRect(0, 786, W, 14); ctx.fillStyle = KL.vloer; ctx.fillRect(0, 800, W, 70); }
// de woonkamer als geheel; o.vlieg = alpha van de vlieg op de vensterbank, o.larven = alpha larven
function kamer(ctx, t, o = {}) {
  const { a = 1, hlThermo = 0, hlRad = 0, hlVlieg = 0, vliegA = 1, larven = 0, hlBank = 0, deurA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vloer(ctx);
  deur(ctx, 120, 330, 200, 456, { a: deurA });
  kamerThermometer(ctx, 520, 420, 1, { hl: hlThermo });
  leesstoel(ctx, 860, 800, 1);
  bijzettafel(ctx, 1100, 800); kopje(ctx, 1100, 610, 0.9);
  raam(ctx, 1340, 230, 400, 330, { hlBank });
  radiator(ctx, 1370, 640, 300, 120, { hlRad });
  if (vliegA > 0.01) { const w = wander(5, t, 6, 0.6); vlieg(ctx, 1600 + w.x, 556 + w.y * 0.3, 0.45, { a: vliegA, t, rot: -0.4 + 0.1 * Math.sin(t * 0.7), hl: hlVlieg }); }
  if (larven > 0.01) for (let i = 0; i < 4; i++) made(ctx, 1420 + i * 46, 566 - (i % 2) * 3, 34, { a: larven, t: t + i, rot: (i % 2 ? 0.2 : -0.15) });
  ctx.restore();
}
// de gang met de voordeur (cold open)
function gang(ctx, t, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vloer(ctx); deur(ctx, 1180, 300, 240, 486, { nummer: '12' });
  roundRect(ctx, 1150, 790, 300, 20, 6); shape(ctx, '#5A4A3A', null);   // deurmat
  ctx.restore(); }
// kalendertje met drie weken; de zondagen gemarkeerd (vink = koffie, kruis = niet open, cirkel = vandaag)
function kalender(ctx, x, y, s = 1, o = {}) {
  const { a = 1, w1 = 1, w2 = 1, w3 = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 420, 320, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(0, 0, 420, 50);
  text(ctx, 'oktober', 210, 36, fTekst(28, 700), '#F2F2EE', 'center');
  const dg = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']; dg.forEach((d, i) => text(ctx, d, 36 + i * 58, 84, fTekst(20, 700), i === 6 ? C.koraal : '#5A5A5A', 'center'));
  for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const n = 6 + r * 7 + i; text(ctx, String(n), 36 + i * 58, 136 + r * 70, fTekst(24, 600), '#3A3A3A', 'center'); }
  const zx = 36 + 6 * 58;
  if (w1 > 0.01) { ctx.save(); ctx.globalAlpha *= w1; circ(ctx, zx, 128, 26, null, C.groen, 4); ctx.restore(); }
  if (w2 > 0.01) kruis(ctx, zx, 198, 22, w2);
  if (w3 > 0.01) { ctx.save(); ctx.globalAlpha *= w3; circ(ctx, zx, 268, 26, null, C.goud, 4); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// AFKOELCURVE (Schema-grafiek). Model voor de vorm (Marshall en Hoare): Q = 1,4·e^(−Bt) − 0,4·e^(−3,5Bt), B = 0,065 per uur:
// helling 0 op t = 0 (plateau), daarna steeds trager naar de kamer (15 graden). Alleen ter illustratie, geen
// casusgetallen: 24 uur ≈ 21,5 graden, 48 uur ≈ 16,4 graden ('na een dag of twee').
// =====================================================================================
function afkoelT(h) { const B = 0.065; return 15 + 22 * (1.4 * Math.exp(-B * h) - 0.4 * Math.exp(-3.5 * B * h)); }
function afkoelGrafiek(ctx, X, Y, Wd, Hd, o = {}) {
  const { a = 1, toon = 1, kamerA = 1, vuist = 0, plateau = 0, marge = 0, stilA = 0, eind = 48 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const px = h => X + h / eind * Wd, py = T => Y + Hd - (T - 10) / 30 * Hd;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y + Hd); ctx.lineTo(X + Wd, Y + Hd); ctx.stroke();
  for (const T of [15, 20, 25, 30, 35]) { metaText(ctx, String(T), X - 16, py(T) + 9, C.text2, 'right', 28); ctx.strokeStyle = rgba('#FFFFFF', 0.04); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X, py(T)); ctx.lineTo(X + Wd, py(T)); ctx.stroke(); }
  for (const hh of [0, 12, 24, 36, 48]) metaText(ctx, String(hh), px(hh), Y + Hd + 40, C.text2, 'center', 28);
  metaText(ctx, 'uren na het overlijden', X + Wd, Y + Hd + 80, C.text2, 'right', 26); metaText(ctx, 'kerntemperatuur in graden', X, Y - 70, C.text2, 'left', 26);
  if (kamerA > 0.01) { ctx.save(); ctx.globalAlpha *= kamerA; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, py(15)); ctx.lineTo(X + Wd, py(15)); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'kamer', '15 graden', X + 20, py(15) - 52, 1, 'left', C.teal); ctx.restore(); }
  if (vuist > 0.01) { ctx.save(); ctx.globalAlpha *= vuist; ctx.setLineDash([4, 12]); ctx.lineCap = 'round'; ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px(0), py(37)); ctx.lineTo(px(22 * clamp(vuist * 1.3, 0, 1)), py(37 - 22 * clamp(vuist * 1.3, 0, 1))); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'vuistregel', 'één graad per uur', px(17) + 14, py(19) + 10, clamp(vuist * 2 - 1, 0, 1), 'left', C.text2); ctx.restore(); }
  if (marge > 0.01) { ctx.save(); ctx.globalAlpha *= marge; const hc = 9; roundRect(ctx, px(hc - 3), Y + 4, px(hc + 3) - px(hc - 3), Hd - 8, 8); ctx.fillStyle = rgba(C.goud, 0.12); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.stroke();
    metaA(ctx, 'marge van uren', px(hc), Y + Hd - 22, 1, C.goud, 'center', 24); ctx.restore(); }
  // de curve zelf
  const hEnd = eind * clamp(toon, 0, 1); if (hEnd > 0.05) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let h = 0; h <= hEnd; h += 0.25) { const xx = px(h), yy = py(afkoelT(h)); h ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
    circ(ctx, px(hEnd), py(afkoelT(hEnd)), 10, C.koraal, '#F2F2EE', 2); }
  if (plateau > 0.01) { ctx.save(); ctx.globalAlpha *= plateau; haakBoven(ctx, px(0.3), px(5), py(37) - 22, C.groen); naamBij(ctx, 'plateau', '', px(2.7), py(37) - 58, 1, 'center', C.groen); ctx.restore(); }
  if (stilA > 0.01) naamBij(ctx, 'even warm als de kamer', 'na een dag of twee', px(47), py(22), stilA, 'right', C.text);
  ctx.restore();
  return { px, py };
}
function haakBoven(ctx, x1, x2, y, col) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y + 12); ctx.lineTo(x1, y); ctx.lineTo(x2, y); ctx.lineTo(x2, y + 12); ctx.stroke(); }
// kern en huid (schematisch, geen lichaam): twee ringen; de warmte gaat eerst van de kern naar de huid, dan naar de kamer
function kernHuid(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, stroom = 1, kern = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, R, rgba(C.koraal, 0.12), rgba(C.line, 0.9), 2);
  circ(ctx, x, y, R * 0.55, rgba(C.koraal, 0.25 + 0.35 * kern), C.koraal, 2);
  naamBij(ctx, 'kern', '', x, y + 12, 1, 'center'); naamBij(ctx, 'huid', '', x, y - R + 44, 1, 'center');
  if (stroom > 0.01) for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + 0.4, u = ((t * 0.35 + i * 0.13) % 1); const r0 = R * 0.6, r1 = R * 1.25; const rr = r0 + (r1 - r0) * u;
    ctx.save(); ctx.globalAlpha *= stroom * Math.sin(u * Math.PI); pijl(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, x + Math.cos(an) * (rr + 34), y + Math.sin(an) * (rr + 34), C.koraal, 1, 4, 12); ctx.restore(); }
  metaA(ctx, 'schematisch', x, y + R + 50, 1, C.grain, 'center', 24);
  ctx.restore();
}
// kaartje 'nomogram van Henssge': vier invoerwaarden → een venster van uren
function nomogramKaart(ctx, x, y, o = {}) {
  const { a = 1, rijen = 1, uit = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 520, 400, 16); shape(ctx, rgba(C.fill, 0.75), C.line, 1.5);
  regel(ctx, 'nomogram van Henssge', x + 260, y + 54, 1, C.text, 34, 'center', 700);
  ['lichaamstemperatuur', 'kamertemperatuur', 'gewicht', 'kleding'].forEach((s2, i) => { const f = clamp(rijen * 4 - i, 0, 1); if (f < 0.01) return;
    ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x + 40, y + 92 + i * 56, 26, 26, 6); shape(ctx, rgba(C.teal, 0.3), C.teal, 1.5); regel(ctx, s2, x + 84, y + 114 + i * 56, 1, C.text, 30, 'left', 600); ctx.restore(); });
  if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; pijl(ctx, x + 260, y + 318, x + 260, y + 340, C.goud, 1, 3, 10); roundRect(ctx, x + 110, y + 346, 300, 30, 15); ctx.fillStyle = rgba(C.goud, 0.7); ctx.fill(); metaA(ctx, 'een venster van uren', x + 260, y + 336, 1, C.goud, 'center', 22); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// BLOEDVAT in lengtedoorsnede (Schema), met rode bloedcellen. o.stroom 0..1 = hart pompt; o.zak 0..1 = cellen zakken naar
// de onderkant (zwaartekracht); o.uiteen 0..1 = cellen vallen uiteen (hemolyse) en de vaatwand kleurt.
// =====================================================================================
function bloedvatLang(ctx, x0, x1, y, r, t, o = {}) {
  const { a = 1, zak = 0, uiteen = 0, loopT = t, druk = 0, drukX = (x0 + x1) / 2, wegdruk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const wandK = _mixHex('#B5574A', '#7A2E4A', uiteen);
  roundRect(ctx, x0, y - r - 16, x1 - x0, 2 * r + 32, 20); ctx.fillStyle = wandK; ctx.fill();
  if (uiteen > 0.01) { ctx.save(); ctx.globalAlpha *= uiteen; roundRect(ctx, x0, y - r - 16, x1 - x0, 2 * r + 32, 20); ctx.fillStyle = rgba('#8A3A6A', 0.55); ctx.fill(); ctx.restore(); }
  roundRect(ctx, x0, y - r, x1 - x0, 2 * r, 10); ctx.fillStyle = '#3A1A22'; ctx.fill();
  ctx.save(); roundRect(ctx, x0, y - r, x1 - x0, 2 * r, 10); ctx.clip();
  if (uiteen > 0.01) { ctx.fillStyle = rgba('#9A3A4A', 0.45 * uiteen); ctx.fillRect(x0, y - r, x1 - x0, 2 * r); }
  const L = x1 - x0, n = 34, vt = t * 0;
  for (let i = 0; i < n; i++) { const sp = 0.6 + 0.5 * hash(i * 7 + 1); const base = hash(i * 7 + 2);
    // positie langs het vat: stroomt zolang het hart pompt, staat daarna stil
    const u = ((base + loopT * 0.12 * sp) % 1 + 1) % 1; let cx = x0 + 30 + u * (L - 60);
    if (druk > 0.01 && wegdruk > 0.01) { const d = cx - drukX; if (Math.abs(d) < 160) cx += Math.sign(d || 1) * (160 - Math.abs(d)) * ease(druk) * wegdruk; }
    const yFree = y + (hash(i * 7 + 3) * 2 - 1) * r * 0.7; const yBodem = y + r - 14 - hash(i * 7 + 4) * r * 0.6;
    const cy = lerp(yFree, yBodem, ease(zak)); const kant = 0.5 + 0.5 * Math.sin(i * 1.7 + loopT * 1.5);
    rodeBloedcel(ctx, cx, cy, 16, 0.4 * Math.sin(i + loopT * 0.5), kant, 0.95 * (1 - uiteen)); }
  ctx.restore();
  if (druk > 0.01) { const dy = lerp(-150, 0, ease(druk)); roundRect(ctx, drukX - 150, y - r - 52 + dy, 300, 26, 8); shape(ctx, rgba('#CFE6F0', 0.5), '#E8F2F6', 2); pijl(ctx, drukX, y - r - 130 + dy, drukX, y - r - 64 + dy, C.text2, 1, 4, 14); }
  ctx.restore();
}
// een vlek als kleurstaal met een glazen plaatje dat erop drukt; druk 0..1, wegdrukbaar 0..1 (1 = vlek verdwijnt onder het glas)
function vlekStaal(ctx, x, y, o = {}) {
  const { a = 1, vlek = 1, druk = 0, wegdrukbaar = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 150, y - 110, 300, 220, 18); shape(ctx, '#D9B8A0', '#B8957C', 2);
  const k = vlek * (1 - druk * wegdrukbaar * 0.85);
  ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); ctx.ellipse(x, y + 10, 110, 72, 0.05, 0, 6.283); ctx.fillStyle = rgba('#8A4A7A', 0.75); ctx.fill(); ctx.restore();
  if (druk > 0.01) { const dy = lerp(-170, -6, ease(druk)); roundRect(ctx, x - 90, y + dy - 10, 180, 20, 6); shape(ctx, rgba('#CFE6F0', 0.55), '#E8F2F6', 2); pijl(ctx, x, y + dy - 70, x, y + dy - 20, C.text2, 1, 4, 14); }
  metaA(ctx, 'kleur in een vlek', x, y + 150, 1, C.grain, 'center', 24);
  ctx.restore();
}
function hartIcoon(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, klopt = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const p = 1 + 0.08 * klopt * Math.max(0, Math.sin(t * 7)); ctx.translate(x, y); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 34); ctx.bezierCurveTo(-60, -6, -36, -54, 0, -24); ctx.bezierCurveTo(36, -54, 60, -6, 0, 34); ctx.closePath(); shape(ctx, rgba(C.koraal, lerp(0.35, 0.85, klopt)), C.koraal, 2.5); ctx.restore(); }

// =====================================================================================
// SARCOMEREN (Micro): Z-schijven als zigzaglijn, dunne actinedraden vanaf de Z-schijf naar binnen, dikke myosinedraad
// in het midden met koppen. o.knip 0..1: de Z-schijven en de verbindingen vallen weg, de draden zelf blijven heel en
// schuiven een stukje uit elkaar. Recept: spierfilm (actine-myosine) en Texas A&M 'Resolution of rigor'.
// =====================================================================================
function sarcomeren(ctx, x, y, w, h, n, o = {}) {
  const { a = 1, t = 0, knip = 0, samen = 0, rijen = 3, enzymen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sw = w / n, ov = lerp(0.18, 0.3, samen);
  for (let k = 0; k <= n; k++) { const zx = x + k * sw; const brok = knip; // Z-schijf
    ctx.save(); ctx.globalAlpha *= 1 - brok * 0.9; ctx.strokeStyle = KL.zschijf; ctx.lineWidth = 5; ctx.beginPath();
    for (let j = 0; j <= 12; j++) { const yy = y - h / 2 + j * h / 12; const xx = zx + (j % 2 ? 8 : -8); j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
    if (brok > 0.05) for (let j = 0; j < 5; j++) { const yy = y - h / 2 + (j + 0.5) * h / 5; const d = brok * 30; ctx.save(); ctx.globalAlpha *= brok * 0.8 * (1 - clamp((brok - 0.7) / 0.3, 0, 1) * 0.6); ctx.strokeStyle = KL.zschijf; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(zx - 6 + (hash(k * 9 + j) - 0.5) * d, yy - 10 + d * 0.4 * (hash(j + k) - 0.5)); ctx.lineTo(zx + 6 + (hash(k * 5 + j) - 0.5) * d, yy + 8); ctx.stroke(); ctx.restore(); }
    if (k < n) metaA(ctx, '', zx, y, 0, C.grain, 'center', 20); }
  for (let k = 0; k < n; k++) { const x0 = x + k * sw, xm = x0 + sw / 2; const drift = knip * (k % 2 ? 1 : -1) * 6;
    for (let r = 0; r < rijen; r++) { const yy = y - h / 2 + (r + 0.5) * h / rijen; const dr = knip * ((hash(k * 3 + r) - 0.5) * 18);
      // actine vanaf beide Z-schijven
      for (const sd of [-1, 1]) { const zx = sd < 0 ? x0 : x0 + sw, end = xm - sd * sw * (0.5 - ov) ; const yA1 = yy - h / rijen * 0.26 + dr;
        for (const yA of [yA1, yy + h / rijen * 0.26 + dr]) { ctx.strokeStyle = KL.actine; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(zx - sd * 4 + drift, yA); ctx.lineTo(end + drift - sd * 0, yA); ctx.stroke();
          ctx.fillStyle = KL.actineD; for (let b = 0; b < 8; b++) { const bx = lerp(zx, end, (b + 0.5) / 8) + drift; circ(ctx, bx, yA + (b % 2 ? 2 : -2), 3, KL.actineD); } } }
      // myosine in het midden met koppen
      const mx0 = xm - sw * 0.3, mx1 = xm + sw * 0.3; ctx.strokeStyle = KL.myosine; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(mx0 + drift * 0.5, yy + dr); ctx.lineTo(mx1 + drift * 0.5, yy + dr); ctx.stroke();
      for (let b = 0; b < 10; b++) { if (b === 4 || b === 5) continue; const bx = lerp(mx0, mx1, (b + 0.5) / 10) + drift * 0.5, sd = b < 5 ? -1 : 1;
        for (const up of [-1, 1]) { ctx.save(); ctx.translate(bx, yy + dr + up * 7); ctx.rotate(sd * 0.5 * up); ctx.beginPath(); ctx.ellipse(0, up * 8, 5, 8, 0, 0, 6.283); ctx.fillStyle = KL.myosineD; ctx.fill(); ctx.restore(); } } } }
  ctx.restore();
}
// ATP: base (ring) + suiker + staartje van drie fosfaatgroepen, koraal
function atpMol(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, n = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; ctx.lineTo(-22 + Math.cos(an) * 11, Math.sin(an) * 11); } ctx.closePath(); shape(ctx, rgba(C.koraal, 0.55), C.koraal, 1.5);
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 - 1.57; ctx.lineTo(Math.cos(an) * 9, Math.sin(an) * 9); } ctx.closePath(); shape(ctx, rgba(C.koraal, 0.4), C.koraal, 1.5);
  for (let k = 0; k < n; k++) { circ(ctx, 18 + k * 15, 0, 7, C.koraal, lighten(C.koraal, 0.4), 1.2); }
  ctx.restore(); }
// close-up: één actinedraad boven, één myosinedraad onder met koppen. kop[i] = { aan 0..1, slag 0..1 }; o.schuif = verschuiving van de actine
function kopCloseUp(ctx, x, y, w, o = {}) {
  const { a = 1, t = 0, koppen = [], schuif = 0, atp = [], namen = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const yA = y - 120, yM = y + 70;
  // actine: twee kralensnoeren in elkaar gedraaid
  ctx.save(); ctx.beginPath(); ctx.rect(x - 20, yA - 40, w + 40, 80); ctx.clip();
  for (let b = -2; b < w / 22 + 3; b++) { const bx = x + b * 22 + (schuif % 44); for (const k of [0, 1]) { const ph = b * 0.55 + k * Math.PI; circ(ctx, bx + k * 11, yA + Math.sin(ph) * 10, 13, k ? KL.actineD : KL.actine, rgba('#D8EEF6', 0.6), 1.2); } }
  ctx.restore();
  if (namen) naamBij(ctx, 'actine', '', x - 30, yA + 12, 1, 'right', C.text);
  // myosine: dikke staaf met koppen
  roundRect(ctx, x, yM - 22, w, 44, 22); shape(ctx, KL.myosine, lighten(KL.myosine, 0.25), 1.5);
  if (namen) naamBij(ctx, 'myosine', '', x - 30, yM + 12, 1, 'right', C.text);
  koppen.forEach((k, i) => { const bx = x + 70 + i * ((w - 140) / Math.max(1, koppen.length - 1));
    const an = lerp(-0.25, 0.55, k.slag); const reach = lerp(70, (yM - yA) - 34, k.aan);
    ctx.save(); ctx.translate(bx, yM - 22); ctx.rotate(an);
    ctx.strokeStyle = KL.myosineD; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -reach * 0.55); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, -reach * 0.55 - 26, 18, 30, 0, 0, 6.283); shape(ctx, k.vast ? _mixHex(KL.myosineD, '#E0B64A', 0.35 * k.vast) : KL.myosineD, lighten(KL.myosine, 0.3), 1.5);
    if (k.atp > 0.01) atpMol(ctx, 26, -reach * 0.55 - 30, 0.7, { a: k.atp, rot: -0.4 });
    ctx.restore(); });
  atp.forEach(p => atpMol(ctx, p[0], p[1], 0.8, { a: p[2] == null ? 1 : p[2], rot: p[3] || 0 }));
  ctx.restore();
}

// =====================================================================================
// eiwitketen (kralenketting) die door een enzym in stukjes wordt geknipt; knip 0..1 = de stukjes schuiven uit elkaar
// =====================================================================================
function eiwitKeten(ctx, x, y, w, o = {}) { const { a = 1, knip = 0, t = 0, col = '#A392D6', n = 22, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const knippen = [6, 12, 17];
  for (let i = 0; i < n; i++) { const deel = knippen.filter(k => i >= k).length; const dx = knip * (deel - 1.5) * 26, dy = knip * Math.sin(deel * 2 + seed) * 18;
    const bx = x + i * (w / n) + dx, by = y + Math.sin(i * 0.8 + seed + t * 0.6) * 12 + dy;
    if (i > 0 && !knippen.includes(i)) { const deel0 = knippen.filter(k => i - 1 >= k).length, px = x + (i - 1) * (w / n) + knip * (deel0 - 1.5) * 26, pyy = y + Math.sin((i - 1) * 0.8 + seed + t * 0.6) * 12 + knip * Math.sin(deel0 * 2 + seed) * 18; ctx.strokeStyle = rgba(col, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, pyy); ctx.lineTo(bx, by); ctx.stroke(); }
    circ(ctx, bx, by, 8, col, lighten(col, 0.3), 1.2); }
  ctx.restore(); }

// kleine staafbacterie (Schema), voor de darm en het bloedvat
function staafje(ctx, x, y, L, rot, col = C.teal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -L / 2, -L * 0.2, L, L * 0.4, L * 0.2); shape(ctx, rgba(col, 0.55), lighten(col, 0.3), 1.5);
  ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-L * 0.25, 0); ctx.quadraticCurveTo(0, -L * 0.1, L * 0.25, 0); ctx.stroke(); ctx.restore(); }
// darm als buis (Schema) met wand en bacteriën erin
function darmBuis(ctx, x0, x1, y, r, t, o = {}) { const { a = 1, n = 40, uit = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - r - 20, x1 - x0, 2 * r + 40, r * 0.6); shape(ctx, '#C9887A', '#E0A898', 2);
  roundRect(ctx, x0 + 10, y - r, x1 - x0 - 20, 2 * r, r * 0.5); ctx.fillStyle = '#3A2A2E'; ctx.fill();
  ctx.save(); roundRect(ctx, x0 + 10, y - r, x1 - x0 - 20, 2 * r, r * 0.5); ctx.clip();
  for (let i = 0; i < n; i++) { const w = wander(i + 40, t, 10, 0.3); staafje(ctx, x0 + 40 + hash(i * 3 + 1) * (x1 - x0 - 80) + w.x, y + (hash(i * 3 + 2) - 0.5) * r * 1.5 + w.y, 34, hash(i * 3 + 3) * 6.28, C.teal, 0.95); }
  ctx.restore(); ctx.restore(); }
// enzymcurve (zoals in Alles versneld): snelheid tegen temperatuur, optimum ± 40 graden, steil omlaag daarboven
function enzymSnelheid(T) { if (T <= 0) return 0.02; const opt = 40; if (T <= opt) return 0.02 + 0.98 * Math.pow(T / opt, 1.9); return Math.max(0, 1 - Math.pow((T - opt) / 14, 2)); }
function enzymGrafiek(ctx, X, Y, Wd, Hd, o = {}) { const { a = 1, toon = 1, stip15 = 0, stip22 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const px = T => X + T / 60 * Wd, py = v => Y + Hd - v * Hd;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y + Hd); ctx.lineTo(X + Wd, Y + Hd); ctx.stroke();
  for (const T of [0, 20, 40, 60]) metaText(ctx, String(T), px(T), Y + Hd + 38, C.text2, 'center', 28);
  metaText(ctx, 'temperatuur in graden', X + Wd, Y + Hd + 76, C.text2, 'right', 24); metaText(ctx, 'snelheid van afbraak', X, Y - 20, C.text2, 'left', 24);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let T = 0; T <= 60 * toon; T += 0.5) { const xx = px(T), yy = py(enzymSnelheid(T)); T ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  if (stip15 > 0.01) { ctx.save(); ctx.globalAlpha *= stip15; circ(ctx, px(15), py(enzymSnelheid(15)), 11, C.teal, '#F2F2EE', 2); metaA(ctx, '15', px(15), py(enzymSnelheid(15)) - 22, 1, C.teal, 'center', 26); ctx.restore(); }
  if (stip22 > 0.01) { ctx.save(); ctx.globalAlpha *= stip22; circ(ctx, px(22), py(enzymSnelheid(22)), 11, C.koraal, '#F2F2EE', 2); metaA(ctx, '22', px(22), py(enzymSnelheid(22)) - 22, 1, C.koraal, 'center', 26); ctx.restore(); }
  ctx.restore(); }
function orgaanKaartje(ctx, x, y, naam, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 100, y - 40, 200, 80, 14); shape(ctx, rgba(C.fill, 0.8), hl > 0.01 ? C.teal : C.line, hl > 0.01 ? 3 : 1.5); regel(ctx, naam, x, y + 12, 1, C.text, 32, 'center', 600); ctx.restore(); }

// =====================================================================================
// GRAADDAGEN: staafjes per dag (temperatuur), drempellijn bij 8 graden; het deel erboven (goud) telt mee.
// =====================================================================================
function graadStaafjes(ctx, X, Y, Hd, temps, o = {}) {
  const { a = 1, toon = temps.length, drempel = 1, bw = 64, gap = 18, max = 25, goud = 1, label = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const py = T => Y + Hd - T / max * Hd, n = temps.length, Wd = n * (bw + gap);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y + Hd); ctx.lineTo(X + Wd, Y + Hd); ctx.stroke();
  for (const T of [0, 8, 15, 22]) { if (T > max) continue; metaText(ctx, String(T), X - 14, py(T) + 9, T === 8 ? C.text : C.text2, 'right', 28); }
  metaText(ctx, 'graden', X, Y - 22, C.text2, 'left', 26);
  for (let i = 0; i < n; i++) { const f = clamp(toon - i, 0, 1); if (f < 0.01) continue; const bx = X + gap / 2 + i * (bw + gap), T = temps[i];
    ctx.save(); ctx.globalAlpha *= f; const tT = Math.min(T, 8) ; roundRect(ctx, bx, py(tT), bw, Y + Hd - py(tT), 4); ctx.fillStyle = '#4A5672'; ctx.fill();
    if (T > 8) { roundRect(ctx, bx, py(T), bw, py(8) - py(T), 4); ctx.fillStyle = rgba(C.goud, 0.35 + 0.5 * goud); ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (label > 0.01 && (i === 0 || (i + 1) % 2 === 0)) metaText(ctx, String(i + 1), bx + bw / 2, Y + Hd + 38, C.text2, 'center', 26);
    ctx.restore(); }
  metaA(ctx, 'dag', X + Wd, Y + Hd + 76, label, C.text2, 'right', 26);
  if (drempel > 0.01) { ctx.save(); ctx.globalAlpha *= drempel; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, py(8)); ctx.lineTo(X + Wd + 20, py(8)); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'drempel', '8 graden', X + Wd + 30, py(8) + 10, 1, 'left'); ctx.restore(); }
  ctx.restore(); return { py, Wd };
}
// kolom die met gouden blokjes volloopt tot 80 graaddagen; vul = aantal graaddagen tot nu, blok = grootte van één blokje
function graadKolom(ctx, x, Y, Hd, vul, blok, o = {}) { const { a = 1, doel = 80, kop = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ppg = Hd / 90, w = 120; roundRect(ctx, x - w / 2, Y, w, Hd, 8); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5);
  const v = Math.min(vul, doel); const nb = Math.floor(v / blok); const rest = v - nb * blok;
  for (let k = 0; k < nb; k++) { const yb = Y + Hd - (k + 1) * blok * ppg; roundRect(ctx, x - w / 2 + 8, yb + 2, w - 16, blok * ppg - 4, 4); ctx.fillStyle = rgba(C.goud, 0.75); ctx.fill(); }
  if (rest > 0.01) { const yb = Y + Hd - v * ppg; roundRect(ctx, x - w / 2 + 8, yb + 2, w - 16, Math.max(2, rest * ppg - 4), 4); ctx.fillStyle = rgba(C.goud, 0.45); ctx.fill(); }
  const yd = Y + Hd - doel * ppg; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2 - 14, yd); ctx.lineTo(x + w / 2 + 14, yd); ctx.stroke();
  if (kop > 0.01) { naamBij(ctx, '80 graaddagen', 'klaar met eten', x + w / 2 + 24, yd + 10, kop, 'left', C.groen); }
  regel(ctx, String(Math.round(v)), x, Y + Hd + 50, 1, C.goud, 40, 'center', 800);
  ctx.restore(); }
// thermometer klein (staand), waarde in graden; voor H4
function thermoKlein(ctx, x, y, s, waarde, o = {}) { kamerThermometer(ctx, x, y, s, Object.assign({ waarde }, o)); }
// weerstation: witte hut op poten met lamellen
function weerhut(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#C9CED6'; for (const sd of [-1, 1]) ctx.fillRect(sd * 40 - 4, -120, 8, 120);
  ctx.beginPath(); ctx.moveTo(-70, -230); ctx.lineTo(0, -270); ctx.lineTo(70, -230); ctx.closePath(); shape(ctx, '#E8ECF0', '#9AA3B2', 1.5);
  roundRect(ctx, -60, -230, 120, 110, 4); shape(ctx, '#F2F2EE', '#9AA3B2', 1.5); ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(-52, -218 + k * 12); ctx.lineTo(52, -212 + k * 12); ctx.stroke(); }
  ctx.restore(); }
// rapport van Kim (document in Schema-look)
function rapport(ctx, x, y, o = {}) { const { a = 1, regelA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 520, 330, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#C9C2B2'; for (let k = 0; k < 3; k++) ctx.fillRect(x + 40, y + 70 + k * 30, 440 - k * 80, 8);
  text(ctx, 'rapport forensisch arts', x + 40, y + 46, fTekst(26, 700), '#3A3A3A', 'left');
  if (regelA > 0.01) { ctx.save(); ctx.globalAlpha *= regelA; text(ctx, 'tijd sinds overlijden:', x + 40, y + 210, fTekst(30, 600), '#3A3A3A', 'left'); text(ctx, 'ongeveer 11 tot 14 dagen', x + 40, y + 262, fTekst(38, 800), '#1A2740', 'left'); ctx.restore(); }
  ctx.restore(); }
// potje met larven (lab)
function potje(ctx, x, voetY, s = 1, o = {}) { const { a = 1, t = 0, larven = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, voetY); ctx.scale(s, s);
  roundRect(ctx, -40, -100, 80, 100, 8); shape(ctx, rgba('#AFC0D0', 0.18), rgba('#C9CED6', 0.9), 2.5); roundRect(ctx, -44, -116, 88, 20, 5); shape(ctx, '#D8DEE4', '#9AA3B2', 2);
  for (let i = 0; i < larven; i++) made(ctx, -14 + i * 14, -24 - i * 14, 34, { t: t + i, rot: 0.3 * (i % 2 ? 1 : -1) });
  ctx.restore(); }
// kweekbakje (lab): ondiep bakje met zaagsel, met pop of vlieg
function kweekbak(ctx, x, y, o = {}) { const { a = 1, pop: pa = 1, vliegA = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 130, y - 70, 260, 70, 10); shape(ctx, rgba('#AFC0D0', 0.15), '#C9CED6', 2.5); ctx.fillStyle = rgba('#C9A35C', 0.45); ctx.fillRect(x - 124, y - 30, 248, 26);
  pop(ctx, x - 40, y - 38, 56, { a: pa, oud: 0.7 }); pop(ctx, x + 30, y - 36, 54, { a: pa, oud: 0.6, rot: 0.3 });
  if (vliegA > 0.01) vlieg(ctx, x + 60, y - 120, 0.42, { a: vliegA, t, rot: 0.3 });
  ctx.restore(); }
