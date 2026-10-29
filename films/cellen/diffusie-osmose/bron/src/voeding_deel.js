// Uittreksel uit bibliotheek/lib_bio.js (alleen wat deze film gebruikt), gemaakt met bio_deel.py
// Gevraagd: V, hexagon, bead, AA_ESS, mineral
const V = {
  kh: '#DCC07F',      // koolhydraat: lichte oker, zeshoek
  ew: '#C9A35C',      // eiwit: oker, kraal
  vt: '#9C7A3C',      // vet: donkere oker, E-vorm
  vtR: '#C9A35C',
  vezel: '#7FC48F',   // cellulose/vezel: groen (plant)
  neutraal: '#AFC0D0',// mineralen, vitaminen, gal, glas, darmwand
  melk: '#E6E1D3',    // melk als vlak (neutraal licht)
  essentieel: '#E0B64A'
};
function hexagon(ctx, x, y, r, fill, stroke, lw = 1.3, rot = 0) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) { const a = rot + Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, fill, stroke, lw);
}
const AA_ESS = [0, 2, 4, 6, 9, 11, 13, 15, 18]; // negen soorten die het verhaal "essentieel" noemt (schematisch)
function bead(ctx, x, y, r, kind, opts = {}) {
  const { alpha = 1, ess = false, dimNonEss = false, lab = null } = opts;
  ctx.save(); ctx.globalAlpha *= alpha * (dimNonEss && !AA_ESS.includes(kind) ? 0.35 : 1);
  const tint = [0.0, 0.18, 0.36, -0.12][kind % 4]; const fill = tint >= 0 ? lighten(V.ew, tint) : '#A8854A';
  const form = Math.floor(kind / 4) % 5; const stroke = ess && AA_ESS.includes(kind) ? C.goud : lighten(V.ew, 0.45); const lw = ess && AA_ESS.includes(kind) ? 2.4 : 1.2;
  ctx.beginPath();
  if (form === 0) ctx.arc(x, y, r, 0, 6.283);
  else if (form === 1) roundRect(ctx, x - r * 0.9, y - r * 0.9, r * 1.8, r * 1.8, r * 0.45);
  else if (form === 2) { ctx.moveTo(x, y - r * 1.05); ctx.lineTo(x + r, y + r * 0.8); ctx.lineTo(x - r, y + r * 0.8); ctx.closePath(); }
  else if (form === 3) { ctx.moveTo(x, y - r * 1.1); ctx.lineTo(x + r * 1.05, y); ctx.lineTo(x, y + r * 1.1); ctx.lineTo(x - r * 1.05, y); ctx.closePath(); }
  else { ctx.ellipse(x, y, r * 1.2, r * 0.8, 0, 0, 6.283); }
  shape(ctx, fill, stroke, lw);
  if (lab) text(ctx, lab, x, y + 6, fMeta(28), C.bgMicro, 'center');
  ctx.restore();
}
function mineral(ctx, x, y, r = 8, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 2); shape(ctx, rgba(V.neutraal, 0.8), lighten(V.neutraal, 0.4), 1); ctx.restore(); }
function vitamin(ctx, x, y, r = 9, alpha = 1) { ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 1.2566; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(V.neutraal, 0.25), V.neutraal, 1.4); ctx.restore(); }
