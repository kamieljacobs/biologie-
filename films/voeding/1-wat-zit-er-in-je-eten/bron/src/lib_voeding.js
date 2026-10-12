// ===== Reeks Voeding: seriebibliotheek (vastgelegd in film 1) =====
// Kleuren: voedsel en voedingsstoffen oker, drie tinten (koolhydraat licht, eiwit midden, vet donker) + eigen vorm.
const V = {
  kh: '#DCC07F',      // koolhydraat: lichte oker, zeshoek
  ew: '#C9A35C',      // eiwit: oker, kraal
  vt: '#9C7A3C',      // vet: donkere oker, E-vorm
  vtR: '#C9A35C',
  vezel: '#7FC48F',   // cellulose/vezel: groen (plant)
  neutraal: '#AFC0D0',// mineralen, vitaminen, gal, glas, darmwand
  melk: '#E6E1D3',    // melk als vlak (neutraal licht)
  essentieel: '#E0B64A'
};

// --- moleculen (Micro) ---
function hexagon(ctx, x, y, r, fill, stroke, lw = 1.3, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) { const a = rot + Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, fill, stroke, lw);
}
// keten van suikers langs x; cut = array van indices waarachter de keten geknipt is (spreidt de stukken), sep = 0..1
function sugarChain(ctx, x, y, n, r = 14, opts = {}) {
  const { fill = V.kh, alpha = 1, cut = null, sep = 0, angle = 0, wobble = 0, t = 0, seed = 0 } = opts;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(angle);
  const step = r * 2.25; const pos = [];
  let off = 0;
  for (let i = 0; i < n; i++) {
    if (cut && cut.includes(i - 1)) off += sep * r * 3;
    const w = wobble ? wander(i + seed * 31, t, wobble, 0.7) : { x: 0, y: 0 };
    pos.push([i * step + off + w.x * (cut ? sep : 1), w.y * (cut ? sep : 1) + Math.sin(i * 0.9 + seed) * r * 0.25]);
  }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  for (let i = 1; i < n; i++) { if (cut && cut.includes(i - 1) && sep > 0.05) continue; ctx.beginPath(); ctx.moveTo(pos[i - 1][0] + r * 0.8, pos[i - 1][1]); ctx.lineTo(pos[i][0] - r * 0.8, pos[i][1]); ctx.stroke(); }
  pos.forEach(p => hexagon(ctx, p[0], p[1], r, fill, lighten(fill, 0.35)));
  ctx.restore();
  return pos.map(p => [x + p[0] * Math.cos(angle) - p[1] * Math.sin(angle), y + p[0] * Math.sin(angle) + p[1] * Math.cos(angle)]);
}
// vertakte keten (glycogeen): boom van zeshoeken
function glycogen(ctx, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; const r = 9 * s;
  const branches = [[0, 0, 0, 7], [3, 0, -0.6, 5], [5, 0, 0.6, 4], [2, 1, -0.7, 3], [3, 2, 0.7, 3]];
  const pts = [];
  // trunk
  let tr = []; for (let i = 0; i < 7; i++) tr.push([x + i * r * 2.2, y]); pts.push(tr);
  const b1 = []; for (let i = 1; i <= 5; i++) b1.push([x + 3 * r * 2.2 + i * r * 1.6, y - i * r * 1.6]); pts.push(b1);
  const b2 = []; for (let i = 1; i <= 4; i++) b2.push([x + 5 * r * 2.2 + i * r * 1.6, y + i * r * 1.6]); pts.push(b2);
  const b3 = []; for (let i = 1; i <= 3; i++) b3.push([b1[1][0] + i * r * 2, b1[1][1] - i * r * 0.1 - r * 0.3]); pts.push(b3);
  const b4 = []; for (let i = 1; i <= 3; i++) b4.push([x + r * 2.2 + i * r * 1.5, y + i * r * 1.6]); pts.push(b4);
  ctx.strokeStyle = lighten(V.kh, 0.3); ctx.lineWidth = 1.6;
  pts.forEach(br => { ctx.beginPath(); br.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); });
  pts.forEach(br => br.forEach(p => hexagon(ctx, p[0], p[1], r, V.kh, lighten(V.kh, 0.35), 1.1)));
  ctx.restore();
}
// 20 aminozuren: kralen in oker-tinten met vier vormen; essentieel = gouden rand (alleen waar het verteld wordt)
const AA_ESS = [0, 2, 4, 6, 9, 11, 13, 15, 18]; // negen soorten die het verhaal "essentieel" noemt (schematisch)
function bead(ctx, x, y, r, kind, opts = {}) {
  const { alpha = 1, ess = false, dimNonEss = false, lab = null } = opts;
  ctx.save(); ctx.globalAlpha *= alpha * (dimNonEss && !AA_ESS.includes(kind) ? 0.35 : 1);
  const tint = [0.0, 0.18, 0.36, -0.12][kind % 4]; const fill = tint >= 0 ? lighten(V.ew, tint) : '#A8854A';
  const form = Math.floor(kind / 4) % 5; const stroke = ess && AA_ESS.includes(kind) ? C.goud : lighten(V.ew, 0.45); const lw = ess && AA_ESS.includes(kind) ? 2.4 : 1.2;
  ctx.beginPath();
  if (form === 0) ctx.arc(x, y, r, 0, 6.283);
  else if (form === 1) roundRect(ctx, x - r * 0.9, y - r * 0.9, r * 1.8, r * 1.8, r * 0.45);
  else if (form === 2) { ctx.moveTo(x, y - r * 1.05); ctx.lineTo(x + r, y + r * 0.8); ctx.lineTo(x - r, y + r * 0.8); ctx.closePath(); }
  else if (form === 3) { ctx.moveTo(x, y - r * 1.1); ctx.lineTo(x + r * 1.05, y); ctx.lineTo(x, y + r * 1.1); ctx.lineTo(x - r * 1.05, y); ctx.closePath(); }
  else { ctx.ellipse(x, y, r * 1.2, r * 0.8, 0, 0, 6.283); }
  shape(ctx, fill, stroke, lw);
  if (lab) text(ctx, lab, x, y + 6, fMeta(28), C.bgMicro, 'center');
  ctx.restore();
}
// eiwitketen langs een pad van punten; kinds per kraal
function proteinChain(ctx, pts, kinds, r = 12, opts = {}) {
  const { alpha = 1, ess = false, upto = pts.length } = opts;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2;
  ctx.beginPath(); for (let i = 0; i < Math.min(upto, pts.length); i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke();
  for (let i = 0; i < Math.min(upto, pts.length); i++) bead(ctx, pts[i][0], pts[i][1], r, kinds[i % kinds.length], { ess });
  ctx.restore();
}
function coilPath(x, y, n, step = 26, amp = 40, freq = 0.55) { const p = []; for (let i = 0; i < n; i++) p.push([x + i * step, y + Math.sin(i * freq) * amp + Math.sin(i * freq * 2.3) * amp * 0.3]); return p; }
// vetzuur: zigzag-staart
function fattyAcid(ctx, x, y, len, s = 1, alpha = 1, color = V.vt) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = lighten(color, 0.35); ctx.lineWidth = 5 * s; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); const n = Math.round(len / (12 * s)); for (let i = 0; i <= n; i++) { const px = x + i * 12 * s, py = y + (i % 2 ? 6 : -6) * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = 2.5 * s; ctx.stroke(); ctx.restore();
}
// triglyceride: glycerol (staafje met drie knoppen) + drie vetzuren; spread 0..1 laat de vetzuren loskomen (lipase, film 3)
function triglyceride(ctx, x, y, s = 1, alpha = 1, spread = 0) {
  ctx.save(); ctx.globalAlpha *= alpha;
  roundRect(ctx, x - 9 * s, y - 34 * s, 18 * s, 68 * s, 8 * s); shape(ctx, V.vt, lighten(V.vt, 0.4), 1.3);
  [-24, 0, 24].forEach((dy, i) => { const sx = spread * 30 * s * (1 + i * 0.4), sy = spread * (i - 1) * 20 * s; fattyAcid(ctx, x + 12 * s + sx, y + dy * s + sy, 120 * s, s); });
  ctx.restore();
}
function waterMol(ctx, x, y, r = 7, alpha = 1) { // O met twee H, teal
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  ctx.fillStyle = lighten(C.teal, 0.45); ctx.beginPath(); ctx.arc(x - r * 0.9, y + r * 0.7, r * 0.55, 0, 6.283); ctx.arc(x + r * 0.9, y + r * 0.7, r * 0.55, 0, 6.283); ctx.fill(); ctx.restore();
}
function mineral(ctx, x, y, r = 8, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 2); shape(ctx, rgba(V.neutraal, 0.8), lighten(V.neutraal, 0.4), 1); ctx.restore(); }
function vitamin(ctx, x, y, r = 9, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 1.2566; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(V.neutraal, 0.25), V.neutraal, 1.4); ctx.restore(); }
function fiber(ctx, x, y, n = 8, r = 11, alpha = 1, angle = 0) { // cellulose: rechte keten, groen
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(angle);
  ctx.strokeStyle = lighten(V.vezel, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo((n - 1) * r * 2.2, 0); ctx.stroke();
  for (let i = 0; i < n; i++) hexagon(ctx, i * r * 2.2, (i % 2 ? 2 : -2), r, rgba(V.vezel, 0.75), lighten(V.vezel, 0.3), 1.1, i % 2 ? 0.5 : 0);
  ctx.restore();
}

// --- Schema: de maaltijd (rode draad) ---
function broodje(ctx, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha;
  // onderste helft
  roundRect(ctx, x - 120 * s, y - 6 * s, 240 * s, 46 * s, 22 * s); shape(ctx, '#B98F4E', lighten('#B98F4E', 0.35), 1.2);
  // kaas (lichter, gaatjes)
  ctx.beginPath(); ctx.moveTo(x - 132 * s, y - 8 * s); ctx.lineTo(x + 132 * s, y - 8 * s); ctx.lineTo(x + 118 * s, y + 10 * s); ctx.lineTo(x - 118 * s, y + 10 * s); ctx.closePath(); shape(ctx, V.kh, lighten(V.kh, 0.35), 1.2);
  // bovenste helft
  ctx.beginPath(); ctx.moveTo(x - 124 * s, y - 10 * s); ctx.bezierCurveTo(x - 120 * s, y - 92 * s, x + 120 * s, y - 92 * s, x + 124 * s, y - 10 * s); ctx.closePath(); shape(ctx, '#C9A35C', lighten('#C9A35C', 0.35), 1.2);
  ctx.fillStyle = rgba(C.bgSchema, 0.35); [[-50, -50], [10, -62], [60, -44], [-10, -36]].forEach(p => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 6 * s, 3 * s, 0.3, 0, 6.283); ctx.fill(); });
  ctx.restore();
}
function glasMelk(ctx, x, y, s = 1, alpha = 1, level = 0.8) {
  ctx.save(); ctx.globalAlpha *= alpha; const w = 90 * s, h = 150 * s;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w * 0.4, y); ctx.lineTo(x + w * 0.4, y); ctx.lineTo(x + w / 2, y - h);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(V.melk, 0.9); ctx.fillRect(x - w, y - h * level, 2 * w, h * level); ctx.restore();
  ctx.strokeStyle = V.neutraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}
function plateLine(ctx, x0, x1, y, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// voedingsmiddel-iconen (Schema, oker met lichte rand)
function foodIcon(ctx, kind, x, y, s = 1, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; const st = (c) => lighten(c, 0.35);
  if (kind === 'vlees') { blob(ctx, x, y, 50 * s, 30 * s, 0.12, 3); shape(ctx, '#B07A4E', st('#B07A4E'), 1.2); ctx.strokeStyle = rgba(V.melk, 0.5); ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x - 10 * s, y, 14 * s, 0.5, 4); ctx.stroke(); }
  else if (kind === 'kaas') { ctx.beginPath(); ctx.moveTo(x - 50 * s, y + 26 * s); ctx.lineTo(x + 50 * s, y + 26 * s); ctx.lineTo(x + 50 * s, y - 6 * s); ctx.lineTo(x - 50 * s, y - 30 * s); ctx.closePath(); shape(ctx, V.kh, st(V.kh), 1.2); ctx.fillStyle = rgba(C.bgSchema, 0.35); [[-20, 4], [14, 10], [30, -2]].forEach(p => { ctx.beginPath(); ctx.arc(x + p[0] * s, y + p[1] * s, 6 * s, 0, 6.283); ctx.fill(); }); }
  else if (kind === 'melk') { glasMelk(ctx, x, y + 40 * s, 0.55 * s); }
  else if (kind === 'brood') { roundRect(ctx, x - 50 * s, y - 34 * s, 100 * s, 64 * s, 26 * s); shape(ctx, '#B98F4E', st('#B98F4E'), 1.2); ctx.strokeStyle = rgba(C.bgSchema, 0.4); ctx.lineWidth = 2; [-20, 0, 20].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d * s - 8 * s, y - 24 * s); ctx.lineTo(x + d * s + 8 * s, y - 12 * s); ctx.stroke(); }); }
  else if (kind === 'bonen') { [[-24, 6], [0, -8], [22, 8], [-6, 18], [16, -14]].forEach((p, i) => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 15 * s, 10 * s, i * 0.7, 0, 6.283); shape(ctx, '#B98A5A', st('#B98A5A'), 1); }); }
  else if (kind === 'tofu') { roundRect(ctx, x - 40 * s, y - 26 * s, 80 * s, 52 * s, 6 * s); shape(ctx, '#E2D6B4', st('#E2D6B4'), 1.2); }
  else if (kind === 'blikje') { roundRect(ctx, x - 22 * s, y - 40 * s, 44 * s, 80 * s, 8 * s); shape(ctx, C.fill, V.neutraal, 1.5); ctx.strokeStyle = V.neutraal; ctx.beginPath(); ctx.moveTo(x - 22 * s, y - 28 * s); ctx.lineTo(x + 22 * s, y - 28 * s); ctx.stroke(); }
  ctx.restore();
}
// het melketiket (per 100 ml halfvolle melk); hl = index van oplichtende rij
const ETIKET = [['Energie', '195 kJ / 46 kcal'], ['Vet', '1,5 g'], ['Koolhydraten', '4,7 g'], ['Eiwit', '3,5 g'], ['Zout', '0,1 g'], ['Calcium', '120 mg']];
function etiket(ctx, x, y, w, alpha = 1, hl = [], title = 'Voedingswaarde per 100 ml') {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const rh = 56, h = 80 + ETIKET.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.2);
  text(ctx, title, x + 24, y + 50, fTekst(36, 600), C.text);
  ETIKET.forEach((r, i) => { const yy = y + 80 + i * rh; const on = hl.includes(i);
    if (on) { roundRect(ctx, x + 10, yy + 4, w - 20, rh - 8, 8); ctx.fillStyle = rgba(C.goud, 0.14); ctx.fill(); }
    ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 16, yy); ctx.lineTo(x + w - 16, yy); ctx.stroke();
    text(ctx, r[0], x + 24, yy + 38, fTekst(36, on ? 600 : 400), on ? C.text : C.text2); text(ctx, r[1], x + w - 24, yy + 38, fTekst(36, on ? 600 : 400), on ? C.goud : C.text, 'right'); });
  ctx.restore(); return h;
}

// --- zes groepen + vier taken (Schema-bord, vaste vorm) ---
const GROEPEN = ['koolhydraten', 'eiwitten', 'vetten', 'water', 'mineralen', 'vitaminen'];
function groepIcon(ctx, i, x, y, s = 1) {
  if (i === 0) sugarChain(ctx, x - 26 * s, y, 3, 11 * s);
  else if (i === 1) proteinChain(ctx, [[x - 30 * s, y], [x - 10 * s, y - 8 * s], [x + 10 * s, y], [x + 30 * s, y - 8 * s]], [0, 5, 9, 14], 9 * s);
  else if (i === 2) triglyceride(ctx, x - 26 * s, y, 0.45 * s);
  else if (i === 3) { waterMol(ctx, x - 12 * s, y, 8 * s); waterMol(ctx, x + 14 * s, y - 6 * s, 8 * s); }
  else if (i === 4) { mineral(ctx, x - 12 * s, y, 8 * s); mineral(ctx, x + 12 * s, y - 4 * s, 7 * s); }
  else { vitamin(ctx, x - 10 * s, y, 10 * s); vitamin(ctx, x + 14 * s, y - 6 * s, 8 * s); }
}
function groepenBord(ctx, x, y, w, lit, alpha = 1) { // lit: array 0..1 per groep
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const cw = (w - 5 * 14) / 6, ch = 150;
  GROEPEN.forEach((g, i) => { const xx = x + i * (cw + 14); const u = lit[i] || 0;
    roundRect(ctx, xx, y, cw, ch, 12); ctx.fillStyle = rgba(C.fill, 0.55 + 0.35 * u); ctx.fill(); ctx.strokeStyle = u > 0.5 ? C.goud : rgba(C.line, 0.5); ctx.lineWidth = u > 0.5 ? 1.8 : 1; ctx.stroke();
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * u; groepIcon(ctx, i, xx + cw / 2, y + 58, 1); ctx.restore();
    text(ctx, g, xx + cw / 2, y + 126, fTekst(36, u > 0.5 ? 600 : 400), u > 0.5 ? C.text : C.text2, 'center'); });
  ctx.restore();
}
const TAKEN = [['bouwstof', 'maken, herstellen'], ['brandstof', 'energie leveren'], ['reservestof', 'energie bewaren'], ['regelstof', 'processen regelen']];
const TAAK_KLEUR = [V.neutraal, C.koraal, C.oker, C.teal];
function taakIcon(ctx, i, x, y, s = 1, col) {
  ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = rgba(col, 0.25); ctx.lineWidth = 2;
  if (i === 0) { for (let r = 0; r < 3; r++) for (let c = 0; c < 3 - (r % 2); c++) { roundRect(ctx, x - 30 * s + c * 22 * s + (r % 2) * 11 * s, y + 10 * s - r * 13 * s, 20 * s, 11 * s, 2); ctx.fill(); ctx.stroke(); } }
  else if (i === 1) { ctx.beginPath(); ctx.moveTo(x, y - 26 * s); ctx.bezierCurveTo(x + 22 * s, y - 6 * s, x + 18 * s, y + 18 * s, x, y + 20 * s); ctx.bezierCurveTo(x - 18 * s, y + 18 * s, x - 22 * s, y - 2 * s, x - 6 * s, y - 10 * s); ctx.bezierCurveTo(x - 4 * s, y - 2 * s, x + 2 * s, y - 14 * s, x, y - 26 * s); ctx.fill(); ctx.stroke(); }
  else if (i === 2) { roundRect(ctx, x - 26 * s, y - 16 * s, 48 * s, 32 * s, 5); ctx.stroke(); roundRect(ctx, x + 22 * s, y - 7 * s, 6 * s, 14 * s, 2); ctx.stroke(); roundRect(ctx, x - 22 * s, y - 12 * s, 28 * s, 24 * s, 3); ctx.fill(); }
  else { ctx.beginPath(); ctx.arc(x, y, 22 * s, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 14 * s, y - 12 * s); ctx.stroke(); for (let k = 0; k < 5; k++) { const a = Math.PI + k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 16 * s, y + Math.sin(a) * 16 * s); ctx.lineTo(x + Math.cos(a) * 21 * s, y + Math.sin(a) * 21 * s); ctx.stroke(); } }
  ctx.restore();
}
function takenRij(ctx, x, y, w, lit, alpha = 1) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha;
  const cw = (w - 3 * 18) / 4, ch = 128;
  TAKEN.forEach((tk, i) => { const xx = x + i * (cw + 18); const u = lit[i] || 0; const col = TAAK_KLEUR[i];
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * u;
    roundRect(ctx, xx, y, cw, ch, 12); shape(ctx, rgba(C.fill, 0.7), u > 0.5 ? col : rgba(C.line, 0.5), u > 0.5 ? 1.8 : 1);
    taakIcon(ctx, i, xx + 46, y + 46, 0.8, col);
    text(ctx, tk[0], xx + 86, y + 58, fTekst(36, 600), C.text); metaText(ctx, tk[1], xx + 22, y + 104, C.grain, 'left', 28);
    ctx.restore(); });
  ctx.restore();
}
// verbindingslijn tussen twee punten met pijlpunt (Schema)
function arrow(ctx, x0, y0, x1, y1, color = C.line, alpha = 1, lw = 1.5) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const a = Math.atan2(y1 - y0, x1 - x0);
  ctx.beginPath(); ctx.moveTo(x1 - Math.cos(a - 0.45) * 14, y1 - Math.sin(a - 0.45) * 14); ctx.lineTo(x1, y1); ctx.lineTo(x1 - Math.cos(a + 0.45) * 14, y1 - Math.sin(a + 0.45) * 14); ctx.stroke(); ctx.restore();
}
// staaf (Schema-grafiek) — waarde v op schaal max, hoogte hmax
function bar(ctx, x, yBase, w, hmax, v, max, color, label, valLabel, u = 1, alpha = 1) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; const h = hmax * v / max * clamp(u, 0, 1);
  roundRect(ctx, x, yBase - h, w, Math.max(h, 1), 6); shape(ctx, rgba(color, 0.55), color, 1.5);
  if (label) text(ctx, label, x + w / 2, yBase + 44, fTekst(36, 600), C.text, 'center');
  if (valLabel && u > 0.6) text(ctx, valLabel, x + w / 2, yBase - h - 16, fTekst(36, 600), color, 'center');
  ctx.restore();
}
function axisBase(ctx, x0, x1, y, alpha = 1) { plateLine(ctx, x0, x1, y, alpha); }

// --- darmbuis (Schema): wand met kringspieren; squeeze(x) 0..1 = vernauwing op positie x ---
function darmBuis(ctx, x0, x1, yc, r, squeeze = () => 0, alpha = 1, label = null) {
  ctx.save(); ctx.globalAlpha *= alpha; const n = 120;
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; const k = 1 - 0.55 * squeeze(x); top.push([x, yc - r * k]); bot.push([x, yc + r * k]); }
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  ctx.fillStyle = rgba(C.fill, 0.5); ctx.fill();
  ctx.strokeStyle = V.neutraal; ctx.lineWidth = 3; ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.beginPath(); bot.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  // kringspieren als korte dwarsstreepjes in de wand
  ctx.strokeStyle = rgba(C.koraal, 0.6); ctx.lineWidth = 2;
  for (let i = 2; i < n; i += 4) { const k = squeeze(top[i][0]); ctx.globalAlpha = alpha * (0.35 + 0.65 * k); ctx.beginPath(); ctx.moveTo(top[i][0], top[i][1] - 4); ctx.lineTo(top[i][0], top[i][1] - 14); ctx.moveTo(bot[i][0], bot[i][1] + 4); ctx.lineTo(bot[i][0], bot[i][1] + 14); ctx.stroke(); }
  ctx.restore();
  if (label) metaText(ctx, label, x0, yc - r - 30, C.grain, 'left', 28);
}
// trekvogel als Schema-silhouet (geen oog-wit)
function birdIcon(ctx, x, y, s = 1, flap = 0, alpha = 1) {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = C.mens; ctx.strokeStyle = lighten(C.mens, 0.3); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(x, y, 46 * s, 16 * s, -0.08, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 44 * s, y - 10 * s, 12 * s, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + 54 * s, y - 10 * s); ctx.lineTo(x + 72 * s, y - 6 * s); ctx.lineTo(x + 54 * s, y - 4 * s); ctx.fill();
  const wy = -60 * s * Math.cos(flap); ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 6 * s); ctx.quadraticCurveTo(x - 10 * s, y + wy, x + 22 * s, y + wy * 0.9); ctx.lineTo(x + 14 * s, y - 6 * s); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 44 * s, y - 2 * s); ctx.lineTo(x - 70 * s, y - 14 * s); ctx.lineTo(x - 66 * s, y + 6 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(x + 48 * s, y - 12 * s, 2.2 * s, 0, 6.283); ctx.fill();
  ctx.restore();
}
// gewichtsblok voor vergelijking (Schema)
function weightBlock(ctx, x, yBase, w, h, color, label, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x, yBase - h, w, h, 10); shape(ctx, rgba(color, 0.4), color, 1.5); if (label) text(ctx, label, x + w / 2, yBase - h / 2 + 12, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
