// Zwanger 1.0 — eigen tekeningen (7 nov 2026). Kandidaten voor bibliotheek/lib_bio.js (recept bij elke functie).
// Hormoonkleuren als Les 2 (HK in tools/docent/voortplanting-2): progesteron paars, LH goud, hCG oker; nieuw in deze film:
// oxytocine roze, prolactine lichtblauw. Navelstreng: kleur volgt zuurstof (slagaders blauw, ader rood).
const ZK = { P: C.paars, LH: C.goud, HCG: '#D08A3A', OXY: '#D98CB3', PRL: '#8EC3E6', bloedM: '#B5574A', bloedK: '#7A6FB0', slijm: '#E7AAB0', spier: '#C98088', vlies: '#CFE6E2' };

// --- compatibel met de oude castfiguren (nodig voor buikKijkje en het kind in vrouwOrganenVoor) ---
function castBuik(id, x, y, h, zw, kijk = 1) { const P = CAST[id], hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45; const rx = hh * (0.5 + 0.48 * zw), ry = hh * (0.5 + 0.5 * zw); return { x: x + (P.krom ? hh * 0.15 : 0) + kijk * hh * 0.12 * zw, y: heupY - hh * 0.5 + ry * 0.3, rx, ry }; }
function castFoetus(c, x, y, s, o = {}) { return zwKind(c, x, y, 288 * s, { a: o.alpha == null ? 1 : o.alpha, rot: o.rot || 0, week: 30 }); }

// ZWKIND — ongeboren kind in de opgerolde houding, zijaanzicht. L = lengte van kruin tot stuit (px).
// Recept: hoofd naar verhouding groot en wordt relatief kleiner (week 10: hoofd ± de helft van de kruin-stuitlengte,
// week 20 ± een derde, week 40 ± een kwart); ogen dicht, kin op de borst, armen en benen opgetrokken; bij week 10
// korte ledematen en doorschijnende huid. Geen fruitvergelijking. Geeft ankers {navel, hoofd, bekken} terug.
// Bronnen voor de verhoudingen: Moore, The Developing Human (fasen 8–38 wk); zie bron/bronnen.md.
function zwKind(c, x, y, L, o = {}) {
  const { a = 1, rot = 0, week = 30, t = 0, beweeg = 0 } = o; const s = L / 288;
  const kop = week <= 12 ? 1.75 : week <= 24 ? 1.22 : 1.0, ledemaat = week <= 12 ? 0.55 : 1;
  const P = (lx, ly) => ({ x: x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y: y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s });
  const hr = 60 * kop, hy = -44 - hr * 0.86; const ret = { navel: P(48, 58), bekken: P(8, 100), hoofd: P(14, hy) }; if (a <= 0.01) return ret;
  const huid = week <= 12 ? '#EFC2B0' : '#E9B79C', schaduw = week <= 12 ? '#DCA390' : '#D69E84', ink = '#7A4A3A';
  c.save(); c.globalAlpha *= a; c.translate(x, y); c.rotate(rot); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  const sw = Math.sin(t * 2.2) * 0.12 * beweeg;
  // verre arm en been
  c.strokeStyle = schaduw; c.lineWidth = 24 * ledemaat; c.beginPath(); c.moveTo(14, -18); c.lineTo(14 + 22 * ledemaat, -18 + 44 * ledemaat); c.lineTo(14 + 32 * ledemaat, -22); c.stroke();
  c.lineWidth = 34 * ledemaat; c.beginPath(); c.moveTo(0, 96); c.lineTo(46 * ledemaat, 96 - 42 * ledemaat); c.lineTo(22 * ledemaat + 10 * sw * 40, 96 + 16 * ledemaat); c.stroke();
  const romp = () => { c.beginPath(); c.moveTo(4, -44); c.bezierCurveTo(-48, -30, -62, 40, -40, 92); c.bezierCurveTo(-28, 122, 14, 132, 30, 112); c.bezierCurveTo(58, 86, 62, 26, 46, -14); c.bezierCurveTo(40, -34, 26, -46, 4, -44); c.closePath(); };
  c.fillStyle = huid; romp(); c.fill(); c.save(); romp(); c.clip(); c.fillStyle = schaduw; c.beginPath(); c.ellipse(-58, 40, 30, 110, 0.1, 0, 6.283); c.fill(); c.restore();
  if (week <= 12) { c.strokeStyle = rgba('#B97A6C', 0.5); c.lineWidth = 3; c.beginPath(); c.moveTo(-30, 0); c.bezierCurveTo(-44, 40, -36, 80, -20, 110); c.stroke(); } // wervelkolom schemert door
  // hoofd
  const hx = 14 + (kop - 1) * 6; c.fillStyle = huid; c.beginPath(); c.arc(hx, hy, hr, 0, 6.283); c.fill();
  c.save(); c.beginPath(); c.arc(hx, hy, hr, 0, 6.283); c.clip(); c.fillStyle = schaduw; c.beginPath(); c.ellipse(hx - hr * 0.9, hy, hr * 0.44, hr * 1.15, 0, 0, 6.283); c.fill(); c.restore();
  const k = hr / 60; c.fillStyle = schaduw; c.beginPath(); c.ellipse(hx - 14 * k, hy + 4 * k, 11 * k, 15 * k, 0, 0, 6.283); c.fill(); // oor
  c.strokeStyle = ink; c.lineWidth = 3.2; c.beginPath(); c.arc(hx + 32 * k, hy - 8 * k, 9 * k, 0.35, 2.75); c.stroke(); // oog dicht
  c.fillStyle = schaduw; c.beginPath(); c.ellipse(hx + 58 * k, hy + 10 * k, 6 * k, 8 * k, 0, 0, 6.283); c.fill(); // neusje
  c.strokeStyle = ink; c.lineWidth = 2.6; c.beginPath(); c.moveTo(hx + 46 * k, hy + 34 * k); c.quadraticCurveTo(hx + 52 * k, hy + 38 * k, hx + 56 * k, hy + 32 * k); c.stroke(); // mondje
  // nabije been en arm
  c.strokeStyle = huid; c.lineWidth = 40 * ledemaat; c.beginPath(); c.moveTo(8, 100); c.lineTo(8 + 54 * ledemaat, 100 - 50 * ledemaat); c.stroke(); c.lineWidth = 32 * ledemaat; c.beginPath(); c.moveTo(8 + 54 * ledemaat, 100 - 50 * ledemaat); c.lineTo(8 + 36 * ledemaat + sw * 30, 100 + 16 * ledemaat); c.stroke();
  c.fillStyle = huid; c.beginPath(); c.ellipse(8 + 48 * ledemaat + sw * 30, 100 + 24 * ledemaat, 22 * ledemaat, 12 * ledemaat, -0.2, 0, 6.283); c.fill();
  c.strokeStyle = huid; c.lineWidth = 24 * ledemaat; c.beginPath(); c.moveTo(22, -14); c.lineTo(22 + 28 * ledemaat, -14 + 44 * ledemaat); c.stroke(); c.lineWidth = 20 * ledemaat; c.beginPath(); c.moveTo(22 + 28 * ledemaat, -14 + 44 * ledemaat); c.lineTo(22 + 40 * ledemaat, -14 - 10 * ledemaat); c.stroke();
  c.fillStyle = huid; c.beginPath(); c.arc(22 + 42 * ledemaat, -14 - 18 * ledemaat, 13 * ledemaat, 0, 6.283); c.fill();
  c.restore(); return ret;
}

// ZWZAK — vruchtzak: twee dunne vruchtvliezen (buitenste en binnenste) met vruchtwater; het kind drijft erin.
// Recept: vliezen dun en doorschijnend tegen de baarmoederwand, vruchtwater helder lichtblauw-groen.
function zwZak(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, kind = 1, week = 20, rot = 0.35, hlV = 0, hlW = 0, schud = 0, beweeg = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const dx = Math.sin(t * 18) * 10 * schud;
  ctx.beginPath(); ctx.arc(x + dx, y, r * 1.06, 0, 6.283); shape(ctx, rgba(ZK.spier, 0.9), '#E3A6AC', 3); // baarmoederwand
  ctx.beginPath(); ctx.arc(x + dx, y, r, 0, 6.283); ctx.fillStyle = rgba('#6E8C92', 1); ctx.fill();
  ctx.beginPath(); ctx.arc(x + dx, y, r, 0, 6.283); ctx.fillStyle = rgba('#CFE6E2', 0.22 + 0.25 * hlW); ctx.fill();
  for (const [rr, w] of [[r, 5], [r * 0.975, 3]]) { ctx.beginPath(); ctx.arc(x + dx, y, rr, 0, 6.283); ctx.strokeStyle = hlV > 0.3 ? rgba(C.goud, 0.6 + 0.4 * hlV) : rgba('#F2F2EE', 0.75); ctx.lineWidth = w; ctx.stroke(); }
  if (hlV > 0.01) { ctx.save(); ctx.shadowColor = rgba(C.goud, hlV); ctx.shadowBlur = 24 * hlV; ctx.beginPath(); ctx.arc(x + dx, y, r, 0, 6.283); ctx.strokeStyle = rgba(C.goud, hlV); ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  const f = zwKind(ctx, x + dx * 0.4, y + r * 0.04, r * 1.05, { a: kind, rot: rot + Math.sin(t * 1.3) * 0.05 * (1 + 3 * beweeg), week, t, beweeg });
  ctx.restore(); return f;
}

// ZWGEBOORTE — baarmoeder aan het eind van de zwangerschap in doorsnede (vooraanzicht, bekken weggelaten), voor
// ontsluiting, uitdrijving en nageboorte. Recept: kind hoofd omlaag tegen de baarmoederhals; hals als korte buis die
// opengaat (0 → 10 cm); vruchtvliezen rond het kind (scheuren meestal tijdens de ontsluiting, vruchtwater loopt weg);
// placenta tegen de bovenwand met navelstreng; na de geboorte trekt de baarmoeder samen en laat de placenta los.
// o: open 0..1 (ontsluiting), wee 0..1 (samentrekking), vlies 0..1 (1 = heel), water 0..1 (vruchtwater aanwezig),
// uit 0..1 (kind zakt door de hals naar buiten), los 0..1 (placenta laat los en zakt), rek 0..1 (rekzintuigen lichten op)
function zwGeboorte(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, open = 0, wee = 0, vlies = 1, water = 1, uit = 0, los = 0, rek = 0, kindA = 1, druk = 0 } = o; if (a <= 0.01) return {};
  const P = (px, py) => [x + px * s, y + py * s];
  const kr = lerp(1, 0.9, wee) * lerp(1, 0.62, ease(clamp(uit * 1.4, 0, 1))); // samentrekken; na de geboorte veel kleiner
  const Rx = 250 * kr, Ry = 330 * kr, cy = -Ry - 60 * lerp(1, 0.7, uit); const halsW = lerp(18, 100, ease(open)); // halve breedte opening
  const ret = { hals: P(0, -40), fundus: P(0, cy - Ry), uterusR: P(Rx, cy), hoofd: P(0, -120) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // spierwand
  const wand = () => { ctx.beginPath(); ctx.moveTo(-halsW - 40, 0); ctx.bezierCurveTo(-halsW - 46, -40, -Rx, cy + Ry * 0.6, -Rx, cy); ctx.bezierCurveTo(-Rx, cy - Ry * 0.75, -Rx * 0.55, cy - Ry, 0, cy - Ry); ctx.bezierCurveTo(Rx * 0.55, cy - Ry, Rx, cy - Ry * 0.75, Rx, cy); ctx.bezierCurveTo(Rx, cy + Ry * 0.6, halsW + 46, -40, halsW + 40, 0); ctx.closePath(); };
  if (wee > 0.01) { ctx.save(); ctx.shadowColor = rgba(C.koraal, 0.9 * wee); ctx.shadowBlur = 50 * wee; wand(); ctx.fillStyle = ZK.spier; ctx.fill(); ctx.restore(); }
  wand(); shape(ctx, ZK.spier, '#E3A6AC', 3);
  ctx.save(); wand(); ctx.clip(); ctx.strokeStyle = rgba('#A9606A', 0.5); ctx.lineWidth = 2; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(0, cy, Rx - 12 * k, Ry - 12 * k, 0, 3.4, 6.0); ctx.stroke(); } ctx.restore();
  // holte
  const wd = lerp(34, 50, wee) + 30 * uit; const hol = () => { ctx.beginPath(); ctx.moveTo(-halsW, 0); ctx.bezierCurveTo(-halsW - 10, -50, -Rx + wd, cy + Ry * 0.55, -Rx + wd, cy); ctx.bezierCurveTo(-Rx + wd, cy - Ry * 0.7, -Rx * 0.5, cy - Ry + wd, 0, cy - Ry + wd); ctx.bezierCurveTo(Rx * 0.5, cy - Ry + wd, Rx - wd, cy - Ry * 0.7, Rx - wd, cy); ctx.bezierCurveTo(Rx - wd, cy + Ry * 0.55, halsW + 10, -50, halsW, 0); ctx.closePath(); };
  hol(); ctx.fillStyle = '#5A3A48'; ctx.fill();
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; hol(); ctx.fillStyle = '#6E8C92'; ctx.fill(); hol(); ctx.fillStyle = rgba('#CFE6E2', 0.22); ctx.fill(); ctx.restore(); }
  // placenta + navelstreng
  ctx.save(); hol(); ctx.clip();
  const pl = ease(clamp(los, 0, 1)), uitP = ease(clamp(los - 1, 0, 0.8) / 0.8); const px = Rx * 0.35 * lerp(1, 0.2, pl), py = lerp(cy - Ry + wd + 40, -60, pl * pl);
  const placenta = (yy, aa) => { if (aa <= 0.01) return; ctx.save(); ctx.globalAlpha *= aa; ctx.translate(px, yy); ctx.rotate(lerp(0.25, 0, pl)); ctx.beginPath(); ctx.ellipse(0, 0, 130 * lerp(1, 0.85, pl), 46, 0, 0, 6.283); shape(ctx, '#A8464E', '#C9666C', 2.5);
    ctx.strokeStyle = rgba('#7A2A36', 0.6); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(0, 30, 50 + k * 16, 3.5, 5.9); ctx.stroke(); } ctx.restore(); };
  if (uitP < 0.01) placenta(py, 1);
  if (kindA < 0.01 && uit > 0.9) bioNavelstreng(ctx, px - 20, py + 30, 0, 20, t, 1 - uitP, 12);
  const kindY = lerp(-170, 300, ease(clamp(uit, 0, 1))) - 30 * druk;
  const kindHier = uit < 0.02; let kindF = null;
  if (kindA > 0.01 && kindHier) { kindF = zwKind(ctx, 6, kindY, 340, { rot: Math.PI + 0.08, week: 40, a: kindA }); bioNavelstreng(ctx, px - 20, py + 30, kindF.navel.x, kindF.navel.y, t, kindA, 12); }
  // vruchtvliezen rond het kind
  if (vlies > 0.01 && uit < 0.2) { ctx.save(); ctx.globalAlpha *= vlies; ctx.strokeStyle = rgba('#F2F2EE', 0.7); ctx.lineWidth = 4; ctx.setLineDash(vlies < 0.99 ? [30, 14] : []); hol(); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (kindA > 0.01 && !kindHier && uit < 0.98) { const ka = kindA * (1 - clamp((uit - 0.7) / 0.25, 0, 1)); const f = zwKind(ctx, 6, kindY, 340, { rot: Math.PI + 0.08, week: 40, a: ka }); bioNavelstreng(ctx, px - 20, py + 30, f.navel.x, f.navel.y, t, ka, 12); }
  if (uitP > 0.01) placenta(lerp(-60, 170, uitP), 1 - clamp((uitP - 0.7) / 0.3, 0, 1));
  // hals: twee lippen
  ctx.fillStyle = '#B86A74'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * (halsW + 20), -10, 22, 30, 0, 0, 6.283); ctx.fill(); }
  if (rek > 0.01) { for (let i = 0; i < 6; i++) { const d = i < 3 ? -1 : 1, yy = -50 + (i % 3) * 22; const g = 0.5 + 0.5 * Math.sin(t * 6 + i); circ(ctx, d * (halsW + 34), yy, 7, rgba(C.goud, rek * (0.6 + 0.4 * g))); } }
  // wegstromend water
  if (water < 0.99 && water > 0.02) { for (let i = 0; i < 18; i++) { const u = (t * 0.7 + i / 18) % 1; circ(ctx, (hash(i) - 0.5) * halsW * 1.4, 10 + u * 160, 5, rgba('#8FB8B4', 0.8 * (1 - u) * (1 - water))); } }
  ctx.restore(); return ret;
}

// ZWHALS — ontsluiting van onderaf gezien: de baarmoederhals als ring die van ± 1 tot 10 cm opengaat, met cm-liniaal.
function zwHals(ctx, x, y, cm, o = {}) { // cm: 0..10; o.px = pixels per cm
  const { a = 1, px = 26 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = Math.max(6, cm * px / 2); circ(ctx, x, y, R + 34, '#B86A74', '#E3A6AC', 3); circ(ctx, x, y, R, '#2A1E28');
  if (cm > 4) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.clip(); circ(ctx, x, y + R * 0.15, R * 0.95, '#E9B79C'); ctx.restore(); } // hoofdje in de opening
  const y0 = y + 10 * px / 2 + 70; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 5 * px, y0); ctx.lineTo(x + 5 * px, y0); ctx.stroke();
  for (let i = 0; i <= 10; i++) { const xx = x - 5 * px + i * px; ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx, y0 - (i % 5 ? 10 : 18)); ctx.stroke(); if (i % 5 === 0) text(ctx, String(i), xx, y0 + 30, fTekst(22, 700), C.text2, 'center'); }
  ctx.fillStyle = rgba(C.goud, 0.8); ctx.fillRect(x - cm * px / 2, y0 - 6, cm * px, 6); text(ctx, 'cm', x + 5 * px + 16, y0 + 8, fTekst(22, 600), C.text2, 'left');
  ctx.restore(); }

// ZWMELKKLIER — schema van een melkkliertje: trosjes melkblaasjes (bekleed met melkmakende cellen) met daaromheen
// spiertjes, afvoerbuisjes naar de tepel. Recept: spiertjes als dunne koraalrode spoelvormige cellen om elk blaasje;
// bij toeschieten knijpen de blaasjes samen en loopt melk door de buisjes naar de tepel.
function zwMelkklier(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, melk = 0.6, knijp = 0, toe = 0, hlSpier = 0, anti = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  const tepel = [250, 0]; const trossen = [[-170, -120], [-200, 40], [-120, 150], [-40, -170]];
  ctx.fillStyle = '#E9C2A8'; ctx.beginPath(); ctx.ellipse(tepel[0] + 20, 0, 34, 46, 0, 0, 6.283); ctx.fill(); // tepel
  trossen.forEach(([tx, ty], i) => {
    const pad = [[tx, ty], [lerp(tx, tepel[0], 0.5), lerp(ty, 0, 0.6)], tepel];
    ctx.strokeStyle = '#E3C7B0'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(...pad[0]); ctx.quadraticCurveTo(...pad[1], ...pad[2]); ctx.stroke();
    ctx.strokeStyle = rgba('#FFFDF5', 0.9); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(...pad[0]); ctx.quadraticCurveTo(...pad[1], ...pad[2]); ctx.stroke();
    if (toe > 0.01) for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4 + i * 0.13) % 1; const q1 = (1 - u) * (1 - u), q2 = 2 * u * (1 - u), q3 = u * u; circ(ctx, q1 * pad[0][0] + q2 * pad[1][0] + q3 * pad[2][0], q1 * pad[0][1] + q2 * pad[1][1] + q3 * pad[2][1], 7, rgba('#FFFFFF', toe)); }
    for (let j = 0; j < 6; j++) { const an = j / 6 * 6.283 + i; const r0 = 30 * lerp(1, 0.8, knijp); const bx = tx + Math.cos(an) * 46, by = ty + Math.sin(an) * 46;
      circ(ctx, bx, by, r0 + 6, '#E8B49A', '#C98A74', 2); circ(ctx, bx, by, r0 - 4, rgba('#FFFDF5', 0.5 + 0.45 * melk));
      ctx.strokeStyle = hlSpier > 0.3 || knijp > 0.3 ? lighten(C.koraal, 0.15) : rgba(C.koraal, 0.85); ctx.lineWidth = 4 + 3 * hlSpier;
      for (let m = 0; m < 3; m++) { const a0 = m * 2.1 + j; ctx.beginPath(); ctx.arc(bx, by, r0 + 9, a0, a0 + 1.1); ctx.stroke(); }
      if (anti > 0.01 && j % 2 === 0) antistof(ctx, bx, by, 9, anti, 0.6 * j); }
  });
  if (toe > 0.01) for (let k = 0; k < 7; k++) { const u = (t * 1.1 + k / 7) % 1; circ(ctx, tepel[0] + 40 + u * 90, (hash(k) - 0.5) * 40 * u, 6, rgba('#FFFFFF', toe * (1 - u))); }
  ctx.restore(); return { tepel: [x + tepel[0] * s, y], tros: [x - 170 * s, y - 120 * s] }; }

// antistof (Y-vorm) en hormoondeeltje
function antistof(ctx, x, y, r, a = 1, an = 0, col = '#9FD6C4') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, r * 0.35); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, r); ctx.lineTo(0, 0); ctx.lineTo(-r * 0.8, -r * 0.9); ctx.moveTo(0, 0); ctx.lineTo(r * 0.8, -r * 0.9); ctx.stroke(); ctx.restore(); }
function hdot(ctx, x, y, col, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(col, 0.9), lighten(col, 0.3), 2); ctx.restore(); }
// deeltjes langs een pad (polylijn), n stuks, snelheid v
function stroomPad(ctx, pts, col, n, t, a = 1, o = {}) { if (a <= 0.01) return; const { r = 10, v = 0.25, vorm = 'dot' } = o; const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const tot = L[L.length - 1]; for (let k = 0; k < n; k++) { const u = ((t * v + k / n) % 1) * tot; let i = 1; while (i < L.length - 1 && L[i] < u) i++; const f = (u - L[i - 1]) / Math.max(1, L[i] - L[i - 1]);
    const px = lerp(pts[i - 1][0], pts[i][0], f), py = lerp(pts[i - 1][1], pts[i][1], f); const fade = Math.min(1, u / 40, (tot - u) / 40);
    if (vorm === 'y') antistof(ctx, px, py, r, a * fade); else if (vorm) molecuul(ctx, px, py, vorm, col, r, a * fade); else hdot(ctx, px, py, col, r, a * fade); } }
// kleine moleculen met een herkenbare vorm: O₂ (twee bolletjes), CO₂ (drie op een rij), glucose (zeshoek), alcohol (klein ketentje), afval/aminozuur (driehoekje)
function molecuul(ctx, x, y, vorm, col, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = r / 10;
  if (vorm === 'o2') { circ(ctx, x - 5 * k, y, 7 * k, col, '#F2F2EE', 1.5); circ(ctx, x + 5 * k, y, 7 * k, col, '#F2F2EE', 1.5); }
  else if (vorm === 'co2') { circ(ctx, x - 10 * k, y, 6 * k, '#E07A5F', null); circ(ctx, x, y, 7 * k, '#5A6478', '#C9CED6', 1.5); circ(ctx, x + 10 * k, y, 6 * k, '#E07A5F', null); }
  else if (vorm === 'glu') { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.52; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(an) * 10 * k, y + Math.sin(an) * 10 * k); } ctx.closePath(); shape(ctx, rgba(col, 0.5), col, 2); }
  else if (vorm === 'alc') { circ(ctx, x - 8 * k, y + 3 * k, 5 * k, col, null); circ(ctx, x, y - 3 * k, 5 * k, col, null); circ(ctx, x + 8 * k, y + 3 * k, 5 * k, '#E07A5F', null); }
  else { ctx.beginPath(); ctx.moveTo(x, y - 9 * k); ctx.lineTo(x + 8 * k, y + 6 * k); ctx.lineTo(x - 8 * k, y + 6 * k); ctx.closePath(); shape(ctx, rgba(col, 0.7), col, 1.5); }
  ctx.restore(); }
function lijnPad(ctx, pts, col, lw = 4, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

// hersenen met hypofyse in een zoomcirkel (hoofd blijft heel: de cirkel staat naast het hoofd)
function hypofyseCirkel(ctx, x, y, r, sx, sy, o = {}) { const { a = 1, hyp = 1, t = 0, caption = 'hersenen · vergroot' } = o; let uit = null;
  zoomCircle(ctx, x, y, r, sx, sy, caption, a, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); uit = breinVoor(ctx, x, y - r * 0.12, r / 95, { hyp, t }); });
  return uit || { hyp: [x, y] }; }

// kalender (cold open)
function kalender(ctx, x, y, w, o = {}) { const { a = 1, vandaag = 18, kring = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = w / 7, h = cw * 5 + 70;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EFE6', '#9AA3B2', 2); ctx.fillStyle = '#C9654B'; roundRect(ctx, x, y, w, 52, 12); ctx.fill(); ctx.fillRect(x, y + 30, w, 22);
  for (let i = 0; i < 35; i++) { const cx = x + (i % 7) * cw + cw / 2, cy = y + 52 + Math.floor(i / 7) * cw + cw / 2 + 8; const d = i - 2; if (d < 1 || d > 30) continue;
    text(ctx, String(d), cx, cy + 9, fTekst(24, 600), '#3A4458', 'center'); if (d === vandaag && kring > 0.01) { ctx.beginPath(); ctx.arc(cx, cy, cw * 0.42 * ease(kring), 0, 6.283); ctx.strokeStyle = '#C9654B'; ctx.lineWidth = 4; ctx.stroke(); } }
  ctx.restore(); }
