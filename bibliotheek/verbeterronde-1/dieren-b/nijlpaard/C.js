// ===================================================================================
// NIJLPAARD (Hippopotamus amphibius), aanpassing op de hoef-pop (HOEF_VORM.nijlpaard wordt in place aangepast, daarna
// wordt HOEF.nijlpaard opnieuw gebouwd; zelfde aanroep nijlpaard(ctx, x, y, s, o), alle houdingen blijven).
// Recept (SDZG factsheet; YPTE): tonvormig lijf, korte zuilpoten met vier tenen met brede nagels, rechte rug;
// huid vrijwel kaal (alleen borstels op kop, rug en staart), paarsgrijs tot leibruin; onderkant en huid rond ogen en
// oren bruinroze. De omtrek is dus GLAD (geen vachtrand); huidplooien zijn lijnen/schaduwen, geen roze vlakken.
// Bekende fouten: gerafelde vachtomtrek; roze sikkel op de flank (leest als wond of naad); stompjes zonder gewricht.
// ===================================================================================
function _nijlGlad(P, n = 3) { // trapjes uit het overtrekken weg: punten op gelijke afstand, dan n× gesloten gemiddelde
  if (!P || P.length < 6) return P; let Q = P.map(p => p.slice());
  const L = [0]; for (let i = 1; i <= Q.length; i++) { const a = Q[i - 1], b = Q[i % Q.length]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
  const tot = L[L.length - 1], st = Math.max(1.5, tot / Math.max(24, Q.length * 0.6)), R = []; let j = 0;
  for (let s = 0; s < tot; s += st) { while (L[j + 1] < s) j++; const a = Q[j], b = Q[(j + 1) % Q.length], u = (s - L[j]) / Math.max(1e-6, L[j + 1] - L[j]); R.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]); }
  Q = R; for (let k = 0; k < n; k++) Q = Q.map((p, i) => { const a = Q[(i - 1 + Q.length) % Q.length], b = Q[(i + 1) % Q.length]; return [(a[0] + 2 * p[0] + b[0]) / 4, (a[1] + 2 * p[1] + b[1]) / 4]; });
  return Q; }
function _nijlVervang(arr, nieuw) { arr.length = 0; for (const p of nieuw) arr.push(p); }
// Variant B: omtrek glad; huidplooien als smalle donkere lijnen (de bovenrand van de oude plooivlakken), de onderkant
// van romp en hals bruinroze als een zachte buikband (bron: 'lower surfaces ... brownish pink'), rug iets donkerder.
(function () { const V = HOEF_VORM.nijlpaard;
  for (const k in V.delen) { const d = V.delen[k]; if (d.basis && d.basis.length > 12) _nijlVervang(d.basis, _nijlGlad(d.basis, 3)); for (const l of d.lagen || []) { const p = l.p || l.basis; if (p && p.length > 12) _nijlVervang(p, _nijlGlad(p, 2)); } }
  const lijn = (P, w) => { // plooivlak -> smalle band langs de bovenste helft van de vorm
    let i0 = 0, i1 = 0; P.forEach((p, i) => { if (p[0] < P[i0][0]) i0 = i; if (p[0] > P[i1][0]) i1 = i; });
    const n = P.length, A = []; for (let i = i0; ; i = (i + 1) % n) { A.push(P[i]); if (i === i1) break; } const B2 = []; for (let i = i0; ; i = (i - 1 + n) % n) { B2.push(P[i]); if (i === i1) break; }
    const top = (A.reduce((s, p) => s + p[1], 0) / A.length) < (B2.reduce((s, p) => s + p[1], 0) / B2.length) ? A : B2;
    return top.map(p => [p[0], p[1] - w]).concat(top.slice().reverse().map(p => [p[0], p[1] + w])); };
  for (const k of ['romp', 'nek']) for (const l of V.delen[k].lagen || []) if (l.c === '#A7766F') { const p = l.p || l.basis; _nijlVervang(p, lijn(p, 1.1)); l.c = '#4A3C42'; }
  const R = V.delen.romp.basis; let y0 = 1e9, y1 = -1e9, x0 = 1e9, x1 = -1e9; for (const [x, y] of R) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
  const yb = y1 - (y1 - y0) * 0.2; V.delen.romp.lagen.unshift({ c: '#80666A', p: _nijlGlad([[x0 - 5, yb + 6], [(x0 + x1) / 2, yb - 4], [x1 + 5, yb + 2], [x1 + 5, y1 + 10], [x0 - 5, y1 + 10]], 2) });
  HOEF_NIJL_DEF.HOEF.kleur = '#8C7C78'; delete HOEF_NIJL_DEF.DELEN;
  HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF); })();
// Variant C (= B + herstel): neusgaten BOVENOP de snuit (ADW Hippopotamidae: "Their nostrils and eyes sit on top of their
// skulls"; SF Zoo docents: "Ears, eyes and nostrils are placed high on the head"), als platte spleet op de bovenrand
// van de snuit i.p.v. een stipje voor de snuit.
(function () { const V = HOEF_VORM.nijlpaard; V.neusgat[0] = 205; V.neusgat[1] = -83.5; HOEF_NIJL_DEF.neusHoek = 0.12; HOEF_NIJL_DEF.neusR = 3.0;
  delete HOEF_NIJL_DEF.DELEN; HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF); })();
