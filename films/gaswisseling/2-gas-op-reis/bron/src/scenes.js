// Gaswisseling 2 · Gas op reis — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A1E16', shirt: '#4F6E9A', hairStyle: 'short' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const LUCHT = '#9FC3E0', O2 = '#E0705A', CO2 = '#9A8FB8', CO = '#4A4E58', LONG = '#D98C8C', SPIER = '#B36A5E', VOCHT = C.teal, IJZER = '#C98A3E';
const BLOEDARM = '#8E3E46', BLOEDRIJK = '#D9483E';
function bloedKleur(k) { const a = [0x8E, 0x3E, 0x46], b = [0xD9, 0x48, 0x3E]; const m = a.map((v, i) => Math.round(lerp(v, b[i], clamp(k, 0, 1)))); return '#' + m.map(v => v.toString(16).padStart(2, '0')).join(''); }

// ---------- moleculen ----------
function o2Mol(ctx, x, y, r = 9, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - r * 0.55, y, r, O2, lighten(O2, 0.3), 1.2); circ(ctx, x + r * 0.55, y, r, O2, lighten(O2, 0.3), 1.2); ctx.restore(); }
function co2Mol(ctx, x, y, r = 8, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - r * 1.1, y, r * 0.8, rgba(CO2, 0.9)); circ(ctx, x + r * 1.1, y, r * 0.8, rgba(CO2, 0.9)); circ(ctx, x, y, r, '#6E6290', lighten(CO2, 0.3), 1.2); ctx.restore(); }
function coMol(ctx, x, y, r = 9, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - r * 0.55, y, r, CO, '#8A8F99', 1.2); circ(ctx, x + r * 0.55, y, r * 0.9, '#2E3138', '#8A8F99', 1.2); ctx.restore(); }
function hco3(ctx, x, y, a = 1, px = 22) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText('HCO₃⁻').width + 16; roundRect(ctx, x - w / 2, y - px * 0.8, w, px * 1.3, px * 0.6); shape(ctx, rgba(CO2, 0.25), CO2, 1.2); text(ctx, 'HCO₃⁻', x, y + px * 0.25, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
function hIon(ctx, x, y, a = 1, r = 12) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.goud, 0.35), C.goud, 1.5); text(ctx, 'H⁺', x, y + r * 0.4, fTekst(r * 1.1, 700), C.text, 'center'); ctx.restore(); }
// hemoglobine: vier eiwitdelen met elk een ijzerplek (heem). o = { o2: 0..4, co: 0..4, co2: 0..1, h: 0..1, kleur }
function hbMol(ctx, x, y, s = 1, o = {}) { const { a = 1, o2 = 0, co = 0, co2 = 0, h = 0, ijzerA = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const sat = Math.min(4, o2) / 4; const pos = [[-38, -36], [38, -36], [-38, 36], [38, 36]];
  pos.forEach(([px, py], i) => { ctx.beginPath(); ctx.ellipse(px, py, 46, 40, i * 0.6, 0, 6.283); shape(ctx, rgba(bloedKleur(sat), 0.45), lighten(bloedKleur(sat), 0.25), 2.5 / s); });
  pos.forEach(([px, py], i) => { const hx = px * 0.55, hy = py * 0.55; ctx.save(); ctx.translate(hx, hy); ctx.rotate(Math.PI / 4); ctx.fillStyle = IJZER; ctx.fillRect(-8, -8, 16, 16); ctx.restore();
    if (ijzerA > 0.01) { ctx.save(); ctx.globalAlpha *= ijzerA * (0.6 + 0.4 * Math.sin(i + Date.now() * 0)); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 / s; ctx.beginPath(); ctx.arc(hx, hy, 18, 0, 6.283); ctx.stroke(); ctx.restore(); }
    const kO = clamp(o2 - i, 0, 1), kC = clamp(co - i, 0, 1); const ox = px * 1.25, oy = py * 1.25;
    if (kO > 0.01) o2Mol(ctx, lerp(px * 2.4, hx + (ox - hx) * 0.4, kO), lerp(py * 2.4, hy + (oy - hy) * 0.4, kO), 9, kO);
    if (kC > 0.01) coMol(ctx, lerp(px * 2.4, hx + (ox - hx) * 0.4, kC), lerp(py * 2.4, hy + (oy - hy) * 0.4, kC), 9, kC); });
  if (co2 > 0.01) { co2Mol(ctx, -96, 0, 8, co2); co2Mol(ctx, 96, 0, 8, co2 * 0.8); }
  if (h > 0.01) { hIon(ctx, 0, -84, h, 12); hIon(ctx, 0, 84, h, 12); }
  ctx.restore(); }
// rode bloedcel (biconcaaf), k = verzadiging 0..1
function rbc(ctx, x, y, r, k = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const c = bloedKleur(k); ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.92, 0, 0, 6.283); shape(ctx, c, lighten(c, 0.25), 2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function longblaasje(ctx, x, y, r, t, o = {}) { const { a = 1, o2 = 0, co2 = 0, haar = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, rgba(LUCHT, 0.12), '#C9D2DE', 3); circ(ctx, x, y, r - 10, null, rgba(VOCHT, 0.6), 4);
  if (haar > 0.01) { ctx.save(); ctx.globalAlpha *= haar; ctx.strokeStyle = HK.bloed; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r + 22, -0.4, Math.PI * 1.25); ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 10; i++) { const u = (t * 0.25 + i / 10) % 1; const an = -0.3 + hash(i) * 1.5; const rr = lerp(r * 0.5, r + 22, u); if (o2 > 0.01) o2Mol(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, 7, o2 * (1 - u * 0.3)); const an2 = 1.4 + hash(i * 5) * 1.5, rr2 = lerp(r + 22, r * 0.5, u); if (co2 > 0.01) co2Mol(ctx, x + Math.cos(an2) * rr2, y + Math.sin(an2) * rr2, 6, co2); }
  ctx.restore(); }
function spierCel(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 40); shape(ctx, rgba(SPIER, 0.25), SPIER, 2.5); for (let i = 0; i < 5; i++) { ctx.strokeStyle = rgba(SPIER, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w / 2 + 30, y - h / 2 + 30 + i * (h - 60) / 4); ctx.lineTo(x + w / 2 - 30, y - h / 2 + 30 + i * (h - 60) / 4); ctx.stroke(); } for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(x - w * 0.25 + i * w * 0.25, y + (i % 2 ? 30 : -30), 34, 16, 0.3, 0, 6.283); shape(ctx, rgba(C.mito, 0.6), C.mitoR, 1.5); } ctx.restore(); }
// verticale meter (zuurstofspanning e.d.)
function meter(ctx, x, y, h, v, lab, col, a = 1, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y, 52, h, 12); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); const hh = (h - 8) * clamp(v, 0, 1); roundRect(ctx, x - 22, y + h - 4 - hh, 44, hh, 9); ctx.fillStyle = rgba(col, 0.8); ctx.fill(); metaText(ctx, lab, x, y - 16, C.grain, 'center', 18); if (sub) text(ctx, sub, x, y + h + 36, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// zuurstofbindingscurve (Hill), P50 in kPa
function sat(p, p50 = 3.6) { const n = 2.7; return Math.pow(p, n) / (Math.pow(p, n) + Math.pow(p50, n)); }
function bindCurve(ctx, x, y, w, h, o = {}) { const { a = 1, u = 1, p50 = 3.6, col = O2, as = 1 } = o; grafiek(ctx, x, y, w, h, { a: a * as, xmax: 14, ymax: 100, f: p => 100 * sat(p, p50), u, xticks: [0, 2, 4, 6, 8, 10, 12, 14], yticks: [0, 25, 50, 75, 100], xlab: 'zuurstofspanning (kPa)', ylab: 'verzadiging hemoglobine (%)', col }); }
function curveXY(x, y, w, h, p, p50 = 3.6) { return [x + p / 14 * w, y + h - sat(p, p50) * h]; }
function hartVorm(ctx, x, y, s, a = 1, col = HK.bloed) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-70, -10, -40, -70, 0, -35); ctx.bezierCurveTo(40, -70, 70, -10, 0, 40); shape(ctx, rgba(col, 0.5), lighten(col, 0.2), 3 / s); ctx.restore(); }
function longKlein(ctx, x, y, s, side, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(side * s, s); ctx.beginPath(); ctx.moveTo(10, -100); ctx.bezierCurveTo(70, -100, 90, -20, 90, 40); ctx.bezierCurveTo(90, 100, 50, 110, 10, 100); ctx.bezierCurveTo(-5, 95, -5, 80, 0, 60); ctx.lineTo(0, -80); ctx.closePath(); shape(ctx, rgba(LONG, 0.3), lighten(LONG, 0.2), 2.5 / s); ctx.restore(); }
// hoofd met hersenen en hersenstam (zijaanzicht)
function hoofdHersenen(ctx, x, y, s, o = {}) { const { a = 1, centrum = 0, chemo = 0, groot = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 200, 170, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.1), rgba(C.mens, 0.5), 2);
  ctx.beginPath(); ctx.ellipse(-10, -30, 160, 115, 0, 0, 6.283); shape(ctx, rgba('#C9A0B4', 0.25 + 0.3 * groot), '#C9A0B4', 2);
  ctx.beginPath(); ctx.ellipse(-110, 70, 60, 40, 0, 0, 6.283); shape(ctx, rgba('#C9A0B4', 0.2), '#C9A0B4', 2);
  ctx.beginPath(); ctx.moveTo(-30, 60); ctx.quadraticCurveTo(-40, 140, -50, 230); ctx.lineTo(-10, 230); ctx.quadraticCurveTo(0, 140, 10, 60); ctx.closePath(); shape(ctx, rgba('#C9A0B4', 0.3), '#C9A0B4', 2);
  if (centrum > 0.01) { ctx.save(); ctx.globalAlpha *= centrum; circ(ctx, -26, 170, 20 + 3 * Math.sin(t * 4), rgba(C.goud, 0.5), C.goud, 2.5); ctx.restore(); }
  if (chemo > 0.01) { ctx.save(); ctx.globalAlpha *= chemo; for (const [cx, cy] of [[-60, 150], [10, 185]]) { circ(ctx, cx, cy, 10, '#E6E1D3', CO2, 2); } ctx.restore(); }
  ctx.restore(); }
function torsoSchets(ctx, x, y, s, v, a = 1, spierA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -200, -180, 400, 380, 90); shape(ctx, rgba(C.mens, 0.08), rgba(C.mens, 0.45), 2);
  longKlein(ctx, -20, -40, 1.1 + 0.08 * v, -1, 1); longKlein(ctx, 20, -40, 1.1 + 0.08 * v, 1, 1);
  ctx.save(); ctx.globalAlpha *= spierA; ctx.strokeStyle = SPIER; ctx.lineWidth = 12; const my = 100 + 25 * v, dome = 60 - 40 * v; ctx.beginPath(); ctx.moveTo(-190, my + 20); ctx.quadraticCurveTo(-90, my - dome * 2, 0, my - dome * 0.6); ctx.quadraticCurveTo(90, my - dome * 2, 190, my + 20); ctx.stroke();
  for (const d of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba('#E6E1D3', 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(d * 20, -140 + i * 55 - v * 6); ctx.quadraticCurveTo(d * 160 * (1 + 0.05 * v), -150 + i * 55, d * 195 * (1 + 0.05 * v), -100 + i * 55); ctx.stroke(); } ctx.restore();
  ctx.restore(); }
// berg met wielrenner
function berg(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(120, 860); ctx.lineTo(760, 200); ctx.lineTo(900, 300); ctx.lineTo(1100, 160); ctx.lineTo(1800, 860); ctx.closePath(); shape(ctx, rgba(C.berg, 0.9), C.bergTop, 2); ctx.beginPath(); ctx.moveTo(1100, 160); ctx.lineTo(1000, 260); ctx.lineTo(1060, 250); ctx.lineTo(1100, 290); ctx.lineTo(1150, 240); ctx.lineTo(1190, 250); ctx.closePath(); ctx.fillStyle = '#E6E9F0'; ctx.fill(); ctx.restore(); }
function fiets(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 4; for (const wx of [-40, 40]) { ctx.beginPath(); ctx.arc(wx, 0, 26, 0, 6.283); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-5, -40); ctx.lineTo(30, -40); ctx.lineTo(40, 0); ctx.moveTo(-5, -40); ctx.lineTo(0, 0); ctx.lineTo(-40, 0); ctx.stroke();
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-5, -48); ctx.lineTo(20, -85); ctx.lineTo(32, -48); ctx.stroke(); const ph = t * 4; ctx.strokeStyle = '#34425A'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-5, -45); ctx.lineTo(Math.cos(ph) * 12, Math.sin(ph) * 12); ctx.stroke(); circ(ctx, 28, -100, 13, SKINS[1]); ctx.restore(); }
function huisje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-300, -120); ctx.lineTo(0, -320); ctx.lineTo(300, -120); ctx.lineTo(300, 260); ctx.lineTo(-300, 260); ctx.closePath(); shape(ctx, rgba('#3A4A66', 0.6), '#8FA0B5', 3); ctx.restore(); }
function toestel(ctx, x, y, naam, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 100, 140, 200, 14); shape(ctx, '#C9C2B4', '#8C877C', 2); ctx.fillStyle = '#2A2A2A'; ctx.fillRect(x - 40, y + 20, 80, 50); for (let i = 0; i < 3; i++) { const f = 0.6 + 0.4 * Math.sin(t * 9 + i * 2); ctx.beginPath(); ctx.moveTo(x - 30 + i * 30, y + 66); ctx.quadraticCurveTo(x - 38 + i * 30, y + 40, x - 30 + i * 30, y + 66 - 34 * f); ctx.quadraticCurveTo(x - 22 + i * 30, y + 40, x - 30 + i * 30, y + 66); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fill(); } text(ctx, naam, x, y + 140, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
function melder(ctx, x, y, alarm, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 60, '#E6E1D3', '#9AA3B2', 3); text(ctx, 'CO', x, y + 12, fTekst(34, 700), '#2E3138', 'center'); const on = alarm * (Math.sin(t * 10) > 0 ? 1 : 0.3); circ(ctx, x + 36, y - 36, 12, rgba(C.koraal, on)); if (alarm > 0.01) for (let i = 1; i <= 2; i++) { ctx.strokeStyle = rgba(C.koraal, alarm * (0.6 - i * 0.2)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 60 + i * 22, -0.6, 0.6); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 60 + i * 22, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); } ctx.restore(); }
function botje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#E6E1D3'; for (const dx of [-120, 120]) for (const dy of [-22, 22]) { ctx.beginPath(); ctx.arc(dx, dy, 32, 0, 6.283); ctx.fill(); } ctx.fillRect(-120, -34, 240, 68); ctx.fillStyle = rgba(HK.bloed, 0.6); roundRect(ctx, -100, -20, 200, 40, 18); ctx.fill(); ctx.restore(); }
function bloedbaan(ctx, x0, x1, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(HK.bloed, 0.35); ctx.lineWidth = 70; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }

function staaf(ctx, x, yb, w, h, v, max, col, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = h * v / max; roundRect(ctx, x, yb - hh, w, hh, 6); shape(ctx, rgba(col, 0.5), col, 2); text(ctx, lab, x + w / 2, yb - hh - 14, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1480, cy = 470, rx = 300, ry = 200;
    ctx.save(); ctx.strokeStyle = rgba(HK.bloed, 0.4); ctx.lineWidth = 46; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.restore();
    longKlein(ctx, cx - 30, cy - ry - 30, 0.55, -1); longKlein(ctx, cx + 30, cy - ry - 30, 0.55, 1); spierCel(ctx, cx, cy + ry + 40, 240, 90);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.12 + i / 6) % 1; const an = -Math.PI / 2 + ph * 6.283; const k = 0.5 + 0.5 * Math.cos(ph * 6.283); rbc(ctx, cx + Math.cos(an) * rx, cy + Math.sin(an) * ry, 24, 0.7 + 0.3 * k); if (k > 0.8) o2Mol(ctx, cx + Math.cos(an) * rx, cy + Math.sin(an) * ry - 34, 7, (k - 0.8) * 5); else if (k < 0.2) co2Mol(ctx, cx + Math.cos(an) * rx, cy + Math.sin(an) * ry - 34, 6, (0.2 - k) * 5); } },

  s01(ctx, t, q) { klasAchtergrond(ctx);
    const hold = ramp(t, q.at('houd'), 1) * (1 - ramp(t, q.at('ademen'), 1.2));
    person(ctx, 960, 900, 580, 1, { armR: { a1: 0.5, a2: 1.2 }, armL: { a1: 0.5, a2: 1.2 } }); schoolbank(ctx, 960, 660, 640);
    if (hold > 0.01) { ctx.save(); ctx.globalAlpha *= hold; const hy = 900 - 580 + 580 / 6.6 * 0.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(960, hy, 70 + 4 * Math.sin(t * 3), 0, 6.283); ctx.stroke(); ctx.restore(); }
    const tik = [q.on('Tien', 1), q.on('Twintig', 1), q.on('Dertig', 1)]; const sec = tik[2] > 0.5 ? 30 : tik[1] > 0.5 ? 20 : tik[0] > 0.5 ? 10 : 0;
    klok(ctx, 1570, 610 - 330, 110, sec / 60 * 12, sec ? sec + ' s' : '', q.on('Tien', 1));
    tag(ctx, 'adem inhouden · stop zodra het niet meer gaat', 960, 150, C.text2, q.on('houd', 1) * (1 - q.on('Tien', 1)));
    tag(ctx, 'je móét ademen', 960, 560, C.koraal, q.on('móét', 1) * (1 - q.on('dwingt', 1)));
    vraagteken(ctx, 1400, 600, q.on('dwingt', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'micro');
    const pB = q.on('vier', 1), pC = q.on('zuurstofspanning', 1); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      longblaasje(ctx, 420, 470, 200, t, { o2: 1 });
      label(ctx, 'longblaasje', '', 420 - 120, 470 - 170, 260, 180, 1, '#C9D2DE');
      tag(ctx, 'zuurstof lost slecht op in water', 1250, 200, O2, q.on('slecht', 1) * (1 - q.on('rode', 1)));
      const pr = q.on('achtennegentig', 1); if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr * (1 - q.on('rode', 1)); staaf(ctx, 1000, 760, 180, 380, 98, 100, O2, '98 %', 1); text(ctx, 'aan hemoglobine', 1090, 810, fTekst(28, 600), C.text2, 'center'); staaf(ctx, 1300, 760, 180, 380, 2, 100, LUCHT, '2 %', 1); text(ctx, 'los opgelost', 1390, 810, fTekst(28, 600), C.text2, 'center'); ctx.restore(); }
      const rc = q.on('rode', 1); if (rc > 0.01) { ctx.save(); ctx.globalAlpha *= rc; rbc(ctx, 1250, 470, 220, 1); for (let i = 0; i < 70; i++) { const an = hash(i) * 6.283, rr = Math.sqrt(hash(i * 3)) * 190; circ(ctx, 1250 + Math.cos(an) * rr, 470 + Math.sin(an) * rr * 0.9, 6, rgba('#F2B8A8', 0.8)); } label(ctx, 'rode bloedcel', '', 1250 + 150, 470 - 160, 1640, 240, 1, BLOEDRIJK); tag(ctx, 'honderden miljoenen hemoglobinemoleculen per cel', 1150, 820, C.text2, q.on('miljoenen', 1)); ctx.restore(); }
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC);
      const nb = 4 * ramp(t, q.at('binden'), 3); hbMol(ctx, 960, 470, 2.4, { o2: nb, ijzerA: q.on('ijzer', 1) * (1 - q.on('binden', 1)) });
      label(ctx, 'ijzer', 'één per eiwitdeel', 960 - 50, 470 - 48, 520, 220, q.on('ijzer', 1), IJZER); label(ctx, 'zuurstof', '', 960 + 70, 470 + 70, 1400, 720, q.on('binden', 1), O2);
      metaText(ctx, 'HEMOGLOBINE', 960, 190, C.grain, 'center', 26);
      tag(ctx, 'oxyhemoglobine: helderrood', 1420, 260, BLOEDRIJK, q.on('oxyhemoglobine', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      const tR = q.at('reist', 2), tL = q.at('laat', 1); const u = ramp(t, tR, 4); const xx = lerp(560, 1360, u); const k = 0.98 - 0.23 * ramp(t, tL, 2.5);
      bloedbaan(ctx, 470, 1450, 520); longblaasje(ctx, 330, 470, 140, t, { o2: 1, haar: 0 }); spierCel(ctx, 1600, 520, 300, 220);
      label(ctx, 'longblaasje', '', 330, 330, 260, 210, 1, '#C9D2DE'); label(ctx, 'spiercel', 'verbruikt zuurstof', 1600, 410, 1330, 250, q.on('spieren', 1), SPIER);
      rbc(ctx, xx, 520, 60, k); hbMol(ctx, xx, 520, 0.4, { o2: 4 * k * q.on('vol', 1) + (1 - q.on('vol', 1)) * 2 });
      if (q.on('verschil', 1) > 0.01) { for (let i = 0; i < 3; i++) { const v = (t * 0.6 + i / 3) % 1; o2Mol(ctx, lerp(420, 540, v), 470 + 30 * (i - 1) + v * 40, 7, q.on('verschil', 1) * (1 - u)); } }
      meter(ctx, 330, 650, 200, 0.95, 'O₂-spanning', O2, 1, 'hoog'); meter(ctx, 1600, 650, 200, 0.35, 'O₂-spanning', O2, q.on('spieren', 1), 'laag');
      tag(ctx, 'zuurstofspanning: hoeveel zuurstof er is', 960, 170, C.text2, pC * (1 - q.on('vol', 1)));
      tag(ctx, 'longen: hemoglobine bijna vol', 960, 170, O2, q.on('vol', 1) * (1 - q.on('verschil', 1)));
      tag(ctx, 'zuurstof wordt ingepakt → verschil blijft groot', 960, 170, O2, q.on('verschil', 1) * (1 - q.on('reist', 2)));
      tag(ctx, 'spier: zuurstofspanning laag → hemoglobine laat los', 960, 170, SPIER, q.on('laag', 1));
      if (k < 0.97) for (let i = 0; i < 3; i++) { const v = (t * 0.5 + i / 3) % 1; o2Mol(ctx, lerp(xx + 40, 1520, v), 520 - 40 + i * 30, 7, (1 - v) * ramp(t, tL, 1)); }
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    hartVorm(ctx, 960, 430, 2.2, 1); arrow(ctx, 1500, 700, 1100, 470, BLOEDARM, q.on('terugkomt', 1), 6); spierCel(ctx, 1620, 740, 260, 150, q.on('lichaam', 1));
    rbc(ctx, 1300, 590, 50, 0.5, q.on('terugkomt', 1)); kop(ctx, '?', 1300, 608, q.on('terugkomt', 1), C.text, 54);
    tag(ctx, 'in rust', 700, 200, C.text2, q.on('rust', 1)); vraagteken(ctx, 600, 560, q.on('Hoeveel', 1), 140); },
  s07(ctx, t, q) { bg(ctx, 'schema');
    const ad = q.on('longslagader', 1); const pA = 1 - ad;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const ins = q.on('inspanning', 1);
      rbc(ctx, 520, 430, 110, 0.98); text(ctx, '≈ 98 %', 520, 610, fTitel(48), C.text, 'center'); metaText(ctx, 'NAAR JE WEEFSELS', 520, 260, C.grain, 'center', 22);
      rbc(ctx, 960, 430, 110, 0.75); text(ctx, '≈ 75 %', 960, 610, fTitel(48), C.text, 'center'); metaText(ctx, 'TERUG, IN RUST', 960, 260, C.grain, 'center', 22);
      rbc(ctx, 1400, 430, 110, 0.3, ins); kop(ctx, 'veel lager', 1400, 610, ins, C.text, 48); if (ins > 0.01) { ctx.save(); ctx.globalAlpha *= ins; metaText(ctx, 'TERUG, BIJ INSPANNING', 1400, 260, C.grain, 'center', 22); ctx.restore(); }
      tag(ctx, 'in rust: ongeveer een kwart afgegeven', 960, 760, O2, q.on('kwart', 1) * (1 - q.on('blauw', 1)));
      tag(ctx, 'aderbloed: donkerder rood, niet blauw', 960, 760, BLOEDARM, q.on('blauw', 1) * (1 - ins));
      tag(ctx, 'inspanning: zuurstofspanning lager → veel meer los', 960, 760, SPIER, ins);
      ctx.restore(); }
    if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad;
      longKlein(ctx, 760, 330, 1.2, -1); longKlein(ctx, 1160, 330, 1.2, 1); hartVorm(ctx, 960, 660, 1.6);
      ctx.strokeStyle = BLOEDARM; ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(940, 610); ctx.lineTo(940, 470); ctx.quadraticCurveTo(940, 420, 820, 380); ctx.moveTo(940, 470); ctx.quadraticCurveTo(940, 420, 1100, 380); ctx.stroke(); arrow(ctx, 850, 395, 805, 378, BLOEDARM, 1, 8); arrow(ctx, 1070, 395, 1115, 378, BLOEDARM, 1, 8);
      const ld = q.on('longader', 1); ctx.save(); ctx.globalAlpha *= ld; ctx.strokeStyle = BLOEDRIJK; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(800, 460); ctx.quadraticCurveTo(960, 520, 985, 600); ctx.moveTo(1120, 460); ctx.quadraticCurveTo(990, 520, 985, 600); ctx.stroke(); arrow(ctx, 975, 560, 985, 605, BLOEDRIJK, 1, 8); ctx.restore();
      label(ctx, 'longslagader', 'zuurstofarm, naar de longen', 940, 520, 600, 600, 1, BLOEDARM); label(ctx, 'longader', 'zuurstofrijk, naar het hart', 1060, 510, 1260, 640, ld, BLOEDRIJK);
      tag(ctx, 'de naam zegt waarheen, niet hoeveel zuurstof', 960, 160, C.goud, q.on('zuurstofarme', 1));
      ctx.restore(); }
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const X = 380, Y = 230, Wc = 1000, Hc = 480; bindCurve(ctx, X, Y, Wc, Hc, { u: ramp(t, q.at('curve'), 3) });
    const vl = q.on('vlakke', 1), st = q.on('steile', 1);
    if (vl > 0.01) { ctx.save(); ctx.globalAlpha *= vl * 0.25; ctx.fillStyle = LUCHT; const a = curveXY(X, Y, Wc, Hc, 9)[0], b = curveXY(X, Y, Wc, Hc, 14)[0]; ctx.fillRect(a, Y, b - a, Hc); ctx.restore(); const [px, py] = curveXY(X, Y, Wc, Hc, 13); circ(ctx, px, py, 10, O2); label(ctx, 'longen ≈ 13 kPa', '97 %', px, py, 1440, 260, vl, LUCHT); }
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st * 0.25; ctx.fillStyle = SPIER; const a = curveXY(X, Y, Wc, Hc, 2)[0], b = curveXY(X, Y, Wc, Hc, 5.5)[0]; ctx.fillRect(a, Y, b - a, Hc); ctx.restore(); const [px, py] = curveXY(X, Y, Wc, Hc, 5); circ(ctx, px, py, 10, BLOEDARM); label(ctx, 'weefsels ≈ 2–5 kPa', 'steil: veel afgifte', px, py, 1440, 560, st, SPIER); }
    tag(ctx, 'verzadiging: % hemoglobine met zuurstof', 880, 130, C.text2, q.on('verzadiging', 1) * (1 - q.on('Binas', 1)));
    tag(ctx, 'zuurstofbindingscurve (Binas)', 880, 130, O2, q.on('Binas', 1));
  },
  s09(ctx, t, q) { bg(ctx, 'micro');
    spierCel(ctx, 640, 470, 620, 360); bloedbaan(ctx, 1080, 1700, 470);
    for (let i = 0; i < 5; i++) { const v = (t * 0.35 + i / 5) % 1; co2Mol(ctx, lerp(760, 1300, v), 400 + i * 35, 9, q.on('diffundeert', 1) * (v < 0.9 ? 1 : (1 - v) * 10)); }
    for (let i = 0; i < 4; i++) glucoseDeeltje(ctx, 470 + i * 60, 560, 14, q.on('glucose', 1) * (1 - q.on('diffundeert', 1)));
    tag(ctx, 'verbranding van glucose → koolstofdioxide', 760, 180, CO2, q.on('glucose', 1) * (1 - q.on('zuur', 1)));
    tag(ctx, 'hoopt het op → bloed te zuur', 760, 180, C.koraal, q.on('zuur', 1) * (1 - q.on('diffundeert', 1)));
    tag(ctx, 'diffusie: van hoog naar laag', 760, 180, CO2, q.on('diffundeert', 1) * (1 - q.on('reist', 1)));
    vraagteken(ctx, 1450, 300, q.on('reist', 1), 140);
  },
  s11(ctx, t, q) { bg(ctx, 'micro');
    const lo = q.on('longen', 1); const pA = 1 - lo; const pie = q.on('zeventig', 1);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      const sh = pie * 1; const RX = lerp(800, 600, sh); const ew0 = q.on('eiwit', 1); rbc(ctx, RX, 470, 230, 0.75); ctx.save(); ctx.globalAlpha *= 1 - ew0; metaText(ctx, 'RODE BLOEDCEL', RX, 200, C.grain, 'center', 22);
      const re = q.on('reageert', 1); co2Mol(ctx, RX - 130, 470, 12, re); regel(ctx, '+', RX - 80, 482, re, C.text, 40, 'center', 700); circ(ctx, RX - 40, 470, 14, rgba(LUCHT, re)); regel(ctx, 'water', RX - 40, 515, re, C.text2, 22, 'center', 400);
      const on = q.on('waterstofcarbonaat', 1); arrow(ctx, RX + 5, 470, RX + 60, 470, C.text, on, 4); hco3(ctx, RX + 120, 450, on, 26); hIon(ctx, RX + 110, 510, q.on('zuur', 1), 14);
      for (let i = 0; i < 4; i++) { const v = (t * 0.3 + i / 4) % 1; hco3(ctx, lerp(RX + 170, RX + 420, v), 380 + i * 50, q.on('plasma', 1) * (1 - v * 0.6), 22); }
      regel(ctx, 'bloedplasma', RX + 300, 330, q.on('plasma', 1), C.text2, 28); ctx.restore();
      if (pie > 0.01) { ctx.save(); ctx.globalAlpha *= pie; const parts = [[0.7, CO2, 'HCO₃⁻ in plasma 70 %'], [0.2, BLOEDRIJK, 'aan hemoglobine 20 %'], [0.1, LUCHT, 'opgelost 10 %']]; let a0 = -Math.PI / 2; parts.forEach(([f, col, lab], i) => { const al = i === 0 ? 1 : i === 1 ? q.on('vijfde', 1) : q.on('rest', 1); ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.moveTo(1450, 470); ctx.arc(1450, 470, 170, a0, a0 + f * 6.283); ctx.closePath(); shape(ctx, rgba(col, 0.6), col, 2); text(ctx, lab, 1450, 700 + i * 46, fTekst(30, 600), C.text, 'center'); ctx.restore(); a0 += f * 6.283; }); ctx.restore(); }
      const ew = q.on('eiwit', 1); if (ew > 0.01) { ctx.save(); ctx.globalAlpha *= ew; hbMol(ctx, RX, 470, 1.3, { o2: 3, co2: 1 }); label(ctx, 'CO₂ op het eiwit', '', RX - 125, 470, RX - 200, 760, 1, CO2); label(ctx, 'O₂ op het ijzer', '', RX + 50, 420, RX + 240, 760, 1, O2); ctx.restore(); }
      ctx.restore(); }
    if (lo > 0.01) { ctx.save(); ctx.globalAlpha *= lo; longblaasje(ctx, 560, 470, 200, t, { co2: 1 }); rbc(ctx, 1150, 470, 150, 0.98); hco3(ctx, 1150, 440, 1, 24); arrow(ctx, 1150, 470, 1150, 520, C.text, 1, 3); co2Mol(ctx, 1150, 545, 10, 1);
      for (let i = 0; i < 3; i++) { const v = (t * 0.5 + i / 3) % 1; co2Mol(ctx, lerp(1000, 800, v), 440 + i * 30, 9, 1 - v); }
      tag(ctx, 'in de longen andersom: HCO₃⁻ → CO₂ → uitgeademd', 960, 170, CO2, 1); tag(ctx, 'je ademt het uit → weinig CO₂ in het longblaasje', 960, 820, LUCHT, q.on('uit', 1)); ctx.restore(); }
  },
  s12(ctx, t, q) { bg(ctx, 'schema');
    const y0 = 300; const st = [q.on('reactie', 1), q.on('koolzuur', 2), q.on('splitst', 1)];
    metaText(ctx, 'IN DE RODE BLOEDCEL', 760, 170, C.grain, 'center', 22); ctx.save(); ctx.globalAlpha *= st[0]; co2Mol(ctx, 260, y0, 12); text(ctx, 'CO₂', 260, y0 + 50, fTekst(26, 700), C.text, 'center'); text(ctx, '+ H₂O', 360, y0 + 14, fTekst(40, 700), C.text, 'center'); ctx.restore();
    arrow(ctx, 450, y0, 640, y0, C.text, st[0], 4); tag(ctx, 'koolzuuranhydrase', 545, y0 - 60, C.groen, q.on('koolzuuranhydrase', 1)); regel(ctx, '> 1 000 000× sneller', 545, y0 + 70, q.on('miljoen', 1), C.groen, 26, 'center');
    regel(ctx, 'H₂CO₃', 760, y0 + 14, st[1], C.text, 40, 'center', 700); regel(ctx, 'koolzuur', 760, y0 + 60, st[1], C.text2, 26, 'center');
    arrow(ctx, 870, y0, 1020, y0, C.text, st[2], 4); hIon(ctx, 1090, y0, st[2], 20); regel(ctx, '+', 1150, y0 + 14, st[2], C.text, 40, 'center'); hco3(ctx, 1260, y0, st[2], 30);
    arrow(ctx, 1260, y0 + 40, 1520, y0 + 40, CO2, q.on('plasma', 1), 3); regel(ctx, 'naar het plasma', 1540, y0 + 50, q.on('plasma', 1), C.text2, 28);
    const hb = q.on('opgevangen', 1); arrow(ctx, 1090, y0 + 30, 1090, 470, C.goud, hb, 3); hbMol(ctx, 1090, 560, 0.9, { a: hb, o2: 4, h: hb });
    tag(ctx, 'hemoglobine als buffer', 1090, 720, C.goud, hb * (1 - q.on('werkende', 1)));
    const sp = q.on('werkende', 1); if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; spierCel(ctx, 360, 640, 400, 240); bloedbaan(ctx, 640, 1000, 640); for (let i = 0; i < 4; i++) co2Mol(ctx, 520 + i * 20, 560 + i * 50, 8, 1); for (let i = 0; i < 8; i++) hIon(ctx, 680 + (i % 4) * 90, 610 + Math.floor(i / 4) * 60, 1, 13); regel(ctx, 'veel H⁺ in het bloed', 820, 740, 1, C.goud, 26, 'center'); ctx.restore(); }
    tag(ctx, '+ melkzuur · warmer', 600, 830, C.koraal, q.on('melkzuur', 1));
    vraagteken(ctx, 1560, 640, q.on('Laat', 1), 140);
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const X = 380, Y = 230, Wc = 1000, Hc = 480; bindCurve(ctx, X, Y, Wc, Hc, {}); const sh = ramp(t, q.at('rechts'), 2); bindCurve(ctx, X, Y, Wc, Hc, { p50: lerp(3.6, 4.6, sh), col: C.goud, as: q.on('rechts', 1) });
    const p = 4; const [x1, y1] = curveXY(X, Y, Wc, Hc, p), [x2, y2] = curveXY(X, Y, Wc, Hc, p, 4.6);
    const ex = q.on('extra', 1); if (ex > 0.01) { ctx.save(); ctx.globalAlpha *= ex; circ(ctx, x1, y1, 9, O2); circ(ctx, x2, y2, 9, C.goud); arrow(ctx, x1 + 20, y1, x1 + 20, y2, C.goud, 1, 4); ctx.restore(); label(ctx, 'meer zuurstof los', 'zelfde zuurstofspanning', x1 + 30, (y1 + y2) / 2, 1440, 560, ex, C.goud); }
    tag(ctx, 'H⁺ op hemoglobine → zuurstof laat makkelijker los', 880, 130, C.goud, q.on('Waterstofionen', 1) * (1 - q.on('Bohr', 1)));
    tag(ctx, 'Bohr-effect: curve schuift naar rechts', 880, 130, C.goud, q.on('Bohr', 1));
    regel(ctx, '— normaal', 1440, 320, 1, O2, 30); regel(ctx, '— zuurder, warmer', 1440, 370, q.on('rechts', 1), C.goud, 30);
  },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const kr = q.on('Sensor', 2); const sp = q.on('sporten', 1); const pA = 1 - kr;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const v = 0.5 + 0.5 * Math.sin(t * (1.2 + 1.4 * q.on('dieper', 1)));
      hoofdHersenen(ctx, 520, 320, 1, { centrum: q.on('ademcentrum', 1), chemo: q.on('chemoreceptoren', 1), t });
      torsoSchets(ctx, 1240, 520, 1.05, v, q.on('zenuwen', 1));
      const zn = q.on('zenuwen', 1); if (zn > 0.01) { ctx.save(); ctx.globalAlpha *= zn; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(494, 490); ctx.bezierCurveTo(700, 700, 950, 700, 1060, 640); ctx.stroke(); ctx.beginPath(); ctx.moveTo(494, 490); ctx.bezierCurveTo(700, 380, 900, 360, 1060, 400); ctx.stroke(); ctx.restore(); }
      label(ctx, 'ademcentrum', 'verlengde merg (hersenstam)', 494, 490, 60, 790, q.on('ademcentrum', 1), C.goud, 'left');
      label(ctx, 'chemoreceptoren', 'meten vooral CO₂', 530, 505, 780, 820, q.on('chemoreceptoren', 1), CO2);
      tag(ctx, 'automatisch, ook als je slaapt', 960, 120, C.text2, q.on('slaapt', 1) * (1 - q.on('chemoreceptoren', 1)));
      tag(ctx, 'meer CO₂ → bloed iets zuurder → sneller en dieper', 960, 120, CO2, q.on('zuurder', 1));
      ctx.restore(); }
    if (kr > 0.01) { ctx.save(); ctx.globalAlpha *= kr * (1 - sp);
      const nodes = [{ t: 'CO₂ in je bloed', s: 'stijgt', rol: 'GEREGELDE WAARDE', col: CO2 }, { t: 'chemoreceptoren', rol: 'SENSOR', col: CO2 }, { t: 'ademcentrum', rol: 'REGELCENTRUM', col: C.goud }, { t: 'ademspieren', s: 'sneller en dieper', rol: 'EFFECTOR', col: SPIER }];
      kringSchema(ctx, 960, 470, { nodes, rx: 540, ry: 280, bw: 420, bh: 120, arr: [1, q.on('regelcentrum', 1), q.on('uitvoerder', 1), q.on('daalt', 1)], minus: q.on('terugkoppeling', 1), pulse: (t / 5) % 1 });
      tag(ctx, 'het gevolg remt zijn eigen oorzaak', 960, 860, C.goud, q.on('remt', 1)); ctx.restore(); }
    if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; const u = ramp(t, q.at('sporten'), 5);
      grafiek(ctx, 380, 200, 1100, 480, { xmax: 10, ymax: 10, u, f: x => x < 3 ? 2 : 2 + 6 * (1 - Math.exp(-(x - 3) * 0.9)), xticks: [], yticks: [], xlab: 'tijd', ylab: '', col: SPIER });
      grafiek(ctx, 380, 200, 1100, 480, { xmax: 10, ymax: 10, u, f: x => x < 3 ? 5 : 5 + 0.5 * Math.exp(-(x - 3) * 0.8) * (x - 3), xticks: [], yticks: [], col: CO2 });
      regel(ctx, 'ademen (sneller en dieper)', 1500, 290, q.on('dieper', 2), SPIER, 30); regel(ctx, 'CO₂ in je bloed', 1500, 470, 1, CO2, 30); regel(ctx, 'blijft bijna gelijk', 1500, 510, q.on('gelijk', 1), CO2, 28);
      ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = rgba(C.text, 0.5); ctx.beginPath(); ctx.moveTo(380 + 0.3 * 1100, 200); ctx.lineTo(380 + 0.3 * 1100, 680); ctx.stroke(); ctx.restore(); regel(ctx, 'start sporten', 380 + 0.3 * 1100 + 12, 230, 1, C.text2, 26);
      ctx.restore(); }
  },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const hv = q.on('levensgevaarlijk', 1); const pA = 1 - hv; const X = 380, Wg = 1000, YO = 200, YC = 530, Hp = 250;
    const panel = (o) => { const { xmax, uO, uC, fO, fC, xlab, drang, flauw, lo, lc, aC = 1 } = o;
      grafiek(ctx, X, YO, Wg, Hp, { xmax, ymax: 100, u: uO, f: fO, xticks: [], yticks: [], ylab: 'zuurstof in je bloed', col: O2 });
      grafiek(ctx, X, YC, Wg, Hp, { a: aC, xmax, ymax: 100, u: uC, f: fC, xticks: xlab ? [0, xmax / 3, 2 * xmax / 3, xmax].map(v => Math.round(v)) : [], yticks: [], xlab, ylab: 'koolstofdioxide in je bloed', col: CO2 });
      const yd = YC + Hp - 0.75 * Hp; ctx.save(); ctx.globalAlpha *= drang * aC; ctx.setLineDash([10, 8]); ctx.strokeStyle = CO2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, yd); ctx.lineTo(X + Wg, yd); ctx.stroke(); ctx.restore(); regel(ctx, 'drempel: drang om te ademen', X + 20, yd - 12, drang * aC, CO2, 24);
      if (flauw != null) { const yf = YO + Hp - 0.45 * Hp; ctx.save(); ctx.globalAlpha *= flauw; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, yf); ctx.lineTo(X + Wg, yf); ctx.stroke(); ctx.restore(); regel(ctx, 'drempel: flauwvallen', X + 20, yf - 12, flauw, C.koraal, 24); }
      if (lo) regel(ctx, lo[0], X + Wg + 20, YO + Hp - fO(xmax * Math.min(uO, 1)) / 100 * Hp + 10, lo[1], O2, 26);
      if (lc) regel(ctx, lc[0], X + Wg + 20, YC + Hp - fC(xmax * Math.min(uC, 1)) / 100 * Hp + 10, lc[1] * aC, CO2, 26); };
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      panel({ xmax: 60, uO: ramp(t, q.at('wat', 1), 14), uC: ramp(t, q.at('Ondertussen'), 6), fO: s => 97 - 0.1 * s, fC: s => 30 + 0.8 * s, xlab: 'adem inhouden (s)', drang: q.on('dwingt', 1), aC: q.on('Ondertussen', 1), lo: ['bijna vol', q.on('vol', 1)], lc: ['stijgt', q.on('stijgende', 1)] });
      tag(ctx, 'grote hersenen: bewust inhouden, even', 880, 110, C.text2, q.on('bewust', 1) * (1 - q.on('wat', 1)));
      tag(ctx, 'je longen zijn nooit leeg: > 1 liter lucht', 880, 110, LUCHT, q.on('leeg', 1) * (1 - q.on('dwingt', 1)));
      tag(ctx, 'antwoord b: te veel koolstofdioxide', 880, 110, C.goud, q.on('antwoord', 1) * (1 - q.on('halsslagader', 1)));
      tag(ctx, 'sensoren in halsslagader en aorta', 880, 110, O2, q.on('halsslagader', 1) * (1 - q.on('alarm', 1))); tag(ctx, 'zuurstofalarm pas als die echt laag wordt', 880, 110, O2, q.on('alarm', 1));
      ctx.restore(); }
    if (hv > 0.01) { ctx.save(); ctx.globalAlpha *= hv; const u = ramp(t, q.at('blaast'), 12);
      panel({ xmax: 90, uO: u, uC: u, fO: s => 98 - 0.0075 * s * s, fC: s => 8 + 0.72 * s, xlab: 'onder water (s)', drang: 1, flauw: q.on('flauwvallen', 1), lo: ['daalt gewoon door', q.on('daalt', 2)], lc: ['begon laag, stijgt', q.on('weg', 1)] });
      tag(ctx, 'snel en diep ademen vooraf: levensgevaarlijk', 880, 110, C.koraal, 1 - q.on('Doe', 1));
      ctx.restore(); tag(ctx, 'nooit doen · nooit alleen onder water zwemmen', 880, 110, C.koraal, q.on('Doe', 1)); }
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const hb = q.on('ijzerplek', 1); const pA = 1 - hb;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; huisje(ctx, 700, 560, 1); toestel(ctx, 520, 560, 'cv-ketel', q.on('ketel', 1), t); toestel(ctx, 720, 560, 'geiser', q.on('geiser', 1), t); toestel(ctx, 920, 560, 'kachel', q.on('kachel', 1), t);
      for (let i = 0; i < 14; i++) { const v = (t * 0.12 + hash(i)) % 1; coMol(ctx, 450 + hash(i * 3) * 520, 470 - v * 260, 9, q.on('onvolledige', 1) * (1 - v)); }
      tag(ctx, 'onvolledige verbranding → koolmonoxide (CO)', 1380, 260, CO, q.on('onvolledige', 1) * (1 - q.on('ruikt', 1)) + 0 * 0, 'center');
      tag(ctx, 'je ruikt het niet, je ziet het niet', 1380, 260, C.koraal, q.on('ruikt', 1)); ctx.restore(); }
    if (hb > 0.01) { ctx.save(); ctx.globalAlpha *= hb; const nC = 4 * ramp(t, q.at('ijzerplek'), 3);
      hbMol(ctx, 760, 470, 2.2, { o2: 0, co: nC }); label(ctx, 'koolmonoxide op de ijzerplek', '', 760 + 70, 470 - 70, 1250, 230, ramp(t, q.at('ijzerplek') + 1.5, 1), '#B8BCC6');
      tag(ctx, '≈ 200× sterker · laat moeilijk los', 1380, 820, C.koraal, q.on('tweehonderd', 1));
      const bz = q.on('bezet', 1); const bzr = ramp(t, q.at('bezet'), 4); if (bz > 0.01) for (let i = 0; i < 8; i++) { const k = i < 5 ? clamp(bzr * 5 - i, 0, 1) : 0; hbMol(ctx, 1240 + (i % 4) * 140, 380 + Math.floor(i / 4) * 160, 0.55, { a: bz, co: k > 0.5 ? 4 : 0, o2: k > 0.5 ? 0 : 4 }); }
      vraagteken(ctx, 400, 300, q.on('merk', 1), 130); ctx.restore(); }
  },
  s19(ctx, t, q) { bg(ctx, 'schema');
    const sy = q.on('vage', 1); const pA = 1 - sy;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      meter(ctx, 520, 300, 300, 0.45, 'CO₂', CO2, q.on('afgevoerd', 1), 'normaal'); regel(ctx, 'ademcentrum: niets bijzonders', 520, 690, q.on('ademcentrum', 1), CO2, 30, 'center');
      meter(ctx, 960, 300, 300, 0.85, 'opgeloste O₂', O2, q.on('opgelost', 1), 'normaal'); regel(ctx, 'zuurstofsensoren: geen alarm', 960, 690, q.on('normaal', 1), O2, 30, 'center');
      meter(ctx, 1400, 300, 300, 0.4, 'O₂ aan hemoglobine', BLOEDRIJK, q.on('minder', 1), 'veel minder'); regel(ctx, 'maar je weefsels krijgen te weinig', 1400, 690, q.on('minder', 1), C.koraal, 30, 'center');
      tag(ctx, 'antwoord b: je merkt bijna niets', 960, 160, C.goud, 1); ctx.restore(); }
    if (sy > 0.01) { ctx.save(); ctx.globalAlpha *= sy;
      ['hoofdpijn', 'misselijk', 'suf'].forEach((s, i) => tag(ctx, s, 380 + i * 280, 260, C.text2, q.on('hoofdpijn', 1) * clamp((t - q.at('hoofdpijn')) * 1.5 - i * 0.5, 0, 1)));
      tag(ctx, 'daarna bewusteloos, soms dodelijk', 660, 380, C.koraal, q.on('bewusteloos', 1));
      melder(ctx, 1450, 330, q.on('Gaat', 1), t, q.on('koolmonoxidemelder', 1)); regel(ctx, 'koolmonoxidemelder', 1450, 450, q.on('koolmonoxidemelder', 1), C.text, 30, 'center');
      const st = [['ramen open', 'ramen'], ['naar buiten', 'buiten'], ['bel 112', 'honderdtwaalf']]; st.forEach(([s, w], i) => tag(ctx, (i + 1) + '. ' + s, 1450, 560 + i * 90, C.groen, q.on(w, 1)));
      ctx.restore(); }
  },
  s20(ctx, t, q) { bg(ctx, 'schema');
    const ep = q.on('nieren', 1); const pA = 1 - ep;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; berg(ctx);
      const d = (n, x, y, w, h, s) => { const nO = Math.round(n * 0.21); for (let i = 0; i < n; i++) { const xx = x + hash(i * 7 + s) * w, yy = y + hash(i * 13 + s) * h; if (i < nO) o2Mol(ctx, xx, yy, 6); else circ(ctx, xx, yy, 5, rgba(LUCHT, 0.7)); } };
      const lu = q.on('lucht', 1); if (lu > 0.01) { ctx.save(); ctx.globalAlpha *= lu; roundRect(ctx, 220, 620, 260, 200, 16); shape(ctx, rgba(C.bgSchema, 0.85), C.line, 1.5); d(48, 240, 640, 220, 160, 1); metaText(ctx, 'ZEENIVEAU', 350, 600, C.grain, 'center', 20); roundRect(ctx, 1080, 300, 260, 200, 16); shape(ctx, rgba(C.bgSchema, 0.85), C.line, 1.5); d(29, 1100, 320, 220, 160, 2); metaText(ctx, '4000 M', 1210, 280, C.grain, 'center', 20); ctx.restore(); }
      fiets(ctx, lerp(500, 980, (t * 0.02) % 1), lerp(560, 330, (t * 0.02) % 1), 1, t, 1);
      tag(ctx, 'nog steeds 21 % zuurstof, maar lagere druk', 960, 130, LUCHT, q.on('eenentwintig', 1) * (1 - q.on('veertig', 1)));
      tag(ctx, '≈ 40 % minder zuurstof per ademteug', 960, 130, O2, q.on('veertig', 1) * (1 - q.on('alarm', 1)));
      tag(ctx, 'zuurstofsensoren: alarm → sneller ademen, hart sneller', 960, 130, C.koraal, q.on('alarm', 1));
      ctx.restore(); }
    if (ep > 0.01) { ctx.save(); ctx.globalAlpha *= ep * (1 - q.on('doping', 1) * 0.0);
      nierVorm(ctx, 420, 360, 1.1, -1, 1); nierVorm(ctx, 560, 360, 1.1, 1, 1); regel(ctx, 'nieren', 490, 500, 1, C.text2, 30, 'center');
      const e = q.on('EPO', 1); for (let i = 0; i < 6; i++) { const v = (t * 0.3 + i / 6) % 1; hormoonVorm(ctx, lerp(620, 1000, v), 380 + 30 * Math.sin(i * 2 + v * 6), 10, 'groei', e); } tag(ctx, 'EPO (hormoon)', 810, 260, C.goud, e);
      botje(ctx, 1220, 380, 1, q.on('beenmerg', 1)); regel(ctx, 'rood beenmerg', 1220, 480, q.on('beenmerg', 1), C.text2, 30, 'center');
      for (let i = 0; i < 5; i++) { const v = (t * 0.25 + i / 5) % 1; rbc(ctx, lerp(1380, 1700, v), 360 + 22 * Math.sin(i * 3), 22, 0.9, q.on('beenmerg', 1) * (1 - v * 0.5)); }
      grafiek(ctx, 420, 570, 760, 200, { a: q.on('weken', 1), xmax: 4, ymax: 10, u: ramp(t, q.at('weken'), 4), f: w => 7 + 0.6 * (1 - Math.exp(-w * 0.8)), xticks: [0, 1, 2, 3, 4], yticks: [], xlab: 'weken op hoogte', ylab: 'hemoglobine', col: BLOEDRIJK });
      tag(ctx, 'hoogtestage: wielrenners, hardlopers', 1500, 640, C.text2, q.on('wielrenners', 1) * (1 - q.on('doping', 1)));
      tag(ctx, 'EPO-doping: dik bloed, verboden, gevaarlijk', 1540, 860, C.koraal, q.on('doping', 1));
      ctx.restore(); }
  },
  s21(ctx, t, q) { klasAchtergrond(ctx);
    person(ctx, 640, 900, 560, 1, { armR: { a1: 0.5, a2: 1.2 }, armL: { a1: 0.5, a2: 1.2 } }); schoolbank(ctx, 640, 660, 600);
    const ch = [['zuurstof: nog genoeg aan hemoglobine', 'genoeg', O2], ['koolstofdioxide hoopte zich op', 'hoopte', CO2], ['chemoreceptoren → ademcentrum → ademen', 'chemoreceptoren', C.goud], ['antwoord b: te veel koolstofdioxide', 'antwoord', C.goud]];
    ch.forEach(([s, w, col], i) => tag(ctx, s, 1360, 560 + i * 85, col, q.on(w, 1), 'center'));
  },
};
