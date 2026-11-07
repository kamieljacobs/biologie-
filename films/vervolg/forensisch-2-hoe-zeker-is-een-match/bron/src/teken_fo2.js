// Wat word jij? · Forensisch onderzoek 2 · Hoe zeker is een match? — eigen tekeningen (25 okt 2026)
// Look: Schema. Rode draad: de balans die het SPOOR weegt (nooit de verdachte), met hypothese 1 links en hypothese 2 rechts.
// Kleuren: goud = focus (Erik in een mengsel, de ander bij overdracht), teal = Bilal / de bewoner, paars = DNA.
// Maten: keukenmes ± 30 cm (heft ± 11 cm); naast een persoon van 420 px (± 1,75 m) is het mes ± 72 px.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, d = 0.7) { return ease((t - t0) / d); }
const PAPIER = '#ECE6D8', INKT = '#1A2740', INKT2 = '#5A6478';
const KL_HEFT = '#6B4A34', KL_HEFT2 = '#57392A', KL_STAAL = '#C9CED6', KL_STAAL2 = '#9AA3B2', KL_METAAL = '#AFC0D0';

// ---------------------------------------------------------------------------------------------
// BALANS (weegschaal met twee schalen). (x, y) = draaipunt boven op de paal. s = schaal.
// o.tilt: 0 = in evenwicht, 1 = links (hypothese 1) helemaal omlaag. o.L / o.R = {naam, sub, kans, aN, aK}
// Namen staan direct onder de schaal (naamBij), de kans eronder. Bekende fout: schalen die met de balk mee kantelen.
function balans(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const tilt = clamp(o.tilt || 0, -1, 1);
  const th = -tilt * 0.3, L = 340 * s, hang = 170 * s, pw = 210 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // voet en paal
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 80 * s, y + 352 * s, 160 * s, 24 * s, 10 * s); shape(ctx, '#2A3A58', KL_METAAL, 2);
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(x, y + 352 * s); ctx.lineTo(x, y); ctx.stroke();
  ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y + 340 * s); ctx.lineTo(x, y + 20 * s); ctx.stroke();
  // wijzer
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(th) * 90 * s, y - Math.cos(th) * 90 * s); ctx.stroke();
  // balk
  const ex = Math.cos(th) * L, ey = Math.sin(th) * L;
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke();
  circ(ctx, x, y, 16 * s, '#2A3A58', KL_METAAL, 3);
  const pan = (px, py, kant) => { // touwtjes + schaal, altijd recht naar beneden
    ctx.strokeStyle = rgba(KL_METAAL, 0.9); ctx.lineWidth = 2.2;
    const by = py + hang; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px + pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px, by - 6 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - pw * 0.52, by); ctx.quadraticCurveTo(px, by + 62 * s, px + pw * 0.52, by); ctx.closePath(); shape(ctx, '#2A3A58', KL_METAAL, 2.5);
    circ(ctx, px, py, 6 * s, KL_METAAL);
    const d = kant < 0 ? o.L : o.R; if (!d) return;
    if (d.vul) d.vul(ctx, px, by, s);
    naamBij(ctx, d.naam, d.sub || '', px, by + 78 * s, d.aN == null ? 1 : d.aN, 'center');
    if (d.kans) { const ak = d.aK == null ? 1 : d.aK; if (ak > 0.01) regel(ctx, d.kans, px, by + 78 * s + (d.sub ? 76 : 50), ak, d.kansKl || C.goud, 34, 'center', 800); } };
  pan(x - ex, y - ey, -1); pan(x + ex, y + ey, 1);
  if (o.titel) metaA(ctx, o.titel, x, y - 110 * s, o.aT == null ? 1 : o.aT, C.grain, 'center', o.titelPx || 26);
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// MES (keukenmes, van opzij, punt naar rechts). (x, y) = overgang heft-lemmet, len = totale lengte.
// heft ± 37 % van de lengte, met drie klinknagels; lemmet staal met snijkant onder en rugje boven.
function mes(ctx, x, y, len, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const rot = o.rot || 0;
  const hl = len * 0.37, bl = len * 0.63, hh = len * 0.085, bh = len * 0.12;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  // lemmet
  ctx.beginPath(); ctx.moveTo(0, -bh * 0.45); ctx.lineTo(bl * 0.82, -bh * 0.38); ctx.quadraticCurveTo(bl * 0.97, -bh * 0.3, bl, -bh * 0.05);
  ctx.quadraticCurveTo(bl * 0.7, bh * 0.62, 0, bh * 0.55); ctx.closePath(); shape(ctx, KL_STAAL, KL_STAAL2, 1.5);
  ctx.strokeStyle = rgba('#FFFFFF', 0.5); ctx.lineWidth = Math.max(1, len * 0.006); ctx.beginPath(); ctx.moveTo(len * 0.02, bh * 0.38); ctx.quadraticCurveTo(bl * 0.6, bh * 0.4, bl * 0.96, -bh * 0.02); ctx.stroke();
  // heft
  roundRect(ctx, -hl, -hh, hl + 4, hh * 2, hh * 0.8); shape(ctx, KL_HEFT, _mixHex(KL_HEFT, '#000000', 0.25), 1.5);
  ctx.fillStyle = KL_HEFT2; ctx.fillRect(-hl * 0.95, hh * 0.25, hl * 0.9, hh * 0.35);
  for (let i = 0; i < 3; i++) circ(ctx, -hl * (0.22 + i * 0.28), 0, Math.max(2, hh * 0.22), '#C9CED6', null);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-2, -bh * 0.5, 6, bh * 1.05); // bolster
  if (o.druppels) { for (const [u, v, r] of [[0.45, 0.1, 0.028], [0.62, 0.0, 0.02]]) circ(ctx, bl * u, bh * v, len * r * 0.5, rgba(C.koraal, 0.9)); }
  if (o.swab) { const sa = o.swab; ctx.save(); ctx.globalAlpha *= sa; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(bl * 0.55, bh * 0.05, bl * 0.2, bh * 0.42, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  // DNA-stippen op het heft: o.stip = [{n, r, col, a}]
  if (o.stip) o.stip.forEach((st, k) => { const sa = st.a == null ? 1 : st.a; if (sa <= 0.01) return;
    for (let i = 0; i < st.n; i++) { const u = hash(i * 7 + k * 31 + (o.seed || 0)), v = hash(i * 13 + k * 17 + (o.seed || 0) + 3);
      circ(ctx, -hl * (0.08 + 0.84 * u), (v - 0.5) * hh * 1.3, st.r, rgba(st.col, 0.95 * sa), rgba('#121A26', 0.6 * sa), 1); } });
  ctx.restore();
}
// bewijszak: doorzichtige zak met rode strook, label en verzegeling; tekent het mes erin
function bewijszak(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, rgba('#DCE5EC', 0.12), rgba('#DCE5EC', 0.7), 2.5);
  ctx.fillStyle = rgba(C.koraal, 0.85); ctx.fillRect(x - w / 2 + 2, y - h / 2 + 2, w - 4, 22);
  mes(ctx, x - w * 0.12, y + h * 0.05, w * 0.78, { druppels: o.druppels, stip: o.stip, rot: -0.05 });
  roundRect(ctx, x + w * 0.12, y + h * 0.18, w * 0.34, h * 0.24, 6); shape(ctx, PAPIER, '#B8B0A0', 1.5);
  text(ctx, 'BEWIJS', x + w * 0.29, y + h * 0.31, fMeta(Math.max(18, h * 0.08)), INKT, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// KRANTENKNIPSEL (verzonnen krant, geen bestaande naam). (x, y) = linksboven.
function krantKnipsel(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { sub = 0, kopHl = 0, streep = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + w / 2, y + h / 2); ctx.rotate(o.rot || -0.015); ctx.translate(-w / 2, -h / 2);
  ctx.beginPath(); ctx.moveTo(0, 6); for (let i = 0; i <= 20; i++) ctx.lineTo(w * i / 20, (i % 2) * 5); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); shape(ctx, PAPIER, '#B8B0A0', 1.5);
  const k = w / 700;
  metaText(ctx, 'binnenland', 34 * k, 52 * k, INKT2, 'left', 22 * k);
  ctx.fillStyle = INKT; ctx.fillRect(34 * k, 66 * k, w - 68 * k, 2);
  text(ctx, 'DNA op mes:', 34 * k, 142 * k, fTitel(62 * k), INKT, 'left');
  text(ctx, '‘Hij was het’', 34 * k, 214 * k, fTitel(62 * k), INKT, 'left');
  if (kopHl > 0.01) { ctx.save(); ctx.globalAlpha *= kopHl; ctx.fillStyle = C.goud; ctx.fillRect(34 * k, 228 * k, 380 * k * kopHl, 6 * k); ctx.restore(); }
  if (sub > 0.01) { ctx.save(); ctx.globalAlpha *= sub; text(ctx, 'Inbraak: bewoner gewond, verdachte opgepakt', 34 * k, 276 * k, fTekst(30 * k, 700), INKT2, 'left'); ctx.restore(); }
  ctx.fillStyle = rgba(INKT2, 0.35); for (let c = 0; c < 2; c++) for (let i = 0; i < 4; i++) ctx.fillRect(34 * k + c * (w / 2 - 10 * k), 312 * k + i * 22 * k, (w / 2 - 50 * k) * (i === 3 ? 0.6 : 1), 8 * k);
  if (streep > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 8 * k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(26 * k, 120 * k); ctx.lineTo(26 * k + (w - 52 * k) * streep, 120 * k + 60 * k * streep); ctx.stroke();
    if (streep > 0.5) { const s2 = (streep - 0.5) * 2; ctx.beginPath(); ctx.moveTo(26 * k, 196 * k); ctx.lineTo(26 * k + 420 * k * s2, 196 * k - 10 * k * s2); ctx.stroke(); } }
  ctx.restore();
}
// dossierkaart met pasfoto (castpersonage via gezichtIcoon)
function dossier(ctx, x, y, id, naam, rol, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const s = o.s || 1;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150 * s, y - 80 * s, 300 * s, 160 * s, 12); shape(ctx, PAPIER, '#B8B0A0', 2);
  gezichtIcoon(ctx, x - 90 * s, y, 1.25 * s, 1, id);
  text(ctx, naam, x - 20 * s, y - 14 * s, fTekst(36 * s, 700), INKT, 'left');
  text(ctx, rol.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x - 20 * s, y + 26 * s, fMeta(22 * s), INKT2, 'left');
  ctx.restore();
}
// getypte notitie (officier van justitie): papier, kop in meta, tekst in mono die verschijnt (typ 0..1)
function notitie(ctx, x, y, w, kop, regels, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const typ = o.typ == null ? 1 : o.typ, px = o.px || 32;
  const h = 96 + regels.length * (px + 16);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0.012);
  roundRect(ctx, 0, 0, w, h, 8); shape(ctx, PAPIER, '#B8B0A0', 2);
  metaText(ctx, kop, 30, 50, INKT2, 'left', 22); ctx.fillStyle = rgba(INKT2, 0.5); ctx.fillRect(30, 64, w - 60, 2);
  const tot = regels.join('').length; let n = Math.floor(tot * typ);
  regels.forEach((r, i) => { const s2 = r.slice(0, Math.max(0, n)); n -= r.length; text(ctx, s2, 30, 112 + i * (px + 16), fMeta(px), INKT, 'left'); });
  if (o.kruis > 0.01) kruis(ctx, w / 2, h / 2, Math.min(w, h) * 0.32, o.kruis, C.koraal);
  ctx.restore(); return h;
}

// ---------------------------------------------------------------------------------------------
// DNA-PROFIEL als rij vakjes: per STR de naam (meta) en twee allelen. Echte locusnamen uit de PowerPlex Fusion 6C-kit.
const LOCI = [['D3S1358', '15 17'], ['vWA', '16 18'], ['D16S539', '11 12'], ['CSF1PO', '10 12'], ['TPOX', '8 11'], ['D8S1179', '13 14'],
              ['D21S11', '29 30'], ['D18S51', '14 16'], ['D2S441', '11 14'], ['D19S433', '13 14'], ['TH01', '6 9.3'], ['FGA', '21 24']];
const LOCI_GRIJS = [4, 7, 10];  // gaven geen uitslag (deelprofiel)
// (x, y) = linksboven; o.grijs 0..1 = de drie grijze vakken grijzen uit; o.amelo 0..1 = vak 'amelogenine X Y' licht op
function strProfiel(ctx, x, y, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { grijs = 0, amelo = 0, cw = 132, ch = 104, gap = 10, per = 6, toon = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  LOCI.forEach(([nm, al], i) => { const u = clamp(toon * LOCI.length - i, 0, 1); if (u <= 0.01) return;
    const cx = x + (i % per) * (cw + gap), cy = y + Math.floor(i / per) * (ch + gap); const g = LOCI_GRIJS.includes(i) ? grijs : 0;
    ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, cx, cy, cw, ch, 10); shape(ctx, g > 0.5 ? '#2A3040' : rgba(C.paars, 0.16), g > 0.5 ? rgba(C.line, 0.4) : rgba(C.paars, 0.8), 1.5);
    text(ctx, nm, cx + cw / 2, cy + 34, fMeta(22), g > 0.5 ? C.text2 : C.grain, 'center');
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; text(ctx, '—', cx + cw / 2, cy + 82, fTekst(36, 700), C.text2, 'center'); ctx.restore(); }
    if (g < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - g; text(ctx, al, cx + cw / 2, cy + 82, fTekst(36, 700), C.text, 'center'); ctx.restore(); }
    ctx.restore(); });
  // amelogenine (geslacht)
  const rows = Math.ceil(LOCI.length / per), ax = x, ay = y + rows * (ch + gap), aw = 2 * cw + gap;
  if (toon > 0.99) { roundRect(ctx, ax, ay, aw, ch * 0.8, 10); shape(ctx, rgba(C.paars, 0.1 + 0.15 * amelo), amelo > 0.5 ? C.goud : rgba(C.paars, 0.6), amelo > 0.5 ? 2.5 : 1.5);
    text(ctx, 'AMELOGENINE', ax + 20, ay + 34, fMeta(22), C.grain, 'left');
    text(ctx, 'X Y', ax + 20, ay + 72, fTekst(32, 700), C.text, 'left');
    if (amelo > 0.01) regel(ctx, 'man', ax + aw - 24, ay + 72, amelo, C.goud, 32, 'right', 800); }
  ctx.restore();
}
// beeldscherm (monitor) met inhoud via callback
function scherm(ctx, x, y, w, h, inhoud, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 16); shape(ctx, '#2A3446', '#5A6478', 2);
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#121A26', null);
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x + w / 2 - 20, y + h + 14, 40, 44); roundRect(ctx, x + w / 2 - 110, y + h + 56, 220, 16, 6); shape(ctx, '#3A4458', null);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); if (inhoud) inhoud(); ctx.restore();
  ctx.restore();
}
// labtafel (rand onderaan, zoals de werkbank in Laboratoriumtechniek)
function labtafel(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#3A4458', 0.85); ctx.fillRect(120, 790, 1680, 16); ctx.fillStyle = rgba('#2A3446', 0.6); ctx.fillRect(120, 806, 1680, 10); ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// NFI-SCHAAL (verbale schaal voor de likelihood ratio) als liniaal met zes vakken
const NFI = [['1 – 2', 'ongeveer even', 'waarschijnlijk'], ['2 – 10', 'iets', 'waarschijnlijker'], ['10 – 100', 'waarschijnlijker', ''],
             ['100 – 10.000', 'veel', 'waarschijnlijker'], ['10.000 – 1 miljoen', 'zeer veel', 'waarschijnlijker'], ['> 1 miljoen', 'extreem veel', 'waarschijnlijker']];
// o.hl = [a0..a5] (0..1 per vak: licht op), o.dim = sterkte van niet-genoemde vakken, o.wijs = index + o.aW: gouden pijl in dat vak met o.waarde
function nfiSchaal(ctx, x, y, w, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const hl = o.hl || [], gap = 8, bw = (w - 5 * gap) / 6, bh = o.bh || 150, dimA = o.dim == null ? 0.45 : o.dim;
  ctx.save(); ctx.globalAlpha *= a;
  NFI.forEach(([r, w1, w2], i) => { const u = hl[i] || 0, bx = x + i * (bw + gap);
    ctx.save(); ctx.globalAlpha *= dimA + (1 - dimA) * u;
    roundRect(ctx, bx, y, bw, bh, 10); shape(ctx, u > 0.5 ? rgba(C.goud, 0.14) : '#2A3A58', u > 0.5 ? C.goud : rgba(C.line, 0.7), u > 0.5 ? 2.5 : 1.5);
    text(ctx, r, bx + bw / 2, y + 38, fTekst(26, 600), C.text2, 'center');
    text(ctx, w1, bx + bw / 2, y + 88, fTekst(w1.length > 13 ? 28 : 32, 700), C.text, 'center');
    if (w2) text(ctx, w2, bx + bw / 2, y + 124, fTekst(24, 600), C.text2, 'center');
    ctx.restore(); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + bh + 14); ctx.lineTo(x + w, y + bh + 14); ctx.stroke();
  for (let i = 0; i <= 6; i++) { const tx = x + i * (bw + gap) - (i === 6 ? gap : 0) - (i > 0 && i < 6 ? gap / 2 : 0); ctx.beginPath(); ctx.moveTo(tx, y + bh + 6); ctx.lineTo(tx, y + bh + 24); ctx.stroke(); }
  if (o.wijs != null && (o.aW || 0) > 0.01) { const bx = x + o.wijs * (bw + gap) + bw * (o.wijsU == null ? 0.5 : o.wijsU); ctx.save(); ctx.globalAlpha *= o.aW;
    pijl(ctx, bx, y - 90, bx, y - 10, C.goud, 1, 5, 18); if (o.waarde) regel(ctx, o.waarde, bx, y - 104, 1, C.goud, 36, 'center', 800); ctx.restore(); }
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// KAART VAN NEDERLAND (vereenvoudigde omtrek, lengte/breedte → px; IJsselmeer en Wadden weggelaten)
const NL = [[3.37, 51.37], [3.9, 51.21], [4.25, 51.37], [4.8, 51.5], [5.1, 51.43], [5.5, 51.3], [5.85, 51.15], [5.65, 50.85], [5.75, 50.76], [6.02, 50.75], [6.08, 50.92],
  [5.9, 51.05], [6.17, 51.2], [6.08, 51.42], [6.2, 51.6], [5.95, 51.8], [6.4, 51.85], [6.75, 51.92], [6.85, 52.12], [7.05, 52.25], [6.7, 52.45], [7.05, 52.62], [7.2, 53.0],
  [7.2, 53.24], [6.9, 53.38], [6.4, 53.43], [5.9, 53.38], [5.4, 53.2], [5.35, 53.05], [4.98, 52.92], [4.75, 52.96], [4.62, 52.45], [4.42, 52.18], [4.1, 52.0], [3.95, 51.85],
  [4.05, 51.74], [3.6, 51.62], [3.45, 51.52]];
function kaartNL(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const k = 160 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  NL.forEach(([lo, la], i) => { const px = x + (lo - 5.3) * 0.62 * k, py = y + (52.1 - la) * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
  ctx.closePath(); shape(ctx, o.vul || '#2A3A58', o.rand || C.line, 2.5);
  ctx.restore();
}
// telpoppetje (alleen in een telling): eenvoudig pictogram
function telpop(ctx, x, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(x, y - h * 0.82, h * 0.16, 0, 6.283); ctx.fill(); roundRect(ctx, x - h * 0.22, y - h * 0.62, h * 0.44, h * 0.62, h * 0.16); ctx.fill(); ctx.restore(); }
// breuk: teller over noemer met streep; (x, y) = midden van de streep
function breuk(ctx, x, y, boven, onder, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const px = o.px || 56, w = o.w || 360, aB = o.aB == null ? 1 : o.aB, aO = o.aO == null ? 1 : o.aO;
  ctx.save(); ctx.globalAlpha *= a;
  regel(ctx, boven, x, y - 24, aB, o.kB || C.text, px, 'center', 800);
  ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke();
  regel(ctx, onder, x, y + px + 14, aO, o.kO || C.text, px, 'center', 800);
  if (o.subB) metaA(ctx, o.subB, x, y - px - 46, aB, C.grain, 'center', 22);
  if (o.subO) metaA(ctx, o.subO, x, y + px + 60, aO, C.grain, 'center', 22);
  ctx.restore();
}
// rechtbank als lijnicoon in een afgeronde rechthoek (Schema, mens-en-maatschappij)
function rechtbankIcoon(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -150, 300, 300, 24); shape(ctx, '#2A3A58', C.line, 2);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-100, -50); ctx.lineTo(0, -105); ctx.lineTo(100, -50); ctx.closePath(); ctx.stroke();
  for (let i = 0; i < 4; i++) { const px = -72 + i * 48; ctx.beginPath(); ctx.moveTo(px, -36); ctx.lineTo(px, 64); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-110, 80); ctx.lineTo(110, 80); ctx.moveTo(-96, -40); ctx.lineTo(96, -40); ctx.stroke();
  ctx.restore();
}
// klok met een wijzer die een stuk van de cirkel vult (minuten)
function klok(ctx, x, y, r, frac, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82); ctx.lineTo(x + Math.sin(an) * r * 0.92, y - Math.cos(an) * r * 0.92); ctx.stroke(); }
  if (frac > 0.001) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.55); ctx.fill(); }
  const an = frac * 6.283; ctx.strokeStyle = INKT; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(an) * r * 0.72, y - Math.cos(an) * r * 0.72); ctx.stroke(); circ(ctx, x, y, 6, INKT);
  ctx.restore(); }
// stripvak met dunne rand en een nummer
function stripVak(ctx, x, y, w, h, nr, a = 1, inhoud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#2A3A58', 0.75), C.line, 2); ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); if (inhoud) inhoud(); ctx.restore();
  metaText(ctx, String(nr), x + 22, y + 40, C.grain, 'left', 26); ctx.restore(); }
// eenvoudige fiets van opzij (wielen ± 70 cm: bij een persoon van 330 px ± 130 px)
function fietsZij(ctx, x, y, s) { ctx.save(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  circ(ctx, x - 70 * s, y - 42 * s, 42 * s, null, '#AFC0D0', 5 * s); circ(ctx, x + 70 * s, y - 42 * s, 42 * s, null, '#AFC0D0', 5 * s);
  ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(x - 70 * s, y - 42 * s); ctx.lineTo(x - 20 * s, y - 100 * s); ctx.lineTo(x + 45 * s, y - 100 * s); ctx.lineTo(x + 70 * s, y - 42 * s);
  ctx.moveTo(x - 20 * s, y - 100 * s); ctx.lineTo(x, y - 42 * s); ctx.lineTo(x + 45 * s, y - 100 * s); ctx.moveTo(x - 70 * s, y - 42 * s); ctx.lineTo(x, y - 42 * s); ctx.stroke();
  ctx.strokeStyle = '#AFC0D0'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 100 * s); ctx.lineTo(x - 26 * s, y - 116 * s); ctx.moveTo(x - 40 * s, y - 118 * s); ctx.lineTo(x - 12 * s, y - 118 * s);
  ctx.moveTo(x + 45 * s, y - 100 * s); ctx.lineTo(x + 50 * s, y - 126 * s); ctx.lineTo(x + 66 * s, y - 128 * s); ctx.stroke(); ctx.restore(); }
// tafeltje (van voren)
function tafel(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x - w / 2, y - h, w, 14, 5); shape(ctx, '#5A4A3E', '#7A6A5A', 1.5); ctx.fillStyle = '#4A3C32'; ctx.fillRect(x - w / 2 + 16, y - h + 14, 12, h - 14); ctx.fillRect(x + w / 2 - 28, y - h + 14, 12, h - 14); ctx.restore(); }
// brood op een plankje
function brood(ctx, x, y, s, gesneden = 0) { ctx.save(); roundRect(ctx, x - 80 * s, y - 10 * s, 160 * s, 12 * s, 4); shape(ctx, '#8C6A4A', null);
  ctx.beginPath(); ctx.ellipse(x - 10 * s, y - 34 * s, 58 * s, 26 * s, 0, Math.PI, 0); ctx.lineTo(x + 48 * s, y - 10 * s); ctx.lineTo(x - 68 * s, y - 10 * s); ctx.closePath(); shape(ctx, '#C98A4A', '#A86A34', 1.5);
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#A86A34'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 40 * s + i * 24 * s, y - 52 * s); ctx.lineTo(x - 30 * s + i * 24 * s, y - 40 * s); ctx.stroke(); }
  if (gesneden > 0.01) { roundRect(ctx, x + 56 * s, y - 50 * s, 14 * s, 40 * s, 4); shape(ctx, '#E8D2A8', '#A86A34', 1.5); }
  ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// PIEKENPATROON van één STR (elektroferogram). Allelen op de x-as; pieken als smalle bergjes.
// PIEKEN: allel, hoogte (0..1), van wie ('joost' | 'onbekend' | 'erik' | 'samen' = joost + onbekend)
const PIEKEN = [[13, 0.88, 'joost'], [14, 0.2, 'erik'], [15, 0.46, 'onbekend'], [16, 1.0, 'samen'], [18, 0.18, 'erik']];
const PK_KL = { joost: C.teal, onbekend: '#AFC0D0', erik: C.goud, samen: C.teal };
// (x, y) = linksonder van de as; o.kl = {joost, onbekend, erik} 0..1 = pieken in de kleur van hun donor; o.hlErik 0..1; o.groei 0..1
function piekenSTR(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { hlErik = 0, groei = 1, naam = 'D8S1179', getallen = 0 } = o, kl = o.kl || {};
  const al0 = 12, al1 = 19, X = v => x + (v - al0) / (al1 - al0) * w;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  metaText(ctx, 'STR ' + naam, x + 14, y - h - 30, C.grain, 'left', 24);
  for (let v = al0 + 1; v < al1; v++) text(ctx, String(v), X(v), y + 36, fTekst(28, 600), C.text2, 'center');
  metaText(ctx, 'allel (lengte)', x + w, y + 72, C.text2, 'right', 22);
  PIEKEN.forEach(([v, hgt, wie], i) => { const g = clamp(groei * 1.6 - i * 0.15, 0, 1); if (g <= 0.01) return; const px = X(v), ph = h * hgt * ease(g);
    const wk = wie === 'samen' ? 'joost' : wie; let col = _mixHex('#8FA0B5', PK_KL[wk], kl[wk] || 0); if (wie === 'erik') col = _mixHex(col, C.goud, hlErik);
    ctx.beginPath(); ctx.moveTo(px - 30, y); ctx.bezierCurveTo(px - 12, y, px - 9, y - ph, px, y - ph); ctx.bezierCurveTo(px + 9, y - ph, px + 12, y, px + 30, y); ctx.closePath();
    shape(ctx, rgba(col, 0.35), col, 3);
    const ko = kl.onbekend || 0; if (wie === 'samen' && ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; const p2 = ph * 0.45; ctx.beginPath(); ctx.moveTo(px - 18, y); ctx.bezierCurveTo(px - 8, y, px - 6, y - p2, px, y - p2); ctx.bezierCurveTo(px + 6, y - p2, px + 8, y, px + 18, y); ctx.closePath(); shape(ctx, rgba('#AFC0D0', 0.55), '#DCE5EC', 2); ctx.restore(); }
    if (wie === 'erik' && hlErik > 0.01) { ctx.save(); ctx.globalAlpha *= hlErik; circ(ctx, px, y - ph - 24, 11, C.goud); ctx.restore(); }
    if (getallen > 0.01) regel(ctx, String(Math.round(hgt * 1800)), px, y - ph - (wie === 'erik' ? 50 : 14), getallen, C.text2, 24, 'center', 600); });
  ctx.restore();
  return X;
}
// raster van alle paren uit een lijst allelen (inclusief twee keer hetzelfde): 5 allelen → 15 paren
function parenRaster(ctx, x, y, allelen, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { licht = 1, erikPaar = '14–18', cw = 150, ch = 70, per = 5 } = o;
  const P = []; for (let i = 0; i < allelen.length; i++) for (let j = i; j < allelen.length; j++) P.push(allelen[i] + '–' + allelen[j]);
  ctx.save(); ctx.globalAlpha *= a;
  P.forEach((p, i) => { const u = clamp(licht * P.length - i, 0, 1); const cx = x + (i % per) * (cw + 12), cy = y + Math.floor(i / per) * (ch + 12); const erik = p === erikPaar;
    roundRect(ctx, cx, cy, cw, ch, 10); shape(ctx, u > 0.5 ? rgba(erik ? C.goud : C.paars, 0.22) : '#2A3A58', u > 0.5 ? (erik ? C.goud : rgba(C.paars, 0.9)) : rgba(C.line, 0.5), 1.5);
    text(ctx, p, cx + cw / 2, cy + 46, fTekst(32, 700), u > 0.5 ? C.text : C.text2, 'center');
    });
  ctx.restore(); return P.length;
}
// opleidingskaartje
function opleiding(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 24);
  text(ctx, naam, x + 26, y + 90, fTekst(naam.length > 30 ? 30 : 36, 700), C.text, 'left');
  text(ctx, waar, x + 26, y + 130, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }

// handdruk: sinds 25 okt 2026 de echte pose 'handdruk' + handdruk() in lib_cast.js
// het spoor boven op de balans: een klein mes
function spoorBalans(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; balans(ctx, x, y, s, o);
  ctx.save(); ctx.globalAlpha *= a * (o.aSpoor == null ? 1 : o.aSpoor); mes(ctx, x - 22 * s, y - 150 * s, 170 * s, { rot: 0 }); if (o.spoorNaam) naamBij(ctx, o.spoorNaam, o.spoorSub || '', x, y - 200 * s, 1, 'center'); ctx.restore(); }
// klein telefoontje in de hand
function telefoon(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.15); roundRect(ctx, -16 * s, -30 * s, 32 * s, 60 * s, 6 * s); shape(ctx, '#2A3446', '#8FA0B5', 2); roundRect(ctx, -12 * s, -25 * s, 24 * s, 46 * s, 3 * s); shape(ctx, rgba('#ECE6D8', 0.85), null); ctx.restore(); }
