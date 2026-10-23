// Bestaat dit echt? — dierenbibliotheek volgens Part C9 (tekenrecept Dieren), 22 okt 2026
// Elk dier: f(ctx, x, y, s, o). Anker (x, y) = midden onder het dier; kop naar rechts (kijk: -1 spiegelt).
// Redelijk realistisch maar vlak getekend: echte verhoudingen, echt oog, 2–3 kenmerken met detail, geen verlopen.

function _bd(ctx, x, y, s, kijk = 1, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s * kijk, s); }
// echt dierenoog: iris in eigen kleur, pupil in de juiste vorm, één klein lichtpuntje
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
// patroon binnen een vorm (vlekken, rimpels): eerst clippen op P
function binnen(ctx, P, fn) { ctx.save(); zacht(ctx, P); ctx.clip(); fn(); ctx.restore(); }
