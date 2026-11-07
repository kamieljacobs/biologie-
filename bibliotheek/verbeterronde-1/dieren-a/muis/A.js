// BOSMUIS (HondPop) — variant A: knabbelen. Nieuwe houding 'knabbelen' (o.t = tijd in s): de muis zit rechtop, houdt
// met de voorpootjes een zaadje voor de bek en knaagt: de pootjes gaan in kleine schokjes op en neer naar de bek en de kop
// knikt mee (± 4 knabbels per seconde, 6 tussenstanden). 'rechtop' zonder o.t blijft de oude vaste pose; 'rechtop' mét
// o.t knabbelt ook. Het zaadje (oker) zit tussen de voorpoten. Bron: zie bron.md (muis zit rechtop en eet uit de voorpoten).
var MUIS_KNABBEL_N = 6;
var MUIS_A = HondPop.maak(Object.assign({}, MUIS_DEF, { HOUDING: Object.assign({}, MUIS_DEF.HOUDING, (() => { const R = MUIS_DEF.HOUDING.rechtop, h = {};
  for (let i = 0; i < MUIS_KNABBEL_N; i++) { const u = Math.sin(i / MUIS_KNABBEL_N * Math.PI * 2), w = Math.abs(u);
    h['knabbel' + i] = { R: R.R, zit: 1, A: Object.assign({}, R.A, { nek: R.A.nek + 4 + 3 * u, kop: R.A.kop + 14 + 5 * u }),
      voet: Object.assign({}, R.voet, { V: [3.1 + 0.15 * u, -3.55 - 0.25 * w, 118, 92], VF: [3.3 + 0.15 * u, -3.6 - 0.25 * w, 118, 94] }) }; } return h; })()) }));
function muis(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o); let h = oo.houding || 'staan'; h = { rennen: 'draven', zit: 'zitten', eten: 'knabbelen' }[h] || h;
  let zaad = false;
  if (h === 'knabbelen' || (h === 'rechtop' && o.t != null)) { const i = Math.floor(((o.t || 0) * 4 * MUIS_KNABBEL_N) % MUIS_KNABBEL_N + MUIS_KNABBEL_N) % MUIS_KNABBEL_N; h = 'knabbel' + i; zaad = o.zaad !== false; }
  if (!MUIS_A.GANGEN[h] && !MUIS_A.D.HOUDING[h]) h = 'staan'; oo.houding = h; const r = MUIS_A.teken(ctx, x, y, s, oo);
  if (zaad) { const k = oo.kijk ?? 1, i = +h.slice(7), u = Math.sin(i / MUIS_KNABBEL_N * Math.PI * 2); const zx = x + k * 3.05 * s, zy = y - (3.7 + 0.2 * Math.abs(u)) * s; // zaadje tussen de voorpoten
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.beginPath(); ctx.ellipse(zx, zy, 0.32 * s, 0.22 * s, -0.5 * k, 0, 6.283); ctx.fillStyle = '#C9A35C'; ctx.fill(); ctx.strokeStyle = '#8A6A34'; ctx.lineWidth = Math.max(0.5, 0.05 * s); ctx.stroke(); ctx.restore(); }
  return r; }
