// =====================================================================================
// nieuw_erf5.js — nieuwe tekeningen voor Erfelijkheid 5 'Overerving via het X-chromosoom' (lichte remake, fase 1,
// 28 okt 2026). Kandidaten voor bibliotheek/lib_bio.js na Kamiels keuring.
// Vereist lib.js (C, rgba, lighten, clamp, lerp, ease, shape, roundRect, text, fTekst, fMeta, metaText, naamBij),
// lib_bio.js (_mixHex, chromatideX, stamboomSymbolen, eicelEcht, zaadcelEcht, mitochondrionEcht), lib_cast.js (persoon)
// en teken_chr1.js uit Chromosomen 2.1 (CH, kamer, chromX, kLen, CEN, chromatide1, allelChip).
// =====================================================================================

// Vaste kleuren van de reeks (Chromosomen 2.1): vader teal, moeder oker. Kleurzien: de drie kegeltjes in drie
// duidelijk verschillende paletkleuren (BEELDAFSPRAKEN 28 okt 2026: meer contrast rood/groen/blauw, minder paars).
const XK = { vader: C.teal, moeder: C.oker, S: '#6F8FE0', M: C.groen, L: C.koraal, ziek: C.paars };

// -------------------------------------------------------------------------------------
// GENOTYPE MET SUPERSCRIPT. Tekent bv. 'X^A X^a' of 'X^A Y' met echte superscripts (het lettertype heeft geen ᴬ/ᵃ),
// elk chromosoom in de kleur van de ouder van wie het komt. g = [['X','A','m'], ['Y','','v']]; m = moeder (oker),
// v = vader (teal), n = neutraal (tekstkleur). Geeft de breedte terug.
// -------------------------------------------------------------------------------------
function genoTekst(ctx, g, x, y, px = 48, o = {}) {
  const { al = 'center', a = 1, kleur = true } = o; if (a <= 0.01) return 0;
  const kl = k => !kleur ? C.text : k === 'm' ? XK.moeder : k === 'v' ? XK.vader : C.text;
  ctx.save(); ctx.globalAlpha *= a; ctx.textBaseline = 'alphabetic';
  const fB = fTekst(px, 700), fS = fTekst(Math.round(px * 0.62), 700);
  const wB = s => { ctx.font = fB; return ctx.measureText(s).width; }, wS = s => { ctx.font = fS; return ctx.measureText(s).width; };
  const gap = px * 0.08, tot = g.reduce((s, [b, sup], i) => s + wB(b) + (sup ? wS(sup) + 2 : 0) + (i ? gap : 0), 0);
  let cx = al === 'center' ? x - tot / 2 : al === 'right' ? x - tot : x;
  g.forEach(([b, sup, k], i) => { if (i) cx += gap; ctx.fillStyle = kl(k); ctx.font = fB; ctx.textAlign = 'left'; ctx.fillText(b, cx, y); cx += wB(b);
    if (sup) { ctx.font = fS; ctx.fillText(sup, cx + 2, y - px * 0.42); cx += wS(sup) + 2; } });
  ctx.restore(); return tot;
}
const G = s => s.split(' ').map(t => { const m = t.match(/^([XY])(?::([mvn]))?(?:\^([A-Za-z]))?$/); return [m[1], m[3] || '', m[2] || 'n']; }); // 'X:m^A' = X van moeder met allel A

// -------------------------------------------------------------------------------------
// GESLACHTSCHROMOSOOM ALS STAAFJE met het allel als band (X lang, Y kort, zelfde lengteverhouding als het karyogram
// van Chromosomen 2.1: kLen(23) en kLen(24)). Eén chromatide, want in gameten en schema's is het niet gekopieerd.
// -------------------------------------------------------------------------------------
function geslStaaf(ctx, soort, x, y, s, kl, allel = '', a = 1) { if (a <= 0.01) return; const L = (soort === 'Y' ? kLen(24) : kLen(23)) * s;
  chromatide1(ctx, x, y, L, 0, kl, a, 22 * s);
  if (allel && soort === 'X') { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 13 * s, y - L * 0.08 - 6 * s, 26 * s, 12 * s, 3 * s); shape(ctx, allel === 'a' ? XK.ziek : C.goud, null); ctx.restore(); } }

// -------------------------------------------------------------------------------------
// AARDBEI (nieuw, eenvoudig). Recept: kegelvormige schijnvrucht ± 3 cm, breedste deel bij het kelkje, nootjes
// (zaadjes) als kleine lichte stippen in ondiepe kuiltjes, groen kelkje van 5–10 blaadjes. Rijp = rood, onrijp = groen
// met witte punt. Kleuren zijn hier bewust 'echt' rood en groen (het verschil is het onderwerp van de scène, T3).
// rijp 0..1 mengt groen → rood.
// -------------------------------------------------------------------------------------
function aardbei(ctx, x, y, r, rijp = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const vul = _mixHex('#8DB04A', '#D2383A', rijp), rand = _mixHex('#6E8C38', '#9E2228', rijp);
  ctx.beginPath(); ctx.moveTo(-r * 0.95, -r * 0.55); ctx.bezierCurveTo(-r * 1.1, r * 0.3, -r * 0.35, r * 1.15, 0, r * 1.25); ctx.bezierCurveTo(r * 0.35, r * 1.15, r * 1.1, r * 0.3, r * 0.95, -r * 0.55);
  ctx.quadraticCurveTo(0, -r * 0.95, -r * 0.95, -r * 0.55); ctx.closePath(); shape(ctx, vul, rand, 1.5);
  if (rijp < 0.5) { ctx.beginPath(); ctx.ellipse(0, r * 0.95, r * 0.3, r * 0.28, 0, 0, 6.283); ctx.fillStyle = rgba('#E8E6C8', 0.6 * (1 - rijp * 2)); ctx.fill(); }
  ctx.fillStyle = _mixHex('#D9D27A', '#F2D27A', rijp); for (let i = 0; i < 14; i++) { const u = (i * 0.618) % 1, v = ((i * 0.37) % 1); const px = (u - 0.5) * r * 1.4 * (1 - v * 0.5), py = -r * 0.25 + v * r * 1.2; ctx.beginPath(); ctx.ellipse(px, py, r * 0.05, r * 0.08, 0, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#4E7A3A'; for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * 0.42; ctx.beginPath(); ctx.ellipse(Math.cos(an) * r * 0.45, -r * 0.62 + Math.sin(an) * r * 0.15, r * 0.36, r * 0.11, an, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// Schaal met aardbeien (van boven gezien, iets schuin). seed vast: altijd dezelfde vruchten.
function aardbeienBak(ctx, x, y, w, rijpLijst, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, w * 0.2, 0, 0, Math.PI); ctx.lineTo(x - w / 2, y); ctx.closePath(); shape(ctx, '#B9C2CF', '#8FA0B5', 2);
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, w * 0.12, 0, 0, 6.283); shape(ctx, '#6F7C90', '#8FA0B5', 2);
  rijpLijst.forEach((rp, i) => { const n = rijpLijst.length, u = (i + 0.5) / n; aardbei(ctx, x - w * 0.36 + u * w * 0.72, y - 10 - (i % 2) * 16, w * 0.085, rp, (i % 3 - 1) * 0.3); });
  ctx.restore(); }

// -------------------------------------------------------------------------------------
// KLEURMODEL ROOD-GROEN (deuteranoop), volgens Viénot, Brettel & Mollon 1999 (B26). Alleen voor 'zo ziet hij het', altijd met
// label 'model'. Werkt op het canvas zelf: in de film alleen op een stil deel van het beeld (niet per frame op het hele beeld).
// -------------------------------------------------------------------------------------
function kleurModelDeutan(ctx, x, y, w, h) { // Viénot, Brettel & Mollon (1999), deuteranoop (B26): γ 2,2 → schalen → LMS → M uit L en S → terug
  const im = ctx.getImageData(x, y, w, h), d = im.data, lin = v => Math.pow(v / 255, 2.2), enc = v => 255 * Math.pow(Math.max(0, Math.min(1, v)), 1 / 2.2);
  for (let i = 0; i < d.length; i += 4) { const R = 0.957237 * lin(d[i]) + 0.0213814, G = 0.957237 * lin(d[i + 1]) + 0.0213814, B = 0.957237 * lin(d[i + 2]) + 0.0213814;
    const L = 17.8824 * R + 43.5161 * G + 4.11935 * B, S = 0.0299566 * R + 0.184309 * G + 1.46709 * B, M = 0.494207 * L + 1.24827 * S;
    d[i] = enc(0.080944 * L - 0.130504 * M + 0.116721 * S); d[i + 1] = enc(-0.0102485 * L + 0.0540194 * M - 0.113615 * S); d[i + 2] = enc(-0.000365294 * L - 0.00412163 * M + 0.693513 * S); }
  ctx.putImageData(im, x, y); }

// -------------------------------------------------------------------------------------
// NETVLIES MET KEGELTJES EN STAAFJES (nieuw). Recept (bronnen: OpenStax Biology 2e 'Transduction of light'; vaste
// leerboekbouw): licht komt van boven door de lagen heen; de fotoreceptoren liggen achteraan, met het buitensegment
// naar het pigmentepitheel. Staafje = lang, dun, cilindrisch buitensegment; kegeltje = korter, taps (kegelvormig)
// buitensegment. In de gele vlek vooral kegeltjes; L : M ≈ 2 : 1, S ± 5–10 %. Kleur per type alleen op het
// buitensegment (het lichtgevoelige eiwit), de rest neutraal. o.verschuif (0..1) = het L-eiwit lijkt op M (dimmen
// van het verschil tussen L en M). Bekende fouten: kegeltjes en staafjes even lang; licht dat van de verkeerde kant komt.
// -------------------------------------------------------------------------------------
function netvliesKegels(ctx, x, y, w, h, o = {}) { const { a = 1, staafjes = 1, labels = 1, verschuif = 0, seed = 3 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  // pigmentepitheel (boven, donker) — hier als band bovenaan; de fotoreceptoren hangen eronder; licht komt van onder
  ctx.fillStyle = '#3A2E2A'; ctx.fillRect(x, y, w, h * 0.12); ctx.fillStyle = '#4A3A32'; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.arc(x + (i + 0.5) * w / 18, y + h * 0.12, w / 40, 0, Math.PI); ctx.fill(); }
  const n = 22, dx = w / n; let r = seed; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  const typen = []; for (let i = 0; i < n; i++) { const isStaaf = staafjes && (i % 3 === 1); const v = rnd(); typen.push(isStaaf ? 'staaf' : v < 0.08 ? 'S' : v < 0.38 ? 'M' : 'L'); }
  const top = y + h * 0.12, cel = h * 0.62;
  typen.forEach((tp, i) => { const cx = x + (i + 0.5) * dx; ctx.lineWidth = 1.5;
    if (tp === 'staaf') { roundRect(ctx, cx - dx * 0.16, top, dx * 0.32, cel * 0.55, dx * 0.12); shape(ctx, '#7E8AA0', lighten('#7E8AA0', 0.3), 1.2);
      roundRect(ctx, cx - dx * 0.12, top + cel * 0.55, dx * 0.24, cel * 0.45, dx * 0.1); shape(ctx, '#56627A', '#7E8AA0', 1); }
    else { const kl0 = XK[tp], kl = tp === 'L' ? _mixHex(XK.L, XK.M, verschuif * 0.8) : kl0; const y0 = top + cel * 0.18;
      ctx.beginPath(); ctx.moveTo(cx - dx * 0.32, y0 + cel * 0.38); ctx.lineTo(cx, y0); ctx.lineTo(cx + dx * 0.32, y0 + cel * 0.38); ctx.closePath(); shape(ctx, _mixHex(kl, '#121A26', 0.15), lighten(kl, 0.3), 1.2);
      roundRect(ctx, cx - dx * 0.34, y0 + cel * 0.38, dx * 0.68, cel * 0.44, dx * 0.2); shape(ctx, '#56627A', '#7E8AA0', 1);
      ctx.beginPath(); ctx.arc(cx, y0 + cel * 0.6, dx * 0.14, 0, 6.283); shape(ctx, '#3E3366', '#8C7BBF', 1); }
    // verbinding naar de volgende laag
    ctx.strokeStyle = '#56627A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, top + cel); ctx.lineTo(cx, y + h * 0.82); ctx.stroke(); });
  // volgende lagen (zenuwcellen) als rustige band, licht komt van onderen
  roundRect(ctx, x, y + h * 0.82, w, h * 0.16, 10); shape(ctx, '#2A3A58', '#3E4E6E', 1);
  ctx.restore();
  return { typen, dx, top, cel, labelY: y + h * 0.05 };
}

// -------------------------------------------------------------------------------------
// GEVOELIGHEIDSKROMMEN van de drie kegeltjes (pieken ± 420, 530, 560 nm; B8 B9). Vorm: benadering met een
// lognormale kromme (vereenvoudigd). o.schuif (0..1): het afwijkende rood-eiwit schuift naar ± 545 nm (deuteranomalie-
// achtig voorbeeld uit B3: 'tussen de normale rood- en groencurve').
// -------------------------------------------------------------------------------------
function kegelKrommen(ctx, x, y, w, h, o = {}) { const { a = 1, schuif = 0, as = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const l0 = 380, l1 = 700, px = l => x + (l - l0) / (l1 - l0) * w;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  // spectrumbalk onder de as (gedempt): de enige plek waar 'echte' lichtkleuren staan
  const sp = [[380, '#5A3E8C'], [450, '#3E5FB0'], [490, '#3E8FA8'], [530, '#4FA060'], [575, '#C8B840'], [610, '#D08A3A'], [700, '#B83A34']];
  for (let l = l0; l < l1; l += 2) { let i = 0; while (i < sp.length - 2 && sp[i + 1][0] < l) i++; const u = clamp((l - sp[i][0]) / (sp[i + 1][0] - sp[i][0]), 0, 1); ctx.fillStyle = _mixHex(sp[i][1], sp[i + 1][1], u); ctx.fillRect(px(l), y + 6, w / (l1 - l0) * 2 + 0.5, 14); }
  if (as) { for (let l = 400; l <= 700; l += 100) metaText(ctx, String(l), px(l), y + 58, C.text2, 'center', 28); metaText(ctx, 'golflengte licht · nanometer', x + w / 2, y + 100, C.text2, 'center', 28); metaText(ctx, 'gevoeligheid', x, y - h - 60, C.text2, 'left', 28); }
  const kromme = (pk, kl, lw = 5, dash = null) => { const bw = pk < 470 ? 0.06 : 0.075; ctx.strokeStyle = kl; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.beginPath(); for (let l = l0; l <= l1; l += 3) { const z = Math.log(l / pk) / bw; const v = Math.exp(-z * z / 2); l === l0 ? ctx.moveTo(px(l), y - v * h) : ctx.lineTo(px(l), y - v * h); } ctx.stroke(); ctx.setLineDash([]); };
  kromme(420, XK.S); kromme(530, XK.M); if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= 0.4; kromme(560, XK.L, 3, [10, 10]); ctx.restore(); }
  kromme(lerp(560, 545, schuif), XK.L);
  ctx.restore(); return { px }; }

// -------------------------------------------------------------------------------------
// MITOCHONDRIAAL DNA: kleine ringetjes in de matrix van mitochondrionEcht (2–10 kopieën per mitochondrion,
// circulair, B15 B22). Paars = DNA (C1), klein: ± 5 micrometer omtrek, vergroot getekend.
// -------------------------------------------------------------------------------------
function mtRingen(ctx, anker, s = 1, n = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const [x, y] = anker.matrix || anker.mid;
  for (let i = 0; i < n; i++) { const rx = x + (i - (n - 1) / 2) * 34 * s, ry = y + (i % 2 ? 8 : -6) * s; ctx.strokeStyle = lighten(C.kernR, 0.25); ctx.lineWidth = 2.2 * s; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283, rr = 11 * s * (1 + 0.12 * Math.sin(an * 3 + i)); k ? ctx.lineTo(rx + Math.cos(an) * rr, ry + Math.sin(an) * rr * 0.8) : ctx.moveTo(rx + rr, ry); } ctx.closePath(); ctx.stroke(); }
  ctx.restore(); }

// =====================================================================================
// Extra hulpjes voor de film (Erfelijkheid 5, 28 okt 2026)
// =====================================================================================
const E5 = { tafelY: 640 };
// stamboomsymbool: vierkant = man, rondje = vrouw; ziek = paars gevuld, drager = paars stipje (zoals stamboomSymbolen)
function symbool(ctx, x, y, sekse, o = {}) { const { a = 1, r = 40, ziek = 0, drager = 0, hl = 0, lab = null, sub = null, id = null, labKl = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const vorm = () => { ctx.beginPath(); if (sekse === 'm') roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 4); else ctx.arc(x, y, r, 0, 6.283); };
  vorm(); ctx.fillStyle = ziek ? _mixHex('#243450', C.paars, ziek) : '#243450'; ctx.fill();
  if (id && typeof persoon === 'function' && CAST[id]) { ctx.save(); vorm(); ctx.clip(); const h = id === 'jens' || id === 'levi' ? 230 * r / 40 : 270 * r / 40; persoon(ctx, id, x, y + h * 0.83, h, { uit: 'blij' }); if (ziek) { ctx.fillStyle = rgba(C.paars, 0.45 * ziek); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); } ctx.restore(); }
  vorm(); ctx.strokeStyle = ziek > 0.5 ? lighten(C.paars, 0.4) : C.text; ctx.lineWidth = ziek > 0.5 ? 6 : 3; ctx.stroke();
  if (drager > 0.01) { ctx.save(); ctx.globalAlpha *= drager; ctx.beginPath(); ctx.arc(x + r * 0.68, y + r * 0.68, r * 0.26, 0, 6.283); ctx.fillStyle = C.paars; ctx.fill(); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r * 1.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (lab) { if (Array.isArray(lab)) genoTekst(ctx, lab, x, y + r + 52, 40); else text(ctx, lab, x, y + r + 48, fTekst(34, 700), labKl || C.text, 'center'); }
  if (sub) metaText(ctx, sub, x, y + r + 88, C.grain, 'center', 28);
  ctx.restore(); }
function paarLijn(ctx, x1, x2, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.restore(); }
function kindLijnen(ctx, xm, y0, y1, kids, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3.5; const ym = (y0 + y1) / 2; ctx.beginPath(); ctx.moveTo(xm, y0); ctx.lineTo(xm, ym); ctx.moveTo(Math.min(xm, ...kids), ym); ctx.lineTo(Math.max(xm, ...kids), ym); kids.forEach(k => { ctx.moveTo(k, ym); ctx.lineTo(k, y1); }); ctx.stroke(); ctx.restore(); }
// telpictogram (alleen voor tellingen, BEELDAFSPRAKEN)
function telPop(ctx, x, y, s, kl, a = 1, vrouw = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kl; ctx.beginPath(); ctx.arc(x, y - 30 * s, 9 * s, 0, 6.283); ctx.fill();
  ctx.beginPath(); if (vrouw) { ctx.moveTo(x - 13 * s, y); ctx.lineTo(x + 13 * s, y); ctx.lineTo(x + 6 * s, y - 19 * s); ctx.lineTo(x - 6 * s, y - 19 * s); } else roundRect(ctx, x - 9 * s, y - 19 * s, 18 * s, 19 * s, 5 * s); ctx.fill(); ctx.restore(); }
// pijl met kop
function pijlE(ctx, x1, y1, x2, y2, kl, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(an - 0.45), y2 - 16 * Math.sin(an - 0.45)); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 16 * Math.cos(an + 0.45), y2 - 16 * Math.sin(an + 0.45)); ctx.stroke(); ctx.restore(); }
function kruisE(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
// genotype in een kaartje
function genoKaart(ctx, g, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { w = 230, h = 92, px = 46, rand = null, sub = null } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, rgba(C.bgSchema, 0.95), rand || C.line, rand ? 3 : 1.5); genoTekst(ctx, typeof g === 'string' ? G(g) : g, x, y + px * 0.36, px); if (sub) metaText(ctx, sub, x, y + h / 2 + 34, C.grain, 'center', 28); ctx.restore(); }
// keuken/kamer met tafel, opa en aardbeien (cold open + recap)
function aardbeiTafel(ctx, t, o = {}) { const { jens = 1, hand = 0 } = o; kamer(ctx); LIJSTEN.forEach(([id, x]) => lijstje(ctx, id, x, 150, 1, id === 'opabos' ? (o.lijstHl || 0) : 0));
  persoon(ctx, 'opabos', 720, VLOER, 600, { uit: 'blij', pose: 'vasthouden', kijk: 1, t: t * 0.6, hold: (c, x, y) => { if (hand) aardbei(c, x + 8, y - 6, 26, o.handRijp ?? 0.1, 0.3); } });
  if (jens) persoon(ctx, 'jens', 1130, VLOER, 400, { uit: 'blij', kijk: -1, t: t * 0.6 + 1.1 });
  roundRect(ctx, 560, E5.tafelY, 860, 24, 6); shape(ctx, '#6A5440', '#836A52', 2); ctx.fillStyle = '#54402F'; ctx.fillRect(590, E5.tafelY + 24, 22, VLOER - E5.tafelY - 24); ctx.fillRect(1368, E5.tafelY + 24, 22, VLOER - E5.tafelY - 24);
  aardbeienBak(ctx, 860, 630, 300, o.bakL || [1, 0.1, 1, 1, 0.05, 1]); aardbeienBak(ctx, 1200, 630, 300, o.bakR || [0.1, 1, 0.05, 0.1, 1, 0.1]); }
