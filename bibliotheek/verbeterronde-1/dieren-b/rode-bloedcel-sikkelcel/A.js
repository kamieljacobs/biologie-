// =====================================================================================
// RODE BLOEDCEL (overschrijft lib_bio, zelfde parameters). Recept: ingedeukte schijf zonder kern, 7,5–8 µm breed,
// rand ±2,5 µm dik, midden ±1 µm (Evans & Fung 1972: dikte T(ρ) = R·√(1−ρ²)·(0,207 + 2,003ρ² − 1,123ρ⁴)).
// Van boven: de dikke rand bevat meer hemoglobine en is dus donkerder/voller rood; het dunne midden is LICHTER
// (centrale bleekheid, ±1/3 van de doorsnede). Geen glanslicht (Part C). Van opzij: een halter (dikke uiteinden,
// dun midden). kant 0 = van boven, 1 = van opzij; ertussen kantelt hij.
// Bekende fouten: bol; donkere middenvlek (leest als kern; een rode bloedcel heeft geen kern); glanslicht; deuk als gat.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const kl = BIO.bloed, ry = r * lerp(1, 0.3, kant), wd = clamp((kant - 0.55) / 0.45, 0, 1);
  const halfT = (p) => r * Math.sqrt(Math.max(0, 1 - p * p)) * (0.207 + 2.003 * p * p - 1.123 * p ** 4) / 2;
  const P = [], N = 36; for (let i = 0; i <= N; i++) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, -lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  for (let i = N - 1; i >= 1; i--) { const th = Math.PI * i / N, p = Math.cos(th); P.push([r * p, lerp(ry * Math.sin(th), halfT(p) * 1.05, wd)]); }
  ctx.beginPath(); bioPad(ctx, P, true); shape(ctx, _mvD(kl, 0.08), _mvD(kl, 0.3), Math.max(1, r * 0.035));
  const dk = 1 - wd; if (dk > 0.02) { // centrale bleekheid: zacht lichter midden, iets verschoven door het kantelen
    const oy = ry * 0.12 * kant;
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip();
    for (let k = 0; k < 6; k++) { const f = 0.62 - k * 0.07; ctx.beginPath(); ctx.ellipse(0, oy, r * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba(_mvL(kl, 0.35), 0.11 * dk); ctx.fill(); }
    ctx.restore(); }
  if (wd > 0.02) { // van opzij: de dunne taille als zachte lichtere band
    ctx.save(); ctx.beginPath(); bioPad(ctx, P, true); ctx.clip(); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.42, r * 0.3, 0, 0, 6.283); ctx.fillStyle = rgba(_mvL(kl, 0.3), 0.12 * wd); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
