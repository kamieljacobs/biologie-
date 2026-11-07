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
// Stijl B: moleculair, in doorsnede — de buitenlaag als één rij lipiden (kop buiten, twee staarten naar binnen), PEG als
// zachte ketentjes, binnenin omgekeerde micellen (koppen naar binnen rond een waterkern) waar de mRNA-streng doorheen
// slingert, cholesterol als korte stijve staafjes. Proces: het deeltje legt aan tegen een membraan (in het echt het
// endosoommembraan), de PEG-laag valt weg, de buitenlaag versmelt met de buitenste laag van het membraan, er gaat een
// porie open en het mRNA glijdt naar de andere kant (cytoplasma). Aanroep: lipideNanodeeltje(ctx, x, y, r, o) —
// (x, y) = deeltje vrij, r = straal (px); membraan op y + 2,2 r (gebogen, met o.breed halve breedte). o.f 0..1
// (0 vrij · 0,1–0,3 aanleggen · 0,3–0,6 versmelten · 0,6–1 porie + mRNA erdoor), o.membraan, o.t.
// Geeft { deeltje, endosoom (= contactplek), mrna, membraan } terug.
// =====================================================================================
const _LNB = { kop: '#AFC0D0', vet: '#9C7A3C', kern: '#2E2840', water: '#2E5670', rna: '#B3A3E6', peg: '#8FA0B5', chol: '#E6DCC6', ion: '#C9A35C' };
function lipideNanodeeltje(ctx, x, y, r, o = {}) {
  const { a = 1, f = 0, membraan = true, breed = 6 * r, t = 0 } = o; const lw = Math.max(0.6, r * 0.012);
  const ff = clamp(f, 0, 1), my = y + r * 2.2, R = breed * 3; const ms = Math.max(0.12, r / 150); const half = (26.4 + 2 + 6) * ms;
  const aan = ease(clamp((ff - 0.1) / 0.2, 0, 1)), smelt = ease(clamp((ff - 0.3) / 0.3, 0, 1)), porie = ease(clamp((ff - 0.6) / 0.25, 0, 1)), door = ease(clamp((ff - 0.68) / 0.32, 0, 1));
  const top = my - half; const cy = lerp(y, top - r * lerp(1.02, 0.55, smelt), aan); // deeltje zakt en wordt platter onderaan
  const ret = { deeltje: [x, cy], endosoom: [x, top], mrna: [x, my + half + r * 0.6 * door], membraan: [x - breed * 0.7, my + (breed * 0.7) ** 2 / (2 * R)] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // contour van het deeltje: cirkel waarvan de onderkant op het membraan plat wordt
  const vlak = top - (cy); const contour = u => { let rr = r; const py = Math.sin(u) * rr; if (aan > 0.5 && py > vlak) rr = vlak / Math.max(0.2, Math.sin(u)); return Math.min(r * 1.25, rr); };
  const poreW = r * 0.42 * porie;
  // membraan (dubbellaag, gebogen); porie = gat onder het deeltje
  if (membraan) { const ccx = x, ccy = my + R; const dg = poreW / R;
    if (dg > 0.002) { membraanBoog(ctx, ccx, ccy, R, -Math.PI / 2 - breed / R, -Math.PI / 2 - dg, { s: ms }); membraanBoog(ctx, ccx, ccy, R, -Math.PI / 2 + dg, -Math.PI / 2 + breed / R, { s: ms }); }
    else membraanBoog(ctx, ccx, ccy, R, -Math.PI / 2 - breed / R, -Math.PI / 2 + breed / R, { s: ms });
    if (porie > 0.01) for (const sd of [-1, 1]) { ctx.strokeStyle = _LNB.kop; ctx.lineWidth = Math.max(1, 6 * ms); ctx.beginPath(); ctx.arc(x + sd * poreW, my, half * 0.9, sd < 0 ? -Math.PI / 2 : Math.PI / 2, sd < 0 ? Math.PI / 2 : Math.PI * 1.5, sd > 0); ctx.stroke(); } } // randen van de porie: koppen buigen om
  // kern: donker, omgekeerde micellen met water, mRNA erdoorheen, cholesterol
  ctx.save(); ctx.translate(x, cy);
  const C2 = []; for (let i = 0; i < 90; i++) { const u = i / 90 * 6.283; const rr = contour(u); C2.push([Math.cos(u) * rr * 0.9, Math.sin(u) * rr * 0.9]); }
  ctx.save(); ctx.beginPath(); bioPad(ctx, C2, true); ctx.fillStyle = _LNB.kern; ctx.fill(); ctx.clip();
  const mic = []; for (let i = 0; i < 26; i++) { const an = i * 2.39996, d = Math.sqrt((i + 0.5) / 26) * r * 0.72; mic.push([Math.cos(an) * d, Math.sin(an) * d * 0.95]); }
  const mr = r * 0.085;
  mic.forEach(([mx, my2], i) => { ctx.beginPath(); ctx.arc(mx, my2, mr * 0.7, 0, 6.283); ctx.fillStyle = rgba(_LNB.water, 0.85); ctx.fill();
    const n = 7; for (let k = 0; k < n; k++) { const u = k / n * 6.283 + i; const ux = Math.cos(u), uy = Math.sin(u); ctx.strokeStyle = rgba(_LNB.vet, 0.8); ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(mx + ux * mr, my2 + uy * mr); ctx.lineTo(mx + ux * mr * 1.9, my2 + uy * mr * 1.9); ctx.stroke();
      ctx.beginPath(); ctx.arc(mx + ux * mr * 0.85, my2 + uy * mr * 0.85, mr * 0.28, 0, 6.283); ctx.fillStyle = k % 3 === 0 ? _LNB.ion : _LNB.kop; ctx.fill(); } });
  for (let i = 0; i < 10; i++) { const an = hash(i * 3.7) * 6.283, d = Math.sqrt(hash(i * 1.9)) * r * 0.75; ctx.save(); ctx.translate(Math.cos(an) * d, Math.sin(an) * d); ctx.rotate(an * 2); roundRect(ctx, -mr * 0.9, -mr * 0.22, mr * 1.8, mr * 0.44, mr * 0.2); shape(ctx, rgba(_LNB.chol, 0.75), null); ctx.restore(); } // cholesterol
  // mRNA: slingert door de micelkernen; bij door > 0 trekt het naar de porie
  const route = mic.slice().sort((A2, B2) => Math.atan2(A2[1], A2[0]) - Math.atan2(B2[1], B2[0])).filter((p, i) => i % 2 === 0);
  ctx.restore();
  const rp = route.map(([px, py2], i) => { const tgt = [Math.sin(i * 1.3 + t * 0.5) * r * 0.22 * (i / route.length), (top - cy) + half * 2 + r * 0.9 * (i / route.length) * 2]; const w = clamp(door * 1.6 - (1 - i / route.length) * 0.6, 0, 1); return [lerp(px, tgt[0], w * 0.0 + (door > 0 ? ease(w) : 0)), lerp(py2, tgt[1], door > 0 ? ease(w) : 0)]; });
  ctx.strokeStyle = _LNB.rna; ctx.lineWidth = Math.max(1, r * 0.022); ctx.beginPath(); bioPad(ctx, rp, false); ctx.stroke();
  ctx.lineWidth = Math.max(0.6, r * 0.012); const dense = bioDicht(rp, 6); for (let i = 2; i < dense.length; i += 3) { const p = dense[i], q = dense[i - 1]; const a2 = Math.atan2(p[1] - q[1], p[0] - q[0]) + Math.PI / 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + Math.cos(a2) * r * 0.04, p[1] + Math.sin(a2) * r * 0.04); ctx.stroke(); }
  // buitenlaag: één rij lipiden (kop buiten, twee staarten naar binnen); bij versmelten gaat de onderkant op in het membraan
  const n = Math.max(18, Math.round(r * 0.5)); for (let i = 0; i < n; i++) { const u = i / n * 6.283; const rr = contour(u); const ux = Math.cos(u), uy = Math.sin(u);
    if (smelt > 0.05 && uy > 0.25 && Math.sin(u) * rr >= vlak - 1) continue; // onderste lipiden zijn nu deel van het membraan
    const hx = ux * rr, hy = uy * rr, kr = Math.max(1.2, r * 0.04); ctx.strokeStyle = _LNB.vet; ctx.lineWidth = lw * 1.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx - uy * sd * kr * 0.4, hy + ux * sd * kr * 0.4); ctx.lineTo(hx - ux * kr * 3 - uy * sd * kr * 0.35, hy - uy * kr * 3 + ux * sd * kr * 0.35); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, _LNB.kop, lighten(_LNB.kop, 0.3), Math.max(0.4, lw * 0.6)); }
  // PEG-ketentjes, vallen weg bij aanleggen
  const pa = 1 - aan; if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; ctx.strokeStyle = rgba(_LNB.peg, 0.85); ctx.lineWidth = Math.max(0.6, r * 0.015); for (let i = 0; i < 9; i++) { const u = i / 9 * 6.283 + 0.2, ux = Math.cos(u), uy = Math.sin(u), tx = -uy, ty = ux; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const d = r * (1.04 + k * 0.035), w = Math.sin(k * 1.5 + t + i) * r * 0.03; k ? ctx.lineTo(ux * d + tx * w, uy * d + ty * w) : ctx.moveTo(ux * d + tx * w, uy * d + ty * w); } ctx.stroke(); } ctx.restore(); }
  ret.mrna = [x + rp[rp.length - 1][0], cy + rp[rp.length - 1][1]];
  ctx.restore(); ctx.restore(); return ret;
}
