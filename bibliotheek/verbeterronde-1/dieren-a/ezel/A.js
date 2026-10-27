// EZEL (uitknippop, HoefPop) — variant A: de staart leest als ezelstaart: bovenste deel smaller en in de lijfkleur
// (korte haren), onderaan een duidelijke donkere kwast (paard: lange haren vanaf de staartwortel). Bron: Donkey Sanctuary
// (zie lessen_pop_hoef.md). De hals is bewust niet ingekort: kop en hals zijn in ronde 4 door Kamiel goedgekeurd.
function _hoefEzelStaart(def) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const S = def.DELEN.staart; const B = S.lagen[0].p;
  let y0 = 1e9, y1 = -1e9; for (const p of B) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); } const yk = y0 + (y1 - y0) * 0.62;
  const midx = y => { const r = B.filter(p => Math.abs(p[1] - y) < (y1 - y0) * 0.08); return r.length ? r.reduce((a, p) => a + p[0], 0) / r.length : B[0][0]; };
  const smal = p => p[1] < yk ? [midx(p[1]) + (p[0] - midx(p[1])) * 0.6, p[1]].concat(p.slice(2)) : p;
  const lagen = S.lagen.map((l, i) => Object.assign({}, l, { p: l.p.map(smal) }));
  const kw = B.filter(p => p[1] >= yk - 2).map(smal); lagen.push({ c: '#2A2422', p: kw }); // kwast
  D.DELEN.staart = Object.assign({}, S, { lagen }); return D; }
var HOEF_EZEL_A = HoefPop.maak(_hoefEzelStaart(HOEF_EZEL_DEF));
function ezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_EZEL_A, x, y, s, o); }
