/* =====================================================================================
   Erfelijkheid · gedeelde bouwstenen voor de lessen 1–3 (28 okt 2026)
   Kleuren zoals in film 1 (Chromosomen): chromosoom van de vader teal, van de moeder oker, genband goud,
   paars = neutraal (nog niet toegewezen) chromosoom. Alles is 1920×1080; a = doorzichtigheid 0..1.
   ===================================================================================== */
const CH = { get vader() { return C.teal; }, get moeder() { return C.oker; }, get neutraal() { return C.paars; } };
const dk = (h, k = 0.35) => mix(h, '#000000', k);
function kruis(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, r * 0.45); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, r, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, r * 0.45); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r * 0.3, y + r * 0.7); ctx.lineTo(x + r, y - r * 0.7); ctx.stroke(); ctx.restore(); }
function zoomRand(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, null, rgba(C.line, 0.8), 4); ctx.restore(); }
// zoomcirkel met inhoud; van = [x,y] waar de stippellijnen vandaan komen
function zoom(ctx, zx, zy, zr, a, van, fn) { if (a <= 0.01) return; if (van) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); const an = Math.atan2(zy - van[1], zx - van[0]); ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.lineTo(zx + Math.cos(an + 1.9) * zr, zy + Math.sin(an + 1.9) * zr); ctx.moveTo(van[0], van[1]); ctx.lineTo(zx + Math.cos(an - 1.9) * zr, zy + Math.sin(an - 1.9) * zr); ctx.stroke(); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.clip(); ctx.fillStyle = C.bg; ctx.fill(); fn(); ctx.restore(); zoomRand(ctx, zx, zy, zr, a); }
// aanwijslijn + naam (de knop Namen verbergen geldt ook hier)
function wijs(ctx, s, x1, y1, x2, y2, a = 1, col = C.text, px = 30, align = 'center') { if (!toonNamen || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); circ(ctx, x2, y2, 4, C.line); ctx.restore(); naam(ctx, s, x1, y1 + (y1 < y2 ? -10 : 34), a, align, col, px); }
// brede kernbalk onderaan (één kernzin of conclusie)
function balk(ctx, s, x, y, w, a = 1, col = C.goud, px = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 52, w, 104, 20); shape(ctx, rgba(col, 0.12), col, 3); ctx.restore(); regel(ctx, s, x, y + 14, a, C.text, px, 'center', 700); }
// zachte, ronde celvorm: geen rechte randen
function blob(ctx, x, y, rx, ry, seed = 1, wob = 0.06) { ctx.beginPath(); for (let i = 0; i <= 64; i++) { const an = i / 64 * 6.283, w = 1 + wob * Math.sin(an * 3 + seed) + wob * 0.6 * Math.sin(an * 5 + seed * 2.1); const px = x + Math.cos(an) * rx * w, py = y + Math.sin(an) * ry * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }
// cel met kern; o.kl = membraankleur, o.kr = kernstraal, o.kdx/kdy = plek van de kern, o.geenKern
function cel(ctx, x, y, rx, ry, a = 1, o = {}) { if (a <= 0.01) return; const kl = o.kl || C.teal; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, rx, ry, o.seed || 1, o.wob == null ? 0.05 : o.wob); shape(ctx, rgba(kl, C.licht ? 0.08 : 0.12), kl, o.lw || 4);
  if (!o.geenKern) { const kx = x + (o.kdx || 0), ky = y + (o.kdy || 0), kr = o.kr || Math.min(rx, ry) * 0.34; circ(ctx, kx, ky, kr, rgba(C.paars, C.licht ? 0.14 : 0.24), C.paars, 2.5); }
  ctx.restore(); }

/* ---------- chromosomen ----------
   chromosoom(ctx, x, y, len, o): (x, y) = centromeer. o.dubbel 0 = één chromatide (één DNA-molecuul, na de meiose of vóór het kopiëren),
   1 = twee zusterchromatiden (X-vorm, vlak voor een deling); tussenwaarden = het kopiëren zelf.
   o.kl kleur, o.rot draaiing (rad), o.w dikte (standaard len·0,16), o.cen plek van het centromeer (0 = boven, 1 = onder; 0,38),
   o.banden = [{p (0..1 van boven), kl, letter, px}] genbanden; de letter staat rechts van het chromosoom (o.letterLinks = links),
   o.uiteen 0..1 = de zusterchromatiden schuiven uit elkaar (anafase meiose II). Geeft de y van elke band terug. */
function chromosoom(ctx, x, y, len, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return []; const kl = o.kl || CH.neutraal, dkl = dk(kl), w = o.w || len * 0.16, cen = o.cen == null ? 0.38 : o.cen;
  const e = ease(clamp(o.dubbel == null ? 1 : o.dubbel, 0, 1)), ui = clamp(o.uiteen || 0, 0, 1), coils = o.coils || Math.max(3, Math.round(len / 40));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const armen = e < 0.02 ? [0] : [-1, 1], bandY = [];
  armen.forEach(k => { const off = k * (w * 0.55 * e + ui * w * 1.4), end = k * w * 0.45 * e * (1 - ui);
    ctx.beginPath(); ctx.moveTo(off + end, -len * cen); ctx.quadraticCurveTo(off, -len * cen * 0.4, off * (0.75 + 0.25 * ui), 0); ctx.quadraticCurveTo(off, len * (1 - cen) * 0.4, off + end, len * (1 - cen));
    ctx.strokeStyle = dkl; ctx.lineWidth = w + 3; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', C.licht ? 0.28 : 0.16); ctx.lineWidth = Math.max(1, w * 0.09);
    for (let q = 0; q < coils * 2; q++) { const u = (q + 0.5) / (coils * 2), yy = -len * cen + u * len, b = Math.abs(yy) / len, cx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * e * b * w * 0.45 * (1 - ui);
      ctx.beginPath(); ctx.ellipse(cx, yy, w * 0.4, w * 0.12, 0.25, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); }
    (o.banden || []).forEach(B => { const by = -len * cen + B.p * len, b = Math.abs(by) / len, bx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * e * b * w * 0.45 * (1 - ui);
      roundRect(ctx, bx - w / 2 - 2, by - w * 0.26, w + 4, w * 0.52, 4); shape(ctx, B.kl || C.goud, dk(B.kl || C.goud, 0.5), 2.5); }); });
  if (e > 0.3 && ui < 0.3) circ(ctx, 0, 0, w * 0.42 * clamp((e - 0.3) / 0.4, 0, 1) * (1 - ui / 0.3), dkl);
  ctx.restore();
  // letters (niet mee gedraaid, zodat ze leesbaar blijven)
  (o.banden || []).forEach(B => { const by = -len * cen + B.p * len, r = o.rot || 0; const px = x - Math.sin(r) * by, py = y + Math.cos(r) * by; bandY.push([px, py]);
    if (B.letter && (o.letterA == null || o.letterA > 0.01)) { const zij = o.letterLinks ? -1 : 1, fx = px + zij * (w * (0.9 + e * 0.6 + ui * 1.4) + 26), fpx = B.px || Math.max(30, Math.min(56, len * 0.2));
      regel(ctx, B.letter, fx, py + fpx * 0.36, a * (o.letterA == null ? 1 : o.letterA), B.letterKl || C.text, fpx, 'center', 700); } });
  return bandY;
}
// homoloog paar: links van de vader (teal), rechts van de moeder (oker). o.allelen = ['A','a'] → banden op o.p (0,66);
// o.dubbel, o.dx (halve afstand), o.label (onder het paar, meta), o.kleur = false → allebei neutraal paars
function paar(ctx, x, y, len, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const dx = o.dx || len * 0.32, al = o.allelen || [], p = o.p == null ? 0.66 : o.p;
  [0, 1].forEach(i => { const kl = o.kleur === false ? CH.neutraal : (i ? CH.moeder : CH.vader); const banden = al[i] ? [{ p, letter: al[i], letterKl: o.letterKl ? o.letterKl(al[i]) : C.text }] : (o.band ? [{ p }] : []);
    chromosoom(ctx, x + (i ? dx : -dx), y, len, { kl, dubbel: o.dubbel == null ? 1 : o.dubbel, a, banden, letterLinks: i === 0, w: o.w, cen: o.cen, letterA: o.letterA }); });
  if (o.label) metaText(ctx, o.label, x, y + len * (1 - (o.cen == null ? 0.38 : o.cen)) + 48, C.text2, 'center', 22, a); }

/* ---------- allelen, gameten, genotypen ---------- */
// allelChip: genotype in een kaartje, bv. 'Aa'; o.px letterhoogte, o.kl randkleur, o.acc = index van de letter met gouden ring
function allelChip(ctx, s, x, y, a = 1, o = {}) { if (a <= 0.01) return; const px = o.px || 46, chars = [...s], w = Math.max(px * 1.9, chars.length * px * 0.82 + px * 0.6), h = px * 1.4; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, o.vul || rgba(C.fill, C.licht ? 0.9 : 0.8), o.kl || rgba(C.line, 0.8), o.kl ? 3 : 1.5);
  ctx.restore(); regel(ctx, s, x, y + px * 0.35, a, o.tkl || C.text, px, 'center', 700);
  if (o.acc != null && o.acc >= 0) { ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const tw = ctx.measureText(s).width; let off = x - tw / 2; for (let i = 0; i < o.acc; i++) off += ctx.measureText(chars[i]).width; const cw = ctx.measureText(chars[o.acc]).width; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(off + cw / 2, y + 2, px * 0.48, 0, 6.283); ctx.stroke(); ctx.restore(); } }
// genotype van twee gameten: 'A' + 'a' → 'Aa'; 'GR' + 'gr' → 'GgRr' (per gen hoofdletter eerst). Voor Xᴺ, Iᴬ enz.: geef de cel zelf op in kruisSchema.
function genotypeVan(g1, g2) { const a = [...g1], b = [...g2]; return a.map((c, i) => { const d = b[i] || ''; return (c === c.toUpperCase() || d !== d.toUpperCase()) ? c + d : d + c; }).join(''); }
// gameet: o.soort 'ei' (groter, oker rand), 'zaad' (kleiner, met staart) of 'cel' (neutraal rondje); inhoud = tekst in de kern
function gameet(ctx, x, y, r, inhoud, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const soort = o.soort || 'cel', kl = o.kl || (soort === 'ei' ? C.koraal : soort === 'zaad' ? C.teal : C.text2); ctx.save(); ctx.globalAlpha *= a;
  if (soort === 'zaad') { ctx.strokeStyle = kl; ctx.lineWidth = Math.max(2, r * 0.1); ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24, px = x + r * 0.95 + u * r * 2.2, py = y + Math.sin(u * 8 - (o.t || 0) * 6) * r * 0.16 * u; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.78, 0, 0, 6.283); shape(ctx, rgba(kl, C.licht ? 0.12 : 0.18), kl, 3); }
  else { if (soort === 'ei') circ(ctx, x, y, r * 1.14, rgba(C.oker, 0.1), rgba(C.oker, 0.55), 2); circ(ctx, x, y, r, rgba(kl, C.licht ? 0.1 : 0.16), kl, 3); }
  ctx.restore(); if (inhoud) regel(ctx, inhoud, x, y + (o.px || r * 0.62) * 0.36, a, o.tkl || C.text, o.px || r * 0.62, 'center', 700); }

/* ---------- kruisingsschema ----------
   kruisSchema(ctx, x, y, o): (x, y) = linkerbovenhoek van het rooster (zonder kopjes).
   o.links = gameten links (één ouder), o.boven = gameten boven (andere ouder), o.vak = grootte van een vakje (130),
   o.prog = 0..1 hoeveel vakjes al gevuld zijn (leesvolgorde), o.cel(i, j, g) → {t, vul, kl, rand} voor vakje rij i, kolom j (g = automatisch genotype),
   o.kopLinks / o.kopBoven = kopje bij de gameten (bv. 'zaadcellen'), o.klLinks / o.klBoven = kleur van de gameten, o.a, o.px = letterhoogte.
   Geeft {x0, y0, vak, midden(i,j)} terug. */
function kruisSchema(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a, L = o.links || [], B = o.boven || [], v = o.vak || 130, n = L.length * B.length, px = o.px || Math.round(v * 0.32);
  const kL = o.klLinks || CH.vader, kB = o.klBoven || CH.moeder, mid = (i, j) => [x + j * v + v / 2, y + i * v + v / 2];
  if (a <= 0.01) return { x0: x, y0: y, vak: v, midden: mid };
  B.forEach((g, j) => { const ga = a * (o.gametA ? o.gametA('b', j) : 1); gameet(ctx, x + j * v + v / 2, y - v * 0.5, v * 0.3, g, { soort: o.soortBoven || 'cel', kl: kB, a: ga, px: px * 0.85 }); });
  L.forEach((g, i) => { const ga = a * (o.gametA ? o.gametA('l', i) : 1); gameet(ctx, x - v * 0.5, y + i * v + v / 2, v * 0.3, g, { soort: o.soortLinks || 'cel', kl: kL, a: ga, px: px * 0.85 }); });
  if (o.kopBoven) metaText(ctx, o.kopBoven, x + B.length * v / 2, y - v * 1.02, kB, 'center', 22, a);
  if (o.kopLinks) { ctx.save(); ctx.translate(x - v * 1.02, y + L.length * v / 2); ctx.rotate(-Math.PI / 2); metaText(ctx, o.kopLinks, 0, 0, kL, 'center', 22, a); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, B.length * v, L.length * v, 10); shape(ctx, rgba(C.fill, C.licht ? 0.35 : 0.3), rgba(C.line, 0.7), 2);
  ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 2; for (let j = 1; j < B.length; j++) { ctx.beginPath(); ctx.moveTo(x + j * v, y); ctx.lineTo(x + j * v, y + L.length * v); ctx.stroke(); } for (let i = 1; i < L.length; i++) { ctx.beginPath(); ctx.moveTo(x, y + i * v); ctx.lineTo(x + B.length * v, y + i * v); ctx.stroke(); } ctx.restore();
  const prog = o.prog == null ? 1 : o.prog;
  for (let i = 0; i < L.length; i++) for (let j = 0; j < B.length; j++) { const k = i * B.length + j, e = clamp(prog * n - k, 0, 1); if (e <= 0.01) continue; const g = genotypeVan(String(L[i]), String(B[j])), c = o.cel ? (o.cel(i, j, g) || {}) : {}; const [cx, cy] = mid(i, j);
    if (c.vul) { ctx.save(); ctx.globalAlpha *= a * e; roundRect(ctx, x + j * v + 5, y + i * v + 5, v - 10, v - 10, 8); shape(ctx, c.vul, c.rand || null, 3); ctx.restore(); }
    if (c.teken) c.teken(ctx, cx, cy, a * e); else regel(ctx, c.t == null ? g : c.t, cx, cy + (c.px || px) * 0.35, a * e, c.kl || C.text, c.px || px, 'center', 700); }
  return { x0: x, y0: y, vak: v, midden: mid }; }
// verhoudingsbalk: delen = [{n, kl, label}], label onder elk deel; o.tekst = '3 : 1' erboven
function verhouding(ctx, x, y, w, h, delen, a = 1, o = {}) { if (a <= 0.01) return; const tot = delen.reduce((s, d) => s + d.n, 0); let xx = x; ctx.save(); ctx.globalAlpha *= a;
  delen.forEach((d, i) => { const dw = w * d.n / tot; roundRect(ctx, xx + 2, y, dw - 4, h, 10); shape(ctx, rgba(d.kl, 0.55), d.kl, 2.5); xx += dw; }); ctx.restore(); xx = x;
  delen.forEach(d => { const dw = w * d.n / tot; if (d.label) regel(ctx, d.label, xx + dw / 2, y + h + 40, a, C.text2, o.px || 28, 'center', 600); if (d.in) regel(ctx, d.in, xx + dw / 2, y + h / 2 + 13, a, C.text, 36, 'center', 700); xx += dw; });
  if (o.tekst) regel(ctx, o.tekst, x + w / 2, y - 22, a, o.kl || C.goud, o.tpx || 44, 'center', 700); }

/* ---------- planten, dieren ---------- */
// erwtenplant: stengel met blaadjes, ranken en een paar vlinderbloemen; kl = bloemkleur (paars of wit); o.h hoogte; o.peul = toon peulen
const BLOEM = { get paars() { return C.licht ? '#8E5BB8' : '#B58BD9'; }, get wit() { return C.licht ? '#F4F2EC' : '#F2F2EE'; }, get rood() { return C.licht ? '#C9374A' : '#E0566A'; }, get roze() { return C.licht ? '#E89AB0' : '#F0A8C0'; } };
function vlinderbloem(ctx, x, y, r, kl, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, -r * 0.35, r * 0.85, r * 0.7, 0, 0, 6.283); shape(ctx, kl, dk(kl, 0.25), 2); ctx.beginPath(); ctx.ellipse(-r * 0.32, r * 0.25, r * 0.42, r * 0.36, -0.4, 0, 6.283); shape(ctx, mix(kl, '#000000', 0.08), dk(kl, 0.25), 2); ctx.beginPath(); ctx.ellipse(r * 0.32, r * 0.25, r * 0.42, r * 0.36, 0.4, 0, 6.283); shape(ctx, mix(kl, '#000000', 0.08), dk(kl, 0.25), 2); ctx.restore(); }
function erwtPlant(ctx, x, y, h, kl, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const T = o.t || 0, st = C.licht ? '#3F7D4A' : '#6FAE7A', bl = C.licht ? '#5C9A5E' : '#7FC48F'; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // pot
  ctx.beginPath(); ctx.moveTo(x - h * 0.16, y - h * 0.14); ctx.lineTo(x + h * 0.16, y - h * 0.14); ctx.lineTo(x + h * 0.12, y); ctx.lineTo(x - h * 0.12, y); ctx.closePath(); shape(ctx, C.licht ? '#B8865B' : '#8A6446', dk(C.licht ? '#B8865B' : '#8A6446', 0.3), 2);
  const sway = Math.sin(T * 1.2 + x * 0.01) * h * 0.012; const pts = [[x, y - h * 0.14], [x - h * 0.03 + sway, y - h * 0.45], [x + h * 0.02 + sway * 1.5, y - h * 0.75], [x + sway * 2, y - h * 0.97]];
  lijnPad(ctx, pts, st, Math.max(3, h * 0.02));
  [[0.3, -1], [0.45, 1], [0.6, -1], [0.75, 1]].forEach(([u, s]) => { const [bx, by] = padPunt(gladC(pts), padLengte(gladC(pts)).slice(-1)[0] * u); ctx.beginPath(); ctx.ellipse(bx + s * h * 0.07, by, h * 0.07, h * 0.035, s * 0.4, 0, 6.283); shape(ctx, bl, dk(bl, 0.3), 1.5);
    ctx.strokeStyle = st; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - s * h * 0.01, by - h * 0.02); ctx.bezierCurveTo(bx - s * h * 0.08, by - h * 0.08, bx - s * h * 0.12, by - h * 0.02, bx - s * h * 0.09, by - h * 0.06); ctx.stroke(); });
  if (o.peul) { [[0.52, 1], [0.68, -1]].forEach(([u, s]) => { const [bx, by] = padPunt(gladC(pts), padLengte(gladC(pts)).slice(-1)[0] * u); ctx.save(); ctx.translate(bx + s * h * 0.06, by + h * 0.04); ctx.rotate(s * 0.9); ctx.beginPath(); ctx.ellipse(0, 0, h * 0.08, h * 0.022, 0, 0, 6.283); shape(ctx, bl, dk(bl, 0.35), 2); ctx.restore(); }); }
  const top = pts[3]; [[0, 0, 0], [-h * 0.07, h * 0.08, -0.5], [h * 0.07, h * 0.12, 0.5]].forEach(([dx, dy, r]) => vlinderbloem(ctx, top[0] + dx, top[1] + dy, h * 0.055, kl, r));
  ctx.restore(); }
// erwt: o.geel (anders groen), o.rimpel (gerimpeld, anders rond)
function erwt(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kl = o.geel === false ? (C.licht ? '#6FA84A' : '#8CC66A') : (C.licht ? '#E3B92E' : '#F0CB4A'); ctx.save(); ctx.globalAlpha *= a;
  if (o.rimpel) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283, rr = r * (0.86 + 0.08 * Math.sin(an * 7 + 1) + 0.04 * Math.sin(an * 13)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.92; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, kl, dk(kl, 0.35), 2);
    ctx.strokeStyle = rgba(dk(kl, 0.4), 0.7); ctx.lineWidth = Math.max(1.2, r * 0.07); [[-0.4, -0.2, 0.5], [0.1, 0.3, 0.45], [0.3, -0.35, 0.35]].forEach(([dx, dy, l]) => { ctx.beginPath(); ctx.moveTo(x + dx * r, y + dy * r); ctx.quadraticCurveTo(x + (dx + l * 0.5) * r, y + (dy + 0.15) * r, x + (dx + l) * r, y + dy * r); ctx.stroke(); }); }
  else { circ(ctx, x, y, r, kl, dk(kl, 0.35), 2); circ(ctx, x - r * 0.3, y - r * 0.32, r * 0.25, rgba('#FFFFFF', 0.35)); }
  ctx.restore(); }
// leeuwenbek: bloemtros op een steel; kl = bloemkleur
function leeuwenbek(ctx, x, y, h, kl, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const st = C.licht ? '#3F7D4A' : '#6FAE7A'; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = st; ctx.lineWidth = Math.max(3, h * 0.02); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h * 0.95); ctx.stroke();
  [[0.3, -1], [0.42, 1], [0.22, 1]].forEach(([u, s]) => { ctx.beginPath(); ctx.ellipse(x + s * h * 0.06, y - h * u, h * 0.07, h * 0.022, s * -0.5, 0, 6.283); shape(ctx, C.licht ? '#5C9A5E' : '#7FC48F', null); });
  for (let i = 0; i < 6; i++) { const u = 0.55 + i * 0.075, s = i % 2 ? 1 : -1, bx = x + s * h * 0.045, by = y - h * u, r = h * (0.07 - i * 0.006); ctx.beginPath(); ctx.ellipse(bx, by, r, r * 0.8, 0, 0, 6.283); shape(ctx, kl, dk(kl, 0.3), 2); ctx.beginPath(); ctx.ellipse(bx + s * r * 0.6, by + r * 0.35, r * 0.5, r * 0.35, 0, 0, 6.283); shape(ctx, mix(kl, '#FFFFFF', 0.25), dk(kl, 0.3), 1.5); }
  ctx.restore(); }
// muis van opzij; kl = vachtkleur, kijk 1 = naar rechts
function muis(ctx, x, y, s, kl, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s);
  ctx.strokeStyle = dk(kl, 0.3); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-58, 10); ctx.bezierCurveTo(-100, 20, -110, -20, -140, -5); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-5, 0, 62, 36, 0, 0, 6.283); shape(ctx, kl, dk(kl, 0.3), 2.5); ctx.beginPath(); ctx.ellipse(52, -8, 32, 24, 0.2, 0, 6.283); shape(ctx, kl, dk(kl, 0.3), 2.5);
  ctx.beginPath(); ctx.moveTo(72, -18); ctx.lineTo(92, -2); ctx.lineTo(70, 6); ctx.closePath(); shape(ctx, kl, dk(kl, 0.3), 2); circ(ctx, 92, -2, 4, C.licht ? '#C97A7A' : '#E0A0A0');
  circ(ctx, 42, -36, 16, mix(kl, '#E8B0B0', 0.4), dk(kl, 0.3), 2); circ(ctx, 66, -14, 4.5, '#121A26'); [[-30, 34], [25, 34]].forEach(([fx, fy]) => { ctx.beginPath(); ctx.ellipse(fx, fy, 12, 5, 0, 0, 6.283); shape(ctx, mix(kl, '#E8B0B0', 0.5), null); }); ctx.restore(); }
// fruitvlieg van boven: o.zwart = zwart lijf (anders grijs/bruin), o.stomp = vleugelstompjes (anders normale vleugels)
function vlieg(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const lijf = o.zwart ? (C.licht ? '#2A2A30' : '#1C1C22') : (C.licht ? '#A88A5C' : '#B8996A'); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
  ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; [-1, 1].forEach(k => [[-10, -30], [0, -34], [10, -28]].forEach(([dy, l]) => { ctx.beginPath(); ctx.moveTo(k * 8, dy); ctx.lineTo(k * l * 0.9, dy + 14); ctx.stroke(); }));
  const vl = rgba(C.licht ? '#9FC3D8' : '#CFE6F5', 0.45), vr = rgba(C.line, 0.8);
  [-1, 1].forEach(k => { ctx.save(); ctx.rotate(k * 0.35); ctx.beginPath(); if (o.stomp) ctx.ellipse(k * 16, 6, 9, 16, k * 0.4, 0, 6.283); else ctx.ellipse(k * 22, 30, 15, 46, k * 0.25, 0, 6.283); shape(ctx, vl, vr, 1.5); ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(0, 26, 13, 28, 0, 0, 6.283); shape(ctx, lijf, dk(lijf, 0.3), 2); for (let k = 0; k < 4; k++) { ctx.strokeStyle = rgba(dk(lijf, 0.5), 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 18 + k * 9); ctx.lineTo(12, 18 + k * 9); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -4, 12, 14, 0, 0, 6.283); shape(ctx, lijf, dk(lijf, 0.3), 2); circ(ctx, 0, -26, 10, lijf, dk(lijf, 0.3), 2); [-1, 1].forEach(k => circ(ctx, k * 9, -28, 6.5, C.licht ? '#B5302A' : '#D9443A')); ctx.restore(); }
// rode bloedcel met antigenen: o.A, o.B (true/false). A = goud vertakt suikerketentje, B = teal
function rodeBloedcel(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const rb = C.licht ? '#D9675A' : '#E07A5F'; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r, 0, 0, 6.283); shape(ctx, rgba(rb, 0.85), dk(rb, 0.3), 3); ctx.beginPath(); ctx.ellipse(x, y, r * 0.5, r * 0.5, 0, 0, 6.283); shape(ctx, rgba(dk(rb, 0.25), 0.35), null);
  const soorten = [o.A ? 'A' : null, o.B ? 'B' : null].filter(Boolean), n = soorten.length ? 10 : 0;
  for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.2, s = soorten[i % soorten.length], kl = s === 'A' ? C.goud : C.teal, bx = x + Math.cos(an) * r, by = y + Math.sin(an) * r, ex = x + Math.cos(an) * r * 1.22, ey = y + Math.sin(an) * r * 1.22;
    ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke(); if (s === 'A') { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an - 0.6) * r * 0.12, ey + Math.sin(an - 0.6) * r * 0.12); ctx.moveTo(ex, ey); ctx.lineTo(ex + Math.cos(an + 0.6) * r * 0.12, ey + Math.sin(an + 0.6) * r * 0.12); ctx.stroke(); circ(ctx, ex, ey, r * 0.045, kl); }
    else { roundRect(ctx, ex - r * 0.05, ey - r * 0.05, r * 0.1, r * 0.1, 2); shape(ctx, kl, null); circ(ctx, ex + Math.cos(an) * r * 0.1, ey + Math.sin(an) * r * 0.1, r * 0.04, kl); } }
  ctx.restore(); }

/* ---------- stambomen ----------
   stamPersoon(ctx, x, y, r, o): o.m = man (vierkant) anders vrouw (rondje), o.ziek = ingekleurd, o.drager = half ingekleurd (alleen als je het al weet),
   o.label = tekst bij het symbool (genotype of naam), o.labelZij = 'onder' | 'boven' | 'links' | 'rechts', o.nr = kleine code linksboven (II-3), o.hl = gouden ring (nadruk), o.kl = kleur van de eigenschap */
function stamPersoon(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kl = o.kl || C.koraal; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); if (o.m) { roundRect(ctx, x - r, y - r, 2 * r, 2 * r, r * 0.12); } else ctx.arc(x, y, r, 0, 6.283); };
  pad(); shape(ctx, o.ziek ? kl : (C.licht ? '#FFFFFF' : C.bg), C.text, 3);
  if (o.drager && !o.ziek) { ctx.save(); pad(); ctx.clip(); ctx.fillStyle = rgba(kl, 0.55); ctx.fillRect(x, y - r, r, 2 * r); ctx.restore(); pad(); shape(ctx, null, C.text, 3); }
  if (o.hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); if (o.m) roundRect(ctx, x - r - 9, y - r - 9, 2 * r + 18, 2 * r + 18, r * 0.2); else ctx.arc(x, y, r + 9, 0, 6.283); ctx.globalAlpha *= o.hl; ctx.stroke(); }
  ctx.restore(); if (o.vraag) regel(ctx, '?', x, y + r * 0.42, a, C.goud, r * 1.2, 'center', 700);
  if (o.label) { const lp = o.labelPx || 30, z = o.labelZij || 'onder', lx = z === 'links' ? x - r - 14 : z === 'rechts' ? x + r + 14 : x, ly = z === 'onder' ? y + r + lp + 8 : z === 'boven' ? y - r - 14 : y + lp * 0.36;
    regel(ctx, o.label, lx, ly, a * (o.labelA == null ? 1 : o.labelA), o.labelKl || C.text, lp, z === 'links' ? 'right' : z === 'rechts' ? 'left' : 'center', 700); }
  if (o.nr) regel(ctx, o.nr, x - r - 6, y - r - 6, a, C.text2, 20, 'right', 500); }
// partnerlijn tussen twee personen (x1, x2 = middelpunten), r = straal van het symbool
function stamPaar(ctx, x1, x2, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 + r, y); ctx.lineTo(x2 - r, y); ctx.stroke(); ctx.restore(); }
// lijnen van een paar (midden xm, hoogte y) naar kinderen op hoogte yk (xs = middelpunten), r = straal
function stamKinderen(ctx, xm, y, xs, yk, r, a = 1) { if (a <= 0.01 || !xs.length) return; const ym = (y + yk - r) / 2; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xm, y); ctx.lineTo(xm, ym); ctx.moveTo(Math.min(xm, ...xs), ym); ctx.lineTo(Math.max(xm, ...xs), ym); xs.forEach(x => { ctx.moveTo(x, ym); ctx.lineTo(x, yk - r); }); ctx.stroke(); ctx.restore(); }

/* ---------- tellen en kansen ---------- */
// vaste pseudo-toevalsreeks (zelfde beeld bij elke keer afspelen)
function toeval(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// stippenveld: n stippen in een raster binnen (x, y, w, h); kl(i) = kleur van stip i; zicht = aantal stippen dat al te zien is
function stippen(ctx, x, y, w, h, n, kl, a = 1, o = {}) { if (a <= 0.01) return; const r = o.r || Math.max(3, Math.sqrt(w * h / n) * 0.36), kol = Math.max(1, Math.round(Math.sqrt(n * w / h))), rijen = Math.ceil(n / kol), dx = w / kol, dy = h / rijen, zicht = o.zicht == null ? n : o.zicht;
  ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < Math.min(n, zicht); i++) { const c = i % kol, rr = Math.floor(i / kol); circ(ctx, x + c * dx + dx / 2, y + rr * dy + dy / 2, r, kl(i)); } ctx.restore(); }
// staafdiagram: w = [hoogtes 0..1], o.kl, o.labels (onder de staven), o.as (naam onder de as)
function histogram(ctx, x, y, w, h, waarden, a = 1, o = {}) { if (a <= 0.01) return; const n = waarden.length, bw = w / n; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  waarden.forEach((v, i) => { const bh = h * v * (o.groei == null ? 1 : o.groei); roundRect(ctx, x + i * bw + bw * 0.1, y - bh, bw * 0.8, Math.max(0.1, bh), Math.min(8, bw * 0.2)); shape(ctx, rgba(o.kl || C.teal, 0.55), o.kl || C.teal, 2); }); ctx.restore();
  (o.labels || []).forEach((l, i) => regel(ctx, l, x + i * bw + bw / 2, y + 36, a, C.text2, o.px || 24, 'center', 500)); if (o.as) metaText(ctx, o.as, x + w / 2, y + 80, C.text2, 'center', 20, a); }
// kansbalk: f = deel 0..1 gevuld met kl, tekst ernaast
function kansBalk(ctx, x, y, w, h, f, kl, a = 1, tekst = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, h / 2); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.6), 2); if (f > 0.005) { roundRect(ctx, x, y, Math.max(h, w * f), h, h / 2); shape(ctx, rgba(kl, 0.75), kl, 2); } ctx.restore(); if (tekst) regel(ctx, tekst, x + w + 24, y + h / 2 + 12, a, C.text, 34, 'left', 700); }
// breuk als tekst met streep: teller boven, noemer onder
function breuk(ctx, t, n, x, y, px = 54, a = 1, kl = C.text) { if (a <= 0.01) return; ctx.save(); ctx.font = fTekst(px, 700); const w = Math.max(ctx.measureText(String(t)).width, ctx.measureText(String(n)).width) + 12; ctx.restore(); regel(ctx, String(t), x, y - px * 0.18, a, kl, px, 'center', 700); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = Math.max(3, px * 0.07); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke(); ctx.restore(); regel(ctx, String(n), x, y + px * 0.92, a, kl, px, 'center', 700); }

/* ---------- kaarten ---------- */
function termKaart(ctx, term, uitleg, x, y, a = 1, kl = C.goud, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.font = fTekst(42, 700); const w1 = ctx.measureText(term).width; ctx.font = fTekst(30, 500); const w2 = uitleg ? ctx.measureText(uitleg).width : 0; ctx.restore();
  const bw = w || Math.max(w1, w2) + 64, bh = uitleg ? 124 : 84; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - bw / 2, y, bw, bh, 14); shape(ctx, rgba(C.bg, 0.94), kl, 2.5); ctx.restore();
  regel(ctx, term, x, y + 54, a, kl, 42, 'center', 700); if (uitleg) regel(ctx, uitleg, x, y + 100, a, C.text, 30, 'center', 500); }
function misvatting(ctx, fout, goed, x, y, w, a = 1, g = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 150, 14); shape(ctx, rgba(C.bg, 0.95), rgba(C.line, 0.7), 2); ctx.restore();
  kruis(ctx, x - w / 2 + 50, y + 46, 15, a, C.koraal); regel(ctx, fout, x - w / 2 + 90, y + 58, a, C.text2, 34, 'left', 600);
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.font = fTekst(34, 600); const fw = ctx.measureText(fout).width; ctx.beginPath(); ctx.moveTo(x - w / 2 + 88, y + 46); ctx.lineTo(x - w / 2 + 92 + fw, y + 46); ctx.stroke(); ctx.restore();
  if (g > 0.01) { vink(ctx, x - w / 2 + 50, y + 108, 15, a * g, C.groen); regel(ctx, goed, x - w / 2 + 90, y + 120, a * g, C.text, 34, 'left', 600); } }

/* ---------- vooruitblik (laatste scherm van elke les) ---------- */
function vooruitblik(ctx, S, kop, tegels) {
  const T = S.T, n = tegels.length, w = 380, gap = 40, x0 = 960 - (n * w + (n - 1) * gap) / 2;
  metaText(ctx, 'volgende keer', 960, 250, C.meta, 'center', 24, S.on(0, 0.6));
  text(ctx, kop, 960, 340, fTitel(76), C.goud, 'center');
  tegels.forEach(([titel, sub, f], i) => { const a = S.on(0, 0.6, 0.4 + i * 0.25); if (a <= 0.01) return; const x = x0 + i * (w + gap) + w / 2, y = 640;
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 210, w, 420, 24); shape(ctx, rgba(C.fill, C.licht ? 0.5 : 0.4), rgba(C.line, 0.4), 2); ctx.restore();
    f(ctx, x, y - 60, a, T); regel(ctx, titel, x, y + 110, a, C.text, 34, 'center', 700); if (sub) regel(ctx, sub, x, y + 156, a, C.text2, 26, 'center', 400); });
}
