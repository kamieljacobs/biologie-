// =====================================================================================
// EICEL (in de follikel). Recept: eicel ± 120 µm (grootste cel), kern iets uit het midden; zona pellucida = dunne,
// lichte, glazige ring (± 1/10 van de straal); stralenkrans (corona radiata) = de granulosacellen die tegen de zona
// liggen: 2–3 lagen kleine, dicht gepakte cellen in de follikelkleur, de binnenste radiair uitgerekt. Follikelrijping:
// primordiaal (één laag platte cellen) → primair (kubisch, zona ontstaat) → secundair (meer lagen, theca) → holte
// (antrum), eicel op een heuveltje (cumulus) → Graafse follikel (puilt uit). Bron: Atlas of Plant and Animal
// Histology (Megías, Univ. Vigo) 'ovarian follicles'; Junqueira h. 22. Bekende fouten: krans als grote losse bollen
// (bloem/tandwiel); eicel in een andere kleurwereld dan de follikel.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const korr = '#E2B88E', korrR = '#C9966A';
  if (krans) { const lagen = r < 12 ? 1 : 3; ctx.beginPath(); ctx.arc(x, y, r * (1.2 + 0.2 * lagen), 0, 6.283); ctx.fillStyle = rgba(korr, 0.35); ctx.fill();
    for (let L = lagen - 1; L >= 0; L--) { const rr = r * (1.25 + L * 0.2), n = Math.max(10, Math.round(6.283 * rr / (r * 0.16))); const cr = r * 0.1;
      for (let k = 0; k < n; k++) { const an = (k + 0.5 * L + 0.3 * hash(k * 3 + L * 17)) / n * 6.283; ctx.beginPath();
        ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (L ? 1 : 1.35), cr * (L ? 0.9 : 0.65), an, 0, 6.283); shape(ctx, rgba(korr, 0.9), rgba(korrR, 0.9), r > 30 ? 1 : 0.6);
        if (r > 30) { ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * 0.35, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.6); ctx.fill(); } } } }
  ctx.beginPath(); ctx.arc(x, y, r * 1.11, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.5), rgba('#FBF6EA', 0.9), Math.max(1, r * 0.012)); // zona pellucida: dun en glazig
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), '#D9C49A', 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.28, 0, 6.283); shape(ctx, rgba(C.paars, 0.75), r > 30 ? rgba('#A392D6', 0.9) : null, 1);
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
