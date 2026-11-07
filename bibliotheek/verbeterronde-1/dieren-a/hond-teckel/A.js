// TECKEL (HondPop) — variant A: stap afgestemd op de korte poten. Kortere pas (S 22 → 18 cm bij ± 21 cm beenhoogte, zodat
// de voet niet verder reikt dan de korte poot toelaat), hogere voet in de zwaai (lift 2,4 → 4,6 cm) en meer plooien van
// pols en hak in de zwaaifase (× 1,7), zodat de pootjes zichtbaar stappen in plaats van te glijden; iets meer
// lijfrol (een teckel waggelt licht). Met o.wereld blijft de steunvoet op zijn plek (bestaande HondPop-optie).
// Stapcurven met meer buiging in de zwaaifase (pols en hak plooien verder, voet komt hoger), zodat een korte poot in
// elke fase een andere stand heeft; steunfase ongewijzigd. k = extra buiging (1 = huidige curven).
function _hondKrvBuig(k) { const S = _HOND_KRV.stap, b = (c, mid) => c.map(([u, v]) => [u, mid + (v - mid) * k]);
  return { V: Object.assign({}, S.V, { metaZ: b(S.V.metaZ, 90), pootZ: b(S.V.pootZ, 50) }), A: Object.assign({}, S.A, { metaZ: b(S.A.metaZ, 85), pootZ: b(S.A.pootZ, 48) }) }; }
var HOND_TECKEL_A = HondPop.maak(Object.assign({}, HOND_TECKEL_DEF, { LOPEN: _hondStap(18, 4.6, Object.assign(_hondKrvBuig(1.7), { rol: 1.2, beta: 0.62 })) }));
function hond(ctx, ras, x, y, s, o = {}) { const P = ras === 'teckel' ? HOND_TECKEL_A : (HOND[ras] || HOND.herder); if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = { rennen: 'draven', draf: 'draven', stappen: 'lopen', grazen: 'staan', snuffelen: 'staan', vechten: 'staan', huilen: 'zitten' }[h] || h;
  if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = 'staan'; oo.houding = h; return P.teken(ctx, x, y, s, oo); }
