// Wat word jij? · Bio-informatica · film 1 Zoeken in DNA — eigen tekeningen (fase A, 25 okt 2026)
//
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
// =====================================================================================================

// ---------- film-eigen tekeningen ----------
// Schaal in de werkplekscènes: persoon 430 px ≈ 1,75 m → ± 245 px per meter (bureau 75 cm hoog ≈ 185 px; sushibakje ± 20 cm ≈ 50 px).
const FLOOR = 860;
function bi1Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function bi1Rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function bi1Seq(n, seed) { const r = bi1Rng(seed); let s = ''; for (let i = 0; i < n; i++) { const v = r(); s += v < 0.27 ? 'A' : v < 0.56 ? 'T' : v < 0.82 ? 'C' : 'G'; } return s; }
// voorbeeldsequentie op het scherm (illustratie: 650 letters, geen echte GenBank-sequentie)
const SUSHI = bi1Seq(650, 4117);
// oefenvoorbeeld H2 (brief.md): stukje 1 mist na de vierde letter één letter
const OEF1 = 'ACCTAGGACTTCAGTA', OEF2 = 'ACCTCAGGACTTGAGTA', OEF1G = 'ACCT-AGGACTTCAGTA';
// H4: begin van het mRNA voor insuline (LOVD INS NM_000207.2, c.1–c.18) en het hele coderende deel (333 letters)
const INS18 = 'AUGGCCCUGUGGAUGCGC', INS_LAAT = 'UGGCCCUGUGGAUGCGCC';
const INS333 = 'AUGGCCCUGUGGAUGCGCCUCCUGCCCCUGCUGGCGCUGCUGGCCCUCUGGGGACCUGACCCAGCCGCAGCCUUUGUGAACCAACACCUGUGCGGCUCACACCUGGUGGAAGCUCUCUACCUAGUGUGCGGGGAACGAGGCUUCUUCUACACACCCAAGACCCGCCGGGAGGCAGAGGACCUGCAGGUGGGGCAGGUGGAGCUGGGCGGGGGCCCUGGUGCAGGCAGCCUGCAGCCCUUGGCCCUGGAGGGGUCCCUGCAGAAGCGUGGCAUUGUGGAACAAUGCUGUACCAGCAUCUGCUCCCUCUACCAGCUGGAGAACUACUGCAACUAG';
const INS_EIWIT = 'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN';
// de code in beeld (echte Python; draait en geeft MALWMR, met INS_LAAT geeft hij WPCGCA)
const CODE_BI1 = (mrna) => [
  'code = {"AUG": "M", "GCC": "A", "CUG": "L", "UGG": "W", "CGC": "R",',
  '        "CCC": "P", "UGU": "C", "GGA": "G", "UGC": "C"}  # in het echt: alle 64',
  `mrna = "${mrna}"`,
  'eiwit = ""',
  'for i in range(0, len(mrna), 3):',
  '    eiwit = eiwit + code[mrna[i:i+3]]',
  'print(eiwit)'];
// regels: 0–1 codontabel als woordenboek · 2 het mRNA · 3 lege keten · 4 stap van drie (len(mrna) = de code meet de lengte zelf) · 5 opzoeken en achter de keten plakken · 6 uitkomst

function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.voet || FLOOR, o.h || 430, Object.assign({ t, uit: 'neutraal', kijk: 1 }, o)); }
function kim(ctx, x, t, o = {}) { return persoon(ctx, 'kim', x, o.voet || FLOOR, o.h || 420, Object.assign({ t, uit: 'neutraal', kijk: -1, outfit: 'gewoon' }, o)); }

// bureau met beeldscherm (lijntekening, Schema); scherm = klein voorbeeld van het reeksobject (alleen kleur, geen letters)
function bureau(ctx, x, y, o = {}) { const { a = 1, w = 560, aan = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const top = y - 185; roundRect(ctx, x - w / 2, top, w, 18, 4); shape(ctx, '#3A4A68', rgba(C.line, 0.7), 1.5);
  ctx.fillStyle = '#2C3B57'; ctx.fillRect(x - w / 2 + 24, top + 18, 14, 167); ctx.fillRect(x + w / 2 - 38, top + 18, 14, 167);
  roundRect(ctx, x + w / 2 - 190, top + 18, 150, 120, 4); shape(ctx, '#2C3B57', rgba(C.line, 0.45), 1.5); ctx.fillStyle = rgba(C.line, 0.5); ctx.fillRect(x + w / 2 - 130, top + 60, 30, 5);
  // monitor
  const mw = 290, mh = 180, mx = x - 40, my = top - 30 - mh; ctx.fillStyle = '#3A4A68'; ctx.fillRect(mx - 8, top - 30, 16, 30); roundRect(ctx, mx - 60, top - 8, 120, 8, 3); ctx.fill();
  roundRect(ctx, mx - mw / 2, my, mw, mh, 10); shape(ctx, '#2A3446', rgba(C.line, 0.8), 2);
  roundRect(ctx, mx - mw / 2 + 10, my + 10, mw - 20, mh - 20, 6); shape(ctx, SCR.vul, null);
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.fillStyle = SCR.tab; ctx.fillRect(mx - mw / 2 + 10, my + 10, mw - 20, 16);
    const S = SUSHI.slice(0, 64); for (let i = 0; i < 64; i++) { const r = Math.floor(i / 16), c = i % 16; ctx.fillStyle = BASE_KL[S[i]]; ctx.fillRect(mx - mw / 2 + 26 + c * 15, my + 40 + r * 26, 12, 16); } ctx.restore(); }
  // toetsenbord
  roundRect(ctx, mx - 100, top - 12, 200, 12, 3); shape(ctx, '#4A5878', null);
  ctx.restore(); return { top, monitor: { x: mx, y: my + mh / 2, w: mw, h: mh } }; }
// leeg sushibakje (plastic, van opzij-boven), met een stukje gras als scheiding en het etiket vooraan; s = 1 → ± 50 px breed (20 cm)
function sushiBakje(ctx, x, y, s = 1, o = {}) { const { a = 1, etiket = 'blauwvintonijn', hl = 0, streep = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-26, -10); ctx.lineTo(26, -10); ctx.lineTo(23, 0); ctx.lineTo(-23, 0); ctx.closePath(); shape(ctx, '#1C1F26', '#5A6070', 0.6);
  ctx.beginPath(); ctx.ellipse(0, -10, 26, 5, 0, 0, 6.283); shape(ctx, '#262A33', '#5A6070', 0.6);
  ctx.fillStyle = '#4F9A5A'; ctx.beginPath(); ctx.moveTo(-6, -11); for (let k = 0; k <= 6; k++) ctx.lineTo(-6 + k * 2, -11 - (k % 2 ? 5 : 1)); ctx.lineTo(6, -11); ctx.closePath(); ctx.fill();
  circ(ctx, 14, -11, 3.2, '#E8A9A0', null);
  // etiket
  roundRect(ctx, -18, -7, 36, 6, 1); shape(ctx, '#F2EFE6', null);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, -20, -9, 40, 10, 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// groot etiket (voor in de zoomcirkel): bakje van dichtbij met leesbaar etiket
function sushiGroot(ctx, x, y, s = 1, o = {}) { const { a = 1, etiket = 'blauwvintonijn', hl = 0, streep = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, -60); ctx.lineTo(220, -60); ctx.lineTo(196, 50); ctx.lineTo(-196, 50); ctx.closePath(); shape(ctx, '#1C1F26', '#5A6070', 2);
  ctx.beginPath(); ctx.ellipse(0, -60, 220, 34, 0, 0, 6.283); shape(ctx, '#262A33', '#5A6070', 2);
  ctx.fillStyle = '#4F9A5A'; ctx.beginPath(); ctx.moveTo(-40, -64); for (let k = 0; k <= 10; k++) ctx.lineTo(-40 + k * 8, -64 - (k % 2 ? 40 : 8)); ctx.lineTo(40, -64); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.ellipse(120, -66, 30, 12, 0, 0, 6.283); shape(ctx, '#E8A9A0', '#C98A82', 1.5);
  ctx.beginPath(); ctx.ellipse(-130, -66, 34, 13, 0, 0, 6.283); shape(ctx, '#7FA35A', '#6A8C4A', 1.5);
  roundRect(ctx, -170, -34, 340, 70, 8); shape(ctx, '#F2EFE6', '#C9C2B0', 1.5);
  text(ctx, etiket, 0, 14, fTekst(44, 700), '#121A26', 'center');
  if (streep > 0.01) { ctx.save(); ctx.globalAlpha *= streep; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, 0); ctx.lineTo(-150 + 300 * ease(streep), 0); ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, -180, -44, 360, 90, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// reageerbuisje (1,5 ml) met nummer; s = 1 → ± 12 px breed (± 4 cm hoog)
function buisje(ctx, x, y, s = 1, o = {}) { const { a = 1, nr = '', hl = 0, vul = '#E8A9A0', rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-6, -36); ctx.lineTo(6, -36); ctx.lineTo(6, -8); ctx.lineTo(0, 0); ctx.lineTo(-6, -8); ctx.closePath(); shape(ctx, rgba('#DCE6F0', 0.35), '#AFC0D0', 1);
  ctx.beginPath(); ctx.moveTo(-5, -14); ctx.lineTo(5, -14); ctx.lineTo(5, -8); ctx.lineTo(0, -1.5); ctx.lineTo(-5, -8); ctx.closePath(); ctx.fillStyle = vul; ctx.fill();
  roundRect(ctx, -7.5, -41, 15, 6, 1.5); shape(ctx, '#C9CED6', null);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.2; roundRect(ctx, -10, -44, 20, 47, 4); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// streepjescode (DNA-barcode als icoon): strepen in de vier paarse basentinten
function streepjes(ctx, x, y, w, h, seed, o = {}) { const { a = 1, n = 30, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const S = bi1Seq(n, seed), sw = w / n;
  for (let i = 0; i < n; i++) { ctx.fillStyle = BASE_KL[S[i]]; ctx.fillRect(x + i * sw, y, sw - 1, h); }
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 6); ctx.stroke(); }
  ctx.restore(); }
// iconen (Schema, vlak, alleen als pictogram): tonijn (spoelvorm, sikkelstaart, rugvinnen, vinnetjes), vogel, kever
function visIcoon(ctx, x, y, s = 1, o = {}) { const { a = 1, col = '#6C8CA8', buik = '#B8C6D2', kijk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-104, -30); ctx.lineTo(-96, 0); ctx.lineTo(-104, 30); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.moveTo(78, 2); ctx.bezierCurveTo(60, -30, -10, -36, -60, -10); ctx.lineTo(-72, 0); ctx.lineTo(-60, 10); ctx.bezierCurveTo(-10, 34, 60, 30, 78, 2); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.moveTo(70, 8); ctx.bezierCurveTo(50, 26, -10, 28, -58, 9); ctx.lineTo(-40, 4); ctx.bezierCurveTo(0, 12, 40, 12, 70, 6); ctx.closePath(); ctx.fillStyle = buik; ctx.fill();
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(18, -27); ctx.lineTo(2, -46); ctx.lineTo(-6, -27); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-14, -24); ctx.lineTo(-30, -44); ctx.lineTo(-34, -20); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-14, 22); ctx.lineTo(-30, 42); ctx.lineTo(-34, 18); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E0C35A'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(-40 - k * 6, -14 + k * 1.2); ctx.lineTo(-44 - k * 6, -20 + k * 1.2); ctx.lineTo(-47 - k * 6, -13 + k * 1.2); ctx.fill(); ctx.beginPath(); ctx.moveTo(-40 - k * 6, 14 - k * 1.2); ctx.lineTo(-44 - k * 6, 20 - k * 1.2); ctx.lineTo(-47 - k * 6, 13 - k * 1.2); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(30, 6); ctx.lineTo(4, 16); ctx.lineTo(34, 10); ctx.closePath(); ctx.fillStyle = _bi1Donker(col, 0.2); ctx.fill();
  circ(ctx, 56, -4, 5, '#121A26', null); circ(ctx, 57, -5, 1.5, '#C9CED6', null); ctx.restore(); }
function vogelIcoon(ctx, x, y, s = 1, o = {}) { const { a = 1, col = '#8C5A3A', buik = '#C9A36C' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -8); ctx.lineTo(-92, -2); ctx.lineTo(-88, 8); ctx.lineTo(-56, 6); ctx.closePath(); ctx.fillStyle = _bi1Donker(col, 0.2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-6, 0, 58, 30, -0.12, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.ellipse(4, 12, 40, 16, -0.1, 0, 6.283); ctx.fillStyle = buik; ctx.fill();
  circ(ctx, 50, -22, 22, col, null); ctx.beginPath(); ctx.moveTo(68, -26); ctx.lineTo(88, -20); ctx.lineTo(68, -16); ctx.closePath(); ctx.fillStyle = '#E0B64A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(-14, -6, 40, 16, -0.3, 0, 6.283); ctx.fillStyle = _bi1Donker(col, 0.25); ctx.fill(); circ(ctx, 56, -26, 3.5, '#121A26', null);
  ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 28); ctx.lineTo(-4, 50); ctx.moveTo(14, 26); ctx.lineTo(12, 50); ctx.stroke(); ctx.restore(); }
function keverIcoon(ctx, x, y, s = 1, o = {}) { const { a = 1, col = '#C9A35C' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6440'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const k of [-1, 1]) for (const yy of [-12, 2, 16]) { ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(k * 46, yy + (yy < 0 ? -10 : 12)); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-6, -40); ctx.lineTo(-18, -62); ctx.moveTo(6, -40); ctx.lineTo(18, -62); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -30, 14, 12, 0, 0, 6.283); ctx.fillStyle = '#5A4A30'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 8, 32, 38, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = _bi1Donker(col, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -28); ctx.lineTo(0, 46); ctx.stroke();
  ctx.restore(); }
function _bi1Donker(hex, k) { const n = parseInt(hex.slice(1), 16); const f = (v) => Math.round(v * (1 - k)); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; }
// databank als cilinder (pictogram, Schema), met rijen gekleurde streepjes als 'sequenties'
function databank(ctx, x, y, s = 1, o = {}) { const { a = 1, hl = 0, vul = 0.6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 150, h = 170; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(-w / 2, h / 2); ctx.ellipse(0, h / 2, w / 2, 22, 0, Math.PI, 0, true); ctx.lineTo(w / 2, -h / 2); ctx.closePath(); shape(ctx, C.fill, lighten(C.fill, 0.35), 1.5);
  ctx.beginPath(); ctx.ellipse(0, -h / 2, w / 2, 22, 0, 0, 6.283); shape(ctx, '#34466A', lighten(C.fill, 0.35), 1.5);
  for (let r = 0; r < 5; r++) { const S = bi1Seq(12, 50 + r * 7 + Math.round(x)); const yy = -h / 2 + 40 + r * 24; if (r / 5 > vul) break; for (let i = 0; i < 12; i++) { ctx.fillStyle = BASE_KL[S[i]]; ctx.fillRect(-w / 2 + 18 + i * 10, yy, 8, 12); } }
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, -w / 2 - 12, -h / 2 - 34, w + 24, h + 68, 16); ctx.stroke(); }
  ctx.restore(); }
// restaurantbakje (pictogram voor de Radar-telling): kom met stukje vis
function komIcoon(ctx, x, y, s = 1, o = {}) { const { a = 1, vis = '#C9CED6', rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -10, 30, 11, 0, 0, 6.283); ctx.fillStyle = vis; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, 50, 40, 0); ctx.closePath(); shape(ctx, '#3A4A68', rand || lighten('#3A4A68', 0.3), rand ? 3 : 1.5); ctx.restore(); }
// werkplek-iconen (lijntekening in afgeronde rechthoek, Part C4): ziekenhuis, onderzoeksinstituut, bedrijf
function werkplekIcoon(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 60, 120, 120, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 34, y - 26, 68, 60); ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x, y + 6); ctx.moveTo(x - 12, y - 6); ctx.lineTo(x + 12, y - 6); ctx.stroke(); ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x, y + 6); ctx.moveTo(x - 12, y - 6); ctx.lineTo(x + 12, y - 6); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.strokeRect(x - 9, y + 16, 18, 18); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 40, y - 16); ctx.lineTo(x, y - 40); ctx.lineTo(x + 40, y - 16); ctx.closePath(); ctx.stroke(); for (const k of [-26, -9, 9, 26]) { ctx.beginPath(); ctx.moveTo(x + k, y - 8); ctx.lineTo(x + k, y + 26); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 40, y + 34); ctx.lineTo(x + 40, y + 34); ctx.stroke(); }
  if (soort === 'bedrijf') { ctx.beginPath(); ctx.moveTo(x - 40, y + 34); ctx.lineTo(x - 40, y - 4); ctx.lineTo(x - 16, y - 18); ctx.lineTo(x - 16, y - 4); ctx.lineTo(x + 8, y - 18); ctx.lineTo(x + 8, y - 4); ctx.lineTo(x + 40, y - 4); ctx.lineTo(x + 40, y + 34); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 24, y - 4); ctx.lineTo(x + 24, y - 36); ctx.stroke(); }
  ctx.restore(); }
// computer (pictogram) voor 'razendsnel'
function computerIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -60, 140, 92, 8); shape(ctx, '#2A3446', C.line, 2); roundRect(ctx, -60, -50, 120, 72, 4); shape(ctx, SCR.vul, null);
  for (let i = 0; i < 4; i++) { const S = bi1Seq(10, 300 + i); for (let k = 0; k < 10; k++) { ctx.fillStyle = BASE_KL[S[k]]; ctx.fillRect(-52 + k * 10.5, -42 + i * 16, 8, 10); } }
  ctx.fillStyle = '#3A4A68'; ctx.fillRect(-8, 32, 16, 16); roundRect(ctx, -40, 46, 80, 8, 3); ctx.fill(); ctx.restore(); }
// twee aparte dubbele DNA-strengen (Micro, schematisch uitgerold): bovenste ruggengraat, basen naar binnen, waterstofbruggen gestippeld.
// seq = bovenste streng; o.weg = index van het basenpaar dat verdwijnt (0..1 via o.wegA), o.schuif 0..1 schuift de rest één plek op.
function _bi1BasePad(ctx, x, y, b, dir, L, hw) { // basisvorm uit de DNA-reeks (dnalib basePath): A punt, T inkeping, C smalle staaf, G sleuf
  const d = L * 0.13, tw = hw * 0.48, yb = y + dir * (L - d), yo = y + dir * L; ctx.beginPath(); ctx.moveTo(x - hw, y); ctx.lineTo(x + hw, y);
  if (b === 'A') { ctx.lineTo(x + hw, yb); ctx.lineTo(x, yo); ctx.lineTo(x - hw, yb); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(x + hw, yo); ctx.lineTo(x, yb); ctx.lineTo(x - hw, yo); }
  else if (b === 'C') { ctx.lineTo(x + hw, yb); ctx.lineTo(x + tw, yb); ctx.lineTo(x + tw, yo); ctx.lineTo(x - tw, yo); ctx.lineTo(x - tw, yb); ctx.lineTo(x - hw, yb); }
  else { ctx.lineTo(x + hw, yo); ctx.lineTo(x + tw, yo); ctx.lineTo(x + tw, yb); ctx.lineTo(x - tw, yb); ctx.lineTo(x - tw, yo); ctx.lineTo(x - hw, yo); }
  ctx.closePath(); }
function dubbeleStreng(ctx, x, y, seq, o = {}) { const { a = 1, dx = 46, bh = 34, gap = 92, weg = -1, wegA = 0, schuif = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const COMP = { A: 'T', T: 'A', C: 'G', G: 'C' }, n = seq.length, pos = (i) => x + (i - (weg >= 0 && i > weg ? schuif : 0)) * dx;
  const nEind = n - (weg >= 0 ? schuif : 0), L = (gap - 14) / 2, hw = dx * 0.32; const bb = (yy) => { roundRect(ctx, x - dx / 2, yy - 7, nEind * dx, 14, 7); shape(ctx, '#3E3366', '#8C7BBF', 1.2); };
  for (let i = 0; i < n; i++) { let fa = 1; if (i === weg) fa = 1 - wegA; if (fa <= 0.01) continue; const xi = pos(i), b = seq[i], c = COMP[b], mk = i === weg && wegA > 0.02;
    ctx.save(); ctx.globalAlpha *= fa; const dy = i === weg ? -wegA * 30 : 0;
    _bi1BasePad(ctx, xi, y + 7 + dy, b, 1, L, hw); shape(ctx, BASE_KL[b], mk ? C.koraal : lighten(BASE_KL[b], 0.3), mk ? 3 : 1);
    _bi1BasePad(ctx, xi, y + gap - 7 + dy, c, -1, L, hw); shape(ctx, BASE_KL[c], mk ? C.koraal : lighten(BASE_KL[c], 0.3), mk ? 3 : 1);
    ctx.restore(); }
  bb(y); bb(y + gap);
  ctx.restore(); }
// kleine codontabel (pictogram, verwijzing naar De genetische code lezen): 4 × 4 vakken met de vier RNA-tinten
function miniCodontabel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const B = 'UCAG', c = 34 * s;
  for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { roundRect(ctx, x + k * (c + 4), y + r * (c + 4), c, c, 4); shape(ctx, rgba(RNA_KL[B[r]], 0.35 + 0.15 * k), rgba(C.line, 0.6), 1); }
  ctx.restore(); }
// databankstapel: veel smalle rijen tegeltjes (zonder letters), loopt boven uit beeld; o.licht(k) → 0..1 gouden woordje op rij k
function stapel(ctx, x, y0, w, o = {}) { const { a = 1, n = 40, rh = 22, dimRest = 0, licht = null, scroll = 0, tegel = 9, top = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.rect(x - 10, top, w + 20, y0 + 10 - top); ctx.clip(); const nt = Math.floor(w / (tegel + 2));
  for (let k = 0; k < n; k++) { const yy = y0 - k * rh + (scroll % rh) - rh; if (yy < -rh) break; const kk = k + Math.floor(scroll / rh); const L = licht ? licht(kk) : 0;
    ctx.save(); ctx.globalAlpha *= L > 0.01 ? 1 : lerp(1, 0.35, dimRest); const S = bi1Seq(nt, 900 + kk * 13);
    for (let i = 0; i < nt; i++) { ctx.fillStyle = BASE_KL[S[i]]; ctx.fillRect(x + i * (tegel + 2), yy, tegel, rh - 8); }
    if (L > 0.01) { const wx = x + ((kk * 37) % Math.max(1, nt - 30)) * (tegel + 2); ctx.globalAlpha *= L; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, wx - 3, yy - 3, 28 * (tegel + 2) + 4, rh - 2, 4); ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); }
