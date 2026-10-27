// =====================================================================================
// UV-SCHADE EN HERSTEL (helixniveau: knik in de helix, enzym dat scant). Recept (Lodish 8e § 5.6 'Nucleotide excision
// repair' (fig. 5-38): dimeer vervormt de helix, herkenning, bel van ± 25 basen, knippen 24–32 basen uit elkaar, gat vullen met
// DNA-polymerase, ligase; OpenStax Biology 2e § 14.6; LibreTexts Microbiology § 13.2):
//  - het DNA is een rechtsdraaiende helix; UV-licht maakt een thymine-dimeer (koraal klem) en de helix krijgt een knik.
//  - een herstelcomplex (eiwit, gevouwen keten) schuift langs het DNA, stopt bij de knik, opent een belletje en knipt de
//    beschadigde streng aan twee kanten; het stuk (± 24–32 nucleotiden, dunne enkele streng) gaat weg. Op die plek is het DNA
//    even enkelstrengs (één dunne lijn = de mal), DNA-polymerase vult het gat, ligase sluit, de helix is weer recht.
//  - o.f 0..1: 0–0.15 UV · 0.15–0.3 dimeer + knik · 0.3–0.5 complex scant en stopt · 0.5–0.65 knip, stuk eruit · 0.65–0.85
//    aanvullen · 0.85–1 dicht en recht.
// Bekende fouten: de hele helix eruit; knik zonder dimeer; stuk dat precies twee basen lang is.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de basenversie: (x, y) = midden; s = schaal (± 900 × 420 px bij s = 1);
// o.f, o.t. Geeft {dimeer, knip, enzym, gat} terug.
// =====================================================================================
//@@KLUWEN
function _uvGolf(ctx, x0, y0, x1, y1, s, a = 1, fase = 0) { if (a <= 0.01) return; const L = Math.hypot(x1 - x0, y1 - y0), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(an);
  ctx.strokeStyle = '#C8B4F0'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 3 * s) { const Y = Math.sin(u / (9 * s) - fase) * 9 * s * clamp(u / (40 * s), 0, 1); u ? ctx.lineTo(u, Y) : ctx.moveTo(u, Y); } ctx.stroke();
  ctx.fillStyle = '#C8B4F0'; ctx.beginPath(); ctx.moveTo(L + 12 * s, 0); ctx.lineTo(L - 6 * s, -10 * s); ctx.lineTo(L - 6 * s, 10 * s); ctx.closePath(); ctx.fill(); ctx.restore(); }
function uvSchade(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0 } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.15, 0, 1)), p2 = ease(clamp((f - 0.15) / 0.15, 0, 1)), p3 = ease(clamp((f - 0.3) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.5) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.65) / 0.2, 0, 1)), p6 = ease(clamp((f - 0.85) / 0.15, 0, 1));
  const W = 900 * s, dw = 46 * s, xa = x - W / 2, xb = x + W / 2, knik = p2 * (1 - p6) * 0.42, uit = {}; // knik ± 24° (schematisch, vergroot)
  const gl = 120 * s; // halve lengte van het weggeknipte stuk (± 24–32 nt; 0,34 nm per base → ± 10 nm ≈ 4,5 × de DNA-breedte)
  ctx.save(); ctx.globalAlpha *= a;
  // as van het DNA met knik in het midden
  const as = (u) => { const d = u - x, r0 = 40 * s, ad = Math.sqrt(d * d + r0 * r0) - r0; return [u, y + ad * Math.tan(knik) * 0.55]; }; // V met afgeronde top
  const pad = (u0, u1) => { const P = []; for (let u = u0; u <= u1 + 0.1; u += 8 * s) P.push(as(Math.min(u, u1))); return P; };
  const gatOpen = p4 * (1 - p5), vul = p5; // gatOpen: enkelstrengs stuk
  if (gatOpen > 0.01 || (p5 > 0.01 && p5 < 1)) { const vulTot = x - gl + 2 * gl * vul;
    dnaDraad(ctx, pad(xa, x - gl), { w: dw, helix: true, glad: false, fase: t * 0.05 });
    dnaDraad(ctx, pad(vulTot, xb), { w: dw, helix: true, glad: false, fase: t * 0.05 });
    if (vul > 0.01) dnaDraad(ctx, pad(x - gl, vulTot), { w: dw, helix: true, glad: false, kleur: '#DCD4F5', donker: '#B9ACE6', fase: t * 0.05 });
    const Pm = pad(Math.max(x - gl, vulTot - 4 * s), x + gl).map(p => [p[0], p[1] + dw * 0.32]); if (Pm.length > 1) { ctx.strokeStyle = C.kernR; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, Pm, false); ctx.stroke();
      for (let u = 0; u < Pm.length; u += 2) { ctx.beginPath(); ctx.moveTo(Pm[u][0], Pm[u][1]); ctx.lineTo(Pm[u][0], Pm[u][1] - 12 * s); ctx.stroke(); } }
    uit.gat = [x, y]; }
  else dnaDraad(ctx, pad(xa, xb), { w: dw, helix: true, glad: false, fase: t * 0.05 });
  // dimeer (koraal klem) op de top van de knik
  if (p2 > 0.01 && p4 < 0.3) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p4 / 0.3); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 12 * s, y - dw * 0.45); ctx.lineTo(x + 12 * s, y - dw * 0.45); ctx.stroke(); _bioCirc(ctx, x - 12 * s, y - dw * 0.45, 7 * s, C.koraal); _bioCirc(ctx, x + 12 * s, y - dw * 0.45, 7 * s, C.koraal); ctx.restore(); uit.dimeer = [x, y - dw * 0.45]; }
  // weggeknipt stuk: dunne enkele streng met de dimeer, zweeft omhoog weg
  if (p4 > 0.01) { const up = p4 * 150 * s + p5 * 40 * s, P = []; for (let u = -gl; u <= gl; u += 6 * s) P.push([x + u, y - dw * 0.4 - up + Math.sin(u / (18 * s)) * 6 * s]); ctx.save(); ctx.globalAlpha *= 1 - p5; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
    for (let k = 0; k < P.length; k += 2) { ctx.beginPath(); ctx.moveTo(P[k][0], P[k][1]); ctx.lineTo(P[k][0], P[k][1] + 11 * s); ctx.stroke(); } _bioCirc(ctx, x - 6 * s, y - dw * 0.4 - up + 8 * s, 6 * s, C.koraal); _bioCirc(ctx, x + 6 * s, y - dw * 0.4 - up + 8 * s, 6 * s, C.koraal); ctx.restore(); }
  // UV-straal
  if (f < 0.35) _uvGolf(ctx, x + 240 * s, y - 280 * s, x + 10 * s, y - dw * 0.7, s, Math.min(p1 * 3, 1) * (1 - ease(clamp((f - 0.22) / 0.1, 0, 1))), t * 6 + f * 40);
  // herstelcomplex (plaatshouder-kluwen) schuift van links over de helix en stopt bij de knik; knipt en neemt het stuk mee
  if (p3 > 0.01 && p5 < 1) { const ex = lerp(xa + 60 * s, x, p3), ey = as(ex)[1] - dw * 0.2 - p4 * 150 * s; const binE = (qx, qy) => { const e1 = qx / 90, e2 = qy / 70; return e1 * e1 + e2 * e2 < 1 && !(Math.abs(qy) < 26 && p4 < 0.01); };
    _grKluwen(ctx, ex, ey, binE, { r: 6, sc: s, col: '#7A8BA8', seed: 31, bbox: [-92, -72, 92, 72], key: 'uvB', a: Math.min(1, p3 * 2) * (1 - p5) }); uit.enzym = [ex, ey - 80 * s]; }
  uit.knip = [[x - gl, y], [x + gl, y]];
  if (p3 > 0.85 && p4 < 0.5) { ctx.save(); ctx.globalAlpha *= (p3 - 0.85) / 0.15; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; uit.knip.forEach(([kx, ky]) => { ky = as(kx)[1] - dw * 0.4; ctx.beginPath(); ctx.moveTo(kx - 10 * s, ky - 12 * s); ctx.lineTo(kx + 10 * s, ky + 12 * s); ctx.moveTo(kx + 10 * s, ky - 12 * s); ctx.lineTo(kx - 10 * s, ky + 12 * s); ctx.stroke(); }); ctx.restore(); }
  if (p5 > 0.01 && p6 < 1) { const px = x - gl + 2 * gl * p5, py = as(px)[1] - 64 * s; enzymKluwen(ctx, px, py, 46 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2, a: 1 - p6 }); }
  ctx.restore(); return uit;
}
