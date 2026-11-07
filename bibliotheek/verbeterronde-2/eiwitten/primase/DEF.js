// ---------- PRIMASE (verbeterronde 2 eiwitten, 28 okt 2026: kralenketen) ----------
// Zelfde vorm, plaats, grootte en aanroep als variant C (donut met gat, schuin gezette ring, ligase als hoefijzer over de naad);
// alleen de eiwitten zijn nu een kralenketen (_kkKluwen, zie eiwitten/_hulp.js) in plaats van het lintmodel (_grKluwen).
// Recept (OpenStax Biology 2e § 14.4 (Open Oregon): helicase ontwindt het DNA, primase maakt een RNA-primer van ± 5–10
// nucleotiden, ligase maakt de fosfodiësterbinding; Leman & Noguchi 2013: eukaryote helicase = ring van zes Mcm-eiwitten om
// één streng; Pascal e.a. 2004: ligase I omringt het DNA en zet de katalytische kern op de knip):
//  - helicase: zes subeenheden, elk een kleine gevouwen kralenketen, op een ring loodrecht op de streng, 40° schuin gezien;
//    achter de streng donkerder (laag 'achter'), ervoor licht (laag 'voor'); de streng gaat zichtbaar door het gat; fase = draaien.
//  - primase: één gevouwen kralenketen met een kort teal RNA-stukje aan het actieve centrum (goud).
//  - ligase: hoefijzervormige kralenketen die over de naad grijpt; sluit 0 → 1 = kaken dicht en gouden flits op de naad.
// Klein (r < 26–30): dezelfde keten met minder, grotere kralen (geen vlakke vlek meer). Aanroepen gelijk aan v2.
// (_PRIM blijft ongewijzigd in lib_bio.js)
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const col = hl > 0.01 ? _mixHex('#6F86A0', C.goud, hl * 0.6) : '#6F86A0';
  ctx.beginPath(); bioPad(ctx, _PRIM.map(([px, py]) => [px * r / 50, py * r / 50]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(_PRIM); _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 52, r: 7, col, seed: 2, key: 'prim' }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.22, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  if (rna > 0.01) { ctx.globalAlpha *= rna; const n = 4, st = r * 0.3, x0 = r * 1.0; for (let i = 0; i < n; i++) { ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, -i * st - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); }
  ctx.restore(); }
