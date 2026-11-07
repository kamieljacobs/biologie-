// =====================================================================================
// PCR-BUISJE (0,2 ml, dunwandig, met platte dop aan een scharnierstrip), zijaanzicht, op ware maat.
// Recept (mm; productbladen 0,2 ml-buisjes en het 96-wells raster van 9 mm waarin ze passen):
//  - hoogte buisje ± 20 mm (zonder dop), buitendiameter bovenaan ± 6 mm, kraag ± 7 mm breed en 0,8 mm hoog;
//  - bovenste 6 mm bijna cilindrisch (r 3,0 → 2,9), daaronder een kegel tot een ronde punt van ± 1,4 mm breed;
//  - dop: plat schijfje van 6 mm met een prop die in de opening valt, aan een strip van ± 4 mm (scharnier rechts);
//  - binnenvolume ± 230 µl (dus 0,2 ml + kopruimte); een PCR-mix is meestal 20–50 µl: dan staat de vloeistof alleen
//    in de punt (onderste ± 6–9 mm). Het niveau wordt uitgerekend uit het binnenprofiel (µl = mm³).
//  - polypropyleen is doorschijnend: lijntekening in C.er (#AFC0D0), vloeistof als vlak in een betekeniskleur
//    (standaard teal = water/mix), DNA desgewenst als paarse streepjes (o.dna).
//  Bekende fouten: buisje als reageerbuis met ronde bodem; vloeistof halfvol bij 25 µl; dop los zonder scharnier;
//  buisje even groot als een vinger (een vingertop is ± 15 mm breed: het buisje is smaller dan een vinger).
// x, y = midden van de bovenrand (kraag); s = px per mm. o.open 0 dicht … 1 open (dop klapt naar rechts om),
// o.vol (µl, standaard 25), o.kleur (vloeistof), o.dna (aantal streepjes), o.hl (gouden rand), o.a.
// Geeft { rand, punt, vloeistof, dop } terug (ankerpunten voor namen; zet een naam ± 60 px naast het buisje).
// =====================================================================================
function _pcrProfiel(y) { // binnenstraal (mm) op diepte y onder de rand
  if (y < 0) return 0; if (y <= 6) return lerp(2.65, 2.55, y / 6); if (y <= 19.4) return lerp(2.55, 0.45, (y - 6) / 13.4); return 0;
}
function _pcrNiveau(vol) { // diepte van het vloeistofoppervlak bij vol µl (integratie van onder naar boven)
  let v = 0; for (let y = 19.4; y > 0; y -= 0.05) { const r = _pcrProfiel(y); v += Math.PI * r * r * 0.05; if (v >= vol) return y; } return 0;
}
function pcrBuisje(ctx, x, y, s, o = {}) {
  const { a = 1, open = 0, vol = 25, kleur = C.teal, dna = 0, hl = 0, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const yN = _pcrNiveau(vol);
  const ret = { rand: P(0, 0), punt: P(0, 20), vloeistof: P(0, (yN + 19.4) / 2), dop: P(0, -1.5) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1.2, s * 0.22) / s, lijn = C.er, klein = s < 4;
  const buiten = () => { ctx.beginPath(); ctx.moveTo(-3.0, 0); ctx.lineTo(-2.9, 6); ctx.lineTo(-0.75, 19.3); ctx.quadraticCurveTo(0, 20.4, 0.75, 19.3); ctx.lineTo(2.9, 6); ctx.lineTo(3.0, 0); ctx.closePath(); };
  // lichaam
  buiten(); ctx.fillStyle = rgba(lijn, 0.10); ctx.fill();
  // vloeistof (binnenprofiel, vlak oppervlak met een klein meniscusje)
  if (vol > 0.5) { ctx.save(); ctx.beginPath(); ctx.moveTo(-_pcrProfiel(yN), yN); for (let yy = yN; yy <= 19.4; yy += 0.4) ctx.lineTo(-_pcrProfiel(yy), yy);
    ctx.quadraticCurveTo(0, 20.0, 0.45, 19.4); for (let yy = 19.4; yy >= yN; yy -= 0.4) ctx.lineTo(_pcrProfiel(yy), yy); ctx.closePath();
    ctx.fillStyle = rgba(kleur, 0.42); ctx.fill(); ctx.clip();
    ctx.strokeStyle = lighten(kleur, 0.4); ctx.lineWidth = lw * 1.2; ctx.beginPath(); const rN = _pcrProfiel(yN); ctx.moveTo(-rN, yN - 0.25); ctx.quadraticCurveTo(0, yN + 0.25, rN, yN - 0.25); ctx.stroke();
    if (dna > 0 && !klein) { ctx.strokeStyle = C.paars; ctx.lineWidth = 0.22; for (let i = 0; i < dna; i++) { const u = hash(i * 7 + 3), v = hash(i * 7 + 4); const yy = lerp(yN + 0.6, 18.6, v); const rr = _pcrProfiel(yy) * 0.8; const xx = (u * 2 - 1) * rr, an = hash(i * 7 + 5) * 3.14 + Math.sin(t + i) * 0.2;
      ctx.beginPath(); ctx.moveTo(xx - Math.cos(an) * 0.45, yy - Math.sin(an) * 0.45); ctx.lineTo(xx + Math.cos(an) * 0.45, yy + Math.sin(an) * 0.45); ctx.stroke(); } }
    ctx.restore(); }
  buiten(); ctx.strokeStyle = hl > 0.01 ? C.goud : lijn; ctx.lineWidth = hl > 0.01 ? lw * 1.8 : lw; ctx.stroke();
  if (!klein) { ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.moveTo(-2.2, 1); ctx.lineTo(-2.1, 6); ctx.lineTo(-0.9, 15); ctx.stroke(); } // glans van het plastic
  // kraag
  roundRect(ctx, -3.5, -0.8, 7.0, 0.8, 0.25); shape(ctx, rgba(lijn, 0.22), lijn, lw);
  // scharnierstrip + dop (draait om het scharnier rechts boven de kraag)
  const hx = 3.6, hy = -0.6, th = clamp(open, 0, 1) * Math.PI * 1.04;
  ctx.strokeStyle = lijn; ctx.lineWidth = 0.55; ctx.beginPath(); ctx.moveTo(3.3, -0.4); ctx.quadraticCurveTo(hx + 0.9, hy + 0.2, hx + 0.3, hy - 1.0); ctx.stroke(); // strip
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(th); ctx.translate(-hx, -hy);
  roundRect(ctx, -3.3, -2.2, 6.6, 1.4, 0.35); shape(ctx, rgba(lijn, 0.22), lijn, lw); // dopschijf
  ctx.beginPath(); ctx.rect(-2.55, -0.8, 5.1, 0.95); shape(ctx, rgba(lijn, 0.12), lijn, lw); // prop die in de opening valt
  ctx.restore();
  ctx.restore(); return ret;
}
