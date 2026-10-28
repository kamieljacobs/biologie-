// SPIERCONTRACTIE OP MOLECUULNIVEAU — definitief (inbouw 28 okt 2026): reticulum als kous uit B, actine als dubbele
// bolletjesstreng uit A (Kamiel: 'de kralen van A mooi, maar niet de ringen om de vezel bovenaan').
// Recept (OpenStax A&P 10.2–10.3; Alberts h. 16):
// · Actine (dunne draad) = twee strengen bolletjes (G-actine, ± 5,5 nm) die om elkaar draaien; ze kruisen elke
//   ± 13 bolletjes (± 36 nm). Bindplekken voor myosine op de bolletjes (hier om de 6, zoals in de film).
// · Tropomyosine = lange draad die in de groef tussen de twee strengen ligt en de bindplekken afdekt; troponine
//   zit er om de ± 7 bolletjes (± 38 nm) aan vast; Ca²⁺ bindt aan troponine → tropomyosine schuift opzij.
// · Myosinekop: hals aan de dikke draad; gespannen ± loodrecht, na de krachtslag gekanteld naar het midden van
//   de sarcomeer; ATP/ADP+P als label op de kop (chip).
// · Sarcoplasmatisch reticulum = glad ER dat als een net van buisjes om élke myofibril ligt; bij de overgang
//   A-band/I-band verwijdt het tot terminale cisternen (ringen om de fibril) met een T-buisje ertussen (triade).
//   Bij een impuls komt Ca²⁺ vrij uit de cisternen (ca 0..1) en wordt daarna teruggepompt (terug 0..1).
// Aanpak: actine als twee strengen G-actinebolletjes die om elkaar draaien (achterste bolletjes donkerder en iets
//   kleiner, voorste lichter; uit A); reticulum als kous om een ronde myofibril: de buisjes aan de achterkant
//   gedimd, de voorkant vol, het T-buisje komt van boven uit het celmembraan; rechts een stuk zonder kous (uit B).
//   De donkere schaduwstrook over de onderkant van de fibril is weg (Part C: geen schaduw).
// Bekende fouten: actine als één rij bolletjes; reticulum als vlek met lijnen; chip die een fout gooit als tag()
//   ontbreekt (nu een eigen pilletje als tag() er niet is).
// Aanroepen zoals voorheen. kopStand(ctx, x, y, s, {a, hoek, vast, actX, chip, chipA, hl, plekken}) →
//   {kop, actine, myosine}; actineDetail(ctx, x, y, w, s, {a, schuif, ca}) → {tropo, troponine, plek};
//   reticulum(ctx, x, y, w, h, {a, ca, t, terug}) → {cisternen:[x...], ttubuli:[x...]} (nieuw).
function _spA_chip(ctx, s, x, y, col, px) { if (typeof tag === 'function') return tag(ctx, s, x, y, col, 1, 'left', px);
  ctx.save(); ctx.font = `600 ${px}px "Source Sans 3", system-ui, sans-serif`; const w = ctx.measureText(s).width + px * 1.2; roundRect(ctx, x, y - px - 4, w, px + 14, (px + 14) / 2); shape(ctx, rgba(col, 0.16), col, 1.5);
  ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(s, x + w / 2, y); ctx.restore(); }
function _spA_actine(ctx, x0, y, x1, s, schuif = 0, plekken = true, voorAlleen = false) { // dubbele streng, kruist elke 13 bolletjes
  const d = 0.62 * s, rb = 0.3 * s, amp = 0.42 * s; const k0 = Math.floor((x0 - schuif) / d) - 1, k1 = Math.ceil((x1 - schuif) / d) + 1; const items = [];
  for (let k = k0; k <= k1; k++) for (const st of [0, 1]) { const ph = (k / 13) * 6.283 + st * Math.PI; const bx = k * d + schuif + (st ? d * 0.5 : 0); if (bx < x0 - d || bx > x1 + d) continue; items.push({ x: bx, y: y + Math.sin(ph) * amp, z: Math.cos(ph), k, st }); }
  items.sort((A, B) => A.z - B.z).forEach(b => { if (voorAlleen && b.z < -0.2) return; const z = (b.z + 1) / 2; circ(ctx, b.x, b.y, rb * (0.85 + 0.15 * z), _mixHex(_mixHex(Z9.actine, '#1A2740', 0.45), _mixHex(Z9.actine, '#FFFFFF', 0.15), z), Z9.actine, 1);
    if (plekken && b.st === 0 && ((b.k % 6) + 6) % 6 === 3) circ(ctx, b.x, b.y + 0.12 * s, 0.12 * s, '#1A2A3A'); });
}
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, _mixHex(Z9.myosine, '#FFFFFF', 0.3), 1.5);
  // naastgelegen koppen op de dikke draad (context, gedimd)
  ctx.save(); ctx.globalAlpha *= 0.35; for (const dx of [-5.5, 5.5]) { const hx = x + dx * s; ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.3 * s; ctx.beginPath(); ctx.moveTo(hx, my - 0.45 * s); ctx.lineTo(hx - 0.5 * s, my - 1.5 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(hx - 0.6 * s, my - 1.9 * s, 0.45 * s, 0.7 * s, -0.3, 0, 6.283); ctx.fillStyle = Z9.myosine; ctx.fill(); } ctx.restore();
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip(); _spA_actine(ctx, x - 10 * s, ay, x + 10 * s, s, actX, plekken); ctx.restore();
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.35 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.quadraticCurveTo(nx - 0.2 * s, (ny + kopY) / 2, kx, kopY + 0.4 * s); ctx.stroke();
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.85 * s, 0, 0, 6.283); shape(ctx, _mixHex(Z9.myosine, '#FFFFFF', 0.15), hl > 0.5 ? C.goud : Z9.myosine, hl > 0.5 ? 3 : 1.5);
  ctx.beginPath(); ctx.ellipse(0.1 * s, -0.35 * s, 0.18 * s, 0.12 * s, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.45); ctx.fill(); ctx.restore(); // ATP-holte
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; _spA_chip(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, Math.max(12, Math.round(0.42 * s))); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}
function actineDetail(ctx, x, y, w, s, o = {}) { const { a = 1, schuif = 0, ca = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.floor(w / (0.62 * s)); const x1 = x + (n - 1) * 0.62 * s;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 0.5 * s, y - 1.5 * s, w + s, 3 * s); ctx.clip(); _spA_actine(ctx, x, y, x1, s, 0, true); ctx.restore();
  // tropomyosine in de groef: schuift bij calcium van de bindplekken af
  const ty = y + lerp(0.12, -0.62, schuif) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 0.2 * s; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 120; k++) { const xx = x + k * (x1 - x) / 120; const ph = ((xx - x) / (0.62 * s)) / 13 * 6.283; const yy = ty + Math.sin(ph + Math.PI / 2) * 0.12 * s; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  const tp = []; for (let k = 3; k < n; k += 7) { const bx = x + (k + 1.5) * 0.62 * s; ctx.beginPath(); ctx.ellipse(bx, ty - 0.12 * s, 0.38 * s, 0.26 * s, 0, 0, 6.283); shape(ctx, _mixHex(C.paars, '#FFFFFF', 0.3), C.paars, 1.5); tp.push([bx, ty - 0.12 * s]);
    if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; circ(ctx, bx + 0.3 * s, ty - 0.48 * s, 0.15 * s, Z9.ca); ctx.restore(); } }
  ctx.restore(); return { tropo: [x + w * 0.5, ty], troponine: tp[0] || [x, y], plek: [x + 3 * 0.62 * s, y + 0.3 * s] }; }
function reticulum(ctx, x, y, w, h, o = {}) { const { a = 1, ca = 0, t = 0, terug = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const per = clamp(h * 2.2, 120, 260); const top = y - h / 2, bot = y + h / 2; const SR = '#7FB7D6'; const kousEind = x + w * 0.86;
  const J = []; for (let xx = x; xx < kousEind; xx += per) { if (xx + per * 0.22 < kousEind) J.push(xx + per * 0.22); if (xx + per * 0.78 < kousEind) J.push(xx + per * 0.78); }
  // achterkant van de kous (gedimd), achter de fibril
  const buis = (x0, x1, j, voor) => { const ph = j / 5 * Math.PI + (voor ? 0 : Math.PI); const yy = y - Math.cos(ph) * (h / 2 + h * 0.06); ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(lerp(x0, x1, 0.33), yy + h * 0.07 * (j % 2 ? 1 : -1), lerp(x0, x1, 0.66), yy - h * 0.07 * (j % 2 ? 1 : -1), x1, yy); ctx.stroke(); };
  ctx.strokeStyle = rgba(SR, 0.3); ctx.lineWidth = Math.max(2, h * 0.05); for (let i = 0; i < J.length - 1; i++) for (let j = 1; j < 5; j++) buis(J[i] + 6, J[i + 1] - 6, j, false);
  // myofibril als ronde staaf met banden
  roundRect(ctx, x, top, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1.2);
  ctx.save(); roundRect(ctx, x, top, w, h, h / 2); ctx.clip(); for (let xx = x; xx < x + w; xx += per) { ctx.fillStyle = rgba('#5A2A26', 0.45); ctx.fillRect(xx + per * 0.22, top, per * 0.56, h); ctx.fillStyle = rgba('#F2F2EE', 0.35); ctx.fillRect(xx - 1, top, 2, h); }
  ctx.restore();
  // voorkant van de kous: buisjes, kraag, cisternen als halve ringen voor de fibril
  ctx.strokeStyle = rgba(SR, 0.9); ctx.lineWidth = Math.max(2, h * 0.06); for (let i = 0; i < J.length - 1; i++) { for (let j = 1; j < 5; j++) buis(J[i] + 6, J[i + 1] - 6, j, true);
    if (i % 2 === 0) { const m = (J[i] + J[i + 1]) / 2; ctx.beginPath(); ctx.ellipse(m, y, (J[i + 1] - J[i]) * 0.07, h / 2 + h * 0.04, 0, -Math.PI / 2, Math.PI / 2, true); ctx.stroke(); } }
  const cis = [], tt = []; const g = Math.max(4, h * 0.08);
  J.forEach(j => { for (const c of [j - g, j + g]) { ctx.beginPath(); ctx.ellipse(c, y, Math.max(3, h * 0.05), h / 2 + h * 0.1, 0, -Math.PI / 2, Math.PI / 2, true); ctx.strokeStyle = rgba(SR, 1); ctx.lineWidth = Math.max(5, h * 0.09); ctx.stroke(); cis.push(c); }
    // T-buisje: instulping van het celmembraan van boven, tussen de twee cisternen
    ctx.strokeStyle = rgba(C.line, 0.95); ctx.lineWidth = Math.max(2.5, h * 0.05); ctx.beginPath(); ctx.moveTo(j, top - h * 0.55); ctx.lineTo(j, bot + h * 0.12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(j - h * 0.18, top - h * 0.55); ctx.quadraticCurveTo(j, top - h * 0.5, j + h * 0.18, top - h * 0.55); ctx.stroke(); tt.push(j); });
  const u0 = clamp(ca - terug, 0, 1);
  if (u0 > 0.01) cis.forEach((c, ci) => { for (let i = 0; i < 6; i++) { const sd = ci * 13 + i; const u = u0 * clamp(1.2 - hash(sd) * 0.4, 0, 1); const by0 = y + (i % 2 ? -1 : 1) * (h / 2 + h * 0.06), by1 = y + (hash(sd * 7.7) - 0.5) * h * 0.75;
    circ(ctx, lerp(c, c + (hash(sd * 5) - 0.5) * per * 0.35, u), lerp(by0, by1, u) + Math.sin(t * 3 + sd) * 1.5, Math.max(2.5, h * 0.05), Z9.ca); } });
  ctx.restore(); return { cisternen: cis, ttubuli: tt }; }
