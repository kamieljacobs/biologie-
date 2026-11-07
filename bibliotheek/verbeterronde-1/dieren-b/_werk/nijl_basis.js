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
