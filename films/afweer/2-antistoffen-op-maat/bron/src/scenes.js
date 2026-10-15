// Afweer 2 · Antistoffen op maat — scènes per alinea.
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
function tCel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { const an = i * 0.9; ctx.strokeStyle = TCOL; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.stroke(); }
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

// ---------- woonkamer met Noor en Sam ----------
function kamer(ctx, t, o = {}) { const { sam = 1 } = o;
  ctx.fillStyle = '#3B3552'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#4A4262'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#5A4636'; ctx.fillRect(0, 760, W, H - 760);
  roundRect(ctx, 1240, 150, 380, 300, 10); shape(ctx, '#2A3A58', '#8FA0B5', 4); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1430, 150); ctx.lineTo(1430, 450); ctx.moveTo(1240, 300); ctx.lineTo(1620, 300); ctx.stroke();
  // bank
  roundRect(ctx, 150, 480, 900, 200, 40); shape(ctx, '#7A5A8C', '#5A4068', 3); roundRect(ctx, 110, 560, 120, 220, 40); shape(ctx, '#86659A', '#5A4068', 3); roundRect(ctx, 970, 560, 120, 220, 40); shape(ctx, '#86659A', '#5A4068', 3); roundRect(ctx, 200, 640, 820, 110, 30); shape(ctx, '#8E6CA2', '#5A4068', 3);
  person(ctx, 420, 900, 470, 1, { armR: { a1: 0.6, a2: 1.0 }, armL: { a1: 0.4, a2: 0.8 } });
  person(ctx, 760, 900, 360, sam, { skin: SKINS[1], hair: '#C9A35C', shirt: '#5BA4C9', hairStyle: 'short', armR: { a1: 0.5, a2: 0.6 }, armL: { a1: 0.3, a2: 0.5 } });
  // vlekjes bij Sam
  if (sam > 0.01) { ctx.save(); ctx.globalAlpha *= sam; const top = 900 - 360, hh = 360 / 6.6; for (let i = 0; i < 12; i++) circ(ctx, 760 + (hash(i * 7) - 0.5) * hh * 0.9, top + hh * (0.35 + hash(i * 3) * 0.8), 4, '#D8403A'); for (let i = 0; i < 10; i++) circ(ctx, 760 + (hash(i * 11) - 0.5) * hh * 1.6, top + hh * (1.6 + hash(i * 13) * 1.6), 5, '#D8403A'); ctx.restore(); }
}

// ---------- grafiek primaire en secundaire reactie ----------
const GX = 300, GY = 210, GW = 1080, GH = 470;
function antiCurve(s) { if (s < 6) { if (s < 0.3) return 0; const g = Math.exp(-Math.pow((s - 2.1) / (s < 2.1 ? 0.75 : 0.9), 2)); return s < 2.1 ? 8 * g : 2 + 6 * g; } const sec = s < 6.9 ? 100 * Math.exp(-Math.pow((s - 6.9) / 0.38, 2)) : 10 + 90 * Math.exp(-(s - 6.9) * 0.5); return Math.max(2, sec); }
function afweerGrafiek(ctx, u, t, o = {}) { const { ziek = 0, tweede = 0, vraag = 0 } = o;
  if (ziek > 0.01) { ctx.save(); ctx.globalAlpha *= ziek; ctx.fillStyle = rgba(C.koraal, 0.14); const x0 = GX + 0.2 / 10 * GW, x1 = GX + 2.6 / 10 * GW; ctx.fillRect(x0, GY, x1 - x0, GH); regel(ctx, 'ziek', (x0 + x1) / 2, GY + 100, 1, C.koraal, 30, 'center', 700); ctx.restore(); }
  grafiek(ctx, GX, GY, GW, GH, { xmax: 10, ymax: 110, f: antiCurve, u, xticks: [0, 1, 2, 6, 7, 8], xfmt: v => v < 6 ? v + ' wk' : '+' + (v - 6) + ' wk', yticks: [], xlab: 'tijd', ylab: 'hoeveelheid antistoffen', col: AS });
  ctx.save(); ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 3; const bx = GX + 4.3 / 10 * GW; for (const d of [-8, 8]) { ctx.beginPath(); ctx.moveTo(bx + d - 8, GY + GH + 14); ctx.lineTo(bx + d + 8, GY + GH - 14); ctx.stroke(); } ctx.restore();
  regel(ctx, 'maanden of jaren later', bx, GY + GH + 90, 1, C.text2, 24, 'center');
  const vx = GX + 0.02 * GW; ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, GY + 30); ctx.lineTo(vx, GY + GH); ctx.stroke(); ctx.restore(); regel(ctx, '1e besmetting', vx + 12, GY + 40, 1, C.text2, 24, 'left');
  if (tweede > 0.01) { const x6 = GX + 6 / 10 * GW; ctx.save(); ctx.globalAlpha *= tweede; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x6, GY + 30); ctx.lineTo(x6, GY + GH); ctx.stroke(); ctx.setLineDash([]); regel(ctx, '2e besmetting', x6 + 12, GY + 40, 1, C.koraal, 24, 'left'); ctx.restore(); }
  vraagteken(ctx, GX + 7 / 10 * GW, GY + 260, vraag, 130);
}

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1500, cy = 470;
    bCel(ctx, cx, cy, 130, 3, t, { soort: 'plasma' });
    for (let i = 0; i < 9; i++) { const u = (t * 0.12 + i / 9) % 1; const an = -0.9 + (i % 5) * 0.45; antistof(ctx, cx + Math.cos(an) * (170 + u * 280), cy + Math.sin(an) * (170 + u * 280), 0.55, an + 1.571 + t * 0.2, Math.min(1, (1 - u) * 3)); }
    virus(ctx, cx - 330, cy + 230, 50, [3, 1], t, { ast: i => i % 2 ? 1 : 0 }); },

  s01(ctx, t, q) { kamer(ctx, t);
    tag(ctx, 'Sam: waterpokken', 760, 460, C.koraal, q.on('vlekjes', 1) * (1 - q.on('Hoe', 2)));
    tag(ctx, 'Noor had het al, toen ze klein was', 1400, 560, BCOL, q.on('klein', 1));
    tag(ctx, 'nu: niet ziek', 1400, 680, C.groen, q.on('niet', 1));
    vraagteken(ctx, 420, 250, q.on('Hoe', 2), 140); },

  s04(ctx, t, q) { bg(ctx, 'micro');
    const pB = q.on('Weet', 1), pC = q.on('lymfocyten', 1); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      fagocyt(ctx, 520, 460, 150, t, { arm: 0.5 + 0.2 * Math.sin(t), tx: 760, ty: 420 }); bacterie(ctx, 760, 400, 1.4, 0.3); bacterie(ctx, 700, 600, 1.2, -0.6);
      regel(ctx, 'aspecifieke afweer', 520, 720, 1, WIT, 34, 'center', 700); regel(ctx, 'snel · niet precies · geen geheugen', 520, 770, q.on('snel', 1), C.text2, 28, 'center');
      ctx.save(); ctx.globalAlpha *= q.on('specifieke', 2); bCel(ctx, 1400, 460, 110, 2, t); virus(ctx, 1640, 300, 40, [2], t); regel(ctx, 'specifieke afweer', 1400, 720, 1, BCOL, 34, 'center', 700); regel(ctx, 'herkent precies', 1400, 770, 1, C.text2, 28, 'center'); ctx.restore();
      ctx.restore(); }
    if (pB * (1 - pC) > 0.01) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC);
      virus(ctx, 620, 450, 140, [0, 3], t, { rot: t * 0.05 }); regel(ctx, 'virus', 620, 760, 1, VIR, 32, 'center', 700);
      const ag = q.on('antigeen', 1); naamBij(ctx, 'antigeen', 'vormpje, meestal een stukje eiwit', 620, 168, ag, 'center', VORMKL[3]);
      const ei = q.on('eigen', 1); ctx.save(); ctx.globalAlpha *= ei; blob(ctx, 1420, 480, 170, 150, 0.04, 4, t); shape(ctx, rgba(EIGEN, 0.25), EIGEN, 2.5); circ(ctx, 1420, 480, 60, rgba(C.kern, 0.6), C.kernR, 1.2); for (let i = 0; i < 10; i++) { const an = i * 0.628; antigeen(ctx, 1420 + Math.cos(an) * 182, 480 + Math.sin(an) * 162, 4, 13, an + 1.571); } regel(ctx, 'eigen cel: eigen antigenen', 1420, 720, 1, EIGEN, 30, 'center', 700); ctx.restore();
      tag(ctx, 'je afweer reageert alleen op vreemde antigenen', 960, 860, VIR, q.on('vreemd', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      const one = 1 - q.on('Elke', 2);
      ctx.save(); ctx.globalAlpha *= one; bCel(ctx, 620, 470, 150, 0, t, { label: 'B-cel', rec: q.on('receptoren', 1) });
      label(ctx, 'receptor', 'eiwit dat op één vormpje past', 620 + Math.cos(0.3 - 6.283 / 8 * 2) * 190, 470 + Math.sin(0.3 - 6.283 / 8 * 2) * 190, 900, 170, q.on('receptoren', 1), BCOL, 'left');
      const fit = ramp(t, q.at('sleutel'), 1.6); const vx = lerp(1500, 1230, fit); virus(ctx, vx, 520, 70, [0], t, { rot: -0.29 }); sleutel(ctx, 1080, 520, 0, 18, 1.571, q.on('sleutel', 1), BCOL, fit);
      regel(ctx, 'sleutel ↔ slot', 1150, 700, q.on('slot', 1), C.goud, 32, 'center', 700);
      tag(ctx, 'lymfocyten: witte bloedcellen van de specifieke afweer', 960, 860, BCOL, 1 - q.on('receptoren', 1)); ctx.restore();
      const row = q.on('Elke', 2); ctx.save(); ctx.globalAlpha *= row; for (let i = 0; i < 6; i++) bCel(ctx, 260 + i * 280, 470, 85, i, t, { seed: i }); tag(ctx, 'elke B-cel heeft zijn eigen sleutel', 960, 800, BCOL); ctx.restore();
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'micro'); virus(ctx, 1500, 380, 90, [3], t, { rot: t * 0.05 }); regel(ctx, 'waterpokkenvirus: nooit gezien', 1500, 640, 1, VIR, 30, 'center', 700);
    for (let i = 0; i < 4; i++) bCel(ctx, 250 + i * 240, 520, 80, [0, 1, 4, 5][i], t, { seed: i }); vraagteken(ctx, 1180, 420, q.on('Hoe', 1), 130); },

  s07(ctx, t, q) { bg(ctx, 'micro');
    const geen = 1 - q.on('beenmerg', 1); ctx.save(); ctx.globalAlpha *= geen; bCel(ctx, 700, 460, 120, 0, t); virus(ctx, 1150, 460, 70, [3], t); kruis(ctx, 925, 460, 40); tag(ctx, 'een B-cel kan zijn sleutel niet veranderen', 960, 800, C.koraal); ctx.restore();
    const bm = q.on('beenmerg', 1); if (bm > 0.01) { ctx.save(); ctx.globalAlpha *= bm;
      ctx.save(); ctx.translate(310, 470); ctx.rotate(-1.2); roundRect(ctx, -60, -250, 120, 500, 60); shape(ctx, rgba(BEEN, 0.25), BEEN, 3); for (const sy of [-1, 1]) { circ(ctx, -50, sy * 250, 60, rgba(BEEN, 0.3), BEEN, 3); circ(ctx, 50, sy * 250, 60, rgba(BEEN, 0.3), BEEN, 3); } ctx.restore(); regel(ctx, 'beenmerg', 310, 780, 1, BEEN, 30, 'center', 700);
      const sel = q.on('passende', 1), kies = q.on('gekozen', 1), meer = q.on('paar', 1);
      for (let i = 0; i < 14; i++) { const u = (t * 0.06 + i / 14) % 1; const k = (i * 5) % 7; const x = 420 + u * 1150 + (sel > 0.5 ? 0 : 0), y = 200 + hash(i * 3) * 520; const hit = k === 3 || (meer > 0.01 && k === 1); const fx = sel > 0.01 && hit ? 0 : 1; bCel(ctx, x, y, 38, k, t, { seed: i, a: Math.min(1, u * 6, (1 - u) * 6) * (1 - 0.6 * sel * fx), glow: hit ? (k === 3 ? sel : meer) : 0 }); }
      virus(ctx, 1680, 470, 80, meer > 0.5 ? [3, 1] : [3], t, { rot: t * 0.05 });
      tag(ctx, 'miljoenen soorten, al vóór de besmetting', 960, 860, BCOL, q.on('miljoenen', 1) * (1 - q.on('maatwerk', 1)));
      tag(ctx, 'niet op maat gemaakt, maar gekozen', 960, 860, C.goud, q.on('maatwerk', 1) * (1 - q.on('omdat', 1)));
      tag(ctx, 'veel antigenen per virus: er passen er een paar', 960, 860, C.goud, q.on('omdat', 1));
      ctx.restore(); }
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const segs = [['V', 8, '#5BA4C9'], ['D', 4, '#8C7BBF'], ['J', 5, '#7FC48F']]; let x = 200; const pick = [3, 1, 2];
    const mix = ramp(t, q.at('genstukjes'), 3), plak = q.on('onnauwkeurig', 1);
    regel(ctx, 'genstukjes in het DNA', 200, 230, 1, C.text2, 28);
    segs.forEach(([n, cnt, col], si) => { for (let i = 0; i < cnt; i++) { const bx = x + i * 60; const chosen = i === pick[si]; const a = 1 * (1 - 0.65 * mix * (chosen ? 0 : 1)); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, bx, 270, 50, 60, 8); shape(ctx, rgba(col, 0.45), col, 2); text(ctx, n + (i + 1), bx + 25, 312, fTekst(24, 700), C.text, 'center'); ctx.restore(); } x += cnt * 60 + 50; });
    if (mix > 0.01) { const tx = 640, ty = 500; ctx.save(); ctx.globalAlpha *= mix; segs.forEach(([n, cnt, col], si) => { const bx = tx + si * (100 + 6 * plak) + (si ? 8 * plak * Math.sin(si * 2) : 0); roundRect(ctx, bx, ty, 100, 70, 10); shape(ctx, rgba(col, 0.6), col, 2); text(ctx, n + (pick[si] + 1), bx + 50, ty + 46, fTekst(28, 700), C.text, 'center'); }); if (plak > 0.01) for (const jx of [tx + 100, tx + 206]) circ(ctx, jx + 3, ty + 35, 7, rgba(C.goud, plak), null); ctx.restore(); arrow(ctx, 1000, 535, 1180, 535, C.line, mix, 3); bCel(ctx, 1380, 535, 100, 6, t, { a: mix }); }
    tag(ctx, 'willekeurig gecombineerd', 760, 660, C.goud, mix * (1 - plak)); tag(ctx, 'en onnauwkeurig aan elkaar geplakt', 760, 660, C.goud, plak);
    tag(ctx, '> 1 miljard verschillende receptoren', 960, 780, BCOL, q.on('miljard', 1) * (1 - q.on('stoffen', 1)));
    const ei = q.on('stoffen', 1); if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fillRect(0, 380, W, 520); bCel(ctx, 700, 610, 90, 4, t); blob(ctx, 1150, 610, 110, 100, 0.04, 4, t); shape(ctx, rgba(EIGEN, 0.25), EIGEN, 2.5); for (let i = 0; i < 8; i++) { const an = i * 0.785; antigeen(ctx, 1150 + Math.cos(an) * 120, 610 + Math.sin(an) * 110, 4, 12, an + 1.571); } regel(ctx, 'eigen cel', 1150, 770, 1, EIGEN, 28, 'center', 700); kruis(ctx, 700, 610, 110, q.on('uitgeschakeld', 1)); tag(ctx, 'past op eigen stoffen → uitgeschakeld', 960, 450, C.koraal, q.on('uitgeschakeld', 1)); ctx.restore(); }
  },

  s09(ctx, t, q) { bg(ctx, 'micro');
    const dik = q.on('dik', 1), cx = 1050, cy = 470; const rx = 430 + 50 * dik, ry = 300 + 35 * dik;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); shape(ctx, rgba(LYMF, 0.08 + 0.05 * dik), rgba(LYMF, 0.7), 3); regel(ctx, 'lymfeknoop', cx + rx - 40, cy - ry - 10, 1, LYMF, 30, 'right', 700);
    ctx.strokeStyle = rgba(LYMF, 0.6); ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(60, 300); ctx.quadraticCurveTo(400, 300, cx - rx + 10, cy - 60); ctx.stroke(); regel(ctx, 'lymfevat', 160, 260, q.on('lymfevaten', 1), LYMF, 26, 'left', 700);
    const inV = ramp(t, q.at('lymfevaten'), 3); for (let i = 0; i < 3; i++) { const v = clamp(inV * 1.4 - i * 0.2, 0, 1); virus(ctx, lerp(90, cx - 160 + i * 70, v), lerp(300, cy - 150 + i * 30, v), 22, [3], t, { a: v > 0 ? 1 : 0 }); }
    const deel = ramp(t, q.at('delen'), 6); const nCl = Math.min(16, Math.pow(2, Math.floor(deel * 4.99)));
    const ks = [0, 1, 2, 4, 5, 6, 0, 1, 5]; const match = 0; const fo = ramp(t, q.at('delen'), 1.5); const pas = q.on('passen', 1);
    ks.forEach((k, i) => { if (i === match && deel >= 0.01) return; if (i !== match && fo >= 0.99) return; const x = cx - 300 + (i % 5) * 150 + (i >= 5 ? 75 : 0), y = cy + 30 + Math.floor(i / 5) * 150; if (i === match) bCel(ctx, x, y, 50, 3, t, { glow: pas, seed: i }); else bCel(ctx, x, y, 44, k, t, { seed: i, a: (1 - 0.5 * pas) * (1 - fo) }); });
    if (deel >= 0.01) for (let i = 0; i < nCl; i++) { const x = cx - 330 + (i % 8) * 95, y = cy + 20 + Math.floor(i / 8) * 120; bCel(ctx, x, y, 40, 3, t, { seed: i, glow: 0.3 }); }
    const th = q.on('T-helpercel', 1); if (th > 0.01) { const mx = cx - 300 + match * 150, my = cy + 30; tCel(ctx, lerp(1700, mx + 120, th), lerp(820, my + 90, th) - 40, 44, t, { a: th * (1 - deel) }); vonk(ctx, mx + 60, my + 50, q.on('startsein', 1) * (1 - deel), t); tag(ctx, 'T-helpercel geeft het startsein', 960, 860, TCOL, th * (1 - q.on('delen', 1))); }
    tag(ctx, 'lymfeknopen worden vaak dik', 960, 860, LYMF, dik * (1 - th));
    tag(ctx, 'een kloon: allemaal dezelfde cellen', 960, 860, BCOL, q.on('kloon', 1) * (1 - q.on('klonale', 1)));
    tag(ctx, 'klonale selectie: kiezen, en vermenigvuldigen', 960, 860, C.goud, q.on('klonale', 1));
  },
  s10(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Plakken', 1), p3 = q.on('armen', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const px = 420, py = 470;
      bCel(ctx, px, py, 150, 3, t, { soort: 'plasma', label: 'plasmacel' });
      const sp = q.on('maken', 1), rate = q.on('tweeduizend', 1); const N = 10 + Math.round(14 * rate);
      for (let i = 0; i < N; i++) { const u = (t * (0.12 + 0.12 * rate) + i / N) % 1; const an = -1.1 + hash(i * 3) * 2.2; antistof(ctx, px + Math.cos(an) * (170 + u * 650), py + Math.sin(an) * (170 + u * 420), 0.4, an + 1.571 + t * 0.4 + i, sp * Math.min(1, (1 - u) * 3) * (1 - 0.8 * q.on('letter', 1))); }
      const ko = q.on('kopie', 1) * (1 - q.on('letter', 1)); if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; ctx.strokeStyle = BCOL; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1180, 900, 340, -2.0, -1.14); ctx.stroke(); antistof(ctx, 1180, 510, 1.2, 0, 1, BCOL); regel(ctx, 'receptor (vast op de B-cel)', 1180, 610, 1, BCOL, 28, 'center', 700); text(ctx, '=', 1340, 480, fTitel(70), C.text, 'center'); antistof(ctx, 1500, 500, 1.2, 0); regel(ctx, 'antistof (losse kopie)', 1500, 620, 1, AS, 28, 'center', 700); ctx.restore(); }
      const y = q.on('letter', 1); if (y > 0.01) { ctx.save(); ctx.globalAlpha *= y; antistof(ctx, 1350, 520, 2.6, 0); label(ctx, 'bindplaats', 'past op één antigeen', 1350 - 94, 520 - 122, 1000, 200, q.on('bindplaats', 1), AS, 'right'); label(ctx, 'bindplaats', '', 1350 + 94, 520 - 122, 1650, 200, q.on('bindplaats', 1), AS, 'left'); ctx.restore(); }
      tag(ctx, '± 2000 antistoffen per seconde', 960, 860, AS, rate * (1 - q.on('heen', 1)));
      tag(ctx, 'via bloed en weefselvocht overal heen', 960, 860, C.teal, q.on('heen', 1) * (1 - q.on('humorale', 1)));
      tag(ctx, 'humorale afweer', 960, 860, AS, q.on('humorale', 1));
      ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3);
      blob(ctx, 1500, 470, 230, 210, 0.04, 4, t); shape(ctx, rgba(EIGEN, 0.2), EIGEN, 2.5); circ(ctx, 1500, 470, 80, rgba(C.kern, 0.6), C.kernR, 1.2); regel(ctx, 'lichaamscel', 1500, 760, 1, EIGEN, 28, 'center', 700);
      const cov = ramp(t, q.at('Plakken'), 2); virus(ctx, 760, 470, 110, [3], t, { ast: i => clamp(cov * 12 - i, 0, 1) });
      kruis(ctx, 1120, 470, 40, q.on('vastgrijpen', 1)); tag(ctx, 'neutraliseren: het virus kan je cellen niet meer in', 960, 860, AS, q.on('vastgrijpen', 1));
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const kl = ramp(t, q.at('armen'), 3);
      const pos = [[700, 360], [880, 330], [790, 520], [980, 500], [1100, 380], [900, 680], [1080, 640]]; const far = [[400, 200], [1000, 160], [500, 700], [1500, 600], [1450, 200], [800, 840], [1600, 420]];
      pos.forEach(([x, y], i) => virus(ctx, lerp(far[i][0], x, kl), lerp(far[i][1], y, kl), 50, [3], t, { rot: i }));
      for (let i = 0; i < pos.length - 1; i++) { const a = pos[i], b = pos[i + 1]; const mx = lerp(lerp(far[i][0], a[0], kl), lerp(far[i + 1][0], b[0], kl), 0.5), my = lerp(lerp(far[i][1], a[1], kl), lerp(far[i + 1][1], b[1], kl), 0.5); antistof(ctx, mx, my, 0.5, Math.atan2(b[1] - a[1], b[0] - a[0]) + 1.571, kl); }
      tag(ctx, 'twee armen → ziekteverwekkers klonteren samen', 960, 860, AS, q.on('klonteren', 1));
      ctx.restore(); }
  },
  s11(ctx, t, q) { bg(ctx, 'micro'); ctx.save(); ctx.translate(900, 470); ctx.scale(3, 3); bacterie(ctx, 0, 0, 1, 0); ctx.restore(); for (let i = 0; i < 4; i++) antistof(ctx, 900 - 54 + i * 36, 470 - 75, 0.45, Math.PI); for (let i = 0; i < 4; i++) antistof(ctx, 900 - 54 + i * 36, 470 + 75, 0.45, 0); vraagteken(ctx, 1350, 420, q.on('Wat', 1), 130); },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const eat = ramp(t, q.at('opruimen'), 3); const bx = lerp(1150, 860, ramp(t, q.at('opruimen') + 2.2, 2)), by = 450;
    fagocyt(ctx, lerp(1650, 700, ramp(t, q.at('opruimen'), 2)), 480, 150, t, { a: q.on('opruimen', 1), arm: eat, tx: bx, ty: by, label: 'fagocyt' });
    const kap = ramp(t, q.at('fagocyten') + 1, 2);
    ctx.save(); ctx.translate(bx, by); ctx.scale(2.6, 2.6); bacterie(ctx, 0, 0, 1, 0, 1, kap); ctx.restore(); for (let i = 0; i < 4; i++) antistof(ctx, bx - 47 + i * 31, by - 62, 0.4, Math.PI, 1 - kap); for (let i = 0; i < 4; i++) antistof(ctx, bx - 47 + i * 31, by + 63, 0.4, 0, 1 - kap);
    const fl = q.on('vlaggetje', 1); if (fl > 0.01) { ctx.save(); ctx.globalAlpha *= fl * (1 - eat); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by - 120); ctx.lineTo(bx, by - 240); ctx.stroke(); ctx.fillStyle = AS; ctx.beginPath(); ctx.moveTo(bx, by - 240); ctx.lineTo(bx + 90, by - 215); ctx.lineTo(bx, by - 190); ctx.closePath(); ctx.fill(); ctx.restore(); }
    tag(ctx, 'antistoffen doden zelf niets', 960, 860, C.koraal, q.on('doden', 1) * (1 - q.on('vlaggetje', 1)));
    tag(ctx, 'ze markeren: hier zit iets vreemds', 960, 860, AS, q.on('vlaggetje', 1) * (1 - q.on('opruimen', 1)));
    tag(ctx, 'fagocyten ruimen op', 960, 860, WIT, q.on('opruimen', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('stukjes', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const cx = 820, cy = 560, k = q.on('eiwitketens', 1), cv = q.on('constante', 1), va = q.on('variabele', 1);
      const H = '#C9963A', L = '#F0D78C', VAR = '#5BA4C9';
      ctx.lineCap = 'round';
      const arm = (sx, col, lw, off) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(cx + off * sx, cy + 230); ctx.lineTo(cx + off * sx, cy); ctx.lineTo(cx + sx * (170 + off), cy - 220); ctx.stroke(); };
      for (const sx of [-1, 1]) { arm(sx, H, 30, 18); ctx.strokeStyle = L; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(cx + sx * 95, cy - 40); ctx.lineTo(cx + sx * 225, cy - 210); ctx.stroke();
        if (va > 0.01) { ctx.save(); ctx.globalAlpha *= va; ctx.strokeStyle = VAR; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(cx + sx * 160, cy - 165); ctx.lineTo(cx + sx * 215, cy - 235); ctx.stroke(); ctx.restore(); } }
      label(ctx, 'zware keten', '× 2', cx + 18, cy + 160, 1250, 760, k, H, 'left'); label(ctx, 'lichte keten', '× 2', cx + 190, cy - 160, 1250, 360, ramp(t, q.at('lichte'), 1), L, 'left');
      if (cv > 0.01) { ctx.save(); ctx.globalAlpha *= cv * 0.6; ctx.strokeStyle = lighten(H, 0.5); ctx.lineWidth = 10; ctx.lineCap = 'round'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + 18 * sx, cy + 225); ctx.lineTo(cx + 18 * sx, cy); ctx.lineTo(cx + sx * (18 + 120), cy - 157); ctx.stroke(); } ctx.restore(); }
      naamBij(ctx, 'constant deel', 'gelijk binnen één klasse', cx - 40, cy + 130, cv, 'right', C.text2);
      naamBij(ctx, 'variabel deel', 'bindplaatsen · per kloon anders', cx - 250, cy - 215, va, 'right', VAR);
      regel(ctx, 'immunoglobuline', cx, 180, q.on('immunoglobuline', 1), AS, 34, 'center', 700);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const bx = 760, by = 470;
      bCel(ctx, bx, by, 150, 3, t, { label: 'B-cel' }); for (let i = 0; i < 3; i++) { const an = -0.4 + i * 0.4; ctx.save(); ctx.translate(bx + Math.cos(an) * 150, by + Math.sin(an) * 150); ctx.rotate(an + 1.571); ctx.fillStyle = WIT; ctx.fillRect(-12, -6, 24, 12); antigeen(ctx, 0, -18, 3, 11); ctx.restore(); }
      naamBij(ctx, 'stukje antigeen', 'op het oppervlak', bx + Math.cos(-0.4) * 170 - 5, by + Math.sin(-0.4) * 170 - 118, q.on('oppervlak', 1), 'left', VORMKL[3]);
      const th = q.on('T-helpercel', 1); tCel(ctx, lerp(1600, 1080, th), 470, 110, t, { a: th, label: 'T-helpercel' }); vonk(ctx, 935, 470, q.on('startsein', 1), t);
      tag(ctx, 'T-helpercel past → startsein voor de B-cel', 960, 860, TCOL, q.on('startsein', 1) * (1 - q.on('Daarover', 1)));
      tag(ctx, 'meer in film 3', 960, 860, TCOL, q.on('Daarover', 1));
      ctx.restore(); }
  },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('Kijk', 1);
    if (1 - gr > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - gr; for (let i = 0; i < 8; i++) { const gh = i >= 5; const s = q.on('geheugencel', 1); const x = 400 + i * 160; bCel(ctx, x, 440, 55, 3, t, { soort: gh && s > 0.5 ? 'geheugen' : 'plasma', seed: i }); }
      regel(ctx, 'plasmacellen', 560, 580, q.on('plasmacellen', 1), BCOL, 30, 'center', 700); regel(ctx, 'geheugencellen ★', 1360, 580, q.on('geheugencel', 1), C.goud, 30, 'center', 700);
      tag(ctx, 'blijven jaren, soms je hele leven', 960, 760, C.goud, q.on('jaren', 1)); ctx.restore(); }
    if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; const u = 0.32 * ramp(t, q.at('eerste', 1), 9);
      afweerGrafiek(ctx, u, t, { ziek: q.on('Ondertussen', 1), tweede: q.on('opnieuw', 1), vraag: q.on('Hoe', 2) });
      tag(ctx, 'pas na ± een week antistoffen', GX + 0.08 * GW, 300, AS, q.on('week', 1) * (1 - q.on('primaire', 1)), 'left');
      tag(ctx, 'primaire afweerreactie', GX + 0.2 * GW, 140, AS, q.on('primaire', 1), 'left');
      ctx.restore(); }
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const tab = q.on('afweren', 1);
    if (1 - tab > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - tab; const u = 0.32 + 0.68 * ramp(t, q.at('delen'), 6);
      afweerGrafiek(ctx, u, t, { ziek: 1, tweede: 1 });
      tag(ctx, 'primaire afweerreactie', GX + 0.2 * GW, 140, AS, 1 - q.on('secundaire', 1), 'left');
      tag(ctx, 'geheugencellen ruimen niet zelf op', 1500, 140, C.koraal, q.on('Misschien', 1) * (1 - q.on('delen', 1)));
      tag(ctx, 'secundaire afweerreactie: sneller, veel hoger', GX + 0.62 * GW, 140, AS, q.on('secundaire', 1) * (1 - q.on('immuun', 1)));
      tag(ctx, 'immuun: het virus komt binnen, maar je wordt niet ziek', 960, 140, C.groen, q.on('immuun', 1));
      ctx.restore(); }
    if (tab > 0.01) { ctx.save(); ctx.globalAlpha *= tab; const x0 = 360, cols = [860, 1340];
      fagocyt(ctx, cols[0], 250, 70, t); bCel(ctx, cols[1], 250, 60, 3, t);
      regel(ctx, 'fagocyten (aspecifiek)', cols[0], 380, 1, WIT, 30, 'center', 700); regel(ctx, 'B-cellen (specifiek)', cols[1], 380, 1, BCOL, 30, 'center', 700);
      const rows = [['wanneer klaar?', 'meteen', 'eerste keer: een week', 'Fagocyten', 'B-cellen'], ['herkennen', 'niets precies', 'precies passend', 'herkennen', 'passen'], ['geheugen', 'nee', 'ja', 'onthouden', 'onthouden']];
      rows.forEach(([n, a, b, wa, wb], i) => { const y = 480 + i * 100; regel(ctx, n, x0, y, q.on(wa, 1), C.text2, 30, 'left', 600); regel(ctx, a, cols[0], y, q.on(wa, 1), C.text, 32, 'center'); regel(ctx, b, cols[1], y, q.on(wb, i === 2 ? 2 : 1), C.text, 32, 'center'); });
      tag(ctx, 'antistoffen helpen de fagocyten', 960, 840, AS, q.on('helpen', 1));
      ctx.restore(); }
  },
  s18(ctx, t, q) { bg(ctx, 'micro'); virus(ctx, 560, 440, 90, [3], t, { rot: t * 0.05 }); regel(ctx, 'waterpokken', 560, 680, 1, VIR, 30, 'center', 700); vink(ctx, 560, 760, 30, q.on('immuun', 1));
    virus(ctx, 1300, 440, 90, [5], t, { rot: -t * 0.05, col: '#C9708F' }); regel(ctx, 'griep', 1300, 680, q.on('griep', 1), '#C9708F', 30, 'center', 700); vraagteken(ctx, 1300, 280, q.on('Hoe', 1), 110); },
  s20(ctx, t, q) { bg(ctx, 'micro');
    const mu = ramp(t, q.at('veranderen'), 3), pw = q.on('waterpokkenvirus', 1);
    ctx.save(); ctx.globalAlpha *= 1 - pw; const GR = '#C9708F';
    bCel(ctx, 520, 470, 120, 5, t, { soort: 'geheugen', label: 'geheugencel' });
    const kk = mu > 0.5 ? 6 : 5; virus(ctx, 1250, 470, 100, [kk], t, { col: GR, rot: t * 0.04 }); regel(ctx, mu > 0.5 ? 'griep, dit jaar' : 'griep, vorig jaar', 1250, 720, 1, GR, 30, 'center', 700);
    kruis(ctx, 890, 470, 36, q.on('minder', 1)); tag(ctx, 'mutaties: antigenen veranderen een beetje', 960, 860, GR, q.on('mutaties', 1) * (1 - q.on('minder', 1))); tag(ctx, 'de sleutel past net niet meer', 960, 860, C.koraal, q.on('minder', 1));
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= pw; bCel(ctx, 520, 470, 120, 3, t, { soort: 'geheugen', glow: 0.6, label: 'geheugencel' }); virus(ctx, 1250, 470, 100, [3], t, { rot: t * 0.04 }); regel(ctx, 'waterpokken: verandert bijna niet', 1250, 720, 1, VIR, 30, 'center', 700); vink(ctx, 890, 470, 36); tag(ctx, 'daarom krijg je het maar één keer', 960, 860, C.groen, q.on('één', 1)); ctx.restore();
  },
  s21(ctx, t, q) { kamer(ctx, t);
    const panel = q.on('Toen', 1); ctx.fillStyle = rgba('#0B0F16', 0.85 * panel); ctx.fillRect(1100, 120, 780, 680);
    const ad = q.on('addertje', 1);
    const ch = [['vroeger: passende B-cellen gevonden', 'pasten', 1, BCOL], ['delen → antistoffen + geheugencellen', 'geheugencel', 1, AS], ['nu: geheugencellen → snel plasmacellen', 'Nu', 1, C.goud], ['virus komt binnen, maar is snel opgeruimd', 'opgeruimd', 1, C.groen]];
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1490, 220 + i * 110, col, q.on(w, n) * (1 - ad)));
    tag(ctx, 'antwoord a', 1490, 700, C.goud, q.on('antwoord', 1) * (1 - ad));
    const ch2 = [['het virus verstopt zich in zenuwcellen', 'zenuwcellen', 1, VIR], ['antistoffen kunnen daar niet bij', 'kunnen', 1, AS], ['later: gordelroos', 'gordelroos', 1, C.koraal], ['virus in cellen: T-cellen (film 3)', 'T-cellen', 1, TCOL]];
    ch2.forEach(([s, w, n, col], i) => tag(ctx, s, 1490, 220 + i * 110, col, q.on(w, n) * ad));
  },
};
