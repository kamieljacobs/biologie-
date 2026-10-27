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
// x, y = midden van de onderkant (vloer); s = px per cm. o.t (roeren, bellen), o.vul 0..1, o.oogst 0..1 (kraan open,
// medium stroomt weg), o.a. Geeft { motor, roerder, sparger, sensor, oogst, medium } terug.
// =====================================================================================
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
  ctx.restore(); return ret;
}
