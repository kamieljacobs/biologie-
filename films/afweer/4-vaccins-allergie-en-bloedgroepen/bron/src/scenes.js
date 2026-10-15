// Afweer 4 · Vaccins, allergie en bloedgroepen — scènes per alinea.
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

const HIST = '#C9A35C', BLD = '#B5574A', VOCHTK = '#5BA4C9';
function rodeBC(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C9483E', '#E07A6E', 1.2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function mestcel(ctx, x, y, r, a = 1, los = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.85, 0.05, 7, t); shape(ctx, rgba(HIST, 0.25), HIST, 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < 10; i++) { const an = hash(i) * 6.283, rr = r * (0.45 + 0.3 * hash(i * 3)); const out = los * (0.6 + 1.6 * ((t * 0.3 + hash(i * 7)) % 1)); circ(ctx, x + Math.cos(an) * (rr + out * r), y + Math.sin(an) * (rr + out * r), 4.5, rgba(HIST, 0.9 * (1 - Math.min(1, out * 0.35)))); }
  ctx.restore(); }
function haarvat(ctx, x0, x1, y, w, t, o = {}) { const { lek = 0, wbc = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 * w;
  ctx.fillStyle = rgba(BLD, 0.25 + 0.15 * (w - 1)); ctx.fillRect(x0, y - h, x1 - x0, 2 * h); ctx.strokeStyle = lighten(BLD, 0.2); ctx.lineWidth = 4; if (lek > 0.01) ctx.setLineDash([26, 10 * lek + 2]); ctx.beginPath(); ctx.moveTo(x0, y - h); ctx.lineTo(x1, y - h); ctx.moveTo(x0, y + h); ctx.lineTo(x1, y + h); ctx.stroke(); ctx.setLineDash([]);
  const n = Math.round(6 + 6 * (w - 1)); for (let i = 0; i < n; i++) { const v = (t * 0.15 * (1 + 0.6 * (w - 1)) + i / n) % 1; rodeBC(ctx, lerp(x0, x1, v), y + (hash(i) - 0.5) * h * 1.1, 15); }
  for (let i = 0; i < 8; i++) { const v = (t * 0.25 + i / 8) % 1; circ(ctx, x0 + hash(i * 3) * (x1 - x0), y - h - v * 140 * lek, 5, rgba(VOCHTK, 0.8 * lek * (1 - v))); }
  ctx.restore(); }

// ---------- film 4: bloedgroepen, vaccins, allergie ----------
const KA = '#5B9BEA', KB = '#D9A21E', KD = '#2DB585', RBC = '#C9483E', POL = '#E8C547', NURSE = { hair: '#2E2420', shirt: '#E6E1D3', hairStyle: 'short' };
// rode bloedcel met antigenen: typ 'A' | 'B' | 'AB' | 'O'; rh = D erop
function rbcAg(ctx, x, y, r, typ, o = {}) { const { a = 1, rh = false, kapot = 0, ag = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.6 * kapot);
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.92, 0, 0, 6.283); shape(ctx, RBC, '#E07A6E', 2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill();
  const ks = []; if (typ.includes('A')) ks.push(['A', 0, KA]); if (typ.includes('B')) ks.push(['B', 1, KB]); if (rh) ks.push(['D', 2, KD]);
  if (ks.length && ag > 0.01) { const n = 10; for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.15; const [, k, col] = ks[i % ks.length]; ctx.save(); ctx.globalAlpha *= ag; ctx.translate(x + Math.cos(an) * r * 1.08, y + Math.sin(an) * r * 0.99); ctx.rotate(an + 1.571); vormPad(ctx, k, r * 0.11); ctx.fillStyle = col; ctx.fill(); ctx.restore(); } }
  if (kapot > 0.01) { ctx.strokeStyle = rgba('#0B0F16', kapot); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y - r * 0.2); ctx.lineTo(x, y + r * 0.1); ctx.lineTo(x + r * 0.5, y - r * 0.4); ctx.stroke(); }
  ctx.restore(); }
// antistof tegen A, B of D: Y in de kleur van het antigeen
function antiY(ctx, x, y, s, ang, k, a = 1) { antistof(ctx, x, y, s, ang, a, k === 'A' ? KA : k === 'B' ? KB : KD); }
function spuit(ctx, x, y, s = 1, ang = -0.6, a = 1, vul = '#9FC3E0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -90, -18, 150, 36, 6); shape(ctx, rgba('#E6E1D3', 0.5), '#E6E1D3', 2); ctx.fillStyle = rgba(vul, 0.7); ctx.fillRect(-60, -14, 110, 28); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-120, -6, 30, 12); ctx.fillRect(-126, -22, 8, 44); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(120, 0); ctx.stroke(); ctx.restore(); }
function stuifmeel(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const an = i * 0.449 + t * 0.2; ctx.strokeStyle = POL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.stroke(); } circ(ctx, x, y, r, rgba(POL, 0.7), lighten(POL, 0.3), 2); ctx.restore(); }
function prikpost(ctx, t, o = {}) { const { prik = 0, kaart = 0, noorX = 760 } = o;
  ctx.fillStyle = '#3A4A5C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#56606E'; ctx.fillRect(0, 760, W, H - 760); ctx.fillStyle = rgba('#FFFFFF', 0.06); ctx.fillRect(0, 300, W, 12);
  roundRect(ctx, 1260, 160, 420, 150, 10); shape(ctx, '#2A3A58', '#8FA0B5', 3); regel(ctx, 'GGD · prikpost', 1470, 250, 1, C.text2, 30, 'center', 700);
  roundRect(ctx, 960, 560, 360, 30, 6); shape(ctx, '#8C6A44', '#6B4E3A', 2); ctx.fillStyle = '#6B4E3A'; ctx.fillRect(990, 590, 14, 170); ctx.fillRect(1276, 590, 14, 170);
  person(ctx, noorX, 900, 470, 1, { armR: { a1: 0.4, a2: 0.4 } });
  person(ctx, 1120, 900, 520, 1, Object.assign({}, NURSE, { armL: { a1: 1.8, a2: 1.6 } }));
  spuit(ctx, lerp(1000, noorX + 70, prik), lerp(500, 600, prik), 0.6, 3.3, 1);
  if (kaart > 0.01) { ctx.save(); ctx.globalAlpha *= kaart; ctx.translate(noorX - 230, 520); ctx.rotate(-0.08); roundRect(ctx, -150, -80, 300, 160, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); text(ctx, 'tweede prik', 0, -20, fTekst(30, 700), '#1A2740', 'center'); text(ctx, 'over een half jaar', 0, 26, fTekst(26, 600), '#1A2740', 'center'); ctx.restore(); }
}
function poppetje(ctx, x, y, s, col, a = 1, schild = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - 26 * s, 11 * s, col); roundRect(ctx, x - 12 * s, y - 12 * s, 24 * s, 34 * s, 10 * s); ctx.fillStyle = col; ctx.fill();
  if (schild > 0.01) { ctx.globalAlpha *= schild; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 4 * s, 30 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
function immuunTabel(ctx, x, y, cells, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = 380, ch = 110;
  regel(ctx, 'natuurlijk', x + cw * 1.5, y - 20, 1, C.text2, 28, 'center', 700); regel(ctx, 'kunstmatig', x + cw * 2.5, y - 20, 1, C.text2, 28, 'center', 700);
  ['actief', 'passief'].forEach((r, i) => { regel(ctx, r, x + cw - 20, y + ch * i + 66, 1, C.text2, 28, 'right', 700); for (let j = 0; j < 2; j++) { roundRect(ctx, x + cw * (1 + j) + 6, y + ch * i + 6, cw - 12, ch - 12, 12); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 1.5); const c = cells[i * 2 + j]; if (c && c[1] > 0.01) regel(ctx, c[0], x + cw * (1.5 + j), y + ch * i + 66, c[1], c[2] || C.text, 28, 'center', 700); } });
  ctx.restore(); }
function prikCurve(s) { const p = s < 0.3 ? 0 : (s < 2 ? 12 * Math.exp(-Math.pow((s - 2) / 0.7, 2)) : 3 + 9 * Math.exp(-(s - 2) * 0.9)); if (s < 6) return p; const sec = s < 6.8 ? Math.max(3, 100 * Math.exp(-Math.pow((s - 6.8) / 0.35, 2))) : 25 + 75 * Math.exp(-(s - 6.8) * 0.5); return sec; }
function serumCurve(s) { return s < 0.15 ? 600 * s : 90 * Math.exp(-(s - 0.15) * 0.22); }
function moederKind(ctx, x, y, s, t, o = {}) { const { a = 1, kindRh = true, antiD = 0, kapot = 0, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 230 * s, 260 * s, 0, 0, 6.283); shape(ctx, rgba(C.mens || '#E8A0B0', 0.08), rgba('#E8A0B0', 0.6), 2); regel(ctx, 'moeder: resusnegatief', x, y - 270 * s - 10, 1, C.text2, 24, 'center', 700);
  ctx.beginPath(); ctx.ellipse(x, y + 60 * s, 110 * s, 120 * s, 0, 0, 6.283); shape(ctx, rgba('#E8A0B0', 0.12), '#E8A0B0', 2); ctx.strokeStyle = rgba('#C9708F', 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y - 60 * s, 40 * s, 0.2, 2.9); ctx.stroke(); regel(ctx, 'placenta', x + 70 * s, y - 90 * s, 1, '#C9708F', 20, 'left', 700);
  for (let i = 0; i < 4; i++) rbcAg(ctx, x - 50 * s + (i % 2) * 90 * s, y + 30 * s + Math.floor(i / 2) * 80 * s, 26 * s, 'O', { rh: kindRh, kapot });
  for (let i = 0; i < 4; i++) rbcAg(ctx, x - 170 * s + i * 30 * s, y - 160 * s + (i % 2) * 40 * s, 22 * s, 'O');
  if (antiD > 0.01) for (let i = 0; i < 6; i++) { const u = (t * 0.2 + i / 6) % 1; antiY(ctx, x + 150 * s - u * 130 * s, y - 120 * s + u * 180 * s + 20 * Math.sin(i), 0.35 * s, i, 'D', antiD); }
  if (label) regel(ctx, label, x, y + 300 * s, 1, C.text, 26, 'center', 700);
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1500, cy = 470;
    rbcAg(ctx, cx - 120, cy - 80, 80, 'A', { rh: true }); rbcAg(ctx, cx + 110, cy + 60, 80, 'B'); rbcAg(ctx, cx - 60, cy + 180, 70, 'O');
    for (let i = 0; i < 5; i++) { const u = (t * 0.1 + i / 5) % 1; antiY(ctx, cx + 260 - u * 140, cy - 200 + i * 80, 0.5, -1.2 + u, i % 2 ? 'A' : 'B', Math.min(1, (1 - u) * 3)); }
    spuit(ctx, cx - 300, cy - 230, 0.9, 0.5); },

  s01(ctx, t, q) { prikpost(ctx, t, { prik: ramp(t, q.at('prik'), 1.5), kaart: q.on('kaartje', 1) });
    vraagteken(ctx, 760, 260, q.on('Waarom', 1), 140); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('vaccin', 1), p3 = q.on('recept', 1);
    if (1 - p2 > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - p2; virus(ctx, 620, 450, 90, [3], t, { rot: t * 0.05 }); label(ctx, 'antigenen', '', 620 + 90 * 1.42 * Math.cos(-0.5), 450 + 90 * 1.42 * Math.sin(-0.5) - 10, 820, 220, q.on('antigenen', 1), VORMKL[3], 'left'); bCel(ctx, 1300, 450, 100, 3, t, { soort: 'geheugen', label: 'geheugencel', a: q.on('geheugencellen', 1) }); ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3);
      spuit(ctx, 960, 210, 1.2, 0); regel(ctx, 'vaccin: antigenen, maar je wordt niet ziek', 960, 310, q.on('ziek', 2), C.text, 30, 'center', 700);
      const it = [['verzwakt', 'verzwakte', (x, y) => virus(ctx, x, y, 50, [3], t, { a: 0.45 })], ['gedood', 'gedode', (x, y) => { virus(ctx, x, y, 50, [3], t); kruis(ctx, x, y, 34, 1, C.text2); }], ['een stukje', 'stukje', (x, y) => { for (let i = 0; i < 3; i++) antigeen(ctx, x - 40 + i * 40, y, 3, 16); }], ['onschadelijk gif', 'gif', (x, y) => { for (let i = 0; i < 6; i++) circ(ctx, x - 50 + i * 20, y + 10 * Math.sin(i), 9, rgba(C.paars, 0.7)); vink(ctx, x + 70, y - 30, 16); }], ['mRNA: recept', 'mRNA', (x, y) => { ctx.strokeStyle = RNAK; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = x - 60 + u * 120, py = y + Math.sin(u * 12 + t) * 12; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }]];
      it.forEach(([lab, w, dr], i) => { const x = 260 + i * 350, y = 560, al = q.on(w, 1); if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 150, y - 110, 300, 250, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); dr(x, y - 10); regel(ctx, lab, x, y + 110, 1, C.text, 28, 'center', 700); ctx.restore(); } });
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const br = q.on('breken', 1);
      lCel(ctx, 900, 470, 230, t, { col: EIGEN }); for (let i = 0; i < 8; i++) { const an = i * 0.785; antigeen(ctx, 900 + Math.cos(an) * 248, 470 + Math.sin(an) * 222, 3, 16, an + 1.571, q.on('maken', 1)); }
      ctx.save(); ctx.globalAlpha *= 1 - br; ctx.strokeStyle = RNAK; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = 960 + u * 120, py = 380 + Math.sin(u * 12 + t) * 12; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); regel(ctx, 'mRNA-recept', 1020, 350, 1, RNAK, 24, 'center', 700); ctx.restore();
      label(ctx, 'eiwit van het virus', 'door je eigen cel gemaakt', 900 + 248 * Math.cos(-0.785), 470 + 222 * Math.sin(-0.785), 1300, 180, q.on('maken', 1), VORMKL[3], 'left');
      tag(ctx, 'het recept wordt afgebroken', 960, 820, RNAK, br * (1 - q.on('DNA', 1))); tag(ctx, 'het komt niet in je DNA', 960, 820, C.groen, q.on('DNA', 1));
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const tb = q.on('kunstmatig', 1);
    if (1 - tb > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - tb;
      const dl = ramp(t, q.at('vermenigvuldigd'), 3); const n = 1 + Math.floor(dl * 7.99);
      for (let i = 0; i < n; i++) bCel(ctx, 400 + (i % 4) * 110, 380 + Math.floor(i / 4) * 120, 44, 3, t, { soort: q.on('geheugencellen', 1) > 0.5 && i > n - 3 ? 'geheugen' : 'b', seed: i });
      for (let i = 0; i < n; i++) tCel(ctx, 1000 + (i % 4) * 110, 380 + Math.floor(i / 4) * 120, 40, t, { col: TK });
      regel(ctx, 'B-cellen', 565, 280, q.on('B-cellen', 1), BCOL, 28, 'center', 700); regel(ctx, 'T-cellen', 1165, 280, q.on('T-cellen', 1), TK, 28, 'center', 700);
      tag(ctx, 'pijnlijke arm, wat koorts: je afweer aan het werk', 960, 760, C.koraal, q.on('pijnlijke', 1) * (1 - q.on('actieve', 1)));
      tag(ctx, 'actieve immunisatie: je maakt zelf de afweer', 960, 760, C.goud, q.on('actieve', 1));
      ctx.restore(); }
    immuunTabel(ctx, 160, 340, [['infectie (waterpokken)', q.on('natuurlijk', 1)], ['vaccin', 1, C.goud], null, null], tb);
  },
  s06(ctx, t, q) { bg(ctx, 'schema'); const X = 300, Y = 230, Wg = 1080, Hg = 440;
    const u = 0.32 * ramp(t, q.at('eerste', 2), 4) + 0.68 * ramp(t, q.at('tweede', 3), 8);
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 110, f: prikCurve, u, xticks: [], yticks: [], xlab: 'tijd', ylab: 'hoeveelheid antistoffen', col: AS });
    spuit(ctx, X + 0.02 * Wg, Y + Hg + 60, 0.4, -1.571); regel(ctx, '1e prik', X + 0.02 * Wg + 30, Y + Hg + 70, 1, C.text2, 24); spuit(ctx, X + 0.6 * Wg, Y + Hg + 60, 0.4, -1.571, q.on('tweede', 3)); regel(ctx, '2e prik (dezelfde)', X + 0.6 * Wg + 30, Y + Hg + 70, q.on('tweede', 3), C.text2, 24);
    tag(ctx, 'de tweede prik is meestal precies dezelfde', 960, 150, C.text2, q.on('dezelfde', 1) * (1 - q.on('primaire', 1)));
    tag(ctx, 'primaire reactie: traag en laag', X + 0.02 * Wg, 150, AS, q.on('primaire', 1) * (1 - q.on('secundaire', 1)), 'left');
    tag(ctx, 'wel al geheugencellen ★', X + 0.02 * Wg, 290, C.goud, q.on('geheugencellen', 1) * (1 - q.on('secundaire', 1)), 'left');
    tag(ctx, 'secundaire reactie: snel, veel meer antistoffen', X + 0.62 * Wg, 150, AS, q.on('secundaire', 1), 'left');
    tag(ctx, 'bescherming voor jaren', X + Wg - 20, 300, C.groen, q.on('jaren', 1), 'right');
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    const hi = q.on('mazelen', 1); const cols = 16, rows = 7;
    for (let i = 0; i < cols * rows; i++) { const r = Math.floor(i / cols), c = i % cols; const x = 260 + c * 90, y = 230 + r * 85; const ziek0 = i === 50; const baby = i === 52 || i === 85; const vac = !baby && !ziek0 && (hi > 0.5 ? (hash(i * 3) < 0.95) : (hash(i * 3) < 0.4)); const dist = Math.hypot(c - 2, r - 3);
      const spread = (1 - hi) * ramp(t, 1.5, 3) * 6; const ziek = ziek0 || (!vac && dist < spread);
      poppetje(ctx, x, y + (baby ? 8 : 0), baby ? 0.65 : 1, ziek ? C.koraal : vac ? '#5B7FA0' : C.text2, 1, vac ? 1 : 0);
      if (baby && q.on("baby's", 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on("baby's", 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 34, 0, 6.283); ctx.stroke(); ctx.restore(); } }
    tag(ctx, 'te weinig gevaccineerd: de ziekte verspreidt zich', 960, 140, C.koraal, 1 - hi);
    tag(ctx, 'mazelen: ± 95 % gevaccineerd', 960, 140, C.teal, hi * (1 - q.on('beschermd', 1)));
    tag(ctx, "ook baby's en mensen met een zwakke afweer beschermd", 960, 140, C.goud, q.on('beschermd', 1) * (1 - q.on('groepsimmuniteit', 1)));
    tag(ctx, 'groepsimmuniteit', 960, 140, C.groen, q.on('groepsimmuniteit', 1));
    poppetje(ctx, 320, 860, 0.8, '#5B7FA0', 1, 1); regel(ctx, 'gevaccineerd', 350, 868, 1, C.text2, 22); poppetje(ctx, 600, 860, 0.8, C.text2); regel(ctx, 'niet gevaccineerd', 630, 868, 1, C.text2, 22); poppetje(ctx, 920, 860, 0.8, C.koraal); regel(ctx, 'ziek', 950, 868, 1, C.text2, 22);
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    roundRect(ctx, 260, 380, 700, 170, 80); shape(ctx, SKINS[1], '#A87A5A', 3); ctx.strokeStyle = '#8C2A2A'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(520, 430); ctx.lineTo(640, 500); ctx.stroke(); for (let i = 0; i < 6; i++) bacterie(ctx, 520 + hash(i) * 140, 420 + hash(i * 3) * 90, 0.6, i, q.on('vuile', 1));
    regel(ctx, 'diepe, vuile wond', 610, 620, q.on('wond', 1), C.text2, 28, 'center', 700);
    const se = q.on('serum', 1); spuit(ctx, 1250, 360, 1.3, 0.3, se, AS); regel(ctx, 'serum: kant-en-klare antistoffen', 1300, 520, se, AS, 28, 'center', 700);
    for (let i = 0; i < 8; i++) { const u = (t * 0.25 + i / 8) % 1; antistof(ctx, lerp(1150, 700, u), 420 + 40 * Math.sin(i * 2 + u * 6), 0.4, u * 4 + i, q.on('meteen', 1) * Math.min(1, (1 - u) * 3)); }
    vraagteken(ctx, 1500, 700, q.on('hoe', 1), 120); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('baby', 1), p1 = 1 - p2; const X = 300, Y = 230, Wg = 1000, Hg = 400;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const u = ramp(t, q.at('weken'), 3);
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 100, f: serumCurve, u: 0.05 + 0.95 * u, xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: v => v + ' wk', yticks: [], xlab: 'tijd na de injectie', ylab: 'antistoffen uit het serum', col: AS });
      tag(ctx, 'geen B-cel, dus geen geheugencel', 1880, 300, C.koraal, q.on('geheugencel', 1) * (1 - q.on('passieve', 1)), 'right');
      tag(ctx, 'passieve immunisatie: meteen, maar tijdelijk', 960, 150, AS, q.on('passieve', 1));
      spuit(ctx, 1500, 560, 0.8, 0, q.on('tegelijk', 1)); regel(ctx, '+ meteen een vaccin', 1500, 640, q.on('tegelijk', 1), C.goud, 26, 'center', 700);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      circ(ctx, 460, 300, 70, rgba('#E8A0B0', 0.2), '#E8A0B0', 2); regel(ctx, 'moeder', 460, 410, 1, '#E8A0B0', 26, 'center', 700); circ(ctx, 760, 320, 44, rgba('#E8A0B0', 0.2), '#E8A0B0', 2); regel(ctx, 'baby', 760, 400, 1, '#E8A0B0', 26, 'center', 700);
      for (let i = 0; i < 4; i++) { const u = (t * 0.3 + i / 4) % 1; antistof(ctx, lerp(530, 715, u), 300 + 10 * Math.sin(u * 6), 0.3, 1.571, 1); } regel(ctx, 'via placenta en moedermelk', 610, 230, q.on('placenta', 1), C.text2, 24, 'center', 700);
      immuunTabel(ctx, 160, 520, [['infectie', 1], ['vaccin', 1, C.goud], ['placenta, moedermelk', q.on('placenta', 1), '#E8A0B0'], ['serum', 1, AS]], 1);
      ctx.restore(); }
  },
  s11(ctx, t, q) { ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 620, W, H - 620); for (let i = 0; i < 60; i++) { ctx.strokeStyle = '#4A7040'; ctx.lineWidth = 3; const x = hash(i) * W; ctx.beginPath(); ctx.moveTo(x, 640 + hash(i * 3) * 200); ctx.lineTo(x + 6, 600 + hash(i * 3) * 200); ctx.stroke(); }
    person(ctx, 520, 900, 470, 1, { armR: { a1: -1.6, a2: -2.4 } });
    for (let i = 0; i < 26; i++) { const u = (t * 0.05 + hash(i)) % 1; stuifmeel(ctx, 900 + u * 900 - 600 * hash(i * 7), 200 + hash(i * 3) * 400 + 30 * Math.sin(t + i), 8, t, q.on('stuifmeel', 1)); }
    tag(ctx, 'niezen · loopneus · jeukende ogen', 520, 330, C.koraal, q.on('niezen', 1) * (1 - q.on('stuifmeel', 1)));
    tag(ctx, 'stuifmeel: eigenlijk onschuldig', 1300, 150, POL, q.on('onschuldig', 1));
    vraagteken(ctx, 960, 420, q.on('Wat', 1), 130); },

  s13(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('allergeen', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(400, 460); ctx.lineTo(1520, 460); ctx.stroke(); regel(ctx, 'te zwak', 400, 520, 1, C.text2, 30, 'center', 700); regel(ctx, 'normaal', 960, 520, 1, C.text2, 30, 'center', 700); regel(ctx, 'te sterk', 1520, 520, 1, C.koraal, 30, 'center', 700);
      const px = lerp(400, 1520, ramp(t, q.at('andersom'), 1.5) * 0.5 + 0.5 * (q.on('andersom', 1) > 0 ? 1 : 0) * 0 + 0.0); const mx = q.on('andersom', 1) > 0.01 ? lerp(400, 1520, q.on('andersom', 1)) : 400; circ(ctx, mx, 460, 22, C.goud);
      tag(ctx, 'antwoord c: een te sterke reactie', 960, 300, C.goud, q.on('cee', 1) * (1 - q.on('Misschien', 1))); tag(ctx, 'een allergie is geen zwakke afweer', 960, 300, C.koraal, q.on('zwakke', 1));
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      stuifmeel(ctx, 260, 300, 40, t); regel(ctx, 'allergeen (stuifmeel)', 260, 400, 1, POL, 26, 'center', 700);
      const pc = q.on('Plasmacellen', 1); bCel(ctx, 640, 470, 110, 3, t, { soort: 'plasma', a: pc, label: 'plasmacel' });
      const vz = ramp(t, q.at('vastzitten'), 3);
      for (let i = 0; i < 8; i++) { const u = (t * 0.2 + i / 8) % 1; if (vz < 0.99) antistof(ctx, lerp(760, 1100, u), 470 + 120 * Math.sin(i * 1.7) * u, 0.4, u * 5 + i, pc * (1 - vz) * Math.min(1, (1 - u) * 3)); }
      mestcel(ctx, 1380, 470, 150, q.on('mestcellen', 1), 0, t); regel(ctx, 'mestcel', 1380, 680, q.on('mestcellen', 1), HIST, 28, 'center', 700);
      for (let i = 0; i < 9; i++) { const an = -2.6 + i * 0.4; antistof(ctx, 1380 + Math.cos(an) * 190, 470 + Math.sin(an) * 190, 0.38, an + 1.571, vz); }
      tag(ctx, 'eerste contact: nog geen klachten', 960, 170, C.text2, q.on('eerste', 1) * (1 - q.on('Plasmacellen', 1)));
      tag(ctx, 'antistoffen gaan vastzitten op mestcellen', 960, 170, AS, q.on('vastzitten', 1) * (1 - q.on('splinter', 1)));
      tag(ctx, 'mestcellen: ook bij de splinter (film 1)', 960, 170, HIST, q.on('splinter', 1));
      ctx.restore(); }
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    const bi = ramp(t, q.at('bindt'), 2), hs = q.on('histamine', 1), wd = ramp(t, q.at('wijder'), 2), lk = ramp(t, q.at('lekken'), 2), ah = q.on('antihistaminica', 1);
    haarvat(ctx, 160, 1760, 720, 1 + 0.5 * wd * (1 - 0.6 * ah), t, { lek: lk * (1 - 0.8 * ah) });
    mestcel(ctx, 900, 360, 140, 1, hs * (1 - ah * 0.8), t); for (let i = 0; i < 9; i++) { const an = -2.6 + i * 0.4; antistof(ctx, 900 + Math.cos(an) * 180, 360 + Math.sin(an) * 180, 0.36, an + 1.571); }
    for (let i = 0; i < 3; i++) { const an = -2.2 + i * 0.8; stuifmeel(ctx, lerp(900 + Math.cos(an) * 520, 900 + Math.cos(an) * 238, bi), lerp(360 + Math.sin(an) * 420, 360 + Math.sin(an) * 238, bi), 22, t); }
    if (ah > 0.01) { ctx.save(); ctx.globalAlpha *= ah; pil(ctx, 1450, 300, 1); regel(ctx, 'antihistaminicum', 1450, 400, 1, C.text, 26, 'center', 700); ctx.restore(); }
    tag(ctx, 'volgend contact: het stuifmeel bindt aan de antistoffen', 960, 860, POL, q.on('bindt', 1) * (1 - hs));
    tag(ctx, 'mestcellen geven histamine af', 960, 860, HIST, hs * (1 - q.on('wijder', 1)));
    tag(ctx, 'haarvaten wijder en lekken vocht: loopneus, jeuk', 960, 860, VOCHTK, q.on('wijder', 1) * (1 - ah));
    tag(ctx, 'antihistaminica blokkeren de werking van histamine', 960, 860, C.text2, ah * (1 - q.on('pinda', 1)));
    tag(ctx, "pinda's, wespensteken: soms levensgevaarlijk", 960, 860, C.koraal, q.on('pinda', 1));
  },
  s15(ctx, t, q) { bg(ctx, 'micro'); const BC = '#7FC4A8';
    ctx.beginPath(); ctx.ellipse(1000, 470, 380, 280, 0, 0, 6.283); shape(ctx, rgba(BC, 0.06), rgba(BC, 0.5), 2); regel(ctx, 'eilandje in de alvleesklier', 1000, 800, q.on('alvleesklier', 1), BC, 26, 'center', 700);
    const at = ramp(t, q.at('vallen'), 3);
    for (let i = 0; i < 7; i++) { const an = i * 0.9, d = i ? 170 : 0; lCel(ctx, 1000 + Math.cos(an) * d, 470 + Math.sin(an) * d * 0.75, 70, t, { col: BC, seed: i, mhc: 1, eigenToon: 1, kapot: i < 3 ? 0.8 * Math.max(0, (at - 0.7) / 0.3) : 0 }); }
    for (let i = 0; i < 3; i++) { const an = 2.6 + i * 0.5; tCel(ctx, lerp(1000 + Math.cos(an) * 620, 1000 + Math.cos(i * 0.9) * (i ? 170 : 0) - 90, at), lerp(470 + Math.sin(an) * 420, 470 + Math.sin(i * 0.9) * (i ? 128 : 0), at), 46, t, { col: TK, a: q.on('ontsnappen', 1) }); }
    tag(ctx, 'auto-immuunziekte: je afweer ziet eigen cellen als vreemd', 960, 130, C.koraal, q.on('auto-immuunziekte', 1) * (1 - q.on('uitgeschakeld', 1)));
    tag(ctx, 'normaal worden zulke afweercellen uitgeschakeld', 960, 130, C.text2, q.on('uitgeschakeld', 1) * (1 - q.on('ontsnappen', 1)));
    tag(ctx, 'soms ontsnappen er een paar', 960, 130, TK, q.on('ontsnappen', 1) * (1 - q.on('diabetes', 1)));
    tag(ctx, 'diabetes type 1: T-killercellen doden de insulinemakers', 960, 130, TK, q.on('diabetes', 1) * (1 - q.on('spuiten', 1)));
    tag(ctx, 'levenslang insuline spuiten', 960, 130, C.goud, q.on('spuiten', 1));
  },
  s16(ctx, t, q) { bg(ctx, 'micro');
    const ve = ramp(t, q.at('verbindt'), 2);
    mestcel(ctx, 900, 560, 220, 1, q.on('geeft', 1), t); regel(ctx, 'mestcel', 900, 860, 1, HIST, 28, 'center', 700);
    const ys = [-2.2, -1.75, -1.35, -0.9]; ys.forEach((an, i) => antistof(ctx, 900 + Math.cos(an) * 270, 560 + Math.sin(an) * 270, 0.7, an + 1.571, q.on('IgE', 1)));
    naamBij(ctx, 'IgE', 'steel vast op de mestcel', 1135, 336, q.on('steel', 1), 'left', AS);
    const mx = (900 + Math.cos(-1.75) * 330 + 900 + Math.cos(-1.35) * 330) / 2, my = (560 + Math.sin(-1.75) * 330 + 560 + Math.sin(-1.35) * 330) / 2;
    stuifmeel(ctx, lerp(mx, mx, 1), lerp(80, my, ve), 34, t, q.on('allergeen', 1)); regel(ctx, 'allergeen verbindt twee IgE', mx - 60, lerp(80, my, ve), q.on('allergeen', 1), POL, 24, 'right', 700);
  },
  s17(ctx, t, q) { bg(ctx, 'micro');
    const g = [['A', 'antigeen', 1, 'A', ['B']], ['B', 'antigeen', 2, 'B', ['A']], ['AB', 'allebei', 1, 'AB', []], ['O', 'beide', 1, 'O', ['A', 'B']]];
    const pl = q.on('plasma', 1);
    g.forEach(([lab, w, n, typ, anti], i) => { const x = 330 + i * 420, al = q.on(w, n); if (al < 0.01) return; ctx.save(); ctx.globalAlpha *= al; rbcAg(ctx, x, 340, 100, typ); regel(ctx, 'bloedgroep ' + lab, x, 500, 1, C.text, 32, 'center', 700);
      ctx.globalAlpha *= pl; roundRect(ctx, x - 170, 560, 340, 240, 20); shape(ctx, rgba('#E8D27A', 0.12), rgba('#E8D27A', 0.5), 1.5); regel(ctx, 'plasma', x, 600, 1, C.text2, 22, 'center', 700);
      anti.forEach((k, j) => { for (let m = 0; m < 3; m++) antiY(ctx, x - 100 + m * 60 + j * 30, 660 + j * 50 + 10 * Math.sin(t + m), 0.4, 0.3 * Math.sin(m + j), k); }); regel(ctx, anti.length ? 'anti-' + anti.join(' en anti-') : 'geen anti-A of anti-B', x, 788, 1, C.text2, 22, 'center', 700); ctx.restore(); });
    tag(ctx, 'al vanaf je eerste levensjaar', 960, 140, C.goud, q.on('levensjaar', 1));
  },
  s18(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('bepaal', 1), p3 = q.on('mag', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const kl = ramp(t, q.at('klonteren'), 2.5), kp = q.on('kapot', 1);
      regel(ctx, 'ontvanger: bloedgroep A, met anti-B', 960, 150, 1, C.text, 30, 'center', 700);
      for (let i = 0; i < 6; i++) { const far = [[400, 300], [600, 650], [900, 260], [1200, 680], [1450, 320], [1600, 600]][i]; rbcAg(ctx, lerp(far[0], 900 + (i % 3) * 110, kl), lerp(far[1], 420 + Math.floor(i / 3) * 110, kl), 50, 'B', { kapot: kp }); }
      for (let i = 0; i < 8; i++) { const x0 = 300 + hash(i * 5) * 1300, y0 = 250 + hash(i * 9) * 450; antiY(ctx, lerp(x0, 955 + (i % 4) * 55, kl), lerp(y0, 475 + Math.floor(i / 4) * 110 - 55, kl), 0.4, i, 'B'); }
      regel(ctx, 'rode bloedcellen van donor B', 600, 800, 1, KB, 26, 'center', 700);
      tag(ctx, 'ze klonteren samen, en gaan kapot', 1300, 820, C.koraal, q.on('klonteren', 1));
      ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3); const sk = ramp(t, q.at('kijkt'), 2), as_ = q.on('antiserum', 1);
      [['anti-A', 'A', true], ['anti-B', 'B', false]].forEach(([lab, k, kl], i) => { const x = 700 + i * 520; circ(ctx, x, 470, 180, rgba('#E6E1D3', 0.08), '#C9D2DE', 3); regel(ctx, lab + '-serum', x, 720, 1, k === 'A' ? KA : KB, 30, 'center', 700);
        for (let j = 0; j < 9; j++) { const gx = x - 90 + (j % 3) * 90, gy = 380 + Math.floor(j / 3) * 90; const cx2 = x + (hash(j * 3 + i) - 0.5) * 110, cy2 = 470 + (hash(j * 7 + i) - 0.5) * 110; rbcAg(ctx, kl ? lerp(gx, cx2, sk) : gx, kl ? lerp(gy, cy2, sk) : gy, 26, 'A'); } for (let j = 0; j < 6; j++) antiY(ctx, x - 100 + (j % 3) * 100 + 20, 400 + Math.floor(j / 3) * 120 + 20, 0.3, j, k, as_); });
      regel(ctx, 'welke bloedgroep heeft deze druppel bloed?', 960, 200, 1, C.text, 30, 'center', 700); tag(ctx, 'klontert met anti-A, niet met anti-B: bloedgroep A', 960, 840, KA, sk);
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; rbcAg(ctx, 500, 450, 100, 'A'); regel(ctx, 'ontvanger A', 500, 610, 1, C.text, 28, 'center', 700); rbcAg(ctx, 960, 450, 90, 'B'); kruis(ctx, 960, 450, 60); regel(ctx, 'donor B', 960, 610, 1, C.text, 28, 'center', 700); rbcAg(ctx, 1420, 450, 90, 'O'); regel(ctx, 'donor O', 1420, 610, 1, C.text, 28, 'center', 700); vraagteken(ctx, 1420, 280, q.on('Waarom', 1), 110); ctx.restore(); }
  },
  s20(ctx, t, q) { bg(ctx, 'micro');
    rbcAg(ctx, 500, 400, 120, 'O'); regel(ctx, 'rode bloedcel O: geen A, geen B', 500, 580, q.on('rode', 1), C.text, 28, 'center', 700);
    const pl = q.on('plasma', 1); ctx.save(); ctx.globalAlpha *= pl; roundRect(ctx, 900, 260, 420, 260, 20); shape(ctx, rgba('#E8D27A', 0.12), rgba('#E8D27A', 0.5), 1.5); regel(ctx, 'plasma van O', 1110, 300, 1, C.text2, 24, 'center', 700); for (let m = 0; m < 4; m++) { antiY(ctx, 980 + m * 80, 380, 0.5, 0.2 * Math.sin(m + t), 'A'); antiY(ctx, 1000 + m * 80, 460, 0.5, 0.2 * Math.cos(m + t), 'B'); } regel(ctx, 'wél anti-A en anti-B', 1110, 560, 1, C.koraal, 26, 'center', 700); ctx.restore();
    const bb = q.on('bloedbank', 1); ctx.save(); ctx.globalAlpha *= bb; roundRect(ctx, 1450, 260, 200, 280, 30); shape(ctx, rgba(RBC, 0.6), '#E07A6E', 3); regel(ctx, 'alleen rode', 1550, 390, 1, C.text, 24, 'center', 700); regel(ctx, 'bloedcellen', 1550, 420, 1, C.text, 24, 'center', 700); ctx.restore();
    tag(ctx, 'antwoord b', 960, 140, C.goud, q.on('bee', 1) * (1 - q.on('plasma', 1)));
    tag(ctx, 'de antistoffen van de ontvanger hebben niets om op te binden', 960, 760, C.groen, q.on('ontvanger', 1) * (1 - q.on('universele', 1)));
    tag(ctx, 'O: universele donor voor rode bloedcellen', 960, 760, C.goud, q.on('universele', 1));
  },
  s21(ctx, t, q) { bg(ctx, 'micro');
    const rp = q.on('resuspositief', 1);
    rbcAg(ctx, 420, 360, 110, 'O', { rh: true, a: q.on('resusfactor', 1) }); regel(ctx, 'antigeen D: resuspositief', 420, 530, rp, KD, 28, 'center', 700); regel(ctx, '± 8 op de 10 mensen', 420, 570, q.on('acht', 1), C.text2, 24, 'center');
    const vz = q.on('vanzelf', 1); ctx.save(); ctx.globalAlpha *= q.on('anders', 1);
    roundRect(ctx, 800, 220, 460, 300, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); regel(ctx, 'anti-A, anti-B', 1030, 270, 1, C.text, 28, 'center', 700); for (let m = 0; m < 3; m++) { antiY(ctx, 900 + m * 60, 360, 0.45, 0, 'A'); antiY(ctx, 1080 + m * 60, 360, 0.45, 0, 'B'); } regel(ctx, 'heb je al, ook zonder contact', 1030, 480, 1, C.groen, 24, 'center', 700);
    roundRect(ctx, 1320, 220, 460, 300, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); regel(ctx, 'anti-D', 1550, 270, 1, C.text, 28, 'center', 700); for (let m = 0; m < 3; m++) antiY(ctx, 1480 + m * 60, 360, 0.45, 0, 'D', ramp(t, q.at('binnenkrijgt'), 2)); regel(ctx, 'pas na contact met D', 1550, 480, vz, C.koraal, 24, 'center', 700); ctx.restore();
    const un = q.on('resusnegatief', 1); ctx.save(); ctx.globalAlpha *= un; rbcAg(ctx, 620, 720, 60, 'O'); regel(ctx, 'O resusnegatief: rode bloedcellen voor iedereen', 620, 830, 1, C.goud, 26, 'center', 700); rbcAg(ctx, 1300, 720, 60, 'AB', { rh: true, a: q.on('resuspositief', 3) }); regel(ctx, 'AB resuspositief: universele ontvanger', 1300, 830, q.on('resuspositief', 3), C.goud, 26, 'center', 700); ctx.restore();
  },
  s22(ctx, t, q) { bg(ctx, 'micro');
    const k1 = 1, k2 = q.on('volgend', 1);
    moederKind(ctx, 520, 450, 1, t, { label: 'eerste kind: resuspositief', antiD: 0 });
    const bv = ramp(t, q.at('bevalling'), 2); for (let i = 0; i < 3; i++) rbcAg(ctx, lerp(520, 380 + i * 50, bv), lerp(510, 300, bv), 18, 'O', { rh: true, a: bv });
    const ad = q.on('geheugencellen', 1); for (let i = 0; i < 5; i++) antiY(ctx, 330 + i * 30, 260 + (i % 2) * 30, 0.32, i, 'D', ad); bCel(ctx, 700, 260, 26, 2, t, { soort: 'geheugen', a: ad });
    vink(ctx, 440, 800, 26, q.on('last', 1)); regel(ctx, 'meestal gezond', 480, 812, q.on('last', 1), C.groen, 24, 'left', 700);
    ctx.save(); ctx.globalAlpha *= k2; moederKind(ctx, 1380, 450, 1, t, { label: 'volgend kind: resuspositief', antiD: q.on('placenta', 1), kapot: q.on('afgebroken', 1) }); ctx.restore();
    tag(ctx, 'resusantagonisme', 1380, 140, C.koraal, q.on('resusantagonisme', 1));
  },
  s23(ctx, t, q) { bg(ctx, 'micro');
    spuit(ctx, 400, 220, 1.2, 0.3, q.on('anti-D', 1), KD); regel(ctx, 'anti-D-injectie', 400, 340, q.on('anti-D', 1), KD, 30, 'center', 700);
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 500); ctx.lineTo(760, 500); ctx.stroke(); for (const [x, s, w] of [[250, 'begin', ''], [520, '± 30 weken', 'dertigste'], [720, 'bevalling', 'bevalling']]) { circ(ctx, x, 500, 8, w ? rgba(KD, q.on(w, 1)) : C.line); regel(ctx, s, x, 550, w ? q.on(w, 1) : 1, C.text2, 24, 'center', 700); }
    const mk = q.on('markeren', 1), op = ramp(t, q.at('opgeruimd'), 2.5);
    for (let i = 0; i < 5; i++) { const x = 1100 + (i % 3) * 150, y = 330 + Math.floor(i / 3) * 170; rbcAg(ctx, x, y, 50, 'O', { rh: true, a: 1 - op }); for (let j = 0; j < 3; j++) antiY(ctx, x + Math.cos(j * 2.1) * 72, y + Math.sin(j * 2.1) * 68, 0.32, j * 2.1 - 1.571, 'D', mk * (1 - op)); }
    fagocyt(ctx, 1700, 420, 100, t, { a: op, arm: op, tx: 1300, ty: 420 }); regel(ctx, 'rode bloedcellen van het kind, in het bloed van de moeder', 1260, 700, 1, C.text2, 24, 'center', 700);
    tag(ctx, 'opgeruimd voordat haar afweer ze ziet', 1260, 800, C.groen, q.on('opgeruimd', 1) * (1 - q.on('geheugencellen', 1)));
    tag(ctx, 'geen geheugencellen: elke zwangerschap opnieuw', 1260, 800, C.goud, q.on('geheugencellen', 1));
  },
  s24(ctx, t, q) { prikpost(ctx, t, { prik: ramp(t, q.at('prik', 3), 1.5), kaart: 0 });
    const ch = [['eerste prik: oefenen, geheugencellen', 'oefenen', 1, BCOL], ['tweede prik: snel, veel meer antistoffen', 'snel', 1, AS], ['jarenlang beschermd', 'jarenlang', 1, C.groen], ['antwoord b', 'antwoord', 1, C.goud]];
    const pn = q.on('oefenen', 1); ctx.fillStyle = rgba('#0B0F16', 0.8 * pn); ctx.fillRect(1240, 340, 640, 400);
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1560, 420 + i * 90, col, q.on(w, n)));
  },
  s25(ctx, t, q) { bg(ctx, 'schema');
    const pn = [['film 1 · de splinter', 'splinter', (x, y) => { fagocyt(ctx, x - 40, y, 60, t, { arm: 0.6, tx: x + 60, ty: y }); bacterie(ctx, x + 70, y, 1.2, 0.3); }], ['film 2 · de waterpokken', 'waterpokken', (x, y) => { bCel(ctx, x - 40, y, 50, 3, t, { glow: 0.5 }); virus(ctx, x + 80, y, 30, [3], t); }], ['film 3 · de griep', 'griep', (x, y) => { lCel(ctx, x + 40, y, 60, t, { toon: 1, eigenToon: 1, geinf: 1 }); tCel(ctx, x - 80, y - 20, 36, t, { col: TK }); }], ['film 4 · het vaccin', 'vaccin', (x, y) => { spuit(ctx, x, y, 0.8, -0.3); }]];
    pn.forEach(([lab, w, dr], i) => { const x = 300 + i * 440, y = 430, al = q.on(w, 1); ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * al; roundRect(ctx, x - 190, y - 170, 380, 380, 24); shape(ctx, rgba(C.fill, 0.6), al > 0.5 ? C.goud : rgba(C.line, 0.4), al > 0.5 ? 3 : 1.5); dr(x, y - 10); regel(ctx, lab, x, y + 170, 1, C.text, 26, 'center', 700); ctx.restore(); });
    tag(ctx, 'dit was de laatste film', 960, 140, C.text2, q.on('laatste', 1) * (1 - q.on('splinter', 1)));
  },
  s26(ctx, t, q) { bg(ctx, 'micro');
    lCel(ctx, 600, 430, 150, t, { eigenToon: 1, mhc: 1 }); regel(ctx, 'eigen', 600, 640, 1, EIGEN, 32, 'center', 700); virus(ctx, 1320, 430, 100, [3], t, { rot: t * 0.05 }); regel(ctx, 'vreemd', 1320, 640, 1, VIR, 32, 'center', 700);
    regel(ctx, 'vormpjes op het oppervlak', 960, 200, q.on('vormpjes', 1), C.goud, 40, 'center', 700);
    tag(ctx, 'allergie: te sterk, op iets onschuldigs', 960, 760, POL, q.on('allergie', 1) * (1 - q.on('auto-immuunziekte', 1)));
    tag(ctx, 'auto-immuunziekte: eigen als vreemd', 960, 760, C.koraal, q.on('auto-immuunziekte', 1) * (1 - q.on('transfusie', 1)));
    tag(ctx, 'transfusie: de vormpjes moeten passen', 960, 760, RBC, q.on('transfusie', 1) * (1 - q.on('uitproberen', 1)));
    tag(ctx, 'probeer het zelf: Bloedgroepenlab', 960, 760, C.goud, q.on('uitproberen', 1));
  },
};
