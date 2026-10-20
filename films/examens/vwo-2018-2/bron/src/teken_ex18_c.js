// Examenbespreking vwo 2018-II · context 'Een bijzondere band tussen grootvader en kleinkind' (vragen 16–26) — eigen tekeningen helper c (21 okt 2026)
const c_CTX = 'Grootvader en kleinkind';
const c_na = (q, t, w, n = 1, dl = 0, d = 0.6) => ramp(t, q.at(w, n) + dl, d);
const c_KL = { gezond: C.teal, mut: C.koraal, pre: C.goud, chrom: '#CFC6E8', chromR: '#8C7BBF' };

// ---------- personages ----------
// Opa Henk met wandelstok; beef = 0..1 trillende hand
function c_henk(ctx, x, y, h, o = {}) { const t = o.t || 0, beef = o.beef || 0;
  persoon(ctx, 'henk', x, y, h, { t, a: o.a, uit: o.uit || 'neutraal', pose: 'vasthouden', kijk: o.kijk || 1,
    hold: (c2, hx, hy) => { const jx = beef * 3 * Math.sin(t * 38), jy = beef * 2 * Math.cos(t * 31);
      c2.save(); c2.strokeStyle = '#7A5A3E'; c2.lineWidth = h * 0.022; c2.lineCap = 'round';
      c2.beginPath(); c2.moveTo(hx + jx - h * 0.05, hy + jy - h * 0.02); c2.quadraticCurveTo(hx + jx - h * 0.05, hy + jy - h * 0.07, hx + jx, hy + jy - h * 0.05); c2.lineTo(hx + jx + h * 0.004, hy + jy); c2.lineTo(hx + h * 0.03, y - 2); c2.stroke();
      if (beef > 0.01) { c2.globalAlpha *= beef; c2.strokeStyle = rgba(C.goud, 0.85); c2.lineWidth = 3; for (const s of [-1, 1]) for (let k = 0; k < 2; k++) { const r = h * (0.07 + k * 0.035); c2.beginPath(); c2.arc(hx + jx, hy + jy - h * 0.03, r, s > 0 ? -0.5 : Math.PI - 0.5, s > 0 ? 0.5 : Math.PI + 0.5); c2.stroke(); } }
      c2.restore(); } }); }

// ---------- chromosomen (afbeelding 4) ----------
// knobs: {tl, tr, bl, br} = insnoering (fragiele plek) aan dat uiteinde; s = schaal (hoogte ± 300*s)
function c_chromosoom(ctx, cx, cy, s, knobs = {}, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s);
  const col = o.col || c_KL.chrom, rand = o.rand || c_KL.chromR, lw = 42;
  for (const side of [-1, 1]) { const top = side < 0 ? knobs.tl : knobs.tr, bot = side < 0 ? knobs.bl : knobs.br; const hl = side < 0 ? (o.hlL || 0) : (o.hlR || 0);
    const P = (u) => { // u: 0 = top, 1 = bottom; via centromeer (y=0)
      const y0 = -112, y1 = 172; const y = y0 + (y1 - y0) * u; const xc = side * (4 + 22 * Math.pow(Math.abs(y) / (y < 0 ? 112 : 172), 1.3) * (y < 0 ? 0.95 : 1.45)); return [xc, y]; };
    const u0 = top ? 0.12 : 0, u1 = bot ? 0.9 : 1;
    const pad = (fn) => { ctx.beginPath(); for (let k = 0; k <= 30; k++) { const u = u0 + (u1 - u0) * k / 30; const [px, py] = P(u); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } fn(); };
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; pad(() => { ctx.strokeStyle = rgba(o.hlCol || C.goud, 0.55); ctx.lineWidth = lw + 22; ctx.stroke(); }); ctx.restore(); }
    pad(() => { ctx.strokeStyle = rand; ctx.lineWidth = lw + 5; ctx.stroke(); }); pad(() => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); });
    const knob = (u, dir) => { const [px, py] = P(u); const [nx, ny] = P(u + dir * 0.055); const kx = nx, ky = ny + dir * 4;
      if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; circ(ctx, kx, ky, 31, rgba(o.hlCol || C.goud, 0.55)); ctx.restore(); }
      ctx.strokeStyle = rand; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(kx, ky); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke();
      circ(ctx, kx, ky, 21, col, rand, 2.5); if (o.fragiel) { ctx.save(); ctx.globalAlpha *= o.fragiel; circ(ctx, (px + kx) / 2, (py + ky) / 2, 26, null, C.goud, 4); ctx.restore(); } };
    if (top) knob(u0, -1); if (bot) knob(u1, 1); }
  // centromeer-insnoering
  ctx.fillStyle = rgba('#000000', 0.12); ctx.beginPath(); ctx.ellipse(0, 0, 16, 7, 0, 0, 6.283); ctx.fill();
  ctx.restore(); }

// ---------- afbeelding 3: ideogram van het X-chromosoom ----------
const c_BANDEN = [[190, 215, 5], [216, 231, 3], [232, 263, 5], [264, 278, 3], [279, 305, 5], [306, 314, 3], [315, 326, 5], [327, 344, 1], [345, 350, 5], [351, 374, 1], [375, 400, 5], [401, 424, 3], [425, 447, 5], [448, 463, 4], [464, 478, 4],
  [481, 495, 4], [496, 506, 6], [507, 524, 3], [525, 552, 6], [553, 566, 3], [567, 579, 6], [580, 604, 1], [605, 610, 6], [611, 638, 1], [639, 644, 6], [645, 666, 3], [667, 689, 5], [690, 703, 3], [704, 720, 5], [721, 745, 3], [746, 770, 5], [771, 810, 1], [811, 857, 5], [858, 876, 3], [877, 883, 5], [884, 906, 1], [907, 946, 5]];
const c_LOCI = [['p22.33', 204], ['p22.32', 226], ['p22.31', 247], ['p22.2', 269], ['p22.13', 290], ['p22.11', 320], ['p21.2', 347], ['p11.4', 380], ['p11.3', 407], ['p11.23', 428], ['p11.22', 452], ['p11.1', 475],
  ['q11.2', 500], ['q13.1', 530], ['q13.2', 555], ['q21.1', 585], ['q21.2', 607], ['q21.31', 629], ['q21.33', 652], ['q22.1', 673], ['q22.2', 696], ['q23', 727], ['q24', 750], ['q25', 777], ['q26.1', 816], ['q26.3', 845], ['q27.1', 866], ['q27.3', 889], ['q28', 912]];
function c_ideogram(ctx, x0, x1, y, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (v) => x0 + (v - 190) * (x1 - x0) / (946 - 190), cen = (X(478) + X(481)) / 2;
  const grijs = { 1: '#2A2633', 3: '#6E6880', 4: '#A8A2B8', 5: '#CFC9DC', 6: '#E8E4F0' };
  const omtrek = (fn) => { ctx.save(); ctx.beginPath(); roundRect(ctx, x0, y - h / 2, cen - 4 - x0, h, h / 2); roundRect(ctx, cen + 4, y - h / 2, x1 - cen - 4, h, h / 2); fn(); ctx.restore(); };
  omtrek(() => { ctx.clip(); const r = o.reveal == null ? 1 : o.reveal; c_BANDEN.forEach(([b0, b1, g]) => { if ((b0 - 190) / 756 > r) return; ctx.fillStyle = grijs[g] || grijs[5]; ctx.fillRect(X(b0), y - h / 2, X(b1 + 1) - X(b0) + 0.5, h); }); });
  ctx.strokeStyle = '#E8E4F0'; ctx.lineWidth = 2.5; roundRect(ctx, x0, y - h / 2, cen - 4 - x0, h, h / 2); ctx.stroke(); roundRect(ctx, cen + 4, y - h / 2, x1 - cen - 4, h, h / 2); ctx.stroke();
  // armen oplichten
  if (o.p > 0.01) { ctx.save(); ctx.globalAlpha *= o.p; roundRect(ctx, x0 - 6, y - h / 2 - 6, cen - x0 + 2, h + 12, h / 2 + 6); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  if (o.q > 0.01) { ctx.save(); ctx.globalAlpha *= o.q; roundRect(ctx, cen + 2, y - h / 2 - 6, x1 - cen + 4, h + 12, h / 2 + 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  // loci
  const la = o.loci == null ? 1 : o.loci; if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; c_LOCI.forEach(([n, v]) => { const xx = X(v), hit = n === 'q27.3' ? (o.hit || 0) : 0; const col = hit > 0.5 ? C.goud : C.text2;
      ctx.strokeStyle = col; ctx.lineWidth = hit > 0.5 ? 3 : 1.5; ctx.beginPath(); ctx.moveTo(xx, y - h / 2 - 4); ctx.lineTo(xx, y - h / 2 - 22); ctx.stroke(); ctx.fillStyle = col; ctx.fillRect(xx - 3, y - h / 2 - 26, 6, 6);
      ctx.save(); ctx.translate(xx + 7, y - h / 2 - 34); ctx.rotate(-Math.PI / 2); text(ctx, n, 0, 0, fTekst(hit > 0.5 ? 30 : 21, hit > 0.5 ? 800 : 500), hit > 0.5 ? C.goud : C.text, 'left'); ctx.restore(); }); ctx.restore(); }
  if (o.hit > 0.01) { const xx = X(889); ctx.save(); ctx.globalAlpha *= o.hit; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, xx - 14, y - h / 2 - 8, 28, h + 16, 8); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { X, cen }; }

// ---------- afbeelding 2: stamboom ----------
const c_PERS = [['I-1', 455, 'm', 'n', '25'], ['I-2', 608, 'f', 'p', '30/70'],
  ['II-1', 379, 'm', 'p', '120'], ['II-2', 455, 'f', 'n', '23/32'], ['II-3', 532, 'f', 'n', '25/30'], ['II-4', 608, 'm', 'p', '85'], ['II-5', 685, 'f', 'n', '17/30'],
  ['III-1', 303, 'f', 'p', '28/132'], ['III-2', 379, 'm', 'n', '30'], ['III-3', 455, 'f', 'p', '32/126'], ['III-4', 608, 'm', 'n', '30'], ['III-5', 647, 'm', 'n', '17'], ['III-6', 685, 'm', 'n', '32'], ['III-7', 762, 'f', 'p', '17/85'],
  ['IV-1', 303, 'm', 'n', '28'], ['IV-2', 379, 'f', 'v', '30/252'], ['IV-3', 455, 'm', 'n', '32'], ['IV-4', 570, 'm', 'v', '272'], ['IV-5', 608, 'm', 'n', '29'], ['IV-6', 685, 'f', 'p', '37/100'], ['IV-7', 723, 'm', 'n', '17'], ['IV-8', 762, 'm', 'n', '30'], ['IV-9', 838, 'f', 'v', '32/257'],
  ['V-1', 303, 'f', 'n', '28/30'], ['V-2', 379, 'm', 'v', '406'], ['V-3', 608, 'f', 'n', '29/32'], ['V-4', 685, 'm', 'n', '32'], ['V-5', 762, 'f', 'n', '30/32'], ['V-6', 838, 'm', 'v', '278']];
const c_GEN = { I: 700, II: 803, III: 905, IV: 1008, V: 1110 };
// gezinnen: [ouder1, ouder2, dalingX, kinderen]
const c_FAM = [['I-1', 'I-2', 532, ['II-1', 'II-3', 'II-4']], ['II-1', 'II-2', 417, ['III-1', 'III-3']], ['II-4', 'II-5', 647, ['III-4', 'III-5', 'III-7']], ['III-2', 'III-3', 417, ['IV-2', 'IV-3']],
  ['III-6', 'III-7', 723, ['IV-4', 'IV-6', 'IV-7', 'IV-9']], ['IV-1', 'IV-2', 341, ['V-1', 'V-2']], ['IV-5', 'IV-6', 647, ['V-3', 'V-4']], ['IV-8', 'IV-9', 800, ['V-5', 'V-6']]];
const c_P = {}; c_PERS.forEach(([id, x, sex, st, num]) => { const g = id.split('-')[0]; c_P[id] = { id, x, y: c_GEN[g], sex, st, num, g, n: id.split('-')[1] }; });
function c_stamMap(o) { const ox = o.ox == null ? 150 : o.ox, oy = o.oy == null ? 150 : o.oy, sx = o.sx || 1.6, sy = o.sy || 1.4; return { X: (x) => ox + (x - 260) * sx, Y: (y) => oy + (y - 660) * sy, sx, sy }; }
// pad van ouder naar kind via de lijnen van de stamboom (in broncoördinaten)
function c_pad(ouder, kind) { const f = c_FAM.find((F) => (F[0] === ouder || F[1] === ouder) && F[3].includes(kind)); if (!f) return []; const p = c_P[ouder], k = c_P[kind]; const sib = k.y - 40;
  return [[p.x, p.y], [f[2], p.y], [f[2], sib], [k.x, sib], [k.x, k.y]]; }
function c_stamboom(ctx, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const M = c_stamMap(o), { X, Y } = M; const gens = ['I', 'II', 'III', 'IV', 'V'];
  const bouw = o.bouw == null ? 5 : o.bouw; const gA = (g) => clamp(bouw - gens.indexOf(g), 0, 1); const hl = o.hl || {}, dimP = o.dim || {}, ring = o.ring || {}, numRing = o.numRing || {}; const sz = o.sz || 30, px = o.px || 24;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // generatielabels
  gens.forEach((g) => { const ga = gA(g); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga * (o.genHl && o.genHl[g] ? 1 : 0.85); text(ctx, g, X(222), Y(c_GEN[g]) + 10, fTitel(30), o.genHl && o.genHl[g] > 0.5 ? C.goud : C.text2, 'center'); ctx.restore(); } });
  // lijnen
  ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 2.5;
  c_FAM.forEach(([p1, p2, dx, kids]) => { const A = c_P[p1], B = c_P[p2]; const ga1 = gA(A.g), ga2 = gA(kids.length ? c_P[kids[0]].g : A.g); if (ga1 <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= ga1; ctx.beginPath(); ctx.moveTo(X(Math.min(A.x, B.x)) + sz / 2, Y(A.y)); ctx.lineTo(X(Math.max(A.x, B.x)) - sz / 2, Y(A.y)); ctx.stroke(); ctx.restore();
    if (ga2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= ga2; const sib = c_P[kids[0]].y - 40; const xs = kids.map((k) => c_P[k].x);
    ctx.beginPath(); ctx.moveTo(X(dx), Y(A.y)); ctx.lineTo(X(dx), Y(sib)); ctx.moveTo(X(Math.min(dx, ...xs)), Y(sib)); ctx.lineTo(X(Math.max(dx, ...xs)), Y(sib)); kids.forEach((k) => { ctx.moveTo(X(c_P[k].x), Y(sib)); ctx.lineTo(X(c_P[k].x), Y(c_P[k].y) - sz / 2); }); ctx.stroke(); ctx.restore(); });
  // oplichtende paden
  (o.paden || []).forEach((P) => { const u = P.u == null ? 1 : P.u; if (u <= 0.01 || !P.pts.length) return; const pts = P.pts.map(([x, y]) => [X(x), Y(y)]); let L = 0; const segs = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); L += l; }
    let rest = L * clamp(u, 0, 1); ctx.save(); ctx.globalAlpha *= P.a == null ? 1 : P.a; for (const [lw, al] of [[14, 0.28], [6, 1]]) { ctx.strokeStyle = rgba(P.col || C.goud, al); ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let r2 = rest;
      for (let i = 1; i < pts.length && r2 > 0; i++) { const l = segs[i - 1], f = Math.min(1, r2 / l); ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); r2 -= l; } ctx.stroke(); } ctx.restore(); });
  // symbolen
  c_PERS.forEach(([id]) => { const p = c_P[id], ga = gA(p.g); if (ga <= 0.01) return; const x = X(p.x), y = Y(p.y); const d = dimP[id] || 0, h = hl[id] || 0;
    ctx.save(); ctx.globalAlpha *= ga * (1 - 0.6 * d);
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; const col = (o.hlCol && o.hlCol[id]) || C.goud; if (p.sex === 'm') { roundRect(ctx, x - sz / 2 - 9, y - sz / 2 - 9, sz + 18, sz + 18, 8); } else { ctx.beginPath(); ctx.arc(x, y, sz / 2 + 10, 0, 6.283); } ctx.fillStyle = rgba(col, 0.3); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.stroke(); ctx.restore(); }
    const fill = p.st === 'v' ? c_ZWARTV : c_LICHT; ctx.lineWidth = 3; ctx.strokeStyle = p.st === 'v' ? '#E6E9EF' : '#9AA3B2';
    if (p.sex === 'm') { ctx.beginPath(); ctx.rect(x - sz / 2, y - sz / 2, sz, sz); } else { ctx.beginPath(); ctx.arc(x, y, sz / 2, 0, 6.283); } ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
    if (p.st === 'p') circ(ctx, x, y, 6, c_ZWARTV);
    const pulse = (o.pulse && o.pulse[p.st]) || 0; if (pulse > 0.01) { ctx.save(); ctx.globalAlpha *= pulse * (0.55 + 0.45 * Math.sin((o.t || 0) * 5)); ctx.strokeStyle = p.st === 'v' ? C.koraal : C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, sz * 0.95, 0, 6.283); ctx.stroke(); ctx.restore(); }
    text(ctx, p.n, x, y - sz / 2 - 9, fTekst(px - 2, 500), C.text2, 'center');
    const nr = numRing[id] || 0; if (nr > 0.01) { ctx.save(); ctx.globalAlpha *= nr; ctx.font = fTekst(px, 700); const w = ctx.measureText(p.num).width + 22; roundRect(ctx, x - w / 2, y + sz / 2 + 6, w, px + 14, (px + 14) / 2); ctx.fillStyle = rgba((o.numCol && o.numCol[id]) || C.goud, 0.25); ctx.fill(); ctx.strokeStyle = (o.numCol && o.numCol[id]) || C.goud; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); }
    text(ctx, p.num, x, y + sz / 2 + px + 9, fTekst(px, nr > 0.5 ? 800 : 500), nr > 0.5 ? C.text : '#DCE0E8', 'center');
    const r = ring[id] || 0; if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; ctx.strokeStyle = (o.ringCol && o.ringCol[id]) || C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, y + 8, sz * 1.25 + 8, sz * 1.5 + 6, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(r * 1.2, 0, 1)); ctx.stroke(); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); return M; }
const c_ZWARTV = '#05070C', c_LICHT = '#EEF0F4'; // symbolen zoals in het examen: wit, met stip (premutatie) of zwart (volledige mutatie)
function c_legenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 420, 132, 16); shape(ctx, rgba(EX.papier, 0.85), EX.papierR, 2);
  circ(ctx, x + 40, y + 42, 15, c_LICHT, '#9AA3B2', 3); circ(ctx, x + 40, y + 42, 6, c_ZWARTV); ctx.beginPath(); ctx.rect(x + 66, y + 27, 30, 30); shape(ctx, c_LICHT, '#9AA3B2', 3); circ(ctx, x + 81, y + 42, 6, c_ZWARTV);
  text(ctx, 'premutatie', x + 120, y + 52, fTekst(30, 600), C.text, 'left');
  circ(ctx, x + 40, y + 96, 15, c_ZWARTV, '#E6E9EF', 3); ctx.beginPath(); ctx.rect(x + 66, y + 81, 30, 30); shape(ctx, c_ZWARTV, '#E6E9EF', 3);
  text(ctx, 'volledige mutatie', x + 120, y + 106, fTekst(30, 600), C.text, 'left'); ctx.restore(); }

// ---------- mRNA, eiwitketens ----------
function c_mrna(ctx, x0, x1, y, a = 1, t = 0, seed = 0, amp = 6, col = C.goud, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = Math.max(8, Math.round((x1 - x0) / 6)); for (let k = 0; k <= n; k++) { const u = k / n, x = x0 + (x1 - x0) * u, yy = y + amp * Math.sin(u * 9 + seed + t * 1.3) + amp * 0.5 * Math.sin(u * 23 + seed * 2); k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); ctx.restore(); }
// kort sliertje mRNA (afbeelding 1)
function c_sliert(ctx, x, y, L, rot, a = 1, t = 0, seed = 0, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); c_mrna(ctx, -L / 2, L / 2, 0, a, t, seed, 5, col, 2.6); ctx.restore(); }
// eiwit als kralenketting die opvouwt (fold 0 = gestrekt, 1 = kluwen)
function c_kluwen(ctx, x, y, r, col, a = 1, fold = 1, seed = 0, n = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pts = [];
  for (let k = 0; k < n; k++) { const sx = (k - (n - 1) / 2) * r * 0.9, sy = 0; const an = k * 1.9 + seed, rr = r * (0.35 + 0.55 * ((k * 7 + seed * 3) % 5) / 4); const fx = Math.cos(an) * rr, fy = Math.sin(an) * rr; pts.push([x + lerp(sx, fx, fold), y + lerp(sy, fy, fold)]); }
  ctx.strokeStyle = _donker(col, 0.25); ctx.lineWidth = r * 0.22; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], k) => k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
  pts.forEach(([px, py]) => circ(ctx, px, py, r * 0.3, col, _donker(col, 0.3), 1.2)); ctx.restore(); }
function c_ribosoom(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y + 14 * s, 50 * s, 30 * s, 0, 0, 6.283); shape(ctx, rgba('#B8A6E0', 0.9), '#D6CCF2', 2); ctx.beginPath(); ctx.ellipse(x, y - 22 * s, 36 * s, 22 * s, 0, 0, 6.283); shape(ctx, rgba('#9C88CF', 0.92), '#D6CCF2', 2); ctx.restore(); }

// ---------- leesraam (vraag 16) ----------
const c_AA = { AUG: 'Met', GCA: 'Ala', UUC: 'Phe', GGA: 'Gly', CUC: 'Leu', AAG: 'Lys', CGG: 'Arg', CGU: 'Arg', UCG: 'Ser', GAC: 'Asp', UCA: 'Ser' };
// seq: string met kleine letters voor ingevoegde nucleotiden; st: per codon 'g' (gelijk), 'x' (extra aminozuur), 'a' (anders gelezen)
function c_leesrij(ctx, x0, y, seq, st, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = o.dx || 34, t = o.t || 0; const N = seq.length, nC = Math.floor(N / 3);
  const lees = o.lees == null ? 1 : o.lees, ins = o.ins == null ? 1 : o.ins, rood = o.rood == null ? 1 : o.rood;
  if (o.label) text(ctx, o.label, x0 - 24, y + 14, fTekst(30, 700), o.labelCol || C.text2, 'right');
  let pos = 0; const xs = []; for (let i = 0; i < N; i++) { const ch = seq[i], isIns = ch !== ch.toUpperCase(); xs.push(x0 + pos * dx + dx / 2); pos += isIns ? ease(ins) : 1; }
  c_mrna(ctx, x0 - 14, x0 + pos * dx + 10, y + 20, 1, t, o.seed || 0, 3, '#E8D9A8', 2.4);
  const colOf = (s) => s === 'x' ? C.goud : s === 'a' ? (rood > 0.5 ? C.koraal : C.teal) : C.teal;
  for (let c = 0; c < nC; c++) { const ca = clamp(lees * nC - c, 0, 1); if (ca <= 0.01) continue; const xa = xs[c * 3] - dx / 2 + 3, xb = xs[c * 3 + 2] + dx / 2 - 3; const aa = c_AA[seq.slice(c * 3, c * 3 + 3).toUpperCase()] || '?'; const col = colOf(st[c]);
    ctx.save(); ctx.globalAlpha *= ca; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xa, y + 32); ctx.lineTo(xa, y + 42); ctx.lineTo(xb, y + 42); ctx.lineTo(xb, y + 32); ctx.stroke();
    const bx = (xa + xb) / 2, by = y + 84; if (c > 0) { const pb = (xs[(c - 1) * 3] + xs[(c - 1) * 3 + 2]) / 2; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(pb + 30, by); ctx.lineTo(bx - 30, by); ctx.stroke(); }
    roundRect(ctx, bx - 34, by - 20, 68, 40, 20); shape(ctx, rgba(col, 0.28), col, 2.5); text(ctx, aa, bx, by + 9, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
  if ((o.rib || 0) > 0.01 && lees > 0.001 && lees < 1) { const c = clamp(lees * nC - 0.5, 0, nC - 1); const ci = Math.floor(c), f = c - ci, cj = Math.min(nC - 1, ci + 1); const mid = (k) => (xs[k * 3] + xs[k * 3 + 2]) / 2; const xr = lerp(mid(ci), mid(cj), ease(f));
    ctx.save(); ctx.globalAlpha *= 0.4 * o.rib; c_ribosoom(ctx, xr, y + 12, 0.9, 1); ctx.restore(); }
  for (let i = 0; i < N; i++) { const ch = seq[i], isIns = ch !== ch.toUpperCase(); const la = isIns ? ins : 1; if (la <= 0.01) continue; const c = Math.floor(i / 3); const anders = c < nC && st[c] === 'a' && rood > 0.5 && lees * nC > c + 0.5;
    ctx.save(); ctx.globalAlpha *= la; text(ctx, ch.toUpperCase(), xs[i], y + 10 - (isIns ? (1 - ins) * 40 : 0), fMeta(28), isIns ? C.goud : anders ? C.koraal : C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- afbeelding 1 ----------
function c_genBalk(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = x1 - x0;
  const ex = []; for (let i = 0; i < 17; i++) ex.push(i); const X = (u) => x0 + L * u;
  // exon 1 met CGG
  const w1 = L * 0.11; roundRect(ctx, x0, y - 22, w1, 44, 22); shape(ctx, '#C9CED8', '#F2F2EE', 2); roundRect(ctx, x0 + 10, y - 16, w1 * 0.45, 32, 12); shape(ctx, rgba(C.goud, 0.7), C.goud, 1.5);
  text(ctx, 'CGG', x0 + 10 + w1 * 0.225, y + 8, fMeta(18), '#121A26', 'center'); text(ctx, '1', x0 + w1 * 0.78, y + 8, fTekst(22, 700), '#121A26', 'center');
  let xx = x0 + w1 + 14; const rest = x1 - xx - 30; const ws = [1, 1, 1, 1, 1, 1, 1, 1.6, 1, 1, 1, 1, 1, 1, 1, 1.6]; const tot = ws.reduce((s, v) => s + v, 0) + 15 * 0.5;
  ws.forEach((w, i) => { const bw = rest * w / tot; roundRect(ctx, xx, y - 18, bw, 36, 10); shape(ctx, '#C9CED8', '#F2F2EE', 1.5); text(ctx, String(i + 2), xx + bw / 2, y + 8, fTekst(bw > 30 ? 20 : 16, 700), '#121A26', 'center'); xx += bw + rest * 0.5 / tot; });
  metaText(ctx, 'ATG', x0 + w1 * 0.6, y - 34, C.text2, 'center', 18); metaText(ctx, 'TAA', xx - rest * 1.6 / tot / 2 - rest * 0.5 / tot, y - 34, C.text2, 'center', 18); text(ctx, '3′ UTR', x1 + 4, y + 8, fTekst(22, 500), C.text2, 'left');
  ctx.restore(); return { e1: x0 + w1 * 0.3 }; }
function c_cggStaaf(ctx, x, y, w, frac, a = 1, methyl = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 24, w, 48, 24); shape(ctx, '#C9CED8', '#F2F2EE', 2);
  const cw = (w - 30) * frac; roundRect(ctx, x - w / 2 + 12, y - 18, cw, 36, 14); shape(ctx, rgba(C.goud, 0.75), C.goud, 1.5); ctx.save(); roundRect(ctx, x - w / 2 + 12, y - 18, cw, 36, 14); ctx.clip(); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; for (let k = 0; k < cw / 9; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 12 + k * 9, y + 18); ctx.lineTo(x - w / 2 + 22 + k * 9, y - 18); ctx.stroke(); } ctx.restore();
  text(ctx, 'CGG', x - w / 2 + 12 + cw / 2, y + 8, fMeta(20), '#121A26', 'center');
  if (methyl > 0.01) { const n = 7; for (let k = 0; k < n; k++) { const mx = x - w / 2 + 24 + k * (w - 48) / (n - 1), d = clamp(methyl * 1.6 - k * 0.09, 0, 1); if (d <= 0.01) continue; const my = y - 24 - 20 - (1 - ease(d)) * 18; ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(mx, y - 24); ctx.lineTo(mx, my + 7); ctx.stroke(); circ(ctx, mx, my, 7, C.koraal, '#F2F2EE', 2); ctx.restore(); } }
  ctx.restore(); }
function c_pijlOmlaag(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 9, y - 18); ctx.lineTo(x - 9, y); ctx.lineTo(x - 18, y); ctx.lineTo(x, y + 18); ctx.lineTo(x + 18, y); ctx.lineTo(x + 9, y); ctx.lineTo(x + 9, y - 18); ctx.closePath(); ctx.stroke(); ctx.restore(); }

// ---------- DNA met promotor, methylering, RNA-polymerase (vraag 17) ----------
function c_promotorDNA(ctx, x0, x1, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0; const pA = x0 + (x1 - x0) * 0.16, pB = x0 + (x1 - x0) * 0.4;
  // promotor- en genvlak
  roundRect(ctx, pA, y - 34, pB - pA, 68, 12); shape(ctx, rgba(C.oker, 0.18), rgba(C.oker, 0.7), 2); roundRect(ctx, pB + 8, y - 34, x1 - pB - 30, 68, 12); shape(ctx, rgba(C.teal, 0.12), rgba(C.teal, 0.6), 2);
  // twee strengen
  for (const s of [-1, 1]) { ctx.strokeStyle = s < 0 ? '#AFC0D0' : '#8FA0B5'; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 80; k++) { const u = k / 80, x = x0 + (x1 - x0) * u; const yy = y + s * 14 * Math.cos(u * 26); k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
  ctx.strokeStyle = rgba('#C9CED8', 0.5); ctx.lineWidth = 2; for (let k = 0; k < 60; k++) { const u = (k + 0.5) / 60, x = x0 + (x1 - x0) * u, h = 14 * Math.cos(u * 26); ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y + h); ctx.stroke(); }
  naamBij(ctx, 'promotor', null, (pA + pB) / 2, y + 82, o.lab == null ? 1 : o.lab, 'center'); naamBij(ctx, 'FMR1-gen', null, (pB + x1) / 2, y + 82, o.lab == null ? 1 : o.lab, 'center');
  // methylgroepen
  const m = o.methyl || 0; if (m > 0.01) { const n = 6; for (let k = 0; k < n; k++) { const mx = pA + 24 + k * (pB - pA - 48) / (n - 1), d = clamp(m * 1.6 - k * 0.1, 0, 1); if (d <= 0.01) continue; const top = k % 2 ? -1 : 1; const my = y - top * (40 + (1 - ease(d)) * 70) ; ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(mx, y - top * 14); ctx.lineTo(mx, my); ctx.stroke(); circ(ctx, mx, my - top * 10, 12, C.koraal, '#F2F2EE', 2); text(ctx, 'CH₃', mx, my - top * 10 - top * 30 + (top > 0 ? 0 : 10), fTekst(18, 700), C.koraal, 'center'); ctx.restore(); } }
  // RNA-polymerase: komt aan, botst en wijkt terug
  const pol = o.pol || 0; if (pol > 0.01) { const bots = o.bots || 0; const target = pA + (pB - pA) * 0.5; let px = lerp(x0 - 120, target - 60, ease(clamp(pol, 0, 1))); px -= 90 * Math.sin(Math.min(1, bots) * Math.PI) * 0.5 + 60 * ease(bots); const py = y - 6 - 70 * ease(bots);
    ctx.save(); ctx.globalAlpha *= Math.min(1, pol * 2); ctx.beginPath(); ctx.ellipse(px, py, 74, 52, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.85), lighten(C.teal, 0.4), 2.5); text(ctx, 'RNA-polymerase', px, py + 8, fTekst(20, 700), '#121A26', 'center'); ctx.restore(); }
  ctx.restore(); return { pA, pB }; }

// ---------- zenuwcel-klont en hersenen ----------
function c_klont(ctx, x, y, s, a = 1, t = 0, seed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < 5; k++) c_sliert(ctx, x + Math.cos(k * 1.3 + seed) * 12 * s, y + Math.sin(k * 1.7 + seed) * 10 * s, 34 * s, k * 0.9 + seed, 1, t, k + seed);
  for (let k = 0; k < 4; k++) circ(ctx, x + Math.cos(k * 1.6 + 0.4 + seed) * 16 * s, y + Math.sin(k * 1.6 + 0.4 + seed) * 13 * s, 7 * s, '#8A8E9A', '#B8BCC6', 1.2); ctx.restore(); }

// ---------- cellen en X-inactivatie ----------
function c_xje(ctx, x, y, s, col, a = 1, inact = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const k = 1 - 0.55 * ease(inact); ctx.scale(s * k, s * k); ctx.rotate(inact * 0.6);
  const c2 = inact > 0.5 ? '#6A6E7A' : col; ctx.strokeStyle = c2; ctx.lineCap = 'round'; ctx.lineWidth = 9 + 6 * inact; ctx.beginPath(); ctx.moveTo(-12, -18); ctx.quadraticCurveTo(-1, 0, -13, 24); ctx.moveTo(12, -18); ctx.quadraticCurveTo(1, 0, 13, 24); ctx.stroke(); ctx.restore(); }
function c_cel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, o.fill || rgba('#3A4E72', 0.75), o.rand || '#AFC0D0', 2.5);
  if (o.kern !== false) { ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 6.283); shape(ctx, rgba(C.kern, 0.55), C.kernR, 1.5); }
  ctx.restore(); }
// weefsel als mozaïek: frac = deel van de cellen waarin het gemuteerde X actief is; kies = 0..1 (cellen 'kiezen')
function c_weefsel(ctx, x, y, cols, rows, frac, kies, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = o.r || 30, gap = r * 2 + 6, seed = o.seed || 1; const n = cols * rows; const idx = [];
  for (let i = 0; i < n; i++) idx.push(i); idx.sort((p, q2) => hash(p * 13 + seed) - hash(q2 * 13 + seed)); const mutSet = new Set(idx.slice(0, Math.round(n * frac)));
  for (let i = 0; i < n; i++) { const cx = x + (i % cols) * gap + ((Math.floor(i / cols) % 2) ? r : 0), cy = y + Math.floor(i / cols) * gap * 0.9; const d = clamp(kies * 1.5 - hash(i * 7 + seed) * 0.5, 0, 1); const mut = mutSet.has(i);
    const col = mut ? C.koraal : C.teal; const pulse = mut && o.puls ? o.puls * (0.5 + 0.5 * Math.sin((o.t || 0) * 5 + i)) : 0;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = d > 0.01 ? rgba(col, 0.2 + 0.45 * d + 0.2 * pulse) : rgba('#3A4E72', 0.7); ctx.fill(); ctx.strokeStyle = d > 0.5 ? col : '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke();
    if (d < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - d; circ(ctx, cx, cy, r * 0.45, rgba(C.kern, 0.6)); ctx.restore(); }
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; c_xje(ctx, cx - r * 0.25, cy, 0.5, mut ? C.koraal : C.teal, 1, 0); c_xje(ctx, cx + r * 0.38, cy + 2, 0.5, mut ? C.teal : C.koraal, 1, 1); ctx.restore(); } }
  ctx.restore(); return { w: cols * gap + r, h: rows * gap * 0.9 }; }
function c_meter(ctx, x, y, w, frac, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 30, 15); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.01) { roundRect(ctx, x, y, Math.max(30, w * frac), 30, 15); shape(ctx, rgba(col, 0.8), col, 2); } if (label) text(ctx, label, x + w + 18, y + 25, fTekst(30, 700), col, 'left'); ctx.restore(); }

// ---------- gel (afbeelding 5) ----------
const c_LANES = { marker: 277, 1: 315, 2: 348, 3: 380, 4: 415, 5: 452, 6: 490, 7: 527, 8: 560, 9: 594, 10: 630, 11: 666, 12: 704 };
// banden: [laan, y, sterkte, dikte]; vlekken: [laan, y0, y1, sterkte]
const c_BANDJES = [[1, 389, 1, 9], [2, 389, 0.2, 7], [4, 389, 0.95, 9], [6, 340, 0.8, 8], [6, 376, 0.85, 8], [7, 389, 1, 12], [9, 352, 0.95, 9], [9, 389, 0.9, 8], [11, 370, 1, 11], [12, 377, 0.45, 6], [12, 389, 0.5, 7], [4, 288, 0.3, 10], [5, 275, 0.25, 10], [10, 265, 0.5, 10]];
const c_VLEKKEN = [[3, 184, 295, 0.22], [5, 182, 292, 0.22], [8, 182, 280, 0.22], [10, 182, 300, 0.25], [4, 276, 300, 0.15], [6, 282, 325, 0.15], [9, 285, 335, 0.15]];
const c_MARKER = [[214, 1, 12], [222, 1, 8], [231, 0.9, 5], [250, 0.85, 5], [261, 0.85, 5], [296, 0.8, 5], [307, 0.8, 5], [330, 0.75, 5], [351, 0.9, 7], [372, 0.75, 5], [391, 0.85, 6]];
function c_gel(ctx, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const gx0 = o.x0 || 150, gx1 = o.x1 || 1190, gy0 = o.y0 || 230, gy1 = o.y1 || 800; const X = (v) => gx0 + (v - 250) * (gx1 - gx0) / (735 - 250), Y = (v) => gy0 + (v - 172) * (gy1 - gy0) / (402 - 172);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, gx0, gy0, gx1 - gx0, gy1 - gy0, 10); shape(ctx, '#1F2A3A', '#5A6A82', 2);
  const lw = (X(36) - X(0)) * 0.78; const hl = o.hl || {}, dimL = o.dim || {}, bandA = o.banden == null ? 1 : o.banden;
  // putjes + laannummers
  Object.entries(c_LANES).forEach(([k, v]) => { const x = X(v); roundRect(ctx, x - lw / 2, Y(176), lw, 8, 3); shape(ctx, '#0E141E', '#3A4A62', 1); const h = hl[k] || 0;
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; roundRect(ctx, x - lw / 2 - 8, gy0 + 6, lw + 16, gy1 - gy0 - 12, 10); ctx.fillStyle = rgba((o.hlCol && o.hlCol[k]) || C.goud, 0.12); ctx.fill(); ctx.strokeStyle = (o.hlCol && o.hlCol[k]) || C.goud; ctx.lineWidth = 3.5; ctx.stroke(); ctx.restore(); }
    text(ctx, k === 'marker' ? 'marker' : k, x, gy0 - 18, fTekst(k === 'marker' ? 24 : 32, h > 0.5 ? 800 : 600), h > 0.5 ? ((o.hlCol && o.hlCol[k]) || C.goud) : C.text, 'center'); });
  const glow = (x, y, w, h, s) => { const g = ctx.createLinearGradient(0, y - h, 0, y + h); g.addColorStop(0, 'rgba(230,240,255,0)'); g.addColorStop(0.5, `rgba(230,240,255,${0.9 * s})`); g.addColorStop(1, 'rgba(230,240,255,0)'); ctx.fillStyle = g; roundRect(ctx, x - w / 2, y - h, w, 2 * h, h * 0.8); ctx.fill(); };
  ctx.save(); ctx.globalAlpha *= bandA;
  c_MARKER.forEach(([y, s, h]) => glow(X(277), Y(y), lw * 1.05, h * 1.4, s));
  c_VLEKKEN.forEach(([l, y0, y1, s]) => { const x = X(c_LANES[l]); ctx.save(); ctx.globalAlpha *= 1 - 0.75 * (dimL[l] || 0); const g = ctx.createLinearGradient(0, Y(y0), 0, Y(y1)); g.addColorStop(0, 'rgba(230,240,255,0)'); g.addColorStop(0.3, `rgba(230,240,255,${s})`); g.addColorStop(0.8, `rgba(230,240,255,${s})`); g.addColorStop(1, 'rgba(230,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - lw / 2 + 4, Y(y0), lw - 8, Y(y1) - Y(y0)); ctx.restore(); });
  c_BANDJES.forEach(([l, y, s, h]) => { ctx.save(); ctx.globalAlpha *= 1 - 0.75 * (dimL[l] || 0); glow(X(c_LANES[l]), Y(y), lw * 0.9, h * 1.5, s); ctx.restore(); });
  ctx.restore();
  // zones
  const za = o.zones == null ? 1 : o.zones; if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; ctx.setLineDash([12, 9]); ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 2.5; [178, 322, 377].forEach((v) => { ctx.beginPath(); ctx.moveTo(gx0, Y(v)); ctx.lineTo(gx1 + 20, Y(v)); ctx.stroke(); }); ctx.setLineDash([]);
    const zl = [[178, 318, 'volledige mutatie', '≥ 200', C.koraal, 'v'], [324, 375, 'premutatie', '50–199', C.goud, 'p'], [379, 402, 'normaal', '< 50', C.teal, 'n']];
    zl.forEach(([y0, y1, n, r, col, k]) => { const zh = (o.zoneHl && o.zoneHl[k]) || 0; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx1 + 30, Y(y0) + 4); ctx.lineTo(gx1 + 42, Y(y0) + 4); ctx.lineTo(gx1 + 42, Y(y1) - 4); ctx.lineTo(gx1 + 30, Y(y1) - 4); ctx.stroke();
      const ym = (Y(y0) + Y(y1)) / 2; text(ctx, n, gx1 + 58, ym - (y1 - y0 < 40 ? 4 : 6), fTekst(30, zh > 0.5 ? 800 : 700), col, 'left'); text(ctx, r + ' herhalingen', gx1 + 58, ym + 28, fTekst(24, 500), C.text2, 'left'); }); ctx.restore(); }
  ctx.restore(); return { X, Y, lw }; }

// ---------- PCR ----------
function c_dnaStukje(ctx, x, y, w, a = 1, nieuw = 1, sep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - w / 2, y - 7 - sep); ctx.lineTo(x + w / 2, y - 7 - sep); ctx.stroke();
  if (nieuw > 0.01) { ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(x - w / 2, y + 7 + sep); ctx.lineTo(x - w / 2 + w * clamp(nieuw, 0, 1), y + 7 + sep); ctx.stroke();
    ctx.strokeStyle = rgba('#C9CED8', 0.45); ctx.lineWidth = 2; for (let k = 0; k < w * nieuw / 12; k++) { const xx = x - w / 2 + 6 + k * 12; ctx.beginPath(); ctx.moveTo(xx, y - 4 - sep); ctx.lineTo(xx, y + 4 + sep); ctx.stroke(); } }
  ctx.restore(); }

// ---------- synaps (afbeelding 6) ----------
function c_glu(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#E8D9A8'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 9 * s, y + 4 * s); ctx.lineTo(x, y - 4 * s); ctx.lineTo(x + 9 * s, y + 4 * s); ctx.stroke(); circ(ctx, x - 9 * s, y + 4 * s, 5 * s, C.goud); circ(ctx, x, y - 4 * s, 5 * s, C.goud); circ(ctx, x + 9 * s, y + 4 * s, 5 * s, C.goud); ctx.restore(); }
function c_ampa(ctx, x, y, an, s = 1, col = C.groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  for (const d of [-1, 1]) { roundRect(ctx, d * 12 - 9, -30, 18, 60, 8); shape(ctx, col, lighten(col, 0.35), 2); } ctx.fillStyle = rgba('#121A26', 0.5); ctx.fillRect(-3, -30, 6, 60); ctx.restore(); }
function c_mglur(ctx, x, y, an, s = 1, bind = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  roundRect(ctx, -16, -22, 32, 52, 10); shape(ctx, C.paars, lighten(C.paars, 0.35), 2); ctx.beginPath(); ctx.arc(0, -36, 20, Math.PI * 1.1, Math.PI * 1.9 + Math.PI, false); ctx.beginPath(); ctx.moveTo(-20, -30); ctx.quadraticCurveTo(-24, -58, -6, -60); ctx.lineTo(-6, -44); ctx.lineTo(6, -44); ctx.lineTo(6, -60); ctx.quadraticCurveTo(24, -58, 20, -30); ctx.closePath(); shape(ctx, C.paars, lighten(C.paars, 0.35), 2);
  if (bind > 0.01) { c_glu(ctx, 0, -52 - (1 - ease(bind)) * 60, 0.9, bind); if (bind > 0.95) { ctx.save(); ctx.globalAlpha *= 0.5; circ(ctx, 0, -10, 30, rgba(C.goud, 0.25)); ctx.restore(); } }
  ctx.restore(); }
// mode: 'normaal' | 'fxs'; st: {glu, bind, synth, fmrp, weg, t, labels, ampaHl}
function c_synaps(ctx, cx, cy, s, mode, st = {}) { const a = st.a == null ? 1 : st.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s); const t = st.t || 0;
  // presynaptisch eindknopje (van boven)
  ctx.beginPath(); ctx.moveTo(-120, -330); ctx.bezierCurveTo(-130, -260, -230, -230, -210, -160); ctx.bezierCurveTo(-190, -95, 190, -95, 210, -160); ctx.bezierCurveTo(230, -230, 130, -260, 120, -330); ctx.closePath(); shape(ctx, '#2E3F62', '#AFC0D0', 2.5);
  const gluP = [[-80, -250], [-20, -270], [40, -245], [95, -220], [-110, -190], [-40, -200], [20, -185], [80, -170], [-60, -150], [10, -145]];
  gluP.forEach(([gx, gy], i) => c_glu(ctx, gx + wander(i, t, 4, 0.8).x, gy + wander(i, t, 4, 0.8).y, 1.1, 1));
  // postsynaptisch: gebogen membraan (koepel)
  const M = (u) => { const x = -330 + 660 * u; const y = -40 + 260 * Math.pow(Math.abs(u - 0.5) * 2, 2.2); return [x, y]; };
  const Mn = (u) => { const [x1, y1] = M(u - 0.005), [x2, y2] = M(u + 0.005); return Math.atan2(y2 - y1, x2 - x1); };
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [x, y] = M(k / 60); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.lineTo(330, 330); ctx.lineTo(-330, 330); ctx.closePath(); shape(ctx, '#33476E', null);
  for (const off of [0, 9]) { ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [x, y] = M(k / 60); k ? ctx.lineTo(x, y + off) : ctx.moveTo(x, y + off); } ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2.5; ctx.stroke(); }
  // glutamaat afgegeven in de spleet
  const g = st.glu || 0; if (g > 0.01) { for (let i = 0; i < 4; i++) { const tx = -150 + (i - 1.5) * 50, d = clamp(g * 1.5 - i * 0.15, 0, 1); if (d <= 0.01) continue; c_glu(ctx, lerp(-60 + i * 30, tx, d) + wander(i + 20, t, 6, 1).x * (1 - d), lerp(-130, -95, d), 1.1, d * (1 - (st.bind || 0))); } }
  // mGluR5
  const [mx, my] = M(0.27); c_mglur(ctx, mx, my + 4, Mn(0.27), 1, st.bind || 0, 1);
  // AMPA-receptoren
  const amp = [0.58, 0.66, 0.74]; const weg = mode === 'fxs' ? (st.weg == null ? 1 : st.weg) : 0; const binnen = [[110, 150], [175, 225], [0, 0]];
  amp.forEach((u, i) => { const [ax, ay] = M(u); let x = ax, y = ay + 5, an = Mn(u); if (i < 2 && weg > 0.01) { const e = ease(weg); x = lerp(ax, binnen[i][0], e); y = lerp(ay + 5, binnen[i][1], e); an = lerp(an, 0.3 + i * 0.4, e); }
    if (st.ampaHl > 0.01 && (i === 2 || weg < 0.5)) { ctx.save(); ctx.globalAlpha *= st.ampaHl; circ(ctx, x, y, 42, rgba(C.groen, 0.22)); ctx.restore(); }
    c_ampa(ctx, x, y, an, 1, C.groen, 1); });
  // eiwitsynthese: mRNA met ribosomen, eiwitketens
  const sy = st.synth || 0; c_mrna(ctx, -230, -60, 140, 1, t, 2, 4, C.goud, 2.6);
  [-200, -145, -90].forEach((rx, i) => { ctx.save(); ctx.globalAlpha *= 0.9; ctx.beginPath(); ctx.ellipse(rx, 136, 17, 12, 0, 0, 6.283); shape(ctx, '#9C88CF', '#D6CCF2', 1.5); ctx.restore(); if (sy > 0.01) c_kluwen(ctx, rx + 4, 106 - 8 * sy, 14, C.oker, clamp(sy * 1.4 - i * 0.15, 0, 1), clamp(sy * 1.2 - 0.2, 0, 1), i, 6); });
  // pijlen
  ctx.save(); ctx.globalAlpha *= st.pijlen == null ? 1 : st.pijlen; pijl(ctx, mx, my + 40, -145, 76, '#C9CED8', 1, 3.5, 14);
  const fm = st.fmrp || 0; const rem = mode === 'normaal';
  pijl(ctx, -40, 136, 130, 136, '#C9CED8', 1, 3.5, 14); ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(150, -10); ctx.lineTo(150, mode === 'fxs' ? 260 : 120); ctx.stroke(); if (mode === 'fxs') pijl(ctx, 150, 230, 150, 268, '#C9CED8', 1, 3.5, 14); else pijl(ctx, 150, 90, 150, 124, '#C9CED8', 1, 3.5, 14);
  ctx.restore();
  // FMRP-rem (normaal) of ontbreekt (fxs)
  if (rem && fm > 0.01) { ctx.save(); ctx.globalAlpha *= fm; c_kluwen(ctx, 45, 58, 18, C.teal, 1, 1, 4, 8); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(45, 78); ctx.lineTo(45, 124); ctx.moveTo(28, 124); ctx.lineTo(62, 124); ctx.stroke(); ctx.restore(); }
  if (!rem && fm > 0.01) { ctx.save(); ctx.globalAlpha *= fm; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(45, 58, 24, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); kruis(ctx, 45, 58, 14, 1, C.koraal); ctx.restore(); }
  ctx.restore();
  // namen (buiten de transformatie, direct bij het onderdeel)
  const la = (st.labels || 0) * a; if (la > 0.01) { const P = (x, y) => [cx + x * s, cy + y * s]; let p;
    p = P(-215, -265); naamBij(ctx, 'glutamaat', null, p[0], p[1], la * (st.lGlu == null ? 1 : st.lGlu), 'right');
    p = P(mx - 40, my - 30); naamBij(ctx, 'mGluR5', null, p[0], p[1], la * (st.lM == null ? 1 : st.lM), 'right');
    p = P(265, -10); naamBij(ctx, 'AMPA', null, p[0], p[1], la * (st.lA == null ? 1 : st.lA), 'left');
    p = P(-145, 200); naamBij(ctx, 'eiwitsynthese', null, p[0], p[1], la * (st.lE == null ? 1 : st.lE), 'center');
    if (mode === 'normaal') { p = P(75, 50); naamBij(ctx, 'FMRP', null, p[0], p[1], la * fm, 'left', C.teal); } }
}

// ---------- muis (vraag 26) ----------
function c_muis(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0, beef = o.beef || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + beef * 2.5 * Math.sin(t * 30), y); ctx.scale(s * (o.kijk || 1), s);
  ctx.strokeStyle = '#D9A0A0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-95, 10); ctx.bezierCurveTo(-170, 30, -190, -40, -235, -12 + 6 * Math.sin(t * 2)); ctx.stroke();
  for (const fx of [-50, 50]) { ctx.fillStyle = '#E7B9B4'; ctx.beginPath(); ctx.ellipse(fx, 50, 15, 7, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 105, 58, 0, 0, 6.283); shape(ctx, '#C9C2BA', '#E6E0D8', 2); ctx.beginPath(); ctx.ellipse(-10, 18, 80, 30, 0, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.fill();
  ctx.beginPath(); ctx.moveTo(70, -40); ctx.quadraticCurveTo(150, -40, 172, 2); ctx.quadraticCurveTo(140, 30, 70, 30); ctx.closePath(); shape(ctx, '#C9C2BA', '#E6E0D8', 2);
  circ(ctx, 88, -50, 24, '#E7B9B4', '#E6E0D8', 2); circ(ctx, 88, -50, 13, '#D69A96'); circ(ctx, 128, -14, 5.5, '#121A26'); circ(ctx, 130, -16, 1.8, '#FFFFFF'); circ(ctx, 172, 1, 6, '#D98080');
  ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = 1.5; for (const d of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(160, 4); ctx.lineTo(205, 2 + d * 12); ctx.stroke(); }
  ctx.restore(); }
function c_genKaartje(ctx, x, y, a = 1, uit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 92, y - 30, 184, 60, 30); shape(ctx, rgba(EX.papier, 0.92), uit > 0.5 ? C.koraal : C.teal, 2.5);
  text(ctx, 'FMR1-gen', x, y + 10, fTekst(28, 700), C.text, 'center'); if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 80, y + 4); ctx.lineTo(x - 80 + 160 * clamp(uit * 1.3, 0, 1), y - 2); ctx.stroke(); ctx.restore(); } ctx.restore(); }
function c_flesje(ctx, x, y, s = 1, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -26, -50, 52, 80, 12); shape(ctx, rgba(col, 0.3), lighten(col, 0.3), 2.5); roundRect(ctx, -14, -68, 28, 20, 4); shape(ctx, '#C9CED8', null); ctx.fillStyle = rgba(col, 0.75); roundRect(ctx, -22, -14, 44, 40, 8); ctx.fill(); ctx.restore(); }
