/* =====================================================================================
   Erfelijkheid · les 1 · Eén van je vader, één van je moeder (28 okt 2026)
   Film 1 Chromosomen en de taal van erfelijkheid; havo 4 BvJ § 3.1–3.2, vwo Nectar H5 § 5.1–5.2.
   Eigen hulpen hebben het voorvoegsel L1_.
   ===================================================================================== */

// ---------- chromosomen van de mens: lengte (miljoen basenparen, afgerond) en plek van het centromeer (0 = boven) ----------
// index nr − 1; 23 = X, 24 = Y. Afgerond naar het referentiegenoom; 21 is korter dan 22.
const L1_MB = [248, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156, 57];
const L1_CEN = [0.49, 0.39, 0.46, 0.27, 0.27, 0.36, 0.38, 0.31, 0.35, 0.30, 0.39, 0.27, 0.15, 0.16, 0.17, 0.41, 0.30, 0.23, 0.45, 0.44, 0.25, 0.27, 0.39, 0.18];
const L1_MEL = () => C.licht ? '#6E4526' : '#A87A52'; // melanine (bruin pigment)

// 46 chromosomen verspreid in een kern met straal 1 (vaste pseudo-toevalsplek), grootste eerst geplaatst
let _L1kern = null;
function L1_kernLayout() {
  if (_L1kern) return _L1kern; const R = toeval(11), items = [], gezet = [];
  for (let nr = 1; nr <= 23; nr++) for (let k = 0; k < 2; k++) items.push({ nr, kopie: k, len: L1_MB[nr - 1] / 248 * 0.27 });
  items.map((_, i) => i).sort((a, b) => items[b].len - items[a].len).forEach(i => { const it = items[i]; let plek = null;
    for (let t = 0; t < 900 && !plek; t++) { const an = R() * 6.283, rr = Math.sqrt(R()) * (0.84 - it.len * 0.5), x = Math.cos(an) * rr, y = Math.sin(an) * rr;
      if (gezet.every(o => Math.hypot(o.x - x, o.y - y) > (o.len + it.len) * 0.47 + 0.015)) plek = { x, y }; }
    if (!plek) plek = { x: (R() - 0.5) * 0.8, y: (R() - 0.5) * 0.8 };
    Object.assign(it, plek, { rot: (R() - 0.5) * 3.2 }); gezet.push(it); });
  _L1kern = items; return items;
}
// plek in het karyogram: paren in vier rijen, uitgelijnd op het centromeer
const L1_RIJEN = [{ nrs: [1, 2, 3, 4, 5], cy: 290 }, { nrs: [6, 7, 8, 9, 10, 11, 12], cy: 520 }, { nrs: [13, 14, 15, 16, 17, 18], cy: 715 }, { nrs: [19, 20, 21, 22, 23], cy: 885 }];
const L1_KS = 0.7; // px per miljoen basenparen in het karyogram
function L1_slot(nr, kopie) { const r = L1_RIJEN.find(q => q.nrs.includes(nr)), i = r.nrs.indexOf(nr), gap = 1600 / r.nrs.length;
  return { x: 160 + gap * (i + 0.5) + (kopie ? 28 : -28), y: r.cy, len: L1_MB[nr - 1] * L1_KS, cen: L1_CEN[nr - 1], mx: 160 + gap * (i + 0.5) }; }
const L1_onder = (nr) => { const r = L1_RIJEN.find(q => q.nrs.includes(nr)); return r.cy + Math.max(...r.nrs.map(n => L1_MB[n - 1] * L1_KS * (1 - L1_CEN[n - 1]))) + 38; };
// alle 46: u = 0 in de kern (kx, ky, straal R), u = 1 in het karyogram. o.uVan(i), o.kleur(c, i), o.aVan(c, i), o.schaal (lengte in de kern), o.ring(c) = gouden ring
function L1_chrom46(ctx, kx, ky, R, u, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  L1_kernLayout().forEach((c, i) => { const ui = o.uVan ? o.uVan(i) : u, s = L1_slot(c.nr, c.kopie), sc = o.schaal == null ? 1 : o.schaal;
    const x = lerp(kx + c.x * R, s.x, ui), y = lerp(ky + c.y * R, s.y, ui), len = lerp(c.len * R * sc, s.len, ui), rot = lerp(c.rot, 0, ui), w = lerp(Math.max(7, c.len * R * sc * 0.21), 19, ui);
    const ai = a * (o.aVan ? o.aVan(c, i) : 1); if (ai <= 0.01) return;
    chromosoom(ctx, x, y, len, { kl: o.kleur ? o.kleur(c, i) : CH.neutraal, cen: s.cen, w, rot, dubbel: 1, a: ai });
    if (o.ring && o.ring(c, i) > 0.01) { ctx.save(); ctx.globalAlpha *= o.ring(c, i) * a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, len * 0.62 + 8, 0, 6.283); ctx.stroke(); ctx.restore(); } });
}
const L1_pos = (i, kx, ky, R) => { const c = L1_kernLayout()[i]; return [kx + c.x * R, ky + c.y * R, c.len * R]; };

// losse DNA-kluwen in de kern (chromatine tussen twee delingen)
let _L1kl = null;
function L1_kluwen(ctx, kx, ky, R, a = 1) {
  if (a <= 0.01) return;
  if (!_L1kl) { const r = toeval(5); _L1kl = []; for (let k = 0; k < 18; k++) { const an = r() * 6.283, rr = Math.sqrt(r()) * 0.68; let x = Math.cos(an) * rr, y = Math.sin(an) * rr, dir = r() * 6.283; const pts = [[x, y]];
      for (let i = 0; i < 10; i++) { dir += (r() - 0.5) * 2.4; x += Math.cos(dir) * 0.15; y += Math.sin(dir) * 0.15; const d = Math.hypot(x, y); if (d > 0.82) { x *= 0.82 / d; y *= 0.82 / d; dir += 2.2; } pts.push([x, y]); }
      _L1kl.push(gladPad(pts, 0.02)); } }
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  _L1kl.forEach((pts, k) => { ctx.strokeStyle = rgba(C.paars, k % 3 ? 0.75 : 0.55); ctx.lineWidth = k % 3 ? 3 : 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(kx + p[0] * R, ky + p[1] * R) : ctx.moveTo(kx + p[0] * R, ky + p[1] * R)); ctx.stroke(); });
  ctx.restore();
}
// kern (rond), zacht paars
function L1_kern(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.paars, C.licht ? 0.08 : 0.12), C.paars, 3); ctx.restore(); }

// eiwit/enzym als gevouwen keten (kronkelende lijn met gloed); o.kapot = anders gevouwen, werkt niet
const L1_VOUW = [[-0.9, 0.3], [-0.7, -0.5], [-0.2, -0.85], [0.1, -0.3], [0.55, -0.8], [0.95, -0.25], [0.5, 0.15], [0.9, 0.65], [0.35, 0.9], [0.0, 0.35], [-0.4, 0.85], [-0.85, 0.7]];
const L1_KAPOT = [[-1.15, 0.45], [-0.8, -0.25], [-0.3, -0.55], [0.15, -0.05], [0.65, -0.65], [1.1, -0.35], [0.95, 0.3], [1.3, 0.75]];
const L1_ANDERS = [[-0.9, 0.2], [-0.6, -0.6], [-0.1, -0.8], [0.15, -0.25], [0.6, -0.75], [0.95, -0.1], [0.45, 0.3], [0.85, 0.75], [0.2, 0.8], [-0.35, 0.5], [-0.8, 0.8]];
function L1_enzym(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kapot = !!o.kapot, kl = o.kl || (kapot ? C.koraal : C.groen), pts = gladC(o.vorm || (kapot ? L1_KAPOT : L1_VOUW));
  ctx.save(); ctx.globalAlpha *= a; gloed(ctx, x, y, s * 1.8, kl, kapot ? 0.35 : 0.7);
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0] * s, p[1] * s) : ctx.moveTo(p[0] * s, p[1] * s)); };
  pad(); ctx.strokeStyle = dk(kl, 0.4); ctx.lineWidth = Math.max(3, s * 0.26); ctx.stroke(); pad(); ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, s * 0.17); ctx.stroke();
  ctx.restore();
}

// pigmentcel (melanocyt) met uitlopers; o.mel 0..1 = hoeveel melanine, o.enz = [{dx, dy, kapot}] (× r), o.dend = [[hoek, lengte × r]]
const L1_DEND = [[-2.55, 1.15], [-1.95, 1.35], [-1.3, 1.25], [-0.65, 1.3], [-0.05, 1.0], [2.7, 0.8]];
function L1_pigmentcel(ctx, x, y, r, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return []; const dend = o.dend || L1_DEND, tips = [], vul = mix(C.bg, L1_MEL(), C.licht ? 0.16 : 0.24), rand = mix(C.line, L1_MEL(), 0.35);
  const vormen = []; dend.forEach(([an, L], i) => { const l = [], rr = []; for (let k = 0; k <= 12; k++) { const u = k / 12, d = r * 0.55 + u * r * L, wob = Math.sin(u * 3.2 + i * 1.7) * r * 0.14 * u, w = r * 0.26 * (1 - u * 0.78);
      const px = x + Math.cos(an) * d - Math.sin(an) * wob, py = y + Math.sin(an) * d + Math.cos(an) * wob, nx = -Math.sin(an), ny = Math.cos(an); l.push([px + nx * w, py + ny * w]); rr.push([px - nx * w, py - ny * w]); if (k === 12) tips.push([px, py]); }
    vormen.push(() => { ctx.beginPath(); ctx.moveTo(l[0][0], l[0][1]); l.forEach(p => ctx.lineTo(p[0], p[1])); const t = tips[i]; ctx.arc(t[0], t[1], r * 0.26 * 0.22, an - 1.57, an + 1.57); for (let k = rr.length - 1; k >= 0; k--) ctx.lineTo(rr[k][0], rr[k][1]); ctx.closePath(); }); });
  vormen.push(() => blob(ctx, x, y, r * 0.78, r * 0.68, 3.1, 0.06));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  vormen.forEach(f => { f(); ctx.strokeStyle = rand; ctx.lineWidth = 5; ctx.stroke(); }); vormen.forEach(f => { f(); ctx.fillStyle = vul; ctx.fill(); });
  circ(ctx, x, y + r * 0.08, r * 0.34, rgba(C.paars, C.licht ? 0.16 : 0.26), C.paars, 2);
  const n = Math.round((o.mel || 0) * 34), R = toeval(7);
  for (let i = 0; i < n; i++) { let px, py; if (i % 3 === 2 && dend.length) { const d = dend[i % dend.length], u = 0.25 + R() * 0.6, dd = r * 0.55 + u * r * d[1]; px = x + Math.cos(d[0]) * dd; py = y + Math.sin(d[0]) * dd; } else { const an = R() * 6.283, rr = r * (0.42 + R() * 0.26); px = x + Math.cos(an) * rr; py = y + Math.sin(an) * rr * 0.85; }
    circ(ctx, px, py, Math.max(2.5, r * 0.065), L1_MEL()); }
  ctx.restore();
  (o.enz || []).forEach((e, i) => L1_enzym(ctx, x + e.dx * r, y + e.dy * r, r * (o.enzS || 0.15), { kapot: e.kapot, a: a * (e.a == null ? 1 : e.a), rot: i * 0.9 }));
  return tips;
}

// doorsnede van de opperhuid in een rechthoek (wordt meestal in een zoomcirkel geknipt). Geeft {bas: [[x,y,r]], pig: [x,y]} terug.
function L1_huid(ctx, x0, y0, w, h, o = {}) {
  const yc = y0 + h * 0.16, yl = y0 + h * 0.31, yb = y0 + h * 0.70, yd = y0 + h * 0.84, uit = { bas: [] };
  ctx.save(); ctx.fillStyle = rgba(C.koraal, C.licht ? 0.07 : 0.09); ctx.beginPath(); ctx.moveTo(x0, yd); for (let x = x0; x <= x0 + w + 10; x += 10) ctx.lineTo(x, yd + 6 + Math.sin((x - x0) / w * 6.283 * 2.5) * h * 0.018); ctx.lineTo(x0 + w, y0 + h); ctx.lineTo(x0, y0 + h); ctx.closePath(); ctx.fill();
  // hoornlaag: dode, platte cellen
  const cw = w / 6; for (let r = 0; r < 4; r++) for (let i = -1; i < 7; i++) { const cx = x0 + i * cw + (r % 2) * cw / 2 + cw / 2, cy = yc + (r + 0.5) * (yl - yc) / 4; ctx.beginPath(); ctx.ellipse(cx, cy, cw * 0.47, (yl - yc) / 9.5, 0, 0, 6.283); shape(ctx, rgba(C.text2, C.licht ? 0.12 : 0.16), rgba(C.text2, 0.55), 1.5); }
  // levende cellen, naar boven toe platter
  const rows = 3, rh = (yb - yl) / rows; for (let r = 0; r < rows; r++) { const cw2 = w / 6, ry = rh * (0.34 + r * 0.05); for (let i = -1; i < 7; i++) { const cx = x0 + i * cw2 + (r % 2) * cw2 / 2 + cw2 / 2, cy = yl + r * rh + rh / 2; blob(ctx, cx, cy, cw2 * 0.46, ry, i * 3 + r, 0.05); shape(ctx, rgba(C.oker, C.licht ? 0.09 : 0.11), rgba(C.oker, 0.55), 2); circ(ctx, cx, cy, Math.min(cw2 * 0.13, ry * 0.42), rgba(C.paars, 0.22), rgba(C.paars, 0.8), 1.5);
      if (o.mel) circ(ctx, cx, cy - ry * 0.5, 3.2, rgba(L1_MEL(), 0.85 * o.mel)); } }
  // basale laag: ronde cellen die blijven delen, met een pigmentcel ertussen
  const n = 8, bcw = w / n, cy = (yb + yd) / 2 - 2, pig = o.pig == null ? 5 : o.pig;
  for (let i = 0; i < n; i++) { const cx = x0 + bcw * (i + 0.5); if (i === pig) { uit.pig = [cx, cy]; continue; } blob(ctx, cx, cy, bcw * 0.46, (yd - yb) * 0.47, i * 1.3, 0.05); shape(ctx, rgba(C.oker, C.licht ? 0.14 : 0.16), C.oker, 2.5); circ(ctx, cx, cy + 2, bcw * 0.2, rgba(C.paars, 0.28), C.paars, 2); uit.bas.push([cx, cy, bcw * 0.46]);
    if (o.hl === i) { ctx.save(); ctx.globalAlpha *= o.hlA == null ? 1 : o.hlA; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, bcw * 0.56, 0, 6.283); ctx.stroke(); ctx.restore(); } }
  if (uit.pig) L1_pigmentcel(ctx, uit.pig[0], uit.pig[1], bcw * 0.36, { mel: o.mel ? 0.8 : 0.4, dend: [[-2.2, 1.6], [-1.57, 1.9], [-0.9, 1.6]] });
  ctx.restore(); uit.yb = yb; uit.yd = yd; uit.yc = yc; uit.yl = yl; return uit;
}
// schaalbalk met maat eronder
function L1_schaal(ctx, x, y, px, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - px / 2, y); ctx.lineTo(x + px / 2, y); ctx.moveTo(x - px / 2, y - 10); ctx.lineTo(x - px / 2, y + 10); ctx.moveTo(x + px / 2, y - 10); ctx.lineTo(x + px / 2, y + 10); ctx.stroke(); ctx.restore(); regel(ctx, label, x, y + 40, a, C.text, 30, 'center', 600); }
// ankerpunten van een castfiguur zonder te tekenen (onzichtbaar canvas)
let _L1cv = null; const _L1ank = {};
function L1_anker(id, x, y, h, o = {}) { const k = [id, x, y, h, o.pose || ''].join(','); if (_L1ank[k]) return _L1ank[k]; if (!_L1cv) { _L1cv = document.createElement('canvas'); _L1cv.width = 4; _L1cv.height = 4; } _L1ank[k] = persoon(_L1cv.getContext('2d'), id, x, y, h, o) || {}; return _L1ank[k]; }

// onderarm van opzij (elleboog links, hand rechts); huid = kleur
function L1_arm(ctx, x, y, L, huid, a = 1) {
  if (a <= 0.01) return; const d = L * 0.2, rd = dk(huid, 0.28); ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x, y - d * 0.55); ctx.bezierCurveTo(x + L * 0.3, y - d * 0.62, x + L * 0.6, y - d * 0.45, x + L * 0.78, y - d * 0.34); ctx.lineTo(x + L * 0.78, y + d * 0.34);
  ctx.bezierCurveTo(x + L * 0.6, y + d * 0.45, x + L * 0.3, y + d * 0.6, x, y + d * 0.55); ctx.arc(x, y, d * 0.55, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); shape(ctx, huid, rd, 2.5);
  ctx.beginPath(); ctx.ellipse(x + L * 0.84, y - d * 0.36, L * 0.055, d * 0.15, -0.55, 0, 6.283); shape(ctx, huid, rd, 2.5);
  ctx.beginPath(); ctx.ellipse(x + L * 0.88, y + d * 0.02, L * 0.11, d * 0.4, 0, 0, 6.283); shape(ctx, huid, rd, 2.5);
  ctx.strokeStyle = rgba(rd, 0.7); ctx.lineWidth = 2; [-0.18, 0.02, 0.2].forEach(k => { ctx.beginPath(); ctx.moveTo(x + L * 0.93, y + d * k); ctx.lineTo(x + L * 0.985, y + d * k); ctx.stroke(); });
  ctx.restore();
}
function L1_zon(ctx, x, y, r, a, T = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; gloed(ctx, x, y, r * 2.4, C.goud, 0.7); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 + T * 0.15; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.7, y + Math.sin(an) * r * 1.7); ctx.stroke(); }
  circ(ctx, x, y, r, C.goud, dk(C.goud, 0.2), 2); ctx.restore(); }
// golvende UV-straal van (x1,y1) naar (x2,y2); u = hoe ver al getekend
function L1_uv(ctx, x1, y1, x2, y2, u, a = 1, T = 0) { if (a <= 0.01 || u <= 0.01) return; const L = Math.hypot(x2 - x1, y2 - y1), an = Math.atan2(y2 - y1, x2 - x1); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x1, y1); ctx.rotate(an); ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const s = i / 60 * L * u; const yy = Math.sin(s * 0.08 - T * 6) * 8; i ? ctx.lineTo(s, yy) : ctx.moveTo(s, yy); } ctx.stroke(); ctx.restore(); }
// rij DNA-letters (één streng van een gen); mark = index die anders is (koraal)
function L1_rij(ctx, x0, y, s, a = 1, o = {}) { if (a <= 0.01) return; const dx = o.dx || 54, bw = o.groot ? 52 : 46, bh = o.groot ? 70 : 60, fp = o.groot ? 36 : 30; [...s].forEach((b, i) => { const m = o.mark === i; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0 + i * dx - bw / 2, y - bh / 2, bw, bh, 8); shape(ctx, m ? rgba(C.koraal, 0.25) : rgba(C.goud, 0.12), m ? C.koraal : rgba(C.goud, 0.8), m ? 3.5 : 2); ctx.restore(); regel(ctx, b, x0 + i * dx, y + fp * 0.36, a, m ? C.koraal : C.text, fp, 'center', 700); }); }
// DNA om eiwitbolletjes gewikkeld (kralen aan een snoer)
function L1_kralen(ctx, x0, y0, x1, y1, n, r, a = 1, T = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const P = (u) => [lerp(x0, x1, u), lerp(y0, y1, u) + Math.sin(u * 6.283 + 0.4) * r * 0.8];
  ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const [x, y] = P(i / 80); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  for (let k = 0; k < n; k++) { const [x, y] = P((k + 0.5) / n); circ(ctx, x, y, r, mix(C.bg, C.line, 0.45), C.line, 2.5); ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, y, r * 1.12, r * 0.55, 0.5, Math.PI * 0.95, Math.PI * 2.05); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y, r * 1.12, r * 0.55, 0.5, Math.PI * 0.05, Math.PI * 0.95); ctx.strokeStyle = rgba(C.paars, 0.45); ctx.stroke(); }
  ctx.restore();
}
// Himalayakonijn van opzij (kijkt naar rechts); (x, y) = grond onder het midden
function L1_konijn(ctx, x, y, s, a = 1) {
  if (a <= 0.01) return; const wit = C.licht ? '#F7F5EF' : '#EDEBE4', zw = C.licht ? '#3B302E' : '#2C2321', rd = C.licht ? '#9A948A' : '#7E7A72';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  ctx.save(); ctx.translate(92, -205); ctx.rotate(-0.62); ctx.beginPath(); ctx.ellipse(0, -66, 21, 72, 0, 0, 6.283); shape(ctx, zw, rd, 2); ctx.restore(); // achterste oor
  circ(ctx, -160, -108, 28, zw, rd, 2); // staart
  ctx.beginPath(); ctx.ellipse(-112, -22, 66, 20, 0.05, 0, 6.283); shape(ctx, zw, rd, 2); // achterpoot (voet)
  ctx.beginPath(); ctx.ellipse(-40, -102, 138, 86, -0.08, 0, 6.283); shape(ctx, wit, rd, 3); // lijf
  ctx.strokeStyle = rgba(rd, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-92, -78, 58, -2.2, 0.2); ctx.stroke(); // dij (alleen een lijntje)
  ctx.beginPath(); ctx.moveTo(46, -66); ctx.quadraticCurveTo(44, -30, 54, -14); ctx.lineTo(86, -14); ctx.quadraticCurveTo(84, -40, 84, -72); ctx.closePath(); shape(ctx, wit, rd, 2); // voorpoot
  ctx.beginPath(); ctx.ellipse(72, -12, 30, 13, 0, 0, 6.283); shape(ctx, zw, rd, 2); // voorvoet
  ctx.beginPath(); ctx.ellipse(118, -160, 64, 52, 0.25, 0, 6.283); shape(ctx, wit, rd, 3); // kop
  ctx.save(); ctx.translate(80, -200); ctx.rotate(-0.32); ctx.beginPath(); ctx.ellipse(0, -66, 22, 74, 0, 0, 6.283); shape(ctx, zw, rd, 2); ctx.restore(); // voorste oor
  ctx.beginPath(); ctx.ellipse(170, -146, 20, 22, 0.3, 0, 6.283); shape(ctx, zw, rd, 2); // snuit
  circ(ctx, 128, -176, 9, '#D9707E', rd, 1.5); // roze oog
  ctx.restore();
}
// tegeltjes voor de vooruitblik
function L1_icoonErwt(ctx, x, y, a, T) { erwtPlant(ctx, x - 70, y + 95, 210, BLOEM.paars, { a, t: T }); [[0, 1], [1, 1], [2, 1], [0, 0]].forEach(([i, g], k) => erwt(ctx, x + 50 + (k % 2) * 46, y + 10 + Math.floor(k / 2) * 46, 19, { geel: !!g, a, rimpel: k === 3 }));
  regel(ctx, '3 : 1', x + 72, y - 56, a, C.goud, 34, 'center', 700); }
function L1_icoonBloed(ctx, x, y, a, T) { leeuwenbek(ctx, x - 80, y + 95, 190, BLOEM.roze, { a }); rodeBloedcel(ctx, x + 60, y + 5 + Math.sin(T * 1.2) * 4, 52, { A: true, B: true, a }); }
function L1_icoonXY(ctx, x, y, a, T) { chromosoom(ctx, x - 50, y + 5, 150, { kl: C.oker, a, w: 26, cen: 0.39 }); chromosoom(ctx, x + 50, y + 35, 56, { kl: C.teal, a, w: 24, cen: 0.18, rot: Math.sin(T) * 0.06 });
  regel(ctx, 'X', x - 50, y + 130, a, C.text2, 30, 'center', 700); regel(ctx, 'Y', x + 50, y + 130, a, C.text2, 30, 'center', 700); }

/* ===================================================================================== */

// ---------- 0 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Erfelijkheid</b> · les 1: chromosomen, genen en allelen, genotype en fenotype', n: 'Kies eerst havo of vwo. Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Deze les hoort bij film 1 (Chromosomen en de taal van erfelijkheid): havo BvJ § 3.1–3.2, vwo Nectar H5 § 5.1–5.2.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Erfelijkheid · les 1', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Eén van je vader,', 140, 465, fTitel(98), C.text); text(ctx, 'één van je moeder', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'chromosomen · genen en allelen · genotype en fenotype', 144, 675, 1, C.text2, 32, 'left', 400);
    const b = 1 + Math.sin(T * 0.9) * 0.025, y = 560;
    [[0, CH.vader, 'A'], [1, CH.moeder, 'a']].forEach(([i, kl, l]) => { const x = 1490 + i * 190, r = (i ? 1 : -1) * (0.09 + Math.sin(T * 0.6 + i) * 0.04);
      chromosoom(ctx, x, y + Math.sin(T * 0.9 + i * 1.3) * 8, 380 * b, { kl, w: 58, cen: 0.39, rot: r, dubbel: 1, banden: [{ p: 0.68, kl: C.goud }] }); });
  } });

// ---------- 1 · de familie De Wit ----------
const L1_GEZIN = [['dennis', 640, 580], ['sara', 815, 500], ['levi', 960, 460], ['jens', 1100, 390], ['marieke', 1280, 565]];
const L1_GROOT = [['opawit', 195], ['omawit', 375], ['opabos', 1545], ['omabos', 1725]];
SCHERMEN.push({ titel: 'De familie De Wit', kop: 'Twee puzzels', deel: 'Opening',
  stappen: [
    { t: 'Het gezin De Wit: vader Dennis, moeder Marieke, en Sara, Levi en Jens.', n: 'Hetzelfde gezin als in film 1 (daar zonder namen). Het gezin komt terug in les 2 en 3.' },
    { t: 'De kinderen lijken op hun vader én op hun moeder, maar geen van hen is precies het <b>gemiddelde</b>.', n: 'Puzzel 1 uit de film: hoe kan een kind op allebei lijken zonder het midden te zijn? Het antwoord komt op scherm 16: van elk gen krijg je één allel van elke ouder, en welke dat zijn verschilt per kind.' },
    { t: 'Levi (10) heeft <b>albinisme</b>: bijna geen pigment in huid, haar en ogen.', n: 'Albinisme is niet alleen huid en haar: ook de ogen ontwikkelen zich anders (minder scherp zien, lichtschuw, trillende ogen). Zie de briefing. Levi heeft in beeld geen zonnebrand, alleen geen pigment.' },
    { t: 'Zijn ouders hebben geen albinisme, en de vier grootouders ook niet.', n: 'Opa Frank en Oma Lucia zijn de ouders van Dennis, Opa Wim en Oma Anja de ouders van Marieke. Puzzel 2: waar komt het albinisme vandaan? Antwoord op scherm 16.' },
    { t: 'Twee puzzels voor vandaag. Om ze op te lossen zoomen we heel ver in.', n: 'Laat de leerlingen hun eerste idee opschrijven; kom erop terug aan het eind (scherm 16 en 17).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.8), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9), s4 = S.on(4, 0.8), VL = 850;
    L1_GROOT.forEach(([id, x], i) => pers(ctx, id, x, 560, 360, { t: T + i, uit: 'blij', kijk: x < 960 ? 1 : -1, a: s3 * S.on(3, 0.6, i * 0.12) }));
    metaText(ctx, 'ouders van Dennis', 285, 606, C.text2, 'center', 24, s3); metaText(ctx, 'ouders van Marieke', 1635, 606, C.text2, 'center', 24, s3);
    regel(ctx, 'geen albinisme', 285, 650, s3 * S.on(3, 0.6, 0.5), C.text2, 30, 'center', 600); regel(ctx, 'geen albinisme', 1635, 650, s3 * S.on(3, 0.6, 0.5), C.text2, 30, 'center', 600);
    L1_GEZIN.forEach(([id, x, h], i) => { const kind = ['sara', 'levi', 'jens'].includes(id), hl = id === 'levi' ? s2 : kind ? s1 * (1 - s2 * 0.6) : 0;
      if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl * s0; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, VL + 4, h * 0.2, 16, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      pers(ctx, id, x, VL, h, { t: T + i * 0.7, uit: 'blij', kijk: x < 960 ? 1 : -1, a: s0 * S.on(0, 0.6, i * 0.1) }); });
    naam(ctx, 'vader', 640, VL - 625, s1, 'center', CH.vader, 36); naam(ctx, 'moeder', 1280, VL - 590, s1, 'center', CH.moeder, 36);
    naam(ctx, 'albinisme', 960, VL - 505, s2, 'center', C.goud, 36);
    ['Dennis', 'Sara', 'Levi', 'Jens', 'Marieke'].forEach((nm, i) => naam(ctx, nm, L1_GEZIN[i][1], VL + 44, s0, 'center', C.text2, 30));
    balk(ctx, 'geen gemiddelde   ·   albinisme bij Levi', 960, 958, 980, s4, C.goud, 40);
  } });

// ---------- 2 · inzoomen ----------
SCHERMEN.push({ titel: 'Inzoomen', kop: 'Van huid naar kern', deel: 'Chromosomen',
  stappen: [
    { t: 'We zoomen in op de huid van Mariekes arm. Bovenop liggen dode, platte cellen; onderin de <b>basale laag</b>, die steeds deelt.', n: 'Doorsnede van de opperhuid (schaalbalk 20 µm). Daaronder, roze, de lederhuid. De basale laag is één laag cellen; daarin zitten ook de pigmentcellen (scherm 10).' },
    { t: 'Eén cel uit de basale laag: ongeveer een <b>honderdste millimeter</b> (10 µm).', n: 'Delende basale cellen zijn ± 10 µm. Dezelfde schaal als links: daar is één cel ± 10 µm breed.' },
    { t: 'In het midden de <b>kern</b>, een paar micrometer groot. Daarin ligt het DNA.', n: 'Kern ± 5–10 µm (getekend ± 6 µm). Alle lichaamscellen met een kern hebben dezelfde chromosomen; rode bloedcellen hebben geen kern.' },
    { t: 'Uitgerekt is het DNA uit <b>één</b> cel ongeveer <b>2 meter</b> lang. Toch past het in die kern.', n: '2 × 3 miljard basenparen × 0,34 nm ≈ 2 m: langer dan Marieke zelf. De lijn links is op dezelfde schaal als Marieke getekend.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 1.0), s1 = S.on(1, 1.0), s2 = S.on(2, 0.9), s3 = S.on(3, 1.8), VL = 950, h = 630;
    pers(ctx, 'marieke', 330, VL, h, { t: T, uit: 'blij' });
    const an = L1_anker('marieke', 330, VL, h, {}), hd = [an.handR, an.handL].filter(Boolean).sort((p, q) => q.x - p.x)[0] || { x: 400, y: 600 }, arm = [hd.x - 6, hd.y - 80];
    naam(ctx, 'Marieke', 330, VL + 44, 1, 'center', C.text2, 30);
    const ax = 900, ay = 560, ar = 330; let H = {};
    zoom(ctx, ax, ay, ar, s0, arm, () => { H = L1_huid(ctx, ax - ar, ay - ar, ar * 2, ar * 2, { hl: 2, hlA: s1 }); });
    const bc = (H.bas || [])[2] || [ax - 160, ay + 280, 34];
    naam(ctx, 'dode cellen', ax, ay - ar * 0.6, s0 * (1 - s1 * 0.4), 'center', C.text, 32);
    naam(ctx, 'basale laag', ax, ay + ar * 0.86, s0, 'center', C.oker, 32);
    L1_schaal(ctx, ax, ay + ar + 48, 2 * ar / 8 * 2, '20 µm', s0);
    const bx = 1540, by = 520, br = 290;
    zoom(ctx, bx, by, br, s1, [bc[0], bc[1]], () => {
      blob(ctx, bx, by + 10, 205, 192, 2.2, 0.05); shape(ctx, rgba(C.oker, C.licht ? 0.12 : 0.14), C.oker, 4);
      L1_kern(ctx, bx + 8, by + 18, 108, 1); L1_kluwen(ctx, bx + 8, by + 18, 108, 0.35 + 0.65 * s2);
      if (s2 > 0.01) gloed(ctx, bx + 8, by + 18, 150, C.paars, s2 * (0.5 + 0.2 * Math.sin(T * 2)));
    });
    naam(ctx, 'basale cel', bx, by - br - 20, s1, 'center', C.oker, 32);
    naam(ctx, 'kern', bx + 8, by + 166, s2, 'center', C.paars, 34);
    L1_schaal(ctx, bx, by + br + 48, 175, '5 µm', s1);
    if (s3 > 0.01) { const top = VL - h * 0.97 * 2 / 1.68, x = 110, yTop = lerp(VL, top, s3); ctx.save(); ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let y = VL; y >= yTop; y -= 4) ctx.lineTo(x + Math.sin(y * 0.09) * 4, y); ctx.stroke(); ctx.restore();
      regel(ctx, '± 2 m', x + 24, top + 44, S.on(3, 0.6, 1.2), C.paars, 44, 'left', 700); regel(ctx, 'DNA uit één cel', x + 24, top + 84, S.on(3, 0.6, 1.2), C.text, 30, 'left', 600); }
  } });

// ---------- 3 · van kluwen naar chromosoom ----------
SCHERMEN.push({ titel: 'Kluwen en chromosoom', kop: 'Van kluwen naar chromosoom', deel: 'Chromosomen',
  stappen: [
    { t: 'Meestal ligt het DNA als een losse <b>kluwen</b> in de kern.', n: 'Tussen twee delingen (interfase). Vereenvoudigd: elk chromosoom heeft ook dan een eigen plek in de kern.' },
    { t: 'Vlak voor een deling wikkelt het DNA zich strak op. Dan zie je losse staafjes: <b>chromosomen</b>.', n: 'Alleen in een delende cel zijn chromosomen met een lichtmicroscoop te zien. Daarom maak je een karyogram van cellen die net delen.' },
    { t: 'Elk chromosoom is <b>één</b> heel lang DNA-molecuul, opgerold rond eiwitten.', n: 'Het grootste chromosoom (nummer 1) is één DNA-molecuul van ongeveer een kwart miljard basenparen.' },
    { t: 'Voor de deling is het al gekopieerd: twee identieke <b>zusterchromatiden</b>, vast aan elkaar bij het <b>centromeer</b>.', n: 'Een chromosoom met twee chromatiden is nog steeds één chromosoom. Bij de deling gaan de chromatiden uit elkaar (mitose: elke dochtercel één).' },
    { t: 'DNA met eiwitten heet <b>chromatine</b>. Het DNA is om eiwitbolletjes gewikkeld: <b>histonen</b>.', vwo: true, n: 'Een stukje DNA om een kern van acht histonen = een nucleosoom: kralen aan een snoer. Bij de deling wordt dat snoer nog veel verder opgevouwen.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.8), s1 = S.on(1, 1.6), s2 = S.on(2, 1.0), s3 = S.on(3, 1.0), s4 = S.on(4, 0.9), kx = 500, ky = 575, R = 370;
    L1_kern(ctx, kx, ky, R, s0); L1_kluwen(ctx, kx, ky, R, s0 * (1 - s1));
    const hi = L1_kernLayout().findIndex(c => c.nr === 2 && c.kopie === 0);
    L1_chrom46(ctx, kx, ky, R, 0, { a: s1, schaal: lerp(0.35, 1, s1), ring: (c, i) => i === hi ? s2 : 0 });
    naam(ctx, 'kern', kx, ky - R - 18, s0, 'center', C.paars, 32); naam(ctx, 'DNA', kx + R * 0.58, ky - R * 0.66, s0 * (1 - s1), 'center', C.paars, 32);
    naam(ctx, 'chromosomen', kx, ky + R + 46, s1, 'center', C.text, 32);
    const [hx, hy] = L1_pos(hi, kx, ky, R), cx = 1180, cy = 600, L = 560, w = 76;
    if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(hx + 40, hy); ctx.lineTo(cx - 100, cy - 40); ctx.stroke(); ctx.restore(); }
    chromosoom(ctx, cx, cy, L, { kl: CH.neutraal, w, cen: 0.39, dubbel: 1, a: s2 });
    const zx = 1610, zy = 370, zr = 210, van = [cx + 40, cy - L * 0.39 + 70];
    zoom(ctx, zx, zy, zr, s2 * S.on(2, 0.7, 0.4), van, () => { L1_kralen(ctx, zx - 240, zy + 50, zx + 240, zy - 25, 4, 38, 1, T); });
    naam(ctx, 'DNA', zx - 130, zy + 160, s2, 'center', C.paars, 32); naam(ctx, 'eiwitten', zx + 80, zy + 160, s2 * (1 - s4), 'center', C.text, 32);
    naam(ctx, 'histonen', zx + 80, zy + 160, s4, 'center', C.text, 32); naam(ctx, 'chromatine', zx, zy - zr - 18, s4, 'center', C.paars, 32);
    if (s3 > 0.01) { const o = w * 0.55; ctx.save(); ctx.globalAlpha *= s3 * (0.55 + 0.25 * Math.sin(T * 2.5)); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - o - w * 0.45, cy - L * 0.39); ctx.quadraticCurveTo(cx - o, cy - L * 0.39 * 0.4, cx - o * 0.75, cy); ctx.quadraticCurveTo(cx - o, cy + L * 0.61 * 0.4, cx - o - w * 0.45, cy + L * 0.61); ctx.stroke(); ctx.restore(); }
    wijs(ctx, 'zusterchromatide', cx - 270, cy + 330, cx - 60, cy + 220, s3, C.text, 32); wijs(ctx, 'zusterchromatide', cx + 290, cy + 330, cx + 60, cy + 220, s3, C.text, 32);
    wijs(ctx, 'centromeer', cx + 280, cy + 60, cx + 24, cy + 4, s3, C.text, 32);
  } });

// ---------- 4 · tellen ----------
SCHERMEN.push({ titel: 'Tellen', kop: 'Hoeveel chromosomen?', deel: 'Chromosomen',
  stappen: [
    { t: 'Eén kern van een mens, vlak voor de deling. We tellen de chromosomen: <b>46</b>.', n: 'Geldt voor alle lichaamscellen met een kern (behalve zaadcellen en eicellen, scherm 7). Andere soorten hebben een ander aantal: dat zegt niets over hoe ingewikkeld een soort is.' },
    { t: 'Elk chromosoom bestaat uit twee zusterchromatiden: samen <b>92</b> chromatiden.', n: 'Misvatting: "92 chromosomen". Je telt de centromeren: 46.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 3.2), s1 = S.on(1, 0.9), kx = 620, ky = 580, R = 400, n = Math.floor(s0 * 46 + 0.001);
    L1_kern(ctx, kx, ky, R, 1);
    L1_chrom46(ctx, kx, ky, R, 0, {});
    const vol = L1_kernLayout().map((c, i) => i).sort((a, b) => L1_kernLayout()[a].x - L1_kernLayout()[b].x);
    vol.slice(0, n).forEach(i => { const [x, y] = L1_pos(i, kx, ky, R); circ(ctx, x, y, 7, C.goud); });
    regel(ctx, String(n), 1440, 540, s0 > 0.01 ? 1 : 0, C.goud, 200, 'center', 700); regel(ctx, 'chromosomen', 1440, 620, s0, C.text, 40, 'center', 600);
    if (s1 > 0.01) { chromosoom(ctx, 1290, 820, 190, { kl: CH.neutraal, w: 32, a: s1 }); regel(ctx, '× 2', 1410, 838, s1, C.text2, 46, 'center', 700); regel(ctx, '= 92', 1490, 838, s1, C.text, 52, 'left', 700); regel(ctx, 'chromatiden', 1500, 890, s1, C.text2, 34, 'left', 600); }
  } });

// ---------- 5 · het karyogram ----------
SCHERMEN.push({ titel: 'Het karyogram', kop: 'Het karyogram: 23 paren', deel: 'Chromosomen',
  stappen: [
    { t: 'Sorteer de 46 op lengte en op de plek van het centromeer: ze vormen <b>23 paren</b>. Dat heet een <b>karyogram</b>.', n: 'Hier een karyogram van een vrouw (paar 23 = XX, scherm 8). In het lab sorteer je ook op het bandenpatroon na kleuring.' },
    { t: 'Van elk paar komt één chromosoom van je <b>vader</b> en één van je <b>moeder</b>.', n: 'Teal = van de vader, oker = van de moeder; dezelfde kleuren als in de film. In een echt karyogram zie je dat verschil niet.' },
    { t: 'Zo\'n paar heet <b>homologe chromosomen</b>: even lang, dezelfde bouw, en op dezelfde plek dezelfde soort informatie.', n: 'Dezelfde soort informatie, niet precies dezelfde: daar gaat scherm 9 over (allelen).' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 1.0), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), kx = 620, ky = 590, R = 380;
    L1_kern(ctx, kx, ky, R, 1 - s0);
    L1_chrom46(ctx, kx, ky, R, 0, { uVan: (i) => S.on(0, 1.4, (i % 23) * 0.04), kleur: (c) => mix(CH.neutraal, c.kopie ? CH.moeder : CH.vader, s1), aVan: (c) => s2 > 0.01 && c.nr !== 7 ? 1 - s2 * 0.6 : 1 });
    for (let nr = 1; nr <= 23; nr++) { const s = L1_slot(nr, 0); regel(ctx, String(nr), s.mx, L1_onder(nr), s0 * S.on(0, 0.5, 1.2), C.text2, 28, 'center', 600); }
    if (s1 > 0.01) { regel(ctx, 'van vader', 1500, 200, s1, CH.vader, 34, 'right', 700); regel(ctx, 'van moeder', 1540, 200, s1, CH.moeder, 34, 'left', 700); }
    // homoloog paar 7 met gouden kader en twee banden op dezelfde hoogte
    if (s2 > 0.01) { const s = L1_slot(7, 0), L = s.len, top = s.y - L * s.cen - 14, bot = s.y + L * (1 - s.cen) + 14; ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, s.mx - 64, top, 128, bot - top, 12); ctx.stroke(); ctx.restore();
      [0, 1].forEach(k => { const q = L1_slot(7, k); [0.22, 0.7].forEach(p => { ctx.save(); ctx.globalAlpha *= s2 * S.on(2, 0.5, 0.4); roundRect(ctx, q.x - 18, q.y - L * q.cen + p * L - 6, 36, 12, 3); shape(ctx, C.goud, dk(C.goud, 0.4), 1.5); ctx.restore(); }); });
      naam(ctx, 'homologe chromosomen', s.mx + 84, top + 4, s2, 'left', C.goud, 34); }
  } });

// ---------- 6 · één set of twee ----------
SCHERMEN.push({ titel: 'Eén set of twee', kop: 'Eicel, zaadcel, bevruchting', deel: 'Chromosomen',
  stappen: [
    { t: 'Een <b>eicel</b> heeft 23 chromosomen: van elk paar precies één.', n: 'Vraag uit de film: een eicel en een zaadcel smelten samen tot een cel met 46 chromosomen. Hoeveel chromosomen zitten er in één eicel? (a 46 · b 23 · c 92). Bij de eisprong zijn de chromosomen van de eicel nog dubbel (twee chromatiden): haar laatste deling maakt ze pas af als er een zaadcel binnendringt.' },
    { t: 'Een <b>zaadcel</b> heeft ook 23 chromosomen, elk uit maar één chromatide.', n: 'Van elk paar één: dat regelt de meiose (les 2; ook in Voortplanting les 1). Welke van de twee, is per paar toeval.' },
    { t: 'Bij de <b>bevruchting</b> smelten ze samen: weer <b>46</b>, dus weer 23 paren.', n: 'Nu pas maakt de eicel haar laatste deling af; daarna zijn alle 46 chromosomen enkel. Voor de eerste deling van de zygote worden ze gekopieerd.' },
    { t: 'Eén set heet <b>haploïd</b> (n), twee sets <b>diploïd</b> (2n). Bij de mens is n = 23.', n: 'n = aantal verschillende chromosomen in één set. 2n = 46 in elke lichaamscel.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 2.2), s3 = S.on(3, 0.9), ex = 600, ey = 570, er = 300, ks = 190;
    const lay = L1_kernLayout(), vers = ease(clamp((s2 - 0.55) / 0.45, 0, 1));
    if (s0 > 0.01) { ctx.save(); ctx.globalAlpha *= s0; circ(ctx, ex, ey, er * 1.12, rgba(C.oker, 0.08), rgba(C.oker, 0.45), 2); circ(ctx, ex, ey, er, rgba(C.oker, C.licht ? 0.1 : 0.14), C.oker, 4); ctx.restore();
      lay.filter(c => c.kopie === 1).forEach(c => chromosoom(ctx, ex + c.x * ks, ey + c.y * ks, c.len * ks, { kl: CH.moeder, w: Math.max(8, c.len * ks * 0.24), rot: c.rot, cen: L1_CEN[c.nr - 1], dubbel: 1 - vers, a: s0 })); }
    naam(ctx, 'eicel', ex, ey - er * 1.12 - 20, s0 * (1 - vers), 'center', C.oker, 34); naam(ctx, 'bevruchte eicel', ex, ey - er * 1.12 - 20, vers, 'center', C.text, 34);
    const zx = lerp(1350, ex + 50, ease(clamp(s2 / 0.55, 0, 1))), zy = ey, zr = 84, zin = clamp(s2 / 0.55, 0, 1);
    if (s1 > 0.01 && vers < 0.99) { ctx.save(); ctx.globalAlpha *= s1 * (1 - vers); gameet(ctx, zx, zy, zr, '', { soort: 'zaad', kl: C.teal, t: T, a: 1 - zin * 0.6 }); ctx.restore(); }
    lay.filter(c => c.kopie === 0).forEach(c => { const sx = zx + c.x * 70, sy = zy + c.y * 58, tx = ex + c.x * ks + 7, ty = ey + c.y * ks + 7, x = lerp(sx, tx, vers), y = lerp(sy, ty, vers), L = lerp(c.len * 62, c.len * ks, vers);
      chromosoom(ctx, x, y, L, { kl: CH.vader, w: Math.max(4, L * 0.22), rot: c.rot, cen: L1_CEN[c.nr - 1], dubbel: 0, a: s1 }); });
    naam(ctx, 'zaadcel', 1400, ey - 130, s1 * (1 - zin), 'center', C.teal, 34);
    regel(ctx, '23', ex, ey + er + 100, s0 * (1 - vers), C.oker, 70, 'center', 700); regel(ctx, '23', 1350, ey + 160, s1 * (1 - zin), C.teal, 70, 'center', 700);
    regel(ctx, '46', ex, ey + er + 100, vers, C.text, 70, 'center', 700);
    const ta = s3;
    if (ta > 0.01) { termKaart(ctx, 'haploïd · n', 'één set: 23', 1450, 280, ta, C.teal, 560); termKaart(ctx, 'diploïd · 2n', 'twee sets: 46', 1450, 460, ta * S.on(3, 0.6, 0.3), C.goud, 560);
      regel(ctx, 'eicel en zaadcel: n', 1450, 720, ta * S.on(3, 0.6, 0.6), C.text, 36, 'center', 600); regel(ctx, 'bevruchte eicel, lichaamscel: 2n', 1450, 780, ta * S.on(3, 0.6, 0.8), C.text, 36, 'center', 600); }
  } });

// ---------- 7 · geslachtschromosomen ----------
SCHERMEN.push({ titel: 'X en Y', kop: 'Autosomen en geslachtschromosomen', deel: 'Chromosomen',
  stappen: [
    { t: 'Paar 1 tot en met 22 heten <b>autosomen</b>. Die zijn bij mannen en vrouwen hetzelfde.', n: 'Ook de volgorde van de genen op de autosomen is bij iedereen gelijk.' },
    { t: 'Paar 23 zijn de <b>geslachtschromosomen</b>. Een vrouw heeft er twee <b>X</b>.', n: 'Een X van haar vader, een X van haar moeder.' },
    { t: 'Een man heeft één <b>X</b> en één veel kleiner <b>Y</b>-chromosoom.', n: 'De X van zijn moeder, de Y van zijn vader. Y: ruim 59 miljoen basenparen, X: ± 155 miljoen. Op de Y ligt SRY, het gen dat de aanleg van teelballen start. Er zijn ook mensen met een andere combinatie of ontwikkeling (film Sekse en gender).' },
    { t: 'Mannen hebben dus <b>óók</b> een X-chromosoom, maar maar één.', n: 'Belangrijk voor les 2 (kleurenblindheid): een man heeft van de genen op de X maar één allel.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 1.2), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    for (let nr = 1; nr <= 22; nr++) { const x = 150 + (nr - 1) * 77.5, a = s0 * S.on(0, 0.4, nr * 0.03); [0, 1].forEach(k => chromosoom(ctx, x + (k ? 13 : -13), 290, L1_MB[nr - 1] * 0.38, { kl: CH.neutraal, w: 10, cen: L1_CEN[nr - 1], a })); regel(ctx, String(nr), x, 392, a, C.text2, 26, 'center', 600); }
    naam(ctx, 'autosomen', 960, 440, s0, 'center', C.text, 34);
    const pan = (x0, a, id, kop, Y) => { if (a <= 0.01) return; paneel(ctx, x0, 470, 780, 360, a); pers(ctx, id, x0 + 130, 805, 310, { uit: 'blij', a });
      chromosoom(ctx, x0 + 380, 640, 156 * 1.45, { kl: CH.moeder, w: 38, cen: 0.39, a }); if (Y) chromosoom(ctx, x0 + 500, 640, 59 * 1.45, { kl: CH.vader, w: 38, cen: 0.18, a }); else chromosoom(ctx, x0 + 500, 640, 156 * 1.45, { kl: CH.vader, w: 38, cen: 0.39, a });
      regel(ctx, kop, x0 + 665, 665, a, C.text, 76, 'center', 700); naam(ctx, 'X', x0 + 380, 818, a, 'center', C.oker, 32); naam(ctx, Y ? 'Y' : 'X', x0 + 500, 818, a, 'center', C.teal, 32); };
    pan(130, s1, 'marieke', 'XX', false); pan(1010, s2, 'dennis', 'XY', true);
    misvatting(ctx, 'mannen hebben geen X', 'mannen hebben ook een X, maar één', 960, 848, 1000, s3, S.on(3, 0.6, 0.4));
  } });

// ---------- 8 · gen, locus, allel ----------
SCHERMEN.push({ titel: 'Gen, locus, allel', kop: 'Gen, locus en allel', deel: 'Gen en allel',
  stappen: [
    { t: 'We nemen één paar: <b>chromosoom 11</b>, één van de vader en één van de moeder.', n: 'Getekend als één chromatide (zoals na de deling); de informatie is op beide chromatiden hetzelfde.' },
    { t: 'Ergens op dit chromosoom ligt een stukje DNA met de instructie voor één eiwit: een <b>gen</b>.', n: 'De mens heeft ± 20.000 genen voor eiwitten, verdeeld over alle chromosomen. Er zijn ook genen voor RNA dat geen eiwit wordt (niet nodig op dit niveau).' },
    { t: 'Het gen ligt op beide chromosomen op dezelfde hoogte. Die plek heet de <b>locus</b>.', n: 'Meervoud: loci. Bij iedereen ligt dit gen op dezelfde locus.' },
    { t: 'Hier verschilt de DNA-volgorde op één plek. Twee versies van een gen heten <b>allelen</b>: A en a.', n: 'Een ander allel kan een net iets ander eiwit opleveren. Niet elk verschil verandert het eiwit (vergelijk de stille mutatie in DNA les 3).' },
    { t: 'Van elk gen op de autosomen heb je dus twee allelen: één van je vader, één van je moeder.', n: 'Iedereen heeft dit gen, niet iedereen heeft dezelfde allelen. De letters bedenk je per eigenschap.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9), s4 = S.on(4, 0.8), L = 620, cy = 575, cen = 0.39, p = 0.68, by = cy - L * cen + p * L, xv = 330, xm = 590, w = 74;
    [[xv, CH.vader, 'A', true], [xm, CH.moeder, 'a', false]].forEach(([x, kl, l, links], i) => chromosoom(ctx, x, cy, L, { kl, w, cen, dubbel: 0, a: s0, banden: s1 > 0.01 && (i === 0 || s2 > 0.01) ? [{ p, kl: C.goud, letter: l, px: 60, letterKl: C.text }] : [], letterLinks: links, letterA: s3 }));
    naam(ctx, 'van vader', xv, cy - L * cen - 52, s0, 'center', CH.vader, 32); naam(ctx, 'van moeder', xm, cy - L * cen - 52, s0, 'center', CH.moeder, 32); regel(ctx, '11', (xv + xm) / 2, cy + L * (1 - cen) + 50, s0, C.text2, 34, 'center', 700);
    if (s1 > 0.01 && s2 < 0.01) naam(ctx, 'gen', (xv + xm) / 2, by - 30, s1, 'center', C.goud, 36);
    if (s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 9]); ctx.beginPath(); ctx.moveTo(xv + w / 2 + 4, by); ctx.lineTo(xm - w / 2 - 4, by); ctx.stroke(); ctx.restore();
      naam(ctx, 'locus', (xv + xm) / 2, by + 50, s2, 'center', C.goud, 36); naam(ctx, 'gen', (xv + xm) / 2, by - 30, s2, 'center', C.goud, 36); }
    const x0 = 950, dx = 60, vy = 380, my = 660, sq1 = 'GACCTGGATTCA', sq2 = 'GACATGGATTCA', xe = x0 + 11 * dx;
    if (s1 > 0.01) { ctx.save(); ctx.globalAlpha *= s1; ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(xv + w / 2, by - 20); ctx.lineTo(x0 - 40, vy - 34); ctx.moveTo(xv + w / 2, by + 20); ctx.lineTo(x0 - 40, vy + 34); ctx.stroke(); ctx.restore(); }
    L1_rij(ctx, x0, vy, sq1, s1, { dx, groot: true }); pijl(ctx, xe + 44, vy, xe + 110, vy, C.text2, 5, s1); L1_enzym(ctx, xe + 185, vy, 54, { a: s1, kl: C.groen });
    naam(ctx, 'gen', x0 - 30, vy - 56, s1, 'left', C.goud, 32); naam(ctx, 'eiwit', xe + 185, vy + 104, s1, 'center', C.text, 32);
    if (s3 > 0.01) { L1_rij(ctx, x0, my, sq2, s3, { mark: 3, dx, groot: true }); pijl(ctx, xe + 44, my, xe + 110, my, C.text2, 5, s3); L1_enzym(ctx, xe + 185, my, 54, { a: s3, kl: C.koraal, vorm: L1_ANDERS });
      allelChip(ctx, 'A', x0 - 110, vy, s3, { px: 46, kl: CH.vader }); allelChip(ctx, 'a', x0 - 110, my, s3, { px: 46, kl: CH.moeder });
      naam(ctx, 'allelen: twee versies van het gen', x0 + 330, (vy + my) / 2 + 12, s3, 'center', C.text, 34); }
    balk(ctx, 'gen = onderwerp   ·   allel = versie', 1290, 905, 920, s4, C.goud, 42);
  } });

// ---------- 9 · van allel naar eigenschap ----------
const L1_BAS = [180, 310, 440, 700, 830];
SCHERMEN.push({ titel: 'Van allel naar eigenschap', kop: 'Pigmentcellen en tyrosinase', deel: 'Gen en allel',
  stappen: [
    { t: 'Tussen de delende cellen van de basale laag zitten <b>pigmentcellen</b>, met lange uitlopers.', n: 'Melanocyten: veel minder dan de gewone basale cellen. Huidskleur verschilt vooral door hoeveel en welk melanine ze maken.' },
    { t: 'Ze maken <b>melanine</b>, het bruine pigment, en geven het via de uitlopers door aan de huidcellen.', n: 'Het melanine ligt als een kapje boven de kern van de huidcellen en beschermt het DNA tegen UV. Ook haar en ogen krijgen hun pigment van melanocyten.' },
    { t: 'Voor melanine is een enzym nodig: <b>tyrosinase</b>. Het zet bouwstenen om in melanine.', n: 'Vereenvoudigd: tyrosinase doet de eerste stap van de melanineaanmaak; daarna volgen nog meer stappen. De bouwsteen is het aminozuur tyrosine.' },
    { t: 'Het gen voor tyrosinase ligt op chromosoom 11. Allel <b>A</b> geeft een werkend enzym, allel <b>a</b> een enzym dat <b>niet werkt</b>.', n: 'Albinisme type 1 (OCA1), gen TYR. Bij OCA1A werkt het enzym helemaal niet; bij OCA1B nog een beetje (dan komt er later wat pigment). Er zijn ook andere genen voor albinisme.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.2), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9), y = 545, cr = 100, XS = [225, 435, 645, 855, 1065], px0 = 645;
    if (s0 > 0.01) {
      XS.forEach((x, i) => { ctx.save(); ctx.globalAlpha *= s0; blob(ctx, x, y - 225, 100, 80, i, 0.05); shape(ctx, rgba(C.oker, 0.1), rgba(C.oker, 0.6), 2.5); circ(ctx, x, y - 220, 28, rgba(C.paars, 0.22), rgba(C.paars, 0.8), 2); ctx.restore();
        const m = s1 * S.on(1, 0.5, 0.5 + i * 0.08); if (m > 0.01) for (let k = 0; k < 7; k++) circ(ctx, x - 30 + k * 10, y - 266 + Math.sin(k * 2) * 6, 6.5, rgba(L1_MEL(), 0.9 * m)); });
      XS.forEach((x, i) => { if (x === px0) return; ctx.save(); ctx.globalAlpha *= s0; blob(ctx, x, y, cr, cr * 0.95, i * 1.5, 0.05); shape(ctx, rgba(C.oker, C.licht ? 0.14 : 0.16), C.oker, 3); circ(ctx, x, y + 3, 38, rgba(C.paars, 0.28), C.paars, 2.5); ctx.restore();
        if (s1 > 0.01) for (let k = 0; k < 6; k++) circ(ctx, x - 26 + k * 10, y - 50 + Math.sin(k * 2) * 5, 6, rgba(L1_MEL(), 0.85 * s1 * S.on(1, 0.5, 0.6))); }); }
    L1_pigmentcel(ctx, px0, y + 10, 88, { a: s0, mel: 0.15 + s1 * 0.85, dend: [[-2.2, 2.4], [-1.57, 2.6], [-0.95, 2.4], [-2.95, 1.5], [-0.15, 1.5]] });
    naam(ctx, 'pigmentcel', px0, y + 150, s0, 'center', C.text, 34); naam(ctx, 'basale laag', 225, y + 150, s0, 'center', C.oker, 32); naam(ctx, 'huidcellen', 1065, y - 340, s0, 'center', C.oker, 32); naam(ctx, 'melanine', 645, y - 340, s1, 'center', L1_MEL(), 34);
    const zx = 1530, zy = 520, zr = 320;
    zoom(ctx, zx, zy, zr, s2, [px0 + 60, y - 10], () => { blob(ctx, zx, zy, zr * 0.95, zr * 0.9, 2, 0.04); shape(ctx, mix(C.bg, L1_MEL(), C.licht ? 0.1 : 0.16), null);
      for (let i = 0; i < 9; i++) { const ph = (T * 0.22 + i / 9) % 1, x = zx - 250 + ph * 500, yy = zy + (i % 3 - 1) * 60 * Math.abs(ph - 0.5) * 2;
        if (ph < 0.5) circ(ctx, x, yy, 13, C.text2); else circ(ctx, x, yy, 16, L1_MEL()); }
      L1_enzym(ctx, zx, zy, 80, { kl: C.groen, rot: Math.sin(T) * 0.05 }); });
    naam(ctx, 'tyrosinase', zx, zy + 150, s2, 'center', C.groen, 36); naam(ctx, 'bouwsteen', zx - 150, zy - 160, s2, 'center', C.text2, 32); naam(ctx, 'melanine', zx + 150, zy - 160, s2, 'center', L1_MEL(), 32);
    const kaart = (x0, y0, a, l, kapot) => { if (a <= 0.01) return; paneel(ctx, x0, y0, 470, 250, a); chromosoom(ctx, x0 + 70, y0 + 130, 190, { kl: CH.neutraal, w: 30, cen: 0.39, dubbel: 0, a, banden: [{ p: 0.68, kl: C.goud }] });
      allelChip(ctx, l, x0 + 165, y0 + 120, a, { px: 46 }); pijl(ctx, x0 + 225, y0 + 120, x0 + 285, y0 + 120, C.text2, 5, a); L1_enzym(ctx, x0 + 355, y0 + 112, 42, { kapot, a });
      if (kapot) kruis(ctx, x0 + 430, y0 + 56, 18, a); else vink(ctx, x0 + 430, y0 + 56, 18, a);
      regel(ctx, kapot ? 'werkt niet' : 'werkt', x0 + 355, y0 + 222, a, kapot ? C.koraal : C.groen, 32, 'center', 700); };
    kaart(130, 750, s3, 'A', false); kaart(650, 750, s3 * S.on(3, 0.6, 0.4), 'a', true);
  } });

// ---------- 10 · genotype ----------
const L1_ENZ = [{ dx: -0.6, dy: -0.15 }, { dx: 0.55, dy: -0.25 }, { dx: -0.45, dy: 0.5 }, { dx: 0.5, dy: 0.45 }];
SCHERMEN.push({ titel: 'Genotype', kop: 'Genotype: AA, Aa of aa', deel: 'Gen en allel',
  stappen: [
    { t: 'De combinatie van allelen die iemand heeft, heet het <b>genotype</b>. Er zijn drie mogelijkheden.', n: 'Per pigmentcel: elke cel heeft beide allelen.' },
    { t: 'Elk werkend allel levert werkend enzym. Bij <b>Aa</b> is er maar <b>half</b> zoveel werkend tyrosinase.', n: 'Het allel a levert wel een eiwit, maar dat werkt niet (bij sommige allelen komt er helemaal geen eiwit).' },
    { t: 'Half zoveel enzym is ruim genoeg: Aa maakt ongeveer evenveel melanine als AA. Bij aa komt er <b>geen</b> melanine.', n: 'Vraag uit de film: een pigmentcel met Aa heeft maar één werkend allel. Hoeveel melanine maakt hij? (a ongeveer evenveel als AA · b ongeveer de helft · c geen). Dragers hebben wel minder tyrosinase-activiteit (te meten in haarwortels, zie bronnen van film 1), maar je ziet het niet. Vwo: zie haploïnsufficiëntie in de briefing.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 2.0), y = 560, r = 155;
    [['AA', 2, 1.0], ['Aa', 1, 0.93], ['aa', 0, 0]].forEach(([g, w, mel], i) => { const x = 360 + i * 600, a = s0 * S.on(0, 0.6, i * 0.15);
      allelChip(ctx, g, x, 225, a, { px: 52 });
      const enz = L1_ENZ.map((e, k) => Object.assign({}, e, { kapot: k >= w * 2, a: s1 * S.on(1, 0.5, k * 0.12) }));
      L1_pigmentcel(ctx, x, y, r, { a, mel: mel * s2, enz, enzS: 0.17, dend: [[-2.4, 0.95], [-1.6, 1.05], [-0.75, 0.95], [0.4, 0.75], [2.6, 0.75]] });
      if (s1 > 0.01) regel(ctx, `${w * 2} van de 4 werken`, x, y + 245, s1, w ? C.groen : C.koraal, 34, 'center', 600);
      if (s2 > 0.01) { kansBalk(ctx, x - 210, 850, 420, 48, mel * S.on(2, 1.4, 0.3), L1_MEL(), s2); if (!mel) regel(ctx, 'geen', x, 886, s2, C.koraal, 32, 'center', 700); } });
    metaText(ctx, 'melanine', 960, 950, C.text2, 'center', 26, s2);
  } });

// ---------- 11 · fenotype, dominant, recessief ----------
SCHERMEN.push({ titel: 'Fenotype', kop: 'Fenotype: dominant en recessief', deel: 'Gen en allel',
  stappen: [
    { t: 'Wat je kunt waarnemen, heet het <b>fenotype</b>. AA en Aa: ander genotype, <b>zelfde</b> fenotype.', n: 'Niet alleen "de buitenkant": ook een bloedgroep of de werking van een enzym is fenotype.' },
    { t: 'Daarom heet A <b>dominant</b>: één exemplaar is al genoeg om het fenotype te bepalen.', n: '' },
    { t: 'En a heet <b>recessief</b>: je ziet het alleen als er géén A is, dus bij aa.', n: 'Een recessief allel kan dus generaties lang onzichtbaar meegaan (scherm 16).' },
    { t: 'Dominant betekent niet sterker en niet vaker. Het betekent alleen: één exemplaar is genoeg voor het fenotype.', n: 'A vecht niet tegen a. Voorbeelden: de ziekte van Huntington is dominant en zeldzaam; bloedgroep O is recessief en heel algemeen. Zie de briefing.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9), bruin = CAST.marieke.huid, wit = CAST.levi.huid;
    [['AA', bruin, 'pigment'], ['Aa', bruin, 'pigment'], ['aa', wit, 'geen pigment']].forEach(([g, kl, lab], i) => { const x = 380 + i * 580, a = s0 * S.on(0, 0.6, i * 0.15);
      allelChip(ctx, g, x, 225, a, { px: 54, acc: i < 2 && s1 > 0.01 ? 0 : -1 });
      if (i === 2 && s2 > 0.01) { ctx.save(); ctx.globalAlpha *= s2; roundRect(ctx, x - 74, 225 - 48, 148, 96, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 230, 300, 460, 200, 24); shape(ctx, kl, C.line, 2); ctx.restore(); regel(ctx, lab, x, 552, a, C.text, 34, 'center', 600); });
    if (s0 > 0.01) { const a = S.on(0, 0.6, 0.6); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(160, 580); ctx.quadraticCurveTo(160, 602, 190, 602); ctx.lineTo(1150, 602); ctx.quadraticCurveTo(1180, 602, 1180, 580); ctx.stroke(); ctx.restore(); regel(ctx, 'zelfde fenotype', 670, 648, a, C.goud, 34, 'center', 700); }
    termKaart(ctx, 'A dominant', 'één A is genoeg', 670, 680, s1, C.groen, 520); termKaart(ctx, 'a recessief', 'alleen zichtbaar bij aa', 1540, 680, s2, C.koraal, 520);
    misvatting(ctx, 'dominant = sterker of vaker', 'één exemplaar is genoeg voor het fenotype', 960, 838, 1120, s3, S.on(3, 0.6, 0.4));
  } });

// ---------- 12 · homozygoot, heterozygoot ----------
SCHERMEN.push({ titel: 'Homo- en heterozygoot', kop: 'Homozygoot en heterozygoot', deel: 'Gen en allel',
  stappen: [
    { t: 'Op elk paar chromosomen 11 liggen twee allelen voor tyrosinase.', n: 'Herhaling: één van de vader (teal), één van de moeder (oker).' },
    { t: 'Twee <b>dezelfde</b> allelen, AA of aa: <b>homozygoot</b>.', n: 'Homo = gelijk. AA: homozygoot dominant, aa: homozygoot recessief.' },
    { t: 'Twee <b>verschillende</b> allelen, Aa: <b>heterozygoot</b>.', n: 'Hetero = verschillend. Bij een recessieve aandoening noem je een heterozygoot ook wel drager.' },
    { t: 'Het dominante allel schrijf je met een <b>hoofdletter</b>, het recessieve met <b>dezelfde letter</b> als kleine letter.', n: 'Dus A en a, niet A en b. In Binas en in de toets: kies zelf een letter als die niet gegeven is, en zeg welke hoofdletter wat betekent.' }
  ],
  teken(ctx, S) {
    const s0 = S.on(0, 0.9), s1 = S.on(1, 0.9), s2 = S.on(2, 0.9), s3 = S.on(3, 0.9);
    [['AA', 'A', 'A'], ['Aa', 'A', 'a'], ['aa', 'a', 'a']].forEach(([g, l1, l2], i) => { const x = 380 + i * 580, a = s0 * S.on(0, 0.6, i * 0.15), hl = i === 1 ? s2 : s1;
      if (hl > 0.01) { paneel(ctx, x - 250, 190, 500, 640, hl, i === 1 ? C.teal : C.goud); regel(ctx, i === 1 ? 'heterozygoot' : 'homozygoot', x, 250, hl, i === 1 ? C.teal : C.goud, 40, 'center', 700); }
      paar(ctx, x, 470, 370, { allelen: [l1, l2], dubbel: 0, a, w: 50, dx: 85 });
      allelChip(ctx, g, x, 760, a, { px: 54 }); });
    if (s3 > 0.01) { ctx.save(); ctx.globalAlpha *= s3; roundRect(ctx, 330, 865, 1260, 120, 20); shape(ctx, rgba(C.fill, C.licht ? 0.5 : 0.4), rgba(C.line, 0.5), 2); ctx.restore();
      regel(ctx, 'A', 480, 947, s3, C.text, 66, 'center', 700); regel(ctx, 'dominant', 530, 942, s3, C.text, 36, 'left', 600);
      regel(ctx, 'a', 1030, 944, s3, C.text, 66, 'center', 700); regel(ctx, 'recessief, zelfde letter', 1080, 942, s3, C.text, 36, 'left', 600); }
  } });

// ---------- 13 · genotype én milieu ----------
SCHERMEN.push({ titel: 'Genotype en milieu', kop: 'Genotype én milieu', deel: 'Genotype en milieu',
  stappen: [
    { t: 'Twee armen met <b>hetzelfde</b> genotype.', n: 'Bijvoorbeeld twee keer AA. Denk aan iemand die een zomer lang met één arm uit het autoraam hangt.' },
    { t: 'Deze arm is in de zon geweest. UV-licht zet de pigmentcellen aan om <b>meer</b> melanine te maken: de huid wordt bruiner.', n: 'UV is de belangrijkste prikkel voor pigment in de huid. Ook de huidcellen eromheen reageren op UV en geven signalen aan de pigmentcellen, die dan meer tyrosinase-activiteit krijgen.' },
    { t: 'Het fenotype ontstaat uit het genotype én invloeden uit de omgeving: het <b>milieu</b>.', n: 'Milieu = alles van buiten de genen: zon, voeding, temperatuur, oefening. Ander voorbeeld: lengte (aanleg én voeding). Vwo: het Himalayakonijn op het volgende scherm.' },
    { t: 'Maar het milieu werkt alleen met wat de genen mogelijk maken. Bij <b>aa</b> komt er geen pigment, hoeveel zon er ook is.', n: 'Daarom moeten mensen met albinisme zich extra goed beschermen tegen de zon: hun huid verbrandt snel en krijgt makkelijker huidkanker.' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 2.0), s2 = S.on(2, 0.8), s3 = S.on(3, 1.2), base = CAST.marieke.huid, wit = CAST.levi.huid;
    const kol = [[110, base, 'AA', 0, s0], [700, mix(base, '#3A2214', 0.32 * s1), 'AA', s1, s0], [1290, wit, 'aa', s3, s3]];
    kol.forEach(([x, kl, g, zon, a], i) => { if (a <= 0.01) return; L1_arm(ctx, x + 20, 300, 470, kl, a); allelChip(ctx, g, x + 260, 435, a, { px: 46 });
      if (zon > 0.01) { L1_zon(ctx, x + 450, 210, 32, zon, T); [[-80, 0], [-30, 25], [20, 45]].forEach(([dx, dy], k) => L1_uv(ctx, x + 410 + dx * 0.3, 245 + dy * 0.2, x + 190 + dx * 2, 275, clamp(zon * 1.6 - k * 0.2, 0, 1), a, T)); }
      const mel = i === 0 ? 0.45 : i === 1 ? 0.45 + 0.55 * s1 : 0;
      L1_pigmentcel(ctx, x + 260, 680, 120, { a, mel, enz: (i === 2 ? [{ dx: -0.55, dy: -0.2, kapot: true }, { dx: 0.55, dy: -0.2, kapot: true }] : [{ dx: -0.55, dy: -0.2 }, { dx: 0.55, dy: -0.2 }]).concat(i === 1 && s1 > 0.5 ? [{ dx: 0, dy: 0.62, a: ease((s1 - 0.5) * 2) }] : []), enzS: 0.2, dend: [[-2.4, 0.9], [-1.6, 1.0], [-0.75, 0.9], [2.7, 0.7], [0.4, 0.7]] });
      regel(ctx, i === 0 ? 'geen zon' : 'zon', x + 260, 870, a, C.text2, 32, 'center', 600); });
    if (s3 > 0.01) kruis(ctx, 1290 + 420, 620, 24, S.on(3, 0.5, 0.8));
    balk(ctx, 'fenotype = genotype + milieu', 960, 952, 900, s2, C.goud, 42);
  } });

// ---------- 13b · warm en koud (vwo) ----------
SCHERMEN.push({ titel: 'Warm en koud', kop: 'Het Himalayakonijn', deel: 'Genotype en milieu',
  stappen: [
    { vwo: true, t: 'Een <b>Himalayakonijn</b> is wit, met donkere oren, snuit, poten en staart.', n: 'Ook bij siamese katten (de "points"). Het konijn heeft roze ogen: in het oog is ook bijna geen pigment.' },
    { vwo: true, t: 'Het heeft een allel voor tyrosinase dat alleen werkt bij een <b>lage temperatuur</b>. Alleen in de koele uiteinden komt pigment.', n: 'Een konijn dat warm (± 30 °C) opgroeit, krijgt geen donkere plekken; bij ± 25 °C of koeler wel. Zelfde genotype, ander milieu, ander fenotype. Bij siamese katten: TYR-variant die gevoelig is voor temperatuur (Lyons e.a. 2005).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.0), kx = 760, ky = 940, sc = 2.1;
    if (s1 > 0.01) { gloed(ctx, kx - 92, ky - 235, 360, C.koraal, s1 * 0.8); [[kx + 92 * sc * 0.9, ky - 420 * 1.2], [kx + 175 * sc, ky - 146 * sc], [kx - 160 * sc, ky - 108 * sc], [kx - 112 * sc, ky - 22 * sc], [kx + 72 * sc, ky - 12 * sc]].forEach(([x, y]) => gloed(ctx, x, y, 140, C.teal, s1 * 0.9)); }
    L1_konijn(ctx, kx, ky, sc, s0);
    naam(ctx, 'Himalayakonijn', kx - 40, ky + 50, s0 * (1 - s1), 'center', C.text, 30);
    regel(ctx, 'warm', kx - 110, ky - 220, s1, C.koraal, 40, 'center', 700); regel(ctx, 'koel', kx + 340, ky - 520, s1, C.teal, 40, 'center', 700);
    if (s1 > 0.01) { const a = S.on(1, 0.6, 0.6); paneel(ctx, 1380, 300, 440, 420, a);
      regel(ctx, 'koel', 1490, 370, a, C.teal, 32, 'center', 700); L1_enzym(ctx, 1490, 470, 46, { a }); vink(ctx, 1490, 580, 20, a);
      regel(ctx, 'warm', 1710, 370, a, C.koraal, 32, 'center', 700); L1_enzym(ctx, 1710, 470, 46, { a, kapot: true }); kruis(ctx, 1710, 580, 18, a);
      regel(ctx, 'tyrosinase', 1600, 680, a, C.text2, 28, 'center', 600); }
  } });

// ---------- 14 · terug naar de familie ----------
SCHERMEN.push({ titel: 'Terug naar de familie', kop: 'Waar komt Levi\'s albinisme vandaan?', deel: 'Terug naar de familie',
  stappen: [
    { t: 'Dennis en Marieke hebben allebei gewoon pigment. Maar allebei zijn ze <b>Aa</b>.', n: 'Het allel a is er wel, je ziet het niet: één A is genoeg.' },
    { t: 'Elk kind krijgt van elk chromosoompaar <b>één</b> chromosoom van de vader en één van de moeder.', n: 'Welke van de twee, is per kind en per paar toeval (les 2: meiose en het kruisingsschema).' },
    { t: 'Levi kreeg van allebei het chromosoom met <b>a</b>. Hij is <b>aa</b>: geen werkend tyrosinase, dus albinisme.', n: 'Vraag uit de film: kunnen twee ouders die allebei Aa zijn, een kind krijgen met albinisme? (a nee · b alleen als een opa of oma het had · c ja, als het van allebei een a krijgt). Sara en Jens: welke genotypen kunnen zij hebben? Dat rekenen we uit in les 2; laat het hier open.' },
    { t: 'Het allel a was nooit weg. Het zat al generaties lang verborgen, steeds naast een A.', n: 'Dennis heeft zijn a van zijn vader of zijn moeder: minstens één van Opa Frank en Oma Lucia is drager. Net zo is minstens één van Opa Wim en Oma Anja drager. Wie, weten we niet. Voor alle vormen van albinisme samen is ongeveer 1 op de 70 mensen drager (briefing).' }
  ],
  teken(ctx, S) {
    const T = S.T, s0 = S.on(0, 0.9), s1 = S.on(1, 1.8), s2 = S.on(2, 1.0), s3 = S.on(3, 0.8), VL = 960, hD = 600, hM = 580;
    pers(ctx, 'dennis', 220, VL, hD, { t: T, uit: 'blij', kijk: 1, a: s0 }); pers(ctx, 'marieke', 1700, VL, hM, { t: T + 1, uit: 'blij', kijk: -1, a: s0 });
    allelChip(ctx, 'Aa', 220, VL - hD * 1.04 - 52, s0, { px: 46, kl: CH.vader }); allelChip(ctx, 'Aa', 1700, VL - hM * 0.97 - 52, s0, { px: 46, kl: CH.moeder });
    naam(ctx, 'Dennis', 220, VL + 40, s0, 'center', C.text2, 30); naam(ctx, 'Marieke', 1700, VL + 40, s0, 'center', C.text2, 30);
    const cx = 960, cy = 440, cr = 175, kr = 118;
    cel(ctx, cx, cy, cr * 1.15, cr, s1, { kl: C.oker, geenKern: true }); L1_kern(ctx, cx, cy, kr, s1);
    naam(ctx, 'cel van Levi', cx, cy - cr - 22, s1 * (1 - s3), 'center', C.text, 32);
    const L = 300, cen = 0.39, ui = ease(clamp(s1 * 1.25 - 0.25, 0, 1));
    const chr = (x0, y0, kl, l, links, beweeg) => { const naarL = kl === CH.vader; if (beweeg && ui > 0.5) links = naarL; const x = beweeg ? lerp(x0, cx + (naarL ? -38 : 38), ui) : x0, y = beweeg ? lerp(y0, cy + 8, ui) : y0, len = beweeg ? lerp(L, 160, ui) : L;
      chromosoom(ctx, x, y, len, { kl, w: beweeg ? lerp(42, 28, ui) : 42, cen, dubbel: 0, a: s0, banden: [{ p: 0.68, kl: C.goud, letter: l, px: beweeg ? lerp(48, 34, ui) : 48 }], letterLinks: links }); };
    chr(480, 670, CH.vader, 'A', true, false); chr(590, 670, CH.vader, 'a', false, true);
    chr(1330, 670, CH.moeder, 'a', true, true); chr(1440, 670, CH.moeder, 'A', false, false);
    regel(ctx, '11', 535, 905, s0, C.text2, 30, 'center', 600); regel(ctx, '11', 1385, 905, s0, C.text2, 30, 'center', 600);
    allelChip(ctx, 'aa', cx - 160, VL - 300, s2, { px: 52, kl: C.koraal });
    pers(ctx, 'levi', cx, VL, 360, { t: T + 2, uit: 'blij', a: s2 * S.on(2, 0.6, 0.3) }); naam(ctx, 'Levi', cx, VL + 40, s2, 'center', C.text2, 30);
    L1_enzym(ctx, cx + 300, cy + 40, 36, { kapot: true, a: s2 }); kruis(ctx, cx + 345, cy - 10, 14, s2);
    balk(ctx, 'a zat verborgen, steeds naast een A', 960, 205, 900, s3, C.goud, 38);
  } });

// ---------- 15 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Eén van je vader, één van je moeder', deel: 'Afsluiting',
  stappen: [
    { t: '<b>46</b> chromosomen in <b>23 paren</b>: van elk paar één van je vader en één van je moeder.', n: 'Terug naar puzzel 1: je bent geen gemiddelde. Van elk gen krijg je één allel van elke ouder; welke, verschilt per kind. Daarom lijken broers en zussen op elkaar zonder hetzelfde te zijn.' },
    { t: 'Een <b>gen</b> is het onderwerp, een <b>allel</b> de versie. Van elk gen heb je er twee.', n: '' },
    { t: 'Het genotype bepaalt samen met het milieu het fenotype. A is dominant, a recessief.', n: 'Terug naar puzzel 2: twee ouders met Aa kunnen een kind met aa krijgen. Hoe groot die kans is, reken je in les 2 uit.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['46 = 23 paren', C.teal, ['één van vader, één van moeder', 'n = 23 · 2n = 46', 'vrouw XX · man XY']], ['gen en allel', C.goud, ['gen = onderwerp (welk eiwit)', 'allel = versie', 'twee allelen per gen']], ['genotype → fenotype', C.groen, ['AA · Aa · aa', 'A dominant, a recessief', '+ milieu (zon)']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) paar(ctx, x + 270, 450, 230, { a, w: 38, dx: 58 });
      if (i === 1) paar(ctx, x + 270, 450, 230, { a, w: 38, dx: 70, allelen: ['A', 'a'], dubbel: 0 });
      if (i === 2) { allelChip(ctx, 'Aa', x + 110, 450, a, { px: 48 }); pijl(ctx, x + 180, 450, x + 250, 450, C.text2, 5, a); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x + 270, 390, 160, 120, 18); shape(ctx, CAST.marieke.huid, C.line, 2); ctx.restore(); L1_zon(ctx, x + 475, 350, 20, a, T); }
      regels.forEach((r, k) => regel(ctx, r, x + 30, 670 + k * 70, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 16 · volgende keer ----------
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 2): <b>kruisen en tellen</b>. Hoe groot is de kans dat een kind van Dennis en Marieke aa is?', n: 'Huiswerk: film 1 (Chromosomen) nog eens kijken en de opdrachten eronder; wie vooruit wil, kijkt film 2 (Monohybride kruisingen).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Kruisen en tellen', [['Mendels erwten', 'kruisingsschema · 3 : 1', L1_icoonErwt], ['Intermediair', 'en bloedgroepen', L1_icoonBloed], ['Jongen of meisje', 'en kleurenblind (X)', L1_icoonXY]]); } });
