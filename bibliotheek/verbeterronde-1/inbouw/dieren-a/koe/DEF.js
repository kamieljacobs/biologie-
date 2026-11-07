// KOE (uitknippop, HoefPop) — variant C = winnaar A (kop groter, verre poten warmer) + uit de verliezer de slankere snuit
// en het lichtere oor, + hoornstompjes beter zichtbaar. Kop: schaal 1,15 bij de kruin die geleidelijk afneemt naar 1,0
// bij de neus, zodat de snuit niet als bolle roze bult groeit; oor een toon lichter (#6A3824 → #8E5638); hoornstompje
// als eigen lichte hoornvorm met donkere punt boven de kruin (roodbonte MRIJ: korte, lichte horens).
function _hoefKopSchaalC(def, f) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const [cx, cy] = def.J.kop, [nx, ny] = def.J.neus;
  const ax = nx - cx, ay = ny - cy, al2 = ax * ax + ay * ay;
  const sc = p => { const u = Math.max(0, Math.min(1, ((p[0] - cx) * ax + (p[1] - cy) * ay) / al2)); const g = f - (f - 1) * u * u; return [cx + (p[0] - cx) * g, cy + (p[1] - cy) * g].concat(p.slice(2)); };
  for (const k of ['kop', 'oor', 'oorF', 'kaak', 'keelkap']) if (def.DELEN[k]) D.DELEN[k] = Object.assign({}, def.DELEN[k], { lagen: def.DELEN[k].lagen.map(l => Object.assign({}, l, l.p ? { p: l.p.map(sc) } : {})) });
  D.DELEN.oor = Object.assign({}, D.DELEN.oor, { lagen: D.DELEN.oor.lagen.map(l => l.c === '#6A3824' ? Object.assign({}, l, { c: '#8E5638' }) : l) });
  const hb = sc([cx - 5, cy + 0.5]); // hoornstompje: basis net achter de kruin, kort en licht gebogen naar voren-boven
  D.DELEN.hoorn = Object.assign({}, { bot: 'kop', lagen: [
    { c: '#E2D3B4', p: [[hb[0] - 2.4, hb[1] + 2.4], [hb[0] - 2.08, hb[1] - 3.2], [hb[0] + 0.4, hb[1] - 7.2], [hb[0] + 3.36, hb[1] - 8.4], [hb[0] + 2.56, hb[1] - 4.4], [hb[0] + 2.4, hb[1] + 2.4]] },
    { c: '#5A4A3A', p: [[hb[0] + 0.64, hb[1] - 6.88], [hb[0] + 3.36, hb[1] - 8.4], [hb[0] + 2.8, hb[1] - 5.6]] }] }); // eigen deel aan de kop, boven de kopomtrek
  D.VOLGORDE = def.VOLGORDE.flatMap(v => v[0] === 'kop' ? [v, ['hoorn']] : [v]);
  D.J = Object.assign({}, def.J); return D; }
var HOEF_KOE_C = HoefPop.maak(Object.assign(_hoefKopSchaalC(HOEF_KOE_DEF, 1.15), { verMix: 0.16, verKleur: '#5A4A40' }));
function koe7(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_KOE_C, x, y, s * 1.7, o); }
