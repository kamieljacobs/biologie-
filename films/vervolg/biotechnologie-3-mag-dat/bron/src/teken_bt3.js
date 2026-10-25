// Wat word jij? · Biotechnologie · film 3 Mag dat? — tekenset (25 okt 2026)
// Gebruikt teken_bt1.js (Sam, Merel, bioreactor, kaartje, labVloer), teken_bt2.js (genStreep) en de koe uit Diergeneeskunde (teken_dg0, gekopieerd onderaan).
const KL_PLANT = '#5E8F5A', KL_PLANT2 = '#7FAF6A', KL_GROND = '#3A3328', KL_STUIF = '#E8C766', KL_SOJA = C.oker || '#C9A35C';

// ---------- maïsplant (zijaanzicht), y = grond ----------
function maisPlant(ctx, x, y, h, o = {}) { const { a = 1, t = 0, kolf = 1, pluim = 1, seed = 1, ggo = 0 } = o; if (a <= 0.01 || h <= 1) return {}; ctx.save(); ctx.globalAlpha *= a;
  const sw = Math.sin(t * 1.1 + seed) * 0.025 * h, top = [x + sw, y - h * 0.86], lw = Math.max(3, h * 0.03);
  const stengel = (f) => [x + sw * f * f, y - h * 0.86 * f];
  // bladeren: lange gebogen linten met middennerf, afwisselend links/rechts, onderaan langer
  const blad = (f, s, L, col) => { const [bx, by] = stengel(f), wv = Math.sin(t * 1.6 + f * 9 + seed) * 0.03 * L;
    const tip = [bx + s * L * 0.95, Math.min(by + L * 0.3 + wv * 20, y - h * 0.03)], c1 = [bx + s * L * 0.35, by - L * 0.42], c2 = [bx + s * L * 0.8, by - L * 0.18];
    ctx.beginPath(); ctx.moveTo(bx, by - lw); ctx.bezierCurveTo(c1[0], c1[1] - L * 0.05, c2[0], c2[1] - L * 0.04, tip[0], tip[1]);
    ctx.bezierCurveTo(c2[0] - s * L * 0.02, c2[1] + L * 0.07, c1[0] - s * L * 0.05, c1[1] + L * 0.1, bx, by + lw * 1.5); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = rgba('#DCEBC8', 0.45); ctx.lineWidth = Math.max(1, h * 0.004); ctx.beginPath(); ctx.moveTo(bx, by); ctx.bezierCurveTo(c1[0], c1[1] + L * 0.02, c2[0], c2[1] + L * 0.02, tip[0], tip[1]); ctx.stroke(); };
  [[0.16, -1, 0.5, '#4F7F4A'], [0.28, 1, 0.52, KL_PLANT], [0.4, -1, 0.5, KL_PLANT2], [0.52, 1, 0.46, KL_PLANT], [0.64, -1, 0.4, KL_PLANT2], [0.76, 1, 0.32, KL_PLANT]].forEach(([f, sd, L, col], k) => blad(f, (seed % 2 ? -sd : sd), h * L, col));
  // stengel met knopen
  ctx.strokeStyle = '#6E9A55'; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); for (let k = 1; k <= 20; k++) { const p = stengel(k / 20); ctx.lineTo(p[0], p[1]); } ctx.stroke();
  ctx.strokeStyle = '#8DB46E'; ctx.lineWidth = Math.max(1.5, lw * 0.35); [0.16, 0.28, 0.4, 0.52, 0.64, 0.76].forEach(f => { const [bx, by] = stengel(f); ctx.beginPath(); ctx.moveTo(bx - lw * 0.7, by); ctx.lineTo(bx + lw * 0.7, by); ctx.stroke(); });
  // steunwortels
  ctx.strokeStyle = '#7C8A55'; ctx.lineWidth = Math.max(1.5, lw * 0.4); for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x, y - h * 0.04); ctx.quadraticCurveTo(x + d * h * 0.03, y - h * 0.02, x + d * h * 0.05, y); ctx.stroke(); }
  // kolf in schutbladeren met zijden draden
  if (kolf > 0.01) { ctx.save(); ctx.globalAlpha *= kolf; const [kx0, ky0] = stengel(0.46), d = seed % 2 ? -1 : 1, kx = kx0 + d * h * 0.04, ky = ky0 - h * 0.02;
    ctx.save(); ctx.translate(kx, ky); ctx.rotate(d * 0.32); ctx.beginPath(); ctx.ellipse(0, 0, h * 0.032, h * 0.095, 0, 0, 6.283); ctx.fillStyle = '#E8C766'; ctx.fill();
    ctx.fillStyle = rgba('#B8902E', 0.5); for (let r = -3; r <= 3; r++) for (let c = -1; c <= 1; c++) { ctx.beginPath(); ctx.arc(c * h * 0.012, r * h * 0.022, h * 0.005, 0, 6.283); ctx.fill(); }
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, h * 0.11); ctx.quadraticCurveTo(sd * h * 0.06, h * 0.02, sd * h * 0.012, -h * 0.085); ctx.quadraticCurveTo(sd * h * 0.025, h * 0.02, 0, h * 0.11); ctx.fillStyle = sd < 0 ? '#8DB46E' : '#7FAF6A'; ctx.fill(); }
    ctx.strokeStyle = '#C9906A'; ctx.lineWidth = Math.max(1, h * 0.003); for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(0, -h * 0.09); ctx.quadraticCurveTo(k * h * 0.01, -h * 0.12, k * h * 0.02, -h * 0.13); ctx.stroke(); }
    ctx.restore(); ctx.restore(); }
  // pluim: hoofdas met zijtakken vol meeldraden
  if (pluim > 0.01) { ctx.save(); ctx.globalAlpha *= pluim; ctx.strokeStyle = '#C9B26A'; ctx.lineWidth = Math.max(1.5, h * 0.007);
    const tp = [top[0], top[1] - h * 0.12]; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(tp[0], tp[1]); ctx.stroke();
    for (let k = 0; k < 5; k++) { const f = 0.15 + k * 0.17, by = top[1] - h * 0.12 * f, sd = k % 2 ? 1 : -1, L = h * (0.13 - k * 0.012);
      const ex = top[0] + sd * L, ey = by + L * 0.55 + Math.sin(t * 2 + k) * 2; ctx.beginPath(); ctx.moveTo(top[0], by); ctx.quadraticCurveTo(top[0] + sd * L * 0.5, by - L * 0.15, ex, ey); ctx.stroke();
      ctx.fillStyle = '#E3CF85'; for (let m = 1; m <= 5; m++) { const u = m / 6; ctx.beginPath(); ctx.arc(lerp(top[0], ex, u), lerp(by, ey, u * u) - L * 0.08 * (1 - u), Math.max(1.5, h * 0.005), 0, 6.283); ctx.fill(); } }
    ctx.restore(); }
  if (ggo > 0.01) { ctx.save(); ctx.globalAlpha *= ggo; const [gx, gy] = stengel(0.62); circ(ctx, gx - (seed % 2 ? -1 : 1) * h * 0.06, gy - h * 0.06, Math.max(8, h * 0.035), C.paars, lighten(C.paars, 0.3), 2); ctx.restore(); }
  ctx.restore(); return { top: [top[0], top[1] - h * 0.12] }; }
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
  circ(ctx, x + 70, y - 196, 12, klaar > 0.5 ? C.groen : C.koraal, null); text(ctx, 'autoclaaf', x - 130, y - 100, fTekst(30, 700), C.text, 'right'); ctx.restore(); }
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
  roundRect(ctx, x - 170, y - 90, 340, 180, 18); shape(ctx, '#22314C', col, 2); if (rand > 0.01) { ctx.save(); ctx.globalAlpha *= rand; roundRect(ctx, x - 178, y - 98, 356, 196, 22); ctx.strokeStyle = randCol; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  if (mais > 0.01) for (let i = 0; i < 4; i++) maisPlant(ctx, x - 90 + i * 60, y + 30, 90, { a: mais, seed: i, kolf: 0 });
  text(ctx, naam, x, y - 46, fTekst(32, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x, y + 70, C.grain, 'center', 28); ctx.restore(); }
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
  punten.forEach(([f, kop, sub], i) => { const k = clamp(u * punten.length - i, 0, 1); if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; circ(ctx, x + f * w, y, 12, '#F2F2EE', null); text(ctx, kop, x + f * w, y - 34, fTekst(28, 700), C.text, 'center'); metaText(ctx, sub, x + f * w, y + 52, C.grain, 'center', 28); ctx.restore(); });
  if (nuA > 0.01) { ctx.save(); ctx.globalAlpha *= nuA; const nx = x + nu * w; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(nx, y - 70); ctx.lineTo(nx - 14, y - 96); ctx.lineTo(nx + 14, y - 96); ctx.closePath(); ctx.fill(); metaText(ctx, 'NU · OKT 2026', nx, y - 108, C.goud, 'center', 28); if (nuLab) text(ctx, nuLab, nx, y + 110, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }
function bak(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = '#8FA0B5' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 20, y); ctx.lineTo(x + w / 2 - 20, y); ctx.lineTo(x + w / 2, y - h); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
  text(ctx, kop, x, y + 50, fTekst(32, 700), C.text, 'center'); metaText(ctx, sub, x, y + 88, C.grain, 'center', 28); ctx.restore(); }
function keurmerk(ctx, x, y, a = 1, streep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 44, '#5E8F5A', '#9CC48A', 3); text(ctx, 'bio', x, y + 10, fTekst(28, 800), '#F2F2EE', 'center'); if (streep > 0.01) { ctx.globalAlpha *= streep; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 46, y - 46); ctx.lineTo(x + 46, y + 46); ctx.stroke(); } ctx.restore(); }

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

// kaartje (overschrijft teken_bt1): breedte past op kop én Meta-regel, Meta 28 px
function kaartje(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = C.goud, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.font = fTekst(34, 700); let wk = ctx.measureText(kop).width; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const wm = sub ? ctx.measureText(sub.toUpperCase()).width : 0; ctx.letterSpacing = '0px';
  w = Math.max(w, wk + 70, wm + 70); h = Math.max(h, sub ? 110 : 80); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#22324E', hl > 0.5 ? col : rgba(C.line, 0.6), hl > 0.5 ? 3 : 2);
  ctx.fillStyle = col; ctx.fillRect(x - w / 2 + 14, y - h / 2 + 14, 6, h - 28); text(ctx, kop, x - w / 2 + 36, y - h / 2 + 50, fTekst(34, 700), C.text, 'left'); if (sub) metaA(ctx, sub, x - w / 2 + 36, y - h / 2 + 88, 1, C.grain, 'left', 28); ctx.restore(); }
