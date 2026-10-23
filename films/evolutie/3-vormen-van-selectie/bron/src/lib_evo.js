// Evolutie v2 — reeksbibliotheek (22 okt 2026). Vaste objecten die in elke film van de reeks hetzelfde zijn.
// Allelkleuren door de hele reeks: allel 1 = teal, allel 2 = oker (seriebrief). Krachten in film 5: selectie groen, drift goud, genenstroom teal-licht, mutatie paars.
const EVO = { a1: '#5BA4C9', a2: '#C9A35C', a1R: '#9CCBE3', a2R: '#E6CC94', glas: '#AFC0D0',
  kracht: { selectie: '#7FC48F', drift: '#E0B64A', stroom: '#9CCBE3', mutatie: '#8C7BBF' } };

// ---- De genenpool: een glazen pot met knikkers (allelen) ----
// anker (x, y) = midden van de bodem; s = schaal (s=1 → pot 260 breed, 300 hoog). o.p = aandeel allel 1 (teal); o.n = aantal knikkers;
// o.extra = [[kleur, aantal]] voor een derde allel (mutatie); o.label, o.meta = naam onder de pot; o.leeg = 0..1 (pot deels leeg, bv. na flessenhals)
function pot(ctx, x, y, s = 1, o = {}) {
  const { p = 0.5, n = 60, seed = 1, label = null, meta = null, a = 1, extra = null, leeg = 0, deksel = false, glans = true } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 260, h = 300, r = 34;
  // knikkers: gestapeld vanaf de bodem in een los, onregelmatig raster
  const kr = 13; const kol = 9; const kleuren = [];
  const nE = extra ? extra.reduce((t, e) => t + e[1], 0) : 0; const n1 = Math.round((n - nE) * p);
  for (let i = 0; i < n; i++) kleuren.push(i < n1 ? 'a1' : i < n - nE ? 'a2' : 'x');
  // vaste schudding zodat de kleuren gemengd liggen
  for (let i = kleuren.length - 1; i > 0; i--) { const j = Math.floor(hash(seed * 31 + i * 7) * (i + 1)); [kleuren[i], kleuren[j]] = [kleuren[j], kleuren[i]]; }
  let ei = 0; const exKleur = []; if (extra) extra.forEach(([k, m]) => { for (let q = 0; q < m; q++) exKleur.push(k); });
  ctx.save(); roundRect(ctx, -w / 2 + 6, -h + 40, w - 12, h - 46, r - 6); ctx.clip();
  for (let i = 0; i < n; i++) {
    const rij = Math.floor(i / kol), k = i % kol, verschuif = (rij % 2) * kr;
    const kx = -w / 2 + 26 + k * (kr * 2.25) + verschuif + (hash(seed + i * 3.1) - 0.5) * 5;
    const ky = -18 - rij * (kr * 1.95) + (hash(seed + i * 5.7) - 0.5) * 4;
    if (ky < -h + 60) break;
    let f, rr; if (kleuren[i] === 'a1') { f = EVO.a1; rr = EVO.a1R; } else if (kleuren[i] === 'a2') { f = EVO.a2; rr = EVO.a2R; } else { f = exKleur[ei++ % exKleur.length]; rr = _lt(f, 0.4); }
    circ(ctx, kx, ky, kr, f, rr, 2);
    circ(ctx, kx - kr * 0.35, ky - kr * 0.35, kr * 0.22, 'rgba(255,255,255,0.35)');
  }
  ctx.restore();
  // glas: lijntekening als in de labbibliotheek (Part C4), geen verloop
  ctx.strokeStyle = EVO.glas; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-w / 2 + 34, -h + 10); ctx.lineTo(-w / 2 + 34, -h + 34); ctx.quadraticCurveTo(-w / 2, -h + 44, -w / 2, -h + 80);
  ctx.lineTo(-w / 2, -r); ctx.quadraticCurveTo(-w / 2, 0, -w / 2 + r, 0); ctx.lineTo(w / 2 - r, 0); ctx.quadraticCurveTo(w / 2, 0, w / 2, -r);
  ctx.lineTo(w / 2, -h + 80); ctx.quadraticCurveTo(w / 2, -h + 44, w / 2 - 34, -h + 34); ctx.lineTo(w / 2 - 34, -h + 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 + 26, -h + 10); ctx.lineTo(w / 2 - 26, -h + 10); ctx.stroke();
  if (glans) { ctx.strokeStyle = 'rgba(242,242,238,0.22)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w / 2 + 22, -h + 100); ctx.lineTo(-w / 2 + 22, -70); ctx.stroke(); }
  if (deksel) { roundRect(ctx, -w / 2 + 18, -h - 12, w - 36, 24, 8); shape(ctx, '#3A4A66', '#8FA0B5', 2); }
  ctx.restore();
  if (label) { ctx.save(); ctx.globalAlpha *= a; text(ctx, label, x, y + 52 * Math.max(0.7, s), fTekst(36, 600), C.text, 'center'); if (meta) metaText(ctx, meta, x, y + 52 * Math.max(0.7, s) + 34, C.grain, 'center', 26); ctx.restore(); }
}

// ---- Allelbalk: de allelfrequentie als één balk onder de pot ----
// (x, y) = linksboven; w breed; p = aandeel allel 1. o.namen = ['A', 'a'] toont letters + percentages
function allelBalk(ctx, x, y, w, p, o = {}) {
  const { h = 34, a = 1, namen = null, procent = true, extra = null } = o;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, h / 2); ctx.save(); ctx.clip();
  ctx.fillStyle = EVO.a1; ctx.fillRect(x, y, w * p, h);
  let q = 1 - p, xe = x + w; if (extra) { for (const [k, f] of extra) { ctx.fillStyle = k; ctx.fillRect(xe - w * f, y, w * f, h); xe -= w * f; q -= f; } }
  ctx.fillStyle = EVO.a2; ctx.fillRect(x + w * p, y, xe - (x + w * p), h); ctx.restore();
  roundRect(ctx, x, y, w, h, h / 2); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  if (procent) {
    const t1 = (namen ? namen[0] + ' ' : '') + Math.round(p * 100) + '%', t2 = (namen ? namen[1] + ' ' : '') + Math.round((1 - p - (extra ? extra.reduce((s, e) => s + e[1], 0) : 0)) * 100) + '%';
    text(ctx, t1, x, y + h + 40, fTekst(32, 700), EVO.a1R, 'left'); text(ctx, t2, x + w, y + h + 40, fTekst(32, 700), EVO.a2R, 'right');
  }
  ctx.restore();
}

// ---- Histogram van een kenmerk (Schema): normale verdeling met staafjes, optioneel een tweede (oude) verdeling als stippellijn ----
// (x, y) = linksonder van de as; mu en sd in 0..1 van de asbreedte; o.oud = {mu, sd}; o.kleur; o.bimodaal = [mu2, sd2, gewicht]; o.as = [links, rechts] labels
function histogram(ctx, x, y, w, h, mu, sd, o = {}) {
  const { kleur = C.teal, oud = null, n = 22, a = 1, as = null, titel = null, bimodaal = null, gedimd = null } = o;
  ctx.save(); ctx.globalAlpha *= a;
  const f = (u, m, s) => Math.exp(-0.5 * ((u - m) / s) ** 2);
  const dicht = (u) => bimodaal ? Math.max(f(u, mu, sd) * (1 - bimodaal[2]), f(u, bimodaal[0], bimodaal[1]) * bimodaal[2]) / Math.max(1 - bimodaal[2], bimodaal[2]) : f(u, mu, sd);
  const bw = w / n;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, v = dicht(u); if (v < 0.02) continue;
    const bh = v * h; const dimd = gedimd && (u < gedimd[0] || u > gedimd[1]);
    roundRect(ctx, x + i * bw + 3, y - bh, bw - 6, bh, 4); shape(ctx, rgba(kleur, dimd ? 0.18 : 0.75), dimd ? rgba(kleur, 0.35) : _lt(kleur, 0.35), 1.5); }
  if (oud) { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 80; i++) { const u = i / 80, v = f(u, oud.mu, oud.sd); const px = x + u * w, py = y - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x + w + 10, y); ctx.moveTo(x, y + 10); ctx.lineTo(x, y - h - 30); ctx.stroke();
  if (as) { metaText(ctx, as[0], x, y + 44, C.text2, 'left', 26); metaText(ctx, as[1], x + w, y + 44, C.text2, 'right', 26); }
  if (titel) metaText(ctx, titel, x, y - h - 50, C.grain, 'left', 26);
  ctx.restore();
}

// ---- Cladogram (Schema): bladeren van links naar rechts bovenaan, wortel onderaan. Boom als genest array: ['haai', ['dolfijn', 'mens']] ----
// geeft posities terug; o.kenmerken = [{bij: knooppuntindex, tekst}]; o.markeer = naam van blad in goud; o.dim = [namen]
function cladogram(ctx, x, y, w, h, boom, o = {}) {
  const { a = 1, kleur = C.line, markeer = [], dim = [], lw = 4, px = 36, wortel = true, tekenBlad = null } = o;
  ctx.save(); ctx.globalAlpha *= a;
  const bladeren = []; (function telt(b) { if (Array.isArray(b)) b.forEach(telt); else bladeren.push(b); })(boom);
  const dx = w / Math.max(1, bladeren.length - 1); let bi = 0; const knopen = [];
  const diepte = (b) => Array.isArray(b) ? 1 + Math.max(...b.map(diepte)) : 0; const D = diepte(boom);
  function plaats(b) { if (!Array.isArray(b)) { const p = { x: x + (bi++) * dx, y: y - h, naam: b }; return p; }
    const kids = b.map(plaats); const d = diepte(b); const p = { x: kids.reduce((s, k) => s + k.x, 0) / kids.length, y: y - h + (d / D) * h, kids }; knopen.push(p); return p; }
  const top = plaats(boom);
  function teken(p) { if (!p.kids) return; for (const k of p.kids) { ctx.strokeStyle = (k.naam && dim.includes(k.naam)) ? rgba(kleur, 0.35) : kleur; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(k.x, k.y); ctx.stroke(); teken(k); } }
  if (wortel) { ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(top.x, top.y); ctx.lineTo(top.x - 40, top.y + 40); ctx.stroke(); }
  teken(top);
  for (const kn of knopen) circ(ctx, kn.x, kn.y, 7, C.bgSchema, kleur, 3);
  (function namen(p) { if (p.kids) return p.kids.forEach(namen); const gem = markeer.includes(p.naam), gd = dim.includes(p.naam);
    if (tekenBlad) tekenBlad(ctx, p.naam, p.x, p.y - 20, gd ? 0.35 : 1);
    text(ctx, p.naam, p.x, p.y - (tekenBlad ? 150 : 20), fTekst(px, 600), gem ? C.goud : gd ? rgba(C.text, 0.35) : C.text, 'center'); })(top);
  ctx.restore();
  return { top, knopen };
}

// ---- Individuen als kleine stippen-silhouetten in een populatie (Macro): kenmerk in allelkleur, gedimd = weg ----
function populatieStip(ctx, x, y, r, kleur, a = 1) { circ(ctx, x, y, r, rgba(kleur, a), _lt(kleur, 0.3), 1.5); }

// ---- Generatieteller (Meta, linksonder in beeld) ----
function generatie(ctx, nr, x = 80, y = 860) { metaText(ctx, 'generatie ' + nr, x, y, C.text2, 'left', 28); }

// ---- Standaardkoppen voor storyboardstills ----
function evoTag(ctx, film, hfst) { metaText(ctx, `EVOLUTIE ${film}/8 · ${hfst}`, 80, 78, C.text2, 'left', 26); }
function vwoMarker(ctx) { ctx.fillStyle = C.paars; ctx.fillRect(0, 0, 6, H); metaText(ctx, 'VWO', W - 80, 78, C.paars, 'right', 28); }
function ondertitel(ctx, s) { if (!s) return; ctx.save(); ctx.font = fTekst(40, 700); const w = Math.min(1500, ctx.measureText(s).width + 80); roundRect(ctx, W / 2 - w / 2, 930, w, 92, 12); ctx.fillStyle = 'rgba(13,20,32,0.9)'; ctx.fill(); text(ctx, s, W / 2, 990, fTekst(40, 700), C.text, 'center'); ctx.restore(); }
function hoofdstukKaart(ctx, nr, titel, vraag) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'HOOFDSTUK ' + nr, 160, 380, C.goud, 'left', 30); text(ctx, titel, 160, 480, fTitel(84), C.text, 'left'); if (vraag) text(ctx, vraag, 160, 570, fTekst(48, 500), C.text2, 'left'); }
function vraagKaart(ctx, vraag, opties, film) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); if (film) evoTag(ctx, film, 'VRAAG');
  text(ctx, 'Wat denk je?', 140, 230, fTitel(76), C.text, 'left'); const regels = Array.isArray(vraag) ? vraag : [vraag]; regels.forEach((r, i) => text(ctx, r, 140, 320 + i * 58, fTekst(46, 500), C.text2, 'left'));
  const y0 = 320 + regels.length * 58 + 30; opties.forEach((t, i) => { roundRect(ctx, 140, y0 + i * 124, 1300, 100, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2); text(ctx, 'ABCD'[i], 184, y0 + i * 124 + 64, fTekst(44, 800), C.goud, 'left'); text(ctx, t, 244, y0 + i * 124 + 64, fTekst(40, 500), C.text, 'left'); });
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(140, y0 + opties.length * 124 + 20); ctx.lineTo(140 + 1300 * 0.6, y0 + opties.length * 124 + 20); ctx.stroke(); }
function titelKaart(ctx, film, titel, vraag, beeld) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, `HAVO · VWO · EVOLUTIE ${film}/8`, W - 80, 78, C.text2, 'right', 26);
  text(ctx, titel, 120, 330, fTitel(92), C.text, 'left'); if (vraag) (Array.isArray(vraag) ? vraag : [vraag]).forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left')); if (beeld) beeld(ctx); }
function macroNacht(ctx, o = {}) { const { horizon = 640, heuvel = true } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, horizon - 120, W, 120);
  if (heuvel) { vul(ctx, [[-50, horizon], [300, horizon - 70], [700, horizon - 30], [1100, horizon - 90], [1500, horizon - 40], [1980, horizon - 80], [1980, H], [-50, H]], C.bgMacroHill); vul(ctx, [[-50, horizon + 120], [500, horizon + 80], [1000, horizon + 130], [1500, horizon + 90], [1980, horizon + 120], [1980, H], [-50, H]], C.bgMacroFront); }
  else { ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, horizon, W, H - horizon); } }

// ---- Aziatisch lieveheersbeestje (Harmonia axyridis), bovenaanzicht ----
// Recept (C9): lijf ovaal ±7 mm, lengte:breedte ≈ 1,2; halsschild wit/crème met zwarte M- of W-vlek; kop klein, deels onder het halsschild; 6 poten uit de borst (3 per kant, alleen tarsen zichtbaar buiten de rand), korte geknotte antennes.
// Vormen: 'succinea' (oranje, 0–19 zwarte stippen), 'conspicua' (zwart, 2 rode/oranje vlekken), 'spectabilis' (zwart, 4 rode vlekken). Bekende fout: rond als een knikker, poten uit het schild.
function lhb(ctx, x, y, s = 1, o = {}) {
  const { vorm = 'succinea', stippen = 12, rot = 0, a = 1, seed = 3, open = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const rug = vorm === 'succinea' ? '#D9792E' : '#1B1A1C', vlek = vorm === 'succinea' ? '#1B1A1C' : '#D2452C';
  // poten (uit de borst, onder het schild vandaan)
  ctx.strokeStyle = '#2A2422'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (const k of [-1, 1]) for (const [py, hoek] of [[-22, -0.5], [0, 0.05], [20, 0.55]]) { ctx.beginPath(); ctx.moveTo(k * 30, py); ctx.lineTo(k * 62, py + hoek * 30 - 6); ctx.lineTo(k * 74, py + hoek * 50); ctx.stroke(); }
  // antennes
  ctx.lineWidth = 2.5; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 8, -78); ctx.quadraticCurveTo(k * 20, -96, k * 26, -98); ctx.stroke(); circ(ctx, k * 27, -98, 3.5, '#2A2422'); }
  // kop
  ctx.beginPath(); ctx.ellipse(0, -70, 20, 13, 0, 0, 6.283); ctx.fillStyle = '#1B1A1C'; ctx.fill(); circ(ctx, -11, -72, 3.2, '#E9E2CC'); circ(ctx, 11, -72, 3.2, '#E9E2CC');
  // halsschild crème met zwarte M
  ctx.beginPath(); ctx.moveTo(-40, -44); ctx.quadraticCurveTo(-38, -66, 0, -68); ctx.quadraticCurveTo(38, -66, 40, -44); ctx.quadraticCurveTo(0, -38, -40, -44); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#1B1A1C'; ctx.beginPath(); ctx.moveTo(-18, -44); ctx.lineTo(-12, -60); ctx.lineTo(-4, -52); ctx.lineTo(0, -60); ctx.lineTo(4, -52); ctx.lineTo(12, -60); ctx.lineTo(18, -44); ctx.quadraticCurveTo(0, -41, -18, -44); ctx.fill();
  if (vorm !== 'succinea') { circ(ctx, -28, -52, 6, '#EDE6D2'); circ(ctx, 28, -52, 6, '#EDE6D2'); }
  // dekschilden
  const dek = (k) => { ctx.beginPath(); ctx.moveTo(0, -42); ctx.quadraticCurveTo(k * 44, -44, k * 50, -6); ctx.quadraticCurveTo(k * 52, 42, k * 4, 62); ctx.lineTo(0, 62); ctx.closePath(); };
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * open * 18, 0); ctx.rotate(k * open * 0.35); dek(k); ctx.fillStyle = rug; ctx.fill(); ctx.strokeStyle = _lt(rug, 0.25); ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); dek(k); ctx.clip();
    if (vorm === 'succinea') { const pos = [[18, -26], [34, -10], [14, -2], [30, 14], [12, 22], [26, 36], [40, 28], [20, 46], [36, -28], [8, 40]]; for (let i = 0; i < Math.min(stippen / 2, pos.length); i++) circ(ctx, k * pos[i][0], pos[i][1], 5.4, vlek); if (stippen % 2) circ(ctx, 0, -32, 5, vlek); }
    else if (vorm === 'conspicua') { ctx.beginPath(); ctx.ellipse(k * 26, -14, 14, 12, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); }
    else { ctx.beginPath(); ctx.ellipse(k * 26, -18, 11, 9, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 24, 28, 10, 8, 0, 0, 6.283); ctx.fill(); }
    ctx.restore(); ctx.restore(); }
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -42); ctx.lineTo(0, 62); ctx.stroke();
  ctx.restore();
}

// ---- Schaalbalk / snelheidslabel (Meta, linksonder buiten de ondertitelzone) ----
function evoSchaal(ctx, tekst) { metaText(ctx, tekst, 80, 880, C.text2, 'left', 26); }
