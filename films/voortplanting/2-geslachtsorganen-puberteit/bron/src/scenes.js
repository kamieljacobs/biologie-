
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
// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: BIO, HORM, _bioVoronoi, baarmoederwand, bioDicht, bioPad, bioPunt, bloedvat, eicelEcht, eierstokDoorsnede, hoofdHersenen, hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, schaalStreep, vetweefsel, vrouwOrganenVoor, vulvaSchema, zaadbalWeefsel, zaadcelEcht, zenuwcel, spierVezel
const BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
const _bioPolyCache = {};
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
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, c = 0 } = o; const kort = 1 - 0.15 * clamp(c, 0, 1); const streep = (o.streep || 12) * kort; w *= kort; // samentrekken: vezel en sarcomeren korter
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  const band = (o.streep || 12) * 0.45; for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, band, h); // donkere A-band blijft even breed, lichte I-band wordt smaller
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
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
function bioNavelstreng(c, ax, ay, bx, by, t = 0, a = 1, w = 14) { if (a <= 0.01) return; c.save(); c.globalAlpha *= a; c.lineCap = 'round';
  const N = 24, d = Math.hypot(bx - ax, by - ay) || 1, nx = -(by - ay) / d, ny = (bx - ax) / d; const pts = [];
  for (let i = 0; i <= N; i++) { const u = i / N, wv = Math.sin(u * 9 + t * 1.2) * 16 * Math.sin(u * Math.PI); pts.push([ax + (bx - ax) * u + nx * wv, ay + (by - ay) * u + ny * wv]); }
  const lijn = (lw, col, off) => { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); pts.forEach((p, i) => { const q = [p[0] + nx * off, p[1] + ny * off]; i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); }); c.stroke(); };
  lijn(w, '#D8CDD6', 0); lijn(w * 0.22, BIO.ader, -w * 0.24); lijn(w * 0.22, BIO.ader, w * 0.24); lijn(w * 0.3, BIO.bloed, 0); c.restore(); }
function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbTab(tab, u) { if (u <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) { const [u0, v0] = tab[i - 1], [u1, v1] = tab[i]; return lerp(v0, v1, (u - u0) / (u1 - u0)); } return tab[tab.length - 1][1]; }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
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
    if (z > 0.25 && placenta) bioNavelstreng(ctx, V.rxi * 0.48, V.yci - V.ryi * 0.55, f.navel.x, f.navel.y, t, foetus * clamp((z - 0.25) / 0.15, 0, 1), Math.max(3, fs * 22));
    ctx.restore(); }
  ctx.restore();
  return uit;
}
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
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
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
  // nucleoïde: vezelig gebied zonder rand: licht vlak + veel korte kronkellussen DNA (grijs, palet B)
  ctx.beginPath(); ctx.ellipse(kx, ky, half * 0.78 + hw * 0.15, hw * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(DNA_BASE.rugR, 0.12); ctx.fill();
  ctx.strokeStyle = rgba(DNA_BASE.rugR, 0.95); ctx.lineWidth = Math.max(0.9, hw * 0.028);
  const nl = Math.round(10 + L / 12); for (let i = 0; i < nl; i++) { const u = hash(i * 4.1 + seed) * 6.283, d = Math.sqrt(hash(i * 2.3 + seed)); const bx = kx + Math.cos(u) * d * (half * 0.72), by = ky + Math.sin(u) * d * hw * 0.38;
    const lr = hw * (0.07 + 0.06 * hash(i)); const Q = []; for (let k = 0; k < 6; k++) { const v = k / 6 * 6.283 + i; Q.push([bx + Math.cos(v) * lr * (1 + 0.5 * hash(i * 9 + k)), by + Math.sin(v) * lr * 0.8 * (1 + 0.5 * hash(i * 5 + k))]); } ctx.beginPath(); bioPad(ctx, Q, true); ctx.stroke(); }
  // plasmide: klein ringetje, licht gedraaid
  if (plasmide) { const pr = hw * 0.15; const Q = []; for (let i = 0; i < 12; i++) { const u = i / 12 * 6.283; Q.push([plx + Math.cos(u) * pr * (1 + 0.15 * Math.sin(u * 3)), ply + Math.sin(u) * pr * 0.75]); }
    ctx.beginPath(); bioPad(ctx, Q, true); ctx.strokeStyle = _mixHex(DNA_BASE.rugR, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, hw * 0.035); ctx.stroke(); }
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
function bacterieGroot(ctx, x, y, w, h, o = {}) { const { wandKapot = 0, riboHl = 0, a = 1, t = 0 } = o; const r = bacterieEcht(ctx, x, y, w, { a, t, h, antibiotica: wandKapot, riboHl, plasmide: true }); return { wand: an => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] }; }
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
const DNA_BASE = {
  base: { A: '#D8604A', T: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  letter: { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE' },
  rug: '#5E6A80', rugR: '#97A3B6', fosfaat: '#7D899E', suiker: '#B4BECD',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  // verbeterronde 2 (variant B): bruggen verdeeld over de hele breedte
  plek: { A: [0.27, 0.73], T: [0.27, 0.73], G: [0.15, 0.5, 0.85], C: [0.15, 0.5, 0.85] },
  // puzzelstaaf (27 okt 2026): lengte tot de paarlijn en hoogte van de letter, in eenheden van s
  len: 80, letterY: 40
};
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
  const { s = 1, a = 1, rot = 0, rand = null } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir); ctx.translate(0, -6 * s);
  basePuzzelPad(ctx, b, s); ctx.fillStyle = kl; ctx.fill();
  if (DNA_BASE.letter[b] && DNA_BASE.letter[b] !== 'rgba(0,0,0,0)') { ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, 2 * s, w * 1.4, L + 19 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud;
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L - 6 * s), yb = y2 - sg * (_baseRand(c, px, s) - L - 6 * s);
    for (let k = 1; k <= 3; k++) _bioCirc(ctx, x + px, lerp(ya, yb, k / 4), Math.max(1, 2.4 * s), C.goud); }); ctx.restore(); }
const D2 = { // palet B (28 okt 2026): oude streng grijs, nieuwe streng bijna wit; basen = DNA_BASE, RNA-basen = RNA_BASE
  oud: '#7D899E', oudR: '#AEB8C8', nieuw: '#DCE3EC', nieuwR: '#F0F3F7',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#D8604A', T: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  rbase: { A: '#D8604A', U: '#F2CF7A', C: '#86C3E8', G: '#34609A' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#121A26', G: '#F2F2EE', U: '#121A26' },
};
const D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
const d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];
const RNA_BASE = { base: { A: '#D8604A', U: '#F2CF7A', C: '#86C3E8', G: '#34609A' }, letter: { A: '#121A26', U: '#121A26', C: '#121A26', G: '#F2F2EE' } };
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }
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
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(_mixHex(cc, '#121A26', 0.45), 0.7); ctx.fill();
    const E = _ellips(40, 32); _kkKluwen(ctx, 0, 0, E.binnen, { bbox: E.bbox, sc: rx / 42, r: 7, col: cc, seed: 3 + p.k, key: 'heli' + p.k }); ctx.restore(); });
  ctx.restore(); }
const _PRIM = (() => { const P = []; for (let k = 0; k < 24; k++) { const u = k / 24 * 6.283, d = Math.abs(((u + Math.PI) % 6.283) - Math.PI), rr = 50 * (1 + 0.08 * Math.sin(u * 5 + 2)) * (d < 0.5 ? 0.55 + d * 0.9 : 1); P.push([Math.cos(u) * rr, Math.sin(u) * rr]); } return P; })();
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const col = hl > 0.01 ? _mixHex('#6F86A0', C.goud, hl * 0.6) : '#6F86A0';
  ctx.beginPath(); bioPad(ctx, _PRIM.map(([px, py]) => [px * r / 50, py * r / 50]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(_PRIM); _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 52, r: 7, col, seed: 2, key: 'prim' }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.22, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  if (rna > 0.01) { ctx.globalAlpha *= rna; const n = 4, st = r * 0.3, x0 = r * 1.0; for (let i = 0; i < n; i++) { ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, -i * st - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); }
  ctx.restore(); }
function _ligVorm(k) { const kaak = lerp(0.62, 0.36, k); return [[-0.9, 0], [-0.6, -0.75], [0.2, -0.95], [1.05, -kaak - 0.25], [1.15, -kaak], [0.45, -0.5], [0.3, 0], [0.45, 0.5], [1.15, kaak], [1.05, kaak + 0.25], [0.2, 0.95], [-0.6, 0.75]]; }
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const k = ease(sluit), col = hl > 0.01 ? _mixHex('#8392AE', C.goud, hl * 0.6) : '#8392AE', V0 = _ligVorm(k);
  ctx.beginPath(); bioPad(ctx, V0.map(([px, py]) => [px * r, py * r]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(V0.map(([px, py]) => [px * 100, py * 100])); // rijen dwars op de opening: elke rij is één stuk, ook de kaken vullen zich
    _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 100, r: 7, col, seed: 7, key: 'lig' + Math.round(k * 4) }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.18, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, r * 1.05, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k];
  DNA_BASE.base[k] = RNA_BASE.base[b]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (o.geenLetter) return; const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter[b], 'center'); ctx.restore(); }
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, len = DNA_BASE.len * s;
  if (!vorm || 44 * s < 18) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    const v = hw > 2.5 ? 0.5 : 0; ctx.fillStyle = fill; ctx.fillRect(-hw + v, 0, hw * 2 - 2 * v, len); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.strokeRect(-hw, 0, hw * 2, len); } ctx.restore();
    if (o.staafLetter && hw >= 5) { const fs = Math.min(hw * 1.5, len * 0.4), lx = x + Math.cos(ang) * len * 0.5, ly = y + Math.sin(ang) * len * 0.5; // letter in het staafje (vork met letters)
      ctx.save(); ctx.globalAlpha *= a; text(ctx, b, lx, ly + fs * 0.35, fTekst(fs, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
    return; }
  const op = Math.sin(ang) < 0, k = (rna && b === 'U') ? 'T' : b, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore(); if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos, m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
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
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1, dx * 0.25), vorm = false, letters = !!M.letters && dx >= 30;
  // ronde 3 (Kamiel 28 okt 2026: 'sommige nucleotiden zijn dubbel zo dik?'): elke base één staafje van gelijke dikte (de helft van
  // de afstand per bp) met een duidelijke spleet. Vroeger tekende de vork bij dx ≥ 22 de puzzelvorm, die breder is dan dx: twee
  // buren liepen in elkaar over en twee gelijke basen leken één dikke. In het echt zijn alle basen even breed (0,34 nm per bp).
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
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, staafLetter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, staafLetter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, staafLetter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, staafLetter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      const knip = (i) => M.knips.some(K => K.s < 1 && Math.abs(K.i - i) < 0.01);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - (knip(R.a - 0.5) ? 0.12 : 0.45), R.b + (knip(R.b + 0.5) ? 0.12 : 0.45)), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }
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
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + (st.hOff == null ? 1.8 : st.hOff)), _vorkYtop(M, f + (st.hOff == null ? 1.8 : st.hOff)), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx), a: st.lagA == null ? 1 : st.lagA }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
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
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
const _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function _lintVorm(poly) { const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
  return { binnen: (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; },
    bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] }; }
function _ellips(rx, ry) { return { binnen: (x, y) => (x * x) / (rx * rx) + (y * y) / (ry * ry) < 1, bbox: [-rx, -ry, rx, ry] }; }
function _gdPoly(cx, cy, r, n, seed, rond = 0) { const p = []; for (let i = 0; i < n; i++) { const an = (i + 0.2 * (hash(seed + i) - 0.5)) / n * 6.283; const rr = r * (0.9 + 0.2 * hash(seed * 3 + i)); p.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]); } return p; }
function _mrbKralen(ctx, pts, r, col, lw, stap = 1.9) { const P = bioDicht(pts, 12); let acc = 0; const k = [P[0]];
  for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * stap) { k.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba(lighten(col, 0.3), 0.6); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  k.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.2)); }); return k; }
function _tgBlob(ctx, x, y, rx, ry, seed, fill, rand, lw, wob = 0.12) { const p = []; for (let i = 0; i < 14; i++) { const u = i / 14 * 6.283; const k = 1 + wob * (hash(seed + i) - 0.5) * 2; p.push([x + Math.cos(u) * rx * k, y + Math.sin(u) * ry * k]); } ctx.beginPath(); bioPad(ctx, p, true); shape(ctx, fill, rand, lw); }
function _wbContour(x, y, r, f, n = 64) { const pts = []; for (let i = 0; i < n; i++) { const u = i / n * 6.283 - Math.PI; const rr = f(u); pts.push([x + Math.cos(u) * rr, y + Math.sin(u) * rr]); } return pts; }
function _pcNormaal(pts) { return pts.map((p, i) => { const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length]; let nx = b[1] - a[1], ny = -(b[0] - a[0]); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (nx * p[0] + ny * p[1] < 0) { nx = -nx; ny = -ny; } return [nx, ny]; }); }
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
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
const KK_R = 1.1; // kraalstraal t.o.v. de oude lint-buismaat o.r (zelfde rijdichtheid, iets voller dan de buis)
function _kkKluwen(ctx, cx, cy, binnen, o = {}) {
  const sc = o.sc || 1, bb = o.bbox || [-60, -50, 60, 50], opp = Math.PI / 4 * (bb[2] - bb[0]) * (bb[3] - bb[1]);
  const r = Math.max(Math.min(Math.max((o.r || 7) * KK_R, Math.sqrt(opp / 120)), 14 / sc), 4.5 / sc);
  return _grKralen(ctx, cx, cy, binnen, Object.assign({}, o, { r, key: 'kk|' + (o.key || 'k') + '|' + r.toFixed(2) }));
}
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
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

// Deel 2 (hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, schaalStreep) staat sinds 1.1 (29 okt 2026) in bibliotheek/lib_bio.js en komt uit het uittreksel lib_bio_deel.js.
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
    startlamp(ctx, 1500, 400, sd > 0.6 ? 1 : 0, B); startlamp(ctx, 1760, 320, 1, B); chip(ctx, 'gewoon later', 1500, 290, C.groen, sd, 26); },

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
      startlamp(ctx, 1080, 380, q.on('later', 1) > 0.5 ? 1 : 0, 1); startlamp(ctx, 1420, 320, 1, 1); tag(ctx, 'startsein komt gewoon wat later', 760, 200, C.groen, 1, 'center', 28); ctx.restore(); } },
});
