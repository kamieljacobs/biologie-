
// ===================================================================================================
// Hoofdstuk 3 — De huid (gerichte ronde, 26 okt 2026). Segmenten h01–h08 en vraag hq04.
// Nieuw object voor de bibliotheek: huidBlok (huid in doorsnede, schematisch, niet op schaal).
// Recept (bronnen in bron/bronnen.md): opperhuid dun (dunne huid ± 0,1 mm), lederhuid 1–2 mm, onderhuids
// bindweefsel wisselend dik; hier vereenvoudigd tot ± 1 : 4 : 3,5 zodat de opperhuid zichtbaar blijft.
//  - opperhuid: hoornlaag = platte dode cellen zonder kern (bovenaan schilferend); daaronder levende lagen die
//    naar boven platter worden; kiemlaag = één rij cellen met kern op een golvende grens (lederhuidpapillen).
//    De opperhuid heeft geen bloedvaten: haarvatlussen stoppen in de papillen.
//  - lederhuid: bindweefsel (collageen golvend), oppervlakkig en diep vaatnet met haarvatlussen in de papillen;
//    haarzakje schuin, met talgklier aan de kant van het haarspiertje; haarspiertje van het haarzakje naar de
//    papillaire laag; zweetklier = kluwen diep in de lederhuid, buis kronkelt naar een porie; zintuigen:
//    vrije zenuwuiteinden (pijn, warmte, koude) tot in de opperhuid, tastlichaampje in een papil, druklichaampje diep.
//  - onderhuids bindweefsel: vetcellen als veelhoeken van wisselende grootte (geen raster van gelijke rondjes).
//  Bekende fouten: bloedvaten in de opperhuid; zweetklier die in het vet 'zwemt' zonder buis; talgklier los
//  van het haarzakje; haar dat recht omhoog uit een recht gat steekt; vet als effen gele laag.
// Ontwerpmaat 800 × 700; o.vat −1 (nauw) … 0 … 1 (wijd), o.zweet 0..1, o.kip 0..1 (kippenvel),
// o.focus = 'hoorn'|'kiem'|'opper'|'leder'|'vat'|'zweet'|'talg'|'haar'|'zin'|'vet'|null (de rest gaat naar 35 %).
// Geeft ankerpunten terug (schermcoördinaten) voor namen.
// ===================================================================================================
const HUIDK = { hoorn: '#E6CDB4', levend: '#C99A80', levendR: '#DDB59C', leder: '#5E4652', lederL: '#6E5260', collageen: '#B88A92',
  vet: '#CDBB86', vetR: '#DCCB9A', vetGrond: '#6B4B3E', slag: '#D9483E', ader: '#8E3A40', haar: '#3A2418', haarZak: '#A07862',
  talg: '#D9C27A', spier: '#B36A5E', buis: '#AFC0D0', zenuw: '#C9D2DE' };
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
const _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function huidBlok(ctx, X, Y, w, o = {}) {
  const { a = 1, t = 0, vat = 0, zweet = 0, kip = 0, focus = null, rood = 0, bleek = 0, deel = 1, volg = 0, isoleer = 0 } = o; if (a <= 0.01) return {};
  const s = w / 800, D = (k) => (focus && focus !== k ? 0.35 : 1);
  ctx.save(); ctx.translate(X, Y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const bump = (x) => kip * 9 * Math.exp(-Math.pow((x - 262) / 34, 2));            // kippenvel: bultje rond de haaropening
  const top = (x) => 60 + Math.sin(x * 0.02) * 2 - bump(x);
  const bm = (x) => 150 - 16 * Math.pow(0.5 + 0.5 * Math.cos((x - 70) / 110 * 6.283), 2);   // grens opperhuid/lederhuid (papillen)
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 800, 700); ctx.clip();
  // ---- onderhuids bindweefsel met vet ----
  ctx.save(); ctx.globalAlpha *= D('vet'); ctx.fillStyle = HUIDK.vetGrond; ctx.fillRect(0, 470, 800, 230);
  for (const [cx, cy, r] of _huidVet) { blob(ctx, cx, cy, r * 1.1, r * 0.82, 0.08, cx * 0.1, 0); shape(ctx, HUIDK.vet, HUIDK.vetR, 2); }
  if (isoleer > 0.01) { ctx.globalAlpha *= isoleer; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(3, 472, 794, 225); }
  ctx.restore();
  // ---- lederhuid ----
  ctx.save(); ctx.globalAlpha *= D('leder') === 1 || ['vat', 'zweet', 'talg', 'haar', 'zin'].includes(focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, 470); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 470); ctx.closePath(); ctx.fillStyle = HUIDK.leder; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = HUIDK.lederL; ctx.beginPath(); ctx.moveTo(0, 230); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 230); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 12; i++) { const yy = 190 + i * 24, ph = hash(i * 7.1) * 6.28; ctx.strokeStyle = rgba(HUIDK.collageen, 0.22); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = -10; x <= 810; x += 10) { const py = yy + Math.sin(x / 40 + ph) * 6; x === -10 ? ctx.moveTo(x, py) : ctx.lineTo(x, py); } ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // bloedvaten: diep vaatnet (y 430), oppervlakkig vaatnet (y 205) en haarvatlussen in elke papil
  const vr = vat >= 0 ? 1 + 1.3 * vat : 1 - 0.65 * -vat, flow = vat >= 0 ? 1 + vat : 1 + 0.7 * vat;
  ctx.save(); ctx.globalAlpha *= D('vat');
  const buis = (pts, r, col, n, sp) => { ctx.strokeStyle = col; ctx.lineWidth = 2 * r; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = Math.max(1, 2 * r - 5); ctx.stroke();
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    for (let j = 0; j < n; j++) { let u = ((j / n + t * sp / L * 60) % 1) * L, i = 0; while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++; } const f = u / seg[i], px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f);
      ctx.beginPath(); ctx.ellipse(px, py, Math.min(r * 0.8, 6), Math.min(r * 0.5, 4), 0.4, 0, 6.283); ctx.fillStyle = '#E07A6A'; ctx.fill(); } };
  buis([[-10, 432], [800 + 10, 438]], 11, HUIDK.slag, 14, 1.2); buis([[810, 452], [-10, 455]], 13, HUIDK.ader, 12, 0.8);
  buis([[150, 440], [158, 330], [150, 212]], 6 * Math.sqrt(vr), HUIDK.slag, 4, 1.2 * flow); buis([[690, 212], [702, 330], [694, 448]], 7 * Math.sqrt(vr), HUIDK.ader, 4, 0.9 * flow);
  buis([[-10, 205], [810, 210]], 6 * vr, HUIDK.slag, Math.round(10 * Math.max(0.4, flow)), 1.3 * flow);
  for (let k = 0; k < 8; k++) { const px = 70 + k * 110; if (px > 800) break; const tp = bm(px) + 10, dx = 6; ctx.strokeStyle = huidMix(HUIDK.ader, HUIDK.slag, 0.5); ctx.lineWidth = 2 * Math.max(1.6, 3.4 * vr); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(px - dx, 210); ctx.lineTo(px - dx, tp + dx); ctx.arc(px, tp + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, 210); ctx.stroke(); }
  ctx.restore();
  // zweetklier: kluwen diep in de lederhuid, buis kronkelt naar een porie
  ctx.save(); ctx.globalAlpha *= D('zweet');
  const kluwen = []; for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 6.283 * 3.2; kluwen.push([600 + Math.cos(an) * (16 + 12 * Math.sin(u * 9)), 452 + Math.sin(an) * (12 + 6 * Math.cos(u * 7)) - u * 6]); }
  const gang = [[600, 440], [592, 380], [606, 320], [596, 260], [608, 200], [600, bm(600) + 4]]; for (let yy = bm(600); yy >= top(612); yy -= 10) gang.push([606 + Math.sin(yy * 0.25) * 7, yy]); gang.push([610, top(610)]);
  const pad = kluwen.concat(gang); ctx.strokeStyle = HUIDK.buis; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.25 + 0.6 * zweet); ctx.lineWidth = 4; ctx.stroke();
  if (zweet > 0.01) { for (let j = 0; j < 7; j++) { const u = (j / 7 + t * 0.12) % 1, i = Math.floor(u * (pad.length - 1)); circ(ctx, pad[i][0], pad[i][1], 3.2, rgba(C.teal, zweet)); }
    const dr = 4 + 10 * zweet; ctx.beginPath(); ctx.ellipse(610, top(610) - dr * 0.55, dr, dr * 0.65, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.75), lighten(C.teal, 0.3), 1.5); }
  ctx.restore();
  // haarzakje met haar, talgklier en haarspiertje
  const oX = 262, oY = top(262), bX = 340, bY = 468; const ang = lerp(0.42, 1.25, kip);   // hoek van het haar boven de huid t.o.v. het oppervlak
  ctx.save(); ctx.globalAlpha *= D('haar');
  ctx.strokeStyle = HUIDK.haarZak; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(oX + 4, oY + 14); ctx.lineTo(bX, bY - 14); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(bX + 2, bY - 4, 22, 18, 0.2, 0, 6.283); ctx.fillStyle = HUIDK.haarZak; ctx.fill();
  ctx.strokeStyle = HUIDK.haar; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bX, bY - 8); ctx.lineTo(oX, oY); ctx.lineTo(oX - Math.cos(ang) * 120, oY - Math.sin(ang) * 120); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('talg'); for (const [dx, dy, r] of [[34, 150, 17], [44, 172, 15], [30, 190, 13]]) { blob(ctx, oX + dx + 10, oY + dy - 40, r, r * 0.8, 0.1, dx, 0); shape(ctx, HUIDK.talg, lighten(HUIDK.talg, 0.25), 1.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('haar'); const mA = [lerp(oX, bX, 0.55) + 10, lerp(oY, bY, 0.55)], mB = [372, bm(372) + 6];
  ctx.strokeStyle = huidMix(HUIDK.spier, '#E8A090', kip); ctx.lineWidth = 11 + 9 * kip; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mA[0], mA[1]); ctx.quadraticCurveTo(lerp(mA[0], mB[0], 0.5) + 12 * (1 - kip), lerp(mA[1], mB[1], 0.5), mB[0], mB[1]); ctx.stroke(); ctx.restore();
  // zintuigen: vrije zenuwuiteinden, tastlichaampje (papil), druklichaampje (diep)
  const zc = focus === 'zin' ? C.teal : HUIDK.zenuw;
  ctx.save(); ctx.globalAlpha *= D('zin'); ctx.strokeStyle = zc; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(470, 470); ctx.bezierCurveTo(480, 360, 460, 260, 476, 170); ctx.stroke();
  for (const [ex, ey] of [[452, 112], [478, 104], [500, 118]]) { ctx.beginPath(); ctx.moveTo(476, 170); ctx.quadraticCurveTo((476 + ex) / 2 + 6, (170 + ey) / 2, ex, ey); ctx.stroke(); }
  const mx = 510, my = bm(510) + 12; ctx.beginPath(); ctx.moveTo(476, 230); ctx.quadraticCurveTo(500, 200, mx, my + 10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(mx, my, 7, 13, 0, 0, 6.283); shape(ctx, rgba(zc, 0.35), zc, 2); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(mx - 6, my + k * 6); ctx.lineTo(mx + 6, my + k * 6); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(470, 450); ctx.quadraticCurveTo(640, 470, 720, 420); ctx.stroke();
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(738, 410, 26 - k * 6, 15 - k * 3.4, -0.4, 0, 6.283); shape(ctx, k === 0 ? rgba(zc, 0.18) : 'rgba(0,0,0,0)', zc, 2); }
  ctx.restore();
  // ---- opperhuid ----
  ctx.save(); const fo = (focus === 'opper' || focus === 'hoorn' || focus === 'kiem' || !focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, top(0)); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, top(x)); for (let x = 800; x >= 0; x -= 4) ctx.lineTo(x, bm(x)); ctx.closePath();
  ctx.save(); ctx.globalAlpha *= fo; ctx.fillStyle = huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek); ctx.fill(); ctx.clip();
  // levende lagen: cellen in rijen, naar boven platter; kiemlaag = onderste rij met kern
  const kiemF = focus === 'kiem' ? 1 : (focus === 'hoorn' ? 0.35 : 1), hoornF = focus === 'kiem' ? 0.35 : 1;
  for (let r = 0; r < 5; r++) { const hgt = [13, 12, 11, 9, 7][r], wid = [15, 18, 21, 25, 30][r];
    ctx.save(); ctx.globalAlpha *= r === 0 ? kiemF : (focus === 'hoorn' || focus === 'kiem' ? 0.5 : 1);
    for (let x = -10 + (r % 2) * wid / 2; x < 810; x += wid) { const yb = bm(x) - 8 - r * (hgt + 4) * lerp(1, 0.75, r / 4); if (yb < top(x) + 26) continue;
      roundRect(ctx, x - wid / 2 + 1.5, yb - hgt / 2, wid - 3, hgt, 4); shape(ctx, huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek), HUIDK.levendR, 1.2);
      if (r < 3) { ctx.beginPath(); ctx.ellipse(x, yb, Math.min(4.5, wid * 0.22), Math.min(4, hgt * 0.3), 0, 0, 6.283); ctx.fillStyle = r === 0 ? C.kern : rgba(C.kern, 0.6); ctx.fill(); } }
    ctx.restore(); }
  // één cel volgen (goud): ontstaat in de kiemlaag door deling, schuift omhoog, wordt plat en verliest de kern
  if (volg > 0.01) { const vx = 400, u = (t * 0.07) % 1, y0 = bm(vx) - 8, y1 = top(vx) + 8, yy = lerp(y0, y1, ease(u)); const fl = lerp(1, 0.25, u), wd = lerp(16, 34, u);
    ctx.save(); ctx.globalAlpha *= volg; roundRect(ctx, vx - wd / 2, yy - 7 * fl - 2, wd, 14 * fl + 4, 4); shape(ctx, u > 0.8 ? HUIDK.hoorn : HUIDK.levend, C.goud, 2.5);
    if (u < 0.65) { ctx.beginPath(); ctx.ellipse(vx, yy, 4.5, 4 * fl + 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 1 - u / 0.65); ctx.fill(); }
    const dv = clamp((u - 0.0) / 0.12, 0, 1); if (dv < 1) { ctx.globalAlpha *= 1 - dv; roundRect(ctx, vx - 8 + dv * 16, y0 - 7, 16, 14, 4); shape(ctx, HUIDK.levend, C.goud, 2); ctx.beginPath(); ctx.ellipse(vx + dv * 16, y0, 4.5, 4, 0, 0, 6.283); ctx.fillStyle = C.kern; ctx.fill(); }
    ctx.restore(); }
  ctx.restore();
  // hoornlaag: platte dode cellen zonder kern, bovenste schilferen af
  ctx.save(); ctx.globalAlpha *= fo * hoornF; for (let r = 0; r < 4; r++) for (let x = -20 + r * 13; x < 820; x += 46) { const yy = top(x) + 3 + r * 5.5; roundRect(ctx, x, yy, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, lighten(HUIDK.hoorn, 0.2), 1); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k / 3) % 1, fx = 120 + k * 250 + u * 30, fy = top(fx) + 2 - u * 34; ctx.save(); ctx.globalAlpha *= (1 - u) * 0.9; ctx.translate(fx, fy); ctx.rotate(-0.3 * u); roundRect(ctx, -20, -2, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, null); ctx.restore(); }
  ctx.restore();
  ctx.restore();
  ctx.restore();
  // rand van het blok
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5 / s; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 700); ctx.lineTo(800, 700); ctx.lineTo(800, 60); ctx.stroke();
  ctx.restore();
  const P = (x, y) => [X + x * s, Y + y * s];
  return { X, Y, P, s, oppTop: Y + 60 * s, oppBot: Y + 150 * s, lederBot: Y + 470 * s, bot: Y + 700 * s, right: X + w, hoorn: P(40, 66), kiem: P(40, 140), vat: P(150, 330), vatOpp: P(20, 205), zweet: P(600, 452), porie: P(610, 50),
    talg: P(305, 170), haar: P(338, 470), haarTop: P(262, 40), spier: P(372, 220), tast: P(510, 140), vrij: P(478, 104), druk: P(738, 410), vet: P(400, 590) };
}
function laagHaak(ctx, x, y0, y1, naam, meta, a = 1, col = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y0 + 3); ctx.lineTo(x + 12, y0 + 3); ctx.lineTo(x + 12, y1 - 3); ctx.lineTo(x, y1 - 3); ctx.stroke(); ctx.restore();
  naamBij(ctx, naam, meta, x + 30, (y0 + y1) / 2 + (meta ? -4 : 12), a, 'left', C.text); }
function schemaNoot(ctx, a = 1) { if (a > 0.01) metaText(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 60, 866, C.grain, 'left', 24); }
// buitenkant: park met pad, parallax; k = 0 warm, 1 koude dag
function parkGrond(ctx, t, schuif, k = 0) {
  ctx.fillStyle = huidMix(C.bgMacroSky, '#2A3B57', k); ctx.fillRect(0, 0, W, H);
  if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; for (let i = 0; i < 40; i++) { const x = (hash(i * 3.3) * W + Math.sin(t * 0.6 + i) * 20) % W, y = (hash(i * 5.1) * 760 + t * 40 * (0.6 + hash(i))) % 760; circ(ctx, x, y, 2.5 + hash(i * 9) * 2, rgba('#F2F2EE', 0.7)); } ctx.restore(); }
  const laag = (yb, amp, col, sp, seed) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, yb - amp * (0.5 + 0.5 * Math.sin((x + schuif * sp) / 230 + seed))); ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); };
  laag(560, 70, huidMix(C.bgMacroHill, '#3E5560', k), 0.15, 1);
  for (let i = -1; i < 9; i++) { const x = ((i * 260 - schuif * 0.45) % 2340 + 2340) % 2340 - 210, yb = 700; ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 8, yb - 120, 16, 120); blob(ctx, x, yb - 170, 70, 80, 0.06, i, 0); shape(ctx, huidMix('#35573F', '#5E7470', k), null); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k * 0.6; blob(ctx, x - 10, yb - 215, 46, 22, 0.1, i, 0); shape(ctx, '#E6EEF2', null); ctx.restore(); } }
  ctx.fillStyle = huidMix(C.bgMacroFront, '#6E8686', k * 0.8); ctx.fillRect(0, 700, W, H - 700);
  ctx.fillStyle = huidMix('#7A6A50', '#8E9496', k * 0.7); ctx.fillRect(0, 770, W, 60);
  for (let i = 0; i < 30; i++) { const x = ((i * 97 - schuif) % W + W) % W; ctx.fillStyle = rgba('#000000', 0.12); ctx.fillRect(x, 790 + (i % 3) * 12, 26, 4); }
}
function zweetDruppel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.quadraticCurveTo(x + r, y - r * 0.2, x, y + r * 0.9); ctx.quadraticCurveTo(x - r, y - r * 0.2, x, y - r * 1.6); shape(ctx, rgba(C.teal, 0.8), lighten(C.teal, 0.35), 1.2); ctx.restore(); }
function huidH2O(ctx, x, y, r = 7, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); circ(ctx, 0, 0, r, rgba(C.teal, 0.85), lighten(C.teal, 0.3), 1.2); circ(ctx, -r * 0.9, r * 0.75, r * 0.5, '#E6F0F8'); circ(ctx, r * 0.9, r * 0.75, r * 0.5, '#E6F0F8'); ctx.restore(); }
function warmPijl(ctx, x, y, len, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; ctx.lineTo(x + Math.sin(u * 12) * 6, y - u * len); } ctx.stroke(); arrow(ctx, x, y - len + 10, x, y - len - 6, C.koraal, 1, 4); ctx.restore(); }
// Noor (zijaanzicht) met blos (rood) of bleek (koud): de huidtint van het castpersonage schuift maar een klein stukje
function noorHuid(ctx, x, y, h, o, rood = 0, bleek = 0) {
  const P0 = CAST.noor, oud = P0.huid; P0.huid = huidMix(huidMix(oud, '#D98A72', 0.22 * rood), '#E8D2C2', 0.3 * bleek);
  let r; try { r = persoon(ctx, 'noor', x, y, h, o); } finally { P0.huid = oud; }
  if (rood > 0.01 && r.hoofd) { const hd = r.hoofd, k = o.kijk || 1; ctx.save(); ctx.globalAlpha *= 0.35 * rood; ctx.beginPath(); ctx.ellipse(hd.x + k * hd.r * 0.32, hd.y + hd.r * 0.28, hd.r * 0.26, hd.r * 0.17, 0, 0, 6.283); ctx.fillStyle = '#D9483E'; ctx.fill(); ctx.restore(); }
  return r; }


Object.assign(SCENES, {
  // h01 · Macro: Noor rent een rondje (warm: rood, zweet), daarna een koude dag (bleek, kippenvel in een zoomcirkel)
  h01(ctx, t, q) {
    const tK = q.at('koude'), k = ramp(t, tK - 0.2, 1.6), tN = q.at('Noor');
    const ren = 1 - ramp(t, tK - 0.4, 1.2); const v = gangSnelheid('noor', 520, 'ren');
    const tStop = tK + 0.4, schuif = t > tN ? (Math.min(t, tStop) - tN) * v + (t > tStop ? v * 0.6 * (1 - Math.exp(-(t - tStop) * 1.6)) : 0) : 0;
    parkGrond(ctx, t, schuif, k);
    const rood = q.on('rood', 1, 1.2) * (1 - k), zw = q.on('zweten', 1, 0.8) * (1 - k), bleek = q.on('bleek', 1, 1);
    const r = noorHuid(ctx, 760, 820, 520, { zij: true, kijk: 1, gang: ren > 0.5 ? 'ren' : undefined, t: t - tN, uit: k > 0.5 ? 'neutraal' : 'blij', outfit: 'sport', a: ramp(t, tN - 0.6, 0.6) }, rood, bleek);
    if (zw > 0.01 && r.hoofd) { const hd = r.hoofd; for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; zweetDruppel(ctx, hd.x + hd.r * (0.05 + 0.3 * i), hd.y - hd.r * 0.25 + u * hd.r * 0.9, 7, zw * (1 - u)); } }
    if (k > 0.01 && r.hoofd) { const hd = r.hoofd; for (let i = 0; i < 2; i++) { const u = ((t - tK) * 0.35 + i / 2) % 1; ctx.save(); ctx.globalAlpha *= k * (1 - u) * 0.5; blob(ctx, hd.x + hd.r * 1.2 + u * 80, hd.y + hd.r * 0.4 - u * 24, 16 + u * 24, 10 + u * 13, 0.1, i, t); shape(ctx, '#E6EEF2', null); ctx.restore(); } }
    const tp = q.on('zevenendertig', 1); if (tp > 0.01) { ctx.save(); ctx.globalAlpha *= tp; roundRect(ctx, 1380, 110, 440, 124, 18); shape(ctx, rgba(C.bgSchema, 0.92), k > 0.5 ? C.teal : C.koraal, 2);
      metaText(ctx, 'TEMPERATUUR BINNENIN', 1600, 156, C.grain, 'center', 24); text(ctx, 'rond 37 °C', 1600, 210, fTekst(44, 700), C.text, 'center'); ctx.restore(); }
    if (r.hoofd) { const hd = r.hoofd; naamBij(ctx, 'rood', 'meer bloed in de huid', hd.x - hd.r * 1.4, hd.y - hd.r * 1.9, rood, 'right', C.koraal); naamBij(ctx, 'zweet', null, hd.x + hd.r * 1.6, hd.y + hd.r * 0.2, zw, 'left', C.teal);
      naamBij(ctx, 'bleek', 'minder bloed in de huid', hd.x - hd.r * 1.4, hd.y - hd.r * 1.9, bleek, 'right', C.text); }
    if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; metaText(ctx, 'OP EEN KOUDE DAG', 60, 110, C.grain, 'left', 28); ctx.restore(); }
    const tZc = q.at('bleek') - 0.3, kp = ramp(t, tZc, 0.7); if (kp > 0.01 && r.handR) { const sx = lerp(r.heup.x, r.handR.x, 0.6), sy = lerp(r.heup.y, r.handR.y, 0.6);
      zoomCircle(ctx, 1380, 540, 230, sx, sy, 'ONDERARM · KIPPENVEL', kp, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1140, 300, 480, 480); huidBlok(ctx, 1110, 395, 720, { t, kip: ramp(t, q.at('kippenvel'), 0.8), vat: -0.8 * ramp(t, tZc, 1) }); }); }
  },
  // h02 · Schema: huid in doorsnede, dan doorlopende zoom naar de opperhuid (hoornlaag, kiemlaag, één cel volgen)
  h02(ctx, t, q) { bg(ctx, 'schema'); const X = 160, Y = 110, Wd = 800;
    const z = ramp(t, q.at('hoornlaag') - 0.6, 1.6), Z = lerp(1, 3.2, z), fx = X + 400, fy = Y + 100, tx = lerp(fx, 760, z), ty = lerp(fy, 470, z);
    const focus = t < q.at('opperhuid') ? null : t < q.at('hoornlaag') ? 'opper' : t < q.at('kiemlaag') ? 'hoorn' : 'kiem';
    ctx.save(); ctx.beginPath(); ctx.rect(0, 70, W, 800); ctx.clip(); ctx.translate(tx, ty); ctx.scale(Z, Z); ctx.translate(-fx, -fy);
    const R = huidBlok(ctx, X, Y, Wd, { t, focus, volg: q.on('delen', 1, 0.8) }); ctx.restore();
    const S = (x, y) => [tx + (R.X + x * R.s - fx) * Z, ty + (R.Y + y * R.s - fy) * Z];
    const o1 = (1 - z); laagHaak(ctx, R.right + 16, R.oppTop, R.oppBot, 'opperhuid', null, q.on('opperhuid', 1) * o1, C.goud);
    laagHaak(ctx, R.right + 16, R.oppBot + 4, R.lederBot, 'lederhuid', null, 0.35 * q.on('opperhuid', 1) * o1, C.line); laagHaak(ctx, R.right + 16, R.lederBot + 4, R.bot, 'onderhuids bindweefsel', null, 0.35 * q.on('opperhuid', 1) * o1, C.line);
    const [hx, hy] = S(40, 62), [kx, ky] = S(40, 150); if (z > 0.5) { ctx.save(); ctx.globalAlpha *= ramp(z, 0.5, 0.4); metaText(ctx, 'OPPERHUID · VERGROOT', 60, 866, C.grain, 'left', 24); ctx.restore(); }
    naamBij(ctx, 'hoornlaag', 'dode, platte cellen', 60, hy - 40, q.on('hoornlaag', 1), 'left', C.text);
    naamBij(ctx, 'kiemlaag', 'hier delen cellen', 60, ky + 34, q.on('kiemlaag', 1), 'left', C.text);
    if (z < 0.05) schemaNoot(ctx, ramp(t, 0.3, 0.6));
  },
  // h03 · Schema: lederhuid en onderhuids bindweefsel, onderdelen één voor één; dan de functies van de huid
  h03(ctx, t, q) { bg(ctx, 'schema'); const X = 130, Y = 64, Wd = 880;
    const tF = q.at('beschermt'), tZ = q.at('Zweet', 3);
    const stappen = [['lederhuid', 'leder'], ['bloedvaten', 'vat'], ['zweetklieren', 'zweet'], ['talgklieren', 'talg'], ['haarzakjes', 'haar'], ['zintuigen', 'zin'], ['onderhuids', 'vet']];
    let focus = null; for (const [w, f] of stappen) if (t >= q.at(w)) focus = f; if (t >= tF - 0.2) focus = t >= tZ ? 'zweet' : null;
    const fb = ramp(t, tF - 0.2, 0.6);
    const R = huidBlok(ctx, X, Y, Wd, { t, focus, zweet: q.on('Zweet', 3, 0.8) }); const L = (x, y) => [R.X + x * R.s, R.Y + y * R.s];
    laagHaak(ctx, R.right + 16, R.oppTop, R.oppBot, 'opperhuid', null, 0.5 * (1 - fb), C.line);
    laagHaak(ctx, R.right + 16, R.oppBot + 4, R.lederBot, 'lederhuid', null, q.on('lederhuid', 1) * (1 - fb), C.goud);
    laagHaak(ctx, R.right + 16, R.lederBot + 4, R.bot, 'onderhuids bindweefsel', 'met vet', q.on('onderhuids', 1) * (1 - fb), C.goud);
    const na = (w, n = 1) => q.on(w, n) * (1 - fb), N = (s, x, y, a, al = 'left', col = C.text) => { const [px, py] = L(x, y); naamBij(ctx, s, null, px, py, a, al, col); };
    N('bloedvaten', 20, 400, na('bloedvaten'));
    N('zweetklier', 636, 528, na('zweetklieren'));
    N('talgklier', 250, 196, na('talgklieren'), 'right');
    N('haarzakje', 300, 482, na('haarzakjes'), 'right');
    const zn = na('zintuigen'); N('tast', 528, 168, zn * q.on('tast', 1), 'left', C.teal); N('druk', 738, 372, zn * q.on('druk', 1), 'center', C.teal); N('warmte · koude · pijn', 478, 30, zn * q.on('pijn', 1), 'center', C.teal);
    if (fb > 0.01) { const f = [['bescherming', 'beschermt', C.goud], ['waarnemen', 'voelt', C.teal], ['uitscheiding (zweet)', 'scheidt', C.teal], ['temperatuurregeling', 'temperatuur', C.koraal]];
      ctx.save(); ctx.globalAlpha *= fb; metaText(ctx, 'FUNCTIES VAN DE HUID', R.right + 60, 230, C.grain, 'left', 26); ctx.restore(); f.forEach(([s, w, col], i) => tag(ctx, s, R.right + 60, 310 + i * 92, col, fb * q.on(w, 1), 'left')); }
    schemaNoot(ctx);
  },
  // h05 · Schema: zweetdruppel op de huid (vergroot) die verdampt; warmte gaat uit de huid naar de verdampende watermoleculen
  h05(ctx, t, q) { bg(ctx, 'schema'); const X = -80, Y = 360, Wd = 2080;
    huidBlok(ctx, X, Y, Wd, { t, focus: 'opper' });
    const sy = Y + 60 * Wd / 800, dx = 960;
    const tV = q.at('verdampt'), tD = q.at('Druipt'), vd = ramp(t, tV, 0.8), dr = ramp(t, tD, 0.6);
    const R0 = 150 * (1 - 0.3 * vd * (1 - dr)); ctx.beginPath(); ctx.ellipse(dx, sy - R0 * 0.5, R0, R0 * 0.55, 0, Math.PI, 0); ctx.lineTo(dx + R0, sy); ctx.lineTo(dx - R0, sy); ctx.closePath(); shape(ctx, rgba(C.teal, 0.45 * (1 - dr)), rgba(lighten(C.teal, 0.3), 1 - dr), 2.5);
    for (let i = 0; i < 12; i++) { const ph = hash(i * 3.7) * 3.1, rr = 0.25 + 0.6 * hash(i * 1.9), bx = dx + Math.cos(ph + 3.14) * R0 * rr, by = sy - 18 - Math.abs(Math.sin(ph)) * R0 * 0.45 * rr;
      const u = ((t - tV) * 0.22 + i / 12) % 1, lv = t > tV && u > 0.55, uu = (u - 0.55) / 0.45;
      if (dr > 0.99) continue; huidH2O(ctx, bx + (lv ? uu * 220 * (hash(i) - 0.5) : 0), by - (lv ? uu * 330 : 0), 14, (1 - dr) * (lv ? 1 - uu : 1), (lv ? uu * 4 : 0) + i); }
    const wa = ramp(t, q.at('warmte', 1), 0.6) * (1 - dr); for (let i = -2; i <= 2; i++) warmPijl(ctx, dx + i * 56, sy + 120, 120, wa * (0.6 + 0.4 * Math.sin(t * 3 + i)));
    naamBij(ctx, 'warmte uit je huid', null, dx + 200, sy - 40, wa, 'left', C.koraal);
    tag(ctx, 'verdampen kost warmte: je huid koelt af', 960, 170, C.koraal, vd * (1 - dr));
    if (dr > 0.01) { const u = clamp((t - tD) / 2.2, 0, 1), px = lerp(dx, 2050, ease(u)), py = sy - 30; zweetDruppel(ctx, px, py, 46, dr); tag(ctx, 'zweet dat eraf druipt, koelt niet', 960, 170, C.koraal, dr); }
    metaText(ctx, 'ZWEETDRUPPEL OP DE HUID · VERGROOT', 60, 866, C.grain, 'left', 24);
  },
  // h06 · Schema: regelkring bij warmte (links) en de huid met wijdere vaten en zweet (rechts)
  h06(ctx, t, q) { bg(ctx, 'schema');
    const nodes = [{ t: 'temperatuur', s: 'te hoog', rol: 'GEREGELDE WAARDE', col: C.koraal }, { t: 'zintuigen', s: 'huid en hersenen', rol: 'SENSOR', col: C.teal }, { t: 'hypothalamus', s: 'vergelijkt met normwaarde', rol: 'REGELCENTRUM', col: C.goud }, { t: 'huid', s: 'vaten wijder · zweten', rol: 'EFFECTOR', col: '#B36A5E' }];
    nodes[0].a = ramp(t, 0.2, 0.6); nodes[1].a = q.on('Zintuigen', 1); nodes[2].a = q.on('hypothalamus', 1); nodes[3].a = q.on('zenuwimpulsen', 1);
    kringSchema(ctx, 540, 460, { nodes, rx: 330, ry: 270, bw: 340, bh: 110, arr: [q.on('Zintuigen', 1), q.on('regelcentrum', 1), q.on('zenuwimpulsen', 1), q.on('daalt', 1)], minus: q.on('terugkoppeling', 1), pulse: t > q.at('daalt') ? (t / 5) % 1 : -1 });
    const wd = ramp(t, q.at('wijder'), 1.6), zw = ramp(t, q.at('zweetklieren'), 1);
    const R = huidBlok(ctx, 1110, 120, 700, { t, vat: wd, zweet: zw, rood: Math.max(wd * 0.6, q.on('rood', 1, 1)) }); const L = (x, y) => [R.X + x * R.s, R.Y + y * R.s];
    naamBij(ctx, 'bloedvaten wijder', 'meer warm bloed vlak onder de huid', R.X, R.bot + 44, ramp(t, q.at('wijder'), 0.6), 'left', C.koraal);
    for (let i = 0; i < 4; i++) warmPijl(ctx, 1170 + i * 170, R.oppTop - 16, 70, q.on('geeft', 1) * (0.55 + 0.45 * Math.sin(t * 2.4 + i)));
    naamBij(ctx, 'meer zweet', null, R.porie[0] + 30, R.porie[1] - 40, zw, 'left', C.teal);
    metaText(ctx, 'HUID BIJ WARMTE · SCHEMATISCH', 1810, 866, C.grain, 'right', 24);
  },
  // h07 · Schema: dezelfde regelkring bij kou; huid met nauwere vaten en kippenvel; vacht tegenover jouw huid; vet isoleert; rillen
  h07(ctx, t, q) { bg(ctx, 'schema');
    const tV = q.at('vacht'), tI = q.at('isoleert'), vp = ramp(t, tV - 0.2, 0.7) * (1 - ramp(t, tI - 0.3, 0.6)), ri = q.on('rillen', 1);
    const nodes = [{ t: 'temperatuur', s: 'te laag', rol: 'GEREGELDE WAARDE', col: C.teal }, { t: 'zintuigen', s: 'huid en hersenen', rol: 'SENSOR', col: C.teal }, { t: 'hypothalamus', s: 'vergelijkt met normwaarde', rol: 'REGELCENTRUM', col: C.goud }, { t: 'huid en spieren', s: ri > 0.5 ? 'vaten nauwer · rillen' : 'vaten nauwer · kippenvel', rol: 'EFFECTOR', col: '#B36A5E' }];
    kringSchema(ctx, 540, 460, { a: 1 - vp, nodes, rx: 330, ry: 270, bw: 340, bh: 110, arr: [1, 1, 1, 1], minus: 1 });
    const nw = ramp(t, q.at('nauwer'), 1.6), kp = ramp(t, q.at('kippenvel'), 1.2), iso = q.on('isoleert', 1) * (1 - ri);
    const R = huidBlok(ctx, 1110, 120, 700, { t, vat: -nw, kip: kp, bleek: ramp(t, q.at('bleek'), 1), isoleer: iso, focus: iso > 0.5 ? 'vet' : null }); const L = (x, y) => [R.X + x * R.s, R.Y + y * R.s];
    naamBij(ctx, 'bloedvaten nauwer', 'minder warmteverlies', R.X, R.bot + 44, ramp(t, q.at('nauwer'), 0.6) * (1 - iso) * (1 - ri), 'left', C.teal);
    { const [px, py] = L(400, 250); naamBij(ctx, 'haarspiertje', 'zet het haar rechtop', px, py, kp * (1 - iso), 'left', C.text); }
    { const [px, py] = L(400, 600); naamBij(ctx, 'vet isoleert', null, px, py, iso, 'center', C.goud); }
    if (vp > 0.01) { ctx.save(); ctx.globalAlpha *= vp;
      const vel = (x, n, lang, lab, sub) => { const y0 = 520; roundRect(ctx, x, y0, 400, 70, 12); shape(ctx, HUIDK.levend, HUIDK.levendR, 1.5);
        if (n > 20) { roundRect(ctx, x + 4, y0 - 150, 392, 148, 10); ctx.fillStyle = rgba(C.teal, 0.14); ctx.fill(); metaText(ctx, 'STILSTAANDE LUCHT', x + 200, y0 - 172, C.teal, 'center', 24); }
        for (let i = 0; i < n; i++) { const hx = x + 14 + i * (372 / (n - 1)), an = 1.25 + (hash(i * 2.1) - 0.5) * 0.3, L2 = lang * (0.85 + 0.3 * hash(i * 4.3)); ctx.strokeStyle = n > 20 ? '#8C6A4A' : HUIDK.haar; ctx.lineWidth = n > 20 ? 4 : 5; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(hx, y0); ctx.quadraticCurveTo(hx + Math.cos(an) * L2 * 0.6, y0 - Math.sin(an) * L2 * 0.6, hx + Math.cos(an - 0.25) * L2, y0 - Math.sin(an - 0.25) * L2); ctx.stroke(); }
        text(ctx, lab, x + 200, y0 + 130, fTekst(36, 700), C.text, 'center'); text(ctx, sub, x + 200, y0 + 172, fTekst(28), C.text2, 'center'); };
      vel(90, 46, 160, 'dier met een vacht', 'kippenvel isoleert'); vel(560, 6, 60, 'jij', 'helpt nauwelijks'); ctx.restore(); }
    if (ri > 0.01) { tag(ctx, 'rillen: je spieren maken warmte', R.X, R.bot + 70, C.koraal, ri, 'left'); }
    if (ri < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ramp(ri, 0, 0.15); metaText(ctx, 'HUID BIJ KOU · SCHEMATISCH', 1810, 866, C.grain, 'right', 24); ctx.restore(); }
  },
  // h08 · Schema: brug naar hoofdstuk 4 — de huid een beetje uitscheiding, ureum vooral via de nieren
  h08(ctx, t, q) { bg(ctx, 'schema');
    const nr = q.on('nieren', 1), dn = q.on('niet', 1);
    huidBlok(ctx, 1100, 120, 560, { t, zweet: 0.6, a: 1 - 0.5 * nr });
    naamBij(ctx, 'huid', 'een beetje uitscheiding', 1380, 680, 1 - 0.5 * nr, 'center', C.text);
    tag(ctx, 'vooral: temperatuur regelen', 1380, 800, C.koraal, q.on('temperatuur', 1) * (1 - 0.5 * nr));
    // nieren op dezelfde plek en sterkte als aan het begin van hoofdstuk 4 (s12)
    nierVorm(ctx, 420, 420, 2.2, -1, nr * (1 - 0.5 * dn)); nierVorm(ctx, 640, 420, 2.2, 1, nr * (1 - 0.5 * dn));
    naamBij(ctx, 'nieren', 'het meeste ureum', 530, 640, nr * (1 - dn), 'center', C.koraal);
    vraagteken(ctx, 530, 240, dn, 120);
  }
});
