// MUILEZEL (uitknippop, HoefPop) — aanpassing 28 okt 2026 (Kamiels keuze 'gelijk' + zijn antwoord op de losse vraag:
// 'vollere, meer paardachtige staart'). Recept: muilezel (paardenhengst × ezelin) = paardenlijf, oren tussen paard en
// ezel; de staart is voller dan de ezelstaart en lijkt meer op die van een paard (The Donkey Sanctuary). Een ezel heeft
// juist een dunne staart met een kwast aan het eind 'zoals een koe' (Better Planet Education; ScienceABC).
// Opbouw langs de as van de oude staart: het lange haar bedekt de staartwortel al vanaf de kruis (zoals bij het paard),
// wordt naar onderen breder (± 3× de wortelbreedte), met een rafelige punt; donker zoals de manen.
// Kop, oren, lijf, poten en gangen ongewijzigd (ronde 4 goedgekeurd). Zelfde aanroep muilezel(ctx, x, y, s, o).
function _hoefMuilStaart(def) { const D = Object.assign({}, def, { DELEN: Object.assign({}, def.DELEN) }); const S = def.DELEN.staart; const B = S.lagen[0].p;
  let y0 = 1e9, y1 = -1e9; for (const p of B) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  const gem = sel => { const r = B.filter(sel); return [r.reduce((a, p) => a + p[0], 0) / r.length, r.reduce((a, p) => a + p[1], 0) / r.length]; };
  const R = gem(p => p[1] < y0 + (y1 - y0) * 0.08), E = gem(p => p[1] > y1 - (y1 - y0) * 0.08); R[0] += 5; R[1] += 1; // wortel ín de romp, tegen de kruis (geen losse stomp)
  E[1] += 2; // haar valt iets verder dan de oude staart (paardenstaart tot ± de hak)
  const as = u => [R[0] + (E[0] - R[0]) * u + Math.sin(u * Math.PI) * -2.2, R[1] + (E[1] - R[1]) * u]; // lichte boog naar achter
  const dok = u => 2.6 - 0.6 * u;                                                       // staartwortel ± 5 cm breed
  const haar = u => u < 0.12 ? dok(u) * (0.75 + 2.2 * u) : 2.7 + 5.0 * Math.sin(Math.min(1, (u - 0.12) / 0.6) * Math.PI / 2) - (u > 0.84 ? 3.5 * ((u - 0.84) / 0.16) ** 2 : 0); // tot ± 15 cm breed
  const rand = (u0, u1, w, n = 24, rafel = false) => { const L = [], Rr = []; for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / n, [x, y] = as(u), b = w(u);
      L.push([x - b * 1.15, y]); Rr.push([x + b * 0.85, y]); } // haar valt iets meer naar achter (links) uit
    if (rafel) { const e = as(u1), b = w(u1); const tip = [[e[0] + b * 0.8, e[1]], [e[0] + b * 0.3, e[1] + 1.6], [e[0] - b * 0.2, e[1] + 0.4], [e[0] - b * 0.7, e[1] + 1.8], [e[0] - b * 1.1, e[1]]]; return L.concat(tip, Rr.reverse()).filter(Boolean); }
    return L.concat(Rr.reverse()); };
  const haarK = '#2A201A'; // zelfde donkere tint als de manen
  D.DELEN.staart = Object.assign({}, S, { lagen: [{ c: haarK, p: rand(0, 1, haar, 30, true) }] });
  return D; }
var HOEF_MUIL_STAART = HoefPop.maak(_hoefMuilStaart(HOEF_MUIL_DEF));
function muilezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF_MUIL_STAART, x, y, s, o); }
