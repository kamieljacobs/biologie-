// =====================================================================================
// STAMBOOM met standaardsymbolen én castpersonages — elk symbool is een lijstje met het gezicht van het personage.
// Recept (standaardnotatie, Bennett e.a. 2008/2022): vierkant = man, cirkel = vrouw; gevuld = heeft de eigenschap;
// drager = stip (hier: kleine paarse stip rechtsonder in de lijst, zodat het gezicht vrij blijft); partners met een
// horizontale lijn, kinderen via de broer-zuslijn, van oud naar jong links → rechts; generaties op één hoogte.
// Cast-koppeling: gebruik de familie van Noor (personages/ROLLEN.md). Het gezicht staat ín de vorm; 'gevuld' = de
// achtergrond van de lijst is paars én de rand is dik, zodat de notatie leesbaar blijft (ook klein, zonder gezicht).
// Bron: Bennett e.a. 2008/2022 (samenvatting Switzerland Omics); personages/ROLLEN.md.
// Bekende fouten: gezicht zonder vorm (man/vrouw niet meer te zien); gevulde vorm die het gezicht wegdrukt.
// Ontwerp: hoogte ± 600 (generaties y −200, 0, 200), oorsprong = midden. Aanpak B: portretlijstjes (persoon() uit
// lib_cast.js, geknipt in de vorm); onder 40 px valt het gezicht weg en blijft het gewone symbool over.
// o: a, opbouw (0..1), hi (nr), proband (nr), t, personen (zelfde data als A: {nr, id, sekse, ziek, drager, x, gen, ouders})
// =====================================================================================
const STAMBOOM_NOOR = [
  { nr: 1, id: 'ahmed', sekse: 'm', x: -290, gen: 1 }, { nr: 2, id: 'malika', sekse: 'v', x: -170, gen: 1 },
  { nr: 3, id: 'henk', sekse: 'm', x: 150, gen: 1, ziek: 1 }, { nr: 4, id: 'ria', sekse: 'v', x: 270, gen: 1, drager: 1 },
  { nr: 5, id: 'rachid', sekse: 'm', x: -120, gen: 2, ouders: [1, 2], drager: 1 }, { nr: 6, id: 'linda', sekse: 'v', x: 80, gen: 2, ouders: [3, 4], drager: 1 },
  { nr: 7, id: 'petra', sekse: 'v', x: 270, gen: 2, ouders: [3, 4], ziek: 1 },
  { nr: 8, id: 'noor', sekse: 'v', x: -100, gen: 3, ouders: [5, 6] }, { nr: 9, id: 'kind', sekse: 'm', x: 60, gen: 3, ouders: [5, 6], ziek: 1 }];
function stamboomSymbolen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, opbouw = 1, hi = null, proband = null, t = 0, personen = STAMBOOM_NOOR } = o;
  const R = 40, GY = g => -200 + (g - 1) * 200;
  const P = {}; personen.forEach(p => P[p.nr] = p);
  const anker = {}; personen.forEach(p => anker[p.nr] = [x + p.x * s, y + GY(p.gen) * s]); anker.naam = nr => [x + P[nr].x * s, y + (GY(P[nr].gen) + R + 30) * s];
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const zicht = g => clamp((opbouw * 3 - (g - 1)) / 0.6, 0, 1);
  const VUL = C.paars, gezicht = R * s * (ctx.getTransform ? Math.abs(ctx.getTransform().a) / Math.max(1e-6, s) : 1) >= 20; // klein → alleen symbool
  const dimP = nr => (hi != null && hi !== nr) ? 0.4 : 1;
  const paren = {}; personen.forEach(p => { if (p.ouders) paren[p.ouders.join('-')] = (paren[p.ouders.join('-')] || []).concat(p); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 3.5;
  for (const k in paren) { const [m, v] = k.split('-').map(Number); const A = P[m], B = P[v]; const kids = paren[k].sort((p, q) => p.x - q.x); const yP = GY(A.gen), mx = (A.x + B.x) / 2, yS = GY(A.gen + 1) - R - 30;
    const zp = zicht(A.gen), zk = ease(zicht(A.gen + 1));
    ctx.save(); ctx.globalAlpha *= zp; ctx.beginPath(); ctx.moveTo(Math.min(A.x, B.x) + R, yP); ctx.lineTo(Math.max(A.x, B.x) - R, yP); ctx.stroke(); ctx.restore();
    if (zk > 0.01) { ctx.save(); ctx.globalAlpha *= zk; ctx.beginPath(); ctx.moveTo(mx, yP); ctx.lineTo(mx, yS); ctx.moveTo(Math.min(mx, kids[0].x), yS); ctx.lineTo(Math.max(mx, kids[kids.length - 1].x), yS); kids.forEach(c => { ctx.moveTo(c.x, yS); ctx.lineTo(c.x, GY(c.gen) - R); }); ctx.stroke(); ctx.restore(); } }
  personen.forEach(p => { const z = zicht(p.gen); if (z <= 0.01) return; const cx = p.x, cy = GY(p.gen) + (1 - ease(z)) * 20; ctx.save(); ctx.globalAlpha *= z * dimP(p.nr);
    const vorm = () => { ctx.beginPath(); if (p.sekse === 'm') { ctx.roundRect ? ctx.roundRect(cx - R, cy - R, 2 * R, 2 * R, 4) : ctx.rect(cx - R, cy - R, 2 * R, 2 * R); } else ctx.arc(cx, cy, R, 0, 6.283); };
    vorm(); ctx.fillStyle = p.ziek ? VUL : '#243450'; ctx.fill();
    if (gezicht && p.id && typeof persoon === 'function' && CAST[p.id]) { ctx.save(); vorm(); ctx.clip(); const h = (p.id === 'kind' ? 190 : 270); persoon(ctx, p.id, cx, cy + h * (p.id === 'kind' ? 0.8 : 0.83), h, { t, uit: 'blij' }); ctx.restore(); }
    vorm(); ctx.strokeStyle = p.ziek ? lighten(VUL, 0.4) : C.text; ctx.lineWidth = p.ziek ? 7 : 3; ctx.stroke();
    if (p.drager && !p.ziek) { ctx.beginPath(); ctx.arc(cx + R * 0.68, cy + R * 0.68, R * 0.24, 0, 6.283); ctx.fillStyle = VUL; ctx.fill(); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.stroke(); }
    if (hi === p.nr) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, R * 1.55, 0, 6.283); ctx.stroke(); }
    if (proband === p.nr) { ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(cx - R * 2.3, cy + R * 1.8); ctx.lineTo(cx - R * 1.15, cy + R * 0.85); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - R * 1.0, cy + R * 0.72); ctx.lineTo(cx - R * 1.5, cy + R * 0.9); ctx.lineTo(cx - R * 1.25, cy + R * 1.3); ctx.closePath(); ctx.fill(); }
    ctx.restore(); });
  ctx.restore(); return anker;
}
