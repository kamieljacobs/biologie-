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
const G = s => s.split(' ').map(t => { const m = t.match(/^([XY])(?:\^([Aa]))?(?::([mvn]))?$/); return [m[1], m[2] || '', m[3] || 'n']; });

// -------------------------------------------------------------------------------------
// GESLACHTSCHROMOSOOM ALS STAAFJE met het allel als band (X lang, Y kort, zelfde lengteverhouding als het karyogram
// van Chromosomen 2.1: kLen(23) en kLen(24)). Eén chromatide, want in gameten en schema's is het niet gekopieerd.
// -------------------------------------------------------------------------------------
function geslStaaf(ctx, soort, x, y, s, kl, allel = '', a = 1) { if (a <= 0.01) return; const L = (soort === 'Y' ? kLen(24) : kLen(23)) * s;
  chromatide1(ctx, x, y + L / 2, L, 0, kl, a, 11 * s);
  if (allel && soort === 'X') { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 9 * s, y - L * 0.08 - 6 * s, 18 * s, 12 * s, 3 * s); shape(ctx, allel === 'a' ? XK.ziek : C.goud, null); ctx.restore(); } }

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
// KLEURMODEL ROOD-GROEN (deuteranoop). Rekent een stuk van het canvas om met de gangbare benadering voor dichromaten
// (lineaire RGB → LMS → M-kegeltje uit L en S voorspeld → terug). Alleen voor 'zo ziet hij het', altijd met label 'model'.
// -------------------------------------------------------------------------------------
function kleurModelDeutan(ctx, x, y, w, h) {
  const im = ctx.getImageData(x, y, w, h), d = im.data; const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }, gam = v => { v = Math.max(0, Math.min(1, v)); return 255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055); };
  for (let i = 0; i < d.length; i += 4) { const R = lin(d[i]), Gg = lin(d[i + 1]), B = lin(d[i + 2]);
    // projectie voor een deuteranoop in lineaire RGB (gangbare benadering; bron nog niet zelf geopend → label 'model')
    const r2 = 0.29275 * R + 0.70725 * Gg, g2 = 0.29275 * R + 0.70725 * Gg, b2 = -0.02234 * R + 0.02234 * Gg + B;
    d[i] = gam(r2); d[i + 1] = gam(g2); d[i + 2] = gam(b2); }
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
  if (as) { for (let l = 400; l <= 700; l += 100) metaText(ctx, String(l), px(l), y + 58, C.text2, 'center', 28); metaText(ctx, 'golflengte licht · nanometer', x + w / 2, y + 100, C.text2, 'center', 28); metaText(ctx, 'gevoeligheid', x - 20, y - h - 20, C.text2, 'left', 28); }
  const kromme = (pk, kl, lw = 5, dash = null) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.beginPath(); for (let l = l0; l <= l1; l += 3) { const z = Math.log(l / pk) / 0.075; const v = Math.exp(-z * z / 2); l === l0 ? ctx.moveTo(px(l), y - v * h) : ctx.lineTo(px(l), y - v * h); } ctx.stroke(); ctx.setLineDash([]); };
  kromme(420, XK.S); kromme(530, XK.M); if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= 0.4; kromme(560, XK.L, 3, [10, 10]); ctx.restore(); }
  kromme(lerp(560, 545, schuif), XK.L);
  ctx.restore(); return { px }; }

// -------------------------------------------------------------------------------------
// MITOCHONDRIAAL DNA: kleine ringetjes in de matrix van mitochondrionEcht (2–10 kopieën per mitochondrion,
// circulair, B15 B22). Paars = DNA (C1), klein: ± 5 micrometer omtrek, vergroot getekend.
// -------------------------------------------------------------------------------------
function mtRingen(ctx, anker, s = 1, n = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const [x, y] = anker.matrix || anker.mid;
  for (let i = 0; i < n; i++) { const rx = x + (i - (n - 1) / 2) * 34 * s, ry = y + (i % 2 ? 8 : -6) * s; ctx.strokeStyle = C.kernR; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283, rr = 11 * s * (1 + 0.12 * Math.sin(an * 3 + i)); k ? ctx.lineTo(rx + Math.cos(an) * rr, ry + Math.sin(an) * rr * 0.8) : ctx.moveTo(rx + rr, ry); } ctx.closePath(); ctx.stroke(); }
  ctx.restore(); }
