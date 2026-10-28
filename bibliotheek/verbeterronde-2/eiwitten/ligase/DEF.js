// ---------- LIGASE (verbeterronde 2 eiwitten, 28 okt 2026: kralenketen) ----------
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
// (_ligVorm blijft ongewijzigd in lib_bio.js)
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const k = ease(sluit), col = hl > 0.01 ? _mixHex('#8392AE', C.goud, hl * 0.6) : '#8392AE', V0 = _ligVorm(k);
  ctx.beginPath(); bioPad(ctx, V0.map(([px, py]) => [px * r, py * r]), true);
  { ctx.fillStyle = rgba(_mixHex(col, '#121A26', 0.45), 0.7); ctx.fill(); const V = _lintVorm(V0.map(([px, py]) => [px * 100, py * 100])); // rijen dwars op de opening: elke rij is één stuk, ook de kaken vullen zich
    _kkKluwen(ctx, 0, 0, V.binnen, { bbox: V.bbox, sc: r / 100, r: 7, col, seed: 7, key: 'lig' + Math.round(k * 4) }); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.18, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, r * 1.05, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }
