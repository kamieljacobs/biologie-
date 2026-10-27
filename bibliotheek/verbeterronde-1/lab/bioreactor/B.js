// =====================================================================================
// BIOREACTOR als productieketen in drie panelen: tank → ingezoomd op één bacterie die insuline maakt → oogsten
// en zuiveren tot een flesje insuline. Voor 'bacteriën als fabriek'.
// Recept: OpenStax Biology 2e § 17.1: sinds 1978 maakt E. coli met recombinant DNA menselijke insuline (vroeger uit
//  alvleesklieren van varkens en koeien). Tank: geroerd vat met keerschotten, sparger (luchtbellen), mantel
//  (Cytiva 'Parts of a stirred tank bioreactor'). In de bacterie: plasmide met het insulinegen (goud) binnen het
//  membraan; een ribosoom maakt een eiwitketen die zich opvouwt (51 aminozuren = A- + B-keten van insuline;
//  vereenvoudigd: in werkelijkheid eerst pro-insuline die later wordt geknipt). Oogsten: medium uit de tank,
//  cellen openbreken, zuiveren over een kolom, flesje.
//  Kleuren: medium en bacteriën oker, gen goud, eiwit in de eiwittint (bead), product teal.
//  Bekende fouten: insuline als bolletje; plasmide buiten de cel; product dat 'vanzelf' uit de tank komt.
// x, y = linksonder van de keten; s = schaal (1 ≈ 1800 × 600 px). o.fase 0..1 (0–0,5 maken, 0,5–0,8 oogsten,
// 0,8–1 flesje vult), o.t, o.a. Geeft { tank, bacterie, eiwit, kolom, flesje } terug.
// =====================================================================================
function bioreactor(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0.3, t = 0 } = o; const maak = clamp(fase / 0.5, 0, 1), oog = clamp((fase - 0.5) / 0.3, 0, 1), fles = clamp((fase - 0.8) / 0.2, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { tank: P(160, -260), bacterie: P(800, -300), eiwit: P(880, -300), kolom: P(1430, -300), flesje: P(1640, -90) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const staal = '#8C98AA', staalL = '#B8C2D0';
  // --- paneel 1: tank
  const vat = () => { ctx.beginPath(); ctx.moveTo(80, -500); ctx.lineTo(80, -90); ctx.quadraticCurveTo(160, -40, 240, -90); ctx.lineTo(240, -500); ctx.quadraticCurveTo(160, -540, 80, -500); ctx.closePath(); };
  vat(); shape(ctx, '#16202F', staal, 6); ctx.save(); vat(); ctx.clip(); const niv = lerp(-400, -150, oog); ctx.fillStyle = rgba(C.oker, 0.3); ctx.fillRect(80, niv, 160, 500);
  for (let i = 0; i < 18; i++) { const h = (t * 40 + hash(i) * 400) % 300; const py = -100 - h; if (py > niv) { ctx.strokeStyle = rgba('#E8EEF5', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(140 + hash(i + 3) * 40, py, 3, 0, 6.283); ctx.stroke(); } }
  ctx.restore(); ctx.fillStyle = staalL; ctx.fillRect(157, -540, 6, 430); for (const yy of [-150, -290]) { ctx.fillRect(130, yy - 10, 60, 20); }
  roundRect(ctx, 135, -590, 50, 45, 6); shape(ctx, '#3A4A66', '#5E7194', 2);
  ctx.fillStyle = staal; ctx.fillRect(157, -75, 6, 30); ctx.fillRect(157, -50, 120, 8); // oogstleiding
  // --- vergrootcirkel naar de bacterie
  const zx = 800, zy = -300, zr = 250; ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(205, -260); ctx.lineTo(zx - zr * 0.9, zy - zr * 0.4); ctx.moveTo(205, -230); ctx.lineTo(zx - zr * 0.9, zy + zr * 0.4); ctx.stroke(); ctx.setLineDash([]);
  circ(ctx, 200, -245, 14, null, C.goud, 3);
  ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); shape(ctx, '#121A26', C.goud, 3); ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr - 2, 0, 6.283); ctx.clip();
  ctx.fillStyle = rgba(C.oker, 0.15); ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
  // bacterie (staaf) met wand en membraan
  const bw = 400, bh = 190; roundRect(ctx, zx - bw / 2 - 8, zy - bh / 2 - 8, bw + 16, bh + 16, (bh + 16) / 2); shape(ctx, rgba(C.oker, 0.3), C.oker, 3);
  roundRect(ctx, zx - bw / 2, zy - bh / 2, bw, bh, bh / 2); shape(ctx, '#22314D', rgba('#D8C9A8', 0.8), 2);
  ctx.save(); roundRect(ctx, zx - bw / 2 + 3, zy - bh / 2 + 3, bw - 6, bh - 6, bh / 2 - 3); ctx.clip();
  // plasmide met insulinegen (binnen het membraan)
  const px0 = zx - 120, py0 = zy - 10; ctx.strokeStyle = D2.oud; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(px0, py0, 40, 0, 6.283); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.arc(px0, py0, 40, -1.2, -0.2); ctx.stroke();
  // mRNA (dun, slierterig) naar het ribosoom en eiwitketen die groeit en vouwt
  ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const u = k / 30; ctx.lineTo(px0 + 38 + u * 90, py0 - 20 + Math.sin(u * 9 + t) * 8 + u * 40); } ctx.stroke();
  const rx = px0 + 130, ry = py0 + 22; ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(rx, ry - 8, 16, 11, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(rx + 2, ry + 9, 20, 13, 0, 0, 6.283); ctx.fill();
  const n = Math.max(3, Math.round(51 * clamp(maak / 0.6, 0, 1))), kinds = Array.from({ length: 51 }, (_, i) => (i * 7) % 20);
  if (maak < 0.6) { const pts = []; for (let i = 0; i < n; i++) pts.push([rx + 22 + i * 4.2, ry - 20 + Math.sin(i * 0.5 + t) * 6 - i * 0.6]); ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); pts.forEach((p, i) => bead(ctx, p[0], p[1], 3.6, kinds[i])); }
  else eiwitVouw(ctx, zx + 110, zy - 10, 0.36, clamp((maak - 0.6) / 0.4, 0, 1), kinds, { start: Array.from({ length: 51 }, (_, i) => [(i - 25) * 4.2 / 0.36 * 0.36 - 0, Math.sin(i * 0.5) * 6]) });
  ctx.restore(); ctx.restore();
  // --- paneel 3: oogsten → kolom → flesje
  const pijl = (x0, x1, yy) => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.lineTo(x1 - 14, yy - 9); ctx.moveTo(x1, yy); ctx.lineTo(x1 - 14, yy + 9); ctx.stroke(); };
  pijl(1080, 1330, -300);
  roundRect(ctx, 1395, -470, 70, 300, 10); shape(ctx, rgba(C.er, 0.10), C.er, 3); // zuiveringskolom
  ctx.save(); roundRect(ctx, 1398, -467, 64, 294, 8); ctx.clip(); for (let i = 0; i < 26; i++) for (let j = 0; j < 5; j++) circ(ctx, 1404 + j * 13 + (i % 2) * 6, -460 + i * 11.5, 5, rgba(C.er, 0.25)); if (oog > 0) { ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(1398, -467, 64, 294 * oog); } ctx.restore();
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1430, -170); ctx.lineTo(1430, -140); ctx.quadraticCurveTo(1430, -120, 1520, -120); ctx.lineTo(1610, -120); ctx.stroke();
  if (fles > 0 && fles < 1) { ctx.fillStyle = rgba(C.teal, 0.8); ctx.beginPath(); ctx.arc(1640, -110 + (t * 60) % 20, 4, 0, 6.283); ctx.fill(); }
  // flesje
  const fx = 1640; roundRect(ctx, fx - 32, -100, 64, 100, 10); shape(ctx, rgba(C.er, 0.12), C.er, 3); ctx.fillStyle = '#7A8BA8'; ctx.fillRect(fx - 16, -118, 32, 18); ctx.fillStyle = C.koraal; ctx.fillRect(fx - 20, -128, 40, 12);
  if (fles > 0) { ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(fx - 28, -4 - 88 * fles, 56, 88 * fles); }
  ctx.restore(); return ret;
}
