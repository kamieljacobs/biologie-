// teken_eco1.js — Ecologie v2 · film 1 Hoeveel passen er? — film-eigen tekeningen (voorvoegsel e1), 29 okt 2026.
// Laadt na lib.js, base.js, dier_basis.js, lib_cast.js, lib_evo.js, lib_eco.js en de pop_eco-bestanden.
// Maten: bever kop-romp ± 85 cm (pop_eco_klein), mens 1,80 m. In Macro-scènes met Gerrit (h = 330 px): 1,83 px per cm.

// TERUGVAL (alleen actief als lib_eco.js niet laadt): lib_eco.js laadde eerder niet als pop_eco_klein.js ook geladen was (beide declareren 'const ECO' -> SyntaxError, het hele bestand valt weg).
// Tot de hoofdredacteur dat oplost, definieert dit bestand dezelfde functies (letterlijk overgenomen uit lib_eco.js) als ze ontbreken. Seriekleuren als ECOK.
// (ECOK komt sinds de hoofdredactie uit lib_eco.js)
if (typeof ecoTag === 'undefined') {
  window.ECO_FILMS = 8;
  window.ecoTag = function (ctx, film, hfst) { metaText(ctx, `ECOLOGIE ${film}/${ECO_FILMS} · ${hfst}`, 80, 78, C.text2, 'left', 26); };
  window.ecoTitelKaart = function (ctx, film, titel, vraag, beeld) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, `HAVO · VWO · ECOLOGIE ${film}/${ECO_FILMS}`, W - 80, 78, C.text2, 'right', 26);
    text(ctx, titel, 120, 330, fTitel(92), C.text, 'left'); if (vraag) (Array.isArray(vraag) ? vraag : [vraag]).forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left')); if (beeld) beeld(ctx); };
  window.ecoVraagKaart = function (ctx, vraag, opties, film) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); if (film) ecoTag(ctx, film, 'VRAAG');
    text(ctx, 'Wat denk je?', 140, 230, fTitel(76), C.text, 'left'); const regels = Array.isArray(vraag) ? vraag : [vraag]; regels.forEach((r, i) => text(ctx, r, 140, 320 + i * 58, fTekst(46, 500), C.text2, 'left'));
    const y0 = 320 + regels.length * 58 + 30; opties.forEach((t, i) => { roundRect(ctx, 140, y0 + i * 124, 1300, 100, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, 'ABCD'[i], 184, y0 + i * 124 + 64, fTekst(44, 800), C.goud, 'left'); text(ctx, t, 244, y0 + i * 124 + 64, fTekst(40, 500), C.text, 'left'); });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(140, y0 + opties.length * 124 + 20); ctx.lineTo(140 + 1300 * 0.6, y0 + opties.length * 124 + 20); ctx.stroke(); };
  window.ecoSchaal = function (ctx, tekst) { metaText(ctx, tekst, 80, 880, C.text2, 'left', 26); };
}
const E1 = { gras: '#4E6B48', grasL: '#5E7D55', klei: '#5A4A3A', water: '#2E6FBF', waterD: '#28609F', waterL: '#4A86C9', hout: '#8A6A4A', houtD: '#6A4E36', houtL: '#B89670',
  wilg: '#6E9E6A', wilgD: '#557F55', wilgL: '#8DB487', stam: '#6E5A48', stamD: '#54443A', spaan: '#D9C29A', bever: '#8C5A3A', muis: '#8A7258' };
const E1_JAREN = [[2000, 128], [2004, 220], [2019, 3500], [2023, 6000]]; // landelijke schattingen (minimumtellingen 2000/2004)

// ---------- landschap ----------
function e1Macro(ctx, o = {}) { const { horizon = 560, sloot = null } = o; macroNacht(ctx, { horizon });
  if (sloot) { const [y0, y1] = sloot; ctx.fillStyle = E1.water; ctx.fillRect(0, y0, W, y1 - y0); ctx.fillStyle = E1.waterD; ctx.fillRect(0, y1 - 10, W, 10);
    ctx.strokeStyle = rgba(E1.waterL, 0.6); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const x = (i * 263 + 70) % W, y = y0 + 18 + (i * 37) % (y1 - y0 - 30); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60 + (i % 3) * 20, y); ctx.stroke(); } } }
// oeverwal van gras voor een sloot (vlak, licht gebogen)
function e1Oever(ctx, y, o = {}) { const { kleur = C.bgMacroFront, golf = 10 } = o; const P = [[-40, y]]; for (let x = 0; x <= W + 40; x += 160) P.push([x, y + Math.sin(x * 0.011) * golf]); P.push([W + 40, H + 10], [-40, H + 10]); vul(ctx, P, kleur); }
// rietpollen langs de waterkant
function e1Riet(ctx, x, y, s = 1, o = {}) { const { n = 9, seed = 1, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const h = (90 + hash(seed * 31 + i) * 80) * s, dx = (i - n / 2) * 9 * s, k = (hash(seed + i * 7) - 0.5) * 30 * s;
    ctx.strokeStyle = i % 3 ? '#7E9A6A' : '#93AE7C'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x + dx, y); ctx.quadraticCurveTo(x + dx + k * 0.3, y - h * 0.6, x + dx + k, y - h); ctx.stroke();
    if (i % 3 === 0) { ctx.fillStyle = '#7A6248'; ctx.beginPath(); ctx.ellipse(x + dx + k, y - h - 10 * s, 4 * s, 14 * s, k * 0.01, 0, 6.283); ctx.fill(); } } ctx.restore(); }

// schietwilg/knotwilg: stam met grove schors, kroon van smalle hangende bladpluimen. x,y = stamvoet, s = px per cm (boom ± 8 m hoog bij s 1 → 800 px; gebruik s 0,5–0,9)
function e1Wilg(ctx, x, y, s = 0.6, o = {}) { const { a = 1, seed = 3, knot = false } = o; ctx.save(); ctx.globalAlpha *= a;
  const H = (knot ? 320 : 700) * s, w = (knot ? 55 : 45) * s;
  vul(ctx, [[x - w * 0.9, y], [x - w * 0.55, y - H * 0.35], [x - w * 0.5, y - H * 0.7], [x + w * 0.5, y - H * 0.72], [x + w * 0.6, y - H * 0.35], [x + w, y]], E1.stam, E1.stamD, 2);
  ctx.strokeStyle = E1.stamD; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const xx = x - w * 0.4 + i * w * 0.16; lijn(ctx, [[xx, y - 6], [xx + 4, y - H * 0.35], [xx - 2, y - H * 0.65]], rgba(E1.stamD, 0.8), 2); }
  const top = y - H * 0.7, R = (knot ? 210 : 330) * s;
  const tak = (ax, ay, bx, by, d) => lijn(ctx, [[ax, ay], [(ax + bx) / 2 + d, (ay + by) / 2 - 20 * s], [bx, by]], E1.stam, 9 * s);
  [[-1, 0.9], [-0.4, 1.1], [0.3, 1.05], [0.9, 0.85]].forEach(([dx, dy], i) => tak(x + dx * w * 0.3, top + 10 * s, x + dx * R * 0.75, top - dy * R * 0.75, dx * 20 * s));
  const blob = (cx, cy, r, col) => { const P = []; for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283, rr = r * (0.86 + 0.14 * hash(seed * 13 + k + cx)); P.push([cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.82]); } vul(ctx, P, col); };
  const kr = [[-0.55, -0.55, 0.5], [0.05, -0.85, 0.58], [0.6, -0.5, 0.5], [-0.15, -0.3, 0.55], [0.35, -0.2, 0.42], [-0.7, -0.15, 0.38]];
  kr.forEach(([dx, dy, r], i) => blob(x + dx * R, top + dy * R, r * R, i % 2 ? E1.wilgD : E1.wilg));
  // wilgenblad: smalle, lichtere bladpluimen aan de onderrand van de kroon (geen losse streepjes)
  [[-0.5, -0.12], [-0.05, -0.02], [0.45, -0.1], [-0.25, -0.5], [0.3, -0.6]].forEach(([dx, dy], i) => { const cx = x + dx * R, cy = top + dy * R; vul(ctx, [[cx - 0.16 * R, cy - 0.05 * R], [cx, cy - 0.12 * R], [cx + 0.16 * R, cy - 0.04 * R], [cx + 0.08 * R, cy + 0.12 * R], [cx - 0.1 * R, cy + 0.1 * R]], rgba(E1.wilgL, 0.9)); });
  ctx.restore(); }
// omgeknaagde stomp met zandlopervorm (bever knaagt rondom, de top staat op een smalle punt) en spaanders. s = px per cm (stam ± 25 cm doorsnee)
function e1Stomp(ctx, x, y, s = 1.8, o = {}) { const { a = 1, spaanders = true, val = true } = o; ctx.save(); ctx.globalAlpha *= a; const r = 13 * s, h = 34 * s;
  vul(ctx, [[x - r * 1.2, y], [x - r, y - h * 0.55], [x - r * 0.18, y - h], [x + r * 0.2, y - h], [x + r, y - h * 0.55], [x + r * 1.2, y]], E1.stam, E1.stamD, 2);
  vul(ctx, [[x - r * 0.95, y - h * 0.5], [x - r * 0.15, y - h * 0.97], [x + r * 0.18, y - h * 0.97], [x + r * 0.95, y - h * 0.5], [x + r * 0.5, y - h * 0.62], [x - r * 0.5, y - h * 0.62]], E1.spaan, null);
  ctx.strokeStyle = rgba(E1.houtD, 0.6); ctx.lineWidth = 1.5; for (let i = 0; i < 7; i++) { const u = -0.8 + i * 0.27; ctx.beginPath(); ctx.moveTo(x + u * r, y - h * 0.55); ctx.lineTo(x + u * r * 0.2, y - h * 0.94); ctx.stroke(); } // tandsporen
  if (val) { const x0 = x + r * 1.6, L = 300 * s * 0.6, rr = r * 0.95, yc = y - rr; // omgevallen stam ligt rechts in het gras, het knaagstuk (punt) naar de stomp
    vul(ctx, [[x0, yc], [x0 + rr * 0.9, yc - rr], [x0 + L, yc - rr], [x0 + L, yc + rr], [x0 + rr * 0.9, yc + rr]], E1.stam, E1.stamD, 2);
    vul(ctx, [[x0 + 2, yc], [x0 + rr * 0.85, yc - rr * 0.9], [x0 + rr * 0.85, yc + rr * 0.9]], E1.spaan);
    ctx.strokeStyle = rgba(E1.stamD, 0.8); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x0 + rr * 1.4 + i * L * 0.17, yc - rr * 0.5 + (i % 2) * rr * 0.6); ctx.lineTo(x0 + rr * 1.4 + i * L * 0.17 + L * 0.1, yc - rr * 0.45 + (i % 2) * rr * 0.6); ctx.stroke(); } }
  if (spaanders) for (let i = 0; i < 16; i++) { const sx = x - 70 * s * 0.6 + hash(i * 3.3) * 140 * s * 0.6, sy = y - 2 - hash(i * 7.1) * 6; ctx.save(); ctx.translate(sx, sy); ctx.rotate(hash(i) * 3); ctx.fillStyle = i % 2 ? E1.spaan : '#C9AE80'; roundRect(ctx, -6 * s * 0.5, -2, 12 * s * 0.5, 4, 2); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
// houten transportkist met open deksel. x,y = midden onder; s = px per cm (kist 100 × 50 × 50 cm)
function e1Kist(ctx, x, y, s = 1.8, o = {}) { const { open = 1, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 100 * s, h = 48 * s;
  ctx.fillStyle = E1.hout; ctx.fillRect(x - w / 2, y - h, w, h); ctx.strokeStyle = E1.houtD; ctx.lineWidth = 2; ctx.strokeRect(x - w / 2, y - h, w, h);
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h + i * h / 4); ctx.lineTo(x + w / 2, y - h + i * h / 4); ctx.stroke(); }
  ctx.fillStyle = E1.houtD; [[-0.47, 0.03], [0.44, 0.03]].forEach(([u]) => ctx.fillRect(x + u * w, y - h, 0.03 * w, h));
  for (let i = 0; i < 5; i++) circ(ctx, x - w * 0.3 + i * w * 0.15, y - h * 0.5, 3.5 * s * 0.5, '#2A2018'); // luchtgaten
  // deksel scharniert aan de achterrand en staat open naar achteren (dikke plank in perspectief)
  ctx.save(); ctx.translate(x + w / 2, y - h); ctx.rotate(open * 1.15); ctx.fillStyle = E1.houtL; ctx.fillRect(-w, -9 * s, w, 9 * s); ctx.strokeStyle = E1.houtD; ctx.lineWidth = 2; ctx.strokeRect(-w, -9 * s, w, 9 * s);
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w + i * w / 4, -9 * s); ctx.lineTo(-w + i * w / 4, 0); ctx.stroke(); } ctx.restore();
  ctx.fillStyle = '#2A2018'; ctx.fillRect(x - w / 2 + 4, y - h - 6 * s, w - 8, 6 * s); // donkere opening
  ctx.restore(); }
// beverburcht: takkenhoop op de oever; doorsnede toont woonkamer boven de waterlijn en een gang naar een ingang onder water. x = midden, yw = waterlijn, s = px per cm (burcht ± 5 m breed, 1,5 m hoog)
function e1Burcht(ctx, x, yw, s = 0.5, o = {}) { const { doorsnede = false, a = 1, bewoners = null, waterW = 1.3 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 520 * s, h = 160 * s, d = 230 * s;
  const oeverX = x - w * 0.3; // waterkant: links water, rechts land
  const hard = (P, col) => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); P.slice(1).forEach(q => ctx.lineTo(q[0], q[1])); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
  if (doorsnede) { const x0 = x - w * waterW, x1 = W + 20; hard([[x0, yw], [x1, yw], [x1, yw + d + 40 * s], [x0, yw + d + 40 * s]], E1.water);
    hard([[oeverX - w * 0.42, yw + d + 40 * s], [oeverX - w * 0.32, yw + d * 0.7], [oeverX - w * 0.05, yw + d * 0.15], [oeverX + w * 0.1, yw - 10 * s], [x1, yw - 14 * s], [x1, yw + d + 40 * s]], E1.klei);
    hard([[x0, yw + d + 40 * s], [x1, yw + d + 40 * s], [x1, yw + d + 70 * s], [x0, yw + d + 70 * s]], '#3E3226'); }
  const hoop = [[x - w * 0.5, yw + 6], [x - w * 0.36, yw - h * 0.62], [x - w * 0.08, yw - h], [x + w * 0.28, yw - h * 0.86], [x + w * 0.52, yw - h * 0.35], [x + w * 0.6, yw - 16 * s]];
  vul(ctx, hoop, E1.houtD);
  ctx.lineCap = 'round'; for (let i = 0; i < 46; i++) { const u = hash(i * 1.7), v = hash(i * 9.2); const px = x - w * 0.45 + u * w * 0.98, py = yw - 8 - v * h * 0.85 * (1 - Math.abs(u - 0.45) * 1.5);
    const an = (hash(i * 4.4) - 0.5) * 2.2, L = (40 + hash(i * 2.2) * 60) * s; lijn(ctx, [[px - Math.cos(an) * L, py - Math.sin(an) * L * 0.4], [px + Math.cos(an) * L, py + Math.sin(an) * L * 0.4]], i % 3 ? E1.hout : E1.houtL, Math.max(2, 7 * s)); }
  if (doorsnede) { const kx = x, ky = yw - h * 0.4; // woonkamer boven de waterlijn, gang naar een ingang onder water
    ctx.strokeStyle = '#2A2018'; ctx.lineWidth = 44 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx - w * 0.12, ky + h * 0.12); ctx.quadraticCurveTo(oeverX + w * 0.02, yw + d * 0.2, oeverX - w * 0.22, yw + d * 0.62); ctx.stroke();
    ctx.fillStyle = '#2A2018'; ctx.beginPath(); ctx.ellipse(kx, ky, w * 0.21, h * 0.25, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#4A3A2A'; ctx.fillRect(kx - w * 0.19, ky + h * 0.13, w * 0.38, 8 * s);
    if (bewoners) bewoners(kx, ky + h * 0.14);
    ctx.strokeStyle = E1.waterL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w * waterW, yw); ctx.lineTo(oeverX, yw); ctx.stroke(); }
  ctx.restore(); }
// telefoon in de hand (melding)
function e1Telefoon(ctx, x, y, s = 1, a = 1) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14 * s, y - 26 * s, 28 * s, 52 * s, 5 * s); shape(ctx, '#20252E', '#5A6270', 2); roundRect(ctx, x - 11 * s, y - 21 * s, 22 * s, 40 * s, 3 * s); shape(ctx, '#3A5E7A'); ctx.restore(); }
// stuw met loopplank (faunapassage)
function e1Stuw(ctx, x, y, s = 1, o = {}) { const { plank = true } = o; ctx.save();
  ctx.fillStyle = '#7A7F88'; ctx.fillRect(x - 40 * s, y - 180 * s, 80 * s, 260 * s); ctx.strokeStyle = '#5A606A'; ctx.lineWidth = 2; ctx.strokeRect(x - 40 * s, y - 180 * s, 80 * s, 260 * s);
  ctx.fillStyle = '#9AA0A8'; ctx.fillRect(x - 60 * s, y - 196 * s, 120 * s, 18 * s);
  if (plank) { ctx.save(); ctx.translate(x - 240 * s, y + 40 * s); ctx.rotate(-0.42); ctx.fillStyle = E1.houtL; ctx.fillRect(0, -10 * s, 560 * s, 20 * s); ctx.strokeStyle = E1.houtD; ctx.strokeRect(0, -10 * s, 560 * s, 20 * s);
    for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(i * 46 * s, -10 * s); ctx.lineTo(i * 46 * s, -16 * s); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

// ---------- veldmuis (Microtus arvalis), zijaanzicht, kop rechts. Kop-romp 9–12 cm, staart ± 3,5 cm (een derde), oren klein en grotendeels in de vacht, kleine kraaloogjes, stompe snuit.
// s = px per cm; x,y = grondpunt midden onder. houding: 'staan' | 'rennen' (t) | 'zit' (rechtop, voorpootjes bij de bek). Vlakke uitknipfiguur (C10: alleen statisch / eenvoudige gang).
function e1Veldmuis(ctx, x, y, s = 10, o = {}) { const { kijk = 1, a = 1, houding = 'staan', t = 0, jong = false } = o; if (a <= 0.01) return;
  const g = jong ? 0.55 : 1; _bd(ctx, x, y, s * g, kijk, a);
  const vacht = jong ? '#7E6A58' : E1.muis, rug = '#6A5644', buik = '#C9BCA6', poot = '#C8A898', klauw = '#8A7068';
  const ren = houding === 'rennen', zit = houding === 'zit', fase = t * 6.283;
  if (zit) { ctx.translate(-1, 0); ctx.rotate(-0.55); }
  // staart (± 3,5 cm), kort en dun behaard
  lijn(ctx, [[-5.2, -1.5], [-6.8, -1.0], [-8.4, -0.8]], '#9A8270', 0.55);
  // achterpoot (dij in het lijf, voet op de grond)
  const ap = ren ? Math.sin(fase) * 0.9 : 0, vp = ren ? Math.sin(fase + Math.PI) * 0.8 : 0;
  vul(ctx, [[-3.6 + ap * 0.3, -1.2], [-2.6 + ap, -0.2], [-1.2 + ap, -0.05], [-1.0 + ap, 0.0], [-3.0 + ap, 0.0], [-4.2, -0.7]], poot);
  // lijf: rond, gedrongen, nek niet zichtbaar (woelmuis)
  const L = [[-5.4, -1.4], [-5.2, -2.9], [-3.8, -4.1], [-1.4, -4.6], [1.0, -4.4], [2.8, -3.9], [4.1, -3.1], [5.0, -2.3], [5.3, -1.75], [5.0, -1.35], [4.0, -1.0], [2.8, -0.75], [0.8, -0.6], [-1.8, -0.55], [-4.0, -0.75]];
  vul(ctx, L, vacht, rgba(rug, 0.9), 0.12);
  binnen(ctx, L, () => { vul(ctx, [[-6, -1.2], [-2, -1.25], [1.5, -1.0], [4, -1.45], [6, -1.6], [6, 0], [-6, 0]], buik); vul(ctx, [[-6, -3.0], [-3, -4.2], [0, -4.7], [3, -4.3], [5, -3.2], [5, -5], [-6, -5]], rug);
    ctx.strokeStyle = rgba(rug, 0.55); ctx.lineWidth = 0.12; for (let i = 0; i < 22; i++) { const px = -4.8 + i * 0.45, py = -3.6 + Math.sin(i * 1.7) * 0.5 - (i > 14 ? (i - 14) * 0.08 : 0); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 0.35, py + 0.25); ctx.stroke(); } });
  // voorpoot
  vul(ctx, [[2.6 + vp * 0.2, -1.1], [3.0 + vp, -0.1], [3.7 + vp, 0.0], [3.6 + vp, -0.2], [3.3, -1.2]], poot);
  lijn(ctx, [[3.7 + vp, 0], [3.95 + vp, 0.02]], klauw, 0.12);
  // oor (klein, half in de vacht), oog, snuit
  vul(ctx, [[2.2, -3.75], [2.35, -4.55], [2.95, -4.7], [3.3, -4.2], [3.0, -3.7]], '#7A6250'); vul(ctx, [[2.45, -3.9], [2.55, -4.4], [2.9, -4.45], [3.05, -4.1]], '#B49484');
  circ(ctx, 3.85, -3.15, 0.34, '#140E0A'); circ(ctx, 3.95, -3.25, 0.09, 'rgba(255,255,255,0.7)');
  circ(ctx, 5.25, -1.8, 0.28, '#5A3E34');
  ctx.strokeStyle = rgba('#E8E0D2', 0.55); ctx.lineWidth = 0.06; [[-0.3, -0.5], [0, -0.1], [0.3, 0.3]].forEach(([dy, dk]) => { ctx.beginPath(); ctx.moveTo(4.9, -1.95 + dy * 0.4); ctx.lineTo(6.6, -2.3 + dy * 1.6 + dk); ctx.stroke(); });
  ctx.restore(); }

// ---------- schema-helpers ----------
// grafiekassen: x,y = oorsprong, w,h; xt/yt = [[u, label]] (u 0..1)
function e1As(ctx, x, y, w, h, o = {}) { const { xLabel = '', yLabel = '', xt = [], yt = [], raster = true } = o;
  if (raster) { ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1; yt.forEach(([u]) => { ctx.beginPath(); ctx.moveTo(x, y - u * h); ctx.lineTo(x + w, y - u * h); ctx.stroke(); }); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 20, y); ctx.stroke();
  xt.forEach(([u, s]) => { ctx.beginPath(); ctx.moveTo(x + u * w, y); ctx.lineTo(x + u * w, y + 10); ctx.stroke(); metaText(ctx, s, x + u * w, y + 46, C.text2, 'center', 28); });
  yt.forEach(([u, s]) => { ctx.beginPath(); ctx.moveTo(x - 10, y - u * h); ctx.lineTo(x, y - u * h); ctx.stroke(); metaText(ctx, s, x - 20, y - u * h + 10, C.text2, 'right', 28); });
  if (xLabel) metaText(ctx, xLabel, x + w, y + 92, C.text2, 'right', 28); if (yLabel) metaText(ctx, yLabel, x, y - h - 40, C.text2, 'left', 28); }
function e1Lijn(ctx, P, kleur, lw = 5, dash = null) { ctx.save(); if (dash) ctx.setLineDash(dash); lijn(ctx, P, kleur, lw); ctx.restore(); }
function e1Punt(ctx, x, y, kleur = C.goud, r = 10) { circ(ctx, x, y, r, kleur, C.bgSchema, 3); }
// nationale beverlijn: kaart jaartal -> x, aantal -> y (lineair)
function e1Nationaal(ctx, gx, gy, gw, gh, o = {}) { const { tot = 2023, punten = true, kleur = C.goud, lw = 6, deel = null, ymax = 7000 } = o;
  const X = (j) => gx + (j - 1985) / (2025 - 1985) * gw, Y = (n) => gy - n / ymax * gh;
  const f = (j) => j <= 2004 ? 128 * Math.pow(220 / 128, (j - 2000) / 4) : (j <= 2019 ? 220 * Math.pow(3500 / 220, (j - 2004) / 15) : 3500 * Math.pow(6000 / 3500, (j - 2019) / 4));
  const P = []; for (let j = 1991; j <= tot + 0.01; j += 0.5) P.push([X(j), Y(j < 2000 ? Math.max(42, 128 * Math.pow(220 / 128, (j - 2000) / 4)) : f(j))]);
  if (P.length > 1) e1Lijn(ctx, P, kleur, lw);
  if (deel) { const Q = []; for (let j = deel[0]; j <= deel[1] + 0.01; j += 0.5) Q.push([X(j), Y(f(j))]); e1Lijn(ctx, Q, deel[2] || C.koraal, lw + 3); }
  if (punten) E1_JAREN.filter(([j]) => j <= tot).forEach(([j, n]) => e1Punt(ctx, X(j), Y(n), kleur, 11));
  return { X, Y, f }; }
// populatie als cirkel met vier pijlen (geboorte, immigratie erin; sterfte, emigratie eruit)
function e1Popcirkel(ctx, x, y, r = 170, o = {}) { const { a = 1, getallen = null } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(C.fill, 0.9), C.line, 2); text(ctx, 'populatie', x, y + 14, fTekst(44, 700), C.text, 'center');
  const pij = [['geboorte', -2.45, C.groen, true], ['immigratie', -0.69, C.groen, true], ['sterfte', 2.45, C.koraal, false], ['emigratie', 0.69, C.koraal, false]];
  pij.forEach(([naam, an, kl, in_], i) => { const c = Math.cos(an), s = Math.sin(an); const r1 = r + 20, r2 = r + 170;
    if (in_) pijl(ctx, x + c * r2, y + s * r2, x + c * r1, y + s * r1, kl, 1, 7, 24); else pijl(ctx, x + c * r1, y + s * r1, x + c * r2, y + s * r2, kl, 1, 7, 24);
    const lx = x + c * (r2 + 30), ly = y + s * (r2 + 30) + 12; text(ctx, naam, lx, ly, fTekst(40, 600), kl, c < 0 ? 'right' : 'left');
    if (getallen) text(ctx, getallen[i], lx, ly + 52, fTekst(40, 800), C.text, c < 0 ? 'right' : 'left'); });
  ctx.restore(); }
// bever-pictogram voor tellingen (telpoppetje, mag pictogram zijn): silhouet van opzij
function e1Icoon(ctx, x, y, r = 22, o = {}) { const { kleur = C.okerD, merk = false, a = 1, kijk = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(r / 22 * kijk, r / 22);
  vul(ctx, [[-20, 4], [-18, -8], [-6, -16], [8, -14], [18, -8], [24, -2], [20, 4], [6, 8], [-10, 8]], kleur);
  vul(ctx, [[-19, 2], [-36, 6], [-38, 12], [-22, 10]], _dk(kleur, 0.3)); circ(ctx, 15, -7, 1.8, '#1A120C');
  if (merk) circ(ctx, 0, -20, 6, C.goud, C.bgSchema, 2);
  ctx.restore(); }
// DNA-profiel als streepjescode (één bever = één patroon)
function e1Profiel(ctx, x, y, w, h, seed, kleur = C.text) { ctx.save(); roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
  for (let i = 0; i < 14; i++) { const u = hash(seed * 17 + i * 3.7); if (u < 0.35) continue; ctx.fillStyle = kleur; ctx.fillRect(x + 16 + i * (w - 32) / 14, y + 14, 3 + u * 9, h - 28); } ctx.restore(); }
// leeftijdspiramide: staven per klasse (onder = jong)
function e1Piramide(ctx, x, y, vals, o = {}) { const { bh = 54, sc = 4, kleur = C.okerD, labels = null } = o;
  vals.forEach((v, i) => { const yy = y - (i + 1) * (bh + 8); roundRect(ctx, x - v * sc / 2, yy, v * sc, bh, 6); shape(ctx, rgba(kleur, 0.9), _lt(kleur, 0.3), 1.5);
    if (labels) metaText(ctx, labels[i], x - 260, yy + bh / 2 + 10, C.text2, 'right', 28); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - vals.length * (bh + 8) - 10); ctx.stroke(); }
// Markermeer met de Marker Wadden (schematisch, niet op schaal). x,y = linksboven, s = schaal
function e1KaartMarkermeer(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  vul(ctx, [[0, 0], [900, 0], [900, 620], [0, 620]], '#3A5540');
  vul(ctx, [[120, 120], [380, 60], [640, 110], [760, 260], [720, 470], [520, 560], [260, 520], [120, 380]], E1.water);
  lijn(ctx, [[640, 110], [860, 40]], '#8FA0B5', 6); // Houtribdijk
  [[520, 210, 46, 30, 0.3], [585, 250, 30, 20, -0.4], [480, 270, 24, 16, 0.2], [550, 300, 20, 13, 0.5], [610, 205, 16, 11, 0]].forEach(([cx, cy, rx, ry, rot], i) => { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.fillStyle = i ? '#C9A86A' : '#B8A060'; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = C.groen; ctx.beginPath(); ctx.ellipse(-rx * 0.15, -ry * 0.1, rx * 0.55, ry * 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.restore(); }
// kaart van een rivieroever (Millingerwaard als schema): lint met territoria
function e1Oeverlint(ctx, x, y, w, n, o = {}) { const { bezet = n, kleur = C.okerD, a = 1, h = 46 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const bx = x + i * w / n; roundRect(ctx, bx + 4, y, w / n - 8, h, 10); shape(ctx, i < bezet ? rgba(kleur, 0.85) : rgba(C.fill, 0.6), i < bezet ? _lt(kleur, 0.3) : C.line, 1.5);
    if (i < bezet) e1Icoon(ctx, bx + w / n / 2, y + h / 2 + 6, 13, { kleur: '#5A3A24' }); }
  ctx.restore(); }
// haar aan een draad over een beverwissel (haarval)
function e1Haarval(ctx, x, y, s = 1) { ctx.save(); ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 160 * s, y - 40 * s); ctx.lineTo(x + 160 * s, y - 50 * s); ctx.stroke();
  [-90, -20, 60].forEach((dx, i) => { lijn(ctx, [[x + dx * s, y - 44 * s], [x + dx * s + 6, y - 20 * s], [x + dx * s - 2, y - 4 * s]], i === 1 ? C.goud : '#7A5A42', 2.5); });
  lijn(ctx, [[x - 160 * s, y - 40 * s], [x - 160 * s, y + 30 * s]], E1.houtD, 6); lijn(ctx, [[x + 160 * s, y - 50 * s], [x + 160 * s, y + 30 * s]], E1.houtD, 6); ctx.restore(); }
