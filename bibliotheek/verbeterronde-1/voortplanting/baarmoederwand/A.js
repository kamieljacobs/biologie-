// =====================================================================================
// BAARMOEDERWAND met slijmvlies (uitsnede, holte boven). Recept: spierlaag (myometrium) 1–2 cm, glad spierweefsel;
// slijmvlies 1 mm na de menstruatie → 5–7 mm (soms tot 10) rond de eisprong en daarna; basale laag blijft, de
// functionele laag erboven groeit en laat los. Klieren: buisjes mét holte (lumen) die openen op het oppervlak, eerst
// recht, later kronkelend (zaagtand); spiraalslagaders lopen kronkelend omhoog. Bij de menstruatie knijpen de
// spiraalslagaders dicht, de functionele laag brokkelt van boven af af met bloed; brokjes en bloed schuiven door
// de holte weg (naar de baarmoederhals, hier naar rechts), de basale laag blijft. Bron: Junqueira h. 22; Guyton h. 82;
// LibreTexts/OpenStax A&P 27.2 (functionele en basale laag, spiraalslagaders). Bekende fouten: slijmvlies als vlak
// blokje; brokken die als ballonnen boven de wand zweven; klieren als lijntjes zonder holte; eicel in het bloed.
// dikte 0..1 (0,15 ≈ 1 mm, 1 ≈ 7 mm), los 0..1 (afstoten).
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sc = Math.min(1, h / 300); const L = Math.max(0.6, sc);
  const spierH = h * 0.42, basaal = h * 0.06, fmax = h * 0.5; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH;
  const golf = (xx, amp, k) => amp * Math.sin(xx / w * 6.283 * k + seed);
  const lf = clamp(los, 0, 1);
  // spierlaag
  roundRect(ctx, x - w / 2, ys, w, spierH, 10 * sc); shape(ctx, rgba(BIO.spier, 0.55), rgba(BIO.spierL, 0.6), 1.5 * L);
  ctx.save(); roundRect(ctx, x - w / 2, ys, w, spierH, 10 * sc); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.5); ctx.lineWidth = 2 * L;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 14; c++) { const cx = x - w / 2 + (c + (r % 2) * 0.5) * w / 13, cy = ys + spierH * 0.07 + r * spierH * 0.86 / 6; ctx.beginPath(); ctx.ellipse(cx, cy, w / 32, 3.2 * L, 0.08 * Math.sin(c + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = rgba(BIO.slijmD, 0.75); ctx.fillRect(x - w / 2, yba, w, basaal);
  // oppervlak: bij afstoten zakt het van boven af in, onregelmatig (brokkelig)
  const NO = 60, opp = []; for (let i = 0; i <= NO; i++) { const xx = x - w / 2 + i / NO * w; const brok = lf > 0 ? (0.5 + 0.5 * hash(seed + Math.floor(i / 4) * 1.7)) * Math.min(1, lf * 1.4) : 0;
    opp.push([xx, lerp(yf + golf(xx, 6 * dikte * sc, 3), yba - 2, clamp(brok * lf * 1.3, 0, 1))]); }
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, yba + 1); opp.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(x + w / 2, yba + 1); ctx.closePath();
  ctx.fillStyle = rgba(BIO.slijm, 0.7); ctx.fill(); ctx.clip();
  // stromacellen (rustige textuur)
  if (sc > 0.45) { ctx.fillStyle = rgba('#8E4A4A', 0.35); for (let i = 0; i < 90; i++) { const px = x - w / 2 + hash(seed + i * 2.1) * w, py = lerp(yba, yf, hash(seed + i * 3.3)); ctx.beginPath(); ctx.ellipse(px, py, 2.2 * L, 1.4 * L, hash(i) * 3, 0, 6.283); ctx.fill(); } }
  // klieren: buisje met holte, opent op het oppervlak
  const nk = 9; for (let k = 0; k < nk; k++) { const kx = x - w / 2 + (k + 0.5) * w / nk; const pts = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24; const yy = lerp(yba + 2, yf - 4, u); const zx = Math.sin(u * 14 + k) * 7 * sc * kronkel * dikte; pts.push([kx + zx, yy]); }
    const bw = Math.max(3, (5 + 3 * kronkel * dikte) * sc);
    ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = bw * 2.2; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); // wand (epitheel)
    ctx.strokeStyle = rgba('#7A3A44', 0.85); ctx.lineWidth = bw * 0.9; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); // holte
    if (kronkel * dikte > 0.5 && sc > 0.5) { ctx.fillStyle = rgba('#F6E2D6', 0.9); for (let i = 3; i < 22; i += 4) { const p = pts[i]; ctx.beginPath(); ctx.arc(p[0], p[1], bw * 0.35, 0, 6.283); ctx.fill(); } } } // slijm/glycogeen
  // spiraalslagaders (knijpen dicht bij afstoten)
  for (let k = 0; k < 5; k++) { const kx = x - w / 2 + (k + 1) * w / 6 + 20 * sc; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - lf * 0.4)); ctx.lineWidth = Math.max(1.5, 3.5 * sc * (1 - lf * 0.5)); ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys + 10 * sc, yf + 10 * sc, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9 * sc; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
  ctx.restore();
  // oppervlakte-epitheel (breekt bij afstoten)
  ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 3 * L; ctx.beginPath(); opp.forEach((p, i) => { const gat = lf > 0.1 && hash(seed + i * 4.1) < lf * 0.8; i && !gat ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }); ctx.stroke();
  // afstoten: bloed op het wondoppervlak + brokjes die tegen de wand door de holte wegschuiven (naar rechts = baarmoederhals)
  if (lf > 0.01) {
    ctx.save(); ctx.fillStyle = rgba(BIO.bloed, 0.75 * Math.min(1, lf * 1.5)); ctx.beginPath(); ctx.moveTo(opp[0][0], opp[0][1]);
    opp.forEach((p, i) => ctx.lineTo(p[0], p[1] - (3 + 7 * hash(seed + i * 9.1)) * sc * Math.min(1, lf * 1.5))); for (let i = NO; i >= 0; i--) ctx.lineTo(opp[i][0], opp[i][1] + 1); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let k = 0; k < 10; k++) { const u0 = hash(seed + k * 5.3); const drift = (lf * (0.5 + 0.5 * hash(k + 21)) * 0.6 + u0) % 1.1; const bx = x - w / 2 + drift * w, i = clamp(Math.round((bx - (x - w / 2)) / w * NO), 0, NO);
      if (bx > x + w / 2 - 10) continue; const by = opp[i][1] - (8 + 14 * hash(k + 3)) * sc; const bw = (14 + 16 * hash(k + 7)) * sc, bh = (6 + 6 * hash(k + 8)) * sc;
      ctx.save(); ctx.globalAlpha *= Math.min(1, lf * 2); ctx.translate(bx, by); ctx.rotate((hash(k) - 0.5) * 0.5); ctx.beginPath();
      bioPad(ctx, [[-bw / 2, 0], [-bw * 0.2, -bh * 0.6], [bw * 0.3, -bh * 0.5], [bw / 2, 0], [bw * 0.1, bh * 0.45], [-bw * 0.35, bh * 0.35]], true); shape(ctx, rgba(BIO.slijm, 0.85), rgba(BIO.bloed, 0.85), 1.2 * L); ctx.restore(); }
    // bloedstroom langs het oppervlak, richting baarmoederhals
    ctx.save(); ctx.strokeStyle = rgba(BIO.bloed, 0.6 * lf); ctx.lineWidth = 4 * L; ctx.setLineDash([18 * L, 12 * L]); ctx.lineDashOffset = -t * 40 * L; ctx.beginPath(); opp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] - 16 * sc) : ctx.moveTo(p[0], p[1] - 16 * sc)); ctx.stroke(); ctx.restore();
  }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}
