// Wat word jij? · Landbouw 3 · Fokken: selecteren, inteelt en de fokwaarde — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Yasmin, Opa Henk, Veehouder Gerrit, Bilal; inseminator = figurant); Micro voor allelen, merkers en chromosomen.
// Decor 'stal' alleen onder scènes die echt in de stal spelen (cold open, H3-opening, tabletscène H4, recap); de rest op navy.
// Kleuren: paars = DNA/erfelijkheid, oker = voer en omgeving, koraal = 'let op' (recessief allel, mislukte dracht), goud = focus/keuze.
// Rode draad: het keuzebord JOUW STAMBOOM (jij = de fokker) groeit per hoofdstuk mee: leeg → moeders + KI-vader → topkoe →
// stier met fokwaarde → kalf met DNA-test → stamboom met één ster (inteelt) → veel verschillende sterren → vier kaartjes.

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6, dy = 0, grond = null) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, -dy, W, H); if (dy > 0 && grond) { ctx.fillStyle = grond; ctx.fillRect(0, H - dy - 2, W, dy + 2); } ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860; // voetlijn op het decor (± 80 % van de hoogte)

// ---------- hulpjes (zelfde als film 2) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function vereenvoudigd(ctx, a = 1) { metaA(ctx, 'VEREENVOUDIGD', 1840, 90, a, C.grain, 'right', 26); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function gras(ctx, y = 850) { ctx.fillStyle = rgba('#2F4A3A', 0.55); ctx.fillRect(0, y, W, 30); }
function vloer(ctx, y = 840) { ctx.fillStyle = rgba('#2B3442', 0.8); ctx.fillRect(0, y, W, 30); }

// dubbeldoelkoe iets duidelijker anders dan de Holstein (Kamiel 26 okt 2026, d2): korter, gespierder (dikkere poten), kleiner uier
// dubbeldoelkoe en stier: eigen silhouet in teken_lb3.js (KOE_RAS, beeldreview MOET 5/6)

// klein Amerikaans vlaggetje (zoals keyframe d2)
function vlagVS(ctx, x, y, w, a = 1) { const h = w * 0.6; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#F2F2EE' : '#C8463C'; ctx.fillRect(x, y + i * h / 7, w, h / 7 + 0.5); } ctx.fillStyle = '#2E3A6E'; ctx.fillRect(x, y, w * 0.42, h * 0.55); ctx.restore(); }
// kroontje (topkoe)
function kroon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-26, 14); ctx.lineTo(-30, -14); ctx.lineTo(-14, 0); ctx.lineTo(0, -20); ctx.lineTo(14, 0); ctx.lineTo(30, -14); ctx.lineTo(26, 14); ctx.closePath(); shape(ctx, C.goud, _lt3(C.goud, 0.35), 2); ctx.restore(); }
// stippellijn
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
// staaf die van onder naar boven groeit
function groeiStaaf(ctx, x, yb, w, h, col, u = 1, a = 1, dash = false) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = h * u; roundRect(ctx, x - w / 2, yb - hh, w, hh, 10); if (dash) ctx.setLineDash([10, 7]); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }
// terugverwijskaartje naar een andere film
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 62, y + 24, C.text2, 'left', 14); text(ctx, s2, x + 62, y + 46, fTekst(24, 700), C.text, 'left'); ctx.restore(); }
// erwtenbloem (Mendel): vijf kroonbladen
function erwtBloem(ctx, x, y, r, col) { for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.55, y + Math.sin(an) * r * 0.55, r * 0.55, r * 0.38, an, 0, 6.283); shape(ctx, col, _dk3(col, 0.25), 1.5); } circ(ctx, x, y, r * 0.22, '#E8C860'); }
function mendelKaart(ctx, x, y, a = 1, kruisA = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 440, 250, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 2);
  metaText(ctx, 'ERWTEN VAN MENDEL', x + 30, y + 44, C.text2, 'left', 20); erwtBloem(ctx, x + 120, y + 130, 46, '#9A6AC0'); erwtBloem(ctx, x + 290, y + 130, 46, '#EEE8DE');
  text(ctx, 'één gen: paars óf wit', x + 220, y + 222, fTekst(30, 700), C.text, 'center'); kruis(ctx, x + 400, y + 50, 22, kruisA); ctx.restore(); }

// ---------- het keuzebord JOUW STAMBOOM (groeit per hoofdstuk mee) ----------
// st: vader 'ki'|'stier'|'ster' (+ vA), moeders 0..3 (float = invullen), top 0..1 (kroon), kalf 0..1 (rij met streepjescode), fw 0..1 (fokwaarde bekend),
//     gen 0..1 (rij 'generaties' met sterren), divers 0..1 (verschillende stieren), glow ('m'|'v'|'k'|'g') = rij oplichten
function stamBord(ctx, x, y, s = 1, st = {}, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 370, rows = [['VADER', 'v'], ['MOEDERS', 'm']]; if ((st.kalf || 0) > 0.01) rows.push(['KALF · DNA-TEST', 'k']); if ((st.gen || 0) > 0.01) rows.push([st.divers > 0.5 ? 'STEEDS ANDERE VADERS' : 'STEEDS DEZELFDE VADER', 'g']);
  const h = 120 + rows.length * 112 - 6; roundRect(ctx, 0, 0, w, h, 18); shape(ctx, rgba('#0D1420', 0.86), rgba(C.goud, 0.8), 2.5);
  text(ctx, 'JOUW STAMBOOM', 28, 52, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', 28, 86, C.text2, 'left', 20);
  const vw = 76, gap = 14, slot = (bx, by, ww, vol, rand) => { roundRect(ctx, bx, by, ww, 58, 10); if (!vol) { ctx.setLineDash([7, 6]); shape(ctx, rgba(C.fill, 0.4), rgba(C.line, 0.8), 2); ctx.setLineDash([]); } else shape(ctx, rgba(C.fill, 0.55), rand || C.goud, 2.5); };
  let yy = 120; for (const [naam, k] of rows) { const ra = k === 'k' ? clamp(st.kalf, 0, 1) : k === 'g' ? clamp(st.gen, 0, 1) : 1; ctx.save(); ctx.globalAlpha *= ra;
    const gl = st.glow === k ? 0.5 + 0.5 * Math.sin((st.t || 0) * 6) : 0; if (gl > 0) { roundRect(ctx, 16, yy + 2, w - 32, 100, 12); ctx.fillStyle = rgba(C.goud, 0.12 + 0.12 * gl); ctx.fill(); }
    metaText(ctx, naam, 28, yy + 22, C.text2, 'left', 18); const by = yy + 34;
    if (k === 'v') { const v = st.vader, va = st.vA == null ? 1 : st.vA; slot(28, by, vw, false); if (v && va > 0.01) { ctx.save(); ctx.globalAlpha *= va; slot(28, by, vw, true);
        if (v === 'ki') rietje(ctx, 66, by + 29, 0.42, 1, -0.5, C.teal); else if (v === 'stier') { stierIcoon(ctx, 64, by + 50, 40, '#D8DEE6', 1); } else ster(ctx, 66, by + 29, 20);
        if (v === 'stier' && st.fw != null) { const f = clamp(st.fw, 0, 1); roundRect(ctx, 120, by + 6, 210, 46, 10); shape(ctx, f > 0.5 ? rgba(C.goud, 0.2) : rgba(C.fill, 0.5), f > 0.5 ? C.goud : C.line, 2); text(ctx, f > 0.5 ? 'fokwaarde ✓' : 'fokwaarde ?', 225, by + 38, fTekst(26, 700), f > 0.5 ? C.goud : C.text2, 'center'); }
        ctx.restore(); } }
    if (k === 'm') for (let i = 0; i < 3; i++) { const bx = 28 + i * (vw + gap), f = clamp((st.moeders || 0) - i, 0, 1); slot(bx, by, vw, false); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; slot(bx, by, vw, true); koeIcoon(ctx, bx + 36, by + 50, 40, '#D8DEE6', 1, { bont: 2 + i }); ctx.restore(); }
      if (i === 0 && (st.top || 0) > 0.01) kroon(ctx, bx + 38, by - 4, 0.62, st.top); }
    if (k === 'k') { slot(28, by, 300, true, C.paars); koeIcoon(ctx, 70, by + 50, 34, '#D8DEE6', 1, { bont: 3 }); roundRect(ctx, 120, by + 10, 190, 38, 4); shape(ctx, '#F2EEE4', null); streepjescode(ctx, 128, by + 14, 174, 30, 7); }
    if (k === 'g') { const kl = [C.goud, C.teal, C.koraal, C.groen, '#9CCBE3', C.paars]; for (let i = 0; i < 3; i++) { const bx = 28 + i * (vw + gap); slot(bx, by, vw, true, rgba(C.line, 0.9)); const col = st.divers > 0.01 ? (i === 0 ? C.goud : kl[(i * 2 + 1) % kl.length]) : C.goud; ster(ctx, bx + 38, by + 29, 20, col); } }
    ctx.restore(); yy += 112; }
  ctx.restore(); }
const BORD_HOOG = (n) => 120 + n * 112 - 6;

// ---------- weegschaal (fokdoel) ----------
function weegschaalLb3(ctx, x, y, kant, a, links, rechts) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = kant * 0.16, L = 340;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x - 70, y + 250); ctx.lineTo(x + 70, y + 250); ctx.closePath(); ctx.fill(); roundRect(ctx, x - 140, y + 244, 280, 22, 8); shape(ctx, '#4A5468', null);
  // kant < 0: links zwaarder (links omlaag); kant > 0: rechts zwaarder
  const lx = x - Math.cos(an) * L, ly = y - Math.sin(an) * L, rx = x + Math.cos(an) * L, ry = y + Math.sin(an) * L;
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke(); circ(ctx, x, y, 14, C.goud);
  const pan = (px, py, lab) => { ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 110, py + 110); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 112, 140, 22, 0, 0, Math.PI); shape(ctx, '#8FA0B5', null); lab(px, py + 90); };
  pan(lx, ly, links); pan(rx, ry, rechts); ctx.restore(); }

// ---------- tablet met paringsprogramma, stap voor stap ----------
function tabletLb3(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 26); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, x + 22, y + 22, w - 44, h - 44, 10); shape(ctx, '#0F1622', null);
  metaText(ctx, 'PARINGSPROGRAMMA: TE VEEL FAMILIE → UIT', x + 46, y + 70, C.text2, 'left', 18);
  const kw = (w - 44 - 60) / 2, kh = h - 44 - 150, ky = y + 92, k1 = o.k1 || 0, k2 = o.k2 || 0;
  stierKaart(ctx, x + 44, ky, kw, kh, { donker: 1, code: 11, rand: k1 > 0.5 ? C.koraal : C.line }); text(ctx, 'MELK ↑↑', x + 44 + kw / 2, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaA(ctx, 'FAMILIE VAN DEZE KOE', x + 44 + kw / 2, ky + kh * 0.88, k1, C.koraal, 'center', 16);
  stierKaart(ctx, x + 44 + kw + 16, ky, kw, kh, { donker: 1, code: 23, rand: k2 > 0.5 ? C.goud : C.line }); text(ctx, 'MELK ↑', x + 60 + kw * 1.5, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaA(ctx, 'GEEN FAMILIE', x + 60 + kw * 1.5, ky + kh * 0.88, k2, C.goud, 'center', 16);
  const sp = o.streep || 0; if (sp > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 54, ky + kh - 14); ctx.lineTo(lerp(x + 54, x + 34 + kw, sp), lerp(ky + kh - 14, ky + 14, sp)); ctx.stroke(); }
  if ((o.kies || 0) > 0.01) vink_(ctx, x + 60 + kw * 1.5 + kw * 0.36, ky + 34, 18, o.kies, C.goud);
  metaA(ctx, 'KALF: MINDER VAAK TWEE DEZELFDE ALLELEN', x + w / 2, y + h - 52, o.reden || 0, C.goud, 'center', 18);
  ctx.restore(); }

// ---------- stamboom (H4): coördinaten zoals keyframe d8, 60 px omlaag ----------
const SB = (() => { const p = (x, y) => [x, 270 + (y - 170) * 0.92]; return { r: 34, S: p(760, 170), zA: p(520, 340), zAp: p(360, 340), dB: p(1000, 340), dBp: p(1160, 340), kA: p(440, 510), kAp: p(250, 510), kB: p(1080, 510), kBp: p(1250, 510), kalf: p(760, 690), dr: p(250, 690) }; })();
function _sbPaar(ctx, a, b, col, lw, al) { const r = SB.r; lijn(ctx, [[a[0] + (a[0] < b[0] ? r : -r), a[1]], [b[0] + (a[0] < b[0] ? -r : r), b[1]]], col, lw, al); }
function _sbKind(ctx, a, b, c, col, lw, al) { const mx = (a[0] + b[0]) / 2; lijn(ctx, [[mx, a[1]], [mx, a[1] + 70], [c[0], a[1] + 70], [c[0], c[1] - SB.r]], col, lw, al); }
// u: s = topstier, z = zoon/dochter, p = partners, k = kleinkinderen, kp = paar kleinkinderen + kalf, dr = drager, koraal = kalf koraal
function stamboom(ctx, u, t = 0) { const { r, S, zA, zAp, dB, dBp, kA, kAp, kB, kBp, kalf, dr } = SB, G = C.goud, L = C.line;
  const z = u.z || 0, p = u.p || 0, k = u.k || 0, kp = u.kp || 0;
  if (z > 0.01) { lijn(ctx, [[S[0], S[1] + r], [S[0], S[1] + 70], [zA[0], S[1] + 70], [zA[0], zA[1] - r]], G, 6, z); lijn(ctx, [[S[0], S[1] + 70], [dB[0], S[1] + 70], [dB[0], dB[1] - r]], G, 6, z); }
  _sbPaar(ctx, zAp, zA, L, 3, p); _sbPaar(ctx, dB, dBp, L, 3, p);
  if (k > 0.01) { _sbKind(ctx, zAp, zA, kA, G, 6, k); _sbKind(ctx, dB, dBp, kB, G, 6, k); _sbPaar(ctx, kAp, kA, L, 3, (u.dr || 0)); }
  if (kp > 0.01) { _sbPaar(ctx, kA, kB, G, 4, kp); _sbKind(ctx, kA, kB, kalf, G, 6, kp); }
  if ((u.dr || 0) > 0.01) _sbKind(ctx, kAp, kA, dr, L, 3, u.dr);
  knoop(ctx, ...S, r + 6, true, { rand: G, lw: 4, a: u.s }); ster(ctx, S[0], S[1], 24, G, u.s); naamBij(ctx, 'topstier', 'JOUW KALF VAN TOEN', S[0] + 52, S[1] + 10, u.s, 'left', G);
  knoop(ctx, ...zA, r, true, { rand: G, a: z }); knoop(ctx, ...dB, r, false, { rand: G, a: z }); knoop(ctx, ...zAp, r, false, { a: p }); knoop(ctx, ...dBp, r, true, { a: p });
  metaA(ctx, 'VADERKANT', 300, S[1] + 76, p, C.text2, 'left', 20); metaA(ctx, 'MOEDERKANT', 1180, S[1] + 76, p, C.text2, 'left', 20);
  knoop(ctx, ...kA, r, true, { rand: G, a: k }); knoop(ctx, ...kB, r, false, { rand: G, a: k }); knoop(ctx, ...kAp, r, false, { a: (u.dr || 0) });
  naamBij(ctx, 'kleinzoon', '', kA[0] + 10, kA[1] + 76, u.kl || 0, 'center'); naamBij(ctx, 'kleindochter', '', kB[0], kB[1] + 76, u.kl || 0, 'center');
  const ko = u.koraal || 0; knoop(ctx, ...kalf, r, false, { vul: rgba(C.koraal, 0.35 * ko), rand: ko > 0.5 ? C.koraal : C.text, lw: ko > 0.5 ? 4 : 3, a: kp }); naamBij(ctx, 'kalf', '', kalf[0], kalf[1] + 80, kp, 'center', ko > 0.5 ? C.koraal : C.text);
  knoop(ctx, ...dr, r, false, { vul: rgba(C.koraal, 0.12), rand: C.text, a: u.dr || 0 }); naamBij(ctx, 'drager', '', dr[0], dr[1] + 80, u.dr || 0, 'center'); }
function bordKader(ctx, a = 1, kopA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 130, 190, 1210, 675, 22); shape(ctx, rgba('#0D1420', 0.55), rgba(C.goud, 0.8), 2.5);
  ctx.globalAlpha *= kopA; text(ctx, 'JOUW STAMBOOM', 160, 240, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', 160, 272, C.text2, 'left', 20); ctx.restore(); }
// punt langs een polylijn (u = 0..1)
function langs(pts, u) { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
  let d = clamp(u, 0, 1) * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const f = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= seg[i]; } return pts[pts.length - 1]; }
function rAllel(ctx, x, y, a = 1, lab = 'r') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 15, 40, 30, 8); shape(ctx, lab === 'r' ? C.koraal : '#9CCBE3', _dk3(C.koraal, 0.2), 2); text(ctx, lab, x, y + 9, fTekst(26, 800), '#1A1410', 'center'); ctx.restore(); }

// ---------- kleine iconen voor de recap (kas, bodem, stal) ----------
function icoonKas(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-60, -10); ctx.lineTo(0, -50); ctx.lineTo(60, -10); ctx.lineTo(60, 40); ctx.closePath(); shape(ctx, rgba('#9CCBE3', 0.15), '#AFC0D0', 3);
  ctx.strokeStyle = rgba('#AFC0D0', 0.6); ctx.lineWidth = 2; for (const px of [-30, 0, 30]) { ctx.beginPath(); ctx.moveTo(px, 40); ctx.lineTo(px, px === 0 ? -50 : -30); ctx.stroke(); }
  ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(-14, 0); ctx.stroke(); circ(ctx, -6, 8, 7, '#D0503C'); circ(ctx, -22, 20, 6, '#D0503C'); ctx.restore(); }
function icoonBodem(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -40, 120, 80, 8); ctx.fillStyle = '#6A5034'; ctx.fill(); ctx.fillStyle = '#8A6A44'; ctx.fillRect(-60, -40, 120, 26); ctx.fillStyle = C.groen; for (let i = 0; i < 6; i++) ctx.fillRect(-52 + i * 20, -52, 4, 14);
  ctx.strokeStyle = '#D89A8A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 14); ctx.quadraticCurveTo(-6, 0, 10, 18); ctx.quadraticCurveTo(24, 30, 36, 16); ctx.stroke(); ctx.restore(); }
function icoonStal(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-64, 40); ctx.lineTo(-64, -8); ctx.lineTo(0, -50); ctx.lineTo(64, -8); ctx.lineTo(64, 40); ctx.closePath(); shape(ctx, rgba('#C8463C', 0.25), '#AFC0D0', 3);
  koeIcoon(ctx, 2, 38, 44, '#E8E2D8', 1, { bont: 2 }); ctx.restore(); }
function eindKaart(ctx, x, y, w, h, kop, sub, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(C.goud, 0.8), 2); teken(x + w / 2, y + 66);
  text(ctx, kop, x + w / 2, y + h - 52, fTekst(30, 700), C.text, 'center'); text(ctx, sub, x + w / 2, y + h - 18, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }

// melkstaven uit de cold open: 1 px = 19 kg (4242 kg in 1970, 9935 kg nu)
function melkStaven(ctx, x0, x1, yb, bw, k, o = {}) { const h0 = 4242 * k, h1 = 9935 * k;
  groeiStaaf(ctx, x0, yb, bw, h0, C.text2, o.u0 == null ? 1 : o.u0); groeiStaaf(ctx, x1, yb, bw, h0, C.text2, o.u1 == null ? 1 : o.u1);
  const ex = o.ex || 0, v = o.voer || 0, f = o.fok || 0, eh = h1 - h0; if (ex > 0.01) { ctx.save(); ctx.globalAlpha *= ex * (1 - Math.max(v, f) * 0.9); roundRect(ctx, x1 - bw / 2, yb - h0 - eh * ex, bw, eh * ex, 10); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.goud, 0.28), C.goud, 3); ctx.setLineDash([]); ctx.restore(); }
  if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x1 - bw / 2, yb - h0 - eh / 2, bw, eh / 2, 6); shape(ctx, rgba(C.oker, 0.55), C.oker, 3); ctx.restore(); }
  if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x1 - bw / 2, yb - h1, bw, eh / 2, 10); shape(ctx, rgba(C.paars, 0.6), (o.fokGoud || 0) > 0.5 ? C.goud : C.paars, (o.fokGoud || 0) > 0.5 ? 5 : 3); ctx.restore(); }
  return { h0, h1, eh }; }

Object.assign(SCENES, {
  title(ctx, t) { gras(ctx, 850); rund(ctx, 'holstein', 1560, 850, 1.55, { kijk: -1, t });
    const r = 24; lijn(ctx, [[1100, 640], [1100, 690], [1300, 690], [1300, 640]], C.goud, 4); lijn(ctx, [[1200, 690], [1200, 750]], C.goud, 4);
    knoop(ctx, 1100, 612, r, true, { rand: C.goud, lw: 4 }); ster(ctx, 1100, 612, 16); knoop(ctx, 1300, 612, r, false, { rand: C.goud, lw: 4 }); kroon(ctx, 1300, 574, 0.55); knoop(ctx, 1200, 776, r, false, { rand: C.goud, lw: 4 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'stal', 0.6); const P = 1.3;
    [170, 400, 630].forEach((x, i) => rund(ctx, 'holstein', x, GROND, P, { kijk: 1, houding: i === 1 ? 'grazen' : 'staan', t }));
    const hY = 165 * P, v = gangSnelheid('yasmin', hY, 'loop'), x0 = 880, tw = Math.min(2.4, 60 / Math.max(v, 1)), xe = x0 - v * tw;
    if (t < tw) persoon(ctx, 'yasmin', x0, GROND + 6, hY, { zij: true, kijk: -1, gang: 'loop', t, vooruit: true, outfit: 'stal', uit: 'blij' });
    else persoon(ctx, 'yasmin', xe, GROND + 6, hY, { kijk: -1, outfit: 'stal', uit: q.on('Hoeveel', 1) > 0.5 ? 'verbaasd' : 'blij', pose: q.on('Hoeveel', 1) > 0.5 ? 'denk' : 'staan', t });
    const yb = 800, k = 1 / 19, x0b = 1030, x1b = 1200, bw = 120, Z = q.on('zeventig', 1, 0.5), T = q.on('tienduizend', 1, 0.6); roundRect(ctx, 900, 180, 560, 690, 20); shape(ctx, rgba('#0D1420', 0.72 * Z), null);
    const r = melkStaven(ctx, x0b, x1b, yb, bw, k, { u0: Z, u1: T, ex: T });
    naamBij(ctx, 'ruim 4000 kg', '1970', x0b, yb - r.h0 - 50, Z, 'center'); naamBij(ctx, 'bijna 10.000 kg', '2026', x1b, yb - r.h1 - 50, T, 'center');
    naamBij(ctx, 'extra melk', 'RUIM TWEE KEER', x1b + bw / 2 + 16, yb - r.h0 - r.eh / 2 + 12, q.on('twee', 1), 'left', C.goud);
    metaA(ctx, 'MELK PER KOE PER JAAR', 1180, 846, Z, C.text2, 'center', 22);
    const B = q.on('fokken', 1, 0.8); stamBord(ctx, lerp(1960, 1520, ease(B)), 100, 0.85, {}, B);
    vraagteken(ctx, 1640, 560, q.on('denk', 1), 100); },

  // ---------- H1 Kunstmatige selectie ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer de helft door fokken', 1 - q.on('Vandaag', 1));
    const yb = 800, k = 1 / 18, x0 = 560, x1 = 780, bw = 150, V = q.on('voer', 1), F = q.on('fokken', 1), J = q.on('Vandaag', 1);
    const r = melkStaven(ctx, x0, x1, yb, bw, k, { ex: 1, voer: V, fok: F, fokGoud: J });
    text(ctx, '1970', x0, yb + 44, fTekst(30, 700), C.text2, 'center'); text(ctx, 'nu', x1, yb + 44, fTekst(30, 700), C.text2, 'center');
    naamBij(ctx, 'voer en verzorging', '', x1 + bw / 2 + 24, yb - r.h0 - r.eh / 4 + 10, V, 'left', C.oker); naamBij(ctx, 'fokken', '≈ DE HELFT', x1 + bw / 2 + 24, yb - r.h1 + r.eh / 4 + 4, F, 'left', C.paars);
    metaA(ctx, 'SCHATTING · VS, CANADA, VK', x1 + bw / 2 + 24, yb - r.h1 - 26, q.on('Volgens', 1) * (1 - J), C.text2, 'left', 22);
    stamBord(ctx, 1400, 230, 1.15, { glow: J > 0.5 ? 'm' : null, t }, J); pijl(ctx, x1 + bw / 2 + 210, yb - r.h1 + r.eh / 4 - 10, 1380, 330, C.goud, J * q.on('deel', 1), 4, 18);
    tag(ctx, 'dat deel doe jij', 1613, 700, C.goud, q.on('deel', 1), 'center', 32); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('moeder', 1), V = q.on('vader', 1), S = q.on('kunstmatige', 1);
    const ring = (x, y, w, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w, w * 0.16, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); };
    [200, 470, 740].forEach((x, i) => { ring(x - 10, 470, 120, M); rund(ctx, 'holstein', x, 470, 0.72, { kijk: 1, t }); });
    ring(450, 800, 140, V); rund(ctx, 'stier', 460, 800, 0.8, { kijk: 1, t });
    naamBij(ctx, 'moeders', '', 470, 250, M, 'center', C.goud); naamBij(ctx, 'vader', '', 460, 610, V, 'center', C.goud);
    stamBord(ctx, 1160, 140, 1.3, { glow: V > 0.5 ? 'v' : (M > 0.5 ? 'm' : null), t }, 1);
    regel(ctx, 'kunstmatige selectie', 1400, 700, S, C.goud, 56, 'center', 800); metaA(ctx, 'DE MENS KIEST DE OUDERS', 1400, 760, S, C.text2, 'center', 24); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const g = 850, P = 1.75; gras(ctx, g); const D = q.on('Toen', 1, 0.6);
    rund(ctx, 'holstein', 1420, g, P, { kijk: -1, t });
    persoon(ctx, 'henk', 330, g, 172 * P, { t, kijk: 1, pose: D > 0.5 ? 'denk' : 'staan', uit: 'blij' }); persoon(ctx, 'yasmin', 640, g, 165 * P, { t, kijk: -1, outfit: 'stal', uit: 'blij' });
    hek(ctx, 100, 900, g - 4, 150);
    denkwolk(ctx, 70, 70, 800, 380, 330, g - 172 * P * 1.02, D); laag(ctx, D, () => { rund(ctx, 'dubbel', 470, 380, 1.3, { kijk: 1, t }); });
    metaA(ctx, 'MELK ÉN VLEES', 470, 140, q.on('melk', 1), C.text, 'center', 26); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const tI = q.at('inseminator', 1), tB = q.at('Bijna', 1);
    const A = 1 - ramp(t, tI - 0.4, 0.5), B = ramp(t, tI - 0.4, 0.5) * (1 - ramp(t, tB - 0.3, 0.5)), Cc = ramp(t, tB - 0.3, 0.5);
    laag(ctx, A, () => { vloer(ctx, 840); rund(ctx, 'stier', 560, 840, 1.35, { kijk: 1, t }); naamBij(ctx, 'stier', 'DEKT ZELF', 560, 590, 1, 'center');
      const T = q.on('tientallen', 1, 0.8); for (let i = 0; i < 30; i++) koeIcoon(ctx, 1100 + (i % 10) * 70, 420 + Math.floor(i / 10) * 90, 50, rgba(C.text2, 0.85), clamp(T * 30 - i, 0, 1), { bont: 1 + (i % 5) });
      metaA(ctx, 'HOOGUIT TIENTALLEN KOEIEN PER JAAR', 1415, 360, T, C.text2, 'center', 22); });
    laag(ctx, B, () => { const g = 840, P = 1.75; vloer(ctx, g);
      // inseminator vlak achter de koe; het pistool verdwijnt bij de staartaanzet (de koe wordt erna getekend)
      const id = 'inseminator', hh = 175 * P, ix = 300; persoon(ctx, id, ix, g, hh, { kijk: 1, pose: 'vasthouden', uit: 'neutraal', t });
      const hd = kiHandschoen(ctx, id, ix, g, hh, 'vasthouden', 1), tx = 500, ty = 640, an = Math.atan2(ty - hd.y, tx - hd.x); kiPistool(ctx, hd.x - 6, hd.y, an, Math.hypot(tx - hd.x, ty - hd.y) + 40);
      rund(ctx, 'holstein', 640, g, P, { kijk: 1, t });
      naamBij(ctx, 'kunstmatige inseminatie', 'ZONDER STIER', 560, 300, q.on('kunstmatige', 1), 'center');
      stikstofVat(ctx, 1080, g, 0.95, q.on('ingevroren', 1), t);
      const kx = 1330, ky = 560, Hn = q.on('honderden', 1, 1.2), Tn = q.on('tienduizenden', 1, 1.5);
      laag(ctx, q.on('afnemen', 1), () => { roundRect(ctx, kx - 50, ky - 34, 100, 68, 10); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 5; i++) rietje(ctx, kx - 34 + i * 17, ky - 6, 0.3, 1, Math.PI / 2, [C.teal, C.goud, C.koraal][i % 3]); });
      for (let r = 0; r < 7; r++) { const ra = r < 3 ? clamp(Hn * 3 - r, 0, 1) : clamp(Tn * 4 - (r - 3), 0, 1); if (ra <= 0.01) continue; const R = 120 + r * 70, m = 7 + r * 4;
        for (let j = 0; j < m; j++) { const an = -0.95 + j / (m - 1) * 1.9; const px = kx + Math.cos(an) * R, py = ky + Math.sin(an) * R * 0.78; if (px > 1850 || py < 150 || py > 830) continue; koeIcoon(ctx, px, py + 14, 26 + r * 1.2, rgba(C.text2, 0.85 - r * 0.07), ra, { bont: 1 + (j % 5) }); } }
      naamBij(ctx, 'één keer afnemen', 'HONDERDEN KOEIEN', kx + 30, ky - 80, q.on('afnemen', 1) * (1 - Tn), 'right');
      naamBij(ctx, 'tienduizenden koeien', 'ÉÉN STIER', kx + 30, ky - 80, Tn, 'right', C.goud); });
    laag(ctx, Cc, () => { const tB2 = q.at('Bijna', 1); for (let i = 0; i < 8; i++) rund(ctx, 'holstein', 230 + i * 205, 360, 0.55, { kijk: 1, t, a: ramp(t, tB2 + i * 0.12, 0.4) });
      tag(ctx, 'bijna elke melkkoe: kunstmatige inseminatie', 960, 150, C.goud, q.on('drachtig', 1), 'center', 32); metaA(ctx, 'BIJNA ALLE MELKKOEIEN: HOLSTEIN', 960, 410, q.on('Holsteins', 1), C.text2, 'center', 22);
      const g = 830, P = 1.3, Hs = q.on('Holsteins', 1); vloer(ctx, g); laag(ctx, Hs, () => { rund(ctx, 'dubbel', 470, g, P, { kijk: 1, t }); naamBij(ctx, 'vroeger', 'MELK ÉN VLEES', 470, 600, 1, 'center', C.text2);
        rund(ctx, 'holstein', 1080, g, P, { kijk: -1, t }); naamBij(ctx, 'nu: Holstein', 'GEFOKT OP MELK', 1080, 580, 1, 'center'); });
      laag(ctx, q.on('Amerikaanse', 1), () => { roundRect(ctx, 1360, 660, 330, 96, 14); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); rietje(ctx, 1495, 708, 1.25, 1, 0, C.teal); vlagVS(ctx, 1592, 684, 70); metaText(ctx, 'SPERMA VAN AMERIKAANSE STIEREN', 1525, 640, C.text2, 'center', 20); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const melk = [0.45, 0.9, 0.55, 0.8, 0.35, 0.95], top = [1, 3, 5], K = q.on('meeste', 1, 1.2);
    melk.forEach((m, i) => { const x = 230 + i * 200, g = 440, gek = top.includes(i); if (gek && K > 0.01) { ctx.save(); ctx.globalAlpha *= K; ctx.beginPath(); ctx.ellipse(x + 10, g, 100, 16, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
      groeiStaaf(ctx, x - 90, g, 22, 30 + m * 130, gek && K > 0.5 ? C.goud : C.text2, 1); rund(ctx, 'holstein', x + 14, g, 0.58, { kijk: 1, t, houding: i % 3 === 1 ? 'grazen' : 'staan' }); });
    metaA(ctx, 'MELK PER KOE', 140, 200, 1, C.text2, 'left', 22);
    stamBord(ctx, 1480, 100, 1, { vader: 'ki', moeders: K * 3, glow: K > 0.01 && K < 1 ? 'm' : null, t }, 1);
    const D = q.on('dochters', 1, 0.6); for (let i = 0; i < 9; i++) { const x = 230 + i * 115; laag(ctx, clamp(D * 9 - i, 0, 1), () => { koeIcoon(ctx, x, 800, 54, rgba(C.line, 0.9), 1); roundRect(ctx, x - 13, 600, 26, 120, 8); ctx.setLineDash([7, 6]); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.setLineDash([]); text(ctx, '?', x, 676, fTekst(30, 700), C.text2, 'center'); }); }
    naamBij(ctx, 'hun dochters', 'OP EEN RIJ', 230 - 40, 560, D, 'left'); pijl(ctx, 600, 560, 1150, 560, C.line, q.on('weinig', 1), 3, 14); metaA(ctx, 'WEINIG → VEEL MELK', 1150, 540, q.on('weinig', 1), C.text2, 'right', 20);
    mendelKaart(ctx, 1380, 560, q.on('erwten', 1));
    vraagteken(ctx, 1280, 700, q.on('denk', 1), 100); },

  // ---------- H2 Fokwaarde en erfelijkheidsgraad ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een vloeiende reeks', 1 - q.on('hangt', 1)); const R = q.on('vloeiende', 1, 1.5);
    for (let i = 0; i < 9; i++) { const x = 230 + i * 115, m = 0.15 + i * 0.1 + (hash(i * 3.1) - 0.5) * 0.04; koeIcoon(ctx, x, 800, 54, rgba(C.line, 0.9), 1, { bont: R > 0.5 ? 2 + (i % 4) : 0 });
      roundRect(ctx, x - 13, 600, 26, 120, 8); ctx.setLineDash([7, 6]); shape(ctx, null, rgba(C.line, 0.5 * (1 - R)), 2); ctx.setLineDash([]); groeiStaaf(ctx, x, 720, 26, 40 + m * 160, C.goud, clamp(R * 9 - i * 0.8, 0, 1)); }
    naamBij(ctx, 'een vloeiende reeks', 'VAN WAT MINDER TOT WAT MEER', 1180, 650, R, 'left', C.goud);
    mendelKaart(ctx, 1380, 250, 1 - q.on('genen', 1), q.on('geen', 1)); tag(ctx, 'geen melkgen', 1600, 560, C.koraal, q.on('geen', 1) * (1 - q.on('genen', 1)), 'center', 30);
    const G = q.on('genen', 1, 0.8); laag(ctx, G, () => { roundRect(ctx, 1200, 150, 640, 400, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromAllelen(ctx, 1330, 310, 260, 3, { breed: 44, n: 15 }); chromAllelen(ctx, 1420, 310, 260, 8, { breed: 44, n: 15 });
      naamBij(ctx, 'heel veel genen', 'KLEIN EFFECT', 1490, 300, q.on('effect', 1), 'left', C.paars); filmKaartje(ctx, 1240, 470, 'Voorbij dominant en recessief', q.on('lengte', 1), 420); });
    tag(ctx, '+ omgeving: voer, verzorging', 1500, 790, C.oker, q.on('omgeving', 1), 'center', 30); vereenvoudigd(ctx, G); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const g = 760, P = 1.45; rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
    naamBij(ctx, 'topkoe', '', 420, rundTop('holstein', g, P) - 80, 1, 'center', C.goud);
    groeiStaaf(ctx, 860, g, 70, 500, C.goud, 1); stippel(ctx, 640, g - 300, 1720, g - 300, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 800, g - 316, 1, C.text2, 'right', 20);
    const D = q.on('dochters', 1, 0.8); [1200, 1400, 1600].forEach((x, i) => { laag(ctx, clamp(D * 3 - i, 0, 1), () => { koeIcoon(ctx, x - 60, g, 70, rgba(C.line, 0.9), 1); roundRect(ctx, x + 10, g - 380, 44, 380, 10); ctx.setLineDash([8, 6]); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.setLineDash([]); text(ctx, '?', x + 32, g - 400, fTekst(34, 700), C.text2, 'center'); }); });
    naamBij(ctx, 'haar dochters', '', 1400, g + 50, D, 'center');
    stamBord(ctx, 1500, 70, 0.8, { vader: 'ki', moeders: 3, top: 1, glow: 'm', t }, 1 - q.on('Hoeveel', 1, 0.4));
    vraagteken(ctx, 1080, 300, q.on('denk', 1), 100); },

  s13(ctx, t, q) { const tB = q.at('moeder', 2) - 0.3, tC = q.at('melk', 1) - 0.4; const A = 1 - ramp(t, tB, 0.5), B = ramp(t, tB, 0.5) * (1 - ramp(t, tC, 0.5)), Cc = ramp(t, tC, 0.5);
    bg(ctx, B > 0.5 ? 'schema' : 'schema'); const g = 760, P = 1.45;
    laag(ctx, A, () => { antwoord(ctx, 'antwoord c: minder dan zij, maar meer dan gemiddeld', 1); rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
      groeiStaaf(ctx, 860, g, 70, 500, C.goud, 1); stippel(ctx, 640, g - 300, 1720, g - 300, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 800, g - 316, 1, C.text2, 'right', 20);
      const F = q.on('meer', 1, 1.2); [[1200, 400], [1400, 370], [1600, 430]].forEach(([x, h], i) => { koeIcoon(ctx, x - 60, g, 70, '#D8DEE6', 1, { bont: 2 + i }); groeiStaaf(ctx, x + 32, g, 44, h, C.goud, clamp(F * 1.4 - i * 0.15, 0, 1)); });
      tag(ctx, 'meer dan gemiddeld, minder dan moeder', 1400, 820, C.goud, q.on('minder', 1), 'center', 30); });
    laag(ctx, B, () => { roundRect(ctx, 80, 90, 900, 760, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); metaText(ctx, 'TOPKOE', 120, 140, C.text2, 'left', 22);
      chromAllelen(ctx, 280, 420, 440, 3, { breed: 56 }); chromAllelen(ctx, 380, 420, 440, 8, { breed: 56, a: 0.45 + 0.55 * (1 - q.on('helft', 1, 0.5)) });
      naamBij(ctx, 'chromosomenpaar', 'ALLELEN · KLEIN EFFECT', 330, 700, 1, 'center');
      const E = q.on('helft', 1, 0.6); circ(ctx, 780, 420, 150, rgba('#F6EEDC', 0.08 * E), rgba('#F6EEDC', 0.8 * E), 3); circ(ctx, 780, 420, 136, null, rgba('#F6EEDC', 0.35 * E), 1.5); naamBij(ctx, 'eicel', '', 780, 620, E, 'center');
      const u = ease(q.on('door', 1, 1.2)); if (u > 0.01) chromAllelen(ctx, lerp(380, 780, u), 420, lerp(440, 210, u), 8, { breed: lerp(56, 30, u), n: u > 0.5 ? 9 : 13 });
      pijl(ctx, 450, 420, 610, 420, C.paars, E * (1 - u), 5, 20);
      metaA(ctx, 'DE ANDERE HELFT: VAN DE VADER', 530, 770, q.on('vader', 1) * (1 - q.on('toeval', 1)), C.text2, 'center', 22);
      metaA(ctx, 'VAN ELK PAAR ÉÉN · WELKE: TOEVAL', 530, 800, q.on('toeval', 1), C.paars, 'center', 24);
      const Y = q.on('Yasmin', 1, 0.3), gg = 850, PP = 2.05; laag(ctx, Y, () => { persoon(ctx, 'yasmin', 1330, gg, 165 * PP, { t, kijk: 1, uit: 'blij', pose: 'staan' }); persoon(ctx, 'bilal', 1560, gg, 165 * PP, { t, kijk: -1, uit: 'lacht', pose: 'handenHeup' }); metaText(ctx, 'ZELFDE OUDERS', 1445, 440, C.text2, 'center', 26); }); });
    laag(ctx, Cc, () => { rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
      const yA = g - 300, yT = g - 500, sp = q.on('voer', 1, 0.8), xb = 860, bw = 70; stippel(ctx, 780, yA, 1500, yA, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 1500, yA + 34, 1, C.text2, 'right', 20);
      roundRect(ctx, xb - bw / 2, yA, bw, 300, 10); shape(ctx, rgba(C.goud, 0.35), C.goud, 2.5);
      const ym = lerp(yT, yA - 120, sp); roundRect(ctx, xb - bw / 2, yT, bw, ym - yT + (sp > 0.01 ? 0 : 200), 10); shape(ctx, rgba(sp > 0.5 ? C.oker : C.goud, 0.45), sp > 0.5 ? C.oker : C.goud, 2.5);
      if (sp > 0.01) { roundRect(ctx, xb - bw / 2, ym, bw, yA - ym, 6); shape(ctx, rgba(C.paars, 0.6 * sp), C.paars, 2.5); naamBij(ctx, 'aanleg', 'ERFT GEMIDDELD VOOR DE HELFT', xb + 60, ym + 56, sp, 'left', C.paars); naamBij(ctx, 'goed voer, geluk', 'VOORSPRONG · VEREENVOUDIGD', xb + 60, yT + 30, sp, 'left', C.oker); }
      const X = q.on('erft', 1); kruis(ctx, xb, (yT + ym) / 2, 26, X); tag(ctx, 'erft niet', 1560, yT + 20, C.koraal, X, 'center', 30); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const P = 0.8, Gr = q.on('groep', 1), E1 = q.on('één', 1);
    for (let i = 0; i < 12; i++) { const rij = Math.floor(i / 6), x = 250 + (i % 6) * 270 + rij * 60, g = 300 + rij * 230; const m = 0.35 + 0.65 * hash(i * 4.7 + 2);
      groeiStaaf(ctx, x - 108, g, 26, 40 + m * 110, C.goud, 1, 0.9); rund(ctx, 'holstein', x + 20, g, P, { kijk: 1, t, houding: i % 4 === 2 ? 'grazen' : 'staan' }); }
    laag(ctx, Gr, () => { roundRect(ctx, 110, 130, 1700, 430, 24); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 9]); ctx.stroke(); ctx.setLineDash([]); });
    laag(ctx, E1, () => { circ(ctx, 1080, 240, 105, null, C.koraal, 4); kruis(ctx, 1165, 155, 20, 1); });
    const xa = 260, xb = 1660, yb = 700, X = (v) => xa + (xb - xa) * v, S = q.on('erfelijkheidsgraad', 1);
    laag(ctx, S, () => { roundRect(ctx, xa, yb - 10, xb - xa, 20, 10); shape(ctx, rgba(C.fill, 0.9), C.line, 2); for (let v = 0; v <= 10; v++) { ctx.fillStyle = C.line; ctx.fillRect(X(v / 10) - 1.5, yb + 12, 3, v % 5 ? 10 : 18); }
      text(ctx, '0', X(0), yb + 58, fTekst(32, 700), C.text2, 'center'); text(ctx, '1', X(1), yb + 58, fTekst(32, 700), C.text2, 'center'); naamBij(ctx, 'erfelijkheidsgraad (h²)', '', xa, yb - 36, 1, 'left'); });
    const Mk = q.on('derde', 1); laag(ctx, Mk, () => { roundRect(ctx, X(1 / 3), yb - 16, X(0.5) - X(1 / 3), 32, 10); shape(ctx, rgba(C.paars, 0.7), C.paars, 2.5); naamBij(ctx, 'MELK', '⅓ TOT ½', X(0.415), yb - 66, 1, 'center'); });
    const Vr = q.on('vruchtbaarheid', 1); laag(ctx, Vr, () => { roundRect(ctx, X(0.01), yb - 16, X(0.09) - X(0.01), 32, 8); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2.5); naamBij(ctx, 'VRUCHTBAARHEID', 'VAAK < 0,1', X(0.06), yb + 96, 1, 'left'); });
    metaA(ctx, 'VERSCHILLEN IN EEN GROEP, NIET IN ÉÉN KOE', 1660, 850, Gr, C.text2, 'right', 22); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const W1 = q.on('Welke', 1, 0.6), F1 = q.on('fokwaarde', 1), St = q.on('stier', 1), Hk = q.on('Opa', 1, 0.3);
    const fwBox = (x, y, a) => laag(ctx, a, () => { roundRect(ctx, x - 130, y, 260, 70, 12); shape(ctx, rgba(C.fill, 0.6), C.goud, 2.5); text(ctx, 'fokwaarde ?', x, y + 46, fTekst(32, 700), C.goud, 'center'); metaText(ctx, 'SCHATTING', x, y + 100, C.text2, 'center', 20); });
    laag(ctx, 1 - W1, () => { const g = 620, P = 1.2; rund(ctx, 'holstein', 380, g, P, { kijk: 1, t }); kroon(ctx, 340, rundTop('holstein', g, P) - 34, 0.8); fwBox(380, 670, F1);
      laag(ctx, St, () => { rund(ctx, 'stier', 900, g, P, { kijk: 1, t }); fwBox(900, 670, 1); }); });
    laag(ctx, Hk, () => persoon(ctx, 'henk', 1500, 620, 172 * 1.2, { t, kijk: -1, pose: 'denk', uit: 'verbaasd' }));
    laag(ctx, W1, () => { const y = 200, w = 360, h = 300; [140, 540, 940].forEach((x, i) => laag(ctx, clamp(W1 * 3 - i * 0.6, 0, 1), () => {
      if (i === 0) stierKaart(ctx, x, y, w, h, { donker: 1, dochters: 6, melk: 0.85 });
      else if (i === 1) { stierKaart(ctx, x, y, w, h, { donker: 1 }); metaText(ctx, 'GEEFT GEEN MELK', x + w / 2, y + h - 30, C.text2, 'center', 20); }
      else { stierKaart(ctx, x, y, w, h, { donker: 1, geenStier: 1 }); ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); rund(ctx, 'stier', x + w * 0.5, y + h * 0.84, 0.95, { kijk: 1, t }); ctx.restore(); metaText(ctx, 'GROOT EN STERK', x + w / 2, y + h - 18, C.text2, 'center', 20); } }));
      metaA(ctx, 'WELKE STIER KIES JIJ?', 720, 580, 1, C.goud, 'center', 24); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const tV = q.at('Vroeger', 1), A = 1 - ramp(t, tV - 0.3, 0.5), B = ramp(t, tV - 0.3, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord a: de stier van wie de dochters veel melk geven', 1); stierKaart(ctx, 140, 240, 520, 420, { donker: 1, dochters: 6, melk: 0.85, rand: C.goud });
      metaA(ctx, 'GEEFT ZELF GEEN MELK', 400, 720, q.on('geen', 1), C.text2, 'center', 22);
      laag(ctx, q.on('draagt', 1), () => { roundRect(ctx, 820, 220, 640, 460, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromAllelen(ctx, 1095, 420, 300, 5, { breed: 46, n: 15 }); chromAllelen(ctx, 1185, 420, 300, 9, { breed: 46, n: 15 });
        naamBij(ctx, 'genen voor melk', 'GEEFT HIJ DOOR AAN ZIJN DOCHTERS', 1140, 630, 1, 'center', C.paars); }); });
    laag(ctx, B, () => { const p = clamp((t - q.at('geboren', 1) + 0.2) / (q.at('vijf', 1) - q.at('geboren', 1) + 0.2), 0, 1), jaar = Math.round(p * 5), g = 600;
      stamBord(ctx, 110, 100, 1.05, { vader: 'stier', moeders: 3, top: 1, fw: q.on('vijf', 1), glow: 'v', t }, 1);
      const gS = 600; rund(ctx, 'kalf', 1700, gS, lerp(0.55, 0.62, p), { kijk: -1, t, a: 1 - ramp(p, 0.55, 0.3) }); rund(ctx, 'stier', 1700, gS, lerp(0.5, 0.72, p), { kijk: -1, t, a: ramp(p, 0.55, 0.3) }); metaText(ctx, 'DE STIER', 1700, gS + 60, C.goud, 'center', 20);
      tag(ctx, 'fokwaarde ✓', 1700, 330, C.goud, q.on('vijf', 1), 'center', 34);
      const yt = 790; lijn(ctx, [[220, yt], [1720, yt]], C.line, 4); for (let j = 0; j <= 5; j++) { const x = 220 + j * 300; ctx.fillStyle = j <= jaar ? C.goud : C.line; ctx.fillRect(x - 2, yt - 12, 4, 24); metaText(ctx, 'JAAR ' + j, x, yt + 46, j <= jaar ? C.goud : C.text2, 'center', 20); }
      const ux = lerp(220, 1720, p); circ(ctx, ux, yt, 12, C.goud);
      const st = [['geboren', 1, 'kalf', 640, 'GEBOREN'], ['opgegroeid', 1, 'holstein', 880, 'OPGEGROEID'], ['kalf', 1, 'holstein', 1120, 'EEN KALF'], ['melk', 3, null, 1360, 'MELK']];
      st.forEach(([w, n, ras, x, lab], i) => { const a = q.on(w, n, 0.5); if (a <= 0.01) return; laag(ctx, a, () => { if (ras === 'kalf') rund(ctx, 'kalf', x, g, 0.62, { kijk: 1, t }); else if (ras) rund(ctx, 'holstein', x, g, 0.72, { kijk: 1, t, uier: i === 1 ? 0.5 : null });
        if (i === 2) rund(ctx, 'kalf', x + 120, g, 0.4, { kijk: -1, t }); if (i === 3) { rund(ctx, 'holstein', x, g, 0.72, { kijk: 1, t }); groeiStaaf(ctx, x + 140, g, 30, 180, C.goud, q.on('melk', 3, 1)); }
        metaText(ctx, lab, x, g + 60, C.text2, 'center', 20); }); });
      naamBij(ctx, 'dochter', '', 640, 470, q.on('geboren', 1), 'center');
      text(ctx, 'jaar ' + jaar, 1800, 200, fTitel(72), C.goud, 'right'); metaA(ctx, 'ZO LANG WACHT JIJ', 1800, 250, q.on('wacht', 1), C.goud, 'right', 22); }); },

  // ---------- H3 Genomische selectie ----------
  s18(ctx, t, q) { decor(ctx, 'stal', 0.6); const g = GROND, P = 2.05, Tr = q.on('trekt', 1), Bu = q.on('buisje', 1), Hw = q.on('haarwortel', 1, 0.8);
    kalverhok(ctx, 90, 1060, g, 330);
    rund(ctx, 'kalf', 625, g, P * 0.56, { kijk: 1, t });
    // staartkwast van het kalf (kalf kijkt naar rechts): ± x 530, y 815; trekken = korte ruk terug, daarna plukje in het buisje
    const tT = q.at('trekt', 1), ruk = clamp((t - tT - 0.6) / 1.2, 0, 1), rk = Math.sin(ruk * Math.PI) * 14, plk = ramp(t, tT + 1.2, 0.3), inB = q.on('ze', 1, 0.8);
    persoon(ctx, 'gerrit', 385, g, 168 * P, { t, kijk: 1, outfit: 'stal', pose: Tr > 0.5 ? 'vasthouden' : 'staan', uit: 'neutraal', hold: Tr > 0.5 ? (c, x, y) => {
      const kx = lerp(530 - rk, x + 30, inB), ky = lerp(812, y - 60, inB), an = Math.atan2(ky - y, kx - x), L = Math.hypot(kx - x, ky - y); tangetje(c, x, y, clamp(L / 70, 0.6, 1.5), an);
      if (plk > 0.01) { c.save(); c.globalAlpha *= plk * (1 - ramp(t, q.at('buisje', 1) + 0.3, 0.3)); c.strokeStyle = '#2A2622'; c.lineWidth = 1.6; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(kx, ky); c.lineTo(kx - 14 + i * 3, ky + 16 + (i % 2) * 4); c.stroke(); } c.restore(); }
      haarBuisje(c, x + 46, y - 66, 0.8, Bu, 0.2, 5); } : null });
    persoon(ctx, 'yasmin', 810, g, 165 * P, { t, kijk: -1, pose: 'vasthouden', uit: 'blij', outfit: 'stal' });
    naamBij(ctx, 'stierkalfje', 'GOEDE OUDERS', 625, 640, 1 - q.on('Gerrit', 1), 'center');
    laag(ctx, q.on('Vijf', 1) * (1 - Hw), () => { roundRect(ctx, 1250, 200, 520, 150, 18); shape(ctx, rgba('#0D1420', 0.85), C.koraal, 2); text(ctx, '5 jaar wachten', 1510, 296, fTekst(44, 700), C.text, 'center'); const sN = q.on('niet', 1, 0.5); if (sN > 0.01) lijn(ctx, [[1320, 282], [lerp(1320, 1700, sN), 282]], C.koraal, 6); });
    naamBij(ctx, 'Veehouder Gerrit', '', 385, 440, q.on('Gerrit', 1) * (1 - Hw), 'center');
    laag(ctx, Hw, () => { const cx = 1460, cy = 430, R = 260; circ(ctx, cx, cy, R, C.bgMicro, rgba(C.line, 0.7), 3); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, 6.283); ctx.clip();
      ctx.strokeStyle = '#2A2622'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 40, cy - 300); ctx.quadraticCurveTo(cx - 10, cy - 120, cx, cy - 20); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx + 6, cy + 70, 92, 120, -0.08, 0, 6.283); shape(ctx, '#E4D2B8', '#B8A080', 3);
      dnaDraad(ctx, [[cx - 40, cy + 20], [cx + 30, cy + 40], [cx - 30, cy + 80], [cx + 40, cy + 110], [cx - 20, cy + 150]], { w: 9 }); ctx.restore();
      naamBij(ctx, 'haarwortel', '', cx, cy + R + 50, 1, 'center'); naamBij(ctx, 'DNA', '', cx + 130, cy + 110, q.on('DNA', 1), 'left', C.paars); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const u = ease(clamp(t / 1.6, 0, 1)), bx = lerp(260, 620, u);
    haarBuisje(ctx, bx, 560, 2.6, 1, 0, 5); pijl(ctx, 780, 520, 1060, 520, C.line, q.on('lab', 1), 4, 18);
    laag(ctx, q.on('lab', 1), () => { roundRect(ctx, 1100, 330, 640, 380, 22); shape(ctx, rgba('#0D1420', 0.7), rgba(C.line, 0.8), 2); metaText(ctx, 'LAB', 1140, 380, C.text2, 'left', 24); });
    dnaDraad(ctx, [[1170, 520], [1300, 470], [1420, 560], [1540, 480], [1670, 540]], { w: 14, a: q.on('DNA', 1) }); naamBij(ctx, 'DNA van het kalf', '', 1420, 650, q.on('DNA', 1), 'center', C.paars);
    vraagteken(ctx, 1420, 300, q.on('denk', 1), 100); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tC = q.at('chip', 1), A = 1 - ramp(t, tC - 0.3, 0.5), B = ramp(t, tC - 0.3, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord c: het DNA wordt gelezen en vergeleken', 1);
      dnaDraad(ctx, [[240, 470], [400, 420], [560, 500], [720, 430], [880, 490], [1000, 450]], { w: 14 }); loep(ctx, 600, 450, 110, q.on('gelezen', 1));
      const N = q.on('veranderd', 1); schaar(ctx, 1320, 450, 1.3, N); doorstreep(ctx, 1320, 450, 80, N); spuit(ctx, 1600, 450, 1.3, N); doorstreep(ctx, 1600, 450, 80, N);
      naamBij(ctx, 'LEZEN, NIET VERANDEREN', 'GEEN GENETISCHE MODIFICATIE', 1460, 640, q.on('modificatie', 1), 'center', C.goud); });
    laag(ctx, B, () => { dnaChip(ctx, 160, 220, 520, 400, { n: 18, seed: 4 }); naamBij(ctx, 'DNA-chip', 'LEEST TIENDUIZENDEN VASTE PLEKJES · SNP', 420, 700, 1, 'center');
      const M = q.on('merkers', 1, 0.8), Wg = q.on('wegwijzers', 1), Dn = q.on('wél', 1);
      const chr = [[820, 470, 340], [940, 480, 300], [1060, 460, 380], [1180, 490, 270], [1300, 470, 320]];
      chr.forEach(([x, y, h], i) => { chromKaal(ctx, x, y, h, 42); [0.18, 0.42, 0.66, 0.86].forEach((p, j) => merkerVlag(ctx, x + 22, y - h / 2 + p * h, 0.8, clamp(M * 6 - i - j * 0.3, 0, 1))); });
      naamBij(ctx, 'merkers', 'OVER ALLE CHROMOSOMEN', 1060, 220, M, 'center', C.goud);
      laag(ctx, Wg, () => { roundRect(ctx, 1420, 160, 440, 640, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromKaal(ctx, 1530, 500, 480, 66);
        merkerVlag(ctx, 1564, 350, 1.3); merkerVlag(ctx, 1564, 520, 1.3); merkerVlag(ctx, 1564, 680, 1.3);
        laag(ctx, Dn, () => { roundRect(ctx, 1497, 540, 66, 40, 6); shape(ctx, rgba(C.groen, 0.85), C.groen, 2); naamBij(ctx, 'doet wél iets', '', 1620, 600, 1, 'left', C.groen); });
        metaText(ctx, 'WEGWIJZER,', 1640, 210, C.goud, 'center', 20); metaText(ctx, 'MEESTAL GEEN MELKGEN', 1640, 240, C.goud, 'center', 20); }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const cw = 250, ch = 175, gx = 24, gy = 22, x0 = 140, y0 = 150, goed = [1, 6, 7, 10];
    const Dn = 1, Do = 1, tL = q.at('Lijkt', 1), tG = q.at('goede', 1), scan = clamp((t - tL) / (tG + 0.4 - tL), 0, 1), sx = lerp(x0 - 20, x0 + 4 * cw + 3 * gx + 20, scan), sc = t > tL ? 1 : 0;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c, x = x0 + c * (cw + gx), y = y0 + r * (ch + gy), isG = goed.includes(i), lit = isG && sc && sx > x + cw / 2 ? 1 : 0, dim = sc && scan >= 1 && !isG ? 0.55 : 1;
      laag(ctx, clamp(0.35 + t * 1.2 - i * 0.04, 0, 1) * dim, () => { stierKaart(ctx, x, y, cw, ch, {});
        laag(ctx, Dn, () => stierKaart(ctx, x, y, cw, ch, { code: isG ? 7 : i + 3 })); laag(ctx, Do, () => stierKaart(ctx, x, y, cw, ch, { code: isG ? 7 : i + 3, dochters: 6, melk: isG ? 0.85 : 0.25 + 0.4 * hash(i * 9.1 + 1), rand: lit ? C.goud : null })); }); }
    if (sc && scan < 1) { ctx.save(); ctx.strokeStyle = rgba(C.paars, 0.9); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx, y0 - 20); ctx.lineTo(sx, y0 + 3 * ch + 2 * gy + 20); ctx.stroke(); ctx.restore(); }
    metaA(ctx, 'DUIZENDEN STIEREN · DNA + DOCHTERS BEKEND', x0, 110, Do, C.text2, 'left', 22);
    tag(ctx, 'referentiegroep', x0 + (4 * cw + 3 * gx) / 2, 780, C.goud, q.on('referentiegroep', 1), 'center', 34);
    roundRect(ctx, 1320, 150, 520, 560, 22); shape(ctx, rgba('#0D1420', 0.6), C.paars, 2.5); metaText(ctx, 'JOUW KALF', 1350, 196, C.text2, 'left', 22);
    rund(ctx, 'kalf', 1580, 420, 0.7, { kijk: 1, t }); roundRect(ctx, 1380, 470, 400, 80, 8); shape(ctx, '#F2EEE4', null); streepjescode(ctx, 1392, 482, 376, 56, 7);
    tag(ctx, 'fokwaarde: hoog', 1580, 640, C.goud, q.on('hoge', 1), 'center', 32);
    regel(ctx, 'genomische selectie', 1580, 790, q.on('genomische', 1), C.goud, 52, 'center', 800); metaA(ctx, 'NL · SINDS 2010', 1580, 840, q.on('tweeduizendtien', 1), C.text2, 'center', 22); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('Maar', 1) - 0.3, tC = q.at('tijd', 1) - 0.3, A = 1 - ramp(t, tB, 0.5), B = ramp(t, tB, 0.5) * (1 - ramp(t, tC, 0.5)), Cc = ramp(t, tC, 0.5);
    laag(ctx, A, () => { metaText(ctx, 'BETROUWBAARHEID VAN DE FOKWAARDE', 160, 200, C.text2, 'left', 24);
      const rij = (y, lab, f, a, col, teken) => laag(ctx, a, () => { text(ctx, lab, 160, y + 14, fTekst(40, 700), C.text, 'left'); roundRect(ctx, 760, y - 26, 900, 52, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 2); if (f > 0.01) { roundRect(ctx, 760, y - 26, 900 * f, 52, 16); shape(ctx, rgba(col, 0.6), col, 2.5); } teken(); });
      rij(320, 'alleen de ouders', 0.3 * ramp(t, 0, 0.8), 1, C.text2, () => {}); rij(480, 'DNA-test', 0.6 * ramp(t, 0, 0.8), 1, C.paars, () => {});
      rij(640, 'honderden dochters', 0.95 * q.on('honderden', 1, 1.2), q.on('stier', 1), C.goud, () => { for (let i = 0; i < 12; i++) koeIcoon(ctx, 780 + i * 34, 740, 30, rgba(C.text2, 0.8), 1); });
      tag(ctx, '≈ 2 × zo betrouwbaar', 1210, 410, C.paars, q.on('twee', 1), 'center', 28); tag(ctx, 'zekerder', 1720, 570, C.goud, q.on('zekerder', 1), 'center', 28); });
    const bA = Math.max(B, Cc); stamBord(ctx, 1380, 150, 1.12, { vader: 'stier', moeders: 3, top: 1, fw: 1, kalf: q.on('kalf', 1, 0.6), glow: 'k', t }, bA);
    laag(ctx, B, () => { text(ctx, '± 5 jaar', 640, 420, fTitel(96), C.text2, 'center'); kruis(ctx, 640, 390, 120, ramp(t, tB + 0.3, 0.5)); regel(ctx, 'binnen een paar weken', 640, 600, q.on('binnen', 1), C.goud, 64, 'center', 800); });
    laag(ctx, Cc, () => { const row = (y, lab, n, step, a) => laag(ctx, a, () => { metaText(ctx, lab, 160, y - 70, C.text2, 'left', 22); lijn(ctx, [[160, y], [1200, y]], C.line, 3);
        for (let i = 0; i < n; i++) { const x = 200 + i * step; stierIcoon(ctx, x, y - 6, 54, i ? '#D8DEE6' : C.goud, 1); if (i < n - 1) pijl(ctx, x + 40, y - 30, x + step - 40, y - 30, C.goud, 1, 3, 12); } });
      row(400, 'VROEGER · ÉÉN GENERATIE', 3, 480, 1); row(650, 'NU · GENERATIE ≈ GEHALVEERD', 5, 240, q.on('gehalveerd', 1));
      tag(ctx, 'fokken gaat ± 2 × zo snel', 680, 790, C.goud, q.on('snel', 1), 'center', 32); }); },

  // ---------- H4 De keerzijde ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); bordKader(ctx, 1, 1);
    stamboom(ctx, { s: 1, z: q.on('steeds', 1), p: q.on('andere', 1), k: q.on('generaties', 1), kl: q.on('kleindochters', 1), kp: q.on('kleinzonen', 1), koraal: q.on('mislukt', 1) });
    for (let i = 0; i < 3; i++) laag(ctx, clamp(q.on('andere', 1, 1) * 3 - i, 0, 1), () => { const y = 160 + i * 190; roundRect(ctx, 1400, y, 420, 160, 16); shape(ctx, rgba('#0D1420', 0.86), rgba(C.line, 0.8), 2); metaText(ctx, 'ANDER BEDRIJF', 1430, y + 40, C.text2, 'left', 18);
      for (let j = 0; j < 3; j++) { const bx = 1430 + j * 120; roundRect(ctx, bx, y + 64, 90, 64, 10); shape(ctx, rgba(C.fill, 0.55), C.goud, 2); ster(ctx, bx + 45, y + 96, 20); } });
    tag(ctx, 'dracht mislukt vaker', 1100, 830, C.koraal, q.on('mislukt', 1), 'center', 30);
    vraagteken(ctx, 960, 780, q.on('denk', 1), 90); },

  s26(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een recessief allel komt dubbel voor', 1 - q.on('Familie', 1)); bordKader(ctx, 1, 1);
    const Ho = q.on('homozygoot', 1), Dr = q.on('drager', 1);
    stamboom(ctx, { s: 1, z: 1, p: 1, k: 1, kl: 1, kp: 1, koraal: 1, dr: Dr });
    regel(ctx, 'inteelt', 1110, 816, q.on('inteelt', 1), C.goud, 52, 'center', 800);
    const { S, zA, dB, kA, kB, kalf, r } = SB; rAllel(ctx, S[0] - 48, S[1] - 30, q.on('waren', 1));
    const pV = [[S[0], S[1] + r], [S[0], S[1] + 70], [zA[0], S[1] + 70], [zA[0], zA[1]], [440, zA[1]], [440, zA[1] + 70], [kA[0], kA[1]], [760, kA[1]], [760, kA[1] + 70], [kalf[0] - 18, kalf[1] - r]];
    const pM = [[S[0], S[1] + r], [S[0], S[1] + 70], [dB[0], S[1] + 70], [dB[0], dB[1]], [1080, dB[1]], [1080, dB[1] + 70], [kB[0], kB[1]], [760, kB[1]], [760, kB[1] + 70], [kalf[0] + 18, kalf[1] - r]];
    const u = ease(q.on('vader', 1, 2.4)), Rn = q.on('vader', 1, 0.3) * (1 - ramp(t, q.at('homozygoot', 1) + 0.6, 0.4));
    if (u > 0.01) { const a1 = langs(pV, u), a2 = langs(pM, u); rAllel(ctx, a1[0] - 22, a1[1], Rn); rAllel(ctx, a2[0] + 22, a2[1], Rn); }
    const nR = (pt, uu) => rAllel(ctx, pt[0] + r + 26, pt[1] - 26, ramp(u, uu, 0.08)); nR(zA, 0.3); nR(dB, 0.3); nR(kA, 0.62); nR(kB, 0.62); rAllel(ctx, SB.dr[0] + r + 26, SB.dr[1] - 26, Dr);
    laag(ctx, ramp(t, q.at('homozygoot', 1) + 0.6, 0.4), () => { rAllel(ctx, kalf[0] - 22, kalf[1] - 52, 1); rAllel(ctx, kalf[0] + 22, kalf[1] - 52, 1); });
    laag(ctx, Ho, () => { roundRect(ctx, 1370, 150, 470, 690, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2);
      chromR(ctx, 1450, 380, 260, 0.36, 'r'); chromR(ctx, 1545, 380, 260, 0.36, 'r'); naamBij(ctx, 'HOMOZYGOOT', '', 1515, 560, 1, 'center', C.koraal); text(ctx, 'rr', 1515, 604, fTekst(34, 700), C.koraal, 'center');
      laag(ctx, Dr, () => { chromR(ctx, 1670, 380, 260, 0.36, 'r'); chromR(ctx, 1760, 380, 260, 0.36, 'R'); naamBij(ctx, 'DRAGER', '', 1720, 560, 1, 'center'); text(ctx, 'Rr · gezond', 1720, 604, fTekst(30, 700), C.text, 'center'); });
      metaText(ctx, 'HETZELFDE ALLEL,', 1605, 200, C.text2, 'center', 18); metaText(ctx, 'VAN DEZELFDE VOOROUDER', 1605, 228, C.text2, 'center', 18);
      filmKaartje(ctx, 1400, 680, 'Monohybride kruisingen', q.on('recessief', 1), 410); filmKaartje(ctx, 1400, 750, 'Stambomen en kansrekenen', q.on('recessief', 1), 410); }); },

  s27(ctx, t, q) { bg(ctx, 'schema'); const ty = 640, Nu = q.on('Nu', 1);
    lijn(ctx, [[140, ty], [960, ty]], C.line, 4);
    [[200, '1950'], [420, '1962'], [700, '1990'], [900, 'NU']].forEach(([x, s]) => { const k = s === '1962'; ctx.fillStyle = k ? C.goud : C.line; ctx.fillRect(x - 2, ty - (k ? 22 : 12), 4, k ? 44 : 24); text(ctx, s, x, ty + 50, fTekst(k ? 38 : 30, 700), k ? C.goud : C.text2, 'center'); });
    lijn(ctx, [[420, ty - 22], [420, 500]], C.goud, 3); stierKaart(ctx, 230, 200, 380, 300, { rand: C.goud, geenStier: 1 }); rund(ctx, 'stier', 420, 470, 0.95, { kijk: 1, t });
    metaText(ctx, 'ECHTE STIER · VS', 140, 160, C.goud, 'left', 22);
    naamBij(ctx, '> 16.000 dochters', '', 650, 330, q.on('zestienduizend', 1), 'left');
    groeiStaaf(ctx, 690, 500, 40, 110, C.goud, q.on('melk', 1, 0.8)); naamBij(ctx, 'extra melk', '', 730, 470, q.on('melk', 1), 'left', C.goud);
    rAllel(ctx, 578, 236, q.on('recessief', 1)); naamBij(ctx, 'ongemerkt', 'SCHADELIJK RECESSIEF ALLEL', 650, 250, q.on('recessief', 1), 'left', C.koraal);
    laag(ctx, q.on('Kalfjes', 1) * (1 - Nu), () => { const gr = (t - q.at('Kalfjes', 1)); [[1160, 0.5, 0, 0], [1440, 0.8, 0, 0.6], [1720, 0.82, 1, 1.2]].forEach(([x, g, st, d], i) => { const a = ramp(gr, d, 0.4); baarmoederVrucht(ctx, x, 390, 100, g, st, a); metaA(ctx, ['GROEIT', 'GROEIT', 'STOPT'][i], x, 540, a, st ? C.koraal : C.text2, 'center', 22); });
      pijl(ctx, 1110, 600, 1790, 600, C.line, 0.7, 3, 14); metaText(ctx, 'DRACHT', 1110, 640, C.text2, 'left', 20);
      naamBij(ctx, 'twee kopieën van het allel', '', 1440, 720, q.on('kopieën', 1), 'center', C.koraal); metaA(ctx, 'NAAR SCHATTING ± HALF MILJOEN · WERELDWIJD', 1450, 830, q.on('half', 1), C.text2, 'center', 22); });
    laag(ctx, Nu, () => { haarBuisje(ctx, 1150, 470, 1.6, 1, 0, 5); pijl(ctx, 1210, 430, 1290, 430, C.line, 1, 4, 16); dnaChip(ctx, 1310, 310, 260, 220, { n: 10, seed: 6 });
      rAllel(ctx, 1680, 420, q.on('dragers', 1)); naamBij(ctx, 'drager gevonden', 'DNA-TEST', 1680, 520, q.on('dragers', 1), 'center', C.koraal); }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('Nu', 1), tO = q.at('Oude', 1), A = 1 - ramp(t, tO - 0.3, 0.5), O = ramp(t, tO - 0.3, 0.5);
    laag(ctx, A, () => { const nu = ramp(t, tN, 1.6), kant = lerp(-1, 0.25, nu);
      metaA(ctx, 'TOTAALSCORE · NVI', 620, 200, nu, C.goud, 'center', 24); metaA(ctx, 'FOKDOEL', 620, 200, 1 - nu, C.text2, 'center', 24);
      weegschaalLb3(ctx, 620, 360, kant, 1, (x, y) => { groeiStaaf(ctx, x, y + 20, 70, 150, C.goud, 1); text(ctx, 'melk', x, y + 80, fTekst(36, 700), C.text, 'center'); },
        (x, y) => laag(ctx, lerp(0.35, 1, nu), () => { ['gezondheid', 'vruchtbaarheid', 'lang leven'].forEach((s2, i) => { roundRect(ctx, x - 120, y - 10 - i * 54, 240, 46, 10); shape(ctx, rgba(C.groen, 0.25 + 0.3 * nu), C.groen, 2); text(ctx, s2, x, y + 22 - i * 54, fTekst(28, 700), C.text, 'center'); }); }));
      const S = q.on('Allelen', 1); laag(ctx, S * (1 - nu), () => { [['melk', '↑', C.goud], ['vruchtbaarheid', '↓', C.koraal], ['gezondheid', '↓', C.koraal]].forEach(([s2, p, col], i) => { const y = 330 + i * 110; text(ctx, s2, 1260, y, fTekst(40, 700), C.text, 'left'); text(ctx, p, 1220, y, fTitel(56), col, 'center'); }); metaText(ctx, 'ALLELEN VOOR VEEL MELK GAAN VAAK SAMEN MET', 1200, 250, C.text2, 'left', 18); });
      tag(ctx, 'minstens zo zwaar als melk', 1450, 470, C.groen, q.on('minstens', 1), 'center', 32); });
    laag(ctx, O, () => { const g = 850, P = 1.3; vloer(ctx, g); rund(ctx, 'blaarkop', 480, g, P, { kijk: 1, t }); rund(ctx, 'holstein', 1000, g, P, { kijk: -1, t, a: 0.85 });
      naamBij(ctx, 'Groninger blaarkop', 'ZO’N 800 FOKKOEIEN (2026)', 480, 610, 1, 'center'); naamBij(ctx, 'Holstein', '', 1000, 610, 1, 'center', C.text2);
      tag(ctx, 'reserve aan variatie', 740, 330, C.goud, q.on('reserve', 1), 'center', 32);
      laag(ctx, q.on('Wageningen', 1), () => { stikstofVat(ctx, 1500, g, 1.0, 1, t); roundRect(ctx, 1660, g - 150, 150, 150, 10); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 4; i++) rietje(ctx, 1690 + i * 30, g - 80, 0.45, 1, Math.PI / 2, [C.teal, C.goud, C.koraal, C.groen][i]); naamBij(ctx, 'genenbank', 'WAGENINGEN · DIEPGEVROREN', 1580, 510, 1, 'center'); }); }); },

  s29(ctx, t, q) { const Z = q.on('Hoe', 1, 0.8);
    laag(ctx, 1 - Z, () => { decor(ctx, 'stal', 0.6); const g = GROND, P = 1.85, F = q.on('familie', 1), Mi = q.on('mindere', 1), Tw = q.on('tweede', 1, 0.8);
      rund(ctx, 'holstein', 330, g, P, { kijk: 1, t });
      persoon(ctx, 'gerrit', 760, g, 168 * P, { t, kijk: 1, outfit: 'stal', pose: 'vasthouden', uit: 'neutraal', hold: (c, x, y) => { roundRect(c, x - 6, y - 52, 70, 50, 6); shape(c, '#1E232C', '#5A6070', 2); roundRect(c, x - 1, y - 47, 60, 40, 3); shape(c, rgba(C.teal, 0.5), null); } });
      persoon(ctx, 'yasmin', 1000, g, 165 * P, { t, kijk: -1, outfit: 'stal', uit: 'neutraal' });
      tabletLb3(ctx, 1110, 140, 730, 560, { k1: F, k2: Mi, streep: Tw, kies: Tw, reden: q.on('allelen', 1) }); });
    laag(ctx, Z, () => { bg(ctx, 'schema'); ctx.globalAlpha = Z; const D = q.on('verschillende', 1, 1);
      stamBord(ctx, 729, 110, 1.25, { vader: 'ster', moeders: 3, gen: 1, divers: D, glow: 'g', t }, 1);
      tag(ctx, 'meer variatie in het ras', 960, 800, C.goud, q.on('variatie', 1), 'center', 32); }); },

  // ---------- Recap ----------
  s30(ctx, t, q) { decor(ctx, 'stal', 0.6); const g = GROND, P = 1.3;
    persoon(ctx, 'henk', 230, g, 172 * P, { t, kijk: 1, uit: 'blij' }); hek(ctx, 90, 380, g - 4, 130); persoon(ctx, 'yasmin', 470, g + 6, 165 * P, { t, kijk: 1, outfit: 'stal', uit: 'blij' });
    rund(ctx, 'holstein', 740, g, P, { kijk: -1, t });
    const yb = 800, k = 1 / 19; roundRect(ctx, 900, 180, 360, 680, 18); shape(ctx, rgba('#0D1420', 0.72), null); const r = melkStaven(ctx, 1000, 1150, yb, 110, k, { ex: 1, voer: q.on('voer', 1), fok: q.on('helft', 1) });
    naamBij(ctx, 'fokken', '≈ DE HELFT', 1075, yb - r.h1 - 34, q.on('helft', 1), 'center', C.paars);
    const K = q.on('kozen', 1, 0.8); stamBord(ctx, 1380, 110, 1.05, { vader: 'ster', moeders: 3, top: 1, kalf: 1, t }, 1 - K);
    const kaart = [['jij kiest', 'de ouders', 'kozen', (x, y) => { koeIcoon(ctx, x - 40, y + 26, 50, '#D8DEE6', 1, { bont: 2 }); stierIcoon(ctx, x + 40, y + 26, 50, '#D8DEE6', 1); }],
      ['jij wacht', 'op dochters', 'dochters', (x, y) => { for (let i = 0; i < 4; i++) koeIcoon(ctx, x - 66 + i * 44, y + 26, 34, '#D8DEE6', 1); }],
      ['jij leest', 'het DNA', 'DNA', (x, y) => { roundRect(ctx, x - 80, y - 14, 160, 50, 4); shape(ctx, '#F2EEE4', null); streepjescode(ctx, x - 72, y - 8, 144, 38, 7); }],
      ['jij let', 'op familie', 'familie', (x, y) => { ster(ctx, x - 50, y + 10, 20); ster(ctx, x, y + 10, 20, C.teal); ster(ctx, x + 50, y + 10, 20, C.koraal); }]];
    kaart.forEach(([a1, a2, cue, teken], i) => eindKaart(ctx, 1290 + (i % 2) * 290, 110 + Math.floor(i / 2) * 220, 270, 200, a1, a2, K * q.on(cue, 1), teken));
    const ik = [['kas', icoonKas, 'Kas'], ['bodem', icoonBodem, 'bodem'], ['stal', icoonStal, 'stal']];
    ik.forEach(([lab, fn, cue], i) => { const x = 1360 + i * 200, a = q.on(cue, 1); fn(ctx, x, 640, 1, a); metaA(ctx, lab.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, 730, a, C.text, 'center', 20); });
    tag(ctx, 'overal stuurt een mens wat er groeit', 1580, 800, C.goud, q.on('stuurt', 1), 'center', 28); },

  s31(ctx, t, q) { decor(ctx, 'stal', 0.6); roundRect(ctx, 120, 130, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Waar leer je dit?', 150, 200, 1, C.text, 56, 'left', 700);
    [['mbo', 'Veehouderij', 'O.A. DOETINCHEM', 'mbo'], ['hbo', 'Dier- en Veehouderij', 'DEN BOSCH', 'hbo'], ['wo', 'Animal Sciences', 'ENGELSTALIG · WAGENINGEN', 'universiteit']].forEach(([n, o, m, cue], i) => { const a = i ? q.on(cue, 1) : 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, 120, 280 + i * 165, 1100, 140, 18); shape(ctx, rgba('#0D1420', 0.88), C.groen, 2); text(ctx, n, 170, 365 + i * 165, fTitel(48), C.groen); text(ctx, o, 310, 360 + i * 165, fTekst(44, 700), C.text); metaText(ctx, m, 310, 400 + i * 165, C.grain, 'left', 24); ctx.restore(); });
    laag(ctx, q.on('Daarna', 1), () => { roundRect(ctx, 120, 780, 1100, 76, 14); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'veehouder · inseminator · fokkerijspecialist', 150, 830, 1, C.text, 36, 'left', 600); });
    rund(ctx, 'holstein', 1580, GROND, 1.5, { kijk: -1, t }); }
});
