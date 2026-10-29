// Voortplanting 3 · Anticonceptie, soa's en voortplantingstechniek — scènes per alinea (v1.0, 16 okt 2026; v1.2, 29 okt 2026: prompt v13, geen namen in beeld, minder paars, DNA palet B).
// Rode draad: de keten eisprong → bevruchting → innesteling. Lotte en dokter Kim (cold open), Sam (soa-test). Schematische doorsnede baarmoeder/eileiders/eierstokken.

// ---------- titel past op het scherm: lange filmtitel automatisch iets kleiner (alleen voor deze film) ----------
(function () { const _t = text; text = function (ctx, s, x, y, font, color, align, base) { try { if (window.FILMDATA && s === window.FILMDATA.film.title && /^700 \d+px/.test(font)) { ctx.font = font; const w = ctx.measureText(s).width; if (w > 1660) font = fTitel(Math.floor(parseInt(font.slice(4)) * 1660 / w)); } } catch (e) { } return _t(ctx, s, x, y, font, color, align, base); }; })();

// ---------- algemene helpers (zoals Gedrag 12) ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal, lw = 7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1, col = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), col, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 46, 1, C.text2, 28, 'center', 700); ctx.restore(); }
function stippen(ctx, x, y, n, k, col, a = 1, per = 10, r = 14, gap = 36, rest = '#3A4458') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap, r, i < k ? col : rest); ctx.restore(); }
function stempel(ctx, x, y, s2, col, a = 1, rot = -0.12, px = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, -w / 2, -px - 0, w, px * 1.75, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, s2, 0, px * 0.32, fTekst(px, 800), col, 'center'); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, 'rgba(242,242,238,0.95)', null); circ(ctx, x + 40, y + h + 10, 10, 'rgba(242,242,238,0.95)'); circ(ctx, x + 22, y + h + 32, 6, 'rgba(242,242,238,0.95)'); text(ctx, s, x + w / 2, y + h / 2 + px * 0.35, fTekst(px, 700), '#121A26', 'center'); ctx.restore(); }
function bubbel(ctx, x, y, s2, a = 1, px = 28, col = '#F2F2EE') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = Math.max(56, ctx.measureText(s2).width + 34); roundRect(ctx, x - w / 2, y - px - 14, w, px + 28, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 10, y + 13); ctx.lineTo(x, y + 30); ctx.lineTo(x + 10, y + 13); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 700), '#121A26', 'center'); ctx.restore(); }
function figuur(ctx, x, y, h, col = '#5A6478', o = {}) { const { a = 1, hoofd = '#C9A688' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 300; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-18, -110); ctx.moveTo(20, 0); ctx.lineTo(18, -110); ctx.stroke();
  roundRect(ctx, -48, -230, 96, 130, 30); shape(ctx, col, null); circ(ctx, 0, -262, 34, hoofd); ctx.restore(); }
const fase = (q, w, n = 1, d = 0.8) => q.on(w, n, d);

// ---------- kleuren voor de anatomie (schematisch, Schema-look) ----------
const VIRUS = '#A9B6CC'; // v1.2: virussen neutraal grijsblauw (minder paars; paars alleen voor kern, erfelijkheid, hormonen)
const VP = { weef: '#B9776A', weefL: '#D79A88', weefD: '#8E5548', holte: '#3A2230', slijm: '#E8D9A0', eicel: '#EBC9A0', zona: '#F2E6C4', zaad: '#E8ECF0', koper: '#C87533', huid: '#D9A982', rubber: '#9FD3C7', pil: '#F2D8E0' };

// ---------- cellen (v1.1, prompt v8: recepten uit de gedeelde bibliotheek lib_bio) ----------
function zaadcel(ctx, x, y, s = 1, ang = -Math.PI / 2, t = 0, a = 1, col = VP.zaad, dood = 0) { // kop met acrosoom, staart ± 10× de kop, golf van kop naar staart; dood = staart stil en grijs
  if (a <= 0.01) return; const d = dood > 0.5; zaadcelEcht(ctx, x, y, ang, d ? 0.3 : t, s * 0.6, { a, col: d ? '#6A7488' : col, slag: d ? 0 : 1.6 }); }
function eicel(ctx, x, y, r, a = 1, o = {}) { const { corona = 1 } = o; eicelEcht(ctx, x, y, r * 0.82, a, !!corona); }
function embryo(ctx, x, y, r, n = 1, a = 1, col = VP.eicel) { if (a <= 0.01) return;
  if (n === 'blast') { blastocyste(ctx, x, y, r, { a }); return; }
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(VP.zona, 0.12)); ctx.strokeStyle = VP.zona; ctx.lineWidth = Math.max(2, r * 0.1); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
  const cel = (cx, cy, rr) => { circ(ctx, cx, cy, rr, col, lighten(col, 0.4), 1.5); circ(ctx, cx, cy, rr * 0.28, rgba(C.kern, 0.7)); };
  if (n === 1) cel(x, y, r * 0.82);
  else if (n === 2) { cel(x - r * 0.4, y, r * 0.44); cel(x + r * 0.4, y, r * 0.44); }
  else if (n === 4) { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([u, v]) => cel(x + u * r * 0.36, y + v * r * 0.36, r * 0.36)); }
  else { for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + 0.2; cel(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5, r * 0.3); } }
  ctx.restore(); }
// bacterie (v1.1): gonokokken als diplokokken (oude staafjes weg)
function bacterie(ctx, x, y, s = 1, rot = 0, a = 1, col = C.koraal, dood = 0) { gonokok(ctx, x, y, s * 0.9, rot, { a, col, dood }); }
function embryoStap(ctx, x, y, r, u, a = 1) { const st = [1, 2, 4, 8, 'blast']; const i = Math.min(4, Math.floor(u * 5)); embryo(ctx, x, y, r, st[i], a); }

// ---------- schematische doorsnede vrouwelijke geslachtsorganen (vooraanzicht) ----------
function buisPt(cx, cy, s, sd, u) { const P = [[112, -118], [215, -190], [350, -160], [322, -30]]; const m = 1 - u; const bx = m * m * m * P[0][0] + 3 * m * m * u * P[1][0] + 3 * m * u * u * P[2][0] + u * u * u * P[3][0]; const by = m * m * m * P[0][1] + 3 * m * m * u * P[1][1] + 3 * m * u * u * P[2][1] + u * u * u * P[3][1]; return { x: cx + sd * bx * s, y: cy + by * s }; }
function baarmoeder(ctx, cx, cy, s = 1, o = {}) {
  const { a = 1, namen = 0, slijm = 0, naamSlijm = 0, spiraal = null, spiraalA = 0, dicht = 0, litteken = 0, littekenL = null, slijmvlies = 0, pessarium = 0, eisprongRem = 0, follikels = 2, t = 0, eierstokHl = 0, halsHl = 0 } = o;
  const P = (x, y) => [cx + x * s, cy + y * s]; const A = { eierstok: [P(-262, 18), P(262, 18)], holte: P(0, -40), hals: P(0, 150), vagina: P(0, 300), top: P(0, -170), buis: (sd, u) => buisPt(cx, cy, s, sd, u) };
  if (a <= 0.01) return A; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // ophangbandjes
  for (const sd of [-1, 1]) { ctx.strokeStyle = rgba(VP.weefL, 0.5); ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(...P(sd * 100, -70)); ctx.quadraticCurveTo(...P(sd * 190, -10), ...P(sd * 218, 14)); ctx.stroke(); }
  // eierstokken (v1.1): doorsnede met follikels uit lib_bio; groei/eis = rijping en eisprong, rem = rijping stopt
  for (const sd of [-1, 1]) { const [ox, oy] = P(sd * 262, 18); const E = o.eierstok || {}; eierstokDoorsnede(ctx, ox, oy, 56 * s, 36 * s, { n: 26, groei: E.groei ?? 0.35, eis: sd > 0 ? (E.eis || 0) : 0, t, winnaar: 3 });
    if (eierstokHl > 0.01) { ctx.save(); ctx.globalAlpha *= eierstokHl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(ox, oy, 62 * s, 42 * s, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } }
  // eileiders
  for (const sd of [-1, 1]) { // v1.1: smal bij de baarmoeder (isthmus), wijder naar de trechter (ampulla), franjes over de eierstok
    const ont = (littekenL === null ? litteken : (sd < 0 ? littekenL : litteken)); const wCol = ont > 0.01 ? _mixHex(VP.weef, '#D2453A', 0.5 * ont) : VP.weef;
    for (let k = 0; k < 30; k++) { const p = buisPt(cx, cy, s, sd, k / 30), q2 = buisPt(cx, cy, s, sd, (k + 1) / 30), u = (k + 0.5) / 30; ctx.strokeStyle = wCol; ctx.lineWidth = lerp(13, 30, Math.pow(u, 1.3)) * s * (1 + 0.15 * ont); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q2.x, q2.y); ctx.stroke(); }
    for (let k = 0; k < 30; k++) { const p = buisPt(cx, cy, s, sd, k / 30), q2 = buisPt(cx, cy, s, sd, (k + 1) / 30), u = (k + 0.5) / 30; ctx.strokeStyle = VP.holte; ctx.lineWidth = lerp(3, 12, Math.pow(u, 1.5)) * s; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q2.x, q2.y); ctx.stroke(); }
    const e = buisPt(cx, cy, s, sd, 1), ov = P(sd * 262, 18), d0 = Math.atan2(ov[1] - e.y, ov[0] - e.x); for (let k = 0; k < 7; k++) { const an = d0 + (k - 3) * 0.3; const len = (34 + 8 * Math.sin(k * 1.9)) * s, wob = Math.sin(t * 1.3 + k) * 3 * s; const ex = e.x + Math.cos(an) * len, ey = e.y + Math.sin(an) * len + wob;
      ctx.strokeStyle = wCol; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.quadraticCurveTo((e.x + ex) / 2 + Math.cos(an + 1.57) * 5 * s, (e.y + ey) / 2 + Math.sin(an + 1.57) * 5 * s, ex, ey); ctx.stroke(); ctx.strokeStyle = rgba(BIO.slijm, 0.85); ctx.lineWidth = 3 * s; ctx.stroke(); }
    const L = littekenL === null ? litteken : (sd < 0 ? littekenL : litteken);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; [0.42, 0.62].forEach((u0, i) => { const g = clamp(L * 1.5 - i * 0.3, 0, 1); const p = buisPt(cx, cy, s, sd, u0), q2 = buisPt(cx, cy, s, sd, u0 + 0.03); const an = Math.atan2(q2.y - p.y, q2.x - p.x);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(an); ctx.globalAlpha *= g; roundRect(ctx, -9 * s, -15 * s, 18 * s, 30 * s, 6 * s); shape(ctx, rgba('#EDE2DA', 0.92), '#C9B8AE', 1.5); ctx.strokeStyle = '#B8A498'; ctx.lineWidth = 1.2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(-6 * s, k * 8 * s); ctx.bezierCurveTo(-2 * s, k * 8 * s - 4 * s, 2 * s, k * 8 * s + 4 * s, 6 * s, k * 8 * s); ctx.stroke(); } ctx.restore(); }); ctx.restore(); }
    if (dicht > 0.01) { const p = buisPt(cx, cy, s, sd, 0.36), q2 = buisPt(cx, cy, s, sd, 0.4); const an = Math.atan2(q2.y - p.y, q2.x - p.x) + Math.PI / 2; ctx.save(); ctx.globalAlpha *= dicht; ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 7 * s; for (const d of [-11, 11]) { const px = p.x + Math.cos(an - Math.PI / 2) * d * s, py = p.y + Math.sin(an - Math.PI / 2) * d * s; ctx.beginPath(); ctx.moveTo(px + Math.cos(an) * 22 * s, py + Math.sin(an) * 22 * s); ctx.lineTo(px - Math.cos(an) * 22 * s, py - Math.sin(an) * 22 * s); ctx.stroke(); } ctx.restore(); } }
  // baarmoeder + hals
  ctx.beginPath(); ctx.moveTo(...P(-118, -112)); ctx.bezierCurveTo(...P(-118, -188), ...P(118, -188), ...P(118, -112)); ctx.bezierCurveTo(...P(122, -30), ...P(72, 70), ...P(42, 112)); ctx.lineTo(...P(36, 196)); ctx.lineTo(...P(-36, 196)); ctx.lineTo(...P(-42, 112)); ctx.bezierCurveTo(...P(-72, 70), ...P(-122, -30), ...P(-118, -112)); ctx.closePath(); shape(ctx, VP.weef, VP.weefD, 2);
  // vagina
  ctx.beginPath(); ctx.moveTo(...P(-38, 190)); ctx.lineTo(...P(-54, 336)); ctx.lineTo(...P(54, 336)); ctx.lineTo(...P(38, 190)); ctx.closePath(); shape(ctx, VP.weefL, VP.weefD, 2);
  ctx.beginPath(); ctx.moveTo(...P(-16, 200)); ctx.lineTo(...P(-26, 336)); ctx.lineTo(...P(26, 336)); ctx.lineTo(...P(16, 200)); ctx.closePath(); shape(ctx, VP.holte, null);
  // holte met slijmvlies
  ctx.beginPath(); ctx.moveTo(...P(-80, -112)); ctx.quadraticCurveTo(...P(0, -130), ...P(80, -112)); ctx.quadraticCurveTo(...P(40, 0), ...P(9, 104)); ctx.lineTo(...P(-9, 104)); ctx.quadraticCurveTo(...P(-40, 0), ...P(-80, -112)); ctx.closePath();
  ctx.save(); ctx.clip(); ctx.fillStyle = VP.holte; ctx.fillRect(cx - 100 * s, cy - 140 * s, 200 * s, 260 * s); ctx.restore(); ctx.strokeStyle = rgba(BIO.slijm, 0.9); ctx.lineWidth = (8 + 9 * slijmvlies) * s; ctx.stroke(); ctx.strokeStyle = rgba('#F6E2D6', 0.5); ctx.lineWidth = 1.5; ctx.stroke();
  // halskanaal + slijmprop (v1.1: taai netwerk van slijmdraden in plaats van een gele prop)
  ctx.fillStyle = VP.holte; ctx.fillRect(cx - 9 * s, cy + 100 * s, 18 * s, 100 * s);
  if (halsHl > 0.01) { ctx.save(); ctx.globalAlpha *= halsHl; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy + 150 * s, 62 * s, 62 * s, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (slijm > 0.01) { ctx.save(); ctx.globalAlpha *= slijm; ctx.beginPath(); ctx.rect(cx - 9 * s, cy + 102 * s, 18 * s, 96 * s); ctx.clip(); ctx.fillStyle = rgba(VP.slijm, 0.3); ctx.fillRect(cx - 9 * s, cy + 102 * s, 18 * s, 96 * s); ctx.strokeStyle = rgba(VP.slijm, 0.95); ctx.lineWidth = 1.6 * s;
    for (let k = 0; k < 16; k++) { const y0 = cy + (104 + k * 6) * s; ctx.beginPath(); ctx.moveTo(cx - 10 * s, y0); ctx.bezierCurveTo(cx - 3 * s, y0 + (hash(k) - 0.5) * 22 * s, cx + 3 * s, y0 + (hash(k + 7) - 0.5) * 22 * s, cx + 10 * s, y0 + (hash(k + 3) - 0.5) * 10 * s); ctx.stroke(); } ctx.restore(); }
  // spiraaltje
  if (spiraal && spiraalA > 0.01) { ctx.save(); ctx.globalAlpha *= spiraalA; ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(...P(0, -100)); ctx.lineTo(...P(0, 64)); ctx.moveTo(...P(-60, -86)); ctx.quadraticCurveTo(...P(0, -112), ...P(60, -86)); ctx.stroke();
    if (spiraal === 'koper') { ctx.strokeStyle = VP.koper; ctx.lineWidth = 4 * s; ctx.beginPath(); for (let k = 0; k <= 16; k++) { const yy = -78 + k * 8; ctx.lineTo(...P((k % 2 ? 7 : -7), yy)); } ctx.stroke(); }
    else { roundRect(ctx, cx - 9 * s, cy - 84 * s, 18 * s, 120 * s, 6 * s); shape(ctx, '#DDE3EA', '#AEB8C4', 1.5); }
    ctx.strokeStyle = 'rgba(232,236,240,0.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(...P(0, 64)); ctx.lineTo(...P(-3, 250)); ctx.moveTo(...P(0, 64)); ctx.lineTo(...P(3, 252)); ctx.stroke(); ctx.restore(); }
  // pessarium (koepeltje over de baarmoederhals)
  if (pessarium > 0.01) { ctx.save(); ctx.globalAlpha *= pessarium; ctx.beginPath(); ctx.moveTo(...P(-52, 214)); ctx.quadraticCurveTo(...P(0, 150), ...P(52, 214)); ctx.closePath(); shape(ctx, 'rgba(216,192,122,0.45)', '#D8C07A', 3); ctx.beginPath(); ctx.ellipse(cx, cy + 214 * s, 52 * s, 9 * s, 0, 0, 6.283); ctx.strokeStyle = '#D8C07A'; ctx.lineWidth = 6 * s; ctx.stroke(); ctx.restore(); }
  if (eisprongRem > 0.01) for (const sd of [-1, 1]) kruis(ctx, cx + sd * 262 * s + sd * 50 * s, cy + 18 * s - 46 * s, 10 * s, eisprongRem, C.koraal, 4);
  // namen direct bij de onderdelen
  if (namen > 0.01) { naamBij(ctx, 'baarmoeder', '', cx, cy - 200 * s, namen, 'center'); naamBij(ctx, 'eileider', '', cx + 290 * s, cy - 192 * s, namen, 'center'); naamBij(ctx, 'eierstok', '', cx + 262 * s, cy + 92 * s, namen, 'center'); naamBij(ctx, 'baarmoederhals', '', cx - 50 * s, cy + 168 * s, namen, 'right'); naamBij(ctx, 'vagina', '', cx - 66 * s, cy + 300 * s, namen, 'right'); }
  if (naamSlijm > 0.01) naamBij(ctx, 'slijmprop', '', cx - 52 * s, cy + 160 * s, naamSlijm, 'right', VP.slijm);
  ctx.restore(); return A; }

// ---------- voorwerpen en methodes ----------
function pilStrip(ctx, x, y, s = 1, a = 1, mis = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80 * s, y - 46 * s, 160 * s, 92 * s, 12 * s); shape(ctx, '#C9D2DC', '#8FA0B5', 2); for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c, px = x - 54 * s + c * 36 * s, py = y - 20 * s + r * 40 * s; if (i === mis) { circ(ctx, px, py, 13 * s, null, '#7A8494', 2); } else circ(ctx, px, py, 13 * s, VP.pil, '#B89AA4', 1.5); } ctx.restore(); }
function spuit(ctx, x, y, s = 1, ang = 0, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -60 * s, -14 * s, 100 * s, 28 * s, 5 * s); shape(ctx, 'rgba(232,236,240,0.25)', '#DDE3EA', 2); ctx.fillStyle = rgba(col, 0.7); ctx.fillRect(-20 * s, -11 * s, 58 * s, 22 * s); ctx.fillStyle = '#DDE3EA'; ctx.fillRect(-80 * s, -4 * s, 22 * s, 8 * s); ctx.fillRect(-84 * s, -16 * s, 6 * s, 32 * s); ctx.strokeStyle = '#DDE3EA'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(40 * s, 0); ctx.lineTo(86 * s, 0); ctx.stroke(); ctx.restore(); }
function staafje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.15); roundRect(ctx, -110 * s, -34 * s, 220 * s, 68 * s, 34 * s); shape(ctx, VP.huid, _donker(VP.huid, 0.15), 2); roundRect(ctx, -38 * s, -5 * s, 76 * s, 10 * s, 5 * s); shape(ctx, '#F2F2EE', '#9AA3B2', 1.5); ctx.restore(); }
function ringIcon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#DDE3EA'; ctx.lineWidth = 11 * s; ctx.beginPath(); ctx.arc(x, y, 34 * s, 0, 6.283); ctx.stroke(); ctx.strokeStyle = '#AEB8C4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 29 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
function condoom(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 24 * s, y + 30 * s); ctx.lineTo(x - 22 * s, y - 34 * s); ctx.quadraticCurveTo(x - 22 * s, y - 56 * s, x - 6 * s, y - 58 * s); ctx.lineTo(x - 6 * s, y - 68 * s); ctx.quadraticCurveTo(x, y - 74 * s, x + 6 * s, y - 68 * s); ctx.lineTo(x + 6 * s, y - 58 * s); ctx.quadraticCurveTo(x + 22 * s, y - 56 * s, x + 22 * s, y - 34 * s); ctx.lineTo(x + 24 * s, y + 30 * s); ctx.closePath(); shape(ctx, rgba(VP.rubber, 0.45), VP.rubber, 2.5); ctx.beginPath(); ctx.ellipse(x, y + 32 * s, 30 * s, 9 * s, 0, 0, 6.283); ctx.strokeStyle = VP.rubber; ctx.lineWidth = 7 * s; ctx.stroke(); ctx.restore(); }
function pessariumIcon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 46 * s, y + 10 * s); ctx.quadraticCurveTo(x, y - 60 * s, x + 46 * s, y + 10 * s); ctx.closePath(); shape(ctx, 'rgba(216,192,122,0.45)', '#D8C07A', 3); ctx.beginPath(); ctx.ellipse(x, y + 10 * s, 46 * s, 10 * s, 0, 0, 6.283); ctx.strokeStyle = '#D8C07A'; ctx.lineWidth = 6 * s; ctx.stroke(); ctx.restore(); }
function spiraalIcon(ctx, x, y, s = 1, kind = 'koper', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 46 * s); ctx.lineTo(x, y + 44 * s); ctx.moveTo(x - 38 * s, y - 36 * s); ctx.quadraticCurveTo(x, y - 56 * s, x + 38 * s, y - 36 * s); ctx.stroke();
  if (kind === 'koper') { ctx.strokeStyle = VP.koper; ctx.lineWidth = 4 * s; ctx.beginPath(); for (let k = 0; k <= 10; k++) ctx.lineTo(x + (k % 2 ? 6 : -6) * s, y - 34 * s + k * 7 * s); ctx.stroke(); } else { roundRect(ctx, x - 8 * s, y - 34 * s, 16 * s, 64 * s, 5 * s); shape(ctx, '#DDE3EA', '#AEB8C4', 1.5); } ctx.restore(); }
function pilletje(ctx, x, y, s = 1, a = 1, col = VP.pil) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 26 * s, 26 * s, 0, 0, 6.283); shape(ctx, col, _donker(col.length === 7 ? col : '#F2D8E0', 0.25), 2); ctx.strokeStyle = _donker('#F2D8E0', 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 14 * s, y); ctx.lineTo(x + 14 * s, y); ctx.stroke(); ctx.restore(); }
function capsule(ctx, x, y, s = 1, a = 1, rot = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -44 * s, -18 * s, 88 * s, 36 * s, 18 * s); ctx.save(); ctx.clip(); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-44 * s, -18 * s, 88 * s, 36 * s); ctx.fillStyle = C.teal; ctx.fillRect(-44 * s, -18 * s, 44 * s, 36 * s); ctx.restore(); roundRect(ctx, -44 * s, -18 * s, 88 * s, 36 * s, 18 * s); ctx.strokeStyle = '#AEB8C4'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function virus(ctx, x, y, r = 20, a = 1, col = VIRUS, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(1.5, r * 0.1); for (let i = 0; i < 12; i++) { const an = rot + i / 12 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.4, y + Math.sin(an) * r * 1.4); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.45, y + Math.sin(an) * r * 1.45, r * 0.12, col); } circ(ctx, x, y, r, rgba(col, 0.4), col, 2); ctx.restore(); }
function schild(ctx, x, y, s = 1, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - 90 * s); ctx.quadraticCurveTo(x + 50 * s, y - 70 * s, x + 80 * s, y - 72 * s); ctx.quadraticCurveTo(x + 84 * s, y + 40 * s, x, y + 96 * s); ctx.quadraticCurveTo(x - 84 * s, y + 40 * s, x - 80 * s, y - 72 * s); ctx.quadraticCurveTo(x - 50 * s, y - 70 * s, x, y - 90 * s); ctx.closePath(); shape(ctx, rgba(col, 0.18), col, 4); ctx.restore(); }
function buisje(ctx, x, y, s = 1, a = 1, col = VP.slijm) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14 * s, y - 70 * s, 28 * s, 130 * s, 14 * s); shape(ctx, 'rgba(232,236,240,0.2)', '#DDE3EA', 2); ctx.fillStyle = rgba(col, 0.6); ctx.fillRect(x - 11 * s, y + 10 * s, 22 * s, 40 * s); ctx.fillStyle = C.koraal; ctx.fillRect(x - 17 * s, y - 80 * s, 34 * s, 14 * s); ctx.restore(); }
function schaaltje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, 'rgba(91,164,201,0.10)', '#AFC0D0', 3); ctx.strokeStyle = 'rgba(175,192,208,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r - 12, 0, 6.283); ctx.stroke(); ctx.restore(); }
function vriezer(ctx, x, y, s = 1, a = 1, t = 0, n = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 120 * s, 180 * s, 240 * s, 30 * s); shape(ctx, '#5B6B88', '#AFC0D0', 2.5); roundRect(ctx, x - 60 * s, y - 150 * s, 120 * s, 40 * s, 10 * s); shape(ctx, '#7A8BA8', '#AFC0D0', 2);
  for (let i = 0; i < 4; i++) { const w = wander(i + 40, t, 10, 0.5); circ(ctx, x - 30 * s + i * 20 * s + w.x, y - 175 * s - i * 10 * s + w.y, (10 + i * 3) * s, 'rgba(232,236,240,0.18)'); }
  for (let i = 0; i < n; i++) { roundRect(ctx, x - 50 * s + i * 36 * s, y - 70 * s, 22 * s, 130 * s, 8 * s); shape(ctx, 'rgba(232,236,240,0.25)', '#DDE3EA', 1.5); circ(ctx, x - 39 * s + i * 36 * s, y - 40 * s, 8 * s, VP.eicel); }
  text(ctx, '−196 °C', x, y + 100 * s, fTekst(26 * s, 700), C.text, 'center'); ctx.restore(); }
function pipet(ctx, x, y, s = 1, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40 * s, -5 * s); ctx.lineTo(-260 * s, -9 * s); ctx.lineTo(-260 * s, 9 * s); ctx.lineTo(-40 * s, 5 * s); ctx.closePath(); shape(ctx, 'rgba(232,236,240,0.25)', '#DDE3EA', 2); ctx.restore(); }
function dnaIcon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // v1.2: palet B (ruggengraat grijs, basen A rood / T geel / C lichtblauw / G donkerblauw, elke sport een basepaar)
  const SQ = 'ATGCGTACCT'; ctx.lineCap = 'round'; for (let k = 2, j = 0; k < 40; k += 4, j++) { const yy = y - 70 * s + k * 3.5 * s, xa = x + Math.sin(k * 0.3) * 26 * s, xb = x + Math.sin(k * 0.3 + Math.PI) * 26 * s, xm = (xa + xb) / 2, b = SQ[j % SQ.length]; ctx.lineWidth = 3.5 * s; ctx.strokeStyle = DNA_BASE.base[b]; ctx.beginPath(); ctx.moveTo(xa, yy); ctx.lineTo(xm, yy); ctx.stroke(); ctx.strokeStyle = DNA_BASE.base[DNA_BASE.comp[b]]; ctx.beginPath(); ctx.moveTo(xm, yy); ctx.lineTo(xb, yy); ctx.stroke(); }
  ctx.lineWidth = 4 * s; for (const ph of [0, Math.PI]) { ctx.strokeStyle = DNA_BASE.rugR; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const yy = y - 70 * s + k * 3.5 * s, xx = x + Math.sin(k * 0.3 + ph) * 26 * s; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function telefoontje(ctx, x, y, s = 1, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -16 * s, -28 * s, 32 * s, 56 * s, 6 * s); shape(ctx, '#2A2F3E', '#9AA3B2', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-12 * s, -22 * s, 24 * s, 40 * s); ctx.restore(); }
function bureau(ctx, x1, x2, y) { roundRect(ctx, x1, y, x2 - x1, 26, 6); shape(ctx, '#B08A5C', '#8C6A44', 2); ctx.fillStyle = '#8C6A44'; ctx.fillRect(x1 + 20, y + 26, x2 - x1 - 40, CAPTION_Y - y - 26); }
function stelletje(ctx, x, y, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c1 = hl > 0.5 ? C.goud : '#6A7488', c2 = hl > 0.5 ? C.goud : '#7A8494'; figuur(ctx, x - 26, y, 150, c1, { hoofd: hl > 0.5 ? '#E8C890' : '#9AA3B2' }); figuur(ctx, x + 26, y, 140, c2, { hoofd: hl > 0.5 ? '#E8C890' : '#9AA3B2' }); ctx.restore(); }

// ---------- de keten: eisprong → bevruchting → innesteling ----------
function keten(ctx, x, y, o = {}) { const { a = 1, lit = [1, 1, 1], uit = 0, hapert = -1, hap = 0, t = 0, w = 300, gap = 90, namen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 180, x0 = x - (3 * w + 2 * gap) / 2;
  const box = (i) => x0 + i * (w + gap);
  for (let i = 0; i < 2; i++) { const xa = box(i) + w, xb = box(i + 1); const brk = i === 0 ? uit : 0; ctx.strokeStyle = brk > 0.5 ? C.koraal : C.line; ctx.lineWidth = 5; const mid = (xa + xb) / 2, op = brk * 18;
    ctx.beginPath(); ctx.ellipse(mid - 14 - op, y, 26, 14, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(mid + 14 + op, y, 26, 14, 0, 0, 6.283); ctx.stroke(); }
  const NM = ['eisprong', 'bevruchting', 'innesteling'];
  for (let i = 0; i < 3; i++) { const al = lit[i]; if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; const bx = box(i), hp = i === hapert ? hap : 0; const by = y - h / 2 + (hp ? Math.sin(t * 9) * 3 * hp : 0);
    roundRect(ctx, bx, by, w, h, 18); shape(ctx, rgba(C.fill, 0.6), hp > 0.5 ? C.koraal : C.line, hp > 0.5 ? 4 : 2);
    ctx.save(); roundRect(ctx, bx, by, w, h, 18); ctx.clip(); const cx = bx + w / 2, cy = by + h / 2;
    // v1.1: echte eierstok met Graafse follikel die openbarst, echte zaadcellen rond een eicel, embryo dat in de baarmoederwand zakt
    if (i === 0) { const u = (t * 0.18) % 1, eis = clamp((u - 0.25) / 0.45, 0, 1); eierstokDoorsnede(ctx, cx - 62, cy + 10, 76, 50, { n: 30, groei: 1, eis, t, winnaar: 3 }); }
    if (i === 1) { eicel(ctx, cx + 40, cy, 34, 1); for (let k = 0; k < 5; k++) { const an = Math.PI + (k - 2) * 0.32, rr = 64 + 10 * Math.sin(t * 2 + k); zaadcel(ctx, cx + 40 + Math.cos(an) * rr, cy + Math.sin(an) * rr, 1.5, an + Math.PI, t + k, 1); } }
    if (i === 2) { const y0 = by + h * 0.62; baarmoederwand(ctx, cx, y0 + 60, w + 20, 170, 1, { kronkel: 1, t }); const zak = 0.5 + 0.5 * Math.sin(t * 0.8); blastocyste(ctx, cx, by + h * 0.43 + 10 * zak, 26, { icm: Math.PI / 2 }); }
    ctx.restore();
    if (hp > 0.5) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx + w * 0.55, by); ctx.lineTo(bx + w * 0.45, by + h * 0.35); ctx.lineTo(bx + w * 0.58, by + h * 0.6); ctx.lineTo(bx + w * 0.48, by + h); ctx.stroke(); }
    if (namen) regel(ctx, NM[i], bx + w / 2, by + h + 44, 1, hp > 0.5 ? C.koraal : C.text, 30, 'center', 700); ctx.restore(); }
  ctx.restore(); return { box: (i) => box(i) + w / 2, w, h }; }

// ---------- methode-rij: icoon met naam ernaast ----------
function methode(ctx, x, y, naam, a, teken, dimA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * dimA; teken(x, y); naamBij(ctx, naam, '', x + 78, y + 12, 1, 'left'); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { eicel(ctx, 1500, 720, 90, 1); for (let k = 0; k < 6; k++) { const an = -2.6 + k * 0.42, rr = 190 + 14 * Math.sin(t * 2 + k); zaadcel(ctx, 1500 + Math.cos(an) * rr, 720 + Math.sin(an) * rr, 1.6, an + Math.PI, t + k * 0.7, 0.9); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'lotte', 470, 880, 520, { uit: q.on('denkt', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('denkt', 1) > 0.5 ? 'denk' : 'staan', kijk: 1, t });
    persoon(ctx, 'kim', 960, 880, 520, { uit: q.on('lijst', 1) > 0.5 ? 'praat' : 'blij', pose: q.on('lijst', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1, t: t * (q.on('lijst', 1) > 0.5 ? 1 : 0) });
    bureau(ctx, 300, 1130, 700);
    regel(ctx, 'huisarts', 960, 770, 1, C.text, 30, 'center', 700); // v1.2: geen castnamen in beeld (B4)
    wolk(ctx, 160, 180, 380, 96, 'welke anticonceptie?', q.on('anticonceptie', 1), 30);
    const L = q.on('lijst', 1); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; roundRect(ctx, 1220, 120, 580, 400, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2); text(ctx, 'zwanger in een jaar, per 100 vrouwen', 1510, 172, fTekst(26, 800), '#121A26', 'center');
      ['pil', 'condoom', 'spiraaltje', 'staafje'].forEach((m, i) => { const a2 = clamp((t - q.at('Daarop') - i * 0.3) * 3, 0, 1), y2 = 240 + i * 66, hl = m === 'pil' ? q.on('pil', 1) : 0; ctx.save(); ctx.globalAlpha *= a2; if (hl > 0.01) { roundRect(ctx, 1240, y2 - 40, 540, 56, 10); shape(ctx, rgba(C.goud, 0.35 * hl), null); } text(ctx, m, 1270, y2, fTekst(32, 700), '#121A26', 'left'); text(ctx, '?', 1740, y2, fTekst(36, 800), C.koraal, 'right'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1260, y2 + 18); ctx.lineTo(1760, y2 + 18); ctx.stroke(); ctx.restore(); }); ctx.restore(); }
    const hn = q.on('honderd', 1); stippen(ctx, 1290, 580, 100, 0, C.koraal, hn, 10, 9, 27); regel(ctx, '100 vrouwen · 1 jaar de pil', 1412, 568 - 8, hn, C.text2, 24, 'center', 700);
    vraagteken(ctx, 1720, 760, q.on('denk', 2), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = fase(q, 'keten'), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'de pil · normaal gebruik · per jaar', 960, 170, 1, C.text2, 30, 'center', 700);
      const k = Math.round(7 * clamp((t - q.at('zeven')) / 1.2, 0, 1)); stippen(ctx, 720, 240, 100, 0, C.koraal, q.on('honderd', 1), 10, 18, 52);
      for (let i = 0; i < k; i++) { const j = [3, 17, 28, 44, 59, 72, 86][i]; circ(ctx, 720 + (j % 10) * 52, 240 + Math.floor(j / 10) * 52, 18, C.koraal); }
      regel(ctx, 'ongeveer 7 van de 100 zwanger', 960, 800, q.on('zeven', 1), C.koraal, 34, 'center', 800);
      pilStrip(ctx, 1560, 420, 1.4, q.on('vergeten', 1), 5); regel(ctx, 'vergeten!', 1560, 540, q.on('vergeten', 1), C.goud, 30, 'center', 700);
      chip(ctx, 'de pil werkt wel goed', 300, 420, C.groen, q.on('slecht', 1), 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'een zwangerschap is een keten', 960, 170, 1, C.text, 36, 'center', 700);
      const uit = q.on('schakel', 1, 1); keten(ctx, 960, 440, { lit: [q.on('eicel', 1), q.on('zaadcel', 1), q.on('nestelt', 1)], uit, t });
      tag(ctx, 'anticonceptie: één schakel eruit', 960, 760, C.koraal, uit, 'center', 34); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const pB = fase(q, 'tweede'), pC = fase(q, 'koperspiraaltje'), pD = fase(q, 'morning');
    const A1 = 1 - pB, B1 = pB * (1 - pC), C1 = pC * (1 - pD), D1 = pD; const S = 1 - pD; const cx = 960, cy = 450, s = 1.0;
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      const horm = q.on('hormoonspiraaltje', 1) * (1 - pC), kop = pC, dicht = q.on('sterilisatie', 1) * (1 - pC), pes = q.on('pessarium', 1) * (1 - pC) * (1 - q.on('hormoonspiraaltje', 1));
      baarmoeder(ctx, cx, cy, s, { namen: A1, eierstokHl: A1 * q.on('remmen', 1), eisprongRem: A1 * q.on('remmen', 1), slijm: horm, naamSlijm: horm * B1, spiraal: pC > 0.5 ? 'koper' : 'hormoon', spiraalA: Math.max(horm, kop), dicht, pessarium: pes, slijmvlies: q.on('slijmvlies', 1) * C1, t });
      // v1.1: zoom op de eierstok: follikels groeien een stukje en stoppen, er komt geen Graafse follikel en geen eisprong
      const zr = A1 * q.on('remmen', 1); if (zr > 0.01) { ctx.save(); ctx.globalAlpha *= zr; const zx = 1560, zy = 420, zrad = 170; const ox = cx + 262 * s, oy = cy + 18 * s;
        ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + 56 * s, oy - 20 * s); ctx.lineTo(zx - zrad * 0.95, zy - zrad * 0.3); ctx.moveTo(ox + 50 * s, oy + 26 * s); ctx.lineTo(zx - zrad * 0.8, zy + zrad * 0.6); ctx.stroke();
        ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zrad, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.92); ctx.fill(); ctx.clip();
        const gr = 0.12 + 0.3 * clamp((t - q.at('remmen')) / 2.5, 0, 1) - 0.06 * Math.max(0, Math.sin(t * 0.7)); eierstokDoorsnede(ctx, zx, zy, 150, 104, { n: 70, groei: gr, eis: 0, t, winnaar: 3 }); ctx.restore();
        ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(zx, zy, zrad, 0, 6.283); ctx.stroke();
        regel(ctx, 'follikels rijpen niet door', zx, zy + zrad + 46, 1, C.text, 26, 'center', 700); regel(ctx, 'geen eisprong', zx, zy + zrad + 82, 1, C.goud, 24, 'center', 700); ctx.restore(); }
      // zaadcellen uit de vagina omhoog; stoppen bij condoom/pessarium/slijmprop
      if (B1 > 0.01) { const z0 = q.at('zaadcel'); for (let k = 0; k < 7; k++) { const u = clamp((t - z0 - k * 0.35) / 3, 0, 1), stop = cy + 214 * s, yy = lerp(cy + 340 * s, stop + 8 + (k % 3) * 12, u), xx = cx + (k - 3) * 9 + Math.sin(t * 3 + k) * 3; zaadcel(ctx, xx, yy, 0.9, -Math.PI / 2 + (k - 3) * 0.08, t + k, B1); } }
      // koper: zaadcellen in de holte gaan dood
      if (C1 > 0.01) { const g = q.on('giftig', 1); ctx.save(); ctx.globalAlpha *= C1 * q.on('Koper', 1); for (let k = 0; k < 40; k++) { const u = ((t * 0.12 + hash(k)) % 1); const yy = cy + lerp(-78, 66, hash(k + 3)) * s, sd = hash(k + 5) < 0.5 ? -1 : 1; const xx = cx + sd * (8 + u * 60) * s; ctx.beginPath(); ctx.arc(xx, yy, 2.6, 0, 6.283); ctx.fillStyle = rgba(VP.koper, 0.9 * (1 - u)); ctx.fill(); } ctx.restore();
        for (let k = 0; k < 5; k++) { const xx = cx - 40 + k * 20, yy = cy - 10 + (k % 2) * 30; zaadcel(ctx, xx, yy, 1.2, -Math.PI / 2 + (k - 2) * 0.3, t + k, C1 * (1 - 0.3 * g), VP.zaad, g); }
        const sv = q.on('slijmvlies', 1); if (sv > 0.01) { ctx.save(); ctx.globalAlpha *= C1 * sv; const zx = 1560, zy = 440, zrad = 180;
          ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zrad, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.92); ctx.fill(); ctx.clip(); baarmoederwand(ctx, zx, zy + 90, 420, 230, 0.7, { kronkel: 0.6, t, a: 1 });
          const u = clamp((t - q.at('innesteling')) / 2.2, 0, 1); const yb = zy - 40 - 50 * Math.sin(Math.min(u, 1) * Math.PI) * (u > 0.5 ? 1 : 0.2) + (u < 0.5 ? u * 60 : 30); blastocyste(ctx, zx + 20, lerp(zy - 120, yb, u), 34, { icm: Math.PI / 2 });
          for (let k = 0; k < 14; k++) { const xx = zx - 150 + hash(k + 11) * 300, yy = zy - 40 + hash(k + 2) * 40; ctx.beginPath(); ctx.arc(xx, yy, 2.6, 0, 6.283); ctx.fillStyle = rgba(VP.koper, 0.85); ctx.fill(); } ctx.restore();
          ctx.strokeStyle = VP.koper; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(zx, zy, zrad, 0, 6.283); ctx.stroke(); kruis(ctx, zx + zrad * 0.7, zy - zrad * 0.7, 16, clamp((t - q.at('innesteling')) / 1.5, 0, 1), C.koraal, 5);
          regel(ctx, 'embryo kan zich niet innestelen', zx, zy + zrad + 46, 1, C.text, 24, 'center', 700); ctx.restore(); } }
      ctx.restore(); }
    // koptekst per schakel
    tag(ctx, 'schakel 1 · geen eisprong', 960, 112, C.goud, A1 * q.on('eerste', 1), 'center', 30);
    tag(ctx, 'schakel 2 · de zaadcel komt niet bij de eicel', 960, 112, C.teal, B1, 'center', 30);
    tag(ctx, 'het koperspiraaltje: schakel 2 én schakel 3', 960, 112, VP.koper, C1, 'center', 30);
    // links: hormonen die de eisprong remmen
    const dimL = 1 - 0.7 * pB; const LA = (1 - pD) * (1 - pC);
    methode(ctx, 230, 250, 'pil', q.on('pil', 1) * LA, (x, y) => pilStrip(ctx, x, y, 0.75, 1), dimL);
    methode(ctx, 230, 400, 'prikpil', q.on('prikpil', 1) * LA, (x, y) => spuit(ctx, x - 6, y, 0.75, -0.5, 1, C.paars), dimL);
    methode(ctx, 230, 550, 'staafje', q.on('staafje', 1) * LA, (x, y) => staafje(ctx, x, y, 0.5, 1), dimL);
    methode(ctx, 230, 700, 'ring', q.on('ring', 1) * LA, (x, y) => ringIcon(ctx, x, y, 0.9, 1), dimL);
    regel(ctx, 'hormonen remmen de eisprong', 120, 820, A1 * q.on('remmen', 1), C.goud, 26, 'left', 700);
    chip(ctx, 'hoe precies: film Van bevruchting tot baby', 1520, 820, C.text2, A1 * q.on('bevruchting', 1), 22);
    // rechts: zaadcel tegenhouden
    const RB = B1;
    methode(ctx, 1450, 230, 'condoom', q.on('condoom', 1) * RB, (x, y) => condoom(ctx, x, y + 24, 0.75, 1));
    methode(ctx, 1450, 380, 'pessarium', q.on('pessarium', 1) * RB, (x, y) => pessariumIcon(ctx, x, y + 10, 0.8, 1));
    methode(ctx, 1450, 530, 'hormoonspiraaltje', q.on('hormoonspiraaltje', 1) * RB, (x, y) => spiraalIcon(ctx, x, y, 0.85, 'hormoon', 1));
    methode(ctx, 1450, 680, 'sterilisatie', q.on('sterilisatie', 1) * RB, (x, y) => { ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 44, y); ctx.lineTo(x - 10, y); ctx.moveTo(x + 10, y); ctx.lineTo(x + 44, y); ctx.stroke(); kruis(ctx, x, y, 10, 1, C.goud, 4); });
    regel(ctx, 'zaadleiders (man) of eileiders (vrouw) dicht', 1450 + 78, 720, B1 * q.on('zaadleiders', 1), C.text2, 22, 'left', 600);
    // koper: twee manieren
    if (C1 > 0.01) { ctx.save(); ctx.globalAlpha *= C1; spiraalIcon(ctx, 230, 330, 1.1, 'koper', 1); naamBij(ctx, 'koperspiraaltje', '', 310, 342, 1, 'left');
      chip(ctx, '1 · koper is giftig voor zaadcellen', 330, 520, VP.koper, q.on('giftig', 1), 24); chip(ctx, '2 · slijmvlies: geen innesteling', 330, 600, VP.koper, q.on('slijmvlies', 1), 24);
      naamBij(ctx, 'slijmvlies', '', cx - 120 * s, cy + 110 * s, q.on('slijmvlies', 1), 'right', '#E0A0A8'); ctx.restore(); }
    // morning-afterpil: de eisprong schuift op
    if (D1 > 0.01) { ctx.save(); ctx.globalAlpha *= D1; regel(ctx, 'de morning-afterpil', 960, 150, 1, C.text, 40, 'center', 700);
      const x0 = 300, x1 = 1620, yA = 560, dag = (d) => x0 + (x1 - x0) * d / 8; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yA); ctx.lineTo(x1, yA); ctx.stroke();
      for (let d = 0; d <= 8; d++) { ctx.beginPath(); ctx.moveTo(dag(d), yA - 8); ctx.lineTo(dag(d), yA + 8); ctx.stroke(); text(ctx, 'dag ' + d, dag(d), yA + 44, fTekst(22, 600), C.text2, 'center'); }
      roundRect(ctx, dag(0), yA - 150, dag(5) - dag(0), 40, 10); shape(ctx, rgba(C.teal, 0.25), C.teal, 1.5); regel(ctx, 'zaadcellen leven nog ± 5 dagen', dag(2.5), yA - 122, 1, C.text, 22, 'center', 700);
      for (let k = 0; k < 4; k++) { const dd = 0.5 + k * 1.3; zaadcel(ctx, dag(dd) + Math.sin(t + k) * 6, yA - 64 + (k % 2) * 14, 2.0, 0, t + k, clamp(1.25 - dd / 5.2, 0.2, 1)); }
      pilletje(ctx, dag(0.4), yA - 230, 1, q.on('binnen', 1)); chip(ctx, 'binnen 3 tot 5 dagen', dag(0.4) + 210, yA - 222, C.goud, q.on('binnen', 1), 22);
      const sh = q.on('stelt', 1, 1.6), ed = lerp(2.5, 6.6, sh); const sc = clamp((t - q.at('stelt') - 1.8) / 1.4, 0, 1); const fe = follikel(ctx, dag(ed), yA - 70, 1, { R: 34, scheur: sc });
      if (sc > 0.5) eicel(ctx, dag(ed) + 10 + 50 * ease(sc), yA - 70 - 40 * ease(sc), 9, 1); regel(ctx, 'eisprong', dag(ed), yA - 126, 1, C.goud, 26, 'center', 700);
      if (sh > 0.05) pijl(ctx, dag(2.5), yA + 80, dag(ed), yA + 80, C.goud, sh, 4);
      chip(ctx, 'werkt alleen vóór de eisprong', 960, 720, C.text2, q.on('alleen', 1), 26);
      stempel(ctx, 1460, 800, 'geen abortuspil', C.koraal, q.on('abortuspil', 1), -0.08, 34); ctx.restore(); }
  },

  s06(ctx, t, q) { bg(ctx, 'schema'); const tb = q.at('beschermt'), A = 1 - ramp(t, tb - 1.2, 0.6), B = ramp(t, tb - 0.4, 0.6); // v1.1: eerst alles weg, dan de nieuwe titel (één titel tegelijk)
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'Pearl-index: hoeveel van de 100 vrouwen zijn na een jaar zwanger?', 960, 140, q.on('Pearl', 1), C.text, 34, 'center', 700);
      const G = [['pil', 'perfect', 0, '< 1', q.on('perfect', 1)], ['pil', 'normaal', 7, '± 7', q.on('normaal', 1)], ['condoom', 'perfect', 2, '2', q.on('condoom', 1)], ['condoom', 'normaal', 13, '± 13', q.on('normaal', 2)], ['spiraal, staafje,', 'sterilisatie', 0, '< 1', q.on('spiraaltje', 1)]];
      G.forEach(([m, g, k, lab, a2], i) => { if (a2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= a2; const x = 140 + i * 340; regel(ctx, m, x + 110, 250, 1, C.text, 28, 'center', 700); regel(ctx, g, x + 110, 286, 1, g === 'normaal' ? C.goud : C.text2, 24, 'center', 600);
        const idx = [4, 15, 27, 33, 48, 52, 66, 71, 79, 88, 93, 21, 57]; stippen(ctx, x + 11, 330, 100, 0, C.koraal, 1, 10, 9, 22); for (let j = 0; j < k; j++) { const p = idx[j]; circ(ctx, x + 11 + (p % 10) * 22, 330 + Math.floor(p / 10) * 22, 9, C.koraal); }
        if (lab === '< 1') { circ(ctx, x + 11 + 5 * 22, 330 + 5 * 22, 9, rgba(C.koraal, 0.45)); }
        regel(ctx, lab, x + 110, 610, 1, k > 5 ? C.koraal : C.groen, 44, 'center', 800); ctx.restore(); });
      chip(ctx, 'met af en toe een vergeten pil', 140 + 340 + 110, 680, C.goud, q.on('vergeten', 1), 20);
      chip(ctx, 'niets te vergeten', 140 + 4 * 340 + 110, 680, C.groen, q.on('vergeten', 2), 22); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'beschermt ook tegen soa\'s?', 960, 150, 1, C.text, 38, 'center', 700);
      schild(ctx, 420, 470, 1.9, q.on('condoom', 2)); condoom(ctx, 420, 500, 1.5, q.on('condoom', 2)); naamBij(ctx, 'condoom', '', 420, 720, q.on('condoom', 2), 'center'); vink_(ctx, 580, 320, 36, q.on('soa', 1));
      const rij = [['pil', (x, y) => pilStrip(ctx, x, y, 0.6, 1)], ['spiraaltje', (x, y) => spiraalIcon(ctx, x, y, 0.7, 'koper', 1)], ['staafje', (x, y) => staafje(ctx, x, y, 0.4, 1)], ['ring', (x, y) => ringIcon(ctx, x, y, 0.7, 1)], ['pessarium', (x, y) => pessariumIcon(ctx, x, y, 0.6, 1)]];
      rij.forEach(([nm, f], i) => { const x = 820 + i * 220, y = 470; ctx.save(); ctx.globalAlpha *= 0.6; f(x, y); ctx.restore(); regel(ctx, nm, x, y + 90, 0.7, C.text2, 24, 'center', 600); kruis(ctx, x, y - 90, 16, q.on('soa', 1) * clamp((t - q.at('soa') - i * 0.12) * 4, 0, 1), C.koraal, 5); });
      regel(ctx, 'alle andere methodes: geen bescherming tegen soa\'s', 1260, 700, q.on('soa', 1), C.koraal, 28, 'center', 700); ctx.restore(); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'soa = seksueel overdraagbare aandoening', 960, 120, C.koraal, q.on('soa', 1), 'center', 32);
    const sa = q.on('Sam', 1); persoon(ctx, 'sam', 620, 880, 540, { a: sa, uit: q.on('niets', 1) > 0.5 ? 'denkt' : 'verbaasd', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y) => telefoontje(c, x + 6, y - 10, 1.2, 0.2) });
    bubbel(ctx, 900, 330, 'je ex heeft chlamydia', q.on('chlamydia', 1), 28);
    chip(ctx, 'geen klachten', 880, 470, C.text2, q.on('niets', 1), 24);
    const ab = q.on('antibiotica', 1); capsule(ctx, 1380, 360, 1.5, ab); regel(ctx, 'antibiotica', 1380, 450, ab, C.text, 28, 'center', 700);
    ['hiv', 'herpes', 'gonorroe'].forEach((s2, i) => chip(ctx, s2, 1240 + i * 150, 600, C.text2, q.on('drie', 1) * clamp((t - q.at('drie') - i * 0.25) * 3, 0, 1), 26));
    vraagteken(ctx, 1640, 800, q.on('denk', 1), 110); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const pB = fase(q, 'lastige'), pC = fase(q, 'testen'), pD = fase(q, 'vaccin'), pE = fase(q, 'hiv', 2);
    const A = 1 - pB, B = pB * (1 - pC), Cc = pC * (1 - pD), D = pD * (1 - pE), E = pE;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; paneel(ctx, 120, 150, 800, 680, 'door een bacterie'); paneel(ctx, 1000, 150, 800, 680, 'door een virus', q.on('virus', 1));
      // v1.1: drie bacteriën in hun echte vorm + één vergrote bacterie (celwand, ribosomen, DNA-lus)
      const dood = q.on('doden', 1, 1.2); const kol = [[250, 'gonorroe', 'Gonorroe'], [520, 'chlamydia', 'chlamydia'], [790, 'syfilis', 'syfilis']];
      kol.forEach(([x, nm, cue], i) => { const al = q.on(cue, 1); if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al * (1 - 0.55 * dood);
        if (i === 0) for (let k = 0; k < 5; k++) { const w = wander(k, t, 6, 0.6); gonokok(ctx, x - 60 + (k % 3) * 58 + w.x, 270 + Math.floor(k / 3) * 52 + w.y, 1.15, k * 0.9, { dood }); }
        if (i === 1) chlamydiaCel(ctx, x, 290, 70, { t, groei: 0.85 });
        if (i === 2) for (let k = 0; k < 3; k++) spirocheet(ctx, x, 250 + k * 40, 170, { t: t + k, rot: 0.08 * (k - 1), dood });
        regel(ctx, nm, x, 400, 1, C.text, 30, 'center', 700); ctx.restore(); });
      const big = q.on('Antibiotica', 1); if (big > 0.01) { ctx.save(); ctx.globalAlpha *= big; bacterieGroot(ctx, 470, 560, 320, 130, { t, wandKapot: dood, riboHl: 0 }); naamBij(ctx, 'celwand', '', 470, 476, 1, 'center'); naamBij(ctx, 'DNA', '', 452, 560 + 6, 1, 'center', C.teal); ctx.restore(); }
      capsule(ctx, 210, 560, 1.1, big); pijl(ctx, 262, 560, 306, 560, C.teal, q.on('doden', 1), 4, 12); regel(ctx, 'antibiotica: celwand en ribosomen kapot', 470, 680, q.on('doden', 1), C.teal, 26, 'center', 700);
      vink_(ctx, 380, 760, 26, q.on('genezen', 1)); regel(ctx, 'te genezen', 430, 775, q.on('genezen', 1), C.groen, 34, 'left', 800);
      if (q.on('virus', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('virus', 1); ['hiv', 'HPV', 'herpes', 'hepatitis B'].forEach((s2, i) => regel(ctx, s2, 1460, 290 + i * 56, 1, C.text, 32, 'left', 700));
        const ei = q.on('eigen', 1); const vx = 1230, vy = 440, vr = 150; celRond(ctx, vx, vy, vr, { t, s: 1 });
        const u = clamp((t - q.at('virus', 2)) / 4.5, 0, 1); // 0..0.35 binden, ..0.55 binnen, ..0.8 kopiëren, ..1 uitknoppen
        [-2.3, -0.9, 0.5].forEach((an, k) => { const bind = clamp(u / 0.35, 0, 1), inn = clamp((u - 0.35) / 0.2, 0, 1); const rr = lerp(vr + 70, vr + 14, ease(bind)) - inn * 70; virus(ctx, vx + Math.cos(an) * rr, vy + Math.sin(an) * rr, 13, (1 - inn * 0.8) * (u > 0 ? 1 : 0.9), VIRUS, an); });
        const kop = clamp((u - 0.55) / 0.25, 0, 1); for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283, rr = 60 + (k % 3) * 18; if (hash(k + 4) > kop) continue; virus(ctx, vx - 20 + Math.cos(an) * rr * 0.8, vy + 10 + Math.sin(an) * rr * 0.7, 9, 1, VIRUS, an); }
        const knop = clamp((u - 0.8) / 0.2, 0, 1) + (u >= 1 ? ((t * 0.35) % 1) : 0); for (const an of [-0.2, 1.9, 3.4]) { const kk = Math.min(1, knop % 1.0001); const rr = vr - 6 + kk * 46; if (u < 0.8) break; ctx.save(); ctx.globalAlpha *= 1 - Math.max(0, kk - 0.8) * 5; virus(ctx, vx + Math.cos(an) * rr, vy + Math.sin(an) * rr, 11, 1, VIRUS, an); ctx.restore(); }
        naamBij(ctx, 'eigen lichaamscel', '', vx, vy + vr + 50, ei, 'center');
        capsule(ctx, 1160, 740, 1.2, q.on('niets', 1)); kruis(ctx, 1160, 740, 36, q.on('niets', 1), C.koraal, 7); regel(ctx, 'antibiotica helpen niet', 1250, 752, q.on('niets', 1), C.koraal, 28, 'left', 700); ctx.restore(); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const p2 = q.on('onbehandeld', 1), B1 = 1 - p2, B2 = p2;
      if (B1 > 0.01) { ctx.save(); ctx.globalAlpha *= B1; regel(ctx, 'chlamydia: vaak geen klachten', 960, 150, 1, C.text, 38, 'center', 700);
        regel(ctx, 'vrouwen', 340, 330, q.on('tien', 1), C.text, 32, 'right', 700); stippen(ctx, 420, 320, 10, 3, C.koraal, q.on('tien', 1), 10, 26, 80, '#6A7488'); regel(ctx, '7 van de 10 merken niets', 1260, 340, q.on('zeven', 1), C.text2, 30, 'left', 700);
        regel(ctx, 'mannen', 340, 500, q.on('mannen', 1), C.text, 32, 'right', 700); stippen(ctx, 420, 490, 10, 5, C.koraal, q.on('mannen', 1), 10, 26, 80, '#6A7488'); regel(ctx, 'de helft merkt niets', 1260, 510, q.on('helft', 1), C.text2, 30, 'left', 700);
        regel(ctx, 'klachten', 420, 620, q.on('zeven', 1), C.koraal, 24, 'left', 700); regel(ctx, 'geen klachten', 700, 620, q.on('zeven', 1), '#9AA3B2', 24, 'left', 700);
        tag(ctx, 'toch besmettelijk', 960, 760, C.koraal, q.on('doorgeven', 1), 'center', 32); ctx.restore(); }
      if (B2 > 0.01) { ctx.save(); ctx.globalAlpha *= B2; regel(ctx, 'onbehandeld: de eileiders raken ontstoken', 960, 150, 1, C.text, 36, 'center', 700);
        // v1.1: eileider in lengtedoorsnede (lib_bio): trilharen, ontsteking, littekens, eicel blijft steken
        const ont = q.on('ontsteken', 1, 1.2), lit = q.on('littekens', 1, 1.5), dch = q.on('dicht', 1, 1.2);
        ctx.beginPath(); ctx.moveTo(310, 470); ctx.quadraticCurveTo(170, 440, 150, 565); ctx.quadraticCurveTo(170, 690, 310, 660); ctx.closePath(); shape(ctx, rgba(VP.weef, 0.9), VP.weefD, 2); ctx.beginPath(); ctx.moveTo(310, 545); ctx.quadraticCurveTo(220, 530, 205, 565); ctx.quadraticCurveTo(220, 600, 310, 585); ctx.closePath(); shape(ctx, VP.holte, rgba(BIO.slijm, 0.9), 6); naamBij(ctx, 'baarmoeder', '', 220, 720, 1, 'center');
        const E = eileiderDoorsnede(ctx, 300, 1500, 565, { t, ontst: ont * (1 - 0.6 * lit), litteken: lit, s: 0.95 }); naamBij(ctx, 'eileider', '', 900, 440, 1, 'center');
        eierstokDoorsnede(ctx, 1640, 690, 110, 70, { n: 40, groei: 0.3, t });
        if (E && dch > 0.01) { const uu = lerp(0.95, 0.72, ease(dch)); const [ex, ey] = E.lumen(uu); eicel(ctx, ex, ey, 22, dch); kruis(ctx, E.lumen(0.66)[0], 470, 22, clamp((dch - 0.6) * 3, 0, 1), C.koraal, 6); }
        regel(ctx, 'ontsteking', 1180, 300, ont, C.koraal, 30, 'left', 700); regel(ctx, 'littekens', 1180, 345, lit, C.text, 30, 'left', 700); regel(ctx, 'eileider dicht', 1180, 390, dch, C.text, 30, 'left', 700);
        tag(ctx, 'kans op onvruchtbaarheid', 960, 840, C.koraal, q.on('onvruchtbaar', 1), 'center', 32); ctx.restore(); }
      ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; persoon(ctx, 'sam', 560, 880, 540, { uit: 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y) => buisje(c, x + 4, y - 30, 0.9, 1) });
      regel(ctx, 'zelf laten testen', 1200, 220, 1, C.text, 40, 'center', 700);
      tag(ctx, 'huisarts', 1020, 380, C.teal, q.on('huisarts', 1), 'center', 32); tag(ctx, 'GGD', 1400, 380, C.teal, q.on('GGD', 1), 'center', 32);
      tag(ctx, 'jonger dan 25: gratis bij de GGD', 1210, 540, C.groen, q.on('gratis', 1), 'center', 32); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; regel(ctx, 'een vaccin tegen HPV', 960, 140, 1, C.text, 38, 'center', 700);
      virus(ctx, 300, 340, 46, q.on('HPV', 1), VIRUS, t * 0.2); naamBij(ctx, 'HPV', '', 300, 450, q.on('HPV', 1), 'center');
      chip(ctx, 'wratten', 560, 290, C.text2, q.on('wratten', 1), 26); chip(ctx, 'jaren later: kanker', 560, 380, C.koraal, q.on('kanker', 1), 26);
      const bk = q.on('baarmoederhalskanker', 1); baarmoeder(ctx, 400, 640, 0.42, { a: bk, halsHl: bk, t }); naamBij(ctx, 'baarmoederhals', '', 400 + 50, 640 + 66, bk, 'left');
      const jm = q.on('jongens', 1); persoon(ctx, 'ruben', 1130, 790, 340, { a: jm, uit: 'blij', kijk: 1, t: 0 }); persoon(ctx, 'fleur', 1340, 790, 330, { a: jm, uit: 'neutraal', kijk: -1, t: 0 }); const pk = q.on('vaccinatie', 1, 1.2); spuit(ctx, lerp(1560, 1468, pk), lerp(610, 586, pk), 0.9, Math.PI + 0.25, jm * q.on('vaccinatie', 1, 0.4), C.groen); // v1.1: castpersonages (± 10 jaar)
      chip(ctx, 'jongens en meisjes, rond hun tiende', 1260, 300, C.groen, jm, 26); chip(ctx, 'Rijksvaccinatieprogramma', 1260, 380, C.groen, q.on('Rijksvaccinatieprogramma', 1), 26);
      chip(ctx, 'ook een vaccin tegen hepatitis B', 1260, 830, C.teal, q.on('hepatitis', 2), 24); ctx.restore(); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; regel(ctx, 'hiv: niet te genezen, wel te remmen', 960, 140, 1, C.text, 38, 'center', 700);
      const gx = 220, gy = 260, gw = 900, gh = 440; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke(); metaText(ctx, 'hoeveel virus in het bloed', gx, gy - 18, C.text2, 'left', 18); metaText(ctx, 'tijd →', gx + gw, gy + gh + 34, C.text2, 'right', 18);
      const gr = gy + gh - 70; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.groen; ctx.beginPath(); ctx.moveTo(gx, gr); ctx.lineTo(gx + gw, gr); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'grens: niet meetbaar', gx + gw - 10, gr + 34, q.on('meetbaar', 1), C.groen, 22, 'right', 700);
      const re = q.on('remmers', 1, 2.5), u0 = 0.25; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, x = gx + u * gw; let v = 0.85 + 0.05 * Math.sin(u * 20); if (u > u0) v = lerp(v, 0.05, re * clamp((u - u0) / 0.35, 0, 1)); const y = gy + gh - v * gh; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      pilletje(ctx, gx + gw * u0, gy + 60, 1, q.on('remmers', 1), '#C9D2DC'); regel(ctx, 'hiv-remmers', gx + gw * u0 + 40, gy + 70, q.on('remmers', 1), C.text, 26, 'left', 700);
      chip(ctx, 'niet meetbaar = niet overdraagbaar via seks', 670, 800, C.groen, q.on('door', 2), 24);
      const pr = q.on('PrEP', 1); schild(ctx, 1520, 440, 1.4, pr, C.teal); pilletje(ctx, 1520, 440, 1.6, pr, '#9FD3C7'); naamBij(ctx, 'PrEP', '', 1520, 620, pr, 'center'); regel(ctx, 'voorkomt besmetting met hiv', 1520, 680, q.on('voorkomt', 1), C.text2, 26, 'center', 700); ctx.restore(); }
  },

  s10(ctx, t, q) { bg(ctx, 'schema'); const B = fase(q, 'middelen', 1), A = 1 - B; regel(ctx, 'gonorroe wordt resistent', 960, 130, 1, C.text, 38, 'center', 700);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const ku = q.on('kuur', 1, 2), mu = q.on('mutatie', 1), ve = q.on('vermenigvuldigen', 1, 2.5); const RES = [5, 17, 28];
      const pos = (i) => { const w = wander(i, t, 8, 0.6); return [420 + (i % 9) * 120 + w.x, 260 + Math.floor(i / 9) * 120 + w.y]; };
      const naast = (i) => { let best = RES[0], bd = 1e9; RES.forEach(r => { const d = Math.abs(r % 9 - i % 9) + Math.abs(Math.floor(r / 9) - Math.floor(i / 9)); if (d < bd) { bd = d; best = r; } }); return [best, bd]; };
      for (let i = 0; i < 36; i++) { const res = RES.includes(i); const [x, y] = pos(i);
        if (res) { const deel = ve > 0.01 ? (Math.sin(t * 3 + i) * 0.5 + 0.5) * Math.min(1, ve * 3) : 0; gonokok(ctx, x, y, 1.6, i * 0.5, { col: C.oker, deel: deel * 0.6 }); if (mu > 0.01) { ctx.save(); ctx.globalAlpha *= mu; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 50, 0, 6.283); ctx.stroke(); ctx.restore(); } }
        else { const d = clamp(ku * 1.4 - hash(i) * 0.4, 0, 1); // gevoelig: zwelt op, wand breekt, verdwijnt
          if (d < 0.98) { ctx.save(); ctx.globalAlpha *= (1 - d) * (1 - ve); gonokok(ctx, x, y, 1.6 * (1 + 0.25 * d), i * 0.5, { dood: d }); ctx.restore(); }
          if (d > 0.2 && d < 0.98) for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + i; const rr = 18 + 30 * d; ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, y + Math.sin(an) * rr, 3, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.6 * (1 - d)); ctx.fill(); }
          if (ve > 0.01) { const [r, dist] = naast(i); const [rx, ry] = pos(r); const v = clamp(ve * 1.6 - dist * 0.18, 0, 1); if (v > 0.01) gonokok(ctx, lerp(rx, x, ease(v)), lerp(ry, y, ease(v)), 1.6, i * 0.5 + v, { col: C.oker, a: Math.min(1, v * 3) }); } } }
      capsule(ctx, 240, 300, 1.3, q.on('kuur', 1)); regel(ctx, 'kuur', 240, 380, q.on('kuur', 1), C.teal, 28, 'center', 700);
      naamBij(ctx, 'toevallige mutatie: overleeft', '', 960, 790, mu, 'center', C.oker); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const n = 6; for (let i = 0; i < n; i++) { const x = 360 + i * 240, y = 420, last = i === n - 1; capsule(ctx, x, y, 1.4, 1, -0.4); if (!last) kruis(ctx, x, y, 44, q.on('onbruikbaar', 1) * clamp((t - q.at('onbruikbaar') - i * 0.2) * 3, 0, 1), C.koraal, 7); }
      vink_(ctx, 360 + 5 * 240, 540, 30, q.on('één', 1)); regel(ctx, 'nog bijna één middel dat overal werkt', 960, 640, q.on('één', 1), C.goud, 32, 'center', 700);
      chip(ctx, 'resistentie in de gaten houden', 660, 770, C.teal, q.on('gaten', 1), 26); chip(ctx, 'nieuwe middelen zoeken', 1260, 770, C.groen, q.on('nieuwe', 1), 26); ctx.restore(); } },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const pB = fase(q, 'weinig', 1), pC = fase(q, 'Zitten', 1); const A = 1 - pB, B = pB * (1 - pC), Cc = pC;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; for (let i = 0; i < 6; i++) stelletje(ctx, 560 + i * 160, 380, clamp((t - 0.3 - i * 0.15) * 3, 0, 1), i === 4 ? q.on('zes', 1) : 0);
      regel(ctx, 'ongeveer 1 op de 6 stellen', 960, 460, q.on('zes', 1), C.goud, 32, 'center', 700);
      keten(ctx, 960, 650, { a: q.on('keten', 1), hapert: 1, hap: q.on('hapert', 1), t, w: 260, gap: 70 }); ctx.restore(); }
    const S = Math.max(B, Cc); if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; const cx = 900, cy = 450, s = 1.0;
      baarmoeder(ctx, cx, cy, s, { namen: 0, litteken: Cc * q.on('dicht', 1), t });
      if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'kunstmatige inseminatie', 960, 120, q.on('inseminatie', 1), C.text, 38, 'center', 700);
        const ins = q.on('spuit', 1); const tip = lerp(cy + 380, cy - 60, q.on('spuit', 1, 1.6)); ctx.save(); ctx.globalAlpha *= ins; ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(232,236,240,0.85)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx, cy + 400); ctx.lineTo(cx, tip); ctx.stroke(); ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); spuit(ctx, cx, cy + 438, 0.7, -Math.PI / 2, ins, C.teal); naamBij(ctx, 'dun slangetje', '', cx + 30, cy + 300, ins, 'left'); // v1.1: slangetje via vagina en baarmoederhals
        const zw = q.on('zwemmen', 1, 2); for (let k = 0; k < 8; k++) { const sd = k % 2 ? 1 : -1, u = clamp(zw * 1.3 - k * 0.06, 0, 1), p = buisPt(cx, cy, s, sd, u * 0.7); const x = lerp(cx + (k - 4) * 8, p.x, u), y = lerp(cy - 60 + (k % 3) * 18, p.y, u); zaadcel(ctx, x, y, 1.7, sd > 0 ? -0.6 : -2.5, t + k, ins * clamp((t - q.at('spuit') - 0.6 - k * 0.1) * 2, 0, 1)); }
        chip(ctx, 'rond de eisprong · hoog in de baarmoeder', 1520, 300, C.teal, ins, 22); chip(ctx, 'minder ver zwemmen', 1520, 380, C.teal, q.on('zwemmen', 1), 22); ctx.restore(); }
      if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; regel(ctx, 'eileiders dicht', 960, 120, 1, C.text, 38, 'center', 700); for (const sd of [-1, 1]) { const p = buisPt(cx, cy, s, sd, 0.6); kruis(ctx, p.x, p.y - 34, 18, q.on('dicht', 1), C.koraal, 6); }
        tag(ctx, 'ivf = in-vitrofertilisatie: bevruchting buiten het lichaam', 960, 860, C.goud, q.on('ivf', 1), 'center', 28);
        const hi = q.on('hormooninjecties', 1); spuit(ctx, 1560, 320, 1.4, Math.PI - 0.4, hi, C.paars); regel(ctx, '± 10 dagen hormoon-injecties', 1520, 440, hi, C.text, 26, 'center', 700); vraagteken(ctx, 1560, 640, q.on('denk', 1), 110); ctx.restore(); }
      ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const T = [q.at('Normaal'), q.at('naald'), q.at('schaaltje'), q.at('groeien'), q.at('plaatst'), q.at('vriezer'), q.at('donor')]; const ph = (i) => ramp(t, T[i], 0.7) * (i < 6 ? 1 - ramp(t, T[i + 1], 0.7) : 1);
    const steps = ['hormonen', 'eicellen ophalen', 'bevruchten', 'embryo groeit', 'één terug', 'invriezen']; const cur = T.filter(x => t >= x).length - 1; const stripA = 1 - ramp(t, T[6], 0.7);
    if (stripA > 0.01) { ctx.save(); ctx.globalAlpha *= stripA; const x0 = 330, dx = 252; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, 112); ctx.lineTo(x0 + 5 * dx, 112); ctx.stroke(); steps.forEach((s2, i) => { const on = i === cur || (i === 5 && cur >= 5); circ(ctx, x0 + i * dx, 112, on ? 14 : 9, on ? C.goud : (i < cur ? C.line : '#3A4458')); regel(ctx, s2, x0 + i * dx, 160, 1, on ? C.goud : C.text2, 24, 'center', on ? 800 : 600); }); ctx.restore(); }
    // 1 hormonen: één follikel tegenover veel
    let a = ph(0); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; // v1.1: eierstok-doorsneden uit lib_bio: links rijpt er één door, rechts (FSH) veel tegelijk
      regel(ctx, 'normaal: één follikel per cyclus', 520, 300, q.on('Normaal', 1), C.text, 30, 'center', 700); eierstokDoorsnede(ctx, 520, 540, 250, 165, { n: 110, groei: clamp((t - T[0]) / 2, 0.2, 1), t, winnaar: 3 });
      const fs = q.on('FSH', 1); ctx.save(); ctx.globalAlpha *= fs; regel(ctx, 'met extra FSH: meerdere tegelijk', 1400, 300, 1, C.goud, 30, 'center', 700); eierstokDoorsnede(ctx, 1400, 540, 250, 165, { n: 110, groei: 0, t });
      const g = clamp((t - q.at('rijpen')) / 2.5, 0.15, 1); [[-0.42, -0.36], [-0.12, 0.42], [0.2, -0.45], [0.48, -0.06], [-0.55, 0.18], [0.22, 0.28]].forEach(([u, v], i) => follikel(ctx, 1400 + u * 250, 540 + v * 165, g * (0.82 + 0.06 * (i % 3)), { R: 165 * 0.34, seed: i }));
      spuit(ctx, 1740, 300, 1, Math.PI - 0.6, 1, C.paars); ctx.restore();
      chip(ctx, 'meer eicellen', 1400, 790, C.goud, q.on('meer', 2), 26); ctx.restore(); }
    // 2 punctie
    a = ph(1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; // v1.1: naald via de vagina door de vaginawand naar de eierstok (echogeleid); vocht en eicel worden opgezogen
      const bx = 600, by = 470, bs = 0.95; const A = baarmoeder(ctx, bx, by, bs, { t, eierstok: { groei: 1 } }); const [ox, oy] = A.eierstok[1];
      const pk = clamp((t - T[1]) / 3.2, 0, 1); ctx.save(); ctx.lineCap = 'round'; roundRect(ctx, bx - 14, by + 250, 28, 190, 12); shape(ctx, '#9AA3B2', '#DDE3EA', 2); naamBij(ctx, 'echo', '', bx - 30, by + 400, 1, 'right');
      const fx = bx + 22 * bs, fy = by + 214 * bs; const nT = clamp(pk * 2, 0, 1); ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 18, by + 420); ctx.lineTo(fx, fy); ctx.lineTo(lerp(fx, ox - 10, nT), lerp(fy, oy + 10, nT)); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'dunne naald', '', bx + 70, by + 330, 1, 'left');
      const zx = 1360, zy = 500, zr = 250; ctx.save(); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + 50, oy - 30); ctx.lineTo(zx - zr * 0.92, zy - zr * 0.38); ctx.moveTo(ox + 50, oy + 30); ctx.lineTo(zx - zr * 0.85, zy + zr * 0.5); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.92); ctx.fill(); ctx.clip(); eierstokDoorsnede(ctx, zx, zy, 220, 150, { n: 80, groei: 0, t });
      const F = [[-0.4, -0.3], [-0.05, -0.45], [0.35, -0.2], [-0.25, 0.35], [0.22, 0.38]]; const fi = Math.min(4, Math.floor(pk * 5)); const loc = pk * 5 - fi;
      F.forEach(([u, v], i) => { const x = zx + u * 220, y = zy + v * 150; const leeg = i < fi ? 1 : i === fi ? clamp(loc * 1.6 - 0.3, 0, 1) : 0; if (leeg < 1) follikel(ctx, x, y, 0.9 * (1 - 0.6 * leeg), { R: 70, seed: i, eicel: leeg < 0.6 }); else { ctx.beginPath(); ctx.arc(x, y, 22, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.35), rgba('#C98A6A', 0.7), 2); } });
      const [tx, ty] = F[fi]; const nx = zx + tx * 220, ny = zy + ty * 150; ctx.strokeStyle = '#E8ECF0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(zx - zr, zy + zr * 0.9); ctx.lineTo(nx - 10, ny + 8); ctx.stroke(); ctx.strokeStyle = rgba('#BFD6E2', 0.8); ctx.lineWidth = 2; ctx.stroke();
      if (loc > 0.3 && loc < 0.9) { const m = (loc - 0.3) / 0.6; eicel(ctx, lerp(nx - 10, zx - zr, m), lerp(ny + 8, zy + zr * 0.9, m), 8, 1 - m * 0.5); } ctx.restore();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.stroke(); naamBij(ctx, 'eierstok', '', zx, zy - zr - 24, 1, 'center');
      for (let i = 0; i < fi; i++) eicel(ctx, 1700 + (i % 2) * 56, 640 + Math.floor(i / 2) * 56, 16, 1); naamBij(ctx, 'eicellen', '', 1728, 600, fi > 0 ? 1 : 0, 'center'); ctx.restore(); }
    // 3 bevruchten in het schaaltje / ICSI
    a = ph(2); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; const ic = q.on('weinig', 1); schaaltje(ctx, 960, 520, 300, 1); naamBij(ctx, 'schaaltje', '', 960, 880 - 30, 1 - ic, 'center');
      ctx.save(); ctx.globalAlpha *= 1 - ic; eicel(ctx, 960, 520, 70, 1); for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283 + 0.2, rr = lerp(250, 105, clamp((t - T[2]) / 4, 0, 1)) + 18 * Math.sin(t * 2 + k); zaadcel(ctx, 960 + Math.cos(an) * rr, 520 + Math.sin(an) * rr, 1.1, an + Math.PI, t + k, 1); } ctx.restore();
      if (ic > 0.01) { ctx.save(); ctx.globalAlpha *= ic; // v1.1: houdpipet links (zuigt de eicel vast), injectienaald rechts met één zaadcel, poollichaampje boven
        const er = 150; ctx.beginPath(); ctx.moveTo(960 - er * 1.2 - 300, 490); ctx.lineTo(960 - er * 1.2 + 6, 496); ctx.quadraticCurveTo(960 - er * 1.2 - 8, 520, 960 - er * 1.2 + 6, 544); ctx.lineTo(960 - er * 1.2 - 300, 550); ctx.closePath(); shape(ctx, 'rgba(232,236,240,0.22)', '#DDE3EA', 2); naamBij(ctx, 'houdpipet', '', 960 - er * 1.2 - 150, 600, 1, 'center');
        eicel(ctx, 960, 520, er, 1, { corona: 0 }); ctx.beginPath(); ctx.arc(960 + 10, 520 - er * 0.98, 16, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.9), C.goud, 1.5); naamBij(ctx, 'poollichaampje', '', 990, 520 - er * 1.18 - 20, 1, 'left');
        const sp = q.on('spuit', 1, 1.8); const tipX = lerp(1400, 1010, sp); pipet(ctx, tipX, 520, 1.3, Math.PI, 1); zaadcel(ctx, tipX + 26 + 50 * (1 - sp), 520, 1.6, 0, t * (1 - sp), 1); naamBij(ctx, 'naald met één zaadcel', '', 1260, 600, 1, 'center'); naamBij(ctx, 'eicel', '', 960, 520 + er + 60, 1, 'center');
        chip(ctx, 'weinig of slecht zwemmende zaadcellen', 960, 210, C.text2, 1, 24); tag(ctx, 'ICSI: één zaadcel in de eicel', 960, 840, C.goud, q.on('ICSI', 1), 'center', 30); ctx.restore(); }
      ctx.restore(); }
    // 4 embryo groeit
    a = ph(3); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; const st = [[1, 'dag 1'], [2, 'dag 2'], [4, 'dag 2–3'], [8, 'dag 3'], ['blast', 'dag 5']]; st.forEach(([n, d], i) => { const ai = clamp((t - T[3] - i * 0.7) * 2, 0, 1); embryo(ctx, 280 + i * 340, 500, 90, n, ai); regel(ctx, d, 280 + i * 340, 650, ai, C.text2, 28, 'center', 700); if (i) pijl(ctx, 280 + i * 340 - 230, 500, 280 + i * 340 - 112, 500, C.line, ai, 3, 12); });
      naamBij(ctx, "embryo's in het lab", '', 960, 300, 1, 'center'); ctx.restore(); }
    // 5 één terug
    a = ph(4); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; const cx = 820, cy = 470; baarmoeder(ctx, cx, cy, 1.0, { slijmvlies: 1, t }); const tr = clamp((t - T[4]) / 2, 0, 1); ctx.strokeStyle = '#DDE3EA'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy + 420); ctx.lineTo(cx, lerp(cy + 420, cy - 40, tr)); ctx.stroke(); embryo(ctx, cx, lerp(cy + 380, cy - 40, tr), 22, 'blast', 1);
      tag(ctx, 'meestal één embryo', 1460, 320, C.goud, 1, 'center', 30); chip(ctx, 'een tweeling is riskanter', 1460, 410, C.koraal, q.on('tweeling', 1), 24); ctx.restore(); }
    // 6 invriezen + innesteling
    a = ph(5); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; vriezer(ctx, 520, 560, 1.4, 1, t, 3); naamBij(ctx, "goede embryo's in de vriezer", '', 520, 300 - 30, 1, 'center');
      chip(ctx, 'innesteling: dat bepaalt het lichaam zelf', 1320, 420, C.text2, q.on('innestelt', 1), 26); chip(ctx, 'lang niet elke poging lukt', 1320, 520, C.koraal, q.on('lukt', 1), 26); ctx.restore(); }
    // 7 donor
    a = ph(6); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; regel(ctx, 'een donor', 960, 150, 1, C.text, 40, 'center', 700); persoon(ctx, 'erik', 520, 880, 520, { uit: 'blij', kijk: 1, t: 0 }); eicel(ctx, 860, 400, 40, 1); for (let k = 0; k < 3; k++) zaadcel(ctx, 900, 540 + k * 44, 1.8, 0, t + k, 1); regel(ctx, 'eicellen of zaadcellen', 880, 700, 1, C.text2, 26, 'center', 700); // v1.1: donor = castpersonage (figurant Erik)
      stempel(ctx, 1420, 420, 'niet anoniem', C.goud, q.on('anoniem', 1), -0.1, 40); chip(ctx, 'het kind kan later opvragen wie de donor is', 1420, 600, C.text2, q.on('opvragen', 1), 24); ctx.restore(); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); const B = fase(q, 'Nederland', 1), A = 1 - B; regel(ctx, 'embryoselectie (PGT)', 960, 130, q.on('PGT', 1) + q.on('testen', 1) * 0.0, C.text, 38, 'center', 700);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const al = q.on('Alleen', 1), A1 = 1 - al;
      if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const bl0 = q.on('buitenlaag', 1); blastocyste(ctx, 600, 500, 200, { a: q.on('testen', 1), icm: Math.PI, hlB: bl0, hlI: bl0 * 0.6, gat: clamp((t - q.at('buitenlaag') - 1) / 1, 0, 1) }); naamBij(ctx, 'buitenlaag', 'wordt placenta', 760, 780, bl0, 'center'); naamBij(ctx, 'binnenste celmassa', 'wordt het kind', 350, 505, bl0, 'right'); naamBij(ctx, 'dag 5', '', 600, 250, q.on('dag', 1), 'center'); // v1.1
        const bl = q.on('buitenlaag', 1, 2); pipet(ctx, lerp(1100, 780, ramp(t, q.at('buitenlaag'), 1)) - (bl > 0.9 ? (t - q.at('buitenlaag') - 2) * 0 : 0), 500, 1.3, Math.PI, q.on('haalt', 1));
        for (let k = 0; k < 3; k++) { const u = clamp((t - q.at('buitenlaag') - 1.2) / 1.5, 0, 1), x = lerp(785 + k * 4, 1260 + k * 46, u), y = lerp(500 + (k - 1) * 22, 500, u); ctx.beginPath(); ctx.ellipse(x, y, 26, 12, (k - 1) * 0.3, 0, 6.283); shape(ctx, _mixHex('#EBC9A0', '#5BA4C9', 0.55), '#C9A27A', 1.2); }
        dnaIcon(ctx, 1520, 500, 1.4, q.on('DNA', 1)); regel(ctx, 'DNA onderzoeken', 1520, 680, q.on('DNA', 1), C.text, 28, 'center', 700); ctx.restore(); }
      if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; [[0, 1], [1, 0], [2, 1]].forEach(([i, ziek]) => { const x = 520 + i * 440; embryo(ctx, x, 470, 110, 'blast', 1); if (ziek) { kruis(ctx, x, 470, 50, 1, C.koraal, 8); regel(ctx, 'erfelijke ziekte', x, 650, 1, C.koraal, 26, 'center', 700); } else { vink_(ctx, x + 120, 340, 30, 1); regel(ctx, 'gaat terug', x, 650, 1, C.groen, 30, 'center', 800); } }); ctx.restore(); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; tag(ctx, 'in Nederland: alleen bij een ernstige erfelijke ziekte', 960, 260, C.teal, 1, 'center', 30); tag(ctx, 'niet om het geslacht te kiezen', 960, 350, C.koraal, q.on('geslacht', 1), 'center', 30);
      const V = [['Welke ziekte is ernstig genoeg?', 'genoeg'], ["Wat gebeurt er met de andere embryo's?", 'andere'], ['Waar ligt de grens met een baby op bestelling?', 'bestelling']];
      regel(ctx, 'lastige vragen', 960, 480, q.on('vragen', 1), C.goud, 32, 'center', 700); V.forEach(([s2, w], i) => chip(ctx, s2, 960, 570 + i * 90, C.goud, q.on(w, 1), 28)); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 170, ph = 560;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 64, pw, ph - 64); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'een schakel eruit', q.on('Anticonceptie', 1), (x) => { ['eisprong', 'bevruchting', 'innesteling'].forEach((s2, i) => { const y = 290 + i * 120; roundRect(ctx, x + 60, y - 40, 280, 70, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); regel(ctx, s2, x + 200, y + 6, 1, C.text, 26, 'center', 700); kruis(ctx, x + 330, y - 36, 14, q.on(['eisprong', 'zaadcel', 'innesteling'][i], 1), C.koraal, 5); }); regel(ctx, 'betrouwbaar? ook: hoe gebruik je hem', x + 200, 690, q.on('betrouwbaar', 1), C.goud, 20, 'center', 700); });
    panel(1, "alleen condoom: soa's", q.on('condoom', 1), (x) => { schild(ctx, x + 200, 440, 1.4, 1); condoom(ctx, x + 200, 470, 1.2, 1); });
    panel(2, 'bacterie of virus', q.on('bacteriën', 1), (x) => { for (let i = 0; i < 4; i++) bacterie(ctx, x + 110 + (i % 2) * 70, 330 + Math.floor(i / 2) * 50, 1.4, i, 1, C.koraal, 0); regel(ctx, 'te genezen', x + 145, 460, 1, C.groen, 24, 'center', 700); virus(ctx, x + 300, 360, 26, q.on('virussen', 1), VIRUS, t * 0.2); regel(ctx, 'niet', x + 300, 460, q.on('virussen', 1), C.koraal, 24, 'center', 700); chip(ctx, 'vaak merk je niets', x + 200, 600, C.text2, q.on('merk', 1), 22); });
    panel(3, 'een schakel erbij', q.on('Voortplantingstechniek', 1), (x) => { schaaltje(ctx, x + 200, 420, 130, 1); eicel(ctx, x + 200, 420, 40, 1); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; zaadcel(ctx, x + 200 + Math.cos(an) * 90, 420 + Math.sin(an) * 90, 0.9, an + Math.PI, t + k, 1); } regel(ctx, 'inseminatie · ivf · ICSI', x + 200, 640, q.on('ICSI', 1), C.goud, 24, 'center', 700); });
  },
};
