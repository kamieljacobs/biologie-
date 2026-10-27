// ZEESCHILDPAD (onechte karetschildpad, Caretta caretta), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig,
// ± 1 m, roodbruin met olijftint; 5 middelste (vertebrale) schilden als zeshoeken op een rij, 5 paar ribschilden (het
// eerste paar raakt het nekschild), rand van kleine schilden; voorvinnen lang en sikkelvormig (± 1/2 van de
// schildlengte) met 1–2 nageltjes, achtervinnen kort en rond; kop groot (karetschildpad heeft een opvallend grote kop)
// met grote kopschubben en een snavelpunt. Legt ± 110–130 ronde eieren (pingpongbal) in een zelf gegraven kuil in het
// zand; de nesttemperatuur bepaalt de sekse (warmer vooral vrouwtjes). Bron: Animal Diversity Web 'Caretta caretta';
// NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met pootjes en een bolle koepel; middenschilden als
// ronde blokjes (leest als ruggengraat). o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A', huidD = '#A8825E';
  const recht = (pts) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  for (const sx of [-1, 1]) {
    ctx.save(); ctx.scale(sx, 1); ctx.translate(60, -40); ctx.rotate(-0.25 + vin * 0.35); // voorvin: lang, sikkelvormig, achterrand dun
    ctx.beginPath(); bioPad(ctx, [[-20, -4], [50, -30], [110, -30], [150, -8], [134, -2], [70, 6], [0, 18]], true); shape(ctx, huid, schub, 2);
    ctx.fillStyle = huidD; for (const [px, py, r] of [[20, -6, 9], [44, -14, 8], [68, -18, 7], [92, -16, 6], [114, -12, 5]]) { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.7, -0.2, 0, 6.283); ctx.fill(); } // schubben op de voorrand
    ctx.fillStyle = '#4A3A2A'; ctx.beginPath(); ctx.moveTo(60, -28); ctx.lineTo(66, -36); ctx.lineTo(70, -27); ctx.fill(); ctx.restore(); // nageltje
    ctx.save(); ctx.scale(sx, 1); ctx.translate(46, 96); ctx.rotate(0.35 - vin * 0.15); ctx.beginPath(); bioPad(ctx, [[-8, -8], [34, 0], [52, 22], [36, 34], [4, 20]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  // kop: groot, met kopschubben (veelhoeken) en snavelpunt
  const KOP = [[-26, -96], [-34, -122], [-26, -150], [-10, -164], [0, -168], [10, -164], [26, -150], [34, -122], [26, -96]]; ctx.beginPath(); bioPad(ctx, KOP, true); shape(ctx, huid, schub, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KOP, true); ctx.clip(); ctx.strokeStyle = schub; ctx.lineWidth = 1.6;
  recht([[0, -160], [12, -148], [8, -132], [-8, -132], [-12, -148]]); ctx.fillStyle = huidD; ctx.fill(); ctx.stroke(); recht([[-8, -132], [8, -132], [12, -116], [0, -108], [-12, -116]]); ctx.stroke(); recht([[12, -148], [26, -140], [24, -120], [12, -116], [8, -132]]); ctx.stroke(); recht([[-12, -148], [-26, -140], [-24, -120], [-12, -116], [-8, -132]]); ctx.stroke(); ctx.restore();
  ctx.fillStyle = '#5A4430'; ctx.beginPath(); ctx.moveTo(-6, -165); ctx.lineTo(0, -172); ctx.lineTo(6, -165); ctx.fill(); // snavelpunt
  _bioCirc(ctx, -20, -140, 4.5, '#2A1C16'); _bioCirc(ctx, 20, -140, 4.5, '#2A1C16');
  // rugschild
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.fillStyle = rgba('#6E7A3A', 0.18); ctx.beginPath(); ctx.ellipse(-30, -10, 50, 90, 0.2, 0, 6.283); ctx.fill(); // olijftint
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-98, -56, -14, 28, 70, 112], vb = [18, 30, 32, 30, 22, 14];
  for (let i = 0; i < 5; i++) { const y0 = vy[i], y1 = vy[i + 1], ym = (y0 + y1) / 2; recht([[-vb[i], y0], [vb[i], y0], [vb[i] + 10, ym], [vb[i + 1], y1], [-vb[i + 1], y1], [-vb[i] - 10, ym]]); ctx.stroke(); } // 5 zeshoekige middenschilden
  for (const sx of [-1, 1]) { const rx = [80, 92, 96, 88, 68, 40]; for (let i = 0; i < 4; i++) { const yy = (vy[i] + vy[i + 1]) / 2 + 21; ctx.beginPath(); ctx.moveTo(sx * (vb[i + 1] + 4), vy[i + 1]); ctx.lineTo(sx * rx[i + 1], yy + 6); ctx.stroke(); } } // 5 paar ribschilden
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); ctx.lineTo(p[0] * 0.86, p[1] * 0.86); } ctx.stroke(); // grens met de randschilden
  ctx.lineWidth = 1.6; for (let k = 0; k < 24; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 24); ctx.beginPath(); ctx.moveTo(p[0] * 0.86, p[1] * 0.86); ctx.lineTo(p[0], p[1]); ctx.stroke(); } // randschilden
  ctx.restore(); ctx.restore();
}
// NEST van de zeeschildpad in doorsnede: zandlaag met de kuil die het vrouwtje graaft (smalle hals, bredere eikamer
// onderin), daarin een stapel ronde witte eieren (pingpongbal, ± 4 cm; in werkelijkheid ± 110–130, hier o.n getekend),
// bovenop teruggeschoven zand. o.temp = 0..1 kleurt de eikamer van koel (teal) naar warm (koraal): warmer → meer
// vrouwtjes (temperatuurafhankelijke geslachtsbepaling, ADW). o.boven = true geeft het oude bovenaanzicht (schaaltje).
// (x, y) = midden van het zandoppervlak boven het nest; s = 1 → eikamer ± 160 px breed.
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.boven) { ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
    for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
    ctx.restore(); return; }
  ctx.translate(x, y); ctx.scale(s, s); const zand = '#B8A27A', zandD = '#9A8460';
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-100, -6, 0, -10); ctx.quadraticCurveTo(100, -6, 200, 0); ctx.lineTo(200, 250); ctx.lineTo(-200, 250); ctx.closePath(); shape(ctx, zand, null); // zandlaag
  ctx.fillStyle = rgba(zandD, 0.5); for (let k = 0; k < 40; k++) { const px = -190 + ((k * 97) % 380), py = 20 + ((k * 61) % 220); ctx.beginPath(); ctx.arc(px, py, 1.6, 0, 6.283); ctx.fill(); } // enkele korrels, rustig
  const KUIL = [[-22, -8], [-26, 60], [-70, 110], [-82, 170], [-50, 210], [0, 220], [50, 210], [82, 170], [70, 110], [26, 60], [22, -8]];
  ctx.beginPath(); bioPad(ctx, KUIL, true); const temp = o.temp; ctx.fillStyle = temp == null ? '#7E6A4C' : (temp > 0.5 ? rgba(C.koraal, 0.25 + 0.4 * (temp - 0.5)) : rgba(C.teal, 0.25 + 0.4 * (0.5 - temp))); ctx.fill();
  ctx.strokeStyle = zandD; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.stroke(); ctx.setLineDash([]); // rand van de gegraven kuil
  ctx.fillStyle = rgba('#C9B48A', 0.9); ctx.beginPath(); bioPad(ctx, [[-22, -8], [-26, 60], [0, 70], [26, 60], [22, -8]], true); ctx.fill(); // hals dichtgeschoven met zand
  const eieren = []; let rij = 0, i = 0; const per = [5, 4, 3, 2, 1]; while (i < n && rij < per.length) { for (let k = 0; k < per[rij] && i < n; k++, i++) eieren.push([(k - (per[rij] - 1) / 2) * 30, 196 - rij * 25]); rij++; }
  for (const [ex, ey] of eieren) { ctx.beginPath(); ctx.arc(ex, ey, 14, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); ctx.beginPath(); ctx.arc(ex - 4, ey - 4, 3, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill(); }
  ctx.restore(); return { eieren: [x, y + 170 * s], zand: [x + 140 * s, y + 40 * s] }; }
