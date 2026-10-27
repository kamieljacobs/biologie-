// =====================================================================================
// EICEL (variant: stralende zuilcellen). Recept: eicel ± 120 µm, kern iets uit het midden; zona pellucida = dunne
// glazige ring (± 1/10 van de straal); corona radiata = binnenste granulosalaag die radiair uitgerekt tegen de zona
// staat (zuilcellen, 'stralenkrans': vandaar de naam), daarbuiten losser liggende cumuluscellen die na de eisprong
// uiteenvallen. Cellen sluiten zonder gaten aan (mozaïek), in de follikelkleur. Follikelrijping zie follikel().
// Bron: Atlas of Plant and Animal Histology (Megías, Univ. Vigo) 'ovarian follicles'; Junqueira h. 22.
// Bekende fouten: krans als grote losse bollen (bloem/tandwiel); zona als dikke grijze band.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const korr = '#E2B88E', korrR = '#B88A60', kernK = '#9C6A4A';
  const zr = r * 1.1;
  if (krans) {
    // losse buitenste cumuluscellen
    if (r > 10) for (let k = 0; k < 26; k++) { const an = hash(k * 5 + 2) * 6.283, rr = r * (1.55 + 0.25 * hash(k * 5 + 3)), cr = r * 0.085;
      ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr, 0, 6.283); shape(ctx, rgba(korr, 0.55), rgba(korrR, 0.6), 0.8); }
    // zuilcellen: wiggen tussen de zona en een golvende buitenrand
    const n = r < 12 ? 14 : 30, gr = [];
    for (let k = 0; k <= n; k++) gr.push((k + 0.35 * (hash(k * 7 + 1) - 0.5)) / n * 6.283);
    gr[n] = gr[0] + 6.283;
    for (let k = 0; k < n; k++) { const a0 = gr[k], a1 = gr[k + 1], ro = r * (1.42 + 0.08 * hash(k * 3 + 9)), am = (a0 + a1) / 2;
      ctx.beginPath(); ctx.moveTo(x + Math.cos(a0) * zr, y + Math.sin(a0) * zr); ctx.arc(x, y, zr, a0, a1);
      ctx.lineTo(x + Math.cos(a1) * ro * 0.98, y + Math.sin(a1) * ro * 0.98); ctx.quadraticCurveTo(x + Math.cos(am) * ro * 1.04, y + Math.sin(am) * ro * 1.04, x + Math.cos(a0) * ro * 0.98, y + Math.sin(a0) * ro * 0.98); ctx.closePath();
      shape(ctx, rgba(korr, 0.88), rgba(korrR, 0.85), r > 30 ? 1.2 : 0.6);
      if (r > 20) { const kr = r * (1.3 + 0.06 * hash(k)); ctx.beginPath(); ctx.ellipse(x + Math.cos(am) * kr, y + Math.sin(am) * kr, r * 0.05, r * 0.028, am, 0, 6.283); ctx.fillStyle = rgba(kernK, 0.75); ctx.fill(); } }
  }
  ctx.beginPath(); ctx.arc(x, y, zr, 0, 6.283); ctx.fillStyle = rgba('#F4F6F2', 0.8); ctx.fill(); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.97), '#D9C49A', 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.28, 0, 6.283); shape(ctx, rgba(C.paars, 0.75), r > 30 ? rgba('#A392D6', 0.9) : null, 1);
  if (r > 30) { ctx.beginPath(); ctx.arc(x + r * 0.24, y - r * 0.15, r * 0.07, 0, 6.283); ctx.fillStyle = rgba('#3E2E66', 0.7); ctx.fill(); }
  ctx.restore();
}
function follikel(ctx, x, y, f, o = {}) { // f: 0 primordiaal → 1 Graaf; schaalgrootte via o.R (straal bij f=1)
  const { a = 1, R = 120, scheur = 0, seed = 0, eicel = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = lerp(o.klein ? 7.5 : 9, R, Math.pow(f, 1.6)); const ei = lerp(4, Math.max(10, R * 0.12), Math.min(1, f * 2.2));
  // theca (buitenste ring) vanaf secundair
  if (f > 0.3) { ctx.beginPath(); ctx.arc(x, y, r + 6 + 4 * f, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.25 * f), rgba('#C98A6A', 0.5 * f), 1.5); }
  // granulosacellen
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.75), rgba('#C9966A', 0.9), 1.2);
  // celkorrels in de granulosa (één laag plat → meerdere lagen)
  const nRing = o.klein ? 6 : Math.round(lerp(8, 34, Math.min(1, f * 1.4))); const lagen = f < 0.15 ? 1 : f < 0.4 ? 2 : 3;
  for (let L = 0; L < lagen; L++) for (let k = 0; k < nRing; k++) { const an = k / nRing * 6.283 + L * 0.3 + seed; const rr = r * (0.88 - L * 0.1); const cr = Math.max(1.4, r * 0.06);
    ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (f < 0.1 ? 1.6 : 1), cr * (f < 0.1 ? 0.6 : 1), an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.55); ctx.fill(); }
  // antrum (vochtholte) vanaf f > 0.45, eicel op de cumulus aan één kant
  let ex = x, ey = y;
  if (f > 0.45) { const af = clamp((f - 0.45) / 0.55, 0, 1); const ar = r * lerp(0.2, 0.8, af);
    ctx.beginPath(); ctx.arc(x + r * 0.08 * af, y - r * 0.05 * af, ar, 0, 6.283); shape(ctx, rgba('#E9F0F4', 0.55), rgba('#BFD0DA', 0.7), 1);
    ex = x - r * 0.55 * af; ey = y + r * 0.35 * af;
    ctx.beginPath(); ctx.arc(ex, ey, ei * 2.2, 0, 6.283); ctx.fillStyle = rgba('#E2B88E', 0.85); ctx.fill(); }
  if (eicel && scheur < 0.5) eicelEcht(ctx, ex, ey, ei, 1, f > 0.6);
  ctx.restore(); return [ex, ey, ei];
}
