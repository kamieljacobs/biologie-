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

// --- darmbuis (Schema, organisch): kronkelende buis met wand als weefselband; squeeze(x) 0..1 = vernauwing op positie x ---
// o: {meander (fractie van r), haustra 0..1 (uitstulpingen dikke darm), seed, kring (kringspierstreepjes tonen)}
function darmMid(x0, yc, r, x, m = 0.1, seed = 0) { return yc + Math.sin((x - x0) / 230 + seed) * r * m + Math.sin((x - x0) / 97 + seed * 2) * r * m * 0.3; }
function darmBuis(ctx, x0, x1, yc, r, squeeze = () => 0, alpha = 1, label = null, o = {}) {
  const { meander = 0.1, haustra = 0, seed = 0, kring = true } = o;
  ctx.save(); ctx.globalAlpha *= alpha; const n = Math.max(80, Math.round((x1 - x0) / 8));
  const top = [], bot = [], ltop = [], lbot = [];
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; const yc2 = darmMid(x0, yc, r, x, meander, seed);
    const hs = haustra ? 1 + haustra * 0.16 * Math.abs(Math.sin((x - x0) / (r * 0.85))) : 1;
    const org = 1 + 0.04 * Math.sin((x - x0) / 41 + seed) + 0.03 * Math.sin((x - x0) / 13 + seed);
    const k = (1 - 0.55 * squeeze(x)) * hs * org;
    top.push([x, yc2 - r * k]); bot.push([x, yc2 + r * k]); ltop.push([x, yc2 - r * k * 0.74]); lbot.push([x, yc2 + r * k * 0.74]); }
  const poly = (A, B) => { ctx.beginPath(); A.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = B.length - 1; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]); ctx.closePath(); };
  const line = (A) => { ctx.beginPath(); A.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  poly(top, bot); ctx.fillStyle = rgba(V.neutraal, 0.28); ctx.fill();            // wand (weefsel)
  poly(ltop, lbot); ctx.fillStyle = rgba(C.bgSchema, 0.85); ctx.fill(); ctx.fillStyle = rgba(C.fill, 0.55); ctx.fill(); // holte
  ctx.lineJoin = 'round'; ctx.strokeStyle = V.neutraal; ctx.lineWidth = 2.5; line(top); ctx.stroke(); line(bot); ctx.stroke();
  ctx.strokeStyle = rgba(V.neutraal, 0.45); ctx.lineWidth = 1.2; line(ltop); ctx.stroke(); line(lbot); ctx.stroke();
  if (kring) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.lineCap = 'round'; const ga = ctx.globalAlpha;
    for (let i = 2; i < n; i += 5) { const kk = squeeze(top[i][0]); ctx.globalAlpha = ga * (0.18 + 0.7 * kk);
      ctx.beginPath(); ctx.moveTo(top[i][0], lerp(top[i][1], ltop[i][1], 0.25)); ctx.lineTo(top[i][0], lerp(top[i][1], ltop[i][1], 0.8));
      ctx.moveTo(bot[i][0], lerp(bot[i][1], lbot[i][1], 0.25)); ctx.lineTo(bot[i][0], lerp(bot[i][1], lbot[i][1], 0.8)); ctx.stroke(); } }
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

// ===== vastgelegd in film 2: verteringskanaal =====
// Kleuren film 2: zuur = koraal; enzym = schaartje C.enzym; gal = neutraal; speeksel/water = teal; hormoon = goud; bloed = BLOED.
const BLOED = '#B5574A';
// --- lijnenkaart van het spijsverteringskanaal ---
const HALTES = [ // x, naam, rij (0 = onder de lijn, 1 = lager)
  [200, 'mond', 0], [420, 'slokdarm', 1], [640, 'maag', 0], [880, 'twaalfvingerige darm', 1],
  [1120, 'dunne darm', 0], [1340, 'blinde darm', 1], [1540, 'dikke darm', 0], [1740, 'endeldarm', 1]];
const KLIEREN = [ // x op de lijn, naam, hoogte-rij, uitlijning
  [200, 'speekselklieren', 0, 'center'], [640, 'maagklieren', 0, 'center'], [850, 'lever + galblaas', 1, 'right'],
  [930, 'alvleesklier', 0, 'left'], [1150, 'darmwand', 1, 'left']];
// o: {y, draw 0..1 (lijn tekenen), names 0..1, glands 0..1, pos (halte-index als kommagetal, positie broodje), cur (halte-index die oplicht), notes {idx: tekst}, notesA}
function kanaalKaart(ctx, o = {}) {
  const { y = 470, draw = 1, names = 1, glands = 0, pos = null, cur = -1, notes = null, notesA = 0, a = 1, dimOthers = 0 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const x0 = 140, x1 = 1800, xe = lerp(x0, x1, draw);
  ctx.lineCap = 'round'; ctx.strokeStyle = C.line; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xe, y); ctx.stroke();
  if (pos !== null) { const px = haltX(pos); ctx.strokeStyle = V.ew; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(Math.min(px, xe), y); ctx.stroke(); }
  // klieren als zijtakken omhoog
  if (glands > 0.01) KLIEREN.forEach(([kx, nm, row, al], i) => { const g = ease(glands * 1.6 - i * 0.15); if (g <= 0.01) return; const top = y - 120 - row * 70;
    ctx.save(); ctx.globalAlpha *= g; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kx, y - 8); ctx.lineTo(kx, top + 14); ctx.stroke();
    ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(kx, top, 12, 0, 6.283); ctx.fill();
    text(ctx, nm, kx + (al === 'left' ? 22 : al === 'right' ? -22 : 0), top - 24, fTekst(36, 600), C.text, al); ctx.restore(); });
  HALTES.forEach(([hx, nm, row], i) => { const ap = ramp(draw * 9, i + 0.6, 0.6); if (ap <= 0.01) return; const on = i === cur;
    const da = dimOthers && !on ? 1 - 0.6 * dimOthers : 1;
    ctx.save(); ctx.globalAlpha *= ap * da; ctx.beginPath(); ctx.arc(hx, y, on ? 20 : 15, 0, 6.283); shape(ctx, C.bgSchema, on ? C.goud : C.text, on ? 5 : 4);
    if (names > 0.01) { ctx.globalAlpha *= names; const ly = y + 64 + row * 58; ctx.strokeStyle = C.line; ctx.lineWidth = 0.75; if (row) { ctx.beginPath(); ctx.moveTo(hx, y + 22); ctx.lineTo(hx, ly - 34); ctx.stroke(); }
      text(ctx, nm, hx, ly, fTekst(36, on ? 700 : 600), on ? C.goud : C.text, 'center'); }
    if (notes && notes[i] && notesA > 0.01) { ctx.globalAlpha = a * notesA; ctx.font = fTekst(36); ctx.fillStyle = C.grain; ctx.textAlign = 'center'; wrapC(ctx, notes[i], hx, y + 200, 230, 42); }
    ctx.restore(); });
  if (pos !== null) { const px = haltX(pos); broodjeStip(ctx, px, y); }
  ctx.restore();
}
function haltX(p) { const i = Math.max(0, Math.min(HALTES.length - 1, Math.floor(p))); const f = p - i; const a = HALTES[i][0], b = HALTES[Math.min(i + 1, HALTES.length - 1)][0]; return a + (b - a) * f; }
function broodjeStip(ctx, x, y, s = 1) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, 13 * s, 0, 6.283); shape(ctx, V.kh, lighten(V.kh, 0.5), 2); ctx.restore(); }
function wrapC(ctx, s, x, y, maxW, lh) { const words = s.split(' '); let line = '', lines = []; for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; } if (line) lines.push(line); lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh)); return y + lines.length * lh; }
// mini-kaart bovenaan (positie in de reis): alleen stippen + naam van de huidige halte
function miniKaart(ctx, cur, pos = null, a = 1, y = 120) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sx = (x) => 760 + (x - 140) * 0.42;
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx(140), y); ctx.lineTo(sx(1800), y); ctx.stroke();
  HALTES.forEach(([hx], i) => { ctx.beginPath(); ctx.arc(sx(hx), y, i === cur ? 9 : 6, 0, 6.283); shape(ctx, C.bgSchema, i === cur ? C.goud : C.text, i === cur ? 3 : 2); });
  if (pos !== null) { ctx.beginPath(); ctx.arc(sx(haltX(pos)), y, 7, 0, 6.283); shape(ctx, V.kh, null); }
  if (cur >= 0) metaText(ctx, HALTES[cur][1], sx(HALTES[cur][0]), y + 44, C.goud, 'center', 28);
  ctx.restore();
}
// klok: wijzer draait met uren; tekst eronder (bijv. 'seconden', '2–4 uur')
function klok(ctx, x, y, r, uren, tekst, a = 1, col = C.goud) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.bgSchema, 0.9), C.text, 3);
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); ctx.lineTo(x + Math.cos(an) * r * 0.9, y + Math.sin(an) * r * 0.9); ctx.stroke(); }
  const an = -Math.PI / 2 + uren * Math.PI / 6; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.7, y + Math.sin(an) * r * 0.7); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.283); ctx.fill();
  if (tekst) text(ctx, tekst, x, y + r + 46, fTekst(36, 600), col, 'center');
  ctx.restore();
}
// enzym als schaartje (Schema); open 0..1
function schaar(ctx, x, y, s = 1, open = 0.5, col = C.text, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round';
  const an = 0.12 + open * 0.38; for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * an); ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(30, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(-14, 0, 8, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, 3, 0, 6.283); ctx.fill(); ctx.restore();
}
// bacterie (staafje)
function bacterie(ctx, x, y, s = 1, rot = 0, a = 1, col = C.koraal, dood = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -18 * s, -8 * s, 36 * s, 16 * s, 8 * s); const c = dood > 0.5 ? C.line : col; shape(ctx, rgba(c, 0.35 + 0.3 * (1 - dood)), c, 1.6);
  if (dood > 0.5) { ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-6 * s, -4 * s); ctx.lineTo(6 * s, 4 * s); ctx.moveTo(6 * s, -4 * s); ctx.lineTo(-6 * s, 4 * s); ctx.stroke(); }
  ctx.restore();
}
// pH-schaal 0..14 horizontaal; markers [{v, label, col}]
function phSchaal(ctx, x, y, w, markers = [], a = 1, band = null) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(x, 0, x + w, 0);
  g.addColorStop(0, C.koraal); g.addColorStop(0.5, '#9AA3B2'); g.addColorStop(1, C.teal); roundRect(ctx, x, y, w, 22, 11); ctx.fillStyle = g; ctx.fill();
  for (const v of [0, 7, 14]) text(ctx, String(v), x + w * v / 14, y + 64, fMeta(28), C.text2, 'center');
  text(ctx, 'pH', x - 30, y + 22, fTekst(36, 600), C.text2, 'right');
  if (band) { ctx.strokeStyle = C.groen; ctx.lineWidth = 3; roundRect(ctx, x + w * band[0] / 14, y - 10, w * (band[1] - band[0]) / 14, 42, 8); ctx.stroke(); if (band[2]) text(ctx, band[2], x + w * (band[0] + band[1]) / 28, y + 110, fTekst(36, 600), C.groen, 'center'); }
  markers.forEach(m => { if ((m.a ?? 1) <= 0.01) return; ctx.save(); ctx.globalAlpha *= (m.a ?? 1); const mx = x + w * m.v / 14; ctx.fillStyle = m.col || C.goud; ctx.beginPath(); ctx.moveTo(mx, y - 6); ctx.lineTo(mx - 14, y - 32); ctx.lineTo(mx + 14, y - 32); ctx.closePath(); ctx.fill();
    if (m.label) text(ctx, m.label, mx, m.below ? y + 120 : y - 48, fTekst(36, 600), m.col || C.goud, 'center'); ctx.restore(); });
  ctx.restore();
}
// --- buis langs een pad (Schema, organisch): gladde kromme, wand als weefselband, licht wisselende dikte ---
function gladPad(pts, step = 7) { // Catmull-Rom door de punten, dicht bemonsterd
  if (pts.length < 3) { const out = []; const [a, b] = pts; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.max(2, Math.ceil(L / step)); for (let i = 0; i <= n; i++) out.push([lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)]); return out; }
  const P = [pts[0], ...pts, pts[pts.length - 1]], out = [];
  for (let i = 1; i < P.length - 2; i++) { const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]]; const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]); const n = Math.max(2, Math.ceil(L / step));
    for (let k = 0; k < n; k++) { const u = k / n, u2 = u * u, u3 = u2 * u; out.push([0, 1].map(d => 0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); } }
  out.push(pts[pts.length - 1]); return out;
}
const _gladCache = new Map();
function gladC(pts) { const k = JSON.stringify(pts); let v = _gladCache.get(k); if (!v) { v = gladPad(pts); if (_gladCache.size > 400) _gladCache.clear(); _gladCache.set(k, v); } return v; }
// o: {haustra 0..1, seed, glad (false = punten al dicht)}
function buisPad(ctx, pts, w = 34, a = 1, col = V.neutraal, fill = C.fill, o = {}) {
  if (a <= 0.01 || pts.length < 2) return; const { haustra = 0, seed = 0, glad = true } = o;
  const D = glad ? gladC(pts) : pts; if (D.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a;
  const L = [], R = [], li = [], ri = []; let sAcc = 0;
  for (let i = 0; i < D.length; i++) { const p = D[i], q0 = D[Math.max(0, i - 1)], q1 = D[Math.min(D.length - 1, i + 1)];
    let dx = q1[0] - q0[0], dy = q1[1] - q0[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
    if (i) sAcc += Math.hypot(p[0] - D[i - 1][0], p[1] - D[i - 1][1]);
    let h = w / 2 * (1 + 0.06 * Math.sin(sAcc / 47 + seed) + 0.03 * Math.sin(sAcc / 15 + seed * 3));
    if (haustra) h *= 1 + haustra * 0.17 * Math.abs(Math.sin(sAcc / (w * 0.42)));
    const nx = -dy, ny = dx; L.push([p[0] + nx * h, p[1] + ny * h]); R.push([p[0] - nx * h, p[1] - ny * h]); li.push([p[0] + nx * h * 0.7, p[1] + ny * h * 0.7]); ri.push([p[0] - nx * h * 0.7, p[1] - ny * h * 0.7]); }
  const poly = (A, B, cap) => { ctx.beginPath(); A.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    for (let i = B.length - 1; i >= 0; i--) ctx.lineTo(B[i][0], B[i][1]); ctx.closePath(); };
  const line = (A) => { ctx.beginPath(); A.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // ronde uiteinden
  const end = (p, r) => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); };
  ctx.fillStyle = rgba(col === V.neutraal ? V.neutraal : col, 0.28); poly(L, R); ctx.fill(); end(D[0], w / 2); ctx.fill(); end(D[D.length - 1], w / 2); ctx.fill();
  ctx.fillStyle = rgba(C.bgSchema, 0.85); poly(li, ri); ctx.fill(); end(D[0], w * 0.35); ctx.fill(); end(D[D.length - 1], w * 0.35); ctx.fill();
  ctx.fillStyle = rgba(fill, 0.6); poly(li, ri); ctx.fill(); end(D[0], w * 0.35); ctx.fill(); end(D[D.length - 1], w * 0.35); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 2.5; line(L); ctx.stroke(); line(R); ctx.stroke();
  ctx.strokeStyle = rgba(col, 0.45); ctx.lineWidth = 1.2; line(li); ctx.stroke(); line(ri); ctx.stroke();
  ctx.restore();
}
function padPunt(pts, u, glad = true) { // punt op de (gladde) kromme bij fractie u
  if (glad && pts.length > 2) pts = gladC(pts);
  let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let s = clamp(u, 0, 1) * L; for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { const f = seg[i] ? s / seg[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } s -= seg[i]; } return pts[pts.length - 1];
}
function padDeel(pts, u) { // begin van de (gladde) kromme tot fractie u; geeft dichte punten terug
  pts = gladC(pts); if (u >= 1) return pts; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let s = clamp(u, 0, 1) * L; const out = [pts[0]]; for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { out.push(padPunt([pts[i], pts[i + 1]], seg[i] ? s / seg[i] : 0, false)); return out; } out.push(pts[i + 1]); s -= seg[i]; } return out;
}
// --- maag als liggende boon (Schema); (x, y) = ingang slokdarm (linkerwand); maagportier rechts op (x+340s, y+170s) ---
const MAAG_PORTIER = [340, 170];
function maagPad(ctx, x, y, s = 1) {
  const P = (a, b) => [x + a * s, y + b * s];
  ctx.beginPath(); ctx.moveTo(...P(0, 0));
  ctx.bezierCurveTo(...P(-40, -30), ...P(-95, 10), ...P(-85, 90));      // maagkoepel links
  ctx.bezierCurveTo(...P(-75, 200), ...P(40, 265), ...P(170, 255));     // grote bocht onder
  ctx.bezierCurveTo(...P(260, 248), ...P(320, 215), ...P(340, 190));    // naar maagportier
  ctx.lineTo(...P(340, 150));
  ctx.bezierCurveTo(...P(290, 160), ...P(220, 170), ...P(160, 150));    // kleine bocht boven
  ctx.bezierCurveTo(...P(90, 125), ...P(50, 70), ...P(40, 0));
  ctx.closePath();
}
function maagVorm(ctx, x, y, s = 1, lw = 3) { // maag met wand als weefselband (zelfde look als de darm)
  maagPad(ctx, x, y, s); ctx.save(); ctx.lineJoin = 'round'; ctx.fillStyle = C.fill; ctx.fill();
  ctx.strokeStyle = rgba(V.neutraal, 0.28); ctx.lineWidth = 16 * s; ctx.stroke(); ctx.strokeStyle = V.neutraal; ctx.lineWidth = lw; ctx.stroke();
  ctx.restore();
}
// --- bypass-schema: normaal (by=0) of na gastric bypass (by=1) ---
// o: {by, foodU (0..1 positie voedsel, null = niet), sapU (0..1 sapstroom), dimRest, labels, eiwitKnip}
const BYP = {
  x: 900, y: 190, s: 1.2,
  slok: [[920, 60], [922, 130], [920, 195]],
  duo: [[1308, 394], [1385, 392], [1440, 428], [1466, 505], [1450, 590], [1390, 648], [1280, 676], [1150, 684]], // twaalfvingerige darm vanaf de maagportier
  bp: [[1150, 684], [1030, 694], [925, 712], [835, 742]],      // bij bypass: de buis met alleen sappen
  roux: [[900, 262], [835, 282], [775, 345], [748, 440], [752, 545], [780, 640], [835, 742]], // nieuw stuk vanaf het maagzakje (S-bocht)
  gem: [[835, 742], [815, 800], [860, 842], [985, 842], [1100, 806], [1225, 800], [1350, 836], [1480, 834]], // gemeenschappelijk stuk dunne darm
  lever: [1600, 250], gb: [1520, 390], alv: [1330, 545]
};
function bypassSchema(ctx, t, o = {}) {
  const { by = 0, foodU = null, sapU = 0, dimRest = by, labels = 1, a = 1, sapLabels = 0 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // lever + galblaas, galgang naar de twaalfvingerige darm
  blob(ctx, BYP.lever[0], BYP.lever[1], 170, 80, 0.04, 3); shape(ctx, rgba('#8C5A3A', 0.45), '#B07A5A', 2);
  ctx.save(); ctx.strokeStyle = V.neutraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1560, 318); ctx.quadraticCurveTo(1545, 350, 1530, 368); ctx.stroke(); ctx.restore();
  const galgang = gladPad([[BYP.gb[0] - 8, BYP.gb[1] + 22], [1498, 432], [1476, 468]], 4);
  ctx.save(); ctx.strokeStyle = V.neutraal; ctx.lineWidth = 5; ctx.beginPath(); galgang.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  blob(ctx, BYP.gb[0], BYP.gb[1], 34, 24, 0.05, 5); shape(ctx, rgba(V.neutraal, 0.5), V.neutraal, 2);
  ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(BYP.alv[0] + 70, BYP.alv[1] + 4); ctx.quadraticCurveTo(BYP.alv[0] + 100, BYP.alv[1] - 20, 1446, 520); ctx.stroke(); ctx.restore();
  blob(ctx, BYP.alv[0], BYP.alv[1], 80, 28, 0.05, 8); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 2);
  // slokdarm
  buisPad(ctx, BYP.slok, 30);
  // maag (restmaag dimt bij bypass)
  ctx.save(); ctx.globalAlpha *= 1 - 0.55 * dimRest; maagVorm(ctx, BYP.x, BYP.y, BYP.s, 2.5); ctx.restore();
  if (by > 0.01) { ctx.save(); ctx.globalAlpha *= by; buisPad(ctx, padDeel(BYP.roux, ease(by * 1.4)), 30, 1, C.goud, C.fill, { glad: false, seed: 2 }); ctx.restore(); }
  buisPad(ctx, [...BYP.duo, ...BYP.bp.slice(1), ...BYP.gem.slice(1)], 30, 1, V.neutraal, C.fill, { seed: 1 });
  if (by > 0.01) { ctx.save(); ctx.globalAlpha *= by;
    ctx.beginPath(); ctx.ellipse(918, 230, 50, 44, 0.15, 0, 6.283); ctx.fillStyle = C.fill; ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.3); ctx.lineWidth = 14; ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(960, 190); ctx.lineTo(950, 290); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore(); }
  if (sapU > 0.01) { const sapPad = [[1458, 470], ...BYP.duo.slice(3), ...BYP.bp.slice(1), ...BYP.gem.slice(1)];
    for (let i = 0; i < 16; i++) { const u = ((t * 0.1 + i / 16) % 1); if (u > sapU) continue; const p = padPunt(sapPad, u); ctx.fillStyle = i % 2 ? V.neutraal : C.koraal; ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, 6.283); ctx.fill(); } }
  if (foodU !== null) { const pad = by > 0.5 ? [...BYP.slok, [918, 240], ...BYP.roux.slice(1), ...BYP.gem.slice(1)] : [...BYP.slok, [960, 300], [1150, 360], ...BYP.duo, ...BYP.bp.slice(1), ...BYP.gem.slice(1)];
    for (let i = 0; i < 5; i++) { const u = foodU - i * 0.03; if (u < 0 || u > 1) continue; const p = padPunt(pad, u); broodjeStip(ctx, p[0], p[1], 0.8); } }
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels;
    label(ctx, 'slokdarm', null, 920, 100, 700, 100, 1);
    label(ctx, by > 0.5 ? 'restmaag' : 'maag', null, 1150, 330, 1150, 120, 1, C.text, 'left');
    label(ctx, 'lever', null, 1640, 210, 1720, 120, 1);
    label(ctx, 'galblaas', null, 1540, 400, 1700, 440, 1);
    naamBij(ctx, 'alvleesklier', null, 1235, 612, 1, 'right');
    label(ctx, 'twaalfvingerige darm', null, 1440, 620, 1540, 720, 1);
    naamBij(ctx, 'dunne darm', null, 1340, 905, 1, 'center');
    if (by > 0.5) { label(ctx, 'maagzakje', null, 880, 230, 560, 220, by); label(ctx, 'nieuw stuk', null, 760, 520, 560, 520, by); }
    ctx.restore(); }
  ctx.restore();
}

// ===== vastgelegd in film 3: verteringsenzymen =====
// Enzym = grijsblauw eiwit (C.enzym) met actief centrum in goud. De vorm van het kuiltje past bij het substraat:
// 'amylase' (twee zeshoeken), 'maltase'/'lactase' (één zeshoek-paar, smaller), 'protease' (kraal), 'lipase' (E-vorm).
// open 0..1 = hoe ver het kuiltje open staat; denat 0..1 = vervorming (denatureren).
const ENZ = { amylase: 'twee', maltase: 'twee', lactase: 'twee', protease: 'kraal', pepsine: 'kraal', peptidase: 'kraal', trypsine: 'kraal', lipase: 'e', nuclease: 'kraal' };
function enzym(ctx, x, y, s = 1, o = {}) {
  const { soort = 'amylase', rot = 0, denat = 0, a = 1, label = null, t = 0, gloed = 0 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  // eiwitlichaam: organische blob met een kuiltje bovenaan (actief centrum)
  const vorm = ENZ[soort] || 'twee'; const w = vorm === 'e' ? 34 : vorm === 'kraal' ? 22 : 30; // halve breedte kuiltje
  const dp = 30; // diepte kuiltje
  ctx.beginPath(); const n = 64;
  for (let i = 0; i <= n; i++) { const an = -Math.PI / 2 + i / n * Math.PI * 2; let r = 70 + 6 * Math.sin(an * 3 + 1) + 4 * Math.sin(an * 5) + denat * 18 * Math.sin(an * 4 + t * 0.7);
    let px = Math.cos(an) * r * 1.15, py = Math.sin(an) * r;
    if (Math.abs(px) < w + 14 && py < 0) { const k = 1 - Math.min(1, Math.max(0, (Math.abs(px) - w) / 14)); py += k * dp * (1 - denat * 0.8); }
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); ctx.fillStyle = rgba(C.enzym, 0.55); ctx.fill(); ctx.strokeStyle = lighten(C.enzym, 0.35); ctx.lineWidth = 2 / s; ctx.stroke();
  // binnenstructuur (vouwing) als lichte lijnen
  ctx.strokeStyle = rgba(C.text, 0.12); ctx.lineWidth = 1.5 / s; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-50 + k * 8, 10 + k * 14); ctx.bezierCurveTo(-20, -10 + k * 18 + denat * 20, 20, 30 + k * 6, 52 - k * 6, 4 + k * 16); ctx.stroke(); }
  // actief centrum: gouden rand in het kuiltje
  if (denat < 0.95) { ctx.save(); ctx.globalAlpha *= 1 - denat; ctx.strokeStyle = C.goud; ctx.lineWidth = (3 + 3 * gloed) / s; ctx.lineCap = 'round'; ctx.beginPath();
    ctx.moveTo(-w - 6, -70 + dp * 0.25); ctx.quadraticCurveTo(-w, -70 + dp, 0, -70 + dp + 4); ctx.quadraticCurveTo(w, -70 + dp, w + 6, -70 + dp * 0.25); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (label) text(ctx, label, x, y + 100 * s, fTekst(36, 600), C.text, 'center');
}
// zetmeelketen als zeshoeken langs een golf; cut = lijst van indexen waar geknipt is (gat erna)
function zetmeelKeten(ctx, x, y, n, r = 14, o = {}) {
  const { cuts = [], gap = 18, a = 1, amp = 8, ph = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; let dx = 0;
  for (let i = 0; i < n; i++) { const px = x + i * r * 1.75 + dx, py = y + Math.sin(i * 0.6 + ph) * amp;
    if (i < n - 1 && !cuts.includes(i)) { const qx = x + (i + 1) * r * 1.75 + dx, qy = y + Math.sin((i + 1) * 0.6 + ph) * amp; ctx.strokeStyle = V.kh; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke(); }
    hexagon(ctx, px, py, r, rgba(V.kh, 0.55), V.kh, 1.4, 0); if (cuts.includes(i)) dx += gap; }
  ctx.restore();
}
// eenvoudige botsingssimulatie (deterministisch, wordt per frame vooruit gerekend)
// enzymen (E) en substraatketens (S) bewegen willekeurig; bij contact met een passend substraat volgt een knip.
function maakSim(seed, nE, nS, box) { return { seed, nE, nS, box, t: 0, st: null }; }
function simStap(sim, tDoel, snel, pas = (e, s) => true) {
  const B = sim.box;
  if (!sim.st || tDoel < sim.t) { sim.t = 0; sim.st = { E: [], S: [], knips: 0, prod: [] };
    for (let i = 0; i < sim.nE; i++) sim.st.E.push({ x: B[0] + hash(sim.seed + i * 3) * B[2], y: B[1] + hash(sim.seed + i * 3 + 1) * B[3], a: hash(sim.seed + i * 3 + 2) * 6.28, cd: 0, dn: -1 });
    for (let i = 0; i < sim.nS; i++) sim.st.S.push({ x: B[0] + hash(sim.seed + 100 + i * 3) * B[2], y: B[1] + hash(sim.seed + 101 + i * 3) * B[3], a: hash(sim.seed + 102 + i * 3) * 6.28, len: 6, soort: i % 4 === 3 ? 'eiwit' : 'zetmeel' }); }
  const st = sim.st, dt = 1 / 30;
  while (sim.t < tDoel) { sim.t += dt; const sp = snel(sim.t);
    const mv = (p, v, k) => { p.a += (hash(Math.floor(sim.t * 30) * 7 + k) - 0.5) * 0.9; p.x += Math.cos(p.a) * v * dt; p.y += Math.sin(p.a) * v * dt;
      if (p.x < B[0]) { p.x = B[0]; p.a = Math.PI - p.a; } if (p.x > B[0] + B[2]) { p.x = B[0] + B[2]; p.a = Math.PI - p.a; } if (p.y < B[1]) { p.y = B[1]; p.a = -p.a; } if (p.y > B[1] + B[3]) { p.y = B[1] + B[3]; p.a = -p.a; } };
    st.E.forEach((e, i) => { mv(e, 60 * sp.v, i); if (e.cd > 0) e.cd -= dt; if (e.dn < 0 && sp.kDen > 0 && hash(Math.floor(sim.t * 30) * 17 + i * 5 + sim.seed) < sp.kDen * dt) e.dn = sim.t; });
    st.S.forEach((s, i) => mv(s, 40 * sp.v, 50 + i));
    st.prod.forEach((p, i) => { mv(p, 50 * sp.v, 200 + i); p.age += dt; });
    st.E.forEach(e => { if (e.cd > 0 || sp.werkt <= 0 || e.dn >= 0) return; for (const s of st.S) { if (s.len < 2) continue; if (Math.hypot(e.x - s.x, e.y - s.y) < 46) { if (!pas(e, s)) { e.a += Math.PI; break; }
          if (hash(Math.floor(sim.t * 30) * 13 + st.knips) < sp.werkt) { s.len -= 2; st.knips++; st.prod.push({ x: s.x, y: s.y, a: e.a + 2, age: 0 }); e.cd = 0.5; } break; } } });
  }
  return st;
}
