// =====================================================================================
// tRNA: KLAVERBLAD ↔ L-VORM — variant B (nieuw, beeldbank 27 okt 2026): gevuld silhouet (lobben/buis) met lichte dwarsstrepen voor de baseparen.
// Recept (Alberts MBoC 4e 'From RNA to Protein': tRNA ± 80 nucleotiden, 'looks like a cloverleaf when drawn schematically',
// verdere vouwing geeft een 'compact L-shaped structure'; anticodon = drie basen die met het codon paren, aminozuur aan het
// 3'-uiteinde (CCA); OpenStax Biology 2e § 15.5: aminoacyl-tRNA-synthetase koppelt het juiste aminozuur):
//  - vier stammen met baseparen (acceptor-, D-, T- en anticodonstam), drie lussen; in de L-vorm liggen acceptor- en T-stam in
//    één lijn (bovenarm) en D- en anticodonstam in één lijn (onderarm), D- en T-lus raken elkaar in de knik.
//  - anticodon = drie RNA-basen (puzzelvorm van baseRingRNA) onderaan, wijzend naar het codon; aminozuur (oker kraal) aan het
//    3'-uiteinde van de acceptorstam (CCA-staart: model, niet in de geopende bron). o.aa 0 → 1 = laden; animeer afgeven met o.aa → 0.
//  - B: elke stam is een gevulde ronde band (breedte = dubbele streng), elke lus een gevulde lob; samen één teal silhouet,
//    met lichte dwarsstrepen voor de baseparen. Klaverblad leest als blad met drie lobben + steel, L-vorm als een geknikte buis.
//  - kleur: RNA = teal (zelfde tinten als mrnaSliert).
//  Bekende fouten: T-vorm of blokje; anticodon bovenaan; aminozuur aan het anticodon; klaverblad als 'echte' 3D-vorm.
// trnaKlaverblad(ctx, x, y, s, {vorm 0..1, anti, aa 0..1, aaKleur, t, a}); (x, y) = knik/midden; s = schaal (1 ≈ 220 px hoog).
// Geeft {anti: [x, y] (onder de anticodonbasen), aa: [x, y], richting} terug.
// =====================================================================================
// opbouw (eenheid u): vier armen; klaverblad (vorm 0) ↔ L-vorm (vorm 1). Per arm: begin (x, y), hoek, stamlengte, lus aan het eind of begin.
const _TRNA_K = { acc: [0, -0.18, -90, 0.9, 'geen'], T: [0.18, 0, 0, 0.55, 'eind'], D: [-0.18, 0, 180, 0.5, 'eind'], AC: [0, 0.18, 90, 0.62, 'eind'] };
const _TRNA_L = { acc: [1.0, -0.05, 0, 0.9, 'geen'], T: [0.42, -0.05, 0, 0.55, 'begin'], D: [-0.05, 0.42, 90, 0.5, 'begin'], AC: [-0.05, 0.98, 90, 0.62, 'eind'] };
function _trnaArm(naam, e, u, x, y) { const a = _TRNA_K[naam], b = _TRNA_L[naam], an = lerp(a[2], b[2], e) * Math.PI / 180, len = lerp(a[3], b[3], e) * u;
  const x0 = x + lerp(a[0], b[0], e) * u, y0 = y + lerp(a[1], b[1], e) * u, x1 = x0 + Math.cos(an) * len, y1 = y0 + Math.sin(an) * len;
  const lusEind = [x1 + Math.cos(an) * 0.27 * u, y1 + Math.sin(an) * 0.27 * u], lusBegin = [x0 - Math.cos(an) * 0.27 * u, y0 - Math.sin(an) * 0.27 * u];
  const lus = a[4] === 'geen' ? null : (a[4] === b[4] ? (a[4] === 'eind' ? lusEind : lusBegin) : [lerp(lusEind[0], lusBegin[0], e), lerp(lusEind[1], lusBegin[1], e)]);
  return { x0, y0, x1, y1, an, len, lus }; }
function trnaKlaverblad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vorm = 0, anti = 'UAC', aa = 0, aaKleur = '#C9A35C', t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s, e = ease(clamp(vorm, 0, 1));
  const kl = '#5BA4C9', kd = '#2E6F92', sw = 0.13 * u, lw = Math.max(1.5, 0.045 * u);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const arms = {}; ['D', 'T', 'acc', 'AC'].forEach(n => arms[n] = _trnaArm(n, e, u, x, y));
  // gevuld silhouet: middenstuk, stammen als dikke ronde banden, lussen als lobben
  const vul = '#3E86AE', rand = '#8CC6E1'; const band = (x0, y0, x1, y1, w) => { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineWidth = w; ctx.stroke(); };
  for (const pass of [0, 1]) { ctx.strokeStyle = pass ? vul : rand; const extra = pass ? 0 : 3;
    Object.values(arms).forEach(A => { band(A.x0, A.y0, A.x1, A.y1, sw * 2.6 + extra); if (A.lus) { ctx.beginPath(); ctx.arc(A.lus[0], A.lus[1], 0.24 * u + extra / 2, 0, 6.283); ctx.fillStyle = pass ? vul : rand; ctx.fill(); } });
    ctx.beginPath(); ctx.arc(x + lerp(0, 0.02, e) * u, y + lerp(0, 0.02, e) * u, sw * 1.6 + extra / 2, 0, 6.283); ctx.fillStyle = pass ? vul : rand; ctx.fill(); }
  Object.values(arms).forEach(A => { const nx = -Math.sin(A.an), ny = Math.cos(A.an), nb = Math.max(2, Math.round(A.len / (0.11 * u))); ctx.strokeStyle = rgba('#BFE0EF', 0.45); ctx.lineWidth = Math.max(1.2, 0.03 * u);
    for (let i = 0; i < nb; i++) { const f = (i + 0.5) / nb, px = lerp(A.x0, A.x1, f), py = lerp(A.y0, A.y1, f); ctx.beginPath(); ctx.moveTo(px + nx * sw * 0.9, py + ny * sw * 0.9); ctx.lineTo(px - nx * sw * 0.9, py - ny * sw * 0.9); ctx.stroke(); } });
  // anticodonlus met de drie basen onderaan
  const AC = arms.AC, lp = AC.lus, dir = [Math.cos(AC.an), Math.sin(AC.an)];
    const bs = 0.17 * u / 22; const ap = [lp[0] + dir[0] * 0.24 * u, lp[1] + dir[1] * 0.24 * u];
  for (let i = 0; i < 3; i++) { const off = (i - 1) * 52 * bs * 1.05, px = ap[0] + dir[1] * off, py = ap[1] - dir[0] * off; baseRingRNA(ctx, px, py, anti[i], 1, { s: bs, rot: AC.an - Math.PI / 2, plekA: 0, geenLetter: u < 60 }); }
  // 3'-uiteinde (CCA) en aminozuur aan de acceptorstam
  const ac = arms.acc, an = ac.an, ex = ac.x1 + Math.cos(an) * 0.22 * u, ey = ac.y1 + Math.sin(an) * 0.22 * u;
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(ac.x1 - Math.sin(an) * sw, ac.y1 + Math.cos(an) * sw); ctx.lineTo(ex, ey); ctx.stroke();
  for (let i = 0; i < 3; i++) { const f = (i + 0.5) / 3; _bioCirc(ctx, lerp(ac.x1, ex, f) - Math.sin(an) * sw * 0.4, lerp(ac.y1, ey, f) + Math.cos(an) * sw * 0.4, Math.max(1.5, 0.045 * u), RNA_BASE.base['CCA'[i]], kd, 1); }
  const aaP = [ex + Math.cos(an) * 0.2 * u, ey + Math.sin(an) * 0.2 * u];
  if (aa > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(aa, 0, 1); const r = 0.17 * u * (0.6 + 0.4 * aa); _bioCirc(ctx, aaP[0] + Math.cos(an) * (1 - aa) * 0.5 * u, aaP[1] + Math.sin(an) * (1 - aa) * 0.5 * u, r, aaKleur, lighten(aaKleur, 0.35), 1.5); ctx.restore(); }
  ctx.restore();
  return { anti: [ap[0] + dir[0] * 0.25 * u, ap[1] + dir[1] * 0.25 * u], aa: aaP, richting: AC.an };
}
