/* castfiguren.js — hulpjes om castboekpersonages in de oude engine (ENG.G) te tekenen; v2.2–2.3, sinds 3.0 zonder castNavelstreng */
let _castOff = null;
function castFig(g, id, x, y, h, o = {}) {
  const a = o.alpha == null ? 1 : o.alpha; if (a <= 0.01) return {}; const ctx = g.ctx; const opts = Object.assign({}, o, { a: 1 });
  if (a > 0.985) { ctx.save(); ctx.globalAlpha = 1; const r = persoon(ctx, id, x, y, h, opts); ctx.restore(); return r; }
  if (!_castOff) _castOff = document.createElement('canvas'); const cv = ctx.canvas; if (_castOff.width !== cv.width || _castOff.height !== cv.height) { _castOff.width = cv.width; _castOff.height = cv.height; }
  const oc = _castOff.getContext('2d'); oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, cv.width, cv.height); oc.globalAlpha = 1; oc.setTransform(ctx.getTransform());
  const r = persoon(oc, id, x, y, h, opts);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.drawImage(_castOff, 0, 0); ctx.restore(); return r;
}
// buik van een zwanger castpersonage (zelfde maten als lib_cast.js): middelpunt en stralen, voor een 'kijkje in de buik'
function castBuik(id, x, y, h, zw, kijk = 1) { const P = CAST[id], hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45; const rx = hh * (0.5 + 0.48 * zw), ry = hh * (0.5 + 0.5 * zw); return { x: x + (P.krom ? hh * 0.15 : 0) + kijk * hh * 0.12 * zw, y: heupY - hh * 0.5 + ry * 0.3, rx, ry }; }
const FOETUS = { huid: '#E9B79C', schaduw: '#D69E84', ink: '#7A4A3A' };
function castFoetus(c, x, y, s, o = {}) {
  const a = o.alpha == null ? 1 : o.alpha, rot = o.rot || 0; const P = (lx, ly) => ({ x: x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y: y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s });
  const ret = { navel: P(48, 58), bekken: P(8, 100), hoofd: P(14, -96) }; if (a <= 0.01) return ret;
  const k = FOETUS; c.save(); c.globalAlpha = a; c.translate(x, y); c.rotate(rot); c.scale(s, s); c.lineCap = 'round'; c.lineJoin = 'round';
  // verre arm en been (schaduwtint)
  c.strokeStyle = k.schaduw; c.lineWidth = 24; c.beginPath(); c.moveTo(14, -18); c.lineTo(36, 26); c.lineTo(46, -22); c.stroke();
  c.lineWidth = 34; c.beginPath(); c.moveTo(0, 96); c.lineTo(46, 54); c.lineTo(22, 112); c.stroke();
  // romp: gebogen rug links, buik rechts
  const romp = () => { c.beginPath(); c.moveTo(4, -44); c.bezierCurveTo(-48, -30, -62, 40, -40, 92); c.bezierCurveTo(-28, 122, 14, 132, 30, 112); c.bezierCurveTo(58, 86, 62, 26, 46, -14); c.bezierCurveTo(40, -34, 26, -46, 4, -44); c.closePath(); };
  c.fillStyle = k.huid; romp(); c.fill();
  c.save(); romp(); c.clip(); c.fillStyle = k.schaduw; c.beginPath(); c.ellipse(-58, 40, 30, 110, 0.1, 0, 6.283); c.fill(); c.restore();
  // hoofd: groot, kin op de borst
  c.fillStyle = k.huid; c.beginPath(); c.arc(14, -96, 60, 0, 6.283); c.fill();
  c.save(); c.beginPath(); c.arc(14, -96, 60, 0, 6.283); c.clip(); c.fillStyle = k.schaduw; c.beginPath(); c.ellipse(-40, -96, 26, 70, 0, 0, 6.283); c.fill(); c.restore();
  c.fillStyle = k.schaduw; c.beginPath(); c.ellipse(0, -92, 11, 15, 0, 0, 6.283); c.fill(); // oor
  c.strokeStyle = k.ink; c.lineWidth = 3.2; c.beginPath(); c.arc(46, -104, 9, 0.35, 2.75); c.stroke(); // oog dicht
  c.fillStyle = k.schaduw; c.beginPath(); c.ellipse(72, -86, 6, 8, 0, 0, 6.283); c.fill(); // neusje
  c.strokeStyle = k.ink; c.lineWidth = 2.6; c.beginPath(); c.moveTo(60, -62); c.quadraticCurveTo(66, -58, 70, -64); c.stroke(); // mondje
  // nabije been (opgetrokken) en arm (handje bij het gezicht)
  c.strokeStyle = k.huid; c.lineWidth = 40; c.beginPath(); c.moveTo(8, 100); c.lineTo(62, 50); c.stroke(); c.lineWidth = 32; c.beginPath(); c.moveTo(62, 50); c.lineTo(44, 116); c.stroke();
  c.fillStyle = k.huid; c.beginPath(); c.ellipse(56, 124, 22, 12, -0.2, 0, 6.283); c.fill();
  c.strokeStyle = k.schaduw; c.lineWidth = 3; c.beginPath(); c.moveTo(52, 60); c.lineTo(58, 48); c.stroke();
  c.strokeStyle = k.huid; c.lineWidth = 24; c.beginPath(); c.moveTo(22, -14); c.lineTo(50, 30); c.stroke(); c.lineWidth = 20; c.beginPath(); c.moveTo(50, 30); c.lineTo(62, -24); c.stroke();
  c.fillStyle = k.huid; c.beginPath(); c.arc(64, -32, 13, 0, 6.283); c.fill();
  c.restore(); return ret;
}
// navelstreng: zacht golvende streng van a naar b (bleek, met slagaders en ader als dunne lijntjes)
// castNavelstreng is vervangen door bioNavelstreng uit lib_bio.js (kleur volgt zuurstof, Kamiel 28 okt 2026)

