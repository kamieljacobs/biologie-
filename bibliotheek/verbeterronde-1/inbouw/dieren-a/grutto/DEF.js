// =====================================================================================
// [variant C = A + duidelijk tweekleurige, taps toelopende snavel; 28 okt: poten als taps loopbeen onder de staart,
//  tenen net voorbij de staartpunt]
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten in vlucht gestrekt
// onder de staart, alleen de tenen net voorbij de staartpunt (rosse grutto; bij de grutto steken ze ver uit); bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// Kleed (Cornell All About Birds, Bar-tailed Godwit ID): zomer = man kop, hals en hele onderkant donker steenrood (vrouw
// bleek oranje), winter = grijsbruin met witte buik; altijd witte stuit en een fijn gebandeerde staart (géén zwarte
// eindband: die heeft de grutto L. limosa), snavel tweekleurig (roze basis, donkere punt), bovenvleugel vrij egaal.
// o.kleed 'zomer' (standaard) | 'winter'; o.vrouw true = bleker oranje. De verre vleugel steekt boven de rug uit.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const zomer = (o.kleed || 'zomer') === 'zomer'; const rug = '#6E5440', vlek = '#3E2E22';
  const buik = zomer ? (o.vrouw ? '#D99A62' : '#B5553A') : '#E9DCC6', kopK = zomer ? (o.vrouw ? '#C98A58' : '#A44A32') : '#B89A78';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  ctx.save(); ctx.translate(9, -3); vleugel(true); ctx.restore(); // verre vleugel iets naar voren en boven: steekt uit boven de rug
  // poten: in vlucht naar achteren gestrekt onder de staart; bij de rosse grutto steken alleen de tenen net voorbij de
  // staartpunt uit (BirdGuides: 'the feet barely project beyond the tail'; Carolina Bird Club: 'about an inch beyond the tip
  // of the tail'). Taps loopbeen (donkergrijs) met een klein teenpakketje, verre poot iets donkerder en hoger.
  const poot = (dy, kl) => { const P = [[-30, 10 + dy], [-64, 12 + dy], [-95, 10.5 + dy]]; // hiel onder het lijf, loopbeen taps naar achteren
    ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1] - 2.6); ctx.quadraticCurveTo(P[1][0], P[1][1] - 1.8, P[2][0], P[2][1] - 1.2); ctx.lineTo(P[2][0], P[2][1] + 1.2); ctx.quadraticCurveTo(P[1][0], P[1][1] + 1.8, P[0][0], P[0][1] + 2.6); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
    ctx.strokeStyle = kl; ctx.lineWidth = 1.4; for (const [tx, ty] of [[-9, -2.2], [-10, 0.2], [-8.5, 2.4]]) { ctx.beginPath(); ctx.moveTo(P[2][0] + 0.5, P[2][1]); ctx.lineTo(P[2][0] + tx, P[2][1] + ty); ctx.stroke(); } }; // drie tenen
  poot(-2.5, '#2C2A27'); poot(0, '#4A4640');
  // staart
  ctx.beginPath(); ctx.moveTo(-58, -6); ctx.quadraticCurveTo(-74, -9, -90, -6); ctx.quadraticCurveTo(-93, 0, -90, 5); ctx.quadraticCurveTo(-74, 8, -58, 7); ctx.closePath(); shape(ctx, '#EDE6D8', '#8E7A62', 1); // witte stuit + staart
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5E4A38', 0.85); ctx.lineWidth = 1.6; for (let k = 0; k < 6; k++) { const px = -72 - k * 3.6; ctx.beginPath(); ctx.moveTo(px, -9); ctx.lineTo(px - 1, 9); ctx.stroke(); } ctx.restore(); // fijne dwarsbanden
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(zomer ? '#C08A5A' : vlek, 0.75); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, kopK, lighten(kopK, 0.2), 1);
  ctx.strokeStyle = zomer ? '#D8A07A' : '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  // snavel als taps vlak (dik aan de basis, spits en licht opgewipt), roze basishelft en zwarte punthelft (Cornell; Wikipedia: 'pink at the base and black towards the tip')
  const snavel = (u0, u1) => { const P = u => { const x = 82 + 62 * u, y = -5 + 2 * u - 9 * u * u * u; const d = 3.2 * (1 - u) + 0.7; return [x, y, d]; }; ctx.beginPath();
    for (let i = 0; i <= 12; i++) { const [x, y, d] = P(u0 + (u1 - u0) * i / 12); ctx.lineTo(x, y - d / 2); } for (let i = 12; i >= 0; i--) { const [x, y, d] = P(u0 + (u1 - u0) * i / 12); ctx.lineTo(x, y + d / 2); } ctx.closePath(); };
  snavel(0, 0.52); ctx.fillStyle = '#E3A196'; ctx.fill(); snavel(0.5, 1); ctx.fillStyle = '#211D1A'; ctx.fill();
  ctx.strokeStyle = rgba('#5A3A34', 0.6); ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(84, -4.6); ctx.lineTo(140, -9.8); ctx.stroke(); // bekspleet
  vleugel(false);
  ctx.restore();
}
