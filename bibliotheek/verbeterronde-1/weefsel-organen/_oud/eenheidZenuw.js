// motorische zenuwcel die zich vertakt naar de vezels van één eenheid (bovenop spierDwars getekend; 'vanuit' = beginpunt axon)
function eenheidZenuw(ctx, vanuit, punten, kleur, o = {}) { const { a = 1, puls = -1, dik = 4 } = o; if (a <= 0.01 || !punten.length) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const mx = punten.reduce((s2, p) => s2 + p[0], 0) / punten.length, my = punten.reduce((s2, p) => s2 + p[1], 0) / punten.length, tak = [lerp(vanuit[0], mx, 0.62), lerp(vanuit[1], my, 0.62)];
  ctx.strokeStyle = kleur; ctx.lineWidth = dik; ctx.beginPath(); ctx.moveTo(vanuit[0], vanuit[1]); ctx.quadraticCurveTo(lerp(vanuit[0], tak[0], 0.5), vanuit[1], tak[0], tak[1]); ctx.stroke();
  ctx.lineWidth = Math.max(1.2, dik * 0.4); for (const p of punten) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.quadraticCurveTo((tak[0] + p[0]) / 2 + (hash(p[0]) - 0.5) * 30, (tak[1] + p[1]) / 2, p[0], p[1]); ctx.stroke(); circ(ctx, p[0], p[1], 3.2, kleur); }
  if (puls >= 0 && puls <= 1) { const px = lerp(vanuit[0], tak[0], puls), py = lerp(vanuit[1], tak[1], puls); circ(ctx, px, py, dik * 1.6, C.goud); }
  ctx.restore(); }
