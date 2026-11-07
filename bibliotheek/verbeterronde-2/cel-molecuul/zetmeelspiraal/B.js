// =====================================================================================
// ZETMEEL (amylose) als SCHROEF — variant B 'schroefband' (verbeterronde 2, 28 okt 2026).
// Recept (bronnen in bron.md; LibreTexts 'Some Important Polysaccharides Based on Glucose' 20.7; Pesek &
// Silaghi-Dumitrescu, Molecules 2024 29:641; ChEBI CHEBI:28057):
// - amylose = onvertakte keten van glucose (α-1,4-bindingen) die zich oprolt tot een linksdraaiende schroef
//   met 6 glucose per winding; binnen in de schroef is een holte (daar gaat jodium in: blauwzwart).
// - amylopectine (de andere zetmeelvorm) heeft daarnaast α-1,6-vertakkingen, om de ± 24–30 glucose (niet getekend).
// Tekening: de keten is een brede band die als een kurkentrekker om een denkbeeldige as loopt (zoals fusilli).
// De voorkant van de band is licht en draagt de glucoseringen; de achterkant is donker (je kijkt tegen de
// binnenkant) en de ringen daar zijn alleen als donkere silhouetten te zien. Waar de band naar voren komt,
// ligt hij óver de achterkant: zo leest het meteen als schroef met voor- en achterkant. 6 ringen = 1 winding.
// Bekende fouten: rechte rij zeshoeken (= cellulose); golf/zigzag zonder voor- en achterkant; vertakkingen in amylose.
// Aanroep zoals voorheen: zetmeelSpiraal(ctx, x, y, n, r, {a, angle, open, los, t, fill, spreid});
// (x, y) = begin van de as (links), n = aantal glucose, r = straal van één zeshoek. open 0..1 = keten wikkelt af
// tot een losse golvende keten (de band wordt een dunne draad); los 0..1 = bindingen geknipt, losse glucose
// drijven uit elkaar (spreid = afstand). Nieuw: o.kant (standaard 0.85) = hoe schuin je langs de as kijkt.
// Geeft de ringposities terug [[x, y], ...].
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = (typeof V !== 'undefined' ? V.kh : '#DCC07F'), spreid = 1, kant = 0.85 } = o;
  const per = 6, R = r * 2.6, dx = r * 1.6, sk = 10;
  const sb = Math.sin(kant), cb = Math.cos(kant);
  const eo = ease(clamp(open, 0, 1));
  const hel = (u) => { const ph = u / per * 6.283 + 0.6; const zz = Math.cos(ph); return [u * dx * cb + zz * R * sb, -Math.sin(ph) * R, zz]; };
  const lijn = (u) => [u * r * 2.3, Math.sin(u * 0.8) * r * 0.3, 0];
  const punt = (u) => { const h = hel(u), l = lijn(u); return [lerp(h[0], l[0], eo), lerp(h[1], l[1], eo), lerp(h[2], 0, eo)]; };
  const losP = (i) => { const w = wander(i + 300, t, r * 0.6, 0.5); return [(i * r * 2.3 + i * r * 1.4) * spreid + w.x * 2, Math.sin(i * 0.8) * r * 0.3 + w.y * 2 + (hash(i) - 0.5) * r * 3, 0]; };
  const pos = []; for (let i = 0; i < n; i++) { let p = punt(i); if (los > 0) { const q = losP(i); p = [lerp(p[0], q[0], los), lerp(p[1], q[1], los), lerp(p[2], 0, los)]; } pos.push(p); }
  const cs = Math.cos(angle), sn = Math.sin(angle); const scherm = pos.map(p => [x + p[0] * cs - p[1] * sn, y + p[0] * sn + p[1] * cs]);
  if (a <= 0.01) return scherm;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const bg = '#1A2740', voor = _mixHex(fill, bg, 0.3), achter = _mixHex(fill, bg, 0.68), rand = _mixHex(fill, '#FFFFFF', 0.45);
  const bw = r * 0.95 * (1 - eo * 0.85); // halve bandbreedte langs de as (op het scherm); bij afwikkelen een draad
  const lf = 1 - clamp(los / 0.5, 0, 1);
  const items = [];
  if (lf > 0.01) for (let i = -0.5; i < n - 0.5; i += 1 / sk) { const u0 = Math.max(0, i), u1 = Math.min(n - 1, i + 1 / sk); if (u1 <= u0) continue; const p0 = punt(u0), p1 = punt(u1);
    items.push({ z: (p0[2] + p1[2]) / 2 - 0.03, q: [p0, p1] }); }
  pos.forEach((p, i) => items.push({ z: p[2], i, ring: 1 }));
  // volgorde: achterkant (band + ringen), dan voorkant van de band, dan de ringen op de voorkant
  const laag = (it) => it.z < 0 ? 0 : (it.ring ? 2 : 1);
  items.sort((A, B) => laag(A) - laag(B) || (A.z + (A.ring ? 0.2 : 0)) - (B.z + (B.ring ? 0.2 : 0)));
  for (const it of items) { const d = (it.z + 1) / 2;
    if (it.q) { const [p0, p1] = it.q; const col = _mixHex(achter, voor, clamp((it.z + 0.25) * 1.6, 0, 1)); ctx.save(); ctx.globalAlpha *= lf;
      ctx.beginPath(); ctx.moveTo(p0[0] - bw, p0[1]); ctx.lineTo(p1[0] - bw, p1[1]); ctx.lineTo(p1[0] + bw, p1[1]); ctx.lineTo(p0[0] + bw, p0[1]); ctx.closePath();
      ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.stroke(); // naadloos
      // randlijnen van de band (alleen voorkant licht)
      ctx.strokeStyle = it.z > 0 ? rgba(rand, 0.7) : rgba(achter, 0.0); ctx.lineWidth = Math.max(0.8, r * 0.07); ctx.beginPath(); ctx.moveTo(p0[0] - bw, p0[1]); ctx.lineTo(p1[0] - bw, p1[1]); ctx.moveTo(p0[0] + bw, p0[1]); ctx.lineTo(p1[0] + bw, p1[1]); ctx.stroke();
      ctx.restore(); continue; }
    const p = pos[it.i]; const vrij = Math.max(eo, los); const zicht = Math.max(vrij, clamp((p[2] + 0.15) * 2.5, 0, 1)); // achterkant: silhouet
    const col = _mixHex(_mixHex(fill, bg, 0.45), fill, zicht);
    hexagon(ctx, p[0], p[1], r * (0.72 + 0.12 * d), col, zicht > 0.5 ? rand : _mixHex(fill, bg, 0.3), Math.max(1, r * 0.08)); }
  ctx.restore(); return scherm;
}
