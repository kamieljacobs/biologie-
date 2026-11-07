// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: griepVirus, _mvL
const _mvL = (h, k = 0.25) => _mixHex(h, "#FFFFFF", k), _mvD = (h, k = 0.25) => _mixHex(h, "#000000", k);
function griepVirus(ctx, x, y, r, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((hash(x * 0.37 + y * 0.11) - 0.5) * 1.6); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; // elk virus iets anders gedraaid
  const HA = '#C9B896', NA = '#AFC0D0', ns = 34, lw = Math.max(1, r * 0.035);
  const naPlek = (i) => (i >= 21 && i <= 24) || i === 8 || i === 30;
  for (let i = 0; i < ns; i++) { const an = (i + 0.3 * (hash(i * 3.3) - 0.5)) / ns * 6.283 - Math.PI / 2, c = Math.cos(an), s = Math.sin(an);
    ctx.save(); ctx.rotate(an); const l = r * 0.27 * (0.92 + 0.16 * hash(i * 7.7));
    if (naPlek(i)) { ctx.strokeStyle = NA; ctx.lineWidth = Math.max(1, r * 0.03); ctx.beginPath(); ctx.moveTo(r * 0.98, 0); ctx.lineTo(r + l * 0.62, 0); ctx.stroke();
      roundRect(ctx, r + l * 0.6, -r * 0.065, r * 0.13, r * 0.13, r * 0.025); shape(ctx, rgba(NA, 0.75), _mvL(NA, 0.3), lw); }
    else { ctx.beginPath(); ctx.moveTo(r * 0.98, -r * 0.03); ctx.lineTo(r + l * 0.6, -r * 0.035); ctx.quadraticCurveTo(r + l, -r * 0.06, r + l, 0); ctx.quadraticCurveTo(r + l, r * 0.06, r + l * 0.6, r * 0.035); ctx.lineTo(r * 0.98, r * 0.03); ctx.closePath();
      shape(ctx, rgba(HA, 0.8), _mvL(HA, 0.3), lw); }
    ctx.restore(); }
  // envelop (dubbellaag) en M1-laag
  circ(ctx, 0, 0, r, C.bgMicro); circ(ctx, 0, 0, r, rgba(HA, 0.12), _mvL(HA, 0.2), Math.max(1.4, r * 0.04)); circ(ctx, 0, 0, r * 0.93, null, rgba(HA, 0.7), Math.max(1, r * 0.025));
  ctx.fillStyle = rgba('#9AA3B2', 0.6); const nm = Math.max(18, Math.round(r * 0.9)); for (let i = 0; i < nm; i++) { const an = i / nm * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, Math.max(0.8, r * 0.025), 0, 6.283); ctx.fill(); }
  const RNA = '#3E86AE'; // palet B (29 okt 2026): RNA-segmenten teal zoals D2.rna in lib_bio.js, was paars (RNA)
  // 8 RNP's in een 7+1-bundel, hangend aan de bovenpool; het middelste staafje vooraan
  const L = [0.95, 0.7, 0.9, 0.58, 0.82, 0.5, 0.66, 0.42], X = [-0.33, 0.33, -0.22, 0.22, -0.11, 0.11, 0.0, 0.0], bw = r * 0.1, yT = -r * 0.7;
  [0, 1, 2, 3, 4, 5, 7, 6].forEach((k) => { const xx = X[k] * r + (k === 7 ? r * 0.05 : 0), ll = L[k] * r * 0.95; const yt = yT + Math.abs(X[k]) * r * 0.35;
    ctx.save(); ctx.translate(xx, yt); ctx.rotate(-X[k] * 0.45 + (hash(k * 3.1) - 0.5) * 0.12); // bundel: staafjes lopen naar de pool toe samen
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); shape(ctx, k === 6 ? rgba(RNA, 0.55) : rgba(RNA, 0.32), RNA, Math.max(0.8, r * 0.02));
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); ctx.clip(); ctx.strokeStyle = rgba(_mvL(RNA, 0.3), 0.8); ctx.lineWidth = Math.max(0.7, r * 0.015); ctx.beginPath();
    for (let d = 0; d < ll + bw; d += bw * 0.7) { ctx.moveTo(-bw / 2, d); ctx.lineTo(bw / 2, d - bw * 0.5); } ctx.stroke(); ctx.restore(); });
  ctx.restore(); }
