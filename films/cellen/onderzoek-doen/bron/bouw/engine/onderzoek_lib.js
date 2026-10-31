// Onderzoek doen 2.0 + Kun je onderzoek vertrouwen? — gedeelde tekenobjecten (prompt v13, Part C4 Schema + C3 Macro-nacht).
// Beeldplan (Kamiel 30 okt 2026): CASUS-kaart (klein, oker, linksboven) = voorbeeld; BEGRIP-kaart (groot, gouden haak) = stof.
// Echte personen zonder portret: alleen naam en jaar op de casuskaart, plus hun opstelling of object.
const ON = { geel: '#E3D27A', geelD: '#B9A44E', blad: '#7FC48F', bladD: '#4E9A62', stengel: '#B9DDB0', aarde: '#5A4636', aardeL: '#7A604A',
  bak: '#AFC0D0', papier: '#EDE6D3', papierL: '#F7F2E4', inkt: '#24324D', rood: '#C8463C', zaad: '#8C5A3A', donker: '#0E1522' };

// ---------- kaarten ----------
function casusKaart(ctx, plaats, jaar, a = 1, x = 60, y = 54) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.font = fMeta(26); const s1 = 'CASUS', s2 = plaats + (jaar ? ' · ' + jaar : ''); ctx.font = fTekst(30, 600); const w = Math.max(220, ctx.measureText(s2).width + 56);
  roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(C.oker, 0.12), C.oker, 2);
  text(ctx, s1, x + 26, y + 36, fMeta(22), C.oker); text(ctx, s2, x + 26, y + 76, fTekst(30, 600), C.text); ctx.restore(); }
// begripkaart: grote kaart met term, gouden haak en betekenis. o: {w, px}
function begripKaart(ctx, term, def, x, y, a = 1, o = {}) { if (a <= 0.01) return; const w = o.w || 760, px = o.px || 50; ctx.save(); ctx.globalAlpha *= a;
  ctx.font = fTekst(32, 400); const lines = def ? wrapLines(ctx, def, w - 80) : []; const h = 150 + lines.length * 44;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.55), rgba(C.goud, 0.9), 2);
  text(ctx, 'BEGRIP', x + 40, y + 46, fMeta(22), C.goud); text(ctx, term, x + 40, y + 46 + px + 6, fTitel(px), C.text);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.lineCap = 'round'; const hy = y + 46 + px + 26; ctx.beginPath(); ctx.moveTo(x + 40, hy - 8); ctx.lineTo(x + 40, hy); ctx.lineTo(x + Math.min(w - 40, 40 + ctx.measureText ? 300 : 300), hy); ctx.stroke();
  lines.forEach((l, i) => text(ctx, l, x + 40, hy + 46 + i * 44, fTekst(32, 400), C.text2)); ctx.restore(); return h; }
function wrapLines(ctx, s, maxW) { const ws = s.split(' '); const out = []; let cur = ''; ws.forEach(w => { const tst = cur ? cur + ' ' + w : w; if (ctx.measureText(tst).width > maxW && cur) { out.push(cur); cur = w; } else cur = tst; }); if (cur) out.push(cur); return out; }
// kaartje met een zin (hypothese, verwachting …): label boven, tekst gewrapt
function zinKaart(ctx, label, zin, x, y, w, a = 1, col = C.teal, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 500); const L = wrapLines(ctx, zin, w - 56); const h = 78 + L.length * 40;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(col, 0.1 + 0.12 * hl), col, 2 + 2 * hl); text(ctx, label, x + 28, y + 40, fMeta(22), col);
  L.forEach((l, i) => text(ctx, l, x + 28, y + 82 + i * 40, fTekst(30, 500), C.text)); ctx.restore(); return h; }

// ---------- onderzoeksbord (8 schriftblaadjes) ----------
const STAPPEN = ['waarneming', 'onderzoeksvraag', 'hypothese', 'werkplan', 'uitvoering', 'resultaten', 'conclusie', 'discussie'];
// o: {x,y,w,h, vul:{i:tekst}, actief:i|-1, licht:[i..] 0..1 per stap (array), a, klein}
function bord(ctx, o = {}) { const { x = 120, y = 150, w = 1680, h = 300, vul = {}, actief = -1, a = 1, licht = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 8, gap = 18, bw = (w - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) { const bx = x + i * (bw + gap), la = licht ? clamp(licht[i] ?? 0, 0, 1) : 1; ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * la;
    ctx.save(); ctx.translate(bx + bw / 2, y + h / 2); ctx.rotate((hash(i * 3.3) - 0.5) * 0.03); ctx.translate(-bx - bw / 2, -y - h / 2);
    roundRect(ctx, bx, y, bw, h, 8); shape(ctx, i === actief ? ON.papierL : ON.papier, i === actief ? C.goud : '#C9C0A8', i === actief ? 4 : 1.5);
    ctx.strokeStyle = rgba(ON.rood, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx + 22, y + 8); ctx.lineTo(bx + 22, y + h - 8); ctx.stroke();
    text(ctx, (i + 1) + '', bx + 34, y + 40, fMeta(22), '#8A8070'); { let fs = bw < 180 ? 22 : 26; ctx.font = fTekst(fs, 700); while (fs > 14 && ctx.measureText(STAPPEN[i]).width > bw - 36) { fs--; ctx.font = fTekst(fs, 700); } text(ctx, STAPPEN[i], bx + bw / 2 + 8, y + 76, fTekst(fs, 700), ON.inkt, 'center'); }
    if (vul[i]) { ctx.font = fTekst(bw < 180 ? 20 : 23, 400); wrapLines(ctx, vul[i], bw - 40).slice(0, 6).forEach((l, k) => text(ctx, l, bx + 30, y + 118 + k * 30, fTekst(bw < 180 ? 20 : 23, 400), '#3B4660')); }
    ctx.restore(); ctx.restore(); }
  ctx.restore(); return { bw, gap }; }

// ---------- kiemproef ----------
// één tuinkerskiemplantje: o: {len, groei 0..1, etio (lang dun geel), buig}
function kiemplant(ctx, x, y, len, o = {}) { const { groei = 1, etio = 0, buig = 0, a = 1 } = o; if (groei <= 0.01 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = len * groei * (1 + etio * 1.4), stg = _mixHexOn(ON.stengel, '#EDE3A6', etio), bl = _mixHexOn(ON.blad, ON.geel, etio);
  const tx = x + buig * L * 0.25, ty = y - L; ctx.strokeStyle = stg; ctx.lineWidth = Math.max(1.5, len * 0.045 * (1 - etio * 0.4)); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + buig * L * 0.35, y - L * 0.55, tx, ty); ctx.stroke();
  if (groei > 0.35) { const s = len * 0.16 * clamp((groei - 0.35) / 0.65, 0, 1) * (1 - etio * 0.45); [-1, 1].forEach(k => { ctx.save(); ctx.translate(tx, ty); ctx.rotate(k * (0.55 + etio * 0.2));
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(k * s * 0.4, -s * 0.9, k * s * 1.6, -s * 1.0, k * s * 1.7, -s * 0.2); ctx.bezierCurveTo(k * s * 1.75, s * 0.35, k * s * 0.7, s * 0.4, 0, 0); // niervormig zaadlobje
      ctx.fillStyle = bl; ctx.fill(); ctx.strokeStyle = _mixHexOn(bl, '#000000', 0.25); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }); }
  ctx.restore(); }
function _mixHexOn(a, b, u) { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); const m = s => Math.round(((A >> s) & 255) * (1 - u) + ((B >> s) & 255) * u); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
// bakje met watten en zaadjes; o: {w, n, gekiemd 0..1 (aandeel), groei 0..1, etio 0..1, seed, label, donker (doos erover 0..1), a}
function bakje(ctx, x, y, o = {}) { const { w = 300, n = 18, gekiemd = 0, groei = 1, etio = 0, seed = 1, label = null, donker = 0, a = 1, len = 70, labelCol = C.text } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hgt = w * 0.2; // bakje (doorzichtig, lijntekening)
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - hgt); ctx.lineTo(x - w / 2 + 10, y); ctx.lineTo(x + w / 2 - 10, y); ctx.lineTo(x + w / 2, y - hgt); ctx.strokeStyle = ON.bak; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fillRect(x - w / 2 + 8, y - hgt * 0.42, w - 16, hgt * 0.36); // watten
  const kiem = Math.round(n * gekiemd);
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, sx = x - w / 2 + 18 + u * (w - 36) + (hash(i * 7 + seed) - 0.5) * 8, sy = y - hgt * 0.42 - 2;
    const isK = hash(i * 13 + seed * 5) < gekiemd + 1e-6 || i < 0 ? true : (i < kiem && hash(i * 13 + seed * 5) < 2);
    if (i < kiem) kiemplant(ctx, sx, sy, len * (0.8 + 0.4 * hash(i * 3 + seed)), { groei: clamp(groei * (1.15 - 0.3 * hash(i + seed)), 0, 1), etio, buig: (hash(i * 5 + seed) - 0.5) * 0.8 });
    ctx.beginPath(); ctx.ellipse(sx, sy, 4.5, 3, 0.3, 0, 6.283); ctx.fillStyle = ON.zaad; ctx.fill(); }
  if (donker > 0.01) { ctx.save(); ctx.globalAlpha *= donker; const dh = len * 2.9 + hgt; roundRect(ctx, x - w / 2 - 14, y - dh, w + 28, dh + 10, 10); shape(ctx, rgba(ON.donker, 0.82), '#3A4660', 2); ctx.restore(); }
  if (label) text(ctx, label, x, y + 46, fTekst(30, 600), labelCol, 'center'); ctx.restore(); }
// vensterbank (Schema-decor): raamkozijn en plank
function vensterbank(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#4A5A78'; ctx.lineWidth = 3; ctx.strokeRect(x, y - 430, w, 420); ctx.beginPath(); ctx.moveTo(x + w / 2, y - 430); ctx.lineTo(x + w / 2, y - 10); ctx.stroke();
  ctx.fillStyle = rgba('#7FA6C9', 0.08); ctx.fillRect(x + 3, y - 427, w - 6, 414); roundRect(ctx, x - 30, y - 10, w + 60, 22, 6); shape(ctx, '#3A4A66', '#5A6A88', 1.5); ctx.restore(); }
// zon / licht-icoon
function zonIcoon(ctx, x, y, r, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = rgba(col, 0.25); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.35, y + Math.sin(an) * r * 1.35); ctx.lineTo(x + Math.cos(an) * r * 1.8, y + Math.sin(an) * r * 1.8); ctx.stroke(); } ctx.restore(); }

// ---------- meten ----------
function weegschaal(ctx, x, y, s, waarde, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -70, 300, 70, 14); shape(ctx, '#3A4A66', '#8FA0B5', 2); roundRect(ctx, -130, -96, 260, 22, 8); shape(ctx, '#55657F', '#8FA0B5', 1.5);
  roundRect(ctx, -70, -56, 140, 42, 6); shape(ctx, '#0D1420', o.fout ? C.koraal : '#5BA4C9', 1.5); text(ctx, waarde, 36, -24, fMeta(30), o.fout ? C.koraal : '#9FD3F0', 'right'); text(ctx, 'g', 46, -24, fMeta(22), C.text2); if (o.gewicht !== false) { roundRect(ctx, -40, -146, 80, 50, 8); shape(ctx, '#8C9AAE', '#C0CAD8', 1.5); text(ctx, '50 g', 0, -112, fMeta(22), '#1A2740', 'center'); } ctx.restore(); }
// meetlat met de echte waarde en metingen als stippen; mode 'toeval' | 'systematisch'; n = aantal stippen zichtbaar
function stippenLat(ctx, x, y, w, mode, n, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 10, y - 8); ctx.lineTo(x + i * w / 10, y + 8); ctx.stroke(); }
  const xm = x + w / 2; ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xm, y - 90); ctx.lineTo(xm, y + 20); ctx.stroke(); text(ctx, 'echte waarde', xm, y + 56, fMeta(22), C.groen, 'center');
  const off = mode === 'systematisch' ? w * 0.18 : 0, sd = mode === 'systematisch' ? w * 0.04 : w * 0.12; let som = 0, k = 0;
  for (let i = 0; i < Math.floor(n); i++) { const g = (hash(i * 9.1 + (mode === 'systematisch' ? 50 : 0)) + hash(i * 4.7 + 3) + hash(i * 2.3 + 8) - 1.5) * 1.4; const px = xm + off + g * sd; som += px; k++;
    ctx.beginPath(); ctx.arc(px, y - 30 - (i % 3) * 18, 9, 0, 6.283); ctx.fillStyle = mode === 'systematisch' ? C.koraal : C.teal; ctx.fill(); }
  if (k > 3 && o.gem) { const gm = som / k; ctx.strokeStyle = mode === 'systematisch' ? C.koraal : C.teal; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(gm, y - 100); ctx.lineTo(gm, y + 6); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'gemiddelde', gm, y - 112, fMeta(22), mode === 'systematisch' ? C.koraal : C.teal, 'center'); }
  ctx.restore(); }

// ---------- grafieken ----------
// assen; o: {xl, yl, a}
function assen(ctx, x, y, w, h, o = {}) { const a = o.a ?? 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  if (o.xl) text(ctx, o.xl, x + w, y + 54, fMeta(24), C.text2, 'right'); if (o.yl) { ctx.save(); ctx.translate(x - 48, y - h); ctx.rotate(-Math.PI / 2); text(ctx, o.yl, 0, 0, fMeta(24), C.text2, 'right'); ctx.restore(); } ctx.restore(); }
// staven: vals [{v, col, label}], max
function staven(ctx, x, y, w, h, vals, max, a = 1, groei = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = vals.length, bw = w / n * (o.breed || 0.55);
  vals.forEach((d, i) => { const cx = x + (i + 0.5) * w / n, bh = h * d.v / max * clamp(groei, 0, 1); roundRect(ctx, cx - bw / 2, y - bh, bw, bh, 4); shape(ctx, rgba(d.col || C.teal, 0.75), d.col || C.teal, 1.5);
    if (d.label) text(ctx, d.label, cx, y + 40, fTekst(28, 600), C.text, 'center'); if (o.waarde) text(ctx, String(d.v).replace('.', ','), cx, o.waardeIn ? y - 24 : y - bh - 14, fMeta(28), o.waardeIn ? '#0D1420' : C.text, 'center');
    if (d.lo != null && o.spreiding) { const yl = y - h * d.lo / max, yh = y - h * d.hi / max, sa = clamp(o.spreiding, 0, 1); ctx.save(); ctx.globalAlpha *= sa; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, yl); ctx.lineTo(cx, yh); ctx.moveTo(cx - 18, yl); ctx.lineTo(cx + 18, yl); ctx.moveTo(cx - 18, yh); ctx.lineTo(cx + 18, yh); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }
// lijn(en): series [{pts:[[x01,y01]..], col}], tot 0..1 (hoe ver getekend)
function lijnen(ctx, x, y, w, h, series, tot = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; series.forEach(s => { ctx.strokeStyle = s.col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); const N = s.pts.length; const m = Math.max(1, tot * (N - 1));
    for (let i = 0; i <= Math.floor(m); i++) { const p = s.pts[i]; const px = x + p[0] * w, py = y - p[1] * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    const f = m - Math.floor(m), i0 = Math.floor(m); if (f > 0 && i0 + 1 < N) { const p = s.pts[i0], q = s.pts[i0 + 1]; ctx.lineTo(x + lerp(p[0], q[0], f) * w, y - lerp(p[1], q[1], f) * h); } ctx.stroke(); }); ctx.restore(); }
// histogram uit tellingen; o: {col, hl: [i0,i1] gemarkeerde kolommen, hlCol, groei}
function histogram(ctx, x, y, w, h, counts, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = counts.length, max = o.max || Math.max(1, ...counts), bw = w / n;
  counts.forEach((c, i) => { const bh = h * c / max * clamp(o.groei ?? 1, 0, 1); const hl = o.hl && o.hl(i); ctx.fillStyle = hl ? rgba(o.hlCol || C.koraal, 0.85) : rgba(o.col || C.teal, 0.7); ctx.fillRect(x + i * bw + 1, y - bh, bw - 2, bh); }); ctx.restore(); }

// ---------- pijlschema's oorzaak/gevolg ----------
function knoop(ctx, s, x, y, col, a = 1, w = 300) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 44, w, 88, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, s, x, y + 11, fTekst(30, 600), C.text, 'center'); ctx.restore(); }

// ---------- iconen (mens en maatschappij) ----------
function plaatsIcoon(ctx, soort, x, y, s, a = 1, label = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 90 * s, 180 * s, 180 * s, 22 * s); shape(ctx, '#22314E', '#5A6A88', 2);
  ctx.strokeStyle = C.bergTop; ctx.lineWidth = 3 * s; ctx.lineJoin = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 50 * s, y - 40 * s, 100 * s, 90 * s); ctx.beginPath(); ctx.moveTo(x - 60 * s, y - 40 * s); ctx.lineTo(x, y - 75 * s); ctx.lineTo(x + 60 * s, y - 40 * s); ctx.stroke(); ctx.fillStyle = C.koraal; ctx.fillRect(x - 6 * s, y - 25 * s, 12 * s, 40 * s); ctx.fillRect(x - 20 * s, y - 11 * s, 40 * s, 12 * s); }
  if (soort === 'lab') { ctx.beginPath(); ctx.moveTo(x - 18 * s, y - 60 * s); ctx.lineTo(x - 18 * s, y - 10 * s); ctx.lineTo(x - 50 * s, y + 50 * s); ctx.lineTo(x + 50 * s, y + 50 * s); ctx.lineTo(x + 18 * s, y - 10 * s); ctx.lineTo(x + 18 * s, y - 60 * s); ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.6); ctx.beginPath(); ctx.moveTo(x - 36 * s, y + 24 * s); ctx.lineTo(x + 36 * s, y + 24 * s); ctx.lineTo(x + 50 * s, y + 50 * s); ctx.lineTo(x - 50 * s, y + 50 * s); ctx.fill(); }
  if (soort === 'tijdschrift') { ctx.strokeRect(x - 45 * s, y - 60 * s, 90 * s, 120 * s); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 32 * s, y - 34 * s + i * 16 * s); ctx.lineTo(x + (i % 2 ? 20 : 32) * s, y - 34 * s + i * 16 * s); ctx.stroke(); } }
  ctx.restore(); if (label) text(ctx, label, x, y + 90 * s + 40, fTekst(28, 600), C.text, 'center'); }
// pictogram-mens voor groepen en telpoppetjes (C1: menigtes neutraal; telpoppetjes in een grafiek mogen eenvoudig)
function pict(ctx, x, y, h, col = C.mens, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - h * 0.82, h * 0.13, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - h * 0.2, y - h * 0.62); ctx.quadraticCurveTo(x, y - h * 0.7, x + h * 0.2, y - h * 0.62); ctx.lineTo(x + h * 0.16, y - h * 0.18); ctx.lineTo(x + h * 0.1, y); ctx.lineTo(x - h * 0.1, y); ctx.lineTo(x - h * 0.16, y - h * 0.18); ctx.closePath(); ctx.fill(); ctx.restore(); }
function kweekfles(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(70, 0); ctx.lineTo(70, -60); ctx.lineTo(110, -75); ctx.lineTo(130, -75); ctx.lineTo(130, -95); ctx.lineTo(105, -95); ctx.lineTo(65, -90); ctx.lineTo(-90, -90); ctx.closePath(); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = rgba('#E8A0A8', 0.45); ctx.fillRect(-86, -28, 154, 26); for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.ellipse(-80 + hash(i) * 140, -6 - hash(i * 3) * 4, 5, 3, 0, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fill(); } ctx.restore(); }
function formulier(ctx, x, y, s, teken = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -150, 220, 300, 8); shape(ctx, ON.papier, '#C9C0A8', 1.5);
  text(ctx, 'toestemming', 0, -105, fTekst(26, 700), ON.inkt, 'center'); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(-80, -70 + i * 26, 160 - (i % 3) * 30, 6); }
  ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-80, 110); ctx.lineTo(80, 110); ctx.stroke(); if (teken > 0.01) { ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); const N = 30; for (let i = 0; i <= N * teken; i++) { const u = i / N; ctx.lineTo(-70 + u * 140, 100 - Math.sin(u * 14) * 10 * (1 - u * 0.5)); } ctx.stroke(); } ctx.restore(); }
function munt(ctx, x, y, r, kop = true, a = 1, spin = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(Math.max(0.08, Math.abs(Math.cos(spin))), 1); ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fillStyle = '#C9A35C'; ctx.fill(); ctx.strokeStyle = '#8C6A2E'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.78, 0, 6.283); ctx.stroke(); text(ctx, kop ? 'K' : 'M', 0, r * 0.3, fTitel(r * 0.85), '#5A4320', 'center'); ctx.restore(); }
function dobbelsteen(ctx, x, y, s, v, a = 1, col = '#F2F2EE') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - s / 2, y - s / 2, s, s, s * 0.18); shape(ctx, col, '#8FA0B5', 1.5); const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[v];
  ctx.fillStyle = '#1A2740'; P.forEach(([u, w]) => { ctx.beginPath(); ctx.arc(x + u * s * 0.27, y + w * s * 0.27, s * 0.08, 0, 6.283); ctx.fill(); }); ctx.restore(); }
// sigaret
function sigaret(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#F2EEE6'; ctx.fillRect(x, y - 6 * s, 90 * s, 12 * s); ctx.fillStyle = '#C98A3E'; ctx.fillRect(x, y - 6 * s, 26 * s, 12 * s); ctx.fillStyle = C.koraal; ctx.fillRect(x + 90 * s, y - 6 * s, 6 * s, 12 * s); ctx.restore(); }

// ---------- Macro-nacht decor ----------
function nachtDecor(ctx, o = {}) { bg(ctx, 'macro'); ctx.fillStyle = '#243553'; ctx.fillRect(0, 560, W, 520); // horizon twee vlakken
  ctx.fillStyle = C.berg; ctx.beginPath(); ctx.moveTo(0, 600); [[260, 470], [520, 600], [780, 500], [1080, 600], [1400, 450], [1700, 600], [1920, 520], [1920, 620], [0, 620]].forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bgMacroHill; ctx.beginPath(); ctx.moveTo(0, 690); ctx.bezierCurveTo(500, 640, 1300, 720, 1920, 660); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.fill();
  ctx.fillStyle = C.bgMacroFront; ctx.beginPath(); ctx.moveTo(0, 800); ctx.bezierCurveTo(600, 770, 1300, 830, 1920, 790); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.fill();
  if (o.stad) { ctx.fillStyle = '#2B3B5A'; [[120, 120, 200], [300, 90, 160], [1480, 140, 220], [1680, 110, 180]].forEach(([x0, w0, h0]) => ctx.fillRect(x0, 690 - h0, w0, h0)); } }
function eilandDecor(ctx) { bg(ctx, 'macro'); ctx.fillStyle = C.water; ctx.fillRect(0, 640, W, 440); ctx.fillStyle = '#5E5246'; ctx.beginPath(); ctx.moveTo(180, 820); ctx.bezierCurveTo(520, 520, 1300, 520, 1760, 820); ctx.lineTo(1760, 900); ctx.lineTo(180, 900); ctx.fill();
  ctx.fillStyle = '#6E6152'; ctx.beginPath(); ctx.moveTo(640, 640); ctx.bezierCurveTo(820, 560, 1080, 560, 1260, 640); ctx.fill(); }
// berkenspanner (vereenvoudigd silhouet van boven): licht (gespikkeld) of donker
function berkenspanner(ctx, x, y, s, donker, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const kl = donker ? '#2C2B30' : '#DAD3C2', rand = donker ? '#18181B' : '#9E967F'; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(0, -6); ctx.bezierCurveTo(k * 30, -26, k * 52, -14, k * 48, 4); ctx.bezierCurveTo(k * 44, 18, k * 20, 22, 0, 10); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke(); });
  if (!donker) for (let i = 0; i < 26; i++) { const k = i % 2 ? 1 : -1; ctx.fillStyle = '#4A453B'; ctx.beginPath(); ctx.arc(k * (8 + hash(i) * 34), -10 + hash(i * 3) * 22, 1.3, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = donker ? '#141416' : '#8A826E'; ctx.beginPath(); ctx.ellipse(0, 2, 4, 13, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function stam(ctx, x, y0, y1, w, zwart, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = zwart ? '#26262A' : '#CFC9B8'; ctx.fillRect(x - w / 2, y0, w, y1 - y0);
  if (!zwart) for (let i = 0; i < 14; i++) { ctx.fillStyle = '#5E5A50'; ctx.fillRect(x - w / 2 + hash(i) * w * 0.7, y0 + hash(i * 7) * (y1 - y0), w * 0.25, 4); } ctx.restore(); }
