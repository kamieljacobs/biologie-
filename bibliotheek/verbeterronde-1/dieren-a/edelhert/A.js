// EDELHERT (uitknippop, HoefPop) — variant A: poten iets dikker (dikV 0,78 → 0,9, dikA 0,8 → 0,92; de poten waren erg
// dun onder het lijf) en een echte houding 'burlen' (stond in de README maar viel terug op staan): hals gestrekt
// schuin omhoog, kop achterover met de snuit omhoog, zoals een burlend hert in de bronst (rust: hals ± 30° boven de
// horizontaal, kop ± 45° omhoog). Bek open is niet gebouwd (de hertenkop heeft geen MOND-deel).
var HOEF_HERT_A = HoefPop.maak(Object.assign({}, HOEF_HERT_DEF, { dikV: 0.9, dikA: 0.92,
  HOUDING: Object.assign({}, HOEF_HERT_DEF.HOUDING, { burlen: { ver: { V: -8, A: 8 }, A: { nek: -22, kop: -14 } } }) }));
function edelhert(ctx, x, y, s = 1, o = {}) { const k = o.kop || 0; const oo = Object.assign({}, o); if (k > 0.5 && !o.houding) oo.houding = 'vechten'; else if (k) { oo.nekHoek = (o.nekHoek || 0) + k * 1.15; oo.kopHoek = (o.kopHoek || 0) + k * 0.35; }
  return _hoefWrap(ctx, HOEF_HERT_A, x, y, s * 2, oo); }
