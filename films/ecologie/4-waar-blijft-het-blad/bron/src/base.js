// Evolutie v2 — kleine tekenhulpen (overgenomen uit Bestaat dit echt?, 22 okt 2026)
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _mix(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2 + Math.cos(an) * 2, y2 + Math.sin(an) * 2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.moveTo(x2 + Math.cos(an) * 2, y2 + Math.sin(an) * 2); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }
