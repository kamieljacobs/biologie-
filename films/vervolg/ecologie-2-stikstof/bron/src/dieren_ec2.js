// ---- uit bibliotheek/dieren/lib_dieren.js (25 okt 2026): koe7 + koolmees met hulpen; circ/_mix/pijl komen uit de film zelf ----
function _mixDier(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
const _dk = (hex, k = 0.25) => _mixDier(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mixDier(hex, k, '#FFFFFF');
// ===== dier_basis.js =====
// Bestaat dit echt? — dierenbibliotheek volgens Part C9 (tekenrecept Dieren), 22 okt 2026
// Elk dier: f(ctx, x, y, s, o). Anker (x, y) = midden onder het dier; kop naar rechts (kijk: -1 spiegelt).
// Redelijk realistisch maar vlak getekend: echte verhoudingen, echt oog, 2–3 kenmerken met detail, geen verlopen.

function _bd(ctx, x, y, s, kijk = 1, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s * kijk, s); }
// echt dierenoog: iris in eigen kleur, pupil in de juiste vorm, één klein lichtpuntje
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
// patroon binnen een vorm (vlekken, rimpels): eerst clippen op P
function binnen(ctx, P, fn) { ctx.save(); zacht(ctx, P); ctx.clip(); fn(); ctx.restore(); }

// ===== dieren_overig.js =====
// Evolutie v2 · tekenronde 2 (23 okt 2026) — vogels, vissen, reptielen, amfibieën, ongewervelden en planten.
// Laadt NA teken_evo1..8 en overschrijft daar de oude definities (zelfde naam en aanroepvorm, extra opties zijn optioneel).
// Recepten en bronnen: lessen_overig.md. Part C-stijl: vlak, geen verlopen/gloed/schaduw, 2–3 tinten per kleur, lichte randlijn, echt oog.

// Kleurhulpen die altijd hex teruggeven: lib_cast.js overschrijft _mix (geeft 'rgb(...)'), waardoor _dk(_dk(x)) en rgba(_lt(x)) zwart worden.
function _hx(c) { if (c[0] === '#') return c.length === 4 ? '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c; const m = c.match(/\d+/g).map(Number); return '#' + m.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join(''); }
function _mx(c, k, met) { const a = parseInt(_hx(c).slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _D = (c, k = 0.25) => _mx(c, k, '#000000'), _L = (c, k = 0.25) => _mx(c, k, '#FFFFFF');
function _A(c, a) { const n = parseInt(_hx(c).slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }

// ===================================================================================
// HULPEN
// ===================================================================================
// punt langs een as: (x0,y0) + u·d + v·n, met d = richting van de as, n = 'onderkant' (buikzijde) loodrecht erop
function _as(S, T) { const dx = T[0] - S[0], dy = T[1] - S[1], L = Math.hypot(dx, dy) || 1, d = [dx / L, dy / L]; const n = [d[1], -d[0]]; // buikzijde voor een as die naar links/achter loopt
  return { L, d, n, p: (u, v) => [S[0] + d[0] * u * L + n[0] * v, S[1] + d[1] * u * L + n[1] * v] }; }
// buisvorm langs een ruggengraat: P = punten, top/bot = halve dikte boven (links van de looprichting) en onder per punt → gesloten omtrek
function _buis(P, top, bot) { const N = P.length, L = [], R = [];
  for (let i = 0; i < N; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(N - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; const nx = dy / l, ny = -dx / l; // nx,ny = 'boven' bij looprichting naar rechts
    L.push([P[i][0] + nx * top[i], P[i][1] + ny * top[i]]); R.push([P[i][0] - nx * bot[i], P[i][1] - ny * bot[i]]); }
  return L.concat(R.reverse()); }
// interpoleer een profiel (lijst [u, waarde]) op u
function _prof(tab, u) { for (let i = 0; i < tab.length - 1; i++) { const [u0, a] = tab[i], [u1, b] = tab[i + 1]; if (u <= u1) { const f = (u - u0) / (u1 - u0 || 1); const g = f * f * (3 - 2 * f); return a + (b - a) * g; } } return tab[tab.length - 1][1]; }
// taps toelopende streek (poot, teen, stengel): punten P met breedtes Wd, vloeiend (polygonvorm zonder losse doppen)
function _streek(ctx, P, Wd, fill, rand = null, lw = 1.2) { const top = Wd.map(w => w / 2), O = _buis(P, top, top); vul(ctx, O, fill, rand, lw); }
// klauw/nagel aan het eind van een teen: kort gebogen haakje in de looprichting (a = hoek), k = buigrichting (+1 omlaag)
function _klauw(ctx, x, y, a, l, col, k = 1, lw = 2) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y);
  const mx = x + Math.cos(a) * l * 0.6, my = y + Math.sin(a) * l * 0.6, ex = x + Math.cos(a + k * 1.1) * l, ey = y + Math.sin(a + k * 1.1) * l; ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke(); ctx.restore(); }

// ZITPLEK: kijkt op het canvas wat er onder de voeten ligt (vóór het dier getekend wordt), zodat elke scène vanzelf de juiste houding krijgt.
// → { soort: 'tak', top, dik } (top = bovenkant van de tak t.o.v. het anker, in eenheden; dik = dikte) of { soort: 'grond' } of { soort: 'lucht' }.
// Werkt op de pixels die de scène al tekende (tak = smalle band met lucht/achtergrond erboven én eronder). o.zit overschrijft ('tak' | 'grond' | 'schors').
function _zitplek(ctx, x, y, s, o = {}) {
  if (o.zit === 'grond' || o.zit === 'schors') return { soort: o.zit };
  if (o.zit === 'tak') return { soort: 'tak', top: o.takTop ?? 0, dik: o.takDik ?? 10 };
  try { const m = ctx.getTransform(); const dx = m.a * x + m.c * y + m.e, dy = m.b * x + m.d * y + m.f; const sc = Math.hypot(m.c, m.d) * s; if (sc <= 0) return { soort: 'lucht' };
    const span = Math.max(12, Math.round(36 * sc)), cv = ctx.canvas; const x0 = Math.round(dx), y0 = Math.round(dy - span);
    if (x0 < 1 || x0 >= cv.width - 1) return { soort: 'lucht' };
    const ya = Math.max(0, y0), yb = Math.min(cv.height, Math.round(dy + span)); if (yb - ya < 6) return { soort: 'lucht' };
    const d = ctx.getImageData(x0 - 1, ya, 3, yb - ya).data, rij = (r) => { let R = 0, G = 0, B = 0, A = 0; for (let k = 0; k < 3; k++) { const i = (r * 3 + k) * 4; R += d[i]; G += d[i + 1]; B += d[i + 2]; A += d[i + 3]; } return [R / 3, G / 3, B / 3, A / 3]; };
    const n = yb - ya, ver = (p, q) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) + Math.abs(p[3] - q[3]);
    const ankerRij = Math.round(dy) - ya, T = rij(0), Bo = rij(n - 1), tol = 30;
    // zoek vanaf boven (max 8 eenheden boven het anker) de eerste rij die afwijkt van de achtergrond boven
    const start = Math.max(0, ankerRij - Math.round(8 * sc)), stop = Math.min(n - 1, ankerRij + Math.round(6 * sc)); let r0 = -1;
    for (let r = start; r <= stop; r++) if (ver(rij(r), T) > tol) { r0 = r; break; }
    if (r0 < 0) return { soort: 'lucht' };
    let r1 = r0; const P = rij(Math.min(n - 1, r0 + 1)); while (r1 < n - 1 && ver(rij(r1 + 1), T) > tol && ver(rij(r1 + 1), P) < 90) r1++;
    const dik = (r1 - r0 + 1) / sc, top = (r0 - ankerRij) / sc;
    if (r1 >= n - 2 || dik > 30) return { soort: 'grond', top };
    if (ver(rij(Math.min(n - 1, r1 + 2)), T) > tol * 2 && ver(rij(Math.min(n - 1, r1 + 2)), Bo) > tol) return { soort: 'grond', top };
    return { soort: 'tak', top, dik: Math.max(3, dik) };
  } catch (e) { return { soort: 'lucht' }; } }

// VOGELPOOT. Zichtbaar is alleen de tarsus (loopbeen) met tenen; de 'knie' die naar achter buigt is de hiel (intertarsaal gewricht),
// de echte knie en het dijbeen zitten in de veren. Passeriformen: 3 tenen naar voren, 1 sterke achterteen (hallux).
// H = hiel (bovenaan, in de buikveren), F = voet (bal van de voet). z = zitplek. maat = teenlengte. ver = verre poot (donkerder, iets kleiner)
function _vPoot(ctx, H, F, z, o) { const { kl = '#3A3430', dik = 5, teen = 18, ver = false, schub = true, spoor = 0, klauw = '#1E1A18' } = o;
  const col = ver ? _D(kl, 0.25) : kl, lt = _L(kl, 0.18), tw = dik * 0.62;
  // tarsus: iets dikker bij de hiel, met schubben (scuta) als korte dwarsstreepjes aan de voorkant
  _streek(ctx, [H, [lerp(H[0], F[0], 0.5), lerp(H[1], F[1], 0.5)], F], [dik * 1.25, dik, dik * 0.9], col);
  if (schub && !ver) { ctx.strokeStyle = _A(lt, 0.7); ctx.lineWidth = Math.max(0.8, dik * 0.14); const a = Math.atan2(F[1] - H[1], F[0] - H[0]); for (let i = 1; i < 6; i++) { const u = 0.15 + i * 0.13; const px = lerp(H[0], F[0], u), py = lerp(H[1], F[1], u); ctx.beginPath(); ctx.moveTo(px + Math.cos(a + 1.57) * dik * 0.45, py + Math.sin(a + 1.57) * dik * 0.45); ctx.lineTo(px + Math.cos(a + 1.57) * dik * 0.05, py + Math.sin(a + 1.57) * dik * 0.05 + dik * 0.12); ctx.stroke(); } }
  if (spoor) { const px = lerp(H[0], F[0], 0.62), py = lerp(H[1], F[1], 0.62); _streek(ctx, [[px, py], [px - spoor, py - spoor * 0.15]], [dik * 0.5, 1], col); }
  const L = teen * (ver ? 0.92 : 1), [fx, fy] = F, kw = Math.max(1.2, tw * 0.55);
  const t = (pts, w) => { _streek(ctx, pts, pts.map((_, i) => w * (1 - 0.35 * i / (pts.length - 1))), col); const a = pts[pts.length - 1], b = pts[pts.length - 2]; return [a, Math.atan2(a[1] - b[1], a[0] - b[0])]; };
  if (z.soort === 'tak') { const D = Math.max(4, z.dik), dr = Math.min(D * 0.95, L * 0.9), kr = Math.min(1, dr / (L * 0.9));
    // achterteen (hallux): sterk, over de bovenkant naar achter en langs de achterkant omlaag
    let [e, a] = t([[fx, fy], [fx - L * 0.32, fy + dr * 0.08], [fx - L * 0.5, fy + dr * 0.45], [fx - L * 0.46, fy + dr * 0.82]], tw * 1.05); _klauw(ctx, e[0], e[1], a, L * 0.26, klauw, -1, kw);
    // drie voortenen: waaieren over de voorkant van de tak naar beneden; nagels haken onder de tak terug
    for (const [sx, k] of [[0.16, 0.9], [0.62, 1], [0.38, 0.96]]) { const ex = fx + L * (0.1 + sx * 0.75) * (0.6 + 0.4 * kr);
      [e, a] = t([[fx, fy], [lerp(fx, ex, 0.55) + L * 0.1, fy + dr * 0.1], [ex + L * 0.05, fy + dr * k * 0.55], [ex, fy + dr * k]], tw); _klauw(ctx, e[0], e[1], a, L * 0.24, klauw, 1, kw); }
  } else if (z.soort === 'schors') { // vastklampen: tenen wijd gespreid, nagels haken in de schors
    let [e, a] = t([[fx, fy], [fx - L * 0.5, fy + 2], [fx - L * 0.75, fy + 5]], tw); _klauw(ctx, e[0], e[1], a, L * 0.3, klauw, -1, kw);
    for (const [ex, ey] of [[L * 0.95, -L * 0.25], [L * 1.0, L * 0.12], [L * 0.7, L * 0.42]]) { [e, a] = t([[fx, fy], [fx + ex * 0.55, fy + ey * 0.45 - 2], [fx + ex, fy + ey]], tw); _klauw(ctx, e[0], e[1], a, L * 0.3, klauw, 1, kw); }
  } else { // grond: tenen plat op y = 0 (voet net erboven), middelste teen het langst, binnenste verkort (wijst naar de kijker)
    const g = 0; let [e, a] = t([[fx, fy], [fx - L * 0.35, g - tw * 0.3], [fx - L * 0.6, g - tw * 0.2]], tw); _klauw(ctx, e[0], e[1], a, L * 0.25, klauw, -1, kw);
    for (const [ex, ey] of [[0.62, -tw * 0.5], [1.0, -tw * 0.25], [0.7, tw * 0.15]]) { [e, a] = t([[fx, fy], [fx + L * ex * 0.5, g - tw * 0.4 + ey * 0.3], [fx + L * ex, g + ey]], tw); _klauw(ctx, e[0], e[1], a, L * 0.22, klauw, 1, kw); }
  } }

// GEVOUWEN VLEUGEL van een zangvogel: S = schouder, T = vleugelpunt. Lagen van voor naar achter: kleine dekveren (schubjes), grote dekveren (band),
// armpennen (afgeronde randen, lichte zoom), handpennen (lang, getrapte punten). o.band = vleugelstreep (koolmees), o.kl = basiskleur.
function _vVleugel(ctx, S, T, w, o) { const { kl, rand = _L(kl, 0.3), zoom = _L(kl, 0.22), donker = _D(kl, 0.22), band = null, dek = null, hand = null } = o; const A = _as(S, T);
  const O = [A.p(0, -w * 0.18), A.p(0.25, -w * 0.32), A.p(0.6, -w * 0.25), A.p(0.92, -w * 0.06), A.p(1, 0), A.p(0.9, w * 0.12), A.p(0.62, w * 0.36), A.p(0.36, w * 0.52), A.p(0.14, w * 0.48), A.p(0.02, w * 0.22)];
  vul(ctx, O, kl, rand, 1.4);
  binnen(ctx, O, () => {
    // handpennen: achterste deel, donkerder, met lichte buitenzoom per pen
    const hp = [A.p(0.5, -w * 0.4), A.p(1.05, -w * 0.1), A.p(1.05, w * 0.3), A.p(0.5, w * 0.6)]; vul(ctx, hp, hand || _D(kl, 0.12));
    ctx.strokeStyle = zoom; ctx.lineWidth = Math.max(1, w * 0.035); for (let i = 0; i < 5; i++) { const v = -w * 0.14 + i * w * 0.075; const a = A.p(0.5, v + w * 0.06), b = A.p(0.97 - i * 0.045, v * 0.4); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
    // armpennen: getrapte, afgeronde veren langs de onderrand
    for (let i = 0; i < 4; i++) { const u = 0.5 - i * 0.1; const c = A.p(u, w * (0.3 + i * 0.035)); ctx.beginPath(); ctx.ellipse(c[0], c[1], w * 0.2, w * 0.32, Math.atan2(A.d[1], A.d[0]), 0, 6.283); ctx.fillStyle = i % 2 ? kl : _D(kl, 0.08); ctx.fill(); ctx.strokeStyle = zoom; ctx.lineWidth = Math.max(1, w * 0.04); ctx.stroke(); }
    // grote dekveren: band met getande onderrand
    const gd = [A.p(-0.05, -w * 0.4), A.p(0.5, -w * 0.4)]; for (let i = 6; i >= 0; i--) { const u = 0.04 + i * 0.065; gd.push(A.p(u + 0.03, w * (0.2 + 0.03 * i)), A.p(u, w * (0.14 + 0.03 * i))); }
    vul(ctx, gd, dek || _L(kl, 0.06), null);
    if (band) { const bd = []; for (let i = 0; i <= 6; i++) { const u = 0.05 + i * 0.065; bd.push(A.p(u + 0.035, w * (0.22 + 0.03 * i))); } for (let i = 6; i >= 0; i--) { const u = 0.05 + i * 0.065; bd.push(A.p(u, w * (0.12 + 0.03 * i))); } vul(ctx, bd, band); }
    // kleine dekveren: schubjes bij de schouder
    ctx.fillStyle = _A(zoom, 0.55); for (let i = 0; i < 9; i++) { const c = A.p(0.04 + (i % 3) * 0.09 + Math.floor(i / 3) * 0.03, -w * 0.12 + Math.floor(i / 3) * w * 0.1); ctx.beginPath(); ctx.ellipse(c[0], c[1], w * 0.05, w * 0.035, 0, 0, Math.PI); ctx.fill(); }
  });
  return A; }
// STAART (gevouwen, van opzij): B = basis (stuit), T = punt. wb/wt = breedte. o.wit = witte buitenste pennen. o.vork = diepte van een vork (zwaluw)
function _vStaart(ctx, B, T, wb, wt, o) { const { kl, rand = _L(kl, 0.25), wit = null, punt = 'recht' } = o; const A = _as(B, T);
  const O = [A.p(0, -wb / 2), A.p(0.6, -wt * 0.5), A.p(1, -wt * 0.5), A.p(punt === 'rond' ? 1.04 : 0.985, 0), A.p(1, wt * 0.5), A.p(0.6, wt * 0.5), A.p(0, wb / 2)];
  vul(ctx, O, kl, rand, 1.3);
  binnen(ctx, O, () => { if (wit) vul(ctx, [A.p(0.35, wt * 0.32), A.p(1.1, wt * 0.32), A.p(1.1, wt), A.p(0.35, wt)], wit);
    ctx.strokeStyle = _D(kl, 0.25); ctx.lineWidth = Math.max(1, wt * 0.05); for (const v of [-0.22, 0.05, 0.28]) { ctx.beginPath(); ctx.moveTo(...A.p(0.12, v * wb)); ctx.lineTo(...A.p(1, v * wt)); ctx.stroke(); } });
  return A; }
// kop + snavel hulpen
function _kegelSnavel(ctx, bx, by, h, l, kl, rand, kromming = 0.55) { // kegelsnavel (vinken): basis vast in de kop, hoog bij de basis, bovensnavel licht gebogen
  const top = [bx - 4, by - h * 0.55], tip = [bx + l, by + h * 0.12], ond = [bx - 2, by + h * 0.45];
  ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.quadraticCurveTo(bx + l * 0.55, by - h * (0.5 + kromming * 0.12), tip[0], tip[1]); ctx.quadraticCurveTo(bx + l * 0.5, by + h * 0.42, ond[0], ond[1]); ctx.closePath();
  ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.4; ctx.stroke();
  // ondersnavel iets lichter, snavelnaad loopt licht omlaag naar de mondhoek
  ctx.save(); ctx.clip(); ctx.fillStyle = _L(kl, 0.12); ctx.beginPath(); ctx.moveTo(bx - 4, by + h * 0.06); ctx.quadraticCurveTo(bx + l * 0.5, by + h * 0.14, tip[0], tip[1]); ctx.lineTo(bx + l, by + h); ctx.lineTo(bx - 6, by + h); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.strokeStyle = _D(kl, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx - 3, by + h * 0.08); ctx.quadraticCurveTo(bx + l * 0.5, by + h * 0.15, tip[0] - 1, tip[1]); ctx.stroke();
  circ(ctx, bx + 3, by - h * 0.28, Math.max(1.2, h * 0.07), _D(kl, 0.45)); return tip; }


// HOUDING van een zangvogel. o.houding: 'tak' (tenen om een tak; o.takY = schermhoogte van de bovenkant van de tak, o.takDik = dikte in eenheden),
// 'staan' (grond), 'pikken' (grond, kop omlaag), 'klampen' (aan schors), 'vliegen' (vleugels gespreid via o.t, poten ingetrokken, lijf horizontaal).
// Zonder o.houding: automatisch uit de pixels onder de voeten (_zitplek); met rot ≠ 0 klampen (koolmees op de stam).
function _zangH(ctx, x, y, s, o, rot = 0) { const h = o.houding, pik = o.pik || 0;
  if (h === 'vliegen') return { z: { soort: 'lucht' }, dy: 0, vlieg: true, pik: 0, rot: 0.4, t: o.t || 0 };
  if (h === 'tak') return { z: { soort: 'tak', dik: o.takDik ?? 10 }, dy: o.takY != null ? (o.takY - y) / s : 0, pik, rot: 0 };
  if (h === 'staan') return { z: { soort: 'grond' }, dy: 0, pik, rot: 0 };
  if (h === 'pikken') return { z: { soort: 'grond' }, dy: 0, pik: o.pik ?? 1, rot: 0.28 };
  if (h === 'klampen') return { z: { soort: 'schors' }, dy: 0, pik, rot: 0 };
  const z = rot ? { soort: 'schors' } : _zitplek(ctx, x, y, s, o); return { z, dy: z.soort === 'tak' ? Math.min(0, z.top) : 0, pik, rot: 0 }; }
// GESPREIDE VLEUGEL (vlucht, van opzij). De vleugel zit met een brede voet (schouder S tot R langs de rug) aan het lijf vast. Slag via H.t:
// neerslag = vleugel helemaal gespreid (handpennen als vingers uit elkaar), opslag = hand naar achter geklapt (smaller, 'gevouwen pols');
// halverwege de slag wijst de vleugel naar de kijker en zie je hem verkort. Lagen: dekveren (lichter, bij de voorrand), armpennen, handpennen.
function _vOpen(ctx, S0, H, len, w, o) { const { kl, rand = _L(kl, 0.3), ver = false } = o; const S = [S0[0] - len * 0.1, S0[1] + len * 0.06]; const f = (H.t || 0) * 11 - (ver ? 0.25 : 0);
  const phi = Math.sin(f), neer = Math.cos(f) > 0; const spread = neer ? 1 : 0.5; const P = len * (0.3 + 0.7 * Math.abs(phi));
  const a = phi < 0 ? -2.0 : 0.5, bd = phi < 0 ? -1 : 1; const dir = (an, l) => [Math.cos(an) * l, Math.sin(an) * l];
  const back = [-0.97, 0.25], chord = len * 0.56 * (0.7 + 0.3 * spread), R = [S[0] - len * 0.4, S[1] + len * 0.12];
  const W2 = [S[0] + dir(a, P * 0.45)[0], S[1] + dir(a, P * 0.45)[1]]; const at = neer && phi > 0 ? a - 0.12 : a + bd * (0.2 + (1 - spread) * 0.9); const T = [W2[0] + dir(at, P * 0.62)[0], W2[1] + dir(at, P * 0.62)[1]];
  const P2 = [W2[0] + back[0] * chord, W2[1] + back[1] * chord];
  const k = ver ? _D(kl, 0.22) : kl, l = _L(k, 0.1);
  // omtrek: voorrand S → pols → punt, achterrand: getrapte handpennen → armpennen (geschulpt) → voet R
  const O = [S, [lerp(S[0], W2[0], 0.5) - back[0] * 3, lerp(S[1], W2[1], 0.5) - back[1] * 3], W2, T];
  const nH = 6; for (let i = 1; i <= nH; i++) { const u = i / nH; const q = [lerp(T[0], P2[0], u), lerp(T[1], P2[1], u)]; const terug = (1 - u) * 0.06 * P * spread; const tip = [q[0] + back[0] * terug * 0.2 + dir(at, -terug)[0] * 0.6, q[1] + back[1] * terug * 0.2 + dir(at, -terug)[1] * 0.6]; O.push(tip); O.push([lerp(tip[0], q[0], 0.6) + dir(at, P * 0.05)[0] * spread, lerp(tip[1], q[1], 0.6) + dir(at, P * 0.05)[1] * spread]); }
  for (let i = 1; i <= 4; i++) { const u = i / 5; O.push([lerp(P2[0], R[0], u) + back[0] * 4, lerp(P2[1], R[1], u) + back[1] * 4 + 3]); O.push([lerp(P2[0], R[0], u + 0.1), lerp(P2[1], R[1], u + 0.1)]); }
  O.push(R);
  ctx.save(); ctx.lineJoin = 'round'; ctx.beginPath(); O.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.closePath(); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.4; ctx.stroke();
  ctx.save(); ctx.clip();
  // dekveren: lichtere band langs de voorrand van arm en hand
  const dk = [S, W2, [W2[0] + back[0] * chord * 0.25, W2[1] + back[1] * chord * 0.25], [R[0] + (S[0] - R[0]) * 0.7, R[1] + (S[1] - R[1]) * 0.7]]; vul(ctx, dk, l, null);
  ctx.strokeStyle = _A(rand, 0.75); ctx.lineWidth = Math.max(1, w * 0.03);
  for (let i = 0; i <= nH; i++) { const u = i / nH; const q = [lerp(T[0], P2[0], u), lerp(T[1], P2[1], u)]; const b = [lerp(W2[0], P2[0], 0.25 + u * 0.5) + (T[0] - W2[0]) * (1 - u) * 0.2, lerp(W2[1], P2[1], 0.25 + u * 0.5) + (T[1] - W2[1]) * (1 - u) * 0.2]; ctx.beginPath(); ctx.moveTo(...b); ctx.lineTo(...q); ctx.stroke(); } // handpennen
  for (let i = 1; i <= 4; i++) { const u = i / 5; const q = [lerp(P2[0], R[0], u), lerp(P2[1], R[1], u)], b = [lerp(W2[0], S[0], u), lerp(W2[1], S[1], u)]; ctx.beginPath(); ctx.moveTo(lerp(b[0], q[0], 0.4), lerp(b[1], q[1], 0.4)); ctx.lineTo(...q); ctx.stroke(); } // armpennen
  ctx.restore(); ctx.restore(); }
// ===================================================================================
// MIDDELSTE GRONDVINK (Geospiza fortis) — zelfde aanroep als in teken_evo2. Kopframe (26, −104), pik draait 0,6 rad, snavelpunt (22 + 2,64·mm, 0,26·mm):
// sb2 e2s13 rekent daarmee de plek van het vruchtje uit, dus die maten blijven. Lijf: stevig, korte staart (± 1/3 van de lengte), grote kop met steil voorhoofd.
// Zit (tak): lijf ± 30° omhoog, zwaartepunt boven de voeten, tenen om de tak. Grond: tarsus schuin, tenen plat. Eenheid ± 2 per mm.
function grondvink(ctx, x, y, s = 1, o = {}) {
  const { snavel = 9.3, kleed = 'vrouw', kijk = 1, a = 1, snavelKleur = null } = o; if (a <= 0.01) return;
  const H = _zangH(ctx, x, y, s, o); const z = H.z, dy = H.dy, pik = H.pik;
  _bd(ctx, x, y + dy * s, s, kijk, a, H.rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const man = kleed === 'man';
  const veer = man ? '#2E2D30' : '#7C6650', rug = man ? '#252427' : '#665240', veerL = man ? '#55535A' : '#A88E72', buik = man ? '#3A383C' : '#CDBB9E', streep = man ? '#1C1B1D' : '#5E4A38';
  const snv = snavelKleur || (man ? '#262528' : '#C9B48A'), snvL = snavelKleur ? _L(snavelKleur, 0.35) : (man ? '#55555A' : '#E6D6B2');
  const zp = z.soort === 'tak' ? { soort: 'tak', dik: z.dik } : z.soort === 'schors' ? z : { soort: 'grond' };
  const poot = { kl: man ? '#2E2A28' : '#3E3632', dik: 5.2, teen: 19 };
  const F1 = zp.soort === 'grond' ? [6, -3] : [2, 0], F2 = zp.soort === 'grond' ? [-8, -3] : [10, 0];
  if (!H.vlieg) _vPoot(ctx, [-6, -40], F2, zp, Object.assign({}, poot, { ver: true }));
  // staart: kort, recht afgesneden, in het verlengde van het lijf schuin omlaag
  if (H.vlieg) _vOpen(ctx, [18, -100], H, 175, 60, { kl: _D(veer, 0.1), ver: true });
  _vStaart(ctx, [-58, -62], [-120, -36], 22, 24, { kl: _D(veer, 0.12), rand: veerL });
  // lijf (borst naar voren, rug doorlopend in de stuit), buik lichter
  const L = [[34, -94], [42, -78], [38, -62], [24, -50], [4, -43], [-22, -43], [-46, -50], [-64, -58], [-68, -70], [-52, -90], [-24, -106], [4, -116], [22, -112]];
  vul(ctx, L, veer, veerL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -98], [20, -86], [-20, -70], [-60, -54], [-70, -20], [60, -20]], buik); vul(ctx, [[30, -130], [0, -112], [-40, -96], [-70, -74], [-80, -120]], rug);
    if (!man) { ctx.strokeStyle = streep; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const px = 36 - (i % 7) * 10 - Math.floor(i / 7) * 5, py = -84 + Math.floor(i / 7) * 14 + (i % 2) * 4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 3, py + 8); ctx.stroke(); } }
    else { ctx.fillStyle = '#E8E4DC'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-40 - i * 6, -44 + i * 2, 3, 2, 0.4, 0, 6.283); ctx.fill(); } } });
  // dijveren over de bovenkant van de poot
  vul(ctx, [[10, -54], [-12, -54], [-14, -40], [0, -36], [10, -44]], buik);
  if (!H.vlieg) _vPoot(ctx, [2, -42], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [18, -100], H, 175, 60, { kl: _D(veer, 0.1) }); else _vVleugel(ctx, [18, -100], [-90, -58], 46, { kl: _D(veer, 0.1), rand: veerL, zoom: man ? '#55535A' : '#B89E80', dek: man ? _L(veer, 0.04) : '#86705A' });
  // kop (kantelt bij pikken): rond met steil voorhoofd, korte hals overlapt het lijf
  ctx.save(); ctx.translate(26, -104); ctx.rotate(pik * 0.6);
  const K = [[-24, 14], [-20, -10], [-8, -24], [8, -28], [22, -22], [28, -12], [30, 2], [24, 14], [8, 20], [-10, 22]];
  vul(ctx, K, veer, veerL, 2);
  binnen(ctx, K, () => { vul(ctx, [[-30, -40], [30, -40], [30, -14], [-30, -6]], rug); vul(ctx, [[0, 8], [30, 6], [30, 30], [-10, 30]], buik);
    if (!man) { ctx.strokeStyle = streep; ctx.lineWidth = 1.6; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-12 + i * 6, -24 + (i % 2) * 3); ctx.lineTo(-14 + i * 6, -16 + (i % 2) * 3); ctx.stroke(); } lijn(ctx, [[4, 4], [18, 8]], _A(streep, 0.6), 1.5); } });
  const hS = snavel * 2.2, lS = hS * 1.2; _kegelSnavel(ctx, 22, 0, hS, lS, snv, snvL, 0.6);
  dierOog(ctx, 10, -6, 4.8, '#2A1A10', { rand: man ? '#3A383C' : '#E2D6C0' });
  ctx.restore();
  ctx.restore(); }

// ===================================================================================
// MEREL (Turdus merula), man. 23,5–29 cm; zwart met lichte veerranden (anders onzichtbaar op nacht), oranjegele snavel en oogring, poten zwartbruin.
// Staart lang (± 40 %), houding rechtop (lijf ± 40°), staart in het verlengde omlaag. Kopframe (36, −118), pik 0,8 rad, prooi op (54, 0). Eenheid 1 = 1 mm.
function merel(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, prooi = null } = o; if (a <= 0.01) return;
  const H = _zangH(ctx, x, y, s, o); const z = H.z, dy = H.dy, pik = H.pik;
  _bd(ctx, x, y + dy * s, s, kijk, a, H.rot); ctx.lineJoin = 'round';
  const zw = '#2E2D33', rug = '#25242A', zwL = '#5E5D66', buik = '#3A3940';
  const zp = z.soort === 'tak' ? { soort: 'tak', dik: z.dik } : z.soort === 'schors' ? z : { soort: 'grond' };
  const poot = { kl: '#3E3428', dik: 5.5, teen: 22 }, F1 = zp.soort === 'grond' ? [6, -3] : [2, 0], F2 = zp.soort === 'grond' ? [-10, -3] : [10, 0];
  if (!H.vlieg) _vPoot(ctx, [-8, -40], F2, zp, Object.assign({}, poot, { ver: true }));
  if (H.vlieg) _vOpen(ctx, [14, -110], H, 200, 60, { kl: _D(zw, 0.12), ver: true });
  _vStaart(ctx, [-38, -62], zp.soort === 'tak' ? [-108, 6] : [-140, -34], 24, 30, { kl: _D(zw, 0.15), rand: zwL, punt: 'rond' });
  const L = [[42, -102], [46, -84], [40, -64], [26, -50], [6, -42], [-14, -40], [-32, -46], [-46, -60], [-50, -80], [-38, -102], [-12, -122], [14, -132], [32, -126]];
  vul(ctx, L, zw, zwL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -96], [10, -76], [-60, -58], [-60, -20], [60, -20]], buik); vul(ctx, [[30, -140], [-10, -116], [-60, -86], [-70, -140]], rug);
    ctx.strokeStyle = _A(zwL, 0.55); ctx.lineWidth = 1.3; for (let i = 0; i < 16; i++) { const px = 38 - (i % 6) * 12, py = -88 + Math.floor(i / 6) * 13 + (i % 2) * 4; ctx.beginPath(); ctx.arc(px, py, 4, 0.2, 2.6); ctx.stroke(); } });
    if (!H.vlieg) _vPoot(ctx, [0, -42], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [14, -110], H, 200, 60, { kl: _D(zw, 0.12) }); else _vVleugel(ctx, [14, -110], [-66, -36], 44, { kl: _D(zw, 0.12), rand: zwL, zoom: '#5A5962', hand: '#1E1D22' });
  ctx.save(); ctx.translate(36, -118); ctx.rotate(pik * 0.8);
  const K = [[-22, 16], [-20, -8], [-8, -20], [8, -22], [20, -16], [26, -6], [26, 8], [16, 16], [-4, 20]];
  vul(ctx, K, zw, zwL, 2); binnen(ctx, K, () => vul(ctx, [[-30, -40], [30, -40], [30, -12], [-30, -4]], rug));
  // snavel: slank, recht, oranjegeel; ondersnavel iets lichter; mondhoek
  vul(ctx, [[20, -7], [36, -5], [55, -1], [57, 1], [38, 4], [20, 6]], '#E3A23A', '#F2C878', 1.2); vul(ctx, [[22, 1], [40, 2], [56, 1], [38, 5], [22, 6]], '#ECB656');
  lijn(ctx, [[21, 0], [55, 0]], '#9A6420', 1.3); circ(ctx, 28, -3, 1.4, '#9A6420');
  dierOog(ctx, 12, -6, 4.2, '#1A1210', { rand: '#E8A83A' });
  if (prooi) prooi(ctx, 54, 0);
  ctx.restore();
  ctx.restore(); }

// ===================================================================================
// KOOLMEES (Parus major): 12,5–14 cm. Kop en keel blauwzwart, witte wang, gele borst met brede zwarte middenstreep, olijfgroene rug, nekvlek,
// vleugel blauwgrijs met witte vleugelstreep, staart blauwgrijs met witte buitenpennen; poten blauwgrijs. Kopframe (30, −104), pik 0,7, prooi op (44, 0).
// Met rot ≠ 0 (op een stam): vastklampen met gespreide tenen, staart tegen de schors. Eenheid 1 = 0,5 mm.
function koolmees(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, prooi = null, rot = 0 } = o; if (a <= 0.01) return;
  const H = _zangH(ctx, x, y, s, o, rot); const z = H.z, dy = H.dy, pik = H.pik;
  _bd(ctx, x, y + dy * s, s, kijk, a, rot + H.rot); ctx.lineJoin = 'round';
  const groen = '#7A8E56', groenL = '#A2B47E', geel = '#E2C44A', geelD = '#C8A838', zwart = '#1C1D24', blauw = '#5E7090', blauwL = '#8EA2C0';
  const zp = z.soort === 'tak' ? { soort: 'tak', dik: z.dik } : z.soort === 'schors' ? z : { soort: 'grond' };
  const poot = { kl: '#5E6A80', dik: 4.6, teen: 19, klauw: '#2A2E38' };
  const F1 = zp.soort === 'grond' ? [6, -3] : zp.soort === 'schors' ? [12, 0] : [2, 0], F2 = zp.soort === 'grond' ? [-8, -3] : zp.soort === 'schors' ? [-4, -2] : [10, 0];
  if (!H.vlieg) _vPoot(ctx, [-6, -38], F2, zp, Object.assign({}, poot, { ver: true }));
  if (H.vlieg) _vOpen(ctx, [16, -98], H, 205, 60, { kl: blauw, ver: true });
  _vStaart(ctx, [-54, -62], [-134, -24], 20, 24, { kl: blauw, rand: blauwL, wit: '#EEEEEA' });
  const L = [[32, -92], [40, -76], [36, -58], [22, -44], [0, -36], [-24, -38], [-46, -48], [-60, -60], [-60, -76], [-44, -96], [-16, -110], [8, -116], [24, -110]];
  vul(ctx, L, groen, groenL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -100], [14, -88], [-30, -62], [-62, -50], [-70, -10], [60, -10]], geel); vul(ctx, [[-30, -40], [-60, -54], [-70, -10], [-20, -10]], '#D8D4C4');
    vul(ctx, [[40, -70], [20, -50], [-10, -44], [-30, -60], [-60, -50], [-60, -30], [60, -30]], geelD); // schaduwkant onder
    _streek(ctx, [[34, -96], [26, -72], [10, -50], [-12, -38]], [16, 13, 11, 8], zwart); // zwarte borststreep (bij de man breed tot tussen de poten)
    vul(ctx, [[-20, -114], [-50, -96], [-66, -70], [-80, -120]], '#6A7E4C'); });
  
  if (!H.vlieg) _vPoot(ctx, [2, -40], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [16, -98], H, 205, 60, { kl: blauw }); else _vVleugel(ctx, [16, -98], [-94, -60], 44, { kl: blauw, rand: blauwL, zoom: '#C8D2E2', dek: '#6E829E', band: '#F2F2EE', hand: '#4A5A76' });
  ctx.save(); ctx.translate(30, -104); ctx.rotate(pik * 0.7);
  const K = [[-22, 16], [-20, -8], [-8, -22], [8, -24], [20, -18], [26, -6], [26, 8], [16, 16], [-4, 20]];
  vul(ctx, K, zwart, '#3E404A', 1.6);
  vul(ctx, [[-10, 4], [4, -4], [18, -2], [22, 8], [10, 14], [-6, 13]], '#F2F2EE'); // witte wang
  vul(ctx, [[-22, -8], [-16, -14], [-14, -4], [-20, 0]], '#E8EAD8'); // nekvlek
  vul(ctx, [[24, -5], [36, -1], [44, 1], [36, 4], [24, 5]], '#24252C', '#4A4C56', 1); lijn(ctx, [[25, 1], [43, 1]], '#0E0F12', 1);
  dierOog(ctx, 14, -9, 3.6, '#1A1210');
  if (prooi) prooi(ctx, 44, 0);
  ctx.restore(); ctx.restore(); }

// ===================================================================================
// ZWARTBUIKZAADKRAKER (Pyrenestes ostrinus), man: ± 14–15 cm; kop, borst, stuit en staart karmijnrood, rest zwart; enorme kegelsnavel, staalblauw.
// Twee erfelijke snavelmaten (klein: zachte zeggezaden; groot: harde zaden). Kopframe (30, −112). Zit op zeggestengels (zitplek wordt gemeten).
function zaadkraker(ctx, x, y, s = 1, o = {}) { const { snavel = 'klein', a = 1, kijk = 1, snavelKleur = null } = o; if (a <= 0.01) return;
  const H = _zangH(ctx, x, y, s, o); const z = H.z, dy = H.dy, pik = H.pik;
  _bd(ctx, x, y + dy * s, s, kijk, a, H.rot); ctx.lineJoin = 'round';
  const rood = '#B8323A', roodL = '#DA6064', roodD = '#962830', zw = '#26242C', zwL = '#4E4C56';
  const zp = z.soort === 'tak' ? { soort: 'tak', dik: z.dik } : z.soort === 'schors' ? z : { soort: 'grond' };
  const poot = { kl: '#6A5E58', dik: 5, teen: 19 }, F1 = zp.soort === 'grond' ? [6, -3] : [2, 0], F2 = zp.soort === 'grond' ? [-8, -3] : [10, 0];
  if (!H.vlieg) _vPoot(ctx, [-6, -44], F2, zp, Object.assign({}, poot, { ver: true }));
  if (H.vlieg) _vOpen(ctx, [16, -110], H, 215, 62, { kl: '#2C2A32', ver: true });
  _vStaart(ctx, [-60, -70], [-150, -34], 22, 26, { kl: roodD, rand: roodL });
  const L = [[36, -100], [44, -82], [38, -62], [22, -48], [0, -40], [-26, -42], [-50, -52], [-66, -66], [-66, -82], [-48, -104], [-18, -120], [10, -126], [28, -118]];
  vul(ctx, L, zw, zwL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -120], [20, -100], [0, -76], [16, -56], [60, -56]], rood); vul(ctx, [[-50, -60], [-70, -72], [-80, -50], [-60, -40]], rood); });
  vul(ctx, [[8, -56], [-12, -54], [-14, -40], [0, -36], [10, -44]], '#1E1C22');
  if (!H.vlieg) _vPoot(ctx, [2, -46], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [16, -110], H, 215, 62, { kl: '#2C2A32' }); else _vVleugel(ctx, [16, -110], [-98, -66], 48, { kl: '#2C2A32', rand: zwL, zoom: '#4E4C58', hand: '#1E1C22' });
  ctx.save(); ctx.translate(30, -112);
  vul(ctx, [[-24, 16], [-20, -8], [-6, -26], [12, -30], [26, -22], [34, -8], [34, 8], [24, 18], [4, 22], [-12, 20]], rood, roodL, 2);
  const hS = snavel === 'groot' ? 31 : snavel === 'midden' ? 26 : 21, lS = hS * 1.15; const sk = snavelKleur || '#3E4A60', skL = snavelKleur ? _L(snavelKleur, 0.35) : '#8494B0';
  _kegelSnavel(ctx, 30, -2, hS, lS, sk, skL, 0.7);
  dierOog(ctx, 13, -8, 4.4, '#2A1A10', { rand: '#5A6478' });
  ctx.restore(); ctx.restore(); }

// ===================================================================================
// PAUW (Pavo cristatus, man). Lijf snavel–staart 100–120 cm, sleep (verlengde bovenstaartdekveren) tot 2–2,3 m vanaf de snavel.
// Hals en borst metaalblauw, mantel groen geschubd, schouderveren zwart-beige gebandeerd, handpennen kastanjebruin, armpennen zwart; kuif van kale schachten
// met blauwgroene waaiertjes; witte streep boven en witte halve maan onder het oog; poten grijsbruin met spoor boven de achterteen.
// Rust: sleep sleept schuin omlaag en ligt het laatste stuk op de grond. o.waaier = sleep opgezet (licht gedraaid, 3/4), vleugels hangend.
// Eenheid ± 0,4 cm (kop op ± 110 cm). Anker = tussen de voeten op de grond.
function _oogvlek(ctx, px, py, r, ang = 0) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang);
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.3, r * 1.02, 0, 0, 6.283); ctx.fillStyle = '#B89A40'; ctx.fill(); // bronzen buitenring
  ctx.beginPath(); ctx.ellipse(r * 0.05, 0, r * 1.02, r * 0.8, 0, 0, 6.283); ctx.fillStyle = '#4E9A72'; ctx.fill(); // groen
  ctx.beginPath(); ctx.ellipse(r * 0.12, 0, r * 0.66, r * 0.55, 0, 0, 6.283); ctx.fillStyle = '#2E64A8'; ctx.fill(); // blauw
  ctx.beginPath(); ctx.moveTo(r * 0.5, 0); ctx.bezierCurveTo(r * 0.4, -r * 0.42, -r * 0.2, -r * 0.42, -r * 0.18, -r * 0.08); ctx.bezierCurveTo(-r * 0.2, r * 0.38, r * 0.4, r * 0.42, r * 0.5, 0); ctx.fillStyle = '#16244A'; ctx.fill(); // donkerblauw hartje
  ctx.restore(); }
function pauw(ctx, x, y, s = 1, o = {}) { const { waaier = 0, a = 1, kijk = 1, staartLengte = 1, vlekken = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const blauw = '#2C5EA6', blauwL = '#4C86CC', blauwD = '#1E447E', groen = '#3E7A4E', brons = '#9A8A40', poot = '#8A7C6C';
  const houding = o.houding || (waaier >= 0.5 ? 'pronk' : 'rust'), open = houding === 'pronk' || waaier >= 0.5; const st = houding === 'lopen' ? (o.t || 0) * 3.2 : null;
  const been = (H, K, F, opt, fase) => { const sw = st == null ? 0 : Math.sin(st + fase) * 18, lift = st == null ? 0 : Math.max(0, Math.cos(st + fase)) * 12; _vPoot(ctx, H, [K[0] + sw * 0.5, K[1] - lift * 0.5], { soort: 'lucht' }, Object.assign({}, opt, { teen: 0 })); ctx.save(); ctx.translate(sw, -lift); _vPoot(ctx, [K[0] - sw * 0.5, K[1] + lift * 0.5 - 2], F, { soort: 'grond' }, opt); ctx.restore(); };
  if (!open) {
    // sleep in rust: bundel van stuit naar achteren-omlaag, laatste kwart op de grond; schachten en oogvlekken langs de lengte
    const L = 310 * staartLengte, x0 = -70;
    const top = [[x0 + 6, -172], [x0 - L * 0.3, -146], [x0 - L * 0.62, -86], [x0 - L * 0.86, -30], [x0 - L - 14, 0]];
    const ond = [[x0 - L * 0.95, 4], [x0 - L * 0.72, 2], [x0 - L * 0.5, -30], [x0 - L * 0.22, -88], [x0 - 14, -128]];
    const S = top.concat(ond); vul(ctx, S, _D(groen, 0.25), brons, 2);
    binnen(ctx, S, () => { ctx.strokeStyle = _A('#C0A848', 0.4); ctx.lineWidth = 1.4; for (let i = 0; i < 16; i++) { const f = i / 15; ctx.beginPath(); ctx.moveTo(x0 - 4, -160 + f * 36); ctx.bezierCurveTo(x0 - L * 0.3, -122 + f * 30, x0 - L * 0.6, -54 + f * 40, x0 - L - 10, -2 + f * 6); ctx.stroke(); }
      for (let i = 0; i < 18; i++) { const u = 0.18 + i * 0.047; const ty = _prof([[0, -166], [0.3, -128], [0.62, -60], [0.86, -12], [1, 0]], u), by = _prof([[0, -128], [0.22, -88], [0.5, -30], [0.72, 2], [1, 4]], u); const v = (i % 3) / 2.4 + 0.12;
        _oogvlek(ctx, x0 - L * u, lerp(ty, by, v), 5 + u * 7, Math.atan2(-(by - ty), L) * 0 + 0.55 - u * 0.5); } });
  }
  else {
    // waaier: ± 200 veren in een licht gedraaide halve ellips achter het lijf, oogvlekken in ringen; onderrand met 'visstaart'-veren
    const cx = -20, cy = -290, R = 320 * staartLengte, ry = 1.0; // referentie: waaier bijna een volle schijf (hoogte = breedte), onderrand tot net boven de knieën
    const F = []; for (let i = 0; i <= 60; i++) { const an = Math.PI * (0.74 + 1.52 * i / 60); F.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R * ry]); } F.push([cx, cy + R * 0.42]);
    vul(ctx, F, _D(groen, 0.3), brons, 2);
    binnen(ctx, F, () => { ctx.strokeStyle = _A('#B8A04A', 0.45); ctx.lineWidth = 1.3; for (let i = 0; i <= 100; i++) { const an = Math.PI * (0.75 + 1.5 * i / 100); ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * R * 0.3, cy + Math.sin(an) * R * 0.3 * ry); ctx.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R * ry); ctx.stroke(); }
      for (const [rr, n] of [[0.94, 48], [0.8, 41], [0.66, 34], [0.52, 26], [0.38, 18]]) for (let i = 0; i < n; i++) { if (hash(i * 13 + rr * 100) > vlekken) continue; const an = Math.PI * (0.79 + 1.42 * (i + 0.5 * (rr * 10 % 2)) / n); const px = cx + Math.cos(an) * R * rr, py = cy + Math.sin(an) * R * rr * ry; _oogvlek(ctx, px, py, 7 + 9 * rr, an + Math.PI / 2 + Math.PI / 2); } });
    // vleugels hangen omlaag: kastanjebruine handpennen naast de poten zichtbaar
    vul(ctx, [[30, -150], [-40, -150], [-62, -80], [-30, -62], [10, -90]], '#9A5A2E', '#C07A48', 1.5);
  }
  // poten: grijsbruin, dik; hiel (gewricht dat naar achter buigt) op ± 1/3 van de beenhoogte, spoor achter op de tarsus
  const pp = { kl: poot, dik: 9, teen: 30, spoor: 9, klauw: '#4A4038' };
  been([-12, -104], [-14, -46], [-8, -4], Object.assign({}, pp, { ver: true }), Math.PI);
  // lijf: borst blauw, onderbuik donker
  const LIJF = [[54, -180], [66, -160], [62, -136], [40, -114], [0, -102], [-40, -106], [-70, -120], [-86, -140], [-80, -164], [-50, -184], [-10, -194], [30, -190], [44, -188]];
  vul(ctx, LIJF, blauw, blauwL, 2);
  binnen(ctx, LIJF, () => { vul(ctx, [[60, -126], [20, -118], [-30, -120], [-90, -130], [-90, -90], [60, -90]], '#1E2E3A');
    // mantel: groen geschubd
    vul(ctx, [[40, -196], [-60, -196], [-90, -160], [-20, -150], [30, -170]], groen); ctx.strokeStyle = '#1E3A2A'; ctx.lineWidth = 1.4; for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const px = 30 - i * 13 - r * 6, py = -188 + r * 9; ctx.beginPath(); ctx.arc(px, py, 5, 0.2, 2.9); ctx.stroke(); } });
  // dijveren en voorste poot
  vul(ctx, [[8, -126], [-26, -124], [-28, -98], [-6, -92], [10, -104]], '#22323E');
  been([6, -100], [10, -50], [16, -4], pp, 0);
  // vleugel (gevouwen): schouderveren gebandeerd zwart-beige, armpennen zwart, handpennen kastanje
  if (!open) { const V = [[36, -176], [-4, -186], [-56, -170], [-88, -138], [-70, -118], [-30, -124], [10, -140], [30, -158]];
    vul(ctx, V, '#C4B490', '#DCCCA8', 1.5);
    binnen(ctx, V, () => { ctx.strokeStyle = '#2E261C'; ctx.lineWidth = 2.6; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(34 - i * 8, -190); ctx.quadraticCurveTo(26 - i * 8, -160, 14 - i * 8, -128); ctx.stroke(); }
      vul(ctx, [[-30, -150], [-96, -146], [-90, -110], [-36, -116]], '#1E1A18'); vul(ctx, [[-56, -136], [-100, -134], [-96, -110], [-60, -114]], '#9A5A2E'); }); }
  // hals: lang, licht S-vormig, metaalblauw met fijne veertjes
  const HS = [[44, -176], [54, -214], [62, -250], [72, -278], [84, -290]]; const Hn = _buis(HS, [16, 13, 10, 9, 9], [12, 10, 8, 7, 7]); vul(ctx, Hn, blauw, blauwL, 2);
  binnen(ctx, Hn, () => { ctx.fillStyle = _A(blauwD, 0.55); for (let i = 0; i < 26; i++) { const u = i / 26, p = [lerp(44, 84, u) + (i % 2 ? 4 : -3), lerp(-176, -268, u)]; ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, Math.PI); ctx.fill(); } });
  // kop (hoger op de langere hals)
  ctx.save(); ctx.translate(0, -22);
  const K = [[74, -270], [80, -282], [92, -284], [100, -276], [98, -266], [88, -260], [76, -260]]; vul(ctx, K, blauw, blauwL, 1.5);
  // kuif: ± 20 kale schachten met blauwgroene waaiertjes
  for (let i = 0; i < 9; i++) { const bx = 80 + i * 1.6, by = -282 - i * 0.3, an = -1.95 + i * 0.09, l = 30 + (i % 3) * 3; const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l; lijn(ctx, [[bx, by], [tx, ty]], '#3A4A6A', 1.3);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-5, -3, 0, -7); ctx.quadraticCurveTo(5, -3, 0, 2); ctx.fillStyle = i % 2 ? '#3E8AA0' : blauwL; ctx.fill(); ctx.restore(); }
  // gezicht: witte streep boven, witte halve maan onder het oog (kale huid)
  vul(ctx, [[82, -279], [92, -280], [97, -277], [90, -276]], '#EEEEE6'); vul(ctx, [[82, -268], [90, -265], [97, -268], [92, -270], [86, -270]], '#EEEEE6');
  dierOog(ctx, 90, -274, 2.8, '#2A1A10');
  vul(ctx, [[97, -276], [106, -273], [110, -270], [104, -268], [97, -268]], '#B0A288', '#D0C4A8', 1); circ(ctx, 101, -273, 0.9, '#5A4E40');
  ctx.restore();
  ctx.restore(); }

// PAUWIN: snavel–staart ± 95 cm, geen sleep; kruin roodbruin met kuif, wit gezicht met donkere oogstreep, onderhals metaalgroen,
// bovendelen bruin met lichte vlekjes, buik wit, korte donkerbruine staart, poten grijsbruin (geen spoor). Zelfde eenheid als pauw.
function pauwin(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const bruin = '#8A7660', bruinL = '#B4A48C', bruinD = '#6A5846', groen = '#4E8A62', wit = '#E8E2D4';
  const pp = { kl: '#8A7C6C', dik: 8, teen: 27, klauw: '#4A4038' }; const st = o.houding === 'lopen' ? (o.t || 0) * 3.2 : null;
  const been = (H, K, F, opt, fase) => { const sw = st == null ? 0 : Math.sin(st + fase) * 16, lift = st == null ? 0 : Math.max(0, Math.cos(st + fase)) * 11; _vPoot(ctx, H, [K[0] + sw * 0.5, K[1] - lift * 0.5], { soort: 'lucht' }, Object.assign({}, opt, { teen: 0 })); ctx.save(); ctx.translate(sw, -lift); _vPoot(ctx, [K[0] - sw * 0.5, K[1] + lift * 0.5 - 2], F, { soort: 'grond' }, opt); ctx.restore(); };
  been([-10, -92], [-12, -42], [-6, -4], Object.assign({}, pp, { ver: true }), Math.PI);
  _vStaart(ctx, [-66, -136], [-146, -104], 28, 32, { kl: bruinD, rand: bruinL, punt: 'rond' });
  const L = [[50, -158], [60, -140], [54, -118], [34, -100], [0, -90], [-34, -94], [-62, -108], [-76, -128], [-68, -150], [-40, -168], [-4, -176], [30, -172], [42, -168]];
  vul(ctx, L, bruin, bruinL, 2);
  binnen(ctx, L, () => { vul(ctx, [[66, -134], [20, -118], [-30, -112], [-80, -118], [-80, -60], [66, -60]], wit); vul(ctx, [[60, -150], [40, -132], [30, -108], [70, -100]], '#5E4E3E');
    ctx.fillStyle = _A('#E6DCC8', 0.7); for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(30 - (i % 8) * 12 - Math.floor(i / 8) * 5, -166 + Math.floor(i / 8) * 9, 1.8, 0, 6.283); ctx.fill(); } });
  vul(ctx, [[6, -112], [-24, -110], [-26, -88], [-6, -84], [8, -94]], _D(wit, 0.08));
  been([6, -90], [10, -46], [16, -4], pp, 0);
  _vVleugel(ctx, [30, -160], [-80, -120], 50, { kl: bruinD, rand: bruinL, zoom: '#C4B49A', dek: bruin, hand: '#5A4A3A' });
  const HS = [[40, -160], [52, -192], [62, -222], [72, -240], [80, -250]]; const Hn = _buis(HS, [15, 12, 9, 8, 8], [11, 9, 7, 6, 6]); vul(ctx, Hn, bruin, bruinL, 2);
  binnen(ctx, Hn, () => { vul(ctx, [[30, -150], [40, -200], [70, -215], [80, -150]], groen); ctx.fillStyle = _A('#2E5A3E', 0.6); for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(54 + (i % 2) * 6, -170 - i * 4, 2, 0, Math.PI); ctx.fill(); } });
  const K = [[70, -252], [76, -264], [88, -266], [96, -258], [94, -248], [84, -242], [72, -242]]; vul(ctx, K, '#8A6A4A', bruinL, 1.5);
  binnen(ctx, K, () => { vul(ctx, [[74, -256], [100, -258], [100, -238], [70, -238]], wit); lijn(ctx, [[76, -256], [94, -256]], '#4A3A2A', 2.4); });
  for (let i = 0; i < 7; i++) { const bx = 76 + i * 1.6, by = -264, an = -1.95 + i * 0.09, l = 24 + (i % 3) * 2; const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l; lijn(ctx, [[bx, by], [tx, ty]], '#5A4A38', 1.2);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-4, -3, 0, -6); ctx.quadraticCurveTo(4, -3, 0, 2); ctx.fillStyle = i % 2 ? '#7A6A48' : '#6A8A6A'; ctx.fill(); ctx.restore(); }
  dierOog(ctx, 86, -256, 2.6, '#2A1A10');
  vul(ctx, [[93, -258], [102, -255], [106, -252], [100, -250], [93, -250]], '#8A8070', '#B0A898', 1);
  ctx.restore(); }

// ===================================================================================
// BLAUWE REIGER (Ardea cinerea), naam vogel() blijft. 90–98 cm, staand met ingetrokken S-hals. Poten lang: onderste deel van het scheenbeen kaal,
// hiel op ± 1/6 van de hoogte, tarsus ± 15 cm, middelteen ± 11 cm; dolkvormige gele snavel ± 12 cm; zwarte oogstreep die uitloopt in een pluim,
// witte hals met zwarte streepjes op de voorkant, grijze rug, zwarte vlek op de vleugelboeg, zwarte handpennen, witte sierveren op de borst. Hoogte ± 420.
function _reigerRust(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const grijs = '#9CA4AE', grijsD = '#7A828C', grijsL = '#C4CAD2', geel = '#C8A44A', zw = '#1E2026', wit = '#ECEDEE';
  const st = o.houding === 'lopen' ? (o.t || 0) * 2.4 : null;
  const poot = (dx, ver) => { const fase = ver ? Math.PI : 0, sw = st == null ? 0 : Math.sin(st + fase) * 30, lift = st == null ? 0 : Math.max(0, Math.cos(st + fase)) * 26; ctx.save(); ctx.translate(sw * 0.4, 0); const k = ver ? _D(geel, 0.25) : geel; _streek(ctx, [[dx + 6, -232], [dx + 2, -170], [dx - 2, -112]], [16, 9, 7], ver ? _D('#8A8070', 0.2) : '#8A8070'); // scheenbeen: boven bevederd, onder kaal
    _streek(ctx, [[dx + 2, -176], [dx - 2, -112]], [8, 7], k); ctx.translate(sw * 0.6, -lift); _vPoot(ctx, [dx - 2 - sw * 0.6, -114 + lift], [dx + 6, -4], { soort: 'grond' }, { kl: k, dik: 7, teen: 48, ver, klauw: '#2A2620' }); ctx.restore(); };
  poot(-14, true);
  // lijf: schuin, rug grijs, borst met hangende sierveren
  const R = [[52, -262], [60, -240], [44, -222], [10, -214], [-40, -214], [-90, -226], [-128, -240], [-120, -262], [-80, -290], [-20, -302], [30, -294]];
  vul(ctx, R, grijs, grijsL, 2);
  binnen(ctx, R, () => { vul(ctx, [[60, -236], [10, -226], [-60, -222], [-130, -236], [-130, -200], [60, -200]], _L(grijs, 0.25)); });
  poot(14, false);
  // vleugel: grijs met zwarte vlek op de boeg en zwarte handpennen aan het eind
  const V = [[40, -270], [-10, -292], [-80, -284], [-150, -248], [-112, -232], [-40, -236], [20, -248]]; vul(ctx, V, grijsD, grijsL, 1.5);
  binnen(ctx, V, () => { vul(ctx, [[-90, -290], [-170, -250], [-120, -220], [-70, -240]], zw); ctx.strokeStyle = _A(grijsL, 0.7); ctx.lineWidth = 1.4; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(20 - i * 20, -284 + i * 3); ctx.lineTo(-10 - i * 20, -240 + i * 1); ctx.stroke(); } vul(ctx, [[40, -276], [10, -290], [6, -268], [34, -258]], zw); });
  // sierveren borst
  for (let i = 0; i < 6; i++) lijn(ctx, [[46 - i * 4, -246], [40 - i * 5, -214], [34 - i * 6, -196]], wit, 3);
  // hals (S, ingetrokken): wit, met zwarte streepjes op de voorkant
  const HS = [[44, -258], [68, -288], [66, -330], [72, -366], [92, -394], [110, -398]]; const Hn = _buis(HS, [16, 13, 10, 9, 10, 11], [16, 12, 9, 8, 8, 9]); vul(ctx, Hn, wit, '#FFFFFF', 1.5);
  binnen(ctx, Hn, () => { ctx.fillStyle = zw; for (let i = 0; i < 9; i++) { const u = 0.15 + i * 0.08, px = _prof([[0, 44], [0.2, 68], [0.4, 66], [0.6, 72], [0.8, 92], [1, 110]], u), py = _prof([[0, -258], [0.2, -288], [0.4, -330], [0.6, -366], [0.8, -394], [1, -398]], u); ctx.beginPath(); ctx.ellipse(px + 7, py, 2.2, 4.5, 0.3, 0, 6.283); ctx.fill(); } });
  // kop: wit gezicht, zwarte oogstreep met pluim naar achter
  const K = [[96, -404], [108, -412], [122, -410], [130, -400], [124, -390], [108, -388], [96, -392]]; vul(ctx, K, wit, '#FFFFFF', 1.5);
  vul(ctx, [[110, -406], [124, -404], [116, -398], [94, -396], [70, -390], [64, -394], [90, -402]], zw);
  // snavel: dolk, geel, ± 1,2 × koplengte
  vul(ctx, [[126, -404], [160, -398], [188, -392], [160, -390], [126, -392]], geel, _L(geel, 0.3), 1.2); lijn(ctx, [[128, -397], [184, -392]], _D(geel, 0.4), 1.2);
  dierOog(ctx, 118, -400, 3.4, '#D8B43A');
  ctx.restore(); }
function vogel(ctx, x, y, s = 1, o = {}) { if (o.houding === 'rust') return _reigerRust(ctx, x, y, s, o); const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  // Staand (naar referentie): lijf steil (± 60°), vleugelpunten en staart hangen achter-onder, hals gestrekt omhoog met een lichte S, kop met horizontale snavel.
  // Hoogte/lengte ± 2 (referentieplaat); hiel op ± 0,22 van de hoogte, onderkant lijf op ± 0,47.
  const grijs = '#9CA4AE', grijsD = '#7A828C', grijsL = '#C4CAD2', geel = '#C8A44A', zw = '#1E2026', wit = '#ECEDEE';
  const st = o.houding === 'lopen' ? (o.t || 0) * 2.4 : null;
  const poot = (dx, ver) => { const fase = ver ? Math.PI : 0, sw = st == null ? 0 : Math.sin(st + fase) * 30, lift = st == null ? 0 : Math.max(0, Math.cos(st + fase)) * 26; ctx.save(); ctx.translate(sw * 0.4, 0); const k = ver ? _D(geel, 0.25) : geel;
    _streek(ctx, [[dx + 4, -214], [dx + 2, -160], [dx - 2, -100]], [18, 9, 7], ver ? _D('#8A8070', 0.2) : '#8A8070'); _streek(ctx, [[dx + 2, -156], [dx - 2, -100]], [8, 7], k);
    ctx.translate(sw * 0.6, -lift); _vPoot(ctx, [dx - 2 - sw * 0.6, -102 + lift], [dx + 6, -4], { soort: 'grond' }, { kl: k, dik: 7, teen: 46, ver, klauw: '#2A2620' }); ctx.restore(); };
  poot(-8, true);
  const R = [[30, -300], [40, -270], [36, -236], [20, -212], [0, -204], [-24, -196], [-44, -172], [-52, -184], [-50, -220], [-38, -264], [-14, -298], [10, -314]];
  vul(ctx, R, grijs, grijsL, 2); binnen(ctx, R, () => { vul(ctx, [[60, -290], [20, -280], [0, -240], [-10, -190], [60, -190]], _L(grijs, 0.3)); });
  poot(10, false);
  const V = [[14, -304], [-12, -296], [-38, -258], [-52, -210], [-50, -164], [-36, -178], [-18, -214], [2, -256], [16, -284]]; vul(ctx, V, grijsD, grijsL, 1.5);
  binnen(ctx, V, () => { vul(ctx, [[-60, -214], [-20, -214], [-26, -150], [-70, -150]], zw); ctx.strokeStyle = _A(grijsL, 0.7); ctx.lineWidth = 1.4; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(8 - i * 7, -292 + i * 12); ctx.lineTo(-30 - i * 3, -240 + i * 12); ctx.stroke(); } vul(ctx, [[16, -306], [-4, -300], [-2, -280], [14, -276]], zw); });
  for (let i = 0; i < 6; i++) lijn(ctx, [[36 - i * 2, -292], [42 - i * 3, -256], [40 - i * 4, -232]], wit, 3); // sierveren op de borst
  const HS = [[20, -300], [36, -330], [34, -362], [42, -392], [58, -412], [76, -420]]; const Hn = _buis(HS, [15, 11, 9, 8, 9, 10], [15, 11, 8, 7, 8, 9]); vul(ctx, Hn, wit, '#FFFFFF', 1.5);
  binnen(ctx, Hn, () => { ctx.fillStyle = zw; for (let i = 0; i < 9; i++) { const u = 0.12 + i * 0.08, px = _prof([[0, 20], [0.2, 36], [0.4, 34], [0.6, 42], [0.8, 58], [1, 76]], u), py = _prof([[0, -300], [0.2, -330], [0.4, -362], [0.6, -392], [0.8, -412], [1, -420]], u); ctx.beginPath(); ctx.ellipse(px + 6, py, 2.2, 4.5, 0.2, 0, 6.283); ctx.fill(); } });
  const dx = -26, dy = -22, T = (P) => P.map(([a, b]) => [a + dx, b + dy]);
  vul(ctx, T([[96, -404], [108, -412], [122, -410], [130, -400], [124, -390], [108, -388], [96, -392]]), wit, '#FFFFFF', 1.5);
  vul(ctx, T([[110, -406], [124, -404], [116, -398], [94, -396], [70, -392], [62, -398], [90, -402]]), zw);
  vul(ctx, T([[126, -404], [160, -398], [188, -392], [160, -390], [126, -392]]), geel, _L(geel, 0.3), 1.2); lijn(ctx, T([[128, -397], [184, -392]]), _D(geel, 0.4), 1.2);
  dierOog(ctx, 118 + dx, -400 + dy, 3.4, '#D8B43A');
  ctx.restore(); }


// ===================================================================================
// BOERENZWALUW (Hirundo rustica) in de vlucht, bovenaanzicht schuin (zoals je hem overvliegend ziet). 17–19 cm met staartspiesen, spanwijdte 32–34 cm;
// lange smalle sikkelvleugels, diep gevorkte staart met lange buitenste pennen en witte vlekjes, bovenkant glanzend staalblauw, voorhoofd en keel roestrood.
// Eenheid 1 = 1 cm; anker = midden van het lijf; kop naar rechts.
function zwaluw(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1, t = 0 } = o; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const bl = '#34466E', blL = '#5A72A0', blD = '#26344F', rood = '#B4503A', creme = '#E8DCC8'; const sl = Math.sin(t * 9) * 0.12;
  // staart: diepe vork, buitenste pennen lang en dun
  vul(ctx, [[-4, -0.6], [-9, -1.2], [-12.5, -2.8], [-16, -4.4], [-12, -1.6], [-10.6, 0], [-12, 1.6], [-16, 4.4], [-12.5, 2.8], [-9, 1.2], [-4, 0.6]], blD, blL, 0.12);
  ctx.fillStyle = '#EEE8DA'; for (const k of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-8.4 - i * 0.9, k * (1 + i * 0.5), 0.4, 0.22, k * 0.4, 0, 6.283); ctx.fill(); }
  // vleugels: sikkelvorm, handpennen lang en spits naar achter
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(1.5, k * 0.6); ctx.rotate(k * sl);
    const V = [[0, 0], [1.6, k * 3], [1.2, k * 7], [-1.6, k * 12], [-5.5, k * 15.5], [-4.2, k * 12.5], [-3.4, k * 7.5], [-2.4, k * 3], [-2, k * 0.6]]; vul(ctx, V, bl, blL, 0.12);
    binnen(ctx, V, () => { vul(ctx, [[-1, k * 5], [1.6, k * 6], [-6, k * 16], [-5, k * 9]], blD); ctx.strokeStyle = _A(blL, 0.6); ctx.lineWidth = 0.1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(1 - i * 0.2, k * (4 + i * 1.3)); ctx.lineTo(-3.6 - i * 0.4, k * (5.5 + i * 1.7)); ctx.stroke(); } });
    ctx.restore(); }
  // lijf: spoelvorm, kop rond, snavel kort en breed
  const L = [[5, 0], [4.4, -1.2], [2, -1.4], [-2, -1.1], [-5, -0.6], [-6, 0], [-5, 0.6], [-2, 1.1], [2, 1.4], [4.4, 1.2]]; vul(ctx, L, bl, blL, 0.12);
  vul(ctx, [[4.2, -0.9], [5.6, -0.5], [6.2, 0], [5.6, 0.5], [4.2, 0.9]], rood); vul(ctx, [[6.1, -0.2], [6.8, 0], [6.1, 0.2]], '#1A1A1E');
  _oogK(ctx, 4.9, -0.75, 0.32, '#0A0A0A', { pupil: 'vol' }); _oogK(ctx, 4.9, 0.75, 0.32, '#0A0A0A', { pupil: 'vol' });
  ctx.restore(); }

// ===================================================================================
// ZWEMMERS: haai, dolfijn, ichthyosaurus — gebouwd op een ruggengraat met een dikteprofiel (_zwemLijf), zodat een golf door het lijf kan lopen.
// o.houding: 'zwemmen' (standaard; golf via o.t) of 'recht' (stil). Echte zwemslag: haai en ichthyosaurus slaan ZIJWAARTS (verticale staartvin) →
// van opzij zie je vooral de staartvin smaller en breder worden; de dolfijn slaat OP EN NEER (horizontale staartvin) → van opzij zie je de golf.
// Anker = midden van het lijf; kop naar rechts; lengte ± 500 eenheden.
function _zwemLijf(x0, x1, top, bot, golf) { // x0 = snuit (rechts), x1 = staartwortel (links); top/bot = profielen op u 0..1; golf(u) = verticale verschuiving
  const N = 28, P = [], T = [], B = []; for (let i = 0; i <= N; i++) { const u = i / N; P.push([lerp(x0, x1, u), golf(u)]); T.push(_prof(top, u)); B.push(_prof(bot, u)); }
  const seg = (u) => { const i = Math.max(0, Math.min(N - 1, Math.floor(u * N))); return [i, u * N - i]; };
  const hoek = (u) => { const [i] = seg(u); return Math.atan2(P[i][1] - P[i + 1][1], P[i][0] - P[i + 1][0]); }; // richting naar de snuit
  const pt = (u, v = 0) => { const [i, f] = seg(u), a = P[i], b = P[i + 1]; const px = lerp(a[0], b[0], f), py = lerp(a[1], b[1], f), an = hoek(u); return [px + Math.sin(an) * v, py - Math.cos(an) * v]; }; // v > 0 = rugzijde
  return { O: _buis(P, T, B), P, pt, hoek }; }
// vin vastgezet op het lijf: punten in een lokaal stelsel (x langs het lijf naar achter = negatief), gedraaid met de lijfhoek op u
function _vin(ctx, Z, u, v, pts, fill, rand = null, rot = 0) { const [px, py] = Z.pt(u, v), an = Z.hoek(u) + rot; ctx.save(); ctx.translate(px, py); ctx.rotate(an); vul(ctx, pts, fill, rand, 1.6); ctx.restore(); return [px, py, an]; }

// GRIJZE RIFHAAI (Carcharhinus amblyrhynchos): ± 1,9 m (max 2,6 m), gestroomlijnd, lange stompe snuit, groot rond oog, onderstandige bek;
// vijf kieuwspleten, de laatste boven de borstvin; borstvinnen smal en sikkelvormig; eerste rugvin begint boven het vrije einde van de borstvin;
// kleine tweede rugvin boven de aarsvin; heterocerke staartvin (bovenlob ± 1/4 van de lengte, met inkeping), hele achterrand van de staartvin zwart;
// grijs boven, wit onder. o.rontgen = kraakbeenskelet (geen botten). Oude anker en borstvinplek (110, 24) blijven.
function haai(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', fase = houding === 'recht' ? 0 : t * 3.2; const zw = houding === 'recht' ? 0 : 1;
  const rug = '#6E7A86', rugD = '#56616C', buik = '#DCE0E4', rand = '#96A2AE', zwart = '#1E242A';
  const golf = (u) => zw * Math.sin(fase - u * 4) * 3 * u * u; // zijwaartse slag: van opzij hooguit een klein deinen
  const top = [[0, 3], [0.04, 14], [0.12, 33], [0.3, 50], [0.5, 42], [0.7, 26], [0.88, 13], [1, 10]], ond = [[0, 5], [0.05, 16], [0.15, 34], [0.32, 41], [0.5, 34], [0.7, 20], [0.88, 10], [1, 9]];
  const Z = _zwemLijf(252, -206, top, ond, golf); const r = 1 - rontgen * 0.75;
  const swing = Math.cos(fase - 4); // staartvin draait zijwaarts: lijkt smaller
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin (heterocerk): grote bovenlob met inkeping bij de punt, kleinere onderlob; zwarte achterrand
  const [tx, ty, ta] = Z.pt(1, 0).concat([Z.hoek(1)]); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta); ctx.scale(0.72 + 0.28 * Math.abs(swing * zw + (1 - zw)), 1);
  const SV = [[6, -9], [-24, -30], [-62, -74], [-96, -112], [-104, -112], [-96, -94], [-84, -84], [-76, -50], [-62, -12], [-66, 8], [-82, 34], [-92, 52], [-70, 46], [-30, 18], [6, 9]];
  vul(ctx, SV, rug, rand, 2); binnen(ctx, SV, () => { lijn(ctx, [[-104, -112], [-96, -94], [-84, -84], [-76, -50], [-62, -12], [-66, 8], [-82, 34], [-92, 52]], zwart, 7); }); ctx.restore();
  // rugvinnen, buikvinnen, aarsvin (vast op het lijf)
  _vin(ctx, Z, 0.36, 44, [[14, 4], [-6, -40], [-22, -70], [-30, -72], [-40, -40], [-50, 0]], rug, rand);
  _vin(ctx, Z, 0.74, 22, [[4, 2], [-6, -18], [-12, -20], [-16, -4], [-26, 0]], rugD, rand); _vin(ctx, Z, 0.74, 22, [[-6, -18], [-12, -20], [-14, -12]], zwart);
  _vin(ctx, Z, 0.6, -30, [[6, -2], [-8, 18], [-20, 22], [-24, 6], [-30, -2]], rugD); _vin(ctx, Z, 0.76, -18, [[4, -2], [-6, 16], [-12, 18], [-16, 2], [-22, -2]], rugD);
  // lijf met tegenschaduw
  vul(ctx, Z.O, rug, rand, 2);
  binnen(ctx, Z.O, () => { const L = []; for (let i = 0; i <= 20; i++) { const u = i / 20; L.push(Z.pt(u, -_prof(ond, u) * (u < 0.1 ? 0.2 : 0.1) + (u < 0.15 ? 2 : 6))); } L.push([-260, 80], [300, 80]); vul(ctx, L, buik);
    // kieuwspleten: vijf licht gebogen lijnen boven de borstvin
    ctx.strokeStyle = _D(rug, 0.32); ctx.lineWidth = 2.4; for (let i = 0; i < 5; i++) { const u = 0.15 + i * 0.022; const p1 = Z.pt(u, 20 - i), p2 = Z.pt(u + 0.006, -10 - i * 2); ctx.beginPath(); ctx.moveTo(...p1); ctx.quadraticCurveTo(p1[0] - 5, (p1[1] + p2[1]) / 2, p2[0], p2[1]); ctx.stroke(); } });
  // bek (onderstandig), neusgat, oog
  const m0 = Z.pt(0.07, -10), m1 = Z.pt(0.115, -18); ctx.strokeStyle = '#2A3038'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(...m0); ctx.quadraticCurveTo(m0[0] - 8, m0[1] + 6, m1[0], m1[1]); ctx.stroke();
  circ(ctx, ...Z.pt(0.03, -4), 1.8, '#3A4048'); const oe = Z.pt(0.085, 6); dierOog(ctx, oe[0], oe[1], 5.2, '#2A3036');
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, Z.O, null, _A(C.line, 0.9), 2);
    lijn(ctx, Z.P.slice(3).map(p => [p[0], p[1] - 4]), '#B8C8C0', 4); ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const u = 0.12 + i * 0.033, p = Z.pt(u, 4); ctx.beginPath(); ctx.moveTo(p[0], p[1] - 6); ctx.lineTo(p[0], p[1] + 6); ctx.stroke(); }
    ctx.restore(); }
  // borstvin: sikkelvormig, vast laag achter de kieuwen
  ctx.save(); ctx.translate(110, 24 + golf(0.24));
  vul(ctx, [[12, -6], [-10, 22], [-44, 60], [-70, 80], [-78, 78], [-58, 46], [-32, 6]], rontgen > 0.01 ? _A('#6E7A86', 0.25) : rugD, rontgen > 0.01 ? C.line : rand, 2);
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 2.5; for (let i = 0; i < 9; i++) { const f = i / 8; ctx.beginPath(); ctx.moveTo(-6 - f * 20, 4 + f * 4); ctx.lineTo(-30 - f * 36, 36 + f * 32); ctx.stroke(); } bot(ctx, 4, -6, -26, 4, 7, '#B8C8C0'); ctx.restore(); }
  ctx.restore();
  ctx.restore(); }

// TUIMELAAR (Tursiops truncatus): 2,5–3 m. Korte snuit (rostrum) en ronde meloen met een duidelijke knik, blaasgat boven op de kop, oog vlak achter
// en boven de mondhoek; sikkelvormige rugvin halverwege; korte borstvinnen vlak achter de kop; staartwortel hoog en zijdelings plat; staartvin HORIZONTAAL.
// Donkergrijze mantel, lichtere flank, bleke buik. o.rontgen = armbotten in vaste kleuren (borstvin op (120, 30) bij t = 0).
function dolfijn(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', zw = houding === 'recht' || rontgen > 0.01 ? 0 : 1, fase = t * 2.6;
  const mantel = '#4E5C6A', flank = '#76848F', buik = '#D0D6DC', rand = '#9AA6B2';
  const golf = (u) => zw * Math.sin(fase - u * 3.2) * 46 * Math.max(0, u - 0.3) ** 1.5; // op-en-neer slag, vooral achter de rugvin
  const top = [[0, 5], [0.055, 8], [0.08, 30], [0.13, 48], [0.22, 56], [0.4, 60], [0.6, 46], [0.78, 24], [0.92, 13], [1, 9]], ond = [[0, 6], [0.05, 9], [0.1, 22], [0.22, 42], [0.4, 52], [0.6, 38], [0.78, 17], [0.92, 9], [1, 7]];
  const Z = _zwemLijf(250, -222, top, ond, golf); const r = 1 - rontgen * 0.75;
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin: horizontaal, van opzij een smalle wig die met de slag op en neer kantelt
  const [tx, ty] = Z.pt(1, 0), ta = Z.hoek(1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta + zw * Math.cos(fase - 3.2) * 0.35);
  vul(ctx, [[6, -7], [-30, -10], [-62, -18], [-78, -12], [-64, 0], [-78, 12], [-62, 18], [-30, 10], [6, 7]], mantel, rand, 2); ctx.restore();
  _vin(ctx, Z, 0.5, 56, [[26, 4], [6, -30], [-16, -62], [-32, -72], [-28, -54], [-34, -20], [-46, 2]], mantel, rand);
  vul(ctx, Z.O, flank, rand, 2);
  binnen(ctx, Z.O, () => { const T = [], B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; T.push(Z.pt(u, _prof(top, u) * 0.35 - 4)); B.push(Z.pt(u, -_prof(ond, u) * 0.3)); }
    vul(ctx, T.concat([[-300, -120], [320, -120]]), mantel); vul(ctx, B.concat([[-300, 120], [320, 120]]), buik); });
  // mondlijn, oog, blaasgat
  const m = [Z.pt(0, 0), Z.pt(0.06, -1), Z.pt(0.1, 3)]; lijn(ctx, m, '#2A3038', 2); dierOog(ctx, ...Z.pt(0.125, 6), 4.6, '#1E2226');
  const bg = Z.pt(0.17, _prof(top, 0.17) - 2); ctx.beginPath(); ctx.ellipse(bg[0], bg[1], 4, 1.6, 0, 0, 6.283); ctx.fillStyle = '#2A3038'; ctx.fill();
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, Z.O, null, _A(C.line, 0.9), 2); ctx.restore(); }
  const FL = [[14, -6], [-6, 18], [-40, 48], [-58, 54], [-50, 34], [-22, 4]];
  ctx.save(); ctx.translate(120, 30 + golf(0.24)); ctx.globalAlpha *= (rontgen > 0.01 ? 0.4 : 1); vul(ctx, FL, _D(mantel, 0.05), rand, 1.6); ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(120, 30); vul(ctx, FL, null, C.line, 2);
    bot(ctx, 8, -6, -4, 8, 11, BOT.arm); bot(ctx, -6, 10, -18, 24, 8, BOT.onder); bot(ctx, -2, 14, -14, 28, 8, BOT.onder);
    for (let d = 0; d < 4; d++) { let px = -18 + d * 3, py = 28 + d * 2; for (let k = 0; k < [3, 5, 4, 2][d]; k++) { const nx = px - 7, ny = py + 6; bot(ctx, px, py, nx, ny, 4, BOT.hand, { kop: 1.05 }); px = nx; py = ny; } } ctx.restore(); }
  ctx.restore(); }

// ICHTHYOSAURUS (Stenopterygius, Jura): ± 3–3,5 m. Lange smalle snuit met veel tanden, zeer groot oog met benen scleraalring, diepe spoelvorm,
// driehoekige rugvin, maanvormige VERTICALE staartvin waarbij de wervelkolom naar de onderlob buigt; voorvinnen groter dan achtervinnen (smal);
// fossiel met huid toont tegenschaduw (donkere rug, lichte buik).
function ichthyosaurus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', zw = houding === 'recht' ? 0 : 1, fase = t * 3;
  const rug = '#56604C', rugD = '#454E3C', buik = '#CCC8B0', rand = '#8A9478';
  const golf = (u) => zw * Math.sin(fase - u * 4) * 3 * u * u;
  const top = [[0, 2], [0.14, 5], [0.2, 18], [0.27, 36], [0.42, 56], [0.6, 42], [0.8, 18], [0.94, 9], [1, 8]], ond = [[0, 2], [0.14, 5], [0.2, 16], [0.27, 32], [0.42, 50], [0.6, 34], [0.8, 14], [0.94, 8], [1, 7]];
  const Z = _zwemLijf(300, -196, top, ond, golf); const swing = zw ? Math.abs(Math.cos(fase - 4)) : 1;
  // staartvin: maanvormig, wervelkolom loopt in de onderlob
  const [tx, ty] = Z.pt(1, 0), ta = Z.hoek(1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta); ctx.scale(0.7 + 0.3 * swing, 1);
  const SV = [[6, -7], [-30, -26], [-62, -64], [-80, -78], [-72, -46], [-58, -6], [-60, 10], [-78, 54], [-84, 82], [-62, 64], [-30, 24], [6, 7]]; vul(ctx, SV, rug, rand, 2);
  lijn(ctx, [[0, 0], [-34, 18], [-66, 52]], _A(rugD, 0.8), 3); ctx.restore();
  _vin(ctx, Z, 0.46, 44, [[16, 4], [-2, -36], [-14, -52], [-24, -48], [-36, 2]], rug, rand);
  _vin(ctx, Z, 0.66, -26, [[6, -2], [-10, 18], [-28, 30], [-34, 26], [-22, 6], [-12, -2]], rugD);
  vul(ctx, Z.O, rug, rand, 2);
  binnen(ctx, Z.O, () => { const B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; B.push(Z.pt(u, -_prof(ond, u) * 0.15 + 3)); } vul(ctx, B.concat([[-300, 120], [340, 120]]), buik);
    ctx.fillStyle = _A('#8A9478', 0.35); for (let i = 0; i < 30; i++) { const p = Z.pt(0.25 + hash(i * 3.1) * 0.6, 10 + hash(i * 5.7) * 26); ctx.beginPath(); ctx.arc(p[0], p[1], 1.6, 0, 6.283); ctx.fill(); } });
  // bek met tanden, groot oog met scleraalring
  const m0 = Z.pt(0, 0), m1 = Z.pt(0.2, -2); lijn(ctx, [m0, m1], '#24281E', 2); ctx.fillStyle = '#E8E2CC'; for (let i = 0; i < 12; i++) { const p = Z.pt(0.01 + i * 0.015, 0); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - 2, p[1] + (i % 2 ? 4 : -4)); ctx.lineTo(p[0] - 4, p[1]); ctx.fill(); }
  const oe = Z.pt(0.24, 10); circ(ctx, oe[0], oe[1], 17, _D(rug, 0.2), '#B8B49A', 3); ctx.strokeStyle = '#8A8670'; ctx.lineWidth = 1.2; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283; ctx.beginPath(); ctx.moveTo(oe[0] + Math.cos(an) * 11, oe[1] + Math.sin(an) * 11); ctx.lineTo(oe[0] + Math.cos(an) * 16, oe[1] + Math.sin(an) * 16); ctx.stroke(); }
  dierOog(ctx, oe[0], oe[1], 9, '#4A3A1A');
  // voorvin: groot, smal, sikkelvormig
  _vin(ctx, Z, 0.32, -34, [[8, -2], [-12, 24], [-36, 52], [-50, 62], [-50, 52], [-30, 18], [-16, -2]], rugD, rand);
  ctx.restore(); }

// ===================================================================================
// NIJLKROKODIL (Crocodylus niloticus): ± 4 m, staart ± 45 % van de lengte. Lange platte snuit (V-vormig, smaller dan bij een alligator), neusgaten
// op een knobbel aan de punt, ogen op knobbels bovenop de kop; tanden in een rij, de 4e ondertand steekt buiten de bovenkaak uit (echte krokodil);
// rug met rijen benen schubben (osteodermen), op de staart overgaand in een dubbele en dan enkele kam; poten opzij: 'liggen' (buik op de grond,
// ellebogen omhoog) of 'lopen' (high walk: poten onder het lijf, buik vrij); 5 vingers voor, 4 tenen achter met zwemvliezen. Iris geelgroen, spleetpupil.
// Anker = midden onder het dier op de grond; lengte ± 670.
function _spleetOog(ctx, x, y, r, iris) { circ(ctx, x, y, r * 1.25, '#4A5232'); circ(ctx, x, y, r, iris); ctx.fillStyle = '#07090C'; ctx.beginPath(); ctx.ellipse(x, y, r * 0.2, r * 0.85, 0, 0, 6.283); ctx.fill(); circ(ctx, x + r * 0.35, y - r * 0.35, Math.max(1, r * 0.16), 'rgba(255,255,255,0.75)'); }
function _reptielPoot(ctx, S, K, V, tenen, wd, kl, klD) { // S = schouder/heup, K = elleboog/knie, V = pols/enkel; tenen = lijst eindpunten
  _streek(ctx, [S, K], [wd, wd * 0.72], kl); _streek(ctx, [K, V], [wd * 0.72, wd * 0.52], kl); circ(ctx, K[0], K[1], wd * 0.36, kl);
  for (const T of tenen) { _streek(ctx, [V, [lerp(V[0], T[0], 0.55), lerp(V[1], T[1], 0.55) - 1], T], [wd * 0.24, wd * 0.18, wd * 0.1], klD); circ(ctx, T[0], T[1], wd * 0.06, '#2A2A1E'); } }
function krokodil(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const houding = o.houding || 'lopen', lig = houding === 'liggen';
  const huid = '#5E6A3E', huidD = '#46502E', buik = '#C8C08E', rand = '#7E8A5A', band = '#3A4226';
  const h = lig ? 40 : 96; const golf = (u) => -h + (lig ? 0 : -4) * Math.sin(u * 3) + Math.sin(t * 2 - u * 5) * 4 * u;
  const top = [[0, 7], [0.03, 13], [0.05, 11], [0.12, 16], [0.155, 27], [0.17, 25], [0.2, 32], [0.28, 46], [0.4, 50], [0.5, 44], [0.62, 30], [0.8, 17], [1, 3]];
  const ond = [[0, 5], [0.06, 8], [0.14, 13], [0.2, 22], [0.3, 38], [0.42, 40], [0.52, 28], [0.7, 13], [1, 1]];
  const Z = _zwemLijf(340, -330, top, ond, golf);
  const poot = (u, voor, ver) => { const kl = ver ? huidD : huid, klD = ver ? _D(huidD, 0.15) : huidD; const [px, py] = Z.pt(u, -_prof(ond, u) * 0.4); const wd = voor ? 26 : 38;
    if (lig) _reptielPoot(ctx, [px, py], [px - (voor ? -6 : 24), py - 10], [px + (voor ? 18 : -2), -4], [[px + 26, 0], [px + 34, 0], [px + 40, -1], [px + 30, 1]].map(([a, b]) => [a + (voor ? 4 : -14), b]), wd, kl, klD);
    else _reptielPoot(ctx, [px, py], [px + (voor ? -12 : 20), py + 36], [px + (voor ? 2 : -4), -6], (voor ? [[22, 0], [30, 0], [34, -1], [26, 1], [16, 1]] : [[26, 0], [36, 0], [40, -1], [30, 1]]).map(([a, b]) => [px + a + (voor ? 0 : -4), b]), wd, kl, klD); };
  poot(0.25, true, true); poot(0.46, false, true);
  vul(ctx, Z.O, huid, rand, 2);
  binnen(ctx, Z.O, () => { const B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; B.push(Z.pt(u, -_prof(ond, u) * 0.45)); } vul(ctx, B.concat([[-400, 200], [400, 200]]), buik);
    ctx.strokeStyle = _A('#8A845A', 0.6); ctx.lineWidth = 1.2; for (let i = 0; i < 34; i++) { const u = 0.17 + i * 0.024, p = Z.pt(u, -_prof(ond, u) * 0.45), q = Z.pt(u, -_prof(ond, u)); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke(); } // buikschubben
    for (let i = 0; i < 7; i++) { const u = 0.6 + i * 0.058; const p1 = Z.pt(u, 30), p2 = Z.pt(u + 0.02, -20); vul(ctx, [p1, Z.pt(u + 0.03, 30), Z.pt(u + 0.045, -20), p2], _A(band, 0.75)); } // staartbanden
    ctx.fillStyle = _A(huidD, 0.85); for (let r = 0; r < 3; r++) for (let i = 0; i < 26; i++) { const u = 0.2 + i * 0.016; const p = Z.pt(u, _prof(top, u) - 6 - r * 8); roundRect(ctx, p[0] - 4, p[1] - 2.5, 8, 5, 2); ctx.fill(); } });
  // kam van osteodermen langs de rug; op de staart een dubbele kam die overgaat in een enkele
  ctx.fillStyle = huidD; for (let i = 0; i < 46; i++) { const u = 0.19 + i * 0.0175; const hh = u < 0.55 ? 5 : 9 * (1 - (u - 0.55) / 0.5) + 2; const p = Z.pt(u, _prof(top, u) - 1), q = Z.pt(u - 0.008, _prof(top, u) + hh), r = Z.pt(u - 0.016, _prof(top, u - 0.016) - 1); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.lineTo(...r); ctx.closePath(); ctx.fill(); }
  // bek: golvende kaaklijn, tanden in elkaar grijpend, 4e ondertand zichtbaar
  const K = []; for (let i = 0; i <= 10; i++) { const u = i * 0.017; K.push(Z.pt(u, -2 + Math.sin(i * 1.3) * 1.5)); } lijn(ctx, K, '#2A3018', 2.2);
  ctx.fillStyle = '#ECE6D0'; for (let i = 0; i < 12; i++) { const u = 0.008 + i * 0.013, p = Z.pt(u, -2); const omh = i % 2 === 0; ctx.beginPath(); ctx.moveTo(p[0] - 2.5, p[1]); ctx.lineTo(p[0], p[1] + (omh ? -6 : 6)); ctx.lineTo(p[0] + 2.5, p[1]); ctx.fill(); }
  { const p = Z.pt(0.06, -1); ctx.beginPath(); ctx.moveTo(p[0] - 3, p[1] + 2); ctx.lineTo(p[0], p[1] - 9); ctx.lineTo(p[0] + 3, p[1] + 2); ctx.fill(); }
  circ(ctx, ...Z.pt(0.02, 9), 2.4, '#2A3018'); // neusgat op de knobbel
  const oe = Z.pt(0.158, 16); vul(ctx, [Z.pt(0.14, 12), Z.pt(0.152, 22), Z.pt(0.168, 21), Z.pt(0.178, 14)], huid, rand, 1.4); _spleetOog(ctx, oe[0], oe[1] + 2, 5.2, '#B8B03A');
  poot(0.25, true, false); poot(0.46, false, false);
  ctx.restore(); }

// ZANDHAGEDIS (Lacerta agilis): ± 20 cm, staart ± 60 %. Stevige kop met korte snuit, oorgat achter het oog, poten opzij met vijf lange dunne tenen
// (achterpoot: 4e teen het langst); man in de paartijd met groene flanken, bruine rugband met donkere vlekken met witte kern (oogvlekjes), lichte buik.
// o.houding: 'lopen' (lijf iets geheven, diagonale poten naar voren/achter) of 'liggen' (zonnen: buik plat, poten gespreid). Lengte ± 500.
function hagedis(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const houding = o.houding || 'lopen', lig = houding === 'liggen';
  const flank = '#7E9C4A', flankL = '#A2BE6A', rug = '#8C6E46', vlek = '#3E2E1E', buik = '#D4D09A', d = '#5A6E34';
  const h = lig ? 18 : 50; const golf = (u) => -h - (u > 0.4 ? -(u - 0.4) * 14 : 0);
  const top = [[0, 6], [0.03, 16], [0.08, 25], [0.11, 21], [0.16, 28], [0.3, 32], [0.4, 24], [0.55, 12], [1, 1]], ond = [[0, 6], [0.06, 15], [0.11, 19], [0.2, 24], [0.32, 24], [0.4, 16], [0.6, 7], [1, 0.8]];
  const Z = _zwemLijf(180, -320, top, ond, golf); const st = Math.sin(t * 6);
  const poot = (u, voor, ver, fase) => { const kl = ver ? _D(flank, 0.25) : flank, klD = ver ? _D(d, 0.2) : d; const [px, py] = Z.pt(u, -_prof(ond, u) * 0.3); const sw = lig ? 0 : fase * 10;
    const T = (voor ? [[10, 0], [14, -1], [16, -2], [12, 1], [5, 1]] : [[14, 0], [20, -1], [28, -2], [22, 1], [6, 2]]).map(([a, b]) => [px + sw + a + (voor ? 6 : 0), b]);
    _reptielPoot(ctx, [px, py], [px + sw * 0.5 + (voor ? -16 : 22), lig ? py - 8 : py + 16], [px + sw + (voor ? 10 : 6), -2], T.map(([a, b]) => [px + (a - px) * 1.8, b]), voor ? 18 : 22, kl, klD); if (!lig) circ(ctx, px + sw * 0.5 + (voor ? -16 : 22), py + 16, (voor ? 18 : 22) * 0.42, _D(kl, 0.12)); /* elleboog/knie steekt opzij uit */ };
  poot(0.15, true, true, -st); poot(0.37, false, true, st);
  vul(ctx, Z.O, flank, flankL, 1.6);
  binnen(ctx, Z.O, () => { const B = [], R = [], R2 = []; for (let i = 0; i <= 30; i++) { const u = i / 30; B.push(Z.pt(u, -_prof(ond, u) * 0.4)); R.push(Z.pt(u, _prof(top, u) * 0.25)); }
    vul(ctx, B.concat([[-400, 100], [300, 100]]), buik); vul(ctx, R.concat([[-400, -100], [300, -100]]), rug);
    for (let i = 0; i < 16; i++) { const u = 0.13 + i * 0.03, p = Z.pt(u, _prof(top, u) * (i % 2 ? 0.6 : 0.85)); circ(ctx, p[0], p[1], 4, vlek); circ(ctx, p[0], p[1], 1.4, '#EDE6CF'); }
    ctx.strokeStyle = _A('#2E3A1E', 0.35); ctx.lineWidth = 0.8; for (let i = 0; i < 40; i++) { const u = 0.4 + i * 0.015, p = Z.pt(u, 8), q = Z.pt(u, -8); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke(); } }); // staartringen
  lijn(ctx, [Z.pt(0, -1), Z.pt(0.04, -2), Z.pt(0.065, -1)], '#2A2418', 1.4); const oe = Z.pt(0.05, 4); dierOog(ctx, oe[0], oe[1], 3.8, '#6A4A1A', { rand: '#E0D8A0' });
  const oor = Z.pt(0.095, 2); ctx.beginPath(); ctx.ellipse(oor[0], oor[1], 1.8, 2.6, 0, 0, 6.283); ctx.fillStyle = _D(flank, 0.35); ctx.fill();
  poot(0.15, true, false, st); poot(0.37, false, false, -st);
  ctx.restore(); }

// ===================================================================================
// PLANTEN
// BLAD (loofblad, haagbeuk/beuk-achtig): eirond met toegespitste top, fijn gezaagde rand (tandjes wijzen naar de top), middennerf en 7–8 paar
// zijnerven die gebogen naar de rand lopen; bovenhelft iets donkerder dan de onderhelft (vouw langs de middennerf). Blad loopt van 0 tot 2·w langs x.
// o.steel = lengte bladsteel (standaard 0,3·w naar achter; takMetBladeren tekent de steel zelf vanaf de tak). Aanroep blijft blad(ctx, x, y, w, o).
function _bladOmtrek(w) { const P = [], n = 40, hw = (u) => w * 0.43 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 0.85) * (1 - 0.25 * Math.pow(u, 5));
  const tand = (u) => 1 + 0.06 * (((u * 22) % 1) < 0.7 ? ((u * 22) % 1) / 0.7 : (1 - ((u * 22) % 1)) / 0.3) * (u > 0.08 && u < 0.95 ? 1 : 0);
  for (let i = 0; i <= n; i++) { const u = i / n; P.push([u * 2 * w, -hw(u) * tand(u)]); } for (let i = n; i >= 0; i--) { const u = i / n; P.push([u * 2 * w, hw(u) * tand(u + 0.02)]); } return { P, hw }; }
function blad(ctx, x, y, w, o = {}) { const { a = 1, rot = 0, kleur = '#5FA86E', steel = 0.3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const { P, hw } = _bladOmtrek(w); const d = _D(kleur, 0.18), l = _L(kleur, 0.1);
  if (steel > 0) _streek(ctx, [[-w * steel, w * 0.02], [-w * steel * 0.4, 0], [w * 0.04, 0]], [w * 0.035, w * 0.04, w * 0.05], d);
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = l; ctx.fillRect(0, 0, w * 2.2, w); ctx.restore();
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.strokeStyle = _L(kleur, 0.25); ctx.lineWidth = Math.max(1.2, w * 0.012); ctx.stroke();
  // nerven: middennerf dunner naar de top, zijnerven gebogen naar voren, eindigen net binnen de rand
  ctx.strokeStyle = _L(kleur, 0.3); ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1.4, w * 0.018); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(w, -w * 0.02, w * 1.96, 0); ctx.stroke();
  ctx.lineWidth = Math.max(1, w * 0.008); for (let k = 1; k <= 8; k++) { const u = k / 9.5; const h = hw(Math.min(1, u + 0.08)) * 0.88; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(u * 2 * w, 0); ctx.quadraticCurveTo(u * 2 * w + w * 0.1, sg * h * 0.55, u * 2 * w + w * 0.26, sg * h); ctx.stroke(); } }
  ctx.restore(); }

// TAK MET BLADEREN: pad P, bladen = [[u langs de tak, w, hoek, kleur?]]. De tak loopt taps toe naar de punt, met knopjes en lenticellen;
// elk blad zit met een bladsteel vast op een knoop van de tak en wijst schuin naar de takpunt (30–70° met de tak, kant zoals gevraagd).
// Geeft per blad {x, y, w, hoek} terug = begin van de bladschijf en de echte hoek (rupsOpBlad en focusringen gebruiken dat).
function takMetBladeren(ctx, P, bladen, o = {}) { const { a = 1, dikte = 10, kleur = '#5FA86E' } = o; ctx.save(); ctx.globalAlpha *= a;
  const bast = '#5A4636', bastL = '#7A624E', n = P.length;
  const W8 = P.map((_, i) => dikte * (1.15 - 0.7 * i / (n - 1))); _streek(ctx, P, W8, bast);
  lijn(ctx, P.map((p, i) => [p[0], p[1] - W8[i] * 0.28]), _A(bastL, 0.8), Math.max(1.5, dikte * 0.14)); // licht op de bovenkant
  const op = (u) => { const i = Math.min(n - 2, Math.floor(u * (n - 1))), f = u * (n - 1) - i; return { p: [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)], r: Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]), d: lerp(W8[i], W8[i + 1], f) }; };
  ctx.fillStyle = _A('#C8B496', 0.6); for (let i = 0; i < 14; i++) { const { p, d } = op(0.04 + i * 0.07); ctx.beginPath(); ctx.ellipse(p[0], p[1] + d * 0.1, d * 0.12, d * 0.05, 0, 0, 6.283); ctx.fill(); } // lenticellen
  { const e = P[n - 1], { r } = op(0.999); ctx.save(); ctx.translate(...e); ctx.rotate(r); vul(ctx, [[-2, -3], [10, -2], [16, 0], [10, 2], [-2, 3]], '#7A5A3E'); ctx.restore(); } // eindknop
  const pos = [];
  for (const [u, w, hoek, kl] of bladen) { const { p, r, d } = op(u); let diff = Math.atan2(Math.sin(hoek - r), Math.cos(hoek - r)); const k = diff < 0 ? -1 : 1; const m = Math.min(1.2, Math.max(0.55, Math.abs(diff)));
    const sa = r + k * m * 0.75, ba = r + k * m; const sl = w * 0.28; // steel iets scherper dan de bladschijf
    const b0 = [p[0] + Math.cos(sa) * sl, p[1] + Math.sin(sa) * sl]; const mid = [p[0] + Math.cos(sa) * sl * 0.55 + Math.cos(ba) * sl * 0.05, p[1] + Math.sin(sa) * sl * 0.55 + Math.sin(ba) * sl * 0.05];
    circ(ctx, p[0], p[1], d * 0.62, bast); // knoop
    _streek(ctx, [[p[0] + Math.cos(sa) * d * 0.2, p[1] + Math.sin(sa) * d * 0.2], mid, b0], [w * 0.06, w * 0.045, w * 0.042], _D(kl || kleur, 0.22));
    blad(ctx, b0[0], b0[1], w, { rot: ba, kleur: kl || kleur, steel: 0 }); pos.push({ x: b0[0], y: b0[1], w, hoek: ba });
    { const kn = [p[0] + Math.cos(r + k * 0.4) * d * 0.7, p[1] + Math.sin(r + k * 0.4) * d * 0.7]; circ(ctx, kn[0], kn[1], d * 0.22, '#7A5A3E'); } } // okselknop
  ctx.restore(); return pos; }

// OPUNTIA ('boom' van Daphne Major; Opuntia echios, boomvormige Galápagos-schijfcactus): stam met roodbruine schilferende schors, daarboven ketens
// van platte, omgekeerd-eironde schijven (cladoden) die elk met een smalle voet op de rand van de vorige schijf vastzitten (nooit los zwevend);
// areolen in schuine rijen met bosjes gele stekels, gele bloemen en vruchten op de bovenrand. o.t = heel licht wiegen; o.bloei = 0..1.
// (x, y) = voet van de stam; eenheid ± 0,5 cm. Bij (0, −315) zit een vork waar een nest kan liggen (sb2 e2s04).
function _schijf(ctx, L, kl, seed, o = {}) { const hw = (u) => L * 0.36 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 0.92 + 0.04)), 0.7) * (0.3 + 0.7 * Math.min(1, u * 2.2));
  const O = []; for (let i = 0; i <= 24; i++) { const u = i / 24; O.push([hw(u) * (u < 0.05 ? 0.4 : 1), -u * L]); } for (let i = 24; i >= 0; i--) { const u = i / 24; O.push([-hw(u) * (u < 0.05 ? 0.4 : 1), -u * L]); }
  vul(ctx, O, kl, _L(kl, 0.22), 2);
  binnen(ctx, O, () => { vul(ctx, [[-L, -L * 0.5], [L, -L * 0.62], [L, 10], [-L, 10]], _D(kl, 0.08)); ctx.strokeStyle = _A(_L(kl, 0.25), 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -L * 0.05); ctx.lineTo(0, -L * 0.85); ctx.stroke(); });
  // areolen met stekelbosjes in schuine rijen
  for (let r = 0; r < 5; r++) for (let c = -2; c <= 2; c++) { const u = 0.16 + r * 0.17 + (c % 2 ? 0.085 : 0), px = c * L * 0.13; if (u > 0.92 || Math.abs(px) > hw(u) * 0.82) continue;
    const py = -u * L; circ(ctx, px, py, 1.8, '#E6DCB4'); ctx.strokeStyle = _A('#E8D078', 0.8); ctx.lineWidth = 1; for (let k = 0; k < 2; k++) { const an = -1.57 + (hash(seed + r * 7 + c * 3 + k) - 0.5) * 2.2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * 6, py + Math.sin(an) * 6); ctx.stroke(); } }
  return hw; }
function opuntia(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, bloei = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const groen = '#5F8A5E', groenD = '#4E7650', schors = '#7A5A44', schorsD = '#5E4434', schorsL = '#9A7A5E';
  // stam: taps, met schilferende schors (onregelmatige platen) en oude stekelbosjes
  const ST = [[-34, 0], [-30, -60], [-25, -140], [-24, -204], [24, -204], [25, -140], [30, -60], [36, 0]]; vul(ctx, ST, schors, schorsL, 2);
  binnen(ctx, ST, () => { for (let i = 0; i < 26; i++) { const c = i % 5, r = Math.floor(i / 5); const px = -30 + c * 13 + (r % 2) * 6, py = -18 - r * 46 - hash(i) * 12; vul(ctx, [[px, py], [px + 9, py - 4], [px + 10, py - 36], [px + 1, py - 40], [px - 2, py - 20]], i % 3 ? schorsD : _L(schors, 0.08)); }
    ctx.strokeStyle = _A('#3E2C22', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-22 + i * 11, -4); ctx.lineTo(-20 + i * 10 + hash(i) * 6, -202); ctx.stroke(); } });
  // schijvenketens: [hoek, lengte, kinderen]; elk kind zit vast op de bovenrand van de ouder (op een areool), wiegt licht mee
  const boom = [[-0.8, 96, [[-0.4, 84, [[-0.1, 66, []]]], [0.4, 76, []]]],
    [0.04, 100, [[-0.35, 80, []], [0.4, 82, []]]],
    [0.8, 94, [[0.45, 82, [[0.1, 64, []]]], [-0.3, 72, []]]]];
  const bloemen = [];
  const tak = (def, diep, seed) => { const [an, L, kids] = def; ctx.save(); ctx.rotate(an + Math.sin(t * 0.9 + seed) * 0.012 * diep); const hw = _schijf(ctx, L, diep % 2 ? groenD : groen, seed);
    kids.forEach((k, i) => { ctx.save(); const u = 0.9, side = k[0] < 0 ? -1 : 1; ctx.translate(side * hw(u) * 0.45, -u * L); tak(k, diep + 1, seed * 3 + i + 1); ctx.restore(); });
    if (!kids.length && bloei > 0) { const m = ctx.getTransform(); bloemen.push([m, hash(seed) > 0.5]); } ctx.restore(); };
  ctx.save(); ctx.translate(0, -200); boom.forEach((b, i) => { ctx.save(); ctx.translate((i - 1) * 16, 0); tak(b, 1, i + 1); ctx.restore(); }); ctx.restore();
  // bloemen (geel, bekervormig) en vruchten aan de bovenrand van eindschijven
  for (const [m, vrucht] of bloemen.slice(0, 7)) { ctx.save(); ctx.setTransform(m); const L = 70; ctx.translate(0, -L * 0.98);
    if (vrucht) { vul(ctx, [[-7, 0], [-8, -14], [0, -20], [8, -14], [7, 0]], '#B8A040', '#D8C060', 1.4); }
    else { ctx.globalAlpha *= bloei; vul(ctx, [[-5, 0], [-6, -10], [5, -10], [5, 0]], groen); for (let k = 0; k < 5; k++) { ctx.save(); ctx.translate(0, -10); ctx.rotate(-1.1 + k * 0.55); vul(ctx, [[0, 0], [-6, -10], [0, -18], [6, -10]], '#E8C83E', '#F4DC7A', 1); ctx.restore(); } circ(ctx, 0, -14, 3, '#C89A2A'); }
    ctx.restore(); }
  ctx.restore(); }

// DARWINS ORCHIDEE (Angraecum sesquipedale): ster van wasachtig witte, spitse bloemdekbladen (3 kelkbladen + 2 kroonbladen, Ø 13–18 cm) en een brede,
// toegespitste lip; de spoor (27–43 cm, groen-wit) begint ACHTER de bloem aan de voet van de lip, loopt eerst naar achter en hangt dan omlaag; nectar
// alleen in de onderste paar cm. Vruchtbeginsel/bloemsteel vanuit de bloemas schuin omhoog naar de tros. (x, y) = midden van de bloem; 1 eenheid = 1 mm.
function _bloemblad(ctx, an, len, br, kl, rand) { ctx.save(); ctx.rotate(an); const P = [[0, -br * 0.28], [len * 0.25, -br * 0.5], [len * 0.55, -br * 0.42], [len * 0.85, -br * 0.16], [len, 0], [len * 0.85, br * 0.16], [len * 0.55, br * 0.42], [len * 0.25, br * 0.5], [0, br * 0.28]];
  vul(ctx, P, kl, rand, 1.4); binnen(ctx, P, () => { vul(ctx, [[-4, -br], [len * 0.18, -br], [len * 0.18, br], [-4, br]], '#DCE4C4'); vul(ctx, [[len * 0.82, -br], [len * 1.1, -br], [len * 1.1, br], [len * 0.82, br]], '#DCE4C4');
    ctx.strokeStyle = _A('#B8B898', 0.6); ctx.lineWidth = 1; for (const v of [-0.18, 0, 0.18]) { ctx.beginPath(); ctx.moveTo(4, v * br * 0.5); ctx.quadraticCurveTo(len * 0.5, v * br * 1.2, len * 0.92, 0); ctx.stroke(); } }); ctx.restore(); }
function orchidee(ctx, x, y, s = 1, o = {}) { const { a = 1, spoor = 300, nectar = true, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot); ctx.lineJoin = 'round';
  const wit = '#F0EEE2', rand = '#C8C4A8', groenW = '#D4DCB4';
  // bloemsteel + vruchtbeginsel (geribd) schuin naar links-onder, vast achter het midden
  _streek(ctx, [[-2, 2], [-10, 8], [-22, 14]], [9, 8, 7], '#8AA86A'); ctx.strokeStyle = _A('#5E7A48', 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-4, 3); ctx.lineTo(-20, 13); ctx.stroke();
  // spoor: begint achter de bloem (verborgen achter de lip), wijd bij de opening, loopt eerst iets naar achter en hangt dan omlaag
  const S = [[2, 6], [6, 40], [10, 90], [12, 150], [6, 210], [-4, 260], [-8, spoor]];
  _streek(ctx, S, [10, 8, 7, 6.5, 6, 6, 6.5], groenW, '#B4BE94', 1.2); lijn(ctx, S.map(p => [p[0] - 1.5, p[1]]), _A('#F4F6E8', 0.7), 1.8);
  if (nectar) { const n = S[S.length - 1]; _streek(ctx, [[n[0] + 1, n[1] - 34], [n[0], n[1] - 2]], [4, 4.5], C.goud); }
  // kelkbladen (3: boven, linksonder, rechtsonder) en kroonbladen (2: linksboven, rechtsboven) — ster van spitse punten
  for (const [an, len, br] of [[-1.57, 84, 24], [0.62, 80, 22], [2.52, 80, 22]]) _bloemblad(ctx, an, len, br, wit, rand);
  for (const [an, len, br] of [[-0.42, 78, 22], [-2.72, 78, 22]]) _bloemblad(ctx, an, len, br, wit, rand);
  // lip: breed, schelpvormig bij de voet (om de opening van de spoor), spits naar onder, met een kiel
  const LIP = [[-22, -4], [-30, 18], [-28, 44], [-14, 76], [0, 98], [14, 76], [28, 44], [30, 18], [22, -4], [0, 4]]; vul(ctx, LIP, '#FAF9F0', rand, 1.5);
  binnen(ctx, LIP, () => { ctx.strokeStyle = _A('#C0BEA0', 0.7); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, 90); ctx.stroke(); for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 6, 8); ctx.quadraticCurveTo(k * 22, 40, k * 4, 84); ctx.stroke(); } });
  // zuiltje (bevruchtingsorgaan) met helmkapje, en de opening naar de spoor
  vul(ctx, [[-10, -8], [-9, -18], [0, -22], [9, -18], [10, -8], [0, -2]], '#E8ECD4', rand, 1.2); circ(ctx, 0, -14, 4.5, '#D8CC98'); ctx.beginPath(); ctx.ellipse(0, 4, 4, 2.6, 0, 0, 6.283); ctx.fillStyle = '#5E6448'; ctx.fill();
  ctx.restore(); }
// ORCHIDEEPLANT (epifyt op een tak). Angraecum sesquipedale: korte, rechte stengel die vrijwel verborgen zit achter de bladvoeten; dikke, leerachtige,
// riemvormige bladeren (20–40 cm × 6–8 cm) in TWEE RIJEN in één vlak (waaier), elk blad omvat met een gevouwen voet de stengel boven het vorige;
// top ongelijk tweelobbig; dikke grijze luchtwortels klemmen zich om de tak. Bloeitrossen komen uit de bladoksels op korte, gebogen stelen met 1–4
// bloemen; de spoor hangt vanaf de achterkant van elke bloem recht omlaag, onder de plant uit.
function _orchWaaier(ctx, L0, B) { // L0 = lengte onderste blad, B = halve breedte; tekent van onder (oud, lang) naar boven (jong, kort, rechter)
  for (let i = 0; i < 8; i++) { const k = i % 2 ? 1 : -1, yb = -i * B * 0.5, L = L0 * (1 - i * 0.06), th = -0.15 + i * 0.12, buig = 0.9 - i * 0.07;
    const P = []; for (let j = 0; j <= 14; j++) { const u = j / 14; const an = th - buig * u * 1.1; P.push([k * (B * 0.3 + Math.cos(th) * u * L * (1 - 0.15 * u)), yb - Math.sin(th) * u * L + (1 - Math.cos(an - th)) * u * L * 0.9]); }
    const half = P.map((_, j) => B * Math.min(1, 0.45 + j * 0.2) * (j >= 13 ? 0.8 : 1));
    const O = _buis(P, half, half); vul(ctx, O, i % 2 ? '#4C7244' : '#567E4C', '#7AA06A', 1.6);
    binnen(ctx, O, () => { vul(ctx, _buis(P.map((q, j) => [q[0], q[1] + half[j] * 0.55]), half.map(h => h * 0.45), half), '#3E5E38'); // dikke onderrand: blad is leerachtig en licht gedraaid
      lijn(ctx, P.slice(1, 14).map((q, j) => [q[0], q[1] - half[j + 1] * 0.1]), _A('#8AB07A', 0.7), Math.max(1.5, B * 0.06)); }); // middennerf (groef)
    const e = P[14], d = P[13]; const an = Math.atan2(e[1] - d[1], e[0] - d[0]); ctx.save(); ctx.translate(...e); ctx.rotate(an); ctx.fillStyle = ctx.__bg || C.bgMacroSky; ctx.beginPath(); ctx.moveTo(-B * 0.3, -B * 0.08); ctx.lineTo(B * 0.2, -B * 0.5); ctx.lineTo(B * 0.2, B * 0.1); ctx.fill(); ctx.restore(); // ongelijk tweelobbige top
    vul(ctx, [[-B * 0.5, yb + B * 0.35], [0, yb + B * 0.6], [B * 0.5, yb + B * 0.35], [k * B * 0.9, yb - B * 0.25], [k * B * 0.2, yb - B * 0.3]], i % 2 ? '#4C7244' : '#567E4C', '#7AA06A', 1.2); } } // V-vormige bladschede om de stengel // bladvoet om de stengel
function _orchDrager(ctx, B) { _streek(ctx, [[-B * 9, B * 1.2], [-B * 3, B * 0.7], [B * 4, B * 0.9], [B * 10, B * 0.5]], [B * 1.8, B * 1.6, B * 1.5, B * 1.3], '#5A4636'); lijn(ctx, [[-B * 9, B * 0.6], [-B * 3, B * 0.1], [B * 4, B * 0.3], [B * 10, 0]], _A('#7A624E', 0.8), B * 0.15);
  ctx.fillStyle = '#4E6A3E'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.ellipse(-B * 5 + i * B * 0.7, B * 0.25 - hash(i) * B * 0.15, B * 0.4, B * 0.2, 0, 0, Math.PI, true); ctx.fill(); }
  for (const [p, q] of [[[-B * 0.3, -B], [-B * 2.4, B * 0.4, -B * 3.6, B * 2]], [[B * 0.3, -B * 1.4], [B * 2.4, 0, B * 2.8, B * 2.4]], [[-B * 0.2, -B * 2.2], [-B * 3.6, -B * 1.6, -B * 5.6, B * 1.6]]]) { lijn(ctx, [p, [q[0], q[1]], [q[2], q[3]]], '#8A8E84', B * 0.28); lijn(ctx, [[q[2], q[3] - B * 0.15], [q[2] + B * 0.08, q[3] + B * 0.25]], '#7FAE6A', B * 0.24); } }
// alleen de plant (zoals sb3 e3s25 hem aanroept, eenheid ± 0,6 mm): waaier + drager + luchtwortels
function orchideeBladeren(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const B = 22; _orchDrager(ctx, B); _orchWaaier(ctx, 250, B); ctx.restore(); }
// hele bloeiende plant op ware schaal (1 eenheid = 1 mm): bloemen in de bladoksels op korte gebogen stelen, sporen hangen onder de plant uit.
// o.bloemen = [[bladoksel 0..7, kant -1|1, aantal]]; o.spoor = lengte in mm.
function orchideePlant(ctx, x, y, s = 1, o = {}) { const { a = 1, spoor = 300, bloemen = [[2, -1, 2], [3, 1, 1]] } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const B = 34; _orchDrager(ctx, B);
  const pos = []; for (const [i, k, n] of bloemen) { const yb = -i * B * 0.5 - B * 0.3; for (let j = 0; j < n; j++) { const L = 150 + j * 90; const bx = k * (B * 0.6 + L * 0.9), by = yb + 70 + j * 40; pos.push([bx, by, k, yb]); } }
  // eerst de sporen en stelen achter de bladeren? Nee: de bloeitros groeit vóór de bladeren langs naar buiten, dus na de waaier tekenen.
  _orchWaaier(ctx, 300, B);
  for (const [bx, by, k, yb] of pos) { _streek(ctx, [[k * B * 0.3, yb], [k * B * 0.3 + (bx - k * B * 0.3) * 0.5, yb - 26], [bx - k * 12, by - 6]], [7, 6, 5], '#7E9A5E'); orchidee(ctx, bx, by, 1, { spoor }); }
  ctx.restore(); return pos; }

// ===================================================================================
// CICHLIDE uit het Victoriameer (Pundamilia): 10–12 cm, zijdelings afgeplat, hoog baarslijf (hoogte ± 0,35 × lengte), schuin voorhoofd, eindstandige bek
// met dikke lippen; lange rugvin: vóór stekelstralen met ingesneden vliezen, achter zachte stralen in een punt; aarsvin met gele eivlekken; buikvinnen onder de
// borstvin met een lange eerste straal; staartvin afgerond. P. pundamilia-man blauwgrijs met 5–6 donkere dwarsbanden en zwarte borst; P. nyererei-man rode rug
// en rugvin, geeloranje flanken; vrouw geelbruin. o.houding 'zwemmen' (staartslag via t) of 'recht'. Anker = midden van het lijf; 1 eenheid = 1 mm.
function cichlide(ctx, x, y, s = 1, o = {}) { const { vorm = 'blauw', kijk = 1, a = 1, rot = 0, t = 0 } = o; _bd(ctx, x, y, s, kijk, a, rot); ctx.lineJoin = 'round';
  const K = vorm === 'blauw' ? { lijf: '#7FA6C4', rug: '#5A84A8', buik: '#BCD0DE', band: '#34485E', vin: '#6E94B4', borst: '#262E3A' }
    : vorm === 'rood' ? { lijf: '#E2AA48', rug: '#C8503A', buik: '#EACA78', band: '#7A3A2A', vin: '#C8503A', borst: '#5A3A2A' }
    : { lijf: '#B8A27A', rug: '#8E7A58', buik: '#D6C6A2', band: '#8E7A58', vin: '#A8936C', borst: '#B8A27A' };
  const zw = (o.houding || 'zwemmen') === 'recht' ? 0 : 1, fase = t * 7, sw = zw ? Math.cos(fase) : 1;
  const top = [[0, 2], [0.06, 7], [0.2, 16], [0.36, 21], [0.55, 19], [0.75, 12], [0.9, 7], [1, 6]], ond = [[0, 2], [0.06, 6], [0.2, 14], [0.38, 18], [0.55, 16], [0.75, 9], [0.9, 6], [1, 5.5]];
  const Z = _zwemLijf(52, -36, top, ond, (u) => zw * Math.sin(fase - u * 3) * 0.6 * u);
  const vr = _D(K.vin, 0.25);
  // staartvin (afgerond), draait mee met de slag
  { const [tx, ty] = Z.pt(1, 0); ctx.save(); ctx.translate(tx, ty); ctx.rotate(Z.hoek(1)); ctx.scale(0.65 + 0.35 * Math.abs(sw), 1); const SV = [[2, -6], [-10, -12], [-20, -12], [-24, -4], [-24, 4], [-20, 12], [-10, 12], [2, 6]]; vul(ctx, SV, K.vin, _L(K.vin, 0.2), 0.8);
    ctx.strokeStyle = vr; ctx.lineWidth = 0.6; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(0, i * 1.2); ctx.lineTo(-22, i * 2.8); ctx.stroke(); } ctx.restore(); }
  // rugvin: stekels met ingesneden vliezen vóór, zachte stralen achter met een punt
  { const R = []; for (let i = 0; i <= 10; i++) { const u = 0.18 + i * 0.066; R.push(Z.pt(u, _prof(top, u) - 1)); } const T = []; for (let i = 10; i >= 0; i--) { const u = 0.18 + i * 0.066; const h = i < 6 ? 7 + (i % 2 ? -2.2 : 0) : 9 + (i - 6) * 1.6; T.push(Z.pt(u + (i > 7 ? 0.03 * (i - 7) : 0), _prof(top, u) + h)); }
    vul(ctx, R.concat(T), K.vin, _L(K.vin, 0.2), 0.8); ctx.strokeStyle = vr; ctx.lineWidth = 0.7; for (let i = 0; i <= 10; i++) { const u = 0.18 + i * 0.066; ctx.beginPath(); ctx.moveTo(...Z.pt(u, _prof(top, u))); ctx.lineTo(...T[10 - i]); ctx.stroke(); } }
  // aarsvin met eivlekken, buikvin
  { const A = [Z.pt(0.6, -_prof(ond, 0.6) + 1), Z.pt(0.66, -_prof(ond, 0.66) - 9), Z.pt(0.8, -_prof(ond, 0.8) - 13), Z.pt(0.86, -_prof(ond, 0.86) + 1)]; vul(ctx, A, K.vin, _L(K.vin, 0.2), 0.8);
    for (const [u, v] of [[0.7, -4], [0.76, -6], [0.8, -3]]) { const p = Z.pt(u, -_prof(ond, u) + v); circ(ctx, p[0], p[1], 2.2, '#E8C94A', '#B8962E', 0.6); } }
  _vin(ctx, Z, 0.3, -15, [[2, 0], [-8, 10], [-18, 17], [-14, 8], [-10, 1]], K.vin, _L(K.vin, 0.2), 0);
  vul(ctx, Z.O, K.lijf, _L(K.lijf, 0.2), 0.8);
  binnen(ctx, Z.O, () => { const Rg = [], Bu = []; for (let i = 0; i <= 20; i++) { const u = i / 20; Rg.push(Z.pt(u, _prof(top, u) * 0.3)); Bu.push(Z.pt(u, -_prof(ond, u) * 0.35)); }
    vul(ctx, Rg.concat([[-60, -40], [70, -40]]), K.rug); vul(ctx, Bu.concat([[-60, 40], [70, 40]]), K.buik);
    if (vorm !== 'vrouw') vul(ctx, [Z.pt(0.12, -4), Z.pt(0.3, -2), Z.pt(0.36, -20), Z.pt(0.1, -16)], K.borst);
    ctx.fillStyle = _A(K.band, vorm === 'vrouw' ? 0.22 : 0.5); for (let i = 0; i < 6; i++) { const u = 0.3 + i * 0.1, p = Z.pt(u, 0); ctx.beginPath(); ctx.ellipse(p[0], p[1], 2.6, _prof(top, u) * 0.95, 0.05, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = _A('#FFFFFF', 0.16); ctx.lineWidth = 0.6; for (let r = 0; r < 5; r++) for (let i = 0; i < 12; i++) { const p = Z.pt(0.24 + i * 0.055 + (r % 2) * 0.027, 12 - r * 6); ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, -1.2, 1.2); ctx.stroke(); }
    ctx.strokeStyle = _D(K.lijf, 0.32); ctx.lineWidth = 1; const g1 = Z.pt(0.22, 12), g2 = Z.pt(0.2, -12); ctx.beginPath(); ctx.moveTo(...g1); ctx.quadraticCurveTo(g1[0] + 4, (g1[1] + g2[1]) / 2, ...g2); ctx.stroke(); }); // kieuwdeksel
  // borstvin (doorschijnend), bek met lippen, groot oog met gouden iris
  _vin(ctx, Z, 0.25, -2, [[2, 0], [-6, -6], [-14, -4], [-16, 2], [-8, 4]], _A(K.vin, 0.7), null, zw * Math.sin(fase * 1.5) * 0.25);
  vul(ctx, [Z.pt(0, 2.5), Z.pt(-0.012, 0), Z.pt(0, -2.5), Z.pt(0.04, -3), Z.pt(0.04, 3)], _D(K.lijf, 0.15));
  const oe = Z.pt(0.12, 5); dierOog(ctx, oe[0], oe[1], 4.4, '#C9A030');
  ctx.restore(); }

// BRUINE KIKKER (Rana temporaria): 7–9 cm, zittend: lange achterpoten in een Z gevouwen naast het lijf (dij, onderbeen, lange voet met zwemvliezen),
// voorpoten recht onder de borst met gespreide vingers; donkere 'masker'-vlek over het trommelvlies achter het oog, rugzijlijsten, lichte bovenlip.
// o.houding: 'zitten' (standaard) of 'springen' (achterpoten gestrekt, lijf schuin vooruit). Eenheid 1 = 1 cm; anker = onder het lijf op de grond.
function kikker(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1, kleur = '#7E8A4E' } = o; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const d = _D(kleur, 0.22), l = _L(kleur, 0.25), buik = _L(kleur, 0.5), vlek = _D(kleur, 0.5), spring = o.houding === 'springen';
  if (spring) { ctx.translate(0, -3); ctx.rotate(-0.45); }
  const achter = (ver) => { const k = ver ? _D(d, 0.2) : d;
    if (!spring) { vul(ctx, [[-3.6, -2.2], [-1.2, -3.4], [0.2, -2.2], [-1.6, -0.8], [-3.6, -0.6]], k, null); vul(ctx, [[0.2, -2.2], [0.8, -0.8], [0, -0.2], [-3.4, -0.2], [-3.8, -0.6], [-1.6, -0.8]], ver ? k : _L(kleur, 0.05), null);
      vul(ctx, [[-3.6, -0.5], [-0.2, -0.2], [2.2, -0.1], [2.6, 0.1], [-3.2, 0.2]], k); for (let i = 0; i < 3; i++) lijn(ctx, [[1.4, 0], [2.4 + i * 0.25, -0.2 + i * 0.15]], k, 0.18); }
    else { _streek(ctx, [[-3.6, -2], [-6.4, -1.4], [-9.2, -1.8], [-12, -1.6]], [1.6, 1.1, 0.7, 0.5], k); for (let i = 0; i < 4; i++) lijn(ctx, [[-11.6, -1.6], [-13 - i * 0.3, -2.2 + i * 0.4]], k, 0.2); } };
  achter(true);
  const L = [[-4.2, -1.4], [-3.8, -3.2], [-1.6, -4.4], [1.2, -4.6], [3.2, -4.2], [4.4, -3.4], [4.6, -2.8], [3.4, -2.2], [1.6, -1.4], [-1, -0.9], [-3.4, -0.8]];
  vul(ctx, L, kleur, l, 0.12); binnen(ctx, L, () => { vul(ctx, [[-5, -1.6], [0, -1.8], [4, -2.6], [5, -1], [-5, 0]], buik); ctx.fillStyle = vlek; for (const [px, py, r] of [[-2.6, -3.2, 0.35], [-1.2, -3.8, 0.28], [0, -3.4, 0.3], [-3.2, -2.2, 0.3]]) { ctx.beginPath(); ctx.ellipse(px, py, r * 1.3, r, 0.3, 0, 6.283); ctx.fill(); }
    lijn(ctx, [[-3.6, -3], [-1, -4], [1.8, -4.1]], _A(l, 0.9), 0.18); vul(ctx, [[1.2, -3.6], [2.6, -3.8], [3, -2.9], [1.6, -2.6]], vlek); lijn(ctx, [[2.8, -2.6], [4.6, -2.9]], _L(kleur, 0.55), 0.22); });
  circ(ctx, 2, -3.2, 0.55, _D(kleur, 0.35)); // trommelvlies
  achter(false);
  // voorpoot: recht onder de borst, vingers gespreid
  if (!spring) { _streek(ctx, [[2.2, -2.2], [2.5, -1], [2.4, -0.1]], [0.7, 0.5, 0.45], kleur); for (let i = 0; i < 4; i++) lijn(ctx, [[2.4, -0.1], [1.9 + i * 0.4, 0.05]], kleur, 0.18); }
  else _streek(ctx, [[2.4, -2.2], [3.6, -1.4], [4.8, -1]], [0.7, 0.5, 0.4], kleur);
  ctx.save(); ctx.beginPath(); ctx.ellipse(3, -4.5, 0.85, 0.75, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); ctx.restore();
  _oogK(ctx, 3, -4.55, 0.6, '#B8902E', { pupil: 'liggend' });
  ctx.restore(); }

// TUINSLAK / segrijnslak (Cornu aspersum): huis ± 3 cm, bolvormig, rechtsgewonden: 4–5 windingen die naar een lage top (links-boven, naar achter)
// kleiner worden, elke winding met een naad (sutuur), bruine spiraalbanden en fijne groeilijnen; de mondopening zit rechts-onder met een lichte lip.
// Het lijf komt onder het huis vandaan: de voet steekt achter het huis uit (staart) en vóór het huis komt de hals uit de mondopening, met twee paar
// tentakels (lang met de ogen op de punt, kort eronder). o.houding 'kruipen' (standaard, t = golfje) of 'ingetrokken'. Eenheid 1 = 1 cm.
function slak(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1, t = 0 } = o; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const huid = '#A8927A', huidD = '#86705A', huidL = '#C4B09A', schelp = '#C9A35C', band = '#6E4E2C', inG = o.houding === 'ingetrokken';
  const g = Math.sin(t * 3) * 0.08, sy = inG ? 0.35 : 0;
  if (!inG) { // voet: lang en plat, rimpelig, staart achter het huis
    const V = [[-3.9, 0], [-3.4, -0.45], [-1, -0.75], [1.6, -0.8], [3.2, -0.7], [4.2, -0.4 + g], [4.5, 0], [3.4, 0.05]]; vul(ctx, V, huid, huidL, 0.07);
    binnen(ctx, V, () => { ctx.strokeStyle = _A(huidD, 0.7); ctx.lineWidth = 0.06; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(-3.6 + i * 0.5, -0.05); ctx.lineTo(-3.4 + i * 0.5, -0.7); ctx.stroke(); } lijn(ctx, [[-3.8, -0.06], [4.4, -0.06]], _A(huidL, 0.8), 0.1); }); }
  // huis: windingen van de top (klein, links-boven) naar de grote lichaamswinding; grotere winding ligt voor de kleinere
  const W8 = []; for (let i = 3; i >= 0; i--) W8.push({ cx: -0.5 - i * 0.42, cy: -2.0 + sy - i * 0.5, rx: 1.9 * Math.pow(0.62, i), ry: 1.6 * Math.pow(0.62, i) });
  for (const w of W8) { ctx.beginPath(); ctx.ellipse(w.cx, w.cy, w.rx, w.ry, -0.25, 0, 6.283); ctx.fillStyle = schelp; ctx.fill(); ctx.strokeStyle = _D(schelp, 0.4); ctx.lineWidth = 0.08; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.ellipse(w.cx, w.cy, w.rx, w.ry, -0.25, 0, 6.283); ctx.clip();
    ctx.fillStyle = _D(schelp, 0.1); ctx.beginPath(); ctx.ellipse(w.cx + w.rx * 0.2, w.cy + w.ry * 0.35, w.rx, w.ry * 0.7, -0.25, 0, 6.283); ctx.fill(); // onderkant iets donkerder
    ctx.strokeStyle = _A(band, 0.8); for (const [f, lw] of [[0.35, 0.22], [0.62, 0.3], [0.85, 0.16]]) { ctx.lineWidth = lw * w.rx / 1.9 + 0.04; ctx.beginPath(); ctx.ellipse(w.cx + w.rx * 0.15, w.cy + w.ry * 0.1, w.rx * f, w.ry * f * 1.05, -0.25, Math.PI * 0.95, Math.PI * 2.15); ctx.stroke(); }
    ctx.strokeStyle = _A('#F2DEAE', 0.45); ctx.lineWidth = 0.035; for (let k = 0; k < 18; k++) { const an = Math.PI * 1.0 + k * 0.075; ctx.beginPath(); ctx.moveTo(w.cx + Math.cos(an) * w.rx * 0.25, w.cy + Math.sin(an) * w.ry * 0.25); ctx.lineTo(w.cx + Math.cos(an + 0.2) * w.rx, w.cy + Math.sin(an + 0.2) * w.ry); ctx.stroke(); }
    ctx.restore(); }
  circ(ctx, W8[0].cx - W8[0].rx * 0.2, W8[0].cy - W8[0].ry * 0.3, 0.14, _D(schelp, 0.45)); // top
  // mondopening rechts-onder met lichte lip
  const mx = 0.75, my = -0.95 + sy; ctx.beginPath(); ctx.ellipse(mx, my, 0.85, 0.62, -0.4, 0, 6.283); ctx.fillStyle = inG ? '#3E3024' : _D(huid, 0.15); ctx.fill(); ctx.strokeStyle = '#EADCB8'; ctx.lineWidth = 0.14; ctx.stroke();
  if (!inG) { // hals uit de mondopening naar voren, kop met tentakels
    const N = [[0.2, -0.9], [1.2, -1.5], [2.6, -1.4], [3.7, -1.7 + g], [4.5, -1.6 + g], [4.6, -0.9], [3.6, -0.7], [1.8, -0.5], [0.4, -0.4]]; vul(ctx, N, huid, huidL, 0.07);
    binnen(ctx, N, () => { ctx.fillStyle = _A(huidD, 0.55); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(1 + i * 0.26, -1.0 - (i % 2) * 0.18, 0.1, 0.06, 0, 0, 6.283); ctx.fill(); } });
    for (const [dx, h, an, w] of [[0.2, 2.1, -1.2, 0.3], [-0.25, 1.75, -1.0, 0.26], [0.6, 0.6, -0.35, 0.18]]) { const bx = 4 + dx, by = -1.55 + g, ex = bx + Math.cos(an) * h, ey = by + Math.sin(an) * h; _streek(ctx, [[bx, by], [lerp(bx, ex, 0.5) + 0.08, lerp(by, ey, 0.5)], [ex, ey]], [w, w * 0.78, w * 0.62], huidD); if (h > 1) circ(ctx, ex, ey, w * 0.5, '#2E2018'); } }
  ctx.restore(); }

// ===================================================================================
// INSECTEN
// BERKENSPANNER: de tekening uit teken_evo3 klopte al (rusthouding plat op schors, voorvleugels driehoekig, geveerde antennes op de kop).
// Toegevoegd: o.houding 'vliegen' (vleugels omhoog geslagen: van boven gezien verkort, via o.t). 'rust' = standaard.
if (typeof berkenspanner !== 'undefined') berkenspanner = (function (oud) { return function (ctx, x, y, s = 1, o = {}) { if (o.houding !== 'vliegen') return oud(ctx, x, y, s, o);
  const k = 0.35 + 0.65 * Math.abs(Math.cos((o.t || 0) * 14)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, 1); oud(ctx, 0, 0, s, Object.assign({}, o, { rot: 0 })); ctx.restore(); }; })(berkenspanner);

// RUPS: tekening uit teken_evo2 (één doorlopende lijfvorm met segmentbanden, 3 paar borstpoten, buikpoten en naschuivers) blijft; nieuw: o.houding
// 'kruipen' (een golf van achter naar voren via o.t, de lijfvorm buigt licht), 'lus' (spanrups: het midden hoog opgebogen, voor- en achterpoten op het blad),
// 'strekken' (recht, zoals een takje). Standaard = zoals gevraagd met o.krom.
if (typeof rups !== 'undefined') rups = (function (oud) { return function (ctx, x, y, s = 1, o = {}) { const h = o.houding; if (!h) return oud(ctx, x, y, s, o);
  const krom = h === 'lus' ? 1.1 : h === 'kruipen' ? 0.12 + 0.12 * Math.max(0, Math.sin((o.t || 0) * 4)) : 0; return oud(ctx, x, y, s, Object.assign({}, o, { krom })); }; })(rups);

// PIJLSTAARTVLINDER van Wallace (Xanthopan praedicta): spanwijdte 13–15 cm, smalle spitse voorvleugels (grijsbruin met donkere lengtestrepen), kleine
// achtervleugel; dik, spoelvormig, behaard lijf met roze-gele zijbanden; grote facetogen; roltong in rust opgerold onder de kop, uitgerold tot ± 28 cm.
// Zijaanzicht. o.houding 'zweven' (stilhangen voor een bloem, vleugels via o.t of o.vleugel, voorpoten naar voren) of 'rust' (vleugels als een dak naar
// achter, tong opgerold). Kop op (38, −4), tong begint op (44, 2) (sb3 e3s28 rekent daarmee). Eenheid 1 = 0,5 mm.
function pijlstaart(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, tong = 1, tongLengte = 280, vleugel = 0.3, tongEind = null } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const grijs = '#7E7466', grijsL = '#AAA294', donker = '#4A443C', rust = o.houding === 'rust';
  const vs = o.t != null && !rust ? Math.sin(o.t * 30) * 0.45 : (vleugel - 0.3);
  const vl = (ver) => { ctx.save(); ctx.translate(ver ? 10 : 4, -12); ctx.rotate(rust ? (ver ? -0.42 : -0.48) : -0.1 + vs + (ver ? -0.22 : 0));
    const A = [[0, 0], [-24, -16], [-50, -14], [-60, 0], [-46, 14], [-18, 14]]; vul(ctx, A, ver ? '#6A5A3E' : '#7A6444', '#2A2620', 1); binnen(ctx, A, () => vul(ctx, [[0, -10], [-18, -10], [-16, 12], [0, 12]], '#B89A4A')); // achtervleugel, okergele voet
    const V = [[8, -2], [-18, -26], [-62, -56], [-118, -80], [-140, -80], [-134, -62], [-104, -36], [-56, -6], [-12, 14]]; vul(ctx, V, ver ? _D(grijs, 0.22) : grijs, grijsL, 1.2);
    if (!ver) binnen(ctx, V, () => { ctx.strokeStyle = donker; ctx.lineWidth = 1.6; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-4 - i * 3, -4 + i * 3); ctx.lineTo(-128 + i * 12, -72 + i * 7); ctx.stroke(); } lijn(ctx, [[-20, -6], [-110, -58]], _A('#D8D0C0', 0.7), 1.4); });
    ctx.restore(); };
  if (!rust) vl(true);
  // lijf: borststuk dik en behaard, achterlijf spits met roze-gele zijbanden en donkere ringen
  const L = [[34, -10], [28, -22], [10, -26], [-10, -22], [-34, -16], [-58, -7], [-68, 1], [-56, 9], [-30, 13], [-4, 14], [20, 12], [32, 4]];
  vul(ctx, L, grijs, grijsL, 1.5);
  binnen(ctx, L, () => { for (let i = 0; i < 5; i++) vul(ctx, [[-14 - i * 9, -4], [-7 - i * 9, -4], [-9 - i * 9, 10], [-16 - i * 9, 10]], i % 2 ? '#D8A090' : '#E6C878');
    ctx.strokeStyle = donker; ctx.lineWidth = 1.3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-10 - i * 9, -16); ctx.lineTo(-12 - i * 9, 11); ctx.stroke(); }
    vul(ctx, [[30, -16], [0, -21], [-8, -10], [24, -8]], _D(grijs, 0.15)); ctx.strokeStyle = _A(grijsL, 0.6); ctx.lineWidth = 1; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(26 - i * 2.4, -17); ctx.lineTo(24 - i * 2.4, -11); ctx.stroke(); } });
  ctx.strokeStyle = _A(grijsL, 0.8); ctx.lineWidth = 1.2; for (let i = 0; i < 16; i++) { const px = 30 - i * 3.4, py = -24 + Math.abs(i - 6) * 0.4; ctx.beginPath(); ctx.moveTo(px, py + 2); ctx.lineTo(px - 2, py - 3); ctx.stroke(); } // haren op het borststuk
  // kop met groot facetoog, palpen, antenne (verdikt, haakje aan de punt)
  ctx.beginPath(); ctx.ellipse(38, -4, 10, 9, 0, 0, 6.283); ctx.fillStyle = grijs; ctx.fill(); ctx.strokeStyle = grijsL; ctx.lineWidth = 1; ctx.stroke();
  circ(ctx, 41, -6, 5.2, '#2A2620'); circ(ctx, 42.5, -7.8, 1.2, 'rgba(255,255,255,0.6)'); vul(ctx, [[36, 2], [46, 1], [48, 6], [38, 7]], grijsL);
  lijn(ctx, [[36, -12], [48, -28], [60, -36], [64, -34]], donker, 2);
  // poten: drie paar uit het borststuk; zwevend steken de voorpoten naar voren
  for (const [dx, ex, ey] of (rust ? [[10, 4, 16], [18, 14, 18], [26, 26, 16]] : [[10, 2, 26], [18, 16, 28], [26, 40, 20]])) lijn(ctx, [[dx, 8], [(dx + ex) / 2 + 2, ey - 8], [ex, ey]], donker, 1.5);
  // roltong
  ctx.strokeStyle = '#3A3028'; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(44, 2);
  if (tong > 0.5 && !rust) { const ex = tongEind ? tongEind[0] : 44 + tongLengte * 0.15, ey = tongEind ? tongEind[1] : 2 + tongLengte * 0.99; ctx.bezierCurveTo(60, 20, ex + 10, ey * 0.4, ex, ey); }
  else { for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283 * 2.5, r = 8 - i * 0.16; ctx.lineTo(48 + Math.cos(an) * r, 12 + Math.sin(an) * r); } }
  ctx.stroke();
  if (rust) vl(true); vl(false);
  ctx.restore(); }

// AZIATISCH LIEVEHEERSBEESTJE (Harmonia axyridis), bovenaanzicht: ovaal lijf ± 7 mm (lengte : breedte ± 1,2), hoog gewelfd; halsschild crème met zwarte
// M (of W), kop klein en zwart met witte vlekken, deels onder het halsschild; dekschilden met een naad en achteraan een zwakke dwarsrichel (kenmerk van
// Harmonia); poten uit de borst onder het schild (dij, scheen, voet in segmenten), korte geknotte antennes. Vormen succinea / conspicua / spectabilis.
// o.houding 'lopen' (poten in driepootgang via o.t) of 'vliegen' (= o.open 1: dekschilden omhoog, vliezige achtervleugels uitgevouwen).
function lhb(ctx, x, y, s = 1, o = {}) {
  const { vorm = 'succinea', stippen = 12, rot = 0, a = 1, t = 0 } = o; const open = o.houding === 'vliegen' ? 1 : (o.open || 0);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round';
  const rug = vorm === 'succinea' ? '#D9792E' : '#1C1B1E', vlek = vorm === 'succinea' ? '#1C1B1E' : '#D2452C', poot = '#2A2422';
  // poten: drie paar, elk dij → scheen → voetje; driepootgang bij lopen
  const g = o.houding === 'lopen' ? Math.sin(t * 10) : 0;
  for (const k of [-1, 1]) [[-24, -0.55], [-2, 0.05], [18, 0.6]].forEach(([py, hoek], i) => { const f = ((i + (k > 0 ? 1 : 0)) % 2 ? 1 : -1) * g * 0.35; const an = hoek + f;
    const p1 = [k * 26, py], p2 = [k * 52, py + Math.sin(an) * 22 - 4], p3 = [k * 68, py + Math.sin(an) * 40 + 4], p4 = [k * 76, py + Math.sin(an) * 48 + 8];
    _streek(ctx, [p1, p2], [6, 4.5], poot); _streek(ctx, [p2, p3], [4, 3], poot); _streek(ctx, [p3, p4], [2.6, 2], '#3A322E'); });
  ctx.strokeStyle = poot; ctx.lineWidth = 2.4; ctx.lineCap = 'round'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 9, -78); ctx.quadraticCurveTo(k * 18, -92, k * 24, -96); ctx.stroke(); ctx.beginPath(); ctx.ellipse(k * 25, -97, 3, 4.5, k * 0.6, 0, 6.283); ctx.fillStyle = poot; ctx.fill(); }
  // kop
  ctx.beginPath(); ctx.ellipse(0, -70, 20, 13, 0, 0, 6.283); ctx.fillStyle = '#1C1B1E'; ctx.fill(); vul(ctx, [[-16, -70], [-10, -78], [-5, -72], [-9, -64]], '#E9E2CC'); vul(ctx, [[16, -70], [10, -78], [5, -72], [9, -64]], '#E9E2CC');
  // achtervleugels (alleen open): vliezig, met aders
  if (open > 0.01) for (const k of [-1, 1]) { ctx.save(); ctx.globalAlpha *= open; const V = [[k * 8, -36], [k * 70, -40], [k * 130, -10], [k * 126, 30], [k * 60, 26], [k * 10, 0]]; vul(ctx, V, _A('#E8E4D8', 0.55), _A('#B8B0A0', 0.8), 1.2);
    ctx.strokeStyle = _A('#8A8070', 0.7); ctx.lineWidth = 1; for (const [ex, ey] of [[120, -8], [110, 18], [70, 22]]) { ctx.beginPath(); ctx.moveTo(k * 12, -30); ctx.quadraticCurveTo(k * 60, -30, k * ex, ey); ctx.stroke(); } ctx.restore(); }
  // halsschild crème met zwarte M
  ctx.beginPath(); ctx.moveTo(-40, -44); ctx.quadraticCurveTo(-40, -64, -16, -68); ctx.quadraticCurveTo(0, -70, 16, -68); ctx.quadraticCurveTo(40, -64, 40, -44); ctx.quadraticCurveTo(0, -38, -40, -44); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#1C1B1E'; ctx.beginPath(); ctx.moveTo(-20, -43); ctx.quadraticCurveTo(-18, -54, -13, -61); ctx.lineTo(-6, -54); ctx.lineTo(0, -62); ctx.lineTo(6, -54); ctx.lineTo(13, -61); ctx.quadraticCurveTo(18, -54, 20, -43); ctx.quadraticCurveTo(0, -40, -20, -43); ctx.fill();
  if (vorm !== 'succinea') { circ(ctx, -29, -52, 6, '#EDE6D2'); circ(ctx, 29, -52, 6, '#EDE6D2'); }
  // dekschilden: gewelfd (lichte rand aan de lichtkant), naad, stippen; achteraan de dwarsrichel
  const dek = (k) => { ctx.beginPath(); ctx.moveTo(0, -42); ctx.quadraticCurveTo(k * 46, -44, k * 51, -6); ctx.quadraticCurveTo(k * 53, 40, k * 4, 63); ctx.lineTo(0, 63); ctx.closePath(); };
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * open * 22, -open * 6); ctx.rotate(k * open * 0.5); dek(k); ctx.fillStyle = rug; ctx.fill(); ctx.strokeStyle = _L(rug, 0.25); ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); dek(k); ctx.clip();
    ctx.beginPath(); ctx.ellipse(k * 32, 8, 12, 46, 0, 0, 6.283); ctx.fillStyle = _A(_L(rug, 0.3), 0.18); ctx.fill(); // welving
    if (vorm === 'succinea') { const pos = [[18, -26], [34, -10], [14, -2], [30, 14], [12, 22], [26, 36], [40, 28], [20, 46], [36, -28], [8, 40]]; for (let i = 0; i < Math.min(stippen / 2, pos.length); i++) circ(ctx, k * pos[i][0], pos[i][1], 5.4, vlek); if (stippen % 2) circ(ctx, 0, -32, 5, vlek); }
    else if (vorm === 'conspicua') { ctx.beginPath(); ctx.ellipse(k * 26, -14, 14, 12, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); }
    else { ctx.beginPath(); ctx.ellipse(k * 26, -18, 11, 9, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 24, 28, 10, 8, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = _A('#000000', 0.25); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(k * 6, 50); ctx.quadraticCurveTo(k * 20, 46, k * 30, 40); ctx.stroke(); // dwarsrichel
    ctx.restore(); ctx.restore(); }
  if (open < 0.01) { ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -42); ctx.lineTo(0, 63); ctx.stroke(); }
  ctx.restore(); }

// Referentiecontouren (uit /home/claude/evo2/referentie/*.webp, pixelcoördinaten, kop naar rechts). Alleen voor testvellen, nooit in een film.
// ===== pop_hoef.js =====
// Paardachtigen en hoefdieren als uitknippop (cut-out rig), 23 okt 2026 — POPFAMILIE.md, familie hoef
// Eén rig-code (HoefPop.maak, afgeleid van KatPop in pop_katten.js / wolf_pop.js: zachte huid, rand in twee passes, IK, gangmodel)
// met per dier eigen gewrichtspunten (botlengtes), eigen delen, eigen kleuren en eigen houdingen.
// Delen: silhouet van de vlakke stijlplaat (referentie/pop/hoefdieren/stijl.png) geknipt per deel, toonlagen = k-means-tonen van die plaat,
// als vectorpaden in cm (blok HOEF_VORM, gemaakt door referentie/pop/hoefdieren/werk/bouw.py). Poten = profielen langs de botten.
// Hoefgangers: carpus ('knie') van de voorpoot knikt bij optillen naar achter, kogel en hak hoog, lange middenhand/middenvoet, hoef als vaste vorm op het kootbeen.
// Eenheid = cm, y omlaag, grond y = 0, x = 0 midden onder de romp. Kijkrichting +x (o.kijk = -1 spiegelt).
// API per dier: HOEF.paard.teken(ctx, x, y, schaal (px/cm), o)  o.houding, o.t (0-1 cyclus), o.kijk, o.a, o.wereld, o.bek
// Wrappers onderaan: paard(), ezel(), muilezel(), edelhert(), koe7(), nijlpaard() met dezelfde aanroep en schermmaat als in dieren_zoog.js.

// <<HOEFVORM (gegenereerd door referentie/pop/hoefdieren/werk/bouw.py uit de stijlplaat; niet met de hand bewerken)
const HOEF_VORM = {"paard":{"J":{"midrug":[0.0,-155.35],"nekBasis":[74.42,-127.44],"lend":[-27.91,-156.28],"kruis":[-55.81,-152.56],"kop":[106.98,-204.65],"neus":[138.6,-162.79],"kaak":[108.84,-178.6],"kin":[130.23,-160.0],"schoft":[41.86,-148.84],"schouder":[69.77,-111.63],"elleboog":[53.95,-85.58],"pols":[55.81,-48.37],"vkogel":[56.74,-13.02],"vteen":[69.77,0.0],"heup":[-62.33,-120.93],"knie":[-44.65,-96.74],"hak":[-60.47,-56.74],"akogel":[-55.81,-15.81],"ateen":[-47.44,0.0],"staart0":[-75.35,-146.05],"staart1":[-82.79,-113.49],"staart2":[-87.44,-80.0],"staart3":[-90.23,-50.23],"staart4":[-93.02,-27.91]},"delen":{"romp":{"c":"#7C4B2E","basis":[[77.21,-115.35,1],[73.95,-117.21],[39.07,-149.53],[29.53,-159.3,1],[22.79,-155.58],[10.7,-152.56],[2.09,-152.56],[-0.47,-153.49],[-6.28,-153.49],[-23.72,-157.21],[-26.74,-157.21],[-33.02,-159.07],[-41.63,-159.07],[-46.28,-158.14],[-62.09,-153.49],[-65.12,-150.47],[-65.12,-149.3],[-66.05,-148.6],[-66.05,-140.93],[-71.63,-114.19],[-72.56,-100.0],[-73.49,-96.28],[-73.49,-83.26],[-72.56,-82.56],[-72.56,-81.4],[-68.6,-77.44],[-67.44,-77.44],[-64.88,-75.58],[-60.93,-75.58],[-60.23,-74.65],[-58.14,-74.65],[-57.44,-75.58],[-53.49,-75.58],[-52.79,-76.51],[-49.77,-77.44],[-47.67,-79.53],[-46.51,-83.49],[-43.95,-88.6],[-38.37,-97.67,1],[-33.72,-97.67],[-30.23,-100.47],[-26.51,-100.7],[-10.93,-93.49],[-0.7,-90.47],[2.33,-90.47],[4.88,-89.53],[37.44,-89.53],[39.07,-87.91],[39.07,-84.19],[43.02,-80.23],[44.19,-80.23],[46.74,-78.37],[50.7,-78.37],[51.4,-77.44],[53.49,-77.44],[54.19,-78.37],[58.14,-78.37],[58.84,-79.3],[61.86,-80.23],[64.88,-83.26],[66.98,-94.42],[72.79,-99.77],[75.12,-103.49],[76.98,-109.3]],"lagen":[{"c":"#1E1E1E","p":[[-27.44,-105.12],[-29.53,-106.98],[-34.42,-106.74],[-37.91,-103.26],[-40.23,-98.14],[-41.63,-96.28,1],[-40.47,-95.35,1],[-38.84,-96.74],[-36.98,-96.98],[-36.05,-97.67],[-33.49,-97.44],[-30.47,-100.47],[-28.6,-100.7],[-27.44,-101.63]]},{"c":"#8E5837","p":[[-13.49,-147.91],[-15.12,-149.53],[-17.44,-150.7],[-20.47,-150.7],[-22.09,-151.63],[-23.72,-151.86,1],[-26.28,-156.98],[-28.6,-158.14],[-31.4,-158.37],[-32.33,-159.07],[-42.33,-159.07],[-43.95,-158.14],[-46.98,-158.14],[-48.6,-157.21],[-50.7,-157.21],[-52.33,-156.28],[-54.42,-156.28],[-55.35,-155.58],[-62.79,-153.49],[-68.84,-150.47],[-70.47,-148.84],[-70.93,-146.51],[-76.28,-137.21],[-76.28,-136.05],[-77.21,-134.42],[-77.21,-129.53],[-78.14,-127.91],[-78.14,-123.49],[-77.21,-121.86],[-77.21,-116.05],[-76.28,-114.42],[-76.28,-112.33],[-75.35,-110.7],[-75.35,-108.6],[-73.49,-104.19],[-73.49,-102.09],[-72.56,-100.47],[-72.56,-98.37],[-71.86,-97.44],[-71.4,-95.12],[-70.47,-94.42,1],[-69.77,-94.65],[-67.44,-96.98],[-66.98,-99.3],[-66.28,-100.23],[-66.28,-102.79],[-67.21,-104.42],[-67.21,-107.44],[-68.14,-109.07],[-68.14,-113.02],[-69.07,-114.65],[-69.07,-123.72],[-66.05,-130.93],[-64.65,-132.33],[-64.19,-133.72],[-60.23,-137.67],[-58.84,-138.14],[-51.86,-143.26],[-40.7,-148.84],[-38.84,-149.07],[-34.42,-150.93],[-27.21,-150.93],[-25.58,-150.0],[-23.95,-149.77],[-21.4,-145.12],[-21.4,-136.98],[-22.33,-135.35],[-22.33,-132.33],[-25.35,-126.05],[-28.6,-122.79],[-29.07,-121.4],[-30.47,-120.0],[-33.49,-113.95],[-33.49,-111.86],[-34.42,-110.23],[-34.42,-108.6],[-33.49,-107.44],[-30.0,-107.21],[-27.67,-106.28],[-25.35,-107.44],[-18.37,-114.42],[-14.19,-116.74],[-11.63,-119.3],[-11.16,-120.7],[-9.53,-122.56],[-9.53,-124.65],[-8.6,-126.28],[-8.6,-127.91],[-9.53,-129.53],[-9.53,-131.63],[-10.23,-132.56],[-10.47,-134.42],[-11.4,-136.05],[-11.4,-138.14],[-12.33,-139.77],[-12.33,-145.58]]},{"c":"#553A2B","p":[[-27.67,-105.81,1],[-26.98,-104.19],[-26.98,-102.09],[-25.12,-100.0],[-15.35,-95.12],[-13.49,-94.88],[-10.7,-93.26],[-9.53,-93.26],[-5.12,-91.4],[-3.02,-91.4],[-1.4,-90.47],[2.56,-90.47],[4.19,-89.53],[34.19,-89.53],[35.81,-88.6],[36.98,-88.6],[38.14,-87.67],[39.07,-85.58],[39.07,-77.44],[38.14,-75.81],[38.37,-65.35,1],[40.23,-64.42,1],[43.95,-67.91],[47.21,-68.6],[49.77,-67.91],[50.93,-66.74],[51.4,-65.35],[53.49,-63.49],[56.05,-63.49],[57.44,-64.88,1],[57.21,-66.05],[53.26,-68.14],[51.16,-70.23],[50.23,-72.09],[50.0,-73.95],[49.07,-75.58],[49.07,-79.53],[48.14,-81.16],[48.14,-90.7],[45.12,-95.81],[43.95,-96.74],[42.33,-96.74],[39.53,-95.12],[37.67,-94.88],[36.05,-93.95],[31.86,-95.12],[30.47,-96.51],[28.14,-96.98],[27.21,-97.67,1],[24.88,-96.74],[22.79,-96.74],[21.16,-95.81],[19.07,-95.81],[17.44,-94.88],[-0.93,-94.88],[-2.56,-95.81],[-5.58,-95.81],[-7.21,-96.74],[-11.86,-97.91],[-15.58,-99.77],[-16.98,-101.16],[-21.16,-103.49],[-24.88,-106.98],[-26.51,-106.98]]},{"c":"#553A2B","p":[[-42.33,-95.58,1],[-47.91,-90.47],[-49.3,-90.0],[-52.79,-86.51],[-54.19,-82.33],[-55.58,-80.93],[-56.05,-79.53],[-58.37,-77.21],[-59.53,-74.88],[-60.7,-70.23],[-62.09,-67.44,1],[-55.58,-60.93,1],[-53.49,-62.56],[-50.47,-68.6],[-50.47,-69.77],[-48.6,-74.19],[-48.6,-76.28],[-47.67,-77.91],[-47.67,-80.0],[-46.74,-81.63],[-46.51,-83.49],[-43.72,-89.07],[-42.33,-90.47],[-41.16,-92.79],[-41.16,-94.42]]}]},"hum":{"c":"#7C4B2E","basis":[[27.67,-154.88,1],[38.6,-94.42],[44.88,-82.79,1],[64.65,-83.02,1],[65.81,-86.05],[66.98,-94.42],[72.79,-99.77],[75.12,-103.49],[76.98,-109.3],[77.21,-115.35,1],[75.12,-116.28],[43.72,-156.98,1]],"lagen":[]},"dij":{"c":"#7C4B2E","basis":[[-57.44,-155.12],[-63.02,-153.26],[-70.93,-149.07,1],[-66.05,-141.16],[-71.63,-114.19],[-72.79,-101.63,1],[-51.86,-97.91],[-42.56,-90.47,1],[-39.53,-96.51],[-38.37,-97.67],[-33.72,-97.67],[-32.56,-98.6],[-28.37,-155.12,1]],"lagen":[]},"nek":{"c":"#7C4B2E","basis":[[99.53,-204.65,1],[96.05,-204.65],[87.67,-201.63],[75.12,-195.35],[71.63,-193.02],[68.37,-189.53],[62.33,-185.58],[39.77,-166.05],[23.72,-156.05,1],[23.72,-144.65],[44.65,-101.86,1],[74.19,-101.86,1],[76.98,-109.3],[76.98,-115.12],[77.91,-117.67],[77.91,-129.07],[79.07,-132.79],[94.19,-164.65],[95.81,-166.28],[100.0,-167.67],[102.56,-167.67],[103.72,-166.74,1]],"lagen":[{"c":"#1E1E1E","p":[[98.14,-203.72],[96.98,-204.65],[95.35,-204.65],[92.56,-203.02],[87.91,-201.86],[84.42,-200.0],[83.26,-200.0],[81.4,-198.37],[74.42,-195.12],[73.02,-193.72],[71.63,-193.26],[68.84,-189.77],[66.05,-188.6],[63.72,-186.28],[62.33,-185.81],[58.14,-181.63],[56.74,-181.16],[51.63,-176.05],[50.23,-175.58],[44.19,-169.53],[42.79,-169.07],[39.53,-165.81],[36.28,-164.42],[34.88,-163.02],[30.7,-160.7],[29.77,-159.53],[30.0,-158.37],[31.16,-157.44],[33.72,-157.44],[38.14,-159.3],[42.09,-159.3],[53.72,-165.12],[56.98,-168.37],[58.37,-168.84],[60.7,-171.16],[62.09,-171.63],[68.14,-177.67],[69.53,-178.14],[71.86,-180.47],[73.26,-180.93],[76.74,-184.42],[77.21,-185.81],[78.37,-186.98],[79.77,-187.44],[82.09,-189.77],[83.49,-190.23],[88.6,-195.35],[92.79,-197.67],[96.05,-200.93],[97.44,-201.4],[98.37,-202.56]]},{"c":"#1E1E1E","p":[[97.91,-173.02],[96.74,-172.79],[94.88,-170.7],[93.95,-167.21,1],[95.12,-166.05,1],[96.74,-166.74],[98.84,-166.74],[100.93,-168.84,1],[100.0,-171.16]]},{"c":"#8E5837","p":[[43.26,-138.6,1],[42.09,-137.67],[40.93,-135.35],[40.93,-133.26],[40.0,-131.63],[40.0,-117.91],[40.93,-116.28],[40.93,-112.33],[41.86,-110.7],[41.86,-105.81],[42.79,-104.19],[42.79,-102.09],[46.05,-98.84],[52.33,-98.84],[53.26,-99.53],[54.42,-99.53],[55.35,-98.84],[56.98,-98.6],[58.6,-95.81],[57.67,-93.49],[57.91,-92.33],[62.33,-88.84],[64.65,-87.91,1],[65.58,-88.6],[66.74,-90.93],[66.74,-93.02],[68.37,-96.51,1],[66.28,-98.6],[64.19,-98.6],[62.56,-99.53],[60.93,-99.77],[59.53,-101.86],[59.53,-103.95],[62.09,-108.6],[62.09,-113.95],[61.16,-116.28],[62.79,-119.07],[64.42,-119.3],[65.35,-120.0],[69.3,-119.07],[72.09,-117.44],[77.21,-116.98,1],[77.91,-117.91],[77.91,-129.3],[78.84,-130.93],[78.84,-133.49],[76.98,-136.51],[75.58,-136.98],[69.07,-142.33],[63.72,-142.33],[62.09,-141.4],[58.14,-141.4],[56.05,-139.53],[55.58,-138.14],[54.42,-136.98],[52.56,-136.74],[50.93,-135.81],[46.74,-136.98]]},{"c":"#553A2B","p":[[94.19,-176.74],[92.56,-176.74],[91.16,-175.35],[91.16,-173.26],[90.23,-171.63],[90.23,-168.6],[88.37,-164.19],[88.37,-161.16],[87.44,-159.53],[87.21,-156.74],[84.42,-151.16],[83.02,-149.77],[82.56,-148.37],[80.23,-146.05],[78.14,-141.86],[78.14,-140.7],[77.21,-139.07],[77.21,-136.51],[79.3,-134.42,1],[80.47,-135.12],[85.35,-144.88],[85.58,-146.74],[94.65,-165.35],[94.65,-170.23],[96.51,-174.42,1]]},{"c":"#1E1E1E","p":[[99.77,-204.88,1],[95.81,-204.88],[92.33,-203.26],[87.44,-201.86],[74.88,-195.58],[71.4,-193.26],[68.14,-189.77],[62.09,-185.81],[39.53,-166.28],[28.37,-159.3],[28.14,-157.67,1],[31.16,-156.28],[34.65,-156.74],[36.74,-157.91],[41.4,-157.91],[43.72,-159.3],[46.98,-159.77],[50.47,-161.4],[53.02,-163.95],[54.19,-164.19],[56.74,-166.74],[57.91,-166.98],[60.47,-169.53],[61.63,-169.77],[71.63,-179.77],[72.79,-180.0],[84.65,-191.86],[85.81,-192.09],[88.37,-194.65],[89.53,-194.88],[95.81,-200.23],[98.37,-201.4],[99.77,-201.4,1]]}]},"kop":{"c":"#804F31","basis":[[106.93,-220.18],[105.82,-218.92],[104.93,-217.32],[104.13,-214.86],[102.34,-211.75],[101.27,-208.55],[100.72,-207.87],[98.37,-207.62],[98.21,-207.43],[98.39,-205.77],[98.08,-205.3],[98.26,-203.64],[97.95,-203.17],[98.13,-201.51],[97.83,-201.03],[98.0,-199.37],[97.7,-198.9],[97.84,-197.59],[97.54,-197.12],[97.71,-195.46],[97.41,-194.99],[97.58,-193.33],[97.28,-192.85],[97.46,-191.19],[97.15,-190.72],[97.33,-189.06],[97.02,-188.59],[97.2,-186.93],[96.9,-186.46],[97.04,-185.15],[96.73,-184.67],[96.91,-183.01],[96.6,-182.54],[96.78,-180.88],[96.48,-180.41],[96.65,-178.75],[96.35,-178.28],[96.52,-176.62],[96.22,-176.14],[96.36,-174.83],[96.06,-174.36],[96.23,-172.7],[95.93,-172.23],[96.1,-170.57],[95.8,-170.09],[95.98,-168.44],[96.4,-167.77],[97.37,-166.99],[98.33,-167.09],[98.8,-166.79],[99.46,-167.21],[100.42,-167.32],[101.67,-166.39],[101.93,-166.42],[103.18,-165.49],[103.91,-165.21],[104.52,-165.28],[105.0,-164.97],[105.96,-165.08],[106.43,-164.77],[107.39,-164.87],[107.86,-164.57],[108.47,-164.64],[113.5,-160.58],[114.23,-160.3],[115.48,-159.37],[115.74,-159.4],[116.6,-158.79],[116.86,-158.81],[117.72,-158.2],[117.98,-158.23],[119.53,-156.98],[120.26,-156.7],[121.42,-155.76],[122.45,-155.25],[122.87,-154.59],[122.97,-153.63],[123.37,-153.23],[123.61,-150.88],[124.43,-149.81],[126.16,-148.5],[126.9,-148.22],[127.86,-148.32],[128.33,-148.02],[129.99,-148.19],[130.39,-148.59],[131.7,-148.73],[132.1,-149.12],[133.06,-149.23],[133.46,-149.62],[134.42,-149.72],[134.82,-150.12],[135.78,-150.22],[136.87,-151.57],[137.15,-152.31],[137.08,-152.92],[137.39,-153.39],[137.32,-154.0],[138.49,-156.33],[138.42,-156.94],[139.0,-158.15],[138.49,-162.96],[137.25,-164.68],[137.19,-165.29],[135.95,-167.01],[135.88,-167.62],[135.49,-168.02],[135.42,-168.63],[135.03,-169.03],[134.96,-169.64],[134.57,-170.04],[134.5,-170.66],[133.68,-171.72],[133.62,-172.33],[133.22,-172.73],[133.16,-173.34],[130.22,-177.71],[130.16,-178.32],[129.34,-179.38],[129.28,-179.99],[128.46,-181.05],[128.39,-181.66],[128.0,-182.06],[127.93,-182.67],[127.54,-183.07],[127.47,-183.69],[127.08,-184.09],[126.98,-185.05],[126.58,-185.45],[126.48,-186.41],[126.08,-186.81],[125.95,-188.11],[126.25,-188.59],[125.89,-191.99],[125.49,-192.39],[125.43,-193.0],[124.61,-194.07],[119.98,-197.81],[119.69,-200.52],[118.87,-201.58],[118.81,-202.19],[118.38,-202.85],[117.6,-203.57],[117.15,-204.49],[115.98,-205.51],[115.92,-206.12],[116.53,-206.98],[117.36,-209.19],[117.29,-209.8],[117.6,-210.28],[117.53,-210.89],[117.84,-211.36],[117.73,-212.32],[118.04,-212.79],[117.97,-213.41],[118.28,-213.88],[118.17,-214.84],[118.48,-215.31],[118.27,-217.32],[118.57,-217.79],[118.28,-220.5],[117.83,-220.63],[117.36,-220.05],[116.84,-218.32],[115.94,-216.72],[114.23,-214.6],[113.17,-213.78],[110.28,-210.21],[109.77,-209.18],[108.81,-209.08],[108.52,-209.32],[108.45,-209.93],[108.76,-210.4],[108.62,-211.71],[108.92,-212.18],[108.74,-213.84],[108.35,-214.24],[107.73,-220.09],[107.54,-220.25]],"lagen":[{"c":"#8A5737","p":[[128.78,-180.47],[127.97,-179.85],[126.28,-177.47],[124.53,-176.49],[124.05,-176.0],[123.76,-175.35],[124.45,-169.68],[126.34,-164.32],[127.15,-163.35],[128.04,-160.79],[128.76,-159.81],[129.12,-159.76],[129.78,-160.18],[131.27,-162.01],[132.19,-162.47],[132.89,-162.54],[134.17,-162.14],[135.94,-160.39],[136.66,-159.41],[137.04,-159.18],[137.56,-159.24],[138.06,-159.55],[138.76,-160.42],[138.48,-163.13],[138.12,-163.18],[138.05,-163.79],[137.69,-163.84],[137.63,-164.45],[137.27,-164.5],[137.17,-165.46],[136.81,-165.51],[136.75,-166.13],[136.39,-166.18],[136.32,-166.79],[135.96,-166.84],[135.86,-167.8],[135.5,-167.85],[135.4,-168.81],[135.04,-168.86],[134.94,-169.82],[134.58,-169.87],[134.48,-170.83],[134.12,-170.88],[134.06,-171.49],[133.7,-171.54],[133.6,-172.5],[133.24,-172.55],[133.14,-173.51],[132.78,-173.56],[132.72,-174.18],[132.36,-174.23],[132.29,-174.84],[131.94,-174.89],[131.87,-175.5],[131.51,-175.55],[131.45,-176.16],[131.09,-176.21],[131.02,-176.82],[130.67,-176.87],[130.6,-177.48],[130.24,-177.53],[130.14,-178.49],[129.78,-178.54],[129.72,-179.16],[129.36,-179.21],[129.26,-180.17],[129.0,-180.14]]},{"c":"#5C5148","p":[[121.75,-163.48],[120.92,-163.04],[120.44,-162.55],[121.7,-159.77],[121.91,-158.64],[122.38,-157.54],[122.53,-156.15],[122.24,-155.5],[122.43,-155.43],[122.49,-154.82],[122.85,-154.77],[122.99,-153.46],[123.35,-153.41],[123.63,-150.7],[123.99,-150.65],[124.06,-150.04],[124.32,-150.07],[124.44,-149.73],[124.7,-149.75],[124.83,-149.41],[125.09,-149.44],[125.21,-149.1],[125.48,-149.13],[125.6,-148.79],[125.96,-148.74],[125.99,-148.48],[126.6,-148.54],[126.72,-148.2],[127.86,-148.32],[128.24,-150.57],[129.97,-150.93],[130.58,-151.79],[130.31,-152.64],[130.19,-154.66],[129.95,-155.25],[129.91,-157.28],[130.6,-159.91],[131.52,-161.25],[132.53,-161.71],[132.98,-161.67],[133.37,-161.35],[133.33,-160.91],[132.94,-160.34],[133.1,-159.74],[136.13,-156.08],[136.55,-156.3],[138.22,-159.66],[137.57,-159.15],[137.05,-159.09],[136.57,-159.4],[134.56,-161.74],[133.89,-162.2],[132.9,-162.45],[132.2,-162.38],[131.27,-161.93],[129.79,-160.09],[129.13,-159.67],[128.77,-159.72],[128.18,-160.28],[127.06,-163.34],[126.26,-164.31],[123.46,-164.01]]},{"c":"#1D1B19","p":[[118.05,-218.53],[117.56,-218.13],[116.51,-216.34],[116.08,-213.74],[116.11,-212.68],[115.63,-210.51],[114.97,-209.2],[114.67,-207.94],[114.28,-207.45],[113.92,-207.5],[111.73,-208.95],[110.47,-209.26],[109.99,-209.56],[109.94,-209.2],[108.63,-209.06],[108.52,-209.32],[107.17,-206.17],[107.18,-205.29],[108.22,-203.81],[108.3,-203.02],[108.85,-202.02],[109.21,-200.29],[109.41,-200.05],[109.95,-199.93],[110.2,-198.46],[111.23,-197.86],[111.74,-198.09],[112.94,-199.19],[113.81,-199.37],[114.58,-200.42],[114.9,-201.52],[115.4,-201.83],[117.49,-200.46],[119.19,-198.53],[119.95,-198.08],[119.67,-200.69],[119.31,-200.75],[119.25,-201.36],[118.89,-201.41],[118.79,-202.37],[118.43,-202.42],[118.36,-203.03],[118.1,-203.0],[117.98,-203.34],[117.62,-203.39],[117.55,-204.0],[117.2,-204.05],[117.13,-204.66],[116.87,-204.64],[116.75,-204.98],[116.48,-204.95],[116.36,-205.29],[116.0,-205.34],[115.78,-206.55],[117.05,-209.6],[117.32,-211.22],[117.79,-212.59],[117.66,-213.9],[118.17,-215.72],[118.12,-217.04],[118.32,-217.68]]},{"c":"#6F442B","p":[[115.41,-201.75],[114.99,-201.52],[114.67,-200.43],[113.82,-199.28],[112.95,-199.1],[111.74,-198.0],[111.24,-197.77],[111.91,-196.43],[111.99,-195.65],[111.62,-194.99],[110.85,-194.73],[110.3,-194.94],[109.4,-195.99],[109.12,-196.93],[108.74,-197.16],[107.97,-196.98],[107.25,-196.29],[107.4,-194.01],[108.6,-193.52],[110.47,-193.36],[111.06,-192.81],[111.2,-190.62],[111.57,-190.48],[112.7,-190.6],[113.8,-190.27],[114.76,-189.49],[115.88,-187.32],[116.09,-188.66],[116.91,-190.07],[117.58,-190.41],[118.37,-190.49],[119.08,-190.39],[120.39,-189.73],[120.74,-189.77],[121.24,-190.88],[121.16,-191.58],[118.15,-194.18],[117.67,-195.36],[117.57,-196.32],[117.86,-196.97],[118.45,-197.21],[120.06,-197.03],[120.38,-197.33],[120.35,-197.59],[119.99,-197.64],[119.96,-197.99],[119.11,-198.52],[117.4,-200.45]]},{"c":"#543524","p":[[107.71,-220.27],[106.75,-220.16],[106.78,-219.9],[106.44,-219.78],[106.47,-219.52],[106.13,-219.39],[106.15,-219.13],[105.81,-219.01],[105.76,-218.65],[105.5,-218.62],[105.57,-218.01],[105.23,-217.88],[105.18,-217.53],[104.91,-217.5],[104.98,-216.89],[104.64,-216.76],[104.7,-216.15],[104.36,-216.03],[104.43,-215.42],[104.09,-215.29],[104.15,-214.68],[103.81,-214.56],[103.76,-214.2],[103.5,-214.17],[103.57,-213.56],[103.23,-213.44],[103.25,-213.17],[103.0,-213.06],[103.48,-211.87],[103.17,-209.81],[103.28,-207.88],[103.09,-207.24],[103.19,-206.28],[103.55,-205.35],[103.51,-204.11],[103.05,-203.44],[102.96,-202.64],[103.26,-202.23],[104.3,-201.63],[105.0,-201.7],[105.65,-201.33],[106.41,-201.68],[107.51,-202.94],[107.84,-203.15],[108.2,-203.1],[108.13,-203.8],[107.21,-205.03],[107.03,-205.89],[108.51,-209.4],[108.43,-210.1],[108.77,-210.23],[108.6,-211.88],[108.94,-212.01],[108.72,-212.43],[108.59,-213.65],[108.73,-214.02],[108.37,-214.07]]},{"c":"#6F442B","p":[[112.98,-173.77],[112.48,-173.54],[111.93,-172.86],[110.67,-170.61],[110.28,-169.24],[110.78,-168.76],[110.85,-168.07],[110.54,-167.68],[109.72,-167.86],[108.84,-167.06],[108.78,-166.79],[109.26,-165.6],[109.82,-165.31],[110.33,-165.45],[110.4,-164.75],[110.94,-163.84],[115.49,-160.08],[117.35,-160.01],[118.48,-161.02],[118.3,-161.88],[119.34,-162.87],[119.39,-163.23],[118.34,-164.88],[115.64,-166.98],[114.45,-168.27],[113.8,-169.35],[113.74,-169.96],[114.09,-170.79],[114.57,-171.28],[116.61,-172.03],[116.89,-172.68],[116.2,-173.4],[115.65,-173.61]]},{"c":"#8A5737","p":[[108.12,-203.09],[107.28,-202.65],[106.42,-201.59],[105.66,-201.24],[104.83,-199.92],[102.93,-197.86],[102.53,-196.67],[100.77,-194.1],[99.33,-190.16],[98.38,-189.08],[97.01,-188.76],[97.12,-187.71],[99.67,-187.81],[101.79,-188.65],[102.51,-189.34],[102.34,-191.71],[102.94,-192.75],[103.45,-192.98],[106.32,-193.37],[107.23,-193.91],[107.15,-196.37],[106.83,-196.86],[106.7,-198.09],[107.31,-199.03],[107.75,-198.99],[108.14,-198.68],[108.79,-197.51],[109.18,-197.2],[109.98,-197.2],[110.45,-197.69],[110.1,-197.65],[109.86,-199.92],[109.42,-199.96],[109.12,-200.29],[108.76,-202.01]]},{"c":"#39322D","p":[[138.8,-160.07],[138.3,-159.76],[137.89,-158.65],[136.4,-156.02],[135.95,-156.15],[135.72,-156.66],[133.54,-158.9],[132.87,-160.24],[132.67,-159.6],[132.73,-158.99],[133.8,-157.25],[133.86,-156.73],[133.4,-156.06],[132.53,-155.88],[131.53,-155.33],[131.09,-155.37],[130.27,-156.43],[130.11,-157.92],[129.92,-156.4],[130.28,-154.67],[130.4,-152.65],[130.67,-151.8],[129.98,-150.84],[128.25,-150.48],[127.92,-148.59],[128.16,-148.0],[130.16,-148.21],[130.22,-148.57],[131.87,-148.75],[131.92,-149.11],[133.23,-149.24],[133.28,-149.6],[134.59,-149.74],[134.64,-150.1],[135.95,-150.24],[135.93,-150.5],[136.27,-150.62],[136.24,-150.89],[136.58,-151.01],[136.63,-151.37],[136.89,-151.4],[136.83,-152.01],[137.17,-152.13],[137.07,-153.09],[137.41,-153.22],[137.3,-154.18],[137.64,-154.3],[137.58,-154.91],[137.92,-155.04],[137.97,-155.4],[138.23,-155.42],[138.17,-156.03],[138.51,-156.16],[138.41,-157.12],[138.75,-157.24],[138.68,-157.85],[139.02,-157.98]]},{"c":"#543524","p":[[96.05,-174.45],[96.25,-172.53],[95.91,-172.4],[96.12,-170.39],[95.78,-170.27],[96.0,-168.26],[96.35,-168.21],[96.42,-167.6],[96.68,-167.63],[96.81,-167.29],[97.16,-167.24],[97.19,-166.97],[98.5,-167.11],[98.63,-166.77],[99.24,-166.84],[99.29,-167.2],[100.6,-167.33],[100.72,-166.99],[100.98,-167.02],[101.11,-166.68],[101.47,-166.63],[101.49,-166.37],[102.1,-166.43],[102.23,-166.09],[102.49,-166.12],[102.61,-165.78],[102.97,-165.73],[103.0,-165.47],[103.61,-165.53],[103.74,-165.19],[104.7,-165.3],[104.82,-164.96],[106.13,-165.09],[106.25,-164.75],[107.56,-164.89],[107.69,-164.55],[108.65,-164.66],[108.77,-164.31],[109.04,-164.34],[109.16,-164.0],[109.42,-164.03],[109.55,-163.69],[109.81,-163.72],[109.93,-163.38],[110.19,-163.41],[110.32,-163.07],[110.58,-163.09],[110.7,-162.75],[110.97,-162.78],[111.09,-162.44],[111.35,-162.47],[111.48,-162.13],[111.74,-162.16],[111.86,-161.82],[112.13,-161.84],[112.25,-161.5],[112.51,-161.53],[112.64,-161.19],[112.9,-161.22],[113.02,-160.88],[113.28,-160.91],[113.41,-160.57],[113.77,-160.52],[113.79,-160.25],[114.41,-160.32],[114.53,-159.98],[114.79,-160.01],[114.92,-159.67],[115.27,-159.62],[115.3,-159.35],[115.91,-159.42],[116.04,-159.08],[116.4,-159.03],[116.42,-158.77],[117.03,-158.83],[117.16,-158.49],[117.52,-158.44],[117.55,-158.18],[118.16,-158.24],[118.28,-157.9],[118.54,-157.93],[118.67,-157.59],[118.93,-157.62],[119.05,-157.28],[119.31,-157.31],[119.44,-156.97],[119.8,-156.92],[119.83,-156.65],[120.44,-156.72],[120.56,-156.38],[120.82,-156.41],[120.95,-156.07],[121.31,-156.02],[121.33,-155.75],[122.14,-155.66],[122.37,-155.95],[122.29,-157.53],[121.82,-158.63],[121.62,-159.76],[120.45,-162.46],[120.05,-162.86],[119.51,-162.98],[118.39,-161.89],[118.57,-161.02],[117.61,-160.04],[117.1,-159.9],[115.5,-159.99],[110.86,-163.83],[110.32,-164.74],[110.24,-165.44],[109.83,-165.22],[109.17,-165.59],[109.01,-166.28],[108.59,-166.86],[107.98,-166.79],[106.97,-166.33],[105.84,-166.21],[103.23,-166.64],[100.99,-167.82],[98.32,-170.54],[97.58,-171.69],[96.84,-173.65],[96.52,-174.14]]},{"c":"#6F442B","p":[[109.85,-185.0],[110.0,-184.49],[110.94,-183.08],[114.23,-179.55],[115.74,-178.56],[116.47,-178.37],[116.81,-178.5],[117.1,-179.06],[116.43,-182.87],[115.64,-185.35],[113.67,-185.67],[112.73,-185.31],[111.42,-185.17],[110.26,-185.31]]},{"c":"#8A5737","p":[[100.83,-206.03],[99.62,-204.93],[98.17,-204.43],[98.28,-203.46],[97.94,-203.34],[98.15,-201.33],[97.81,-201.21],[98.02,-199.2],[97.68,-199.08],[97.86,-197.42],[97.52,-197.29],[97.64,-196.16],[98.27,-196.05],[99.3,-196.25],[100.03,-196.94],[100.45,-197.96],[101.26,-202.01],[102.26,-204.24],[101.6,-205.41]]},{"c":"#1D1B19","p":[[107.05,-218.17],[106.46,-217.93],[105.78,-216.8],[104.74,-213.33],[104.06,-208.93],[104.45,-205.18],[104.75,-204.86],[105.26,-205.09],[105.86,-207.71],[107.07,-209.6],[107.59,-211.42],[107.61,-212.84],[107.42,-214.67],[107.18,-215.27]]},{"c":"#8A5737","p":[[105.06,-190.23],[103.08,-188.96],[102.94,-188.6],[103.11,-187.02],[104.6,-184.62],[105.64,-183.94],[106.97,-183.9],[108.94,-185.26],[108.58,-186.99],[107.77,-187.96],[107.7,-188.66],[105.97,-189.98]]},{"c":"#1D1B19","p":[[108.26,-187.57],[109.17,-186.43],[110.43,-185.41],[110.97,-185.3],[112.72,-185.39],[114.48,-186.28],[114.44,-186.72],[113.56,-188.39],[112.62,-189.71],[111.71,-189.17],[111.01,-189.1],[110.53,-189.49],[110.39,-189.91],[109.79,-189.76],[109.22,-189.35],[109.2,-188.64],[108.55,-188.13]]},{"c":"#6F442B","p":[[103.39,-204.36],[102.27,-204.15],[101.34,-202.02],[101.08,-200.32],[101.8,-198.54],[102.75,-197.93],[103.09,-198.06],[104.51,-199.62],[105.58,-201.23],[105.28,-201.56],[104.31,-201.54],[102.98,-202.37],[102.83,-202.98],[103.35,-203.91]]},{"c":"#1D1B19","p":[[132.99,-161.58],[132.46,-161.61],[131.53,-161.16],[130.42,-159.19],[130.14,-157.66],[130.23,-156.78],[130.68,-155.86],[131.26,-155.39],[133.39,-156.15],[133.77,-156.72],[133.71,-157.24],[132.65,-158.98],[132.63,-159.95],[133.31,-161.08]]},{"c":"#E8DDD4","p":[[118.03,-196.99],[117.66,-196.33],[118.03,-194.52],[118.54,-193.87],[121.24,-191.68],[121.43,-193.2],[121.32,-194.25],[120.94,-195.36],[119.89,-196.92],[118.46,-197.12]]},{"c":"#39322D","p":[[110.7,-190.3],[110.5,-189.75],[111.0,-189.18],[111.7,-189.26],[112.61,-189.8],[113.33,-188.9],[114.53,-186.73],[114.57,-186.29],[113.75,-185.68],[115.81,-185.45],[116.08,-186.19],[115.79,-187.31],[115.35,-188.14],[114.36,-189.1],[114.19,-189.87],[113.81,-190.19],[112.71,-190.51]]},{"c":"#1D1B19","p":[[100.95,-208.25],[100.9,-207.89],[98.19,-207.61],[98.4,-205.6],[98.06,-205.47],[98.17,-204.51],[99.61,-205.02],[100.66,-205.92],[101.11,-207.56]]},{"c":"#39322D","p":[[118.26,-220.68],[117.65,-220.61],[117.68,-220.35],[117.34,-220.23],[117.4,-219.61],[117.06,-219.49],[117.13,-218.88],[116.79,-218.75],[116.85,-218.14],[116.51,-218.02],[116.46,-217.66],[116.2,-217.63],[116.51,-216.43],[117.86,-218.6],[118.34,-218.3],[118.32,-217.59],[118.59,-217.62]]},{"c":"#39322D","p":[[117.73,-212.32],[117.14,-209.61],[115.89,-206.39],[116.24,-206.42],[116.21,-206.69],[116.55,-206.81],[116.49,-207.42],[116.83,-207.55],[116.76,-208.16],[117.1,-208.28],[117.04,-208.89],[117.38,-209.02],[117.28,-209.98],[117.62,-210.1],[117.51,-211.06],[117.85,-211.19]]},{"c":"#39322D","p":[[109.13,-189.34],[108.35,-189.17],[107.79,-188.67],[107.86,-187.97],[108.16,-187.65],[108.54,-188.22],[109.12,-188.63]]}]},"staart":{"c":"#7C4B2E","basis":[[-71.16,-148.84,1],[-76.51,-146.98],[-82.33,-141.4],[-85.35,-136.51],[-88.14,-128.14],[-90.23,-117.91],[-90.23,-114.88],[-91.16,-112.33],[-91.16,-107.44],[-93.95,-96.51],[-93.02,-89.77],[-97.67,-67.67],[-97.67,-61.86],[-99.53,-54.65],[-99.53,-52.56],[-97.67,-49.07],[-97.67,-43.26],[-98.6,-40.7],[-98.37,-36.98],[-95.35,-34.88],[-94.65,-32.33],[-93.49,-31.16],[-85.35,-30.0],[-84.19,-29.3],[-83.72,-25.58],[-85.35,-18.6,1],[-79.3,-18.6,1],[-75.81,-74.65],[-72.09,-112.56],[-66.28,-141.16]],"lagen":[{"c":"#1E1E1E","p":[[-72.33,-148.84,1],[-77.21,-146.74],[-82.56,-141.4],[-85.58,-136.28],[-85.58,-135.12],[-88.37,-127.91],[-88.37,-124.88],[-89.3,-123.26],[-89.3,-120.23],[-90.23,-118.6],[-90.23,-114.65],[-91.16,-113.02],[-91.16,-107.21],[-92.09,-105.58],[-92.09,-103.49],[-93.02,-101.86],[-93.02,-98.84],[-93.95,-97.21],[-93.95,-92.79],[-93.02,-91.16],[-93.02,-89.53],[-93.95,-87.91],[-93.95,-83.95],[-94.88,-82.33],[-94.88,-79.3],[-95.81,-77.67],[-95.81,-74.65],[-96.74,-73.02],[-96.74,-70.0],[-97.67,-68.37],[-97.67,-61.63],[-98.6,-60.0],[-98.6,-56.98],[-99.53,-55.35],[-99.53,-51.86],[-97.67,-48.37],[-97.67,-43.02],[-98.6,-41.4],[-98.6,-36.98],[-95.81,-34.65],[-93.95,-31.16,1],[-90.47,-30.93],[-88.84,-30.0],[-86.98,-29.77],[-84.65,-28.14],[-83.72,-25.35],[-84.65,-23.72],[-84.65,-20.7],[-85.58,-19.07],[-85.58,-16.51],[-82.09,-12.79],[-81.16,-10.93],[-80.93,-4.42],[-79.77,-3.26,1],[-76.98,-3.95],[-72.79,-6.05],[-72.09,-6.98,1],[-74.42,-10.7],[-74.65,-12.56],[-75.58,-14.19],[-75.58,-26.05],[-74.65,-27.67],[-74.42,-35.12],[-73.02,-37.21],[-70.7,-37.91],[-67.67,-37.21],[-66.28,-35.12],[-66.05,-31.4],[-65.12,-29.77],[-65.12,-15.58],[-63.26,-13.49],[-61.86,-13.02],[-60.7,-11.86],[-59.53,-9.3],[-59.3,-4.88],[-58.37,-4.19],[-55.58,-4.88],[-51.4,-6.98],[-50.7,-7.91,1],[-53.95,-11.63],[-55.81,-15.35],[-56.05,-20.0],[-56.98,-21.63],[-56.98,-27.44],[-57.91,-29.07],[-57.91,-48.37],[-56.98,-50.0],[-56.74,-51.86],[-55.12,-54.65],[-55.12,-57.67],[-54.42,-59.3,1],[-56.98,-61.4],[-57.21,-62.33],[-58.84,-63.95],[-60.7,-65.12],[-61.63,-66.74],[-62.79,-66.98],[-67.21,-65.12],[-68.84,-65.12],[-73.72,-66.98],[-75.58,-70.0],[-75.58,-71.63],[-74.65,-73.26],[-74.65,-74.42],[-73.72,-76.05],[-71.63,-83.49],[-70.93,-84.42],[-70.93,-94.42],[-72.79,-98.84],[-72.79,-100.93],[-73.72,-102.56],[-73.72,-104.65],[-75.58,-109.07],[-75.58,-111.16],[-76.28,-112.09],[-76.51,-114.88],[-77.44,-116.51],[-77.44,-122.33],[-78.37,-123.95],[-78.37,-127.44],[-77.44,-129.07],[-77.44,-133.95],[-76.51,-135.58],[-76.28,-137.44],[-74.42,-141.16],[-70.93,-145.81],[-70.93,-147.44]]}]}},"tonen":["#1E1E1E","#8E5837","#553A2B","#7C4B2E"],"oog":[112.21,-188.6],"K":1.075,"omtrek":[[117.44,-213.02],[113.72,-215.58,1],[104.42,-205.58],[94.65,-204.19],[75.12,-195.35],[39.77,-166.05],[22.79,-155.58],[10.7,-152.56],[2.09,-152.56],[-33.02,-159.07],[-41.63,-159.07],[-63.02,-153.26],[-76.51,-146.98],[-82.33,-141.4],[-85.35,-136.51],[-90.23,-117.91],[-91.16,-107.44],[-93.95,-96.51],[-93.02,-89.77],[-97.67,-67.67],[-99.53,-52.56],[-97.67,-49.07],[-98.37,-36.98,1],[-95.35,-34.88],[-93.49,-31.16,1],[-85.35,-30.0],[-83.72,-28.37],[-85.58,-17.21],[-80.93,-10.0],[-81.86,-1.63],[-81.16,0.93,1],[-68.14,0.93,1],[-75.58,-14.42],[-75.58,-25.81],[-73.72,-42.56],[-71.16,-50.0],[-69.07,-51.4,1],[-66.98,-49.77],[-66.05,-43.49],[-65.12,-16.28],[-60.0,-10.47],[-59.77,-2.09],[-55.58,0.7],[-47.91,0.7],[-46.28,-0.47,1],[-56.05,-16.28],[-57.91,-29.3],[-57.91,-48.14],[-53.26,-64.19],[-50.7,-68.37],[-47.44,-80.7],[-43.95,-88.6],[-38.37,-97.67,1],[-33.72,-97.67],[-29.53,-100.7],[-25.12,-100.23],[-15.58,-95.35],[-0.7,-90.47],[38.6,-88.84,1],[39.07,-77.67],[38.14,-75.12],[37.21,-44.19],[32.56,-22.09],[33.02,-17.67],[37.21,-10.93],[36.51,-2.56],[39.3,-0.23],[50.0,-0.93,1],[41.63,-16.28],[42.56,-37.91],[47.44,-53.95],[48.84,-54.88,1],[50.0,-53.95],[52.09,-46.28],[51.16,-18.14],[57.21,-9.53],[56.98,-0.7],[59.77,1.63],[69.3,1.63],[70.93,0.47,1],[70.47,-2.09],[63.02,-11.63],[61.4,-15.35],[59.3,-37.91],[62.09,-55.35],[62.09,-68.6],[66.74,-93.72],[72.79,-99.77],[76.74,-108.37],[77.91,-129.07],[93.72,-163.95],[96.28,-166.51],[102.56,-167.67],[110.0,-165.81],[113.95,-162.09],[117.44,-161.16],[122.33,-157.44],[126.98,-151.86],[133.26,-151.86],[136.51,-155.12],[139.3,-161.63],[133.72,-173.49],[129.07,-179.3],[122.56,-192.09],[116.05,-199.77],[116.05,-204.19],[118.84,-210.93,1]],"neusgat":[134.88,-162.79],"mond":[[120.93,-156.28],[133.02,-154.42]],"keelweb":{"p":[[99.87,-167.76,1],[99.88,-167.76,1],[98.73,-198.34,1],[98.72,-198.34,1]],"kop":[0,1,1,0]}},"ezel":{"J":{"midrug":[0.0,-109.25],"nekBasis":[52.38,-87.55],"lend":[-18.71,-110.0],"kruis":[-37.41,-105.51],"kop":[67.35,-126.46],"neus":[92.79,-92.79],"kaak":[69.59,-104.01],"kin":[86.05,-91.29],"schoft":[29.93,-100.27],"schouder":[48.64,-74.08],"elleboog":[32.93,-59.12],"pols":[32.18,-29.18],"vkogel":[32.18,-8.23],"vteen":[39.66,0.0],"heup":[-35.92,-83.81],"knie":[-26.94,-68.84],"hak":[-44.9,-32.93],"akogel":[-46.39,-10.48],"ateen":[-40.41,0.0],"staart0":[-49.39,-94.29],"staart1":[-52.38,-74.08],"staart2":[-54.63,-56.87],"staart3":[-56.87,-41.9],"staart4":[-58.37,-28.44]},"delen":{"romp":{"c":"#7D726D","basis":[[-46.39,-101.39],[-46.21,-92.6],[-47.14,-87.93],[-47.14,-76.51],[-45.27,-75.02],[-43.4,-67.16],[-43.4,-57.99],[-41.9,-56.68],[-41.9,-55.75],[-40.22,-54.06],[-39.29,-54.06],[-37.23,-52.57],[-34.05,-52.57],[-33.49,-51.82],[-31.8,-51.82],[-31.24,-52.57],[-28.06,-52.57],[-27.5,-53.32],[-26.56,-53.32],[-25.44,-54.25],[-20.77,-62.11],[-18.52,-63.79],[-17.02,-63.61],[-8.04,-58.74],[2.43,-56.31],[9.35,-56.31],[11.41,-57.06],[14.59,-57.06],[19.64,-58.55],[22.64,-58.55],[24.88,-56.31],[25.82,-56.31],[26.38,-55.56],[29.56,-55.56],[30.12,-54.81],[32.55,-54.81],[33.11,-55.56],[36.29,-55.56],[36.85,-56.31],[37.79,-56.31],[40.22,-57.99],[40.97,-60.8],[46.21,-67.35],[49.39,-74.64],[51.45,-77.82,1],[20.2,-108.69,1],[16.84,-107.76],[9.17,-107.76],[7.11,-108.5],[1.68,-108.5],[-0.37,-109.25],[-3.55,-109.25],[-14.59,-111.5],[-17.77,-111.5],[-22.07,-112.99],[-26.75,-112.99],[-36.11,-110.0],[-41.16,-106.63]],"lagen":[{"c":"#BEB5AD","p":[[-22.45,-69.22],[-22.45,-67.16],[-20.39,-63.42,1],[-18.33,-63.61],[-17.59,-63.04],[-16.09,-62.86],[-7.86,-58.55],[-6.92,-58.55],[-5.61,-57.81],[-3.93,-57.81],[-2.62,-57.06],[0.56,-57.06],[1.87,-56.31],[9.91,-56.31],[11.22,-57.06],[15.15,-57.06],[15.9,-57.62],[18.15,-57.81],[19.46,-58.55],[22.64,-58.55],[24.51,-60.43],[24.51,-64.73],[22.64,-66.6],[18.33,-66.6],[17.02,-65.85],[5.24,-65.85],[3.93,-66.6],[0.75,-66.6],[-0.56,-67.35],[-2.99,-67.35],[-4.3,-68.1],[-5.99,-68.1],[-7.3,-68.84],[-8.98,-68.84],[-10.29,-69.59],[-14.03,-70.53],[-17.77,-72.59],[-20.2,-72.4],[-21.51,-71.09]]}]},"hum":{"c":"#7D726D","basis":[[20.2,-104.57,1],[22.45,-64.73],[26.56,-57.06,1],[39.85,-57.06,1],[40.97,-60.8],[46.21,-67.35],[49.39,-74.64],[51.63,-78.38,1],[31.24,-105.88,1]],"lagen":[]},"dij":{"c":"#7D726D","basis":[[-40.22,-107.19],[-46.77,-101.02],[-48.27,-98.96],[-46.21,-92.6],[-49.01,-76.14,1],[-46.39,-76.33],[-45.27,-75.02],[-44.34,-71.65,1],[-31.8,-69.59],[-24.88,-64.17,1],[-18.71,-67.53],[-12.72,-107.19,1]],"lagen":[]},"nek":{"c":"#7D726D","basis":[[60.8,-139.0,1],[58.93,-136.56],[56.87,-135.82],[51.26,-130.77],[45.65,-127.59],[29.0,-113.37],[22.82,-109.44],[17.4,-107.94,1],[17.4,-97.47],[31.43,-67.35,1],[46.21,-67.35,1],[49.95,-75.77],[58.18,-87.55],[60.05,-91.29],[61.36,-92.6],[63.79,-92.98],[64.73,-93.72,1],[66.22,-92.98,1],[66.04,-98.03]],"lagen":[{"c":"#262120","p":[[59.86,-136.56],[59.3,-136.75],[56.87,-136.0],[52.01,-131.14],[47.89,-129.27],[46.77,-128.15],[45.65,-127.77],[41.53,-123.66],[40.41,-123.28],[36.29,-119.17],[35.17,-118.79],[31.8,-115.43],[30.68,-115.05],[28.81,-113.18],[27.69,-112.81],[24.88,-110.75],[24.69,-108.32],[26.0,-106.82],[27.5,-103.83],[27.69,-102.52,1],[31.43,-101.02,1],[31.24,-102.89],[30.49,-104.2],[30.49,-107.01],[31.43,-109.06],[32.36,-110.0],[33.86,-110.19],[35.73,-111.12],[38.35,-113.74],[39.47,-114.12],[42.84,-117.48],[43.96,-117.86],[50.32,-123.47],[51.45,-123.84],[53.32,-125.71],[54.44,-126.09],[55.56,-127.21],[56.68,-127.59],[59.49,-129.64],[60.43,-131.51],[60.43,-135.82]]},{"c":"#262120","p":[[60.99,-138.06,1],[60.05,-138.06],[58.74,-136.75],[56.68,-136.0],[51.07,-130.95],[45.46,-127.77],[31.8,-115.8],[22.82,-109.81,1],[22.82,-108.13],[23.57,-107.38],[24.51,-107.19],[26.19,-105.51],[26.38,-103.83],[27.31,-102.33],[31.8,-100.83,1],[31.8,-103.64],[30.31,-106.26],[30.49,-107.76],[31.43,-108.69],[35.36,-110.37],[36.67,-111.68],[37.6,-111.87],[42.65,-116.92],[43.59,-117.11],[45.65,-119.17],[46.58,-119.35],[50.14,-122.91],[51.07,-123.1],[53.13,-125.15],[54.06,-125.34],[55.37,-126.65],[56.31,-126.84],[57.62,-128.15],[58.55,-128.33],[60.24,-130.02],[60.24,-131.14],[60.99,-132.26]]}]},"kop":{"c":"#7C716C","basis":[[73.46,-165.87],[72.84,-165.49],[72.84,-165.31],[71.84,-164.0],[71.84,-163.56],[70.59,-161.25],[70.59,-160.82],[69.84,-159.76],[69.84,-159.32],[69.59,-159.01],[69.59,-158.57],[69.35,-158.26],[69.35,-157.82],[68.85,-156.83],[67.85,-155.77],[67.85,-155.33],[64.11,-148.03],[64.11,-147.6],[63.61,-147.04],[63.61,-146.6],[63.36,-146.29],[63.36,-145.85],[62.86,-145.04],[62.86,-144.6],[62.61,-144.29],[62.61,-143.86],[62.11,-143.3],[62.11,-142.86],[61.86,-142.55],[61.86,-142.11],[61.61,-141.8],[61.61,-141.36],[61.36,-141.05],[61.36,-140.12],[61.11,-139.8],[61.11,-138.12],[60.87,-137.81],[60.87,-136.37],[60.62,-136.06],[60.55,-135.31],[60.43,-135.25],[59.99,-135.44],[59.87,-135.13],[59.43,-134.75],[58.68,-135.19],[58.25,-135.19],[57.44,-135.94],[57.0,-135.94],[56.87,-135.81],[56.87,-135.13],[56.63,-134.82],[56.63,-134.13],[55.94,-133.44],[55.5,-133.44],[55.0,-133.69],[54.63,-133.32],[54.63,-132.88],[54.38,-132.57],[54.38,-131.39],[54.63,-131.07],[54.63,-128.89],[54.88,-128.58],[54.88,-126.65],[55.13,-126.34],[55.13,-124.15],[55.38,-123.84],[55.38,-121.66],[55.63,-121.35],[55.63,-119.16],[55.88,-118.85],[55.88,-116.92],[56.13,-116.61],[56.13,-114.43],[56.38,-114.11],[56.38,-111.93],[56.63,-111.62],[56.63,-109.44],[56.87,-109.13],[56.87,-106.94],[57.12,-106.63],[57.12,-104.7],[57.37,-104.39],[57.37,-102.2],[57.62,-101.89],[57.62,-99.71],[57.87,-99.4],[57.87,-97.47],[58.12,-97.15],[58.12,-94.97],[58.37,-94.66],[58.37,-93.97],[58.87,-93.16],[59.24,-92.85],[59.93,-92.85],[60.18,-92.67],[60.49,-92.85],[61.18,-92.85],[61.49,-93.1],[62.99,-95.35],[63.67,-95.35],[64.23,-94.85],[64.42,-94.85],[65.48,-94.1],[65.92,-94.1],[66.23,-93.85],[66.91,-93.85],[67.41,-93.6],[68.91,-92.1],[69.41,-91.85],[70.47,-90.86],[70.65,-90.86],[71.22,-90.36],[71.4,-90.36],[72.21,-89.61],[72.4,-89.61],[72.96,-89.11],[73.65,-88.86],[74.46,-88.11],[75.95,-87.37],[76.39,-87.37],[77.58,-86.18],[78.57,-84.0],[79.7,-82.88],[80.38,-82.63],[80.94,-82.13],[81.38,-82.13],[81.69,-81.88],[82.13,-81.88],[82.44,-81.63],[82.88,-81.63],[83.19,-81.38],[83.87,-81.38],[84.37,-81.13],[84.68,-81.38],[85.37,-81.38],[85.93,-81.88],[86.37,-81.88],[86.68,-82.13],[87.37,-82.13],[87.68,-82.38],[88.36,-82.38],[89.42,-83.13],[89.73,-83.5],[89.73,-83.69],[90.48,-84.5],[90.48,-84.68],[91.23,-85.74],[91.23,-86.18],[91.98,-87.24],[91.98,-87.68],[92.23,-87.99],[92.23,-88.43],[92.48,-88.74],[92.48,-89.17],[92.73,-89.49],[92.73,-90.92],[92.98,-91.23],[92.98,-93.66],[92.23,-94.72],[92.23,-95.41],[91.48,-96.72],[91.48,-97.4],[89.98,-100.21],[89.98,-100.65],[88.99,-102.64],[88.49,-103.2],[88.49,-103.64],[86.74,-106.94],[86.74,-107.38],[86.24,-108.19],[86.24,-108.63],[85.49,-109.94],[85.49,-110.37],[85.25,-110.69],[85.25,-111.12],[84.75,-111.93],[84.75,-112.37],[84.5,-112.68],[84.5,-113.37],[84.0,-114.18],[84.0,-114.86],[83.75,-115.17],[83.75,-118.35],[83.25,-119.35],[82.5,-120.16],[82.5,-120.35],[81.75,-121.16],[81.5,-121.66],[80.76,-122.41],[80.76,-122.59],[80.01,-123.4],[79.76,-123.9],[78.76,-124.9],[78.51,-125.4],[75.95,-127.96],[74.89,-128.7],[74.71,-128.7],[74.27,-129.14],[74.27,-129.58],[74.52,-130.08],[75.77,-131.64],[75.77,-132.07],[76.52,-132.88],[76.52,-133.32],[77.01,-133.88],[77.26,-134.38],[77.26,-134.82],[78.01,-135.88],[78.01,-136.31],[78.76,-137.37],[78.76,-137.81],[79.01,-138.31],[79.51,-138.87],[79.51,-139.55],[80.26,-140.61],[80.26,-141.3],[81.01,-142.61],[81.01,-143.3],[81.5,-144.11],[81.5,-144.54],[81.75,-144.85],[81.75,-146.29],[82.0,-146.6],[82.0,-147.54],[82.25,-147.85],[82.25,-148.53],[82.5,-148.84],[82.5,-151.28],[82.75,-151.59],[82.75,-153.27],[83.0,-153.58],[83.0,-154.02],[82.81,-154.33],[83.0,-154.58],[83.0,-155.27],[83.25,-155.58],[83.25,-156.26],[83.5,-156.58],[83.5,-158.76],[83.75,-159.07],[83.75,-160.26],[84.0,-160.57],[84.0,-163.75],[83.37,-164.62],[82.69,-164.62],[82.06,-164.0],[81.82,-163.5],[81.82,-163.06],[81.32,-162.5],[79.57,-158.82],[79.07,-158.26],[78.57,-157.26],[78.57,-156.83],[78.07,-156.26],[77.08,-154.27],[77.08,-153.08],[76.83,-152.77],[76.83,-151.84],[75.89,-150.9],[75.21,-150.9],[74.83,-150.53],[74.83,-150.34],[74.33,-149.78],[73.83,-148.66],[73.65,-148.53],[73.52,-148.66],[73.52,-149.78],[73.27,-150.09],[73.27,-151.03],[73.52,-151.34],[73.52,-152.27],[73.77,-152.59],[73.77,-153.02],[74.27,-153.33],[74.52,-153.83],[74.52,-154.52],[74.77,-154.83],[74.77,-159.76],[75.02,-160.07],[75.02,-164.74],[74.77,-165.24],[74.15,-165.87]],"lagen":[{"c":"#CDC4BD","p":[[88.43,-102.64],[87.24,-102.33],[86.12,-101.77],[84.37,-100.58],[83.37,-99.65],[82.75,-98.71],[80.88,-95.16],[79.82,-94.04],[78.51,-93.1],[77.76,-92.35],[77.14,-91.29],[76.89,-90.3],[76.89,-87.43],[77.76,-86.37],[77.95,-85.49],[78.39,-84.56],[80.01,-82.94],[80.44,-82.69],[81.32,-82.44],[81.88,-82.44],[82.44,-83.56],[81.82,-85.43],[81.82,-85.93],[81.13,-86.93],[81.19,-87.05],[81.5,-86.87],[82.0,-85.99],[82.25,-85.99],[83.69,-84.75],[84.0,-84.62],[84.5,-84.62],[85.0,-84.81],[86.12,-85.68],[86.31,-86.12],[86.18,-86.93],[85.18,-88.11],[84.62,-89.67],[84.68,-91.11],[85.0,-91.92],[85.43,-92.42],[85.68,-92.48],[85.93,-92.23],[86.06,-91.17],[86.55,-90.61],[87.18,-91.73],[88.05,-92.6],[88.36,-92.67],[88.67,-92.54],[89.49,-91.67],[90.17,-91.67],[91.23,-91.92],[91.85,-92.54],[92.29,-93.23],[92.35,-94.54],[91.92,-95.28],[91.67,-96.53],[91.48,-96.59],[91.48,-96.84],[91.11,-97.22],[90.61,-98.15],[90.23,-99.65],[89.67,-100.52],[89.61,-101.02],[89.24,-101.89]]},{"c":"#655C57","p":[[70.97,-155.27],[70.47,-155.08],[70.59,-154.77],[70.22,-154.14],[69.97,-154.27],[69.35,-153.52],[68.97,-153.46],[68.66,-153.96],[68.66,-155.27],[68.53,-155.39],[68.22,-155.33],[67.97,-155.08],[66.79,-152.46],[67.29,-152.52],[68.78,-152.34],[69.72,-153.83],[69.91,-153.83],[70.16,-153.46],[70.09,-152.77],[69.47,-151.09],[69.41,-149.72],[68.35,-145.35],[67.41,-139.18],[66.98,-135.56],[67.1,-134.44],[67.47,-133.82],[67.91,-133.94],[68.35,-134.63],[69.59,-137.93],[70.47,-139.55],[70.97,-142.17],[72.84,-144.6],[73.83,-147.22],[73.9,-147.97],[73.21,-147.35],[72.77,-147.72],[72.84,-148.03],[72.65,-148.22],[72.4,-148.97],[72.34,-151.09],[72.03,-151.9],[72.03,-152.77],[71.71,-153.4],[71.4,-154.77]]},{"c":"#CDC4BD","p":[[69.16,-114.99],[68.78,-114.11],[68.78,-113.62],[69.1,-112.8],[69.91,-111.93],[71.53,-110.75],[73.46,-109.94],[76.27,-109.44],[77.58,-108.88],[78.26,-108.88],[78.89,-109.44],[79.26,-110.81],[79.26,-112.18],[79.01,-113.18],[77.95,-114.99],[77.2,-115.98],[76.2,-116.92],[74.96,-117.36],[74.08,-117.36],[72.65,-117.04],[70.53,-116.23],[69.97,-115.86]]},{"c":"#241D1A","p":[[74.27,-165.87],[73.34,-165.87],[73.27,-165.62],[72.84,-165.62],[72.84,-165.18],[72.59,-165.12],[72.52,-164.87],[72.34,-164.87],[72.34,-164.43],[72.09,-164.37],[72.03,-164.12],[71.84,-164.12],[71.84,-163.43],[71.59,-163.37],[71.59,-162.94],[71.34,-162.87],[71.34,-162.44],[71.09,-162.37],[71.09,-161.94],[70.84,-161.88],[70.84,-161.44],[70.59,-161.38],[70.59,-160.69],[70.34,-160.63],[70.28,-160.38],[70.09,-160.38],[70.09,-159.94],[69.84,-159.88],[69.84,-159.19],[69.59,-159.13],[69.59,-158.45],[69.35,-158.38],[69.35,-157.7],[69.1,-157.64],[69.1,-157.2],[68.85,-157.14],[68.85,-156.7],[68.6,-156.64],[69.16,-156.08],[69.28,-155.33],[69.59,-155.02],[70.22,-155.14],[70.65,-155.7],[71.03,-155.83],[71.59,-155.77],[71.84,-155.52],[72.28,-154.33],[72.21,-152.46],[72.46,-151.9],[72.46,-148.97],[72.71,-148.22],[73.02,-147.97],[73.65,-147.97],[74.08,-148.47],[74.27,-149.41],[74.08,-149.41],[74.08,-148.97],[73.83,-148.91],[73.83,-148.47],[73.52,-148.47],[73.52,-149.9],[73.27,-149.97],[73.27,-151.15],[73.52,-151.21],[73.52,-152.4],[73.77,-152.46],[73.77,-153.15],[74.27,-153.21],[74.27,-153.65],[74.52,-153.71],[74.52,-154.64],[74.77,-154.71],[74.77,-159.88],[75.02,-159.94],[75.02,-164.87],[74.77,-164.93],[74.77,-165.37],[74.58,-165.37],[74.52,-165.62],[74.27,-165.68]]},{"c":"#241D1A","p":[[83.5,-164.62],[82.56,-164.62],[82.56,-164.43],[82.31,-164.37],[82.25,-164.12],[82.06,-164.12],[82.06,-163.68],[81.82,-163.62],[81.82,-162.94],[81.57,-162.87],[81.5,-162.62],[81.32,-162.62],[81.32,-162.19],[81.07,-162.13],[81.07,-161.69],[80.82,-161.63],[80.82,-161.19],[80.57,-161.13],[80.57,-160.69],[80.32,-160.63],[80.32,-160.19],[80.07,-160.13],[80.07,-159.69],[79.82,-159.63],[79.82,-159.2],[79.57,-159.13],[79.57,-158.7],[79.32,-158.63],[79.26,-158.38],[79.07,-158.38],[79.07,-157.95],[78.82,-157.89],[78.82,-157.45],[78.57,-157.39],[78.57,-156.7],[78.32,-156.64],[78.26,-156.39],[78.07,-156.39],[78.07,-155.95],[77.82,-155.89],[77.82,-155.45],[77.58,-155.39],[77.58,-154.96],[77.33,-154.89],[77.33,-154.46],[77.08,-154.39],[77.08,-152.96],[76.83,-152.9],[76.83,-151.71],[76.58,-151.65],[76.58,-151.46],[76.33,-151.4],[76.33,-151.21],[76.08,-151.15],[76.02,-150.9],[75.08,-150.9],[75.08,-150.72],[74.83,-150.65],[74.83,-150.47],[78.14,-151.4],[78.88,-151.46],[79.45,-151.84],[80.26,-151.96],[81.25,-153.08],[81.69,-153.96],[83.0,-154.08],[82.75,-154.21],[82.75,-154.39],[83.0,-154.46],[83.0,-155.39],[83.25,-155.45],[83.25,-156.39],[83.5,-156.45],[83.5,-158.88],[83.75,-158.95],[83.75,-160.38],[84.0,-160.44],[84.0,-163.87],[83.75,-163.93],[83.75,-164.37],[83.56,-164.37]]},{"c":"#484443","p":[[92.73,-94.29],[92.54,-94.29],[92.48,-94.54],[92.35,-94.47],[92.48,-93.29],[92.42,-92.42],[91.85,-91.92],[90.98,-91.48],[89.8,-91.42],[88.67,-92.48],[88.36,-92.6],[87.8,-92.35],[88.36,-92.17],[88.61,-91.92],[89.8,-89.73],[89.8,-87.8],[89.49,-87.24],[89.24,-87.12],[88.86,-87.18],[87.8,-87.74],[86.87,-88.55],[86.8,-90.67],[87.3,-91.79],[86.62,-90.61],[86.74,-88.92],[87.12,-87.61],[86.49,-87.43],[86.24,-87.18],[86.37,-86.12],[86.18,-85.68],[85.0,-84.75],[84.5,-84.56],[84.0,-84.56],[83.69,-84.68],[82.25,-85.93],[81.88,-85.87],[81.88,-85.43],[82.56,-83.37],[83.06,-82.81],[84.0,-82.13],[83.87,-81.94],[80.44,-82.63],[80.01,-82.88],[78.57,-84.25],[78.57,-83.87],[78.76,-83.87],[78.82,-83.62],[79.01,-83.62],[79.07,-83.37],[79.26,-83.37],[79.32,-83.13],[79.57,-83.06],[79.57,-82.88],[80.01,-82.88],[80.07,-82.63],[80.51,-82.63],[80.57,-82.38],[80.82,-82.31],[80.82,-82.13],[81.5,-82.13],[81.57,-81.88],[82.25,-81.88],[82.31,-81.63],[83.0,-81.63],[83.06,-81.38],[84.0,-81.38],[84.06,-81.13],[84.5,-81.13],[84.56,-81.38],[85.49,-81.38],[85.49,-81.57],[85.74,-81.63],[85.81,-81.88],[86.49,-81.88],[86.55,-82.13],[87.49,-82.13],[87.55,-82.38],[88.49,-82.38],[88.49,-82.56],[88.74,-82.63],[88.8,-82.88],[89.24,-82.88],[89.24,-83.06],[89.49,-83.13],[89.55,-83.37],[89.73,-83.37],[89.73,-83.81],[89.98,-83.87],[89.98,-84.06],[90.23,-84.12],[90.3,-84.37],[90.48,-84.37],[90.48,-84.81],[90.73,-84.87],[90.79,-85.12],[90.98,-85.12],[90.98,-85.56],[91.23,-85.62],[91.23,-86.31],[91.48,-86.37],[91.54,-86.62],[91.73,-86.62],[91.73,-87.05],[91.98,-87.12],[91.98,-87.8],[92.23,-87.86],[92.23,-88.55],[92.48,-88.61],[92.48,-89.3],[92.73,-89.36],[92.73,-91.04],[92.98,-91.11],[92.98,-93.79],[92.73,-93.85]]},{"c":"#CDC4BD","p":[[68.78,-151.34],[68.16,-149.97],[66.98,-145.91],[66.04,-141.74],[65.48,-138.06],[65.11,-134.13],[63.67,-128.27],[63.61,-126.09],[63.73,-125.52],[64.11,-125.21],[64.48,-125.28],[65.11,-125.71],[66.85,-127.46],[67.35,-128.14],[67.91,-129.52],[67.6,-130.14],[66.79,-131.07],[66.73,-132.38],[66.98,-136.37],[68.16,-144.6],[69.41,-150.09],[69.41,-151.09]]},{"c":"#A89E96","p":[[82.06,-153.21],[81.63,-153.02],[80.63,-151.71],[80.07,-150.03],[79.26,-148.66],[79.13,-147.35],[78.64,-145.66],[78.82,-145.79],[79.13,-145.66],[79.13,-144.73],[78.64,-143.79],[78.26,-143.48],[78.01,-143.67],[76.89,-140.18],[75.33,-136.75],[75.52,-136.75],[75.71,-136.5],[76.08,-135.13],[76.52,-134.13],[77.45,-135.63],[79.45,-139.55],[79.51,-140.18],[80.51,-142.48],[80.88,-144.04],[81.32,-144.98],[81.38,-145.66],[81.69,-146.41],[81.63,-147.1],[82.13,-149.22],[82.19,-150.03],[82.5,-150.4],[82.5,-151.4],[82.75,-151.46],[82.75,-151.9],[82.5,-152.09]]},{"c":"#241D1A","p":[[60.62,-136.0],[60.62,-135.25],[60.37,-135.19],[60.3,-135.44],[59.87,-135.44],[59.87,-135.0],[59.62,-134.94],[59.56,-134.69],[59.37,-134.69],[59.31,-134.94],[58.87,-134.94],[58.81,-135.19],[58.12,-135.19],[58.06,-135.44],[57.87,-135.44],[57.81,-135.69],[57.56,-135.75],[57.56,-135.94],[56.87,-135.94],[56.87,-135.0],[56.63,-134.94],[56.63,-134.0],[56.38,-133.94],[56.38,-133.76],[56.13,-133.69],[56.06,-133.44],[55.38,-133.44],[55.32,-133.69],[54.88,-133.69],[54.88,-133.51],[54.63,-133.44],[54.63,-132.76],[54.38,-132.7],[54.38,-131.26],[54.63,-131.2],[54.63,-128.77],[54.88,-128.7],[54.88,-127.33],[55.32,-127.4],[57.12,-128.52],[58.5,-129.08],[59.81,-130.14],[59.93,-130.45],[59.87,-131.64],[60.24,-132.45],[60.24,-133.01],[60.68,-134.82]]},{"c":"#241D1A","p":[[70.41,-114.3],[70.41,-113.93],[70.72,-113.43],[72.09,-112.24],[72.96,-111.81],[75.46,-111.74],[76.2,-111.93],[76.95,-111.43],[77.26,-111.43],[77.58,-111.68],[77.7,-111.99],[77.64,-112.87],[76.95,-114.05],[75.46,-115.42],[74.71,-115.92],[74.08,-115.98],[73.02,-115.67],[71.53,-114.86],[70.72,-114.68]]},{"c":"#655C57","p":[[59.24,-99.96],[59.0,-99.52],[59.06,-95.35],[58.68,-93.35],[58.87,-93.29],[58.87,-93.1],[59.12,-93.04],[59.12,-92.85],[60.06,-92.85],[60.12,-92.6],[60.3,-92.6],[60.37,-92.85],[61.3,-92.85],[61.3,-93.04],[61.55,-93.1],[61.99,-94.29],[62.61,-94.85],[62.8,-94.85],[62.8,-95.28],[63.55,-95.35],[63.24,-95.85],[60.87,-98.15],[59.62,-99.9]]},{"c":"#A89E96","p":[[70.65,-139.55],[70.41,-139.43],[69.66,-137.93],[68.29,-134.38],[67.97,-133.94],[67.66,-133.76],[67.72,-133.13],[67.47,-132.76],[67.29,-132.76],[67.16,-132.94],[67.41,-133.82],[67.04,-134.44],[66.98,-135.5],[66.79,-131.26],[67.04,-130.76],[67.66,-130.14],[67.91,-129.58],[69.1,-131.64],[69.16,-132.13],[69.72,-133.57],[69.72,-134.07],[70.28,-135.5],[70.47,-137.06],[71.03,-138.74],[70.97,-139.24]]},{"c":"#CDC4BD","p":[[75.52,-136.69],[75.27,-136.69],[74.83,-136.0],[72.77,-131.82],[72.65,-131.2],[72.71,-130.51],[72.96,-130.08],[73.34,-129.83],[73.96,-129.76],[74.58,-130.26],[76.33,-133.19],[76.45,-134.13]]},{"c":"#484443","p":[[71.59,-155.7],[70.78,-155.7],[70.22,-155.08],[69.59,-154.95],[69.28,-155.2],[69.16,-155.95],[68.72,-156.45],[68.35,-156.39],[68.35,-156.2],[68.1,-156.14],[68.04,-155.89],[67.85,-155.89],[67.85,-155.2],[67.6,-155.14],[67.6,-154.71],[67.35,-154.64],[67.35,-154.21],[67.1,-154.14],[67.1,-153.71],[66.85,-153.65],[66.85,-153.21],[66.6,-153.15],[66.6,-152.71],[66.35,-152.65],[66.35,-152.21],[66.1,-152.15],[66.1,-151.71],[65.85,-151.65],[65.85,-151.21],[65.6,-151.15],[65.6,-150.72],[65.35,-150.65],[65.35,-150.22],[65.11,-150.15],[65.11,-149.72],[64.86,-149.66],[64.86,-149.22],[64.61,-149.16],[64.61,-148.72],[64.36,-148.66],[64.36,-148.22],[64.11,-148.16],[64.11,-147.47],[63.86,-147.41],[63.8,-147.16],[63.61,-147.16],[63.61,-146.48],[63.36,-146.41],[63.36,-145.73],[63.11,-145.66],[63.11,-145.23],[62.86,-145.17],[62.86,-144.48],[62.61,-144.42],[62.61,-143.73],[62.36,-143.67],[62.3,-143.42],[62.11,-143.42],[62.11,-142.73],[61.86,-142.67],[61.86,-141.99],[61.61,-141.92],[61.61,-141.24],[61.36,-141.18],[61.36,-139.99],[61.11,-139.93],[61.11,-138.0],[60.87,-137.93],[60.87,-136.25],[60.62,-136.19],[60.74,-134.82],[60.3,-133.01],[60.3,-132.45],[59.93,-131.64],[59.99,-130.45],[59.87,-130.2],[60.43,-131.2],[60.43,-132.7],[61.05,-135.31],[61.11,-136.25],[61.36,-136.94],[61.36,-138.99],[61.61,-139.68],[61.61,-140.24],[61.99,-141.67],[63.36,-144.85],[63.92,-146.66],[65.23,-149.41],[65.35,-149.9],[66.23,-151.28],[67.91,-155.08],[68.35,-155.45],[68.72,-155.27],[68.72,-153.96],[68.97,-153.52],[69.35,-153.58],[69.66,-153.9],[70.53,-155.2],[70.97,-155.33],[71.28,-155.08],[71.59,-154.46],[71.78,-153.4],[72.09,-152.77],[72.09,-151.9],[72.34,-151.15],[72.4,-151.9],[72.15,-152.46],[72.21,-154.33],[71.96,-155.14]]},{"c":"#241D1A","p":[[87.74,-92.23],[87.37,-91.85],[86.87,-90.67],[86.87,-88.74],[87.18,-88.24],[87.99,-87.68],[89.24,-87.18],[89.55,-87.37],[89.73,-87.8],[89.73,-89.73],[88.55,-91.92],[88.11,-92.23]]},{"c":"#484443","p":[[74.52,-130.14],[74.02,-129.76],[74.15,-128.95],[75.14,-128.33],[75.83,-127.52],[76.83,-126.96],[77.26,-126.09],[78.26,-125.03],[79.07,-124.4],[79.38,-123.72],[80.13,-123.03],[80.88,-121.72],[82.81,-119.66],[83.5,-117.36],[83.5,-115.67],[83.75,-113.99],[84.37,-112.62],[84.81,-111.06],[85.18,-110.37],[85.31,-109.56],[86.8,-106.13],[87.99,-104.14],[88.43,-102.7],[89.24,-101.96],[89.24,-102.27],[88.99,-102.33],[88.99,-102.77],[88.8,-102.77],[88.74,-103.02],[88.49,-103.08],[88.49,-103.76],[88.24,-103.83],[88.24,-104.26],[87.99,-104.33],[87.99,-104.76],[87.74,-104.82],[87.74,-105.26],[87.49,-105.32],[87.49,-105.76],[87.24,-105.82],[87.24,-106.26],[86.99,-106.32],[86.99,-106.76],[86.74,-106.82],[86.74,-107.51],[86.49,-107.57],[86.49,-108.0],[86.24,-108.07],[86.24,-108.75],[85.99,-108.81],[85.99,-109.25],[85.74,-109.31],[85.74,-109.75],[85.49,-109.81],[85.49,-110.5],[85.25,-110.56],[85.25,-111.25],[85.0,-111.31],[85.0,-111.75],[84.75,-111.81],[84.75,-112.49],[84.5,-112.56],[84.5,-113.49],[84.25,-113.55],[84.25,-113.99],[84.0,-114.05],[84.0,-114.99],[83.75,-115.05],[83.75,-118.48],[83.5,-118.54],[83.5,-118.98],[83.25,-119.04],[83.25,-119.48],[83.06,-119.48],[83.0,-119.73],[82.81,-119.73],[82.75,-119.98],[82.5,-120.04],[82.5,-120.47],[82.31,-120.47],[82.25,-120.72],[82.07,-120.72],[82.0,-120.97],[81.75,-121.04],[81.75,-121.47],[81.57,-121.47],[81.5,-121.72],[81.32,-121.72],[81.25,-121.97],[81.07,-121.97],[81.01,-122.22],[80.76,-122.28],[80.76,-122.72],[80.57,-122.72],[80.51,-122.97],[80.32,-122.97],[80.26,-123.22],[80.01,-123.28],[80.01,-123.72],[79.82,-123.72],[79.76,-123.97],[79.57,-123.97],[79.51,-124.22],[79.32,-124.22],[79.26,-124.46],[79.07,-124.46],[79.01,-124.71],[78.76,-124.78],[78.76,-125.21],[78.57,-125.21],[78.51,-125.46],[78.32,-125.46],[78.26,-125.71],[78.07,-125.71],[78.01,-125.96],[77.83,-125.96],[77.76,-126.21],[77.58,-126.21],[77.51,-126.46],[77.33,-126.46],[77.26,-126.71],[77.08,-126.71],[77.01,-126.96],[76.83,-126.96],[76.77,-127.21],[76.58,-127.21],[76.52,-127.46],[76.33,-127.46],[76.27,-127.71],[76.08,-127.71],[76.02,-127.96],[75.77,-128.02],[75.77,-128.21],[75.33,-128.21],[75.27,-128.46],[75.02,-128.52],[75.02,-128.7],[74.58,-128.7],[74.52,-128.95],[74.27,-129.02],[74.27,-129.7],[74.52,-129.76]]},{"c":"#484443","p":[[83.0,-154.02],[81.69,-153.9],[81.32,-153.08],[80.26,-151.9],[79.45,-151.78],[78.88,-151.4],[78.14,-151.34],[74.83,-150.4],[74.83,-150.22],[74.58,-150.15],[74.4,-149.78],[74.08,-148.35],[75.02,-149.47],[76.33,-150.65],[77.64,-150.65],[80.01,-151.34],[80.57,-151.65],[81.88,-153.27],[82.25,-153.08],[82.44,-152.34],[82.75,-151.96],[82.75,-153.4],[83.0,-153.46]]},{"c":"#484443","p":[[82.5,-150.34],[82.25,-150.03],[82.19,-149.22],[81.69,-147.1],[81.75,-146.41],[81.44,-145.66],[81.38,-144.98],[80.94,-144.04],[80.57,-142.48],[79.57,-140.18],[79.51,-139.55],[77.51,-135.63],[76.52,-134.07],[76.33,-133.01],[75.83,-132.26],[76.02,-132.26],[76.02,-132.45],[76.27,-132.51],[76.33,-132.76],[76.52,-132.76],[76.52,-133.44],[76.77,-133.51],[76.83,-133.76],[77.01,-133.76],[77.01,-134.19],[77.26,-134.25],[77.26,-134.94],[77.51,-135.0],[77.51,-135.44],[77.76,-135.5],[77.83,-135.75],[78.01,-135.75],[78.01,-136.44],[78.26,-136.5],[78.26,-136.94],[78.51,-137.0],[78.57,-137.25],[78.76,-137.25],[78.76,-137.93],[79.01,-138.0],[79.01,-138.43],[79.26,-138.49],[79.32,-138.74],[79.51,-138.74],[79.51,-139.68],[79.76,-139.74],[79.82,-139.99],[80.01,-139.99],[80.01,-140.43],[80.26,-140.49],[80.26,-141.42],[80.51,-141.49],[80.51,-141.92],[80.76,-141.99],[80.76,-142.42],[81.01,-142.48],[81.0,-143.42],[81.25,-143.48],[81.25,-143.92],[81.5,-143.98],[81.5,-144.67],[81.75,-144.73],[81.75,-146.41],[82.0,-146.48],[82.0,-147.66],[82.25,-147.72],[82.25,-148.66],[82.5,-148.72]]},{"c":"#484443","p":[[70.84,-135.69],[70.53,-135.69],[70.28,-135.44],[69.78,-134.07],[69.78,-133.63],[70.53,-133.76],[70.9,-133.38],[70.65,-132.63],[70.59,-131.76],[70.22,-131.39],[69.66,-131.51],[69.35,-132.07],[69.47,-132.82],[69.16,-131.64],[69.66,-131.2],[70.28,-131.2],[70.72,-131.39],[71.15,-132.07],[71.22,-134.82],[71.09,-135.44]]},{"c":"#484443","p":[[68.35,-92.73],[68.35,-92.6],[68.6,-92.54],[68.6,-92.35],[68.85,-92.29],[68.85,-92.1],[69.1,-92.04],[69.1,-91.85],[69.53,-91.85],[69.59,-91.61],[69.78,-91.61],[69.84,-91.36],[70.03,-91.36],[70.09,-91.11],[70.34,-91.04],[70.34,-90.86],[70.78,-90.86],[70.84,-90.61],[71.09,-90.55],[71.09,-90.36],[71.53,-90.36],[71.59,-90.11],[71.78,-90.11],[71.84,-89.86],[72.09,-89.8],[72.09,-89.61],[72.53,-89.61],[72.59,-89.36],[72.84,-89.3],[72.84,-89.11],[73.27,-89.11],[73.34,-88.86],[73.77,-88.86],[73.83,-88.61],[74.02,-88.61],[74.08,-88.36],[74.33,-88.3],[74.33,-88.11],[74.77,-88.11],[74.83,-87.86],[75.27,-87.86],[75.33,-87.61],[75.77,-87.61],[75.83,-87.37],[76.52,-87.37],[76.58,-87.12],[76.77,-87.12],[76.83,-86.87],[77.01,-86.87],[77.08,-86.62],[77.26,-86.62],[77.33,-86.37],[77.58,-86.31],[77.58,-85.87],[77.83,-85.81],[77.83,-85.37],[77.95,-85.37],[77.7,-86.37],[76.77,-87.49],[75.71,-87.8],[74.58,-88.61],[73.59,-89.05],[72.9,-89.67],[71.71,-90.23],[71.34,-90.67],[69.84,-91.54],[69.16,-92.29]]},{"c":"#241D1A","p":[[70.53,-133.69],[69.84,-133.63],[69.59,-133.19],[69.41,-132.07],[69.59,-131.64],[69.91,-131.45],[70.22,-131.45],[70.53,-131.76],[70.59,-132.63],[70.84,-133.19],[70.78,-133.51]]}]},"staart":{"c":"#7D726D","basis":[[-48.45,-98.59,1],[-50.7,-94.85],[-51.63,-91.85],[-51.63,-88.67],[-52.38,-86.62],[-52.38,-75.95],[-53.13,-73.89],[-53.13,-71.46],[-55.75,-61.36],[-58.74,-56.31],[-58.55,-52.76],[-59.68,-47.7,1],[-57.81,-45.83],[-57.62,-41.53],[-56.31,-39.85,1],[-55.0,-40.22],[-52.94,-43.78],[-52.38,-61.73],[-49.57,-73.71],[-46.39,-92.6]],"lagen":[{"c":"#262120","p":[[-49.95,-90.54,1],[-51.45,-89.8],[-51.82,-87.93],[-52.38,-87.18],[-52.38,-75.77],[-53.13,-74.46],[-53.13,-71.28],[-53.88,-69.97],[-53.88,-68.28],[-54.63,-66.97],[-54.63,-65.29],[-55.37,-63.98],[-55.37,-62.3],[-57.06,-58.74],[-58.18,-57.62],[-59.12,-55.75],[-58.37,-53.32],[-59.12,-52.01],[-59.12,-50.32],[-59.86,-49.01],[-59.86,-47.7],[-57.81,-44.71],[-57.62,-40.97],[-55.94,-39.29,1],[-55.0,-39.85],[-53.32,-43.59],[-52.38,-44.34],[-51.07,-44.52],[-49.57,-46.21],[-49.57,-48.27],[-50.32,-49.57],[-50.32,-50.88],[-49.57,-52.19],[-49.57,-74.08],[-48.83,-75.77],[-46.58,-77.64],[-46.58,-81.19],[-47.14,-81.94],[-47.33,-84.18],[-48.08,-85.49],[-48.08,-87.93],[-49.01,-89.8]]}]},"kruis":{"c":"#262120","basis":[[27.31,-102.52,1],[27.87,-101.96],[28.06,-100.27],[28.62,-99.71],[28.81,-98.03],[29.37,-97.47],[29.56,-95.78],[30.12,-95.22],[30.31,-93.54],[30.87,-92.98],[31.05,-91.29],[31.8,-90.17],[31.8,-89.05],[32.74,-88.11],[32.74,-86.62],[33.3,-86.05],[34.61,-86.05],[35.17,-86.62],[35.17,-87.93],[34.61,-88.49],[34.61,-90.73],[33.86,-91.85],[33.86,-94.47],[33.11,-95.6],[33.11,-97.47],[32.55,-98.03],[32.36,-99.71],[31.62,-100.83]],"lagen":[]}},"tonen":["#7D726D","#262120","#BEB5AD","#524D4D"],"oog":[73.34,-113.74],"K":1.3363636363636364,"omtrek":[[83.25,-164.63,1],[78.76,-163.32],[75.95,-163.88],[73.71,-165.94,1],[70.34,-162.01],[60.24,-137.87],[51.26,-130.77],[45.65,-127.59],[31.99,-115.61],[22.82,-109.44],[16.84,-107.76],[9.17,-107.76],[-17.77,-111.5],[-22.07,-112.99],[-26.75,-112.99],[-36.11,-110.0],[-41.16,-106.63],[-46.77,-101.02],[-49.39,-97.47],[-51.63,-91.85],[-53.13,-71.46],[-55.75,-61.36],[-58.74,-56.31],[-59.68,-47.7],[-57.81,-45.83],[-57.62,-41.53],[-56.68,-40.03],[-55.37,-39.85,1],[-52.38,-44.15,1],[-50.88,-42.84],[-49.39,-27.5],[-49.39,-10.85],[-45.83,-6.92],[-45.65,-2.62],[-44.34,0.0,1],[-36.29,0.56],[-33.49,-0.94],[-27.31,-0.94],[-25.82,-2.06,1],[-27.5,-8.23],[-31.24,-12.16],[-32.18,-14.59],[-34.61,-33.49],[-30.87,-45.09],[-20.77,-62.11],[-18.52,-63.79,1],[-8.04,-58.74],[2.43,-56.31],[9.35,-56.31],[19.64,-58.55],[23.57,-57.99,1],[23.95,-43.03],[22.45,-37.98],[23.2,-25.07],[21.14,-11.6],[22.26,-8.98],[24.51,-7.11],[24.69,-1.87],[26.56,0.37],[34.05,0.56],[36.48,-1.5],[42.47,-2.24,1],[40.6,-8.23],[36.48,-13.84],[34.98,-26.56],[37.23,-37.04],[37.23,-46.96],[40.97,-60.8],[46.21,-67.35],[49.95,-75.77],[61.36,-92.6],[64.73,-93.72],[68.28,-92.98],[76.7,-86.99],[80.44,-82.5],[84.74,-81.19],[89.42,-83.25],[92.6,-88.11],[92.6,-93.91],[84.37,-112.06],[83.62,-118.61],[76.14,-128.52],[76.14,-132.82],[79.13,-138.25],[82.13,-147.23],[84.37,-163.5]],"neusgat":[87.55,-89.8],"mond":[[78.57,-85.31],[88.3,-83.81]],"keelweb":{"p":[[63.63,-93.21,1],[63.64,-93.21,1],[61.43,-131.41,1],[61.42,-131.41,1]],"kop":[0,1,1,0]}},"muilezel":{"J":{"midrug":[0.0,-130.0],"nekBasis":[54.47,-105.31],"lend":[-21.79,-130.73],"kruis":[-43.58,-127.09],"kop":[90.78,-156.15],"neus":[117.65,-112.57],"kaak":[92.96,-130.73],"kin":[110.39,-114.02],"schoft":[32.68,-117.65],"schouder":[54.47,-87.88],"elleboog":[42.12,-68.99],"pols":[42.12,-36.31],"vkogel":[42.85,-10.89],"vteen":[49.39,0.0],"heup":[-39.94,-94.41],"knie":[-27.6,-77.71],"hak":[-43.58,-41.4],"akogel":[-40.67,-10.89],"ateen":[-33.41,0.0],"staart0":[-56.65,-116.2],"staart1":[-61.01,-90.78],"staart2":[-63.91,-68.99],"staart3":[-65.36,-50.84],"staart4":[-66.82,-32.68]},"delen":{"romp":{"c":"#7D5845","basis":[[-51.56,-121.83],[-51.56,-113.66],[-50.84,-110.03],[-53.02,-98.04],[-53.02,-88.78],[-49.39,-77.53],[-49.39,-70.81],[-48.66,-70.27],[-48.66,-69.36],[-47.21,-68.09],[-47.21,-67.18,1],[-42.67,-64.09],[-38.85,-64.09],[-38.31,-63.37],[-36.68,-63.37],[-36.13,-64.09],[-32.32,-64.09],[-31.77,-64.82],[-30.87,-64.82],[-29.59,-66.27],[-28.69,-66.27,1],[-27.42,-69.72],[-21.24,-80.07],[-19.97,-81.34],[-18.34,-81.16],[-13.98,-77.89],[-7.08,-74.44],[-2.0,-72.81],[1.63,-72.08],[4.72,-72.08],[6.72,-71.35],[11.98,-71.35],[13.98,-72.08],[17.79,-72.08],[19.79,-72.81],[22.15,-72.81],[24.15,-73.53],[28.69,-74.08],[30.87,-72.99],[31.41,-70.63,1],[32.32,-70.63],[33.59,-69.18],[34.5,-69.18],[35.04,-68.45],[38.85,-68.45],[39.4,-67.72],[41.76,-67.72],[42.3,-68.45],[46.12,-68.45],[46.66,-69.18],[47.57,-69.18],[48.84,-70.63],[49.75,-70.63],[50.66,-71.54],[51.2,-74.26],[56.1,-78.62],[57.74,-81.7],[60.46,-90.78,1],[59.19,-91.15],[21.42,-127.28],[11.8,-127.09],[9.8,-127.82],[5.27,-127.82],[-16.34,-132.18],[-18.7,-132.18],[-20.7,-132.91],[-23.78,-132.91],[-26.69,-133.63],[-28.69,-132.91],[-31.77,-132.91],[-39.04,-130.54],[-43.03,-128.55],[-50.11,-123.83]],"lagen":[{"c":"#26201D","p":[[-21.06,-84.61],[-21.61,-84.79],[-23.78,-83.52],[-23.97,-82.61],[-23.24,-81.7],[-20.88,-81.52],[-20.15,-82.07],[-19.97,-82.61]]},{"c":"#A68B78","p":[[-21.61,-85.52],[-20.15,-82.97],[-17.43,-80.25],[-16.34,-79.89],[-14.53,-78.07],[-6.9,-74.26],[-5.99,-74.26],[-2.54,-72.81],[-0.18,-72.81],[1.09,-72.08],[4.9,-72.08],[6.17,-71.35],[12.53,-71.35],[13.8,-72.08],[18.34,-72.08],[19.61,-72.81],[22.7,-72.81],[23.97,-73.53],[26.33,-73.53],[27.6,-74.26],[29.96,-73.53,1],[31.05,-74.62],[31.05,-79.53],[30.14,-81.34],[28.51,-82.79],[26.51,-82.79],[24.33,-81.52],[22.88,-81.34],[21.61,-80.61],[19.97,-80.61],[18.7,-79.89],[14.89,-79.89],[14.16,-79.34],[13.25,-79.34],[12.53,-79.89],[7.26,-79.89],[5.99,-80.61],[2.91,-80.61],[1.63,-81.34],[0.0,-81.34],[-1.27,-82.07],[-2.91,-82.07],[-4.18,-82.79],[-5.63,-82.97],[-7.81,-84.25],[-9.26,-84.43],[-12.89,-86.61],[-16.16,-89.87],[-17.97,-90.78],[-18.88,-90.6],[-20.15,-89.33]]}]},"hum":{"c":"#7D5845","basis":[[21.24,-122.56,1],[29.59,-76.08],[34.68,-66.63,1],[49.75,-66.63,1],[50.84,-73.72],[56.47,-79.16],[57.74,-81.7],[60.46,-90.78,1],[58.83,-91.51],[34.13,-124.19,1]],"lagen":[]},"dij":{"c":"#7D5845","basis":[[-51.75,-122.19],[-53.38,-120.38,1],[-50.84,-110.75],[-54.11,-90.06,1],[-53.02,-89.15],[-50.47,-81.34,1],[-33.41,-78.62],[-25.6,-72.44,1],[-20.52,-80.98],[-18.7,-81.34],[-17.43,-80.43,1],[-12.35,-122.19,1]],"lagen":[]},"nek":{"c":"#7D5845","basis":[[84.61,-157.78,1],[76.62,-155.24],[71.72,-152.51],[66.09,-151.06],[55.2,-144.89],[53.74,-143.25],[51.38,-142.71],[46.3,-140.17],[35.22,-132.36],[29.05,-128.91],[20.7,-127.09],[17.97,-127.09,1],[17.97,-114.39],[34.13,-79.89,1],[56.83,-79.89,1],[59.19,-86.06],[60.28,-90.6],[61.55,-93.14],[72.81,-106.22],[81.52,-118.38],[82.79,-119.65],[85.88,-120.56],[88.97,-119.83,1]],"lagen":[{"c":"#473932","p":[[84.43,-124.01,1],[82.97,-122.74],[82.79,-121.1],[83.88,-120.01],[85.15,-120.01],[86.24,-121.1],[86.24,-122.37]]},{"c":"#26201D","p":[[86.06,-157.6,1],[85.15,-158.14],[79.71,-156.15],[78.8,-156.15],[77.53,-155.42],[76.62,-155.42],[75.17,-154.15],[73.35,-153.78],[72.26,-152.7],[70.81,-152.51],[69.54,-151.79],[67.91,-151.79],[67.18,-151.24],[65.36,-150.88],[64.27,-149.79],[62.46,-149.43],[59.19,-146.89],[57.74,-146.7],[56.28,-145.43],[55.2,-145.07],[53.38,-143.25],[51.93,-143.07],[43.58,-138.53],[41.76,-136.72],[40.67,-136.35],[39.58,-135.27],[34.13,-132.0],[33.41,-131.09],[33.41,-129.64],[40.49,-124.55,1],[40.67,-126.91],[42.3,-129.27],[45.94,-130.18],[49.2,-131.82],[51.02,-133.63],[53.56,-134.72],[54.65,-135.81],[57.19,-136.9],[58.28,-137.99],[60.82,-139.08],[61.91,-140.17],[64.46,-141.26],[65.54,-142.35],[70.99,-144.89],[72.08,-145.98],[81.89,-150.7],[82.97,-151.79],[85.52,-152.88],[86.24,-153.78]]},{"c":"#26201D","p":[[84.79,-157.96,1],[76.44,-155.42],[71.54,-152.7],[65.91,-151.24],[62.28,-149.43],[59.19,-147.25],[57.19,-146.52],[55.01,-145.07],[53.56,-143.44],[51.2,-142.89],[46.12,-140.35],[39.4,-135.45],[31.96,-130.73,1],[31.96,-130.36],[39.76,-124.73],[41.03,-124.19,1],[41.03,-126.73],[40.49,-127.82,1],[41.4,-128.73],[43.39,-129.64],[46.66,-129.64],[48.11,-130.36],[49.39,-131.63],[50.29,-131.82],[53.74,-134.54],[56.1,-135.45],[57.37,-136.72],[59.73,-137.63],[61.01,-138.9],[63.37,-139.8],[64.64,-141.08],[68.45,-142.71],[69.72,-143.98],[79.34,-148.52],[80.61,-149.79],[85.34,-151.97,1]]}]},"kop":{"c":"#7D5845","basis":[[96.11,-179.39],[95.87,-178.85],[94.9,-177.82],[94.66,-177.15],[94.17,-176.61],[94.17,-176.43],[93.44,-175.64],[91.99,-172.55],[91.51,-172.01],[91.51,-171.58],[89.81,-168.38],[89.81,-167.95],[89.09,-166.68],[89.09,-166.26],[88.84,-165.96],[88.84,-165.53],[88.36,-164.74],[88.36,-164.32],[87.88,-163.53],[87.88,-163.11],[87.63,-162.81],[87.63,-162.14],[87.39,-161.84],[87.39,-161.42],[87.15,-161.11],[87.15,-160.45],[86.91,-160.14],[86.91,-158.27],[86.66,-157.78],[86.24,-157.42],[86.0,-157.6],[85.09,-157.6],[84.79,-157.85],[84.36,-157.85],[83.58,-157.12],[83.4,-157.12],[82.61,-156.15],[82.19,-156.15],[81.16,-156.88],[80.73,-156.88],[80.37,-156.51],[80.37,-156.09],[80.13,-155.79],[80.13,-155.12],[79.7,-154.46],[79.04,-154.46],[78.01,-155.18],[77.1,-155.18],[76.5,-154.58],[76.5,-152.22],[76.74,-151.91],[76.74,-149.8],[76.98,-149.49],[76.98,-147.13],[77.22,-146.83],[77.22,-144.71],[77.46,-144.41],[77.46,-142.05],[77.71,-141.75],[77.71,-139.63],[77.95,-139.32],[77.95,-137.21],[78.19,-136.9],[78.19,-134.54],[78.43,-134.24],[78.43,-132.12],[78.67,-131.82],[78.67,-129.46],[78.92,-129.16],[78.91,-127.04],[79.16,-126.74],[79.16,-124.38],[79.4,-124.07],[79.4,-121.95],[79.64,-121.65],[79.64,-120.5],[79.88,-120.02],[80.49,-119.41],[81.15,-119.41],[81.4,-119.23],[81.7,-119.41],[82.36,-119.41],[84.06,-121.35],[84.54,-121.59],[85.57,-122.56],[86.24,-122.56],[87.15,-121.71],[87.63,-120.92],[88.48,-120.14],[88.66,-120.14],[89.2,-119.65],[90.66,-118.93],[91.08,-118.93],[91.87,-118.44],[92.29,-118.44],[92.77,-118.2],[93.44,-117.53],[93.68,-117.05],[95.92,-114.81],[96.41,-114.57],[97.13,-113.84],[97.62,-113.6],[98.4,-112.87],[98.58,-112.87],[99.37,-112.15],[99.55,-112.15],[100.58,-111.18],[100.76,-111.18],[101.31,-110.69],[102.28,-110.21],[102.64,-109.79],[102.88,-109.3],[102.88,-108.88],[103.12,-108.58],[103.12,-106.7],[103.61,-105.73],[104.94,-104.4],[105.12,-104.4],[105.67,-103.92],[106.63,-103.43],[107.06,-103.43],[107.36,-103.19],[107.78,-103.19],[108.09,-102.95],[108.75,-102.95],[109.05,-102.71],[109.48,-102.7],[109.78,-102.95],[110.45,-102.95],[110.75,-103.19],[112.38,-103.19],[112.69,-103.43],[113.35,-103.43],[113.84,-103.67],[115.17,-104.94],[117.59,-108.39],[118.32,-109.85],[118.32,-110.75],[118.56,-111.06],[118.56,-115.35],[118.32,-115.66],[118.32,-116.56],[117.83,-117.35],[117.83,-118.5],[117.35,-119.29],[117.35,-119.71],[117.11,-120.01],[117.11,-120.68],[116.38,-121.95],[116.38,-122.62],[115.65,-123.89],[115.65,-124.31],[115.41,-124.8],[114.69,-125.58],[114.69,-126.01],[109.84,-135.51],[109.84,-135.93],[108.88,-137.69],[108.88,-138.35],[108.39,-139.14],[108.39,-139.56],[108.15,-139.87],[108.15,-140.53],[107.91,-140.84],[107.91,-141.26],[107.42,-142.23],[106.46,-143.2],[106.21,-143.68],[105.24,-144.71],[105.24,-144.89],[104.76,-145.44],[104.76,-145.62],[104.03,-146.4],[104.03,-146.59],[103.55,-147.13],[103.55,-147.31],[102.82,-148.04],[102.34,-148.83],[99.37,-151.79],[98.89,-152.03],[98.22,-152.7],[98.22,-152.88],[98.95,-153.67],[98.95,-153.85],[99.68,-154.88],[99.68,-155.54],[99.92,-155.85],[99.92,-156.27],[100.16,-156.57],[100.16,-157.0],[100.4,-157.3],[100.4,-157.97],[101.13,-159.24],[101.13,-159.9],[101.37,-160.2],[101.37,-160.63],[101.86,-161.41],[101.86,-162.32],[102.04,-162.56],[101.92,-162.87],[102.1,-163.11],[102.1,-163.78],[102.58,-164.32],[102.58,-165.47],[102.95,-166.01],[103.43,-165.47],[103.55,-165.59],[103.55,-168.13],[104.04,-168.92],[104.04,-169.59],[104.28,-169.89],[104.28,-171.04],[104.52,-171.34],[104.52,-172.49],[104.76,-172.79],[104.76,-174.43],[105.0,-174.73],[105.0,-175.4],[105.19,-175.64],[105.0,-175.94],[105.0,-176.36],[104.76,-176.67],[104.76,-177.09],[104.64,-177.21],[103.98,-177.21],[103.61,-176.61],[102.4,-175.64],[101.43,-173.7],[101.43,-173.28],[100.95,-172.73],[100.47,-171.58],[99.98,-171.04],[99.98,-170.61],[99.25,-169.83],[99.25,-169.65],[98.77,-169.1],[98.53,-168.44],[97.8,-167.65],[97.56,-166.98],[97.14,-166.56],[96.95,-166.56],[96.77,-166.74],[96.77,-170.07],[97.02,-170.37],[97.02,-172.98],[97.26,-173.28],[97.26,-174.43],[97.5,-174.73],[97.5,-177.33],[97.26,-177.64],[97.26,-178.54],[97.02,-178.85],[97.02,-179.39]],"lagen":[{"c":"#B7A89D","p":[[115.35,-123.28],[112.87,-122.74],[111.48,-121.95],[110.57,-120.92],[108.45,-117.84],[105.73,-115.11],[104.7,-114.27],[102.64,-111.91],[102.46,-110.51],[102.94,-109.85],[103.49,-108.52],[103.67,-106.28],[104.27,-105.31],[105.24,-104.4],[106.51,-103.92],[106.88,-103.92],[107.42,-104.34],[107.6,-104.76],[107.48,-105.97],[106.51,-108.58],[106.39,-109.54],[106.15,-109.97],[106.15,-110.39],[106.33,-110.57],[106.76,-110.33],[107.6,-109.18],[108.69,-107.0],[109.06,-106.7],[109.6,-106.7],[111.17,-107.67],[111.6,-108.21],[111.78,-108.7],[111.9,-109.54],[111.36,-110.21],[111.17,-110.69],[111.11,-112.33],[111.23,-113.6],[111.48,-114.2],[111.9,-114.75],[112.26,-114.99],[112.57,-114.99],[112.81,-114.75],[112.99,-113.9],[113.23,-113.6],[114.14,-114.57],[114.93,-114.93],[115.41,-114.99],[117.29,-114.39],[117.53,-114.39],[117.77,-114.57],[117.95,-115.96],[117.83,-117.17],[117.53,-117.78],[117.05,-119.77],[116.8,-120.14],[116.56,-120.98]]},{"c":"#4F423E","p":[[101.8,-163.35],[101.01,-161.41],[100.95,-160.51],[99.68,-157.06],[99.31,-155.18],[98.83,-154.15],[98.28,-153.49],[98.16,-152.46],[98.35,-152.15],[99.37,-151.31],[101.92,-148.7],[102.82,-147.43],[103.61,-146.59],[104.64,-144.77],[105.37,-143.8],[107.06,-142.05],[107.67,-139.93],[108.09,-139.02],[108.21,-138.29],[108.82,-136.84],[110.21,-134.24],[110.99,-132.24],[114.14,-126.01],[114.56,-124.92],[115.23,-124.13],[115.35,-123.34],[116.44,-121.41],[116.86,-120.14],[117.11,-119.77],[117.23,-118.93],[117.89,-117.17],[117.95,-115.17],[117.89,-114.69],[117.65,-114.39],[117.29,-114.33],[115.41,-114.93],[114.93,-114.87],[114.14,-114.51],[113.11,-113.3],[112.99,-112.81],[113.35,-113.66],[113.84,-113.96],[114.38,-113.9],[114.74,-113.54],[115.71,-111.0],[115.65,-109.85],[115.17,-109.18],[114.81,-109.0],[114.14,-109.0],[113.47,-109.48],[112.99,-110.51],[112.93,-111.54],[112.75,-111.97],[112.44,-111.48],[112.32,-110.88],[112.02,-110.27],[111.96,-109.24],[111.66,-108.21],[110.93,-107.43],[110.21,-106.94],[109.24,-106.58],[108.63,-107.0],[107.54,-109.18],[106.69,-110.33],[106.45,-110.51],[106.21,-110.39],[106.57,-108.58],[107.54,-105.97],[107.66,-104.76],[107.48,-104.34],[106.88,-103.86],[106.51,-103.86],[105.36,-104.34],[105.3,-104.16],[105.48,-104.16],[105.54,-103.92],[105.97,-103.92],[106.03,-103.67],[106.45,-103.67],[106.51,-103.43],[107.18,-103.43],[107.24,-103.19],[107.9,-103.19],[107.97,-102.95],[108.87,-102.95],[108.93,-102.71],[109.6,-102.7],[109.66,-102.95],[110.57,-102.95],[110.63,-103.19],[112.5,-103.19],[112.57,-103.43],[113.47,-103.43],[113.53,-103.67],[113.96,-103.67],[113.96,-103.85],[114.2,-103.92],[114.2,-104.1],[114.44,-104.16],[114.44,-104.34],[114.68,-104.4],[114.68,-104.58],[114.93,-104.64],[114.93,-104.82],[115.17,-104.88],[115.23,-105.13],[115.41,-105.13],[115.41,-105.55],[115.65,-105.61],[115.65,-105.79],[115.89,-105.85],[115.95,-106.09],[116.14,-106.09],[116.14,-106.52],[116.38,-106.58],[116.44,-106.82],[116.62,-106.82],[116.62,-107.24],[116.86,-107.3],[116.92,-107.55],[117.1,-107.55],[117.1,-107.97],[117.35,-108.03],[117.41,-108.27],[117.59,-108.27],[117.59,-108.7],[117.83,-108.76],[117.83,-109.18],[118.07,-109.24],[118.07,-109.66],[118.32,-109.73],[118.32,-110.88],[118.56,-110.94],[118.56,-115.48],[118.32,-115.54],[118.32,-116.69],[118.07,-116.75],[118.07,-117.17],[117.83,-117.23],[117.83,-118.62],[117.59,-118.68],[117.59,-119.11],[117.35,-119.17],[117.35,-119.83],[117.11,-119.89],[117.11,-120.8],[116.86,-120.86],[116.86,-121.29],[116.62,-121.35],[116.62,-121.77],[116.38,-121.83],[116.38,-122.74],[116.14,-122.8],[116.14,-123.22],[115.9,-123.28],[115.9,-123.71],[115.65,-123.77],[115.65,-124.43],[115.41,-124.49],[115.41,-124.92],[115.23,-124.92],[115.17,-125.16],[114.99,-125.16],[114.93,-125.4],[114.69,-125.46],[114.69,-126.13],[114.44,-126.19],[114.44,-126.61],[114.2,-126.67],[114.2,-127.1],[113.96,-127.16],[113.96,-127.58],[113.72,-127.64],[113.72,-128.06],[113.47,-128.13],[113.47,-128.55],[113.23,-128.61],[113.23,-129.03],[112.99,-129.09],[112.99,-129.52],[112.75,-129.58],[112.75,-130.0],[112.51,-130.06],[112.51,-130.49],[112.26,-130.55],[112.26,-130.97],[112.02,-131.03],[112.02,-131.45],[111.78,-131.51],[111.78,-131.94],[111.54,-132.0],[111.54,-132.42],[111.3,-132.48],[111.3,-132.91],[111.05,-132.97],[111.05,-133.39],[110.81,-133.45],[110.81,-133.88],[110.57,-133.94],[110.57,-134.36],[110.33,-134.42],[110.33,-134.84],[110.09,-134.9],[110.09,-135.33],[109.84,-135.39],[109.84,-136.05],[109.6,-136.11],[109.6,-136.54],[109.36,-136.6],[109.36,-137.02],[109.12,-137.08],[109.12,-137.51],[108.88,-137.57],[108.88,-138.48],[108.63,-138.54],[108.63,-138.96],[108.39,-139.02],[108.39,-139.69],[108.15,-139.75],[108.15,-140.65],[107.91,-140.71],[107.91,-141.38],[107.67,-141.44],[107.67,-141.86],[107.42,-141.93],[107.42,-142.35],[107.24,-142.35],[107.18,-142.59],[107.0,-142.59],[106.94,-142.83],[106.76,-142.83],[106.7,-143.08],[106.52,-143.08],[106.46,-143.32],[106.21,-143.38],[106.21,-143.8],[106.03,-143.8],[105.97,-144.04],[105.79,-144.04],[105.73,-144.29],[105.55,-144.29],[105.49,-144.53],[105.24,-144.59],[105.24,-145.01],[105.06,-145.01],[105.0,-145.25],[104.76,-145.32],[104.76,-145.74],[104.58,-145.74],[104.52,-145.98],[104.34,-145.98],[104.28,-146.22],[104.03,-146.28],[104.03,-146.71],[103.85,-146.71],[103.79,-146.95],[103.55,-147.01],[103.55,-147.43],[103.37,-147.43],[103.31,-147.68],[103.13,-147.68],[103.07,-147.92],[102.88,-147.92],[102.82,-148.16],[102.58,-148.22],[102.58,-148.64],[102.4,-148.64],[102.34,-148.89],[102.16,-148.89],[102.1,-149.13],[101.92,-149.13],[101.86,-149.37],[101.67,-149.37],[101.61,-149.61],[101.43,-149.61],[101.37,-149.85],[101.19,-149.85],[101.13,-150.1],[100.95,-150.1],[100.89,-150.34],[100.71,-150.34],[100.65,-150.58],[100.46,-150.58],[100.4,-150.82],[100.22,-150.82],[100.16,-151.07],[99.98,-151.07],[99.92,-151.31],[99.74,-151.31],[99.68,-151.55],[99.5,-151.55],[99.43,-151.79],[99.19,-151.85],[99.19,-152.03],[98.77,-152.03],[98.71,-152.28],[98.53,-152.28],[98.47,-152.52],[98.22,-152.58],[98.22,-153.0],[98.47,-153.06],[98.47,-153.24],[98.71,-153.3],[98.77,-153.55],[98.95,-153.55],[98.95,-153.97],[99.19,-154.03],[99.25,-154.27],[99.43,-154.27],[99.43,-154.7],[99.68,-154.76],[99.68,-155.67],[99.92,-155.73],[99.92,-156.39],[100.16,-156.45],[100.16,-157.12],[100.4,-157.18],[100.4,-158.09],[100.65,-158.15],[100.65,-158.57],[100.89,-158.63],[100.89,-159.05],[101.13,-159.11],[101.13,-160.02],[101.37,-160.08],[101.37,-160.75],[101.55,-160.81],[101.86,-162.44],[102.1,-162.5],[102.1,-162.69],[101.86,-162.75],[101.86,-162.93],[102.04,-162.99]]},{"c":"#251F1C","p":[[86.85,-157.84],[86.66,-158.03],[86.66,-157.66],[86.42,-157.6],[86.36,-157.36],[86.18,-157.36],[86.12,-157.6],[84.97,-157.6],[84.91,-157.85],[84.24,-157.85],[84.24,-157.66],[84.0,-157.6],[84.0,-157.42],[83.76,-157.36],[83.7,-157.12],[83.27,-157.12],[83.27,-156.94],[83.03,-156.88],[83.03,-156.45],[82.79,-156.39],[82.73,-156.15],[82.06,-156.15],[82.0,-156.39],[81.58,-156.39],[81.52,-156.63],[81.28,-156.7],[81.28,-156.88],[80.61,-156.88],[80.61,-156.7],[80.37,-156.63],[80.37,-155.97],[80.13,-155.91],[80.13,-155.0],[79.89,-154.94],[79.82,-154.46],[78.92,-154.46],[78.86,-154.7],[78.61,-154.76],[78.61,-154.94],[78.19,-154.94],[78.13,-155.18],[76.98,-155.18],[76.98,-155.0],[76.74,-154.94],[76.68,-154.7],[76.5,-154.7],[76.5,-152.1],[76.74,-152.04],[76.74,-149.67],[76.98,-149.61],[76.98,-148.46],[79.76,-149.86],[81.34,-150.76],[82.12,-151.37],[84.06,-152.34],[85.57,-152.76],[86.0,-153.0],[86.42,-153.67],[86.66,-154.58],[86.66,-155.61],[87.03,-156.39],[87.03,-157.42]]},{"c":"#251F1C","p":[[94.72,-171.89],[94.23,-171.52],[93.99,-170.98],[93.99,-170.74],[94.17,-170.68],[94.17,-170.01],[93.87,-170.01],[93.87,-170.43],[92.96,-168.8],[93.14,-168.07],[93.38,-168.07],[93.44,-167.83],[93.63,-167.83],[93.63,-168.5],[93.87,-168.56],[93.87,-168.74],[93.63,-168.8],[93.63,-168.98],[93.87,-169.04],[93.87,-169.22],[93.63,-169.28],[93.63,-169.71],[94.41,-169.71],[94.41,-168.8],[94.17,-168.74],[94.17,-167.1],[94.41,-167.04],[94.41,-166.14],[94.11,-166.14],[94.11,-166.56],[93.69,-166.56],[93.69,-166.38],[93.44,-166.32],[93.44,-165.65],[93.2,-165.59],[93.14,-167.53],[92.48,-167.17],[92.11,-166.38],[92.11,-165.95],[91.81,-165.23],[91.08,-162.26],[91.08,-161.96],[91.45,-161.05],[91.33,-160.45],[91.32,-157.78],[91.57,-157.0],[91.57,-156.45],[91.87,-156.09],[92.47,-156.21],[92.78,-156.82],[93.32,-158.75],[93.08,-160.27],[93.26,-160.75],[94.05,-161.72],[94.59,-163.47],[94.53,-164.8],[94.78,-165.47],[94.65,-166.8],[94.35,-167.41],[94.35,-167.83],[94.65,-168.32],[94.72,-168.8],[94.65,-169.89],[94.35,-170.01],[94.35,-170.68],[94.59,-170.74],[94.65,-170.55],[94.96,-171.04],[94.96,-171.58]]},{"c":"#A08674","p":[[114.5,-124.92],[112.57,-124.31],[111.11,-123.28],[108.81,-120.86],[106.88,-118.2],[105.73,-117.05],[103.49,-115.29],[102.88,-114.51],[102.58,-113.78],[102.52,-112.57],[102.64,-111.97],[104.64,-114.27],[105.73,-115.17],[108.39,-117.84],[110.51,-120.92],[111.48,-122.01],[112.87,-122.8],[115.29,-123.34],[115.17,-124.13]]},{"c":"#4F423E","p":[[83.51,-125.46],[83.21,-124.8],[82.12,-119.41],[82.49,-119.41],[82.49,-119.59],[82.73,-119.65],[82.79,-119.9],[82.97,-119.9],[82.97,-120.32],[83.21,-120.38],[83.21,-120.56],[83.45,-120.62],[83.45,-120.8],[83.7,-120.86],[83.7,-121.05],[83.94,-121.11],[83.94,-121.29],[84.18,-121.35],[84.24,-121.59],[84.66,-121.59],[84.66,-121.77],[84.91,-121.83],[84.91,-122.01],[85.15,-122.07],[85.15,-122.26],[85.39,-122.32],[85.45,-122.56],[86.36,-122.56],[86.42,-122.32],[86.6,-122.32],[86.66,-122.07],[86.84,-122.07],[86.9,-121.83],[87.09,-121.83],[87.15,-121.59],[87.39,-121.53],[87.39,-121.11],[87.57,-121.11],[87.63,-120.86],[87.81,-120.86],[87.87,-120.62],[88.05,-120.62],[88.11,-120.38],[88.36,-120.32],[88.36,-120.14],[88.78,-120.14],[88.84,-119.9],[89.08,-119.84],[89.08,-119.65],[89.51,-119.65],[89.57,-119.41],[89.99,-119.41],[90.05,-119.17],[90.47,-119.17],[90.54,-118.93],[91.2,-118.93],[91.26,-118.68],[91.69,-118.68],[91.75,-118.44],[92.41,-118.44],[92.47,-118.2],[92.9,-118.2],[92.96,-117.96],[93.14,-117.96],[93.2,-117.72],[93.44,-117.66],[93.44,-117.23],[93.62,-117.23],[93.68,-116.99],[93.86,-116.99],[93.92,-116.75],[94.11,-116.75],[94.17,-116.51],[94.35,-116.51],[94.41,-116.26],[94.59,-116.26],[94.65,-116.02],[94.83,-116.02],[94.89,-115.78],[95.07,-115.78],[95.13,-115.54],[95.32,-115.54],[95.38,-115.3],[95.56,-115.3],[95.62,-115.05],[95.8,-115.05],[95.86,-114.81],[96.1,-114.75],[96.1,-114.57],[96.53,-114.57],[96.59,-114.33],[96.77,-114.33],[96.83,-114.08],[97.01,-114.08],[97.07,-113.84],[97.31,-113.78],[97.31,-113.6],[97.74,-113.6],[97.8,-113.36],[97.98,-113.36],[98.04,-113.12],[98.28,-113.06],[98.28,-112.87],[98.71,-112.87],[98.77,-112.63],[98.95,-112.63],[99.01,-112.39],[99.25,-112.33],[99.25,-112.15],[99.67,-112.15],[99.73,-111.91],[99.92,-111.91],[99.98,-111.66],[100.16,-111.66],[100.22,-111.42],[100.46,-111.36],[100.46,-111.18],[100.88,-111.18],[100.94,-110.94],[101.19,-110.88],[101.19,-110.69],[101.61,-110.69],[101.67,-110.45],[102.09,-110.45],[102.16,-110.21],[102.34,-110.21],[102.4,-109.97],[102.64,-109.91],[102.64,-109.48],[102.88,-109.42],[102.88,-108.76],[103.12,-108.7],[103.12,-106.58],[103.37,-106.52],[103.37,-106.09],[103.61,-106.03],[103.61,-105.61],[103.79,-105.61],[103.85,-105.37],[104.03,-105.37],[104.09,-105.13],[104.27,-105.13],[104.33,-104.88],[104.52,-104.88],[104.58,-104.64],[104.82,-104.58],[104.82,-104.4],[105.18,-104.4],[104.21,-105.31],[103.61,-106.28],[103.43,-108.52],[102.88,-109.85],[102.4,-110.51],[100.46,-111.78],[98.52,-113.48],[97.98,-113.78],[95.62,-115.66],[94.47,-116.75],[93.86,-117.6],[93.02,-118.44],[90.23,-119.59],[89.26,-120.14],[88.36,-120.86],[85.63,-123.83],[84.66,-125.59],[84.3,-125.77],[83.94,-125.77]]},{"c":"#251F1C","p":[[97.01,-139.57],[97.07,-138.9],[98.28,-137.75],[99.07,-137.33],[99.92,-137.08],[100.77,-137.02],[102.04,-137.27],[102.76,-136.96],[103.25,-137.02],[103.43,-137.27],[103.43,-137.75],[102.94,-139.5],[102.64,-139.75],[102.22,-140.53],[101.49,-141.02],[99.86,-141.08],[98.65,-140.66],[98.1,-140.17],[97.32,-139.99]]},{"c":"#4F423E","p":[[97.26,-177.76],[96.41,-177.88],[95.68,-177.45],[95.38,-176.79],[94.05,-175.46],[93.2,-175.28],[93.2,-174.85],[92.96,-174.79],[92.96,-174.37],[92.72,-174.31],[92.72,-173.88],[92.48,-173.82],[92.48,-173.4],[92.23,-173.34],[92.23,-172.92],[91.99,-172.85],[91.99,-172.43],[91.75,-172.37],[91.69,-172.13],[91.51,-172.13],[91.51,-171.46],[91.27,-171.4],[91.27,-170.98],[91.02,-170.92],[91.02,-170.49],[90.78,-170.43],[90.78,-170.01],[90.54,-169.95],[90.54,-169.53],[90.3,-169.47],[90.3,-169.04],[90.05,-168.98],[90.05,-168.56],[89.81,-168.5],[89.81,-167.83],[89.57,-167.77],[89.57,-167.35],[89.33,-167.29],[89.33,-166.86],[89.09,-166.8],[89.09,-166.14],[88.84,-166.08],[88.84,-165.41],[88.6,-165.35],[88.6,-164.93],[88.36,-164.87],[88.36,-164.2],[88.12,-164.14],[88.12,-163.72],[87.88,-163.66],[87.88,-162.99],[87.63,-162.93],[87.63,-162.02],[87.39,-161.96],[87.39,-161.29],[87.15,-161.23],[87.15,-160.33],[86.91,-160.27],[86.91,-158.15],[86.66,-158.09],[87.03,-157.48],[87.03,-157.78],[87.39,-158.69],[87.45,-160.02],[87.88,-162.14],[88.3,-163.05],[88.54,-164.32],[88.96,-165.23],[89.57,-167.23],[91.02,-169.53],[91.93,-170.01],[92.84,-171.22],[93.26,-172.61],[94.53,-175.58],[95.32,-176.67],[96.11,-177.15],[96.41,-177.09],[96.83,-176.49],[96.89,-174.73],[96.65,-173.94],[96.71,-171.95],[96.83,-171.7],[97.02,-171.7],[97.02,-173.1],[97.26,-173.16],[97.26,-174.55],[97.5,-174.61],[97.26,-175.15],[97.26,-175.88],[97.5,-176.3],[97.5,-177.45],[97.26,-177.51]]},{"c":"#4F423E","p":[[105.0,-176.24],[104.64,-176.12],[104.1,-175.64],[103.49,-174.43],[103.19,-174.55],[103.01,-175.34],[102.64,-175.94],[102.58,-175.76],[102.4,-175.76],[102.4,-175.34],[102.16,-175.28],[102.16,-174.85],[101.92,-174.79],[101.92,-174.37],[101.68,-174.31],[101.68,-173.88],[101.43,-173.82],[101.43,-173.16],[101.19,-173.1],[101.13,-172.85],[100.95,-172.85],[100.95,-172.43],[100.71,-172.37],[100.71,-171.95],[100.47,-171.89],[100.47,-171.52],[101.98,-173.22],[102.16,-172.98],[102.22,-171.95],[102.34,-171.83],[102.7,-171.83],[103.43,-172.91],[103.92,-173.4],[104.1,-173.82],[104.28,-173.94],[104.4,-173.76],[104.28,-173.16],[104.34,-171.64],[104.1,-170.49],[102.52,-167.1],[102.28,-165.65],[101.92,-164.62],[102.04,-164.2],[102.58,-164.2],[102.58,-165.59],[102.83,-165.65],[102.89,-166.14],[103.13,-166.08],[103.13,-165.65],[103.31,-165.65],[103.37,-165.41],[103.55,-165.41],[103.55,-166.38],[103.25,-166.68],[103.55,-167.04],[103.55,-168.25],[103.79,-168.31],[103.79,-168.74],[104.04,-168.8],[104.04,-169.71],[104.28,-169.77],[104.28,-171.16],[104.52,-171.22],[104.52,-172.61],[104.76,-172.67],[104.76,-174.55],[105.0,-174.61],[105.0,-175.52],[105.25,-175.58],[105.25,-175.76],[105.0,-175.82]]},{"c":"#B7A89D","p":[[95.62,-139.38],[95.56,-138.96],[96.04,-138.11],[96.83,-137.27],[98.28,-136.24],[99.92,-135.51],[101.85,-134.97],[103.25,-134.9],[103.79,-135.21],[103.79,-135.69],[103.43,-136.24],[102.16,-136.84],[99.92,-137.02],[98.77,-137.39],[97.56,-138.36],[96.59,-139.44]]},{"c":"#A08674","p":[[94.65,-159.72],[94.17,-159.48],[93.69,-159.6],[93.56,-158.27],[93.14,-157.48],[92.41,-155.42],[92.11,-155.18],[91.81,-155.18],[91.51,-155.48],[91.26,-156.21],[91.02,-155.97],[90.78,-154.76],[90.84,-152.82],[91.02,-152.03],[91.51,-151.73],[91.75,-151.73],[92.41,-152.16],[93.08,-153.0],[93.32,-153.55],[93.75,-156.27]]},{"c":"#A08674","p":[[96.23,-177.09],[95.5,-176.79],[94.72,-175.76],[93.63,-173.22],[94.11,-172.92],[94.23,-173.28],[94.78,-173.82],[95.02,-173.88],[95.32,-173.64],[95.38,-172.67],[95.2,-169.95],[95.44,-170.07],[96.29,-170.01],[96.53,-170.49],[96.53,-171.1],[96.77,-171.64],[96.65,-171.95],[96.59,-173.94],[96.83,-174.73],[96.83,-176.12],[96.65,-176.79]]},{"c":"#251F1C","p":[[113.84,-113.9],[113.41,-113.66],[112.81,-112.21],[112.99,-111.54],[113.05,-110.51],[113.41,-109.67],[113.78,-109.24],[114.14,-109.06],[114.81,-109.06],[115.17,-109.24],[115.59,-109.85],[115.65,-111.0],[114.68,-113.54],[114.38,-113.84]]},{"c":"#4F423E","p":[[95.02,-173.58],[94.53,-173.52],[94.17,-173.04],[94.05,-172.37],[93.57,-171.34],[93.44,-170.43],[93.14,-169.65],[93.14,-169.28],[93.87,-170.49],[94.17,-171.52],[94.53,-171.89],[94.84,-171.89],[95.02,-171.58],[95.02,-171.04],[94.65,-170.49],[94.78,-168.5],[94.41,-167.83],[94.41,-167.41],[94.71,-166.8],[94.84,-165.47],[94.59,-164.8],[94.65,-163.84],[95.14,-167.1],[95.08,-169.65],[95.32,-173.22]]},{"c":"#4F423E","p":[[100.4,-171.4],[100.22,-171.4],[100.22,-171.22],[99.98,-171.16],[99.98,-170.49],[99.74,-170.43],[99.74,-170.25],[99.5,-170.19],[99.44,-169.95],[99.25,-169.95],[99.25,-169.53],[99.01,-169.46],[98.95,-169.22],[98.77,-169.22],[98.77,-168.8],[98.53,-168.74],[98.53,-168.31],[98.29,-168.25],[98.29,-168.07],[98.04,-168.01],[97.98,-167.77],[97.8,-167.77],[97.8,-167.35],[97.56,-167.29],[97.56,-166.86],[97.32,-166.8],[97.26,-166.56],[96.77,-166.62],[96.77,-170.19],[96.95,-170.25],[96.53,-170.43],[96.35,-170.13],[96.35,-166.5],[96.65,-166.02],[97.2,-166.02],[97.98,-166.92],[99.44,-169.1],[100.1,-170.37]]},{"c":"#251F1C","p":[[97.02,-179.39],[96.11,-179.39],[96.11,-179.21],[95.87,-179.15],[95.87,-178.73],[95.62,-178.66],[95.62,-178.48],[95.38,-178.42],[95.38,-178.24],[95.14,-178.18],[95.08,-177.94],[94.9,-177.94],[94.9,-177.52],[94.66,-177.45],[94.66,-177.03],[94.41,-176.97],[94.35,-176.73],[94.17,-176.73],[94.17,-176.3],[93.93,-176.24],[93.93,-176.06],[93.69,-176.0],[93.63,-175.76],[93.44,-175.76],[93.44,-175.4],[94.05,-175.52],[95.32,-176.79],[95.62,-177.45],[95.99,-177.76],[96.41,-177.94],[97.26,-177.82],[97.26,-178.66],[97.02,-178.73]]},{"c":"#4F423E","p":[[87.03,-156.33],[86.72,-155.61],[86.72,-154.58],[86.48,-153.67],[86.0,-152.94],[85.57,-152.7],[84.06,-152.28],[82.12,-151.31],[81.34,-150.7],[79.76,-149.8],[77.04,-148.46],[76.98,-148.28],[77.34,-148.28],[79.04,-149.13],[80.61,-150.16],[86.0,-152.76],[86.66,-153.55],[87.15,-154.82],[87.15,-155.91]]},{"c":"#4F423E","p":[[91.08,-161.9],[90.96,-161.11],[91.2,-160.45],[91.08,-158.33],[91.26,-157.54],[91.26,-156.27],[91.57,-155.48],[91.81,-155.24],[92.11,-155.24],[92.47,-155.61],[92.96,-157.18],[93.5,-158.27],[93.62,-159.72],[93.44,-160.45],[93.69,-161.11],[93.32,-160.75],[93.14,-160.27],[93.38,-158.75],[92.84,-156.82],[92.47,-156.15],[91.87,-156.03],[91.57,-156.27],[91.26,-157.78],[91.26,-160.45],[91.39,-161.05]]},{"c":"#251F1C","p":[[104.76,-177.21],[103.85,-177.21],[103.85,-176.79],[103.61,-176.73],[103.61,-176.55],[103.37,-176.49],[103.37,-176.3],[103.13,-176.24],[103.07,-176.0],[102.64,-176.0],[103.07,-175.34],[103.31,-174.49],[103.61,-174.61],[104.04,-175.64],[104.46,-176.06],[105.0,-176.3],[105.0,-176.49],[104.76,-176.55]]},{"c":"#4F423E","p":[[102.88,-139.69],[102.46,-140.35],[101.73,-141.02],[101.01,-141.32],[100.04,-141.32],[97.13,-140.29],[96.71,-139.93],[96.59,-139.51],[97.01,-138.96],[96.95,-139.57],[97.32,-140.05],[98.1,-140.23],[98.65,-140.72],[99.86,-141.14],[101.49,-141.08],[101.98,-140.84],[102.7,-139.75]]}]},"staart":{"c":"#7D5845","basis":[[-53.56,-120.38,1],[-55.56,-118.38],[-58.1,-114.2],[-59.55,-109.48],[-60.28,-99.13],[-62.46,-89.87],[-63.18,-80.98],[-63.91,-78.98],[-63.91,-75.17],[-64.64,-73.17],[-64.64,-68.63],[-66.82,-63.0],[-66.82,-54.11],[-67.54,-51.2],[-65.54,-48.3],[-65.0,-43.58],[-63.0,-41.22],[-62.09,-41.22],[-61.19,-42.12],[-59.55,-46.48],[-58.65,-47.21,1],[-58.1,-47.03,1],[-55.38,-82.43],[-55.38,-88.78],[-54.29,-90.06],[-51.02,-110.75]],"lagen":[{"c":"#26201D","p":[[-56.47,-115.47,1],[-57.92,-114.75],[-58.83,-112.93],[-59.01,-110.75],[-59.55,-110.03],[-59.55,-105.49],[-60.28,-104.22],[-60.28,-98.95],[-61.01,-97.68],[-61.01,-95.32],[-61.73,-94.05],[-61.73,-91.69],[-62.46,-90.42],[-62.46,-86.61],[-63.18,-85.34],[-63.18,-80.8],[-63.91,-79.53],[-63.91,-74.99],[-64.64,-73.72],[-64.64,-68.45],[-65.36,-67.18],[-65.54,-65.73],[-66.82,-63.55],[-66.82,-53.92],[-67.54,-52.65],[-67.54,-50.66],[-65.54,-47.75],[-65.36,-44.12],[-64.46,-42.3],[-62.82,-40.85,1],[-61.37,-41.58],[-59.73,-44.85],[-59.73,-45.75],[-58.28,-48.48],[-57.37,-52.11],[-53.92,-58.65],[-53.38,-60.64],[-54.65,-63.37],[-54.65,-81.7],[-55.38,-82.97],[-55.38,-88.6],[-53.92,-91.33],[-53.92,-93.32],[-54.65,-94.59],[-54.65,-96.96],[-55.38,-98.23],[-55.38,-102.04],[-56.1,-103.31],[-56.1,-106.76],[-55.38,-108.03],[-55.38,-114.39]]}]},"kruis":{"c":"#26201D","basis":[[31.05,-130.0,1],[31.05,-129.09],[35.04,-125.82],[35.22,-124.19],[36.49,-122.19],[36.68,-120.56],[37.22,-120.01],[37.4,-118.38],[38.13,-117.29],[38.13,-116.2],[39.4,-114.2],[39.58,-112.57],[40.13,-112.03],[40.31,-110.39],[41.03,-109.3],[41.03,-108.21],[41.76,-107.49],[43.03,-107.49],[43.76,-108.21],[43.76,-110.57],[43.03,-111.66],[43.03,-114.93],[42.3,-116.02],[42.3,-118.56],[41.58,-119.65],[41.58,-122.19],[41.03,-122.74],[40.85,-124.19],[32.5,-130.18],[31.77,-130.36]],"lagen":[]}},"tonen":["#26201D","#7D5845","#A68B78","#473932"],"oog":[99.49,-138.72],"K":1.376923076923077,"omtrek":[[104.04,-177.21,1],[101.31,-176.48],[98.41,-177.21],[96.05,-179.2,1],[93.69,-176.84],[89.33,-168.13],[87.88,-162.5],[84.43,-157.6],[62.46,-149.25],[53.74,-143.25],[46.3,-140.17],[29.05,-128.91],[20.7,-127.09],[11.8,-127.09],[-26.69,-133.63],[-34.68,-132.18],[-43.03,-128.55],[-50.11,-123.83],[-55.56,-118.38],[-58.46,-113.48],[-59.55,-109.48],[-64.64,-68.63],[-66.82,-63.0],[-67.54,-51.2],[-65.54,-48.3],[-65.36,-44.66],[-63.37,-41.4,1],[-61.19,-42.12],[-59.01,-47.03,1],[-57.37,-45.94,1],[-58.1,-22.88],[-59.55,-14.16],[-55.56,-9.62],[-55.2,-6.9],[-56.28,-2.18],[-54.47,0.91,1],[-45.39,1.27],[-44.12,0.36,1],[-46.12,-6.9],[-49.57,-12.71],[-50.29,-18.52],[-50.29,-32.5],[-49.57,-37.95],[-48.48,-39.22,1],[-46.48,-36.13],[-45.03,-20.88],[-45.57,-15.8],[-44.66,-13.25],[-40.31,-8.9],[-40.31,-2.36],[-37.58,-0.18],[-30.14,-0.18],[-28.87,-1.09,1],[-30.87,-7.63],[-33.95,-11.08],[-35.77,-14.89],[-37.95,-24.33],[-39.4,-39.04],[-35.59,-52.84],[-30.14,-62.09],[-27.42,-69.72],[-19.97,-81.34,1],[-18.34,-81.16],[-7.08,-74.44],[1.63,-72.08],[11.98,-71.35],[27.05,-74.08],[30.87,-72.99,1],[31.23,-49.75],[29.78,-42.49],[31.23,-34.5],[28.69,-14.53],[33.41,-7.81],[32.68,-1.82],[35.77,1.27],[43.21,1.27],[45.94,-0.18],[52.65,-0.18],[53.92,-1.09,1],[52.11,-7.26],[49.2,-10.89],[47.03,-15.61],[45.57,-33.23],[47.75,-42.49],[47.75,-56.47],[50.66,-73.17],[56.47,-79.16],[61.55,-93.14],[72.81,-106.22],[81.52,-118.38],[83.7,-120.01],[86.06,-120.56],[92.42,-118.56],[101.68,-110.21],[104.76,-104.76],[108.58,-102.58],[113.48,-103.31],[118.2,-109.48],[118.2,-116.56],[116.75,-121.65],[109.48,-135.63],[107.3,-142.71],[100.04,-152.33],[100.04,-157.96],[103.67,-166.86],[105.13,-174.85]],"neusgat":[114.02,-111.84],"mond":[[106.76,-105.31],[116.2,-103.85]],"keelweb":{"p":[[85.76,-120.34,1],[85.77,-120.34,1],[84.22,-151.94,1],[84.21,-151.94,1]],"kop":[0,1,1,0]}},"edelhert":{"J":{"midrug":[0.0,-111.84],"nekBasis":[69.39,-91.43],"lend":[-32.65,-110.2],"kruis":[-58.78,-103.67],"kop":[97.96,-138.78],"neus":[137.14,-119.18],"kaak":[102.04,-120.0],"kin":[126.53,-109.39],"schoft":[47.35,-104.49],"schouder":[63.67,-83.27],"elleboog":[50.61,-63.67],"pols":[50.61,-35.1],"vkogel":[50.61,-8.98],"vteen":[57.14,0.0],"heup":[-48.98,-87.35],"knie":[-32.65,-62.04],"hak":[-60.41,-42.45],"akogel":[-57.14,-8.98],"ateen":[-50.61,0.0],"staart0":[-66.94,-102.86],"staart1":[-71.02,-93.06],"staart2":[-73.47,-84.9],"staart3":[-75.1,-78.37],"staart4":[-75.92,-71.84]},"delen":{"romp":{"c":"#8A593D","basis":[[88.16,-81.63],[68.16,-86.33],[42.65,-113.67],[42.65,-120.82],[40.82,-120.0],[34.9,-120.0],[33.47,-119.18],[30.0,-119.18],[28.57,-118.37],[25.92,-118.37],[24.49,-117.55],[12.04,-117.55],[10.61,-116.73],[8.16,-117.55],[-5.1,-117.55],[-6.53,-118.37],[-12.45,-118.37],[-13.88,-119.18],[-19.8,-119.18],[-21.22,-120.0],[-32.04,-120.0],[-33.47,-119.18],[-39.39,-118.37],[-48.37,-115.1],[-59.39,-109.18],[-64.08,-105.31],[-60.41,-98.16],[-63.06,-87.55],[-62.86,-81.63],[-62.04,-80.2],[-62.04,-75.92],[-61.22,-74.49],[-61.22,-61.63],[-56.94,-57.35],[-55.92,-57.35],[-55.31,-56.53],[-51.84,-56.53],[-51.22,-55.71],[-47.14,-56.53],[-41.02,-60.61],[-39.18,-60.61],[-38.37,-59.8],[-38.37,-58.37],[-34.9,-55.71],[-31.43,-55.71],[-30.82,-54.9],[-28.98,-54.9],[-28.37,-55.71],[-24.9,-55.71],[-24.29,-56.53],[-23.27,-56.53],[-21.63,-58.37],[-16.53,-67.96],[-15.51,-67.96],[-8.37,-64.69],[-6.53,-64.69],[-2.65,-63.06],[0.0,-63.06],[1.43,-62.24],[5.71,-62.24],[7.14,-61.43],[24.49,-61.43],[25.92,-60.61],[32.65,-60.61],[33.47,-59.8],[33.47,-58.37],[36.12,-56.53],[39.59,-56.53],[40.2,-55.71],[42.86,-55.71],[43.47,-56.53],[46.94,-56.53],[47.55,-57.35],[48.37,-57.35],[48.98,-59.39],[50.41,-60.61],[54.69,-61.43],[59.18,-63.27],[61.63,-64.9],[65.51,-69.39],[68.57,-70.41],[70.82,-72.04],[75.1,-72.86],[77.35,-74.49],[79.59,-74.69],[82.65,-77.76],[85.31,-78.78]],"lagen":[{"c":"#7A4D33","p":[[58.37,-109.39],[56.94,-112.04],[55.31,-113.88],[54.69,-115.1],[54.49,-117.35],[53.27,-118.78],[50.41,-120.0],[46.33,-120.0],[42.86,-120.82],[39.18,-120.0],[34.9,-120.0],[33.47,-119.39],[30.0,-119.18],[22.86,-117.55],[12.04,-117.55],[10.41,-116.94],[8.16,-117.55],[-3.47,-117.55],[-6.53,-118.37],[-10.82,-118.37],[-13.88,-119.18],[-19.8,-119.39],[-21.22,-120.0],[-32.04,-120.0],[-41.84,-117.55],[-43.88,-116.12],[-45.31,-112.24],[-48.16,-109.8],[-48.98,-108.37],[-51.43,-106.33],[-55.1,-102.24],[-56.94,-98.78],[-58.78,-93.27],[-58.98,-80.82],[-60.41,-75.31],[-60.61,-71.02],[-61.84,-68.57],[-62.45,-64.69],[-64.29,-61.22],[-64.9,-57.96],[-69.59,-55.92],[-72.24,-53.47],[-72.45,-52.45],[-71.43,-51.43],[-69.8,-51.43],[-67.55,-52.45],[-65.71,-54.29],[-65.1,-57.35],[-61.43,-58.78],[-54.69,-58.98],[-52.65,-59.8],[-50.61,-60.0],[-45.51,-58.16],[-42.86,-58.57],[-40.82,-57.76],[-40.0,-56.94],[-39.39,-55.51],[-39.39,-53.88],[-41.63,-48.37],[-44.69,-43.88],[-44.9,-41.84],[-44.08,-40.0],[-42.86,-39.18],[-41.43,-39.18],[-37.96,-41.84],[-36.12,-42.45],[-31.63,-42.45],[-30.41,-43.27],[-28.78,-46.53],[-24.69,-52.04],[-18.37,-64.08],[-18.37,-65.31],[-19.39,-66.33],[-21.02,-66.33],[-27.96,-63.88],[-29.39,-64.08],[-31.84,-65.1],[-32.86,-66.33],[-33.47,-68.16],[-33.06,-69.8],[-31.22,-72.45],[-27.35,-81.02],[-25.1,-88.98],[-23.06,-93.06],[-21.02,-95.31],[-15.71,-97.14],[-12.24,-97.35],[-5.51,-95.31],[0.0,-95.92],[3.06,-94.9],[6.33,-94.9],[10.82,-96.73],[13.47,-96.94],[17.35,-98.37],[20.82,-98.78],[27.14,-101.63],[31.22,-102.24],[33.47,-103.47],[36.12,-105.92],[40.61,-107.14],[44.9,-106.94],[48.57,-105.51],[51.43,-102.45],[53.67,-98.98],[55.92,-97.76],[57.55,-95.92],[60.0,-95.51],[60.82,-95.92],[61.02,-97.35],[58.78,-104.49]]},{"c":"#BB9071","p":[[-19.39,-71.63],[-19.39,-70.2],[-18.37,-69.18],[-13.06,-66.53],[-8.37,-64.69],[1.43,-62.24],[5.71,-62.04],[7.14,-61.43],[22.86,-61.43],[26.33,-60.61],[28.16,-61.22],[28.98,-62.04],[28.37,-66.12],[28.98,-71.22],[28.16,-72.04],[26.53,-72.65],[16.33,-70.2],[4.69,-70.2],[-5.92,-72.04],[-13.27,-74.9],[-15.92,-75.51],[-17.96,-74.49]]}]},"hum":{"c":"#8A593D","basis":[[36.73,-109.18],[39.18,-69.8],[43.67,-61.43],[54.69,-61.43],[57.14,-62.24],[61.63,-64.9],[65.51,-69.39],[68.57,-70.41],[70.82,-72.04],[75.1,-72.86],[77.35,-74.49],[79.59,-74.69],[82.65,-77.76],[85.31,-78.78],[87.96,-81.22],[87.76,-81.84],[68.16,-86.33],[48.78,-110.61]],"lagen":[]},"dij":{"c":"#8A593D","basis":[[-52.86,-112.86],[-61.84,-107.55],[-64.08,-105.31],[-60.41,-98.16],[-63.06,-87.55],[-62.86,-81.63],[-62.04,-80.2],[-62.04,-75.92],[-61.22,-74.49],[-61.63,-68.57],[-37.96,-62.86],[-30.41,-56.94],[-23.67,-60.61],[-23.67,-112.86]],"lagen":[]},"nek":{"c":"#8A593D","basis":[[96.33,-141.84],[87.35,-141.84],[87.35,-139.59],[88.98,-134.69],[83.67,-129.8],[80.82,-127.96],[77.96,-124.9],[71.02,-120.82],[66.12,-119.18],[52.04,-119.18],[50.61,-120.0],[44.49,-120.2],[44.9,-75.92],[80.82,-75.92],[83.47,-78.37],[85.31,-78.78],[88.37,-81.84],[91.22,-83.67],[92.86,-85.92],[95.92,-88.57],[96.94,-90.82],[100.0,-93.47],[103.47,-99.59],[103.67,-101.02],[105.1,-102.86],[105.1,-105.51],[106.73,-107.76],[106.73,-109.59],[108.16,-112.65],[101.63,-136.33]],"lagen":[{"c":"#7A4D33","p":[[85.1,-101.63],[84.29,-102.24],[82.04,-101.84],[75.71,-95.31],[74.49,-94.69],[72.04,-94.29],[68.98,-95.31],[66.53,-94.69],[66.12,-93.06],[67.55,-90.0],[67.96,-86.53],[69.39,-85.51],[72.24,-85.31],[77.96,-87.35],[78.98,-88.37],[80.2,-91.22],[83.47,-94.08],[84.08,-97.35],[85.31,-100.0]]},{"c":"#BB9071","p":[[106.53,-108.78],[104.49,-110.2],[100.0,-111.43],[98.78,-111.02],[97.96,-110.0],[97.14,-107.14],[95.71,-105.1],[95.1,-102.24],[93.06,-97.55],[89.8,-94.69],[88.57,-91.84],[86.12,-89.8],[82.86,-86.12],[80.41,-84.49],[77.35,-83.27],[75.1,-80.41],[72.24,-79.18],[69.18,-77.14],[66.94,-76.53],[64.69,-76.73],[62.65,-75.92],[60.0,-71.43],[58.37,-69.8],[53.27,-66.33],[53.27,-64.49],[55.31,-63.47],[61.43,-65.1],[66.12,-69.59],[70.2,-71.63],[80.2,-75.31],[84.29,-78.57],[86.53,-81.22],[90.61,-83.06],[93.27,-86.12],[95.51,-87.96],[98.57,-92.45],[99.8,-95.31],[102.86,-98.16],[104.9,-102.24],[105.31,-104.69],[106.53,-107.35]]}]},"kop":{"c":"#8A593D","basis":[[57.14,-190.61],[56.73,-189.59],[59.59,-183.06],[59.59,-181.22],[60.41,-179.8],[60.41,-175.51],[61.22,-174.08],[61.22,-171.43],[59.59,-168.98],[56.94,-168.98],[52.04,-173.47],[50.41,-176.53],[50.41,-164.29],[59.59,-162.65],[65.71,-160.0],[79.39,-149.8],[84.69,-147.14],[86.53,-147.14],[87.35,-146.33],[87.35,-142.04],[94.08,-141.84],[99.59,-93.06],[105.1,-102.86],[105.1,-105.51],[106.73,-107.76],[106.73,-109.59],[107.76,-111.63],[108.78,-112.65],[114.29,-112.86],[115.71,-113.67],[120.0,-113.67],[121.43,-114.49],[124.9,-114.49],[128.78,-112.86],[130.61,-112.86],[132.65,-113.88],[134.29,-115.51],[136.12,-118.37],[136.94,-120.82],[136.73,-122.24],[134.29,-124.69],[131.63,-125.92],[129.39,-127.96],[122.65,-132.24],[121.43,-133.88],[121.22,-135.31],[115.31,-138.78],[113.27,-142.04],[113.27,-143.06],[114.49,-144.49],[118.98,-146.33],[120.82,-146.33],[124.49,-148.16],[127.76,-150.61],[131.22,-158.37],[131.22,-163.47],[130.41,-164.49],[129.18,-163.88],[128.98,-160.0],[125.71,-153.06],[120.82,-150.2],[119.8,-150.2],[118.98,-151.02],[118.98,-152.04],[122.86,-156.33],[124.69,-161.63],[124.69,-168.37],[123.88,-169.39],[122.65,-168.78],[120.82,-160.0],[118.37,-156.73],[117.35,-156.73],[116.53,-157.55],[116.53,-163.47],[114.9,-165.1],[115.51,-167.14],[114.29,-167.76],[113.67,-166.12],[115.1,-164.9],[114.29,-163.47],[114.29,-160.0],[113.47,-158.57],[112.65,-154.29],[111.84,-153.47],[110.0,-153.47],[108.57,-154.69],[106.73,-159.18],[106.73,-168.37],[110.0,-177.96],[110.0,-188.78],[109.18,-189.8],[107.76,-188.78],[107.76,-180.41],[104.49,-173.88],[103.47,-173.88],[102.65,-174.69],[101.84,-177.14],[101.84,-179.8],[102.65,-181.22],[102.65,-186.33],[101.84,-187.76],[101.84,-190.41],[99.59,-195.92],[98.16,-195.51],[98.78,-191.84],[99.59,-190.41],[99.59,-182.04],[97.96,-178.78],[96.94,-178.78],[95.51,-180.0],[91.02,-190.0],[88.78,-193.06],[88.16,-193.06],[87.76,-192.04],[90.61,-183.88],[90.61,-182.04],[89.8,-181.22],[88.37,-181.43],[86.53,-183.27],[84.69,-186.53],[83.47,-185.92],[84.08,-182.86],[85.92,-179.8],[89.18,-176.73],[95.1,-173.27],[97.96,-170.41],[101.22,-164.29],[102.04,-157.55],[102.86,-156.12],[102.86,-154.29],[104.49,-151.22],[104.49,-149.39],[103.67,-148.57],[99.39,-148.57],[96.53,-149.59],[95.31,-151.02],[95.31,-153.67],[94.49,-155.1],[94.49,-158.57],[92.04,-164.49],[90.82,-163.88],[90.82,-162.86],[91.43,-161.84],[91.43,-156.73],[92.24,-155.31],[92.24,-152.65],[90.61,-151.02],[88.78,-151.02],[84.29,-152.86],[81.02,-155.1],[78.37,-157.96],[76.53,-161.63],[76.53,-174.9],[75.71,-176.33],[75.71,-178.98],[74.9,-181.43],[73.27,-184.08],[72.65,-184.08],[72.24,-183.06],[72.65,-180.41],[73.47,-178.98],[73.47,-167.35],[71.84,-164.9],[69.18,-164.9],[67.96,-165.71],[65.1,-170.61],[64.29,-176.53],[61.84,-183.88],[58.37,-190.0]],"lagen":[{"c":"#9A6F54","p":[[100.0,-135.1],[98.78,-132.04],[99.39,-129.39],[97.96,-125.71],[97.96,-121.84],[102.04,-117.55],[102.65,-116.12],[102.86,-112.24],[104.29,-110.82],[105.51,-110.61],[106.53,-111.02],[109.18,-114.9],[111.84,-115.92],[115.71,-114.9],[118.37,-113.67],[120.61,-113.88],[122.86,-115.51],[124.69,-118.16],[127.35,-119.39],[129.18,-122.24],[129.39,-124.29],[128.57,-125.1],[119.8,-128.98],[115.92,-128.98],[112.65,-127.96],[109.39,-128.78],[107.76,-131.43],[107.35,-135.31],[106.73,-136.53],[105.51,-137.35],[104.49,-137.55],[101.63,-136.73]]}]},"staart":{"c":"#8A593D","basis":[[-64.29,-105.31],[-67.76,-99.8],[-68.57,-95.51],[-69.39,-94.08],[-68.57,-88.98],[-66.94,-85.51],[-66.33,-85.51],[-64.69,-87.55],[-63.27,-87.14],[-60.61,-97.76]],"lagen":[]},"keelkap":{"c":"#8A593D","basis":[[92.04,-155.71],[92.24,-152.65],[91.02,-151.22],[88.78,-151.02],[85.92,-152.04],[83.06,-148.37],[84.69,-147.14],[86.53,-147.14],[87.35,-146.33],[87.35,-139.59],[88.98,-134.69],[83.67,-129.8],[80.82,-127.96],[80.0,-126.53],[82.24,-118.98],[84.69,-114.29],[87.35,-111.02],[92.24,-107.35],[94.9,-106.33],[99.18,-106.12],[102.04,-106.94],[105.71,-109.18],[108.78,-112.86],[111.02,-117.35],[112.86,-126.53],[112.65,-133.27],[111.63,-138.57],[110.0,-143.27],[107.55,-147.96],[103.88,-152.24],[104.49,-151.22],[104.49,-149.39],[103.67,-148.57],[99.39,-148.57],[96.94,-149.39],[95.31,-151.02],[95.31,-153.67],[94.49,-156.12]],"lagen":[]}},"tonen":["#7A4D33","#9A6F54","#8A593D","#423D40","#BB9071"],"oog":[112.65,-131.43],"K":1.225,"omtrek":[[109.18,-189.8],[107.76,-188.78],[107.76,-180.41],[104.49,-173.88],[102.65,-174.69],[101.84,-177.14],[102.65,-186.33],[99.59,-195.92],[98.16,-195.51],[99.59,-190.41],[99.59,-182.04],[97.96,-178.78],[95.51,-180.0],[88.78,-193.06],[87.76,-192.04],[90.61,-182.04],[88.37,-181.43],[84.69,-186.53],[83.47,-185.92],[85.92,-179.8],[95.1,-173.27],[98.57,-169.59],[101.22,-164.29],[102.04,-157.55],[104.49,-151.22],[103.67,-148.57],[99.39,-148.57],[95.51,-150.61],[94.49,-158.57],[92.04,-164.49],[90.82,-163.88],[92.24,-152.65],[91.02,-151.22],[86.33,-151.84],[78.98,-157.14],[76.53,-161.63],[76.53,-174.9],[73.27,-184.08],[72.24,-183.06],[73.47,-178.98],[73.47,-167.35],[71.84,-164.9],[69.18,-164.9],[65.1,-170.61],[61.84,-183.88],[57.76,-190.61],[56.73,-189.59],[59.59,-183.06],[61.22,-171.43],[59.59,-168.98],[56.53,-169.18],[52.04,-173.47],[47.14,-181.63],[46.12,-180.61],[48.98,-170.61],[47.14,-169.8],[40.82,-175.1],[38.98,-178.78],[37.96,-185.1],[36.12,-185.1],[35.92,-178.78],[38.37,-172.24],[36.53,-171.43],[33.27,-175.1],[32.24,-174.69],[33.67,-170.2],[36.12,-167.76],[42.24,-165.1],[52.24,-164.29],[63.67,-161.02],[79.39,-149.8],[87.35,-146.33],[87.35,-139.59],[88.98,-134.69],[77.96,-124.9],[71.02,-120.82],[66.12,-119.18],[52.04,-119.18],[42.24,-120.82],[24.49,-117.55],[12.04,-117.55],[10.61,-116.73],[8.16,-117.55],[-5.1,-117.55],[-21.22,-120.0],[-32.04,-120.0],[-48.37,-115.1],[-59.39,-109.18],[-64.29,-105.31],[-67.76,-99.8],[-69.39,-92.24],[-66.94,-85.51],[-64.69,-87.55],[-62.86,-86.73],[-61.22,-69.39],[-63.88,-61.63],[-70.61,-54.69],[-76.53,-50.41],[-77.55,-47.55],[-79.18,-31.84],[-82.45,-17.96],[-84.9,-12.45],[-85.31,-8.16],[-82.45,-5.92],[-82.45,0.82],[-80.61,2.86],[-76.73,3.06],[-75.31,4.69],[-72.65,4.69],[-71.43,2.86],[-76.12,-6.53],[-76.12,-16.53],[-70.2,-36.53],[-63.47,-45.1],[-41.02,-60.61],[-38.37,-59.8],[-38.37,-56.33],[-41.84,-47.76],[-44.9,-43.47],[-44.9,-41.63],[-29.39,-12.45],[-28.37,-7.76],[-22.24,-3.06],[-20.2,2.04],[-13.06,3.06],[-11.22,1.43],[-11.84,-0.61],[-17.96,-6.94],[-23.67,-15.92],[-31.22,-33.47],[-31.22,-41.84],[-24.9,-51.84],[-17.35,-67.14],[-15.51,-67.96],[-8.37,-64.69],[1.43,-62.24],[24.49,-61.43],[25.92,-60.61],[32.65,-60.61],[33.47,-59.8],[31.84,-50.82],[31.84,-44.08],[30.2,-39.39],[30.2,-30.2],[27.76,-19.59],[24.49,-11.63],[24.49,-8.16],[27.76,-4.29],[27.76,0.82],[30.82,3.06],[36.73,3.06],[37.76,2.24],[32.45,-8.16],[33.27,-19.8],[34.9,-26.33],[36.73,-27.14],[38.37,-25.51],[37.55,-8.16],[41.63,-3.47],[41.84,2.04],[44.69,4.69],[52.86,4.08],[51.84,1.02],[45.51,-8.16],[43.88,-17.96],[43.88,-27.14],[45.51,-31.84],[45.51,-45.1],[48.98,-59.39],[59.18,-63.27],[65.51,-69.39],[79.59,-74.69],[91.22,-83.67],[100.0,-93.47],[105.1,-102.86],[105.1,-105.51],[108.78,-112.65],[121.43,-114.49],[130.61,-112.86],[134.29,-115.51],[136.94,-120.82],[135.31,-123.88],[122.65,-132.24],[121.22,-135.31],[115.31,-138.78],[113.27,-142.04],[114.49,-144.49],[120.82,-146.33],[127.76,-150.61],[131.22,-158.37],[131.22,-163.47],[130.41,-164.49],[129.18,-163.88],[128.98,-160.0],[125.71,-153.06],[119.8,-150.2],[118.98,-152.04],[122.86,-156.33],[124.69,-161.63],[124.69,-168.37],[123.88,-169.39],[122.65,-168.78],[120.82,-160.0],[118.37,-156.73],[116.53,-157.55],[116.53,-163.47],[114.9,-165.1],[115.51,-167.14],[114.29,-167.76],[113.67,-166.12],[115.1,-164.9],[112.65,-154.29],[110.0,-153.47],[108.57,-154.69],[106.73,-159.18],[106.73,-168.37],[110.0,-177.96],[110.0,-188.78]],"neusgat":[135.51,-119.18],"mond":[[126.53,-114.29],[136.33,-115.1]]},"koe":{"J":{"midrug":[0.0,-133.29],"nekBasis":[79.22,-102.28],"lend":[-33.95,-134.97],"kruis":[-75.45,-131.62],"kop":[105.63,-145.87],"neus":[133.54,-110.66],"kaak":[109.4,-117.37],"kin":[126.75,-103.95],"schoft":[56.59,-123.23],"schouder":[76.96,-82.99],"elleboog":[60.36,-57.01],"pols":[61.87,-28.5],"vkogel":[61.87,-8.38],"vteen":[67.9,0.0],"heup":[-60.36,-102.28],"knie":[-39.23,-68.74],"hak":[-60.36,-39.4],"akogel":[-61.87,-8.38],"ateen":[-54.32,0.0],"staart0":[-90.54,-133.29],"staart1":[-94.31,-106.47],"staart2":[-95.82,-81.32],"staart3":[-97.33,-56.17],"staart4":[-98.84,-31.02]},"delen":{"romp":{"c":"#834B30","basis":[[79.98,-89.7],[51.49,-133.5],[51.31,-140.84],[48.85,-140.84],[47.53,-141.68],[43.57,-141.68],[42.25,-142.51],[25.46,-142.51],[24.14,-141.68],[15.66,-141.68],[14.34,-142.51],[5.09,-142.51],[3.77,-141.68],[-0.19,-141.68],[-1.51,-140.84],[-20.56,-140.84],[-21.88,-140.0],[-32.63,-140.0],[-33.95,-139.16],[-45.46,-139.16],[-46.78,-140.0],[-58.28,-140.0],[-59.6,-139.16],[-66.58,-139.16],[-67.9,-140.0],[-75.64,-140.0],[-76.96,-139.16],[-80.16,-139.16],[-81.49,-138.32],[-83.18,-138.32],[-86.77,-135.81],[-84.31,-123.65],[-88.28,-94.52],[-88.28,-91.38],[-86.77,-86.56],[-86.77,-82.99],[-86.01,-81.53],[-86.01,-78.8],[-85.26,-77.34],[-85.26,-72.93],[-86.01,-71.47],[-86.01,-59.94],[-85.26,-59.31],[-84.5,-56.59],[-79.79,-51.35],[-78.84,-51.35],[-78.28,-50.51],[-76.58,-50.51],[-76.01,-49.67],[-72.05,-49.67],[-71.49,-48.83],[-68.28,-48.83],[-67.72,-49.67],[-64.7,-49.67],[-63.57,-51.35],[-62.62,-51.35],[-61.87,-49.67],[-59.04,-49.67],[-57.53,-51.35],[-55.08,-51.35],[-53.95,-49.67],[-53.38,-50.51],[-50.74,-50.51],[-49.61,-51.98],[-46.4,-53.23],[-40.18,-58.89],[-35.46,-58.89],[-32.63,-57.22],[-25.84,-54.7],[-21.13,-53.86],[-19.81,-53.02],[-15.09,-53.02],[-13.77,-53.86],[-9.05,-53.86],[-7.73,-54.7],[-3.77,-54.7],[-2.45,-55.54],[0.0,-55.54],[1.32,-56.38],[3.77,-56.38],[5.09,-57.22],[7.54,-57.22],[8.87,-58.05],[21.13,-58.05],[24.14,-56.38],[24.14,-53.23],[29.61,-47.16],[30.56,-47.16],[31.12,-46.32],[32.82,-46.32],[33.39,-45.48],[37.35,-45.48],[37.91,-44.64],[39.61,-44.64],[40.18,-45.48],[44.14,-45.48],[44.7,-46.32],[46.4,-46.32],[48.1,-48.83],[53.57,-49.67],[57.72,-53.02],[62.43,-60.99],[68.28,-67.49],[69.98,-71.26],[72.43,-79.43],[76.77,-86.14]],"lagen":[{"c":"#E8D7C6","p":[[41.87,-142.31],[26.41,-142.51],[25.09,-141.89],[24.33,-141.05],[24.33,-139.58],[25.46,-136.86],[25.09,-133.92],[24.52,-132.87],[21.5,-129.94],[20.37,-126.8],[17.73,-123.65],[17.16,-118.2],[14.52,-112.96],[14.34,-110.87],[15.09,-108.98],[16.22,-108.14],[17.73,-108.14],[21.31,-109.61],[23.39,-109.19],[24.9,-107.93],[26.03,-105.63],[26.22,-101.44],[25.46,-98.08],[22.63,-93.05],[22.63,-89.07],[23.77,-86.56],[25.84,-88.44],[28.1,-93.68],[31.31,-96.83],[31.5,-99.76],[30.18,-103.11],[29.99,-105.84],[29.43,-107.31],[29.43,-109.19],[31.5,-115.27],[30.93,-117.57],[31.12,-119.04],[32.25,-122.4],[34.14,-125.54],[35.65,-127.22],[38.67,-129.31],[39.42,-134.13],[40.93,-137.28],[43.38,-140.21],[43.19,-141.26]]},{"c":"#E8D7C6","p":[[-40.93,-139.16],[-45.46,-139.37],[-46.78,-140.0],[-58.28,-140.0],[-61.11,-139.16],[-65.07,-139.16],[-67.9,-140.0],[-74.69,-140.0],[-76.77,-138.53],[-76.2,-132.87],[-75.07,-131.41],[-70.36,-129.31],[-67.9,-129.1],[-64.51,-127.63],[-63.38,-126.38],[-62.62,-123.44],[-62.81,-120.72],[-64.13,-116.74],[-64.13,-113.38],[-63.0,-110.66],[-62.62,-108.35],[-62.81,-104.79],[-66.4,-94.94],[-70.92,-89.7],[-71.11,-84.67],[-71.68,-83.2],[-74.51,-79.85],[-74.51,-78.17],[-73.37,-73.98],[-73.37,-72.1],[-73.94,-70.63],[-74.13,-65.39],[-74.69,-64.13],[-77.52,-60.99],[-78.66,-55.33],[-80.73,-50.3],[-80.73,-49.04],[-78.66,-45.48],[-78.47,-41.92],[-77.9,-40.03],[-75.07,-35.84],[-74.88,-34.58],[-75.45,-32.28],[-71.87,-19.49],[-71.68,-12.16],[-70.54,-10.69],[-68.47,-9.64],[-67.15,-8.17],[-66.21,-4.19],[-64.51,-3.14],[-62.06,-3.77],[-60.17,-4.82],[-59.04,-6.29],[-59.04,-7.54],[-60.93,-11.95],[-61.49,-15.09],[-63.19,-18.65],[-63.57,-21.17],[-64.89,-25.15],[-65.83,-31.02],[-65.83,-42.13],[-64.13,-53.02],[-60.17,-66.23],[-57.53,-72.1],[-54.7,-75.66],[-52.81,-76.92],[-49.99,-77.96],[-46.78,-77.96],[-43.19,-76.5],[-33.76,-68.74],[-32.25,-68.74],[-31.12,-70.0],[-31.31,-77.34],[-33.2,-78.8],[-34.9,-79.01],[-37.16,-80.06],[-39.61,-81.95],[-41.5,-84.67],[-41.5,-90.75],[-40.37,-93.26],[-40.18,-95.36],[-42.06,-97.66],[-43.01,-99.76],[-43.19,-106.05],[-42.82,-108.14],[-41.12,-110.87],[-41.31,-111.92],[-42.06,-112.54],[-43.76,-112.34],[-44.51,-111.29],[-45.08,-107.93],[-46.59,-106.26],[-52.44,-103.74],[-54.13,-103.53],[-55.27,-103.95],[-56.78,-105.21],[-57.34,-106.47],[-57.15,-110.66],[-55.46,-114.43],[-53.19,-116.95],[-52.44,-118.41],[-52.06,-122.6],[-50.74,-125.33],[-48.85,-127.43],[-46.59,-131.41],[-45.08,-133.08],[-41.69,-134.55],[-39.04,-136.44],[-39.04,-137.9]]},{"c":"#E8D7C6","p":[[23.96,-84.25],[23.39,-84.67],[21.69,-83.2],[20.18,-81.32],[18.49,-77.54],[16.03,-76.08],[12.45,-76.29],[11.32,-76.92],[9.05,-79.64],[7.73,-80.27],[4.9,-79.22],[3.96,-78.17],[3.4,-75.66],[0.38,-70.0],[-3.4,-67.07],[-3.4,-65.18],[-1.13,-63.92],[5.28,-65.6],[7.54,-66.86],[11.88,-68.32],[13.77,-68.11],[16.6,-66.65],[18.67,-66.44],[24.52,-68.74],[25.46,-70.0],[25.46,-76.5],[24.9,-77.96],[24.71,-82.16]]},{"c":"#E8D7C6","p":[[70.73,-77.96],[68.85,-78.17],[65.45,-75.87],[62.06,-75.03],[60.17,-75.87],[59.42,-76.71],[58.47,-79.85],[57.53,-80.69],[55.46,-80.69],[50.93,-78.8],[49.23,-76.92],[48.85,-74.61],[47.91,-72.51],[45.08,-70.0],[43.95,-67.9],[43.01,-64.34],[43.57,-61.62],[42.25,-58.26],[43.57,-57.22],[46.97,-55.75],[48.29,-54.28],[48.85,-53.02],[49.04,-50.72],[50.17,-49.46],[52.25,-49.46],[56.02,-51.35],[58.28,-53.65],[62.43,-60.78],[68.47,-67.69],[71.3,-75.66],[71.3,-77.13]]},{"c":"#C6AD9B","p":[[-87.14,-95.78],[-88.28,-94.52],[-88.28,-91.38],[-87.33,-87.4],[-86.2,-84.88],[-86.01,-78.8],[-85.26,-75.66],[-86.2,-68.74],[-89.03,-59.94],[-90.54,-58.68],[-94.31,-57.84],[-95.07,-56.8],[-95.82,-53.86],[-100.16,-47.57],[-101.1,-44.64],[-101.1,-41.5],[-100.16,-40.24],[-99.22,-39.82],[-95.63,-40.87],[-93.56,-40.45],[-90.54,-37.72],[-85.63,-35.42],[-83.18,-36.89],[-80.35,-43.8],[-80.16,-47.16],[-80.73,-48.62],[-80.73,-50.51],[-78.84,-54.7],[-77.9,-58.68],[-77.9,-69.79],[-78.47,-71.26],[-78.66,-73.98],[-80.73,-79.64],[-81.11,-82.99],[-82.24,-85.51],[-82.43,-88.23],[-83.94,-93.26],[-85.07,-95.36]]},{"c":"#C6AD9B","p":[[-63.38,-52.4],[-61.49,-50.51],[-60.17,-50.09],[-58.28,-50.3],[-55.83,-49.25],[-54.51,-47.16],[-54.13,-45.27],[-53.19,-44.43],[-51.87,-44.43],[-50.74,-45.69],[-50.55,-49.67],[-49.23,-51.77],[-46.59,-53.02],[-43.76,-55.12],[-41.31,-57.63],[-38.67,-58.68],[-36.22,-58.68],[-25.84,-54.7],[-19.81,-53.02],[-15.09,-53.02],[-13.77,-53.65],[-3.77,-54.7],[-2.45,-55.33],[0.0,-55.54],[1.32,-56.17],[3.77,-56.38],[10.37,-58.05],[22.82,-57.84],[23.96,-59.1],[23.96,-65.18],[23.2,-66.23],[22.07,-66.65],[18.67,-66.02],[16.41,-66.44],[12.45,-68.11],[10.75,-68.11],[2.26,-64.76],[-2.26,-63.71],[-7.36,-64.13],[-10.56,-65.39],[-13.01,-65.39],[-15.84,-64.55],[-19.62,-64.97],[-24.33,-64.76],[-32.25,-67.49],[-39.99,-74.19],[-45.46,-77.75],[-50.55,-77.96],[-54.51,-75.87],[-57.34,-72.51],[-60.17,-66.23],[-63.38,-55.54]]}]},"hum":{"c":"#834B30","basis":[[58.28,-130.36],[44.33,-128.68],[47.16,-64.13],[52.44,-54.49],[58.66,-54.49],[62.43,-60.99],[68.28,-67.49],[69.98,-71.26],[72.43,-79.43],[76.77,-86.14],[80.16,-89.91]],"lagen":[]},"dij":{"c":"#834B30","basis":[[-86.01,-132.04],[-84.31,-122.6],[-88.28,-94.52],[-88.28,-91.38],[-86.77,-86.56],[-86.77,-82.99],[-86.01,-80.48],[-46.02,-70.0],[-36.78,-62.66],[-29.05,-66.86],[-30.75,-132.04]],"lagen":[]},"nek":{"c":"#834B30","basis":[[98.46,-148.59],[96.01,-147.34],[93.18,-143.56],[91.29,-142.51],[88.09,-142.51],[83.75,-140.84],[79.03,-140.84],[77.71,-140.0],[64.7,-140.0],[63.38,-140.84],[55.64,-140.84],[54.32,-140.0],[55.08,-74.4],[70.73,-74.4],[72.24,-79.01],[76.77,-86.14],[81.11,-90.75],[86.2,-98.29],[88.84,-99.97],[95.63,-102.49],[97.33,-102.49],[100.16,-100.81],[102.04,-100.81]],"lagen":[]},"kop":{"c":"#E8D7C6","basis":[[89.03,-146.71],[98.08,-149.22],[107.14,-145.03],[114.68,-136.65],[122.98,-125.75],[129.77,-116.53],[133.54,-111.5],[135.81,-105.63],[133.54,-99.76],[128.26,-97.25],[121.47,-98.08],[112.42,-100.6],[102.61,-103.11],[95.07,-107.31],[89.78,-114.85],[86.77,-124.91],[86.01,-135.81]],"lagen":[{"c":"#834B30","p":[[81.49,-145.87],[98.84,-147.54],[104.87,-138.32],[110.16,-124.91],[113.17,-112.34],[107.89,-103.11],[97.33,-103.95],[88.28,-96.41],[79.98,-92.22],[72.43,-95.57],[74.69,-110.66],[79.98,-124.07],[81.49,-135.81]]},{"c":"#D8B6A6","p":[[127.51,-118.2],[133.54,-112.34],[135.81,-103.95],[129.77,-97.25],[123.74,-101.44],[125.25,-111.5]]}]},"staart":{"c":"#834B30","basis":[[-86.96,-135.81],[-91.1,-131.41],[-94.31,-123.44],[-94.31,-119.04],[-95.07,-117.57],[-95.07,-108.98],[-94.31,-107.51],[-94.31,-90.54],[-95.07,-89.07],[-95.07,-85.51],[-95.82,-84.04],[-96.57,-79.64],[-102.61,-67.28],[-104.12,-62.25],[-104.12,-58.68],[-104.87,-57.22],[-104.87,-56.17],[-103.37,-53.86],[-103.37,-46.11],[-101.29,-43.38],[-100.91,-40.66],[-99.4,-38.98],[-98.46,-38.98],[-94.12,-43.59],[-92.8,-43.8],[-92.05,-42.96],[-92.05,-37.72],[-92.8,-36.26],[-92.8,-25.99],[-93.56,-24.52],[-93.56,-20.96],[-94.31,-18.44],[-90.73,-18.44],[-90.73,-72.31],[-91.48,-73.77],[-91.48,-88.23],[-90.73,-89.7],[-90.73,-94.94],[-89.97,-95.78],[-89.03,-95.78],[-88.28,-94.73],[-84.5,-122.6]],"lagen":[]},"keelkap":{"c":"#834B30","basis":[[99.59,-108.98],[90.54,-103.95],[82.99,-95.57],[74.69,-93.89],[70.92,-103.95],[76.96,-117.37],[84.5,-125.75],[96.57,-119.04]],"lagen":[]},"oor":{"c":"#6A3824","basis":[[95.07,-141.68],[84.5,-144.19],[73.94,-144.19],[67.9,-140.84],[72.43,-135.81],[83.75,-133.29],[95.07,-133.29]],"lagen":[{"c":"#C99A88","p":[[87.52,-139.16],[81.49,-140.84],[76.2,-140.84],[74.69,-139.16],[76.96,-137.49],[82.24,-136.65],[87.52,-136.65]]}]},"kaak":{"c":"#E8D7C6","basis":[[113.17,-103.11],[128.26,-99.76],[126.75,-95.57],[114.68,-95.57]],"lagen":[]}},"tonen":["#C6AD9B","#834B30","#E8D7C6","#565051"],"oog":[105.63,-128.26],"K":1.1928571428571428,"omtrek":[[132.6,-110.03],[118.27,-127.84],[115.81,-134.76],[108.46,-142.1],[106.76,-148.17],[104.12,-150.06],[99.78,-149.85],[91.29,-142.51],[77.71,-140.0],[64.7,-140.0],[63.38,-140.84],[53.38,-140.0],[42.25,-142.51],[25.46,-142.51],[24.14,-141.68],[5.09,-142.51],[-1.51,-140.84],[-20.56,-140.84],[-33.95,-139.16],[-75.64,-140.0],[-83.18,-138.32],[-90.35,-132.46],[-94.31,-123.44],[-95.07,-117.57],[-94.31,-90.54],[-96.57,-79.64],[-102.61,-67.28],[-104.87,-57.22],[-103.37,-53.86],[-103.37,-46.11],[-101.29,-43.38],[-100.91,-40.66],[-98.46,-38.98],[-94.12,-43.59],[-92.05,-42.96],[-92.8,-25.99],[-95.44,-10.27],[-91.48,-8.17],[-91.29,-1.68],[-89.6,0.42],[-87.71,1.47],[-79.98,1.47],[-79.03,0.63],[-85.45,-12.57],[-85.45,-25.36],[-83.94,-35.42],[-80.92,-42.96],[-79.22,-43.8],[-72.43,-22.84],[-70.73,-7.96],[-66.58,-5.66],[-66.4,-0.84],[-63.94,2.1],[-54.32,2.31],[-53.38,0.84],[-61.3,-12.57],[-65.83,-29.34],[-65.83,-43.8],[-65.07,-48.83],[-63.57,-51.35],[-61.87,-50.51],[-61.87,-45.27],[-60.93,-44.01],[-59.04,-45.27],[-58.85,-50.09],[-57.53,-51.35],[-55.08,-51.35],[-54.32,-50.51],[-54.32,-45.27],[-52.06,-43.8],[-50.74,-45.27],[-50.55,-50.93],[-44.14,-54.91],[-40.18,-58.89],[-35.46,-58.89],[-19.81,-53.02],[-3.77,-54.7],[8.87,-58.05],[21.13,-58.05],[24.14,-56.38],[24.14,-41.92],[23.39,-40.45],[24.14,-25.99],[20.37,-11.95],[20.56,-7.96],[23.39,-6.08],[22.63,-0.84],[23.58,1.26],[26.22,3.14],[34.71,3.14],[35.65,2.31],[30.75,-8.38],[29.99,-18.65],[31.5,-28.71],[34.52,-34.58],[36.22,-35.42],[37.72,-32.07],[37.72,-25.99],[38.48,-24.52],[38.48,-19.28],[36.97,-12.78],[37.72,-8.38],[40.74,-6.08],[40.74,-1.68],[43.19,1.26],[52.06,1.47],[53.0,0.0],[46.59,-10.9],[46.59,-14.46],[45.08,-19.28],[45.08,-29.55],[47.34,-37.72],[46.59,-41.08],[47.34,-47.99],[53.57,-49.67],[57.72,-53.02],[62.43,-60.99],[68.28,-67.49],[73.94,-81.95],[86.96,-98.92],[97.33,-102.49],[100.16,-100.81],[108.65,-100.81],[109.97,-101.65],[116.95,-100.81],[120.53,-98.29],[123.74,-98.29],[131.66,-103.53]],"neusgat":[129.02,-109.82],"mond":[[114.68,-102.28],[126.75,-103.11]]},"nijlpaard":{"J":{"midrug":[0.0,-142.64],"nekBasis":[110.43,-105.83],"lend":[-46.01,-140.8],"kruis":[-105.83,-123.31],"kop":[156.44,-121.47],"neus":[228.23,-59.27],"kaak":[155.16,-70.48],"kin":[223.01,-63.32],"schoft":[78.22,-110.43],"schouder":[101.23,-78.22],"elleboog":[78.22,-46.01],"pols":[80.98,-20.25],"vkogel":[80.98,-8.28],"vteen":[92.02,0.0],"heup":[-87.42,-82.82],"knie":[-59.82,-47.85],"hak":[-82.82,-25.77],"akogel":[-80.98,-8.28],"ateen":[-69.94,0.0],"staart0":[-115.95,-112.27],"staart1":[-120.55,-101.23],"staart2":[-123.31,-92.02],"staart3":[-125.15,-84.66],"staart4":[-126.07,-78.22]},"delen":{"romp":{"c":"#655458","basis":[[138.73,-74.54],[106.75,-82.36],[106.29,-150.0],[101.0,-150.0],[99.39,-150.92],[95.48,-150.92],[93.87,-151.84],[88.11,-151.84],[83.74,-153.68],[80.75,-153.68],[79.14,-154.6],[58.67,-154.6],[57.06,-153.68],[52.22,-153.68],[50.61,-152.76],[47.62,-152.76],[46.01,-151.84],[42.1,-151.84],[40.49,-150.92],[33.82,-150.92],[32.21,-150.0],[12.65,-150.0],[11.04,-150.92],[0.69,-150.92],[-0.92,-151.84],[-9.43,-151.84],[-11.04,-152.76],[-35.2,-152.76],[-36.81,-151.84],[-42.56,-151.84],[-44.17,-150.92],[-48.08,-150.92],[-49.69,-150.0],[-55.44,-149.08],[-59.82,-147.24],[-61.89,-147.24],[-65.34,-145.4],[-71.09,-143.56],[-87.19,-135.05],[-99.39,-125.84],[-103.76,-121.47],[-111.35,-111.58],[-110.43,-108.36],[-115.49,-84.43],[-115.03,-82.36],[-114.11,-81.67],[-114.11,-79.6],[-112.27,-77.99],[-112.27,-76.84],[-110.43,-76.61],[-109.51,-75.69],[-109.51,-62.58],[-108.59,-60.97],[-108.59,-55.67],[-107.67,-54.98],[-107.67,-52.91],[-105.83,-51.3],[-105.83,-50.15],[-98.24,-42.56],[-97.09,-42.56],[-92.71,-39.8],[-90.64,-39.8],[-89.95,-38.88],[-84.2,-38.88],[-83.05,-39.8],[-81.9,-39.8],[-80.98,-37.96],[-79.6,-37.96],[-78.91,-37.04],[-72.24,-37.04],[-71.55,-36.12],[-67.64,-36.12],[-66.95,-37.04],[-60.28,-37.04],[-59.59,-37.96],[-57.52,-37.96],[-56.83,-38.88],[-51.99,-40.72],[-51.53,-43.02],[-50.38,-44.17],[-48.77,-44.4],[-29.68,-37.04],[-23.01,-36.12],[-21.4,-35.2],[-17.48,-35.2],[-15.87,-34.28],[-7.36,-34.28],[-5.75,-33.36],[3.68,-33.36],[5.29,-34.28],[14.72,-34.28],[16.33,-35.2],[25.77,-36.12],[27.38,-37.04],[36.81,-38.88],[54.06,-45.32],[56.13,-45.32],[58.21,-42.56],[60.28,-42.56],[60.97,-41.64],[67.64,-41.64],[68.33,-40.72],[72.24,-40.72],[72.93,-41.64],[79.6,-41.64],[80.29,-42.56],[82.36,-42.56],[83.05,-43.48],[87.88,-45.32],[92.71,-50.15],[94.56,-53.6],[99.85,-55.67],[108.36,-62.81],[111.35,-62.81],[114.11,-61.89],[120.32,-64.65],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[133.67,-63.04],[138.73,-60.97]],"lagen":[{"c":"#A7766F","p":[[-47.85,-97.55],[-34.97,-66.26],[-11.04,-42.33],[27.61,-34.05],[66.26,-44.17],[84.66,-71.78],[66.26,-60.74],[31.29,-53.37],[-3.68,-57.98],[-25.77,-75.46],[-39.57,-95.71]]},{"c":"#57494E","p":[[-110.43,-133.44],[-64.42,-147.24],[0.0,-150.92],[55.21,-147.24],[92.02,-136.2],[55.21,-138.04],[0.0,-140.8],[-59.82,-137.12],[-101.23,-123.31]]}]},"hum":{"c":"#655458","basis":[[64.88,-116.18],[63.96,-53.6],[69.71,-43.25],[87.65,-43.25],[91.56,-44.63],[92.71,-50.84],[93.63,-52.68],[96.4,-54.52],[99.85,-55.67],[108.36,-62.81],[111.35,-62.81],[114.11,-61.89],[120.32,-64.65],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[133.67,-63.04],[138.73,-60.97],[138.73,-74.54],[106.75,-82.13],[80.06,-118.02]],"lagen":[]},"dij":{"c":"#655458","basis":[[-108.82,-114.8],[-111.35,-111.58],[-110.43,-108.36],[-116.18,-79.6],[-115.95,-76.38],[-114.11,-74.31],[-113.42,-74.31],[-111.58,-76.61],[-110.43,-76.61],[-109.51,-75.69],[-109.51,-69.94],[-110.43,-68.33],[-110.43,-64.42],[-108.59,-60.97],[-108.59,-59.36],[-66.49,-49.0],[-57.06,-41.41],[-49.0,-45.78],[-55.67,-114.8]],"lagen":[]},"nek":{"c":"#655458","basis":[[76.38,-154.6],[77.76,-69.02],[129.06,-69.02],[131.13,-64.65],[137.81,-60.97],[139.88,-60.97],[141.49,-60.05],[144.48,-60.05],[146.09,-60.97],[150.0,-60.97],[152.07,-59.36],[157.82,-56.83],[159.43,-61.89],[156.21,-132.29],[154.14,-133.9],[150.69,-135.05],[151.38,-136.89],[148.62,-138.73],[140.8,-142.64],[130.67,-146.32],[124.0,-147.24],[122.39,-148.16],[119.4,-148.16],[117.79,-149.08],[111.12,-149.08],[109.51,-150.0],[101.0,-150.0],[99.39,-150.92],[95.48,-150.92],[93.87,-151.84],[88.11,-151.84],[83.74,-153.68]],"lagen":[{"c":"#A7766F","p":[[108.59,-103.07],[117.79,-108.59],[123.31,-82.82],[120.55,-57.06],[112.27,-53.37],[115.95,-79.14]]},{"c":"#A7766F","p":[[92.02,-97.55],[99.39,-101.23],[103.07,-73.62],[99.39,-49.69],[92.94,-51.53],[95.71,-75.46]]}]},"kop":{"c":"#655458","basis":[[138.41,-131.34],[153.44,-123.54],[157.72,-122.71],[156.86,-115.91],[160.86,-113.32],[173.45,-110.6],[178.38,-102.95],[193.42,-95.15],[208.45,-87.34],[218.51,-84.67],[227.25,-78.22],[230.9,-69.33],[228.74,-59.76],[221.32,-53.56],[213.26,-54.69],[196.65,-58.48],[180.04,-62.27],[169.21,-64.2],[162.64,-64.3],[151.26,-63.21],[136.94,-67.72],[118.29,-86.95],[111.49,-105.23]],"lagen":[{"c":"#8C6A6A","p":[[147.93,-93.31],[168.21,-81.64],[172.06,-69.46],[163.16,-64.8],[151.77,-63.71],[137.45,-68.22],[132.12,-82.95]]},{"c":"#B98680","p":[[173.31,-101.52],[171.88,-100.77],[170.09,-100.83],[168.3,-101.68],[166.86,-103.16],[166.06,-104.98],[166.05,-106.77],[166.84,-108.18],[168.28,-108.93],[170.07,-108.87],[171.86,-108.01],[173.29,-106.53],[174.1,-104.71],[174.1,-102.93]]},{"c":"#B98680","p":[[153.67,-121.76],[157.21,-122.22],[156.63,-117.68],[153.61,-117.72]]},{"c":"#57494E","p":[[217.49,-83.67],[226.48,-77.47],[230.14,-69.08],[227.99,-60.03],[221.34,-54.57],[214.79,-55.68],[214.9,-63.26],[216.59,-74.85]]}]},"staart":{"c":"#655458","basis":[[-111.58,-111.12],[-115.95,-101.46],[-116.87,-94.79],[-117.79,-93.17],[-117.79,-85.58],[-116.87,-83.97],[-116.41,-80.06],[-110.66,-108.36]],"lagen":[]},"kaak":{"c":"#655458","basis":[[153.87,-70.41],[161.8,-77.69],[176.59,-68.69],[202.58,-57.82],[218.29,-60.68],[223.58,-63.75],[227.29,-59.39],[221.29,-47.75],[205.86,-41.54],[186.29,-43.83],[171.01,-51.12],[157.94,-61.41]],"lagen":[]},"keelkap":{"c":"#655458","basis":[[137.35,-143.56],[134.13,-141.95],[126.99,-135.51],[121.24,-128.37],[116.41,-119.4],[113.19,-110.66],[111.12,-100.77],[110.66,-89.49],[111.81,-80.75],[114.11,-73.16],[118.25,-66.26],[120.09,-64.42],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[137.81,-60.97],[144.48,-60.05],[150.69,-62.12],[157.82,-68.56],[163.57,-75.69],[168.4,-85.12],[171.63,-93.63],[173.7,-103.3],[174.16,-114.57],[173.7,-116.87],[170.02,-120.09],[166.33,-125.15],[167.25,-131.83],[165.18,-134.13],[163.57,-134.36],[160.12,-130.67],[158.05,-130.67],[152.53,-135.97],[148.62,-138.73],[140.8,-142.64]],"lagen":[]}},"tonen":["#514348","#A4746E","#655458","#896766"],"oog":[170.08,-104.85],"K":1.0866666666666667,"omtrek":[[206.83,-70.17],[204.75,-75.23],[199.0,-78.45],[194.86,-82.36],[181.29,-99.85],[181.98,-110.66],[178.07,-115.72],[172.32,-117.79],[166.56,-124.69],[167.02,-132.29],[163.57,-134.36],[160.12,-130.67],[158.05,-130.67],[148.62,-138.73],[130.67,-146.32],[117.79,-149.08],[88.11,-151.84],[79.14,-154.6],[58.67,-154.6],[32.21,-150.0],[12.65,-150.0],[-11.04,-152.76],[-35.2,-152.76],[-48.08,-150.92],[-71.09,-143.56],[-89.95,-133.21],[-103.76,-121.47],[-111.12,-112.04],[-114.11,-106.06],[-117.79,-93.17],[-117.79,-85.58],[-115.72,-75.92],[-114.11,-74.31],[-111.58,-76.61],[-109.51,-75.69],[-110.43,-64.42],[-108.59,-60.97],[-108.59,-51.53],[-110.66,-46.47],[-115.95,-38.88],[-115.03,-33.36],[-115.03,-10.12],[-115.95,-7.36],[-113.42,-3.91],[-106.06,-2.99],[-94.79,-2.99],[-89.72,-4.14],[-88.8,-7.13],[-91.56,-10.81],[-95.94,-13.8],[-95.02,-25.08],[-94.1,-27.84],[-83.05,-39.8],[-80.98,-38.88],[-81.9,-29.45],[-79.83,-25.31],[-76.61,-22.78],[-67.41,-9.89],[-65.11,-3.22],[-63.73,-2.07],[-48.77,-1.15],[-47.16,-2.07],[-39.57,-2.07],[-37.96,-3.68],[-37.96,-5.75],[-41.87,-9.89],[-47.16,-12.88],[-53.6,-26.69],[-53.6,-33.36],[-51.76,-42.56],[-49.92,-44.4],[-26.0,-36.12],[-15.87,-34.28],[3.68,-33.36],[25.77,-36.12],[56.13,-45.32],[57.06,-44.4],[57.06,-34.97],[56.13,-33.36],[57.06,-8.28],[56.13,-5.52],[57.29,-3.22],[63.27,-1.15],[81.9,-1.15],[87.19,-3.91],[95.71,-3.91],[97.78,-5.75],[96.17,-8.97],[88.11,-14.72],[87.19,-26.0],[89.03,-30.37],[89.03,-37.04],[93.63,-52.68],[99.85,-55.67],[107.9,-62.58],[114.11,-61.89],[120.32,-64.65],[124.0,-63.73],[131.6,-64.65],[141.49,-60.05],[150.0,-60.97],[157.36,-57.29],[162.19,-49.0],[168.17,-45.32],[185.89,-43.48],[191.87,-45.55],[194.86,-48.08],[198.77,-48.08],[201.99,-51.07],[204.06,-55.21]],"neusgat":[227.94,-73.92],"mond":[[162.66,-65.31],[162.66,-65.31]],"mondLijn":[[162.66,-65.31],[213.77,-55.19]],"mondNijl":{"gehemelte":[[214.0,-53.93],[199.47,-61.22],[184.91,-66.99],[172.54,-67.43],[163.16,-64.8]],"onderLijn":[[161.8,-77.69],[176.59,-68.69],[202.58,-57.82],[218.29,-60.68],[223.58,-63.75]],"tong":[[170.02,-72.69],[176.87,-74.26],[189.44,-69.4],[203.72,-62.25],[212.01,-63.11],[201.22,-53.68],[185.15,-57.26]],"slag":[[[205.15,-57.97],[184.01,-74.26],7.142044617421542],[[218.87,-61.11],[205.02,-85.54],6.07073792480831]],"snij":[[[222.15,-62.68],[227.29,-70.1],2.8568178469686165],[[221.29,-60.25],[229.15,-65.25],2.8568178469686165]],"boven":[[[207.98,-56.54],[202.55,-48.29],3.571022308710771],[[195.7,-62.54],[190.29,-55.8],3.2139200778396937]]}}};
// HOEFVORM>>

const HoefPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const lin = (a, b, u) => a + (b - a) * u;
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  // sleutelkromme [[u, waarde], ...] met zachte overgangen; per = periodiek (u modulo 1, laatste = eerste)
  const kurve = (K, u) => { u = Math.max(K[0][0], Math.min(K[K.length - 1][0], u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function spline(P) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u; const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); } }
    return out; }
  function openLijn(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
      for (let k = 0; k <= st; k++) { const u = k / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function binnen(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  // vlek: onregelmatige ronde vorm (cm)
  function vlekVorm(c, r, seed, rek = 1, hoek = 0) { const P = []; const n = 7; for (let i = 0; i < n; i++) { const a = i / n * 6.283; const rr = r * (0.78 + 0.4 * hsh(seed * 7.1 + i * 1.7));
      P.push(add(c, rot([Math.cos(a) * rr * rek, Math.sin(a) * rr], hoek))); } return spline(P); }
  // band (streep) langs een middenlijn met breedte die taps afloopt: lijn = [[x,y],...] (cm), w0 -> w1
  function streep(lijn, w0, w1) { const L = openLijn(lijn); const n = L.length; if (n < 2) return null; const l = [], r = [];
    for (let i = 0; i < n; i++) { const a = L[Math.max(0, i - 1)], b = L[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = i / (n - 1), w = lin(w0, w1, u) * Math.sin(Math.PI * Math.min(1, 0.15 + u * 0.85)) ** 0.35;
      l.push(add(L[i], mul(nn, w))); r.push(sub(L[i], mul(nn, w))); } return l.concat(r.reverse()); }

  // ---------- generieke botten ----------
  const POOTB = (z) => [['scap' + z, 'rompV', 'schoft', 'schouder'], ['hum' + z, 'scap' + z, 'schouder', 'elleboog'], ['rad' + z, 'hum' + z, 'elleboog', 'pols'], ['mc' + z, 'rad' + z, 'pols', 'vkogel'], ['vp' + z, 'mc' + z, 'vkogel', 'vteen'],
    ['dij' + z, 'rompA', 'heup', 'knie'], ['schn' + z, 'dij' + z, 'knie', 'hak'], ['mt' + z, 'schn' + z, 'hak', 'akogel'], ['ap' + z, 'mt' + z, 'akogel', 'ateen']];
  const BOTEN = [['rompV', null, 'midrug', 'nekBasis'], ['rompM', null, 'midrug', 'lend'], ['rompA', 'rompM', 'lend', 'kruis'],
    ['nek', 'rompV', 'nekBasis', 'kop'], ['kop', 'nek', 'kop', 'neus'], ['kaak', 'kop', 'kaak', 'kin'], ...POOTB(''), ...POOTB('F'),
    ['st0', 'rompA', 'staart0', 'staart1'], ['st1', 'st0', 'staart1', 'staart2'], ['st2', 'st1', 'staart2', 'staart3'], ['st3', 'st2', 'staart3', 'staart4']];
  const ROMPNAMEN = ['rompV', 'rompM', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2', 'st3'];
  const LEGS = ['A', 'AF', 'V', 'VF'];

  function maak(D) {
    const K = D.K, X0 = D.X0, G0 = D.G0; const cm = (p) => [(p[0] - X0) / K, (p[1] - G0) / K]; D.HOUDING.rust = D.HOUDING.rust || {};
    const J = {}; for (const k in D.J) J[k] = cm(D.J[k]); if (D.anker == null) D.anker = (J.schouder[0] + J.heup[0]) / 2; // anker = midden tussen schouder en heup (midden onder het dier)
    const BOT = {}, ORDE = [];
    for (const [n, par, j0, j1] of BOTEN) { const v = sub(J[j1], J[j0]); BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: J[j0] }; ORDE.push(n); }
    for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
    const ROOT0 = J.midrug;
    const PAL0 = Object.assign({ neus: '#2A2220', klauw: '#2A2420', mond: '#3A2622', tong: '#B86A64', vlek: '#2A221E' }, D.PAL);
    const PAL = new Proxy(PAL0, { get: (o, k) => (o[k] ?? k) }); // onbekende sleutel = zelf een kleur (#rrggbb uit de stijlplaat)
    const PALF = new Proxy({}, { get: (o, k) => (o[k] ??= mixHex(PAL[k], D.verMix ?? 0.3, D.verKleur || '#3E3A36')) });
    const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');

    // ---- delen opbouwen (cm, ruststand) ----
    const PREP = {}; let seed = D.seed || 1;
    // haarpieken langs de omtrek (manen): tand = [hoogte cm, golflengte cm, alleen waar f(p) waar is]
    function tanden(P, [amp, w, f]) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
      let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
        if (f && !f(p)) return p; const ww = w * (0.8 + 0.4 * hsh(Math.floor(sc / w) * 3.3)), ph = fr(sc / ww), h = amp * (0.6 + 0.6 * hsh(Math.floor(sc / ww) * 7.7)) * (ph < 0.75 ? Math.pow(ph / 0.75, 1.4) : (1 - ph) / 0.25); return add(p, mul(nn, h)); }); }
    const laag = (l) => { if (l.veeg) return { c: l.c, pts: streep(l.p.map(cm), l.veeg[0], l.veeg[1]) }; if (l.lijn) return { c: l.c, lijn: l.lijn, pts: openLijn(l.p.map(cm)) }; let P = spline(l.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; })); if (l.tand) P = tanden(P, l.tand); return { c: l.c, pts: P }; };
    if (D.VORM) { D.DELEN = Object.assign({}, D.DELEN || {}); const SK = { romp: 'romp', hum: 'hum', dij: 'dij', nek: 'nek', staart: 'staart', kruis: 'romp' };
      for (const d in D.VORM.delen) { if (D.DELEN[d]) continue; const v = D.VORM.delen[d], extra = (D.EXTRA || {})[d] || [];
        D.DELEN[d] = Object.assign(SK[d] ? { skin: SK[d] } : { bot: (d === 'keelkap' || d === 'oor') ? 'kop' : d }, { lagen: [{ c: v.c, p: v.basis }, ...v.lagen.filter(l => !(D.WEG || []).includes(l.c + ':' + d)).map(l => ({ c: (D.KLEUR || {})[l.c] || l.c, p: l.p })), ...extra] });
        D.DELEN[d].lagen[0].c = (D.KLEUR || {})[v.c] || v.c; }
      if (D.VORM.keelweb && !D.DELEN.keelweb) { const w = D.VORM.keelweb; D.DELEN.keelweb = { skin: 'nek', recht: true, gew: w.kop.map(k => k ? [['kop', 1]] : [['nek', 1]]), lagen: [{ c: D.DELEN.nek.lagen[0].c, p: w.p }] }; } } // keel-web: driehoek tussen keelrand van de hals en kaakrand van de kop; vult de keel als de kop zich strekt (grazen)
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, gew: d.gew, lagen: d.lagen.map(l => d.recht ? { c: l.c, pts: l.p.map(cm) } : laag(l)) }; }
    // poten uit profielen: [[u, voor, achter], ...] in cm langs het bot (voor = kant naar +x bij een bot dat omlaag wijst)
    function profiel(bn, prof) { const b = BOT[bn], d = dir(b.A0), s = [d[1], -d[0]]; const V = [], A = [];
      const dk = (bn.startsWith('rad') || bn.startsWith('mc') || bn.startsWith('vp') ? D.dikV : D.dikA) || D.dik || 1; for (const [u, wv, wa] of prof) { const p = add(b.J0, mul(d, b.L * u)); V.push(add(p, mul(s, wv * dk))); A.push(sub(p, mul(s, wa * dk))); }
      return spline(V.concat(A.reverse())); }
    for (const k in D.POOT) { const P = D.POOT[k]; const lagen = [{ c: P.c || 'basis', pts: profiel(P.bot || k, P.prof) }];
      for (const ex of (P.lagen || [])) lagen.push(ex.prof ? { c: ex.c, pts: profiel(P.bot || k, ex.prof) } : laag(ex));
      PREP[k] = { bot: P.bot || k, voet: P.voet, lagen }; }
    // staart als buis langs de keten met breedtes per knoop
    if (D.STAART) { const keten = ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j]); const W = D.STAART.w; const L = [], R = [];
      const lijn = openLijn(keten); const cum = [0]; for (let i = 1; i < lijn.length; i++) cum.push(cum[i - 1] + len(sub(lijn[i], lijn[i - 1]))); const tot = cum[cum.length - 1];
      const wAt = (u) => { const x = u * (W.length - 1), i = Math.min(W.length - 2, Math.floor(x)); return lin(W[i], W[i + 1], x - i); };
      for (let i = 0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const w = wAt(cum[i] / tot);
        L.push(add(lijn[i], mul(nn, w))); R.push(sub(lijn[i], mul(nn, w))); }
      const e = lijn[lijn.length - 1], e2 = lijn[lijn.length - 4], te = sub(e, e2), tel = len(te); const tip = add(e, mul(te, W[W.length - 1] * 0.9 / tel));
      const basis = L.concat([tip], R.reverse());
      const lagen = [{ c: D.STAART.c || 'basis', pts: basis }];
      const bandOp = (u, bw, c) => { const s0 = Math.max(0, u - bw / tot / 2) * tot, s1 = Math.min(1, u + bw / tot / 2) * tot; const idx = (s) => { let i = 0; while (i < cum.length - 1 && cum[i] < s) i++; return i; };
        const i0 = idx(s0), i1 = idx(s1); const P = []; for (let i = i0; i <= i1; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(add(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        for (let i = i1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        if (u + bw / tot / 2 >= 1) P.splice(i1 - i0 + 1, 0, add(tip, mul(te, 3 / tel))); return { c, pts: P }; };
      for (const [u, bw, c] of (D.STAART.banden || [])) lagen.push(bandOp(u, bw, c));
      if (D.STAART.onder) { const P = []; for (let i = 0; i < lijn.length; i++) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 0.25))); }
        for (let i = lijn.length - 1; i >= 0; i--) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 1.5))); }
        lagen.splice(1, 0, { c: D.STAART.onderC || 'licht', pts: P }); }
      if (D.STAART.kwast) { const [u0, c] = D.STAART.kwast; const s0 = u0 * tot; let i0 = 0; while (i0 < cum.length - 1 && cum[i0] < s0) i0++; const P = []; const kw = D.STAART.kwastW || 3.2;
        for (let i = i0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(add(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        P.push(add(tip, mul(te, kw * 0.7 / tel)));
        for (let i = lijn.length - 1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(sub(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        PREP.kwast = { skin: 'staart', lagen: [{ c, pts: spline(P.filter((_, i) => i % 3 === 0)) }] }; }
      PREP.staart = { skin: 'staart', lagen }; }
    // tekening: vlekken / strepen per deel (in ruststand, daarna meegebogen door dezelfde huid)
    if (D.TEKENING) D.TEKENING({ PREP, J, cm, vlekVorm, streep, binnen, hsh, BOT });

    // ---- gewichten (zachte huid) ----
    function projectie(v, keten) { let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
    const xr = ROOT0[0], xl = J.lend[0], xk = J.kruis[0], xn = J.nekBasis[0];
    const GEW = {
      romp: (v) => { const x = v[0]; const wV = sstep((x - (xr - 0.35 * (xr - xl))) / (0.35 * (xr - xl) + 0.45 * (xn - xr)));
        const wA = sstep(((xl + 0.25 * (xr - xl)) - x) / (0.25 * (xr - xl) + 0.6 * (xl - xk))); const wM = Math.max(0, 1 - wV - wA); const s = wV + wA + wM; return [['rompV', wV / s], ['rompM', wM / s], ['rompA', wA / s]]; },
      nek: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - (D.halsRecht ? sstep((u + 0.3) / 0.5) : 0.68 * sstep((u + 0.3) / 0.55) + 0.32 * Math.max(0, Math.min(1, (u - 0.15) / 0.85))), wk = (D.kopVolg ?? 0.55) * sstep((u - 0.8) / 0.5); /* keel onder de kaak volgt de kop maar half (geen gat bij kop omhoog) */ return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      manen: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.5) / 1.1), wk = sstep((u - 0.55) / 0.6); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      dij: (v) => { const u = projectie(v, [J.heup, J.knie]); const w = sstep((u - 0.15) / 0.8); return [['rompA', 1 - w], ['dij', w]]; },
      hum: (v) => { const u = projectie(v, [J.schoft, J.schouder, J.elleboog]); const w = sstep((u - 0.75) / 0.7); const wr = 1 - sstep((u + 0.1) / 0.6); return [['rompV', wr * 0.6], ['scap', Math.max(0, 1 - w - wr * 0.6)], ['hum', w]]; },
      staart: (v) => { const u = projectie(v, ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j])); const c = [['rompA', -0.4], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5], ['st3', 3.5]];
        let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 3.5) w = [['st3', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
    };
    // klem (uit pop_katten, tijger ronde 3b): punten van schouder/dij die binnen het rompsilhouet liggen volgen de romp, anders bolt de buik/borst bij lopen uit
    const ROMPB = PREP.romp && PREP.romp.lagen[0].pts; const randAfst = (v) => { let m = 1e9; for (let i = 0; i < ROMPB.length; i += 2) { const q = ROMPB[i]; m = Math.min(m, Math.hypot(q[0] - v[0], q[1] - v[1])); } return m; };
    if (D.klem && ROMPB) for (const sk of ['hum', 'dij']) { const g0 = GEW[sk], rb = sk === 'hum' ? 'rompV' : 'rompA'; GEW[sk] = (v) => { const w = g0(v); if (!binnen(v, ROMPB)) return w;
        const f = sstep(randAfst(v) / D.klem); return w.map(([b, x]) => [b, x * (1 - f)]).concat([[rb, f]]); }; }
    for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { if (p.gew) { l.w = p.gew; return; } if (l.mid) l.wm = GEW[p.skin](l.mid).filter(([, x]) => x > 1e-4); else l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

    // ---- kinematica ----
    function fk(R, A) { const piv = {}; for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; } return piv; }
    const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
    // ---- hals als buigzame kromme (spine curve): hoek loopt langs de hals op van romp- naar nekhoek (gewicht = nek-gewicht van de huid) ----
    const NU0 = -0.3, NW = (u) => D.halsRecht ? sstep((u + 0.3) / 0.5) : 0.68 * sstep((u + 0.3) / 0.55) + 0.32 * Math.max(0, Math.min(1, (u - 0.15) / 0.85)); /* grootste deel van de draai bij de halsbasis, rest als vloeiende boog tot het achterhoofd (geen haak) */ // nek-gewicht (1 - rompV-gewicht)
    function halsKromme(piv, A) { const b = BOT.nek, dir0 = b.A0, L = b.L, th0 = dir0 + (A.rompV - BOT.rompV.A0), dN = (A.nek - b.A0) - (A.rompV - BOT.rompV.A0);
      const M0 = (v) => { const da = A.rompV - BOT.rompV.A0, c = Math.cos(da), si = Math.sin(da), j = BOT.rompV.J0, p = piv.rompV; const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; };
      const OFF = (D.nekAs || 0) * D.H / 160, n00 = [-Math.sin(dir0), Math.cos(dir0)]; // buig-as verschoven naar de kam: de kam blijft een doorlopende lijn vanaf de schoft
      const N = 48, du = (1 - NU0) / N; const C = [M0(add(add(b.J0, mul(n00, OFF)), mul(dir(dir0), NU0 * L)))], TH = [th0 + dN * NW(NU0)];
      for (let i = 1; i <= N; i++) { const u = NU0 + (i - 0.5) * du, th = th0 + dN * NW(u); C.push(add(C[i - 1], mul(dir(th), L * du))); TH.push(th0 + dN * NW(NU0 + i * du)); }
      return { C, TH, du, L, dir0, M0, OFF, at: (u) => { const x = (u - NU0) / du, i = Math.max(0, Math.min(N - 1, Math.floor(x))), f = Math.max(0, Math.min(1, x - i)); return [lin(C[i][0], C[i + 1][0], f), lin(C[i][1], C[i + 1][1], f), lin(TH[i], TH[i + 1], f)]; } }; }
    const KOPBOT = ['kop', 'kaak'];
    function fkH(R, A) { const piv = fk(R, A); const H = halsKromme(piv, A); const th = H.TH[H.TH.length - 1], E = sub(H.C[H.C.length - 1], mul([-Math.sin(th), Math.cos(th)], H.OFF)), d = sub(E, piv.kop); for (const n of KOPBOT) piv[n] = add(piv[n], d); piv.__hals = H; return piv; }
    function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
      dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
      const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek]; }
    const RESTA = {}; for (const n of ORDE) RESTA[n] = BOT[n].A0;
    // voeten = { L: {teen, meta, poot} } (graden) -> hoeken via IK; scapZwaai graden
    function zetBenen(R, A, voeten, scapZwaai = {}) { let piv = fk(R, A); const rek = {};
      for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', z = L.length > 1 ? 'F' : ''; const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
        const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
        if (voor) { A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
          const [a1, a2, r] = ik(eind(piv, A, 'scap' + z), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + z] = a1; A['rad' + z] = a2; rek[L] = r; }
        else { A['dij' + z] = A.rompA; piv = fk(R, A); const [a1, a2, r] = ik(piv['dij' + z], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + z] = a1; A['schn' + z] = a2; rek[L] = r; }
        A[nM + z] = v.meta * RAD; A[nP + z] = v.poot * RAD; v.kogel = kogel; }
      return rek; }
    const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } };
    // rompA wordt (zoals de andere romphoeken) in wereldgraden opgegeven
    function lichaam(spec) { const A = Object.assign({}, RESTA); for (const n in (spec.A || {})) A[n] = spec.A[n] * RAD; if (spec.A && spec.A.kop != null && spec.A.kaak == null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return A; }
    // rust-teenposities (ruststand = gemeten plaat)
    const RP = fk(ROOT0, RESTA); const TEEN0 = { V: eind(RP, RESTA, 'vp'), VF: eind(RP, RESTA, 'vpF'), A: eind(RP, RESTA, 'ap'), AF: eind(RP, RESTA, 'apF') };

    // ---- houdingen (specs per dier) ----
    const RUSTVOET = (L) => { const z = L.length > 1 ? 'F' : '', voor = L[0] === 'V'; return [TEEN0[L][0], TEEN0[L][1], BOT[(voor ? 'mc' : 'mt') + z].A0 / RAD, BOT[(voor ? 'vp' : 'ap') + z].A0 / RAD]; };
    // auto-houding: voeten recht onder schouder/heup (+dx), romphoogte zo dat de poten 'rek' gestrekt zijn (bisectie)
    const AUTO = {};
    function autoStaan(h, S) { if (AUTO[h]) return AUTO[h]; const A0 = lichaam(S), au = S.auto, ty = au.ty ?? -1;
      const probeer = (y) => { const A = Object.assign({}, A0), R = [ROOT0[0], y]; const piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const vt = { V: [sch[0] + au.V, ty, au.meta ? au.meta[0] : 80, au.poot ? au.poot[0] : 20], A: [hp[0] + au.A, ty, au.meta ? au.meta[1] : 86, au.poot ? au.poot[1] : 22] };
        const voeten = {}; for (const L of LEGS) { const v = vt[L[0]]; voeten[L] = { teen: [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1]], meta: v[2], poot: v[3] }; }
        const rek = zetBenen(R, A, voeten); return { rek: Math.max(rek.V, rek.A), vt }; };
      let lo = -400, hi = 0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (probeer(m).rek > au.rek) lo = m; else hi = m; }
      const { vt } = probeer(hi); const voet = {}; for (const L of LEGS) { const v = vt[L[0]]; voet[L] = [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1], v[2], v[3]]; }
      return (AUTO[h] = { R: [0, hi], voet }); }
    function geschaald(S) { if (!S.schaal) return S; const [B, f] = S.schaal; const R = B.R ? [B.R[0] * f, B.R[1] * f] : null; const voet = {}; for (const L in B.voet) { const v = B.voet[L]; voet[L] = [v[0] * f, v[1] * f, v[2], v[3]]; }
      return Object.assign({}, B, { R, voet, A: Object.assign({}, B.A, S.A || {}) }); }
    // auto-zit: heup op hoogte 'heup' boven de grond, romp zo rechtop als de voorpoten toelaten (rompV van rv[0] naar rv[1])
    function autoZit(h, S) { if (AUTO[h]) return AUTO[h]; const au = S.autoZit, ty = au.ty ?? -1; let best = null;
      for (let rv = au.rv[0]; rv <= au.rv[1]; rv += 2) { const d = rv - au.rv[0]; const A = lichaam({ A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) });
        let piv = fk([ROOT0[0], 0], A); const y = -au.heup - piv.dij[1]; const R = [ROOT0[0], y]; piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const voeten = {}; for (const L of LEGS) { const voor = L[0] === 'V', ver = L.length > 1 ? au.ver[L[0]] : 0; voeten[L] = { teen: [(voor ? sch[0] + au.V : hp[0] + au.A) + ver, ty], meta: au.meta[voor ? 0 : 1], poot: au.poot[voor ? 0 : 1] }; }
        const A2 = Object.assign({}, A); const rek = zetBenen(R, A2, voeten); best = { R: [0, y], voet: Object.fromEntries(LEGS.map(L => [L, [voeten[L].teen[0], ty, voeten[L].meta, voeten[L].poot]])), A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) };
        if (rek.V <= 0.985) break; }
      return (AUTO[h] = best); }
    function houding(h, o = {}) { let S = geschaald(D.HOUDING[h] || D.HOUDING.staan); if (S.autoZit) S = Object.assign({}, S, autoZit(h, S)); if (S.auto) S = Object.assign({}, S, autoStaan(h, S)); const A = lichaam(S); const R = S.R ? [ROOT0[0] + (S.R[0] || 0), S.R[1]] : [ROOT0[0], ROOT0[1] + (S.dy || 0)];
      if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
      if (S.adem && o.t != null) { const w = Math.sin(2 * Math.PI * o.t); A.st2 += 4 * RAD * w; A.st3 += 7 * RAD * Math.sin(2 * Math.PI * o.t - 0.7); }
      if (S.reikNek != null) { let best = null; A.kop = S.reikNek * RAD; for (let a = 20; a <= 89; a += 0.5) { A.nek = a * RAD; const n = eind(fkH(R, A), A, 'kop'); const e = Math.abs(n[1] + (S.reik ?? 1)); if (!best || e < best[0]) best = [e, a]; } A.nek = best[1] * RAD; } // hals zo ver omlaag dat de neus de grond raakt bij een vaste kophoek
      else if (S.reik != null) { const RR = R; let best = null; for (let a = S.kopMin ?? 70; a <= (S.kopMax ?? 135); a += 1) { A.kop = a * RAD; const n = eind(fkH(RR, A), A, 'kop'); const e = Math.abs(n[1] + S.reik); if (!best || e < best[0]) best = [e, a]; } A.kop = best[1] * RAD; }
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + (o.bek ?? S.bek ?? 0) * (S.bek && o.bek == null ? RAD : 1);
      const voeten = {}; for (const L of LEGS) { let v = S.voet ? (S.voet[L] || S.voet[L[0]]) : RUSTVOET(L); if (!S.voet && S.ver && L.length > 1) v = [v[0] + S.ver[L[0]], v[1], v[2], v[3]]; if (S.dvoet && S.dvoet[L]) v = [v[0] + S.dvoet[L], v[1], v[2], v[3]]; voeten[L] = { teen: [v[0], v[1]], meta: v[2], poot: v[3], steun: true }; }
      const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, zit: !!S.zit, volgorde: S.volgorde }; }

    // ---- gangen ----
    // stap: laterale volgorde, teen staat stil in de steunfase, zwaai met Hermite, IK
    function stap(G, t) {
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.A || {}) }));
      const w2 = Math.sin(4 * Math.PI * (t - (G.bobFase || 0.06)));
      const R = [ROOT0[0], (G.Ry ?? ((H.R ? H.R[1] : ROOT0[1]) + (G.dy || 0))) + (G.bob || 0.6) * Math.cos(4 * Math.PI * (t - (G.bobFase ?? 0.06)))];
      A.rompV += (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompA -= (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompM -= 0.4 * (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t);
      A.nek += (G.knik || 2) * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= (G.knik || 2) * 0.7 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
      const sz = G.staartZwaai || [3, 5, 7, 9]; for (let i = 0; i < 4; i++) A['st' + i] += sz[i] * RAD * Math.sin(2 * Math.PI * (t - 0.2 - i * 0.12));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
      const half = G.S * G.beta / 2, voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', p = fr(t - G.fase[L]), steun = p < G.beta; const v0 = H.voet ? (H.voet[k] || H.voet[L]) : RUSTVOET(k); // verre poot loopt in hetzelfde spoor (geen standverschil)
        const nx = v0[0] + G.nx[k], ty0 = v0[1]; let tx, ty, u;
        if (steun) { u = p / G.beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; tx = hermite(nx - half, nx + half, m, m, u); ty = ty0 - G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        if (voor) scap[L] = (G.scap || 8) * (tx - nx) / half; }
      let rek = zetBenen(R, A, voeten, scap); // romp zakt iets als een poot te kort is (zoals in de dubbele steunfase), anders glijdt de voet
      for (let it = 0; it < 4; it++) { const m = Math.max(...Object.values(rek)); if (m <= 1.0) break; R[1] += (m - 1) * (BOT.hum.L + BOT.rad.L) * 1.05; rek = zetBenen(R, A, voeten, scap); }
      for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten }; }
    // galop (jachtluipaard): roterende galop met gebogen (gathered) en gestrekte (extended) zweeffase; romp buigt via rompM/rompA
    function galopRomp(G, t) { const flex = kurve(G.flex, fr(t)); // 0 = gestrekt, 1 = gebogen
      const A = lichaam({ A: G.gestrekt }), A1 = lichaam({ A: G.gebogen }); mixA(A, A1, flex, ROMPNAMEN);
      for (let i = 0; i < 4; i++) A['st' + i] += (G.staartZwaai[i] || 0) * RAD * Math.sin(2 * Math.PI * (t - 0.15 - i * 0.1));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return { A, R: [ROOT0[0], kurve(G.Ry, fr(t))], flex }; }
    const galopZwaai = (G, L, t) => { const beta = G.beta[L[0] === 'V' ? 'V' : 'A'], p = fr(t - G.fase[L]); return G.scap * (p < beta ? (1 - 2 * p / beta) : kurve([[0, -1], [0.5, 0.2], [1, 1]], (p - beta) / (1 - beta))); };
    function galopGewricht(G, t, L) { const { A, R } = galopRomp(G, t), voor = L[0] === 'V', z = L.length > 1 ? 'F' : '';
      if (voor) A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - galopZwaai(G, L, t) * RAD; else A['dij' + z] = A.rompA; const piv = fk(R, A); return voor ? eind(piv, A, 'scap' + z) : piv['dij' + z]; }
    function galop(G, t) {
      const { A, R, flex } = galopRomp(G, t);
      const voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', beta = G.beta[k], p = fr(t - G.fase[L]), steun = p < beta; const half = G.S * beta / 2;
        const nx = G.nx[k], ty0 = G.ty[k]; let tx, ty, u;
        if (steun) { u = p / beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { // zwaai in het assenstelsel van heup/schouder (poolcoördinaten), aansluitend op de steunpunten bij loslaten en neerzetten
          u = (p - beta) / (1 - beta); const t0 = t - p, tLO = t0 + beta, tTD = t0 + 1;
          const hLO = galopGewricht(G, tLO, L), hTD = galopGewricht(G, tTD, L), h = galopGewricht(G, t, L);
          const rLO = sub([nx - half, ty0], hLO), rTD = sub([nx + half, ty0], hTD); const aLO = ang(rLO), aTD = ang(rTD);
          const a = hermite(aLO, aTD, G.am0[k] * (aTD - aLO), G.am1[k] * (aTD - aLO), u), l = lin(len(rLO), len(rTD), u) - kurve(G.fold[k], u);
          const q = add(h, mul(dir(a), l)); tx = q[0]; ty = Math.min(ty0, q[1]); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        scap[L] = galopZwaai(G, L, t); }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, flex }; }
    const GANGEN = {}, SNELHEID = {}; for (const g in (D.GANGEN || {})) { const G = D.GANGEN[g]; GANGEN[g] = (t) => stap(G, t); SNELHEID[g] = G.S; }
    function stand(o) { if (o.stand) return o.stand; const h = o.houding || 'staan';
      if (GANGEN[h]) { const st = GANGEN[h](fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
      return houding(h, o); }

    // ---- tekenen ----
    function tekenDeel(ctx, k, M, ver, piv, A, modus) {
      if (k === 'mond') { if (modus !== 'rand' && D.MOND && (A.kaak - A.kop - (BOT.kaak.A0 - BOT.kop.A0)) > 0.03) D.MOND(ctx, M, A, BOT, ver ? PALF : PAL); return; }
      if (k === 'hoefF' || k === 'hoef') return;
      const Dl = PREP[k]; if (!Dl) return; const pal = ver ? PALF : PAL; if (k === 'kruis' && modus === 'rand') return; // vlak op de huid: geen eigen omtreklijn
      const tr = Dl.skin ? (l) => { if (l.wm) { let x = 0, y = 0; for (const [b, w] of l.wm) { const q = M[b](l.mid); x += q[0] * w; y += q[1] * w; } const dx = x - l.mid[0], dy = y - l.mid[1]; return l.pts.map(v => [v[0] + dx, v[1] + dy]); } // vlek: alleen verschuiven, niet uitrekken
        if (Dl.skin === 'nek') { // hoek-menging (geen positie-menging): de hals buigt als een slang en klapt niet in bij grote hoeken (grazen)
          const dN = (A.nek - BOT.nek.A0) - (A.rompV - BOT.rompV.A0), dK = (A.kop - BOT.kop.A0) - (A.nek - BOT.nek.A0), pn = piv.nek, pk = piv.kop;
          const rotOm = (p, c, a) => { const co = Math.cos(a), si = Math.sin(a), dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * co - dy * si, c[1] + dx * si + dy * co]; };
          const H = piv.__hals, d0 = dir(H.dir0), n0 = [-d0[1], d0[0]], B = BOT.nek.J0;
          return l.pts.map((v, i) => { let wk = 0; for (const [b, w] of l.w[i]) if (b === 'kop') wk = w; if (wk >= 0.999) return M.kop(v);
            const r = sub(v, B), u = (r[0] * d0[0] + r[1] * d0[1]) / H.L; let dd = r[0] * n0[0] + r[1] * n0[1] - H.OFF; let p;
            if (dd * Math.sign(dN) < 0) dd *= 1 - Math.min(0.5, 0.3 * Math.abs(dN)) * Math.sin(Math.PI * Math.max(0, Math.min(1, (u + 0.3) / 1.0))); // kam aan de buitenkant van de bocht drukt in
            if (u <= NU0) p = H.M0(v); else { const uc = Math.min(1, u), [cx, cy, th] = H.at(uc); const t = dir(th), nn = [-t[1], t[0]]; p = [cx + t[0] * (u - uc) * H.L + nn[0] * dd, cy + t[1] * (u - uc) * H.L + nn[1] * dd]; }
            const z_ = D.H / 160, wr = Math.max(sstep((J.schoft[0] + (D.schoftVast ?? 10) * z_ - v[0]) / (10 * z_)) * sstep((J.schouder[1] - v[1]) / (20 * z_)), // schoft blijft bij de romp
              sstep((v[1] - (J.schouder[1] - 12 * z_)) / (16 * z_)) * sstep((u - 0.1) / -0.4)); // borst (onder het schoudergewricht, hals-basis) blijft rustig
            if (wr > 0) { const q = H.M0(v); p = [lin(p[0], q[0], wr), lin(p[1], q[1], wr)]; }
            if (wk > 0) p = rotOm(p, pk, wk * dK); return p; }); }
        return l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }); } : null;
      ctx.save();
      if (!Dl.skin) { const b = BOT[Dl.bot]; let ar = A[Dl.bot] - b.A0;
        if (k === 'keelkap') ar -= 0.6 * ((A.kop - BOT.kop.A0) - (A.nek - BOT.nek.A0)); // keel volgt de kop maar voor 40% (vouwt mee, zwaait niet naar achter)
        ctx.translate(piv[Dl.bot][0], piv[Dl.bot][1]); ctx.rotate(ar); ctx.translate(-b.J0[0], -b.J0[1]); }
      const basis = tr ? tr(Dl.lagen[0]) : Dl.lagen[0].pts;
      if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[Dl.lagen[0].c]); ctx.lineWidth = D.rand || 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
      if (modus !== 'lagen') { pad(ctx, basis); ctx.fillStyle = pal[Dl.lagen[0].c]; ctx.fill(); }
      if (Dl.lagen.length > 1 && modus !== 'basis') { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < Dl.lagen.length; i++) { const L = Dl.lagen[i], P = tr ? tr(L) : L.pts;
        if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
      if (Dl.voet && D.TENEN) D.TENEN(ctx, k, pal, BOT, cm);
      if (k === 'kop' && D.GEZICHT) D.GEZICHT(ctx, pal, cm, A, BOT);
      ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fkH(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    function teken(ctx, x, y, s, o = {}) {
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400.6); ctx.clip(); }
      let VO = st.volgorde ? st.volgorde : VOLGORDE;
      const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A);
      for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
      if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand'); else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
      // vulling; delen met groep 'lijf' (romp, dij, hum, nek): eerst alle basisvlakken, daarna alle toonlagen (anders snijdt een deelgrens een toonvlak recht af)
      let pend = []; const flush = () => { for (const [k, ver] of pend) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'lagen'); else tekenDeel(ctx, k, M, false, piv, A, 'lagen'); } pend = []; };
      for (const [k, ver, g] of VO) { if (g === 'lijf') { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'basis'); else tekenDeel(ctx, k, M, false, piv, A, 'basis'); pend.push([k, ver]); continue; }
        flush(); if (ver) tekenDeel(ctx, k, MF, true, pivF, AF); else tekenDeel(ctx, k, M, false, piv, A); }
      flush();
      if (o.skelet) { ctx.lineWidth = 0.5; for (const n of ORDE) { const e = eind(piv, A, n); ctx.strokeStyle = n.endsWith('F') ? '#4FC3F7' : (n.startsWith('romp') ? '#FFEB3B' : '#FF5252'); ctx.beginPath(); ctx.moveTo(piv[n][0], piv[n][1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(piv[n][0], piv[n][1], 0.7, 0, 6.283); ctx.fill(); } }
      ctx.restore(); return st; }
    function info(o = {}) { const st = stand(o); const piv = fkH(st.R, st.A); return { piv, A: st.A, voeten: st.voeten, R: st.R, flex: st.flex, eind: (n) => eind(piv, st.A, n) }; }
    function deel(ctx, k, dx = 0, dy = 0) { const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
      if (k.endsWith('F') && PREP[k.slice(0, -1)]) tekenDeel(ctx, k.slice(0, -1), M, true, RP, RESTA); else tekenDeel(ctx, k, M, false, RP, RESTA); ctx.restore();
      const Dl = PREP[k.replace(/F$/, '')]; if (!Dl) return []; const bones = Dl.skin ? { romp: ['rompV', 'rompM', 'rompA'], nek: ['nek', 'kop'], manen: ['nek'], staart: ['st0', 'st1', 'st2', 'st3'], dij: ['dij'], hum: ['scap', 'hum'] }[Dl.skin] : [Dl.bot];
      return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]); }
    function meng(stA, stB, w) { const A = Object.assign({}, stA.A); mixA(A, stB.A, w, ORDE); return { R: [lin(stA.R[0], stB.R[0], w), lin(stA.R[1], stB.R[1], w)], A, voeten: {}, zit: w < 0.5 ? stA.zit : stB.zit }; }
    return { teken, info, stand, deel, houding, fk, meng, BOT, ORDE, PREP, J, PAL, D, TEEN0, SNELHEID, GANGEN, RP, RESTA, cm };
  }
  return { maak, kurve, vlekVorm, streep, binnen, hsh, mixHex, spline, openLijn };
})();

// =====================================================================================================
// DIEREN. Gewrichtspunten: gemeten op de stijlplaat (bouw.py, px -> cm) en gecontroleerd met tekstbronnen (zie lessen_pop_hoef.md).
// Poten: profielen [u, voor, achter] (cm, paard 160 cm), per dier geschaald met H/160 en 'dik'.
// =====================================================================================================
const HOEF_PROF = { // paard, schofthoogte 160 cm
  rad: [[-0.16, 6.5, 2.0], [0.0, 8.0, 7.0], [0.16, 7.4, 6.6], [0.5, 5.4, 4.2], [0.85, 4.0, 3.4], [1.0, 4.6, 4.0], [1.1, 4.0, 3.4]],
  mc: [[-0.06, 4.2, 3.6], [0.06, 3.4, 3.2], [0.5, 3.0, 3.0], [0.86, 3.2, 3.5], [1.0, 4.0, 4.4], [1.12, 3.4, 3.6]],
  vp: [[-0.2, 3.8, 4.2], [0.05, 3.1, 3.6], [0.45, 2.9, 3.1], [0.7, 3.2, 3.2]],
  schn: [[-0.18, 7.0, 5.0], [0.0, 8.6, 8.4], [0.25, 6.8, 8.8], [0.6, 4.0, 6.0], [0.9, 3.8, 5.0], [1.0, 4.4, 5.8], [1.1, 3.8, 4.2]],
  mt: [[-0.06, 3.8, 5.6], [0.08, 3.4, 4.2], [0.5, 3.0, 3.1], [0.88, 3.2, 3.5], [1.0, 4.0, 4.4], [1.1, 3.4, 3.6]],
  ap: [[-0.2, 3.8, 4.2], [0.05, 3.1, 3.6], [0.45, 2.9, 3.1], [0.7, 3.2, 3.2]],
};
function _hoefPoot(f, dikV, dikA, over = {}) { const P = {}; for (const k in HOEF_PROF) { const v = ['rad', 'mc', 'vp'].includes(k), d = (v ? dikV : dikA) * f;
    P[k] = Object.assign({ prof: (over[k] && over[k].prof || HOEF_PROF[k]).map(([u, a, b]) => [u, a * d, b * d]), voet: k === 'vp' || k === 'ap' }, over[k] ? { c: over[k].c, lagen: over[k].lagen } : {}); } return P; }
// band op een poot over u0..u1 (kleur c), breed genoeg om het hele profiel te bedekken (wordt op het profiel geknipt)
const _hoefBand = (c, u0, u1, w = 30) => ({ c, prof: [[u0, w, w], [u1, w, w]] });
// hoef/klauw/teen in de ruststand van het kootbeen (tekent in cm, rust-coördinaten)
function _hoefTeken(ctx, k, pal, BOT, D) { const voor = k === 'vp', b = BOT[k], T = [b.J0[0] + Math.cos(b.A0) * b.L, b.J0[1] + Math.sin(b.A0) * b.L]; const h = D.HOEF, f = D.H / 160;
  const u = [-Math.cos(b.A0), -Math.sin(b.A0)]; const up = (hh) => [T[0] + u[0] * hh / Math.abs(u[1]), T[1] - hh]; const kl = pal[h.kleur];
  if (h.type === 'teen') { // nijlpaard: brede ronde voet (kleur van de poot) met korte tenen en nagels voorop
    const L = h.L * f, hv = h.hv * f; ctx.fillStyle = pal[h.voet || 'basis']; ctx.beginPath(); ctx.moveTo(T[0] - L, T[1]); ctx.lineTo(T[0] - 2, T[1]); ctx.quadraticCurveTo(T[0] + 3 * f, T[1], T[0] + 2 * f, T[1] - hv * 0.5); ctx.quadraticCurveTo(T[0], T[1] - hv, T[0] - L * 0.4, T[1] - hv * 1.1);
    ctx.lineTo(T[0] - L, T[1] - hv); ctx.closePath(); ctx.fill();
    ctx.fillStyle = kl; for (let i = 0; i < 3; i++) { const x = T[0] - 0.5 * f - i * 4.2 * f; ctx.beginPath(); ctx.ellipse(x, T[1] - 1.3 * f, 2.0 * f, 1.3 * f, 0, 0, 6.283); ctx.fill(); } return; }
  const L = h.L * f, hv = h.hv * f, hh = h.hh * f, C = up(hv), H2 = [T[0] - L - 0.6 * f, T[1] - hh];
  ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(T[0], T[1]); ctx.lineTo(T[0] - L, T[1]); ctx.lineTo(H2[0], H2[1]); ctx.quadraticCurveTo(C[0] - L * 0.55, C[1] - 0.5 * f, C[0], C[1]); ctx.closePath(); ctx.fill();
  if (h.kroon) { ctx.strokeStyle = pal[h.kroon]; ctx.lineWidth = 1.1 * f; ctx.beginPath(); ctx.moveTo(H2[0] + 0.3, H2[1] - 0.2); ctx.quadraticCurveTo(C[0] - L * 0.55, C[1] - 0.8 * f, C[0] + 0.3, C[1] - 0.2); ctx.stroke(); }
  if (h.type === 'klauw') { ctx.strokeStyle = pal[h.spleet || 'neus']; ctx.lineWidth = 0.5 * f; ctx.beginPath(); ctx.moveTo(T[0] - L * 0.42, T[1]); ctx.lineTo(T[0] - L * 0.36, T[1] - hv * 0.7); ctx.stroke();
    const K = [b.J0[0] - 2.2 * f, b.J0[1] + 1.2 * f]; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(K[0], K[1], 1.3 * f, 2.0 * f, 0.5, 0, 6.283); ctx.fill(); } } // bijklauw achter de kogel
// oog (in de kop, ruststand)
function _hoefNeus(ctx, D, pal) { const V = D.VORM, f = D.H / 160, N = V.neusgat, M = V.mond; if (D.geenNeus) return;
  ctx.fillStyle = D.neusK || '#2A2020'; ctx.beginPath(); ctx.ellipse(N[0], N[1], (D.neusR || 2.4) * f, (D.neusR || 2.4) * f * 0.55, D.neusHoek ?? -0.6, 0, 6.283); ctx.fill();
  ctx.strokeStyle = D.mondK || '#2A2020'; ctx.lineWidth = 0.7 * f; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo((M[0][0] + M[1][0]) / 2, M[0][1] + 1.2 * f, M[1][0], M[1][1]); ctx.stroke(); }
function _koeOog(ctx, D) { // koeienoog (koppen.png): groot, donker, amandelvormig, licht uitpuilend; zware bovenooglidplooi met donkere wimperrand, lichtpuntje
  const O = D.VORM.oog; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(-0.18);
  const amandel = (rx, ry, dy = 0) => { ctx.beginPath(); ctx.moveTo(-rx, dy); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.25 + dy, rx * 0.55, -ry * 1.2 + dy, rx, dy - ry * 0.1); ctx.bezierCurveTo(rx * 0.55, ry * 1.05 + dy, -rx * 0.5, ry * 1.1 + dy, -rx, dy); ctx.closePath(); };
  ctx.fillStyle = 'rgba(60,24,14,0.35)'; ctx.beginPath(); ctx.ellipse(0.2, 0.4, 5.0, 3.6, 0, 0, 6.283); ctx.fill(); // oogkas, zachte bolling
  ctx.fillStyle = '#A06248'; ctx.beginPath(); ctx.moveTo(-4.4, -0.2); ctx.bezierCurveTo(-2.4, -3.9, 2.6, -3.9, 4.6, -0.6); ctx.bezierCurveTo(2.6, -2.5, -2.2, -2.6, -4.4, -0.2); ctx.fill(); // bovenooglidplooi (lichter)
  amandel(3.5, 2.2); ctx.fillStyle = '#1A110E'; ctx.fill(); // oog
  ctx.fillStyle = '#3A2116'; ctx.beginPath(); ctx.ellipse(0.4, 0.3, 2.0, 1.75, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#0E0807'; ctx.beginPath(); ctx.ellipse(0.4, 0.3, 1.45, 1.1, 0, 0, 6.283); ctx.fill(); // iris (donkerbruin) en pupil (liggend)
  ctx.strokeStyle = '#0C0605'; ctx.lineWidth = 0.55; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-3.5, 0); ctx.bezierCurveTo(-1.75, -2.75, 1.9, -2.65, 3.5, -0.22); ctx.stroke(); // wimperrand
  for (let i = 0; i < 6; i++) { const u = 0.2 + i * 0.12, x = -3.5 + u * 7, y = -2.1 * Math.sin(Math.PI * u) - 0.1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 0.9, y - 0.35); ctx.stroke(); } // korte wimpers, naar voren-opzij
  ctx.strokeStyle = 'rgba(215,190,170,0.7)'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(-2.8, 0.9); ctx.quadraticCurveTo(0.3, 2.6, 3.0, 0.5); ctx.stroke(); // onderooglid
  ctx.fillStyle = '#F4EEE6'; ctx.beginPath(); ctx.ellipse(1.2, -0.65, 0.55, 0.42, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = 'rgba(244,238,230,0.45)'; ctx.beginPath(); ctx.ellipse(-1.3, 0.75, 0.3, 0.2, 0, 0, 6.283); ctx.fill(); // lichtpuntjes
  ctx.restore(); }
function _hoefOog(ctx, D, A, BOT) { if (D.oogStijl === 'geen') return; if (D.oogStijl === 'ring') { // ezel/muilezel zoals de plaat: lichte oogring, donker amandeloog, lichtpuntje
    const O = D.VORM.oog, f = D.H / 160, R = D.oogRing || [8, 5, 4.4, 2.6]; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(D.oogDraai ?? -0.18); ctx.scale(f, f);
    const am = (rx, ry) => { ctx.beginPath(); ctx.moveTo(-rx, 0); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.3, rx * 0.5, -ry * 1.25, rx, -ry * 0.1); ctx.bezierCurveTo(rx * 0.5, ry * 1.1, -rx * 0.5, ry * 1.1, -rx, 0); ctx.closePath(); };
    am(R[0], R[1]); ctx.fillStyle = D.oogRingKleur || '#E6DFD6'; ctx.fill(); am(R[2], R[3]); ctx.fillStyle = '#15100E'; ctx.fill();
    ctx.fillStyle = '#F2ECE4'; ctx.beginPath(); ctx.ellipse(R[2] * 0.25, -R[3] * 0.3, 0.7, 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore(); return; } if (D.oogStijl === 'glans') { // paardenoog zoals de kopplaat: donker amandeloog, lichtere oogleden-ring, lichtpuntje
    const O = D.VORM.oog, f = D.H / 160; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(-0.25); ctx.scale(f, f);
    const am = (rx, ry) => { ctx.beginPath(); ctx.moveTo(-rx, 0); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.3, rx * 0.5, -ry * 1.25, rx, -ry * 0.1); ctx.bezierCurveTo(rx * 0.5, ry * 1.1, -rx * 0.5, ry * 1.1, -rx, 0); ctx.closePath(); };
    am(4.6, 2.9); ctx.fillStyle = '#5A3420'; ctx.fill(); am(3.5, 2.1); ctx.fillStyle = '#140D0B'; ctx.fill();
    ctx.strokeStyle = '#2A1810'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(-4.4, -0.3); ctx.bezierCurveTo(-2.2, -3.6, 2.3, -3.5, 4.5, -0.6); ctx.stroke();
    ctx.fillStyle = '#F2ECE4'; ctx.beginPath(); ctx.ellipse(1.1, -0.7, 0.75, 0.55, 0, 0, 6.283); ctx.fill(); ctx.restore(); return; } if (D.oogStijl === 'koe') return _koeOog(ctx, D); const O = D.VORM.oog, r = D.oogR * D.H / 160; ctx.save(); ctx.translate(O[0], O[1]); ctx.fillStyle = D.oogRand || '#2A2220'; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.45, r * 0.95, -0.15, 0, 6.283); ctx.fill();
  if (typeof dierOog === 'function') { ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, r * 4, D.iris || '#2A1A10', { pupil: 'liggend' }); } ctx.restore(); }
function _hoefDef(naam, o) { const V = HOEF_VORM[naam], f = o.H / 160;
  const D = Object.assign({ K: 1, X0: 0, G0: 0, rand: 0.45 * f, verMix: 0.3, verKleur: '#2E2A30', J: V.J, VORM: V, PAL: { basis: V.delen.romp.c } }, o);
  D.POOT = _hoefPoot(f, o.dikV || 1, o.dikA || 1, o.POOT || {});
  D.TENEN = (ctx, k, pal, BOT) => _hoefTeken(ctx, k, pal, BOT, D);
  D.GEZICHT = (ctx, pal, cm, A, BOT) => { if (o.GEZICHT) o.GEZICHT(ctx, pal, A, BOT, D); _hoefNeus(ctx, D, pal); _hoefOog(ctx, D, A, BOT); };
  D.VOLGORDE = o.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['staart'], ['rad'], ['mc'], ['vp'], ['schn'], ['mt'], ['ap'], ['keelkap'], ['romp', 0, 'lijf'], ['dij', 0, 'lijf'], ['hum', 0, 'lijf'], ['keelweb', 0, 'lijf'], ['nek', 0, 'lijf'], ['kruis'], ['mond'], ['kaak'], ['kop'], ['oor']];
  return D; }
// gangmodellen (graden; 90 = recht omlaag, >90 = naar achter). Voor: carpus knikt in de zwaai naar achter (middenhand tot ±155°), hoef klapt om.
const _HOEF_G = {
  stapV: { metaS: [[0, 72], [0.5, 90], [0.8, 102], [1, 122]], metaZ: [[0, 122], [0.3, 138], [0.58, 112], [0.86, 80], [1, 72]], pootS: [[0, 56], [0.66, 58], [1, 112]], pootZ: [[0, 112], [0.3, 150], [0.6, 112], [0.86, 60], [1, 56]] },
  stapA: { metaS: [[0, 76], [0.5, 88], [0.8, 98], [1, 116]], metaZ: [[0, 114], [0.3, 100], [0.6, 76], [0.86, 80], [1, 84]], pootS: [[0, 56], [0.7, 58], [1, 100]], pootZ: [[0, 100], [0.3, 140], [0.6, 96], [0.86, 60], [1, 56]] },
  drafV: { metaS: [[0, 64], [0.5, 92], [1, 122]], metaZ: [[0, 120], [0.3, 165], [0.58, 128], [0.86, 80], [1, 84]], pootS: [[0, 50], [0.5, 46], [1, 104]], pootZ: [[0, 104], [0.3, 158], [0.62, 110], [0.86, 58], [1, 50]] },
  drafA: { metaS: [[0, 74], [0.5, 90], [1, 122]], metaZ: [[0, 120], [0.3, 104], [0.6, 70], [0.86, 74], [1, 80]], pootS: [[0, 52], [0.5, 48], [1, 104]], pootZ: [[0, 104], [0.3, 148], [0.62, 96], [0.86, 58], [1, 52]] },
};
// stap: laterale volgorde (A 0 · V 0,25 · AF 0,5 · VF 0,75), viertakt; draf: diagonale paren (A+VF, AF+V), duty < 0,5 = zweeffase
function _hoefStap(S, beta, f, extra = {}) { return Object.assign({ S, beta, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 13 * f, A: 9 * f }, bob: 0.9 * f, dy: 3.5 * f, nx: { V: 0, A: 0 }, scap: 14, rol: 0.8, knik: 2.5,
  V: _HOEF_G.stapV, A: _HOEF_G.stapA, staartZwaai: [2, 3, 4, 5] }, extra); }
function _hoefDraf(S, beta, f, extra = {}) { return Object.assign({ S, beta, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: 17 * f, A: 13 * f }, bob: 2.2 * f, bobFase: beta / 2 - 0.25, dy: 3 * f, nx: { V: 0, A: 0 }, scap: 20, rol: 1.4, knik: 1.5,
  V: _HOEF_G.drafV, A: _HOEF_G.drafA, staartZwaai: [3, 5, 7, 9] }, extra); }

// ---------- PAARD (Equus caballus), bruin (bay) met zwarte manen/staart/onderbenen, witte sokken achter. Schofthoogte 160 cm. ----------
// pootprofielen gemeten op de vlakke paardplaat (cm bij schofthoogte 160, voor/achter); ezel en muilezel schalen mee met H
const _VLAKPROF = { rad: [[-0.16, 6.5, 2.0], [0.0, 7.4, 7.4], [0.3, 6.9, 6.1], [0.6, 6.3, 4.8], [0.85, 4.9, 4.4], [1.0, 5.6, 4.7], [1.1, 5.0, 4.4]],
  mc: [[-0.06, 5.4, 4.8], [0.06, 5.0, 4.6], [0.5, 4.2, 4.2], [0.86, 4.6, 4.2], [1.0, 5.6, 4.0], [1.12, 4.6, 3.8]],
  vp: [[-0.2, 5.0, 5.2], [0.05, 4.2, 4.6], [0.45, 3.8, 4.0], [0.7, 4.0, 4.0]],
  schn: [[-0.18, 8.0, 6.0], [0.0, 9.0, 9.0], [0.3, 5.4, 10.0], [0.6, 5.2, 9.0], [0.9, 5.2, 6.0], [1.0, 5.4, 6.4], [1.1, 4.6, 5.0]],
  mt: [[-0.06, 5.0, 6.0], [0.08, 4.6, 5.0], [0.5, 4.4, 4.4], [0.88, 4.6, 4.6], [1.0, 5.4, 5.4], [1.1, 4.4, 4.4]],
  ap: [[-0.2, 5.0, 5.2], [0.05, 4.2, 4.6], [0.45, 3.8, 4.0], [0.7, 4.0, 4.0]] };
const _vlakPoot = (kl) => Object.fromEntries(Object.keys(_VLAKPROF).map(k => [k, Object.assign({ prof: _VLAKPROF[k] }, kl[k] || {})]));
const HOEF_PAARD_DEF = _hoefDef('paard', { H: 160, halsRecht: 1, kopVolg: 0.25, dikV: 1, dikA: 1, schoftVast: -2, nekAs: -14, oogStijl: 'glans', geenNeus: true, verKleur: '#2A2224', klem: 7,
  HOEF: { type: 'hoef', L: 12, hv: 8, hh: 4, kleur: '#6B6560', kroon: '#1D1D1D' },
  POOT: _vlakPoot({ rad: { lagen: [_hoefBand('#613B25', 0.42, 0.62), _hoefBand('#1D1D1D', 0.62, 1.3)] }, mc: { c: '#1D1D1D' }, vp: { c: '#1D1D1D' },
    schn: { lagen: [_hoefBand('#613B25', 0.66, 0.84), _hoefBand('#1D1D1D', 0.84, 1.3)] }, mt: { c: '#1D1D1D' }, ap: { c: '#1D1D1D' } }),
  HOUDING: { staan: { ver: { V: -18, A: -23 } }, grazen: { ver: { V: -40, A: -35 }, dvoet: { A: 10 }, dy: 3, reikNek: 85, reik: 1 } },
  GANGEN: { lopen: _hoefStap(170, 0.62, 1, { dy: 1.5, rol: 0.5 }), draven: _hoefDraf(240, 0.42, 1, { dy: 2, rol: 0.8 }) } });
// ---------- EZEL (Equus asinus), grijs, lichte buik/snuit/oogring, schouderkruis, korte rechtopstaande manen, kwaststaart. Schofthoogte 110 cm. ----------
const HOEF_EZEL_DEF = _hoefDef('ezel', { H: 110, halsRecht: 1, kopVolg: 0.25, schoftVast: -2, nekAs: -14, oogStijl: 'ring', oogRing: [8, 4.8, 4.4, 2.5], geenNeus: true, dikV: 0.95, dikA: 0.95, verKleur: '#2A2830', klem: 5,
  HOEF: { type: 'hoef', L: 10, hv: 8, hh: 4.4, kleur: '#26211E' },
  POOT: _vlakPoot({}),
  HOUDING: { staan: { ver: { V: -15, A: 10 } }, grazen: { ver: { V: 19, A: 26 }, dy: 7, reikNek: 78, reik: 1 } },
  GANGEN: { lopen: _hoefStap(100, 0.64, 0.69, { dy: 1, rol: 0.5 }), draven: _hoefDraf(155, 0.44, 0.69, { dy: 1.5, rol: 0.8 }) } });
// ---------- MUILEZEL (paard x ezel): lichaam van een paard (lichter, rechte rug), kop/oren/staart meer ezel. Schofthoogte 130 cm. ----------
const HOEF_MUIL_DEF = _hoefDef('muilezel', { H: 130, halsRecht: 1, kopVolg: 0.25, dikV: 1, dikA: 1, schoftVast: -2, nekAs: -14, oogStijl: 'ring', oogRing: [7, 4.4, 4, 2.4], oogRingKleur: '#D9C7B8', geenNeus: true, verKleur: '#2A2224', klem: 6,
  HOEF: { type: 'hoef', L: 10, hv: 8, hh: 4.4, kleur: '#261F1C' },
  POOT: _vlakPoot({ rad: { lagen: [_hoefBand('#473932', 0.8, 1.3)] }, mc: { c: '#473932' }, vp: { c: '#473932' }, schn: { lagen: [_hoefBand('#473932', 0.92, 1.3)] }, mt: { c: '#473932' }, ap: { c: '#473932' } }),
  HOUDING: { staan: { ver: { V: -14, A: -14 } }, grazen: { ver: { V: -30, A: -25 }, dy: 2, reikNek: 85, reik: 1 } },
  GANGEN: { lopen: _hoefStap(125, 0.63, 0.81, { dy: 1.2, rol: 0.5 }), draven: _hoefDraf(195, 0.43, 0.81, { dy: 1.8, rol: 0.8 }) } });
// ---------- EDELHERT (Cervus elaphus), mannetje met gewei, halsmanen, lichte spiegel. Schofthoogte 120 cm. ----------
const HOEF_HERT_DEF = _hoefDef('edelhert', { H: 120, oogR: 2.9, neusR: 2.2, neusHoek: 0, iris: '#2A1A10', dikV: 0.78, dikA: 0.8, verKleur: '#2E2622',
  HOEF: { type: 'klauw', L: 8, hv: 5.5, hh: 3, kleur: '#2E2826' },
  POOT: { mc: { c: '#8F684F' }, vp: { c: '#8F684F' }, mt: { c: '#8F684F' }, ap: { c: '#8F684F' } },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, vechten: { ver: { V: -16, A: 10 }, dvoet: { V: 8 }, dy: 4, A: { nek: 30, kop: 120 } },
    grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 16 }, dy: 7, A: { nek: 66 }, reik: 1 } },
  GANGEN: { lopen: _hoefStap(130, 0.62, 0.75, { knik: 2 }) } });
// liggen (borstligging): romp op de grond, voorbenen onder de borst gevouwen (carpus voor, middenhand en hoef naar achter),
// achterbenen opzij onder de buik (hak achter op de grond, middenvoet en hoef naar voren). voet = [teen x, teen y, middenhand/-voet, kootbeen] (graden)
function _koeLig(J) { const sc = J.schouder[0], hp = J.heup[0]; return { zit: 1, dy: 52, A: { rompV: -2, rompM: 180, rompA: 183, nek: -36, kop: 58, st0: 100, st1: 94, st2: 80, st3: 60 },
  voet: { V: [sc - 26, -3, 182, 186], VF: [sc - 34, -4, 180, 184], A: [hp + 56, -3, 4, 10], AF: [hp + 44, -4, 8, 14] } }; }
// ---------- KOE (Bos taurus), roodbont (MRIJ). Schofthoogte 140 cm. ----------
const HOEF_KOE_DEF = _hoefDef('koe', { H: 140, oogR: 2.7, oogStijl: 'koe', kopVolg: 0.95, neusK: '#7A4A44', mondK: '#7A5048', iris: '#2A1A10', dikV: 1.2, dikA: 1.15, verKleur: '#3A2E2E',
  HOEF: { type: 'klauw', L: 11, hv: 6.5, hh: 3.5, kleur: '#4A3D36' },
  POOT: { rad: { c: '#E8D8C7' }, mc: { c: '#E8D8C7' }, vp: { c: '#E8D8C7' }, schn: { c: '#E8D8C7' }, mt: { c: '#E8D8C7' }, ap: { c: '#E8D8C7' } },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 14 }, dy: 6, A: { nek: 62 }, reik: 1 },
    liggen: _koeLig(HOEF_VORM.koe.J) },
  GANGEN: { lopen: _hoefStap(130, 0.65, 0.88, { scap: 12, rol: 1.0 }) } });
// ---------- NIJLPAARD (Hippopotamus amphibius). Schofthoogte 150 cm, korte dikke poten, kaak open tot ±150° (gapen). ----------
const _NIJL_PROF = { rad: [[-0.25, 12, 6], [0, 15, 14], [0.3, 14, 13], [0.7, 12.5, 11.5], [1.0, 12.5, 11.5], [1.2, 12, 11]], mc: [[-0.3, 12.5, 11.5], [0.5, 12.5, 11.5], [1.0, 13, 12], [1.3, 12.5, 12]], vp: [[-0.3, 12.5, 12], [0.3, 13, 12.5], [0.6, 13, 12.5]],
  schn: [[-0.25, 14, 8], [0, 16, 15], [0.4, 14, 14], [0.8, 12.5, 12.5], [1.0, 12.5, 13], [1.2, 12, 12]], mt: [[-0.3, 12.5, 12], [0.5, 12.5, 12], [1.0, 13, 12.5], [1.3, 12.5, 12]], ap: [[-0.3, 12.5, 12], [0.3, 13, 12.5], [0.6, 13, 12.5]] };
const HOEF_NIJL_DEF = _hoefDef('nijlpaard', { H: 150, oogR: 2.4, neusK: '#3A2C30', mondK: '#4A3A3E', neusHoek: 0.2, iris: '#3A2414', dikV: 160 / 150, dikA: 160 / 150, verKleur: '#2E2630',
  POOT: Object.fromEntries(Object.entries(_NIJL_PROF).map(([k, p]) => [k, { prof: p }])),
  HOEF: { type: 'teen', L: 16, hv: 9, hh: 5, kleur: '#4A3E44', voet: 'basis' },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, gapen: { ver: { V: -8, A: 8 }, A: { nek: -26, kop: -16 }, bek: 108 } },
  MOND(ctx, M, A, BOT, pal) { // open bek naar koppen.png: gehemelte (bovenkop) + binnenrand onderkaak, diepe keelboog, tong, gebogen slagtanden onder, snijtanden vooruit
    const N = HOEF_VORM.nijlpaard.mondNijl; const G = N.gehemelte.map(M.kop), O = N.onderLijn.map(M.kaak);
    const vul = (pts, c) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); };
    const hoek = [(G[G.length - 1][0] + O[0][0]) / 2, (G[G.length - 1][1] + O[0][1]) / 2], diep = Math.hypot(G[0][0] - O[O.length - 1][0], G[0][1] - O[O.length - 1][1]) * 0.22;
    const mid = [(G[0][0] + O[O.length - 1][0]) / 2, (G[0][1] + O[O.length - 1][1]) / 2], ax = [hoek[0] - mid[0], hoek[1] - mid[1]], al = Math.hypot(ax[0], ax[1]) || 1, d = [ax[0] / al, ax[1] / al];
    const keel = [G[G.length - 1], [hoek[0] + d[0] * diep - d[1] * diep * 0.7, hoek[1] + d[1] * diep + d[0] * diep * 0.7], [hoek[0] + d[0] * diep * 1.3, hoek[1] + d[1] * diep * 1.3], [hoek[0] + d[0] * diep + d[1] * diep * 0.7, hoek[1] + d[1] * diep - d[0] * diep * 0.7], O[0]];
    vul(G.concat(keel.slice(1, -1), O), '#D7929A'); // mondholte met keelboog
    vul([G[G.length - 2], ...keel.slice(1, -1), O[1], hoek], '#8E4452'); // keel donker
    vul(N.tong.map(M.kaak), '#C06A7A');
    const tand = (F, [b, t, w], c) => { const B = F(b), Tt = F(t), dx = Tt[0] - B[0], dy = Tt[1] - B[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, ww = w * 0.5;
      const k = [B[0] + dx * 0.55 + nx * ww * 1.2, B[1] + dy * 0.55 + ny * ww * 1.2]; ctx.beginPath(); ctx.moveTo(B[0] + nx * ww, B[1] + ny * ww); ctx.quadraticCurveTo(k[0], k[1], Tt[0], Tt[1]); ctx.quadraticCurveTo(B[0] + dx * 0.5 - nx * ww * 0.2, B[1] + dy * 0.5 - ny * ww * 0.2, B[0] - nx * ww, B[1] - ny * ww); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); };
    for (const t of N.boven) tand(M.kop, t, '#E6D6B0'); for (const t of N.snij) tand(M.kaak, t, '#EFE2C2'); for (const t of N.slag) tand(M.kaak, t, '#E9D3A2'); },
  GANGEN: { lopen: _hoefStap(150, 0.7, 0.94, { bob: 1.2, rol: 1.2, knik: 1.2, lift: { V: 9, A: 7 } }) } });

const HOEF = {};
HOEF.paard = HoefPop.maak(HOEF_PAARD_DEF); HOEF.ezel = HoefPop.maak(HOEF_EZEL_DEF); HOEF.muilezel = HoefPop.maak(HOEF_MUIL_DEF);
HOEF.edelhert = HoefPop.maak(HOEF_HERT_DEF); HOEF.koe = HoefPop.maak(HOEF_KOE_DEF); HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF);

// =====================================================================================================
// WRAPPERS: dezelfde namen, aanroep en schermmaat als in dieren_zoog.js (schofthoogte op het scherm gelijk, anker = midden onder het dier)
//   paard/ezel/muilezel: s px per cm (160·s / 110·s / 130·s px schoft) · edelhert 2·s px/cm · koe7 1,7·s px/cm · nijlpaard 1,3·s px/cm
// o.houding: 'staan' | 'lopen' | 'draven' (paardachtigen) | 'grazen' | 'vechten' (hert) | 'liggen' (koe) | 'gapen' (nijlpaard); o.t / o.fase, o.kijk, o.a, o.wereld
// =====================================================================================================
const _HOEF_HMAP = { draf: 'draven', rennen: 'draven', galop: 'draven', snuffelen: 'grazen', eten: 'grazen', zitten: 'liggen', lig: 'liggen', gaap: 'gapen' };
function _hoefWrap(ctx, P, x, y, pxcm, o) { if (o == null) o = {}; if (typeof o === 'number') o = { a: o }; if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = _HOEF_HMAP[h] || h; if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = (h === 'draven' && P.GANGEN.lopen) ? 'lopen' : 'staan'; oo.houding = h;
  if (o.nekHoek) oo.nekHoek = o.nekHoek; if (o.kopHoek) oo.kopHoek = o.kopHoek;
  return P.teken(ctx, x, y, pxcm, oo); }
function paard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.paard, x, y, s, o); }
function ezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.ezel, x, y, s, o); }
function muilezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.muilezel, x, y, s, o); }
function edelhert(ctx, x, y, s = 1, o = {}) { const k = o.kop || 0; const oo = Object.assign({}, o); if (k > 0.5 && !o.houding) oo.houding = 'vechten'; else if (k) { oo.nekHoek = (o.nekHoek || 0) + k * 1.15; oo.kopHoek = (o.kopHoek || 0) + k * 0.35; }
  return _hoefWrap(ctx, HOEF.edelhert, x, y, s * 2, oo); }
function koe7(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.koe, x, y, s * 1.7, o); }
function nijlpaard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.nijlpaard, x, y, s * 1.3, o); }

// ===== pop_vogels.js =====
// Vogels als uitknippop (cut-out rig), 23 okt 2026 — POPFAMILIE.md, familie vogels. Laadt NA dieren_overig.js en vervangt
// grondvink, merel, koolmees, zaadkraker, pauw, pauwin, vogel (blauwe reiger) en zwaluw (zelfde naam, aanroep, eenheid en anker).
// VOGELSKELET (anders dan bij de wolf): dijbeen verborgen in de romp (knie wijst naar voren), tibiotarsus ('drumstick') grotendeels bevederd,
// zichtbaar is vooral de tarsus; het gewricht dat naar achter knikt is de HIEL. Vleugel = opperarm, onderarm (armpennen), hand (handpennen).
// De vleugel is een 3D-vlak: slaghoek phi draait de spanwijdte om de lichaamsas (y = b·sin(phi ± eps)), vouw f (0 gespreid, 1 dicht)
// draait de botten in het vleugelvlak; de pennen volgen de botten. Rust: f = 1, phi = -90° (de dichte vleugel ligt tegen de flank).
// Alles in de eenheden van de oude functies (lessen_pop_vogels.md). Twee passes: eerst lichte silhouetrand van alle delen, dan de vlakken.
const VogelPop = (() => {
  const RAD = Math.PI / 180, EPS = 14 * RAD; // eps = camera iets boven het dier: verre vleugel valt niet samen met de nabije
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (v, k) => [v[0] * k, v[1] * k];
  const dir = (a) => [Math.cos(a), Math.sin(a)], ang = (v) => Math.atan2(v[1], v[0]), len = (v) => Math.hypot(v[0], v[1]);
  const L = (a, b, u) => a + (b - a) * u, LP = (p, q, u) => [L(p[0], q[0], u), L(p[1], q[1], u)];
  const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const mix = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const DK = (c, k = 0.25) => mix(c, k, '#000000'), LT = (c, k = 0.25) => mix(c, k, '#FFFFFF');
  const VER = (c) => mix(c, 0.3, '#2E2B29'); // verre delen: warm donker (wolfles 6)
  const RIM = (c) => mix(c, 0.3, '#F2EEE6');
  // sleutelkromme [[u, waarde], ...] met smoothstep
  const kurve = (K, u) => { u = Math.max(0, Math.min(1, u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * ss((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function crs(P, st = 1.2) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = []; const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n]; const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = 0; s < m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  function cro(P, st = 1.2) { const n = P.length, out = [];
    for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)]; const ta = mul(sub(b, p0), 0.5), tb = mul(sub(p3, a), 0.5); const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = (i ? 1 : 0); s <= m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  // buis langs een (open) middellijn P met breedtes W per controlepunt (boven/onder apart mogelijk: Wo)
  function buis(P, W, Wo = W, st = 1.0) { const C = cro(P, st); const cum = [0]; for (let i = 1; i < C.length; i++) cum.push(cum[i - 1] + len(sub(C[i], C[i - 1])));
    const ck = [0]; for (let i = 1; i < P.length; i++) ck.push(ck[i - 1] + len(sub(P[i], P[i - 1]))); const tot = cum[cum.length - 1] || 1, totk = ck[ck.length - 1] || 1;
    const wAt = (Wv, s) => { if (Wv.length !== P.length) { const u = s / tot * (Wv.length - 1), i = Math.min(Wv.length - 2, Math.floor(u)); return L(Wv[i], Wv[i + 1], u - i); }
      const u = s / tot * totk; let i = 0; while (i < ck.length - 2 && ck[i + 1] < u) i++; return L(Wv[i], Wv[i + 1], Math.max(0, Math.min(1, (u - ck[i]) / Math.max(1e-6, ck[i + 1] - ck[i])))); };
    const A = [], B = []; for (let i = 0; i < C.length; i++) { const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)]; const d = sub(b, a), l = len(d) || 1, n = [d[1] / l, -d[0] / l];
      A.push(add(C[i], mul(n, wAt(Wo, cum[i]) / 2))); B.push(sub(C[i], mul(n, wAt(W, cum[i]) / 2))); }
    return { pts: A.concat(B.reverse()), boven: A, onder: B, mid: C }; }
  const tf = (o, a, j = [0, 0]) => (v) => add(o, rot(sub(v, j), a)); // lokaal -> wereld

  // ---------- tekenen: lijst van delen ----------
  // deel = { b: basisvorm, c: vulkleur, l: [{p, c} | {lijn, c, w}], r: false (geen rand), o: omtreklijn [kleur, breedte], na(ctx) }
  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  function render(ctx, D, rw) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const d of D) if (d.r !== false && d.b) { pad(ctx, d.b); ctx.strokeStyle = d.rk || RIM(d.c); ctx.lineWidth = rw * 2; ctx.stroke(); }
    for (const d of D) { if (d.vooraf) d.vooraf(ctx); if (!d.b) { if (d.na) d.na(ctx); continue; }
      pad(ctx, d.b); ctx.fillStyle = d.c; ctx.fill();
      if (d.l && d.l.length) { ctx.save(); pad(ctx, d.b); ctx.clip(); for (const l of d.l) { if (!l) continue;
          if (l.lijn) { ctx.beginPath(); l.lijn.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = l.c; ctx.lineWidth = l.w; ctx.stroke(); }
          else if (l.fn) l.fn(ctx); else { pad(ctx, l.p); ctx.fillStyle = l.c; ctx.fill(); } } ctx.restore(); }
      if (d.o) { pad(ctx, d.b); ctx.strokeStyle = d.o[0]; ctx.lineWidth = d.o[1]; ctx.stroke(); }
      if (d.na) d.na(ctx); } }

  // ---------- poot ----------
  function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al; return { knie: add(p0, mul(dir(a1), l1)), rek }; }
  // tenen: polylijnen (wereld) met breedtes. P = poot-spec, v = voet-pose
  function tenen(P, v) { const F = v.F, T = P.teen, H = P.hal, tw = P.tw, uit = [];
    const boog = (C, r, a0, a1, n = 8) => { const out = []; for (let i = 0; i <= n; i++) { const a = L(a0, a1, i / n); out.push(add(C, mul(dir(a), r))); } return out; };
    if (v.modus === 'tak') { const C = v.C, r = len(sub(F, C)), a0 = ang(sub(F, C));
      const vr = Math.min(1.7, T / r), hr = Math.min(1.35, H / r);
      uit.push({ p: boog(C, r, a0, a0 + vr * 0.92), w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 }); // buitenteen (iets verder)
      uit.push({ p: boog(C, r, a0, a0 + vr), w: [tw * 0.85, tw * 0.62], klauw: 1 }); // middenteen
      uit.push({ p: boog(C, r, a0 + 0.05, a0 - hr), w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else if (v.modus === 'schors') { const a = v.ta || 0; // tenen gespreid tegen de schors
      for (const [da, l, k] of [[-1.15, T, 1], [-0.75, T * 0.8, 1], [1.9, H, -1]]) { const d = dir(a + da); uit.push({ p: [F, add(F, mul(d, l * 0.55)), add(F, add(mul(d, l), mul(dir(a + da + k * 0.6), l * 0.1)))], w: [tw * 0.8, tw * 0.55], klauw: k }); } }
    else if (v.modus === 'vlucht' || v.modus === 'zwaai') { const a = v.ta, k = v.modus === 'vlucht' ? 1 : 0.6, T = P.teen * (v.modus === 'vlucht' ? 0.6 : 0.85), H = P.hal * (v.modus === 'vlucht' ? 0.6 : 0.85); // tenen gekruld (vlucht) of halfgevouwen (zwaaifase lopen)
      const d = dir(a); const C = add(F, mul(dir(a + 1.4), T * 0.22 * k + 0.5));
      uit.push({ p: [F, add(F, mul(dir(a + 0.5), T * 0.45)), add(F, mul(dir(a + 1.2), T * (0.75 - 0.25 * k)))], w: [tw * 0.8, tw * 0.55], klauw: 1, tint: 0.12 });
      uit.push({ p: [F, add(F, mul(dir(a + 0.25), T * 0.55)), add(F, mul(dir(a + 0.9), T * (0.95 - 0.3 * k)))], w: [tw * 0.85, tw * 0.6], klauw: 1 });
      uit.push({ p: [F, add(F, mul(dir(a + 3.0), H * 0.5)), add(F, mul(dir(a + 2.5), H * 0.8))], w: [tw * 0.8, tw * 0.55], klauw: -1 }); }
    else { const y = F[1] + tw * 0.15; // grond: plat, middenteen naar voren, buitenteen iets korter (naar de kijker), achterteen (hallux)
      uit.push({ p: [[F[0], y], [F[0] + T * 0.5, y + tw * 0.1], [F[0] + T * 0.8, y + tw * 0.15]], w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 });
      uit.push({ p: [[F[0], y], [F[0] + T * 0.55, y + tw * 0.15], [F[0] + T, y + tw * 0.2]], w: [tw * 0.85, tw * 0.62], klauw: 1 });
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.15], [F[0] - H, y + tw * 0.2]], w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    return uit; }
  // poot -> delen. heup (wereld), v = {F, ta, modus, C}, ver = verre poot
  function pootDelen(sp, heup, v, ver, kl) {
    const P = sp.poot, D = []; const hiel = sub(v.F, mul(dir(v.ta), P.tars)); const { knie, rek } = ik(heup, hiel, P.fem, P.tib, -1);
    const leg = ver ? VER(P.kl) : P.kl, legL = LT(leg, 0.14), dij = ver ? VER(kl.dij || sp.pal.buik) : (kl.dij || sp.pal.buik);
    // tibiotarsus: bevederd deel (dij/broek) en eventueel kaal onderste deel (reiger, pauw)
    const kaal = P.kaal || 0; const kD = LP(knie, hiel, P.kaal ? 1 - kaal : (P.dijTot ?? 0.55));
    if (kaal > 0) D.push({ b: buis([LP(knie, hiel, 0.5), hiel], [P.tw * 1.25, P.tw * 1.1]).pts, c: leg });
    const dijV = buis([LP(heup, knie, 0.4), knie, LP(knie, kD, 0.55), kD], [P.dij[0] * 0.8, P.dij[0], P.dij[0] * 0.8, P.dij[1]]).pts;
    const dijD = { b: dijV, c: dij };
    // tarsus met schubben (dwarsstreepjes aan de voorkant)
    const tv = buis([hiel, LP(hiel, v.F, 0.5), v.F], [P.tw * 1.2, P.tw, P.tw * 0.95]);
    const sch = []; for (let i = 1; i < 6; i++) { const q = LP(hiel, v.F, i / 6), n = rot(dir(v.ta), -Math.PI / 2); sch.push({ lijn: [add(q, mul(n, P.tw * 0.15)), add(q, mul(n, P.tw * 0.55))], c: DK(leg, 0.25), w: P.tw * 0.12 }); }
    const spoor = P.spoor ? (ctx) => { const q = LP(hiel, v.F, 0.62), n = rot(dir(v.ta), Math.PI / 2); const t = add(q, add(mul(n, P.tw * 1.4), mul(dir(v.ta), -P.tw * 0.5)));
      ctx.fillStyle = DK(leg, 0.2); ctx.beginPath(); ctx.moveTo(...add(q, mul(dir(v.ta), -P.tw * 0.5))); ctx.lineTo(...t); ctx.lineTo(...add(q, mul(dir(v.ta), P.tw * 0.5))); ctx.closePath(); ctx.fill(); } : null;
    D.push({ b: tv.pts, c: leg, l: [...sch, { lijn: [LP(hiel, v.F, 0.05), LP(hiel, v.F, 0.95)].map(q => add(q, mul(rot(dir(v.ta), Math.PI / 2), P.tw * 0.28))), c: legL, w: P.tw * 0.2 }], na: spoor });
    for (const t of tenen(P, v)) { const pp = buis(t.p, t.w); const c = t.tint ? DK(leg, t.tint) : leg; const e = t.p[t.p.length - 1], e2 = t.p[t.p.length - 2]; const a = ang(sub(e, e2));
      D.push({ b: pp.pts, c, na: (ctx) => { // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

  // ---------- vleugel ----------
  // a = langs de lichaamsas (vooruit +), b = langs de spanwijdte. Botten: beta = hoek vanaf +a richting +b.
  function veer(p, be, l, w, punt) { const d = dir(be), n = [-d[1], d[0]], A = [], B = [];
    for (let i = 0; i <= 10; i++) { const u = i / 10; let hw = w * (u < 0.2 ? 0.55 + 2.25 * u : 1); if (u > 0.55) hw *= punt ? Math.pow((1 - u) / 0.45, 0.75) * 0.95 + 0.05 : Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.55) / 0.45, 2.2)));
      const q = add(p, mul(d, u * l)); A.push(add(q, mul(n, hw))); B.push(sub(q, mul(n, hw * 0.62))); }
    return A.concat(B.reverse()); }
  function vleugelGeo(W, f, sweep = 0) {
    const bh = L(56, 170, f) * RAD, bu = L(78, 16, f) * RAD + sweep * 0.5, bm = L(90, 184, f) * RAD + sweep;
    const S = [0, 0], E = add(S, mul(dir(bh), W.hum)), Wr = add(E, mul(dir(bu), W.uln)), T = add(Wr, mul(dir(bm), W.man));
    const P = [], Sx = [], Tt = []; const nP = W.P.length, nS = W.S.length;
    for (let i = 0; i < nP; i++) { const q = i / (nP - 1); const be = bm + L(L(W.pw0 ?? -4, W.pw1 ?? 66, q), L(0, 6, q), f) * RAD; P.push({ p: LP(T, Wr, q * 0.92), be, l: W.P[i], w: W.P[i] * (W.pb ?? 0.13), punt: W.punt ?? 1 }); }
    for (let j = 0; j < nS; j++) { const q = j / (nS - 1); const be = L(L(166, 184, q), L(178, 182, q), f) * RAD; Sx.push({ p: LP(Wr, E, q * 0.95), be, l: W.S[j], w: W.S[j] * (W.sb ?? 0.24), punt: 0 }); }
    for (let k = 0; k < W.T.length; k++) { const be = L(186 + 5 * k, 183 + 3 * k, f) * RAD; Tt.push({ p: LP(E, S, 0.1 + 0.3 * k), be, l: W.T[k], w: W.T[k] * 0.24, punt: 0 }); }
    const dS = dir(L(176, 180, f) * RAD), dP = dir(bm + L(20, 3, f) * RAD), dT = dir(L(186, 182, f) * RAD);
    const M = LP(Wr, T, 0.55);
    const dek = [S, E, LP(E, Wr, 0.5), Wr, M, add(M, mul(dP, W.P[2] * 0.26)), add(Wr, mul(dS, W.S[0] * 0.42)), add(LP(E, Wr, 0.5), mul(dS, W.S[3] * 0.44)), add(E, mul(dS, W.S[nS - 1] * 0.46)), add(S, mul(dT, W.T[0] * 0.5))];
    const kleinDek = [S, E, LP(E, Wr, 0.5), Wr, LP(Wr, T, 0.3), add(LP(Wr, T, 0.3), mul(dP, W.P[2] * 0.1)), add(Wr, mul(dS, W.S[0] * 0.2)), add(E, mul(dS, W.S[nS - 1] * 0.2)), add(S, mul(dT, W.T[0] * 0.22))];
    return { S, E, Wr, T, P, Sx, Tt, dek, kleinDek, dS }; }
  // vleugel -> delen in wereld. sw = schouder (wereld), tb = romphoek, k = projectiefactor (sin(phi ± eps)), dorsaal = bovenkant zichtbaar
  function vleugelDelen(sp, sw, tb, phi, f, ver, sweep = 0) {
    const W = sp.vl, k = ver ? Math.sin(phi - EPS) : Math.sin(phi + EPS), dors = ver ? Math.sin(phi) > -0.05 : k < 0.05;
    const ax = dir(tb), up = [Math.sin(tb), -Math.cos(tb)], g = vleugelGeo(W, f, sweep);
    const pr = (q) => add(sw, add(mul(ax, q[0]), mul(up, q[1] * k * (W.bk ?? 1))));
    const pal = W.pal, cv = (c) => ver ? VER(c) : c;
    const veerC = dors ? pal.veer : pal.onder, zoom = dors ? pal.zoom : DK(pal.onder, 0.12), dek = dors ? pal.dek : LT(pal.onder, 0.1);
    const D = [];
    const veerDeel = (v, c, zc, extra) => { const pts = veer(v.p, v.be, v.l, v.w, v.punt).map(pr); const shaft = [v.p, add(v.p, mul(dir(v.be), v.l * 0.9))].map(pr);
      D.push({ b: pts, c: cv(c), o: [cv(zc), (W.lw ?? 0.9) * L(1, 0.7, f)], l: [f < 0.7 ? { lijn: shaft, c: cv(DK(c, 0.2)), w: (W.lw ?? 0.9) * 0.6 } : null, extra] }); };
    const P = g.P, S = g.Sx, T = g.Tt;
    const handC = pal.hand || veerC, armC = pal.arm || veerC;
    const tip = (v, c) => pal.punt ? { p: veer(add(v.p, mul(dir(v.be), v.l * 0.62)), v.be, v.l * 0.4, v.w, v.punt).map(pr), c: cv(c) } : null;
    if (dors) { for (const v of P) veerDeel(v, dors ? handC : veerC, zoom, tip(v, pal.punt)); for (const v of S) veerDeel(v, armC, zoom); for (const v of T) veerDeel(v, pal.tert || armC, zoom); }
    else { for (const v of [...T].reverse()) veerDeel(v, veerC, zoom); for (const v of [...S].reverse()) veerDeel(v, veerC, zoom); for (const v of [...P].reverse()) veerDeel(v, veerC, zoom); }
    const band = dors && pal.band ? { p: [g.Wr, g.E, add(g.E, mul(g.dS, W.S[W.S.length - 1] * 0.46)), add(g.Wr, mul(g.dS, W.S[0] * 0.42))].map(pr), c: cv(pal.band) } : null;
    const dekL = dors && pal.dekPatroon ? { fn: (ctx) => pal.dekPatroon(ctx, g, pr, ver) } : null;
    D.push({ b: crs(g.dek.map(pr), 1), c: cv(dek), l: [band, dors ? { p: crs(g.kleinDek.map(pr), 1), c: cv(pal.kleinDek || DK(dek, 0.08)) } : null, dekL] });
    return { D, g, pr, k, dors }; }

  // ---------- staart ----------
  function staartDelen(sp, basis, a, spreid, ver) { const S = sp.staart, n = S.n || 5, D = []; const cv = (c) => ver ? VER(c) : c;
    // pennen van achter (verst) naar voor; bij spreiden draaien ze iets uit elkaar
    for (let i = 0; i < n; i++) { const q = n > 1 ? i / (n - 1) : 0.5; const da = (q - 0.5) * spreid * 0.5 + (S.krom || 0) * (q - 0.5); const be = Math.PI + a + da;
      const l = S.L * (S.vork ? 1 + S.vork * Math.pow(Math.abs(q - 0.5) * 2, 3) : 1) * (S.rond ? 1 - 0.08 * Math.pow(Math.abs(q - 0.5) * 2, 2) : 1);
      const p = add(basis, mul(dir(be + Math.PI / 2), (q - 0.5) * S.wb * (0.18 + 0.5 * spreid)));
      const pts = veer(p, be, l, (S.vork ? S.wt * 0.38 : S.wt * 0.5) * (S.vork && Math.abs(q - 0.5) > 0.4 ? 0.6 : 1), S.vork ? 1 : 0);
      const wit = S.wit && (i === n - 1) ? { p: veer(add(p, mul(dir(be), l * 0.35)), be, l * 0.66, S.wt * 0.5, 0), c: cv(S.wit) } : null;
      D.push({ b: pts, c: cv(i === n - 1 ? S.kl : DK(S.kl, 0.1)), o: [cv(S.rand || LT(S.kl, 0.2)), (S.lw || 0.9) * 0.7], l: [{ lijn: [add(p, mul(dir(be), l * 0.1)), add(p, mul(dir(be), l * 0.9))], c: cv(DK(S.kl, 0.22)), w: (S.lw || 0.9) * 0.55 }, wit] }); }
    return D; }

  // ---------- nek (zachte buis tussen romp en kop) ----------
  function nekDelen(sp, P) { const N = sp.nek; const pts = P.nekPts; const nb = buis(pts, P.nekW || N.w, P.nekW || N.w);
    const lagen = []; if (N.voor) lagen.push({ p: nb.onder.concat([...nb.mid].reverse()), c: N.voor }); if (N.achter) lagen.push({ p: nb.boven.concat([...nb.mid].reverse()), c: N.achter });
    if (N.patroon) lagen.push({ fn: (ctx) => N.patroon(ctx, nb) });
    return [{ b: nb.pts, c: N.kl, l: lagen }]; }

  // ---------- het hele dier ----------
  function delen(sp, P, o = {}) {
    const D = [], Tb = tf(P.heup, P.tb), pal = sp.pal;
    const kopW = add(P.kop, [0, 0]), Tk = tf(kopW, P.tk);
    const vl = P.vl || {}; const vlieg = !!vl.vlieg;
    // romp
    const romp = { b: sp.romp.map(Tb), c: pal.basis, l: (sp.rompLagen || []).map(l => l.fn ? { fn: (ctx) => { ctx.save(); ctx.translate(...P.heup); ctx.rotate(P.tb); l.fn(ctx, P); ctx.restore(); } } : l.lijn ? { lijn: l.lijn.map(Tb), c: l.c, w: l.w } : { p: l.p.map(Tb), c: l.c }) };
    const poot = (zij) => { const v = P.poot[zij]; if (!v) return { D: [] }; return pootDelen(sp, Tb(sp.heupL || [0, 0]), v, zij === 'f', { dij: sp.dijKl }); };
    const pn = poot('n'), pf = poot('f');
    const vlD = (zij) => { const v = vl[zij]; if (!v) return { D: [] }; return vleugelDelen(sp, Tb(sp.vl.sch), P.tb, v.phi, v.f, zij === 'f', v.sweep || 0); };
    const staart = staartDelen(sp, Tb(sp.staart.aan), P.tb + (P.ts || 0), P.tsp || 0, false);
    const kop = { b: (sp.kop.Kc || (sp.kop.Kc = VogelPop.crs(sp.kop.K, 1))).map(Tk), c: sp.kop.kl, l: (sp.kop.lagen || []).map(l => l.lijn ? { lijn: l.lijn.map(Tk), c: l.c, w: l.w } : { p: l.p.map(Tk), c: l.c }),
      na: (ctx) => { ctx.save(); ctx.translate(...kopW); ctx.rotate(P.tk); sp.kop.na(ctx, o, P); ctx.restore(); } };
    // volgorde: verre poot, verre vleugel (vlucht), staart/sleep, nabije poot (vlucht: achter de buik), romp, nabije poot, nabije vleugel, nek, kop
    if (pf.dij) D.push(pf.dij); D.push(...pf.D);
    if (vl.f && vlieg) D.push(...vlD('f').D);
    if (sp.achter) D.push(...sp.achter(P, Tb, o));
    if (!sp.staartVoor) D.push(...staart);
    if (pn.dij) D.push(pn.dij);
    if (P.pootAchter) D.push(...pn.D);
    D.push(romp);
    if (sp.staartVoor) D.push(...staart);
    if (sp.rompNa) D.push(...sp.rompNa(P, Tb, o));
    if (!P.pootAchter) D.push(...pn.D);
    if (vl.n) D.push(...vlD('n').D);
    if (sp.vlNa) D.push(...sp.vlNa(P, Tb, o));
    D.push(...nekDelen(sp, P));
    D.push(kop);
    if (sp.kopNa) D.push(...sp.kopNa(P, Tk, o));
    return { D, pn, pf }; }

  function teken(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }

  return { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, mix, DK, LT, VER, RIM, kurve, hermite, crs, cro, buis, tf, pad, render, ik, tenen, pootDelen, veer, vleugelGeo, vleugelDelen, staartDelen, delen, teken };
})();

// ===================================================================================
// ZANGVOGELS (grondvink, zaadkraker, koolmees, merel): één sjabloon, per soort eigen maten, kleuren, kop en houdingen.
// Sjabloon in grondvink-eenheden (1 = 0,5 mm). Romp-lokaal: oorsprong = heup, x = langs de romp naar voren.
// Maten (tekstbronnen, zie lessen_pop_vogels.md): G. fortis 12,5 cm, vleugel 68–73 mm, tarsus 20–24 mm, staart ± 42 mm.
// ===================================================================================
const VogelZang = (() => {
  const V = VogelPop, { RAD, rot, add, sub, mul, dir, L, LP, ss, fr, kurve, DK, LT } = V;
  const ROMP0 = [[-52, -15], [-30, -26], [0, -36], [30, -43], [56, -47], [78, -44], [96, -30], [104, -10], [101, 10], [88, 27], [64, 38], [36, 42], [10, 38], [-14, 28], [-34, 14], [-48, 2], [-56, -7]];
  const MANTEL = [[74, -45], [44, -45], [14, -38], [-4, -31], [14, -27], [46, -30], [72, -34]];
  const sc = (P, sx, sy) => P.map(p => [p[0] * sx, p[1] * sy]);
  // streepjes (druppels) in rijen op borst en flank
  function strepen(ctx, kl, x0, x1, y0, y1, n, w, seed = 1) { ctx.fillStyle = kl; for (let i = 0; i < n; i++) { const u = (i * 0.618 + hash(i * 3.1 + seed) * 0.3) % 1, v = (i * 0.37 + hash(i * 7.7 + seed) * 0.4) % 1; const x = L(x1, x0, u), y = L(y0, y1, v);
      ctx.beginPath(); ctx.ellipse(x, y, w * 0.45, w * (0.9 + 0.4 * hash(i)), 0.35, 0, 6.283); ctx.fill(); } }

  function maak(def) { // def: soortgegevens -> spec voor VogelPop
    const sx = def.sx || 1, sy = def.sy || 1;
    const sp = { rw: def.rw || 1.1, pal: def.pal, romp: V.crs(sc(ROMP0, sx, sy), 1.2), rompLagen: def.rompLagen(sx, sy),
      heupL: [0, 0], dijKl: def.dijKl, kopL: [82 * sx, -26 * sy],
      poot: def.poot, vl: def.vl, staart: Object.assign({ aan: [-50 * sx, -13 * sy] }, def.staart), kop: def.kop,
      nek: { kl: def.kop.kl, voor: def.pal.keel || def.pal.buik, achter: def.kop.kl, aan: [62 * sx, -30 * sy], w: [50 * sy, 48 * sy, 46 * sy] },
      vlNa: (P, Tb) => [{ b: VogelPop.crs(sc(MANTEL, sx, sy), 1).map(Tb), c: def.pal.mantel || def.pal.rug, r: false }],
      kopAan: def.kopAan || [-8, 6], ...def.extra };
    sp.def = def; return sp; }

  // houdingen -> pose. ctxInfo: { z: zitplek }
  function nekPts(sp, P) { const Tb = V.tf(P.heup, P.tb), Tk = V.tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
  function voetGrond(sp, x) { return [x, -sp.poot.tw * 0.55]; }
  function pose(sp, h, o = {}) {
    const d = sp.def, t = o.t || 0, P = { poot: {}, vl: {} };
    const kopRel = (tb) => rot(sp.kopL, tb);
    const vx = d.voetX; // voetmidden t.o.v. het anker (uit de staan-houding)
    if (h === 'staan' || h === 'pikken0') { // grond; kop op het oude kopframe (sb2 rekent daarmee)
      P.tb = d.tbStaan * RAD; P.kop = d.kopF.slice(); P.tk = (o.pik || 0) * d.pikR; const kr = kopRel(P.tb);
      P.heup = [P.kop[0] - kr[0], -d.heupH]; P.ts = d.tsStaan * RAD;
      P.poot.n = { F: voetGrond(sp, P.heup[0] + d.voetDx[0]), ta: d.taStaan * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, P.heup[0] + d.voetDx[1]), ta: (d.taStaan - 6) * RAD, modus: 'grond' };
      P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'pikken') { P.tb = (d.tbStaan + 30) * RAD; P.heup = [vx + 2, -d.heupH + 6]; const kr = kopRel(P.tb); P.kop = add(P.heup, add(kr, [10, 26])); P.tk = (o.pik ?? 1) * d.pikR + 0.35;
      P.ts = (d.tsStaan + 18) * RAD; P.poot.n = { F: voetGrond(sp, vx + 6), ta: (d.taStaan - 4) * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, vx - 8), ta: (d.taStaan - 10) * RAD, modus: 'grond' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'tak' || h === 'schuin') { // tenen om de tak. o.takHoek (rad, schermhoek van de tak; negatief = stijgt naar rechts), o.takDik
      const hk = h === 'schuin' ? (o.takHoek ?? -0.62) : (o.takHoek || 0), dik = o.takDik ?? 10, r = dik / 2; const u = dir(hk), nUp = [Math.sin(hk), -Math.cos(hk)];
      const opTak = (x) => { const p0 = [x, (x - vx) * Math.tan(hk)]; return { F: add(p0, mul(nUp, sp.poot.tw * 0.5)), C: sub(p0, mul(nUp, r)) }; };
      const schuin = Math.max(0, -hk) / 0.62; P.tb = (d.tbTak - 14 * schuin) * RAD; P.ts = (d.tsTak - 6 * schuin) * RAD;
      const a = opTak(vx + 10 + 4 * schuin), b = opTak(vx - 12 - 2 * schuin);
      const hy = L(a.F[1], b.F[1], 0.5); P.heup = [vx + 2 - 6 * schuin, hy - d.heupTak];
      const kr = kopRel(P.tb); P.kop = add(P.heup, add(kr, [0, 2])); P.tk = (o.pik || 0) * d.pikR + (h === 'schuin' ? -0.08 : 0);
      P.poot.n = { F: a.F, C: a.C, ta: (d.taTak - 8 * schuin) * RAD, modus: 'tak' }; P.poot.f = { F: b.F, C: b.C, ta: (d.taTak + 6 - 4 * schuin) * RAD, modus: 'tak' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'klampen') { // aan de schors (oude aanroep draait het hele dier met o.rot): rechtop, tenen gespreid, staart tegen de stam
      P.tb = (d.tbStaan - 28) * RAD; P.heup = [vx + 4, -d.heupH + 4]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = (o.pik || 0) * d.pikR; P.ts = (d.tsStaan - 24) * RAD;
      P.poot.n = { F: [vx + 14, -6], ta: 35 * RAD, modus: 'schors' }; P.poot.f = { F: [vx - 6, 4], ta: 70 * RAD, modus: 'schors' }; P.vl.n = { phi: -90 * RAD, f: 1 }; }
    else if (h === 'vliegen') { const fl = vlucht(d, fr(t)); P.tb = (-4 + fl.kantel) * RAD; P.heup = [vx - 4, -d.heupH - 6 + fl.dy]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = 0.06;
      P.ts = (d.tsStaan + 4 + fl.staart) * RAD; P.tsp = fl.spreid;
      const tuck = (dx, dy, ta) => ({ F: add(P.heup, rot([dx, dy], P.tb)), ta: P.tb + ta * RAD, modus: 'vlucht' });
      P.poot.n = tuck(6 * d.sx, 42 * d.sy, 25); P.poot.f = tuck(-2 * d.sx, 40 * d.sy, 35); P.pootAchter = true;
      P.vl = { vlieg: true, n: { phi: fl.phi, f: fl.f, sweep: fl.sweep }, f: { phi: fl.phi, f: fl.f, sweep: fl.sweep } }; P.vlFase = fl; }
    else if (h === 'hippen') { const g = hup(d, fr(t)); P.tb = (d.tbStaan + g.kantel) * RAD; P.heup = [vx + 2 + g.x, -d.heupH + g.dy]; const kr = kopRel(P.tb); P.kop = add(P.heup, kr); P.tk = g.kop;
      P.ts = (d.tsStaan + g.staart) * RAD; P.dx = 0;
      if (g.lucht) { const F = (dx) => ({ F: add(P.heup, [dx, d.heupH * g.been]), ta: g.ta * RAD, modus: 'vlucht' }); P.poot.n = F(8); P.poot.f = F(0); }
      else { const x = g.x0; P.poot.n = { F: voetGrond(sp, x + 6), ta: g.ta * RAD, modus: 'grond' }; P.poot.f = { F: voetGrond(sp, x - 4), ta: (g.ta - 6) * RAD, modus: 'grond' }; }
      P.vl.n = { phi: -90 * RAD + g.vleugel, f: 1 - g.vleugelOpen }; if (g.vleugelOpen > 0.02) { P.vl.vlieg = true; P.vl.f = { phi: P.vl.n.phi, f: P.vl.n.f }; }
      P.hup = g; }
    P.nekPts = nekPts(sp, P); return P; }

  // VLUCHT: flap-bound (golvende vlucht van vinken en mezen): 2 slagen, dan vleugels dicht (referentie vlucht-hup-zit fase 1 en 8).
  // Sleutels [t, phi (graden), vouw]. Neerslag: gespreid. Opslag: pols gebogen (vouw ± 0,55), hand naar achter.
  function vlucht(d, t) {
    const B = d.bound ?? 0.24, F = 1 - B; // fractie slagen
    let phi, f, sweep = 0;
    if (t < F) { const u = t / F * (d.slagen || 2); const k = Math.floor(u), w = u - k; const eerste = k === 0, laatste = k === (d.slagen || 2) - 1;
      // per slag: opslag (0-0,42) dan neerslag (0,42-1)
      if (w < 0.42) { const q = w / 0.42; phi = L(eerste ? -90 : -58, 80, ss(q)) * RAD; f = eerste ? L(1, 0.12, ss(q)) : 0.12 + 0.48 * Math.sin(Math.PI * q); sweep = -0.25 * Math.sin(Math.PI * q); }
      else { const q = (w - 0.42) / 0.58; phi = L(80, laatste ? -70 : -58, ss(q)) * RAD; f = laatste ? L(0.06, 0.25, ss((q - 0.6) / 0.4)) : L(0.12, 0, ss(q * 3)); sweep = 0.12 * Math.sin(Math.PI * q); }
    } else { const q = (t - F) / B; phi = L(-70, -90, ss(q * 3)) * RAD; f = L(0.25, 1, ss(q * 4)); }
    const golf = Math.sin(2 * Math.PI * (t - 0.1)); // stijgt tijdens slagen, zakt in de bound
    return { phi, f, sweep, dy: -4 * golf, kantel: -3 * golf, staart: 6 * Math.max(0, -Math.sin(phi)) - 4, spreid: t < F ? 0.25 : 0.05 }; }
  // HIPPEN: twee voeten tegelijk (zangvogels). 0-0,22 inzakken, 0,22-0,32 afzet, 0,32-0,7 sprong, 0,7-0,85 landen, -1 rechtop.
  function hup(d, t) { const H = d.hup || { l: 70, h: 26 };
    const x = H.l * ss((t - 0.24) / 0.5), x0 = t < 0.5 ? 0 : H.l;
    let dy, ta, kantel, kop = 0, lucht = false, been = 0.85;
    if (t < 0.22) { const q = ss(t / 0.22); dy = 10 * q; ta = L(d.taStaan, d.taStaan + 14, q); kantel = 8 * q; }
    else if (t < 0.32) { const q = ss((t - 0.22) / 0.1); dy = L(10, -6, q); ta = L(d.taStaan + 14, d.taStaan - 18, q); kantel = L(8, -6, q); }
    else if (t < 0.7) { const q = (t - 0.32) / 0.38; dy = -6 - H.h * Math.sin(Math.PI * q); ta = L(70, 95, q); kantel = L(-6, 4, q); lucht = true; been = L(0.92, 0.82, Math.sin(Math.PI * q)); }
    else if (t < 0.85) { const q = ss((t - 0.7) / 0.15); dy = L(-6, 9, q); ta = L(d.taStaan - 14, d.taStaan + 12, q); kantel = L(4, 6, q); }
    else { const q = ss((t - 0.85) / 0.15); dy = L(9, 0, q); ta = L(d.taStaan + 12, d.taStaan, q); kantel = L(6, 0, q); }
    const open = t > 0.3 && t < 0.72 ? Math.sin(Math.PI * (t - 0.3) / 0.42) * (H.open ?? 0) : 0;
    return { x, x0, dy, ta, kantel, kop, lucht, been, staart: -kantel * 1.6, vleugel: open * 30 * RAD, vleugelOpen: open }; }

  // ---------- soorten ----------
  // GRONDVINK (Geospiza fortis). Kopframe (26, -104), pik draait 0,6 rad, snavelpunt (22 + lS, 0,12·hS) met hS = 2,2·mm (sb2 e2s9/e2s11/e2s13).
  function grondvinkDef(o) { const man = o.kleed === 'man';
    const pal = man ? { basis: '#34322F', rug: '#2A2826', buik: '#3E3B38', keel: '#3A3734', streep: '#1C1B1D', snv: '#2A292C' }
                    : { basis: '#7A6858', rug: '#665446', buik: '#C2AE98', keel: '#B7A28A', streep: '#6A5646', snv: '#B9A88A' };
    const kop = { kl: man ? '#33312E' : '#776455', K: [[-24, 14], [-20, -10], [-8, -24], [8, -28], [22, -22], [28, -12], [30, 2], [24, 14], [8, 20], [-10, 22]],
      lagen: [{ p: [[-30, -40], [30, -40], [30, -15], [8, -14], [-30, -4]], c: man ? '#2A2826' : '#6A5747' }, { p: [[0, 8], [30, 5], [30, 30], [-14, 30]], c: man ? '#3C3936' : pal.keel },
        ...(man ? [] : [0, 1, 2, 3, 4, 5].map(i => ({ lijn: [[-12 + i * 6, -24 + (i % 2) * 3], [-14 + i * 6, -17 + (i % 2) * 3]], c: '#5A4838', w: 1.5 }))), man ? null : { lijn: [[2, 3], [18, 8]], c: '#9A8670', w: 1.6 }].filter(Boolean),
      na: (ctx, oo) => { const sn = oo.snavel ?? 9.3, hS = sn * 2.2, lS = hS * 1.2; const k = oo.snavelKleur || pal.snv; _kegelSnavel(ctx, 22, 0, hS, lS, k, oo.snavelKleur ? LT(oo.snavelKleur, 0.35) : LT(k, 0.3), 0.6);
        dierOog(ctx, 10, -6, 4.6, '#2A1A10', { rand: man ? '#4A4744' : '#E2D6C0' }); } };
    return { naam: 'grondvink', kopF: [26, -104], pikR: 0.6, sx: 0.9, sy: 0.86, rw: 1.1, pal, kop,
      tbStaan: -8, heupH: 62, tsStaan: 2, taStaan: 64, voetDx: [14, 2], tbTak: -30, heupTak: 52, tsTak: 18, taTak: 74,
      poot: { fem: 30, tib: 50, tars: 42, teen: 30, hal: 22, tw: 4.2, kl: man ? '#2E2A28' : '#4A4440', klauw: '#1E1A18', dij: [20, 11] },
      staart: { L: 84, wb: 14, wt: 15, n: 5, kl: man ? '#2A2826' : '#5E4E42', rand: man ? '#4E4B48' : '#9A8670' },
      vl: { sch: [48, -27], hum: 32, uln: 38, man: 28, P: [104, 112, 110, 104, 96, 88, 80, 74, 68], S: [64, 63, 62, 61, 60, 59, 58, 58, 57], T: [64, 60, 52],
        pal: man ? { veer: '#2E2C2C', zoom: '#5C5856', dek: '#363432', onder: '#4A4644', kleinDek: '#3C3A38' } : { veer: '#5A4A40', zoom: '#B09A82', dek: '#6E5C4E', onder: '#857464', kleinDek: '#7A6858', tert: '#5E4E42' } },
      rompLagen: () => [{ p: [[-70, -70], [130, -80], [80, -42], [40, -30], [0, -18], [-60, -6]], c: pal.rug }, { p: [[130, -60], [92, -40], [66, -16], [36, 4], [0, 12], [-30, 8], [-60, 0], [-70, 60], [130, 60]], c: pal.buik },
        man ? { fn: (ctx) => { ctx.fillStyle = '#E8E4DC'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-42 + i * 6, 6 + i * 3, 3, 2, 0.4, 0, 6.283); ctx.fill(); } } }
          : { fn: (ctx) => strepen(ctx, pal.streep, 10, 100, -30, 34, 40, 3.4, 2) }],
      hup: { l: 70, h: 24 } }; }
  function zaadkrakerDef(o) { const pal = { basis: '#2A282E', rug: '#232127', buik: '#2E2C33', keel: '#B8323A', rood: '#B8323A', roodL: '#D45A5E', snv: '#3E4A60' };
    const big = o.snavel === 'groot' ? 31 : o.snavel === 'midden' ? 26 : 21;
    const kop = { kl: pal.rood, K: [[-24, 16], [-20, -8], [-6, -26], [12, -30], [26, -22], [34, -8], [34, 8], [24, 18], [4, 22], [-12, 20]], lagen: [{ p: [[-30, -40], [40, -40], [40, -24], [0, -20], [-30, -12]], c: DK(pal.rood, 0.06) }],
      na: (ctx, oo) => { const sk = oo.snavelKleur || pal.snv; _kegelSnavel(ctx, 30, -2, big, big * 1.15, sk, oo.snavelKleur ? LT(oo.snavelKleur, 0.35) : '#8494B0', 0.7); dierOog(ctx, 13, -8, 4.4, '#2A1A10', { rand: '#5A6478' }); } };
    return { naam: 'zaadkraker', kopF: [30, -112], pikR: 0.6, sx: 1.06, sy: 1.04, rw: 1.1, pal, kop,
      tbStaan: -12, heupH: 62, tsStaan: 6, taStaan: 64, voetDx: [6, -8], tbTak: -34, heupTak: 54, tsTak: 16, taTak: 76,
      poot: { fem: 32, tib: 52, tars: 42, teen: 30, hal: 22, tw: 5, kl: '#6A5E58', klauw: '#2A2420', dij: [24, 14] }, dijKl: '#2A282E',
      staart: { L: 98, wb: 15, wt: 16, n: 5, kl: '#962830', rand: '#C84A50' },
      vl: { sch: [64, -40], hum: 34, uln: 40, man: 30, P: [108, 116, 114, 108, 100, 92, 84, 78, 72], S: [66, 65, 64, 63, 62, 61, 60, 60, 59], T: [66, 62, 54],
        pal: { veer: '#2A2830', zoom: '#55525E', dek: '#2E2C34', onder: '#3E3C46', kleinDek: '#34323A' } },
      rompLagen: (sx, sy) => [{ p: sc([[130, -60], [70, -54], [50, -20], [70, 10], [96, 30], [130, 30]], sx, sy), c: pal.rood }, { p: sc([[-30, -40], [-70, -40], [-70, 0], [-50, 0], [-40, -20]], sx, sy), c: pal.rood }] }; }
  function koolmeesDef(o) { const pal = { basis: '#7E9058', rug: '#6E8050', buik: '#E2C44A', keel: '#1C1D24', zwart: '#1C1D24', geelD: '#CDAE3C' };
    const kop = { kl: '#1C1D24', K: [[-22, 16], [-20, -8], [-8, -22], [8, -24], [20, -18], [26, -6], [26, 8], [16, 16], [-4, 20]],
      lagen: [{ p: [[-10, 4], [4, -4], [18, -2], [22, 8], [10, 14], [-6, 13]], c: '#F2F2EE' }, { p: [[-22, -8], [-16, -14], [-14, -4], [-20, 0]], c: '#E8EAD8' }],
      na: (ctx, oo) => { vul(ctx, [[24, -5], [36, -1], [44, 1], [36, 4], [24, 5]], '#24252C', '#4A4C56', 1); lijn(ctx, [[25, 1], [43, 1]], '#0E0F12', 1); dierOog(ctx, 14, -9, 3.6, '#1A1210'); if (oo.prooi) oo.prooi(ctx, 44, 0); } };
    return { naam: 'koolmees', kopF: [30, -104], pikR: 0.7, sx: 0.9, sy: 0.88, rw: 1.0, pal, kop, kopAan: [-8, 8],
      tbStaan: -14, heupH: 56, tsStaan: 4, taStaan: 64, voetDx: [6, -8], tbTak: -34, heupTak: 48, tsTak: 14, taTak: 76,
      poot: { fem: 28, tib: 48, tars: 40, teen: 28, hal: 22, tw: 4.6, kl: '#5E6A80', klauw: '#2A2E38', dij: [22, 13] }, dijKl: '#D8D4C4',
      staart: { L: 118, wb: 13, wt: 15, n: 5, kl: '#5E7090', rand: '#8EA2C0', wit: '#EEEEEA' },
      vl: { sch: [56, -36], hum: 32, uln: 38, man: 30, P: [110, 118, 116, 110, 102, 94, 86, 80, 74], S: [66, 65, 64, 63, 62, 61, 60, 60, 59], T: [64, 60, 52],
        pal: { veer: '#5E7090', zoom: '#C8D2E2', dek: '#6E829E', onder: '#AEB6C2', band: '#F2F2EE', kleinDek: '#788A72', tert: '#6A7C98' } },
      rompLagen: (sx, sy) => [{ p: sc([[-70, -70], [130, -80], [110, -30], [60, -28], [0, -18], [-60, -8]], sx, sy), c: pal.rug },
        { p: sc([[130, -24], [96, -4], [60, 8], [20, 14], [-20, 10], [-60, 0], [-70, 60], [130, 60]], sx, sy), c: pal.buik },
        { p: sc([[-30, 16], [-60, 2], [-70, 60], [-10, 60]], sx, sy), c: '#D8D4C4' },
        { p: sc([[110, -40], [104, -6], [92, 18], [70, 34], [44, 44], [40, 36], [62, 24], [80, 6], [90, -20], [94, -40]], sx, sy), c: pal.zwart }] }; }
  function merelDef(o) { const pal = { basis: '#2C2B31', rug: '#25242A', buik: '#34333A', keel: '#2F2E34' };
    const kop = { kl: '#2C2B31', K: [[-22, 16], [-20, -8], [-8, -20], [8, -22], [20, -16], [26, -6], [26, 8], [16, 16], [-4, 20]], lagen: [{ p: [[-30, -40], [30, -40], [30, -12], [-30, -4]], c: '#25242A' }],
      na: (ctx, oo) => { vul(ctx, [[20, -7], [36, -5], [55, -1], [57, 1], [38, 4], [20, 6]], '#E3A23A', '#F2C878', 1.2); vul(ctx, [[22, 1], [40, 2], [56, 1], [38, 5], [22, 6]], '#ECB656');
        lijn(ctx, [[21, 0], [55, 0]], '#9A6420', 1.3); circ(ctx, 28, -3, 1.4, '#9A6420'); dierOog(ctx, 12, -6, 4.2, '#1A1210', { rand: '#E8A83A' }); if (oo.prooi) oo.prooi(ctx, 54, 0); } };
    return { naam: 'merel', kopF: [36, -118], pikR: 0.8, sx: 0.74, sy: 0.7, rw: 1.0, pal, kop,
      tbStaan: -16, heupH: 66, tsStaan: 2, taStaan: 66, voetDx: [8, -8], tbTak: -30, heupTak: 46, tsTak: 22, taTak: 76,
      poot: { fem: 28, tib: 48, tars: 34, teen: 26, hal: 18, tw: 4.4, kl: '#3E3428', klauw: '#1E1A16', dij: [20, 12] }, dijKl: '#323137',
      staart: { L: 104, wb: 14, wt: 18, n: 5, kl: '#24232A', rand: '#4E4D56', rond: 1 },
      vl: { sch: [44, -26], hum: 26, uln: 30, man: 24, P: [92, 98, 97, 93, 87, 81, 75, 70, 66], S: [56, 55, 55, 54, 53, 53, 52, 52, 51], T: [56, 52, 46],
        pal: { veer: '#26252B', zoom: '#55545C', dek: '#2E2D33', onder: '#3E3D44', kleinDek: '#333238' } },
      rompLagen: (sx, sy) => [{ p: sc([[-70, -70], [130, -80], [110, -26], [0, -18], [-60, -8]], sx, sy), c: pal.rug }, { p: sc([[130, -10], [60, 14], [-60, 4], [-70, 60], [130, 60]], sx, sy), c: pal.buik },
        { fn: (ctx) => { ctx.strokeStyle = 'rgba(94,93,102,0.5)'; ctx.lineWidth = 1.2; for (let i = 0; i < 16; i++) { const px = 72 - (i % 6) * 11, py = -4 + Math.floor(i / 6) * 10 + (i % 2) * 3; ctx.beginPath(); ctx.arc(px, py, 3.4, 0.2, 2.6); ctx.stroke(); } } }],
      bound: 0.08, slagen: 3, hup: { l: 60, h: 20 } }; }

  const DEFS = { grondvink: grondvinkDef, zaadkraker: zaadkrakerDef, koolmees: koolmeesDef, merel: merelDef };
  const CACHE = {};
  function spec(naam, o = {}) { const key = naam + '|' + (o.kleed || '') + '|' + (o.snavel || ''); if (CACHE[key]) return CACHE[key];
    const d = DEFS[naam](o); const sp = maak(d);
    // voetmidden t.o.v. het anker uit de staan-houding (kop op het oude kopframe)
    d.voetX = 0; const P = pose(sp, 'staan', {}); d.voetX = (P.poot.n.F[0] + P.poot.f.F[0]) / 2; return (CACHE[key] = sp); }

  // oude aanroepen: houding automatisch uit de zitplek (_zitplek in dieren_overig.js) of o.houding
  function kies(ctx, x, y, s, o) { let h = o.houding, dy = 0, extra = {};
    if (h === 'tak') { dy = o.takY != null ? (o.takY - y) / s : 0; extra.takDik = o.takDik ?? 10; }
    else if (!h) { const z = o.rot ? { soort: 'schors' } : _zitplek(ctx, x, y, s, o);
      if (z.soort === 'tak') { h = 'tak'; dy = Math.min(0, z.top); extra.takDik = z.dik; } else if (z.soort === 'schors') h = 'klampen'; else h = (o.pik && o.pik >= 0.99 && false) ? 'pikken' : 'staan'; }
    if (h === 'staan' && o.pik) h = 'staan';
    return { h, dy, extra }; }
  function teken(naam, ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const sp = spec(naam, o); const k = kies(ctx, x, y, s, o);
    const oo = Object.assign({}, o, k.extra); const P = pose(sp, k.h, oo); const wx = o.wereld && k.h === 'hippen' ? (sp.def.hup || { l: 70 }).l * Math.floor(o.t || 0) : 0;
    return V.teken(ctx, sp, P, x + wx * s * (o.kijk || 1), y + k.dy * s, s, oo); }
  return { spec, pose, teken, vlucht, hup, DEFS };
})();

// ---- integratie: zelfde namen en aanroepvorm als dieren_overig.js ----
grondvink = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('grondvink', ctx, x, y, s, o); };
merel = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('merel', ctx, x, y, s, o); };
koolmees = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('koolmees', ctx, x, y, s, o); };
zaadkraker = function (ctx, x, y, s = 1, o = {}) { return VogelZang.teken('zaadkraker', ctx, x, y, s, o); };

// ===================================================================================
// GROTE VOGELS (blauwe reiger, pauw, pauwin) en boerenzwaluw: eigen pop per soort, zelfde motor (VogelPop).
// Houdingen = tabellen (romphoek, heuphoogte, nek als S-lijn van controlepunten vanaf de nekbasis, voeten); lopen = tweebenig gangmodel
// (steunvoet staat stil, duty factor 0,6–0,65, poten in tegenfase, kop 'houdt en stoot' zoals bij hoenders en reigers).
// ===================================================================================
const VogelGroot = (() => {
  const V = VogelPop, { RAD, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, kurve, hermite, DK, LT, VER, crs, buis, tf } = V;

  // tweebenig gangmodel: G = { S, beta, lift, taS, taZ, bob, kopbob }, x0 = neutrale voet-x per poot (t.o.v. de heup)
  function gang(G, t, x0, tw) { const v = {}; const half = G.S * G.beta / 2;
    for (const z of ['n', 'f']) { const p = fr(t - (z === 'n' ? 0 : 0.5)), steun = p < G.beta; let x, y = 0, ta, modus, u;
      if (steun) { u = p / G.beta; x = x0[z] + half * (1 - 2 * u); ta = kurve(G.taS, u); modus = 'grond'; }
      else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; x = hermite(x0[z] - half, x0[z] + half, m, m, u); y = -G.lift * Math.pow(Math.sin(Math.PI * u), 1.2); ta = kurve(G.taZ, u); modus = u > 0.82 ? 'grond' : 'zwaai'; }
      v[z] = { F: [x, -tw * 0.55 + y], ta: ta * RAD, modus, steun, u }; }
    const h = fr(2 * t); const kop = G.kopbob * G.S / 2 * ((h < 0.6 ? -h : -0.6 + 0.6 * ss((h - 0.6) / 0.4)) + 0.3);
    return { v, bob: -G.bob * Math.cos(4 * Math.PI * (t - G.beta / 2)), kop }; }

  // nek: [binnen de romp, basis, controlepunten (wereld, t.o.v. de basis), kop-aanhechting]
  function nekLijn(sp, P, ctrl, kopVerschuif = 0) { const Tb = tf(P.heup, P.tb), b = Tb(sp.nekAan); const n = ctrl.length;
    const pts = ctrl.map((c, i) => add(b, add(c, [kopVerschuif * Math.pow((i + 1) / n, 1.5), 0])));
    P.kop = pts[n - 1]; const Tk = tf(P.kop, P.tk);
    P.nekPts = [Tb(sp.nekIn), b, ...pts.slice(0, n - 1), Tk(sp.kopAan), Tk(add(sp.kopAan, [6, 0]))]; }

  function pose(sp, h, o = {}) { const H = sp.H[h] || sp.H.staan, P = { poot: {}, vl: {} }; const t = o.t || 0;
    P.tb = H.tb * RAD; P.ts = (H.ts || 0) * RAD; P.tk = H.tk || 0; P.heup = [H.hx || 0, -H.heupH];
    let kv = 0;
    if (H.gang) { const g = gang(H.gang, fr(t), { n: H.voet[0][0], f: H.voet[1][0] }, sp.poot.tw); P.heup[1] += g.bob; kv = g.kop; P.tb += 1.2 * RAD * Math.sin(4 * Math.PI * t);
      for (const z of ['n', 'f']) { const v = g.v[z]; P.poot[z] = { F: [P.heup[0] + v.F[0], v.F[1]], ta: v.ta, modus: v.modus, steun: v.steun }; }
      P.dx = o.wereld ? H.gang.S * fr(t) : 0; P.gangS = H.gang.S; }
    else if (H.vlieg) { const fl = (sp.vlucht || vluchtStaal)(fr(t)); P.heup = [0, fl.dy]; P.tb += fl.kantel * RAD;
      P.vl = { vlieg: true, n: { phi: fl.phi, f: fl.f, sweep: fl.sweep || 0 }, f: { phi: fl.phi, f: fl.f, sweep: fl.sweep || 0 } }; P.pootAchter = !!H.pootAchter;
      const Tb = tf(P.heup, P.tb); for (const [z, i] of [['n', 0], ['f', 1]]) { const [dx, dy, ta] = H.voet[i]; P.poot[z] = { F: Tb([dx, dy]), ta: P.tb + ta * RAD, modus: H.tenen || 'vlucht' }; } }
    else { for (const [z, i] of [['n', 0], ['f', 1]]) { const [dx, ta] = H.voet[i]; P.poot[z] = { F: [P.heup[0] + dx, -sp.poot.tw * 0.55], ta: ta * RAD, modus: 'grond' }; }
      if (o.t && sp.adem) { P.tk += 0.03 * Math.sin(2 * Math.PI * t); } }
    if (!H.vlieg) P.vl.n = { phi: -90 * RAD, f: 1 };
    nekLijn(sp, P, H.nek, kv); P.h = h; return P; }

  // slagcyclus voor grote vogels: diep en traag, geen bound (reiger); sleutels [t, phi, vouw]
  function vluchtStaal(t) { let phi, f, sweep = 0;
    if (t < 0.45) { const q = t / 0.45; phi = L(70, -55, ss(q)) * RAD; f = 0.04; sweep = 0.1 * Math.sin(Math.PI * q); }
    else { const q = (t - 0.45) / 0.55; phi = L(-55, 70, ss(q)) * RAD; f = 0.04 + 0.4 * Math.sin(Math.PI * q); sweep = -0.3 * Math.sin(Math.PI * q); }
    const g = Math.sin(2 * Math.PI * (t - 0.2)); return { phi, f, sweep, dy: -6 * g, kantel: -1.5 * g }; }

  // ---------- BLAUWE REIGER (Ardea cinerea) ----------
  // 84–102 cm, tot 1 m hoog, spanwijdte 155–195 cm; tarsus ± 15 cm, snavel ± 12 cm, vleugel ± 45 cm. Eenheid ± 0,225 cm (hoogte ± 430 als bij de oude vogel()).
  function reiger() { const pal = { basis: '#9AA2AD', rug: '#8A929E', buik: '#D6DADF', grijs: '#9AA2AD', zw: '#1E2026', wit: '#EDEEF0' };
    const romp = crs([[-82, -18], [-58, -36], [-16, -44], [32, -46], [70, -40], [96, -24], [106, -2], [98, 20], [72, 34], [30, 40], [-12, 36], [-52, 22], [-78, 4]], 2);
    return { naam: 'reiger', rw: 1.6, pal, romp,
      rompLagen: [{ p: [[130, -48], [92, -20], [60, 6], [20, 22], [-30, 26], [-90, 20], [-90, 90], [130, 90]], c: pal.buik }, { p: [[-60, 14], [10, 22], [60, 10], [60, 22], [10, 34], [-60, 30]], c: pal.zw }],
      rompNa: (P, Tb) => [{ r: false, na: (ctx) => { ctx.strokeStyle = pal.wit; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = Tb([96 - i * 4, -8 + i * 3]), b = Tb([80 - i * 6, 28 + i * 2]); ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(a[0] - 2, (a[1] + b[1]) / 2 + 8, b[0], b[1] + 14); ctx.stroke(); } } }],
      heupL: [0, 0], dijKl: '#B9BFC7', nekAan: [92, -26], nekIn: [70, -20], kopAan: [-10, 4],
      poot: { fem: 52, tib: 100, tars: 70, teen: 46, hal: 30, tw: 7.4, kl: '#B49A5C', klauw: '#2A2620', dij: [26, 14], kaal: 0.42 },
      staart: { aan: [-74, -10], L: 62, wb: 14, wt: 20, n: 4, kl: '#7E8692', rand: '#B8BEC6', lw: 1.4 },
      vl: { sch: [64, -28], hum: 74, uln: 86, man: 52, P: [150, 160, 158, 152, 144, 136, 128, 122, 116, 112], S: Array.from({ length: 11 }, (_, i) => 120 - i * 1.5), T: [116, 108, 98],
        pw0: 2, pw1: 46, pb: 0.17, sb: 0.26, punt: 0, lw: 1.4,
        pal: { veer: '#7E8692', zoom: '#B7BDC6', dek: '#A3AAB4', onder: '#8D949F', kleinDek: '#C8CDD4', hand: '#2C2E34', arm: '#6E7682', tert: '#8E96A2',
          dekPatroon: (ctx, g, pr, ver) => { ctx.fillStyle = ver ? VER('#1E2026') : '#1E2026'; V.pad(ctx, crs([g.Wr, LP(g.Wr, g.E, 0.25), add(LP(g.Wr, g.E, 0.25), mul(g.dS, 22)), add(g.Wr, mul(g.dS, 26))].map(pr), 1)); ctx.fill(); } } },
      kop: { kl: pal.wit, K: [[-17, -4], [-5, -12], [9, -10], [17, 0], [11, 10], [-5, 12], [-17, 8]],
        lagen: [{ p: [[-3, -7], [11, -5], [3, 1], [-19, 4], [-30, 6], [-30, -2], [-20, -4]], c: pal.zw }],
        na: (ctx) => { lijn(ctx, [[-14, -2], [-38, 4], [-62, 12]], pal.zw, 2.2); lijn(ctx, [[-14, 0], [-34, 8], [-52, 18]], pal.zw, 1.6);
          vul(ctx, [[12, -4], [42, 1], [66, 7], [42, 9], [12, 8]], '#C8A44A', '#E2C47A', 1.2); lijn(ctx, [[13, 2], [62, 7]], '#8A6A2A', 1.2); dierOog(ctx, 5, -1, 3.2, '#D8B43A'); } },
      nek: { kl: pal.wit, voor: pal.wit, achter: '#DCDFE3', w: [34, 24, 20, 18],
        patroon: (ctx, nb) => { ctx.fillStyle = pal.zw; const B = nb.onder, n = B.length; for (let i = 0; i < 12; i++) { const q = B[Math.floor(n * (0.25 + i * 0.05))]; if (!q) continue; ctx.beginPath(); ctx.ellipse(q[0], q[1], 1.8, 3.6, 0.3, 0, 6.283); ctx.fill(); } } },
      H: { staan: { tb: -44, heupH: 196, nek: [[10, -34], [-2, -84], [12, -130], [36, -150]], tk: 0.04, ts: 30, voet: [[12, 86], [-4, 82]] },
           rust: { tb: -32, heupH: 190, nek: [[18, -16], [2, -42], [16, -66], [40, -72]], tk: 0.08, ts: 22, voet: [[10, 86], [-4, 82]] },
           lopen: { tb: -16, heupH: 192, nek: [[30, -28], [66, -56], [104, -68], [132, -68]], tk: 0.14, ts: 10, voet: [[16, 0], [16, 0]],
             gang: { S: 120, beta: 0.64, lift: 34, taS: [[0, 62], [0.5, 84], [1, 108]], taZ: [[0, 112], [0.4, 128], [0.75, 70], [1, 62]], bob: 3, kopbob: 0.55 } },
           vliegen: { tb: -2, vlieg: 1, nek: [[16, 10], [34, 20], [52, 12], [62, -6]], tk: 0.02, ts: 4, voet: [[-260, 6, 178], [-252, 12, 176]], pootAchter: false, tenen: 'zwaai' } } }; }

  // ---------- PAUW (Pavo cristatus, man) ----------
  // Snavel–staart 100–120 cm, met sleep 200–230 cm; sleep = verlengde bovenstaartdekveren; pronk: waaier opgezet en trillend, vleugels half open en hangend.
  // Eenheid ± 0,37 cm (kop ± 300 boven de grond, als de oude pauw()).
  const pauwKop = (pal, kuif) => ({ kl: pal.kop, K: [[-11, 6], [-9, -6], [2, -11], [12, -8], [16, -1], [12, 6], [0, 9]],
    lagen: [{ p: [[-4, -6], [6, -7], [12, -4], [2, -4]], c: pal.gezicht }, { p: [[-2, 2], [6, 4], [12, 2], [6, 1]], c: pal.gezicht }],
    na: (ctx) => { for (let i = 0; i < 9; i++) { const bx = -4 + i * 1.2, by = -9 - i * 0.2, an = -1.95 + i * 0.09, l = kuif * (1 + (i % 3) * 0.08); const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l;
        lijn(ctx, [[bx, by], [tx, ty]], pal.kuifS, 1.1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-4, -3, 0, -6); ctx.quadraticCurveTo(4, -3, 0, 2); ctx.fillStyle = i % 2 ? pal.kuif1 : pal.kuif2; ctx.fill(); ctx.restore(); }
      vul(ctx, [[13, -4], [22, -2], [26, 1], [21, 3], [13, 3]], '#B0A288', '#D0C4A8', 1); dierOog(ctx, 4, -2, 2.6, '#2A1A10'); } });
  const PAUWROMP = crs([[-92, -8], [-64, -34], [-14, -48], [36, -46], [62, -30], [72, -6], [64, 18], [34, 38], [-16, 44], [-58, 34], [-86, 14]], 2);
  function pauwBasis(man) {
    const pal = man ? { basis: '#2C5EA6', rug: '#3E7A4E', buik: '#1E2E3A', kop: '#2C5EA6', gezicht: '#EEEEE6', kuifS: '#3A4A6A', kuif1: '#3E8AA0', kuif2: '#4C86CC' }
                    : { basis: '#8A7660', rug: '#7A6650', buik: '#E8E2D4', kop: '#8A6A4A', gezicht: '#E8E2D4', kuifS: '#5A4A38', kuif1: '#7A6A48', kuif2: '#6A8A6A' };
    const kop = pauwKop(pal, man ? 26 : 20); if (!man) kop.lagen.push({ lijn: [[-6, -2], [10, -3]], c: '#4A3A2A', w: 2.2 });
    return { naam: man ? 'pauw' : 'pauwin', rw: 1.5, pal, romp: PAUWROMP,
      rompLagen: man ? [{ p: [[80, 10], [30, 22], [-30, 22], [-100, 10], [-100, 80], [80, 80]], c: pal.buik },
          { p: [[60, -60], [-100, -60], [-100, -6], [-40, -16], [30, -30]], c: pal.rug }, { fn: (ctx) => { ctx.strokeStyle = '#1E3A2A'; ctx.lineWidth = 1.4; for (let r = 0; r < 4; r++) for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(40 - i * 13 - r * 6, -42 + r * 8, 5, 0.2, 2.9); ctx.stroke(); } } }]
        : [{ p: [[80, 14], [40, 26], [-20, 30], [-100, 22], [-100, 80], [80, 80]], c: pal.buik }, { fn: (ctx) => { ctx.fillStyle = 'rgba(230,220,200,0.7)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(40 - (i % 8) * 12 - Math.floor(i / 8) * 5, -38 + Math.floor(i / 8) * 8, 1.8, 0, 6.283); ctx.fill(); } } }],
      heupL: [-6, 4], dijKl: man ? '#22323E' : '#D8D0C0', nekAan: [52, -36], nekIn: [34, -26], kopAan: [-8, 4],
      poot: { fem: 50, tib: 70, tars: 48, teen: 34, hal: 22, tw: 8.4, kl: '#8A7C6C', klauw: '#4A4038', dij: [28, 16], kaal: 0.3, spoor: man },
      staart: man ? { aan: [-84, -18], L: 70, wb: 26, wt: 30, n: 4, kl: '#6A4E34', rand: '#8A6E50', lw: 1.3 } : { aan: [-84, -18], L: 92, wb: 28, wt: 32, n: 5, kl: '#5E4E3E', rand: '#8A7A66', rond: 1, lw: 1.3 },
      vl: { sch: [40, -34], hum: 50, uln: 58, man: 36, P: [104, 110, 108, 104, 98, 92, 86, 80, 76, 72], S: Array.from({ length: 10 }, (_, i) => 84 - i), T: [86, 80, 74], pw0: 4, pw1: 50, pb: 0.15, sb: 0.26, punt: 0, lw: 1.3,
        pal: man ? { veer: '#1E1A18', zoom: '#4A4038', dek: '#C4B490', onder: '#6A5A4A', kleinDek: '#BBA984', hand: '#9A5A2E', arm: '#1E1A18', tert: '#C4B490',
          dekPatroon: (ctx, g, pr, ver) => { ctx.strokeStyle = ver ? VER('#2E261C') : '#2E261C'; ctx.lineWidth = 2.4; for (let i = 0; i < 12; i++) { const a = LP(g.S, g.Wr, i / 11); const b = add(a, mul(g.dS, 50)); ctx.beginPath(); ctx.moveTo(...pr(a)); ctx.lineTo(...pr(b)); ctx.stroke(); } } }
          : { veer: '#6A5846', zoom: '#B4A48C', dek: '#8A7660', onder: '#9A8A76', kleinDek: '#9A866E', hand: '#5A4A3A', arm: '#6A5846', tert: '#7A6650' } },
      kop, nek: man ? { kl: pal.basis, voor: '#2A58A0', achter: '#3466B0', w: [46, 30, 23, 19], patroon: (ctx, nb) => { ctx.fillStyle = 'rgba(30,68,126,0.55)'; const M = nb.mid; for (let i = 0; i < M.length; i += 7) { ctx.beginPath(); ctx.arc(M[i][0] + (i % 2 ? 3 : -3), M[i][1], 2.2, 0, Math.PI); ctx.fill(); } } }
        : { kl: '#4E8A62', voor: '#4E8A62', achter: '#468058', w: [44, 28, 22, 18], patroon: (ctx, nb) => { ctx.fillStyle = 'rgba(46,90,62,0.6)'; const M = nb.mid; for (let i = 0; i < M.length; i += 7) { ctx.beginPath(); ctx.arc(M[i][0] + (i % 2 ? 3 : -3), M[i][1], 2, 0, Math.PI); ctx.fill(); } } },
      H: { staan: { tb: -16, heupH: 122, nek: [[10, -30], [2, -64], [12, -96], [26, -110]], tk: 0.06, ts: man ? -6 : 14, voet: [[12, 84], [-2, 80]] },
           lopen: { tb: -14, heupH: 120, nek: [[14, -28], [10, -62], [22, -92], [36, -104]], tk: 0.1, ts: man ? -6 : 14, voet: [[10, 0], [10, 0]],
             gang: { S: 76, beta: 0.62, lift: 20, taS: [[0, 64], [0.5, 84], [1, 106]], taZ: [[0, 110], [0.4, 120], [0.75, 70], [1, 64]], bob: 2.4, kopbob: 1 } } },
      achter: man ? sleep : null, adem: true }; }
  // SLEEP in rust: bundel van de stuit schuin naar achter-omlaag, laatste stuk op de grond; schachten en oogvlekken langs de lengte
  function sleep(P, Tb, o) { const Lt = 300 * (o.staartLengte ?? 1), r = Tb([-80, -30]); const zw = P.gangS ? Math.sin(2 * Math.PI * (o.t || 0) * 2) : 0;
    const C = [r, [r[0] - Lt * 0.3, r[1] + (0 - r[1]) * 0.42 + zw * 3], [r[0] - Lt * 0.66, -16 + zw * 2], [r[0] - Lt, -5]];
    const b = buis(C, [26, 48, 46, 30], [26, 48, 46, 30], 2); const grond = (p) => [p[0], Math.min(p[1], -0.5)];
    const pts = b.pts.map(grond), M = b.mid;
    return [{ b: pts, c: '#2E5A40', rk: '#B8A050', l: [{ fn: (ctx) => { ctx.strokeStyle = 'rgba(192,168,72,0.4)'; ctx.lineWidth = 1.3; for (let k = -3; k <= 3; k++) { ctx.beginPath(); M.forEach((q, i) => { const d = M[Math.min(M.length - 1, i + 1)], e = M[Math.max(0, i - 1)]; const a = Math.atan2(d[1] - e[1], d[0] - e[0]) + Math.PI / 2; const w = k * 6 * (0.6 + 0.6 * Math.sin(Math.PI * i / M.length)); const p = [q[0] + Math.cos(a) * w, q[1] + Math.sin(a) * w]; i ? ctx.lineTo(...p) : ctx.moveTo(...p); }); ctx.stroke(); }
          const vl = o.vlekken ?? 1; for (let i = 0; i < 22; i++) { if (hash(i * 7.3) > vl) continue; const u = 0.16 + i * 0.038, j = Math.min(M.length - 1, Math.floor(u * M.length)); const q = M[j], d = M[Math.min(M.length - 1, j + 2)], e = M[Math.max(0, j - 2)]; const a = Math.atan2(d[1] - e[1], d[0] - e[0]);
            const off = ((i % 3) - 1) * 12 * (0.5 + u); _oogvlek(ctx, q[0] + Math.cos(a + 1.57) * off, Math.min(q[1] + Math.sin(a + 1.57) * off, -3), 4 + u * 7, a + Math.PI); } } }] }]; }
  // PRONK: vooraanzicht met waaier als bijna volle schijf (± 1,8 m breed), vleugels hangend; kop in profiel. o.t laat de veren trillen.
  function pronk(ctx, x, y, s, o) { const t = o.t || 0, w = o.waaier ?? 1, Rw = 246 * (o.staartLengte ?? 1) * L(0.45, 1, ss((w - 0.5) / 0.5)), vl = o.vlekken ?? 1; const tr = Math.sin(2 * Math.PI * t * 6);
    const pal = { blauw: '#2C5EA6', blauwL: '#4C86CC', groen: '#2E5A40', brons: '#B8A050' }; const cx = -4, cy = -262; const D = [];
    const a0 = (90 + 30) * RAD, a1 = (90 - 30 + 360) * RAD; const F = []; for (let i = 0; i <= 90; i++) { const a = L(a0, a1, i / 90); const r = Rw * (1 + 0.012 * Math.sin(i * 2.2)); F.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } F.push([cx, cy + 40]);
    D.push({ b: F, c: pal.groen, rk: pal.brons, l: [{ fn: (ctx) => { ctx.strokeStyle = 'rgba(184,160,74,0.45)'; ctx.lineWidth = 1.3; for (let i = 0; i <= 110; i++) { const a = L(a0, a1, i / 110) + 0.004 * tr; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); ctx.lineTo(cx + Math.cos(a) * Rw, cy + Math.sin(a) * Rw); ctx.stroke(); }
        for (const [rr, n] of [[0.93, 50], [0.79, 42], [0.65, 34], [0.51, 26], [0.37, 18]]) for (let i = 0; i < n; i++) { if (hash(i * 13 + rr * 100) > vl) continue; const a = L(a0, a1, (i + 0.5 + 0.5 * (rr * 10 % 2)) / (n + 1)) + 0.01 * tr * (1 - rr); _oogvlek(ctx, cx + Math.cos(a) * Rw * rr, cy + Math.sin(a) * Rw * rr, (6 + 9 * rr) * (Rw / 262), a + Math.PI); } } }] });
    // hangende vleugels: kastanjebruine handpennen opzij van het lijf
    for (const k of [-1, 1]) { const b = [k * 30, -160], d = 0.05 * tr; const pen = []; for (let i = 0; i < 6; i++) { const a = (90 - k * (16 + i * 7)) * RAD + d * k; pen.push({ b: V.veer(add(b, [k * i * 2, i * 4]), a, 86 - i * 4, 10, 0), c: '#9A5A2E', o: ['#C07A48', 1.2] }); } D.push(...pen.reverse()); }
    // poten (vooraanzicht): bevederde dij, grijsbruine tarsus, tenen gespreid
    for (const k of [-1, 1]) { const x0 = k * 13; D.push({ b: buis([[x0, -104], [x0 + k, -66]], [22, 14]).pts, c: '#22323E' }); D.push({ b: buis([[x0 + k, -70], [x0 + k * 2, -46], [x0 + k * 3, -6]], [10, 8.4, 8]).pts, c: '#8A7C6C' });
      for (const da of [-0.5, 0, 0.5]) { const a = Math.PI / 2 + k * 0.9 + da * 0.6; D.push({ b: buis([[x0 + k * 3, -6], [x0 + k * 3 + Math.cos(a) * 14 * k * 0 + (da * 22) + k * 6, -2]], [7, 5]).pts, c: '#7E7060' }); } }
    // lijf (vooraanzicht): blauwe borst, donkere onderbuik
    const B = crs([[0, -206], [24, -196], [38, -166], [40, -134], [30, -106], [12, -94], [-12, -94], [-30, -106], [-40, -134], [-38, -166], [-24, -196]], 2);
    D.push({ b: B, c: pal.blauw, l: [{ p: [[-50, -126], [50, -126], [50, -80], [-50, -80]], c: '#1E2E3A' }, { fn: (ctx) => { ctx.fillStyle = 'rgba(30,68,126,0.5)'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(-26 + (i % 6) * 10 + (Math.floor(i / 6) % 2) * 5, -190 + Math.floor(i / 6) * 13, 2.3, 0, Math.PI); ctx.fill(); } } }] });
    // hals en kop (kop draait naar de kijkrichting, licht knikkend)
    const kopP = [6, -276], tk = 0.05 * Math.sin(2 * Math.PI * t * 1.5); const nb = buis([[0, -190], [2, -226], [3, -252], [5, -268]], [34, 24, 18, 15]); D.push({ b: nb.pts, c: pal.blauw });
    const KP = pauwKop({ kop: pal.blauw, gezicht: '#EEEEE6', kuifS: '#3A4A6A', kuif1: '#3E8AA0', kuif2: pal.blauwL }, 26); const Tk = tf(kopP, tk);
    D.push({ b: crs(KP.K, 1).map(Tk), c: KP.kl, l: KP.lagen.map(l => ({ p: l.p.map(Tk), c: l.c })), na: (c) => { c.save(); c.translate(...kopP); c.rotate(tk); KP.na(c); c.restore(); } });
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); V.render(ctx, D, 1.5); ctx.restore(); }

  // ---------- BOERENZWALUW (Hirundo rustica) ----------
  // 17–19 cm incl. staartspiesen, vleugel 12–13 cm (BTO: 125,6 mm), spanwijdte 32–34 cm. Eenheid 1 cm; anker = midden van het lijf.
  function zwaluwSpec() { const pal = { basis: '#2E3E62', rug: '#2A3858', buik: '#E8DCC8', keel: '#B4503A' };
    return { naam: 'zwaluw', rw: 0.07, pal, romp: crs([[-4.6, -0.5], [-2.4, -1.25], [1, -1.45], [3.4, -1.2], [4.6, -0.4], [4.5, 0.6], [3.2, 1.25], [0.4, 1.45], [-2.6, 1.05], [-4.7, 0.35]], 0.2),
      rompLagen: [{ p: [[6, 0.1], [2, 0.4], [-2, 0.4], [-6, 0.2], [-6, 3], [6, 3]], c: pal.buik }, { p: [[6, -0.2], [3.4, -0.1], [3.2, 1.3], [6, 1.4]], c: pal.keel }],
      heupL: [0, 0.6], nekAan: [3.6, -0.5], nekIn: [2.4, -0.3], kopAan: [-0.6, 0.2],
      poot: { fem: 0.6, tib: 0.9, tars: 1.0, teen: 0.8, hal: 0.6, tw: 0.16, kl: '#3A2E2A', klauw: '#1A1414', dij: [0.6, 0.4] },
      staart: { aan: [-4.4, -0.1], L: 4.2, wb: 0.6, wt: 0.7, n: 5, kl: '#26344F', rand: '#4A5C80', vork: 1.25, lw: 0.07 },
      vl: { sch: [2.0, -0.9], hum: 1.5, uln: 1.9, man: 2.1, P: [9.4, 9.6, 8.8, 7.8, 6.8, 5.8, 4.9, 4.1, 3.5], S: Array.from({ length: 9 }, (_, i) => 3.2 - i * 0.05), T: [3.1, 2.8, 2.4], pw0: -6, pw1: 34, pb: 0.11, sb: 0.24, lw: 0.07,
        pal: { veer: '#2A3656', zoom: '#4E6088', dek: '#34466E', onder: '#8C8A8A', kleinDek: '#3A4C76' } },
      kop: { kl: pal.basis, K: [[-0.9, 0.7], [-0.9, -0.5], [-0.2, -1.0], [0.7, -0.9], [1.2, -0.3], [1.1, 0.5], [0.3, 0.9]], lagen: [{ p: [[0.5, -0.3], [1.4, -0.4], [1.4, 1.2], [0.1, 1.2]], c: pal.keel }],
        na: (ctx) => { vul(ctx, [[1.1, -0.2], [1.8, 0.05], [1.1, 0.3]], '#1A1A1E', null, 0); ctx.save(); ctx.translate(0.35, -0.3); ctx.scale(0.05, 0.05); dierOog(ctx, 0, 0, 5, '#0A0A0A'); ctx.restore(); } },
      nek: { kl: pal.basis, voor: pal.keel, achter: pal.basis, w: [2.0, 1.7] },
      H: { vliegen: { tb: 0, vlieg: 1, nek: [[0.5, -0.1], [1.0, -0.15]], tk: 0.05, ts: 0, voet: [[0.2, 1.2, 160], [0, 1.2, 160]], pootAchter: true } },
      vlucht: (t) => { // zwaluw: snelle slagen afgewisseld met glijden (vleugels half gebogen: sikkel)
        if (t < 0.6) { const u = t / 0.6 * 2, w = u - Math.floor(u); let phi, f; if (w < 0.45) { const q = w / 0.45; phi = L(-50, 60, ss(q)) * RAD; f = 0.15 + 0.4 * Math.sin(Math.PI * q); } else { const q = (w - 0.45) / 0.55; phi = L(60, -50, ss(q)) * RAD; f = 0.12; } return { phi, f, sweep: -0.15, dy: 0, kantel: 0 }; }
        const q = (t - 0.6) / 0.4; const phi = L(-50, 6, ss(q * 3)) * RAD * (q < 0.85 ? 1 : 1 - (q - 0.85) / 0.15 * 0) ; return { phi: q > 0.85 ? L(6, -50, ss((q - 0.85) / 0.15)) * RAD : phi, f: 0.3, sweep: -0.35, dy: 0, kantel: 0 }; } }; }

  const SP = {}; const spec = (n) => SP[n] || (SP[n] = n === 'reiger' ? reiger() : n === 'pauw' ? pauwBasis(true) : n === 'pauwin' ? pauwBasis(false) : zwaluwSpec());
  function teken(n, ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const sp = spec(n); const P = pose(sp, o.houding, o); return V.teken(ctx, sp, P, x, y, s, o); }
  return { spec, pose, teken, gang, pronk, vluchtStaal };
})();

// ---- integratie ----
const _vpZwaluwOud = typeof zwaluw === 'function' ? zwaluw : null, _vpVogelOud = typeof vogel === 'function' ? vogel : null;
pauw = function (ctx, x, y, s = 1, o = {}) { if ((o.a ?? 1) <= 0.01) return; const h = o.houding || ((o.waaier ?? 0) >= 0.5 ? 'pronk' : 'staan');
  if (h === 'pronk') return VogelGroot.pronk(ctx, x, y, s, o); return VogelGroot.teken('pauw', ctx, x, y, s, Object.assign({}, o, { houding: h === 'rust' ? 'staan' : h })); };
pauwin = function (ctx, x, y, s = 1, o = {}) { return VogelGroot.teken('pauwin', ctx, x, y, s, Object.assign({}, o, { houding: o.houding === 'lopen' ? 'lopen' : 'staan' })); };
// vogel() = blauwe reiger: 'staan' (standaard, hals gestrekt), 'rust' (S-hals ingetrokken), 'lopen' (sluipend), 'vliegen' (anker = midden van het lijf)
vogel = function (ctx, x, y, s = 1, o = {}) { if (typeof o !== 'object' || o === null) o = {}; return VogelGroot.teken('reiger', ctx, x, y, s, Object.assign({}, o, { houding: o.houding || 'staan' })); };
// zwaluw: vlucht van opzij (pop, o.t = slagcyclus); o.boven = de oude tekening van bovenaf
zwaluw = function (ctx, x, y, s, o = {}) { if (o.boven && _vpZwaluwOud) return _vpZwaluwOud(ctx, x, y, s, o); return VogelGroot.teken('zwaluw', ctx, x, y, s, Object.assign({}, o, { houding: 'vliegen' })); };

