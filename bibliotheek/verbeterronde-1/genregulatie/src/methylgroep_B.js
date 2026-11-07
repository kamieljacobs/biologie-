// =====================================================================================
// METHYLGROEP op de promotor (genniveau: helix, gen aan/uit). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 7):
//  - methylgroepen (CH3, koraal) zitten op de C's van CG-paars (CpG-eilanden) in de promotor van een gen; op de helix
//    steken ze als knopjes uit in de grote groef. Gemethyleerde genen zijn meestal uit ('methylated genes are usually silenced').
//  - o.tf: zonder methylering landt de transcriptiefactor op de promotor en licht het gen op (aan); met methylering stuit hij
//    af en blijft het gen donker (uit). Slotje (o.slot) als optionele metafoor.
//  - bij de deling (o.deling) wordt de helix gekopieerd: twee dochterhelices, eerst elk met de helft van de knopjes (alleen op de
//    oude streng), daarna vult een enzym ze aan: beide dochters dragen hetzelfde patroon en hetzelfde gen blijft uit.
// Bekende fouten: methylgroepen op het gen in plaats van de promotor; patroon dat bij de deling verdwijnt; CH3 als losse stip.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de basenversie: (x, y) = midden; s = schaal (± 700 × 260 px bij s = 1);
// o.m, o.tf, o.deling, o.slot, o.t. Geeft {sites, tf, dochters} terug.
// =====================================================================================
//@@METHYL
function methylgroep(ctx, x, y, s = 1, o = {}) {
  const { a = 1, m = 1, tf = 0, deling = 0, slot = false, t = 0 } = o; if (a <= 0.01) return {};
  const w = 680 * s, x0 = x - w / 2, dw = 40 * s, pr = [x0 + 40 * s, x0 + 300 * s], gen = [x0 + 330 * s, x0 + w - 30 * s], uit = { sites: [], dochters: [] };
  const N = 6, plek = (k) => pr[0] + 22 * s + k * (pr[1] - pr[0] - 44 * s) / (N - 1);
  ctx.save(); ctx.globalAlpha *= a;
  const aanG = tf > 0.01 && m < 0.5 ? ease(clamp((tf - 0.6) / 0.4, 0, 1)) : 0;
  const helix = (cy, mA, half) => { roundRect(ctx, pr[0], cy - dw * 0.95, pr[1] - pr[0], dw * 1.9, dw * 0.6); shape(ctx, rgba(C.goud, 0.22), rgba(C.goud, 0.7), 1.5);
    roundRect(ctx, gen[0], cy - dw * 0.95, gen[1] - gen[0], dw * 1.9, dw * 0.6); shape(ctx, aanG > 0 ? rgba(C.goud, 0.15 + 0.4 * aanG) : rgba(C.kernR, 0.18), aanG > 0 ? C.goud : rgba(C.kernR, 0.5), 1.5);
    dnaDraad(ctx, [[x0 - 20 * s, cy], [x0 + w + 20 * s, cy]], { w: dw, helix: true, glad: false, fase: t * 0.05 });
    for (let k = 0; k < N; k++) { const boven = k % 2 === 0, xx = plek(k), yy = cy + (boven ? -dw * 0.42 : dw * 0.42); const mm = ease(clamp(mA * N - k, 0, 1)), zicht = half && k % 2 === 1 ? half() : 1;
      if (mm > 0.01 && zicht > 0.01) methylCH3(ctx, xx, yy + (1 - mm) * (boven ? -50 : 50) * s, 8 * s, boven ? -Math.PI / 2 : Math.PI / 2, Math.min(1, mm * 1.5) * zicht); uit.sites.push([xx, yy]); } };
  if (deling < 0.01) { helix(y, m, null); if (slot && m > 0.5) _mgSlot(ctx, pr[0] - 10 * s, y - dw * 2.4, s, (m - 0.5) * 2);
    if (tf > 0.01) { const geblokt = m > 0.5, p = ease(tf), tx = (pr[0] + pr[1]) / 2 + (geblokt ? p * 70 * s : 0), ty = geblokt ? y - 150 * s + Math.sin(p * Math.PI) * 50 * s - p * 30 * s : lerp(y - 240 * s, y - dw * 1.7, p);
      enzymKluwen(ctx, tx, ty, 62 * s, { a: Math.min(1, tf * 2), col: '#7A8BA8', seed: 3, an: Math.PI / 2, sluit: geblokt ? 0 : p }); uit.tf = [tx, ty]; } }
  else { const d = ease(clamp(deling / 0.45, 0, 1)), herstel = ease(clamp((deling - 0.6) / 0.4, 0, 1)), off = d * 190 * s;
    helix(y - off, m, () => herstel); ctx.save(); ctx.globalAlpha *= d; helix(y + off, m, () => herstel); ctx.restore(); uit.dochters = [[x, y - off], [x, y + off]]; }
  ctx.restore(); return uit;
}
