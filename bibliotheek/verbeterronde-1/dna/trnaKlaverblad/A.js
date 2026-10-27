// =====================================================================================
// tRNA: KLAVERBLAD ↔ L-VORM — variant A (nieuw, beeldbank 27 okt 2026): stammen als ladders, lussen als kralenringen.
// Recept (Alberts MBoC 4e 'From RNA to Protein': tRNA ± 80 nucleotiden, 'looks like a cloverleaf when drawn schematically',
// verdere vouwing geeft een 'compact L-shaped structure'; anticodon = drie basen die met het codon paren, aminozuur aan het
// 3'-uiteinde (CCA); OpenStax Biology 2e § 15.5: aminoacyl-tRNA-synthetase koppelt het juiste aminozuur):
//  - vier stammen met baseparen (acceptor-, D-, T- en anticodonstam), drie lussen; in de L-vorm liggen acceptor- en T-stam in
//    één lijn (bovenarm) en D- en anticodonstam in één lijn (onderarm), D- en T-lus raken elkaar in de knik.
//  - anticodon = drie RNA-basen (puzzelvorm van baseRingRNA) onderaan, wijzend naar het codon; aminozuur (oker kraal) aan het
//    3'-uiteinde van de acceptorstam (CCA-staart: model, niet in de geopende bron). o.aa 0 → 1 = laden; animeer afgeven met o.aa → 0.
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
  // verbindingen in het midden (enkele streng)
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); const c = [arms.acc.x0, arms.acc.y0], kk = ['D', 'AC', 'T']; kk.forEach(n => { ctx.moveTo(c[0], c[1]); ctx.quadraticCurveTo(x, y, arms[n].x0, arms[n].y0); }); ctx.stroke();
  Object.entries(arms).forEach(([n, A]) => { const nx = -Math.sin(A.an), ny = Math.cos(A.an), nb = Math.max(2, Math.round(A.len / (0.11 * u)));
    // basenparen (sporten) in RNA-tinten
    for (let i = 0; i < nb; i++) { const f = (i + 0.5) / nb, px = lerp(A.x0, A.x1, f), py = lerp(A.y0, A.y1, f), b1 = 'AUCG'[(i + n.length) % 4], b2 = { A: 'U', U: 'A', C: 'G', G: 'C' }[b1];
      ctx.lineWidth = Math.max(2, 0.06 * u); ctx.strokeStyle = RNA_BASE.base[b1]; ctx.beginPath(); ctx.moveTo(px + nx * sw, py + ny * sw); ctx.lineTo(px, py); ctx.stroke(); ctx.strokeStyle = RNA_BASE.base[b2]; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - nx * sw, py - ny * sw); ctx.stroke(); }
    [1, -1].forEach(k => { ctx.strokeStyle = kd; ctx.lineWidth = lw + 2; ctx.beginPath(); ctx.moveTo(A.x0 + nx * sw * k, A.y0 + ny * sw * k); ctx.lineTo(A.x1 + nx * sw * k, A.y1 + ny * sw * k); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.stroke(); });
    if (A.lus && n !== 'AC') { const nk = 7; for (let k = 0; k < nk; k++) { const an = A.an + Math.PI + (k + 0.5) / nk * 6.283 * 0.85 + 0.45; _bioCirc(ctx, A.lus[0] + Math.cos(an) * 0.2 * u, A.lus[1] + Math.sin(an) * 0.2 * u, Math.max(1.5, 0.05 * u), RNA_BASE.base['AUCG'[k % 4]], kd, 1); } } });
  // anticodonlus met de drie basen onderaan
  const AC = arms.AC, lp = AC.lus, dir = [Math.cos(AC.an), Math.sin(AC.an)];
  ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(lp[0], lp[1], 0.24 * u, 0, 6.283); ctx.stroke();
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
