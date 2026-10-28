// =====================================================================================
// ZETMEEL (amylose) als SCHROEF — variant A 'veer met draad' (verbeterronde 2, 28 okt 2026).
// Recept (bronnen in bron.md; LibreTexts 'Some Important Polysaccharides Based on Glucose' 20.7; Pesek &
// Silaghi-Dumitrescu, Molecules 2024 29:641; ChEBI CHEBI:28057):
// - amylose = onvertakte keten van glucose (α-1,4-bindingen) die zich oprolt tot een linksdraaiende schroef
//   met 6 glucose per winding; binnen in de schroef is een holte (daar gaat jodium in: blauwzwart).
// - amylopectine (de andere zetmeelvorm) heeft daarnaast α-1,6-vertakkingen, om de ± 24–30 glucose (niet getekend).
// Tekening: de schroef ligt horizontaal en is iets naar de kijker gedraaid, zodat elke winding een smalle lus
// wordt. Eén doorlopende dunne draad (de keten) loopt door alle glucoseringen; wat achter ligt is dunner,
// kleiner en donkerder, wat voor ligt dikker en lichter en ligt óver de achterkant heen. Zo zie je een veer met
// voor- en achterkant, geen zigzag. Telling: na 6 ringen is de draad weer op dezelfde plek (één winding).
// Linksdraaiend: kijk je langs de as van je af, dan draait de keten tegen de klok in.
// Bekende fouten: rechte rij zeshoeken (= cellulose); golf/zigzag zonder voor- en achterkant; vertakkingen in amylose.
// Aanroep zoals voorheen: zetmeelSpiraal(ctx, x, y, n, r, {a, angle, open, los, t, fill, spreid});
// (x, y) = begin van de as (links), n = aantal glucose, r = straal van één zeshoek. open 0..1 = keten wikkelt af
// tot een losse golvende keten; los 0..1 = bindingen geknipt, losse glucose drijven uit elkaar (spreid = afstand).
// Nieuw: o.kant (0..1, standaard 1.0) = hoeveel je van opzij/schuin kijkt. Geeft de ringposities terug [[x, y], ...].
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = (typeof V !== 'undefined' ? V.kh : '#DCC07F'), spreid = 1, kant = 1.0 } = o;
  const per = 6, R = r * 2.8, dx = r * 1.55, sk = 8; // sk = tussenpunten van de draad per glucose
  const sb = Math.sin(kant), cb = Math.cos(kant);
  const hel = (u) => { const ph = u / per * 6.283 + 0.6; const zz = Math.cos(ph), yy = -Math.sin(ph) * R; // linksdraaiend
    return [u * dx * cb + zz * R * sb, yy, zz]; };
  const lijn = (u) => { const ox = u * r * 2.3, oy = Math.sin(u * 0.8) * r * 0.3; return [ox, oy, 0]; };
  const losP = (i) => { const w = wander(i + 300, t, r * 0.6, 0.5); const ox = i * r * 2.3; return [(ox + i * r * 1.4) * spreid + w.x * 2, Math.sin(i * 0.8) * r * 0.3 + w.y * 2 + (hash(i) - 0.5) * r * 3, 0]; };
  const eo = ease(clamp(open, 0, 1));
  const punt = (u) => { const h = hel(u), l = lijn(u); return [lerp(h[0], l[0], eo), lerp(h[1], l[1], eo), lerp(h[2], 0, eo)]; };
  const pos = []; for (let i = 0; i < n; i++) { let p = punt(i); if (los > 0) { const q = losP(i); p = [lerp(p[0], q[0], los), lerp(p[1], q[1], los), lerp(p[2], 0, los)]; } pos.push(p); }
  const cs = Math.cos(angle), sn = Math.sin(angle); const scherm = pos.map(p => [x + p[0] * cs - p[1] * sn, y + p[0] * sn + p[1] * cs]);
  if (a <= 0.01) return scherm;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const donker = _mixHex(fill, '#1A2740', 0.55), draadV = lighten(fill, 0.3), draadA = _mixHex(fill, '#1A2740', 0.45);
  const lf = 1 - clamp(los / 0.5, 0, 1); // draad verdwijnt bij het knippen
  // tekenlijst: draadstukjes en ringen, gesorteerd van achter naar voor
  const items = [];
  if (lf > 0.01) for (let i = 0; i < n - 1; i++) for (let k = 0; k < sk; k++) { const u0 = i + k / sk, u1 = i + (k + 1) / sk; const p0 = punt(u0), p1 = punt(u1);
    items.push({ z: (p0[2] + p1[2]) / 2 - 0.02, d: [p0, p1] }); }
  pos.forEach((p, i) => items.push({ z: p[2], i }));
  items.sort((A, B) => A.z - B.z);
  for (const it of items) { const d = (it.z + 1) / 2; // 0 = achter, 1 = voor
    if (it.d) { const [p0, p1] = it.d; ctx.save(); ctx.globalAlpha *= lf; ctx.strokeStyle = d > 0.5 ? draadV : draadA; ctx.lineWidth = Math.max(1, r * (0.16 + 0.22 * d)); ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); ctx.restore(); continue; }
    const p = pos[it.i]; const k = 0.62 + 0.2 * d; const col = _mixHex(donker, fill, clamp(d * 1.25, 0, 1));
    hexagon(ctx, p[0], p[1], r * k, col, d > 0.5 ? lighten(fill, 0.4) : lighten(fill, -0.1), Math.max(1, r * 0.09)); }
  ctx.restore(); return scherm;
}
