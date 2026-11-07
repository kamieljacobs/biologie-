// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 25.3 en 17.6): dun licht kapsel om de nier; schors als lichte buitenband
// die tussen de piramides naar binnen loopt (niercolumnen); piramides donkerder met fijne strepen, de basis naar de schors
// en de punt (papil) in een kelkje dat uitkomt in het nierbekken; nierslagader, nierader en urineleider als gebogen vaten
// vanuit de hilus (slagader achter de ader, urineleider eronder naar beneden). Standen: o.urine 0..1 (druppels lopen door
// de urineleider; v2.1: urineleider als buisje met holte en duidelijk gele druppels, nierbekken kleurt mee), o.glowSchors / o.glowMerg (bijnierschors of -merg apart oplichten; o.glow = allebei, zoals v1).
// Geeft ankerpunten terug: bijnier, schors, merg, bekken, urineleider, slagader, ader (+ bijnierSchors, bijnierMerg).
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, glowSchors = glow, glowMerg = glow, urine = 0, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const anker = { bijnier: P(4, -140), bijnierSchors: P(-30, -128), bijnierMerg: P(6, -132), schors: P(-58, -30), merg: P(-20, 40), bekken: P(44, 4), urineleider: P(78, 120), slagader: P(118, -34), ader: P(122, 12) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // vaten en urineleider vanuit de hilus, gebogen (slagader boven/achter, ader ervoor, urineleider naar beneden)
  ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(56, -14); ctx.bezierCurveTo(90, -22, 110, -40, 160, -38); ctx.stroke();
  ctx.strokeStyle = '#4A6CA8'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(56, 10); ctx.bezierCurveTo(92, 14, 118, 2, 162, 8); ctx.stroke();
  const UL = [[52, 26], [72, 46], [82, 90], [76, 150], [72, 200]];
  // urineleider als buisje: lichte wand met donkere holte; bij o.urine lopen gele urinedruppels erdoorheen naar beneden
  ctx.strokeStyle = '#D8C890'; ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke();
  ctx.strokeStyle = '#4A3A30'; ctx.lineWidth = 6; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke();
  if (urine > 0.01) { const D = bioDicht(UL, 10); for (let i = 0; i < 5; i++) { const u = ((t * 0.25 + i / 5) % 1); const [px, py, an] = bioPunt(D, u); ctx.save(); ctx.globalAlpha *= urine * Math.min(1, u * 8, (1 - u) * 8); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 7, 3, 0, 0, 6.283); shape(ctx, '#F2D04A', '#FFF0A0', 1); ctx.restore(); } }
  // nier: schors (lichter) als hele vulling, kapsel als lichte rand
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#B05A48', '#E6B4A2', 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.25); for (let i = 0; i < 70; i++) { const an = hash(i * 3.3) * 6.283, rr = 0.8 + 0.18 * hash(i * 7.7); ctx.beginPath(); ctx.arc(5 + Math.cos(an) * 66 * rr, Math.sin(an) * 106 * rr, 1.6, 0, 6.283); ctx.fill(); } // nierlichaampjes (korrelig)
  // nierbekken met kelkjes, piramides met de punt in een kelkje
  const PEL = [44, 4]; const angs = [-2.3, -2.75, 3.0, 2.55, 2.1, -1.85, 1.7];
  angs.forEach((an, k) => { const bx = 5 + Math.cos(an) * 50, by = Math.sin(an) * 82, ax = lerp(bx, PEL[0], 0.58), ay = lerp(by, PEL[1], 0.58); const nx = -(ay - by), ny = ax - bx, nl = Math.hypot(nx, ny) || 1, bw = 17;
    ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw, by + ny / nl * bw); ctx.quadraticCurveTo(bx - (ax - bx) * 0.15, by - (ay - by) * 0.15, bx - nx / nl * bw, by - ny / nl * bw); ctx.lineTo(ax, ay); ctx.closePath(); shape(ctx, '#7A3428', null);
    ctx.strokeStyle = rgba('#A85A48', 0.7); ctx.lineWidth = 1.2; for (let q = -1; q <= 1; q++) { ctx.beginPath(); ctx.moveTo(bx + nx / nl * bw * q * 0.38, by + ny / nl * bw * q * 0.38); ctx.lineTo(lerp(bx, ax, 0.85), lerp(by, ay, 0.85)); ctx.stroke(); } // strepen (buisjes)
    ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ax + (ax - bx) * 0.05, ay + (ay - by) * 0.05); ctx.lineTo(lerp(ax, PEL[0], 0.75), lerp(ay, PEL[1], 0.75)); ctx.stroke(); }); // kelkje
  ctx.beginPath(); ctx.ellipse(PEL[0], PEL[1], 17, 34, 0, 0, 6.283); ctx.fillStyle = _mixHex('#E8D9A0', '#F2D04A', 0.6 * urine); ctx.fill();
  ctx.restore();
  // bijnier op de bovenpool: schors (geel) buiten, merg (rood-bruin) binnen
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const gS = glowSchors * (0.75 + 0.25 * Math.sin(t * 4)), gM = glowMerg * (0.75 + 0.25 * Math.sin(t * 4 + 1));
  ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, _mixHex('#D9AE48', '#F2D27A', gS), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); shape(ctx, _mixHex('#8A4A3A', '#F08A5A', gM), gM > 0.01 ? rgba(C.goud, gM) : null, 5);
  if (gS > 0.01) { ctx.save(); ctx.globalAlpha *= gS * 0.7; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}
