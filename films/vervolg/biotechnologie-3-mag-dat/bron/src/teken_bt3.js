// Wat word jij? · Biotechnologie · film 3 Mag dat? — tekenset (25 okt 2026)
// Gebruikt teken_bt1.js (Sam, Merel, bioreactor, kaartje, labVloer), teken_bt2.js (genStreep) en de koe uit Diergeneeskunde (teken_dg0, gekopieerd onderaan).
const KL_PLANT = '#5E8F5A', KL_PLANT2 = '#7FAF6A', KL_GROND = '#3A3328', KL_STUIF = '#E8C766', KL_SOJA = C.oker || '#C9A35C';

// ---------- maïsplant (zijaanzicht), y = grond ----------
function maisPlant(ctx, x, y, h, o = {}) { const { a = 1, t = 0, kolf = 1, pluim = 1, seed = 1, ggo = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sw = Math.sin(t * 1.3 + seed) * 0.03 * h; const top = [x + sw, y - h];
  ctx.strokeStyle = KL_PLANT; ctx.lineWidth = Math.max(3, h * 0.035); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x, y - h * 0.5, top[0], top[1]); ctx.stroke();
  for (let i = 0; i < 5; i++) { const f = 0.18 + i * 0.15, s = i % 2 ? 1 : -1, yy = y - h * f, xx = x + sw * f; const L = h * (0.42 - i * 0.04);
    ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + s * L * 0.55, yy - L * 0.35, xx + s * L, yy + L * 0.08 + Math.sin(t * 1.7 + i + seed) * 4); ctx.quadraticCurveTo(xx + s * L * 0.5, yy - L * 0.18, xx, yy - h * 0.02); ctx.fillStyle = i % 2 ? KL_PLANT : KL_PLANT2; ctx.fill(); }
  if (kolf > 0.01) { ctx.save(); ctx.globalAlpha *= kolf; const kx = x + sw * 0.45 + h * 0.05, ky = y - h * 0.45; ctx.beginPath(); ctx.ellipse(kx, ky, h * 0.035, h * 0.1, 0.35, 0, 6.283); ctx.fillStyle = '#E8C766'; ctx.fill(); ctx.beginPath(); ctx.ellipse(kx - h * 0.01, ky + h * 0.02, h * 0.04, h * 0.1, 0.35, 0, 6.283); ctx.fillStyle = KL_PLANT2; ctx.globalAlpha *= 0.85; ctx.fill(); ctx.restore(); }
  if (pluim > 0.01) { ctx.save(); ctx.globalAlpha *= pluim; ctx.strokeStyle = '#C9B26A'; ctx.lineWidth = Math.max(2, h * 0.012); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.quadraticCurveTo(top[0] + i * h * 0.04, top[1] - h * 0.06, top[0] + i * h * 0.07, top[1] - h * 0.02 + Math.abs(i) * h * 0.02); ctx.stroke(); } ctx.restore(); }
  if (ggo > 0.01) { ctx.save(); ctx.globalAlpha *= ggo; circ(ctx, x + h * 0.12, y - h * 0.72, Math.max(8, h * 0.04), C.paars, lighten(C.paars, 0.3), 2); ctx.restore(); }
  ctx.restore(); return { top }; }
// stuifmeel dat van (x, y) wegwaait naar rechts (richting dx)
function stuifmeel(ctx, x, y, dx, t, a = 1, n = 18) { if (a <= 0.01) return; ctx.save(); for (let i = 0; i < n; i++) { const ph = (t * 0.22 + i / n) % 1; ctx.globalAlpha = a * (1 - ph) * 0.9; circ(ctx, x + ph * dx + Math.sin(i * 3 + t) * 20, y - 10 + ph * 60 * Math.sin(i) + (hash(i) - 0.5) * 60, 4, KL_STUIF, null); } ctx.restore(); }
// akker: rij planten op een strook grond
function akker(ctx, x, y, w, o = {}) { const { a = 1, t = 0, n = 6, h = 220, label = '', sub = '', stuif = 0, leeg = 0, ggo = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 26, 6); shape(ctx, KL_GROND, null);
  for (let i = 0; i < n; i++) { const px = x - w / 2 + (i + 0.5) * w / n; maisPlant(ctx, px, y + 4, h * (0.9 + 0.1 * hash(i + 2)), { t, seed: i, a: 1 - leeg, ggo }); }
  if (stuif > 0.01) stuifmeel(ctx, x + w / 2 - w / n / 2, y - h, w * 0.6, t, stuif);
  if (label) text(ctx, label, x, y + 72, fTekst(34, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x, y + 108, C.grain, 'center', 28);
  ctx.restore(); }

// ---------- ingeperkt gebruik ----------
function inperkRand(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h, w, h, 30); ctx.strokeStyle = '#7C8AA3'; ctx.lineWidth = 14; ctx.stroke(); ctx.setLineDash([2, 18]); ctx.strokeStyle = '#B9C3D3'; ctx.lineWidth = 4; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
function inperkTrap(ctx, x, y, o = {}) { const { a = 1, hl = -1, u = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ['I', 'II', 'III', 'IV'].forEach((n, i) => { const k = clamp(u * 4 - i, 0, 1); if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; const bx = x + i * 140, bh = 60 + i * 60;
    roundRect(ctx, bx, y - bh, 125, bh, 8); shape(ctx, i === hl ? rgba(C.goud, 0.5) : '#2A3A58', i === hl ? C.goud : '#8FA0B5', 2); text(ctx, n, bx + 62, y - bh + 44, fTitel(36), C.text, 'center'); ctx.restore(); });
  metaA(ctx, 'MELDING', x + 132, y + 40, clamp(u * 4 - 1, 0, 1), C.grain, 'center', 28); metaA(ctx, 'VERGUNNING VOORAF', x + 412, y + 40, clamp(u * 4 - 3, 0, 1), C.grain, 'center', 28);
  metaA(ctx, 'INPERKINGSNIVEAU', x + 272, y - 290, u, C.grain, 'center', 28); ctx.restore(); }
function autoclaaf(ctx, x, y, o = {}) { const { a = 1, dicht = 0, klaar = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 110, y - 220, 220, 220, 18); shape(ctx, '#C9D2DE', '#8FA0B5', 3); circ(ctx, x, y - 120, 66, '#2A3A58', '#8FA0B5', 4);
  ctx.save(); ctx.globalAlpha *= 1 - dicht; roundRect(ctx, x - 28, y - 150, 56, 64, 6); shape(ctx, '#C7843A', null); ctx.restore();
  circ(ctx, x + 70, y - 196, 12, klaar > 0.5 ? C.groen : C.koraal, null); text(ctx, 'autoclaaf', x, y + 44, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
function bordje(ctx, x, y, s2, a = 1, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const w1 = ctx.measureText(s2).width; ctx.font = fTekst(26, 600); const w = Math.max(w1, sub ? ctx.measureText(sub).width : 0) + 48;
  roundRect(ctx, x - w / 2, y - 34, w, sub ? 100 : 64, 10); shape(ctx, '#F2F2EE', '#8FA0B5', 2); text(ctx, s2, x, y + 8, fTekst(28, 700), '#1B2840', 'center'); if (sub) text(ctx, sub, x, y + 48, fTekst(26, 600), '#3A4A66', 'center'); ctx.restore(); }

// ---------- wet en technieken ----------
function wetKaart(ctx, x, y, w, regels, a = 1, kop = 'DE WET') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 90 + regels.length * 46;
  roundRect(ctx, x - w / 2, y, w, h, 14); shape(ctx, '#F2EEE2', '#B8A57A', 2); text(ctx, '§', x - w / 2 + 40, y + 58, fTitel(46), '#8A6A2A', 'center'); metaText(ctx, kop, x - w / 2 + 80, y + 50, '#6A5A3A', 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x - w / 2 + 40, y + 104 + i * 46, fTekst(30, 600), '#1B2840', 'left')); ctx.restore(); }
function bestralingsKast(ctx, x, y, o = {}) { const { a = 1, t = 0, aan = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 120, y - 200, 240, 200, 16); shape(ctx, '#3A4458', '#8FA0B5', 3); roundRect(ctx, x - 90, y - 170, 180, 120, 10); shape(ctx, '#1F2A3C', null);
  for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= aan * (1 - ph); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 110, 16 + ph * 50, 0, 6.283); ctx.stroke(); ctx.restore(); }
  zaadje(ctx, x, y - 110, 1); ctx.restore(); }
function zaadje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 16 * s, 22 * s, 0, 0, 6.283); ctx.fillStyle = '#E8C766'; ctx.fill(); ctx.strokeStyle = '#B8902E'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
// gen van een andere soort dat in DNA wordt geplakt (u 0..1)
function genInplak(ctx, x, y, w, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const gap = 90 * clamp(u * 2, 0, 1);
  genStreep(ctx, x - w / 4 - gap / 2, y, w / 2, { seed: 3 }); genStreep(ctx, x + w / 4 + gap / 2, y, w / 2, { seed: 4 });
  const dy = lerp(-110, 0, ease(clamp(u * 2 - 1, 0, 1))); roundRect(ctx, x - 40, y - 16 + dy, 80, 32, 8); shape(ctx, C.teal, lighten(C.teal, 0.3), 2); ctx.restore(); }
function knipDNA(ctx, x, y, w, u, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; genStreep(ctx, x, y, w, { seed: 6, hlPos: u > 0.6 ? 0.55 : -1 });
  const sx = lerp(x + w / 2 + 60, x + w * 0.05, ease(clamp(u * 1.6, 0, 1))); schaartje(ctx, sx, y - 70, 34, { sluit: (Math.sin(t * 6) + 1) / 2 }); ctx.restore(); }

// ---------- beoordeling ----------
function dossier(ctx, x, y, s = 1, a = 1, lab = 'dossier') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -60, 180, 130, 10); shape(ctx, '#C9A35C', '#8A6A2A', 2); roundRect(ctx, -90, -76, 70, 24, 6); shape(ctx, '#C9A35C', null);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#F2EEE2'; ctx.fillRect(-70, -40 + i * 30, 140 - i * 30, 10); } ctx.restore(); if (lab) metaA(ctx, lab.toUpperCase(), x, y + 110 * s, 1, C.grain, 'center', 28); }
function rapportStapel(ctx, x, y, a = 1, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x - 90 + (i % 2) * 6, y - (i + 1) * 22, 180, 20, 4); shape(ctx, i % 2 ? '#E6E1D4' : '#F2EEE2', '#B8A57A', 1.5); } ctx.restore(); }
function insect(ctx, x, y, s = 1, a = 1, col = '#8FA0B5', t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineWidth = 3; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 12, 0); ctx.lineTo(i * 18, 22); ctx.moveTo(i * 12, 0); ctx.lineTo(i * 18, -22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 15, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); circ(ctx, 34, 0, 11, col, null); ctx.restore(); }
function vlinder(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const f = 0.6 + 0.4 * Math.abs(Math.sin(t * 6));
  [-1, 1].forEach(d => { ctx.beginPath(); ctx.ellipse(d * 22 * f, -8, 22 * f, 18, d * 0.4, 0, 6.283); ctx.fillStyle = '#E39A5A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(d * 16 * f, 14, 14 * f, 12, d * -0.3, 0, 6.283); ctx.fill(); });
  ctx.fillStyle = '#2A2A2A'; ctx.fillRect(-3, -20, 6, 40); ctx.restore(); }
function tegel(ctx, x, y, w, h, s2, o = {}) { const { a = 1, hl = 0, col = C.goud, icoon = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, hl > 0.01 ? rgba(col, 0.18 * hl) : '#22314C', hl > 0.01 ? col : '#4A5A78', 2 + hl);
  if (icoon) icoon(x, y - 20); text(ctx, s2, x, y + h / 2 - 22, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function vergrootglas(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.5, y + r * 1.5); ctx.stroke(); ctx.restore(); }

// ---------- teelt, import, etiket ----------
function landTegel(ctx, x, y, naam, sub, o = {}) { const { a = 1, col = '#4A5A78', mais = 0, rand = 0, randCol = C.koraal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 150, y - 90, 300, 180, 18); shape(ctx, '#22314C', col, 2); if (rand > 0.01) { ctx.save(); ctx.globalAlpha *= rand; roundRect(ctx, x - 158, y - 98, 316, 196, 22); ctx.strokeStyle = randCol; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  if (mais > 0.01) for (let i = 0; i < 4; i++) maisPlant(ctx, x - 90 + i * 60, y + 30, 90, { a: mais, seed: i, kolf: 0 });
  text(ctx, naam, x, y - 46, fTekst(32, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x, y + 70, C.grain, 'center', 26); ctx.restore(); }
function schip(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.4) * 3); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, -40); ctx.lineTo(200, -40); ctx.lineTo(160, 30); ctx.lineTo(-180, 30); ctx.closePath(); ctx.fillStyle = '#3A4A66'; ctx.fill();
  for (let i = 0; i < 4; i++) { roundRect(ctx, -170 + i * 80, -100, 70, 60, 6); shape(ctx, '#5A6A88', null); for (let j = 0; j < 5; j++) circ(ctx, -160 + i * 80 + j * 13, -86 + (j % 2) * 10, 6, KL_SOJA, null); }
  roundRect(ctx, 140, -120, 40, 80, 6); shape(ctx, '#C9D2DE', null); ctx.restore();
  ctx.save(); ctx.globalAlpha *= a * 0.5; ctx.strokeStyle = '#6A8BB5'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 260 * s + i * 60, y + 40 * s); ctx.quadraticCurveTo(x - 240 * s + i * 60, y + 30 * s, x - 220 * s + i * 60, y + 40 * s); ctx.stroke(); } ctx.restore(); }
function voerZak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -150, 120, 150, 16); shape(ctx, '#B8A57A', '#8A6A2A', 2); text(ctx, 'veevoer', 0, -70, fTekst(24, 700), '#1B2840', 'center'); for (let j = 0; j < 4; j++) circ(ctx, -24 + j * 16, -40, 6, KL_SOJA, null); ctx.restore(); }
function pak(ctx, x, y, s = 1, o = {}) { const { a = 1, label = '', etiket = 0, leeg = 0, kop = 'pak', kleur = '#E6E1D4' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -170, 120, 170, 10); shape(ctx, kleur, '#8FA0B5', 2); text(ctx, kop, 0, -120, fTekst(24, 700), '#1B2840', 'center');
  if (etiket > 0.01) { ctx.save(); ctx.globalAlpha *= etiket; roundRect(ctx, -46, -80, 92, 46, 8); shape(ctx, '#F2F2EE', C.paars, 3); text(ctx, label, 0, -48, fTekst(24, 800), C.paars, 'center'); ctx.restore(); }
  if (leeg > 0.01) { ctx.save(); ctx.globalAlpha *= leeg; roundRect(ctx, -46, -80, 92, 46, 8); ctx.setLineDash([6, 6]); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); }

// ---------- NGT ----------
function tijdlijn(ctx, x, y, w, punten, nu, o = {}) { const { a = 1, u = 1, nuA = 1, nuLab = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * u, y); ctx.stroke();
  punten.forEach(([f, kop, sub], i) => { const k = clamp(u * punten.length - i, 0, 1); if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; circ(ctx, x + f * w, y, 12, '#F2F2EE', null); text(ctx, kop, x + f * w, y - 34, fTekst(28, 700), C.text, 'center'); metaText(ctx, sub, x + f * w, y + 52, C.grain, 'center', 26); ctx.restore(); });
  if (nuA > 0.01) { ctx.save(); ctx.globalAlpha *= nuA; const nx = x + nu * w; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(nx, y - 70); ctx.lineTo(nx - 14, y - 96); ctx.lineTo(nx + 14, y - 96); ctx.closePath(); ctx.fill(); metaText(ctx, 'NU · OKT 2026', nx, y - 108, C.goud, 'center', 28); if (nuLab) text(ctx, nuLab, nx, y + 110, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }
function bak(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = '#8FA0B5' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 20, y); ctx.lineTo(x + w / 2 - 20, y); ctx.lineTo(x + w / 2, y - h); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
  text(ctx, kop, x, y + 50, fTekst(32, 700), C.text, 'center'); metaText(ctx, sub, x, y + 88, C.grain, 'center', 28); ctx.restore(); }
function keurmerk(ctx, x, y, a = 1, streep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 44, '#5E8F5A', '#9CC48A', 3); text(ctx, 'bio', x, y + 10, fTekst(28, 800), '#F2F2EE', 'center'); if (streep > 0.01) { ctx.globalAlpha *= streep; ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 46, y - 46); ctx.lineTo(x + 46, y + 46); ctx.stroke(); } ctx.restore(); }

// ---------- afweging ----------
function argKaart(ctx, x, y, w, kop, voet, a = 1, laag = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = voet ? 104 : 70; roundRect(ctx, x - w / 2, y - h / 2, w, h, 10); shape(ctx, '#2A3A58', laag ? C.goud : '#8FA0B5', 2);
  text(ctx, kop, x, y + (voet ? -8 : 11), fTekst(30, 700), C.text, 'center'); if (voet) metaText(ctx, voet, x, y + 34, C.grain, 'center', 28); ctx.restore(); }
function balans(ctx, x, y, a = 1, tilt = 0, H = 300) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 80, y); ctx.lineTo(x + 80, y); ctx.stroke(); const an = tilt * 0.15; ctx.save(); ctx.translate(x, y - H); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-460, 0); ctx.lineTo(460, 0); ctx.stroke(); ctx.restore();
  circ(ctx, x, y - H, 12, C.goud, null); ctx.restore(); }
function meter(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 30, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y - 20); ctx.stroke(); ctx.restore(); }
function gewichtje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y + 20); ctx.lineTo(x + 26, y + 20); ctx.lineTo(x + 18, y - 14); ctx.lineTo(x - 18, y - 14); ctx.closePath(); ctx.fillStyle = '#C9D2DE'; ctx.fill(); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y - 22, 8, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- koe (uit Diergeneeskunde, teken_dg0.js r. 1–50) ----------
// gladde gesloten (of open) lijn door punten (midpuntmethode)
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');

// poot: van (x, y0) naar de grond (y = 0), met knie/hak-knik dx; hoef of voetje
function poot(ctx, x, y0, b, kleur, hoef, o = {}) { const { knik = 0, buig = 0, voet = 'hoef', hoefH = 14, smal = 0.42 } = o;
  const k = y0 * 0.45; ctx.beginPath(); ctx.moveTo(x - b * 0.62, y0); ctx.quadraticCurveTo(x - b * 0.5 + knik, k, x - b * smal + buig, -hoefH); ctx.lineTo(x + b * smal + buig, -hoefH); ctx.quadraticCurveTo(x + b * 0.5 + knik, k, x + b * 0.62, y0); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  if (voet === 'hoef') { roundRect(ctx, x - b * (smal + 0.1) + buig, -hoefH - 2, b * (smal + 0.1) * 2, hoefH + 2, 3); ctx.fillStyle = hoef; ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(x + buig + b * 0.15, -hoefH * 0.4, b * 0.62, hoefH * 0.55, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); } }

function _start(ctx, x, y, s, kijk, a) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); }

// ---------- KOE (Holstein-bont) ----------
const KOE_ROMP = [[-205, -190], [-196, -222], [-150, -236], [-50, -230], [60, -236], [120, -244], [158, -228], [176, -196], [168, -150], [140, -112], [92, -98], [30, -94], [-50, -96], [-120, -100], [-172, -116], [-202, -150]];
const KOE_KOP = [[150, -232], [186, -246], [214, -238], [244, -206], [266, -168], [270, -142], [256, -126], [232, -128], [210, -150], [176, -170], [150, -186]];
// o: a, kijk, t, kauw (0..1 kaak), bont, uier, doorsnede (0..1: romp doorzichtig), staart (zwaai), horens, kalf
function koe(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kauw = 0, bont = true, uier = 1, doorsnede = 0, staart = 0.3, horens = true, kleur = '#F2EEE6', vlek = '#2A2622', binnen = null } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const romp = 1 - doorsnede * 0.72, rand = '#6A6258';
  // achterste poten (donkerder)
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -168, -130, 30, _dk(kleur, 0.18), '#3A3430', { knik: -14, smal: 0.36 }); poot(ctx, 104, -108, 28, _dk(kleur, 0.18), '#3A3430', { smal: 0.36 }); ctx.restore();
  // staart
  const zw = Math.sin(t * 1.4) * 10 * staart; ctx.save(); ctx.globalAlpha *= romp; ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-198, -214); ctx.quadraticCurveTo(-222 + zw * 0.3, -150, -214 + zw, -70); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-214 + zw, -58, 9, 18, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.restore();
  // romp + nek + kop
  ctx.save(); ctx.globalAlpha *= romp; zacht(ctx, KOE_ROMP); ctx.fillStyle = kleur; ctx.fill();
  ctx.beginPath(); ctx.moveTo(110, -240); ctx.quadraticCurveTo(150, -250, 176, -236); ctx.lineTo(196, -170); ctx.quadraticCurveTo(170, -120, 128, -112); ctx.closePath(); ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_ROMP); ctx.clip(); ctx.fillStyle = vlek; [[-150, -190, 50, 38, 1], [-60, -215, 46, 30, 3], [30, -150, 58, 40, 5], [-110, -120, 30, 20, 7], [110, -200, 40, 34, 9]].forEach(([bx, by, rx, ry, sd]) => { blob(ctx, bx, by, rx, ry, 0.28, sd); ctx.fill(); }); ctx.restore(); }
  // uier
  if (uier > 0.01) { ctx.save(); ctx.globalAlpha *= uier; ctx.beginPath(); ctx.ellipse(-108, -94, 40, 24, 0, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); ctx.fillStyle = '#D89C90'; [-130, -112, -94].forEach(px => { roundRect(ctx, px - 4, -76, 8, 14, 3); ctx.fill(); }); ctx.restore(); }
  ctx.restore();
  if (binnen) binnen(ctx);
  // voorste poten
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -128, -118, 32, kleur, '#3A3430', { knik: -16, smal: 0.36 }); poot(ctx, 146, -108, 30, kleur, '#3A3430', { smal: 0.36 });
  // kop
  const kk = kauw * Math.sin(t * 9) * 3; zacht(ctx, KOE_KOP); ctx.fillStyle = kleur; ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_KOP); ctx.clip(); ctx.fillStyle = vlek; blob(ctx, 196, -222, 36, 26, 0.2, 4); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(258, -142 + kk, 18, 20, 0.2, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); circ(ctx, 263, -150 + kk, 3.5, '#8A5A50');
  circ(ctx, 220, -196, 6.5, '#1A1612'); circ(ctx, 222, -198, 2, '#FFFFFF');
  ctx.beginPath(); ctx.ellipse(180, -232, 26, 10, -0.35, 0, 6.283); ctx.fillStyle = _dk(kleur, 0.08); ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke();
  if (horens) { ctx.beginPath(); ctx.moveTo(196, -240); ctx.quadraticCurveTo(204, -262, 222, -266); ctx.quadraticCurveTo(208, -252, 206, -238); ctx.closePath(); ctx.fillStyle = '#D8CBB0'; ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// koe in doorsnede: de vier maagdelen (u = 0..1 opbouw; nadruk: 'pens'|'net'|'boek'|'leb'|null). Coördinaten in koe-eenheden.
