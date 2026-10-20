// Examenbespreking vwo 2018-II — tekenfuncties deel d (Wat te doen aan de muizenplagen?, vragen 31–38). Prefix d_.

const D_CTX = 'WAT TE DOEN AAN DE MUIZENPLAGEN?';
const D_GRAS = '#5FA86E', D_GRASD = '#3F7A4E', D_DROOG = '#A8955E', D_GROND = '#4A3626', D_GRONDD = '#3A2A1E', D_GANG = '#21160E', D_WATER = '#2E6FBF';
function d_win(t, t0, t1 = Infinity, d = 0.4) { return Math.min(ramp(t, t0, d), 1 - ramp(t, t1 - d, d)); }
function d_al(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function d_mix(h1, h2, k) { k = clamp(k, 0, 1); const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return `rgb(${c(16)},${c(8)},${c(0)})`; }
function d_ring(ctx, x, y, r, a, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + 6.283 * ease(a)); ctx.stroke(); ctx.restore(); }

// ---------- veldmuis (getekend: gedrongen, korte staart, kleine oortjes) ; (x,y) = grond onder het midden; kijk 1 = naar rechts ----------
function d_veldmuis(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round';
  const bob = loop ? Math.abs(Math.sin(t * 10)) * 3 : 0; ctx.translate(0, -bob);
  ctx.strokeStyle = '#6E5440'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-70, -30); ctx.quadraticCurveTo(-96, -26, -110, -14 + Math.sin(t * 3) * 3); ctx.stroke();
  [[-42, 0], [-12, 1], [28, 1.5], [52, 0.5]].forEach(([fx, i]) => { const dx = Math.sin(t * 10 + i * Math.PI) * 9 * loop; ctx.beginPath(); ctx.ellipse(fx + dx, -3 + bob, 13, 6, 0, 0, 6.283); ctx.fillStyle = '#C9A08A'; ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(-6, -42, 76, 44, 0, 0, 6.283); ctx.fillStyle = '#8B6B4E'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.ellipse(4, -8, 70, 22, 0, 0, 6.283); ctx.fillStyle = '#C2A584'; ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#6E5238'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const fx = -60 + i * 20; ctx.beginPath(); ctx.moveTo(fx, -70 + Math.abs(i - 2.5) * 4); ctx.lineTo(fx + 8, -60 + Math.abs(i - 2.5) * 4); ctx.stroke(); }
  const tw = Math.sin(t * 9) * 1.2;
  ctx.beginPath(); ctx.ellipse(58, -48, 40, 34, 0.15, 0, 6.283); ctx.fillStyle = '#8B6B4E'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(88, -38 + tw, 20, 16, 0.2, 0, 6.283); ctx.fillStyle = '#937458'; ctx.fill();
  circ(ctx, 46, -80, 14, '#7A5A40'); circ(ctx, 47, -79, 7.5, '#C99A88');
  circ(ctx, 80, -58, 6, '#121A26'); circ(ctx, 82, -60, 2, '#FFFFFF');
  circ(ctx, 106, -40 + tw, 5.5, '#C98A8A');
  ctx.strokeStyle = 'rgba(240,232,220,0.65)'; ctx.lineWidth = 1.6; [[-10], [0], [10]].forEach(([dy]) => { ctx.beginPath(); ctx.moveTo(98, -38 + tw); ctx.lineTo(134, -40 + dy * 1.2 + tw); ctx.stroke(); });
  ctx.restore(); }
// telmuisje (heel klein, voor aantallen in een veldje)
function d_muisje(ctx, x, y, s, a = 1, k = 1, t = 0) { d_veldmuis(ctx, x, y, s, a, t, { kijk: k }); }

// ---------- grasland in doorsnede ; kaal 0..1, water 0..1 ----------
function d_grasland(ctx, x, y, w, h, o = {}) { const { kaal = 0, t = 0, a = 1, water = 0, gangen = kaal, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip(); const sy = y + h * 0.5;
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = D_GROND; ctx.fillRect(x, sy, w, h); ctx.fillStyle = D_GRONDD; ctx.fillRect(x, sy + h * 0.32, w, h);
  // gangen + nestkamers
  if (gangen > 0.01) { ctx.save(); ctx.globalAlpha *= gangen; ctx.strokeStyle = water > 0.3 ? d_mix(D_GANG, D_WATER, water) : D_GANG; ctx.lineWidth = 15; ctx.lineCap = 'round';
    for (let i = 0; i < 4; i++) { const gx = x + w * (0.12 + i * 0.24) + hash(seed + i) * 30; ctx.beginPath(); ctx.moveTo(gx, sy); ctx.bezierCurveTo(gx + 20, sy + h * 0.15, gx + 70, sy + h * 0.12, gx + 120, sy + h * (0.2 + 0.1 * hash(i + 4))); ctx.lineTo(gx + w * 0.2, sy + h * 0.16); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(gx + 120, sy + h * (0.2 + 0.1 * hash(i + 4)) + 10, 30, 16, 0, 0, 6.283); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); }
    ctx.restore(); }
  // gras
  const N = Math.floor(w / 8);
  for (let i = 0; i < N; i++) { const r = hash(i * 3.1 + seed); if (r < kaal * 0.88) continue; const bx = x + (i + hash(i + 9)) * w / N, hh = (34 + hash(i + 17) * 34) * (1 - 0.7 * kaal); const sw = Math.sin(t * 1.6 + i * 0.5) * 4;
    ctx.strokeStyle = d_mix(i % 3 ? D_GRAS : D_GRASD, D_DROOG, kaal * 1.1); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(bx, sy + 2); ctx.quadraticCurveTo(bx + 2, sy - hh * 0.6, bx + 6 + sw, sy - hh); ctx.stroke(); }
  // gaten aan het oppervlak
  if (gangen > 0.01) { ctx.save(); ctx.globalAlpha *= gangen; for (let i = 0; i < 9; i++) { const hx = x + w * (0.06 + i * 0.11) + hash(i + 30) * 20; ctx.beginPath(); ctx.ellipse(hx, sy + 3, 16, 7, 0, 0, 6.283); ctx.fillStyle = '#140D08'; ctx.fill(); } ctx.restore(); }
  if (water > 0.01) { const lev = h * 0.18 * water; ctx.fillStyle = rgba(D_WATER, 0.6); ctx.fillRect(x, sy - lev, w, lev + 4); ctx.strokeStyle = rgba('#9CC8F0', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, sy - lev + Math.sin(xx * 0.05 + t * 2) * 3); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); return sy; }

// ---------- assen met labels (eigen, groter dan assen()) ----------
function d_assen(ctx, x, y, w, h, xl, yl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
  if (xl) text(ctx, xl, x + w, y + h + 40, fTekst(26, 600), C.text2, 'right'); if (yl) text(ctx, yl, x + 14, y - 18, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }
// lijn fn(s)->0..1 over [s0,u]
function d_lijn(ctx, x, y, w, h, fn, u, col, o = {}) { const s0 = o.s0 || 0; if (u <= s0 + 0.001) return; ctx.save(); if (o.a != null) ctx.globalAlpha *= o.a; ctx.strokeStyle = col; ctx.lineWidth = o.lw || 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath(); const n = 120; for (let i = 0; i <= n; i++) { const s = s0 + (u - s0) * i / n; const px = x + w * s, py = y + h - h * clamp(fn(s), -0.02, 1.05); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

// ---------- populatie door het jaar (jan..dec) ----------
const D_MND = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
function d_jaarFn(s) { const m = s * 12; if (m < 3) return 0.1 - 0.02 * m / 3; if (m < 10.6) return 0.08 + 0.86 * Math.pow((m - 3) / 7.6, 2.3); return 0.94 - 0.7 * Math.pow((m - 10.6) / 1.4, 1.3); }
function d_jaar(ctx, x, y, w, h, u, o = {}) { const { a = 1, hl = {}, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const banden = [['winter', 0, 2, C.teal], ['voorjaar', 2, 5, C.groen], ['zomer', 5, 8, C.goud], ['najaar', 8, 11, C.oker], ['winter', 11, 12, C.teal]];
  banden.forEach(([n, m0, m1, col], i) => { const k = hl[n] || 0; roundRect(ctx, x + w * m0 / 12 + 2, y, w * (m1 - m0) / 12 - 4, h, 10); shape(ctx, rgba(col, 0.06 + 0.12 * k), null); if (i < 4 && k > 0.01) d_al(ctx, k, () => text(ctx, n, x + w * (m0 + m1) / 24, y + 44, fTekst(32, 700), col, 'center')); });
  d_assen(ctx, x, y, w, h, '', 'aantal veldmuizen');
  D_MND.forEach((m, i) => text(ctx, m, x + w * (i + 0.5) / 12, y + h + 36, fTekst(24, 500), C.text2, 'center'));
  d_lijn(ctx, x, y, w, h, d_jaarFn, u, C.koraal, { lw: 7 });
  if (u > 0.01 && u < 0.999) { const px = x + w * u, py = y + h - h * d_jaarFn(u); circ(ctx, px, py, 10, C.koraal); }
  ctx.restore(); }

// ---------- J-curve-diagram vraag 32 (april..november, 0..7000) ----------
// m = maand-index: 0 = begin april, 1 = begin mei, 3 = begin juli, 7 = begin november, 8 = eind november
function d_N1(m) { return 10 * Math.pow(600, (m - 1) / 6); }
function d_N2(m) { return 42 * Math.pow(600, (m - 3) / 6); }
const D_JM = ['april', 'mei', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov'];
function d_jdiag(ctx, x, y, w, h, o = {}) { const { a = 1, u1 = 0, u2 = 0, mk = [], hl1 = 0, hl2 = 0, water = 0, t = 0, legenda = 1, dim1 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (m) => x + w * m / 8, Y = (n) => y + h - h * n / 7000;
  // raster
  ctx.strokeStyle = rgba(C.line, 0.13); ctx.lineWidth = 1; for (let i = 0; i <= 32; i++) { ctx.beginPath(); ctx.moveTo(x + w * i / 32, y); ctx.lineTo(x + w * i / 32, y + h); ctx.stroke(); } for (let i = 0; i <= 28; i++) { ctx.beginPath(); ctx.moveTo(x, y + h * i / 28); ctx.lineTo(x + w, y + h * i / 28); ctx.stroke(); }
  ctx.strokeStyle = rgba(C.line, 0.3); for (let i = 0; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 1000)); ctx.lineTo(x + w, Y(i * 1000)); ctx.stroke(); }
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; roundRect(ctx, X(3) - 4, y, w / 8 * 0.18, h, 6); shape(ctx, rgba(D_WATER, 0.35), rgba('#9CC8F0', 0.7), 2); ctx.restore(); }
  d_assen(ctx, x, y, w, h, '', 'aantal veldmuizen');
  for (let i = 0; i <= 7; i++) text(ctx, String(i * 1000), x - 14, Y(i * 1000) + 9, fTekst(24, 500), C.text2, 'right');
  D_JM.forEach((m, i) => text(ctx, m, X(i + 0.5), y + h + 36, fTekst(24, 500), C.text2, 'center'));
  const curve = (fn, m0, m1, u, col, dash, lw) => { if (u <= 0.001) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const me = m0 + (m1 - m0) * clamp(u, 0, 1); for (let i = 0; i <= 140; i++) { const m = m0 + (me - m0) * i / 140; const px = X(m), py = Y(fn(m)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); };
  const c1 = d_mix(C.koraal, '#6A7488', dim1);
  if (hl1 > 0.01) curve(d_N1, 1, 7, u1, rgba(C.koraal, 0.3 * hl1), null, 20);
  if (hl2 > 0.01) curve(d_N2, 3, 7, u2, rgba(C.teal, 0.3 * hl2), null, 20);
  curve(d_N1, 1, 7, u1, c1, null, 6);
  curve(d_N2, 3, 7, u2, C.teal, [16, 12], 6);
  if (u1 > 0.001 && u1 < 0.999) { const m = 1 + 6 * u1; circ(ctx, X(m), Y(d_N1(m)), 9, C.koraal); }
  if (u2 > 0.001 && u2 < 0.999) { const m = 3 + 4 * u2; circ(ctx, X(m), Y(d_N2(m)), 9, C.teal); }
  mk.forEach((p) => { if ((p.a || 0) <= 0.01) return; const px = X(p.m), py = Y(p.n); d_al(ctx, p.a, () => { circ(ctx, px, py, 9, p.col || C.goud); d_ring(ctx, px, py, 22, p.a, p.col || C.goud); if (p.t) naamBij(ctx, p.t, null, px + (p.dx || 30), py + (p.dy || -26), 1, p.al || 'left', p.col || C.goud); }); });
  if (legenda > 0.01) d_al(ctx, legenda, () => { const lx = x + 30, ly = y + 40; ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 60, ly); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(lx, ly + 42); ctx.lineTo(lx + 60, ly + 42); ctx.stroke(); ctx.restore();
    text(ctx, 'zonder ingreep', lx + 76, ly + 9, fTekst(26, 600), C.text, 'left'); text(ctx, 'met ingreep', lx + 76, ly + 51, fTekst(26, 600), C.text, 'left'); });
  ctx.restore(); return { X, Y }; }
// inzoomvenster op de knik in juli (mei..aug, 0..200)
function d_jzoom(ctx, x, y, w, h, o = {}) { const { a = 1, u1 = 1, u2 = 1, mk80 = 0, mk40 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.save(); ctx.globalAlpha *= Math.min(1, a * 6);
  roundRect(ctx, x - 20, y - 70, w + 70, h + 130, 18); shape(ctx, '#16223A', C.goud, 2.5); ctx.restore(); ctx.globalAlpha *= a; metaText(ctx, 'ingezoomd · mei – aug', x, y - 30, C.goud, 'left', 22);
  const m0 = 1, m1 = 5, N1 = 200, X = (m) => x + w * (m - m0) / (m1 - m0), Y = (n) => y + h - h * n / N1;
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 50)); ctx.lineTo(x + w, Y(i * 50)); ctx.stroke(); text(ctx, String(i * 50), x - 12, Y(i * 50) + 8, fTekst(22, 500), C.text2, 'right'); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ['mei', 'juni', 'juli', 'aug'].forEach((m, i) => text(ctx, m, X(1.5 + i), y + h + 32, fTekst(22, 500), C.text2, 'center'));
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - 4, w, h + 4); ctx.clip();
  const cur = (fn, a0, a1, u, col, dash) => { if (u <= 0.001) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const me = a0 + (a1 - a0) * u; for (let i = 0; i <= 80; i++) { const m = a0 + (me - a0) * i / 80; i ? ctx.lineTo(X(m), Y(fn(m))) : ctx.moveTo(X(m), Y(fn(m))); } ctx.stroke(); ctx.restore(); };
  cur(d_N1, 1, 5, u1, C.koraal); cur(d_N2, 3, 5, u2, C.teal, [14, 10]);
  if (u2 > 0.01) { ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(3), Y(84)); ctx.lineTo(X(3), Y(42)); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (mk80 > 0.01) d_al(ctx, mk80, () => { circ(ctx, X(3), Y(84), 9, C.koraal); d_ring(ctx, X(3), Y(84), 22, mk80, C.koraal); naamBij(ctx, '≈ 80', null, X(3) - 34, Y(84) - 22, 1, 'right', C.koraal); });
  if (mk40 > 0.01) d_al(ctx, mk40, () => { circ(ctx, X(3), Y(42), 9, C.teal); d_ring(ctx, X(3), Y(42), 22, mk40, C.teal); naamBij(ctx, '≈ 40', null, X(3) + 34, Y(42) + 34, 1, 'left', C.teal); });
  ctx.restore(); }

// ---------- staafdiagram afbeelding 3 (nagetekend uit o-20.png) ----------
const D_STAAF = [[null, null, 12, 9], [null, 15, 9, 27], [3, null, 12, 30], [2, 3, 19, 53], [null, null, 30, 72], [null, 17, 35, 72]];
const D_STAAF_X = ['0-20', '20-40', '40-60', '60-80', '80-100', '100-120'];
const D_OPEN = [['0-15 m', '#2F6B57'], ['15-30 m', '#4F9A86'], ['30-300 m', '#A8C77A'], ['300-900 m', '#E8C45E']];
function d_staaf(ctx, x, y, w, h, o = {}) { const { a = 1, grow = 1, hlG = -1, hlA = 0, hlK = -1, hlKA = 0, rings = [], spread = 0, nul = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const Y = (v) => y + h - h * v / 80, gw = w / 6, bw = gw * 0.17;
  ctx.strokeStyle = rgba(C.line, 0.28); ctx.lineWidth = 1.5; for (let i = 1; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 10)); ctx.lineTo(x + w, Y(i * 10)); ctx.stroke(); }
  for (let i = 0; i <= 8; i++) text(ctx, String(i * 10), x - 14, Y(i * 10) + 9, fTekst(24, 500), C.text2, 'right');
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  text(ctx, '% schademeldingen', x + 14, y - 22, fTekst(26, 600), C.text2, 'left');
  D_STAAF.forEach((g, gi) => { const gx = x + gw * gi + gw / 2; const dimG = hlG >= 0 && gi !== hlG ? hlA : 0;
    if (hlG === gi && hlA > 0.01) d_al(ctx, hlA, () => { roundRect(ctx, gx - gw / 2 + 6, y - 4, gw - 12, h + 8, 12); shape(ctx, rgba(C.goud, 0.1), C.goud, 2.5); });
    text(ctx, D_STAAF_X[gi] + ' cm', gx, y + h + 36, fTekst(24, hlG === gi && hlA > 0.5 ? 700 : 500), hlG === gi && hlA > 0.5 ? C.goud : C.text2, 'center');
    g.forEach((v, bi) => { const bx = gx + (bi - 2) * bw; if (v == null) { if (nul > 0.01 && gi === hlG && bi < 2) d_al(ctx, nul, () => text(ctx, '0', bx + bw / 2, Y(0) - 12, fTekst(26, 800), C.koraal, 'center')); return; }
      const gr = clamp(grow * 6 - gi, 0, 1); const vh = v * ease(gr); if (vh <= 0.05) return; const dimK = hlK >= 0 && bi !== hlK ? hlKA : 0; const dm = Math.max(dimG, dimK);
      ctx.save(); ctx.globalAlpha *= 1 - 0.72 * dm; ctx.beginPath(); ctx.rect(bx + 2, Y(vh), bw - 4, Y(0) - Y(vh)); shape(ctx, D_OPEN[bi][1], '#0E1626', 1.5); ctx.restore(); });
  });
  rings.forEach((r) => { if ((r.a || 0) <= 0.01) return; const v = D_STAAF[r.g][r.b]; const bx = x + gw * r.g + gw / 2 + (r.b - 1.5) * bw; d_ring(ctx, bx, Y(v) - 4, 26, r.a, r.col || C.goud); if (r.t) d_al(ctx, r.a, () => naamBij(ctx, r.t, null, bx + (r.dx || 34), Y(v) + (r.dy || -10), 1, r.al || 'left', r.col || C.goud)); });
  if (spread > 0.01 && hlG >= 0) d_al(ctx, spread, () => { const gx = x + gw * hlG + gw / 2 - gw * 0.5 + 4; const top = Y(D_STAAF[hlG][3]); pijl(ctx, gx, Y(0) - 6, gx, top + 6 + (Y(0) - top) * (1 - ease(spread)), C.goud, 1, 5, 18); pijl(ctx, gx, top + 6, gx, top + 7, C.goud, 1, 5, 18); });
  // legenda
  const ly = y + h + 84; text(ctx, 'openheid:', x, ly + 8, fTekst(26, 600), C.text2, 'left');
  D_OPEN.forEach(([n, col], i) => { const lx = x + 140 + (i % 2) * 230, ly2 = ly + Math.floor(i / 2) * 40; const dk = hlK >= 0 && i !== hlK ? hlKA : 0; d_al(ctx, 1 - 0.6 * dk, () => { ctx.beginPath(); ctx.rect(lx, ly2 - 14, 30, 26); shape(ctx, col, '#0E1626', 1.5); text(ctx, n, lx + 40, ly2 + 8, fTekst(24, 600), C.text, 'left'); }); });
  text(ctx, 'drooglegging →', x + w, ly + 8, fTekst(24, 600), C.text2, 'right');
  ctx.restore(); }

// ---------- Nederland in zeshoeken ----------
const D_NL = [[3.37, 51.37], [3.9, 51.22], [4.3, 51.37], [4.8, 51.45], [5.1, 51.43], [5.5, 51.28], [5.85, 51.15], [5.68, 50.85], [5.75, 50.76], [6.02, 50.78], [6.08, 51.0], [5.95, 51.22], [6.2, 51.5], [5.95, 51.8], [6.2, 51.87], [6.8, 51.95], [6.75, 52.1], [7.05, 52.25], [6.95, 52.45], [6.7, 52.52], [7.05, 52.65], [7.2, 53.0], [7.2, 53.25], [6.9, 53.38], [6.2, 53.42], [5.6, 53.4], [5.15, 53.2], [5.4, 52.95], [5.25, 52.85], [5.05, 52.75], [5.1, 52.95], [4.75, 52.95], [4.6, 52.5], [4.4, 52.2], [4.0, 51.95], [3.6, 51.6], [3.45, 51.5]];
function d_nlKaart(ctx, x, y, s, o = {}) { const { a = 1, hex = 1, rood = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = (lo, la) => [x + (lo - 3.3) * 160 * s, y + (53.5 - la) * 260 * s]; const pad = new Path2D(); D_NL.forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? pad.lineTo(px, py) : pad.moveTo(px, py); }); pad.closePath();
  ctx.fillStyle = rgba(C.groen, 0.12); ctx.fill(pad); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke(pad);
  const r = 13 * s, dx = r * Math.sqrt(3), dy = r * 1.5; let k = 0;
  for (let j = 0; j < 60; j++) for (let i = 0; i < 60; i++) { const cx = x + i * dx + (j % 2) * dx / 2, cy = y + j * dy; if (cx > x + 680 * s || cy > y + 780 * s) continue; if (!ctx.isPointInPath(pad, cx, cy)) continue; k++;
    const vis = clamp(hex * 1.6 - (cy - y) / (780 * s) * 0.6, 0, 1); if (vis <= 0.01) continue; const isR = hash(k * 1.7) < 0.28 && rood > 0.01;
    ctx.save(); ctx.globalAlpha *= vis; ctx.beginPath(); for (let q = 0; q < 6; q++) { const an = Math.PI / 6 + q * Math.PI / 3; const px = cx + Math.cos(an) * r * 0.94, py = cy + Math.sin(an) * r * 0.94; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
    shape(ctx, isR ? d_mix('#2A3A58', C.koraal, rood) : '#2A3A58', rgba(C.line, 0.55), 1.2); ctx.restore(); }
  ctx.restore(); }
// openheid: oog met zichtlijn; dicht (struiken) of open
function d_openheid(ctx, x, y, w, o = {}) { const { a = 1, u = 1, open = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = D_GRAS; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x + 30, y - 60, 26, 15, 0, 0, 6.283); shape(ctx, '#F2F2EE', C.line, 2); circ(ctx, x + 36, y - 60, 9, '#2A3A58'); circ(ctx, x + 38, y - 62, 3, '#FFF');
  const reik = open ? w - 90 : 170; ctx.save(); ctx.setLineDash([10, 9]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 62, y - 60); ctx.lineTo(x + 62 + reik * ease(u), y - 60); ctx.stroke(); ctx.restore();
  if (!open) { d_struik(ctx, x + 250, y, 1.1); d_struik(ctx, x + 330, y, 0.9); d_boompje(ctx, x + 420, y, 0.9); }
  ctx.restore(); }
function d_struik(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-28, -34, 30], [0, -52, 36], [30, -34, 30], [12, -24, 26], [-14, -22, 24]].forEach(([dx, dy, r], i) => circ(ctx, x + dx * s, y + dy * s, r * s, i % 2 ? '#3F7A4E' : '#4C8C5A')); ctx.restore(); }
function d_boompje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6A4A32'; ctx.fillRect(x - 7 * s, y - 70 * s, 14 * s, 70 * s); [[0, -110, 48], [-34, -84, 34], [34, -84, 34], [0, -140, 34]].forEach(([dx, dy, r], i) => circ(ctx, x + dx * s, y + dy * s, r * s, i % 2 ? '#3A7048' : '#47855A')); ctx.restore(); }
// bodemprofiel met drooglegging
function d_profiel(ctx, x, y, w, h, o = {}) { const { a = 1, diep = 0.55, pijlA = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); ctx.save(); ctx.clip(); ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h); const sy = y + 60; ctx.fillStyle = D_GROND; ctx.fillRect(x, sy, w, h);
  const gy = sy + (h - 70) * diep; ctx.fillStyle = rgba(D_WATER, 0.55); ctx.fillRect(x, gy, w, h); ctx.strokeStyle = '#9CC8F0'; ctx.lineWidth = 3; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 8) ctx.lineTo(xx, gy + Math.sin(xx * 0.06 + t * 2) * 2.5); ctx.stroke();
  for (let i = 0; i < w / 9; i++) { const bx = x + i * 9 + 3; ctx.strokeStyle = i % 3 ? D_GRAS : D_GRASD; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, sy); ctx.lineTo(bx + 3, sy - 16 - hash(i) * 14); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke();
  if (pijlA > 0.01) d_al(ctx, pijlA, () => { const px = x + w * 0.62; pijl(ctx, px, sy + 6, px, gy - 6, C.goud, 1, 5, 16); pijl(ctx, px, gy - 6, px, sy + 6, C.goud, 1, 5, 16);
    naamBij(ctx, 'drooglegging', null, px + 22, (sy + gy) / 2 + 12, 1, 'left', C.goud); naamBij(ctx, 'maaiveld', null, x + 18, sy - 22, 1, 'left'); naamBij(ctx, 'grondwater', null, x + 18, gy + 50, 1, 'left', '#9CC8F0'); });
  ctx.restore(); }

// ---------- dieren ----------
function d_vos(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // staart
  const zw = Math.sin(t * 2) * 6; ctx.beginPath(); ctx.moveTo(-70, -88); ctx.bezierCurveTo(-130, -100, -190, -70 + zw, -215, -40 + zw); ctx.bezierCurveTo(-180, -40 + zw, -120, -50, -70, -62); ctx.closePath(); ctx.fillStyle = '#C8692E'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-190, -56 + zw); ctx.bezierCurveTo(-200, -50 + zw, -210, -46 + zw, -215, -40 + zw); ctx.bezierCurveTo(-200, -38 + zw, -190, -42 + zw, -182, -46 + zw); ctx.closePath(); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  // poten
  [[-50, 0], [-30, 1], [48, 1], [68, 0]].forEach(([px, i]) => { const sw = Math.sin(t * 9 + i * Math.PI) * 12 * loop; ctx.strokeStyle = '#2E221C'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(px, -70); ctx.lineTo(px + sw, -4); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, -84, 92, 36, 0, 0, 6.283); ctx.fillStyle = '#D8783A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(70, -70, 26, 22, 0, 0, 6.283); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  // kop
  ctx.beginPath(); ctx.moveTo(70, -120); ctx.quadraticCurveTo(100, -150, 130, -126); ctx.lineTo(176, -104); ctx.quadraticCurveTo(170, -92, 140, -92); ctx.quadraticCurveTo(100, -84, 78, -96); ctx.closePath(); ctx.fillStyle = '#D8783A'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(130, -100); ctx.lineTo(176, -104); ctx.quadraticCurveTo(168, -92, 140, -92); ctx.closePath(); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  circ(ctx, 178, -104, 6, '#1A1412');
  [[86, -134, 92, -176, 112, -140], [104, -138, 118, -178, 128, -132]].forEach(([a1, b1, a2, b2, a3, b3]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.lineTo(a3, b3); ctx.closePath(); ctx.fillStyle = '#B85A26'; ctx.fill(); ctx.beginPath(); ctx.moveTo(a2, b2); ctx.lineTo(a2 + (a1 - a2) * 0.35, b2 + (b1 - b2) * 0.35); ctx.lineTo(a2 + (a3 - a2) * 0.35, b2 + (b3 - b2) * 0.35); ctx.closePath(); ctx.fillStyle = '#2E221C'; ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(126, -118, 6, 3.5, -0.3, 0, 6.283); ctx.fillStyle = '#1A1412'; ctx.fill();
  ctx.restore(); }
function d_wezel(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const golf = loop ? Math.sin(t * 8) * 6 : 0;
  ctx.strokeStyle = '#8A5A30'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-96, -26); ctx.quadraticCurveTo(-125, -30, -140, -18); ctx.stroke();
  [[-80, 0], [-62, 1], [46, 1], [62, 0]].forEach(([px, i]) => { const sw = Math.sin(t * 12 + i * Math.PI) * 8 * loop; ctx.strokeStyle = '#7A4E2A'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(px, -22); ctx.lineTo(px + sw, -3); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-100, -30); ctx.bezierCurveTo(-60, -58 - golf, 20, -58 + golf, 70, -44); ctx.quadraticCurveTo(84, -30, 70, -16); ctx.bezierCurveTo(20, -16, -60, -14, -100, -16); ctx.quadraticCurveTo(-112, -24, -100, -30); ctx.closePath(); ctx.fillStyle = '#9A6A3E'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-80, -18); ctx.bezierCurveTo(-30, -24, 30, -24, 70, -18); ctx.quadraticCurveTo(40, -14, -80, -15); ctx.closePath(); ctx.fillStyle = '#F2E6CC'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(86, -50, 26, 17, -0.15, 0, 6.283); ctx.fillStyle = '#9A6A3E'; ctx.fill(); ctx.beginPath(); ctx.ellipse(94, -40, 18, 7, -0.1, 0, 6.283); ctx.fillStyle = '#F2E6CC'; ctx.fill();
  circ(ctx, 76, -66, 8, '#8A5A30'); circ(ctx, 92, -55, 4, '#121A26'); circ(ctx, 112, -50, 4, '#2A1A12');
  ctx.restore(); }
function d_konijn(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -30, 40, 30, 0, 0, 6.283); ctx.fillStyle = '#A89A8A'; ctx.fill(); circ(ctx, -38, -36, 10, '#F2EEE6'); ctx.beginPath(); ctx.ellipse(36, -52, 20, 18, 0, 0, 6.283); ctx.fillStyle = '#A89A8A'; ctx.fill();
  [[30, -66, -0.3], [42, -68, 0.1]].forEach(([ex, ey, r]) => { ctx.beginPath(); ctx.ellipse(ex, ey - 22, 7, 24, r, 0, 6.283); ctx.fillStyle = '#9A8C7C'; ctx.fill(); }); circ(ctx, 44, -56, 3.5, '#121A26'); ctx.restore(); }
function d_vogeltje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -24, 26, 18, -0.2, 0, 6.283); ctx.fillStyle = '#7A6A58'; ctx.fill(); circ(ctx, 22, -38, 13, '#7A6A58'); ctx.beginPath(); ctx.moveTo(33, -40); ctx.lineTo(46, -36); ctx.lineTo(33, -33); ctx.fillStyle = C.goud; ctx.fill(); circ(ctx, 25, -41, 3, '#121A26');
  ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(-44, -30); ctx.lineTo(-40, -16); ctx.closePath(); ctx.fillStyle = '#5E5040'; ctx.fill(); ctx.beginPath(); ctx.ellipse(-4, -26, 16, 9, -0.3, 0, 6.283); ctx.fillStyle = '#5E5040'; ctx.fill(); ctx.restore(); }
function d_kever(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#1A1A1A'; ctx.lineWidth = 3; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 10, -16); ctx.lineTo(i * 14, 0); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -22, 20, 15, 0, 0, 6.283); ctx.fillStyle = '#3A6A4A'; ctx.fill(); ctx.strokeStyle = '#1E3A28'; ctx.beginPath(); ctx.moveTo(0, -37); ctx.lineTo(0, -8); ctx.stroke(); circ(ctx, 22, -24, 8, '#22382A'); ctx.restore(); }
function d_bessen(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#4C7A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, -30); ctx.stroke(); [[-12, -22], [10, -24], [0, -10], [-6, -36], [12, -40]].forEach(([dx, dy]) => circ(ctx, dx, dy, 9, '#8A2E4A', '#5A1A30', 1.5)); ctx.restore(); }
// roofvogel (torenvalk); vlieg 0..1: 0 = zittend, 1 = vliegend met slaande vleugels
function d_valk(ctx, x, y, s, a = 1, t = 0, vlieg = 0, k = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineJoin = 'round';
  const fl = Math.sin(t * 9) * 0.9 * vlieg;
  ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-70, -6); ctx.lineTo(-66, 6); ctx.lineTo(-26, -6); ctx.closePath(); ctx.fillStyle = '#8A8A96'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -22, 38, 20, -0.15, 0, 6.283); ctx.fillStyle = '#B5653A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(6, -14, 26, 10, -0.15, 0, 6.283); ctx.fillStyle = '#E8D2B0'; ctx.fill();
  circ(ctx, 36, -40, 16, '#8A8A96'); ctx.beginPath(); ctx.moveTo(48, -42); ctx.quadraticCurveTo(60, -40, 52, -30); ctx.lineTo(48, -34); ctx.closePath(); ctx.fillStyle = '#E0B64A'; ctx.fill(); circ(ctx, 40, -44, 4, '#121A26'); circ(ctx, 41, -45, 1.4, '#FFF');
  ctx.save(); ctx.translate(-4, -30); ctx.rotate(-0.25 - fl * (vlieg > 0 ? 1 : 0) - 0.9 * vlieg); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-30, -10 - 40 * vlieg, -66, -14 - 40 * vlieg); ctx.lineTo(-40, 6); ctx.closePath(); ctx.fillStyle = '#9A5230'; ctx.fill();
  ctx.strokeStyle = '#3A2418'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-36 - i * 7, -6 - 30 * vlieg * (0.6 + i * 0.1)); ctx.lineTo(-46 - i * 6, -10 - 34 * vlieg * (0.6 + i * 0.1)); ctx.stroke(); } ctx.restore();
  if (vlieg < 0.5) { ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(4, -4); ctx.lineTo(4, 6); ctx.moveTo(14, -4); ctx.lineTo(14, 6); ctx.stroke(); }
  ctx.restore(); }
function d_nestkast(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#6A5A48'; ctx.fillRect(-8, -260, 16, 260); ctx.beginPath(); ctx.rect(-50, -350, 100, 96); shape(ctx, '#B08A5C', '#7A5E3C', 3);
  ctx.beginPath(); ctx.moveTo(-62, -346); ctx.lineTo(0, -386); ctx.lineTo(62, -346); ctx.closePath(); shape(ctx, '#7A5E3C', null); circ(ctx, 0, -306, 18, '#2A1C12'); ctx.restore(); }
function d_koe(ctx, x, y, s, a = 1, t = 0, k = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round';
  [[-70], [-46], [52], [74]].forEach(([px]) => { ctx.strokeStyle = '#E8E4DC'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(px, -70); ctx.lineTo(px, -8); ctx.stroke(); ctx.fillStyle = '#2A2A2A'; ctx.fillRect(px - 8, -10, 16, 10); });
  roundRect(ctx, -100, -150, 210, 96, 40); ctx.fillStyle = '#F2EEE6'; ctx.fill(); ctx.save(); roundRect(ctx, -100, -150, 210, 96, 40); ctx.clip(); [[-50, -130, 34, 26], [30, -100, 40, 30], [80, -146, 26, 20]].forEach(([ex, ey, rx, ry]) => { ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0.3, 0, 6.283); ctx.fillStyle = '#2A2A2A'; ctx.fill(); }); ctx.restore();
  ctx.beginPath(); ctx.ellipse(-20, -52, 20, 12, 0, 0, 6.283); ctx.fillStyle = '#E8A6A6'; ctx.fill();
  ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-98, -136); ctx.quadraticCurveTo(-120, -110, -112, -70 + Math.sin(t * 2) * 6); ctx.stroke();
  const nk = Math.sin(t * 1.3) * 4; ctx.save(); ctx.translate(122, -128 + nk); roundRect(ctx, -20, -26, 64, 56, 22); ctx.fillStyle = '#F2EEE6'; ctx.fill(); ctx.beginPath(); ctx.ellipse(-2, -20, 14, 10, 0, 0, 6.283); ctx.fillStyle = '#2A2A2A'; ctx.fill();
  roundRect(ctx, 14, 4, 34, 26, 12); ctx.fillStyle = '#E8B4B0'; ctx.fill(); circ(ctx, 18, -8, 4, '#121A26'); ctx.strokeStyle = '#D8D2C2'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -26); ctx.lineTo(-14, -40); ctx.moveTo(10, -26); ctx.lineTo(16, -40); ctx.stroke(); ctx.restore();
  ctx.restore(); }
function d_hooibaal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - r, r, '#D8B864', '#B8964A', 3); ctx.strokeStyle = '#B8964A'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i < 60; i++) { const an = i * 0.35, rr = r * (1 - i / 64); i ? ctx.lineTo(x + Math.cos(an) * rr, y - r + Math.sin(an) * rr) : ctx.moveTo(x + rr, y - r); } ctx.stroke(); ctx.restore(); }
function d_trekker(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // ploeg achter (links)
  ctx.strokeStyle = '#5A6070'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-80, -50); ctx.lineTo(-230, -50); ctx.stroke(); for (let i = 0; i < 3; i++) { const px = -110 - i * 50; ctx.beginPath(); ctx.moveTo(px, -50); ctx.lineTo(px - 10, -6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(px - 22, 0); ctx.quadraticCurveTo(px - 6, -14, px + 4, -2); ctx.fillStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.stroke(); }
  roundRect(ctx, -70, -110, 220, 60, 10); shape(ctx, '#3E8A4E', '#2C6A3A', 2); ctx.beginPath(); ctx.rect(-40, -200, 100, 92); shape(ctx, rgba('#9CC8F0', 0.35), '#2C6A3A', 6); ctx.fillStyle = '#2C6A3A'; ctx.fillRect(-46, -206, 112, 10); ctx.fillStyle = '#4A4E58'; ctx.fillRect(110, -150, 10, 40);
  const wiel = (cx, cy, r) => { circ(ctx, cx, cy, r, '#1E2228'); circ(ctx, cx, cy, r * 0.5, '#C9A35C'); ctx.strokeStyle = '#3A3E46'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r * 0.55, cy + Math.sin(an) * r * 0.55); ctx.lineTo(cx + Math.cos(an) * r * 0.95, cy + Math.sin(an) * r * 0.95); ctx.stroke(); } };
  wiel(-20, -50, 50); wiel(120, -32, 32); ctx.restore(); }
function d_korrels(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const kx = x + (hash(i) - 0.5) * 90 * s, ky = y - hash(i + 5) * 22 * s; ctx.beginPath(); ctx.ellipse(kx, ky, 9 * s, 5 * s, hash(i + 2) * 3, 0, 6.283); shape(ctx, '#4FB0A0', '#2E7A6E', 1.5); } ctx.restore(); }

// ---------- bloedvat met wondje: stolling (net) of bloeding ; net 0..1, bloed 0..1 ----------
function d_bloedvat(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, net = 0, bloed = 0, fibrinogeen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const top = y, bot = y + h, gx = x + w * 0.5, gw = 90; const boog = (xx) => Math.sin((xx - x) / w * Math.PI) * 14;
  // bloeding onder het wondje
  if (bloed > 0.01) { ctx.save(); for (let i = 0; i < 26; i++) { const r = hash(i * 2.3), u = clamp(bloed * 1.4 - r * 0.4, 0, 1); if (u <= 0) continue; const bx = gx + (hash(i + 7) - 0.5) * 300 * u, by = bot + boog(gx) + 18 + 90 * u * hash(i + 3); d_rbc(ctx, bx, by, 13, hash(i) * 3, 0.9); } ctx.restore();
    ctx.save(); ctx.globalAlpha *= bloed * 0.35; ctx.beginPath(); ctx.ellipse(gx, bot + boog(gx) + 60, 200 * bloed, 60 * bloed, 0, 0, 6.283); ctx.fillStyle = '#A8323A'; ctx.fill(); ctx.restore(); }
  // vatwand (licht gebogen), met opening onder
  ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, top - boog(xx)); for (let xx = x + w; xx >= x; xx -= 10) ctx.lineTo(xx, bot + boog(xx)); ctx.closePath(); ctx.fillStyle = 'rgba(120,30,40,0.25)'; ctx.fill();
  ctx.strokeStyle = '#D88E8E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, top - boog(xx)); ctx.stroke();
  ctx.beginPath(); for (let xx = x; xx <= gx - gw / 2; xx += 10) ctx.lineTo(xx, bot + boog(xx)); ctx.stroke(); ctx.beginPath(); for (let xx = gx + gw / 2; xx <= x + w; xx += 10) ctx.lineTo(xx, bot + boog(xx)); ctx.stroke();
  // rode bloedcellen stromen
  ctx.save(); ctx.beginPath(); ctx.rect(x, top - 30, w, h + 60); ctx.clip();
  for (let i = 0; i < 22; i++) { const sp = 90 + hash(i) * 40; const bx = x + ((hash(i + 1) * w + t * sp) % w), by = top + 18 + hash(i + 2) * (h - 36) + boog(bx) * 0.0; const trap = net > 0.5 && Math.abs(bx - gx) < 70 ? 1 : 0; d_rbc(ctx, trap ? gx + (hash(i) - 0.5) * 120 : bx, by + (bx > gx - 60 && bx < gx + 60 ? 0 : 0) + (bot - top) * 0 + boog(bx) * 0.5, 14, i, 1); }
  // fibrinogeen (staafjes) en fibrine (draden)
  if (fibrinogeen > 0.01) for (let i = 0; i < 18; i++) { const bx = x + ((hash(i + 40) * w + t * 70) % w), by = top + 20 + hash(i + 41) * (h - 40); const near = Math.max(0, 1 - Math.abs(bx - gx) / 160); if (net > 0.3 && near > 0.2) continue; ctx.save(); ctx.globalAlpha *= fibrinogeen; ctx.translate(bx, by); ctx.rotate(hash(i + 3) * 3 + t * 0.6); roundRect(ctx, -11, -3, 22, 6, 3); shape(ctx, '#E8D27A', null); ctx.restore(); }
  ctx.restore();
  if (net > 0.01) { ctx.save(); ctx.strokeStyle = '#F2E2A0'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const u = clamp(net * 1.6 - i * 0.05, 0, 1); if (u <= 0) continue; const x1 = gx - 110 + hash(i) * 220, y1 = bot + boog(gx) - 70 + hash(i + 9) * 40, x2 = gx - 110 + hash(i + 4) * 220, y2 = bot + boog(gx) + 26 - hash(i + 2) * 16; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2 + 20, (y1 + y2) / 2, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function d_rbc(ctx, x, y, r, rot = 0, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot * 0.3); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.8, 0, 0, 6.283); ctx.fillStyle = '#C8414A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, r * 0.32, 0, 0, 6.283); ctx.fillStyle = '#A0303A'; ctx.fill(); ctx.restore(); }

// ---------- sloot in doorsnede met stikstof (vraag 35) ----------
// st = {gangen, o2, bact, poep, gras (1 = vol, 0 = aangevreten), opname, uitspoel, sloot (0..1 stikstof in de sloot)}
function d_sloot(ctx, x, y, w, h, st = {}, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sy = y + h * 0.36, dx0 = x + w * 0.72; roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip();
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h);
  // bodem met sloot rechts
  ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(dx0, sy); ctx.lineTo(dx0 + 70, sy + h * 0.3); ctx.lineTo(x + w - 20, sy + h * 0.3); ctx.lineTo(x + w + 30, sy - 10); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fillStyle = D_GROND; ctx.fill();
  const wl = sy + 26; ctx.beginPath(); ctx.moveTo(dx0 + 17, wl); ctx.lineTo(dx0 + 70, sy + h * 0.3); ctx.lineTo(x + w - 20, sy + h * 0.3); ctx.lineTo(x + w + 6, wl); ctx.closePath(); ctx.fillStyle = d_mix(D_WATER, '#4E8A5A', (st.sloot || 0) * 0.6); ctx.fill();
  // nitraatdeeltjes in de sloot
  const ns = Math.round((st.sloot || 0) * 14); for (let i = 0; i < ns; i++) { const px = dx0 + 70 + hash(i + 60) * (w * 0.2), py = wl + 20 + hash(i + 61) * (sy + h * 0.3 - wl - 30) + Math.sin(t * 2 + i) * 4; d_ion(ctx, px, py, 'NO₃⁻', C.teal, 0.9, 0.8); }
  // gangen
  const gA = st.gangen || 0; if (gA > 0.01) { ctx.save(); ctx.globalAlpha *= gA; ctx.strokeStyle = D_GANG; ctx.lineWidth = 16; ctx.lineCap = 'round'; [[0.1, 0.18], [0.32, 0.26], [0.52, 0.2]].forEach(([fx, d]) => { const gx = x + w * fx; ctx.beginPath(); ctx.moveTo(gx, sy); ctx.bezierCurveTo(gx + 20, sy + h * d, gx + 80, sy + h * d, gx + 150, sy + h * (d + 0.05)); ctx.stroke(); }); ctx.restore(); }
  // zuurstof de gangen in
  const o2 = st.o2 || 0; if (o2 > 0.01) for (let i = 0; i < 9; i++) { const k = i % 3, fx = [0.1, 0.32, 0.52][k], ph = (t * 0.5 + hash(i) ) % 1; const gx = x + w * fx + 10 + ph * 110, gy = sy + h * [0.18, 0.26, 0.2][k] * Math.min(1, ph * 2.2); d_al(ctx, o2 * (1 - ph * 0.3), () => { circ(ctx, gx, gy, 9, rgba('#BFE3FF', 0.35), '#BFE3FF', 2); }); }
  // bacteriën die ammonium -> nitraat maken
  const ba = st.bact || 0; if (ba > 0.01) for (let i = 0; i < 6; i++) { const bx = x + w * (0.14 + i * 0.08) + Math.sin(t + i) * 4, by = sy + h * (0.33 + 0.06 * (i % 2)); d_al(ctx, ba, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(i * 0.7); roundRect(ctx, -14, -6, 28, 12, 6); shape(ctx, rgba(C.groen, 0.85), '#3F7A4E', 1.5); ctx.restore(); }); }
  // poep op het oppervlak
  const pp = st.poep || 0; if (pp > 0.01) for (let i = 0; i < 7; i++) { const px = x + w * (0.06 + i * 0.09) + hash(i + 20) * 20; d_al(ctx, clamp(pp * 2 - i * 0.12, 0, 1), () => { ctx.beginPath(); ctx.ellipse(px, sy - 4, 7, 4, 0.3, 0, 6.283); ctx.fillStyle = '#2A1A10'; ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 9, sy - 3, 6, 3.5, -0.2, 0, 6.283); ctx.fill(); }); }
  // gras met wortels
  const gr = st.gras == null ? 1 : st.gras; for (let i = 0; i < 60; i++) { const bx = x + 10 + i * (w * 0.7 - 20) / 60; const hh = (30 + hash(i + 3) * 34) * (0.25 + 0.75 * gr); ctx.strokeStyle = d_mix(i % 3 ? D_GRAS : D_GRASD, D_DROOG, 1 - gr); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(bx, sy); ctx.lineTo(bx + 4, sy - hh); ctx.stroke(); }
  ctx.strokeStyle = rgba('#D8C8A0', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const rx = x + 30 + i * (w * 0.68 - 40) / 12; ctx.beginPath(); ctx.moveTo(rx, sy); ctx.lineTo(rx - 8, sy + 40 * (0.4 + 0.6 * gr)); ctx.moveTo(rx, sy + 12); ctx.lineTo(rx + 10, sy + 34 * (0.4 + 0.6 * gr)); ctx.stroke(); }
  // ionen: ammonium -> nitraat, opname door wortels of uitspoeling naar de sloot
  const nIon = 10; for (let i = 0; i < nIon; i++) { const ph = (t * 0.12 + hash(i + 80)) % 1; const ix = x + w * (0.06 + 0.6 * hash(i + 81)); const iy = sy + h * (0.12 + 0.4 * hash(i + 82));
    const nitri = clamp((st.bact || 0) * 1.4 - hash(i) * 0.4, 0, 1); const naarSloot = (st.uitspoel || 0) > hash(i + 83);
    let px = ix, py = iy; if (naarSloot) { px = ix + (dx0 + 90 - ix) * ph; py = iy + (wl + 40 - iy) * ph * ph; } else if ((st.opname || 0) > hash(i + 84)) { py = iy - (iy - sy - 10) * ph; }
    d_ion(ctx, px, py, nitri > 0.5 ? 'NO₃⁻' : 'NH₄⁺', nitri > 0.5 ? C.teal : C.oker, 0.85, 0.75); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); return { sy, dx0, wl }; }
function d_ion(ctx, x, y, s, col, a = 1, sc = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(20 * sc + 4, 700); const w = ctx.measureText(s).width + 16; roundRect(ctx, x - w / 2, y - 15 * sc, w, 30 * sc, 15 * sc); shape(ctx, rgba(col, 0.25), col, 1.5); text(ctx, s, x, y + 7 * sc, fTekst(20 * sc + 4, 700), C.text, 'center'); ctx.restore(); }

// ---------- landschap: open grasland -> afwisselend (heggen, bosjes, akkers) ----------
function d_landschap(ctx, x, y, w, h, het = 0, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip();
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h); const hy = y + h * 0.3;
  ctx.fillStyle = '#3F6E48'; ctx.fillRect(x, hy, w, h); ctx.fillStyle = '#4A7E52'; ctx.beginPath(); ctx.moveTo(x, hy); for (let xx = x; xx <= x + w; xx += 40) ctx.lineTo(xx, hy + Math.sin(xx * 0.01) * 6); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
  if (het > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(het * 1.5, 0, 1);
    // akkerstroken
    [[0.08, 0.5, 0.26, 0.2], [0.6, 0.42, 0.22, 0.16]].forEach(([fx, fy, fw, fh]) => { ctx.beginPath(); ctx.rect(x + w * fx, y + h * fy, w * fw, h * fh); ctx.fillStyle = '#8C6A42'; ctx.fill(); ctx.strokeStyle = '#6E5030'; ctx.lineWidth = 2; for (let i = 1; i < 7; i++) { ctx.beginPath(); ctx.moveTo(x + w * fx, y + h * fy + h * fh * i / 7); ctx.lineTo(x + w * (fx + fw), y + h * fy + h * fh * i / 7); ctx.stroke(); } });
    ctx.restore();
    // heggen (rijen struiken) en bosjes
    const n = Math.floor(clamp(het, 0, 1) * 30); for (let i = 0; i < n; i++) { const hx = x + w * (0.04 + (i % 15) * 0.066), hy2 = i < 15 ? y + h * 0.46 : y + h * 0.78; d_struik(ctx, hx, hy2, 0.55); }
    const nb = Math.floor(clamp(het * 1.2 - 0.2, 0, 1) * 5); [[0.42, 0.62], [0.88, 0.7], [0.2, 0.42], [0.66, 0.4], [0.95, 0.95]].slice(0, nb).forEach(([fx, fy]) => { d_boompje(ctx, x + w * fx, y + h * fy, 0.6); d_boompje(ctx, x + w * fx + 40, y + h * fy + 10, 0.5); });
  }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
// menukaart van een rover: prooi-icoontjes in een rij
function d_menu(ctx, x, y, items, a = 1, step = 110) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; if (ia <= 0.01) return; const px = x + i * step; d_al(ctx, ia, () => { circ(ctx, px, y - 30, 44, rgba(EX.papier, 0.9), it.hl ? C.goud : EX.papierR, it.hl ? 3.5 : 2);
    if (it.n === 'muis') d_veldmuis(ctx, px - 4, y, 0.3); else if (it.n === 'konijn') d_konijn(ctx, px - 4, y - 2, 0.62); else if (it.n === 'vogel') d_vogeltje(ctx, px - 2, y - 4, 0.82); else if (it.n === 'kever') d_kever(ctx, px - 4, y - 8, 0.95); else if (it.n === 'bes') d_bessen(ctx, px, y - 4, 0.9); }); }); ctx.restore(); }

// ---------- kleine populatiegrafiek in een paneel ----------
function d_miniGrafiek(ctx, x, y, w, h, lijnen, o = {}) { const { a = 1, xl = 'tijd', yl = 'aantal' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; d_assen(ctx, x, y, w, h, xl, yl);
  lijnen.forEach((L) => d_lijn(ctx, x, y, w, h, L.fn, L.u, L.col, { dash: L.dash, lw: L.lw || 6, a: L.a, s0: L.s0 })); ctx.restore(); }

// muizen op een rij in een veldje (aantal n, schuifelend)
function d_muizenRij(ctx, x, y, w, n, t, a = 1, s = 0.22) { if (a <= 0.01 || n <= 0) return; for (let i = 0; i < n; i++) { const fx = x + ((hash(i * 3.3) * w + wander(i, t, 10, 0.6).x) % w + w) % w; d_veldmuis(ctx, fx, y + (hash(i + 2) - 0.5) * 8, s, a * clamp(n - i, 0, 1), t + i, { kijk: hash(i + 5) > 0.5 ? 1 : -1 }); } }

// geploegde strook over een grasland (x0..x1) op maaiveld sy
function d_geploegd(ctx, x0, x1, sy, a = 1) { if (a <= 0.01 || x1 <= x0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A3E28'; ctx.fillRect(x0, sy - 18, x1 - x0, 22); ctx.strokeStyle = '#3A2818'; ctx.lineWidth = 3; for (let xx = x0 + 6; xx < x1; xx += 16) { ctx.beginPath(); ctx.moveTo(xx, sy - 16); ctx.quadraticCurveTo(xx + 6, sy - 24, xx + 12, sy - 14); ctx.stroke(); } ctx.restore(); }
