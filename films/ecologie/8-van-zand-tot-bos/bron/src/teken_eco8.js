// teken_eco8.js — Ecologie v2, film 8 'Van zand tot bos': film-eigen tekeningen (29 okt 2026). Laden na lib_eco.js en pop_eco_klein2.js.
// Kleuren: zand oker/geel, humus donkerbruin, planten groen (Part C: planten groen), korstmos grijs-groen, focus goud. Seriekleuren uit ECOK (lib_eco.js).
function _m8(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _d8 = (h, k = 0.25) => _m8(h, k, '#000000'), _l8 = (h, k = 0.25) => _m8(h, k, '#FFFFFF');
function _vh8(ctx, P, fill, stroke = null, lw = 2) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
const E8 = { zand: '#C9A86A', zandD: '#A8884E', zandL: '#DCC08A', humus: '#3E3024', humusL: '#5A4632', korst: '#A8B4A0', korstD: '#7E8C78', mos: '#6E8C4A', bunt: '#9AAA94', buntP: '#B88A9A', heide: '#8A6A8A', heideG: '#4E6A4A', as: '#2A2624', papier: '#E8E2D2', inkt: '#2A3448' };

// ---------- cast: Ecoloog Bas (goedgekeurd 25 okt 2026, personages/lib_cast.js in de repo) en Daans veldoutfit — gegevens, geen nieuwe tekening ----------
if (typeof CAST !== 'undefined' && !CAST.bas) CAST.bas = { naam: 'Ecoloog Bas', leeftijd: 46, rol: 'ecoloog', huid: '#E0B08C', haar: '#7A5A3A', kapsel: 'kort', wenkbrauw: '#5E4430', baard: true, stoppels: true,
  top: 'jas', topKleur: '#6B6A3A', topAccent: '#58572E', broek: '#4A4636', schoen: '#3A2E22', schoenAccent: '#2A2018', accessoire: [], lengte: 1.04, garderobe: { veld: {} } };
if (typeof CAST !== 'undefined' && CAST.daan && !CAST.daan.garderobe.veld) CAST.daan.garderobe.veld = { top: 'jas', topKleur: '#4F7A9C', topAccent: '#41678A', broek: '#4A4A3A', schoen: '#2E3A2A', schoenAccent: '#1E261C' };
const _bas8 = (ctx, x, y, h, o = {}) => persoon(ctx, 'bas', x, y, h, Object.assign({ outfit: 'veld' }, o));
// vrijwilliger = Mevrouw Jansen (ROLLEN.md: vrijwillige vlinderteller, Ecologie); volwassen, castboek-lengte (lengte 0.93)
const _vrijw8 = (ctx, x, y, h, o = {}) => persoon(ctx, 'buurvrouw', x, y, h, Object.assign({ outfit: 'buiten' }, o));
const _daan8 = _vrijw8;

// ---------- landschap: stuifzandvlakte (Macro, nacht) ----------
function e8Zandvlakte(ctx, o = {}) { const { horizon = 470, rand = true, wind = true, t = 0 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  // bosrand op de achtergrond
  _vh8(ctx, [[0, horizon], [0, horizon - 70], [260, horizon - 90], [520, horizon - 60], [760, horizon - 85], [1000, horizon - 40], [1300, horizon - 70], [1600, horizon - 90], [1920, horizon - 60], [1920, horizon]], '#2A4434');
  // zandvlakte met lichte golven
  _vh8(ctx, [[0, horizon], [1920, horizon], [1920, H], [0, H]], _d8(E8.zand, 0.15));
  for (let i = 0; i < 6; i++) { const y = horizon + 40 + i * 90; ctx.fillStyle = i % 2 ? _d8(E8.zand, 0.1) : _d8(E8.zand, 0.2); ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, y + Math.sin(x / 210 + i) * 14); ctx.lineTo(W, y + 90); ctx.lineTo(0, y + 90); ctx.fill(); }
  if (rand) { for (const [x, s, k] of [[90, 1.25, 1], [250, 1.0, -1], [1680, 1.15, -1], [1820, 0.9, 1]]) ecoGroveDen(ctx, x, horizon + 30, s, { kijk: k }); }
  if (wind) { ctx.strokeStyle = rgba(E8.zandL, 0.45); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for (let i = 0; i < 14; i++) { const x = 300 + hash(i * 3.1) * 1300, y = horizon + 60 + hash(i * 2.2) * 360; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 60, y - 12, x + 120, y + 6, x + 200, y - 8); ctx.stroke(); } }
}
function e8Paaltje(ctx, x, y, nr = '23', s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#C8B48A'; ctx.fillRect(-9, -110, 18, 110); ctx.fillStyle = '#E8E2D2'; ctx.fillRect(-9, -110, 18, 34); ctx.fillStyle = '#B8463C'; ctx.fillRect(-9, -112, 18, 8); text(ctx, nr, 0, -84, fTekst(16, 800), '#2A3448', 'center'); ctx.restore(); }

// ---------- kleine planten (zijaanzicht, op grondlijn) ----------
function e8Korstmos(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); // bekermos (Cladonia): grijsgroene steeltjes met kleine bekertjes
  for (let i = 0; i < 7; i++) { const dx = (i - 3) * 7 + (hash(i) - 0.5) * 4, h = 14 + hash(i * 3) * 12; ctx.strokeStyle = i % 2 ? E8.korst : E8.korstD; ctx.lineWidth = 3.4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx, 0); ctx.lineTo(dx + (hash(i * 5) - 0.5) * 4, -h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(dx - 4, -h - 3); ctx.lineTo(dx, -h + 1); ctx.lineTo(dx + 4, -h - 3); ctx.stroke(); }
  _vh8(ctx, [[-26, 0], [26, 0], [20, -5], [-20, -5]], E8.korstD); ctx.restore(); }
function e8Mos(ctx, x, y, w = 50, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < w / 4; i++) { const dx = -w / 2 + i * 4, h = 6 + hash(i * 7) * 6; ctx.strokeStyle = i % 3 ? E8.mos : _d8(E8.mos, 0.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dx, 0); ctx.lineTo(dx + 1, -h); ctx.stroke(); } ctx.restore(); }
// buntgras (Corynephorus canescens): dichte grijsgroene pol van borstelachtige, 10–30 cm hoge bladen; in de zomer roze-paarse pluimpjes. s = px per cm
function e8Buntgras(ctx, x, y, s = 2, o = {}) { const { pluim = true, wortels = false, overstoven = 0, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  if (wortels) { ctx.strokeStyle = '#B89A70'; ctx.lineWidth = 0.35; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo((i - 8) * 0.6, 0); let px = (i - 8) * 0.6, py = 0; for (let k = 0; k < 6; k++) { px += (hash(i * 9 + k) - 0.5) * 3 + (i - 8) * 0.15; py += 4 + hash(i + k) * 2; ctx.lineTo(px, py); } ctx.stroke(); } }
  for (let i = 0; i < 34; i++) { const u = i / 33 - 0.5, l = 12 + hash(i * 1.7) * 10, an = -Math.PI / 2 + u * 1.5 + (hash(i) - 0.5) * 0.25; ctx.strokeStyle = i % 3 ? E8.bunt : _d8(E8.bunt, 0.18); ctx.lineWidth = 0.42; ctx.beginPath(); ctx.moveTo(u * 4, 0); ctx.quadraticCurveTo(u * 4 + Math.cos(an) * l * 0.5, -l * 0.55, u * 4 + Math.cos(an) * l, Math.sin(an) * l); ctx.stroke(); }
  if (pluim) for (let i = 0; i < 6; i++) { const bx = (i - 2.5) * 2.6, h = 22 + hash(i * 4) * 6; ctx.strokeStyle = '#B6A898'; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.moveTo(bx * 0.4, 0); ctx.lineTo(bx, -h); ctx.stroke(); ctx.fillStyle = E8.buntP; ctx.beginPath(); ctx.ellipse(bx, -h - 2.5, 0.9, 3.2, (bx) * 0.02, 0, 6.283); ctx.fill(); }
  if (overstoven) { ctx.fillStyle = E8.zand; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.quadraticCurveTo(0, -overstoven * 2, 16, 0); ctx.fill(); }
  ctx.restore(); }

// ---------- meetvierkant (schuin van boven) met begroeiing per stadium ----------
// stadium: 0 kaal · 1 algen/mos · 2 korstmos + buntgras · 3 + heide en dennenzaailingen · 4 heide + jonge dennen · 5 den/berk-bos · 6 eikenbos. brand: 0 zwart, 1 kiemplanten
function e8Vierkant(ctx, x, y, w, stadium, o = {}) { const { brand = null, touw = true, seed = 1 } = o; const h = w * 0.42; const q = w / 380; ctx.save();
  const P = [[x - w / 2, y], [x + w / 2, y], [x + w / 2 - w * 0.12, y - h], [x - w / 2 + w * 0.12, y - h]];
  const grond = brand != null ? '#4A3A2E' : (stadium >= 2 ? _m8(E8.zand, Math.min(0.7, stadium * 0.12), E8.humus) : E8.zand); _vh8(ctx, P, grond);
  const pt = (u, v) => [x - w / 2 + w * 0.12 * v + u * (w - w * 0.24 * v), y - h * v];
  const items = []; for (let i = 0; i < 46; i++) items.push([hash(seed + i * 1.37), hash(seed + i * 2.71), i]); items.sort((a, b) => b[1] - a[1]);
  for (const [u, v, i] of items) { const [px, py] = pt(0.06 + u * 0.88, 0.06 + v * 0.88), k = 0.6 + 0.4 * (1 - v);
    if (brand === 0) { if (i % 5 === 0) { ctx.fillStyle = E8.as; ctx.fillRect(px - 6 * k, py - 26 * k, 12 * k, 26 * k); } continue; }
    if (brand === 1) { if (i % 2) ecoStruikheide(ctx, px, py, 1.2 * k, { groei: 0.4 }); else if (i % 7 === 0) ecoBerk(ctx, px, py, 0.7 * k, { groei: 0.3 }); continue; }
    if (stadium === 1 && i % 2) e8Mos(ctx, px, py, 26 * k);
    if (stadium === 2) { if (i % 3 === 0) e8Buntgras(ctx, px, py, 1.1 * k, {}); else if (i % 3 === 1) e8Korstmos(ctx, px, py, 0.8 * k); else e8Mos(ctx, px, py, 20 * k); }
    if (stadium === 3) { if (i % 4 === 0) e8Buntgras(ctx, px, py, 1.1 * k, {}); else if (i % 4 === 1) ecoStruikheide(ctx, px, py, 1.3 * k, {}); else if (i % 9 === 2) ecoGroveDen(ctx, px, py, 0.5 * k, { groei: 0.25 }); else e8Korstmos(ctx, px, py, 0.8 * k); }
    if (stadium === 4) { if (i % 3) ecoStruikheide(ctx, px, py, 1.4 * k, {}); else if (i % 6 === 0) ecoGroveDen(ctx, px, py, 0.8 * k, { groei: 0.5 }); }
    if (stadium === 5 && i % 8 === 0) { (i % 12 ? ecoGroveDen : ecoBerk)(ctx, px, py, 1.1 * k, { groei: 0.8 }); }
    if (stadium === 6 && i % 9 === 0) { (i % 14 ? ecoZomereik : ecoGroveDen)(ctx, px, py, 1.25 * k, { groei: 1 }); } }
  if (touw) { ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 2; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); for (const p of P) { ctx.fillStyle = '#C8B48A'; ctx.fillRect(p[0] - 4, p[1] - 36, 8, 36); } }
  ctx.restore(); }

// ---------- bodemprofiel ----------
function e8Profiel(ctx, x, y, w, h, humus, o = {}) { const { zaden = false, wortels = false, as = false, label = true } = o; ctx.save(); // y = bovenkant
  ctx.fillStyle = E8.zand; ctx.fillRect(x, y, w, h); ctx.fillStyle = _d8(E8.zand, 0.15); for (let i = 0; i < w * h / 500; i++) ctx.fillRect(x + hash(i * 1.3) * w, y + hash(i * 2.9) * h, 2.5, 2.5);
  if (humus > 0) { ctx.fillStyle = E8.humus; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); for (let k = 0; k <= 10; k++) ctx.lineTo(x + w - k * w / 10, y + humus + Math.sin(k * 1.7) * Math.min(6, humus * 0.2)); ctx.closePath(); ctx.fill(); }
  if (as) { ctx.fillStyle = E8.as; ctx.fillRect(x, y, w, 8); }
  if (zaden) for (let i = 0; i < 14; i++) { const zx = x + 10 + hash(i * 3.7) * (w - 20), zy = y + 6 + hash(i * 5.1) * Math.max(10, humus - 8); ctx.fillStyle = i % 2 ? '#C8A060' : '#E0C890'; ctx.beginPath(); ctx.ellipse(zx, zy, 3.5, 2.4, hash(i) * 3, 0, 6.283); ctx.fill(); }
  if (wortels) { ctx.strokeStyle = '#C8AA84'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { const wx = x + w * (0.2 + i * 0.3); lijn(ctx, [[wx, y + 4], [wx + 8, y + humus * 0.6], [wx - 6, y + humus + 30], [wx + 4, y + humus + 60]], '#C8AA84', 3); } }
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, h);
  if (label && humus > 0) metaText(ctx, 'HUMUS', x + w + 12, y + Math.max(20, humus * 0.6), C.text2, 'left', 22);
  ctx.restore(); }

// ---------- meter (horizontale balk 0..1) ----------
function e8Meter(ctx, x, y, w, naam, v, kl = C.goud) { ctx.save(); metaText(ctx, naam, x, y - 10, C.text2, 'left', 26); roundRect(ctx, x, y, w, 18, 9); shape(ctx, rgba(C.fill, 0.9), C.line, 1); roundRect(ctx, x, y, Math.max(18, w * v), 18, 9); shape(ctx, kl, null); ctx.restore(); }

// ---------- dossierblad ----------
// o.blad (nummer), o.stadium (voor de foto), o.humus (px), o.soorten [[naam, bedekking%]], o.meters {hitte, vocht, licht, stuiven} 0..1, o.brand
function e8Dossier(ctx, x, y, o = {}) { const { w = 760, h = 760, blad = 1, stadium = 0, humus = 0, soorten = [], meters = null, brand = null, titel = null, nadruk = null, zaden = false, wortels = false, as = false, a = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#243450', '#8FA0B5', 1.5);
  metaText(ctx, titel || ('MEETPLEK 23 · BLAD ' + blad), x + 28, y + 46, C.goud, 'left', 28);
  // foto van boven (vierkant)
  ctx.save(); roundRect(ctx, x + 24, y + 66, w - 48, 200, 8); ctx.clip(); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x + 24, y + 66, w - 48, 200); e8Vierkant(ctx, x + w / 2, y + 256, w - 90, stadium, { brand, touw: false, seed: blad }); ctx.restore();
  ctx.strokeStyle = C.line; ctx.lineWidth = 1; roundRect(ctx, x + 24, y + 66, w - 48, 200, 8); ctx.stroke();
  // bodemprofiel
  e8Profiel(ctx, x + 24, y + 296, 130, 230, humus, { zaden, wortels, as, label: false }); metaText(ctx, 'BODEM', x + 24, y + 562, C.text2, 'left', 26);
  // soortenlijst
  let ly = y + 320; metaText(ctx, 'SOORT · BEDEKKING', x + 180, ly - 12, C.text2, 'left', 26);
  if (!soorten.length) text(ctx, 'geen planten', x + 180, ly + 40, fTekst(36, 600), C.text2, 'left');
  soorten.forEach(([n, p], i) => { const yy = ly + 22 + i * 52; text(ctx, n, x + 180, yy + 18, fTekst(36, 600), nadruk === n ? C.goud : C.text, 'left'); roundRect(ctx, x + 420, yy - 2, 190, 24, 8); shape(ctx, rgba(C.fill, 0.9), null); roundRect(ctx, x + 420, yy - 2, Math.max(10, 190 * p / 100), 24, 8); shape(ctx, C.groen, null); text(ctx, p + ' %', x + w - 24, yy + 18, fTekst(32, 600), C.text2, 'right'); });
  // meters
  if (meters) { const mx = x + 28, my = y + h - 132, mw = (w - 80) / 2; const L = [['HITTE', meters.hitte, C.koraal], ['VOCHT', meters.vocht, C.teal], ['LICHT OP DE GROND', meters.licht, C.goud], ['STUIVEN', meters.stuiven, E8.zand]];
    L.forEach(([n, v, kl], i) => e8Meter(ctx, mx + (i % 2) * (mw + 24), my + Math.floor(i / 2) * 64, mw, n, v, kl)); }
  ctx.restore(); }

// ---------- successiebalk ----------
const E8_BALK = ['kaal zand', 'pioniers', 'heide', 'den en berk', 'eik en beuk'];
function e8Balk(ctx, x, y, w, stap, o = {}) { const { labels = true } = o; const n = E8_BALK.length, bw = w / n; ctx.save();
  E8_BALK.forEach((nm, i) => { const on = i <= stap; roundRect(ctx, x + i * bw + 4, y, bw - 8, 54, 10); shape(ctx, on ? _m8(C.groen, 0.7 - i * 0.1, C.bgSchema) : rgba(C.fill, 0.5), on ? C.groen : C.line, on ? 2 : 1); if (labels) text(ctx, nm, x + i * bw + bw / 2, y + 38, fTekst(36, 600), on ? C.text : C.text2, 'center'); if (i < n - 1) pijl(ctx, x + (i + 1) * bw - 10, y + 27, x + (i + 1) * bw + 10, y + 27, C.line, on ? 1 : 0.4, 2, 8); });
  ctx.restore(); }

// ---------- brandplek (Macro) ----------
function e8Brand(ctx, o = {}) { const { stap = 0, horizon = 500 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 110, W, 110);
  _vh8(ctx, [[0, horizon], [1920, horizon], [1920, H], [0, H]], stap === 0 ? '#4E4640' : '#4A4A3A');
  for (let i = 0; i < 26; i++) { const x = hash(i * 2.3) * W, y = horizon + 30 + hash(i * 4.4) * 380, s = 0.6 + (y - horizon) / 500; ctx.fillStyle = E8.as; ctx.fillRect(x - 6 * s, y - (i % 4 ? 30 : 180) * s, 12 * s, (i % 4 ? 30 : 180) * s); }
  if (stap === 0) { for (let i = 0; i < 4; i++) for (let k = 0; k < 5; k++) { ctx.fillStyle = rgba('#9AA3B2', 0.18); ctx.beginPath(); ctx.ellipse(320 + i * 420 + k * 18, horizon - 20 - k * 70, 30 + k * 16, 22 + k * 8, 0, 0, 6.283); ctx.fill(); } }
  if (stap >= 1) for (let i = 0; i < 60; i++) { const x = hash(i * 1.9) * W, y = horizon + 40 + hash(i * 3.3) * 380, s = 0.5 + (y - horizon) / 450; if (i % 5) ecoStruikheide(ctx, x, y, 1.6 * s, { groei: 0.4 }); else ecoBerk(ctx, x, y, 1.2 * s, { groei: 0.35 }); }
}

// ---------- verlaten akker in vier stadia (Macro-strook) ----------
function e8Akker(ctx, x, y, w, stap) { const h = 300; ctx.save(); ctx.beginPath(); ctx.rect(x, y - h, w, h + 40); ctx.clip(); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x, y - h, w, h);
  _vh8(ctx, [[x, y], [x + w, y], [x + w, y + 40], [x, y + 40]], '#4A3A2A');
  if (stap === 0) for (let i = 0; i < 26; i++) { const px = x + 10 + hash(i * 2.1) * (w - 20); lijn(ctx, [[px, y], [px + 2, y - 20 - hash(i) * 14]], '#7FC48F', 3); circ(ctx, px + 2, y - 26 - hash(i) * 14, 4, i % 3 ? '#E8D46A' : '#F2F2EE'); }
  if (stap === 1) for (let i = 0; i < 60; i++) { const px = x + hash(i * 1.3) * w; lijn(ctx, [[px, y], [px + (hash(i) - 0.5) * 10, y - 40 - hash(i * 2) * 30]], i % 3 ? '#8AAA6A' : '#6E9A5A', 3); }
  if (stap === 2) { for (let i = 0; i < 40; i++) { const px = x + hash(i * 1.3) * w; lijn(ctx, [[px, y], [px, y - 30 - hash(i) * 20]], '#7A9A5A', 3); } for (let i = 0; i < 5; i++) { const bx = x + 30 + i * (w - 60) / 4; ctx.fillStyle = '#4E6E44'; ctx.beginPath(); ctx.ellipse(bx, y - 40, 34, 40, 0, 0, 6.283); ctx.fill(); } }
  if (stap === 3) { for (let i = 0; i < 4; i++) ecoBerk(ctx, x + 40 + i * (w - 80) / 3, y, 0.7, { groei: 0.7 }); }
  ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, y - h, w, h + 40); }
