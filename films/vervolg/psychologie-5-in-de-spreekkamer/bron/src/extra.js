function kamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#22314F'; ctx.fillRect(0, 0, W, 640); // wand
  ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 640); ctx.lineTo(W, 640); ctx.stroke();
  roundRect(ctx, 1500, 150, 300, 230, 8); shape(ctx, '#2C4A6E', rgba(C.line, 0.6), 2); // raam
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.beginPath(); ctx.moveTo(1650, 150); ctx.lineTo(1650, 380); ctx.moveTo(1500, 265); ctx.lineTo(1800, 265); ctx.stroke();
  // plant
  ctx.fillStyle = '#6A4A3A'; roundRect(ctx, 1600, 560, 90, 80, 10); ctx.fill();
  ctx.fillStyle = C.chloro; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(1645 + (i - 2) * 22, 530 - Math.abs(i - 2) * 14, 18, 46, (i - 2) * 0.35, 0, 6.283); ctx.fill(); }
  // stoel achter Henk
  roundRect(ctx, 1010, 470, 300, 230, 30); shape(ctx, '#4A3F5C', null);
  ctx.restore(); }
function bureau(ctx, a = 1, pen = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A4632'; ctx.beginPath(); ctx.moveTo(0, 790); ctx.lineTo(W, 790); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6E573E'; ctx.fillRect(0, 790, W, 14);
  // notitieboek van 'jij'
  ctx.save(); ctx.translate(250, 800); ctx.rotate(-0.06); roundRect(ctx, 0, 0, 380, 90, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.strokeStyle = '#B8C4D4'; ctx.lineWidth = 2; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(20, 30 + i * 28); ctx.lineTo(360, 30 + i * 28); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  metaText(ctx, 'jij · psycholoog', 270, 780, C.grain, 'left', 26); }
function vraagKaartje(ctx, x, y, w, tekst, a = 1, stempelT = '', stCol = C.koraal, goed = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 90, 12); shape(ctx, '#F2EEE4', goed ? C.groen : '#B8B0A0', goed ? 3 : 2); ctx.font = fTekst(28, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, tekst, x + 20, y + 38, w - 40, 32); ctx.restore(); if (stempelT) stempel(ctx, x + w - 90, y + 70, stempelT, stCol, a); }
function checkRij(ctx, x, y, s2, a = 1, staat = 0, col = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 56, 56, 10); shape(ctx, '#2A3A58', rgba(C.line, 0.7), 2); ctx.restore(); if (staat === 1) vink_(ctx, x + 28, y - 6, 18, a); if (staat === -1) kruis(ctx, x + 28, y - 6, 16, a); regel(ctx, s2, x + 84, y + 4, a, col, 32, 'left', 700); }
function hBalk(ctx, x, y, w, frac, col, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); roundRect(ctx, x, y, Math.max(24, w * frac), 40, 10); shape(ctx, rgba(col, 0.85), col, 1.5); text(ctx, s2, x + w + 30, y + 32, fTekst(32, 700), col, 'left'); ctx.restore(); }
