// =====================================================================================
// GRIEPVIRUS (influenza A). Recept: bol of ei, 80–120 nm; envelop = lipidendubbellaag uit de gastheercel; daaronder een
// laag matrixeiwit (M1); ±300–400 uitsteeksels: hemagglutinine (HA, staafje ±13 nm met verdikte kop) en ±1 op 7
// neuraminidase (NA, dun steeltje met vierkante kop), NA vaak in groepjes; de stekels zijn niet allemaal even lang of
// even recht (ze staan in een vloeibaar membraan). Binnenin 8 RNA-segmenten (RNP's: staafjes 12–15 nm breed,
// 30–130 nm lang, elk een haarspeld: RNA om nucleoproteïne, met het polymerase aan één uiteinde) in een '7 + 1'-bundel
// aan één pool. Hier: de 8 staafjes los van elkaar met een spleetje ertussen, zodat ze te tellen zijn, ongelijk lang.
// Bron: Harris e.a. 2006 PNAS 103:19123; Noda e.a. 2006 Nature 439:490.
// Bekende fouten: virus als bolletje met speldjes; DNA in plaats van RNA; segmenten als één kluwen; virus zo groot als een bacterie.
// =====================================================================================
function griepVirus(ctx, x, y, r, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((hash(x * 0.37 + y * 0.11) - 0.5) * 1.6); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; // elk virus iets anders gedraaid
  const HA = '#C9B896', NA = '#AFC0D0', ns = 36, lw = Math.max(1, r * 0.035);
  const naPlek = (i) => (i >= 22 && i <= 25) || i === 8 || i === 31;
  for (let i = 0; i < ns; i++) { const an = (i + 0.45 * (hash(i * 3.3) - 0.5)) / ns * 6.283 - Math.PI / 2;
    ctx.save(); ctx.rotate(an); const l = r * 0.27 * (0.8 + 0.34 * hash(i * 7.7)), kn = (hash(i * 5.1) - 0.5) * 0.22; // lengte en kanteling verschillen
    ctx.translate(r * 0.98, 0); ctx.rotate(kn); ctx.translate(-r * 0.98, 0);
    if (naPlek(i)) { ctx.strokeStyle = NA; ctx.lineWidth = Math.max(1, r * 0.03); ctx.beginPath(); ctx.moveTo(r * 0.98, 0); ctx.lineTo(r + l * 0.62, 0); ctx.stroke();
      roundRect(ctx, r + l * 0.6, -r * 0.065, r * 0.13, r * 0.13, r * 0.025); shape(ctx, rgba(NA, 0.75), _mvL(NA, 0.3), lw); }
    else { const kw = r * (0.05 + 0.02 * hash(i * 2.1)); ctx.beginPath(); ctx.moveTo(r * 0.98, -r * 0.03); ctx.lineTo(r + l * 0.6, -r * 0.035); ctx.quadraticCurveTo(r + l, -kw, r + l, 0); ctx.quadraticCurveTo(r + l, kw, r + l * 0.6, r * 0.035); ctx.lineTo(r * 0.98, r * 0.03); ctx.closePath();
      shape(ctx, rgba(HA, 0.8), _mvL(HA, 0.3), lw); }
    ctx.restore(); }
  // envelop (dubbellaag) en M1-laag
  circ(ctx, 0, 0, r, C.bgMicro); circ(ctx, 0, 0, r, rgba(HA, 0.12), _mvL(HA, 0.2), Math.max(1.4, r * 0.04)); circ(ctx, 0, 0, r * 0.93, null, rgba(HA, 0.7), Math.max(1, r * 0.025));
  ctx.fillStyle = rgba('#9AA3B2', 0.6); const nm = Math.max(18, Math.round(r * 0.9)); for (let i = 0; i < nm; i++) { const an = i / nm * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * r * 0.86, Math.sin(an) * r * 0.86, Math.max(0.8, r * 0.025), 0, 6.283); ctx.fill(); }
  // 8 RNP's: los van elkaar, aan de bovenpool vastgezet, waaiervormig naar beneden; ongelijk lang (segment 1–8)
  const L = [0.98, 0.94, 0.9, 0.78, 0.7, 0.6, 0.5, 0.42], yT = -r * 0.72, bw = r * (r < 60 ? 0.1 : 0.082), wijd = r * 0.92;
  const volg = [7, 0, 5, 2, 3, 4, 1, 6]; // volgorde van links naar rechts: lang en kort door elkaar
  volg.forEach((k, j) => { const u = j / 7 - 0.5, xx = u * wijd, ll = L[k] * r * 1.05 * (1 - Math.abs(u) * 0.55); const yt = yT + Math.pow(u, 2) * r * 0.9;
    ctx.save(); ctx.translate(xx, yt); ctx.rotate(-u * 0.35);
    roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); shape(ctx, rgba(C.kernR, 0.4), C.kernR, Math.max(0.8, r * 0.018));
    if (r >= 40) { ctx.save(); roundRect(ctx, -bw / 2, 0, bw, ll, bw / 2); ctx.clip(); ctx.strokeStyle = rgba(_mvL(C.kernR, 0.3), 0.8); ctx.lineWidth = Math.max(0.7, r * 0.014); ctx.beginPath();
      for (let d = bw * 0.4; d < ll + bw; d += bw * 0.75) { ctx.moveTo(-bw / 2, d); ctx.lineTo(bw / 2, d - bw * 0.5); } ctx.stroke(); ctx.restore();
      ctx.beginPath(); ctx.arc(0, ll - bw * 0.5, bw * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.85); ctx.fill(); } // polymerase aan het uiteinde
    ctx.restore(); });
  ctx.restore(); }
