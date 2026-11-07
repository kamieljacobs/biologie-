// Wat word jij? · Farmacie 3 · Achter de balie — eigen tekeningen (20 okt 2026)

const MIDDEL = { ibuprofen: C.koraal, ace: C.paars, plas: C.teal, para: C.groen };
const LIJST = ['plastablet', 'ACE-remmer', 'bloeddrukpil (amlodipine)', 'bètablokker', 'maagbeschermer']; // gelijk aan film 1 (amlodipine)
const LIJST_KL = [C.teal, C.paars, C.oker, C.goud, C.groen];

// kast met doosjes achter de balie (achtergrond, gedempt)
function apotheekKast(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.55;
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#22324E', '#33466A', 2); const rows = 3, cols = [C.teal, C.koraal, C.oker, C.paars, C.groen, '#E8E2D4'];
  for (let r = 0; r < rows; r++) { const yy = y + (r + 1) * h / rows; ctx.fillStyle = '#3A4E72'; ctx.fillRect(x, yy - 8, w, 8);
    let xx = x + 16; let k = r * 7; while (xx < x + w - 50) { const bw = 34 + (hash(k) * 30 | 0), bh = 50 + (hash(k + 50) * 40 | 0); ctx.fillStyle = cols[k % cols.length]; ctx.fillRect(xx, yy - 8 - bh, bw, bh); ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(xx, yy - 8 - bh + 10, bw, 8); xx += bw + 8; k++; } }
  ctx.restore(); }
// groen apotheekkruis aan de wand
function apotheekKruis(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.groen; const b = 34 * s, l = 100 * s; roundRect(ctx, x - b / 2, y - l / 2, b, l, 6); ctx.fill(); roundRect(ctx, x - l / 2, y - b / 2, l, b, 6); ctx.fill(); ctx.restore(); }
// toonbank: blad op hoogte y, front tot de vloer
function balie(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#34486A'; ctx.fillRect(x + 10, y + 18, w - 20, 880 - y - 18); ctx.fillStyle = '#2A3B58'; ctx.fillRect(x + 10, y + 18, w - 20, 10);
  for (let i = 1; i < 4; i++) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(x + i * w / 4, y + 40, 3, 880 - y - 60); }
  roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9B08A', '#E0CCA6', 1.5); ctx.restore(); }

// medicijndoosje; (x,y) = midden onderkant
function doosje(ctx, x, y, w, h, col, lab = '', a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lift = hl * 14;
  if (hl > 0.01) { roundRect(ctx, x - w / 2 - 8, y - h - 8 - lift, w + 16, h + 16, 10); shape(ctx, rgba(col, 0.25 * hl), rgba(col, hl), 3); }
  roundRect(ctx, x - w / 2, y - h - lift, w, h, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h * 0.62 - lift, w, h * 0.22);
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - w / 2 + 10, y - h * 0.25 - lift, w * 0.5, 5);
  if (lab) text(ctx, lab, x, y - h - 18 - lift, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
// strip met tabletten (blister)
function strip(ctx, x, y, s, col, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -34, 140, 68, 8); shape(ctx, '#C8CED8', '#9AA3B2', 2); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { circ(ctx, -48 + i * 32, -14 + j * 28, 11, '#F2F2EE', rgba(col, 0.9), 3); }
  ctx.restore(); if (lab) regel(ctx, lab, x, y - 50 * s, a, C.text, 24, 'center', 700); }
// rond tablet met breukstreep
function tablet(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', col, Math.max(2, r * 0.22)); ctx.strokeStyle = rgba(col, 0.8); ctx.lineWidth = Math.max(1.5, r * 0.12); ctx.beginPath(); ctx.moveTo(x - r * 0.55, y); ctx.lineTo(x + r * 0.55, y); ctx.stroke(); ctx.restore(); }
// capsule
function capsule(ctx, x, y, s, col, a = 1, rot = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -46 * s, -20 * s, 92 * s, 40 * s, 20 * s); ctx.save(); ctx.clip(); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-46 * s, -20 * s, 92 * s, 40 * s); ctx.fillStyle = col; ctx.fillRect(-46 * s, -20 * s, 46 * s, 40 * s); ctx.restore(); roundRect(ctx, -46 * s, -20 * s, 92 * s, 40 * s, 20 * s); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
// icoon van een middel (rond, met kleur) + naam eronder
function middelIcoon(ctx, x, y, soort, a = 1, naam = '', hl = 0) { if (a <= 0.01) return; const col = MIDDEL[soort]; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, 58, rgba(col, 0.18 + 0.15 * hl), col, 2.5 + 2 * hl); if (soort === 'plas') { tablet(ctx, x, y, 30, col); } else if (soort === 'ace') { capsule(ctx, x, y, 0.85, col); } else tablet(ctx, x, y, 30, col);
  ctx.restore(); if (naam) naamBij(ctx, naam, '', x, y + 100, a, 'center'); }

// monitor op de balie; (x,y) = voet; signaal 0..1 = rood bolletje
function monitor(ctx, x, y, a = 1, signaal = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 10, y - 50, 20, 50); ctx.fillRect(x - 50, y - 8, 100, 8);
  roundRect(ctx, x - 130, y - 220, 260, 175, 10); shape(ctx, '#2A3446', '#6A7488', 3); roundRect(ctx, x - 118, y - 208, 236, 151, 6); shape(ctx, '#DDE6F0', null);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = LIJST_KL[i]; ctx.fillRect(x - 104, y - 192 + i * 24, 12, 12); ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 84, y - 190 + i * 24, 110 + (i % 3) * 20, 8); }
  if (signaal > 0.01) { const p = 0.75 + 0.25 * Math.sin(t * 7); ctx.globalAlpha *= signaal; roundRect(ctx, x - 112, y - 74, 224, 14, 4); shape(ctx, rgba('#D8573F', 0.9), null); circ(ctx, x + 88, y - 186, 16 * p, '#D8573F'); text(ctx, '!', x + 88, y - 177, fTekst(24, 800), '#FFFFFF', 'center'); }
  ctx.restore(); }

// groot scherm met de medicatielijst; o: lijst, nieuw, scan (0..5), signaal, hl (regelindices)
function medScherm(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { lijst = 1, nieuw = 0, scan = -1, signaal = 0, hl = [], t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 16, y - 16, w + 32, h + 32, 18); shape(ctx, '#2A3446', '#6A7488', 3); roundRect(ctx, x, y, w, h, 10); shape(ctx, '#E6EDF5', null);
  ctx.fillStyle = '#C9D4E2'; ctx.fillRect(x, y, w, 64); text(ctx, 'Opa Henk · 71 jaar · medicatie', x + 30, y + 43, fTekst(30, 700), '#1A2740', 'left');
  const rh = 64, y0 = y + 90;
  LIJST.forEach((s2, i) => { const al = clamp(lijst * 6 - i, 0, 1); if (al <= 0) return; ctx.save(); ctx.globalAlpha *= al; const yy = y0 + i * rh; const isH = hl.includes(i) ? signaal : 0;
    if (isH > 0.01) { roundRect(ctx, x + 14, yy - 6, w - 28, rh - 8, 8); shape(ctx, rgba('#D8573F', 0.18 * isH), rgba('#D8573F', isH), 2.5); }
    if (Math.abs(scan - i) < 0.5) { roundRect(ctx, x + 14, yy - 6, w - 28, rh - 8, 8); shape(ctx, rgba(C.teal, 0.25), null); }
    ctx.fillStyle = LIJST_KL[i]; roundRect(ctx, x + 30, yy + 8, 30, 30, 6); ctx.fill(); text(ctx, s2, x + 80, yy + 35, fTekst(30, 600), '#1A2740', 'left'); text(ctx, '1× per dag', x + w - 40, yy + 35, fTekst(24, 500), '#5A6478', 'right'); ctx.restore(); });
  if (nieuw > 0.01) { const yy = y0 + 5 * rh + 10, dx = (1 - ease(nieuw)) * 80; ctx.save(); ctx.globalAlpha *= clamp(nieuw * 2, 0, 1); roundRect(ctx, x + 14 + dx, yy - 6, w - 28, rh - 4, 8); shape(ctx, signaal > 0.01 ? rgba('#D8573F', 0.22 * signaal + 0.05) : rgba(C.goud, 0.2), signaal > 0.01 ? '#D8573F' : C.goud, 3);
    tablet(ctx, x + 45 + dx, yy + 25, 15, C.koraal); text(ctx, 'ibuprofen 400 mg', x + 80 + dx, yy + 36, fTekst(30, 800), '#1A2740', 'left'); text(ctx, 'NIEUW', x + w - 40 + dx, yy + 36, fTekst(24, 800), '#A8402F', 'right'); ctx.restore(); }
  if (signaal > 0.01) { ctx.save(); ctx.globalAlpha *= signaal; const p = 1 + 0.08 * Math.sin(t * 6); roundRect(ctx, x + w - 330, y + 10, 300, 44, 10); shape(ctx, '#D8573F', null); text(ctx, '⚠  SIGNAAL', x + w - 180, y + 42, fTekst(28, 800), '#FFFFFF', 'center'); ctx.restore(); }
  ctx.restore(); }

// glomerulus (schematisch): aanvoerend vaatje links onder, afvoerend links boven, kluwen in het kapsel, voorurine naar rechts.
// o: knijp 0..1 (ibuprofen), open 0..1 (ACE-remmer), droog 0..1 (plastablet), druk 0..1, t
function glomerulus(ctx, cx, cy, s, a = 1, o = {}) { if (a <= 0.01) return; const { knijp = 0, open = 0, droog = 0, druk = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s);
  const wA = 46 * (1 - 0.55 * knijp), wE = 30 * (1 + 0.75 * open);
  // kapsel van Bowman (bekervorm, open aan de linkerkant)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(20, 0, 180, -2.55, 2.55); ctx.stroke();
  ctx.fillStyle = rgba(C.teal, 0.10); ctx.beginPath(); ctx.arc(20, 0, 172, -2.55, 2.55); ctx.closePath(); ctx.fill();
  // afvoer voorurine naar rechts
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(196, -30); ctx.lineTo(430, -30); ctx.moveTo(196, 30); ctx.lineTo(430, 30); ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.10); ctx.fillRect(196, -24, 234, 48);
  // vaatjes
  const vat = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); };
  const PA = [[-470, 100], [-260, 70], [-110, 30]], PE = [[-110, -30], [-260, -70], [-470, -100]];
  vat(PA, wA + 8, '#7A2E2E'); vat(PA, wA, '#C24A42'); vat(PE, wE + 8, '#7A2E2E'); vat(PE, wE, '#B0443E');
  // kluwen: lussen haarvaatjes
  const lus = (k) => { const an = k * 1.05 + 0.3; return [20 + Math.cos(an) * 62, Math.sin(an) * 62]; };
  ctx.strokeStyle = '#7A2E2E'; ctx.lineWidth = 22; for (let k = 0; k < 6; k++) { const [lx, ly] = lus(k); ctx.beginPath(); ctx.ellipse(lx, ly, 62, 40, k * 1.05 + 0.3, 0, 6.283); ctx.stroke(); }
  ctx.strokeStyle = '#D0574C'; ctx.lineWidth = 14; for (let k = 0; k < 6; k++) { const [lx, ly] = lus(k); ctx.beginPath(); ctx.ellipse(lx, ly, 62, 40, k * 1.05 + 0.3, 0, 6.283); ctx.stroke(); }
  // bloedcellen: dichtheid daalt bij weinig vocht en een knijpend aanvoerend vaatje
  const nA = Math.round(9 * (1 - 0.35 * droog) * (1 - 0.4 * knijp));
  particleFlow(ctx, [[-470, 100], [-260, 70], [-110, 30], [-40, 10]], nA, t, 120 * (1 - 0.3 * knijp), '#F2B0A6', Math.max(4, wA * 0.2), 3);
  particleFlow(ctx, [[-40, -10], [-110, -30], [-260, -70], [-470, -100]], Math.round(nA * 0.8), t, 140 * (1 + 0.4 * open), '#F2B0A6', Math.max(4, wE * 0.24), 21);
  for (let k = 0; k < 6; k++) { const ph = (t * 0.5 + k / 6) % 1, [lx, ly] = lus(k), an = ph * 6.283; circ(ctx, lx + Math.cos(an) * 62 * Math.cos(k * 1.05 + 0.3) - Math.sin(an) * 40 * Math.sin(k * 1.05 + 0.3), ly + Math.cos(an) * 62 * Math.sin(k * 1.05 + 0.3) + Math.sin(an) * 40 * Math.cos(k * 1.05 + 0.3), 5, '#F2B0A6'); }
  // voorurine: druppels uit de kluwen naar rechts, aantal volgt de druk
  const nD = Math.round(14 * clamp(druk, 0, 1));
  for (let k = 0; k < nD; k++) { const ph = (t * 0.35 + hash(k + 7)) % 1, an = hash(k + 3) * 6.283; const sx = 20 + Math.cos(an) * 110, sy = Math.sin(an) * 110; let x2, y2;
    if (ph < 0.5) { const u = ph / 0.5; x2 = lerp(sx, 200, u); y2 = lerp(sy, (hash(k) - 0.5) * 30, u); } else { const u = (ph - 0.5) / 0.5; x2 = 200 + u * 220; y2 = (hash(k) - 0.5) * 30; }
    ctx.fillStyle = rgba(C.teal, 0.9); ctx.beginPath(); ctx.arc(x2, y2, 7, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// drukmeter: halve wijzerplaat, v 0..1
function drukmeter(ctx, x, y, r, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  [[0, 0.33, '#D8573F'], [0.33, 0.6, C.oker], [0.6, 1, C.groen]].forEach(([u0, u1, col]) => { ctx.strokeStyle = col; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.arc(x, y, r, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI); ctx.stroke(); });
  const an = Math.PI + clamp(v, 0, 1) * Math.PI; ctx.strokeStyle = C.text; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.85, y + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, x, y, 12, C.text);
  ctx.restore(); }

// hart dat zwaarder moet pompen (last 0..1)
function hart(ctx, x, y, s, a = 1, t = 0, last = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const p = 1 + 0.05 * Math.sin(t * (6 + 4 * last)) + 0.06 * last; ctx.translate(x, y); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 90); ctx.bezierCurveTo(-150, -10, -110, -130, 0, -60); ctx.bezierCurveTo(110, -130, 150, -10, 0, 90); ctx.closePath(); shape(ctx, last > 0.5 ? '#C24A42' : '#D0574C', lighten('#D0574C', 0.3), 3);
  ctx.strokeStyle = rgba('#7A2E2E', 0.7); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -50); ctx.quadraticCurveTo(10, 10, -10, 60); ctx.stroke(); ctx.restore(); }
// waterdruppel
function druppel(ctx, x, y, r, col = C.teal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.quadraticCurveTo(x + r, y - r * 0.2, x + r * 0.95, y + r * 0.2); ctx.arc(x, y + r * 0.2, r * 0.95, 0, Math.PI); ctx.quadraticCurveTo(x - r, y - r * 0.2, x, y - r * 1.6); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore(); }
// zoutkorrel (kubusje)
function zoutje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.fillStyle = '#C8CED8'; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r * 0.4, y - r * 1.6); ctx.lineTo(x + r * 1.6, y - r * 1.6); ctx.lineTo(x + r, y - r); ctx.fill(); ctx.restore(); }

// dagbalk 7:00–23:00; uurX geeft de x van een uur
function uurX(x, w, u) { return x + (u - 7) / 16 * w; }
function dagBalk(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { nacht = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 16, w, 32, 16); shape(ctx, '#2A3A58', C.line, 1.5);
  [8, 12, 17, 22].forEach(u => { const xx = uurX(x, w, u); ctx.fillStyle = C.line; ctx.fillRect(xx - 1.5, y - 22, 3, 44); text(ctx, u + ':00', xx, y + 56, fTekst(24, 600), C.text2, 'center'); });
  zon(ctx, x - 60, y, 20, 1, 0); ctx.save(); ctx.globalAlpha *= 0.6 + 0.4 * nacht; ctx.beginPath(); ctx.arc(x + w + 60, y, 24, 0, 6.283); ctx.arc(x + w + 72, y - 8, 22, 0, 6.283, true); ctx.fillStyle = '#E8E2C8'; ctx.fill('evenodd'); ctx.restore(); ctx.restore(); }

// medicijnrol: rol links, strook zakjes naar rechts; u = uitgerold 0..1; gehad = aantal lege zakjes met vinkje
const ROL_LAB = ['ma 8:00', 'ma 14:00', 'ma 22:00', 'di 8:00', 'di 14:00', 'di 22:00'];
function medRol(ctx, x, y, a = 1, u = 1, gehad = 0, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const zw = 170, L = n * zw * clamp(u, 0, 1);
  for (let i = 0; i < n; i++) { const zx = x + 40 + i * zw; if (zx + zw > x + 40 + L + 1) break; const leeg = i < gehad;
    roundRect(ctx, zx + 4, y - 80, zw - 8, 160, 10); shape(ctx, rgba('#E6EDF5', leeg ? 0.35 : 0.9), '#AFC0D0', 2); ctx.strokeStyle = rgba('#5A6478', 0.6); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(zx + zw, y - 76); ctx.lineTo(zx + zw, y + 76); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, ROL_LAB[i % ROL_LAB.length], zx + zw / 2, y - 42, fTekst(26, 800), leeg ? C.text2 : '#1A2740', 'center');
    if (!leeg) { const k = i % 3 === 1 ? [C.teal] : (i % 3 === 0 ? [C.paars, C.oker, C.goud] : [C.goud]); k.forEach((col, j) => tablet(ctx, zx + zw / 2 + (j - (k.length - 1) / 2) * 40, y + 25, 15, col)); }
    else vink_(ctx, zx + zw / 2, y + 20, 26, 1, C.groen); }
  circ(ctx, x, y, 92, '#E6EDF5', '#AFC0D0', 3); for (let r = 80; r > 20; r -= 14) circ(ctx, x, y, r, null, rgba('#9AA3B2', 0.6), 2); circ(ctx, x, y, 18, '#5A6478');
  ctx.restore(); }

// telpoppetje (alleen in groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// tegel met een reden om medicijnen anders te nemen
function redenTegel(ctx, x, y, soort, lab, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = hl > 0.5 ? C.goud : C.teal;
  roundRect(ctx, x - 90, y - 90, 180, 180, 18); shape(ctx, rgba(col, 0.12 + 0.12 * hl), rgba(col, 0.6 + 0.4 * hl), 2 + 2 * hl); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'vergeten') { roundRect(ctx, x - 50, y - 50, 100, 100, 10); shape(ctx, '#F2EEE4', null); ctx.fillStyle = C.koraal; ctx.fillRect(x - 50, y - 50, 100, 24); text(ctx, '?', x, y + 38, fTitel(60), '#1A2740', 'center'); }
  else if (soort === 'bijwerking') { tablet(ctx, x - 22, y + 18, 28, C.oker); ctx.beginPath(); ctx.moveTo(x + 34, y - 58); ctx.lineTo(x + 74, y + 10); ctx.lineTo(x - 6, y + 10); ctx.closePath(); shape(ctx, C.goud, null); text(ctx, '!', x + 34, y + 2, fTekst(44, 800), '#1A2740', 'center'); }
  else if (soort === 'verschil') { text(ctx, '=', x, y + 30, fTekst(110, 800), C.text, 'center'); tablet(ctx, x - 52, y - 46, 16, C.paars); tablet(ctx, x + 52, y - 46, 16, C.paars); }
  else if (soort === 'wc') { ctx.fillStyle = '#F2F2EE'; roundRect(ctx, x - 40, y - 62, 34, 70, 6); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 8, y + 8, 50, 16, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 30, y + 10); ctx.quadraticCurveTo(x - 20, y + 62, x + 20, y + 62); ctx.lineTo(x + 30, y + 30); ctx.lineTo(x + 50, y + 14); ctx.fill(); druppel(ctx, x + 50, y - 44, 12, C.teal); }
  ctx.restore(); if (lab) regel(ctx, lab, x, y + 132, a, C.text, 28, 'center', 700); }

// denkwolk
function denkWolk(ctx, x, y, w, h, a = 1, dx = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3D5C';
  for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * w * 0.36, y + Math.sin(an) * h * 0.3, w * 0.2, h * 0.26, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, w * 0.46, h * 0.42, 0, 0, 6.283); ctx.fill(); circ(ctx, x + dx * w * 0.32, y + h * 0.6, 14, '#2E3D5C'); circ(ctx, x + dx * w * 0.4, y + h * 0.78, 9, '#2E3D5C'); ctx.restore(); }
// bloemetje en tuin
function bloem(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 70 * s); ctx.stroke(); ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.ellipse(x + 14 * s, y - 30 * s, 14 * s, 6 * s, -0.5, 0, 6.283); ctx.fill();
  for (let k = 0; k < 5; k++) { const an = k * 1.2566; circ(ctx, x + Math.cos(an) * 14 * s, y - 70 * s + Math.sin(an) * 14 * s, 10 * s, col); } circ(ctx, x, y - 70 * s, 8 * s, C.goud); ctx.restore(); }
function schepje(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate((ang || 0) - Math.PI / 2); ctx.fillStyle = '#8C5A3A'; ctx.fillRect(-5, -10, 10, 70); ctx.fillStyle = '#9AA3B2'; ctx.beginPath(); ctx.moveTo(-18, 60); ctx.lineTo(18, 60); ctx.lineTo(10, 110); ctx.lineTo(0, 120); ctx.lineTo(-10, 110); ctx.closePath(); ctx.fill(); ctx.restore(); }
function tasje(ctx, x, y) { ctx.save(); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y + 14, 16, Math.PI, 0); ctx.stroke(); roundRect(ctx, x - 34, y + 14, 68, 70, 8); shape(ctx, '#E6E1D3', '#C8C2B2', 2); apotheekKruis(ctx, x, y + 50, 0.28); ctx.restore(); }
// envelop
function envelop(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 34 * s, 100 * s, 68 * s, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 50 * s, y - 34 * s); ctx.lineTo(x, y + 6 * s); ctx.lineTo(x + 50 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
// lijst op papier (vijf medicijnen); vink = aantal vinkjes, weg = index doorgestreept (0..1)
function lijstPapier(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { vink = 0, dubbel = 0, weg = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const rh = 54, h = 5 * rh + 70;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'medicijnen Henk', x + 30, y + 46, fTekst(28, 800), '#1A2740', 'left');
  LIJST.forEach((s2, i) => { const yy = y + 70 + i * rh; ctx.fillStyle = LIJST_KL[i]; roundRect(ctx, x + 30, yy + 10, 24, 24, 5); ctx.fill(); ctx.save(); ctx.globalAlpha *= i === 4 ? 1 - 0.55 * weg : 1; text(ctx, s2, x + 70, yy + 32, fTekst(28, 600), '#1A2740', 'left'); ctx.restore();
    const vk = clamp(vink - i, 0, 1); if (vk > 0.01 && !(i === 4 && weg > 0.5)) vink_(ctx, x + w - 40, yy + 20, 14, vk, '#3E8A55');
    if (i === 4 && weg > 0.01) { ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 64, yy + 22); ctx.lineTo(x + 64 + (w - 100) * ease(weg), yy + 22); ctx.stroke(); }
    if (dubbel > 0.01 && (i === 2 || i === 3)) { ctx.save(); ctx.globalAlpha *= dubbel * (0.6 + 0.4 * Math.sin(t * 6)); roundRect(ctx, x + 14, yy + 2, w - 28, rh - 6, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }
// tafel (blad + poten), voor de personen getekend
function tafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x + 30, y + 20, 16, 880 - y - 20); ctx.fillRect(x + w - 46, y + 20, 16, 880 - y - 20); roundRect(ctx, x, y, w, 26, 6); shape(ctx, '#C9A35C', '#E0C27E', 1.5); ctx.fillStyle = '#8C6A44'; ctx.fillRect(x + 10, y + 26, w - 20, 14); ctx.restore(); }
// ziekenhuisbedje (icoon)
function bedje(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.fillRect(-30, -24, 6, 40); ctx.fillRect(24, -10, 6, 26); roundRect(ctx, -30, -6, 60, 12, 4); ctx.fill(); circ(ctx, -14, -16, 8, col); roundRect(ctx, -4, -20, 30, 14, 5); ctx.fill(); ctx.restore(); }
// nier (boonvorm, klein icoon)
function niertje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(10, -60); ctx.bezierCurveTo(70, -70, 80, 60, 10, 60); ctx.bezierCurveTo(-30, 60, -30, 20, -10, 10); ctx.bezierCurveTo(-20, 0, -20, -10, -10, -14); ctx.bezierCurveTo(-30, -24, -30, -58, 10, -60); ctx.closePath(); shape(ctx, '#A8524A', '#D07A70', 3); ctx.restore(); }
// jaarblokken voor een opleiding
function jaarBlokken(ctx, x, y, n, col, a = 1, u = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const al = clamp(u * n - i, 0, 1); if (al <= 0) continue; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x + i * 112, y, 100, 70, 10); shape(ctx, rgba(col, 0.35), col, 2); text(ctx, String(i + 1), x + i * 112 + 50, y + 47, fTekst(30, 800), C.text, 'center'); ctx.restore(); }
  if (lab) regel(ctx, lab, x + n * 56 - 6, y + 110, a * clamp(u * 1.5, 0, 1), C.text2, 26, 'center', 700); ctx.restore(); }
