// =====================================================================================
// MICROPIPET (instelbaar, 100–1000 µl) met wegwerppunt, zijaanzicht, op ware maat.
// Recept: bediening volgens de handleiding Eppendorf Research plus (SOP): bedieningsknop bovenop indrukken tot de
//  eerste stop (meetslag) en langzaam terug laten komen = opzuigen, met de punt ± 4 mm in de vloeistof; afgeven =
//  tot de eerste stop, wachten, dan door tot de tweede stop (uitblazen) zodat de punt helemaal leeg is; met de
//  afwerpknop gaat de punt eraf. Onderdelen: bedieningsknop (kleur hoort bij het volumebereik; 1000 µl = blauw),
//  afwerpknop, greep met vingerhaak, volumevenster, schacht met afwerphuls en een conus waar de punt op klemt.
//  Maten (≈, productfoto's): pipet ± 27 cm met punt, greep ± 28 mm dik; punt 1000 µl ± 71 mm, van 7 mm naar 0,8 mm.
//  Meetslag ± 6 mm, uitblaasslag ± 3 mm extra (≈). Vloeistof als vlak in teal in de punt; het volume bepaalt hoe
//  hoog het staat (kegelinhoud). De vloeistof komt alleen in de wegwerppunt, nooit in de pipet zelf.
//  Bekende fouten: pipet zonder punt in de vloeistof; vloeistof in de schacht; knop zonder twee stops.
// x, y = uiteinde van de punt; s = px per mm. o.knop 0 (rust) | 1 (eerste stop) | 2 (tweede stop), tussenwaarden mogen;
// o.vol (µl in de punt), o.druppel 0..1, o.punt (bool), o.rot (0 = punt omlaag), o.kleur, o.a, o.hl.
// Geeft { punt, knop, greep, venster } terug.
// =====================================================================================
function _pipKegelH(vol) { // hoogte (mm) van vloeistof in de punt: binnenstraal r(h) = 0,3 + 0,045·h
  let v = 0; for (let h = 0; h < 70; h += 0.1) { const r = 0.3 + 0.045 * h; v += Math.PI * r * r * 0.1; if (v >= vol) return h; } return 70; }
function micropipet(ctx, x, y, s, o = {}) {
  const { a = 1, knop = 0, vol = 0, druppel = 0, punt = true, rot = 0, kleur = C.teal, hl = 0 } = o;
  const k = clamp(knop, 0, 2), slag = k <= 1 ? k * 6 : 6 + (k - 1) * 3;
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [x + (px * co - py * si) * s, y + (px * si + py * co) * s];
  const ret = { punt: P(0, 0), knop: P(0, -272 + slag), greep: P(0, -205), venster: P(0, -200) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1.1, s * 0.5) / s, L = C.er, klein = s < 1.2, f = rgba(L, 0.14);
  const vorm = (pts, fill, stroke = L) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  // wegwerppunt met vloeistof
  if (punt) { const h = vol > 0 ? _pipKegelH(vol) : 0;
    if (h > 0) { ctx.beginPath(); ctx.moveTo(-0.3, 0); ctx.lineTo(-(0.3 + 0.045 * h), -h); ctx.lineTo(0.3 + 0.045 * h, -h); ctx.lineTo(0.3, 0); ctx.closePath(); ctx.fillStyle = rgba(kleur, 0.6); ctx.fill(); }
    vorm([[-0.45, 0], [-3.6, -64], [-4.2, -71], [4.2, -71], [3.6, -64], [0.45, 0]], rgba(L, 0.06));
    if (druppel > 0.01) { const r = 1.8 * druppel; ctx.fillStyle = rgba(kleur, 0.8); ctx.beginPath(); ctx.arc(0, r * 0.9, r, 0, 6.283); ctx.fill(); } }
  // conus, afwerphuls, schacht
  vorm([[-3.4, -66], [-4.6, -100], [4.6, -100], [3.4, -66]], f);
  vorm([[-6, -96], [-6.5, -128], [6.5, -128], [6, -96]], rgba(L, 0.22));
  vorm([[-6.5, -128], [-9, -165], [9, -165], [6.5, -128]], f);
  // greep met vingerhaak en volumevenster
  vorm([[-12, -165], [-14, -240], [-12, -252], [12, -252], [14, -240], [14, -180], [12, -165]], rgba(L, 0.2));
  vorm([[14, -236], [26, -238], [27, -232], [16, -226]], rgba(L, 0.25)); // vingerhaak
  roundRect(ctx, -6, -215, 12, 26, 2); shape(ctx, '#0F1828', L, lw);
  if (!klein) { const vs = Math.round(o.instel || 1000); String(vs).padStart(4, '0').split('').forEach((d, i) => text(ctx, d, 0, -208 + i * 6, fMeta(5.2), C.text, 'center')); }
  // afwerpknop (naast de bedieningsknop) en bedieningsknop met stang
  vorm([[-13, -252], [-13, -262], [-6, -262], [-6, -252]], rgba(L, 0.25));
  ctx.fillStyle = rgba(L, 0.5); ctx.fillRect(-2.2, -268 + slag, 4.4, 16 - slag);
  roundRect(ctx, -8, -276 + slag, 16, 8, 3); shape(ctx, '#3E78B8', lighten('#3E78B8', 0.35), lw);
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = lw * 2; roundRect(ctx, -10, -279 + slag, 20, 12, 4); ctx.stroke(); }
  ctx.restore(); return ret;
}
