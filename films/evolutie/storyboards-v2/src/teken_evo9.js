// Evolutie v2 — extra film 9 'De reis van Darwin' — tekenfuncties (23 okt 2026). Alle namen met voorvoegsel x9.
// Laad: teken_evo9_data, pop_vogels-keten (dieren_overig, pop_vogels) voor de grondvink, teken_evo9, sb9.

// ---------- historische personen in castboekstijl (eigen figuren, geen vaste castrol) ----------
// Darwin 1831: 22 jaar, ±1,83 m, bruin haar, bakkebaarden; kleding 1830: donkere jas, wit hemd met das, lichte broek.
// Darwin 1858: 49 jaar, kalend, grijzend; nog zonder de grote baard (die liet hij pas na 1862 staan).
// Wallace 1858: 35 jaar, bril (hij was bijziend); baard onzeker -> zonder. Gould 1837: 32 jaar. FitzRoy: marineofficier.
Object.assign(CAST, {
  x9darwin: { naam: 'Charles Darwin (1831)', leeftijd: 22, rol: 'historisch', huid: '#EFCBAE', haar: '#6E4A2C', kapsel: 'kort', wenkbrauw: '#4E3420',
    top: 'jasje', topKleur: '#2E3A52', topAccent: '#26304A', binnen: '#EEE8DA', broek: '#A8977A', schoen: '#2A2420', schoenAccent: '#1E1A16', accessoire: [], lengte: 1.08, bakkebaard: true },
  x9darwinOud: { naam: 'Charles Darwin (1858)', leeftijd: 49, rol: 'historisch', huid: '#E9C4A6', haar: '#8A7A6A', kapsel: 'kalend', wenkbrauw: '#6A5A4A',
    top: 'jasje', topKleur: '#2A2A30', topAccent: '#222228', binnen: '#EEE8DA', broek: '#3A3A42', schoen: '#2A2420', schoenAccent: '#1E1A16', accessoire: [], lengte: 1.08, bakkebaard: true },
  x9wallace: { naam: 'Alfred Russel Wallace', leeftijd: 35, rol: 'historisch', huid: '#EBC3A2', haar: '#9A7A52', kapsel: 'kort', wenkbrauw: '#7A5A3A',
    top: 'overhemd', topKleur: '#E2DCCC', topAccent: '#C8C0AE', broek: '#6A5E4A', schoen: '#3A2E24', schoenAccent: '#2A2018', accessoire: ['bril'], lengte: 1.1 },
  x9gould: { naam: 'John Gould', leeftijd: 32, rol: 'historisch', huid: '#EDC7A8', haar: '#3A2A20', kapsel: 'kort', wenkbrauw: '#2A1E16',
    top: 'jasje', topKleur: '#3A4A3A', topAccent: '#30402F', binnen: '#EEE8DA', broek: '#4A4A50', schoen: '#2A2420', schoenAccent: '#1E1A16', accessoire: [], lengte: 0.98, bakkebaard: true },
  x9fitzroy: { naam: 'Robert FitzRoy', leeftijd: 26, rol: 'historisch', huid: '#F0CFB4', haar: '#2E2018', kapsel: 'kort', wenkbrauw: '#2A1C14',
    top: 'jasje', topKleur: '#1E2A48', topAccent: '#18223C', binnen: '#EEE8DA', broek: '#1E2A48', schoen: '#1A1A1E', schoenAccent: '#101014', accessoire: [], lengte: 1.04 },
  x9secretaris: { naam: 'secretaris Linnean Society', leeftijd: 57, rol: 'historisch', huid: '#E6BE9E', haar: '#C8C4BA', kapsel: 'kalend', wenkbrauw: '#A8A296',
    top: 'jasje', topKleur: '#2A2A30', topAccent: '#222228', binnen: '#EEE8DA', broek: '#2A2A30', schoen: '#1A1A1E', schoenAccent: '#101014', accessoire: ['bril'], lengte: 1.0 },
  x9erasmus: { naam: 'Erasmus Darwin', leeftijd: 63, rol: 'historisch', huid: '#EBC2A0', haar: '#E2DED4', kapsel: 'kort', wenkbrauw: '#B8B2A6',
    top: 'jasje', topKleur: '#5A3E3A', topAccent: '#4A3230', binnen: '#EEE8DA', broek: '#3A3A42', schoen: '#2A2420', schoenAccent: '#1E1A16', accessoire: [], lengte: 1.0 },
  x9martens: { naam: 'Conrad Martens', leeftijd: 32, rol: 'historisch', huid: '#EBC4A4', haar: '#5A3E2A', kapsel: 'kort', wenkbrauw: '#3E2A1C',
    top: 'jas', topKleur: '#5A4A3A', topAccent: '#4A3C2E', broek: '#6E6250', schoen: '#2A2420', schoenAccent: '#1E1A16', accessoire: [], lengte: 1.0 }
});
// persoon uit de castboekmotor + bakkebaarden (mode rond 1830–1860) + witte das
function x9mens(ctx, id, x, y, h, o = {}) { const r = persoon(ctx, id, x, y, h, o); const P = CAST[id]; if (!r || !r.hoofd || o.zij) return r; const a = o.a == null ? 1 : o.a;
  ctx.save(); ctx.globalAlpha *= a; const hd = r.hoofd, hh = hd.r / 0.55, fw = hh * 0.86;
  if (P.bakkebaard) { ctx.fillStyle = P.haar; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hd.x + s * fw * 0.5, hd.y - hh * 0.12); ctx.quadraticCurveTo(hd.x + s * fw * 0.54, hd.y + hh * 0.2, hd.x + s * fw * 0.36, hd.y + hh * 0.36); ctx.lineTo(hd.x + s * fw * 0.36, hd.y + hh * 0.1); ctx.quadraticCurveTo(hd.x + s * fw * 0.42, hd.y - hh * 0.05, hd.x + s * fw * 0.44, hd.y - hh * 0.12); ctx.closePath(); ctx.fill(); } }
  if (P.top === 'jasje') { const sy = hd.y + hh * 0.87; ctx.fillStyle = '#F4F0E6'; ctx.beginPath(); ctx.moveTo(hd.x - hh * 0.2, sy - hh * 0.02); ctx.quadraticCurveTo(hd.x, sy + hh * 0.12, hd.x + hh * 0.2, sy - hh * 0.02); ctx.lineTo(hd.x + hh * 0.08, sy + hh * 0.34); ctx.lineTo(hd.x - hh * 0.08, sy + hh * 0.34); ctx.closePath(); ctx.fill(); }
  ctx.restore(); return r; }

// ---------- dieren uit de overgetrokken platen (V9) ----------
// palet per dier: [donker, basis, licht] (zelf ontworpen, rustig, 3 tonen); rand = lichtere tint van de basis
const X9_PAL = {
  nandoeGroot: ['#5E5852', '#8A8176', '#C2B8A8'], nandoeKlein: ['#5A4C3E', '#7C6A56', '#D2C6B0'],
  schildKoepel: ['#4A4540', '#7E766A', '#9A9284'], schildZadel: ['#4E4842', '#857C6C', '#A49A88'],
  megatherium: ['#54463A', '#7E6A56', '#A8947C'], glyptodon: ['#4A3E34', '#A08A6A', '#C2AE8C'],
  gordeldier: ['#5A4C40', '#9C8A72', '#C8B8A0'], luiaard: ['#5E5042', '#8E7C66', '#D2C2A6'], spotlijster: ['#5E554C', '#8C8278', '#DCD4C6']
};
function _x9pad(ctx, P) { ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); }
function x9dier(ctx, naam, x, y, s, o = {}) { const { a = 1, kijk = 1, goud = false, rand = true } = o; const D = V9[naam]; if (!D || a <= 0.01) return;
  const pal = o.pal || X9_PAL[naam]; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  _x9pad(ctx, D.om); ctx.fillStyle = pal[1]; ctx.fill(); if (rand) { ctx.strokeStyle = goud ? C.goud : _lt(pal[1], 0.3); ctx.lineWidth = (goud ? 3 : 1.5) / s; ctx.stroke(); }
  ctx.save(); _x9pad(ctx, D.om); ctx.clip();
  if (o.voor) o.voor(ctx, pal); // patroon onder de toonvlakken (bv. pantserplaatjes)
  (D.lagen[0] || []).forEach(p => { _x9pad(ctx, p); ctx.fillStyle = pal[0]; ctx.fill(); });
  (D.lagen[2] || []).forEach(p => { _x9pad(ctx, p); ctx.fillStyle = pal[2]; ctx.fill(); });
  if (o.na) o.na(ctx, pal);
  ctx.restore();
  if (D.oog) { ctx.save(); ctx.translate(D.oog[0], D.oog[1]); ctx.scale(1 / s, 1 / s); dierOog(ctx, 0, 0, Math.max(2.2, D.oog[2] * s * 0.9), '#2A1E14'); ctx.restore(); }
  ctx.restore(); }
// soorten (s = px per cm)
function x9nandoe(ctx, x, y, s, o = {}) { x9dier(ctx, 'nandoeGroot', x, y, s, o); }
function x9nandoeKlein(ctx, x, y, s, o = {}) { x9dier(ctx, 'nandoeKlein', x, y, s, Object.assign({ na: (c, pal) => { // witte veertoppen (Rhea pennata)
  c.fillStyle = '#E8E0D0'; for (let i = 0; i < 46; i++) { const u = hash(i * 3.3 + 1), v = hash(i * 5.1 + 2); const px = -36 + u * 50, py = -72 + v * 30 + Math.abs(px + 10) * 0.12; if (py > -46 + (px + 36) * 0.05) continue; c.beginPath(); c.ellipse(px, py, 1.6, 2.6, 0.5, 0, 6.283); c.fill(); } } }, o)); }
function x9schildpad(ctx, vorm, x, y, s, o = {}) { const naam = vorm === 'zadel' ? 'schildZadel' : 'schildKoepel'; x9dier(ctx, naam, x, y, s, Object.assign({ na: (c, pal) => { // schildplaten als lichte naden op het donkere schild
  const D = V9[naam]; c.save(); (D.lagen[0] || []).forEach(p => { _x9pad(c, p); }); c.clip(); c.strokeStyle = rgba(_lt(pal[0], 0.25), 0.55); c.lineWidth = 1;
  const xs = D.om.map(p => p[0]), x0 = Math.min(...xs), x1 = Math.max(...xs), ys = D.om.map(p => p[1]), y0 = Math.min(...ys);
  for (let i = 1; i < 5; i++) { const xx = x0 + (x1 - x0) * i / 5; c.beginPath(); c.moveTo(xx, y0); c.lineTo(xx + (i - 2.5) * 4, 0); c.stroke(); }
  for (let j = 1; j < 3; j++) { c.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 + (x1 - x0) * k / 20; const yy = y0 * (1 - j * 0.3) + Math.sin(k / 20 * Math.PI) * -6; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); } c.restore(); } }, o)); }
function x9megatherium(ctx, x, y, s, o = {}) { x9dier(ctx, 'megatherium', x, y, s, o); }
function x9glyptodon(ctx, x, y, s, o = {}) { s *= 330 / 380; x9dier(ctx, 'glyptodon', x, y, s, Object.assign({ voor: (c, pal) => { // pantser van zeshoekige botplaatjes (>1000 osteodermen)
  c.strokeStyle = _lt(pal[1], 0.28); c.lineWidth = 1.4; const r = 9; for (let j = 0; j < 24; j++) for (let i = 0; i < 46; i++) { const px = -190 + i * r * 1.75 + (j % 2) * r * 0.87, py = -200 + j * r * 1.5; c.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + Math.PI / 6; k ? c.lineTo(px + Math.cos(an) * r * 0.92, py + Math.sin(an) * r * 0.92) : c.moveTo(px + Math.cos(an) * r * 0.92, py + Math.sin(an) * r * 0.92); } c.closePath(); c.stroke(); } } }, o)); }
function x9gordeldier(ctx, x, y, s, o = {}) { x9dier(ctx, 'gordeldier', x, y, s, Object.assign({ na: (c, pal) => { c.strokeStyle = _dk(pal[1], 0.25); c.lineWidth = 0.8; for (let i = 0; i < 8; i++) { const xx = -8 + i * 2.2; c.beginPath(); c.moveTo(xx, -16); c.lineTo(xx + 0.6, -3); c.stroke(); } } }, o)); }
function x9luiaard(ctx, x, y, s, o = {}) { x9dier(ctx, 'luiaard', x, y, s, o); }
function x9spotlijster(ctx, x, y, s, o = {}) { x9dier(ctx, 'spotlijster', x, y, s, o); }

// ---------- de Beagle: bark (drie masten), 27,5 m lang, zijaanzicht; s = px per meter. Tuigage vereenvoudigd. ----------
function x9schip(ctx, x, y, s, o = {}) { const { a = 1, kijk = 1, masten = 3, brand = 0, zeil = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  // romp: waterlijn y=0, dek ±2,6 m erboven, achtersteven hoger
  vul(ctx, [[-14.6, -3.3], [-13.6, -3.4], [11.5, -2.7], [14.2, -3.0], [13.6, -1.4], [12, 0.6], [-12.4, 0.8], [-14.2, -0.8]], '#3A2E26');
  ctx.fillStyle = '#E8E0CC'; ctx.beginPath(); ctx.moveTo(-14.2, -2.15); ctx.lineTo(13.4, -1.85); ctx.lineTo(13.3, -1.45); ctx.lineTo(-14.1, -1.75); ctx.closePath(); ctx.fill(); // witte gang met geschutpoorten
  ctx.fillStyle = '#2A221C'; for (let i = 0; i < 9; i++) { const px = -10 + i * 2.5; ctx.fillRect(px, -2.05, 0.7, 0.45); }
  lijn(ctx, [[14.0, -3.0], [19.5, -6.6]], '#3A2E26', 0.35); // boegspriet
  const M = masten === 3 ? [[-8.6, 21], [1.2, 27], [8.8, 24]] : [[-4.5, 22], [6, 23]]; // [x, hoogte]
  M.forEach(([mx, mh]) => lijn(ctx, [[mx, -3], [mx, -3 - mh]], '#4A3A2E', 0.38));
  ctx.strokeStyle = rgba('#AFA28A', 0.6); ctx.lineWidth = 0.12; M.forEach(([mx, mh]) => { ctx.beginPath(); ctx.moveTo(mx, -3 - mh); ctx.lineTo(mx - 4.5, -3); ctx.moveTo(mx, -3 - mh); ctx.lineTo(mx + 4.5, -3); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(M[M.length - 1][0], -3 - M[M.length - 1][1]); ctx.lineTo(19.5, -6.6); ctx.stroke();
  if (zeil > 0.01) { const sc = '#E6DCC4', sr = '#C9BC9C';
    M.forEach(([mx, mh], k) => { const raa = masten === 3 && k === 0 ? 0 : 1; const lagen = [[0.30, 0.52, 6.2], [0.55, 0.74, 5.2], [0.77, 0.93, 3.8]];
      if (raa) lagen.forEach(([u0, u1, b]) => { const yt = -3 - mh * u1, yb = -3 - mh * u0, bb = b * (1 - 0.1 * k); vul(ctx, [[mx - bb, yt], [mx + bb, yt], [mx + bb * 1.06, yb + 0.6], [mx, yb + 1.2], [mx - bb * 1.06, yb + 0.6]], sc, sr, 0.12); lijn(ctx, [[mx - bb - 0.4, yt], [mx + bb + 0.4, yt]], '#4A3A2E', 0.22); });
      else { _x9pad(ctx, [[mx + 0.3, -3 - mh * 0.8], [mx + 0.3, -4.4], [mx - 8.5, -4.6], [mx - 7.2, -3 - mh * 0.62]]); ctx.fillStyle = sc; ctx.fill(); ctx.strokeStyle = sr; ctx.lineWidth = 0.12; ctx.stroke(); lijn(ctx, [[mx, -3 - mh * 0.82], [mx - 7.4, -3 - mh * 0.62]], '#4A3A2E', 0.22); } }); // bezaan (gaffelzeil) op de achterste mast
    vul(ctx, [[13.5, -4.5], [19.0, -6.4], [M[M.length - 1][0] + 0.6, -3 - M[M.length - 1][1] * 0.78]], sc, sr, 0.12); } // fok
  if (brand > 0.01) { ctx.globalAlpha *= brand; [[-9, 9, 1.6], [-5.5, 13, 2.2], [-1, 8, 1.4], [3, 15, 2.6], [7, 10, 1.8], [10.5, 6, 1.2]].forEach(([fx, fh, b], i) => { vul(ctx, [[fx - b * 1.6, -2.8], [fx - b, -2.8 - fh * 0.45], [fx - b * 0.2, -2.8 - fh * 0.8], [fx + b * 0.3, -2.8 - fh], [fx + b * 0.9, -2.8 - fh * 0.55], [fx + b * 1.6, -2.8]], C.koraal); vul(ctx, [[fx - b * 0.8, -2.8], [fx, -2.8 - fh * 0.5], [fx + b * 0.8, -2.8]], '#F0B080'); });
    ctx.fillStyle = rgba('#5A5A62', 0.5); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(-2 + i * 2.5 + i * i * 0.5, -18 - i * 3.6, 3 + i * 1.1, 2 + i * 0.5, 0, 0, 6.283); ctx.fill(); } }
  ctx.restore(); }
// zee bij nacht (Macro): lucht, horizon, water met golflijntjes
function x9zee(ctx, o = {}) { const { hor = 620 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hor - 110, W, 110);
  ctx.fillStyle = '#1F4466'; ctx.fillRect(0, hor, W, H - hor); ctx.fillStyle = '#1A3A5A'; ctx.fillRect(0, hor + 140, W, H - hor - 140);
  ctx.strokeStyle = rgba('#9CCBE3', 0.22); ctx.lineWidth = 2; for (let j = 0; j < 7; j++) { const yy = hor + 30 + j * 46; for (let i = 0; i < 9; i++) { const xx = hash(j * 17 + i * 3) * W; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 30, yy - 5, xx + 60, yy); ctx.stroke(); } } }

// ---------- kaarten (Schema): equirectangulaire projectie van Natural Earth-landvormen ----------
let _x9poly = null;
function _x9land() { if (_x9poly) return _x9poly; _x9poly = X9_LAND.split(';').map(r => { const n = r.split(',').map(Number), pts = []; let x = 0, y = 0; for (let i = 0; i < n.length; i += 2) { x += n[i]; y += n[i + 1]; pts.push([x / 10, y / 10]); } return pts; });
  _x9poly.forEach(p => { for (let i = 1; i < p.length; i++) { const d = p[i][0] - p[i - 1][0]; if (d > 180) p[i][0] -= 360 * Math.round(d / 360); else if (d < -180) p[i][0] += 360 * Math.round(-d / 360); } }); return _x9poly; }
// kaart: vak (x, y, w, h) toont lon0..lon1, lat1 (boven) .. lat0 (onder). Geeft een projectie P(lon, lat) -> [px, py].
function x9kaart(ctx, x, y, w, h, lon0, lon1, lat0, lat1, o = {}) { const { land = '#33496B', rand = '#6A82A6', zee = '#1A2A44', a = 1, raster = true } = o;
  const P = (lon, lat) => [x + (lon - lon0) / (lon1 - lon0) * w, y + (lat1 - lat) / (lat1 - lat0) * h];
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); ctx.fillStyle = zee; ctx.fill(); ctx.clip();
  if (raster) { ctx.strokeStyle = rgba('#FFFFFF', 0.04); ctx.lineWidth = 1; for (let lo = -180; lo <= 180; lo += 30) { const [px] = P(lo, 0); ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y + h); ctx.stroke(); } for (let la = -60; la <= 60; la += 30) { const [, py] = P(0, la); ctx.beginPath(); ctx.moveTo(x, py); ctx.lineTo(x + w, py); ctx.stroke(); } }
  ctx.beginPath(); for (const p of _x9land()) for (const off of [-360, 0, 360]) { p.forEach(([lo, la], i) => { const [px, py] = P(lo + off, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); }
  ctx.fillStyle = land; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.stroke();
  if (o.na) o.na(P); ctx.restore(); roundRect(ctx, x, y, w, h, 12); ctx.strokeStyle = rgba(C.line, 0.5 * a); ctx.lineWidth = 1.5; ctx.stroke(); return P; }
// route van de tweede reis van de Beagle (vereenvoudigd; havens uit de reisbeschrijving)
const X9_ROUTE = [['Plymouth', -4.1, 50.4], ['Kaapverdië', -23.5, 14.9], ['Bahia', -38.5, -13], ['Rio de Janeiro', -43.2, -22.9], ['Montevideo', -56.2, -34.9], ['Bahía Blanca', -62.3, -38.9], ['Port Desire', -65.9, -47.75], ['Falklandeilanden', -58, -51.7], ['Vuurland', -68, -55], ['Valparaíso', -71.6, -33], ['Callao', -77.1, -12], ['Galápagos', -90.5, -0.7],
  ['Tahiti', -149.5, -17.6], ['Nieuw-Zeeland', 174.1, -35.3], ['Sydney', 151.2, -33.9], ['Hobart', 147.3, -42.9], ['King George Sound', 117.9, -35], ['Cocoseilanden', 96.9, -12.2], ['Mauritius', 57.5, -20.2], ['Kaapstad', 18.4, -33.9], ['Sint-Helena', -5.7, -16], ['Ascension', -14.4, -7.9], ['Bahia', -38.5, -13], ['Azoren', -27, 38.7], ['Falmouth', -5.1, 50.1]];
function x9route(ctx, P, tot = 1, o = {}) { const { kleur = C.goud, lw = 4, punten = true } = o; const R = X9_ROUTE; const n = Math.floor(tot * (R.length - 1)); ctx.save(); ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.setLineDash([12, 9]); ctx.lineCap = 'round';
  for (let i = 0; i < Math.min(n, R.length - 1); i++) { let [, l0, b0] = R[i], [, l1, b1] = R[i + 1]; if (Math.abs(l1 - l0) > 180) { const l1b = l1 - 360 * Math.sign(l1 - l0); const [ax, ay] = P(l0, b0), [bx, by] = P(l1b, b1); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); const [cx, cy] = P(l0 + 360 * Math.sign(l1 - l0), b0), [dx, dy] = P(l1, b1); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(dx, dy); ctx.stroke(); continue; }
    const [ax, ay] = P(l0, b0), [bx, by] = P(l1, b1); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }
  ctx.setLineDash([]); if (punten) for (let i = 0; i <= Math.min(n, R.length - 1); i++) { const [px, py] = P(R[i][1], R[i][2]); circ(ctx, px, py, 5, C.bgSchema, kleur, 2.5); } ctx.restore(); }
function x9plek(ctx, P, lon, lat, naam, meta, o = {}) { const { kleur = C.goud, align = 'left', dx = 16, dy = -12, r = 8 } = o; const [px, py] = P(lon, lat); circ(ctx, px, py, r, kleur, _lt(kleur, 0.4), 2); if (naam) naamBij(ctx, naam, meta, px + (align === 'right' ? -dx : align === 'center' ? 0 : dx), py + dy, 1, align, o.tekstKleur || C.text); return [px, py]; }
// Galápagos (vereenvoudigde eilandvormen, ligging volgens de kaart van de archipel); namen zoals Darwin ze kende + huidige naam
const X9_GAL = [ // [naam Darwin, nu, lon, lat, rx (graden), ry, hoek]
  ['Albemarle', 'Isabela', -91.15, -0.45, 0.32, 0.62, 0.25], ['Narborough', 'Fernandina', -91.55, -0.37, 0.16, 0.14, 0], ['James', 'Santiago', -90.75, -0.22, 0.17, 0.12, -0.3], ['Indefatigable', 'Santa Cruz', -90.35, -0.65, 0.2, 0.16, 0],
  ['Chatham', 'San Cristóbal', -89.45, -0.85, 0.2, 0.09, -0.5], ['Charles', 'Floreana', -90.45, -1.28, 0.1, 0.08, 0], ['Hood', 'Española', -89.68, -1.38, 0.1, 0.05, -0.3], ['Abingdon', 'Pinta', -90.75, 0.58, 0.05, 0.08, 0], ['Bindloe', 'Marchena', -90.47, 0.33, 0.07, 0.06, 0], ['Tower', 'Genovesa', -89.95, 0.32, 0.05, 0.04, 0]];
function x9galapagos(ctx, P, o = {}) { const { land = '#4A5A4A', rand = '#7E8E7A', nadruk = {} } = o; const [ox] = P(0, 0), sx = P(1, 0)[0] - ox, sy = P(0, 0)[1] - P(0, 1)[1];
  X9_GAL.forEach(([n, , lo, la, rx, ry, hk], i) => { const [px, py] = P(lo, la); ctx.save(); ctx.translate(px, py); ctx.rotate(hk); blob(ctx, 0, 0, rx * sx, ry * sy, 0.12, i * 1.7); const k = nadruk[n]; ctx.fillStyle = k || land; ctx.fill(); ctx.strokeStyle = k ? _lt(k, 0.35) : rand; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }); }

// ---------- landschap Patagonië / Galápagos (Macro nacht) ----------
function _x9vlak(ctx, P, k) { _x9pad(ctx, P); ctx.fillStyle = k; ctx.fill(); }
function x9vlakte(ctx, o = {}) { const { hor = 600 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hor - 120, W, 120);
  const golf = (y0, amp, f, ph) => { const P = []; for (let i = 0; i <= 24; i++) { const x = i / 24 * W; P.push([x, y0 + Math.sin(i / 24 * 6.283 * f + ph) * amp]); } P.push([W, H], [0, H]); return P; };
  _x9vlak(ctx, golf(hor - 14, 12, 1.3, 0.4), '#4A5A3E'); _x9vlak(ctx, golf(hor + 90, 10, 1.1, 2), '#56643F'); // droge steppe
  ctx.strokeStyle = rgba('#B8B07A', 0.35); ctx.lineWidth = 2; for (let i = 0; i < 60; i++) { const px = hash(i * 7) * W, py = hor + 40 + hash(i * 11) * (H - hor - 80); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 4, py - 12); ctx.moveTo(px, py); ctx.lineTo(px + 5, py - 10); ctx.stroke(); } }
function x9lava(ctx, o = {}) { const { hor = 560 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#1F4466'; ctx.fillRect(0, hor - 60, W, 80);
  vul(ctx, [[700, hor - 40], [980, hor - 260], [1120, hor - 290], [1300, hor - 200], [1600, hor - 60], [1700, hor - 40]], '#3E4650'); // vulkaankegel
  const golf = (y0, amp, f, ph) => { const P = []; for (let i = 0; i <= 24; i++) { const x = i / 24 * W; P.push([x, y0 + Math.sin(i / 24 * 6.283 * f + ph) * amp]); } P.push([W, H], [0, H]); return P; };
  _x9vlak(ctx, golf(hor + 4, 14, 1.2, 1), '#3A3A3C'); _x9vlak(ctx, golf(hor + 140, 12, 0.9, 3), '#46443E'); // lavagrond
  ctx.fillStyle = rgba('#8A8A80', 0.22); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.ellipse(hash(i * 5) * W, hor + 60 + hash(i * 9) * 400, 10 + hash(i) * 20, 4, 0, 0, 6.283); ctx.fill(); } }
function x9struik(ctx, x, y, s = 1, kleur = '#5F7A4E') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); lijn(ctx, [[0, 0], [-6, -30], [-20, -54]], '#5A4A3A', 4); lijn(ctx, [[-4, -24], [16, -50]], '#5A4A3A', 3);
  [[-22, -60, 22], [14, -56, 20], [-4, -70, 18], [-30, -44, 14], [24, -40, 14]].forEach(([a, b, r], i) => { blob(ctx, a, b, r, r * 0.8, 0.15, i); ctx.fillStyle = i % 2 ? kleur : _dk(kleur, 0.12); ctx.fill(); }); ctx.restore(); }

// ---------- opgraving bij Punta Alta: oever met lagen en botten (Macro) ----------
function x9oever(ctx, x, y, w, h) { const L = ['#8C7258', '#A8916A', '#7A6A5A', '#B8A07A', '#93805E']; const d = h / L.length;
  L.forEach((k, i) => { const P = []; for (let q = 0; q <= 12; q++) P.push([x + q / 12 * w, y + i * d + Math.sin(q * 0.9 + i * 1.7) * 5]); for (let q = 12; q >= 0; q--) P.push([x + q / 12 * w, y + (i + 1) * d + Math.sin(q * 0.9 + (i + 1) * 1.7) * 5 + (i === L.length - 1 ? 20 : 0)]); _x9pad(ctx, P); ctx.fillStyle = k; ctx.fill(); });
  ctx.fillStyle = rgba('#F2E6CC', 0.1); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.ellipse(x + hash(i * 3) * w, y + hash(i * 7) * h, 8 + hash(i) * 10, 2.5, 0, 0, 6.283); ctx.fill(); } }
// botten: Megatherium-schedel (lang, smal, tandeloze snuitpunt), dijbeen, pantserplaatjes (zeshoekig)
function x9bot(ctx, soort, x, y, s = 1, o = {}) { const { goud = false, rot = 0 } = o; const k = goud ? C.goud : '#D8CBB0', kr = goud ? _lt(C.goud, 0.3) : '#EFE6D2'; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (soort === 'schedel') { vul(ctx, [[-60, -6], [-40, -26], [0, -30], [40, -22], [70, -10], [84, -2], [70, 6], [30, 10], [10, 22], [-10, 26], [-30, 12], [-56, 8]], k, kr, 1.5); circ(ctx, -14, -10, 9, _dk(k, 0.4)); vul(ctx, [[0, 12], [34, 8], [30, 22], [6, 30]], _dk(k, 0.12)); }
  else if (soort === 'dijbeen') { vul(ctx, [[-70, -8], [-56, -16], [-40, -10], [40, -12], [60, -20], [74, -10], [70, 6], [56, 14], [40, 10], [-40, 12], [-58, 16], [-72, 6]], k, kr, 1.5); }
  else if (soort === 'plaat') { for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const px = i * 17 + (j % 2) * 8.5, py = j * 15; ctx.beginPath(); for (let q = 0; q < 6; q++) { const an = q * Math.PI / 3 + Math.PI / 6; ctx.lineTo(px + Math.cos(an) * 9, py + Math.sin(an) * 9); } ctx.closePath(); shape(ctx, k, _dk(k, 0.25), 1.5); } }
  ctx.restore(); }

// ---------- notitieboek met de 'I think'-boom (naar Notebook B, blz. 36; vereenvoudigd) ----------
function x9boek(ctx, x, y, w, h, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14, y - 10, w + 28, h + 20, 14); ctx.fillStyle = '#5A3E2E'; ctx.fill();
  roundRect(ctx, x, y, w, h, 6); ctx.fillStyle = '#EDE4CE'; ctx.fill(); ctx.strokeStyle = '#C9BC9C'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = rgba('#8FA0B5', 0.35); ctx.lineWidth = 1; for (let yy = y + 60; yy < y + h - 20; yy += 34) { ctx.beginPath(); ctx.moveTo(x + 24, yy); ctx.lineTo(x + w - 24, yy); ctx.stroke(); } ctx.restore(); }
function x9ithink(ctx, x, y, s = 1, o = {}) { const { groei = 1, inkt = '#3A3042', letters = true, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = inkt; ctx.lineCap = 'round'; ctx.lineWidth = 2.4;
  // vorm zoals de schets: '1' onderaan, stam die vertakt; levende takken lopen door, uitgestorven takken eindigen met een dwarsstreepje
  const T = [[0, 0, 0, -60], [0, -60, -50, -110], [0, -60, 40, -100], [-50, -110, -90, -140], [-50, -110, -40, -170], [40, -100, 20, -160], [40, -100, 110, -130], [-90, -140, -120, -190], [-90, -140, -70, -200], [20, -160, -10, -220], [20, -160, 50, -215], [110, -130, 150, -175], [110, -130, 120, -200], [-40, -170, -30, -205], [150, -175, 175, -215], [150, -175, 160, -230]];
  const n = Math.round(groei * T.length); for (let i = 0; i < n; i++) { const [a1, b1, a2, b2] = T[i]; ctx.beginPath(); ctx.moveTo(a1, b1); ctx.quadraticCurveTo((a1 + a2) / 2 + 6, (b1 + b2) / 2, a2, b2); ctx.stroke(); }
  const dood = [[-30, -205], [-120, -190], [160, -230], [50, -215], [120, -200]]; dood.forEach(([px, py], i) => { if (i < n - 10) { ctx.beginPath(); ctx.moveTo(px - 7, py); ctx.lineTo(px + 7, py); ctx.stroke(); } });
  ctx.font = 'italic 600 26px "Fraunces",Georgia,serif'; ctx.fillStyle = inkt; ctx.textAlign = 'center'; ctx.fillText('1', -14, 4);
  if (letters && groei >= 1) { [['A', -70, -210], ['B', -10, -238], ['C', 150, -246], ['D', 178, -222]].forEach(([l, px, py]) => ctx.fillText(l, px, py)); }
  ctx.font = 'italic 600 44px "Fraunces",Georgia,serif'; ctx.textAlign = 'left'; ctx.fillText('I think', -170, -270); ctx.restore(); }

// ---------- kleine objecten ----------
function x9brief(ctx, x, y, w, o = {}) { const { rot = 0, a = 1, zegel = true } = o; const h = w * 0.66; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -w / 2, -h / 2, w, h, 6); shape(ctx, '#E6DCC4', '#C9BC9C', 1.5);
  ctx.strokeStyle = rgba('#5A4E40', 0.55); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-w * 0.38, -h * 0.3 + i * h * 0.12); ctx.lineTo(w * (0.2 + 0.18 * hash(i)), -h * 0.3 + i * h * 0.12); ctx.stroke(); }
  if (zegel) circ(ctx, w * 0.32, h * 0.26, w * 0.07, '#A84A3A', '#C86A5A', 1.5); ctx.restore(); }
function x9origin(ctx, x, y, h, o = {}) { const { a = 1 } = o; const w = h * 0.64; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3E5A3E', '#5E7A5A', 2); // groene stoffen band, eerste druk
  ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; roundRect(ctx, x - w / 2 + 14, y - h + 14, w - 28, h - 28, 4); ctx.stroke();
  text(ctx, 'ON THE', x, y - h * 0.74, fTekst(Math.round(h * 0.06), 700), C.goud, 'center'); text(ctx, 'ORIGIN', x, y - h * 0.64, fTekst(Math.round(h * 0.09), 800), C.goud, 'center'); text(ctx, 'OF SPECIES', x, y - h * 0.55, fTekst(Math.round(h * 0.06), 700), C.goud, 'center');
  text(ctx, 'DARWIN', x, y - h * 0.22, fTekst(Math.round(h * 0.055), 700), C.goud, 'center'); ctx.restore(); }
// zeepok (Balanus): kegel van 6 kalkplaten met een klepje bovenop; vaste kreeftachtige
function x9zeepok(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[-30, 0], [-22, -34], [-10, -42], [10, -42], [22, -34], [30, 0]], '#C8C0AE', '#E6E0D2', 1.5); ctx.strokeStyle = '#9A9282'; ctx.lineWidth = 1.5; [-16, -5, 6, 17].forEach(px => { ctx.beginPath(); ctx.moveTo(px * 1.4, 0); ctx.lineTo(px * 0.7, -40); ctx.stroke(); }); vul(ctx, [[-10, -42], [0, -50], [10, -42]], '#8A8272'); ctx.restore(); }
// rotsduif (oervorm van de tamme duif), zijaanzicht, ±32 cm; s = px per cm
function x9duif(ctx, x, y, s = 1, o = {}) { const { kijk = 1, kleur = '#8C93A0' } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s * kijk, s);
  lijn(ctx, [[-1, -6], [-2, 0]], '#B8605A', 0.8); lijn(ctx, [[2, -6], [3, 0]], '#B8605A', 0.8);
  vul(ctx, [[-16, -14], [-6, -18], [6, -17], [12, -20], [14, -24], [18, -25], [19, -22], [16, -18], [12, -10], [4, -6], [-6, -7], [-14, -10]], kleur, _lt(kleur, 0.3), 0.4);
  vul(ctx, [[-14, -13], [-4, -16], [8, -15], [2, -10], [-10, -10]], _dk(kleur, 0.15)); lijn(ctx, [[-6, -13], [2, -12]], '#3A3A44', 0.8); lijn(ctx, [[-4, -11], [4, -11]], '#3A3A44', 0.8);
  vul(ctx, [[10, -19], [14, -14], [11, -12], [8, -15]], '#6E9A8A'); vul(ctx, [[18.6, -24], [21.5, -23], [18.6, -22.5]], '#3A3A40'); ctx.restore(); dierOog(ctx, x + kijk * 16.6 * s, y - 23.3 * s, Math.max(1.6, 0.9 * s), '#C86A3A'); }

// ---------- tijdlijn 1831–1859 (Schema) ----------
function x9tijdas(ctx, x, y, w, j0, j1, o = {}) { const X = (j) => x + (j - j0) / (j1 - j0) * w; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let j = Math.ceil(j0 / 5) * 5; j <= j1; j += 5) { ctx.beginPath(); ctx.moveTo(X(j), y - 8); ctx.lineTo(X(j), y + 8); ctx.stroke(); metaText(ctx, String(j), X(j), y + 46, C.text2, 'center', 28); } return X; }
function x9mijl(ctx, X, j, y, titel, kleur = C.text, o = {}) { const px = X(j), { boven = true, h = 70 } = o; ctx.strokeStyle = kleur; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y + (boven ? -h : h)); ctx.stroke(); circ(ctx, px, y, 8, kleur);
  text(ctx, titel, px, y + (boven ? -h - 14 : h + 40), fTekst(36, 600), kleur, 'center'); }

// ---------- zaal van de Linnean Society, 1 juli 1858 (Schema-interieur) ----------
function x9stoel(ctx, x, y, s = 1, kaart = null) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[-30, -150], [30, -150], [32, -70], [-32, -70]], '#6A4A3A'); vul(ctx, [[-40, -70], [40, -70], [40, -56], [-40, -56]], '#7A5A44');
  lijn(ctx, [[-34, -56], [-36, 0]], '#5A3E30', 7); lijn(ctx, [[34, -56], [36, 0]], '#5A3E30', 7); ctx.restore(); if (kaart) { roundRect(ctx, x - 96, y - 74 * s - 64, 192, 46, 8); shape(ctx, '#E6DCC4', '#C9BC9C', 1.5); text(ctx, kaart, x, y - 74 * s - 32, fTekst(30, 700), '#2A2A30', 'center'); } }
function x9lessenaar(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); _x9pad(ctx, [[-46, 0], [-34, -120], [34, -120], [46, 0]]); shape(ctx, '#5A4030', '#7A5A44', 2); _x9pad(ctx, [[-64, -118], [64, -118], [58, -142], [-58, -142]]); shape(ctx, '#6A4A38', '#8A6A50', 2); ctx.restore(); }
function x9sloep(ctx, x, y, w) { _x9pad(ctx, [[x - w / 2, y - w * 0.14], [x + w / 2, y - w * 0.14], [x + w * 0.4, y + w * 0.06], [x - w * 0.42, y + w * 0.06]]); shape(ctx, '#6A4A34', '#8A6A4E', 2); lijn(ctx, [[x - w * 0.46, y - w * 0.1], [x + w * 0.46, y - w * 0.1]], '#4A3424', 3); }

// ---------- vinken voor film 9 (review 24 okt): grondvinkpop uit pop_vogels zonder borststreepjes + zangervink ----------
// Maten: grote grondvink 15–16 cm, middelste grondvink ±12,5 cm (snavelhoogte ±9,6 mm), groene zangervink ±10 cm met dunne spitse snavel.
// De pop werkt in grondvink-eenheden; lichaamsgrootte via s (verhouding 10 : 12,5 : 15,5).
(function () { const D = VogelZang.DEFS;
  D.x9grondvink = (o) => { const d = D.grondvink(Object.assign({}, o, { kleed: 'vrouw' })); d.naam = 'x9grondvink';
    const rl = d.rompLagen; d.rompLagen = (sx, sy) => rl(sx, sy).filter(l => !l.fn); d.kop.lagen = d.kop.lagen.filter(l => !l.lijn); return d; };
  D.x9zangervink = (o) => { const d = D.x9grondvink(o); d.naam = 'x9zangervink'; const pal = { basis: '#7A7A58', rug: '#6A6C4C', buik: '#C8C2A0', keel: '#BEB896', snv: '#3A3630' };
    d.pal = Object.assign({}, d.pal, pal); d.kop.kl = '#74744E';
    d.kop.na = (ctx) => { vul(ctx, [[20, -6], [36, -4], [52, 0], [36, 3], [20, 5]], pal.snv, '#6A645A', 1); lijn(ctx, [[21, 0], [50, 0.5]], '#1A1814', 1); dierOog(ctx, 10, -6, 4.4, '#2A1A10', { rand: '#E2DCC0' }); };
    return d; };
})();
function x9vink(ctx, soort, x, y, cm, o = {}) { const s = cm / 12.5 * (o.s || 1); const naam = soort === 'zanger' ? 'x9zangervink' : 'x9grondvink';
  const sn = soort === 'groot' ? 15 : soort === 'middel' ? 9.6 : 9.6; return VogelZang.teken(naam, ctx, x, y, s, Object.assign({ snavel: sn * (12.5 / cm) }, o)); }
