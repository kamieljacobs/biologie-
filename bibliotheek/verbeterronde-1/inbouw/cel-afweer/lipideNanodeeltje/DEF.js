// =====================================================================================
// LIPIDE-NANODEELTJE (mRNA-vaccin). Recept: bolletje van ± 80–100 nm uit vier soorten vet: ioniseerbaar lipide
// (30–50 %), cholesterol (20–50 %), fosfolipide (10–20 %) en PEG-lipide (0,5–2,5 %). Kern (± 55 nm) = mRNA met
// ioniseerbaar lipide, cholesterol en water (omgekeerde micellen); daaromheen één laag lipiden (± 2,4 nm, koppen naar
// buiten), met PEG-ketens als zacht 'haar' (± 4 nm) aan de buitenkant. De spiercel neemt het deeltje op door
// endocytose (membraan stulpt in, blaasje = endosoom); in het zure endosoom krijgt het ioniseerbare lipide een
// positieve lading, het deeltje versmelt met / verstoort het endosoommembraan en het mRNA komt vrij in het
// cytoplasma, waar ribosomen het aflezen. mRNA = dunne, slappe enkele streng (paars). Bron: Du e.a. 2025, RSC
// Pharmaceutical Science 'The rise of mRNA therapeutic vaccines'; OpenStax Biology 2e § 9.1 (membraan, vetoplosbaar).
// Bekende fouten: deeltje als massieve bol zonder lipidenlaag; mRNA als staafje; mRNA dat de kern in gaat; deeltje
// even groot als de cel (het is ± 1/500 van een spiercel: altijd 'vergroot').
// =====================================================================================
// Definitief (Kamiel 28 okt 2026: 'het bolletje van variant B en de ribosomen van variant A'): het deeltje uit B in doorsnede
// (één laag lipiden met kop buiten en twee staarten naar binnen, PEG als zachte ketentjes, binnenin omgekeerde micellen met
// een waterkern, enkele cholesterolstaafjes en de mRNA-streng), maar rustiger: 9 micellen in plaats van 26, 4 cholesterol.
// De route en het vervolg komen uit A: endocytose → endosoom (zuur, H⁺) → het deeltje gaat open en het mRNA komt vrij →
// ribosomen lezen het af, een eiwitketen groeit. Het endosoom is in het echt de plek waar het deeltje versmelt (bron).
// Aanroep: lipideNanodeeltje(ctx, x, y, r, o) — (x, y) = deeltje vrij buiten de cel, r = straal (px); het membraan
// van de spiercel ligt op y + 2,2 r (cel eronder, zacht gebogen). o.f 0..1 (0 vrij · 0,1–0,35 instulpen · 0,35–0,5
// endosoom naar binnen · 0,5–0,75 zuur + ontsnappen · 0,75–1 mRNA vrij + vertaling), o.membraan (true), o.breed
// (halve breedte membraan, standaard 6 r), o.t. Geeft { deeltje, endosoom, mrna, membraan } terug.
// =====================================================================================
const _LN = { kop: '#AFC0D0', vet: '#9C7A3C', kern: '#2E2840', water: '#2E5670', chol: '#E6DCC6', ion: '#C9A35C', rna: '#B3A3E6', peg: '#8FA0B5', endo: '#C9A35C', h: '#E07A5F', ribo: '#C9B896', eiwit: '#C9A35C' };
function _lnDeeltje(ctx, x, y, r, open, t, lw) { // deeltje uit variant B, rustiger; open 0..1 = laag gaat onderaan open (versmelten)
  const w = Math.max(0.6, r * 0.012), dOpen = an => Math.abs(((an - Math.PI / 2) + 9.42) % 6.283 - 3.14) < open * 1.2;
  ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r * 0.9, 0, 6.283); ctx.fillStyle = _LN.kern; ctx.fill(); ctx.clip();
  // omgekeerde micellen: waterkern, koppen naar binnen, staartjes naar buiten (9 stuks, ruim verdeeld)
  const nm = 9, mr = r * 0.085, mic = []; for (let i = 0; i < nm; i++) { const an = i * 2.39996 + 0.5, d = Math.sqrt((i + 0.5) / nm) * r * 0.62; mic.push([Math.cos(an) * d, Math.sin(an) * d]); }
  if (r >= 40) mic.forEach(([mx, my], i) => { ctx.beginPath(); ctx.arc(mx, my, mr * 0.7, 0, 6.283); ctx.fillStyle = rgba(_LN.water, 0.85); ctx.fill();
    for (let k = 0; k < 7; k++) { const u = k / 7 * 6.283 + i, ux = Math.cos(u), uy = Math.sin(u); ctx.strokeStyle = rgba(_LN.vet, 0.8); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(mx + ux * mr, my + uy * mr); ctx.lineTo(mx + ux * mr * 1.9, my + uy * mr * 1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(mx + ux * mr * 0.85, my + uy * mr * 0.85, mr * 0.28, 0, 6.283); ctx.fillStyle = k % 3 === 0 ? _LN.ion : _LN.kop; ctx.fill(); } });
  if (r >= 40) for (let i = 0; i < 4; i++) { const an = i * 1.57 + 1.2, d = r * 0.68; ctx.save(); ctx.translate(Math.cos(an) * d, Math.sin(an) * d); ctx.rotate(an + 1.2); roundRect(ctx, -mr * 0.9, -mr * 0.22, mr * 1.8, mr * 0.44, mr * 0.2); shape(ctx, rgba(_LN.chol, 0.75), null); ctx.restore(); } // cholesterol
  // mRNA: één slappe streng die langs de micellen slingert (op kleine schaal: opgerold zonder micellen)
  const route = mic.slice().sort((a2, b2) => Math.atan2(a2[1], a2[0]) - Math.atan2(b2[1], b2[0])).map(([mx, my], i) => [mx * (r >= 40 ? 1 : 0.6) + Math.sin(i * 1.7 + t * 0.3) * r * 0.04, my * (r >= 40 ? 1 : 0.6)]);
  ctx.strokeStyle = _LN.rna; ctx.lineWidth = Math.max(1, r * 0.022); ctx.beginPath(); bioPad(ctx, route, false); ctx.stroke(); // open streng met twee uiteinden
  ctx.restore();
  // buitenlaag: één rij lipiden, kop buiten, twee staarten naar binnen; open = gat aan de onderkant
  const n = Math.max(14, Math.round(r * 0.5)); for (let i = 0; i < n; i++) { const an = i / n * 6.283; if (open > 0 && dOpen(an)) continue;
    const ux = Math.cos(an), uy = Math.sin(an), hx = ux * r, hy = uy * r, kr = Math.max(1, r * 0.04);
    if (r >= 40) { ctx.strokeStyle = _LN.vet; ctx.lineWidth = w * 1.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx - uy * sd * kr * 0.4, hy + ux * sd * kr * 0.4); ctx.lineTo(hx - ux * kr * 3 - uy * sd * kr * 0.35, hy - uy * kr * 3 + ux * sd * kr * 0.35); ctx.stroke(); } }
    else { ctx.strokeStyle = _LN.vet; ctx.lineWidth = Math.max(0.6, r * 0.025); ctx.beginPath(); ctx.moveTo(ux * r * 0.95, uy * r * 0.95); ctx.lineTo(ux * r * 0.8, uy * r * 0.8); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(hx, hy, Math.max(1, r * (r >= 40 ? 0.04 : 0.065)), 0, 6.283); shape(ctx, _LN.kop, lighten(_LN.kop, 0.3), Math.max(0.4, w * 0.6)); }
  // PEG-ketentjes (zacht haar)
  ctx.strokeStyle = rgba(_LN.peg, 0.85); ctx.lineWidth = Math.max(0.6, r * 0.015); for (let i = 0; i < 9; i++) { const u = i / 9 * 6.283 + 0.2; if (open > 0 && dOpen(u)) continue; const ux = Math.cos(u), uy = Math.sin(u), tx = -uy, ty = ux;
    ctx.beginPath(); for (let k = 0; k <= 8; k++) { const d = r * (1.04 + k * 0.035), ww = Math.sin(k * 1.5 + t + i) * r * 0.03; k ? ctx.lineTo(ux * d + tx * ww, uy * d + ty * ww) : ctx.moveTo(ux * d + tx * ww, uy * d + ty * ww); } ctx.stroke(); }
  ctx.restore();
}
function _lnMRNA(ctx, x0, y0, L, an, t, lw, seed) { // dunne, slappe streng met korte basen aan één kant
  const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * 7 + seed + t * 0.6) * L * 0.08 + Math.sin(u * 3 + seed * 2) * L * 0.1; pts.push([x0 + Math.cos(an) * u * L - Math.sin(an) * w, y0 + Math.sin(an) * u * L + Math.cos(an) * w]); }
  ctx.strokeStyle = _LN.rna; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  ctx.lineWidth = lw * 0.6; for (let i = 1; i < pts.length; i += 2) { const p = pts[i], q = pts[i - 1]; const a2 = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + Math.cos(a2) * lw * 2.2, p[1] + Math.sin(a2) * lw * 2.2); ctx.stroke(); }
  return pts;
}
function lipideNanodeeltje(ctx, x, y, r, o = {}) {
  const { a = 1, f = 0, membraan = true, breed = 6 * r, t = 0 } = o; const lw = Math.max(1, r * 0.03);
  const ff = clamp(f, 0, 1), my = y + r * 2.2, Rm = breed * 3;
  const instulp = ease(clamp((ff - 0.1) / 0.25, 0, 1)), los = ease(clamp((ff - 0.35) / 0.15, 0, 1)), zuur = clamp((ff - 0.5) / 0.15, 0, 1), ontsnap = ease(clamp((ff - 0.6) / 0.15, 0, 1)), vrij = ease(clamp((ff - 0.75) / 0.25, 0, 1));
  const ey = lerp(my - r * 1.15, my + r * 2.9, los); const py = ff < 0.1 ? lerp(y, my - r * 1.15, ease(ff / 0.1)) : (ff < 0.35 ? lerp(my - r * 1.15, my + r * 0.1, instulp) : ey + (ff < 0.5 ? lerp(r * 1.25, 0, los) * 0 : 0));
  const ppy = ff < 0.1 ? lerp(y, my - r * 1.15, ease(ff / 0.1)) : ff < 0.35 ? lerp(my - r * 1.15, my + r * 0.15, instulp) : lerp(my + r * 0.15, my + r * 3.0, los);
  const ret = { deeltje: [x, ppy], endosoom: [x, ppy], mrna: [x + r * 1.5, ppy + r * 1.2], membraan: [x - breed * 0.7, my + (breed * 0.7) ** 2 / (2 * Rm)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // celmembraan (dubbellaag, gebogen; cel eronder) met instulping die afsnoert
  if (membraan) { const ms = Math.max(0.25, r / 90); const cx = x, cy = my + Rm; const dip = r * 1.35 * instulp * (1 - los);
    const pad = []; for (let i = 0; i <= 80; i++) { const px = x - breed + 2 * breed * i / 80; const base = my + ((px - x) ** 2) / (2 * Rm); const d = px - x; const w = r * 1.35;
      const g = Math.exp(-(d * d) / (2 * (w * 0.7) ** 2)); pad.push([px, base + dip * 1.4 * g]); }
    // dubbellaag als twee lijnen met koppen (vereenvoudigd membraanBoog langs het pad)
    for (const off of [-r * 0.12, r * 0.12]) { ctx.strokeStyle = rgba(_LN.kop, 0.9); ctx.lineWidth = Math.max(1, r * 0.06); ctx.setLineDash([Math.max(1.5, r * 0.07), Math.max(1, r * 0.04)]); ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] + off) : ctx.moveTo(p[0], p[1] + off)); ctx.stroke(); }
    ctx.setLineDash([]); ctx.strokeStyle = rgba(_LN.vet, 0.7); ctx.lineWidth = Math.max(1, r * 0.12); ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.globalAlpha *= 1; }
  // endosoom (blaasje van celmembraan) om het deeltje
  const endoA = ff >= 0.3 ? clamp((ff - 0.3) / 0.08, 0, 1) * (1 - ontsnap * 0.6) : 0; const er = r * 1.3;
  if (endoA > 0.01) { ctx.save(); ctx.globalAlpha *= endoA; const gat = ontsnap * 1.1; ctx.beginPath(); ctx.arc(x, ppy, er, Math.PI / 2 + gat, Math.PI / 2 + 6.283 - gat); ctx.strokeStyle = rgba(_LN.kop, 0.9); ctx.lineWidth = Math.max(1.5, r * 0.16); ctx.stroke(); ctx.strokeStyle = rgba(_LN.vet, 0.8); ctx.lineWidth = Math.max(0.8, r * 0.06); ctx.stroke();
    for (let i = 0; i < 6; i++) { const z = zuur * (i < 6 ? 1 : 0); if (z < 0.05) continue; const an = i * 1.05 + 0.4; const hx = x + Math.cos(an) * er * 0.92, hy = ppy + Math.sin(an) * er * 0.92; ctx.save(); ctx.globalAlpha *= z; text(ctx, 'H⁺', hx, hy + r * 0.12, `600 ${Math.max(9, r * 0.32)}px "Source Sans 3",system-ui`, _LN.h, 'center'); ctx.restore(); } ctx.restore(); }
  // deeltje (gaat open en verdwijnt als het versmolten is)
  if (ontsnap < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - ontsnap * 0.85; _lnDeeltje(ctx, x, ppy, r * (1 - 0.15 * ontsnap), ontsnap * 0.8, t, lw); ctx.restore(); }
  // mRNA vrij in het cytoplasma; ribosomen lezen af, eiwitketen groeit
  if (ontsnap > 0.01) { const L = r * lerp(0.8, 3.0, vrij); const strands = [[x + r * 0.2, ppy + r * 0.6, 0.55, 1], [x - r * 0.3, ppy + r * 0.6, 2.4, 3]];
    strands.forEach(([sx, sy, an, sd], k) => { ctx.save(); ctx.globalAlpha *= ontsnap; const pts = _lnMRNA(ctx, sx, sy, L, an, t, Math.max(1, r * 0.06), sd);
      if (vrij > 0.3) { const p = pts[Math.round(pts.length * 0.55)]; ctx.save(); ctx.globalAlpha *= clamp((vrij - 0.3) / 0.3, 0, 1); ctx.beginPath(); ctx.ellipse(p[0], p[1] - r * 0.14, r * 0.26, r * 0.18, an, 0, 6.283); shape(ctx, _LN.ribo, lighten(_LN.ribo, 0.3), lw); ctx.beginPath(); ctx.ellipse(p[0], p[1] + r * 0.06, r * 0.2, r * 0.13, an, 0, 6.283); shape(ctx, lighten(_LN.ribo, -0.1), lighten(_LN.ribo, 0.3), lw);
        const nb = Math.round(clamp((vrij - 0.5) / 0.5, 0, 1) * 7); for (let b = 0; b < nb; b++) { ctx.beginPath(); ctx.arc(p[0] - Math.sin(an) * 0 + Math.cos(an + 1.9) * r * (0.35 + b * 0.16) + Math.sin(b * 1.7) * r * 0.06, p[1] - r * 0.3 + Math.sin(an + 1.9) * r * (0.35 + b * 0.16) * 0.2 - b * r * 0.12, r * 0.075, 0, 6.283); shape(ctx, _LN.eiwit, lighten(_LN.eiwit, 0.4), Math.max(0.5, lw * 0.6)); } ctx.restore(); }
      if (k === 0) ret.mrna = pts[pts.length - 1]; ctx.restore(); }); }
  ctx.restore(); return ret;
}
