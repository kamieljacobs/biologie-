// ---------- HELICASE, PRIMASE, LIGASE (variant A, beeldbank 27 okt 2026) ----------
// Recept (OpenStax Biology 2e § 14.4: helicase 'unwinds the DNA by breaking the hydrogen bonds', primase maakt een RNA-primer van
// ± 5–10 nucleotiden, ligase 'catalyzes the formation of phosphodiester linkage'; Leman & Noguchi 2013: eukaryote helicase CMG =
// ring van zes Mcm-eiwitten om één streng):
//  - helicase: zes lobben op een ring loodrecht op de streng, schuin gezien (40°): de streng gaat zichtbaar door het gat;
//    de drie lobben achter de streng tekent laag 'achter', de drie ervoor laag 'voor'; fase = draaien om de streng.
//  - primase: eiwitkluwen (enzymKluwen) met aan het actieve centrum een kort teal RNA-stukje (o.rna 0..1, 4 nucleotiden)
//    — zo is hij niet met ligase te verwarren.
//  - ligase: hoefijzer dat over de knip in de suiker-fosfaatketen grijpt; o.sluit 0 → 1: kaken dicht, gouden flits op de naad.
//  Bekende fouten: helicase als twee klontjes (v2); primase en ligase alleen in tint verschillend (v2).
// helicaseRing(ctx, x, y, r, {fase, laag, hl}); primase(ctx, x, y, r, {an, hl, rna}); ligase(ctx, x, y, r, {an, sluit, hl}).
// an = richting (rad) van het enzym naar de streng (zoals enzymKluwen: actief centrum op +x).
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sb = Math.sin(0.7), L = [];
  for (let k = 0; k < 6; k++) { const ph = k / 6 * 6.283 + fase; L.push({ x: x + Math.sin(ph) * r * 0.78 * sb, y: y + Math.cos(ph) * r * 0.78, z: Math.sin(ph), ph }); }
  L.sort((p, q) => p.z - q.z);
  // ringband (verbindt de lobben): achterhelft bij laag 'achter', voorhelft bij 'voor'
  const band = (v) => { ctx.beginPath(); ctx.ellipse(x, y, r * 0.78 * sb, r * 0.78, 0, v ? -Math.PI / 2 : Math.PI / 2, v ? Math.PI / 2 : Math.PI * 1.5); ctx.strokeStyle = v ? '#6F7E98' : '#3E4C62'; ctx.lineWidth = r * 0.3; ctx.stroke(); };
  if (laag !== 'voor') band(false);
  if (laag !== 'achter') band(true);
  L.forEach(p => { const voor = p.z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const vul = _mixHex('#8E9CB8', '#2A3448', 0.5 * (1 - (p.z + 1) / 2)), rd = hl > 0.01 && voor ? _mixHex('#B8C4D6', C.goud, hl) : _mixHex(vul, '#FFFFFF', 0.3);
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.atan2(p.y - y, (p.x - x) / sb)); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.36, r * 0.33 * (0.75 + 0.25 * Math.abs(Math.cos(p.ph))), 0, 0, 6.283); shape(ctx, vul, rd, hl > 0.01 && voor ? 3 : 1.5); ctx.restore(); });
  ctx.restore(); }
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1 } = o; if (a <= 0.01) return;
  enzymKluwen(ctx, x, y, r, Object.assign({ col: '#6F86A0', seed: 2 }, o));
  if (rna > 0.01) { ctx.save(); ctx.globalAlpha *= a * rna; ctx.translate(x, y); ctx.rotate(an); const n = 4, st = r * 0.3, x0 = r * 1.0; // primer langs de matrijs, basen naar de matrijs (+x)
    for (let i = 0; i < n; i++) { const py = -i * st; ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, py - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); ctx.restore(); } }
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const vul = '#8392AE', rd = hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl) : '#A4B2CA', k = ease(sluit), kaak = lerp(0.62, 0.36, k);
  // hoefijzer: rug achter, twee kaken die links en rechts van de naad over de streng reiken (actief centrum op +x)
  ctx.beginPath(); bioPad(ctx, [[-r * 0.9, 0], [-r * 0.6, -r * 0.75], [r * 0.2, -r * 0.95], [r * 1.05, -r * kaak - r * 0.25], [r * 1.15, -r * kaak], [r * 0.45, -r * 0.5], [r * 0.3, 0], [r * 0.45, r * 0.5], [r * 1.15, r * kaak], [r * 1.05, r * kaak + r * 0.25], [r * 0.2, r * 0.95], [-r * 0.6, r * 0.75]], true);
  shape(ctx, vul, rd, hl > 0.01 ? 3 : 1.5);
  ctx.strokeStyle = rgba('#B8C4D6', 0.45); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, [[-r * 0.55, -r * 0.4], [-r * 0.15, 0], [-r * 0.55, r * 0.4]], false); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.18, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, r * 1.05, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }
