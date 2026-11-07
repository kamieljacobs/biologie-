// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: eicelEcht, zaadcelEcht, vrouwOrganenVoor, _vbBaarmoederVorm, eileiderDoorsnede, blastocyste, bioDicht, bioPunt, bioPad
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
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
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
const _polAchterLijst = [];
function _polT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function _polCvorm(x, y) { const ex = (x - 20) / 165, ey = y / 232; if (ex * ex + ey * ey > 1) return false; return !(x < 85 && Math.abs(y) < 122); }
function _polKlem(ctx, g, voor) { const r = 0.13 * g; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.22, z = Math.cos(an); if ((z >= 0) !== voor) continue;
  const X = -1.95 * g + Math.cos(an) * 0.34 * g, Y = Math.sin(an) * 1.2 * g; const c = voor ? '#A4B2CA' : '#5E6C84'; ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.283); shape(ctx, c, lighten(c, 0.3), 1); } }
function _polRomp(ctx, g, hl, al) { ctx.save(); ctx.globalAlpha *= al; const col = hl > 0.01 ? _mixHex('#66758F', C.goud, hl * 0.5) : '#66758F';
  _kkKluwen(ctx, 0, 0, _polCvorm, { bbox: [-145, -232, 185, 232], sc: g / 100, r: 9, col, seed: 4, key: 'polC' }); ctx.restore(); }
function _polVingers(ctx, g, sluit, hl) { // α-helix van de vingers: scharnier rechtsboven, klapt van schuin omhoog naar plat over de nucleotide
  const th = lerp(Math.PI - 0.75, Math.PI + 0.12, ease(sluit)), P0 = [1.0 * g, 1.3 * g], L = 1.0 * g, T = [P0[0] + Math.cos(th) * L, P0[1] + Math.sin(th) * L];
  const col = hl > 0.01 ? _mixHex('#C3CCDA', C.goud, hl * 0.6) : '#C3CCDA'; _kkHelix(ctx, P0, T, Math.max(2.5, 0.12 * g), col, { amp: 0.8 }); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  _polAchterLijst.push([x, y, g]); if (_polAchterLijst.length > 8) _polAchterLijst.shift();
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot); _polRomp(ctx, g, hl, 1); if (klem) _polKlem(ctx, g, false); ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return;
  const j = _polAchterLijst.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < g * 0.6 && Math.abs(p[2] - g) < g * 0.2); if (j >= 0) _polAchterLijst.splice(j, 1);
  ctx.save(); ctx.globalAlpha *= a; _polT(ctx, x, y, g, dir, up, rot);
  if (j < 0) { _polRomp(ctx, g, hl, 0.85); if (klem) _polKlem(ctx, g, false); }
  _polVingers(ctx, g, sluit, hl);
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2.5, g * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.05 * g, 0.86 * g, 0.26 * g, Math.PI * 1.1, Math.PI * 1.9, true); ctx.stroke();
  if (klem) _polKlem(ctx, g, true);
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
function _kkHex(c) { const m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c); return m ? '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('') : c; }
function _kkHelix(ctx, A, B, r, col, o = {}) {
  const { a = 1, fase = 0, amp = 0.9, stap = 0.95 } = o; if (a <= 0.01) return []; col = _kkHex(col); const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const n = Math.max(3, Math.round(L / (r * stap))), P = [];
  for (let i = 0; i <= n; i++) { const u = i / n, ph = i / 3.6 * 6.283 + fase; P.push([A[0] + ux * L * u + nx * Math.sin(ph) * r * amp, A[1] + uy * L * u + ny * Math.sin(ph) * r * amp, Math.cos(ph)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * 0.38); ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
  P.map((p, i) => i).sort((i, j) => P[i][2] - P[j][2]).forEach(i => { const p = P[i], z = p[2]; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.84 + 0.14 * z), 0, 6.283);
    shape(ctx, z >= 0 ? lighten(col, 0.06 + 0.08 * z) : _mixHex(col, '#000000', -0.18 * z), lighten(col, 0.3), 1); });
  ctx.restore(); return P;
}
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function _erfLicht() { const b = C.bgSchema || '#1A2740'; if (b[0] !== '#' || b.length < 7) return false; const n = parseInt(b.slice(1, 7), 16); return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) > 150; }
function _erfVeelhoek(ctx, x, y, r, an, fill, stroke, n = 6) { ctx.beginPath(); for (let i = 0; i < n; i++) { const a = an + i * 6.283 / n; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, fill, stroke, 1.2); }
