// Wat word jij? · Diergeneeskunde 3 · Van dier naar mens — eigen tekeningen (21 okt 2026). Gebruikt de gedeelde dieren uit teken_dg0.js.

// schematische kaart van Noord-Brabant (vereenvoudigde omtrek); pat = 0..1 aantal patiëntstippen; boer = 0..1 geitenbedrijven; link = 0..1 lijnen bedrijf → stippen
const BRABANT = [[-430, -40], [-380, -130], [-250, -160], [-120, -150], [0, -170], [120, -150], [250, -175], [360, -140], [420, -60], [430, 40], [380, 110], [300, 140], [240, 120], [160, 170], [40, 150], [-60, 170], [-170, 140], [-300, 150], [-400, 90]];
function brabantKaart(ctx, x, y, s, a = 1, o = {}) { const { pat = 0, boer = 0, link = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  zacht(ctx, BRABANT); shape(ctx, '#24344F', C.line, 2.5);
  const boeren = [[-60, -20], [130, 30], [250, -40], [40, 90]];
  if (boer > 0.01) boeren.forEach(([bx, by], i) => { const f = clamp(boer * 4 - i, 0, 1); if (f <= 0) return; ctx.save(); ctx.globalAlpha *= f; ctx.fillStyle = C.oker; ctx.beginPath(); ctx.moveTo(bx - 18, by + 10); ctx.lineTo(bx - 18, by - 6); ctx.lineTo(bx, by - 20); ctx.lineTo(bx + 18, by - 6); ctx.lineTo(bx + 18, by + 10); ctx.closePath(); ctx.fill(); ctx.restore(); });
  const N = 70; for (let i = 0; i < N; i++) { const f = clamp(pat * N - i, 0, 1); if (f <= 0) continue; const b = boeren[i % 4], an = hash(i * 3.7) * 6.283, r = 18 + hash(i * 1.9) * 110; const px = clamp(b[0] + Math.cos(an) * r * 1.3, -380, 380), py = clamp(b[1] + Math.sin(an) * r * 0.7, -130, 130);
    if (link > 0.01 && i % 5 === 0) { ctx.save(); ctx.globalAlpha *= link * 0.5; ctx.strokeStyle = C.oker; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(px, py); ctx.stroke(); ctx.restore(); }
    circ(ctx, px, py, 6 * f, C.koraal); }
  ctx.restore(); }
// thermometer
function thermometer(ctx, x, y, h, a = 1, stand = 0.8) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - h, 24, h, 12); shape(ctx, '#E8ECF2', '#9AA3B2', 2); circ(ctx, x, y + 8, 20, C.koraal, '#9AA3B2', 2); roundRect(ctx, x - 5, y - h * stand, 10, h * stand + 8, 5); ctx.fillStyle = C.koraal; ctx.fill(); ctx.restore(); }
// huisje
function huisje(ctx, x, y, s = 1, a = 1, col = '#4A5A78') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.fillRect(-40, -60, 80, 60); ctx.fillStyle = _dk(col, 0.25); ctx.beginPath(); ctx.moveTo(-50, -60); ctx.lineTo(0, -100); ctx.lineTo(50, -60); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-24, -44, 18, 18); ctx.fillRect(8, -44, 18, 18); ctx.restore(); }
// staafvormige bacterie (Coxiella, klein)
function staafje(ctx, x, y, r, an, col = C.koraal) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -r, -r * 0.45, r * 2, r * 0.9, r * 0.45); shape(ctx, col, _lt(col, 0.3), 1); ctx.restore(); }
// stofwolk die met de wind meewaait van (x0,y0) naar (x1,y1); u = 0..1 hoe ver; met bacteriën
function stofWind(ctx, x0, y0, x1, y1, u, t, a = 1) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 46; i++) { const f = ((hash(i * 2.1) + t * 0.08) % 1) * u; const px = x0 + (x1 - x0) * f + Math.sin(f * 9 + i) * 30, py = y0 + (y1 - y0) * f + Math.cos(f * 7 + i * 2) * 50 - Math.sin(f * 3.14) * 60;
    ctx.fillStyle = `rgba(201,184,150,${0.28 * (1 - f * 0.5)})`; ctx.beginPath(); ctx.arc(px, py, 10 + hash(i) * 12, 0, 6.283); ctx.fill(); if (i % 3 === 0) staafje(ctx, px, py, 6, hash(i) * 3, C.koraal); }
  ctx.strokeStyle = rgba(C.text2, 0.6); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const yy = y0 - 120 + k * 40, xx = x0 + 60 + ((t * 80 + k * 90) % 300); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 60, yy - 16, xx + 120, yy); ctx.stroke(); }
  ctx.restore(); }
// dood lammetje (liggend, grijzig) met placenta
function lamDood(ctx, x, y, s = 1, a = 1, bact = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#CFC8BA'; ctx.beginPath(); ctx.ellipse(0, -16, 46, 16, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(46, -18, 16, 11, 0.2, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#CFC8BA'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -6); ctx.lineTo(-50, 0); ctx.moveTo(20, -4); ctx.lineTo(40, 0); ctx.stroke();
  ctx.fillStyle = '#A84A48'; blob(ctx, -80, -10, 34, 14, 0.25, 3); ctx.fill();
  if (bact > 0.01) for (let i = 0; i < 24; i++) { const f = clamp(bact * 24 - i, 0, 1); if (f <= 0) continue; ctx.save(); ctx.globalAlpha *= f; staafje(ctx, -110 + hash(i * 3.3) * 70, -24 + hash(i * 5.7) * 26, 5, hash(i) * 3 + t * 0.3, '#F2C94C'); ctx.restore(); }
  ctx.restore(); }
// teek
function teek(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#3A2A20'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-10, -6 + i * 5); ctx.lineTo(-28, -14 + i * 9); ctx.moveTo(10, -6 + i * 5); ctx.lineTo(28, -14 + i * 9); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(0, 4, 16, 22, 0, 0, 6.283); ctx.fillStyle = '#6A3A28'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -20, 7, 7, 0, 0, 6.283); ctx.fillStyle = '#3A2A20'; ctx.fill(); ctx.restore(); }
// vos en zeehond (silhouetten in kleur)
function vos(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#C9672E';
  ctx.fillStyle = k; zacht(ctx, [[-90, -50], [-150, -40], [-170, -20], [-130, -26], [-90, -34]]); ctx.fill(); ctx.fillStyle = '#F2EEE6'; circ(ctx, -168, -22, 8, '#F2EEE6');
  ctx.fillStyle = k; zacht(ctx, [[-96, -60], [-40, -70], [40, -66], [70, -50], [60, -34], [-80, -32]]); ctx.fill(); [[-70, -36], [-50, -36], [36, -40], [56, -40]].forEach(([px, py]) => { ctx.fillStyle = '#2A1E16'; ctx.fillRect(px - 4, py, 8, -py); });
  ctx.fillStyle = k; zacht(ctx, [[50, -60], [74, -86], [96, -84], [130, -70], [100, -58], [70, -50]]); ctx.fill(); ctx.beginPath(); ctx.moveTo(76, -82); ctx.lineTo(80, -104); ctx.lineTo(90, -84); ctx.closePath(); ctx.fill(); circ(ctx, 128, -70, 3, '#1A1612'); circ(ctx, 94, -76, 2.5, '#1A1612'); ctx.restore(); }
function zeehond(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#7A8494';
  zacht(ctx, [[-110, -10], [-60, -30], [20, -46], [70, -54], [96, -46], [100, -30], [60, -10], [-20, 0], [-90, 2]]); ctx.fill(); ctx.beginPath(); ctx.moveTo(-104, -6); ctx.lineTo(-136, -22); ctx.lineTo(-130, 4); ctx.closePath(); ctx.fill(); circ(ctx, 82, -42, 3.5, '#121212'); circ(ctx, 98, -36, 2.5, '#121212'); ctx.restore(); }
// loket: paneel met titel en een rij inhoud
function loket(ctx, x, y, w, h, titel, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(col, 0.1), col, 2); regel(ctx, titel, x + w / 2, y + 50, 1, col, 32, 'center', 800); ctx.restore(); }
// injectiespuit
function spuit(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -60, -12, 100, 24, 6); shape(ctx, 'rgba(230,240,255,0.7)', '#9AA3B2', 2); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fillRect(-20, -9, 56, 18); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-90, -4, 30, 8); ctx.fillRect(-96, -14, 8, 28); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(80, 0); ctx.stroke(); ctx.restore(); }
// melktank met reageerbuisje
function melkTank(ctx, x, y, s = 1, a = 1, test = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -140, -160, 280, 130, 60); shape(ctx, '#B8C2D0', '#E0E6EE', 2); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-110, -140); ctx.lineTo(110, -140); ctx.stroke(); roundRect(ctx, -30, -180, 60, 24, 6); shape(ctx, '#9AA6B8', '#E0E6EE', 2); ctx.fillStyle = '#8A96A8'; ctx.fillRect(-100, -30, 12, 30); ctx.fillRect(88, -30, 12, 30); ctx.fillRect(130, -70, 30, 10); ctx.fillRect(152, -76, 10, 24); text(ctx, 'MELK', 0, -86, fTekst(26, 800), '#5A6478', 'center');
  if (test > 0.01) { ctx.save(); ctx.globalAlpha *= test; roundRect(ctx, 140, -150, 30, 110, 14); shape(ctx, 'rgba(240,240,232,0.85)', '#9AA3B2', 2); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(144, -100, 22, 56); ctx.restore(); } ctx.restore(); }
// lijngrafiek (procent van een beginwaarde) met jaartallen
function lijnGrafiek(ctx, x, y, w, h, punten, a = 1, nu = 1, col = C.groen, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { x0 = 2009, x1 = 2025, ylab = '' } = o;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const X = (j) => x + (j - x0) / (x1 - x0) * w, Y = (v) => y - v * h; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.max(2, Math.ceil(punten.length * nu));
  punten.slice(0, n).forEach(([j, v], i) => { i ? ctx.lineTo(X(j), Y(v)) : ctx.moveTo(X(j), Y(v)); }); ctx.stroke();
  regel(ctx, String(x0), x, y + 36, 1, C.text2, 24, 'center', 600); regel(ctx, String(x1), x + w, y + 36, 1, C.text2, 24, 'center', 600); if (ylab) metaText(ctx, ylab, x, y - h - 20, C.text2, 'left', 20); ctx.restore(); }
// neus in zoomcirkel met bacteriën (trosjes)
function neusMRSA(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#2A1E22', C.line, 3); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 6.283); ctx.clip();
  ctx.fillStyle = '#C98A7A'; ctx.beginPath(); ctx.ellipse(x - r * 0.2, y + r * 0.1, r * 0.75, r * 0.55, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#5A3030'; ctx.beginPath(); ctx.ellipse(x - r * 0.15, y + r * 0.1, r * 0.4, r * 0.25, 0, 0, 6.283); ctx.fill();
  for (let k = 0; k < 6; k++) { const cx = x - r * 0.4 + hash(k * 2.2) * r * 0.6, cy = y - r * 0.05 + hash(k * 4.4) * r * 0.3; for (let i = 0; i < 6; i++) circ(ctx, cx + (i % 3) * 9 + Math.sin(t + k) * 1.5, cy + Math.floor(i / 3) * 9, 5, '#E0B64A', '#F2D27A', 1); }
  ctx.restore(); ctx.restore(); }
// driehoek One Health: mens, dier, omgeving (rondjes met icoontjes); a = alpha, u = verbinding
function oneHealth(ctx, x, y, R, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = [[x, y - R], [x - R * 0.9, y + R * 0.55], [x + R * 0.9, y + R * 0.55]];
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); ctx.restore(); }
  [['mens', C.teal], ['dier', C.oker], ['omgeving', C.groen]].forEach(([n, col], i) => { circ(ctx, P[i][0], P[i][1], 70, rgba(col, 0.2), col, 3); regel(ctx, n, P[i][0], P[i][1] + 112, 1, col, 32, 'center', 800); });
  persoon(ctx, 'noor', P[0][0], P[0][1] + 52, 100, { t, uit: 'blij' }); geit(ctx, P[1][0], P[1][1] + 40, 0.45, {}); ctx.save(); ctx.fillStyle = '#4F8F6A'; ctx.beginPath(); ctx.moveTo(P[2][0], P[2][1] - 44); ctx.lineTo(P[2][0] - 34, P[2][1] + 14); ctx.lineTo(P[2][0] + 34, P[2][1] + 14); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#6B4A30'; ctx.fillRect(P[2][0] - 6, P[2][1] + 14, 12, 22); ctx.restore();
  ctx.restore(); }
// ziekenhuisbed
function ziekenhuisBed(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-120, -60, 8, 60); ctx.fillRect(112, -50, 8, 50); roundRect(ctx, -120, -70, 240, 24, 6); shape(ctx, '#E8ECF2', '#9AA3B2', 2); roundRect(ctx, -110, -96, 60, 26, 10); shape(ctx, '#F2F2EE', null); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-126, -130, 8, 130); ctx.restore(); }
// recept/briefje
function recept(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.08); roundRect(ctx, -60, -80, 120, 160, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'Rx', -40, -40, fTitel(30), '#1A2740', 'left'); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40, -10 + i * 22); ctx.lineTo(40 - (i % 2) * 20, -10 + i * 22); ctx.stroke(); } ctx.restore(); }
// wattenstaafje (in de hand)
function wattenstaafje(ctx, x, y, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#E8ECF2'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(60, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(66, 0, 9, 6, 0, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill(); ctx.restore(); }
