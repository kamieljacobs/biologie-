// botcellen in kalk (zoomcirkel): ringen van kalk rond een kanaaltje met bloedvat, botcellen met uitlopers in de ringen
function botWeefsel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#D9CFB6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const centra = [[-0.35, -0.3], [0.42, -0.2], [0, 0.45], [-0.6, 0.5], [0.75, 0.55], [-0.05, -0.85], [0.8, -0.8]];
  centra.forEach(([cx0, cy0], j) => { const cx = x + cx0 * r, cy = y + cy0 * r, R0 = r * 0.36;
    for (let k = 5; k >= 1; k--) { ctx.beginPath(); ctx.arc(cx, cy, R0 * k / 5, 0, 6.283); ctx.strokeStyle = rgba('#A89A7A', 0.7); ctx.lineWidth = 1.2; ctx.stroke(); }
    circ(ctx, cx, cy, R0 * 0.16, '#3A2A2A'); circ(ctx, cx, cy, R0 * 0.07, rgba(BIO.bloed, levend)); // kanaal met bloedvat
    for (let i = 0; i < 9; i++) { const an = i * 0.7 + j, rr = R0 * (0.4 + 0.5 * hash(i + j * 9)), bx = cx + Math.cos(an) * rr, by = cy + Math.sin(an) * rr;
      ctx.save(); ctx.globalAlpha *= levend; ctx.strokeStyle = rgba(BIO.kern, 0.7); ctx.lineWidth = 1; for (let q = 0; q < 4; q++) { const aq = an + q * 1.57 + 0.4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(aq) * R0 * 0.12, by + Math.sin(aq) * R0 * 0.12); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(bx, by, R0 * 0.07, R0 * 0.04, an + 1.57, 0, 6.283); shape(ctx, BIO.kern, BIO.kernL, 1); ctx.restore(); } });
  ctx.restore(); }
