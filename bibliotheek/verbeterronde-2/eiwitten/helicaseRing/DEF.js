// ---------- HELICASE (helicaseRing; ook de helicase in vork()) (verbeterronde 2 eiwitten, 28 okt 2026: kralenketen) ----------
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
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sb = Math.sin(0.7), L = [];
  for (let k = 0; k < 6; k++) { const ph = k / 6 * 6.283 + fase; L.push({ x: x + Math.sin(ph) * r * 0.78 * sb, y: y + Math.cos(ph) * r * 0.78, z: Math.sin(ph), ph, k }); }
  L.sort((p, q) => p.z - q.z);
  const band = (v) => { ctx.beginPath(); ctx.ellipse(x, y, r * 0.78 * sb, r * 0.78, 0, v ? -Math.PI / 2 : Math.PI / 2, v ? Math.PI / 2 : Math.PI * 1.5); ctx.strokeStyle = v ? '#56667F' : '#323E52'; ctx.lineWidth = r * 0.34; ctx.stroke(); };
  if (laag !== 'voor') { ctx.beginPath(); ctx.ellipse(x, y, r * 0.5 * sb, r * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill(); band(false); }
  if (laag !== 'achter') band(true);
  L.forEach(p => { const voor = p.z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const col = _mixHex('#8E9CB8', '#2A3448', 0.55 * (1 - (p.z + 1) / 2)), cc = hl > 0.01 && voor ? _mixHex(col, C.goud, hl * 0.6) : col;
    const an = Math.atan2(p.y - y, (p.x - x) / sb), rx = r * 0.36, ry = r * 0.3 * (0.75 + 0.25 * Math.abs(Math.cos(p.ph)));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(_mixHex(cc, '#121A26', 0.45), 0.7); ctx.fill();
    const E = _ellips(40, 32); _kkKluwen(ctx, 0, 0, E.binnen, { bbox: E.bbox, sc: rx / 42, r: 7, col: cc, seed: 3 + p.k, key: 'heli' + p.k }); ctx.restore(); });
  ctx.restore(); }
