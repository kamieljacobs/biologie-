// KOE (uitknippop, HoefPop) — variant A: kop ± 15 % groter (was kalfachtig klein; volwassen MRIJ-kop ± 50 cm bij 140 cm
// schofthoogte), geschaald om de kruin zodat hij aan de hals blijft; verre poten minder grijs (verMix lager, warmere
// tint), zodat de achterpoot in de stap niet als losse lichtgrijze poot opduikt. Grazen-halsboog en liggen bewust gelaten
// (keelkap en houding zijn in ronde 3 door Kamiel goedgekeurd).
function _hoefKopSchaal(def, f) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const [cx, cy] = def.J.kop;
  const sc = p => [cx + (p[0] - cx) * f, cy + (p[1] - cy) * f].concat(p.slice(2));
  for (const k of ['kop', 'oor', 'oorF', 'kaak']) if (def.DELEN[k]) D.DELEN[k] = Object.assign({}, def.DELEN[k], { lagen: def.DELEN[k].lagen.map(l => Object.assign({}, l, l.p ? { p: l.p.map(sc) } : {})) });
  D.J = Object.assign({}, def.J); for (const k of ['neus', 'kaak', 'kin']) D.J[k] = sc(def.J[k]); return D; }
var HOEF_KOE_A = HoefPop.maak(Object.assign(_hoefKopSchaal(HOEF_KOE_DEF, 1.15), { verMix: 0.16, verKleur: '#5A4A40' }));
function koe7(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_KOE_A, x, y, s * 1.7, o); }
