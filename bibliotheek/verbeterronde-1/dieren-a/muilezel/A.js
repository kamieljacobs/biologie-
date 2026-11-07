// MUILEZEL (uitknippop, HoefPop) — variant A: oren ± 20 % korter dan bij de ezel, zodat de mix ook los herkenbaar is
// (kop van een ezel maar 'extremiteiten' meer paard; Donkey Sanctuary, zie lessen_pop_hoef.md). Alle punten van de kop
// boven de kruin (de oren) schuiven naar de oorbasis toe (factor 0,8); de rest van de kop en de volle paardenstaart blijven.
function _hoefOren(def, f) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const yb = def.J.kop[1] - 1;
  D.DELEN.kop = Object.assign({}, def.DELEN.kop, { lagen: def.DELEN.kop.lagen.map(l => Object.assign({}, l, { p: l.p.map(p => p[1] < yb ? [p[0], yb + (p[1] - yb) * f].concat(p.slice(2)) : p) })) }); return D; }
var HOEF_MUIL_A = HoefPop.maak(_hoefOren(HOEF_MUIL_DEF, 0.8));
function muilezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_MUIL_A, x, y, s, o); }
