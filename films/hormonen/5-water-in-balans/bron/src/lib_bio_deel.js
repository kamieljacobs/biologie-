// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: nierBijnier, rodeBloedcel
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
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
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
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
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
