// Variant A (27 okt 2026): bijbal als gekronkelde buis tegen de achterkant (kop boven, staart onder) die overgaat in
// de zaadleider (goud, zoals in manDoorsnede); kapsel in weefselkleur i.p.v. lichtblauw; lumen van de buisjes even
// licht als in zaadbalWeefsel (één stijl). Optie o.bijbal (0..1, standaard 1). Bron: Junqueira h. 21; OpenStax A&P 27.1.
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0, col = '#E8D2C4', bijbal = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // bijbal: gekronkelde buis tegen de achterkant (hier links), kop boven, staart onder; uit de staart vertrekt de zaadleider omhoog
  if (bijbal > 0.01) { ctx.save(); ctx.globalAlpha *= bijbal; const bx = x - rx * 1.02, band = []; for (let i = 0; i <= 40; i++) { const u = i / 40, an = lerp(-2.0, 2.1, u) + Math.PI; band.push([x + Math.cos(an) * rx * 1.06 - (u < 0.2 ? (0.2 - u) * rx * 0.4 : 0), y - Math.sin(an) * ry * 0.98 * -1]); }
    const bw = Math.max(3, rx * 0.09); ctx.strokeStyle = '#B88A76'; ctx.lineWidth = bw * 1.9; ctx.beginPath(); bioPad(ctx, band.slice(0, 34), false); ctx.stroke();
    ctx.strokeStyle = '#D9B4A2'; ctx.lineWidth = bw * 1.5; ctx.stroke();
    if (rx > 40) { ctx.strokeStyle = '#8E5A4A'; ctx.lineWidth = Math.max(1, rx * 0.012); ctx.beginPath(); const D = bioDicht(band.slice(0, 34), 3); D.forEach((p, i) => { if (i === 0) return; const q = D[i - 1], an = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2, o2 = Math.sin(i * 0.9) * bw * 0.5; const px = p[0] + Math.cos(an) * o2, py = p[1] + Math.sin(an) * o2; i === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }); ctx.stroke(); }
    const e = band.filter(p => p[0] < x - rx * 0.5).reduce((A, B) => (B[1] > A[1] ? B : A)); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, rx * 0.04); ctx.beginPath(); bioPad(ctx, [e, [e[0] - rx * 0.18, e[1] - ry * 0.1], [x - rx * 1.32, y], [x - rx * 1.25, y - ry * 1.15]], false); ctx.stroke(); ctx.restore(); }
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), col, Math.max(2.5, rx * 0.03)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const bx = x + px, by = y + py, r = rb * (0.92 + 0.12 * hash(i + 3));
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#3A4458', 0.6); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.75); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283; _bioCirc(ctx, x + px + Math.cos(an) * rb * 1.08, y + py + Math.sin(an) * rb * 1.08, Math.max(1.5, rb * 0.16), rgba(C.goud, 0.85 * leydig)); });
  ctx.restore(); ctx.restore();
}
