// teken_eco5.js — Ecologie v2 · film 5 Waarom zo weinig roofdieren? — film-eigen tekeningen (voorvoegsel e5), 29 okt 2026.
// Laadt na lib.js, base.js, dier_basis.js, lib_cast.js, lib_evo.js, de pop-bestanden en lib_eco.js.
// Kleuren (seriebrief + Part C): energie = goud, warmte/dissimilatie = koraal, productie/organisch = groen, feces/voer = oker, stoffen (CO2, water, mineralen) = grijs.
// Maten Macro: 2 px per cm (koe ± 240 cm lang = 480 px, mens 1,80 m = 360 px, vos ± 110 cm met staart).

var E5K = { energie: ECOK.energie, warmte: ECOK.warmte, productie: ECOK.organisch, feces: C.oker, stof: ECOK.anorganisch, koolstof: ECOK.koolstof };
// ecoTag, ecoTitelKaart, ecoVraagKaart, ecoSchaal en ECOK komen uit lib_eco.js.

// ---------- landschap: weiland in de polder (Macro-nacht) ----------
const E5 = { gras: '#4E6B48', grasL: '#62835A', grasD: '#3E5A3A', sloot: '#2E6FBF', slootD: '#28609F', hout: '#8A6A4A', houtD: '#6A4E36', stal: '#4A5670', stalL: '#6A7690' };
function e5Bg(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function e5Weiland(ctx, o = {}) { const { horizon = 520, sloot = true, slootY = 760, bomen = true } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  // verre bomenrij en boerderij (achterste laag, gedempt)
  if (bomen) { for (let i = 0; i < 14; i++) { const x = 60 + i * 140 + (hash(i * 3) - 0.5) * 60, r = 26 + hash(i * 7) * 18; circ(ctx, x, horizon - r * 0.8, r, '#2C4436'); circ(ctx, x + r * 0.6, horizon - r * 0.6, r * 0.75, '#2C4436'); }
    ctx.fillStyle = '#34405A'; ctx.fillRect(1460, horizon - 70, 150, 70); ctx.beginPath(); ctx.moveTo(1450, horizon - 70); ctx.lineTo(1535, horizon - 120); ctx.lineTo(1620, horizon - 70); ctx.fill(); }
  vul(ctx, [[-50, horizon], [400, horizon - 14], [900, horizon + 6], [1400, horizon - 10], [1980, horizon], [1980, H], [-50, H]], C.bgMacroHill);
  vul(ctx, [[-50, horizon + 90], [600, horizon + 70], [1200, horizon + 100], [1980, horizon + 80], [1980, H], [-50, H]], C.bgMacroFront);
  if (sloot) { ctx.fillStyle = E5.sloot; ctx.fillRect(0, slootY, W, 26); ctx.fillStyle = E5.slootD; ctx.fillRect(0, slootY + 20, W, 6); ctx.fillStyle = E5.grasD; ctx.fillRect(0, slootY + 26, W, H - slootY - 26); }
  // graspollen (drie varianten, onregelmatig)
  ctx.strokeStyle = E5.grasL; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 60; i++) { const x = hash(i * 11) * W, y = horizon + 110 + hash(i * 13) * ((sloot ? slootY : H) - horizon - 130); const h = 10 + hash(i * 5) * 12;
    for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + k * 3, y - h * 0.6, x + k * 7, y - h); ctx.stroke(); } } }
function e5Hek(ctx, x0, x1, y, o = {}) { const { a = 1, n = 9 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = E5.hout; ctx.lineWidth = 4; for (const dy of [-46, -24]) { ctx.beginPath(); ctx.moveTo(x0, y + dy); ctx.lineTo(x1, y + dy); ctx.stroke(); }
  for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n); ctx.fillStyle = E5.houtD; ctx.fillRect(x - 5, y - 62, 10, 64); } ctx.restore(); }
// vierkant proefvlak van 1 m² (bovenaanzicht in perspectief: trapezium op de grond)
function e5Proefvlak(ctx, x, y, w, o = {}) { const { a = 1, geknipt = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const d = w * 0.35;
  const P = [[x, y], [x + w, y], [x + w - d * 0.4, y - d], [x + d * 0.4, y - d]];
  if (geknipt) { ctx.fillStyle = '#4A3E30'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); ctx.restore(); }

// ---------- energie en warmte ----------
// gouden stroom als band met breedte b (energie per tijd); van (x1,y1) naar (x2,y2), licht gebogen
function e5Stroom(ctx, x1, y1, x2, y2, b, o = {}) { const { kleur = E5K.energie, a = 1, buig = 0, kop = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const mx = (x1 + x2) / 2 + buig * (y2 - y1) * 0.2, my = (y1 + y2) / 2 - buig * (x2 - x1) * 0.2; ctx.strokeStyle = kleur; ctx.lineWidth = b; ctx.lineCap = 'butt';
  const an = Math.atan2(y2 - my, x2 - mx), L = Math.max(14, b * 0.9); const ex = x2 - Math.cos(an) * L, ey = y2 - Math.sin(an) * L;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
  if (kop) { const k = Math.max(b * 1.0, 12); ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(ex + Math.cos(an + 1.5708) * k, ey + Math.sin(an + 1.5708) * k); ctx.lineTo(ex - Math.cos(an + 1.5708) * k, ey - Math.sin(an + 1.5708) * k); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// warmte: drie golvende koraal lijntjes omhoog
function e5Warmte(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 3, kleur = E5K.warmte, hoek = -1.5708 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(hoek + 1.5708);
  ctx.strokeStyle = kleur; ctx.lineWidth = 4 * Math.max(0.6, s); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const dx = (i - (n - 1) / 2) * 22 * s; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20, py = -u * 70 * s, px = dx + Math.sin(u * 9 + i) * 7 * s; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore(); }
function e5Zon(ctx, x, y, r = 60, a = 1) { ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.goud, _lt(C.goud, 0.3), 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r + 14), y + Math.sin(an) * (r + 14)); ctx.lineTo(x + Math.cos(an) * (r + 36), y + Math.sin(an) * (r + 36)); ctx.stroke(); } ctx.restore(); }

// ---------- het boek van de veehouder (Schema) ----------
// regels: [[label, waarde 0..1, kleur, tekstRechts]]; geeft niets terug
function e5Boek(ctx, x, y, w, h, titel, regels = [], o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3A58', C.line, 2); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w / 2, y + 10); ctx.lineTo(x + w / 2, y + h - 10); ctx.stroke();
  if (titel) metaText(ctx, titel, x + 34, y + 56, C.grain, 'left', 26);
  regels.forEach(([lab, v, kl, rechts], i) => { const yy = y + 110 + i * 86; text(ctx, lab, x + 34, yy + 28, fTekst(36, 600), C.text, 'left');
    const bx = x + w * 0.36, bw = w * 0.58; roundRect(ctx, bx, yy, bw, 36, 8); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); if (v > 0) { roundRect(ctx, bx, yy, Math.max(10, bw * v), 36, 8); ctx.fillStyle = kl; ctx.fill(); }
    if (rechts) metaText(ctx, rechts, bx + bw, yy + 74, C.text2, 'right', 26); });
  ctx.restore(); }

// ---------- energiestroomschema van één organisme (Schema) ----------
// v = {opname, feces, diss, prod} (zelfde eenheid); o.toon = welke takken zichtbaar ('opname','feces','diss','prod'); o.getal = toon getallen; o.eenheid
function e5Schema(ctx, x, y, s = 1, v = {}, o = {}) { const { toon = ['opname', 'feces', 'diss', 'prod'], getal = true, eenheid = 'MJ', a = 1, namen = true, maxB = 90, focus = null, pct = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const tot = v.opname || 100, bb = (q) => Math.max(6, maxB * q / tot); const on = (k) => toon.includes(k);
  const doos = (bx, by, bw, bh, kl, lab, val, sub) => { roundRect(ctx, bx, by, bw, bh, 16); shape(ctx, rgba(kl, 0.22), kl, 3); text(ctx, lab, bx + bw / 2, by + (getal && val != null ? 52 : 66), fTekst(38, 700), C.text, 'center');
    if (getal && val != null) text(ctx, val + ' ' + eenheid, bx + bw / 2, by + 102, fTekst(36, 600), _lt(kl, 0.25), 'center'); if (sub) metaText(ctx, sub, bx + bw / 2, by + bh + 38, C.text2, 'center', 26); };
  if (on('opname')) doos(0, 0, 360, 130, E5K.energie, 'opname', v.opname, namen ? 'energie in het voer' : null);
  // opgenomen in het bloed → splitst
  if (on('feces')) { e5Stroom(ctx, 120, 182, -150, 300, bb(v.feces), { kleur: E5K.feces }); doos(-390, 300, 300, 130, E5K.feces, 'feces', v.feces, namen ? 'niet verteerd' : null); }
  if (on('diss')) { e5Stroom(ctx, 180, 182, 180, 300, bb(v.diss), { kleur: E5K.warmte }); doos(30, 300, 300, 130, E5K.warmte, 'dissimilatie', v.diss, namen ? 'R · wordt warmte' : null); e5Warmte(ctx, 180, 292, 0.8, { a: 0.9 }); }
  if (on('prod')) { e5Stroom(ctx, 240, 182, 520, 300, bb(v.prod), { kleur: E5K.productie }); doos(450, 300, 300, 130, E5K.productie, 'productie', v.prod, namen ? 'vooral groei' : null); }
  if (pct) text(ctx, pct, 600, 520, fTekst(40, 700), C.groen, 'center');
  if (focus) { const F = { feces: [-390, 300, 300, 130], diss: [30, 300, 300, 130], prod: [450, 300, 300, 130], opname: [0, 0, 360, 130] }[focus]; roundRect(ctx, F[0] - 10, F[1] - 10, F[2] + 20, F[3] + 20, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore(); }

// ---------- piramide (Schema): lagen van onder naar boven, breedte per laag ----------
// lagen = [[breedte px, kleur, label]] onder → boven; o.h = hoogte per laag
function e5Piramide(ctx, cx, y, lagen, o = {}) { const { h = 70, a = 1, titel = null, labels = true, rechts = true } = o; ctx.save(); ctx.globalAlpha *= a;
  lagen.forEach(([b, kl, lab], i) => { const yy = y - (i + 1) * h; roundRect(ctx, cx - b / 2, yy + 4, b, h - 8, 8); shape(ctx, rgba(kl, 0.55), _lt(kl, 0.25), 2);
    if (labels && lab) text(ctx, lab, rechts ? cx + Math.max(b / 2, 60) + 24 : cx, yy + h / 2 + 12, fTekst(36, 600), C.text, rechts ? 'left' : 'center'); });
  if (titel) metaText(ctx, titel, cx, y + 44, C.grain, 'center', 26); ctx.restore(); }

// ---------- meetstal (klimaatrespiratiecel), doorsnede ----------
function e5Meetstal(ctx, x, y, w, h, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#AFC0D0', 0.08), '#AFC0D0', 4);
  // luchtbuizen in en uit
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 90, y + 70); ctx.lineTo(x, y + 70); ctx.moveTo(x + w, y + 70); ctx.lineTo(x + w + 90, y + 70); ctx.stroke();
  ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 90, y + 70); ctx.lineTo(x + 2, y + 70); ctx.moveTo(x + w - 2, y + 70); ctx.lineTo(x + w + 90, y + 70); ctx.stroke();
  // voerbak en mestgoot
  roundRect(ctx, x + w - 170, y + h - 90, 140, 70, 10); shape(ctx, '#3A4A66', '#AFC0D0', 2); vul(ctx, [[x + w - 160, y + h - 74], [x + w - 120, y + h - 92], [x + w - 70, y + h - 88], [x + w - 40, y + h - 74]], '#B9A55A');
  ctx.fillStyle = '#3A3026'; ctx.fillRect(x + 20, y + h - 26, w * 0.45, 14);
  ctx.restore(); }
// meter: rond klokje met wijzer, label eronder
function e5Meter(ctx, x, y, r, u, kl, lab, o = {}) { ctx.save(); circ(ctx, x, y, r, '#2A3A58', C.line, 2); ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, r - 10, Math.PI * 0.8, Math.PI * (0.8 + 1.4 * u)); ctx.stroke();
  const an = Math.PI * (0.8 + 1.4 * u); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 18), y + Math.sin(an) * (r - 18)); ctx.stroke(); circ(ctx, x, y, 5, C.text);
  if (lab) naamBij(ctx, lab, o.meta || null, x, y + r + 46, 1, 'center'); ctx.restore(); }

// ---------- lab: weegschaal, droogstoof, bakje met thermometer ----------
function e5Weegschaal(ctx, x, y, w, o = {}) { const { a = 1, lading = null, getal = null } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3;
  roundRect(ctx, x - w / 2, y - 60, w, 60, 10); ctx.stroke(); roundRect(ctx, x - w * 0.42, y - 84, w * 0.84, 18, 6); ctx.stroke();
  roundRect(ctx, x - 80, y - 46, 160, 34, 6); ctx.fillStyle = '#121A26'; ctx.fill(); ctx.stroke(); if (getal) text(ctx, getal, x, y - 19, fMeta(26), C.goud, 'center');
  if (lading) lading(ctx, x, y - 86); ctx.restore(); }
function e5Stoof(ctx, x, y, w, h, o = {}) { const { a = 1, temp = '70 °C' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3;
  roundRect(ctx, x, y, w, h, 12); ctx.stroke(); roundRect(ctx, x + 18, y + 18, w - 36, h - 80, 8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 30, y + h * 0.5); ctx.lineTo(x + w - 30, y + h * 0.5); ctx.stroke();
  metaText(ctx, temp, x + w / 2, y + h - 22, C.goud, 'center', 26); ctx.restore(); }
function e5Bakje(ctx, x, y, w, h, o = {}) { const { a = 1, temp = '20 °C', label = null } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y - h); ctx.stroke(); ctx.fillStyle = '#5A4A3A'; ctx.fillRect(x + 3, y - 22, w - 6, 20);
  // thermometer
  const tx = x + w - 40; roundRect(ctx, tx - 7, y - h + 20, 14, h - 70, 7); ctx.stroke(); circ(ctx, tx, y - 44, 12, C.koraal, '#AFC0D0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(tx - 3, y - h * 0.55, 6, h * 0.55 - 50);
  metaText(ctx, temp, tx, y - h, C.text2, 'center', 26); if (label) naamBij(ctx, label, null, x + w / 2, y + 50, 1, 'center'); ctx.restore(); }
// hoopje voer (insecten/wormen) als oker stapeltje; n = grootte
function e5Hoopje(ctx, x, y, r, kl = C.oker, a = 1) { ctx.save(); ctx.globalAlpha *= a; vul(ctx, [[x - r, y], [x - r * 0.6, y - r * 0.55], [x, y - r * 0.75], [x + r * 0.6, y - r * 0.5], [x + r, y]], kl, _lt(kl, 0.3), 2);
  ctx.strokeStyle = _dk(kl, 0.35); ctx.lineWidth = 2; for (let i = 0; i < Math.max(2, r / 10); i++) { const px = x - r * 0.6 + hash(i * 3 + r) * r * 1.2, py = y - r * 0.1 - hash(i * 7 + r) * r * 0.45; ctx.beginPath(); ctx.arc(px, py, r * 0.1, 0.3, 2.8); ctx.stroke(); } ctx.restore(); }
// voerzak (oker) voor weegschaalvergelijking
function e5Zak(ctx, x, y, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a; vul(ctx, [[x - 26 * s, y], [x - 30 * s, y - 40 * s], [x - 20 * s, y - 62 * s], [x + 20 * s, y - 62 * s], [x + 30 * s, y - 40 * s], [x + 26 * s, y]], '#B9945A', '#D8BC88', 2);
  ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 18 * s, y - 56 * s); ctx.lineTo(x + 18 * s, y - 56 * s); ctx.stroke(); ctx.restore(); }

// ---------- koeienvlaai, rups, klok, bord ----------
function e5Vlaai(ctx, x, y, s = 1) { vul(ctx, [[x - 70 * s, y], [x - 60 * s, y - 16 * s], [x - 20 * s, y - 26 * s], [x + 30 * s, y - 24 * s], [x + 66 * s, y - 12 * s], [x + 72 * s, y]], '#5A4632', '#7A6448', 2);
  vul(ctx, [[x - 34 * s, y - 20 * s], [x - 10 * s, y - 34 * s], [x + 22 * s, y - 30 * s], [x + 36 * s, y - 20 * s]], '#6A5440'); }
// rups (zijaanzicht): één doorlopende lijfvorm met segmentbanden, 3 paar borstpoten, 4 paar buikpoten + naschuivers (C9); lengte 120 eenheden × s
function e5Rups(ctx, x, y, s = 1, o = {}) { const { kijk = 1, kleur = '#86B85A', a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  const P = []; for (let i = 0; i <= 24; i++) { const u = i / 24; P.push([u * 120, -10 - Math.sin(u * 3.1416) * 4]); }
  ctx.strokeStyle = _dk(kleur, 0.25); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  for (const px of [104, 112, 118]) { ctx.beginPath(); ctx.moveTo(px, -4); ctx.lineTo(px + 2, 1); ctx.stroke(); }          // borstpoten (voor)
  for (const px of [52, 62, 72, 82, 4]) { ctx.beginPath(); ctx.moveTo(px, -4); ctx.lineTo(px, 1); ctx.lineWidth = 5; ctx.stroke(); } // buikpoten + naschuiver
  ctx.lineWidth = 20; ctx.strokeStyle = kleur; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = _lt(kleur, 0.35); ctx.lineWidth = 6; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] + 5) : ctx.moveTo(p[0], p[1] + 5)); ctx.stroke();
  ctx.strokeStyle = _dk(kleur, 0.18); ctx.lineWidth = 1.5; for (let i = 1; i < 12; i++) { const px = i * 10; ctx.beginPath(); ctx.moveTo(px, -19); ctx.lineTo(px, -1); ctx.stroke(); }
  circ(ctx, 124, -11, 9, _dk(kleur, 0.3)); circ(ctx, 127, -14, 2, '#1B1A1C'); ctx.restore(); }
function e5Klok(ctx, x, y, r, uren, o = {}) { const { a = 1, kl = C.text } = o; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#2A3A58', C.line, 3);
  for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.82, y + Math.sin(an) * r * 0.82); ctx.lineTo(x + Math.cos(an) * r * 0.94, y + Math.sin(an) * r * 0.94); ctx.stroke(); }
  const an = uren / 12 * 6.283 - 1.5708; ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.55, y + Math.sin(an) * r * 0.55); ctx.stroke();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - r * 0.75); ctx.stroke(); ctx.restore(); }
function e5Bord(ctx, x, y, s = 1) { ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, 120 * s, 34 * s, 0, 0, 6.283); shape(ctx, '#D8DCE2', '#AFB6C2', 2); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 88 * s, 22 * s, 0, 0, 6.283); ctx.fillStyle = '#E6E9EE'; ctx.fill();
  // biefstuk ± 15 cm: bovenaanzicht in perspectief
  vul(ctx, [[x - 60 * s, y - 4 * s], [x - 40 * s, y - 20 * s], [x + 30 * s, y - 22 * s], [x + 62 * s, y - 8 * s], [x + 40 * s, y + 8 * s], [x - 44 * s, y + 6 * s]], '#7A3E2E', '#5A2C20', 2);
  ctx.strokeStyle = '#9A5A44'; ctx.lineWidth = 2; for (const k of [-24, 0, 24]) { ctx.beginPath(); ctx.moveTo(x + k * s - 10 * s, y - 14 * s); ctx.lineTo(x + k * s + 14 * s, y + 2 * s); ctx.stroke(); } ctx.restore(); }
// staafdiagram NPP per ecosysteem (vwo): data [[naam, waarde]] in g/m²/jaar
const E5_NPP = [['moeras', 2500], ['tropisch regenwoud', 2000], ['gematigd loofbos', 1200], ['akker', 650], ['grasland', 500], ['open oceaan', 125], ['woestijn', 70]];
function e5Staaf(ctx, x, y, w, h, o = {}) { const { a = 1, n = E5_NPP.length, licht = null, kleur = C.groen } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let v = 0; v <= 2500; v += 500) { const yy = y - v / 2500 * h; ctx.fillRect(x, yy, w, 2); metaText(ctx, String(v), x - 16, yy + 10, C.text2, 'right', 26); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const bw = w / E5_NPP.length; E5_NPP.slice(0, n).forEach(([nm, v], i) => { const bh = v / 2500 * h, bx = x + i * bw + bw * 0.18; const dimd = licht != null && i !== licht;
    roundRect(ctx, bx, y - bh, bw * 0.64, bh, 6); shape(ctx, rgba(kleur, dimd ? 0.25 : 0.8), _lt(kleur, 0.3), 1.5);
    ctx.save(); ctx.translate(bx + bw * 0.32, y + 18); ctx.rotate(-0.5); text(ctx, nm, 0, 20, fTekst(34, 600), dimd ? rgba(C.text, 0.5) : C.text, 'right'); ctx.restore(); });
  metaText(ctx, 'NPP · gram droge stof per m² per jaar', x, y - h - 40, C.grain, 'left', 26); ctx.restore(); }
// familie aan tafel (staand achter de tafel; tafelblad over de benen)
function e5Tafel(ctx, x, y, w) { ctx.fillStyle = '#7A5E44'; ctx.fillRect(x, y, w, 22); ctx.fillStyle = '#5E4834'; ctx.fillRect(x + 20, y + 22, 18, 140); ctx.fillRect(x + w - 38, y + 22, 18, 140); ctx.fillStyle = '#8A6E52'; ctx.fillRect(x, y, w, 6); }

// ---------- knotwilg met bladluizen (omgekeerde piramide van aantallen), mestkever ----------
// Knotwilg: korte dikke stam (± 2 m) met knot, daaruit rechte twijgen met smalle lancetvormige bladeren (C9: wilg = smal blad, lichte onderkant)
function e5Knotwilg(ctx, x, y, h, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const sw = h * 0.16;
  vul(ctx, [[x - sw, y], [x - sw * 0.8, y - h * 0.5], [x - sw * 1.1, y - h * 0.62], [x + sw * 1.1, y - h * 0.62], [x + sw * 0.85, y - h * 0.5], [x + sw, y]], '#6E5A48', '#8A735E', 2);
  ctx.lineCap = 'round'; for (let i = 0; i < 16; i++) { const an = -Math.PI / 2 + (i - 7.5) * 0.11 + (hash(i * 5) - 0.5) * 0.08, L = h * (0.75 + 0.3 * hash(i * 3)); const bx = x + (i - 7.5) * sw * 0.12, by = y - h * 0.6;
    const ex = bx + Math.cos(an) * L, ey = by + Math.sin(an) * L; ctx.strokeStyle = '#8A7A4E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke();
    for (let k = 2; k < 12; k++) { const u = k / 12, px = lerp(bx, ex, u), py = lerp(by, ey, u), z = k % 2 ? 1 : -1; ctx.save(); ctx.translate(px, py); ctx.rotate(an + z * 0.6); ctx.beginPath(); ctx.ellipse(h * 0.035, 0, h * 0.04, h * 0.008, 0, 0, 6.283); ctx.fillStyle = k % 3 ? '#7FA068' : '#9DB88A'; ctx.fill(); ctx.restore(); } }
  ctx.restore(); }
// bladluis: peervormig lijfje met twee sifonnetjes; s = px per mm (± 2 mm lang)
function e5Bladluis(ctx, x, y, s, an = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, s * 1.1, s * 0.7, 0, 0, 6.283); ctx.fillStyle = '#9CC46A'; ctx.fill(); ctx.strokeStyle = '#6E9A48'; ctx.lineWidth = 1; ctx.stroke();
  circ(ctx, s * 1.0, 0, s * 0.35, '#7FA858'); ctx.strokeStyle = '#5E7A40'; ctx.lineWidth = Math.max(1, s * 0.12); ctx.beginPath(); ctx.moveTo(-s * 0.5, -s * 0.4); ctx.lineTo(-s * 1.1, -s * 0.8); ctx.moveTo(-s * 0.5, s * 0.4); ctx.lineTo(-s * 1.1, s * 0.8); ctx.stroke(); ctx.restore(); }
// mestkever (zijaanzicht, ± 2 cm): bol zwartblauw schild, kop, zes poten
function e5Mestkever(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#1E2230'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  for (const [px, d] of [[-10, -1], [0, 0], [10, 1]]) { ctx.beginPath(); ctx.moveTo(px, -6); ctx.lineTo(px + d * 6 - 2, 2); ctx.lineTo(px + d * 8 - 4, 6); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -12, 16, 11, 0, Math.PI, 0); ctx.lineTo(16, -8); ctx.lineTo(-16, -8); ctx.closePath(); ctx.fillStyle = '#2A3048'; ctx.fill(); ctx.strokeStyle = '#4A5478'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(18, -10, 6, 5, 0, 0, 6.283); ctx.fillStyle = '#22283A'; ctx.fill(); ctx.restore(); }
