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
  const a = phi < 0 ? -2.05 : 2.0, bd = phi < 0 ? -1 : 1; const dir = (an, l) => [Math.cos(an) * l, Math.sin(an) * l];
  const back = [-0.97, 0.25], chord = len * 0.44 * (0.75 + 0.25 * spread), R = [S[0] - len * 0.4, S[1] + len * 0.12];
  const W2 = [S[0] + dir(a, P * 0.45)[0], S[1] + dir(a, P * 0.45)[1]]; const at = a + bd * (0.2 + (1 - spread) * 0.9); const T = [W2[0] + dir(at, P * 0.62)[0], W2[1] + dir(at, P * 0.62)[1]];
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
  const dk = [S, W2, [W2[0] + back[0] * chord * 0.42, W2[1] + back[1] * chord * 0.42], [R[0] + (S[0] - R[0]) * 0.45, R[1] + (S[1] - R[1]) * 0.45]]; vul(ctx, dk, l, null);
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
  if (H.vlieg) _vOpen(ctx, [18, -100], H, 130, 50, { kl: _D(veer, 0.1), ver: true });
  _vStaart(ctx, [-58, -62], [-120, -36], 22, 24, { kl: _D(veer, 0.12), rand: veerL });
  // lijf (borst naar voren, rug doorlopend in de stuit), buik lichter
  const L = [[34, -94], [44, -78], [40, -60], [26, -46], [4, -38], [-22, -38], [-46, -46], [-64, -56], [-68, -70], [-52, -92], [-24, -108], [4, -118], [22, -114]];
  vul(ctx, L, veer, veerL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -98], [20, -86], [-20, -70], [-60, -54], [-70, -20], [60, -20]], buik); vul(ctx, [[30, -130], [0, -112], [-40, -96], [-70, -74], [-80, -120]], rug);
    if (!man) { ctx.strokeStyle = streep; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const px = 36 - (i % 7) * 10 - Math.floor(i / 7) * 5, py = -84 + Math.floor(i / 7) * 14 + (i % 2) * 4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 3, py + 8); ctx.stroke(); } }
    else { ctx.fillStyle = '#E8E4DC'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-40 - i * 6, -44 + i * 2, 3, 2, 0.4, 0, 6.283); ctx.fill(); } } });
  // dijveren over de bovenkant van de poot
  vul(ctx, [[10, -54], [-12, -54], [-14, -40], [0, -36], [10, -44]], buik);
  if (!H.vlieg) _vPoot(ctx, [2, -42], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [18, -100], H, 130, 50, { kl: _D(veer, 0.1) }); else _vVleugel(ctx, [18, -100], [-90, -58], 46, { kl: _D(veer, 0.1), rand: veerL, zoom: man ? '#55535A' : '#B89E80', dek: man ? _L(veer, 0.04) : '#86705A' });
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
  if (H.vlieg) _vOpen(ctx, [14, -110], H, 130, 50, { kl: _D(zw, 0.12), ver: true });
  _vStaart(ctx, [-38, -62], zp.soort === 'tak' ? [-108, 6] : [-140, -34], 24, 30, { kl: _D(zw, 0.15), rand: zwL, punt: 'rond' });
  const L = [[42, -102], [46, -84], [40, -64], [26, -50], [6, -42], [-14, -40], [-32, -46], [-46, -60], [-50, -80], [-38, -102], [-12, -122], [14, -132], [32, -126]];
  vul(ctx, L, zw, zwL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -96], [10, -76], [-60, -58], [-60, -20], [60, -20]], buik); vul(ctx, [[30, -140], [-10, -116], [-60, -86], [-70, -140]], rug);
    ctx.strokeStyle = _A(zwL, 0.55); ctx.lineWidth = 1.3; for (let i = 0; i < 16; i++) { const px = 38 - (i % 6) * 12, py = -88 + Math.floor(i / 6) * 13 + (i % 2) * 4; ctx.beginPath(); ctx.arc(px, py, 4, 0.2, 2.6); ctx.stroke(); } });
    if (!H.vlieg) _vPoot(ctx, [0, -42], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [14, -110], H, 130, 50, { kl: _D(zw, 0.12) }); else _vVleugel(ctx, [14, -110], [-66, -36], 44, { kl: _D(zw, 0.12), rand: zwL, zoom: '#5A5962', hand: '#1E1D22' });
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
  if (H.vlieg) _vOpen(ctx, [16, -98], H, 150, 50, { kl: blauw, ver: true });
  _vStaart(ctx, [-54, -62], [-134, -24], 20, 24, { kl: blauw, rand: blauwL, wit: '#EEEEEA' });
  const L = [[32, -92], [40, -76], [36, -58], [22, -44], [0, -36], [-24, -38], [-46, -48], [-60, -60], [-60, -76], [-44, -96], [-16, -110], [8, -116], [24, -110]];
  vul(ctx, L, groen, groenL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -100], [14, -88], [-30, -62], [-62, -50], [-70, -10], [60, -10]], geel); vul(ctx, [[-30, -40], [-60, -54], [-70, -10], [-20, -10]], '#D8D4C4');
    vul(ctx, [[40, -70], [20, -50], [-10, -44], [-30, -60], [-60, -50], [-60, -30], [60, -30]], geelD); // schaduwkant onder
    _streek(ctx, [[34, -96], [26, -72], [10, -50], [-12, -38]], [16, 13, 11, 8], zwart); // zwarte borststreep (bij de man breed tot tussen de poten)
    vul(ctx, [[-20, -114], [-50, -96], [-66, -70], [-80, -120]], '#6A7E4C'); });
  
  if (!H.vlieg) _vPoot(ctx, [2, -40], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [16, -98], H, 150, 50, { kl: blauw }); else _vVleugel(ctx, [16, -98], [-94, -60], 44, { kl: blauw, rand: blauwL, zoom: '#C8D2E2', dek: '#6E829E', band: '#F2F2EE', hand: '#4A5A76' });
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
  if (H.vlieg) _vOpen(ctx, [16, -110], H, 140, 52, { kl: '#2C2A32', ver: true });
  _vStaart(ctx, [-60, -70], [-150, -34], 22, 26, { kl: roodD, rand: roodL });
  const L = [[36, -100], [44, -82], [38, -62], [22, -48], [0, -40], [-26, -42], [-50, -52], [-66, -66], [-66, -82], [-48, -104], [-18, -120], [10, -126], [28, -118]];
  vul(ctx, L, zw, zwL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -120], [20, -100], [0, -76], [16, -56], [60, -56]], rood); vul(ctx, [[-50, -60], [-70, -72], [-80, -50], [-60, -40]], rood); });
  vul(ctx, [[8, -56], [-12, -54], [-14, -40], [0, -36], [10, -44]], '#1E1C22');
  if (!H.vlieg) _vPoot(ctx, [2, -46], F1, zp, poot);
  if (H.vlieg) _vOpen(ctx, [16, -110], H, 140, 52, { kl: '#2C2A32' }); else _vVleugel(ctx, [16, -110], [-98, -66], 48, { kl: '#2C2A32', rand: zwL, zoom: '#4E4C58', hand: '#1E1C22' });
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
    const top = [[x0 + 6, -166], [x0 - L * 0.3, -128], [x0 - L * 0.62, -60], [x0 - L * 0.86, -12], [x0 - L - 14, 0]];
    const ond = [[x0 - L * 0.95, 4], [x0 - L * 0.72, 2], [x0 - L * 0.5, -30], [x0 - L * 0.22, -88], [x0 - 14, -128]];
    const S = top.concat(ond); vul(ctx, S, _D(groen, 0.25), brons, 2);
    binnen(ctx, S, () => { ctx.strokeStyle = _A('#C0A848', 0.4); ctx.lineWidth = 1.4; for (let i = 0; i < 16; i++) { const f = i / 15; ctx.beginPath(); ctx.moveTo(x0 - 4, -160 + f * 36); ctx.bezierCurveTo(x0 - L * 0.3, -122 + f * 30, x0 - L * 0.6, -54 + f * 40, x0 - L - 10, -2 + f * 6); ctx.stroke(); }
      for (let i = 0; i < 18; i++) { const u = 0.18 + i * 0.047; const ty = _prof([[0, -166], [0.3, -128], [0.62, -60], [0.86, -12], [1, 0]], u), by = _prof([[0, -128], [0.22, -88], [0.5, -30], [0.72, 2], [1, 4]], u); const v = (i % 3) / 2.4 + 0.12;
        _oogvlek(ctx, x0 - L * u, lerp(ty, by, v), 5 + u * 7, Math.atan2(-(by - ty), L) * 0 + 0.55 - u * 0.5); } });
  }
  else {
    // waaier: ± 200 veren in een licht gedraaide halve ellips achter het lijf, oogvlekken in ringen; onderrand met 'visstaart'-veren
    const cx = -20, cy = -170, R = 300 * staartLengte, ry = 0.86;
    const F = []; for (let i = 0; i <= 60; i++) { const an = Math.PI * (0.98 + 1.04 * i / 60); F.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R * ry]); } F.push([cx + R * 0.2, cy + 30]); F.push([cx - R * 0.2, cy + 30]);
    vul(ctx, F, _D(groen, 0.3), brons, 2);
    binnen(ctx, F, () => { ctx.strokeStyle = _A('#B8A04A', 0.45); ctx.lineWidth = 1.3; for (let i = 0; i <= 70; i++) { const an = Math.PI * (0.99 + 1.02 * i / 70); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R * ry); ctx.stroke(); }
      for (const [rr, n] of [[0.94, 30], [0.8, 26], [0.66, 21], [0.52, 16], [0.38, 11]]) for (let i = 0; i < n; i++) { if (hash(i * 13 + rr * 100) > vlekken) continue; const an = Math.PI * (1.04 + 0.92 * (i + 0.5 * (rr * 10 % 2)) / n); const px = cx + Math.cos(an) * R * rr, py = cy + Math.sin(an) * R * rr * ry; _oogvlek(ctx, px, py, 7 + 9 * rr, an + Math.PI / 2 + Math.PI / 2); } });
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
  const HS = [[44, -176], [56, -208], [66, -238], [76, -258], [84, -268]]; const Hn = _buis(HS, [16, 13, 10, 9, 9], [12, 10, 8, 7, 7]); vul(ctx, Hn, blauw, blauwL, 2);
  binnen(ctx, Hn, () => { ctx.fillStyle = _A(blauwD, 0.55); for (let i = 0; i < 26; i++) { const u = i / 26, p = [lerp(44, 84, u) + (i % 2 ? 4 : -3), lerp(-176, -268, u)]; ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, Math.PI); ctx.fill(); } });
  // kop
  const K = [[74, -270], [80, -282], [92, -284], [100, -276], [98, -266], [88, -260], [76, -260]]; vul(ctx, K, blauw, blauwL, 1.5);
  // kuif: ± 20 kale schachten met blauwgroene waaiertjes
  for (let i = 0; i < 9; i++) { const bx = 80 + i * 1.6, by = -282 - i * 0.3, an = -1.95 + i * 0.09, l = 30 + (i % 3) * 3; const tx = bx + Math.cos(an) * l, ty = by + Math.sin(an) * l; lijn(ctx, [[bx, by], [tx, ty]], '#3A4A6A', 1.3);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + 1.57); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-5, -3, 0, -7); ctx.quadraticCurveTo(5, -3, 0, 2); ctx.fillStyle = i % 2 ? '#3E8AA0' : blauwL; ctx.fill(); ctx.restore(); }
  // gezicht: witte streep boven, witte halve maan onder het oog (kale huid)
  vul(ctx, [[82, -279], [92, -280], [97, -277], [90, -276]], '#EEEEE6'); vul(ctx, [[82, -268], [90, -265], [97, -268], [92, -270], [86, -270]], '#EEEEE6');
  dierOog(ctx, 90, -274, 2.8, '#2A1A10');
  vul(ctx, [[97, -276], [106, -273], [110, -270], [104, -268], [97, -268]], '#B0A288', '#D0C4A8', 1); circ(ctx, 101, -273, 0.9, '#5A4E40');
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
function vogel(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
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
  const top = [[0, 3], [0.04, 13], [0.12, 30], [0.3, 46], [0.5, 39], [0.7, 25], [0.88, 13], [1, 10]], ond = [[0, 5], [0.05, 15], [0.15, 31], [0.32, 37], [0.5, 32], [0.7, 20], [0.88, 10], [1, 9]];
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
  const top = [[0, 5], [0.055, 7], [0.08, 26], [0.12, 40], [0.2, 46], [0.38, 50], [0.6, 40], [0.78, 22], [0.92, 13], [1, 9]], ond = [[0, 6], [0.05, 8], [0.1, 18], [0.2, 34], [0.38, 44], [0.6, 34], [0.78, 16], [0.92, 9], [1, 7]];
  const Z = _zwemLijf(250, -222, top, ond, golf); const r = 1 - rontgen * 0.75;
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin: horizontaal, van opzij een smalle wig die met de slag op en neer kantelt
  const [tx, ty] = Z.pt(1, 0), ta = Z.hoek(1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta + zw * Math.cos(fase - 3.2) * 0.35);
  vul(ctx, [[6, -7], [-30, -10], [-62, -18], [-78, -12], [-64, 0], [-78, 12], [-62, 18], [-30, 10], [6, 7]], mantel, rand, 2); ctx.restore();
  _vin(ctx, Z, 0.45, 48, [[22, 4], [4, -24], [-14, -50], [-26, -58], [-24, -44], [-30, -16], [-40, 2]], mantel, rand);
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
  const h = lig ? 40 : 80; const golf = (u) => -h + (lig ? 0 : -4) * Math.sin(u * 3) + Math.sin(t * 2 - u * 5) * 4 * u;
  const top = [[0, 6], [0.03, 12], [0.05, 10], [0.12, 13], [0.155, 23], [0.17, 21], [0.2, 28], [0.28, 42], [0.4, 46], [0.5, 40], [0.62, 26], [0.8, 14], [1, 2]];
  const ond = [[0, 5], [0.06, 8], [0.14, 13], [0.2, 22], [0.3, 38], [0.42, 40], [0.52, 28], [0.7, 13], [1, 1]];
  const Z = _zwemLijf(340, -330, top, ond, golf);
  const poot = (u, voor, ver) => { const kl = ver ? huidD : huid, klD = ver ? _D(huidD, 0.15) : huidD; const [px, py] = Z.pt(u, -_prof(ond, u) * 0.4); const wd = voor ? 26 : 38;
    if (lig) _reptielPoot(ctx, [px, py], [px - (voor ? -6 : 24), py - 10], [px + (voor ? 18 : -2), -4], [[px + 26, 0], [px + 34, 0], [px + 40, -1], [px + 30, 1]].map(([a, b]) => [a + (voor ? 4 : -14), b]), wd, kl, klD);
    else _reptielPoot(ctx, [px, py], [px + (voor ? -10 : 18), py + 26], [px + (voor ? 2 : -4), -6], (voor ? [[22, 0], [30, 0], [34, -1], [26, 1], [16, 1]] : [[26, 0], [36, 0], [40, -1], [30, 1]]).map(([a, b]) => [px + a + (voor ? 0 : -4), b]), wd, kl, klD); };
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
  const h = lig ? 15 : 40; const golf = (u) => -h - (u > 0.4 ? -(u - 0.4) * 14 : 0);
  const top = [[0, 5], [0.03, 13], [0.08, 20], [0.11, 17], [0.16, 22], [0.3, 25], [0.4, 19], [0.55, 10], [1, 1]], ond = [[0, 5], [0.06, 12], [0.11, 15], [0.2, 19], [0.32, 19], [0.4, 13], [0.6, 6], [1, 0.8]];
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
berkenspanner = (function (oud) { return function (ctx, x, y, s = 1, o = {}) { if (o.houding !== 'vliegen') return oud(ctx, x, y, s, o);
  const k = 0.35 + 0.65 * Math.abs(Math.cos((o.t || 0) * 14)); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(k, 1); oud(ctx, 0, 0, s, Object.assign({}, o, { rot: 0 })); ctx.restore(); }; })(berkenspanner);

// RUPS: tekening uit teken_evo2 (één doorlopende lijfvorm met segmentbanden, 3 paar borstpoten, buikpoten en naschuivers) blijft; nieuw: o.houding
// 'kruipen' (een golf van achter naar voren via o.t, de lijfvorm buigt licht), 'lus' (spanrups: het midden hoog opgebogen, voor- en achterpoten op het blad),
// 'strekken' (recht, zoals een takje). Standaard = zoals gevraagd met o.krom.
rups = (function (oud) { return function (ctx, x, y, s = 1, o = {}) { const h = o.houding; if (!h) return oud(ctx, x, y, s, o);
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
