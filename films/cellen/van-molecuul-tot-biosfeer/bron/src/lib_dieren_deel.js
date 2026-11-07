// Uittreksel uit bibliotheek/dieren/lib_dieren.js (Van molecuul tot biosfeer 2.0): base, dier_basis, dieren_overig, pop_vogels (koolmees, merel). Gemaakt met bouw/dier_deel.py.
// ===== base.js =====
// Evolutie v2 — kleine tekenhulpen (overgenomen uit Bestaat dit echt?, 22 okt 2026)
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _mix(hex, k, met) { const a = parseInt(hex.slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2 + Math.cos(an) * 2, y2 + Math.sin(an) * 2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.moveTo(x2 + Math.cos(an) * 2, y2 + Math.sin(an) * 2); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }

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
// ===================================================================================
// VOGELVOET (patch voor VogelPop), alleen voor soorten met poot.vork = true (hier: de zaadkraker).
// Recept: zangvogels zijn anisodactyl: drie tenen naar voren, één (hallux) naar achteren. Op de grond van opzij gezien
// waaieren de voortenen licht uit (vork), met teengewrichten als kleine knobbels en een klauwtje per teen; niet als één
// plat balkje. Werkt door VogelPop.teken te vervangen (de oude tenen() zit in een closure). Soorten zonder poot.vork
// (grondvink, merel, koolmees, pauw, pauwin, reiger: door Kamiel op 28 okt als 'gelijk' gehouden) tekenen hun voet precies
// als voorheen. Plak dit blok na lib_dieren.js.
// ===================================================================================
(function () {
  const V = VogelPop, { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, DK, LT, VER, RIM, crs, cro, buis, tf, render, vleugelDelen, staartDelen } = V;
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
    else if (!P.vork) { const y = F[1] + tw * 0.15; // grond (zonder vork, ongewijzigd): plat, middenteen naar voren, buitenteen iets korter, achterteen
      uit.push({ p: [[F[0], y], [F[0] + T * 0.5, y + tw * 0.1], [F[0] + T * 0.8, y + tw * 0.15]], w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 });
      uit.push({ p: [[F[0], y], [F[0] + T * 0.55, y + tw * 0.15], [F[0] + T, y + tw * 0.2]], w: [tw * 0.85, tw * 0.62], klauw: 1 });
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.15], [F[0] - H, y + tw * 0.2]], w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else { const y = F[1] + tw * 0.15; // grond: drietand. Van opzij: middenteen recht naar voren, buitenteen schuin naar de kijker
      // (iets omlaag en korter door perspectief), binnenteen schuin weg (iets omhoog, donker), achterteen (hallux) naar achteren;
      // teengewrichten als kleine knobbels zodat de tenen ook op 80 px als vork lezen (Grant: anisodactyl, 3 voor + 1 achter).
      const vork = (da, l, kl, tint) => { const d = [Math.cos(da), Math.sin(da)]; return { p: [[F[0], y], [F[0] + d[0] * l * 0.5, y + d[1] * l * 0.5], [F[0] + d[0] * l, y + d[1] * l]], w: [tw * 0.85, tw * 0.45], klauw: kl, tint, knobbel: 1 }; };
      uit.push(vork(-0.5, T * 0.8, 1, 0.3));  // binnenteen (verste kant, half achter de middenteen)
      uit.push(vork(0.02, T, 1, 0));           // middenteen
      uit.push(vork(0.5, T * 0.72, 1, 0.1));   // buitenteen (naar de kijker)
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.05], [F[0] - H, y + tw * 0.15]], w: [tw * 0.9, tw * 0.62], klauw: -1, knobbel: 1 }); }
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
      D.push({ b: pp.pts, c, na: (ctx) => { if (t.knobbel && P.tw >= 3) { ctx.fillStyle = LT(c, 0.1); for (const u of [0.45, 0.75]) { const q = t.p.length > 2 ? LP(t.p[1], t.p[2], (u - 0.5) * 2 > 0 ? (u - 0.5) * 2 : 0) : t.p[0]; ctx.beginPath(); ctx.arc(q[0], q[1], P.tw * 0.42, 0, 6.283); ctx.fill(); } } // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

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

  function tekenNieuw(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }
  V.tenen = tenen; V.pootDelen = pootDelen; V.delen = delen; V.teken = tekenNieuw;
})();
// ---- gedeelde hulpjes voor de zangvogels (VogelZang): pikken met de hals en een vlucht met lijfgolf ----
// Recept vlucht: bij elke neerslag duwen beide vleugels het lijf omhoog en kantelt het lijf licht (kop iets omhoog bij
// de opslag, omlaag bij de neerslag); de verre vleugel is zichtbaar (iets achter in fase), zodat het geen los blad
// boven een stijf lijf is. Pikken: lijf bijna horizontaal, alleen hals en kop omlaag.
function _vzNek(sp, P) { const V = VogelPop, Tb = V.tf(P.heup, P.tb), Tk = V.tf(P.kop, P.tk); return [Tb([sp.nek.aan[0] - 14, sp.nek.aan[1] + 4]), Tb(sp.nek.aan), Tk(sp.kopAan), Tk([sp.kopAan[0] + 8, sp.kopAan[1] - 2])]; }
function _vzTeken(naam, ctx, x, y, s, o) { if ((o.a ?? 1) <= 0.01) return; const V = VogelPop;
  if (o.houding === 'pikken') { const sp = VogelZang.spec(naam, o), P = VogelZang.pose(sp, 'staan', {}), pk = o.pik ?? 1;
    P.tb += 6 * V.RAD * pk; P.ts += 8 * V.RAD * pk; const kr = V.rot(sp.kopL, P.tb); P.kop = V.add(P.heup, V.add(kr, [22 * pk, 38 * pk])); P.tk = pk * (sp.def.pikR + 0.2);
    if (o.kraak != null) P.tk += 0.08 * Math.sin(o.kraak * 6.283); // kraken: kop knikt mee met de kaak
    P.nekPts = _vzNek(sp, P); return V.teken(ctx, sp, P, x, y, s, o); }
  if (o.houding === 'vliegen') { const sp = VogelZang.spec(naam, o), P = VogelZang.pose(sp, 'vliegen', o), fl = P.vlFase;
    const golf = Math.sin(fl.phi); P.tb += -6 * golf * V.RAD; P.heup = V.add(P.heup, [0, -6 * Math.max(0, golf)]);
    P.kop = V.add(P.heup, V.rot(sp.kopL, P.tb)); P.tk = 0.06 + 0.1 * golf;
    if (P.vl.f) P.vl.f = { phi: fl.phi - 0.22, f: Math.min(1, fl.f + 0.08), sweep: fl.sweep }; // verre vleugel iets later: zichtbaar
    P.nekPts = _vzNek(sp, P); return V.teken(ctx, sp, P, x, y, s, o); }
  return VogelZang.teken(naam, ctx, x, y, s, o); }
// ===================================================================================
// ZAADKRAKER (zwartbuikzaadkraker, Pyrenestes ostrinus, man), aanpassing op VogelZang. Recept: rode kop, keel en staart,
// zwarte borst, buik en rug (zo door Kamiel goedgekeurd en op 28 okt bevestigd: 'borst zwart'; eBird: 'red hood and tail'),
// zware blauwgrijze kegelsnavel (drie snavelmaten). Nieuw: houding 'pikken' (zaad van de grond: lijf horizontaal, hals en
// kop omlaag) en o.kraak (0–1, fase van het kraken: de kop knikt mee met de kaak). Voeten als vork (poot.vork).
// ===================================================================================
(function () { const D = VogelZang.DEFS, oud = D.zaadkraker; D.zaadkraker = (o) => { const d = oud(o); d.poot = Object.assign({}, d.poot, { vork: true }); return d; }; })();
zaadkraker = function (ctx, x, y, s = 1, o = {}) { return _vzTeken('zaadkraker', ctx, x, y, s, o); };

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

