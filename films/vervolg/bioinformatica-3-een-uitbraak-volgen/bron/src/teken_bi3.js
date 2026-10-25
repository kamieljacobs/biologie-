// Wat word jij? · Bio-informatica · film 3 · Stambomen uit DNA: een uitbraak volgen — eigen tekeningen (fase A, 25 okt 2026)
// Look Schema met cast (Sam, Dr. Kim outfit 'gewoon'). Geen zieke mensen: medewerkers als telpoppetjes, patiënten als bedden van bovenaf.
// Reeksobject 'scherm met code / sequenties': letterlijk overgenomen uit bi1/teken_bi1.js (codeScherm, sequentieRij …); eigen wrappers venster3, rij3, tegel3 eronder.
// Mensen in het bedachte voorbeeld (keuring Kamiel 25 okt 2026): castpersonages en figuranten in plaats van telpoppetjes en bedden.

const ZORG = '#6F93C4';                 // zorgblauw: medewerkers als telpoppetjes
const MONKL = { A: C.teal, B: C.teal, C: C.paars, E: C.paars, D: C.oker }; // kleur = virusgroep (alleen zodra de boom of de uitslag dat zegt)
const FLOOR3 = 860;
const GRP3 = [C.teal, C.paars, C.oker];   // drie groepen in de echte studie (kleur = groep, geen plaats)

function m3(ctx, s, x, y, a = 1, col = C.grain, align = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, col, align, px); ctx.restore(); }
function sam3(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, FLOOR3, 420, Object.assign({ t, uit: 'neutraal', kijk: 1 }, o)); }
function kim3(ctx, x, t, o = {}) { return persoon(ctx, 'kim', x, FLOOR3, 420, Object.assign({ t, uit: 'neutraal', kijk: -1, outfit: 'gewoon' }, o)); }
// kleuren mengen (hex uit, zodat rgba() erna werkt)
function mix3(a, b, k) { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); }

// ---------- kaartjes ----------
function kaartje3(ctx, s, x, y, a = 1, col = C.grain) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(26); ctx.letterSpacing = '3px'; const w = ctx.measureText(s.toUpperCase()).width + 36; ctx.letterSpacing = '0px';
  roundRect(ctx, x, y, w, 46, 10); shape(ctx, rgba('#121A26', 0.85), col, 1.5); metaText(ctx, s, x + 18, y + 32, col, 'left', 26); ctx.restore(); return w; }
function bedacht3(ctx, a = 1, x = 60, y = 74) { return kaartje3(ctx, 'bedacht voorbeeld', x, y, a, C.grain); }

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
// eigen wrappers op het reeksobject (bi3): venster met eigen inhoud, rij lettertegels vanaf de linkerbovenhoek
// modus 'grijs' = gelijke letters gedempt (40 %), goud[] = afwijkende letters met gouden rand; flikker/fk = één letter wisselt
function venster3(ctx, x, y, w, h, tab, o = {}, inhoud) { return codeScherm(ctx, x, y, w, h, [], { tab, a: o.a == null ? 1 : o.a, inhoud: inhoud ? () => inhoud() : null }); }
function rij3(ctx, x, y, seq, o = {}) { const { a = 1, w = 40, gap = 6, h = 48, modus = 'kleur', goud = [], n = seq.length, flikker = -1, fk = 0 } = o; if (a <= 0.01) return;
  let s2 = seq, gl = goud; if (flikker >= 0 && fk > 0.5) { s2 = seq.slice(0, flikker) + ({ A: 'G', G: 'A', C: 'T', T: 'C' }[seq[flikker]] || seq[flikker]) + seq.slice(flikker + 1); gl = goud.concat([flikker]); }
  const s = w / 44; sequentieRij(ctx, x + w / 2, y + h / 2, s2, { a, s, h: h / s, dx: w + gap, zicht: n, hl: i => gl.includes(i) ? 1 : 0, alpha: modus === 'grijs' ? (i => gl.includes(i) ? 1 : 0.4) : null }); }
function tegel3(ctx, x, y, L, o = {}) { const { a = 1, w = 40, h = 48, modus = 'kleur', vraag = 0 } = o; rij3(ctx, x, y, L, { a, w, h, modus, goud: modus === 'goud' ? [0] : [] });
  if (vraag > 0.01) { ctx.save(); ctx.globalAlpha *= a * vraag; circ(ctx, x + w - 2, y + 2, 13, C.koraal); text(ctx, '?', x + w - 2, y + 11, fTekst(22, 800), '#121A26', 'center'); ctx.restore(); } }

// ---------- monsters en mensen ----------
// monster = hoofdletter in een gekleurd rondje (groepjes 'A-B' als pil)
function mon3(ctx, x, y, L, o = {}) { const { a = 1, r = 30, col = null, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const fill = col ? mix3('#1A2740', col, 0.45) : '#2A3A58', st = col || C.line; ctx.font = fTekst(r * 1.15, 800); const tw = ctx.measureText(L).width; const w = Math.max(r * 2, tw + r * 1.1);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - w / 2 - 8, y - r - 8, w + 16, 2 * r + 16, r + 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  roundRect(ctx, x - w / 2, y - r, w, 2 * r, r); shape(ctx, fill, st, 2.5); text(ctx, L, x, y + r * 0.4, fTekst(r * 1.15, 800), C.text, 'center'); ctx.restore(); return w; }
// telpoppetje (alleen in groepen en schema's); stip = 'niet getest' (stippellijn, zelfde zorgblauw)
function pop3(ctx, x, y, h, col = ZORG, o = {}) { const { a = 1, stip = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y - h * 0.82, h * 0.16, 0, 6.283); if (stip) { ctx.setLineDash([h * 0.07, h * 0.06]); ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, h * 0.04); ctx.stroke(); } else { ctx.fillStyle = col; ctx.fill(); }
  roundRect(ctx, x - h * 0.22, y - h * 0.62, h * 0.44, h * 0.62, h * 0.16); if (stip) ctx.stroke(); else ctx.fill(); ctx.setLineDash([]); ctx.restore(); }
// ziekenhuis als lijnicoon (zoals in Verloskunde), huisje voor 'buiten'
function zh3(ctx, x, y, s = 1, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, -150, 240, 210, 8); shape(ctx, rgba(col, 0.16), col, 4); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) if (!(r === 2 && (k === 1 || k === 2))) { roundRect(ctx, -96 + k * 52, -126 + r * 52, 30, 30, 3); shape(ctx, rgba(C.goud, 0.35), null); }
  roundRect(ctx, -24, 4, 48, 56, 4); shape(ctx, rgba(col, 0.45), null); ctx.fillStyle = C.koraal; ctx.fillRect(-12, -205, 24, 66); ctx.fillRect(-33, -184, 66, 24); ctx.restore(); }
function huis3(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(0, -140); ctx.lineTo(90, -60); ctx.lineTo(90, 60); ctx.lineTo(-90, 60); ctx.closePath(); shape(ctx, rgba(col, 0.18), col, 4);
  roundRect(ctx, -22, 0, 44, 60, 4); shape(ctx, rgba(col, 0.45), null); roundRect(ctx, 34, -30, 36, 36, 4); shape(ctx, rgba(C.goud, 0.5), null); ctx.restore(); }

// ---------- mensen in het bedachte voorbeeld (keuring Kamiel 25 okt 2026: realistische mensjes, geen telpoppetjes of bedden) ----------
// A = Verpleegkundige Jesse (vaste vakpersoon, outfit 'werk'); C, B en E = nieuwe figuranten zonder naam in de film (ter keuring,
// na akkoord naar personages/lib_cast.js); D = Joost (figurant); niet getest = een naamloze voorbijganger (`passant`) en Mevrouw Jansen (figuranten, 'buiten').
// Patiënt E is niet ziek in bed: ze zit op een stoel in gewone kleding. Geen gezichtsuitdrukking die schuld of ziekte suggereert.
Object.assign(CAST, {
  zorgc: { naam: 'Verpleegkundige (figurant)', leeftijd: 34, rol: 'figurant · verpleegkundige op dezelfde afdeling als Jesse (Bio-informatica 3, bedacht voorbeeld)', huid: '#B98060', haar: '#2A1C16', kapsel: 'staart', elastiek: '#5B8CC9', wenkbrauw: '#22160F', wimpers: true, lippen: '#A9584E',
           top: 'overhemd', topKleur: '#8DB3D3', topAccent: '#769EC0', broek: '#8DB3D3', schoen: '#F2F2EE', schoenAccent: '#5B8CC9', accessoire: ['oorbel'], lengte: 0.98,
           garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#9A5A6E', topAccent: '#824A5C', broek: '#33415C', schoen: '#3A3F4E', schoenAccent: '#2A2F3E' } } },
  zorgb: { naam: 'Zorgmedewerker (figurant)', leeftijd: 46, rol: 'figurant · zorgmedewerker in een ander ziekenhuis (Bio-informatica 3, bedacht voorbeeld)', huid: '#D9AE8A', haar: '#3A2A20', kapsel: 'kort', wenkbrauw: '#2E2018', stoppels: true,
           top: 'overhemd', topKleur: '#7FB09A', topAccent: '#6A9A85', broek: '#7FB09A', schoen: '#F2F2EE', schoenAccent: '#3E7C6A', accessoire: ['bril'], lengte: 1.02,
           garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#5A6E8A', topAccent: '#4A5C74', broek: '#3E3A4E' } } },
  patiente: { naam: 'Patiënt (figurant)', leeftijd: 63, rol: 'figurant · patiënt op de afdeling, zittend in gewone kleding (Bio-informatica 3, bedacht voorbeeld)', huid: '#E9C1A0', haar: '#A8A49C', kapsel: 'bob', wenkbrauw: '#8A847A', wimpers: true, lippen: '#B4605A',
           top: 'vest', topKleur: '#8A6A8E', topAccent: '#745878', binnen: '#EEE6DA', broek: '#3E4A5E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril'], lengte: 0.95 }
});
Object.assign(CAST, {
  passant: { naam: 'Voorbijganger (figurant)', leeftijd: 40, rol: 'figurant · iemand uit de buurt zonder verhaal, niet getest (Bio-informatica 3); geen vaste rol', huid: '#C99A78', haar: '#5A4232', kapsel: 'kort', wenkbrauw: '#4A3628',
           top: 'trui', topKleur: '#6E8A6A', topAccent: '#5A7458', broek: '#3E4658', schoen: '#4A4A52', schoenAccent: '#34343A', accessoire: [], lengte: 1.0 }
});
const MENS3 = { A: ['jesse', 'werk'], C: ['zorgc', 'werk'], B: ['zorgb', 'werk'], E: ['patiente', null], D: ['joost', null] };
// één mens uit het voorbeeld; voet = vloer; E zit altijd op een stoel
function mens3(ctx, k, x, voet, h, o = {}) { const [id, outfit] = MENS3[k]; const zit = k === 'E';
  return persoon(ctx, id, x, voet, h, Object.assign({ t: o.t || 0, uit: 'neutraal', kijk: o.kijk || 1, outfit, pose: zit ? 'zit' : (o.pose || 'staan'), stoel: zit ? '#5A6A84' : undefined }, o.extra || {}, { a: o.a == null ? 1 : o.a })); }
// 'niet getest': gestippeld kader om een mens + label erboven (nooit half doorzichtig)
function nietGetest3(ctx, id, x, voet, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const w = h * 0.5;
  ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([10, 8]); roundRect(ctx, x - w / 2, voet - h - 16, w, h + 30, 16); ctx.strokeStyle = ZORG; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
  persoon(ctx, id, x, voet, h, { t: o.t || 0, uit: 'neutraal', kijk: o.kijk || 1, outfit: o.outfit, a });
  if (o.label !== false) m3(ctx, 'niet getest', x, voet - h - 30, a, ZORG, 'center', 20); }

// ---------- plattegrond van het bedachte voorbeeld (geen stadsnamen) ----------
// mensen staan (E zit) in de ruimtes, badge A–E boven het hoofd; o.col {A:kleur}, o.hl {A:0..1}, o.wie = welke mensen (standaard alle vijf)
// o.extra(B) tekent er iets bij; tx/ty/sc = plaats
const PL3 = { A: [215, 600], C: [355, 600], E: [520, 600], B: [870, 520], D: [800, 860] };
const PLH3 = 210;
function plattegrond3(ctx, o = {}) { const { a = 1, tx = 0, ty = 0, sc = 1, col = {}, hl = {}, mon = 1, namen = 1, wie = 'ABCDE', t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(tx, ty); ctx.scale(sc, sc);
  roundRect(ctx, 100, 210, 540, 440, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 2); naamBij(ctx, 'ziekenhuis 1', '', 370, 196, namen, 'center');
  roundRect(ctx, 128, 300, 484, 320, 14); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.6), 1.5); m3(ctx, 'afdeling', 594, 336, 1, C.grain, 'right', 24);
  roundRect(ctx, 700, 210, 340, 330, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 2); naamBij(ctx, 'ziekenhuis 2', '', 870, 196, namen, 'center');
  ctx.save(); ctx.setLineDash([10, 8]); roundRect(ctx, 700, 600, 340, 280, 18); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); naamBij(ctx, 'buiten de ziekenhuizen', '', 870, 588, namen, 'center');
  huis3(ctx, 965, 815, 0.42, 1);
  const kijk = { A: 1, C: 1, E: -1, B: -1, D: 1 };
  for (const k of 'ACEBD') if (wie.includes(k)) mens3(ctx, k, PL3[k][0], PL3[k][1], k === 'D' ? 190 : PLH3, { t, kijk: kijk[k] });
  const B = { A: [PL3.A[0], 360], C: [PL3.C[0], 360], E: [PL3.E[0], 420], B: [PL3.B[0], 278], D: [PL3.D[0], 640] };
  for (const k of 'ABCDE') if (wie.includes(k)) mon3(ctx, B[k][0], B[k][1], k, { a: mon, r: 26, col: col[k] || null, hl: hl[k] || 0 });
  if (o.extra) o.extra(B); ctx.restore(); return B; }

// ---------- tabel met verschillen ----------
const DIST3 = { 'A|B': 0, 'A|C': 5, 'A|E': 5, 'B|C': 5, 'B|E': 5, 'C|E': 2, 'A|D': 6, 'B|D': 6, 'C|D': 7, 'D|E': 7,
  'A-B|C': 5, 'A-B|E': 5, 'A-B|D': 6, 'C|D': 7, 'A-B|C-E': 5, 'C-E|D': 7 };
const dist3 = (p, q) => DIST3[p + '|' + q] != null ? DIST3[p + '|' + q] : DIST3[q + '|' + p];
// namen = rij- en kolomnamen; alleen de onderste driehoek; o.vul 0..1 (cellen verschijnen op volgorde), o.hl { 'A|B': [kleur, 0..1] }
function tabel3(ctx, x, y, namen, o = {}) { const { a = 1, c = 104, vul = 1, hl = {}, dimAlles = 0, px = 44, paar = false, paarHl = {} } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = namen.length;
  const kop = (nm, cx, cy, side) => { if (paar && nm.includes('-')) paar3(ctx, cx, cy, nm.split('-'), { hl: paarHl[nm] || 0, r: 24 }); else mon3(ctx, cx, cy, nm, { r: 24, hl: paarHl[nm] || 0 }); };
  for (let j = 0; j < n - 1; j++) kop(namen[j], x + j * c + c / 2, y - 40);
  for (let i = 1; i < n; i++) kop(namen[i], x - (paar && namen[i].includes('-') ? 80 : 50), y + (i - 1) * c + c / 2);
  let k = 0; const tot = n * (n - 1) / 2;
  for (let i = 1; i < n; i++) for (let j = 0; j < i; j++) { const cx = x + j * c, cy = y + (i - 1) * c; const key = namen[j] + '|' + namen[i], key2 = namen[i] + '|' + namen[j]; const h = hl[key] || hl[key2];
    const al = clamp(vul * tot - k, 0, 1); k++;
    roundRect(ctx, cx + 4, cy + 4, c - 8, c - 8, 10); shape(ctx, rgba(C.fill, 0.55), rgba(C.line, 0.5), 1);
    if (h && h[1] > 0.01) { ctx.save(); ctx.globalAlpha *= h[1]; roundRect(ctx, cx + 4, cy + 4, c - 8, c - 8, 10); shape(ctx, rgba(h[0], 0.28), h[0], 3.5); ctx.restore(); }
    if (al > 0.01) { const v = dist3(namen[j], namen[i]); text(ctx, String(v), cx + c / 2, cy + c / 2 + px * 0.36, fTekst(px, 800), C.text, 'center'); } }
  ctx.restore(); }

// paar van twee monsters: twee rondjes met een verbindingsstreep (C–E), hl = goud oplichten
function paar3(ctx, x, y, L, o = {}) { const { a = 1, r = 20, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = r * 1.25;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - d - r - 8, y - r - 8, 2 * (d + r + 8), 2 * r + 16, r + 8); shape(ctx, rgba(C.goud, 0.25), C.goud, 3.5); ctx.restore(); }
  ctx.strokeStyle = hl > 0.5 ? C.goud : C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - d, y); ctx.lineTo(x + d, y); ctx.stroke();
  mon3(ctx, x - d, y, L[0], { r }); mon3(ctx, x + d, y, L[1], { r }); ctx.restore(); }

// ---------- de boom (van onder af, bladeren A B C E D) ----------
// g1 A-B · g2 C-E · g3 A-B met C-E · g4 D aan de wortel (0..1 groeien), steun 0..1 toont de getallen, wankel 0..1 = stippel + wiebel op g3
function boom3(ctx, x, y, w, h, o = {}) { const { a = 1, g1 = 1, g2 = 1, g3 = 1, g4 = 1, steun = 0, wankel = 0, t = 0, kleur = 1, lw = 5, r = 30, hl = {}, steunTxt = ['99 / 100', '± 85 / 100', '± 58 / 100'], hlSteun = [0, 0, 0], wiebel = 0, bladA = 1, monHl = {}, paarLabels = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ord = ['A', 'B', 'C', 'E', 'D'], X = {}; ord.forEach((k, i) => X[k] = x + i * w / 4); const top = y - r - 6;
  const wb = wiebel * Math.sin(t * 9) * 10, wk = wankel * Math.sin(t * 2.6) * 12;
  const H1 = top - h * 0.12, H2 = top - h * 0.3 + wb, H3 = top - h * 0.62 + wk, H4 = top - h * 0.9;
  const m1 = (X.A + X.B) / 2, m2 = (X.C + X.E) / 2, m3x = (m1 + m2) / 2, m4 = (m3x + X.D) / 2;
  const tak = (xa, ya, xb, yb, yt, p, dash, col) => { if (p <= 0.01) return; ctx.save(); ctx.strokeStyle = col || C.line; ctx.lineWidth = lw; ctx.lineCap = 'round'; if (dash) ctx.setLineDash([12, 12]);
    const pv = clamp(p / 0.6, 0, 1), ph = clamp((p - 0.6) / 0.4, 0, 1); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xa, lerp(ya, yt, pv)); ctx.moveTo(xb, yb); ctx.lineTo(xb, lerp(yb, yt, pv)); ctx.stroke();
    if (ph > 0) { const xm = (xa + xb) / 2; ctx.beginPath(); ctx.moveTo(xm - (xm - xa) * ph, yt); ctx.lineTo(xm + (xb - xm) * ph, yt); ctx.stroke(); } ctx.restore(); };
  tak(X.A, top, X.B, top, H1, g1, false, hl.g1); tak(X.C, top, X.E, top, H2, g2, false, hl.g2);
  tak(m1, H1, m2, H2, H3, g3, wankel > 0.5, hl.g3); tak(m3x, H3, X.D, top, H4, g4, false, hl.g4);
  if (paarLabels > 0.01) { if (g1 > 0.99) paar3(ctx, m1, H1 - 40, ['A', 'B'], { r: 20, a: paarLabels }); if (g2 > 0.99) paar3(ctx, m2, H2 - 40, ['C', 'E'], { r: 20, a: paarLabels, hl: hl.g2 ? 1 : 0 }); }
  if (g4 > 0.99) { ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(m4, H4); ctx.lineTo(m4, H4 - 30); ctx.stroke(); ctx.restore(); }
  ord.forEach(k => mon3(ctx, X[k], y, k, { r, col: kleur > 0.5 ? MONKL[k] : null, a: bladA, hl: monHl[k] || 0 }));
  const S = [[m1, H1], [m2, H2], [m3x, H3]];
  if (steun > 0.01) S.forEach(([sx, sy], i) => { const al = clamp(steun * 3 - i, 0, 1); if (al <= 0) return; ctx.save(); ctx.globalAlpha *= al; ctx.font = fTekst(34, 800); const tw = ctx.measureText(steunTxt[i]).width + 26;
    roundRect(ctx, sx - tw / 2, sy - 64, tw, 48, 12); shape(ctx, rgba('#121A26', 0.9), hlSteun[i] > 0.5 ? C.goud : rgba(C.line, 0.7), hlSteun[i] > 0.5 ? 3 : 1.5); text(ctx, steunTxt[i], sx, sy - 28, fTekst(34, 800), hlSteun[i] > 0.5 ? C.goud : C.text, 'center'); ctx.restore(); });
  ctx.restore(); return { X, H1, H2, H3, H4, S, top, m1, m2, m3: m3x }; }
// klein boompje (één trekking): v = 0 ((AB)(CE))D · 1 ((AB)D)(CE) · 2 (AB)((CE)D)
function boompje3(ctx, x, y, s, v = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const L = { A: [-80, 0], B: [-40, 0], C: [0, 0], E: [40, 0], D: [80, 0] }; let ord = v === 1 ? ['A', 'B', 'D', 'C', 'E'] : ['A', 'B', 'C', 'E', 'D']; ord.forEach((k, i) => L[k] = [-80 + i * 40, 0]);
  const join = (p, q, hgt) => { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0], -hgt); ctx.lineTo(q[0], -hgt); ctx.lineTo(q[0], q[1]); ctx.stroke(); return [(p[0] + q[0]) / 2, -hgt]; };
  const ab = join(L.A, L.B, 14), ce = join(L.C, L.E, 30);
  if (v === 0) { const x1 = join(ab, ce, 60); join(x1, L.D, 86); } else if (v === 1) { const x1 = join(ab, L.D, 60); join(x1, ce, 86); } else { const x1 = join(ce, L.D, 60); join(ab, x1, 86); }
  ord.forEach(k => circ(ctx, L[k][0], 12, 9, MONKL[k])); ctx.restore(); }

// ---------- virus, buisje, strengen, machine ----------
// coronavirus: envelop (dubbele lijn) met knotsvormige spikes, kleine membraaneiwitten; binnenin een dunne sliertige RNA-streng met N-eiwitten als kraaltjes
function corona3(ctx, x, y, r, o = {}) { const { a = 1, t = 0, rna = 1, n = 22, hlRna = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  const KO = '#E07A5F', KL = '#F0A88F';
  for (let k = 0; k < n; k++) { const th = (k + 0.3 * (hash(k * 3.1) - 0.5)) / n * 6.283 + t * 0.03; const c = Math.cos(th), s = Math.sin(th);
    ctx.strokeStyle = lighten(KO, 0.15); ctx.lineWidth = Math.max(2, r * 0.035); ctx.beginPath(); ctx.moveTo(c * r, s * r); ctx.lineTo(c * r * 1.2, s * r * 1.2); ctx.stroke();
    ctx.save(); ctx.translate(c * r * 1.27, s * r * 1.27); ctx.rotate(th); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.085, r * 0.11, 0, 0, 6.283); shape(ctx, KL, lighten(KL, 0.3), 1); ctx.restore(); }
  circ(ctx, 0, 0, r, rgba(KO, 0.14), lighten(KO, 0.25), Math.max(1.5, r * 0.025)); circ(ctx, 0, 0, r * 0.93, null, rgba(lighten(KO, 0.25), 0.7), Math.max(1, r * 0.015));
  for (let k = 0; k < 30; k++) { const th = (k + 0.5) / 30 * 6.283; circ(ctx, Math.cos(th) * r * 0.965, Math.sin(th) * r * 0.965, Math.max(1.5, r * 0.022), rgba(KL, 0.8)); }
  if (rna > 0.01) { ctx.save(); ctx.globalAlpha *= rna; ctx.beginPath(); const P = []; for (let i = 0; i <= 220; i++) { const u = i / 220 * 6.283 * 2.3; const rr = r * (0.18 + 0.52 * (0.5 + 0.5 * Math.sin(u * 1.7 + 0.6))); P.push([Math.cos(u * 1.13 + 0.4 * Math.sin(u * 3.1)) * rr, Math.sin(u * 0.97 + 0.5 * Math.cos(u * 2.3)) * rr]); }
    P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = hlRna > 0.5 ? C.goud : '#B4A6E0'; ctx.lineWidth = Math.max(1.5, r * 0.022); ctx.lineJoin = 'round'; ctx.stroke();
    P.forEach((p, i) => { if (i % 11 === 5) circ(ctx, p[0], p[1], Math.max(2, r * 0.035), rgba(C.paars, 0.9), '#B4A6E0', 1); }); ctx.restore(); }
  ctx.restore(); }
// buisje met wattenstaafje (transportbuisje met dop)
function buis3(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#E8ECF2'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -170); ctx.lineTo(0, 120); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 120, 11, 20, 0, 0, 6.283); ctx.fillStyle = '#F2F2EE'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-34, -120); ctx.lineTo(-34, 140); ctx.quadraticCurveTo(-34, 175, 0, 175); ctx.quadraticCurveTo(34, 175, 34, 140); ctx.lineTo(34, -120); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-31, 90); ctx.lineTo(-31, 140); ctx.quadraticCurveTo(-31, 172, 0, 172); ctx.quadraticCurveTo(31, 172, 31, 140); ctx.lineTo(31, 90); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill();
  roundRect(ctx, -42, -170, 84, 52, 8); shape(ctx, C.koraal, lighten(C.koraal, 0.25), 2); roundRect(ctx, -30, -40, 60, 70, 4); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.restore(); }
// streng: 'rna' = dunne enkele slier met korte basen aan één kant · 'dna' = twee strengen met sporten
function streng3(ctx, x, y, w, soort, o = {}) { const { a = 1, t = 0, p = 1 } = o; if (a <= 0.01 || p <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = w * p;
  const f = (u, ph) => y + Math.sin(u / 46 + ph + t * 0.8) * 14;
  if (soort === 'rna') { ctx.strokeStyle = '#B4A6E0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= L; u += 4) { const yy = y + Math.sin(u / 38 + t) * 18 + Math.sin(u / 17) * 4; u ? ctx.lineTo(x + u, yy) : ctx.moveTo(x + u, yy); } ctx.stroke();
    ctx.lineWidth = 3; for (let u = 10; u <= L; u += 22) { const yy = y + Math.sin(u / 38 + t) * 18 + Math.sin(u / 17) * 4; ctx.strokeStyle = BASE_KL['ATCG'[Math.floor(hash(u) * 4)]]; ctx.beginPath(); ctx.moveTo(x + u, yy); ctx.lineTo(x + u, yy - 16); ctx.stroke(); } }
  else { const y1 = u => f(u, 0) - 18, y2 = u => f(u, 0) + 18; ctx.lineWidth = 3; for (let u = 8; u <= L; u += 18) { ctx.strokeStyle = BASE_KL['ATCG'[Math.floor(hash(u + 7) * 4)]]; ctx.beginPath(); ctx.moveTo(x + u, y1(u)); ctx.lineTo(x + u, y2(u)); ctx.stroke(); }
    ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const g of [y1, y2]) { ctx.beginPath(); for (let u = 0; u <= L; u += 4) u ? ctx.lineTo(x + u, g(u)) : ctx.moveTo(x + u, g(u)); ctx.stroke(); } }
  ctx.restore(); }
// korte stukjes DNA (kopieën), n stuks in een stapel; aan 0..1 voor verschijnen
function stukjes3(ctx, x, y, n, o = {}) { const { a = 1, aan = 1, w = 90 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const al = clamp(aan * n - i, 0, 1); if (al <= 0) continue; const px = x + (i % 4) * (w + 18) + (Math.floor(i / 4) % 2) * 30, py = y + Math.floor(i / 4) * 34; ctx.save(); ctx.globalAlpha *= al;
    ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py - 7); ctx.lineTo(px + w, py - 7); ctx.moveTo(px, py + 7); ctx.lineTo(px + w, py + 7); ctx.stroke();
    ctx.lineWidth = 2.5; for (let u = 8; u < w; u += 14) { ctx.strokeStyle = BASE_KL['ATCG'[Math.floor(hash(i * 13 + u) * 4)]]; ctx.beginPath(); ctx.moveTo(px + u, py - 5); ctx.lineTo(px + u, py + 5); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
// leesmachine (sequencer) als kastje met een venstertje met tegels
function machine3(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, leest = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -90, 260, 170, 16); shape(ctx, '#3A4A66', C.line, 2); roundRect(ctx, -110, -70, 140, 80, 8); shape(ctx, '#121A26', null);
  for (let i = 0; i < 5; i++) { const al = clamp(leest * 6 - i, 0, 1); if (al > 0) tegel3(ctx, -102 + i * 26, -52, 'ACGTA'[(i + Math.floor(t * 2)) % 5], { a: al, w: 22, h: 30, px: 16 }); }
  roundRect(ctx, 50, -66, 60, 14, 6); shape(ctx, '#121A26', null); circ(ctx, 80, -10, 14, leest > 0.5 ? C.groen : '#5A6478'); ctx.restore(); }
// werkplek: bureau met twee schermen (sequenties en een boompje)
function bureau3(ctx, x, y, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const [sx, k] of [[x - 170, 0], [x + 170, 1]]) { ctx.fillStyle = '#5A6478'; ctx.fillRect(sx - 10, y - 50, 20, 50); ctx.fillRect(sx - 60, y - 8, 120, 8);
    roundRect(ctx, sx - 150, y - 240, 300, 190, 10); shape(ctx, '#2A3446', '#6A7488', 3); roundRect(ctx, sx - 138, y - 228, 276, 166, 6); shape(ctx, '#121A26', null);
    if (k === 0) for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) tegel3(ctx, sx - 126 + i * 28, y - 214 + r * 38, 'ACGTTGACA'[(i + r * 2) % 9], { w: 24, h: 30, px: 16, modus: (r === 2 && i === 5) ? 'goud' : 'kleur' });
    else boompje3(ctx, sx, y - 100, 1.05, 0, 1); }
  ctx.fillStyle = '#5E5A6A'; ctx.fillRect(x - 380, y, 760, 22); ctx.fillStyle = '#4A4656'; ctx.fillRect(x - 360, y + 22, 22, 150); ctx.fillRect(x + 338, y + 22, 22, 150); ctx.restore(); }
// rek met buisjes (de monsters van het lab)
function rek3(ctx, x, y, n = 6, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) buis3(ctx, x + i * 34, y, 0.22, 1);
  roundRect(ctx, x - 22, y + 4, n * 34 + 10, 26, 6); shape(ctx, '#4A5A78', C.line, 1.5); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - 32, y - 52, n * 34 + 30, 94, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } ctx.restore(); }

// ---------- herbemonsteren ----------
// de uitlijning als kolommen: 5 rijen (A B C E D), 10 getoonde variabele kolommen (plekken 1–10)
const REF3 = 'ACGTTGCAAC', MUT3 = 'GTACCATGGT';
const SITES3 = { A: [1, 2, 3], B: [1, 2, 3], C: [1, 4, 5, 6], E: [1, 4, 5, 7], D: [8, 9, 10] };
const ORD3 = ['A', 'B', 'C', 'E', 'D'];
function kolomLetters3(k, c) { return SITES3[k].includes(c + 1) ? MUT3[c] : REF3[c]; }
// cols = lijst kolomindices; o.w tegelbreedte; o.hl = set indices (positie) met gouden rand
function kolommen3(ctx, x, y, cols, o = {}) { const { a = 1, w = 34, h = 40, gap = 8, hl = [], namen = 1, n = cols.length } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ORD3.forEach((k, r) => { if (namen) mon3(ctx, x - 44, y + r * (h + 10) + h / 2, k, { r: 20 }); });
  cols.forEach((c, i) => { const al = clamp(n - i, 0, 1); if (al <= 0) return; ORD3.forEach((k, r) => { const mut = SITES3[k].includes(c + 1); tegel3(ctx, x + i * (w + gap), y + r * (h + 10), kolomLetters3(k, c), { a: al, w, h, px: 22, modus: mut ? 'goud' : 'grijs' }); });
    if (hl.includes(i)) { ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x + i * (w + gap) - 4, y - 6, w + 8, 5 * (h + 10) + 2, 8); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }
// lot = één kolom op een papiertje (5 vakjes)
function lot3(ctx, x, y, c, o = {}) { const { a = 1, s = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -24, -110, 48, 220, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ORD3.forEach((k, r) => { const mut = SITES3[k].includes(c + 1); roundRect(ctx, -16, -100 + r * 42, 32, 36, 5); shape(ctx, mut ? C.goud : '#C9CED6', null); text(ctx, kolomLetters3(k, c), 0, -75 + r * 42, fMeta(18), '#1A2740', 'center'); }); ctx.restore(); }
// bak met loten (doorsnede): kom met strookjes erin
function bak3(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 9; i++) { ctx.save(); ctx.translate(-110 + i * 27, -20 - (i % 3) * 8); ctx.rotate((hash(i * 5) - 0.5) * 0.5); roundRect(ctx, -10, -50, 20, 90, 4); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-170, -10); ctx.quadraticCurveTo(-160, 120, 0, 120); ctx.quadraticCurveTo(160, 120, 170, -10); ctx.closePath(); shape(ctx, '#4A5A78', C.line, 2.5);
  ctx.beginPath(); ctx.ellipse(0, -10, 170, 22, 0, 0, 6.283); shape(ctx, null, C.line, 2.5); ctx.restore(); }

// ---------- tijdlijn besmetting – klachten – test ----------
// d0 = dag van besmetting, dk = eerste klachten, dt = test; x0 = plek van dag 0, pd = px per dag
function tijdlijn3(ctx, x0, y, pd, ev, o = {}) { const { a = 1, pB = 1, pK = 1, pT = 1, lijn = 1, van = -6, tot = 6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.8 * lijn); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + van * pd, y); ctx.lineTo(x0 + tot * pd, y); ctx.stroke();
  if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; circ(ctx, x0 + ev.b * pd, y, 15, C.koraal, lighten(C.koraal, 0.3), 2); m3(ctx, 'besmet', x0 + ev.b * pd, y + 50, 1, C.grain, 'center', 22); ctx.restore(); }
  if (pK > 0.01) { ctx.save(); ctx.globalAlpha *= pK; const xk = x0 + ev.k * pd; ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= 60; u += 3) { const yy = y - 4 - Math.sin(u / 60 * 3 * 3.1416) * 12; u ? ctx.lineTo(xk - 30 + u, yy) : ctx.moveTo(xk - 30 + u, yy); } ctx.stroke(); m3(ctx, 'klachten', xk, y + 50, 1, C.grain, 'center', 22); ctx.restore(); }
  if (pT > 0.01) { ctx.save(); ctx.globalAlpha *= pT; const xt = x0 + ev.t * pd; circ(ctx, xt, y, 22, rgba(C.groen, 0.2), C.groen, 2.5); vink_(ctx, xt, y, 11, 1); m3(ctx, 'test', xt, y + 50, 1, C.grain, 'center', 22); ctx.restore(); }
  ctx.restore(); }

// ---------- pijlen, lijst, groepen, opleiding ----------
function boogPijl3(ctx, x1, y1, x2, y2, bend, col, a = 1, o = {}) { if (a <= 0.01) return; const { dash = false, lw = 4, p = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const B = u => [(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2];
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; if (dash) ctx.setLineDash([10, 9]); ctx.beginPath(); for (let i = 0; i <= 40 * p; i++) { const [px, py] = B(i / 40); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]);
  if (p > 0.97) { const [ax, ay] = B(0.97), an = Math.atan2(y2 - ay, x2 - ax); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 18 * Math.cos(an - 0.45), y2 - 18 * Math.sin(an - 0.45)); ctx.lineTo(x2 - 18 * Math.cos(an + 0.45), y2 - 18 * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// klembord met regels; vink[i] 0..1
function lijst3(ctx, x, y, regels, vink = [], a = 1, w = 560) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 110 + regels.length * 92;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, x + w / 2 - 70, y - 18, 140, 40, 8); shape(ctx, '#6A7488', null);
  regels.forEach((s, i) => { const yy = y + 100 + i * 92; roundRect(ctx, x + 36, yy - 34, 44, 44, 8); shape(ctx, null, '#6A7488', 2.5); if ((vink[i] || 0) > 0.01) vink_(ctx, x + 58, yy - 12, 16, vink[i], '#3E8E5E'); text(ctx, s, x + 104, yy, fTekst(38, 700), '#1A2740', 'left'); });
  ctx.restore(); }
// groep virussen uit de echte studie als blokjes (geen aantallen, geen plaats)
function groep3(ctx, x, y, col, o = {}) { const { a = 1, n = 12, s = 26, aan = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const al = clamp(aan * n - i, 0, 1); if (al <= 0) continue; const px = x + ((i % 4) - 1.5) * (s + 8) + (hash(i * 7) - 0.5) * 4, py = y + (Math.floor(i / 4) - 1) * (s + 8);
    ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, px - s / 2, py - s / 2, s, s, 6); shape(ctx, rgba(col, 0.55), col, 2); ctx.restore(); } ctx.restore(); }
function opl3(ctx, x, y, w, kop, naam, sub, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 170, 16); shape(ctx, rgba(col, 0.1), col, 2);
  m3(ctx, kop, x + 28, y + 46, 1, col, 'left', 26); text(ctx, naam, x + 28, y + 100, fTekst(40, 700), C.text, 'left'); text(ctx, sub, x + 28, y + 144, fTekst(32, 600), C.text2, 'left'); ctx.restore(); }
function werkIcoon3(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 70, 140, 140, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 36, y - 26, 72, 62); ctx.fillStyle = C.koraal; ctx.fillRect(x - 6, y - 50, 12, 34); ctx.fillRect(x - 17, y - 39, 34, 12); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.rect(x - 40, y - 16, 80, 54); ctx.moveTo(x - 48, y - 16); ctx.lineTo(x, y - 46); ctx.lineTo(x + 48, y - 16); ctx.stroke(); for (const k of [-22, 0, 22]) { ctx.beginPath(); ctx.moveTo(x + k, y - 4); ctx.lineTo(x + k, y + 38); ctx.stroke(); } }
  if (soort === 'bedrijf') { ctx.beginPath(); ctx.moveTo(x - 44, y + 38); ctx.lineTo(x - 44, y - 6); ctx.lineTo(x - 16, y - 24); ctx.lineTo(x - 16, y - 6); ctx.lineTo(x + 12, y - 24); ctx.lineTo(x + 12, y - 6); ctx.lineTo(x + 44, y - 26); ctx.lineTo(x + 44, y + 38); ctx.closePath(); ctx.stroke(); ctx.strokeRect(x + 24, y - 48, 12, 26); }
  ctx.restore(); }
