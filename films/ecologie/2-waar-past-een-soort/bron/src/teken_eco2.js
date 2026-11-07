// teken_eco2.js — Ecologie v2 · film 2 Waar past een soort? — film-eigen tekeningen (voorvoegsel e2), 29 okt 2026.
// Laadt na teken_eco1.js (terugval voor lib_eco-functies) en de pop_eco-bestanden.
// Maten: steenvlieglarve ± 22 mm, eendagsvlieglarve ± 9 mm, rode muggenlarve ± 15 mm (pop_eco_klein2, s = px per cm);
// pimpelmees 11,5 cm (ecoPimpelmees, s = px per cm); koolmees 14 cm (koolmees() uit pop_vogels: ± 273 px per eenheid s → s = 14/273 × px per cm).
const E2 = { helder: '#2E6FBF', troebel: '#4E6A5A', troebelD: '#3E5648', slib: '#4A3E30', grind: '#8A8478', grindD: '#6E6A60', steen: '#7A7E86', steenD: '#5E626A', steenL: '#9AA0A8',
  eik: '#5FA86E', eikD: '#4A8A58', eikL: '#7FC48F', stam: '#6A5444', stamD: '#4E3E32', bak: '#E8E6E0' };
const e2KM = (pxcm) => 14 / 273 * pxcm; // koolmees-schaal
function e2Koolmees(ctx, x, y, pxcm, o = {}) { koolmees(ctx, x, y, e2KM(pxcm), o); }

// ---------- beek in doorsnede (Macro): soort 'snel' (helder, grind, stenen) of 'traag' (troebel, slib) ----------
function e2Beek(ctx, x, y, w, h, o = {}) { const { soort = 'snel', a = 1, oever = true, stenen = true, seed = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const sn = soort === 'snel'; const wl = y + h * 0.18; // waterlijn
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x, y, w, wl - y);
  if (oever) { vul(ctx, [[x - 20, wl + 4], [x + w * 0.12, wl - h * 0.1], [x + w * 0.3, wl - h * 0.06], [x + w * 0.62, wl - h * 0.12], [x + w * 0.85, wl - h * 0.07], [x + w + 20, wl - h * 0.1], [x + w + 20, wl + 4]], C.bgMacroHill); }
  ctx.fillStyle = sn ? E2.helder : E2.troebel; ctx.fillRect(x, wl, w, h - (wl - y));
  // bodem
  const by = y + h * 0.82; const B = [[x - 20, by]]; for (let i = 0; i <= 12; i++) B.push([x + i * w / 12, by + Math.sin(i * 1.3 + seed) * h * 0.015]); B.push([x + w + 20, y + h + 10], [x - 20, y + h + 10]); vul(ctx, B, sn ? E2.grind : E2.slib);
  if (sn) { for (let i = 0; i < 40; i++) { const gx = x + hash(seed * 7 + i) * w, gy = by + 10 + hash(seed * 3 + i * 2.1) * (y + h - by - 14); circ(ctx, gx, gy, 3 + hash(i * 5.3) * 5, i % 2 ? E2.grindD : '#9C968A'); }
    if (stenen) [[0.22, 0.09, 0.07], [0.55, 0.12, 0.08], [0.82, 0.07, 0.06]].forEach(([u, rw, rh], i) => { const sx = x + u * w, sy = by + 4; vul(ctx, [[sx - rw * w, sy], [sx - rw * w * 0.8, sy - rh * h], [sx - rw * w * 0.1, sy - rh * h * 1.35], [sx + rw * w * 0.7, sy - rh * h * 1.05], [sx + rw * w, sy]], i % 2 ? E2.steenD : E2.steen, E2.steenL, 1.5); });
    // stroming
    ctx.strokeStyle = rgba('#9ACBEA', 0.55); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const sx = x + ((i * 0.37 + seed * 0.13) % 1) * w * 0.85, sy = wl + 30 + (i * 53) % (by - wl - 80); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + 50, sy - 8, sx + 110, sy); ctx.stroke(); pijl(ctx, sx + 100, sy, sx + 130, sy, rgba('#9ACBEA', 0.7), 1, 3, 10); }
  } else { for (let i = 0; i < 26; i++) { const gx = x + hash(seed * 9 + i) * w, gy = wl + 20 + hash(seed + i * 3.3) * (by - wl - 30); circ(ctx, gx, gy, 2 + hash(i) * 3, rgba('#7E8E6E', 0.5)); } // zwevende deeltjes
    for (let i = 0; i < 4; i++) { const sx = x + (0.1 + i * 0.25) * w, sy = by + 6; ctx.fillStyle = '#5A4C3A'; ctx.beginPath(); ctx.ellipse(sx, sy, 50, 12, 0, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = sn ? '#7FB0E0' : '#7E9A86'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, wl); ctx.lineTo(x + w, wl); ctx.stroke();
  ctx.restore(); ctx.restore(); return { wl, by }; }

// ---------- schema ----------
// horizontale meter: label links, schaal met wijzer (waarde 0..1), optioneel kleurband (tolerantie)
function e2Meter(ctx, x, y, w, o = {}) { const { naam = '', v = 0.5, kleur = C.goud, eenheid = '', waarde = '', band = null } = o;
  text(ctx, naam, x, y - 22, fTekst(36, 600), C.text, 'left');
  roundRect(ctx, x, y, w, 22, 11); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
  if (band) { roundRect(ctx, x + band[0] * w, y, (band[1] - band[0]) * w, 22, 11); shape(ctx, rgba(C.groen, 0.35)); }
  const px = x + v * w; ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(px, y - 6); ctx.lineTo(px - 14, y - 26); ctx.lineTo(px + 14, y - 26); ctx.closePath(); ctx.fill(); circ(ctx, px, y + 11, 13, kleur, C.bgSchema, 3);
  if (waarde) text(ctx, waarde, x + w, y + 70, fTekst(36, 800), kleur, 'right'); }
// optimumkromme: P(u) = groei als functie van u (0..1 over de as); band = [min, max] in u
function e2Kromme(ctx, x, y, w, h, o = {}) { const { min = 0.3, max = 0.95, opt = 0.7, kleur = C.okerD, a = 1, vul2 = true, lw = 6, piek = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  const f = (u) => { if (u <= min || u >= max) return 0; const z = u < opt ? (opt - u) / (opt - min) : (u - opt) / (max - opt); return (Math.exp(-4.5 * z * z) - Math.exp(-4.5)) / (1 - Math.exp(-4.5)) * piek; };
  const P = []; for (let i = 0; i <= 80; i++) { const u = min + (max - min) * i / 80; P.push([x + u * w, y - f(u) * h]); }
  if (vul2) { ctx.beginPath(); ctx.moveTo(x + min * w, y); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(x + max * w, y); ctx.closePath(); ctx.fillStyle = rgba(kleur, 0.18); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.restore(); return { X: (u) => x + u * w }; }
function e2Vlijn(ctx, x, y0, y1, kleur, lbl, o = {}) { ctx.save(); ctx.setLineDash(o.dash || [12, 10]); lijn(ctx, [[x, y0], [x, y1]], kleur, 4); ctx.restore(); if (lbl) text(ctx, lbl, x, y1 - 16, fTekst(36, 700), kleur, 'center'); }
// tabel in examenstijl
function e2Tabel(ctx, x, y, kol, rijen, o = {}) { const { bw = [460, 300, 300], rh = 74, kleuren = null } = o; let yy = y;
  const rij = (cells, kop, ri) => { let xx = x; cells.forEach((c, i) => { roundRect(ctx, xx, yy, bw[i] - 6, rh - 6, 8); const k = kleuren && ri != null ? kleuren[ri][i] : null; shape(ctx, kop ? rgba(C.fill, 1) : (k ? rgba(k, 0.35) : rgba(C.fill, 0.55)), C.line, 1.2);
      text(ctx, c, xx + (i ? (bw[i] - 6) / 2 : 22), yy + rh / 2 + 10, fTekst(i || kop ? 36 : 38, kop ? 700 : 600), C.text, i ? 'center' : 'left'); xx += bw[i]; }); yy += rh; };
  rij(kol, true); rijen.forEach((r, i) => rij(r, false, i)); return yy; }
// ton met duigen (wet van het minimum): duigen = [[naam, hoogte 0..1]]
function e2Ton(ctx, x, y, w, h, duigen, o = {}) { const { water = null, laag = null } = o; const n = duigen.length, dw = w / n;
  const minH = Math.min(...duigen.map(d => d[1])); const wy = y - (water != null ? water : minH) * h;
  ctx.fillStyle = rgba(C.teal, 0.55); ctx.fillRect(x + 6, wy, w - 12, y - wy);
  const li = duigen.findIndex(d => (laag ? d[0] === laag : d[1] === minH));
  duigen.forEach(([naam, hh], i) => { const bx = x + i * dw; roundRect(ctx, bx + 3, y - hh * h, dw - 6, hh * h, 8); const isL = i === li; shape(ctx, isL ? rgba(C.koraal, 0.9) : '#8A6A4A', isL ? _lt(C.koraal, 0.3) : '#B89670', 2); });
  [0.12, 0.36].forEach(u => { ctx.fillStyle = '#5A606A'; ctx.fillRect(x - 6, y - u * h - 4, w + 12, 8); });
  ctx.fillStyle = rgba(C.teal, 0.32); ctx.fillRect(x + 3, wy, w - 6, y - wy); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 6, wy); ctx.lineTo(x + w + 6, wy); ctx.stroke(); text(ctx, 'waterpeil', x - 20, wy + 12, fTekst(36, 700), C.teal, 'right');
  duigen.forEach(([naam, hh], i) => { const bx = x + i * dw; ctx.save(); ctx.translate(bx + dw / 2 + 12, y - 16); ctx.rotate(-Math.PI / 2); text(ctx, naam, 0, 0, fTekst(Math.min(36, dw * 0.45), 700), C.text, 'left'); ctx.restore(); });
  // water stroomt over de laagste duig naar buiten (voor de ton langs)
  const lx = x + li * dw + dw / 2; ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, wy - 4); ctx.quadraticCurveTo(lx + dw * 0.9, wy - 30, lx + dw * 1.1, wy + 60); ctx.stroke(); }
// reageerbuis met pantoffeldiertjes (bovenaanzicht vereenvoudigd) en een groeilijntje erboven
function e2Paramecium(ctx, x, y, r = 14, kleur = '#C9B896', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.7, 0, 0, 6.283); ctx.fillStyle = rgba(kleur, 0.85); ctx.fill(); ctx.strokeStyle = _lt(kleur, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(r * 0.2, r * 0.05, r * 0.45, r * 0.22, 0.3, 0, 6.283); ctx.fillStyle = rgba('#5A4E3E', 0.6); ctx.fill(); ctx.restore(); }
function e2Buis(ctx, x, y, h, o = {}) { const { soorten = [], titel = '', lijnen = [] } = o; const w = 120;
  ctx.fillStyle = rgba(C.teal, 0.18); roundRect(ctx, x - w / 2, y - h, w, h, 50); ctx.fill(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - 50); ctx.arc(x, y - 50, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  soorten.forEach(([n, kl, zone], k) => { for (let i = 0; i < n; i++) { const yy = zone === 'onder' ? y - 30 - hash(i * 3 + k) * h * 0.3 : y - h * 0.25 - hash(i * 7 + k) * h * 0.6; e2Paramecium(ctx, x - 30 + hash(i * 5.1 + k * 2) * 60, yy, 9, kl, hash(i + k) * 3); } });
  if (titel) text(ctx, titel, x, y + 60, fTekst(36, 700), C.text, 'center');
  // groeilijntjes boven de buis
  const gx = x - 90, gy = y - h - 40, gw = 180, gh = 130; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  lijnen.forEach(([kl, eind]) => { const P = []; for (let i = 0; i <= 20; i++) { const u = i / 20; let v = 0.85 / (1 + Math.exp(-(u - 0.3) * 12)); if (eind === 'weg') v = v * Math.max(0, 1 - Math.max(0, u - 0.45) * 2.6); P.push([gx + u * gw, gy - v * gh]); } lijn(ctx, P, kl, 5); }); }
// nestkast met invlieggat (diameter in mm, s = px per cm)
function e2Nestkast(ctx, x, y, s, gat = 28) { const w = 15 * s, h = 25 * s; ctx.save(); vul(ctx, [[x - w / 2, y], [x - w / 2, y - h], [x, y - h - 4 * s], [x + w / 2, y - h], [x + w / 2, y]], '#8A6A4A', '#6A4E36', 2);
  vul(ctx, [[x - w * 0.62, y - h + 2], [x, y - h - 6 * s], [x + w * 0.62, y - h + 2], [x + w * 0.62, y - h + 2 * s], [x, y - h - 4 * s], [x - w * 0.62, y - h + 2 * s]], '#5E626A');
  circ(ctx, x, y - h * 0.62, gat / 20 * s, '#1A120C'); ctx.restore(); }
// eik met dikke takken en dunne buitentwijgen (voorjaar); x,y = voet, s = schaal (s 1 → boom ± 900 px)
function e2Eik(ctx, x, y, s = 1, o = {}) { const { seed = 2, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const T = (ax, ay, an, L, d, n) => { if (n === 0 || L < 8) return; const bx = ax + Math.cos(an) * L, by = ay + Math.sin(an) * L; lijn(ctx, [[ax, ay], [bx, by]], n > 3 ? E2.stam : E2.stamD, d);
    T(bx, by, an - 0.42 - hash(seed + n * 3 + ax) * 0.2, L * 0.72, d * 0.62, n - 1); T(bx, by, an + 0.38 + hash(seed + n * 5 + ay) * 0.2, L * 0.7, d * 0.62, n - 1); };
  const blad = (n, kl, al, sz) => { for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + (hash(seed + i * 1.3 + sz) - 0.5) * 2.7, r = (150 + hash(i * 3.1 + sz) * 340) * s; const cx = x + Math.cos(an) * r, cy = y - 360 * s + Math.sin(an) * r * 0.8;
    ctx.fillStyle = rgba(kl, al); ctx.beginPath(); ctx.ellipse(cx, cy, 90 * s * sz, 62 * s * sz, an, 0, 6.283); ctx.fill(); } };
  blad(30, E2.eikD, 1, 1.3); // achterste bladlaag, dicht
  vul(ctx, [[x - 40 * s, y], [x - 28 * s, y - 330 * s], [x + 28 * s, y - 330 * s], [x + 40 * s, y]], E2.stam, E2.stamD, 2);
  T(x, y - 320 * s, -Math.PI / 2 - 0.55, 190 * s, 34 * s, 4); T(x, y - 320 * s, -Math.PI / 2 + 0.55, 190 * s, 34 * s, 4); T(x, y - 320 * s, -Math.PI / 2, 160 * s, 28 * s, 4);
  blad(18, E2.eik, 0.9, 0.8); blad(10, E2.eikL, 0.8, 0.55); // voorste lagen: jong voorjaarsblad
  ctx.restore(); }
// dunne twijg en dikke tak (close-up voor de mezen); P = punten
function e2Twijg(ctx, P, dik, kleur = E2.stamD) { lijn(ctx, P, kleur, dik); }
// rups (kleine of grote)
function e2Rups(ctx, x, y, L, kleur = '#7FA85A', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); for (let i = 0; i < 9; i++) circ(ctx, -L / 2 + i * L / 8, Math.sin(i * 0.9) * L * 0.04, L * 0.085, i === 8 ? _dk(kleur, 0.3) : kleur, _dk(kleur, 0.25), 1); ctx.restore(); }
function e2Spin(ctx, x, y, r) { ctx.save(); ctx.strokeStyle = '#3A3028'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { const a = -0.9 + i * 0.6; [1, -1].forEach(k => { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + k * r * 1.2, y - r * Math.cos(a), x + k * r * 2, y + r * Math.sin(a) * 1.4); ctx.stroke(); }); } circ(ctx, x, y, r * 0.7, '#4A3E30'); circ(ctx, x, y + r * 0.9, r, '#5A4C3A'); ctx.restore(); }
// witte sorteerbak met larven (s = px per cm)
function e2Bak(ctx, x, y, w, h, s, o = {}) { roundRect(ctx, x, y, w, h, 18); shape(ctx, E2.bak, '#B8BCC4', 3); ctx.fillStyle = rgba('#A8C8DC', 0.35); roundRect(ctx, x + 10, y + 14, w - 20, h - 24, 12); ctx.fill();
  const L = o.larven || [['s', 0.25, 0.4], ['e', 0.55, 0.35], ['m', 0.75, 0.65], ['s', 0.35, 0.75]];
  L.forEach(([k, u, v], i) => { const lx = x + u * w, ly = y + v * h; if (k === 's') ecoSteenvlieglarve(ctx, lx, ly, s, { houding: 'boven' }); else if (k === 'e') ecoEendagsvlieglarve(ctx, lx, ly, s, { houding: 'boven' }); else ecoMuggenlarve(ctx, lx, ly, s, { houding: 'boven' }); }); }
// forel (beekforel) zij-aanzicht, vlak, met stippen; s = px per cm (± 30 cm)
function e2Forel(ctx, x, y, s = 3, o = {}) { const { kijk = 1, a = 1 } = o; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round';
  const L = [[-15, 0], [-12, -2.6], [-4, -4.4], [4, -4.2], [10, -3.0], [14, -1.4], [15.2, 0], [14, 1.3], [10, 2.6], [2, 3.6], [-6, 3.2], [-12, 1.8]];
  vul(ctx, [[-14, 0], [-19, -4.2], [-18.4, 0], [-19, 4.2]], '#7A7058', null); vul(ctx, L, '#9A8C68', '#6E644C', 0.15);
  binnen(ctx, L, () => { vul(ctx, [[-16, 0.8], [0, 1.5], [16, 0.6], [16, 5], [-16, 5]], '#D8C9A0'); vul(ctx, [[-16, -2], [0, -4.4], [16, -2.2], [16, -6], [-16, -6]], '#6E6A50');
    for (let i = 0; i < 18; i++) circ(ctx, -11 + hash(i * 3.1) * 22, -3 + hash(i * 1.7) * 3.6, 0.38, i % 3 ? '#3A2E24' : '#C8503A'); });
  vul(ctx, [[-2, -4.3], [1, -6.6], [4, -4.2]], '#7A7058'); vul(ctx, [[3, 3.2], [5, 5.2], [6.5, 2.8]], '#8A7C5C'); vul(ctx, [[-8, 2.8], [-6, 4.6], [-4.5, 3.0]], '#8A7C5C');
  lijn(ctx, [[10.5, -2.4], [11, 0.4], [10.6, 2.2]], '#5E5440', 0.25); circ(ctx, 12.6, -1.1, 0.65, '#E0D8B0'); circ(ctx, 12.7, -1.1, 0.38, '#140E0A');
  ctx.restore(); }
// steenvlieglarve close-up onderkant met kieuwbosjes (Micro, schematisch)
function e2Kieuwen(ctx, x, y, s) { ecoSteenvlieglarve(ctx, x, y, s, { houding: 'boven' }); ctx.save(); ctx.strokeStyle = '#E8DCC0'; ctx.lineWidth = Math.max(2, s * 0.03);
  for (let k = 0; k < 3; k++) for (let i = 0; i < 7; i++) [1, -1].forEach(d => { const bx = x - s * 0.2 + k * s * 0.22, by = y; ctx.beginPath(); ctx.moveTo(bx, by + d * s * 0.12); ctx.lineTo(bx + (i - 3) * s * 0.025, by + d * s * (0.25 + i * 0.012)); ctx.stroke(); });
  ctx.restore(); }
function e2Bolletjes(ctx, x, y, w, h, n, kleur = C.teal, seed = 1) { for (let i = 0; i < n; i++) circ(ctx, x + hash(seed * 11 + i * 1.3) * w, y + hash(seed * 5 + i * 2.7) * h, 7, rgba(kleur, 0.85), _lt(kleur, 0.3), 1.5); }
// glas water (zuurstof oplossen)
function e2Glas(ctx, x, y, w, h, n, label, kleurW = C.teal) { ctx.fillStyle = rgba(kleurW, 0.25); ctx.fillRect(x, y - h * 0.85, w, h * 0.85); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y - h); ctx.stroke();
  e2Bolletjes(ctx, x + 14, y - h * 0.8, w - 28, h * 0.75, n, C.teal, n); if (label) text(ctx, label, x + w / 2, y + 52, fTekst(40, 700), C.text, 'center'); }
// split-screen scheiding
function e2Split(ctx, x = W / 2) { ctx.fillStyle = C.bgSchema; ctx.fillRect(x - 5, 0, 10, H); ctx.fillStyle = C.goud; ctx.fillRect(x - 1.5, 110, 3, H - 110); }
