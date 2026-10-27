// CHIHUAHUA (HondPop) — variant A: oog in de stijl van herder/wolf: amandelvormig (geen bol cartoonoog met groot wit
// glimlicht), donkere rand, warmbruine iris, ronde pupil en alleen een klein gedempt lichtje. Groot en rond blijft het
// (FCI 218: 'grote, ronde ogen'), maar zonder wit.
function _chiOog(ctx, O, r) { ctx.fillStyle = '#1A1412'; ctx.beginPath(); ctx.ellipse(O[0], O[1], r * 1.35, r * 1.08, -0.1, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#5A3418'; ctx.beginPath(); ctx.ellipse(O[0] + r * 0.12, O[1], r * 0.98, r * 0.92, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#120E0C'; ctx.beginPath(); ctx.arc(O[0] + r * 0.18, O[1], r * 0.52, 0, 6.283); ctx.fill();
  ctx.fillStyle = 'rgba(240,230,215,0.35)'; ctx.beginPath(); ctx.arc(O[0] + r * 0.45, O[1] - r * 0.35, r * 0.16, 0, 6.283); ctx.fill(); }
var HOND_CHI_A = HondPop.maak(Object.assign({}, HOND_CHIHUAHUA_DEF, { GEZICHT(ctx, pal, cm) { _chiOog(ctx, cm([1221, 124]), 0.7);
  _hondLijn(ctx, [cm([1219, 136]), cm([1226, 137]), cm([1232, 135])], '#3A2A20', 0.12); } }));
function hond(ctx, ras, x, y, s, o = {}) { const P = ras === 'chihuahua' ? HOND_CHI_A : (HOND[ras] || HOND.herder); if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = { rennen: 'draven', draf: 'draven', stappen: 'lopen', grazen: 'staan', snuffelen: 'staan', vechten: 'staan', huilen: 'zitten' }[h] || h;
  if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = 'staan'; oo.houding = h; return P.teken(ctx, x, y, s, oo); }
