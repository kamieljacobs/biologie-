/* =====================================================================================
   Evolutie · les 7 · Hoe weten we dat? (31 okt 2026)
   Film 7 Hoe weten we dat? (films/evolutie/7-hoe-weten-we-dat.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min). Drie sporen: lagen en fossielen, homologe en rudimentaire organen, DNA en de moleculaire klok.
   Eigen hulpen hebben het voorvoegsel L7_. Kleuren: lagen in aardetinten uit C.grond, botgroepen goud/teal/koraal,
   verschillen in DNA paars (= mutaties, zoals in de reeks), kern van de zaak goud. Personage: Dr. Kim (zoals in de film), zonder naam in beeld.
   ===================================================================================== */

// ---------- hulpen ----------
// aardetinten voor lagen (volgen licht/donker)
const L7_LKL = () => [mix(C.grond, C.koraal, 0.28), mix(C.grond, C.bg, 0.3), mix(C.grond, C.oker, 0.45), mix(C.grond, C.text2, 0.35), mix(C.grond, C.bg, 0.1)];
// één laag: rechthoek met golvende bovenrand en korrels
function L7_laag(ctx, x, y, w, h, kl, a = 1, seed = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y); for (let i = 1; i <= 24; i++) ctx.lineTo(x + w * i / 24, y + Math.sin(i * 1.3 + seed) * 4); ctx.lineTo(x + w, y + h); ctx.closePath();
  ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = mix(kl, '#000000', 0.25); ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = rgba(mix(kl, '#000000', 0.35), 0.5); for (let i = 0; i < Math.floor(w * h / 1800); i++) { ctx.beginPath(); ctx.arc(x + 8 + hash(seed * 13 + i) * (w - 16), y + 10 + hash(seed * 7 + i * 3.1) * (h - 18), 2.2, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// schelpfossiel (ammoniet)
function L7_schelp(ctx, x, y, r, a = 1, col = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col || mix(C.grond, '#000000', 0.45); ctx.lineWidth = Math.max(2, r * 0.12);
  ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i * 0.3, rr = r * (1 - i / 75); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// vis van opzij (kop rechts); sk = 0..1 skelet (fossiel)
function L7_vis(ctx, x, y, s, a = 1, sk = 0, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const kl = C.licht ? '#6F8796' : '#8BA3B2';
  if (sk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sk; ctx.beginPath(); ctx.ellipse(0, 0, 70, 26, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(-104, -26); ctx.lineTo(-98, 0); ctx.lineTo(-104, 26); ctx.closePath(); ctx.fill(); circ(ctx, 46, -6, 4, '#111'); ctx.restore(); }
  if (sk > 0.01) { ctx.save(); ctx.globalAlpha *= sk; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-96, 0); ctx.lineTo(58, 0); ctx.stroke();
    ctx.lineWidth = 2.5; for (let i = 0; i < 9; i++) { const px = -50 + i * 12; ctx.beginPath(); ctx.moveTo(px, 0); ctx.quadraticCurveTo(px + 6, -12, px + 2, -22); ctx.moveTo(px, 0); ctx.quadraticCurveTo(px + 6, 12, px + 2, 22); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(64, 0, 13, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-96, 0); ctx.lineTo(-110, -20); ctx.moveTo(-96, 0); ctx.lineTo(-110, 20); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// bultrug van opzij (kop rechts), s = 1 → ± 740 breed; o.xray 0..1 = wervelkolom en heupbotjes zichtbaar, o.heup 0..1 = heupbotjes goud
function L7_walvis(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const xr = o.xray || 0, heup = o.heup || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin((o.T || 0) * 0.9) * 4); ctx.scale(s, s);
  const kl = C.licht ? '#3E4A5A' : '#4A5868', buik = C.licht ? '#9AA6B4' : '#A9B4C0';
  const lijf = () => { ctx.beginPath(); ctx.moveTo(320, 10); ctx.quadraticCurveTo(300, -55, 180, -80); ctx.quadraticCurveTo(20, -100, -140, -70); ctx.quadraticCurveTo(-250, -40, -310, -8);
    ctx.quadraticCurveTo(-350, -60, -410, -76); ctx.quadraticCurveTo(-390, -24, -362, 0); ctx.quadraticCurveTo(-390, 26, -410, 76); ctx.quadraticCurveTo(-350, 60, -310, 10);
    ctx.quadraticCurveTo(-240, 40, -120, 70); ctx.quadraticCurveTo(60, 104, 200, 72); ctx.quadraticCurveTo(300, 50, 320, 10); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= lerp(1, 0.32, xr);
  ctx.beginPath(); ctx.moveTo(-120, -72); ctx.lineTo(-160, -104); ctx.lineTo(-180, -64); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  lijf(); ctx.fillStyle = kl; ctx.fill();
  ctx.save(); lijf(); ctx.clip(); ctx.strokeStyle = rgba(buik, 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(300 - i * 4, 30 + i * 7); ctx.quadraticCurveTo(150, 60 + i * 8, 20, 82 + i * 6); ctx.stroke(); } ctx.restore();
  ctx.strokeStyle = rgba(buik, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(318, 12); ctx.quadraticCurveTo(260, 34, 190, 30); ctx.stroke();
  circ(ctx, 196, 8, 5, '#111');
  ctx.beginPath(); ctx.moveTo(140, 50); ctx.quadraticCurveTo(110, 150, -40, 214); ctx.quadraticCurveTo(-10, 170, 90, 60); ctx.closePath(); ctx.fillStyle = buik; ctx.fill();
  ctx.restore();
  if (xr > 0.01) { ctx.save(); ctx.globalAlpha *= xr; ctx.strokeStyle = C.text2; ctx.lineCap = 'round';
    for (let i = 0; i < 26; i++) { const u = i / 25, px = lerp(230, -340, u), py = -30 + Math.sin(u * 3.1) * -8 + u * 26; ctx.lineWidth = lerp(14, 6, u); ctx.beginPath(); ctx.moveTo(px - 6, py); ctx.lineTo(px + 6, py); ctx.stroke(); }
    const hk = mix(C.text2, C.goud, heup); ctx.strokeStyle = hk; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-150, 34); ctx.lineTo(-192, 46); ctx.moveTo(-158, 48); ctx.lineTo(-198, 58); ctx.stroke();
    if (heup > 0.01) gloed(ctx, -175, 46, 70, C.goud, heup * (0.7 + 0.3 * Math.sin((o.T || 0) * 3)));
    ctx.restore(); }
  ctx.restore(); }
// waar de heupbotjes zitten (voor wijs)
const L7_heupPunt = (x, y, s) => [x - 175 * s, y + 46 * s];
// oerwalvissen en verwanten van opzij (kop rechts); y = grond (of middenlijn bij Basilosaurus)
const L7_DIER = {
  paki: { kl: '#9A7A58', rx: 80, ry: 26, h: 72, poot: 58, dik: 9, vv: 8, av: 9, kop: 72, st: 110, sy: -12 },
  ambulo: { kl: '#77705A', rx: 115, ry: 28, h: 42, poot: 30, dik: 12, vv: 12, av: 28, kop: 96, st: 150, sy: 4, boven: true },
  rodho: { kl: '#66717E', rx: 145, ry: 30, h: 34, poot: 22, dik: 11, vv: 10, av: 20, kop: 92, st: 160, sy: 4, boven: true },
  basilo: { kl: '#56667A', rx: 300, ry: 30, h: 0, poot: 0, kop: 92, st: 120, sy: 0, fluke: true, vin: true, mini: true },
  nijl: { kl: '#8A7A86', rx: 120, ry: 56, h: 96, poot: 40, dik: 22, vv: 16, av: 16, kop: 70, st: 30, sy: -20, nijl: true }
};
function L7_dier(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; const P = L7_DIER[soort], by = -P.h, kl = P.kl, dk = mix(kl, '#000000', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  if (P.poot > 0) [[P.rx * 0.6, 0], [-P.rx * 0.55, 1]].forEach(([lx, ach]) => { ctx.strokeStyle = dk; ctx.lineWidth = P.dik; ctx.beginPath(); ctx.moveTo(lx, by + P.ry * 0.4); ctx.lineTo(lx, by + P.ry * 0.4 + P.poot); ctx.stroke();
    const fv = ach ? P.av : P.vv; ctx.beginPath(); ctx.ellipse(lx + fv * 0.5, by + P.ry * 0.4 + P.poot, fv, P.dik * 0.42, 0, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); });
  if (P.mini) { ctx.strokeStyle = dk; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-P.rx * 0.62, by + P.ry * 0.7); ctx.lineTo(-P.rx * 0.66, by + P.ry * 0.7 + 16); ctx.lineTo(-P.rx * 0.6, by + P.ry * 0.7 + 22); ctx.stroke(); }
  ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(-P.rx * 0.8, by - P.ry * 0.5); ctx.quadraticCurveTo(-P.rx - P.st * 0.5, by - P.ry * 0.3 + P.sy, -P.rx - P.st, by + P.sy); ctx.quadraticCurveTo(-P.rx - P.st * 0.5, by + P.ry * 0.25 + P.sy, -P.rx * 0.8, by + P.ry * 0.5); ctx.closePath(); ctx.fill();
  if (P.fluke) { const tx = -P.rx - P.st; ctx.beginPath(); ctx.moveTo(tx + 10, by); ctx.lineTo(tx - 30, by - 30); ctx.lineTo(tx - 18, by); ctx.lineTo(tx - 30, by + 30); ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, by, P.rx, P.ry, 0, 0, 6.283); ctx.fill();
  if (P.vin) { ctx.beginPath(); ctx.ellipse(P.rx * 0.62, by + P.ry * 0.9, 34, 11, 0.5, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); ctx.fillStyle = kl; }
  const hx = P.rx * 0.8, kk = P.kop; ctx.beginPath(); ctx.moveTo(hx, by - P.ry * 0.75); ctx.quadraticCurveTo(hx + kk * 0.45, by - P.ry * (P.nijl ? 1.0 : 0.85), hx + kk, by - P.ry * (P.nijl ? 0.3 : 0.08));
  ctx.lineTo(hx + kk, by + P.ry * (P.nijl ? 0.4 : 0.14)); ctx.quadraticCurveTo(hx + kk * 0.45, by + P.ry * 0.55, hx, by + P.ry * 0.6); ctx.closePath(); ctx.fill();
  circ(ctx, hx + kk * 0.32, by - P.ry * (P.boven ? 0.78 : 0.4), P.nijl ? 5 : 4, '#111');
  if (!P.boven && !P.fluke) { ctx.beginPath(); ctx.ellipse(hx + kk * 0.05, by - P.ry * 0.7, 7, 10, -0.3, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); }
  ctx.restore(); }
// punt op het dier in schermcoördinaten (dx = deel van rx, dy = deel van ry t.o.v. het lijfmidden)
const L7_op = (x, y, s, soort, dx, dy) => { const P = L7_DIER[soort]; return [x + s * dx, y + s * (-P.h + dy)]; };

// ledematen: botgroepen opper (goud), onder (teal), hand (koraal); schouder op (x, y), naar beneden
const L7_BOT = { opper: () => C.goud, onder: () => C.teal, hand: () => C.koraal };
const L7_LID = {
  mens: { huid: '#C9A07E', b: [[0, 0, 0, 170, 22, 'opper'], [-9, 182, -15, 330, 12, 'onder'], [9, 182, 13, 330, 12, 'onder'], [-12, 344, 12, 344, 22, 'hand'],
    [-26, 362, -46, 418, 9, 'hand'], [-12, 366, -16, 450, 8, 'hand'], [0, 366, 0, 462, 8, 'hand'], [12, 366, 16, 452, 8, 'hand'], [24, 362, 32, 432, 8, 'hand']] },
  vleer: { huid: '#6A5648', vlies: [[0, 0], [190, 30], [330, -40], [360, 60], [300, 170], [210, 210], [40, 230], [-10, 200]],
    b: [[0, 0, 40, 92, 15, 'opper'], [44, 98, 172, 40, 11, 'onder'], [48, 106, 150, 58, 6, 'onder'], [172, 40, 186, 34, 16, 'hand'],
      [188, 34, 330, -40, 6, 'hand'], [188, 36, 360, 60, 6, 'hand'], [186, 40, 300, 170, 6, 'hand'], [184, 42, 210, 210, 6, 'hand'], [186, 32, 200, 8, 7, 'hand']] },
  walvis: { huid: '#56667A', vin: true,
    b: [[0, 0, 0, 62, 26, 'opper'], [-11, 72, -13, 142, 15, 'onder'], [11, 72, 13, 142, 15, 'onder'], [-16, 158, 16, 158, 18, 'hand'],
      [-30, 178, -48, 300, 8, 'hand'], [-14, 180, -20, 336, 8, 'hand'], [0, 180, 4, 352, 8, 'hand'], [14, 180, 24, 330, 8, 'hand'], [28, 176, 44, 280, 8, 'hand']] },
  paard: { huid: '#8A6242', b: [[0, 0, 10, 112, 24, 'opper'], [10, 122, 5, 272, 18, 'onder'], [17, 122, 15, 172, 8, 'onder'], [-6, 288, 16, 288, 18, 'hand'],
    [5, 302, 5, 420, 14, 'hand'], [5, 428, 9, 478, 12, 'hand']], hoef: true }
};
function L7_lid(ctx, x, y, s, soort, a = 1, bot = 0) { if (a <= 0.01) return; const L = L7_LID[soort];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  laag(ctx, lerp(1, 0.28, bot), (l) => { l.fillStyle = L.huid; l.strokeStyle = L.huid;
    if (L.vlies) { l.beginPath(); L.vlies.forEach(([px, py], i) => i ? l.lineTo(px, py) : l.moveTo(px, py)); l.closePath(); l.fillStyle = mix(L.huid, C.bg, 0.25); l.fill(); }
    if (L.vin) { l.beginPath(); l.moveTo(-34, -10); l.quadraticCurveTo(-80, 200, -46, 330); l.quadraticCurveTo(0, 400, 50, 320); l.quadraticCurveTo(80, 180, 34, -10); l.closePath(); l.fill(); }
    L.b.forEach(([x1, y1, x2, y2, w]) => { l.lineWidth = w + 30; l.beginPath(); l.moveTo(x1, y1); l.lineTo(x2, y2); l.stroke(); });
    if (L.hoef) { l.beginPath(); l.moveTo(-14, 476); l.lineTo(30, 476); l.lineTo(36, 512); l.lineTo(-20, 512); l.closePath(); l.fillStyle = mix(L.huid, '#000000', 0.45); l.fill(); } });
  if (bot > 0.01) { ctx.globalAlpha *= bot; L.b.forEach(([x1, y1, x2, y2, w, g]) => { ctx.strokeStyle = L7_BOT[g](); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }); }
  ctx.restore(); }
// haaienvin: kraakbeenstralen, geen vingers
function L7_haaienvin(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-30, 160, 30, 280); ctx.quadraticCurveTo(70, 160, 50, 0); ctx.closePath(); ctx.fillStyle = C.licht ? '#7C8A98' : '#8E9CAA'; ctx.fill();
  ctx.strokeStyle = rgba(C.bg, 0.6); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 9, 10); ctx.lineTo(-10 + i * 7, 150 + i * 10); ctx.stroke(); } ctx.restore(); }
// stukje wervelkolom; n wervels van (x1,y1) naar (x2,y2)
function L7_wervels(ctx, x1, y1, x2, y2, n, a = 1, col = null, dik = 18) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1);
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, px = lerp(x1, x2, u), py = lerp(y1, y2, u), L = Math.hypot(x2 - x1, y2 - y1) / n * 0.78;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an); roundRect(ctx, -L / 2, -dik / 2, L, dik, 5); shape(ctx, rgba(col || C.text2, 0.35), col || C.text2, 2); ctx.restore(); }
  ctx.restore(); }
// rij DNA-letters (mono); dif = posities die verschillen (paars), o.ins = invoegsel 0..1, o.insTekst of null (= ontbreekt)
const L7_REF = 'ATGACCAACATCCGAAAGTC', L7_INS = 'GGTA';
function L7_dnaRij(ctx, x, y, seq, dif, a = 1, o = {}) { if (a <= 0.01) return; const w = 46, ins = o.ins || 0, split = 10, extra = 4 * w * ins;
  ctx.save(); ctx.globalAlpha *= a;
  seq.split('').forEach((ch, i) => { const xx = x + i * w + (i >= split ? extra : 0) + w / 2, d = dif.includes(i) ? (o.toon == null ? 1 : o.toon) : 0;
    if (d > 0.01) { roundRect(ctx, xx - 20, y - 36, 40, 50, 8); shape(ctx, rgba(C.paars, 0.35 * d), rgba(C.paars, d), 2.5); }
    text(ctx, ch, xx, y, fMeta(34), d > 0.5 ? C.text : C.text2, 'center'); });
  if (ins > 0.01) { const gx = x + split * w; ctx.globalAlpha *= ins;
    if (o.heeft) { roundRect(ctx, gx + 2, y - 38, 4 * w - 4, 54, 10); shape(ctx, rgba(C.goud, 0.25), C.goud, 3); L7_INS.split('').forEach((ch, k) => text(ctx, ch, gx + k * w + w / 2, y, fMeta(34), C.goud, 'center')); }
    else for (let k = 0; k < 4; k++) text(ctx, '–', gx + k * w + w / 2, y, fMeta(34), C.text2, 'center'); }
  ctx.restore(); }
// klein raster van 100 hokjes, nd = aantal dat verschilt (paars)
function L7_raster(ctx, x, y, cel, nd, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const plek = [23, 67, 41, 88];
  for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), d = plek.slice(0, nd).includes(i); roundRect(ctx, x + c * cel + 2, y + r * cel + 2, cel - 4, cel - 4, 4); shape(ctx, d ? rgba(C.paars, 0.85) : rgba(C.teal, 0.25), d ? C.paars : rgba(C.teal, 0.6), 1.5); }
  ctx.restore(); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 7: hoe weten we dat? Lagen en fossielen, hetzelfde skelet, het spoor in het DNA', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 7 van de nieuwe reeks, Hoe weten we dat?: havo Biologie voor jou H4, vwo Nectar H7. Bewust kort (± 25 minuten), te combineren met les 6 of les 8.' }],
  teken(ctx, S) {
    const T = S.T, k = L7_LKL();
    metaText(ctx, 'Evolutie · les 7', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Hoe weten', 140, 465, fTitel(98), C.text); text(ctx, 'we dat?', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'fossielen · homologe organen · DNA', 144, 675, 1, C.text2, 32, 'left', 400);
    [0, 1, 2, 3].forEach(i => L7_laag(ctx, 1100, 900 - (i + 1) * 100, 680, 100, k[i], 1, i + 2));
    L7_vis(ctx, 1300, 755, 1.1, 1, 1, 0.05); L7_schelp(ctx, 1640, 850, 26); L7_schelp(ctx, 1200, 650, 20);
    L7_walvis(ctx, 1440, 360, 0.55, 1, { T });
  } });

// ---------- 2 · de bultrug ----------
SCHERMEN.push({ titel: 'De bultrug', kop: 'Een zoogdier in zee', deel: 'Opening',
  stappen: [
    { t: 'Een bultrug: ± 15 meter lang. Ze ademt lucht en zoogt haar jong. Een zoogdier, net als jij.', n: 'De opening van de film. Vraag eventueel wat een walvis tot zoogdier maakt (longen, melk, haar bij de geboorte).' },
    { t: 'In haar buik liggen twee kleine botjes, los van de wervelkolom: <b>heupbotjes</b>, zonder poten eraan.', n: 'Hier nog geen uitleg: de heupbotjes komen terug bij rudimentaire organen (scherm 9).' },
    { t: 'Biologen zeggen: walvissen stammen af van landdieren. Maar niemand was erbij. Begin bij de grond: welke laag is het oudst?', n: 'Startvraag van de film: Hoe weet je welke laag in de grond het oudst is? Het antwoord volgt op scherm 3 en 4.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.2), a2 = S.on(2, 0.9);
    const wx = 880, wy = 560, ws = 1.15;
    L7_walvis(ctx, wx, wy, ws, a0, { T, xray: a1, heup: a1 * S.on(1, 0.6, 0.6) });
    if (a0 > 0.01) { const x1 = wx - 410 * ws, x2 = wx + 320 * ws, yy = 300; ctx.save(); ctx.globalAlpha *= a0 * S.on(0, 0.6, 0.5); ctx.strokeStyle = C.text2; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.moveTo(x1, yy - 14); ctx.lineTo(x1, yy + 14); ctx.moveTo(x2, yy - 14); ctx.lineTo(x2, yy + 14); ctx.stroke(); ctx.restore();
      regel(ctx, '± 15 m', (x1 + x2) / 2, yy - 18, a0 * S.on(0, 0.6, 0.5), C.text, 34, 'center', 700); }
    if (a1 > 0.01) { const [hx, hy] = L7_heupPunt(wx, wy, ws); wijs(ctx, 'heupbotjes', hx - 40, hy + 200, hx, hy + 8, a1 * S.on(1, 0.6, 0.6), C.goud, 34); }
    if (a2 > 0.01) { const k = L7_LKL(); [0, 1, 2, 3].forEach(i => L7_laag(ctx, 1480, 960 - (i + 1) * 110, 360, 110, k[i], a2 * S.on(2, 0.4, i * 0.15), i + 5));
      L7_schelp(ctx, 1560, 900, 22, a2); L7_vis(ctx, 1700, 790, 0.6, a2, 1); regel(ctx, 'lagen in de grond', 1660, 480, a2, C.text2, 30, 'center', 600); }
  } });

// ---------- 3 · lagen en fossielen ----------
SCHERMEN.push({ titel: 'Lagen', kop: 'Laag op laag', deel: 'Lagen en fossielen',
  stappen: [
    { t: 'Rivieren en zeeën laten zand en klei bezinken. Laag op laag, duizenden jaren lang.', n: 'Sedimentgesteente (zandsteen, kalksteen, klei) ontstaat zo. Fossielen vind je bijna alleen in zulke lagen.' },
    { t: 'Raakt een dood dier snel bedolven, dan kan het een <b>fossiel</b> worden: een versteend overblijfsel van een organisme.', n: 'Snel bedolven = geen aaseters, weinig zuurstof. Daarom zijn fossielen zeldzaam en vind je vooral harde delen (botten, tanden, schelpen).' },
    { t: 'Elke nieuwe laag komt bovenop de vorige: normaal is de onderste laag het oudst. Dat is <b>relatieve datering</b>.', n: 'Relatief: je weet de volgorde, nog niet het aantal jaren. Dat komt op scherm 5.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 2.0), a1 = S.on(1, 2.2), a2 = S.on(2, 0.9), k = L7_LKL();
    const x0 = 200, w = 1020, lh = 120, yb = 1000;
    ctx.save(); ctx.fillStyle = rgba(C.water, C.licht ? 0.1 : 0.14); ctx.fillRect(x0, 200, w, yb - 200); ctx.restore();
    // lagen 0–2 in stap 0, lagen 3–4 in stap 1 (bedekken de vis)
    const zicht = [a0 * 3, a0 * 3 - 1, a0 * 3 - 2, a1 * 2.2 - 0.6, a1 * 2.2 - 1.4].map(v => clamp(v, 0, 1));
    zicht.forEach((v, i) => { if (v <= 0.01) return; const h = lh * ease(v); L7_laag(ctx, x0, yb - i * lh - h, w, h, k[i], 1, i + 1); });
    if (a0 > 0.01 && a0 < 0.99) for (let i = 0; i < 40; i++) { const u = (T * 0.25 + hash(i)) % 1; circ(ctx, x0 + 20 + hash(i * 3.7) * (w - 40), lerp(220, yb - lh * 3 * a0, u), 3, rgba(C.grond, 0.8)); }
    L7_schelp(ctx, 420, yb - 60, 24, zicht[0]); L7_schelp(ctx, 980, yb - lh - 55, 20, zicht[1]);
    if (a1 > 0.01) { const zak = ease(clamp(a1 * 2.5, 0, 1)), vy = lerp(320, yb - lh * 3 - 22, zak), sk = clamp(a1 * 2 - 1, 0, 1);
      L7_vis(ctx, 700, vy, 1.2, 1, sk, lerp(0.4, 0.04, zak)); termKaart(ctx, 'fossiel', 'versteend overblijfsel van een organisme', 1570, 230, a1 * S.on(1, 0.6, 1.4)); }
    if (a2 > 0.01) { pijl(ctx, 1280, 470, 1280, 960, C.goud, 5, a2); regel(ctx, 'ouder', 1305, 970, a2, C.goud, 34, 'left', 700); regel(ctx, 'jonger', 1305, 480, a2, C.text2, 30, 'left', 600);
      termKaart(ctx, 'relatieve datering', 'de volgorde, nog niet het aantal jaren', 1590, 640, a2 * S.on(2, 0.6, 0.5)); }
  } });

// ---------- 4 · op zijn kop ----------
SCHERMEN.push({ titel: 'Omgeklapt', kop: 'Lagen op hun kop', deel: 'Lagen en fossielen',
  stappen: [
    { t: 'De aardkorst beweegt. Lagen kunnen later kantelen, plooien, breken of zelfs omklappen.', n: 'In de film vindt Dr. Kim lagen die zo ver gekanteld zijn dat ze op hun kop liggen. Laat de stapel omklappen en volg laag R met je vinger.' },
    { t: 'Deze lagen zijn na het afzetten omgeklapt. Laag P ligt nu het diepst.', n: 'Vraag uit de film: Deze lagen zijn na het afzetten omgeklapt. Welke laag is het oudst? (a) Laag P: die ligt nu het diepst, (b) Laag R: die lag onderop toen de lagen nog plat lagen, (c) Dat kun je na het kantelen niet meer weten. Antwoord b.' },
    { t: 'Draai de lagen terug tot ze plat liggen. De laag die toen onderop lag, is als eerste afgezet: die is het oudst, ook al ligt hij nu bovenop.', n: 'Geologen zien aan sporen in de lagen zelf (bv. ribbels, sorteren van korrels, fossielen in leefhouding) wat oorspronkelijk boven was. Zie de briefing.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.6), flip = S.on(0, 2.4, 0.6) * (1 - S.on(2, 2.2, 0.3)), a2 = S.on(2, 0.6, 2.4), k = L7_LKL();
    const cx = 720, cy = 600, w = 680, lh = 130, rot = Math.PI * flip, nm = ['R', 'Q', 'P'], kl = [k[0], k[2], k[3]];
    if (a0 <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a0; ctx.translate(cx, cy); ctx.rotate(rot);
    nm.forEach((n, i) => { const y = lh * 1.5 - (i + 1) * lh; L7_laag(ctx, -w / 2, y, w, lh, kl[i], 1, i + 9); L7_schelp(ctx, -w / 2 + 120 + i * 190, y + lh / 2, 22, 1); });
    ctx.restore();
    nm.forEach((n, i) => { const ly = lh * 1.5 - (i + 0.5) * lh, px = cx + Math.cos(rot) * 0 - Math.sin(rot) * ly, py = cy + Math.sin(rot) * 0 + Math.cos(rot) * ly;
      const goud = i === 0 ? a2 : 0; if (goud > 0.01) gloed(ctx, px + 400, py, 90, C.goud, goud);
      regel(ctx, n, px + 400, py + 18, a0, goud > 0.5 ? C.goud : C.text, 54, 'center', 700); });
    if (a2 > 0.01) { const py = cy + lh; regel(ctx, 'als eerste afgezet: oudst', cx + w / 2 + 110, py + 14, a2, C.goud, 36, 'left', 700); }
    metaText(ctx, flip > 0.5 ? 'nu: omgeklapt' : 'plat, zoals afgezet', cx, 300, C.text2, 'center', 22, a0);
    pers(ctx, 'kim', 1760, 1010, 560, { t: T, uit: 'neutraal', kijk: -1, a: a0, outfit: 'lab' });
  } });

// ---------- 5 · absolute datering ----------
SCHERMEN.push({ titel: 'Hoeveel jaar?', kop: 'Het aantal jaren meten', deel: 'Lagen en fossielen',
  stappen: [
    { t: 'Hoeveel jaar oud? Dat meet je met radioactieve stoffen in gesteente of botten: <b>absolute datering</b>.', n: 'Radioactieve atomen vervallen in een vast tempo, onafhankelijk van temperatuur of druk. Hoe dat werkt is natuurkunde; hier is het een gegeven.' },
    { t: 'Van koolstof-14 is na ± 5700 jaar de helft vervallen: de <b>halveringstijd</b>. Na nog eens 5700 jaar de helft van de rest.', n: 'Rekenvoorbeeld: na 3 halveringstijden (± 17.100 jaar) is nog 1/8 over. De exacte waarde is 5730 jaar.' },
    { t: 'Koolstof-14 werkt alleen voor resten van organismen, tot ± 50.000 jaar terug. Voor oudere lagen gebruiken geologen andere radioactieve stoffen.', n: 'Walvisfossielen van 50 miljoen jaar date je dus niet met koolstof-14, maar via vulkanische lagen erboven of eronder (bv. kalium-argon, uranium-lood; zie briefing).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 1.0);
    const lab = [['0 jaar', '100 %'], ['5700', '50 %'], ['11.400', '25 %'], ['17.100 jaar', '12,5 %']], over = [64, 32, 16, 8];
    lab.forEach(([j, p], i) => { const a = i === 0 ? a0 : a1 * S.on(1, 0.5, (i - 1) * 0.4); if (a <= 0.01) return; const x = 170 + i * 420, y = 210;
      paneel(ctx, x, y, 270, 270, a); stippen(ctx, x + 15, y + 15, 240, 240, 64, (q) => q < over[i] ? C.teal : rgba(C.line, 0.22), a, { r: 11 });
      regel(ctx, j, x + 135, y + 320, a, C.text, 32, 'center', 700); regel(ctx, p, x + 135, y + 362, a, C.teal, 30, 'center', 700);
      if (i > 0) { pijl(ctx, x - 140, y + 135, x - 14, y + 135, C.text2, 4, a); regel(ctx, '½', x - 77, y + 115, a, C.text2, 34, 'center', 700); } });
    termKaart(ctx, 'absolute datering', 'het aantal jaren meten', 470, 640, a0 * S.on(0, 0.6, 0.4));
    termKaart(ctx, 'halveringstijd', 'na deze tijd is de helft vervallen', 1300, 640, a1 * S.on(1, 0.6, 1.2));
    if (a2 > 0.01) { const x = 200, y1 = 830, y2 = 920;
      ctx.save(); ctx.globalAlpha *= a2; roundRect(ctx, x, y1 - 26, 120, 40, 20); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); roundRect(ctx, x, y2 - 26, 1500 * a2, 40, 20); shape(ctx, rgba(C.oker, 0.6), C.oker, 2); ctx.restore();
      regel(ctx, 'koolstof-14 · tot ± 50.000 jaar · alleen resten van organismen', x + 150, y1 + 6, a2, C.text, 30, 'left', 600);
      regel(ctx, 'andere radioactieve stoffen · ook miljoenen jaren oud gesteente', x, y2 + 76, a2 * S.on(2, 0.5, 0.6), C.text, 30, 'left', 600); }
  } });

// ---------- 6 · walvissen in de lagen ----------
const L7_RIJ = [['paki', 'Pakicetus', '± 50 mln jaar', 0.95], ['ambulo', 'Ambulocetus', '± 48 mln jaar', 0.95], ['rodho', 'Rodhocetus', '± 47 mln jaar', 0.9], ['basilo', 'Basilosaurus', '± 40 mln jaar', 0.85]];
SCHERMEN.push({ titel: 'Oerwalvissen', kop: 'Walvissen in de lagen', deel: 'Walvissen in de lagen',
  stappen: [
    { t: 'In Pakistan en India: <b>Pakicetus</b>, ± 50 miljoen jaar oud. Een landdier op vier slanke poten, maar met een oor zoals je dat verder alleen bij walvissen vindt.', n: 'Lagen van ongeveer 50 tot 47 miljoen jaar oud. Het oor: een verdikt, dicht botje rond het middenoor (bulla met involucrum), alleen bij walvissen. Pakicetus was 1 à 2 m lang.' },
    { t: '<b>Ambulocetus</b>, ± 48 miljoen jaar: korte poten, grote achtervoeten, de ogen bovenop de kop. Hij leefde in ondiep water, een beetje als een krokodil.', n: 'De dieren zijn niet op schaal getekend. Ambulocetus = \'wandelende walvis\'.' },
    { t: '<b>Rodhocetus</b>, ± 47 miljoen jaar: een zwemmerslijf op korte poten. In zijn enkel zit een botje met een vorm die je verder alleen kent van evenhoevigen.', n: 'Het enkelbotje (sprongbeen, astragalus) met een dubbele katrol, zoals bij koeien, varkens en nijlpaarden.' },
    { t: '<b>Basilosaurus</b>, ± 40 miljoen jaar: een echte walvis van 15 meter, alleen in zee. Toch had hij nog achterpootjes van ± 35 cm, los van de wervelkolom.', n: 'Basilosaurus werd volgens sommige bronnen tot 17–18 m. Zijn bekken zat niet meer vast aan de wervelkolom.' }
  ],
  teken(ctx, S) {
    const T = S.T, k = L7_LKL(), lh = 190, yb = 1020, x0 = 140, lw = 400;
    L7_RIJ.forEach(([sr, nm, jr, s], i) => { const a = S.on(i, 0.9); const y = yb - (i + 1) * lh;
      L7_laag(ctx, x0, y, lw, lh, k[i], i <= S.b ? 1 : 0.35, i + 3);
      if (a <= 0.01) return;
      ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.lineCap = 'round'; const bx = x0 + 70, by = y + lh / 2 + 20; for (let q = 0; q < 5; q++) { ctx.beginPath(); ctx.moveTo(bx + q * 26, by - 10 + (q % 2) * 6); ctx.lineTo(bx + q * 26 + 20, by - 4 + (q % 2) * 6); ctx.stroke(); } ctx.restore();
      regel(ctx, jr, x0 + lw / 2 + 60, y + lh / 2 + 12, a, C.text, 30, 'left', 700);
      pijl(ctx, x0 + lw + 20, y + lh / 2, x0 + lw + 110, y + lh / 2, rgba(C.line, 0.8), 3, a);
      const dx = sr === 'basilo' ? 1200 : 1050, dy = sr === 'basilo' ? y + lh / 2 : y + lh / 2 + 60;
      L7_dier(ctx, dx, dy, s, sr, a);
      naam(ctx, nm, 700, y + 46, a, 'left', C.text2, 30);
      const b = a * S.on(i, 0.6, 0.6);
      if (sr === 'paki') { const [px, py] = L7_op(dx, dy, s, 'paki', 70, -18); wijs(ctx, 'oor als bij walvissen', px + 330, py - 30, px, py, b, C.goud, 30); }
      if (sr === 'ambulo') { const [px, py] = L7_op(dx, dy, s, 'ambulo', 140, -24); wijs(ctx, 'ogen bovenop', px + 290, py - 20, px, py, b, C.goud, 30);
        const [qx, qy] = L7_op(dx, dy, s, 'ambulo', -50, 72); wijs(ctx, 'grote achtervoeten', qx - 250, qy + 20, qx, qy - 4, b, C.goud, 30); }
      if (sr === 'rodho') { const [px, py] = L7_op(dx, dy, s, 'rodho', -80, 52); wijs(ctx, 'enkelbotje als bij evenhoevigen', px + 600, py - 90, px, py, b, C.goud, 30); }
      if (sr === 'basilo') { const [px, py] = L7_op(dx, dy, s, 'basilo', -190, 46); wijs(ctx, 'achterpootjes ± 35 cm', px + 40, py + 56, px, py, b, C.goud, 30); }
    });
    metaText(ctx, 'jonger ↑', x0 + lw / 2, 200, C.text2, 'center', 20, 1);
  } });

// ---------- 7 · voorouder of verwant ----------
const L7_KETEN = [[300, 640], [680, 640], [1060, 640], [1480, 640]];
const L7_TAK = [[[760, 880], [500, 800]], [[760, 760], [1020, 680]], [[760, 640], [500, 560]], [[760, 500], [1020, 420]]];
SCHERMEN.push({ titel: 'Voorouder?', kop: 'Een keten of een boom?', deel: 'Walvissen in de lagen',
  stappen: [
    { t: 'Van oud naar jong: Pakicetus, Ambulocetus, Rodhocetus, Basilosaurus. Het lijkt een keten waarin het ene dier in het andere veranderde.', n: 'Vraag uit de film: Is Pakicetus de voorouder van Ambulocetus? (a) Niet per se, (b) Ja, het ene dier veranderde in het andere, (c) Nee, ze zijn niet verwant. Antwoord a.' },
    { t: 'Een fossiel is bijna nooit precies een voorouder. Je vindt verwanten, op zijtakken van dezelfde boom.', n: 'De kans dat je precies de voorouderpopulatie vindt, is klein. Fossielen zitten dicht bij de stam, op zijtakken.' },
    { t: 'Samen laten ze zien hoe de boom vertakte: steeds kleinere achterpoten en steeds meer een zwemmerslijf. Over miljoenen jaren, in hele populaties.', n: 'Geen individu veranderde: in elke generatie verschoof wat vaak voorkwam (les 1 en 2).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), m = S.on(1, 1.6), a2 = S.on(2, 1.0), soorten = ['paki', 'ambulo', 'rodho', 'basilo'], sc = [0.85, 0.75, 0.65, 0.42];
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 980); ctx.lineTo(760, 280); ctx.stroke();
      ctx.lineWidth = 5; L7_TAK.forEach(([[sx, sy], [ex, ey]]) => { ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(ex, sy, ex, ey + 60); ctx.stroke(); }); ctx.restore();
      L7_walvis(ctx, 760, 240, 0.28, m, { T }); naam(ctx, 'walvissen nu', 900, 250, m, 'left', C.text2, 28); }
    soorten.forEach((sr, i) => { const [cx, cy] = L7_KETEN[i], [ex, ey] = L7_TAK[i][1], x = lerp(cx, ex, ease(m)), y = lerp(cy, ey + 40, ease(m)), s = lerp(sc[i], sc[i] * 0.72, m);
      L7_dier(ctx, x, y, s, sr, a0); });
    if (a0 > 0.01 && m < 0.99) { const ak = a0 * (1 - m); [0, 1, 2].forEach(i => pijl(ctx, L7_KETEN[i][0] + 120, 560, L7_KETEN[i + 1][0] - 140, 560, C.text2, 4, ak)); }
    if (m > 0.01) { misvatting(ctx, 'het ene dier werd het andere', 'verwanten op zijtakken', 1500, 210, 660, m * S.on(1, 0.6, 0.8), S.on(1, 0.6, 1.4)); }
    if (a2 > 0.01) { const hx = 1250, hy = 900; metaText(ctx, 'achterpoten', hx, 480, C.text2, 'left', 22, a2);
      [1, 0.8, 0.55, 0.12].forEach((v, i) => { const a = a2 * S.on(2, 0.5, i * 0.2), x = hx + i * 150; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, hy - 340 * v, 60, 340 * v, 12); shape(ctx, rgba(C.goud, 0.5), C.goud, 2); ctx.restore(); });
      pijl(ctx, hx, hy + 40, hx + 510, hy + 40, C.text2, 4, a2); regel(ctx, 'oud', hx, hy + 90, a2, C.text2, 28, 'left', 600); regel(ctx, 'jong', hx + 520, hy + 90, a2, C.text2, 28, 'right', 600);
      regel(ctx, 'miljoenen jaren', hx + 255, 1030, a2 * S.on(2, 0.5, 0.8), C.goud, 32, 'center', 700); }
  } });

// ---------- 8 · homologe organen ----------
const L7_LEDEN = [['mens', 240, 0.88, 'grijpen'], ['vleer', 500, 0.82, 'vliegen'], ['walvis', 960, 1.0, 'zwemmen'], ['paard', 1250, 0.86, 'rennen']];
SCHERMEN.push({ titel: 'Zelfde skelet', kop: 'Van buiten anders, van binnen hetzelfde', deel: 'Hetzelfde skelet',
  stappen: [
    { t: 'Een mensenarm, een vleermuisvleugel, een walvisvin en het voorbeen van een paard. Van buiten lijken ze niets op elkaar.', n: 'Laat leerlingen eerst raden welke botten erin zitten.' },
    { t: 'Van binnen wel: één opperarmbeen, dan spaakbeen en ellepijp, dan pols- en handbotjes.', n: 'Bij het paard is de ellepijp grotendeels vergroeid met het spaakbeen, en loopt het op één vinger (de middelste).' },
    { t: 'Elke ledemaat heeft een andere vorm en functie. Organen met dezelfde bouw maar vaak een andere functie heten <b>homologe organen</b>.', n: 'Vraag uit de film: Waarom zitten er vingerbotjes in een walvisvin? (a) Een vin heeft vingers nodig om te kunnen sturen, (b) Walvissen erfden ze van een voorouder die poten met vingers had, (c) Dat is toeval. Antwoord b.' },
    { t: 'Een vin werkt ook zonder vingers: een haaienvin heeft ze niet. Homologe organen wijzen op een <b>gemeenschappelijke voorouder</b>.', n: 'Contrast met de haai: zelfde functie (zwemmen), andere bouw. Dat heet analoog; dat komt in les 8 (dolfijn en haai).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), b = S.on(1, 1.2), a2 = S.on(2, 0.9), a3 = S.on(3, 1.2);
    L7_LEDEN.forEach(([sr, x, s, f], i) => { L7_lid(ctx, x, 230, s, sr, a0 * S.on(0, 0.5, i * 0.15), b); regel(ctx, f, x + (sr === 'vleer' ? 110 : 0), 760, a2 * S.on(2, 0.5, i * 0.15), C.text, 34, 'center', 700); });
    if (b > 0.01) [['opperarmbeen', 'opper'], ['spaakbeen en ellepijp', 'onder'], ['pols- en handbotjes', 'hand']].forEach(([nm, g], i) => { const a = b * S.on(1, 0.5, 0.4 + i * 0.25), y = 240 + i * 62;
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1450, y - 26, 44, 30, 8); ctx.fillStyle = L7_BOT[g](); ctx.fill(); ctx.restore(); naam(ctx, nm, 1512, y, a, 'left', C.text, 32); });
    termKaart(ctx, 'homologe organen', 'zelfde bouw, vaak andere functie', 1640, 450, a2 * S.on(2, 0.6, 0.6));
    if (a3 > 0.01) { L7_haaienvin(ctx, 1470, 630, 0.72, a3); kruis(ctx, 1480, 870, 14, a3); regel(ctx, 'haai: geen vingers', 1480, 925, a3, C.text2, 28, 'center', 600);
      L7_lid(ctx, 1780, 630, 0.6, 'walvis', a3, 1); vink(ctx, 1780, 870, 14, a3); regel(ctx, 'walvis: vingers', 1780, 925, a3, C.text2, 28, 'center', 600);
      const vx = 720, vy = 960; ctx.save(); ctx.globalAlpha *= a3 * S.on(3, 0.8, 0.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; L7_LEDEN.forEach(([sr, x]) => { const xx = x + (sr === 'vleer' ? 110 : 0); ctx.beginPath(); ctx.moveTo(xx, 790); ctx.quadraticCurveTo(xx, vy, vx, vy); ctx.stroke(); }); ctx.restore();
      circ(ctx, vx, vy, 12, C.goud); gloed(ctx, vx, vy, 60, C.goud, a3 * S.on(3, 0.8, 0.6)); regel(ctx, 'voorouder met poten', vx, vy + 60, a3 * S.on(3, 0.6, 1.0), C.goud, 32, 'left', 700); }
  } });

// ---------- 9 · rudimentaire organen ----------
SCHERMEN.push({ titel: 'Rudimentair', kop: 'Botjes die niets meer dragen', deel: 'Hetzelfde skelet',
  stappen: [
    { t: 'Bij een landdier zit het bekken vast aan de wervelkolom en draagt het de achterpoten. Bij de walvis dragen de heupbotjes niets meer.', n: 'Terug naar de bultrug uit de opening (scherm 2).' },
    { t: 'Zo\'n overblijfsel heet een <b>rudimentair orgaan</b>: het is zijn oorspronkelijke functie kwijt.', n: 'Wel zitten er nog spieren aan die helpen bij het paren (zie briefing). Maar dat het juist heupbotjes zijn, verklaar je alleen met voorouders die achterpoten hadden.' },
    { t: 'Jij hebt er ook een: je <b>staartbeen</b>. Een paar vergroeide wervels aan het eind van je wervelkolom, het restant van de staart van verre voorouders.', n: 'Ook het staartbeen heeft nog een functie als aanhechting van spieren en banden; de oorspronkelijke functie (staart) is weg.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 0.9), a2 = S.on(2, 1.0);
    if (a0 > 0.01) { ctx.save(); ctx.globalAlpha *= a0; paneel(ctx, 100, 190, 760, 520, 1); ctx.restore();
      metaText(ctx, 'landdier', 140, 240, C.text2, 'left', 22, a0);
      ctx.save(); ctx.globalAlpha *= a0; ctx.beginPath(); ctx.ellipse(220, 380, 70, 44, -0.15, 0, 6.283); shape(ctx, rgba(C.text2, 0.25), C.text2, 2.5); ctx.restore();
      L7_wervels(ctx, 290, 390, 780, 400, 14, a0);
      ctx.save(); ctx.globalAlpha *= a0; ctx.lineCap = 'round'; ctx.strokeStyle = C.text2; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(340, 410); ctx.lineTo(330, 530); ctx.lineTo(340, 650); ctx.stroke();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(620, 380); ctx.lineTo(690, 450); ctx.stroke(); ctx.strokeStyle = C.text2; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(680, 450); ctx.lineTo(720, 550); ctx.lineTo(690, 650); ctx.stroke(); ctx.restore();
      wijs(ctx, 'bekken, vast', 560, 520, 650, 420, a0, C.goud, 30);
      L7_walvis(ctx, 1420, 450, 0.95, a0, { T, xray: 1, heup: 1 });
      const [hx, hy] = L7_heupPunt(1420, 450, 0.95); wijs(ctx, 'heupbotjes, los', hx + 60, hy + 210, hx, hy + 6, a0 * S.on(0, 0.6, 0.5), C.goud, 30); }
    termKaart(ctx, 'rudimentair orgaan', 'oorspronkelijke functie kwijt', 1420, 760, a1);
    if (a2 > 0.01) { const g = a2 * S.on(2, 0.6, 0.5); metaText(ctx, 'onderkant van jouw wervelkolom', 170, 790, C.text2, 'left', 22, a2);
      L7_wervels(ctx, 400, 820, 400, 950, 4, a2, null, 40);
      ctx.save(); ctx.globalAlpha *= a2; ctx.beginPath(); ctx.moveTo(350, 955); ctx.quadraticCurveTo(400, 975, 450, 955); ctx.lineTo(400, 1010); ctx.closePath(); shape(ctx, rgba(C.text2, 0.3), C.text2, 2); ctx.restore();
      gloed(ctx, 400, 1030, 60, C.goud, g); [0, 1, 2].forEach(i => { ctx.save(); ctx.globalAlpha *= g; ctx.beginPath(); ctx.ellipse(400, 1018 + i * 14, 12 - i * 3, 6, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.6), C.goud, 2); ctx.restore(); });
      wijs(ctx, 'staartbeen', 560, 1040, 416, 1030, g, C.goud, 32, 'left'); }
  } });

// ---------- 10 · DNA ----------
const L7_RIJEN = [['walvis', L7_REF, [], true], ['nijlpaard', 'ATGACCAACGTCCGAAAGTC', [9], true], ['koe', 'ATGACTAACGTCCGGAAGTC', [5, 9, 14], false], ['zeehond', 'ATCACTAACGTGCGGAAATC', [2, 5, 9, 11, 14, 17], false]];
SCHERMEN.push({ titel: 'DNA', kop: 'Het spoor in het DNA', deel: 'Het spoor in het DNA',
  stappen: [
    { t: 'Soorten met een gemeenschappelijke voorouder erfden allebei zijn DNA. Daarna stapelen zich in elke lijn eigen mutaties op.', n: 'Vraag uit de film: Welk dier is het nauwst verwant aan de walvis? (a) De zeehond, (b) De koe, (c) Het nijlpaard. Antwoord c. In de film legt Dr. Kim hetzelfde stukje gen van vier dieren naast elkaar. De reeks is een verzonnen voorbeeld.' },
    { t: 'Tel de verschillen met de walvis. Hoe minder verschillen, hoe korter geleden de splitsing, en hoe nauwer verwant: het <b>nijlpaard</b>.', n: 'De zeehond lijkt van buiten meer op een walvis, maar zijn DNA wijkt verder af. Hij is een roofdier, verwant aan honden en beren.' },
    { t: 'Walvis en nijlpaard delen zelfs een ingevoegd stukje DNA, op precies dezelfde plek. De koe heeft het niet. Zo\'n stukje erven ze van één gemeenschappelijke voorouder.', n: 'Zulke invoegsels (SINE\'s) ontstaan zelden en vrijwel nooit twee keer op dezelfde plek. Nikaido e.a. (1999) vonden er vier die alleen walvissen en nijlpaarden delen (briefing).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.2), a2 = S.on(2, 1.4), x = 600;
    pers(ctx, 'kim', 230, 1010, 540, { t: T, uit: a1 > 0.5 ? 'blij' : 'denkt', kijk: 1, a: a0, outfit: 'lab' });
    L7_RIJEN.forEach(([nm, seq, dif, heeft], i) => { const y = 300 + i * 150, a = a0 * S.on(0, 0.5, i * 0.2);
      naam(ctx, nm, x - 30, y, a, 'right', i === 1 && a1 > 0.5 ? C.goud : C.text, 34);
      L7_dnaRij(ctx, x, y, seq, dif, a, { toon: a1 * S.on(1, 0.5, i * 0.2), ins: a2, heeft });
      if (i > 0) regel(ctx, String(dif.length), 1770, y, a1 * S.on(1, 0.5, 0.3 + i * 0.2), C.paars, 40, 'center', 700); });
    metaText(ctx, 'verschillen', 1770, 230, C.text2, 'center', 20, a1);
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1 * S.on(1, 0.5, 1.0); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, x - 230, 450 - 60, 1430, 90, 18); ctx.stroke(); ctx.restore(); }
    if (a2 > 0.01) { naam(ctx, 'ingevoegd stukje', x + 10 * 46 + 92, 228, a2 * S.on(2, 0.6, 0.8), 'center', C.goud, 30); }
    termKaart(ctx, 'minder verschillen', 'nauwer verwant', 1150, 880, a1 * S.on(1, 0.6, 1.2) * (1 - a2));
    if (a2 > 0.01) balk(ctx, 'zelfde invoegsel = één gemeenschappelijke voorouder', 1150, 930, 1300, a2 * S.on(2, 0.6, 1.2), C.goud, 38);
  } });

// ---------- 11 · moleculaire klok ----------
SCHERMEN.push({ titel: 'Moleculaire klok', kop: 'Verschillen als klok', deel: 'Het spoor in het DNA',
  stappen: [
    { t: 'Mutaties stapelen zich gemiddeld in een vrij vast tempo op. Dan kun je de verschillen gebruiken als klok: de <b>moleculaire klok</b>.', n: 'Vraag uit de film: Twee soorten verschillen in 2 procent van een gen, twee andere in 4 procent. Welke splitsing is het langst geleden? (a) De splitsing met 4 procent verschil, (b) De splitsing met 2 procent verschil, (c) Dat kun je uit procenten niet afleiden. Antwoord a.' },
    { t: 'Twee keer zoveel verschil: ongeveer twee keer zo lang geleden gesplitst. Ongeveer, want de klok tikt niet precies gelijk.', n: 'Je stelt de klok af met fossielen waarvan de leeftijd gemeten is (ijken). Het tempo verschilt per gen en per diergroep.' },
    { t: 'De klok zegt: walvis en nijlpaard splitsten ± 55 miljoen jaar geleden. De oudste walvisfossielen zijn ± 50 miljoen jaar oud: net ná die splitsing.', n: 'Getallen zoals in de film; schattingen van de splitsing lopen in de literatuur uiteen (briefing).' },
    { t: 'Lagen, botten en DNA: drie methoden, hetzelfde verhaal.', n: 'Dat verhaal teken je als een stamboom: een cladogram. Dat is les 8.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.4), a2 = S.on(2, 1.4), a3 = S.on(3, 1.0), cel = 24;
    [[200, 2, '2 % verschil'], [560, 4, '4 % verschil']].forEach(([x, nd, lb], i) => { const a = a0 * S.on(0, 0.5, i * 0.3);
      L7_raster(ctx, x, 210, cel, nd, a); regel(ctx, lb, x + 120, 500, a, C.paars, 34, 'center', 700);
      if (a1 > 0.01) { const d = 130 * nd / 2, cx = x + 120, ty = 570, ab = a1 * S.on(1, 0.6, i * 0.3); ctx.save(); ctx.globalAlpha *= ab; ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx - 70, ty); ctx.lineTo(cx, ty + d); ctx.lineTo(cx + 70, ty); ctx.moveTo(cx, ty + d); ctx.lineTo(cx, ty + d + 30); ctx.stroke(); ctx.restore();
        circ(ctx, cx, ty + d, 10, C.goud); } });
    if (a1 > 0.01) { pijl(ctx, 140, 570, 140, 870, C.text2, 4, a1); regel(ctx, 'tijd geleden', 120, 930, a1, C.text2, 28, 'left', 600); regel(ctx, '± 2× zo lang geleden', 680, 960, a1 * S.on(1, 0.6, 0.8), C.goud, 34, 'center', 700); }
    if (a2 > 0.01) { const x0 = 1040, x1 = 1820, y = 420, mx = (mj) => lerp(x0, x1, (60 - mj) / 20);
      ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore();
      [60, 55, 50, 45, 40].forEach(v => { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx(v), y - 10); ctx.lineTo(mx(v), y + 10); ctx.stroke(); ctx.restore(); regel(ctx, String(v), mx(v), y + 46, a2, C.text2, 26, 'center', 500); });
      metaText(ctx, 'miljoen jaar geleden', (x0 + x1) / 2, y + 90, C.text2, 'center', 20, a2);
      circ(ctx, mx(55), y, 14, C.paars); regel(ctx, 'DNA-klok: splitsing', mx(55), y - 40, a2, C.paars, 30, 'center', 700);
      const b = a2 * S.on(2, 0.6, 0.8); circ(ctx, mx(50), y, 14 * b, C.goud); regel(ctx, 'oudste walvisfossielen', mx(50) + 20, y - 90, b, C.goud, 30, 'left', 700);
      ctx.save(); ctx.globalAlpha *= b; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx(50), y - 18); ctx.lineTo(mx(50) + 10, y - 80); ctx.stroke(); ctx.restore(); }
    if (a3 > 0.01) { const k = L7_LKL(), ix = [1180, 1430, 1680], iy = 680;
      [0, 1, 2].forEach(i => L7_laag(ctx, ix[0] - 80, iy + 30 - (i + 1) * 40, 160, 40, k[i], a3, i + 2));
      L7_lid(ctx, ix[1], iy - 110, 0.42, 'walvis', a3, 1);
      L7_dnaRij(ctx, ix[2] - 115, iy, 'ACGTA', [2], a3);
      [['lagen', 0], ['botten', 1], ['DNA', 2]].forEach(([s, i]) => regel(ctx, s, ix[i], iy + 120, a3, C.text, 32, 'center', 700));
      balk(ctx, 'hetzelfde verhaal', 1430, 940, 640, a3 * S.on(3, 0.6, 0.5), C.goud, 42); }
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Hoe weten we dat?', deel: 'Afsluiting',
  stappen: [
    { t: '<b>Lagen</b>: de laag die als eerste werd afgezet is het oudst, ook als hij later kantelde. Radioactieve stoffen geven het aantal jaren.', n: 'Relatieve en absolute datering (scherm 3–5). Terug naar de startvraag: de onderste laag, tenzij de lagen zijn omgeklapt.' },
    { t: '<b>Botten</b>: homologe organen en rudimentaire organen, zoals de heupbotjes van de walvis, wijzen op voorouders op vier poten.', n: 'Scherm 8–9.' },
    { t: '<b>DNA</b>: minder verschillen = nauwer verwant. De moleculaire klok schat wanneer soorten splitsten. Drie sporen, hetzelfde verhaal.', n: 'Scherm 10–11.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)], k = L7_LKL();
    const kol = [['lagen', C.oker, ['onderste laag oudst', 'tenzij omgeklapt', 'radioactief: jaren']], ['botten', C.goud, ['homoloog: zelfde bouw', 'rudimentair: functie kwijt', 'voorouders met poten']], ['DNA', C.paars, ['minder verschillen', 'nauwer verwant', 'moleculaire klok']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { [0, 1, 2].forEach(q => L7_laag(ctx, x + 110, 600 - (q + 1) * 80, 320, 80, k[q], a, q + 4)); L7_schelp(ctx, x + 200, 560, 18, a); L7_vis(ctx, x + 330, 470, 0.55, a, 1); }
      if (i === 1) { L7_lid(ctx, x + 170, 330, 0.62, 'mens', a, 1); L7_lid(ctx, x + 380, 330, 0.75, 'walvis', a, 1); }
      if (i === 2) { L7_dnaRij(ctx, x + 40, 420, 'ATGACCAAC', [], a); L7_dnaRij(ctx, x + 40, 520, 'ATGACCGAC', [6], a); }
      regels.forEach((r, q) => regel(ctx, r, x + 40, 700 + q * 66, a * S.on(i, 0.5, 0.2 + q * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · volgende keer ----------
function L7_icoonBoom(ctx, x, y, a, T, streep = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.lineCap = 'round';
  const tips = [x - 120, x - 40, x + 40, x + 120], top = y - 90, n1 = [x + 80, y - 20], n2 = [x + 20, y + 30], n3 = [x - 30, y + 90];
  ctx.beginPath(); ctx.moveTo(tips[2], top); ctx.lineTo(n1[0], n1[1]); ctx.lineTo(tips[3], top); ctx.moveTo(n1[0], n1[1]); ctx.lineTo(n2[0], n2[1]); ctx.lineTo(tips[1], top); ctx.moveTo(n2[0], n2[1]); ctx.lineTo(n3[0], n3[1]); ctx.lineTo(tips[0], top); ctx.moveTo(n3[0], n3[1]); ctx.lineTo(n3[0], n3[1] + 30); ctx.stroke();
  ctx.restore(); [n1, n2, n3].forEach(([px, py]) => circ(ctx, px, py, 8 * a, C.goud));
  if (streep) [[x + 50, y - 55], [x - 10, y + 0], [x - 75, y + 40]].forEach(([px, py], i) => { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - 14, py - 10); ctx.lineTo(px + 14, py + 10); ctx.stroke(); ctx.restore(); }); }
function L7_icoonDolfijn(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const romp = (yy, kl, haai) => { ctx.beginPath(); ctx.moveTo(x + 120, yy); ctx.quadraticCurveTo(x + 40, yy - 34, x - 80, yy - 10); ctx.lineTo(x - 130, yy - 34); ctx.lineTo(x - 116, yy); ctx.lineTo(x - 130, yy + 30); ctx.lineTo(x - 80, yy + 10); ctx.quadraticCurveTo(x + 40, yy + 30, x + 120, yy); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x - 10, yy - 26); ctx.lineTo(x - 30, yy - 62); ctx.lineTo(x - 46, yy - 20); ctx.closePath(); ctx.fill(); };
  romp(y - 50 + Math.sin(T * 1.5) * 4, C.licht ? '#5C7A92' : '#7A98B0'); romp(y + 60 + Math.sin(T * 1.5 + 1) * 4, C.licht ? '#7C8A98' : '#8E9CAA'); ctx.restore(); }
function L7_icoonGroepen(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[150, 110, C.teal], [105, 78, C.goud], [62, 48, C.koraal]].forEach(([rx, ry, kl]) => { ctx.beginPath(); ctx.ellipse(x, y + (110 - ry) * 0.4, rx, ry, 0, 0, 6.283); shape(ctx, rgba(kl, 0.14), kl, 3); }); ctx.restore(); circ(ctx, x - 14, y + 30, 9, C.text); circ(ctx, x + 18, y + 30, 9, C.text); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 8): <b>stambomen lezen</b>. Knooppunten, kenmerken op de takken, dolfijn en haai, en de namen van groepen.', n: 'Huiswerk: de film Hoe weten we dat? (nog eens) kijken. Wie vooruit wil: film 8 Stambomen lezen (startvraag: Is een dolfijn familie van een haai?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Stambomen lezen', [['Een stamboom lezen', 'knooppunt = voorouder', (c, x, y, a, T) => L7_icoonBoom(c, x, y, a, T)], ['Kenmerken op takken', 'elk kenmerk een streepje', (c, x, y, a, T) => L7_icoonBoom(c, x, y, a, T, true)], ['Zelfde vorm', 'dolfijn en haai', L7_icoonDolfijn], ['Namen en groepen', 'soort, geslacht, familie', L7_icoonGroepen]]); } });
