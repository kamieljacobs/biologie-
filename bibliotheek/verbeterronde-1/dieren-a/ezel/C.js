// EZEL (uitknippop, HoefPop) — variant C = winnaar A + herstel van de staart: een ezel heeft een koeachtige staart met een
// kwast aan het eind (Britannica 'ass': 'tufted tails'; IUCN GISD Equus asinus: 'cow-like tail'; UNH Extension: 'more
// cow-like (tufted)'). De staart wordt opnieuw opgebouwd langs de as van de oude staart: dun (± 2 cm) en in de lijfkleur
// over de bovenste ± 65 %, daarna een korte donkere kwast in druppelvorm; geen naad bij de staartwortel (de wortel
// begint ín de romp). Kop en hals ongewijzigd (ronde 4 goedgekeurd).
function _hoefEzelStaartC(def) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const S = def.DELEN.staart; const B = S.lagen[0].p;
  let y0 = 1e9, y1 = -1e9; for (const p of B) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  const gem = sel => { const r = B.filter(sel); return [r.reduce((a, p) => a + p[0], 0) / r.length, r.reduce((a, p) => a + p[1], 0) / r.length]; };
  const R = gem(p => p[1] < y0 + (y1 - y0) * 0.08), E = gem(p => p[1] > y1 - (y1 - y0) * 0.08); R[1] -= 2; // wortel iets in de romp
  const as = u => [R[0] + (E[0] - R[0]) * u + Math.sin(u * Math.PI) * -1.2, R[1] + (E[1] - R[1]) * u];
  const breed = u => u < 0.62 ? 1.25 - 0.35 * u / 0.62 : u < 0.86 ? 0.9 + 1.5 * Math.sin((u - 0.62) / 0.24 * Math.PI / 2) : 2.4 - 1.5 * ((u - 0.86) / 0.14) ** 2;
  const rand = (u0, u1, n = 16) => { const L = [], Rr = []; for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / n, [x, y] = as(u), w = breed(u); L.push([x - w, y]); Rr.push([x + w, y]); } return L.concat(Rr.reverse()); };
  D.DELEN.staart = Object.assign({}, S, { lagen: [{ c: S.lagen[0].c, p: rand(0, 1, 24) }, { c: '#2A2422', p: rand(0.64, 1, 14) }] });
  return D; }
var HOEF_EZEL_C = HoefPop.maak(_hoefEzelStaartC(HOEF_EZEL_DEF));
function ezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_EZEL_C, x, y, s, o); }
