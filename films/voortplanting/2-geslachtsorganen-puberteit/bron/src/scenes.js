
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }

// ---------- tekeningen ----------
function figuur(ctx, x, y, h, col = '#5A6478', o = {}) { const { a = 1, jas = null, hoofd = '#C9A688' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 300; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-18, -110); ctx.moveTo(20, 0); ctx.lineTo(18, -110); ctx.stroke();
  roundRect(ctx, -48, -230, 96, 130, 30); shape(ctx, jas || col, null); circ(ctx, 0, -262, 34, hoofd); ctx.restore(); }
function bubbel(ctx, x, y, s2, col = '#F2F2EE', a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = Math.max(56, ctx.measureText(s2).width + 30); roundRect(ctx, x - w / 2, y - px - 12, w, px + 24, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 8, y + 12); ctx.lineTo(x, y + 26); ctx.lineTo(x + 8, y + 12); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 800), '#121A26', 'center'); ctx.restore(); }
function lijnenKaart(ctx, x, y, w, h, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 8; ctx.lineCap = 'butt';
  const base = y + h - 50, L = [h * 0.5, h * 0.62, h * 0.38]; ctx.beginPath(); ctx.moveTo(x + w * 0.16, base); ctx.lineTo(x + w * 0.16, base - h * 0.62); ctx.stroke();
  ['A', 'B', 'C'].forEach((l, i) => { const xx = x + w * (0.45 + i * 0.18); ctx.strokeStyle = i === 1 && hl > 0.5 ? C.groen : '#121A26'; ctx.beginPath(); ctx.moveTo(xx, base); ctx.lineTo(xx, base - L[i]); ctx.stroke(); text(ctx, l, xx, base + 36, fTekst(30, 800), '#121A26', 'center'); }); ctx.restore(); }
function stippen(ctx, x, y, n, k, col, a = 1, per = 10, r = 14, gap = 36) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap, r, i < k ? col : '#3A4458'); ctx.restore(); }
function balk(ctx, x, y, w, frac, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.005) { roundRect(ctx, x, y, Math.max(20, w * frac), 40, 10); shape(ctx, rgba(col, 0.75), col, 2); } if (label) regel(ctx, label, x, y - 14, 1, C.text, 24, 'left', 700); ctx.restore(); }
function schakelaars(ctx, x, y, n, aan, a = 1, max = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 40, n * 44 + 30, 150, 12); shape(ctx, '#3A3E46', '#6A7080', 2); for (let i = 0; i < n; i++) { const on = i < aan; roundRect(ctx, x + i * 44, y, 28, 50, 6); shape(ctx, on ? C.koraal : '#8A8E96', null); circ(ctx, x + i * 44 + 14, y - 16, 6, on ? '#F2C94C' : '#5A5E66'); if (i % 5 === 0 || i === n - 1) text(ctx, String(15 * (i + 1)), x + i * 44 + 14, y + 84, fTekst(16, 700), '#C9CED6', 'center'); } ctx.restore(); }
function marshmallow(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#E8E2D8'; ctx.fill(); ctx.fillStyle = '#F8F4EE'; ctx.fillRect(x - 28 * s, y - 36 * s, 56 * s, 36 * s); ctx.beginPath(); ctx.ellipse(x, y - 36 * s, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore(); }
function bord(ctx, x, y, s = 1, n = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 90 * s, 26 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); for (let i = 0; i < n; i++) marshmallow(ctx, x + (i - (n - 1) / 2) * 60 * s, y + 4 * s, s); ctx.restore(); }
function klokje(ctx, x, y, r, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.6); ctx.fill(); ctx.restore(); }
function stempel(ctx, x, y, s2, col, a = 1, rot = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.font = fTekst(40, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, -w / 2, -38, w, 70, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, s2, 0, 12, fTekst(40, 800), col, 'center'); ctx.restore(); }
function map_(ctx, x, y, a = 1, lab = 'archief') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 80, y); ctx.lineTo(x + 100, y + 20); ctx.lineTo(x + 240, y + 20); ctx.lineTo(x + 240, y + 180); ctx.lineTo(x, y + 180); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#F2EAD8'; ctx.fillRect(x + 20, y + 40, 200, 120); ctx.strokeStyle = '#9A8A6A'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + 36, y + 64 + i * 20); ctx.lineTo(x + 200 - (i % 2) * 40, y + 64 + i * 20); ctx.stroke(); } text(ctx, lab, x + 120, y + 214, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
function assen(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) metaText(ctx, xl, x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, yl, x, y - 16, C.text2, 'left', 18); }

function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
const SCENES = {};
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

// =====================================================================================
// ZENUWCEL (neuron). Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die
// zich als een boom vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon
// vanuit een kegeltje, lang en overal even dik, eindigt in vertakkingen met knopjes (synaps).
// Bron: Kandel, Principles of Neural Science, fig. 2-1. Bekende fouten: ster met gelijke armen; axon dat
// dunner wordt; geen kern.
// =====================================================================================
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6 } = o; if (a <= 0.01) return null;
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
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 18 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    if (puls >= 0 && puls <= 1) { const [qx, qy] = bioPunt(pts, puls); const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 26 * s); g.addColorStop(0, rgba(pulsCol, 0.9)); g.addColorStop(1, rgba(pulsCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 26 * s, 0, 6.283); ctx.fill(); }
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
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.55), rgba(BIO.cyto, 0.9), 1.5);
  // vetdruppel: dezelfde vorm iets kleiner
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  const druppel = omtrek.map(p => [cx + (p[0] - cx) * 0.86, cy + (p[1] - cy) * 0.86]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.85), rgba(BIO.vetS, 0.9), 1.2);
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(cx, cy); ctx.restore(); }
  // kern: sikkel tegen de rand (op de punt van de omtrek rechtsonder)
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * rr * 0.93, cy + Math.sin(an) * rr * 0.93, Math.max(4, rr * 0.18), Math.max(2, rr * 0.06), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.9), BIO.kernL, 1);
  ctx.restore();
}
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  if (haarvat) bloedvat(ctx, [[x - w / 2 - 20, y + h * 0.1], [x - w * 0.15, y - h * 0.05], [x + w * 0.2, y + h * 0.08], [x + w / 2 + 20, y - h * 0.02]], 5, t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' });
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
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.12, 0, kopL * 0.42, kopB * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.65); ctx.fill(); ctx.restore();
  ctx.restore();
}

// =====================================================================================
// EICEL (in de follikel) en EIERSTOK in doorsnede. Recept: eierstok ± 3 × 2 × 1 cm (amandel); schors (buitenste
// derde) vol primordiale follikels (eicel met één laag platte cellen), merg in het midden met bloedvaten die
// via de hilus binnenkomen. Rijping: primaire follikel (één laag kubische cellen) → secundaire (meerdere lagen)
// → follikel met holte (antrum), eicel op een heuveltje (cumulus) → Graafse follikel 18–25 mm (zo groot dat hij
// uitpuilt). Eisprong: wand scheurt aan het oppervlak, eicel met stralenkrans komt vrij, wat overblijft wordt
// het gele lichaam (gele, geplooide wand). Groottes niet op schaal (follikels vergroot). Bron: Junqueira h. 22;
// Sadler, Langman's Embryology h. 2. Bekende fouten: eicellen als losse stipjes; eisprong als puntje dat wegvliegt.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (krans) for (let k = 0; k < 18; k++) { const an = k / 18 * 6.283; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5, r * 0.24, 0, 6.283); shape(ctx, rgba('#E6C9A8', 0.65), rgba('#B88A60', 0.6), 1); }
  ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.35), rgba('#F6EEDC', 0.8), 1.5); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill();
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
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 160, groei = 0, eis = 0, geel = 0, t = 0, winnaar = 3 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; const w = 1 + 0.03 * Math.sin(an * 3 + 1) + 0.02 * Math.sin(an * 7); return [x + Math.cos(an) * rx * w, y + Math.sin(an) * ry * w]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.32), lighten('#C98A6A', 0.25), 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  // merg: lichter, met bloedvaten vanaf de hilus (onderkant)
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.08, rx * 0.5, ry * 0.42, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.35); ctx.fill();
  const vat = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  [[-0.05, 1], [0.05, 1]].forEach(([dx], i) => { const c = i ? rgba(BIO.ader, 0.7) : rgba(BIO.bloed, 0.75);
    vat([[x + dx * rx, y + ry * 1.05], [x + dx * rx * 1.4, y + ry * 0.5], [x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.5 * rx, y - ry * 0.1]], c, 5);
    vat([[x + dx * rx * 1.4, y + ry * 0.5], [x + 0.3 * rx + i * 20, y + ry * 0.1], [x + 0.55 * rx, y - ry * 0.15]], c, 4);
    vat([[x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.1 * rx, y - ry * 0.35]], c, 3); });
  ctx.restore();
  // primordiale follikels in de schors (buitenste derde), niet in het merg
  for (let i = 0; i < n; i++) { const an = hash(i * 3 + 1) * 6.283, rr = lerp(0.68, 0.93, hash(i * 3 + 2)); follikel(ctx, x + Math.cos(an) * rx * rr, y + Math.sin(an) * ry * rr, 0, { R: ry * 0.5, seed: i, a: 0.8, klein: true }); }
  // groepje dat rijpt; één wint, de rest gaat te gronde
  const grp = [[-0.45, -0.38], [-0.2, 0.48], [0.18, -0.52], [0.5, -0.12], [-0.6, 0.22]];
  let uit = null;
  grp.forEach(([gx, gy], i) => { const win = i === winnaar; const g = groei * (win ? 1 : 0.5) * (win ? 1 : 1 - eis); if (g <= 0.01 || (win && geel > 0.5)) return;
    const px = x + gx * rx * (win ? 0.95 : 1), py = y + gy * ry * (win ? 0.95 : 1);
    const p = follikel(ctx, px, py, win ? g : g * 0.55, { R: ry * 0.42, seed: i, a: win ? 1 : 1 - eis * 0.7, scheur: win ? eis : 0 });
    if (win) uit = { x: px, y: py, ei: p }; });
  // eisprong: wand scheurt aan de rand, eicel met stralenkrans + vocht komt vrij
  if (uit && eis > 0.01) { const an = Math.atan2(uit.y - y, uit.x - x); const sx = x + Math.cos(an) * rx * 1.02, sy = y + Math.sin(an) * ry * 1.02;
    ctx.save(); ctx.globalAlpha *= clamp(eis * 3, 0, 1); ctx.strokeStyle = rgba('#E9F0F4', 0.6); ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { const sp = an + (k - 2) * 0.25; const d = eis * 90; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(sp) * d, sy + Math.sin(sp) * d); ctx.stroke(); } ctx.restore();
    const e = ease(eis); eicelEcht(ctx, lerp(uit.ei[0], sx + Math.cos(an) * 110, e), lerp(uit.ei[1], sy + Math.sin(an) * 110, e), uit.ei[2] * 1.4, 1, true); }
  if (geel > 0.01) { const [gx, gy] = grp[winnaar]; const px = x + gx * rx * 0.95, py = y + gy * ry * 0.95; ctx.save(); ctx.globalAlpha *= geel;
    ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const rr = ry * 0.32 * (1 + 0.08 * Math.sin(an * 9)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba('#E8C25A', 0.75), '#C99A3A', 2); ctx.restore(); }
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
// CELLULOSE: rechte ketens van glucose, elke volgende ring omgekeerd (β-1,4); ketens liggen evenwijdig en zijn
// met waterstofbruggen (stippellijntjes) tot een vezeltje gebonden. Bekende fout: losse groene bolletjes.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, col = (typeof V !== 'undefined' ? V.vezel : C.groen) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const dy = r * 2.1;
  for (let k = 0; k < ketens - 1; k++) { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(i * r * 2.2, k * dy + r * 0.6); ctx.lineTo(i * r * 2.2 + r * 0.4, (k + 1) * dy - r * 0.6); ctx.stroke(); } ctx.setLineDash([]); }
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.6; ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(off, k * dy); ctx.lineTo(off + (n - 1) * r * 2.2, k * dy); ctx.stroke();
    for (let i = 0; i < n; i++) hexagon(ctx, off + i * r * 2.2, k * dy + (i % 2 ? 1.5 : -1.5), r, rgba(col, 0.8), lighten(col, 0.3), 1.1, i % 2 ? Math.PI / 6 : 0); }
  ctx.restore();
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
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0 } = o; if (a <= 0.01) return; const n = kinds.length;
  const doel = _eiwitVorm(n, s); const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const pts = doel.map((d, i) => { const seg = (i < 10 || (i > 22 && i < 34)) ? 0 : 0.3; const f = ease(clamp((fold - seg) / (1 - seg), 0, 1)); const w = wander(i + 900, t, r * 0.15, 0.6); return [cx + lerp(begin[i][0], d[0], f) + w.x, cy + lerp(begin[i][1], d[1], f) + w.y, (d[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a;
  if (fold > 0.85) { ctx.save(); ctx.globalAlpha *= (fold - 0.85) / 0.15; ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]); for (let i = 0; i < 6; i++) { const p = pts[13 + i], q2 = pts[25 - i]; if (p && q2) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); } } ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2.2; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]).forEach(i => { const p = pts[i]; ctx.save(); ctx.globalAlpha *= 0.75 + 0.25 * (p[2] + 1) / 2; bead(ctx, p[0], p[1], r * (0.82 + 0.18 * (p[2] + 1) / 2), kinds[i], { ess }); ctx.restore(); });
  ctx.restore(); return pts;
}
// MEMBRAAN: dubbele laag fosfolipiden langs een boog (een cel is rond). Kop (rond) + twee staarten ± 2× de kop-
// diameter, staarten naar binnen; een eiwit steekt aan beide kanten uit. Staarten in vetkleur: het is vet.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const blad = (Rk, naarBinnen) => { for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); if (eiwitten.some(e => Math.abs(an - e) * R < kr * 3.2)) continue;
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = naarBinnen ? -1 : 1; const tx = -uy, ty = ux;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * sd * kr * 0.6, hy + uy * d * sl * 0.5 + ty * sd * kr * 0.6, hx + ux * d * sl + tx * sd * kr * 0.35, hy + uy * d * sl + ty * sd * kr * 0.35); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, lighten(kop, 0.3), 1); } };
  blad(R + sl + gap, true); blad(R - sl - gap, false);
  eiwitten.forEach(e => { const ux = Math.cos(e), uy = Math.sin(e); ctx.save(); ctx.translate(cx + ux * R, cy + uy * R); ctx.rotate(e); ctx.beginPath(); bioPad(ctx, [[-sl * 1.6, -kr * 2.2], [0, -kr * 2.8], [sl * 1.6, -kr * 2.2], [sl * 1.7, kr * 1.8], [0, kr * 2.6], [-sl * 1.7, kr * 1.8]], true); shape(ctx, rgba(eiwitCol, 0.95), lighten(eiwitCol, 0.3), 1.5); ctx.restore(); });
  ctx.restore();
}
// CEL (rond) met membraan, kern (± 1/3 van de diameter, niet in het midden), mitochondriën en rustige textuur.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, s = 1, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.55); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14 * s, 0, 6.283); ctx.clip();
  for (let i = 0; i < 90; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)) * r; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 1.6 * s, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (organellen) { const kx = cx + r * 0.18, ky = cy - r * 0.12; nucleus(ctx, kx, ky, r * 0.33, 1, t);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.9, rr = r * 0.65; mitochondrion(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(36, r * 0.26), an + 1.2, 1, 4, t); } }
  ctx.restore();
  membraanBoog(ctx, cx, cy, r - 7 * s, a0, a1, { s: s * 0.7, eiwitten });
  ctx.restore();
}

// =====================================================================================
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten steken in vlucht
// voorbij de staart uit; bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const rug = '#7E6248', buik = '#E9DCC6', vlek = '#4E3A28';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  vleugel(true);
  // poten steken voorbij de staart uit
  ctx.strokeStyle = '#2E2E2E'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-34, 9); ctx.lineTo(-96, 15); ctx.moveTo(-34, 11); ctx.lineTo(-94, 20); ctx.stroke();
  // staart
  ctx.beginPath(); ctx.moveTo(-60, -5); ctx.lineTo(-86, -7); ctx.lineTo(-88, 5); ctx.lineTo(-60, 7); ctx.closePath(); shape(ctx, '#CDB898', '#7E6248', 1);
  ctx.strokeStyle = rgba(vlek, 0.6); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-70 - k * 6, -6); ctx.lineTo(-70 - k * 6, 6); ctx.stroke(); }
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(vlek, 0.7); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, '#B89A78', '#D9C2A4', 1);
  ctx.strokeStyle = '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  ctx.strokeStyle = '#2E2A26'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(82, -5); ctx.quadraticCurveTo(116, -3, 144, -12); ctx.stroke();
  ctx.strokeStyle = '#D99A90'; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(82, -5); ctx.lineTo(100, -4); ctx.stroke();
  vleugel(false);
  ctx.restore();
}

// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, streep = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, streep * 0.45, h);
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3 }); }

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
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const N = 120; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(xx => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)));
  const dk = xs.map((xx, i) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1)));
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.32, rgba('#C98A86', 0.8));           // slijmvlies
    band(0.32, 0.45, rgba('#8A6A6A', 0.6));        // bindweefsel
    band(0.45, 0.78, rgba(BIO.spier, 0.75));       // kringspier
    band(0.78, 0.96, rgba(BIO.spierL, 0.55));      // lengtespier
    band(0.96, 1.0, rgba('#E6D0C8', 0.7));         // buitenvlies
    // slijmvlies-oppervlak: plooien met kliergaatjes (of vlokken)
    ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
    xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - (vlokken ? Math.max(0, Math.sin(xx * 0.12)) * 9 : Math.abs(Math.sin(xx * 0.06)) * 4)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.strokeStyle = rgba('#7A4A4A', 0.6); ctx.lineWidth = 2; for (let i = 3; i < N; i += 4) { const yy = yc + kant * ri[i]; ctx.beginPath(); ctx.moveTo(xs[i], yy); ctx.lineTo(xs[i], yy + kant * dk[i] * 0.24); ctx.stroke(); } // klieren
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#5A2A26', 0.5); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.615); ctx.beginPath(); ctx.ellipse(xs[i], yy, 3.5, dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.83, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  }
  ctx.restore(); return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
}
// ENZYM met actieve plek (goud). Recept: eiwit-kluwen met een holte die precies past bij één substraat; bij
// binden sluit de holte een beetje (induced fit). Een substraat dat niet past (cellulose voor amylase) glijdt eraf.
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, sluit = 0, col = C.enzym, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const pts = []; for (let k = 0; k < 28; k++) { const u = k / 28 * 6.283; let rr = r * (1 + 0.08 * Math.sin(u * 5 + seed) + 0.05 * Math.sin(u * 9));
      const d = Math.abs(((u + Math.PI) % 6.283) - Math.PI); if (d < 0.5) rr *= lerp(0.45, 0.62, sluit) + (d / 0.5) * lerp(0.55, 0.38, sluit); pts.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, col, lighten(col, 0.3), 1.5);
  ctx.strokeStyle = rgba(lighten(col, 0.35), 0.55); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, [[-r * 0.6, -r * 0.2], [-r * 0.2, -r * 0.55], [r * 0.1, -r * 0.2], [-r * 0.25, r * 0.15], [-r * 0.1, r * 0.5]], false); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.28, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  ctx.restore();
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
// Bekende fouten: golflijnen of blokjes; buisjes als lege ringen.
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0, col = C.teal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), lighten(col, 0.2), Math.max(2.5, rx * 0.035)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const bx = x + px, by = y + py, r = rb * (0.92 + 0.12 * hash(i + 3));
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#1A2232', 0.75); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283; _bioCirc(ctx, x + px + Math.cos(an) * rb * 1.08, y + py + Math.sin(an) * rb * 1.08, Math.max(1.5, rb * 0.16), rgba(C.goud, 0.85 * leydig)); });
  ctx.restore(); ctx.restore();
}

// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // bloedvaten en urineleider bij de hilus (rechts)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(60, -16); ctx.lineTo(150, -24); ctx.stroke(); ctx.strokeStyle = '#4A6CA8'; ctx.beginPath(); ctx.moveTo(60, 8); ctx.lineTo(150, 6); ctx.stroke();
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(56, 30); ctx.quadraticCurveTo(80, 90, 70, 190); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#9E4A3E', '#D88E7A', 3); ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.9); for (let k = 0; k < 8; k++) { const an = Math.PI * 0.62 + k * 0.32; const bx = 66 + Math.cos(an) * 38, by = Math.sin(an) * 64 * 1.1; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(44, 0); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = rgba('#E8D9A0', 0.85); ctx.beginPath(); ctx.ellipse(46, 4, 16, 30, 0, 0, 6.283); ctx.fill(); ctx.restore();
  // bijnier op de bovenpool
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const g = glow * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, rgba('#E2B64A', 0.75 + 0.25 * g), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); ctx.fillStyle = rgba('#8A4A3A', 0.85); ctx.fill();
  if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * 0.6; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { bijnier: [x + 4 * s, y - 140 * s] };
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

// ZEESCHILDPAD (onechte karetschildpad), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig, ± 1 m;
// 5 middelste schilden (vertebraal), 5 paar ribschilden, rand van kleine schilden; voorvinnen lang en sikkel-
// vormig (± 1/2 van de schildlengte), achtervinnen kort en rond; kop groot met snavel en schubben. Roodbruin.
// Legt ± 100 eieren (pingpongbal, ± 4 cm) in een kuil in het zand; temperatuur van het nest bepaalt de sekse
// (warmer dan ± 29 °C vooral vrouwtjes). Bron: NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met
// pootjes en een bolle koepel. o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A';
  for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(-0.25 + vin * 0.35); ctx.beginPath(); bioPad(ctx, [[40, -40], [120, -66], [178, -40], [190, -6], [140, -10], [60, -6]], true); shape(ctx, huid, schub, 2); ctx.restore();
    ctx.save(); ctx.scale(sx, 1); ctx.beginPath(); bioPad(ctx, [[40, 80], [80, 96], [92, 124], [64, 128], [30, 104]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, [[-22, -96], [-30, -128], [-16, -158], [16, -158], [30, -128], [22, -96]], true); shape(ctx, huid, schub, 2); _bioCirc(ctx, -16, -136, 4, '#2A1C16'); _bioCirc(ctx, 16, -136, 4, '#2A1C16');
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-96, -54, -12, 32, 76, 120];
  for (let i = 0; i < 5; i++) { ctx.beginPath(); bioPad(ctx, [[-22, vy[i]], [22, vy[i]], [26, (vy[i] + vy[i + 1]) / 2], [22, vy[i + 1]], [-22, vy[i + 1]], [-26, (vy[i] + vy[i + 1]) / 2]], true); ctx.stroke(); }
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx * 26, vy[i] + 20); ctx.lineTo(sx * 92, vy[i] + 20 + i * 4); ctx.stroke(); }
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); const [px, py] = p; ctx.lineTo(px * 0.86, py * 0.86); } ctx.stroke();
  ctx.restore(); ctx.restore();
}
// eieren in een nestkuil in het zand (pingpongbal-groot, wit, iets ingedeukt)
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
  for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
  ctx.restore(); }

// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]];
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [224, 6], [246, 4], [266, 2], [284, 1]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(tx - 3, ty); ctx.lineTo(tx, ty + (i % 2 ? -8 : 9)); ctx.lineTo(tx + 3, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(170, 8); ctx.quadraticCurveTo(240, 6, 298, -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, -30, 13, 9, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 160, -30, 6, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(159, -35, 2, 10);
  _bioCirc(ctx, 292, -14, 3.5, '#1A1410');
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

// =====================================================================================
// T-HELPERCEL (CD4+-lymfocyt). Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets
// excentrisch, donker (veel heterochromatine); smalle cytoplasmarand (dikste kant ± 20 % van de straal) met
// 2–3 mitochondriën. CD4 = transmembraaneiwit, steekt in het echt ± 7 nm uit (veel te klein om te zien):
// hier sterk vergroot als knopje op een steeltje (± 13 % van de straal), loodrecht op het membraan, gelijkmatig
// verdeeld (± elke 28 px omtrek). Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12 (lymfocyt).
// Bekende fouten: kleine kern in het midden met veel cytoplasma (dat is een monocyt); receptoren als
// losse stipjes naast de cel; receptoren schuin of ongelijk verdeeld.
// Oorsprong = midden van de cel, r = straal in px.
// =====================================================================================
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0 } = o;
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.28, 0, 6.283); ctx.strokeStyle = rgba((C.tealL || '#9ED0EA'), 0.11 * hl); ctx.lineWidth = r * 0.22; ctx.stroke(); }
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = lighten((C.green || '#7FC48F'), 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + ux * (r + st + kn * 0.7), y + uy * (r + st + kn * 0.7), kn * 1.15, kn * 0.9, an, 0, 6.283); shape(ctx, (C.green || '#7FC48F'), lighten((C.green || '#7FC48F'), 0.4), 1); }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, lighten('#2F5E78', 0.12 * hl), lighten((C.tealL || '#9ED0EA'), 0.2 * hl), Math.max(1.5, r * 0.022));
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
  ctx.restore();
  return ret;
}

// =====================================================================================
// HIV-DEELTJE. Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel (twee lijnen);
// 8–14 envelopspikes (gp41-steel in de membraan + gp120-trimeer als knop), ± 10–14 nm hoog = ± 20 % van de
// straal, loodrecht en gelijkmatig verspreid; binnenin kegelvormig capside (p24) ± 100 nm lang, breed eind
// ± 50 nm, smal eind ± 20 nm (≈ 1,3 r lang), met twee RNA-strengen (enkelstrengs, ± 9,7 kb elk) vooral in het
// brede eind. Fusie: na binding aan CD4 + corecepor versmelt de envelop met het celmembraan; het deeltje opent
// aan de onderkant, wordt een koepel en loopt over in de membraan; capside zakt naar de opening.
// Bron: Briggs & Kräusslich 2011 (J Mol Biol, cryo-ET HIV); Zhu e.a. 2006 (Nature, spikes per virion ± 14).
// Bekende fouten: stekelbol met tientallen lange spikes; rond capside; spikes zonder steel die los zweven;
// DNA in plaats van RNA.
// Oorsprong = midden; r = straal envelop in px; fuseer-membraan ligt op y + r (raaklijn onderkant).
// =====================================================================================
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12 } = o; const f = clamp(fuseer, 0, 1);
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
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba((C.coral || '#E07A5F'), 0.13); ctx.fill();
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
  ctx.strokeStyle = (C.ink || '#F2F2EE'); ctx.lineWidth = Math.max(1, r * 0.022);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// STAAFBACTERIE (bacil, doorsnede-aanzicht). Recept: ± 1 µm breed × 2–3 µm lang (hier breedte = L / 2,5),
// uiteinden halfrond. Celwand (peptidoglycaan; Gram-positief 20–80 nm = 2–8 % van de breedte) hier vergroot tot
// ± 8 % zodat hij als dikke laag leest, buiten het dunne celmembraan met een smalle spleet ertussen (twee
// duidelijke lagen). Nucleoïde = één ringvormig DNA-molecuul, sterk opgekruld, als kluwen in het midden zonder
// kernmembraan. Ribosomen 20 nm, ± 10 000–20 000 per cel: hier veel kleine stipjes, buiten de nucleoïde.
// Flagel ± 20 nm dik, 5–10 µm lang (2–4 × de cel), schroefvormig, verankerd in wand + membraan (basaal
// lichaam) aan een pool. Antibiotica (bijv. penicilline) remmen de opbouw van de wand: gaten in de wand, het
// membraan puilt door een gat naar buiten (blaasje) en scheurt door de osmotische druk → inhoud lekt weg.
// Bron: Brock Biology of Microorganisms h. 2; Madigan e.a. fig. 2.x (penicilline-lysis).
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; ribosomen als grote bollen; flagel als
// los haartje naast de cel.
// Oorsprong = midden; L = lengte in px; o.rot = draaiing.
// =====================================================================================
function bacterieCel(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, hlRibo = 0, flagel = false } = o; const ab = clamp(antibiotica, 0, 1);
  const hw = L / 5, ww = hw * 0.16, half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  // omtrek (capsule) met normalen, gelijk verdeeld
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  // blaasje: membraan puilt door een wandgat bovenaan (x0)
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.1, ky = 0;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - 3).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // flagel aan de linkerpool (achter de cel getekend)
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 80; i++) { const u = i / 80, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.75); ctx.lineWidth = Math.max(1.4, hw * 0.05); ctx.stroke(); }
  // cytoplasma
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba((C.green || '#7FC48F'), 0.16); ctx.fill();
  // ribosomen
  const nr = Math.round(L * L / 900 + 40); const rr = Math.max(1.3, hw * 0.045);
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + 1) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4;
    if (Math.pow((px - kx) / (half * 0.85 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.5), 2) < 1) continue;
    if (hlRibo > 0.01) { ctx.beginPath(); ctx.arc(px, py, rr * 2.4, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 0.18 * hlRibo); ctx.fill(); }
    ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fillStyle = lighten((C.gold || '#E0B64A'), 0.3 * hlRibo); ctx.fill(); }
  ctx.restore();
  // nucleoïde: opgekruld ring-DNA
  ctx.beginPath(); const nl = 220; for (let i = 0; i <= nl; i++) { const u = i / nl * 6.283; const bx = Math.cos(u) * half * 0.7, by = Math.sin(u) * hw * 0.3; const cr = hw * (0.13 + 0.05 * Math.sin(u * 3));
    const px = kx + bx + Math.cos(u * 23) * cr, py = ky + by + Math.sin(u * 23) * cr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.strokeStyle = rgba((C.purpleL || '#BBAFE0'), 0.95); ctx.lineWidth = Math.max(1.1, hw * 0.035); ctx.stroke();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = (C.mem || '#AFC0D0'); ctx.lineWidth = Math.max(1.3, hw * 0.04);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    // inhoud lekt weg
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 1 - u); ctx.fill(); } }
  // celwand: dikke band, met gaten bij antibiotica
  const wand = omtrek(hw - ww / 2, 96); const wc = lighten('#6FA27C', 0.25 * hlWand);
  if (hlWand > 0.01) { ctx.beginPath(); bioPad(ctx, wand.map(q => q.p), true); ctx.strokeStyle = rgba((C.greenL || '#B4DFBB'), 0.22 * hlWand); ctx.lineWidth = ww + 10; ctx.stroke(); }
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  ctx.lineCap = 'round';
  for (const pass of [[lighten(wc, 0.45), ww + 2.4], [wc, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  // basaal lichaam van de flagel
  if (flagel) { ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.ink2, (C.ink || '#F2F2EE'), 1); }
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

// =====================================================================================
// BACTERIËN VAN SOA'S (22 okt 2026). Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten naar
//   elkaar, samen ± 1,5 × 0,8 µm; vaak ín witte bloedcellen in pus. Bron: CDC; Murray, Medical Microbiology h. 22.
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; insluitsel (inclusion) naast de kern vol kleine
//   deeltjes (elementaire lichaampjes ± 0,3 µm, grotere reticulaire lichaampjes); de cel barst en de deeltjes
//   besmetten nieuwe cellen. Bron: idem h. 34.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen, draait als
//   een kurkentrekker. Bron: idem h. 35.
// BACTERIE GROOT: celwand + celmembraan, cytoplasma met ribosomen, DNA als één lus (nucleoïd) en een plasmide;
//   aangrijpingspunten van antibiotica: celwand (penicillines/ceftriaxon) en ribosomen (azitromycine, doxycycline).
// Bekende fouten: alle bacteriën als dezelfde staafjes; bacterie als leeg ovaal.
// =====================================================================================
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) { // lichaamscel met een chlamydia-insluitsel; barst = 0..1 (deeltjes komen vrij)
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BIO.cyto, 0.22), rgba(BIO.cyto, 0.75), 2.5);
  ctx.beginPath(); ctx.ellipse(x + r * 0.35, y - r * 0.2, r * 0.3, r * 0.26, 0.3, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.55), BIO.kernL, 1.5);
  const ir = r * lerp(0.15, 0.5, groei); const ix = x - r * 0.22, iy = y + r * 0.12;
  ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); shape(ctx, rgba('#E8D9A0', 0.18), rgba('#E8D9A0', 0.7), 1.5);
  const n = Math.round(lerp(4, 46, groei)); for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, rr = Math.sqrt(hash(k * 7 + 2)) * ir * 0.85; const out = barst * (40 + 60 * hash(k)) ; const px = ix + Math.cos(an) * (rr + out), py = iy + Math.sin(an) * (rr + out);
    ctx.beginPath(); ctx.arc(px, py, k % 5 === 0 ? 4 : 2.6, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = dood > 0.5 ? '#6A7488' : col; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.beginPath(); const ph = dood > 0.5 ? 0 : t * 6;
  for (let i = 0; i <= 120; i++) { const u = i / 120, xx = (u - 0.5) * len, yy = Math.sin(u * n * 6.283 - ph) * len * 0.045; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
}
function bacterieGroot(ctx, x, y, w, h, o = {}) { // staafbacterie in doorsnede; wandKapot 0..1 (antibioticum op de celwand), riboHl 0..1
  const { a = 1, t = 0, wandKapot = 0, riboHl = 0, col = C.koraal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = (inset) => { roundRect(ctx, x - w / 2 + inset, y - h / 2 + inset, w - 2 * inset, h - 2 * inset, h / 2 - inset); };
  // celwand (dik), met gaten als het antibioticum werkt
  pad(0); ctx.lineWidth = 9; ctx.strokeStyle = rgba(col, 0.9); if (wandKapot > 0.01) ctx.setLineDash([lerp(400, 26, wandKapot), lerp(0, 18, wandKapot)]); ctx.stroke(); ctx.setLineDash([]);
  pad(9); ctx.fillStyle = rgba(col, 0.16); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = rgba('#F2E6C8', 0.7); ctx.stroke(); // celmembraan
  // DNA-lus (nucleoïd): één gesloten, kronkelende lus
  ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 90; i++) { const an = i / 90 * 6.283; const rr = 1 + 0.18 * Math.sin(an * 7 + 1) + 0.1 * Math.sin(an * 13); const px = x - w * 0.05 + Math.cos(an) * w * 0.18 * rr, py = y + Math.sin(an) * h * 0.26 * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // plasmide
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.12, w * 0.045, h * 0.09, 0.4, 0, 6.283); ctx.stroke();
  // ribosomen
  for (let k = 0; k < 34; k++) { const px = x - w * 0.42 + hash(k * 3 + 1) * w * 0.84, py = y - h * 0.32 + hash(k * 3 + 2) * h * 0.64; if (Math.abs(px - (x - w * 0.05)) < w * 0.2 && Math.abs(py - y) < h * 0.3) continue;
    ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex('#C9B896', '#E0B64A', riboHl) : rgba('#C9B896', 0.85); ctx.fill(); }
  ctx.restore(); return { wand: (an) => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] };
}

// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom (wordt de placenta); binnenste celmassa (embryoblast) als klompje ronde cellen aan één
// kant (wordt het kind); holte vol vocht (blastocoel). Bij PGT haalt de arts 5–10 cellen uit de trofoblast aan de
// kant tegenover de binnenste celmassa. Bron: Sadler h. 3; ESHRE PGT-consortium. Bekende fout: ring van gelijke
// rondjes zonder verschil tussen buitenlaag en celmassa.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (zona > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.12 * zona), rgba('#F6EEDC', 0.75 * zona), Math.max(2, r * 0.05)); }
  ctx.beginPath(); ctx.arc(x, y, r * 0.95, 0, 6.283); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  // trofoblast: platte cellen langs de rand
  const n = 22; for (let k = 0; k < n; k++) { const an = k / n * 6.283; const d = Math.abs(Math.atan2(Math.sin(an - (icm + Math.PI)), Math.cos(an - (icm + Math.PI)))); if (gat > 0.01 && d < 0.35 * gat) continue;
    const cx = x + Math.cos(an) * r * 0.88, cy = y + Math.sin(an) * r * 0.88; ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.16, r * 0.065, an + Math.PI / 2, 0, 6.283);
    shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', 1.2); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.05, r * 0.03, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); }
  // binnenste celmassa
  const ix = x + Math.cos(icm) * r * 0.55, iy = y + Math.sin(icm) * r * 0.55; const P = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  P.forEach(([u, v], i) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', 1.2); ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); });
  ctx.restore(); return { icm: [ix, iy], tegenover: [x + Math.cos(icm + Math.PI) * r * 0.9, y + Math.sin(icm + Math.PI) * r * 0.9] };
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
    const vul = sr === 'b' ? _mixHex(huidTint, '#B8927E', 0.25) : sr === 'k' ? _mixHex(huidTint, '#E6CDB4', 0.45) : huidTint;
    ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, vul, _mixHex(vul, '#FFFFFF', 0.25), 1);
    const [cx, cy] = c.c;
    if (sr === 'k') { // korrellaag: platte, vervagende kern + donkere keratohyaline-korrels
      ctx.beginPath(); ctx.ellipse(cx, cy, 4 * s, 1.1 * s, 0, 0, 6.283); shape(ctx, rgba('#6E5A8E', 0.4), null);
      for (let k = 0; k < 10; k++) _bioCirc(ctx, cx + (hash(i * 11 + k) - 0.5) * 16 * s, cy + (hash(i * 7 + k * 3) - 0.5) * 2.6 * s, 0.45 * s, '#4A3A54'); return; }
    if (i === delIdx && deling > 0.01) { // delende cel (metafase): chromosomen op een rij in het midden, spoelfiguur, geen kernmembraan
      ctx.beginPath(); ctx.ellipse(cx, cy - 1 * s, 6.5 * s, 6 * s, 0, 0, 6.283); shape(ctx, _mixHex(huidTint, '#FFFFFF', 0.15), _mixHex(huidTint, '#FFFFFF', 0.4), 1);
      ctx.save(); ctx.globalAlpha *= deling; ctx.strokeStyle = rgba('#8FA0B5', 0.8); ctx.lineWidth = Math.max(0.8, 0.25 * s);
      for (let k = 0; k < 7; k++) { const yy = cy - 3.6 * s + k * 1.2 * s; ctx.beginPath(); ctx.moveTo(cx - 6 * s, cy); ctx.quadraticCurveTo(cx - 3 * s, yy, cx, yy); ctx.quadraticCurveTo(cx + 3 * s, yy, cx + 6 * s, cy); ctx.stroke(); }
      for (let k = 0; k < 6; k++) { const yy = cy - 3 * s + k * 1.2 * s; chromatideX(ctx, cx + (hash(k + i) - 0.5) * 0.6 * s, yy, 2.8 * s, Math.PI / 2 + (hash(k * 3) - 0.5) * 0.5, { w: 0.8 * s, coils: 0 }); }
      ctx.restore(); return; }
    const ry = sr === 'b' ? 3.4 * s : 3 * s * (1 - 0.35 * clamp((bm(cx) - cy) / (70 * s), 0, 1)), rx = sr === 'b' ? 2.5 * s : 3.2 * s;
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
function _chromDraad(i, P, r, seed, N) { // lange kronkelende draad in het territorium van chromosoom i (lokale coördinaten)
  const pts = []; let px = P.x, py = P.y, an = hash(i * 7 + seed) * 6.283; const terr = P.ln * 0.65 + r * 0.06;
  for (let k = 0; k < N; k++) { an += (hash(i * 131 + k * 17 + seed) - 0.5) * 0.9 + Math.sin(k * 0.37 + i) * 0.18; const st = r * 0.03;
    let nx = px + Math.cos(an) * st, ny = py + Math.sin(an) * st; const dx = nx - P.x, dy = ny - P.y, d = Math.hypot(dx, dy);
    if (d > terr) { an = Math.atan2(-dy, -dx) + (hash(k + i) - 0.5); nx = px + Math.cos(an) * st; ny = py + Math.sin(an) * st; }
    const dk = Math.hypot(nx, ny); if (dk > r * 0.86) { nx *= r * 0.86 / dk; ny *= r * 0.86 / dk; an += Math.PI * 0.6; }
    px = nx; py = ny; pts.push([px, py]); }
  return pts;
}
function _chromDoel(P, s, w, coils) { // punt op de opgerolde X: s 0..0.5 = chromatide 1 (boven → onder), 0.5..1 = chromatide 2 (onder → boven)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2; // u: 0 = boven, 1 = onder
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42, cy = yy + Math.cos(ph) * w * 0.12;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
function chromatideX(ctx, x, y, len, rot, o = {}) { // losse X (twee zusterchromatiden + centromeer) in de stijl van kernChromatine
  const { a = 1, w = len * 0.16, kleur = C.kernR, donker = C.kern, cen = 0.38, uiteen = 0, coils = 9 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + uiteen * w * 1.2);
    ctx.beginPath(); ctx.moveTo(off + k * w * 0.5, -len * cen); ctx.quadraticCurveTo(off, -len * cen * 0.4, off * 0.75, 0); ctx.quadraticCurveTo(off, len * (1 - cen) * 0.4, off + k * w * 0.5, len * (1 - cen));
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1); // windingen van de oprolling
    for (let q = 0; q < coils * 2; q++) { const u = q / (coils * 2), yy = -len * cen + u * len, b = Math.abs(yy) / len, cx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * b * w * 0.5;
      ctx.beginPath(); ctx.ellipse(cx, yy, w * 0.42, w * 0.13, 0.25, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); } });
  if (uiteen < 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * (1 - uiteen / 0.3), donker);
  ctx.restore();
}
function kernChromatine(ctx, cx, cy, r, o = {}) {
  const { a = 1, c = 0, n = 46, seed = 4, membraan = 1, kleuren = null, t = 0, dw = Math.max(1.6, r * 0.009) } = o; if (a <= 0.01) return [];
  const e = ease(c), pos = _chromLayout(n, r, seed);
  ctx.save(); ctx.globalAlpha *= a;
  // kern: nucleoplasma + dubbel kernmembraan met poriën
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.94, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.28); ctx.fill();
  if (membraan > 0.01) { ctx.save(); ctx.globalAlpha *= membraan; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.008);
    [1, 0.975].forEach(f => { ctx.beginPath(); ctx.ellipse(cx, cy, r * f, r * 0.94 * f, 0, 0, 6.283); ctx.stroke(); });
    for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + 0.04; _bioCirc(ctx, cx + Math.cos(an) * r * 0.988, cy + Math.sin(an) * r * 0.94 * 0.988, Math.max(1.4, r * 0.01), C.bgMicro || '#121A26'); } ctx.restore(); }
  // kernlichaampje verdwijnt bij de condensatie
  if (e < 0.95) { ctx.beginPath(); ctx.ellipse(cx + r * 0.22, cy - r * 0.12, r * 0.17, r * 0.14, 0.4, 0, 6.283); shape(ctx, rgba('#4E3A6A', 0.75 * (1 - e)), null); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.965, r * 0.9, 0, 0, 6.283); ctx.clip();
  const N = 90, out = [];
  pos.forEach((P, i) => { const kl = kleuren ? kleuren(i) : C.kernR, dk = kleuren ? _mixHex(kl, '#000000', 0.35) : C.kern; const w = P.ln * 0.17;
    const D = _chromDraad(i, P, r, seed, N); const pts = D.map((p, k) => { const q = _chromDoel(P, k / (N - 1), w, 7 + Math.round(P.ln / r * 12)); return [cx + lerp(p[0], q[0], e), cy + lerp(p[1], q[1], e)]; });
    if (e > 0.6) chromatideX(ctx, cx + P.x, cy + P.y, P.ln, P.rot, { a: (e - 0.6) / 0.4, w, kleur: kl, donker: dk });
    dnaDraad(ctx, pts, { w: lerp(dw, w * 0.34, e * e), kleur: kl, donker: dk, a: 1 - 0.75 * clamp((e - 0.75) / 0.25, 0, 1), helix: false });
    out.push({ x: cx + P.x, y: cy + P.y, len: P.ln, rot: P.rot, nr: P.nr }); });
  ctx.restore(); ctx.restore(); return out;
}

// =====================================================================================
// DNA ROND EIWITTEN (nucleosomen). Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e § 10.1):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (146 baseparen) om een kern van acht histon-eiwitten
//    (een schijf van ± 11 nm breed, ± 6 nm hoog); tussen twee nucleosomen ligt een stukje 'linker'-DNA (± 20–60 bp).
//  - eiwitten zijn grijsblauw (#7A8BA8, C9), DNA paars; de helix is rechtsdraaiend met ongelijke groeven (dnaDraad).
//  - de wikkeling is 3D: het deel achter de schijf is donkerder en wordt eerst getekend.
//  Bekende fouten: een golflijn met losse bolletjes; DNA dat door de schijf heen loopt; linker-DNA dat recht is.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt: R × 2/11).
// =====================================================================================
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const centra = []; for (let i = 0; i < n; i++) centra.push([L * (i + 0.5) / n, (i % 2 ? 1 : -1) * R * 0.45]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283; const rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const th = lerp(th0, th1, k / 160), z = (k / 160 - 0.5) * H * 1.05;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(D); } return { P, Z }; };
  const W = centra.map(wikkel);
  // linker-DNA: van het eind van de ene wikkeling naar het begin van de volgende (licht gebogen)
  const linkers = []; const start = [[-30, centra[0][1] + R * 0.8], W[0].P[0]]; linkers.push(start);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [L + 30, centra[n - 1][1] - R * 0.8]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  // 1) achterkant van de wikkelingen
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  // 2) histon-kern: cilinder (zijkant + bovenvlak) met vier zichtbare bolletjes
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * R * 0.42, c[1] - hz / 2 + Math.sin(an) * ry * 0.42, R * 0.34, ry * 0.34, 0, 0, 6.283); shape(ctx, '#8696B2', '#A4B2CA', 1.2); } });
  // 3) linker-DNA en voorkant van de wikkelingen
  linkers.forEach(pl => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  ctx.restore(); return centra;
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
// DNA-REEKS · BASEVORM (ringvorm). Gekeurd door Kamiel 25 okt 2026 (remake DNA 1, twijfel t2/t3): dé basevorm van de hele
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
  plek: { A: [0.33, 0.67], T: [0.33, 0.67], G: [0.2, 0.5, 0.8], C: [0.2, 0.5, 0.8] }
};

// -------------------------------------------------------------------------------------
// BASE ALS RINGVORM. Recept (bron: OpenStax Biology 2e § 14.2 / Lumen 'Structure of DNA'; NPTEL mol. celbiologie lec 26):
//  - purines (A, G) = zesring + vijfring aan elkaar (breed), pyrimidines (C, T) = één zesring (smal).
//  - een paar is altijd purine + pyrimidine, daardoor is elke sport even lang (helix overal 2 nm breed).
//  - A–T houden elkaar vast met twee waterstofbruggen, G–C met drie (stippen op de paarrand, goud als ze verbonden zijn).
//  - 'past' = samen precies de breedte van de sport én de bindingsplekken recht tegenover elkaar (model; in het echt het
//    patroon van donor- en acceptorplekken).
// (x, y) = aanhechting aan de suiker; dir = +1 (base wijst omlaag) of −1 (omhoog); s = schaal (1 → sport van 200 px).
// Bekende fouten: alle basen even groot (dan zie je niet waarom A niet tegenover G past); letters zonder vorm.
// -------------------------------------------------------------------------------------
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const pur = DNA_BASE.purine[b], L = (pur ? 112 : 72) * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  // steeltje naar de suiker
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke();
  const hex = (cy, r) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const px = r * Math.cos(an), py = cy + r * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  const r6 = w * 0.56;
  if (pur) { // vijfring bij de suiker, zesring naar de partner
    const r5 = w * 0.47, c5 = 10 * s + r5 * 0.95; ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + Math.PI + k * 2 * Math.PI / 5; const px = r5 * Math.cos(an), py = c5 + r5 * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, _mixHex(kl, '#121A26', 0.12), lighten(kl, 0.35), 1.5);
    hex(L - r6 * 0.95, r6); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  } else { hex(10 * s + (L - 10 * s) / 2 + 2 * s, r6 * 1.02); shape(ctx, kl, lighten(kl, 0.35), 1.5); }
  // letter (rechtop, ook als dir = −1)
  ctx.save(); ctx.translate(0, pur ? L - r6 * 0.95 : 10 * s + (L - 10 * s) / 2 + 2 * s); ctx.scale(1, dir); ctx.rotate(-rot * 0); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore();
  // bindingsplekken op de paarrand (dwars op de as, bij y = L)
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 1.1; _bioCirc(ctx, px, L + 1 * s, 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.75, -4 * s, w * 1.5, L + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen tussen twee basen van een sport (x, y1 = paarrand boven, y2 = paarrand onder)
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA_BASE.plek[b].forEach(h => { const px = x + (h - 0.5) * 52 * s * 1.1; ctx.beginPath(); ctx.moveTo(px, y1 + 4 * s); ctx.lineTo(px, y2 - 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) {
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y, px = x - 70 * s - e * 60 * s, py = y - 26 * s - e * 20 * s, bx = x + 8 * s + e * 30 * s, by = y + R * 0.9 + e * 50 * s;
  ctx.save(); ctx.globalAlpha *= a;
  // verbindingen
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3 * s; ctx.globalAlpha *= 1; if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx - R * 0.8, sy - R * 0.45); ctx.stroke(); ctx.restore(); }
  // suiker (vijfhoek, punt naar boven = ring-zuurstof)
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); // ring-O
  // base aan 1' (rechtsonder)
  baseRing(ctx, bx, by - 10 * s, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  // fosfaat
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers; const lab = ["", "1'", "2'", "3'", "4'"]; // pt index: 0 = O, 1 = 1' (rechtsboven), 2 = 2', 3 = 3', 4 = 4'
    [[1, "1'"], [2, "2'"], [3, "3'"], [4, "4'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy); text(ctx, l, pt[k][0] + dx / d * 26 * s, pt[k][1] + dy / d * 26 * s + 9 * s, fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    text(ctx, "5'", sx - R * 1.55, sy - R * 1.3, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by], c3: pt[3], c5: [sx - R * 0.8, sy - R * 0.45] };
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
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + (DNA_BASE.purine[b] ? 112 : 72) * k), B.y - dirAB * (8 * s + (DNA_BASE.purine[c] ? 112 : 72) * k), b, k, bruggenA * (1 - e * 2)); }
    else { const mid = A.y + (B.y - A.y) * (DNA_BASE.purine[b] ? 0.6 : 0.4); ctx.lineWidth = 11 * s; ctx.strokeStyle = DNA_BASE.base[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = DNA_BASE.base[c]; ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  // plekken van de groeven langs de bovenrand (voor labels): kleine groef tussen de toppen die 140° uit elkaar liggen
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}

// Geslachtsorganen en puberteit 2.0 — tekenhulpen. Deel 1: hulpjes uit versie 1.x (tag, chip, regel, startlamp, meetlat, zaadcel, eicel, pad, vrouwSchema, eierstokGroot, cyclusKlok …).
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 26) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function bubbel(ctx, x, y, s2, col = '#F2F2EE', a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = Math.max(56, ctx.measureText(s2).width + 30); roundRect(ctx, x - w / 2, y - px - 12, w, px + 24, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 8, y + 12); ctx.lineTo(x, y + 26); ctx.lineTo(x + 8, y + 12); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 800), '#121A26', 'center'); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function knoop(ctx, x, y, w, h, t1, t2, col, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed; ctx.shadowColor = col; ctx.shadowBlur = 30; roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(col, 0.25), null); ctx.restore(); } roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(C.bgSchema, 0.95), col, 2.5); text(ctx, t1, x, y + (t2 ? -4 : 12), fTekst(34, 700), C.text, 'center'); if (t2) text(ctx, t2, x, y + 34, fTekst(24), C.text2, 'center'); ctx.restore(); }
const fadeIn = (q, w, n = 1) => q.on(w, n);

// ---------- hoofd in profiel met hypothalamus en hypofyse (zoals Hormonen 3) ----------
function hoofdProfiel(ctx, x, y, s = 1, o = {}) { // v1.1: echte hersenen in zijaanzicht (lib_bio hoofdHersenen); oorsprong blijft gelijk
  const { a = 1, hyp = 0, hth = 0 } = o; return hoofdHersenen(ctx, x + 60 * s, y + 10 * s, s * 0.72, { a, hth: Math.max(0.15, hth), hyp: Math.max(0.15, hyp), hthCol: HK.klier, hypCol: HK.klier }); }

// ---------- startlamp boven een hoofd: rood = nog niet, groen = begonnen ----------
function startlamp(ctx, x, y, groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y - 62, 52, 104, 12); shape(ctx, '#2A2F3E', '#6B7287', 2); circ(ctx, x, y - 34, 16, groen > 0.5 ? '#5A2A2A' : '#E05A4A'); circ(ctx, x, y + 14, 16, groen > 0.5 ? '#6FD08A' : '#25402E'); ctx.restore(); }
// ---------- meetlat aan de muur ----------
function meetlat(ctx, x, y0, y1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y1, 44, y0 - y1, 6); shape(ctx, '#E6D7B0', '#B8A27A', 2); ctx.strokeStyle = '#6A5A3A'; ctx.lineWidth = 2; for (let yy = y0; yy > y1 + 4; yy -= 20) { const k = Math.round((y0 - yy) / 20) % 5 === 0; ctx.beginPath(); ctx.moveTo(x - 22, yy); ctx.lineTo(x - (k ? 0 : 10), yy); ctx.stroke(); } ctx.restore(); }

// ---------- zaadcel en eicel ----------
function zaadcel(ctx, x, y, ang, t, s = 1, a = 1, col = '#F2F2EE') { zaadcelEcht(ctx, x, y, ang, t, s * 0.9, { a, col, slag: 1.6 }); } // v1.1: kop + staart ± 10× zo lang (lib_bio)
function eicel(ctx, x, y, r, a = 1) { eicelEcht(ctx, x, y, r * 0.78, a, r >= 12); } // v1.1: eicel met doorzichtige laag en stralenkrans (lib_bio)

// polyline-helpers voor routes
function padLengte(pts) { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; }
function padPunt(pts, d) { const L = padLengte(pts); d = clamp(d, 0, L[L.length - 1]); let i = 1; while (i < pts.length - 1 && L[i] < d) i++; const u = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1); const x = lerp(pts[i - 1][0], pts[i][0], u), y = lerp(pts[i - 1][1], pts[i][1], u); return [x, y, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; }
function padTot(pts, k) { return padLengte(pts)[k]; }
function lijnPad(ctx, pts, col, lw, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); gladC(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

// =======================================================================================
// Mannelijke geslachtsorganen, schematische doorsnede (zijaanzicht, voorkant rechts). Ontwerpcoördinaten rond (700, 480).
const MK = { zaadbal: '#D9A48F', bijbal: C.oker, leider: C.goud, blaasjes: C.groen, prostaat: C.paars, blaas: C.teal, buis: '#C9CED6', zwel: '#B5574A' };
const VAS = [[786, 752], [764, 700], [768, 630], [826, 586], [872, 470], [878, 360], [840, 285], [760, 262], [680, 290], [652, 360], [672, 440], [712, 480], [742, 498], [762, 516]];
const URETHRA = [[765, 462], [762, 500], [764, 538], [790, 566], [850, 566], [884, 590], [900, 660], [918, 740], [934, 786]];
const ZAADROUTE = [[808, 712], [792, 690], [772, 660], [770, 700], [782, 746]].concat(VAS.slice(1)).concat(URETHRA.slice(3)).concat([[948, 840]]);
// indexen in ZAADROUTE: 0 zaadbal, 2 bijbal-kop, 4 bijbal-staart, 8 langs de blaas (voor), 13 achter de blaas bij het zaadblaasje, 15 prostaat, 17 urinebuis, 22 penis-punt, 23 buiten
function manSchema(ctx, ox, oy, s, o = {}) {
  const { a = 1, hl = {}, zw = 0, buisjes = 0, t = 0, kring = 0 } = o; if (a <= 0.01) return (x, y) => [ox + (x - 700) * s, oy + (y - 480) * s];
  const P = (x, y) => [ox + (x - 700) * s, oy + (y - 480) * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(ox, oy); ctx.scale(s, s); ctx.translate(-700, -480); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const glow = (x, y, r, col, k) => { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.45 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); };
  // lichaam
  ctx.beginPath(); ctx.moveTo(430, 140); ctx.quadraticCurveTo(350, 400, 400, 600); ctx.quadraticCurveTo(440, 700, 580, 720); ctx.quadraticCurveTo(700, 730, 748, 650); ctx.lineTo(870, 548); ctx.quadraticCurveTo(940, 500, 950, 400); ctx.quadraticCurveTo(975, 260, 960, 140); ctx.closePath(); shape(ctx, rgba(C.mens, 0.14), rgba(C.mens, 0.7), 2);
  // endeldarm (achter blaas en prostaat) en schaambeen (vóór de blaas): oriëntatie
  ctx.save(); ctx.strokeStyle = rgba('#9A7A6A', 0.4); ctx.lineWidth = 36; ctx.beginPath(); ctx.moveTo(560, 230); ctx.bezierCurveTo(575, 360, 585, 470, 640, 600); ctx.stroke(); ctx.strokeStyle = rgba(C.bgSchema, 0.75); ctx.lineWidth = 28; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.translate(856, 478); ctx.rotate(-0.35); ctx.beginPath(); ctx.ellipse(0, 0, 17, 44, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.55), BIO.botS, 2); ctx.restore();
  // balzak
  ctx.beginPath(); ctx.ellipse(800, 706, 76, 88, 0.12, 0, 6.283); shape(ctx, rgba(C.mens, 0.2), rgba(C.mens, 0.7), 2);
  glow(806, 706, 110, MK.zaadbal, hl.zaadbal || 0);
  // zaadbal
  ctx.beginPath(); ctx.ellipse(808, 710, 40, 52, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2);
  if (buisjes > 0.01) { ctx.save(); ctx.globalAlpha *= buisjes; ctx.beginPath(); ctx.ellipse(808, 710, 36, 48, 0.2, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba('#7A3A30', 0.8); ctx.lineWidth = 2.5; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = 778 + u * 64, py = 676 + r * 20 + Math.sin(u * 18 + r) * 7; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
  // bijbal (sikkel tegen de achterkant van de zaadbal)
  glow(774, 700, 70, MK.bijbal, hl.bijbal || 0);
  ctx.strokeStyle = MK.bijbal; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(796, 662); ctx.quadraticCurveTo(758, 664, 762, 712); ctx.quadraticCurveTo(764, 744, 788, 752); ctx.stroke();
  // blaas
  glow(770, 380, 140, MK.blaas, hl.blaas || 0);
  ctx.beginPath(); ctx.ellipse(770, 378, 96, 86, 0, 0, 6.283); shape(ctx, rgba(MK.blaas, 0.3), MK.blaas, 2.5);
  // zaadblaasje (achter de blaas)
  glow(662, 420, 90, MK.blaasjes, hl.blaasjes || 0);
  ctx.save(); ctx.translate(664, 418); ctx.rotate(-0.35); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283; const r = 1 + 0.12 * Math.sin(an * 5); const px = Math.cos(an) * 26 * r, py = Math.sin(an) * 60 * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(MK.blaasjes, 0.55), MK.blaasjes, 2); ctx.restore();
  ctx.strokeStyle = MK.blaasjes; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(682, 468); ctx.quadraticCurveTo(700, 486, 726, 492); ctx.stroke();
  // prostaat
  glow(760, 502, 90, MK.prostaat, hl.prostaat || 0);
  ctx.beginPath(); ctx.ellipse(760, 502, 50, 36, 0.1, 0, 6.283); shape(ctx, rgba(MK.prostaat, 0.55), lighten(MK.prostaat, 0.3), 2);
  // zaadleider
  glow(870, 420, 80, MK.leider, hl.leider || 0);
  lijnPad(ctx, VAS, MK.leider, 7 + 3 * (hl.leider || 0));
  // penis met zwellichamen
  ctx.beginPath(); ctx.moveTo(866, 548); ctx.quadraticCurveTo(882, 660, 904, 770); ctx.quadraticCurveTo(930, 806, 956, 772); ctx.quadraticCurveTo(944, 650, 912, 524); ctx.closePath(); shape(ctx, rgba(C.mens, 0.24), rgba(C.mens, 0.75), 2);
  if (zw > 0.01) { ctx.save(); ctx.globalAlpha *= 0.3 + 0.7 * zw; ctx.beginPath(); ctx.moveTo(880, 560); ctx.quadraticCurveTo(892, 660, 910, 752); ctx.quadraticCurveTo(926, 772, 940, 752); ctx.quadraticCurveTo(930, 650, 904, 548); ctx.closePath(); shape(ctx, rgba(MK.zwel, 0.25 + 0.45 * zw), rgba(MK.zwel, 0.8), 1.5); ctx.restore(); }
  // urinebuis
  glow(880, 620, 80, MK.buis, hl.buis || 0);
  lijnPad(ctx, URETHRA, MK.buis, 5 + 3 * (hl.buis || 0));
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(765, 466, 18, 8, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return P;
}
function manNamen(ctx, P, o) { // o: {naam: alpha}
  const N = { zaadbal: ['zaadbal', 800, 830, 'center'], balzak: ['balzak', 712, 770, 'right'], bijbal: ['bijbal', 748, 666, 'right'], leider: ['zaadleider', 892, 420, 'left'], blaas: ['blaas', 770, 392, 'center'],
    blaasjes: ['zaadblaasje', 632, 400, 'right'], prostaat: ['prostaat', 704, 528, 'right'], buis: ['urinebuis', 966, 630, 'left'], penis: ['penis', 972, 812, 'left'], zwel: ['zwellichamen', 966, 712, 'left'], kring: ['kringspier', 790, 456, 'left'] };
  for (const [k, al] of Object.entries(o)) { const n = N[k]; if (!n || al <= 0.01) continue; const [x, y] = P(n[1], n[2]); naamBij(ctx, n[0], null, x, y, al, n[3]); }
}

// =======================================================================================
// Vrouwelijke geslachtsorganen, schematisch vooraanzicht. Ontwerpcoördinaten rond (960, 480).
const VK = { stok: C.oker, leider: '#E0A08C', wand: '#C98A7E', slijm: '#B5574A', vagina: '#D9A48F' };
const EILEIDER_L = [[884, 352], [820, 318], [744, 314], [688, 340], [656, 382]];
function vrouwSchema(ctx, ox, oy, s, o = {}) {
  const { a = 1, hl = {}, dik = 0.5, eisprong = -1, t = 0 } = o; const P = (x, y) => [ox + (x - 960) * s, oy + (y - 480) * s]; if (a <= 0.01) return P;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(ox, oy); ctx.scale(s, s); ctx.translate(-960, -480); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const glow = (x, y, r, col, k) => { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.45 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); };
  // bekkenomtrek (zacht)
  ctx.strokeStyle = rgba(C.mens, 0.35); ctx.lineWidth = 3; ctx.setLineDash([10, 12]); for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(960 + d * 400, 200); ctx.quadraticCurveTo(960 + d * 450, 520, 960 + d * 250, 860); ctx.stroke(); } ctx.setLineDash([]);
  for (const d of [-1, 1]) { // eileiders, trechters, eierstokken
    const pts = EILEIDER_L.map(([x, y]) => [d < 0 ? x : 1920 - x, y]);
    glow(pts[2][0], pts[2][1], 110, VK.leider, hl.leider || 0); lijnPad(ctx, pts, VK.leider, 11);
    const [fx, fy] = pts[pts.length - 1]; ctx.save(); ctx.translate(fx, fy); ctx.rotate(d < 0 ? 0.5 : -0.5); ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-30, 34); ctx.lineTo(30, 34); ctx.lineTo(6, -4); ctx.closePath(); shape(ctx, rgba(VK.leider, 0.55), VK.leider, 2);
    ctx.strokeStyle = VK.leider; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const x0 = -28 + i * 11.2; ctx.beginPath(); ctx.moveTo(x0, 34); ctx.lineTo(x0 + Math.sin(t * 2 + i) * 3, 52 + (i % 2) * 6); ctx.stroke(); } ctx.restore();
    const sx = d < 0 ? 700 : 1220, sy = 448; glow(sx, sy, 90, VK.stok, hl.stok || 0);
    ctx.strokeStyle = rgba(VK.wand, 0.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx - d * 44, sy - 4); ctx.lineTo(960 + d * 84, 400); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(sx, sy, 50, 30, d * 0.15, 0, 6.283); shape(ctx, rgba(VK.stok, 0.7), lighten(VK.stok, 0.3), 2);
    for (let i = 0; i < 7; i++) circ(ctx, sx - 30 + hash(i * 5 + (d + 1)) * 60, sy - 16 + hash(i * 7 + 3 + d) * 32, 3 + 3 * hash(i * 11 + d), rgba('#F2E6C8', 0.8));
  }
  // baarmoeder
  glow(960, 420, 170, VK.wand, hl.baarmoeder || 0);
  ctx.beginPath(); ctx.moveTo(872, 344); ctx.quadraticCurveTo(856, 460, 926, 548); ctx.lineTo(932, 604); ctx.lineTo(988, 604); ctx.lineTo(994, 548); ctx.quadraticCurveTo(1064, 460, 1048, 344); ctx.quadraticCurveTo(960, 262, 872, 344); ctx.closePath(); shape(ctx, rgba(VK.wand, 0.6), lighten(VK.wand, 0.25), 2.5);
  // holte met slijmvlies
  glow(960, 420, 110, VK.slijm, hl.slijm || 0);
  ctx.beginPath(); ctx.moveTo(904, 360); ctx.quadraticCurveTo(960, 346, 1016, 360); ctx.quadraticCurveTo(990, 450, 964, 540); ctx.lineTo(956, 540); ctx.quadraticCurveTo(930, 450, 904, 360); ctx.closePath(); ctx.fillStyle = rgba('#1A1420', 0.6); ctx.fill(); ctx.strokeStyle = rgba(VK.slijm, 0.85); ctx.lineWidth = 4 + 16 * dik; ctx.stroke();
  // baarmoederhals
  glow(960, 580, 70, VK.wand, hl.hals || 0);
  ctx.strokeStyle = rgba('#1A1420', 0.8); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(960, 540); ctx.lineTo(960, 606); ctx.stroke();
  // vagina
  glow(960, 700, 90, VK.vagina, hl.vagina || 0);
  ctx.beginPath(); ctx.moveTo(926, 604); ctx.quadraticCurveTo(920, 700, 924, 800); ctx.lineTo(996, 800); ctx.quadraticCurveTo(1000, 700, 994, 604); ctx.closePath(); shape(ctx, rgba(VK.vagina, 0.45), lighten(VK.vagina, 0.25), 2);
  ctx.strokeStyle = rgba('#1A1420', 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, 610); ctx.lineTo(960, 800); ctx.stroke();
  ctx.restore();
  // eicel bij de eisprong: van de rechtereierstok naar de trechter en de eileider in
  if (eisprong >= 0) { const pts = [[1220, 448], [1262, 420]].concat(EILEIDER_L.map(([x, y]) => [1920 - x, y]).reverse().slice(1)).concat([[1000, 380]]); const L = padLengte(pts); const [x, y] = padPunt(pts, L[L.length - 1] * eisprong); const [sx, sy] = P(x, y); eicel(ctx, sx, sy, 11 * s, 1); }
  return P;
}
function vrouwNamen(ctx, P, o) {
  const N = { stok: ['eierstok', 700, 512, 'center'], leider: ['eileider', 760, 290, 'center'], trechter: ['trechter', 1298, 446, 'left'], baarmoeder: ['baarmoeder', 960, 252, 'center'], slijm: ['baarmoederslijmvlies', 1062, 520, 'left'], hals: ['baarmoederhals', 1010, 600, 'left'], vagina: ['vagina', 1012, 740, 'left'] };
  for (const [k, al] of Object.entries(o)) { const n = N[k]; if (!n || al <= 0.01) continue; const [x, y] = P(n[1], n[2]); naamBij(ctx, n[0], null, x, y, al, n[3]); }
}
// buitenkant, los schema (vooraanzicht, sterk vereenvoudigd)
function buitenSchema(ctx, x, y, s, o = {}) { const { a = 1, lip = 1, cli = 0, buis = 0, vag = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  paneel(ctx, x - 150 * s, y - 230 * s, 300 * s, 440 * s, ''); metaText(ctx, 'buitenkant · schema', x, y - 190 * s, C.grain, 'center', 20);
  ctx.save(); ctx.globalAlpha *= lip; ctx.beginPath(); ctx.ellipse(x, y + 10 * s, 78 * s, 150 * s, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.3), rgba(C.mens, 0.8), 2); ctx.beginPath(); ctx.ellipse(x, y + 20 * s, 34 * s, 112 * s, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.5), '#D9A48F', 2); ctx.restore();
  circ(ctx, x, y - 82 * s, 10 * s, rgba('#E0A08C', 0.4 + 0.6 * cli), '#E0A08C', 2);
  circ(ctx, x, y - 30 * s, 5 * s, rgba(C.teal, 0.4 + 0.6 * buis), C.teal, 2);
  ctx.beginPath(); ctx.ellipse(x, y + 40 * s, 14 * s, 30 * s, 0, 0, 6.283); shape(ctx, rgba('#1A1420', 0.6), rgba('#D9A48F', 0.6 + 0.4 * vag), 2);
  ctx.restore(); }

// ---------- eierstok vergroot met eicellen (follikels) ----------
function eierstokGroot(ctx, x, y, rx, ry, o = {}) { // v1.1: doorsnede met schors vol follikels, merg met vaten, rijping en eisprong (lib_bio)
  const { a = 1, n = 160, groei = 0, eis = 0, t = 0 } = o; return eierstokDoorsnede(ctx, x, y, rx, ry, { a, n: Math.round(n * 0.55), groei, eis, t }); }

// ---------- cyclusklok ----------
function cyclusKlok(ctx, cx, cy, r, dag, o = {}) { const { a = 1, fasen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const an = (d) => -Math.PI / 2 + (d - 1) / 28 * 6.283;
  circ(ctx, cx, cy, r, rgba(C.fill, 0.5), C.line, 2);
  const boog = (d0, d1, col, rr, lw, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(cx, cy, rr, an(d0), an(d1)); ctx.stroke(); ctx.restore(); };
  boog(1, 6, VK.slijm, r - 22, 30, fasen); boog(6, 14, C.goud, r - 22, 30, fasen); boog(14.6, 29, C.teal, r - 22, 30, fasen);
  for (let d = 1; d <= 28; d++) { const a2 = an(d); ctx.strokeStyle = rgba(C.text, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a2) * (r - 46), cy + Math.sin(a2) * (r - 46)); ctx.lineTo(cx + Math.cos(a2) * (r - 54), cy + Math.sin(a2) * (r - 54)); ctx.stroke(); }
  [[1, 'dag 1'], [14, 'dag 14'], [21, 'dag 21'], [7, 'dag 7']].forEach(([d, l]) => { const a2 = an(d); text(ctx, l, cx + Math.cos(a2) * (r + 40), cy + Math.sin(a2) * (r + 40) + 8, fTekst(22, 600), C.text2, 'center'); });
  if (fasen > 0.01) { ctx.save(); ctx.globalAlpha *= fasen; [[3.5, 'menstruatie', VK.slijm, 120], [10, 'eicel rijpt', C.goud, 130], [21.5, 'na de eisprong', C.teal, 175]].forEach(([d, l, c, rr]) => { const a2 = an(d); naamBij(ctx, l, null, cx + Math.cos(a2) * (r - rr), cy + Math.sin(a2) * (r - rr) + 12, 1, 'center', c); }); const a4 = an(14.3); eicel(ctx, cx + Math.cos(a4) * (r - 22), cy + Math.sin(a4) * (r - 22), 13, 1); ctx.restore(); }
  const a3 = an(dag); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a3) * (r - 70), cy + Math.sin(a3) * (r - 70)); ctx.stroke(); circ(ctx, cx, cy, 10, C.text);
  ctx.restore(); return an; }
// dikte van het slijmvlies over de dagen (eenvoudig)
function slijmDikte(d) { d = ((d - 1) % 28 + 28) % 28 + 1; if (d <= 5) return 0.15 + 0.03 * d; if (d <= 14) return 0.3 + (d - 5) / 9 * 0.45; if (d <= 27) return 0.75 + 0.15 * Math.sin((d - 14) / 13 * Math.PI); return 0.5; }


// Deel 2: nieuwe objecten (ronde 2), kandidaat voor bibliotheek/lib_bio.js
// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 1 (testvel-niveau). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, vorm, k] = HORM[soort];
  hormoonVorm(ctx, x, y, r * k, vorm, a, col);
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); } // C8: één deeltje volgen, goud omlijnd (geen gloed)
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
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hypothalamusweefsel (boven) als zachte band, met de derde hersenkamer als spleet in het midden
  ctx.beginPath(); bioPad(ctx, [P(-430, -330), P(-200, -360), P(200, -360), P(430, -330), P(430, -70), P(150, -40), P(60, 0), P(-60, 0), P(-150, -40), P(-430, -70)], true);
  shape(ctx, rgba(BIO.brein, 0.32), rgba(BIO.breinS, 0.7), 2);
  ctx.beginPath(); bioPad(ctx, [P(-14, -360), P(-10, -200), P(0, -90), P(10, -200), P(14, -360)], true); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill();
  // Turks zadel (bot) onder de hypofyse
  ctx.beginPath(); bioPad(ctx, [P(-300, 210), P(-250, 330), P(-60, 420), P(140, 420), P(300, 340), P(350, 220)], false); ctx.strokeStyle = rgba(BIO.bot, 0.7); ctx.lineWidth = 16 * s; ctx.stroke();
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
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (naar rechtsonder)
  const UIT = [P(250, 300), P(330, 350), P(420, 420), P(520, 470)];
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
// Geslachtsorganen en puberteit 2.0 — scènes per alinea (26 okt 2026). Gezichten blijven heel: organen staan in een
// zoomcirkel NÁÁST het lichaam (BEELDAFSPRAKEN, Kamiel 25 okt 2026), nooit over gezicht of kleding.
// Bibliotheek: hoofdHersenen, vrouwOrganenVoor, zaadbalWeefsel, eierstokDoorsnede, baarmoederwand, zenuwcel, vetweefsel,
// zaadcelEcht, eicelEcht, bloedvat. Nieuw (teken_g2.js deel 2): hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, hormDeeltje.

const NAV = { y: 900 }; // vloer
function zoomNaast(ctx, sx, sy, x, y, r, a, caption, draw) { if (a <= 0.01) return; zoomCircle(ctx, x, y, r * (0.6 + 0.4 * ease(a)), sx, sy, caption, a, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); draw(); }); }
function hersenenRond(ctx, x, y, r, o = {}) { const s = r * 1.6 / 470; hoofdHersenen(ctx, x + 20 * s, y + 30 * s, s, o); }
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#E6E1D3'); circ(ctx, x + r * 0.45, y - r * 0.2, r * 0.9, C.bgSchema); ctx.restore(); }
function bloedbaan(ctx, pts, t, soorten, a = 1, n = 9, volg = -1) { if (a <= 0.01) return; const D = bioDicht(pts, 20); ctx.save(); ctx.globalAlpha *= a * 0.55; lijnStrip(ctx, D, BIO.bloed, 7); ctx.restore();
  for (let i = 0; i < n; i++) { const [px, py] = bioPunt(D, (i / n + t * 0.06) % 1); hormDeeltje(ctx, px, py, soorten[i % soorten.length], 7, a); }
  if (volg >= 0) { const [px, py] = bioPunt(D, clamp(volg, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 8, a, true); } }
function lijnStrip(ctx, P, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function stotenGrafiek(ctx, gx, gy, gw, gh, tot, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.nacht > 0.01) { ctx.save(); ctx.globalAlpha *= o.nacht; for (let k = 8; k < 16; k += 1) { ctx.fillStyle = rgba('#0D1420', 0.55); ctx.fillRect(gx + (k + 0.55) / 16 * gw, gy, 0.35 / 16 * gw, gh); } ctx.restore(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
  for (const v of [0, 4, 8, 12, 16]) text(ctx, String(v), gx + v / 16 * gw, gy + gh + 36, fTekst(24), C.text2, 'center');
  metaText(ctx, 'leeftijd (jaar)', gx + gw, gy + gh + 74, C.grain, 'right', 20); metaText(ctx, 'stoten GnRH (schets)', gx, gy - 16, C.grain, 'left', 20);
  ctx.fillStyle = rgba(C.goud, 0.12 * (o.band == null ? 1 : o.band)); ctx.fillRect(gx + 8 / 16 * gw, gy, 6 / 16 * gw, gh); text(ctx, 'start: ergens tussen 8 en 14', gx + 11 / 16 * gw, gy + 32, fTekst(22, 700), rgba(C.goud, o.band == null ? 1 : o.band), 'center');
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh); let last = null;
  for (let k = 0; k < 1600; k++) { const age = k / 100; if (age > tot) break; const f = age < 8 ? 0.5 : lerp(0.5, 2.6, (age - 8) / 6); const hgt = age < 8 ? 0.1 : lerp(0.1, 0.85, clamp((age - 8) / 6, 0, 1)); const ph = (age * f * 2) % 1; const v = ph < 0.2 ? Math.sin(ph / 0.2 * Math.PI) * hgt : 0; last = [gx + age / 16 * gw, gy + gh - v * (gh - 50)]; ctx.lineTo(last[0], last[1]); }
  ctx.stroke(); ctx.restore(); }
function maatglas(ctx, x, y, w, h, f, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // f = [zaadcellen, blaasjes, prostaat] 0..1 (vulgraad per laag)
  const parts = [[0.05, '#F2F2EE'], [0.6, C.groen], [0.3, C.paars]]; let yy = y + h;
  parts.forEach(([frac, col], i) => { const hh = h * 0.95 * frac * clamp(f[i], 0, 1); ctx.fillStyle = rgba(col, 0.75); ctx.fillRect(x + 4, yy - hh, w - 8, hh); yy -= hh; });
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y - 10); ctx.stroke();
  for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x + w - 18, y + h - i * h / 6); ctx.lineTo(x + w, y + h - i * h / 6); ctx.stroke(); } ctx.restore(); }
function meioseMini(ctx, x, y, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // 1 cel → 2 → 4 (vlak, kort; zelfde idee als Celdeling)
  const st = u < 0.33 ? 0 : u < 0.66 ? 1 : 2; const n = [1, 2, 4][st], r = [34, 26, 19][st];
  for (let i = 0; i < n; i++) { const px = x + (i - (n - 1) / 2) * r * 2.3; ctx.beginPath(); ctx.arc(px, y, r, 0, 6.283); shape(ctx, rgba('#E6D7B0', 0.35), '#E6D7B0', 2); ctx.beginPath(); ctx.arc(px, y, r * 0.42, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); }
  text(ctx, ['46 chromosomen', '', '23 per zaadcel'][st], x, y + 70, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
function zaadVolg(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 5, C.goud); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.stroke(); ctx.restore(); } // orgaanschaal: zaadcel als ring met stip, geen staart
function eileiderStuk(ctx, ex, ey, a = 1) { // kort stuk eileider met trechter en franjes rechts van de eierstok (eierstokDoorsnede rx 210)
  ctx.save(); ctx.globalAlpha *= Math.max(0.55, a); const col = '#C98088', lc = '#E3A6AC';
  ctx.beginPath(); ctx.moveTo(ex + 150, ey - 120); ctx.bezierCurveTo(ex + 240, ey - 210, ex + 330, ey - 170, ex + 400, ey - 230); ctx.strokeStyle = rgba(col, 0.75); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = rgba('#5A2A36', 0.55); ctx.lineWidth = 12; ctx.stroke();
  for (let i = 0; i < 7; i++) { const an = 2.2 + i * 0.32; ctx.beginPath(); ctx.moveTo(ex + 150, ey - 120); ctx.quadraticCurveTo(ex + 150 + Math.cos(an) * 40, ey - 120 + Math.sin(an) * 40, ex + 150 + Math.cos(an + 0.15) * 66, ey - 120 + Math.sin(an + 0.15) * 66); ctx.strokeStyle = lc; ctx.lineWidth = 7; ctx.stroke(); }
  ctx.restore(); naamBij(ctx, 'eileider', 'trechter met franjes', ex + 330, ey - 270, a, 'center'); }
function samZij(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ zij: true, kijk: 1, t, uit: 'neutraal' }, o)) || {}; }

Object.assign(SCENES, {
  title(ctx, t) { meetlat(ctx, 1620, 880, 380, 1); persoon(ctx, 'daan', 1500, 880, 360 / 0.95, { uit: 'denkt', pose: 'denk', kijk: 1, t }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { klasAchtergrond(ctx);
    const groei = q.on('Nu', 1, 1.4); const hS = lerp(370, 470, groei), hD = lerp(370, 382, groei);
    meetlat(ctx, 1250, 880, 360, 1);
    persoon(ctx, 'daan', 1080, 880, hD / 0.95, { uit: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'bezorgd' : (q.on('Nee', 1) > 0.5 ? 'blij' : 'neutraal'), pose: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'schouders' : 'staan', kijk: 1, t });
    persoon(ctx, 'sam', 1420, 880, hS / 1.04, { uit: q.on('stem', 1) > 0.5 && q.on('gegroeid', 1) < 0.5 ? 'praat' : 'blij', pose: 'staan', kijk: -1, t });
    const st = q.on('Vorig', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - 372); ctx.lineTo(1282, 880 - 372); ctx.stroke(); ctx.restore(); chip(ctx, 'vorig jaar: even groot', 1250, 300, C.goud, st * (1 - q.on('Nu', 1)), 24); }
    if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= groei; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - hS); ctx.lineTo(1282, 880 - hS); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'een kop groter', 1590, 330, C.groen, q.on('kop', 1), 24);
    const sb = q.on('stem', 1) * (1 - q.on('mis', 1)); if (sb > 0.01) { bubbel(ctx, 1560, 430, 'Hoi!', '#F2F2EE', sb, 30); chip(ctx, 'lage stem', 1720, 470, C.teal, sb, 22); }
    chip(ctx, 'bijna niet gegroeid', 900, 420, C.text2, q.on('gegroeid', 1) * (1 - q.on('startsein', 1)), 24);
    vraagteken(ctx, 960, 470, q.on('mis', 1) * (1 - q.on('Nee', 1)), 90);
    const sl = q.on('startsein', 1); startlamp(ctx, 1080, 392, 0, sl); startlamp(ctx, 1420, 880 - hS - 90, 1, sl);
    chip(ctx, 'startsein: nog niet', 1080, 292, C.koraal, sl, 24); chip(ctx, 'startsein: gegeven', 1500, 880 - hS - 170, C.groen, sl, 24); },
  s02(ctx, t, q) { klasAchtergrond(ctx); meetlat(ctx, 1250, 880, 360, 1);
    persoon(ctx, 'daan', 1080, 880, 382 / 0.95, { uit: 'denkt', pose: 'staan', kijk: 1, t }); persoon(ctx, 'sam', 1420, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t });
    startlamp(ctx, 1080, 392, 0, 1); startlamp(ctx, 1420, 320, 1, 1);
    tag(ctx, 'wie geeft het startsein?', 640, 560, C.goud, 1, 'center', 34); vraagteken(ctx, 640, 720, q.on('denk', 1), 110); },

  // ---------- H1 Het startsein ----------
  s05(ctx, t, q) { bg(ctx, 'schema');
    const p = samZij(ctx, 430, NAV.y, 700, t); const hd = p.hoofd || { x: 430, y: 300, r: 40 };
    const z = q.on('hypothalamus', 1, 1); const zx = 980, zy = 380, zr = 300;
    zoomNaast(ctx, hd.x + hd.r * 0.2, hd.y, zx, zy, zr, z, 'hersenen van opzij · vergroot', () => hersenenRond(ctx, zx, zy, zr, { hth: 0.5 + 0.5 * z, hyp: 0.3, t }));
    if (z > 0.6) { const s = zr * 1.6 / 470; const hx = zx + 20 * s, hy = zy + 30 * s; ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, hy, 36, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'hypothalamus', 'een klein deel van je hersenen', zx + zr + 30, zy - 40, z, 'left');
      const gh = q.on('gehemelte', 1); if (gh > 0.01) { ctx.save(); ctx.globalAlpha *= gh * (1 - q.on('Zaadballen', 1)); ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(hx + 40 * s * 2.2, hy + 125 * s); ctx.lineTo(hx + 210 * s, hy + 118 * s); ctx.stroke(); ctx.restore(); naamBij(ctx, 'gehemelte', null, zx + zr + 30, zy + 120, gh * (1 - q.on('Zaadballen', 1)), 'left', C.teal); } }
    const ge = q.on('Zaadballen', 1); if (ge > 0.01) { ctx.save(); ctx.globalAlpha *= ge; paneel(ctx, 1320, 560, 520, 260, '');
      ctx.beginPath(); ctx.ellipse(1440, 680, 34, 44, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); text(ctx, 'zaadballen', 1440, 760, fTekst(24, 700), C.text, 'center');
      ctx.beginPath(); ctx.ellipse(1700, 680, 44, 28, 0, 0, 6.283); shape(ctx, rgba(VK.stok, 0.7), lighten(VK.stok, 0.3), 2); text(ctx, 'eierstokken', 1700, 760, fTekst(24, 700), C.text, 'center');
      regel(ctx, 'al vanaf je geboorte', 1580, 610, 1, C.text2, 24, 'center', 700); ctx.restore(); }
    chip(ctx, 'kindertijd: bijna stil', 1580, 880, C.text2, q.on('stil', 1), 24); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const gr = q.on('Ergens', 1);
    const nu = clamp((t - q.at('Dan')) / 4, 0, 1); const tot = lerp(8, 13, nu); const stootFase = (t * lerp(0.35, 0.9, nu)) % 1;
    hypofysePoort(ctx, 480, 520, 0.85, { puls: gr > 0.5 ? stootFase : -1, aan: 0.25 * nu, uit: 0.2 * nu, t });
    naamBij(ctx, 'hypothalamus', null, 120, 220, 1, 'left');
    stotenGrafiek(ctx, 1060, 260, 760, 380, gr > 0.01 ? lerp(4, tot, gr) : 0, gr, { band: q.on('veertiende', 1), nacht: q.on('nachts', 1) });
    naamBij(ctx, 'GnRH', 'steeds vaker een stoot', 790, 560, q.on('GnRH', 1), 'left', C.goud);
    const nt = q.on('nachts', 1); if (nt > 0.01) { maan(ctx, 1150, 760, 26, nt); regel(ctx, 'in het begin vooral ’s nachts, in diepe slaap', 1200, 772, nt, C.text, 26, 'left', 700); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const st = q.on('stoot', 1), aan = q.on('FSH', 1), sl = q.on('steeltje', 1);
    const puls = st > 0.01 ? clamp((t - q.at('stoot')) / 3.2, 0, 1) : -1;
    const R = hypofysePoort(ctx, 700, 500, 1.0, { puls: aan > 0.5 ? (t * 0.4) % 1 : puls, aan, uit: q.on('LH', 1), t, volgLH: q.on('LH', 1) > 0.5 ? clamp((t - q.at('LH')) / 4, 0, 0.8) : -1 });
    naamBij(ctx, 'hypothalamus', null, 280, 200, 1, 'left');
    naamBij(ctx, 'kleine bloedvaatjes', 'in het steeltje', 520, 580, sl * (1 - aan), 'right');
    const hy = q.on('hypofyse', 1); naamBij(ctx, 'hypofyse', 'klier ter grootte van een erwt', 1020, 790, hy, 'left');
    const ew = q.on('erwt', 1) * (1 - q.on('maken', 1));     if (ew > 0.01) { ctx.save(); ctx.globalAlpha *= ew; circ(ctx, 1560, 400, 295, '#8DBA5A', '#B8DA88', 3); text(ctx, 'erwt van 1 centimeter · zelfde vergroting', 1560, 740, fTekst(22, 600), C.text2, 'center'); ctx.restore(); }
    naamBij(ctx, 'FSH', null, 1310, 560, aan, 'left', HORM.fsh[0]); hormDeeltje(ctx, 1290, 550, 'fsh', 10, aan);
    naamBij(ctx, 'LH', null, 1310, 620, q.on('LH', 1), 'left', HORM.lh[0]); hormDeeltje(ctx, 1290, 610, 'lh', 10, q.on('LH', 1));
    schaalStreep(ctx, 80, 840, 59, '1 millimeter'); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Daar', 1, 0.9), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; // lichamen heel; bloed en organen in schema en zoomcirkels ernaast (BEELDAFSPRAKEN 25 okt)
      const p = samZij(ctx, 210, NAV.y, 680, t); const n = persoon(ctx, 'noor', 1720, NAV.y, 660 / 0.97, { t, uit: 'neutraal', kijk: -1 }) || {};
      const heupS = p.heup || { x: 210, y: 560 }, heupN = n.heup || { x: 1720, y: 560 };
      const ov = q.on('overal', 1), rc = q.on('receptoren', 1), volg = q.on('bloed', 1) > 0.5 ? clamp((t - q.at('bloed')) / 6, 0, 1) : -1;
      circ(ctx, 960, 210, 70, rgba('#C98A6A', 0.3), '#E0A88A', 2.5); naamBij(ctx, 'hypofyse', null, 960, 140, 1, 'center');
      bloedbaan(ctx, [[960, 280], [930, 420], [700, 560], [560, 640]], t, ['fsh', 'lh'], 1, 7, volg);
      bloedbaan(ctx, [[960, 280], [990, 420], [1220, 560], [1360, 640]], t + 0.3, ['lh', 'fsh'], 1, 7);
      bloedbaan(ctx, [[960, 280], [960, 480], [960, 600]], t + 0.6, ['fsh', 'lh'], ov, 4);
      if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; doelcel(ctx, 960, 690, 70, { noRec: true, t, fill: '#B5574A' }); ctx.restore(); naamBij(ctx, 'spiercel', 'geen receptoren: er gebeurt niets', 960, 800, ov * (1 - rc * 0.0), 'center'); }
      zoomNaast(ctx, heupS.x + 30, heupS.y + 70, 470, 690, 130, rc, 'zaadbal · vergroot', () => zaadbalWeefsel(ctx, 470, 690, 300, 210, { t, leydig: rc, sertoli: 0.3 }));
      zoomNaast(ctx, heupN.x - 10, heupN.y + 10, 1450, 690, 130, rc, 'eierstok · vergroot', () => eierstokDoorsnede(ctx, 1450, 690, 115, 80, { groei: 0.4, t }));
      if (rc > 0.01) { for (const [x, y] of [[560, 640], [1360, 640]]) { ctx.save(); ctx.globalAlpha *= rc; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 22, 0, 6.283); ctx.stroke(); ctx.restore(); } naamBij(ctx, 'receptoren', null, 560, 600, rc, 'center', C.groen); naamBij(ctx, 'receptoren', null, 1360, 600, rc, 'center', C.groen); }
      text(ctx, 'FSH en LH reizen met het bloed door je hele lichaam', 960, 90, fTekst(34, 700), C.text, 'center');
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
      const ts = q.on('testosteron', 1), oe = q.on('oestrogeen', 1), rp = q.on('rijpen', 1);
      const Z = zaadbalWeefsel(ctx, 500, 450, 860, 560, { t, leydig: 1, testo: ts, sertoli: 0.5, productie: 0.4 + 0.6 * rp });
      hormDeeltje(ctx, Z.leydig[0] - 40, Z.leydig[1] - 70, 'lh', 10, 1, true);
      naamBij(ctx, 'testosteron', null, Z.leydig[0] + 50, Z.leydig[1] + 10, ts, 'left', HORM.testo[0]);
      naamBij(ctx, 'zaadbuisje', 'hier rijpen zaadcellen', Z.buisjes[0][0] - 40, Z.buisjes[0][1] + Z.buisjes[0][2] + 50, rp, 'left');
      ctx.save(); ctx.beginPath(); ctx.rect(990, 170, 860, 560); ctx.clip(); ctx.fillStyle = '#16202E'; ctx.fillRect(990, 170, 860, 560);
      const E = eierstokDoorsnede(ctx, 1420, 450, 380, 250, { groei: lerp(0.4, 0.85, rp), t, winnaar: 3 }); ctx.restore();
      if (E) { for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283 + t * 0.2, rr = 90 + 50 * hash(i); hormDeeltje(ctx, E.x + Math.cos(an) * rr, E.y + Math.sin(an) * rr * 0.8, 'oestro', 7, oe); }
        naamBij(ctx, 'oestrogeen', null, E.x - 60, E.y + 150, oe, 'center', HORM.oestro[0]); naamBij(ctx, 'eicel rijpt', null, E.x - 10, E.y - 150, rp, 'center'); }
      text(ctx, 'zaadbal', 500, 140, fTekst(32, 700), C.text, 'center'); text(ctx, 'eierstok', 1420, 140, fTekst(32, 700), C.text, 'center');
      schaalStreep(ctx, 80, 800, 100, '0,1 millimeter');  ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const pr = q.on('primaire', 1), se = q.on('secundaire', 1);
    persoon(ctx, 'sam', 640, 880, 560, { uit: 'blij', pose: 'staan', kijk: 1, t }); persoon(ctx, 'noor', 1280, 880, 545, { uit: 'blij', pose: 'staan', kijk: -1, t });
    const vd = q.on('veranderen', 1); naamBij(ctx, 'testosteron', null, 640, 290, vd, 'center', HORM.testo[0]); naamBij(ctx, 'oestrogeen', null, 1280, 290, vd, 'center', HORM.oestro[0]); for (let i = 0; i < 4; i++) { hormDeeltje(ctx, 560 + i * 50, 250, 'testo', 9, vd); hormDeeltje(ctx, 1200 + i * 50, 250, 'oestro', 9, vd); }
    tag(ctx, 'primaire geslachtskenmerken: de geslachtsorganen, al bij de geboorte', 960, 140, C.text2, pr, 'center', 26);
    tag(ctx, 'secundaire geslachtskenmerken: komen in de puberteit', 960, 214, C.goud, se, 'center', 26); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1), gs = on('groeispurt'); const hS = 560 * (1 + 0.04 * gs), hN = 545 * (1 + 0.04 * gs);
    persoon(ctx, 'sam', 640, 880, hS, { uit: 'blij', pose: 'staan', kijk: 1, t }); persoon(ctx, 'noor', 1280, 880, hN, { uit: 'blij', pose: 'staan', kijk: -1, t });
    const J = [['haar op de kin', 'kin'], ['bredere schouders', 'schouders'], ['sterkere spieren', 'spieren'], ['groter strottenhoofd', 'strottenhoofd']];
    const LY = { kin: 360, strottenhoofd: 412, schouders: 494, spieren: 552 };
    J.forEach(([l, w]) => naamBij(ctx, l, w === 'strottenhoofd' ? 'lagere stem' : null, 640 - hS * 0.2 - 70, LY[w], on(w), 'right', C.teal));
    naamBij(ctx, 'borsten groeien', null, 1280 + hN * 0.2 + 24, 880 - hN * 0.69 + 10, on('borsten'), 'left', C.koraal);
    naamBij(ctx, 'bredere heupen', null, 1280 + hN * 0.2 + 24, 880 - hN * 0.5 + 10, on('heupen'), 'left', C.koraal);
    regel(ctx, 'iedereen', 960, 330, on('iedereen'), C.goud, 28, 'center', 800); naamBij(ctx, 'okselhaar en schaamhaar', null, 960, 470, on('oksels'), 'center', C.goud);
    if (gs > 0.01) { naamBij(ctx, 'groeispurt', null, 960, 560, gs, 'center', C.goud); pijl(ctx, 960, 640, 960, 590, C.goud, gs, 4, 14); }
    chip(ctx, 'geslachtsorganen gaan werken', 960, 720, C.text2, on('werken'), 24);
    chip(ctx, 'eerste zaadlozing', 960, 780, C.teal, on('zaadlozing'), 24); chip(ctx, 'eerste menstruatie', 960, 840, C.koraal, on('menstruatie'), 24); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verschillen', 1, 0.8), A = 1 - B;
    const v = (age, pk, ph) => { const pre = Math.max(0, 6.2 - 0.32 * (age - 6)); let s2 = pre + ph * Math.exp(-Math.pow((age - pk) / 1.05, 2)); if (age > pk) s2 *= Math.exp(-(age - pk) / 1.6); return s2; };
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const gx = 220, gy = 230, gw = 1000, gh = 460;
      grafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 12, xlab: 'leeftijd (jaar)', ylab: 'groei (cm per jaar)', f: (x) => v(x + 6, 11, 4.2), u: q.on('meisjes', 1, 1.5), xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: (x) => String(x + 6), col: C.koraal });
      grafiek(ctx, gx, gy, gw, gh, { a: q.on('jongens', 1), xmax: 12, ymax: 12, f: (x) => v(x + 6, 13, 4.6), u: q.on('jongens', 1, 1.5), col: C.teal });
      regel(ctx, 'meisjes', gx + 5 / 12 * gw - 20, gy + 70, q.on('meisjes', 1), C.koraal, 28, 'right', 800); regel(ctx, 'jongens', gx + 7 / 12 * gw + 24, gy + 50, q.on('jongens', 1), C.teal, 28, 'left', 800);
      chip(ctx, 'groeispurt: meisjes ± 2 jaar eerder', 720, 150, C.goud, q.on('groeispurt', 1), 26);
      const tw = q.on('twaalfde', 1); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; const px = gx + 6 / 12 * gw; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + gh); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); regel(ctx, '12 jaar', gx + 6 / 12 * gw, gy - 20, tw, C.goud, 24, 'center', 700); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 200, gw = 1050, ax = (a) => gx + (a - 6) / 12 * gw; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, 640); ctx.lineTo(gx + gw, 640); ctx.stroke(); for (let a = 6; a <= 18; a += 2) text(ctx, String(a), ax(a), 680, fTekst(24), C.text2, 'center'); metaText(ctx, 'leeftijd (jaar)', gx + gw, 720, C.grain, 'right', 20);
      regel(ctx, 'begin van de puberteit', gx, 300, 1, C.text2, 28, 'left', 700);
      roundRect(ctx, ax(8), 360, ax(13) - ax(8), 70, 35); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); regel(ctx, 'meisjes: 8 tot 13 jaar', (ax(8) + ax(13)) / 2, 406, 1, C.text, 26, 'center', 700);
      roundRect(ctx, ax(9), 470, ax(14) - ax(9), 70, 35); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); regel(ctx, 'jongens: 9 tot 14 jaar', (ax(9) + ax(14)) / 2, 516, 1, C.text, 26, 'center', 700);
      chip(ctx, 'vroeg is normaal', ax(9), 800, C.groen, q.on('Vroeg', 1), 26); chip(ctx, 'laat ook', ax(13.5), 800, C.groen, q.on('laat', 1), 26); ctx.restore(); }
    const sd = q.on('Daan', 1); persoon(ctx, 'daan', 1500, 880, 390 / 0.95, { uit: sd > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t, a: 0.35 + 0.65 * B }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t, a: 0.35 + 0.65 * B });
    startlamp(ctx, 1500, 400, sd > 0.6 ? 1 : 0, B); startlamp(ctx, 1760, 320, 1, B); chip(ctx, 'Daan: gewoon later', 1500, 290, C.groen, sd, 26); },

  // ---------- vwo ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    circ(ctx, 760, 470, 320, rgba(HK.klier, 0.08), rgba(HK.klier, 0.6), 2); metaText(ctx, 'hypothalamus · vergroot', 760, 130, C.grain, 'center', 22);
    const kc = q.on('kisspeptine', 1), gc = q.on('GnRH', 1), rx = q.on('receptor', 1); const kp = ((t * 0.6) % 1);
    const eind = zenuwcel(ctx, 560, 380, { a: Math.max(0.25, kc), s: 0.95, col: C.paars, naar: [850, 470], seed: 2, puls: gc > 0.01 ? kp : -1, pulsCol: _mixHex(C.paars, '#FFFFFF', 0.4) });
    zenuwcel(ctx, 900, 510, { a: Math.max(0.25, gc), s: 0.95, col: C.goud, naar: [950, 740], seed: 5, takken: 5 });
    naamBij(ctx, 'kisspeptinecel', null, 520, 500, kc, 'center'); naamBij(ctx, 'GnRH-cel', null, 1040, 540, gc, 'left');
    if (gc > 0.01 && eind) for (let i = 0; i < 5; i++) { const u = (t * 0.5 + i / 5) % 1; circ(ctx, lerp(eind[0] - 10, 880, u), lerp(eind[1] - 4, 500, u) + Math.sin(u * 7 + i) * 6, 5, rgba(C.paars, gc * (1 - 0.8 * rx))); }
    kruis(ctx, 872, 492, 24, rx); chip(ctx, 'receptor werkt niet: de puberteit begint niet vanzelf', 760, 860, C.koraal, rx, 24); },
  s13(ctx, t, q) { bg(ctx, 'schema'); const vw = q.on('Vetweefsel', 1), lp = q.on('leptine', 1), ts = q.on('toestemming', 1), wn = q.on('weinig', 1, 1.2);
    vetweefsel(ctx, 1460, 440, lerp(460, 260, wn), lerp(380, 220, wn), { t, d: lerp(100, 55, wn), seed: 7, a: Math.max(0.3, vw) }); naamBij(ctx, 'vetweefsel', 'vetcellen · vergroot', 1460, 680, vw, 'center');
    zenuwcel(ctx, 420, 430, { s: 0.95, col: C.goud, naar: [470, 680], seed: 5, takken: 5 }); naamBij(ctx, 'GnRH-cel', null, 420, 330, 1, 'center');
    if (lp > 0.01) { regel(ctx, 'leptine', 960, 300, lp, C.goud, 30, 'center', 800); for (let i = 0; i < 7; i++) { if (wn > 0.5 && i % 3) continue; const u = (t * 0.3 + i / 7) % 1; circ(ctx, lerp(1220, 640, u), lerp(420, 430, u) + Math.sin(u * 9 + i) * 14, 8, rgba(C.goud, lp)); } }
    // slagboom: gaat alleen open met genoeg leptine (toestemming, geen startknop)
    if (ts > 0.01) { ctx.save(); ctx.globalAlpha *= ts; const open = ease(clamp((t - q.at('toestemming')) / 1.2, 0, 1)) * (1 - q.on('weinig', 1)); ctx.fillStyle = '#6B7287'; ctx.fillRect(612, 470, 16, 120); ctx.save(); ctx.translate(620, 480); ctx.rotate(-open * 1.3); roundRect(ctx, 0, -10, 230, 20, 8); shape(ctx, '#E6E1D3', C.koraal, 2); for (let k = 0; k < 4; k++) { ctx.fillStyle = C.koraal; ctx.fillRect(30 + k * 52, -10, 22, 20); } ctx.restore(); ctx.restore(); chip(ctx, 'geen startsein, wel toestemming', 760, 660, C.groen, ts * (1 - q.on('weinig', 1)), 24); }
    chip(ctx, 'veel leptine = genoeg energie opgeslagen', 960, 820, C.groen, q.on('genoeg', 1) * (1 - q.on('weinig', 1)), 24);
    chip(ctx, 'heel weinig lichaamsvet: eerste menstruatie later, of stopt', 960, 820, C.koraal, q.on('weinig', 1), 24); },
  s14(ctx, t, q) { bg(ctx, 'schema'); const P2 = [[1850, 16.5], [1880, 15.8], [1900, 15.2], [1920, 14.6], [1950, 13.7], [1965, 13.4], [1980, 13.3], [1997, 13.15], [2009, 13.05], [2020, 13.0]];
    const f = (x) => { const yr = 1850 + x; for (let i = 1; i < P2.length; i++) if (yr <= P2[i][0]) return lerp(P2[i - 1][1], P2[i][1], (yr - P2[i - 1][0]) / (P2[i][0] - P2[i - 1][0])) - 10; return 3; };
    grafiek(ctx, 360, 230, 1200, 460, { xmax: 170, ymax: 8, f, u: clamp((t - q.at('1850')) / Math.max(1, q.at('dertiende') - q.at('1850')), 0, 1), xticks: [0, 50, 100, 150], xfmt: (x) => String(1850 + x), yticks: [2, 4, 6], ylab: 'leeftijd eerste menstruatie', xlab: 'jaar', col: C.koraal, marks: [[0, '± 16–17 jaar', q.on('zestiende', 1)], [159, '± 13 jaar (Nederland)', q.on('dertiende', 1)]] });
    ctx.fillStyle = C.bgSchema; ctx.fillRect(250, 220, 100, 480); for (const v of [2, 4, 6]) text(ctx, String(10 + v), 342, 690 - v / 8 * 460 + 10, fTekst(28), C.text2, 'right');
    chip(ctx, 'betere voeding en gezondheid', 960, 820, C.groen, q.on('Voeding', 1), 26); },

  // ---------- H2 Van zaadbal tot penis ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const z = q.on('zaadballen', 1), bu = q.on('buisjes', 1), me = q.on('meiose', 1);
    const M = manDoorsnede(ctx, 780, 270, 2.5, { hl: { zaadbal: z * (0.6 + 0.4 * Math.sin(t * 3)) }, t, dim: ['darm'] });
    naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] - 10, M.naam.zaadbal[1] + 110, z, 'center'); naamBij(ctx, 'balzak', null, M.naam.zaadbal[0] - 150, M.naam.zaadbal[1] + 60, q.on('balzak', 1) * (1 - bu), 'right');
    const ko = q.on('koeler', 1) * (1 - bu); if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; roundRect(ctx, 1240, 220, 40, 260, 20); shape(ctx, '#E6E1D3', '#9AA3B2', 2); const lvl = lerp(0.8, 0.62, clamp((t - q.at('koeler')) / 1.5, 0, 1)); roundRect(ctx, 1250, 230 + 240 * (1 - lvl), 20, 240 * lvl, 10); shape(ctx, C.teal, null); circ(ctx, 1260, 500, 34, C.teal, '#9AA3B2', 2);
      regel(ctx, 'een paar graden koeler dan in de buik', 1320, 330, 1, C.text, 30, 'left', 700); regel(ctx, 'nodig om goed zaadcellen te maken', 1320, 380, q.on('nodig', 1), C.text2, 26, 'left', 600); ctx.restore(); }
    zoomNaast(ctx, M.naam.zaadbal[0], M.naam.zaadbal[1] - 10, 1480, 420, 260, bu, 'zaadbuisjes · vergroot', () => zaadbalWeefsel(ctx, 1480, 420, 560, 360, { t, productie: 1, sertoli: 0.3 }));
    meioseMini(ctx, 1480, 760, clamp((t - q.at('meiose')) / 2.4, 0, 1), me * (1 - q.on('honderd', 1)));
    const mi = q.on('honderd', 1); if (mi > 0.01) { ctx.save(); ctx.globalAlpha *= mi; const n = 100; regel(ctx, '± ' + n + ' 000 000 per dag', 1480, 780, 1, C.goud, 44, 'center', 800); ctx.restore(); }
    chip(ctx, 'vanaf de puberteit, tot op hoge leeftijd', 1480, 856, C.text2, q.on('leeftijd', 1), 24); schaalStreep(ctx, 80, 840, 5 * 35, '5 centimeter'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const bj = q.on('bijbal', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { hl: { zaadbal: 1 - bj, bijbal: bj }, t, dim: ['darm'] });
    const u = lerp(0, 0.075, ease(clamp((t - q.at('buisjes')) / 3, 0, 1))); const [zx, zy, za] = bioPunt(M.route, u); zaadVolg(ctx, zx, zy, q.on('zaadcel', 1)); metaText(ctx, 'ring = de gevolgde zaadcel (te klein om te zien)', 1450, 380, rgba(C.grain, q.on('zaadcel', 1)), 'center', 26);
    naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] + 70, M.naam.zaadbal[1] + 20, 1, 'left'); naamBij(ctx, 'bijbal', 'tegen de achterkant', M.naam.bijbal[0] - 50, M.naam.bijbal[1], bj, 'right');
    chip(ctx, 'rijpt ± 2 weken en wordt bewaard', 1400, 300, C.oker, q.on('rijpt', 1), 26); schaalStreep(ctx, 80, 840, 5 * 35, '5 centimeter'); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const on = (w, n = 1) => q.on(w, n);
    const stops = [['zaadlozing', 0.075], ['buikwand', 0.33], ['boog', 0.55], ['blaasjes', 0.68], ['prostaat', 0.78], ['urinebuis', 0.84]];
    let u = 0.075; for (let i = 0; i < stops.length; i++) { const t0 = q.at(stops[i][0]); if (t < t0) break; const from = i ? stops[i - 1][1] : 0.075; u = lerp(from, stops[i][1], ease((t - t0) / 2.4)); }
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm'], hl: { leider: on('zaadleider') * (1 - on('blaasjes')), lies: on('buikwand') * (1 - on('boog')), blaas: on('blaas') * (1 - on('gespierd')), blaasjes: on('blaasjes') * (1 - on('prostaat')), prostaat: on('prostaat') * (1 - on('urinebuis')), buis: on('urinebuis') } });
    const k = 35, [zx, zy, za] = bioPunt(M.route, u); const kn = on('knijpt');
    if (kn > 0.01) { const [wx, wy, wa] = bioPunt(M.route, Math.max(0.01, u - 0.022)); const pulse = 0.85 + 0.15 * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= kn; ctx.translate(wx, wy); ctx.rotate(wa); ctx.beginPath(); ctx.ellipse(0, 0, 0.9 * k, 0.48 * k * pulse, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), lighten(C.goud, 0.4), 2); ctx.restore(); chip(ctx, 'de wand knijpt de zaadcellen vooruit', 1460, 300, C.goud, kn * (1 - on('blaasjes')), 24); }
    zaadVolg(ctx, zx, zy, 1);
    const N = M.naam; const nb = (s1, p, dx, dy, a, al = 'left') => naamBij(ctx, s1, null, p[0] + dx, p[1] + dy, a, al);
    nb('zaadleider', N.leider, 70, 120, on('zaadleider')); nb('blaas', N.blaas, 0, 10, on('blaas'), 'center'); nb('zaadblaasje', N.blaasjes, -30, -30, on('blaasjes'), 'right'); nb('prostaat', N.prostaat, -70, 40, on('prostaat'), 'right'); nb('urinebuis', N.buis, 170, 90, on('urinebuis')); naamBij(ctx, 'urineleider', 'zaadleider kruist erover', N.ureter[0] - 30, N.ureter[1] + 30, on('boog') * (1 - on('prostaat')) * 0.8, 'right');
    schaalStreep(ctx, 80, 840, 5 * k, '5 centimeter'); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const kr = q.on('kringspier', 1), bu = q.on('urinebuis', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm', 'zaadbal', 'bijbal', 'leider', 'blaasjes'], hl: { buis: bu * (0.6 + 0.4 * Math.sin(t * 3)), blaas: q.on('Urine', 1) * (1 - kr) }, kring: kr });
    naamBij(ctx, 'urinebuis', null, M.naam.buis[0] + 170, M.naam.buis[1] + 90, bu, 'left'); naamBij(ctx, 'blaas', null, M.naam.blaas[0], M.naam.blaas[1] + 10, 1, 'center');
    const [kx, ky] = M.P(-3.4, 3.1); naamBij(ctx, 'kringspier', 'sluit de blaas af', kx - 60, ky + 20, kr, 'right');
    chip(ctx, 'urine en sperma: dezelfde buis, niet tegelijk', 1460, 300, C.teal, q.on('dezelfde', 1), 24); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const zw = q.on('zwellichamen', 1), vul = ease(clamp((t - q.at('bloed')) / 1.5, 0, 1));
    const M = manDoorsnede(ctx, 520, 250, 2.4, { t, zw: vul, dim: ['darm', 'blaas', 'blaasjes', 'prostaat', 'bot', 'zaadbal', 'bijbal', 'leider', 'balzak'] });
    const [cx, cy] = M.P(3.1, 10.0); ctx.save(); ctx.globalAlpha *= zw; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(cx - 60, cy); ctx.lineTo(cx + 60, cy); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    text(ctx, 'doorsnede hier', cx + 70, cy + 8, fTekst(22, 600), rgba(C.goud, zw), 'left');
    penisDoorsnede(ctx, 1360, 500, 150, { vul, a: zw }); naamBij(ctx, 'zwellichamen', null, 1360, 290, zw, 'center'); naamBij(ctx, 'urinebuis', null, 1360, 735, zw, 'center');
    chip(ctx, 'vol bloed: erectie', 1360, 160, MK.zwel, q.on('erectie', 1), 26); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('vocht', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm'], hl: { zaadbal: k, blaasjes: k, prostaat: k } });
    const badge = (l, p) => { ctx.save(); ctx.globalAlpha *= k; circ(ctx, p[0], p[1], 26, C.goud); text(ctx, l, p[0], p[1] + 10, fTekst(30, 800), '#121A26', 'center'); ctx.restore(); };
    badge('a', M.P(1.0, 12.0)); badge('b', M.P(-6.7, 2.3)); badge('c', M.P(-3.4, 4.7));
    maatglas(ctx, 1400, 300, 200, 380, [0, 0, 0], q.on('Sperma', 1)); regel(ctx, 'sperma', 1500, 270, q.on('Sperma', 1), C.text, 30, 'center', 800); vraagteken(ctx, 1500, 500, q.on('vandaan', 1), 120); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const zb = q.on('zaadblaasjes', 1), pr = q.on('prostaat', 1), zc = q.on('procent', 1), al = q.on('alleen', 1);
    const M = manDoorsnede(ctx, 500, 300, 2.2, { t, dim: ['darm'], hl: { blaasjes: zb * (1 - pr), prostaat: pr * (1 - zc), zaadbal: al } });
    naamBij(ctx, 'zaadblaasje', null, M.naam.blaasjes[0] - 20, M.naam.blaasjes[1] - 30, zb, 'right'); naamBij(ctx, 'prostaat', null, M.naam.prostaat[0] - 50, M.naam.prostaat[1] + 40, pr, 'right'); naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] - 70, M.naam.zaadbal[1] + 20, al, 'right');
    const fz = (w) => ease(clamp((t - q.at(w)) / 1.4, 0, 1));
    maatglas(ctx, 1040, 260, 220, 460, [zc > 0.01 ? fz('procent') : 0, zb > 0.01 ? fz('zaadblaasjes') : 0, pr > 0.01 ? fz('prostaat') : 0]);
    regel(ctx, 'zaadblaasjes: ruim de helft', 1300, 560, zb, C.groen, 28, 'left', 800); regel(ctx, 'met suiker als brandstof', 1300, 600, q.on('suiker', 1), C.text2, 24, 'left', 600);
    regel(ctx, 'prostaat: kwart tot een derde', 1300, 360, pr, C.paars, 28, 'left', 800); regel(ctx, 'helpt overleven en bewegen', 1300, 400, q.on('overleven', 1), C.text2, 24, 'left', 600);
    regel(ctx, 'zaadcellen: een paar procent', 1300, 710, zc, C.text, 26, 'left', 800);
    const mis = q.on('dus', 1); if (mis > 0.01) { tag(ctx, 'zaadcellen komen uit de prostaat', 1500, 180, C.koraal, mis * (1 - al), 'center', 26); kruis(ctx, 1250, 164, 24, mis * (1 - al)); }
    tag(ctx, 'zaadcellen: alleen uit de zaadballen', 1500, 180, C.groen, al, 'center', 28); },

  // ---------- H3 Eierstok en baarmoeder ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    const n = persoon(ctx, 'noor', 330, NAV.y, 720 / 0.97, { t }) || {}; const hp = n.heup || { x: 330, y: 560 };
    const zx = 1180, zy = 470, zr = 380; let V = null;
    zoomNaast(ctx, hp.x + 10, hp.y + 20, zx, zy, zr, Math.max(0.35, on('bekken')), 'in het bekken · vooraanzicht · vergroot', () => { V = vrouwOrganenVoor(ctx, zx - 50, zy + 120, 1.9, { t, hlEierstok: on('eierstok') * (1 - on('eileider')) }); });
    if (!V) V = vrouwOrganenVoor(ctx, zx - 50, zy + 120, 1.9, { a: 0 });
    const eo = V.eierstokR, eoL = V.eierstokL;
    naamBij(ctx, 'eierstok', null, eoL[0] - 10, eoL[1] + 70, on('eierstok'), 'center');
    chip(ctx, '± zo groot als een amandel', 1180, 185, VK.stok, on('amandel') * (1 - on('eileider')), 22);
    const tr = [eo[0] + 57 * 1.9, eo[1] - 12 * 1.9]; naamBij(ctx, 'eileider', 'trechter met franjes', eo[0] - 20, eo[1] - 160, on('eileider'), 'center');
    const ep = clamp((t - q.at('eisprong')) / 2.2, 0, 1); if (on('eisprong') > 0.01) { const ex = lerp(eo[0] + 20, tr[0], ease(ep)), ey = lerp(eo[1], tr[1], ease(ep)); eicelEcht(ctx, ex, ey, 9, on('eisprong'), true); }
    chip(ctx, 'hier kan een eicel bevrucht worden', 1180, 185, VK.leider, on('bevrucht'), 24); },
  s24(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1); const f2 = (a, b) => on(a) * (1 - on(b));
    const n = persoon(ctx, 'noor', 330, NAV.y, 720 / 0.97, { t }) || {}; const hp = n.heup || { x: 330, y: 560 };
    const zx = 1180, zy = 470, zr = 380;
    zoomCircle(ctx, zx, zy, zr, hp.x + 10, hp.y + 20, 'in het bekken · vooraanzicht · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr); vrouwOrganenVoor(ctx, zx, zy + 170, 2.6, { t, hlBaarmoeder: f2('baarmoeder', 'binnenkant') }); });
    const V = vrouwOrganenVoor(ctx, zx, zy + 170, 2.6, { a: 0 }); const bm = V.baarmoeder;
    naamBij(ctx, 'baarmoeder', 'holle spier', bm.x + bm.rx + 24, bm.y + bm.ry * 0.7, on('baarmoeder'), 'left');
    chip(ctx, '± zo groot als een peer', 1180, 185, VK.wand, f2('peer', 'nestelen'), 24);
    naamBij(ctx, 'baarmoederslijmvlies', null, bm.x, bm.y - bm.ry * 0.15, on('baarmoederslijmvlies'), 'center'); chip(ctx, 'hier kan een embryo zich nestelen', 1180, 185, VK.slijm, on('nestelen'), 24);
    naamBij(ctx, 'baarmoederhals', null, V.cervix[0] + 60, V.cervix[1] - 20, on('baarmoederhals'), 'left'); naamBij(ctx, 'vagina', null, V.cervix[0] + 60, V.cervix[1] + 70, on('vagina'), 'left'); },
  s25(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    persoon(ctx, 'noor', 420, NAV.y, 720 / 0.97, { t });
    paneel(ctx, 1000, 140, 760, 740, ''); metaText(ctx, 'buitenkant · vooraanzicht · schema', 1380, 190, C.grain, 'center', 22);
    const S = vulvaSchema(ctx, 1380, 560, 1.3, { hl: { lip: on('schaamlippen'), cli: on('clitoris'), buis: on('opening'), vag: on('vagina') } });
    naamBij(ctx, 'schaamlippen', null, S.groot[0] - 40, S.groot[1] + 10, on('schaamlippen'), 'right'); naamBij(ctx, 'clitoris', null, S.cli[0] + 100, S.cli[1] + 10, on('clitoris'), 'left');
    naamBij(ctx, 'opening urinebuis', null, S.buis[0] + 100, S.buis[1] + 10, on('opening'), 'left'); naamBij(ctx, 'vagina', null, S.vag[0] + 100, S.vag[1] + 10, on('vagina'), 'left'); },
  s26(ctx, t, q) { bg(ctx, 'schema');
    eierstokDoorsnede(ctx, 760, 470, 380, 250, { groei: 0.2, t }); naamBij(ctx, 'eierstok', 'vergroot', 760, 790, 1, 'center');
    persoon(ctx, 'noor', 1560, 880, 500 / 0.97, { uit: 'denkt', pose: 'denk', kijk: -1, t, a: q.on('meisje', 1) }); vraagteken(ctx, 1700, 360, q.on('eicellen', 1), 110); },

  s28(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('driehonderdduizend', 1, 1), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; eierstokDoorsnede(ctx, 760, 470, 380, 250, { groei: 0.2, t }); chip(ctx, 'al aangelegd vóór de geboorte', 760, 140, C.goud, q.on('aangelegd', 1), 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const x0 = 200, y0 = 190, n = 560;
      if (!SCENES._telvlak) { const c = document.createElement('canvas'); c.width = n; c.height = n; const g = c.getContext('2d'); const id = g.createImageData(n, n); for (let i = 0; i < n * n; i++) { const v = 150 + 40 * hash(i * 0.37); id.data[i * 4] = v + 40; id.data[i * 4 + 1] = v + 20; id.data[i * 4 + 2] = v - 10; id.data[i * 4 + 3] = hash(i * 1.7) > 0.5 ? 200 : 120; } g.putImageData(id, 0, 0); SCENES._telvlak = c; }
      ctx.drawImage(SCENES._telvlak, x0, y0); text(ctx, 'zo’n 300 000 eicellen', x0 + n / 2, y0 - 30, fTekst(34, 700), C.text, 'center');
      const vh = q.on('vierhonderd', 1); for (let i = 0; i < 400; i++) { const px = x0 + hash(i * 3.1) * n, py = y0 + hash(i * 5.7) * n; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = rgba(C.goud, vh); ctx.fill(); }
      metaText(ctx, 'elk stipje is één eicel', x0 + n / 2, y0 + n + 40, C.grain, 'center', 20);
      regel(ctx, 'nieuw erbij: 0', 1180, 340, q.on('Nieuwe', 1), C.koraal, 36, 'left', 800);
      regel(ctx, 'per cyclus rijpt een groepje, meestal haalt er één de eisprong', 1180, 430, q.on('groepje', 1), C.text2, 24, 'left', 700);
      if (vh > 0.01) { text(ctx, 'ongeveer 400', 1180, 540, fTitel(70), rgba(C.goud, vh), 'left'); regel(ctx, 'halen in een heel leven een eisprong', 1180, 590, vh, C.text, 28, 'left', 600); }
      const mn = q.on('mannen', 1); if (mn > 0.01) { ctx.save(); ctx.globalAlpha *= mn; paneel(ctx, 1180, 660, 560, 160, ''); ctx.beginPath(); ctx.ellipse(1260, 740, 30, 40, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); regel(ctx, 'man: steeds nieuwe zaadcellen', 1310, 752, 1, C.text, 28, 'left', 700); ctx.restore(); }
      ctx.restore(); } },

  s29(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    const dag = lerp(1, 14, ease(clamp((t - q.at('rijpen')) / Math.max(1, q.at('eisprong') - q.at('rijpen') + 1.5), 0, 1)));
    const HP = hypofysePoort(ctx, 260, 330, 0.42, { aan: on('hypofyse'), uit: on('FSH'), t }); naamBij(ctx, 'hypofyse', 'voorkwab', HP.voor[0] - 90, HP.voor[1] + 120, 1, 'center'); naamBij(ctx, 'hypothalamus', null, 260, 160, 0.8, 'center');
    const D1 = [[430, 490], [560, 510], [700, 470]]; bloedbaan(ctx, D1, t, ['fsh', 'lh'], on('FSH'), 5); text(ctx, 'FSH en LH', 565, 600, fTekst(26, 700), rgba(C.teal, on('FSH')), 'center');
    const eis = on('eisprong') * clamp((t - q.at('eisprong')) / 2, 0, 1); eileiderStuk(ctx, 960, 420, on('eisprong'));
    const E = eierstokDoorsnede(ctx, 960, 420, 210, 140, { groei: lerp(0.2, 0.95, (dag - 1) / 13), eis: 0, t, winnaar: 3 }); text(ctx, 'eierstok', 960, 240, fTekst(28, 700), C.text, 'center');
    if (eis > 0.01) { const e = ease(eis); eicelEcht(ctx, lerp(1150, 1185, e), lerp(390, 245, e), 14, 1 - clamp((eis - 0.85) / 0.15, 0, 1) * 0.6, true); }
    const D2 = [[1190, 500], [1290, 530], [1400, 500]]; bloedbaan(ctx, D2, t, ['oestro'], on('dikker'), 5); text(ctx, 'hormonen van de eierstok', 1300, 600, fTekst(24, 700), rgba(HORM.oestro[0], on('dikker')), 'center');
    baarmoederwand(ctx, 1440, 290, 420, 380, slijmDikte(dag), { t, kronkel: 0.2, a: Math.max(0.35, on('baarmoeder')) }); text(ctx, 'baarmoederslijmvlies', 1650, 250, fTekst(28, 700), C.text, 'center');
    const rm = on('remt'); if (rm > 0.01) { ctx.save(); ctx.globalAlpha *= rm; ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(830, 320); ctx.bezierCurveTo(760, 200, 560, 200, HP.voor[0] + 40, HP.voor[1] - 20); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); { const [vx, vy] = [HP.voor[0] + 40, HP.voor[1] - 20]; ctx.moveTo(vx - 14, vy - 14); ctx.lineTo(vx + 14, vy + 14); } ctx.lineWidth = 7; ctx.stroke(); ctx.restore(); text(ctx, 'veel oestrogeen remt de hypofyse weer', 640, 150, fTekst(26, 700), rgba(C.paars, rm), 'center'); }
    cyclusKlok(ctx, 960, 740, 85, dag, { fasen: 0, a: on('cyclus') }); text(ctx, 'dag ' + Math.floor(dag), 1065, 755, fTekst(26, 700), rgba(C.text, on('cyclus')), 'left');
    chip(ctx, 'eisprong: de eicel gaat de eileider in', 1500, 780, C.goud, on('eisprong'), 24); },

  s30(ctx, t, q) { bg(ctx, 'schema'); const bf = q.on('bevrucht', 1), me = q.on('menstruatie', 1);
    const los = ease(clamp((t - q.at('menstruatie')) / 2, 0, 1));
    const L = baarmoederwand(ctx, 900, 380, 900, 300, slijmDikte(26) / 0.92, { los, kronkel: 1, t });
    metaText(ctx, 'baarmoederwand · uitsnede · vergroot', 450, 200, C.grain, 'left', 20);
    naamBij(ctx, 'slijmvlies', null, 430, (L.oppervlak + L.basaal) / 2 + 8, 1, 'right');
    chip(ctx, 'niet bevrucht: slijmvlies laat ± 2 weken na de eisprong los', 960, 160, C.teal, bf * (1 - me), 24);
    tag(ctx, 'menstruatie', 1620, 360, VK.slijm, me, 'center', 30);
    const ni = q.on('naar', 1); if (ni > 0.01) { chip(ctx, 'slijmvlies met wat bloed', 1620, 470, VK.slijm, ni, 24); tag(ctx, 'de eicel', 1620, 560, C.koraal, ni, 'center', 24); kruis(ctx, 1530, 544, 20, ni); }
    chip(ctx, 'eerste jaren: vaak onregelmatig, en dat is normaal', 960, 820, C.groen, q.on('onregelmatig', 1), 24); },

  // ---------- Recap ----------
  s31(ctx, t, q) { bg(ctx, 'schema'); const sk = q.on('secundaire', 1);
    paneel(ctx, 120, 160, 820, 640, 'startsein', 1); if (1) { ctx.save(); hypofysePoort(ctx, 400, 420, 0.42, { puls: (t * 0.4) % 1, aan: q.on('FSH', 1), uit: q.on('FSH', 1), t });
      const D = [[560, 500], [700, 560], [820, 700]]; bloedbaan(ctx, D, t, ['fsh', 'lh'], q.on('FSH', 1), 5, (t * 0.15) % 1);
      regel(ctx, 'hypothalamus → GnRH → hypofyse → FSH en LH', 530, 760, 1, C.text, 24, 'center', 700); ctx.restore(); }
    paneel(ctx, 980, 160, 820, 640, 'kenmerken', sk); if (sk > 0.01) { ctx.save(); ctx.globalAlpha *= sk; persoon(ctx, 'sam', 1250, 740, 460, { uit: 'blij', t }); persoon(ctx, 'noor', 1530, 740, 450, { uit: 'blij', t, kijk: -1 }); regel(ctx, 'testosteron en oestrogeen', 1390, 252, 1, C.paars, 26, 'center', 700); ctx.restore(); }
    tag(ctx, 'wanneer het begint, verschilt veel tussen mensen', 960, 860, C.goud, q.on('verschilt', 1), 'center', 28); },
  s32(ctx, t, q) { bg(ctx, 'schema'); const ec = q.on('Eicellen', 1), d = q.on('Daan', 1), A = 1 - d;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      paneel(ctx, 120, 160, 820, 640, 'zaadcel', 1); if (1) { ctx.save(); ctx.save(); ctx.beginPath(); ctx.rect(122, 222, 816, 520); ctx.clip(); const M = manDoorsnede(ctx, 560, 330, 1.25, { t, dim: ['darm'], hl: { blaasjes: q.on('vocht', 1), prostaat: q.on('vocht', 1) } }); ctx.save(); ctx.globalAlpha *= 0.8; lijnStrip(ctx, M.route, C.goud, 3); ctx.restore(); ctx.restore(); regel(ctx, 'vocht: zaadblaasjes en prostaat', 530, 770, q.on('vocht', 1), C.text, 24, 'center', 700); ctx.restore(); }
      paneel(ctx, 980, 160, 820, 640, 'eicellen', ec); if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec; eierstokDoorsnede(ctx, 1390, 430, 260, 170, { groei: 0.2, t }); regel(ctx, 'voorraad al vóór de geboorte', 1390, 690, 1, C.goud, 26, 'center', 700); regel(ctx, 'geen nieuwe erbij', 1390, 740, q.on('geen', 1), C.koraal, 26, 'center', 700); ctx.restore(); }
      ctx.restore(); }
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; klasAchtergrond(ctx); meetlat(ctx, 1250, 880, 360, 1); persoon(ctx, 'daan', 1080, 880, lerp(382, 400, q.on('later', 1)) / 0.95, { uit: 'blij', kijk: 1, t }); persoon(ctx, 'sam', 1420, 880, 470 / 1.04, { uit: 'blij', kijk: -1, t });
      startlamp(ctx, 1080, 380, q.on('later', 1) > 0.5 ? 1 : 0, 1); startlamp(ctx, 1420, 320, 1, 1); tag(ctx, 'Daan: startsein komt gewoon wat later', 760, 200, C.groen, 1, 'center', 28); ctx.restore(); } },
});
