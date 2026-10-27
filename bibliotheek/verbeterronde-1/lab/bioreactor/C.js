// =====================================================================================
// BIOREACTOR (geroerde fermentatietank), opengewerkt zijaanzicht, op ware maat naast een castpersonage.
// Recept (Cytiva 'Parts of a stirred tank bioreactor'): vat van roestvrij staal (of glas), mantel om de wand voor
//  verwarmen/koelen, roerder op een as met de motor bovenop, keerschotten tegen de wand (geen draaikolk),
//  sparger onderin die luchtbellen geeft (zuurstof), sensoren voor temperatuur, opgeloste zuurstof en pH, poorten
//  voor entmateriaal, voeding, zuur/base, monsters en oogsten. Voor bacteriën (E. coli met het insulinegen,
//  OpenStax Biology 2e § 17.1) een slank vat (hoogte ± 2,5 × diameter, ≈) met twee roerders; ± 70 % gevuld.
//  Hier een proeffabriek-vat van ± 1 m doorsnede en ± 2,5 m hoog (≈). Bacteriën als kleine okerstaafjes in het
//  medium (sterk vergroot, alleen als hint), bellen stijgen en wervelen mee met de roerder.
//  Bekende fouten: tank als open kuip; bellen die naar beneden gaan; roerder zonder keerschotten; bacteriën zo
//  groot als knikkers zonder 'vergroot'.
//  Met o.keten = { x, y, s, fase } komt rechts van de tank de keten erbij (OpenStax Biology 2e § 17.1): een
//  vergrootcirkel op één bacterie (plasmide met het insulinegen binnen het membraan, dun mRNA, ribosoom, eiwitketen die
//  zich opvouwt), daarna oogsten via een zuiveringskolom naar een flesje (fase 0–0,5 maken, 0,5–0,8 oogsten,
//  0,8–1 flesje vult). De vergrootlijnen beginnen op een plek in het medium van de tank.
// x, y = midden van de onderkant (vloer); s = px per cm. o.t (roeren, bellen), o.vul 0..1, o.oogst 0..1 (kraan open,
// medium stroomt weg), o.keten, o.a. Geeft { motor, roerder, sparger, sensor, oogst, medium } terug.
// =====================================================================================
function _bioKeten(ctx, x, y, s, o = {}) { // keten rechts van de tank: zoom op één bacterie, kolom, flesje (lokaal frame als in de ketenversie)
  const { a = 1, fase = 0.3, t = 0 } = o; const maak = clamp(fase / 0.5, 0, 1), oog = clamp((fase - 0.5) / 0.3, 0, 1), fles = clamp((fase - 0.8) / 0.2, 0, 1);
  const P = (px, py) => [x + px * s, y + py * s];
  const ret = { bacterie: P(800, -300), eiwit: P(880, -300), kolom: P(1430, -300), flesje: P(1640, -90) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const staal = '#8C98AA', staalL = '#B8C2D0';
  // --- vergrootcirkel naar de bacterie
  const zx = 800, zy = -300, zr = 250; ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); const vx = ((o.van || [x, y])[0] - x) / s, vy = ((o.van || [x, y])[1] - y) / s; ctx.beginPath(); ctx.moveTo(vx, vy - 12); ctx.lineTo(zx - zr * 0.9, zy - zr * 0.4); ctx.moveTo(vx, vy + 12); ctx.lineTo(zx - zr * 0.9, zy + zr * 0.4); ctx.stroke(); ctx.setLineDash([]);
  circ(ctx, vx, vy, 14, null, C.goud, 3);
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
function bioreactor(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, vul = 0.7, oogst = 0 } = o;
  const R = 50, Hc = 200, poot = 40, yb = -poot - 15, yt = yb - Hc; // cm; bodem iets bol
  const P = (px, py) => [x + px * s, y + py * s];
  const niveau = yb - (Hc * vul) * (1 - 0.6 * clamp(oogst, 0, 1));
  const ret = { motor: P(0, yt - 45), roerder: P(0, yb - 40), sparger: P(0, yb - 8), sensor: P(-R - 18, yb - 70), oogst: P(R * 0.3, -poot + 5), medium: P(R * 0.4, (niveau + yb) / 2) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.6) / s, staal = '#8C98AA', staalL = '#B8C2D0', staalD = '#5F6B7E';
  // poten
  ctx.fillStyle = staalD; for (const px of [-R + 8, R - 8]) ctx.fillRect(px - 3, -poot - 12, 6, poot + 12);
  // mantel (buitenwand) + opengewerkt: binnenkant zichtbaar
  const vat = (rr, ex) => { ctx.beginPath(); ctx.moveTo(-rr, yt - ex); ctx.lineTo(-rr, yb); ctx.quadraticCurveTo(0, yb + 22 + ex, rr, yb); ctx.lineTo(rr, yt - ex); ctx.quadraticCurveTo(0, yt - 22 - ex, -rr, yt - ex); ctx.closePath(); };
  vat(R + 6, 4); shape(ctx, staal, staalL, lw); vat(R + 2, 1); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); // koelwater in de mantel
  vat(R, 0); ctx.fillStyle = '#16202F'; ctx.fill();
  // medium
  ctx.save(); vat(R, 0); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.28); ctx.fillRect(-R, niveau, 2 * R, yb - niveau + 30);
  ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw * 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const px = -R + 2 * R * k / 20; ctx.lineTo(px, niveau + Math.sin(px * 0.3 + t * 3) * 1.2 + (px * px / (R * R)) * 2); } ctx.stroke();
  // bacteriën (vergroot) en bellen
  if (s > 0.8) for (let i = 0; i < 28; i++) { const u = hash(i * 3 + 1), v = hash(i * 3 + 2); const py = lerp(niveau + 6, yb + 5, v), px = (u * 2 - 1) * (R - 6) + Math.sin(t * 1.5 + i) * 3; const an = hash(i) * 6 + t * (0.5 + u); ctx.save(); ctx.translate(px, py); ctx.rotate(an); roundRect(ctx, -1.8, -0.65, 3.6, 1.3, 0.65); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 40; i++) { const u = hash(i * 5 + 7), sp = 18 + 10 * hash(i * 5 + 8); const h = ((t * sp + u * 400) % (yb - niveau)); const py = yb - 8 - h, sw = Math.sin(t * 2 + i) * 4 + (h > 30 && h < 60 ? Math.sin(i) * 10 : 0); const px = (hash(i * 5 + 9) * 2 - 1) * 14 + sw * (h / 40); if (py < niveau) continue; ctx.strokeStyle = rgba('#E8EEF5', 0.7); ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(px, py, 1 + hash(i) * 1.2, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // keerschotten (2 zichtbaar in doorsnede), as met twee Rushton-roerders, sparger-ring
  ctx.fillStyle = staalL; ctx.fillRect(-R + 1, yt + 10, 5, Hc - 10); ctx.fillRect(R - 6, yt + 10, 5, Hc - 10);
  ctx.fillStyle = staalL; ctx.fillRect(-1.5, yt - 30, 3, Hc + 18);
  for (const yy of [yb - 30, yb - 95]) { ctx.fillRect(-17, yy - 1, 34, 2); for (let k = 0; k < 6; k++) { const ph = t * 4 + k * Math.PI / 3, xx = Math.sin(ph) * 15, w = Math.abs(Math.cos(ph)) * 5 + 1; if (Math.cos(ph) < 0) ctx.globalAlpha *= 1; ctx.fillStyle = Math.cos(ph) > 0 ? staalL : staalD; ctx.fillRect(xx - w / 2, yy - 6, w, 12); } }
  ctx.strokeStyle = staalL; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-R + 4, yb - 8); ctx.lineTo(-R + 15, yb - 8); ctx.moveTo(-R + 15, yb - 8); ctx.lineTo(16, yb - 8); ctx.stroke(); // sparger
  // motor + deksel met poorten, sensoren in de wand, oogstkraan
  roundRect(ctx, -18, yt - 62, 36, 36, 5); shape(ctx, '#3A4A66', '#5E7194', lw); ctx.fillStyle = staalD; ctx.fillRect(-6, yt - 30, 12, 12);
  for (const px of [-32, 28]) { ctx.fillStyle = staal; ctx.fillRect(px - 3, yt - 30, 6, 14); }
  for (const [py, kl] of [[yb - 60, C.koraal], [yb - 80, C.teal], [yb - 100, C.groen]]) { ctx.fillStyle = staalD; ctx.fillRect(-R - 22, py - 2, 30, 4); circ(ctx, -R - 24, py, 3.2, kl); }
  ctx.fillStyle = staal; ctx.fillRect(-3, yb + 14, 6, 10); ctx.fillRect(-3, yb + 22, R * 0.35, 5); circ(ctx, R * 0.33, yb + 18, 4, oogst > 0.01 ? C.groen : staalD);
  if (oogst > 0.01) { ctx.fillStyle = rgba(C.oker, 0.6); ctx.fillRect(R * 0.33 - 1.5, yb + 27, 3, 20 * clamp(oogst * 3, 0, 1)); }
  // glanslijn op de buitenwand
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-R - 3, yt + 10); ctx.lineTo(-R - 3, yb - 5); ctx.stroke();
  ctx.restore();
  if (o.keten) { const K = o.keten; _bioKeten(ctx, K.x, K.y, K.s || 1, { fase: K.fase == null ? 0.3 : K.fase, t, van: ret.medium, a }); }
  return ret;
}
