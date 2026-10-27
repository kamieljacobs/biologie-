// =====================================================================================
// MICROPIPET in de hand (duim op de knop, vingers om de greep, haak over de wijsvinger), schuin, met drie vlakke
// tinten voor volume; de punt hangt in een buisje of een putje van de gel (o.in).
// Recept: handleiding Eppendorf Research plus (SOP): opzuigen = knop tot de eerste stop, punt ± 4 mm in de
//  vloeistof, langzaam terug; afgeven = eerste stop, wachten, dan tweede stop (uitblazen). In een gelputje laat je
//  de punt net onder het bufferoppervlak boven het putje hangen, zonder de bodem te raken: het monster is
//  zwaarder (laadbuffer met glycerol) en zakt in het putje. Afwerpknop naast de bedieningsknop.
//  Maten (≈, productfoto's en antropometrie): pipet ± 27 cm met punt, greep ± 28 mm dik — past in een hand van
//  ± 19 cm (de hand omsluit ± 9 cm van de greep); 1000 µl-punt ± 71 mm. Bedieningsknop blauw (1000 µl).
//  Bekende fouten: duim naast in plaats van op de knop; hand groter of kleiner dan de pipet zou toelaten;
//  punt tot op de bodem van het putje (prikt door de gel).
// x, y = uiteinde van de punt; s = px per mm. o.knop 0..2, o.vol (µl in de punt), o.rot (standaard 0,25 rad
// = licht schuin), o.hand (bool, standaard aan), o.id (castpersonage voor de huidskleur), o.in ('buisje' | 'gel' |
// null), o.a. Geeft { punt, knop, greep, duim } terug.
// =====================================================================================
function micropipet(ctx, x, y, s, o = {}) {
  const { a = 1, knop = 0, vol = 0, rot = 0.25, hand = true, id = 'yasmin', kleur = C.teal } = o; const plek = o.in || null;
  const k = clamp(knop, 0, 2), slag = k <= 1 ? k * 6 : 6 + (k - 1) * 3;
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [x + (px * co - py * si) * s, y + (px * si + py * co) * s];
  const ret = { punt: [x, y], knop: P(0, -272 + slag), greep: P(0, -205), duim: P(0, -282 + slag) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // omgeving: buisje (zijaanzicht) of gelputje in doorsnede, in beeldcoördinaten
  if (plek === 'buisje') { ctx.save(); ctx.translate(x, y + 6 * s); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-5.5, -38); ctx.lineTo(-5.2, -12); ctx.quadraticCurveTo(0, 2, 5.2, -12); ctx.lineTo(5.5, -38); ctx.strokeStyle = C.er; ctx.lineWidth = 0.6; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5.3, -16); ctx.lineTo(-5.2, -12); ctx.quadraticCurveTo(0, 2, 5.2, -12); ctx.lineTo(5.3, -16); ctx.closePath(); ctx.fillStyle = rgba(kleur, 0.4); ctx.fill(); ctx.restore(); }
  if (plek === 'gel') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = rgba(C.teal, 0.2); ctx.fillRect(-40, -3, 80, 3); ctx.fillStyle = rgba('#E8E4D8', 0.3); ctx.fillRect(-40, 0, 80, 6);
    ctx.fillStyle = '#121A26'; ctx.fillRect(-2.5, 0.5, 5, 3.5); if (k >= 1) { ctx.fillStyle = rgba(C.paars, 0.7 * Math.min(1, k)); ctx.fillRect(-2.3, 1.5, 4.6, 2.5); } ctx.restore(); }
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const band = (x0, x1, y0, y1, cols) => { const n = cols.length; cols.forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); const u0 = i / n, u1 = (i + 1) / n; ctx.moveTo(lerp(x0[0], x0[1], u0), y0); ctx.lineTo(lerp(x0[0], x0[1], u1) + 0.05, y0); ctx.lineTo(lerp(x1[0], x1[1], u1) + 0.05, y1); ctx.lineTo(lerp(x1[0], x1[1], u0), y1); ctx.closePath(); ctx.fill(); }); };
  const grijs = ['#DCE3EB', '#B9C4D2', '#B9C4D2', '#8C99AB'], wit = ['#F0F2F5', '#D5DBE3', '#D5DBE3', '#AEB8C6'];
  // punt (doorschijnend) + vloeistof
  ctx.beginPath(); ctx.moveTo(-0.45, 0); ctx.lineTo(-3.6, -64); ctx.lineTo(-4.2, -71); ctx.lineTo(4.2, -71); ctx.lineTo(3.6, -64); ctx.lineTo(0.45, 0); ctx.closePath(); ctx.fillStyle = rgba('#E8EEF5', 0.18); ctx.fill(); ctx.strokeStyle = rgba('#E8EEF5', 0.55); ctx.lineWidth = 0.4; ctx.stroke();
  if (vol > 0) { let v = 0, h = 0; for (; h < 70; h += 0.1) { const r = 0.3 + 0.045 * h; v += Math.PI * r * r * 0.1; if (v >= vol) break; } ctx.beginPath(); ctx.moveTo(-0.3, 0); ctx.lineTo(-(0.3 + 0.045 * h), -h); ctx.lineTo(0.3 + 0.045 * h, -h); ctx.lineTo(0.3, 0); ctx.closePath(); ctx.fillStyle = rgba(kleur, 0.75); ctx.fill(); }
  band([-3.4, 3.4], [-4.6, 4.6], -66, -100, grijs.map((c, i) => i ? c : c)); band([-6, 6], [-6.5, 6.5], -96, -128, wit); band([-6.5, 6.5], [-9, 9], -128, -165, grijs);
  band([-12, 12], [-14, 14], -165, -252, ['#E6EAF0', '#C9D1DC', '#C9D1DC', '#C9D1DC', '#9AA6B8']);
  ctx.fillStyle = '#C9D1DC'; ctx.beginPath(); ctx.moveTo(14, -236); ctx.lineTo(26, -238); ctx.lineTo(27, -232); ctx.lineTo(16, -226); ctx.fill();
  roundRect(ctx, -6, -215, 12, 26, 2); ctx.fillStyle = '#0F1828'; ctx.fill();
  ctx.fillStyle = '#9AA6B8'; ctx.fillRect(-13, -262, 7, 10); ctx.fillStyle = '#8C99AB'; ctx.fillRect(-2.2, -268 + slag, 4.4, 16 - slag);
  band([-8, 8], [-8, 8], -276 + slag, -268 + slag, ['#6B9DD6', '#3E78B8', '#3E78B8', '#2C5C92']);
  // hand: vingers om de greep onder de haak, duim op de knop
  if (hand) { const huid = (typeof CAST !== 'undefined' && CAST[id] && CAST[id].huid) || BIO.huid, sch = _mixHex ? _mixHex(huid, '#3A2418', 0.18) : huid;
    ctx.fillStyle = huid; roundRect(ctx, 6, -240, 46, 92, 22); ctx.fill(); // handpalm (achter de greep, kant van de pink)
    for (let i = 0; i < 4; i++) { const yy = -229 + i * 21; ctx.fillStyle = i % 2 ? sch : huid; roundRect(ctx, -17, yy, 40, 19, 9.5); ctx.fill(); ctx.fillStyle = rgba('#F2D8C6', 0.6); roundRect(ctx, -16, yy + 4, 5, 11, 2.5); ctx.fill(); }
    ctx.fillStyle = huid; ctx.beginPath(); ctx.moveTo(24, -236); ctx.bezierCurveTo(20, -262, 10, -286 + slag, -1, -287 + slag); ctx.lineTo(-6, -281 + slag); ctx.bezierCurveTo(2, -276 + slag, 8, -258, 8, -238); ctx.closePath(); ctx.fill(); // duim
    ctx.fillStyle = rgba('#F2D8C6', 0.7); ctx.beginPath(); ctx.ellipse(-2, -284 + slag, 4, 2, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); return ret;
}
