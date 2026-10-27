// JACHTLUIPAARD (KatPop) — variant A: de vlekken op de onderpoten (onderarm, middenhand, scheen, middenvoet) kleiner en
// verder uit elkaar (straal ± 40 % kleiner, minimale afstand groter), zodat de gewrichten in de galop leesbaar blijven;
// op romp en dij blijven de volle vlekken. De galopfasen zelf zijn bewust niet aangepast (ronde 5 door Kamiel goedgekeurd).
var KAT_LUIPAARD_A = KatPop.maak(Object.assign({}, KAT_LUIPAARD2_DEF, { TEKENING({ PREP, vlekVorm, binnen, hsh }) {
  for (const [k, dmin, r0, r1, seed] of [['rad', 3.0, 0.3, 0.42, 51], ['schn', 3.0, 0.32, 0.45, 61], ['mc', 2.8, 0.18, 0.26, 71], ['mt', 2.8, 0.2, 0.28, 81]]) {
    const D = PREP[k]; if (!D) continue; const B = D.lagen[0].pts; let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const p of B) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
    const P = []; for (let i = 0; i < 3000 && P.length < 120; i++) { const p = [x0 + hsh(seed + i * 1.37) * (x1 - x0), y0 + hsh(seed + i * 2.91 + 5) * (y1 - y0)]; if (!binnen(p, B) || P.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < dmin)) continue; P.push(p); }
    for (const p of P) D.lagen.push({ c: 'vlek', pts: vlekVorm(p, r0 + (r1 - r0) * hsh(seed + p[0]), seed + p[0] * 3, 1.1, 0.3) }); } } }));
function jachtluipaard(ctx, x, y, s = 1, o = {}) { return _katWrap(ctx, KAT_LUIPAARD_A, x, y, s * 4.5, o); }
