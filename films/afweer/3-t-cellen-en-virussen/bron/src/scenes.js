// Afweer 3 · T-cellen en virussen — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#6B3F22', shirt: '#7A9A5E', hairStyle: 'long' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const VIR = '#E07A5F', BCOL = '#5BA4C9', TCOL = '#7FC48F', AS = '#E0B64A', WIT = '#D8DCE2', EIGEN = '#8C7BBF', BEEN = '#E6D8A8', LYMF = '#7FC48F';

// ---------- vormpjes: antigeen (gevuld) en receptor (holle 'sleutel') ----------
function vormPad(ctx, k, s) { ctx.beginPath();
  if (k === 0) { ctx.moveTo(-s, s * 0.8); ctx.lineTo(0, -s); ctx.lineTo(s, s * 0.8); ctx.closePath(); }
  else if (k === 1) { ctx.rect(-s * 0.85, -s * 0.85, s * 1.7, s * 1.7); }
  else if (k === 2) { ctx.arc(0, 0, s, 0, 6.283); }
  else if (k === 3) { ctx.moveTo(0, -s * 1.1); ctx.lineTo(s, 0); ctx.lineTo(0, s * 1.1); ctx.lineTo(-s, 0); ctx.closePath(); }
  else if (k === 4) { for (let i = 0; i < 6; i++) { const an = i * 1.047; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * s, Math.sin(an) * s); } ctx.closePath(); }
  else if (k === 5) { ctx.moveTo(-s, s); ctx.lineTo(-s, -s * 0.2); ctx.lineTo(0, -s); ctx.lineTo(s, -s * 0.2); ctx.lineTo(s, s); ctx.closePath(); }
  else { ctx.moveTo(-s, s); ctx.lineTo(-s * 0.3, -s); ctx.lineTo(s, -s * 0.4); ctx.lineTo(s * 0.6, s); ctx.closePath(); } }
const VORMKL = ['#F2C0A8', '#9FD6C8', '#F0D78C', '#C9B8F0', '#F2A8B8', '#A8C8F2', '#D8E6A0'];
function antigeen(ctx, x, y, k, s = 12, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); vormPad(ctx, k, s); ctx.fillStyle = VORMKL[k % VORMKL.length]; ctx.fill(); ctx.restore(); }
function sleutel(ctx, x, y, k, s = 12, ang = 0, a = 1, col = BCOL, glow = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, s * 2.4); ctx.lineTo(0, s * 1.2); ctx.stroke();
  ctx.save(); ctx.scale(1.25, 1.25); vormPad(ctx, k, s); ctx.restore(); ctx.strokeStyle = glow > 0.01 ? lighten(col, 0.5 * glow) : col; ctx.lineWidth = 3.5 + 3 * glow; ctx.stroke(); ctx.restore(); }
// virus: bol met uitsteeksels; ks = lijst vormpjes
function virus(ctx, x, y, r, ks, t = 0, o = {}) { const { a = 1, col = VIR, rot = 0, ast = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.max(6, ks.length * 3);
  for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n; const ex = x + Math.cos(an) * r * 1.3, ey = y + Math.sin(an) * r * 1.3; ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = Math.max(2, r * 0.06); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(ex, ey); ctx.stroke(); antigeen(ctx, x + Math.cos(an) * r * 1.42, y + Math.sin(an) * r * 1.42, ks[i % ks.length], r * 0.16, an + 1.571); }
  circ(ctx, x, y, r, rgba(col, 0.7), lighten(col, 0.3), 2);
  if (ast) for (let i = 0; i < n; i++) { if (ast(i) <= 0.01) continue; const an = rot + i * 6.283 / n; antistof(ctx, x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65, r * 0.006, an - 1.571, ast(i)); }
  ctx.restore(); }
// B-cel (of plasmacel/geheugencel): blauwe blob met ronde kern en receptoren
function bCel(ctx, x, y, r, k, t = 0, o = {}) { const { a = 1, col = BCOL, rec = 1, n = 8, glow = 0, seed = 2, label = '', soort = 'b' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2); g.addColorStop(0, rgba(AS, 0.35 * glow)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, 6.283); ctx.fill(); }
  if (rec > 0.01 && soort !== 'plasma') for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.3; sleutel(ctx, x + Math.cos(an) * r * 1.25, y + Math.sin(an) * r * 1.25, k, r * 0.13, an + 1.571, rec, col, glow); }
  blob(ctx, x, y, r, r * 0.95, 0.06, seed, t); shape(ctx, rgba(col, soort === 'geheugen' ? 0.45 : 0.28), col, 2.5);
  if (soort === 'plasma') { ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x + r * 0.25, y, r * (0.35 + i * 0.13), -1.6, 1.6); ctx.stroke(); } circ(ctx, x - r * 0.5, y, r * 0.28, rgba(C.kern, 0.6), C.kernR, 1.2); }
  else circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (soort === 'geheugen') { ctx.fillStyle = C.goud; ctx.font = fTekst(Math.round(r * 0.6), 700); ctx.textAlign = 'center'; ctx.fillText('★', x, y + r * 0.22); }
  if (label) text(ctx, label, x, y + r * 1.5 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function tCel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, label = '', col = TCOL } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { const an = i * 0.9; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.stroke(); }
  blob(ctx, x, y, r, r * 0.95, 0.06, 5, t); shape(ctx, rgba(TCOL, 0.3), TCOL, 2.5); circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.6), C.kernR, 1.2); if (label) text(ctx, label, x, y + r * 1.4 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// antistof: gouden Y; s = schaal (1 ≈ 100 px hoog)
function antistof(ctx, x, y, s = 1, ang = 0, a = 1, col = AS) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 0); ctx.moveTo(0, 0); ctx.lineTo(-32, -42); ctx.moveTo(0, 0); ctx.lineTo(32, -42); ctx.stroke();
  ctx.fillStyle = lighten(col, 0.45); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 36, -47, 9, 0, 6.283); ctx.fill(); } ctx.restore(); }
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, rgba(VIR, 0.75), lighten(VIR, 0.3), 1.5 / s);
  ctx.fillStyle = '#F2C0A8'; for (let i = 0; i < 4; i++) { const px = -18 + i * 12; ctx.beginPath(); ctx.moveTo(px, -11); ctx.lineTo(px + 4, -17); ctx.lineTo(px + 8, -11); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(px, 11); ctx.lineTo(px + 4, 17); ctx.lineTo(px + 8, 11); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, 0.08, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function vonk(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const an = i * 0.785 + t; const r0 = 14, r1 = 30 + 6 * Math.sin(t * 4 + i); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); } ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }


// ---------- extra kleuren en figuren voor film 3 ----------
const TK = '#3E9E6A', TH = '#7FC48F', WAND = '#C9A35C', RIBO = '#9FC3E0', RNAK = '#F0D78C', MHCK = '#C9D2DE', NEUR = '#E6D8A8', RES = '#8C5A3A';
// grote bacterie in doorsnede: celwand, membraan, ribosomen, DNA; kapot = gaten in de wand
function bacterieGroot(ctx, x, y, w, h, t, o = {}) { const { a = 1, kapot = 0, wand = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); shape(ctx, rgba(VIR, 0.22), null);
  if (wand > 0.01) { ctx.save(); ctx.globalAlpha *= wand; ctx.strokeStyle = WAND; ctx.lineWidth = 14; if (kapot > 0.01) ctx.setLineDash([60, 8 + 40 * kapot]); roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(VIR, 0.3); ctx.lineWidth = 3; roundRect(ctx, x - w / 2 + 16, y - h / 2 + 16, w - 32, h - 32, h / 2 - 16); ctx.stroke();
  for (let i = 0; i < 26; i++) circ(ctx, x - w / 2 + 50 + hash(i * 3) * (w - 100), y - h / 2 + 40 + hash(i * 7) * (h - 80), 6, RIBO);
  ctx.strokeStyle = RNAK; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60; const px = x - w * 0.25 + u * w * 0.5, py = y + Math.sin(u * 18 + t) * 22 + Math.cos(u * 7) * 18; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.restore(); }
// lichaamscel; geinf = virus binnen; toon = stukjes op het oppervlak (eigen paars of virus koraal); kapot = afbreken
function lCel(ctx, x, y, r, t, o = {}) { const { a = 1, geinf = 0, toon = 0, eigenToon = 0, kapot = 0, nieuw = 0, gaatjes = 0, col = EIGEN, seed = 4, mhc = 0, mhcCol = MHCK } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kapot > 0.01) { for (let i = 0; i < 9; i++) { const an = i * 0.7 + hash(i) * 0.4; const d = r * (0.3 + 0.9 * kapot * hash(i * 5)); ctx.save(); ctx.globalAlpha *= 1 - 0.6 * kapot; blob(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * (0.45 - 0.25 * kapot), r * (0.4 - 0.22 * kapot), 0.1, i, t); shape(ctx, rgba(col, 0.3), col, 2); ctx.restore(); } ctx.restore(); return; }
  blob(ctx, x, y, r, r * 0.9, 0.04, seed, t); shape(ctx, rgba(col, 0.2), col, 2.5); circ(ctx, x - r * 0.15, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (geinf > 0.01) { ctx.save(); ctx.globalAlpha *= geinf; ctx.strokeStyle = RNAK; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = x - r * 0.3 + u * r * 0.3, py = y + Math.sin(u * 14 + t * 2) * r * 0.08; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  const nv = Math.round(10 * nieuw); for (let i = 0; i < nv; i++) { const an = hash(i * 9) * 6.283, d = r * (0.45 + 0.35 * hash(i * 4)); virus(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, r * 0.07, [3], t, { rot: i }); }
  const n = 10; for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.2; const px = x + Math.cos(an) * r * 1.0, py = y + Math.sin(an) * r * 0.9; const vir = i % 2 === 0;
    const al = vir ? toon : eigenToon; if (al > 0.01 || mhc > 0.01) { ctx.save(); ctx.translate(px, py); ctx.rotate(an + 1.571); ctx.globalAlpha *= Math.max(al, mhc); ctx.strokeStyle = mhcCol; ctx.lineWidth = 4; ctx.beginPath(); if (mhcCol === MHCK) { ctx.moveTo(-11, 6); ctx.lineTo(-11, -10); ctx.moveTo(11, 6); ctx.lineTo(11, -10); } else { ctx.moveTo(-12, 6); ctx.lineTo(-4, -12); ctx.moveTo(12, 6); ctx.lineTo(4, -12); } ctx.stroke(); ctx.globalAlpha *= al / Math.max(al, mhc, 0.01); ctx.fillStyle = vir ? VIR : EIGEN; roundRect(ctx, -8, -16, 16, 12, 4); ctx.fill(); ctx.restore(); } }
  if (gaatjes > 0.01) for (let i = 0; i < 5; i++) { const an = -0.6 + i * 0.3; circ(ctx, x + Math.cos(an) * r * 0.97, y + Math.sin(an) * r * 0.87, 9, rgba(C.bgMicro, gaatjes), rgba(TK, gaatjes), 2); }
  ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1, ang = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -60, -24, 120, 48, 24); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -24, 60, 48, 24); ctx.fill(); ctx.fillRect(0, -24, 20, 48); ctx.restore(); }
function thymus(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sx * 46 * s, y, 50 * s, 95 * s, sx * 0.15, 0, 6.283); shape(ctx, rgba('#E8A0B0', 0.3), '#E8A0B0', 2.5); } ctx.restore(); }
function bot(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-1.1); ctx.scale(s, s); roundRect(ctx, -40, -170, 80, 340, 40); shape(ctx, rgba(BEEN, 0.25), BEEN, 3); for (const sy of [-1, 1]) for (const sx of [-1, 1]) circ(ctx, sx * 34, sy * 170, 42, rgba(BEEN, 0.3), BEEN, 3); ctx.restore(); }
function slaapkamer(ctx, t, o = {}) { const { opBed = 1, ma = 1, telefoon = 1 } = o;
  ctx.fillStyle = '#2F3A55'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5A4636'; ctx.fillRect(0, 760, W, H - 760);
  roundRect(ctx, 1380, 140, 340, 280, 10); shape(ctx, '#1E2A40', '#8FA0B5', 4); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1550, 140); ctx.lineTo(1550, 420); ctx.stroke();
  // bed
  roundRect(ctx, 120, 520, 900, 240, 20); shape(ctx, '#6B4E3A', '#4A3626', 3); roundRect(ctx, 100, 380, 60, 400, 20); shape(ctx, '#7A5A44', '#4A3626', 3);
  roundRect(ctx, 170, 470, 230, 90, 40); shape(ctx, '#E6E1D3', '#B8B2A4', 2);
  if (opBed > 0.01) { ctx.save(); ctx.globalAlpha *= opBed; circ(ctx, 300, 470, 62, SKINS[1], '#A87A5A', 2); ctx.fillStyle = '#6B3F22'; ctx.beginPath(); ctx.arc(300, 455, 66, 3.3, 6.1); ctx.fill(); ctx.fillRect(236, 455, 22, 80);
    ctx.fillStyle = '#C9483E'; ctx.globalAlpha *= 0.35; circ(ctx, 330, 490, 14, '#E0503E'); circ(ctx, 270, 490, 14, '#E0503E'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= opBed; ctx.strokeStyle = '#555'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(350, 500); ctx.lineTo(395, 520); ctx.stroke(); ctx.restore(); }
  roundRect(ctx, 360, 500 - 20 * opBed, 650, 200 + 20 * opBed, 40); shape(ctx, '#5BA4C9', '#3E7FA0', 3); ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(420 + i * 150, 500); ctx.lineTo(420 + i * 150, 700); ctx.stroke(); }
  if (opBed < 0.99) person(ctx, 1180, 900, 470, 1 - opBed, {});
  if (ma > 0.01) { const mx = opBed > 0.5 ? 1280 : 1420; person(ctx, mx, 900, 520, ma, { hair: '#2E2420', shirt: '#8C5A7A', hairStyle: 'short', armR: { a1: telefoon ? -1.9 : 0.4, a2: telefoon ? -2.6 : 0.8 } });
    if (telefoon) { ctx.save(); ctx.globalAlpha *= ma; roundRect(ctx, mx + 44, 900 - 520 + 40, 26, 50, 6); shape(ctx, '#1A1F2B', '#8FA0B5', 2); ctx.restore(); } }
}
function hivGrafiekT(s) { if (s < 0.08) return 1000 - 6000 * s; if (s < 0.5) return 520 + 230 * (s - 0.08) / 0.42; return Math.max(80, 750 - 62 * (s - 0.5)); }
function hivGrafiekV(s) { if (s < 0.1) return 1000 * s / 0.1; if (s < 0.5) return 1000 - 920 * (s - 0.1) / 0.4; return 80 + 6 * Math.pow(Math.max(0, s - 0.5), 2.1); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1520, cy = 470;
    lCel(ctx, cx, cy, 170, t, { geinf: 1, toon: 1, nieuw: 0.5 });
    const ap = 0.5 + 0.5 * Math.sin(t * 0.8); tCel(ctx, cx - 300 + 40 * ap, cy - 60, 70, t, { col: TK }); vonk(ctx, cx - 190, cy - 50, ap, t);
    virus(ctx, cx + 260, cy - 230, 26, [3], t, { rot: t * 0.2 }); virus(ctx, cx + 300, cy + 200, 22, [3], t, { rot: -t * 0.2 }); },

  s01(ctx, t, q) { slaapkamer(ctx, t, { telefoon: q.on('belt', 1) > 0.5 ? 1 : 0, ma: 1 });
    tag(ctx, '± 39 °C', 300, 330, C.koraal, q.on('negenendertig', 1));
    tag(ctx, 'antibiotica?', 1430, 250, C.goud, q.on('antibiotica', 1) * (1 - q.on('nee', 1)));
    tag(ctx, 'huisarts: nee, helpt niet tegen griep', 1250, 250, C.text2, q.on('nee', 1) * (1 - q.on('Waarom', 1)));
    vraagteken(ctx, 760, 330, q.on('Waarom', 1), 140); },

  s04(ctx, t, q) { bg(ctx, 'micro');
    const pv = q.on('virus', 1), p1 = 1 - pv;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const kap = ramp(t, q.at('bouwen'), 2);
      bacterieGroot(ctx, 560, 460, 640, 300, t, { kapot: kap });
      label(ctx, 'celwand', '', 560 - 120, 460 - 150, 300, 170, q.on('celwand', 1), WAND, 'left');
      naamBij(ctx, 'ribosomen', '', 770, 284, q.on('ribosomen', 1), 'left', RIBO);
      regel(ctx, 'bacterie: een cel', 560, 700, 1, VIR, 32, 'center', 700);
      tag(ctx, 'eigen stofwisseling', 560, 800, C.text2, q.on('stofwisseling', 1) * (1 - q.on('Antibiotica', 1)));
      pil(ctx, 960, 500, 1, q.on('Antibiotica', 1)); tag(ctx, 'antibiotica remmen de bouw van de celwand', 560, 800, C.koraal, q.on('Antibiotica', 1) * (1 - q.on('Jouw', 1)));
      const jw = q.on('Jouw', 1); ctx.save(); ctx.globalAlpha *= jw; lCel(ctx, 1450, 460, 200, t); regel(ctx, 'jouw cel', 1450, 720, 1, EIGEN, 32, 'center', 700); regel(ctx, 'geen celwand', 1450, 770, 1, C.text2, 28, 'center'); regel(ctx, 'andere ribosomen', 1450, 810, q.on('andere', 1), C.text2, 28, 'center'); vink(ctx, 1450, 200, 34, q.on('kapotgaan', 1)); ctx.restore();
      ctx.restore(); }
    if (pv > 0.01) { ctx.save(); ctx.globalAlpha *= pv;
      bacterieGroot(ctx, 420, 470, 400, 190, t, { a: 1 }); regel(ctx, 'bacterie ± 1–2 µm', 420, 640, 1, VIR, 28, 'center', 700);
      virus(ctx, 720, 470, 18, [3], t, { rot: t * 0.2 }); regel(ctx, 'virus ± 0,1 µm', 720, 545, q.on('tien', 1), VIR, 30, 'center', 700);
      zoomCircle(ctx, 1380, 450, 300, 720, 470, '', q.on('eiwitmantel', 1), () => { virus(ctx, 1380, 450, 150, [3], t, { rot: t * 0.05 }); ctx.strokeStyle = RNAK; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50; const px = 1300 + u * 160, py = 450 + Math.sin(u * 16 + t) * 30; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); });
      naamBij(ctx, 'eiwitmantel', '', 1712, 440, q.on('eiwitmantel', 1), 'left', VIR); naamBij(ctx, 'erfelijk materiaal', '', 1380, 522, q.on('erfelijk', 1), 'center', RNAK);
      tag(ctx, 'eet niet · groeit niet · vermenigvuldigt zich niet zelf', 560, 820, C.text2, q.on('groeit', 1));
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'micro'); const cx = 900, cy = 520, r = 260;
    const nw = ramp(t, q.at('nieuwe'), 3), vr = ramp(t, q.at('vrij'), 3);
    // luchtwegcellen met trilhaartjes
    lCel(ctx, cx, cy, r, t, { geinf: q.on('erfelijk', 1), nieuw: nw * (1 - vr) }); for (let i = 0; i < 9; i++) { const an = -2.4 + i * 0.12; ctx.strokeStyle = rgba(EIGEN, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.9); ctx.lineTo(cx + Math.cos(an) * (r + 30) + 6 * Math.sin(t * 6 + i), cy + Math.sin(an) * (r * 0.9 + 30)); ctx.stroke(); }
    lCel(ctx, 290, cy + 40, 170, t, { seed: 7, geinf: vr * q.on('buurcellen', 1) }); lCel(ctx, 1520, cy + 40, 190, t, { seed: 9, geinf: vr * q.on('buurcellen', 1) });
    regel(ctx, 'cel van je luchtwegen', cx, 880, 1, EIGEN, 28, 'center', 700);
    const att = ramp(t, q.at('hecht'), 1.5), vx = lerp(1500, cx + 60, att), vy = lerp(120, cy - r * 0.9 - 26, att);
    virus(ctx, vx, vy, 30, [3], t, { a: 1 - 0.7 * q.on('erfelijk', 1) });
    const inj = ramp(t, q.at('erfelijk'), 1.5); if (inj > 0.01 && inj < 0.99) { ctx.strokeStyle = RNAK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 60, cy - r * 0.9); ctx.lineTo(cx + 60 - 160 * inj, cy - r * 0.9 + 200 * inj); ctx.stroke(); }
    if (vr > 0.01) for (let i = 0; i < 12; i++) { const an = -2.8 + i * 0.5; const d = r * (0.8 + 0.9 * vr * (0.6 + 0.4 * hash(i))); virus(ctx, cx + Math.cos(an) * d, clamp(cy + Math.sin(an) * d * 0.8, 230, 800), 18, [3], t, { rot: i }); }
    tag(ctx, 'het virus hecht zich aan een cel', 960, 140, VIR, q.on('hecht', 1) * (1 - q.on('nieuwe', 1)));
    tag(ctx, 'de cel maakt nieuwe virusdeeltjes', 960, 140, RNAK, q.on('nieuwe', 1) * (1 - q.on('Honderden', 1)));
    tag(ctx, 'honderden, soms duizenden', 960, 140, RNAK, q.on('Honderden', 1) * (1 - q.on('vrij', 1)));
    tag(ctx, 'ze infecteren de buurcellen', 960, 140, VIR, q.on('vrij', 1) * (1 - ramp(t, q.at('gekaapt') - 0.8, 0.6)));
    tag(ctx, 'je cel is gekaapt', 960, 140, C.koraal, ramp(t, q.at('gekaapt') - 0.8, 0.6));
  },
  s06(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Slik', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      bacterieGroot(ctx, 520, 460, 460, 220, t, { kapot: 0.7 }); pil(ctx, 520, 250, 0.8); regel(ctx, 'bacterie: wel iets te remmen', 520, 650, 1, VIR, 30, 'center', 700);
      virus(ctx, 1380, 460, 90, [3], t, { rot: t * 0.05 }); pil(ctx, 1380, 250, 0.8); kruis(ctx, 1380, 250, 50, q.on('remmen', 1)); regel(ctx, 'virus: niets te remmen', 1380, 650, 1, VIR, 30, 'center', 700);
      tag(ctx, 'antwoord a: een virus is geen cel', 960, 820, C.goud, q.on('aa', 1) * (1 - q.on('nooit', 1)));
      tag(ctx, 'antibiotica hebben nooit tegen virussen gewerkt', 960, 820, C.koraal, q.on('nooit', 1));
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const dd = ramp(t, q.at('dood'), 2), gr = ramp(t, q.at('vermenigvuldigen'), 3), mu = q.on('mutatie', 1);
      ctx.beginPath(); ctx.ellipse(960, 460, 760, 300, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.05), rgba(C.goud, 0.4), 2); regel(ctx, 'bacteriën in je darm', 960, 140, 1, C.text2, 28, 'center');
      for (let i = 0; i < 40; i++) { const res = i % 13 === 0; const x = 300 + hash(i * 3) * 1320, y = 230 + hash(i * 7) * 460; if (res) { bacterie(ctx, x, y, 1.3, hash(i) * 6, 1, 0); if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= mu; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 46, 28, hash(i) * 6, 0, 6.283); ctx.stroke(); ctx.restore(); } } else bacterie(ctx, x, y, 1.3, hash(i) * 6, 1 - 0.85 * dd, dd); }
      const nk = Math.round(28 * gr); for (let i = 0; i < nk; i++) { const x = 300 + hash(i * 11 + 5) * 1320, y = 230 + hash(i * 13 + 5) * 460; bacterie(ctx, x, y, 1.3, hash(i * 2) * 6, Math.min(1, gr * 28 - i)); }
      tag(ctx, 'de gevoelige gaan dood', 960, 820, C.text2, q.on('dood', 1) * (1 - q.on('mutatie', 1)));
      tag(ctx, 'een paar zijn door een mutatie ongevoelig', 960, 820, C.goud, q.on('mutatie', 1) * (1 - q.on('vermenigvuldigen', 1)));
      tag(ctx, 'selectie: zij blijven over en vermenigvuldigen zich', 960, 820, C.goud, q.on('vermenigvuldigen', 1) * (1 - q.on('resistentie', 1)));
      tag(ctx, 'resistentie: de bacteriën worden ongevoelig, niet jij', 960, 820, C.koraal, q.on('resistentie', 1));
      ctx.restore(); }
  },
  s07(ctx, t, q) { bg(ctx, 'micro');
    virus(ctx, 420, 420, 70, [3], t, { rot: t * 0.05, ast: i => i % 2 ? q.on('vangen', 1) : 0 }); regel(ctx, 'buiten de cel: antistoffen vangen het virus', 420, 640, q.on('vangen', 1), AS, 28, 'center', 700);
    lCel(ctx, 1280, 470, 240, t, { geinf: 1, nieuw: 0.5 });
    const bin = q.on('binnen', 1); for (let i = 0; i < 6; i++) { const an = 2.4 + i * 0.25; const bounce = 0.5 + 0.5 * Math.sin(t * 2 + i); antistof(ctx, 1280 + Math.cos(an) * (285 + 30 * bounce), 470 + Math.sin(an) * (250 + 30 * bounce), 0.4, an - 1.571, bin); }
    kruis(ctx, 1000, 330, 30, q.on('niet', 1)); regel(ctx, 'in de cel: antistoffen kunnen er niet bij', 1280, 800, bin, C.koraal, 28, 'center', 700);
    vraagteken(ctx, 960, 200, q.on('Hoe', 1), 120); },

  s09(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Daarvoor', 1), p3 = q.on('Weet', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; lCel(ctx, 960, 450, 230, t, { geinf: 1, nieuw: 0.6 }); kruis(ctx, 1300, 300, 40, q.on('niet', 1)); fagocyt(ctx, 1450, 330, 80, t, { arm: 0.6, tx: 1200, ty: 380, a: 0.7 }); tag(ctx, 'de hele cel moet weg', 960, 820, C.koraal, q.on('hele', 1)); ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3);
      bot(ctx, 330, 460, 1, 1); regel(ctx, 'beenmerg', 330, 720, q.on('beenmerg', 1), BEEN, 30, 'center', 700);
      arrow(ctx, 560, 460, 760, 460, C.line, q.on('thymus', 1), 3);
      thymus(ctx, 960, 450, 1.3, q.on('thymus', 1)); regel(ctx, 'thymus', 960, 640, q.on('thymus', 1), '#E8A0B0', 30, 'center', 700); regel(ctx, 'achter je borstbeen', 960, 685, q.on('borstbeen', 1), C.text2, 26, 'center');
      arrow(ctx, 1160, 460, 1360, 460, C.line, q.on('thymus', 1), 3); tCel(ctx, 1530, 460, 90, t, { a: q.on('thymus', 1), label: 'T-cel' }); tag(ctx, 'T van thymus', 1530, 250, TH, q.on('borstbeen', 1));
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const gi = q.on('geïnfecteerde', 1);
      lCel(ctx, 560, 460, 200, t, { eigenToon: q.on('stukjes', 1) }); regel(ctx, 'gezonde cel: eigen stukjes', 560, 730, 1, EIGEN, 28, 'center', 700);
      lCel(ctx, 1360, 460, 200, t, { a: gi, eigenToon: 1, toon: q.on('virus', 3), geinf: 1, seed: 6 }); regel(ctx, 'geïnfecteerde cel: ook stukjes virus', 1360, 730, gi, VIR, 28, 'center', 700);
      tag(ctx, 'hij verraadt zichzelf', 1360, 180, VIR, q.on('verraadt', 1));
      ctx.restore(); }
  },
  s10(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Vindt', 1), p1 = 1 - p2; const let_ = q.on('Let', 1);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const sh = -250 * let_; lCel(ctx, 1150 + sh, 470, 210, t, { eigenToon: 1, toon: 1, geinf: 1, seed: 6 }); const tx = lerp(500, 760, ramp(t, 0.5, 2)) + sh; tCel(ctx, tx, 400, 90, t, { col: TK, label: 'T-killercel' }); sleutel(ctx, tx + 120, 420, 1, 16, 1.2, q.on('receptor', 1), TK, q.on('past', 1)); naamBij(ctx, 'receptor', 'past op één stukje virus', tx + 10, 245, q.on('receptor', 1) * (1 - let_), 'center', TK);
      ctx.save(); ctx.globalAlpha *= let_; ctx.fillStyle = rgba('#0B0F16', 0.85); ctx.fillRect(1380, 120, 520, 520); bCel(ctx, 1480, 250, 50, 3, t); virus(ctx, 1640, 250, 26, [3], t); vink(ctx, 1800, 250, 24); regel(ctx, 'B-cel: los virus', 1640, 340, 1, BCOL, 28, 'center', 700);
        tCel(ctx, 1480, 470, 50, t, { col: TK }); virus(ctx, 1640, 410, 22, [3], t); kruis(ctx, 1800, 410, 20); lCel(ctx, 1650, 520, 50, t, { toon: 1, eigenToon: 1 }); vink(ctx, 1800, 520, 24); regel(ctx, 'T-cel: stukje op een cel', 1640, 610, 1, TK, 28, 'center', 700); ctx.restore();
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const br = ramp(t, q.at('breken'), 3), fg = q.on('Fagocyten', 1), op = ramp(t, q.at('Fagocyten'), 3);
      lCel(ctx, 960, 470, 220, t, { eigenToon: 1, toon: 1, geinf: 1 - q.on('afgebroken', 1), seed: 6, gaatjes: q.on('gaatjes', 1) * (1 - br), kapot: br * (1 - op * 0.9) });
      tCel(ctx, 640, 360, 90, t, { col: TK, a: 1 - 0.5 * fg }); vonk(ctx, 745, 395, q.on('stoffen', 1) * (1 - br), t);
      fagocyt(ctx, lerp(1600, 1100, ramp(t, q.at('Fagocyten'), 2)), 560, 110, t, { a: fg, arm: op, tx: 960, ty: 470 });
      const es = q.on('ontsnapt', 1); for (let i = 0; i < 3; i++) virus(ctx, 1450 + i * 120, 200 + i * 40, 26, [3], t, { a: es, rot: i, ast: k => k % 2 ? es : 0 });
      tag(ctx, 'gaatjes, en de cel breekt zichzelf af', 960, 860, TK, q.on('gaatjes', 1) * (1 - q.on('afgebroken', 1)));
      tag(ctx, 'het virus wordt mee afgebroken', 960, 860, VIR, q.on('afgebroken', 1) * (1 - fg));
      tag(ctx, 'fagocyten ruimen de resten op', 960, 860, WIT, fg * (1 - q.on('virusfabriek', 1)));
      tag(ctx, 'de virusfabriek is gestopt', 960, 860, C.goud, q.on('virusfabriek', 1) * (1 - es));
      tag(ctx, 'ontsnapte virussen: die vangen antistoffen', 960, 860, AS, es);
      ctx.restore(); }
  },
  s11(ctx, t, q) { bg(ctx, 'micro'); const cx = 960, cy = 460;
    const kl = q.on('kloon', 1), sig = q.on('signaalstoffen', 1);
    ctx.beginPath(); ctx.ellipse(cx, cy, 820, 340, 0, 0, 6.283); shape(ctx, rgba(LYMF, 0.06), rgba(LYMF, 0.6), 3); regel(ctx, 'lymfeknoop', cx + 760, cy - 300, 1, LYMF, 28, 'right', 700);
    fagocyt(ctx, 520, 430, 110, t, { label: 'fagocyt' }); for (let i = 0; i < 3; i++) { const an = -0.6 + i * 0.6; ctx.save(); ctx.translate(520 + Math.cos(an) * 110, 430 + Math.sin(an) * 100); ctx.rotate(an + 1.571); ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-11, 6); ctx.lineTo(-11, -10); ctx.moveTo(11, 6); ctx.lineTo(11, -10); ctx.stroke(); ctx.fillStyle = VIR; roundRect(ctx, -8, -16, 16, 12, 4); ctx.fill(); ctx.restore(); }
    const th = ramp(t, q.at('T-helpercel'), 2); tCel(ctx, lerp(900, 720, th), 400, 70, t, { col: TH, label: 'T-helpercel' }); vonk(ctx, 640, 410, q.on('past', 1) * (1 - kl), t);
    if (sig > 0.01) for (let i = 0; i < 10; i++) { const u = (t * 0.5 + i / 10) % 1; const tg = i % 2 ? [1180, 300] : [1180, 620]; circ(ctx, lerp(790, tg[0], u), lerp(400, tg[1], u), 6, rgba(C.goud, sig * (1 - u))); }
    bCel(ctx, 1260, 290, 60, 3, t, { a: sig, glow: sig * 0.5 }); regel(ctx, 'B-cel', 1360, 300, sig, BCOL, 26, 'left', 700);
    const n = kl > 0.01 ? Math.min(12, 1 + Math.floor(ramp(t, q.at('kloon') - 2, 4) * 11.9)) : 1;
    for (let i = 0; i < n; i++) { const gh = q.on('geheugencellen', 1) > 0.5 && i >= n - 3; const x = 1260 + (i % 6) * 70 - (n > 1 ? 175 : 0), y = 600 + Math.floor(i / 6) * 80; tCel(ctx, x, y, n > 1 ? 30 : 60, t, { col: TK, a: sig }); if (gh) { ctx.fillStyle = C.goud; ctx.font = fTekst(24, 700); ctx.textAlign = 'center'; ctx.fillText('★', x, y + 8); } }
    regel(ctx, 'T-killercel', 1360, 620, sig * (1 - kl), TK, 26, 'left', 700);
    tag(ctx, 'de fagocyt laat stukjes virus zien', 960, 860, VIR, q.on('fagocyt', 1) * (1 - q.on('past', 1)));
    tag(ctx, 'een passende T-helpercel geeft het startsein', 960, 860, TH, q.on('past', 1) * (1 - q.on('kloon', 1)));
    tag(ctx, 'kloon van T-killercellen, plus geheugencellen ★', 960, 860, TK, kl * (1 - q.on('humoraal', 1)));
    tag(ctx, 'humoraal: met antistoffen', 600, 860, AS, q.on('humoraal', 1)); tag(ctx, 'cellulair: cellen doden cellen', 1340, 860, TK, q.on('cellulaire', 1));
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    ctx.strokeStyle = rgba(NEUR, 0.8); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(560, 450); ctx.bezierCurveTo(900, 420, 1200, 520, 1640, 470); ctx.stroke(); blob(ctx, 480, 450, 120, 100, 0.05, 3, t); shape(ctx, rgba(NEUR, 0.2), NEUR, 3); circ(ctx, 480, 450, 34, rgba(C.kern, 0.6), C.kernR, 1.2); regel(ctx, 'zenuwcel', 480, 620, 1, NEUR, 28, 'center', 700);
    ctx.fillStyle = rgba('#E8C2A4', 0.5); ctx.fillRect(1640, 300, 200, 360); regel(ctx, 'huid', 1740, 700, 1, '#E8C2A4', 26, 'center', 700);
    const tr = ramp(t, q.at('terugkomen'), 2);
    for (let i = 0; i < 4; i++) virus(ctx, 450 + (i % 2) * 50, 420 + Math.floor(i / 2) * 50, 12, [3], t, { rot: i });
    if (tr > 0.01) for (let i = 0; i < 5; i++) { const u = clamp(tr * 1.5 - i * 0.12, 0, 1); virus(ctx, lerp(560, 1660, u), 450 + 20 * Math.sin(u * 3), 12, [3], t, { rot: i }); }
    const tz = 1 - 0.7 * q.on('minder', 1); for (let i = 0; i < 4; i++) { const an = t * 0.4 + i * 1.57; tCel(ctx, 480 + Math.cos(an) * 220, 450 + Math.sin(an) * 180, 34, t, { col: TK, a: q.on('T-cellen', 1) * tz }); }
    tag(ctx, 'T-cellen houden het virus in toom', 960, 180, TK, q.on('toom', 1) * (1 - q.on('minder', 1)));
    tag(ctx, 'later minder sterk: het virus komt terug', 960, 180, VIR, q.on('minder', 1) * (1 - q.on('gordelroos', 1)));
    tag(ctx, 'gordelroos', 1740, 250, C.koraal, q.on('gordelroos', 1));
    if (q.on('gordelroos', 1) > 0.01) for (let i = 0; i < 8; i++) circ(ctx, 1680 + hash(i) * 120, 330 + hash(i * 3) * 300, 10, rgba('#D8403A', q.on('gordelroos', 1)));
  },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const l = q.on('MHC', 2), r = q.on('twee', 1);
    lCel(ctx, 560, 470, 200, t, { mhc: q.on('MHC', 1), eigenToon: l, toon: l, geinf: l, seed: 6 }); regel(ctx, 'MHC-I: alle cellen met een kern', 560, 760, l, MHCK, 28, 'center', 700); regel(ctx, 'stukjes van binnen in de cel', 560, 800, q.on('binnen', 1), C.text2, 24, 'center');
    tCel(ctx, 200, 300, 60, t, { col: TK, a: q.on('T-killercellen', 1), label: 'T-killercel' });
    naamBij(ctx, 'MHC', 'houder', 790, 470, q.on('houders', 1) * (1 - l), 'left', MHCK);
    ctx.save(); ctx.globalAlpha *= r; fagocyt(ctx, 1360, 470, 170, t, { label: '' }); for (let i = 0; i < 6; i++) { const an = -1.4 + i * 0.55; ctx.save(); ctx.translate(1360 + Math.cos(an) * 172, 470 + Math.sin(an) * 155); ctx.rotate(an + 1.571); ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-11, 6); ctx.lineTo(-11, -10); ctx.moveTo(11, 6); ctx.lineTo(11, -10); ctx.stroke(); ctx.fillStyle = VIR; roundRect(ctx, -8, -16, 16, 12, 4); ctx.globalAlpha *= q.on('buiten', 1); ctx.fill(); ctx.restore(); }
      regel(ctx, 'MHC-II: antigeenpresenterende cellen', 1360, 760, 1, C.goud, 28, 'center', 700); regel(ctx, 'macrofagen · dendritische cellen · B-cellen', 1360, 800, q.on('macrofagen', 1), C.text2, 24, 'center'); regel(ctx, 'stukjes van wat ze van buiten opnamen', 1360, 840, q.on('buiten', 1), C.text2, 24, 'center');
      tCel(ctx, 1720, 280, 60, t, { col: TH, a: q.on('T-helpercellen', 1), label: 'T-helpercel' }); ctx.restore();
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Maar', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; thymus(ctx, 960, 450, 2.4); regel(ctx, 'thymus', 960, 760, 1, '#E8A0B0', 30, 'center', 700);
      for (let i = 0; i < 8; i++) { const x = 820 + (i % 4) * 95, y = 360 + Math.floor(i / 4) * 170; tCel(ctx, x, y, 34, t, { col: TK }); if (i === 2 || i === 5) kruis(ctx, x, y, 34, q.on('uitgeschakeld', 1)); }
      tag(ctx, 'T-cellen tegen eigen stoffen: uitgeschakeld', 960, 160, C.koraal, q.on('uitgeschakeld', 1)); ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const DON = '#5BA4C9';
      ctx.beginPath(); ctx.ellipse(1150, 470, 230, 300, 0.2, 0, 6.283); shape(ctx, rgba(DON, 0.08), rgba(DON, 0.5), 2); regel(ctx, 'nier van de donor', 1150, 820, q.on('nier', 1), DON, 28, 'center', 700);
      for (let i = 0; i < 4; i++) lCel(ctx, 1080 + (i % 2) * 150, 370 + Math.floor(i / 2) * 200, 65, t, { col: DON, mhc: 1, mhcCol: C.goud, seed: i, kapot: i === 0 ? ramp(t, q.at('vallen') + 1, 2) * 0.8 : 0 });
      lCel(ctx, 420, 640, 80, t, { mhc: q.on('verschillen', 1) }); regel(ctx, 'jouw cel', 420, 780, q.on('verschillen', 1), EIGEN, 26, 'center', 700); tCel(ctx, lerp(500, 920, ramp(t, q.at('vallen'), 2)), 380, 60, t, { col: TK, a: q.on('T-cellen', 2), label: 'jouw T-killercel' }); vonk(ctx, 990, 380, q.on('vallen', 1), t);
      tag(ctx, 'MHC verschilt per persoon', 960, 140, MHCK, q.on('verschillen', 1) * (1 - q.on('vreemd', 1)));
      tag(ctx, 'vreemde MHC: je T-cellen vallen de nier aan', 960, 140, C.koraal, q.on('vreemd', 1) * (1 - q.on('donor', 1)));
      tag(ctx, 'donor met zoveel mogelijk dezelfde MHC', 960, 140, C.groen, q.on('donor', 1) * (1 - q.on('medicijnen', 1)));
      tag(ctx, 'daarna: medicijnen die je afweer remmen', 960, 140, C.goud, q.on('medicijnen', 1));
      ctx.restore(); }
  },

  s15(ctx, t, q) { bg(ctx, 'schema'); const X = 300, Y = 220, Wg = 1100, Hg = 440;
    const u = 0.04 + 0.96 * ramp(t, q.at('eerste'), 12);
    const nb = q.on('Normaal', 1); if (nb > 0.01) { ctx.save(); ctx.globalAlpha *= nb; ctx.fillStyle = rgba(C.groen, 0.1); const y0 = Y + Hg - 1500 / 1600 * Hg, y1 = Y + Hg - 500 / 1600 * Hg; ctx.fillRect(X, y0, Wg, y1 - y0); regel(ctx, 'normaal 500–1500', X + Wg - 10, y0 + 34, 1, C.groen, 24, 'right', 700); ctx.restore(); }
    const ad = q.on('tweehonderd', 1); if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; const ya = Y + Hg - 200 / 1600 * Hg; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, ya); ctx.lineTo(X + Wg, ya); ctx.stroke(); ctx.setLineDash([]); regel(ctx, '200', X - 16, ya + 8, 1, C.koraal, 24, 'right', 700); ctx.restore(); }
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 1600, f: hivGrafiekT, u, xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: v => v + ' jr', yticks: [], xlab: 'tijd na besmetting', ylab: 'T-helpercellen per microliter', col: TH });
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 1600, f: s => hivGrafiekV(s), u, xticks: [], yticks: [], col: VIR });
    regel(ctx, '— T-helpercellen', X + Wg + 30, Y + 60, 1, TH, 26); regel(ctx, '— virus (relatief)', X + Wg + 30, Y + 100, 1, VIR, 26);
    tag(ctx, 'eerste weken: even grieperig', X + 20, 150, C.text2, q.on('grieperig', 1) * (1 - q.on('jaren', 1)), 'left');
    tag(ctx, 'jaren weinig klachten, gemiddeld ± 10 jaar', X + 200, 150, C.text2, q.on('jaren', 1) * (1 - q.on('Normaal', 1)), 'left');
    tag(ctx, 'aids: onder de 200', X + Wg - 20, Y + Hg - 200 / 1600 * Hg - 40, C.koraal, q.on('aids', 1), 'right');
    tag(ctx, 'longontsteking · schimmels in de mond', 960, 820, C.koraal, q.on('longontsteking', 1) * (1 - q.on('Hoe', 1)));
    vraagteken(ctx, 1620, 560, q.on('Hoe', 1), 120);
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const cx = 960, cy = 380; const rg = q.on('regelaar', 1);
    tCel(ctx, cx, cy, 80, t, { col: TH, label: 'T-helpercel', a: 1 - 0.6 * rg }); kruis(ctx, cx, cy, 70, rg);
    for (const [x, y, lab, f] of [[560, 640, 'B-cellen', 'b'], [1360, 640, 'T-killercellen', 'tk']]) { arrow(ctx, cx + (x < cx ? -60 : 60), cy + 70, x + (x < cx ? 40 : -40), y - 80, rgba(C.line, 1 - 0.7 * rg), 1, 3); if (f === 'b') bCel(ctx, x, y, 60, 3, t, { a: 1 - 0.6 * rg }); else tCel(ctx, x, y, 60, t, { col: TK, a: 1 - 0.6 * rg }); regel(ctx, lab, x, y + 110, 1, C.text2, 26, 'center', 700); regel(ctx, 'te weinig startsein', x, y + 150, rg, C.koraal, 24, 'center'); }
    const fg = q.on('fagocyten', 1); fagocyt(ctx, 300, 300, 70, t, { a: fg, label: 'fagocyten' }); vink(ctx, 300, 160, 24, fg); regel(ctx, 'niet genoeg', 300, 440, q.on('genoeg', 1), C.koraal, 24, 'center', 700);
    const mic = q.on('andere', 1); for (let i = 0; i < 7; i++) { const x = 1550 + hash(i) * 280, y = 180 + hash(i * 3) * 360; if (i % 2) bacterie(ctx, x, y, 1.2, hash(i) * 6, mic); else { ctx.save(); ctx.globalAlpha *= mic; circ(ctx, x, y, 14, rgba('#9AA3B2', 0.7), '#C9D2DE', 1.5); circ(ctx, x + 14, y + 6, 9, rgba('#9AA3B2', 0.7), '#C9D2DE', 1.5); ctx.restore(); } }
    regel(ctx, 'andere ziekteverwekkers', 1690, 590, mic, C.text2, 24, 'center', 700);
    tag(ctx, 'antwoord b: geen startsein meer', 960, 140, C.goud, q.on('bee', 1) * (1 - q.on('Maar', 1)));
    tag(ctx, 'niet van hiv zelf, maar van andere ziekteverwekkers', 960, 140, C.koraal, q.on('Maar', 1) * (1 - q.on('regelaar', 1)));
    tag(ctx, 'zonder regelaar: te weinig startsein', 960, 140, C.koraal, q.on('regelaar', 1) * (1 - q.on('specifieke', 1)));
    tag(ctx, 'je specifieke afweer werkt bijna niet meer', 960, 140, C.koraal, q.on('specifieke', 1));
  },
  s18(ctx, t, q) { bg(ctx, 'micro'); const cx = 1060, cy = 470;
    const rt = ramp(t, q.at('transcriptase'), 2), bw = ramp(t, q.at('bouwt'), 2.5), rna = q.on('RNA', 1);
    tCel(ctx, cx, cy, 300, t, { col: TH }); regel(ctx, 'T-helpercel', cx + 330, cy - 300, 1, TH, 28, 'left', 700);
    // eigen DNA in de kern
    ctx.save(); ctx.globalAlpha *= 0.9; for (const off of [0, 3.14]) { ctx.strokeStyle = off ? '#C9B8F0' : C.paars; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u2 = k / 60; const px = cx - 140 + u2 * 280, py = cy + 40 + Math.sin(u2 * 16 + off) * 14; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); regel(ctx, 'DNA van de cel', cx, cy + 100, 1, '#C9B8F0', 22, 'center', 700);
    virus(ctx, 260, 300, 70, [5], t, { col: '#C97A5F', rot: t * 0.05, a: 1 - 0.6 * rna }); regel(ctx, 'hiv', 260, 450, 1, VIR, 30, 'center', 700);
    const rx = cx - 230, ry = cy - 120;
    ctx.save(); ctx.globalAlpha *= rna * (1 - rt); ctx.strokeStyle = RNAK; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u2 = k / 40; const px = rx - 80 + u2 * 160, py = ry + Math.sin(u2 * 14 + t) * 14; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); regel(ctx, 'RNA van hiv', rx, ry - 34, 1, RNAK, 24, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= q.on('transcriptase', 1) * (1 - bw); blob(ctx, rx + 120, ry + 10, 40, 30, 0.1, 2, t); shape(ctx, rgba(C.paars, 0.5), C.paars, 2); regel(ctx, 'reverse transcriptase', rx + 120, ry + 70, 1, '#C9B8F0', 22, 'center', 700); ctx.restore();
    const dx = lerp(rx, cx, bw), dy = lerp(ry, cy + 40, bw);
    ctx.save(); ctx.globalAlpha *= rt; for (const off of [0, 3.14]) { ctx.strokeStyle = off ? '#F2A8A0' : VIR; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u2 = k / 20; const px = dx - 40 + u2 * 80, py = dy + Math.sin(u2 * 8 + off) * 12; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } regel(ctx, 'DNA van hiv', dx, dy - 30, rt * (1 - bw), '#F2A8A0', 22, 'center', 700); ctx.restore();
    tag(ctx, 'retrovirus', 600, 800, C.goud, q.on('retrovirus', 1) * (1 - q.on('genezen', 1)));
    tag(ctx, 'het zit voorgoed in je cellen: niet te genezen', 600, 800, C.koraal, q.on('genezen', 1) * (1 - q.on('hiv-remmers', 1)));
    tag(ctx, 'veel hiv-remmers remmen reverse transcriptase', 600, 800, C.paars, q.on('hiv-remmers', 1));
  },
  s19(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('medicijnen', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      const it = [['bloed', 'bloed', '#B5574A'], ['sperma', 'sperma', C.text2], ['vaginaal vocht', 'vaginaal', C.text2], ['moedermelk', 'moedermelk', C.text2]];
      regel(ctx, 'hiv gaat over via', 560, 220, 1, C.text, 34, 'center', 700); it.forEach(([s, w, col], i) => tag(ctx, s, 560, 320 + i * 100, col === C.text2 ? C.teal : col, q.on(w, 1)));
      regel(ctx, 'niet via', 1360, 220, q.on('zoenen', 1), C.text, 34, 'center', 700); tag(ctx, 'zoenen', 1360, 320, C.groen, q.on('zoenen', 1)); tag(ctx, 'knuffelen', 1360, 420, C.groen, q.on('knuffelen', 1));
      tag(ctx, 'een condoom beschermt', 960, 760, C.goud, q.on('condoom', 1));
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const X = 360, Y = 230, Wg = 1000, Hg = 400; const u = ramp(t, q.at('slikt'), 4);
      const V = s => s < 1 ? 900 : Math.max(30, 900 * Math.exp(-(s - 1) * 1.6)); const T = s => s < 1 ? 300 : 300 + 500 * (1 - Math.exp(-(s - 1) * 0.5));
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 1000, f: T, u, xticks: [], yticks: [], xlab: 'tijd met hiv-remmers', col: TH }); grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 1000, f: V, u, xticks: [], yticks: [], col: VIR });
      const ml = Y + Hg - 60 / 1000 * Hg; ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, ml); ctx.lineTo(X + Wg, ml); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'grens van meten', X + Wg + 20, ml + 8, q.on('meten', 1), C.text2, 24);
      regel(ctx, '— T-helpercellen', X + Wg + 20, Y + 40, 1, TH, 26); regel(ctx, '— virus', X + Wg + 20, Y + 80, 1, VIR, 26); pil(ctx, X + 0.1 * Wg, Y - 40, 0.6, 1, 0);
      tag(ctx, 'hiv-remmers: geen antibiotica', 960, 820, C.goud, q.on('antibiotica', 1) * (1 - q.on('genezen', 1)));
      tag(ctx, 'ze genezen niet: elke dag slikken', 960, 820, C.koraal, q.on('genezen', 1) * (1 - q.on('meten', 1)));
      tag(ctx, 'virus onmeetbaar laag, T-helpercellen op peil', 960, 820, C.groen, q.on('meten', 1) * (1 - q.on('seks', 1)));
      tag(ctx, 'onmeetbaar: via seks niet meer overdraagbaar', 960, 820, C.groen, q.on('seks', 1));
      ctx.restore(); }
  },
  s20(ctx, t, q) { slaapkamer(ctx, t, { opBed: 0, ma: 1, telefoon: 0 });
    const panel = q.on('virus', 1); ctx.fillStyle = rgba('#0B0F16', 0.85 * panel); ctx.fillRect(80, 110, 980, 620);
    const ch = [['een virus is geen cel: niets te remmen', 'celwand', 1, VIR], ['antistoffen vingen virussen tussen de cellen', 'Antistoffen', 1, AS], ['gekaapte cellen lieten stukjes virus zien', 'Gekaapte', 1, VIR], ['T-killercellen ruimden ze op', 'T-killercellen', 1, TK], ['T-helpercellen gaven het startsein', 'T-helpercellen', 1, TH], ['antwoord a', 'antwoord', 1, C.goud]];
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 570, 190 + i * 95, col, q.on(w, n) * (1 - q.on('oefenen', 1))));
    tag(ctx, 'volgende film: vaccins', 570, 400, C.groen, q.on('oefenen', 1));
  },
};
