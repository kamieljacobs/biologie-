// Wat word jij? · Bio-informatica · film 3 · Stambomen uit DNA: een uitbraak volgen — eigen tekeningen (fase A, 25 okt 2026)
// Look Schema met cast (Sam, Dr. Kim outfit 'gewoon'). Geen zieke mensen: medewerkers als telpoppetjes, patiënten als bedden van bovenaf.
// Reeksobject 'scherm met code / sequenties' (scherm3, tegel3, rij3): zelf gemaakt volgens bi1/brief.md (teken_bi1.js bestond nog niet).

const ZORG = '#6F93C4';                 // zorgblauw: medewerkers als telpoppetjes
const BC3 = { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' };   // vaste basentinten van de DNA-reeks (dnalib.js)
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

// ---------- reeksobject: scherm met sequenties ----------
function scherm3(ctx, x, y, w, h, tab, o = {}, inhoud) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#121A26', C.line, 1);
  ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = '#0D1420'; ctx.fillRect(x, y, w, 52); ctx.restore();
  ctx.font = fMeta(24); ctx.letterSpacing = '2px'; const tw = ctx.measureText(tab).width + 36; ctx.letterSpacing = '0px';
  roundRect(ctx, x + 16, y + 10, tw, 42, 8); shape(ctx, '#121A26', null); ctx.save(); ctx.font = fMeta(24); ctx.letterSpacing = '2px'; ctx.fillStyle = C.text2; ctx.fillText(tab, x + 34, y + 39); ctx.restore();
  if (inhoud) { ctx.save(); ctx.beginPath(); ctx.rect(x + 2, y + 54, w - 4, h - 56); ctx.clip(); inhoud(); ctx.restore(); }
  ctx.restore(); }
// één lettertegel; modus 'kleur' (basentint) · 'grijs' (gelijk aan de rest) · 'goud' (afwijkende letter) · 'leeg'
function tegel3(ctx, x, y, L, o = {}) { const { a = 1, w = 40, h = 48, modus = 'kleur', px = 28, vraag = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  let fill = BC3[L] || '#3A4458', tc = (L === 'A' || L === 'T') ? '#1A2740' : '#F2F2EE';
  if (modus === 'grijs') { fill = '#33405A'; tc = '#9AA3B2'; } if (modus === 'goud') { fill = C.goud; tc = '#1A2740'; }
  roundRect(ctx, x, y, w, h, Math.min(8, w * 0.2)); shape(ctx, fill, lighten(fill, 0.22), 1);
  text(ctx, L, x + w / 2, y + h / 2 + px * 0.36, fMeta(px), tc, 'center');
  if (vraag > 0.01) { ctx.globalAlpha *= vraag; circ(ctx, x + w - 2, y + 2, 13, C.koraal); text(ctx, '?', x + w - 2, y + 11, fTekst(22, 800), '#121A26', 'center'); }
  ctx.restore(); }
function rij3(ctx, x, y, seq, o = {}) { const { a = 1, w = 40, gap = 6, h = 48, modus = 'kleur', goud = [], n = seq.length, px = 28, flikker = -1, fk = 0 } = o; if (a <= 0.01) return x;
  for (let i = 0; i < Math.min(n, seq.length); i++) { const al = clamp(n - i, 0, 1); let L = seq[i], md = goud.includes(i) ? 'goud' : modus; if (i === flikker && fk > 0.5) { L = { A: 'G', G: 'A', C: 'T', T: 'C' }[L]; md = 'goud'; }
    tegel3(ctx, x + i * (w + gap), y, L, { a: a * al, w, h, modus: md, px }); }
  return x + seq.length * (w + gap); }

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
// ziekenhuisbed van bovenaf, leeg opgemaakt (een patiënt = een bed; geen persoon in beeld)
function bed3(ctx, x, y, s = 1, o = {}) { const { a = 1, col = ZORG } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -62, -112, 124, 224, 14); shape(ctx, '#3A4A66', C.line, 2); roundRect(ctx, -52, -102, 104, 204, 10); shape(ctx, '#DDE3EA', null);
  roundRect(ctx, -40, -92, 80, 38, 12); shape(ctx, '#F2F2EE', '#C9CED6', 1.5); roundRect(ctx, -52, -40, 104, 142, 10); shape(ctx, rgba(col, 0.75), lighten(col, 0.2), 1.5);
  ctx.strokeStyle = rgba('#F2F2EE', 0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-52, -22); ctx.lineTo(52, -22); ctx.stroke(); ctx.restore(); }
// ziekenhuis als lijnicoon (zoals in Verloskunde), huisje voor 'buiten'
function zh3(ctx, x, y, s = 1, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, -150, 240, 210, 8); shape(ctx, rgba(col, 0.16), col, 4); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) if (!(r === 2 && (k === 1 || k === 2))) { roundRect(ctx, -96 + k * 52, -126 + r * 52, 30, 30, 3); shape(ctx, rgba(C.goud, 0.35), null); }
  roundRect(ctx, -24, 4, 48, 56, 4); shape(ctx, rgba(col, 0.45), null); ctx.fillStyle = C.koraal; ctx.fillRect(-12, -205, 24, 66); ctx.fillRect(-33, -184, 66, 24); ctx.restore(); }
function huis3(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(0, -140); ctx.lineTo(90, -60); ctx.lineTo(90, 60); ctx.lineTo(-90, 60); ctx.closePath(); shape(ctx, rgba(col, 0.18), col, 4);
  roundRect(ctx, -22, 0, 44, 60, 4); shape(ctx, rgba(col, 0.45), null); roundRect(ctx, 34, -30, 36, 36, 4); shape(ctx, rgba(C.goud, 0.5), null); ctx.restore(); }

// ---------- plattegrond van het bedachte voorbeeld (geen stadsnamen) ----------
// o.col {A:kleur}, o.hl {A:0..1}, o.dim {A:0..1}, o.mon (badges), o.extra(P) tekent er iets bij; tx/ty/sc = plaats
const PL3 = { A: [230, 560], C: [370, 560], E: [510, 470], B: [860, 430], D: [800, 790] };
function plattegrond3(ctx, o = {}) { const { a = 1, tx = 0, ty = 0, sc = 1, col = {}, hl = {}, dim = {}, mon = 1, namen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(tx, ty); ctx.scale(sc, sc);
  roundRect(ctx, 100, 210, 540, 440, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 2); naamBij(ctx, 'ziekenhuis 1', '', 370, 196, namen, 'center');
  roundRect(ctx, 128, 300, 484, 320, 14); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.6), 1.5); m3(ctx, 'afdeling', 150, 338, 1, C.grain, 'left', 26);
  roundRect(ctx, 700, 210, 340, 330, 18); shape(ctx, rgba(C.fill, 0.35), C.line, 2); naamBij(ctx, 'ziekenhuis 2', '', 870, 196, namen, 'center');
  ctx.save(); ctx.setLineDash([10, 8]); roundRect(ctx, 700, 580, 340, 260, 18); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.restore(); naamBij(ctx, 'buiten', 'de ziekenhuizen', 724, 622, namen, 'left');
  huis3(ctx, 960, 780, 0.42, 1);
  const d = k => 1 - 0.65 * (dim[k] || 0);
  bed3(ctx, PL3.E[0], PL3.E[1], 0.9, { a: d('E') });
  pop3(ctx, PL3.A[0], PL3.A[1], 120, ZORG, { a: d('A') }); pop3(ctx, PL3.C[0], PL3.C[1], 120, ZORG, { a: d('C') });
  pop3(ctx, PL3.B[0], PL3.B[1], 120, ZORG, { a: d('B') }); pop3(ctx, PL3.D[0], PL3.D[1], 120, ZORG, { a: d('D') });
  const B = { A: [PL3.A[0], 404], C: [PL3.C[0], 404], E: [PL3.E[0], 512], B: [PL3.B[0], 274], D: [PL3.D[0] + 76, 700] };
  for (const k of 'ABCDE') mon3(ctx, B[k][0], B[k][1], k, { a: mon * d(k), r: 28, col: col[k] || null, hl: hl[k] || 0 });
  if (o.extra) o.extra(B); ctx.restore(); return B; }

// ---------- tabel met verschillen ----------
const DIST3 = { 'A|B': 0, 'A|C': 5, 'A|E': 5, 'B|C': 5, 'B|E': 5, 'C|E': 2, 'A|D': 6, 'B|D': 6, 'C|D': 7, 'D|E': 7,
  'A-B|C': 5, 'A-B|E': 5, 'A-B|D': 6, 'C|D': 7, 'A-B|C-E': 5, 'C-E|D': 7 };
const dist3 = (p, q) => DIST3[p + '|' + q] != null ? DIST3[p + '|' + q] : DIST3[q + '|' + p];
// namen = rij- en kolomnamen; alleen de onderste driehoek; o.vul 0..1 (cellen verschijnen op volgorde), o.hl { 'A|B': [kleur, 0..1] }
function tabel3(ctx, x, y, namen, o = {}) { const { a = 1, c = 104, vul = 1, hl = {}, dimAlles = 0, px = 44 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = namen.length;
  for (let j = 0; j < n - 1; j++) mon3(ctx, x + j * c + c / 2, y - 40, namen[j], { r: 24 });
  for (let i = 1; i < n; i++) mon3(ctx, x - 50, y + (i - 1) * c + c / 2, namen[i], { r: 24 });
  let k = 0; const tot = n * (n - 1) / 2;
  for (let i = 1; i < n; i++) for (let j = 0; j < i; j++) { const cx = x + j * c, cy = y + (i - 1) * c; const key = namen[j] + '|' + namen[i], key2 = namen[i] + '|' + namen[j]; const h = hl[key] || hl[key2];
    const al = clamp(vul * tot - k, 0, 1); k++;
    roundRect(ctx, cx + 4, cy + 4, c - 8, c - 8, 10); shape(ctx, rgba(C.fill, 0.55), rgba(C.line, 0.5), 1);
    if (h && h[1] > 0.01) { ctx.save(); ctx.globalAlpha *= h[1]; roundRect(ctx, cx + 4, cy + 4, c - 8, c - 8, 10); shape(ctx, rgba(h[0], 0.28), h[0], 3.5); ctx.restore(); }
    if (al > 0.01) { const v = dist3(namen[j], namen[i]); text(ctx, String(v), cx + c / 2, cy + c / 2 + px * 0.36, fTekst(px, 800), C.text, 'center'); } }
  ctx.restore(); }

// ---------- de boom (van onder af, bladeren A B C E D) ----------
// g1 A-B · g2 C-E · g3 A-B met C-E · g4 D aan de wortel (0..1 groeien), steun 0..1 toont de getallen, wankel 0..1 = stippel + wiebel op g3
function boom3(ctx, x, y, w, h, o = {}) { const { a = 1, g1 = 1, g2 = 1, g3 = 1, g4 = 1, steun = 0, wankel = 0, t = 0, kleur = 1, lw = 5, r = 30, hl = {}, steunTxt = ['99 / 100', '± 85 / 100', '± 58 / 100'], hlSteun = [0, 0, 0], wiebel = 0, bladA = 1, monHl = {} } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ord = ['A', 'B', 'C', 'E', 'D'], X = {}; ord.forEach((k, i) => X[k] = x + i * w / 4); const top = y - r - 6;
  const wb = wiebel * Math.sin(t * 9) * 10, wk = wankel * Math.sin(t * 2.6) * 12;
  const H1 = top - h * 0.12, H2 = top - h * 0.3 + wb, H3 = top - h * 0.62 + wk, H4 = top - h * 0.9;
  const m1 = (X.A + X.B) / 2, m2 = (X.C + X.E) / 2, m3x = (m1 + m2) / 2, m4 = (m3x + X.D) / 2;
  const tak = (xa, ya, xb, yb, yt, p, dash, col) => { if (p <= 0.01) return; ctx.save(); ctx.strokeStyle = col || C.line; ctx.lineWidth = lw; ctx.lineCap = 'round'; if (dash) ctx.setLineDash([12, 12]);
    const pv = clamp(p / 0.6, 0, 1), ph = clamp((p - 0.6) / 0.4, 0, 1); ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xa, lerp(ya, yt, pv)); ctx.moveTo(xb, yb); ctx.lineTo(xb, lerp(yb, yt, pv)); ctx.stroke();
    if (ph > 0) { const xm = (xa + xb) / 2; ctx.beginPath(); ctx.moveTo(xm - (xm - xa) * ph, yt); ctx.lineTo(xm + (xb - xm) * ph, yt); ctx.stroke(); } ctx.restore(); };
  tak(X.A, top, X.B, top, H1, g1, false, hl.g1); tak(X.C, top, X.E, top, H2, g2, false, hl.g2);
  tak(m1, H1, m2, H2, H3, g3, wankel > 0.5, hl.g3); tak(m3x, H3, X.D, top, H4, g4, false, hl.g4);
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
    ctx.lineWidth = 3; for (let u = 10; u <= L; u += 22) { const yy = y + Math.sin(u / 38 + t) * 18 + Math.sin(u / 17) * 4; ctx.strokeStyle = BC3['ATCG'[Math.floor(hash(u) * 4)]]; ctx.beginPath(); ctx.moveTo(x + u, yy); ctx.lineTo(x + u, yy - 16); ctx.stroke(); } }
  else { const y1 = u => f(u, 0) - 18, y2 = u => f(u, 0) + 18; ctx.lineWidth = 3; for (let u = 8; u <= L; u += 18) { ctx.strokeStyle = BC3['ATCG'[Math.floor(hash(u + 7) * 4)]]; ctx.beginPath(); ctx.moveTo(x + u, y1(u)); ctx.lineTo(x + u, y2(u)); ctx.stroke(); }
    ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const g of [y1, y2]) { ctx.beginPath(); for (let u = 0; u <= L; u += 4) u ? ctx.lineTo(x + u, g(u)) : ctx.moveTo(x + u, g(u)); ctx.stroke(); } }
  ctx.restore(); }
// korte stukjes DNA (kopieën), n stuks in een stapel; aan 0..1 voor verschijnen
function stukjes3(ctx, x, y, n, o = {}) { const { a = 1, aan = 1, w = 90 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const al = clamp(aan * n - i, 0, 1); if (al <= 0) continue; const px = x + (i % 4) * (w + 18) + (Math.floor(i / 4) % 2) * 30, py = y + Math.floor(i / 4) * 34; ctx.save(); ctx.globalAlpha *= al;
    ctx.strokeStyle = C.paars; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py - 7); ctx.lineTo(px + w, py - 7); ctx.moveTo(px, py + 7); ctx.lineTo(px + w, py + 7); ctx.stroke();
    ctx.lineWidth = 2.5; for (let u = 8; u < w; u += 14) { ctx.strokeStyle = BC3['ATCG'[Math.floor(hash(i * 13 + u) * 4)]]; ctx.beginPath(); ctx.moveTo(px + u, py - 5); ctx.lineTo(px + u, py + 5); ctx.stroke(); } ctx.restore(); }
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
