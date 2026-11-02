// Wat word jij? · Tuin- en landschapsinrichting 2 · Natuur in de stad — eigen tekeningen (testvel v1, 1 nov 2026).
// Seriekleuren (script v2): groen = plant en blad, oker = steen, asfalt, tegels, teal = water en verdamping,
// koraal = heet en 'let op', goud = focus. Geen warmtebeeld (infrarood toont het oppervlak; de 7 °C gaat over de lucht).
// Maatvoering waar het telt: s = 1 → 200 px per meter (meethut, lantaarnpaal, boom, persoon 1,65 m = 330 px).
// Bronnen voor vormen: KNMI 'Uitleg: temperatuur' (wit kastje met wanden als een open jaloezie, 1,5 m boven een open
// grasveld), Sustainable Technologies wiki 'Green roof construction' (lagen extensief groen dak; substraat 10–15 cm),
// STOWA/VRT (wadi = verlaagd beplant terrein op het laagste punt), BWARS + Gedling CT (asbij Andrena cineraria: 9–15 mm,
// achterlijf glanzend blauwzwart, grijswitte haarbanden voor en achter op het borststuk, nestelt in de grond),
// Fortunović e.a. (CROSBI 1141630: hoofdgang eerst verticaal, dan schuin; cellen schuin rond de hoofdgang, ingang onder
// een hoopje zand). Alle functies tekenen rond (x, y); bewegende delen via o.t (s) of een voortgang 0..1.

// ---------- hulpjes ----------
const _tu2Dk = (hex, k = 0.25) => _mixHex(hex, '#000000', k), _tu2Lt = (hex, k = 0.25) => _mixHex(hex, '#FFFFFF', k);
const TU2 = { steen: '#B0905A', steenD: '#8A6E44', voeg: '#5E4A32', zand: '#C9AE7A', grond: '#5A4632', humus: '#3A2C22', humusR: '#4E3C2E',
  gras: '#5E9E5A', grasD: '#3F7A48', kroon: '#4E8A54', kroonD: '#3A6E44', stam: '#6A5240', weiland: '#3E5A5E', asfalt: '#4A4A50' };
function _tu2Pad(ctx, pts, dicht = true) { // Catmull-Rom door punten (zoals bioPad)
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]); const N = dicht ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = dicht || i > 0 ? p0 : p1, q3 = dicht || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
function _tu2Op(pts, u) { // punt + hoek op fractie u van een polylijn
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let d = clamp(u, 0, 1) * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i] || i === L.length - 1) { const f = L[i] ? d / L[i] : 0;
    return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f), Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0])]; } d -= L[i]; } return [pts[0][0], pts[0][1], 0]; }
// golvend warmtepijltje (koraal) omhoog vanaf (x, y), lengte L
function tu2_warmtePijl(ctx, x, y, L, a = 1, t = 0, ang = -Math.PI / 2, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2);
  ctx.strokeStyle = C.koraal; ctx.fillStyle = C.koraal; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 20; i++) { const u = i / 20, py = -u * L, px = Math.sin(u * 3 * Math.PI + t * 6) * L * 0.08; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  const tx = Math.sin(3 * Math.PI + t * 6) * L * 0.08; ctx.beginPath(); ctx.moveTo(tx, -L - 10); ctx.lineTo(tx - 9, -L + 4); ctx.lineTo(tx + 9, -L + 4); ctx.closePath(); ctx.fill(); ctx.restore(); }
// waterdruppel; o.focus = goud omrand (één druppel volgen, C8)
function tu2_druppel(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x, y - r * 1.7); ctx.bezierCurveTo(x + r * 0.35, y - r * 0.9, x + r, y - r * 0.35, x + r, y + r * 0.15); ctx.arc(x, y + r * 0.15, r, 0, Math.PI); ctx.bezierCurveTo(x - r, y - r * 0.35, x - r * 0.35, y - r * 0.9, x, y - r * 1.7); ctx.closePath();
  shape(ctx, rgba(C.teal, 0.85), o.focus ? C.goud : _tu2Lt(C.teal, 0.35), o.focus ? Math.max(3, r * 0.16) : 1.5);
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.beginPath(); ctx.ellipse(x - r * 0.35, y - r * 0.1, r * 0.16, r * 0.3, 0.3, 0, 6.283); ctx.fill(); ctx.restore(); }
// regenbui: schuine streepjes tussen x0..x1, y0..y1 (deterministisch per t)
function tu2_bui(ctx, x0, x1, y0, y1, o = {}) { const a = o.a == null ? 1 : o.a, n = o.n || 60, t = o.t || 0, hard = o.hard == null ? 1 : o.hard; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.teal, 0.75); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; const L = 26 + 20 * hard;
  for (let i = 0; i < n; i++) { const px = x0 + hash(i * 3 + 1) * (x1 - x0), ph = (hash(i * 3 + 2) + t * (1.2 + hard)) % 1, py = y0 + ph * (y1 - y0);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - L * 0.25, py + L); ctx.stroke(); } ctx.restore(); }

// ---------- infraroodthermometer (zijaanzicht, lens naar rechts) ----------
// o.waarde = tekst op het scherm ('50 °C'), o.kleur = kleur van de waarde, o.doel = [x, y]: stippellijn + meetvlekje (oppervlak!)
function tu2_irThermometer(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1;
  if (o.doel && (o.straal == null || o.straal > 0.01)) { ctx.save(); ctx.globalAlpha *= a * (o.straal == null ? 1 : o.straal); const lx = x + kijk * 150 * s, ly = y - 20 * s;
    ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(o.doel[0], o.doel[1]); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.ellipse(o.doel[0], o.doel[1], 22, 7, 0, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2.5; ctx.stroke(); circ(ctx, o.doel[0], o.doel[1], 4, C.koraal); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  // greep, trekker, loop
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-30, 0); ctx.lineTo(-12, 120); ctx.quadraticCurveTo(-30, 138, -58, 128); ctx.lineTo(-82, 20); ctx.closePath(); shape(ctx, '#3A4458', null);
  ctx.beginPath(); ctx.moveTo(-26, 8); ctx.quadraticCurveTo(-2, 30, -18, 52); ctx.lineWidth = 7; ctx.strokeStyle = '#E0B64A'; ctx.stroke(); // trekker
  roundRect(ctx, -110, -62, 250, 72, 26); shape(ctx, '#5A6478', null);
  roundRect(ctx, 118, -50, 34, 48, 10); shape(ctx, '#2A3040', null); circ(ctx, 146, -26, 13, '#121A26', '#8FA0B5', 2); // lens
  // scherm aan de achterkant (naar de kijker gedraaid)
  roundRect(ctx, -100, -54, 124, 56, 8); shape(ctx, '#C9DCC8', null);
  if (o.waarde) { ctx.save(); ctx.scale(kijk, 1); text(ctx, o.waarde, kijk * -38, -15, fTekst(36, 800), o.kleur || '#1A2740', 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- KNMI-meethut op een grasrandje ----------
// (x, yG) = grond onder het midden; wit kastje met jaloezieën op poten, thermometer op 1,5 m; o.maat = maatstreep '1,5 M'
function tu2_meethut(ctx, x, yG, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const m = 200 * s;
  // grasrandje
  if (o.gras !== false) { ctx.fillStyle = TU2.grasD; ctx.fillRect(x - 0.9 * m, yG - 4, 1.8 * m, 14); ctx.strokeStyle = TU2.gras; ctx.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const px = x - 0.88 * m + i * 0.044 * m + hash(i) * 4; ctx.beginPath(); ctx.moveTo(px, yG); ctx.lineTo(px + (hash(i + 7) - 0.5) * 8, yG - 8 - hash(i + 3) * 10); ctx.stroke(); } }
  // poten
  ctx.strokeStyle = '#D8DCE2'; ctx.lineWidth = Math.max(3, 0.04 * m); ctx.lineCap = 'butt';
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + d * 0.2 * m, yG); ctx.lineTo(x + d * 0.17 * m, yG - 1.25 * m); ctx.stroke(); }
  ctx.lineWidth = Math.max(2, 0.02 * m); ctx.beginPath(); ctx.moveTo(x - 0.19 * m, yG - 0.5 * m); ctx.lineTo(x + 0.19 * m, yG - 0.5 * m); ctx.stroke();
  // kast: 0,5 × 0,5 m, midden op 1,5 m
  const bw = 0.5 * m, bh = 0.5 * m, by = yG - 1.5 * m - bh / 2;
  ctx.beginPath(); ctx.moveTo(x - bw / 2 - 0.05 * m, by); ctx.lineTo(x, by - 0.12 * m); ctx.lineTo(x + bw / 2 + 0.05 * m, by); ctx.closePath(); shape(ctx, '#E8ECF0', null); // dakje
  ctx.fillStyle = '#F2F4F6'; ctx.fillRect(x - bw / 2, by, bw, bh);
  ctx.strokeStyle = '#AEB8C6'; ctx.lineWidth = Math.max(1.5, 0.012 * m); const nl = 9; // jaloezie: schuine lamellen
  for (let i = 0; i < nl; i++) { const ly = by + (i + 0.6) * bh / (nl + 0.4); ctx.beginPath(); ctx.moveTo(x - bw / 2 + 0.03 * m, ly); ctx.lineTo(x + bw / 2 - 0.03 * m, ly + 0.025 * m); ctx.stroke(); }
  ctx.strokeStyle = '#C8D0DA'; ctx.lineWidth = 2; ctx.strokeRect(x - bw / 2, by, bw, bh);
  ctx.fillStyle = '#E8ECF0'; ctx.fillRect(x - bw / 2 - 0.02 * m, by + bh, bw + 0.04 * m, 0.03 * m); // bodemplank
  if (o.maat) { ctx.save(); ctx.globalAlpha *= o.maat; const mx = x + bw / 2 + 0.22 * m; ctx.strokeStyle = C.goud; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(mx, yG); ctx.lineTo(mx, yG - 1.5 * m); ctx.moveTo(mx - 10, yG); ctx.lineTo(mx + 10, yG); ctx.moveTo(mx - 10, yG - 1.5 * m); ctx.lineTo(mx + 10, yG - 1.5 * m); ctx.stroke();
    ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x + bw / 2, yG - 1.5 * m); ctx.lineTo(mx, yG - 1.5 * m); ctx.stroke(); ctx.setLineDash([]);
    metaText(ctx, '1,5 m', mx + 16, yG - 0.75 * m + 10, C.goud, 'left', 28); ctx.restore(); }
  ctx.restore(); return { thermo: [x, yG - 1.5 * m], top: [x, by - 0.12 * m] }; }

// ---------- tegels in doorsnede met warmtepijltjes ----------
// (x, y) = midden van het tegeloppervlak, w = breedte; o.fase 0 = middag (zon erin), 1 = nacht (warmte eruit);
// o.warmte 0..1 kleurt de steen van oker naar koraal; o.t voor de pijltjes
function tu2_tegelsDoorsnede(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const fase = o.fase || 0, warm = o.warmte == null ? (1 - fase * 0.5) : o.warmte, t = o.t || 0, x0 = x - w / 2, th = 46, zh = 70, gh = 150;
  const st = _mixHex(TU2.steen, C.koraal, clamp(warm, 0, 1) * 0.85);
  ctx.fillStyle = TU2.grond; ctx.fillRect(x0, y + th + zh, w, gh); // ondergrond
  ctx.fillStyle = TU2.zand; ctx.fillRect(x0, y + th, w, zh); ctx.fillStyle = rgba('#000000', 0.12); for (let i = 0; i < w / 9; i++) circ(ctx, x0 + hash(i * 2.3) * w, y + th + 6 + hash(i * 5.1) * (zh - 12), 2.2, rgba('#5E4A32', 0.5)); // zandbed
  const n = Math.max(3, Math.round(w / 150)), tw = w / n; for (let i = 0; i < n; i++) { roundRect(ctx, x0 + i * tw + 3, y, tw - 6, th, 4); shape(ctx, st, null); } // tegels met voegen
  ctx.fillStyle = TU2.voeg; for (let i = 0; i <= n; i++) ctx.fillRect(x0 + i * tw - 3, y, 6, th);
  // middag: zonnestralen (goud) schuin in de steen
  const dag = 1 - fase; if (dag > 0.01) { ctx.save(); ctx.globalAlpha *= dag; for (let i = 0; i < 5; i++) { const px = x0 + w * (0.14 + i * 0.18), L = 150; const ph = ((t * 0.6 + i * 0.21) % 1);
      pijl(ctx, px - L * 0.45, y - L, px - 6, y - 8, C.goud, 1, 4, 16); ctx.save(); ctx.globalAlpha *= 0.85 * (1 - ph); pijl(ctx, px - 4, y + 4, px + 6, y + 6 + ph * (th - 10), C.goud, 1, 3, 10); ctx.restore(); } ctx.restore(); }
  // nacht: golvende warmtepijltjes langzaam omhoog uit de steen
  if (fase > 0.01) { for (let i = 0; i < 6; i++) { const px = x0 + w * (0.1 + i * 0.16), ph = (t * 0.25 + hash(i * 3)) % 1; tu2_warmtePijl(ctx, px, y - 10 - ph * 40, 70, fase * Math.sin(ph * Math.PI), t + i); } }
  ctx.restore(); }

// ---------- luchtthermometer (staafje met bol) ----------
// frac 0..1 vulling; o.vraag = vraagteken in plaats van vulling; o.waarde = tekstje ernaast
function tu2_luchtThermo(ctx, x, y, h, frac, kleur = C.koraal, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = h * 0.11, bw = r * 0.95;
  roundRect(ctx, x - bw / 2, y - h, bw, h, bw / 2); shape(ctx, '#121A26', '#AFC0D0', 2.5); circ(ctx, x, y + r * 0.4, r, '#121A26', '#AFC0D0', 2.5);
  if (!o.vraag) { const f = clamp(frac, 0, 1); circ(ctx, x, y + r * 0.4, r - 5, kleur); roundRect(ctx, x - bw / 2 + 5, y - (h - 10) * f, bw - 10, (h - 10) * f + 10, (bw - 10) / 2); ctx.fillStyle = kleur; ctx.fill(); }
  else text(ctx, '?', x, y - h * 0.35, fTitel(Math.max(44, h * 0.32)), C.goud, 'center');
  ctx.strokeStyle = rgba('#AFC0D0', 0.7); ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const ty = y - h * i / 5; ctx.beginPath(); ctx.moveTo(x + bw / 2, ty); ctx.lineTo(x + bw / 2 + 10, ty); ctx.stroke(); }
  if (o.waarde) text(ctx, o.waarde, x + bw / 2 + 20, y - h * clamp(frac, 0.1, 1) + 12, fTekst(36, 700), kleur, 'left');
  ctx.restore(); }

// ---------- stad 's nachts tussen weilanden, met luchtthermometers ----------
// (x, yG) = midden op de grondlijn, w = totale breedte; o.therm 0..1, o.vraag (beide '?'), o.verschil 0..1 (stad warmer)
function tu2_stadNacht(ctx, x, yG, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0, x0 = x - w / 2;
  // maan + sterren
  if (o.lucht !== false) { circ(ctx, x0 + w * 0.88, yG - 520, 34, '#E8E4D4'); circ(ctx, x0 + w * 0.88 + 14, yG - 528, 30, C.bgSchema); ctx.fillStyle = rgba('#F2F2EE', 0.6); for (let i = 0; i < 26; i++) circ(ctx, x0 + hash(i * 7) * w, yG - 360 - hash(i * 11) * 220, 1.5 + hash(i) * 1.2, rgba('#F2F2EE', 0.55)); }
  // weiland (koel, blauwgrijs) over de hele breedte, met heggen en een boerderijtje
  ctx.fillStyle = TU2.weiland; ctx.fillRect(x0, yG, w, 60); ctx.fillStyle = _tu2Dk(TU2.weiland, 0.25);
  for (const u of [0.05, 0.17, 0.82, 0.95]) { ctx.beginPath(); ctx.ellipse(x0 + w * u, yG - 8, 28, 14, 0, Math.PI, 0); ctx.fill(); }
  // stad: zachte koraalvlek (warm) achter de silhouetten; vlak, geen verloop
  const sw = w * 0.42; ctx.beginPath(); ctx.ellipse(x, yG - 40, sw * 0.62, 210, 0, Math.PI, 0); ctx.fillStyle = rgba(C.koraal, 0.13 + 0.06 * (o.verschil == null ? 1 : o.verschil)); ctx.fill();
  const B = [[-0.5, 70], [-0.42, 110], [-0.34, 90], [-0.27, 170], [-0.19, 120], [-0.11, 230], [-0.03, 150], [0.05, 260], [0.13, 140], [0.21, 190], [0.29, 100], [0.37, 130], [0.45, 80]];
  B.forEach(([u, h], i) => { const bx = x + u * sw, bwid = sw * 0.075; ctx.fillStyle = _mixHex('#3A3E4E', C.koraal, 0.22 + 0.08 * hash(i)); ctx.fillRect(bx - bwid / 2, yG - h, bwid, h);
    ctx.fillStyle = rgba(C.goud, 0.55); for (let k = 0; k < Math.floor(h / 34); k++) for (let j = 0; j < 2; j++) if (hash(i * 31 + k * 7 + j) > 0.55) ctx.fillRect(bx - bwid / 2 + 6 + j * (bwid / 2), yG - h + 14 + k * 34, 7, 10); });
  ctx.fillStyle = _mixHex(TU2.asfalt, C.koraal, 0.25); ctx.fillRect(x - sw / 2 - 20, yG, sw + 40, 60); // verharding
  // luchtthermometers boven stad en boven weiland
  const th = o.therm == null ? 1 : o.therm; if (th > 0.01) { const v = o.verschil == null ? 1 : o.verschil;
    tu2_luchtThermo(ctx, x, yG - 330, 170, 0.45 + 0.35 * v, C.koraal, { a: th, vraag: o.vraag });
    tu2_luchtThermo(ctx, x0 + w * 0.1, yG - 230, 170, 0.45, C.teal, { a: th, vraag: o.vraag }); }
  ctx.restore(); return { stad: [x, yG - 330], weiland: [x0 + w * 0.1, yG - 230] }; }

// ---------- huidmondje aan de onderkant van een blad (bladdoorsnede) ----------
// (x, y) = midden van de opening in de onderste opperhuid (onderkant blad); s = 1 → blad ± 300 px dik, 760 px breed.
// Lagen zoals bladDoorsnede in *Transport in planten* (scenes.js r. 200): opperhuid · palissadecellen · sponsparenchym met
// luchtholte boven de opening · onderste opperhuid met twee sluitcellen. o.open 0..1 (droogte = dicht).
// Watermoleculen (teal) verdampen uit de cellen in de luchtholte en gaan door de opening naar buiten (omlaag); elk neemt
// een koraal warmtepijltje mee (o.warmte 0..1). o.t animatie.
const _TU2_SPONS = [[-320, -150, 42], [-235, -165, 38], [-150, -150, 40], [150, -152, 40], [235, -166, 38], [320, -150, 42],
  [-290, -78, 36], [-200, -92, 34], [-128, -66, 30], [128, -68, 30], [200, -92, 34], [290, -78, 36], [-60, -168, 34], [60, -168, 34], [0, -176, 30]];
function tu2_huidmondje(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const open = o.open == null ? 1 : o.open, t = o.t || 0, W = 760, warm = o.warmte == null ? 1 : o.warmte;
  ctx.save(); roundRect(ctx, -W / 2, -300, W, 302, 18); ctx.clip();
  ctx.fillStyle = '#0F1622'; ctx.fillRect(-W / 2, -300, W, 302); // luchtruimte tussen de cellen
  for (let xx = -W / 2; xx < W / 2; xx += 70) { roundRect(ctx, xx + 2, -298, 66, 28, 6); shape(ctx, rgba(C.groen, 0.12), rgba(C.groen, 0.6), 1.5); } // bovenste opperhuid
  for (let xx = -W / 2; xx < W / 2; xx += 48) { roundRect(ctx, xx + 3, -264, 42, 70, 14); shape(ctx, rgba(C.groen, 0.24), rgba(C.groen, 0.75), 1.5); // palissade
    for (let k = 0; k < 3; k++) { ctx.fillStyle = C.chloro; ctx.beginPath(); ctx.ellipse(xx + 15 + (k % 2) * 16, -248 + k * 20, 6, 4, 0, 0, 6.283); ctx.fill(); } }
  _TU2_SPONS.forEach(([px, py, r], i) => { blob(ctx, px, py, r, r * 0.86, 0.06, i + 3); shape(ctx, rgba(C.groen, 0.2), rgba(C.groen, 0.7), 1.5);
    ctx.fillStyle = C.chloro; for (let k = 0; k < 3; k++) { const an = k * 2.1 + i; ctx.beginPath(); ctx.ellipse(px + Math.cos(an) * r * 0.55, py + Math.sin(an) * r * 0.5, 6, 4, an, 0, 6.283); ctx.fill(); } });
  for (let xx = -W / 2; xx < W / 2; xx += 76) { if (xx + 76 > -100 && xx < 100) continue; roundRect(ctx, xx + 2, -32, 72, 30, 8); shape(ctx, rgba(C.groen, 0.12), rgba(C.groen, 0.6), 1.5); } // onderste opperhuid
  ctx.restore();
  // sluitcellen in doorsnede: bolle cellen met een verdikte wand aan de kant van de opening; open = uit elkaar
  const g = 2 + 34 * open; for (const sd of [-1, 1]) { const cx = sd * (g + 30);
    ctx.beginPath(); ctx.ellipse(cx, -17, 32, 22, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.55), C.groen, 2);
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, -17, 32, 22, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = '#2F6A3A'; ctx.beginPath(); ctx.ellipse(cx - sd * 30, -17, 12, 26, 0, 0, 6.283); ctx.fill(); ctx.restore(); // dikke binnenwand
    ctx.fillStyle = C.chloro; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(cx + sd * 8 + (k - 1) * 8, -20 + (k % 2) * 8, 5, 3.5, 0, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = rgba('#E6E1D3', 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-W / 2, 0); ctx.lineTo(W / 2, 0); ctx.moveTo(-W / 2, -300); ctx.lineTo(W / 2, -300); ctx.stroke(); // waslaagje (cuticula)
  // watermoleculen: uit de luchtholte door de opening naar buiten (omlaag), met warmtepijltje
  const n = 7; for (let k = 0; k < n; k++) { const ph = (t * 0.3 + k / n + hash(k * 5) * 0.08) % 1, lat = hash(k * 5 + 2) - 0.5; let px, py;
    if (ph < 0.45) { const f = ph / 0.45; px = lerp(lat * 160, lat * g * 0.8, f); py = lerp(-130, -10, f); } else { const f = (ph - 0.45) / 0.55; px = lat * g * 0.8 + lat * f * 360; py = lerp(-10, 190, f); }
    const al = clamp(Math.min(ph * 6, (1 - ph) * 5), 0, 1) * clamp(open * 1.6 - 0.1, 0, 1); if (al <= 0.01) continue;
    waterMol(ctx, px, py, 11, al); if (ph > 0.45 && warm > 0.01) tu2_warmtePijl(ctx, px + 20, py + 14, 40, al * warm, t + k, Math.PI / 2 + lat * 1.2, 3.5); }
  if (open < 0.6) for (let k = 0; k < 5; k++) { const w2 = wander(k + 20, t, 8, 0.8); waterMol(ctx, -60 + k * 30 + w2.x, -90 + w2.y, 11, (0.6 - open) / 0.6); } // dicht: blijft binnen
  ctx.restore(); return { opening: [x, y], blad: [x, y - 150 * s] }; }

// ---------- boom met kroon, zonnestralen en schaduwvlek ----------
// (x, yG) = voet van de stam op de grond; boom ± 8 m hoog (s = 1 → 1600 px). o.zon 0..1 stralen, o.schaduw 0..1,
// o.droog 0..1 (kroon doffer, gescheurde grond), o.groei 0..1 (kleiner, 'een paar jaar later' = groter), o.t wiegen.
// Geen wortels in beeld (Beeldafspraken: alleen in een doorsnede).
const _TU2_KROON = [[0, -0.66, 0.30, 0.25], [-0.2, -0.6, 0.2, 0.17], [0.2, -0.6, 0.2, 0.17], [-0.13, -0.77, 0.2, 0.17], [0.14, -0.78, 0.19, 0.16], [0, -0.88, 0.17, 0.12], [-0.26, -0.5, 0.13, 0.11], [0.27, -0.5, 0.13, 0.11]];
function tu2_boom(ctx, x, yG, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const H = 1600 * s * (o.groei == null ? 1 : lerp(0.55, 1, o.groei)), droog = o.droog || 0, t = o.t || 0, wieg = Math.sin(t * 0.8) * H * 0.004;
  const kc = _mixHex(TU2.kroon, '#9A9A4E', droog * 0.7), kd = _mixHex(TU2.kroonD, '#7A7440', droog * 0.7);
  // schaduwvlek op de grond (iets naar rechts: zon linksboven)
  const sch = o.schaduw == null ? 1 : o.schaduw; if (sch > 0.01) { ctx.save(); ctx.globalAlpha *= sch; ctx.beginPath(); ctx.ellipse(x + H * 0.06, yG + H * 0.012, H * 0.3, H * 0.035, 0, 0, 6.283); ctx.fillStyle = rgba('#0A0F18', 0.55); ctx.fill(); ctx.restore(); }
  // grondstrook en gescheurde grond bij droogte (o.grond of droog > 0)
  if (o.grond || droog > 0.01) { ctx.fillStyle = _mixHex(TU2.grond, '#9A7A52', droog * 0.6); ctx.fillRect(x - H * 0.36, yG, H * 0.72, H * 0.045); }
  if (droog > 0.01) { ctx.save(); ctx.globalAlpha *= droog; ctx.strokeStyle = '#2A1E14'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    for (let i = 0; i < 11; i++) { const px = x - H * 0.33 + i * H * 0.062 + hash(i) * 10, py = yG + 4 + hash(i * 5) * H * 0.02; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 14, py + 8); ctx.lineTo(px + 26, py + 4); ctx.moveTo(px + 14, py + 8); ctx.lineTo(px + 18, py + 18); ctx.stroke(); } ctx.restore(); }
  // stam met eerste takken
  const sb = H * 0.035; ctx.beginPath(); ctx.moveTo(x - sb, yG); ctx.quadraticCurveTo(x - sb * 0.7, yG - H * 0.25, x - sb * 0.55 + wieg, yG - H * 0.45); ctx.lineTo(x + sb * 0.55 + wieg, yG - H * 0.45); ctx.quadraticCurveTo(x + sb * 0.7, yG - H * 0.25, x + sb, yG); ctx.closePath(); ctx.fillStyle = TU2.stam; ctx.fill();
  ctx.strokeStyle = TU2.stam; ctx.lineCap = 'round'; ctx.lineWidth = sb * 0.5; ctx.beginPath(); ctx.moveTo(x + wieg, yG - H * 0.42); ctx.lineTo(x - H * 0.13 + wieg, yG - H * 0.55); ctx.moveTo(x + wieg, yG - H * 0.44); ctx.lineTo(x + H * 0.14 + wieg, yG - H * 0.57); ctx.stroke();
  ctx.fillStyle = rgba('#000000', 0.15); ctx.fillRect(x + sb * 0.25, yG - H * 0.4, sb * 0.3, H * 0.38);
  // kroon: lobben, donkere onderlaag en lichtere bovenkant
  _TU2_KROON.forEach(([u, v, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x + u * H + wieg * 1.5, yG + v * H + ry * H * 0.12, rx * H, ry * H, 0, 0, 6.283); ctx.fillStyle = kd; ctx.fill(); });
  _TU2_KROON.forEach(([u, v, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x + u * H + wieg * 1.5 - rx * H * 0.08, yG + v * H - ry * H * 0.1, rx * H * 0.88, ry * H * 0.82, 0, 0, 6.283); ctx.fillStyle = kc; ctx.fill(); });
  ctx.fillStyle = rgba(_tu2Lt(kc, 0.25), 0.6); for (let i = 0; i < 26; i++) { const an = hash(i * 7) * 6.283, d = Math.sqrt(hash(i * 13)) * 0.3 * H; ctx.beginPath(); ctx.ellipse(x - H * 0.04 + Math.cos(an) * d * 0.9, yG - H * 0.7 + Math.sin(an) * d * 0.6, H * 0.018, H * 0.011, an, 0, 6.283); ctx.fill(); }
  // zonnestralen van linksboven, evenwijdig: de meeste stoppen op de kroon (stip), twee komen tussen de bladeren door (gestippeld)
  const zon = o.zon || 0; if (zon > 0.01) { ctx.save(); ctx.globalAlpha *= zon; const ph = ease(clamp((o.zonU == null ? 1 : o.zonU), 0, 1));
    const D = [0.45, 0.89], Ls = H * 0.3, kx = x - H * 0.02, ky = yG - H * 0.68, rx = H * 0.4, ry = H * 0.3;
    const eind = [-2.75, -2.4, -2.05, -1.7, -1.35, -1.0].map(th => [kx + Math.cos(th) * rx, ky + Math.sin(th) * ry, false]).concat([[x - H * 0.12, yG - 2, true], [x + H * 0.16, yG - 2, true]]);
    eind.forEach(([ex, ey, door]) => { const L = door ? Ls + (yG - (ky - ry * 0.4)) : Ls; const sx = ex - D[0] * L, sy = ey - D[1] * L; const px = lerp(sx, ex, ph), py = lerp(sy, ey, ph);
      ctx.strokeStyle = C.goud; ctx.lineWidth = door ? 3 : 4; ctx.setLineDash(door ? [12, 10] : []); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(px, py); ctx.stroke(); ctx.setLineDash([]);
      if (ph > 0.95) circ(ctx, ex, ey, door ? 5 : 7, C.goud); }); ctx.restore(); }
  ctx.restore(); return { kroon: [x, yG - H * 0.68], kroonR: H * 0.32, onder: [x + H * 0.06, yG] }; }

// ---------- boomvak in bovenaanzicht: smal gat tussen de tegels ↔ breed plantvak ----------
// (x, y) = midden (stam); o.u 0 = smal gat, 1 = breed plantvak met gras en lage planten; o.kroon 0..1 (kroon als stippelcirkel)
function tu2_plantvak(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const u = ease(o.u || 0), T = 60, R = 7; // tegels van 30 cm = 60 px
  const bw = lerp(120, 560, u), bh = lerp(120, 380, u);
  for (let i = -R; i < R; i++) for (let j = -Math.round(R * 0.7); j < Math.round(R * 0.7); j++) { const tx = i * T, ty = j * T; if (Math.abs(tx + T / 2) < bw / 2 + 6 && Math.abs(ty + T / 2) < bh / 2 + 6) continue;
    roundRect(ctx, tx + 2, ty + 2, T - 4, T - 4, 4); shape(ctx, _mixHex(TU2.steen, '#9A8A70', hash(i * 17 + j * 5) * 0.3), null); }
  roundRect(ctx, -bw / 2, -bh / 2, bw, bh, lerp(4, 30, u)); shape(ctx, _mixHex(TU2.grond, TU2.gras, u * 0.8), null);
  if (u > 0.05) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = rgba(_tu2Lt(TU2.gras, 0.2), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 70; i++) { const px = (hash(i * 3) - 0.5) * (bw - 30), py = (hash(i * 3 + 1) - 0.5) * (bh - 30); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 4, py - 8); ctx.stroke(); }
    [[-0.32, -0.25], [0.3, -0.28], [-0.36, 0.22], [0.33, 0.24], [0, 0.34], [-0.12, -0.34]].forEach(([pu, pv], i) => { const px = pu * bw, py = pv * bh, r = 26 + 8 * hash(i);
      ctx.beginPath(); for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283; ctx.ellipse(px + Math.cos(an) * r * 0.55, py + Math.sin(an) * r * 0.55, r * 0.45, r * 0.3, an, 0, 6.283); } ctx.fillStyle = i % 2 ? '#4E8A54' : '#5E9A55'; ctx.fill();
      const fc = ['#E2CC58', '#E8E2D8', '#C98AC0', '#E07A5F'][i % 4]; for (let k = 0; k < 5; k++) circ(ctx, px + (hash(i * 9 + k) - 0.5) * r, py + (hash(i * 9 + k + 3) - 0.5) * r, 5, fc); });
    ctx.restore(); }
  if (o.rand) { ctx.save(); ctx.globalAlpha *= o.rand; roundRect(ctx, -bw / 2 - 6, -bh / 2 - 6, bw + 12, bh + 12, lerp(6, 34, u)); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  circ(ctx, 0, 0, 22, TU2.stam, _tu2Lt(TU2.stam, 0.2), 2); // stam van boven
  const kr = o.kroon == null ? 1 : o.kroon; if (kr > 0.01) { ctx.save(); ctx.globalAlpha *= kr; ctx.setLineDash([14, 10]); ctx.strokeStyle = rgba(C.groen, 0.85); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 330, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ---------- rioolbuis onder de straat (doorsnede), met straatkolk ----------
// (x, y) = midden van het straatoppervlak, w = breedte; o.vul 0..1 (bij 1: buis vol, kolk en plas lopen vol); o.t stroming
function tu2_riool(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vul = clamp(o.vul || 0, 0, 1), t = o.t || 0, x0 = x - w / 2;
  const pr = 70, py = y + 260, kx = x - w * 0.18; // buis (straal 70 px), kolk links van het midden
  ctx.fillStyle = TU2.grond; ctx.fillRect(x0, y + 30, w, 380); ctx.fillStyle = TU2.zand; ctx.fillRect(x0, y + 30, w, 40);
  ctx.fillStyle = TU2.asfalt; ctx.fillRect(x0, y, w, 30); // straat
  // kolk: put met rooster, verbindingsbuis schuin naar de hoofdbuis
  ctx.fillStyle = '#6A6E78'; ctx.fillRect(kx - 46, y, 92, 150); ctx.fillStyle = '#121A26'; ctx.fillRect(kx - 34, y + 8, 68, 134);
  ctx.strokeStyle = '#6A6E78'; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(kx, y + 140); ctx.lineTo(kx + 90, py - pr + 10); ctx.stroke(); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 18; ctx.stroke();
  ctx.strokeStyle = '#9AA0AA'; ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(kx - 40 + i * 20, y + 2); ctx.lineTo(kx - 40 + i * 20, y + 12); ctx.stroke(); }
  // hoofdbuis in lengte, met binnenkant
  roundRect(ctx, x0 + 20, py - pr, w - 40, pr * 2, 12); shape(ctx, '#7A7E88', null); roundRect(ctx, x0 + 20, py - pr + 14, w - 40, pr * 2 - 28, 8); ctx.fillStyle = '#121A26'; ctx.fill();
  const wh = (pr * 2 - 28) * lerp(0.18, 1, vul); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fillRect(x0 + 20, py + pr - 14 - wh, w - 40, wh);
  ctx.fillStyle = rgba('#FFFFFF', 0.5); for (let i = 0; i < 10; i++) { const ph = (t * (0.25 + vul * 0.4) + hash(i)) % 1; circ(ctx, x0 + 30 + ph * (w - 60), py + pr - 20 - wh * (0.2 + 0.6 * hash(i + 4)), 3, rgba('#FFFFFF', 0.5)); }
  // vol: kolk loopt vol en het water staat op straat
  const over = clamp((vul - 0.75) / 0.25, 0, 1); if (over > 0.01) { ctx.fillStyle = rgba(C.teal, 0.8); const kh = 134 * over; ctx.fillRect(kx - 34, y + 142 - kh, 68, kh);
    if (over > 0.6) { const pl = (over - 0.6) / 0.4; ctx.save(); ctx.beginPath(); ctx.rect(x0, y - 40, w, 42); ctx.clip(); ctx.beginPath(); ctx.ellipse(kx, y - 2, 60 + 260 * pl, 10 + 8 * pl, 0, Math.PI, 0); ctx.fillStyle = rgba(C.teal, 0.75); ctx.fill(); ctx.restore(); } }
  ctx.restore(); return { kolk: [kx, y], buis: [x, py] }; }

// ---------- druppel door een wormengang in de humus (bodem in doorsnede) ----------
// (x, y) = midden van het maaiveld, w = breedte; o.u 0..1: 0–0,25 valt, 0,25–0,65 zakt snel door de gang,
// 0,65–1 blijft hangen in de humus (verdeelt zich in vochtvliesjes rond de kruimels). Worm uit Milieukunde 1 (regenworm).
function tu2_regenworm(ctx, pts, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = o.r || 11, kl = '#C98A7A'; // kopie van regenworm (teken_mk1.js)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = _tu2Dk(kl, 0.25); ctx.lineWidth = r * 2 + 3; ctx.beginPath(); _tu2Pad(ctx, pts, false); ctx.stroke();
  ctx.strokeStyle = kl; ctx.lineWidth = r * 2; ctx.beginPath(); _tu2Pad(ctx, pts, false); ctx.stroke();
  const [zx, zy, za] = _tu2Op(pts, 0.3); ctx.save(); ctx.translate(zx, zy); ctx.rotate(za); roundRect(ctx, -r * 2.2, -r * 1.1, r * 4.4, r * 2.2, r); shape(ctx, '#D8A090', null); ctx.restore();
  ctx.strokeStyle = rgba(_tu2Dk(kl, 0.35), 0.6); ctx.lineWidth = 1.5; for (let k = 1; k < 30; k++) { const [px, py, an] = _tu2Op(pts, k / 30); ctx.beginPath(); ctx.moveTo(px - Math.sin(an) * r * 0.9, py + Math.cos(an) * r * 0.9); ctx.lineTo(px + Math.sin(an) * r * 0.9, py - Math.cos(an) * r * 0.9); ctx.stroke(); }
  ctx.restore(); }
const _TU2_GANG = [[0, 0], [8, 70], [-14, 150], [6, 230], [30, 300], [20, 380]];
function tu2_bodemDruppel(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const u = o.u || 0, x0 = x - w / 2, hh = 230, mh = 220;
  // humus (donker, kruimelig) en daaronder minerale grond
  ctx.fillStyle = TU2.humus; ctx.fillRect(x0, y, w, hh); ctx.fillStyle = '#6E5A40'; ctx.fillRect(x0, y + hh, w, mh);
  const kr = []; for (let i = 0; i < w * hh / 1400; i++) { const px = x0 + 12 + hash(i * 3.3) * (w - 24), py = y + 14 + hash(i * 7.7) * (hh - 26); kr.push([px, py]); blob(ctx, px, py, 9 + 6 * hash(i), 7 + 4 * hash(i + 1), 0.15, i); ctx.fillStyle = i % 3 ? TU2.humusR : '#5A4634'; ctx.fill(); }
  ctx.fillStyle = rgba('#3A2C22', 0.5); for (let i = 0; i < 60; i++) circ(ctx, x0 + hash(i * 5.1) * w, y + hh + 10 + hash(i * 2.9) * (mh - 20), 3 + 2 * hash(i), rgba('#4E3C2E', 0.6));
  // gras op het maaiveld
  ctx.strokeStyle = TU2.gras; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < w / 12; i++) { const px = x0 + i * 12 + hash(i) * 6; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + (hash(i + 3) - 0.5) * 10, y - 14 - hash(i + 5) * 14); ctx.stroke(); }
  // wormengang: open buis, met de worm onderin
  const G = _TU2_GANG.map(([gx, gy]) => [x - w * 0.12 + gx, y + gy]); ctx.strokeStyle = '#1A140E'; ctx.lineWidth = 30; ctx.lineJoin = 'round'; ctx.beginPath(); _tu2Pad(ctx, G, false); ctx.stroke();
  ctx.strokeStyle = rgba('#7A5A44', 0.8); ctx.lineWidth = 2; ctx.beginPath(); _tu2Pad(ctx, G.map(p => [p[0] - 15, p[1]]), false); ctx.stroke(); ctx.beginPath(); _tu2Pad(ctx, G.map(p => [p[0] + 15, p[1]]), false); ctx.stroke();
  if (o.worm !== false) tu2_regenworm(ctx, [[G[4][0] + 2, G[4][1] - 10], [G[4][0] + 10, G[4][1] + 30], [G[5][0] - 4, G[5][1]], [G[5][0] + 24, G[5][1] + 26]], 1, { r: 9 });
  // de gevolgde druppel (goud omrand)
  const aankomst = [x - w * 0.12 + 40, y + 120]; // plek in de humus naast de gang waar hij blijft hangen
  if (u < 0.25) { const f = ease(u / 0.25); tu2_druppel(ctx, G[0][0], lerp(y - 260, y - 14, f), 20, { focus: true }); }
  else if (u < 0.65) { const f = (u - 0.25) / 0.4; const [px, py] = _tu2Op(G.slice(0, 3), ease(f)); tu2_druppel(ctx, px, py, 13, { focus: true }); }
  else { const f = ease((u - 0.65) / 0.35); const p0 = _tu2Op(G.slice(0, 3), 1); const px = lerp(p0[0], aankomst[0], f), py = lerp(p0[1], aankomst[1], f);
    if (f < 0.6) tu2_druppel(ctx, px, py, 13 * (1 - f * 0.6), { focus: true });
    ctx.save(); ctx.globalAlpha *= clamp((f - 0.3) / 0.7, 0, 1); kr.filter(([kx, ky]) => Math.hypot(kx - aankomst[0], ky - aankomst[1]) < 85).forEach(([kx, ky]) => { ctx.beginPath(); ctx.arc(kx, ky, 14, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.25); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.95); ctx.lineWidth = 4; ctx.stroke(); });
    ctx.beginPath(); ctx.arc(aankomst[0], aankomst[1], 88, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); return { gang: G, humus: aankomst }; }

// ---------- wadi in doorsnede ----------
// (x, y) = midden op tegelhoogte, w = breedte; o.water 0..1 (peil in de wadi), o.instroom 0..1 (pijltjes van de tegels),
// o.zak 0..1 (water zakt de bodem in), o.t
function tu2_wadi(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0, x0 = x - w / 2, d = 110, bw = w * 0.44, sl = w * 0.1;
  const P = [[x0, y], [x - bw / 2 - sl, y], [x - bw / 2, y + d], [x + bw / 2, y + d], [x + bw / 2 + sl, y], [x0 + w, y]];
  ctx.beginPath(); ctx.moveTo(x0, y + d + 230); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(x0 + w, y + d + 230); ctx.closePath(); ctx.fillStyle = TU2.grond; ctx.fill(); // bodem
  ctx.fillStyle = rgba('#3A2C22', 0.4); for (let i = 0; i < 70; i++) circ(ctx, x0 + hash(i * 3.7) * w, y + d + 20 + hash(i * 1.9) * 200, 3 + 2 * hash(i), rgba('#3A2C22', 0.5));
  // tegels links en rechts, licht aflopend naar de wadi
  for (const side of [-1, 1]) { const xa = side < 0 ? x0 : x + bw / 2 + sl, xb = side < 0 ? x - bw / 2 - sl : x0 + w, n = Math.max(2, Math.round((xb - xa) / 120)), tw = (xb - xa) / n;
    for (let i = 0; i < n; i++) { roundRect(ctx, xa + i * tw + 2, y - 30, tw - 4, 30, 3); shape(ctx, TU2.steen, null); } ctx.fillStyle = TU2.zand; ctx.fillRect(xa, y, xb - xa, 26); }
  // grastalud en bodem van de wadi met planten
  ctx.strokeStyle = TU2.grasD; ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(P[1][0], P[1][1]); ctx.lineTo(P[2][0], P[2][1]); ctx.lineTo(P[3][0], P[3][1]); ctx.lineTo(P[4][0], P[4][1]); ctx.stroke();
  ctx.strokeStyle = TU2.gras; ctx.lineWidth = 2.5; for (let i = 0; i < 46; i++) { const f = i / 45, px = lerp(P[1][0], P[4][0], f); const py = px < P[2][0] ? lerp(P[1][1], P[2][1], (px - P[1][0]) / sl) : px > P[3][0] ? lerp(P[3][1], P[4][1], (px - P[3][0]) / sl) : P[2][1];
    ctx.beginPath(); ctx.moveTo(px, py - 4); ctx.lineTo(px + (hash(i) - 0.5) * 8, py - 18 - hash(i + 2) * 10); ctx.stroke(); }
  [[-0.32, 50], [-0.1, 70], [0.14, 60], [0.33, 46]].forEach(([pu, ph], i) => { const px = x + pu * bw, py = y + d - 4; ctx.strokeStyle = '#5E9A55'; ctx.lineWidth = 4; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + k * 8, py - ph * 0.6, px + k * 16, py - ph); ctx.stroke(); } circ(ctx, px + 16, py - ph, 6, i % 2 ? '#E2CC58' : '#C98AC0'); });
  // water
  const wl = clamp(o.water || 0, 0, 1); if (wl > 0.01) { const hgt = d * 0.85 * wl, top = y + d - hgt, wx = (yy) => bw / 2 + sl * (y + d - yy) / d;
    ctx.beginPath(); ctx.moveTo(x - wx(top), top); ctx.lineTo(x + wx(top), top); ctx.lineTo(x + bw / 2, y + d - 2); ctx.lineTo(x - bw / 2, y + d - 2); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.55); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - wx(top), top); ctx.lineTo(x + wx(top), top); ctx.stroke(); }
  const ins = o.instroom || 0; if (ins > 0.01) for (const side of [-1, 1]) { const xs = x + side * (bw / 2 + sl + 120), ph = (t * 0.6) % 1; pijl(ctx, xs, y - 46, lerp(xs, x + side * (bw / 2 + 20), 0.85), y - 46 + 70, C.teal, ins, 5, 18); tu2_druppel(ctx, lerp(xs, x + side * (bw / 2 + 30), ph), y - 40 + ph * 50, 9, { a: ins * (1 - ph) }); }
  const zak = o.zak || 0; if (zak > 0.01) for (let i = 0; i < 6; i++) { const px = x + (i - 2.5) * bw / 6.5, ph = (t * 0.35 + hash(i)) % 1; ctx.save(); ctx.globalAlpha *= zak * Math.sin(ph * Math.PI); pijl(ctx, px, y + d + 20 + ph * 60, px, y + d + 70 + ph * 60, C.teal, 1, 4, 14); ctx.restore(); }
  ctx.restore(); return { midden: [x, y + d], laag: y + d }; }

// ---------- groen dak in doorsnede (gymzaal), met regenpijp ----------
// (x, y) = midden van de dakrand (bovenkant dakbedekking), w = breedte; lagen (Sustainable Technologies wiki, extensief):
// vetplantjes (sedum) · substraat (10–15 cm) · filterdoek · drainage-/bufferlaag (houdt water vast) · wortelwerende laag + dakbedekking.
// o.kaal = gewoon dak (bitumen) ter vergelijking; o.regen 0..1; o.vol 0..1 (water in buffer/substraat); o.straal 0..1 (dun straaltje
// onderaan de regenpijp; bij kaal = dikke straal); o.t; o.lagen 0..1 (namen kunnen er in de scène bij)
function tu2_groenDak(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0, x0 = x - w / 2, kaal = !!o.kaal;
  const muurH = 380; ctx.fillStyle = '#4A5468'; ctx.fillRect(x0 + 30, y + 24, w - 60, muurH); // gymzaal (muur onder het dak)
  ctx.fillStyle = rgba('#AFC0D0', 0.15); for (let i = 0; i < 4; i++) ctx.fillRect(x0 + 80 + i * (w - 160) / 4, y + 90, (w - 160) / 4 - 30, 60);
  ctx.fillStyle = '#2E2E34'; ctx.fillRect(x0, y, w, 24); // dakvloer + dakbedekking
  const L = {}; let top = y;
  if (!kaal) { const dr = 34, fi = 6, su = 60; // drainage/buffer, filterdoek, substraat (px)
    ctx.fillStyle = '#3A4252'; ctx.fillRect(x0 + 10, y - dr, w - 20, dr); // bufferlaag met bakjes
    const vol = clamp(o.vol || 0, 0, 1); for (let i = 0; i < (w - 20) / 40; i++) { const bx = x0 + 14 + i * 40; ctx.beginPath(); ctx.moveTo(bx, y - dr + 4); ctx.lineTo(bx + 6, y - 4); ctx.lineTo(bx + 30, y - 4); ctx.lineTo(bx + 36, y - dr + 4); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke();
      if (vol > 0.01) { ctx.fillStyle = rgba(C.teal, 0.85); const hh = (dr - 10) * vol; ctx.fillRect(bx + 6 - (1 - vol) * 0, y - 4 - hh, 24, hh); } }
    L.buffer = y - dr / 2; ctx.fillStyle = '#C8C2B0'; ctx.fillRect(x0 + 10, y - dr - fi, w - 20, fi); L.filter = y - dr - fi / 2;
    top = y - dr - fi - su; ctx.fillStyle = '#6E5638'; ctx.fillRect(x0 + 10, top, w - 20, su); L.substraat = top + su / 2;
    for (let i = 0; i < (w - 20) * su / 260; i++) circ(ctx, x0 + 14 + hash(i * 3.1) * (w - 28), top + 6 + hash(i * 1.7) * (su - 12), 2.5 + 2 * hash(i), i % 2 ? '#8A6E48' : '#5A4630');
    if (vol > 0.01) { ctx.save(); ctx.globalAlpha *= vol; for (let i = 0; i < 40; i++) circ(ctx, x0 + 20 + hash(i * 9.3) * (w - 40), top + 10 + hash(i * 4.1) * (su - 20), 4, rgba(C.teal, 0.85)); ctx.restore(); }
    // sedum: lage rozetjes, groen met wat roodbruin
    for (let i = 0; i < (w - 40) / 34; i++) { const px = x0 + 26 + i * 34 + (hash(i) - 0.5) * 10, r = 13 + 5 * hash(i + 2), col = hash(i + 5) > 0.75 ? '#A86A52' : (hash(i + 6) > 0.5 ? '#6FA866' : '#5E9A55');
      for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * 0.45; ctx.beginPath(); ctx.ellipse(px + Math.cos(an) * r * 0.55, top - 2 + Math.sin(an) * r * 0.55, r * 0.32, r * 0.2, an, 0, 6.283); ctx.fillStyle = col; ctx.fill(); }
      if (hash(i + 9) > 0.7) circ(ctx, px, top - r * 0.9, 4, '#E2CC58'); }
    L.sedum = top - 14; }
  // dakrand en regenpijp rechts
  const rx = x0 + w - 14; ctx.fillStyle = '#5A6478'; ctx.fillRect(x0, top - 18, 12, y + 24 - top + 18); ctx.fillRect(rx - 2, top - 18, 16, y + 24 - top + 18);
  ctx.fillStyle = '#7A8494'; roundRect(ctx, rx + 14, y - 4, 26, 18, 4); ctx.fill(); ctx.fillRect(rx + 22, y + 10, 14, muurH - 40); // goot + pijp
  const pb = y + muurH - 30; ctx.beginPath(); ctx.moveTo(rx + 22, pb); ctx.lineTo(rx + 36, pb); ctx.lineTo(rx + 52, pb + 20); ctx.lineTo(rx + 40, pb + 26); ctx.closePath(); ctx.fill(); // uitloop
  const str = o.straal == null ? 0 : o.straal; if (str > 0.01) { const dik = kaal ? 16 : 4; ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = dik * str + 1; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(rx + 48, pb + 24); ctx.quadraticCurveTo(rx + 60, pb + 50, rx + 62, pb + 80); ctx.stroke();
    for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; tu2_druppel(ctx, rx + 62 + (i - 1) * 6, pb + 86 + ph * 30, kaal ? 7 : 4, { a: str * (1 - ph) }); } }
  if ((o.regen || 0) > 0.01) tu2_bui(ctx, x0, x0 + w, top - 260, top - 20, { a: o.regen, t, n: Math.round(w / 14) });
  if (kaal && (o.regen || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.regen; ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(x0 + 12, y - 6, w - 26, 6); ctx.restore(); }
  ctx.restore(); return Object.assign(L, { pijp: [rx + 50, pb + 24], top }); }

// ---------- wilde bij: asbij (Andrena cineraria), zijaanzicht, kop naar rechts ----------
// Opbouw en poten (2-bots-IK, driepootgang) uit bibliotheek/verbeterronde-1/dieren-a/insecten/C.js (insectZij, bij);
// aangepast naar een grondbij: geen stuifmeelkorfje maar een behaarde achterscheen (scopa) met stuifmeel, achterlijf glanzend
// blauwzwart, borststuk zwart met grijswitte haarband voor en achter. s = 1 → 120 px (± 12 mm). (x, y) = grond onder het midden.
// o.houding 'staan' | 'lopen' (o.t = fase) | 'vliegen' (o.t); o.kijk ±1; o.rot (rad, bv. de gang in kruipen); o.stuifmeel 0..1
function _tu2InsPoot(ctx, H, F, lf, lt, kleur, w, voetDir) { const dx = F[0] - H[0], dy = F[1] - H[1]; let d = Math.hypot(dx, dy); const dm = (lf + lt) * 0.98; let Fx = F[0], Fy = F[1];
  if (d > dm) { Fx = H[0] + dx / d * dm; Fy = H[1] + dy / d * dm; d = dm; }
  const an = Math.atan2(Fy - H[1], Fx - H[0]), c = clamp((lf * lf + d * d - lt * lt) / (2 * lf * d), -1, 1), b = Math.acos(c);
  const k1 = [H[0] + Math.cos(an - b) * lf, H[1] + Math.sin(an - b) * lf], k2 = [H[0] + Math.cos(an + b) * lf, H[1] + Math.sin(an + b) * lf], K = k1[1] < k2[1] ? k1 : k2;
  ctx.lineCap = 'round'; ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(H[0], H[1]); ctx.lineTo(K[0], K[1]); ctx.stroke();
  ctx.lineWidth = w * 0.75; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(Fx, Fy); ctx.stroke();
  ctx.lineWidth = w * 0.5; ctx.beginPath(); ctx.moveTo(Fx, Fy); ctx.lineTo(Fx + voetDir * lt * 0.4, Fy + 1); ctx.stroke(); return { K, F: [Fx, Fy] }; }
function _tu2Voet(rx, p, stride, lift, duty = 0.55) { if (p < duty) return [rx + stride * (0.5 - p / duty), 0]; const q = (p - duty) / (1 - duty); return [rx - stride / 2 + stride * (0.5 - 0.5 * Math.cos(Math.PI * q)), -Math.sin(Math.PI * q) * lift]; }
function tu2_wildeBij(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1, t = o.t || 0, houding = o.houding || 'staan', vliegt = houding === 'vliegen';
  const K = { kop: '#1E1C22', borst: '#24222A', haar: '#C8CCD2', lijf: '#1C2030', glans: '#4A5A7A', poot: '#2E2A2E', vleugel: 'rgba(170,176,190,', ader: 'rgba(90,86,80,0.7)' };
  const heup = [[12, -24], [1, -22], [-10, -23]], rust = [28, 2, -28], lf = [15, 17, 21], lt = [16, 18, 24], stride = 24, lift = 8;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * kijk * 120 / 130, s * 120 / 130); ctx.lineJoin = 'round';
  const dein = houding === 'lopen' ? Math.sin(t * 4 * Math.PI) * 0.8 : 0, hoog = vliegt ? 36 : 0; ctx.translate(0, hoog + dein);
  const slag = vliegt ? Math.sin(t * Math.PI * 6) : 0;
  const vleugel = (ver) => { ctx.save(); ctx.translate(4, -50); ctx.rotate(vliegt ? 0.3 + slag * 0.45 : 0.06); /* vliegen: vleugels omhoog geslagen */
    const V = [[2, -2], [-30, -9], [-70, -11], [-88, -5], [-84, 3], [-46, 4], [-6, 4]], A = [[-8, 2], [-38, 2], [-60, 6], [-54, 11], [-28, 10], [-8, 6]];
    for (const [pts, al] of [[A, 0.3], [V, 0.36]]) { ctx.beginPath(); _tu2Pad(ctx, pts); ctx.fillStyle = K.vleugel + (ver ? al * 0.7 : al) + ')'; ctx.fill(); ctx.strokeStyle = 'rgba(180,186,198,0.7)'; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.strokeStyle = K.ader; ctx.lineWidth = 1.1; for (const [ex, ey] of [[-72, -8], [-56, -1], [-36, 2]]) { ctx.beginPath(); ctx.moveTo(-4, 0); ctx.quadraticCurveTo(ex * 0.5, -7, ex, ey); ctx.stroke(); } ctx.restore(); };
  const poten = (ver) => { const kl = ver ? '#1A1618' : K.poot; for (let i = 0; i < 3; i++) { const H = [heup[i][0] + (ver ? -3 : 0), heup[i][1] - (ver ? 1 : 0)]; let F;
      if (vliegt) F = [H[0] + (i - 1) * -6 - 4, H[1] + lf[i] * 0.9];
      else if (houding === 'lopen') { const ph = ((t + (ver ? 0.5 : 0) + (i % 2 ? 0.5 : 0)) % 1 + 1) % 1; const f = _tu2Voet(rust[i] + (ver ? 4 : 0), ph, stride, lift); F = [f[0], f[1] - hoog - dein]; }
      else F = [rust[i] + (ver ? 4 : 0), -hoog - dein];
      const R = _tu2InsPoot(ctx, H, F, lf[i], lt[i], kl, 2.8, i === 2 ? -1 : 1);
      if (i === 2) { // achterscheen met lange haren (scopa) en stuifmeel
        const mx = (R.K[0] + R.F[0]) / 2, my = (R.K[1] + R.F[1]) / 2, an = Math.atan2(R.F[1] - R.K[1], R.F[0] - R.K[0]); ctx.save(); ctx.translate(mx, my); ctx.rotate(an);
        ctx.strokeStyle = ver ? '#6A6A70' : K.haar; ctx.lineWidth = 1; for (let k = -5; k <= 5; k++) { ctx.beginPath(); ctx.moveTo(k * 1.6, 0); ctx.lineTo(k * 1.6 - 2, -6); ctx.moveTo(k * 1.6, 0); ctx.lineTo(k * 1.6 - 2, 6); ctx.stroke(); }
        const sm = o.stuifmeel == null ? 0.6 : o.stuifmeel; if (sm > 0.05 && !ver) { ctx.beginPath(); ctx.ellipse(0, 0, 5 + 4 * sm, 3 + 2.5 * sm, 0, 0, 6.283); ctx.fillStyle = '#E8B840'; ctx.fill(); } ctx.restore(); } } };
  vleugel(true); poten(true);
  // achterlijf: glanzend blauwzwart, segmentranden, glanslijn
  ctx.save(); ctx.translate(-46, -32); ctx.rotate(0.14); const AL = [[26, -13], [8, -19], [-14, -18], [-32, -9], [-37, 2], [-30, 13], [-10, 18], [12, 16], [27, 7]];
  ctx.beginPath(); _tu2Pad(ctx, AL); ctx.fillStyle = K.lijf; ctx.fill(); ctx.save(); ctx.beginPath(); _tu2Pad(ctx, AL); ctx.clip();
  ctx.strokeStyle = rgba('#000000', 0.5); ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(16 - k * 12, -22); ctx.quadraticCurveTo(12 - k * 12, 0, 16 - k * 12, 22); ctx.stroke(); }
  ctx.strokeStyle = K.glans; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(18, -11); ctx.quadraticCurveTo(-6, -17, -26, -8); ctx.stroke(); ctx.restore(); ctx.restore();
  // borststuk: zwart met grijswitte haarband voor en achter
  const BO = [[20, -42], [7, -54], [-9, -54], [-20, -43], [-22, -28], [-11, -18], [9, -18], [20, -28]]; ctx.beginPath(); _tu2Pad(ctx, BO); ctx.fillStyle = K.borst; ctx.fill();
  ctx.save(); ctx.beginPath(); _tu2Pad(ctx, BO); ctx.clip(); ctx.fillStyle = K.haar; ctx.beginPath(); ctx.ellipse(17, -38, 9, 22, 0.2, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(-19, -36, 7, 22, -0.2, 0, 6.283); ctx.fill(); ctx.restore();
  ctx.strokeStyle = K.haar; ctx.lineWidth = 1.1; for (let k = 0; k < 18; k++) { const an = -2.9 + k * 0.15, r = 18; const px = Math.cos(an) * r, py = -37 + Math.sin(an) * r; if (py > -22 || (px > -10 && px < 10)) continue; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px * 1.15, -37 + (py + 37) * 1.15); ctx.stroke(); }
  // kop met facetoog en geknikte antenne
  const KO = [[35, -47], [28, -54], [20, -50], [18, -37], [24, -26], [33, -24], [39, -32]]; ctx.beginPath(); _tu2Pad(ctx, KO); ctx.fillStyle = K.kop; ctx.fill();
  ctx.beginPath(); ctx.ellipse(28, -41, 5, 9.5, -0.15, 0, 6.283); ctx.fillStyle = '#121014'; ctx.fill(); ctx.beginPath(); ctx.ellipse(26.8, -45, 1.4, 2.8, -0.15, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fill();
  ctx.strokeStyle = K.kop; ctx.lineWidth = 2.1; ctx.beginPath(); ctx.moveTo(34, -47); ctx.lineTo(38, -62); ctx.lineTo(52, -58); ctx.stroke();
  vleugel(false); poten(false);
  if (vliegt) { ctx.save(); ctx.globalAlpha *= 0.18; ctx.translate(4, -50); ctx.rotate(0.3 - slag * 0.45); ctx.beginPath(); _tu2Pad(ctx, [[2, -2], [-30, -9], [-70, -11], [-88, -5], [-84, 3], [-46, 4], [-6, 4]]); ctx.fillStyle = '#D6E2EC'; ctx.fill(); ctx.restore(); } // vage tweede stand = snelle slag
  ctx.restore(); }

// ---------- grondnest van een wilde bij (doorsnede kale zandgrond), schematisch ----------
// (x, y) = nestingang op het maaiveld; o.bij 0..1: 0 = bij landt bij de ingang, 0,3 = in de ingang, 1 = onderin de gang;
// hoofdgang eerst verticaal, dan schuin; broedcellen schuin aan de gang met stuifmeelbolletje en eitje; hoopje zand bij de ingang.
// Niet op schaal (echte nesten van de asbij: ± 30 cm diep, bij ± 12 mm): de gang is hier ± 6 bijlengtes.
const _TU2_NEST = [[0, 0], [0, 100], [8, 190], [50, 270], [110, 340]];
function tu2_grondnest(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 760, h = 420, t = o.t || 0;
  ctx.fillStyle = '#B89A62'; ctx.fillRect(-w / 2, 0, w, h); // kale zandgrond
  ctx.fillStyle = rgba('#8A6E44', 0.5); for (let i = 0; i < 160; i++) circ(ctx, -w / 2 + hash(i * 2.7) * w, 6 + hash(i * 5.3) * (h - 12), 1.8 + 1.6 * hash(i), rgba('#8A6E44', 0.55));
  ctx.fillStyle = TU2.grasD; ctx.fillRect(-w / 2, -6, 140, 8); ctx.fillRect(w / 2 - 120, -6, 120, 8); // gras aan de randen, kaal in het midden
  // hoopje uitgegraven zand naast de ingang
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.quadraticCurveTo(-36, -38, 0, -6); ctx.lineTo(10, 0); ctx.closePath(); ctx.fillStyle = '#C9AE7A'; ctx.fill();
  // hoofdgang
  ctx.strokeStyle = '#6E5434'; ctx.lineWidth = 58; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); _tu2Pad(ctx, _TU2_NEST, false); ctx.stroke();
  // broedcellen: schuin aan de gang, met stuifmeelbolletje en eitje
  const cel = [[0.45, -1], [0.62, 1], [0.78, -1], [0.95, 1]]; cel.forEach(([u, sd], i) => { const [px, py, an] = _tu2Op(_TU2_NEST, u); const nx = -Math.sin(an) * sd, ny = Math.cos(an) * sd;
    const cx = px + nx * 92 + Math.cos(an) * 26, cy = py + ny * 70 + Math.sin(an) * 20, ca = Math.atan2(cy - py, cx - px);
    ctx.strokeStyle = '#6E5434'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(cx - Math.cos(ca) * 30, cy - Math.sin(ca) * 26); ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ca); ctx.beginPath(); ctx.ellipse(0, 0, 40, 24, 0, 0, 6.283); ctx.fillStyle = '#3A2C1E'; ctx.fill(); ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 2; ctx.stroke(); // wand glad
    circ(ctx, 2, 2, 15, '#E8B840'); ctx.beginPath(); ctx.ellipse(8, -12, 8, 3.5, 0.4, 0, 6.283); ctx.fillStyle = '#F2EEE4'; ctx.fill(); ctx.restore(); });
  // bij: landt en kruipt de gang in
  const ub = o.bij; if (ub != null) { if (ub < 0.3) { const f = ease(ub / 0.3); tu2_wildeBij(ctx, lerp(120, 6, f), lerp(-140, -2, f), 1.1, { houding: f < 0.8 ? 'vliegen' : 'staan', t, rot: f * Math.PI / 2 * clamp((f - 0.7) / 0.3, 0, 1), kijk: -1 }); }
    else { const [px, py, an] = _tu2Op(_TU2_NEST, (ub - 0.3) / 0.7 * 0.8); tu2_wildeBij(ctx, px - Math.cos(an - Math.PI / 2) * 20, py - Math.sin(an - Math.PI / 2) * 22, 1.1, { houding: 'lopen', t, rot: an, kijk: 1 }); /* poten op de gangwand */ } }
  ctx.restore(); return { ingang: [x, y] }; }

// ---------- bijenhotel ----------
// (x, y) = midden; s = 1 → ± 300 px hoog; holle stengels, geboorde blokjes, een paar dichtgemetselde gaatjes (leem)
function tu2_bijenhotel(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const W = 240, H = 260; ctx.beginPath(); ctx.moveTo(-W / 2 - 26, -H / 2 + 6); ctx.lineTo(0, -H / 2 - 60); ctx.lineTo(W / 2 + 26, -H / 2 + 6); ctx.closePath(); shape(ctx, '#6A4A34', null); // dak
  roundRect(ctx, -W / 2, -H / 2, W, H, 6); shape(ctx, '#8A6A48', null); roundRect(ctx, -W / 2 + 12, -H / 2 + 12, W - 24, H - 24, 4); ctx.fillStyle = '#4A3424'; ctx.fill();
  // bovenvak: bamboe/riet (holle stengels van voren)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const px = -W / 2 + 26 + c * 23.5 + (r % 2) * 11, py = -H / 2 + 30 + r * 22; if (px > W / 2 - 18) continue; circ(ctx, px, py, 11, '#D8C08A', '#B89A62', 1.5); circ(ctx, px, py, 6, (r * 9 + c) % 5 === 2 ? '#9A7A58' : '#1E140E'); }
  ctx.fillStyle = '#8A6A48'; ctx.fillRect(-W / 2 + 12, -H / 2 + 96, W - 24, 10);
  // ondervak: blok hout met geboorde gaatjes
  roundRect(ctx, -W / 2 + 20, -H / 2 + 116, W - 40, H - 140, 4); ctx.fillStyle = '#B8925E'; ctx.fill();
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const px = -W / 2 + 42 + c * 26, py = -H / 2 + 136 + r * 26, rr = r % 2 ? 5 : 7; circ(ctx, px, py, rr, (r + c * 3) % 7 === 1 ? '#9A7A58' : '#1E140E'); }
  ctx.restore(); }

// ---------- bloeikalender maart–oktober ----------
// (x, y) = linksboven, w = breedte; rijen vroeg / zomer / laat (inheems, groen) en een uitheemse late bloeier (oker, gestippeld);
// o.u 0..1 = hoe ver de kalender is ingekleurd (van maart naar oktober); o.rijen = [a vroeg, a zomer, a laat, a uitheems]
const TU2_MAANDEN = ['MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT'];
function tu2_bloeikalender(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const u = o.u == null ? 1 : o.u, R = o.rijen || [1, 1, 1, 0];
  const mw = w / 8, rh = 52, lab = ['VROEG', 'ZOMER', 'LAAT', 'UITHEEMS']; const balk = [[0, 3.2], [2.6, 6], [5.2, 7.5], [6.0, 8]]; // inheems laat tot half oktober; uitheemse late bloeier maakt oktober vol
  const kl = ['#8FCB8A', C.groen, '#5FA86E', C.oker];
  roundRect(ctx, x - 200, y - 70, w + 220, 70 + rh * 4 + 30, 14); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 1.5);
  TU2_MAANDEN.forEach((m, i) => { metaText(ctx, m, x + mw * (i + 0.5), y - 26, C.text2, 'center', 26); ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + mw * i, y - 10); ctx.lineTo(x + mw * i, y + rh * 4); ctx.stroke(); });
  balk.forEach(([b0, b1], i) => { if ((R[i] || 0) <= 0.01) return; ctx.save(); ctx.globalAlpha *= R[i]; const yy = y + i * rh + 8, e = Math.min(b1, u * 8); if (e > b0) {
      const bx = x + b0 * mw, bwid = Math.min(w - b0 * mw, (e - b0) * mw); roundRect(ctx, bx, yy, Math.max(12, bwid), rh - 18, (rh - 18) / 2); if (i === 3) { ctx.fillStyle = rgba(C.oker, 0.35); ctx.fill(); ctx.setLineDash([8, 6]); ctx.strokeStyle = C.oker; ctx.lineWidth = 2.5; ctx.stroke(); ctx.setLineDash([]); } else { ctx.fillStyle = rgba(kl[i], 0.85); ctx.fill(); }
      for (let k = 0; k < Math.floor(bwid / 46); k++) { const fx = bx + 20 + k * 46, fy = yy + (rh - 18) / 2; for (let p = 0; p < 5; p++) { const an = p / 5 * 6.283; circ(ctx, fx + Math.cos(an) * 6, fy + Math.sin(an) * 6, 4.5, i === 3 ? '#E8C27A' : '#F2EEE4'); } circ(ctx, fx, fy, 3.5, C.goud); } }
    metaText(ctx, lab[i], x - 14, yy + rh - 26, i === 3 ? C.oker : C.grain, 'right', 26); ctx.restore(); });
  ctx.restore(); }

// ---------- hoogtemeter voor de doorlopende camera ----------
// (x, y) = bovenkant; o.pos = positie als (kommagetal) index in TU2_HOOGTES; o.a. Volgorde van boven naar beneden zoals in het echt.
const TU2_HOOGTES = ['STAD', 'DAK', 'BLAD', 'PLEIN', 'BODEM'];
function tu2_hoogtemeter(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = 46, n = TU2_HOOGTES.length, pos = clamp(o.pos == null ? 3 : o.pos, 0, n - 1);
  ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + st * (n - 1)); ctx.stroke();
  TU2_HOOGTES.forEach((nm, i) => { const yy = y + i * st, d = Math.abs(i - pos), on = d < 0.5; ctx.beginPath(); ctx.moveTo(x - 8, yy); ctx.lineTo(x + 8, yy); ctx.stroke();
    metaText(ctx, nm, x + 22, yy + 9, on ? C.goud : rgba(C.text2, 0.8), 'left', 26); });
  const my = y + pos * st; ctx.beginPath(); ctx.moveTo(x - 6, my); ctx.lineTo(x - 26, my - 12); ctx.lineTo(x - 26, my + 12); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill();
  ctx.restore(); }

// ---------- klok (wijzerplaat), bv. 23:00 ----------
function tu2_klok(ctx, x, y, r, uur = 23, min = 0, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2EEE4', '#8FA0B5', 3); ctx.strokeStyle = '#1A2740'; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.lineWidth = i % 3 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); ctx.lineTo(x + Math.cos(an) * r * 0.9, y + Math.sin(an) * r * 0.9); ctx.stroke(); }
  const ua = ((uur % 12) + min / 60) / 12 * 6.283 - Math.PI / 2, ma = min / 60 * 6.283 - Math.PI / 2; ctx.lineCap = 'round';
  ctx.lineWidth = r * 0.1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ua) * r * 0.5, y + Math.sin(ua) * r * 0.5); ctx.stroke();
  ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ma) * r * 0.75, y + Math.sin(ma) * r * 0.75); ctx.stroke(); circ(ctx, x, y, r * 0.07, '#1A2740');
  if (o.tekst) metaText(ctx, o.tekst, x, y + r + 40, C.grain, 'center', 28); ctx.restore(); }

// ---------- lantaarnpaal (avond), met lichtvlek op de grond ----------
// (x, yG) = voet; ± 5 m hoog (s = 1 → 1000 px); o.aan 0..1
function tu2_lantaarn(ctx, x, yG, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const H = 1000 * s, aan = o.aan == null ? 1 : o.aan;
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.beginPath(); ctx.moveTo(x + H * 0.12, yG - H * 0.95); ctx.lineTo(x + H * 0.32, yG); ctx.lineTo(x - H * 0.08, yG); ctx.closePath(); ctx.fillStyle = rgba('#F2DA8A', 0.08); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + H * 0.12, yG, H * 0.22, H * 0.03, 0, 0, 6.283); ctx.fillStyle = rgba('#F2DA8A', 0.14); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = '#5A6478'; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(4, H * 0.022); ctx.beginPath(); ctx.moveTo(x, yG); ctx.lineTo(x, yG - H * 0.96); ctx.quadraticCurveTo(x, yG - H, x + H * 0.06, yG - H); ctx.lineTo(x + H * 0.1, yG - H); ctx.stroke();
  roundRect(ctx, x + H * 0.06, yG - H * 1.0, H * 0.13, H * 0.035, H * 0.01); ctx.fillStyle = '#4A5468'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x + H * 0.125, yG - H * 0.962, H * 0.05, H * 0.012, 0, 0, 6.283); ctx.fillStyle = aan > 0.5 ? '#F2DA8A' : '#8A8E96'; ctx.fill();
  ctx.restore(); }

// ---------- grasveld van opzij: kunstgras (gelijke sprieten, rubberkorrels) of echt gras (ongelijk, verdampt water) ----------
// (x, yG) = midden op de grond, w = breedte; o.kunst true/false; o.damp 0..1 = waterdamp omhoog (alleen echt gras); o.zon 0..1 stralen
function tu2_grasVeld(ctx, x, yG, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0, x0 = x - w / 2, kunst = !!o.kunst;
  ctx.fillStyle = kunst ? '#2A2A30' : TU2.grond; ctx.fillRect(x0, yG, w, 60);
  if (kunst) { ctx.fillStyle = '#1A1A1E'; for (let i = 0; i < w / 6; i++) circ(ctx, x0 + hash(i * 1.3) * w, yG - 2 - hash(i * 2.1) * 10, 3, '#141418'); // rubberkorrels
    ctx.strokeStyle = '#4CB85A'; ctx.lineWidth = 3; for (let i = 0; i < w / 9; i++) { const px = x0 + 4 + i * 9; ctx.beginPath(); ctx.moveTo(px, yG); ctx.lineTo(px + 3, yG - 46); ctx.stroke(); } }
  else { for (let i = 0; i < w / 7; i++) { const px = x0 + 3 + i * 7 + hash(i) * 4, hh = 30 + hash(i + 3) * 30; ctx.strokeStyle = [TU2.gras, TU2.grasD, '#6FA866', '#7A9A52'][i % 4]; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, yG); ctx.quadraticCurveTo(px + (hash(i + 7) - 0.5) * 10, yG - hh * 0.6, px + (hash(i + 9) - 0.5) * 18, yG - hh); ctx.stroke(); } }
  const damp = kunst ? 0 : (o.damp || 0); if (damp > 0.01) for (let k = 0; k < Math.round(w / 60); k++) { const ph = (t * 0.4 + hash(k * 3)) % 1; waterMol(ctx, x0 + 20 + hash(k * 7) * (w - 40), yG - 60 - ph * 120, 8, damp * Math.sin(ph * Math.PI)); }
  if (o.zon) for (let i = 0; i < 4; i++) { const px = x0 + w * (0.15 + i * 0.23); pijl(ctx, px - 60, yG - 220, px - 6, yG - 70, C.goud, o.zon, 4, 14); }
  ctx.restore(); }
