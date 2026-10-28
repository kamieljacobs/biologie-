// =====================================================================================
// lib_bio.js — gedeelde tekenbibliotheek voor de films (prompt v8, C7 + C9 Tekenrecepten)
// Eerst gebruikt: Geslachtsorganen en puberteit 1.1 en Wat zit er in je eten? 1.1 (22 okt 2026).
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease, shape, roundRect, text.
// Elk object: recept (verhoudingen, bron) + bekende fouten in het commentaar erboven.
// Een film kopieert dit bestand naar bron/src/ en plakt het na lib_cast.js in de pagina.
// =====================================================================================

const BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
const _bioPolyCache = {};

// ---------- kleine helpers ----------
function bioPad(ctx, pts, closed = false) { // Catmull-Rom door punten
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]);
  const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}
function bioPunt(pts, u) { // punt + richting op fractie u (0..1) van een polylijn
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function bioDicht(pts, n = 80) { // gladde, gelijk verdeelde punten langs een pad
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  out.push(pts[m - 1]); return out;
}

// =====================================================================================
// HOOFD MET HERSENEN, zijaanzicht (mediane doorsnede), kijkt naar rechts.
// Recept: hoofdlengte ≈ 1,2× hersenlengte; grote hersenen ≈ 2/3 van de schedel; kleine hersenen achter-onder,
// ≈ 1/8 van het volume; hypothalamus onder de thalamus, vóór de hersenstam; hypofyse (± 1 cm, erwt) hangt aan
// een steeltje in het Turkse zadel (botkuiltje) recht boven de neusholte; hersenbalk als C-band boven de thalamus.
// Bron: Gray's Anatomy (mediaan sagittaal), Kenhub 'Hypothalamus'. Bekende fouten: hypofyse los zwevend of
// náást de hersenen; hersenen als ovaal zonder kleine hersenen en hersenstam; hypothalamus achterin.
// Ontwerpcoördinaten: hoofd ± 470 breed × 600 hoog, oorsprong = hypothalamus.
// =====================================================================================
function hoofdHersenen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, hthCol = BIO.klier, hypCol = BIO.klier, huid = BIO.huid, gloed = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  if (a <= 0.01) return { hth: P(0, 0), hyp: P(8, 64), steel: P(4, 34) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hoofd + hals (profiel naar rechts: voorhoofd, neus, lippen, kin)
  const HOOFD = [[-60, 330], [-70, 250], [-120, 190], [-205, 120], [-245, 10], [-240, -110], [-190, -215], [-90, -280], [30, -290], [140, -250], [205, -170],
    [225, -90], [228, -30], [244, 10], [272, 60], [262, 78], [246, 84], [252, 106], [244, 122], [252, 138], [240, 160], [222, 182], [196, 196], [150, 200], [120, 240], [110, 330]];
  ctx.beginPath(); bioPad(ctx, HOOFD, false); ctx.lineTo(-60, 330); ctx.closePath();
  shape(ctx, rgba(huid, 0.22), rgba(huid, 0.85), 2.5);
  // schedel (binnenrand) als dunne botlijn
  ctx.beginPath(); bioPad(ctx, [[-200, 110], [-225, 0], [-218, -110], [-170, -200], [-80, -258], [30, -266], [130, -228], [190, -150], [204, -70], [190, -10], [150, 30]], false);
  ctx.strokeStyle = rgba(BIO.bot, 0.55); ctx.lineWidth = 8; ctx.stroke();
  // Turks zadel (botkuiltje voor de hypofyse) en neusholte erboven/ervoor
  ctx.beginPath(); ctx.moveTo(-30, 70); ctx.quadraticCurveTo(-18, 100, 10, 98); ctx.quadraticCurveTo(36, 96, 44, 66); ctx.strokeStyle = rgba(BIO.bot, 0.75); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[60, 50], [140, 40], [215, 50], [232, 90], [200, 120], [120, 118], [70, 100]], true); ctx.fillStyle = rgba('#0D1420', 0.35); ctx.fill();
  // grote hersenen
  const GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
  ctx.beginPath(); bioPad(ctx, GROOT, true); shape(ctx, rgba(BIO.brein, 0.9), BIO.breinS, 2);
  // windingen (gyri) als zachte groeven, binnen de grote hersenen
  ctx.save(); ctx.beginPath(); bioPad(ctx, GROOT, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = 3;
  const GROEF = [[[-190, -60], [-150, -80], [-170, -130]], [[-120, -210], [-100, -160], [-60, -175], [-40, -130]], [[0, -235], [10, -190], [50, -200], [60, -150]],
    [[110, -215], [100, -170], [130, -150]], [[165, -110], [130, -100], [140, -60]], [[-170, 30], [-140, 0], [-100, 20]], [[-70, -110], [-30, -90], [10, -110], [50, -95], [90, -120]],
    [[-185, -150], [-150, -150]], [[150, -40], [120, -30]]];
  GROEF.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
  ctx.restore();
  // hersenbalk (C-vormige band)
  ctx.beginPath(); bioPad(ctx, [[-120, -10], [-130, -60], [-80, -95], [20, -100], [100, -80], [125, -45], [105, -30], [70, -55], [10, -68], [-70, -62], [-100, -35], [-95, -5]], true);
  shape(ctx, rgba(BIO.wit, 0.9), rgba(BIO.breinS, 0.8), 1.5);
  // thalamus
  ctx.beginPath(); ctx.ellipse(-10, -28, 46, 26, -0.1, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.75), BIO.breinD, 1.5);
  // kleine hersenen met boompje (arbor vitae)
  const KLEIN = [[-110, 60], [-150, 70], [-200, 80], [-210, 130], [-170, 175], [-110, 170], [-80, 130], [-85, 85]];
  ctx.beginPath(); bioPad(ctx, KLEIN, true); shape(ctx, rgba(BIO.brein, 0.95), BIO.breinS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KLEIN, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.wit, 0.8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-88, 112); ctx.lineTo(-130, 118); ctx.stroke(); for (let k = 0; k < 5; k++) { const an = 2.35 + k * 0.38; const bx = -112 - k * 4, by = 116; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.cos(an) * 40, by + Math.sin(an) * 28, bx + Math.cos(an) * 78, by + Math.sin(an) * 52); ctx.stroke(); ctx.lineWidth = 1.6; for (const sd of [-0.3, 0.3]) { ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * 45, by + Math.sin(an) * 30); ctx.lineTo(bx + Math.cos(an + sd) * 74, by + Math.sin(an + sd) * 50); ctx.stroke(); } }
  ctx.restore();
  // hersenstam (middenhersenen, brug, verlengde merg) naar het ruggenmerg
  ctx.beginPath(); bioPad(ctx, [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]], true);
  shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  // hypothalamus (onder de thalamus, vóór de hersenstam) + gloed
  if (hth > 0.01 && gloed) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90); g.addColorStop(0, rgba(hthCol, 0.5 * hth)); g.addColorStop(1, rgba(hthCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); bioPad(ctx, [[-26, -6], [10, -14], [36, -2], [30, 18], [4, 22], [-20, 14]], true); shape(ctx, rgba(hthCol, 0.35 + 0.6 * Math.max(hth, 0.25)), lighten(hthCol, 0.25), 2);
  // steeltje (infundibulum) en hypofyse in het Turkse zadel
  ctx.strokeStyle = lighten(hthCol, 0.15); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(10, 18); ctx.quadraticCurveTo(12, 40, 6, 58); ctx.stroke();
  if (hyp > 0.01 && gloed) { const g = ctx.createRadialGradient(8, 72, 0, 8, 72, 60); g.addColorStop(0, rgba(hypCol, 0.5 * hyp)); g.addColorStop(1, rgba(hypCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(8, 72, 60, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(8, 74, 24, 17, 0, 0, 6.283); shape(ctx, rgba(hypCol, 0.35 + 0.6 * Math.max(hyp, 0.25)), lighten(hypCol, 0.25), 2);
  ctx.strokeStyle = rgba('#0D1420', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4, 58); ctx.lineTo(6, 90); ctx.stroke(); // voor- en achterkwab
  // oog (in profiel) voor herkenning
  ctx.beginPath(); ctx.ellipse(204, 22, 13, 8, 0, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fill(); ctx.beginPath(); ctx.arc(212, 22, 5, 0, 6.283); ctx.fillStyle = '#2A1E18'; ctx.fill();
  ctx.restore();
  return { hth: P(0, 0), hyp: P(8, 74), steel: P(8, 40) };
}

// =====================================================================================
// BLOEDVAT met stroom. Recept: rode bloedcel = ingedeukte schijf, 7–8 µm breed, ± 2 µm dik; van opzij een
// halter, van boven een schijf met lichter midden; ze kantelen in de stroom en vervormen in een haarvat
// (± 5–8 µm, één voor één). Hormonen veel kleiner: stipjes die meestromen. Bekende fouten: bloedcellen als
// bollen; stroom met constante snelheid zonder spreiding.
// pts = pad (ontwerpcoördinaten op het scherm), r = halve binnendiameter.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-r * 0.9, -r * 0.85); ctx.quadraticCurveTo(r * 1.3, 0, -r * 0.9, r * 0.85); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.9, -r * 0.85); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}

// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// ZENUWCEL (neuron) — variant A 'met myeline en een impuls die springt' (27 okt 2026).
// Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die zich als een boom
// vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon vanuit een kegeltje
// (axonheuvel), lang en overal even dik, eindigt in vertakkingen met knopjes (synaps). Myeline (o.myeline):
// lipiderijke schede in worstjes rond het axon, met korte openingen (knopen van Ranvier, 'gap between two
// myelinated regions'); de impuls springt dan van knoop naar knoop (saltatoire geleiding). De impuls is een vlak
// gouden bandje op het axon (C1: geen gloed). Het axon golft maar licht.
// Bron: Kandel, Principles of Neural Science, fig. 2-1; OpenStax A&P 1e h. 12 (begrippen axon, axon hillock,
// myelin, node of Ranvier, saltatory conduction). Bekende fouten: ster met gelijke armen; axon dat dunner
// wordt; geen kern; impuls als gloeiende bol; myeline als doorlopende buis zonder knopen.
// Aanroep zoals voorheen: zenuwcel(ctx, x, y, {a, s, col, naar, seed, kernCol, t, axonDik, puls, pulsCol, takken}); nieuw: myeline.
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6, myeline = false } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 9 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    // myeline: worstjes (Schwann-cellen) met knopen van Ranvier ertussen; impuls springt van knoop naar knoop
    const D = bioDicht(pts, 200); const lenA = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); lenA.push(acc); });
    const at = (u) => { const tgt = u * acc; let j = lenA.findIndex(l => l >= tgt); j = Math.max(1, j); return D[j]; };
    const seg = 46 * s, knoop = 7 * s, nS = Math.max(1, Math.floor((acc - 30 * s) / (seg + knoop)));
    const knopen = []; if (myeline) { for (let k = 0; k < nS; k++) { const u0 = (20 * s + k * (seg + knoop)) / acc, u1 = (20 * s + k * (seg + knoop) + seg) / acc; if (u1 > 0.97) break; knopen.push((u1 * acc + knoop / 2) / acc);
        const S = []; for (let q = 0; q <= 10; q++) S.push(at(lerp(u0, u1, q / 10))); ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.55); ctx.lineWidth = axonDik * s * 2.8; ctx.beginPath(); S.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.8); ctx.lineWidth = axonDik * s * 2.8 - 3; ctx.stroke(); } }
    if (puls >= 0 && puls <= 1) { let u = puls; if (myeline && knopen.length) { const kk = Math.min(knopen.length - 1, Math.floor(puls * knopen.length)); u = knopen[kk]; }
      const L2 = (myeline ? knoop * 1.6 : 26 * s) / acc; ctx.strokeStyle = pulsCol; ctx.lineWidth = axonDik * s * (myeline ? 3.4 : 2.2); ctx.lineCap = 'butt'; ctx.beginPath(); for (let q = 0; q <= 6; q++) { const p = at(clamp(u - L2 / 2 + L2 * q / 6, 0, 1)); q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.lineCap = 'round'; }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
}

// =====================================================================================
// VETCEL en VETWEEFSEL. Recept: witte vetcel 50–150 µm; één grote vetdruppel vult ± 90 % van de cel;
// cytoplasma als dun randje; kern platgedrukt (sikkel) tegen de rand. In weefsel drukken de cellen tegen
// elkaar tot veelhoeken met afgeronde hoeken (Voronoi-patroon, 80–120 % grootteverschil), haarvaten ertussen.
// Bron: Junqueira's Basic Histology, h. 6. Bekende fouten: raster van gelijke rondjes; kern in het midden.
// =====================================================================================
function _bioCellen(key, w, h, d, seed) { // Voronoi-cellen in een rechthoek (gecachet)
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const cs = []; const cols = Math.max(2, Math.round(w / d)), rows = Math.max(2, Math.round(h / (d * 0.87)));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cs.push([(c + 0.5 + (r % 2 ? 0.5 : 0) - 0.5 * (cols > 1 ? 0 : 0)) * w / cols - w / 2 + (hash(seed + r * 31 + c * 7) - 0.5) * d * 0.45, (r + 0.5) * h / rows - h / 2 + (hash(seed + r * 17 + c * 13) - 0.5) * d * 0.4]);
  const polys = cs.map((p, i) => { const pts = []; for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.75;
      cs.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); const proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); });
      best = Math.max(0, best - 3); pts.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts }; });
  _bioPolyCache[key] = polys; return polys;
}
// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// VETCEL (witte vetcel) — variant A 'dunne rand, dikker bij de kern, vet op te slaan' (27 okt 2026).
// Recept (Junqueira's Basic Histology h. 6; digitalhistology.org 'adipocytes'): witte vetcel 50–150 µm; één
// grote vetdruppel drukt kern en cytoplasma tegen de celrand: het cytoplasma is een heel dun randje (± 1–2 %
// van de diameter), alleen rond de kern iets dikker (kom/sikkel); de kern is platgedrukt (sikkel) tegen de
// rand. o.vol 0..1: de druppel groeit (vet opslaan) of krimpt (vet verbruiken); bij een lege cel wordt het
// cytoplasma dikker. In weefsel (pts = veelhoek) blijft de omtrek, de druppel volgt de vorm.
// Bekende fouten: raster van gelijke rondjes; kern in het midden; overal even dikke rand.
// Aanroep zoals voorheen: vetcel(ctx, x, y, r, {a, pts, inhoud}); nieuw: vol (standaard 1).
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null, vol = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  // kernplek: rechtsonder op de omtrek
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.6), rgba(BIO.cyto, 0.95), Math.max(1, rr * 0.012));
  // druppel: iets van de kern af geschoven (dikker cytoplasma bij de kern), elders een dun randje
  const v = clamp(vol, 0, 1); const k = lerp(0.5, 0.925, v), sh = rr * lerp(0.03, 0.055, v);
  const dcx = cx - Math.cos(an) * sh, dcy = cy - Math.sin(an) * sh;
  const druppel = omtrek.map(p => [dcx + (p[0] - cx) * k, dcy + (p[1] - cy) * k]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.88), rgba(BIO.vetS, 0.95), Math.max(1, rr * 0.01));
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(dcx, dcy); ctx.restore(); }
  // kern: platgedrukte sikkel in het dikkere stukje cytoplasma
  const dik = rr * (1 - k) + sh, kr2 = rr - dik / 2; const kx = cx + Math.cos(an) * kr2, ky = cy + Math.sin(an) * kr2;
  ctx.beginPath(); ctx.ellipse(kx, ky, Math.max(4, rr * 0.2), Math.max(1.6, Math.min(dik * 0.38, rr * 0.08)), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1);
  ctx.restore();
}
// Inbouw 28 okt 2026 (Kamiel koos de huidige versie): alleen de bevestigde fout hersteld: het haarvat liep dwars over de
// vetcellen; nu loopt het als één doorlopend vat over de grenzen tussen de cellen (bindweefsel). Bronnen: Digital Histology 'Adipose 1' en 'White
// adipose connective tissue' (vaten in het bindweefsel tussen de vetcellen); Mustansiriyah-college 'Adipose tissue'
// ('septa contain … blood and lymph capillaries'). Rustiger dan variant C: één doorlopend vat, geen losse stukjes. vetcel() en _bioCellen() ongewijzigd.
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  // haarvat in het bindweefsel tússen de cellen: één doorlopend pad dat van rand tot rand over de celgrenzen loopt
  // (van grenspunt naar grenspunt, stapjes kleiner dan een cel), dus nooit dwars over een vetdruppel
  if (haarvat) { const G = []; polys.forEach(pg => pg.pts.forEach(p => G.push([x + p[0], y + p[1]])));
    const yDoel = xx => y + h * 0.1 + Math.sin((xx - x) / w * 5) * h * 0.08, R = d * 0.32;
    let cur = G.filter(p => p[0] < x - w / 2 + d * 0.3).sort((p, q) => Math.abs(p[1] - yDoel(p[0])) - Math.abs(q[1] - yDoel(q[0])))[0]; const P = [[x - w / 2 - 20, cur[1]], cur];
    for (let n = 0; n < 400 && cur[0] < x + w / 2 + 10; n++) { let best = null, bs = -1e9;
      for (const p of G) { const dx = p[0] - cur[0], dy = p[1] - cur[1], dd = Math.hypot(dx, dy); if (dd < d * 0.04 || dd > R || dx < d * 0.02) continue;
        const sc = dx - 0.9 * Math.abs(p[1] - yDoel(p[0])) * (dx / dd); if (sc > bs) { bs = sc; best = p; } }
      if (!best) break; P.push(best); cur = best; }
    P.push([x + w / 2 + 20, cur[1]]);
    bloedvat(ctx, P, Math.max(2.5, Math.min(5, d * 0.045)), t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' }); }
  ctx.restore();
  ctx.restore();
}

// =====================================================================================
// ZAADCEL. Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat (peddel); acrosoomkap over 40–70 % van de
// kop; middenstuk ± 5 µm, iets dikker; staart ± 45 µm → hele cel ± 55 µm, staart ± 10× de koplengte. Een golf
// loopt van kop naar staart (golflengte ± 0,4 staart, uitslag groeit naar het eind), de kop draait om zijn as
// (wordt afwisselend smal en breed). Slag ± 10–15 per seconde; in films vertraagd. Bron: WHO-laborhandboek
// sperma 2021, fig. 2.x. Bekende fouten: kikkervisje met korte staart; staart die alleen achteraan zwaait.
// Oorsprong = midden van de kop; ang = zwemrichting.
// Herstel 28 okt 2026 (huidige versie, keuze 'oud'): de acrosoomkap zat al vooraan, maar bedekte ± 80 % van de kop en las
// daardoor als 'de hele kop'. Nu alleen de voorste ± 60 % (acrosoom = kapje over het voorste deel van de kop: MeSH/DeCS
// 'covering the anterior portion of sperm head'; Wikipedia 'over the anterior (front) half of the head'), zodat de lichte
// achterkant van de kop (kern) ernaast zichtbaar blijft. Verder ongewijzigd.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s; // px per µm
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = 4.6 * U, kopB = 3 * U * (0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)));
  const midL = 5 * U, staartL = 45 * U, golf = 0.42 * staartL;
  const ph = t * slag * 6.283;
  const pts = []; for (let i = 0; i <= 60; i++) { const d = (i / 60) * (midL + staartL); const amp = (0.4 + 3.2 * Math.pow(d / (midL + staartL), 1.2)) * U;
    pts.push([-kopL * 0.5 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  // staart (eind dunner), middenstuk dikker
  for (let i = 1; i < pts.length; i++) { const d = i / 60 * (midL + staartL); ctx.strokeStyle = col; ctx.lineWidth = d < midL ? 1.25 * U : Math.max(0.6, lerp(0.75 * U, 0.25 * U, (d - midL) / staartL));
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }
  // kop (peddel) + acrosoomkap
  ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.24, 0, kopL * 0.36, kopB * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.65); ctx.fill(); ctx.restore();
  ctx.restore();
}

// =====================================================================================
// EICEL (variant: stralende zuilcellen). Recept: eicel ± 120 µm, kern iets uit het midden; zona pellucida = dunne
// glazige ring (± 1/10 van de straal); corona radiata = binnenste granulosalaag die radiair uitgerekt tegen de zona
// staat (zuilcellen, 'stralenkrans': vandaar de naam), daarbuiten losser liggende cumuluscellen die na de eisprong
// uiteenvallen. Cellen sluiten zonder gaten aan (mozaïek), in de follikelkleur. Follikelrijping zie follikel().
// Bron: Atlas of Plant and Animal Histology (Megías, Univ. Vigo) 'ovarian follicles'; Junqueira h. 22.
// Bekende fouten: krans als grote losse bollen (bloem/tandwiel); zona als dikke grijze band.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const korr = '#E2B88E', korrR = '#B88A60', kernK = '#9C6A4A';
  const zr = r * 1.1;
  if (krans) {
    // losse buitenste cumuluscellen
    if (r > 10) for (let k = 0; k < 26; k++) { const an = hash(k * 5 + 2) * 6.283, rr = r * (1.55 + 0.25 * hash(k * 5 + 3)), cr = r * 0.085;
      ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr, 0, 6.283); shape(ctx, rgba(korr, 0.55), rgba(korrR, 0.6), 0.8); }
    // zuilcellen: wiggen tussen de zona en een golvende buitenrand
    const n = r < 12 ? 14 : 30, gr = [];
    for (let k = 0; k <= n; k++) gr.push((k + 0.35 * (hash(k * 7 + 1) - 0.5)) / n * 6.283);
    gr[n] = gr[0] + 6.283;
    for (let k = 0; k < n; k++) { const a0 = gr[k], a1 = gr[k + 1], ro = r * (1.42 + 0.08 * hash(k * 3 + 9)), am = (a0 + a1) / 2;
      ctx.beginPath(); ctx.moveTo(x + Math.cos(a0) * zr, y + Math.sin(a0) * zr); ctx.arc(x, y, zr, a0, a1);
      ctx.lineTo(x + Math.cos(a1) * ro * 0.98, y + Math.sin(a1) * ro * 0.98); ctx.quadraticCurveTo(x + Math.cos(am) * ro * 1.04, y + Math.sin(am) * ro * 1.04, x + Math.cos(a0) * ro * 0.98, y + Math.sin(a0) * ro * 0.98); ctx.closePath();
      shape(ctx, rgba(korr, 0.88), rgba(korrR, 0.85), r > 30 ? 1.2 : 0.6);
      if (r > 20) { const kr = r * (1.3 + 0.06 * hash(k)); ctx.beginPath(); ctx.ellipse(x + Math.cos(am) * kr, y + Math.sin(am) * kr, r * 0.05, r * 0.028, am, 0, 6.283); ctx.fillStyle = rgba(kernK, 0.75); ctx.fill(); } }
  }
  ctx.beginPath(); ctx.arc(x, y, zr, 0, 6.283); ctx.fillStyle = rgba('#F4F6F2', 0.8); ctx.fill(); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.97), '#D9C49A', 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.28, 0, 6.283); shape(ctx, rgba(C.paars, 0.75), r > 30 ? rgba('#A392D6', 0.9) : null, 1);
  if (r > 30) { ctx.beginPath(); ctx.arc(x + r * 0.24, y - r * 0.15, r * 0.07, 0, 6.283); ctx.fillStyle = rgba('#3E2E66', 0.7); ctx.fill(); }
  ctx.restore();
}
function follikel(ctx, x, y, f, o = {}) { // f: 0 primordiaal → 1 Graaf; schaalgrootte via o.R (straal bij f=1)
  const { a = 1, R = 120, scheur = 0, seed = 0, eicel = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = lerp(o.klein ? 7.5 : 9, R, Math.pow(f, 1.6)); const ei = lerp(4, Math.max(10, R * 0.12), Math.min(1, f * 2.2));
  // theca (buitenste ring) vanaf secundair
  if (f > 0.3) { ctx.beginPath(); ctx.arc(x, y, r + 6 + 4 * f, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.25 * f), rgba('#C98A6A', 0.5 * f), 1.5); }
  // granulosacellen
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.75), rgba('#C9966A', 0.9), 1.2);
  // celkorrels in de granulosa (één laag plat → meerdere lagen)
  const nRing = o.klein ? 6 : Math.round(lerp(8, 34, Math.min(1, f * 1.4))); const lagen = f < 0.15 ? 1 : f < 0.4 ? 2 : 3;
  for (let L = 0; L < lagen; L++) for (let k = 0; k < nRing; k++) { const an = k / nRing * 6.283 + L * 0.3 + seed; const rr = r * (0.88 - L * 0.1); const cr = Math.max(1.4, r * 0.06);
    ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (f < 0.1 ? 1.6 : 1), cr * (f < 0.1 ? 0.6 : 1), an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.55); ctx.fill(); }
  // antrum (vochtholte) vanaf f > 0.45, eicel op de cumulus aan één kant
  let ex = x, ey = y;
  if (f > 0.45) { const af = clamp((f - 0.45) / 0.55, 0, 1); const ar = r * lerp(0.2, 0.8, af);
    ctx.beginPath(); ctx.arc(x + r * 0.08 * af, y - r * 0.05 * af, ar, 0, 6.283); shape(ctx, rgba('#E9F0F4', 0.55), rgba('#BFD0DA', 0.7), 1);
    ex = x - r * 0.55 * af; ey = y + r * 0.35 * af;
    ctx.beginPath(); ctx.arc(ex, ey, ei * 2.2, 0, 6.283); ctx.fillStyle = rgba('#E2B88E', 0.85); ctx.fill(); }
  if (eicel && scheur < 0.5) eicelEcht(ctx, ex, ey, ei, 1, f > 0.6);
  ctx.restore(); return [ex, ey, ei];
}
// =====================================================================================
// EIERSTOK in doorsnede (variant: de cyclus rond de schors, zoals de klassieke leerboekplaat). Recept: amandel
// ± 3 × 2 × 1 cm; merg in het midden met vaten vanaf de hilus (onder); in de schors liggen alle stadia met de klok
// mee: primordiale follikels (groepje, één laag platte cellen) → primair (kubisch, zona) → secundair (meer lagen,
// theca) → holte (antrum) → Graafse follikel die uitpuilt → eisprong (wand scheurt, eicel met stralenkrans en
// vocht naar buiten) → geel lichaam op dezelfde plek → wit lichaam (litteken). In het echt gebeurt dat niet
// tegelijk; het beeld is een samenvatting. o.groei / o.eis / o.geel zetten de gouden focus op dat stadium
// (groei 0..1 schuift van primordiaal naar Graaf). Bron: Junqueira h. 22; Megías, Atlas of Plant and Animal
// Histology (Univ. Vigo) 'ovarian follicles'. Bekende fouten: stadia in het merg; eisprong naast de eierstok
// zonder scheur; geel lichaam elders dan de eisprong.
// =====================================================================================
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 60, groei = 0, eis = 0, geel = 0, t = 0, focus = true } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const R = ry * 0.36; // Graafse follikel
  const st = [ // [hoek, stadium-f, schaal]
    [-2.85, 0, 1], [-2.2, 0.2, 1], [-1.55, 0.4, 1], [-0.85, 0.65, 1], [-0.1, 1, 1], [0.8, 'eis', 1], [1.85, 'geel', 1], [2.75, 'wit', 1]];
  const randR = th => Math.hypot(Math.cos(th) * rx, Math.sin(th) * ry);
  const graafA = st[4][0], bult = R * 0.5;
  const omtrek = Array.from({ length: 80 }, (_, k) => { const an = -Math.PI + k / 80 * 6.283; let w = 1 + 0.025 * Math.sin(an * 3 + 1);
    const d = Math.abs(an - graafA); const b = d < 0.45 ? bult * Math.pow(Math.cos(d / 0.45 * Math.PI / 2), 2) : 0;
    const d2 = Math.abs(an - st[5][0]); const kuil = d2 < 0.25 ? -R * 0.25 * Math.pow(Math.cos(d2 / 0.25 * Math.PI / 2), 2) : 0;
    const rr = randR(an) * w + b + kuil; return [x + Math.cos(an) * rr, y + Math.sin(an) * rr * (ry / randR(an)) * (randR(an) / ry)]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.3), '#D9A894', Math.max(1.5, ry * 0.015));
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.12, rx * 0.42, ry * 0.36, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.4); ctx.fill();
  const vs = Math.max(1, ry / 160); ctx.lineCap = 'round';
  [[BIO.bloed, -0.04], [BIO.ader, 0.04]].forEach(([c, dx]) => { ctx.strokeStyle = rgba(c, 0.75); ctx.lineWidth = 4 * vs; ctx.beginPath(); bioPad(ctx, [[x + dx * rx, y + ry], [x + dx * rx, y + ry * 0.45], [x + dx * rx - rx * 0.2, y + ry * 0.05]], false); ctx.stroke();
    ctx.lineWidth = 2.5 * vs; ctx.beginPath(); bioPad(ctx, [[x + dx * rx, y + ry * 0.45], [x + rx * 0.22 + dx * rx, y + ry * 0.1]], false); ctx.stroke(); });
  ctx.restore();
  // een paar losse primordiale follikels door de hele schors
  const pr = Math.max(3, Math.min(6, ry * 0.03));
  for (let i = 0; i < Math.min(n, 40); i++) { const an = -Math.PI + hash(i * 3 + 1) * 6.283, rr = lerp(0.8, 0.92, hash(i * 3 + 2)); if (st.some(s => Math.abs(s[0] - an) < 0.28)) continue;
    const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry * rr; ctx.beginPath(); ctx.arc(px, py, pr, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.7), rgba('#C9966A', 0.8), 0.8); }
  // focusstadium
  const fStad = geel > 0.5 ? 6 : eis > 0.3 ? 5 : Math.round(clamp(groei, 0, 1) * 4);
  let uit = null;
  st.forEach(([an, f], i) => {
    const fr = typeof f === 'number' ? lerp(R * 0.12, R, Math.pow(f, 1.4)) : R * 0.8;
    const dd = i === 4 ? randR(an) - fr * 0.55 : f === 'eis' ? randR(an) - fr * 0.55 : randR(an) * 0.86 - fr * 0.9;
    const px = x + Math.cos(an) * dd * rx / randR(an) * (randR(an) / rx), py = y + Math.sin(an) * dd * ry / randR(an) * (randR(an) / ry);
    const qx = x + Math.cos(an) * dd, qy = y + Math.sin(an) * dd;
    if (i === 0) { for (let k = 0; k < 6; k++) { const aa = k * 1.05; ctx.beginPath(); ctx.arc(qx + Math.cos(aa) * pr * 2.4, qy + Math.sin(aa) * pr * 2.4, pr, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.8), rgba('#C9966A', 0.9), 0.8); ctx.beginPath(); ctx.arc(qx + Math.cos(aa) * pr * 2.4, qy + Math.sin(aa) * pr * 2.4, pr * 0.5, 0, 6.283); ctx.fillStyle = '#F2E6C8'; ctx.fill(); } }
    else if (typeof f === 'number') { const p = follikel(ctx, qx, qy, f, { R, seed: i }); if (i === 4) uit = { x: qx, y: qy, ei: p }; }
    else if (f === 'eis') { // gescheurde, ingezakte follikel met open stigma; eicel + vocht buiten
      ctx.save(); ctx.beginPath(); for (let k = 0; k <= 30; k++) { const th = k / 30 * 6.283; const r2 = fr * (0.8 + 0.12 * Math.sin(th * 7)); k ? ctx.lineTo(qx + Math.cos(th) * r2, qy + Math.sin(th) * r2) : ctx.moveTo(qx + Math.cos(th) * r2, qy + Math.sin(th) * r2); } ctx.closePath();
      shape(ctx, rgba('#E2B88E', 0.8), '#C9966A', 1.2); ctx.beginPath(); ctx.arc(qx, qy, fr * 0.5, 0, 6.283); ctx.fillStyle = rgba('#7E3236', 0.6); ctx.fill(); ctx.restore();
      const ux = Math.cos(an), uy = Math.sin(an), ox = x + ux * (randR(an) + fr * 1.1), oy = y + uy * (randR(an) + fr * 1.1);
      ctx.save(); ctx.fillStyle = rgba('#DCE8EE', 0.25); ctx.beginPath(); ctx.ellipse(ox, oy, fr * 0.8, fr * 0.55, an, 0, 6.283); ctx.fill(); ctx.restore();
      ctx.strokeStyle = rgba('#DCE8EE', 0.5); ctx.lineWidth = Math.max(1, fr * 0.06); ctx.beginPath(); ctx.moveTo(qx + ux * fr * 0.6, qy + uy * fr * 0.6); ctx.lineTo(ox - ux * fr * 0.4, oy - uy * fr * 0.4); ctx.stroke();
      eicelEcht(ctx, ox, oy, Math.max(4, R * 0.13), 1, true); }
    else if (f === 'geel') { if (typeof geelLichaam === 'function') geelLichaam(ctx, qx, qy, fr * 0.95, { leef: 1, t }); }
    else { if (typeof geelLichaam === 'function') geelLichaam(ctx, qx, qy, fr * 0.8, { leef: 0, t }); }
    if (focus && i === fStad && (groei > 0 || eis > 0 || geel > 0)) { ctx.beginPath(); ctx.arc(qx, qy, fr * 1.25 + 6, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, ry * 0.012); ctx.stroke(); }
  });
  ctx.restore(); return uit;
}

// =====================================================================================
// BAARMOEDERWAND met slijmvlies (uitsnede, holte boven). Recept: spierlaag (myometrium) 1–2 cm, glad spierweefsel;
// slijmvlies 1 mm na de menstruatie → 5–7 mm (soms tot 10) rond de eisprong en daarna; basale laag blijft, de
// functionele laag erboven groeit en laat los. Klieren: rechte buisjes die later kronkelen (zaagtand); spiraal-
// slagaders lopen kronkelend omhoog. Bij de menstruatie knijpen de spiraalslagaders dicht, de functionele laag
// laat in stukjes los met bloed. Bron: Junqueira h. 22; Guyton h. 82. Bekende fouten: slijmvlies als vlak blokje;
// eicel in het menstruatiebloed.
// dikte 0..1 (0,15 ≈ 1 mm, 1 ≈ 7 mm), los 0..1 (afstoten).
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const spierH = h * 0.42, basaal = h * 0.06, fmax = h * 0.5; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH; // ys = top spier, yf = oppervlak
  const golf = (xx, amp, k) => amp * Math.sin(xx / w * 6.283 * k + seed);
  // spierlaag: spoelvormige vezels in banen
  roundRect(ctx, x - w / 2, ys, w, spierH, 10); shape(ctx, rgba(BIO.spier, 0.55), rgba(BIO.spierL, 0.6), 1.5);
  ctx.save(); roundRect(ctx, x - w / 2, ys, w, spierH, 10); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.55); ctx.lineWidth = 2;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 14; c++) { const cx = x - w / 2 + (c + (r % 2) * 0.5) * w / 13, cy = ys + 14 + r * (spierH - 20) / 6; ctx.beginPath(); ctx.ellipse(cx, cy, w / 32, 3.2, 0.08 * Math.sin(c + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // basale laag
  ctx.fillStyle = rgba(BIO.slijmD, 0.75); ctx.fillRect(x - w / 2, yba, w, basaal);
  // functionele laag (met golvend oppervlak), losraken = brokken die omhoog drijven
  const opp = []; for (let i = 0; i <= 40; i++) { const xx = x - w / 2 + i / 40 * w; opp.push([xx, yf + golf(xx, 6 * dikte, 3)]); }
  const vastFrac = 1 - clamp(los, 0, 1);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, yba); for (const p of opp) ctx.lineTo(p[0], lerp(yba, p[1], vastFrac)); ctx.lineTo(x + w / 2, yba); ctx.closePath();
  ctx.fillStyle = rgba(BIO.slijm, 0.7); ctx.fill(); ctx.clip();
  // klieren: rechte buisjes → kronkelend
  const nk = 9; for (let k = 0; k < nk; k++) { const kx = x - w / 2 + (k + 0.5) * w / nk; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const u = i / 20; const yy = lerp(yba, yf - 10, u); const zx = Math.sin(u * 14 + k) * 7 * kronkel * dikte; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke();
    ctx.strokeStyle = rgba(BIO.slijmD, 0.6); ctx.lineWidth = 2; ctx.stroke(); }
  // spiraalslagaders
  for (let k = 0; k < 5; k++) { const kx = x - w / 2 + (k + 1) * w / 6 + 20; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - los * 0.5)); ctx.lineWidth = 3.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys + 10, yf + 10, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
  ctx.restore();
  // oppervlakte-epitheel
  ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 3; ctx.beginPath(); opp.forEach((p, i) => { const yy = lerp(yba, p[1], vastFrac); i ? ctx.lineTo(p[0], yy) : ctx.moveTo(p[0], yy); }); ctx.stroke();
  // afstoten: brokken functionele laag + bloed drijven de holte in (omhoog)
  if (los > 0.01) { for (let k = 0; k < 12; k++) { const bx = x - w / 2 + (k + 0.5) * w / 12 + (hash(k + 5) - 0.5) * 30; const lift = los * (40 + 80 * hash(k + 9)); const bw = w / 14, bh = fH * 0.6 * (0.6 + 0.4 * hash(k));
      ctx.save(); ctx.globalAlpha *= clamp(1.3 - los, 0, 1); ctx.beginPath(); ctx.ellipse(bx, yba - bh / 2 - lift, bw / 2, bh / 2, (hash(k) - 0.5) * 0.6, 0, 6.283); shape(ctx, rgba(BIO.slijm, 0.75), rgba(BIO.bloed, 0.7), 1.5); ctx.restore();
      ctx.beginPath(); ctx.arc(bx + 12, yba - lift * 0.7, 5, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.8 * los); ctx.fill(); } }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}

// =====================================================================================
// MOLECULEN (voeding). Kleurtaal van de reeks: koolhydraat V.kh (zeshoek), eiwit V.ew (kraal), vet V.vt.
// ZETMEEL: amylose = keten van glucoseringen die een spiraal vormt, ± 6 glucose per winding (helix, linksdraaiend
// gezien langs de as, in 2D: een golf met diepte; ringen achteraan kleiner en donkerder). Bij vertering wikkelt
// de keten zich af en knippen enzymen hem in losse glucose. Bron: Berg, Biochemistry h. 11. Bekende fout: een rechte
// rij zeshoeken (dat is eerder cellulose).
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; /* spreid: hoe ver de losse glucose uit elkaar gaat (1 = 3,7 r per stuk) */ ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: (p[2] + pos[i - 1][2]) / 2 - 0.01, lijn: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { const lf = 1 - clamp(los / 0.6, 0, 1);
    if (it.lijn) { if (lf <= 0.01) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.save(); ctx.globalAlpha *= lf * (0.55 + 0.45 * (it.z + 1) / 2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); return; }
    const p = pos[it.ring]; const k = 0.66 + 0.4 * (p[2] + 1) / 2; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * (p[2] + 1) / 2; hexagon(ctx, p[0], p[1], r * k, p[2] < -0.3 ? lighten(fill, -0.18) : fill, lighten(fill, 0.35)); ctx.restore(); });
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
// CELLULOSE — definitief (A, inbouw 28 okt 2026: zonder vezelrand, omklappen zichtbaar aan de CH2OH-zijtak).
// Recept (biotopics.co.uk 'The cellulose molecule in 3-D'; Pearson Biochemistry 'Cellulose: structure, properties
// and biological function'; WOU Chemistry 'Carbohydrates part 4'): cellulose = rechte, onvertakte ketens van glucose
// met β-1,4-bindingen; elke tweede glucose ligt omgekeerd (180° gedraaid t.o.v. de buur). Dat zie je aan de
// CH2OH-zijtak (kort steeltje met bolletje, zelfde oker): afwisselend boven en onder de keten, en aan het
// zuurstofbruggetje (teal) dat afwisselend boven/onder ligt. De ketens liggen evenwijdig en worden door
// waterstofbruggen (teal stippellijntjes) bij elkaar gehouden tot een vezeltje (microfibril); er zit géén omhulsel
// om de vezel (Kamiel 28 okt: groene rand weg). Hier een doorsnede van 2–3 ketens; een echte microfibril heeft er
// veel meer naast elkaar. Glucose blijft oker (V.kh, zelfde molecuul als in zetmeel, C1). Een enzym voor zetmeel
// (amylase) past niet op de β-binding: o.glijd 0..1 laat een enzym over de vezel glijden en eraf schuiven.
// Bekende fouten: losse groene bolletjes; groene glucose; geen waterstofbruggen; ketens die spiralen; een
// vak/omhulsel om de vezel.
// Aanroep zoals voorheen: celluloseBundel(ctx, x, y, n, r, {a, ketens, angle}); nieuw: glijd, t. (col wordt niet
// meer gebruikt: er is geen vezelrand.) Geeft ringposities terug: [[x, y], ...] per keten achter elkaar.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, glijd = -1, t = 0 } = o;
  const gl = (typeof V !== 'undefined' ? V.kh : C.oker); const dy = r * 2.9, dx = r * 2.2; const cs = Math.cos(angle), sn = Math.sin(angle);
  const ringen = []; for (let k = 0; k < ketens; k++) for (let i = 0; i < n; i++) { const px = (k % 2) * r * 0.5 + i * dx, py = k * dy; ringen.push([x + px * cs - py * sn, y + px * sn + py * cs]); }
  if (a <= 0.01) return ringen; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineCap = 'round';
  const L = (n - 1) * dx + r * 0.5; const licht = _mixHex(gl, '#FFFFFF', 0.35), lijn = Math.max(1.2, r * 0.13);
  // CH2OH-zijtak: ring i wijst omhoog (i even) of omlaag (i oneven); iets naar rechts van het midden
  const zij = (i) => (i % 2 ? 1 : -1);
  // waterstofbruggen tussen de ketens: kort en recht, van een zijtak die naar de buurketen wijst naar die buurketen
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = Math.max(1, r * 0.13); ctx.setLineDash([r * 0.22, r * 0.2]);
  for (let k = 0; k < ketens - 1; k++) { const o0 = (k % 2) * r * 0.5, o1 = ((k + 1) % 2) * r * 0.5;
    for (let i = 0; i < n; i++) { if (i % 2 === 1) { const sx = o0 + i * dx + r * 0.25; ctx.beginPath(); ctx.moveTo(sx, k * dy + r * 1.35); ctx.lineTo(sx, (k + 1) * dy - r * 0.72); ctx.stroke(); }
      else { const sx = o1 + i * dx + r * 0.25; ctx.beginPath(); ctx.moveTo(sx, (k + 1) * dy - r * 1.35); ctx.lineTo(sx, k * dy + r * 0.72); ctx.stroke(); } } }
  ctx.setLineDash([]);
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.5; const yy = k * dy;
    // β-1,4-bruggetjes: het zuurstof (teal) ligt afwisselend boven en onder de keten
    for (let i = 0; i < n - 1; i++) { const up = i % 2 ? -1 : 1; ctx.strokeStyle = licht; ctx.lineWidth = Math.max(1.5, r * 0.18); ctx.beginPath(); ctx.moveTo(off + i * dx + r * 0.7, yy); ctx.lineTo(off + i * dx + dx / 2, yy + up * r * 0.35); ctx.lineTo(off + (i + 1) * dx - r * 0.7, yy); ctx.stroke();
      ctx.beginPath(); ctx.arc(off + i * dx + dx / 2, yy + up * r * 0.35, Math.max(1.2, r * 0.16), 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
    // glucoseringen met de CH2OH-zijtak die mee omklapt
    for (let i = 0; i < n; i++) { const cx = off + i * dx, z = zij(i); const sx = cx + r * 0.25, s0 = yy + z * r * 0.62, s1 = yy + z * r * 1.12;
      ctx.strokeStyle = licht; ctx.lineWidth = lijn; ctx.beginPath(); ctx.moveTo(sx, s0); ctx.lineTo(sx, s1); ctx.stroke();
      hexagon(ctx, cx, yy, r * 0.78, rgba(gl, 0.9), licht, Math.max(1, r * 0.08), i % 2 ? Math.PI : 0);
      ctx.beginPath(); ctx.arc(sx, s1, Math.max(1.1, r * 0.17), 0, 6.283); ctx.fillStyle = gl; ctx.fill(); ctx.strokeStyle = licht; ctx.lineWidth = Math.max(0.8, r * 0.06); ctx.stroke(); } }
  // enzym dat niet past en afglijdt
  if (glijd >= 0 && typeof enzymKluwen === 'function') { const g = clamp(glijd, 0, 1); const ex = lerp(-r * 1.0, L * 0.55, ease(Math.min(1, g * 1.4))), ey = -r * 2.6 - ease(clamp((g - 0.55) / 0.45, 0, 1)) * r * 4; enzymKluwen(ctx, ex, ey, r * 1.9, { an: Math.PI / 2 + 0.2 * Math.sin(t * 2), a: 1 - clamp((g - 0.8) / 0.2, 0, 1) * 0.6 }); }
  ctx.restore(); return ringen;
}
// EIWIT dat vouwt. Recept: keten van aminozuren (kralen) vouwt in stukken: eerst α-helices (strakke spiraal,
// 3,6 aminozuren per winding) en β-strengen (zigzag, naast elkaar met waterstofbruggen), daarna de hele keten
// tot een compacte kluwen (tertiaire structuur). Vouwen is een morph, geen wissel. Bekende fout: een bol.
function _eiwitVorm(n, s) { // doelvorm: helix – lus – streng ⇄ streng (haarspeld) – lus – helix – staart; ± 320 × 200 bij s=1
  // Eén doorlopende gids; elk stuk heeft een soort. Helix: kleine as-stap + zijwaartse golf (3,6 per winding); streng: gestrekt.
  const G = [['h', [[-150, -86], [-84, -10]]], ['l', [[-84, -10], [-70, 34], [-30, 62]]], ['s', [[-30, 62], [100, 62]]], ['l', [[100, 62], [136, 40], [100, 16]]],
    ['s', [[100, 16], [-10, 16]]], ['l', [[-10, 16], [-44, -10], [-20, -50]]], ['h', [[-20, -50], [110, -86]]], ['l', [[110, -86], [156, -64], [164, -20], [150, 20]]]];
  const dense = []; G.forEach(([tp, pts]) => bioDicht(pts, 60).forEach(q => dense.push([q[0], q[1], tp])));
  const out = []; let acc = 1e9, hp = 0, prev = null;
  for (let i = 1; i < dense.length && out.length < n; i++) { const a2 = dense[i - 1], b = dense[i]; acc += Math.hypot(b[0] - a2[0], b[1] - a2[1]);
    const stap = b[2] === 'h' ? 9 : 26; if (acc < stap) continue; acc = 0; const an = Math.atan2(b[1] - a2[1], b[0] - a2[0]);
    let w = 0, z = 0, ax = 0; if (b[2] === 'h') { const ph = hp / 3.6 * 6.283; w = Math.sin(ph) * 20; z = Math.cos(ph); ax = z * 12; hp++; } else hp = 0;
    out.push([(b[0] + Math.cos(an) * ax - Math.sin(an) * w) * s, (b[1] + Math.sin(an) * ax + Math.cos(an) * w) * s, z]); }
  while (out.length < n) { const q = out[out.length - 1]; out.push([q[0] - 18 * s, q[1] + 18 * s, 0]); }
  return out;
}
// DEFINITIEF (inbouw 28 okt 2026): variant B, ongewijzigd overgenomen. Recept hieronder.
// EIWIT dat vouwt — variant B 'van keten via helices tot enzym' (27 okt 2026).
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): vouwen gaat in twee stappen. Eerst vormen stukjes van
// de keten hun secundaire structuur (α-helix: strakke spiraal, ± 3,6 aminozuren per winding, kralen ± 2,3×
// dichter op elkaar dan in een gestrekte streng; β-strengen gestrekt met een lichte zigzag), terwijl de keten
// nog uitgestrekt ligt (fold 0 → 0,5). Daarna klapt de hele keten in tot een compacte kluwen (tertiaire
// structuur, fold 0,5 → 1); de helices blijven spiralen binnen de kluwen, twee strengen liggen naast elkaar
// met waterstofbruggen (haarspeld), en de omtrek is die van het enzym met een holte (actieve plek, goud), zodat
// keten → kluwen → enzym één morph is (zelfde silhouet als enzymKluwen).
// Kleur: standaard V.ew-kralen per soort (`kinds`); o.kleur = 'eiwit' geeft enzymtinten in één kraalvorm.
// Bekende fouten: een bol; vouwen als wissel; een open warboel als eindvorm.
// Aanroep zoals voorheen: eiwitVouw(ctx, cx, cy, s, fold, kinds, {a, r, start, ess, t}); nieuw: kleur, seed.
// Geeft de kraalposities terug ([x, y, z]) en zet .plek (holte) op de array.
function _eiwitB_soort(n) { // h = helix, s = streng, l = lus
  const k = Array(n).fill('l'); const zet = (a, b, c) => { for (let i = Math.round(a * n); i < Math.min(n, Math.round(b * n)); i++) k[i] = c; };
  zet(0.04, 0.3, 'h'); zet(0.36, 0.5, 's'); zet(0.55, 0.69, 's'); zet(0.74, 0.96, 'h'); return k;
}
function _eiwitB_pad(pts, stappen) { // punten op een polylijn op cumulatieve afstanden
  const len = [0]; for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  let j = 1; return stappen.map(d => { while (j < pts.length - 1 && len[j] < d) j++; const f = clamp((d - len[j - 1]) / ((len[j] - len[j - 1]) || 1), 0, 1); const an = Math.atan2(pts[j][1] - pts[j - 1][1], pts[j][0] - pts[j - 1][0]); return [lerp(pts[j - 1][0], pts[j][0], f), lerp(pts[j - 1][1], pts[j][1], f), an]; });
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0, kleur = null, seed = 4 } = o; if (a <= 0.01) return; const n = kinds.length;
  const soort = _eiwitB_soort(n); const st = r * 2.1;
  const stap = soort.map(k => k === 'h' ? st * 0.42 : st * 0.95); const cum = [0]; for (let i = 1; i < n; i++) cum.push(cum[i - 1] + (stap[i] + stap[i - 1]) / 2);
  const L = cum[n - 1];
  // 1. secundair, uitgestrekt
  const sec = cum.map((d, i) => { let x = (d - L / 2) * 0.6, y = Math.sin(d / L * Math.PI * 2) * r * 3.2, z = 0; if (soort[i] === 'h') { const ph = i / 3.6 * 6.283; y += Math.sin(ph) * r * 1.4; x += Math.cos(ph) * r * 0.75; z = Math.cos(ph); } else if (soort[i] === 's') y += (i % 2 ? 1 : -1) * r * 0.25; return [x, y, z]; });
  // 2. kluwen: serpentine door het enzymsilhouet (holte rechts), helix als spiraal rond die lijn
  const Rv = u => { let rr = 1 + 0.07 * Math.sin(u * 5 + seed) + 0.04 * Math.sin(u * 9 + seed * 2); const d = Math.abs(((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI); if (d < 0.5) rr *= 1 - 0.5 * Math.pow(0.5 + 0.5 * Math.cos(Math.PI * d / 0.5), 0.7); return rr; };
  const ring = []; [[0.8, 1], [0.52, -1], [0.25, 1]].forEach(([k, dir], ri) => { for (let i = 0; i <= 48; i++) { const u = dir > 0 ? lerp(0.6 + ri * 0.2, 5.68 - ri * 0.1, i / 48) : lerp(5.68 - ri * 0.1, 0.6 + ri * 0.2, i / 48); ring.push([Math.cos(u) * Rv(u) * k, Math.sin(u) * Rv(u) * k]); } });
  let L1 = 0; for (let i = 1; i < ring.length; i++) L1 += Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]);
  const R0 = L / L1 * 0.97; const ringS = ring.map(p => [p[0] * R0, p[1] * R0]);
  const op = _eiwitB_pad(ringS, cum);
  const ter = op.map((p, i) => { if (soort[i] !== 'h') return [p[0], p[1], 0]; const ph = i / 3.6 * 6.283, nx = -Math.sin(p[2]), ny = Math.cos(p[2]); return [p[0] + nx * Math.sin(ph) * r * 1.1 + Math.cos(p[2]) * Math.cos(ph) * r * 0.55, p[1] + ny * Math.sin(ph) * r * 1.1 + Math.sin(p[2]) * Math.cos(ph) * r * 0.55, Math.cos(ph)]; });
  const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const f1 = ease(clamp(fold / 0.5, 0, 1)), f2 = ease(clamp((fold - 0.5) / 0.5, 0, 1));
  const pts = begin.map((b, i) => { const w = wander(i + 900, t, r * 0.12, 0.6); const x1 = lerp(b[0], sec[i][0], f1), y1 = lerp(b[1], sec[i][1], f1);
    return [cx + lerp(x1, ter[i][0], f2) + w.x, cy + lerp(y1, ter[i][1], f2) + w.y, lerp(sec[i][2] * f1, ter[i][2], f2)]; });
  const eiwit = kleur === 'eiwit'; const kc = eiwit ? C.enzym : V.ew; const lijnCol = _mixHex(kc, '#FFFFFF', 0.38);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // silhouet van het enzym verschijnt als de kluwen dicht is
  if (f2 > 0.6) { const k = (f2 - 0.6) / 0.4; const om = []; for (let q = 0; q < 64; q++) { const u = q / 64 * 6.283, rr = Rv(u) * R0 * 1.0 + r * 1.05; om.push([cx + Math.cos(u) * rr, cy + Math.sin(u) * rr]); }
    ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(_mixHex(kc, '#1A2740', 0.55), 0.85), rgba(_mixHex(kc, '#FFFFFF', 0.2), 0.8), Math.max(1, r * 0.12));
    ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.3); ctx.beginPath(); const hp = []; for (let q = -10; q <= 10; q++) { const u = q / 10 * 0.5; const rr = Rv(u) * R0 + r * 1.05; hp.push([cx + Math.cos(u) * rr, cy + Math.sin(u) * rr]); } bioPad(ctx, hp, false); ctx.stroke(); ctx.restore(); }
  // waterstofbruggen tussen de twee strengen (in de kluwen liggen ze in naburige ringen)
  if (f2 > 0.7) { const s1 = [], s2 = []; soort.forEach((k, i) => { if (k === 's') (i < n * 0.52 ? s1 : s2).push(i); }); ctx.save(); ctx.globalAlpha *= (f2 - 0.7) / 0.3; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.setLineDash([r * 0.3, r * 0.3]);
    s1.forEach(i => { let best = -1, bd = r * 3.2; s2.forEach(j => { const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (d < bd) { bd = d; best = j; } }); if (best >= 0) { ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[best][0], pts[best][1]); ctx.stroke(); } }); ctx.setLineDash([]); ctx.restore(); }
  const items = []; pts.forEach((p, i) => { items.push({ z: p[2], i }); if (i) items.push({ z: Math.min(p[2], pts[i - 1][2]) - 0.02, l: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = pts[it.l], q = pts[it.l - 1], z = (it.z + 1) / 2; ctx.strokeStyle = rgba(lijnCol, 0.45 + 0.5 * z); ctx.lineWidth = Math.max(1.5, r * (soort[it.l] === 'h' ? 0.3 + 0.3 * z : 0.3)); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
    const p = pts[it.i], z = (p[2] + 1) / 2, rr = r * (soort[it.i] === 'h' ? 0.55 + 0.25 * z : 0.8);
    if (eiwit) { ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, _mixHex(_mixHex(kc, '#1A2740', 0.4), kc, 0.25 + 0.75 * z), _mixHex(kc, '#FFFFFF', 0.35), Math.max(1, r * 0.1)); }
    else { ctx.save(); ctx.globalAlpha *= 0.65 + 0.35 * z; bead(ctx, p[0], p[1], rr, kinds[it.i], { ess }); ctx.restore(); } });
  ctx.restore(); pts.plek = [cx + Rv(0) * R0 + r, cy]; return pts;
}
// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// MEMBRAAN — variant A 'vloeiend membraan met helixbundel-eiwitten en kanaal' (27 okt 2026).
// Recept (C9; OpenStax Biology 2e 5.1): dubbele laag fosfolipiden langs een boog (een cel is rond); kop (rond)
// + twee staarten ± 2× de kopdiameter, staarten naar binnen, in vetkleur. Membraan 5–10 nm dik. Vloeibaar
// mozaïek: de lipiden schuiven los langs elkaar (o.t: koppen wiebelen zijwaarts, de laag golft licht).
// Een transmembraaneiwit steekt aan beide kanten uit en is een bundel α-helices (staafjes) die de laag
// overspannen, geen kale capsule; een kanaaleiwit heeft een porie in het midden die open/dicht gaat.
// eiwitten: lijst hoeken (oud) of objecten {an, soort: 'eiwit'|'kanaal', open 0..1}.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten; eiwit als gladde pil; kanaal zonder porie.
// Aanroep zoals voorheen: membraanBoog(ctx, cx, cy, R, a0, a1, {a, s, kop, staart, eiwitten, eiwitCol}); nieuw: t, golf.
// Geeft terug: {eiwit: [[x, y, an], ...], punt(an)}.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, t = 0, golf = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o;
  const E = eiwitten.map(e => typeof e === 'number' ? { an: e, soort: 'eiwit', open: 0 } : Object.assign({ soort: 'eiwit', open: 0 }, e));
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const Rg = an => R + golf * Math.sin(an * R / (60 * s) + t * 0.9) * kr * 0.5;           // lichte golving langs de boog
  const ret = { eiwit: E.map(e => [cx + Math.cos(e.an) * Rg(e.an), cy + Math.sin(e.an) * Rg(e.an), e.an]), punt: an => [cx + Math.cos(an) * Rg(an), cy + Math.sin(an) * Rg(an)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const blad = (buiten) => { for (let i = 0; i <= n; i++) { let an = lerp(a0, a1, i / n); an += (Math.sin(t * 1.3 + i * 2.7 + (buiten ? 0 : 5)) * 0.25 * kr) / R * golf; // koppen schuiven
      if (E.some(e => Math.abs(an - e.an) * R < kr * (e.soort === "kanaal" ? 6.5 : 5))) continue; const Rk = Rg(an) + (buiten ? 1 : -1) * (sl + gap);
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = buiten ? -1 : 1; const tx = -uy, ty = ux; const kw = Math.sin(t * 2 + i) * 0.15 * golf;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * (sd * 0.6 + kw) * kr, hy + uy * d * sl * 0.5 + ty * (sd * 0.6 + kw) * kr, hx + ux * d * sl + tx * (sd * 0.35 + kw) * kr, hy + uy * d * sl + ty * (sd * 0.35 + kw) * kr); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, _mixHex(kop, '#FFFFFF', 0.3), 1); } };
  blad(true); blad(false);
  // eiwitten: bundel helices die de laag overspannen; kanaal = twee helften met porie
  E.forEach(e => { const p = ret.punt(e.an); ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(e.an + Math.PI / 2); // lokaal: x langs de laag, y loodrecht (−y = buiten)
    const H = sl * 2 + kr * 2 + gap * 2 + kr * 2.4, hw = kr * 1.7; const licht = _mixHex(eiwitCol, '#FFFFFF', 0.3), donker = _mixHex(eiwitCol, '#1A2740', 0.3);
    const staaf = (x0, h, sch) => { ctx.save(); ctx.translate(x0, 0); ctx.rotate(sch); roundRect(ctx, -hw / 2, -h / 2, hw, h, hw / 2); shape(ctx, eiwitCol, licht, 1.2); ctx.strokeStyle = rgba(donker, 0.6); ctx.lineWidth = 1; for (let q = -h / 2 + hw * 0.6; q < h / 2 - hw * 0.4; q += hw * 0.55) { ctx.beginPath(); ctx.moveTo(-hw / 2 + 1, q); ctx.lineTo(hw / 2 - 1, q + hw * 0.3); ctx.stroke(); } ctx.restore(); };
    if (e.soort === 'kanaal') { const op = clamp(e.open, 0, 1); const sp = kr * (0.25 + 1.2 * op);
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * sp, 0); staaf(sd * hw * 0.55, H * 0.92, sd * 0.06 * (1 - op)); staaf(sd * hw * 1.65, H * 0.8, -sd * 0.08); ctx.beginPath(); ctx.ellipse(sd * hw * 1.1, -H * 0.5, hw * 1.2, hw * 0.55, 0, 0, 6.283); shape(ctx, donker, licht, 1); ctx.restore(); }
      if (op > 0.05) { ctx.save(); ctx.globalAlpha *= op; for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(0, -H * 0.3 + q * H * 0.3 + Math.sin(t * 3 + q) * kr * 0.3, kr * 0.35, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); } ctx.restore(); } }
    else { for (let k = 0; k < 4; k++) staaf((k - 1.5) * hw * 1.05, H * (0.86 + 0.08 * Math.sin(k * 2.1)), (k % 2 ? 1 : -1) * 0.12);
      ctx.beginPath(); ctx.ellipse(0, -H * 0.5, hw * 2.3, hw * 0.75, 0, 0, 6.283); shape(ctx, donker, licht, 1); ctx.beginPath(); ctx.ellipse(hw * 0.4, H * 0.48, hw * 1.6, hw * 0.6, 0, 0, 6.283); shape(ctx, donker, licht, 1); }
    ctx.restore(); });
  ctx.restore(); return ret;
}
// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// CEL (rond, dierlijke cel) — variant A 'volle cel, detail schaalt mee' (27 okt 2026).
// Recept (C9; OpenStax Biology 2e 4.3–4.4): een vrije cel is rond; kern ± 1/3 van de celdiameter en niet in het
// midden, met dubbel kernmembraan, kernporiën, chromatine als vage vlekken en een kernlichaampje; ruw ER als
// gebogen platte zakken die om de kern liggen (ribosomen aan de buitenkant); golgi als stapel van 4–5 gebogen
// zakjes naast de kern met blaasjes; mitochondriën ± 1–2 µm tegen een cel van ± 20 µm (lengte ± 0,15 r);
// lysosomen en blaasjes klein; vrije ribosomen als rustige textuur; cytoskelet als dunne lijnen (#8FA0B5).
// Membraan: dubbellaag van fosfolipiden (kop + twee staarten), sterk vergroot; de dikte schaalt mee met r
// (± 10 % van r, max 34 px), anders wordt een kleine cel een stekelbol. Detailniveau: r ≥ 150 alles met
// fosfolipiden; 60 ≤ r < 150 membraan als dubbele lijn met koppen, organellen eenvoudiger; r < 60 gladde
// dubbele lijn, alleen kern + enkele organellen. Alle inhoud ligt geclipt binnen het membraan.
// Beweging (t): organellen schokken een klein beetje langs het cytoskelet, het membraan golft nauwelijks.
// Bekende fouten: lege cel met vijf losse organellen; kern precies in het midden; membraan dikker dan een
// organel; mitochondriën die bij een kleine cel groter blijven dan de kern.
// Aanroep zoals voorheen: celRond(ctx, cx, cy, r, {a, t, s, a0, a1, organellen, eiwitten}); nieuw: seed.
// s (optioneel) volgt anders automatisch uit r: s = clamp(r / 250, 0.25, 1.5).
// Geeft ankerpunten terug: {kern:[x,y,r], er:[x,y], golgi:[x,y], mito:[x,y], membraan(an) → [x,y]}.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [], seed = 1 } = o;
  const s = o.s != null ? o.s : clamp(r / 250, 0.25, 1.5);
  const T = clamp(r * 0.1, 4, 34) * Math.min(1.3, Math.max(0.7, s));   // membraandikte
  const rIn = r - T;                                                     // binnenkant membraan
  const kx = cx + r * 0.17, ky = cy - r * 0.1, kr = r * 0.32;
  const gA = 3.55, gx = kx + Math.cos(gA) * (kr + r * 0.2), gy = ky + Math.sin(gA) * (kr + r * 0.2);
  const ret = { kern: [kx, ky, kr], er: [kx + Math.cos(0.9) * (kr + r * 0.12), ky + Math.sin(0.9) * (kr + r * 0.12)], golgi: [gx, gy],
    mito: [cx + Math.cos(2.4) * r * 0.62, cy + Math.sin(2.4) * r * 0.62], membraan: an => [cx + Math.cos(an) * (r - T / 2), cy + Math.sin(an) * (r - T / 2)] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const golf = an => 1 + 0.006 * Math.sin(an * 3 + t * 0.7 + seed) + 0.004 * Math.sin(an * 5 - t * 0.5);
  const cirkel = (rr) => { ctx.beginPath(); for (let i = 0; i <= 96; i++) { const an = i / 96 * 6.283; const q = rr * golf(an); i ? ctx.lineTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q) : ctx.moveTo(cx + Math.cos(an) * q, cy + Math.sin(an) * q); } ctx.closePath(); };
  // cytoplasma
  cirkel(r - T * 0.5); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  const lod = r >= 150 ? 2 : r >= 60 ? 1 : 0;
  const schok = (i) => { const k = Math.floor(t * 0.8 + hash(i * 3.3 + seed)); const f = ease(clamp((t * 0.8 + hash(i * 3.3 + seed)) - k, 0, 0.3) / 0.3);
    const an0 = hash(i * 7 + k) * 6.283, an1 = hash(i * 7 + k + 1) * 6.283; const m = r * 0.012; return [lerp(Math.cos(an0), Math.cos(an1), f) * m, lerp(Math.sin(an0), Math.sin(an1), f) * m]; };
  ctx.save(); cirkel(rIn); ctx.clip();
  // rustige textuur: vrije ribosomen
  const nr = Math.round(r * r / 260); for (let i = 0; i < nr; i++) { const an = hash(i * 5 + 1 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + 2 + seed)) * rIn;
    const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr; if (Math.hypot(px - kx, py - ky) < kr + 4) continue;
    ctx.beginPath(); ctx.arc(px, py, Math.max(0.7, r * 0.0055), 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.32); ctx.fill(); }
  if (organellen) {
    // cytoskelet: dunne lijnen vanuit het centrosoom naast de kern
    if (lod >= 1) { const zx = kx + Math.cos(3.0) * (kr + r * 0.06), zy = ky + Math.sin(3.0) * (kr + r * 0.06); ctx.strokeStyle = rgba(C.line, 0.28); ctx.lineWidth = 0.75;
      for (let k = 0; k < 11; k++) { const an = k / 11 * 6.283 + 0.2; const L = rIn * 1.6; ctx.beginPath(); ctx.moveTo(zx, zy); ctx.quadraticCurveTo(zx + Math.cos(an + 0.25) * L * 0.5, zy + Math.sin(an + 0.25) * L * 0.5, zx + Math.cos(an) * L, zy + Math.sin(an) * L); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(zx, zy, Math.max(1.5, r * 0.012), 0, 6.283); ctx.fillStyle = rgba(C.line, 0.7); ctx.fill(); }
    // ruw ER: gebogen platte zakken om de kern (van ± 0,3 tot 2,3 rad), ribosomen aan de buitenkant
    const erN = lod === 2 ? 4 : lod === 1 ? 3 : 0;
    for (let k = 0; k < erN; k++) { const R0 = kr + r * (0.055 + k * 0.05), b0 = -0.2 + k * 0.12, b1 = 2.3 - k * 0.1, dik = Math.max(1.5, r * 0.012);
      const zak = (dr) => { const P = []; for (let i = 0; i <= 30; i++) { const u = i / 30, an = lerp(b0, b1, u); const rr = R0 + dr + Math.sin(u * 6.283 * 2 + k) * r * 0.008; P.push([kx + Math.cos(an) * rr, ky + Math.sin(an) * rr]); } return P; };
      const buiten = zak(dik), binnen = zak(-dik).reverse(); ctx.beginPath(); bioPad(ctx, buiten.concat(binnen), true); shape(ctx, rgba(C.er, 0.22), rgba(C.er, 0.85), Math.max(0.8, r * 0.004));
      if (lod === 2) { ctx.fillStyle = C.ribo; for (let i = 1; i < buiten.length - 1; i += 2) { const p = buiten[i], an = Math.atan2(p[1] - ky, p[0] - kx); ctx.beginPath(); ctx.arc(p[0] + Math.cos(an) * dik * 1.3, p[1] + Math.sin(an) * dik * 1.3, Math.max(1, r * 0.007), 0, 6.283); ctx.fill(); } } }
    // golgi: 5 gebogen zakjes, bol naar de kern toe, met blaasjes aan de buitenkant
    if (lod >= 1) { const nz = lod === 2 ? 5 : 3, ang = gA; ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang + Math.PI / 2);
      for (let k = 0; k < nz; k++) { const w = r * (0.27 - k * 0.022), yy = -k * r * 0.036, th = r * 0.014; ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08, w / 2, yy); ctx.quadraticCurveTo(0, yy + r * 0.08 - 2 * th, -w / 2, yy); ctx.closePath(); shape(ctx, rgba(C.golgi, 0.85), lighten(C.golgi, 0.3), Math.max(0.6, r * 0.003)); }
      for (let k = 0; k < 4; k++) { const sx = (k - 1.5) * r * 0.06 + (hash(k + seed) - 0.5) * r * 0.02, sy = -nz * r * 0.03 - r * 0.02 - hash(k * 2) * r * 0.03; ctx.beginPath(); ctx.arc(sx, sy, r * 0.014, 0, 6.283); shape(ctx, C.ves, C.vesR, 0.8); }
      ctx.restore(); }
    // mitochondriën (± 0,15 r lang), verdeeld in de ring tussen kern en membraan
    const nm = lod === 2 ? 8 : lod === 1 ? 5 : 2; const mL = r * 0.17;
    for (let k = 0; k < nm; k++) { const an = 1.9 + k * (4.6 / nm) + (hash(k * 9 + seed) - 0.5) * 0.3, rr = r * (0.58 + 0.16 * hash(k * 4 + seed)); const [dx, dy] = schok(k);
      const mx = cx + Math.cos(an) * rr + dx, my = cy + Math.sin(an) * rr + dy, rot = an + 1.3 + (hash(k * 5) - 0.5) * 1.2;
      if (Math.hypot(mx - kx, my - ky) < kr + mL * 0.6 || Math.hypot(mx - gx, my - gy) < r * 0.15) continue;
      if (lod === 2 && mL >= 36) mitochondrion(ctx, mx, my, mL, rot, 1, 4, t);
      else { ctx.save(); ctx.translate(mx, my); ctx.rotate(rot); roundRect(ctx, -mL / 2, -mL * 0.21, mL, mL * 0.42, mL * 0.21); shape(ctx, C.mito, C.mitoR, 1); if (lod >= 1) { ctx.strokeStyle = rgba(C.mitoR, 0.8); ctx.lineWidth = 0.8; for (let q = 0; q < 3; q++) { const qx = -mL * 0.25 + q * mL * 0.25, d = q % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(qx, d * mL * 0.2); ctx.lineTo(qx, -d * mL * 0.02); ctx.stroke(); } } ctx.restore(); } }
    // lysosomen en blaasjes
    if (lod >= 1) { for (let k = 0; k < 4; k++) { const an = [4.1, 5.5, 0.9, 2.9][k] + (hash(k * 11 + seed) - 0.5) * 0.4, rr = r * (0.5 + 0.28 * hash(k * 13 + seed)); const [dx, dy] = schok(k + 20); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.035, 0, 6.283); shape(ctx, rgba(C.lyso, 0.85), lighten(C.lyso, 0.35), 1); }
      for (let k = 0; k < 6; k++) { const an = 2.6 + k * 0.32, rr = r * (0.72 + 0.12 * hash(k * 17 + seed)); const [dx, dy] = schok(k + 40); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + dx, cy + Math.sin(an) * rr + dy, r * 0.02, 0, 6.283); shape(ctx, rgba(C.ves, 0.8), C.vesR, 0.8); } }
    // kern: dubbel kernmembraan met poriën, chromatine als vage vlekken, kernlichaampje
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, rgba(C.kern, 0.8), C.kernR, Math.max(1, r * 0.006));
    ctx.save(); ctx.beginPath(); ctx.arc(kx, ky, kr - 1, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#3E2E66', 0.35);
    for (let i = 0; i < 12; i++) { const an = hash(i * 2.1 + seed) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.85; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.2, kr * 0.11, an, 0, 6.283); ctx.fill(); }
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(kx - kr * 0.22, ky + kr * 0.12, kr * 0.24, kr * 0.2, 0.3, 0, 6.283); shape(ctx, rgba('#4A3A78', 0.95), rgba(C.kernR, 0.6), 1);
    if (lod >= 1) { const np = lod === 2 ? 14 : 8, rr = kr + Math.max(2, r * 0.012); ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(0.8, r * 0.004);
      for (let i = 0; i < np; i++) { const b0 = i / np * 6.283 + 0.06, b1 = (i + 1) / np * 6.283 - 0.06; ctx.beginPath(); ctx.arc(kx, ky, rr, b0, b1); ctx.stroke(); } }
  }
  ctx.restore();
  // membraan
  if (lod === 2) membraanBoog(ctx, cx, cy, r - T / 2, a0, a1, { s: T / 69, eiwitten });
  else { const lw = Math.max(1, T * 0.22); ctx.strokeStyle = C.er; ctx.lineWidth = lw;
    for (const rr of [r - lw / 2, rIn + lw / 2]) { ctx.beginPath(); ctx.arc(cx, cy, rr, a0, a1); ctx.stroke(); }
    if (lod === 1) { const n = Math.round(Math.abs(a1 - a0) * r / Math.max(4, T * 0.55)); ctx.fillStyle = C.er; for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); for (const rr of [r - lw, rIn + lw]) { ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(0.9, T * 0.13), 0, 6.283); ctx.fill(); } } }
    eiwitten.forEach(e => { ctx.save(); ctx.translate(cx + Math.cos(e) * (r - T / 2), cy + Math.sin(e) * (r - T / 2)); ctx.rotate(e); roundRect(ctx, -T * 0.8, -T * 0.4, T * 1.6, T * 0.8, T * 0.4); shape(ctx, C.enzym, lighten(C.enzym, 0.3), 1); ctx.restore(); }); }
  ctx.restore(); return ret;
}

// =====================================================================================
// [variant C = A + duidelijk tweekleurige, taps toelopende snavel; 28 okt: poten als taps loopbeen onder de staart,
//  tenen net voorbij de staartpunt]
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten in vlucht gestrekt
// onder de staart, alleen de tenen net voorbij de staartpunt (rosse grutto; bij de grutto steken ze ver uit); bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// Kleed (Cornell All About Birds, Bar-tailed Godwit ID): zomer = man kop, hals en hele onderkant donker steenrood (vrouw
// bleek oranje), winter = grijsbruin met witte buik; altijd witte stuit en een fijn gebandeerde staart (géén zwarte
// eindband: die heeft de grutto L. limosa), snavel tweekleurig (roze basis, donkere punt), bovenvleugel vrij egaal.
// o.kleed 'zomer' (standaard) | 'winter'; o.vrouw true = bleker oranje. De verre vleugel steekt boven de rug uit.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const zomer = (o.kleed || 'zomer') === 'zomer'; const rug = '#6E5440', vlek = '#3E2E22';
  const buik = zomer ? (o.vrouw ? '#D99A62' : '#B5553A') : '#E9DCC6', kopK = zomer ? (o.vrouw ? '#C98A58' : '#A44A32') : '#B89A78';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  ctx.save(); ctx.translate(9, -3); vleugel(true); ctx.restore(); // verre vleugel iets naar voren en boven: steekt uit boven de rug
  // poten: in vlucht naar achteren gestrekt onder de staart; bij de rosse grutto steken alleen de tenen net voorbij de
  // staartpunt uit (BirdGuides: 'the feet barely project beyond the tail'; Carolina Bird Club: 'about an inch beyond the tip
  // of the tail'). Taps loopbeen (donkergrijs) met een klein teenpakketje, verre poot iets donkerder en hoger.
  const poot = (dy, kl) => { const P = [[-30, 10 + dy], [-64, 12 + dy], [-95, 10.5 + dy]]; // hiel onder het lijf, loopbeen taps naar achteren
    ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1] - 2.6); ctx.quadraticCurveTo(P[1][0], P[1][1] - 1.8, P[2][0], P[2][1] - 1.2); ctx.lineTo(P[2][0], P[2][1] + 1.2); ctx.quadraticCurveTo(P[1][0], P[1][1] + 1.8, P[0][0], P[0][1] + 2.6); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
    ctx.strokeStyle = kl; ctx.lineWidth = 1.4; for (const [tx, ty] of [[-9, -2.2], [-10, 0.2], [-8.5, 2.4]]) { ctx.beginPath(); ctx.moveTo(P[2][0] + 0.5, P[2][1]); ctx.lineTo(P[2][0] + tx, P[2][1] + ty); ctx.stroke(); } }; // drie tenen
  poot(-2.5, '#2C2A27'); poot(0, '#4A4640');
  // staart
  ctx.beginPath(); ctx.moveTo(-58, -6); ctx.quadraticCurveTo(-74, -9, -90, -6); ctx.quadraticCurveTo(-93, 0, -90, 5); ctx.quadraticCurveTo(-74, 8, -58, 7); ctx.closePath(); shape(ctx, '#EDE6D8', '#8E7A62', 1); // witte stuit + staart
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5E4A38', 0.85); ctx.lineWidth = 1.6; for (let k = 0; k < 6; k++) { const px = -72 - k * 3.6; ctx.beginPath(); ctx.moveTo(px, -9); ctx.lineTo(px - 1, 9); ctx.stroke(); } ctx.restore(); // fijne dwarsbanden
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(zomer ? '#C08A5A' : vlek, 0.75); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, kopK, lighten(kopK, 0.2), 1);
  ctx.strokeStyle = zomer ? '#D8A07A' : '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  // snavel als taps vlak (dik aan de basis, spits en licht opgewipt), roze basishelft en zwarte punthelft (Cornell; Wikipedia: 'pink at the base and black towards the tip')
  const snavel = (u0, u1) => { const P = u => { const x = 82 + 62 * u, y = -5 + 2 * u - 9 * u * u * u; const d = 3.2 * (1 - u) + 0.7; return [x, y, d]; }; ctx.beginPath();
    for (let i = 0; i <= 12; i++) { const [x, y, d] = P(u0 + (u1 - u0) * i / 12); ctx.lineTo(x, y - d / 2); } for (let i = 12; i >= 0; i--) { const [x, y, d] = P(u0 + (u1 - u0) * i / 12); ctx.lineTo(x, y + d / 2); } ctx.closePath(); };
  snavel(0, 0.52); ctx.fillStyle = '#E3A196'; ctx.fill(); snavel(0.5, 1); ctx.fillStyle = '#211D1A'; ctx.fill();
  ctx.strokeStyle = rgba('#5A3A34', 0.6); ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(84, -4.6); ctx.lineTo(140, -9.8); ctx.stroke(); // bekspleet
  vleugel(false);
  ctx.restore();
}

// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// Inbouw 28 okt 2026 (Kamiel koos de huidige versie): alleen de bevestigde fout hersteld: er was geen stand samentrekken.
// o.c 0..1: de vezel wordt korter (± 15 %), de sarcomeren korter; de donkere A-band blijft even breed, de lichte I-band
// wordt smaller (Lumen Biology 'Sliding filament model'; OpenStax A&P fig. 10.10 via anatomytool.org). Dikker worden is
// niet toegevoegd (zelf maar één indirecte bron kunnen openen; vraag aan Kamiel). spierBundel geeft o.c door. Zonder o.c tekent alles precies als voorheen.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, c = 0 } = o; const kort = 1 - 0.15 * clamp(c, 0, 1); const streep = (o.streep || 12) * kort; w *= kort; // samentrekken: vezel en sarcomeren korter
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  const band = (o.streep || 12) * 0.45; for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, band, h); // donkere A-band blijft even breed, lichte I-band wordt smaller
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26, c = 0 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3, c }); }

// =====================================================================================
// LEVER (vooraanzicht). Recept: grootste klier (± 1,5 kg); grote rechterkwab (links op het scherm), smallere
// linkerkwab die over de maag reikt; scherpe onderrand, bolle bovenkant tegen het middenrif; sikkelvormig band
// tussen de kwabben; galblaas als groen peertje onder de rechterkwab. Rood-bruin. Bron: Gray's Anatomy.
// Bekende fout: bruine vlek.
// =====================================================================================
function leverVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, gloed = 0, gal = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const V0 = [[-190, -40], [-150, -95], [-60, -115], [40, -105], [130, -80], [195, -55], [210, -40], [170, -20], [90, 5], [20, 30], [-40, 70], [-110, 95], [-170, 80], [-200, 30]];
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = BIO.leverL; ctx.shadowBlur = 40 * gloed; }
  ctx.beginPath(); bioPad(ctx, V0, true); shape(ctx, BIO.lever, BIO.leverL, 2.5); if (gloed > 0.01) ctx.restore();
  ctx.strokeStyle = rgba(BIO.leverL, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(5, -108); ctx.quadraticCurveTo(0, -40, -15, 40); ctx.stroke(); // sikkelband
  ctx.fillStyle = rgba('#F2C0A8', 0.12); ctx.beginPath(); ctx.ellipse(-90, -50, 70, 26, -0.2, 0, 6.283); ctx.fill(); // glans
  if (gal) { ctx.beginPath(); bioPad(ctx, [[-70, 60], [-58, 82], [-62, 110], [-80, 118], [-94, 104], [-88, 78]], true); shape(ctx, BIO.gal, lighten(BIO.gal, 0.3), 1.5); }
  ctx.restore();
}

// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// v2 (beeldbank 27 okt 2026), recept vlokken (OpenStax A&P 2e 23.5; Junqueira h. 15): dunne darm met vingervormige
// vlokken (± 0,5–1 mm hoog, ± 4× zo hoog als breed, dicht op elkaar) die de holte in steken; in elke vlok een haarvatlus
// (rood) en in het midden een chylvat (lymfe, lichtgeel); bekleed met één laag cilindrische cellen met borstelzoom (alleen
// als de vlok groot genoeg is). Tussen de vlokken de klierbuisjes (crypten). Slijmvlies en kringspier dikker dan in v1,
// zodat de wand op filmformaat geen dunne gestreepte band is. Vlokvorm overgenomen uit de benchmarkscène (darmwandRijk).
// o: a, dikte, vlokken (bool), vh (vlokhoogte, standaard ± 0,9 × dikte, nooit meer dan 0,6 × r), t.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
  ctx.save(); ctx.globalAlpha *= a;
  const riF = (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)), dkF = (xx) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1));
  const N = 160; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(riF), dk = xs.map(dkF);
  ctx.save(); ctx.beginPath(); ctx.rect(x0, yc - r - dikte * 3, x1 - x0, 2 * (r + dikte * 3)); ctx.clip();
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.34, '#B9767A');            // slijmvlies (met klierbuisjes)
    band(0.34, 0.46, '#7E6262');         // bindweefsel (onder het slijmvlies)
    band(0.46, 0.80, '#9A4A46');         // kringspier
    band(0.80, 0.95, '#B5645C');         // lengtespier
    band(0.95, 1.0, '#E2CEC6');          // buitenvlies
    // klierbuisjes (crypten) in het slijmvlies
    ctx.strokeStyle = rgba('#6E3E40', 0.65); ctx.lineWidth = Math.max(1.5, dikte * 0.045); ctx.lineCap = 'round';
    const stap = vlokken ? Math.max(8, dikte * 0.36) : Math.max(6, dikte * 0.22);
    for (let xx = x0 + stap * 0.5; xx < x1; xx += stap) { const yy = yc + kant * riF(xx); ctx.beginPath(); ctx.moveTo(xx, yy + kant * 2); ctx.lineTo(xx, yy + kant * dkF(xx) * 0.28); ctx.stroke(); }
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#461816', 0.55); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.63); ctx.beginPath(); ctx.ellipse(xs[i], yy, Math.max(2, dikte * 0.07), dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.85, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    if (!vlokken) { // dikke darm: plooien met kliergaatjes
      ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
      xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - Math.abs(Math.sin(xx * 0.06)) * 4); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); continue; }
    // dunne darm: vlokken die de holte in steken
    const vh0 = Math.min(r * 0.6, o.vh || dikte * 0.9), vb = vh0 * 0.3, vst = vb * 1.2;
    for (let xx = x0 - vb, k = 0; xx < x1 + vb; k++, xx += vst * (0.88 + 0.24 * hash(k * 3.7 + kant))) { const y0 = yc + kant * riF(xx);
      const h = Math.min(vh0, riF(xx) * 0.6) * (0.85 + 0.15 * hash(k * 7.1 + (kant > 0 ? 3 : 0))), top = y0 - kant * h, sw = Math.sin(t * 1.4 + k * 0.7) * vb * 0.12;
      const pad = () => { ctx.beginPath(); ctx.moveTo(xx - vb * 0.5, y0 + kant * 2); ctx.bezierCurveTo(xx - vb * 0.55, y0 - kant * h * 0.7, xx - vb * 0.5 + sw, top, xx + sw, top); ctx.bezierCurveTo(xx + vb * 0.5 + sw, top, xx + vb * 0.55, y0 - kant * h * 0.7, xx + vb * 0.5, y0 + kant * 2); ctx.closePath(); };
      pad(); ctx.fillStyle = '#C98A86'; ctx.fill();
      ctx.save(); pad(); ctx.clip(); ctx.lineCap = 'round';
      ctx.strokeStyle = rgba('#C83232', 0.75); ctx.lineWidth = Math.max(1.2, vb * 0.08); ctx.beginPath(); ctx.moveTo(xx - vb * 0.24, y0); ctx.quadraticCurveTo(xx - vb * 0.26 + sw * 0.6, top + kant * vb * 0.3, xx + sw, top + kant * vb * 0.2); ctx.quadraticCurveTo(xx + vb * 0.26 + sw * 0.6, top + kant * vb * 0.3, xx + vb * 0.24, y0); ctx.stroke(); // haarvatlus
      ctx.strokeStyle = rgba('#F0D26E', 0.85); ctx.lineWidth = Math.max(1.2, vb * 0.09); ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx + sw * 0.8, top + kant * vb * 0.5); ctx.stroke(); // chylvat
      if (vb > 26) { const M = Math.max(6, Math.round(h / (vb * 0.18))); ctx.strokeStyle = rgba('#6E3232', 0.5); ctx.lineWidth = 1; // cilindercellen met kern
        for (let i = 0; i <= M; i++) for (const z of [-1, 1]) { const u = i / M, px = xx + z * vb * 0.5 * (1 - Math.pow(u, 4) * 0.98) + sw * u, py = y0 - kant * h * u, ix = xx + z * vb * 0.3 * (1 - Math.pow(u, 4)) + sw * u;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ix, py + kant * 2); ctx.stroke(); if (i < M) { ctx.fillStyle = rgba('#5A3C8C', 0.6); ctx.beginPath(); ctx.ellipse((px + ix) / 2, py - kant * h / M * 0.5, vb * 0.04, h / M * 0.3, 0, 0, 6.283); ctx.fill(); } } }
      ctx.restore();
      pad(); ctx.strokeStyle = rgba('#FAE2D8', 0.9); ctx.lineWidth = vb > 26 ? 2.5 : 1.3; ctx.stroke(); // borstelzoom / epitheelrand
    }
  }
  ctx.restore(); ctx.restore(); return { ri: riF };
}
// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// ENZYM met actieve plek (goud) — variant C 'kralenketen met helices en β-plaat, induced fit' (ronde 2, 27 okt 2026:
// A als basis + helixveren en β-pijlen uit B; de holte sluit zichtbaar om het substraat).
// Recept (C9, BEELDAFSPRAKEN; OpenStax Biology 2e 3.4): een enzym is één gevouwen keten van aminozuren (kralen, zelfde
// taal als eiwitVouw), die in lussen door een compacte kluwen loopt. Twee stukken van de buitenste lus zijn α-helix
// (spiraalveer, ± 3,6 aminozuren per winding, voorkant licht, achterkant donker), en twee stukken liggen als β-strengen
// naast elkaar (brede pijlen, tegengesteld gericht = een kleine β-plaat). Aan één kant een ronde holte (actieve plek,
// goud) die past bij één substraat (hier twee glucoseringen, V.kh).
// Induced fit: open (sluit 0, holte wijd) → het substraat schuift in de holte (bind 0 → 1) en de twee lippen draaien
// er ± 20° omheen dicht → het enzym knipt de binding (knip 0 → 0,5: de stukken wijken) → de holte gaat weer open en
// de stukken laten los (knip 0,5 → 1). sluit volgt standaard uit bind en knip; o.sluit kan het overschrijven.
// Bekende fouten: gladde bol met krabbel; holte die niet van vorm verandert; substraat dat in het eiwit verdwijnt.
// Klein (r < 20): silhouet met kralenrand en gouden holte.
// Aanroep zoals voorheen: enzymKluwen(ctx, x, y, r, {a, an, sluit, col, seed}); nieuw: bind, knip, sub (kleur substraat;
// null = geen substraat tekenen). Geeft terug: {plek:[x,y], lip:[x,y], rand(u)}.
function _ekC_rand(r, seed, sluit) { // straal per hoek; holte rond hoek 0; lippen sluiten symmetrisch en grijpen om
  const w = lerp(0.62, 0.3, sluit);
  return u => { let rr = r * (1 + 0.06 * Math.sin(u * 5 + seed) + 0.035 * Math.sin(u * 9 + seed * 2)); const ad = Math.abs(((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI);
    if (ad < w) rr *= 1 - 0.6 * Math.sqrt(Math.max(0, 1 - Math.pow(ad / w, 2.6)));
    else if (ad < w + 0.35) rr *= 1 + 0.14 * sluit * Math.sin((ad - w) / 0.35 * Math.PI); // lip buigt om het substraat
    return rr; };
}
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, col = C.enzym, seed = 4, bind = 0, knip = 0, sub = (typeof V !== 'undefined' ? V.kh : C.oker) } = o;
  const b = ease(clamp(bind, 0, 1)), kn = clamp(knip, 0, 1), kn1 = ease(clamp(kn / 0.5, 0, 1)), kn2 = ease(clamp((kn - 0.5) / 0.5, 0, 1));
  const sluit = o.sluit != null ? o.sluit : b * (1 - kn2);
  const cs = Math.cos(an), sn = Math.sin(an); const W = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const R = _ekC_rand(r, seed, sluit);
  const ret = { plek: W(r * 0.7, 0), lip: W(r * 0.78, -r * 0.4), rand: u => W(Math.cos(u) * R(u), Math.sin(u) * R(u)) };
  if (a <= 0.01) return ret;
  const licht = _mixHex(col, '#FFFFFF', 0.32), donker = _mixHex(col, '#1A2740', 0.5);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const om = []; for (let k = 0; k < 72; k++) { const u = k / 72 * 6.283, rr = R(u) * 1.04; om.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(donker, 0.92), _mixHex(col, '#FFFFFF', 0.2), Math.max(1, r * 0.02));
  if (r < 20) { ctx.fillStyle = _mixHex(col, '#FFFFFF', 0.15); for (let k = 0; k < 14; k++) { const u = 0.75 + k / 13 * (6.283 - 1.5); const rr = R(u) * 0.84; ctx.beginPath(); ctx.arc(Math.cos(u) * rr, Math.sin(u) * rr, r * 0.15, 0, 6.283); ctx.fill(); } }
  else {
    const kr = r * 0.075, stap = kr * 1.75, gw = lerp(0.62, 0.3, sluit) + 0.2;
    // serpentine: buitenring → middenring → binnenring; per kraal ring en hoek bewaren
    const pad = []; [[0.82, 1], [0.56, -1], [0.3, 1]].forEach(([k, dir], ri) => { const b0 = gw + ri * 0.12, b1 = 6.283 - gw - ri * 0.08;
      for (let i = 0; i <= 60; i++) { const u = dir > 0 ? lerp(b0, b1, i / 60) : lerp(b1, b0, i / 60); pad.push([Math.cos(u) * R(u) * k, Math.sin(u) * R(u) * k, ri, u]); } });
    const K = []; let acc = stap; for (let i = 1; i < pad.length; i++) { const p = pad[i - 1], q = pad[i]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); let d = 0;
      while (acc <= L - d) { d += acc; const f = d / L; K.push({ x: lerp(p[0], q[0], f), y: lerp(p[1], q[1], f), ri: q[2], u: q[3] }); acc = stap; } acc -= (L - d); }
    const soort = K.map(k => (k.ri === 0 && ((k.u > 1.05 && k.u < 2.15) || (k.u > 4.25 && k.u < 5.3))) ? 'h' : ((k.ri === 0 || k.ri === 1) && k.u > 2.5 && k.u < 3.85) ? 's' : 'l');
    const runs = []; soort.forEach((s2, i) => { if (s2 === 'l') return; const lr = runs[runs.length - 1]; if (lr && lr.s === s2 && lr.i1 === i - 1) lr.i1 = i; else runs.push({ s: s2, i0: i, i1: i }); });
    // lussen: kralenketting (alleen waar geen helix/streng ligt)
    ctx.strokeStyle = rgba(licht, 0.8); ctx.lineWidth = kr * 0.5; ctx.beginPath(); let pen = false;
    K.forEach((k, i) => { const vrij = soort[i] === 'l' || (runs.some(rn => rn.i0 === i || rn.i1 === i)); if (vrij) { pen ? ctx.lineTo(k.x, k.y) : ctx.moveTo(k.x, k.y); pen = true; } else pen = false; }); ctx.stroke();
    // doorverbinding over helix/streng heen gebeurt door het element zelf
    K.forEach((k, i) => { if (soort[i] !== 'l') return; ctx.beginPath(); ctx.arc(k.x, k.y, kr * 0.85, 0, 6.283); shape(ctx, _mixHex(donker, col, 0.75), licht, Math.max(0.8, r * 0.011)); });
    // β-strengen: brede pijlen langs de keten, buren tegengesteld
    runs.filter(rn => rn.s === 's' && rn.i1 - rn.i0 >= 2).forEach(rn => { const Q = K.slice(rn.i0, rn.i1 + 1).map(k => [k.x, k.y]); const hw = kr * 0.95; const n2 = Q.length;
      const nrm = j => { const p = Q[Math.max(0, j - 1)], q = Q[Math.min(n2 - 1, j + 1)]; const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L, dx / L, dy / L]; };
      const kop = Math.max(1, Math.round(n2 * 0.3)); const L1 = [], L2 = []; for (let j = 0; j < n2 - kop; j++) { const [nx, ny] = nrm(j); L1.push([Q[j][0] + nx * hw, Q[j][1] + ny * hw]); L2.push([Q[j][0] - nx * hw, Q[j][1] - ny * hw]); }
      const j0 = n2 - kop, [nx, ny] = nrm(j0); const pb = Q[j0], tip = Q[n2 - 1]; const [, , tx, ty] = nrm(n2 - 1);
      ctx.beginPath(); L1.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.lineTo(pb[0] + nx * hw * 1.8, pb[1] + ny * hw * 1.8); ctx.lineTo(tip[0] + tx * kr * 0.6, tip[1] + ty * kr * 0.6); ctx.lineTo(pb[0] - nx * hw * 1.8, pb[1] - ny * hw * 1.8); L2.reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath();
      shape(ctx, _mixHex(col, '#FFFFFF', 0.12), licht, Math.max(1, r * 0.012)); });
    // waterstofbruggen tussen de twee strengen
    const s1 = runs.find(rn => rn.s === 's'), s2 = runs.filter(rn => rn.s === 's')[1];
    if (s1 && s2) { ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.75); ctx.lineWidth = Math.max(1, r * 0.012); ctx.setLineDash([r * 0.02, r * 0.02]); for (let j = s1.i0 + 1; j < s1.i1; j += 2) { const p = K[j]; let best = null, bd = 1e9; for (let q = s2.i0; q <= s2.i1; q++) { const d = Math.hypot(K[q].x - p.x, K[q].y - p.y); if (d < bd) { bd = d; best = K[q]; } } if (best && bd < r * 0.4) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(best.x, best.y); ctx.stroke(); } } ctx.restore(); }
    // α-helices: spiraalveer tussen begin en eind van het stuk (achterkant donker, voorkant licht)
    runs.filter(rn => rn.s === 'h' && rn.i1 - rn.i0 >= 3).forEach(rn => { const A = K[rn.i0], B = K[rn.i1]; const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const amp = kr * 1.45, tw = Math.max(2, Math.round((rn.i1 - rn.i0) / 3.6)), N = tw * 24; const pt = j => { const u = j / N, ph = u * tw * 6.283; return [A.x + ux * (L * u + Math.cos(ph) * amp * 0.45), A.y + uy * (L * u + Math.cos(ph) * amp * 0.45), Math.cos(ph), Math.sin(ph)]; };
      const P2 = Array.from({ length: N + 1 }, (_, j) => { const p = pt(j); return [p[0] + nx * p[3] * amp, p[1] + ny * p[3] * amp, p[2]]; });
      for (const voor of [false, true]) { ctx.strokeStyle = voor ? licht : _mixHex(col, '#1A2740', 0.2); ctx.lineWidth = kr * (voor ? 1.15 : 0.85); let open = false;
        P2.forEach(p => { if ((p[2] < 0) === voor) { if (open) { ctx.stroke(); open = false; } return; } if (!open) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); open = true; } else ctx.lineTo(p[0], p[1]); }); if (open) ctx.stroke(); } });
  }
  // actieve plek: gouden rand van de holte
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); const w = lerp(0.62, 0.3, sluit) + 0.04; const hp = []; for (let k = -12; k <= 12; k++) { const u = k / 12 * w; hp.push([Math.cos(u) * R(u), Math.sin(u) * R(u)]); } ctx.beginPath(); bioPad(ctx, hp, false); ctx.stroke();
  // substraat: twee glucoseringen; schuift de holte in, wordt geknipt en laat los
  if (sub && (b > 0.01 || kn > 0.01) && typeof hexagon === 'function') { const hr = r * 0.12; const diep = R(0) + hr * 1.1; const inX = lerp(r * 1.75, diep, b);
    const p1 = [inX - kn1 * hr * 0.25 + kn2 * r * 0.7, -kn2 * r * 0.45], p2 = [inX + hr * 2.05 + kn1 * hr * 0.5 + kn2 * r * 1.0, kn2 * r * 0.3];
    if (kn1 < 0.4) { ctx.strokeStyle = _mixHex(sub, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); ctx.moveTo(p1[0] + hr * 0.85, p1[1]); ctx.lineTo(p2[0] - hr * 0.85, p2[1]); ctx.stroke(); }
    hexagon(ctx, p1[0], p1[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); hexagon(ctx, p2[0], p2[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); }
  ctx.restore(); return ret;
}

// =====================================================================================
// ===== Toegevoegd 22 okt 2026 voor Sekse, gender en diversiteit 1.1 =====
// ==============================================================================
// ECHO van ± 20 weken (2D, sagittaal profiel). Recept: waaiervormig beeld (sector ± 70°), zwart = vocht
// (vruchtwater), grijs korrelig = weke delen, helder wit = bot en grensvlakken. Bij 20 weken: schedel als heldere
// ring, profiel (voorhoofd, neusbotje, lippen, kin), wervelkolom als dubbele rij heldere kraaltjes langs de rug,
// ribben als korte heldere streepjes, hart in de borst (± 2 cm) dat zichtbaar klopt (± 140/min), armpje met
// handje vaak bij het gezicht. Baarmoederwand als heldere band aan de rand. Bron: ISUOG-richtlijn 20-wekenecho;
// RIVM 'Het 20 wekenonderzoek'. Bekende fouten: losse ellipsen; kind 'getekend' met lijnen i.p.v. echo-korrel.
// (x, y) = top van de waaier (transducer); R = diepte; o.hl = {hoofd, armen, hart} 0..1 oplichten; t = tijd.
function _echoKorrel(ctx, pts, n, seed, helder, r = 1.6) { for (let i = 0; i < n; i++) { const p = pts(hash(seed + i * 3), hash(seed + i * 3 + 1)); if (!p) continue; const v = hash(seed + i * 3 + 2); ctx.fillStyle = `rgba(${helder},${helder},${helder + 6},${0.18 + 0.5 * v})`; ctx.fillRect(p[0], p[1], r + v * 1.6, r * 0.7 + v); } }
function echoBeeld(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, hl = {}, s = 1, open = 1.22 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const a0 = Math.PI / 2 - open / 2, a1 = Math.PI / 2 + open / 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.fillStyle = '#050608'; ctx.fill(); ctx.save(); ctx.clip();
  // baarmoederwand: heldere korrelige band onderaan en bovenaan
  const band = (r0, r1, n, sd) => _echoKorrel(ctx, (u, v) => { const an = lerp(a0, a1, u), rr = lerp(r0, r1, v); return [x + Math.cos(an) * rr, y + Math.sin(an) * rr]; }, n, sd, 150);
  band(R * 0.06, R * 0.16, 500, 11); band(R * 0.86, R * 0.99, 700, 17);
  // kind: lokaal stelsel, midden (cx, cy), schaal k; hoofd links, rug boven, gezicht naar links-onder
  const cx = x + R * 0.04, cy = y + R * 0.52, k = R / 520 * s; const P = (px, py) => [cx + px * k, cy + py * k];
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const romp = [[-40, -62], [60, -74], [170, -60], [250, -20], [262, 40], [215, 88], [120, 98], [20, 92], [-40, 70]];
  const hoofd = [[-100, -100], [-30, -86], [-10, -30], [-30, 40], [-80, 78], [-128, 84], [-150, 70], [-170, 52], [-176, 34], [-196, 22], [-188, 4], [-200, -6], [-206, -30], [-196, -66], [-160, -96]];
  for (const [vorm, dicht] of [[romp, 900], [hoofd, 800]]) { ctx.beginPath(); bioPad(ctx, vorm, true); ctx.fillStyle = 'rgba(70,74,80,0.55)'; ctx.fill(); ctx.save(); ctx.clip(); const xs = vorm.map(p => p[0]), ys = vorm.map(p => p[1]), mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
    _echoKorrel(ctx, (u, v) => [lerp(mx, Mx, u), lerp(my, My, v)], dicht, vorm === romp ? 31 : 37, 120, 2.2); ctx.restore(); }
  const bot = (pts, w, al) => { ctx.strokeStyle = `rgba(236,238,242,${al})`; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const lh = (n) => 0.75 + 0.25 * (hl[n] || 0);
  // schedel (heldere ring) + profiel
  ctx.save(); ctx.globalAlpha *= lh('hoofd'); bot([[-196, -66], [-160, -96], [-100, -100], [-40, -80], [-18, -30], [-34, 30], [-80, 70]], 7, 0.9);
  bot([[-206, -30], [-200, -8], [-188, 4], [-196, 22], [-176, 34], [-170, 52], [-150, 70]], 4, 0.75); bot([[-196, 12], [-186, 6]], 5, 0.95); // neusbotje
  ctx.beginPath(); ctx.ellipse(-150, -20, 13, 10, 0, 0, 6.283); ctx.fillStyle = 'rgba(10,10,12,0.9)'; ctx.fill(); bot([[-118, 40], [-90, 60], [-60, 66]], 5, 0.7); // oogkas, kaak
  if ((hl.hoofd || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.hoofd * 0.45; ctx.beginPath(); bioPad(ctx, hoofd, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } ctx.restore();
  // wervelkolom en ribben
  for (let i = 0; i < 20; i++) { const u = i / 19, px = lerp(-24, 236, u), py = -58 - 16 * Math.sin(u * 3) + u * 40; for (const d of [0, 12]) { ctx.fillStyle = 'rgba(236,238,242,0.85)'; ctx.fillRect(px - 4, py + d, 8, 6); } }
  for (let i = 0; i < 6; i++) bot([[20 + i * 22, -48], [12 + i * 22, 0], [22 + i * 22, 50]], 3, 0.35);
  // hart: kloppende vierkamer-vorm in de borst
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.3)) ** 2, hh = 1 + 0.12 * slag;
  ctx.save(); ctx.translate(70, 22); ctx.scale(hh, hh); ctx.globalAlpha *= lh('hart'); ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, -0.4, 0, 6.283); ctx.fillStyle = 'rgba(8,8,10,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,222,228,0.9)'; ctx.lineWidth = 4; ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 4); ctx.lineTo(26, -6); ctx.moveTo(0, -22); ctx.lineTo(4, 22); ctx.stroke();
  if ((hl.hart || 0) > 0.01) { ctx.globalAlpha *= hl.hart; ctx.beginPath(); ctx.ellipse(0, 0, 40, 34, -0.4, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore();
  // armpje met handje bij het gezicht
  ctx.save(); ctx.globalAlpha *= lh('armen'); const arm = [[-20, 46], [-60, 104], [-120, 108], [-160, 92]]; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = 'rgba(80,84,92,0.9)'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.stroke();
  bot([[-22, 50], [-58, 100]], 5, 0.85); bot([[-64, 104], [-118, 106]], 4, 0.8); for (let f = 0; f < 4; f++) bot([[-156, 86 + f * 5], [-176, 80 + f * 7]], 3, 0.7);
  if ((hl.armen || 0) > 0.01) { ctx.globalAlpha *= hl.armen * 0.6; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = C.goud; ctx.lineWidth = 36; ctx.globalAlpha *= 0.35; ctx.stroke(); } ctx.restore();
  bot([[200, 70], [270, 110], [300, 90]], 5, 0.6); // dijbeen/been aan de rand
  ctx.restore();
  // schaduw en diepteverloop
  const g = ctx.createRadialGradient(x, y, R * 0.2, x, y, R); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(x - R, y, 2 * R, R);
  ctx.restore(); ctx.strokeStyle = 'rgba(120,128,140,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.stroke();
  ctx.restore(); return { hart: P(70, 22), hoofd: P(-110, -10), arm: P(-120, 106) };
}

// EMBRYO van ± 6 weken na de bevruchting (Carnegie-stadium 15–17, kop-romplengte ± 7–12 mm), zijaanzicht.
// Recept: C-vormig; groot hoofd (± de helft van de lengte) met voorhersenblaas; oog als donker pigmentringetje met
// lens; oorputje achter de kieuwbogen; 3 kieuwboogjes onder het hoofd; grote hartbult en daaronder de leverbult;
// armknop (al een peddel) ter hoogte van het hart, kleinere beenknop lager; rij somieten (blokjes) langs de rug;
// staartje dat naar binnen krult. Huid doorzichtig, roze. De aanleg van de geslachtsklieren ligt binnenin tegen de
// achterwand van de buikholte (genitale lijst, naast de oernier). Bron: Sadler, Langman's Embryology h. 6 en 16;
// Virtual Human Embryo (Carnegie 16). Bekende fouten: kommavorm met een stip; ledematen als vingers; aanleg buiten op het lijf.
// Oorsprong = midden; ± 300 × 400 bij s = 1. o.glow = aanleg laten oplichten.
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#C9877A', diep = '#D69A8A';
  const lijf = [[-70, -170], [20, -208], [104, -182], [150, -112], [160, -24], [150, 58], [118, 124], [72, 166], [28, 182], [-8, 166], [-34, 128], [-52, 78], [-70, 30], [-98, -14], [-90, -52], [-108, -72], [-124, -112], [-112, -152]];
  // staart
  ctx.strokeStyle = huid; ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, [[30, 176], [-14, 196], [-44, 182], [-50, 156]], false); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, [[-44, 182], [-56, 156], [-46, 136]], false); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, rgba(huid, 0.96), rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  // voorhersenblaas en hersenblazen als zachtere vlakken
  ctx.fillStyle = rgba('#F6CDBC', 0.8); ctx.beginPath(); ctx.ellipse(-30, -150, 70, 50, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -150, 52, 44, 0.4, 0, 6.283); ctx.fill();
  // hart (klopt) en lever door de huid
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2; ctx.fillStyle = rgba('#C8463C', 0.55 + 0.2 * slag); ctx.beginPath(); ctx.ellipse(-62, -18, 34 + 3 * slag, 30 + 3 * slag, 0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = rgba('#9A3E36', 0.4); ctx.beginPath(); ctx.ellipse(-44, 46, 34, 36, 0, 0, 6.283); ctx.fill();
  // somieten langs de rug
  const rug = bioDicht([[96, -150], [138, -80], [146, 0], [132, 74], [100, 136], [56, 168]], 26); rug.forEach((p, i) => { if (i % 1) return; const q = rug[Math.min(rug.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an) * 14, p[1] + Math.cos(an) * 14); ctx.rotate(an); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.6), null); ctx.restore(); });
  // aanleg geslachtsklier: langwerpige lijst tegen de achterwand van de buik
  const gp = [[86, 30], [96, 70], [90, 108]]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 10; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwboogjes
  ctx.strokeStyle = rand; ctx.lineWidth = 3; [[-112, -96, 26], [-104, -74, 22], [-94, -56, 17]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx + 24, by, r, 2.4, 3.9); ctx.stroke(); });
  // oog en oorputje
  _bioCirc(ctx, -66, -128, 15, rgba('#5A3A34', 0.85)); _bioCirc(ctx, -66, -128, 7, rgba('#F6E6DC', 0.9)); ctx.beginPath(); ctx.arc(-6, -96, 7, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke();
  // armknop (peddel) en beenknop
  ctx.save(); ctx.translate(14, 12); ctx.rotate(1.9); ctx.beginPath(); ctx.ellipse(28, 0, 40, 22, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.save(); ctx.translate(58, 128); ctx.rotate(2.3); ctx.beginPath(); ctx.ellipse(22, 0, 30, 17, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.restore();
}

// ZAADBAL in doorsnede. Recept: stevig kapsel (tunica albuginea); vanuit het mediastinum (één zijde) lopen tussen-
// schotten naar binnen die ± 250 lobjes maken; elk lobje vol opgerolde zaadbuisjes, in doorsnede ronde buisjes
// (± 0,2 mm) met een wand van Sertolicellen en zaadcellen in wording (rijper naar het midden) en staartjes in de
// holte; daartussen bindweefsel met groepjes Leydigcellen (maken testosteron) bij haarvaten. Bron: Junqueira h. 21.
// Bekende fouten: golflijnen of blokjes; buisjes als lege ringen; alle buisjes als identieke ronde schijfjes.
// Herstel 28 okt 2026 (huidige versie blijft, keuze 'gelijk'): de buisjes zijn sterk gekronkeld, dus een doorsnede raakt ze
// rond, schuin of overlangs (ovale profielen in allerlei richtingen; Univ. Basel TALES 'Testes adult'; SIU histology);
// Leydigcellen liggen in groepjes in het bindweefsel tussen de buisjes (Duke histology; Univ. Michigan histology) en
// zijn nu standaard licht zichtbaar (o.leydig standaard 0,6; 0 = uit, 1 = nadruk). Verder niets veranderd.
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0.6, col = C.teal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), lighten(col, 0.2), Math.max(2.5, rx * 0.035)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const r = rb * (0.92 + 0.12 * hash(i + 3)); const asp = hash(i * 7 + 11) < 0.45 ? lerp(0.55, 0.85, hash(i * 5 + 2)) : 1; // schuin of overlangs getroffen
    ctx.save(); ctx.translate(x + px, y + py); ctx.rotate(hash(i * 3 + 4) * 3.14); ctx.scale(1 + (1 - asp) * 0.5, asp); const bx = 0, by = 0;
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#1A2232', 0.75); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } ctx.restore(); });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283, lx = x + px + Math.cos(an) * rb * 1.1, ly = y + py + Math.sin(an) * rb * 1.1; // groepje van 3 in de driehoek tussen de buisjes
    for (let q = 0; q < 3; q++) { const qa = an + q * 2.1; _bioCirc(ctx, lx + Math.cos(qa) * rb * 0.13, ly + Math.sin(qa) * rb * 0.13, Math.max(1.2, rb * 0.12), rgba(C.goud, 0.85 * leydig)); } });
  ctx.restore(); ctx.restore();
}

// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 25.3 en 17.6): dun licht kapsel om de nier; schors als lichte buitenband
// die tussen de piramides naar binnen loopt (niercolumnen); piramides donkerder met fijne strepen, de basis naar de schors
// en de punt (papil) in een kelkje dat uitkomt in het nierbekken; nierslagader, nierader en urineleider als gebogen vaten
// vanuit de hilus (slagader achter de ader, urineleider eronder naar beneden). Standen: o.urine 0..1 (druppels lopen door
// de urineleider), o.glowSchors / o.glowMerg (bijnierschors of -merg apart oplichten; o.glow = allebei, zoals v1).
// Inbouw 28 okt 2026 (Kamiel koos A): de bevestigde fout 'urinestand niet te zien' hersteld: bij o.urine lopen verzadigd gele
// druppels met een donkere rand door de urineleider en kleurt het nierbekken mee (urine: nierbekken → urineleider → blaas;
// LibreTexts Human Anatomy Lab 21.3, WikiVet 'Ureters'). Verder A ongewijzigd.
// Geeft ankerpunten terug: bijnier, schors, merg, bekken, urineleider, slagader, ader (+ bijnierSchors, bijnierMerg).
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, glowSchors = glow, glowMerg = glow, urine = 0, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const anker = { bijnier: P(4, -140), bijnierSchors: P(-30, -128), bijnierMerg: P(6, -132), schors: P(-58, -30), merg: P(-20, 40), bekken: P(44, 4), urineleider: P(78, 120), slagader: P(118, -34), ader: P(122, 12) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // vaten en urineleider vanuit de hilus, gebogen (slagader boven/achter, ader ervoor, urineleider naar beneden)
  ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(56, -14); ctx.bezierCurveTo(90, -22, 110, -40, 160, -38); ctx.stroke();
  ctx.strokeStyle = '#4A6CA8'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(56, 10); ctx.bezierCurveTo(92, 14, 118, 2, 162, 8); ctx.stroke();
  const UL = [[52, 26], [72, 46], [82, 90], [76, 150], [72, 200]];
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke();
  if (urine > 0.01) { const D = bioDicht(UL, 10); for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const [px, py, an] = bioPunt(D, u); ctx.save(); ctx.globalAlpha *= urine * Math.min(1, u * 8, (1 - u) * 8); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 7, 3.2, 0, 0, 6.283); shape(ctx, '#F2D04A', '#B8941E', 1); ctx.restore(); } } // urinedruppels: verzadigd geel met donkere rand, zodat ze op de bleke urineleider opvallen
  // nier: schors (lichter) als hele vulling, kapsel als lichte rand
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#B05A48', '#E6B4A2', 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.25); for (let i = 0; i < 70; i++) { const an = hash(i * 3.3) * 6.283, rr = 0.8 + 0.18 * hash(i * 7.7); ctx.beginPath(); ctx.arc(5 + Math.cos(an) * 66 * rr, Math.sin(an) * 106 * rr, 1.6, 0, 6.283); ctx.fill(); } // nierlichaampjes (korrelig)
  // nierbekken met kelkjes, piramides met de punt in een kelkje
  const PEL = [44, 4]; const angs = [-2.3, -2.75, 3.0, 2.55, 2.1, -1.85, 1.7];
  angs.forEach((an, k) => { const bx = 5 + Math.cos(an) * 50, by = Math.sin(an) * 82, ax = lerp(bx, PEL[0], 0.58), ay = lerp(by, PEL[1], 0.58); const nx = -(ay - by), ny = ax - bx, nl = Math.hypot(nx, ny) || 1, bw = 17;
    ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw, by + ny / nl * bw); ctx.quadraticCurveTo(bx - (ax - bx) * 0.15, by - (ay - by) * 0.15, bx - nx / nl * bw, by - ny / nl * bw); ctx.lineTo(ax, ay); ctx.closePath(); shape(ctx, '#7A3428', null);
    ctx.strokeStyle = rgba('#A85A48', 0.7); ctx.lineWidth = 1.2; for (let q = -1; q <= 1; q++) { ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw * q * 0.38, by + ny / nl * bw * q * 0.38); ctx.lineTo(lerp(bx, ax, 0.85), lerp(by, ay, 0.85)); ctx.stroke(); } // strepen (buisjes)
    ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax + (ax - bx) * 0.05, ay + (ay - by) * 0.05); ctx.lineTo(lerp(ax, PEL[0], 0.75), lerp(ay, PEL[1], 0.75)); ctx.stroke(); }); // kelkje
  ctx.beginPath(); ctx.ellipse(PEL[0], PEL[1], 17, 34, 0, 0, 6.283); ctx.fillStyle = _mixHex('#E8D9A0', '#F2D04A', 0.6 * urine); ctx.fill(); // nierbekken kleurt mee bij o.urine
  ctx.restore();
  // bijnier op de bovenpool: schors (geel) buiten, merg (rood-bruin) binnen
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const gS = glowSchors * (0.75 + 0.25 * Math.sin(t * 4)), gM = glowMerg * (0.75 + 0.25 * Math.sin(t * 4 + 1));
  ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, _mixHex('#D9AE48', '#F2D27A', gS), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); shape(ctx, _mixHex('#8A4A3A', '#E07A5F', gM), gM > 0.01 ? rgba(C.goud, gM) : null, 3);
  if (gS > 0.01) { ctx.save(); ctx.globalAlpha *= gS * 0.7; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}

// KIP (leghen), zijaanzicht naar rechts. Recept: romp eivormig en schuin (achter hoger), ± 2,5× de koplengte; staart-
// veren steil omhoog; hals met halsveren die over de schouder vallen; kleine kop; enkelvoudige kam met 5 punten, lellen
// onder de snavel, oorlel; gele, korte snavel; vleugel tegen de romp; poten geel geschubd, 3 tenen naar voren, 1 naar
// achter. Kleur: roodbruin met donkerdere vleugel en staart. Bron: foto's leghen (ISA Brown). Bekende fouten: bolletje
// met cirkelkop; kam als twee rondjes.
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A', pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6;
  ctx.strokeStyle = poot; ctx.lineWidth = 7; [[-6, 52], [22, 52]].forEach(([px, py], i) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2, py + 54); ctx.stroke(); ctx.lineWidth = 4; [[-22, 6], [0, 10], [20, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px + 2 + dx, py + 54 + dy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px - 12, py + 50); ctx.stroke(); ctx.lineWidth = 7; });
  ctx.beginPath(); bioPad(ctx, [[-120, -78], [-104, -128], [-78, -150], [-64, -112], [-56, -60]], true); shape(ctx, _bioDonker(kleur, 0.45), null); // staart
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null); // romp
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null); // vleugel
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76, -64); ctx.rotate(pik * 0.02);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null); // hals
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null); // kop
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null); // snavel
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill(); // kam
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); // lel + oorlel
  _bioCirc(ctx, 30, -70, 4.2, '#E8A040'); _bioCirc(ctx, 31, -70, 2.2, '#121A26');
  ctx.restore(); ctx.restore();
}
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }

// ZEESCHILDPAD (onechte karetschildpad, Caretta caretta), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig,
// ± 1 m, roodbruin met olijftint; 5 middelste (vertebrale) schilden als zeshoeken op een rij, 5 paar ribschilden (het
// eerste paar raakt het nekschild), rand van kleine schilden; voorvinnen lang en sikkelvormig (± 1/2 van de
// schildlengte) met 1–2 nageltjes, achtervinnen kort en rond; kop groot (karetschildpad heeft een opvallend grote kop)
// met grote kopschubben en een snavelpunt. Legt ± 110–130 ronde eieren (pingpongbal) in een zelf gegraven kuil in het
// zand; de nesttemperatuur bepaalt de sekse (warmer vooral vrouwtjes). Bron: Animal Diversity Web 'Caretta caretta';
// NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met pootjes en een bolle koepel; middenschilden als
// ronde blokjes (leest als ruggengraat). o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A', huidD = '#A8825E';
  const recht = (pts) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  for (const sx of [-1, 1]) {
    ctx.save(); ctx.scale(sx, 1); ctx.translate(60, -40); ctx.rotate(-0.25 + vin * 0.35); // voorvin: lang, sikkelvormig, achterrand dun
    ctx.beginPath(); bioPad(ctx, [[-20, -4], [50, -30], [110, -30], [150, -8], [134, -2], [70, 6], [0, 18]], true); shape(ctx, huid, schub, 2);
    ctx.fillStyle = huidD; for (const [px, py, r] of [[20, -6, 9], [44, -14, 8], [68, -18, 7], [92, -16, 6], [114, -12, 5]]) { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.7, -0.2, 0, 6.283); ctx.fill(); } // schubben op de voorrand
    ctx.fillStyle = '#4A3A2A'; ctx.beginPath(); ctx.moveTo(60, -28); ctx.lineTo(66, -36); ctx.lineTo(70, -27); ctx.fill(); ctx.restore(); // nageltje
    ctx.save(); ctx.scale(sx, 1); ctx.translate(46, 96); ctx.rotate(0.35 - vin * 0.15); ctx.beginPath(); bioPad(ctx, [[-8, -8], [34, 0], [52, 22], [36, 34], [4, 20]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  // kop: groot, met kopschubben (veelhoeken) en snavelpunt
  const KOP = [[-26, -96], [-34, -122], [-26, -150], [-10, -164], [0, -168], [10, -164], [26, -150], [34, -122], [26, -96]]; ctx.beginPath(); bioPad(ctx, KOP, true); shape(ctx, huid, schub, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KOP, true); ctx.clip(); ctx.strokeStyle = schub; ctx.lineWidth = 1.6;
  recht([[0, -160], [12, -148], [8, -132], [-8, -132], [-12, -148]]); ctx.fillStyle = huidD; ctx.fill(); ctx.stroke(); recht([[-8, -132], [8, -132], [12, -116], [0, -108], [-12, -116]]); ctx.stroke(); recht([[12, -148], [26, -140], [24, -120], [12, -116], [8, -132]]); ctx.stroke(); recht([[-12, -148], [-26, -140], [-24, -120], [-12, -116], [-8, -132]]); ctx.stroke(); ctx.restore();
  ctx.fillStyle = '#5A4430'; ctx.beginPath(); ctx.moveTo(-6, -165); ctx.lineTo(0, -172); ctx.lineTo(6, -165); ctx.fill(); // snavelpunt
  _bioCirc(ctx, -20, -140, 4.5, '#2A1C16'); _bioCirc(ctx, 20, -140, 4.5, '#2A1C16');
  // rugschild
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.fillStyle = rgba('#6E7A3A', 0.18); ctx.beginPath(); ctx.ellipse(-30, -10, 50, 90, 0.2, 0, 6.283); ctx.fill(); // olijftint
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-98, -56, -14, 28, 70, 112], vb = [18, 30, 32, 30, 22, 14];
  for (let i = 0; i < 5; i++) { const y0 = vy[i], y1 = vy[i + 1], ym = (y0 + y1) / 2; recht([[-vb[i], y0], [vb[i], y0], [vb[i] + 10, ym], [vb[i + 1], y1], [-vb[i + 1], y1], [-vb[i] - 10, ym]]); ctx.stroke(); } // 5 zeshoekige middenschilden
  for (const sx of [-1, 1]) { const rx = [80, 92, 96, 88, 68, 40]; for (let i = 0; i < 4; i++) { const yy = (vy[i] + vy[i + 1]) / 2 + 21; ctx.beginPath(); ctx.moveTo(sx * (vb[i + 1] + 4), vy[i + 1]); ctx.lineTo(sx * rx[i + 1], yy + 6); ctx.stroke(); } } // 5 paar ribschilden
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); ctx.lineTo(p[0] * 0.86, p[1] * 0.86); } ctx.stroke(); // grens met de randschilden
  ctx.lineWidth = 1.6; for (let k = 0; k < 24; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 24); ctx.beginPath(); ctx.moveTo(p[0] * 0.86, p[1] * 0.86); ctx.lineTo(p[0], p[1]); ctx.stroke(); } // randschilden
  ctx.restore(); ctx.restore();
}
// NEST van de zeeschildpad in doorsnede: zandlaag met de kuil die het vrouwtje graaft (smalle hals, bredere eikamer
// onderin), daarin een stapel ronde witte eieren (pingpongbal, ± 4 cm; in werkelijkheid ± 110–130, hier o.n getekend),
// bovenop teruggeschoven zand. o.temp = 0..1 kleurt de eikamer van koel (teal) naar warm (koraal): warmer → meer
// vrouwtjes (temperatuurafhankelijke geslachtsbepaling, ADW). o.boven = true geeft het oude bovenaanzicht (schaaltje).
// (x, y) = midden van het zandoppervlak boven het nest; s = 1 → eikamer ± 160 px breed.
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.boven) { ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
    for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
    ctx.restore(); return; }
  ctx.translate(x, y); ctx.scale(s, s); const zand = '#B8A27A', zandD = '#9A8460';
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-100, -6, 0, -10); ctx.quadraticCurveTo(100, -6, 200, 0); ctx.lineTo(200, 250); ctx.lineTo(-200, 250); ctx.closePath(); shape(ctx, zand, null); // zandlaag
  ctx.fillStyle = rgba(zandD, 0.5); for (let k = 0; k < 40; k++) { const px = -190 + ((k * 97) % 380), py = 20 + ((k * 61) % 220); ctx.beginPath(); ctx.arc(px, py, 1.6, 0, 6.283); ctx.fill(); } // enkele korrels, rustig
  const KUIL = [[-22, -8], [-26, 60], [-70, 110], [-82, 170], [-50, 210], [0, 220], [50, 210], [82, 170], [70, 110], [26, 60], [22, -8]];
  ctx.beginPath(); bioPad(ctx, KUIL, true); const temp = o.temp; ctx.fillStyle = temp == null ? '#7E6A4C' : (temp > 0.5 ? rgba(C.koraal, 0.25 + 0.4 * (temp - 0.5)) : rgba(C.teal, 0.25 + 0.4 * (0.5 - temp))); ctx.fill();
  ctx.strokeStyle = zandD; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.stroke(); ctx.setLineDash([]); // rand van de gegraven kuil
  ctx.fillStyle = rgba('#C9B48A', 0.9); ctx.beginPath(); bioPad(ctx, [[-22, -8], [-26, 60], [0, 70], [26, 60], [22, -8]], true); ctx.fill(); // hals dichtgeschoven met zand
  const eieren = []; let rij = 0, i = 0; const per = [5, 4, 3, 2, 1]; while (i < n && rij < per.length) { for (let k = 0; k < per[rij] && i < n; k++, i++) eieren.push([(k - (per[rij] - 1) / 2) * 30, 196 - rij * 25]); rij++; }
  for (const [ex, ey] of eieren) { ctx.beginPath(); ctx.arc(ex, ey, 14, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); ctx.beginPath(); ctx.arc(ex - 4, ey - 4, 3, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill(); }
  ctx.restore(); return { eieren: [x, y + 170 * s], zand: [x + 140 * s, y + 40 * s] }; }


// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
// Herstel 28 okt 2026 (keuze 'gelijk'): de kop was ± 27 % van de totale lengte; kop (snuitpunt tot achter de schedel)
// is ± 1/7 van de totale lengte (gemiddeld 1:7, bij grote dieren tot 1:8–9; Whitaker & Whitaker 2008 via Journal of
// Threatened Taxa 13(8), 2021; Sanctuary Nature Foundation 'Size matters'). Alles vóór x = 140 (achter het oog) wordt
// in de lengte samengedrukt (KX = 0,38; kop nu ± 15 % van de lengte) en het dier schuift 50 px op, zodat het midden op dezelfde plek blijft. Rest gelijk.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.translate(50, 0);
  const KX = 0.38, X = (px) => (px <= 140 ? px : 140 + (px - 140) * KX); // kop ± 1/7 van de lengte
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]].map(([px, py]) => [X(px), py]);
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [246, 4], [284, 1]].forEach(([tx, ty], i) => { tx = X(tx); ctx.beginPath(); ctx.moveTo(tx - 2.5, ty); ctx.lineTo(tx, ty + (i % 2 ? -7 : 8)); ctx.lineTo(tx + 2.5, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(170), 8); ctx.quadraticCurveTo(X(240), 6, X(298), -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(X(160), -30, 11, 8, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, X(160), -30, 5.5, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(X(160) - 1, -35, 2, 10);
  _bioCirc(ctx, X(292), -14, 3.5, '#1A1410');
  ctx.restore();
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: zaadbalweefsel, T-helpercel, hiv, bacterie
// =====================================================================================
// =====================================================================================
// obj_man_afweer.js — objecten voor lib_bio.js: zaadbalweefsel, T-helpercel, hiv-deeltje, staafbacterie.
// Vereist: lib_bio.js (BIO, bioPad, bloedvat) en lib.js-hulpjes (C, rgba, lighten, hash, clamp, lerp, ease,
// shape, roundRect). Stijl: vlakke vullingen, rand 1–2 px lichter, geen tekst, alles deterministisch via hash(),
// animatie alleen via t (seconden).
// =====================================================================================

// =====================================================================================
// ZAADBALWEEFSEL (doorsnede testis, lichtmicroscoop). Recept (mens): zaadbuisjes rond, diameter 180–200 µm;
// wand = basale membraan + 1–2 lagen platte peritubulaire (myoïde) cellen, samen ± 4–6 µm; kiemepitheel 60–80 µm
// dik, lumen ± 40–60 µm. Sertolicellen ± 1 per 25–30 µm omtrek: hoge zuil van basale membraan tot lumen, bleek
// cytoplasma, kern bij de basis (± 9 × 6 µm, bleek, ovaal/peervormig, groot kernlichaampje), lange as radiaal.
// Van buiten naar binnen: spermatogonia op de basale membraan (kern ± 6–7 µm, donker), primaire spermatocyten
// in de middenlaag (cel 15–18 µm, grootste kernen ± 10 µm, chromatine als draden), ronde spermatiden (cel ± 8 µm,
// kern ± 5 µm, bleek), langgerekte spermatiden aan het lumen (kop ± 5 × 2,5 µm, kop naar de basis), staarten in
// het lumen. Interstitium smal; Leydigcellen (15–20 µm, veelhoekig, eosinofiel = warm/oker, ronde kern ± 6 µm,
// excentrisch) in groepjes bij een haarvat (Ø 6–8 µm, rode bloedcellen 7,5 µm). Schaal hier ± 1,5 px/µm bij
// w = 720, h = 420. Weinig productie: kiemepitheel dunner, minder spermatiden en staarten, lumen wijder.
// Bron: Junqueira's Basic Histology h. 21 (fig. 21-3/21-5); Ross & Pawlina, Histology h. 22.
// Bekende fouten: buisje als ring met stipjes; Sertolicellen als losse bolletjes; spermatocyten even groot als
// spermatogonia; Leydigcellen ín het buisje; zaadcellen met kop naar het lumen; honingraat van buisjes.
// =====================================================================================
const _ZB_BUIS = [ // [x, y, R] in ontwerpcoördinaten (frame 720 × 420, oorsprong = midden)
  [-240, 10, 140], [80, -122, 138], [62, 192, 136], [372, 48, 140], [-330, -252, 120], [-272, 288, 115], [332, -255, 110]
];
const _ZB_CAP = [[-120, -250], [-96, -92], [-62, 12], [-80, 138], [-112, 250]]; // haarvat tussen buisje 0, 1 en 2
function _zbBuis(ctx, cx, cy, R, p, t, sd, hlS, info) {
  const rb = R - 6, rl = R * lerp(0.56, 0.32, p), dik = rb - rl; // basale membraan → lumen
  const ring = u => rb - u * dik;
  // wand: basale membraan + platte peritubulaire cellen
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); shape(ctx, rgba('#B07A68', 0.45), rgba('#D9A894', 0.8), 1.5);
  ctx.beginPath(); ctx.arc(cx, cy, rb, 0, 6.283); shape(ctx, rgba('#D8C9A8', 0.16), rgba('#E8D8C0', 0.55), 1);
  for (let k = 0; k < 11; k++) { const an = (k + hash(sd + k * 3.1)) / 11 * 6.283;
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * (R - 3), cy + Math.sin(an) * (R - 3), 7, 1.8, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.95); ctx.fill(); }
  // lumen
  ctx.beginPath(); ctx.arc(cx, cy, rl, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.55); ctx.fill();
  // Sertolicellen: zuilen van basis tot lumen
  const nS = Math.max(9, Math.round(6.283 * R / 70)); const sAng = [];
  for (let k = 0; k < nS; k++) sAng.push((k + 0.25 * (hash(sd + k * 7.7) - 0.5)) / nS * 6.283 + hash(sd) * 6.283);
  const col = rgba('#EFE3C4', 0.24 + 0.32 * hlS), colE = rgba('#F6ECD2', 0.4 + 0.45 * hlS);
  sAng.forEach((th, k) => {
    const L = [], Rr = [];
    for (let i = 0; i <= 7; i++) { const u = i / 7, r = lerp(rb, rl - 2, u); const half = lerp(8, 3.2, u);
      const w1 = half + 1.8 * Math.sin(u * 9 + k), w2 = half + 1.8 * Math.sin(u * 8 + k * 2.3 + 1);
      L.push([cx + Math.cos(th - w1 / r) * r, cy + Math.sin(th - w1 / r) * r]); Rr.unshift([cx + Math.cos(th + w2 / r) * r, cy + Math.sin(th + w2 / r) * r]); }
    if (hlS > 0.01) { ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); ctx.strokeStyle = rgba('#F6ECD2', 0.22 * hlS); ctx.lineWidth = 6; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); shape(ctx, col, colE, 1);
  });
  // kiemcellen (tussen de zuilen); ringen met vaste plaatsen, productie dunt uit
  const vrij = (an, r, half) => sAng.every(th => { let d = Math.abs(((an - th) % 6.283 + 9.425) % 6.283 - 3.1416); return d * r > 8 + half; });
  const cel = (x, y, cr, kr, kf, ke) => { ctx.beginPath(); ctx.arc(x, y, cr, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1); ctx.beginPath(); ctx.arc(x, y, kr, 0, 6.283); shape(ctx, kf, ke, 1); };
  // spermatogonia op de basale membraan
  { const r = rb - 6.5, n = Math.floor(6.283 * r / 15);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 1.3)) / n * 6.283; if (!vrij(an, r, 2)) continue; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
      ctx.beginPath(); ctx.ellipse(x, y, 7.5, 6, an, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1);
      ctx.beginPath(); ctx.ellipse(x, y, 5, 4, an + Math.PI / 2, 0, 6.283); shape(ctx, '#5A4888', (C.nucEdge || '#A392D6'), 1); } }
  // primaire spermatocyten: grootste kernen, chromatinedraden
  { const r = ring(0.31), n = Math.floor(6.283 * r / 24);
    for (let i = 0; i < n; i++) { const an = (i + 0.5 + 0.3 * hash(sd + i * 2.9)) / n * 6.283; if (!vrij(an, r, 6) || hash(sd + i * 5.3 + 1) > 0.45 + 0.55 * p) continue;
      const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r; cel(x, y, 11, 7.5, rgba((C.nucFill || '#6E5A9E'), 0.95), (C.nucEdge || '#A392D6'));
      ctx.strokeStyle = rgba('#D4C8F0', 0.75); ctx.lineWidth = 1.1; ctx.lineCap = 'round';
      for (let d = 0; d < 3; d++) { const h = k => hash(sd + i * 11 + d * 3 + k) - 0.5; ctx.beginPath(); ctx.moveTo(x + h(1) * 9, y + h(2) * 9); ctx.quadraticCurveTo(x + h(3) * 12, y + h(4) * 12, x + h(5) * 9, y + h(6) * 9); ctx.stroke(); } } }
  // ronde spermatiden (twee rijen)
  [[0.6, 12], [0.76, 11.5]].forEach(([u, sp], ri) => { const r = ring(u), n = Math.floor(6.283 * r / sp);
    for (let i = 0; i < n; i++) { const an = (i + ri * 0.5 + 0.25 * hash(sd + i * 3.7 + ri)) / n * 6.283; if (!vrij(an, r, 1) || hash(sd + i * 4.1 + ri * 9 + 2) > Math.pow(p, 1.4)) continue;
      cel(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 5.8, 3.4, rgba((C.purpleL || '#BBAFE0'), 0.9), lighten((C.purpleL || '#BBAFE0'), 0.3)); } });
  // langgerekte spermatiden: kop naar de basis, staart het lumen in
  { const r = rl + 6, n = Math.floor(6.283 * r / 7.5);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 6.1)) / n * 6.283; if (hash(sd + i * 8.3 + 3) > Math.pow(p, 1.6)) continue;
      const ri = r + (hash(sd + i * 2.2) - 0.5) * 6, x = cx + Math.cos(an) * ri, y = cy + Math.sin(an) * ri;
      const sw = (hash(sd + i) - 0.5) * 2, tl = rl * (0.4 + 0.3 * hash(sd + i * 9.9)), pts = [];
      for (let k = 0; k <= 6; k++) { const rr = ri - 3 - k * tl / 6; const aa = an + sw * k * 0.035 + Math.sin(t * 2.4 + k * 1.3 + i) * 0.006 * k * k / 3; pts.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); }
      ctx.beginPath(); bioPad(ctx, pts); ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.42); ctx.lineWidth = 0.9; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, y, 4, 1.7, an + (hash(sd + i * 3.3) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#4A3A78', (C.nucEdge || '#A392D6'), 0.8); } }
  // Sertolikernen bovenop (bleek, groot kernlichaampje)
  sAng.forEach(th => { const r = rb - 13, x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r;
    ctx.beginPath(); ctx.ellipse(x, y, 7, 4.3, th, 0, 6.283); shape(ctx, rgba('#CFC3E6', 0.85 + 0.15 * hlS), '#E6DCF5', 1);
    ctx.beginPath(); ctx.arc(x - Math.cos(th) * 1.2, y - Math.sin(th) * 1.2, 1.7, 0, 6.283); ctx.fillStyle = (C.nucFill || '#6E5A9E'); ctx.fill();
    info.sertoli.push([x, y, th]); });
}
function zaadbalWeefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, t = 0, leydig = 0, sertoli = 0, testo = 0, inhibine = 0, productie = 1, seed = 0 } = o;
  const s = Math.min(w / 720, h / 420); const S = (px, py) => [x + px * s, y + py * s];
  const BUIS = _ZB_BUIS, CAP = _ZB_CAP;
  // Leydigcellen: twee groepjes in de driehoeken tussen de buisjes, veelhoekig tegen elkaar gedrukt
  const kandidaat = [];
  [[-22, 32, 9], [182, 40, 6]].forEach(([gx, gy, n], g) => { for (let i = 0; i < n + 6; i++) { const rr = 13 * Math.sqrt(i + 0.5), an = i * 2.39996 + seed + g;
    const px = gx + Math.cos(an) * rr, py = gy + Math.sin(an) * rr * 1.1;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 9)) continue;
    if (CAP.some(c => Math.hypot(px - c[0], py - c[1]) < 17) || Math.hypot(px - 205, py - 62) < 22) continue;
    if (kandidaat.filter(k => k.g === g).length < n) kandidaat.push({ x: px, y: py, g, m: 12.5 * (0.88 + 0.24 * hash(seed + i * 3 + g * 50)) }); } });
  const leyd = kandidaat.map((c, i) => { const pts = [];
    for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = c.m;
      kandidaat.forEach((q, j) => { if (j === i) return; const dx = q.x - c.x, dy = q.y - c.y, dd = Math.hypot(dx, dy), pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr - 1.5); });
      BUIS.forEach(([bx, by, bR]) => { const fx = c.x - bx, fy = c.y - by, B = fx * ux + fy * uy, Cq = fx * fx + fy * fy - (bR + 3) * (bR + 3), D = B * B - Cq; if (D > 0) { const tt = -B - Math.sqrt(D); if (tt > 0) best = Math.min(best, tt); } });
      pts.push([c.x + ux * Math.max(4, best), c.y + uy * Math.max(4, best)]); }
    return { c, pts }; });
  const ret = { leydig: S(-22, 32), sertoli: S(0, 0), haarvat: S(CAP[2][0], CAP[2][1]), buisjes: BUIS.map(([bx, by, bR]) => [x + bx * s, y + by * s, bR * s]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 28 * s); ctx.clip();
  ctx.translate(x, y); ctx.scale(s, s); const W = w / s, H = h / s;
  // interstitium: los bindweefsel met een paar fibroblastkernen en vezels
  ctx.fillStyle = rgba('#7A4A3A', 0.3); ctx.fillRect(-W / 2, -H / 2, W, H);
  ctx.strokeStyle = rgba('#E8C8B0', 0.1); ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) { const px = (hash(seed + i * 9.1) - 0.5) * W, py = (hash(seed + i * 4.7) - 0.5) * H;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 8)) continue; const an = hash(seed + i * 2.2) * 3.14;
    ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 14, py - Math.sin(an) * 14); ctx.quadraticCurveTo(px + 4, py - 4, px + Math.cos(an) * 14, py + Math.sin(an) * 14); ctx.stroke();
    if (i % 3 === 0) { ctx.beginPath(); ctx.ellipse(px, py, 5.5, 1.6, an, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); } }
  // zaadbuisjes
  const info = { sertoli: [] }; const sPerBuis = [];
  BUIS.forEach(([bx, by, bR], i) => { const st = info.sertoli.length; _zbBuis(ctx, bx, by, bR, clamp(productie, 0, 1), t, seed * 97 + i * 31 + 5, sertoli, info); sPerBuis.push(info.sertoli.slice(st)); });
  // haarvat (lengtedoorsnede) + klein haarvat in doorsnede bij groepje 2
  bloedvat(ctx, CAP, 6, t, { n: 5, speed: 0.05, haarvat: true });
  ctx.beginPath(); ctx.arc(205, 62, 9, 0, 6.283); shape(ctx, '#3A1A22', rgba(BIO.vaatwand, 0.9), 3); rodeBloedcel(ctx, 205, 62, 5.5, 0.4, 0, 0.95);
  // Leydigcellen
  leyd.forEach(({ c, pts }, i) => {
    if (leydig > 0.01) { ctx.beginPath(); bioPad(ctx, pts, true); ctx.strokeStyle = rgba((C.gold || '#E0B64A'), 0.28 * leydig); ctx.lineWidth = 7; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, lighten('#B8894A', 0.18 * leydig), lighten((C.ochre || '#C9A35C'), 0.35 + 0.3 * leydig), 1.3);
    for (let k = 0; k < 2; k++) { const an = hash(seed + i * 5 + k) * 6.283; ctx.beginPath(); ctx.arc(c.x + Math.cos(an) * 6, c.y + Math.sin(an) * 6, 1.6, 0, 6.283); ctx.fillStyle = rgba('#F6E2B0', 0.55); ctx.fill(); } // vetdruppeltjes
    const kx = c.x + (hash(seed + i * 7) - 0.5) * 4, ky = c.y + (hash(seed + i * 8) - 0.5) * 4;
    ctx.beginPath(); ctx.arc(kx, ky, 4.6, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1);
    ctx.beginPath(); ctx.arc(kx + 1, ky - 0.8, 1.2, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); });
  // anker Sertoli: zuil van buisje 0 die naar het interstitium kijkt
  { let best = null, bd = 1e9; sPerBuis[0].forEach(q => { const d = Math.hypot(q[0] + 22, q[1] - 32); if (d < bd) { bd = d; best = q; } }); if (best) ret.sertoli = S(best[0], best[1]); }
  // deeltjes
  const capPts = bioDicht(CAP, 12);
  const naCap = (px, py) => { let b = capPts[0], bd = 1e9; capPts.forEach(q => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < bd) { bd = d; b = q; } }); return b; };
  const deeltje = (sx, sy, tx, ty, u, col, i) => { const e = ease(u), al = Math.sin(Math.PI * u);
    const px = lerp(sx, tx, e) + Math.sin(u * 6 + i) * 3, py = lerp(sy, ty, e) + Math.cos(u * 5 + i) * 3;
    ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.globalAlpha *= al; shape(ctx, col, lighten(col, 0.4), 1); ctx.globalAlpha /= al || 1; };
  if (testo > 0.01 && leyd.length) { const n = Math.round(40 * testo); ctx.save(); ctx.globalAlpha *= Math.min(1, testo * 2);
    for (let i = 0; i < n; i++) { const L = leyd[Math.floor(hash(seed + i * 1.7) * leyd.length)].c; const u = ((t * 0.22 * (0.8 + 0.4 * hash(i * 3.3)) + hash(i * 5.9)) % 1 + 1) % 1;
      let tx, ty; if (hash(i * 7.1 + 2) < 0.62) { let bb = BUIS[0], bd = 1e9; BUIS.forEach(B => { const d = Math.hypot(L.x - B[0], L.y - B[1]) - B[2]; if (d < bd) { bd = d; bb = B; } });
        const an = Math.atan2(L.y - bb[1], L.x - bb[0]) + (hash(i * 2.3) - 0.5) * 0.5; tx = bb[0] + Math.cos(an) * (bb[2] - 30); ty = bb[1] + Math.sin(an) * (bb[2] - 30); }
      else { const q = naCap(L.x, L.y); tx = q[0] + (hash(i) - 0.5) * 30; ty = q[1] + (hash(i + 1) - 0.5) * 30; }
      deeltje(L.x, L.y, tx, ty, u, (C.purple || '#8C7BBF'), i); } ctx.restore(); }
  if (inhibine > 0.01) { const n = Math.round(18 * inhibine); ctx.save(); ctx.globalAlpha *= Math.min(1, inhibine * 2);
    const bron = []; [0, 1, 2].forEach(b => { const [bx, by] = BUIS[b]; const q = naCap(bx, by); const dir = Math.atan2(q[1] - by, q[0] - bx);
      sPerBuis[b].forEach(sv => { let d = Math.abs(((sv[2] - dir) % 6.283 + 9.425) % 6.283 - 3.1416); if (d < 0.5) bron.push(sv); }); });
    for (let i = 0; i < n && bron.length; i++) { const sv = bron[Math.floor(hash(seed + i * 2.9 + 40) * bron.length)]; const u = ((t * 0.2 * (0.8 + 0.4 * hash(i * 4.4 + 9)) + hash(i * 6.6 + 3)) % 1 + 1) % 1;
      const q = naCap(sv[0], sv[1]); deeltje(sv[0], sv[1], q[0], q[1], u, (C.purpleD || '#675694'), i + 100); } ctx.restore(); }
  ctx.restore();
  return ret;
}


// T-HELPERCEL — definitief (A, 27 okt 2026; inbouw 28 okt: celmembraan als dubbellaag).
// Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets excentrisch, donker (heterochromatine);
// smalle cytoplasmarand (neutraal grijsblauw zoals celRond, rustige textuur) met 2–3 mitochondriën. CD4 =
// transmembraaneiwit, hier sterk vergroot als steeltje met twee domeinen, loodrecht op het membraan, gelijk
// verdeeld, in enzymgrijs (eiwit); de receptor waar gp120 aan bindt wordt goud (o.bindAn = hoek).
// Hiv-infectie (o.geinfecteerd 0..1): virus-RNA (paars) in het cytoplasma, nieuwe virusdeeltjes knoppen uit
// het membraan. Sterven (o.sterft 0..1): de cel krimpt, wordt grauw en blaast blaasjes af (apoptose).
// Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12; ASHM 'HIV structure and organisation'.
// Celmembraan als dubbellaag (twee lijnen) vanaf r ≥ 50 (inbouw 28 okt 2026; fosfolipide-dubbellaag: CK-12/LibreTexts 2.05,
// Lumen Biology 'Phospholipids'); bij kleiner formaat één lijn.
// Bekende fouten: membraan als enkele lijn op groot formaat; kleine kern met veel cytoplasma (monocyt); receptoren los naast de cel; betekeniskleuren
// (teal, groen) als versiering.
// Aanroep zoals voorheen: tHelperCel(ctx, x, y, r, {a, t, cd4, hl}); nieuw: bindAn, geinfecteerd, sterft.
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0, bindAn = null, geinfecteerd = 0, sterft = 0 } = o; const st = clamp(sterft, 0, 1), gi = clamp(geinfecteerd, 0, 1);
  r = r * (1 - 0.18 * st);
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.globalAlpha *= 1 - 0.55 * st;
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      const bnd = bindAn != null && Math.abs(((an - bindAn) % 6.283 + 9.425) % 6.283 - 3.1416) < 3.1416 / n; const rc = bnd ? C.goud : C.enzym;
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = _mixHex(rc, '#FFFFFF', 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      for (let q = 0; q < 2; q++) { ctx.beginPath(); ctx.ellipse(x + ux * (r + st * (0.55 + q * 0.45) + kn * 0.4), y + uy * (r + st * (0.55 + q * 0.45) + kn * 0.4), kn * 0.95, kn * 0.75, an, 0, 6.283); shape(ctx, rc, _mixHex(rc, '#FFFFFF', 0.4), 1); } }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _mixHex('#2A3448', '#6A7488', 0.6 * st), hl > 0.01 ? _mixHex(C.er, C.goud, hl) : C.er, Math.max(1.5, r * 0.022));
  // celmembraan = dubbellaag: tweede lijn iets naar binnen (vanaf r ≥ 50; kleiner blijft één lijn)
  if (r >= 50) { ctx.beginPath(); ctx.arc(x, y, r - Math.max(3, r * 0.028), 0, 6.283); ctx.strokeStyle = hl > 0.01 ? _mixHex(C.er, C.goud, hl) : C.er; ctx.lineWidth = Math.max(1, r * 0.014); ctx.stroke(); }
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip(); for (let i = 0; i < Math.round(r * 0.8); i++) { const an = hash(i * 3.1) * 6.283, d = Math.sqrt(hash(i * 1.3)) * r; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(0.7, r * 0.012), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.15); ctx.fill(); } ctx.restore();
  // mitochondriën in de dikste kant van de rand
  for (let k = 0; k < 3; k++) { const an = Math.PI * 0.82 + (k - 1) * 0.42, rr = r * 0.88, L = r * 0.17, B = r * 0.065;
    ctx.save(); ctx.translate(x + Math.cos(an) * rr, y + Math.sin(an) * rr); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, (C.mitoFill || '#D88E7A'), (C.mitoEdge || '#F0B8A6'), 1);
    ctx.beginPath(); ctx.moveTo(-L * 0.28, 0); ctx.lineTo(L * 0.28, 0); ctx.strokeStyle = rgba((C.mitoEdge || '#F0B8A6'), 0.8); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); }
  // kern: groot, rond, donkere chromatinevlekken
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), Math.max(1.2, r * 0.018));
  ctx.fillStyle = rgba('#3E2E66', 0.45);
  for (let i = 0; i < 9; i++) { const an = hash(i * 2.1 + 5) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.72;
    ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); }
  // geïnfecteerd: virus-RNA (paars, dun) in het cytoplasma en nieuwe virusdeeltjes die uit het membraan knoppen
  if (gi > 0.01) { ctx.save(); ctx.globalAlpha *= gi; ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1, r * 0.015);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.5, rr0 = r * 0.86; ctx.beginPath(); for (let q = 0; q <= 12; q++) { const u = q / 12; const px = x + Math.cos(an + u * 0.35) * rr0 + Math.sin(u * 9 + k) * r * 0.02, py = y + Math.sin(an + u * 0.35) * rr0 + Math.cos(u * 7 + k) * r * 0.02; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
    if (typeof hivVirus === 'function') for (let k = 0; k < 3; k++) { const an = 3.6 + k * 0.7, kno = clamp(gi * 1.6 - k * 0.25, 0, 1); const vr = r * 0.14; hivVirus(ctx, x + Math.cos(an) * (r + vr * (kno * 1.2 - 0.6)), y + Math.sin(an) * (r + vr * (kno * 1.2 - 0.6)), vr, { t, rot: an, a: kno }); }
    ctx.restore(); }
  // sterft: celmembraan blaast blaasjes af
  if (st > 0.2) { ctx.save(); ctx.globalAlpha *= (st - 0.2) / 0.8; for (let k = 0; k < 6; k++) { const an = k * 1.05 + 0.3; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.02, y + Math.sin(an) * r * 1.02, r * (0.09 + 0.05 * hash(k)), 0, 6.283); shape(ctx, '#3A4458', C.er, 1); } ctx.restore(); }
  ctx.restore();
  return ret;
}

// HIV-DEELTJE — variant A (27 okt 2026): RNA als twee dunne paarse strengen (C1: RNA paars) en versmelten op
// een stuk celmembraan (dubbellaag) in dezelfde aanroep: envelop en celmembraan worden zichtbaar één laag.
// Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel; Env-spikes (gp41-steel +
// gp120-trimeer), loodrecht en gelijk verspreid; kegelvormig capside (p24) met twee enkelstrengs RNA's.
// Fusie: gp120 bindt CD4 + corecepor, gp41 versmelt envelop en celmembraan; het deeltje opent aan de onderkant.
// Bron: ASHM 'HIV structure and organisation'; Briggs & Kräusslich 2011; Zhu e.a. 2006.
// Bekende fouten: stekelbol; rond capside; DNA in plaats van RNA; fusie zonder doelmembraan.
// Aanroep zoals voorheen: hivVirus(ctx, x, y, r, {a, t, rot, fuseer, n}); nieuw: membraan (standaard aan zodra
// fuseer > 0). Het membraan ligt op y + r (raaklijn onderkant), zoals in de oude afspraak.
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12, membraan = null } = o; const mem = membraan == null ? fuseer > 0.01 : membraan; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  // doelmembraan (celmembraan van de T-cel): dubbellaag, licht gebogen (stuk van een grote cirkel), ligt op y + r
  if (mem) { const Rm = r * 22, cyM = yb + Rm; const lwm = Math.max(5, r * 0.13), llm = Math.max(1.3, r * 0.03); const gat = f > 0.01 ? (r * 0.75 * f + r * 0.3) / Rm : 0;
    const boog = (b0, b1) => { ctx.beginPath(); ctx.arc(0, cyM, Rm, -Math.PI / 2 + b0, -Math.PI / 2 + b1); };
    for (const [b0, b1] of (gat > 0 ? [[-0.075, -gat], [gat, 0.075]] : [[-0.075, 0.075]])) { boog(b0, b1); ctx.strokeStyle = _mixHex(C.coral || '#E07A5F', '#FFFFFF', 0.3); ctx.lineWidth = lwm; ctx.stroke(); boog(b0, b1); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lwm - 2 * llm; ctx.stroke(); } }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba('#E07A5F', 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    ctx.beginPath(); ctx.moveTo(px - nx * r * 0.05, py - ny * r * 0.05); ctx.lineTo(px + nx * r * 0.14, py + ny * r * 0.14); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.2); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h]) => { ctx.beginPath(); ctx.arc(px + nx * r * h + tx * sd * ks * 0.95, py + ny * r * h + ty * sd * ks * 0.95, ks, 0, 6.283); shape(ctx, (C.coralL || '#F0A88F'), lighten((C.coralL || '#F0A88F'), 0.35), 1); });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1, r * 0.03);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}


// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: aanleg geslachtsorganen, eileider, zwangerschapstest
// =====================================================================================
// =====================================================================================
// obj_aanleg_eileider_test.js — nieuwe objecten voor lib_bio.js (aanleg geslachtsorganen, eileider, zwangerschapstest)
// Zelfde stijl als lib_bio.js: recept + bron + bekende fouten boven elk object; (ctx, x, y, ..., o = {});
// deterministisch (alleen hash), animatie via t (s), geeft ankerpunten in schermcoördinaten terug.
// =====================================================================================

function _bioMix(c1, c2, f) { // twee #hex-kleuren mengen → 'rgb()'
  const p = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(c1), B = p(c2); f = clamp(f, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], f))},${Math.round(lerp(A[1], B[1], f))},${Math.round(lerp(A[2], B[2], f))})`;
}
function _bioMixA(c1, c2, f, al) { const s = _bioMix(c1, c2, f); return s.replace('rgb(', 'rgba(').replace(')', `,${al})`); }

// =====================================================================================
// AANLEG GESLACHTSORGANEN (inwendig), embryo week 6–7, ongedifferentieerd stadium, vooraanzicht, symmetrisch.
// Recept (Sadler, Langman's Medical Embryology h. 16, fig. 16.24–16.32; Moore, The Developing Human h. 12):
// - Gonade = genitale lijst: langgerekte richel mediaal van de oernier (mesonephros), lengte ± 3–4× de breedte,
//   hoog in de buik (ter hoogte van de onderste borst-/bovenste lendenwervels). Hier 44 × 140 px.
// - Wolff-buis (ductus mesonephricus) loopt lateraal in de oernier omlaag en mondt uit in de sinus urogenitalis.
// - Müller-buis (ductus paramesonephricus) ontstaat als instulping van het coeloomepitheel LATERAAL van de
//   Wolff-buis, opent boven met een trechter in de buikholte, loopt omlaag, kruist dan VENTRAAL (vóór) de Wolff-buis
//   naar mediaal; beide Müller-buizen versmelten in de middellijn (uterovaginaal kanaal) en raken de achterwand van
//   de sinus (Müller-heuveltje) tussen de twee Wolff-uitmondingen.
// - Man (SRY → testis, AMH, testosteron): testis ronder (± 4 × 3 cm volwassen, verhouding 1,3 : 1), zakt iets;
//   bovenste oerniertubuli + Wolff-buis → ductuli efferentes + bijbal (sterk gekronkelde buis tegen de laterale/
//   achterkant van de testis, kop boven, staart onder); rest van de Wolff-buis → zaadleider (dikke spierwand);
//   zaadblaasje = knop uit de zaadleider vlak boven de sinus (week 10); Müller-buizen verdwijnen door AMH.
// - Vrouw (geen AMH, geen testosteron): eierstok amandelvormig (± 3 × 1,5 cm volwassen, 2 : 1) met follikels;
//   bovenste Müller-deel → eileider met trechter en fimbriae; versmolten onderste deel → baarmoeder + bovenste deel
//   vagina (peervorm in de middellijn, fundus boven); Wolff-buizen verdwijnen (resten: Gartner).
// Ontwerpcoördinaten: ± 360 × 440, oorsprong in het midden; sinus onderaan in het midden.
// Bekende fouten: gonaden onderaan naast de sinus; Müller-buis mediaal van de Wolff-buis over de hele lengte;
// Müller-buizen die gescheiden in de sinus uitkomen; bijbal als losse bol; baarmoeder als driehoek los van de buizen;
// beide buizenparen tegelijk volgroeid laten (in elk geslacht verdwijnt er één).
// =====================================================================================
function aanlegGeslacht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, man = 0, vrouw = 0, hlWolff = 0, hlMuller = 0, hlGonade = 0 } = o;
  const m = ease(clamp(man, 0, 1)), v = ease(clamp(vrouw, 0, 1));
  const P = (px, py) => [x + px * s, y + py * s];
  const mix3 = (i, mm, ff) => i + (mm - i) * m + (ff - i) * v;
  const mixPts = (I, Mm, F) => I.map((p, k) => [mix3(p[0], Mm[k][0], F[k][0]), mix3(p[1], Mm[k][1], F[k][1])]);
  const COL_W = (C.purple || '#8C7BBF'), COL_M = '#D9868A', COL_G = '#C98A6A', COL_S = '#8FA6B8';
  // gonade
  const g = { cx: mix3(82, 80, 88), cy: mix3(-112, -62, -100), rx: mix3(22, 38, 24), ry: mix3(70, 50, 50), rot: mix3(0.06, 0.1, 0.32) };
  const gM = { cx: 80, cy: -62, rx: 38, ry: 50, rot: 0.1 }; // eindstand testis (voor de bijbal)
  const opT = (G, th, dr = 0) => { const lx = Math.cos(th) * (G.rx + dr), ly = Math.sin(th) * (G.ry + dr * 0.8); const c = Math.cos(G.rot), sn = Math.sin(G.rot); return [G.cx + lx * c - ly * sn, G.cy + lx * sn + ly * c]; };
  // Wolff (rechts): ongedifferentieerd / man (bijbal + zaadleider) / vrouw (= ongedifferentieerd, verdwijnt)
  const W_I = [[124, -206], [132, -150], [134, -80], [132, -10], [124, 50], [100, 105], [60, 150], [26, 184], [16, 202]];
  const W_M = [opT(gM, -1.2, 8), opT(gM, -0.6, 9), opT(gM, 0, 9), opT(gM, 0.9, 8), [124, 40], [106, 100], [62, 148], [26, 184], [16, 202]];
  const wolff = mixPts(W_I, W_M, W_I);
  // Müller (rechts): trechter boven lateraal, kruist ventraal naar mediaal
  const M_I = [[162, -202], [164, -140], [162, -70], [156, 0], [144, 55], [112, 96], [66, 132], [24, 156], [6, 166]];
  const M_F = [[116, -160], [148, -164], [170, -128], [174, -62], [156, 0], [122, 34], [88, 46], [62, 52], [44, 52]]; // eileider boogt over de eierstok
  const muller = mixPts(M_I, M_I, M_F);
  // middellijn: versmolten Müller-deel (rechterhelft) → peervormige baarmoeder + bovenste vagina
  const U_I = [[0, 156], [6, 157], [9, 161], [9, 168], [9, 175], [9, 182], [9, 188], [9, 195], [9, 202]];
  const U_F = [[0, 24], [32, 28], [52, 46], [55, 82], [44, 118], [26, 142], [18, 158], [16, 180], [16, 202]];
  const uterus = mixPts(U_I, U_I, U_F);
  const ret = { gonade: P(g.cx, g.cy), wolff: (() => { const q = bioPunt(bioDicht(wolff, 12), 0.5); return P(q[0], q[1]); })(),
    muller: (() => { const q = bioPunt(bioDicht(muller, 12), 0.5); return P(q[0], q[1]); })(), sinus: P(0, 214) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const both = (fn) => { fn(1); ctx.save(); ctx.scale(-1, 1); fn(-1); ctx.restore(); };
  const lijn = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const buisVul = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const rand = (pts, col, lw, al) => { ctx.strokeStyle = lighten(col, 0.4); ctx.globalAlpha *= al; ctx.lineWidth = lw + 2.4; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.globalAlpha /= al; };

  // sinus urogenitalis (onder, midden)
  ctx.beginPath(); bioPad(ctx, [[-56, 212], [-40, 198], [0, 194], [40, 198], [56, 212], [40, 230], [0, 236], [-40, 230]], true); shape(ctx, rgba(COL_S, 0.55), lighten(COL_S, 0.35), 2);
  // oernier (mesonephros): vaag, verdwijnt in beide richtingen grotendeels
  const meso = 1 - 0.85 * Math.max(m, v);
  both(() => { ctx.beginPath(); ctx.ellipse(128, -98, 30, 104, 0.02, 0, 6.283); shape(ctx, rgba('#B9A6C9', 0.14 * meso), rgba('#B9A6C9', 0.3 * meso), 1.5);
    ctx.strokeStyle = rgba('#B9A6C9', 0.35 * meso); ctx.lineWidth = 2; // oerniertubuli
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 26; ctx.beginPath(); ctx.moveTo(131, yy); ctx.bezierCurveTo(118, yy - 6, 122, yy + 10, 108, yy + 6); ctx.stroke(); } });

  // gonaden
  both(() => {
    const p = Math.max(0.6, 1 + 0.7 * v); // amandel: puntiger uiteinden
    const omtrek = []; for (let k = 0; k < 40; k++) { const th = k / 40 * 6.283; const cx = Math.cos(th), sy = Math.sin(th);
      const lx = Math.sign(cx) * Math.pow(Math.abs(cx), p) * g.rx, ly = sy * g.ry; const c = Math.cos(g.rot), sn = Math.sin(g.rot); omtrek.push([g.cx + lx * c - ly * sn, g.cy + lx * sn + ly * c]); }
    if (hlGonade > 0.01) { ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.strokeStyle = rgba('#E8C2AE', 0.28 * hlGonade); ctx.lineWidth = 16; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(COL_G, 0.85), lighten(COL_G, 0.3), 2 + 1.5 * m);
    // testis: zaadstrengen (kronkelende strengen naar het rete aan de achter-bovenkant)
    if (m > 0.02) { ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip(); ctx.strokeStyle = rgba('#8E5A44', 0.55 * m); ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) { const th = 1.9 + k * 0.42; const A = opT(g, th, -4), B = opT(g, -0.9, -g.rx * 0.6); ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        ctx.bezierCurveTo(lerp(A[0], B[0], 0.3) + 6, lerp(A[1], B[1], 0.3) - 6, lerp(A[0], B[0], 0.7) - 6, lerp(A[1], B[1], 0.7) + 6, B[0], B[1]); ctx.stroke(); }
      ctx.restore(); }
    // eierstok: follikels (stipjes in de schors)
    if (v > 0.02) { for (let k = 0; k < 13; k++) { const th = hash(k * 7 + 1) * 6.283, rr = lerp(0.45, 0.78, hash(k * 7 + 2)); const q = [Math.cos(th) * g.rx * rr, Math.sin(th) * g.ry * rr];
        const c = Math.cos(g.rot), sn = Math.sin(g.rot); const fx = g.cx + q[0] * c - q[1] * sn, fy = g.cy + q[0] * sn + q[1] * c; const fr = 2.2 + 2.4 * hash(k * 7 + 3);
        ctx.beginPath(); ctx.arc(fx, fy, fr * v, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.8 * v), rgba('#E2B88E', 0.9 * v), 1); } }
  });

  // Wolff-buizen (achter de Müller-buizen)
  const wAl = 1 - 0.85 * v, wLw = 5 + 2.5 * m - 2.5 * v;
  both(() => {
    if (hlWolff > 0.01) lijn(wolff, '#BBAFE0', wLw + 14, 0.28 * hlWolff * wAl);
    rand(wolff, COL_W, wLw, wAl); buisVul(wolff, COL_W, wLw, wAl);
    if (m > 0.02) { // bijbal: band + kronkelende buis tegen de laterale kant van de testis
      const B = [], K = []; for (let i = 0; i <= 60; i++) { const th = lerp(-1.25, 0.95, i / 60); const p0 = opT(g, th, 8), p1 = opT(g, th, 9 + 5.5 * Math.sin(i * 1.9)); B.push(p0); K.push(p1); }
      ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = lighten(COL_W, 0.4); ctx.lineWidth = 17; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba(COL_W, 1); ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba('#5E4E8C', 0.9); ctx.lineWidth = 2; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // ductuli efferentes van testis naar bijbalkop
      ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { const th = -1.15 + k * 0.17; const A = opT(g, th, -6), Bq = opT(g, th, 4); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bq[0], Bq[1]); ctx.stroke(); }
      // zaadblaasje: knop uit de zaadleider vlak boven de sinus
      const q = bioPunt(bioDicht(wolff, 12), 0.88); ctx.translate(q[0], q[1]); ctx.rotate(q[2] + 2.2); const sz = m;
      ctx.beginPath(); bioPad(ctx, [[0, -4 * sz], [10 * sz, -7 * sz], [20 * sz, -4 * sz], [26 * sz, 0], [20 * sz, 5 * sz], [10 * sz, 7 * sz], [0, 4 * sz]], true); shape(ctx, rgba('#A797D4', 0.95), lighten(COL_W, 0.45), 1.5);
      ctx.restore(); }
  });

  // Müller-buizen (vóór de Wolff-buizen) + trechter/fimbriae + baarmoeder
  const mAl = 1 - 0.9 * m, mLw = 5 - 2.6 * m + 1.2 * v;
  ctx.save(); ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  both(() => {
    if (hlMuller > 0.01) lijn(muller, '#F0B8BA', mLw + 14, 0.28 * hlMuller * mAl);
    rand(muller, COL_M, mLw, mAl); buisVul(muller, COL_M, mLw, mAl);
  });
  ctx.restore();
  both((sd) => { // trechter met (bij de vrouw) fimbriae
    const p0 = muller[0], p1 = muller[1]; let ex = p0[0] - p1[0], ey = p0[1] - p1[1]; const d = Math.hypot(ex, ey); ex /= d; ey /= d;
    if (v > 0.02) { const an = Math.atan2(ey, ex) + 0.6; ex = lerp(ex, Math.cos(an), v); ey = lerp(ey, Math.sin(an), v); const dd = Math.hypot(ex, ey); ex /= dd; ey /= dd; } // trechter naar de eierstok
    const qx = -ey, qy = ex; const rw = 8 + 6 * v, bw = mLw / 2;
    ctx.save(); ctx.globalAlpha *= mAl;
    const bx = p0[0] - ex * 12, by = p0[1] - ey * 12, rx0 = p0[0] + ex * 4, ry0 = p0[1] + ey * 4;
    // fimbriae (vingers rond de rand, wiegen zacht)
    if (v > 0.02) { const nf = 9; for (let k = 0; k < nf; k++) { const f = k / (nf - 1) - 0.5; const sx = rx0 + qx * rw * f * 2, sy = ry0 + qy * rw * f * 2;
        const an = Math.atan2(ey, ex) + f * 2.4 + 0.12 * Math.sin(t * 1.3 + k * 0.9) * sd; const len = (11 + 7 * hash(k + 11)) * v;
        const mx = sx + Math.cos(an) * len * 0.55 + Math.cos(an + 1.57) * 2, my = sy + Math.sin(an) * len * 0.55 + Math.sin(an + 1.57) * 2;
        for (const [col, lw] of [[lighten(COL_M, 0.4), 5.4], [COL_M, 3.2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, sx + Math.cos(an) * len, sy + Math.sin(an) * len); ctx.stroke(); } } }
    ctx.beginPath(); ctx.moveTo(bx + qx * bw, by + qy * bw); ctx.quadraticCurveTo(p0[0] + qx * bw * 1.2, p0[1] + qy * bw * 1.2, rx0 + qx * rw, ry0 + qy * rw);
    ctx.lineTo(rx0 - qx * rw, ry0 - qy * rw); ctx.quadraticCurveTo(p0[0] - qx * bw * 1.2, p0[1] - qy * bw * 1.2, bx - qx * bw, by - qy * bw); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 1.5);
    ctx.beginPath(); ctx.ellipse(rx0, ry0, rw * 0.85, 3, Math.atan2(qy, qx), 0, 6.283); ctx.fillStyle = rgba('#5A2E36', 0.7); ctx.fill(); // opening naar de buikholte
    ctx.restore();
  });
  // versmolten middendeel: uterovaginaal kanaal → baarmoeder (peer) + bovenste vagina
  const UO = uterus.concat(uterus.slice(1).reverse().map(p => [-p[0], p[1]])).slice(0, -1);
  const full = uterus.slice().reverse().map(p => [-p[0], p[1]]).concat(uterus.slice(1));
  ctx.save(); ctx.globalAlpha *= mAl; ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  if (hlMuller > 0.01) { ctx.beginPath(); bioPad(ctx, full, false); ctx.strokeStyle = rgba('#F0B8BA', 0.28 * hlMuller); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, full, false); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 2);
  ctx.setLineDash([]);
  if (v > 0.02) { // baarmoederholte (driehoek) + baarmoederhalskanaal
    ctx.beginPath(); bioPad(ctx, [[0, lerp(150, 44, v)], [lerp(4, 30, v), lerp(152, 46, v)], [lerp(3, 10, v), lerp(160, 104, v)], [0, lerp(165, 130, v)], [lerp(-3, -10, v), lerp(160, 104, v)], [lerp(-4, -30, v), lerp(152, 46, v)]], true);
    ctx.fillStyle = rgba('#7A3A44', 0.55 * v); ctx.fill();
    ctx.strokeStyle = rgba('#7A3A44', 0.55 * v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, lerp(165, 128, v)); ctx.lineTo(0, 200); ctx.stroke(); }
  else { ctx.strokeStyle = rgba('#7A3A44', 0.45); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(0, 200); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// EILEIDER, lengtedoorsnede, horizontaal: links (x0) trechter met fimbriae open naar de eierstok, rechts (x1) de
// smalle isthmus naar de baarmoeder.
// Recept (Junqueira, Basic Histology h. 22; Sadler h. 2–3; Wheater's Functional Histology):
// - Lengte 10–12 cm: trechter (infundibulum) met fimbriae ± 1–2 cm (hier 0–9 %), ampulla ± 2/3 (hier tot ± 70 %),
//   isthmus ± 2–3 cm (laatste 30 %), dan het intramurale deel in de baarmoederwand (niet getekend).
// - Buitendiameter ampulla ± 1 cm, isthmus ± 2–4 mm (hier 0,42×); trechter loopt wijd uit (hier 1,3×).
// - Wand: slijmvlies (eenlagig cilinderepitheel met trilhaarcellen + secretoire 'peg'-cellen, losse lamina
//   propria), spierlaag (binnen circulair, buiten longitudinaal glad spierweefsel; in de ampulla dun, ± 13 % van de
//   straal; in de isthmus dik, ± 40 %), sereus vlies buiten.
// - Slijmvliesplooien: lange, sterk vertakte lengteplooien die een doolhof vormen; in de ampulla veel en hoog
//   (± 55 % van de binnenstraal), in de isthmus weinig en laag, het lumen daar nauw.
// - Trilharen slaan richting baarmoeder (effectieve slag snel, terugslag langzaam), metachrone golf; meeste
//   trilhaarcellen in trechter en ampulla. Bevruchting in de ampulla.
// - Ontsteking (salpingitis, vaak chlamydia): wand en plooien zwellen (oedeem), roder (hyperemie), ontstekingscellen.
//   Litteken: bindweefsel (collageen) vervangt het slijmvlies, plooien verkleven, lumen vernauwt tot bijna dicht →
//   zaadcellen komen er nog net door, het (grotere) embryo niet: buitenbaarmoederlijke zwangerschap/onvruchtbaarheid.
// Bekende fouten: eileider als glad buisje zonder plooien; trilharen die alle kanten op of richting eierstok slaan;
// trechter dicht; isthmus even wijd als de ampulla; litteken als losse bal in het lumen.
// Geeft lumen(u) → [x, y, halve vrije breedte] (tussen de plooitoppen; met litteken).
// =====================================================================================
function eileiderLangs(ctx, x0, x1, y, h, o = {}) {
  const { a = 1, t = 0, ontsteking = 0, litteken = 0, plek = 0.55, trilharen = 1 } = o;
  const L = x1 - x0, H = h / 2, k = H / 90; // k: schaal t.o.v. h = 180
  const X = (u) => x0 + u * L;
  const prof = (u) => {
    const s = ease((u - 0.6) / 0.18); const fl = Math.max(0, 1 - u / 0.09), flare = fl * fl;
    const b = clamp(ontsteking, 0, 1) * Math.exp(-Math.pow((u - 0.5) / 0.12, 2));
    const c = clamp(litteken, 0, 1) * Math.exp(-Math.pow((u - plek) / 0.028, 2));
    const Ho = H * (lerp(1, 0.42, s) + 0.3 * flare + 0.16 * b);
    const mt = Ho * lerp(0.13, 0.56, s) * lerp(1, 0.3, flare) * (1 + 0.25 * b);
    const Hm = Ho - mt; const mu = H * (0.07 + 0.06 * b) * lerp(1, 0.8, s); const He = Hm - mu;
    const fh = Math.min(He - 3 * k, He * lerp(0.64, 0.36, s) * lerp(1, 0.55, flare) * (1 + 0.35 * b)) * (1 - 0.8 * c);
    const Hsc = lerp(He, 1.4 * k, c); // binnenrand littekenweefsel
    return { s, b, c, flare, Ho, Hm, He, fh, Hsc, Hf: Math.min(He - fh, Hsc) };
  };
  const lumen = (u) => { const p = prof(clamp(u, 0, 1)); return [X(clamp(u, 0, 1)), y, p.Hf]; };
  if (a <= 0.01) return { lumen };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const N = 160, U = Array.from({ length: N + 1 }, (_, i) => i / N), PR = U.map(prof);
  const SP = BIO.spier, SPL = BIO.spierL, SL = BIO.slijm, RED = '#C2453E';
  const band = (sd, kA, kB) => { ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i][kA]; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); });
    for (let i = N; i >= 0; i--) ctx.lineTo(X(U[i]), y + sd * PR[i][kB]); ctx.closePath(); };
  // lumen (vocht) iets donkerder dan de achtergrond
  const i0 = Math.round(0.09 * N); // trechter open: geen vocht-vlak vóór de trechter
  ctx.beginPath(); for (let i = i0; i <= N; i++) { const yy = y - PR[i].He; i > i0 ? ctx.lineTo(X(U[i]), yy) : ctx.moveTo(X(U[i]), yy); } for (let i = N; i >= i0; i--) ctx.lineTo(X(U[i]), y + PR[i].He); ctx.closePath();
  ctx.fillStyle = rgba('#0D1420', 0.32); ctx.fill();
  for (const sd of [-1, 1]) {
    // spierlaag
    band(sd, 'Ho', 'Hm'); shape(ctx, rgba(SP, 0.62), rgba(SPL, 0.7), 1.5);
    ctx.save(); band(sd, 'Ho', 'Hm'); ctx.clip();
    ctx.strokeStyle = rgba(SPL, 0.5); ctx.lineWidth = 1.6 * k; // buiten longitudinaal: lange spoelvormige vezels
    for (let xx = x0 + 6; xx < x1; xx += 30 * k) { const u = (xx - x0) / L, p = prof(u); const yy = y + sd * lerp(p.Ho, p.Hm, 0.22); ctx.beginPath(); ctx.ellipse(xx + (hash(xx) - 0.5) * 8, yy, 13 * k, 1.8 * k, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = rgba(SPL, 0.45); // binnen circulair: dwars getroffen vezels (puntjes), meer rijen waar de laag dik is
    for (let xx = x0 + 4; xx < x1; xx += 9 * k) { const u = (xx - x0) / L, p = prof(u); const mt = p.Ho - p.Hm; const rows = Math.max(1, Math.floor(mt * 0.55 / (6 * k)));
      for (let r = 0; r < rows; r++) { const f = 0.5 + (r + 0.5) / rows * 0.42; ctx.beginPath(); ctx.ellipse(xx + (r % 2) * 4 * k, y + sd * lerp(p.Ho, p.Hm, f), 2.2 * k, 1.5 * k, 0, 0, 6.283); ctx.fill(); } }
    ctx.restore();
    // sereus vlies
    ctx.strokeStyle = rgba('#E8D8DE', 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * (PR[i].Ho + 1.5); i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke();
    // slijmvlies (basis)
    band(sd, 'Hm', 'He'); ctx.fillStyle = rgba(SL, 0.8); ctx.fill();
    // ontsteking: wand roder (vlakke stroken, geen verloop)
    if (ontsteking > 0.01) { ctx.save(); band(sd, 'Ho', 'He'); ctx.clip(); for (let xx = Math.floor(x0); xx < x1; xx += 3) { const p = prof((xx - x0) / L); if (p.b < 0.01) continue; ctx.fillStyle = rgba(RED, 0.42 * p.b); ctx.fillRect(xx, y - H * 2, 3, H * 4); } ctx.restore(); }
  }
  // plooien: veel, hoog en vertakt in de ampulla; weinig en laag in de isthmus
  const plooien = [];
  for (const sd of [-1, 1]) { let xx = X(0.03) + (sd > 0 ? 9 * k : 0), i = 0;
    while (xx < x1 - 6) { const u = (xx - x0) / L, p = prof(u); const hh = p.fh * (0.72 + 0.28 * hash(i * 13 + sd * 7));
      if (hh > 2) { const by = y + sd * (p.He + 2), ty = by - sd * hh; const lean = (hash(i * 5 + sd) - 0.5) * hh * 0.35;
        const trunk = [[xx, by], [xx + lean * 0.3, lerp(by, ty, 0.35)], [xx + lean * 0.7 + (hash(i + 3) - 0.5) * 4 * k, lerp(by, ty, 0.7)], [xx + lean, ty]];
        const tak = []; const nt = p.s < 0.5 ? (hash(i * 3 + 1) < 0.75 ? 1 + (hash(i * 3 + 2) < 0.5 ? 1 : 0) : 0) : (hash(i * 3 + 1) < 0.25 ? 1 : 0);
        for (let j = 0; j < nt; j++) { const f = 0.35 + 0.25 * j + 0.1 * hash(i * 9 + j); const r0 = [lerp(trunk[0][0], trunk[3][0], f), lerp(by, ty, f)]; const dir = (j % 2 ? 1 : -1) * (hash(i + j * 17) < 0.5 ? 1 : -1);
          const ln = hh * (0.32 + 0.15 * hash(i * 7 + j)); const an = 0.75; const e = [r0[0] + dir * Math.sin(an) * ln, r0[1] - sd * Math.cos(an) * ln];
          tak.push([r0, [lerp(r0[0], e[0], 0.5) + dir * 2, lerp(r0[1], e[1], 0.5) + sd * 2], e]); }
        plooien.push({ trunk, tak, w: lerp(9, 7, p.s) * k * (1 + 0.55 * p.b), col: _bioMix(SL, '#C8504A', p.b * 0.75), sd, u }); }
      xx += H * lerp(0.27, 0.85, p.s) * (0.8 + 0.4 * hash(i * 11 + sd * 3)); i++; } }
  const strokeP = (pts, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  plooien.forEach(pl => { const e = lighten(pl.col.replace(/rgb\((\d+),(\d+),(\d+)\)/, (q, r, g, b) => '#' + [r, g, b].map(n => (+n).toString(16).padStart(2, '0')).join('')), 0.35); strokeP(pl.trunk, pl.w + 2.4, e); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75 + 2.4, e)); });
  plooien.forEach(pl => { strokeP(pl.trunk.slice(0, 2), pl.w * 1.7 + 2.4, lighten('#D58A8A', 0.35)); });
  plooien.forEach(pl => { strokeP(pl.trunk, pl.w, pl.col); strokeP(pl.trunk.slice(0, 2), pl.w * 1.7, pl.col); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75, pl.col)); }); // plooi breder aan de voet
  plooien.forEach(pl => { const cc = rgba('#9E4A44', 0.45); strokeP(pl.trunk.slice(0, 3).concat([[lerp(pl.trunk[2][0], pl.trunk[3][0], 0.5), lerp(pl.trunk[2][1], pl.trunk[3][1], 0.5)]]), pl.w * 0.28, cc); pl.tak.forEach(tk => strokeP(tk.slice(0, 2), pl.w * 0.22, cc)); });
  // epitheelrand van de basis
  for (const sd of [-1, 1]) { ctx.strokeStyle = rgba('#F2C4BC', 0.75); ctx.lineWidth = 2; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i].He; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke(); }
  // fimbriae aan de trechterrand (vingers die zacht wiegen)
  const fim = [];
  for (const sd of [-1, 1]) { const p0 = prof(0); for (let j = 0; j < 6; j++) { const u0 = 0.004 + 0.012 * j; const pj = prof(u0); const bx = X(u0), by = y + sd * lerp(pj.He, pj.Hm, 0.4);
      const len = (38 + 22 * hash(j * 3 + (sd > 0 ? 50 : 0))) * k; const an0 = Math.PI - sd * (0.1 + 0.13 * j) * (j % 2 ? 1 : 0.7);
      const pts = []; for (let q = 0; q <= 6; q++) { const f = q / 6; const an = an0 + sd * 0.35 * f * f + 0.12 * Math.sin(t * 0.9 + j * 1.3 + f * 2) * f; const prev = q ? pts[q - 1] : [bx, by]; pts.push(q ? [prev[0] + Math.cos(an) * len / 6, prev[1] + Math.sin(an) * len / 6] : [bx, by]); }
      fim.push({ pts, w0: (11 - j * 0.6) * k, sd }); } }
  const fimPoly = (f) => { const l = [], r = []; f.pts.forEach((p, q) => { const nx = f.pts[Math.min(q + 1, 6)], pv = f.pts[Math.max(q - 1, 0)]; let dx = nx[0] - pv[0], dy = nx[1] - pv[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const w = f.w0 * lerp(1, 0.35, q / 6) / 2; l.push([p[0] - dy * w, p[1] + dx * w]); r.push([p[0] + dy * w, p[1] - dx * w]); }); return l.concat(r.reverse()); };
  fim.forEach(f => { ctx.beginPath(); bioPad(ctx, fimPoly(f), true); shape(ctx, rgba(SL, 0.92), lighten(SL, 0.35), 1.6); strokeP(f.pts.slice(0, 5), f.w0 * 0.22, rgba('#9E4A44', 0.4)); });
  // trilharen: effectieve slag snel richting baarmoeder (+x), terugslag langzaam; golf loopt naar rechts
  if (trilharen > 0.01) {
    const cl = 5.5 * Math.max(0.7, k); const beat = (xx) => { let ph = ((xx * 0.05 - t * 5.5) / 6.283) % 1; if (ph < 0) ph += 1; return ph < 0.3 ? lerp(-0.55, 0.75, ease(ph / 0.3)) : lerp(0.75, -0.55, ease((ph - 0.3) / 0.7)); };
    ctx.save(); ctx.globalAlpha *= clamp(trilharen, 0, 1); ctx.strokeStyle = rgba('#F6E8E2', 0.7); ctx.lineWidth = 1.1; ctx.beginPath();
    const tril = (rx, ry, nx, ny, axis) => { let tx = -ny, ty = nx; if (tx < 0 || (Math.abs(tx) < 0.2 && (axis - ry) * ty < 0)) { tx = -tx; ty = -ty; } const th = beat(rx);
      const dx = nx * Math.cos(th) + tx * Math.sin(th), dy = ny * Math.cos(th) + tx * 0 + ty * Math.sin(th);
      ctx.moveTo(rx, ry); ctx.quadraticCurveTo(rx + nx * cl * 0.6, ry + ny * cl * 0.6, rx + dx * cl, ry + dy * cl); };
    const langs = (pts, w, sd, stap) => { const D = bioDicht(pts, 6); let acc = 0; for (let q = 1; q < D.length; q++) { const dx = D[q][0] - D[q - 1][0], dy = D[q][1] - D[q - 1][1], d = Math.hypot(dx, dy); acc += d; if (acc < stap || d < 1e-6) continue; acc = 0;
        if (hash(Math.round(D[q][0] * 3 + D[q][1])) < 0.22) continue; // secretoire cel zonder trilharen
        for (const zz of [-1, 1]) { const nx = -dy / d * zz, ny = dx / d * zz; tril(D[q][0] + nx * (w / 2 + 1), D[q][1] + ny * (w / 2 + 1), nx, ny, y); } } };
    for (const sd of [-1, 1]) for (let xx = x0 + 3; xx < x1; xx += 5 * Math.max(0.8, k)) { const p = prof((xx - x0) / L); if (hash(Math.round(xx) * 7 + sd) < 0.25 + 0.15 * p.s) continue; tril(xx, y + sd * (p.He + 1), 0, -sd, y); }
    plooien.forEach(pl => { langs(pl.trunk, pl.w, pl.sd, 5.5 * k); pl.tak.forEach(tk => langs(tk, pl.w * 0.75, pl.sd, 6 * k)); });
    fim.forEach(f => langs(f.pts.slice(2), f.w0 * 0.55, f.sd, 9 * k));
    ctx.stroke(); ctx.restore();
  }
  // ontsteking: wijde vaatjes in het slijmvlies + ontstekingscellen in het lumen
  if (ontsteking > 0.01) { for (let j = 0; j < 14; j++) { const u = 0.36 + 0.28 * hash(j * 3 + 1), p = prof(u); if (p.b < 0.05) continue; const sd = j % 2 ? 1 : -1;
      ctx.strokeStyle = rgba(RED, 0.8 * p.b); ctx.lineWidth = 2.6 * k; ctx.beginPath(); const xx = X(u), yy = y + sd * lerp(p.He, p.Hm, 0.5); ctx.moveTo(xx - 14 * k, yy); ctx.bezierCurveTo(xx - 5 * k, yy - 4 * k, xx + 5 * k, yy + 4 * k, xx + 14 * k, yy); ctx.stroke(); }
    for (let j = 0; j < 9; j++) { const u = 0.4 + 0.2 * hash(j * 5 + 2), p = prof(u); if (p.b < 0.1) continue; const xx = X(u), yy = y + (hash(j * 5 + 3) - 0.5) * 1.4 * p.Hf; const r = 4.5 * k;
      ctx.save(); ctx.globalAlpha *= p.b; ctx.beginPath(); ctx.arc(xx, yy, r, 0, 6.283); shape(ctx, rgba('#E8ECF0', 0.85), '#FFFFFF', 1); ctx.fillStyle = rgba((C.purple || '#8C7BBF'), 0.85);
      for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(xx + Math.cos(q * 2.1 + j) * r * 0.4, yy + Math.sin(q * 2.1 + j) * r * 0.4, r * 0.3, 0, 6.283); ctx.fill(); } ctx.restore(); } }
  // litteken: bindweefsel vanuit de wand dat het lumen vernauwt
  if (litteken > 0.01) { const ua = clamp(plek - 0.08, 0, 1), ub = clamp(plek + 0.08, 0, 1); const M = 60;
    for (const sd of [-1, 1]) { const outer = [], inner = []; for (let i = 0; i <= M; i++) { const u = lerp(ua, ub, i / M), p = prof(u); outer.push([X(u), y + sd * (p.Hm - 1)]); inner.push([X(u), y + sd * lerp(p.Hm - 1, 1.4 * k, p.c)]); } // dikte → 0 aan de randen
      ctx.beginPath(); outer.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let i = M; i >= 0; i--) ctx.lineTo(inner[i][0], inner[i][1]); ctx.closePath();
      shape(ctx, rgba('#D9CFC2', 0.95), null); ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#A8988A', 0.55); ctx.lineWidth = 1.4; // collageenvezels
      for (let r = 1; r < 7; r++) { ctx.beginPath(); for (let i = 0; i <= M; i++) { const f = r / 7; const yy = lerp(outer[i][1], inner[i][1], f) + Math.sin(i * 0.9 + r * 2) * 1.5; i ? ctx.lineTo(outer[i][0], yy) : ctx.moveTo(outer[i][0], yy); } ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = rgba('#F2ECE4', 0.85); ctx.lineWidth = 1.6; ctx.beginPath(); inner.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); } }
  // snijvlak rechts (naar de baarmoeder)
  const pe = prof(1); ctx.strokeStyle = rgba('#E8D8DE', 0.5); ctx.lineWidth = 1.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x1, y + sd * pe.Ho); ctx.lineTo(x1, y + sd * pe.He); ctx.stroke(); }
  ctx.restore();
  return { lumen };
}

// =====================================================================================
// ZWANGERSCHAPSTEST (lateral-flow test), horizontaal: zuigstaafje links, plastic behuizing, ovaal uitleesvenster,
// duimgreep rechts. Recept: echte test ± 13–15 cm × 2 cm (hier 640 × 120 px, verhouding ± 5,3 : 1); zuiggedeelte
// ± 3–4 cm, iets smaller dan de behuizing; venster ± 1/4 van de lengte, in het midden; daarin een witte strook
// (nitrocellulose) met eerst de testlijn T (antistoffen tegen hCG) en daarna de controlelijn C (vangt de losse
// gekleurde antistof). Urine trekt door capillaire werking van links naar rechts: zuigstaaf → strook → zuigkussen
// achter het venster. Een roze/paarse waas (gekleurde antistof-goudkorrels) trekt over de strook; lijnen verschijnen
// pas als het vochtfront ze voorbij is. Lijnkleur roze-paars (colloïdaal goud). Bron: FDA 'Pregnancy tests';
// Koczula & Gallotta 2016 (Lateral flow assays). Bekende fouten: lijnen al zichtbaar vóór de urine er is;
// C-lijn vóór de T-lijn (C ligt verst van de urine); venster aan de duimkant.
// Ontwerpcoördinaten ± 640 × 120, oorsprong in het midden.
// =====================================================================================
function zwangerschapstest(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, urine = 0, T = 0, Cl = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const VX0 = -70, VX1 = 120, VH = 22, XT = 2, XC = 62, STR = 13;
  const ret = { tip: P(-320, 0), venster: [...P(VX0, -VH), ...P(VX1, VH)], T: P(XT, 0), C: P(XC, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const u = clamp(urine, 0, 1); // vochtfront: 0–0,35 zuigstaaf, 0,35–0,45 onder de behuizing, 0,45–1 door het venster
  const xf = u < 0.35 ? lerp(-326, -190, u / 0.35) : u < 0.45 ? lerp(-190, VX0, (u - 0.35) / 0.1) : lerp(VX0, VX1 + 30, (u - 0.45) / 0.55);
  const front = (yy) => xf + 3 * Math.sin(yy * 0.25 + t * 2.0) + 2 * Math.sin(yy * 0.6 - t * 1.3);
  const nat = (pathFn, y0, y1, col, al) => { if (u <= 0.001) return; ctx.save(); pathFn(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-340, y0); for (let yy = y0; yy <= y1; yy += 2) ctx.lineTo(front(yy), yy); ctx.lineTo(-340, y1); ctx.closePath(); ctx.fillStyle = rgba(col, al); ctx.fill(); ctx.restore(); };
  // zuigstaafje (steekt links uit)
  const wick = () => { ctx.beginPath(); roundRect(ctx, -320, -32, 130, 64, 14); };
  wick(); shape(ctx, '#E6E2EC', '#FFFFFF', 1.5);
  ctx.save(); wick(); ctx.clip(); ctx.strokeStyle = rgba('#B8B2C4', 0.45); ctx.lineWidth = 1.2; for (let k = 0; k < 7; k++) { const yy = -26 + k * 8.6; ctx.beginPath(); ctx.moveTo(-318, yy); ctx.bezierCurveTo(-280, yy + 2, -240, yy - 2, -190, yy + 1); ctx.stroke(); } ctx.restore();
  nat(wick, -34, 34, '#D8C25A', 0.38);
  // behuizing
  const HUIS = [[-212, -40], [-160, -50], [-60, -56], [120, -57], [250, -55], [300, -48], [318, -26], [320, 0], [318, 26], [300, 48], [250, 55], [120, 57], [-60, 56], [-160, 50], [-212, 40], [-222, 0]];
  ctx.beginPath(); bioPad(ctx, HUIS, true); shape(ctx, '#D9DFE7', '#F4F7FA', 2);
  ctx.beginPath(); bioPad(ctx, HUIS.map(([px, py]) => [px * 0.97 + 4, py * 0.8]), true); ctx.strokeStyle = rgba('#AEB8C6', 0.6); ctx.lineWidth = 1.5; ctx.stroke(); // naad
  // venster: verdiepte rand, witte strook, lijnen
  const venster = (r = 0) => { ctx.beginPath(); roundRect(ctx, VX0 - r, -VH - r, VX1 - VX0 + 2 * r, 2 * VH + 2 * r, VH + r); };
  venster(6); shape(ctx, '#C3CBD6', '#EEF2F6', 1.5);
  venster(); ctx.fillStyle = '#5E6878'; ctx.fill();
  const strook = () => { ctx.beginPath(); ctx.rect(VX0, -STR, VX1 - VX0, 2 * STR); };
  ctx.save(); venster(); ctx.clip(); strook(); ctx.fillStyle = '#F4F2EE'; ctx.fill();
  nat(strook, -STR, STR, '#C9C4BA', 0.35); // natte strook iets grijzer
  if (u > 0.001) { ctx.save(); strook(); ctx.clip(); const wb = 46; // roze waas vlak achter het front
    for (let yy = -STR; yy < STR; yy += 2) { const fx = front(yy); const fade = clamp((VX1 + 30 - xf) / 40, 0, 1); ctx.fillStyle = rgba('#D88AB4', 0.32 * fade); ctx.fillRect(fx - wb, yy, wb, 2); } ctx.restore(); }
  const lijn = (lx, k) => { const zicht = clamp((xf - lx - 4) / 22, 0, 1) * clamp(k, 0, 1); if (zicht <= 0.01) return; ctx.fillStyle = rgba('#B4407E', 0.92 * zicht); ctx.fillRect(lx - 3.5, -STR, 7, 2 * STR); };
  lijn(XT, T); lijn(XC, Cl);
  ctx.restore();
  venster(); ctx.strokeStyle = rgba('#3E4858', 0.7); ctx.lineWidth = 2; ctx.stroke();
  // duimgreep: ovale holte met ribbels
  ctx.beginPath(); ctx.ellipse(238, 0, 54, 34, 0, 0, 6.283); shape(ctx, '#CDD4DE', '#EEF2F6', 1.5);
  ctx.strokeStyle = rgba('#9EA9B8', 0.75); ctx.lineWidth = 2.4; for (let k = -3; k <= 3; k++) { const xx = 238 + k * 13; const hh = 30 * Math.sqrt(Math.max(0, 1 - Math.pow((xx - 238) / 54, 2))) - 5; ctx.beginPath(); ctx.moveTo(xx, -hh); ctx.quadraticCurveTo(xx + 3, 0, xx, hh); ctx.stroke(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: placenta in doorsnede, vlok vergroot
// =====================================================================================
// =====================================================================================
// obj_placenta.js — placenta (doorsnede) en één vlok vergroot, voor lib_bio.js (prompt v8, C9 Tekenrecepten)
// Vereist: lib_bio.js (BIO, bioDicht, bioPunt, bioPad) en de globale hulpjes C, rgba, lighten, hash, clamp, lerp,
// ease, shape, roundRect. Kleurtaal zuurstof: zuurstofrijk bloed rood (BIO.bloed), zuurstofarm FOETAAL bloed
// blauwpaars (PLAC.arm), zuurstofarm MOEDERLIJK bloed in de aders blauw (BIO.ader).
// =====================================================================================

const PLAC = {
  arm: '#7E5EA8',      // zuurstofarm foetaal bloed (navelstrengslagaders, chorionslagaders, begin haarvatlus)
  vlok: '#D7A596',     // vlokweefsel (bindweefselkern), lichtroze-beige
  syn: '#E8C27E',      // syncytiotrofoblast: goudgetinte buitenlaag
  synD: '#B8924E',
  chorion: '#CDB4BC',  // chorionplaat (bindweefsel)
  amnion: '#E9DDE4',
  streng: '#D8CDD6',   // navelstreng (gelei van Wharton)
  meer: '#C2453E',     // moederbloed in de intervilleuze ruimte (met lage dekking)
  lumen: '#3A1A22'
};
function _plMix(h1, h2, u) { // twee hex-kleuren mengen, vlakke kleur (geen verloop)
  const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(h1), B = p(h2); u = clamp(u, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], u))},${Math.round(lerp(A[1], B[1], u))},${Math.round(lerp(A[2], B[2], u))})`;
}
function _plCel(ctx, x, y, r, an, kant, col) { // rode bloedcel (ingedeukte schijf) met eigen kleur
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const ry = r * lerp(1, 0.34, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, col, lighten(col[0] === '#' ? col : '#C2453E', 0.25), Math.max(0.8, r * 0.09));
  ctx.beginPath(); ctx.ellipse(0, 0, r * (kant > 0.8 ? 0.3 : 0.45), ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#3A0E1E', 0.3); ctx.fill();
  ctx.restore();
}
function _plLijn(ctx, P, off, lw, col, g = 1) { // polylijn met zijwaartse verschuiving (off, in px) tot fractie g
  const n = Math.max(2, Math.ceil(P.length * clamp(g, 0, 1))); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; const an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const q = [P[i][0] - Math.sin(an) * off, P[i][1] + Math.cos(an) * off]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
  ctx.stroke();
}

// =====================================================================================
// PLACENTA, DOORSNEDE (stuk uit het midden, foetale kant boven, baarmoederwand onder).
// Recept (Sadler, Langman's Medical Embryology h. 8 'Placenta'; Junqueira h. 22; Benirschke 'Pathology of the
// Human Placenta'): voldragen placenta schijf van 15–25 cm doorsnede en 2–3 cm dik, 500–600 g. Lagen van boven
// naar onder: amnion (dun vlies) – chorionplaat (± 1 mm, met de chorionvaten) – intervilleuze ruimte met de
// vlokkenbomen (± 2 cm) – basale plaat / decidua basalis (± 1 mm) – spierlaag. Septa (placentasepta) steken
// vanuit de basale plaat omhoog maar bereiken de chorionplaat NIET; ze verdelen de placenta in 15–20 kwabben
// (cotyledonen). Per kwab één (of enkele) stamvlok uit de chorionplaat, die zich 3–4× vertakt (stamvlok ± 150 µm,
// intermediaire vlok ± 80 µm, eindvlokjes 40–80 µm, elk met een haarvatlus); enkele hechtvlokken lopen door tot
// in de basale plaat. De vlokkenboom vormt een klok met een vlokarm midden (centrale holte) recht boven de
// opening van een spiraalslagader. Ongeveer 80–100 spiraalslagaders (verbreed, trechtervormige monding) spuiten
// moederbloed omhoog tot tegen de chorionplaat; het zakt langs de vlokken terug en loopt via aderopeningen in de
// basale plaat (bij de septa) weg. Intervilleuze ruimte ± 150 ml, 2–3× per minuut ververst. Navelstreng: 2
// slagaders (zuurstofarm, van het kind naar de placenta) die spiraalsgewijs om 1 ader (zuurstofrijk, naar het
// kind) draaien, in gelei van Wharton; meestal iets uit het midden aangehecht. Moederbloed en kindbloed mengen
// niet: er ligt altijd vlokweefsel tussen.
// Hier: 5 kwabben van elk 260 breed in een stuk van 1300 × 560 (ontwerpcoördinaten, oorsprong = midden).
// Lagen verticaal ± 2,5× overdreven t.o.v. de breedte (anders is de vlokkenboom onleesbaar). Rode bloedcellen in
// het overzicht ± 2× te groot (r 3,5) zodat de stroom zichtbaar is; vlokdiktes onderling wel in verhouding.
// Bekende fouten: moederbloed dat in de vlokvaten stroomt (mengen); vlokken als losse vingers zonder boom;
// septa die tot de chorionplaat lopen; navelstrengslagaders rood getekend in een zuurstofverhaal (ze voeren
// zuurstofarm bloed); vlokken die nergens vastzitten (geen hechtvlokken); aders zonder afvoer; spiraalslagader
// als rechte buis zonder trechter.
// =====================================================================================
const _PL = { yAm: -188, yCh0: -184, yCh1: -150, yBas: 170, yMy: 232, yOnder: 280, kw: 260, nKw: 5 };
function _plBomen() {
  if (_bioPolyCache.placentaBomen) return _bioPolyCache.placentaBomen;
  const segs = [], toppen = [], stammen = [];
  const binnen = (x, y, cx) => [clamp(x, cx - 112, cx + 112), clamp(y, _PL.yCh1 + 14, _PL.yBas - 6)];
  const seg = (x0, y0, ang, len, w, d, sd, cx, extra = {}) => {
    const bend = (hash(sd * 3.1 + 7) - 0.5) * 0.5;
    let [x1, y1] = binnen(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len, cx);
    const mx = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * len * bend * 0.3, my = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * len * bend * 0.3;
    const P = []; for (let i = 0; i <= 10; i++) { const u = i / 10; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); }
    const s = Object.assign({ P, w, d, leaf: false, cx }, extra); segs.push(s); return s;
  };
  // zijtakken (intermediaire vlokken → eindvlokjes) aan een segment
  const takken = (s, sd, n, maxD) => {
    for (let k = 0; k < n; k++) { const f = 0.35 + 0.5 * (k + hash(sd + k * 5)) / n; const [px, py, an] = bioPunt(s.P, f);
      const kant = (k + Math.floor(hash(sd * 2 + 1) * 2)) % 2 ? 1 : -1; const ang = an + kant * (0.7 + 0.5 * hash(sd + k * 11));
      const d = s.d + 1; const len = (d === 2 ? 52 : 30) * (0.8 + 0.4 * hash(sd + k * 13)); const w = Math.max(7, s.w * 0.64);
      const c = seg(px, py, ang, len, w, d, sd * 7 + k, s.cx, { pw: s.w });
      if (d < maxD) takken(c, sd * 7 + k + 3, 2, maxD); else { c.leaf = true; const e = c.P[10]; toppen.push([e[0], e[1], w * 0.85]); } }
  };
  for (let k = 0; k < _PL.nKw; k++) {
    const cx = (k - (_PL.nKw - 1) / 2) * _PL.kw; const sx = cx + (hash(k * 9 + 1) - 0.5) * 30, sd = 100 + k * 37;
    // stamvlok uit de chorionplaat naar beneden, splitst in twee armen (klokvorm rond de centrale holte)
    const stam = seg(sx, _PL.yCh1 - 4, Math.PI / 2 + (hash(sd) - 0.5) * 0.15, 92, 24, 0, sd, cx); stammen.push([sx, cx]);
    takken(stam, sd + 1, 2, 3);
    for (const z of [-1, 1]) {
      const e = stam.P[10]; const arm = seg(e[0], e[1], Math.PI / 2 - z * 0.62, 118, 17, 1, sd + z * 5, cx, { pw: 10 });
      takken(arm, sd + z * 13, 3, 3);
      // hechtvlok: loopt door tot in de basale plaat (verankering)
      const a2 = arm.P[10]; const tx = cx + z * (88 + 14 * hash(sd + z)); const hecht = seg(a2[0], a2[1], Math.atan2(_PL.yBas + 8 - a2[1], tx - a2[0]), Math.hypot(_PL.yBas + 8 - a2[1], tx - a2[0]), 13, 2, sd + z * 17, cx, { anker: true, pw: 10 });
      hecht.P[10] = [tx, _PL.yBas + 8];
      takken(hecht, sd + z * 19, 2, 3);
    }
  }
  segs.sort((A, B) => A.d - B.d);
  return (_bioPolyCache.placentaBomen = { segs, toppen, stammen });
}

function placentaDoorsnede(ctx, x, y, w = 1300, h = 560, o = {}) {
  const { a = 1, t = 0, vlokken = 1, moederbloed = 1, navel = 1, focus = -1, kind = null, kleurO2 = true } = o;
  const S = w / 1300, Sy = h / 560, P = (lx, ly) => [x + lx * S, y + ly * Sy];
  const B = _plBomen(); const midTop = B.toppen.reduce((best, p) => (Math.hypot(p[0] - 40, p[1] + 10) < Math.hypot(best[0] - 40, best[1] + 10) ? p : best), B.toppen[0]);
  const NAV = [-70, _PL.yAm];
  const ret = { navel: P(NAV[0], NAV[1]), vlokTop: P(midTop[0], midTop[1]), moederbloed: P(-30, 60), slagader: P(0, _PL.yBas), wand: P(0, (_PL.yBas + _PL.yOnder) / 2),
    toppen: B.toppen.map(p => P(p[0], p[1])) };
  if (a <= 0.01) return ret;
  const ARM = kleurO2 ? PLAC.arm : BIO.bloed, RIJK = kleurO2 ? BIO.bloed : BIO.ader; // kleurO2 false = anatomisch (slagader rood, ader blauw), zoals castNavelstreng // navelstreng: slagaders ARM, ader RIJK
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -650, R = 650; const kws = Array.from({ length: _PL.nKw }, (_, k) => (k - (_PL.nKw - 1) / 2) * _PL.kw);

  // ---- 1. intervilleuze ruimte (leeg = donker) en moederbloed dat van onder vult --------------------
  ctx.fillStyle = rgba('#0F1724', 0.55); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
  const mb = clamp(moederbloed, 0, 1), peil = lerp(_PL.yBas, _PL.yCh1, ease(mb));
  ctx.save(); ctx.beginPath(); ctx.rect(L, peil, R - L, _PL.yBas - peil); ctx.clip();
  if (mb > 0.01) {
    ctx.fillStyle = rgba(PLAC.meer, 0.3); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
    // straal: vlakke, iets lichtere fontein boven elke slagadermonding (zelfde vorm als de stroombanen)
    kws.forEach(cx => { ctx.beginPath(); ctx.moveTo(cx - 12, _PL.yBas); ctx.bezierCurveTo(cx - 10, 40, cx - 30, -100, cx - 90, -138); ctx.lineTo(cx + 90, -138); ctx.bezierCurveTo(cx + 30, -100, cx + 10, 40, cx + 12, _PL.yBas); ctx.closePath(); ctx.fillStyle = rgba('#E07A6A', 0.16 * mb); ctx.fill(); });
    // stroom per kwab: straal omhoog uit de spiraalslagader, langs de chorionplaat opzij, langs de vlokken terug naar de aderopening
    kws.forEach((cx, k) => { for (const z of [-1, 1]) {
      const pad = bioDicht([[cx, _PL.yBas + 2], [cx + z * 4, 40], [cx + z * 12, -80], [cx + z * 55, -132], [cx + z * 112, -110], [cx + z * 120, 0], [cx + z * 116, 100], [cx + z * 108, _PL.yBas + 2]], 12);
      const n = Math.round(14 * mb); for (let i = 0; i < n; i++) { const sd = k * 97 + (z + 1) * 31 + i * 3.7;
        const u0 = ((t * 0.07 * (0.8 + 0.4 * hash(sd)) + hash(sd + 1)) % 1 + 1) % 1; const u = 1 - Math.pow(1 - u0, 1.8); // snel uit de monding, daarna trager
        const [px, py, an] = bioPunt(pad, u); const sp = (hash(sd + 2) - 0.5) * lerp(6, 46, Math.min(1, u * 3));
        _plCel(ctx, px - Math.sin(an) * sp, py + Math.cos(an) * sp, 3.5, an + t * (0.5 + hash(sd + 3)), 0.5 + 0.5 * Math.sin(t * 1.5 + i), BIO.bloed); } } });
    // rustig drijvende cellen in de meren
    for (let i = 0; i < Math.round(60 * mb); i++) { const bx = L + 10 + hash(i * 5.3 + 2) * (R - L - 20), by = _PL.yCh1 + 14 + hash(i * 5.3 + 3) * (_PL.yBas - _PL.yCh1 - 28);
      _plCel(ctx, bx + Math.sin(t * 0.4 + i) * 6, by + ((t * 4 * (0.5 + hash(i + 9))) % 20) - 10, 3.5, i + t * 0.3, 0.5 + 0.5 * Math.sin(t + i * 2), BIO.bloed); }
  }
  ctx.restore();

  // ---- 2. basale plaat (decidua basalis) met septa, en spierlaag ----------------------------------
  // spierlaag (context, halve detailmaat)
  ctx.fillStyle = rgba(BIO.spier, 0.5); ctx.fillRect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy);
  ctx.save(); ctx.beginPath(); ctx.rect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.4); ctx.lineWidth = 1.5;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) { ctx.beginPath(); ctx.ellipse(L + (c + (r % 2) * 0.5) * 62, _PL.yMy + 10 + r * 15, 26, 3, 0.05 * Math.sin(c * 3 + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // decidua basalis + septa (wiggen omhoog tot ± 2/3 van de hoogte, niet tot de chorionplaat)
  const basPad = () => { ctx.beginPath(); ctx.moveTo(L, _PL.yMy); ctx.lineTo(L, _PL.yBas);
    for (let k = 0; k < _PL.nKw - 1; k++) { const sx = (kws[k] + kws[k + 1]) / 2, top = -10 - 30 * hash(k * 3 + 5);
      ctx.lineTo(sx - 34, _PL.yBas); ctx.bezierCurveTo(sx - 16, _PL.yBas - 30, sx - 16, top + 30, sx - 9, top + 6); ctx.quadraticCurveTo(sx, top - 8, sx + 9, top + 6); ctx.bezierCurveTo(sx + 16, top + 30, sx + 16, _PL.yBas - 30, sx + 34, _PL.yBas); }
    ctx.lineTo(R, _PL.yBas); ctx.lineTo(R, _PL.yMy); ctx.closePath(); };
  basPad(); shape(ctx, _plMix('#1A2740', BIO.slijm, 0.72), null);
  // deciduacellen (grote bleke cellen), rustig
  ctx.save(); basPad(); ctx.clip(); ctx.strokeStyle = rgba('#F6E2D6', 0.22); ctx.lineWidth = 1.2;
  for (let i = 0; i < 70; i++) { const cx2 = L + hash(i * 3.3) * (R - L), cy2 = _PL.yBas + 6 + hash(i * 3.3 + 1) * (_PL.yMy - _PL.yBas - 10); ctx.beginPath(); ctx.ellipse(cx2, cy2, 9, 6, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // bovenrand basale plaat lichter
  ctx.save(); basPad(); ctx.clip(); basPad(); ctx.strokeStyle = rgba('#F6E2D6', 0.7); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();

  // moederlijke aders: twee openingen aan weerszijden van elk septum (en aan de randen), die onder het septum samenkomen
  // en schuin door de spierlaag weglopen (blauw, zuurstofarm moederbloed). Dunner dan de spiraalslagaders.
  const septX = [L - 0, ...kws.slice(0, -1).map((c, k) => (c + kws[k + 1]) / 2), R];
  septX.forEach((sx, k) => { const opn = [sx - 40, sx + 40].filter(ox => ox > L + 6 && ox < R - 6); const vx = clamp(sx, L + 14, R - 14), vy = _PL.yMy - 6;
    opn.forEach(ox => { ctx.beginPath(); bioPad(ctx, [[ox, _PL.yBas - 1], [lerp(ox, vx, 0.35), _PL.yBas + 26], [vx, vy]], false); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 7; ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(vx, vy); ctx.quadraticCurveTo(vx + 4, _PL.yMy + 24, vx + 14, _PL.yOnder + 4); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 12; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 9; ctx.stroke();
    opn.forEach(ox => { ctx.beginPath(); ctx.ellipse(ox, _PL.yBas, 7, 2.5, 0, 0, 6.283); ctx.fillStyle = rgba(PLAC.lumen, 0.9); ctx.fill(); }); });
  // spiraalslagaders: kronkelend omhoog door spierlaag en decidua, trechtervormige monding midden onder elke kwab
  kws.forEach((cx, k) => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(_PL.yOnder + 4, _PL.yBas + 4, u); pts.push([cx + Math.sin(u * 6.283 * 2.2 + k) * 11 * (1 - u * 0.8), yy]); }
    for (const [lw, col] of [[12, lighten(BIO.bloed, 0.3)], [9, BIO.bloed]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(cx - 6, _PL.yBas + 18); ctx.quadraticCurveTo(cx - 7, _PL.yBas + 4, cx - 15, _PL.yBas - 1); ctx.lineTo(cx + 15, _PL.yBas - 1); ctx.quadraticCurveTo(cx + 7, _PL.yBas + 4, cx + 6, _PL.yBas + 18); ctx.closePath();
    shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.3), 1.5);
    // bloed in de slagader stroomt omhoog (alleen als moederbloed aan staat)
    if (mb > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4 + k * 0.13) % 1); const [px, py] = bioPunt(pts, u); ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.fillStyle = rgba('#F2C0B4', 0.75 * mb); ctx.fill(); } });

  // ---- 3. vlokkenbomen (groeien uit de chorionplaat) ------------------------------------------------
  const vk = clamp(vlokken, 0, 1); const gD = d => clamp(vk * 4.2 - d, 0, 1);
  const zicht = B.segs.filter(s => gD(s.d) > 0.01);
  const deel = (s) => { const g = gD(s.d); const n = Math.max(2, Math.round(s.P.length * g)); const Q = s.P.slice(0, n); if (g < 1) { const [px, py] = bioPunt(s.P, g); Q[Q.length - 1] = [px, py]; } return Q; };
  const streep = (Q, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
  // rand (goudgetinte syncytiotrofoblast) en dan het weefsel
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w + 3.5, PLAC.syn); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85 + 1.75, 0, 6.283); ctx.fillStyle = PLAC.syn; ctx.fill(); }
    if (s.anker && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.moveTo(e[0] - 18, _PL.yBas + 2); ctx.quadraticCurveTo(e[0] - 6, e[1] - 16, e[0], e[1] - 22); ctx.quadraticCurveTo(e[0] + 6, e[1] - 16, e[0] + 18, _PL.yBas + 2); ctx.closePath(); shape(ctx, PLAC.vlok, PLAC.syn, 1.75); } });
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w, PLAC.vlok); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85, 0, 6.283); ctx.fillStyle = PLAC.vlok; ctx.fill(); } });
  // foetale vaten in de vlokken: slagader (zuurstofarm) en ader (zuurstofrijk) naast elkaar, eindvlokjes met een haarvatlus
  zicht.forEach(s => { let Q = deel(s); const lw = Math.max(1.4, s.w * 0.17); const pw = (s.pw || 0) * 0.5; if (pw) { const q0 = Q[0]; const k0 = Q.findIndex(p => Math.hypot(p[0] - q0[0], p[1] - q0[1]) >= pw); Q = k0 > 0 ? Q.slice(k0 - 1) : Q.slice(-2); } // vaten van een zijtak beginnen aan de rand van de moedertak
    if (Q.length < 2) return; _plLijn(ctx, Q, -s.w * 0.2, lw, ARM); _plLijn(ctx, Q, s.w * 0.2, lw, RIJK);
    if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1], q = Q[Q.length - 2]; const an = Math.atan2(e[1] - q[1], e[0] - q[0]); const rr = s.w * 0.42;
      ctx.lineWidth = lw; ctx.strokeStyle = ARM; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an + Math.PI / 2, an + Math.PI * 1.5, true); ctx.stroke();
      ctx.strokeStyle = RIJK; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an - Math.PI / 2, an + Math.PI / 2, false); ctx.stroke(); } });
  if (focus >= 0 && focus < B.toppen.length && vk > 0.95) { const [fx, fy, fr] = B.toppen[focus]; ctx.beginPath(); ctx.arc(fx, fy, fr + 7, 0, 6.283); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3 / S; ctx.stroke(); }

  // ---- 4. chorionplaat met amnion en chorionvaten ---------------------------------------------------
  ctx.fillStyle = PLAC.chorion; ctx.fillRect(L, _PL.yCh0, R - L, _PL.yCh1 - _PL.yCh0);
  ctx.strokeStyle = lighten(PLAC.chorion, 0.3); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(L, _PL.yCh1); ctx.lineTo(R, _PL.yCh1); ctx.stroke();
  ctx.fillStyle = PLAC.amnion; ctx.fillRect(L, _PL.yAm, R - L, 5);
  // chorionvaten: vanaf de navelstrengaanhechting naar links en rechts, dunner naar buiten, met een tak omlaag in elke stamvlok
  const vatW = dx => Math.max(2.5, 9 - Math.abs(dx) / 85);
  for (const [vy, col] of [[-176, ARM], [-160, RIJK]]) {
    for (const z of [-1, 1]) { const xEnd = z < 0 ? L : R; const n = 30;
      for (let i = 0; i < n; i++) { const xa = lerp(NAV[0], xEnd, i / n), xb = lerp(NAV[0], xEnd, (i + 1) / n); ctx.strokeStyle = col; ctx.lineWidth = vatW(xa - NAV[0]); ctx.beginPath(); ctx.moveTo(xa, vy + Math.sin(xa / 70) * 2); ctx.lineTo(xb, vy + Math.sin(xb / 70) * 2); ctx.stroke(); } }
    if (vk > 0.01) B.stammen.forEach(([sx]) => { ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, vatW(sx - NAV[0]) * 0.8); const off = col === ARM ? -5 : 5; ctx.beginPath(); ctx.moveTo(sx + off * 2.2, vy + Math.sin(sx / 70) * 2); ctx.quadraticCurveTo(sx + off, vy + 8, sx + off * 0.95, _PL.yCh1 + 2); ctx.stroke(); });
  }

  // ---- 5. navelstreng: van de aanhechting naar boven (kind buiten beeld) of naar o.kind --------------
  // Navelstreng ± 1,5–2 cm dik (hier 34 = op de schaal van de lagen), 2 slagaders draaien spiraalsgewijs om 1 ader.
  const nv = clamp(navel, 0, 1);
  if (nv > 0.01) { const eind = kind ? [(kind[0] - x) / S, (kind[1] - y) / Sy] : [NAV[0] - 120, -420]; const sw = 34;
    const ex = lerp(NAV[0], eind[0], nv), ey = lerp(NAV[1] - 20, eind[1], nv);
    ctx.save(); ctx.globalAlpha *= clamp(nv * 4, 0, 1);
    // aanhechting: verbreed voetje op het amnion
    ctx.beginPath(); ctx.moveTo(NAV[0] - 42, _PL.yAm + 1); ctx.bezierCurveTo(NAV[0] - 22, _PL.yAm - 2, NAV[0] - 17, _PL.yAm - 10, NAV[0] - 17, _PL.yAm - 26); ctx.lineTo(NAV[0] + 17, _PL.yAm - 26); ctx.bezierCurveTo(NAV[0] + 17, _PL.yAm - 10, NAV[0] + 22, _PL.yAm - 2, NAV[0] + 42, _PL.yAm + 1); ctx.closePath(); shape(ctx, PLAC.streng, null);
    if (!kleurO2) { castNavelstreng(ctx, NAV[0], NAV[1] - 20, ex, ey, t, 1, sw); }
    else { const d = Math.hypot(ex - NAV[0], ey - NAV[1] + 20) || 1, nx = -(ey - NAV[1] + 20) / d, ny = (ex - NAV[0]) / d; const N = 60;
      const pts = []; for (let i = 0; i <= N; i++) { const u = i / N, wv = Math.sin(u * 5 + t * 0.8) * 14 * Math.sin(u * Math.PI); pts.push([lerp(NAV[0], ex, u) + nx * wv, lerp(NAV[1] - 20, ey, u) + ny * wv]); }
      pts.unshift([NAV[0], NAV[1] - 2]);
      streep(pts, sw + 3, lighten(PLAC.streng, 0.35)); streep(pts, sw, PLAC.streng);
      const draai = d / 70; // ± één winding per 70 px
      const spiraal = (ph, voor) => { ctx.strokeStyle = ARM; ctx.lineWidth = sw * 0.2;
        for (let i = 1; i < pts.length - 1; i++) { const u = i / (pts.length - 1), u2 = (i + 1) / (pts.length - 1); const c1 = Math.cos(u * draai * 6.283 + ph); if ((c1 >= 0) !== voor) continue;
          const p = pts[i], q = pts[i + 1]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const o1 = Math.sin(u * draai * 6.283 + ph) * sw * 0.3, o2 = Math.sin(u2 * draai * 6.283 + ph) * sw * 0.3;
          ctx.beginPath(); ctx.moveTo(p[0] - Math.sin(an) * o1, p[1] + Math.cos(an) * o1); ctx.lineTo(q[0] - Math.sin(an) * o2, q[1] + Math.cos(an) * o2); ctx.stroke(); } };
      ctx.save(); ctx.globalAlpha *= 0.55; spiraal(0, false); spiraal(Math.PI, false); ctx.restore();
      _plLijn(ctx, pts, 0, sw * 0.3, RIJK);
      spiraal(0, true); spiraal(Math.PI, true); }
    ctx.restore();
  }
  ctx.restore(); return ret;
}

// =====================================================================================
// EÉN VLOK VERGROOT (eindvlokje, voldragen placenta), moederbloed links, vlok rechts met het oppervlak naar links.
// Recept (Junqueira h. 22; Sadler h. 8; Benirschke h. 7 'Terminal villi'): eindvlokje 40–80 µm dik. Van buiten
// naar binnen: microvilli (borstelzoom, ± 1 µm lang) – syncytiotrofoblast: één doorlopende laag zonder celgrenzen
// met veel kernen, 2–10 µm dik; boven een haarvat dunner (± 1–2 µm) en daar zonder kernen (vasculosyncytiale
// membraan), de kernen liggen in groepjes elders (syncytiële knopen) – enkele cytotrofoblastcellen (bij voldragen
// placenta schaars) – basaalmembraan – bindweefselkern (stroma) met fibroblasten – foetaal haarvat (sinusoïdaal
// verwijd, 10–30 µm) met dun endotheel (± 0,5 µm) dat tegen de trofoblast aandrukt. Totale barrière moederbloed →
// kindbloed aan het eind van de zwangerschap ± 2–4 µm (vroeg 20–30 µm). Rode bloedcel 7,5 µm.
// Hier: schaal ± 3 px/µm (rode bloedcel r 11 = 7,5 µm); barrière over het haarvat 9 + 3 + 3 = 15 px (± 5 µm,
// iets ruimer dan 2–4 µm zodat de lagen zichtbaar blijven), dus dunner dan één rode bloedcel. Haarvatlumen 44 px
// (± 15 µm). Foetaal bloed komt blauwpaars binnen (boven) en verlaat de lus rood (onder).
// Bekende fouten: dikke barrière (dikker dan een bloedcel); losse trofoblastcellen met celgrenzen aan de buitenkant
// (het syncytium is één laag); haarvat midden in de vlok in plaats van vlak onder het oppervlak; moeder- en
// kindbloed die elkaar raken; kernen in het dunne deel boven het haarvat.
// =====================================================================================
function vlokVergroot(ctx, x, y, w = 900, h = 520, o = {}) {
  const { a = 1, t = 0, laag = 0 } = o;
  const S = w / 900, Sy = h / 520;
  const X0 = -160, HV = 212, SYN_D = 9, SYN_K = 22, GAP = 3, ENDO = 3, LUM = 22;
  const opp = yy => X0 + 150 * Math.pow(Math.min(1, Math.abs(yy) / HV), 6);        // buitenoppervlak (ontwerpcoörd.)
  const dik = yy => lerp(SYN_D, SYN_K, clamp((Math.abs(yy) - 120) / 50, 0, 1));     // syncytium dun boven het haarvat
  const kapC = yy => opp(yy) + dik(yy) + GAP + ENDO + LUM;                          // haarvat-middellijn
  const ret = { barriereX: yy => x + (opp((yy - y) / Sy) + (SYN_D + GAP + ENDO) / 2) * S, moederX: x + (X0 - 170) * S, kindX: yy => x + kapC((yy - y) / Sy) * S,
    y0: y - 115 * Sy, y1: y + 115 * Sy };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -450, R = 450, T = -260, Bn = 260;
  ctx.save(); roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.clip();
  // moederbloed (vult alles buiten de vlok)
  ctx.fillStyle = _plMix('#1A2740', PLAC.meer, 0.34); ctx.fillRect(L, T, R - L, Bn - T);
  // vlokomtrek
  const omtrek = (inset) => { const pts = []; for (let i = 0; i <= 60; i++) { const yy = lerp(-HV + inset, HV - inset, i / 60); pts.push([opp(yy) + inset, yy]); } return pts; };
  const vlokPad = (inset) => { const O = omtrek(inset); ctx.beginPath(); ctx.moveTo(R + 10, -HV + inset); O.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(R + 10, HV - inset); ctx.closePath(); };
  // moederlijke rode bloedcellen: drijven langzaam langs het oppervlak omlaag (achter de microvilli, vóór de vlok niet)
  for (let i = 0; i < 26; i++) { const sp = 14 + 10 * hash(i * 3 + 1); const yy = ((hash(i * 3 + 2) * 620 + t * sp) % 620) - 310;
    let xx = L + 20 + hash(i * 3 + 3) * 300 + Math.sin(t * 0.5 + i) * 8; if (Math.abs(yy) < HV + 14) xx = Math.min(xx, opp(yy) - 26); else xx = L + 20 + hash(i * 3 + 3) * 840;
    _plCel(ctx, xx, yy, 11, i * 1.3 + t * 0.25 * (hash(i) - 0.5), 0.5 + 0.5 * Math.sin(t * 0.8 + i * 1.9), BIO.bloed); }
  // microvilli (borstelzoom, ± 1 µm) langs het hele oppervlak naar het moederbloed
  { const O = omtrek(0); const full = [[R + 10, -HV], ...O.slice().reverse().map(p => [p[0], -p[1]]).reverse(), [R + 10, HV]]; // linkerkant
    const top = []; for (let xx = R; xx > opp(-HV + 1); xx -= 7) top.push([xx, -HV, 0, -1]); const bot = []; for (let xx = opp(HV - 1); xx < R; xx += 7) bot.push([xx, HV, 0, 1]);
    const zij = []; const D = bioDicht(O, 6); let acc = 0; for (let i = 1; i < D.length; i++) { acc += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); if (acc < 4.5) continue; acc = 0; const dx = D[i][0] - D[i - 1][0], dy = D[i][1] - D[i - 1][1], nn = Math.hypot(dx, dy) || 1; zij.push([D[i][0], D[i][1], -dy / nn, dx / nn]); }
    ctx.strokeStyle = rgba(PLAC.syn, 0.85); ctx.lineWidth = 2; [...top, ...zij, ...bot].forEach((m, i) => { const lm = 6 + 2 * hash(i); ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.lineTo(m[0] + m[2] * lm, m[1] + m[3] * lm); ctx.stroke(); }); }
  // syncytiotrofoblast (goudgetint, doorlopend)
  vlokPad(0); shape(ctx, PLAC.syn, lighten(PLAC.syn, 0.35), 2);
  // bindweefselkern (stroma)
  const binnenPad = () => { ctx.beginPath(); ctx.moveTo(R + 10, -HV + SYN_K); for (let i = 0; i <= 80; i++) { const yy = lerp(-HV + SYN_K, HV - SYN_K, i / 80); ctx.lineTo(opp(yy) + dik(yy) + (Math.abs(yy) > HV - 40 ? (Math.abs(yy) - HV + 40) * 0.0 : 0), yy); } ctx.lineTo(R + 10, HV - SYN_K); ctx.closePath(); };
  binnenPad(); shape(ctx, _plMix('#1A2740', PLAC.vlok, 0.62), rgba('#F2E6DA', 0.5), 1.5); // lichte lijn = basaalmembraan
  // kernen van het syncytium: alleen in het dikke deel, in groepjes (syncytiële knopen)
  const kernen = [[-198, 4], [-184, 2], [-172, 3], [-150, 1], [150, 2], [168, 4], [190, 3], [-130, 1], [132, 1]];
  kernen.forEach(([yy0, n], g) => { for (let k = 0; k < n; k++) { const yy = yy0 + (k - (n - 1) / 2) * 11 * Math.sign(yy0); const xx = opp(yy) + dik(yy) * 0.5;
    ctx.beginPath(); ctx.ellipse(xx, yy, 6.5, 4, Math.atan2(1, (opp(yy + 1) - opp(yy - 1)) / 2) , 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); } });
  // twee cytotrofoblastcellen onder het syncytium (schaars bij voldragen placenta)
  for (const yy of [-150, 148]) { const xx = opp(yy) + dik(yy) + 9; ctx.beginPath(); ctx.ellipse(xx, yy, 9, 14, 0.15 * Math.sign(yy), 0, 6.283); shape(ctx, _plMix('#1A2740', PLAC.syn, 0.6), rgba(PLAC.syn, 0.8), 1.2);
    ctx.beginPath(); ctx.arc(xx + 1, yy, 4.5, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // fibroblasten in de kern (langgerekte kernen), rustig
  ctx.save(); binnenPad(); ctx.clip();
  [[110, -60, 0.4], [250, 20, -0.3], [330, -120, 0.2], [180, 100, -0.5], [390, 90, 0.6], [60, -10, 1.2], [300, 190, 0.1], [240, -190, -0.2]].forEach(([fx, fy, fa]) => {
    ctx.beginPath(); ctx.ellipse(fx, fy, 16, 4.5, fa, 0, 6.283); shape(ctx, rgba((C.nucFill || '#6E5A9E'), 0.75), rgba((C.nucEdge || '#A392D6'), 0.6), 1);
    ctx.strokeStyle = rgba('#F2E6DA', 0.25); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx - Math.cos(fa) * 34, fy - Math.sin(fa) * 34); ctx.lineTo(fx + Math.cos(fa) * 34, fy + Math.sin(fa) * 34); ctx.stroke(); });
  // foetale haarvatlus: binnen rechtsboven, langs het oppervlak omlaag, rechtsonder weer weg
  const rv = [[R + 20, -148], [120, -150], [-40, -152], [kapC(-110) + 22, -128]]; for (let yy = -100; yy <= 100; yy += 25) rv.push([kapC(yy), yy]); rv.push([kapC(110) + 22, 128], [-40, 152], [120, 150], [R + 20, 148]);
  const K = bioDicht(rv, 14);
  const pad = () => { ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  pad(); ctx.strokeStyle = rgba('#F2D8D0', 0.9); ctx.lineWidth = 2 * (LUM + ENDO); ctx.stroke();      // endotheel (dunne wand)
  pad(); ctx.strokeStyle = PLAC.lumen; ctx.lineWidth = 2 * LUM; ctx.stroke();                         // lumen
  // lumen getint naar zuurstofgehalte: blauwpaars binnen, rood bij het verlaten (vlakke stukken, kleurwissel halverwege de barrière)
  const kN = K.length - 1, stuk = (u0, u1, col) => { ctx.beginPath(); for (let i = Math.round(u0 * kN); i <= Math.round(u1 * kN); i++) i === Math.round(u0 * kN) ? ctx.moveTo(K[i][0], K[i][1]) : ctx.lineTo(K[i][0], K[i][1]); ctx.strokeStyle = col; ctx.lineWidth = 2 * LUM; ctx.lineCap = 'butt'; ctx.stroke(); ctx.lineCap = 'round'; };
  stuk(0, 0.42, _plMix(PLAC.lumen, PLAC.arm, 0.4)); stuk(0.42, 0.58, _plMix(PLAC.lumen, '#A0517A', 0.4)); stuk(0.58, 1, _plMix(PLAC.lumen, BIO.bloed, 0.4));
  // endotheelkernen (afgeplat) in het diepe deel
  for (const [u, sd] of [[0.12, 1], [0.88, -1]]) { const [ex, ey, an] = bioPunt(K, u); ctx.beginPath(); ctx.ellipse(ex - Math.sin(an) * (LUM + 1) * sd, ey + Math.cos(an) * (LUM + 1) * sd, 9, 3, an, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // foetale rode bloedcellen in de lus, kleur paars → rood terwijl ze langs de barrière gaan
  for (let i = 0; i < 16; i++) { const u = ((t * 0.045 * (0.85 + 0.3 * hash(i + 40)) + i / 16) % 1 + 1) % 1; const [px, py, an] = bioPunt(K, u); const off = (hash(i + 41) - 0.5) * LUM * 0.7;
    const m = clamp((u - 0.32) / 0.4, 0, 1); _plCel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, 11, an + Math.PI / 2 + 0.5 * Math.sin(t + i), 0.55 + 0.4 * Math.sin(t * 0.9 + i), _plMix(PLAC.arm, BIO.bloed, m)); }
  ctx.restore();
  // dunne barrière markeren (goud): van het oppervlak tot het haarvatlumen, over het rechte stuk
  if (laag > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(laag, 0, 1); const ys = [], n = 50; for (let i = 0; i <= n; i++) ys.push(lerp(-118, 118, i / n));
    ctx.beginPath(); ys.forEach((yy, i) => i ? ctx.lineTo(opp(yy) - 2, yy) : ctx.moveTo(opp(yy) - 2, yy)); for (let i = n; i >= 0; i--) ctx.lineTo(kapC(ys[i]) - LUM + 1, ys[i]); ctx.closePath();
    ctx.fillStyle = rgba(C.goldL || '#F0D58A', 0.75); ctx.fill(); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke();
    for (const yy of [-118, 118]) { ctx.beginPath(); ctx.moveTo(opp(yy) - 14, yy); ctx.lineTo(kapC(yy) - LUM + 12, yy); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: hersenen vooraanzicht, vrouwelijke organen (ook zwanger), geel lichaam
// =====================================================================================
// =====================================================================================
// obj_vrouw_brein.js — nieuwe objecten voor lib_bio.js (22 okt 2026): hersenen vooraanzicht + kijkje in het hoofd,
// vrouwelijke geslachtsorganen vooraanzicht (ook zwanger) + kijkje in de buik, geel lichaam (corpus luteum).
// Zelfde regels als lib_bio.js: vlakke vullingen met iets lichtere rand, geen tekst, deterministisch (hash),
// animatie via t, ankerpunten terug in schermcoördinaten.
// =====================================================================================

function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbTab(tab, u) { if (u <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) { const [u0, v0] = tab[i - 1], [u1, v1] = tab[i]; return lerp(v0, v1, (u - u0) / (u1 - u0)); } return tab[tab.length - 1][1]; }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function _vbVenster(ctx, x, y, rx, ry, a = 0.72) { // zacht donker venster: gestapelde vlakke ellipsen (geen verloop)
  const n = 7; for (let i = 0; i < n; i++) { const f = 1 + (n - 1 - i) * 0.035; ctx.beginPath(); ctx.ellipse(x, y, rx * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a / n * 1.6); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a * 0.55); ctx.fill();
}

// =====================================================================================
// HERSENEN VOORAANZICHT (zoals ze in een hoofd van voren liggen; 'röntgenblik' op de middellijn).
// Recept (1 cm ≈ 8,6 px bij s = 1): breedte ± 14 cm → 120 px; kruin tot hypothalamus ± 8 cm → 68 px;
// hypothalamus → hypofyse ± 1,2 cm (steeltje); hypofyse ± 1,2 × 0,8 cm (erwt, iets vergroot getekend: 12 × 9 px);
// twee hersenhelften met diepe lengtegroeve (fissura longitudinalis) tot de hersenbalk; voorhoofdskwabben rusten
// op de oogkasdaken (onderrand ± 0,7 cm boven de hypothalamus); slaapkwabben hangen lager aan de zijkant (onderrand
// ± 2 cm onder de hypothalamus, in de middelste schedelgroeve), gescheiden door de Sylvius-groeve; hypothalamus
// tussen de slaapkwabben, onder/achter de voorhoofdskwabben; hersenstam (brug ± 2,5 cm breed, verlengde merg
// ± 1,5 cm) loopt in het midden omlaag; kleine hersenen gluren naast het verlengde merg onder de slaapkwabben.
// Bron: Gray's Anatomy fig. 'brain, anterior view' / coronaal; Sobotta deel 3. Bekende fouten: hypofyse los onder
// het hele brein of in de keel; slaapkwabben even hoog als de voorhoofdskwabben; brein als twee ovalen zonder
// hersenstam. Ontwerpcoördinaten: oorsprong = hypothalamus; o.rek rekt verticaal (stripfiguren hebben een hoger hoofd).
// =====================================================================================
function breinVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, rek = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s * rek];
  const uit = { hth: P(0, 0), hyp: P(0, 12) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * rek); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s; // lijndikte in schermpixels
  // kleine hersenen (achter, naast het verlengde merg)
  for (const d of [-1, 1]) { ctx.beginPath(); bioPad(ctx, [[d * 8, 22], [d * 22, 16], [d * 44, 22], [d * 48, 32], [d * 36, 41], [d * 16, 40], [d * 7, 32]], true); shape(ctx, _vbMix(BIO.brein, '#1A2740', 0.35), _vbMix(BIO.breinS, '#1A2740', 0.2), L(1.3));
    ctx.strokeStyle = rgba(BIO.breinD, 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(d * 12, 25 + k * 5); ctx.quadraticCurveTo(d * 30, 22 + k * 6, d * 44, 27 + k * 4); ctx.stroke(); } }
  // hersenstam: middenhersenen → brug (breder) → verlengde merg → ruggenmerg
  const STAM = [[-8, -2], [-11, 6], [-12, 14], [-10, 22], [-7, 30], [-6, 40], [-5, 52], [5, 52], [6, 40], [7, 30], [10, 22], [12, 14], [11, 6], [8, -2]];
  ctx.beginPath(); bioPad(ctx, STAM, true); shape(ctx, _vbMix(BIO.breinS, '#1A2740', 0.1), BIO.breinS, L(1.3));
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = L(1); ctx.beginPath(); ctx.moveTo(-10, 21); ctx.quadraticCurveTo(0, 24, 10, 21); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 23); ctx.lineTo(0, 50); ctx.stroke();
  // grote hersenen: rechter helft (x > 0) ontworpen, links gespiegeld
  const HELFT = [[1.5, -67], [18, -68], [36, -62], [50, -50], [58, -33], [60, -14], [58, 2], [52, 13], [43, 19], [34, 17], [29, 9], [30, 1], [37, -5], [28, -8], [15, -8], [5, -7], [1.5, -10]];
  const GROEVEN = [[[8, -60], [20, -55], [16, -46], [28, -40]], [[34, -58], [40, -48], [50, -44]], [[10, -36], [22, -30], [18, -20], [30, -16]], [[38, -34], [48, -26], [44, -16], [54, -10]],
    [[6, -20], [12, -14], [22, -12]], [[40, 4], [48, 8], [50, -2]], [[33, -2], [44, -8], [56, -6]]]; // laatste = Sylvius-groeve
  for (const d of [-1, 1]) {
    const pts = HELFT.map(([px, py]) => [d * px, py]);
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, BIO.brein, lighten(BIO.brein, 0.22), L(1.6));
    ctx.save(); ctx.beginPath(); bioPad(ctx, pts, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = L(1.4);
    GROEVEN.forEach((g, i) => { ctx.lineWidth = L(i === GROEVEN.length - 1 ? 2 : 1.4); ctx.beginPath(); bioPad(ctx, g.map(([px, py]) => [d * px, py]), false); ctx.stroke(); });
    ctx.restore();
  }
  // lengtegroeve tussen de helften
  ctx.strokeStyle = rgba(BIO.breinD, 0.9); ctx.lineWidth = L(1.6); ctx.beginPath(); ctx.moveTo(0, -66); ctx.lineTo(0, -10); ctx.stroke();
  // hypothalamus (middellijn, tussen de slaapkwabben) + steeltje + hypofyse
  _vbGloed(ctx, 0, 0, 22, BIO.klier, hth);
  ctx.beginPath(); bioPad(ctx, [[-7, -3], [0, -5], [7, -3], [6, 3], [0, 5], [-6, 3]], true); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.25 + 0.75 * hth), lighten(hth > 0.3 ? BIO.klier : BIO.breinS, 0.25), L(1.2));
  ctx.strokeStyle = _vbMix(BIO.breinS, BIO.klier, 0.3 + 0.7 * Math.max(hth, hyp)); ctx.lineWidth = Math.max(2.2, 3 * s) / s; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0.5, 8); ctx.stroke();
  _vbGloed(ctx, 0, 12, 18, BIO.klier, hyp);
  ctx.beginPath(); ctx.ellipse(0, 12, 6, 4.5, 0, 0, 6.283); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.35 + 0.65 * hyp), lighten(BIO.klier, 0.2), L(1.2));
  ctx.restore();
  return uit;
}

// KIJKJE IN HET HOOFD van een castpersonage (vooraanzicht). hoofd = { x, y, r } uit persoon(...).hoofd.
// Plaatsing: hypofyse op ooghoogte (achter de neuswortel), kruin net onder de schedeldak/haarlijn (± 0,65 hh boven
// de ogen), brein ± 0,8 hh breed (net binnen het gezicht). Stripkoppen zijn smaller dan echt: rek = 1,18 (verticaal).
function hoofdKijkje(ctx, hoofd, o = {}) {
  const { a = 1 } = o; const hh = hoofd.r / 0.55; const s = 0.8 * hh / 120, rek = 1.18;
  const eyeY = hoofd.y + hh * 0.02; const hy = eyeY - 12 * s * rek;
  if (a <= 0.01) return { hth: [hoofd.x, hy], hyp: [hoofd.x, eyeY] };
  ctx.save(); ctx.globalAlpha *= a;
  _vbVenster(ctx, hoofd.x, hoofd.y - hh * 0.24, hh * 0.5, hh * 0.52, 0.8);
  const r = breinVoor(ctx, hoofd.x, hy, s, Object.assign({}, o, { a: 1, rek }));
  ctx.restore(); return r;
}

// =====================================================================================
// BAARMOEDER MET EILEIDERS EN EIERSTOKKEN, vooraanzicht (frontale doorsnede van de baarmoeder).
// Recept (1 cm ≈ 21 px bij s = 1): niet zwanger peervormig, ± 7,5 cm lang (± 160 px incl. baarmoederhals) en
// ± 5 cm breed (110 px); hals ± 3 cm lang, 2,5 cm breed met nauw kanaal; wand (spier) ± 1,5 cm dik; holte in
// vooraanzicht een driehoekige spleet met slijmvlies; eierstokken amandelvormig ± 3 × 1,5 cm, ± 2 cm naast de
// baarmoeder, met eierstokband aan de baarmoeder net onder de eileider; eileiders ± 10 cm, vanuit de bovenhoeken
// eerst smal (isthmus), dan wijder (ampulla), boog over de eierstok, trechter met franjes (fimbriae) over de
// buitenpool van de eierstok. Zwanger (z = maand/9): lengte 12 cm (3 mnd, net boven het schaambeen), 22 cm
// (5 mnd, fundus bij de navel), 35 cm (9 mnd, tot de ribben); breedte tot ± 25 cm; wand dunner (± 0,5–1 cm);
// eierstokken en eileiders schuiven mee omhoog en naar opzij. Vrucht (CRL): 6 wk 0,4 cm, 12 wk 5,4, 20 wk 16,
// 28 wk 25, 40 wk 36 cm; vruchtwater in de holte; moederkoek bovenaan in de wand.
// Bron: Gray's Anatomy (female pelvis); Sobotta deel 2; Williams Obstetrics (fundushoogte). Bekende fouten:
// eileiders recht als armpjes; eierstokken aan de eileiders vast; baarmoeder hoog in de buik als niet zwanger;
// zwangere baarmoeder als ballon zonder hals; kind dat zweeft zonder navelstreng.
// Oorsprong (x, y) = uitwendige baarmoedermond (onderkant hals): de baarmoeder groeit vanuit het bekken omhoog.
// =====================================================================================
const _VB_LEN = [[0, 7.5], [0.15, 8.5], [0.33, 12], [0.55, 22], [0.8, 30], [1, 35]];
const _VB_BR = [[0, 5], [0.15, 5.8], [0.33, 9.5], [0.55, 15], [0.8, 21], [1, 25]];
const _VB_CRL = [[0, 0], [0.13, 0], [0.15, 0.4], [0.2, 1.6], [0.3, 5.4], [0.4, 11.6], [0.5, 16], [0.6, 21], [0.7, 25], [0.8, 29], [0.9, 32], [1, 36]];
function _vbBaarmoederVorm(z, bk = 1) { // geeft buiten- en binnencontour (ontwerpeenheden, oorsprong = baarmoedermond)
  const cm = 21, Lc = 3 * cm, Wc = 2.5 * cm; const Lt = _vbTab(_VB_LEN, z) * cm, W = _vbTab(_VB_BR, z) * cm * bk;
  const yb0 = -Lc + 6, yT = -Lt, yc = (yb0 + yT) / 2, ry = (yb0 - yT) / 2, rx = W / 2; const kz = clamp(z / 0.6, 0, 1);
  const wand = lerp(1.5 * cm, 0.75 * cm, clamp(z / 0.5, 0, 1));
  const taper = (u) => lerp(lerp(0.5, 0.93, kz), 1, Math.sin(Math.min(1, u * 1.35) * 1.5708)); // peer → ei
  const rand = (rxx, ryy, ycc, minX) => { const R = [], N = 26; for (let i = 0; i <= N; i++) { const f = i / N * Math.PI; const u = (1 - Math.cos(f)) / 2;
      let px = Math.sin(f) * rxx * taper(u); if (minX && u < 0.5) px = Math.max(px, minX * (1 - u * 0.4)); R.push([px, ycc + Math.cos(f) * ryy]); } return R; };
  const rechts = rand(rx, ry, yc, Wc / 2 + 4); const buiten = [[Wc * 0.38, 0], [Wc * 0.5, -Lc * 0.5], ...rechts.slice(1), ...rechts.slice(1, -1).reverse().map(([px, py]) => [-px, py]), [-Wc * 0.5, -Lc * 0.5], [-Wc * 0.38, 0]];
  // binnen: holte (ovaal bij zwangerschap, driehoekige spleet als niet zwanger)
  const rxi = Math.max(4, rx - wand), ryi = Math.max(4, ry - wand), yci = yc - wand * 0.15; const ovaal = [];
  const N = 40; for (let i = 0; i < N; i++) { const f = i / N * 6.283; const u = (1 - Math.cos(f)) / 2; ovaal.push([Math.sin(f) * rxi * taper(u), yci + Math.cos(f) * ryi]); }
  const tri = []; const cx0 = rx * 0.7, cyT = yT + wand * 0.9, apY = yb0 - 4; // hoeken: links-boven, rechts-boven, punt onder
  for (let i = 0; i < N; i++) { const f = i / N; let px, py; // zelfde volgorde als ovaal: start onder, rechtsom via rechts omhoog
    if (f < 0.4) { const u = f / 0.4; px = lerp(0, cx0, u) - Math.sin(u * Math.PI) * 4; py = lerp(apY, cyT, u); }
    else if (f < 0.6) { const u = (f - 0.4) / 0.2; px = lerp(cx0, -cx0, u); py = cyT + Math.sin(u * Math.PI) * 6; }
    else { const u = (f - 0.6) / 0.4; px = lerp(-cx0, 0, u) + Math.sin(u * Math.PI) * 4; py = lerp(cyT, apY, u); } tri.push([px, py]); }
  const kh = clamp((z - 0.08) / 0.1, 0, 1); const holte = tri.map((p, i) => [lerp(p[0] * 0.5 + p[0] * 0.5 * (1 - kh), ovaal[i][0], kh), lerp(p[1], ovaal[i][1], kh)]);
  const hoek = rand(rx, ry, yc, 0)[19]; // bovenhoek (u ≈ 0,8): oorsprong eileider
  return { buiten, holte, rx, ry, yc, yT, Lc, Wc, rxi, ryi, yci, wand, hoek, cm, kh, maxX: Math.max(...rechts.map(p => p[0])) };
}
function vrouwOrganenVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, zwanger = 0, foetus = 0, hlEierstok = 0, hlBaarmoeder = 0, placenta = true, breed = 1 } = o;
  const z = clamp(zwanger, 0, 1); const V = _vbBaarmoederVorm(z, breed); const S = (px, py) => [x + px * s, y + py * s];
  // eierstok-plaats: naast de baarmoeder, schuift mee omhoog en naar buiten
  const H = V.hoek; const ox = Math.max(H[0] + lerp(95, 60, z), V.maxX + 48), oy = H[1] + lerp(48, 80, z);
  const fs0 = _vbTab(_VB_CRL, z) * V.cm / 286; const fs = Math.min(fs0, V.ryi * 2 * 0.86 / 300, V.rxi * 2 * 0.86 / 145);
  const frot = Math.PI + lerp(0.5, 0.08, clamp((z - 0.3) / 0.4, 0, 1)); const fx = -(5 * Math.cos(frot) + 10 * Math.sin(frot)) * fs, fy = V.yci - (5 * Math.sin(frot) - 10 * Math.cos(frot)) * fs;
  const uit = { baarmoeder: { x: x, y: y + V.yc * s, rx: V.rx * s, ry: V.ry * s }, eierstokL: S(-ox, oy), eierstokR: S(ox, oy), cervix: S(0, 0), foetus: S(fx, fy) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s;
  const SPIER = '#C98088', SPIERL = '#E3A6AC', SLIJM = '#E7AAB0', EI = '#E3BBA2', EIL = '#F2D6C4';
  // schede (bovenste stuk), achter de hals
  ctx.beginPath(); bioPad(ctx, [[-26, -14], [-30, 30], [-27, 70], [27, 70], [30, 30], [26, -14]], false); ctx.fillStyle = rgba(SPIER, 0.45); ctx.fill();
  ctx.strokeStyle = rgba(SPIERL, 0.5); ctx.lineWidth = L(1.2); ctx.beginPath(); ctx.moveTo(-28, 20); ctx.lineTo(-27, 70); ctx.moveTo(28, 20); ctx.lineTo(27, 70); ctx.stroke();
  ctx.fillStyle = rgba('#5A2A36', 0.5); ctx.beginPath(); ctx.ellipse(0, 40, 9, 30, 0, 0, 6.283); ctx.fill();
  // eierstokken + eierstokbanden + eileiders (beide kanten)
  for (const d of [-1, 1]) {
    const cx0 = d * H[0], cy0 = H[1];
    ctx.strokeStyle = rgba(SPIERL, 0.7); ctx.lineWidth = L(3); ctx.beginPath(); ctx.moveTo(d * (H[0] - 6), H[1] + 14); ctx.quadraticCurveTo(d * (H[0] + ox) / 2, oy - 6, d * (ox - 28), oy); ctx.stroke(); // eierstokband
    _vbGloed(ctx, d * ox, oy, 70, BIO.klier, hlEierstok);
    ctx.save(); ctx.translate(d * ox, oy); ctx.rotate(d * lerp(0.35, 0.9, z));
    ctx.beginPath(); bioPad(ctx, [[-32, 0], [-22, -14], [4, -17], [28, -10], [33, 2], [22, 14], [-4, 16], [-26, 11]], true); shape(ctx, EI, hlEierstok > 0.3 ? lighten(BIO.klier, 0.2) : EIL, L(1.5));
    ctx.fillStyle = rgba('#F6EBDD', 0.7); [[-14, -4, 4], [6, 5, 5.5], [18, -5, 3], [-4, -8, 2.5], [-20, 6, 2.5]].forEach(([fx2, fy2, fr]) => { ctx.beginPath(); ctx.arc(fx2, fy2, fr, 0, 6.283); ctx.fill(); }); // follikeltjes
    ctx.restore();
    // eileider: isthmus → ampulla → trechter met franjes over de buitenpool
    const dx = ox - H[0]; const pad = [[H[0] - 4, H[1] + 2], [H[0] + dx * 0.4, H[1] - 6], [H[0] + dx * 0.9, H[1] - 14], [ox + 35, H[1] - 6 + (oy - H[1]) * 0.05], [ox + 60, oy - 22], [ox + 54, oy + 4]];
    const P2 = bioDicht(pad, 12).map(([px, py]) => [d * px, py]);
    for (let i = 1; i < P2.length; i++) { const u = i / P2.length; ctx.strokeStyle = SPIER; ctx.lineWidth = lerp(5, 11, Math.pow(u, 1.3)); ctx.beginPath(); ctx.moveTo(P2[i - 1][0], P2[i - 1][1]); ctx.lineTo(P2[i][0], P2[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(SPIERL, 0.85); ctx.lineWidth = L(1.2); ctx.beginPath(); P2.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
    const [ex, ey] = P2[P2.length - 1];
    for (let k = 0; k < 7; k++) { const an = lerp(1.45, 3.3, k / 6) + Math.sin(t * 1.5 + k) * 0.06; const an2 = d > 0 ? an : Math.PI - an; const len = 18 + 6 * hash(k + 3);
      ctx.strokeStyle = SPIER; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + Math.cos(an2) * len * 0.6 + d * 3, ey + Math.sin(an2) * len * 0.6, ex + Math.cos(an2) * len, ey + Math.sin(an2) * len); ctx.stroke();
      ctx.fillStyle = SPIERL; ctx.beginPath(); ctx.arc(ex + Math.cos(an2) * len, ey + Math.sin(an2) * len, 1.8, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#5A2A36', 0.6); ctx.beginPath(); ctx.ellipse(ex, ey + 2, 5, 3, 0, 0, 6.283); ctx.fill(); // trechteropening
  }
  // baarmoeder (spierwand)
  if (hlBaarmoeder > 0.01) { ctx.save(); ctx.shadowColor = rgba(BIO.klier, 0.8 * hlBaarmoeder); ctx.shadowBlur = 40 * hlBaarmoeder; ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.fillStyle = SPIER; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, V.buiten, true); shape(ctx, SPIER, hlBaarmoeder > 0.3 ? lighten(BIO.klier, 0.2) : SPIERL, L(2));
  // spiervezel-tekening (rustig, enkele bogen in de wand)
  ctx.save(); ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.clip(); ctx.strokeStyle = rgba('#A9606A', 0.45); ctx.lineWidth = L(1.2);
  for (let k = 1; k <= 3; k++) { const f = k / 4; ctx.beginPath(); ctx.ellipse(0, V.yci, V.rxi + V.wand * f, V.ryi + V.wand * f, 0, 3.6, 5.8); ctx.stroke(); } ctx.restore();
  // halskanaal
  ctx.strokeStyle = '#6A3240'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, -V.Lc + 4); ctx.stroke();
  ctx.fillStyle = '#6A3240'; ctx.beginPath(); ctx.ellipse(0, -V.Lc * 0.5, 4.5, V.Lc * 0.3, 0, 0, 6.283); ctx.fill();
  // holte: slijmvlies + (bij zwangerschap) vruchtwater
  ctx.beginPath(); bioPad(ctx, V.holte, true); shape(ctx, V.kh > 0.3 ? '#6E8C92' : '#6A3240', SLIJM, Math.max(3, V.wand * 0.18));
  if (V.kh > 0.3) { ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.fillStyle = rgba('#CFE6E2', 0.18); ctx.fill(); }
  if (z > 0.25 && placenta) { // moederkoek tegen de bovenwand (rechtsboven), met navelstreng
    const pk = clamp((z - 0.25) / 0.15, 0, 1); ctx.save(); ctx.globalAlpha *= pk; ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const pcx = V.rxi * 0.62, pcy = V.yci - V.ryi * 0.72; ctx.beginPath(); ctx.ellipse(pcx, pcy, V.rxi * 0.5, V.ryi * 0.3, -0.75, 0, 6.283); shape(ctx, '#A8464E', '#C9666C', L(1.5));
    ctx.strokeStyle = rgba('#7A2A36', 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(pcx - V.rxi * 0.05, pcy + V.ryi * 0.05, V.rxi * (0.22 + k * 0.05), 3.2, 4.0); ctx.stroke(); }
    ctx.restore(); }
  // vrucht
  if (foetus > 0.01 && fs > 0.0005 && V.kh > 0.3) {
    ctx.save(); ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const f = castFoetus(ctx, fx, fy, fs, { alpha: foetus, rot: frot });
    if (z > 0.25 && placenta) castNavelstreng(ctx, V.rxi * 0.48, V.yci - V.ryi * 0.55, f.navel.x, f.navel.y, t, foetus * clamp((z - 0.25) / 0.15, 0, 1), Math.max(3, fs * 22));
    ctx.restore(); }
  ctx.restore();
  return uit;
}

// KIJKJE IN DE BUIK van een castpersonage getekend met persoon(ctx, id, x, y, h, { outfit: 'zwanger', zwanger }).
// Plaatsing (stripmaten van lib_cast.js, hh = kophoogte): baarmoedermond achter het schaambeen (heupY + 0,22 hh,
// waar de benen beginnen); niet zwanger blijft de baarmoeder in het bekken (± 0,25 hh hoog). Schaal zó dat de
// voldragen baarmoeder (35 cm) tot de bovenrand van de stripbuik reikt (onder de ribbenboog); bij 5 mnd staat de
// fundus dan rond de taille/navel. De stripbuik is breder dan echt: o.breed rekt alléén de baarmoederwand in de
// breedte mee (tot ± 80 % van de buikbreedte), het kind en de eierstokken blijven op echte verhouding.
function buikKijkje(ctx, id, x, y, h, zwanger = 0, o = {}) {
  const { a = 1, kijk = 1 } = o; const P = CAST[id] || {}; const hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45;
  const z = clamp(zwanger, 0, 1); const b = castBuik(id, x, y, h, z, kijk); const cx = x + (P.krom ? hh * 0.15 : 0);
  const ux = lerp(cx, b.x, 0.6), uy = heupY + hh * 0.22; const s = 1.36 * hh / 735;
  const V0 = _vbBaarmoederVorm(z); const wil = Math.min(2 * b.rx * 0.8, (-V0.yT - V0.Lc) * s * 0.82), heeft = 2 * V0.maxX * s; const breed = lerp(1, Math.max(1, wil / heeft), ease(clamp((z - 0.2) / 0.5, 0, 1)));
  const V = _vbBaarmoederVorm(z, breed); const opt = Object.assign({}, o, { a: 1, zwanger: z, breed });
  if (a <= 0.01) return vrouwOrganenVoor(ctx, ux, uy, s, Object.assign(opt, { a: 0 }));
  ctx.save(); ctx.globalAlpha *= a;
  const half = Math.max(V.maxX + 120, V.hoek[0] + 200) * s; const yTop = uy + V.yT * s - hh * 0.08, yBot = uy + hh * 0.12;
  _vbVenster(ctx, ux, (yTop + yBot) / 2, Math.max(half, hh * 0.42), (yBot - yTop) / 2 + hh * 0.05, 0.78);
  const r = vrouwOrganenVoor(ctx, ux, uy, s, opt);
  ctx.restore(); return r;
}

// =====================================================================================
// GEEL LICHAAM (corpus luteum) in doorsnede, en zijn verval tot wit lichaam (corpus albicans).
// Recept: 1,5–2,5 cm groot (kan tot 3 cm); sterk geplooide, dikke gele wand van grote veelhoekige luteïnecellen
// (granulosa-luteïnecellen ± 30–50 µm, ronde kern, lichtgeel vetrijk cytoplasma) met tussen de plooien schotten
// van theca-weefsel (kleinere theca-luteïnecellen) waarlangs haarvaten naar binnen groeien; in het midden het
// bloedstolsel/de holte van de gesprongen follikel (rood-bruin, fibrinedraden, later bindweefsel); dun kapsel
// erbuiten. Zonder hCG na ± 10–14 dagen verval: krimpt, verliest kleur, wordt een klein wit hyalien litteken
// (corpus albicans, enkele mm) met golvende rand. LH-receptoren (G-eiwitgekoppeld) op het celmembraan van de
// luteïnecellen. Bron: Junqueira h. 22 'Corpus luteum'; Ross & Pawlina h. 23. Bekende fouten: geel lichaam als
// egale gele bol of ring zonder plooien; cellen als kleine stipjes; litteken dat geel blijft.
// Ontwerpeenheden: straal 100 (r = straal op het scherm).
// =====================================================================================
const _VB_SEP = 7, _VB_F0 = 0.45; // aantal plooien; fase zodat het midden van een kwab rechts ligt (θ = 0)
function _vbRo(th) { const ph = _VB_SEP * (th - _VB_F0); return 90 - 24 * Math.pow((1 + Math.cos(ph)) / 2, 8) + 1.5 * Math.sin(th * 3); }
function _vbRi(th) { const ph = _VB_SEP * (th - _VB_F0); return 48 + 13 * Math.pow((1 + Math.cos(ph)) / 2, 2) + 2 * Math.sin(th * 5 + 1); }
function _vbLuteine() { // Voronoi-cellen in de wand (gecachet)
  if (_bioPolyCache.vbLuteine) return _bioPolyCache.vbLuteine;
  const seeds = []; const d = 9;
  for (let rho = 50; rho < 92; rho += d * 0.86) { const n = Math.round(6.283 * rho / d); for (let k = 0; k < n; k++) { const th = (k + (Math.round(rho) % 2) * 0.5) / n * 6.283 + (hash(rho * 7 + k) - 0.5) * 0.4 * d / rho; const rr = rho + (hash(rho * 3 + k * 11) - 0.5) * d * 0.4;
      if (rr > _vbRi(th) + 2 && rr < _vbRo(th) - 2) seeds.push([Math.cos(th) * rr, Math.sin(th) * rr]); } }
  const polys = seeds.map((p, i) => { const pts = []; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.8;
      seeds.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); if (dd > d * 2.5) return; const pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr); });
      best = Math.max(0, best - 0.9); pts.push([p[0] + ux * best, p[1] + uy * best]); } return { c: p, pts }; });
  let hi = 0, bx = -1e9; polys.forEach((c, i) => { const th = Math.atan2(c.c[1], c.c[0]); if (Math.abs(th) < 0.2 && c.c[0] > bx) { bx = c.c[0]; hi = i; } });
  return (_bioPolyCache.vbLuteine = { polys, hi });
}
function geelLichaam(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, leef = 1, hl = 0, receptoren = 0 } = o;
  const lv = clamp(leef, 0, 1), sc = lerp(0.32, 1, ease(lv)), k = r / 100 * sc; const L = (px) => px / k;
  const { polys, hi } = _vbLuteine(); const H = polys[hi];
  const omtrek = (f, n = 120) => { const R = []; for (let i = 0; i < n; i++) { const th = i / n * 6.283; R.push([Math.cos(th) * f(th), Math.sin(th) * f(th)]); } return R; };
  // buitenste membraanpunt van de gemarkeerde cel (meest rechtse punt van de gladde omtrek)
  const celPad = bioDicht([...H.pts, H.pts[0], H.pts[1]], 6).slice(6); let mp = celPad[0]; celPad.forEach(p => { if (p[0] > mp[0]) mp = p; });
  const uit = { cel: [x + mp[0] * k, y + mp[1] * k], r: r * sc };
  if (a <= 0.01) return uit;
  const geel = lv, ka = clamp((lv - 0.12) / 0.55, 0, 1), alb = clamp((0.6 - lv) / 0.5, 0, 1);
  const kl = (h1, wit = '#E4DED2') => _vbMix(h1, wit, 1 - geel);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  _vbGloed(ctx, 0, 0, 125, BIO.klier, hl);
  const KAPSEL = omtrek(th => 96 + 1.2 * Math.sin(th * 4 + 0.5)), WAND_O = omtrek(_vbRo), WAND_I = omtrek(_vbRi);
  if (ka > 0.01) {
    ctx.save(); ctx.globalAlpha *= ka;
    // kapsel + theca (schotten tussen de plooien)
    ctx.beginPath(); bioPad(ctx, KAPSEL, true); shape(ctx, kl('#C98A6A'), lighten(kl('#D9A080'), 0.15), L(1.6));
    ctx.fillStyle = rgba(kl('#9C6A4A'), 0.35); for (let i = 0; i < 110; i++) { const th = hash(i * 3 + 7) * 6.283, rr = lerp(_vbRo(th) + 2, 94, hash(i * 3 + 8)); ctx.beginPath(); ctx.ellipse(Math.cos(th) * rr, Math.sin(th) * rr, 1.5, 1, th, 0, 6.283); ctx.fill(); }
    // centrale holte met stolsel
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.fillStyle = kl('#7E3236', '#D8D0C4'); ctx.fill();
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.clip();
    ctx.strokeStyle = rgba(kl('#E0A0A0'), 0.45); ctx.lineWidth = L(1); for (let i = 0; i < 14; i++) { const a0 = hash(i + 40) * 6.283, a1 = a0 + 1 + hash(i + 41) * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a0) * 50, Math.sin(a0) * 50); ctx.quadraticCurveTo((hash(i + 42) - 0.5) * 40, (hash(i + 43) - 0.5) * 40, Math.cos(a1) * 50, Math.sin(a1) * 50); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const an = hash(i * 5 + 60) * 6.283, rr = Math.sqrt(hash(i * 5 + 61)) * 42; ctx.beginPath(); ctx.ellipse(Math.cos(an) * rr, Math.sin(an) * rr, 2.2, 1.4, an, 0, 6.283); ctx.fillStyle = rgba(kl('#C2453E'), 0.7); ctx.fill(); }
    ctx.restore();
    // gele wand: luteïnecellen
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_O, true); bioPad(ctx, WAND_I.slice().reverse(), true); ctx.clip('evenodd');
    ctx.fillStyle = kl('#D9A84A'); ctx.fillRect(-100, -100, 200, 200);
    polys.forEach((c, i) => { if (i === hi && receptoren > 0.01) return; ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, kl('#EDCB6A'), kl('#F6E2A0'), L(0.8));
      ctx.beginPath(); ctx.arc(c.c[0] + (hash(i) - 0.5) * 1.5, c.c[1] + (hash(i + 1) - 0.5) * 1.5, 1.7, 0, 6.283); ctx.fillStyle = rgba(_vbMix('#6E5A9E', '#BDB4A8', 1 - geel), 0.85); ctx.fill(); });
    ctx.restore();
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.strokeStyle = kl('#C9963A'); ctx.lineWidth = L(1.4); ctx.stroke();
    // haarvaten: vanuit het kapsel langs de schotten naar binnen, met zijtakjes de kwabben in
    ctx.strokeStyle = rgba(kl('#C2453E'), 0.9); for (let sp = 0; sp < _VB_SEP; sp++) { const th = _VB_F0 + sp * 6.283 / _VB_SEP; const r0 = 95, r1 = _vbRi(th) + 1;
      ctx.lineWidth = L(1.6); ctx.beginPath(); bioPad(ctx, [[Math.cos(th) * r0, Math.sin(th) * r0], [Math.cos(th + 0.03) * lerp(r0, r1, 0.5), Math.sin(th + 0.03) * lerp(r0, r1, 0.5)], [Math.cos(th) * r1, Math.sin(th) * r1]], false); ctx.stroke();
      ctx.lineWidth = L(1); for (const sd of [-1, 1]) for (let b = 0; b < 2; b++) { const t0 = th + sd * (0.12 + b * 0.16), rr0 = _vbRo(t0) - 1, rr1 = lerp(rr0, _vbRi(t0), 0.55 + 0.3 * hash(sp * 4 + b + (sd > 0 ? 2 : 0)));
        ctx.beginPath(); ctx.moveTo(Math.cos(t0) * (rr0 + 3), Math.sin(t0) * (rr0 + 3)); ctx.quadraticCurveTo(Math.cos(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.sin(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.cos(t0 + sd * 0.02) * rr1, Math.sin(t0 + sd * 0.02) * rr1); ctx.stroke(); } }
    // gemarkeerde cel met LH-receptoren
    if (receptoren > 0.01) {
      ctx.beginPath(); bioPad(ctx, H.pts, true); shape(ctx, kl('#F2D27A'), (C.teal || '#5BA4C9'), L(1.6));
      ctx.beginPath(); ctx.arc(H.c[0], H.c[1], 1.9, 0, 6.283); ctx.fillStyle = '#6E5A9E'; ctx.fill();
      const celRing = [...celPad, celPad[0]], nr = 12; ctx.lineWidth = L(1);
      for (let j = 0; j < nr; j++) { const vis = clamp(receptoren * nr * 1.2 - j * 0.9, 0, 1); if (vis <= 0) continue; const q = bioPunt(celRing, (j + 0.5) / nr); const p1 = [q[0], q[1]];
        let nx = Math.sin(q[2]), ny = -Math.cos(q[2]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl; if (nx * (p1[0] - H.c[0]) + ny * (p1[1] - H.c[1]) < 0) { nx = -nx; ny = -ny; }
        const len = 2.8 * vis + 0.15 * Math.sin(t * 3 + j); ctx.strokeStyle = (C.tealL || '#9ED0EA'); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p1[0] + nx * len, p1[1] + ny * len); ctx.stroke();
        ctx.beginPath(); ctx.arc(p1[0] + nx * (len + 0.6), p1[1] + ny * (len + 0.6), 0.95 * vis, 0, 6.283); shape(ctx, (C.teal || '#5BA4C9'), (C.tealL || '#9ED0EA'), L(0.8)); }
    }
    ctx.restore();
  }
  // wit lichaam (litteken): golvend, wit, vezelig
  if (alb > 0.01) {
    ctx.save(); ctx.globalAlpha *= alb; const AL = omtrek(th => 86 * (1 + 0.1 * Math.sin(th * 7 + 0.4) + 0.05 * Math.sin(th * 13 + 1)));
    ctx.beginPath(); bioPad(ctx, AL, true); shape(ctx, '#E4DED2', '#F4F0E8', L(1.6));
    ctx.strokeStyle = rgba('#B8AE9E', 0.6); ctx.lineWidth = L(1.1);
    for (let k2 = 1; k2 <= 3; k2++) { const R2 = omtrek(th => 86 * (1 - k2 * 0.22) * (1 + 0.14 * Math.sin(th * 7 + 0.4 + k2) + 0.05 * Math.sin(th * 11)), 60); ctx.beginPath(); bioPad(ctx, R2, true); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  return uit;
}
// =====================================================================================
// EILEIDER in lengtedoorsnede, variant met as en lumen-functie (22 okt 2026, Anticonceptie, soa's en voortplantings-
// techniek). Naast eileiderLangs (Van bevruchting tot baby); gebruik bij nieuwe films bij voorkeur één van de twee. Recept: ± 10–12 cm lang; vanaf de baarmoeder isthmus (smal, lumen ± 1 mm, dikke spierwand) → ampulla
// (wijd, ± 1 cm, dunne wand, sterk geplooid slijmvlies; hier vindt de bevruchting plaats) → trechter met franjes
// (fimbriae) die over de eierstok liggen. Slijmvlies met trilhaarcellen die naar de baarmoeder slaan, plus
// spiercontracties. Ontsteking (salpingitis, vooral chlamydia/gonorroe): wand rood en gezwollen, plooien plakken
// aan elkaar, daarna littekens (fibrose) die het lumen vernauwen of afsluiten → eicel/embryo blijft steken
// (buitenbaarmoederlijke zwangerschap of onvruchtbaarheid). Bron: Junqueira h. 22; Sadler h. 2; RIVM chlamydia.
// Bekende fouten: een rechte buis van gelijke dikte; franjes als losse streepjes zonder trechter.
// x0 = baarmoederkant (links), x1 = trechterkant (rechts), yc = as. o: ontst 0..1, litteken 0..1, t, eicel (0..1 = plek
// langs de buis van rechts naar links), dicht 0..1 (volledig afgesloten), trilhaar (toon trilharen).
// Geeft { lumen(u) → [x, y, straal] } terug (u = 0 baarmoeder … 1 trechter).
// =====================================================================================
function eileiderDoorsnede(ctx, x0, x1, yc, o = {}) {
  const { a = 1, t = 0, ontst = 0, litteken = 0, trilhaar = 1, s = 1, franjes = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = x1 - x0; const zw = 1 + 0.18 * ontst;
  const buiten = (u) => lerp(46, 120, Math.pow(u, 1.25)) * s * zw; // halve dikte buitenwand
  const lumen = (u) => Math.max(4 * s, lerp(8, 82, Math.pow(u, 1.4)) * s * (1 - 0.25 * ontst)); // halve wijdte lumen
  const yAs = (u) => yc + Math.sin(u * 5.2) * 10 * s;
  const N = 80; const top = [], bot = [], lt = [], lb = [];
  for (let i = 0; i <= N; i++) { const u = i / N, x = x0 + u * L, y = yAs(u); top.push([x, y - buiten(u)]); bot.push([x, y + buiten(u)]); lt.push([x, y - lumen(u)]); lb.push([x, y + lumen(u)]); }
  const wandCol = ontst > 0.01 ? _mixHex(BIO.spier, '#D2453A', 0.45 * ontst) : BIO.spier;
  // spierwand
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  shape(ctx, rgba(wandCol, 0.7), rgba(BIO.spierL, 0.8), 2);
  // kringspiervezels (dwars) in de wand
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.45); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const u = k / 70, x = x0 + u * L, y = yAs(u); ctx.beginPath(); ctx.moveTo(x, y - buiten(u) + 4); ctx.lineTo(x + 6, y - lumen(u) - 6); ctx.moveTo(x, y + buiten(u) - 4); ctx.lineTo(x + 6, y + lumen(u) + 6); ctx.stroke(); } ctx.restore();
  // slijmvlies met plooien (vingers het lumen in), sterker geplooid in de ampulla
  const slijmCol = ontst > 0.01 ? _mixHex(BIO.slijm, '#E0503F', 0.6 * ontst) : BIO.slijm;
  ctx.beginPath(); lt.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(lb[i][0], lb[i][1]); ctx.closePath(); ctx.fillStyle = rgba('#2E1E2A', 0.9); ctx.fill();
  const plooi = (sd) => { const nP = 30; for (let k = 0; k < nP; k++) { const u = 0.03 + (k + 0.5) / nP * 0.94, x = x0 + u * L, y = yAs(u); const lr = lumen(u); const lenF = lerp(0.35, 0.78, u) * (0.75 + 0.5 * hash(k * 5 + (sd > 0 ? 1 : 2))) * (1 + 0.2 * ontst); const w = (L / nP) * 0.62;
      const by = y + sd * (lr + 2 * s), ty = y + sd * lr * (1 - lenF), lean = (hash(k * 3 + 7) - 0.5) * w * 0.8;
      const pts = [[x - w, by], [x - w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x - w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x + w, by]];
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.closePath(); shape(ctx, rgba(slijmCol, 0.9), rgba(BIO.slijmD, 0.75), 1.2);
      if (u > 0.55 && lenF > 0.5) { ctx.beginPath(); ctx.ellipse(x + lean * 0.4, lerp(by, ty, 0.6), w * 0.18, lr * lenF * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.slijmD, 0.25); ctx.fill(); }
      if (trilhaar > 0.01) { ctx.save(); ctx.globalAlpha *= trilhaar; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 1.3; for (let c = 0; c < 4; c++) { const v = (c + 0.5) / 4; const p = bioPunt(pts, v); const sl = Math.sin(t * 9 + k * 0.7 + c) * 0.5 + 0.5; const nx = -sd * 0.0, dx = -(5 + 5 * sl) * s, dy = -sd * (4 + 3 * (1 - sl)) * s;
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[0] + dx * 0.3, p[1] + dy, p[0] + dx, p[1] + dy * 0.7); ctx.stroke(); } ctx.restore(); } } };
  plooi(-1); plooi(1);
  // trechter met franjes
  if (franjes > 0.01) { const ue = 1, xe = x1, ye = yAs(ue), R = buiten(ue); ctx.save(); ctx.globalAlpha *= franjes; for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31; const len = (70 + 22 * Math.sin(k * 1.7)) * s; const wob = Math.sin(t * 1.4 + k) * 6 * s;
      const sx = xe - 6 * s, sy = ye + Math.sin(an) * R * 0.9; const ex = sx + Math.cos(an) * len + 20 * s, ey = sy + Math.sin(an) * len * 0.8 + wob;
      ctx.strokeStyle = rgba(wandCol, 0.8); ctx.lineWidth = 15 * s; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + 10 * s, (sy + ey) / 2 - wob, ex, ey); ctx.stroke();
      ctx.strokeStyle = rgba(slijmCol, 0.9); ctx.lineWidth = 7 * s; ctx.stroke(); } ctx.restore(); }
  // littekens: lichte vezelbanden die het lumen dichtknijpen
  if (litteken > 0.01) { const plekken = [0.28, 0.5, 0.66]; plekken.forEach((u0, i) => { const g = clamp(litteken * 1.6 - i * 0.3, 0, 1); if (g <= 0.01) return; const x = x0 + u0 * L, y = yAs(u0), lr = lumen(u0);
      ctx.save(); ctx.globalAlpha *= g; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 34 * s, y + sd * (lr + 10 * s)); ctx.quadraticCurveTo(x, y + sd * lr * (1 - 1.05 * g), x + 34 * s, y + sd * (lr + 10 * s)); ctx.lineTo(x + 34 * s, y + sd * buiten(u0) * 0.9); ctx.lineTo(x - 34 * s, y + sd * buiten(u0) * 0.9); ctx.closePath(); shape(ctx, rgba('#EDE2DA', 0.92), '#C9B8AE', 1.5);
          ctx.strokeStyle = rgba('#B8A498', 0.8); ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const yy = y + sd * (lr * (1 - g * 0.9) + 8 * s + k * 9 * s); ctx.beginPath(); ctx.moveTo(x - 26 * s, yy); ctx.bezierCurveTo(x - 8 * s, yy - 5 * s, x + 8 * s, yy + 5 * s, x + 26 * s, yy); ctx.stroke(); } } ctx.restore(); }); }
  ctx.restore();
  return { lumen: (u) => [x0 + u * L, yAs(u), lumen(u)], buiten: (u) => buiten(u) };
}
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }

// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// BACTERIËN VAN SOA'S — variant A 'kurkentrekker, duidelijk insluitsel, gedeelde schaal' (27 okt 2026).
// Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten
//   naar elkaar, samen ± 1,5 × 0,8 µm (OpenStax Microbiology 3.3: diplococcus = 'a pair of two cocci').
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; het insluitsel (eigen membraan, dubbele lijn)
//   ligt naast de kern en zit vol kleine, dichte elementaire lichaampjes (± 0,3 µm, besmettelijk) en grotere,
//   lichte reticulaire lichaampjes (± 1 µm, delen zich); groei 0..1 laat het insluitsel groeien en de RB's
//   omzetten in EB's; barst 0..1: de cel scheurt en de EB's komen vrij.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen; een
//   echte schroef (kurkentrekker): windingen voor (dik, licht) en achter (dun, donker) wisselen af; de flagellen
//   liggen binnen het omhulsel en laten het lichaam draaien (OpenStax Microbiologie 4.3).
// SCHAAL: een lichaamscel ± 15–20 µm; gonokok ± 1,5 µm (± 1/12 van de cel); spirocheet 10 µm lang maar dunner
//   dan een gonokok. Zet ze in één beeld op deze verhouding, of label 'vergroot'.
// Bekende fouten: alle bacteriën als staafjes; spirocheet als vlakke sinuslijn; insluitsel en kern als gelijke
//   doorzichtige vlekken.
// Aanroepen zoals voorheen: gonokok(ctx, x, y, s, rot, {a, col, dood, deel}); chlamydiaCel(ctx, x, y, r, {a, t,
//   groei, barst}); spirocheet(ctx, x, y, len, {a, t, rot, col, dood, n}).
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const b = clamp(barst, 0, 1), g = clamp(groei, 0, 1);
  // lichaamscel: neutraal cytoplasma, membraan dat bij barsten opengaat
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.85 * (1 - 0.6 * b)); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.beginPath(); const gat = b * 1.2; ctx.arc(x, y, r, -0.6 + gat / 2, -0.6 - gat / 2 + 6.283); ctx.stroke();
  // kern: paars, eigen rand, kernlichaampje; wordt door het insluitsel opzij gedrukt
  const kx = x + r * lerp(0.3, 0.45, g), ky = y - r * lerp(0.15, 0.3, g), kr = r * lerp(0.3, 0.24, g);
  ctx.beginPath(); ctx.ellipse(kx, ky, kr, kr * lerp(0.9, 0.7, g), 0.5, 0, 6.283); shape(ctx, rgba(C.kern, 0.85), C.kernR, Math.max(1, r * 0.015));
  ctx.beginPath(); ctx.arc(kx - kr * 0.2, ky + kr * 0.1, kr * 0.25, 0, 6.283); ctx.fillStyle = '#4A3A78'; ctx.fill();
  // insluitsel: eigen membraan (dubbele lijn), RB's groot en licht, EB's klein en dicht
  const ir = r * lerp(0.15, 0.55, g), ix = x - r * 0.2, iy = y + r * 0.12;
  if (b < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - b; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); ctx.fillStyle = rgba('#3A3448', 0.9); ctx.fill(); ctx.strokeStyle = _mixHex(C.koraal, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1, r * 0.012); ctx.stroke(); ctx.beginPath(); ctx.arc(ix, iy, ir - Math.max(2, r * 0.025), 0, 6.283); ctx.stroke(); ctx.restore(); }
  const n = Math.round(lerp(4, 60, g)); const rb = Math.max(2.5, r * 0.055), eb = Math.max(1.4, r * 0.022);
  for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, d = Math.sqrt(hash(k * 7 + 2)) * (ir - rb * 1.4); const isEB = hash(k * 3.3) < lerp(0.1, 0.75, g);
    const uit = isEB ? b * r * (0.5 + 0.9 * hash(k)) : 0; const dir = -0.6 + (hash(k * 5) - 0.5) * 1.6; const px = ix + Math.cos(an) * d + Math.cos(dir) * uit + Math.sin(t * 2 + k) * r * 0.004, py = iy + Math.sin(an) * d + Math.sin(dir) * uit;
    if (!isEB && b > 0.5) continue; ctx.beginPath(); ctx.arc(px, py, isEB ? eb : rb, 0, 6.283); if (isEB) { ctx.fillStyle = C.koraal; ctx.fill(); } else shape(ctx, rgba(C.koraal, 0.25), _mixHex(C.koraal, '#FFFFFF', 0.3), 1); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round';
  const c = dood > 0.5 ? '#6A7488' : col; const ph = dood > 0.5 ? 0 : t * 6; const amp = len * 0.05, dik = Math.max(1.4, len * 0.016); const N = n * 24;
  const pt = i => { const u = i / N, w = u * n * 6.283 - ph; return [(u - 0.5) * len + Math.cos(w) * amp * 0.35, Math.sin(w) * amp, Math.cos(w)]; }; // lichte schuinte: lussen = schroef
  for (const voor of [false, true]) { for (let i = 0; i < N; i++) { const p = pt(i), q = pt(i + 1); if ((p[2] > 0) !== voor) continue; ctx.strokeStyle = voor ? _mixHex(c, '#FFFFFF', 0.15) : _mixHex(c, '#1A2740', 0.45); ctx.lineWidth = voor ? dik * 1.25 : dik * 0.8; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }
  ctx.restore();
}
// DEFINITIEF (inbouw 28 okt 2026): variant B, ongewijzigd overgenomen. Recept hieronder.
// STAAFBACTERIE — variant B 'zoals onder de elektronenmicroscoop' (27 okt 2026): bacterieEcht() met bacterieCel() en
// Inbouw 28 okt 2026: hernoemd van bacterie() naar bacterieEcht(), omdat bacterie(ctx, x, y, len, rot, o) uit lib_micro_evo.js (evolutie) dezelfde naam heeft en later laadt.
// bacterieGroot() als dunne omhulsels, zodat oude aanroepen blijven werken en elke film dezelfde bacterie krijgt.
// Recept (C9; OpenStax Microbiology 3.3; Brock h. 2): staafje ± 1 µm breed × 2–3 µm lang, uiteinden halfrond.
// Celwand (peptidoglycaan) als dikke laag buiten het dunne celmembraan, met een smalle spleet ertussen (twee
// lagen). Geen kern: het DNA is één ringvormig chromosoom, sterk opgekruld als losse kronkellus in het midden
// (nucleoïde, paars zoals alle DNA, C1); plasmide = klein los ringetje DNA (paars, dunner). Ribosomen (70S,
// ± 20 nm) als veel kleine stipjes in C.ribo buiten de nucleoïde. Flagel ± 20 nm dik, 2–4× de cellengte,
// schroefvormig, verankerd met een basaal lichaam in wand + membraan aan een pool.
// Antibiotica (o.antibiotica 0..1, bv. penicilline): gaten in de wand, het membraan puilt door een gat naar
// buiten en scheurt → inhoud lekt weg. o.riboHl 0..1 = ribosomen lichten op (aangrijpingspunt van andere
// antibiotica), o.hlWand 0..1 = wand licht op (goud, geen gloed).
// Eén wandkleur (o.col, standaard gedempt oker: organisme, C1); cytoplasma neutraal.
// Aanpak B (naar EM-doorsneden, Brock fig. 2.x): de nucleoïde is een lichter, vezelig gebied zonder rand (vele
// korte DNA-lussen, paars) in plaats van één lijn; ribosomen liggen als korte kralensnoertjes (polysomen) en
// losse korrels; fimbriae als korte rechte haartjes rondom (o.fimbriae, standaard aan); flagel met haak.
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; DNA als strakke spiraalveer; ribosomen
// als grote bollen; twee verschillende bacteriën in één reeks.
// bacterieEcht(ctx, x, y, L, {a, t, rot, h, antibiotica, hlWand, riboHl, flagel, plasmide, col, seed})
//   L = lengte in px, h = breedte (standaard L / 2,5). Geeft {wand, ribo, dna, plasmide, wandAt(an)} terug.
function bacterieEcht(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, flagel = false, plasmide = false, col = '#B89A62', seed = 3, fimbriae = true } = o;
  const riboHl = o.riboHl != null ? o.riboHl : (o.hlRibo || 0); const ab = clamp(antibiotica, 0, 1);
  const hw = (o.h != null ? o.h : L / 2.5) / 2, ww = Math.max(2, hw * 0.16), half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.12, ky = 0, plx = half * 0.62, ply = hw * 0.32;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky), plasmide: T(plx, ply),
    wandAt: an => T(Math.cos(an) * L / 2, Math.sin(an) * hw) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - Math.max(1.5, hw * 0.06)).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // fimbriae: korte rechte haartjes loodrecht op de wand
  if (fimbriae && hw > 14) { ctx.strokeStyle = rgba(_mixHex(col, '#FFFFFF', 0.3), 0.6); ctx.lineWidth = Math.max(0.8, hw * 0.018); omtrek(hw, 60).forEach((q, i) => { if (hash(i * 3.3 + seed) < 0.35) return; const l = hw * (0.18 + 0.1 * hash(i)); ctx.beginPath(); ctx.moveTo(q.p[0], q.p[1]); ctx.lineTo(q.p[0] + q.n[0] * l, q.p[1] + q.n[1] * l); ctx.stroke(); }); }
  // flagel aan de linkerpool, achter de cel
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 90; i++) { const u = i / 90, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba(C.text, 0.7); ctx.lineWidth = Math.max(1.2, hw * 0.05); ctx.stroke(); }
  // cytoplasma (neutraal) met ribosomen
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba('#2A3448', 0.85); ctx.fill();
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  const nr = Math.round(L * hw / 130 + 14); const rr = Math.max(0.9, hw * 0.03);
  const vrij = (px, py) => !(Math.pow((px - kx) / (half * 0.8 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.52), 2) < 1) && !(plasmide && Math.hypot(px - plx, py - ply) < hw * 0.22);
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2 + seed) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4; if (!vrij(px, py)) continue;
    const poly = hash(i * 5.5) > 0.55 ? 5 : 1; const an = hash(i * 8.1) * 6.283; for (let k = 0; k < poly; k++) { const qx = px + Math.cos(an + Math.sin(k) * 0.5) * k * rr * 2.4, qy = py + Math.sin(an + Math.sin(k) * 0.5) * k * rr * 2.4; if (!vrij(qx, qy)) break;
      ctx.beginPath(); ctx.arc(qx, qy, rr * (1 + 0.5 * riboHl), 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex(C.ribo, C.goud, riboHl) : rgba(C.ribo, 0.8); ctx.fill(); } }
  // nucleoïde: vezelig gebied zonder rand: licht vlak + veel korte kronkellussen DNA (paars)
  ctx.beginPath(); ctx.ellipse(kx, ky, half * 0.78 + hw * 0.15, hw * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.12); ctx.fill();
  ctx.strokeStyle = rgba(C.paars, 0.95); ctx.lineWidth = Math.max(0.9, hw * 0.028);
  const nl = Math.round(10 + L / 12); for (let i = 0; i < nl; i++) { const u = hash(i * 4.1 + seed) * 6.283, d = Math.sqrt(hash(i * 2.3 + seed)); const bx = kx + Math.cos(u) * d * (half * 0.72), by = ky + Math.sin(u) * d * hw * 0.38;
    const lr = hw * (0.07 + 0.06 * hash(i)); const Q = []; for (let k = 0; k < 6; k++) { const v = k / 6 * 6.283 + i; Q.push([bx + Math.cos(v) * lr * (1 + 0.5 * hash(i * 9 + k)), by + Math.sin(v) * lr * 0.8 * (1 + 0.5 * hash(i * 5 + k))]); } ctx.beginPath(); bioPad(ctx, Q, true); ctx.stroke(); }
  // plasmide: klein ringetje, licht gedraaid
  if (plasmide) { const pr = hw * 0.15; const Q = []; for (let i = 0; i < 12; i++) { const u = i / 12 * 6.283; Q.push([plx + Math.cos(u) * pr * (1 + 0.15 * Math.sin(u * 3)), ply + Math.sin(u) * pr * 0.75]); }
    ctx.beginPath(); bioPad(ctx, Q, true); ctx.strokeStyle = _mixHex(C.paars, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, hw * 0.035); ctx.stroke(); }
  ctx.restore();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.1, hw * 0.035);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr * 1.3, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 1 - u); ctx.fill(); } }
  // celwand: dikke band (één kleur), met gaten bij antibiotica; oplichten = gouden rand
  const wand = omtrek(hw - ww / 2, 96);
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  const rand = hlWand > 0.01 ? _mixHex(_mixHex(col, '#FFFFFF', 0.35), C.goud, hlWand) : _mixHex(col, '#FFFFFF', 0.35);
  for (const pass of [[rand, ww + Math.max(1.5, ww * 0.25)], [col, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  if (flagel) { ctx.strokeStyle = C.text; ctx.lineWidth = Math.max(1.5, hw * 0.07); ctx.beginPath(); ctx.moveTo(-L / 2 + ww * 0.5, 0); ctx.quadraticCurveTo(-L / 2 - hw * 0.15, -hw * 0.1, -L / 2 - hw * 0.25, hw * 0.05); ctx.stroke(); ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.line, C.text, 1); }
  ctx.restore(); return ret;
}
// Oude aanroepen blijven werken:
// bacterieCel(ctx, x, y, L, {a, t, rot, antibiotica, hlWand, hlRibo, flagel}) → {wand, ribo, dna}
function bacterieCel(ctx, x, y, L, o = {}) { const r = bacterieEcht(ctx, x, y, L, Object.assign({ plasmide: false }, o)); return { wand: r.wand, ribo: r.ribo, dna: r.dna }; }
// bacterieGroot(ctx, x, y, w, h, {a, t, wandKapot, riboHl, col}) → {wand(an)}; col blijft werken maar valt terug op de bankkleur
function bacterieGroot(ctx, x, y, w, h, o = {}) { const { wandKapot = 0, riboHl = 0, a = 1, t = 0 } = o; const r = bacterieEcht(ctx, x, y, w, { a, t, h, antibiotica: wandKapot, riboHl, plasmide: true }); return { wand: an => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] }; }

// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom, met tight junctions (wordt de placenta); binnenste celmassa (embryoblast) als klompje
// ronde cellen aan één kant (wordt het kind); holte vol vocht (blastocoel). PGT (o.gat 0..1): met een dunne glazen
// pipet door een opening in de zona worden 5–10 trofoblastcellen weggezogen, aan de kant tegenover de celmassa.
// Uitkomen (o.hatch 0..1, eind week 1): de zona wordt dunner, scheurt op één plek, de blastocyste perst zich door de
// opening naar buiten (insnoering in de opening) en laat de lege zona achter; daarna kan ze zich innestelen (dag 6).
// Bron: Sadler h. 3; WSU Gross Anatomy 'Week 1 of human development'; UNSW Embryology (hatching, assisted hatching);
// ESHRE PGT-consortium. Bekende fouten: ring van gelijke rondjes; gat dat niet te zien is; uitkomen als verdwijnende zona.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1, hatch = 0 } = o; if (a <= 0.01) return;
  const h = clamp(hatch, 0, 1), uit = icm + Math.PI; // opening tegenover de celmassa
  const ux = Math.cos(uit), uy = Math.sin(uit);
  const ret = { icm: [0, 0], tegenover: [x + ux * r * 0.9, y + uy * r * 0.9] };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const opening = Math.max(gat > 0.01 ? 0.18 * gat : 0, h > 0 ? lerp(0.12, 0.45, clamp(h * 2, 0, 1)) : 0);
  // zona (dunner bij uitkomen, met opening)
  if (zona > 0.01) { const zw = Math.max(2, r * 0.05 * (1 - 0.45 * h)); ctx.beginPath(); if (opening > 0) ctx.arc(x, y, r * 1.1, uit + opening, uit - opening + 6.283); else ctx.arc(x, y, r * 1.1, 0, 6.283);
    ctx.strokeStyle = rgba('#F6EEDC', 0.75 * zona); ctx.lineWidth = zw; ctx.stroke(); if (!opening) { ctx.fillStyle = rgba('#F6EEDC', 0.1 * zona); ctx.fill(); } }
  // de blastocyste zelf: bij uitkomen schuift het midden door de opening naar buiten; insnoering bij de opening
  const sh = ease(h) * r * 1.6, cx0 = x + ux * sh, cy0 = y + uy * sh;
  const n = 26, cel = [];
  for (let k = 0; k < n; k++) { const an = k / n * 6.283; let px = cx0 + Math.cos(an) * r * 0.88, py = cy0 + Math.sin(an) * r * 0.88;
    if (h > 0.01) { // punten die nog achter de opening zitten: blijven binnen de zona, ingesnoerd
      const rel = (px - x) * ux + (py - y) * uy; const lim = r * 1.05 * Math.cos(opening); if (rel < lim) { const q = [px - x, py - y], d = Math.hypot(q[0], q[1]); if (d > r * 0.92) { px = x + q[0] / d * r * 0.92; py = y + q[1] / d * r * 0.92; } }
      const lat = (px - x) * -uy + (py - y) * ux, langs = (px - x) * ux + (py - y) * uy; if (Math.abs(langs - r * 1.1) < r * 0.25) { const mx = r * 1.1 * Math.sin(opening) * 1.05; if (Math.abs(lat) > mx) { const kk = mx / Math.abs(lat); px = x + ux * langs + -uy * lat * kk; py = y + uy * langs + ux * lat * kk; } } }
    cel.push([px, py, an]); }
  ctx.beginPath(); bioPad(ctx, cel.map(c => [c[0], c[1]]), true); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  const verwijderd = (an) => { if (gat <= 0.01) return false; const d = Math.abs(Math.atan2(Math.sin(an - uit), Math.cos(an - uit))); return d < 0.32 * gat; };
  cel.forEach(([cx, cy, an], k) => { if (verwijderd(an)) return; const p = cel[(k + 1) % n], q = cel[(k - 1 + n) % n]; const ra = Math.atan2(p[1] - q[1], p[0] - q[0]);
    ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.13, r * 0.06, ra, 0, 6.283); shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', Math.max(0.7, r * 0.008));
    if (r > 25) { ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.045, r * 0.026, ra, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); } });
  // binnenste celmassa
  const ix = cx0 + Math.cos(icm) * r * 0.55, iy = cy0 + Math.sin(icm) * r * 0.55; ret.icm = [ix, iy];
  const PP = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  PP.forEach(([u, v]) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', Math.max(0.7, r * 0.008));
    if (r > 25) { ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); } });
  // PGT-pipet: dunne glazen buis van buitenaf door de opening, met de weggezogen cellen erin
  if (gat > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(gat * 2, 0, 1); const pw = r * 0.16, L = r * 1.6, tip = [x + ux * r * 0.98, y + uy * r * 0.98];
    ctx.translate(tip[0], tip[1]); ctx.rotate(uit); ctx.fillStyle = rgba('#DDE9F0', 0.18); ctx.fillRect(0, -pw / 2, L, pw); ctx.strokeStyle = rgba('#DDE9F0', 0.85); ctx.lineWidth = Math.max(1, r * 0.015);
    ctx.beginPath(); ctx.moveTo(0, -pw / 2); ctx.lineTo(L, -pw / 2); ctx.moveTo(0, pw / 2); ctx.lineTo(L, pw / 2); ctx.stroke();
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(r * (0.25 + 0.24 * k) * gat, 0, r * 0.11, pw * 0.38, 0, 0, 6.283); shape(ctx, '#EBC9A0', '#C9A27A', 1); } ctx.restore(); }
  ctx.restore(); ret.tegenover = [cx0 + ux * r * 0.9, cy0 + uy * r * 0.9]; return ret;
}

// =====================================================================================
// ===== Chromosomen (Erfelijkheid 1, herbouw 25 okt 2026) · GEKEURD door Kamiel 25 okt 2026 (ronde 1), eerst gebruikt in Chromosomen v2 =====
// Lessen en registratie: bibliotheek/lessen_chromosomen.md
// Vier recepten: huidDoorsnede, kernChromatine (+ chromatideX), nucleosoomDraad, onderarm.
// DNA altijd via dnaDraad (lib_micro_evo.js, C10.4: één DNA-functie overal); die moet vóór het tekenen geladen zijn.
// =====================================================================================

// ---------- Voronoi op willekeurige zaadpunten (gecachet), zoals _bioCellen maar met eigen punten ----------
// pts = [[x,y],…]; rmax(i) = grootste straal per cel. Geeft [{c, pts}] terug; gaatje van 'gap' px tussen de cellen.
function _bioVoronoi(key, pts, rmax, gap = 2, N = 36) {
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const out = pts.map((p, i) => { const R = typeof rmax === 'function' ? rmax(i) : rmax, P = [];
    const buren = pts.filter((q, j) => j !== i && Math.abs(q[0] - p[0]) < R * 2.2 && Math.abs(q[1] - p[1]) < R * 2.2);
    for (let k = 0; k < N; k++) { const an = k / N * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = R;
      for (const q of buren) { const dx = q[0] - p[0], dy = q[1] - p[1], dd = Math.hypot(dx, dy), proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); }
      best = Math.max(0, best - gap / 2); P.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts: P }; });
  _bioPolyCache[key] = out; return out;
}

// =====================================================================================
// HUID IN DOORSNEDE (dunne huid, onderarm). Recept (bron: OpenStax Anatomy & Physiology § 5.1; Barrandon & Green
// 1985 PNAS; Sun e.a. 2021 Int J Dermatol Venereol):
//  - opperhuid ± 75–100 µm dik, in lagen van boven naar onder: hoornlaag (10–15 lagen dode, platte cellen zonder
//    kern, ± 1 µm dik en 25–40 µm breed, bovenaan schilferend), korrellaag (2–3 lagen platte cellen met donkere
//    korrels, kern verdwijnt), stekelcellaag (4–6 lagen veelhoekige cellen met ronde kern, naar boven platter),
//    basale laag (één rij kubische tot cilindrische cellen ± 8–10 µm, kern ovaal, af en toe een delende cel).
//  - pigmentcel (melanocyt) in de basale laag, ± 1 op 7 basale cellen, licht cytoplasma, 3–4 uitlopers die tussen
//    de cellen omhoog lopen; melaninekorrels gaan naar de cellen erboven en liggen als 'kapje' boven de kern.
//    Bij albinisme zijn de pigmentcellen er wél, maar zonder melanine (o.mel = 0).
//  - basaalmembraan golvend: lederhuidpapillen steken omhoog (afstand ± 100–150 µm); in elke papil een haarvatlus.
//  - lederhuid: bindweefsel met collageenbundels en spoelvormige kernen (fibroblasten).
//  Bekende fouten: honingraat of raster van gelijke cellen; kern in de dode hoornlaag; pigmentcel bovenin;
//  een vlakke rechte basaalmembraan; melanine als vlakke bruine kleur in plaats van korrels.
// x, y = linksboven; w × h in px; o.um = breedte in micrometer (bepaalt de celgrootte); o.mel 0..1.6 (0 albinisme,
// 1 gewoon, 1,6 na zon); o.deling 0..1 = één basale cel in deling; o.hl = 'hoorn'|'levend'|'basaal'|'pigment'.
// Geeft { s (px per µm), yHoorn, yBasaal(x), pig:[[x,y]], deel:[x,y] } terug voor labels en zoom.
// =====================================================================================
// Inbouw 28 okt 2026 (Kamiel: geen duidelijke winnaar → huidige versie): alleen de bevestigde fout hersteld: lagen van de
// levende opperhuid in de zoom beter te onderscheiden: basale laag donkerder met hogere kern (kubisch tot cilindrisch),
// korrellaag lichter met duidelijker donkere korrels (plat). Bronnen: Plastic Surgery Key 'Skin basics' (basaal 'cuboidal
// to columnar', korrellaag afgeplat met keratohyaline korrels), Labster 'Epidermis layers' (basaal kubisch/cilindrisch),
// Atlas Megías Vigo (korrellaag: 3–5 lagen platte cellen). Werkwijze uit variant C; haarvatlus en rest ongewijzigd.
function huidDoorsnede(ctx, X0, Y0, w, h, o = {}) {
  const x = 0, y = 0; // alles in lokale coördinaten (cache blijft geldig als de plaat verschuift)
  const { a = 1, um = 260, mel = 1, deling = 0, hl = null, t = 0, seed = 5, huidTint = '#D9B8A0' } = o; if (a <= 0.01) return {};
  const s = w / um, key = 'huid' + w + 'x' + h + 'u' + um + 's' + seed;
  const yTop = y + 6 * s;                                  // bovenkant hoornlaag
  const corneum = 16 * s, korrel = 9 * s;
  const lam = 115, A = 22;                                 // papilafstand en hoogte (µm)
  const bm = (xx) => { const u = (xx - x) / s; const b = Math.pow(0.5 + 0.5 * Math.cos((u - 40) / lam * 6.283), 2.2); return y + (6 + 16 + 9 + 82) * s - A * s * b + Math.sin(u * 0.05 + seed) * 1.5 * s; };
  const yLevend = yTop + corneum;                          // grens hoornlaag / korrellaag
  const yKorrel = yLevend + korrel;                        // grens korrellaag / stekelcellaag
  ctx.save(); ctx.translate(X0, Y0); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  // ---- lederhuid (alleen onder de basaalmembraan) ----
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) - 2); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#5E4652'; ctx.fill(); ctx.clip();
  // papillaire laag iets lichter langs de basaalmembraan
  ctx.fillStyle = '#6E5260'; ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) + 34 * s); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#56404C'; ctx.fill();
  // collageenbundels: lange golvende banden
  for (let i = 0; i < 26; i++) { const yy = y + (i / 26) * h * 1.2, ph = hash(i * 7.1 + seed) * 6.28, th = (1.4 + hash(i * 3.3) * 2.2) * s;
    ctx.strokeStyle = rgba('#B88A92', 0.32 + 0.2 * hash(i * 1.9)); ctx.lineWidth = th; ctx.lineCap = 'round'; ctx.beginPath();
    for (let xx = x - 10; xx <= x + w + 10; xx += 8) { const py = yy + Math.sin((xx - x) / (38 * s) + ph) * 5 * s + Math.sin((xx - x) / (11 * s) + ph * 2) * 1.2 * s; xx === x - 10 ? ctx.moveTo(xx, py) : ctx.lineTo(xx, py); } ctx.stroke(); }
  // fibroblasten: spoelvormige kernen
  for (let i = 0; i < Math.round(w / (30 * s)); i++) { const fx = x + hash(i * 5.7 + seed) * w, fy = bm(fx) + (14 + hash(i * 2.3) * 60) * s;
    ctx.beginPath(); ctx.ellipse(fx, fy, 6 * s, 1.4 * s, (hash(i * 9.1) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#6E5A8E', '#8E7AAE', 1); }
  // haarvatlus in elke papil, met rode bloedcellen
  for (let k = -1; k < um / lam + 1; k++) { const px = x + (40 + k * lam) * s; if (px < x - 30 * s || px > x + w + 30 * s) continue; const top = bm(px) + 7 * s, r = 3.6 * s, dx = 5.5 * s;
    ctx.strokeStyle = '#A8564C'; ctx.lineWidth = 2 * r + 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - dx, y + h + 10); ctx.lineTo(px - dx, top + dx); ctx.arc(px, top + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, y + h + 10); ctx.stroke();
    ctx.strokeStyle = '#7A3A36'; ctx.lineWidth = 2 * r - 2.4; ctx.stroke();
    for (let j = 0; j < 9; j++) { const u = ((j / 9 + t * 0.05) % 1); const L1 = (y + h - top), Ltot = 2 * L1 + Math.PI * dx; let d = u * Ltot, cx2, cy2;
      if (d < L1) { cx2 = px - dx; cy2 = y + h - d; } else if (d < L1 + Math.PI * dx) { const an = Math.PI + (d - L1) / dx; cx2 = px + Math.cos(an) * dx; cy2 = top + dx + Math.sin(an) * dx; } else { cx2 = px + dx; cy2 = top + dx + (d - L1 - Math.PI * dx); }
      ctx.beginPath(); ctx.ellipse(cx2, cy2, r * 0.95, r * 0.55, 0.3, 0, 6.283); shape(ctx, '#C2453E', '#E07A6A', 1); } }
  ctx.restore();
  // ---- basaalmembraan ----
  ctx.strokeStyle = '#E8D6C4'; ctx.lineWidth = Math.max(1.5, 0.6 * s); ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 3) xx === x ? ctx.moveTo(xx, bm(xx)) : ctx.lineTo(xx, bm(xx)); ctx.stroke();
  // ---- levende opperhuid: Voronoi-cellen in rijen (rijafstand en celbreedte groeien naar boven: cellen worden platter) ----
  const seeds = [], soort = []; const rijen = [[5, 8.5, 'b'], [15, 10, 's'], [25, 11.5, 's'], [35, 13, 's'], [45, 14, 's'], [55, 16, 's'], [65, 18, 's'], [74, 22, 'k'], [80, 26, 'k'], [86, 30, 'k']];
  rijen.forEach(([z, dxu, sr], r) => { for (let u = -dxu + hash(r * 3.7 + seed) * dxu; u < um + dxu; u += dxu * (0.85 + 0.3 * hash(r * 13 + u))) {
      const xx = x + u * s; let yy = bm(xx) - z * s * (1 + 0.0) ; if (sr !== 'b') { const yb = bm(xx) - 5 * s; yy = lerp(yb, yKorrel, (z - 5) / (65 - 5)); if (sr === 'k') yy = lerp(yKorrel, yLevend, (z - 72) / 16); }
      seeds.push([xx + (hash(u * 1.3 + r) - 0.5) * dxu * 0.25 * s, yy + (hash(u * 2.1 + r * 5) - 0.5) * 2 * s]); soort.push(sr); } });
  // pigmentcellen: elke ± 7e basale cel
  let nb = 0; const pigIdx = []; soort.forEach((sr, i) => { if (sr === 'b') { if (nb % 7 === 3) pigIdx.push(i); nb++; } });
  const delIdx = soort.findIndex((sr, i) => sr === 'b' && seeds[i][0] > x + w * 0.62);
  const cel = _bioVoronoi(key, seeds, (i) => soort[i] === 'b' ? 9 * s : soort[i] === 'k' ? 16 * s : 12 * s, Math.max(1.5, 0.5 * s));
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yLevend); ctx.lineTo(x + w, yLevend); for (let xx = x + w; xx >= x; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.fillStyle = '#3E2E36'; ctx.fill(); ctx.clip();
  const melF = clamp(mel, 0, 2.5), melK = 0.75 + 0.25 * melF; // meer melanine = meer én grotere korrels
  cel.forEach((c, i) => { const sr = soort[i], isPig = pigIdx.includes(i); if (isPig) return;
    const vul = sr === 'b' ? _mixHex(huidTint, '#946650', 0.62) : sr === 'k' ? _mixHex(huidTint, '#EEDCC6', 0.6) : huidTint;
    ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, vul, _mixHex(vul, '#FFFFFF', 0.25), 1);
    const [cx, cy] = c.c;
    if (sr === 'k') { // korrellaag: platte, vervagende kern + donkere keratohyaline-korrels
      ctx.beginPath(); ctx.ellipse(cx, cy, 4 * s, 1.1 * s, 0, 0, 6.283); shape(ctx, rgba('#6E5A8E', 0.4), null);
      for (let k = 0; k < 10; k++) _bioCirc(ctx, cx + (hash(i * 11 + k) - 0.5) * 16 * s, cy + (hash(i * 7 + k * 3) - 0.5) * 2.6 * s, 0.65 * s, '#3E2E48'); return; }
    if (i === delIdx && deling > 0.01) { // delende cel (metafase): chromosomen op een rij in het midden, spoelfiguur, geen kernmembraan
      ctx.beginPath(); ctx.ellipse(cx, cy - 1 * s, 6.5 * s, 6 * s, 0, 0, 6.283); shape(ctx, _mixHex(huidTint, '#FFFFFF', 0.15), _mixHex(huidTint, '#FFFFFF', 0.4), 1);
      ctx.save(); ctx.globalAlpha *= deling; ctx.strokeStyle = rgba('#8FA0B5', 0.8); ctx.lineWidth = Math.max(0.8, 0.25 * s);
      for (let k = 0; k < 7; k++) { const yy = cy - 3.6 * s + k * 1.2 * s; ctx.beginPath(); ctx.moveTo(cx - 6 * s, cy); ctx.quadraticCurveTo(cx - 3 * s, yy, cx, yy); ctx.quadraticCurveTo(cx + 3 * s, yy, cx + 6 * s, cy); ctx.stroke(); }
      for (let k = 0; k < 6; k++) { const yy = cy - 3 * s + k * 1.2 * s; chromatideX(ctx, cx + (hash(k + i) - 0.5) * 0.6 * s, yy, 2.8 * s, Math.PI / 2 + (hash(k * 3) - 0.5) * 0.5, { w: 0.8 * s, coils: 0 }); }
      ctx.restore(); return; }
    const ry = sr === 'b' ? 3.9 * s : 3 * s * (1 - 0.35 * clamp((bm(cx) - cy) / (70 * s), 0, 1)), rx = sr === 'b' ? 2.5 * s : 3.2 * s;
    ctx.beginPath(); ctx.ellipse(cx, cy + (sr === 'b' ? 0.8 * s : 0), rx, ry, 0, 0, 6.283); shape(ctx, '#7A6098', '#9A84B8', 1);
    _bioCirc(ctx, cx + 0.6 * s, cy - 0.4 * s, 0.7 * s, '#4E3A6A');
    // melaninekapje boven de kern (alleen in de onderste lagen veel)
    const hoogte = clamp((bm(cx) - cy) / (55 * s), 0, 1), n = Math.round(melF * (sr === 'b' ? 10 : 8) * (1 - 0.7 * hoogte));
    for (let k = 0; k < n; k++) { const an = Math.PI * (1.2 + 0.6 * hash(i * 5 + k)), rr = rx * (0.95 + 0.45 * hash(k * 3 + i)); _bioCirc(ctx, cx + Math.cos(an) * rr, cy + (sr === 'b' ? 0.8 * s : 0) + Math.sin(an) * (ry + 0.5 * s) * (0.95 + 0.4 * hash(k * 7 + i)), 0.55 * s * melK, k % 3 ? '#5A3420' : '#3E2216'); } });
  // pigmentcellen: licht lichaam, donkere kern, uitlopers tussen de cellen omhoog, korrels
  const pig = [];
  pigIdx.forEach((i, j) => { const [cx, cy] = cel[i].c; pig.push([cx, cy]);
    const uit = [[-1.0, -0.55, 20], [-0.35, -1.0, 24], [0.4, -1.0, 22], [1.0, -0.45, 18]];
    uit.forEach(([dx, dy, L], k) => { const P = [[cx, cy - 1.5 * s]]; for (let q = 1; q <= 4; q++) { const u = q / 4; P.push([cx + dx * L * u * s + Math.sin(q * 2.1 + k + j) * 2.2 * s, cy - 1.5 * s + dy * L * u * s]); }
      ctx.strokeStyle = melF > 0.05 ? '#6A4430' : '#D8C8B6'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.5 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
      ctx.lineWidth = 0.8 * s; ctx.beginPath(); bioPad(ctx, P.slice(2), false); ctx.stroke();
      if (melF > 0.05) for (let q = 1; q < 7; q++) { const pp = bioPunt(P, q / 7); if (hash(j * 17 + k * 5 + q) < 0.7 * Math.min(1, melF)) _bioCirc(ctx, pp[0], pp[1], 0.6 * s, '#3E2216'); } });
    ctx.beginPath(); bioPad(ctx, cel[i].pts.map(p => [cx + (p[0] - cx) * 0.92, cy + (p[1] - cy) * 0.92]), true); shape(ctx, '#E9DCCB', _mixHex('#E9DCCB', '#B8927E', 0.4), 1);
    ctx.beginPath(); ctx.ellipse(cx, cy + 0.5 * s, 2.3 * s, 2.8 * s, 0, 0, 6.283); shape(ctx, '#5A4478', '#7A6098', 1);
    for (let k = 0; k < Math.round(melF * 16); k++) { const an = hash(j * 31 + k) * 6.283, rr = (3.2 + hash(k * 7 + j) * 2.2) * s; _bioCirc(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.8, 0.7 * s, k % 2 ? '#5A3420' : '#3E2216'); } });
  ctx.restore();
  // ---- hoornlaag: gestapelde platte plaatjes zonder kern, bovenaan los ----
  ctx.save(); ctx.beginPath(); ctx.rect(x, yTop - 8 * s, w, yLevend - yTop + 8 * s); ctx.clip();
  const nl = 10, dz = corneum / nl; ctx.fillStyle = '#B8A088'; ctx.fillRect(x, yTop, w, yLevend - yTop);
  for (let l = 0; l < nl; l++) { const yy = yLevend - (l + 0.5) * dz, br = 34 * s; let u0 = -hash(l * 3.1 + seed) * br;
    for (let xx = x + u0; xx < x + w; xx += br * (0.9 + 0.25 * hash(l * 7 + xx))) { const lift = l >= nl - 2 ? (hash(xx * 0.01 + l) < 0.35 ? (l - nl + 3) * 1.6 * s : 0) : 0;
      roundRect(ctx, xx + 1, yy - dz * 0.36 - lift, br * 0.97, dz * 0.72, Math.min(dz * 0.36, 4)); shape(ctx, l > nl - 4 ? '#E4D4BA' : '#D8C2A4', null); } }
  ctx.restore();
  // ---- markering ----
  if (hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    if (hl === 'hoorn') { ctx.strokeRect(x + 3, yTop - 4 * s, w - 6, yLevend - yTop + 4 * s); }
    if (hl === 'levend') { ctx.beginPath(); ctx.moveTo(x + 3, yLevend); ctx.lineTo(x + w - 3, yLevend); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.stroke(); }
    if (hl === 'basaal') { ctx.beginPath(); for (let xx = x + 3; xx <= x + w - 3; xx += 3) xx === x + 3 ? ctx.moveTo(xx, bm(xx) - 12 * s) : ctx.lineTo(xx, bm(xx) - 12 * s); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx) + 1); ctx.closePath(); ctx.stroke(); }
    if (hl === 'pigment') pig.forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py - 6 * s, 14 * s, 0, 6.283); ctx.stroke(); }); }
  ctx.restore();
  return { s, yTop: yTop + Y0, yLevend: yLevend + Y0, yKorrel: yKorrel + Y0, yBasaal: (xx) => bm(xx - X0) + Y0, pig: pig.map(p => [p[0] + X0, p[1] + Y0]), basaal: cel.filter((c, i) => soort[i] === 'b' && !pigIdx.includes(i) && i !== delIdx).map(c => [c.c[0] + X0, c.c[1] + Y0]), deel: delIdx >= 0 ? [cel[delIdx].c[0] + X0, cel[delIdx].c[1] + Y0] : null };
}

// =====================================================================================
// CELKERN MET CHROMATINE die condenseert tot chromosomen. Recept (bron: OpenStax Biology 2e § 10.1; Genetic Science
// Learning Center Utah; BioNumbers 109953):
//  - kern 5–10 µm, omhuld door een dubbel kernmembraan met poriën; kernlichaampje als donkerdere vlek.
//  - in de interfase ligt het DNA als lange, zacht kronkelende draden (chromatine); elk chromosoom houdt zijn eigen
//    gebied in de kern (chromosoomterritorium), dus geen één grote warboel maar 46 losse kluwens die in elkaar grijpen.
//  - vlak voor de deling (DNA al gekopieerd) trekken DEZELFDE draden samen tot X-vormige chromosomen: twee
//    zusterchromatiden vast bij het centromeer. De lengtes volgen het aantal baseparen (chr 1 ± 249 Mb … chr 21 ± 47 Mb).
//  - de condensatie is een morph langs de draad (C8), geen overvloeier: elk punt van de draad schuift naar een punt
//    op de opgerolde chromatide; op het eind blijft de oprolling als lichte windingen in de chromatide zichtbaar.
//  Bekende fouten: zigzag- of veerpatroon (Kamiel 15 okt); krabbels die naar staafjes faden; alle chromosomen even lang.
// cx, cy, r = kern; o.c = 0 (interfase) … 1 (gecondenseerd); o.n = aantal chromosomen (46); o.seed; o.kleuren =
// functie (i) → kleur (bv. vader/moeder); o.membraan 0..1. Geeft de posities van de chromosomen terug.
// =====================================================================================
const CHROM_MB = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156, 57]; // 1–22, X, Y (GRCh38, Mb)
function _chromLayout(n, r, seed) { // plekken voor n chromosomen in een kern met straal r (gecachet)
  const key = 'cl' + n + 'r' + r + 's' + seed; if (_bioPolyCache[key]) return _bioPolyCache[key];
  const L = []; for (let i = 0; i < n; i++) { const nr = i < 44 ? Math.floor(i / 2) : (i === 44 ? 22 : 22); L.push({ nr, len: CHROM_MB[nr] }); }
  const pos = []; let tries = 0;
  L.forEach((c, i) => { const ln = r * 0.26 * c.len / 249 + r * 0.05; let best = null, bd = -Infinity;
    for (let k = 0; k < 60; k++) { const an = hash(seed * 13 + i * 31 + k * 7) * 6.283, rr = Math.sqrt(hash(seed * 7 + i * 17 + k * 3)) * (r * 0.78 - ln * 0.5), px = Math.cos(an) * rr, py = Math.sin(an) * rr, rot = (hash(i * 5 + k + seed) - 0.5) * 2.4;
      let dmin = 1e9; for (const q of pos) dmin = Math.min(dmin, Math.hypot(q.x - px, q.y - py) - (q.ln + ln) * 0.32); if (dmin > bd) { bd = dmin; best = { x: px, y: py, rot, ln, nr: c.nr }; } }
    pos.push(best); tries++; });
  _bioPolyCache[key] = pos; return pos;
}
function _chromDoel(P, s, w, coils) { // punt op de opgerolde X: s 0..0.5 = chromatide 1 (boven → onder), 0.5..1 = chromatide 2 (onder → boven)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2; // u: 0 = boven, 1 = onder
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42, cy = yy + Math.cos(ph) * w * 0.12;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
// =====================================================================================
// LOSSE X (twee zusterchromatiden + centromeer) in de stijl van kernChromatine (variant A, beeldbank 27 okt 2026).
// Recept (OpenStax Biology 2e § 10.2 en 13.1; Utah GSLC): na de S-fase bestaat een chromosoom uit twee identieke
// zusterchromatiden, vast bij het centromeer (cohesine); het centromeer ligt meestal niet in het midden (cen ≈ 0,38).
// Elke chromatide is één opgerold DNA-molecuul: de oprolling als lichte dwarse windingen.
//  - v2: de windingen volgen exact de middellijn van de arm (dezelfde kwadratische boog) en staan loodrecht op die lijn,
//    halve lengte 0,38 w, en niet in de ronde toppen (u 0,05–0,95): niets steekt meer buiten de arm.
//  Bekende fouten: losse grijze streepjes naast de armtoppen (v1); X als één staaf; centromeer in het midden.
// x, y = centromeer; len = lengte; rot = draaiing; o.w, o.kleur, o.donker, o.cen, o.uiteen 0..1, o.coils (0 = egaal).
// =====================================================================================
function chromatideX(ctx, x, y, len, rot, o = {}) {
  const { a = 1, w = len * 0.16, kleur = C.kernR, donker = C.kern, cen = 0.38, uiteen = 0, coils = 9 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const q = (p0, p1, p2, t) => [(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]];
  const qd = (p0, p1, p2, t) => [2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]), 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])];
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + uiteen * w * 1.2);
    const A0 = [off + k * w * 0.5, -len * cen], A1 = [off, -len * cen * 0.4], M = [off * 0.75, 0], B1 = [off, len * (1 - cen) * 0.4], B2 = [off + k * w * 0.5, len * (1 - cen)];
    ctx.beginPath(); ctx.moveTo(A0[0], A0[1]); ctx.quadraticCurveTo(A1[0], A1[1], M[0], M[1]); ctx.quadraticCurveTo(B1[0], B1[1], B2[0], B2[1]);
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (coils > 0 && w >= 8) { ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1);
      const n = coils * 2; for (let i = 0; i < n; i++) { const u = 0.05 + 0.9 * (i + 0.5) / n; const boven = u < cen, t = boven ? u / cen : (u - cen) / (1 - cen);
        const P = boven ? q(A0, A1, M, t) : q(M, B1, B2, t), D = boven ? qd(A0, A1, M, t) : qd(M, B1, B2, t), L = Math.hypot(D[0], D[1]) || 1, tx = D[0] / L, ty = D[1] / L, nx = -ty, ny = tx;
        if (Math.abs(u - cen) < 0.035) continue; // niet over het centromeer
        const h = w * 0.38, b = w * 0.12; ctx.beginPath(); ctx.moveTo(P[0] - nx * h - tx * b, P[1] - ny * h - ty * b); ctx.quadraticCurveTo(P[0] + tx * b, P[1] + ty * b, P[0] + nx * h - tx * b, P[1] + ny * h - ty * b); ctx.stroke(); } } });
  if (uiteen < 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * (1 - uiteen / 0.3), donker);
  ctx.restore();
}
// ---- DNA-DRAAD, verhuisd uit lib_micro_evo.js (evolutie) naar lib_bio.js (beeldbank 27 okt 2026), zodat kernChromatine,
// nucleosoomDraad en cdKluwen geen evolutiefilmmap meer nodig hebben. Zelfde aanroep en zelfde beeld.
const _bioL = (h, k = 0.25) => _mixHex(h, '#FFFFFF', k);
function _bioCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _bioGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }

// =====================================================================================
// DNA-DRAAD. Recept (Part C9 Moleculen): rechtsdraaiende dubbele helix, 2 nm breed, één winding per ±10 bp (3,4 nm),
// grote en kleine groef ongelijk; kleur paars. Op een kleine schaal (w < 6 px) is de helix niet meer te zien: dan een
// touw met een lichte rand en een donkere kern die om de halve winding onderbreekt (suggereert de draaiing).
// Bekende fouten: platte ladder; linksdraaiend; een te dun lijntje dat in de achtergrond verdwijnt (Kamiel: 'ietsje dikker').
// P = punten van het pad; o.w = breedte in px; o.dicht = ring (plasmide, bacteriechromosoom).
// =====================================================================================
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = C.kernR, donker = C.kern, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = glad ? _bioCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _bioGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _bioL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }

// =====================================================================================
// CELKERN MET CHROMATINE (variant A, beeldbank 27 okt 2026; inbouw 28 okt: draadlengte per chromosoom naar baseparen).
// Recept (OpenStax Biology 2e § 10.1/10.2; Utah GSLC; chr 1 ± 249 Mb, chr 21 ± 47 Mb = kleinste):
// (territoria per chromosoom: model, bron nog niet geopend in deze ronde)
//  - in de interfase ligt elk chromosoom als één losse, zacht kronkelende draad in zijn eigen gebied (territorium);
//    46 draden, lengte naar baseparen (CHROM_MB). Kernmembraan dubbel met poriën, kernlichaampje als donkere vlek.
//  - interfasedraad: lengte ∝ CHROM_MB (8 + 30·Mb/249 stappen, × 0,8): chr 1 ± 3× zo lang als chr 21; gemiddeld minder draad dan A.
//  - Beeldafspraak 15 okt: losse, zacht kronkelende draden, geen krabbel: daarom ± 1/3 zoveel draadlengte als v1 en
//    1,5 × zo dik; draaiing per stap ≤ 0,8 rad.
//  - condenseren is een morph langs de draad (C8): elk punt schuift naar de opgerolde chromatide; de windingen van de
//    oprolling komen er pas laat in (amplitude ∝ c²), zodat c = 0,4–0,6 geen stekelige pluizen geeft. De X-vorm zelf
//    (chromatideX) verschijnt pas vanaf c = 0,75, nooit als spook achter de draden.
//  Bekende fouten: krabbel van dunne lijnen (v1, c = 0); stekelige pluizen met spook-X'en (v1, c = 0,4–0,6); zigzag- of veerpatroon.
// cx, cy, r = kern; o.c 0 … 1; o.n (46); o.seed; o.kleuren(i); o.membraan 0..1; o.dichtheid (1 = standaard, 3 = oude krabbel).
// Geeft de posities van de chromosomen terug. Gebruikt dnaDraad (nu in lib_bio.js).
// =====================================================================================
function _chromDraad(i, P, r, seed, N, st = r * 0.03, draai = 0.8) { // losse kronkelende draad in het territorium van chromosoom i
  // stuurt zacht terug naar het midden van het territorium (max 0,35 rad per stap): geen knikken of punten
  const pts = []; let px = P.x, py = P.y, an = hash(i * 7 + seed) * 6.283; const terr = P.ln * 0.6 + r * 0.06;
  for (let k = 0; k < N; k++) { an += (hash(i * 131 + k * 17 + seed) - 0.5) * draai + Math.sin(k * 0.37 + i) * 0.12;
    const dx = px - P.x, dy = py - P.y, d = Math.hypot(dx, dy), dk = Math.hypot(px, py);
    const trek = Math.max(clamp((d - terr * 0.6) / (terr * 0.4), 0, 1), clamp((dk - r * 0.72) / (r * 0.12), 0, 1));
    if (trek > 0) { const doel = Math.atan2(-(dk > r * 0.72 ? py : dy), -(dk > r * 0.72 ? px : dx)); let df = doel - an; df = Math.atan2(Math.sin(df), Math.cos(df)); an += clamp(df, -0.35, 0.35) * trek; }
    px += Math.cos(an) * st; py += Math.sin(an) * st; const dd = Math.hypot(px, py); if (dd > r * 0.86) { px *= r * 0.86 / dd; py *= r * 0.86 / dd; } pts.push([px, py]); }
  return pts;
}
function _chromHer(P, N) { // pad opnieuw bemonsteren: N punten op gelijke booglengte
  const G = _bioGelijk(_bioCR(P, false, 6), 1, false), out = []; for (let k = 0; k < N; k++) { const q = G[Math.round(k / (N - 1) * (G.length - 1))]; out.push([q.x, q.y]); } return out; }
function _chromDoelA(P, s, w, coils, amp) { // als _chromDoel, met windingsamplitude amp (0 = gladde X-arm)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2;
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42 * amp, cy = yy + Math.cos(ph) * w * 0.12 * amp;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
function kernChromatine(ctx, cx, cy, r, o = {}) {
  const { a = 1, c = 0, n = 46, seed = 4, membraan = 1, kleuren = null, t = 0, dichtheid = 1, dw = Math.max(2.2, r * 0.0135) } = o; if (a <= 0.01) return [];
  const e = ease(c), pos = _chromLayout(n, r, seed);
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.94, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.28); ctx.fill();
  if (membraan > 0.01) { ctx.save(); ctx.globalAlpha *= membraan; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.008);
    [1, 0.975].forEach(f => { ctx.beginPath(); ctx.ellipse(cx, cy, r * f, r * 0.94 * f, 0, 0, 6.283); ctx.stroke(); });
    for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + 0.04; _bioCirc(ctx, cx + Math.cos(an) * r * 0.988, cy + Math.sin(an) * r * 0.94 * 0.988, Math.max(1.4, r * 0.01), C.bgMicro || '#121A26'); } ctx.restore(); }
  if (e < 0.95) { ctx.beginPath(); ctx.ellipse(cx + r * 0.22, cy - r * 0.12, r * 0.17, r * 0.14, 0.4, 0, 6.283); shape(ctx, rgba('#4E3A6A', 0.75 * (1 - e)), null); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.965, r * 0.9, 0, 0, 6.283); ctx.clip();
  const N = 80, out = [];
  pos.forEach((P, i) => { const kl = kleuren ? kleuren(i) : C.kernR, dk = kleuren ? _mixHex(kl, '#000000', 0.35) : C.kern; const w = P.ln * 0.17;
    const Nd = Math.max(8, Math.round((8 + 30 * CHROM_MB[P.nr] / 249) * 0.8 * dichtheid)); // draadlengte naar baseparen (chr 1 ± 249 Mb, chr 21 ± 47 Mb)
    const D = _chromHer(_chromDraad(i, P, r, seed, Nd, r * 0.05), N); const amp = e * e;
    const pts = D.map((p, k) => { const q = _chromDoelA(P, k / (N - 1), w, 7 + Math.round(P.ln / r * 12), amp); return [cx + lerp(p[0], q[0], e), cy + lerp(p[1], q[1], e)]; });
    if (e > 0.75) chromatideX(ctx, cx + P.x, cy + P.y, P.ln, P.rot, { a: (e - 0.75) / 0.25, w, kleur: kl, donker: dk });
    dnaDraad(ctx, pts, { w: lerp(dw, w * 0.34, e * e), kleur: kl, donker: dk, a: 1 - 0.8 * clamp((e - 0.8) / 0.2, 0, 1), helix: false });
    out.push({ x: cx + P.x, y: cy + P.y, len: P.ln, rot: P.rot, nr: P.nr }); });
  ctx.restore(); ctx.restore(); return out;
}

// =====================================================================================
// DNA ROND EIWITTEN (nucleosomen), variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) met histonen als gevouwen ketens. Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e
// § 10.1; afwikkelen en samenschuiven zijn een model, bron nog niet geopend in deze ronde):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (147 bp) om een kern van acht histonen (schijf ± 11 nm breed, ± 6 nm hoog);
//    linker-DNA ertussen. Eiwit grijsblauw (#7A8BA8), DNA paars; de wikkeling is 3D (achterkant donkerder, eerst getekend).
//  - NIEUW o.los 0..1: het DNA wikkelt vanaf beide uiteinden af (wikkeling 1,65 → 0 keer) en wordt linker-DNA; de histonschijf
//    blijft liggen en wordt iets lichter (gen 'aan', DNA 6). o.compact 0..1: nucleosomen schuiven samen tot een zigzag-stapel
//    (± 30-nm-vezel, model): kortere linkers, schijven om en om boven/onder en licht gekanteld.
//  - C: de histonkern is geen schijf met bolletjes meer: op het bovenvlak liggen de histonen als gevouwen ketens (lintmodel
//    _grKluwen, per histon een histonvouw met α-helices) en uit de rand steken dunne, slappe staarten (N-terminale staarten) die
//    over en tussen de DNA-windingen lopen (Luger e.a. 1997 Nature 389:251: histonvouw = drie α-helices met twee lussen;
//    'amino-terminal tails pass over and between the gyres of the DNA superhelix'; 146 bp in 1,65 linksdraaiende superhelixwindingen).
//  Bekende fouten: golflijn met losse bolletjes; DNA door de schijf heen; rechte linker; afwikkelen als vervagen.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt). Geeft de centra terug (lokaal, zoals v1).
// =====================================================================================
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false, los = 0, compact = 0 } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  const lo = (i) => typeof los === 'function' ? clamp(los(i), 0, 1) : (Array.isArray(los) ? clamp(los[i] || 0, 0, 1) : clamp(los, 0, 1));
  const cp = ease(clamp(compact, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const sp = lerp(L / n, R * 1.25, cp), mid = L / 2; // afstand tussen centra
  const centra = []; for (let i = 0; i < n; i++) centra.push([mid + (i - (n - 1) / 2) * sp, (i % 2 ? 1 : -1) * R * lerp(0.45, 0.62, cp)]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283, tm = (th0 + th1) / 2, l = ease(lo(i));
    const ta = lerp(th0, tm, l), tb = lerp(th1, tm, l), rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const u = k / 160, th = lerp(ta, tb, u), z = (lerp(-0.5, 0.5, lerp(u, 0.5, l))) * H * 1.05 * (1 - l) + (u - 0.5) * H * 0.2 * l;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(l > 0.97 ? 1 : D); } return { P, Z }; };
  const W = centra.map(wikkel);
  const kr = lerp(1, 0.35, cp); // kromming linker
  const linkers = []; linkers.push([[centra[0][0] - sp * 0.5 - 30, centra[0][1] + R * 0.8 * kr], W[0].P[0]]);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5 * kr], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [centra[n - 1][0] + sp * 0.5 + 30, centra[n - 1][1] - R * 0.8 * kr]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn, l = lo(i); ctx.save(); ctx.globalAlpha *= 1 - 0.25 * l;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    if (R >= 34) { ctx.save(); ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R * 0.97, ry * 0.97, 0, 0, 6.283); ctx.clip(); ctx.translate(c[0], c[1] - hz / 2); ctx.scale(1, ry / R);
      const E = _ellips(46, 40), kl = ['#8E9CB8', '#7F8FAD', '#9AA8C2', '#8696B2'];
      for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; _grKluwen(ctx, Math.cos(an) * R * 0.45, Math.sin(an) * R * 0.45, E.binnen, { bbox: E.bbox, sc: R / 120, r: 7, col: kl[k], seed: 4 + k, rot: an + 1.2, key: 'hist' + k }); }
      ctx.restore(); }
    else for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * R * 0.42, c[1] - hz / 2 + Math.sin(an) * ry * 0.42, R * 0.34, ry * 0.34, 0, 0, 6.283); shape(ctx, '#8696B2', '#A4B2CA', 1.2); }
    ctx.restore(); });
  // linker + afgewikkeld DNA als één doorlopende draad (zelfde helixfase over de naad)
  linkers.forEach((pl, i) => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  // histonstaarten: dunne slappe uitlopers vanuit de kern over en tussen de windingen
  centra.forEach((c, i) => { const ry = R * cs; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.3 + i * 0.9, P = []; let px = c[0] + Math.cos(an) * R * 0.85, py = c[1] - H * sn / 2 + Math.sin(an) * ry * 0.85, a2 = an;
      for (let q = 0; q < 9; q++) { a2 += Math.sin(q * 1.3 + k + i + t * 0.5) * 0.35; px += Math.cos(a2) * R * 0.09; py += Math.sin(a2) * R * 0.09; P.push([px, py]); }
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.strokeStyle = '#B4C0D4'; ctx.lineWidth = Math.max(1.5, R * 0.05) + 1.5; ctx.stroke(); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = Math.max(1.5, R * 0.05); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); return centra; // lokaal (as van x0,y0 langs de draad), zoals v1
}

// =====================================================================================
// ONDERARM VAN EEN CASTPERSONAGE (van boven gezien, hand plat met de handrug naar boven). Recept (antropometrie
// volwassene, DINED/ergonomietabellen: onderarm elleboog–pols ± 26 cm; hand ± 19 cm lang en ± 8,5 cm breed over de
// knokkels; pols ± 5,5–6 cm breed van boven; vingers: middelvinger ± 8 cm, wijs- en ringvinger ± 7,3–7,5 cm, pink ± 6 cm;
// duim staat schuin naar buiten vanaf de pols):
//  - één silhouet (onderarm + handrug + vingers + duim) in dezelfde vulkleur; 3 tinten: huid, schaduw langs één
//    rand, lichte strook; knokkels en nagels als lichte/donkere vlakjes; geen omlijning (Part C).
//  - huidkleur = CAST[id].huid (dezelfde persoon als in de scène); 'bruin' mengt naar een donkerder tint (zon) met een
//    bruiningsgrens bij de mouw; 'rood' = verbranding (bij albinisme in de zon: wel rood, geen bruin).
//  Bekende fouten: arm als stok zonder pols; hand even breed als de onderarm; vingers als worstjes van gelijke lengte.
// x, y = elleboog (midden); s = px per cm; o.kijk 1 = hand naar rechts. Geeft pols- en handpositie terug.
// =====================================================================================
function onderarm(ctx, x, y, s, o = {}) {
  const { a = 1, id = 'noor', outfit = null, bruin = 0, rood = 0, kijk = 1, mouw = true, mouwOp = 0 } = o; if (a <= 0.01) return {};
  const P0 = (typeof CAST !== 'undefined' && CAST[id]) || { huid: BIO.huid, topKleur: '#4D6E9C' }, Pg = (outfit && P0.garderobe && P0.garderobe[outfit]) ? Object.assign({}, P0, P0.garderobe[outfit]) : P0;
  const huid = Pg.huid, bruinKl = _mixHex(_mixHex(huid, '#5A3420', 0.38), '#8A5A3A', 0.15);
  const zon = rood > 0 ? _mixHex(huid, '#E58A80', 0.45 * clamp(rood, 0, 1)) : _mixHex(huid, bruinKl, clamp(bruin, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s); // vanaf hier in cm
  const arm = [[0, -3.7], [8, -3.6], [16, -3.3], [22, -3.0], [25.5, -2.85], [28, -3.4], [31, -4.0], [34, -4.25], [36.2, -4.1], [36.6, 0], [36.2, 4.0], [34, 4.15], [31, 3.8], [28, 3.2], [25.5, 2.8], [22, 3.0], [16, 3.4], [8, 3.8], [0, 3.9]];
  const vingers = [[-2.95, 7.2, 1.85, -0.07], [-0.95, 8.0, 1.95, -0.015], [1.05, 7.5, 1.85, 0.04], [2.9, 6.0, 1.6, 0.1]]; // y, lengte, breedte, hoek
  const vorm = (fill) => { ctx.fillStyle = fill; ctx.beginPath(); bioPad(ctx, arm, true); ctx.fill();
    vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an); roundRect(ctx, 0, -b / 2, L, b, b / 2); ctx.fill(); ctx.restore(); });
    ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); roundRect(ctx, 0, -1.1, 6.4, 2.2, 1.1); ctx.fill(); ctx.restore(); };
  vorm(zon);
  if ((bruin > 0.01 || rood > 0.01) && mouw) { ctx.save(); ctx.beginPath(); ctx.rect(-1, -6, 1 + mouwOp + 1.2, 12); ctx.clip(); vorm(huid); ctx.restore(); }
  // schaduw langs de onderrand, lichte strook boven het midden (vlakke tinten, binnen het silhouet)
  ctx.save(); ctx.beginPath(); bioPad(ctx, arm, true); ctx.clip();
  ctx.fillStyle = _mixHex(zon, '#000000', 0.14); ctx.beginPath(); ctx.moveTo(0, 2.4); ctx.bezierCurveTo(12, 2.2, 24, 1.8, 37, 2.7); ctx.lineTo(37, 6); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.1); ctx.beginPath(); ctx.moveTo(0, -1.6); ctx.bezierCurveTo(10, -1.5, 20, -1.2, 26, -0.9); ctx.bezierCurveTo(20, -0.2, 10, -0.5, 0, -0.4); ctx.closePath(); ctx.fill();
  ctx.restore();
  // pezen op de handrug (heel licht), knokkels en nagels
  ctx.strokeStyle = _mixHex(zon, '#FFFFFF', 0.06); ctx.lineWidth = 0.25; ctx.lineCap = 'round';
  vingers.forEach(([vy]) => { ctx.beginPath(); ctx.moveTo(28.5, vy * 0.45); ctx.lineTo(35, vy * 0.95); ctx.stroke(); });
  vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an);
    ctx.fillStyle = _mixHex(zon, '#000000', 0.08); ctx.beginPath(); ctx.ellipse(0.3, 0, 0.55, b * 0.36, 0, 0, 6.283); ctx.fill(); // knokkel
    ctx.fillStyle = _mixHex(zon, '#000000', 0.1); ctx.fillRect(L * 0.5, -b * 0.42, 0.18, b * 0.84);                        // middelste vingerkootje
    ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, L - 1.5, -b * 0.3, 1.2, b * 0.6, b * 0.25); ctx.fill(); ctx.restore(); }); // nagel
  ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, 4.8, -0.65, 1.3, 1.3, 0.5); ctx.fill(); ctx.restore();
  // mouw bij de elleboog
  if (mouw) { const mk = Pg.topKleur || '#4D6E9C'; roundRect(ctx, -6, -4.9, 6 + mouwOp + 1.2, 9.8, 1.5); ctx.fillStyle = mk; ctx.fill();
    ctx.fillStyle = Pg.topAccent || _mixHex(mk, '#000000', 0.2); ctx.fillRect(mouwOp - 0.2, -4.9, 1.4, 9.8); }
  ctx.restore(); return { pols: [x + kijk * 26 * s, y], hand: [x + kijk * 34 * s, y] };
}

// =====================================================================================
// DNA-REEKS · BASEVORM (puzzelstaaf sinds 27 okt 2026; ringvorm afgekeurd). Eerder: ringvorm gekeurd 25 okt 2026 (remake DNA 1, twijfel t2/t3): dé basevorm van de hele
// DNA-reeks (DNA 1–8). Eerst gebruikt in Wat is DNA? 3.0. Registratie: lessen_dna.md.
// Aanroep:  baseRing(ctx, x, y, 'A', dir, {s, a, rot, rand, bindA, plekA})
//           baseBruggen(ctx, x, y1, y2, 'A', s, a)            // waterstofbruggen tussen de paarranden
//           nucleotideRing(ctx, x, y, 'G', {s, a, explode, nummers, hl, dir, plekA})  → {p, su, b, c3, c5}
//           dnaLadderHelix(ctx, x0, y, dx, 'ATGC…', {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a}) → {klein(m), groot(m), top}
// =====================================================================================
// Vaste DNA-kleuren (C1: DNA paars). Zelfde tinten als de DNA-reeks (dnalib BC), zodat oude en nieuwe films samengaan.
const DNA_BASE = {
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' },
  rug: '#3E3366', rugR: '#8C7BBF', fosfaat: '#5E4E96', suiker: '#7A68B8',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  plek: { A: [0.33, 0.67], T: [0.33, 0.67], G: [0.2, 0.5, 0.8], C: [0.2, 0.5, 0.8] },
  // puzzelstaaf (27 okt 2026): lengte tot de paarlijn en hoogte van de letter, in eenheden van s
  len: 80, letterY: 40
};

// -------------------------------------------------------------------------------------
// BASE ALS STAAFJE MET PUZZELRAND (besluit Kamiel 27 okt 2026: geen ringen meer, overal simpele nucleotiden;
// dezelfde vorm als DNA 3–8, dnalib basePath). Recept: één staafje per base, alle basen even lang; de paarrand laat
// zien wie bij wie past (model): A punt ↔ T inkeping, C nok ↔ G sleuf. Daardoor is elke sport even lang (helix 2 nm breed).
// Bindingsplekken (stippen op de paarrand) en waterstofbruggen: A–T twee, G–C drie (goud als ze verbonden zijn).
// (x, y) = aanhechting aan de suiker; dir = +1 (base wijst omlaag) of −1 (omhoog); s = schaal (sport = 184·s, twee basen
// van DNA_BASE.len·s met een spleet ertussen). De naam baseRing blijft voor bestaande aanroepen.
// Bekende fouten: ringen (afgekeurd 27 okt 2026); basen van ongelijke lengte; randen die niet op elkaar passen.
// -------------------------------------------------------------------------------------
function _baseRand(b, px, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, f = 1 - Math.min(Math.abs(px) / hw, 1);
  if (b === 'A') return L - d + 2 * d * f; if (b === 'T' || b === 'U') return L + d - 2 * d * f;
  if (b === 'C') return Math.abs(px) <= tw ? L + d : L - d; return Math.abs(px) <= tw ? L - d : L + d; }
function basePuzzelPad(ctx, b, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, y0 = 8 * s;
  ctx.beginPath(); ctx.moveTo(-hw, y0); ctx.lineTo(hw, y0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); }
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke(); // steeltje naar de suiker
  basePuzzelPad(ctx, b, s); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); // letter rechtop
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 0.9; _bioCirc(ctx, px, _baseRand(b, px, s), 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, -4 * s, w * 1.4, L + 11 * s + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen tussen twee basen van een sport: y1 = paarlijn van base b (attach + DNA_BASE.len·s), y2 = paarlijn van de partner
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L), yb = y2 - sg * (_baseRand(c, px, s) - L); ctx.beginPath(); ctx.moveTo(x + px, ya + sg * 4 * s); ctx.lineTo(x + px, yb - sg * 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) { // v2 (26 okt 2026, frisse review DNA 1): base aan C1', C5' als knooppunt naar het fosfaat, optioneel OH aan C3'
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); } // 0 = ring-O, 1 = C1', 2 = C2', 3 = C3', 4 = C4'
  const c5 = [pt[4][0] - R * 0.75, pt[4][1] - R * 0.7]; // C5' (buiten de ring, aan C4')
  const px = c5[0] - R * 0.9 - e * 60 * s, py = c5[1] - R * 0.2 - e * 20 * s; // fosfaat aan C5'
  const bx = pt[1][0] + 16 * s + e * 30 * s, by = pt[1][1] + 6 * s + e * 50 * s; // base aan C1'
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(bx, by + 4 * s); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); _bioCirc(ctx, c5[0], c5[1], 4.5 * s, lighten(DNA_BASE.suiker, 0.2)); // ring-O, C5'
  baseRing(ctx, bx, by, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - R * 0.35, oy = pt[3][1] + R * 1.35; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 8 * s, oy - 8 * s); ctx.stroke(); text(ctx, 'OH', ox - 6 * s, oy + 12 * s, fTekst(24 * s, 700), hl === "3'" ? C.goud : C.text, 'center'); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    [[1, "1'"], [2, "2'"], [3, "3'"], [4, "4'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy), off = k === 1 ? -22 : 26; text(ctx, l, pt[k][0] + dx / d * 26 * s - (k === 2 ? 22 * s : 0), pt[k][1] + dy / d * 26 * s + 9 * s + (k === 1 ? off * s * 0.6 : 0), fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    text(ctx, "5'", c5[0] + 4 * s, c5[1] - 16 * s, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by + 60 * s], c3: pt[3], c5, c1: pt[1] };
}

// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX (één functie, morph met o.draai 0..1).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 baseparen per winding (0,34 nm per paar, 3,4 nm per winding),
// rechtsdraaiend, grote en kleine groef ongelijk (hier: de tweede streng loopt 140° i.p.v. 180° achter de eerste).
// Ruggengraat (suiker-fosfaat) buiten, basen binnen. Bij draai = 0 een platte ladder met de echte ringvormen.
// x0,y = begin van de as; dx = afstand per basepaar langs de as; seq = volgorde van de bovenste streng.
// o.open (array per sport 0..1) trekt sporten los; o.hl = index die goud omrand wordt. Achterkant donkerder (diepte).
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184; // sport = purine + pyrimidine vult precies de afstand tussen de ruggen
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e; // rechtsdraaiend: as naar rechts, bovenkant draait naar je toe
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? DNA_BASE.rugR : _mixHex(DNA_BASE.rugR, '#121A26', 0.5); ctx.lineWidth = voor ? 16 * s : 13 * s; ctx.stroke(); ctx.strokeStyle = voor ? DNA_BASE.rug : _mixHex(DNA_BASE.rug, '#121A26', 0.4); ctx.lineWidth = voor ? 9 * s : 7 * s; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen * (e > 0.05 ? (0.55 + 0.45 * (depth + 1) / 2) : 1);
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + DNA_BASE.len * k), B.y - dirAB * (8 * s + DNA_BASE.len * k), b, k, bruggenA * (1 - e * 2)); }
    else { const mid = A.y + (B.y - A.y) * 0.5; ctx.lineWidth = 11 * s; ctx.strokeStyle = DNA_BASE.base[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = DNA_BASE.base[c]; ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  // plekken van de groeven langs de bovenrand (voor labels): kleine groef tussen de toppen die 140° uit elkaar liggen
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}


// =====================================================================================
// ===== Toegevoegd 26 okt 2026 voor DNA 2 DNA kopiëren 2.0 (lichte remake; keuring twijfelscènes 25 okt 2026) =====
// DNA-replicatie: vorkmodel + vork (simulatie), DNA-polymerase (hand + klem), helicase-ring, primase, ligase,
// vrije nucleotide, baseRingRNA (U in ringvorm, teal), d2Base/d2Rug (basen in de ringvorm langs een gebogen streng),
// schaafwond op onderarm(). Lessen en registratie: lessen_dna.md (sectie DNA 2). Vereist dnaDraad niet; wel baseRing.
// =====================================================================================
// Vereist lib.js (C, rgba, lighten, ease, clamp, lerp, roundRect, shape, text, fTekst, metaText), lib_bio.js (_mixHex, _bioCirc,
// bioPad, enzymKluwen, huidDoorsnede, kernChromatine, onderarm), lib_micro_evo.js (dnaDraad), lib_cast.js (CAST, persoon).
//
// RECEPT DNA-REPLICATIE (bronnen: OpenStax-afgeleid 'DNA Replication in Prokaryotes' (Principles of Biology, CC BY); Leman & Noguchi
// 2013 Genes 4:1; Meselson & Stahl 1958 PNAS 44:671; BioNumbers 108756, 111200, 112260; zie bron/remake-2026-10/bronnen.md):
//  - DNA 2 nm breed, 0,34 nm per basenpaar (dx = 0,17 × breedte), rechtsdraaiend, ±10 bp per winding; vóór de vork blijft het DNA een
//    helix die meedraait als de helicase afwikkelt; achter de vork twee enkele strengen waarvan de basen naar elkaar toe wijzen.
//  - Nieuwe nucleotiden komen altijd aan het 3'-uiteinde: de nieuwe streng groeit 5' → 3', antiparallel aan de matrijs.
//  - Leidende streng: één primer bij het startpunt, daarna continu mét de vork mee. Volgende streng: per fragment een RNA-primer
//    (±10 nt, teal) van primase vlak achter de helicase, polymerase bouwt van de vork af tot het vorige fragment, vervangt die
//    primer door DNA, ligase sluit de knip. Okazaki-fragmenten bij eukaryoten 100–200 nt (hier korter getekend: 'niet op schaal').
//  - Helicase (eukaryoot: CMG) is een ring van zes eiwitten om de matrijs van de leidende streng en schuift 3' → 5' over die streng.
//  - Kleurbetekenis in deze film: oude (zware) streng = donker paars C.kern, nieuwe (lichte) streng = licht paars; RNA-primer teal;
//    enzymen grijsblauw #7A8BA8 met actief centrum goud (C9). Basen: de vier paarse reekstinten (A licht … G donker).
//  Bekende fouten: polymerase die 3' → 5' bouwt; Okazaki-fragmenten die naar de vork toe groeien; vork zonder primers;
//  een platte ladder vóór de vork; nucleotiden die al op de matrijs 'vastzitten' voordat het enzym er is.

const D2 = {
  oud: '#6E5A9E', oudR: '#A392D6', nieuw: '#B9ACE6', nieuwR: '#DCD4F5',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  rbase: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE', U: '#121A26' },
};
const D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
const d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];

// ---------- basen: de ringvorm van de DNA-reeks (baseRing uit lib_bio.js, besluit DNA 1 t2, 25 okt 2026) ----------
// RNA-base in dezelfde vorm (U = pyrimidine, zoals T), in de teal RNA-tinten (C1: RNA teal). Kandidaat voor lib_bio.js.
const RNA_BASE = { base: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, letter: { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' } };
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = o.geenLetter ? 'rgba(0,0,0,0)' : b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U' && !o.geenLetter) { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
// d2Base: base met voet op (x, y), wijst in richting ang; L = halve sport. Schaal zo dat purine + pyrimidine = 2L (één sport).
// Kleine basen (breedte < 9 px) als staafje in dezelfde tint (lessen_dna: ringen bij verkorting niet leesbaar).
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = DNA_BASE.len * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    ctx.beginPath(); ctx.rect(-hw, 0, hw * 2, len); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0; // wijst omhoog: dir −1
  // letter niet met de ring meedraaien: ring zonder letter tekenen, letter daarna rechtop in beeldcoördinaten (frisse review DNA 2, MOET 4)
  const k = (rna && b === 'U') ? 'T' : b, LB = rna ? RNA_BASE.letter : DNA_BASE.letter, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore();
  if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos;
  const m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), LB[b] || '#121A26', 'center'); ctx.restore(); }

// suiker-fosfaatruggengraat langs punten P (array [x,y]); o.kleur, o.bw, o.dots = indices waar een fosfaat staat
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }

// ---------- ENZYMEN ----------
// DNA-polymerase, zijaanzicht langs het DNA (recept: 'rechterhand' met handpalm, vingers en duim rond matrijs en nieuwe streng;
// vingers sluiten om een nucleotide die past; ringvormige klem (sliding clamp) houdt het enzym op het DNA). (x, y) = het actieve
// centrum (3'-uiteinde van de nieuwe streng), g = DNA-breedte in px, dir = +1 bouwt naar rechts / -1 naar links, up = +1 nieuwe streng
// boven de matrijs / -1 eronder. Twee lagen: polymeraseAchter vóór het DNA tekenen, polymeraseVoor erna.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  // lokaal: nieuwe streng op y = +0.5g? -> we werken met de nieuwe streng op y = -0.5g*(-1)... eenvoud: DNA-as op y = 0, nieuwe streng op +0.5g (na scale = boven bij up=1)
  // handpalm (achter het DNA, donker): grote vorm rond het basenpaar in het actieve centrum
  ctx.beginPath(); bioPad(ctx, [[-1.15 * g, -0.2 * g], [-0.95 * g, 0.95 * g], [-0.1 * g, 1.25 * g], [0.85 * g, 1.05 * g], [1.2 * g, 0.2 * g], [0.95 * g, -0.95 * g], [0.0, -1.2 * g], [-0.9 * g, -0.95 * g]], true);
  shape(ctx, D2.enzDD, _mixHex(D2.enzDD, '#FFFFFF', 0.25), 1.5);
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = '#8796B0'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = D2.enz, rand = hl > 0.01 ? _mixHex(D2.enzR, C.goud, hl) : D2.enzR, lw = hl > 0.01 ? 3 : 1.5;
  // duim: grijpt het nieuwe dubbelstrengs stuk achter het actieve centrum (boven de nieuwe streng)
  ctx.beginPath(); bioPad(ctx, [[-1.05 * g, 0.75 * g], [-0.75 * g, 1.22 * g], [-0.2 * g, 1.28 * g], [0.05 * g, 1.0 * g], [-0.35 * g, 0.78 * g], [-0.8 * g, 0.68 * g]], true); shape(ctx, vul, rand, lw);
  // vingers: boven de inkomende nucleotide; draaien omlaag als hij past (sluit 0 → 1)
  ctx.save(); ctx.translate(0.3 * g, 1.0 * g); ctx.rotate(lerp(0.62, -0.06, ease(sluit)));
  ctx.beginPath(); bioPad(ctx, [[0.0, 0.0], [0.2 * g, 0.32 * g], [0.75 * g, 0.3 * g], [1.0 * g, 0.0], [0.85 * g, -0.22 * g], [0.35 * g, -0.12 * g]], true); shape(ctx, vul, rand, lw);
  ctx.strokeStyle = rgba(_mixHex(vul, '#FFFFFF', 0.35), 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0.25 * g, 0.12 * g); ctx.lineTo(0.8 * g, 0.08 * g); ctx.stroke(); ctx.restore();
  // onderkaak onder de matrijs
  ctx.beginPath(); bioPad(ctx, [[-0.9 * g, -0.72 * g], [-0.6 * g, -1.18 * g], [0.3 * g, -1.22 * g], [0.95 * g, -0.95 * g], [1.05 * g, -0.68 * g], [0.2 * g, -0.74 * g]], true); shape(ctx, vul, rand, lw);
  // actief centrum (goud): de holte boven het volgende matrijsbasisje
  const pk = lerp(0.3, 0.18, ease(sluit)); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.5 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, pk * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#A4B2CA'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }

// ---------- HELICASE, PRIMASE, LIGASE (variant C, beeldbank ronde 2, 27 okt 2026) ----------
// Winnaar B (donut met gat) gecombineerd met A (schuin gezette ring met diepte, ligase als boog over de dubbele streng), alle
// eiwitten als gevouwen keten (lintmodel _grKluwen). Recept (OpenStax Biology 2e § 14.4 (Open Oregon): helicase ontwindt het DNA,
// primase maakt een RNA-primer van ± 5–10 nucleotiden, ligase maakt de fosfodiësterbinding; Leman & Noguchi 2013 (bestaand recept):
// eukaryote helicase = ring van zes Mcm-eiwitten om één streng; Pascal e.a. 2004: ligase I omringt het DNA en zet de katalytische kern op de knip):
//  - helicase: zes subeenheden, elk een klein gevouwen lint, op een ring loodrecht op de streng, 40° schuin gezien; achter de
//    streng donkerder (laag 'achter'), ervoor licht (laag 'voor'); de streng gaat zichtbaar door het gat; fase = draaien.
//  - primase: één gevouwen lint met een kort teal RNA-stukje aan het actieve centrum (goud).
//  - ligase: hoefijzervormig lint dat over de naad grijpt; sluit 0 → 1 = kaken dicht en gouden flits op de naad.
// Onder ± 26 px valt het lint weg (vlak silhouet). Aanroepen gelijk aan v2.
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sb = Math.sin(0.7), L = [];
  for (let k = 0; k < 6; k++) { const ph = k / 6 * 6.283 + fase; L.push({ x: x + Math.sin(ph) * r * 0.78 * sb, y: y + Math.cos(ph) * r * 0.78, z: Math.sin(ph), ph, k }); }
  L.sort((p, q) => p.z - q.z);
  const band = (v) => { ctx.beginPath(); ctx.ellipse(x, y, r * 0.78 * sb, r * 0.78, 0, v ? -Math.PI / 2 : Math.PI / 2, v ? Math.PI / 2 : Math.PI * 1.5); ctx.strokeStyle = v ? '#56667F' : '#323E52'; ctx.lineWidth = r * 0.34; ctx.stroke(); };
  if (laag !== 'voor') { ctx.beginPath(); ctx.ellipse(x, y, r * 0.5 * sb, r * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill(); band(false); }
  if (laag !== 'achter') band(true);
  L.forEach(p => { const voor = p.z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const col = _mixHex('#8E9CB8', '#2A3448', 0.55 * (1 - (p.z + 1) / 2)), cc = hl > 0.01 && voor ? _mixHex(col, C.goud, hl * 0.6) : col;
    const an = Math.atan2(p.y - y, (p.x - x) / sb), rx = r * 0.36, ry = r * 0.3 * (0.75 + 0.25 * Math.abs(Math.cos(p.ph)));
    if (r < 30) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); shape(ctx, cc, lighten(cc, 0.3), 1.2); ctx.restore(); return; }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(_mixHex(cc, '#121A26', 0.4), 0.8); ctx.fill();
    const E = _ellips(40, 32); _grKluwen(ctx, 0, 0, E.binnen, { bbox: E.bbox, sc: rx / 42, r: 7, col: cc, seed: 3 + p.k, key: 'heli' + p.k }); ctx.restore(); });
  ctx.restore(); }
const _PRIM = (() => { const P = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283, d = Math.abs(((u + Math.PI) % 6.283) - Math.PI), rr = 50 * (1 + 0.08 * Math.sin(u * 5 + 2)) * (d < 0.5 ? 0.55 + d * 0.9 : 1); P.push([Math.cos(u) * rr, Math.sin(u) * rr]); } return P; })();
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const col = hl > 0.01 ? _mixHex('#6F86A0', C.goud, hl * 0.6) : '#6F86A0';
  ctx.beginPath(); bioPad(ctx, _PRIM.map(([px, py]) => [px * r / 50, py * r / 50]), true);
  if (r < 26) shape(ctx, col, lighten(col, 0.3), 1.2); else { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.4), 0.8); ctx.fill(); const V = _lintVorm(_PRIM); _grKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 52, r: 7, col, seed: 2, key: 'prim' }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.22, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  if (rna > 0.01) { ctx.globalAlpha *= rna; const n = 4, st = r * 0.3, x0 = r * 1.0; for (let i = 0; i < n; i++) { ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, -i * st - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); }
  ctx.restore(); }
function _ligVorm(k) { const kaak = lerp(0.62, 0.36, k); return [[-0.9, 0], [-0.6, -0.75], [0.2, -0.95], [1.05, -kaak - 0.25], [1.15, -kaak], [0.45, -0.5], [0.3, 0], [0.45, 0.5], [1.15, kaak], [1.05, kaak + 0.25], [0.2, 0.95], [-0.6, 0.75]]; }
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const k = ease(sluit), col = hl > 0.01 ? _mixHex('#8392AE', C.goud, hl * 0.6) : '#8392AE', V0 = _ligVorm(k);
  ctx.beginPath(); bioPad(ctx, V0.map(([px, py]) => [px * r, py * r]), true);
  if (r < 26) shape(ctx, col, lighten(col, 0.3), 1.2); else { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.4), 0.8); ctx.fill(); const V = _lintVorm(V0.map(([px, py]) => [py * 100, -px * 100])); // rijen langs de boog
    _grKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 100, r: 7, col, seed: 7, rot: Math.PI / 2, key: 'lig' + Math.round(k * 4) }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.18, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, r * 1.05, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }

// vrije DNA-nucleotide: fosfaat + suiker (vijfhoek) + base; vereenvoudigd (in het kernplasma eigenlijk met drie fosfaatgroepen)
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links, base wijst omhoog (-y)
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, D2.oud, rand || D2.oudR, rand ? 3 : 1.5);
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-24 * s, 8 * s); ctx.stroke();
  _bioCirc(ctx, -30 * s, 9 * s, 9 * s, D2.oudR, rand || '#D8CFF2', rand ? 3 : 1.2);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }

// ---------- REPLICATIEVORK ----------
// st = { f: vorkpositie (bp), i0, i1: zichtbaar bereik (bp), X0: x van bp i0, cy, g: breedte (px), dx (px per bp; standaard 0,17 g),
//        Dmax: halve afstand tussen de dochters, Lsplit (bp), Ltw (bp), Lf: lengte Okazaki-fragment (bp), pl: primerlengte (bp),
//        p1: eerste primer van de volgende streng (bp), vlag: snelheid lagging-polymerase t.o.v. de vork, t: tijd (rustige beweging),
//        toon: {helicase, poly, primase, ligase, nieuw}, letters: bool, startLead: bp van de leidende primer }
// Geeft posities terug voor labels.
function vorkModel(st) { const S = Object.assign({ i0: 0, i1: 120, X0: 80, cy: 450, g: 56, Dmax: 210, Lsplit: 14, Ltw: 12, Lf: 30, pl: 4, p1: 12, vlag: 1.35, startLead: 0, lead: 3 }, st);
  S.dx = S.dx || S.g * 0.17; const X = (i) => S.X0 + (i - S.i0) * S.dx;
  const D = (i) => i >= S.f ? S.g / 2 : S.g / 2 + (S.Dmax - S.g / 2) * ease((S.f - i) / S.Lsplit);
  const yT = (i) => S.cy - D(i), yB = (i) => S.cy + D(i);
  // Okazaki-fragmenten
  const frags = []; for (let k = 1; ; k++) { const p = S.p1 + (k - 1) * S.Lf; if (p - S.pl > S.f + 2) break;
    const a = p + 2, e = a + S.pl * 0.5; const primN = clamp((S.f - a) / (S.pl * 0.5), 0, 1) * S.pl; // aantal primerbasen
    const ondergrens = k === 1 ? S.startLead : S.p1 + (k - 2) * S.Lf - S.pl + 1;     // tot waar de polymerase doorbouwt (incl. vervangen primer vorige)
    const q = Math.max(ondergrens, p - S.pl + 1 - Math.max(0, S.f - e) * S.vlag);     // 3'-uiteinde (linkerkant)
    const klaar = q <= ondergrens + 0.01, fKlaar = e + (p - S.pl + 1 - ondergrens) / S.vlag;
    frags.push({ k, p, a, e, primN, q, klaar, fKlaar, ondergrens }); }
  // per bp: wat zit er op de nieuwe onderstreng? 0 = niets, 1 = DNA, 2 = RNA-primer
  const onder = (i) => { for (const F of frags) { const lo = F.p - S.pl + 1; if (i <= F.p && i >= F.p - F.primN + 1 && i >= lo) { // primerdeel van dit fragment
        const vervangen = frags.some(G => G.k === F.k + 1 && G.q <= i); return vervangen ? 1 : 2; }
      if (i < lo && i >= F.q) return 1; } return 0; };
  // ligase-knippen: na het vervangen van een primer wordt de knip bij (p_vorige - pl + 0.5) gedicht
  const knips = frags.filter(F => F.k >= 2).map(F => { const prev = frags[F.k - 2]; const xN = prev.p - S.pl + 0.5; const tKl = F.fKlaar; return { i: xN, s: clamp((S.f - tKl) / 4, 0, 1), k: F.k }; });
  return Object.assign(S, { X, D, yT, yB, frags, onder, knips }); }

function vorkTeken(ctx, st) { const M = vorkModel(st); const { g, dx, cy, f, i0, i1, X, yT, yB } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, nieuw: 1, lead: 1, lag: 1 }, M.toon || {});
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1.6, dx * 0.34), vorm = dx >= 22, letters = !!M.letters && dx >= 30;
  const iA = Math.floor(i0), iB = Math.ceil(i1);
  // --- vóór de vork: helix die meedraait (fase volgt f) ---
  const tw = (i) => ease((i - f) / M.Ltw), fase = (i) => (i / 10) * 6.283 - f * 0.628 + 0.6;
  const Ytop = (i) => i <= f ? yT(i) : cy + lerp(-g / 2, -g / 2 * Math.cos(fase(i)), tw(i)), Ybot = (i) => i <= f ? yB(i) : cy + lerp(g / 2, g / 2 * Math.cos(fase(i) + 2.3), tw(i));
  const Ztop = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i)), tw(i)), Zbot = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i) + 2.3), tw(i));
  const pts = (fy, a, b) => { const P = []; for (let i = a; i <= b + 1e-6; i += 0.25) P.push([X(i), fy(i)]); return P; };
  // achterkant van de helix eerst
  const helixDeel = (fy, fz, kleur, voor) => { let cur = []; const segs = []; for (let i = Math.max(f, iA); i <= iB; i += 0.25) { const z = fz(i) >= 0; if (z === voor) cur.push([X(i), fy(i)]); else { if (cur.length > 1) segs.push(cur); cur = []; } } if (cur.length > 1) segs.push(cur);
    segs.forEach(P => d2Rug(ctx, P, { kleur: voor ? kleur : _mixHex(kleur, '#000000', 0.35), bw })); };
  helixDeel(Ytop, Ztop, D2.oud, false); helixDeel(Ybot, Zbot, D2.oud, false);
  // sporten vóór de vork
  for (let i = Math.max(Math.ceil(f), iA); i <= iB; i++) { const xa = X(i), ya = Ytop(i), yb = Ybot(i), mid = (ya + yb) / 2, b = d2seq(i); const z = (Ztop(i) + Zbot(i)) / 2; const dk = z < 0 ? 0.3 : 0;
    const Lh = Math.abs(yb - ya) / 2 - bw * 0.4; if (Lh < 2) continue; ctx.save(); ctx.globalAlpha *= z < 0 ? 0.8 : 1;
    d2Base(ctx, xa, ya + Math.sign(yb - ya) * bw * 0.4, yb > ya ? Math.PI / 2 : -Math.PI / 2, b, Lh, hw, { vorm: false }); d2Base(ctx, xa, yb - Math.sign(yb - ya) * bw * 0.4, yb > ya ? -Math.PI / 2 : Math.PI / 2, D2.comp[b], Lh, hw, { vorm: false }); ctx.restore(); }
  helixDeel(Ytop, Ztop, D2.oud, true); helixDeel(Ybot, Zbot, D2.oud, true);
  // --- achter de vork: twee matrijzen + nieuwe strengen ---
  const iF = Math.min(f, iB);
  if (iF > iA) {
    // helling per bp (voor schuine basen)
    const ang = (fy, i, sgn) => { const d = (fy(i + 0.3) - fy(i - 0.3)) / (0.6 * dx); return Math.atan2(1, -d) * sgn; };
    // nieuwe strengen: leidende (boven, onder de bovenmatrijs) en volgende (onder)
    const leadEind = Math.min(iF - M.lead, iB), leadStart = Math.max(M.startLead, iA);
    const yTn = (i) => yT(i) + g, yBn = (i) => yB(i) - g;
    // matrijs-basen + nieuwe basen per bp
    for (let i = iA; i <= iF; i++) { const b = d2seq(i), xa = X(i);
      const nT = toon.nieuw && toon.lead && i >= leadStart && i <= leadEind; const nB = toon.nieuw && toon.lag ? M.onder(i) : 0;
      const aT = Math.atan2(yT(i + 0.3) - yT(i - 0.3), 0.6 * dx), aB = Math.atan2(yB(i + 0.3) - yB(i - 0.3), 0.6 * dx);
      const primLead = i < M.startLead + M.pl;
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, letter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, letter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, letter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, letter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      const knip = (i) => M.knips.some(K => K.s < 1 && Math.abs(K.i - i) < 0.01);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - (knip(R.a - 0.5) ? 0.12 : 0.45), R.b + (knip(R.b + 0.5) ? 0.12 : 0.45)), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }

// =====================================================================================
// REPLICATIEVORK — inbouw 28 okt 2026: de huidige (oude) vork blijft (Kamiels keuze). Eén herstel: de helicase zat als losse
// tros naast de vork; nu zit de ring (helicaseRing, nieuwe versie uit helicasering-primase-ligase) óp de bovenste matrijsstreng,
// st.hOff bp vóór het splitspunt (standaard 1,8; was 0,6 en op de hoogte van de al gesplitste streng). Bron: replicatieve
// helicase = ring van zes eiwitten om één streng, de andere streng wordt buitengesloten (Meagher e.a. 2019 Nat Commun 10:3117;
// DnaB: 'the lagging strand binds in the central channel'). Primase, polymerase, ligase en alle DNA-tekenwerk ongewijzigd.
// Recept verder als vorkModel. Nodig: helicaseRing/primase/ligase uit inbouw/dna/helicasering-primase-ligase/DEF.js.
// =====================================================================================
// y van de bovenste (matrijs)streng op bp i, ook vóór de vork in de helix (zelfde formule als vorkTeken)
function _vorkYtop(M, i) { return i <= M.f ? M.yT(i) : M.cy + lerp(-M.g / 2, -M.g / 2 * Math.cos((i / 10) * 6.283 - M.f * 0.628 + 0.6), ease((i - M.f) / M.Ltw)); }
function vorkEnzymen(ctx, M, o = {}) { const { g, f, X, yT, yB, dx } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, lead: 1, lag: 1 }, M.toon || {}); const hl = o.hl || {}; const out = {};
  const gp = g * 0.55; // grootte enzym t.o.v. DNA (vereenvoudigd: in het echt groter)
  // helicase op de bovenste streng (matrijs van de leidende streng), net vóór de vork
  if (toon.helicase) { const hi = f + (M.hOff == null ? 1.8 : M.hOff), hx = X(hi), hy = _vorkYtop(M, hi); helicaseRing(ctx, hx, hy, g * 0.62, { fase: t * 2.4 + f * 0.5, laag: 'voor', hl: hl.helicase || 0 }); out.helicase = [hx, hy]; }
  // leidende polymerase
  if (toon.poly && toon.lead && M.leadEind > M.startLead) { const i = M.leadEind + 0.5, x = X(i), yc = (yT(i) + M.yTn(i)) / 2; const rot = Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx);
    polymeraseVoor(ctx, x, yc, gp, { dir: 1, up: -1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6), hl: hl.poly || 0 }); out.polyLead = [x, yc]; }
  // volgende streng: polymerase op het actieve fragment (of in de sprong naar de volgende primer)
  if (toon.poly && toon.lag && M.frags.length) { let F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); let x, y, rot = 0;
    if (F) { const i = F.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; rot = Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx); }
    else { const done = [...M.frags].reverse().find(F => F.klaar), nxt = M.frags.find(G => !G.klaar && (!done || G.k > done.k));
      if (done && nxt) { const u = clamp((f - done.fKlaar) / Math.max(0.5, nxt.e - done.fKlaar), 0, 1), i0 = done.q - 0.5, i1 = nxt.p - M.pl + 0.5; const ii = lerp(i0, i1, ease(u));
        x = X(ii); y = (yB(ii) + M.yBn(ii)) / 2 + Math.sin(Math.PI * ease(u)) * g * 1.6; } else if (done) { const i = done.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; } }
    if (x != null && (M.lagA == null ? 1 : M.lagA) > 0.01) { polymeraseVoor(ctx, x, y, gp, { dir: -1, up: 1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6 + 1), hl: hl.poly || 0, a: M.lagA == null ? 1 : M.lagA }); out.polyLag = [x, y]; } }
  // primase: bij de nieuwste primer, vlak achter de helicase
  if (toon.primase) { const F = [...M.frags].reverse().find(F => F.primN > 0.01); if (F && (F.primN < M.pl - 0.01 || f - F.e < 1.8)) { const i = F.p - F.primN + 0.5, x = X(i), y = M.yBn(i) + g * 0.55; primase(ctx, x, y, g * 0.42, { an: 0.4, hl: hl.primase || 0 }); out.primase = [x, y]; } }
  // ligase bij een knip die gedicht wordt
  if (toon.ligase) { const K = M.knips.find(K => K.s > 0 && K.s < 1); if (K) { const x = X(K.i), y = M.yBn(K.i) + g * 0.48; ligase(ctx, x, y, g * 0.55, { an: -1.2, sluit: K.s, hl: hl.ligase || 0 });
      if (K.s > 0.6) { ctx.save(); ctx.globalAlpha *= (1 - K.s) * 2.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, M.yBn(K.i), g * 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } out.ligase = [x, y]; } }
  return out; }
// achterlagen van de polymerasen (vóór vorkTeken aanroepen met hetzelfde model; vorkModel is goedkoop)
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + (st.hOff == null ? 1.8 : st.hOff)), _vorkYtop(M, f + (st.hOff == null ? 1.8 : st.hOff)), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx), a: st.lagA == null ? 1 : st.lagA }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }

// ---------- SCHAAFWOND op een onderarm (zelfde transformatie als onderarm: elleboog (x, y), s px per cm, kijk) ----------
// heel 0 = vers (rauw, rood, puntjes), 0,35 = korst, 0,7 = roze nieuwe huid, 1 = genezen. Recept (wondgenezing: stolsel/korst binnen
// uren, nieuwe opperhuid groeit vanaf de randen onder de korst in ±1 week): vlakke vormen, geen bloed dat druppelt.
function schaafwond(ctx, x, y, s, o = {}) { const { heel = 0, kijk = 1, a = 1, cx = 13, cyy = 0.6, rx = 2.6, ry = 1.25, seed = 3 } = o; if (a <= 0.01 || heel >= 0.999) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s);
  const rand = (k) => { const P = []; for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283; const w = 1 + 0.13 * Math.sin(an * 3 + seed) + 0.08 * Math.sin(an * 7 + seed * 2); P.push([cx + Math.cos(an) * rx * w * k, cyy + Math.sin(an) * ry * w * k]); } return P; };
  const huid = (CAST && CAST.noor && CAST.noor.huid) || '#D9A982';
  const vers = 1 - ease(heel / 0.35), korst = ease(heel / 0.35) * (1 - ease((heel - 0.55) / 0.2)), roze = ease((heel - 0.55) / 0.2) * (1 - ease((heel - 0.8) / 0.2));
  if (vers > 0.01) { ctx.save(); ctx.globalAlpha *= vers; ctx.beginPath(); bioPad(ctx, rand(1.12), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.35); ctx.fill();
    ctx.beginPath(); bioPad(ctx, rand(0.95), true); ctx.fillStyle = '#B84A44'; ctx.fill();
    for (let i = 0; i < 22; i++) { const u = hash(seed + i), v = hash(seed + i * 7); _bioCirc(ctx, cx + (u - 0.5) * rx * 1.6, cyy + (v - 0.5) * ry * 1.4, 0.07 + 0.05 * hash(i), '#7E2A2A'); }
    ctx.strokeStyle = rgba('#F0C8B8', 0.6); ctx.lineWidth = 0.06; for (let i = 0; i < 7; i++) { const yy = cyy - ry * 0.7 + i * ry * 0.23; ctx.beginPath(); ctx.moveTo(cx - rx * 0.7, yy); ctx.lineTo(cx + rx * 0.6, yy + 0.1); ctx.stroke(); } ctx.restore(); }
  if (korst > 0.01) { ctx.save(); ctx.globalAlpha *= korst; ctx.beginPath(); bioPad(ctx, rand(1.08), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.25); ctx.fill();
    const kk = 0.95 - 0.35 * ease((heel - 0.35) / 0.3); ctx.beginPath(); bioPad(ctx, rand(kk), true); ctx.fillStyle = '#6A3428'; ctx.fill(); ctx.strokeStyle = '#4E241C'; ctx.lineWidth = 0.08; ctx.stroke();
    ctx.strokeStyle = rgba('#8E4A38', 0.8); ctx.lineWidth = 0.05; for (let i = 0; i < 9; i++) { const u = hash(seed * 3 + i) - 0.5, v = hash(seed * 5 + i) - 0.5; ctx.beginPath(); ctx.moveTo(cx + u * rx * kk, cyy + v * ry * kk); ctx.lineTo(cx + u * rx * kk + 0.3, cyy + v * ry * kk + 0.12); ctx.stroke(); } ctx.restore(); }
  if (roze > 0.01) { ctx.save(); ctx.globalAlpha *= roze; ctx.beginPath(); bioPad(ctx, rand(1.0), true); ctx.fillStyle = _mixHex(huid, '#E89A9A', 0.4); ctx.fill(); ctx.restore(); }
  ctx.restore(); }


// =====================================================================================
// GESLACHTSORGANEN EN PUBERTEIT 2.0 (26 okt 2026): hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema,
// schaalStreep. Vereist ook hormoonVorm (lib_hormonen.js). Status: in de film, wacht op Kamiels keuring.
// =====================================================================================
// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 2 (gebruikt in de film 26 okt 2026; nog niet door Kamiel gekeurd als bibliotheekobject). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
// HORMOONDEELTJE — definitief (C, ronde 2 27 okt 2026: A + FSH/LH in de stijl van eiwitVouw).
// Recept (BEELDAFSPRAKEN: kleine moleculen krijgen een structuurvorm; OpenStax Biology 2e 3.3 en A&P 17.2):
// · steroïden (testosteron, oestradiol) = vier aan elkaar vastzittende koolstofringen: drie zesringen en één
//   vijfring (A-B-C-D). Testosteron: =O aan ring A en OH aan ring D; oestradiol: ring A aromatisch (cirkel in
//   de ring) en OH aan ring A én D. Paars (hormonen, C1), oestradiol lichter.
// · GnRH = decapeptide: kort kettinkje van 10 aminozuren (kralen), goud.
// · FSH en LH = glycoproteïnen uit twee ketens die tegen elkaar liggen: een gedeelde α-keten (± 92 aminozuren) en een
//   eigen β-keten; elk is een gevouwen kralenketen in de taal van eiwitVouw (helix als lussen met voor/achter,
//   twee strengen naast elkaar), met suikerketens (oker, vertakt) die aan de keten vastzitten. α in grijsblauw-getint,
//   β in de hormoonkleur. FSH: β langgerekt, met twee suikertakjes (α ook twee) (teal); LH: β compact, met één
//   suikertakje (groen). Let op: in het echt is FSH-β (111 aminozuren) iets kórter dan LH-β (121); hier is FSH-β
//   bewust langer getekend zodat de twee zonder kleur van vorm verschillen (vraag aan Kamiel, 28 okt 2026).
//   Suikers: FSH-β Asn7 en Asn24, α Asn52 en Asn78 (Frontiers Endocrinol. 2022); LH-β één (Asn13).
//   Op filmgrootte (r < 12) alleen de gevouwen hartlijn. Vorm verschilt dus per hormoon, niet alleen de kleur
//   (kleurenblinden). Relatieve grootte: glycoproteïnen ± 30 kDa > GnRH ± 1,2 kDa ≈ steroïde 0,3 kDa,
//   hier niet op schaal (vergroot, zelfde r) maar de eiwithormonen tekenen we iets groter (k).
// · volg = gouden ring om één deeltje dat de kijker volgt (C8, geen gloed).
// Bekende fouten: alle hormonen als capsules die alleen in kleur verschillen; steroïden als bolletjes.
// Aanroep zoals voorheen: hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false); soort = gnrh | fsh | lh | testo | oestro.
const HORM_A = { gnrh: ['#E0B64A', 0.95], fsh: ['#5BA4C9', 1.25], lh: ['#7FC48F', 1.15], testo: ['#8C7BBF', 0.72], oestro: ['#B59BE0', 0.72] };
function _hormA_ring(ctx, pts, fill, rand, lw) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); }
function _hormA_steroid(ctx, r, col, soort) { // ringen A–D, ± 3,4 r breed
  const e = r * 0.5, lw = Math.max(1, r * 0.13), fill = rgba(col, 0.45), rand = _mixHex(col, '#FFFFFF', 0.4);
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const an = Math.PI / 6 + i * Math.PI / 3; return [cx + Math.cos(an) * e, cy + Math.sin(an) * e]; });
  const w = e * Math.sqrt(3); const A = [-w * 1.5, e * 0.75], B = [-w * 0.5, e * 0.75], Cc = [0, -e * 0.75];
  _hormA_ring(ctx, hex(...A), fill, rand, lw); _hormA_ring(ctx, hex(...B), fill, rand, lw); _hormA_ring(ctx, hex(...Cc), fill, rand, lw);
  // ring D: vijfring aan de rechterkant van C
  const c1 = [Cc[0] + w / 2, Cc[1] - e / 2], c2 = [Cc[0] + w / 2, Cc[1] + e / 2]; const D = [c1, [c1[0] + e * 0.95, c1[1] - e * 0.3], [c1[0] + e * 1.5, Cc[1] + e * 0.05], [c2[0] + e * 0.95, c2[1] + e * 0.3], c2];
  _hormA_ring(ctx, D, fill, rand, lw);
  ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const oh = (p, dx, dy) => { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + dx, p[1] + dy); ctx.stroke(); ctx.beginPath(); ctx.arc(p[0] + dx * 1.25, p[1] + dy * 1.25, r * 0.17, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }; // OH-groep (O teal)
  oh([c1[0] + e * 1.5, Cc[1] + e * 0.05], e * 0.55, -e * 0.25);
  const aL = [A[0] - w / 2, A[1] + e / 2]; // linksonder van ring A
  if (soort === 'testo') { ctx.beginPath(); ctx.moveTo(aL[0], aL[1]); ctx.lineTo(aL[0] - e * 0.55, aL[1] + e * 0.3); ctx.moveTo(aL[0] + e * 0.1, aL[1] + e * 0.18); ctx.lineTo(aL[0] - e * 0.45, aL[1] + e * 0.48); ctx.stroke(); ctx.beginPath(); ctx.arc(aL[0] - e * 0.7, aL[1] + e * 0.48, r * 0.17, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(A[0], A[1], e * 0.5, 0, 6.283); ctx.stroke(); oh(aL, -e * 0.55, e * 0.25); }
}
function _hormC_vorm(n, s, r) {
  const st = r * 2.1 / s, hr = st * 0.5, hR = st * 0.78;   // stap streng, stap helix (as), straal helix (ontwerpeenheden)
  const nh1 = Math.max(4, Math.round(n * 0.28)), nl1 = Math.max(2, Math.round(n * 0.07)), ns = Math.max(3, Math.round(n * 0.15)), nt = 2, nl2 = Math.max(2, Math.round(n * 0.07));
  const nh2 = Math.max(3, Math.round(n * 0.22)); const nst = Math.max(0, n - (nh1 + nl1 + ns * 2 + nt + nl2 + nh2));
  const Ls = (ns - 1) * st, L1 = nh1 * hr, L2 = nh2 * hr; const out = [];
  const lijn = (p, q, k, soort) => { for (let i = 0; i < k; i++) { const u = k === 1 ? 0 : i / (k - 1); out.push([lerp(p[0], q[0], u), lerp(p[1], q[1], u) + (soort === 's' ? (i % 2 ? 3 : -3) : 0), 0, soort]); } };
  const helix = (p, q, k) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L; const hp = (i) => { const ph = i / 3.6 * 6.283, u = (i + 0.5) / k; const ax = L * u + Math.cos(ph) * hR * 0.55; return [p[0] + ux * ax - uy * Math.sin(ph) * hR, p[1] + uy * ax + ux * Math.sin(ph) * hR, Math.cos(ph), 'h']; };
    for (let i = 0; i < k; i++) { out.push(hp(i)); if (i < k - 1) for (const f of [0.25, 0.5, 0.75]) { const m = hp(i + f); m[3] = 'm'; out.push(m); } } };
  const lus = (pts, k) => { const D = bioDicht(pts, 40); const len = []; let acc = 0; D.forEach((d, i) => { if (i) acc += Math.hypot(d[0] - D[i - 1][0], d[1] - D[i - 1][1]); len.push(acc); });
    for (let i = 1; i <= k; i++) { const tgt = acc * i / (k + 1); let j = len.findIndex(l => l >= tgt); j = Math.max(1, j); const f = (tgt - len[j - 1]) / ((len[j] - len[j - 1]) || 1); out.push([lerp(D[j - 1][0], D[j][0], f), lerp(D[j - 1][1], D[j][1], f), 0, 'l']); } };
  const yS1 = 10, yS2 = 10 + st * 1.75, yH1 = yS1 - st * 2.5, yH2 = yS2 + st * 2.4;
  const h1a = [-Math.max(L1, Ls) / 2 - st, yH1], h1b = [h1a[0] + L1, yH1];
  helix(h1a, h1b, nh1);
  const s1a = [Ls / 2, yS1], s1b = [-Ls / 2, yS1];
  lus([h1b, [Math.max(h1b[0], Ls / 2) + st * 1.2, (yH1 + yS1) / 2], [s1a[0] + st * 0.9, yS1]], nl1);
  lijn(s1a, s1b, ns, 's');
  lus([s1b, [s1b[0] - st * 1.0, (yS1 + yS2) / 2], [s1b[0], yS2]], nt);
  const s2a = [-Ls / 2, yS2], s2b = [Ls / 2, yS2]; lijn(s2a, s2b, ns, 's');
  const h2a = [Ls / 2 + st * 0.4, yH2], h2b = [h2a[0] - L2, yH2];
  lus([s2b, [s2b[0] + st * 1.3, (yS2 + yH2) / 2], [h2a[0] + st * 0.6, yH2]], nl2);
  helix(h2a, h2b, nh2);
  let q = out[out.length - 1]; for (let i = 0; i < nst; i++) { const an = Math.PI + 0.9 * (i + 1) / Math.max(1, nst); out.push([q[0] + Math.cos(an) * st * (i + 1) * 0.8, q[1] - Math.sin(an) * st * (i + 1) * 0.5 - st * 0.4 * (i + 1), 0, 'l']); }
  const bo = out.filter(p => p[3] !== 'm'); const mx = bo.reduce((m, p) => m + p[0], 0) / bo.length, my = bo.reduce((m, p) => m + p[1], 0) / bo.length;
  const s1i = nh1 + nl1, s2i = s1i + ns + nt; const alle = []; let nb = 0;
  for (const p of out) { if (p[3] !== 'm') { if (nb >= n) break; nb++; } alle.push([(p[0] - mx) * s, (p[1] - my) * s, p[2], p[3]]); }
  return { alle, bruggen: Array.from({ length: ns }, (_, j) => [s1i + j, s2i + ns - 1 - j]) };
}
function _hormC_keten(ctx, cx, cy, w, n, col, flipx, rekx, suikers, R) { // gevouwen keten (eiwitVouw-taal) in een vak van breedte w
  const { alle } = _hormC_vorm(n, 1, 12); const xs = alle.map(p => p[0]), ys = alle.map(p => p[1]); const bw = Math.max(...xs) - Math.min(...xs), mx = (Math.max(...xs) + Math.min(...xs)) / 2, my = (Math.max(...ys) + Math.min(...ys)) / 2;
  const k = w / bw; const P = alle.map(p => [cx + (p[0] - mx) * k * (flipx ? -1 : 1) * rekx, cy + (p[1] - my) * k, p[2], p[3]]);
  const kr = k * 12, licht = _mixHex(col, '#FFFFFF', 0.38), klein = R < 12;
  const items = []; P.forEach((p, i) => { if (!klein && p[3] !== 'm') items.push({ z: p[2], i }); if (i) items.push({ z: Math.min(p[2], P[i - 1][2]) - 0.02, l: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { if (it.l) { const p = P[it.l], q = P[it.l - 1], z = (it.z + 1) / 2; ctx.strokeStyle = rgba(licht, 0.5 + 0.5 * z); ctx.lineWidth = Math.max(1, kr * (klein ? 0.9 : (p[3] === 'h' || p[3] === 'm' ? 0.35 + 0.35 * z : 0.35))); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); return; }
    const p = P[it.i], z = (p[2] + 1) / 2; ctx.beginPath(); ctx.arc(p[0], p[1], kr * (p[3] === 'h' ? 0.45 + 0.2 * z : 0.75), 0, 6.283); shape(ctx, _mixHex(_mixHex(col, '#1A2740', 0.4), col, 0.3 + 0.7 * z), licht, Math.max(0.6, kr * 0.1)); });
  // suikertakjes vast aan een kraal aan de rand, wijzend van het midden af
  const B = P.filter(p => p[3] !== 'm'); suikers.forEach(fi => { const p = B[Math.min(B.length - 1, Math.round(fi * (B.length - 1)))]; const dx = p[0] - cx, dy = p[1] - cy, L = Math.hypot(dx, dy) || 1; _hormA_suiker(ctx, p[0], p[1], dx / L * R * 0.55, dy / L * R * 0.55 - R * 0.15, R); });
}
function _hormA_suiker(ctx, x, y, dx, dy, r) { // vertakt suikertakje (oker kraaltjes)
  dx *= 0.6; dy *= 0.6; const s = r * 0.1; ctx.strokeStyle = _mixHex(C.oker, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(0.8, r * 0.08); const ex = x + dx, ey = y + dy;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.lineTo(ex + dx * 0.45 - dy * 0.35, ey + dy * 0.45 + dx * 0.35); ctx.moveTo(ex, ey); ctx.lineTo(ex + dx * 0.45 + dy * 0.35, ey + dy * 0.45 - dx * 0.35); ctx.stroke();
  [[ex, ey], [ex + dx * 0.45 - dy * 0.35, ey + dy * 0.45 + dx * 0.35], [ex + dx * 0.45 + dy * 0.35, ey + dy * 0.45 - dx * 0.35]].forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], s, 0, 6.283); ctx.fillStyle = C.oker; ctx.fill(); });
}
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, k] = HORM_A[soort] || HORM_A.gnrh; const R = r * k;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'testo' || soort === 'oestro') { ctx.translate(r * 0.15, 0); _hormA_steroid(ctx, R, col, soort); }
  else if (soort === 'gnrh') { const P = []; for (let i = 0; i < 10; i++) { const u = i / 9; P.push([lerp(-R * 1.25, R * 1.25, u), Math.sin(u * Math.PI * 1.3) * -R * 0.55 + R * 0.25]); }
    ctx.strokeStyle = _mixHex(col, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(0.8, R * 0.12); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
    P.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], R * 0.17, 0, 6.283); shape(ctx, col, _mixHex(col, '#FFFFFF', 0.4), Math.max(0.6, R * 0.05)); }); }
  else { const fsh = soort === 'fsh'; // α (gedeeld, links, iets grijzer) + β (eigen, rechts)
    _hormC_keten(ctx, -R * 0.58, R * 0.08, R * 0.9, 22, _mixHex(col, '#8FA0B5', 0.5), false, 1, [0.08, 0.62], R);
    if (fsh) _hormC_keten(ctx, R * 0.62, -R * 0.08, R * 1.2, 28, col, true, 1, [0.15, 0.55], R);
    else _hormC_keten(ctx, R * 0.48, -R * 0.02, R * 0.85, 19, col, true, 1, [0.4], R); }
  ctx.restore();
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); }
}

// =====================================================================================
// HYPOTHALAMUS EN HYPOFYSE MET HET POORTADERSYSTEEM (mediaan, voorkant = rechts).
// Recept: GnRH-cellen liggen in de hypothalamus; hun axonen eindigen in de eminentia mediana bovenaan het steeltje,
// waar ze GnRH afgeven aan een eerste haarvatnet. Poortaders lopen langs het steeltje naar een tweede haarvatnet in de
// VOORkwab; daar maken dezelfde cellen (gonadotrofe cellen) FSH en LH, die via een ader het lichaam in gaan. De
// achterkwab (zenuwweefsel) is de voortzetting van het steeltje. Hypofyse ± 1 cm (erwt), in het Turkse zadel.
// Bron: Kenhub 'Pituitary gland' (portaalsysteem naar de voorkwab, gonadotrofe cellen maken FSH en LH);
// StatPearls 'Physiology, Puberty' (GnRH in stoten). Bekende fouten: GnRH dat 'door de lucht' naar de hypofyse
// zweeft; FSH/LH uit de achterkwab; hypofyse los onder de hersenen.
// Ontwerpeenheden: ± 900 × 760, oorsprong = onderkant van de hypothalamus (bovenkant steeltje).
// o: puls 0..1 (stoot GnRH loopt door de poortaders: 0 = net afgegeven, 1 = in de voorkwab), aan 0..1 (cellen
// voorkwab maken FSH/LH), uit 0..1 (FSH/LH in de uitgaande ader), stoten 0..1 (hoe vaak: kindertijd → puberteit), t.
// =====================================================================================
// v2 (beeldbank 27 okt 2026): hypothalamus als onderkant van de hersenen (koepel van de tussenhersenen met thalamus, sulcus,
// derde hersenkamer als trechter in het steeltje, corpus mamillare achter en oogzenuwkruising vóór het steeltje); Turks zadel
// als bot met dikte en de wiggenbeenholte eronder (bron: OpenStax A&P 2e 17.3; Radiology Assistant 'Sella turcica');
// uitgaande ader opzij in plaats van door het bot.
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // ---- hersenweefsel boven: thalamus, daaronder de hypothalamus (wand en bodem van de derde hersenkamer) ----
  // mediaan gezien, voorkant rechts: achter het steeltje het corpus mamillare (bolletje), ervóór de oogzenuwkruising;
  // de bodem van de derde hersenkamer loopt als trechter (recessus) het steeltje in.
  const TOPY = -430;
  const HERSEN = [P(-470, -190), P(-430, -280), P(-310, -350), P(-150, -395), P(0, -408), P(150, -395), P(310, -350), P(430, -280), P(470, -190), P(460, -150), P(340, -110), P(250, -62), P(205, -44), P(118, -30), P(80, -20), P(60, 0), P(-60, 0), P(-100, -14), P(-140, -18), P(-210, -24), P(-260, -58), P(-340, -110), P(-460, -150), P(-470, -190)];
  ctx.beginPath(); bioPad(ctx, HERSEN, true); shape(ctx, rgba(BIO.brein, 0.5), rgba(BIO.breinS, 0.8), 2);
  // thalamus (boven), gescheiden van de hypothalamus door de groeve (sulcus hypothalamicus)
  ctx.beginPath(); ctx.ellipse(...P(-70, -330), 230 * s, 70 * s, -0.05, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.45), rgba(BIO.breinD, 0.6), 1.5);
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = 3 * s; ctx.beginPath(); bioPad(ctx, [P(-330, -230), P(-160, -250), P(40, -240), P(220, -210)], false); ctx.stroke();
  // hypothalamus iets donkerder (grijze stof met kernen)
  ctx.beginPath(); bioPad(ctx, [P(-300, -225), P(-60, -245), P(200, -205), P(240, -80), P(118, -38), P(60, -4), P(-60, -4), P(-150, -26), P(-250, -70)], true); ctx.fillStyle = rgba(BIO.breinS, 0.32); ctx.fill();
  // derde hersenkamer: smalle spleet die onderaan als trechter in het steeltje loopt
  ctx.beginPath(); bioPad(ctx, [P(-40, TOPY + 30), P(-26, -230), P(-30, -110), P(-14, -20), P(0, 30), P(14, -20), P(30, -110), P(26, -230), P(40, TOPY + 30)], true); ctx.fillStyle = rgba('#0D1420', 0.55); ctx.fill();
  // corpus mamillare (achter het steeltje) en oogzenuwkruising (vóór het steeltje, witte stof)
  ctx.beginPath(); ctx.ellipse(...P(-185, -20), 40 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  ctx.beginPath(); ctx.ellipse(...P(165, -42), 58 * s, 26 * s, -0.25, 0, 6.283); shape(ctx, rgba(BIO.wit, 0.85), rgba(BIO.breinS, 0.8), 1.5);
  // ---- Turks zadel: bot met dikte (wiggenbeen) ----
  // achterwand (dorsum sellae) met uitsteeksel, bodem onder de hypofyse, voorkant (tuberculum) en daaronder de
  // wiggenbeenholte (lucht). Het zadel omsluit de hypofyse van onder; de hypofyse raakt het bot niet.
  const ZADEL = [P(-330, 115), P(-285, 105), P(-262, 150), P(-270, 250), P(-220, 345), P(-60, 418), P(140, 420), P(290, 345), P(345, 228), P(380, 200), P(470, 205), P(475, 520), P(-370, 520), P(-355, 200)];
  ctx.beginPath(); bioPad(ctx, ZADEL, true); shape(ctx, rgba(BIO.bot, 0.82), BIO.botS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, ZADEL, true); ctx.clip();
  ctx.beginPath(); bioPad(ctx, [P(-200, 470), P(-40, 452), P(200, 452), P(360, 480), P(380, 560), P(-220, 560)], true); shape(ctx, '#2A3348', rgba(BIO.botS, 0.9), 2); // wiggenbeenholte
  for (let i = 0; i < 60; i++) { const px = lerp(-340, 460, hash(i * 3.1 + 7)), py = lerp(140, 470, hash(i * 5.3 + 2)); ctx.beginPath(); ctx.arc(...P(px, py), (2 + 3 * hash(i)) * s, 0, 6.283); ctx.fillStyle = rgba(BIO.botS, 0.45); ctx.fill(); } // sponsachtig bot
  ctx.restore();
  // achterkwab (zenuwweefsel, links) en voorkwab (klierweefsel, rechts)
  const ACHTER = [P(-40, 150), P(-170, 170), P(-215, 250), P(-170, 330), P(-60, 340), P(-10, 280), P(0, 190)];
  ctx.beginPath(); bioPad(ctx, ACHTER, true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  const VOOR = [P(10, 140), P(140, 120), P(270, 170), P(300, 260), P(240, 345), P(90, 370), P(0, 330), P(-10, 240)];
  ctx.beginPath(); bioPad(ctx, VOOR, true); shape(ctx, rgba('#C98A6A', 0.38), rgba('#E0A88A', 0.85), 2.5);
  // cellen in de voorkwab (Voronoi), de gonadotrofe cellen lichten op bij 'aan'
  const pts = []; for (let i = 0; i < 46; i++) { const rr = 16 * Math.sqrt(i + 0.6), an = i * 2.39996; pts.push([150 + Math.cos(an) * rr * 1.25, 250 + Math.sin(an) * rr * 0.95]); }
  const cellen = _bioVoronoi('hypVoor', pts, 20, 3, 20);
  ctx.save(); ctx.beginPath(); bioPad(ctx, VOOR, true); ctx.clip();
  cellen.forEach((c, i) => { const gon = i % 3 === 0; const g = gon ? aan : 0;
    ctx.beginPath(); c.pts.forEach((p, k) => { const q = P(p[0], p[1]); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    shape(ctx, gon ? _mixHex('#D9A48F', '#8FD0E8', g * 0.6) : rgba('#D9A48F', 0.55), rgba('#F2D6C4', 0.5), 1);
    const q = P(c.c[0], c.c[1]); ctx.beginPath(); ctx.arc(q[0], q[1], 4.5 * s, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); });
  ctx.restore();
  // steeltje
  ctx.beginPath(); bioPad(ctx, [P(-60, 0), P(-40, 80), P(-40, 160), P(30, 160), P(40, 80), P(60, 0)], true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  // GnRH-cellen in de hypothalamus met axonen naar de eminentia mediana
  const cel = [[-260, -250], [-120, -290], [210, -270]]; const eind = [];
  cel.forEach(([cx, cy], i) => { const [qx, qy] = P(cx, cy); const e = zenuwcel(ctx, qx, qy, { s: s * 0.9, col: '#B79AE6', naar: P(-16 + i * 16, -20), seed: i + 2, takken: 5, axonDik: 4, puls: puls >= 0 && puls < 0.25 ? puls * 4 : -1 }); eind.push(e); });
  // eerste haarvatnet (bovenaan het steeltje) → poortaders → tweede haarvatnet in de voorkwab
  const PA = [[[-10, -10], [-4, 60], [30, 120], [90, 170], [140, 220]], [[20, -10], [36, 60], [80, 110], [170, 160], [230, 230]]];
  PA.forEach((pa, i) => bloedvat(ctx, pa.map(p => P(p[0], p[1])), 8 * s, t + i * 0.3, { n: 4, cel: 5 * s, speed: 0.12, haarvat: true }));
  ctx.strokeStyle = rgba(BIO.bloed, 0.8); ctx.lineWidth = 3 * s; for (let k = -2; k <= 2; k++) { ctx.beginPath(); bioPad(ctx, [P(-40 + k * 8, -6), P(-20 + k * 12, -30), P(10 + k * 10, -8), P(40 + k * 6, -24)], false); ctx.stroke(); }
  // GnRH-stoot: deeltjes van de axoneinden langs de poortaders naar de voorkwab
  if (puls >= 0) { const u = clamp(puls, 0, 1); for (let i = 0; i < 12; i++) { const pa = PA[i % 2]; const f = clamp(u * 1.25 - (i / 12) * 0.25, 0, 1); if (f <= 0.001 || f >= 0.999) continue;
      const D = bioDicht(pa.map(p => P(p[0], p[1])), 12); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i) - 0.5) * 6 * s, py, 'gnrh', 7 * s, Math.min(1, (1 - f) * 6)); } }
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (opzij, niet door het bot)
  const UIT = [P(250, 250), P(320, 190), P(400, 150), P(520, 120)]; // naar opzij, boven het zadel langs (sinus cavernosus)
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}

// =====================================================================================
// MANNELIJKE GESLACHTSORGANEN, mediane doorsnede (zijaanzicht, buik = rechts), OP SCHAAL (1 cm = 14 px bij s = 1).
// Recept (cm): zaadbal 4–5 lang, bijbal 4–5 langs de achterkant; zaadleider ± 30 cm: vanaf de staart van de bijbal
// omhoog in de zaadstreng, door het lieskanaal de buik in, met een boog óver de urineleider naar de ACHTERkant van de
// blaas, verwijdt tot ampulla; zaadblaasje 4–5 × 1,5–2,5 tegen de achterkant van de blaas, boven de prostaat; samen
// vormen ze de spuitbuis die DOOR de prostaat in de urinebuis uitkomt; prostaat 3 × 4 × 5 (walnoot) onder de blaashals
// rond de urinebuis; schaambeen vóór de blaas, endeldarm achter prostaat en zaadblaasjes. Penis in rust ± 9 cm.
// Bron: OpenStax A&P 27.1 (maten zaadbal, route, aandelen sperma); Semmelweis anatomie (zaadleider ± 30 cm, over de
// urineleider, zaadblaasje, prostaat 3 × 4 × 5); Yale Guided Anatomy (zaadleider naar de achterkant van de blaas).
// Bekende fouten: zaadleider die rechtstreeks vanaf de zaadbal naar de prostaat loopt; zaadblaasje vóór de blaas;
// prostaat boven de blaas; zaadleider die in de blaas uitkomt.
// Oorsprong = bovenkant schaambeenvoeg. o.hl = { zaadbal, bijbal, leider, blaasjes, prostaat, blaas, buis, lies } 0..1,
// o.kring 0..1 (kringspier blaashals dicht), o.zw 0..1 (zwellichamen vol), o.dim = lijst van delen die 35 % krijgen.
// Geeft { P(cmX, cmY), route: [...px], naam: {deel: [x,y]} } terug.
// =====================================================================================
const MD = { k: 14 };
const MD_VAS = [[-0.3, 13.6], [-0.75, 11.4], [-0.2, 8.6], [1.3, 5.4], [1.7, 2.2], [1.4, -0.6], [0.4, -2.6], [-1.6, -3.7], [-4.2, -3.6], [-6.6, -2.4], [-7.6, -0.4], [-7.3, 1.6], [-6.5, 3.1], [-5.3, 4.2], [-3.9, 4.9]];
const MD_URE = [[-3.4, 3.1], [-3.4, 4.6], [-3.1, 6.2], [-2.4, 7.3], [-0.9, 7.7], [0.9, 7.2], [2.1, 6.9], [2.6, 8.2], [2.72, 10.5], [2.8, 13.4], [3.0, 14.75]]; // urinebuis langs de onderkant (kant van de balzak) in het kleine zwellichaam
const MD_BIJ = [[0.25, 9.95], [-0.45, 10.6], [-0.75, 12.0], [-0.55, 13.2], [-0.3, 13.6]];
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5), ureter: P(-10.3, -4.2) };
  if (a <= 0.01) return { P, route, naam };
  const al = d => (dim.includes(d) ? 0.35 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); shape(ctx, rgba(BIO.huid, 0.13), rgba(BIO.huid, 0.6), 2);
  // endeldarm (achter)
  ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.55); ctx.lineWidth = 3.0 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore();
  // schaambeen(voeg)
  ctx.save(); ctx.globalAlpha *= al('bot'); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.6), BIO.botS, 2); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas; de zaadleider kruist er in een boog óverheen) — eigen tint (urine), dunner
  const UL = Ps([[-11.4, -9.0], [-10.4, -4.4], [-8.9, -1.3], [-7.3, 0.1], [-6.3, 0.9]]);
  ctx.save(); ctx.globalAlpha *= al('ureter'); ctx.strokeStyle = '#7FB8C4'; ctx.lineWidth = 0.22 * k; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(C.teal, 0.22), C.teal, 2.5);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.strokeStyle = rgba(C.teal, 0.45); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.5), lighten(C.groen, 0.3), 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba(C.paars, 0.55), lighten(C.paars, 0.3), 2); ctx.restore();
  // zwellichamen + penis (rust ± 9 cm; zw maakt ze iets voller)
  ctx.save(); ctx.globalAlpha *= al('penis'); const zb = 1 + 0.12 * zw;
  ctx.beginPath(); bioPad(ctx, Ps([[0.9, 6.0], [2.6, 6.2], [3.9 * zb, 8.6], [4.05 * zb, 13.0], [3.7, 14.6], [3.1, 14.9], [2.55, 13.8], [2.45, 9.4], [2.0, 7.6], [0.7, 7.0]]), true); shape(ctx, rgba(BIO.huid, 0.22), rgba(BIO.huid, 0.75), 2);
  ctx.beginPath(); bioPad(ctx, Ps([[1.6, 6.3], [2.9, 6.5], [3.8 * zb, 8.8], [3.85 * zb, 12.9], [3.5, 13.6], [3.05, 12.8], [3.0, 9.0], [2.6, 7.2]]), true); shape(ctx, _mixHex('#8A4A48', '#B5302C', zw), rgba('#C97A70', 0.8), 1.2);
  ctx.restore();
  // zaadbal (in de balzak) met kronkelige zaadbuisjes en bijbal langs de achterkant
  ctx.save(); ctx.globalAlpha *= al('balzak'); ctx.beginPath(); bioPad(ctx, Ps([[-0.9, 10.2], [-1.5, 12.4], [-0.9, 14.6], [1.0, 15.3], [2.5, 14.4], [2.6, 12.0], [2.2, 9.9], [0.7, 9.4]]), true); shape(ctx, rgba(BIO.huid, 0.2), rgba(BIO.huid, 0.7), 2); ctx.restore();
  gl(P(1.0, 12.0), 3.0, '#D9A48F', hl.zaadbal || 0);
  ctx.save(); ctx.globalAlpha *= al('zaadbal'); const [zx, zy] = P(1.0, 12.0); ctx.translate(zx, zy); ctx.rotate(0.22); ctx.beginPath(); ctx.ellipse(0, 0, 1.3 * k, 2.2 * k, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.8), lighten('#D9A48F', 0.3), 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A4438', 0.6); ctx.lineWidth = 1.6; for (let r = 0; r < 6; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = (-1 + 2 * u) * 1.2 * k, py = (-1.8 + r * 0.7) * k + Math.sin(u * 22 + r) * 0.22 * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); ctx.restore();
  gl(P(-0.5, 11.8), 1.8, C.oker, hl.bijbal || 0);
  ctx.save(); ctx.globalAlpha *= al('bijbal'); ctx.strokeStyle = C.oker; ctx.lineWidth = 0.75 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_BIJ), false); ctx.stroke(); ctx.restore();
  // zaadleider
  { const [gx, gy] = P(-7.5, -0.1); ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, 0.8 * k, 0, 6.283); ctx.clip(); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 0.64 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke(); ctx.restore(); } // uitsparing: zaadleider ligt óver de urineleider
  const leid = hl.leider || 0; ctx.save(); ctx.globalAlpha *= al('leider'); ctx.strokeStyle = C.goud; ctx.lineWidth = (0.3 + 0.12 * leid) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke();
  const [ax, ay] = P(-7.25, 1.4); ctx.beginPath(); ctx.ellipse(ax, ay, 0.35 * k, 0.8 * k, 0.3, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); // ampulla
  // lieskanaal (schuine opening in de buikwand)
  if ((hl.lies || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.lies; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; const [lx, ly] = P(1.0, -1.6); ctx.beginPath(); ctx.ellipse(lx, ly, 0.9 * k, 1.8 * k, 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // urinebuis
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = (0.22 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE. Recept: twee zwellichamen (corpora cavernosa) naast elkaar aan de bovenkant, elk met een
// slagader in het midden, samen in een stevig vlies; één kleiner zwellichaam (corpus spongiosum) onderaan met de
// urinebuis erin; huid erom. Bij een erectie lopen de holten van de bovenste zwellichamen vol met bloed: ze worden
// groter en ronder, het vlies spant en drukt de afvoerende aders dicht. Bron: OpenStax A&P 27.1; MSD Manual 'Structure
// of the male reproductive system'. Bekende fouten: één buis; urinebuis in de bovenste zwellichamen.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = r * (1 + 0.22 * vul);
  ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), rgba(BIO.huid, 0.9), 2);
  const cr = R * (0.42 + 0.04 * vul);
  for (const d of [-1, 1]) { const cx = x + d * R * 0.44, cy = y - R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.283); shape(ctx, _mixHex('#7A3E44', '#B02A2A', vul), '#E8D8DE', 2.5 + 1.5 * vul);
    for (let i = 0; i < 22; i++) { const an = i * 2.39996, rr = cr * 0.85 * Math.sqrt((i + 0.5) / 22); const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
      ctx.beginPath(); ctx.arc(px, py, cr * (0.06 + 0.08 * vul), 0, 6.283); ctx.fillStyle = rgba(vul > 0.5 ? '#E05A4A' : '#3A1A22', 0.8); ctx.fill(); }
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.12, 0, 6.283); shape(ctx, '#C2453E', '#F0B0A0', 1.2); }
  const sx = x, sy = y + R * 0.52; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3, R * 0.26, 0, 0, 6.283); shape(ctx, rgba('#9A5A5A', 0.8), '#E8D8DE', 1.5);
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12, R * 0.03, 0, 0, 6.283); ctx.fillStyle = '#C9CED6'; ctx.fill();
  ctx.restore(); return { cav: [x - R * 0.44, y - R * 0.18], spons: [sx, sy], R };
}

// =====================================================================================
// BUITENKANT VROUW (vulva), vooraanzicht, vlak schema. Recept: van boven naar onder in de middellijn: venusheuvel,
// clitoris (eikel met voorhuid) waar de kleine schaamlippen vooraan samenkomen, opening van de urinebuis, opening van
// de vagina, dan het perineum en de anus; grote schaamlippen aan de buitenkant, kleine schaamlippen erbinnen.
// Bron: OpenStax A&P 27.2 ('clitoris waar de kleine schaamlippen vooraan samenkomen'; vaginaopening tussen
// urinebuisopening en anus). Bekende fouten: urinebuis in de vagina; clitoris onder de urinebuis.
// Ontwerpeenheden: ± 260 × 460, oorsprong = vaginaopening. o.hl = { cli, buis, vag, lip } 0..1.
// =====================================================================================
function vulvaSchema(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const naam = { cli: P(0, -128), buis: P(0, -66), vag: P(0, 0), groot: P(-102, -10), klein: P(-44, -40), anus: P(0, 150) };
  if (a <= 0.01) return naam; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const HUID = BIO.huid, D = _bioDonker(HUID, 0.25);
  ctx.beginPath(); ctx.ellipse(...P(0, -168), 105 * s, 40 * s, 0, 0, 6.283); ctx.fillStyle = rgba(HUID, 0.1); ctx.fill(); // venusheuvel
  for (const d of [-1, 1]) { // grote schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 14, -170), P(d * 86, -130), P(d * 108, -10), P(d * 70, 100), P(d * 12, 118), P(d * 28, 40), P(d * 40, -60), P(d * 26, -150)], true);
    shape(ctx, rgba(HUID, 0.5 + 0.2 * (hl.lip || 0)), rgba(D, 0.9), 2); }
  for (const d of [-1, 1]) { // kleine schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 4, -126), P(d * 34, -96), P(d * 44, -20), P(d * 30, 60), P(d * 6, 84), P(d * 14, 10), P(d * 16, -70)], true);
    shape(ctx, rgba('#C98A8A', 0.75), rgba('#A8646A', 0.9), 1.8); }
  ctx.beginPath(); bioPad(ctx, [P(-20, -150), P(0, -158), P(20, -150), P(14, -128), P(-14, -128)], true); shape(ctx, rgba('#C98A8A', 0.85), '#A8646A', 1.5); // voorhuid clitoris
  ctx.beginPath(); ctx.ellipse(...P(0, -128), 9 * s, 8 * s, 0, 0, 6.283); shape(ctx, _mixHex('#E0A08C', '#F2C0B0', hl.cli || 0), '#B86A68', 1.5);
  ctx.beginPath(); ctx.ellipse(...P(0, -66), 4.5 * s, 3 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#5BA4C9', hl.buis || 0), 1.5 + 1.5 * (hl.buis || 0));
  ctx.beginPath(); ctx.ellipse(...P(0, 0), 13 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#E0A08C', hl.vag || 0), 1.5 + 1.5 * (hl.vag || 0));
  ctx.beginPath(); ctx.arc(...P(0, 150), 8 * s, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.6), rgba(D, 0.8), 1.5);
  ctx.restore(); return naam;
}

// ---------- klein: schaalstreep met eenheid voluit ----------
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }

// ===== CELDELING 2.0 (lichte remake, 26 okt 2026): chromosomen met armen, delende cel, spoelfiguur. Vereist _mixHex en _bioPolyCache (hierboven) en dnaDraad (lib_micro_evo.js) voor cdKluwen. Gebruik: films/voortplanting/celdeling/bron/src/scenes_cd2.js
// CELDELING · nieuwe tekenobjecten (lichte remake, fase 1, 25 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape), _mixHex (lib_cast.js).
//
// CHROMATIDE MET ARMEN. Recept (bron: OpenStax Biology 2e § 10.2 en 11.1; Pierce, Genetics Essentials § 2.x):
//  - een chromatide = één DNA-molecuul, opgerold; twee zusterchromatiden vast bij het centromeer (cohesine).
//  - centromeer niet in het midden (cen ≈ 0,38 bij het lange paar, 0,30 bij het korte); de kinetochoor zit aan de
//    buitenkant van het centromeer, naar de pool gericht.
//  - in de anafase gaat het centromeer vóórop en slepen de armen erachteraan (V-vorm): de trekdraad hangt aan het
//    kinetochoor, niet aan de armen. Dat is een morph van dezelfde chromatide, geen nieuwe tekening.
//  - crossing-over: twee niet-zusterchromatiden (de binnenste van een paar) wisselen het stuk voorbij het chiasma;
//    daarna bestaat één chromatide uit een stuk teal (vaderskant) en een stuk oker (moederskant). De zuster ernaast
//    blijft ongewijzigd. Kleuren zoals Chromosomen 2.1: vaderskant C.teal, moederskant C.oker.
//  Bekende fouten: X die als één staaf beweegt; chromatiden die in de anafase met de armen vóórop gaan; crossing-over
//  tussen zusterchromatiden; alle vier de chromatiden gemengd.
// =====================================================================================
const CD = { std: C.kernR, vader: '#C3B8EE', moeder: '#5E4C94', draad: '#8FA0B5', pool: '#B8C4D6' }; // verbeterronde 1 (variant A, 28 okt 2026): CD.std paars, vader licht- en moeder donkerpaars
const _cdk = (h, k = 0.4) => _mixHex(h, '#000000', k);

// delende cel (Micro): rond/ovaal membraan dat in het midden insnoert; spoelfiguur met polen; rustige textuur
function cdCel(ctx, cx, cy, rx, ry, o = {}) {
  const { insnoer = 0, a = 1, polen = 0, kern = 0, seed = 3, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, c = Math.cos(an), s = Math.sin(an); const pinch = 1 - insnoer * 0.92 * Math.exp(-Math.pow(c / 0.32, 2)); const wob = 1 + 0.008 * Math.sin(an * 5 + t * 0.7 + seed);
    const X = cx + c * rx * wob, Y = cy + s * ry * pinch * wob; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); };
  pad(); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  ctx.save(); pad(); ctx.clip(); for (let i = 0; i < 160; i++) { const X = cx + (hash(i * 3 + seed) - 0.5) * rx * 2, Y = cy + (hash(i * 7 + seed) - 0.5) * ry * 2; ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); } ctx.restore();
  pad(); ctx.strokeStyle = C.er; ctx.lineWidth = 2.2; ctx.stroke(); ctx.save(); ctx.translate(cx, cy); ctx.scale(0.985, 0.975); ctx.translate(-cx, -cy); pad(); ctx.strokeStyle = rgba(C.er, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  ctx.restore();
}
function cdPool(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(CD.draad, 0.5); ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 10, y + Math.sin(an) * 10); ctx.lineTo(x + Math.cos(an) * 34, y + Math.sin(an) * 34); ctx.stroke(); }
  // centrosoom: twee centriolen haaks op elkaar
  roundRect(ctx, x - 9, y - 4, 18, 8, 3); shape(ctx, '#C9B896', '#E6D9B8', 1); roundRect(ctx, x - 4, y - 12, 8, 18, 3); shape(ctx, '#B8A57E', '#E6D9B8', 1); ctx.restore(); }
// trekdraad van pool naar een punt (licht gebogen)
function cdDraad(ctx, px, py, x, y, a = 1, kl = CD.draad, lw = 1.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + x) / 2, (py + y) / 2 + (y - py) * 0.12, x, y); ctx.stroke(); ctx.restore(); }

// MODELCEL 2n = 4: lang paar (len 1) en kort paar (len 0.62); per chromosoom: paar, kant (vader/moeder)
const MODEL4 = [{ p: 'L', k: 'vader' }, { p: 'L', k: 'moeder' }, { p: 'K', k: 'vader' }, { p: 'K', k: 'moeder' }];
const cdLen = (p, L) => (p === 'L' ? L : L * 0.62), cdCen = (p) => (p === 'L' ? 0.38 : 0.30);

// =====================================================================================
// CHROMATIDE MET ARMEN — variant A (beeldbank 27 okt 2026): één chromosoomtaal in paars.
// Recept ongewijzigd (OpenStax Biology 2e § 10.2 en 11.1): zusterchromatiden vast bij het centromeer (cen ≈ 0,38 lang paar,
// 0,30 kort paar), kinetochoor aan de buitenkant, in de anafase centromeer vóórop en armen slepend; crossing-over tussen
// niet-zusterchromatiden. Wijzigingen:
//  - kleur: standaard paars (C.kernR, zoals kernChromatine/chromatideX: DNA = paars, C1). Teal en oker hebben in C1 een andere
//    betekenis (informatie/water, voedsel); herkomst daarom als licht en donker paars: CD.vader licht, CD.moeder donker.
//    Alleen kleuren op herkomst waar die ertoe doet (crossing-over, meiose); anders kl weglaten → CD.std.
//  - cdKluwen c = 0 begint als losse, zacht kronkelende draad zoals kernChromatine c = 0 (dun, lang, draaiing ≤ 0,8 rad, 64 punten), niet als lusje.
function cdPad(cx, cy, len, rot, o = {}) {
  const { cen = 0.38, zwaai = 0, kant = 1, bol = 0.10, n = 22 } = o; const P = [];
  const arm = (L, sgn, nn) => { const pts = []; const ang = rot + (sgn < 0 ? -Math.PI / 2 : Math.PI / 2) + sgn * -kant * zwaai * 1.15;
    for (let i = 0; i <= nn; i++) { const u = i / nn, d = u * L; const bend = Math.sin(u * Math.PI) * L * bol * (1 + zwaai); const dx = Math.cos(ang), dy = Math.sin(ang);
      pts.push([cx + dx * d + (-dy) * bend * kant * 0.6, cy + dy * d + dx * bend * kant * 0.6]); } return pts; };
  const up = arm(len * cen, -1, Math.round(n * cen)).reverse(), lo = arm(len * (1 - cen), 1, Math.round(n * (1 - cen)));
  return up.concat(lo.slice(1)); // van boven-tip (u=0) via centromeer naar onder-tip (u=1)
}
function cdChromatide(ctx, P, w, segs, o = {}) {
  const { a = 1, coils = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = P.length - 1, at = (u) => Math.round(clamp(u, 0, 1) * N);
  const lijn = (i0, i1) => { ctx.beginPath(); ctx.moveTo(P[i0][0], P[i0][1]); for (let i = i0 + 1; i <= i1; i++) ctx.lineTo(P[i][0], P[i][1]); };
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = _cdk(kl); ctx.lineWidth = w + 3; ctx.stroke(); });
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke(); });
  if (coils && w >= 9) { ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = Math.max(1, w * 0.09);
    for (let i = 1; i < N; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i + 1]; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; const [x, y] = P[i];
      ctx.beginPath(); ctx.moveTo(x - nx * w * 0.38 - dx / L * w * 0.12, y - ny * w * 0.38 - dy / L * w * 0.12); ctx.quadraticCurveTo(x + dx / L * w * 0.18, y + dy / L * w * 0.18, x + nx * w * 0.38 - dx / L * w * 0.12, y + ny * w * 0.38 - dy / L * w * 0.12); ctx.stroke(); } }
  ctx.restore();
}
function cdChromosoom(ctx, x, y, len, o = {}) {
  const { w = 18, cen = 0.38, kl = CD.std, segsL = null, segsR = null, uiteen = 0, a = 1, kin = false, ringen = 0, dxL = 0, dxR = 0, zwaai = 0, rot = 0, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  // xv > 0: X-vorm, de armen van elke zuster wijken licht naar buiten (vast bij het centromeer)
  const gap = w * 0.52 + uiteen * w * 0.6;
  const PL = cdPad(x - gap + dxL, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen, zwaai, kant: 1 }), PR = cdPad(x + gap + dxR, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen, zwaai, kant: -1 });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x + (dxL + dxR) / 2, y + len * (0.5 - cen), w * 3.1 + Math.abs(dxR - dxL) / 2, len * 0.62, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  cdChromatide(ctx, PL, w, segsL || [[0, 1, kl]], { a }); cdChromatide(ctx, PR, w, segsR || [[0, 1, kl]], { a });
  ctx.save(); ctx.globalAlpha *= a;
  if (uiteen < 0.25) { ctx.beginPath(); ctx.arc(x + (dxL + dxR) / 2, y, w * 0.5 * (1 - uiteen * 4), 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); }
  if (kin) [[PL, -1], [PR, 1]].forEach(([P, s]) => { const c = P[Math.round(cen * (P.length - 1))]; roundRect(ctx, c[0] + s * w * 0.45 - (s < 0 ? w * 0.32 : 0), c[1] - w * 0.55, w * 0.32, w * 1.1, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); });
  if (ringen > 0.01) { ctx.globalAlpha *= ringen; for (const u of [0.12, 0.25, 0.52, 0.7, 0.86]) { const i = Math.round(u * (PL.length - 1)); const p = PL[i], q = PR[i]; ctx.beginPath(); ctx.ellipse((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.abs(q[0] - p[0]) / 2 + w * 0.62, w * 0.22, 0, 0, 6.283); ctx.strokeStyle = C.grain; ctx.lineWidth = 2.2; ctx.stroke(); } }
  ctx.restore(); return { PL, PR };
}
function cdEen(ctx, x, y, len, o = {}) {
  const { w = 14, cen = 0.38, rot = 0, zwaai = 0, kant = 1, segs = null, kl = CD.std, a = 1, kin = false } = o; if (a <= 0.01) return;
  const P = cdPad(x, y, len, rot, { cen, zwaai, kant }); cdChromatide(ctx, P, w, segs || [[0, 1, kl]], { a });
  if (kin) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - kant * w * 0.62 - w * 0.16, y - w * 0.5, w * 0.32, w, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); ctx.restore(); }
  return P;
}
function _cdKronkel(n, seed, R) { // losse draad zoals kernChromatine c = 0: lang, zacht kronkelend (≤ 0,8 rad per stap), stuurt zacht terug
  const key = 'krA' + n + '_' + seed + '_' + Math.round(R); if (_bioPolyCache[key]) return _bioPolyCache[key];
  const P = []; let x = 0, y = -R * 0.5, an = hash(seed) * 6.283; const st = R * 0.1;
  for (let k = 0; k < n; k++) { an += (hash(seed * 31 + k * 7) - 0.5) * 0.8 + Math.sin(k * 0.45 + seed) * 0.2; const d = Math.hypot(x, y);
    if (d > R * 0.6) { let df = Math.atan2(-y, -x) - an; df = Math.atan2(Math.sin(df), Math.cos(df)); an += clamp(df, -0.4, 0.4) * clamp((d - R * 0.6) / (R * 0.3), 0, 1); }
    x += Math.cos(an) * st; y += Math.sin(an) * st; P.push([x, y]); }
  _bioPolyCache[key] = P; return P; }
function cdKluwen(ctx, x, y, len, o = {}) {
  const { c = 0, dubbel = true, w = 16, cen = 0.38, rot = 0, kl = CD.std, segsL = null, segsR = null, a = 1, seed = 1, R = len * 0.5, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  const e = ease(c), gap = w * 0.52;
  const doel = [cdPad(x - (dubbel ? gap : 0), y, len, rot, xv > 0 && dubbel ? { cen, zwaai: xv, kant: -1, bol: 0, n: 64 } : { cen, n: 64 }), cdPad(x + gap, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0, n: 64 } : { cen, n: 64 })];
  const n = doel[0].length, K = _cdKronkel(n, seed, R);
  const strengen = dubbel ? [0, 1] : [0];
  strengen.forEach(s => { const P = doel[s].map((q, k) => { const kx = x + K[k][0] + s * 5, ky = y + K[k][1] + s * 6; return [lerp(kx, q[0], e), lerp(ky, q[1], e)]; });
    const segs = (s ? segsR : segsL) || [[0, 1, kl]];
    if (e < 0.5) { ctx.save(); ctx.globalAlpha *= a; segs.forEach(([u0, u1, k2]) => { const i0 = Math.round(u0 * (n - 1)), i1 = Math.round(u1 * (n - 1)); dnaDraad(ctx, P.slice(i0, i1 + 1), { w: lerp(2.6, w * 0.5, e * 2), kleur: k2, donker: _cdk(k2), helix: false }); }); ctx.restore(); }
    else cdChromatide(ctx, P, lerp(w * 0.5, w, (e - 0.5) * 2), segs, { a, coils: e > 0.85 }); });
  if (e > 0.7 && dubbel) { ctx.save(); ctx.globalAlpha *= a * (e - 0.7) / 0.3; ctx.beginPath(); ctx.arc(x, y, w * 0.48, 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y + len * (0.5 - cen) * e, lerp(R * 1.05, w * 2.4, e), lerp(R * 1.05, len * 0.62, e), 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
// kernmembraan dat in blaasjes uiteenvalt (v 0 = heel, 1 = weg) of weer terugkomt
function cdKernmembraan(ctx, x, y, r, v = 0, a = 1) { if (a <= 0.01 || v >= 0.99) return; ctx.save(); ctx.globalAlpha *= a * (1 - v * 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.18 * (1 - v)); ctx.fill();
  const n = 26; for (const f of [1, 0.965]) for (let k = 0; k < n; k++) { const a0 = k / n * 6.283, len = (6.283 / n) * (1 - 0.15 - v * 0.7); const dr = v * 22 * (hash(k * 3) - 0.3);
    ctx.beginPath(); ctx.arc(x, y, r * f + dr, a0, a0 + len); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); }
  ctx.restore(); }
// teller rechtsboven: model en mens naast elkaar
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
// maximale zwaai zodat de armen van een losse chromatide de middellijn niet kruisen (afstand = centromeer tot middellijn)
function cdZwaaiMax(afstand, armLen, w) { return Math.asin(clamp((afstand - w * 0.75) / Math.max(1, armLen), 0, 1)) / 1.15; }

function _huidCirc(ctx, x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = fill; ctx.fill(); }
// ===================================================================================================
// HUID IN DOORSNEDE als blok (opperhuid, lederhuid, onderhuids bindweefsel), schematisch, niet op schaal.
// Eerst gebruikt: Uitscheiding en evenwicht 1.1, hoofdstuk De huid (26 okt 2026), door Kamiel gekeurd op het twijfelblad.
// Gebruik: huidBlok(ctx, X, Y, breedte, { t, vat, zweet, kip, focus, volg, isoleer, rood, bleek }) — hoogte = 0,875 × breedte.
// Vereist ook blob() uit lib.js.
// Recept (bronnen in bron/bronnen.md): opperhuid dun (dunne huid ± 0,1 mm), lederhuid 1–2 mm, onderhuids
// bindweefsel wisselend dik; hier vereenvoudigd tot ± 1 : 4 : 3,5 zodat de opperhuid zichtbaar blijft.
//  - opperhuid: hoornlaag = platte dode cellen zonder kern (bovenaan schilferend); daaronder levende lagen die
//    naar boven platter worden; kiemlaag = één rij cellen met kern op een golvende grens (lederhuidpapillen).
//    De opperhuid heeft geen bloedvaten: haarvatlussen stoppen in de papillen.
//  - lederhuid: bindweefsel (collageen golvend), oppervlakkig en diep vaatnet met haarvatlussen in de papillen;
//    haarzakje schuin, met talgklier aan de kant van het haarspiertje; haarspiertje van het haarzakje naar de
//    papillaire laag; zweetklier = kluwen diep in de lederhuid, buis kronkelt naar een porie; zintuigen:
//    vrije zenuwuiteinden (pijn, warmte, koude) tot in de opperhuid, tastlichaampje in een papil, druklichaampje diep.
//  - onderhuids bindweefsel: vetcellen als veelhoeken van wisselende grootte (geen raster van gelijke rondjes).
//  Bekende fouten: bloedvaten in de opperhuid; zweetklier die in het vet 'zwemt' zonder buis; talgklier los
//  van het haarzakje; haar dat recht omhoog uit een recht gat steekt; vet als effen gele laag.
// Ontwerpmaat 800 × 700; o.vat −1 (nauw) … 0 … 1 (wijd), o.zweet 0..1, o.kip 0..1 (kippenvel),
// o.focus = 'hoorn'|'kiem'|'opper'|'leder'|'vat'|'zweet'|'talg'|'haar'|'zin'|'vet'|null (de rest gaat naar 35 %).
// Geeft ankerpunten terug (schermcoördinaten) voor namen.
// ===================================================================================================
const HUIDK = { hoorn: '#E6CDB4', levend: '#C99A80', levendR: '#DDB59C', leder: '#5E4652', lederL: '#6E5260', collageen: '#B88A92',
  vet: '#CDBB86', vetR: '#DCCB9A', vetGrond: '#6B4B3E', slag: '#D9483E', ader: '#8E3A40', haar: '#3A2418', haarZak: '#A07862',
  talg: '#D9C27A', spier: '#B36A5E', buis: '#AFC0D0', zenuw: '#C9D2DE' };
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
const _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function huidBlok(ctx, X, Y, w, o = {}) {
  const { a = 1, t = 0, vat = 0, zweet = 0, kip = 0, focus = null, rood = 0, bleek = 0, deel = 1, volg = 0, isoleer = 0 } = o; if (a <= 0.01) return {};
  const s = w / 800, D = (k) => (focus && focus !== k ? 0.35 : 1);
  ctx.save(); ctx.translate(X, Y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const bump = (x) => kip * 9 * Math.exp(-Math.pow((x - 262) / 34, 2));            // kippenvel: bultje rond de haaropening
  const top = (x) => 60 + Math.sin(x * 0.02) * 2 - bump(x);
  const bm = (x) => 150 - 16 * Math.pow(0.5 + 0.5 * Math.cos((x - 70) / 110 * 6.283), 2);   // grens opperhuid/lederhuid (papillen)
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 800, 700); ctx.clip();
  // ---- onderhuids bindweefsel met vet ----
  ctx.save(); ctx.globalAlpha *= D('vet'); ctx.fillStyle = HUIDK.vetGrond; ctx.fillRect(0, 470, 800, 230);
  for (const [cx, cy, r] of _huidVet) { blob(ctx, cx, cy, r * 1.1, r * 0.82, 0.08, cx * 0.1, 0); shape(ctx, HUIDK.vet, HUIDK.vetR, 2); }
  if (isoleer > 0.01) { ctx.globalAlpha *= isoleer; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(3, 472, 794, 225); }
  ctx.restore();
  // ---- lederhuid ----
  ctx.save(); ctx.globalAlpha *= D('leder') === 1 || ['vat', 'zweet', 'talg', 'haar', 'zin'].includes(focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, 470); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 470); ctx.closePath(); ctx.fillStyle = HUIDK.leder; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = HUIDK.lederL; ctx.beginPath(); ctx.moveTo(0, 230); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 230); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 12; i++) { const yy = 190 + i * 24, ph = hash(i * 7.1) * 6.28; ctx.strokeStyle = rgba(HUIDK.collageen, 0.22); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = -10; x <= 810; x += 10) { const py = yy + Math.sin(x / 40 + ph) * 6; x === -10 ? ctx.moveTo(x, py) : ctx.lineTo(x, py); } ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // bloedvaten: diep vaatnet (y 430), oppervlakkig vaatnet (y 205) en haarvatlussen in elke papil
  const vr = vat >= 0 ? 1 + 1.3 * vat : 1 - 0.65 * -vat, flow = vat >= 0 ? 1 + vat : 1 + 0.7 * vat;
  ctx.save(); ctx.globalAlpha *= D('vat');
  const buis = (pts, r, col, n, sp) => { ctx.strokeStyle = col; ctx.lineWidth = 2 * r; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = Math.max(1, 2 * r - 5); ctx.stroke();
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    for (let j = 0; j < n; j++) { let u = ((j / n + t * sp / L * 60) % 1) * L, i = 0; while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++; } const f = u / seg[i], px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f);
      ctx.beginPath(); ctx.ellipse(px, py, Math.min(r * 0.8, 6), Math.min(r * 0.5, 4), 0.4, 0, 6.283); ctx.fillStyle = '#E07A6A'; ctx.fill(); } };
  buis([[-10, 432], [800 + 10, 438]], 11, HUIDK.slag, 14, 1.2); buis([[810, 452], [-10, 455]], 13, HUIDK.ader, 12, 0.8);
  buis([[150, 440], [158, 330], [150, 212]], 6 * Math.sqrt(vr), HUIDK.slag, 4, 1.2 * flow); buis([[690, 212], [702, 330], [694, 448]], 7 * Math.sqrt(vr), HUIDK.ader, 4, 0.9 * flow);
  buis([[-10, 205], [810, 210]], 6 * vr, HUIDK.slag, Math.round(10 * Math.max(0.4, flow)), 1.3 * flow);
  for (let k = 0; k < 8; k++) { const px = 70 + k * 110; if (px > 800) break; const tp = bm(px) + 10, dx = 6; ctx.strokeStyle = huidMix(HUIDK.ader, HUIDK.slag, 0.5); ctx.lineWidth = 2 * Math.max(1.6, 3.4 * vr); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(px - dx, 210); ctx.lineTo(px - dx, tp + dx); ctx.arc(px, tp + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, 210); ctx.stroke(); }
  ctx.restore();
  // zweetklier: kluwen diep in de lederhuid, buis kronkelt naar een porie
  ctx.save(); ctx.globalAlpha *= D('zweet');
  const kluwen = []; for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 6.283 * 3.2; kluwen.push([600 + Math.cos(an) * (16 + 12 * Math.sin(u * 9)), 452 + Math.sin(an) * (12 + 6 * Math.cos(u * 7)) - u * 6]); }
  const gang = [[600, 440], [592, 380], [606, 320], [596, 260], [608, 200], [600, bm(600) + 4]]; for (let yy = bm(600); yy >= top(612); yy -= 10) gang.push([606 + Math.sin(yy * 0.25) * 7, yy]); gang.push([610, top(610)]);
  const pad = kluwen.concat(gang); ctx.strokeStyle = HUIDK.buis; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.25 + 0.6 * zweet); ctx.lineWidth = 4; ctx.stroke();
  if (zweet > 0.01) { for (let j = 0; j < 7; j++) { const u = (j / 7 + t * 0.12) % 1, i = Math.floor(u * (pad.length - 1)); _huidCirc(ctx, pad[i][0], pad[i][1], 3.2, rgba(C.teal, zweet)); }
    const dr = 4 + 10 * zweet; ctx.beginPath(); ctx.ellipse(610, top(610) - dr * 0.55, dr, dr * 0.65, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.75), lighten(C.teal, 0.3), 1.5); }
  ctx.restore();
  // haarzakje met haar, talgklier en haarspiertje
  const oX = 262, oY = top(262), bX = 340, bY = 468; const ang = lerp(0.42, 1.25, kip);   // hoek van het haar boven de huid t.o.v. het oppervlak
  ctx.save(); ctx.globalAlpha *= D('haar');
  ctx.strokeStyle = HUIDK.haarZak; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(oX + 4, oY + 14); ctx.lineTo(bX, bY - 14); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(bX + 2, bY - 4, 22, 18, 0.2, 0, 6.283); ctx.fillStyle = HUIDK.haarZak; ctx.fill();
  ctx.strokeStyle = HUIDK.haar; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bX, bY - 8); ctx.lineTo(oX, oY); ctx.lineTo(oX - Math.cos(ang) * 120, oY - Math.sin(ang) * 120); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('talg'); for (const [dx, dy, r] of [[34, 150, 17], [44, 172, 15], [30, 190, 13]]) { blob(ctx, oX + dx + 10, oY + dy - 40, r, r * 0.8, 0.1, dx, 0); shape(ctx, HUIDK.talg, lighten(HUIDK.talg, 0.25), 1.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('haar'); const mA = [lerp(oX, bX, 0.55) + 10, lerp(oY, bY, 0.55)], mB = [372, bm(372) + 6];
  ctx.strokeStyle = huidMix(HUIDK.spier, '#E8A090', kip); ctx.lineWidth = 11 + 9 * kip; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mA[0], mA[1]); ctx.quadraticCurveTo(lerp(mA[0], mB[0], 0.5) + 12 * (1 - kip), lerp(mA[1], mB[1], 0.5), mB[0], mB[1]); ctx.stroke(); ctx.restore();
  // zintuigen: vrije zenuwuiteinden, tastlichaampje (papil), druklichaampje (diep)
  const zc = focus === 'zin' ? C.teal : HUIDK.zenuw;
  ctx.save(); ctx.globalAlpha *= D('zin'); ctx.strokeStyle = zc; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(470, 470); ctx.bezierCurveTo(480, 360, 460, 260, 476, 170); ctx.stroke();
  for (const [ex, ey] of [[452, 112], [478, 104], [500, 118]]) { ctx.beginPath(); ctx.moveTo(476, 170); ctx.quadraticCurveTo((476 + ex) / 2 + 6, (170 + ey) / 2, ex, ey); ctx.stroke(); }
  const mx = 510, my = bm(510) + 12; ctx.beginPath(); ctx.moveTo(476, 230); ctx.quadraticCurveTo(500, 200, mx, my + 10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(mx, my, 7, 13, 0, 0, 6.283); shape(ctx, rgba(zc, 0.35), zc, 2); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(mx - 6, my + k * 6); ctx.lineTo(mx + 6, my + k * 6); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(470, 450); ctx.quadraticCurveTo(640, 470, 720, 420); ctx.stroke();
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(738, 410, 26 - k * 6, 15 - k * 3.4, -0.4, 0, 6.283); shape(ctx, k === 0 ? rgba(zc, 0.18) : 'rgba(0,0,0,0)', zc, 2); }
  ctx.restore();
  // ---- opperhuid ----
  ctx.save(); const fo = (focus === 'opper' || focus === 'hoorn' || focus === 'kiem' || !focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, top(0)); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, top(x)); for (let x = 800; x >= 0; x -= 4) ctx.lineTo(x, bm(x)); ctx.closePath();
  ctx.save(); ctx.globalAlpha *= fo; ctx.fillStyle = huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek); ctx.fill(); ctx.clip();
  // levende lagen: cellen in rijen, naar boven platter; kiemlaag = onderste rij met kern
  const kiemF = focus === 'kiem' ? 1 : (focus === 'hoorn' ? 0.35 : 1), hoornF = focus === 'kiem' ? 0.35 : 1;
  for (let r = 0; r < 5; r++) { const hgt = [13, 12, 11, 9, 7][r], wid = [15, 18, 21, 25, 30][r];
    ctx.save(); ctx.globalAlpha *= r === 0 ? kiemF : (focus === 'hoorn' || focus === 'kiem' ? 0.5 : 1);
    for (let x = -10 + (r % 2) * wid / 2; x < 810; x += wid) { const yb = bm(x) - 8 - r * (hgt + 4) * lerp(1, 0.75, r / 4); if (yb < top(x) + 26) continue;
      roundRect(ctx, x - wid / 2 + 1.5, yb - hgt / 2, wid - 3, hgt, 4); shape(ctx, huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek), HUIDK.levendR, 1.2);
      if (r < 3) { ctx.beginPath(); ctx.ellipse(x, yb, Math.min(4.5, wid * 0.22), Math.min(4, hgt * 0.3), 0, 0, 6.283); ctx.fillStyle = r === 0 ? C.kern : rgba(C.kern, 0.6); ctx.fill(); } }
    ctx.restore(); }
  // één cel volgen (goud): ontstaat in de kiemlaag door deling, schuift omhoog, wordt plat en verliest de kern
  if (volg > 0.01) { const vx = 400, u = (t * 0.07) % 1, y0 = bm(vx) - 8, y1 = top(vx) + 8, yy = lerp(y0, y1, ease(u)); const fl = lerp(1, 0.25, u), wd = lerp(16, 34, u);
    ctx.save(); ctx.globalAlpha *= volg; roundRect(ctx, vx - wd / 2, yy - 7 * fl - 2, wd, 14 * fl + 4, 4); shape(ctx, u > 0.8 ? HUIDK.hoorn : HUIDK.levend, C.goud, 2.5);
    if (u < 0.65) { ctx.beginPath(); ctx.ellipse(vx, yy, 4.5, 4 * fl + 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 1 - u / 0.65); ctx.fill(); }
    const dv = clamp((u - 0.0) / 0.12, 0, 1); if (dv < 1) { ctx.globalAlpha *= 1 - dv; roundRect(ctx, vx - 8 + dv * 16, y0 - 7, 16, 14, 4); shape(ctx, HUIDK.levend, C.goud, 2); ctx.beginPath(); ctx.ellipse(vx + dv * 16, y0, 4.5, 4, 0, 0, 6.283); ctx.fillStyle = C.kern; ctx.fill(); }
    ctx.restore(); }
  ctx.restore();
  // hoornlaag: platte dode cellen zonder kern, bovenste schilferen af
  ctx.save(); ctx.globalAlpha *= fo * hoornF; for (let r = 0; r < 4; r++) for (let x = -20 + r * 13; x < 820; x += 46) { const yy = top(x) + 3 + r * 5.5; roundRect(ctx, x, yy, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, lighten(HUIDK.hoorn, 0.2), 1); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k / 3) % 1, fx = 120 + k * 250 + u * 30, fy = top(fx) + 2 - u * 34; ctx.save(); ctx.globalAlpha *= (1 - u) * 0.9; ctx.translate(fx, fy); ctx.rotate(-0.3 * u); roundRect(ctx, -20, -2, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, null); ctx.restore(); }
  ctx.restore();
  ctx.restore();
  ctx.restore();
  // rand van het blok
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5 / s; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 700); ctx.lineTo(800, 700); ctx.lineTo(800, 60); ctx.stroke();
  ctx.restore();
  const P = (x, y) => [X + x * s, Y + y * s];
  return { X, Y, P, s, oppTop: Y + 60 * s, oppBot: Y + 150 * s, lederBot: Y + 470 * s, bot: Y + 700 * s, right: X + w, hoorn: P(40, 66), kiem: P(40, 140), vat: P(150, 330), vatOpp: P(20, 205), zweet: P(600, 452), porie: P(610, 50),
    talg: P(305, 170), haar: P(338, 470), haarTop: P(262, 40), spier: P(372, 220), tast: P(510, 140), vrij: P(478, 104), druk: P(738, 410), vet: P(400, 590) };
}
// ===================== Zenuwstelsel 9 · Spieren en beweging (26 okt 2026, prompt v10) =====================
// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — nieuwe tekeningen (ronde 1, 26 okt 2026), kandidaat voor bibliotheek/lib_bio.js
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape, circ), lib_bio.js (BIO, _mixHex).
// Maten in cm (arm) of µm (sarcomeer) met een schaal s = px per eenheid. Bronnen: OpenStax A&P 2e h. 6, 9, 10, 11; Gray's (via StatPearls).
// =====================================================================================
const Z9 = { bot: '#E6DCC6', botS: '#B8AC92', botR: '#CFC3A8', kraak: '#BFD8E4', kraakR: '#E4F0F6', pees: '#E9E3D2', peesR: '#C9C0A8',
  spier: '#B55A50', spierL: '#D98A7E', spierD: '#8E3F38', smeer: '#5BA4C9', kapsel: '#9AA3B2', merg: '#C2453E', mergG: '#D9BC6A',
  actine: '#5BA4C9', myosine: '#C9A35C', zlijn: '#F2F2EE', zenuw: '#B79AE6', ca: '#E0B64A' };

// --- hulpjes: lokaal botframe → wereld. Lokale y langs de botas (van proximaal naar distaal), lokale x naar voren (anterieur).
function z9Frame(ox, oy, ang, s) { const c = Math.cos(ang), n = Math.sin(ang);
  return (lx, ly) => [ox + s * (lx * c + ly * n), oy + s * (-lx * n + ly * c)]; }
function z9Pad(ctx, pts, dicht = true) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (dicht) ctx.closePath(); }
function z9Glad(ctx, pts, dicht = true) { // Catmull-Rom door de punten
  const n = pts.length; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  const g = (i) => pts[dicht ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < (dicht ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
// spoelvormige spierbuik tussen A en B (wereld), dikte w (px), bol naar kant 'zij' (+1/-1 t.o.v. de richting A→B), met vezellijnen
function z9Buik(ctx, A, B, w, zij, o = {}) { const { a = 1, kleur = Z9.spier, rand = Z9.spierL, vezels = 4, bol = 0.35 } = o; if (a <= 0.01) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = uy * zij, py = -ux * zij, N = 24, l = [], r = [];
  for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof;
    const hw = w / 2 * prof + 1.5; l.push([mx + px * hw, my + py * hw]); r.push([mx - px * hw, my - py * hw]); }
  ctx.save(); ctx.globalAlpha *= a; z9Glad(ctx, l.concat(r.reverse()), true); shape(ctx, kleur, rand, 1.5);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5A2A26', 0.35); ctx.lineWidth = 1.5;
  for (let k = 1; k < vezels; k++) { const f = k / vezels - 0.5; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof, hw = w * prof * f;
      i ? ctx.lineTo(mx + px * hw, my + py * hw) : ctx.moveTo(mx + px * hw, my + py * hw); } ctx.stroke(); }
  ctx.restore(); ctx.restore(); }
function z9Pees(ctx, pts, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#7E7462'; ctx.lineWidth = w + 3.5; z9Glad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = '#FAF7EE'; ctx.lineWidth = w; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }

// =====================================================================================
// ARM VAN OPZIJ (rechterarm, kijkt naar +x): schouderblad, opperarmbeen, ellepijp, spaakbeen, biceps, triceps met pezen.
// Recept (bronnen B: OpenStax A&P 2e 8.2 en 11.5; StatPearls Biceps/Triceps): opperarmbeen ± 31 cm, ellepijp ± 26 cm,
// spaakbeen ± 24 cm. Biceps: twee koppen vanaf het schouderblad (lange kop over de kop van het opperarmbeen, korte kop vanaf
// het ravenbekuitsteeksel), pees op de knobbel van het spaakbeen ± 3 cm onder het elleboogscharnier, vóór het scharnier.
// Triceps: lange kop vanaf het schouderblad onder de kom, twee koppen langs de achterkant van het opperarmbeen, pees op het
// olecranon (uitsteeksel van de ellepijp), achter het scharnier. Vereenvoudigd: geen deltaspier, geen m. brachialis.
// Bekende fouten: biceps-pees op de ellepijp; triceps vóór het scharnier; spieren die bij buigen even lang blijven.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 8.2 en 11.5): hand van opzij als één silhouet (± 19 cm van pols tot vingertop,
// vingers licht gebogen, duim apart, nagels als lichte vlakjes; zelfde huidtint als onderarm()); schouderblad smaller
// (van opzij zie je het blad verkort) met de schouderbladkam (spina) die naar het acromion loopt; o.romp 0..1 = dunne
// zijlijnen van borst en rug als oriëntatie.
// u = hoek opperarm vanaf recht omlaag (naar voren +), e = buighoek elleboog (0 = gestrekt). c = spanning biceps 0..1, ct = triceps.
// =====================================================================================
function armAnatomie(ctx, sx, sy, s, o = {}) {
  const { u = 0, e = 0, a = 1, c = null, ct = null, hl = {}, dim = [], skelet = 1, spieren = 1, hand = 1, t = 0 } = o; if (a <= 0.01) return {};
  const cb = c == null ? clamp(e / 1.6, 0, 1) : c, ctr = ct == null ? clamp(1 - e / 1.2, 0, 1) * 0.6 : ct;
  const Up = z9Frame(sx, sy, u, s), E = Up(0, 30), Fo = z9Frame(E[0], E[1], u + e, s);
  const D = (k) => (dim.includes(k) ? 0.3 : 1) * (hl[k] != null ? 1 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (o.huid) { ctx.save(); ctx.globalAlpha *= o.huid; const sk = [Up(-4.6, 2), Up(-5.2, 12), Up(-4.4, 24), Up(-3.6, 29), Fo(-3.0, 1.5), Fo(-2.4, 8), Fo(-1.6, 22), Fo(-1.3, 25.5), Fo(2.6, 25.5), Fo(3.0, 18), Fo(3.4, 6), Up(4.4, 29), Up(5.2, 18), Up(4.4, 6), Up(3.6, -2), Up(-2.0, -4.5)]; z9Glad(ctx, sk, true); shape(ctx, rgba(BIO.huid, 0.16), rgba(BIO.huid, 0.75), 2); ctx.restore(); }
  // schouderblad (staat stil; vereenvoudigd vlak van opzij met kom, acromion en ravenbek)
  ctx.save(); ctx.globalAlpha *= 0.85 * skelet * D('schouderblad');
  const S = (x, y) => [sx + x * s, sy + y * s];
  z9Glad(ctx, [S(-2.2, -3.2), S(-4.6, -4.3), S(-6.8, -3.0), S(-7.4, 2.5), S(-6.6, 9.5), S(-5.2, 13.2), S(-3.6, 8.5), S(-2.5, 2.4), S(-1.8, -1.2)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.strokeStyle = Z9.botS; ctx.lineWidth = 0.7 * s; ctx.lineCap = 'round'; z9Glad(ctx, [S(-6.6, -1.2), S(-4.2, -2.4), S(-2.0, -3.6), S(0.2, -4.6)], false); ctx.stroke(); // schouderblad-kam (spina) naar het acromion
  z9Glad(ctx, [S(-3, -4.4), S(0.6, -5.4), S(2.8, -4.6), S(1.6, -3.4), S(-1.8, -3.3)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // acromion
  z9Glad(ctx, [S(-1.2, -2.9), S(1.8, -2.6), S(2.6, -1.6), S(1.6, -1.2), S(-0.8, -1.9)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // ravenbekuitsteeksel
  ctx.restore();
  // opperarmbeen
  ctx.save(); ctx.globalAlpha *= skelet * D('opperarm');
  z9Glad(ctx, [Up(-1.6, 1.8), Up(-1.25, 8), Up(-1.1, 18), Up(-1.5, 25), Up(-2.1, 28.4), Up(-1.6, 30.8), Up(0, 31.6), Up(1.5, 30.8), Up(1.9, 28.3), Up(1.2, 25), Up(0.95, 18), Up(1.05, 8), Up(1.6, 1.6)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  const K = Up(-0.2, -0.1); circ(ctx, K[0], K[1], 2.35 * s, Z9.bot, Z9.botS, 1.5); // kop
  ctx.restore();
  // onderarm: ellepijp (achter, met olecranon) en spaakbeen (voor)
  ctx.save(); ctx.globalAlpha *= skelet * D('onderarm');
  z9Glad(ctx, [Fo(-1.3, -2.6), Fo(-2.1, -1.4), Fo(-1.7, 1.2), Fo(-1.0, 6), Fo(-0.8, 15), Fo(-0.75, 24.5), Fo(-0.1, 25.4), Fo(0.1, 24.3), Fo(-0.05, 15), Fo(0.1, 6), Fo(0.4, 1.5), Fo(0.1, -0.6), Fo(-0.6, -1.4)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [Fo(0.25, 0.9), Fo(1.25, 0.8), Fo(1.4, 2.4), Fo(1.65, 3.3), Fo(1.25, 6), Fo(1.2, 14), Fo(1.7, 22), Fo(1.9, 24.6), Fo(0.4, 24.9), Fo(0.35, 22), Fo(0.45, 14), Fo(0.45, 6), Fo(0.3, 2.4)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore();
  // hand van opzij (duimkant), zelfde huid als onderarm(): handrug achter, handpalm voor, vingers licht gebogen; ± 19 cm lang
  if (hand > 0.01) { ctx.save(); ctx.globalAlpha *= 0.9 * hand; const hk = _mixHex(BIO.huid, '#1A2740', 0.2), hs = _mixHex(BIO.huid, '#1A2740', 0.38);
    z9Glad(ctx, [Fo(-1.1, 24.6), Fo(-1.5, 28), Fo(-1.7, 32.6), Fo(-1.2, 34.6), Fo(-0.9, 38.5), Fo(0.0, 41.8), Fo(1.2, 43.2), Fo(2.0, 42.4), Fo(1.6, 39.6), Fo(1.9, 35.8), Fo(2.6, 32.5), Fo(2.7, 28.5), Fo(2.2, 25)], true); shape(ctx, hk, hs, 1.2);
    ctx.strokeStyle = hs; ctx.lineWidth = 0.18 * s; ctx.lineCap = 'round'; for (const [p, q] of [[Fo(-0.6, 35.4), Fo(0.4, 35.6)], [Fo(-0.2, 39.0), Fo(0.9, 39.4)]]) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } // vingerplooien
    z9Glad(ctx, [Fo(1.4, 26.4), Fo(2.6, 28.0), Fo(3.4, 30.6), Fo(3.6, 33.2), Fo(3.0, 33.6), Fo(2.4, 31.4), Fo(1.7, 29.6)], true); shape(ctx, hk, hs, 1.2); // duim
    const n1 = Fo(1.25, 42.9), n2 = Fo(3.3, 33.1); ctx.fillStyle = _mixHex(BIO.huid, '#FFFFFF', 0.25); for (const n of [n1, n2]) { ctx.beginPath(); ctx.arc(n[0], n[1], 0.32 * s, 0, 6.283); ctx.fill(); } // nagels
    ctx.restore(); }
  // romp als oriëntatie (o.romp 0..1): zijkant van borst en rug, dun en gedimd
  if (o.romp) { ctx.save(); ctx.globalAlpha *= 0.35 * o.romp; ctx.strokeStyle = BIO.huidS; ctx.lineWidth = 2; z9Glad(ctx, [S(4.5, -6), S(9, 2), S(10, 14), S(8.5, 30), S(9, 45)], false); ctx.stroke(); z9Glad(ctx, [S(-6, -7), S(-9.5, 4), S(-8.8, 20), S(-6.5, 34), S(-8, 46)], false); ctx.stroke(); ctx.restore(); }
  // spieren
  const R = {}; ctx.save(); ctx.globalAlpha *= spieren;
  // triceps (achter): buik van y 4 tot ± 25, pees naar het olecranon; lange kop naar onder de schouderkom
  { const aT = D('triceps'), wT = (4.2 + 1.0 * ctr) * s, A = Up(-1.3, 3.5), B = Up(-1.6, 25.5 - 1.5 * ctr);
    z9Pees(ctx, [Up(-1.1, -1.7), Up(-1.8, 0.8), Up(-2.0, 3.8)], 0.4 * s, aT);
    z9Buik(ctx, A, B, wT, -1, { a: aT, bol: 0.55 }); z9Pees(ctx, [B, Up(-2.7, 28.0), Up(-2.9, 30.2), Fo(-1.6, -2.3)], 0.75 * s, aT);
    if (hl.triceps) { ctx.save(); ctx.globalAlpha *= hl.triceps; ctx.setLineDash([]); z9Buik(ctx, A, B, wT, -1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.45 }); ctx.restore(); }
    R.triceps = Up(-1.5 - 0.75 * wT / s, 14); }
  // biceps (voor): buik van y 9 tot ± 23, korter en dikker bij spanning; pees naar de knobbel van het spaakbeen
  { const aB = D('biceps'), wB = (3.4 + 1.8 * cb) * s, A = Up(1.25, 7.5 + 1.2 * cb), B = Up(1.8, 25.0 - 2.4 * cb);
    z9Pees(ctx, [Up(0.6, -2.3), Up(1.6, -1.4), Up(2.0, 3), Up(1.9, 7.8 + 1.2 * cb)], 0.32 * s, aB); // lange kop over de kop van het opperarmbeen
    z9Pees(ctx, [Up(2.2, -1.8), Up(2.5, 2.5), Up(2.0, 7.8 + 1.2 * cb)], 0.32 * s, aB * 0.8); // korte kop vanaf het ravenbekuitsteeksel
    z9Buik(ctx, A, B, wB, 1, { a: aB, bol: 0.6 }); const T = Fo(1.5, 3.2); z9Pees(ctx, [B, Up(2.5, 27.4 - cb), Up(2.7, 29.6), T], 0.75 * s, aB);
    if (hl.biceps) { ctx.save(); ctx.globalAlpha *= hl.biceps; z9Buik(ctx, A, B, wB, 1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.5 }); ctx.restore(); }
    R.biceps = Up(1.3 + 0.85 * wB / s, 16); R.bicepsPees = T; }
  ctx.restore();
  ctx.restore();
  R.schouder = [sx, sy]; R.elleboog = E; R.hand = Fo(0.6, 34); R.olecranon = Fo(-1.7, -2.2); R.opperarm = Up(0, 15); R.onderarm = Fo(0.4, 13); R.Up = Up; R.Fo = Fo;
  return R;
}

// =====================================================================================
// GEWRICHT IN DOORSNEDE (schouder, kogelgewricht; van voren in een frontale snede). Recept (OpenStax A&P 9.4):
// gewrichtskop en -kom bekleed met kraakbeen (glad, zonder bloedvaten), gewrichtsholte met een dun laagje gewrichtssmeer,
// gewrichtskapsel als mouw van bindweefsel van bot naar bot, gewrichtsbanden als verdikkingen buiten het kapsel.
// Bekende fouten: kraakbeen als losse schijf; holte als grote lege ruimte; kapsel dat niet aan het bot vastzit.
// draai = hoek van het opperarmbeen (rad), hl = { kop, kom, kraakbeen, kapsel, smeer, banden }.
// =====================================================================================
function gewrichtDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, draai = 0, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.3 + 0.7 * (hl[k] == null ? 1 : hl[k]);
  const R = 2.4 * s, gap = 0.07 * R, kb = 0.1 * R, cup = 0.95; // straal kop (± 2,4 cm), spleet, kraakbeendikte, halve openingshoek kom
  const spons = (cx, cy, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = hash(i + seed) * 6.283, rr = Math.sqrt(hash(i * 3 + seed)); circ(ctx, cx + Math.cos(an) * rr * rx, cy + Math.sin(an) * rr * ry, 1.4 + hash(i + 7 + seed) * 2.6, rgba(Z9.botS, 0.55)); } };
  // schouderblad met kom (links)
  const r2 = R + gap + kb; ctx.save(); ctx.globalAlpha *= L('kom');
  ctx.beginPath(); ctx.moveTo(Math.cos(Math.PI - cup) * r2 - 0.25 * R, -Math.sin(Math.PI - cup) * r2 - 0.25 * R); ctx.lineTo(-2.6 * R, -1.6 * R); ctx.lineTo(-2.9 * R, 1.9 * R); ctx.lineTo(Math.cos(Math.PI + cup) * r2 - 0.25 * R, -Math.sin(Math.PI + cup) * r2 + 0.25 * R);
  ctx.lineTo(Math.cos(Math.PI + cup) * r2, -Math.sin(Math.PI + cup) * r2); ctx.arc(0, 0, r2, Math.PI - cup, Math.PI + cup, false); ctx.closePath(); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.save(); ctx.clip(); spons(-1.9 * R, 0, 0.9 * R, 1.5 * R, 90, 3); ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R + gap + kb, Math.PI - cup, Math.PI + cup, false); ctx.arc(0, 0, R + gap, Math.PI + cup, Math.PI - cup, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // gewrichtssmeer: dun laagje in de spleet, met twee zakjes binnen het kapsel
  ctx.save(); ctx.globalAlpha *= L('smeer'); ctx.beginPath(); ctx.arc(0, 0, R + gap, Math.PI - cup - 0.15, Math.PI + cup + 0.15, false); ctx.arc(0, 0, R, Math.PI + cup + 0.15, Math.PI - cup - 0.15, true); ctx.closePath(); ctx.fillStyle = rgba(Z9.smeer, 0.9); ctx.fill();
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-0.42 * R, sg * 1.02 * R, 0.3 * R, 0.1 * R, sg * 0.5, 0, 6.283); ctx.fillStyle = rgba(Z9.smeer, 0.75); ctx.fill(); } ctx.restore();
  // opperarmbeen: kop + hals + schacht, draait om het middelpunt van de kop
  ctx.save(); ctx.rotate(draai); ctx.globalAlpha *= L('kop'); const sa = 1.05, sw = 0.55 * R; // schachtrichting (rad onder de horizontaal), halve breedte
  const ux = Math.cos(sa), uy = Math.sin(sa), nx = -uy, ny = ux, b0 = [0.35 * R * ux, 0.35 * R * uy], b1 = [b0[0] + 3.6 * R * ux, b0[1] + 3.6 * R * uy];
  const hum = () => { ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.moveTo(b0[0] - nx * sw * 1.45, b0[1] - ny * sw * 1.45); ctx.lineTo(b1[0] - nx * sw, b1[1] - ny * sw); ctx.lineTo(b1[0] + nx * sw, b1[1] + ny * sw); ctx.lineTo(b0[0] + nx * sw * 1.7, b0[1] + ny * sw * 1.7); ctx.closePath(); };
  hum(); ctx.strokeStyle = Z9.botS; ctx.lineWidth = 3; ctx.stroke(); hum(); ctx.fillStyle = Z9.bot; ctx.fill('nonzero');
  hum(); ctx.save(); ctx.clip(); spons(0.15 * R, 0.15 * R, 0.85 * R, 0.85 * R, 110, 9); ctx.beginPath(); ctx.moveTo(b0[0] + ux * R * 0.9, b0[1] + uy * R * 0.9); ctx.lineTo(b1[0], b1[1]); ctx.strokeStyle = rgba(Z9.mergG, 0.9); ctx.lineWidth = sw * 0.9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  ctx.globalAlpha /= L('kop'); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R, Math.PI - cup - 0.35, Math.PI + cup + 0.35, false); ctx.arc(0, 0, R - kb, Math.PI + cup + 0.35, Math.PI - cup - 0.35, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1);
  ctx.restore();
  // kapsel: mouw van de rand van de kom naar de hals (boven en onder)
  const rot = (px, py) => [px * Math.cos(draai) - py * Math.sin(draai), px * Math.sin(draai) + py * Math.cos(draai)];
  ctx.save(); ctx.globalAlpha *= L('kapsel'); ctx.strokeStyle = Z9.kapsel; ctx.lineWidth = 0.13 * R; ctx.lineCap = 'round';
  const kb1 = [Math.cos(Math.PI - cup) * r2 - 0.1 * R, -Math.sin(Math.PI - cup) * r2 - 0.12 * R], ke1 = rot(0.55 * R, -1.18 * R), kb2 = [Math.cos(Math.PI + cup) * r2 - 0.1 * R, -Math.sin(Math.PI + cup) * r2 + 0.12 * R], ke2 = rot(-0.15 * R, 1.35 * R);
  ctx.beginPath(); ctx.moveTo(kb1[0], kb1[1]); ctx.bezierCurveTo(-0.5 * R, -1.45 * R, 0.1 * R, -1.5 * R, ke1[0], ke1[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kb2[0], kb2[1]); ctx.bezierCurveTo(-0.6 * R, 1.45 * R, -0.35 * R, 1.6 * R, ke2[0], ke2[1]); ctx.stroke(); ctx.restore();
  // banden: verdikkingen aan de buitenkant van het kapsel
  ctx.save(); ctx.globalAlpha *= L('banden'); ctx.strokeStyle = Z9.pees; ctx.lineWidth = 0.07 * R; ctx.lineCap = 'round';
  for (const d of [0.12, 0.24]) { ctx.beginPath(); ctx.moveTo(kb1[0] - 0.1 * R, kb1[1] - d * R); ctx.bezierCurveTo(-0.5 * R, -(1.45 + d) * R, 0.1 * R, -(1.5 + d) * R, ke1[0] + 0.1 * R, ke1[1] - d * R); ctx.stroke(); } ctx.restore();
  ctx.restore();
  return { kop: [x + 0.35 * R, y], kom: [x - 1.9 * R, y + 0.2 * R], kraakbeen: [x - 1.1 * R, y - 0.75 * R], smeer: [x - 0.42 * R, y + 1.02 * R], kapsel: [x - 0.3 * R, y - 1.45 * R], banden: [x - 0.1 * R, y - 1.85 * R], R };
}
// =====================================================================================
// BOT IN LENGTEDOORSNEDE (pijpbeen, bv. opperarmbeen). Recept (OpenStax A&P 6.3): wand van compact bot, uiteinden met
// sponsachtig bot en rood beenmerg, holte in de schacht met (bij volwassenen) geel beenmerg, beenvlies om de buitenkant,
// bloedvat dat door een gaatje naar binnen gaat, kraakbeen op de gewrichtsvlakken.
// =====================================================================================
function botDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, hl = {}, len = 30, rood = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.35 + 0.65 * (hl[k] == null ? 1 : hl[k]);
  const w = 1.25 * s, k1 = 2.6 * s, H = len * s / 2; // halve schachtbreedte, straal uiteinde
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(-w, -H + k1 * 1.4); ctx.bezierCurveTo(-w * 1.4, -H + k1 * 0.8, -k1, -H + k1 * 0.6, -k1, -H); ctx.arc(0, -H, k1, Math.PI, 0); ctx.bezierCurveTo(k1, -H + k1 * 0.6, w * 1.4, -H + k1 * 0.8, w, -H + k1 * 1.4);
    ctx.lineTo(w, H - k1 * 1.4); ctx.bezierCurveTo(w * 1.4, H - k1 * 0.8, k1 * 1.1, H - k1 * 0.5, k1 * 1.05, H); ctx.arc(0, H, k1 * 1.05, 0, Math.PI); ctx.bezierCurveTo(-k1 * 1.1, H - k1 * 0.5, -w * 1.4, H - k1 * 0.8, -w, H - k1 * 1.4); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= L('bot'); omtrek(); shape(ctx, Z9.bot, Z9.botS, 1.5); ctx.restore();
  ctx.save(); omtrek(); ctx.clip();
  // sponsachtig bot met rood beenmerg in de uiteinden
  ctx.save(); ctx.globalAlpha *= L('rood'); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * (H - 0.15 * s), k1 * 0.86, k1 * 1.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(Z9.merg, '#E6DCC6', 1 - 0.75 * rood); ctx.fill();
    for (let i = 0; i < 90; i++) { const px = (hash(i + sg * 7) - 0.5) * k1 * 1.6, py = sg * (H - 0.15 * s) + (hash(i * 3 + sg) - 0.5) * k1 * 2.8; circ(ctx, px, py, 2 + hash(i + 11) * 3, Z9.botR); } } ctx.restore();
  // mergholte met geel beenmerg in de schacht
  ctx.save(); ctx.globalAlpha *= L('geel'); roundRect(ctx, -w * 0.62, -H + k1 * 1.3, w * 1.24, 2 * H - k1 * 2.6, w * 0.5); ctx.fillStyle = Z9.mergG; ctx.fill(); ctx.restore();
  ctx.restore();
  // kraakbeen op het gewrichtsvlak
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, -H, k1, Math.PI + 0.25, -0.25); ctx.arc(0, -H, k1 - 0.3 * s, -0.25, Math.PI + 0.25, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // beenvlies + bloedvat dat naar binnen gaat
  ctx.save(); ctx.globalAlpha *= L('vlies'); ctx.strokeStyle = rgba('#C9B896', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w - 2.5, -H + k1 * 1.5); ctx.lineTo(-w - 2.5, H - k1 * 1.5); ctx.moveTo(w + 2.5, -H + k1 * 1.5); ctx.lineTo(w + 2.5, H - k1 * 1.5); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('bloedvat'); ctx.strokeStyle = BIO.bloed; ctx.lineWidth = 0.28 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(w + 2.2 * s, -0.2 * H); ctx.quadraticCurveTo(w + 0.6 * s, -0.1 * H, w - 0.2 * s, 0); ctx.quadraticCurveTo(0, 0.12 * H, -0.3 * s, 0.6 * H); ctx.moveTo(-0.1 * s, 0.05 * H); ctx.quadraticCurveTo(0.2 * s, -0.3 * H, 0, -0.7 * H); ctx.stroke(); ctx.restore();
  ctx.restore();
  return { rood: [x, y - H], geel: [x, y + 0.1 * H], kraakbeen: [x, y - H - k1], bloedvat: [x + w + 1.4 * s, y - 0.18 * H], vlies: [x - w - 3, y + 0.4 * H], wand: [x + w, y + 0.35 * H] };
}
// botcellen in kalk (zoomcirkel): ringen van kalk rond een kanaaltje met bloedvat, botcellen met uitlopers in de ringen
function botWeefsel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#D9CFB6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const centra = [[-0.35, -0.3], [0.42, -0.2], [0, 0.45], [-0.6, 0.5], [0.75, 0.55], [-0.05, -0.85], [0.8, -0.8]];
  centra.forEach(([cx0, cy0], j) => { const cx = x + cx0 * r, cy = y + cy0 * r, R0 = r * 0.36;
    for (let k = 5; k >= 1; k--) { ctx.beginPath(); ctx.arc(cx, cy, R0 * k / 5, 0, 6.283); ctx.strokeStyle = rgba('#A89A7A', 0.7); ctx.lineWidth = 1.2; ctx.stroke(); }
    circ(ctx, cx, cy, R0 * 0.16, '#3A2A2A'); circ(ctx, cx, cy, R0 * 0.07, rgba(BIO.bloed, levend)); // kanaal met bloedvat
    for (let i = 0; i < 9; i++) { const an = i * 0.7 + j, rr = R0 * (0.4 + 0.5 * hash(i + j * 9)), bx = cx + Math.cos(an) * rr, by = cy + Math.sin(an) * rr;
      ctx.save(); ctx.globalAlpha *= levend; ctx.strokeStyle = rgba(BIO.kern, 0.7); ctx.lineWidth = 1; for (let q = 0; q < 4; q++) { const aq = an + q * 1.57 + 0.4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(aq) * R0 * 0.12, by + Math.sin(aq) * R0 * 0.12); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(bx, by, R0 * 0.07, R0 * 0.04, an + 1.57, 0, 6.283); shape(ctx, BIO.kern, BIO.kernL, 1); ctx.restore(); } });
  ctx.restore(); }

// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// =====================================================================================
function sarcomeer(ctx, x, y, s, o = {}) { const { L = 2.5, a = 1, rijen = 4, kop = 0, hl = {}, volg = false, tropo = 0, t = 0, dz = 0.42 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hz = L / 2 * s, act = 1.0 * s, myo = 0.8 * s, gapY = dz * s, top = y - (rijen - 0.5) * gapY / 2 * 2 / 2 * 1;
  const ys = [...Array(rijen)].map((_, i) => y + (i - (rijen - 1) / 2) * gapY);
  // Z-lijnen
  for (const sg of [-1, 1]) { ctx.strokeStyle = Z9.zlijn; ctx.lineWidth = Math.max(2, 0.03 * s); ctx.beginPath(); const zx = x + sg * hz;
    for (let k = 0; k <= 8; k++) { const yy = ys[0] - gapY * 0.6 + k * (ys[ys.length - 1] - ys[0] + gapY * 1.2) / 8; k ? ctx.lineTo(zx + (k % 2 ? 4 : -4), yy) : ctx.moveTo(zx, yy); } ctx.stroke(); }
  // actine: van elke Z-lijn naar binnen, tussen de myosinerijen (boven en onder elke rij)
  const actYs = []; for (let i = 0; i <= rijen; i++) actYs.push(ys[0] - gapY / 2 + i * gapY);
  ctx.save(); ctx.globalAlpha *= hl.actine != null ? 0.35 + 0.65 * hl.actine : 1;
  for (const ay of actYs) for (const sg of [-1, 1]) { const x0 = x + sg * hz, x1 = x0 - sg * act;
    ctx.strokeStyle = Z9.actine; ctx.lineWidth = Math.max(3, 0.035 * s); ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = lighten(Z9.actine, 0.25); for (let k = 0; k < act / (0.055 * s); k++) { const xx = x0 - sg * (k + 0.5) * 0.055 * s; circ(ctx, xx, ay + (k % 2 ? 1.5 : -1.5), Math.max(1.6, 0.018 * s), lighten(Z9.actine, 0.25)); }
    if (tropo > 0.01) { ctx.save(); ctx.globalAlpha *= tropo; ctx.strokeStyle = C.paars; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 - sg * act * k / 20; k ? ctx.lineTo(xx, ay + Math.sin(k * 1.6) * 3) : ctx.moveTo(xx, ay); } ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // myosine: dikke draad in het midden, koppen op beide helften behalve de kale zone
  ctx.save(); ctx.globalAlpha *= hl.myosine != null ? 0.35 + 0.65 * hl.myosine : 1; const kale = 0.15 * s;
  for (const my of ys) { roundRect(ctx, x - myo, my - Math.max(3, 0.05 * s), 2 * myo, Math.max(6, 0.1 * s), Math.max(3, 0.05 * s)); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1);
    for (const sg of [-1, 1]) for (let k = 0; k < 9; k++) { const kx = x + sg * (kale + (k + 0.5) * (myo - kale) / 9);
      for (const up of [-1, 1]) { const fase = (kop + k * 0.13 + (up > 0 ? 0.07 : 0)) % 1, hoek = fase < 0.5 ? lerp(0.9, 0.35, fase * 2) : lerp(0.35, 0.9, (fase - 0.5) * 2);
        const lx = kx + sg * Math.cos(hoek) * 0.07 * s * 0.5, ly = my + up * (Math.max(3, 0.05 * s) + Math.sin(hoek) * 0.12 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.018 * s); ctx.beginPath(); ctx.moveTo(kx, my + up * Math.max(3, 0.05 * s)); ctx.lineTo(lx, ly); ctx.stroke(); circ(ctx, lx, ly, Math.max(2.2, 0.025 * s), lighten(Z9.myosine, 0.15)); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}
// myofibril: een buis met banden (lichte en donkere banden, Z-lijnen) als herhaling van sarcomeren
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.55), BIO.spierL, 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s; let i = 0; for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2; ctx.fillStyle = rgba('#5A2A26', 0.6); ctx.fillRect(mid - 0.8 * s, y - h / 2, 1.6 * s, h);
    ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(xx - 1, y - h / 2, 2, h); if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIER IN DWARSDOORSNEDE MET MOTORISCHE EENHEDEN. Recept (OpenStax A&P 10.5; Purves 4e h. 16): spiervezels als veelhoeken
// (± 50 µm), in bundels met bindweefsel; de vezels van één motorische eenheid liggen verspreid door de spier, niet in een groepje.
// Een eenheid trekt alles-of-niets samen; kleine eenheden eerst, daarna grotere (groottebeginsel).
// aan = aantal actieve eenheden (0..n, kommagetal = de volgende komt op), eenheden = [{n: vezels, kleur}].
// =====================================================================================
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
// motorische zenuwcel die zich vertakt naar de vezels van één eenheid (bovenop spierDwars getekend; 'vanuit' = beginpunt axon)
function eenheidZenuw(ctx, vanuit, punten, kleur, o = {}) { const { a = 1, puls = -1, dik = 4 } = o; if (a <= 0.01 || !punten.length) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const mx = punten.reduce((s2, p) => s2 + p[0], 0) / punten.length, my = punten.reduce((s2, p) => s2 + p[1], 0) / punten.length, tak = [lerp(vanuit[0], mx, 0.62), lerp(vanuit[1], my, 0.62)];
  ctx.strokeStyle = kleur; ctx.lineWidth = dik; ctx.beginPath(); ctx.moveTo(vanuit[0], vanuit[1]); ctx.quadraticCurveTo(lerp(vanuit[0], tak[0], 0.5), vanuit[1], tak[0], tak[1]); ctx.stroke();
  ctx.lineWidth = Math.max(1.2, dik * 0.4); for (const p of punten) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.quadraticCurveTo((tak[0] + p[0]) / 2 + (hash(p[0]) - 0.5) * 30, (tak[1] + p[1]) / 2, p[0], p[1]); ctx.stroke(); circ(ctx, p[0], p[1], 3.2, kleur); }
  if (puls >= 0 && puls <= 1) { const px = lerp(vanuit[0], tak[0], puls), py = lerp(vanuit[1], tak[1], puls); circ(ctx, px, py, dik * 1.6, C.goud); }
  ctx.restore(); }

// =====================================================================================
// EMG-SPOOR (plakkers op de huid): som van de piekjes van veel eenheden. Vereenvoudigd: we tekenen het ruwe signaal, dat
// groter en dichter wordt naarmate er meer eenheden meedoen en sneller vuren (Purves h. 16; De Luca 1997, oppervlakte-EMG).
// niveau 0..1 = hoeveel kracht; t schuift het spoor. Deterministisch (hash).
// =====================================================================================
function emgSpoor(ctx, x, y, w, h, o = {}) { const { a = 1, niveau = 0.1, t = 0, kleur = C.teal, rooster = true, geschiedenis = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0D1420', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  if (rooster) { ctx.strokeStyle = rgba('#FFFFFF', 0.05); ctx.lineWidth = 1; for (let gx = x; gx < x + w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); } }
  ctx.strokeStyle = kleur; ctx.lineWidth = 1.6; ctx.beginPath(); const N = Math.floor(w / 1.5), my = y + h / 2;
  for (let i = 0; i <= N; i++) { const xx = x + i * 1.5, tt = t * 300 + i, lev = geschiedenis ? geschiedenis(i / N) : niveau; let v = 0;
    const eenh = Math.floor(2 + lev * 40); for (let j = 0; j < eenh; j++) { const per = Math.max(6, 40 - lev * 22 - j * 0.15), ph = Math.floor(hash(j * 13.1) * per), q = (Math.floor(tt) + ph) % Math.floor(per); if (q < 3) v += (q === 1 ? 1 : -0.6) * (0.25 + 0.75 * hash(j * 3.3)) * (0.4 + j / 40); }
    v += (hash(tt * 0.37) - 0.5) * 0.08; const yy = my - clamp(v * h * 0.22, -h * 0.46, h * 0.46); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.stroke(); ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIER IN DWARSDOORSNEDE met motorische eenheden. Recept (OpenStax A&P 2e 10.2 en 10.3): de spier is omgeven door
// epimysium; binnen in liggen bundels (fascikels), elk omgeven door een bindweefselschot (perimysium); in een bundel
// liggen de vezels dicht tegen elkaar (endomysium, dun), elk met kernen aan de rand. De vezels van één motorische eenheid
// liggen verspreid over de spier (niet in één bundel). eenheden = [{n, kleur}], aan = aantal eenheden dat actief is.
// v2 (beeldbank 27 okt 2026): vezels gegroepeerd in ± 7 bundels met zichtbare bindweefselschotten ertussen en een dikker
// epimysium rond de hele spier (geen 'bol met kiezels' meer); de toewijzing van eenheden is ongewijzigd, dus eenheidZenuw
// en punten(j) werken zoals in v1 (punten volgen de verschoven vezels).
// v2.1 (blinde beoordeling ronde 2): elke bundel krijgt een zichtbaar perimysium: de omhullende van zijn vezels als licht
// vlies, met daarbinnen donker endomysium tussen de vezels (bron: OpenStax A&P 10.2 via eCampusOntario).
// =====================================================================================
function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0, bundels = 7 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, '#C8AFA4', '#E2CEC6', Math.max(3, r * 0.03)); // bindweefsel tussen de bundels
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  // bundelmiddens: één in het midden, de rest in een ring; elke vezel hoort bij het dichtstbijzijnde midden
  const BC = [[cx, cy]]; for (let k = 0; k < bundels - 1; k++) { const an = k / (bundels - 1) * 6.283 + 0.4; BC.push([cx + Math.cos(an) * r * 0.6, cy + Math.sin(an) * r * 0.6]); }
  const gap = Math.max(2, r * 0.06);
  const bij = V.map(v => { let b = 0, bd = 1e9; BC.forEach((q, k) => { const d = Math.hypot(v.c[0] - q[0], v.c[1] - q[1]) * (k ? 1 : 1.25); if (d < bd) { bd = d; b = k; } }); return b; });
  const schuif = V.map((v, i) => { const q = BC[bij[i]], dx = q[0] - v.c[0], dy = q[1] - v.c[1], d = Math.hypot(dx, dy) || 1; return [dx / d * gap * Math.min(1, d / (r * 0.12)), dy / d * gap * Math.min(1, d / (r * 0.12))]; });
  // perimysium: per bundel de omhullende (convex) van zijn vezels, donker gevuld onder de vezels en met een licht vlies erom
  const huls = BC.map((_, b) => { const P = []; V.forEach((v, i) => { if (bij[i] !== b) return; const [sx, sy] = schuif[i]; v.pts.forEach((p, k) => { if (k % 4 === 0) P.push([p[0] + sx, p[1] + sy]); }); });
    if (P.length < 3) return null; P.sort((p, q) => p[0] - q[0] || p[1] - q[1]); const kr = (o2, a2, b2) => (a2[0] - o2[0]) * (b2[1] - o2[1]) - (a2[1] - o2[1]) * (b2[0] - o2[0]);
    const lo = [], hi = []; for (const p of P) { while (lo.length > 1 && kr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; while (hi.length > 1 && kr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
    const H = lo.slice(0, -1).concat(hi.slice(0, -1)); const mx = H.reduce((m, p) => m + p[0], 0) / H.length, my = H.reduce((m, p) => m + p[1], 0) / H.length;
    return H.map(p => { const dx = p[0] - mx, dy = p[1] - my, d = Math.hypot(dx, dy) || 1; return [p[0] + dx / d * gap * 0.25, p[1] + dy / d * gap * 0.25]; }); });
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r * 0.985, 0, 6.283); ctx.clip();
  huls.forEach(H => { if (!H) return; ctx.beginPath(); bioPad(ctx, H, true); ctx.fillStyle = '#5E2E2C'; ctx.fill(); });
  // bundel = donkerder vlak onder de vezels (zodat de schotten licht blijven)
  V.forEach((v, i) => { const [sx, sy] = schuif[i]; const P = v.pts.map(p => [p[0] + sx, p[1] + sy]);
    const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, P); ctx.fillStyle = act > 0.01 ? _mixHex('#9A4A46', kl, 0.75 * act) : '#9A4A46'; ctx.fill();
    ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba('#D8A49A', 0.7); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    const kp = P[(i * 5) % P.length], cc = [v.c[0] + sx, v.c[1] + sy]; circ(ctx, kp[0] * 0.84 + cc[0] * 0.16, kp[1] * 0.84 + cc[1] * 0.16, Math.max(1.6, r * 0.014), rgba(BIO.kern, 0.9)); });
  huls.forEach(H => { if (!H) return; ctx.beginPath(); bioPad(ctx, H, true); ctx.strokeStyle = '#EAD8CE'; ctx.lineWidth = Math.max(1.5, gap * 0.55); ctx.stroke(); }); // perimysium
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.strokeStyle = '#E2CEC6'; ctx.lineWidth = Math.max(4, r * 0.05); ctx.stroke(); // epimysium
  ctx.restore();
  const Vs = V.map((v, i) => ({ c: [v.c[0] + schuif[i][0], v.c[1] + schuif[i][1]], pts: v.pts }));
  return { V: Vs, eig, punten: (j) => Vs.filter((_, i) => eig[i] === j).map(v => v.c) };
}
// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 13.1, StatPearls 'Muscle spindle'): het spoeltje ligt nu ín een stukje spier,
// tussen twee gewone (dikke, gestreepte) spiervezels die met de rek meegaan (o.omgeving = false tekent het los zoals v1).
// De dunne vezeltjes in het spoeltje zijn alleen aan de uiteinden gestreept; in het midden (onder de spiraal) liggen hun
// kernen op een kluitje en is geen streping.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0, omgeving = true } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  if (omgeving) { // gewone spiervezels boven en onder (lopen door tot buiten beeld, rekken mee)
    const W = L * 1.2, vh = h * 0.95;
    ctx.save(); ctx.beginPath(); ctx.rect(x - W / 2, y - h - vh * 1.25, W, 2 * (h + vh * 1.25)); ctx.clip();
    ctx.fillStyle = '#8A6A64'; ctx.fillRect(x - W / 2, y - h - vh * 1.25, W, 2 * (h + vh * 1.25)); // bindweefsel
    for (const [dy, sd] of [[-(h + vh * 0.6), 2], [h + vh * 0.6, 3]]) spierVezel(ctx, x - W / 2 - 4, y + dy, W + 8, vh, { seed: sd, streep: Math.max(7, vh * 0.32) * (1 + 0.18 * rek) });
    ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba('#C9B8A8', 0.55), '#E2CEC6', 2); // kapsel
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); ctx.clip();
  for (const dy of [-0.45, 0, 0.45]) { const yy = y + dy * h, hh = h * 0.26; roundRect(ctx, x - L * 0.42, yy - hh / 2, L * 0.84, hh, hh / 2); shape(ctx, rgba(BIO.spier, 0.85), BIO.spierL, 1);
    ctx.fillStyle = rgba('#5A2A26', 0.55); const st = Math.max(4, w * 0.02) * (1 + 0.18 * rek); for (const sg of [-1, 1]) for (let xx = L * 0.2; xx < L * 0.42; xx += st) ctx.fillRect(x + sg * xx - st * 0.22, yy - hh / 2, st * 0.44, hh); // streping aan de uiteinden
    for (let k = 0; k < 4; k++) circ(ctx, x - L * 0.08 + k * L * 0.05, yy + (k % 2 ? 1 : -1) * hh * 0.15, Math.max(1.5, hh * 0.22), rgba(BIO.kern, 0.9)); } // kernen in het midden
  ctx.restore();
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }

// =====================================================================================
// PRACTICUMLOKAAL: tafel, laptop met EMG-spoor, plakkers. Noor zit (zijaanzicht, outfit zomer = korte mouw), onderarm vooruit.
// =====================================================================================
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function plakker(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 1.5); circ(ctx, x, y, r * 0.35, '#C9CED6'); ctx.restore(); }
function draad(ctx, pts, kleur = '#C9CED6', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }
function schooltas(ctx, x, y, s, o = {}) { const { a = 1, kleur = '#2E5C6E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // hangt aan het handvat (x,y), s = px per cm (± 40 × 30 cm)
  ctx.strokeStyle = _mixHex(kleur, '#000000', 0.3); ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 4 * s, y + 5 * s); ctx.quadraticCurveTo(x, y - 2 * s, x + 4 * s, y + 5 * s); ctx.stroke();
  roundRect(ctx, x - 16 * s, y + 4 * s, 32 * s, 30 * s, 4 * s); shape(ctx, kleur, _mixHex(kleur, '#FFFFFF', 0.25), 2); roundRect(ctx, x - 12 * s, y + 18 * s, 24 * s, 12 * s, 3 * s); shape(ctx, _mixHex(kleur, '#000000', 0.15), null); ctx.restore(); }
function veertje(ctx, x, y, s, o = {}) { const { a = 1, rot = -0.4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(2 * s, -1.6 * s, 7 * s, -1.4 * s, 9 * s, 0); ctx.bezierCurveTo(7 * s, 1.2 * s, 2 * s, 1.0 * s, 0, 0); shape(ctx, '#F2F2EE', '#C9CED6', 1);
  ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-1.5 * s, 0.3 * s); ctx.lineTo(9 * s, 0); ctx.stroke(); ctx.restore(); }
// Practicumscène (castpersonages): Mevrouw Visser, Noor zittend met plakkers en een last in de hand, Sam, tafel met laptop.
// o: last ('veer'|'boek'|'tas'|null), emg 0..1 (niveau op het scherm), armE (elleboog), zak 0..1 (arm zakt bij vallen), visser, sam
// vingertoppen met nitrilhandschoen (practicum), punt = waar ze knijpen
// reflexboog (vwo): sensorisch neuron van het spoeltje naar het ruggenmerg, direct over op het motorisch neuron terug naar de spier

// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — tekeningen ronde 2 (na keuring 26 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// =====================================================================================

// ARMMODEL (practicum, Kamiel 26 okt 2026 in plaats van de kippenvleugel). Twee latjes met een scharnier, twee touwtjes als spieren.
// Bovenste latje staat vast op een voetje; onderste latje scharniert eronder en steekt een stukje achter het scharnier uit
// (zoals het uitsteeksel van de ellepijp). Touwtje voor zit vóór het scharnier vast, touwtje achter aan het stompje.
// Elk touwtje loopt door een oogje bovenaan en eindigt in een ringetje. e = hoek onderste latje (0 = recht naar beneden,
// 1.57 = horizontaal naar voren). knikV / knikA 0..1 = touwtje voor/achter geduwd (knikt), trekV / trekA = trekpijl.
// s = px per cm (latjes ± 30 cm). Voorkant = +x.
function armModel(ctx, x, y, s, o = {}) { const { a = 1, e = 0.2, knikV = 0, knikA = 0, trekV = 0, trekA = 0, hlV = 0, hlA = 0, dimV = 0, dimA = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hout = '#C9A36A', houtS = '#9A7A4A', H = [x, y], top = [x, y - 30 * s];
  // statief (staat op tafel op hoogte o.statief) met een klem bovenaan
  if (o.statief != null) { ctx.fillStyle = '#8A94A6'; ctx.fillRect(x - 15 * s, y - 34 * s, 1.4 * s, o.statief - (y - 34 * s)); roundRect(ctx, x - 22 * s, o.statief - 1.6 * s, 16 * s, 1.6 * s, 0.5 * s); shape(ctx, '#5A6478', null); }
  roundRect(ctx, x - 16 * s, y - 34 * s, 22 * s, 3 * s, 1 * s); shape(ctx, _mixHex(hout, '#000000', 0.15), houtS, 1.5);
  // bovenste latje (opperarm)
  roundRect(ctx, x - 1.4 * s, y - 31 * s, 2.8 * s, 31 * s, 1 * s); shape(ctx, hout, houtS, 1.5);
  // onderste latje (onderarm) met stompje achter het scharnier
  const ux = Math.sin(e), uy = Math.cos(e), F = (d, n = 0) => [x + ux * d * s + uy * n * s, y + uy * d * s - ux * n * s];
  ctx.save(); ctx.translate(x, y); ctx.rotate(-e); roundRect(ctx, -1.3 * s, -4 * s, 2.6 * s, 32 * s, 1 * s); shape(ctx, _mixHex(hout, '#FFFFFF', 0.08), houtS, 1.5); ctx.restore();
  // scharnier
  circ(ctx, x, y, 1.5 * s, '#8A94A6', '#5A6478', 1.5); circ(ctx, x, y, 0.5 * s, '#3A4458');
  // oogjes bovenaan (voor en achter)
  const oogV = [x + 2.6 * s, y - 27 * s], oogA = [x - 2.6 * s, y - 27 * s];
  for (const p of [oogV, oogA]) { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 * s, 0, 6.283); ctx.stroke(); }
  // aanhechtingen
  const hV = F(5, 1.3), hA = F(-3.2, -0.6);
  const touw = (oog, h, knik, hl, dimK, kleur) => { ctx.save(); ctx.globalAlpha *= dimK ? 0.35 : 1; const d = Math.hypot(h[0] - oog[0], h[1] - oog[1]);
    ctx.strokeStyle = hl > 0.01 ? _mixHex('#E9E3D2', C.goud, hl) : '#E9E3D2'; ctx.lineWidth = 4 + 2 * hl;
    ctx.beginPath(); ctx.moveTo(h[0], h[1]);
    if (knik > 0.01) { // te veel touw: het knikt opzij
      const mx = (h[0] + oog[0]) / 2, my = (h[1] + oog[1]) / 2, nx = (oog[1] - h[1]) / d, ny = -(oog[0] - h[0]) / d, sg = oog[0] > x ? 1 : -1, b = knik * 5 * s * sg;
      ctx.bezierCurveTo(h[0] + nx * b * 0.4, h[1] + ny * b * 0.4, mx + nx * b * 1.4, my + ny * b * 1.4 + 2 * s, mx + nx * b, my + ny * b);
      ctx.bezierCurveTo(mx + nx * b * 0.6 - 2 * s * sg, my - 3 * s, oog[0] + nx * b * 0.3, oog[1] + ny * b * 0.3 + 3 * s, oog[0], oog[1]);
    } else ctx.lineTo(oog[0], oog[1]);
    ctx.stroke(); circ(ctx, h[0], h[1], 0.8 * s, '#8A94A6');
    // vrij eind boven het oogje met ringetje (langer naarmate er minder touw onder het oogje zit)
    const vrij = Math.max(2, 22 - d / s + (knik > 0 ? -knik * 4 : 0)), ex = oog[0] + (oog[0] > x ? 0.6 : -0.6) * s, ey = oog[1] - vrij * s;
    ctx.beginPath(); ctx.moveTo(oog[0], oog[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey - 1.1 * s, 1.1 * s, 0, 6.283); ctx.strokeStyle = kleur; ctx.stroke();
    ctx.restore(); return [ex, ey - 1.1 * s]; };
  const rV = touw(oogV, hV, knikV, hlV, dimV, C.goud), rA = touw(oogA, hA, knikA, hlA, dimA, C.teal);
  if (trekV > 0.01) pijl(ctx, rV[0], rV[1] - 1.5 * s, rV[0], rV[1] - 1.5 * s - 7 * s * trekV, C.goud, 1, 5, 18);
  if (trekA > 0.01) pijl(ctx, rA[0], rA[1] - 1.5 * s, rA[0], rA[1] - 1.5 * s - 7 * s * trekA, C.teal, 1, 5, 18);
  ctx.restore();
  return { scharnier: H, top, hand: F(27), onder: F(14), boven: [x, y - 15 * s], hechtV: hV, hechtA: hA, ringV: rV, ringA: rA, oogV, oogA };
}



// SPIERCONTRACTIE OP MOLECUULNIVEAU — definitief (inbouw 28 okt 2026): reticulum als kous uit B, actine als dubbele
// bolletjesstreng uit A (Kamiel: 'de kralen van A mooi, maar niet de ringen om de vezel bovenaan').
// Recept (OpenStax A&P 10.2–10.3; Alberts h. 16):
// · Actine (dunne draad) = twee strengen bolletjes (G-actine, ± 5,5 nm) die om elkaar draaien; ze kruisen elke
//   ± 13 bolletjes (± 36 nm). Bindplekken voor myosine op de bolletjes (hier om de 6, zoals in de film).
// · Tropomyosine = lange draad die in de groef tussen de twee strengen ligt en de bindplekken afdekt; troponine
//   zit er om de ± 7 bolletjes (± 38 nm) aan vast; Ca²⁺ bindt aan troponine → tropomyosine schuift opzij.
// · Myosinekop: hals aan de dikke draad; gespannen ± loodrecht, na de krachtslag gekanteld naar het midden van
//   de sarcomeer; ATP/ADP+P als label op de kop (chip).
// · Sarcoplasmatisch reticulum = glad ER dat als een net van buisjes om élke myofibril ligt; bij de overgang
//   A-band/I-band verwijdt het tot terminale cisternen (ringen om de fibril) met een T-buisje ertussen (triade).
//   Bij een impuls komt Ca²⁺ vrij uit de cisternen (ca 0..1) en wordt daarna teruggepompt (terug 0..1).
// Aanpak: actine als twee strengen G-actinebolletjes die om elkaar draaien (achterste bolletjes donkerder en iets
//   kleiner, voorste lichter; uit A); reticulum als kous om een ronde myofibril: de buisjes aan de achterkant
//   gedimd, de voorkant vol, het T-buisje komt van boven uit het celmembraan; rechts een stuk zonder kous (uit B).
//   De donkere schaduwstrook over de onderkant van de fibril is weg (Part C: geen schaduw).
// Bekende fouten: actine als één rij bolletjes; reticulum als vlek met lijnen; chip die een fout gooit als tag()
//   ontbreekt (nu een eigen pilletje als tag() er niet is).
// Aanroepen zoals voorheen. kopStand(ctx, x, y, s, {a, hoek, vast, actX, chip, chipA, hl, plekken}) →
//   {kop, actine, myosine}; actineDetail(ctx, x, y, w, s, {a, schuif, ca}) → {tropo, troponine, plek};
//   reticulum(ctx, x, y, w, h, {a, ca, t, terug}) → {cisternen:[x...], ttubuli:[x...]} (nieuw).
function _spA_chip(ctx, s, x, y, col, px) { if (typeof tag === 'function') return tag(ctx, s, x, y, col, 1, 'left', px);
  ctx.save(); ctx.font = `600 ${px}px "Source Sans 3", system-ui, sans-serif`; const w = ctx.measureText(s).width + px * 1.2; roundRect(ctx, x, y - px - 4, w, px + 14, (px + 14) / 2); shape(ctx, rgba(col, 0.16), col, 1.5);
  ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(s, x + w / 2, y); ctx.restore(); }
function _spA_actine(ctx, x0, y, x1, s, schuif = 0, plekken = true, voorAlleen = false) { // dubbele streng, kruist elke 13 bolletjes
  const d = 0.62 * s, rb = 0.3 * s, amp = 0.42 * s; const k0 = Math.floor((x0 - schuif) / d) - 1, k1 = Math.ceil((x1 - schuif) / d) + 1; const items = [];
  for (let k = k0; k <= k1; k++) for (const st of [0, 1]) { const ph = (k / 13) * 6.283 + st * Math.PI; const bx = k * d + schuif + (st ? d * 0.5 : 0); if (bx < x0 - d || bx > x1 + d) continue; items.push({ x: bx, y: y + Math.sin(ph) * amp, z: Math.cos(ph), k, st }); }
  items.sort((A, B) => A.z - B.z).forEach(b => { if (voorAlleen && b.z < -0.2) return; const z = (b.z + 1) / 2; circ(ctx, b.x, b.y, rb * (0.85 + 0.15 * z), _mixHex(_mixHex(Z9.actine, '#1A2740', 0.45), _mixHex(Z9.actine, '#FFFFFF', 0.15), z), Z9.actine, 1);
    if (plekken && b.st === 0 && ((b.k % 6) + 6) % 6 === 3) circ(ctx, b.x, b.y + 0.12 * s, 0.12 * s, '#1A2A3A'); });
}
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, _mixHex(Z9.myosine, '#FFFFFF', 0.3), 1.5);
  // naastgelegen koppen op de dikke draad (context, gedimd)
  ctx.save(); ctx.globalAlpha *= 0.35; for (const dx of [-5.5, 5.5]) { const hx = x + dx * s; ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.3 * s; ctx.beginPath(); ctx.moveTo(hx, my - 0.45 * s); ctx.lineTo(hx - 0.5 * s, my - 1.5 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(hx - 0.6 * s, my - 1.9 * s, 0.45 * s, 0.7 * s, -0.3, 0, 6.283); ctx.fillStyle = Z9.myosine; ctx.fill(); } ctx.restore();
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip(); _spA_actine(ctx, x - 10 * s, ay, x + 10 * s, s, actX, plekken); ctx.restore();
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.35 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.quadraticCurveTo(nx - 0.2 * s, (ny + kopY) / 2, kx, kopY + 0.4 * s); ctx.stroke();
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.85 * s, 0, 0, 6.283); shape(ctx, _mixHex(Z9.myosine, '#FFFFFF', 0.15), hl > 0.5 ? C.goud : Z9.myosine, hl > 0.5 ? 3 : 1.5);
  ctx.beginPath(); ctx.ellipse(0.1 * s, -0.35 * s, 0.18 * s, 0.12 * s, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.45); ctx.fill(); ctx.restore(); // ATP-holte
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; _spA_chip(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, Math.max(12, Math.round(0.42 * s))); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}
function actineDetail(ctx, x, y, w, s, o = {}) { const { a = 1, schuif = 0, ca = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.floor(w / (0.62 * s)); const x1 = x + (n - 1) * 0.62 * s;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 0.5 * s, y - 1.5 * s, w + s, 3 * s); ctx.clip(); _spA_actine(ctx, x, y, x1, s, 0, true); ctx.restore();
  // tropomyosine in de groef: schuift bij calcium van de bindplekken af
  const ty = y + lerp(0.12, -0.62, schuif) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 0.2 * s; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 120; k++) { const xx = x + k * (x1 - x) / 120; const ph = ((xx - x) / (0.62 * s)) / 13 * 6.283; const yy = ty + Math.sin(ph + Math.PI / 2) * 0.12 * s; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  const tp = []; for (let k = 3; k < n; k += 7) { const bx = x + (k + 1.5) * 0.62 * s; ctx.beginPath(); ctx.ellipse(bx, ty - 0.12 * s, 0.38 * s, 0.26 * s, 0, 0, 6.283); shape(ctx, _mixHex(C.paars, '#FFFFFF', 0.3), C.paars, 1.5); tp.push([bx, ty - 0.12 * s]);
    if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; circ(ctx, bx + 0.3 * s, ty - 0.48 * s, 0.15 * s, Z9.ca); ctx.restore(); } }
  ctx.restore(); return { tropo: [x + w * 0.5, ty], troponine: tp[0] || [x, y], plek: [x + 3 * 0.62 * s, y + 0.3 * s] }; }
function reticulum(ctx, x, y, w, h, o = {}) { const { a = 1, ca = 0, t = 0, terug = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const per = clamp(h * 2.2, 120, 260); const top = y - h / 2, bot = y + h / 2; const SR = '#7FB7D6'; const kousEind = x + w * 0.86;
  const J = []; for (let xx = x; xx < kousEind; xx += per) { if (xx + per * 0.22 < kousEind) J.push(xx + per * 0.22); if (xx + per * 0.78 < kousEind) J.push(xx + per * 0.78); }
  // achterkant van de kous (gedimd), achter de fibril
  const buis = (x0, x1, j, voor) => { const ph = j / 5 * Math.PI + (voor ? 0 : Math.PI); const yy = y - Math.cos(ph) * (h / 2 + h * 0.06); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(lerp(x0, x1, 0.33), yy + h * 0.07 * (j % 2 ? 1 : -1), lerp(x0, x1, 0.66), yy - h * 0.07 * (j % 2 ? 1 : -1), x1, yy); ctx.stroke(); };
  ctx.strokeStyle = rgba(SR, 0.3); ctx.lineWidth = Math.max(2, h * 0.05); for (let i = 0; i < J.length - 1; i++) for (let j = 1; j < 5; j++) buis(J[i] + 6, J[i + 1] - 6, j, false);
  // myofibril als ronde staaf met banden
  roundRect(ctx, x, top, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1.2);
  ctx.save(); roundRect(ctx, x, top, w, h, h / 2); ctx.clip(); for (let xx = x; xx < x + w; xx += per) { ctx.fillStyle = rgba('#5A2A26', 0.45); ctx.fillRect(xx + per * 0.22, top, per * 0.56, h); ctx.fillStyle = rgba('#F2F2EE', 0.35); ctx.fillRect(xx - 1, top, 2, h); }
  ctx.restore();
  // voorkant van de kous: buisjes, kraag, cisternen als halve ringen voor de fibril
  ctx.strokeStyle = rgba(SR, 0.9); ctx.lineWidth = Math.max(2, h * 0.06); for (let i = 0; i < J.length - 1; i++) { for (let j = 1; j < 5; j++) buis(J[i] + 6, J[i + 1] - 6, j, true);
    if (i % 2 === 0) { const m = (J[i] + J[i + 1]) / 2; ctx.beginPath(); ctx.ellipse(m, y, (J[i + 1] - J[i]) * 0.07, h / 2 + h * 0.04, 0, -Math.PI / 2, Math.PI / 2, true); ctx.stroke(); } }
  const cis = [], tt = []; const g = Math.max(4, h * 0.08);
  J.forEach(j => { for (const c of [j - g, j + g]) { ctx.beginPath(); ctx.ellipse(c, y, Math.max(3, h * 0.05), h / 2 + h * 0.1, 0, -Math.PI / 2, Math.PI / 2, true); ctx.strokeStyle = rgba(SR, 1); ctx.lineWidth = Math.max(5, h * 0.09); ctx.stroke(); cis.push(c); }
    // T-buisje: instulping van het celmembraan van boven, tussen de twee cisternen
    ctx.strokeStyle = rgba(C.line, 0.95); ctx.lineWidth = Math.max(2.5, h * 0.05); ctx.beginPath(); ctx.moveTo(j, top - h * 0.55); ctx.lineTo(j, bot + h * 0.12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(j - h * 0.18, top - h * 0.55); ctx.quadraticCurveTo(j, top - h * 0.5, j + h * 0.18, top - h * 0.55); ctx.stroke(); tt.push(j); });
  const u0 = clamp(ca - terug, 0, 1);
  if (u0 > 0.01) cis.forEach((c, ci) => { for (let i = 0; i < 6; i++) { const sd = ci * 13 + i; const u = u0 * clamp(1.2 - hash(sd) * 0.4, 0, 1); const by0 = y + (i % 2 ? -1 : 1) * (h / 2 + h * 0.06), by1 = y + (hash(sd * 7.7) - 0.5) * h * 0.75;
    circ(ctx, lerp(c, c + (hash(sd * 5) - 0.5) * per * 0.35, u), lerp(by0, by1, u) + Math.sin(t * 3 + sd) * 1.5, Math.max(2.5, h * 0.05), Z9.ca); } });
  ctx.restore(); return { cisternen: cis, ttubuli: tt }; }

// TREKKINGEN TELLEN OP (vwo, grafiek): kracht tegen tijd voor impulsen met een gegeven tussentijd. sneller = 0 (los), 1 (opgeteld)
function trekGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, tussen = 0.5, prog = 1, kleur = C.goud, impulsen = 4, label = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  assen(ctx, x, y, w, h, 'tijd', 'kracht'); const tw = (tt) => tt <= 0 ? 0 : (tt / 0.12) * Math.exp(1 - tt / 0.12);
  const imp = [...Array(impulsen)].map((_, i) => 0.05 + i * tussen); ctx.strokeStyle = kleur; ctx.lineWidth = 3.5; ctx.beginPath();
  const N = 200; for (let i = 0; i <= N * prog; i++) { const tt = i / N * 1.2; let v = 0; for (const t0 of imp) v += tw(tt - t0); const xx = x + i / N * w, yy = y + h - Math.min(v, 2.6) / 2.6 * h * 0.92; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (const t0 of imp) { const xx = x + t0 / 1.2 * w; if (t0 / 1.2 <= prog) { ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y + h + 8); ctx.lineTo(xx, y + h + 30); ctx.stroke(); } }
  if (label) metaText(ctx, label, x + w / 2, y + h + 64, C.text2, 'center', 20);
  ctx.restore(); }

// OOG met oogspier (van opzij, schema) en een stand 0..1 (kijkrichting)
function oogSchema(ctx, x, y, r, o = {}) { const { a = 1, stand = 0.5, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 2); const an = lerp(-0.45, 0.45, stand); const px = x + Math.cos(an) * r * 0.78, py = y + Math.sin(an) * r * 0.78;
  circ(ctx, px, py, r * 0.3, '#5B7FA6'); circ(ctx, px, py, r * 0.15, '#121A26');
  ctx.beginPath(); ctx.moveTo(x - r * 0.2, y - r * 0.98); ctx.bezierCurveTo(x - r * 0.9, y - r * 1.35, x - r * 1.7, y - r * 0.9, x - r * 2.2, y - r * 0.6); ctx.lineWidth = r * 0.22; ctx.strokeStyle = hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.4) : Z9.spier; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r * 2.5, y - r * 1.1); ctx.lineTo(x - r * 2.15, y - r * 0.2); ctx.lineTo(x - r * 2.6, y + r * 0.6); ctx.lineTo(x - r * 2.9, y - r * 0.3); ctx.closePath(); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore(); return { spier: [x - r * 1.2, y - r * 1.15] }; }
// KUIT (onderbeen van opzij, schema) met voet in stand 0..1
function kuitSchema(ctx, x, y, s, o = {}) { const { a = 1, stand = 0, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  z9Glad(ctx, [[x - 1.6 * s, y - 40 * s], [x - 4.8 * s, y - 28 * s], [x - 3.6 * s, y - 14 * s], [x - 2.2 * s, y - 4 * s], [x + 1.8 * s, y - 4 * s], [x + 2.4 * s, y - 20 * s], [x + 2.6 * s, y - 40 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2);
  z9Glad(ctx, [[x - 1.8 * s, y - 37 * s], [x - 4.3 * s, y - 27 * s], [x - 3.0 * s, y - 15 * s], [x - 1.2 * s, y - 15 * s], [x - 0.6 * s, y - 27 * s]], true); shape(ctx, hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.35) : Z9.spier, Z9.spierL, 1.5);
  z9Pees(ctx, [[x - 2.1 * s, y - 15 * s], [x - 2.0 * s, y - 6 * s], [x - 2.4 * s, y - 1.5 * s]], 0.7 * s, 1);
  ctx.save(); ctx.translate(x, y - 3 * s); ctx.rotate(lerp(0, 0.6, stand)); z9Glad(ctx, [[-3 * s, -1 * s], [-3.2 * s, 2.2 * s], [10 * s, 3.2 * s], [11 * s, 1.2 * s], [3 * s, -1.6 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2); ctx.restore();
  ctx.restore(); return { spier: [x - 3.6 * s, y - 26 * s] }; }

// EMG-PANEEL: twee kanalen (biceps, triceps) met optionele staplabels en verborgen sporen
function emgPaneel(ctx, x, y, w, o = {}) { const { a = 1, t = 0, bic = 0.05, tri = 0.02, hisB = null, hisT = null, triA = 1, stappen = null, verbergB = 0, verbergT = 0, hlB = 0, hlT = 0, vraagA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = triA > 0.01 ? 430 : 250; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.kast, 0.92), C.line, 1.5);
  metaText(ctx, 'BICEPS', x + 25, y + 40, hlB > 0.5 ? C.goud : C.teal, 'left', 22); emgSpoor(ctx, x + 20, y + 55, w - 40, 150, { t, rooster: false, niveau: bic, geschiedenis: hisB, kleur: hlB > 0.5 ? C.goud : C.teal });
  if (verbergB > 0.01) { ctx.save(); ctx.globalAlpha *= verbergB; roundRect(ctx, x + 20, y + 55, w - 40, 150, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 160, vraagA, 80); ctx.restore(); }
  if (triA > 0.01) { ctx.save(); ctx.globalAlpha *= triA; metaText(ctx, 'TRICEPS', x + 25, y + 250, hlT > 0.5 ? C.goud : C.text2, 'left', 22); emgSpoor(ctx, x + 20, y + 265, w - 40, 120, { t: t + 3, rooster: false, niveau: tri, geschiedenis: hisT, kleur: hlT > 0.5 ? C.goud : C.teal });
    if (verbergT > 0.01) { ctx.save(); ctx.globalAlpha *= verbergT; roundRect(ctx, x + 20, y + 265, w - 40, 120, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 355, vraagA, 70); ctx.restore(); } ctx.restore(); }
  if (stappen) stappen.forEach((s2, i) => text(ctx, s2[0], x + 20 + (w - 40) * s2[1], y + h - 12, fTekst(22, 600), s2[2] ? C.text : C.text2, 'center'));
  ctx.restore(); }

// PRACTICUMLOKAAL (film): Noor zit aan tafel met plakkers op biceps en triceps; laptop op tafel; Sam en mevrouw Visser staan.
// o.last 'veer'|'boek'|'boeken'|'tas'|null, o.armE elleboog (rad), o.opTafel = arm ligt op tafel, o.uitN gezicht Noor
// stuk huid met een plakker erop en spiervezels eronder (H4)
function huidPlakker(ctx, x, y, w, o = {}) { const { a = 1, t = 0, vuur = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 50, 10); shape(ctx, rgba(BIO.huid, 0.55), BIO.huidS, 1.5);
  for (let k = 0; k < 5; k++) spierVezel(ctx, x + 10, y + 90 + k * 42, w - 20, 32, { seed: k + 4, a: 1 });
  circ(ctx, x + w / 2, y - 6, 40, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x + w / 2, y - 6, 14, '#C9CED6');
  if (vuur > 0.01) for (let k = 0; k < 5; k++) { const u = (t * 1.3 + k * 0.21) % 1; ctx.save(); ctx.globalAlpha *= vuur * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + w * (0.2 + 0.15 * k), y + 90 + (k % 5) * 42, 10 + u * 60, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// =====================================================================================
// VERBETERRONDE 1 · nieuwe objecten (Kamiels keuzes op het keuringsblad, ingebouwd 28 okt 2026). Per groep; recept en bron
// boven elke functie. Varianten en stills: verbeterronde-1/inbouw/<groep>/<obj>/. Oude versies: oud/2026-10-27/.
// =====================================================================================

// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
  ctx.restore(); return pts;
}
// punt-in-veelhoek (ontwerpeenheden) als 'binnen'-functie voor _grKluwen; bbox erbij
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }
function _ellips(rx, ry) { return { binnen: (x, y) => (x * x) / (rx * rx) + (y * y) / (ry * ry) < 1, bbox: [-rx, -ry, rx, ry] }; }

// =====================================================================================
// groep cel-afweer
// =====================================================================================

// =====================================================================================
// GEDIFFERENTIEERDE CELLEN (set). Recept: alle lichaamscellen komen uit één bevruchte eicel (± 100 µm, zona
// pellucida, twee voorkernen) en hebben hetzelfde DNA; ze verschillen doordat in elk celtype andere genen aan staan
// (differentiatie door genexpressie). Huidcel (keratinocyt): plat-veelhoekig, vol keratinebundels, ovale kern. Levercel
// (hepatocyt, ± 25 µm): veelhoekig, ronde kern in het midden, veel ER, mitochondriën en glycogeenkorrels. Zenuwcel:
// cellichaam met dendrieten en één lang axon (zenuwcel()). Skeletspiervezel: lang, dwarsgestreept, kernen aan de rand
// (spierVezel()). Rode bloedcel: ingedeukte schijf 7–8 µm, verliest bij het rijpen zijn kern (rodeBloedcel()): het
// DNA-strookje staat er gestippeld bij (het gold voor de voorlopercel). Genstrookje: hetzelfde stukje DNA met vijf
// genen (keratine, albumine, neurotransmitter-enzym, myosine, hemoglobine); alleen het gen van dat celtype staat aan
// (goud). Bron: Klymkowsky & Cooper, Biofundamentals 10.5; NIH Stem Cell Basics; OpenStax Biology 2e § 10.4 (genen
// regelen de cel). Rode bloedcel: één van boven en één los ernaast van opzij (staand), zodat
// de ingedeukte schijf leest en niet 'een bol met staartje' (fout keuring 28 okt 2026; 7–8 µm, ± 2 µm dik: OpenStax A&P 18.3, WikiLectures).
// Bekende fouten: cellen met verschillend DNA; rode bloedcel met kern; alle cellen even groot rond.
// =====================================================================================
// Stijl B: stamboom van links naar rechts — bevruchte eicel → 2 → 4 cellen → vijf takken; met o.d (0..1) groeien de
// cellen aan het eind van gelijke ronde cellen uit tot hun eigen vorm terwijl hun gen aangaat (proces). Het
// genstrookje staat rechts naast elke cel. Aanroep: gedifferentieerdeCellen(ctx, x, y, s, o) — (x, y) = midden,
// s = 1 → ± 560 × 420 px. o.d (standaard 1), o.toon = 'set' | één celtype, o.genen 0..1, o.licht, o.t.
// Geeft { eicel, huid, lever, zenuw, spier, bloed } terug.
// =====================================================================================
function _gdbRond(ctx, x, y, r, lw) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _GD.cyto, _GD.rand, lw); _gdKern(ctx, x + r * 0.1, y - r * 0.05, r * 0.42, lw); }
function gedifferentieerdeCellen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, toon = 'set', d = 1, genen = 1, licht = null, t = 0 } = o; const u = 44 * s; const ret = {}; const lw = Math.max(1, 1.2 * s);
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const dd = ease(clamp(d, 0, 1));
  const eind = (tp, px, py, uu) => { // eindcel: overvloeien van ronde cel naar eigen vorm
    if (dd < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - dd; _gdbRond(ctx, px, py, uu * 0.55 * (1 - 0.2 * dd), lw); ctx.restore(); }
    if (dd > 0.001) { ctx.save(); ctx.globalAlpha *= dd; ctx.translate(px, py); ctx.scale(lerp(0.6, 1, dd), lerp(0.6, 1, dd)); _gdCel(ctx, tp, 0, 0, uu, t); ctx.restore(); } };
  if (toon !== 'set') { eind(toon, x, y, u); ret[toon] = [x, y]; if (genen > 0.01) _gdStrip(ctx, x + u * 2.4, y, u * 1.6, dd > 0.5 ? toon : null, genen, toon === 'bloed' && dd > 0.5); ctx.restore(); return ret; }
  const x0 = x - 250 * s, x1 = x - 150 * s, x2 = x - 70 * s, x3 = x + 90 * s; const ys = [-180, -90, 0, 90, 180].map(v => y + v * s);
  const types = ['huid', 'lever', 'zenuw', 'spier', 'bloed'];
  const n1 = [y - 50 * s, y + 50 * s], n2 = [y - 120 * s, y - 40 * s, y + 40 * s, y + 120 * s];
  ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = Math.max(1, 1.6 * s);
  const tak = (ax, ay, bx, by) => { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.bezierCurveTo((ax + bx) / 2, ay, (ax + bx) / 2, by, bx, by); ctx.stroke(); };
  n1.forEach(yy => tak(x0, y, x1, yy)); n2.forEach((yy, i) => tak(x1, n1[i < 2 ? 0 : 1], x2, yy));
  const van = [0, 1, 1, 2, 3]; ys.forEach((yy, i) => tak(x2, n2[van[i]], x3 - 40 * s, yy));
  _gdCel(ctx, 'eicel', x0, y, u * 0.55, t); ret.eicel = [x0, y];
  n1.forEach(yy => _gdbRond(ctx, x1, yy, u * 0.5, lw)); n2.forEach(yy => _gdbRond(ctx, x2, yy, u * 0.42, lw));
  types.forEach((tp, i) => { ctx.save(); if (licht && licht !== tp) ctx.globalAlpha *= 0.4; const uu = u * (tp === 'bloed' ? 0.7 : 0.55);
    eind(tp, x3 + (tp === 'zenuw' ? 10 * s : 0), ys[i], uu); ret[tp] = [x3, ys[i]];
    if (genen > 0.01) _gdStrip(ctx, x3 + 150 * s, ys[i], u * 1.5, dd > 0.5 ? tp : null, genen, tp === 'bloed' && dd > 0.5); ctx.restore(); });
  ctx.restore(); return ret;
}
// --- losse celtypen (gedeeld door de set). u = maat-eenheid in px (± 1 µm × u/2). Elk geeft het midden van de kern terug.
const _GD = { cyto: '#2C3A52', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', kerat: '#C9B896', er: '#AFC0D0', glyc: '#DCC07F', aan: '#E0B64A', uit: '#4A5670' };
const _GD_GEN = [['huid', 'keratine'], ['lever', 'albumine'], ['zenuw', 'neurotransmitter'], ['spier', 'myosine'], ['bloed', 'hemoglobine']];
function _gdKern(ctx, x, y, r, lw) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, _GD.kern, _GD.kernR, lw); ctx.fillStyle = rgba('#3E2E66', 0.55); ctx.beginPath(); ctx.arc(x + r * 0.25, y - r * 0.2, r * 0.25, 0, 6.283); ctx.fill(); }
function _gdPoly(cx, cy, r, n, seed, rond = 0) { const p = []; for (let i = 0; i < n; i++) { const an = (i + 0.2 * (hash(seed + i) - 0.5)) / n * 6.283; const rr = r * (0.9 + 0.2 * hash(seed * 3 + i)); p.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]); } return p; }
function _gdCel(ctx, soort, x, y, u, t = 0) {
  const lw = Math.max(1, u * 0.025);
  if (soort === 'eicel') { const r = u * 2.2; ctx.beginPath(); ctx.arc(x, y, r * 1.12, 0, 6.283); ctx.strokeStyle = rgba('#E6DCC6', 0.55); ctx.lineWidth = r * 0.1; ctx.stroke(); // zona pellucida
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, '#3A3A4E', _GD.rand, lw * 1.3);
    for (let i = 0; i < 40; i++) { const an = hash(i * 3.3) * 6.283, d = Math.sqrt(hash(i * 1.1)) * r * 0.9; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, u * 0.04, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.18); ctx.fill(); }
    _gdKern(ctx, x - r * 0.18, y, r * 0.2, lw); _gdKern(ctx, x + r * 0.2, y + r * 0.05, r * 0.19, lw); return [x, y]; } // twee voorkernen
  if (soort === 'huid') { const P = _gdPoly(x, y, u * 1.05, 6, 11).map(([px, py]) => [px, y + (py - y) * 0.62]); ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3);
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip(); ctx.strokeStyle = rgba(_GD.kerat, 0.75); ctx.lineWidth = Math.max(0.8, u * 0.03); // keratinebundels
    for (let i = 0; i < 7; i++) { const yy = y + (i - 3) * u * 0.14; ctx.beginPath(); ctx.moveTo(x - u * 1.1, yy + u * 0.1); ctx.bezierCurveTo(x - u * 0.4, yy - u * 0.15, x + u * 0.3, yy + u * 0.15, x + u * 1.1, yy - u * 0.08); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.ellipse(x, y, u * 0.34, u * 0.24, 0, 0, 6.283); shape(ctx, _GD.kern, _GD.kernR, lw); return [x, y]; }
  if (soort === 'lever') { const P = _gdPoly(x, y, u * 0.95, 6, 23); ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _GD.cyto, _GD.rand, lw * 1.3);
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip();
    for (let k = 0; k < 3; k++) { ctx.strokeStyle = rgba(_GD.er, 0.55); ctx.lineWidth = Math.max(0.7, u * 0.02); ctx.beginPath(); ctx.arc(x - u * 0.15, y + u * 0.1, u * (0.45 + k * 0.13), 2.2, 4.2); ctx.stroke(); }
    for (let i = 0; i < 22; i++) { const an = hash(i * 7.3) * 6.283, d = u * (0.35 + 0.5 * hash(i * 2.9)); ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, u * 0.035, 0, 6.283); ctx.fillStyle = rgba(_GD.glyc, 0.6); ctx.fill(); } // glycogeen
    for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.4, d = u * 0.62; ctx.save(); ctx.translate(x + Math.cos(an) * d, y + Math.sin(an) * d); ctx.rotate(an + 1.5); roundRect(ctx, -u * 0.13, -u * 0.05, u * 0.26, u * 0.1, u * 0.05); shape(ctx, C.mito, C.mitoR, Math.max(0.6, lw * 0.6)); ctx.restore(); }
    ctx.restore(); _gdKern(ctx, x + u * 0.05, y - u * 0.05, u * 0.27, lw); return [x + u * 0.05, y - u * 0.05]; }
  if (soort === 'zenuw') { zenuwcel(ctx, x - u * 0.9, y, { s: u / 95, naar: [x + u * 3, y + u * 0.2], seed: 3, takken: 5, t }); return [x - u * 0.9, y]; }
  if (soort === 'spier') { spierVezel(ctx, x - u * 1.7, y, u * 3.4, u * 0.7, { seed: 5, streep: Math.max(4, u * 0.13) }); return [x - u * 0.6, y - u * 0.3]; }
  if (soort === 'bloed') { // geen kern; van boven (ingedeukte schijf: bleek midden) en los ernaast van opzij (plat, ± 2 µm dik), niet overlappend
    rodeBloedcel(ctx, x - u * 0.42, y, u * 0.36, 0, 0); rodeBloedcel(ctx, x + u * 0.42, y, u * 0.36, Math.PI / 2, 1); return null; }
  return [x, y];
}
function _gdStrip(ctx, x, y, w, aan, a = 1, zonderKern = false) { // hetzelfde stukje DNA met vijf genen; alleen 'aan' licht op
  ctx.save(); ctx.globalAlpha *= a; const h = Math.max(4, w * 0.12), n = _GD_GEN.length, g = w / n;
  roundRect(ctx, x - w / 2 - 2, y - h / 2 - 2, w + 4, h + 4, h / 2 + 2); shape(ctx, rgba(C.paars, 0.35), rgba(C.paars, 0.9), 1);
  for (let i = 0; i < n; i++) { const on = _GD_GEN[i][0] === aan; roundRect(ctx, x - w / 2 + i * g + 1.5, y - h / 2, g - 3, h, Math.min(3, h / 2)); ctx.fillStyle = on ? _GD.aan : _GD.uit; ctx.fill(); }
  if (zonderKern) { ctx.setLineDash([3, 3]); roundRect(ctx, x - w / 2 - 5, y - h / 2 - 5, w + 10, h + 10, h / 2 + 5); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }

// =====================================================================================
// LIPIDE-NANODEELTJE (mRNA-vaccin). Recept: bolletje van ± 80–100 nm uit vier soorten vet: ioniseerbaar lipide
// (30–50 %), cholesterol (20–50 %), fosfolipide (10–20 %) en PEG-lipide (0,5–2,5 %). Kern (± 55 nm) = mRNA met
// ioniseerbaar lipide, cholesterol en water (omgekeerde micellen); daaromheen één laag lipiden (± 2,4 nm, koppen naar
// buiten), met PEG-ketens als zacht 'haar' (± 4 nm) aan de buitenkant. De spiercel neemt het deeltje op door
// endocytose (membraan stulpt in, blaasje = endosoom); in het zure endosoom krijgt het ioniseerbare lipide een
// positieve lading, het deeltje versmelt met / verstoort het endosoommembraan en het mRNA komt vrij in het
// cytoplasma, waar ribosomen het aflezen. mRNA = dunne, slappe enkele streng (paars). Bron: Du e.a. 2025, RSC
// Pharmaceutical Science 'The rise of mRNA therapeutic vaccines'; OpenStax Biology 2e § 9.1 (membraan, vetoplosbaar).
// Bekende fouten: deeltje als massieve bol zonder lipidenlaag; mRNA als staafje; mRNA dat de kern in gaat; deeltje
// even groot als de cel (het is ± 1/500 van een spiercel: altijd 'vergroot').
// =====================================================================================
// Definitief (Kamiel 28 okt 2026: 'het bolletje van variant B en de ribosomen van variant A'): het deeltje uit B in doorsnede
// (één laag lipiden met kop buiten en twee staarten naar binnen, PEG als zachte ketentjes, binnenin omgekeerde micellen met
// een waterkern, enkele cholesterolstaafjes en de mRNA-streng), maar rustiger: 9 micellen in plaats van 26, 4 cholesterol.
// De route en het vervolg komen uit A: endocytose → endosoom (zuur, H⁺) → het deeltje gaat open en het mRNA komt vrij →
// ribosomen lezen het af, een eiwitketen groeit. Het endosoom is in het echt de plek waar het deeltje versmelt (bron).
// Aanroep: lipideNanodeeltje(ctx, x, y, r, o) — (x, y) = deeltje vrij buiten de cel, r = straal (px); het membraan
// van de spiercel ligt op y + 2,2 r (cel eronder, zacht gebogen). o.f 0..1 (0 vrij · 0,1–0,35 instulpen · 0,35–0,5
// endosoom naar binnen · 0,5–0,75 zuur + ontsnappen · 0,75–1 mRNA vrij + vertaling), o.membraan (true), o.breed
// (halve breedte membraan, standaard 6 r), o.t. Geeft { deeltje, endosoom, mrna, membraan } terug.
// =====================================================================================
const _LN = { kop: '#AFC0D0', vet: '#9C7A3C', kern: '#2E2840', water: '#2E5670', chol: '#E6DCC6', ion: '#C9A35C', rna: '#B3A3E6', peg: '#8FA0B5', endo: '#C9A35C', h: '#E07A5F', ribo: '#C9B896', eiwit: '#C9A35C' };
function _lnDeeltje(ctx, x, y, r, open, t, lw) { // deeltje uit variant B, rustiger; open 0..1 = laag gaat onderaan open (versmelten)
  const w = Math.max(0.6, r * 0.012), dOpen = an => Math.abs(((an - Math.PI / 2) + 9.42) % 6.283 - 3.14) < open * 1.2;
  ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.9, 0, 6.283); ctx.fillStyle = _LN.kern; ctx.fill(); ctx.clip();
  // omgekeerde micellen: waterkern, koppen naar binnen, staartjes naar buiten (9 stuks, ruim verdeeld)
  const nm = 9, mr = r * 0.085, mic = []; for (let i = 0; i < nm; i++) { const an = i * 2.39996 + 0.5, d = Math.sqrt((i + 0.5) / nm) * r * 0.62; mic.push([Math.cos(an) * d, Math.sin(an) * d]); }
  if (r >= 40) mic.forEach(([mx, my], i) => { ctx.beginPath(); ctx.arc(mx, my, mr * 0.7, 0, 6.283); ctx.fillStyle = rgba(_LN.water, 0.85); ctx.fill();
    for (let k = 0; k < 7; k++) { const u = k / 7 * 6.283 + i, ux = Math.cos(u), uy = Math.sin(u); ctx.strokeStyle = rgba(_LN.vet, 0.8); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(mx + ux * mr, my + uy * mr); ctx.lineTo(mx + ux * mr * 1.9, my + uy * mr * 1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(mx + ux * mr * 0.85, my + uy * mr * 0.85, mr * 0.28, 0, 6.283); ctx.fillStyle = k % 3 === 0 ? _LN.ion : _LN.kop; ctx.fill(); } });
  if (r >= 40) for (let i = 0; i < 4; i++) { const an = i * 1.57 + 1.2, d = r * 0.68; ctx.save(); ctx.translate(Math.cos(an) * d, Math.sin(an) * d); ctx.rotate(an + 1.2); roundRect(ctx, -mr * 0.9, -mr * 0.22, mr * 1.8, mr * 0.44, mr * 0.2); shape(ctx, rgba(_LN.chol, 0.75), null); ctx.restore(); } // cholesterol
  // mRNA: één slappe streng die langs de micellen slingert (op kleine schaal: opgerold zonder micellen)
  const route = mic.slice().sort((a2, b2) => Math.atan2(a2[1], a2[0]) - Math.atan2(b2[1], b2[0])).map(([mx, my], i) => [mx * (r >= 40 ? 1 : 0.6) + Math.sin(i * 1.7 + t * 0.3) * r * 0.04, my * (r >= 40 ? 1 : 0.6)]);
  ctx.strokeStyle = _LN.rna; ctx.lineWidth = Math.max(1, r * 0.022); ctx.beginPath(); bioPad(ctx, route, false); ctx.stroke(); // open streng met twee uiteinden
  ctx.restore();
  // buitenlaag: één rij lipiden, kop buiten, twee staarten naar binnen; open = gat aan de onderkant
  const n = Math.max(14, Math.round(r * 0.5)); for (let i = 0; i < n; i++) { const an = i / n * 6.283; if (open > 0 && dOpen(an)) continue;
    const ux = Math.cos(an), uy = Math.sin(an), hx = ux * r, hy = uy * r, kr = Math.max(1, r * 0.04);
    if (r >= 40) { ctx.strokeStyle = _LN.vet; ctx.lineWidth = w * 1.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx - uy * sd * kr * 0.4, hy + ux * sd * kr * 0.4); ctx.lineTo(hx - ux * kr * 3 - uy * sd * kr * 0.35, hy - uy * kr * 3 + ux * sd * kr * 0.35); ctx.stroke(); } }
    else { ctx.strokeStyle = _LN.vet; ctx.lineWidth = Math.max(0.6, r * 0.025); ctx.beginPath(); ctx.moveTo(ux * r * 0.95, uy * r * 0.95); ctx.lineTo(ux * r * 0.8, uy * r * 0.8); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(hx, hy, Math.max(1, r * (r >= 40 ? 0.04 : 0.065)), 0, 6.283); shape(ctx, _LN.kop, lighten(_LN.kop, 0.3), Math.max(0.4, w * 0.6)); }
  // PEG-ketentjes (zacht haar)
  ctx.strokeStyle = rgba(_LN.peg, 0.85); ctx.lineWidth = Math.max(0.6, r * 0.015); for (let i = 0; i < 9; i++) { const u = i / 9 * 6.283 + 0.2; if (open > 0 && dOpen(u)) continue; const ux = Math.cos(u), uy = Math.sin(u), tx = -uy, ty = ux;
    ctx.beginPath(); for (let k = 0; k <= 8; k++) { const d = r * (1.04 + k * 0.035), ww = Math.sin(k * 1.5 + t + i) * r * 0.03; k ? ctx.lineTo(ux * d + tx * ww, uy * d + ty * ww) : ctx.moveTo(ux * d + tx * ww, uy * d + ty * ww); } ctx.stroke(); }
  ctx.restore();
}
function _lnMRNA(ctx, x0, y0, L, an, t, lw, seed) { // dunne, slappe streng met korte basen aan één kant
  const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * 7 + seed + t * 0.6) * L * 0.08 + Math.sin(u * 3 + seed * 2) * L * 0.1; pts.push([x0 + Math.cos(an) * u * L - Math.sin(an) * w, y0 + Math.sin(an) * u * L + Math.cos(an) * w]); }
  ctx.strokeStyle = _LN.rna; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  ctx.lineWidth = lw * 0.6; for (let i = 1; i < pts.length; i += 2) { const p = pts[i], q = pts[i - 1]; const a2 = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + Math.cos(a2) * lw * 2.2, p[1] + Math.sin(a2) * lw * 2.2); ctx.stroke(); }
  return pts;
}
function lipideNanodeeltje(ctx, x, y, r, o = {}) {
  const { a = 1, f = 0, membraan = true, breed = 6 * r, t = 0 } = o; const lw = Math.max(1, r * 0.03);
  const ff = clamp(f, 0, 1), my = y + r * 2.2, Rm = breed * 3;
  const instulp = ease(clamp((ff - 0.1) / 0.25, 0, 1)), los = ease(clamp((ff - 0.35) / 0.15, 0, 1)), zuur = clamp((ff - 0.5) / 0.15, 0, 1), ontsnap = ease(clamp((ff - 0.6) / 0.15, 0, 1)), vrij = ease(clamp((ff - 0.75) / 0.25, 0, 1));
  const ey = lerp(my - r * 1.15, my + r * 2.9, los); const py = ff < 0.1 ? lerp(y, my - r * 1.15, ease(ff / 0.1)) : (ff < 0.35 ? lerp(my - r * 1.15, my + r * 0.1, instulp) : ey + (ff < 0.5 ? lerp(r * 1.25, 0, los) * 0 : 0));
  const ppy = ff < 0.1 ? lerp(y, my - r * 1.15, ease(ff / 0.1)) : ff < 0.35 ? lerp(my - r * 1.15, my + r * 0.15, instulp) : lerp(my + r * 0.15, my + r * 3.0, los);
  const ret = { deeltje: [x, ppy], endosoom: [x, ppy], mrna: [x + r * 1.5, ppy + r * 1.2], membraan: [x - breed * 0.7, my + (breed * 0.7) ** 2 / (2 * Rm)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // celmembraan (dubbellaag, gebogen; cel eronder) met instulping die afsnoert
  if (membraan) { const ms = Math.max(0.25, r / 90); const cx = x, cy = my + Rm; const dip = r * 1.35 * instulp * (1 - los);
    const pad = []; for (let i = 0; i <= 80; i++) { const px = x - breed + 2 * breed * i / 80; const base = my + ((px - x) ** 2) / (2 * Rm); const d = px - x; const w = r * 1.35;
      const g = Math.exp(-(d * d) / (2 * (w * 0.7) ** 2)); pad.push([px, base + dip * 1.4 * g]); }
    // dubbellaag als twee lijnen met koppen (vereenvoudigd membraanBoog langs het pad)
    for (const off of [-r * 0.12, r * 0.12]) { ctx.strokeStyle = rgba(_LN.kop, 0.9); ctx.lineWidth = Math.max(1, r * 0.06); ctx.setLineDash([Math.max(1.5, r * 0.07), Math.max(1, r * 0.04)]); ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] + off) : ctx.moveTo(p[0], p[1] + off)); ctx.stroke(); }
    ctx.setLineDash([]); ctx.strokeStyle = rgba(_LN.vet, 0.7); ctx.lineWidth = Math.max(1, r * 0.12); ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.globalAlpha *= 1; }
  // endosoom (blaasje van celmembraan) om het deeltje
  const endoA = ff >= 0.3 ? clamp((ff - 0.3) / 0.08, 0, 1) * (1 - ontsnap * 0.6) : 0; const er = r * 1.3;
  if (endoA > 0.01) { ctx.save(); ctx.globalAlpha *= endoA; const gat = ontsnap * 1.1; ctx.beginPath(); ctx.arc(x, ppy, er, Math.PI / 2 + gat, Math.PI / 2 + 6.283 - gat); ctx.strokeStyle = rgba(_LN.kop, 0.9); ctx.lineWidth = Math.max(1.5, r * 0.16); ctx.stroke(); ctx.strokeStyle = rgba(_LN.vet, 0.8); ctx.lineWidth = Math.max(0.8, r * 0.06); ctx.stroke();
    for (let i = 0; i < 6; i++) { const z = zuur * (i < 6 ? 1 : 0); if (z < 0.05) continue; const an = i * 1.05 + 0.4; const hx = x + Math.cos(an) * er * 0.92, hy = ppy + Math.sin(an) * er * 0.92; ctx.save(); ctx.globalAlpha *= z; text(ctx, 'H⁺', hx, hy + r * 0.12, `600 ${Math.max(9, r * 0.32)}px "Source Sans 3",system-ui`, _LN.h, 'center'); ctx.restore(); } ctx.restore(); }
  // deeltje (gaat open en verdwijnt als het versmolten is)
  if (ontsnap < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - ontsnap * 0.85; _lnDeeltje(ctx, x, ppy, r * (1 - 0.15 * ontsnap), ontsnap * 0.8, t, lw); ctx.restore(); }
  // mRNA vrij in het cytoplasma; ribosomen lezen af, eiwitketen groeit
  if (ontsnap > 0.01) { const L = r * lerp(0.8, 3.0, vrij); const strands = [[x + r * 0.2, ppy + r * 0.6, 0.55, 1], [x - r * 0.3, ppy + r * 0.6, 2.4, 3]];
    strands.forEach(([sx, sy, an, sd], k) => { ctx.save(); ctx.globalAlpha *= ontsnap; const pts = _lnMRNA(ctx, sx, sy, L, an, t, Math.max(1, r * 0.06), sd);
      if (vrij > 0.3) { const p = pts[Math.round(pts.length * 0.55)]; ctx.save(); ctx.globalAlpha *= clamp((vrij - 0.3) / 0.3, 0, 1); ctx.beginPath(); ctx.ellipse(p[0], p[1] - r * 0.14, r * 0.26, r * 0.18, an, 0, 6.283); shape(ctx, _LN.ribo, lighten(_LN.ribo, 0.3), lw); ctx.beginPath(); ctx.ellipse(p[0], p[1] + r * 0.06, r * 0.2, r * 0.13, an, 0, 6.283); shape(ctx, lighten(_LN.ribo, -0.1), lighten(_LN.ribo, 0.3), lw);
        const nb = Math.round(clamp((vrij - 0.5) / 0.5, 0, 1) * 7); for (let b = 0; b < nb; b++) { ctx.beginPath(); ctx.arc(p[0] - Math.sin(an) * 0 + Math.cos(an + 1.9) * r * (0.35 + b * 0.16) + Math.sin(b * 1.7) * r * 0.06, p[1] - r * 0.3 + Math.sin(an + 1.9) * r * (0.35 + b * 0.16) * 0.2 - b * r * 0.12, r * 0.075, 0, 6.283); shape(ctx, _LN.eiwit, lighten(_LN.eiwit, 0.4), Math.max(0.5, lw * 0.6)); } ctx.restore(); }
      if (k === 0) ret.mrna = pts[pts.length - 1]; ctx.restore(); }); }
  ctx.restore(); return ret;
}

// =====================================================================================
// MEMBRAANRECEPTOR als kralenketen, G-eiwitgekoppeld (ronde 2, variant C; plus intracellulaire receptor).
// Eén doorlopende kralenketen: bindend deel buiten (twee lobben met de pasvorm), dan zeven keer door het membraan
// (zeven α-helices, lussen afwisselend buiten en binnen), staart binnen; eronder het G-eiwit (α, β, γ) dat bij het
// signaal GDP voor GTP wisselt en waarvan de α-eenheid loslaat (uit variant A).
// Recept: drie delen: een bindend deel buiten de cel, een vetminnend stuk dat door het membraan gaat (hier zeven α-helices
// van elk ± 20 aminozuren ≈ 4 nm = de dikte van het membraan) en een deel binnen de cel dat het signaal doorgeeft. Het
// bindende deel is een opgevouwen keten met twee lobben en een zak met precies de vorm van het signaalmolecuul
// (pasvorm, 'sleutel en slot'); binden laat de lobben sluiten (vormverandering), aan de binnenkant wordt het G-eiwit actief
// (GDP → GTP, α laat los) = signaal binnen. Een klein vetoplosbaar hormoon (steroïd) gaat zelf door het membraan en
// bindt een receptor in het cytoplasma; het complex gaat de kern in en bindt het DNA. Membraan gebogen, dubbellaag.
// Bron: OpenStax Biology 2e § 9.1. Bekende fouten: receptor als schoteltje op een rechte lijn; een ligand dat niet past;
// receptor die niet door het membraan gaat; eiwit als bol.
// Rustiger (Kamiel 28 okt 2026, 'balans tussen details en helderheid'): minder kralen per keten (afstand 2,4–2,6 r), de
// membraanhelices golven zachter, de β-propeller zonder spaken. Zeven doorgangen, lobben en G-eiwit blijven.
// Aanroep: membraanReceptor(ctx, x, y, s, o) — (x, y) = midden van het membraan bij de receptor, s = 1 → ± 180 px
// hoog. o.ang (richting naar buiten, standaard −π/2), o.R, o.membraan, o.breed, o.bind 0..1, o.signaal 0..1, o.ligCol,
// o.vorm = 'rond' | 'drie' | 'vier' (pasvorm), o.soort = 'oppervlak' | 'intern' (o.f, o.kern), o.t.
// Geeft { ligand, binnen, buiten, gAlfa } terug (gAlfa = actief binnendeel).
// =====================================================================================
function _mrbKralen(ctx, pts, r, col, lw, stap = 1.9) { const P = bioDicht(pts, 12); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba(lighten(col, 0.3), 0.6); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  k.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.2)); }); return k; }
function _mrbLigand(ctx, vorm, w, col) { ctx.beginPath();
  if (vorm === 'drie') { ctx.moveTo(0, w * 0.6); ctx.lineTo(-w * 0.55, -w * 0.4); ctx.lineTo(w * 0.55, -w * 0.4); ctx.closePath(); }
  else if (vorm === 'vier') { roundRect(ctx, -w * 0.45, -w * 0.45, w * 0.9, w * 0.9, w * 0.12); }
  else ctx.arc(0, 0, w * 0.48, 0, 6.283);
  shape(ctx, col, lighten(col, 0.4), Math.max(1, w * 0.08)); }
function membraanReceptor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = -Math.PI / 2, R = 900 * s, membraan = true, breed = 170 * s, bind = 0, signaal = 0, ligCol = C.paars, vorm = 'drie', soort = 'oppervlak', t = 0 } = o;
  const rot = ang + Math.PI / 2; const cr = Math.cos(rot), sr = Math.sin(rot); const P = (px, py) => [x + px * cr - py * sr, y + px * sr + py * cr];
  const ret = { ligand: P(0, -88 * s), binnen: P(0, 60 * s), buiten: P(0, -70 * s), gAlfa: P(0, 62 * s) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a;
  const ms = 0.55 * s, half = (26.4 + 2 + 6) * ms;
  const gat = soort === 'intern' ? 0 : 62 * s;
  if (membraan) { const cx = x - Math.cos(ang) * R, cy = y - Math.sin(ang) * R; const da = breed / R, dg = gat / R;
    if (gat) { membraanBoog(ctx, cx, cy, R, ang - da, ang - dg, { s: ms }); membraanBoog(ctx, cx, cy, R, ang + dg, ang + da, { s: ms }); }
    else membraanBoog(ctx, cx, cy, R, ang - da, ang + da, { s: ms }); }
  ctx.translate(x, y); ctx.rotate(rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'intern') { const r2 = _mrIntern(ctx, 0, 0, s, o); ctx.restore(); return Object.assign(ret, { binnen: P(r2.receptor[0], r2.receptor[1]) }); }
  const b = ease(clamp(bind, 0, 1)), sig = ease(clamp(signaal, 0, 1)); const r = Math.max(1.2, 3.6 * s), lw = Math.max(0.8, 1.8 * s);
  const col = '#7FA7C9', colB = '#6E93B8', kin = '#8FA6C4';
  const top = -half - 6 * s;
  // zeven α-helices door het membraan als één doorlopende keten (helix 1 omlaag, 2 omhoog, …), lussen buiten en binnen
  const gap = 17 * s, tm = []; for (let i = 0; i < 7; i++) { let x0 = (i - 3) * gap; let tilt = 0; if (i === 4 || i === 5) { tilt = (i === 5 ? 0.3 : 0.15) * sig; }
    const dn = i % 2 === 0; const y0 = dn ? top : half + 6 * s, y1 = dn ? half + 6 * s : top; const seg = [];
    for (let k = 0; k <= 16; k++) { const u = k / 16; const yy = lerp(y0, y1, u); const dx = Math.sin(u * 6.283 * 2.5) * 2.2 * s + (yy - top) * Math.tan(tilt) * 0.6; seg.push([x0 + dx, yy]); }
    tm.push(seg); }
  const keten = [[0, top - 6 * s], [-2 * gap, top - 10 * s]]; tm.forEach((seg, i) => { seg.forEach(p => keten.push(p)); if (i < 6) { const e2 = seg[seg.length - 1], nx = tm[i + 1][0]; const buiten = i % 2 === 1; const dy = (buiten ? -1 : 1) * (buiten ? 12 : 10) * s * (i === 3 ? 1.5 : 1); keten.push([(e2[0] + nx[0]) / 2, e2[1] + dy]); } });
  { const e2 = tm[6][16]; keten.push([e2[0] + 8 * s, e2[1] + 16 * s], [e2[0] + 26 * s, e2[1] + 20 * s], [e2[0] + 36 * s, e2[1] + 34 * s]); } // staart binnen
  // buitendeel: twee lobben die een zak vormen; bij binden draaien ze naar binnen (sluiten)
  const lob = (sd) => { const sl = -sd * 0.2 * b; const pts = [[0, top], [sd * 10, top - 8 * s / s * s], [sd * 30 * s, top - 18 * s], [sd * 44 * s, top - 40 * s], [sd * 42 * s, top - 66 * s], [sd * 28 * s, top - 84 * s], [sd * 14 * s, top - 80 * s], [sd * 22 * s, top - 62 * s], [sd * 30 * s, top - 46 * s], [sd * 18 * s, top - 36 * s], [sd * 8 * s, top - 50 * s]];
    pts[1] = [sd * 10 * s, top - 8 * s];
    return pts.map(([px, py]) => { const dx = px, dy = py - top; return [dx * Math.cos(sl) - dy * Math.sin(sl), top + dx * Math.sin(sl) + dy * Math.cos(sl)]; }); };
  _mrbKralen(ctx, keten, r * 0.6, colB, lw * 0.9, 2.6); // rustiger: minder kralen, de lijn ertussen draagt de keten
  _mrbKralen(ctx, lob(-1), r * 0.9, col, lw, 2.4); _mrbKralen(ctx, lob(1), r * 0.9, col, lw, 2.4);
  const kr = () => 0;
  // G-eiwit onder de receptor: α (met GDP/GTP), β en γ; α laat los bij signaal
  const gy = half + 44 * s;
  const sep = clamp((sig - 0.35) / 0.65, 0, 1);
  { const bx = -24 * s, by = gy + 6 * s, br = 17 * s; const pts = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283; const rr = br * (1 + 0.1 * Math.sin(u * 4 + 1) + 0.05 * Math.sin(u * 7)); pts.push([bx + Math.cos(u) * rr, by + Math.sin(u) * rr]); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, '#7E8CA4', lighten('#7E8CA4', 0.3), Math.max(1, 1.5 * s)); // β: zevenbladig propeller, hier als gevouwen keten met bladen
    } // β (rustig: alleen de omtrek)
  ctx.save(); ctx.strokeStyle = '#A9B5C8'; ctx.lineWidth = Math.max(1.5, 5 * s); ctx.beginPath(); ctx.moveTo(-42 * s, gy - 10 * s); ctx.quadraticCurveTo(-34 * s, gy - 24 * s, -22 * s, gy - 22 * s); ctx.stroke(); ctx.restore(); // γ met vetanker richting membraan
  const ax = lerp(16 * s, 58 * s, ease(sep)), ay = lerp(gy, gy + 46 * s, ease(sep)); const lit = sig > 0.3 ? clamp((sig - 0.3) / 0.3, 0, 1) : 0;
  enzymKluwen(ctx, ax, ay, 19 * s, { col: lit > 0 ? (lit > 0.5 ? '#9FB0C8' : '#8C9AB0') : '#8C9AB0', an: -0.6 + sep * 0.8, seed: 5 });
  if (lit > 0.01) { ctx.save(); ctx.globalAlpha *= lit; ctx.beginPath(); ctx.arc(ax, ay, 25 * s, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.stroke(); ctx.restore(); }
  // GDP (2 fosfaten) → GTP (3 fosfaten), koraal = energiedrager
  { const n = sig > 0.25 ? 3 : 2; ctx.save(); ctx.translate(ax + 2 * s, ay + 4 * s); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(i * 6.5 * s, 0, 3 * s, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), Math.max(0.6, s)); } ctx.restore(); }
  // zak (pasvorm) zichtbaar als rand + ligand
  const zy = top - 58 * s; ctx.save(); ctx.translate(0, zy + 4 * s); ctx.globalAlpha *= 0.55 * (1 - b); ctx.setLineDash([3 * s, 3 * s]); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1, 1.5 * s);
  ctx.beginPath(); if (vorm === 'drie') { ctx.moveTo(0, 14 * s); ctx.lineTo(-13 * s, -10 * s); ctx.lineTo(13 * s, -10 * s); ctx.closePath(); } else if (vorm === 'vier') roundRect(ctx, -11 * s, -11 * s, 22 * s, 22 * s, 3 * s); else ctx.arc(0, 0, 12 * s, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  if (bind > 0.001) { ctx.save(); ctx.globalAlpha *= Math.min(1, bind * 3); ctx.translate(lerp(-30 * s, 0, b), lerp(zy - 80 * s, zy + 4 * s, b)); ctx.rotate(lerp(0.9, 0, b)); _mrbLigand(ctx, vorm, 24 * s, ligCol); ctx.restore(); }
  ret.ligand = P(0, zy);
  ctx.restore(); return ret;
}
// --- intracellulaire receptor (steroïdhormoon): ligand gaat door het membraan, bindt de receptor in het cytoplasma,
// het complex gaat de kern in en bindt het DNA. f: 0–0,3 door het membraan · 0,3–0,5 binden · 0,5–1 naar de kern.
function _mrSteroid(ctx, x, y, w, col, an = 0) { // vier gekoppelde ringen (3 zeshoeken + vijfhoek), herkenbaar als steroïd
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const r = w / 4.6; const C6 = [[-1.73 * r, 0.5 * r], [0, -0.5 * r], [1.73 * r, 0.5 * r]];
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let i = 0; i < n; i++) { const a2 = -Math.PI / 2 + i * 6.283 / n + (n === 6 ? Math.PI / 6 : 0); const px = cx + Math.cos(a2) * rr, py = cy + Math.sin(a2) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.85), lighten(col, 0.4), Math.max(1, r * 0.18)); };
  C6.forEach(p => ring(p[0], p[1], 6, r)); ring(3.25 * r, -0.2 * r, 5, r * 0.88); ctx.restore();
}
function _mrIntern(ctx, x, y, s, o) {
  const { f = 0, ligCol = C.paars, kern = [0, 260], recCol = C.enzym, t = 0 } = o;
  const kx = kern[0] * s, ky = kern[1] * s; // kernrand (lokaal), membraan op y = 0, cytoplasma bij +y
  const lig = f < 0.3 ? [lerp(-30, 10, f / 0.3) * s, lerp(-70, 60, ease(f / 0.3)) * s] : null;
  const recStart = [40 * s, 120 * s]; const mv = ease(clamp((f - 0.5) / 0.5, 0, 1));
  const rp = [lerp(recStart[0], kx, mv), lerp(recStart[1], ky - 26 * s, mv)];
  // receptor: gevouwen keten met een DNA-bindend deel (twee 'vingers') en een hormoonzak
  ctx.save(); ctx.translate(rp[0], rp[1]); const b = clamp((f - 0.3) / 0.2, 0, 1);
  enzymKluwen(ctx, 0, 0, 24 * s, { col: recCol, an: -Math.PI / 2, sluit: b, seed: 7 });
  ctx.strokeStyle = lighten(recCol, 0.3); ctx.lineWidth = Math.max(1.5, 4 * s); ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 8 * s, 20 * s); ctx.quadraticCurveTo(sd * 14 * s, 32 * s, sd * 6 * s, 40 * s + b * 4 * s); ctx.stroke(); }
  if (b > 0.01) _mrSteroid(ctx, 0, -20 * s + (1 - b) * -30 * s, 22 * s, ligCol);
  ctx.restore();
  if (lig) _mrSteroid(ctx, lig[0], lig[1], 22 * s, ligCol, 0.4);
  return { receptor: [rp[0], rp[1]] };
}

// =====================================================================================
// STAMCELDELING. Recept: een stamcel is ongespecialiseerd (geen weefseleigen onderdelen; ronde cel, grote kern,
// weinig organellen) en kan zich lang blijven delen. Bij een deling blijft één dochtercel stamcel (zelfvernieuwing) en
// gaat de andere zich specialiseren (differentiëren), meestal in stappen. Volwassen stamcellen maken de celtypen van
// hun eigen weefsel (bloedstamcel in het beenmerg → bloedcellen); embryonale stamcellen kunnen alle celtypen worden.
// Rode bloedcel als voorbeeld: de voorlopercel wordt kleiner, het cytoplasma kleurt rood door hemoglobine, de kern
// krimpt en wordt uitgestoten; over blijft een ingedeukte schijf van 7–8 µm zonder kern. Deling: chromosomen in het
// midden, insnoering, twee dochtercellen even groot. Bron: Klymkowsky & Cooper, Biofundamentals 10.5; NIH Stem Cell
// Basics (archief). Bekende fouten: beide dochters specialiseren; rode bloedcel met kern; stamcel die al een celtype is.
// =====================================================================================
// Stijl B: stappenschema — de stamcel deelt (twee dochters naast elkaar); een boog terug naar de stamcel laat zien dat
// één dochter stamcel blijft; de andere doorloopt de stappen voorlopercel → erytroblast (rood, kern krimpt) →
// reticulocyt (kern uitgestoten) → rode bloedcel. o.f onthult de stappen één voor één; de actieve stap krijgt een
// gouden ring. Aanroep: stamcelDeling(ctx, x, y, r, o) — (x, y) = midden van de stamcel (links), r = straal; het schema
// is ± 8,5 r breed. o.f 0..1, o.soort = 'volwassen' | 'embryonaal' (na de voorlopercel drie mogelijke celtypen), o.t.
// Geeft { stam, dochter, stappen: [[x,y], …] } terug.
// =====================================================================================
const _SCB = { cyto: '#33405A', rand: '#B8C8DC', kern: '#6E5A9E', kernR: '#A392D6' };
function _scbCel(ctx, x, y, r, rood, kernF, lw, mito = true) { // rood 0..1 = hemoglobine, kernF = kerngrootte (0 = geen)
  const fill = `rgb(${Math.round(lerp(51, 194, rood))},${Math.round(lerp(64, 69, rood))},${Math.round(lerp(90, 62, rood))})`;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, fill, rood > 0.5 ? lighten(BIO.bloed, 0.3) : _SCB.rand, lw);
  if (mito && rood < 0.5) for (const [an, d] of [[2.4, 0.68], [0.5, 0.7]]) { ctx.save(); ctx.translate(x + Math.cos(an) * r * d, y + Math.sin(an) * r * d); ctx.rotate(an + 1.4); roundRect(ctx, -r * 0.14, -r * 0.055, r * 0.28, r * 0.11, r * 0.055); shape(ctx, C.mito, C.mitoR, Math.max(0.6, lw * 0.6)); ctx.restore(); }
  if (kernF > 0) { ctx.beginPath(); ctx.arc(x + r * 0.05, y - r * 0.05, r * kernF, 0, 6.283); shape(ctx, kernF < 0.35 ? '#4E3E7A' : _SCB.kern, _SCB.kernR, lw); } }
function _scbPijl(ctx, x0, y0, x1, y1, lw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.85); ctx.fillStyle = rgba(C.line, 0.85); ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  const an = Math.atan2(y1 - y0, x1 - x0), h = lw * 4.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(an - 0.45) * h, y1 - Math.sin(an - 0.45) * h); ctx.lineTo(x1 - Math.cos(an + 0.45) * h, y1 - Math.sin(an + 0.45) * h); ctx.closePath(); ctx.fill(); ctx.restore(); }
function stamcelDeling(ctx, x, y, r, o = {}) {
  const { a = 1, f = 1, soort = 'volwassen', t = 0 } = o; const lw = Math.max(1, r * 0.03), plw = Math.max(1.2, r * 0.035);
  const ff = clamp(f, 0, 1); const stap = ff * 5; const zicht = i => ease(clamp(stap - i + 1, 0, 1)); // i = 1..5
  const X = [x, x + r * 1.9, x + r * 4.3, x + r * 6.3, x + r * 8.1]; const Y = y + r * 2.2;
  const ret = { stam: [x, y], dochter: [X[1], Y], stappen: X.map((xx, i) => [xx, i ? Y : y]) };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const actief = Math.min(4, Math.floor(stap));
  const ring = (px, py, rr, i) => { if (i !== actief) return; ctx.beginPath(); ctx.arc(px, py, rr * 1.22, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke(); };
  // stamcel
  _scbCel(ctx, x, y, r, 0, 0.5, lw); ring(x, y, r, 0);
  // deling: twee dochters onder de stamcel; links = nieuwe stamcel met boog terug, rechts = gaat specialiseren
  const z1 = zicht(1); if (z1 > 0.01) { ctx.save(); ctx.globalAlpha *= z1; const lx = x - r * 0.15, rx2 = X[1];
    const dX = x - r * 0.75; _scbPijl(ctx, x - r * 0.35, y + r * 1.05, dX + r * 0.05, Y - r * 0.9, plw); _scbPijl(ctx, x + r * 0.55, y + r * 0.95, rx2 - r * 0.7, Y - r * 0.7, plw);
    _scbCel(ctx, dX, Y, r * 0.82, 0, 0.5, lw); ret.stam = [dX, Y];
    // groene boog: deze dochter is weer een stamcel
    ctx.strokeStyle = rgba(C.groen, 0.85); ctx.lineWidth = plw; ctx.beginPath(); ctx.moveTo(dX - r * 0.88, Y - r * 0.1); ctx.bezierCurveTo(x - r * 2.5, Y - r * 0.6, x - r * 2.3, y - r * 0.2, x - r * 1.22, y); ctx.stroke();
    _scbPijl(ctx, x - r * 1.6, y + r * 0.08, x - r * 1.1, y - r * 0.02, plw * 0.9, 1); ctx.restore(); }
  const stappen = soort === 'embryonaal' ? [[0, 0.48, 0.9]] : [[0, 0.48, 0.92], [0.85, 0.3, 0.8], [1, 0, 0.66], [1, -1, 0.56]];
  // voorlopercel
  if (z1 > 0.01) { ctx.save(); ctx.globalAlpha *= z1; _scbCel(ctx, X[1], Y, r * 0.9, 0, 0.48, lw); ring(X[1], Y, r * 0.9, 1); ctx.restore(); }
  if (soort === 'embryonaal') { const z = zicht(2); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z;
      [[-1.1, 'zenuw'], [0, 'spier'], [1.1, 'bloed']].forEach(([dy, tp]) => { const px = X[2] + r * 0.6, py = Y + dy * r * 1.4; _scbPijl(ctx, X[1] + r * 1.0, Y + dy * r * 0.5, px - r * 0.9, py, plw);
        if (tp === 'zenuw') zenuwcel(ctx, px, py, { s: r / 130, naar: [px + r * 3, py], takken: 4, seed: 2 }); else if (tp === 'spier') spierVezel(ctx, px - r * 0.4, py, r * 2.2, r * 0.5, { streep: Math.max(4, r * 0.09) }); else rodeBloedcel(ctx, px + r * 0.3, py, r * 0.42, 0.3, 0); });
      ctx.restore(); } ctx.restore(); return ret; }
  // erytroblast → reticulocyt (+ uitgestoten kern) → rode bloedcel
  for (let i = 2; i <= 4; i++) { const z = zicht(i); if (z < 0.01) continue; ctx.save(); ctx.globalAlpha *= z; const [rood, kf, rr] = stappen[i - 1]; const R2 = r * rr;
    _scbPijl(ctx, X[i - 1] + r * (i === 2 ? 1.05 : stappen[i - 2][2] + 0.15), Y, X[i] - R2 - r * 0.15, Y, plw);
    if (i === 4) rodeBloedcel(ctx, X[i], Y, R2, 0, 0); else _scbCel(ctx, X[i], Y, R2, rood, Math.max(0, kf), lw, false);
    if (i === 3) { const kx = X[i] + R2 * 0.75, ky = Y - R2 * 1.15; ctx.beginPath(); ctx.arc(kx, ky, R2 * 0.36, 0, 6.283); shape(ctx, rgba('#3A3448', 0.85), rgba(_SCB.rand, 0.8), lw); ctx.beginPath(); ctx.arc(kx, ky, R2 * 0.24, 0, 6.283); shape(ctx, '#4E3E7A', _SCB.kernR, lw); }
    ring(X[i], Y, R2, i); ctx.restore(); }
  ctx.restore(); return ret;
}

// =====================================================================================
// TUMORGROEI en APOPTOSE. Recept: kanker begint met één cel waarin mutaties de rem op de celcyclus uitschakelen
// (tumorsuppressorgenen zoals p53) of het gaspedaal vastzetten (oncogenen); die cel deelt ongeremd en zijn
// nakomelingen vormen een kluwen (tumor) tussen de gewone weefselcellen. Tumorcellen: onregelmatig van vorm en maat,
// grote donkere kernen, veel cellen in deling, ze stapelen op en drukken de buren weg; een kwaadaardige tumor breekt
// door het basaalmembraan (invasie). Gewone cellen: even groot, netjes in één laag, regelmatige kern. Apoptose als
// tegenhanger (p53 laat een beschadigde cel zichzelf opruimen): de cel krimpt, de kern wordt klein en donker en valt in
// stukjes, het membraan vormt blaasjes (blebs) en de cel valt uiteen in ingepakte stukjes die worden opgeruimd; geen
// lekkende inhoud. Bron: OpenStax Biology AP Courses § 10.4; Klymkowsky & Cooper, Biofundamentals 10.5.
// Bekende fouten: tumor als één grote rode bol; tumorcellen die er net zo uitzien als gewone cellen; apoptose als een
// cel die ontploft.
// =====================================================================================
// Stijl A: zijaanzicht van een dekweefsel (één laag cilindrische cellen op een licht gebogen basaalmembraan, haarvat
// eronder). Met o.g groeit uit één cel een opstapelende kluwen; vanaf o.g > 0,75 breekt hij door het basaalmembraan.
// Aanroep: tumorGroei(ctx, x, y, s, o) — (x, y) = midden van het basaalmembraan, s = 1 → ± 600 × 380 px. o.g 0..1,
// o.apoptose 0..1 (cel links in de rij), o.t. Geeft { tumor, apoptose, membraan } terug.
// =====================================================================================
const _TG = { cel: '#3A4A66', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', tum: '#7A4E6E', tumR: '#D9A0C0', tumK: '#4E3A7A', bm: '#C9B896' };
function _tgBlob(ctx, x, y, rx, ry, seed, fill, rand, lw, wob = 0.12) { const p = []; for (let i = 0; i < 14; i++) { const u = i / 14 * 6.283; const k = 1 + wob * (hash(seed + i) - 0.5) * 2; p.push([x + Math.cos(u) * rx * k, y + Math.sin(u) * ry * k]); } ctx.beginPath(); bioPad(ctx, p, true); shape(ctx, fill, rand, lw); }
function _tgDeling(ctx, x, y, r, lw) { ctx.strokeStyle = '#2E2050'; ctx.lineWidth = Math.max(1.2, r * 0.14); ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const yy = y + (k - 1) * r * 0.32; ctx.beginPath(); ctx.moveTo(x - r * 0.2, yy - r * 0.12); ctx.lineTo(x + r * 0.2, yy + r * 0.12); ctx.moveTo(x + r * 0.2, yy - r * 0.12); ctx.lineTo(x - r * 0.2, yy + r * 0.12); ctx.stroke(); } }
function _tgApoptose(ctx, x, y, w, h, ap, lw) { // cel (breedte w, hoogte h, basis op y) die zichzelf opruimt
  const k = ease(clamp(ap / 0.3, 0, 1)), bleb = clamp((ap - 0.3) / 0.4, 0, 1), uit = ease(clamp((ap - 0.7) / 0.3, 0, 1));
  const cx = x, cy = y - h / 2, sw = w * lerp(1, 0.62, k), sh = h * lerp(1, 0.55, k);
  if (uit < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - uit; _tgBlob(ctx, cx, cy + h * 0.15 * k, sw / 2, sh / 2, 71, _TG.cel, _TG.rand, lw, 0.06);
    for (let i = 0; i < 7; i++) { const u = i / 7 * 6.283 + 0.4, b = bleb * (0.6 + 0.4 * hash(i * 3)); if (b < 0.05) continue; ctx.beginPath(); ctx.arc(cx + Math.cos(u) * sw * 0.5, cy + h * 0.15 * k + Math.sin(u) * sh * 0.5, w * 0.12 * b, 0, 6.283); shape(ctx, _TG.cel, _TG.rand, lw); }
    const kr = w * lerp(0.26, 0.16, k); if (ap < 0.45) { ctx.beginPath(); ctx.arc(cx, cy + h * 0.15 * k, kr, 0, 6.283); shape(ctx, ap > 0.2 ? '#3E2E66' : _TG.kern, _TG.kernR, lw); }
    else for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(cx + (i - 1.5) * kr * 0.7, cy + h * 0.15 * k + (i % 2 ? 1 : -1) * kr * 0.4, kr * 0.4, 0, 6.283); shape(ctx, '#3E2E66', _TG.kernR, lw); }
    ctx.restore(); }
  if (uit > 0.001) { ctx.save(); ctx.globalAlpha *= uit; for (let i = 0; i < 5; i++) { const px = cx + (hash(i * 7) - 0.5) * w * 1.1, py = cy + h * 0.25 + (hash(i * 5 + 2) - 0.5) * h * 0.5 - uit * h * 0.15 * hash(i); const rr = w * (0.14 + 0.08 * hash(i * 2)); ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); shape(ctx, _TG.cel, _TG.rand, lw); if (i % 2 === 0) { ctx.beginPath(); ctx.arc(px, py, rr * 0.45, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); } } ctx.restore(); }
  return [cx, cy];
}
function tumorGroei(ctx, x, y, s = 1, o = {}) {
  const { a = 1, g = 0, apoptose = 0, t = 0 } = o; const lw = Math.max(1, 1.3 * s);
  const N = 13, W = 600 * s, cw = W / N, ch = 120 * s, Rb = 2600 * s; // basaalmembraan: flauwe boog
  const by = px => y + ((px - x) ** 2) / (2 * Rb);
  const gg = clamp(g, 0, 1), n = gg > 0 ? 1 + Math.round(gg * 34) : 0, mid = 7, inval = ease(clamp((gg - 0.75) / 0.25, 0, 1));
  const tumX = x + (mid - N / 2 + 0.5) * cw;
  const ret = { tumor: [tumX, y - ch * 1.2], apoptose: [x + (2 - N / 2 + 0.5) * cw, y - ch / 2], membraan: [x - W * 0.35, by(x - W * 0.35) + 8 * s] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // lederhuid/bindweefsel met een haarvat onder het membraan
  ctx.beginPath(); ctx.moveTo(x - W / 2, by(x - W / 2)); for (let i = 1; i <= 20; i++) { const px = x - W / 2 + W * i / 20; ctx.lineTo(px, by(px)); } ctx.lineTo(x + W / 2, y + 150 * s); ctx.lineTo(x - W / 2, y + 150 * s); ctx.closePath(); ctx.fillStyle = rgba('#3A3040', 0.5); ctx.fill();
  ctx.strokeStyle = rgba('#C9A890', 0.3); ctx.lineWidth = Math.max(0.8, s); for (let i = 0; i < 9; i++) { const yy = y + (40 + i * 12) * s; ctx.beginPath(); ctx.moveTo(x - W / 2, yy + 10 * s * Math.sin(i)); ctx.bezierCurveTo(x - W / 6, yy - 12 * s, x + W / 6, yy + 14 * s, x + W / 2, yy - 6 * s); ctx.stroke(); }
  bloedvat(ctx, [[x - W / 2, y + 105 * s], [x - W / 6, y + 95 * s], [x + W / 5, y + 112 * s], [x + W / 2, y + 100 * s]], 13 * s, t, { n: 7, cel: 9 * s });
  // basaalmembraan (gaat open waar de tumor doorbreekt)
  ctx.strokeStyle = _TG.bm; ctx.lineWidth = Math.max(1.5, 3 * s); const gap0 = tumX - cw * 0.9 * inval, gap1 = tumX + cw * 0.9 * inval;
  for (const [p0, p1] of (inval > 0.02 ? [[x - W / 2, gap0], [gap1, x + W / 2]] : [[x - W / 2, x + W / 2]])) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const px = lerp(p0, p1, i / 30); i ? ctx.lineTo(px, by(px) + 2 * s) : ctx.moveTo(px, by(px) + 2 * s); } ctx.stroke(); }
  // gewone cellen: cilindrisch, één laag, kern onderin
  for (let i = 0; i < N; i++) { const cx = x + (i - N / 2 + 0.5) * cw; const b0 = by(cx); if (i === mid && n > 0) continue;
    const push = n > 0 ? Math.max(0, 1 - Math.abs(cx - tumX) / (cw * 2.4)) * Math.min(1, n / 10) : 0; const sx = Math.sign(cx - tumX) * push * cw * 0.18;
    if (i === 2 && apoptose > 0.001) { _tgApoptose(ctx, cx, b0, cw * 0.92, ch, apoptose, lw); continue; }
    const pts = [[cx - cw / 2 + 1.5 * s + sx, b0], [cx + cw / 2 - 1.5 * s + sx, b0], [cx + cw / 2 - 2 * s + sx * 1.3, b0 - ch * (1 - push * 0.15)], [cx - cw / 2 + 2 * s + sx * 1.3, b0 - ch * (1 - push * 0.15)]];
    ctx.beginPath(); ctx.moveTo((pts[0][0] + pts[1][0]) / 2, pts[0][1]); for (let k = 1; k <= 4; k++) { const p = pts[k % 4], q = pts[(k + 1) % 4]; ctx.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, cw * 0.22); } ctx.closePath(); shape(ctx, _TG.cel, _TG.rand, lw);
    ctx.beginPath(); ctx.ellipse(cx + sx * 1.1, b0 - ch * 0.3, cw * 0.24, ch * 0.13, 0, 0, 6.283); shape(ctx, _TG.kern, _TG.kernR, lw); }
  // tumor: kluwen die vanaf de plek van de gemuteerde cel opstapelt (koepel) en bij invasie onder het membraan door gaat
  if (n > 0) { const cells = []; const sp = cw * 0.8; const nb = Math.round(n * 0.18 * inval);
    for (let r = 0; r < 14 && cells.length < n + 60; r++) for (let c = -10; c <= 10; c++) { const px = tumX + (c + (r % 2) * 0.5) * sp, py = by(tumX) - sp * 0.55 - r * sp * 0.82; cells.push([px, py, Math.hypot((px - tumX) / 1.15, (py - by(tumX)) * 1.0)]); }
    cells.sort((A2, B2) => A2[2] - B2[2]); const top = cells.slice(0, n - nb);
    for (let i = 0; i < nb; i++) top.push([tumX + (i - nb / 2 + 0.5) * sp * 0.9, by(tumX) + sp * (0.6 + 0.3 * (i % 2)), 0]);
    top.forEach(([px, py], i) => { const jx = (hash(i * 3.3) - 0.5) * sp * 0.25, jy = (hash(i * 5.1) - 0.5) * sp * 0.2, rr = sp * (0.5 + 0.18 * hash(i * 2.2));
      _tgBlob(ctx, px + jx, py + jy, rr * (0.95 + 0.25 * hash(i)), rr * (0.85 + 0.2 * hash(i + 9)), i * 7 + 3, _TG.tum, _TG.tumR, lw, 0.18);
      if (hash(i * 9.7) < 0.22 && rr > 6) _tgDeling(ctx, px + jx, py + jy, rr * 0.7, lw);
      else _tgBlob(ctx, px + jx + rr * 0.05, py + jy, rr * (0.42 + 0.15 * hash(i * 4)), rr * (0.38 + 0.12 * hash(i * 6)), i * 5 + 1, _TG.tumK, _TG.kernR, lw, 0.25); });
    ret.tumor = [tumX, Math.min(...top.map(p => p[1])) - sp * 0.2]; }
  ctx.restore(); return ret;
}

// =====================================================================================
// WITTE BLOEDCELLEN (set): macrofaag, neutrofiel, B-cel, plasmacel, mestcel — naast tHelperCel. Recept (OpenStax A&P
// 18.4, 21.2, 21.4): alle rond met kern, membraan gebogen. Macrofaag (uit monocyt, 12–20 µm en groter): onregelmatig,
// amoeboïde, met schijnvoetjes; kern ingedeukt/hoefijzervormig; fagocytose = schijnvoetjes omsluiten de bacterie →
// fagosoom → versmelt met lysosomen (verteerenzymen). Bacterie ± 2 µm (± 1/10 van de macrofaag). Neutrofiel 10–12 µm,
// kern met 2–5 lobben, fijne korrels. Kleine lymfocyt (B-cel) 6–9 µm: grote ronde kern, smalle rand, receptoren
// (membraangebonden antistoffen) loodrecht op het oppervlak. Plasmacel: ovaal, kern excentrisch met
// 'wijzerplaat'-chromatine, cytoplasma vol ruw ER, lichte Golgi-zone naast de kern; scheidt antistoffen uit. Mestcel:
// rond, ronde kern, cytoplasma vol grote korrels (histamine) die bij activatie vrijkomen.
// Golgi (Kamiel 28 okt 2026: 'niet altijd goed geplaatst'): altijd direct naast de kern, de stapel op schaal (_wbGolgi):
// in de macrofaag in de inham van de boonvormige kern, in de plasmacel in de lichte zone naast de excentrische kern.
// Bekende fouten: alle witte bloedcellen hetzelfde rondje; kern in het midden; bacterie even groot als de macrofaag;
// receptoren als losse stipjes; korrels buiten de cel zonder dat ze vrijkomen.
// Stijl B: volle doorsnede in de Micro-look — gegolfde (ruches) rand met dubbele membraanlijn, organellen uit lib.js
// (mitochondriën, lysosomen, Golgi, ruw ER), kern met kernlichaampje; in het fagolysosoom valt de bacterie in stukjes.
// Aanroep: witteBloedcellen(ctx, x, y, r, o) — r = straal in px (macrofaag-maat; andere soorten schalen naar hun echte
// grootte t.o.v. r tenzij o.eigen = false). o.soort = 'macrofaag' | 'neutrofiel' | 'bcel' | 'plasmacel' | 'mestcel';
// o.eet 0..1 (macrofaag/neutrofiel: bacterie insluiten → fagosoom → lysosomen), o.vrij 0..1 (mestcel: korrels vrij;
// plasmacel: antistoffen naar buiten), o.t, o.hl. Geeft { kern, rand(an), bacterie, korrel } terug.
// =====================================================================================
const _WBB_O = 1; const _WB = { cyto: '#2C3A52', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', lyso: '#3E9A78', korrelM: '#7A4A9A', korrelN: '#C9B896', er: '#AFC0D0' };
const _WB_MAAT = { macrofaag: 1, neutrofiel: 0.58, bcel: 0.42, plasmacel: 0.6, mestcel: 0.62 }; // t.o.v. macrofaag (± 20 µm)
function _wbContour(x, y, r, f, n = 64) { const pts = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 - Math.PI; const rr = f(u); pts.push([x + Math.cos(u) * rr, y + Math.sin(u) * rr]); } return pts; }
function _wbKernLobben(ctx, pts, rr, fill, edge, lw) { ctx.lineCap = 'round'; ctx.strokeStyle = edge; ctx.lineWidth = rr * 0.35; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 6.283); shape(ctx, fill, edge, lw); }); ctx.strokeStyle = fill; ctx.lineWidth = rr * 0.22; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); }
function _wbGolgi(ctx, x, y, w, rot) { // golgi() uit lib.js op schaal: (x, y) = midden van de stapel, w = breedte van de grootste zak;
  // rot draait de stapel (−π/2 = bolle kant naar links). golgi() heeft vaste minimummaten (zakdikte 8, afstand 12 px), daarom
  // op 60 px getekend (dezelfde verhouding als in de oude macrofaag) en geschaald.
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(w / 60, w / 60); golgi(ctx, 0, 26, 60, 1); ctx.restore(); }
function witteBloedcellen(ctx, x, y, r, o = {}) {
  const { a = 1, soort = 'macrofaag', eet = 0, vrij = 0, t = 0, hl = 0, eigen = true } = o;
  const R = r * (eigen ? (_WB_MAAT[soort] || 1) : 1); const lw = Math.max(1, R * 0.012);
  const ret = { kern: [x, y], rand: an => [x + Math.cos(an) * R * 1.08, y + Math.sin(an) * R * 1.08], bacterie: null, korrel: null };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const g = (u, m, w) => Math.exp(-((u - m) * (u - m)) / (2 * w * w));
  let f;
  if (soort === 'macrofaag') {
    const e1 = ease(clamp(eet / 0.5, 0, 1)), dicht = ease(clamp((eet - 0.45) / 0.2, 0, 1));
    f = u => { let v = R * (1 + 0.06 * Math.sin(u * 3 + 0.8 + t * 0.4) + 0.04 * Math.sin(u * 5 + 2) + 0.018 * Math.sin(u * 23 + t * 2) + 0.012 * Math.sin(u * 37));
      [[-2.3, 0.22, 0.22], [2.0, 0.18, 0.25], [-1.0, 0.16, 0.2], [2.9, 0.14, 0.2]].forEach(([m, h, w], k) => { v += R * (h + 0.04 * Math.sin(t * 0.7 + k)) * g(u, m, w); }); // schijnvoetjes
      if (eet > 0 && eet < 0.75) { const ex = R * 0.95 * e1 * (1 - dicht), mm = lerp(0.36, 0.2, e1); v += ex * (g(u, mm, 0.075) + g(u, -mm, 0.075)) + R * 0.12 * e1 * (1 - dicht) * g(u, 0, 0.1); }
      return v; };
  } else if (soort === 'plasmacel') f = u => R * (1 + 0.28 * Math.cos(2 * u)) * (1 + 0.02 * Math.sin(u * 5)) / 1.14;
  else f = u => R * (1 + 0.03 * Math.sin(u * 4 + 1) + 0.02 * Math.sin(u * 7));
  const C0 = _wbContour(x, y, R, f, soort === 'macrofaag' ? 160 : 72);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 * hl; ctx.beginPath(); bioPad(ctx, C0, true); ctx.strokeStyle = C.goud; ctx.lineWidth = R * 0.12; ctx.stroke(); ctx.restore(); }
  // B-celreceptoren (Y'tjes) loodrecht op het oppervlak, onder de rand getekend zodat de voet verankerd is
  if (soort === 'bcel') { const n = clamp(Math.round(6.283 * R / 26), 10, 28); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(1.2, R * 0.03); ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { const an = (i + 0.15 * (hash(i * 3.1) - 0.5)) / n * 6.283; const rr = f(an - 0) , ux = Math.cos(an), uy = Math.sin(an), tx = -uy, ty = ux; const b0 = rr - 2, b1 = rr + R * 0.13, arm = R * 0.08;
      ctx.beginPath(); ctx.moveTo(x + ux * b0, y + uy * b0); ctx.lineTo(x + ux * b1, y + uy * b1); for (const sd of [-1, 1]) { ctx.moveTo(x + ux * b1, y + uy * b1); ctx.lineTo(x + ux * (b1 + arm) + tx * sd * arm * 0.75, y + uy * (b1 + arm) + ty * sd * arm * 0.75); } ctx.stroke(); } }
  // cel
  ctx.beginPath(); bioPad(ctx, C0, true); shape(ctx, _WB.cyto, _WB.rand, lw * 1.2);
  { const Ci = _wbContour(x, y, R, u => f(u) - Math.max(2, R * 0.025), soort === 'macrofaag' ? 160 : 72); ctx.beginPath(); bioPad(ctx, Ci, true); ctx.strokeStyle = rgba(_WB.rand, 0.55); ctx.lineWidth = lw * 0.8; ctx.stroke(); }
  ctx.save(); ctx.beginPath(); bioPad(ctx, C0, true); ctx.clip();
  // rustige textuur
  for (let i = 0; i < 26; i++) { const an = hash(i * 5.3 + 1) * 6.283, rr = Math.sqrt(hash(i * 5.3 + 2)) * R * 0.92; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, Math.max(0.8, R * 0.009), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  // cytoskelet (dunne lijnen) en organellen uit lib.js, grootte naar R
  if (R > 30) { ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 0.75; for (let i = 0; i < 9; i++) { const an = hash(i * 7.7) * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * R * 0.2, y + Math.sin(an) * R * 0.2); ctx.quadraticCurveTo(x + Math.cos(an + 0.4) * R * 0.6, y + Math.sin(an + 0.4) * R * 0.6, x + Math.cos(an + 0.2) * R * 0.95, y + Math.sin(an + 0.2) * R * 0.95); ctx.stroke(); }
    const nm = soort === 'bcel' ? 2 : 4; for (let k = 0; k < nm; k++) { const an = (soort === 'plasmacel' ? 2.2 : 0.9) + k * 1.3, d = R * (soort === 'bcel' ? 0.86 : 0.68); const ml = R * (soort === 'bcel' ? 0.2 : 0.17), mx = x + Math.cos(an) * d, my = y + Math.sin(an) * d;
      if (ml >= 40) mitochondrion(ctx, mx, my, ml, an + 1.4, 1, 3, t);
      else { ctx.save(); ctx.translate(mx, my); ctx.rotate(an + 1.4); roundRect(ctx, -ml / 2, -ml * 0.21, ml, ml * 0.42, ml * 0.21); shape(ctx, C.mito, C.mitoR, 1); ctx.strokeStyle = C.mitoR; ctx.lineWidth = 0.8; for (let c = 1; c < 4; c++) { const px = -ml / 2 + c * ml / 4; ctx.beginPath(); ctx.moveTo(px, (c % 2 ? -1 : 1) * ml * 0.2); ctx.lineTo(px, 0); ctx.stroke(); } ctx.restore(); } } }
  if (soort === 'macrofaag') {
    // kern: ingedeukt (boon/hoefijzer), aan de kant tegenover de bacterie
    const kx = x - R * 0.28, ky = y + R * 0.05, kr = R * 0.34; ret.kern = [kx, ky];
    ctx.beginPath(); bioPad(ctx, _wbContour(kx, ky, kr, u => kr * (1 - 0.38 * g(u, 0, 0.45)) * (u > 0 ? 1 : 1.02), 32), true); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    if (R > 40) _wbGolgi(ctx, kx + kr * 0.95, ky, R * 0.22, -Math.PI / 2); // Golgi in de inham van de kern, bolle kant naar de kern
    // lysosomen; bij eet > 0,75 naar het fagosoom en versmelten
    const ph = [x + R * 0.45, y]; const fus = ease(clamp((eet - 0.75) / 0.2, 0, 1));
    for (let k = 0; k < 6; k++) { const an = 1.0 + k * 0.85, d = R * (0.55 + 0.12 * hash(k)); let lx = x + Math.cos(an) * d, ly = y + Math.sin(an) * d;
      if (k < 3) { lx = lerp(lx, ph[0] + Math.cos(an) * R * 0.16, fus); ly = lerp(ly, ph[1] + Math.sin(an) * R * 0.16, fus); }
      ctx.beginPath(); ctx.arc(lx, ly, R * 0.055 * (k < 3 ? 1 - fus * 0.6 : 1), 0, 6.283); shape(ctx, _WB.lyso, lighten(_WB.lyso, 0.35), lw); ctx.fillStyle = rgba('#CFEFE0', 0.6); for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(lx + (j - 1) * R * 0.018, ly + (j % 2 ? 1 : -1) * R * 0.012, Math.max(0.6, R * 0.008), 0, 6.283); ctx.fill(); } }
  } else if (soort === 'neutrofiel') {
    for (let i = 0; i < 70; i++) { const an = hash(i * 2.7) * 6.283, rr = Math.sqrt(hash(i * 3.9)) * R * 0.88; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, R * 0.025, 0, 6.283); ctx.fillStyle = rgba(_WB.korrelN, 0.45); ctx.fill(); }
    const L = [[-0.42, 0.1], [-0.2, -0.3], [0.15, -0.22], [0.36, 0.12]].map(([px, py]) => [x + px * R, y + py * R]); ret.kern = L[1];
    _wbKernLobben(ctx, L, R * 0.2, _WB.kern, _WB.kernR, lw * 1.3);
  } else if (soort === 'bcel') {
    const kx = x + R * 0.05, ky = y - R * 0.04, kr = R * 0.8; ret.kern = [kx, ky]; ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    ctx.fillStyle = rgba('#3E2E66', 0.45); for (let i = 0; i < 8; i++) { const an = hash(i * 2.2 + 3) * 6.283, rr = Math.sqrt(hash(i * 1.9)) * kr * 0.7; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.16, kr * 0.1, an, 0, 6.283); ctx.fill(); }
  } else if (soort === 'plasmacel') {
    // ruw ER: concentrische dubbele lijnen met ribosoomstipjes, rond een lichte Golgi-zone naast de kern
    const kx = x - R * 0.42, ky = y, kr = R * 0.4, gx = x - R * 0.02, gy = y; ret.kern = [kx, ky];
    ctx.beginPath(); ctx.arc(gx, gy, R * 0.22, 0, 6.283); ctx.fillStyle = rgba(C.golgi, 0.12); ctx.fill(); if (R > 40) _wbGolgi(ctx, gx + R * 0.07, gy, R * 0.22, -Math.PI / 2); // Golgi in de lichte zone naast de kern, bolle kant naar de kern
    for (let k = 0; k < 5; k++) { const rr = R * (0.38 + k * 0.13); ctx.strokeStyle = rgba(_WB.er, 0.75); ctx.lineWidth = Math.max(0.8, R * 0.012);
      for (const off of [0, R * 0.028]) { ctx.beginPath(); ctx.arc(gx, gy, rr + off, -1.25, 1.25); ctx.stroke(); }
      if (R > 40) { ctx.fillStyle = C.ribo; const n = Math.round(rr * 2.5 / (R * 0.06)); for (let i = 0; i < n; i++) { const an = -1.25 + 2.5 * (i + 0.5) / n; ctx.beginPath(); ctx.arc(gx + Math.cos(an) * (rr - R * 0.018), gy + Math.sin(an) * (rr - R * 0.018), Math.max(0.7, R * 0.012), 0, 6.283); ctx.fill(); } } }
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3);
    ctx.fillStyle = rgba('#3E2E66', 0.6); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283; ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * kr * 0.68, ky + Math.sin(an) * kr * 0.68, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); } // wijzerplaat
    ctx.beginPath(); ctx.arc(kx, ky, kr * 0.16, 0, 6.283); ctx.fill();
  } else if (soort === 'mestcel') {
    const kx = x - R * 0.08, ky = y + R * 0.06, kr = R * 0.33; ret.kern = [kx, ky]; const vr = ease(clamp(vrij, 0, 1));
    for (let i = 0; i < 60; i++) { const an = hash(i * 4.1 + 2) * 6.283, d = R * (0.4 + 0.52 * Math.sqrt(hash(i * 2.3 + 5))); const px = x + Math.cos(an) * d, py = y + Math.sin(an) * d;
      if (Math.hypot(px - kx, py - ky) < kr * 1.15) continue; const uit = vr > 0 && Math.cos(an - 0.3) > 0.55 && d > R * 0.7; if (uit) continue;
      ctx.beginPath(); ctx.arc(px, py, R * 0.055, 0, 6.283); shape(ctx, _WB.korrelM, lighten(_WB.korrelM, 0.3), lw); if (!ret.korrel) ret.korrel = [px, py]; }
    ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, _WB.kern, _WB.kernR, lw * 1.3); ctx.beginPath(); ctx.arc(kx + kr * 0.2, ky - kr * 0.15, kr * 0.22, 0, 6.283); ctx.fillStyle = rgba('#3E2E66', 0.7); ctx.fill();
  }
  ctx.restore();
  // buiten de cel: bacterie bij fagocytose, vrijgekomen korrels, uitgescheiden antistoffen
  if (soort === 'macrofaag' && eet > 0) {
    const e1 = ease(clamp(eet / 0.5, 0, 1)), naar = ease(clamp((eet - 0.5) / 0.3, 0, 1)), fus = ease(clamp((eet - 0.75) / 0.25, 0, 1));
    const bx = lerp(x + R * 1.45, lerp(x + R * 1.38, x + R * 0.45, naar), e1), by = y; ret.bacterie = [bx, by];
    if (naar > 0.01) { ctx.beginPath(); ctx.arc(bx, by, R * 0.2, 0, 6.283); shape(ctx, rgba(_WB.lyso, 0.12 + 0.3 * fus), rgba(_WB.rand, 0.9), lw * 1.3); } // fagosoom (membraan van de cel)
    if (fus < 0.6) { ctx.save(); ctx.globalAlpha *= 1 - fus / 0.6; bacterieCel(ctx, bx, by, R * 0.28, { rot: 0.3 + naar, antibiotica: fus }); ctx.restore(); }
    if (fus > 0.2) { const ff = clamp((fus - 0.2) / 0.8, 0, 1); for (let i = 0; i < 9; i++) { const an = i * 0.7 + 0.3, d = R * 0.1 * hash(i * 3.3) * (0.5 + ff); ctx.beginPath(); ctx.ellipse(bx + Math.cos(an) * d, by + Math.sin(an) * d, R * 0.03 * (1.2 - ff * 0.5), R * 0.018, an, 0, 6.283); ctx.fillStyle = rgba('#9FB27A', 0.85 * ff); ctx.fill(); }
      ctx.fillStyle = rgba(_WB.lyso, 0.9); for (let i = 0; i < 10; i++) { const an = hash(i * 9.1) * 6.283, d = R * 0.16 * Math.sqrt(hash(i * 4.4)); ctx.beginPath(); ctx.arc(bx + Math.cos(an) * d, by + Math.sin(an) * d, Math.max(0.8, R * 0.01), 0, 6.283); ctx.fill(); } }
  }
  if (soort === 'mestcel' && vrij > 0.01) { const vr = ease(clamp(vrij, 0, 1)); for (let i = 0; i < 12; i++) { const an = 0.3 + (hash(i * 1.7) - 0.5) * 1.6, d = R * (1.0 + 0.45 * vr * hash(i * 5.1 + 1)); const px = x + Math.cos(an) * d, py = y + Math.sin(an) * d;
      ctx.beginPath(); ctx.arc(px, py, R * 0.04 * (1 - 0.4 * vr), 0, 6.283); ctx.fillStyle = rgba(_WB.korrelM, 0.85 * (1 - 0.3 * vr)); ctx.fill(); } }
  if (soort === 'plasmacel' && vrij > 0.01) { ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = Math.max(1, R * 0.025); ctx.lineCap = 'round';
    for (let i = 0; i < 5; i++) { const an = -0.5 + i * 0.25, d = R * (1.25 + 0.5 * ((vrij + i * 0.37) % 1)), px = x + Math.cos(an) * d, py = y + Math.sin(an) * d, k = R * 0.07, ro = an + 1.2 * i;
      ctx.save(); ctx.translate(px, py); ctx.rotate(ro); ctx.beginPath(); ctx.moveTo(0, k); ctx.lineTo(0, 0); ctx.lineTo(-k * 0.8, -k * 0.9); ctx.moveTo(0, 0); ctx.lineTo(k * 0.8, -k * 0.9); ctx.stroke(); ctx.restore(); } }
  ctx.restore(); return ret;
}

// =====================================================================================
// groep cel-nieuw
// =====================================================================================

// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// BLAASJE VERSMELT MET HET CELMEMBRAAN — ronde 2 (exocytose; 'endo' = omgekeerd). Recept: het celmembraan is een stuk
// van een cirkel (de cel is rond). Een blaasje (± 50–100 nm, membraan even dik als het celmembraan) komt
// van binnen aan, legt aan, de twee membranen gaan op één plek in elkaar over (porie), de porie wordt wijder
// en het blaasjesmembraan wordt deel van het celmembraan (een Ω-vorm die vlak trekt). De inhoud gaat naar
// buiten. Een membraaneiwit uit het blaasje komt in het celmembraan te staan, met zijn suikerketen naar
// buiten (in het blaasje wees die naar binnen, naar het lumen). Niets steekt vóór de fusie buiten het membraan.
// Ronde 2: het membraan is zichtbaar een stuk van de cel (standaard R = 420 en een breed stuk, span = 0,5 R,
// dezelfde kromming als celDier); in groot formaat (s ≥ 2,2) verschijnen de fosfolipidekoppen en -staarten.
// Bron: OpenStax Biology 2e § 4.4 (blaasjes van de transkant versmelten met het plasmamembraan en geven de
// inhoud af buiten de cel; het eiwit wordt een vast deel van het celmembraan); § 5.4 (bulktransport).
// Bekende fouten: blaasje dat tegen het membraan verdwijnt; membraan als rechte lijn; blaasje dat al buiten
// het membraan uitsteekt voor de fusie; suikerketen die na de fusie naar binnen wijst.
// Gebruik: blaasjeVersmelt(ctx, x, y, s, { a, t, f = 0..1, richting = 'exo'|'endo', R = 420, rot = −π/2,
//   rv = 22, span, lading = true, eiwit = true, cytoplasma = true, alleenMembraan = false }). (x, y) = fusieplek op het membraan,
//   rot = richting naar buiten, R = straal van de cel (ontwerpeenheden). In een cel: geef cx, cy, hoek en
//   rFn(φ) (straal van het membraan per hoek, ontwerpeenheden) mee, dan sluit het naadloos aan; het
//   membraan buiten ± span tekent de cel zelf.
// Geeft ankerpunten terug: { blaasje, membraan, lading, eiwit, porie }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
function blaasjeVersmelt(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, richting = 'exo', R = 420, rot = -Math.PI / 2, rv = 22, lading = true, eiwit = true, cytoplasma = true, alleenMembraan = false, dikte = 6, rand = C.er } = o;
  const f = clamp(richting === 'endo' ? 1 - (o.f ?? 0) : (o.f ?? 0), 0, 1); const U = o.span ?? (typeof o.rFn === 'function' ? rv * 3.4 : R * 0.42);
  // afbeelding lokaal (u langs het membraan, v naar binnen) → scherm
  const cel = typeof o.rFn === 'function'; const Cx = cel ? o.cx : x - Math.cos(rot) * R * s, Cy = cel ? o.cy : y - Math.sin(rot) * R * s, f0 = cel ? o.hoek : rot;
  const rr = (phi) => cel ? o.rFn(phi) : R; const R0 = rr(f0);
  const M = (u, v) => { const phi = f0 + u / R0; const r = (rr(phi) - v) * s; return [Cx + Math.cos(phi) * r, Cy + Math.sin(phi) * r]; };
  // fasen: 0–0,45 aanvoer, 0,45–0,55 aanleggen, 0,55–1 porie opent en het blaasje trekt vlak
  const aan = ease(clamp(f / 0.45, 0, 1)), leg = ease(clamp((f - 0.45) / 0.1, 0, 1)), fus = ease(clamp((f - 0.55) / 0.45, 0, 1));
  const op = fus > 0 ? lerp(0.35, Math.PI - 0.06, fus) : 0; const rc = rv * (1 + 0.55 * op / Math.PI); const vc = fus > 0 ? rc * Math.cos(op) : lerp(rv * 3.6, rv + dikte * 0.5, aan) - leg * dikte * 0.45;
  // middellijn van het membraan
  let pts = [];
  if (fus <= 0) { for (let i = 0; i <= 120; i++) pts.push([-U + 2 * U * i / 120, 0]); }
  else { const nk = rc * Math.sin(op); const N1 = 48;
    for (let i = 0; i <= N1; i++) pts.push([lerp(-U, -nk, i / N1), 0]);
    const Nc = 48; for (let i = 1; i < Nc; i++) { const th = lerp(2 * Math.PI - op, op, i / Nc); pts.push([rc * Math.sin(th), vc - rc * Math.cos(th)]); }
    for (let i = 0; i <= N1; i++) pts.push([lerp(nk, U, i / N1), 0]);
    for (let it = 0; it < 4; it++) pts = pts.map((p, i) => (i === 0 || i === pts.length - 1) ? p : [(pts[i - 1][0] + 2 * p[0] + pts[i + 1][0]) / 4, (pts[i - 1][1] + 2 * p[1] + pts[i + 1][1]) / 4]); }
  const offs = (lst, d) => lst.map((p, i) => { const q = lst[Math.max(0, i - 1)], r2 = lst[Math.min(lst.length - 1, i + 1)]; const tx = r2[0] - q[0], ty = r2[1] - q[1], l = Math.hypot(tx, ty) || 1; return [p[0] - ty / l * d, p[1] + tx / l * d]; });
  const cIn = fus > 0 ? [0, vc] : [0, vc];
  const anker = { blaasje: M(0, vc), membraan: M(U * 0.75, 0), lading: M(0, fus > 0.5 ? -rv * fus : vc), eiwit: M(0, fus > 0 ? vc + rc : vc + rv), porie: M(0, 0) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.7);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (lst) => { ctx.beginPath(); lst.forEach((p, i) => { const [X, Y] = M(p[0], p[1]); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); };
  // cytoplasma onder het membraan (sector), de beker na de fusie hoort bij buiten
  if (cytoplasma && !cel) { pad(pts); for (let i = 0; i <= 80; i++) { const u = U - 2 * U * i / 80; const [X, Y] = M(u, rv * 4.4); ctx.lineTo(X, Y); } ctx.closePath(); ctx.fillStyle = rgba('#2A3448', 0.85); ctx.fill(); }
  // blaasje vóór de fusie: eigen dubbel membraan
  const kring = (d) => { const l = []; for (let i = 0; i <= 48; i++) { const th = i / 48 * 6.283; l.push([Math.sin(th) * (rv + d), vc - Math.cos(th) * (rv + d)]); } return l; };
  if (alleenMembraan) { /* alleen het membraanstuk (blaasje reist nog) */ } else if (fus <= 0) { pad(kring(0)); ctx.fillStyle = _mixHex(C.ves, '#1A2740', 0.55); ctx.fill(); }
  else { pad(pts.slice(48, pts.length - 48)); ctx.closePath(); ctx.fillStyle = rgba(_mixHex(C.ves, '#1A2740', 0.55), 1 - fus); ctx.fill(); }
  // membranen (twee lijnen per dubbellaag)
  ctx.strokeStyle = rand; ctx.lineWidth = lw(1.5);
  for (const d of [-dikte / 2, dikte / 2]) { pad(offs(pts, d)); ctx.stroke(); }
  if (fus <= 0 && !alleenMembraan) for (const d of [-dikte / 2, dikte / 2]) { pad(kring(d)); ctx.closePath(); ctx.stroke(); }
  // groot formaat: fosfolipiden (koppen op beide lagen, staarten naar binnen)
  if (s >= 2.2) {
  const lipiden = (lst, gesloten) => { const cum = [0]; for (let i = 1; i < lst.length; i++) cum.push(cum[i - 1] + Math.hypot(lst[i][0] - lst[i - 1][0], lst[i][1] - lst[i - 1][1]));
    const tot = cum[cum.length - 1], stap = 3.6, n = Math.floor(tot / stap);
    for (let k = 0; k <= n; k++) { const dd = k * stap + (gesloten ? 0 : (tot - n * stap) / 2); let i = 1; while (i < lst.length - 1 && cum[i] < dd) i++; const uu = (dd - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]);
      const p = [lerp(lst[i - 1][0], lst[i][0], uu), lerp(lst[i - 1][1], lst[i][1], uu)]; const tx = lst[i][0] - lst[i - 1][0], ty = lst[i][1] - lst[i - 1][1], l = Math.hypot(tx, ty) || 1, nx = -ty / l, ny = tx / l;
      for (const sg of [-1, 1]) { const hk = [p[0] + nx * sg * dikte / 2, p[1] + ny * sg * dikte / 2]; const st = [p[0] + nx * sg * 1.2, p[1] + ny * sg * 1.2];
        const [HX, HY] = M(hk[0], hk[1]), [SX, SY] = M(st[0], st[1]); if (s > 0.45) { ctx.strokeStyle = rgba(C.oker, 0.55); ctx.lineWidth = lw(0.8); ctx.beginPath(); ctx.moveTo(HX, HY); ctx.lineTo(SX, SY); ctx.stroke(); }
        ctx.fillStyle = rand; ctx.beginPath(); ctx.arc(HX, HY, Math.max(0.8, 1.05 * s), 0, 6.283); ctx.fill(); } } };
  lipiden(pts, false); if (fus <= 0 && !alleenMembraan) lipiden(kring(0), true); }
  // lading: deeltjes die na het openen van de porie naar buiten verspreiden
  if (lading && !alleenMembraan) { ctx.fillStyle = C.oker; for (let i = 0; i < 8; i++) { const an = hash(i * 7 + 1) * 6.283, d = Math.sqrt(hash(i * 7 + 2)) * rv * 0.6; let u = Math.cos(an) * d, v = vc + Math.sin(an) * d;
      if (fus > 0) { const k = clamp((fus - 0.15) / 0.85, 0, 1); u = u * (1 + 2.2 * k) + Math.sin(t * 2 + i) * 2 * k; v = lerp(v, -rv * (0.6 + 1.6 * hash(i * 7 + 3)), ease(k)); }
      const [X, Y] = M(u, v); ctx.beginPath(); ctx.arc(X, Y, 3.1 * s, 0, 6.283); ctx.fill(); } }
  // membraaneiwit met suikerketen naar het lumen (= straks naar buiten)
  if (eiwit && !alleenMembraan) { const th = Math.PI; const pc = fus > 0 ? [rc * Math.sin(th), vc - rc * Math.cos(th)] : [0, vc + rv]; const naar = fus > 0 ? [0, -1] : [0, -1];
    const [X0, Y0] = M(pc[0], pc[1] + dikte * 0.8), [X1, Y1] = M(pc[0], pc[1] - dikte * 0.8); ctx.strokeStyle = lighten(C.enzym, 0.25); ctx.lineWidth = lw(5); ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y1); ctx.stroke();
    const g0 = M(pc[0], pc[1] - dikte * 0.8), g1 = M(pc[0], pc[1] - dikte * 0.8 - 7), g2 = M(pc[0] - 4, pc[1] - dikte * 0.8 - 11), g3 = M(pc[0] + 4, pc[1] - dikte * 0.8 - 12);
    ctx.strokeStyle = C.groen; ctx.lineWidth = lw(1.4); ctx.beginPath(); ctx.moveTo(...g0); ctx.lineTo(...g1); ctx.lineTo(...g2); ctx.moveTo(...g1); ctx.lineTo(...g3); ctx.stroke();
    ctx.fillStyle = C.groen; for (const g of [g1, g2, g3]) { ctx.beginPath(); ctx.arc(g[0], g[1], 1.8 * s + 0.6, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// DIERLIJKE CEL met alle organellen (Micro-look), opbouw zoals een leerboekplaat — ronde 2: cel ronder
// (940 × 840), ruw ER sluit op zes plekken met brede halsjes aan op het buitenste kernmembraan (lumen in
// dezelfde kleur als de perinucleaire ruimte), mitochondriën ± 1/3 van de kerndiameter, groter
// exocytoseblaasje dat in het membraan opgaat. Recept: de cel is rond
// (hier bijna rond, 910 × 850), celmembraan als gebogen dubbellaag; de kern ± 1/3 van de celdiameter en
// niet in het midden, met dubbel kernmembraan, poriën, chromatine en nucleolus. Het ruw ER buigt in lagen om
// de kern en loopt door in het buitenste kernmembraan; aan het eind gaat het over in het glad ER (buisjes).
// Het golgi-apparaat ligt naast de kern met de cis-kant naar de kern; blaasjes snoeren aan de transkant af,
// reizen langs microtubuli naar het celmembraan en versmelten ermee (exocytose, animatie met t). Naast de kern
// het centrosoom: twee centriolen haaks op elkaar (elk 9 tripletten microtubuli), met een ster van
// microtubuli tot aan het membraan. Mitochondriën (± 1/10 van de cellengte), lysosomen, losse ribosomen en
// een rustige textuur in het cytoplasma. Alles blijft binnen het celmembraan, behalve wat versmelt.
// Bron: OpenStax Biology 2e fig. 4.10, 4.13, 4.14 (centrosoom: twee centriolen haaks, elk 9 tripletten) en
// § 4.4 (ER doorlopend met de kernenvelop, glad ER doorlopend met ruw ER, cis-kant naar het ER, blaasjes naar
// het plasmamembraan); BioNumbers 100436 (mitochondrion ± 1 µm). Referentieplaat (ElevenLabs): organel/cel.png.
// Bekende fouten: een lege cel met vijf losse organellen; kern precies in het midden; ER los van de kern;
// golgi zonder richting; één centriool of twee evenwijdige; organellen die over het membraan steken.
// Gebruik: celDier(ctx, x, y, s, { a, t, nadruk = null | 'kern'|'er'|'golgi'|'mito'|'lyso'|'centrosoom'|
//   'blaasje'|'membraan'|'ribosoom'|'cytoskelet', exo = true, mrna = -1 }). Ontwerpmaat 910 × 850 bij s = 1.
//   nadruk: dat organel blijft vol, de rest gaat naar 35 %.
// Geeft ankerpunten terug (scherm): { cel, membraan, cytoplasma, kern, nucleolus, kernporie, ruwER, gladER,
//   golgi, golgiCis, golgiTrans, mito, mitos[], lysosoom, centrosoom, blaasje, ribosoom, microtubulus }.
// Vereist: mitochondrionEcht, ruwER, kernEnvelopPorie, golgiStapel, blaasjeVersmelt (zelfde ronde), en uit
//   lib.js: C, rgba, lighten, hash, clamp, lerp, ease, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function celDier(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, nadruk = null, exo = true, mrna = -1 } = o;
  const RX = 455, RY = 425; const rFn = (f) => { const c = Math.cos(f), sn = Math.sin(f); return 1 / Math.sqrt(c * c / (RX * RX) + sn * sn / (RY * RY)) * (1 + 0.009 * Math.sin(4 * f + 1) + 0.006 * Math.sin(7 * f + 2)); };
  const P = (lx, ly) => [x + lx * s, y + ly * s]; const pol = (f, d = 0) => [Math.cos(f) * (rFn(f) - d), Math.sin(f) * (rFn(f) - d)];
  const K = { x: -150, y: -10, r: 165 }, G = { x: 205, y: -40, rot: Math.PI / 2 }, CS = { x: 105, y: -250 };
  const MITO = [[-385, -40, 1.75, 100], [-300, 235, 0.6, 108], [-95, 320, -0.15, 96], [130, 300, 0.3, 104], [320, 215, -0.65, 92], [385, -60, 1.45, 96], [255, -300, 0.55, 88], [-275, -290, -0.55, 94]];
  const LYSO = [[-395, 110, 17], [-170, -345, 14], [385, 70, 16], [20, 375, 13]];
  // exocytose: drie banen golgi(trans) → membraan, versprongen in de tijd
  const SITES = [-0.62, 0.05, 0.42], PER = 8, rv = 28;
  const golgiT = [G.x + 70, G.y];
  const baan = SITES.map((f, i) => { const u = (((t / PER) + i / SITES.length) % 1 + 1) % 1; const eind = pol(f, rv * 3.6 + 3); return { f, u, eind, reis: ease(clamp(u / 0.5, 0, 1)), fus: clamp((u - 0.5) / 0.5, 0, 1) }; });
  const vesPos = (b) => [lerp(golgiT[0] + 10, b.eind[0], b.reis), lerp(golgiT[1], b.eind[1], b.reis) + Math.sin(b.reis * Math.PI) * -20];
  const anker = { cel: P(0, 0), membraan: P(...pol(-2.4, 0)), cytoplasma: P(-60, 360), kern: P(K.x, K.y), nucleolus: P(K.x - K.r * 0.22, K.y + K.r * 0.12), kernporie: P(K.x + Math.cos(2.9) * K.r, K.y + Math.sin(2.9) * K.r),
    ruwER: P(K.x + Math.cos(-0.3) * (K.r + 50), K.y + Math.sin(-0.3) * (K.r + 50)), gladER: P(K.x + Math.cos(1.75) * (K.r + 70), K.y + Math.sin(1.75) * (K.r + 70)), golgi: P(G.x, G.y), golgiCis: P(G.x - 40, G.y), golgiTrans: P(G.x + 50, G.y),
    mito: P(MITO[4][0], MITO[4][1]), mitos: MITO.map(m => P(m[0], m[1])), lysosoom: P(LYSO[2][0], LYSO[2][1]), centrosoom: P(CS.x, CS.y), blaasje: P(...vesPos(baan[1])), ribosoom: P(-330, 60), microtubulus: P(150, -290) };
  if (a <= 0.01) return anker;
  const A = (n) => (nadruk === null || nadruk === n) ? 1 : 0.35;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a;
  // cytoplasma
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const omtrek = (d) => { ctx.beginPath(); for (let i = 0; i <= 160; i++) { const f = i / 160 * 6.283; const [px, py] = pol(f, d); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  omtrek(0); ctx.fillStyle = '#26324A'; ctx.fill();
  omtrek(5); ctx.clip();
  // rustige textuur
  for (let i = 0; i < 160; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)); ctx.beginPath(); ctx.arc(Math.cos(an) * rr * RX, Math.sin(an) * rr * RY, 1.5, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.11); ctx.fill(); }
  // microtubuli: ster vanuit het centrosoom tot vlak onder het membraan
  ctx.save(); ctx.globalAlpha *= A('cytoskelet') * 0.6; ctx.strokeStyle = C.line; ctx.lineWidth = lw(0.9);
  for (let i = 0; i < 26; i++) { const f = i / 26 * 6.283 + 0.1; const [ex, ey] = pol(Math.atan2(CS.y + Math.sin(f) * 900, CS.x + Math.cos(f) * 900) , 9);
    const dx = ex - CS.x, dy = ey - CS.y; const kr = (hash(i * 3) - 0.5) * 0.18; ctx.beginPath(); ctx.moveTo(CS.x + Math.cos(f) * 16, CS.y + Math.sin(f) * 16); ctx.quadraticCurveTo(CS.x + dx / 2 - dy * kr, CS.y + dy / 2 + dx * kr, ex, ey); ctx.stroke(); }
  ctx.restore();
  // losse ribosomen
  ctx.save(); ctx.globalAlpha *= A('ribosoom'); ctx.fillStyle = C.ribo;
  for (let i = 0; i < 170; i++) { const an = hash(i * 17) * 6.283, d = Math.sqrt(hash(i * 17 + 1)) * 0.93; const px = Math.cos(an) * d * RX, py = Math.sin(an) * d * RY;
    if (Math.hypot(px - K.x, py - K.y) < K.r + 105 || Math.hypot(px - G.x, py - G.y) < 110) continue; const w = wander(i, t, 2, 0.5); ctx.beginPath(); ctx.arc(px + w.x, py + w.y, 2, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.restore();
  // ruw + glad ER (rechts om de kern, glad ER loopt naar onder), en een kleinere stapel links
  const Pk = P(K.x, K.y);
  // kern eerst, dan het ER erop: de halsjes overbruggen het buitenste kernmembraan (lumen loopt door)
  const gapK = Math.max(7, K.r * 0.075), kLum = _mixHex(C.er, '#1A2740', 0.72);
  kernEnvelopPorie(ctx, Pk[0], Pk[1], s, { a: A('kern'), t, r: K.r, mrna, mrnaPorie: 6, tusKleur: kLum });
  const pf = Array.from({ length: 14 }, (_, i) => 0.31 + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / 14 * 6.283); // poriën van kernEnvelopPorie (doorsnede)
  const vrij = (f) => { let g = f; for (let it = 0; it < 6; it++) { const q = pf.map(p => Math.atan2(Math.sin(g - p), Math.cos(g - p))).reduce((m, d) => Math.abs(d) < Math.abs(m) ? d : m, 9); if (Math.abs(q) > 0.16) break; g += (q >= 0 ? 1 : -1) * 0.06; } return g; };
  ruwER(ctx, Pk[0], Pk[1], s, { a: A('er'), t, r0: K.r, gap: gapK, a0: -1.25, a1: 1.15, lagen: 4, kern: false, envelop: false, aansl: [-1.08, -0.45, 0.25, 0.95].map(vrij), glad: 1 });
  ruwER(ctx, Pk[0], Pk[1], s, { a: A('er'), t, r0: K.r, gap: gapK, a0: 2.35, a1: 3.55, lagen: 3, kern: false, envelop: false, aansl: [2.6, 3.3].map(vrij), glad: 0 });
  const Pg = P(G.x, G.y); const ga = golgiStapel(ctx, Pg[0], Pg[1], s * 0.95, { a: A('golgi'), t, rot: G.rot, blaasjes: true }); anker.golgiCis = ga.cis; anker.golgiTrans = ga.trans;
  MITO.forEach(([mx, my, mr, ml], i) => { const w = wander(i + 50, t, 3, 0.3); const Pm = P(mx + w.x, my + w.y); mitochondrionEcht(ctx, Pm[0], Pm[1], s, { a: A('mito'), t, rot: mr, lang: ml, dik: ml * 0.4, seed: i }); });
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // lysosomen: rond, met verteringsdeeltjes
  LYSO.forEach(([lx, ly, lr], i) => { ctx.save(); ctx.globalAlpha *= A('lyso'); ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 6.283); ctx.fillStyle = _mixHex(C.lyso, '#1A2740', 0.35); ctx.fill(); ctx.strokeStyle = lighten(C.lyso, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
    ctx.fillStyle = rgba(lighten(C.lyso, 0.5).replace(/rgb\((\d+),(\d+),(\d+)\)/, (m, r, g, b) => '#' + [r, g, b].map(v => (+v).toString(16).padStart(2, '0')).join('')), 0.6); for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(lx + (hash(k + i * 9) - 0.5) * lr, ly + (hash(k * 3 + i) - 0.5) * lr, 1.6, 0, 6.283); ctx.fill(); } ctx.restore(); });
  // centrosoom: twee centriolen haaks op elkaar (één in lengte, één van boven: ring van 9 tripletten)
  ctx.save(); ctx.globalAlpha *= A('centrosoom'); const kc = '#BFC8D8';
  ctx.beginPath(); ctx.arc(CS.x, CS.y, 30, 0, 6.283); ctx.fillStyle = rgba(C.line, 0.12); ctx.fill();
  ctx.save(); ctx.translate(CS.x - 9, CS.y); ctx.rotate(0.5); ctx.fillStyle = _mixHex(kc, '#1A2740', 0.5); ctx.fillRect(-7, -17, 14, 34); ctx.strokeStyle = kc; ctx.lineWidth = lw(1.1); ctx.strokeRect(-7, -17, 14, 34);
  for (const dx of [-4.5, -1.5, 1.5, 4.5]) { ctx.beginPath(); ctx.moveTo(dx, -16); ctx.lineTo(dx, 16); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.translate(CS.x + 13, CS.y + 6); for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283 + 0.3; ctx.save(); ctx.translate(Math.cos(an) * 9, Math.sin(an) * 9); ctx.rotate(an + 1.1);
    for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(j * 2.6 - 2.6, 0, 1.35, 0, 6.283); ctx.fillStyle = kc; ctx.fill(); } ctx.restore(); } ctx.restore();
  ctx.restore();
  // reizende blaasjes (golgi → membraan) met een eiwit met suikerketen
  if (exo) baan.forEach((b) => { if (b.u >= 0.5) return; const [vx, vy] = vesPos(b); const g = ease(clamp(b.u / 0.06, 0, 1)); ctx.save(); ctx.globalAlpha *= A('blaasje');
    ctx.beginPath(); ctx.arc(vx, vy, rv * g, 0, 6.283); ctx.fillStyle = _mixHex(C.ves, '#1A2740', 0.55); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx, vy, (rv - 6) * g, 0, 6.283); ctx.stroke(); ctx.fillStyle = C.oker; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(vx + (hash(k * 7) - 0.5) * 18 * g, vy + (hash(k * 7 + 1) - 0.5) * 18 * g, 3, 0, 6.283); ctx.fill(); } ctx.restore(); });
  ctx.restore();
  // celmembraan (dubbele lijn) met gaten waar een blaasje versmelt; het stuk daar tekent blaasjeVersmelt
  ctx.save(); ctx.globalAlpha *= A('membraan'); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.5);
  const U = rv * 3.4; const gaten = exo ? SITES.map(f => [f - U / rFn(f) + 0.004, f + U / rFn(f) - 0.004]) : [];
  for (const d of [-3, 3]) { ctx.beginPath(); let pen = false; for (let i = 0; i <= 400; i++) { const f = i / 400 * 6.283 - Math.PI; if (gaten.some(([g0, g1]) => f > g0 && f < g1)) { pen = false; continue; } const [px, py] = pol(f, d); if (pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; } } ctx.stroke(); }
  ctx.fillStyle = lighten(C.enzym, 0.2); for (let i = 0; i < 18; i++) { const f = i / 18 * 6.283 + 0.17; if (gaten.some(([g0, g1]) => f > g0 - 0.05 && f < g1 + 0.05)) continue; const [px, py] = pol(f, 0); ctx.save(); ctx.translate(px, py); ctx.rotate(f); ctx.fillRect(-5, -3.5, 10, 7); ctx.restore(); }
  ctx.restore();
  if (exo) { ctx.save(); ctx.globalAlpha *= A('membraan') > A('blaasje') ? A('membraan') : A('blaasje');
    baan.forEach((b) => blaasjeVersmelt(ctx, 0, 0, s, { cx: x, cy: y, hoek: b.f, rFn, rv, dikte: 6, f: b.fus, t, alleenMembraan: b.u < 0.5, cytoplasma: false })); ctx.restore(); }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant B, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// BLADGROENKORREL (chloroplast, echt), ruimtelijk opengesneden. Recept: lensvormig, ± 5–10 µm lang en
// 2–3 µm dik; twee membranen; we kijken schuin van boven in de korrel (bovenste helft weggesneden). De
// grana staan als stapeltjes muntjes (elk thylakoïd een plat rond zakje: bovenvlak + smalle zijkant) in het
// stroma, verbonden door schuine stromalamellen; zetmeelkorrel en vetbolletjes in het stroma. De snijrand
// laat buiten- en binnenmembraan zien. Licht van linksboven: elk muntje één schaduwzijde (vlakke tint).
// Bron: OpenStax Biology 2e fig. 4.16 (buiten- en binnenmembraan, thylakoïden gestapeld tot grana, stroma);
// Principles of Biology 5.12 (eigen DNA en ribosomen; granum = stapel thylakoïden).
// Bekende fouten: grana als hoge torens (± 5–10 thylakoïden, niet 30); los zwevende stapels zonder lamellen.
// Gebruik: chloroplastEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 88, grana = 7, licht = 0..1, seed }).
//   Ontwerpmaat 200 × 88 bij s = 1. Geeft ankerpunten terug: { mid, membraan, granum, thylakoide, stroma,
//   zetmeel, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function chloroplastEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 88, grana = 7, licht = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, opY = -B * 0.18, opA = A * 0.9, opB = B * 0.66;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const posG = []; for (let i = 0; i < grana; i++) { const row = i % 2; posG.push([-opA * 0.72 + opA * 1.44 * (i + 0.5) / grana + (hash(i + seed) - 0.5) * 6, opY + (row ? 0.28 : -0.12) * opB + (hash(i * 3 + seed) - 0.5) * 6]); }
  posG.sort((p, q) => p[1] - q[1]);
  const anker = { mid: P(0, 0), membraan: P(-A * 0.3, B * 0.98), granum: P(posG[3][0], posG[3][1] - 10), thylakoide: P(posG[2][0], posG[2][1]), stroma: P(A * 0.2, opY + opB * 0.55), zetmeel: P(-A * 0.4, opY + opB * 0.4), dna: P(A * 0.6, opY) };
  if (a <= 0.01) return anker;
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - u * u, 0.62); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64; for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * lang > 90;
  const kOpp = _mixHex(C.chloro, '#1A2740', 0.12), kTus = _mixHex(C.chloro, '#121A26', 0.6), kStroma = _mixHex(C.chloro, '#1A2740', 0.55), kTop = _mixHex(C.chloro, '#F2F2EE', 0.15), kZij = _mixHex(C.chloro, '#121A26', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.5); ctx.stroke();
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
  const ins = Math.max(3, B * 0.07); pad(opA - ins, opB - ins, opY); ctx.fillStyle = kStroma; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.2); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // stromalamellen tussen buren
  ctx.fillStyle = rgba(kTop, 0.8); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.7);
  for (let i = 0; i < posG.length; i++) for (let j = i + 1; j < posG.length; j++) { const [x1, y1] = posG[i], [x2, y2] = posG[j]; if (Math.hypot(x2 - x1, y2 - y1) > opA * 0.42 || hash(i * 7 + j + seed) < 0.35) continue;
    const h1 = -6 - hash(i + j) * 10, h2 = -4 - hash(i * j + 1) * 10; ctx.beginPath(); ctx.moveTo(x1, y1 + h1 - 1.6); ctx.lineTo(x2, y2 + h2 - 1.6); ctx.lineTo(x2, y2 + h2 + 1.6); ctx.lineTo(x1, y1 + h1 + 1.6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-A * 0.4, opY + opB * 0.4, A * 0.1, B * 0.13, 0.2, 0, 6.283); ctx.fillStyle = _mixHex(C.oker, '#F2F2EE', 0.25); ctx.fill(); ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.fillStyle = _mixHex(C.oker, '#121A26', 0.35); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc((hash(i * 9 + 2 + seed) - 0.5) * A * 1.3, opY + (hash(i * 9 + 4 + seed) - 0.5) * opB, 2.4, 0, 6.283); ctx.fill(); }
  if (groot) { ctx.beginPath(); ctx.ellipse(A * 0.62, opY + 2, 5.5, 4, 0.2, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  // grana als muntstapels (achter naar voor)
  for (let i = 0; i < posG.length; i++) { const [gxx, gyy] = posG[i]; const m = 4 + Math.floor(hash(i * 7 + 1 + seed) * 3), rx = 8 + hash(i * 3 + seed) * 2, ry = rx * 0.38, st = 3.4;
    for (let k = 0; k < m; k++) { const yy = gyy - k * st; ctx.beginPath(); ctx.ellipse(gxx, yy + 1.5, rx, ry, 0, 0, Math.PI); ctx.lineTo(gxx - rx, yy); ctx.ellipse(gxx, yy, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fillStyle = kZij; ctx.fill();
      ctx.beginPath(); ctx.ellipse(gxx, yy, rx, ry, 0, 0, 6.283); ctx.fillStyle = kTop; ctx.fill(); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.8); ctx.stroke(); } }
  ctx.restore();
  if (licht > 0.01) { ctx.globalAlpha *= licht; ctx.strokeStyle = lighten(C.goud, 0.35); ctx.lineWidth = lw(1.6);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); const sx = -A * 0.6 + i * 40 - 40 + u * 40, sy = -B - 70 + u * 60; ctx.save(); ctx.globalAlpha *= u < 0.8 ? 1 : (1 - u) / 0.2; ctx.beginPath(); for (let k = 0; k <= 14; k++) { const q = k / 14; ctx.lineTo(sx + q * 18 + Math.sin(q * 12) * 2.5, sy + q * 22 - Math.sin(q * 12) * 2); } ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const v = ((t * 0.3 + i / 3) % 1); const ox = A * 0.5 + v * 70, oy = B * 0.2 + i * 14 - 14 + v * 20; ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i === 1) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(ox + Math.cos(an) * 6, oy + Math.sin(an) * 6); } ctx.closePath(); ctx.strokeStyle = C.oker; ctx.lineWidth = lw(1.8); ctx.stroke(); }
      else { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 3.4, oy, 3.8, 0, 6.283); ctx.fill(); } } ctx.restore(); } }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// GOLGI-APPARAAT (stapel), doorsnede. Recept: een stapel van 4–6 platte, gebogen membraanzakken
// (cisternen), in het midden smal en aan de randen opgezwollen; de bolle kant (cis) is naar het ER en de kern
// gekeerd, de holle kant (trans) naar het celmembraan. Blaasjes uit het ER komen aan bij de ciskant en
// versmelten ermee; aan de transkant snoeren blaasjes af van de opgezwollen randen, met een eiwit erin dat
// een vertakte suikerketen draagt, en reizen naar het membraan. Cis iets lichter (ER-kleur erin), trans in
// de volle golgikleur. Maat ± 1 µm breed; blaasje ± 50–100 nm.
// Bron: OpenStax Biology 2e § 4.4 (reeks platte membraanzakken; de kant het dichtst bij het ER heet cis;
// ER-blaasjes versmelten met de ciskant; blaasjes van de transkant versmelten met het plasmamembraan).
// Bekende fouten: losse, rechte streepjes; geen richting (cis/trans); blaasjes die zomaar verdwijnen.
// Gebruik: golgiStapel(ctx, x, y, s, { a, t, rot = 0, n = 5, blaasjes = true }). Lokaal: cis onder (+y),
//   trans boven (−y); draai met rot zodat +y naar de kern wijst. Ontwerpmaat 260 × 160 bij s = 1.
//   Animatie met t (periode 6 s): ER-blaasje komt aan en versmelt (cis), een blaasje snoert af (trans).
// Geeft ankerpunten terug: { stapel, cis, trans, blaasjeIn, blaasjeUit }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
function golgiStapel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, n = 5, blaasjes = true } = o;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const pitch = 21, bow = 18, Wk = [104, 120, 126, 118, 98, 84], yk = (k) => ((n - 1) / 2 - k) * pitch;
  const cy = (k, lx) => yk(k) + bow * (1 - Math.pow(lx / Wk[k], 2));
  const th = (k, lx) => 3 + 4.6 * Math.pow(Math.min(1, Math.abs(lx) / Wk[k]), 6);
  const u = ((t % 6) + 6) % 6 / 6;
  // ER-blaasje (cis): reist 0–0,45, versmelt 0,45–0,6
  const eIn = ease(clamp(u / 0.45, 0, 1)), vIn = [lerp(-70, -24, eIn), lerp(118, cy(0, -24) + th(0, -24) + 6, eIn)], rIn = 6.5 * (1 - ease(clamp((u - 0.45) / 0.15, 0, 1)));
  // transblaasje: groeit aan de rand 0,25–0,55, laat los en reist 0,55–1
  const kt = n - 1, rx = Wk[kt] - 2, ry = cy(kt, rx); const groei = ease(clamp((u - 0.25) / 0.3, 0, 1)), weg = ease(clamp((u - 0.55) / 0.45, 0, 1));
  const vUit = [lerp(rx + 8, rx + 70, weg), lerp(ry - 9, ry - 95, weg)], rUit = 7 * groei;
  const anker = { stapel: P(0, cy(2, 0)), cis: P(0, cy(0, 0) + 10), trans: P(0, cy(kt, 0) - 8), blaasjeIn: P(vIn[0], vIn[1]), blaasjeUit: P(vUit[0], vUit[1]) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const kleur = (k) => _mixHex(_mixHex(C.golgi, C.er, 0.4 * (1 - k / (n - 1))), '#1A2740', 0.3), rand = (k) => lighten(_mixHex(C.golgi, C.er, 0.4 * (1 - k / (n - 1))), 0.3);
  const cis = (k) => { const W = Wk[k], N = 40; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const lx = -W + 2 * W * i / N; ctx.lineTo(lx, cy(k, lx) - th(k, lx)); }
    const ce = cy(k, W), te = th(k, W); ctx.arc(W, ce, te, -Math.PI / 2 - 0.2, Math.PI / 2 + 0.2);
    for (let i = N; i >= 0; i--) { const lx = -W + 2 * W * i / N; ctx.lineTo(lx, cy(k, lx) + th(k, lx)); }
    const cb = cy(k, -W); ctx.arc(-W, cb, te, Math.PI / 2 - 0.2, Math.PI * 1.5 + 0.2); ctx.closePath(); };
  for (let k = 0; k < n; k++) { cis(k); ctx.fillStyle = kleur(k); ctx.fill(); ctx.strokeStyle = rand(k); ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // eiwit met suikerketen (klein): kraaltjes + vertakt groen takje
  const lading = (px, py, sc) => { ctx.fillStyle = lighten(C.enzym, 0.4); for (let b = 0; b < 5; b++) { ctx.beginPath(); ctx.arc(px - 2.4 * sc + Math.cos(b * 1.9) * 1.8 * sc, py + Math.sin(b * 1.9) * 1.8 * sc, 0.9 * sc, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = C.groen; ctx.lineWidth = lw(0.9); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4 * sc, py - 3.2 * sc); ctx.moveTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4.3 * sc, py - 0.4 * sc); ctx.stroke(); };
  if (blaasjes) {
    const ves = (px, py, r, vul, ring) => { ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = ring; ctx.lineWidth = lw(1.3); ctx.stroke(); };
    // vaste blaasjes rond de stapel
    for (const [px, py] of [[40, 100], [-108, 74], [96, 82]]) ves(px, py, 5.5, _mixHex(C.er, '#1A2740', 0.6), C.er);
    for (const [px, py] of [[-Wk[kt] - 10, yk(kt) - 2], [-40, yk(kt) - 22], [30, yk(kt) - 34], [Wk[kt - 1] + 12, yk(kt - 1) + 2]]) { ves(px, py, 6.5, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5) lading(px, py, 1); }
    // ER-blaasje komt aan en versmelt
    if (rIn > 0.4) ves(vIn[0], vIn[1], rIn, _mixHex(C.er, '#1A2740', 0.6), C.er);
    // afsnoerend transblaasje (met nek zolang het vastzit)
    if (rUit > 0.4) { if (weg < 0.05) { ctx.beginPath(); ctx.moveTo(rx, ry - 3); ctx.quadraticCurveTo(rx + 5, ry - 6, vUit[0], vUit[1]); ctx.strokeStyle = rand(kt); ctx.lineWidth = lw(3 * (1 - groei * 0.5)); ctx.stroke(); }
      ves(vUit[0], vUit[1], rUit, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5 && rUit > 5) lading(vUit[0], vUit[1], 1); }
  }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant A met aanpassingen (zie wat.md).
// =====================================================================================
// KERN MET KERNENVELOP EN KERNPORIËN, doorsnede. Recept: de kern is rond (± 1/3 van de celdiameter); de
// envelop bestaat uit twee membranen (buiten en binnen) met een smalle ruimte ertussen; bij elke kernporie
// lopen buiten- en binnenmembraan in elkaar over (de rand is rond), en in de opening zit het porie-complex
// (twee blokjes aan weerszijden, draadjes naar het cytoplasma en een 'mandje' naar binnen). Op het buitenste
// membraan zitten hier en daar ribosomen (het loopt door in het ruw ER). Binnenin: chromatine als losse,
// zacht kronkelende draden, dichter tegen de rand behalve bij de poriën; een donkere nucleolus.
// mRNA (dun, sliertig, enkelstrengs) schuift met het 5'-eind voorop door een porie naar buiten.
// Bron: OpenStax Biology 2e fig. 4.10 (twee fosfolipide-dubbellagen, poriën laten stoffen erin en eruit,
// nucleolus, chromatine in het nucleoplasma); § 4.4 (ER-membraan doorlopend met de kernenvelop).
// Bekende fouten: de envelop als één lijn; poriën als stippellijn zonder dat de membranen samenkomen;
// DNA als zigzag of veer; mRNA als staafje.
// Gebruik: kernEnvelopPorie(ctx, x, y, s, { a, t, r = 150, porien = 14, mrna = -1 (0..1 = voortgang),
//   mrnaPorie = 2, nucleolus = true, ribo = true, tusKleur }). Ontwerpmaat Ø 300 bij s = 1.
// tusKleur = kleur van de ruimte tussen de kernmembranen (geef de ER-lumenkleur mee, dan loopt het lumen
//   zichtbaar door; celDier doet dat). Perinucleaire ruimte: gap = max(7, 0,075 × r).
// Geeft ankerpunten terug: { kern, envelop, porie, porien[], nucleolus, chromatine, mrna, tussenruimte }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function kernEnvelopPorie(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r = 150, porien = 14, mrna = -1, mrnaPorie = 2, nucleolus = true, ribo = true } = o;
  const gap = Math.max(7, r * 0.075), off = 0.31; const pf = Array.from({ length: porien }, (_, i) => off + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / porien * 6.283);
  const P = (lx, ly) => [x + lx * s, y + ly * s]; const fp = pf[mrnaPorie % porien];
  const anker = { kern: P(0, 0), envelop: P(Math.cos(-1.9) * r, Math.sin(-1.9) * r), porie: P(Math.cos(fp) * r, Math.sin(fp) * r), porien: pf.map(f => P(Math.cos(f) * (r - 4), Math.sin(f) * (r - 4))),
    nucleolus: P(-r * 0.22, r * 0.12), chromatine: P(r * 0.35, r * 0.3), mrna: P(Math.cos(fp) * r * 1.35, Math.sin(fp) * r * 1.35), tussenruimte: P(Math.cos(2.6) * (r - 4), Math.sin(2.6) * (r - 4)) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * r > 90;
  const kPlasma = _mixHex(C.kern, '#2A3448', 0.45), kTus = o.tusKleur || _mixHex(C.kern, '#121A26', 0.72), kRand = C.kernR, kChrom = _mixHex(C.kernR, C.kern, 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // nucleoplasma
  ctx.beginPath(); ctx.arc(0, 0, r - gap, 0, 6.283); ctx.fillStyle = kPlasma; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - gap - 1, 0, 6.283); ctx.clip();
  // heterochromatine: dichtere vlekken tegen het binnenmembraan, niet voor de poriën
  for (let i = 0; i < 40; i++) { const f = hash(i * 7 + 1) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.12)) continue;
    ctx.beginPath(); ctx.ellipse(Math.cos(f) * (r - gap - 5), Math.sin(f) * (r - gap - 5), 9 + hash(i) * 7, 4, f + 1.57, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.75); ctx.fill(); }
  // chromatine: losse, zacht kronkelende draden
  if (groot) { ctx.strokeStyle = rgba(kChrom, 0.55); ctx.lineWidth = lw(1.5);
    for (let k = 0; k < 14; k++) { let px = (hash(k * 3) * 2 - 1) * r * 0.55, py = (hash(k * 3 + 1) * 2 - 1) * r * 0.55, an = hash(k * 3 + 2) * 6.283; ctx.beginPath(); ctx.moveTo(px, py);
      for (let j = 0; j < 30; j++) { an += Math.sin(j * 0.5 + k * 2 + t * 0.15) * 0.35; px += Math.cos(an) * 4.4; py += Math.sin(an) * 4.4; const d = Math.hypot(px, py); if (d > r * 0.72) { an = Math.atan2(-py, -px) + Math.sin(j + k) * 0.6; } ctx.lineTo(px, py); } ctx.stroke(); } }
  // nucleolus
  if (nucleolus) { ctx.beginPath(); for (let i = 0; i <= 36; i++) { const f = i / 36 * 6.283, rr = r * 0.25 * (1 + 0.07 * Math.sin(f * 3 + 1) + 0.05 * Math.sin(f * 5)); const px = -r * 0.22 + Math.cos(f) * rr, py = r * 0.12 + Math.sin(f) * rr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.closePath(); ctx.fillStyle = _mixHex(C.kern, '#121A26', 0.5); ctx.fill(); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = lw(1); ctx.stroke(); if (groot) { ctx.fillStyle = rgba(C.kernR, 0.35); for (let i = 0; i < 30; i++) { const f = hash(i * 11) * 6.283, d = Math.sqrt(hash(i * 11 + 1)) * r * 0.2; ctx.beginPath(); ctx.arc(-r * 0.22 + Math.cos(f) * d, r * 0.12 + Math.sin(f) * d, 1.4, 0, 6.283); ctx.fill(); } } }
  ctx.restore();
  // envelop: stukken dubbel membraan tussen de poriën, met ronde rand waar buiten en binnen samenkomen
  const gh = 5.5 / r; const rc = r - gap / 2;
  for (let i = 0; i < porien; i++) { const f0 = pf[i] + gh, f1 = pf[(i + 1) % porien] + (i === porien - 1 ? 6.283 : 0) - gh;
    ctx.beginPath(); ctx.arc(0, 0, r, f0, f1); ctx.arc(Math.cos(f1) * rc, Math.sin(f1) * rc, gap / 2, f1, f1 + Math.PI); ctx.arc(0, 0, r - gap, f1, f0, true); ctx.arc(Math.cos(f0) * rc, Math.sin(f0) * rc, gap / 2, f0 + Math.PI, f0 + 2 * Math.PI); ctx.closePath();
    ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // porie-complexen
  for (let i = 0; i < porien; i++) { const f = pf[i], c = Math.cos(f), sn = Math.sin(f), tx = -sn, ty = c;
    ctx.fillStyle = '#B4A8E0'; for (const sg of [-1, 1]) { const bx = c * rc + tx * sg * (gh * r + 1.5), by = sn * rc + ty * sg * (gh * r + 1.5); ctx.beginPath(); ctx.ellipse(bx, by, gap * 0.8, 2.8, f, 0, 6.283); ctx.fill(); }
    if (groot) { ctx.strokeStyle = rgba('#B4A8E0', 0.8); ctx.lineWidth = lw(1);
      for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(c * (r + 1) + tx * sg * 4, sn * (r + 1) + ty * sg * 4); ctx.lineTo(c * (r + 9) + tx * sg * 6, sn * (r + 9) + ty * sg * 6); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(c * (r - gap) + tx * 5, sn * (r - gap) + ty * 5); ctx.lineTo(c * (r - gap - 10) + tx * 2.5, sn * (r - gap - 10) + ty * 2.5); ctx.lineTo(c * (r - gap - 10) - tx * 2.5, sn * (r - gap - 10) - ty * 2.5); ctx.lineTo(c * (r - gap) - tx * 5, sn * (r - gap) - ty * 5); ctx.stroke(); } }
  // ribosomen op het buitenste kernmembraan
  if (ribo && groot) { ctx.fillStyle = C.ribo; for (let i = 0; i < 70; i++) { const f = hash(i * 13 + 5) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.07)) continue; ctx.beginPath(); ctx.arc(Math.cos(f) * (r + 3.6), Math.sin(f) * (r + 3.6), 1.9, 0, 6.283); ctx.fill(); } }
  // mRNA door een porie naar buiten (5'-eind voorop)
  if (mrna >= 0) { const c = Math.cos(fp), sn = Math.sin(fp), tx = -sn, ty = c; const pad = [];
    for (let i = 0; i <= 60; i++) { const u = i / 60; const d = lerp(r * 0.2, r - gap / 2, u); pad.push([c * d + tx * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u), sn * d + ty * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u)]); }
    for (let i = 1; i <= 50; i++) { const u = i / 50; const d = r - gap / 2 + u * r * 0.75; pad.push([c * d + tx * Math.sin(u * 9) * 12 * u, sn * d + ty * Math.sin(u * 9) * 12 * u]); }
    const cum = [0]; for (let i = 1; i < pad.length; i++) cum.push(cum[i - 1] + Math.hypot(pad[i][0] - pad[i - 1][0], pad[i][1] - pad[i - 1][1]));
    const tot = cum[cum.length - 1], Ls = r * 0.95, kop = lerp(Ls * 0.95, tot, clamp(mrna, 0, 1)), staart = kop - Ls;
    const op = (dd) => { let i = 1; while (i < cum.length - 1 && cum[i] < dd) i++; const u = (dd - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]); return [lerp(pad[i - 1][0], pad[i][0], u), lerp(pad[i - 1][1], pad[i][1], u)]; };
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(2); ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [px, py] = op(Math.max(0, staart) + (kop - Math.max(0, staart)) * k / 60); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const [hx, hy] = op(kop); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, 6.283); ctx.fill();
    const m = op(kop - Ls * 0.3); anker.mrna = P(m[0], m[1]); }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant B, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// MITOCHONDRION (echt), ruimtelijk opengesneden. Recept: langwerpig, ± 0,5–1 µm breed en 1–10 µm lang
// (hier 2,3 : 1). We kijken schuin van boven in een mitochondrion waarvan de bovenste helft is weggesneden:
// de snijrand laat de twee membranen zien (buiten glad, binnen met smalle tussenruimte), en in de holte staan
// de cristae als platen dwars op de lengteas die vanaf de wand de matrix in steken, niet allemaal even ver.
// Licht van linksboven: elke plaat heeft één schaduwzijde (vlakke tint, geen verloop). In de matrix eigen
// DNA-ringetjes en ribosomen. Deling: insnoering in het midden tot twee helften.
// Bron: OpenStax Biology 2e fig. 4.13 (binnenmembraan met cristae, matrix); Principles of Biology 5.12
// (eigen DNA en ribosomen); Digital Histology (vorm variabel, tot 10 µm lang); BioNumbers 100436 (± 1 µm).
// Bekende fouten: platen die los in de holte zweven; een snijrand met één lijn (één membraan); te veel
// glans of een kleurverloop (Part C: geen verloop).
// Gebruik: mitochondrionEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 86, cristae = 11, deling = 0..1,
//   stoffen = 0..1, seed }). Ontwerpmaat 200 × 86 bij s = 1.
// Geeft ankerpunten terug: { mid, buiten, binnen, crista, matrix, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function mitochondrionEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 86, cristae = 11, deling = 0, stoffen = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, n = 2.4, d = clamp(deling, 0, 1);
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const opY = -B * 0.2, opA = A * 0.9, opB = B * 0.66;
  const anker = { mid: P(0, 0), buiten: P(0, B), binnen: P(-A * 0.5, opY - opB + 5), crista: P(-A * 0.1, opY), matrix: P(A * 0.3, opY + opB * 0.4), dna: P(A * 0.5, opY) };
  if (a <= 0.01) return anker;
  const knijp = (lx, aa) => 1 - d * 0.97 * Math.exp(-Math.pow(lx / (aa * 0.17), 2));
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - Math.pow(u, n), 1 / n) * knijp(lx, aa); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64;
    for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.7) / s;
  const kOpp = C.mito, kTus = _mixHex(C.mito, '#1A2740', 0.55), kHol = _mixHex(C.mito, '#1A2740', 0.38), kPlaat = _mixHex(C.mito, '#F2F2EE', 0.12), kSchaduw = _mixHex(C.mito, '#1A2740', 0.22);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // buitenkant (onderste, naar ons toe gekeerde helft van de wand)
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.6); ctx.stroke();
  // snijvlak: buitenmembraan, tussenruimte, binnenmembraan
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.5); ctx.stroke();
  const ins = Math.max(3.5, B * 0.09);
  pad(opA - ins, opB - ins, opY); ctx.fillStyle = kHol; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // achterwand: lichtere strook bovenin (de binnenkant van de wand die we zien)
  pad(opA - ins, opB - ins, opY - (opB - ins) * 0.55); ctx.fillStyle = _mixHex(C.mito, '#1A2740', 0.3); ctx.fill();
  if (s * lang > 90) for (let i = 0; i < 22; i++) { const lx = (hash(i * 7 + seed) * 2 - 1) * opA * 0.85, ly = opY + (hash(i * 7 + 3 + seed) * 2 - 1) * opB * 0.6; const w = wander(i + 300 + seed, t, 1.4, 0.6);
    ctx.beginPath(); ctx.arc(lx + w.x, ly + w.y, 1.4, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.5); ctx.fill(); }
  // cristae als platen dwars op de as: voet op de wand (onder), steken omhoog de matrix in
  const nc = s * lang < 60 ? Math.max(4, Math.round(cristae / 2)) : cristae;
  for (let i = 0; i < nc; i++) {
    const lx = -opA + ins + (2 * opA - 2 * ins) * (i + 0.5 + (hash(i * 13 + seed) - 0.5) * 0.3) / nc;
    const hb = se(opA - ins, opB - ins, lx); if (hb < opB * 0.35) continue;
    const vanOnder = (i + seed) % 3 !== 1; const hoog = hb * 2 * (0.62 + 0.3 * hash(i * 5 + seed));
    const y0 = vanOnder ? opY + hb + 2 : opY - hb - 2, y1 = vanOnder ? y0 - hoog : y0 + hoog;
    const w = Math.max(3.2, lang / 40), sk = (hash(i * 9 + seed) - 0.5) * 6 + Math.sin(t * 0.5 + i) * 0.6;
    ctx.beginPath(); ctx.moveTo(lx - w, y0); ctx.lineTo(lx - w * 0.8 + sk, y1); ctx.quadraticCurveTo(lx + sk, y1 + (vanOnder ? -w : w), lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath();
    ctx.fillStyle = kPlaat; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx + w * 0.15, y0); ctx.lineTo(lx + w * 0.15 + sk, y1 + (vanOnder ? 1 : -1) * w * 0.4); ctx.lineTo(lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath(); ctx.fillStyle = kSchaduw; ctx.fill();
  }
  if (s * lang > 90) for (const [dx, r] of [[A * 0.52, 6], [-A * 0.62, 5]]) { ctx.beginPath(); ctx.ellipse(dx, opY + 4, r, r * 0.75, 0.3, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  ctx.restore();
  // stoffen erin en eruit
  if (stoffen > 0.01) { ctx.globalAlpha *= stoffen;
    for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const inX = lerp(-A - 60, -A * 0.4, u), inY = opY + (i - 1.5) * 14;
      ctx.save(); ctx.globalAlpha *= u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15;
      if (i % 2) { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(inX + dd * 3.2, inY, 3.6, 0, 6.283); ctx.fill(); } }
      else { ctx.strokeStyle = C.oker; ctx.lineWidth = lw(2.4); ctx.beginPath(); ctx.moveTo(inX - 8, inY + 2); ctx.lineTo(inX, inY - 3); ctx.lineTo(inX + 8, inY + 2); ctx.stroke(); } ctx.restore();
      const v = ((t * 0.25 + i / 4 + 0.5) % 1); const ox = lerp(A * 0.4, A + 70, v), oy = opY + (i - 1.5) * 16;
      ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i % 2) { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(ox - 6, oy, 4, 0, 6.283); ctx.fill(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(ox + 2 + k * 5.5, oy, 2.4, 0, 6.283); ctx.fill(); } }
      else { ctx.fillStyle = C.mens; ctx.beginPath(); ctx.arc(ox, oy, 3.4, 0, 6.283); ctx.fill(); ctx.fillStyle = lighten(C.teal, 0.2); for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 6, oy, 3, 0, 6.283); ctx.fill(); } }
      ctx.restore(); }
  }
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant A met aanpassingen (zie wat.md).
// =====================================================================================
// PLANTENCEL (Micro-look), doorsnede. Recept: hoekige cel met afgeronde hoeken (in een weefsel drukken
// cellen tegen elkaar), stevige celwand van cellulose (buitenrand = middenlamel, gedeeld met de buurcel;
// smalle kanaaltjes = plasmodesmata), daarbinnen het celmembraan dat tegen de wand gedrukt ligt.
// Plasmodesmata (inbouw 28 okt 2026): kanaaltjes dwars door de wand, bekleed met het celmembraan dat erdoorheen
// loopt, met in het midden het ER-buisje (desmotubulus); bij plasmolyse blijft het membraan daar aan de wand vast
// (dun draadje). Bron: FSU Molecular Expressions 'Plasmodesmata'; Bayer & Benitez-Alfonso, Annu. Rev. Plant Biol.
// 2024 ('membrane-lined conduits', desmotubulus ± 15 nm, primaire wand ± 100–200 nm). Een grote
// centrale vacuole vult het grootste deel; het cytoplasma is een dunne rand met de bladgroenkorrels
// (± 1/12 van de cellengte, lensvorm, langs de wand), een paar mitochondriën en de kern, die in de rand ligt
// en de vacuole een deukje geeft. Cytoplasmastroming: de korrels schuiven langzaam langs de rand (t).
// Plasmolyse (0..1): de vacuole verliest water, de protoplast laat los van de wand en rondt zich af; tussen
// wand en membraan komt de buitenvloeistof. De wand houdt zijn vorm.
// Bron: OpenStax Biology 2e fig. 4.7 (celwand, bladgroenkorrels, plastiden, centrale vacuole), fig. 4.16
// (bladgroenkorrel); C9 van de prompt (vacuole vult het meeste, cytoplasma als dunne rand).
// Bekende fouten: een rechthoek met kleine vacuole in het midden; kern in het midden van de vacuole;
// bij plasmolyse krimpt de wand mee; korrels die buiten het membraan steken; plasmodesmata als streepjes
// (geen kanaal met membraan).
// Gebruik: plantencel(ctx, x, y, s, { a, t, plasmolyse = 0..1, nadruk = null | 'wand'|'membraan'|'vacuole'|
//   'kern'|'bladgroen'|'mito'|'cytoplasma', stroom = true }). Ontwerpmaat 640 × 460 bij s = 1.
// Geeft ankerpunten terug: { cel, celwand, celmembraan, vacuole, kern, bladgroenkorrel, cytoplasma,
//   plasmodesma, mito, ruimte }.
// Vereist: chloroplastEcht, mitochondrionEcht, kernEnvelopPorie (zelfde ronde); uit lib.js: C, rgba, lighten,
//   hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
const _PC_HOEK = [[-300, -165], [-70, -212], [240, -196], [312, 4], [262, 208], [-40, 222], [-286, 172], [-322, 2]];
function _pcVorm(hoek, N) { // afgeronde veelhoek (Chaikin), gelijk verdeeld in N punten
  let p = hoek.map(q => q.slice()); for (let it = 0; it < 3; it++) { const n = []; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; const k = it === 0 ? 0.12 : 0.25; n.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k)], [lerp(a[0], b[0], 1 - k), lerp(a[1], b[1], 1 - k)]); } p = n; }
  const cum = [0]; for (let i = 1; i <= p.length; i++) { const a = p[i - 1], b = p[i % p.length]; cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); } const tot = cum[p.length]; const out = [];
  for (let k = 0; k < N; k++) { const d = tot * k / N; let i = 1; while (cum[i] < d) i++; const u = (d - cum[i - 1]) / (cum[i] - cum[i - 1]); const a = p[i - 1], b = p[i % p.length]; out.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u)]); } return out; }
function _pcNormaal(pts) { return pts.map((p, i) => { const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length]; let nx = b[1] - a[1], ny = -(b[0] - a[0]); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (nx * p[0] + ny * p[1] < 0) { nx = -nx; ny = -ny; } return [nx, ny]; }); }
function plantencel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, plasmolyse = 0, nadruk = null, stroom = true } = o; const pl = ease(clamp(plasmolyse, 0, 1));
  const N = 200, wand = 15; const buiten = _pcVorm(_PC_HOEK, N), nB = _pcNormaal(buiten);
  const binnen = buiten.map((p, i) => [p[0] - nB[i][0] * wand, p[1] - nB[i][1] * wand]);
  const RXp = 205, RYp = 140, cxp = 10, cyp = 0;
  const proto = binnen.map((p, i) => { const q = [p[0] - nB[i][0] * 1.5, p[1] - nB[i][1] * 1.5]; const th = Math.atan2(q[1] - cyp, q[0] - cxp); const re = 1 / Math.sqrt(Math.cos(th) ** 2 / (RXp * RXp) + Math.sin(th) ** 2 / (RYp * RYp)); return [lerp(q[0], cxp + Math.cos(th) * re, pl), lerp(q[1], cyp + Math.sin(th) * re, pl)]; });
  const nP = _pcNormaal(proto); const iK = Math.round(N * 0.58); // kern in de rand, linksonder
  const rand = (i) => { const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); return 26 + 4 * pl + 62 * Math.exp(-Math.pow(d / 10, 2)); };
  const vac = proto.map((p, i) => [p[0] - nP[i][0] * rand(i), p[1] - nP[i][1] * rand(i)]);
  const kernP = [proto[iK][0] - nP[iK][0] * 46, proto[iK][1] - nP[iK][1] * 46];
  const S = (p) => [x + p[0] * s, y + p[1] * s];
  const nC = 14, chl = []; for (let k = 0; k < nC; k++) { let f = (k + 0.5) / nC + (stroom ? t * 0.006 : 0); f = ((f % 1) + 1) % 1; const i = Math.floor(f * N); const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); if (d < 14) continue;
    const p = proto[i], n = nP[i], tg = Math.atan2(n[0], -n[1]); chl.push([p[0] - n[0] * 14, p[1] - n[1] * 14, tg]); }
  const iM = [Math.round(N * 0.08), Math.round(N * 0.33), Math.round(N * 0.83)].map(i => { const p = proto[i], n = nP[i]; return [p[0] - n[0] * 13, p[1] - n[1] * 13, Math.atan2(n[0], -n[1])]; });
  const PDI = [18, 26, 68, 118, 126, 166], PD = PDI.map(i => buiten[i]); // in paren, zoals ze vaak in groepjes (putvelden) liggen
  const iR = Math.round(N * 0.23);
  const anker = { cel: S([0, 0]), celwand: S(buiten[Math.round(N * 0.12)]), celmembraan: S(proto[Math.round(N * 0.95)]), vacuole: S([40, -10]), kern: S(kernP), bladgroenkorrel: S(chl[2] || [0, 0]), cytoplasma: S([(proto[iR][0] + vac[iR][0]) / 2, (proto[iR][1] + vac[iR][1]) / 2]),
    plasmodesma: S(PD[1]), mito: S(iM[1]), ruimte: S([(binnen[iR][0] + proto[iR][0]) / 2, (binnen[iR][1] + proto[iR][1]) / 2]) };
  if (a <= 0.01) return anker;
  const A = (n) => (nadruk === null || nadruk === n) ? 1 : 0.35; const lw = (px) => Math.max(px * s, 0.6) / s;
  const pad = (lst) => { ctx.beginPath(); lst.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // celwand: cellulose, middenlamel aan de buitenrand, plasmodesmata als kanaaltjes
  ctx.save(); ctx.globalAlpha *= A('wand'); ctx.beginPath(); buiten.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); binnen.slice().reverse().forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  ctx.fillStyle = _mixHex(C.groen, '#1A2740', 0.5); ctx.fill('evenodd');
  ctx.strokeStyle = rgba(C.groen, 0.35); ctx.lineWidth = lw(0.8); for (const f of [0.35, 0.65]) { pad(buiten.map((p, i) => [p[0] - nB[i][0] * wand * f, p[1] - nB[i][1] * wand * f])); ctx.stroke(); }
  pad(buiten); ctx.strokeStyle = _mixHex(C.groen, '#F2F2EE', 0.2); ctx.lineWidth = lw(2); ctx.stroke(); pad(binnen); ctx.strokeStyle = lighten(C.groen, 0.1); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.restore();
  // ruimte tussen wand en protoplast (buitenvloeistof bij plasmolyse)
  pad(binnen); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.82); ctx.fill();
  // protoplast: cytoplasma, dan vacuole
  ctx.save(); ctx.globalAlpha *= A('cytoplasma'); pad(proto); ctx.fillStyle = '#2C3A52'; ctx.fill(); ctx.restore();
  ctx.save(); pad(proto); ctx.clip();
  for (let i = 0; i < 70; i++) { const k = Math.floor(hash(i * 3) * N), dd = 4 + hash(i * 3 + 1) * Math.max(4, rand(k) - 8); const p = proto[k], n = nP[k]; ctx.beginPath(); ctx.arc(p[0] - n[0] * dd, p[1] - n[1] * dd, 1.3, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.14); ctx.fill(); }
  ctx.save(); ctx.globalAlpha *= A('vacuole'); pad(vac); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.62); ctx.fill(); ctx.strokeStyle = lighten(C.teal, 0.25); ctx.lineWidth = lw(1.4); ctx.stroke(); ctx.restore();
  ctx.restore();
  ctx.restore();
  // organellen in de rand (binnen het membraan)
  iM.forEach((m, k) => { const p = S(m); mitochondrionEcht(ctx, p[0], p[1], s, { a: a * A('mito'), t, rot: m[2], lang: 26, dik: 12, cristae: 4, seed: k }); });
  chl.forEach((c, k) => { const p = S(c); chloroplastEcht(ctx, p[0], p[1], s * 0.27, { a: a * A('bladgroen'), t, rot: c[2], seed: k }); });
  const pk = S(kernP); kernEnvelopPorie(ctx, pk[0], pk[1], s, { a: a * A('kern'), t, r: 40, porien: 10, ribo: false });
  // celmembraan (dubbele lijn), tegen de wand of losgelaten
  ctx.save(); ctx.globalAlpha *= a * A('membraan'); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.3);
  for (const d of [0, 3.2]) { pad(proto.map((p, i) => [p[0] - nP[i][0] * d, p[1] - nP[i][1] * d])); ctx.stroke(); } ctx.restore();
  // plasmodesmata: kanaaltje dwars door de wand tot de middenlamel (daar begint de buurcel), bekleed met het celmembraan
  // dat erdoorheen loopt, met het ER-buisje (desmotubulus) in het midden. Bij plasmolyse blijft het membraan in het
  // kanaaltje aan de wand vastzitten: een dun draadje naar de losgelaten protoplast.
  ctx.save(); ctx.globalAlpha *= a * A('wand'); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  PDI.forEach((i) => { const n = nB[i], tx = -n[1], ty = n[0], w = 4.2; const bi = binnen[i], pr = proto[i], bu = buiten[i];
    const van = pl < 0.05 ? [pr[0] - nP[i][0] * 3.2, pr[1] - nP[i][1] * 3.2] : bi;
    ctx.beginPath(); ctx.moveTo(van[0] + tx * w, van[1] + ty * w); ctx.lineTo(bu[0] + tx * w, bu[1] + ty * w); ctx.lineTo(bu[0] - tx * w, bu[1] - ty * w); ctx.lineTo(van[0] - tx * w, van[1] - ty * w); ctx.closePath(); ctx.fillStyle = '#2C3A52'; ctx.fill();
    ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.1); for (const sg of [1, -1]) { ctx.beginPath(); ctx.moveTo(van[0] + sg * tx * w, van[1] + sg * ty * w); ctx.lineTo(bu[0] + sg * tx * w, bu[1] + sg * ty * w); ctx.stroke(); }
    ctx.strokeStyle = rgba(C.er, 0.75); ctx.lineWidth = lw(1.3); ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.lineTo(bu[0], bu[1]); ctx.stroke();
    if (pl >= 0.05) { ctx.strokeStyle = C.er; ctx.lineWidth = lw(0.9); ctx.beginPath(); ctx.moveTo(bi[0], bi[1]); ctx.quadraticCurveTo((bi[0] + pr[0]) / 2 + tx * 3, (bi[1] + pr[1]) / 2 + ty * 3, pr[0], pr[1]); ctx.stroke(); } });
  ctx.restore();
  return anker;
}

// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// RUW ER (met glad ER), doorsnede rond de kern — ronde 2. Recept: platte membraanzakken (cisternen) die in
// nette lagen om de kern buigen; de ruimte binnenin (lumen) loopt via brede, zacht uitlopende halsjes door
// in de ruimte tussen de twee kernmembranen (perinucleaire ruimte): het buitenste kernmembraan gaat over in
// het eerste ER-blad. Ribosomen zitten vast óp het membraan aan de cytoplasmakant (koepeltje met de platte
// kant tegen het membraan; op beide vlakken van een blad en op het buitenste kernmembraan), nooit in het
// lumen. Aan het eind gaat het ruw ER over in het glad ER: buisjes zonder ribosomen. Polysoom: een mRNA-draad
// met een rij ribosomen; de eiwitketen groeit door het membraan het lumen in en krijgt een suikerketen.
// Maten: lumen ± 30–60 nm, ribosoom ± 25 nm; hier lumen 10, ribosoom 5 ontwerpeenheden.
// Bron: OpenStax Biology 2e § 4.4 (ER-membraan doorlopend met de kernenvelop; ribosomen op de cytoplasmakant;
// eiwitten vouwen en krijgen zijketens in het lumen; glad ER doorlopend met ruw ER, weinig of geen ribosomen).
// Bekende fouten: ribosomen als losse stippen tussen de zakken of in het lumen; dwarsbalkjes tussen bladen;
// ER los van de kern; glad ER los in de cel.
// Gebruik: ruwER(ctx, x, y, s, { a, t, r0 = 120, gap = 8, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true,
//   envelop = kern, kernVlak = envelop, aansl = [hoeken], glad = 1, keten = 0, rib = true }).
//   (x, y) = midden van de kern, r0 = straal buitenste kernmembraan, gap = breedte perinucleaire ruimte (zet
//   hem gelijk aan die van kernEnvelopPorie), envelop = teken zelf een stuk kernenvelop (false als de kern al
//   getekend is: dan alleen de halsjes), aansl = hoeken van de halsjes kern → blad 0.
// Geeft ankerpunten terug: { ruw, glad, lumen, ribosoom, aansluiting, keten }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function ruwER(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r0 = 120, gap = 8, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1, keten = 0, rib = true } = o;
  const envelop = o.envelop ?? kern, kernVlak = o.kernVlak ?? envelop;
  const aansl = o.aansl ?? (kern ? [a0 + 0.16, lerp(a0, a1, 0.47), lerp(a0, a1, 0.82)] : []);
  const th = 5, pitch = 25, rk = (k) => r0 + 18 + k * pitch;
  const wob = (k, f) => 1.2 * Math.sin(f * 5 + k * 1.3);
  const span = (k) => [a0 + 0.03 * k + hash(k * 3 + 1) * 0.04, a1 - hash(k * 3 + 2) * 0.06];
  const pol = (r, f) => [x + Math.cos(f) * r * s, y + Math.sin(f) * r * s]; const am = (a0 + a1) / 2;
  const anker = { ruw: pol(rk(1), am + 0.15), glad: pol(r0 + 17 + pitch * 1.5, a1 + 0.38 * glad), lumen: pol(rk(2), am - 0.2), ribosoom: pol(rk(lagen - 1) + th + 3, am - 0.35),
    aansluiting: pol(r0 + 8, aansl[0] ?? a0), keten: pol(rk(lagen - 1) + 12, am) };
  if (a <= 0.01) return anker;
  const kLumen = _mixHex(C.er, '#1A2740', 0.72), kRand = C.er;
  const lw = (px) => Math.max(px * s, 0.6) / s; const L = (r, f) => [Math.cos(f) * r, Math.sin(f) * r];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const thk = (k) => (keten > 0 && k === lagen - 1) ? th * 1.3 : th;
  const cisPad = (k, f0, f1) => { const T = thk(k); const N = Math.max(8, Math.round((f1 - f0) * rk(k) / 5)); ctx.beginPath();
    for (let i = 0; i <= N; i++) { const f = lerp(f0, f1, i / N); ctx.lineTo(...L(rk(k) + wob(k, f) + T, f)); }
    const e1 = rk(k) + wob(k, f1); for (let j = 1; j < 10; j++) { const q = j / 10 * Math.PI; const [px, py] = L(e1 + T * Math.cos(q), f1 + T * Math.sin(q) / e1); ctx.lineTo(px, py); }
    for (let i = N; i >= 0; i--) { const f = lerp(f0, f1, i / N); ctx.lineTo(...L(rk(k) + wob(k, f) - T, f)); }
    const e0 = rk(k) + wob(k, f0); for (let j = 1; j < 10; j++) { const q = j / 10 * Math.PI; const [px, py] = L(e0 - T * Math.cos(q), f0 - T * Math.sin(q) / e0); ctx.lineTo(px, py); }
    ctx.closePath(); };
  // ---- glad ER (achter de bladen): buisjesnetwerk voorbij a1, vast aan de uiteinden
  const ribbels = [];
  if (glad > 0.01) { const knopen = [], cols = 4, rows = lagen + 1, fd = 0.5 * glad;
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { const f = a1 + 0.02 + (c + 0.6) / cols * fd + (hash(c * 17 + r * 5) - 0.5) * 0.08; const rr = r0 + 10 + r * pitch * 1.05 + (hash(c * 7 + r * 11) - 0.5) * 18; knopen.push({ c, r, p: L(rr, f) }); }
    const kn = (c, r) => knopen.find(q => q.c === c && q.r === r);
    for (const q of knopen) { const rechts = kn(q.c + 1, q.r), boven = kn(q.c, q.r + 1); if (rechts && hash(q.c * 31 + q.r * 3) > 0.25) ribbels.push([q.p, rechts.p]); if (boven && hash(q.c * 13 + q.r * 29) > 0.45) ribbels.push([q.p, boven.p]); }
    for (let k = 0; k < lagen; k++) { const [, f1] = span(k); const e = L(rk(k) + wob(k, f1), f1); const doel = kn(0, Math.min(rows - 1, k + (k > 1 ? 1 : 0))); if (doel) ribbels.push([e, doel.p, true]); }
    const tube = (w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; for (const [p, q] of ribbels) { const mx = (p[0] + q[0]) / 2 + (hash(p[0] * 1.3) - 0.5) * 26, my = (p[1] + q[1]) / 2 + (hash(p[1] * 1.7) - 0.5) * 26; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(mx, my, q[0], q[1]); ctx.stroke(); } };
    ctx.save(); ctx.globalAlpha *= clamp(glad * 1.5, 0, 1); tube(6.4, kRand); tube(3.8, kLumen); ctx.restore(); }
  // ---- stuk kernenvelop: nucleoplasma, binnen- en buitenmembraan met de perinucleaire ruimte
  const ef0 = a0 - 0.3, ef1 = a1 + 0.3;
  if (envelop) {
    if (kernVlak) { ctx.beginPath(); ctx.arc(0, 0, r0 - gap, ef0, ef1); ctx.arc(0, 0, Math.max(0, r0 - gap - 46), ef1, ef0, true); ctx.closePath(); ctx.fillStyle = _mixHex(C.kern, '#2A3448', 0.45); ctx.fill(); }
    ctx.beginPath(); ctx.arc(0, 0, r0, ef0, ef1); ctx.arc(0, 0, r0 - gap, ef1, ef0, true); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.4); for (const r of [r0, r0 - gap]) { ctx.beginPath(); ctx.arc(0, 0, r, ef0, ef1); ctx.stroke(); } }
  // ---- bladen
  const stukken = []; for (let k = 0; k < lagen; k++) { const [f0, f1] = span(k); stukken.push([k, f0, f1]); cisPad(k, f0, f1); ctx.fillStyle = kLumen; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // ---- halsjes: lumen loopt zichtbaar door (zacht uitlopend, geen balkjes)
  const hals = (rA, rB, f, rAm, rBm, kleurA) => { const N = 16, side = (sg) => { const p = []; for (let i = 0; i <= N; i++) { const u = i / N, r = lerp(rA, rB, u), w = 3.6 + 4.2 * Math.pow(2 * u - 1, 2); p.push([r, f + sg * w / r]); } return p; };
    const l = side(-1), rr = side(1); ctx.beginPath(); l.forEach(([r, ff], i) => i ? ctx.lineTo(...L(r, ff)) : ctx.moveTo(...L(r, ff))); rr.slice().reverse().forEach(([r, ff]) => ctx.lineTo(...L(r, ff))); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    for (const sd of [l, rr]) { ctx.beginPath(); let pen = false; sd.forEach(([r, ff]) => { if (r < rAm - 0.5 || r > rBm + 0.5) { pen = false; return; } const pt = L(r, ff); pen ? ctx.lineTo(...pt) : ctx.moveTo(...pt); pen = true; }); ctx.strokeStyle = kleurA; ctx.lineWidth = lw(1.4); ctx.stroke(); } };
  const hb = []; // halsjes bewaren voor de ribosomen
  for (const f of aansl) { hals(r0 - gap / 2, rk(0) + wob(0, f), f, r0, rk(0) + wob(0, f) - thk(0), kRand); hb.push([r0, rk(0), f]); }
  for (let k = 0; k < lagen - 1; k++) { const f = lerp(a0, a1, [0.3, 0.7, 0.5][k % 3]) + 0.05 * k; hals(rk(k) + wob(k, f), rk(k + 1) + wob(k + 1, f), f, rk(k) + wob(k, f) + thk(k), rk(k + 1) + wob(k + 1, f) - thk(k + 1), kRand); hb.push([rk(k), rk(k + 1), f]); }
  if (glad > 0.01) { ctx.fillStyle = kLumen; for (const [p, q, naad] of ribbels) if (naad) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.6, 0, 6.283); ctx.fill(); } }
  // ---- ribosomen: koepeltje vast op de cytoplasmakant van het membraan
  const opHals = (r, f) => hb.some(([rA, rB, fv]) => Math.abs(f - fv) * r < 11 && r > rA - 6 && r < rB + 6);
  const ribo = (r, f, naarBuiten) => { const [px, py] = L(r, f); const n = f + (naarBuiten ? 0 : Math.PI); ctx.save(); ctx.translate(px, py); ctx.rotate(n);
    ctx.beginPath(); ctx.ellipse(0.4, 0, 2.6, 3, 0, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = C.ribo; ctx.fill(); ctx.restore(); };
  if (rib && s > 0.18) {
    for (const [k, f0, f1] of stukken) for (const kant of [1, -1]) { const R = rk(k) + kant * thk(k); const N = Math.floor((f1 - f0) * R / 7.2);
      for (let i = 1; i < N; i++) { const f = f0 + (f1 - f0) * (i + (hash(i * 7 + k * 31 + kant) - 0.5) * 0.3) / N; if (hash(i * 3 + k * 17 + kant * 5) < 0.1 || opHals(R, f)) continue;
        if (keten > 0 && k === lagen - 1 && kant === 1 && Math.abs(f - am) < 0.32) continue; ribo(R + wob(k, f) + kant * 0.7, f, kant === 1); } }
    if (envelop || kern) { const N = Math.floor((ef1 - ef0) * r0 / 9); for (let i = 0; i < N; i++) { const f = ef0 + (ef1 - ef0) * (i + 0.5) / N; if (opHals(r0, f) || hash(i * 9) < 0.25) continue; ribo(r0 + 0.7, f, true); } } }
  // ---- polysoom: mRNA met een rij ribosomen over het buitenste blad; ketens groeien het lumen in
  if (keten > 0.01) { const k = lagen - 1, T = thk(k), Rm = rk(k) + T + 8.5; const fa = am - 0.3, fb = am + 0.3;
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(1.4); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = lerp(fa - 0.04, fb + 0.04, i / 40); const [px, py] = L(Rm + wob(k, f) + 1.6 * Math.sin(i * 0.9 + t * 1.5), f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const nR = 6; for (let j = 0; j < nR; j++) { const f = lerp(fa, fb, (j + 0.5) / nR); const rb = rk(k) + wob(k, f);
      const lengte = clamp(keten * 1.25 - (nR - 1 - j) * 0.16, 0, 1) * 22;
      if (lengte > 0.5) { ctx.fillStyle = lighten(C.enzym, 0.35); for (let b = 0; b < lengte; b++) { let px, py;
          if (b < 3) { [px, py] = L(rb + T - 1 - b * 2.6, f); } else { const u = b - 3; const ff = f - u * 0.012 * (1 - Math.min(1, u / 14) * 0.5); const rr = rb - T * 0.1 + Math.sin(u * 1.1) * T * 0.45 * Math.min(1, u / 6); [px, py] = L(rr, ff); }
          ctx.beginPath(); ctx.arc(px, py, 1.2, 0, 6.283); ctx.fill(); }
        if (lengte > 20 && j === nR - 1) { const ff = f - 17 * 0.012 * 0.6; const [gx, gy] = L(rb, ff); ctx.strokeStyle = C.groen; ctx.lineWidth = lw(1); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 4, gy + Math.sin(ff - 1.5) * 4); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 2 - Math.cos(ff) * 2.5, gy + Math.sin(ff - 1.5) * 2 - Math.sin(ff) * 2.5); ctx.stroke(); } }
      // ribosoom: grote subeenheid op het membraan, kleine erboven op het mRNA
      const [gx, gy] = L(rb + T + 3.8, f), [kx, ky] = L(rb + T + 8.6, f); ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(gx, gy, 3.8, 4.6, f, 0, 6.283); ctx.fill();
      ctx.fillStyle = lighten(C.ribo, 0.2); ctx.beginPath(); ctx.ellipse(kx, ky, 2.4, 3.4, f, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}

// =====================================================================================
// groep dna
// =====================================================================================

// =====================================================================================
// DELENDE CEL — inbouw 28 okt 2026: Kamiel houdt de huidige (oude) cdCel, cdPool, cdKernmembraan en cdDraad ongewijzigd
// ('lekker simpel'; geen organellen, die leiden af). Nieuw is alleen cdAnafaseCel hieronder: de gemelde fout 'geen duidelijke
// anafase' is bevestigd (Wikipedia 'Anaphase'; Digital Histology 'Mitosis overview 7': zusterchromatiden gaan uit elkaar en
// worden naar tegenovergestelde polen getrokken). Bouwt op de oude cdCel (zonder organellen) en de bestaande cdEen/cdPool/cdDraad.
// =====================================================================================
// ANAFASE (OpenStax Biology 2e § 10.2: in de anafase gaan de zusterchromatiden uit elkaar en worden ze naar tegenovergestelde polen
// getrokken; bestaand recept cdEen: centromeer vóórop, armen slepen erachteraan): delende cel met polen; per chromosoom twee
// chromatiden die f (0 = metafaseplaat, 1 = bij de polen) uit elkaar zijn, elk aan een bundel trekdraden vanaf zijn eigen pool.
// cdAnafaseCel(ctx, cx, cy, rx, ry, {f, insnoer, n, len, w, kl, t, a})
function cdAnafaseCel(ctx, cx, cy, rx, ry, o = {}) { const { f = 0.5, insnoer = 0.15, n = 4, len = ry * 0.36, w = Math.max(5, ry * 0.05), kl = C.kernR, t = 0, a = 1 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; cdCel(ctx, cx, cy, rx, ry, { insnoer, t });
  const pl = cx - rx * 0.8, pr = cx + rx * 0.8, e = ease(clamp(f, 0, 1)), d = lerp(w * 0.7, rx * 0.55, e), zw = 0.2 + e * 0.95; // rustige V: armen slepen, maar overlappen de buren niet
  cdPool(ctx, pl, cy); cdPool(ctx, pr, cy);
  for (let i = 0; i < n; i++) { const yy = cy + (i - (n - 1) / 2) * ry * 0.24, yl = lerp(yy, cy + (yy - cy) * 0.85, e);
    cdDraad(ctx, pl, cy, cx - d, yl, 1, CD.draad, Math.max(1, w * 0.18)); cdDraad(ctx, pr, cy, cx + d, yl, 1, CD.draad, Math.max(1, w * 0.18));
    cdEen(ctx, cx - d, yl, len, { w, kl, zwaai: zw, kant: 1, kin: true }); cdEen(ctx, cx + d, yl, len, { w, kl, zwaai: zw, kant: -1, kin: true }); }
  ctx.restore(); }

// =====================================================================================
// mRNA ALS SLIERT — variant C (beeldbank ronde 2, 27 okt 2026): A (winnaar) + de streng kronkelt echt (lussen, wisselende bochten),
// duidelijker poly-A-staart en cap. Inbouw 28 okt: kronkelhoogte begrensd op 12 % van de lengte (was 16 %; de lus raakte de vakrand).
// Recept (OpenStax Biology 2e § 15.2–15.5; Alberts MBoC 4e 'From RNA to Protein'; prompt C9 'mRNA: a thin, slack single strand, about half as
// thick as DNA, gently curved, never a straight bar; bases as short spikes on one side'; Beeldafspraak: dun en sliertig):
//  - één enkele streng, teal (RNA), ± half zo dik als DNA (dnaDraad/d2Rug), slap en zacht kronkelend; beweegt rustig (t).
//  - basen als korte stekels aan één kant; ingezoomd (o.basen → 1) de puzzelvorm van baseRingRNA (U heeft de rand van T).
//  - leesrichting 5' → 3' (ribosoom leest 5' → 3', OpenStax § 15.5); codons = drietallen, gemarkeerd met een lichte boog per drie.
//  - vwo: 5'-cap (gemodificeerde G) als knopje aan het 5'-uiteinde, poly-A-staart (hier 14 A; cap en staart: OpenStax § 15.4, nog niet geopend in deze ronde) aan 3'.
//  - afbreken (o.afbraak 0 → 1): de staart wordt korter, dan breekt de streng vanaf het 5'-uiteinde in losse nucleotiden.
//  Bekende fouten: staafje of blokje (Beeldafspraak); dubbele streng; basen aan beide kanten; even dik als DNA.
// mrnaSliert(ctx, x, y, len, {rot, seq, t, slap 0..1, rek 0..1, basen 0..1, codons 0..1, cap 0..1, polyA 0..1, afbraak 0..1, dikte, a})
// (x, y) = 5'-uiteinde; len = lengte in px langs de as. Geeft {p5, p3, punt(u) → [x, y, hoek], codon(k) → [x, y]} terug.
// =====================================================================================
const MRNA_SEQ = 'AUGGCCAAGUUCGGAUCCUGGAAACUGGUCAAUGCGUACGAUCUGGCAAGCUGA';
function _mrnaPad(x, y, len, o) { // kronkelende sliert: richting = som van sinussen (integreren) → echte bochten en af en toe een lus;
  // daarna zo gedraaid en geschaald dat 5' → 3' van (x, y) naar (x + len, y) loopt (langs rot). o.kronkel 0 = rustige golf.
  const { rot = 0, t = 0, slap = 1, rek = 0, seed = 1, kronkel = 1 } = o; const k = kronkel * slap * (1 - rek), n = 160, Q = [[0, 0]]; let px = 0, py = 0;
  for (let i = 1; i <= n; i++) { const u = i / n, th = k * (0.7 * Math.sin(u * 6.283 * 2.1 + seed + t * 0.2) + 1.5 * Math.sin(u * 6.283 * 5.3 + seed * 2.3 - t * 0.15) + 0.6 * Math.sin(u * 6.283 * 9.1 + seed * 0.7));
    px += Math.cos(th); py += Math.sin(th); Q.push([px, py]); }
  const E = Q[n], d = Math.hypot(E[0], E[1]) || 1, ca = E[0] / d, sa = E[1] / d, f = len / d, cr = Math.cos(rot), sr = Math.sin(rot);
  const L0 = Q.map(([qx, qy]) => [(qx * ca + qy * sa) * f, (-qx * sa + qy * ca) * f]), my = Math.max(1, ...L0.map(p => Math.abs(p[1]))), sy = Math.min(1, len * 0.12 / my); // hoogte begrenzen (± 12 % van de lengte, ook met basen en codonbogen binnen een vak van ± 30 % hoog)
  return L0.map(([X, Y0]) => { const Y = Y0 * sy; return [x + X * cr - Y * sr, y + X * sr + Y * cr]; }); }
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
function mrnaSliert(ctx, x, y, len, o = {}) {
  const { a = 1, seq = MRNA_SEQ, basen = 0, codons = 0, cap = 0, polyA = 0, afbraak = 0, dikte = Math.max(2.2, len * 0.0045) } = o; if (a <= 0.01) return {};
  const P = _mrnaPad(x, y, len, o), kl = '#5BA4C9', kd = '#2E6F92';
  const nB = seq.length, nA = Math.round(18 * polyA), tot = nB + nA, stap = 1 / tot, sp = len * stap;
  const af = ease(clamp(afbraak, 0, 1)), staart = nA * (1 - clamp(af * 2, 0, 1)), u0 = clamp((af - 0.4) / 0.6, 0, 1) * 0.85, u1 = (nB + staart) / tot;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // basen (stekels aan één kant, of puzzelvorm als ingezoomd)
  const vorm = basen > 0.5 && sp >= 18;
  for (let i = 0; i < nB + Math.floor(staart); i++) { const u = (i + 0.5) * stap; if (u < u0) continue; const [px, py, an] = _mrnaPunt(P, u), b = i < nB ? seq[i] : 'A', staartA = i >= nB, nx = Math.cos(an + Math.PI / 2), ny = Math.sin(an + Math.PI / 2);
    if (vorm) { ctx.save(); ctx.globalAlpha *= clamp((basen - 0.5) * 2, 0, 1); d2Base(ctx, px + nx * dikte, py + ny * dikte, an + Math.PI / 2, b, sp * 0.9, sp * 0.3, { rna: true, letter: sp >= 34 }); ctx.restore(); }
    const kort = (vorm ? 0 : 1) * lerp(dikte * 2.2, Math.min(sp * 0.9, dikte * 5), basen); if (kort > 0.5) { ctx.strokeStyle = staartA ? '#D8EEF7' : RNA_BASE.base[b]; ctx.lineWidth = Math.max(1.6, Math.min(sp * 0.45, dikte * 1.1)); ctx.beginPath(); ctx.moveTo(px + nx * dikte * 0.5, py + ny * dikte * 0.5); ctx.lineTo(px + nx * (dikte * 0.5 + kort), py + ny * (dikte * 0.5 + kort)); ctx.stroke(); } }
  // ruggengraat
  const Q = P.filter((p, i) => { const u = i / (P.length - 1); return u >= u0 && u <= u1 + stap * 0.5; });
  if (Q.length > 1) { ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kd; ctx.lineWidth = dikte + 2; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dikte; ctx.stroke(); }
  // codons: lichte boog onder elk drietal (aan de kant zonder basen)
  if (codons > 0.01) { ctx.save(); ctx.globalAlpha *= codons * 0.85; for (let k = 0; k * 3 < nB; k++) { const ua = k * 3 * stap + stap * 0.15, ub = (k * 3 + 3) * stap - stap * 0.15; if (ua < u0) continue; ctx.beginPath();
      for (let q = 0; q <= 8; q++) { const [px, py, an] = _mrnaPunt(P, lerp(ua, ub, q / 8)), nx = Math.cos(an - Math.PI / 2), ny = Math.sin(an - Math.PI / 2), d = dikte * 2.4 + Math.sin(q / 8 * Math.PI) * dikte * 1.2; q ? ctx.lineTo(px + nx * d, py + ny * d) : ctx.moveTo(px + nx * d, py + ny * d); }
      ctx.strokeStyle = k % 2 ? rgba(C.goud, 0.55) : rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, dikte * 0.6); ctx.stroke(); } ctx.restore(); }
  // cap aan 5'
  if (cap > 0.01 && u0 < 0.01) { const [px, py] = P[0]; ctx.save(); ctx.globalAlpha *= cap; _bioCirc(ctx, px - dikte * 2.2, py, dikte * 2.8, '#356F91', '#BFE0EF', 2); _bioCirc(ctx, px - dikte * 2.2, py, dikte * 1.1, '#BFE0EF', null); ctx.restore(); }
  // losse nucleotiden van de afbraak
  if (af > 0.4) { const nLos = Math.round(u0 * nB); for (let i = 0; i < nLos; i++) { const [px, py] = _mrnaPunt(P, (i + 0.5) * stap), dr = (af - 0.4) * 60 + 10; _bioCirc(ctx, px + (hash(i * 3.1) - 0.5) * dr, py + (hash(i * 7.7) - 0.3) * dr, Math.max(1.5, dikte * 0.8), rgba(RNA_BASE.base[seq[i]], 0.8)); } }
  ctx.restore();
  return { p5: P[0], p3: _mrnaPunt(P, u1), punt: (u) => _mrnaPunt(P, u), codon: (k) => _mrnaPunt(P, (k * 3 + 1.5) * stap) };
}

// =====================================================================================
// RIBOSOOM — variant A (nieuw, beeldbank 27 okt 2026): twee gladde subeenheden met een uitsnede voor de A-, P- en E-plek.
// Inbouw 28 okt: de kralenketen vouwt buiten de tunnel tot een compacte kluwen i.p.v. een losse slinger (Holtkamp e.a. 2015 Science
// / MPI-NAT: vouwen 'starts as soon as the protein emerges from the peptide exit tunnel'; Cassaignau e.a. 2016 (PMC5405865):
// 'folding processes can begin in a co-translational manner'). Rest ongewijzigd.
// Recept (OpenStax Biology 2e § 15.5; Alberts MBoC 4e 'From RNA to Protein'):
//  - kleine subeenheid (onder het mRNA) bindt het mRNA, grote subeenheid (erboven) bindt de tRNA's en maakt de peptidebinding;
//    mens 40S + 60S = 80S, ± 25 nm (prompt C9); voor 2/3 RNA, 1/3 eiwit. Kleur C.ribo (beige), zoals de ribosomen in de cel (C2).
//  - drie tRNA-plekken naast elkaar langs het mRNA: E (exit) – P (peptidyl) – A (aminoacyl), in leesrichting 5' → 3';
//    het ribosoom schuift per stap precies één codon (3 nucleotiden) op (o.stap 0 → 1 = één codon verder).
//  - de groeiende keten verlaat de grote subeenheid door een tunnel (± 10 nm × 1,5 nm) bovenop en vouwt daarbuiten (keten van
//    kralen, oker = voedsel/aminozuren, C1); stand 'er': de grote subeenheid zit op het ER-membraan en de keten gaat erdoorheen.
//  - polysoom: meerdere ribosomen op één mRNA, minstens ± 80 nucleotiden uit elkaar, ketens langer naarmate ze verder zijn.
//  Bekende fouten: twee bolletjes; mRNA dóór de grote subeenheid; keten uit de kleine subeenheid; sites in de verkeerde volgorde.
// ribosoomEcht(ctx, x, y, s, {stand, keten, stap, sites, codon, t, a}); (x, y) = mRNA onder de P-plek; s = schaal (1 ≈ 220 px breed).
// Geeft {A, P, E, tunnel, top} terug. polysoom(ctx, x0, y, len, n, {s, t, a}).
// =====================================================================================
function _riboKeten(ctx, x, y, n, r, t, er) { if (n <= 0) return; const P = []; let px = x, py = y, an = er ? Math.PI / 2 : -Math.PI / 2;
  // de eerste ± 3 aminozuren steken recht uit de tunnel; daarna vouwt de keten tot een compacte kluwen (co-translationeel vouwen):
  // de bocht per kraal is groot en de keten wordt teruggestuurd naar het vouwmidden zodra ze buiten de straal √(n) komt.
  const st = r * 1.75, k0 = 3, cx = x + Math.cos(an) * st * (k0 + 1.2), cy = y + Math.sin(an) * st * (k0 + 1.2);
  for (let i = 0; i < n; i++) { if (i >= k0) { an += (hash(i * 3.7) - 0.5) * 1.6 + 0.45 + Math.sin(t * 0.8 + i) * 0.06; const R = st * (1.1 + 0.8 * Math.sqrt(Math.max(1, i - k0)));
      const nx = px + Math.cos(an) * st, ny = py + Math.sin(an) * st; if (Math.hypot(nx - cx, ny - cy) > R) { const doel = Math.atan2(cy - py, cx - px); let df = Math.atan2(Math.sin(doel - an), Math.cos(doel - an)); an += df * 0.8; } }
    px += Math.cos(an) * st; py += Math.sin(an) * st; P.push([px, py]); }
  ctx.strokeStyle = '#9C7A4A'; ctx.lineWidth = r * 0.6; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.stroke();
  const AAT = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F']; P.forEach((p, i) => _bioCirc(ctx, p[0], p[1], r, AAT[i % 5], lighten(AAT[i % 5], 0.3), 1.2)); }
function ribosoomEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'vrij', keten = 0, stap = 0, sites = 0, t = 0, codon = 42 * s } = o; if (a <= 0.01) return {}; const u = 100 * s, er = stand === 'er';
  const kl = C.ribo || '#C9B896', kd = _mixHex(kl, '#121A26', 0.35), rd = lighten(kl, 0.3);
  ctx.save(); ctx.globalAlpha *= a; const dx = -ease(clamp(stap, 0, 1)) * 0; // ribosoom zelf staat; de aanroeper schuift x per codon
  const X = x + codon * 0.0, P = [X, y], A = [X + codon, y], E = [X - codon, y];
  // grote subeenheid (boven het mRNA): koepel met een inham aan de onderkant voor de drie plekken
  ctx.beginPath(); bioPad(ctx, [[X - 1.05 * u, y - 0.18 * u], [X - 1.12 * u, y - 0.75 * u], [X - 0.7 * u, y - 1.28 * u], [X + 0.05 * u, y - 1.42 * u], [X + 0.8 * u, y - 1.22 * u], [X + 1.15 * u, y - 0.7 * u], [X + 1.05 * u, y - 0.18 * u], [X + 0.6 * u, y - 0.12 * u], [X, y - 0.16 * u], [X - 0.6 * u, y - 0.12 * u]], true); shape(ctx, kl, rd, 1.5);
  // kleine subeenheid (onder het mRNA) met 'kop'
  ctx.beginPath(); bioPad(ctx, [[X - 0.92 * u, y + 0.12 * u], [X - 0.98 * u, y + 0.45 * u], [X - 0.55 * u, y + 0.72 * u], [X + 0.2 * u, y + 0.66 * u], [X + 0.6 * u, y + 0.8 * u], [X + 0.95 * u, y + 0.5 * u], [X + 0.9 * u, y + 0.14 * u], [X, y + 0.1 * u]], true); shape(ctx, _mixHex(kl, '#121A26', 0.12), rd, 1.5);
  // uitsnede met de drie plekken (donker), E – P – A
  if (sites > 0.01 && u > 50) { ctx.save(); ctx.globalAlpha *= sites; [[E, 'E'], [P, 'P'], [A, 'A']].forEach(([q]) => { roundRect(ctx, q[0] - codon * 0.44, y - 0.95 * u, codon * 0.88, 0.8 * u, codon * 0.25); shape(ctx, rgba('#121A26', 0.75), kd, 1.5); }); ctx.restore(); }
  // tunnel vanaf de P-plek naar de top
  ctx.strokeStyle = kd; ctx.lineWidth = Math.max(2, 0.07 * u); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X + 0.05 * u, y - 0.9 * u); ctx.quadraticCurveTo(X + 0.25 * u, y - 1.15 * u, X + 0.12 * u, y - 1.42 * u); ctx.stroke();
  const tun = [X + 0.12 * u, y - 1.42 * u];
  if (er) { const Rm = 9 * u, cy = y - 1.62 * u - Rm; ctx.lineCap = 'round'; [0, 0.2 * u].forEach((d, k) => { ctx.beginPath(); ctx.arc(X, cy - d, Rm, Math.PI / 2 - 0.2, Math.PI / 2 + 0.2); ctx.strokeStyle = rgba(C.er, k ? 0.6 : 0.95); ctx.lineWidth = 0.12 * u; ctx.stroke(); }); } // ER-membraan (gebogen, dubbel)
  _riboKeten(ctx, tun[0], tun[1] - (er ? 0.45 * u : 0), keten, Math.max(2, 0.085 * u), t, false);
  ctx.restore(); return { A, P, E, tunnel: tun, top: y - 1.42 * u };
}
function polysoom(ctx, x0, y, len, n, o = {}) { const { s = 0.5, t = 0, a = 1 } = o; const out = [];
  for (let i = 0; i < n; i++) { const x = x0 + len * (n - i - 0.5) / n; out.push(ribosoomEcht(ctx, x, y, s, { keten: 2 + Math.round((n - i) * 3), t: t + i, a })); } return out; }

// =====================================================================================
// RNA-POLYMERASE MET TRANSCRIPTIEBEL — variant A (nieuw, beeldbank 27 okt 2026). Inbouw 28 okt (Kamiel: 'mag iets simpeler,
// zonder essentiële dingen te verliezen'): klep boven de codestreng weg, alleen een smalle onderkaak vóór het DNA; enzym 20 %
// minder hoog (bleef over de onderrand van het vak lopen); mRNA verlaat het hybride zonder knik. Behouden: lokale bel tussen twee
// helixen, matrijs onder, 8-bp hybride (T7: '8-base-pair RNA-DNA hybrid', Tahirov e.a. 2002 / Proteopedia 1h38; Martin lab
// UMass 'an 8 base RNA-DNA hybrid'), goud actief centrum, één dunne teal mRNA-streng.
// Recept (OpenStax Biology 2e § 15.2: 'the DNA unwinds ahead of the polymerase and then rewinds behind it', RNA 5' → 3' met
// ± 40 nt/s, promotor stroomopwaarts, terminator laat los; Barnes e.a. 2015 Mol Cell 59:258: transcriptiebel ± 8–22 nt open,
// kort DNA-RNA-hybride ± 8–9 bp):
//  - de polymerase (grijsblauw eiwit, actief centrum goud) zit óp het DNA en opent het alleen lokaal (bel ± 14 bp); vóór en
//    achter de bel blijft het een rechtsdraaiende dubbele helix (dnaLadderHelix) — duidelijk anders dan replicatie: geen vork,
//    geen twee nieuwe strengen, maar één dunne teal mRNA-sliert die uit het enzym komt.
//  - de matrijsstreng (onder) wordt 3' → 5' gelezen; het mRNA groeit 5' → 3' met U tegenover A; ± 8 basen vormen een hybride
//    met de matrijs, daarna laat het mRNA los en verlaat het enzym schuin naar boven.
//  - standen: 'bind' (op de promotor, DNA nog dicht), 'open' (bel open, nog geen RNA), 'lees' (bel + mRNA van o.mrna px),
//    'los' (terminator: enzym en mRNA laten los, DNA sluit). Animeer de beweging door x te verschuiven (DNA ligt stil).
//  Bekende fouten: replicatievork; RNA dat aan beide strengen ontstaat; DNA dat open blijft achter de polymerase; dik mRNA.
// rnaPolymerase(ctx, x, y, s, {stand, mrna, x0, x1, seq, t, a}); (x, y) = actief centrum op de DNA-as; s = schaal (1 ≈ 240 px breed).
// Geeft {actief, p5 (mRNA-uiteinde), bel: [xa, xb]} terug.
// =====================================================================================
function _rnapDNA(ctx, x, y, u, o) { const { x0 = x - 6 * u, x1 = x + 6 * u, open = 1, seq = 'TACGGATCCATGAAGTTCGGACTGATCCGTAGCTTAG' } = o;
  const dx = 0.1 * u, R = 0.27 * u, xa = x - 1.0 * u, xb = x + 0.4 * u, s = R / 110 * 0.62 * 1.6;
  const helix = (xs, xe, fase) => { if (xe - xs < dx * 2) return; const n = Math.floor((xe - xs) / dx) + 1; dnaLadderHelix(ctx, xs, y, dx, seq.repeat(4).slice(0, n), { draai: 1, R, s: Math.max(0.05, s), fase, toonBasen: 1 }); };
  if (open < 0.01) { helix(x0, x1, 0); return { xa, xb, dx, R, dicht: true }; }
  helix(x0, xa, 0); helix(xb, x1, (xb - x0) / dx * 0.628);
  // bel: codestreng boog omhoog, matrijs boog omlaag, met losse basen naar binnen
  const H = (X) => Math.sin(clamp((X - xa) / (xb - xa), 0, 1) * Math.PI) * open;
  const rug = D2.oud, bw = Math.max(3, R * 0.2), Ltop = [], Lbot = [];
  for (let X = xa; X <= xb + 0.01; X += dx * 0.5) { Ltop.push([X, y - R - H(X) * 0.35 * u]); Lbot.push([X, y + R + H(X) * 0.25 * u]); }
  const tB = [], cB = []; for (let X = xa + dx * 0.5, i = 0; X < xb; X += dx, i++) { const b = seq[i % seq.length]; tB.push([X, b]); cB.push([X, D2.comp[b]]); }
  return { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug }; }
function _rnapStrengen(ctx, D, y, u, mrna, t) { if (D.dicht) return null; const { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug } = D; const L = Math.max(4, R * 0.75);
  cB.forEach(([X, b]) => d2Base(ctx, X, y - R - H(X) * 0.35 * u + bw * 0.4, Math.PI / 2, b, L * (1 - 0.35 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  tB.forEach(([X, b]) => d2Base(ctx, X, y + R + H(X) * 0.25 * u - bw * 0.4, -Math.PI / 2, D2.comp[b], L * (1 - 0.2 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  d2Rug(ctx, Ltop, { kleur: rug, bw }); d2Rug(ctx, Lbot, { kleur: rug, bw });
  // RNA: hybride over de laatste 8 nt vóór het actieve centrum, daarna los en schuin omhoog naar achteren
  if (mrna > 0) { const xs = xb - dx * 1.5, yh = (X) => y + R + H(X) * 0.25 * u - L * 1.9; const P = [];
    for (let k = 0; k <= 8 && k * dx <= mrna; k++) P.push([xs - k * dx, yh(xs - k * dx)]);
    const rest = mrna - 8 * dx; if (rest > 0) { const [px, py] = P[P.length - 1]; for (let q = 1; q <= 40; q++) { const f = q / 40, d = rest * f; const w = Math.min(1, f * 4); P.push([px - d * 0.55 + Math.sin(f * 6 + t) * u * 0.04 * w, py - d * 0.75 + Math.sin(f * 4 - t * 0.7) * u * 0.05 * w]); } }
    // basen van het hybride (U tegenover A)
    for (let k = 0; k < 8 && k * dx <= mrna; k++) { const X = xs - k * dx, tb = tB.find(q => Math.abs(q[0] - X) < dx * 0.6); if (!tb) continue; const rb = D2.rcomp[D2.comp[tb[1]]] ; d2Base(ctx, X, yh(X), Math.PI / 2, rb === 'T' ? 'U' : rb, L * 0.85, Math.max(1.5, dx * 0.32), { vorm: false, rna: true }); }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = Math.max(2.5, bw * 0.55) + 2; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, bw * 0.55); ctx.stroke(); ctx.restore();
    return P[P.length - 1]; } return null; }
function rnaPolymerase(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'lees', mrna = 0, t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s;
  const open = stand === 'bind' || stand === 'los' ? 0 : 1, los = stand === 'los' ? 1 : 0, rL = stand === 'lees' || stand === 'los' ? mrna : 0;
  ctx.save(); ctx.globalAlpha *= a;
  const ex = x - 0.3 * u, ey = y - los * 0.75 * u; // enzymmidden (tilt omhoog bij loslaten)
  // achterkant van het enzym (achter het DNA): grote kluwen met een kanaal
  const vy = 0.8; ctx.beginPath(); bioPad(ctx, [[ex - 1.25 * u, ey + 0.1 * u * vy], [ex - 1.05 * u, ey - 0.85 * u * vy], [ex - 0.2 * u, ey - 1.15 * u * vy], [ex + 0.8 * u, ey - 0.95 * u * vy], [ex + 1.25 * u, ey - 0.25 * u * vy], [ex + 1.15 * u, ey + 0.7 * u * vy], [ex + 0.3 * u, ey + 1.0 * u * vy], [ex - 0.8 * u, ey + 0.85 * u * vy]], true); shape(ctx, '#56667F', '#7F8EA8', 1.5);
  const D = _rnapDNA(ctx, x, y, u, Object.assign({}, o, { open }));
  let p5 = null; if (los < 1) p5 = _rnapStrengen(ctx, D, y, u, rL, t); else { // los: DNA dicht, mRNA drijft weg
    const P = []; for (let q = 0; q <= 40; q++) { const f = q / 40; P.push([x - 0.6 * u - f * rL * 0.8, y - 0.9 * u - f * rL * 0.3 + Math.sin(f * 6 + t) * u * 0.08]); } ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, u * 0.04); ctx.stroke(); ctx.restore(); p5 = P[P.length - 1]; }
  // voorkant: alleen een onderkaak onder de matrijs (de bel blijft vrij zichtbaar; de klep boven de codestreng is weggelaten)
  ctx.beginPath(); bioPad(ctx, [[ex - 1.0 * u, ey + 0.6 * u], [ex - 0.3 * u, ey + 0.66 * u], [ex + 0.5 * u, ey + 0.63 * u], [ex + 1.0 * u, ey + 0.6 * u], [ex + 0.85 * u, ey + 0.82 * u], [ex - 0.6 * u, ey + 0.86 * u]], true); shape(ctx, '#7A8BA8', '#A4B2CA', 1.5);
  const act = [D.xb - D.dx * 1.5, y + D.R + 0.25 * u * open - D.R * 0.75 * 1.0]; if (open && !los) _bioCirc(ctx, act[0], act[1], Math.max(2.5, u * 0.05), rgba(C.goud, 0.85), C.goud, 1.5);
  ctx.restore(); return { actief: act, p5, bel: [D.xa, D.xb] };
}

// =====================================================================================
// tRNA: KLAVERBLAD ↔ L-VORM — variant A (nieuw, beeldbank 27 okt 2026): stammen als ladders, lussen als kralenringen.
// Inbouw 28 okt: geen kruis met vier gelijke armen meer. Stamlengtes naar de bronnen: acceptorstam 7 bp (5'- en 3'-uiteinde,
// 3' steekt uit met CCA + aminozuur), D-stam 4 bp met de grootste lus (10 kralen), T-stam 5 bp met lus van 7, anticodonstam
// 5 bp met lus van 7 (BS1005 'tRNA structure' (bookdown); Wikipedia 'Transfer RNA' (IPFS-kopie): acceptor 7–9 bp, D 4–6 bp
// (BS1005: 3–4), T 4–5 bp, anticodon 5 bp; armlengtes verschillen per tRNA).
// Recept (Alberts MBoC 4e 'From RNA to Protein': tRNA ± 80 nucleotiden, 'looks like a cloverleaf when drawn schematically',
// verdere vouwing geeft een 'compact L-shaped structure'; anticodon = drie basen die met het codon paren, aminozuur aan het
// 3'-uiteinde (CCA); OpenStax Biology 2e § 15.5: aminoacyl-tRNA-synthetase koppelt het juiste aminozuur):
//  - vier stammen met baseparen (acceptor-, D-, T- en anticodonstam), drie lussen; in de L-vorm liggen acceptor- en T-stam in
//    één lijn (bovenarm) en D- en anticodonstam in één lijn (onderarm), D- en T-lus raken elkaar in de knik.
//  - anticodon = drie RNA-basen (puzzelvorm van baseRingRNA) onderaan, wijzend naar het codon; aminozuur (oker kraal) aan het
//    3'-uiteinde van de acceptorstam (CCA-staart: model, niet in de geopende bron). o.aa 0 → 1 = laden; animeer afgeven met o.aa → 0.
//  - kleur: RNA = teal (zelfde tinten als mrnaSliert).
//  Bekende fouten: T-vorm of blokje; anticodon bovenaan; aminozuur aan het anticodon; klaverblad als 'echte' 3D-vorm.
// trnaKlaverblad(ctx, x, y, s, {vorm 0..1, anti, aa 0..1, aaKleur, t, a}); (x, y) = knik/midden; s = schaal (1 ≈ 220 px hoog).
// Geeft {anti: [x, y] (onder de anticodonbasen), aa: [x, y], richting} terug.
// =====================================================================================
// opbouw (eenheid u): vier armen; klaverblad (vorm 0) ↔ L-vorm (vorm 1). Per arm: begin (x, y), hoek, stamlengte, lus aan het eind of begin.
const _TRNA_K = { acc: [0, -0.18, -90, 0.77, 'geen'], T: [0.18, 0, 0, 0.55, 'eind'], D: [-0.18, 0, 180, 0.44, 'eind'], AC: [0, 0.18, 90, 0.55, 'eind'] };
const _TRNA_L = { acc: [1.0, -0.05, 0, 0.77, 'geen'], T: [0.42, -0.05, 0, 0.55, 'begin'], D: [-0.05, 0.42, 90, 0.44, 'begin'], AC: [-0.05, 0.98, 90, 0.55, 'eind'] };
function _trnaArm(naam, e, u, x, y) { const a = _TRNA_K[naam], b = _TRNA_L[naam], an = lerp(a[2], b[2], e) * Math.PI / 180, len = lerp(a[3], b[3], e) * u;
  const x0 = x + lerp(a[0], b[0], e) * u, y0 = y + lerp(a[1], b[1], e) * u, x1 = x0 + Math.cos(an) * len, y1 = y0 + Math.sin(an) * len;
  const lr = naam === 'D' ? 0.32 : 0.27, lusEind = [x1 + Math.cos(an) * lr * u, y1 + Math.sin(an) * lr * u], lusBegin = [x0 - Math.cos(an) * lr * u, y0 - Math.sin(an) * lr * u];
  const lus = a[4] === 'geen' ? null : (a[4] === b[4] ? (a[4] === 'eind' ? lusEind : lusBegin) : [lerp(lusEind[0], lusBegin[0], e), lerp(lusEind[1], lusBegin[1], e)]);
  return { x0, y0, x1, y1, an, len, lus }; }
function trnaKlaverblad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vorm = 0, anti = 'UAC', aa = 0, aaKleur = '#C9A35C', t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s, e = ease(clamp(vorm, 0, 1));
  const kl = '#5BA4C9', kd = '#2E6F92', sw = 0.13 * u, lw = Math.max(1.5, 0.045 * u);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const arms = {}; ['D', 'T', 'acc', 'AC'].forEach(n => arms[n] = _trnaArm(n, e, u, x, y));
  // verbindingen in het midden (enkele streng)
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); const c = [arms.acc.x0, arms.acc.y0], kk = ['D', 'AC', 'T']; kk.forEach(n => { ctx.moveTo(c[0], c[1]); ctx.quadraticCurveTo(x, y, arms[n].x0, arms[n].y0); }); ctx.stroke();
  Object.entries(arms).forEach(([n, A]) => { const nx = -Math.sin(A.an), ny = Math.cos(A.an), nb = Math.max(2, Math.round(A.len / (0.11 * u)));
    // basenparen (sporten) in RNA-tinten
    for (let i = 0; i < nb; i++) { const f = (i + 0.5) / nb, px = lerp(A.x0, A.x1, f), py = lerp(A.y0, A.y1, f), b1 = 'AUCG'[(i + n.length) % 4], b2 = { A: 'U', U: 'A', C: 'G', G: 'C' }[b1];
      ctx.lineWidth = Math.max(2, 0.06 * u); ctx.strokeStyle = RNA_BASE.base[b1]; ctx.beginPath(); ctx.moveTo(px + nx * sw, py + ny * sw); ctx.lineTo(px, py); ctx.stroke(); ctx.strokeStyle = RNA_BASE.base[b2]; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - nx * sw, py - ny * sw); ctx.stroke(); }
    [1, -1].forEach(k => { ctx.strokeStyle = kd; ctx.lineWidth = lw + 2; ctx.beginPath(); ctx.moveTo(A.x0 + nx * sw * k, A.y0 + ny * sw * k); ctx.lineTo(A.x1 + nx * sw * k, A.y1 + ny * sw * k); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.stroke(); });
    if (A.lus && n !== 'AC') { const nk = n === 'D' ? 10 : 7, lr = n === 'D' ? 0.25 : 0.19; for (let k = 0; k < nk; k++) { const an = A.an + Math.PI + (k + 0.5) / nk * 6.283 * 0.85 + 0.45; _bioCirc(ctx, A.lus[0] + Math.cos(an) * lr * u, A.lus[1] + Math.sin(an) * lr * u, Math.max(1.5, 0.05 * u), RNA_BASE.base['AUCG'[k % 4]], kd, 1); } } });
  // anticodonlus met de drie basen onderaan
  const AC = arms.AC, lp = AC.lus, dir = [Math.cos(AC.an), Math.sin(AC.an)];
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(lp[0], lp[1], 0.24 * u, 0, 6.283); ctx.stroke();
  const bs = 0.17 * u / 22; const ap = [lp[0] + dir[0] * 0.24 * u, lp[1] + dir[1] * 0.24 * u];
  for (let i = 0; i < 3; i++) { const off = (i - 1) * 52 * bs * 1.05, px = ap[0] + dir[1] * off, py = ap[1] - dir[0] * off; baseRingRNA(ctx, px, py, anti[i], 1, { s: bs, rot: AC.an - Math.PI / 2, plekA: 0, geenLetter: u < 60 }); }
  // 3'-uiteinde (CCA) en aminozuur aan de acceptorstam
  const ac = arms.acc, an = ac.an, ex = ac.x1 + Math.cos(an) * 0.22 * u, ey = ac.y1 + Math.sin(an) * 0.22 * u;
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(ac.x1 - Math.sin(an) * sw, ac.y1 + Math.cos(an) * sw); ctx.lineTo(ex, ey); ctx.stroke();
  for (let i = 0; i < 3; i++) { const f = (i + 0.5) / 3; _bioCirc(ctx, lerp(ac.x1, ex, f) - Math.sin(an) * sw * 0.4, lerp(ac.y1, ey, f) + Math.cos(an) * sw * 0.4, Math.max(1.5, 0.045 * u), RNA_BASE.base['CCA'[i]], kd, 1); }
  const aaP = [ex + Math.cos(an) * 0.2 * u, ey + Math.sin(an) * 0.2 * u];
  if (aa > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(aa, 0, 1); const r = 0.17 * u * (0.6 + 0.4 * aa); _bioCirc(ctx, aaP[0] + Math.cos(an) * (1 - aa) * 0.5 * u, aaP[1] + Math.sin(an) * (1 - aa) * 0.5 * u, r, aaKleur, lighten(aaKleur, 0.35), 1.5); ctx.restore(); }
  ctx.restore();
  return { anti: [ap[0] + dir[0] * 0.25 * u, ap[1] + dir[1] * 0.25 * u], aa: aaP, richting: AC.an };
}

// =====================================================================================
// groep genregulatie
// =====================================================================================

// =====================================================================================
// CODONTABEL (rooster 4 × 4). Recept (OpenStax Biology 2e § 15.1; Suza & Lee, Genetics, Agriculture and Biotechnology,
// appendix 1 'Codon table'): 64 codons van drie basen in het mRNA. Rijen = eerste base (U C A G, links), kolommen = tweede
// base (boven), in elk vak vier codons die alleen in de derde base verschillen (rechts U C A G). 61 codons coderen voor een
// aminozuur, de code is gedegenereerd (meestal verschilt alleen de derde base); AUG = start (methionine), UAA, UAG, UGA = stop.
//  - aflezen is een pad: eerst de rij van de eerste base, dan de kolom van de tweede, dan de regel van de derde (o.pad 0..1).
//  - basen als tegeltjes in de RNA-tinten (C1: RNA teal, U = RNA, geen T); start groen omrand, stop koraal.
//  - aminozuren als drieletterafkorting zoals in BiNaS (Phe, Leu …); o.namen = {Phe: 'fenylalanine', …} vervangt ze.
// Bekende fouten: T in plaats van U; derde base als kolom; stopcodons zonder markering; codon zonder zichtbaar leespad.
// (x, y) = linksboven; s = schaal (± 1030 × 770 px bij s = 1). o.codon = 'AUG' + o.pad 0..1 = leespad; o.hl = {codon: kleur};
// o.dim = andere vakken gedimd; o.start/o.stop (standaard aan). Geeft {celVan(codon) → [x, y], cel, aa: [x, y] van het gekozen codon}.
// =====================================================================================
const CODE_B = 'UCAG';
const CODE_AA = (() => { const s = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG', d = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', '*': 'stop', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly' };
  const m = {}; let i = 0; for (const a of CODE_B) for (const b of CODE_B) for (const c of CODE_B) m[a + b + c] = d[s[i++]]; return m; })();
const _cdRNA = { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, _cdRNAL = { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
function _cdTegel(ctx, x, y, b, w, h, s, a = 1, rand = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 7 * s); shape(ctx, _cdRNA[b], rand || lighten(_cdRNA[b], 0.3), rand ? 3 : 1.2);
  text(ctx, b, x, y + h * 0.27, fTekst(h * 0.74, 700), _cdRNAL[b], 'center'); ctx.restore(); }
function codonTabel(ctx, x, y, s = 1, o = {}) {
  const { a = 1, codon = null, pad = 1, hl = {}, dim = false, start = true, stop = true, namen = null } = o; if (a <= 0.01) return {};
  const cw = 230 * s, lh = 40 * s, ph = lh * 4 + 14 * s, X0 = x + 60 * s, Y0 = y + 70 * s, out = { cel: null, aa: null };
  const p1 = codon ? ease(clamp(pad * 3, 0, 1)) : 0, p2 = codon ? ease(clamp(pad * 3 - 1, 0, 1)) : 0, p3 = codon ? ease(clamp(pad * 3 - 2, 0, 1)) : 0;
  const ri = codon ? CODE_B.indexOf(codon[0]) : -1, ci = codon ? CODE_B.indexOf(codon[1]) : -1, ki = codon ? CODE_B.indexOf(codon[2]) : -1;
  ctx.save(); ctx.globalAlpha *= a;
  // leespad: rij (eerste base) en kolom (tweede base) als zachte gouden banen
  if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= 0.22 * p1; roundRect(ctx, x + 4 * s, Y0 + ri * ph, (60 * s - 4 * s) + cw * 4 * p1 + 50 * s * p1, ph, 12 * s); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= 0.22 * p2; roundRect(ctx, X0 + ci * cw, y + 30 * s, cw, (Y0 - y - 30 * s) + ph * 4 * p2, 12 * s); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
  metaText(ctx, '2e base', X0 + cw * 2, y + 14 * s, C.text2, 'center', 22 * s); metaText(ctx, '1e', x + 28 * s, y + 14 * s, C.text2, 'center', 22 * s); metaText(ctx, '3e', X0 + cw * 4 + 26 * s, y + 14 * s, C.text2, 'center', 22 * s);
  for (let j = 0; j < 4; j++) _cdTegel(ctx, X0 + cw * j + cw / 2, y + 48 * s, CODE_B[j], 40 * s, 34 * s, s, 1, j === ci && p2 > 0.5 ? C.goud : null);
  for (let i = 0; i < 4; i++) { const yy = Y0 + i * ph; _cdTegel(ctx, x + 28 * s, yy + ph / 2, CODE_B[i], 40 * s, 34 * s, s, 1, i === ri && p1 > 0.5 ? C.goud : null);
    for (let j = 0; j < 4; j++) { const xx = X0 + cw * j; roundRect(ctx, xx + 4 * s, yy + 4 * s, cw - 8 * s, ph - 8 * s, 10 * s); shape(ctx, rgba(C.fill, 0.92), rgba(C.line, 0.45), 1);
      for (let k = 0; k < 4; k++) { const cod = CODE_B[i] + CODE_B[j] + CODE_B[k], aa = CODE_AA[cod], ly = yy + 11 * s + lh * k, isSt = start && cod === 'AUG', isSp = stop && aa === 'stop';
        const kies = codon === cod && p3 > 0.01, h = hl[cod], dimmen = dim && !kies && !h && !(codon && p3 > 0.5 && false);
        if (isSt) { roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); ctx.strokeStyle = C.groen; ctx.lineWidth = 2.5 * s; ctx.stroke(); }
        if (h) { roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); shape(ctx, rgba(h, 0.25), h, 2); }
        if (kies) { ctx.save(); ctx.globalAlpha *= p3; roundRect(ctx, xx + 10 * s, ly, cw - 20 * s, lh - 4 * s, 8 * s); shape(ctx, rgba(C.goud, 0.3), C.goud, 3 * s); ctx.restore(); out.cel = [xx + cw / 2, ly + lh / 2]; out.aa = [xx + cw - 26 * s, ly + lh / 2]; }
        ctx.save(); if (dimmen) ctx.globalAlpha *= 0.35;
        for (let q = 0; q < 3; q++) text(ctx, cod[q], xx + 28 * s + q * 21 * s, ly + lh * 0.7, fTekst(29 * s, 700), q === 2 ? lighten(_cdRNA[cod[2]], 0.25) : C.text, 'center');
        const naam = namen && namen[aa] ? namen[aa] : aa; text(ctx, naam, xx + cw - 22 * s, ly + lh * 0.7, fTekst(29 * s, isSp || isSt ? 700 : 400), isSp ? C.koraal : isSt ? C.groen : C.text2, 'right'); ctx.restore(); } }
    for (let k = 0; k < 4; k++) text(ctx, CODE_B[k], X0 + cw * 4 + 26 * s, yy + 11 * s + lh * k + lh * 0.7, fTekst(26 * s, 700), k === ki && p3 > 0.5 && i === ri ? C.goud : lighten(_cdRNA[CODE_B[k]], 0.25), 'center'); }
  out.celVan = (cod) => { const i = CODE_B.indexOf(cod[0]), j = CODE_B.indexOf(cod[1]), k = CODE_B.indexOf(cod[2]); return [X0 + cw * j + cw / 2, Y0 + i * ph + 11 * s + lh * k + lh / 2]; };
  ctx.restore(); return out;
}

// =====================================================================================
// GEN-OPBOUW op het DNA (balk op de helix). Recept (OpenStax Biology 2e § 15.4 en § 16.4; Lodish 8e § 8.1):
//  - een gen ligt op het DNA als een stuk met vaste volgorde: promotor (bindplek voor transcriptiefactoren en RNA-polymerase,
//    stroomopwaarts van het startpunt; pijltje = startpunt en leesrichting) → exon – intron – exon – … → terminator.
//  - exonen = coderende stukken, intronen = niet-coderende stukken ertussen; genen kunnen zeer lange intronen hebben (OpenStax):
//    standaard zijn de intronen hier langer getekend dan de exonen, 'niet op schaal'.
//  - splicing (o.splice 0..1): het hele gen wordt eerst overgeschreven tot voorloper-mRNA (dunne teal streng: exondelen teal,
//    introndelen grijs), spliceosomen knippen de intronen eruit en plakken de exonen aan elkaar; het rijpe mRNA krijgt een
//    kapje aan 5' en een poly-A-staart (± 200 A's) aan 3'.
//  - genstrip (o.modus 'strip'): een stuk chromosoom met veel genen; o.aan[i] = gen i staat aan (goud, mRNA komt eraf).
//  - het DNA is de dubbele helix (dnaDraad, vereist lib_micro_evo.js); de gebieden liggen er als dichte blokken op, de spiraal
//    is alleen tussen de blokken zichtbaar (Kamiel 28 okt 2026).
// Bekende fouten: intronen die in het mRNA blijven; promotor ná het gen; mRNA als dikke balk; elk gen even lang.
// (x, y) = begin van de promotor op de DNA-as; w = lengte van promotor t/m terminator. o.exonen, o.intronen = relatieve lengtes;
// o.hl = 'promotor' | 'exon' | 'intron' | 'terminator' (goud omrand). Geeft {promotor, start, exonen[], intronen[], terminator, mrna} terug.
// =====================================================================================
// _goIndeling: kier (1,6 % van w) tussen de gebieden, daar is de DNA-helix te zien.
function _goIndeling(x, w, ex, inn) { const delen = [['p', 0.55]]; ex.forEach((e, i) => { delen.push(['e', e]); if (i < inn.length) delen.push(['i', inn[i]]); }); delen.push(['t', 0.32]);
  const tot = delen.reduce((s, d) => s + d[1], 0), gap = w * 0.016; let xx = x; return delen.map(([k, l]) => { const L = w * l / tot - gap; const r = [k, xx, xx + L]; xx += L + gap; return r; }); }
function _goSlier(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function genOpbouw(ctx, x, y, w, o = {}) {
  const { a = 1, exonen = [1, 1.15, 0.8], intronen = [1.7, 2.3], splice = 0, modus = 'gen', aan = null, hl = null, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1000, bh = 46 * s, uit = { exonen: [], intronen: [] };
  ctx.save(); ctx.globalAlpha *= a;
  // DNA = de rechtsdraaiende helix (dnaDraad, lib_micro_evo.js) onder de blokken; de blokken zijn dicht gevuld, zodat de spiraal
  // alleen tussen en naast de gebieden te zien is en niet binnen de blokken (Kamiel 28 okt: 'niet binnen de blokken, dat leidt af').
  const dnaLijn = (x0, x1) => dnaDraad(ctx, [[x0, y], [x1, y]], { w: Math.max(4, 20 * s), helix: 20 * s >= 6, glad: false, fase: t * 0.1 });
  const dicht = (kl, k) => _mixHex(kl, '#1A2740', k); // ondoorzichtige tint (geen doorschijnende helix in het blok)
  if (modus === 'strip') { const n = (aan || []).length || 14; dnaLijn(x - 30 * s, x + w + 30 * s);
    for (let i = 0; i < n; i++) { const L = w / n * (0.45 + 0.4 * hash(i * 3.3 + 1)), xx = x + w * i / n + (w / n - L) / 2, on = aan ? aan[i] : i % 3 === 0;
      roundRect(ctx, xx, y - bh * 0.42, L, bh * 0.84, 6 * s); shape(ctx, on ? dicht(C.goud, 0.15) : dicht(C.kern, 0.3), on ? lighten(C.goud, 0.3) : rgba(C.kernR, 0.6), 1.2);
      if (on) { const P = []; for (let k = 0; k <= 10; k++) P.push([xx + L * 0.5 + Math.sin(k * 0.9 + i + t) * 7 * s, y - bh * 0.5 - k * 7 * s]); _goSlier(ctx, P, C.teal, 2.4 * s); }
      uit.exonen.push([xx + L / 2, y]); }
    ctx.restore(); return uit; }
  const D = _goIndeling(x, w, exonen, intronen); dnaLijn(x - 40 * s, x + w + 40 * s);
  D.forEach(([k, x0, x1]) => { const isHl = hl === { p: 'promotor', e: 'exon', i: 'intron', t: 'terminator' }[k];
    if (k === 'p') { roundRect(ctx, x0, y - bh / 2, x1 - x0, bh, 10 * s); shape(ctx, dicht(C.goud, 0.72), C.goud, 2 * s); uit.promotor = [(x0 + x1) / 2, y];
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 2 * s, y - bh / 2); ctx.lineTo(x1 + 2 * s, y - bh * 1.15); ctx.lineTo(x1 + 34 * s, y - bh * 1.15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1 + 40 * s, y - bh * 1.15); ctx.lineTo(x1 + 28 * s, y - bh * 1.15 - 8 * s); ctx.lineTo(x1 + 28 * s, y - bh * 1.15 + 8 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); uit.start = [x1, y - bh * 1.15]; }
    else if (k === 'e') { roundRect(ctx, x0, y - bh / 2, x1 - x0, bh, 8 * s); shape(ctx, C.kern, C.kernR, 1.5); uit.exonen.push([(x0 + x1) / 2, y]); }
    else if (k === 'i') { roundRect(ctx, x0, y - bh * 0.28, x1 - x0, bh * 0.56, 6 * s); shape(ctx, dicht(C.line, 0.72), rgba(C.line, 0.7), 1.2); uit.intronen.push([(x0 + x1) / 2, y]); }
    else { roundRect(ctx, x0, y - bh * 0.4, x1 - x0, bh * 0.8, 8 * s); shape(ctx, dicht(C.line, 0.78), C.line, 1.5); ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x1 - 10 * s, y - bh * 0.4); ctx.lineTo(x1 - 10 * s, y + bh * 0.4); ctx.stroke(); uit.terminator = [(x0 + x1) / 2, y]; }
    if (isHl) { roundRect(ctx, x0 - 5 * s, y - bh / 2 - 5 * s, x1 - x0 + 10 * s, bh + 10 * s, 12 * s); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.stroke(); } });
  // splicing: 0–0.3 voorloper-mRNA groeit; 0.3–0.55 knippen (intronen zakken weg); 0.55–1 exonen schuiven aan elkaar, kapje + staart
  if (splice > 0.01) { const g = ease(clamp(splice / 0.3, 0, 1)), kn = ease(clamp((splice - 0.3) / 0.25, 0, 1)), sch = ease(clamp((splice - 0.55) / 0.35, 0, 1)), af = ease(clamp((splice - 0.85) / 0.15, 0, 1));
    const yr = y + 95 * s, xs = D[1][1], xe = D[D.length - 2][2], xEind = xs + (xe - xs) * g;
    const E = D.filter(d => d[0] === 'e'), Ltot = E.reduce((q, d) => q + d[2] - d[1], 0), cx = (xs + xe) / 2; let acc = cx - Ltot / 2;
    const golf = (u, ph) => Math.sin(u / (26 * s) + ph) * 5 * s + Math.sin(u / (71 * s) + ph) * 3 * s;
    D.forEach(([k, x0, x1], idx) => { if (k !== 'e' && k !== 'i') return; if (x0 > xEind) return; const xx1 = Math.min(x1, xEind);
      if (k === 'e') { const doel = acc; acc += x1 - x0; const dx = (doel - x0) * sch; const P = []; for (let u = x0; u <= xx1; u += 6 * s) P.push([u + dx, yr + 70 * s * sch + golf(u + dx, 0) * sch + golf(u, 0) * (1 - sch)]); if (P.length > 1) _goSlier(ctx, P, C.teal, 3.2 * s); }
      else { const val = kn, P = []; for (let u = x0; u <= xx1; u += 6 * s) P.push([u, yr + val * 60 * s + golf(u, 0) + Math.sin((u - x0) / (x1 - x0) * Math.PI) * val * 26 * s]);
        ctx.save(); ctx.globalAlpha *= 1 - ease(clamp((splice - 0.5) / 0.3, 0, 1)); if (P.length > 1) _goSlier(ctx, P, rgba(C.line, 0.8), 2.4 * s);
        if (kn > 0.05 && kn < 1) { [x0, x1].forEach(xk => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(xk - 6 * s, yr - 12 * s); ctx.lineTo(xk + 6 * s, yr + 12 * s); ctx.moveTo(xk + 6 * s, yr - 12 * s); ctx.lineTo(xk - 6 * s, yr + 12 * s); ctx.stroke(); }); } ctx.restore(); } });
    if (af > 0.01) { const y2 = yr + 70 * s, xa = cx - Ltot / 2, xb = cx + Ltot / 2; ctx.save(); ctx.globalAlpha *= af; _bioCirc(ctx, xa - 8 * s, y2 + golf(xa, 0), 8 * s, C.goud, lighten(C.goud, 0.3), 1.2);
      const P = []; for (let u = 0; u <= 120 * s; u += 5 * s) P.push([xb + u, y2 + golf(xb, 0) + Math.sin(u / (9 * s)) * 3 * s]); _goSlier(ctx, P, lighten(C.teal, 0.35), 1.8 * s); ctx.restore(); uit.mrna = [cx, y2]; } }
  ctx.restore(); return uit;
}

// =====================================================================================
// NUCLEOSOMEN DICHT ↔ OPEN, vooraanzicht met ladingen (vezel ↔ kralensnoer). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 4):
//  - elk nucleosoom = kern van acht histonen, twee lagen van vier (H2A, H2B, H3, H4 elk twee keer; schijf ± 11 nm) met het DNA (2 nm) er ± 1,65 keer omheen; recht van voren
//    gezien een schijf met een ring DNA langs de rand, linker-DNA naar de volgende.
//  - histonstaarten zijn positief geladen (+), het DNA negatief (−): ze trekken elkaar aan. Dicht (o.open 0): nucleosomen
//    pakken zich in een zigzag-vezel tegen elkaar, de promotor zit ertussen verstopt, een transcriptiefactor kan er niet bij.
//  - acetylgroepen (groen) op de staarten maken ze minder positief ('the charge becomes less positive, and the binding of DNA
//    to the histones is relaxed', OpenStax): de + verdwijnen, de vezel valt open tot een kralensnoer, de promotor (goud)
//    ligt vrij en een transcriptiefactor kan binden (o.tf).
// Rustiger (Kamiel 28 okt 2026, 'beetje druk'): DNA om de kern als gladde band, helix alleen in het linker-DNA; staarten met
// vier kralen; acetylgroep als één groen bolletje; achter de vier histonen vooraan zie je de vier van de tweede laag.
// Bekende fouten: vier histonen in plaats van acht; open = minder nucleosomen; lading op de verkeerde plek; DNA dat door de schijf loopt.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de zijaanzichtversie: van (x0,y0) naar (x1,y1); o.n, o.R (straal
// van de schijf), o.open 0..1, o.tf 0..1, o.t. Geeft {promotor, centra, tf} terug.
// =====================================================================================
function _naAcetyl(ctx, x, y, rr, an, a = 1) { // acetylgroep: één groen bolletje aan een kort steeltje (rustig; C=O en CH3 niet apart)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = rr * 0.4;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(rr * 1.4, 0); ctx.stroke(); _bioCirc(ctx, rr * 2.1, 0, rr * 0.9, C.groen, lighten(C.groen, 0.35), 1); ctx.restore(); }
function nucleosoomAcetyl(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, open = 0, tf = 0, t = 0 } = o; if (a <= 0.01) return {};
  const ac = ease(clamp(open / 0.35, 0, 1)), schuif = ease(clamp((open - 0.3) / 0.7, 0, 1));
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), cs = Math.cos(ang), sn = Math.sin(ang), Wd = (p) => [x0 + p[0] * cs - p[1] * sn, y0 + p[0] * sn + p[1] * cs];
  const dw = Math.max(5, R * 0.36), Rs = R * 0.78, uit = { centra: [] }, half = n / 2;
  // plekken: dicht = zigzag (twee rijen, overlappend), open = één rij met in het midden een vrij stuk (promotor)
  const C2 = []; for (let i = 0; i < n; i++) { const zx = L / 2 + (i - (n - 1) / 2) * R * 1.15, zy = (i % 2 ? 1 : -1) * R * 0.62;
    const ox = i < half ? R * 0.95 + i * R * 2.3 : L - R * 0.95 - (n - 1 - i) * R * 2.3;
    C2.push([lerp(zx, ox, schuif), lerp(zy, (i % 2 ? 1 : -1) * R * 0.12, schuif)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const pm = [(C2[half - 1][0] + C2[half][0]) / 2, (C2[half - 1][1] + C2[half][1]) / 2 + R * 0.25 * schuif];
  if (schuif > 0.05) { ctx.save(); ctx.globalAlpha *= schuif; roundRect(ctx, pm[0] - R * 0.95, pm[1] - dw * 1.3, R * 1.9, dw * 2.6, dw); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  // DNA-pad: binnenkomen links onder elke schijf, rondje langs de rand, eruit rechts onder → naar de volgende
  const ring = (c, i) => { const P = [], a0 = Math.PI * 0.75, tot = 1.65 * 6.283; for (let k = 0; k <= 70; k++) { const u = k / 70, an = a0 + u * tot, rr = Rs + dw * 0.55 + (u < 0.5 ? 0 : -dw * 0.25); P.push([c[0] + Math.cos(an) * rr, c[1] + Math.sin(an) * rr]); } return P; };
  const R2 = C2.map(ring);
  const linkers = [[[0, 0], [C2[0][0] - R * 0.8, C2[0][1] + R * 0.3], R2[0][0]]];
  for (let i = 0; i < n - 1; i++) { const A = R2[i][R2[i].length - 1], B = R2[i + 1][0]; linkers.push(i === half - 1 ? [A, [pm[0] - R * 0.5, pm[1]], [pm[0] + R * 0.5, pm[1]], B] : [A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + R * 0.35], B]); }
  linkers.push([R2[n - 1][R2[n - 1].length - 1], [C2[n - 1][0] + R * 0.9, C2[n - 1][1] - R * 0.2], [L, 0]]);
  linkers.forEach(P => dnaDraad(ctx, P, { w: dw, helix: true, fase: t * 0.2 }));
  // schijven met DNA-ring (achterste rij eerst)
  const volg = [...C2.keys()].sort((i, j) => C2[i][1] - C2[j][1]);
  volg.forEach(i => { const c = C2[i]; _bioCirc(ctx, c[0], c[1], Rs, '#6E7F9C', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.8 + 0.785; _bioCirc(ctx, c[0] + Math.cos(an) * Rs * 0.5, c[1] + Math.sin(an) * Rs * 0.5, Rs * 0.32, '#5E6E8A', '#8494B0', 1); } // achterste laag: vier histonen
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.8; _bioCirc(ctx, c[0] + Math.cos(an) * Rs * 0.4, c[1] + Math.sin(an) * Rs * 0.4, Rs * 0.36, '#7A8BA8', '#A4B2CA', 1); } // voorste laag: vier histonen
    dnaDraad(ctx, R2[i], { w: dw * 0.75, helix: false, glad: false, fase: t * 0.2 }); // DNA om de kern als rustige band (de helix zit in het linker-DNA)
    // staarten: dicht = tegen het DNA van de buren met +; open = naar buiten met acetylgroepen
    const rr = R * 0.075; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.4 + i, P = [];
      for (let q = 0; q < 4; q++) { const u = q / 3, len = lerp(0.55, 0.95, schuif) * R, krul = lerp(1.4, 0.3, schuif); P.push([c[0] + Math.cos(an) * Rs * 0.7 + Math.cos(an + u * krul) * u * len, c[1] + Math.sin(an) * Rs * 0.7 + Math.sin(an + u * krul) * u * len]); }
      ctx.strokeStyle = '#B8C4D8'; ctx.lineWidth = rr * 0.5; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach(p => _bioCirc(ctx, p[0], p[1], rr, '#9AAAC4', '#C4CEDC', 1));
      const q = P[2]; if (ac < 0.5 && R >= 24) { ctx.save(); ctx.globalAlpha *= 1 - ac * 2; text(ctx, '+', q[0] + rr * 2.2, q[1] - rr * 1.2, fTekst(Math.max(10, R * 0.32), 700), C.text, 'center'); ctx.restore(); }
      _naAcetyl(ctx, P[3][0], P[3][1], rr * 1.1, an + 0.3, ac); } uit.centra.push(Wd(c)); });
  if (tf > 0.01 && schuif > 0.6) { const p = ease(tf), tx = pm[0], ty = lerp(pm[1] - R * 2.6, pm[1] - dw * 1.7, p); enzymKluwen(ctx, tx, ty, R * 0.62, { a: Math.min(1, tf * 2), col: '#7A8BA8', seed: 3, an: Math.PI / 2 }); uit.tf = Wd([tx, ty]); }
  uit.promotor = Wd(pm); ctx.restore(); return uit;
}

// =====================================================================================
// RNA-INTERFERENTIE (overzicht van het hele proces in één beeld; ronde 2: puzzelbasen op het dsRNA, knipplek gemarkeerd, eiwitten als gevouwen lint). Recept (OpenStax Biology 2e § 16.5; Kawamata & Tomari
// 2010? zie bron.md: Dicer knipt dubbelstrengs RNA in stukjes van ± 21 nt met 2 nt overhang aan 3'; het duplex gaat van Dicer
// naar Argonaute (RISC), de gidsstreng blijft, de passagiersstreng verdwijnt; bij volledige passing knipt Argonaute het
// doel-mRNA tegenover nucleotide 10–11 van de gids; miRNA's zijn 21–24 nt):
//  - dubbelstrengs RNA = twee dunne teal strengen met korte sporten (basenparen); Dicer = enzym (gevouwen keten) dat er
//    stukjes van gelijke lengte af knipt.
//  - RISC (Argonaute + één streng, de gids) zoekt een mRNA met de passende volgorde, bindt en knipt het in het midden van de
//    gids; de twee stukken mRNA worden afgebroken, er wordt geen eiwit van gemaakt. RISC gaat door naar het volgende mRNA.
//  - mRNA blijft dun en sliertig (kapje aan 5', poly-A-staart aan 3').
//  - o.f 0..1: 0–0.2 Dicer knipt · 0.2–0.45 RISC houdt de gids, passagier weg · 0.45–0.7 RISC bindt het mRNA · 0.7–0.85 knip ·
//    0.85–1 stukken vallen uiteen.
// Bekende fouten: RISC dat DNA knipt; beide strengen in RISC; mRNA als balk; knip zonder passende volgorde.
// (x, y) = midden; s = schaal (± 1000 × 520 px bij s = 1). o.f, o.t. Geeft {dsRNA, dicer, risc, mrna, knip} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
// (gedeeld lint-hulpje _grKluwen/_grKluwenVorm/_grKluwenCache: zie inbouw/genregulatie/_hulp.js, één keer in lib_bio.js)
function _riStreng(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function _riDuplex(ctx, x, y, len, s, rot = 0, a = 1, gids = 1, pass = 1, passOff = 0, seed = 1) { // dubbelstrengs stukje met puzzelbasen (A–U, G–C), 2 nt overhang aan elk 3'-eind; verkort getekend
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const bdx = 17 * s, bs = bdx / 62, h = 184 * bs / 2 + 1.5 * s, ov = bdx * 1.1, nb = Math.max(1, Math.floor((len - 2 * ov) / bdx)), x0 = -len / 2 + ov + (len - 2 * ov - nb * bdx) / 2, comp = { A: 'U', U: 'A', C: 'G', G: 'C' };
  const reeks = []; for (let j = 0; j < nb; j++) reeks.push('AUGC'[Math.floor(hash(seed * 13.7 + j * 3.3) * 4)]);
  if (pass > 0.01) { ctx.save(); ctx.globalAlpha *= pass; reeks.forEach((b, j) => baseRingRNA(ctx, x0 + (j + 0.5) * bdx, h + passOff, comp[b], -1, { s: bs, plekA: 0 })); _riStreng(ctx, [[-len / 2 + ov, h + passOff], [len / 2, h + passOff]], lighten(C.teal, 0.4), 3.2 * s); ctx.restore(); }
  if (gids > 0.01) { ctx.save(); ctx.globalAlpha *= gids; reeks.forEach((b, j) => baseRingRNA(ctx, x0 + (j + 0.5) * bdx, -h, b, 1, { s: bs, plekA: 0 })); _riStreng(ctx, [[-len / 2, -h], [len / 2 - ov, -h]], C.teal, 3.2 * s); ctx.restore(); }
  ctx.restore(); }
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0 } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.2, 0, 1)), p2 = ease(clamp((f - 0.2) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.45) / 0.25, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.85) / 0.15, 0, 1)), uit = {};
  const X = (v) => x + v * s, Y = (v) => y + v * s, dl = 120; // lengte van één stukje (± 21 nt; verkort getekend met 6 basenparen)
  ctx.save(); ctx.globalAlpha *= a;
  // 1) lang dubbelstrengs RNA linksboven; Dicer schuift van rechts naar links en knipt stukjes af
  const x0 = -490, x1 = -60, yd = -200, nKnip = Math.floor(p1 * 3.01);
  const rest = x1 - nKnip * (dl + 0); _riDuplex(ctx, X((x0 + rest) / 2), Y(yd), (rest - x0) * s, s, 0, 1 - p5 * 0.5, 1, 1, 0, 9);
  for (let k = 1; k <= nKnip; k++) { const kx = X(rest + (k - 1) * 0 ), ky = Y(yd); if (k > 1) break; ctx.save(); ctx.globalAlpha *= 1 - p3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(kx - 9 * s, ky - 34 * s); ctx.lineTo(kx + 9 * s, ky - 14 * s); ctx.moveTo(kx + 9 * s, ky - 34 * s); ctx.lineTo(kx - 9 * s, ky - 14 * s); ctx.stroke(); ctx.restore(); }
  for (let k = 0; k < 3; k++) { if (k >= nKnip) break; const isGids = k === 0, px = X(x1 - (k + 0.5) * dl + 20 + k * 30), py = Y(yd + 95 + (k % 2) * 40);
    if (isGids && p2 > 0.01) continue; _riDuplex(ctx, px, py, (dl - 6) * s, s, (k % 2 ? 0.2 : -0.15), 1 - p5 * 0.5, 1, 1, 0, k + 2); }
  const dxD = X(rest + 10), dyD = Y(yd - 46); const binD = (qx, qy) => { const ex = qx / 58, ey = qy / 40; return ex * ex + ey * ey < 1 && Math.hypot(qx, qy - 46) > 16; };
  _grKluwen(ctx, dxD, dyD, binD, { r: 6, sc: s, col: '#7A8BA8', seed: 13, bbox: [-60, -42, 60, 42], key: 'dicer', a: 1 - p3 * 0.6 }); uit.dicer = [dxD, dyD - 50 * s]; uit.dsRNA = [X((x0 + rest) / 2), Y(yd)];
  // 2) RISC (Argonaute, twee lobben) pakt het eerste stukje; de passagiersstreng gaat weg
  const rx = lerp(X(-150), X(60), p3), ry = lerp(Y(-40), Y(132), p3); const binR = (qx, qy) => { const ex = qx / 70, ey = qy / 50; return ex * ex + ey * ey < 1 && !(Math.abs(qy - 12) < 9 && qx > -60); };
  _grKluwen(ctx, rx, ry, binR, { r: 6, sc: s, col: '#8C9AB4', seed: 17, bbox: [-72, -52, 72, 52], key: 'risc', a: Math.min(1, f * 6) });
  if (p2 > 0.01) { const gx = lerp(X(x1 - dl / 2 + 20), rx, p2), gy = lerp(Y(yd + 95), ry + 4 * s, p2); _riDuplex(ctx, gx, gy, (dl - 6) * s, s, 0, 1, 1, 1 - ease(clamp(p2 * 1.6 - 0.6, 0, 1)), p2 * 60 * s, 2);
    // gidsstreng goud omrand zodra hij alleen in RISC zit
    if (p2 > 0.8) { ctx.save(); ctx.globalAlpha *= (p2 - 0.8) / 0.2 * (1 - p4); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5 * s; roundRect(ctx, gx - dl / 2 * s - 4 * s, gy - 34 * s, (dl - 6) * s + 8 * s, 40 * s, 8 * s); ctx.stroke(); ctx.restore(); } }
  uit.risc = [rx, ry - 60 * s];
  // 3) mRNA (dunne sliert, kapje + staart) onderaan; RISC bindt in het midden; knip; stukken vallen uiteen
  const ym = Y(150), xa = X(-420), xb = X(420), xm = X(60), gap = p4 * 30 * s, val = p5;
  const seg = (xs, xe, side) => { const P = []; for (let u = xs; side < 0 ? u <= xe : u <= xe; u += 6 * s) { const yy = ym + Math.sin(u / (34 * s) + t * 0.5) * 7 * s + Math.sin(u / (95 * s)) * 6 * s + val * 40 * s * Math.abs(Math.sin(u / (40 * s))); P.push([u + side * gap, yy + (1 - p3) * 0]); } return P; };
  ctx.save(); ctx.globalAlpha *= 1 - val * 0.75; const L = seg(xa, xm, -1), Rr = seg(xm, xb, 1);
  if (val > 0.01) { [L, Rr].forEach(P => { for (let i = 0; i < P.length - 6; i += 8) _riStreng(ctx, P.slice(i, i + 5), C.teal, 2.6 * s); }); } else { _riStreng(ctx, L, C.teal, 2.6 * s); _riStreng(ctx, Rr, C.teal, 2.6 * s); }
  _bioCirc(ctx, xa - 6 * s, ym, 7 * s, C.goud, lighten(C.goud, 0.3), 1); const Pa = []; for (let u = 0; u <= 80 * s; u += 5 * s) Pa.push([xb + gap + u, ym + Math.sin(u / (8 * s)) * 3 * s]); _riStreng(ctx, Pa, lighten(C.teal, 0.35), 1.6 * s); ctx.restore();
  uit.mrna = [X(-250), ym];
  if (p3 > 0.9 && p4 < 1) { ctx.save(); ctx.globalAlpha *= Math.min((p3 - 0.9) * 10, 1 - p4 * 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 * s; [[-1, -1], [1, -1]].forEach(([q]) => {}); ctx.beginPath(); ctx.moveTo(xm - 10 * s, ym - 16 * s); ctx.lineTo(xm + 10 * s, ym + 16 * s); ctx.moveTo(xm + 10 * s, ym - 16 * s); ctx.lineTo(xm - 10 * s, ym + 16 * s); ctx.stroke(); ctx.restore(); uit.knip = [xm, ym]; }
  ctx.restore(); return uit;
}

// =====================================================================================
// TRANSCRIPTIEFACTOR als DIMEER (twee kluwens die het DNA als een klem omvatten). Recept (OpenStax Biology 2e § 16.4;
// Lodish 8e § 9.2; Ruff e.a. 2000, Breast Cancer Res 2:353 voor de oestrogeenreceptor):
//  - veel transcriptiefactoren binden als paar (dimeer) op een tweedelige herkenningsvolgorde: elk van de twee eiwitketens
//    steekt een α-helix in een grote groef, de twee helices liggen één winding (± 3,4 nm) uit elkaar. Een eiwit is een gevouwen
//    keten, geen bol. De DNA-bindende delen van de oestrogeenreceptor zijn los monomeer en vormen pas op het DNA een paar.
//  - gebonden trekt een activator RNA-polymerase naar de promotor; een remmer bindt op dezelfde manier maar houdt de polymerase weg.
//  - hormoon-receptorcomplex (o.hormoon): oestradiol in een afgesloten holte van elke helft; mét hormoon vormt de receptor het paar.
//  - kleur: grijsblauw (C2), activator groene zweem, remmer koraal zweem; herkenningshelices goud als ze passen.
// Bekende fouten: een bol; twee helften die op willekeurige plekken zitten; dimeer dat al als paar aankomt terwijl het
// verhaal zegt dat het hormoon de koppeling maakt.
// Zelfde aanroep als de monomeerversie: (x, y) = midden van de bindplek op de DNA-as; s = schaal (± 260 × 170 px bij s = 1);
// o.dna, o.gebonden 0..1 (0 = twee helften los aan weerszijden, 1 = klem dicht), o.soort, o.polymerase, o.hormoon, o.fold, o.t.
// Geeft {tf, helix, pol, hormoon} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, 27 okt 2026): EIWITKLUWEN binnen een omtrek. Eén keer in lib_bio.js plakken;
// transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (de kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN): een eiwit is een keten van aminozuren (kralen) die vouwt: stukken α-helix (strakke
// spiraal, 3,6 aminozuren per winding) afgewisseld met gestrekte stukken en lussen, samen een compacte kluwen. Nooit een
// bol. De omtrek (binnen(x, y) in lokale coördinaten) mag een pasvorm hebben: een holte waar DNA of een molecuul in past.
// Alle maten (bbox, binnen, r) in ontwerpeenheden; o.sc = schaal naar beeld. o.fold 0 = gestrekte keten (net gemaakt) → 1 = gevouwen; o.key = cachesleutel voor de vorm. Geeft de kralen in beeld terug.
// Kleur: regeleiwitten en enzymen grijsblauw (#7A8BA8, C2); de bindende plek mag goud (o.hl = functie(i) → 0..1).
// -------------------------------------------------------------------------------------
const _grKralenCache = {};
function _grKralen(ctx, cx, cy, binnen, o = {}) {
  const { r: r0 = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null, sx = 1 } = o; const r = r0; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r.toFixed(2) + '|' + bbox.join(',');
  let P = _grKralenCache[k];
  if (!P) { P = []; const rows = []; for (let y = bbox[1] + r * 1.1; y <= bbox[3] - r * 0.9; y += r * 2.45) rows.push(y);
    rows.forEach((y, ri) => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
      if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (!best || best[1] - best[0] < r * 2) return;
      const x0 = best[0] + r * 0.9, x1 = best[1] - r * 0.9, dir = ri % 2 ? -1 : 1, helix = hash(seed * 7.3 + ri * 3.1) > 0.42 && x1 - x0 > r * 6;
      const L = x1 - x0, stap = helix ? r * 0.95 : r * 1.7, n = Math.max(2, Math.round(L / stap));
      if (P.length) { const q = P[P.length - 1], xs = dir > 0 ? x0 : x1; P.push([(q[0] + xs) / 2 + dir * -r * 1.1, (q[1] + y) / 2, 0]); }
      for (let i = 0; i <= n; i++) { const u = i / n, x = dir > 0 ? lerp(x0, x1, u) : lerp(x1, x0, u);
        if (helix) { const ph = i / 3.6 * 6.283 + seed; P.push([x, y + Math.sin(ph) * r * 0.95, Math.cos(ph)]); } else P.push([x + (hash(seed * 3.7 + ri * 11 + i * 1.3) - 0.5) * r * 0.6, y + Math.sin(i * 0.9 + seed) * r * 0.25 + (hash(seed * 5.1 + ri * 7 + i * 2.9) - 0.5) * r * 0.9, 0]); } });
    _grKralenCache[k] = P; }
  const n = P.length, L = n * r * 1.8;
  const pts = P.map((p, i) => { const f = ease(clamp(fold * 1.4 - (i / n) * 0.4, 0, 1)); const bx = -L / 2 + i * r * 1.8, by = Math.sin(i * 0.35 + seed) * r * 3;
    const X = lerp(bx, p[0] * sx, f) * sc, Y = lerp(by, p[1], f) * sc, cs = Math.cos(rot), sn = Math.sin(rot);
    return [cx + X * cs - Y * sn, cy + X * sn + Y * cs, (p[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * sc * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  const tint = [0, 0.12, -0.1]; const order = pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]);
  order.forEach(i => { const p = pts[i], z = p[2], t = tint[(i * 7 + seed) % 3]; const h = hl ? hl(i, n) : 0;
    const fill = h > 0.5 ? C.goud : (t >= 0 ? lighten(col, t + 0.08 * z) : _mixHex(col, '#000000', -t)); ctx.beginPath(); ctx.arc(p[0], p[1], r * sc * (0.84 + 0.14 * z), 0, 6.283); shape(ctx, fill, h > 0.5 ? lighten(C.goud, 0.35) : lighten(col, 0.3), 1); });
  ctx.restore(); return pts;
}
function _tfSteroid(ctx, x, y, r, a = 1) { // oestradiol: drie zesringen en een vijfring, met OH aan beide uiteinden (paars: hormoon, C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B9ACE6'; ctx.fillStyle = rgba('#8C7BBF', 0.45); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.lineJoin = 'round';
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let k = 0; k < n; k++) { const an = k / n * 6.283 + (n === 6 ? Math.PI / 6 : -Math.PI / 2 + 0.3); const X = cx + Math.cos(an) * rr, Y = cy + Math.sin(an) * rr; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  const d = r * 1.73; ring(x - d, y + r * 0.5, 6, r); ring(x, y, 6, r); ring(x + d, y + r * 0.5, 6, r); ring(x + d * 1.82, y - r * 0.15, 5, r * 0.86);
  ctx.beginPath(); ctx.moveTo(x - d * 1.85, y + r * 1.0); ctx.lineTo(x - d * 2.3, y + r * 1.3); ctx.moveTo(x + d * 2.3, y - r * 0.6); ctx.lineTo(x + d * 2.6, y - r * 1.1); ctx.stroke(); ctx.restore(); }
function _tfDNA(ctx, x, y, s, t, breed = 300) { // stukje DNA met de promotor als gouden mouw en het startpunt als pijltje
  roundRect(ctx, x - 150 * s, y - 34 * s, 230 * s, 68 * s, 20 * s); shape(ctx, rgba(C.goud, 0.22), rgba(C.goud, 0.7), 1.5);
  dnaDraad(ctx, [[x - breed * s, y], [x + breed * s, y]], { w: 44 * s, helix: true, glad: false, fase: t * 0.05 });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; const xs = x + 90 * s; ctx.beginPath(); ctx.moveTo(xs, y + 26 * s); ctx.lineTo(xs, y + 62 * s); ctx.lineTo(xs + 40 * s, y + 62 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 48 * s, y + 62 * s); ctx.lineTo(xs + 36 * s, y + 54 * s); ctx.lineTo(xs + 36 * s, y + 70 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); }
function _tfPolymerase(ctx, x, y, s, a = 1) { // plaatshouder RNA-polymerase (eigen bibliotheekobject volgt: rnaPolymerase)
  if (a <= 0.01) return; enzymKluwen(ctx, x, y, 78 * s, { a, col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); }
const TF_KLEUR = { activator: '#6F9A86', remmer: '#A57F7A', neutraal: '#7A8BA8' };
function transcriptiefactor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, dna = false, gebonden = 1, soort = 'activator', polymerase = 0, hormoon = 0, fold = 1, t = 0 } = o; if (a <= 0.01) return {};
  const g = ease(gebonden), col = TF_KLEUR[soort] || TF_KLEUR.neutraal, uit = {}, r = 6.5 * s;
  ctx.save(); ctx.globalAlpha *= a; if (dna) _tfDNA(ctx, x, y, s, t);
  if (polymerase > 0.01) { const p = ease(polymerase); const doelX = soort === 'remmer' ? x + 270 * s : x + 185 * s, doelY = soort === 'remmer' ? y - 175 * s : y - 70 * s;
    const px = lerp(x + 420 * s, doelX, p), py = lerp(y - 260 * s, doelY, p) + (soort === 'remmer' ? Math.sin(t * 2) * 6 * s * p : 0); _tfPolymerase(ctx, px, py, s, Math.min(1, polymerase * 2)); uit.pol = [px, py]; }
  // twee helften: links en rechts van het midden, elk boven één grote groef (helices ± 90·s uit elkaar)
  const helften = [-1, 1].map(k => { const ox = x + k * lerp(150, 46, g) * s, oy = y - lerp(120, 0, g) * s + Math.sin(t * 1.2 + k) * 3 * s * (1 - g), rot = k * 0.25 * (1 - g);
    const binnen = (px, py) => { const qx = px * k; const ex = (qx - 6) / 68, ey = (py + 70) / 66; if (ex * ex + ey * ey > 1) return false; return Math.hypot(px + k * 46, py + 2) > 34 && qx > -40; };
    const pts = _grKralen(ctx, ox, oy, binnen, { r: 6.5, sc: s, col, seed: k > 0 ? 6 : 3, rot, bbox: [-90, -140, 90, -6], fold, key: 'tfB' + k });
    const cs = Math.cos(rot), sn = Math.sin(rot), W = (p) => [ox + p[0] * cs - p[1] * sn, oy + p[0] * sn + p[1] * cs, p[2]];
    const H = []; for (let i = 0; i < 9; i++) { const u = i / 8, ph = i / 3.6 * 6.283; H.push(W([(-k * 4 + k * (8 - u * 12)) * s + Math.cos(ph) * 6 * s, (-34 + u * 36) * s + Math.sin(ph) * 3 * s, Math.cos(ph)])); }
    ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, [pts[0], ...H], false); ctx.stroke();
    H.forEach(p => _bioCirc(ctx, p[0], p[1], r * (0.85 + 0.12 * p[2]), g > 0.9 ? C.goud : lighten(col, 0.15), g > 0.9 ? lighten(C.goud, 0.35) : lighten(col, 0.35), 1));
    if (hormoon > 0.01) { const hp = W([k * 22 * s, -84 * s]), h = ease(hormoon); _bioCirc(ctx, hp[0], hp[1], 28 * s, rgba('#121A26', 0.55 * h), rgba(lighten(col, 0.4), 0.6 * h), 1); _tfSteroid(ctx, lerp(hp[0] + k * 180 * s, hp[0] - 2 * s, h), lerp(hp[1] - 110 * s, hp[1], h), 6 * s, Math.min(1, hormoon * 2)); uit.hormoon = hp; }
    return { H, W }; });
  // koppelvlak tussen de helften (dimeer): korte gouden streepjes als de klem dicht is
  if (g > 0.85) { ctx.save(); ctx.globalAlpha *= (g - 0.85) / 0.15; ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2 * s; ctx.setLineDash([4 * s, 4 * s]); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 12 * s, y - (70 + i * 18) * s); ctx.lineTo(x + 12 * s, y - (70 + i * 18) * s); ctx.stroke(); } ctx.restore(); }
  if (soort === 'activator') { const reik = ease(polymerase), W = helften[1].W, st = W([60 * s, -112 * s]), P = [st]; for (let i = 1; i <= 9; i++) { const u = i / 9; P.push([st[0] + u * lerp(40, 95, reik) * s, st[1] + Math.sin(u * 5 + t) * 10 * s - u * lerp(30, -20, reik) * s]); }
    ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = r * 0.38; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach((p, i) => i && _bioCirc(ctx, p[0], p[1], r * 0.72, lighten(col, 0.05), lighten(col, 0.35), 1)); }
  uit.tf = [x, y - 150 * s]; uit.helix = helften[0].H[8]; ctx.restore(); return uit;
}

// =====================================================================================
// UV-SCHADE EN HERSTEL (basenniveau). Recept (Lodish 8e § 5.6 'Nucleotide excision repair' (fig. 5-38); OpenStax Biology 2e
// § 14.6; LibreTexts Microbiology (Liu e.a.) § 13.2):
//  - UV-licht laat twee T's die naast elkaar op dezelfde streng liggen aan elkaar vastgaan (thymine-dimeer, koraal klem);
//    de helix vervormt (knik), daardoor kunnen replicatie en transcriptie er niet langs.
//  - herstel door uitsnijden: een enzymcomplex herkent de vervorming, knipt de beschadigde streng aan beide kanten van de
//    dimeer (bij de mens komt een stuk van ± 24–32 nucleotiden vrij; hier korter: 'schematisch'), het stuk gaat weg,
//    DNA-polymerase vult het gat met de juiste nucleotiden (de andere streng is de mal) en DNA-ligase sluit de laatste naad.
//  - o.f 0..1: 0–0.15 UV-straal · 0.15–0.3 dimeer + knik · 0.3–0.5 enzym knipt · 0.5–0.65 stuk eruit · 0.65–0.85 aanvullen ·
//    0.85–1 ligase sluit.
// Bekende fouten: T's op tegenover elkaar liggende strengen die vastgaan; alleen de twee T's eruit; beide strengen geknipt;
// gat dat zonder mal wordt gevuld.
// (x, y) = midden; s = schaal (± 900 × 420 px bij s = 1). o.f, o.t. Plaatshouders voor de enzymen (kluwen). Geeft {dimeer, knip:[[x,y],[x,y]], enzym, gat} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
// (gedeeld lint-hulpje _grKluwen/_grKluwenVorm/_grKluwenCache: zie inbouw/genregulatie/_hulp.js, één keer in lib_bio.js)
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function uvSchade(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0, seq = 'GCAGCTTACGAGC' } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.15, 0, 1)), p2 = ease(clamp((f - 0.15) / 0.15, 0, 1)), p3 = ease(clamp((f - 0.3) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.5) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.65) / 0.2, 0, 1)), p6 = ease(clamp((f - 0.85) / 0.15, 0, 1));
  const n = seq.length, dx = 64 * s, k = 0.74 * s, H = (184 * k + 16 * s) / 2, x0 = x - (n - 1) * dx / 2, i1 = seq.indexOf('TT'), i2 = i1 + 1, c0 = i1 - 3, c1 = i2 + 3, uit = {};
  const comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, knik = p2 * (1 - p4);
  ctx.save(); ctx.globalAlpha *= a;
  // knik: de bovenstreng buigt rond de dimeer omhoog (vervorming die het enzym herkent)
  const yT = (i) => y - H - knik * 26 * s * Math.exp(-Math.pow((i - (i1 + 0.5)) / 1.3, 2)), yB = () => y + H;
  for (let i = 0; i < n; i++) { const xx = x0 + i * dx; baseRing(ctx, xx, yB() - 8 * s, comp[seq[i]], -1, { s: k, plekA: 0 }); }
  ctx.save(); ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 15 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 - 22 * s, yB()); ctx.lineTo(x0 + (n - 1) * dx + 22 * s, yB()); ctx.stroke(); ctx.strokeStyle = DNA_BASE.rug; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore();
  // bovenstreng: oud deel, weggeknipt stuk (gaat omhoog weg), nieuw deel (licht) dat de polymerase aanvult
  const weg = p4 * 140 * s, nieuwTot = c0 + (c1 - c0 + 1) * p5; // index tot waar het nieuwe stuk is aangevuld
  const tekenBoven = (i, dy, alpha, nieuw) => { const xx = x0 + i * dx, tilt = (i === i1 ? 1 : i === i2 ? -1 : 0) * 0.32 * knik; baseRing(ctx, xx, yT(i) + 8 * s - dy, seq[i], 1, { s: k, plekA: 0, a: alpha, rot: tilt });
    if (nieuw) { roundRect(ctx, xx - 26 * k, yT(i) + 4 * s, 52 * k, 6 * s, 3 * s); ctx.fillStyle = '#DCD4F5'; ctx.fill(); } };
  for (let i = 0; i < n; i++) { const inStuk = i >= c0 && i <= c1; if (!inStuk) tekenBoven(i, 0, 1, false); else { if (p4 < 1) tekenBoven(i, weg, 1 - p4, false); if (p5 > 0.01 && i < nieuwTot) tekenBoven(i, 0, clamp(nieuwTot - i, 0, 1), true); } }
  const rail = (ia, ib, dy, kl1, kl2, al) => { if (al <= 0.01 || ib < ia) return; const P = []; for (let q = ia; q <= ib; q += 0.25) P.push([x0 + q * dx, yT(q) - dy]); ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = kl1; ctx.lineWidth = 15 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = kl2; ctx.lineWidth = 8 * s; ctx.stroke(); ctx.restore(); };
  rail(-0.35, c0 - 0.5, 0, DNA_BASE.rugR, DNA_BASE.rug, 1); rail(c1 + 0.5, n - 0.65, 0, DNA_BASE.rugR, DNA_BASE.rug, 1);
  rail(c0 - 0.5, c1 + 0.5, weg, DNA_BASE.rugR, DNA_BASE.rug, 1 - p4); if (p5 > 0.01) rail(c0 - 0.5, Math.min(c1 + 0.5, nieuwTot - 0.5), 0, '#DCD4F5', '#B9ACE6', 1);
  // dimeer: koraal klem tussen de twee T's
  if (p2 > 0.01 && p4 < 1) { const xa = x0 + i1 * dx, xb = x0 + i2 * dx, yy = (yT(i1) + yT(i2)) / 2 + DNA_BASE.len * k * 0.45 - weg; ctx.save(); ctx.globalAlpha *= p2 * (1 - p4); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(xa + 12 * s, yy); ctx.lineTo(xb - 12 * s, yy); ctx.stroke(); _bioCirc(ctx, xa + 12 * s, yy, 6 * s, C.koraal); _bioCirc(ctx, xb - 12 * s, yy, 6 * s, C.koraal); ctx.restore(); uit.dimeer = [(xa + xb) / 2, yy]; }
  // UV-straal
  if (f < 0.35) _uvGolf(ctx, x0 + i1 * dx + 260 * s, y - H - 260 * s, x0 + (i1 + 0.5) * dx + 14 * s, y - H - 30 * s, s, Math.min(p1 * 3, 1) * (1 - ease(clamp((f - 0.22) / 0.1, 0, 1))), t * 6 + f * 40);
  // herstelenzym (plaatshouder): komt aan, knipt links en rechts, neemt het stuk mee
  const ex = x0 + (i1 + 0.5) * dx, ey = lerp(y - H - 260 * s, y - H - 62 * s, p3) - weg; const binE = (qx, qy) => { const e1 = qx / 110, e2 = qy / 55; return e1 * e1 + e2 * e2 < 1; };
  if (p3 > 0.01 && p4 < 1) { _grKluwen(ctx, ex, ey, binE, { r: 6, sc: s, col: '#7A8BA8', seed: 29, bbox: [-112, -56, 112, 56], key: 'uvE', a: Math.min(1, p3 * 2) * (1 - p4) }); uit.enzym = [ex, ey - 60 * s]; }
  uit.knip = [[x0 + (c0 - 0.5) * dx, yT(c0 - 0.5)], [x0 + (c1 + 0.5) * dx, yT(c1 + 0.5)]];
  if (p3 > 0.7 && p4 < 0.6) { ctx.save(); ctx.globalAlpha *= (p3 - 0.7) / 0.3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; uit.knip.forEach(([kx, ky]) => { ctx.beginPath(); ctx.moveTo(kx - 10 * s, ky - 12 * s); ctx.lineTo(kx + 10 * s, ky + 12 * s); ctx.moveTo(kx + 10 * s, ky - 12 * s); ctx.lineTo(kx - 10 * s, ky + 12 * s); ctx.stroke(); }); ctx.restore(); }
  // polymerase (plaatshouder) loopt over het gat; ligase sluit de laatste naad (gouden flits)
  if (p5 > 0.01 && p6 < 1) { const px = x0 + Math.min(nieuwTot, c1 + 0.5) * dx, py = y - H - 70 * s; enzymKluwen(ctx, px, py, 48 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2, a: 1 - p6 }); }
  if (p6 > 0.01) { const lx = x0 + (c1 + 0.5) * dx, ly = yT(c1 + 0.5); ctx.save(); ctx.globalAlpha *= Math.sin(p6 * Math.PI); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let q = 0; q < 8; q++) { const an = q / 8 * 6.283; ctx.moveTo(lx + Math.cos(an) * 12 * s, ly + Math.sin(an) * 12 * s); ctx.lineTo(lx + Math.cos(an) * 24 * s, ly + Math.sin(an) * 24 * s); } ctx.stroke(); ctx.restore(); }
  uit.gat = [x0 + (c0 + c1) / 2 * dx, y - H]; ctx.restore(); return uit;
}

// =====================================================================================
// groep lab
// =====================================================================================

// =====================================================================================
// BIOREACTOR (geroerde fermentatietank), opengewerkt zijaanzicht, op ware maat naast een castpersonage.
// Recept (Cytiva 'Parts of a stirred tank bioreactor'): vat van roestvrij staal (of glas), mantel om de wand voor
//  verwarmen/koelen, roerder op een as met de motor bovenop, keerschotten tegen de wand (geen draaikolk),
//  sparger onderin die luchtbellen geeft (zuurstof), sensoren voor temperatuur, opgeloste zuurstof en pH, poorten
//  voor entmateriaal, voeding, zuur/base, monsters en oogsten. Voor bacteriën (E. coli met het insulinegen,
//  OpenStax Biology 2e § 17.1) een slank vat (hoogte ± 2,5 × diameter, ≈) met twee roerders; ± 70 % gevuld.
//  Hier een proeffabriek-vat van ± 1 m doorsnede en ± 2,5 m hoog (≈). Bacteriën als kleine okerstaafjes in het
//  medium (sterk vergroot, alleen als hint), bellen stijgen en wervelen mee met de roerder.
//  Bekende fouten: tank als open kuip; bellen die naar beneden gaan; roerder zonder keerschotten; bacteriën zo
//  groot als knikkers zonder 'vergroot'.
//  Met o.keten = { x, y, s, fase } komt rechts van de tank de keten erbij (OpenStax Biology 2e § 17.1): een
//  vergrootcirkel op één bacterie (plasmide met het insulinegen binnen het membraan, dun mRNA, ribosoom, eiwitketen die
//  zich opvouwt), daarna oogsten via een zuiveringskolom naar een flesje (fase 0–0,5 maken, 0,5–0,8 oogsten,
//  0,8–1 flesje vult). De vergrootlijnen beginnen op een plek in het medium van de tank.
// x, y = midden van de onderkant (vloer); s = px per cm. o.t (roeren, bellen), o.vul 0..1, o.oogst 0..1 (kraan open,
// medium stroomt weg), o.keten, o.a. Geeft { motor, roerder, sparger, sensor, oogst, medium } terug.
// =====================================================================================
function _bioKeten(ctx, x, y, s, o = {}) { // keten rechts van de tank: zoom op één bacterie, kolom, flesje (lokaal frame als in de ketenversie)
  const { a = 1, fase = 0.3, t = 0 } = o; const maak = clamp(fase / 0.5, 0, 1), oog = clamp((fase - 0.5) / 0.3, 0, 1), fles = clamp((fase - 0.8) / 0.2, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { bacterie: P(800, -300), eiwit: P(880, -300), kolom: P(1430, -300), flesje: P(1640, -90) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const staal = '#8C98AA', staalL = '#B8C2D0';
  // --- vergrootcirkel naar de bacterie
  const zx = 800, zy = -300, zr = 250; ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); const vx = ((o.van || [x, y])[0] - x) / s, vy = ((o.van || [x, y])[1] - y) / s; ctx.beginPath(); ctx.moveTo(vx, vy - 12); ctx.lineTo(zx - zr * 0.9, zy - zr * 0.4); ctx.moveTo(vx, vy + 12); ctx.lineTo(zx - zr * 0.9, zy + zr * 0.4); ctx.stroke(); ctx.setLineDash([]);
  circ(ctx, vx, vy, 14, null, C.goud, 3);
  ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); shape(ctx, '#121A26', C.goud, 3); ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr - 2, 0, 6.283); ctx.clip();
  ctx.fillStyle = rgba(C.oker, 0.15); ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
  // bacterie (staaf) met wand en membraan
  const bw = 400, bh = 190; roundRect(ctx, zx - bw / 2 - 8, zy - bh / 2 - 8, bw + 16, bh + 16, (bh + 16) / 2); shape(ctx, rgba(C.oker, 0.3), C.oker, 3);
  roundRect(ctx, zx - bw / 2, zy - bh / 2, bw, bh, bh / 2); shape(ctx, '#22314D', rgba('#D8C9A8', 0.8), 2);
  ctx.save(); roundRect(ctx, zx - bw / 2 + 3, zy - bh / 2 + 3, bw - 6, bh - 6, bh / 2 - 3); ctx.clip();
  // plasmide met insulinegen (binnen het membraan)
  const px0 = zx - 120, py0 = zy - 10; ctx.strokeStyle = D2.oud; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(px0, py0, 40, 0, 6.283); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.arc(px0, py0, 40, -1.2, -0.2); ctx.stroke();
  // mRNA (dun, slierterig) naar het ribosoom en eiwitketen die groeit en vouwt
  ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const u = k / 30; ctx.lineTo(px0 + 38 + u * 90, py0 - 20 + Math.sin(u * 9 + t) * 8 + u * 40); } ctx.stroke();
  const rx = px0 + 130, ry = py0 + 22; ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(rx, ry - 8, 16, 11, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(rx + 2, ry + 9, 20, 13, 0, 0, 6.283); ctx.fill();
  const n = Math.max(3, Math.round(51 * clamp(maak / 0.6, 0, 1))), kinds = Array.from({ length: 51 }, (_, i) => (i * 7) % 20);
  if (maak < 0.6) { const pts = []; for (let i = 0; i < n; i++) pts.push([rx + 22 + i * 4.2, ry - 20 + Math.sin(i * 0.5 + t) * 6 - i * 0.6]); ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); pts.forEach((p, i) => bead(ctx, p[0], p[1], 3.6, kinds[i])); }
  else eiwitVouw(ctx, zx + 110, zy - 10, 0.36, clamp((maak - 0.6) / 0.4, 0, 1), kinds, { start: Array.from({ length: 51 }, (_, i) => [(i - 25) * 4.2 / 0.36 * 0.36 - 0, Math.sin(i * 0.5) * 6]) });
  ctx.restore(); ctx.restore();
  // --- paneel 3: oogsten → kolom → flesje
  const pijl = (x0, x1, yy) => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.lineTo(x1 - 14, yy - 9); ctx.moveTo(x1, yy); ctx.lineTo(x1 - 14, yy + 9); ctx.stroke(); };
  pijl(1080, 1330, -300);
  roundRect(ctx, 1395, -470, 70, 300, 10); shape(ctx, rgba(C.er, 0.10), C.er, 3); // zuiveringskolom
  ctx.save(); roundRect(ctx, 1398, -467, 64, 294, 8); ctx.clip(); for (let i = 0; i < 26; i++) for (let j = 0; j < 5; j++) circ(ctx, 1404 + j * 13 + (i % 2) * 6, -460 + i * 11.5, 5, rgba(C.er, 0.25)); if (oog > 0) { ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(1398, -467, 64, 294 * oog); } ctx.restore();
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1430, -170); ctx.lineTo(1430, -140); ctx.quadraticCurveTo(1430, -120, 1520, -120); ctx.lineTo(1610, -120); ctx.stroke();
  if (fles > 0 && fles < 1) { ctx.fillStyle = rgba(C.teal, 0.8); ctx.beginPath(); ctx.arc(1640, -110 + (t * 60) % 20, 4, 0, 6.283); ctx.fill(); }
  // flesje
  const fx = 1640; roundRect(ctx, fx - 32, -100, 64, 100, 10); shape(ctx, rgba(C.er, 0.12), C.er, 3); ctx.fillStyle = '#7A8BA8'; ctx.fillRect(fx - 16, -118, 32, 18); ctx.fillStyle = C.koraal; ctx.fillRect(fx - 20, -128, 40, 12);
  if (fles > 0) { ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(fx - 28, -4 - 88 * fles, 56, 88 * fles); }
  ctx.restore(); return ret;
}
function bioreactor(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, vul = 0.7, oogst = 0 } = o;
  const R = 50, Hc = 200, poot = 40, yb = -poot - 15, yt = yb - Hc; // cm; bodem iets bol
  const P = (px, py) => [x + px * s, y + py * s];
  const niveau = yb - (Hc * vul) * (1 - 0.6 * clamp(oogst, 0, 1));
  const ret = { motor: P(0, yt - 45), roerder: P(0, yb - 40), sparger: P(0, yb - 8), sensor: P(-R - 18, yb - 70), oogst: P(R * 0.3, -poot + 5), medium: P(R * 0.4, (niveau + yb) / 2) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.6) / s, staal = '#8C98AA', staalL = '#B8C2D0', staalD = '#5F6B7E';
  // poten
  ctx.fillStyle = staalD; for (const px of [-R + 8, R - 8]) ctx.fillRect(px - 3, -poot - 12, 6, poot + 12);
  // mantel (buitenwand) + opengewerkt: binnenkant zichtbaar
  const vat = (rr, ex) => { ctx.beginPath(); ctx.moveTo(-rr, yt - ex); ctx.lineTo(-rr, yb); ctx.quadraticCurveTo(0, yb + 22 + ex, rr, yb); ctx.lineTo(rr, yt - ex); ctx.quadraticCurveTo(0, yt - 22 - ex, -rr, yt - ex); ctx.closePath(); };
  vat(R + 6, 4); shape(ctx, staal, staalL, lw); vat(R + 2, 1); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); // koelwater in de mantel
  vat(R, 0); ctx.fillStyle = '#16202F'; ctx.fill();
  // medium
  ctx.save(); vat(R, 0); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.28); ctx.fillRect(-R, niveau, 2 * R, yb - niveau + 30);
  ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw * 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const px = -R + 2 * R * k / 20; ctx.lineTo(px, niveau + Math.sin(px * 0.3 + t * 3) * 1.2 + (px * px / (R * R)) * 2); } ctx.stroke();
  // bacteriën (vergroot) en bellen
  if (s > 0.8) for (let i = 0; i < 28; i++) { const u = hash(i * 3 + 1), v = hash(i * 3 + 2); const py = lerp(niveau + 6, yb + 5, v), px = (u * 2 - 1) * (R - 6) + Math.sin(t * 1.5 + i) * 3; const an = hash(i) * 6 + t * (0.5 + u); ctx.save(); ctx.translate(px, py); ctx.rotate(an); roundRect(ctx, -1.8, -0.65, 3.6, 1.3, 0.65); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 40; i++) { const u = hash(i * 5 + 7), sp = 18 + 10 * hash(i * 5 + 8); const h = ((t * sp + u * 400) % (yb - niveau)); const py = yb - 8 - h, sw = Math.sin(t * 2 + i) * 4 + (h > 30 && h < 60 ? Math.sin(i) * 10 : 0); const px = (hash(i * 5 + 9) * 2 - 1) * 14 + sw * (h / 40); if (py < niveau) continue; ctx.strokeStyle = rgba('#E8EEF5', 0.7); ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(px, py, 1 + hash(i) * 1.2, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // keerschotten (2 zichtbaar in doorsnede), as met twee Rushton-roerders, sparger-ring
  ctx.fillStyle = staalL; ctx.fillRect(-R + 1, yt + 10, 5, Hc - 10); ctx.fillRect(R - 6, yt + 10, 5, Hc - 10);
  ctx.fillStyle = staalL; ctx.fillRect(-1.5, yt - 30, 3, Hc + 18);
  for (const yy of [yb - 30, yb - 95]) { ctx.fillRect(-17, yy - 1, 34, 2); for (let k = 0; k < 6; k++) { const ph = t * 4 + k * Math.PI / 3, xx = Math.sin(ph) * 15, w = Math.abs(Math.cos(ph)) * 5 + 1; if (Math.cos(ph) < 0) ctx.globalAlpha *= 1; ctx.fillStyle = Math.cos(ph) > 0 ? staalL : staalD; ctx.fillRect(xx - w / 2, yy - 6, w, 12); } }
  ctx.strokeStyle = staalL; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-R + 4, yb - 8); ctx.lineTo(-R + 15, yb - 8); ctx.moveTo(-R + 15, yb - 8); ctx.lineTo(16, yb - 8); ctx.stroke(); // sparger
  // motor + deksel met poorten, sensoren in de wand, oogstkraan
  roundRect(ctx, -18, yt - 62, 36, 36, 5); shape(ctx, '#3A4A66', '#5E7194', lw); ctx.fillStyle = staalD; ctx.fillRect(-6, yt - 30, 12, 12);
  for (const px of [-32, 28]) { ctx.fillStyle = staal; ctx.fillRect(px - 3, yt - 30, 6, 14); }
  for (const [py, kl] of [[yb - 60, C.koraal], [yb - 80, C.teal], [yb - 100, C.groen]]) { ctx.fillStyle = staalD; ctx.fillRect(-R - 22, py - 2, 30, 4); circ(ctx, -R - 24, py, 3.2, kl); }
  ctx.fillStyle = staal; ctx.fillRect(-3, yb + 14, 6, 10); ctx.fillRect(-3, yb + 22, R * 0.35, 5); circ(ctx, R * 0.33, yb + 18, 4, oogst > 0.01 ? C.groen : staalD);
  if (oogst > 0.01) { ctx.fillStyle = rgba(C.oker, 0.6); ctx.fillRect(R * 0.33 - 1.5, yb + 27, 3, 20 * clamp(oogst * 3, 0, 1)); }
  // glanslijn op de buitenwand
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-R - 3, yt + 10); ctx.lineTo(-R - 3, yb - 5); ctx.stroke();
  ctx.restore();
  if (o.keten) { const K = o.keten; _bioKeten(ctx, K.x, K.y, K.s || 1, { fase: K.fase == null ? 0.3 : K.fase, t, van: ret.medium, a }); }
  return ret;
}

// =====================================================================================
// CRISPR-CAS9 (lintmodel) met gids-RNA dat een doelplek in het DNA zoekt, opent en beide strengen knipt; daarna reparatie.
// Recept (RCSB PDB 4OO8: Cas9 van Streptococcus pyogenes, 1 372 aminozuren, 'bilobed architecture': een
//  herkenningslob en een nucleaselob; het gids-RNA–DNA-duplex ligt in een geladen groef tussen de twee lobben;
//  HNH knipt de streng die met de gids paart, RuvC de andere; een domein aan de C-kant herkent de PAM;
//  Jinek e.a. 2012: PAM = NGG, stompe knip 3 bp vóór de PAM). Maten: Cas9 ± 10 nm, DNA 2 nm breed, 0,34 nm per
//  basepaar, dus het eiwit omvat ± 30 bp; de spacer van het gids-RNA is 20 nt. Stappen: o.stap 0–1 zoeken (schuift
//  langs het DNA), 1–2 PAM (goud omrand), 2–3 openen (R-lus: gids paart vanaf de PAM met de doelstreng, de andere
//  streng buigt weg) en knippen (2,75–3), 3–4 Cas9 laat los, reparatie: 'uit' = kleine fout bij het plakken
//  (koraal, gen kapot) of 'nieuw' = een nieuw stuk (goud) ertussen.
//  Eiwit = één gevouwen keten in het gedeelde lintmodel (_grKluwen: buis, helices als spiraal, β-strengen als pijl).
//  Cas9 KLEMT om het DNA: de herkenningslob ligt achter/boven, de nucleaselob achter/onder, en het PAM-domein loopt
//  vóór het DNA langs naast de PAM (brug). Gids-RNA in teal: los als slap draadje in de herkenningslob; in de R-lus
//  liggen zijn 20 basen (puzzelvorm, U in plaats van T) precies op de doelstreng, de andere streng buigt omhoog weg.
//  Bekende fouten: Cas9 als schaar; één streng geknipt; knip in de PAM; gids-RNA dat paart met beide strengen.
// x, y = midden van de doelplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..4, o.reparatie,
// o.t, o.a. Geeft { cas9, pam, knip, gids, rec, nuc } terug.
// =====================================================================================
// (gebruikt _grKluwen uit inbouw/lab/_hulp.js: één keer in lib_bio.js)
function crisprCas9(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 0, t = 0, reparatie = 'uit' } = o; const st = clamp(stap, 0, 4);
  const zoek = clamp(st, 0, 1), pam = clamp(st - 1, 0, 1), open = clamp(st - 2, 0, 1), knip = clamp((st - 2.75) / 0.25, 0, 1), rep = clamp(st - 3, 0, 1);
  const bp = 3.4, L = 10, nTot = 44, i0 = -14; // basen −14 … 29; doelplek 0–19, PAM 20–22 (NGG op de bovenstreng)
  const X = (i) => x + (i - 10) * bp * s, yT = y - L * s, yB = y + L * s;
  const seqT = 'TTCAGGACTACCGAGTTCATGGTACAGCTTGGAGCCGATTCAGT', comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const casX = lerp(-150, 0, ease(zoek)) * s * (st < 1 ? 1 : 0) + x, casY = y - lerp(0, 50, ease(rep)) * s, casA = 1 - ease(rep) * 0.9;
  const knipI = 16.5; // knip 3 bp vóór de PAM: stompe knip in beide strengen (HNH: doelstreng, RuvC: andere streng)
  const uit = ease(rep) * 1.6 * bp * s; // na de knip wijken de uiteinden even uiteen
  const ret = { cas9: [casX, casY], pam: [X(21), yT - L * s * 1.4], knip: [X(knipI), y], gids: [X(6), yB + L * s * 1.6], rec: [casX, y - 75 * s], nuc: [casX, y + 72 * s] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // Cas9 achter het DNA: herkenningslob (boven) en nucleaselob (onder) als gevouwen keten; de groef ertussen blijft vrij
  const lob = (bb, ry, kl, seed, key) => _grKluwen(ctx, casX, casY, (px, py) => (px / 64) * (px / 64) + (py / ry) * (py / ry) < 1 && (py < -52 || py > 17), { r: 3.2, sc: s, col: kl, seed, bbox: bb, key, a: casA * 0.95 });
  lob([-64, -96, 64, -52], 96, '#8E9FBC', 3, 'casREC'); lob([-64, 17, 64, 58], 58, C.enzym, 5, 'casNUC');
  const hw = bp * s * 0.34, ruggW = Math.max(2.5, bp * s * 0.35);
  // DNA: bovenstreng (5′→3′, met PAM) en doelstreng. In de open stand buigt de bovenstreng omhoog weg (R-lus).
  const bol = (i) => (i >= 0 && i <= 19) ? Math.sin(clamp((i + 0.5) / 20, 0, 1) * Math.PI) * 0 + (open > 0 ? ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (1 - ease(rep)) : 0) : 0;
  const yTop = (i) => yT - bol(i) * L * s * 3.8 * Math.sin(clamp((i + 1) / 21, 0, 1) * Math.PI) ;
  const dx = (i) => (i > knipI ? uit : 0) * (rep > 0 ? 1 : 0);
  const ins = reparatie === 'nieuw' && rep > 0.5 ? 6 : 0; const insA = clamp((rep - 0.5) / 0.5, 0, 1);
  // ruggengraten
  const rug = (yfn, kl, from, to) => { ctx.strokeStyle = kl; ctx.lineWidth = ruggW; ctx.beginPath(); for (let i = from; i <= to; i += 0.25) { const xx = X(i) + dx(i), yy = yfn(i); i === from ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); };
  const brk = knip > 0.5 ? knipI : 99;
  rug(yTop, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(yTop, D2.oud, brk + 0.15, nTot + i0 - 1);
  rug(() => yB, D2.oud, i0, Math.min(brk - 0.15, nTot + i0 - 1)); if (brk < 99) rug(() => yB, D2.oud, brk + 0.15, nTot + i0 - 1);
  for (let i = i0; i < i0 + nTot; i++) { const b = seqT[i - i0], xx = X(i) + dx(i), gepaard = bol(i) < 0.2;
    const isPam = i >= 20 && i <= 22; const rand = isPam && pam > 0.3 ? C.goud : null;
    d2Base(ctx, xx, yTop(i), gepaard ? Math.PI / 2 : -Math.PI / 2 * 0 + Math.PI / 2 - bol(i) * Math.PI, b, L * s, hw, { rand, letter: s >= 2.2 });
    d2Base(ctx, xx, yB, -Math.PI / 2, comp[b], L * s, hw, { letter: s >= 2.2 }); }
  // reparatie: 'uit' = kleine deletie (koraal merkteken op de naad), 'nieuw' = goud stuk ertussen
  if (rep > 0.5 && reparatie === 'nieuw') { ctx.save(); ctx.globalAlpha *= insA; ctx.strokeStyle = C.goud; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (rep > 0.5 && reparatie === 'uit') { ctx.save(); ctx.globalAlpha *= clamp((rep - 0.5) / 0.5, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = ruggW; ctx.beginPath(); ctx.moveTo(X(knipI) + 2, yT); ctx.lineTo(X(knipI) + uit - 2, yT); ctx.moveTo(X(knipI) + 2, yB); ctx.lineTo(X(knipI) + uit - 2, yB); ctx.stroke(); ctx.restore(); }
  if (knip > 0.01 && rep < 0.6) { ctx.save(); ctx.globalAlpha *= Math.sin(knip * Math.PI) * 0.7 + (knip >= 1 ? 0.3 * (1 - rep / 0.6) : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const yy of [yT, yB]) { ctx.beginPath(); ctx.arc(X(knipI), yy, 7 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  // gids-RNA: vóór het openen een slap draadje in de herkenningslob; in de R-lus 20 RNA-basen op de doelstreng (paren)
  ctx.save(); ctx.globalAlpha *= casA; const gx0 = casX - 10 * bp * s, rnaK = D2.rna || C.teal, uB = (b) => b === 'T' ? 'U' : b;
  const gp = []; for (let i = 0; i <= 19; i++) { const gep = ease(clamp(open * 1.3 - (19 - i) / 20 * 0.3, 0, 1)) * (rep > 0.2 ? 0 : 1); gp.push([gx0 + i * bp * s, lerp(casY - 62 * s + Math.sin(i * 0.8 + t) * 3 * s, yT, gep), gep]); }
  ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, gp.map(p => [p[0], p[1]]), false); ctx.stroke();
  gp.forEach((p, i) => { if (p[2] > 0.5) d2Base(ctx, p[0], p[1], Math.PI / 2, uB(seqT[i - i0]), L * s, hw, { rna: true, letter: s >= 2.2, a: (p[2] - 0.5) * 2 });
    else if (s >= 2) { ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0], p[1] + 5 * s); ctx.stroke(); } });
  const e = gp[19]; ctx.strokeStyle = rnaK; ctx.lineWidth = Math.max(1.5, ruggW * 0.7); ctx.beginPath(); bioPad(ctx, [[e[0], e[1]], [e[0] + 10 * s, e[1] - 16 * s], [e[0] + 2 * s, casY - 66 * s], [e[0] - 20 * s, casY - 76 * s], [e[0] - 6 * s, casY - 88 * s], [e[0] + 18 * s, casY - 80 * s], [e[0] + 24 * s, casY - 60 * s]], false); ctx.stroke(); // steiger met haarspelden
  ctx.restore();
  // PAM-domein vóór het DNA langs (brug die de klem sluit), naast de PAM; actieve plekken HNH (onder) en RuvC (boven) goud
  _grKluwen(ctx, casX, casY, (px, py) => ((px - 57) / 13) ** 2 + ((py + 12) / 50) ** 2 < 1, { r: 3.2, sc: s, col: '#6E8FA8', seed: 7, bbox: [44, -62, 70, 38], key: 'casPI', a: casA * 0.9 });
  [[casX + (knipI - 10) * bp * s, casY + 22 * s], [casX + (knipI - 10) * bp * s, casY - 56 * s]].forEach(p => { ctx.save(); ctx.globalAlpha *= casA; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(p[0], p[1], 3.5 * s, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.restore(); return ret;
}

// =====================================================================================
// GELELEKTROFORESE als apparaat in drie-kwart-aanzicht (horizontale bak met deksel, kabels naar de voeding) én,
// na het kleuren, de gel in het UV-kastje (o.foto), op ware maat (bak ± 1,3 × een hand).
// Recept (OpenStax Biology 2e § 17.1): DNA is negatief geladen en loopt naar de pluspool; korte stukken komen
//  verder (afstand lineair met −log lengte); markerladder in laan 1; DNA is onzichtbaar tot het gekleurd is, alleen
//  de paarse laadkleurstof is tijdens het lopen te zien. Foto: donkere gel, banden die oplichten onder UV
//  (wit-oranje), lichte uitstrijk ('smear') onder de banden, putjes als donkere streepjes bovenaan; zo ziet een
//  echte gelfoto eruit en zo lees je een DNA-profiel als streepjescode.
//  Maten (≈, minigel): bak ± 25 × 12 × 7 cm, gel ± 7 × 10 cm, putjes 5 mm, ± 8 mm uit elkaar; zwarte kabel = min
//  aan de kant van de putjes, rode kabel = plus.
//  Bekende fouten: DNA naar de min; grootste stukken het verst; banden al zichtbaar vóór het kleuren.
// x, y = midden van de gel (bovenvlak); s = px per mm. o.loop 0..1, o.kleur 0..1, o.foto (bool), o.deksel 0..1,
// o.laantjes (lijsten bp, eerste = marker), o.a. Geeft { putjes, min, plus, banden } terug.
// =====================================================================================
function gelElektroforese(ctx, x, y, s, o = {}) {
  const { a = 1, loop = 0.7, kleur = 0, foto = false, deksel = 0 } = o;
  const lanes = o.laantjes || [[10000, 6000, 4000, 3000, 2000, 1500, 1000, 700, 500, 300], [3000, 1200, 400], [3000, 800, 400], [5000, 1200], [3000, 1200, 400], [2000, 800]];
  const n = lanes.length, gw = 70, gh = 100, pitch = Math.min(9, (gw - 8) / n), putY = -gh / 2 + 10, loopMax = 72, logMin = Math.log10(200), logMax = Math.log10(12000);
  const afst = (bp) => clamp((logMax - Math.log10(bp)) / (logMax - logMin), 0, 1.05) * loopMax * loop;
  const lx = (i) => -((n - 1) / 2) * pitch + i * pitch;
  // schuine projectie: diepte (y in de bak) loopt omhoog-naar-achter
  const pr = (X, Yd, Z) => foto ? [x + X * s, y + Yd * s] : [x + Yd * s, y + (X * 0.45 - Z * 0.9) * s]; // apparaat: lange as horizontaal (min links), diepte schuin naar achter
  const ret = { putjes: lanes.map((_, i) => pr(lx(i), putY, 0)), min: pr(0, -120, 0), plus: pr(0, 120, 0), banden: lanes.map((L, i) => L.map(bp => [...pr(lx(i), putY + afst(bp), 0), bp])) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const poly = (pts, fill, stroke, lw = 1.5) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...pr(...p)) : ctx.moveTo(...pr(...p))); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  if (foto) { // gel in het UV-kastje (transilluminator): kast met UV-plaat (paars), daarop de gekleurde gel met lichtende banden
    { const k0 = pr(-gw / 2 - 22, -gh / 2 - 22, 0), k1 = pr(gw / 2 + 22, gh / 2 + 34, 0); roundRect(ctx, k0[0], k0[1], k1[0] - k0[0], k1[1] - k0[1], 6 * s); shape(ctx, '#2B2F38', '#4A505C', Math.max(1, 0.6 * s));
      const u0 = pr(-gw / 2 - 12, -gh / 2 - 12, 0), u1 = pr(gw / 2 + 12, gh / 2 + 12, 0); ctx.fillStyle = rgba(C.paars, 0.45); ctx.fillRect(u0[0], u0[1], u1[0] - u0[0], u1[1] - u0[1]);
      const kn = pr(gw / 2 + 8, gh / 2 + 24, 0); circ(ctx, kn[0], kn[1], 3 * s, C.paars); }
    poly([[-gw / 2 - 4, -gh / 2 - 4, 0], [gw / 2 + 4, -gh / 2 - 4, 0], [gw / 2 + 4, gh / 2 + 4, 0], [-gw / 2 - 4, gh / 2 + 4, 0]], '#07090C', null);
    poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], '#14171C', null);
    lanes.forEach((L, i) => { const p = pr(lx(i), putY, 0); ctx.fillStyle = '#2A2E35'; ctx.fillRect(p[0] - 2.5 * s, p[1] - 0.6 * s, 5 * s, 1.2 * s);
      L.forEach((bp, j) => { const q = pr(lx(i), putY + afst(bp), 0); const sterk = i === 0 ? (bp === 3000 || bp === 1000 ? 1 : 0.7) : 1;
        ctx.fillStyle = `rgba(255,225,190,${0.12 * sterk})`; ctx.fillRect(q[0] - 2.4 * s, q[1], 4.8 * s, 3.5 * s); // uitstrijk
        ctx.fillStyle = `rgba(255,236,210,${0.55 + 0.4 * sterk})`; roundRect(ctx, q[0] - 2.4 * s, q[1] - 0.6 * s, 4.8 * s, 1.2 * s, 0.6 * s); ctx.fill();
        ctx.fillStyle = `rgba(255,200,150,${0.25 * sterk})`; roundRect(ctx, q[0] - 2.8 * s, q[1] - 1.1 * s, 5.6 * s, 2.2 * s, 1.1 * s); ctx.fill(); }); });
    ctx.restore(); return ret; }
  const BW = 120, BL = 250, BH = 70, kast = '#3A4A66';
  // bak: bodem, achterwand, buffer, gel, voorwand (doorzichtig)
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6]], '#1E2A40', null);
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.12), rgba(C.er, 0.6)); // achterwand
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.10), rgba(C.er, 0.6)); // kopse kant links
  poly([[-BW / 2, -BL / 2, 3], [BW / 2, -BL / 2, 3], [BW / 2, BL / 2, 3], [-BW / 2, BL / 2, 3]], rgba(C.teal, 0.16), null); // bufferoppervlak
  // gel (5 mm dik) met putjes
  poly([[gw / 2, -gh / 2, -5], [gw / 2, gh / 2, -5], [gw / 2, gh / 2, 0], [gw / 2, -gh / 2, 0]], rgba('#E8E4D8', 0.30), null);
  poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], rgba('#E8E4D8', 0.20), rgba('#E8E4D8', 0.55), 1);
  lanes.forEach((L, i) => { poly([[lx(i) - 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY + 0.6, 0], [lx(i) - 2.5, putY + 0.6, 0]], '#121A26', null);
    const band = (yy, d, fill) => poly([[lx(i) - 2.4, yy - d, 0], [lx(i) + 2.4, yy - d, 0], [lx(i) + 2.4, yy + d, 0], [lx(i) - 2.4, yy + d, 0]], fill, null);
    band(putY + afst(150), 1.2, rgba(C.paars, 0.85 * (1 - kleur * 0.6)));
    if (kleur > 0.01) L.forEach(bp => band(putY + afst(bp), 0.6, rgba('#FFD9A0', kleur))); });
  // elektroden (draad langs de korte kanten) + stekkers en kabels
  for (const [Yd, kl] of [[-BL / 2 + 10, '#2B2F38'], [BL / 2 - 10, C.koraal]]) { ctx.strokeStyle = '#C8D0DA'; ctx.lineWidth = Math.max(1, 0.8 * s); ctx.beginPath(); ctx.moveTo(...pr(-BW / 2 + 8, Yd, -BH * 0.5)); ctx.lineTo(...pr(BW / 2 - 8, Yd, -BH * 0.5)); ctx.stroke();
    const st = pr(-BW / 2 + 14, Yd, BH * 0.4 + 6); ctx.fillStyle = kl; ctx.fillRect(st[0] - 4 * s, st[1] - 8 * s, 8 * s, 10 * s); ctx.strokeStyle = kl; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(st[0], st[1] - 8 * s); ctx.bezierCurveTo(st[0] + (Yd < 0 ? -30 : 30) * s, st[1] - 50 * s, st[0] + (Yd < 0 ? -60 : 60) * s, st[1] - 40 * s, st[0] + (Yd < 0 ? -80 : 80) * s, st[1] - 70 * s); ctx.stroke();
    if (kl === '#2B2F38') { ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 0.7 * s; ctx.stroke(); } }
  poly([[-BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [-BW / 2, BL / 2, BH * 0.4]], rgba(C.er, 0.08), rgba(C.er, 0.7)); // kopse kant rechts
  poly([[BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.06), rgba(C.er, 0.7)); // voorwand (doorzichtig)
  if (deksel > 0.01) { ctx.save(); ctx.globalAlpha *= deksel; poly([[-BW / 2 - 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, BL / 2 + 3, BH * 0.4 + 2], [-BW / 2 - 3, BL / 2 + 3, BH * 0.4 + 2]], rgba(C.er, 0.18), C.er); ctx.restore(); }
  ctx.restore(); return ret;
}

// =====================================================================================
// INJECTIESPUIT met prik in de bovenarm (deltaspier): spuit met volume (drie vlakke tinten) en, met o.arm, een
// doorsnede van de bovenarm onder de prikplek, op dezelfde ware maat.
// Recept (mm): CDC 'IM injection adult': naald 25–38 mm, 22–25 G, loodrecht (90°) in het dikste deel van de
//  deltaspier, ± 5 cm onder het schouderdak (acromion). Hier 25 mm, 23 G (0,6 mm, blauwe hub, ISO 6009).
//  Spuit 3 ml: cilinder ± 10 mm dik, ± 50 mm lang, schaal per 0,1 ml (1 ml ± 16 mm); zuiger met rubber stop.
//  Lagen onder de prikplek (≈, volwassene van gemiddeld gewicht): opperhuid + lederhuid ± 2 mm, onderhuids vet
//  ± 6–10 mm (hier 8), deltaspier ± 15–20 mm met vezels in de lengte, dan het opperarmbeen. De naald gaat door
//  huid en vet tot in de spier; het vaccin vormt een depot tússen de spiervezels (niet in het vet).
//  Standen: o.prik 0 (naald boven de huid) … 1 (naald op 22 mm diepte), o.druk 0..1 (zuiger in, depot groeit).
//  Rust (Kamiel 28 okt 2026, keuze B: 'wel erg druk'): weinig vetkwabjes en spiervezels, zacht; de lagen dragen het beeld.
//  In een scène staat de maat-hand op ruime afstand van de weefselblokken, met de spuit náást (niet op) de hand.
//  Bekende fouten: naald schuin in de arm; depot in het vet; spier dunner dan de vetlaag; prik in de elleboog;
//  hand of maatspuit tegen de doorsnede aan.
// x, y: met o.arm = prikplek op de huid; zonder o.arm = naaldpunt. s = px per mm. o.rot (alleen zonder arm;
// 0 = naald naar rechts). o.vul (0..1 van 3 ml; standaard 0,17 = 0,5 ml), o.a, o.hl.
// Geeft { punt, cilinder, duim, huid, spier, depot } terug.
// =====================================================================================
function injectiespuit(ctx, x, y, s, o = {}) {
  const { a = 1, arm = false, prik = 0, druk = 0, vul = 0.17, kleur = C.teal, hl = 0, t = 0 } = o;
  const rot = arm ? Math.PI / 2 : (o.rot || 0), diep = arm ? clamp(prik, 0, 1) * 22 : 0;
  const tx = x + Math.cos(rot) * diep * s, ty = y + Math.sin(rot) * diep * s; // naaldpunt
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [tx + (px * co - py * si) * s, ty + (px * si + py * co) * s];
  const ml = 16, rest = clamp(vul * (1 - (arm ? clamp(druk, 0, 1) : 0)), 0, 1), xC0 = -38, xC1 = xC0 - 50, xStop = xC0 - 3 - rest * 3 * ml;
  const ret = { punt: [tx, ty], cilinder: P((xC0 + xC1) / 2, 0), duim: P(xStop - 62, 0), huid: [x, y], spier: [x + 30 * s, y + 20 * s], depot: [tx, ty] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.12);
  if (arm) { // doorsnede bovenarm: lagen evenwijdig aan de huid, licht gebogen (arm is rond)
    const B = 55, bocht = (xx) => (xx * xx) / (2 * 140); // straal ± 14 cm-boog over de breedte
    const laag = (d0, d1, fill, clip) => { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d0 + bocht(xx)) * s); } for (let k = 40; k >= 0; k--) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d1 + bocht(xx)) * s); } ctx.closePath(); if (clip) { ctx.clip(); return; } ctx.fillStyle = fill; ctx.fill(); };
    laag(0, 2, BIO.huid); laag(0, 0.6, BIO.huidS); laag(2, 10, BIO.vet); laag(10, 30, BIO.spier); laag(30, 46, BIO.bot);
    // vetkwabjes en spiervezels (rustig, alleen bij genoeg pixels)
    if (s > 3) { ctx.save(); laag(-1, 46, null, true); ctx.strokeStyle = rgba(BIO.vetS, 0.35); ctx.lineWidth = 1; for (let i = 0; i < 7; i++) { const xx = -B + 9 + i * 15.5 + hash(i) * 3, yy = 6 + hash(i + 9) * 1.5; ctx.beginPath(); ctx.ellipse(x + xx * s, y + (yy + bocht(xx)) * s, 4.2 * s, 2.6 * s, 0, 0, 6.283); ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.spierL, 0.3); for (let j = 0; j < 4; j++) { const d = 14 + j * 4.2; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d + bocht(xx) + Math.sin(xx * 0.09 + j) * 0.5) * s); } ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.botS, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (31.5 + bocht(xx)) * s); } ctx.stroke(); ctx.restore(); }
    // depot tussen de spiervezels
    const dep = clamp(druk, 0, 1) * clamp(prik * 2 - 1, 0, 1); if (dep > 0.01) { const r = Math.sqrt(dep) * 6; ctx.save(); ctx.globalAlpha *= 0.75; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(tx, ty - 1 * s, r * 1.6 * s, r * 0.8 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  } // de spuit zelf blijft altijd boven de huid (hub op 25 mm, naald hooguit 22 mm diep)
  ctx.translate(tx, ty); ctx.rotate(rot); ctx.scale(s, s);
  const L = C.er, wit = '#DDE4EC', mid = '#A9B6C6', don = '#6F7E93';
  const band = (x0, x1, h, cols) => { const n = cols.length; cols.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x0, -h + 2 * h * i / n, x1 - x0, 2 * h / n + 0.05); }); };
  // cilinder (glasheldere kunststof: lichte rand, donkere zijde)
  ctx.save(); ctx.beginPath(); ctx.rect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4); ctx.clip();
  ctx.fillStyle = rgba(L, 0.12); ctx.fillRect(xC1, -5.2, 60, 10.4);
  if (rest > 0.003) band(xStop, xC0, 4.6, [lighten(kleur, 0.35), kleur, kleur, kleur, lighten(kleur, -0.0)].map((c, i) => i === 4 ? '#3E7FA5' : c));
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(xC1, -4.4, 60, 1.0); ctx.restore();
  ctx.strokeStyle = L; ctx.lineWidth = lw / s; ctx.strokeRect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4);
  ctx.beginPath(); ctx.moveTo(xC0 - 2.5, -5.2); ctx.lineTo(xC0, -1.4); ctx.lineTo(xC0, 1.4); ctx.lineTo(xC0 - 2.5, 5.2); ctx.fillStyle = rgba(L, 0.2); ctx.fill(); ctx.stroke();
  if (s > 3) { ctx.strokeStyle = rgba(don, 0.9); ctx.lineWidth = 0.18; for (let k = 0; k <= 30; k++) { const xx = xC0 - 3 - k * ml / 10, lang = k % 5 === 0 ? 3 : 1.6; ctx.beginPath(); ctx.moveTo(xx, -5.2); ctx.lineTo(xx, -5.2 + lang); ctx.stroke(); } }
  // rubber stop + stang + duimplaat
  band(xStop - 6, xStop, 4.5, ['#5A606C', '#3B3F48', '#3B3F48', '#2C2F36']);
  band(xStop - 62 + 1.5, xStop - 6, 3.6, [wit, mid, mid, don]);
  band(xStop - 62.5, xStop - 60.3, 6.5, [wit, mid, mid, don]);
  // vingersteun
  band(xC1 - 2, xC1, 11, [wit, mid, mid, mid, don]);
  // luer + hub (blauw, 23 G)
  band(xC0, -34, 1.4, [wit, mid, don]); band(-34, -32, 3.3, ['#6B9DC2', '#4E86B0', '#3E6F95']); band(-32, -25, 2.6, ['#6B9DC2', '#4E86B0', '#4E86B0', '#3E6F95']);
  // naald (ook het deel onder de huid)
  ctx.fillStyle = '#C8D0DA'; ctx.beginPath(); ctx.moveTo(-25, -0.3); ctx.lineTo(-1.6, -0.3); ctx.lineTo(0, 0.3); ctx.lineTo(-25, 0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.55); ctx.fillRect(-25, -0.3, 23, 0.15);
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / s; ctx.strokeRect(xC1 - 2, -11.5, -xC1 + 2, 23); }
  ctx.restore(); return ret;
}

// =====================================================================================
// INSULINEPEN tegen de buik, met een doorsnede van huid, onderhuids vet en buikspier onder de prikplek.
// Recept: NovoPen 6 (gebruiksaanwijzing Novo Nordisk; ADCES): dosis 1–60 eenheden, indrukken en ± 6 s wachten
//  voor je de naald terugtrekt (≈). Het pennaaldje is kort (± 4–6 mm, ≈) en gaat loodrecht in het onderhuidse vet
//  van de buik (± 5 cm naast de navel, ≈); daar vormt de insuline een depot dat langzaam in het bloed komt. Lagen
//  (≈): huid ± 2 mm, onderhuids vet ± 10–20 mm (hier 14), dan de buikspier — de naald komt daar dus niet.
//  Pen ± 16 cm (≈). Bekende fouten: depot in de spier; naald schuin; pen in de bovenarm met een spierprik verwarren.
//  Dosis instellen: de doseerknop draait en schuift uit (± 0,5 mm per eenheid, ≈) en het venster telt op (0 → 12);
//  bij indrukken schuift de knop terug en telt het venster af naar 0 terwijl het depot groeit.
// x, y = prikplek op de huid; s = px per mm. o.prik 0..1, o.dosis (ingestelde eenheden), o.druk 0..1 (indrukken: knop
// terug, teller naar 0, depot groeit), o.a.
// Geeft { punt, knop, huid, vet, depot } terug.
// =====================================================================================
function _penTeken(ctx, s, o) { // pen in lokale mm, punt van de naald op (0,0), pen naar links (−x); s = px per mm
  const { dop = 0, dosis = 10, druk = 0, naald = true, vul = 0.7 } = o; const lw = Math.max(1, s * 0.25) / s;
  const body = '#3E6F95', bodyL = '#5B8DB5', bodyD = '#2C5476', staal = '#C8D0DA';
  const xN = -4, xHub = xN - 6, xCart = xHub - 52, xBody = xCart - 70, xDial = xBody - 20, uit = 0.5 * Math.max(0, dosis) * (1 - clamp(druk, 0, 1)), teller = Math.round(Math.max(0, dosis) * (1 - clamp(druk, 0, 1))); // knop schuift ± 0,5 mm per eenheid uit (≈)
  // naald (4 mm, 32 G ≈ 0,23 mm) + hub
  if (naald) { ctx.fillStyle = staal; ctx.fillRect(xN, -0.15, 4, 0.3); ctx.fillStyle = '#D5DBE3'; roundRect(ctx, xHub, -3.5, 6, 7, 1); ctx.fill(); }
  // houder met venster op de patroon (insuline helder, bijna kleurloos; zuigerstopje)
  roundRect(ctx, xCart, -6.5, xHub - xCart, 13, 3); shape(ctx, '#B9C4D2', '#DCE3EB', lw);
  roundRect(ctx, xCart + 8, -4, 38, 8, 2); ctx.fillStyle = '#0F1828'; ctx.fill(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(xCart + 8 + 38 * (1 - vul), -3.5, 38 * vul, 7);
  ctx.fillStyle = '#3B3F48'; ctx.fillRect(xCart + 8 + 38 * (1 - vul) - 2, -3.5, 2.5, 7);
  // lichaam, doseerknop met venster, drukknop
  roundRect(ctx, xBody, -7.5, xCart - xBody + 2, 15, 3); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyL; ctx.fillRect(xBody + 2, -6.5, xCart - xBody - 2, 2);
  roundRect(ctx, xBody + 22, -4.5, 14, 9, 1.5); ctx.fillStyle = '#E8EEF5'; ctx.fill(); if (s > 1.4) { const m = ctx.getTransform(), wx = m.a * (xBody + 29) + m.e, wy = m.b * (xBody + 29) + m.f, sc2 = Math.hypot(m.a, m.b); ctx.save(); ctx.setTransform(sc2, 0, 0, sc2, wx, wy); text(ctx, String(teller), 0, 2.2, fMeta(6), '#121A26', 'center'); ctx.restore(); } // cijfer rechtop
  roundRect(ctx, xDial - uit, -8, 20, 16, 3); shape(ctx, bodyD, bodyL, lw); if (s > 1.4) { ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = lw; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(xDial - uit + k * 2.8, -8); ctx.lineTo(xDial - uit + k * 2.8, 8); ctx.stroke(); } }
  roundRect(ctx, xDial - uit - 6, -5, 7, 10, 2); shape(ctx, '#D5DBE3', '#F0F2F5', lw);
  // dop (schuift over naald en houder)
  if (dop > 0.01) { ctx.save(); ctx.globalAlpha *= dop; const dx = (1 - dop) * 40; roundRect(ctx, xCart - 4 + dx, -8, 70, 16, 4); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyD; ctx.fillRect(xCart + 2 + dx, -10.5, 40, 3); ctx.restore(); }
  return { knop: xDial - uit - 6, venster: xBody + 29, lengte: -(xDial - uit - 6) };
}
function insulinePen(ctx, x, y, s, o = {}) {
  const { a = 1, prik = 1, druk = 0, buik = true } = o; const diep = buik ? clamp(prik, 0, 1) * 4 : 0, tx = x, ty = y + diep * s;
  const ret = { punt: [tx, ty], knop: [x, y - 160 * s], huid: [x + 40 * s, y], vet: [x + 40 * s, y + 9 * s], depot: [tx, ty] }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (buik) { const B = 55, laag = (d0, d1, f) => { ctx.fillStyle = f; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d0 + xx * xx / 900) * s); } for (let k = 30; k >= 0; k--) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d1 + xx * xx / 900) * s); } ctx.closePath(); ctx.fill(); };
    laag(0, 2, BIO.huid); laag(0, 0.5, BIO.huidS); laag(2, 16, BIO.vet); laag(16, 30, BIO.spier);
    if (s > 3) { ctx.save(); ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (2 + xx * xx / 900) * s); } for (let k = 30; k >= 0; k--) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (16 + xx * xx / 900) * s); } ctx.clip(); ctx.strokeStyle = rgba(BIO.vetS, 0.6); ctx.lineWidth = 1;
      for (let i = 0; i < 22; i++) { const xx = -B + 4 + (i % 11) * 10 + hash(i) * 3, yy = 5.5 + Math.floor(i / 11) * 6.5 + hash(i + 4); ctx.beginPath(); ctx.ellipse(x + xx * s, y + (yy + xx * xx / 900) * s, 4.4 * s, 3 * s, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }
    const dep = clamp(druk, 0, 1) * clamp(prik * 2 - 1, 0, 1); if (dep > 0.01) { ctx.fillStyle = rgba(C.teal, 0.6); ctx.beginPath(); ctx.ellipse(tx, ty + 0.5 * s, Math.sqrt(dep) * 5 * s, Math.sqrt(dep) * 2.6 * s, 0, 0, 6.283); ctx.fill(); } }
  ctx.translate(tx, ty); ctx.rotate(Math.PI / 2); ctx.scale(s, s); _penTeken(ctx, s, Object.assign({ dosis: 0 }, o, { dop: 0 }));
  ctx.restore(); return ret;
}

// =====================================================================================
// MICROPIPET in de hand (duim op de knop, vingers om de greep, haak over de wijsvinger), schuin, met drie vlakke
// tinten voor volume; de punt hangt in een buisje of een putje van de gel (o.in).
// Recept: handleiding Eppendorf Research plus (SOP): opzuigen = knop tot de eerste stop, punt ± 4 mm in de
//  vloeistof, langzaam terug; afgeven = eerste stop, wachten, dan tweede stop (uitblazen). In een gelputje laat je
//  de punt net onder het bufferoppervlak boven het putje hangen, zonder de bodem te raken: het monster is
//  zwaarder (laadbuffer met glycerol) en zakt in het putje. Afwerpknop naast de bedieningsknop.
//  Maten (≈, productfoto's en antropometrie): pipet ± 27 cm met punt, greep ± 28 mm dik — past in een hand van
//  ± 19 cm (de hand omsluit ± 9 cm van de greep); 1000 µl-punt ± 71 mm. Bedieningsknop blauw (1000 µl).
//  Bekende fouten: duim naast in plaats van op de knop; hand groter of kleiner dan de pipet zou toelaten;
//  punt tot op de bodem van het putje (prikt door de gel).
// x, y = uiteinde van de punt; s = px per mm. o.knop 0..2, o.vol (µl in de punt), o.rot (standaard 0,25 rad
// = licht schuin), o.hand (bool, standaard aan), o.id (castpersonage voor de huidskleur), o.in ('buisje' | 'gel' |
// null), o.a. Geeft { punt, knop, greep, duim } terug.
// =====================================================================================
function micropipet(ctx, x, y, s, o = {}) {
  const { a = 1, knop = 0, vol = 0, rot = 0.25, hand = true, id = 'yasmin', kleur = C.teal } = o; const plek = o.in || null;
  const k = clamp(knop, 0, 2), slag = k <= 1 ? k * 6 : 6 + (k - 1) * 3;
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [x + (px * co - py * si) * s, y + (px * si + py * co) * s];
  const ret = { punt: [x, y], knop: P(0, -272 + slag), greep: P(0, -205), duim: P(0, -282 + slag) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // omgeving: buisje (zijaanzicht) of gelputje in doorsnede, in beeldcoördinaten
  if (plek === 'buisje') { // reactiebuisje 1,5 ml (± 40 mm lang, ± 11 mm breed, ≈), open dop aan een scharnier, vloeistof onderin
    ctx.save(); ctx.translate(x, y + 6 * s); ctx.scale(s, s); const vorm = () => { ctx.beginPath(); ctx.moveTo(-5.5, -38); ctx.lineTo(-5.3, -14); ctx.quadraticCurveTo(-3.5, 1.5, 0, 2); ctx.quadraticCurveTo(3.5, 1.5, 5.3, -14); ctx.lineTo(5.5, -38); };
    vorm(); ctx.closePath(); ctx.fillStyle = rgba(C.er, 0.14); ctx.fill();
    ctx.save(); vorm(); ctx.closePath(); ctx.clip(); ctx.fillStyle = rgba(kleur, 0.55); ctx.fillRect(-6, -16, 12, 20); ctx.fillStyle = lighten(kleur, 0.3); ctx.fillRect(-6, -16.4, 12, 0.8); ctx.restore();
    vorm(); ctx.strokeStyle = C.er; ctx.lineWidth = 0.7; ctx.stroke(); ctx.fillStyle = rgba(C.er, 0.35); ctx.fillRect(-6.8, -39.2, 13.6, 1.4);
    ctx.strokeStyle = C.er; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(6.8, -38.5); ctx.quadraticCurveTo(10, -38, 10.5, -42); ctx.stroke(); roundRect(ctx, 9.5, -56, 2.2, 14, 0.8); ctx.fillStyle = rgba(C.er, 0.3); ctx.fill(); ctx.stroke();
    ctx.restore(); }
  if (plek === 'gel') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = rgba(C.teal, 0.2); ctx.fillRect(-40, -3, 80, 3); ctx.fillStyle = rgba('#E8E4D8', 0.3); ctx.fillRect(-40, 0, 80, 6);
    ctx.fillStyle = '#121A26'; ctx.fillRect(-2.5, 0.5, 5, 3.5); if (k >= 1) { ctx.fillStyle = rgba(C.paars, 0.7 * Math.min(1, k)); ctx.fillRect(-2.3, 1.5, 4.6, 2.5); } ctx.restore(); }
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const band = (x0, x1, y0, y1, cols) => { const n = cols.length; cols.forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); const u0 = i / n, u1 = (i + 1) / n; ctx.moveTo(lerp(x0[0], x0[1], u0), y0); ctx.lineTo(lerp(x0[0], x0[1], u1) + 0.05, y0); ctx.lineTo(lerp(x1[0], x1[1], u1) + 0.05, y1); ctx.lineTo(lerp(x1[0], x1[1], u0), y1); ctx.closePath(); ctx.fill(); }); };
  const grijs = ['#DCE3EB', '#B9C4D2', '#B9C4D2', '#8C99AB'], wit = ['#F0F2F5', '#D5DBE3', '#D5DBE3', '#AEB8C6'];
  // punt (doorschijnend) + vloeistof
  ctx.beginPath(); ctx.moveTo(-0.45, 0); ctx.lineTo(-3.6, -64); ctx.lineTo(-4.2, -71); ctx.lineTo(4.2, -71); ctx.lineTo(3.6, -64); ctx.lineTo(0.45, 0); ctx.closePath(); ctx.fillStyle = rgba('#E8EEF5', 0.18); ctx.fill(); ctx.strokeStyle = rgba('#E8EEF5', 0.55); ctx.lineWidth = 0.4; ctx.stroke();
  if (vol > 0) { let v = 0, h = 0; for (; h < 70; h += 0.1) { const r = 0.3 + 0.045 * h; v += Math.PI * r * r * 0.1; if (v >= vol) break; } ctx.beginPath(); ctx.moveTo(-0.3, 0); ctx.lineTo(-(0.3 + 0.045 * h), -h); ctx.lineTo(0.3 + 0.045 * h, -h); ctx.lineTo(0.3, 0); ctx.closePath(); ctx.fillStyle = rgba(kleur, 0.75); ctx.fill(); }
  band([-3.4, 3.4], [-4.6, 4.6], -66, -100, grijs.map((c, i) => i ? c : c)); band([-6, 6], [-6.5, 6.5], -96, -128, wit); band([-6.5, 6.5], [-9, 9], -128, -165, grijs);
  band([-12, 12], [-14, 14], -165, -252, ['#E6EAF0', '#C9D1DC', '#C9D1DC', '#C9D1DC', '#9AA6B8']);
  ctx.fillStyle = '#C9D1DC'; ctx.beginPath(); ctx.moveTo(14, -236); ctx.lineTo(26, -238); ctx.lineTo(27, -232); ctx.lineTo(16, -226); ctx.fill();
  roundRect(ctx, -6, -215, 12, 26, 2); ctx.fillStyle = '#0F1828'; ctx.fill();
  ctx.fillStyle = '#9AA6B8'; ctx.fillRect(-13, -262, 7, 10); ctx.fillStyle = '#8C99AB'; ctx.fillRect(-2.2, -268 + slag, 4.4, 16 - slag);
  band([-8, 8], [-8, 8], -276 + slag, -268 + slag, ['#6B9DD6', '#3E78B8', '#3E78B8', '#2C5C92']);
  // hand: vingers om de greep onder de haak, duim op de knop
  if (hand) { const huid = (typeof CAST !== 'undefined' && CAST[id] && CAST[id].huid) || BIO.huid, sch = _mixHex ? _mixHex(huid, '#3A2418', 0.18) : huid;
    ctx.fillStyle = huid; roundRect(ctx, 6, -240, 46, 92, 22); ctx.fill(); // handpalm (achter de greep, kant van de pink)
    for (let i = 0; i < 4; i++) { const yy = -229 + i * 21; ctx.fillStyle = i % 2 ? sch : huid; roundRect(ctx, -17, yy, 40, 19.5, 9.75); ctx.fill(); ctx.fillStyle = rgba('#F2D8C6', 0.6); roundRect(ctx, -16, yy + 4, 5, 11, 2.5); ctx.fill(); }
    ctx.fillStyle = huid; ctx.beginPath(); ctx.moveTo(24, -236); ctx.bezierCurveTo(20, -262, 10, -286 + slag, -1, -287 + slag); ctx.lineTo(-6, -281 + slag); ctx.bezierCurveTo(2, -276 + slag, 8, -258, 8, -238); ctx.closePath(); ctx.fill(); // duim
    ctx.fillStyle = rgba('#F2D8C6', 0.7); ctx.beginPath(); ctx.ellipse(-2, -284 + slag, 4, 2, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); return ret;
}

// =====================================================================================
// LICHTMICROSCOOP (binoculair, schoolmodel), zijaanzicht als lijntekening (Part C, lab-bibliotheek), op ware maat.
// Recept (Evident/Olympus CX23: 198 × 398 × 386 mm, ± 6 kg; LED-lamp onderin, Abbe-condensor, kruistafel met
//  verplaatsing 76 × 30 mm, coaxiale grove en fijne scherpstelknop aan beide kanten, scherpstellen door de tafel te
//  bewegen (slag grof 15 mm); onderdelen volgens CUNY Bio Lab Manual: oculair, revolver met objectieven,
//  objectieftafel met preparaatklem, condensor, lamp, voet, statief (arm), grove en fijne instelling, lichtregelaar).
//  Opbouw in zijaanzicht: voet ± 250 mm diep met de lamp; statief (C-vorm) achter; kop met twee oculairen schuin
//  (± 30°) naar de kijker; revolver met 3 objectieven (verschillend lang); tafel ± 140 mm met glaasje; condensor
//  onder de tafel; knoppen laag op het statief. Het licht gaat van de lamp omhoog door condensor, preparaat en
//  objectief (teal bundel, alleen als o.licht).
//  Bekende fouten: oculair recht boven het objectief zonder kop; lamp boven de tafel; microscoop zo groot als een
//  kind; scherpstellen door het oculair te draaien.
// x, y = midden van de voet op tafel; s = px per mm. o.tafel 0..1 (hoogte van de tafel binnen de grove slag),
// o.licht (bool), o.kijk (−1 = oculairen naar links, 1 = naar rechts), o.a. Geeft { oculair, objectief, tafel, lamp,
// knop, condensor } terug.
// =====================================================================================
function microscoop(ctx, x, y, s, o = {}) {
  const { a = 1, tafel = 0.5, licht = true } = o; const k = o.kijk || 1;
  const P = (px, py) => [x + k * px * s, y + py * s]; const dz = clamp(tafel, 0, 1) * 15;
  const ret = { oculair: P(95, -380), objectief: P(30, -215), tafel: P(30, -170 - dz), lamp: P(20, -18), knop: P(-80, -110), condensor: P(30, -140 - dz) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k * s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = C.er, lw = Math.max(1.2, s * 1.2) / s, f = rgba(L, 0.10), poly = (pts, fill = f) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); shape(ctx, fill, L, lw); };
  // lichtbundel
  if (licht) { ctx.fillStyle = rgba(C.teal, 0.22); ctx.beginPath(); ctx.moveTo(14, -30); ctx.lineTo(46, -30); ctx.lineTo(40, -150 - dz); ctx.lineTo(36, -228); ctx.lineTo(24, -228); ctx.lineTo(20, -150 - dz); ctx.closePath(); ctx.fill(); }
  // voet met lamp, statief (C-vorm)
  roundRect(ctx, -125, -40, 250, 40, 8); shape(ctx, f, L, lw); circ(ctx, 30, -40, 14, licht ? rgba(C.goud, 0.8) : rgba(L, 0.2), L, lw);
  poly([[-110, -40], [-110, -300], [-90, -330], [60, -330], [70, -300], [-60, -300], [-70, -280], [-70, -40]]);
  // kop met twee oculairen schuin naar de kijker
  poly([[-60, -330], [60, -330], [70, -350], [-40, -360]]); poly([[40, -345], [62, -360], [104, -398], [86, -412], [30, -365]]);
  ctx.save(); ctx.translate(95, -405); ctx.rotate(-0.72); roundRect(ctx, -9, -20, 18, 24, 3); shape(ctx, rgba(L, 0.25), L, lw); ctx.restore();
  // revolver met drie objectieven
  poly([[0, -300], [60, -300], [52, -318], [8, -318]]); poly([[16, -300], [44, -300], [40, -240], [20, -240]], rgba(L, 0.2)); poly([[46, -300], [60, -300], [62, -268], [52, -268]], rgba(L, 0.12)); poly([[-2, -300], [12, -300], [8, -258], [0, -258]], rgba(L, 0.12));
  // tafel (beweegt), glaasje met klem, condensor
  ctx.save(); ctx.translate(0, -dz); poly([[-40, -168], [110, -168], [110, -158], [-40, -158]], rgba(L, 0.22)); poly([[-70, -160], [-40, -168], [-40, -158], [-70, -150]]);
  ctx.fillStyle = rgba('#E8EEF5', 0.5); ctx.fillRect(-10, -172, 80, 4); ctx.fillStyle = rgba(C.paars, 0.6); ctx.fillRect(26, -172, 8, 3); // preparaat
  poly([[10, -158], [50, -158], [44, -138], [16, -138]], rgba(L, 0.16)); ctx.restore();
  // grove en fijne knop (coaxiaal) laag op het statief
  circ(ctx, -90, -110, 24, rgba(L, 0.18), L, lw); circ(ctx, -90, -110, 12, rgba(L, 0.3), L, lw);
  ctx.restore(); return ret;
}

// =====================================================================================
// PCR-BUISJE (0,2 ml, dunwandig, met platte dop aan een scharnierstrip), zijaanzicht, op ware maat.
// Recept (mm; technisch blad Greiner Bio-One 0,2 ml PCR-buisje: lengte zonder dop 20,75 mm, buitendiameter 7,09 mm,
//  binnendiameter 5,38 mm; passend in het 96-wells raster van 9 mm):
//  - hoogte buisje 20,75 mm (zonder dop), buitendiameter bovenaan 7,1 mm (binnen 5,4), kraag ± 8 mm breed en 0,8 mm hoog;
//  - bovenste 6 mm bijna cilindrisch (r 3,55 → 3,45), daaronder een kegel tot een ronde punt van ± 1,5 mm breed;
//  - dop: plat schijfje van 7 mm met een prop die in de opening valt, aan een strip van ± 4 mm (scharnier rechts);
//  - binnenvolume ± 250 µl (dus 0,2 ml + kopruimte); een PCR-mix is meestal 20–50 µl: dan staat de vloeistof alleen
//    in de punt (onderste ± 6–9 mm); o.vol wordt daarom begrensd op 50 µl. Het niveau wordt uitgerekend uit het binnenprofiel (µl = mm³).
//  - polypropyleen is doorschijnend: lijntekening in C.er (#AFC0D0), vloeistof als vlak in een betekeniskleur
//    (standaard teal = water/mix), DNA desgewenst als paarse streepjes (o.dna).
//  Bekende fouten: buisje als reageerbuis met ronde bodem; vloeistof halfvol bij 25 µl; dop los zonder scharnier;
//  buisje even groot als een vinger (een vingertop is ± 15 mm breed: het buisje is smaller dan een vinger).
// x, y = midden van de bovenrand (kraag); s = px per mm. o.open 0 dicht … 1 open (dop klapt naar rechts om),
// o.vol (µl, standaard 25), o.kleur (vloeistof), o.dna (aantal streepjes), o.hl (gouden rand), o.a.
// Geeft { rand, punt, vloeistof, dop } terug (ankerpunten voor namen; zet een naam ± 60 px naast het buisje).
// =====================================================================================
function _pcrProfiel(y) { // binnenstraal (mm) op diepte y onder de rand
  if (y < 0) return 0; if (y <= 6) return lerp(2.69, 2.6, y / 6); if (y <= 20.1) return lerp(2.6, 0.45, (y - 6) / 14.1); return 0;
}
function _pcrNiveau(vol) { // diepte van het vloeistofoppervlak bij vol µl (integratie van onder naar boven)
  let v = 0; for (let y = 20.1; y > 0; y -= 0.05) { const r = _pcrProfiel(y); v += Math.PI * r * r * 0.05; if (v >= vol) return y; } return 0;
}
function pcrBuisje(ctx, x, y, s, o = {}) {
  const { a = 1, open = 0, vol = 25, kleur = C.teal, dna = 0, hl = 0, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const yN = _pcrNiveau(Math.min(vol, 50));
  const ret = { rand: P(0, 0), punt: P(0, 20.75), vloeistof: P(0, (yN + 20.1) / 2), dop: P(0, -1.5) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1.2, s * 0.22) / s, lijn = C.er, klein = s < 4;
  const buiten = () => { ctx.beginPath(); ctx.moveTo(-3.55, 0); ctx.lineTo(-3.45, 6); ctx.lineTo(-0.8, 20.0); ctx.quadraticCurveTo(0, 21.1, 0.8, 20.0); ctx.lineTo(3.45, 6); ctx.lineTo(3.55, 0); ctx.closePath(); };
  // lichaam
  buiten(); ctx.fillStyle = rgba(lijn, 0.10); ctx.fill();
  // vloeistof (binnenprofiel, vlak oppervlak met een klein meniscusje)
  if (vol > 0.5) { ctx.save(); ctx.beginPath(); ctx.moveTo(-_pcrProfiel(yN), yN); for (let yy = yN; yy <= 20.1; yy += 0.4) ctx.lineTo(-_pcrProfiel(yy), yy);
    ctx.quadraticCurveTo(0, 20.7, 0.45, 20.1); for (let yy = 20.1; yy >= yN; yy -= 0.4) ctx.lineTo(_pcrProfiel(yy), yy); ctx.closePath();
    ctx.fillStyle = rgba(kleur, 0.42); ctx.fill(); ctx.clip();
    ctx.strokeStyle = lighten(kleur, 0.4); ctx.lineWidth = lw * 1.2; ctx.beginPath(); const rN = _pcrProfiel(yN); ctx.moveTo(-rN, yN - 0.25); ctx.quadraticCurveTo(0, yN + 0.25, rN, yN - 0.25); ctx.stroke();
    if (dna > 0 && !klein) { ctx.strokeStyle = C.paars; ctx.lineWidth = 0.22; for (let i = 0; i < dna; i++) { const u = hash(i * 7 + 3), v = hash(i * 7 + 4); const yy = lerp(yN + 0.6, 19.3, v); const rr = _pcrProfiel(yy) * 0.8; const xx = (u * 2 - 1) * rr, an = hash(i * 7 + 5) * 3.14 + Math.sin(t + i) * 0.2;
      ctx.beginPath(); ctx.moveTo(xx - Math.cos(an) * 0.45, yy - Math.sin(an) * 0.45); ctx.lineTo(xx + Math.cos(an) * 0.45, yy + Math.sin(an) * 0.45); ctx.stroke(); } }
    ctx.restore(); }
  buiten(); ctx.strokeStyle = hl > 0.01 ? C.goud : lijn; ctx.lineWidth = hl > 0.01 ? lw * 1.8 : lw; ctx.stroke();
  if (!klein) { ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.moveTo(-2.7, 1); ctx.lineTo(-2.6, 6); ctx.lineTo(-1.0, 15.5); ctx.stroke(); } // glans van het plastic
  // kraag
  roundRect(ctx, -4.0, -0.8, 8.0, 0.8, 0.25); shape(ctx, rgba(lijn, 0.22), lijn, lw);
  // scharnierstrip + dop (draait om het scharnier rechts boven de kraag)
  const hx = 4.1, hy = -0.6, th = clamp(open, 0, 1) * Math.PI * 1.04;
  ctx.strokeStyle = lijn; ctx.lineWidth = 0.55; ctx.beginPath(); ctx.moveTo(3.8, -0.4); ctx.quadraticCurveTo(hx + 0.9, hy + 0.2, hx + 0.3, hy - 1.0); ctx.stroke(); // strip
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(th); ctx.translate(-hx, -hy);
  roundRect(ctx, -3.8, -2.2, 7.6, 1.4, 0.35); shape(ctx, rgba(lijn, 0.22), lijn, lw); // dopschijf
  ctx.beginPath(); ctx.rect(-2.65, -0.8, 5.3, 0.95); shape(ctx, rgba(lijn, 0.12), lijn, lw); // prop die in de opening valt
  ctx.restore();
  ctx.restore(); return ret;
}

// =====================================================================================
// PETRISCHAAL in drie-kwart-aanzicht met deksel dat opengaat: je ziet de agarlaag (4 mm) aan de rand, kolonies als
// bultjes, schijfjes en remmingszones in perspectief.
//  Recept: ASM-protocol 'Kirby-Bauer disk diffusion' (Hudzicki 2009/2016): petrischaal van 100 mm (hier 90 mm, de
//  gangbare maat in Nederland, ≈), agar 4 mm dik; bacteriën als gelijkmatig gazon over de hele plaat; papieren
//  schijfjes van 6 mm met antibioticum, minstens 24 mm uit elkaar; na ± 24 uur bij 37 °C een heldere remmingszone
//  rond een schijfje waar het middel werkt (diameter in mm, vergeleken met een tabel); groeit het gazon tot tegen het
//  schijfje, dan is de bacterie resistent (OpenOregon Microbiology lab manual, 'Antibiotic susceptibility testing').
//  Losse kolonies (o.gazon false): ronde, licht glanzende bultjes van 1–5 mm die in de tijd groeien.
//  Kleuren: agar lichtgeel-oker doorschijnend, kolonies crème, schijfjes wit; zones = gewoon agar zonder groei.
//  Bekende fouten: zone die oplicht in plaats van leeg is; schijfjes te groot; zones even groot bij alle middelen;
//  kolonies als felle stippen.
//  Schaal 90 × 15 mm, deksel iets groter (± 92 mm, ≈); oogpunt 35° boven de schaal.
// x, y = midden van de bodem; s = px per mm. o.deksel 0 dicht … 1 open (kantelt naar achteren), o.groei, o.gazon,
// o.schijf, o.a. Geeft { midden, schijfjes, zones, deksel } terug.
// =====================================================================================
const _PS_SCHIJF = [[-22, -18, 0], [24, -14, 18], [0, 24, 27]]; // [x, y (mm vanaf het midden), zone-diameter mm; 0 = resistent: groei tot tegen het schijfje]
function _psInhoud(ctx, P, sy, o) { // P(xmm, ymm) → beeld; sy = verkorting in y (1 = bovenaanzicht); tekent gazon/kolonies, schijfjes, zones
  const { groei = 1, gazon = true, schijf = true, t = 0, s = 1 } = o; const r = 42; // agar-straal (mm) in een schaal van 90 mm
  const zones = schijf ? _PS_SCHIJF : [];
  const inZone = (xx, yy) => zones.some(([zx, zy, d]) => Math.hypot(xx - zx, yy - zy) < Math.max(3.3, d / 2));
  if (gazon && groei > 0.01) { // gazon: één rustige, licht matte laag over de hele agar; zones blijven helder agar
    const m = P(0, 0), q1 = P(r - 1.5, 0); ctx.save(); ctx.beginPath(); ctx.ellipse(m[0], m[1], q1[0] - m[0], (q1[0] - m[0]) * sy, 0, 0, 6.283);
    zones.forEach(([zx, zy, d]) => { const q = P(zx, zy), rr = Math.max(3.3, d / 2) * s; ctx.moveTo(q[0] + rr, q[1]); ctx.ellipse(q[0], q[1], rr, rr * sy, 0, 0, 2 * Math.PI, true); });
    ctx.fillStyle = rgba('#E8DAB2', 0.75 * groei); ctx.fill('evenodd'); ctx.clip('evenodd');
    for (let i = 0; i < 160; i++) { const u = hash(i * 2 + 1) * 6.283, rr = Math.sqrt(hash(i * 2 + 2)) * (r - 1.5), q = P(Math.cos(u) * rr, Math.sin(u) * rr); ctx.fillStyle = rgba('#F2E6C4', 0.18 * groei); ctx.beginPath(); ctx.ellipse(q[0], q[1], 2.2 * s, 2.2 * s * sy, 0, 0, 6.283); ctx.fill(); }
    ctx.restore(); }
  if (!gazon) for (let i = 0; i < 26; i++) { const u = hash(i * 3 + 5) * 6.283, rr = Math.sqrt(hash(i * 3 + 6)) * (r - 4), xx = Math.cos(u) * rr, yy = Math.sin(u) * rr; if (inZone(xx, yy)) continue;
    const d = (1.2 + 2.6 * hash(i * 3 + 7)) * clamp(groei * 1.4 - hash(i) * 0.4, 0, 1); if (d < 0.1) continue; const q = P(xx, yy); ctx.fillStyle = hash(i + 40) < 0.8 ? '#E3D3A8' : '#D8B98A'; ctx.beginPath(); ctx.ellipse(q[0], q[1], d * s, d * s * sy, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = rgba('#FFFFFF', 0.3); ctx.beginPath(); ctx.ellipse(q[0] - d * s * 0.3, q[1] - d * s * sy * 0.3, d * s * 0.3, d * s * sy * 0.3, 0, 0, 6.283); ctx.fill(); }
  if (schijf) zones.forEach(([zx, zy, d], i) => { const q = P(zx, zy); if (d > 0 && groei > 0.3) { ctx.strokeStyle = rgba('#E3D3A8', 0.5 * groei); ctx.lineWidth = Math.max(1, 0.4 * s); ctx.beginPath(); ctx.ellipse(q[0], q[1], d / 2 * s, d / 2 * s * sy, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.ellipse(q[0], q[1], 3 * s, 3 * s * sy, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = Math.max(0.8, 0.3 * s); ctx.stroke(); });
}
function petrischaal(ctx, x, y, s, o = {}) {
  const { a = 1, deksel = 0 } = o; const sy = Math.sin(35 * Math.PI / 180), cz = Math.cos(35 * Math.PI / 180);
  const P = (px, py, pz = 4) => [x + px * s, y + (py * sy - pz * cz) * s];
  const ret = { midden: P(0, 0), schijfjes: _PS_SCHIJF.map(([zx, zy]) => P(zx, zy)), zones: _PS_SCHIJF.map(([zx, zy, d]) => [...P(zx, zy), d / 2 * s]), deksel: P(0, -40, 40) }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; const lw = Math.max(1, 0.5 * s);
  const ell = (r, z, fill, stroke) => { const q = P(0, 0, z); ctx.beginPath(); ctx.ellipse(q[0], q[1], r * s, r * s * sy, 0, 0, 6.283); shape(ctx, fill, stroke, lw); };
  const wand = (r, z0, z1, fill, stroke) => { const a0 = P(-r, 0, z0), a1 = P(r, 0, z0), b0 = P(-r, 0, z1); ctx.beginPath(); ctx.moveTo(...b0); ctx.lineTo(...a0); ctx.ellipse(x, a0[1], r * s, r * s * sy, 0, Math.PI, 0, true); ctx.lineTo(P(r, 0, z1)[0], P(r, 0, z1)[1]); ctx.ellipse(x, b0[1], r * s, r * s * sy, 0, 0, Math.PI, false); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  // bodem + agar (4 mm, de zijkant zichtbaar) + inhoud
  ell(45, 0, rgba(C.er, 0.08), rgba(C.er, 0.5)); wand(42.5, 0, 4, '#9C8A55', null); ell(42.5, 4, '#B9A66E', null); { const q = P(0, 0, 4); ctx.save(); ctx.beginPath(); ctx.ellipse(q[0], q[1], 42.5 * s, 42.5 * s * sy, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.30); ctx.fill(); ctx.clip(); _psInhoud(ctx, (px, py) => P(px, py, 4), sy, Object.assign({ s }, o)); ctx.restore(); }
  wand(45, 0, 15, rgba(C.er, 0.10), rgba(C.er, 0.7)); ell(45, 15, null, rgba(C.er, 0.7));
  // deksel: kantelt om de achterrand
  const ph = clamp(deksel, 0, 1) * 1.35; ctx.save(); ctx.globalAlpha *= 0.9; const pts = []; for (let k = 0; k <= 32; k++) { const u = k / 32 * 6.283, X = Math.cos(u) * 46.5, Yr = Math.sin(u) * 46.5 + 46.5; const Y = -46.5 + Yr * Math.cos(ph), Z = 17 + Yr * Math.sin(ph); pts.push(P(X, Y, Z)); }
  ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.closePath(); shape(ctx, rgba(C.er, 0.10), rgba(C.er, 0.8), lw); ctx.restore();
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, 1.2 * s); const g = P(-30, -20, 15); ctx.beginPath(); ctx.ellipse(g[0], g[1], 8 * s, 2 * s, -0.3, 0, 6.283); ctx.stroke();
  ctx.restore(); return ret;
}

// =====================================================================================
// PLASMIDE KNIPPEN EN PLAKKEN (recombinant DNA), ringaanzicht. Uitbreiding van plasmideRing (lib_micro_evo.js):
// zelfde ring van dubbelstrengs DNA met een resistentiegen in oker, maar nu als proces in vier stappen.
// Recept (OpenStax Biology 2e § 17.1; EcoRI: herkenningsplek G↓AATTC, homodimeer, 5′-overhang AATT):
//  stap 0 → 1 knippen: het restrictie-enzym knipt beide strengen verspringend (zigzag), de ring gaat open; aan elk
//    uiteinde steekt één streng 4 basen uit (plakkerig uiteinde, AATT);
//  stap 1 → 2 plakken: het gen (goud, met dezelfde plakkerige uiteinden want met hetzelfde enzym geknipt) schuift
//    in de opening; de uitstekende basen passen op elkaar;
//  stap 2 → 3 ligase: twee kleine eiwitkluwens sluiten de naden in de ruggengraat (fosfodiësterbinding);
//  stap 3 → 4 terug in de bacterie: de ring krimpt tot ± 1/4 van de bacteriebreedte en ligt helemaal binnen het
//    membraan (Beeldafspraken: niets steekt buiten het celmembraan).
//  Het resistentiegen (oker) blijft op de ring: daarmee selecteer je de bacteriën die het plasmide opnamen.
//  Echte maat: plasmide 2–200 kb; een bacterie ± 2 µm lang. Altijd 'vergroot'.
//  Enzymen in het gedeelde lintmodel (_grKluwen): EcoRI als twee gelijke helften op de knipplek, ligase (groengrijs) op
//  elke naad; een vergrootcirkel toont dan de basen in puzzelvorm met de uitstekende AATT en TTAA (goud omrand).
//  Bekende fouten: recht knippen (stompe uiteinden) bij EcoRI; gen met andere uiteinden dan de opening;
//  plasmide dat buiten de bacterie uitsteekt; schaar-icoon in plaats van een enzym.
// x, y = midden; r = straal van de ring in px. o.stap 0..4, o.letters (AATT bij grote ring, standaard aan als r ≥ 110),
// o.a, o.t. Geeft { knip, gen, resistentie, naden:[[x,y],[x,y]], bacterie } terug.
// =====================================================================================
// (gebruikt _grKluwen uit inbouw/lab/_hulp.js: één keer in lib_bio.js)
function plasmideKnipPlak(ctx, x, y, r, o = {}) {
  const { a = 1, stap = 0, t = 0 } = o; const st = clamp(stap, 0, 4);
  const knip = clamp(st, 0, 1), plak = clamp(st - 1, 0, 1), lig = clamp(st - 2, 0, 1), terug = clamp(st - 3, 0, 1);
  const top = -Math.PI / 2, genHoek = 0.62; // opening die het gen vult (rad)
  const R = lerp(r, r * 0.42, ease(terug)), cy = y, w = Math.max(3, R * 0.11), stapR = Math.max(0.06, 9 / R); // sporten ± 9 px uit elkaar
  const ksc = R / 150;
  const halve = lerp(0.02, genHoek / 2, ease(knip)) * (st >= 1 ? 1 : 1), over = 4 * 0.055; // overhang = 4 basen (hoek)
  const ret = { knip: [x, cy - R], gen: [x, cy - R - (1 - ease(plak)) * R * 0.9], resistentie: [x + Math.cos(0.6) * R, cy + Math.sin(0.6) * R], naden: [], bacterie: [x, cy] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // bacterie (stap 3–4): staafvorm met wand en membraan; de ring ligt erbinnen
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= ease(terug); const bl = r * 2.6, bh = r * 1.25;
    const caps = (ww, hh) => { ctx.beginPath(); roundRect(ctx, x - ww / 2, cy - hh / 2, ww, hh, hh / 2); };
    caps(bl + 14, bh + 14); shape(ctx, rgba(C.oker, 0.22), rgba(C.oker, 0.8), 3); caps(bl, bh); shape(ctx, '#22314D', rgba('#D8C9A8', 0.75), 2);
    ctx.strokeStyle = rgba(C.paars, 0.45); ctx.lineWidth = 2; const ch = []; for (let k = 0; k < 14; k++) { const u = k / 14 * 6.283; ch.push([x - bl * 0.28 + Math.cos(u) * bl * 0.12 + (hash(k + 5) - 0.5) * bl * 0.07, cy + Math.sin(u) * bh * 0.26 + (hash(k + 11) - 0.5) * bh * 0.12]); } ctx.beginPath(); bioPad(ctx, ch, true); ctx.stroke(); // chromosoom (losse lus, ingekort)
    ctx.restore(); }
  const strengArc = (rr, a0, a1, kleur, bw) => { if (a1 <= a0) return; ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.beginPath(); ctx.arc(x, cy, rr, a0, a1); ctx.stroke(); };
  const sporten = (a0, a1, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * (R - w * 1.2), cy + Math.sin(th) * (R - w * 1.2)); ctx.lineTo(x + Math.cos(th) * (R + w * 1.2), cy + Math.sin(th) * (R + w * 1.2)); ctx.stroke(); } };
  const halfSpoor = (a0, a1, buiten, kleur) => { ctx.strokeStyle = kleur; ctx.lineWidth = Math.max(1.5, w * 0.35); for (let th = a0 + stapR / 2; th < a1; th += stapR) { const r0 = buiten ? R : R - w * 1.2, r1 = buiten ? R + w * 1.2 : R; ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * r0, cy + Math.sin(th) * r0); ctx.lineTo(x + Math.cos(th) * r1, cy + Math.sin(th) * r1); ctx.stroke(); } };
  // ring: van rechts van de opening rond tot links van de opening; buitenstreng loopt 4 basen verder dan de binnenstreng (zigzag)
  const aR = top + halve, aL = top - halve + Math.PI * 2, dO = knip > 0.02 ? over * 0.5 : 0;
  const binnen0 = aR + dO, binnen1 = aL + dO, buiten0 = aR - dO, buiten1 = aL - dO; // verspringend
  sporten(Math.max(binnen0, buiten0), Math.min(binnen1, buiten1), rgba(D2.oudR, 0.85));
  if (knip > 0.02) { halfSpoor(buiten0, binnen0, true, rgba(C.goud, 0.9)); halfSpoor(buiten1, binnen1, false, rgba(C.goud, 0.9)); }
  strengArc(R + w * 1.2, buiten0, buiten1, D2.oud, w); strengArc(R - w * 1.2, binnen0, binnen1, D2.oud, w);
  strengArc(R + w * 1.2, 0.0, 1.2, C.oker, w * 1.15); strengArc(R - w * 1.2, 0.0, 1.2, C.oker, w * 1.15); // resistentiegen
  // gen met dezelfde plakkerige uiteinden: daalt in de opening
  if (st > 1.0 || (st > 0.6)) { const ga = clamp((st - 0.6) / 0.4, 0, 1) * (st < 1 ? 1 : 1); const zak = (1 - ease(plak)) * R * 0.9;
    ctx.save(); ctx.globalAlpha *= st < 1 ? clamp((st - 0.6) / 0.4, 0, 1) : 1; ctx.translate(0, -zak);
    const g0 = top - genHoek / 2, g1 = top + genHoek / 2; const gb0 = g0 - dO, gb1 = g1 - dO, gi0 = g0 + dO, gi1 = g1 + dO; // past op de opening
    // gen-uiteinden: buitenstreng steekt links uit, binnenstreng rechts (complementair aan de ring)
    sporten(Math.max(gb0, gi0), Math.min(gb1, gi1), rgba(lighten(C.goud, 0.3), 0.7));
    strengArc(R + w * 1.2, g0 - dO, g1 - dO, C.goud, w); strengArc(R - w * 1.2, g0 + dO, g1 + dO, C.goud, w);
    halfSpoor(g0 - dO, g0 + dO, true, rgba(C.goud, 0.9)); halfSpoor(g1 - dO, g1 + dO, false, rgba(C.goud, 0.9));
    ctx.restore(); }
  // letters AATT op de overhang (alleen bij een grote ring en zolang het gen er nog niet in zit)
  const letters = o.letters != null ? o.letters : R >= 110; if (letters && knip > 0.6 && plak < 0.5) { const fs = Math.max(16, R * 0.13);
    'AATT'.split('').forEach((b, i) => { const th1 = buiten0 + stapR * (i + 0.5) * 0.98, th2 = buiten1 + stapR * (i + 0.5) * 1.7 - stapR * 1.2;
      text(ctx, b, x + Math.cos(th1) * (R + w * 2.6 + 46 * ksc), cy + Math.sin(th1) * (R + w * 2.6 + 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center');
      text(ctx, 'TTAA'[i], x + Math.cos(th2) * (R - w * 2.6 - 46 * ksc), cy + Math.sin(th2) * (R - w * 2.6 - 46 * ksc) + fs * 0.35, fMeta(fs), C.goud, 'center'); }); }
  // EcoRI (lintmodel, twee gelijke helften aan weerszijden van de dubbelstreng) op de knipplek tijdens het knippen
  const top0 = [x, cy - R];
  if (st > 0.02 && st < 1.25) { const ea = st < 1 ? 0.35 + 0.65 * Math.sin(Math.min(1, knip * 1.4) * Math.PI / 2) : 1 - (st - 1) / 0.25;
    [[1, C.enzym, 0], [-1, '#8A7FA8', Math.PI]].forEach(([sg, kl2, rot]) => _grKluwen(ctx, top0[0], top0[1] - sg * (w * 2.4 + 22 * ksc), (px, py) => (px / 40) ** 2 + (py / 17) ** 2 < 1, { r: 2.8, sc: ksc, col: kl2, seed: 4, bbox: [-40, -17, 40, 17], key: 'pkEco', rot, a: clamp(ea, 0, 1) })); }
  // ligase (lintmodel, eigen tint) komt bij het plakken op elk van de twee naden en sluit de ruggengraat
  if (st >= 1.7 && st < 3.4) { const la = st < 2 ? (st - 1.7) / 0.3 : st < 3 ? 1 : 1 - (st - 3) / 0.4; [top - genHoek / 2, top + genHoek / 2].forEach((th, i) => { const px = x + Math.cos(th) * (R + w * 2.6 + 20 * ksc), py = cy + Math.sin(th) * (R + w * 2.6 + 20 * ksc); ret.naden.push([px, py]);
      _grKluwen(ctx, px, py, (qx, qy) => (qx / 26) ** 2 + (qy / 19) ** 2 < 1, { r: 2.8, sc: ksc, col: '#6E9A8C', seed: 6 + i, bbox: [-26, -19, 26, 19], key: 'pkLig', rot: th + Math.PI / 2, a: clamp(la, 0, 1), fold: st < 2 ? 0.6 + 0.4 * clamp((st - 1.7) / 0.3, 0, 1) : 1 });
      if (lig > 0.05 && lig < 0.95) { ctx.save(); ctx.globalAlpha *= Math.sin(lig * Math.PI); circ(ctx, x + Math.cos(th) * R, cy + Math.sin(th) * R, w * 2.2, null, C.goud, 2); ctx.restore(); } }); }
  // vergrootcirkel met de basen in puzzelvorm op het moment dat de uitsteeksels zichtbaar zijn
  const zA = st < 0.6 ? 0 : st < 0.75 ? (st - 0.6) / 0.15 : st < 1.5 ? 1 : st < 1.7 ? (1.7 - st) / 0.2 : 0;
  if (zA > 0.01 && R >= 110) { const zx = x + R * 1.38, zy = cy - R * 0.72, zr = R * 0.66; ctx.save(); ctx.globalAlpha *= zA;
    ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x + R * 0.1, cy - R * 1.0); ctx.lineTo(zx - zr, zy); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); shape(ctx, C.bgMicro, C.goud, 2.5); ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr - 2, 0, 6.283); ctx.clip();
    const bpz = zr * 0.16, Lz = zr * 0.22, hwz = bpz * 0.34, comp = { A: 'T', T: 'A', C: 'G', G: 'C' }, gapz = (st >= 1 ? lerp(1.6, 0.4, clamp(st - 1, 0, 0.5) * 2) : 1.6 * clamp((st - 0.6) / 0.3, 0, 1)) * bpz;
    const kx = (k) => zx + (k - 7.3) * bpz, yT2 = zy - Lz, yB2 = zy + Lz; const L1 = 'TCAG', R1 = 'AATTCG';
    const rug = (x0, x1, yy) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bpz * 0.3); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); };
    rug(kx(2) - bpz, kx(5) + bpz * 0.4, yT2); rug(kx(2) - bpz, kx(9) + bpz * 0.4, yB2); rug(kx(6) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yT2); rug(kx(10) - bpz * 0.4 + gapz, kx(12) + bpz + gapz, yB2);
    L1.split('').forEach((bb, i) => { d2Base(ctx, kx(2 + i), yT2, Math.PI / 2, bb, Lz, hwz); d2Base(ctx, kx(2 + i), yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    'TTAA'.split('').forEach((bb, i) => d2Base(ctx, kx(6 + i), yB2, -Math.PI / 2, bb, Lz, hwz, { rand: C.goud }));
    R1.split('').forEach((bb, i) => { d2Base(ctx, kx(6 + i) + gapz, yT2, Math.PI / 2, bb, Lz, hwz, { rand: i < 4 ? C.goud : null }); if (i >= 4) d2Base(ctx, kx(6 + i) + gapz, yB2, -Math.PI / 2, comp[bb], Lz, hwz); });
    ctx.restore(); ctx.restore(); }
  ctx.restore(); return ret;
}

// =====================================================================================
// PRIMER MET POLYMERASE: kort enkelstrengs stukje DNA (20 nt, goud) gebonden op de matrijs; DNA-polymerase
// (polymeraseAchter/-Voor uit deze bibliotheek) gaat op het 3′-uiteinde zitten en bouwt de nieuwe streng (lichtpaars).
// Recept: OpenStax Biology 2e § 17.1 (PCR: primers zijn korte stukjes DNA die complementair zijn aan de uiteinden
//  van het doelstuk) en § 14.3 (polymerase kan alleen verlengen aan een vrij 3′-uiteinde, dus het heeft een
//  primer nodig). Een PCR-primer is ± 18–25 nt; hij ligt antiparallel op de matrijs, met zijn 3′-kant naar het
//  doelstuk toe. Basen in de puzzelvorm van de DNA-reeks (d2Base: A punt ↔ T inkeping, C nok ↔ G sleuf), alle sporten
//  even lang; ruggengraat van de primer goud, van de matrijs paars.
//  Stand o.bouw 0..1: de polymerase klemt zich op het 3′-uiteinde van de primer en voegt nucleotiden toe die passen
//  bij de matrijs, alleen in de richting 5′ → 3′ (naar rechts); de primer blijft het begin van de nieuwe streng.
//  Los (o.bind < 1) ritst de primer eerst vast zoals in de basisversie.
//  Bekende fouten: primer zo lang als het gen; primer parallel (5′ op 5′); basen die niet passen; primer als staafje.
// x, y = 5′-uiteinde van de primer als hij gebonden is (voet van de eerste base); s = schaal (1 = 34 px per base).
// o.bind 0..1, o.bouw 0..1 (± 7 nieuwe nucleotiden), o.seq, o.t, o.a. Geeft { vijf, drie, matrijs3, polymerase } terug.
// =====================================================================================
function primerStuk(ctx, x, y, s, o = {}) {
  const { a = 1, bind = 1, matrijs = true, t = 0, bouw = 0 } = o;
  const seq = (o.seq || 'GACCTGAAGTCCATGGCTAC').slice(0, 30), n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const bp = 34 * s, L = 30 * s, hw = bp * 0.32, yM = y + 2 * L; // matrijs onder de primer
  const voor = 3, na = 7; // matrijsbasen links en rechts van de bindplek
  const ret = { vijf: [x, y], drie: [x + (n - 1) * bp, y], matrijs3: [x - voor * bp, yM] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const nNieuw = bind >= 1 ? Math.floor(clamp(bouw, 0, 1) * 7.999) : 0, xA = x + (n - 1 + nNieuw) * bp + bp * 0.5; ret.polymerase = [xA, y + L];
  if (bind >= 1 && bouw > 0.001) polymeraseAchter(ctx, xA, y + L, 2 * L, { dir: 1, up: 1 });
  if (matrijs) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; const P = [];
    for (let i = -voor; i < n + na; i++) P.push([x + i * bp, yM]);
    ctx.strokeStyle = D2.oud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(P[0][0] - bp * 0.4, yM); ctx.lineTo(P[P.length - 1][0] + bp * 0.4, yM); ctx.stroke();
    for (let i = -voor; i < n + na; i++) d2Base(ctx, x + i * bp, yM, -Math.PI / 2, mseq[i + voor], L, hw);
    if (s > 0.5) { text(ctx, "3′", x - (voor + 0.9) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'right'); text(ctx, "5′", x + (n + na - 0.1) * bp, yM + 10 * s, fMeta(Math.max(14, 24 * s)), C.text2, 'left'); } }
  // primer: elke base heeft een eigen moment van binden (rits van 3′ naar 5′)
  const pts = []; for (let i = 0; i < n; i++) { const k = clamp(bind * 1.6 - (n - 1 - i) / n * 0.6, 0, 1), e = ease(k);
    const losX = x + (n - 1) * bp * 0.5 + (i - (n - 1) / 2) * bp * 0.92, losY = y - 2.4 * L + Math.sin(i * 0.7 + t * 1.5) * L * 0.35 + Math.cos(i * 0.31) * L * 0.4;
    pts.push([lerp(losX, x + i * bp, e), lerp(losY, y, e), e]); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0], p[1]]), false); ctx.stroke();
  pts.forEach((p, i) => { const vrij = 1 - p[2]; const ang = Math.PI / 2 + vrij * (Math.sin(i * 1.3 + t) * 0.5); d2Base(ctx, p[0], p[1], ang, seq[i], L, hw, { plekA: 0 }); });
  if (nNieuw > 0) { const mseq = 'TAC' + seq.split('').map(b => comp[b]).join('') + 'GTACCGA'; ctx.strokeStyle = D2.nieuw; ctx.lineWidth = Math.max(3, bp * 0.3); ctx.beginPath(); ctx.moveTo(x + (n - 1) * bp, y); ctx.lineTo(x + (n - 1 + nNieuw) * bp + bp * 0.3, y); ctx.stroke();
    for (let j = 0; j < nNieuw; j++) d2Base(ctx, x + (n + j) * bp, y, Math.PI / 2, comp[mseq[voor + n + j]], L, hw); }
  if (bind >= 1 && bouw > 0.001) polymeraseVoor(ctx, xA, y + L, 2 * L, { dir: 1, up: 1, sluit: (bouw * 8) % 1 });
  if (s > 0.5) { const e0 = pts[0], e1 = pts[n - 1]; text(ctx, "5′", e0[0] - bp * 0.8, e0[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'right'); const xe = e1[0] + nNieuw * bp; if (!(bouw > 0.001)) text(ctx, "3′", xe + bp * 0.8, e1[1] - 4 * s, fMeta(Math.max(14, 24 * s)), C.goud, 'left'); }
  ctx.restore(); return ret;
}

// =====================================================================================
// RESTRICTIE-ENZYM (EcoRI), lintmodel: eiwit dat langs het DNA glijdt, de herkenningsplek GAATTC vindt, zich vastklemt en
// beide strengen verspringend knipt, zodat er plakkerige uiteinden (AATT) ontstaan.
// Recept (OpenStax Biology 2e § 17.1: restrictie-enzymen herkennen een vaste volgorde en knippen voorspelbaar, vaak
//  verspringend → plakkerige uiteinden die met complementaire uiteinden kunnen paren; EcoRI: G↓AATTC, homodimeer
//  van twee gelijke ketens van ± 31 kDa, 5′-overhang AATT). De plek is een palindroom: beide strengen lezen van
//  5′ naar 3′ GAATTC, daarom past één symmetrisch dimeer en knipt elke helft één streng op dezelfde plek in zijn
//  eigen leesrichting. Maten: elk eiwitdeel ± 5 nm, DNA 2 nm breed, 0,34 nm per basepaar.
//  Stappen: o.stap 0–1 glijden, 1–2 herkennen en klemmen (plek goud omrand), 2–2,5 knippen (zigzag),
//  2,5–3 loslaten, uiteinden wijken uiteen.
//  Eiwit = gevouwen keten (BEELDAFSPRAKEN) als lint in een doorschijnend oppervlak per helft, géén schaar-icoon. Een DNA-schaar alleen als metafoor in tekst.
//  Klem: na herkenning slaat elke helft een smalle arm vóór het DNA langs (Kim e.a. 1986; Wikipedia EcoRI).
//  Herstel 28 okt 2026: iSite wees één base te vroeg (C|GAATTC, overhang GAAT); nu G↓AATTC, overhang AATT/TTAA.
//  Bekende fouten: rechte knip; één streng geknipt; enzym als schaar; uitsteeksels die niet AATT/TTAA zijn.
// x, y = midden van de herkenningsplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..3,
// o.t, o.a. Geeft { enzym, site, knipBoven, knipOnder } terug.
// =====================================================================================
// --- eiwitketen-hulpjes (alleen voor dit object): een kluwen uit een doorlopende keten met helices (3,6 kralen per
// winding) en gestrekte stukken, gevouwen binnen een ellips; z = diepte (voor/achter) voor licht en dikte.
function _reePad(cx, cy, rx, ry, n, seed, rot = 0) { const P = [], rh = Math.min(rx, ry) * 0.13, c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) { const u = i / n * 6.283, hel = Math.floor(i / 9 + seed) % 3 !== 2;
    let px = rx * (0.78 * Math.sin(3 * u + seed) + 0.12 * Math.sin(7 * u + seed * 2)), py = ry * (0.78 * Math.sin(4 * u + seed * 0.7) + 0.12 * Math.cos(9 * u)), pz = Math.cos(3 * u + seed) * 0.6 + Math.sin(5 * u) * 0.4;
    if (hel) { const ph = i * 1.745; px += Math.cos(ph) * rh; py += Math.sin(ph) * rh * 0.55; pz += Math.sin(ph) * 0.5; }
    P.push([cx + px * c - py * s, cy + px * s + py * c, pz]); } return P; }
function _reeKralen(ctx, P, r, kleur, o = {}) { const { hl = null } = o; ctx.strokeStyle = lighten(kleur, 0.35); ctx.lineWidth = Math.max(1, r * 0.45); ctx.beginPath(); bioPad(ctx, P.map(p => [p[0], p[1]]), false); ctx.stroke();
  P.map((p, i) => i).sort((A, B) => P[A][2] - P[B][2]).forEach(i => { const p = P[i], d = (p[2] + 1) / 2; ctx.fillStyle = d > 0.5 ? lighten(kleur, 0.12 * d) : kleur; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.82 + 0.25 * d), 0, 6.283); ctx.fill(); ctx.strokeStyle = rgba(C.bgMicro, 0.35); ctx.lineWidth = 1; ctx.stroke(); }); }
function _reeLint(ctx, P, w, kleur, o = {}) { // cartoon: achterste stukken smal en donker, voorste breed en licht
  const seg = (voor) => { for (let i = 1; i < P.length; i++) { const z = (P[i][2] + P[i - 1][2]) / 2; if ((z >= 0) !== voor) continue; ctx.strokeStyle = voor ? lighten(kleur, 0.18 + 0.2 * z) : _mixHex(kleur, '#121A26', 0.35); ctx.lineWidth = voor ? w * (0.75 + 0.35 * z) : w * 0.5;
      ctx.beginPath(); const a0 = P[Math.max(0, i - 2)], a1 = P[i - 1], b1 = P[i]; ctx.moveTo((a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2); ctx.quadraticCurveTo(a1[0], a1[1], (a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2); ctx.stroke(); } };
  ctx.lineCap = 'round'; seg(false); seg(true); }
function restrictieEnzym(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 1, t = 0 } = o; const st = clamp(stap, 0, 3);
  const glij = clamp(st, 0, 1), klem = clamp(st - 1, 0, 1), knip = clamp((st - 2) / 0.5, 0, 1), los = clamp((st - 2.5) / 0.5, 0, 1);
  const bp = 3.4, L = 10, seq = 'TACCTGCAGTCGAATTCTAGCCATGGTA', iSite = 11, /* index van de G in GAATTC */ n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const X = (i) => x + (i - iSite - 2.5) * bp * s, yT = y - L * s, yB = y + L * s;
  const ex = x + lerp(-110, 0, ease(glij)) * s + Math.sin(t * 3) * (glij < 1 ? 2 * s : 0), ey = y, weg = ease(los) * 32 * s, ea = 1 - ease(los) * 0.8, dicht = lerp(14, 0, ease(klem)) * s;
  const uit = ease(los) * 2.2 * bp * s; const dxT = (i) => (knip >= 1 && i >= iSite + 1 ? uit : 0), dxB = (i) => (knip >= 1 && i >= iSite + 5 ? uit : 0);
  const ret = { enzym: [ex, ey], site: [X(iSite + 2.5), y], knipBoven: [X(iSite + 0.5), yT], knipOnder: [X(iSite + 4.5), yB] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hw = bp * s * 0.34, rw = Math.max(2.5, bp * s * 0.35), herken = klem > 0.3;
  const rug = (yy, i0, i1, dxf) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = rw; ctx.beginPath(); ctx.moveTo(X(i0) - bp * s * 0.45 + dxf(i0), yy); ctx.lineTo(X(i1) + bp * s * 0.45 + dxf(i1), yy); ctx.stroke(); };
  if (knip >= 1) { rug(yT, 0, iSite, dxT); rug(yT, iSite + 1, n - 1, dxT); rug(yB, 0, iSite + 4, dxB); rug(yB, iSite + 5, n - 1, dxB); }
  else { rug(yT, 0, n - 1, dxT); rug(yB, 0, n - 1, dxB); }
  for (let i = 0; i < n; i++) { const inSite = i >= iSite && i < iSite + 6; const rand = inSite && herken ? C.goud : null;
    d2Base(ctx, X(i) + dxT(i), yT, Math.PI / 2, seq[i], L * s, hw, { rand, letter: s >= 2.5 }); d2Base(ctx, X(i) + dxB(i), yB, -Math.PI / 2, comp[seq[i]], L * s, hw, { rand, letter: s >= 2.5 }); }
  // de zigzag-knip oplichten
  if (knip > 0.01 && los < 0.7) { ctx.save(); ctx.globalAlpha *= (knip < 1 ? knip : 1 - los / 0.7); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 1.2 * s); ctx.setLineDash([4 * s, 3 * s]); ctx.beginPath(); ctx.moveTo(X(iSite + 0.5), yT - L * s * 0.6); ctx.lineTo(X(iSite + 0.5), y); ctx.lineTo(X(iSite + 4.5), y); ctx.lineTo(X(iSite + 4.5), yB + L * s * 0.6); ctx.stroke(); ctx.restore(); }
  // homodimeer: twee gelijke ketens, puntgespiegeld om het midden van de herkenningsplek; elk knipt één streng
  ctx.save(); ctx.globalAlpha *= ea * 0.93;
  for (const [sg, kl] of [[1, C.enzym], [-1, '#8A7FA8']]) { const cx2 = ex, cy2 = ey + sg * (-27 * s - dicht - weg); ctx.beginPath(); const hp = []; for (let k = 0; k < 14; k++) { const u = k / 14 * 6.283; hp.push([cx2 + Math.cos(u) * 40 * s, cy2 + Math.sin(u) * 22 * s * (1 + 0.1 * Math.sin(u * 3))]); } bioPad(ctx, hp, true); ctx.fillStyle = rgba(kl, 0.22); ctx.fill(); ctx.strokeStyle = rgba(lighten(kl, 0.3), 0.5); ctx.lineWidth = 1.5; ctx.stroke();
    [[-14, -24, 15, 0.8], [14, -30, 14, 2.4]].forEach(([dx2, dy2, r2, sd]) => _reeLint(ctx, _reePad(ex + sg * dx2 * s, ey + sg * (dy2 * s - dicht - weg), r2 * s, r2 * 0.8 * s, 28, sd, sg < 0 ? Math.PI : 0), Math.max(1.5, 3 * s), kl)); }
  // klem (herstel 28 okt 2026; Kim e.a. 1986 Science + Wikipedia EcoRI: elke helft slaat een 'arm' om het DNA): na herkenning
  // steekt elke helft één smalle lintarm vóór het DNA langs naar de overkant; bij loslaten trekken de armen terug
  const armA = ease(clamp(klem * 1.5, 0, 1)) * (1 - ease(los));
  if (armA > 0.01) { ctx.save(); ctx.globalAlpha *= armA; for (const [sg, kl] of [[1, C.enzym], [-1, '#8A7FA8']]) _reeLint(ctx, _reePad(ex - sg * 30 * s, ey - sg * 4 * s, 5 * s, 24 * s, 22, sg > 0 ? 1.3 : 3.1, sg < 0 ? Math.PI : 0), Math.max(1.5, 2.6 * s), kl); ctx.restore(); }
  if (herken) { ctx.fillStyle = C.goud; for (const [px, py] of [[X(iSite + 0.5), yT - 8 * s], [X(iSite + 4.5), yB + 8 * s]]) { ctx.beginPath(); ctx.arc(px + (ex - x), py + (py < y ? -1 : 1) * weg, 3.5 * s, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  ctx.restore(); return ret;
}

// =====================================================================================
// SEQUENCER (Sanger-methode): kopieën van alle lengtes met een gekleurde stopbase, op lengte gesorteerd in een
// capillair, laser + detector lezen de kleur van de laatste base, het chromatogram groeit piek voor piek.
// Recept (Bio-OER CUNY 'Sanger sequencing of DNA'; OpenStax Biology 2e § 17.2–17.3): een beetje ddNTP (zonder
//  3′-OH) stopt de verlenging; elke ddNTP draagt een eigen fluorescente kleur; zo ontstaan kopieën van elke lengte;
//  capillaire elektroforese sorteert ze, de kortste komen eerst bij de detector; de laser laat de stopbase
//  oplichten; elke piek = één base, de hoogte = hoe zeker de aflezing is. Kleuren (vast in deze reeks, volgt de
//  gangbare kleurcode A groen, C blauw, G geel/zwart, T rood): A groen, C teal, G goud, T koraal.
//  Bekende fouten: alle kopieën even lang; de langste het eerst gelezen; de kleur zit op de eerste base;
//  een piekje per streng in plaats van per lengte.
//  Met o.soort 'ngs': tafelapparaat van de nieuwe generatie met stroomcel en een scherm vol korte reads op een
//  referentie; een variant = een kolom waar (bijna) alle reads dezelfde andere base hebben (boven de kolom de base),
//  een leesfout = één losse afwijking (OpenStax Biology 2e § 17.3 'whole-genome sequencing', ≈ voor de weergave).
// x, y = linksboven van het schema; s = schaal (1 ≈ 1500 × 560 px). o.fase 0..1 (0–0,3 kopieën verschijnen,
// 0,3–1 lopen en lezen), o.seq (gelezen volgorde), o.soort ('sanger' | 'ngs'; bij ngs: x, y = linksonder van het
// apparaat, s = px per cm, o.scherm), o.a. Geeft { kopieen, capillair, laser, chromatogram } (ngs: { apparaat, stroomcel, scherm, variant }) terug.
// =====================================================================================
const SEQ_KLEUR = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
function _seqNgs(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0.7, scherm = false } = o; const K = { A: C.groen, C: C.teal, G: C.goud, T: C.koraal };
  const ref = 'ATGCCTGAGGTCATTACGGATCCAGT', vPos = 13, vB = 'G';
  const W = 60, H = 52; const P = (px, py) => [x + px * s, y - py * s];
  const sx = scherm ? x : x + 30 * s, sy = scherm ? y - 40 * s : y - 34 * s, sw = scherm ? 60 * s : 26 * s, sh = scherm ? 40 * s : 16 * s;
  const ret = { apparaat: P(W / 2, H / 2), stroomcel: P(12, 22), scherm: [sx + sw / 2, sy + sh / 2], variant: [sx + sw * (vPos + 0.5) / ref.length, sy + sh * 0.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (!scherm) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    roundRect(ctx, 0, -H, W, H, 3); shape(ctx, '#3A4A66', '#5E7194', 0.4); ctx.fillStyle = '#4B5D7E'; ctx.fillRect(0, -H, W, 4);
    roundRect(ctx, 4, -26, 18, 6, 1); shape(ctx, '#0F1828', '#7A8BA8', 0.3); // sleuf stroomcel
    ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(6, -24.5, 14, 3); // stroomcel half in de sleuf
    ctx.fillStyle = '#2B384F'; ctx.fillRect(3, -2, 8, 2); ctx.fillRect(W - 11, -2, 8, 2); ctx.restore(); }
  // scherm met referentie en reads
  roundRect(ctx, sx, sy, sw, sh, Math.max(2, sw * 0.02)); shape(ctx, '#0F1828', '#5A6B88', 1.5);
  const n = ref.length, cw = sw * 0.94 / n, ox = sx + sw * 0.03, refY = sy + sh * 0.88, fs = Math.max(6, cw * 0.8);
  if (cw > 7) ref.split('').forEach((b, i) => text(ctx, b, ox + (i + 0.5) * cw, refY + fs * 0.35, fMeta(fs), b === ref[vPos] && i === vPos ? C.text : C.text2, 'center'));
  else { ctx.fillStyle = C.text2; ctx.fillRect(ox, refY - 1, n * cw, 2); }
  const rows = 9, rh = (sh * 0.78) / rows, toon = Math.round(fase * rows * 3);
  for (let k = 0; k < toon; k++) { const r = k % rows, kol = Math.floor(k / rows); const len = 6 + Math.floor(hash(k * 7 + 1) * 4), st = Math.floor(hash(k * 7 + 2) * (n - len)) ; const yy = sy + sh * 0.06 + r * rh;
    for (let i = st; i < st + len; i++) { let b = ref[i]; if (i === vPos && hash(k * 7 + 3) < 0.85) b = vB; if (i !== vPos && hash(k * 7 + i) < 0.012) b = 'T'; // zeldzame leesfout
      ctx.fillStyle = rgba(K[b], b === ref[i] ? 0.35 : 0.95); ctx.fillRect(ox + i * cw + 0.5, yy + kol * rh * 0.0, cw - 1, rh * 0.7); } }
  if (fase > 0.6) { const fv = Math.max(8, cw * 0.95); text(ctx, vB, ox + (vPos + 0.5) * cw, sy - fv * 0.25, fMeta(fv), K[vB], 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, cw * 0.12); ctx.strokeRect(ox + vPos * cw - 1, sy + sh * 0.04, cw + 2, sh * 0.92); }
  ctx.restore(); return ret;
}
function sequencer(ctx, x, y, s, o = {}) {
  if (o.soort === 'ngs') return _seqNgs(ctx, x, y, s, o);
  const { a = 1, fase = 0.6 } = o; const seq = (o.seq || 'GATTACAGCTAG').slice(0, 14), n = seq.length;
  const maakF = clamp(fase / 0.3, 0, 1), loopF = clamp((fase - 0.3) / 0.7, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { kopieen: P(230, 280), capillair: P(760, 280), laser: P(760, 470), chromatogram: P(1200, 300) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  // 1. kopieën van elke lengte (matrijs paars, nieuwe streng lichtpaars, gekleurde stopbase)
  const nt = 26, y0 = 40;
  for (let i = 0; i < n; i++) { const al = clamp(maakF * n - i, 0, 1); if (al <= 0) continue; const yy = y0 + i * 36;
    ctx.save(); ctx.globalAlpha *= al * (1 - 0.7 * loopF); ctx.strokeStyle = D2.nieuw; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(20, yy); ctx.lineTo(20 + (i + 1) * nt, yy); ctx.stroke();
    ctx.fillStyle = SEQ_KLEUR[seq[i]]; ctx.beginPath(); ctx.arc(20 + (i + 1) * nt + 6, yy, 9, 0, 6.283); ctx.fill(); ctx.restore(); }
  // 2. capillair (verticaal), fragmenten lopen naar beneden; kortste het verst
  const cx = 760, cTop = 30, cBot = 470; ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.strokeRect(cx - 14, cTop, 28, cBot - cTop + 60); ctx.fillStyle = rgba(C.er, 0.08); ctx.fillRect(cx - 14, cTop, 28, cBot - cTop + 60);
  ctx.fillStyle = '#2B2F38'; ctx.fillRect(cx - 40, cTop - 18, 80, 14); // min-kant
  let gelezen = 0;
  for (let i = 0; i < n; i++) { const snel = 1.9 - i * 0.07, pos = cTop + 20 + loopF * snel * 520; if (pos > cBot + 10) { gelezen = Math.max(gelezen, i + 1); continue; }
    if (loopF > 0) { ctx.fillStyle = rgba(SEQ_KLEUR[seq[i]], 0.9); roundRect(ctx, cx - 10, pos - 3, 20, 6, 3); ctx.fill(); } }
  // laser + detector
  ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx - 140, cBot); ctx.lineTo(cx + 30, cBot); ctx.stroke(); roundRect(ctx, cx - 230, cBot - 34, 90, 68, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx - 140, cBot, 7, C.koraal); // laser
  roundRect(ctx, cx + 30, cBot - 40, 100, 80, 10); shape(ctx, '#3A4A66', '#5E7194', 2); circ(ctx, cx + 60, cBot, 20, '#0F1828', '#7A8BA8', 3); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 130, cBot); ctx.lineTo(cx + 200, cBot - 40); ctx.stroke(); // detector, signaal naar het chromatogram
  const nu = gelezen < n ? (cTop + 20 + loopF * (1.9 - gelezen * 0.07) * 520) : 0; if (gelezen < n && Math.abs(nu - cBot) < 22 && loopF > 0) circ(ctx, cx, cBot, 16, rgba(SEQ_KLEUR[seq[gelezen]], 0.6));
  // 3. chromatogram: piek per gelezen base
  const gx = 960, gw = 520, gy = 470, gh = 360; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  const dx = gw / (n + 1); for (const b of 'ACGT') { ctx.strokeStyle = SEQ_KLEUR[b]; ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= gw; px += 2) { let v = 0; for (let i = 0; i < gelezen; i++) if (seq[i] === b) { const h = 0.65 + 0.3 * hash(i * 3 + 1); v += h * Math.exp(-Math.pow((px - dx * (i + 1)) / (dx * 0.22), 2)); } const yy = gy - v * gh * 0.85; px ? ctx.lineTo(gx + px, yy) : ctx.moveTo(gx, yy); } ctx.stroke(); }
  for (let i = 0; i < gelezen; i++) text(ctx, seq[i], gx + dx * (i + 1), gy - gh - 8, fMeta(30), SEQ_KLEUR[seq[i]], 'center');
  ctx.restore(); return ret;
}

// =====================================================================================
// THERMOCYCLER als gekoppeld schema: apparaat (schuin, deksel open met blok en buisjes) + temperatuurprofiel met lopende stip + wat de
// DNA-strengen bij die temperatuur doen + teller van het aantal kopieën (1 → 2 → 4 → 8).
// Recept: drie stappen per cyclus (OpenStax Biology 2e § 17.1; PCR-collegeslides KSU): ± 95 °C (20–30 s) de twee
//  strengen gaan los; 50–65 °C (hier 55, ± 30 s) korte primers binden aan het 3′-uiteinde van elke streng; 72 °C
//  (± 60 s) Taq-polymerase bouwt vanaf de primer een nieuwe streng (5′ → 3′). Elke cyclus verdubbelt het aantal
//  kopieën (n cycli → 2ⁿ); 25–35 cycli. De opwarm- en afkoelflanken zijn kort maar zichtbaar (geen sprong).
//  Kleuren: oude streng paars, nieuwe streng lichtpaars, primer goud; lijn van het profiel koraal bij opwarmen,
//  teal bij afkoelen. Apparaat ± 25 cm breed (≈).
//  Bekende fouten: primers binden bij 95 °C; nieuwe streng groeit in beide richtingen tegelijk vanaf het midden;
//  na één cyclus vier kopieën.
// x, y = linksonder van het hele schema; s = schaal (1 ≈ 1 px per mm voor het apparaat; schema ± 860 × 520 px).
// o.fase = cycli als kommagetal (2,4 = derde cyclus, primers binden); o.toon 'alles' | 'apparaat'; o.open (deksel,
// standaard 0,55); o.a.
// Geeft { apparaat, profiel, strengen, teller, temp } terug.
// =====================================================================================
function _tcTemp(f) { const c = Math.floor(f), u = f - c, voor = c === 0 ? 25 : 72;
  if (u < 0.05) return lerp(voor, 95, u / 0.05); if (u < 0.25) return 95; if (u < 0.32) return lerp(95, 55, (u - 0.25) / 0.07); if (u < 0.5) return 55; if (u < 0.55) return lerp(55, 72, (u - 0.5) / 0.05); return 72; }
function _tcKast(ctx, x, y, s, o = {}) {
  const { a = 1, open = 0, temp = 95, cyclus = 1, van = 30, stap = null, buisjes = 0, hl = 0 } = o;
  const W = 250, H = 150, D = 400, kx = 0.42, ky = 0.3;
  const pr = (X, Y, Z) => [x + (X + Z * kx) * s, y - (Y + Z * ky) * s];
  const ret = { display: pr(70, 90, 0), blok: pr(125, H, 96), deksel: pr(125, H + 60, 200), lamp: pr(210, 95, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const lw = Math.max(1, s * 0.5);
  const vlak = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach((p, i) => { const q = pr(...p); i ? ctx.lineTo(...q) : ctx.moveTo(...q); }); ctx.closePath(); shape(ctx, fill, stroke || lighten(fill, 0.18), lw); };
  const kast = '#3A4A66', kastL = '#4B5D7E', kastD = '#2B384F';
  // voetjes, zijkant, voorkant, bovenkant
  vlak([[W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]], kastD);
  vlak([[0, 0, 0], [W, 0, 0], [W, H, 0], [0, H, 0]], kast);
  vlak([[0, H, 0], [W, H, 0], [W, H, D], [0, H, D]], kastL);
  // ventilatiesleuven op de zijkant
  ctx.strokeStyle = rgba('#121A26', 0.6); ctx.lineWidth = lw; for (let k = 0; k < 9; k++) { const z = 120 + k * 22; const p0 = pr(W, 25, z), p1 = pr(W, 70, z); ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  // display + lampje + knopjes op de voorkant
  vlak([[18, 55, 0], [128, 55, 0], [128, 125, 0], [18, 125, 0]], '#0F1828', '#5A6B88');
  const dp = pr(73, 102, 0), fs = 22 * s;
  if (s > 0.6) { text(ctx, Math.round(temp) + ' °C', dp[0], dp[1], fMeta(Math.max(8, fs)), stap === 'op' ? C.koraal : stap === 'af' ? C.teal : C.text, 'center');
    const dp2 = pr(73, 72, 0); text(ctx, cyclus + ' / ' + van, dp2[0], dp2[1], fMeta(Math.max(7, fs * 0.65)), C.text2, 'center'); }
  const lp = pr(205, 100, 0); circ(ctx, lp[0], lp[1], 6 * s, stap === 'op' ? C.koraal : stap === 'af' ? C.teal : stap === 'klaar' ? C.groen : '#55657F');
  for (let k = 0; k < 3; k++) { const q = pr(160 + k * 22, 70, 0); circ(ctx, q[0], q[1], 6 * s, '#55657F'); }
  // blok met 12 × 8 gaatjes (bovenop, onder het deksel)
  const bx0 = 71, bz0 = 60; vlak([[bx0 - 8, H, bz0 - 8], [bx0 + 116, H, bz0 - 8], [bx0 + 116, H, bz0 + 80], [bx0 - 8, H, bz0 + 80]], '#8C96A6', '#B8C0CC');
  if (s > 0.9) for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const q = pr(bx0 + c * 9 + 4.5, H, bz0 + r * 9 + 4.5); ctx.beginPath(); ctx.ellipse(q[0], q[1], 3.0 * s, 2.0 * s, 0, 0, 6.283); ctx.fillStyle = '#4C5566'; ctx.fill(); }
  for (let c = 0; c < buisjes; c++) { const q0 = pr(bx0 + c * 9 + 4.5, H, bz0 + 4.5), q1 = pr(bx0 + c * 9 + 4.5, H + 9, bz0 + 4.5); ctx.fillStyle = rgba(C.er, 0.8); ctx.fillRect(q0[0] - 3 * s, q1[1], 6 * s, q0[1] - q1[1]); ctx.beginPath(); ctx.ellipse(q1[0], q1[1], 3.2 * s, 1.6 * s, 0, 0, 6.283); ctx.fillStyle = '#DDE4EC'; ctx.fill(); }
  // deksel: doos die om de achterrand (Z = D) draait
  const phi = clamp(open, 0, 1) * 1.25, Lz = D - 20, h = 55;
  const hoek = (X, yr, zr) => { const Z = zr * Math.cos(phi) + yr * Math.sin(phi), Y = -zr * Math.sin(phi) + yr * Math.cos(phi); return [X, H + 2 + Y, D + Z]; };
  const c = (X, top, voor) => hoek(X, top ? h : 0, voor ? -Lz : 0);
  const vlakken = [
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 0, 0), c(0, 0, 0)], f: '#262F40', z: 0 },   // onderkant (verwarmd deksel)
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 1, 1), c(0, 1, 1)], f: kast, z: 1 },        // voorkant
    { p: [c(W, 0, 1), c(W, 0, 0), c(W, 1, 0), c(W, 1, 1)], f: kastD, z: 1 },       // zijkant
    { p: [c(0, 1, 1), c(W, 1, 1), c(W, 1, 0), c(0, 1, 0)], f: kastL, z: 2 }];      // bovenkant
  const zichtbaar = (q) => { const P0 = pr(...q[0]), P1 = pr(...q[1]), P2 = pr(...q[2]); return (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P1[1] - P0[1]) * (P2[0] - P0[0]); };
  vlakken.forEach(v => { if (v.z === 0 ? phi > 0.05 : true) { const z = zichtbaar(v.p); if (v.z === 0 || z < 0 || v.z === 2 || v.z === 1) vlak(v.p, v.f); } });
  if (s > 0.6) { const g = pr(W / 2, H + h + 2, 30); const g2 = c(W / 2 - 40, 1, 1), g3 = c(W / 2 + 40, 1, 1); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(...pr(...g2)); ctx.lineTo(...pr(...g3)); ctx.stroke(); }
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = lw * 2.5; ctx.beginPath(); const q = [pr(0, 0, 0), pr(W, 0, 0), pr(W, 0, D), pr(W, H, D)]; ctx.strokeRect(q[0][0] - 6, pr(0, H + h, 0)[1] - 6, q[1][0] - q[0][0] + 12, q[0][1] - pr(0, H + h, 0)[1] + 12); }
  ctx.restore(); return ret;
}
function thermocycler(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0, toon = 'alles' } = o; const f = Math.max(0, fase), c = Math.floor(f), u = f - c, T = _tcTemp(f);
  const stap = u < 0.05 || (u >= 0.5 && u < 0.55) ? 'op' : (u >= 0.25 && u < 0.32) ? 'af' : u < 0.25 ? 'los' : u < 0.5 ? 'binden' : 'bouwen';
  const ret = { apparaat: [x + 150 * s, y - 130 * s], profiel: [x + 560 * s, y - 380 * s], strengen: [x + 560 * s, y - 150 * s], teller: [x + 125 * s, y - 20 * s], temp: T };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // --- apparaat schuin van voren, deksel open met het blok (12 × 8 gaatjes) en een strip buisjes erin
  _tcKast(ctx, x, y, 0.72 * s, { open: o.open == null ? 0.55 : o.open, temp: T, cyclus: c + 1, van: 30, stap: stap === 'op' ? 'op' : stap === 'af' ? 'af' : null, buisjes: 8 });
  if (toon !== 'alles') { ctx.restore(); return ret; }
  // --- temperatuurprofiel: 3 cycli zichtbaar rond de huidige
  const gx = x + 400 * s, gy = y - 260 * s, gw = 470 * s, gh = 230 * s, c0 = Math.max(0, c - 1), nC = 3;
  const tx = (ff) => gx + (ff - c0) / nC * gw, ty = (TT) => gy - (Math.max(TT, 40) - 40) / 60 * gh;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10 * s); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw + 10 * s, gy); ctx.stroke();
  for (const TT of [55, 72, 95]) { ctx.strokeStyle = rgba(C.line, 0.25); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(gx, ty(TT)); ctx.lineTo(gx + gw, ty(TT)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, TT + ' °C', gx - 10 * s, ty(TT) + 9 * s, fMeta(Math.max(10, 26 * s)), C.text2, 'right'); }
  const seg = (f0, f1, kleur, w) => { ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); for (let ff = f0; ff <= f1 + 1e-6; ff += 0.004) { const p = [tx(ff), ty(_tcTemp(ff))]; ff === f0 ? ctx.moveTo(...p) : ctx.lineTo(...p); } ctx.stroke(); };
  seg(c0, c0 + nC - 0.001, rgba(C.line, 0.45), 2.5 * s); // hele profiel vaag
  for (let ff = c0; ff < f; ff += 0.01) { const g = ff - Math.floor(ff); const k = (g < 0.05 || (g >= 0.5 && g < 0.55)) ? C.koraal : (g >= 0.25 && g < 0.32) ? C.teal : C.text; seg(ff, Math.min(f, ff + 0.01), k, 4 * s); }
  circ(ctx, tx(f), ty(T), 9 * s, C.goud);
  // --- de strengen bij deze stap (één molecuul, 20 sporten)
  const sx = gx + 40 * s, sw = gw - 80 * s, sy = y - 120 * s, N = 20, st = sw / N, open = stap === 'los' ? clamp(u / 0.2, 0, 1) : stap === 'af' || stap === 'binden' || stap === 'bouwen' ? 1 : (u >= 0.5 ? 1 : 0);
  const gap = lerp(28, 90, open) * s, yT = sy - gap / 2, yB = sy + gap / 2, rung = 13 * s;
  const streng = (yy, kl, i0, i1, dir) => { ctx.strokeStyle = kl; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(sx + i0 * st, yy); ctx.lineTo(sx + i1 * st, yy); ctx.stroke(); ctx.lineWidth = 5 * s; for (let i = i0; i < i1; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yy); ctx.lineTo(sx + (i + 0.5) * st, yy + dir * rung); ctx.stroke(); } };
  streng(yT, C.paars, 0, N, 1); streng(yB, C.paars, 0, N, -1);
  if (open < 0.3) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 3 * s; for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yT + rung); ctx.lineTo(sx + (i + 0.5) * st, yB - rung); ctx.stroke(); } }
  const prim = (stap === 'binden' && u > 0.36) || stap === 'bouwen' || (u >= 0.5); const pa = stap === 'binden' ? clamp((u - 0.36) / 0.1, 0, 1) : 1;
  if (prim && open > 0.9) { ctx.save(); ctx.globalAlpha *= pa; streng(yT + 2 * rung + 4 * s, C.goud, N - 3, N, -1); streng(yB - 2 * rung - 4 * s, C.goud, 0, 3, 1); ctx.restore();
    if (stap === 'bouwen') { const g = clamp((u - 0.55) / 0.4, 0, 1), n = Math.round(g * (N - 3)); streng(yT + 2 * rung + 4 * s, D2.nieuw, N - 3 - n, N - 3, -1); streng(yB - 2 * rung - 4 * s, D2.nieuw, 3, 3 + n, 1); } }
  text(ctx, "5′", sx - 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'right'); text(ctx, "3′", sx + sw + 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'left');
  // --- teller: aantal kopieën als kleine dubbelstrengen
  const n = Math.pow(2, c) * (stap === 'bouwen' && u > 0.97 ? 2 : 1), toonN = Math.min(n, 16);
  for (let i = 0; i < toonN; i++) { const px = x + (10 + (i % 8) * 30) * s, py = y + (40 + Math.floor(i / 8) * 26) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22 * s, py); ctx.moveTo(px, py + 9 * s); ctx.lineTo(px + 22 * s, py + 9 * s); ctx.stroke(); }
  text(ctx, '× ' + n, x + 260 * s, y + 56 * s, fMeta(Math.max(10, 28 * s)), C.text, 'left');
  ctx.restore(); return ret;
}

// =====================================================================================
// groep organen-plant
// =====================================================================================

// =====================================================================================
// BLOEM IN DOORSNEDE — bloem van opzij (zoals appel-/kersenbloesem), de stamper opengesneden; bestuiving door een bij.
// Recept: van buiten naar binnen vier kransen op de bloembodem: kelkbladen (groen, onder), kroonbladen (groot, kleur,
// lokken bestuivers), meeldraden (helmdraad + helmknop met twee helmhokjes vol stuifmeel), in het midden de stamper:
// stempel (kleverig) – stijl – vruchtbeginsel met zaadbeginsels. Bovenstandig vruchtbeginsel: kelk, kroon en
// meeldraden staan eronder vast. Meeldraden ± 2/3 van de kroonbladlengte; stempel ongeveer op de hoogte van de
// helmknoppen. Bestuiving: stuifmeel komt (via de bij) op de stempel; een stuifmeelbuis groeit door de stijl naar een
// zaadbeginsel (o.buis). De bij: kop, borststuk, achterlijf; 6 poten aan het borststuk; 2 paar vleugels.
// Bron: Ezcurra-lab (UC Riverside) reproductieve morfologie; LibreTexts Boundless 26.3A (kransen, stamper);
// vorm gecontroleerd met referentieplaat. Bekende fouten: meeldraden óp het vruchtbeginsel; kelk boven de kroon;
// stuifmeelbuis buiten de stijl; bij met poten aan het achterlijf.
// Inbouw 28 okt 2026 (Kamiel koos A): bij met zes poten aan het borststuk (drie aan de verre kant gedempt) en twee
// paar vleugels (voor- en achtervleugel duidelijk apart); stuifmeelbuis iets dikker. Bron: ASU Ask a Biologist, FAO
// 'Anatomy of the honeybee' (zes poten, twee paar vleugels aan het borststuk). Verder A ongewijzigd.
// Ontwerp: hoogte ± 600 (y −300..300), breedte ± 760, oorsprong = midden van het vruchtbeginsel ± (0,120).
// Aanpak A: natuurgetrouw (naar referentieplaat), kroonbladen met nerven, bij die landt en stuifmeel achterlaat.
// o: a, t, bij (0..1 bij zichtbaar/vliegt in), stuif (0..1 stuifmeel op de stempel), buis (0..1 stuifmeelbuis), hi
//    ('kelk','kroon','meeldraad','stamper','vruchtbeginsel','zaadbeginsel')
// =====================================================================================
function bloemDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, bij = 0, stuif = 0, buis = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { kelk: W(-230, 110), kroon: W(-280, -60), meeldraad: W(-150, -120), helmknop: W(-170, -205), stempel: W(0, -235), stijl: W(0, -120), vruchtbeginsel: W(0, 120), zaadbeginsel: W(-28, 130), steel: W(0, 270) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const KROON = '#E9D3DD', KROONr = '#A8809A', GROEN = '#7FA868', GROENd = '#5E8A50', GEEL = '#E0B64A', STAMP = '#9FC08A';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  const vorm = (pts, fill, rand, lw = 1.5) => { ctx.beginPath(); bioPad(ctx, pts, true); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke(); } };
  // steel + bloembodem
  ctx.save(); ctx.globalAlpha *= dimF('kelk'); vorm([[-16, 300], [-14, 220], [-30, 190], [-60, 170], [60, 170], [30, 190], [14, 220], [16, 300]], GROEN, GROENd); ctx.restore();
  // kroonbladen: achterste groot in het midden, twee schuin opzij (achter de meeldraden)
  ctx.save(); ctx.globalAlpha *= dimF('kroon');
  const blad = (rot, L, B, dx) => { ctx.save(); ctx.translate(dx, 150); ctx.rotate(rot); const P = [[0, 0], [-B * 0.5, -L * 0.35], [-B * 0.55, -L * 0.75], [-B * 0.2, -L], [B * 0.25, -L * 0.98], [B * 0.55, -L * 0.72], [B * 0.45, -L * 0.3]];
    vorm(P, KROON, hi === 'kroon' ? C.goud : KROONr, hi === 'kroon' ? 3 : 2.2); ctx.strokeStyle = rgba(KROONr, 0.6); ctx.lineWidth = 1;
    for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(0, -8); ctx.quadraticCurveTo(k * B * 0.12, -L * 0.5, k * B * 0.2, -L * 0.92); ctx.stroke(); } ctx.restore(); };
  blad(0, 430, 210, 0); blad(-1.15, 400, 220, -24); blad(1.15, 400, 220, 24); blad(-0.55, 420, 190, -10); blad(0.55, 420, 190, 10);
  ctx.restore();
  // kelkbladen (onder de kroon)
  ctx.save(); ctx.globalAlpha *= dimF('kelk'); for (const sd of [-1, 1]) vorm([[sd * 20, 168], [sd * 120, 140], [sd * 260, 128], [sd * 150, 165], [sd * 60, 186]], GROEN, hi === 'kelk' ? C.goud : GROENd, hi === 'kelk' ? 3 : 1.5); ctx.restore();
  // meeldraden: helmdraad vanaf de bloembodem, rond de stamper (achterste dunner/doffer)
  ctx.save(); ctx.globalAlpha *= dimF('meeldraad');
  const MD = [[-178, -190, 0.85], [-120, -228, 1], [-62, -200, 0.8], [62, -205, 0.8], [125, -232, 1], [180, -192, 0.85], [-100, -150, 0.7], [96, -152, 0.7]];
  MD.forEach(([hx, hy, d], i) => { const bx = Math.sign(hx) * 34; ctx.strokeStyle = rgba('#E8E1C4', d); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, 165); ctx.quadraticCurveTo(hx * 0.45, 20, hx, hy + 18); ctx.stroke();
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(Math.atan2(hy + 18 - 20, hx - hx * 0.45) + 1.571 + 3.1416); ctx.fillStyle = hi === 'meeldraad' ? C.goud : GEEL; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 6, 0, 7, 17, 0, 0, 6.283); ctx.fill(); } ctx.restore();
    if (i < 6) { ctx.fillStyle = GEEL; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(hx + (hash(i * 5 + k) - 0.5) * 30, hy - 18 + (hash(i * 7 + k) - 0.5) * 14, 2.6, 0, 6.283); ctx.fill(); } } });
  ctx.restore();
  // stamper, opengesneden: vruchtbeginsel met zaadbeginsels, stijl, stempel
  ctx.save(); ctx.globalAlpha *= dimF('stamper') === 1 || hi === 'vruchtbeginsel' || hi === 'zaadbeginsel' ? 1 : 0.35;
  const STAMPER = [[0, 182], [-46, 170], [-56, 120], [-40, 70], [-14, 30], [-10, -150], [-14, -220], [-26, -236], [0, -242], [26, -236], [14, -220], [10, -150], [14, 30], [40, 70], [56, 120], [46, 170]];
  vorm(STAMPER, STAMP, hi === 'stamper' ? C.goud : GROENd, hi === 'stamper' ? 3 : 1.5);
  vorm([[0, 166], [-36, 156], [-42, 118], [-28, 80], [0, 62], [28, 80], [42, 118], [36, 156]], '#5E7A4E', hi === 'vruchtbeginsel' ? C.goud : null, 3); // holte vruchtbeginsel
  ctx.strokeStyle = '#9FC08A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 64); ctx.lineTo(0, 165); ctx.stroke(); // tussenschot
  for (const [zx, zy] of [[-20, 96], [-22, 126], [-20, 152], [20, 96], [22, 126], [20, 152]]) { ctx.beginPath(); ctx.ellipse(zx, zy, 11, 9, 0, 0, 6.283); ctx.fillStyle = hi === 'zaadbeginsel' ? C.goud : '#E8E6C8'; ctx.fill(); ctx.fillStyle = '#B9B68E'; ctx.beginPath(); ctx.arc(zx + Math.sign(zx) * 2, zy, 3, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#C6D98E'; ctx.beginPath(); ctx.ellipse(0, -238, 30, 9, 0, 0, 6.283); ctx.fill(); // stempel
  ctx.restore();
  // stuifmeel op de stempel en de stuifmeelbuis
  if (stuif > 0.01) { ctx.save(); ctx.globalAlpha *= stuif; ctx.fillStyle = GEEL; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-22 + k * 9, -246 - (k % 2) * 4, 4, 0, 6.283); ctx.fill(); } ctx.restore(); }
  if (buis > 0.01) { const P = [[4, -244], [3, -150], [-2, 0], [-6, 60], [-14, 90], [-20, 96]]; const D = bioDicht(P, 12); const n = Math.max(2, Math.floor(D.length * buis));
    ctx.strokeStyle = GEEL; ctx.lineWidth = 4; ctx.beginPath(); D.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); const e = D[n - 1]; ctx.fillStyle = GEEL; ctx.beginPath(); ctx.arc(e[0], e[1], 4, 0, 6.283); ctx.fill(); }
  // bij (honingbij ± 12 mm; bloem ± 3–4 cm, dus de bij ± 1/3 van de bloembreedte): kop, borststuk met 6 poten en 2 paar vleugels, gestreept achterlijf; stuifmeel op de haren
  if (bij > 0.01) { const bx = lerp(340, 120, ease(bij)), by = lerp(-330, -268, ease(bij)) + Math.sin(t * 2) * 3;
    ctx.save(); ctx.globalAlpha *= Math.min(1, bij * 2); ctx.translate(bx, by); ctx.rotate(-0.25); ctx.scale(1.8, 1.8); const kl = 1.2;
    // zes poten aan het borststuk: drie aan de verre kant (gedempt, iets naar achteren) en drie aan de kijkkant
    ctx.save(); ctx.globalAlpha *= 0.55; ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const lx = -6 + i * 7; ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx + 4 + i * 3, 19 * kl); ctx.lineTo(lx + 8 + i * 5, 28 * kl); ctx.stroke(); } ctx.restore();
    ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { const lx = -8 + i * 8; ctx.beginPath(); ctx.moveTo(lx, 7); ctx.lineTo(lx - 7 + i * 3, 20 * kl); ctx.lineTo(lx - 13 + i * 6, 30 * kl); ctx.stroke(); }
    ctx.fillStyle = '#C9922E'; ctx.beginPath(); ctx.ellipse(32, 4, 26, 15, 0.15, 0, 6.283); ctx.fill(); ctx.fillStyle = '#3A2E24'; for (const sx of [24, 36, 48]) { ctx.beginPath(); ctx.ellipse(sx, 4, 4, 13, 0.15, 0, 6.283); ctx.fill(); } // achterlijf
    ctx.fillStyle = '#8C6A3A'; ctx.beginPath(); ctx.arc(0, 0, 13, 0, 6.283); ctx.fill(); // borststuk
    ctx.fillStyle = '#3A2E24'; ctx.beginPath(); ctx.ellipse(-18, 2, 9, 10, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-22, -6); ctx.quadraticCurveTo(-30, -18, -36, -16); ctx.stroke(); // kop + voelspriet
    ctx.fillStyle = '#1A1410'; ctx.beginPath(); ctx.ellipse(-20, 0, 4, 6, 0, 0, 6.283); ctx.fill(); // facetoog
    const fl = Math.sin(t * 60) * 0.25; ctx.fillStyle = rgba('#DDE6EE', 0.55); ctx.strokeStyle = rgba('#FFFFFF', 0.6); ctx.lineWidth = 1;
    ctx.save(); ctx.rotate(fl); ctx.beginPath(); ctx.ellipse(8, -20, 24, 9, -0.45, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(24, -11, 15, 6, -0.05, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.restore(); // twee paar vleugels: van opzij dekt het paar aan de kijkkant het verre paar af; voorvleugel groot, achtervleugel klein en verder naar achteren
    ctx.fillStyle = GEEL; ctx.beginPath(); ctx.arc(4, 16, 5, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(-6, 10, 2.5, 0, 6.283); ctx.fill(); // stuifmeel aan de haren
    ctx.restore(); }
  ctx.restore(); return anker;
}

// =====================================================================================
// HART IN DOORSNEDE (frontaal, vooraanzicht) — naast anHeart (lib_anatomie.js, buitenkant in het lichaam).
// Links op het plaatje = rechterharthelft (zuurstofarm, blauw); rechts = linkerharthelft (zuurstofrijk, rood).
// Recept: hart ± vuist (12 × 8,5 cm); punt (apex) wijst naar links-onder van de persoon = rechtsonder op het
// plaatje. Wand linkerkamer ± 3× zo dik als rechterkamer (pompt naar het hele lichaam); boezems dunwandig.
// Rechterkamer ligt vóór en loopt als sikkel om het tussenschot heen en omhoog naar de longslagader.
// Kleppen: tricuspidalis (R) en mitralis (L) tussen boezem en kamer, met peesdraden naar papilspieren;
// halvemaanvormige kleppen aan de basis van longslagader en aorta. Grote vaten: bovenste en onderste holle ader
// in de rechterboezem, aorta(boog met 3 takken) uit de linkerkamer achter de longslagader langs, longaders
// in de linkerboezem. Cyclus (o.u 0..1): 0–0,42 hartpauze (AV-kleppen open, kamers vullen), 0,42–0,58 boezems
// trekken samen, 0,58–0,93 kamers trekken samen (AV dicht; 0,63–0,88 halvemaankleppen open), dan ontspanning.
// Bron: OpenStax Biology 40.3; vorm naar referentieplaat (bron.md). Wand ± 3×: nog een tweede bron nodig. Bekende fouten: apex naar
// links op het plaatje; linkerkamerwand even dun als rechts; kamers tegelijk met boezems; aorta uit de rechterkamer.
// Inbouw 28 okt 2026 (Kamiel koos A): twee bevestigde fouten hersteld met de oplossing uit C: de onderste holle ader komt
// langs de buitenkant de rechterboezem in (niet meer als balk onder de rechterkamer), en de AV-kleppen zijn echte
// klepslippen met peesdraden aan de vrije rand. Verder A ongewijzigd.
// Ontwerp: hoogte ± 600 (y −300..300), breedte ± 530, oorsprong = midden van het hart. Aanpak A: anatomisch
// (naar referentieplaat), snijvlak van de spier licht, binnenkant met spierbalkjes, bloed als stroomdeeltjes.
// o: a, u (fase), t, stroom (0..1 bloeddeeltjes), hi ('RB','RK','LB','LK','kleppen', null), detail (1; <0,5 = minder)
// Geeft ankerpunten terug (wereldcoördinaten).
// =====================================================================================
function hartDoorsnedeFase(u) {
  u = ((u % 1) + 1) % 1;
  const atr = u >= 0.42 && u < 0.6 ? Math.sin((u - 0.42) / 0.18 * Math.PI) : 0;
  let ven = 0; if (u >= 0.58 && u < 0.95) { const v = (u - 0.58) / 0.37; ven = v < 0.22 ? ease(v / 0.22) : v < 0.72 ? 1 : 1 - ease((v - 0.72) / 0.28); }
  const av = u < 0.58 || u >= 0.93 ? 1 : (u < 0.6 ? 1 - (u - 0.58) / 0.02 : u > 0.91 ? (u - 0.91) / 0.02 : 0);
  const sl = u >= 0.63 && u < 0.88 ? Math.min(1, (u - 0.63) / 0.03, (0.88 - u) / 0.03) : 0;
  return { u, atr, ven, av: clamp(av, 0, 1), sl: clamp(sl, 0, 1) };
}
function hartDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, u = 0.2, t = 0, stroom = 0, hi = null, detail = 1 } = o;
  const f = hartDoorsnedeFase(u);
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { RB: W(-125, -45), RK: W(-110, 120), LB: W(118, -55), LK: W(115, 130), tussenschot: W(25, 120), aorta: W(110, -268),
    longslagader: W(150, -205), holleAderBoven: W(-140, -270), holleAderOnder: W(-262, 250), longaders: W(232, -70),
    klepR: W(-92, 30), klepL: W(98, 6), klepLong: W(-18, -100), klepAorta: W(35, -72), punt: W(95, 290) };
  if (a <= 0.01) return anker;
  const ARM = BIO.ader, RIJK = BIO.bloed, ARMd = '#3F5F8E', RIJKd = '#8E2E2A';
  const SPIER = '#9A4A46', SNIJ = '#D99A8E', SNIJd = '#C27F73', VET = '#E3C77A', KLEP = '#EDE3CF';
  const dimF = k => (hi && hi !== k && hi !== 'kleppen') ? 0.35 : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (pts, closed = true) => { ctx.beginPath(); bioPad(ctx, pts, closed); };
  const buis = (pts, w, col, al = 1) => { ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'butt'; ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = w * 0.25; ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0] - w * 0.18, p[1]]), false); ctx.stroke(); ctx.restore(); };
  const opening = (cx, cy, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = lighten(col, 0.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx, cy + 1, rx * 0.7, ry * 0.6, 0, 0, 6.283); ctx.fillStyle = col === ARM ? ARMd : RIJKd; ctx.fill(); };
  const schaal = (pts, k, c) => pts.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  // ---------- achterste vaten ----------
  buis([[30, -150], [-40, -175], [-120, -185], [-200, -178]], 34, ARM, dimF('RK'));                // rechter longslagader (achter aorta)
  buis([[-60, -110], [-150, -120], [-215, -118]], 24, RIJK, dimF('LB')); buis([[-60, -85], [-160, -80], [-215, -72]], 24, RIJK, dimF('LB')); // rechter longaders (achter)
  buis([[150, -80], [200, -96], [238, -100]], 24, RIJK, dimF('LB')); buis([[150, -45], [205, -46], [238, -40]], 24, RIJK, dimF('LB'));      // linker longaders
  opening(238, -100, 5, 12, RIJK); opening(238, -40, 5, 12, RIJK); opening(-215, -118, 5, 12, RIJK); opening(-215, -72, 5, 12, RIJK);
  buis([[175, -240], [195, -180], [198, -120]], 40, RIJK, dimF('LK') * 0.9);                       // dalende aorta (achter het hart)
  // ---------- hartspier (buitenkant) ----------
  const kV = 1 - 0.035 * f.ven, cHart = [20, 110];
  const kA = 1 - 0.16 * f.atr, kK = 1 - 0.28 * f.ven;
  const RB = schaal([[-188, -100], [-140, -130], [-80, -114], [-62, -55], [-70, 8], [-110, 24], [-170, 16], [-200, -38]], kA, [-130, -45]);
  const LB = schaal([[52, -95], [95, -124], [160, -118], [200, -80], [194, -20], [150, 2], [90, 2], [55, -30]], kA, [125, -58]);
  const RK = schaal([[-200, 52], [-130, 40], [-62, 44], [-38, -20], [-42, -92], [-2, -96], [4, -20], [8, 90], [-14, 172], [-70, 228], [-148, 200], [-200, 122]], kK, [-90, 120]);
  const LK = schaal([[30, -64], [50, -70], [60, 6], [98, 14], [160, 20], [188, 82], [180, 172], [136, 246], [104, 260], [78, 206], [48, 110], [30, 24]], kK, [118, 140]);
  // kamers: één spiermassa van de klepring tot de punt (wand links ± 3× zo dik als rechts)
  const KAMERS = schaal([[-200, 22], [-216, 105], [-176, 182], [-98, 244], [-5, 284], [95, 302], [162, 262], [216, 170], [236, 62], [226, 10], [170, -2], [62, -40], [22, -100], [-60, -110], [-62, 12], [-140, 30]], kV, cHart);
  const wandVul = (P) => { pad(P); ctx.fillStyle = SNIJ; ctx.fill(); ctx.strokeStyle = SPIER; ctx.lineWidth = 6; ctx.stroke(); };
  wandVul(KAMERS);
  if (detail > 0.5) { ctx.save(); pad(KAMERS); ctx.clip(); ctx.strokeStyle = rgba(SNIJd, 0.55); ctx.lineWidth = 1.2; // vezelrichting in het snijvlak
    for (let i = 0; i < 8; i++) { const k = 0.95 - i * 0.025; pad(schaal(KAMERS, k, [30, 140])); ctx.stroke(); } ctx.restore(); }
  // boezems: dunne wand rond de holte
  wandVul(schaal(RB, 1.12, [-130, -45])); wandVul(schaal(LB, 1.12, [125, -58]));
  if (detail > 0.5) { ctx.save(); ctx.globalAlpha *= 0.85; ctx.fillStyle = VET; // vet in de kransgroeve (tussen boezem en kamer)
    pad([[-214, 30], [-196, 12], [-168, 24], [-190, 42]]); ctx.fill(); pad([[204, 4], [230, 14], [228, 34], [206, 24]]); ctx.fill(); ctx.restore(); }
  const lumen = (P, col, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); pad(P); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rgba('#3A1A1A', 0.45); ctx.lineWidth = 2; ctx.stroke();
    if (detail > 0.5) { ctx.save(); pad(P); ctx.clip(); ctx.strokeStyle = rgba('#000000', 0.14); ctx.lineWidth = 3; // spierbalkjes langs de wand
      for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; const cx = P.reduce((s, v) => s + v[0], 0) / P.length, cy = P.reduce((s, v) => s + v[1], 0) / P.length;
        const d = Math.hypot(cx - mx, cy - my) || 1; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + (cx - mx) / d * 14 + (hash(i + col.length) - 0.5) * 8, my + (cy - my) / d * 14); ctx.stroke(); } ctx.restore(); }
    if (hi === key) { pad(P); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); };
  lumen(RB, ARM, 'RB'); lumen(LB, RIJK, 'LB'); lumen(RK, ARM, 'RK'); lumen(LK, RIJK, 'LK');
  // onderste holle ader: komt van onderen langs de buitenkant van de rechterkamer en mondt uit in de rechterboezem (inbouw 28 okt, uit C)
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-262, 300], [-258, 160], [-246, 60], [-218, 4], [-186, -6]], 40, ARM);
  ctx.beginPath(); ctx.ellipse(-182, -8, 9, 18, -0.3, 0, 6.283); ctx.fillStyle = ARM; ctx.fill(); ctx.restore();
  // papilspieren (uitsteeksels van de kamerwand)
  const papil = (bx, by, hgt, wdt, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.beginPath(); ctx.moveTo(bx - wdt * 1.3, by + 6); ctx.bezierCurveTo(bx - wdt, by - hgt * 0.5, bx - wdt * 0.8, by - hgt, bx, by - hgt); ctx.bezierCurveTo(bx + wdt * 0.8, by - hgt, bx + wdt, by - hgt * 0.5, bx + wdt * 1.3, by + 6); ctx.closePath(); ctx.fillStyle = SNIJd; ctx.fill(); ctx.restore(); return [bx, by - hgt]; };
  const pR1 = papil(-150, 178 - 20 * f.ven, 46, 15, 'RK'), pR2 = papil(-60, 190 - 25 * f.ven, 40, 13, 'RK');
  const pL1 = papil(92, 230 - 30 * f.ven, 58, 17, 'LK'), pL2 = papil(156, 200 - 26 * f.ven, 56, 17, 'LK');
  // ---------- kleppen ----------
  const klepKl = hi === 'kleppen' ? C.goud : KLEP;
  const avKlep = (x1, x2, yy, open, pa, pb, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); const half = (x2 - x1) / 2, L = half * 1.08;
    const ang = lerp(0.18, 1.3, open); // dicht: slippen bijna horizontaal (raken elkaar in het midden), open: hangen langs de wand
    const tips = []; for (const sd of [-1, 1]) { const hx = sd < 0 ? x1 : x2; const ex = hx - sd * Math.cos(ang) * L, ey = yy + Math.sin(ang) * L; tips.push([ex, ey]);
      const nx = -Math.sin(ang) * sd, ny = -Math.cos(ang); // normaal op de slip
      ctx.beginPath(); ctx.moveTo(hx, yy - 7); ctx.quadraticCurveTo((hx + ex) / 2 + nx * 9, (yy + ey) / 2 + ny * 9 - 4, ex, ey); // bovenkant (bol)
      ctx.quadraticCurveTo((hx + ex) / 2 - nx * 3, (yy + ey) / 2 - ny * 3 + 6, hx + -sd * 1, yy + 7); ctx.closePath();
      ctx.fillStyle = klepKl; ctx.fill(); ctx.strokeStyle = '#B8AC92'; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (detail > 0.3) { ctx.strokeStyle = rgba(KLEP, 0.85); ctx.lineWidth = 1.4; for (const [tp, pp, sd] of [[tips[0], pa, -1], [tips[1], pb, 1]]) for (let k = 0; k < 3; k++) { const f0 = 0.55 + k * 0.22; const hx = sd < 0 ? x1 : x2;
        const ax = lerp(hx, tp[0], f0), ay = lerp(yy, tp[1], f0); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(pp[0] + (k - 1) * 5, pp[1] + 2); ctx.stroke(); } }
    ctx.restore(); };
  avKlep(-134, -50, 28, f.av, pR1, pR2, 'RK'); avKlep(56, 146, 8, f.av, pL1, pL2, 'LK');
  // ---------- voorste vaten: aorta (stijgt achter de longslagader), longslagader, bovenste holle ader ----------
  const slKlep = (cx, cy, w, open, col) => { ctx.save(); ctx.fillStyle = klepKl; for (const sd of [-1, 1]) { const tip = lerp(cx + sd * 3, cx + sd * (w - 4), open);
      ctx.beginPath(); ctx.moveTo(cx + sd * w, cy + 4); ctx.quadraticCurveTo(cx + sd * w * 0.5, cy + 10 - 6 * open, tip, cy - 14 - 6 * open); ctx.lineTo(cx + sd * w, cy - 6); ctx.closePath(); ctx.fill(); } ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= dimF('LK');
  buis([[35, -70], [32, -150], [45, -230], [90, -272], [150, -268], [178, -240]], 40, RIJK);
  for (const [bx, tx] of [[75, 62], [112, 108], [148, 158]]) buis([[bx, -270], [tx, -300]], 15, RIJK);
  slKlep(35, -76, 18, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RK');
  buis([[-20, -95], [-12, -150], [20, -185], [90, -200], [160, -205], [210, -198]], 36, ARM);
  slKlep(-20, -100, 16, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-140, -115], [-140, -200], [-138, -300]], 40, ARM); opening(-138, -300, 19, 6, ARM); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('LK'); for (const tx of [62, 108, 158]) opening(tx + (tx === 62 ? -1 : tx === 158 ? 3 : 0), -300, 7, 3, RIJK); ctx.restore();
  opening(210, -198, 6, 17, ARM);
  // ---------- bloedstroom ----------
  if (stroom > 0.01) { const r = 5; const vul = f.av * (1 - f.ven), uit = f.sl;
    ctx.save(); ctx.globalAlpha *= stroom;
    const dl = (path, col, on, sp, n, sd) => { if (on > 0.02) particleFlow(ctx, path, n, t, sp, lighten(col, 0.45), r, sd, on); };
    dl([[-140, -290], [-140, -100], [-110, -20], [-95, 90]], ARM, vul, 120, 6, 1); dl([[-262, 290], [-246, 60], [-186, -6], [-110, 0], [-90, 100]], ARM, vul, 120, 6, 7);
    dl([[230, -70], [140, -60], [100, 20], [110, 150]], RIJK, vul, 120, 6, 13);
    dl([[-100, 150], [-20, 40], [-20, -100], [20, -185], [200, -200]], ARM, uit, 380, 9, 19);
    dl([[110, 200], [45, 40], [35, -70], [40, -220], [100, -270], [175, -235]], RIJK, uit, 420, 10, 29);
    ctx.restore(); }
  ctx.restore(); return anker;
}

// =====================================================================================
// LONGBLAASJES — trosje aan het eind van een bronchiool, met haarvatennet eroverheen.
// Recept: longblaasje ± 200 µm doorsnede; in een trosje (alveolaire zak) zitten veel blaasjes rond een gangetje.
// Haarvaten ± 8 µm breed: rode bloedcellen (7–8 µm) gaan er één voor één doorheen. Wand blaasje + haarvat
// samen ± 0,5 µm (te dun om te tekenen; vandaar: haarvaten liggen er plat óp). Het net krijgt zuurstofarm bloed
// (blauw) van een takje longslagader en geeft zuurstofrijk bloed (rood) af aan een takje longader.
// O2 gaat van de lucht in het blaasje naar het bloed, CO2 andersom (diffusie). Op schaal in dit ontwerp:
// blaasje Ø 140 eenheden = 200 µm → rode bloedcel ± 5 eenheden.
// Bron: LibreTexts Human Anatomy Lab 19.6 (Ø ± 200 µm, type I-cellen).
// Bekende fouten: blaasjes als losse ballonnen zonder gangetje; haarvaten dikker dan het blaasje; rode bloedcel
// even groot als een blaasje; O2 en CO2 dezelfde kant op.
// Ontwerp: hoogte ± 600, oorsprong = midden van het trosje. Aanpak A: trosje met net, bloedcellen stromen door.
// o: a, t, adem (0 uit … 1 in; blaasjes iets groter), gas (0..1 O2/CO2-deeltjes), net (1 = haarvaten), hi ('net','blaasje')
// =====================================================================================
function longblaasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, adem = 0.5, gas = 0, net = 1, hi = null } = o;
  const k = 0.94 + 0.08 * adem;
  const BL = [[-40, -150, 70], [55, -145, 66], [-120, -60, 72], [130, -55, 70], [-30, -40, 74], [70, 30, 72], [-115, 70, 68], [-15, 105, 72], [110, 125, 66], [10, 205, 66], [-95, 175, 62]];
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { bronchiool: W(-200, -250), blaasje: W(-30, -40), haarvaten: W(70, 30), longslagader: W(-250, 100), longader: W(240, 120) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WAND = '#D79A93', WANDl = '#EDC3BC', WANDd = '#B57872', ARM = BIO.ader, RIJK = BIO.bloed;
  const mix = (u) => { const A = [0x5B, 0x7F, 0xB0], B = [0xC2, 0x45, 0x3E]; u = clamp(u, 0, 1); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], u))).join(',')})`; };
  // bronchiool + gangetje (achter de blaasjes)
  ctx.strokeStyle = WANDd; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(-250, -300); ctx.quadraticCurveTo(-130, -200, -30, -90); ctx.lineTo(10, 120); ctx.stroke();
  ctx.strokeStyle = WAND; ctx.lineWidth = 40; ctx.stroke();
  // longslagader-takje (blauw) en longader-takje (rood)
  const vat = (pts, w, col) => { ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  vat([[-300, 120], [-200, 60], [-150, -10], [-90, -110]], 16, ARM);
  vat([[150, -120], [190, 20], [210, 120], [300, 150]], 18, RIJK);
  // blaasjes
  const blaas = BL.map(([bx, by, r]) => [bx, by, r * k]);
  for (let i = 0; i < blaas.length; i++) { const [bx, by, r] = blaas[i];
    ctx.save(); ctx.globalAlpha *= (hi && hi !== 'blaasje' && hi !== 'net') ? 0.35 : 1;
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fillStyle = WAND; ctx.fill(); ctx.strokeStyle = (hi === 'blaasje' && i === 4) ? C.goud : WANDl; ctx.lineWidth = (hi === 'blaasje' && i === 4) ? 4 : 1.5; ctx.stroke();
    // lichte koepel (vlak, geen verloop): kleinere lichtere schijf linksboven
    ctx.beginPath(); ctx.arc(bx - r * 0.22, by - r * 0.24, r * 0.55, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.fill();
    // haarvatennet over het blaasje
    if (net > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(bx, by, r - 1, 0, 6.283); ctx.clip(); ctx.globalAlpha *= net;
      const N = 7; const pts = []; for (let j = 0; j < N * N; j++) { const gx = (j % N) / (N - 1) - 0.5, gy = Math.floor(j / N) / (N - 1) - 0.5; pts.push([bx + gx * r * 2.2 + (hash(i * 50 + j) - 0.5) * r * 0.25, by + gy * r * 2.2 + (hash(i * 50 + j + 7) - 0.5) * r * 0.25]); }
      ctx.lineWidth = 4.5; for (let j = 0; j < N * N; j++) { const p = pts[j]; for (const d of [1, N]) { if (d === 1 && j % N === N - 1) continue; const q = pts[j + d]; if (!q) continue;
        const u = ((p[0] + q[0]) / 2 + 300) / 600; ctx.strokeStyle = hi === 'net' ? C.goud : mix(u); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo((p[0] + q[0]) / 2 + (hash(j + d) - 0.5) * 8, (p[1] + q[1]) / 2 + (hash(j * 3 + d) - 0.5) * 8, q[0], q[1]); ctx.stroke(); } }
      // rode bloedcellen (op schaal, ± 5 eenheden) die één voor één door het net schuiven
      for (let j = 0; j < 10; j++) { const r0 = Math.floor(hash(i * 13 + j) * N); const u = ((t * 0.18 + hash(i * 7 + j)) % 1); const fx = u * (N - 1); const c0 = Math.floor(fx);
        const p = pts[r0 * N + c0], q = pts[r0 * N + Math.min(N - 1, c0 + 1)]; const px = lerp(p[0], q[0], fx - c0), py = lerp(p[1], q[1], fx - c0);
        ctx.fillStyle = lighten(mix((px + 300) / 600), 0.15); ctx.beginPath(); ctx.ellipse(px, py, 3.2, 2.3, 0, 0, 6.283); ctx.fill(); }
      ctx.restore(); }
    ctx.restore(); }
  // gaswisseling: O2 (teal) gaat het bloed in, CO2 (grijs) komt eruit
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; for (let j = 0; j < 22; j++) { const b = blaas[j % blaas.length]; const u = (t * 0.35 + hash(j * 3.1)) % 1; const ang = hash(j * 5.7) * 6.283;
      const o2 = j % 3 !== 0; const r0 = b[2] * (o2 ? lerp(0.15, 0.85, u) : lerp(0.85, 0.15, u)); const px = b[0] + Math.cos(ang) * r0, py = b[1] + Math.sin(ang) * r0;
      if (o2) { ctx.fillStyle = C.teal; ctx.strokeStyle = lighten(C.teal, 0.35); ctx.lineWidth = 1; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 3.4, py, 3.6, 0, 6.283); ctx.fill(); ctx.stroke(); } }
      else { ctx.fillStyle = '#AEB6C2'; ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 6.4, py, 3, 0, 6.283); ctx.fill(); } } }
    ctx.restore(); }
  ctx.restore(); return anker;
}

// =====================================================================================
// NEFRON — schema met de plaats in de nier (lengtedoorsnede, schors boven).
// Recept: glomerulus in het kapsel van Bowman (schors); aanvoerend vaatje wijder dan afvoerend; kronkelend eerste
// deel (proximaal: hier gaat het meeste terug: alle glucose, veel zout en water), lis van Henle diep in het merg,
// kronkelend tweede deel (distaal) dat terugkomt bij de vaatpool van zijn eigen glomerulus, verzamelbuis (vangt
// meerdere nefronen op; hier wordt onder invloed van ADH nog water teruggewonnen). De haarvaten rond het buisje
// komen uit het afvoerende vaatje en nemen terug wat het buisje teruggeeft.
// Bron: OpenStax A&P 25.4 (Oregon State-versie 25.2); OpenStax Biology 41.2.
// Bekende fouten: lis in de schors; terugresorptie naar 'buiten' in plaats van naar het bloed; geen plaats in de nier.
// Ontwerp: hoogte ± 600, oorsprong = midden. Aanpak C (ronde 2, uit B): rustig Schema met échte kronkels in het
// eerste en tweede deel en zijtakken (buisjes van andere nefronen) aan de verzamelbuis; één bloedvat dat het buisje volgt
// (geen zigzag-haarvaten); filtratie als deeltjes (water teal, glucose oker, ureum grijs) van de kluwen naar het kapsel,
// open pijlen voor terugresorptie (buisje → bloed) en water uit de verzamelbuis naar een meelopend vat (ADH);
// kleine nier (nierBijnier) met een gouden kader waar het nefron ligt.
// Inbouw 28 okt 2026 (Kamiel koos C): het tweede kronkelende deel kronkelt nu echt (bij de lis én vlak bij de eigen glomerulus,
// daarna het verbindingsstukje naar de verzamelbuis; derangedphysiology 'Distal tubule and collecting duct' + Digital
// Histology 'Cortex: convoluted portion' + OpenStax A&P 25.4). Het niertje plakte aan de verzamelbuis en leek een deel van
// het nefron: het is nu een los oriëntatie-icoontje (kaartje linksonder) met het gouden kadertje van schors tot in een
// piramide; o.nier = 0 laat het weg.
// o: a, t, filtratie (0..1), terug (0..1), water (0..1 water uit verzamelbuis, ADH), nier (1 = plaats in de nier), hi
// =====================================================================================
function nefron(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, filtratie = 0, terug = 0, water = 0, nier = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const GX = -190, GY = -200, GR = 42;
  const PROX = [[GX + 26, GY + 32], [-132, -182], [-112, -210], [-80, -210], [-66, -182], [-98, -160], [-112, -128], [-80, -108], [-48, -122], [-34, -94], [-40, -60], [-40, -30]];
  const LIS = [[-40, -30], [-40, 240], [-10, 272], [20, 240], [20, -40]];
  const DIST = [[20, -40], [38, -70], [10, -94], [40, -120], [10, -146], [38, -174], [-20, -206], [-84, -238], [-142, -254], [-112, -282], [-62, -266], [-28, -290], [14, -270], [60, -284], [100, -244], [138, -206], [170, -186]];
  const VB = [[170, -290], [170, 290]]; const ZT = [[[170, -60], [206, -88], [252, -96]], [[170, 80], [212, 58], [252, 52]]];
  const anker = { glomerulus: W(GX, GY), proximaal: W(-95, -150), lis: W(-10, 260), distaal: W(30, -120), verzamelbuis: W(170, 150), haarvaten: W(-80, 60), nier: W(-205, 205) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const BUIS = '#E6D59C', BUISr = '#B8A66A', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.35 : 1;
  // zones (rustig): schors/merg-grens als stippellijn
  ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 1.5; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-290, -30); ctx.lineTo(250, -30); ctx.stroke(); ctx.setLineDash([]);
  const lijn = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  // bloed: aanvoerend vaatje → glomerulus → afvoerend vaatje → haarvat langs het buisje (rood → blauw)
  const BLOED = [[-168, -244], [-235, -205], [-240, -120], [-160, -86], [-72, -70], [-70, -40], [-70, 280], [-10, 300], [50, 280], [50, -40], [80, -120], [110, -140], [250, -140]];
  const BD = bioDicht(BLOED, 14);
  for (let i = 0; i < BD.length - 1; i++) { const u = i / BD.length; const A = [0xC2, 0x45, 0x3E], B = [0x5B, 0x7F, 0xB0]; ctx.strokeStyle = `rgb(${A.map((v, j) => Math.round(lerp(v, B[j], clamp((u - 0.15) * 1.6, 0, 1)))).join(',')})`;
    ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(BD[i][0], BD[i][1]); ctx.lineTo(BD[i + 1][0], BD[i + 1][1]); ctx.stroke(); }
  lijn([[-290, -250], [-230, -244], [-200, -236]], 15, RIJK);
  // kapsel + glomerulus
  ctx.save(); ctx.globalAlpha *= dimF('glomerulus'); ctx.beginPath(); ctx.arc(GX, GY, GR + 9, 0, 6.283); ctx.fillStyle = BUIS; ctx.fill(); ctx.strokeStyle = hi === 'glomerulus' ? C.goud : BUISr; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(GX, GY, GR, 0, 6.283); ctx.fillStyle = '#F6EDCC'; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(GX, GY, GR - 4, 0, 6.283); ctx.clip(); for (let i = 0; i < 12; i++) { const an = hash(i * 2.3) * 6.283, rr = 6 + hash(i * 4.1) * 18; ctx.strokeStyle = i % 3 ? RIJK : lighten(RIJK, 0.2); ctx.lineWidth = 5.5; ctx.beginPath(); ctx.arc(GX + Math.cos(an) * rr, GY + Math.sin(an) * rr, 8 + hash(i) * 7, an, an + 3.6); ctx.stroke(); } ctx.restore();
  ctx.restore();
  // buisje
  for (const [key, P] of [['proximaal', PROX], ['lis', LIS], ['distaal', DIST]]) { ctx.save(); ctx.globalAlpha *= dimF(key); lijn(P, 22, hi === key ? C.goud : BUISr); lijn(P, 18, BUIS); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimF('verzamelbuis'); lijn(VB, 26, hi === 'verzamelbuis' ? C.goud : BUISr); lijn(VB, 22, BUIS); for (const Z of ZT) { lijn(Z, 18, BUISr); lijn(Z, 14, BUIS); } ctx.restore(); // zijtakken: buisjes van andere nefronen
  lijn([[226, -20], [228, 300]], 6, ARM); // vat langs de verzamelbuis (vasa recta)
  // open pijlen
  const pijl = (x1, y1, x2, y2, col, al) => { if (al <= 0.02) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2 - Math.cos(an - 0.5) * 11, y2 - Math.sin(an - 0.5) * 11); ctx.lineTo(x2, y2); ctx.lineTo(x2 - Math.cos(an + 0.5) * 11, y2 - Math.sin(an + 0.5) * 11); ctx.stroke(); ctx.restore(); };
  const puls = (k) => 0.55 + 0.45 * Math.sin(t * 3 + k);
  if (filtratie > 0.01) { ctx.save(); ctx.globalAlpha *= filtratie; for (let j = 0; j < 12; j++) { const u = (t * 0.5 + hash(j * 1.9)) % 1; const an = hash(j * 3.7) * 6.283; const r0 = lerp(GR * 0.45, GR + 1, u); const px = GX + Math.cos(an) * r0, py = GY + Math.sin(an) * r0;
    ctx.globalAlpha = a * filtratie * Math.min(1, (1 - u) * 4); if (j % 4 === 0) { ctx.fillStyle = C.oker; ctx.beginPath(); for (let k = 0; k < 6; k++) ctx.lineTo(px + Math.cos(k * 1.047) * 4.5, py + Math.sin(k * 1.047) * 4.5); ctx.closePath(); ctx.fill(); } else { ctx.fillStyle = j % 4 === 1 ? '#B8BEC8' : C.teal; ctx.beginPath(); ctx.arc(px, py, 3.4, 0, 6.283); ctx.fill(); } } ctx.restore(); }
  for (const [px, py, qx, qy, k] of [[-112, -120, -122, -92, 0], [-80, -100, -84, -78, 1], [-48, -10, -64, -10, 2], [-48, 80, -64, 80, 3]]) pijl(px, py, qx, qy, C.oker, terug * puls(k));
  for (const [py, k] of [[60, 0], [160, 1], [240, 2]]) pijl(184, py, 220, py, C.teal, water * puls(k));
  // plaats in de nier
  // los oriëntatie-icoontje linksonder (niet aan het nefron vast): kaartje met een kleine nier; het gouden kadertje loopt
  // van de schors (buitenrand) een piramide in en geeft aan waar één nefron ligt
  if (nier > 0.01 && typeof nierBijnier === 'function') { const IX = -205, IY = 205, IS = 0.36; ctx.save(); ctx.globalAlpha *= nier;
    roundRect(ctx, IX - 70, IY - 92, 140, 172, 14); ctx.fillStyle = rgba(C.line, 0.10); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 1.5; ctx.stroke();
    nierBijnier(ctx, IX, IY + 4, IS, { t });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.strokeRect(IX - 70 * IS, IY + 4 - 30 * IS, 44 * IS, 18 * IS); // buitenrand (schors) → piramide
    ctx.restore(); }
  ctx.restore(); return anker;
}

// =====================================================================================
// STAMBOOM met standaardsymbolen én castpersonages — elk symbool is een lijstje met het gezicht van het personage.
// Recept (standaardnotatie, Bennett e.a. 2008/2022): vierkant = man, cirkel = vrouw; gevuld = heeft de eigenschap;
// drager = stip (hier: kleine paarse stip rechtsonder in de lijst, zodat het gezicht vrij blijft); partners met een
// horizontale lijn, kinderen via de broer-zuslijn, van oud naar jong links → rechts; generaties op één hoogte.
// Cast-koppeling: gebruik de familie van Noor (personages/ROLLEN.md). Het gezicht staat ín de vorm; 'gevuld' = de
// achtergrond van de lijst is paars én de rand is dik, zodat de notatie leesbaar blijft (ook klein, zonder gezicht).
// Bron: Bennett e.a. 2008/2022 (samenvatting Switzerland Omics); personages/ROLLEN.md.
// Bekende fouten: gezicht zonder vorm (man/vrouw niet meer te zien); gevulde vorm die het gezicht wegdrukt.
// Ontwerp: hoogte ± 600 (generaties y −200, 0, 200), oorsprong = midden. Aanpak B: portretlijstjes (persoon() uit
// lib_cast.js, geknipt in de vorm); onder 40 px valt het gezicht weg en blijft het gewone symbool over.
// o: a, opbouw (0..1), hi (nr), proband (nr), t, personen (zelfde data als A: {nr, id, sekse, ziek, drager, x, gen, ouders})
// =====================================================================================
const STAMBOOM_NOOR = [
  { nr: 1, id: 'ahmed', sekse: 'm', x: -290, gen: 1 }, { nr: 2, id: 'malika', sekse: 'v', x: -170, gen: 1 },
  { nr: 3, id: 'henk', sekse: 'm', x: 150, gen: 1, ziek: 1 }, { nr: 4, id: 'ria', sekse: 'v', x: 270, gen: 1, drager: 1 },
  { nr: 5, id: 'rachid', sekse: 'm', x: -120, gen: 2, ouders: [1, 2], drager: 1 }, { nr: 6, id: 'linda', sekse: 'v', x: 80, gen: 2, ouders: [3, 4], drager: 1 },
  { nr: 7, id: 'petra', sekse: 'v', x: 270, gen: 2, ouders: [3, 4], ziek: 1 },
  { nr: 8, id: 'noor', sekse: 'v', x: -100, gen: 3, ouders: [5, 6] }, { nr: 9, id: 'kind', sekse: 'm', x: 60, gen: 3, ouders: [5, 6], ziek: 1 }];
function stamboomSymbolen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, opbouw = 1, hi = null, proband = null, t = 0, personen = STAMBOOM_NOOR } = o;
  const R = 40, GY = g => -200 + (g - 1) * 200;
  const P = {}; personen.forEach(p => P[p.nr] = p);
  const anker = {}; personen.forEach(p => anker[p.nr] = [x + p.x * s, y + GY(p.gen) * s]); anker.naam = nr => [x + P[nr].x * s, y + (GY(P[nr].gen) + R + 30) * s];
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const zicht = g => clamp((opbouw * 3 - (g - 1)) / 0.6, 0, 1);
  const VUL = C.paars, gezicht = R * s * (ctx.getTransform ? Math.abs(ctx.getTransform().a) / Math.max(1e-6, s) : 1) >= 20; // klein → alleen symbool
  const dimP = nr => (hi != null && hi !== nr) ? 0.4 : 1;
  const paren = {}; personen.forEach(p => { if (p.ouders) paren[p.ouders.join('-')] = (paren[p.ouders.join('-')] || []).concat(p); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 3.5;
  for (const k in paren) { const [m, v] = k.split('-').map(Number); const A = P[m], B = P[v]; const kids = paren[k].sort((p, q) => p.x - q.x); const yP = GY(A.gen), mx = (A.x + B.x) / 2, yS = GY(A.gen + 1) - R - 30;
    const zp = zicht(A.gen), zk = ease(zicht(A.gen + 1));
    ctx.save(); ctx.globalAlpha *= zp; ctx.beginPath(); ctx.moveTo(Math.min(A.x, B.x) + R, yP); ctx.lineTo(Math.max(A.x, B.x) - R, yP); ctx.stroke(); ctx.restore();
    if (zk > 0.01) { ctx.save(); ctx.globalAlpha *= zk; ctx.beginPath(); ctx.moveTo(mx, yP); ctx.lineTo(mx, yS); ctx.moveTo(Math.min(mx, kids[0].x), yS); ctx.lineTo(Math.max(mx, kids[kids.length - 1].x), yS); kids.forEach(c => { ctx.moveTo(c.x, yS); ctx.lineTo(c.x, GY(c.gen) - R); }); ctx.stroke(); ctx.restore(); } }
  personen.forEach(p => { const z = zicht(p.gen); if (z <= 0.01) return; const cx = p.x, cy = GY(p.gen) + (1 - ease(z)) * 20; ctx.save(); ctx.globalAlpha *= z * dimP(p.nr);
    const vorm = () => { ctx.beginPath(); if (p.sekse === 'm') { ctx.roundRect ? ctx.roundRect(cx - R, cy - R, 2 * R, 2 * R, 4) : ctx.rect(cx - R, cy - R, 2 * R, 2 * R); } else ctx.arc(cx, cy, R, 0, 6.283); };
    vorm(); ctx.fillStyle = p.ziek ? VUL : '#243450'; ctx.fill();
    if (gezicht && p.id && typeof persoon === 'function' && CAST[p.id]) { ctx.save(); vorm(); ctx.clip(); const h = (p.id === 'kind' ? 190 : 270); persoon(ctx, p.id, cx, cy + h * (p.id === 'kind' ? 0.8 : 0.83), h, { t, uit: 'blij' }); ctx.restore(); }
    vorm(); ctx.strokeStyle = p.ziek ? lighten(VUL, 0.4) : C.text; ctx.lineWidth = p.ziek ? 7 : 3; ctx.stroke();
    if (p.drager && !p.ziek) { ctx.beginPath(); ctx.arc(cx + R * 0.68, cy + R * 0.68, R * 0.24, 0, 6.283); ctx.fillStyle = VUL; ctx.fill(); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.stroke(); }
    if (hi === p.nr) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, R * 1.55, 0, 6.283); ctx.stroke(); }
    if (proband === p.nr) { ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(cx - R * 2.3, cy + R * 1.8); ctx.lineTo(cx - R * 1.15, cy + R * 0.85); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - R * 1.0, cy + R * 0.72); ctx.lineTo(cx - R * 1.5, cy + R * 0.9); ctx.lineTo(cx - R * 1.25, cy + R * 1.3); ctx.closePath(); ctx.fill(); }
    ctx.restore(); });
  ctx.restore(); return anker;
}

// =====================================================================================
// SYNAPS (chemisch) — synapsknop met blaasjes boven, synapsspleet, volgend neuron onder.
// Recept: synapsspleet 20–40 nm (Kandel); blaasjes ± 40 nm, vol neurotransmitter, bij de actieve zone; mitochondriën
// in de knop. Volgorde (o.fase 0..1): impuls komt aan (0,05–0,2) → Ca2+-kanalen gaan open, Ca2+ stroomt de knop in
// (0,15–0,35) → blaasjes versmelten met het membraan (exocytose: aanleggen, opengaan, blaasje wordt membraan; 0,28–0,5)
// → neurotransmitter diffundeert over de spleet (0,4–0,65) → bindt aan receptoren (ligand-afhankelijke ionkanalen)
// in het membraan van het volgende neuron, Na+ stroomt in (0,58–0,8) → heropname door transporters in de knop
// (0,7–1). o.ssri = de transporter is geblokkeerd: neurotransmitter blijft langer in de spleet.
// Bron: OpenStax Biology 35.2 (Ca2+, exocytose, ligand-gated receptoren, heropname/afbraak/diffusie); BioNumbers
// 100721 (spleet 20–40 nm, Kandel 2000). Bekende fouten: blaasjes die verdwijnen in plaats van versmelten;
// receptoren op de knop; spleet zo breed als de knop; impuls die over de spleet 'springt'.
// Ontwerp: hoogte ± 600 (knop y −300..−10, spleet, volgend neuron y 20..300), oorsprong = midden van de spleet.
// Aanpak A: één synaps groot in Micro-stijl, alle stappen als fasen van één tijdlijn. Vergroot, niet op schaal.
// o: a, fase (0..1), t (rustige beweging), ssri (0..1), hi ('blaasje','receptor','transporter','spleet')
// =====================================================================================
function synapsEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, fase = 0, t = 0, ssri = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { knop: W(-170, -170), blaasje: W(-60, -120), spleet: W(200, 4), receptor: W(-40, 30), transporter: W(130, -16), mitochondrium: W(90, -210), volgend: W(-160, 180), ca: W(-150, -40) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const seg = (u0, u1) => clamp((fase - u0) / (u1 - u0), 0, 1);
  const imp = seg(0.05, 0.2), ca = seg(0.15, 0.35), fus = seg(0.28, 0.5), dif = seg(0.4, 0.65), bind = seg(0.58, 0.8), her = seg(0.7, 1) * (1 - 0.85 * ssri);
  const CYT = '#2A3550', MEM = C.er, NT = C.goud;
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  // ---------- knop (gebogen membraan; onderkant iets afgeplat tegen de spleet) ----------
  const KNOP = [[-62, -300], [-80, -258], [-200, -215], [-262, -120], [-240, -50], [-180, -16], [-60, -8], [60, -8], [180, -16], [240, -50], [262, -120], [200, -215], [80, -258], [62, -300]];
  ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.lineTo(62, -300); ctx.closePath(); ctx.fillStyle = CYT; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-240 + hash(i) * 480, -290 + hash(i + 50) * 270, 1.5, 0, 6.283); ctx.fill(); }
  // impuls: gouden gloed die door het axon de knop in loopt
  if (imp > 0.01 && imp < 1) { ctx.fillStyle = rgba(C.goud, 0.25 * Math.sin(imp * 3.14)); ctx.beginPath(); ctx.ellipse(0, lerp(-320, -80, imp), 200, 70, 0, 0, 6.283); ctx.fill(); }
  mitochondrion(ctx, 130, -165, 90, 0.5, 0.95, 5, t); mitochondrion(ctx, -160, -150, 70, -0.6, 0.95, 4, t);
  ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.stroke();
  ctx.strokeStyle = rgba(MEM, 0.5); ctx.lineWidth = 1.5; ctx.save(); ctx.translate(0, -5); ctx.scale(0.97, 0.98); ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.stroke(); ctx.restore(); // dubbellaag
  // ---------- volgend neuron (dendriet), membraan zacht gebogen ----------
  const POST = []; for (let i = 0; i <= 12; i++) { const xx = -300 + i * 50; POST.push([xx, 22 + (xx / 300) ** 2 * 30]); }
  ctx.beginPath(); bioPad(ctx, POST, false); ctx.lineTo(300, 170); ctx.quadraticCurveTo(0, 330, -300, 170); ctx.closePath(); ctx.fillStyle = '#2E3A4E'; ctx.fill();
  ctx.save(); ctx.clip(); if (bind > 0.01) { ctx.fillStyle = rgba(C.teal, 0.18 * bind * (1 - seg(0.85, 1))); ctx.beginPath(); ctx.ellipse(0, 70, 260 * bind, 60, 0, 0, 6.283); ctx.fill(); } ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, POST, false); ctx.stroke();
  // ---------- receptoren (ionkanalen) loodrecht in het membraan ----------
  const RX = [-150, -90, -30, 30, 90, 150]; const postY = xx => 22 + (xx / 300) ** 2 * 30;
  ctx.save(); ctx.globalAlpha *= dimF('receptor');
  RX.forEach((rx, i) => { const ry = postY(rx); const bezet = bind * (i % 2 === 0 || bind > 0.6 ? 1 : 0); const open = bezet * (1 - seg(0.85, 1) * (1 - ssri));
    ctx.fillStyle = hi === 'receptor' ? C.goud : '#7FA6A0'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(rx + sd * (7 + 4 * open), ry + 4, 6.5, 17, 0, 0, 6.283); ctx.fill(); }
    if (bezet > 0.5) { ctx.fillStyle = NT; ctx.beginPath(); ctx.arc(rx, ry - 14, 5, 0, 6.283); ctx.fill(); }
    if (open > 0.3) { ctx.fillStyle = C.teal; for (let k = 0; k < 2; k++) { const v = (t * 1.2 + k * 0.5 + i * 0.13) % 1; ctx.beginPath(); ctx.arc(rx, ry - 10 + v * 50, 3.5, 0, 6.283); ctx.fill(); } } });
  ctx.restore();
  // ---------- Ca2+-kanalen + heropname-transporters in het membraan van de knop ----------
  const kanaal = (kx, open, col) => { ctx.fillStyle = col; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(kx + sd * (6 + 3 * open), -10, 6, 15, 0, 0, 6.283); ctx.fill(); } };
  kanaal(-200, ca * (1 - seg(0.4, 0.55)), '#9AA3B2'); kanaal(200, ca * (1 - seg(0.4, 0.55)), '#9AA3B2');
  if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, ca * 3) * (1 - seg(0.5, 0.7)); ctx.fillStyle = '#D8DDE6'; for (let k = 0; k < 10; k++) { const sd = k % 2 ? 1 : -1; const v = (ca * 1.4 + hash(k)) % 1;
      ctx.beginPath(); ctx.arc(sd * 200 + (hash(k + 4) - 0.5) * 30 - sd * v * 60, 20 - v * 90, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimF('transporter');
  for (const tx of [-130, 130]) { ctx.fillStyle = hi === 'transporter' ? C.goud : '#B79BCB'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx - 12, -26, 24, 30, 8) : ctx.rect(tx - 12, -26, 24, 30); ctx.fill();
    if (ssri > 0.01) { ctx.save(); ctx.globalAlpha *= ssri; ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.moveTo(tx - 10, 14); ctx.lineTo(tx + 10, 14); ctx.lineTo(tx, 2); ctx.closePath(); ctx.fill(); ctx.restore(); } }
  ctx.restore();
  // ---------- blaasjes: stil → naar de actieve zone → versmelten ----------
  ctx.save(); ctx.globalAlpha *= dimF('blaasje');
  const BL = [[-80, -60], [-20, -50], [40, -58], [100, -66], [-120, -110], [-50, -120], [20, -112], [80, -130], [-10, -175], [60, -190], [-90, -200]];
  BL.forEach(([bx, by], i) => { const vrij = i < 4; const r = 15; let px = bx + Math.sin(t * 0.7 + i) * 2, py = by + Math.cos(t * 0.6 + i) * 2;
    if (vrij) { const dock = ease(seg(0.28, 0.38)); py = lerp(py, -8 - r, dock); }
    const open = vrij ? ease(seg(0.36, 0.5)) : 0;
    if (open < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - open; ctx.beginPath(); ctx.arc(px, py + open * r, r * (1 - 0.5 * open), 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.35); ctx.fill(); ctx.strokeStyle = hi === 'blaasje' ? C.goud : C.vesR; ctx.lineWidth = 2.5; ctx.stroke();
      if (open < 0.3) { ctx.fillStyle = NT; for (let k = 0; k < 5; k++) { const an = k * 1.26 + i; ctx.beginPath(); ctx.arc(px + Math.cos(an) * 7, py + Math.sin(an) * 7, 2.6, 0, 6.283); ctx.fill(); } } ctx.restore(); }
    if (open > 0.05) { ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, -8, r * open * 0.9, 3.1416, 6.2832); ctx.stroke(); } }); // blaasje wordt deel van het membraan (Ω-vorm)
  ctx.restore();
  // ---------- neurotransmitter in de spleet (en heropname) ----------
  if (fus > 0.5) { const N = 26; for (let k = 0; k < N; k++) { const bx = BL[k % 4][0]; const tt = dif; const tx = RX[k % RX.length];
      let px = lerp(bx + (hash(k) - 0.5) * 20, tx + (hash(k * 3) - 0.5) * 30, tt), py = lerp(-6, postY(tx) - 18, tt) + Math.sin(t * 3 + k) * 3;
      if (her > 0.01 && k % 3 !== 0) { const tr = k % 2 ? 130 : -130; px = lerp(px, tr, her); py = lerp(py, lerp(-10, -60, clamp(her * 1.6 - 0.6, 0, 1)), her); }
      const al = Math.min(1, (fus - 0.5) * 4) * (k % 3 === 0 ? 1 - seg(0.85, 1) * (1 - ssri) : 1); ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = NT; ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.283); ctx.fill(); ctx.restore(); } }
  if (hi === 'spleet') { ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeRect(-250, -8, 500, 28); ctx.setLineDash([]); }
  ctx.restore(); return anker;
}

// =====================================================================================
// WORTELHAREN — wortelstelsel van een plant (penwortel met zijwortels) en ingezoomd één wortelhaarcel.
// Recept: wortelharen zijn uitstulpingen van één opperhuidcel (géén aparte cellen), ± 10 µm dik en tot ± 1 mm lang;
// ze zitten in de zone vlak achter de groeiende punt (strekkingszone voorbij, waar de cellen zich specialiseren),
// niet op de punt zelf (daar zit het wortelmutsje) en niet op oude delen. Ze vergroten het oppervlak sterk.
// Water gaat de wortelhaar in en loopt naar het midden (vaatbundel); de haar groeit tussen de bodemdeeltjes
// door, waar een laagje water om de korrels zit. Tweezaadlobbigen: penwortel met zijwortels.
// Bron: OpenStax Biology 30.3 (Lumen-versie: zones, wortelharen = uitstulpingen van epidermiscellen, penwortel);
// Bekende fouten: haren op de wortelpunt; haren als losse cellen of even dik als de
// wortel; wortel die boven de grond uitsteekt; water dat via de punt naar binnen gaat.
// Ontwerp: hoogte ± 600 (bodem vanaf y −250), breedte ± 640; zoomcirkel rechtsonder. Aanpak A: hele wortelstelsel
// + zoom op één wortelhaarcel met water.
// o: a, t, water (0..1 waterdeeltjes), zoom (0..1), groei (0..1 wortels groeien uit), hi ('haren','penwortel','zijwortel')
// =====================================================================================
function wortelHaren(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, water = 0, zoom = 1, groei = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const ZX = 180, ZY = 110, ZR = 150;
  const anker = { stengel: W(-130, -285), bodem: W(-300, -230), penwortel: W(-130, 120), zijwortel: W(-240, 10), haren: W(-30, 30), zoom: W(ZX, ZY - ZR), haarcel: W(ZX - 70, ZY + 50) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WORTEL = '#D9C9A0', WORTELd = '#A8956A', BODEM = '#3A2E24', KORREL = '#6E5A44';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  // bodem
  ctx.fillStyle = rgba(BODEM, 0.75); ctx.beginPath(); ctx.moveTo(-320, -250); for (let i = 0; i <= 16; i++) ctx.lineTo(-320 + i * 40, -250 + Math.sin(i * 1.7) * 4); ctx.lineTo(320, 300); ctx.lineTo(-320, 300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba(KORREL, 0.5); for (let i = 0; i < 70; i++) { const px = -310 + hash(i) * 620, py = -235 + hash(i + 99) * 530; if (Math.hypot(px - ZX, py - ZY) < ZR + 6) continue; ctx.beginPath(); ctx.arc(px, py, 1.5 + hash(i + 7) * 3, 0, 6.283); ctx.fill(); }
  // stengel met blaadjes boven de grond
  ctx.strokeStyle = C.groen; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-130, -250); ctx.quadraticCurveTo(-134, -280, -128, -310); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-128 + sd * 26, -300, 26, 10, sd * -0.5, 0, 6.283); ctx.fill(); }
  // wortels: penwortel + zijwortels (takken van 2e orde)
  const takken = [];
  const tak = (pts, w, key, L = groei) => { if (L <= 0.02) return; const n = Math.max(2, Math.round(pts.length * L)); const P = pts.slice(0, n); if (L < 1 && n < pts.length) { const f = pts.length * L - (n - 1); P[n - 1] = [lerp(pts[n - 2][0], pts[n - 1][0], f), lerp(pts[n - 2][1], pts[n - 1][1], f)]; }
    ctx.save(); ctx.globalAlpha *= dimF(key); ctx.strokeStyle = WORTELd; ctx.lineWidth = w + 2; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = hi === key ? C.goud : WORTEL; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); takken.push([P, w]); };
  tak([[-130, -250], [-128, -170], [-136, -60], [-126, 60], [-132, 170], [-128, 270]], 14, 'penwortel');
  const ZW = [[[-130, -190], [-200, -160], [-260, -110], [-290, -40]], [[-130, -170], [-60, -140], [-10, -90], [20, -20]], [[-134, -90], [-210, -50], [-250, 20], [-262, 100]],
    [[-132, -60], [-70, -20], [-30, 40], [-20, 120]], [[-128, 40], [-200, 80], [-230, 150], [-240, 220]], [[-128, 80], [-80, 120], [-60, 190], [-58, 250]]];
  const lZij = Z => clamp((groei - (Z[0][1] + 250) / 520) / 0.45, 0, 1);
  ZW.forEach(Z => tak(Z, 6, 'zijwortel', lZij(Z)));
  ZW.forEach((Z, i) => { const L2 = clamp((lZij(Z) - 0.55) / 0.45, 0, 1); const P = bioPunt(Z, 0.5); tak([[P[0], P[1]], [P[0] + (i % 2 ? 30 : -30), P[1] + 22], [P[0] + (i % 2 ? 44 : -44), P[1] + 52]], 3, 'zijwortel', L2); });
  // wortelharen: alleen in de zone achter de punt (niet op de punt zelf)
  ctx.save(); ctx.globalAlpha *= dimF('haren') * 0.9; ctx.strokeStyle = hi === 'haren' ? C.goud : '#EDE3C6'; ctx.lineWidth = 1;
  takken.forEach(([P, w], j) => { const D = bioDicht(P, 10); const n = D.length; const i0 = Math.floor(n * 0.55), i1 = Math.floor(n * 0.9);
    for (let i = i0; i < i1; i++) { if (i % 2) continue; const p = D[i], q = D[Math.min(n - 1, i + 1)]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const L = (w * 0.9 + 6) * (0.6 + 0.5 * hash(i + j * 50));
      for (const sd of [-1, 1]) { const nx = Math.cos(an + sd * 1.571), ny = Math.sin(an + sd * 1.571); ctx.beginPath(); ctx.moveTo(p[0] + nx * w * 0.5, p[1] + ny * w * 0.5); ctx.lineTo(p[0] + nx * (w * 0.5 + L), p[1] + ny * (w * 0.5 + L)); ctx.stroke(); } } });
  ctx.restore();
  // worteltopjes met mutsje (iets donkerder)
  takken.forEach(([P, w]) => { const e = P[P.length - 1]; ctx.fillStyle = WORTELd; ctx.beginPath(); ctx.arc(e[0], e[1], w * 0.55, 0, 6.283); ctx.fill(); });
  // ---------- zoom: één wortelhaarcel ----------
  if (zoom > 0.01) { ctx.save(); ctx.globalAlpha *= zoom; const bron = [-28, 40];
    ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bron[0], bron[1], 16, 0, 6.283); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bron[0] + 14, bron[1] - 8); ctx.lineTo(ZX - ZR * 0.95, ZY - ZR * 0.3); ctx.moveTo(bron[0] + 12, bron[1] + 10); ctx.lineTo(ZX - ZR * 0.8, ZY + ZR * 0.6); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.fillStyle = '#2A221C'; ctx.fill(); ctx.clip();
    // bodemkorrels met een laagje water
    const KR = [[ZX + 10, ZY - 70, 34], [ZX + 95, ZY - 20, 40], [ZX + 30, ZY + 30, 26], [ZX + 110, ZY + 80, 34], [ZX - 20, ZY - 120, 28], [ZX + 60, ZY + 130, 30], [ZX - 10, ZY + 110, 22]];
    for (const [kx, ky, kr] of KR) { ctx.beginPath(); ctx.arc(kx, ky, kr + 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); ctx.beginPath(); bioPad(ctx, [0, 1, 2, 3, 4, 5].map(k => [kx + Math.cos(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr)), ky + Math.sin(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr * 2))]), true); ctx.fillStyle = KORREL; ctx.fill(); }
    // opperhuidcellen van de wortel (links) en één cel met een lange haar
    for (let i = -2; i <= 2; i++) { const cy = ZY + i * 62; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(ZX - ZR - 10, cy - 29, 110, 58, 12) : ctx.rect(ZX - ZR - 10, cy - 29, 110, 58); ctx.fillStyle = '#C8D6A8'; ctx.fill(); ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 3; ctx.stroke(); }
    const HAAR = [[ZX - 52, ZY], [ZX - 10, ZY - 6], [ZX + 40, ZY - 18], [ZX + 60, ZY - 30], [ZX + 160, ZY - 40]];
    ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 22; ctx.beginPath(); bioPad(ctx, HAAR, false); ctx.stroke(); ctx.strokeStyle = '#C8D6A8'; ctx.lineWidth = 16; ctx.stroke();
    ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.ellipse(ZX - 30, ZY - 2, 10, 7, 0, 0, 6.283); ctx.fill(); // kern bij de basis van de haar
    ctx.fillStyle = rgba(C.teal, 0.35); ctx.beginPath(); ctx.ellipse(ZX - 80, ZY, 30, 18, 0, 0, 6.283); ctx.fill(); // vacuole
    if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; const HD = bioDicht(HAAR, 10); for (let k = 0; k < 14; k++) { const u = 1 - ((t * 0.25 + k / 14) % 1); const p = HD[Math.floor(u * (HD.length - 1))];
        ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(p[0], p[1] + Math.sin(k * 2.1) * 4, 3.4, 0, 6.283); ctx.fill(); }
      for (let k = 0; k < 6; k++) { const v = (t * 0.25 + k / 6) % 1; ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(lerp(ZX - 90, ZX - ZR - 20, v), ZY + Math.sin(k * 3) * 12, 3.4, 0, 6.283); ctx.fill(); } ctx.restore(); }
    ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}
