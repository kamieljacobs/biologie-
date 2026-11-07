// MOPS (HondPop) — variant A: de stap was stijf (poten als blokken, ± 3 zichtbaar verschillende standen). Nu meer plooien
// van pols en hak in de zwaaifase (× 1,8), voet hoger (lift 3,2 → 6 cm), iets meer rol en deinen van het brede lijf,
// zodat elke fase een andere pootstand heeft. Staart blijft gekruld stil (staartZwaai 0).
// Stapcurven met meer buiging in de zwaaifase (pols en hak plooien verder, voet komt hoger), zodat een korte poot in
// elke fase een andere stand heeft; steunfase ongewijzigd. k = extra buiging (1 = huidige curven).
function _hondKrvBuig(k) { const S = _HOND_KRV.stap, b = (c, mid) => c.map(([u, v]) => [u, mid + (v - mid) * k]);
  return { V: Object.assign({}, S.V, { metaZ: b(S.V.metaZ, 90), pootZ: b(S.V.pootZ, 50) }), A: Object.assign({}, S.A, { metaZ: b(S.A.metaZ, 85), pootZ: b(S.A.pootZ, 48) }) }; }
var HOND_MOPS_A = HondPop.maak(Object.assign({}, HOND_MOPS_DEF, { LOPEN: _hondStap(26, 6, Object.assign(_hondKrvBuig(1.8), { staartZwaai: [0, 0, 0, 0], rol: 1.3, bob: 0.35 })) }));
function hond(ctx, ras, x, y, s, o = {}) { const P = ras === 'mops' ? HOND_MOPS_A : (HOND[ras] || HOND.herder); if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = { rennen: 'draven', draf: 'draven', stappen: 'lopen', grazen: 'staan', snuffelen: 'staan', vechten: 'staan', huilen: 'zitten' }[h] || h;
  if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = 'staan'; oo.houding = h; return P.teken(ctx, x, y, s, oo); }
