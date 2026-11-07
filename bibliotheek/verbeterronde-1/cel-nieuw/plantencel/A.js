// =====================================================================================
// PLANTENCEL (Micro-look), doorsnede. Recept: hoekige cel met afgeronde hoeken (in een weefsel drukken
// cellen tegen elkaar), stevige celwand van cellulose (buitenrand = middenlamel, gedeeld met de buurcel;
// smalle kanaaltjes = plasmodesmata), daarbinnen het celmembraan dat tegen de wand gedrukt ligt. Een grote
// centrale vacuole vult het grootste deel; het cytoplasma is een dunne rand met de bladgroenkorrels
// (± 1/12 van de cellengte, lensvorm, langs de wand), een paar mitochondriën en de kern, die in de rand ligt
// en de vacuole een deukje geeft. Cytoplasmastroming: de korrels schuiven langzaam langs de rand (t).
// Plasmolyse (0..1): de vacuole verliest water, de protoplast laat los van de wand en rondt zich af; tussen
// wand en membraan komt de buitenvloeistof. De wand houdt zijn vorm.
// Bron: OpenStax Biology 2e fig. 4.7 (celwand, bladgroenkorrels, plastiden, centrale vacuole), fig. 4.16
// (bladgroenkorrel); C9 van de prompt (vacuole vult het meeste, cytoplasma als dunne rand).
// Bekende fouten: een rechthoek met kleine vacuole in het midden; kern in het midden van de vacuole;
// bij plasmolyse krimpt de wand mee; korrels die buiten het membraan steken.
// Gebruik: plantencel(ctx, x, y, s, { a, t, plasmolyse = 0..1, nadruk = null | 'wand'|'membraan'|'vacuole'|
//   'kern'|'bladgroen'|'mito'|'cytoplasma', stroom = true }). Ontwerpmaat 640 × 460 bij s = 1.
// Geeft ankerpunten terug: { cel, celwand, celmembraan, vacuole, kern, bladgroenkorrel, cytoplasma,
//   plasmodesma, mito, ruimte }.
// Vereist: chloroplastEcht, mitochondrionEcht, kernEnvelopPorie (zelfde ronde); uit lib.js: C, rgba, lighten,
//   hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
const _PC_HOEK = [[-300, -165], [-70, -212], [240, -196], [312, 4], [262, 208], [-40, 222], [-286, 172], [-322, 2]];
function _pcVorm(hoek, N) { // afgeronde veelhoek (Chaikin), gelijk verdeeld in N punten
  let p = hoek.map(q => q.slice()); for (let it = 0; it < 3; it++) { const n = []; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; const k = it === 0 ? 0.12 : 0.25; n.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k)], [lerp(a[0], b[0], 1 - k), lerp(a[1], b[1], 1 - k)]); } p = n; }
  const cum = [0]; for (let i = 1; i <= p.length; i++) { const a = p[i - 1], b = p[i % p.length]; cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); } const tot = cum[p.length]; const out = [];
  for (let k = 0; k < N; k++) { const d = tot * k / N; let i = 1; while (cum[i] < d) i++; const u = (d - cum[i - 1]) / (cum[i] - cum[i - 1]); const a = p[i - 1], b = p[i % p.length]; out.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u)]); } return out; }
function _pcNormaal(pts) { return pts.map((p, i) => { const a = pts[(i - 1 + pts.length) % pts.length], b = pts[(i + 1) % pts.length]; let nx = b[1] - a[1], ny = -(b[0] - a[0]); const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l; if (nx * p[0] + ny * p[1] < 0) { nx = -nx; ny = -ny; } return [nx, ny]; }); }
function plantencel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, plasmolyse = 0, nadruk = null, stroom = true } = o; const pl = ease(clamp(plasmolyse, 0, 1));
  const N = 200, wand = 15; const buiten = _pcVorm(_PC_HOEK, N), nB = _pcNormaal(buiten);
  const binnen = buiten.map((p, i) => [p[0] - nB[i][0] * wand, p[1] - nB[i][1] * wand]);
  const RXp = 205, RYp = 140, cxp = 10, cyp = 0;
  const proto = binnen.map((p, i) => { const q = [p[0] - nB[i][0] * 1.5, p[1] - nB[i][1] * 1.5]; const th = Math.atan2(q[1] - cyp, q[0] - cxp); const re = 1 / Math.sqrt(Math.cos(th) ** 2 / (RXp * RXp) + Math.sin(th) ** 2 / (RYp * RYp)); return [lerp(q[0], cxp + Math.cos(th) * re, pl), lerp(q[1], cyp + Math.sin(th) * re, pl)]; });
  const nP = _pcNormaal(proto); const iK = Math.round(N * 0.58); // kern in de rand, linksonder
  const rand = (i) => { const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); return 26 + 4 * pl + 62 * Math.exp(-Math.pow(d / 10, 2)); };
  const vac = proto.map((p, i) => [p[0] - nP[i][0] * rand(i), p[1] - nP[i][1] * rand(i)]);
  const kernP = [proto[iK][0] - nP[iK][0] * 46, proto[iK][1] - nP[iK][1] * 46];
  const S = (p) => [x + p[0] * s, y + p[1] * s];
  const nC = 14, chl = []; for (let k = 0; k < nC; k++) { let f = (k + 0.5) / nC + (stroom ? t * 0.006 : 0); f = ((f % 1) + 1) % 1; const i = Math.floor(f * N); const d = Math.min(Math.abs(i - iK), N - Math.abs(i - iK)); if (d < 14) continue;
    const p = proto[i], n = nP[i], tg = Math.atan2(n[0], -n[1]); chl.push([p[0] - n[0] * 14, p[1] - n[1] * 14, tg]); }
  const iM = [Math.round(N * 0.08), Math.round(N * 0.33), Math.round(N * 0.83)].map(i => { const p = proto[i], n = nP[i]; return [p[0] - n[0] * 13, p[1] - n[1] * 13, Math.atan2(n[0], -n[1])]; });
  const PD = [20, 70, 120, 165].map(i => buiten[i]);
  const iR = Math.round(N * 0.23);
  const anker = { cel: S([0, 0]), celwand: S(buiten[Math.round(N * 0.12)]), celmembraan: S(proto[Math.round(N * 0.95)]), vacuole: S([40, -10]), kern: S(kernP), bladgroenkorrel: S(chl[2] || [0, 0]), cytoplasma: S([(proto[iR][0] + vac[iR][0]) / 2, (proto[iR][1] + vac[iR][1]) / 2]),
    plasmodesma: S(PD[1]), mito: S(iM[1]), ruimte: S([(binnen[iR][0] + proto[iR][0]) / 2, (binnen[iR][1] + proto[iR][1]) / 2]) };
  if (a <= 0.01) return anker;
  const A = (n) => (nadruk === null || nadruk === n) ? 1 : 0.35; const lw = (px) => Math.max(px * s, 0.6) / s;
  const pad = (lst) => { ctx.beginPath(); lst.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // celwand: cellulose, middenlamel aan de buitenrand, plasmodesmata als kanaaltjes
  ctx.save(); ctx.globalAlpha *= A('wand'); ctx.beginPath(); buiten.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); binnen.slice().reverse().forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  ctx.fillStyle = _mixHex(C.groen, '#1A2740', 0.5); ctx.fill('evenodd');
  ctx.strokeStyle = rgba(C.groen, 0.35); ctx.lineWidth = lw(0.8); for (const f of [0.35, 0.65]) { pad(buiten.map((p, i) => [p[0] - nB[i][0] * wand * f, p[1] - nB[i][1] * wand * f])); ctx.stroke(); }
  pad(buiten); ctx.strokeStyle = _mixHex(C.groen, '#F2F2EE', 0.2); ctx.lineWidth = lw(2); ctx.stroke(); pad(binnen); ctx.strokeStyle = lighten(C.groen, 0.1); ctx.lineWidth = lw(1); ctx.stroke();
  PD.forEach((p, k) => { const i = [20, 70, 120, 165][k], n = nB[i]; ctx.strokeStyle = '#26324A'; ctx.lineWidth = lw(3.2); ctx.beginPath(); ctx.moveTo(p[0] + n[0] * 1, p[1] + n[1] * 1); ctx.lineTo(p[0] - n[0] * (wand + 1), p[1] - n[1] * (wand + 1)); ctx.stroke(); });
  ctx.restore();
  // ruimte tussen wand en protoplast (buitenvloeistof bij plasmolyse)
  pad(binnen); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.82); ctx.fill();
  // protoplast: cytoplasma, dan vacuole
  ctx.save(); ctx.globalAlpha *= A('cytoplasma'); pad(proto); ctx.fillStyle = '#2C3A52'; ctx.fill(); ctx.restore();
  ctx.save(); pad(proto); ctx.clip();
  for (let i = 0; i < 70; i++) { const k = Math.floor(hash(i * 3) * N), dd = 4 + hash(i * 3 + 1) * Math.max(4, rand(k) - 8); const p = proto[k], n = nP[k]; ctx.beginPath(); ctx.arc(p[0] - n[0] * dd, p[1] - n[1] * dd, 1.3, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.14); ctx.fill(); }
  ctx.save(); ctx.globalAlpha *= A('vacuole'); pad(vac); ctx.fillStyle = _mixHex(C.teal, '#1A2740', 0.62); ctx.fill(); ctx.strokeStyle = lighten(C.teal, 0.25); ctx.lineWidth = lw(1.4); ctx.stroke(); ctx.restore();
  ctx.restore();
  ctx.restore();
  // organellen in de rand (binnen het membraan)
  iM.forEach((m, k) => { const p = S(m); mitochondrionEcht(ctx, p[0], p[1], s, { a: a * A('mito'), t, rot: m[2], lang: 26, dik: 12, cristae: 4, seed: k }); });
  chl.forEach((c, k) => { const p = S(c); chloroplastEcht(ctx, p[0], p[1], s * 0.27, { a: a * A('bladgroen'), t, rot: c[2], seed: k }); });
  const pk = S(kernP); kernEnvelopPorie(ctx, pk[0], pk[1], s, { a: a * A('kern'), t, r: 40, porien: 10, ribo: false });
  // celmembraan (dubbele lijn), tegen de wand of losgelaten
  ctx.save(); ctx.globalAlpha *= a * A('membraan'); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.3);
  for (const d of [0, 3.2]) { pad(proto.map((p, i) => [p[0] - nP[i][0] * d, p[1] - nP[i][1] * d])); ctx.stroke(); } ctx.restore();
  return anker;
}
