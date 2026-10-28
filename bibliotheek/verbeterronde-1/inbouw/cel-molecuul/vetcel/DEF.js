// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// VETCEL (witte vetcel) — variant A 'dunne rand, dikker bij de kern, vet op te slaan' (27 okt 2026).
// Recept (Junqueira's Basic Histology h. 6; digitalhistology.org 'adipocytes'): witte vetcel 50–150 µm; één
// grote vetdruppel drukt kern en cytoplasma tegen de celrand: het cytoplasma is een heel dun randje (± 1–2 %
// van de diameter), alleen rond de kern iets dikker (kom/sikkel); de kern is platgedrukt (sikkel) tegen de
// rand. o.vol 0..1: de druppel groeit (vet opslaan) of krimpt (vet verbruiken); bij een lege cel wordt het
// cytoplasma dikker. In weefsel (pts = veelhoek) blijft de omtrek, de druppel volgt de vorm.
// Bekende fouten: raster van gelijke rondjes; kern in het midden; overal even dikke rand.
// Aanroep zoals voorheen: vetcel(ctx, x, y, r, {a, pts, inhoud}); nieuw: vol (standaard 1).
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null, vol = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  // kernplek: rechtsonder op de omtrek
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.6), rgba(BIO.cyto, 0.95), Math.max(1, rr * 0.012));
  // druppel: iets van de kern af geschoven (dikker cytoplasma bij de kern), elders een dun randje
  const v = clamp(vol, 0, 1); const k = lerp(0.5, 0.925, v), sh = rr * lerp(0.03, 0.055, v);
  const dcx = cx - Math.cos(an) * sh, dcy = cy - Math.sin(an) * sh;
  const druppel = omtrek.map(p => [dcx + (p[0] - cx) * k, dcy + (p[1] - cy) * k]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.88), rgba(BIO.vetS, 0.95), Math.max(1, rr * 0.01));
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(dcx, dcy); ctx.restore(); }
  // kern: platgedrukte sikkel in het dikkere stukje cytoplasma
  const dik = rr * (1 - k) + sh, kr2 = rr - dik / 2; const kx = cx + Math.cos(an) * kr2, ky = cy + Math.sin(an) * kr2;
  ctx.beginPath(); ctx.ellipse(kx, ky, Math.max(4, rr * 0.2), Math.max(1.6, Math.min(dik * 0.38, rr * 0.08)), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1);
  ctx.restore();
}
