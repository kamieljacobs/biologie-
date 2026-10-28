// Erfelijkheid 4 (lichte remake, fase 1, 28 okt 2026) — nieuwe tekeningen, kandidaat voor bibliotheek/lib_bio.js na keuring.
// Vereist lib.js (C, rgba, roundRect, shape, text, metaText, naamBij, fTekst, fMeta, ease, clamp, lerp, hash),
// lib_bio.js (_mixHex, cdChromosoom, cdPad, cdChromatide, _cdk) en lib_cast.js (persoon).
//
// Kleuren (minder paars, meer contrast; BEELDAFSPRAKEN 28 okt 2026):
//  - herkomst van een chromosoom zoals Chromosomen 2.1: teal = van de ene ouder (P1), oker = van de andere (P2);
//  - erwt geel/groen als gedempte planttinten (geel niet gelijk aan goud = focus); fruitvlieg grijs/zwart in neutrale tinten;
//  - genband goud (gen = focus), allelletters in tekstkleur.
const E4 = {
  geel: '#D9C766', geelD: '#A6943E', groen: '#8DBE6E', groenD: '#5E8C4A',
  p1: C.teal, p2: C.oker, band: C.goud,
  vliegGrijs: '#A89C84', vliegGrijsD: '#7E735E', vliegZwart: '#3B3633', vliegZwartD: '#8A8079', oog: '#B8473C', oogD: '#7E2A24',
  vleugel: '#C9D4DE', peul: '#7FAE5E', peulD: '#4F7A3A', peulBinnen: '#B9D49A'
};
const _e4d = (h, k = 0.35) => _mixHex(h, '#000000', k);

// =====================================================================================
// ERWT (zaad van Pisum sativum). Recept: rond zaad ± 7–8 mm; een gerimpeld zaad heeft hetzelfde formaat maar een
// onregelmatige, gedeukte omtrek met plooien (het zaad droogt ongelijk in: minder zetmeel, meer suiker en water).
// Kleur = de zaadlobben door de dunne zaadhuid heen (geel of groen). Navel (hilum) als klein ovaal aan de rand.
// Bekende fouten: gerimpeld als 'stekelig' stervormpje; gerimpeld kleiner dan rond; glans of verloop.
function erwt(ctx, x, y, r, o = {}) {
  const { kleur = 'geel', vorm = 'rond', a = 1, seed = 1, rot = 0, hl = 0 } = o; if (a <= 0.01) return;
  const f = kleur === 'geel' ? E4.geel : E4.groen, d = kleur === 'geel' ? E4.geelD : E4.groenD;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); const N = 48;
  for (let i = 0; i <= N; i++) { const an = i / N * 6.2832; let rr = r * (1 + 0.04 * Math.sin(an * 2 + seed));
    if (vorm === 'gerimpeld') rr = r * (0.93 + 0.045 * Math.sin(an * 3 + seed * 1.7) + 0.035 * Math.abs(Math.sin(an * 3.5 + seed * 3.1)) - 0.02 * Math.abs(Math.sin(an * 7 + seed)));
    const px = Math.cos(an) * rr, py = Math.sin(an) * rr * 0.94; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, f, d, Math.max(1.2, r * 0.07));
  if (vorm === 'gerimpeld') { ctx.strokeStyle = rgba(d, 0.85); ctx.lineWidth = Math.max(1, r * 0.07); ctx.lineCap = 'round';
    for (let k = 0; k < 3; k++) { const an = seed * 1.3 + k * 2.1, r0 = r * 0.15, r1 = r * (0.55 + 0.15 * hash(seed + k));
      ctx.beginPath(); ctx.moveTo(Math.cos(an) * r0, Math.sin(an) * r0); ctx.quadraticCurveTo(Math.cos(an + 0.35) * r1 * 0.7, Math.sin(an + 0.35) * r1 * 0.7, Math.cos(an + 0.15) * r1, Math.sin(an + 0.15) * r1); ctx.stroke(); } }
  else { ctx.strokeStyle = rgba('#FFFFFF', 0.22); ctx.lineWidth = Math.max(1, r * 0.08); ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 3.6, 4.5); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(r * 0.78, 0, r * 0.1, r * 0.24, 0, 0, 6.283); shape(ctx, _e4d(d, 0.3), null); // navel
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r * 1.25, 0, 6.283); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// PEUL. Recept: peul ± 6–9 cm, 4–9 zaden op een rij aan de buiknaad; open peul = twee kleppen, binnenkant licht.
// erwten = lijst {kleur, vorm}; len = lengte in px. Erwten ≈ 0,1 × de peullengte (8 mm in 8 cm).
function peul(ctx, x, y, len, o = {}) {
  const { erwten = [], open = 1, rot = 0, a = 1 } = o; if (a <= 0.01) return; const w = len * 0.17, n = Math.max(1, erwten.length);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const klep = (dy, binnen) => { ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.bezierCurveTo(-len * 0.3, dy * w * 1.25, len * 0.3, dy * w * 1.25, len / 2, -w * 0.15);
    ctx.bezierCurveTo(len * 0.35, dy * w * 0.25, -len * 0.3, dy * w * 0.25, -len / 2, 0); ctx.closePath(); shape(ctx, binnen ? E4.peulBinnen : E4.peul, E4.peulD, 2); };
  const sp = open * w * 0.55; ctx.save(); ctx.translate(0, -sp); klep(-1, open > 0.3); ctx.restore(); ctx.save(); ctx.translate(0, sp); klep(1, false); ctx.restore();
  // steeltje en kelk
  ctx.strokeStyle = E4.peulD; ctx.lineWidth = Math.max(2, len * 0.02); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.quadraticCurveTo(-len * 0.58, -w * 0.2, -len * 0.62, -w * 0.9); ctx.stroke();
  if (open > 0.3) { const r = Math.min(len * 0.06, (len * 0.78) / n / 2.05);
    erwten.forEach((e, i) => erwt(ctx, -len * 0.38 + (i + 0.5) * (len * 0.74 / n), sp + w * 0.32, r, Object.assign({ seed: i * 2 + 1, a: clamp((open - 0.3) / 0.4, 0, 1) }, e))); }
  ctx.restore();
}

// =====================================================================================
// ERWTENPLANT (Pisum sativum), vereenvoudigd. Recept: klimt met ranken (de bovenste blaadjes van het samengestelde blad
// zijn ranken), grote steunblaadjes bij elke knoop, 1–3 paar blaadjes per blad, witte vlinderbloemen, peulen hangen omlaag.
// Hoogte ± 60–150 cm (doperwt aan een stok). Bekende fout: losse ronde 'bolletjes' als blad; ranken als rechte streepjes.
function erwtenplant(ctx, x, y, h, o = {}) {
  const { a = 1, t = 0, peulen = 3, seed = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // stok
  ctx.strokeStyle = '#8C6A48'; ctx.lineWidth = h * 0.018; ctx.beginPath(); ctx.moveTo(x + h * 0.05, y); ctx.lineTo(x + h * 0.05, y - h * 1.02); ctx.stroke();
  const P = []; const kn = 7; for (let i = 0; i <= kn; i++) { const u = i / kn; P.push([x + Math.sin(u * 9 + seed) * h * 0.03, y - u * h]); }
  ctx.strokeStyle = E4.groenD; ctx.lineWidth = h * 0.012; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  const blad = (bx, by, s, an) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(s * 0.5, 0, s * 0.5, s * 0.3, 0, 0, 6.283); shape(ctx, '#6FA35A', '#4F7A3A', 1.2);
    ctx.strokeStyle = '#4F7A3A'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 0.9, 0); ctx.stroke(); ctx.restore(); };
  const rank = (rx, ry, k, s) => { ctx.strokeStyle = '#6FA35A'; ctx.lineWidth = Math.max(1.2, s * 0.05); ctx.beginPath(); ctx.moveTo(rx, ry);
    for (let q = 1; q <= 18; q++) { const u = q / 18, an = u * 9 * k, rr = s * (1 - u * 0.75); ctx.lineTo(rx + k * u * s * 1.3 + Math.cos(an) * rr * 0.25 * u, ry - u * s * 0.5 + Math.sin(an) * rr * 0.25 * u); } ctx.stroke(); };
  for (let i = 1; i < kn; i++) { const [px, py] = P[i], k = i % 2 ? 1 : -1, s = h * 0.1;
    blad(px, py, s * 0.9, k > 0 ? 0.3 : Math.PI - 0.3); blad(px, py, s * 0.8, k > 0 ? Math.PI + 0.6 : -0.6); // steunblaadjes
    blad(px + k * s * 0.7, py - s * 0.35, s * 0.7, k > 0 ? -0.5 : Math.PI + 0.5); rank(px + k * s * 1.2, py - s * 0.6, k, s * 0.9); }
  // bloem boven
  const [fx, fy] = P[kn]; ctx.save(); ctx.translate(fx, fy - h * 0.02); ctx.beginPath(); ctx.ellipse(0, 0, h * 0.04, h * 0.032, 0, 0, 6.283); shape(ctx, '#EEEDE6', '#B8B8B0', 1); ctx.restore();
  for (let i = 0; i < peulen; i++) { const [px, py] = P[2 + i * 2] || P[2]; const k = i % 2 ? -1 : 1; peul(ctx, px + k * h * 0.09, py + h * 0.07, h * 0.16, { open: 0, rot: k > 0 ? 1.25 : 1.9 }); }
  ctx.restore();
}

// =====================================================================================
// FRUITVLIEG (Drosophila melanogaster), bovenaanzicht (zoals in genetica-boeken). Recept (in px van L = lichaamslengte):
// lichaam ± 2,5 mm (vrouwtje iets groter dan mannetje); kop ± 0,18 L lang met grote rode facetogen opzij; borststuk ± 0,32 L,
// breedste deel; achterlijf ± 0,5 L met donkere banden aan de achterrand van elk segment; vrouwtje: spits achterlijf met
// losse banden; mannetje: rond, de laatste segmenten helemaal donker. Vleugels in rust plat over het achterlijf gevouwen,
// steken ± 0,15 L voorbij de punt, doorzichtig met 4–5 lengteaders. Stompe vleugels (vestigial): gekreukte stompjes van
// ± 0,15 L. Zes poten aan het borststuk (drie segmenten zichtbaar). Kleur: 'grijs' (wildtype, grijsbruin) of 'zwart' (black).
// Bekende fouten: poten aan het achterlijf; vleugels als oortjes naar opzij; ogen als ronde stippen zonder facetten; geen banden.
function fruitvlieg(ctx, x, y, L, o = {}) {
  const { lijf = 'grijs', vleugel = 'normaal', sekse = 'v', a = 1, rot = 0, hl = 0, t = 0 } = o; if (a <= 0.01) return;
  const f = lijf === 'zwart' ? E4.vliegZwart : E4.vliegGrijs, d = lijf === 'zwart' ? E4.vliegZwartD : E4.vliegGrijsD;
  const s = sekse === 'm' ? 0.88 : 1, Ls = L * s; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopY = -Ls * 0.42, borstY = -Ls * 0.17, achY = Ls * 0.2;
  // poten (onder alles): drie paar aan het borststuk
  const poot = (k, j) => { const by = borstY - Ls * 0.07 + j * Ls * 0.07, ang = [-0.55, 0.1, 0.65][j], l1 = Ls * 0.2, l2 = Ls * 0.24, l3 = Ls * 0.14;
    const wig = Math.sin(t * 6 + j * 2 + (k > 0 ? 1 : 0)) * 0.04; const x0 = k * Ls * 0.1, x1 = x0 + k * Math.cos(ang + wig) * l1, y1 = by + Math.sin(ang + wig) * l1 - Ls * 0.04;
    const x2 = x1 + k * Math.cos(ang * 1.4 + 0.5) * l2, y2 = y1 + Math.sin(ang * 1.4 + 0.5) * l2, x3 = x2 + k * Math.cos(ang + 0.9) * l3, y3 = y2 + Math.sin(ang + 0.9) * l3;
    ctx.strokeStyle = lijf === 'zwart' ? '#6E655E' : _e4d(f, 0.25); ctx.lineWidth = Math.max(1.4, Ls * 0.022); ctx.beginPath(); ctx.moveTo(x0, by); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.lineWidth = Math.max(1, Ls * 0.014); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke(); };
  for (const k of [-1, 1]) for (let j = 0; j < 3; j++) poot(k, j);
  // achterlijf
  const aw = Ls * (sekse === 'm' ? 0.2 : 0.21), al = Ls * (sekse === 'm' ? 0.24 : 0.28);
  ctx.save(); ctx.beginPath(); if (sekse === 'm') ctx.ellipse(0, achY, aw, al, 0, 0, 6.283);
  else { ctx.moveTo(0, achY - al); ctx.bezierCurveTo(aw * 1.35, achY - al, aw * 1.15, achY + al * 0.55, 0, achY + al * 1.12); ctx.bezierCurveTo(-aw * 1.15, achY + al * 0.55, -aw * 1.35, achY - al, 0, achY - al); }
  shape(ctx, f, d, 1.5); ctx.clip();
  const nb = 6; for (let i = 1; i <= nb; i++) { const yy = achY - al + i * (al * 2.1 / nb); ctx.fillStyle = sekse === 'm' && i >= nb - 1 ? _e4d(f, lijf === 'zwart' ? 0.3 : 0.55) : rgba(_e4d(f, lijf === 'zwart' ? 0.3 : 0.5), 0.85); ctx.fillRect(-aw * 2, yy - al * 0.12, aw * 4, sekse === 'm' && i >= nb - 1 ? al * 0.4 : al * 0.11); }
  ctx.restore();
  // borststuk met haren
  ctx.beginPath(); ctx.ellipse(0, borstY, Ls * 0.15, Ls * 0.17, 0, 0, 6.283); shape(ctx, f, d, 1.5);
  ctx.strokeStyle = _e4d(f, 0.45); ctx.lineWidth = Math.max(1, Ls * 0.008); for (let i = 0; i < 6; i++) { const bx = (i % 3 - 1) * Ls * 0.06, by = borstY - Ls * 0.08 + Math.floor(i / 3) * Ls * 0.1; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.sign(bx || 1) * Ls * 0.012, by + Ls * 0.05); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, borstY + Ls * 0.15, Ls * 0.07, Ls * 0.045, 0, 0, 6.283); shape(ctx, _e4d(f, 0.08), d, 1.2); // schildje
  // vleugels: in rust over het achterlijf, iets uit elkaar (V-vorm)
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * Ls * 0.08, borstY + Ls * 0.02);
    if (vleugel === 'normaal') { ctx.rotate(-k * 0.2); const wl = Ls * 0.86, ww = Ls * 0.16; ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(k * ww * 1.3, wl * 0.15, k * ww * 1.25, wl * 0.85, k * ww * 0.35, wl); ctx.bezierCurveTo(-k * ww * 0.25, wl * 0.92, -k * ww * 0.15, wl * 0.4, 0, 0); ctx.closePath();
      shape(ctx, rgba(E4.vleugel, 0.42), rgba(E4.vleugel, 0.9), 1.4);
      ctx.strokeStyle = rgba('#5E6A78', 0.75); ctx.lineWidth = Math.max(0.8, Ls * 0.006); for (let v = 0; v < 4; v++) { const u = 0.2 + v * 0.22; ctx.beginPath(); ctx.moveTo(k * ww * 0.1 * v, wl * 0.05); ctx.quadraticCurveTo(k * ww * (0.4 + u * 0.6), wl * 0.5, k * ww * (0.2 + u * 0.75), wl * (0.86 + v * 0.025)); ctx.stroke(); } }
    else { ctx.rotate(-k * 0.5); const wl = Ls * 0.14, ww = Ls * 0.07; ctx.beginPath(); ctx.moveTo(0, 0); for (let q = 0; q <= 8; q++) { const u = q / 8; ctx.lineTo(k * (ww * Math.sin(u * 3.1) + (q % 2) * ww * 0.25), wl * u); }
      for (let q = 8; q >= 0; q--) { const u = q / 8; ctx.lineTo(k * ww * 0.15 * Math.sin(u * 3), wl * u); } ctx.closePath(); shape(ctx, rgba(E4.vleugel, 0.55), rgba(E4.vleugel, 0.95), 1.4); }
    ctx.restore(); }
  // kop met ogen en sprieten
  ctx.beginPath(); ctx.ellipse(0, kopY, Ls * 0.13, Ls * 0.085, 0, 0, 6.283); shape(ctx, _e4d(f, -0.0), d, 1.5);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * Ls * 0.1, kopY + Ls * 0.005, Ls * 0.06, Ls * 0.075, k * 0.25, 0, 6.283); shape(ctx, E4.oog, E4.oogD, 1.2);
    ctx.fillStyle = rgba(E4.oogD, 0.6); for (let q = 0; q < 6; q++) { ctx.beginPath(); ctx.arc(k * Ls * 0.1 + ((q % 2) - 0.5) * Ls * 0.03, kopY - Ls * 0.04 + Math.floor(q / 2) * Ls * 0.035, Ls * 0.008, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = _e4d(f, 0.3); ctx.lineWidth = Math.max(1, Ls * 0.012); ctx.beginPath(); ctx.moveTo(k * Ls * 0.03, kopY - Ls * 0.07); ctx.lineTo(k * Ls * 0.05, kopY - Ls * 0.12); ctx.stroke(); }
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, Ls * 0.55, Ls * 0.62, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore();
}

// =====================================================================================
// CHROMOSOOM ALS STAAFJE MET ÉÉN OF TWEE GENEN (zoals staafAllel in Chromosomen 2.1): één chromatide, genbanden goud,
// het allel als letter naast de band. loci = [[u, letter], ...] met u = 0 (boven) … 1 (onder).
// Na crossing-over: segs = [[u0, u1, kleur], …] (stuk van de andere ouder in diens kleur).
function staafGenen(ctx, x, y, h, kl, loci, o = {}) {
  const { a = 1, w = 26, kant = 1, px = 40, segs = null, accent = null, letterA = 1 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const S = segs || [[0, 1, kl]]; const y0 = y - h / 2;
  S.forEach(([u0, u1, c]) => { ctx.strokeStyle = _e4d(c); ctx.lineWidth = w + 3; ctx.beginPath(); ctx.moveTo(x, y0 + u0 * h); ctx.lineTo(x, y0 + u1 * h); ctx.stroke(); });
  S.forEach(([u0, u1, c]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x, y0 + u0 * h); ctx.lineTo(x, y0 + u1 * h); ctx.stroke(); });
  loci.forEach(([u, l], i) => { const by = y0 + u * h; roundRect(ctx, x - w / 2 - 3, by - 7, w + 6, 14, 4); shape(ctx, E4.band, _e4d(E4.band, 0.5), 2);
    if (letterA > 0.01) { ctx.save(); ctx.globalAlpha *= letterA; ctx.font = fTekst(px, 700); ctx.lineJoin = 'round'; ctx.strokeStyle = rgba(C.bgSchema, 0.9); ctx.lineWidth = 7; ctx.textAlign = kant > 0 ? 'left' : 'right';
      ctx.strokeText(l, x + kant * (w / 2 + 14), by + px * 0.36); ctx.fillStyle = accent && accent[i] ? accent[i] : C.text; ctx.fillText(l, x + kant * (w / 2 + 14), by + px * 0.36); ctx.restore(); } });
  ctx.restore();
}
// homoloog paar staafjes (één van elke ouder), letters buitenom
function paarGenen(ctx, x, y, h, loci1, loci2, o = {}) { const { gap = 46, k1 = E4.p1, k2 = E4.p2, a = 1, w = 26, px = 40, segs1 = null, segs2 = null } = o;
  staafGenen(ctx, x - gap / 2, y, h, k1, loci1, { a, w, kant: -1, px, segs: segs1 }); staafGenen(ctx, x + gap / 2, y, h, k2, loci2, { a, w, kant: 1, px, segs: segs2 }); }

// =====================================================================================
// GAMEET als ronde cel met de staafjes erin (haploïd: van elk paar één). inhoud(ctx, cx, cy) tekent de staafjes.
function gameetCel(ctx, x, y, r, inhoud, o = {}) { const { a = 1, hl = 0, dim = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - dim * 0.65);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#2A3A58', 0.9), hl > 0.01 ? C.goud : C.line, hl > 0.01 ? 3 : 1.5);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 6.283); ctx.clip(); inhoud && inhoud(ctx, x, y); ctx.restore(); ctx.restore(); }

// =====================================================================================
// KRUISINGSSCHEMA (zoals film 2: gameten van de ene ouder links, van de andere boven). kop(i, x, y) en zij(j, x, y)
// tekenen de gameten, cel(i, j, x, y, c) de inhoud van een vakje; dim(i, j) 0..1 voor vakjes die ontbreken.
function kruisSchema(ctx, x, y, nKol, nRij, c, o = {}) { const { a = 1, kop, zij, cel, rand = null, kopH = c, zijW = c, gap = 10 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < nKol; i++) kop && kop(i, x + zijW + i * c + c / 2, y + kopH / 2);
  for (let j = 0; j < nRij; j++) zij && zij(j, x + zijW / 2, y + kopH + j * c + c / 2);
  for (let j = 0; j < nRij; j++) for (let i = 0; i < nKol; i++) { const cx = x + zijW + i * c, cy = y + kopH + j * c;
    roundRect(ctx, cx + gap / 2, cy + gap / 2, c - gap, c - gap, 12); shape(ctx, rgba(C.fill, 0.9), rand ? rand(i, j) || C.line : C.line, rand && rand(i, j) ? 3 : 1.5); cel && cel(i, j, cx + c / 2, cy + c / 2, c); }
  ctx.restore(); }

// lettergameet: kaartje met allelen (bv. 'GR'), zoals allelChip in Chromosomen 2.1
function gameetChip(ctx, s, x, y, o = {}) { const { a = 1, px = 40, kl = C.line, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700);
  const w = ctx.measureText(s).width + px * 0.9, h = px * 1.4; ctx.beginPath(); ctx.arc(x, y, Math.max(w, h) / 2, 0, 6.283); shape(ctx, rgba(C.bgSchema, 0.95), hl > 0.01 ? C.goud : kl, hl > 0.01 ? 3 : 1.5);
  text(ctx, s, x, y + px * 0.36, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
