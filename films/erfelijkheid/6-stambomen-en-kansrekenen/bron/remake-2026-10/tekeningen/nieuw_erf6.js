// Stambomen en kansrekenen · lichte remake 2026-10 · nieuwe tekeningen (kandidaat lib_bio na keuring)
// Afhankelijk van lib.js (C, W, H, text, metaText, roundRect, shape, rgba, naamBij, fTekst, fMeta, fTitel) en lib_cast.js (persoon).
//
// ===== stamboom(ctx, P, o) — kandidaat bibliotheekobject =====
// Recept (Kamiel 28 okt 2026: 'stamboom niet goed uitgelijnd' in de oude film rond 1:14):
//  1. Elke generatie ligt op één vaste hoogte: y = y0 + (gen - 1) * dy. Ingetrouwde partners staan op dezelfde hoogte als hun partner.
//  2. Partnerlijn: één horizontale lijn op de middenhoogte van de symbolen, van rand tot rand (niet door de symbolen heen).
//  3. Afstammingslijn: verticaal vanuit het midden van de partnerlijn naar de broer-zuslijn op y + dy * 0.5.
//  4. Broer-zuslijn: horizontaal op één hoogte, van het eerste tot het laatste kind (en altijd tot onder de afstammingslijn).
//  5. Kindlijn: verticaal van de broer-zuslijn naar de bovenkant van het kind. Kinderen van links naar rechts van oud naar jong.
//  6. Symbolen: vierkant = man, rondje = vrouw, ruit = geslacht onbekend (verwacht kind, gestippeld); ingevuld = heeft de eigenschap.
//  7. Romeinse cijfers links op de hoogte van elke generatie (Meta). Alle lijnen 3 px, #8FA0B5; geen schuine lijnen.
// Bekende fouten: kinderen op ongelijke hoogte, partnerlijn op een andere hoogte dan de symbolen, schuine of geknikte kindlijnen,
// afstammingslijn die niet op het midden van de partnerlijn staat, broer-zuslijn die niet tot onder de afstammingslijn loopt.
const SB = { lijn: '#8FA0B5', open: '#22314D', vol: '#D5DAE2', rand: '#D5DAE2' };
const ROMEINS = ['I', 'II', 'III', 'IV', 'V'];
function sbSymbool(ctx, x, y, r, sekse, ziek, o = {}) {
  const { a = 1, hl = 0, vraag = false, dimA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * dimA;
  const pad = () => { ctx.beginPath(); if (sekse === 'm') { roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 4); } else if (sekse === 'v') { ctx.arc(x, y, r, 0, 6.2832); } else { ctx.moveTo(x, y - r * 1.2); ctx.lineTo(x + r * 1.2, y); ctx.lineTo(x, y + r * 1.2); ctx.lineTo(x - r * 1.2, y); ctx.closePath(); } };
  pad(); ctx.fillStyle = ziek ? SB.vol : SB.open; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = SB.rand; if (vraag) ctx.setLineDash([8, 7]); ctx.stroke(); ctx.setLineDash([]);
  if (vraag) text(ctx, '?', x, y + r * 0.42, fTitel(r * 1.2), C.goud, 'center');
  if (hl > 0.01) { ctx.globalAlpha = a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); if (sekse === 'm') roundRect(ctx, x - r - 9, y - r - 9, 2 * r + 18, 2 * r + 18, 8); else ctx.arc(x, y, r + 10, 0, 6.2832); ctx.stroke(); }
  ctx.restore(); }
// P.personen: [{id, sekse, ziek, gen, x, ouders:[id,id]?, vraag?}] · P.paren: [[id,id], …] (ook zonder kinderen)
// o: {y0, dy, r, a, toon: {id: 0..1} (opbouw), hl: {id}, dim: {id: 0..1}, geno: {id: 'Aa'}, genoA, genoKl: {id: kleur}, nrs: bool, romeins: x | null, lijnA}
function stamboom(ctx, P, o = {}) {
  const { y0 = 220, dy = 210, r = 34, a = 1, toon = null, hl = {}, dim = {}, geno = {}, genoA = 1, genoKl = {}, romeins = 110, lijnA = 1, nrs = false, takDim = null } = o;
  if (a <= 0.01) return {}; const M = {}; P.personen.forEach(p => M[p.id] = p); const Y = g => y0 + (g - 1) * dy; const T = id => toon ? (toon[id] ?? 0) : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  const pos = {}; P.personen.forEach(p => pos[p.id] = [p.x, Y(p.gen)]);
  const lijn = (pts, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al * lijnA; ctx.strokeStyle = SB.lijn; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]); ctx.stroke(); ctx.restore(); };
  if (romeins != null) { const gens = [...new Set(P.personen.map(p => p.gen))].sort(); gens.forEach(g => { const al = Math.max(...P.personen.filter(p => p.gen === g).map(p => T(p.id))); if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, ROMEINS[g - 1], romeins, Y(g) + 12, fTitel(40), C.text2, 'center'); ctx.restore(); } }); }
  // paren: uit P.paren en uit de ouders van kinderen
  const paren = (P.paren || []).map(p => p.slice()); P.personen.forEach(p => { if (p.ouders && !paren.some(q => q.includes(p.ouders[0]) && q.includes(p.ouders[1]))) paren.push(p.ouders.slice()); });
  paren.forEach(([i, j]) => { const [xa, ya] = pos[i], [xb] = pos[j]; const L = Math.min(xa, xb), R = Math.max(xa, xb), al = Math.min(T(i), T(j)); const dA = Math.min(dim[i] ?? 1, dim[j] ?? 1);
    ctx.save(); ctx.globalAlpha *= dA; lijn([[L + r, ya], [R - r, ya]], al); ctx.restore();
    const kids = P.personen.filter(p => p.ouders && p.ouders.includes(i) && p.ouders.includes(j)); if (!kids.length) return;
    const mx = (L + R) / 2, by = ya + dy * 0.5, xs = kids.map(k => pos[k.id][0]); const kmin = Math.min(...xs, mx), kmax = Math.max(...xs, mx);
    const ka = Math.max(...kids.map(k => T(k.id))); const kd = Math.max(...kids.map(k => dim[k.id] ?? 1));
    ctx.save(); ctx.globalAlpha *= Math.min(dA, kd); lijn([[mx, ya], [mx, by]], Math.min(al, ka)); lijn([[kmin, by], [kmax, by]], Math.min(al, ka)); ctx.restore();
    kids.forEach(k => { const [kx, ky] = pos[k.id]; ctx.save(); ctx.globalAlpha *= (dim[k.id] ?? 1); lijn([[kx, by], [kx, ky - r * (k.sekse ? 1 : 1.2)]], T(k.id)); ctx.restore(); }); });
  P.personen.forEach(p => { const [x, y] = pos[p.id]; sbSymbool(ctx, x, y, r, p.sekse, p.ziek, { a: T(p.id), hl: hl[p.id] || 0, vraag: p.vraag, dimA: dim[p.id] ?? 1 });
    if (nrs && p.nr) { ctx.save(); ctx.globalAlpha *= T(p.id) * (dim[p.id] ?? 1); metaText(ctx, String(p.nr), x - r - 8, y + r + 30, C.text2, 'right', 26); ctx.restore(); }
    if (geno[p.id]) { ctx.save(); ctx.globalAlpha *= T(p.id) * genoA * (dim[p.id] ?? 1); text(ctx, geno[p.id], x, y + r + 50, fTekst(38, 700), genoKl[p.id] || C.text, 'center'); ctx.restore(); } });
  ctx.restore(); return { pos, Y, r }; }

// ===== stambomen van deze film (vaste x, zodat elke generatie op één lijn ligt) =====
// Familie met taaislijmziekte (zelfde opbouw als oefening 'puzzel-sanne-tom' 1–6; de ouders van de partner zijn weggelaten, zie twijfel T2)
const SB_CF = { personen: [
  { id: 'v1', nr: 1, sekse: 'm', ziek: false, gen: 1, x: 760 }, { id: 'm1', nr: 2, sekse: 'v', ziek: false, gen: 1, x: 1000 },
  { id: 'b1', nr: 3, sekse: 'm', ziek: false, gen: 2, x: 620, ouders: ['v1', 'm1'] }, { id: 'b2', nr: 4, sekse: 'm', ziek: true, gen: 2, x: 880, ouders: ['v1', 'm1'] },
  { id: 'zij', nr: 5, sekse: 'v', ziek: false, gen: 2, x: 1140, ouders: ['v1', 'm1'] }, { id: 'par', nr: 6, sekse: 'm', ziek: false, gen: 2, x: 1400 },
  { id: 'kind', nr: '', sekse: null, ziek: false, gen: 3, x: 1270, ouders: ['zij', 'par'], vraag: true } ], paren: [['zij', 'par']] };
// Dominant patroon (ziekte van Huntington): rechtertak = de zoon die toevallig a kreeg; daar verdwijnt het allel
const SB_HD = { personen: [
  { id: 'o', sekse: 'm', ziek: true, gen: 1, x: 760 }, { id: 'om', sekse: 'v', ziek: false, gen: 1, x: 1000 },
  { id: 'd', sekse: 'v', ziek: true, gen: 2, x: 520, ouders: ['o', 'om'] }, { id: 'dp', sekse: 'm', ziek: false, gen: 2, x: 340 },
  { id: 'z2', sekse: 'm', ziek: false, gen: 2, x: 760, ouders: ['o', 'om'] },
  { id: 'z', sekse: 'm', ziek: false, gen: 2, x: 1180, ouders: ['o', 'om'] }, { id: 'zp', sekse: 'v', ziek: false, gen: 2, x: 1440 },
  { id: 'dk1', sekse: 'm', ziek: true, gen: 3, x: 300, ouders: ['dp', 'd'] }, { id: 'dk2', sekse: 'v', ziek: false, gen: 3, x: 560, ouders: ['dp', 'd'] },
  { id: 'zk1', sekse: 'v', ziek: false, gen: 3, x: 1180, ouders: ['z', 'zp'] }, { id: 'zk2', sekse: 'm', ziek: false, gen: 3, x: 1440, ouders: ['z', 'zp'] } ],
  paren: [['dp', 'd'], ['z', 'zp']] };
// kleine stambomen voor stap 1 en 2 (mini, eigen x)
function miniStamboom(ctx, x, y, s, ouders, kind, o = {}) { // ouders: [ziekV, ziekM]; kind: {sekse, ziek}
  const P = { personen: [ { id: 'v', sekse: 'm', ziek: ouders[0], gen: 1, x: x - 90 * s }, { id: 'm', sekse: 'v', ziek: ouders[1], gen: 1, x: x + 90 * s },
    { id: 'k', sekse: kind.sekse, ziek: kind.ziek, gen: 2, x: x, ouders: ['v', 'm'] } ] };
  return stamboom(ctx, P, Object.assign({ y0: y, dy: 150 * s, r: 30 * s, romeins: null }, o)); }

// ===== simulatie: 300 kinderen van twee dragers (echte trekkingen, vaste seed) =====
function _mb(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let _KIDS = null;
function kinderen300(seed = 11) { if (_KIDS) return _KIDS; const r = _mb(seed), L = []; for (let i = 0; i < 300; i++) { const v = r() < 0.5 ? 'A' : 'a', m = r() < 0.5 ? 'A' : 'a'; L.push({ v, m, g: (v === 'A' && m === 'A') ? 'AA' : (v === 'a' && m === 'a') ? 'aa' : 'Aa' }); }
  const n = { AA: 0, Aa: 0, aa: 0 }; L.forEach(k => n[k.g]++); _KIDS = { L, n }; return _KIDS; }
// fase: 0..1 opbouw (aantal getrokken), weg: 0..1 aa vervaagt, sorteer: 0..1 gezonde kinderen schuiven in twee groepen
function simRaster(ctx, x0, y0, o = {}) { const { fase = 1, weg = 0, sorteer = 0, a = 1, cel = 34, kol = 25 } = o; if (a <= 0.01) return; const K = kinderen300(); ctx.save(); ctx.globalAlpha *= a;
  const gezond = K.L.map((k, i) => [k, i]).filter(([k]) => k.g !== 'aa'); const AA = gezond.filter(([k]) => k.g === 'AA'), Aa = gezond.filter(([k]) => k.g === 'Aa');
  const doel = {}; AA.forEach(([, i], j) => doel[i] = [x0 + (j % 10) * cel, y0 + Math.floor(j / 10) * cel]); Aa.forEach(([, i], j) => doel[i] = [x0 + 420 + (j % 15) * cel, y0 + Math.floor(j / 15) * cel]);
  const nz = Math.floor(fase * 300 + 0.001); const e = sorteer < 0.5 ? 2 * sorteer * sorteer : 1 - Math.pow(-2 * sorteer + 2, 2) / 2;
  K.L.forEach((k, i) => { if (i >= nz) return; let x = x0 + (i % kol) * cel, y = y0 + Math.floor(i / kol) * cel; let al = 1;
    if (k.g === 'aa') { al = 1 - weg; } else if (sorteer > 0) { x = x + (doel[i][0] - x) * e; y = y + (doel[i][1] - y) * e; } if (al <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= al; const rr = cel * 0.36; ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.2832);
    if (k.g === 'aa') { ctx.fillStyle = SB.vol; ctx.fill(); } else if (k.g === 'Aa') { ctx.fillStyle = SB.open; ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } else { ctx.fillStyle = SB.open; ctx.fill(); ctx.strokeStyle = SB.rand; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore(); });
  ctx.restore(); return K; }
function simLegenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const items = [['AA', 'gezond', 'AA'], ['Aa', 'gezond · drager', 'Aa'], ['aa', 'ziek', 'aa']];
  items.forEach(([g, s, k], i) => { const yy = y + i * 64; ctx.beginPath(); ctx.arc(x, yy, 13, 0, 6.2832); if (k === 'aa') { ctx.fillStyle = SB.vol; ctx.fill(); } else if (k === 'Aa') { ctx.fillStyle = SB.open; ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } else { ctx.fillStyle = SB.open; ctx.fill(); ctx.strokeStyle = SB.rand; ctx.lineWidth = 2; ctx.stroke(); }
    text(ctx, g, x + 34, yy + 13, fTekst(38, 700), C.text, 'left'); metaText(ctx, s, x + 110, yy + 10, C.grain, 'left', 26); }); ctx.restore(); }

// ===== oppervlaktemodel (productregel): 4 × 4, een kwart keer een kwart =====
function oppModel(ctx, x, y, s, o = {}) { const { a = 1, kol = 1, rij = 1, kruis = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c = s / 4;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { roundRect(ctx, x + j * c + 3, y + i * c + 3, c - 6, c - 6, 6); const inK = j === 0, inR = i === 0;
    let f = SB.open; if (inK && kol > 0.5) f = rgba(C.teal, 0.35); if (inR && rij > 0.5) f = rgba(C.oker, 0.35); if (inK && inR && kruis > 0.5) f = rgba(C.goud, 0.9); shape(ctx, f, C.line, 1.5); }
  metaText(ctx, '1e kind ziek: ¼', x + c / 2, y - 22, C.teal, 'left', 26); ctx.save(); ctx.translate(x - 22, y + s); ctx.rotate(-Math.PI / 2); metaText(ctx, '2e kind ziek: ¼', 0, 0, C.oker, 'left', 26); ctx.restore();
  ctx.restore(); }
// ===== kansbalk (somregel) =====
function kansBalk(ctx, x, y, w, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = [['AA', 0.25], ['Aa', 0.5], ['aa', 0.25]]; let xx = x;
  d.forEach(([g, f], i) => { const ww = w * f; roundRect(ctx, xx + 3, y, ww - 6, 90, 10); const gz = g !== 'aa'; shape(ctx, gz && hl > 0.5 ? rgba(C.groen, 0.35) : (g === 'aa' ? rgba(SB.vol, 0.85) : SB.open), gz && hl > 0.5 ? C.groen : C.line, 2);
    text(ctx, g, xx + ww / 2, y + 58, fTekst(40, 700), g === 'aa' ? C.bgSchema : C.text, 'center'); text(ctx, g === 'Aa' ? '½' : '¼', xx + ww / 2, y + 140, fTekst(40, 700), C.text2, 'center'); xx += ww; });
  ctx.restore(); }
// ===== kansboom voor het kind van de vrouw en haar partner =====
function kansBoom(ctx, x, y, o = {}) { const { a = 1, st = 3, som = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const knoop = (xx, yy, s, sub, kl, al = 1) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.font = fTekst(38, 700); const w = Math.max(250, ctx.measureText(s).width + 50); roundRect(ctx, xx - w / 2, yy - 50, w, 100, 14); shape(ctx, rgba(C.bgSchema, 0.96), kl, 2.5); text(ctx, s, xx, yy - 2, fTekst(38, 700), C.text, 'center'); if (sub) metaText(ctx, sub, xx, yy + 34, C.grain, 'center', 24); ctx.restore(); };
  const tak = (x1, y1, x2, y2, k, al = 1, kl = C.line) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); text(ctx, k, (x1 + x2) / 2 + 18, (y1 + y2) / 2 - 10, fTekst(40, 700), kl === C.line ? C.text : kl, 'left'); ctx.restore(); };
  const s1 = st >= 1 ? 1 : 0, s2 = st >= 2 ? 1 : 0, s3 = st >= 3 ? 1 : 0;
  knoop(x, y, 'zij is gezond', null, C.line);
  tak(x + 130, y, x + 380, y - 130, '⅔', s1, C.goud); knoop(x + 520, y - 130, 'drager · Aa', null, C.goud, s1);
  tak(x + 130, y, x + 380, y + 130, '⅓', s1 * 0.5); ctx.save(); ctx.globalAlpha *= 0.5; knoop(x + 520, y + 130, 'geen drager · AA', 'kind niet ziek', C.line, s1); ctx.restore();
  tak(x + 650, y - 130, x + 860, y - 130, '½', s2, C.goud); knoop(x + 1000, y - 130, 'zij geeft a', null, C.goud, s2);
  tak(x + 1130, y - 130, x + 1300, y - 130, '½', s3, C.goud); knoop(x + 1410, y - 130, 'partner geeft a', 'kind aa · ziek', C.goud, s3);
  if (som > 0.01) { ctx.save(); ctx.globalAlpha *= som; text(ctx, '⅔ × ½ × ½ = ⅙', x + 1000, y + 150, fTitel(64), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }

// ===== UI-hulpjes voor de keyframes (zoals de speler ze toont) =====
function vraagKaartKF(ctx, vraag, opties, o = {}) { const { fr = 0.6 } = o; bg(ctx, 'schema'); text(ctx, 'Wat denk je?', 160, 230, fTitel(72), C.text, 'left'); ctx.font = fTekst(48, 600); ctx.fillStyle = C.text; wrap(ctx, vraag, 160, 320, 1600, 62);
  opties.forEach((s, i) => { const y = 470 + i * 130; roundRect(ctx, 160, y, 1600, 104, 14); shape(ctx, '#2A3A58', C.line, 1.5); text(ctx, String.fromCharCode(97 + i), 210, y + 66, fTekst(44, 700), C.goud, 'center'); text(ctx, s, 270, y + 66, fTekst(42, 500), C.text, 'left'); });
  ctx.fillStyle = C.goud; ctx.fillRect(160, 880, 1600 * fr, 4); }
function hoofdstukKF(ctx, nr, titel, vraag) { bg(ctx, 'schema'); metaText(ctx, 'hoofdstuk ' + nr, 160, 400, C.goud, 'left', 30); text(ctx, titel, 160, 500, fTitel(84), C.text, 'left'); text(ctx, vraag, 160, 580, fTekst(44, 500), C.text2, 'left'); }
function stapKop(ctx, s, sub) { metaText(ctx, s, 160, 120, C.goud, 'left', 30); if (sub) text(ctx, sub, 160, 180, fTekst(48, 700), C.text, 'left'); }

// ===== spreekkamer (overgenomen uit Wat word jij? · Bio-informatica 2, scenes.js r. 2491, zonder kindertekening) =====
function spreekkamerE6(ctx, o = {}) { const { a = 1, x0 = 330, x1 = 1130, top = 640, map = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 800); ctx.lineTo(W - 60, 800); ctx.stroke();
  roundRect(ctx, x0, top, x1 - x0, 18, 6); shape(ctx, '#5A6A84', '#AFC0D0', 2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + 30, top + 18); ctx.lineTo(x0 + 30, 800); ctx.moveTo(x1 - 30, top + 18); ctx.lineTo(x1 - 30, 800); ctx.stroke();
  if (map > 0.01) { ctx.save(); ctx.globalAlpha *= map; ctx.translate(x1 - 230, top - 8); ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(90, 0); ctx.lineTo(110, -34); ctx.lineTo(-70, -34); ctx.closePath(); shape(ctx, C.oker, lighten(C.oker, 0.3), 1.5); ctx.restore(); }
  ctx.restore(); }
// whiteboard aan de wand waarop de klinisch geneticus de stamboom tekent
function wandbord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#24344F', '#AFC0D0', 3); ctx.restore(); }
