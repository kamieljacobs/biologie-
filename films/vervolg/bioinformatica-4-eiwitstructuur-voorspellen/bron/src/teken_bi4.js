// Wat word jij? · Bio-informatica · film 4 Van letters naar vorm — eigen tekeningen (fase A, 25 okt 2026; na keuring Kamiel 25 okt)
// Hart van de film: EIWITMODEL dat vouwt (eiwit3D), sinds de keuring op een ECHT eiwit: PDB 5DFR, dihydrofolaatreductase (DHFR)
// van de bacterie E. coli zonder ligand (Bystroff & Kraut 1991, röntgen 2,3 Å). Cα-coördinaten, volgorde en secundaire structuur
// staan in teken_bi4_5dfr.js (gegenereerd met werk/pdb/maak_eiwit_js.py uit openmm/openmm examples/benchmarks/5dfr_minimized.pdb).
// Recept:
//  - één kraal per aminozuur (het Cα-atoom), afstand tussen buren ± 3,8 Å; 159 aminozuren, acht β-strengen en vier α-helices
//    (PDB-101 'Dihydrofolate reductase': 'eight central β-sheets and four flanking α-helices');
//  - helices en strengen komen uit de Cα-geometrie (helix: i→i+2/3/4 = 5,5/5,3/6,4 Å; streng: ladder met buren < 5,8 Å);
//  - holte = het actieve centrum in de kloof tussen de twee domeinen (PDB-101): Ile5, Ala7, Met20, Asp27, Leu28, Phe31, Ile94, Thr113;
//  - de Met20-lus (aminozuur 9–24) ligt over de holte en kan open en dicht (PDB-101: 'closed, occluded, open'): dat is de lus die
//    in H4 onzeker (oranje) is en bij binding beweegt; de afloop van de envelop blijft een voorbeeld ('voorbeeld · zo gaat het vaak');
//  - ongevouwen: een losse kluwen (random coil), ± 2× zo groot als het gevouwen eiwit (geen meterslange rechte draad);
//  - vouwen = morph van de bindingsrichtingen: eerst lokale structuur (helices draaien op), dan een ruime vorm, dan de echte vorm.
// Bekende fouten: eiwit als bol; vouwen als wissel; helix links- in plaats van rechtsdraaiend; kralen die door elkaar schuiven.
// Kleuren: aminozuren oker (AA_KL uit het reeksobject); betrouwbaarheid per stuk zoals de AlphaFold-databank
// (donkerblauw zeer zeker → lichtblauw → geel → oranje zeer onzeker; EMBL-EBI pLDDT, UCSF ChimeraX alphafold-colors), gedempt.

// =====================================================================================================
// REEKSOBJECT 'SCHERM MET CODE / SEQUENTIES' (vastgelegd door film 1; films 2–4 kopiëren dit blok letterlijk)
// =====================================================================================================
// Gebruiksnoot
//   Vereist: lib.js (C, rgba, lighten, clamp, lerp, ease, shape, roundRect, text, fTekst, fMeta, metaText) en circ().
//   Kopieer alles van hier tot '— einde reeksobject —' bovenaan de eigen teken_<d>.js. Niets in dit blok aanpassen;
//   wil een film iets extra, dan via de opties of in een eigen functie eronder.
//
//   codeScherm(ctx, x, y, w, h, regels, o)   donker editorvenster met tabbalk; geeft geometrie terug.
//       regels  array met regels Python (strings); syntax in de betekeniskleuren (sleutelwoord goud, "tekst" paars,
//               getal teal, # commentaar grijs, rest wit). Regelnummers links.
//       o.tab   naam in de tab (bv. 'vertaal.py', 'barcode_sushi.fasta', 'BLAST · resultaten'), hoofdletters zoals gegeven
//       o.a     doorzichtigheid · o.px  lettergrootte code (36) · o.zicht  aantal zichtbare regels (breuk = laatste fadet in)
//       o.hl    index (of lijst) van de regel(s) die de stem beschrijft (goud randje links, volle sterkte); andere regels naar 35 %
//       o.dim   0..1 hoe sterk de andere regels dimmen (standaard 1 als hl gezet is)
//       o.cursor {regel, kol} knipperende gouden cursor (alleen als er getypt wordt) · o.t  tijd voor het knipperen
//       o.merk  [{regel, van, tot, a}] gouden kader om tekens van..tot (bv. len(mrna)) · o.fout  [{regel, van, tot, a}] koraal kader
//       o.inhoud function(B) tekent eigen inhoud in het venster in plaats van code (B = {x, y, w, h}, al geclipt)
//       terug: {binnen:{x,y,w,h}, regelY(i) (basislijn), kolX(k) (linkerrand teken k), cw (tekenbreedte), lh}
//   sequentieRij(ctx, x, y, seq, o)          rij lettertegels; x = midden eerste tegel, y = midden van de rij.
//       basen in de vaste tinten van de DNA-reeks (A, T lichte tegel met donkere letter; C, G donkere tegel met lichte letter);
//       o.rna  U en de RNA-tinten (teal) · o.s  schaal (1 = tegel 44 × 52, letter 40 px bold) · o.dx  afstand
//       o.zicht aantal zichtbare tegels · o.mark(i) → kleur of null (koraal rand bij verschil) · o.hl(i) → 0..1 gouden rand
//       o.alpha(i) → 0..1 per tegel · o.fadeX, o.fadeW  rij loopt rustig uit (vervaagt rechts) · o.letters false = alleen kleur
//       '-' tekent een gat: leeg tegeltje met gestippelde rand en een streepje. Letters onder 28 px vallen vanzelf weg.
//       terug: array met de x van elke tegel.
//   uitlijning(ctx, x, y, boven, onder, o)  twee rijen onder elkaar met streepjes bij gelijke letters, koraal rand bij verschil;
//       o.kol  aantal kolommen dat al vergeleken is (letter voor letter) · o.streep 0..1 · o.klopt 0..1 (streepjes worden groen)
//       o.score 0..1 scoreregel eronder (+1 groen, −1 koraal) · o.s, o.dx zoals sequentieRij · o.namen ['stukje 1','stukje 2']
//       terug: {xs, y1, y2, gelijk, anders, gaten, scoreY}
//   aaKralen(ctx, x, y, letters, o)          aminozuren als okerkleurige kralen aan een keten, met de eenletterscode erop;
//       o.r straal (32) · o.dx · o.zicht · o.fout true = koraal rand (verkeerde aminozuren) · o.hl index met gouden rand
//   resultatenLijst(ctx, x, y, w, rijen, o)  BLAST-uitslag, max. drie regels {soort, gelijk, toeval, best, verdacht};
//       koppen 'soort', 'gelijk', 'toeval' in Meta; o.zicht · o.kolHl 'gelijk'|'toeval' (goud kader om die kolom) · o.haak 0..1
//   Kleuren: SCR (venster), BASE_KL / BASE_LT (DNA), RNA_KL / RNA_LT (RNA), AA_KL (aminozuren) — gelijk aan de DNA-reeks.
//   Nooit: een muur van tekst (code 4–8 regels, rij 20–40 tegels), echte NCBI-schermen of logo's, Engelse menu's.
// =====================================================================================================
const SCR = { vul: '#121A26', rand: '#8FA0B5', tab: '#0D1420', nr: '#9AA3B2', kw: '#E0B64A', str: '#8C7BBF', num: '#5BA4C9', com: '#9AA3B2', txt: '#F2F2EE' };
const BASE_KL = { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' }, BASE_LT = { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
const RNA_KL = { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, RNA_LT = { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
const AA_KL = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F'];
const _PY_KW = new Set(['for', 'in', 'range', 'len', 'print', 'def', 'return', 'if', 'else', 'elif', 'while', 'import', 'from', 'and', 'or', 'not', 'True', 'False', 'None']);
function _pyTokens(s) { const out = []; let i = 0;
  while (i < s.length) { const c = s[i];
    if (c === '#') { out.push([i, s.slice(i), 'com']); break; }
    if (c === '"' || c === "'") { let j = s.indexOf(c, i + 1); if (j < 0) j = s.length - 1; out.push([i, s.slice(i, j + 1), 'str']); i = j + 1; continue; }
    if (/[0-9]/.test(c) && !/[A-Za-z_]/.test(s[i - 1] || '')) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; out.push([i, s.slice(i, j), 'num']); i = j; continue; }
    if (/[A-Za-z_]/.test(c)) { let j = i; while (j < s.length && /[A-Za-z_0-9]/.test(s[j])) j++; const w = s.slice(i, j); out.push([i, w, _PY_KW.has(w) ? 'kw' : 'txt']); i = j; continue; }
    out.push([i, c, 'txt']); i++; }
  return out; }
function codeScherm(ctx, x, y, w, h, regels = [], o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null;
  const px = o.px || 36, lh = o.lh || Math.round(px * 1.42), nrs = o.nrs !== false, hls = o.hl == null ? [] : [].concat(o.hl), dim = o.dim == null ? (hls.length ? 1 : 0) : o.dim;
  const zicht = o.zicht == null ? Infinity : o.zicht, tb = 54;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, SCR.vul, null);
  ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = SCR.tab; ctx.fillRect(x, y, w, tb); ctx.restore();
  if (o.tab) { ctx.font = fMeta(28); ctx.letterSpacing = '1px'; const tw = ctx.measureText(o.tab).width + 48;
    ctx.beginPath(); ctx.moveTo(x + 16, y + tb); ctx.lineTo(x + 16, y + 18); ctx.arcTo(x + 16, y + 10, x + 24, y + 10, 8); ctx.lineTo(x + 8 + tw, y + 10); ctx.arcTo(x + 16 + tw, y + 10, x + 16 + tw, y + 18, 8); ctx.lineTo(x + 16 + tw, y + tb); ctx.closePath();
    ctx.fillStyle = SCR.vul; ctx.fill(); ctx.strokeStyle = rgba(SCR.rand, 0.6); ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = C.text2; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(o.tab, x + 40, y + tb - 13); ctx.letterSpacing = '0px'; }
  roundRect(ctx, x, y, w, h, 12); ctx.strokeStyle = SCR.rand; ctx.lineWidth = 1; ctx.stroke();
  ctx.font = `500 ${px}px ${F.meta}`; const cw = ctx.measureText('M').width;
  const B = { x: x + (nrs ? 104 : 36), y: y + tb + 22, w: w - (nrs ? 104 : 36) - 28, h: h - tb - 34 };
  const regelY = (i) => B.y + px * 0.86 + i * lh, kolX = (k) => B.x + k * cw;
  if (o.inhoud) { ctx.save(); ctx.beginPath(); ctx.rect(x + 1, y + tb, w - 2, h - tb - 1); ctx.clip(); o.inhoud({ x: x + 24, y: y + tb + 12, w: w - 48, h: h - tb - 24 }); ctx.restore(); }
  for (let i = 0; i < regels.length; i++) { const fa = clamp(zicht - i, 0, 1); if (fa <= 0.01) break;
    const isHl = hls.includes(i), la = fa * (hls.length && !isHl ? lerp(1, 0.35, dim) : 1), yy = regelY(i);
    ctx.save(); ctx.globalAlpha *= la;
    if (nrs) { ctx.font = fMeta(28); ctx.fillStyle = SCR.nr; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), x + 72, yy); }
    ctx.font = `500 ${px}px ${F.meta}`; ctx.textAlign = 'left'; ctx.beginPath(); ctx.rect(B.x - 4, y + tb, x + w - 14 - (B.x - 4), h - tb); ctx.clip();
    for (const [k, s, soort] of _pyTokens(regels[i])) { ctx.fillStyle = SCR[soort]; ctx.fillText(s, kolX(k), yy); }
    ctx.restore();
    if (isHl && dim > 0.01) { ctx.save(); ctx.globalAlpha *= fa * dim; ctx.fillStyle = C.goud; ctx.fillRect(x + (nrs ? 86 : 14), yy - px * 0.9, 4, lh * 0.92); ctx.restore(); } }
  const kader = (lijst, col) => { for (const m of (lijst || [])) { const ma = m.a == null ? 1 : m.a; if (ma <= 0.01) continue; const yy = regelY(m.regel);
      ctx.save(); ctx.globalAlpha *= ma; roundRect(ctx, kolX(m.van) - 5, yy - px * 0.95, (m.tot - m.van) * cw + 10, px * 1.3, 6); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } };
  kader(o.merk, C.goud); kader(o.fout, C.koraal);
  if (o.cursor) { const on = Math.sin((o.t || 0) * 6.3) > -0.2; if (on) { const yy = regelY(o.cursor.regel); ctx.fillStyle = C.goud; ctx.fillRect(kolX(o.cursor.kol) + 2, yy - px * 0.85, cw * 0.55, px * 1.05); } }
  ctx.restore();
  return { binnen: B, regelY, kolX, cw, lh, px }; }
function sequentieRij(ctx, x, y, seq, o = {}) {
  const a = o.a == null ? 1 : o.a, s = o.s || 1, w = (o.w || 44) * s, h = (o.h || 52) * s, dx = o.dx || w + 6 * s, px = Math.round((o.px || 40) * s);
  const rna = !!o.rna, KL = rna ? RNA_KL : BASE_KL, LT = rna ? RNA_LT : BASE_LT, letters = o.letters !== false && px >= 28;
  const zicht = o.zicht == null ? Infinity : o.zicht, xs = [];
  if (a <= 0.01) { for (let i = 0; i < seq.length; i++) xs.push(x + i * dx); return xs; }
  ctx.save(); ctx.globalAlpha *= a; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 0; i < seq.length; i++) { const xi = x + i * dx; xs.push(xi); let fa = clamp(zicht - i, 0, 1); if (o.alpha) fa *= o.alpha(i);
    if (o.fadeX != null && xi > o.fadeX) fa *= clamp(1 - (xi - o.fadeX) / (o.fadeW || 200), 0, 1);
    if (fa <= 0.01) continue; const ch = seq[i]; ctx.save(); ctx.globalAlpha *= fa;
    if (ch === '-') { roundRect(ctx, xi - w / 2, y - h / 2, w, h, 8 * s); ctx.setLineDash([5 * s, 4 * s]); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(xi - w * 0.22, y); ctx.lineTo(xi + w * 0.22, y); ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.stroke(); }
    else { const f = KL[ch] || C.fill, mk = o.mark ? o.mark(i) : null; roundRect(ctx, xi - w / 2, y - h / 2, w, h, 8 * s); shape(ctx, f, mk || lighten(f, 0.3), mk ? 3.5 : 1);
      if (letters) { ctx.font = fTekst(px, 700); ctx.fillStyle = LT[ch] || C.text; ctx.fillText(ch, xi, y + 2 * s); } }
    const hk = o.hl ? o.hl(i) : 0; if (hk > 0.01) { ctx.globalAlpha *= hk; roundRect(ctx, xi - w / 2 - 4, y - h / 2 - 4, w + 8, h + 8, 10 * s); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); return xs; }
function uitlijning(ctx, x, y, boven, onder, o = {}) {
  const a = o.a == null ? 1 : o.a, s = o.s || 1, h = (o.h || 52) * s, dx = o.dx || (o.w || 44) * s + 6 * s, tussen = (o.tussen || 40) * s;
  const kol = o.kol == null ? Infinity : o.kol, streep = o.streep == null ? 1 : o.streep, klopt = o.klopt || 0, y2 = y + h + tussen;
  const n = Math.max(boven.length, onder.length); let gelijk = 0, anders = 0, gaten = 0; const soort = [];
  for (let i = 0; i < n; i++) { const p = boven[i], q = onder[i]; let k = null; if (p && q) { if (p === '-' || q === '-') { k = 'gat'; gaten++; } else if (p === q) { k = 'gelijk'; gelijk++; } else { k = 'anders'; anders++; } } soort.push(k); }
  const xs = []; for (let i = 0; i < n; i++) xs.push(x + i * dx);
  if (a <= 0.01) return { xs, y1: y, y2, gelijk, anders, gaten, scoreY: y2 + h / 2 + 52 * s };
  ctx.save(); ctx.globalAlpha *= a;
  const mis = (i) => (i < kol && soort[i] === 'anders') ? C.koraal : null, opts = Object.assign({}, o, { a: 1, mark: mis });
  sequentieRij(ctx, x, y, boven, Object.assign({}, opts, { alpha: o.alpha1 })); sequentieRij(ctx, x, y2, onder, Object.assign({}, opts, { alpha: o.alpha2 }));
  if (o.namen) { metaText(ctx, o.namen[0], x - dx * 0.5 - 18, y + 10, C.text2, 'right', 28); metaText(ctx, o.namen[1], x - dx * 0.5 - 18, y2 + 10, C.text2, 'right', 28); }
  if (streep > 0.01) { ctx.save(); ctx.globalAlpha *= streep; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { if (soort[i] !== 'gelijk') continue; const f = clamp(kol - i, 0, 1); if (f <= 0.01) continue;
      ctx.strokeStyle = klopt > 0.5 ? C.groen : C.line; ctx.globalAlpha = a * streep * f; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xs[i], y + h / 2 + 7 * s); ctx.lineTo(xs[i], y2 - h / 2 - 7 * s); ctx.stroke(); }
    ctx.restore(); }
  const scoreY = y2 + h / 2 + 52 * s;
  if (o.score > 0.01) { ctx.save(); ctx.globalAlpha *= o.score; for (let i = 0; i < n; i++) { if (!soort[i]) continue; const f = clamp((o.scoreKol == null ? Infinity : o.scoreKol) - i, 0, 1); if (f <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= f; text(ctx, soort[i] === 'gelijk' ? '+1' : '−1', xs[i], scoreY, fMeta(28), soort[i] === 'gelijk' ? C.groen : C.koraal, 'center'); ctx.restore(); } ctx.restore(); }
  ctx.restore(); return { xs, y1: y, y2, gelijk, anders, gaten, scoreY }; }
function aaKralen(ctx, x, y, letters, o = {}) {
  const a = o.a == null ? 1 : o.a, r = o.r || 32, dx = o.dx || r * 2.6, zicht = o.zicht == null ? Infinity : o.zicht, xs = [];
  for (let i = 0; i < letters.length; i++) xs.push(x + i * dx); if (a <= 0.01) return xs;
  ctx.save(); ctx.globalAlpha *= a; const nz = Math.min(letters.length, Math.ceil(zicht));
  if (nz > 1) { ctx.strokeStyle = '#8A7550'; ctx.lineWidth = Math.max(3, r * 0.16); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs[0], y); ctx.lineTo(xs[0] + (Math.min(zicht, letters.length) - 1) * dx, y); ctx.stroke(); }
  for (let i = 0; i < nz; i++) { const f = clamp(zicht - i, 0, 1); if (f <= 0.01) continue; const L = letters[i], c = AA_KL[(L.charCodeAt(0) * 7) % AA_KL.length];
    ctx.save(); ctx.globalAlpha *= f; const rr = r * (0.6 + 0.4 * ease(f)); circ(ctx, xs[i], y, rr, c, o.fout ? C.koraal : lighten(c, 0.35), o.fout ? 4 : 1.5);
    if (i === o.hl) circ(ctx, xs[i], y, rr + 7, null, C.goud, 3);
    if (r >= 24) text(ctx, L, xs[i], y + r * 0.38, fTekst(Math.round(r * 1.1), 700), '#121A26', 'center'); ctx.restore(); }
  ctx.restore(); return xs; }
function resultatenLijst(ctx, x, y, w, rijen, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null; const zicht = o.zicht == null ? Infinity : o.zicht, rh = 76;
  const cG = x + w * 0.66, cT = x + w * 0.92; ctx.save(); ctx.globalAlpha *= a;
  metaText(ctx, 'soort', x, y, C.text2, 'left', 28); metaText(ctx, 'gelijk', cG, y, C.text2, 'right', 28); metaText(ctx, 'toeval', cT, y, C.text2, 'right', 28);
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + 18); ctx.lineTo(x + w, y + 18); ctx.stroke();
  const rowY = (i) => y + 72 + i * rh;
  for (let i = 0; i < rijen.length; i++) { const f = clamp(zicht - i, 0, 1); if (f <= 0.01) continue; const R = rijen[i], yy = rowY(i);
    ctx.save(); ctx.globalAlpha *= f;
    if (R.verdacht) { roundRect(ctx, x - 16, yy - 46, w + 32, 64, 10); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); }
    text(ctx, R.soort, x, yy, fTekst(36, R.best ? 700 : 600), R.best ? C.groen : C.text, 'left');
    text(ctx, R.gelijk, cG, yy, fTekst(36, 700), R.best ? C.groen : C.text, 'right');
    text(ctx, R.toeval, cT, yy, fTekst(36, 600), C.text2, 'right'); ctx.restore(); }
  const hlK = (naam, cx, al) => { roundRect(ctx, cx - 190, y - 40, 210, 60 + Math.min(rijen.length, zicht) * rh, 12); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  if (o.kolHl === 'gelijk' && (o.kolA == null || o.kolA > 0.01)) hlK('gelijk', cG + 10, o.kolA == null ? 1 : o.kolA);
  if (o.kolHl === 'toeval' && (o.kolA == null || o.kolA > 0.01)) hlK('toeval', cT + 10, o.kolA == null ? 1 : o.kolA);
  const bi = rijen.findIndex(R => R.best); if (bi >= 0 && o.haak > 0.01) { const yy = rowY(bi); ctx.save(); ctx.globalAlpha *= o.haak; ctx.strokeStyle = C.groen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 24, yy - 40); ctx.lineTo(x - 38, yy - 40); ctx.lineTo(x - 38, yy + 10); ctx.lineTo(x - 24, yy + 10); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { rowY, cG, cT }; }
// — einde reeksobject —


const KL_PL = ['#3F6FC0', '#7FB6E0', '#E6C64A', '#EE8A3C']; // pLDDT > 90, 70–90, 50–70, < 50
const KL_MEET = '#E8ECF0';   // gemeten structuur (uit de envelop): wit-grijs
const KL_MED = C.teal;       // medicijn: product in teal (Part C)
const KL_PAPIER = '#F2EEE4', KL_PAPIER_R = '#B8B0A0';
const FLOOR = 860;

function bi4Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function bi4Rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const uit = (t, t0, d = 0.5) => 1 - ease((t - t0) / d);
function microVlak(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); } // Micro-achtergrond zonder korrel (BEELDAFSPRAKEN)

// ======================================================================================
// EIWITMODEL — geometrie (eenmalig berekend uit PDB 5DFR)
// ======================================================================================
const V3 = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  len: a => Math.hypot(a[0], a[1], a[2]), norm: a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], lerp: (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u] };
// draai punt p om de as door a met richting ax (genormaliseerd) over hoek an (Rodrigues)
function _rot3(p, a, ax, an) { const v = V3.sub(p, a), c = Math.cos(an), s = Math.sin(an); const k = V3.dot(ax, v);
  return V3.add(a, V3.add(V3.add(V3.mul(v, c), V3.mul(V3.cross(ax, v), s)), V3.mul(ax, k * (1 - c)))); }

const EIWIT = (() => {
  const D = PDB5DFR, P = D.P.map(p => p.slice()), N = P.length, SEQ = D.SEQ.split('');
  const T = D.SS.split(''); // 'h' helix, 's' streng, 'l' lus
  const H = D.helices.map(([a, b]) => ({ i0: a, n: b - a + 1 })), ST = D.strengen.map(([a, b]) => ({ i0: a, n: b - a + 1 }));
  const POCKET = D.POCKET.slice(), UIT = V3.norm(D.UIT);
  const lining = []; for (let i = 0; i < N; i++) if (V3.len(V3.sub(P[i], POCKET)) < 8) lining.push(i);
  // de Met20-lus (aminozuur 9–24 → index 8..23): scharniert om de as door aminozuur 9 en 24
  const L0 = 8, L1 = 23, LUS = []; for (let i = L0 + 1; i < L1; i++) LUS.push(i);
  const lusAs = V3.norm(V3.sub(P[L1], P[L0]));
  const lusDraai = (p, an) => _rot3(p, P[L0], lusAs, an);
  // welke kant is 'dicht' (naar de holte toe)? kies het teken waarbij het midden van de lus dichter bij de holte komt
  const mid = P[Math.round((L0 + L1) / 2)]; const sgn = V3.len(V3.sub(lusDraai(mid, 0.3), POCKET)) < V3.len(V3.sub(lusDraai(mid, -0.3), POCKET)) ? 1 : -1;
  // gemeten structuur (envelop): kern gelijk op ± 0,5 Å, de Met20-lus ligt anders (verder open)
  const rnd = bi4Rng(77); const M = P.map((p, i) => LUS.includes(i) ? lusDraai(p, -sgn * 0.75) : [p[0] + (rnd() - 0.5) * 0.9, p[1] + (rnd() - 0.5) * 0.9, p[2] + (rnd() - 0.5) * 0.9]);
  // ongevouwen kluwen: willekeurige wandeling met voorkeur voor rechtdoor, binnen een kader (± 2× het gevouwen eiwit)
  const r = bi4Rng(11); const U = []; let p = [-38, 4, 0], dir = [1, 0.2, 0];
  for (let i = 0; i < N; i++) { U.push(p); let nd = V3.norm(V3.add(V3.mul(dir, 2.2), [r() - 0.5, (r() - 0.5) * 1.6, (r() - 0.5) * 0.7]));
    const q = V3.add(p, V3.mul(nd, 3.8)); if (Math.abs(q[1]) > 19) nd[1] *= -1; if (Math.abs(q[2]) > 8) nd[2] *= -1; if (q[0] > 40 || q[0] < -42) nd[0] *= -1; dir = nd; p = V3.add(p, V3.mul(V3.norm(nd), 3.8)); }
  { const c = U.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / N); for (let i = 0; i < N; i++) U[i] = V3.sub(U[i], c); }
  // tussenstand: de helices al opgedraaid (bindingsrichtingen van de echte helix), de rest nog los (vouwen fase 1)
  const inHelix = (i) => H.some(h => i >= h.i0 && i < h.i0 + h.n - 1);
  const I = [U[0].slice()]; for (let i = 0; i < N - 1; i++) { const d = inHelix(i) ? V3.norm(V3.sub(P[i + 1], P[i])) : V3.norm(V3.sub(U[i + 1], U[i])); I.push(V3.add(I[i], V3.mul(d, 3.8))); }
  { const c = I.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / N); for (let i = 0; i < N; i++) I[i] = V3.sub(I[i], c); }
  // gesmolten bol (molten globule): al de vorm van het eiwit, maar ruimer en rommelig
  const rg = bi4Rng(23); const G = P.map(q => V3.add(V3.mul(q, 1.3), [(rg() - 0.5) * 7, (rg() - 0.5) * 7, (rg() - 0.5) * 7]));
  // betrouwbaarheid per aminozuur (VOORBEELD, patroon zoals vaak: kern hoog, lussen lager, uiteinden en de beweeglijke Met20-lus laag)
  const PL = T.map((tp, i) => LUS.includes(i) ? 42 : (i < 1 || i > N - 4) ? 58 : (i >= 63 && i <= 70) ? 64 : tp === 'h' || tp === 's' ? 94 : 84);
  // het contactpaar (samen veranderen): Lys38 en Glu90 (index 37 en 89) vormen in de echte vorm een zoutbrug (NZ–OE1 2,7 Å, nagemeten in 5dfr_minimized.pdb)
  const PAAR = [37, 89];
  // gemuteerd aminozuur in de holte: Leu28 (index 27), bekleedt de holte (illustratie, geen echt geval)
  const MUT = 27;
  // contacten 'schets van de vorm': buren in de β-ladders (|i−j| > 4, Cα < 5,6 Å), aantal beperkt
  const CONTACT = []; for (let i = 0; i < N; i++) for (let j = i + 5; j < N; j++) if (T[i] === 's' && T[j] === 's' && V3.len(V3.sub(P[i], P[j])) < 5.6) CONTACT.push([i, j]);
  CONTACT.push(PAAR);
  const KIND = SEQ.map(ch => (ch.charCodeAt(0) * 7) % 5);
  // klein 2D-icoon (miniEiwit): de echte Cα-route, elke 7e kraal, geprojecteerd zoals de standaardcamera, geschaald naar ± 30
  const MINI = (() => { const yaw = 0.95, pitch = -0.32, cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch); const pts = [];
    for (let i = 0; i < N; i += 7) { const q = P[i]; const x1 = q[0] * cy + q[2] * sy, z1 = -q[0] * sy + q[2] * cy; pts.push([x1, -(q[1] * cp - z1 * sp)]); }
    const m = Math.max(...pts.map(q => Math.max(Math.abs(q[0]), Math.abs(q[1])))); return pts.map(q => [q[0] * 30 / m, q[1] * 30 / m]); })();
  return { P, T, H, ST, M, U, I, G, N, PL, POCKET, UIT, lining, LUS, L0, L1, lusDraai, sgn, PAAR, MUT, CONTACT, SEQ, KIND, MINI, PDB: '5DFR' };
})();

function plKleur(v) { return v > 90 ? KL_PL[0] : v > 70 ? KL_PL[1] : v > 50 ? KL_PL[2] : KL_PL[3]; }
// beweging bij binding: de Met20-lus sluit over de holte (de rest blijft staan)
function _dicht(p, i, k) { const E = EIWIT; if (k <= 0 || !E.LUS.includes(i)) return p; return E.lusDraai(p, E.sgn * 0.42 * k); }
// mutant: de kern blijft, de holte vernauwt (bekleding schuift 1–1,5 Å naar binnen)
function _mutant(p, i) { const E = EIWIT; if (!E.lining.includes(i) || i === E.MUT) return p; const d = V3.sub(E.POCKET, p); return V3.add(p, V3.mul(V3.norm(d), 1.1)); }
// plek van een molecuul op weg naar de holte: k = 0 in de holte, k = 1 ± 16 Å ervoor (door de opening)
function medPos(k, zij = 0) { const E = EIWIT; const s = V3.norm(V3.cross(E.UIT, [0, 1, 0])); return V3.add(V3.add(E.POCKET, V3.mul(E.UIT, 2.5 + 16 * k)), V3.mul(s, zij * k)); }

// keten bij vouwfractie f: morph van de BINDINGSRICHTINGEN (elke binding blijft 3,8 Å; geen kralen die door een rechte lijn schuiven)
// sleutelstanden: U (losse kluwen) → I (helices opgedraaid) → G (ruime, rommelige vorm) → P (gevouwen, PDB 5DFR)
const _ketCache = {};
function _richt(K) { const out = []; for (let i = 0; i < K.length - 1; i++) out.push(V3.norm(V3.sub(K[i + 1], K[i]))); return out; }
function _slerp(a, b, u) { const d = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1); if (d > 0.9995) return V3.norm(V3.lerp(a, b, u)); const th = Math.acos(d), s0 = Math.sin((1 - u) * th) / Math.sin(th), s1 = Math.sin(u * th) / Math.sin(th); return V3.add(V3.mul(a, s0), V3.mul(b, s1)); }
function _centr(K) { return K.reduce((s, q) => V3.add(s, q), [0, 0, 0]).map(v => v / K.length); }
function eiwitKeten(f) { const key = Math.round(clamp(f, 0, 1) * 400); if (_ketCache[key]) return _ketCache[key]; const E = EIWIT; f = key / 400;
  if (!E._R) { E._R = [E.U, E.I, E.G, E.P].map(_richt); E._C = [E.U, E.I, E.G, E.P].map(_centr); }
  const st = [0, 0.32, 0.62, 1]; let k = 0; while (k < 2 && f > st[k + 1]) k++; const u = ease(clamp((f - st[k]) / (st[k + 1] - st[k]), 0, 1));
  let out;
  if (f >= 0.999) out = E.P.map(q => q.slice()); else {
    const Ra = E._R[k], Rb = E._R[k + 1]; out = [[0, 0, 0]]; for (let i = 0; i < Ra.length; i++) out.push(V3.add(out[i], V3.mul(_slerp(Ra[i], Rb[i], u), 3.8)));
    const c0 = _centr(out), c1 = V3.lerp(E._C[k], E._C[k + 1], u); out = out.map(q => V3.add(V3.sub(q, c0), c1));
    if (k === 2) { const w = ease(clamp((u - 0.55) / 0.45, 0, 1)); out = out.map((q, i) => V3.lerp(q, E.P[i], w)); } }
  _ketCache[key] = out; return out; }
// positie van kraal i bij vouwfractie f
function eiwitPos(i, f, o = {}) { const E = EIWIT; const fb = ease(clamp((f - 0.62) / 0.38, 0, 1));
  let p = eiwitKeten(f)[i];
  if (o.mutant) p = V3.lerp(p, _mutant(p, i), fb * o.mutant);
  if (o.dicht) p = _dicht(p, i, o.dicht * fb);
  if (o.lusM && E.LUS.includes(i)) p = V3.lerp(p, E.M[i], o.lusM);
  return p; }
// projectie: draai om de y-as (yaw), kantel om de x-as (pitch), zwakke perspectief
function proj3(p, cam) { const { x, y, s, yaw = 0, pitch = -0.18 } = cam; const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy; const y2 = p[1] * cp - z1 * sp, z2 = p[1] * sp + z1 * cp; const k = 140 / (140 - z2);
  return [x + x1 * s * k, y - y2 * s * k, z2, k]; }
// Catmull-Rom door punten (3D), n stappen per segment
function _spline3(pts, n = 4) { const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; out.push([0, 1, 2].map(j => 0.5 * (2 * pts[i][j] + (-p0[j] + pts[i + 1][j]) * t + (2 * p0[j] - 5 * pts[i][j] + 4 * pts[i + 1][j] - p3[j]) * t2 + (-p0[j] + 3 * pts[i][j] - 3 * pts[i + 1][j] + p3[j]) * t3))); } }
  out.push(pts[pts.length - 1]); return out; }
const EIWIT_SCHAAL = 0.8; // het echte eiwit (± 42 Å) is groter dan het eerdere model: zo blijven de schalen in de scènes gelijk

// HOOFDFUNCTIE: het eiwitmodel tekenen.
// o: fold 0..1 · yaw · pitch · t (trilling) · a · kleur 'oker'|'pl' · plA · hl [indices goud omrand] · holte 0..1 · medicijn 0..1 / medicijnPos [x,y,z] / substraat
//    lint 0..1 (helices en strengen als vlakken) · mutant 0..1 · mutKleur · meting 0..1 (gemeten structuur erover) · verschil 0..1 (koraal lijntjes lus)
//    dicht 0..1 (Met20-lus sluit) · lusM · letters 0..1 · contact 0..1 · ruis
//    terug: { S (schermposities), pocket, box, lus (midden Met20-lus) }
function eiwit3D(ctx, x, y, s, o = {}) { const E = EIWIT; const { fold = 1, yaw = 0.95, pitch = -0.32, t = 0, a = 1, kleur = 'oker', hl = [], holte = 0, medicijn = 0, lint = 0, mutant = 0, meting = 0, verschil = 0, dicht = 0, letters = 0, plA = 1, ruis = 1, lusM = 0 } = o;
  if (a <= 0.01) return null; s *= EIWIT_SCHAAL; ctx.save(); ctx.globalAlpha *= a; const cam = { x, y, s, yaw, pitch };
  const los = 1 - ease(clamp((fold - 0.6) / 0.4, 0, 1)) * 0.75; // ongevouwen trilt meer (warmtebeweging)
  const P3 = []; for (let i = 0; i < E.N; i++) { let p = eiwitPos(i, fold, { mutant, dicht, lusM }); const w = wander(i * 3 + 7, t, 0.3 * ruis * los + (E.LUS.includes(i) ? 0.22 * ruis : 0), 0.7); p = [p[0] + w.x, p[1] + w.y, p[2]]; P3.push(p); }
  const S = P3.map(p => proj3(p, cam)); const R = (o.r || 1.15) * s; const items = [];
  const okerK = i => AA_KL[E.KIND[i]];
  const plK = i => { const c = plKleur(E.PL[i]); return plA >= 0.99 ? c : _mixHexBi(okerK(i), c, plA); };
  const colF = kleur === 'pl' ? plK : okerK;
  const colM = i => ((mutant > 0.5 || (o.mutKleur || 0) > 0.5) && i === E.MUT) ? C.koraal : colF(i);
  const LA = lint * ease(clamp((fold - 0.9) / 0.1, 0, 1));
  const inLint = new Set(); if (LA > 0.5) { E.H.concat(E.ST).forEach(g => { for (let k = 1; k < g.n - 1; k++) inLint.add(g.i0 + k); }); }
  const bead = (i, col) => { const q = S[i]; const k = q[3]; const dk = clamp((q[2] + 18) / 36, 0, 1); items.push({ z: q[2] + 0.01, f: () => {
      const rr = R * k * (inLint.has(i) ? lerp(1, 0.55, LA) : 1), c = col(i); ctx.save(); ctx.globalAlpha *= 0.6 + 0.4 * dk; ctx.beginPath(); ctx.arc(q[0], q[1], rr, 0, 6.283); shape(ctx, c, lighten(c, 0.38), 1.2);
      if (hl.includes(i)) { ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(q[0], q[1], rr + 4, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
      if (letters > 0.01 && rr > 10) { ctx.globalAlpha = a * letters * (0.6 + 0.4 * dk); text(ctx, E.SEQ[i], q[0], q[1] + rr * 0.36, `700 ${Math.round(rr * 1.0)}px ${F.meta}`, C.bgMicro, 'center'); }
      ctx.restore(); } }); };
  // ketting (ruggengraat) tussen de kralen
  for (let i = 0; i < E.N - 1; i++) { const p = S[i], q = S[i + 1]; const c = kleur === 'pl' ? colF(i) : lighten(V.ew, 0.25); items.push({ z: (p[2] + q[2]) / 2 - 0.5, f: () => { ctx.strokeStyle = c; ctx.lineWidth = 0.6 * s * (p[3] + q[3]) / 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }); }
  // vlakken: strengen als platte pijlen, helices als lint door de echte Cα-posities (alleen in de gevouwen vorm)
  if (LA > 0.01) {
    E.ST.forEach(g => { const pts = []; for (let k = 0; k < g.n; k++) pts.push(P3[g.i0 + k]);
      // middellijn: gemiddelde van buren (haalt de zigzag eruit); breedte loodrecht op de plooi
      const mid = pts.map((q, k) => k === 0 || k === pts.length - 1 ? q : V3.mul(V3.add(V3.add(pts[k - 1], V3.mul(q, 2)), pts[k + 1]), 0.25));
      let pl = [0, 0, 0]; for (let k = 1; k < pts.length - 1; k++) { const b = V3.sub(V3.mul(V3.add(pts[k - 1], pts[k + 1]), 0.5), pts[k]); pl = V3.add(pl, V3.mul(b, k % 2 ? 1 : -1)); }
      const dir = V3.norm(V3.sub(mid[mid.length - 1], mid[0])); let side = V3.norm(V3.cross(dir, V3.len(pl) > 0.1 ? V3.norm(pl) : [0, 0, 1]));
      const wdt = 1.6, kop = Math.min(3.2, V3.len(V3.sub(mid[mid.length - 1], mid[0])) * 0.35), a1 = mid[mid.length - 1], aK = V3.sub(a1, V3.mul(dir, kop));
      const L = [], Rr = []; mid.forEach(q => { if (V3.dot(V3.sub(q, aK), dir) > 0) return; L.push(V3.add(q, V3.mul(side, -wdt))); Rr.push(V3.add(q, V3.mul(side, wdt))); });
      const poly = L.concat([V3.add(aK, V3.mul(side, -wdt * 1.9)), V3.add(a1, V3.mul(dir, 1.2)), V3.add(aK, V3.mul(side, wdt * 1.9))], Rr.reverse()).map(p => proj3(p, cam));
      const z = poly.reduce((m, q) => m + q[2], 0) / poly.length; const c = kleur === 'pl' ? colF(g.i0 + (g.n >> 1)) : '#D9B97A';
      items.push({ z: z - 0.6, f: () => { ctx.save(); ctx.globalAlpha *= LA; ctx.beginPath(); poly.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); shape(ctx, rgba(c, 0.55), rgba(lighten(c, 0.3), 0.95), 1.6); ctx.restore(); } }); });
    E.H.forEach(h => { const pts = []; for (let k = 0; k < h.n; k++) pts.push(P3[h.i0 + k]); const sp = _spline3(pts, 4);
      for (let k = 0; k < sp.length - 1; k++) { const qa = proj3(sp[k], cam), qb = proj3(sp[k + 1], cam); const c = kleur === 'pl' ? colF(h.i0 + Math.round(k / 4)) : '#D9B97A';
        items.push({ z: (qa[2] + qb[2]) / 2 - 0.2, f: () => { ctx.save(); ctx.globalAlpha *= LA * (0.55 + 0.45 * clamp((qa[2] + 18) / 36, 0, 1)); ctx.strokeStyle = rgba(c, 0.85); ctx.lineWidth = 1.5 * s * qa[3]; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(qa[0], qa[1]); ctx.lineTo(qb[0], qb[1]); ctx.stroke(); ctx.restore(); } }); } });
  }
  for (let i = 0; i < E.N; i++) bead(i, colM);
  // zijketen van het gemuteerde aminozuur: steekt de holte in
  if (mutant > 0.01) { const i = E.MUT, p = P3[i]; const d = V3.norm(V3.sub(E.POCKET, p)); const sc = proj3(V3.add(p, V3.mul(d, 3.4 * mutant)), cam); const q = S[i];
    items.push({ z: sc[2] + 0.02, f: () => { ctx.save(); ctx.globalAlpha *= mutant; ctx.strokeStyle = C.koraal; ctx.lineWidth = 0.7 * s; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(sc[0], sc[1]); ctx.stroke(); ctx.beginPath(); ctx.arc(sc[0], sc[1], 2.0 * s * sc[3], 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 1.4); ctx.restore(); } }); }
  // holte: zachte gouden schijf achter de bekleding + gouden rand om de bekledende kralen
  const pc = proj3(E.POCKET, cam);
  if (holte > 0.01) { items.push({ z: pc[2] - 3.5, f: () => { ctx.save(); ctx.globalAlpha *= holte * 0.9; ctx.beginPath(); ctx.ellipse(pc[0], pc[1], 6.2 * s * pc[3] * (1 - 0.18 * mutant), 5 * s * pc[3] * (1 - 0.18 * mutant), 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.16), rgba(C.goud, 0.85), 2.5); ctx.restore(); } });
    E.lining.forEach(i => { const q = S[i]; items.push({ z: q[2] + 0.02, f: () => { ctx.save(); ctx.globalAlpha *= holte; ctx.beginPath(); ctx.arc(q[0], q[1], R * q[3] + 1.5, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2; ctx.stroke(); ctx.restore(); } }); }); }
  // medicijn (klein molecuul: ring met staartje), in de holte of op een eigen plek
  if (medicijn > 0.01) { const mp = proj3(o.medicijnPos || medPos(0), cam); items.push({ z: mp[2] + 1.2, f: () => (o.substraat ? substraatMol : medicijnMol)(ctx, mp[0], mp[1], s * 0.22 * mp[3], { a: medicijn, rot: 0.3 + (o.medRot || 0) }) }); }
  // contacten 'schets van de vorm': aminozuren die in de vorm tegen elkaar liggen (β-ladders + het contactpaar), teal stippellijntjes
  if ((o.contact || 0) > 0.01) { E.CONTACT.forEach(([i, j]) => { const p = S[i], q = S[j]; items.push({ z: (p[2] + q[2]) / 2 + 0.03, f: () => { ctx.save(); ctx.globalAlpha *= o.contact; ctx.strokeStyle = C.teal; ctx.lineWidth = 2.2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.restore(); } }); }); }
  items.sort((A, B) => A.z - B.z).forEach(it => it.f());
  // gemeten structuur (uit de envelop) eroverheen: wit-grijze dunne lijn met holle kraaltjes
  if (meting > 0.01) { const MS = E.M.map(p => proj3(p, cam)); ctx.save(); ctx.globalAlpha *= meting; ctx.strokeStyle = rgba(KL_MEET, 0.9); ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.beginPath(); MS.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
    MS.forEach(q => { circ(ctx, q[0], q[1], R * q[3] * 0.35, KL_MEET); });
    if (verschil > 0.01) { ctx.globalAlpha = a * verschil; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); E.LUS.forEach((i, k) => { if (k % 2) return; const p = S[i], q = MS[i]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }); ctx.setLineDash([]); }
    ctx.restore(); }
  ctx.restore();
  const box = S.reduce((b, q) => [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[0]), Math.max(b[3], q[1])], [1e9, 1e9, -1e9, -1e9]);
  return { S, pocket: pc, box, lus: S[E.LUS[Math.floor(E.LUS.length / 2)]] };
}
function _mixHexBi(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k);
  return '#' + ((1 << 24) + (m(16) << 16) + (m(8) << 8) + m(0)).toString(16).slice(1); }
// klein medicijnmolecuul: zeshoekige ring met een staartje (vorm, geen bolletje), teal
function medicijnMol(ctx, x, y, s, o = {}) { const { a = 1, rot = 0, col = KL_MED } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3; const px = Math.cos(an) * 14, py = Math.sin(an) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.55), lighten(col, 0.35), 2.5);
  ctx.strokeStyle = lighten(col, 0.2); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(12, -7); ctx.lineTo(26, -14); ctx.lineTo(36, -6); ctx.stroke(); circ(ctx, 36, -6, 5, col, lighten(col, 0.35), 2);
  ctx.restore(); }

// substraat (klein voedingsmolecuul, oker: vijfring met zijtak) — anders dan het medicijn (teal)
function substraatMol(ctx, x, y, s, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 2 * Math.PI / 5; const px = Math.cos(an) * 14, py = Math.sin(an) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(V.kh, 0.75), lighten(V.kh, 0.3), 2.5);
  ctx.strokeStyle = V.kh; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(13, 4); ctx.lineTo(28, 10); ctx.stroke(); ctx.restore(); }
// legenda betrouwbaarheid per stuk (blauw zeker → oranje onzeker)
function plLegenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 92;
  KL_PL.forEach((c, i) => { roundRect(ctx, x + i * (w + 6), y, w, 26, 6); shape(ctx, c, lighten(c, 0.3), 1); });
  metaText(ctx, 'zeker', x, y + 62, C.text2, 'left', 26); metaText(ctx, 'onzeker', x + 4 * (w + 6) - 6, y + 62, C.text2, 'right', 26); ctx.restore(); }

// ribosoom (zoals de DNA-reeks: twee subeenheden, licht oker-grijs) met een uitkomende keten
function ribosoomBi(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c = '#C9B896', d = lighten(c, 0.35);
  blob(ctx, x, y - w * 0.18, w * 0.55, w * 0.36, 0.04, 3); shape(ctx, rgba(c, 0.9), d, 1.5); blob(ctx, x, y + w * 0.30, w * 0.5, w * 0.2, 0.04, 7); shape(ctx, rgba(c, 0.75), d, 1.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w * 0.9, y + w * 0.14); ctx.bezierCurveTo(x - w * 0.3, y + w * 0.06, x + w * 0.3, y + w * 0.2, x + w * 0.95, y + w * 0.1); ctx.stroke(); // mRNA (paars, dun)
  ctx.restore(); }

// antistof (Y van vier ketens), uit Forensisch 1 (bibliotheek), met een vorm die hij grijpt
function antistofBi(ctx, x, y, s, rot = 0, o = {}) { const { a = 1, col = '#AFC0D0' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 7; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 4, 40); ctx.lineTo(d * 4, 0); ctx.lineTo(d * 24, -26); ctx.stroke(); }
  ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = 5; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 16, -4); ctx.lineTo(d * 34, -26); ctx.stroke(); } ctx.restore(); }

// ======================================================================================
// Eigen aanvullingen op het reeksobject (bovenaan): rij aminozuurkralen met randen per kolom, cursor, voortgangsbalk
// ======================================================================================
// rij aminozuren als kralen (reeksobject aaKralen, okertinten) met per kraal een rand: o.rand(i) → kleur of null (goud = focus, koraal = verschil)
function aaKralenRij(ctx, x, y, letters, o = {}) { const a = o.a == null ? 1 : o.a, r = o.r || 22; const xs = aaKralen(ctx, x, y, letters, Object.assign({}, o, { r }));
  if (a <= 0.01 || !o.rand) return xs; const zicht = o.zicht == null ? Infinity : o.zicht; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < Math.min(letters.length, Math.ceil(zicht)); i++) { const c = o.rand(i); if (!c) continue; ctx.save(); ctx.globalAlpha *= clamp(zicht - i, 0, 1); circ(ctx, xs[i], y, r + 5, null, c, 3); ctx.restore(); }
  ctx.restore(); return xs; }
// knipperende cursor
function cursor(ctx, x, y, h, t, a = 1) { if (a <= 0.01 || Math.sin(t * 6) < 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud; ctx.fillRect(x, y, 4, h); ctx.restore(); }
// voortgangsbalk in een venster
function voortgang(ctx, x, y, w, frac, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 18, 9); shape(ctx, '#22304A', C.line, 1);
  if (frac > 0.01) { roundRect(ctx, x, y, Math.max(18, w * frac), 18, 9); shape(ctx, rgba(C.teal, 0.8), C.teal, 1); } if (lab) metaText(ctx, lab, x, y - 16, C.text2, 'left', 24); ctx.restore(); }

// ======================================================================================
// Lab, papier en voorwerpen (Schema)
// ======================================================================================
// envelop met zegel; open 0..1 = klep omhoog; uit 0..1 = kaartje met de gemeten vorm schuift eruit
function envelopBi(ctx, x, y, s, o = {}) { const { a = 1, open = 0, uit = 0, zegel = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 260, h = 170;
  if (uit > 0.01) { const dy = -120 * ease(uit); roundRect(ctx, -w / 2 + 18, -h / 2 + 10 + dy, w - 36, h - 30, 6); shape(ctx, '#FBF8F1', KL_PAPIER_R, 2);
    ctx.save(); roundRect(ctx, -w / 2 + 18, -h / 2 + 10 + dy, w - 36, h - 30, 6); ctx.clip(); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, [[-70, 4 + dy], [-40, -36 + dy], [-10, -6 + dy], [20, -40 + dy], [50, -12 + dy], [72, -32 + dy]], false); ctx.stroke(); ctx.restore(); }
  roundRect(ctx, -w / 2, -h / 2, w, h, 10); shape(ctx, KL_PAPIER, KL_PAPIER_R, 2.5);
  ctx.strokeStyle = KL_PAPIER_R; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(-w * 0.08, 0); ctx.moveTo(w / 2, h / 2); ctx.lineTo(w * 0.08, 0); ctx.stroke();
  const fy = lerp(h * 0.12, -h * 1.05, ease(open)); // klep: punt zakt naar beneden (dicht) of klapt omhoog (open)
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, fy); ctx.lineTo(w / 2, -h / 2); ctx.closePath(); shape(ctx, open > 0.5 ? '#E6E0D2' : '#EEE8DA', KL_PAPIER_R, 2.5);
  if (zegel > 0.01 && open < 0.4) { ctx.save(); ctx.globalAlpha *= zegel * (1 - open / 0.4); circ(ctx, 0, h * 0.1, 24, '#B8483A', '#8E3328', 2.5); circ(ctx, 0, h * 0.1, 13, null, '#E07A5F', 2); ctx.restore(); }
  ctx.restore(); }
// envelop als vast UI-element rechtsboven ('gemeten · nog geheim')
function envUI(ctx, o = {}) { const { a = 1, open = 0, uit = 0 } = o; if (a <= 0.01) return; envelopBi(ctx, 1770, 112, 0.42, { a, open, uit }); metaA(ctx, open > 0.5 ? 'gemeten · voorbeeld' : 'gemeten · nog geheim', 1880, 190, a, C.grain, 'right', 22); }
// briefje met ± 30 letters (IBM Plex Mono)
function briefje(ctx, x, y, seq, o = {}) { const { a = 1, upto = 30, w = 520, rot = -0.03 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -70, w, 140, 8); shape(ctx, '#FBF8F1', KL_PAPIER_R, 2); const s15 = seq.slice(0, 15), s2 = seq.slice(15, 30);
  ctx.font = `600 34px ${F.meta}`; ctx.fillStyle = '#1A2740'; ctx.textAlign = 'left'; ctx.letterSpacing = '4px'; const n = Math.min(upto, 30);
  ctx.fillText(s15.slice(0, Math.min(15, n)), -w / 2 + 30, -12); if (n > 15) ctx.fillText(s2.slice(0, n - 15) + (n >= 30 ? '…' : ''), -w / 2 + 30, 38); ctx.letterSpacing = '0px'; ctx.restore(); }
// bureau met beeldscherm (achter het scherm zit het editorvenster)
function bureau(ctx, x, w, a = 1, o = {}) { if (a <= 0.01) return; const { scherm = 1, inhoud = null } = o; ctx.save(); ctx.globalAlpha *= a; const top = FLOOR - 250;
  ctx.fillStyle = '#3A4A68'; ctx.fillRect(x - w / 2 + 30, top + 16, 16, 234); ctx.fillRect(x + w / 2 - 46, top + 16, 16, 234);
  roundRect(ctx, x - w / 2, top, w, 22, 6); shape(ctx, '#4A5B7C', rgba(C.line, 0.5), 1.5);
  if (scherm > 0.01) { ctx.save(); ctx.globalAlpha *= scherm; ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 14, top - 70, 28, 70); roundRect(ctx, x - 80, top - 10, 160, 12, 5); shape(ctx, '#3A4458', null);
    roundRect(ctx, x - 230, top - 330, 460, 270, 14); shape(ctx, '#2A3446', '#5A6478', 2); roundRect(ctx, x - 216, top - 316, 432, 242, 6); shape(ctx, '#121A26', null);
    if (inhoud) { ctx.save(); ctx.beginPath(); ctx.rect(x - 216, top - 316, 432, 242); ctx.clip(); inhoud(x - 216, top - 316, 432, 242); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }
// gang/werkplek-achtergrond (alleen in scènes met mensen op de afdeling)
function afdeling(ctx, a = 1, raam = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324E'; ctx.fillRect(0, 210, W, 640); ctx.fillStyle = '#2C3B57'; ctx.fillRect(0, 850, W, 30); ctx.fillStyle = '#3A4A68'; ctx.fillRect(0, 836, W, 14);
  // raam met lamellen links, deur rechts
  if (raam) { roundRect(ctx, 120, 290, 360, 280, 8); shape(ctx, '#2A3E5E', rgba(C.line, 0.45), 2); ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 2; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(130, 310 + k * 30); ctx.lineTo(470, 310 + k * 30); ctx.stroke(); } }
  roundRect(ctx, 1560, 360, 180, 476, 6); shape(ctx, '#3B4C6C', rgba(C.line, 0.55), 2); circ(ctx, 1580, 600, 8, '#C9CED6'); roundRect(ctx, 1600, 400, 100, 54, 4); shape(ctx, '#2F3F5E', rgba(C.line, 0.4), 1.5);
  metaA(ctx, 'lab', 1650, 436, 0.8, C.text2, 'center', 22); ctx.restore(); }

// kristalplaatje (van boven): 24 putjes; in één putje kristallen
function kristalPlaat(ctx, x, y, s, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -116, 340, 232, 14); shape(ctx, rgba('#AFC0D0', 0.18), '#AFC0D0', 2);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const px = -125 + c * 50, py = -75 + r * 50; ctx.beginPath(); ctx.arc(px, py, 18, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), rgba('#AFC0D0', 0.8), 1.5);
    if (r === 1 && c === 2) { kristalletjes(ctx, px, py, 0.5, 1); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(px, py, 24, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } } }
  ctx.restore(); }
function kristalletjes(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-8, -4, 0.3, 1], [7, 5, -0.5, 0.8], [2, -10, 1.1, 0.6], [-4, 9, 0.8, 0.7]].forEach(([dx, dy, r, k]) => { ctx.save(); ctx.translate(x + dx * s * 2, y + dy * s * 2); ctx.rotate(r); ctx.scale(s * k, s * k);
    ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(9, -4); ctx.lineTo(6, 10); ctx.lineTo(-6, 10); ctx.lineTo(-9, -4); ctx.closePath(); shape(ctx, rgba('#BFE3F2', 0.75), '#E8F6FC', 1.5); ctx.restore(); }); ctx.restore(); }
// rooster van gelijke moleculen in een kristal (inhoud van een zoomcirkel): steeds hetzelfde mini-eiwitje
function kristalRooster(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = 92, dy = 80;
  for (let r = -3; r <= 3; r++) for (let c = -4; c <= 4; c++) { const px = x + c * dx + (r % 2) * 0, py = y + r * dy; if (Math.abs(px - x) > w / 2 + 50 || Math.abs(py - y) > h / 2 + 50) continue; miniEiwit(ctx, px, py, 1, 1); }
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; ctx.setLineDash([4, 6]); for (let r = -3; r <= 3; r++) { ctx.beginPath(); ctx.moveTo(x - w, y + r * dy + 40); ctx.lineTo(x + w, y + r * dy + 40); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// klein gevouwen eiwitje (2D-icoon van hetzelfde model, voor roosters, kaarten en stapels)
function miniEiwit(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { col = V.ew, lijn = null } = o; ctx.save(); ctx.globalAlpha *= a; const pts = EIWIT.MINI.map(([px, py]) => [x + px * s, y + py * s]);
  ctx.strokeStyle = lijn || lighten(col, 0.25); ctx.lineWidth = 2.4 * s; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); if (!lijn) pts.forEach((p, i) => { if (i % 2 === 0) circ(ctx, p[0], p[1], 3.6 * s, AA_KL[i % 5], lighten(AA_KL[i % 5], 0.3), 1); }); ctx.restore(); }
// röntgenopstelling in zijaanzicht: bron → kristal → detector, en het diffractiepatroon van voren.
// Recept (PDB-101 'Methods for determining structure': 'diffract the X-ray beam into a characteristic pattern of spots'; kristal =
// 'many, many molecules aligned in exactly the same orientation'): een REGELMATIG rooster van stippen (het kristalrooster), sterkte
// per stip heel verschillend, gemiddeld zwakker naar buiten (hogere resolutie), in het midden de schaduw van de bundelvanger.
// Bekende fouten: willekeurig puntenveld; ringen zoals bij poeder; stippen even fel tot de rand.
function rontgen(ctx, x, y, o = {}) { const { a = 1, bundel = 0, stip = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 300, y - 46, 150, 92, 12); shape(ctx, '#3A4458', C.line, 1.5); metaText(ctx, 'röntgen', x - 225, y + 86, C.text2, 'center', 22);
  const ray = (dy) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 230, y + dy); ctx.stroke(); };
  if (bundel > 0.01) { ctx.save(); ctx.globalAlpha *= bundel; ctx.strokeStyle = rgba('#B8A8F0', 0.85); ctx.lineWidth = 6; const e = lerp(x - 150, x, ease(bundel)); ctx.beginPath(); ctx.moveTo(x - 150, y); ctx.lineTo(e, y); ctx.stroke();
    if (bundel > 0.6) { ctx.globalAlpha *= (bundel - 0.6) / 0.4; ctx.lineWidth = 2; ctx.strokeStyle = rgba('#B8A8F0', 0.45); [-150, -105, -62, -26, 26, 62, 105, 150].forEach(ray);
      ctx.strokeStyle = rgba('#B8A8F0', 0.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 200, y); ctx.stroke(); roundRect(ctx, x + 196, y - 7, 10, 14, 3); shape(ctx, '#2A3446', C.line, 1); } ctx.restore(); }
  kristalletjes(ctx, x, y, 0.9, 1);
  roundRect(ctx, x + 230, y - 170, 26, 340, 6); shape(ctx, '#2A3446', C.line, 1.5); metaText(ctx, 'detector', x + 243, y + 210, C.text2, 'center', 22);
  if (stip > 0.01) { const cx = x + 450, cy = y, R0 = 140; roundRect(ctx, x + 300, y - 150, 300, 300, 10); shape(ctx, '#0D1420', C.line, 1);
    ctx.save(); roundRect(ctx, x + 300, y - 150, 300, 300, 10); ctx.clip(); const rnd = bi4Rng(5);
    // reciprook rooster (iets scheef, licht gedraaid); stippen verschijnen van binnen naar buiten (de detector 'vult' zich)
    const ux = [15.5, 2.2], uy = [-1.6, 13.2]; const lst = [];
    for (let h = -12; h <= 12; h++) for (let k = -12; k <= 12; k++) { if (!h && !k) continue; const px = h * ux[0] + k * uy[0], py = h * ux[1] + k * uy[1], r = Math.hypot(px, py); if (r > R0) continue;
      const I = Math.pow(rnd(), 2.2) * Math.exp(-Math.pow(r / 95, 2)); if (I < 0.03) continue; lst.push([px, py, r, I]); }
    lst.forEach(([px, py, r, I]) => { const f = clamp((stip * 1.25 - r / R0) * 4, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; circ(ctx, cx + px, cy + py, 1.6 + 3.4 * Math.sqrt(I), rgba('#E8ECF0', 0.35 + 0.65 * Math.sqrt(I))); ctx.restore(); });
    // bundelvanger: donker rondje met steeltje
    ctx.fillStyle = '#0D1420'; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.fillRect(cx - 3, cy, 6, 160);
    ctx.restore(); }
  ctx.restore(); }
// cryo-EM: rooster (van boven): koperen gaasje met vierkante mazen, daarop een koolstoffilm met ronde gaatjes; in de gaatjes
// losse eiwitten in een dun laagje glasachtig ijs, elk in een andere stand (PDB-101: 'many thousands of different single particles
// preserved in a thin layer of non-crystalline ice'; de computer combineert al die aanzichten tot één 3D-vorm).
// Bekende fouten: eiwitten netjes in een rooster (dat is een kristal); ijskristallen; allemaal dezelfde stand.
function cryoRooster(ctx, x, y, r, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#2A2F3A', '#C9A36C', 2.5); // koperen rand
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 6.283); ctx.clip();
  ctx.fillStyle = '#3B3326'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); // gaas (koper, donker)
  const m = r / 2.1, bar = r * 0.07; ctx.fillStyle = rgba('#BFE3F2', 0.10);
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { const sx = x + i * m - m / 2 + bar / 2, sy = y + j * m - m / 2 + bar / 2; ctx.fillRect(sx, sy, m - bar, m - bar); }
  // gaatjes in de koolstoffilm (regelmatig, zeshoekig), met ijs en losse eiwitten
  const rnd = bi4Rng(9), hr = r * 0.17, dx = hr * 2.7;
  for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const px = x + i * dx + (j % 2 ? dx / 2 : 0), py = y + j * dx * 0.866; if (Math.hypot(px - x, py - y) > r - hr * 0.6) continue;
    circ(ctx, px, py, hr, rgba('#BFE3F2', 0.22), rgba('#BFE3F2', 0.55), 1);
    const n = 1 + Math.floor(rnd() * 3); for (let k = 0; k < n; k++) { const an = rnd() * 6.283, rr = rnd() * hr * 0.5; ctx.save(); ctx.translate(px + Math.cos(an) * rr, py + Math.sin(an) * rr); ctx.rotate(rnd() * 6.283); ctx.scale(rnd() < 0.5 ? 1 : -1, 1); miniEiwit(ctx, 0, 0, hr / 70, 1); ctx.restore(); } }
  ctx.restore(); ctx.restore(); }
// sneeuwvlok-icoon (bevroren)
function sneeuw(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#BFE3F2'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const an = k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * r, y - Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }
// kalender met maanden die omslaan
function kalenderBi(ctx, x, y, s, frac, a = 1) { if (a <= 0.01) return; const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']; const n = Math.floor(frac * 30); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 170, 12); shape(ctx, KL_PAPIER, KL_PAPIER_R, 2); ctx.fillStyle = '#B8483A'; ctx.fillRect(-90, -80, 180, 44); circ(ctx, -50, -84, 7, '#5A6478'); circ(ctx, 50, -84, 7, '#5A6478');
  text(ctx, M[n % 12], 0, 30, fTekst(54, 800), '#1A2740', 'center'); text(ctx, 'jaar ' + (1 + Math.floor(n / 12)), 0, 72, fTekst(24, 700), '#5A6478', 'center'); ctx.restore(); }
// stapel voorbeeldkaarten (volgorde + gemeten vorm)
function voorbeeldKaart(ctx, x, y, s, seed, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -70, 220, 140, 10); shape(ctx, '#22304A', C.line, 1.5);
  const r = bi4Rng(seed); let sq = ''; for (let k = 0; k < 10; k++) sq += 'ACDEFGHIKLMNPQRSTVWY'[Math.floor(r() * 20)]; ctx.font = `600 20px ${F.meta}`; ctx.fillStyle = C.text2; ctx.textAlign = 'left'; ctx.letterSpacing = '2px'; ctx.fillText(sq, -94, -38); ctx.letterSpacing = '0px';
  ctx.save(); ctx.rotate((r() - 0.5) * 1.2); miniEiwit(ctx, 0, 18, 1.1, 1); ctx.restore(); ctx.restore(); }
// opleidingskaart (uit Forensisch 2)
function opleidingBi(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 24); text(ctx, naam, x + 26, y + 90, fTekst(naam.length > 30 ? 30 : 36, 700), C.text, 'left'); text(ctx, waar, x + 26, y + 130, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }
// werkplek-icoon (lijnicoon in afgeronde rechthoek, Part C mens-en-maatschappij)
function werkIcoon(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 60, 120, 120, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 34, y - 26, 68, 58); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 18); ctx.moveTo(x - 16, y + 2); ctx.lineTo(x + 16, y + 2); ctx.stroke(); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 40, y - 18); ctx.lineTo(x, y - 40); ctx.lineTo(x + 40, y - 18); ctx.closePath(); ctx.stroke(); for (const k of [-24, -8, 8, 24]) { ctx.beginPath(); ctx.moveTo(x + k, y - 12); ctx.lineTo(x + k, y + 28); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 40, y + 34); ctx.lineTo(x + 40, y + 34); ctx.stroke(); }
  if (soort === 'bedrijf') { ctx.beginPath(); ctx.moveTo(x - 38, y + 34); ctx.lineTo(x - 38, y - 6); ctx.lineTo(x - 14, y + 8); ctx.lineTo(x - 14, y - 6); ctx.lineTo(x + 10, y + 8); ctx.lineTo(x + 10, y - 34); ctx.lineTo(x + 30, y - 34); ctx.lineTo(x + 30, y + 34); ctx.closePath(); ctx.stroke(); }
  ctx.restore(); }
// naamkaartje zonder portret (echte personen: alleen naam)
function naamKaartje(ctx, x, y, naam, sub, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 700); const w = Math.max(ctx.measureText(naam).width, 200) + 60;
  roundRect(ctx, x - w / 2, y - 50, w, 100, 14); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, naam, x, y - 4, fTekst(36, 700), C.text, 'center'); metaText(ctx, sub, x, y + 34, C.grain, 'center', 22); ctx.restore(); }
// filmkaartje (verwijzing naar een eerdere film)
function filmKaartje(ctx, x, y, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const w = ctx.measureText(titel).width + 90; roundRect(ctx, x - w / 2, y - 40, w, 70, 12); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
  ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(x - w / 2 + 22, y - 18); ctx.lineTo(x - w / 2 + 42, y - 5); ctx.lineTo(x - w / 2 + 22, y + 8); ctx.closePath(); ctx.fill(); text(ctx, titel, x + 14, y + 6, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
// lus-icoon (gok → vergelijk → bijstellen)
function lusPijl(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 3; const off = t * 0.9;
  for (let k = 0; k < 3; k++) { const a0 = off + k * 2.094 + 0.35, a1 = a0 + 1.4; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); const hx = x + Math.cos(a1) * r, hy = y + Math.sin(a1) * r, an = a1 + Math.PI / 2;
    ctx.fillStyle = rgba(C.line, 0.8); ctx.beginPath(); ctx.moveTo(hx + Math.cos(an) * 14, hy + Math.sin(an) * 14); ctx.lineTo(hx + Math.cos(an + 2.5) * 10, hy + Math.sin(an + 2.5) * 10); ctx.lineTo(hx + Math.cos(an - 2.5) * 10, hy + Math.sin(an - 2.5) * 10); ctx.closePath(); ctx.fill(); } ctx.restore(); }
// staafdiagram scorebord CASP
function scorebord(ctx, x, y, w, h, o = {}) { const { a = 1, b16 = 0, b18 = 0, b20 = 0, lijn = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  [0, 50, 100].forEach(v => { const yy = y + h - h * v / 100; metaText(ctx, String(v), x - 16, yy + 9, C.text2, 'right', 26); ctx.strokeStyle = rgba('#FFFFFF', 0.04); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); });
  metaText(ctx, 'score', x, y - 22, C.text2, 'left', 26);
  const B = [['2016', 38, b16, '< 40'], ['2018', 60, b18, '± 60'], ['2020', 90, b20, '± 90']]; const bw = w / 5;
  B.forEach(([j, v, k, lab], i) => { const bx = x + bw * (0.7 + i * 1.45), bh = h * v / 100 * ease(k); if (k > 0.01) { roundRect(ctx, bx, y + h - bh, bw, bh, 8); shape(ctx, rgba(i === 0 ? C.line : C.teal, i === 0 ? 0.35 : 0.6), i === 0 ? C.line : C.teal, 2);
      text(ctx, lab, bx + bw / 2, y + h - bh - 18, fTekst(36, 700), C.text, 'center'); } metaA(ctx, j, bx + bw / 2, y + h + 40, k > 0.01 ? 1 : 0.35, C.text2, 'center', 26); });
  if (lijn > 0.01) { const yy = y + h - h * 0.9; ctx.save(); ctx.globalAlpha *= lijn; ctx.strokeStyle = C.groen; ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * lijn, yy); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); }
// waaier van mogelijkheden: elke schakel drie kanten op (boom die uitwaaiert)
function waaier(ctx, x, y, w, h, d, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lv = Math.min(6, Math.floor(d * 6.999)); const part = d * 6.999 - lv;
  let nodes = [[x, y + h / 2]]; for (let L = 1; L <= lv + 1; L++) { const k = L <= lv ? 1 : part; const n = Math.pow(3, L); const nx = x + w * L / 7; const next = [];
    nodes.forEach((p, i) => { for (let c = 0; c < 3; c++) { const j = i * 3 + c; const ny = y + h * (j + 0.5) / n; next.push([nx, ny]); ctx.strokeStyle = rgba(V.ew, 0.25 + 0.5 / L); ctx.lineWidth = Math.max(0.6, 3 - L * 0.4); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(lerp(p[0], nx, k), lerp(p[1], ny, k)); ctx.stroke(); } });
    nodes = next; } ctx.restore(); }
