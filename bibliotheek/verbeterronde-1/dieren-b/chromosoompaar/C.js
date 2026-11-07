// =====================================================================================
// CHROMOSOOM. Recept: een chromosoom is één DNA-molecuul, om eiwitten gewonden en opgevouwen in lussen. Niet verdubbeld
// (G1, of in een geslachtscel) = één staafje; vorm: ronde uiteinden (telomeren), een duidelijke insnoering (centromeer,
// tot ±55 % van de breedte, over ±0,7× de breedte), licht golvende randen. Verdubbeld (na de S-fase) = twee identieke
// zusterchromatiden die alleen bij het centromeer vastzitten: X-vorm, zelfde allel op beide chromatiden.
// Bandenpatroon (G-banden) als afwisselend donkere en lichte banden van ongelijke breedte. Een gen = een band op een
// vaste plek (locus) in de allelkleur. Kleur paars (Part C: DNA).
// Bekende fouten: rechthoekig staafje; centromeer als zwart blokje of onzichtbaar; gen als los kader naast het chromosoom;
// zusterchromatiden met verschillende allelen.
// Nieuw: o.verdubbeld (chromosoomPaar, chromosoom1) tekent de X-vorm; o.spreid (0–1) hoe ver de armen uiteen staan.
// =====================================================================================
function _chromPad(ctx, cx, top, h, breed, cen, seed = 0) {
  const R = breed / 2, rc = R * 0.95, N = 56, Lz = [], Rz = [];
  const hw = (t, ph) => { const dE = Math.min(t, 1 - t) * h; const cap = dE >= rc ? 1 : Math.sqrt(Math.max(0, 1 - Math.pow((rc - dE) / rc, 2)));
    const con = 1 - 0.45 * Math.exp(-Math.pow((t - cen) * h / (breed * 0.7), 2)); const wob = 1 + 0.035 * Math.sin(t * h / (breed * 0.5) + ph); return R * cap * con * wob; };
  for (let i = 0; i <= N; i++) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Lz.push([cx - hw(t, seed), top + t * h]); }
  for (let i = N - 1; i >= 1; i--) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Rz.push([cx + hw(t, seed + 1.7), top + t * h]); }
  ctx.beginPath(); bioPad(ctx, Lz.concat(Rz), true); }
// _GBAND blijft ongewijzigd in lib_micro_evo.js:
// const _GBAND = [[0.07, 0.03, 1], [0.15, 0.05, 1], [0.22, 0.025, 0], [0.4, 0.04, 1], [0.47, 0.025, 0], [0.66, 0.05, 1], [0.73, 0.03, 0], [0.8, 0.055, 1], [0.9, 0.03, 1]];
function _chromTekening(ctx, cx, top, h, breed, cen, vul, rand, gen, seed) {
  _chromPad(ctx, cx, top, h, breed, cen, seed); shape(ctx, vul, rand, Math.max(1.2, breed * 0.06));
  ctx.save(); _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.clip();
  const zak = breed * 0.12; // banden licht gebogen (het chromosoom is rond)
  for (const [p, d, donker] of _GBAND) { if (gen && Math.abs(p - gen.band) < gen.halfT + d) continue; if (Math.abs(p - cen) < 0.06) continue;
    const y0 = top + p * h, hh = Math.max(2, d * h); ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + hh); ctx.quadraticCurveTo(cx, y0 + hh + zak, cx - breed, y0 + hh); ctx.closePath();
    ctx.fillStyle = donker ? rgba(_mvD(vul, 0.35), 0.75) : rgba(rand, 0.35); ctx.fill(); }
  // centromeer: de insnoering iets lichter (geen blokje), zodat hij ook klein leesbaar blijft
  { const yc = top + cen * h; ctx.beginPath(); ctx.ellipse(cx, yc, breed * 0.6, breed * 0.55, 0, 0, 6.283); ctx.fillStyle = rgba(rand, 0.28); ctx.fill(); }
  if (breed >= 18) { ctx.strokeStyle = rgba(rand, 0.22); ctx.lineWidth = Math.max(0.8, breed * 0.035); for (const zij of [-1, 1]) { ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const t = i / 60, yy = top + t * h; const xx = cx + zij * breed * (0.3 + 0.08 * Math.sin(t * h / (breed * 0.22) + zij)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
  if (gen) { const y0 = top + gen.band * h - gen.hh / 2; ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + gen.hh); ctx.quadraticCurveTo(cx, y0 + gen.hh + zak, cx - breed, y0 + gen.hh); ctx.closePath();
    ctx.fillStyle = gen.kleur; ctx.fill(); ctx.strokeStyle = _mvL(gen.kleur, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore();
  _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.2, breed * 0.06); ctx.stroke();
  if (gen && gen.nieuw) { const y0 = top + gen.band * h - gen.hh / 2; roundRect(ctx, cx - breed / 2 - 6, y0 - 5, breed + 12, gen.hh + 10 + zak, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
}
// verdubbeld chromosoom: twee zusterchromatiden die AAN ELKAAR VASTZITTEN bij één gezamenlijk centromeer (de insnoeringen
// raken/overlappen), armen buigen daarvandaan naar buiten: een echte X (Lodish fig. 19-17: na de metafase blijft cohesine
// alleen bij het centromeer; Newcastle University BMS-wiki: 'attached together at centromere').
function _chromX(ctx, cx, top, h, breed, cen, vul, rand, gen, seed, spreid = 1) {
  const yc = top + cen * h, hoek = 0.15 * spreid, dx = breed * 0.27;
  // elke chromatide knikt bij het centromeer: bovenarm en onderarm buigen allebei naar buiten (X)
  for (const zij of [-1, 1]) for (const boven of [true, false]) { ctx.save(); ctx.beginPath(); ctx.rect(cx - h, boven ? top - h : yc, h * 2, boven ? yc - top + h : h * 2); ctx.clip();
    ctx.translate(cx + zij * dx, yc); ctx.rotate((boven ? 1 : -1) * zij * hoek); _chromTekening(ctx, 0, -cen * h, h, breed, cen, vul, rand, gen, seed + (zij > 0 ? 0.6 : 0)); ctx.restore(); }
  // gezamenlijk centromeer: één knoop over de plek waar de chromatiden samenkomen
  ctx.beginPath(); ctx.ellipse(cx, yc, breed * 0.42, breed * 0.3, 0, 0, 6.283); ctx.fillStyle = _mvD(vul, 0.2); ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.2, breed * 0.06); ctx.stroke();
}
function _bandH(h) { return clamp(h * 0.11, 10, 24); }
function chromosoomPaar(ctx, x, y, h, o = {}) {
  const { allelen = [EVO.a1, EVO.a2], band = 0.32, a = 1, breed = 34, cen = 0.58, nieuw = null, verdubbeld = false, spreid = 1 } = o; if (a <= 0.01) return;
  const gap = o.gap !== undefined ? o.gap : verdubbeld ? breed * 1.6 : 30;
  ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  const halfB = verdubbeld ? breed * 0.55 + Math.sin(0.15 * spreid) * h * 0.45 : breed / 2;
  for (let k = 0; k < 2; k++) { const cx = x + (k ? 1 : -1) * (gap / 2 + halfB); const isN = nieuw && nieuw[0] === k; const kl = isN ? nieuw[1] : allelen[k];
    const g = { band, hh, halfT: hh / h / 2, kleur: kl, nieuw: isN };
    if (verdubbeld) _chromX(ctx, cx, y - h / 2, h, breed, cen, C.kern, C.kernR, g, k * 2.3, spreid);
    else _chromTekening(ctx, cx, y - h / 2, h, breed, cen, C.kern, C.kernR, g, k * 2.3); }
  ctx.restore(); }
function chromosoom1(ctx, x, y, h, kleur, o = {}) {
  const { band = 0.32, breed = 34, cen = 0.58, a = 1, verdubbeld = false, spreid = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  const g = { band, hh, halfT: hh / h / 2, kleur };
  if (verdubbeld) _chromX(ctx, x, y - h / 2, h, breed, cen, C.kern, C.kernR, g, 0.9, spreid); else _chromTekening(ctx, x, y - h / 2, h, breed, cen, C.kern, C.kernR, g, 0.9); ctx.restore(); }
// chromosoom (muilezel-meiose, film 6): staafje 14 px breed, centromeer op 38 % van boven, eigen kleur per set
function chromosoom(ctx, x, y, l, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _chromTekening(ctx, x, y - l / 2, l, 14, 0.38, kleur, _mvL(kleur, 0.35), null, l * 0.01); ctx.restore(); }
