// =====================================================================================
// nieuw_dna1.js — nieuwe tekeningen voor DNA 1 'Wat is DNA?' (lichte remake, fase 1, 25 okt 2026).
// Kandidaten voor bibliotheek/lib_bio.js na Kamiels keuring. Vereist lib.js (C, rgba, lighten, hash, clamp, lerp, ease,
// shape, roundRect, text, fTekst, fMeta, metaText), lib_bio.js (_mixHex, _bioCirc, _bioVoronoi) en lib_micro_evo.js (dnaDraad).
// =====================================================================================

// Vaste DNA-kleuren (C1: DNA paars). Zelfde tinten als de DNA-reeks (dnalib BC), zodat oude en nieuwe films samengaan.
const DNA1 = {
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' },
  rug: '#3E3366', rugR: '#8C7BBF', fosfaat: '#5E4E96', suiker: '#7A68B8',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  plek: { A: [0.33, 0.67], T: [0.33, 0.67], G: [0.2, 0.5, 0.8], C: [0.2, 0.5, 0.8] }
};

// -------------------------------------------------------------------------------------
// BASE ALS RINGVORM. Recept (bron: OpenStax Biology 2e § 14.2 / Lumen 'Structure of DNA'; NPTEL mol. celbiologie lec 26):
//  - purines (A, G) = zesring + vijfring aan elkaar (breed), pyrimidines (C, T) = één zesring (smal).
//  - een paar is altijd purine + pyrimidine, daardoor is elke sport even lang (helix overal 2 nm breed).
//  - A–T houden elkaar vast met twee waterstofbruggen, G–C met drie (stippen op de paarrand, goud als ze verbonden zijn).
//  - 'past' = samen precies de breedte van de sport én de bindingsplekken recht tegenover elkaar (model; in het echt het
//    patroon van donor- en acceptorplekken).
// (x, y) = aanhechting aan de suiker; dir = +1 (base wijst omlaag) of −1 (omhoog); s = schaal (1 → sport van 200 px).
// Bekende fouten: alle basen even groot (dan zie je niet waarom A niet tegenover G past); letters zonder vorm.
// -------------------------------------------------------------------------------------
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const pur = DNA1.purine[b], L = (pur ? 112 : 72) * s, w = 52 * s, kl = DNA1.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  // steeltje naar de suiker
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke();
  const hex = (cy, r) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const px = r * Math.cos(an), py = cy + r * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  const r6 = w * 0.56;
  if (pur) { // vijfring bij de suiker, zesring naar de partner
    const r5 = w * 0.47, c5 = 10 * s + r5 * 0.95; ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + Math.PI + k * 2 * Math.PI / 5; const px = r5 * Math.cos(an), py = c5 + r5 * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, _mixHex(kl, '#121A26', 0.12), lighten(kl, 0.35), 1.5);
    hex(L - r6 * 0.95, r6); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  } else { hex(10 * s + (L - 10 * s) / 2 + 2 * s, r6 * 1.02); shape(ctx, kl, lighten(kl, 0.35), 1.5); }
  // letter (rechtop, ook als dir = −1)
  ctx.save(); ctx.translate(0, pur ? L - r6 * 0.95 : 10 * s + (L - 10 * s) / 2 + 2 * s); ctx.scale(1, dir); ctx.rotate(-rot * 0); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA1.letter[b], 'center'); ctx.restore();
  // bindingsplekken op de paarrand (dwars op de as, bij y = L)
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA1.plek[b].forEach(h => { const px = (h - 0.5) * w * 1.1; _bioCirc(ctx, px, L + 1 * s, 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.75, -4 * s, w * 1.5, L + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen tussen twee basen van een sport (x, y1 = paarrand boven, y2 = paarrand onder)
function bruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA1.plek[b].forEach(h => { const px = x + (h - 0.5) * 52 * s * 1.1; ctx.beginPath(); ctx.moveTo(px, y1 + 4 * s); ctx.lineTo(px, y2 - 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) {
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y, px = x - 70 * s - e * 60 * s, py = y - 26 * s - e * 20 * s, bx = x + 8 * s + e * 30 * s, by = y + R * 0.9 + e * 50 * s;
  ctx.save(); ctx.globalAlpha *= a;
  // verbindingen
  ctx.strokeStyle = DNA1.rugR; ctx.lineWidth = 3 * s; ctx.globalAlpha *= 1; if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx - R * 0.8, sy - R * 0.45); ctx.stroke(); ctx.restore(); }
  // suiker (vijfhoek, punt naar boven = ring-zuurstof)
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA1.suiker, lighten(DNA1.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); // ring-O
  // base aan 1' (rechtsonder)
  baseRing(ctx, bx, by - 10 * s, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  // fosfaat
  _bioCirc(ctx, px, py, 20 * s, DNA1.fosfaat, lighten(DNA1.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers; const lab = ["", "1'", "2'", "3'", "4'"]; // pt index: 0 = O, 1 = 1' (rechtsboven), 2 = 2', 3 = 3', 4 = 4'
    [[1, "1'"], [2, "2'"], [3, "3'"], [4, "4'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy); text(ctx, l, pt[k][0] + dx / d * 26 * s, pt[k][1] + dy / d * 26 * s + 9 * s, fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    text(ctx, "5'", sx - R * 1.25, sy - R * 0.75, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by], c3: pt[3], c5: [sx - R * 0.8, sy - R * 0.45] };
}

// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX (één functie, morph met o.draai 0..1).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 baseparen per winding (0,34 nm per paar, 3,4 nm per winding),
// rechtsdraaiend, grote en kleine groef ongelijk (hier: de tweede streng loopt 140° i.p.v. 180° achter de eerste).
// Ruggengraat (suiker-fosfaat) buiten, basen binnen. Bij draai = 0 een platte ladder met de echte ringvormen.
// x0,y = begin van de as; dx = afstand per basepaar langs de as; seq = volgorde van de bovenste streng.
// o.open (array per sport 0..1) trekt sporten los; o.hl = index die goud omrand wordt. Achterkant donkerder (diepte).
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184; // sport = purine + pyrimidine vult precies de afstand tussen de ruggen
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e; // rechtsdraaiend: as naar rechts, bovenkant draait naar je toe
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? DNA1.rugR : _mixHex(DNA1.rugR, '#121A26', 0.5); ctx.lineWidth = voor ? 16 * s : 13 * s; ctx.stroke(); ctx.strokeStyle = voor ? DNA1.rug : _mixHex(DNA1.rug, '#121A26', 0.4); ctx.lineWidth = voor ? 9 * s : 7 * s; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA1.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen * (e > 0.05 ? (0.55 + 0.45 * (depth + 1) / 2) : 1);
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) bruggen(ctx, A.x, A.y + dirAB * (8 * s + (DNA1.purine[b] ? 112 : 72) * k), B.y - dirAB * (8 * s + (DNA1.purine[c] ? 112 : 72) * k), b, k, bruggenA * (1 - e * 2)); }
    else { const mid = A.y + (B.y - A.y) * (DNA1.purine[b] ? 0.6 : 0.4); ctx.lineWidth = 11 * s; ctx.strokeStyle = DNA1.base[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = DNA1.base[c]; ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  // plekken van de groeven langs de bovenrand (voor labels): kleine groef tussen de toppen die 140° uit elkaar liggen
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}

// -------------------------------------------------------------------------------------
// WANGCELLEN (slijmvlies van de wang, uitstrijkje). Recept (bron: cytomorfometrie van normaal wangslijmvlies,
// Rom J Morphol Embryol 51(3) 2010: celdiameter ± 73 µm, kerndiameter ± 8,7 µm): grote, platte, veelhoekige cellen
// (meerlagig plaveiselepitheel, niet verhoornd) met een kleine ronde kern in het midden (± 1/8 van de cel); in een
// uitstrijkje liggen ze los of half over elkaar, met plooitjes. Kleur: licht (bijna doorzichtig) grijsblauw, kern paars.
// (x, y, w, h) = vak; o.umPx = pixels per micrometer; o.focus = index van de cel die goud omrand wordt. Geeft cellen terug.
// Bekende fouten: wangcel als ronde bol met grote kern (dat is een 'algemene' cel); kern in de hoek.
// -------------------------------------------------------------------------------------
function wangcellen(ctx, x, y, w, h, o = {}) {
  const { umPx = 5, a = 1, focus = -1, seed = 3, t = 0, kernA = 1 } = o; if (a <= 0.01) return [];
  const D = 73 * umPx, cols = Math.ceil(w / (D * 0.85)) + 1, rows = Math.ceil(h / (D * 0.8)) + 1, pts = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const k = r * 31 + c * 7 + seed * 13; pts.push([x + (c + 0.5 * (r % 2) + (hash(k) - 0.5) * 0.5) * D * 0.85, y + (r + (hash(k + 1) - 0.5) * 0.5) * D * 0.8]); }
  const cel = _bioVoronoi('wang' + seed + '_' + Math.round(D) + '_' + Math.round(x) + '_' + Math.round(y), pts, D * 0.62, D * 0.06, 28);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const out = [];
  cel.forEach((cc, i) => { const P = cc.pts.map(([px, py], k) => { const j = hash(i * 17 + k * 3 + seed) - 0.5; return [px + j * D * 0.05, py + j * D * 0.04]; });
    ctx.beginPath(); bioPad(ctx, P, true); ctx.closePath(); shape(ctx, rgba('#AFC0D0', 0.16 + 0.06 * hash(i * 5 + seed)), rgba('#C9D6E4', 0.55), 1.5);
    // plooitjes
    ctx.strokeStyle = rgba('#C9D6E4', 0.22); ctx.lineWidth = 1.2; for (let k = 0; k < 2; k++) { const an = hash(i * 9 + k) * 6.283, L = D * (0.15 + 0.15 * hash(i + k * 5)); const px = cc.c[0] + Math.cos(an + 1) * D * 0.18, py = cc.c[1] + Math.sin(an + 1) * D * 0.18; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + Math.cos(an) * L * 0.5 + 6, py + Math.sin(an) * L * 0.5 - 6, px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
    // kern ± 8,7 µm, licht uit het midden
    const kx = cc.c[0] + (hash(i * 3 + seed) - 0.5) * D * 0.08, ky = cc.c[1] + (hash(i * 4 + seed) - 0.5) * D * 0.08, kr = 8.7 * umPx / 2;
    if (kernA > 0.01) { ctx.save(); ctx.globalAlpha *= kernA; ctx.beginPath(); ctx.ellipse(kx, ky, kr * 1.08, kr * 0.92, hash(i) * 3, 0, 6.283); shape(ctx, rgba(C.kern, 0.85), C.kernR, 1.2);
      for (let k = 0; k < 7; k++) { const an = hash(i * 7 + k) * 6.283, rr = kr * 0.6 * Math.sqrt(hash(i * 11 + k)); _bioCirc(ctx, kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, Math.max(0.8, kr * 0.12), rgba(C.kernR, 0.55)); } ctx.restore(); }
    if (i === focus) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, P, true); ctx.closePath(); ctx.stroke(); }
    out.push({ c: cc.c, kern: [kx, ky], kr, P }); });
  ctx.restore(); return out;
}

// wattenstaafje (Macro): stokje met wattenkop, in de hand; lengte ± 15 cm
function wattenstaafje(ctx, x, y, ang, len, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round';
  ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = len * 0.035; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * 0.86, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(len * 0.92, 0, len * 0.09, len * 0.045, 0, 0, 6.283); shape(ctx, '#F2F2EE', '#C9D6E4', 1.5); ctx.restore(); }

// tennisbal (Schema, schaal voelbaar): diameter 6,7 cm (ITF: 6,54–6,86 cm)
function tennisbal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _bioCirc(ctx, x, y, r, '#C9D45C', '#E3EC8A', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = Math.max(2, r * 0.05); ctx.beginPath(); ctx.arc(x - r * 1.35, y, r * 1.0, -0.75, 0.75); ctx.stroke(); ctx.beginPath(); ctx.arc(x + r * 1.35, y, r * 1.0, Math.PI - 0.75, Math.PI + 0.75); ctx.stroke(); ctx.restore(); }

// reageerbuis met DNA-practicum (Macro/Schema): onderin zeepzout-oplossing met wangcellen (troebel), erboven alcohol
// (helder), op de grens witte draadjes = het DNA van heel veel cellen samen (Canyons/QUT-practicumprotocol). (x, y) = bodem.
function reageerbuisDNA(ctx, x, y, h, o = {}) { const { a = 1, draad = 1, t = 0, ang = 0 } = o; if (a <= 0.01) return; const w = h * 0.2;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const buis = () => { ctx.beginPath(); ctx.moveTo(-w / 2, -h); ctx.lineTo(-w / 2, -w / 2); ctx.arc(0, -w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(w / 2, -h); };
  ctx.save(); buis(); ctx.clip();
  ctx.fillStyle = rgba('#C9D6E4', 0.35); ctx.fillRect(-w, -h * 0.45, 2 * w, h * 0.45);            // zeepoplossing met cellen (troebel)
  ctx.fillStyle = rgba('#AFC0D0', 0.12); ctx.fillRect(-w, -h * 0.8, 2 * w, h * 0.35);             // alcohol
  if (draad > 0.01) { ctx.save(); ctx.globalAlpha *= draad; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = Math.max(1.5, w * 0.05); ctx.lineCap = 'round';
    for (let k = 0; k < 7; k++) { ctx.beginPath(); const x0 = (hash(k * 3) - 0.5) * w * 0.7; let px = x0, py = -h * 0.46; ctx.moveTo(px, py);
      for (let q = 0; q < 6; q++) { px += (hash(k * 11 + q) - 0.5) * w * 0.3 + Math.sin(t + k) * 0.6; py -= h * 0.035 * (0.6 + hash(k + q * 7)); ctx.lineTo(px, py); } ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  buis(); ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = Math.max(2, w * 0.06); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -h, w / 2 + 3, w * 0.12, 0, 0, 6.283); ctx.stroke();
  ctx.restore(); }
