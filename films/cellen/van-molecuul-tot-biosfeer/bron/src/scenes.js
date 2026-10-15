// Cellen · Van molecuul tot biosfeer — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2E211A', shirt: '#C9483E', hairStyle: 'long', trousers: '#2A3242' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(34, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(34, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }

// ---------- kleuren ----------
const VIR = '#E07A5F', RNA = '#E0B64A', VET = '#E8D27A', MEES_G = '#F0D040', MEES_B = '#5B8CA8', SPIER = '#D86A6A', ZENUW = '#E0B64A', HUIDC = '#C9A35C', BLAD = '#7FC48F', BAC = '#7FC48F';
const NIV = ['molecuul', 'organel', 'cel', 'weefsel', 'orgaan', 'orgaanstelsel', 'organisme', 'populatie', 'levensgemeenschap', 'ecosysteem', 'biosfeer'];
const EXAMEN = [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1]; // hoofdniveaus van het examenprogramma (vetter)

// ---------- figuren ----------
function griepvirus(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 18; i++) { const an = i / 18 * 6.283 + t * 0.1; const x1 = x + Math.cos(an) * r, y1 = y + Math.sin(an) * r, x2 = x + Math.cos(an) * r * 1.32, y2 = y + Math.sin(an) * r * 1.32; ctx.strokeStyle = i % 3 ? VIR : '#C9708F'; ctx.lineWidth = Math.max(2, r * 0.06); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); circ(ctx, x2, y2, Math.max(2, r * 0.07), i % 3 ? VIR : '#C9708F'); }
  circ(ctx, x, y, r, rgba(VET, 0.25), VET, Math.max(2, r * 0.07)); circ(ctx, x, y, r * 0.84, rgba(VIR, 0.15), rgba(VIR, 0.8), Math.max(1.5, r * 0.04));
  ctx.strokeStyle = RNA; ctx.lineWidth = Math.max(2, r * 0.05); ctx.lineCap = 'round'; for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283, cx = x + Math.cos(an) * r * 0.45, cy = y + Math.sin(an) * r * 0.45; ctx.beginPath(); ctx.moveTo(cx - r * 0.12, cy - r * 0.08); ctx.quadraticCurveTo(cx, cy + r * 0.1, cx + r * 0.12, cy - r * 0.06); ctx.stroke(); }
  ctx.restore(); }
function koolmees(ctx, x, y, s = 1, a = 1, flap = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 10); ctx.lineTo(-115, 30); ctx.lineTo(-108, 4); ctx.closePath(); shape(ctx, '#3E5A6E', null);
  ctx.beginPath(); ctx.ellipse(0, 10, 66, 46, -0.1, 0, 6.283); shape(ctx, MEES_G, null);
  ctx.fillStyle = '#1A1A1E'; ctx.fillRect(-6, -10, 12, 58);
  ctx.save(); ctx.translate(-10, -6); ctx.rotate(-0.25 - flap * 0.8); ctx.beginPath(); ctx.ellipse(-12, 0, 52, 24, 0.1, 0, 6.283); shape(ctx, MEES_B, '#3E5A6E', 2); ctx.restore();
  circ(ctx, 52, -26, 32, '#1A1A1E'); ctx.beginPath(); ctx.ellipse(56, -18, 17, 12, 0, 0, 6.283); shape(ctx, '#F2F2EE', null); circ(ctx, 64, -34, 4, '#F2F2EE');
  ctx.beginPath(); ctx.moveTo(82, -30); ctx.lineTo(98, -24); ctx.lineTo(82, -20); ctx.closePath(); shape(ctx, '#2A2A2E', null);
  ctx.strokeStyle = '#6B5848'; ctx.lineWidth = 4; for (const lx of [-10, 12]) { ctx.beginPath(); ctx.moveTo(lx, 52); ctx.lineTo(lx, 74); ctx.stroke(); }
  ctx.restore(); }
function merel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-120, 24); ctx.lineTo(-112, -4); ctx.closePath(); shape(ctx, '#1A1A1E', null); ctx.beginPath(); ctx.ellipse(0, 8, 66, 42, -0.1, 0, 6.283); shape(ctx, '#22242A', null); circ(ctx, 54, -24, 30, '#22242A'); ctx.beginPath(); ctx.moveTo(80, -28); ctx.lineTo(102, -22); ctx.lineTo(80, -16); ctx.closePath(); shape(ctx, '#E0A030', null); circ(ctx, 62, -30, 6, '#E0A030'); ctx.restore(); }
function rups(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) circ(ctx, x + i * 16 * s, y - Math.abs(Math.sin(t * 2 + i * 0.6)) * 6 * s, 10 * s, i === 6 ? '#5A8C3A' : '#8CC05A'); ctx.restore(); }
function eik(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B4E3A'; ctx.fillRect(x - 16 * s, y - 150 * s, 32 * s, 150 * s); for (const [dx, dy, r] of [[0, -230, 90], [-70, -190, 70], [70, -190, 70], [-40, -270, 60], [45, -270, 60]]) circ(ctx, x + dx * s, y + dy * s, r * s, '#4A7A3A'); ctx.restore(); }
function paddenstoel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E6E1D3'; ctx.fillRect(x - 8 * s, y - 40 * s, 16 * s, 40 * s); ctx.beginPath(); ctx.ellipse(x, y - 40 * s, 36 * s, 22 * s, 0, Math.PI, 0); shape(ctx, '#B5574A', null); ctx.restore(); }
function eiwit(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = SPIER; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = x + (u - 0.5) * 220 * s, py = y + Math.sin(u * 18) * 22 * s + Math.sin(u * 5) * 18 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); for (let i = 0; i < 12; i++) { const u = i / 11, px = x + (u - 0.5) * 220 * s, py = y + Math.sin(u * 18) * 22 * s + Math.sin(u * 5) * 18 * s; circ(ctx, px, py, 6 * s, lighten(SPIER, 0.3)); } ctx.restore(); }
function celkern(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.kern, 0.55), C.kernR, 3); circ(ctx, x + r * 0.2, y - r * 0.15, r * 0.25, rgba(C.kernR, 0.8)); for (let i = 0; i < 6; i++) { const an = i * 1.05; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, 3, '#1A2740'); } ctx.restore(); }
function spiercel(ctx, x, y, w, h, a = 1, kracht = 0, col = SPIER) { if (a <= 0.01) return; const ww = w * (1 - 0.15 * kracht), hh = h * (1 + 0.15 * kracht); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - ww / 2, y); ctx.quadraticCurveTo(x, y - hh, x + ww / 2, y); ctx.quadraticCurveTo(x, y + hh, x - ww / 2, y); shape(ctx, rgba(col, 0.5), col, 2); circ(ctx, x, y, hh * 0.3, rgba(C.kern, 0.8)); ctx.restore(); }
function zenuwcel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = ZENUW; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * 46 * s, y + Math.sin(an) * 46 * s); ctx.stroke(); } ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 120 * s, y + 30 * s); ctx.stroke(); circ(ctx, x, y, 22 * s, rgba(ZENUW, 0.6), ZENUW, 2); circ(ctx, x, y, 8 * s, rgba(C.kern, 0.9)); ctx.restore(); }
function huidcel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 20 * s, 100 * s, 40 * s, 10 * s); shape(ctx, rgba(HUIDC, 0.5), HUIDC, 2); circ(ctx, x, y, 9 * s, rgba(C.kern, 0.9)); ctx.restore(); }
function bolcel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#E6D8A8', 0.35), '#E6D8A8', 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.8)); ctx.restore(); }
function hart(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; const p = 1 + 0.05 * Math.max(0, Math.sin(t * 7)); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * p, s * p); ctx.beginPath(); ctx.moveTo(0, 80); ctx.bezierCurveTo(-110, 10, -90, -80, -30, -70); ctx.bezierCurveTo(-10, -66, 0, -50, 0, -40); ctx.bezierCurveTo(0, -50, 10, -66, 30, -70); ctx.bezierCurveTo(90, -80, 110, 10, 0, 80); shape(ctx, '#B5474A', '#E07A6E', 3); ctx.restore(); }
function aarde(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#2E6FBF', '#8FB8E0', 3); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); for (const [dx, dy, rx, ry] of [[-0.3, -0.2, 0.35, 0.25], [0.35, 0.1, 0.3, 0.4], [-0.1, 0.45, 0.25, 0.15]]) { ctx.beginPath(); ctx.ellipse(x + (dx + 0.05 * Math.sin(t * 0.3)) * r, y + dy * r, rx * r, ry * r, 0.3, 0, 6.283); shape(ctx, '#4A8A4A', null); } ctx.restore(); ctx.restore(); }
function bacterieC(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 36 * s, 180 * s, 72 * s, 36 * s); shape(ctx, rgba(BAC, 0.3), BAC, 3); ctx.strokeStyle = rgba('#E0B64A', 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, px = x + (u - 0.5) * 110 * s, py = y + Math.sin(u * 14) * 12 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); for (let i = 0; i < 10; i++) circ(ctx, x + (hash(i) - 0.5) * 140 * s, y + (hash(i + 9) - 0.5) * 44 * s, 3 * s, rgba('#C9B896', 0.9)); ctx.strokeStyle = BAC; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 90 * s, y); ctx.bezierCurveTo(x + 130 * s, y - 20 * s, x + 150 * s, y + 20 * s, x + 190 * s, y); ctx.stroke(); ctx.restore(); }
function deur(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 180, y - 360, 360, 720, 10); shape(ctx, '#6B5848', '#8C7660', 3); roundRect(ctx, x + 90, y - 20, 110, 30, 15); shape(ctx, '#C9C9C9', '#9AA3B2', 2); circ(ctx, x + 110, y - 5, 26, '#C9C9C9', '#9AA3B2', 2); ctx.restore(); }
function noorBed(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 380, y - 40, 760, 160, 16); shape(ctx, '#3A4A6A', null); roundRect(ctx, x - 360, y - 90, 200, 80, 30); shape(ctx, '#E6E1D3', null); roundRect(ctx, x - 200, y - 70, 560, 120, 40); shape(ctx, '#7A9AC8', '#5A7AA8', 2);
  circ(ctx, x - 250, y - 90, 58, SKINS[2]); ctx.beginPath(); ctx.arc(x - 250, y - 98, 62, Math.PI * 0.9, Math.PI * 2.1); ctx.lineTo(x - 300, y - 60); ctx.closePath(); ctx.fillStyle = '#2E211A'; ctx.fill(); circ(ctx, x - 228, y - 80, 9, '#D86A6A'); ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 3; for (const dx of [-262, -226]) { ctx.beginPath(); ctx.arc(x + dx, y - 96, 7, 0.2, Math.PI - 0.2); ctx.stroke(); }
  ctx.restore(); }

// ---------- ladder ----------
function ladder(ctx, lit, o = {}) { const { x = 110, y0 = 840, dy = 66, a = 1, cur = -1, virus = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y0 + 20); ctx.lineTo(x, y0 - 10 * dy - 20); ctx.moveTo(x + 40, y0 + 20); ctx.lineTo(x + 40, y0 - 10 * dy - 20); ctx.stroke();
  NIV.forEach((n, i) => { const y = y0 - i * dy, al = lit[i] || 0; ctx.strokeStyle = rgba(C.line, 0.6); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y); ctx.stroke();
    if (al > 0.01) { const isCur = i === cur; ctx.save(); ctx.globalAlpha *= al; if (isCur) { roundRect(ctx, x + 56, y - 30, 330, 46, 23); shape(ctx, rgba(C.goud, 0.18), C.goud, 1.5); } text(ctx, n, x + 72, y + 2, fTekst(30, EXAMEN[i] ? 700 : 500), C.text, 'left'); ctx.restore(); } });
  if (virus > 0.01) { const y = y0 - 1.5 * dy; griepvirus(ctx, x + 330, y, 24, t, virus); ctx.save(); ctx.globalAlpha *= virus; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 296, y); ctx.lineTo(x + 46, y); ctx.stroke(); ctx.restore(); regel(ctx, 'virus: geen cel', x + 370, y + 10, virus, C.koraal, 26, 'left', 700); }
  ctx.restore(); }
const KENM = ['bestaat uit cellen', 'stofwisseling', 'groei en ontwikkeling', 'voortplanting', 'prikkels en beweging', 'homeostase'];
function bord(ctx, x, y, w, rows, cols, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 70 + rows.length * 62, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.5), 1.5); metaText(ctx, 'LEVENSKENMERKEN', x + 30, y + 46, C.grain, 'left', 24);
  cols.forEach((c, j) => { if (c.a > 0.01) regel(ctx, c.naam, x + w - 70 - (cols.length - 1 - j) * 110, y + 46, c.a, c.col, 22, 'center', 700); });
  rows.forEach((r, i) => { const yy = y + 110 + i * 62; regel(ctx, r.s, x + 30, yy, r.a, C.text, 30, 'left', 600); cols.forEach((c, j) => { const cx = x + w - 70 - (cols.length - 1 - j) * 110, v = c.v[i]; if (!v || v.a <= 0.01) return; if (v.ok) vink(ctx, cx, yy - 12, 16, v.a); else kruis(ctx, cx, yy - 12, 14, v.a); }); });
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'schema'); ladder(ctx, NIV.map(() => 0.6), { x: 1480, y0: 860, dy: 60, a: 1 }); koolmees(ctx, 1300, 760, 0.7, 1, 0.3 * Math.sin(t * 3)); },

  s01(ctx, t, q) { bg(ctx, 'macro'); ctx.fillStyle = '#2A2F3E'; ctx.fillRect(0, 0, W, CAPTION_Y);
    const p2 = q.on('deurklink', 1), zoom = q.on('keel', 1) * (1 - p2);
    ctx.save(); ctx.globalAlpha *= 1 - p2; noorBed(ctx, 620, 620); tag(ctx, 'griep', 380, 420, C.koraal, q.on('griep', 1) * (1 - zoom));
      zoomCircle(ctx, 1380, 380, 260, 390, 520, 'neus en keel', zoom, () => { ctx.fillStyle = '#5A2A30'; ctx.fillRect(1100, 100, 560, 560); for (let i = 0; i < 9; i++) { const w = wander(i, t, 30, 0.5); griepvirus(ctx, 1260 + (i % 3) * 110 + w.x, 260 + Math.floor(i / 3) * 110 + w.y, 26, t, ramp(t, q.at('miljoenen', 1) + i * 0.15, 0.4)); } });
      tag(ctx, 'elk jaar een nieuwe griepprik', 1380, 760, C.teal, q.on('griepprik', 1)); ctx.restore();
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; deur(ctx, 760, 480); griepvirus(ctx, 900, 470, 30, 0); zoomCircle(ctx, 1400, 420, 220, 900, 470, 'op de deurklink', 1, () => { ctx.fillStyle = '#9AA3B2'; ctx.fillRect(1180, 200, 440, 440); griepvirus(ctx, 1400, 420, 110, 0); });
      tag(ctx, 'eet niet', 1250, 760, C.text2, q.on('eet', 1)); tag(ctx, 'groeit niet', 1550, 760, C.text2, q.on('groeit', 1)); vraagteken(ctx, 1400, 140, q.on('Leeft', 1), 110); ctx.restore(); } },

  s04(ctx, t, q) { bg(ctx, 'schema'); const mees = q.on('koolmees', 1);
    const rows = KENM.map((s, i) => ({ s, a: q.on(['cellen', 'stofwisseling', 'groeit', 'plant', 'prikkels', 'constant'][i], 1) }));
    const ck = (w) => ({ ok: true, a: q.on(w, 1) });
    bord(ctx, 120, 150, 900, rows, [{ naam: 'koolmees', col: MEES_G, a: mees, v: [ck('koolmees'), ck('rupsen'), {ok: true, a: q.on('groeit', 2)}, ck('legt'), ck('vliegt'), ck('warm')] }]);
    regel(ctx, 'een plant beweegt ook, heel langzaam', 570, 770, q.on('plant', 2) * (1 - mees), C.groen, 26, 'center', 700);
    koolmees(ctx, 1450, 480, 1.6, mees, q.on('vliegt', 1) * (0.5 + 0.5 * Math.sin(t * 14)));
    rups(ctx, 1260, 760, 1.2, q.on('rupsen', 1) * (1 - q.on('groeit', 2)), t);
    if (q.on('groeit', 2) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('groeit', 2) * (1 - q.on('vliegt', 1)); ctx.beginPath(); ctx.ellipse(1250, 750, 22, 30, 0, 0, 6.283); shape(ctx, '#F2EEE6', '#C9B896', 2); ctx.restore(); }
    tag(ctx, 'blijft warm, ook als het vriest', 1450, 790, C.goud, q.on('warm', 1) * (1 - q.on('leeft', 2)));
    tag(ctx, 'een koolmees leeft', 1450, 790, C.groen, q.on('leeft', 2)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const bac = q.on('bacterie', 1);
    eiwit(ctx, 520, 420, 1.4, 1 - 0.6 * bac); regel(ctx, 'los eiwit', 520, 560, 1 - 0.6 * bac, C.text2, 30, 'center', 700); kruis(ctx, 700, 330, 24, q.on('leeft', 1) * (1 - bac * 0.5)); tag(ctx, 'neemt geen stoffen op, plant zich niet voort', 520, 680, C.koraal, q.on('stoffen', 1) * (1 - bac));
    bacterieC(ctx, 1350, 420, 1.6, bac); regel(ctx, 'bacterie: één cel', 1350, 560, bac, BAC, 30, 'center', 700); vink(ctx, 1560, 320, 24, q.on('levenskenmerken', 1));
    tag(ctx, 'de cel is het kleinste niveau dat leeft', 960, 780, C.goud, q.on('kleinste', 1));
    griepvirus(ctx, 960, 200, 40, t, q.on('griepvirus', 1)); regel(ctx, 'straks', 1030, 210, q.on('griepvirus', 1), C.text2, 26, 'left', 700); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const l0 = q.on('molecuul', 1), l1 = q.on('organel', 1), l2 = q.on('Organellen', 1);
    const cur = l2 > 0.5 ? 2 : l1 > 0.5 ? 1 : 0; ladder(ctx, [Math.max(q.on('niveaus', 1) * 0.5, l0), Math.max(q.on('niveaus', 1) * 0.5, l1), Math.max(q.on('niveaus', 1) * 0.5, l2), 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5].map((v, i) => i > 2 ? q.on('niveaus', 1) * 0.5 : v), { cur: l0 > 0.3 ? cur : -1 });
    ctx.save(); ctx.globalAlpha *= l0 * (1 - l1); eiwit(ctx, 1200, 460, 2); regel(ctx, 'eiwit: een molecuul', 1200, 700, 1, SPIER, 32, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= l1 * (1 - l2); celkern(ctx, 1200, 460, 160); regel(ctx, 'celkern: een organel', 1200, 720, 1, C.kernR, 32, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= l2; spiercel(ctx, 1200, 460, 900, 150); regel(ctx, 'spiercel: een cel', 1200, 720, 1, SPIER, 32, 'center', 700); ctx.restore(); },

  s07(ctx, t, q) { bg(ctx, 'micro');
    const dl = q.on('deelt', 1), n = dl > 0 ? Math.min(8, Math.pow(2, Math.floor(clamp((t - q.at('deelt', 1)) / 1.2, 0, 3)))) : 1;
    const spec = q.on('spiercellen', 1), dif = q.on('differentiatie', 1);
    if (spec < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - spec; spiercel(ctx, 960, 480, 600, 110, 1 - q.on('bevruchte', 1)); vraagteken(ctx, 960, 300, 1 - q.on('bevruchte', 1), 100); regel(ctx, 'embryo: steeds meer cellen', 960, 200, dl, C.text, 32, 'center', 700); regel(ctx, 'bevruchte eicel', 960, 200, q.on('bevruchte', 1) * (1 - dl), C.text, 32, 'center', 700);
      const pts = [[0, 0], [1, 0], [0, 1], [1, 1], [0.5, -0.8], [0.5, 1.8], [-0.8, 0.5], [1.8, 0.5]]; const r = n === 1 ? 110 : n === 2 ? 80 : n === 4 ? 62 : 48;
      for (let i = 0; i < n; i++) { const [px, py] = n === 1 ? [0.5, 0.5] : n === 2 ? [i, 0.5] : pts[i]; bolcel(ctx, 960 + (px - 0.5) * (r * 2.1), 480 + (py - 0.5) * (r * 2.1), r, q.on('bevruchte', 1)); }
      tag(ctx, 'alle cellen: hetzelfde DNA', 960, 800, C.goud, q.on('DNA', 1)); ctx.restore(); }
    if (spec > 0.01) { ctx.save(); ctx.globalAlpha *= spec; const gen = q.on('genen', 1);
      const types = [['spiercel', SPIER, 'spiercellen'], ['zenuwcel', ZENUW, 'zenuwcellen'], ['huidcel', HUIDC, 'huidcellen']];
      types.forEach(([nm, col, w], i) => { const x = 420 + i * 540, al = q.on(w, 1); if (i === 0) spiercel(ctx, x, 400, 300, 70, al); else if (i === 1) zenuwcel(ctx, x - 50, 400, 1.6, al); else huidcel(ctx, x, 400, 1.8, al); regel(ctx, nm, x, 540, al, col, 30, 'center', 700);
        // dezelfde DNA-streng met andere genen aan
        ctx.save(); ctx.globalAlpha *= gen; for (let k = 0; k < 6; k++) { const on = (k % 3) === i || k === 5; roundRect(ctx, x - 150 + k * 52, 600, 44, 26, 6); shape(ctx, on ? rgba(col, 0.9) : rgba(C.line, 0.25), on ? col : rgba(C.line, 0.5), 1.5); } regel(ctx, 'genen aan', x, 670, 1, C.text2, 22, 'center', 600); ctx.restore(); });
      tag(ctx, 'zelfde DNA, andere genen aan', 960, 180, C.goud, gen * (1 - dif)); tag(ctx, 'differentiatie: eigen bouw, eigen taak', 960, 180, C.groen, dif); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const w = q.on('weefsel', 1), o = q.on('orgaan', 1), os = q.on('bloedvatenstelsel', 1), org = q.on('organisme', 1), bac = q.on('bacterie', 1);
    const cur = bac > 0.5 ? 2 : org > 0.5 ? 6 : os > 0.5 ? 5 : o > 0.5 ? 4 : 3; if (bac > 0.01) { ctx.save(); ctx.globalAlpha *= bac; roundRect(ctx, 166, 840 - 6 * 66 - 30, 330, 46, 23); shape(ctx, rgba(C.goud, 0.18), C.goud, 1.5); ctx.restore(); }
    ladder(ctx, NIV.map((_, i) => i <= 2 ? 1 : i === 3 ? Math.max(0.5, w) : i === 4 ? Math.max(0.5, o) : i === 5 ? Math.max(0.5, os) : i === 6 ? Math.max(0.5, org) : 0.5), { cur });
    ctx.save(); ctx.globalAlpha *= w * (1 - o); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) spiercel(ctx, 980 + c * 210 + (r % 2) * 100, 330 + r * 90, 220, 36, 1, 0.5 + 0.5 * Math.sin(t * 3)); regel(ctx, 'spierweefsel: cellen met dezelfde bouw en functie', 1250, 760, 1, SPIER, 28, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= o * (1 - os); hart(ctx, 1250, 460, 2.2, 1, t); regel(ctx, 'hart: een orgaan', 1250, 760, 1, '#E07A6E', 30, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= os * (1 - org); hart(ctx, 1250, 440, 1.1, 1, t); ctx.strokeStyle = '#B5474A'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(1250, 460, 330, 240, 0, 0, 6.283); ctx.stroke(); ctx.strokeStyle = '#5A7AC8'; ctx.beginPath(); ctx.ellipse(1250, 460, 290, 200, 0, 0.3, 2.9); ctx.stroke(); regel(ctx, 'hart + bloedvaten: bloedvatenstelsel', 1250, 780, 1, '#E07A6E', 30, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= org * (1 - bac); koolmees(ctx, 1250, 440, 2.2, 1, 0.2 * Math.sin(t * 3)); regel(ctx, 'koolmees: een organisme', 1250, 760, 1, MEES_G, 30, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= bac; bacterieC(ctx, 1200, 440, 2); regel(ctx, 'bacterie: één cel = het hele organisme', 1250, 760, 1, BAC, 30, 'center', 700); ctx.restore(); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const pop = q.on('populatie', 1), lg = q.on('levensgemeenschap', 1), vr = q.on('onderzoeker', 1);
    ctx.save(); ctx.globalAlpha *= 1 - vr; ladder(ctx, NIV.map((_, i) => i <= 6 ? 0.5 : i === 7 ? Math.max(0.5, pop) : i === 8 ? Math.max(0.5, lg) : 0.5), { cur: lg > 0.5 ? 8 : 7 });
      for (let i = 0; i < 6; i++) koolmees(ctx, 800 + (i % 3) * 260, 300 + Math.floor(i / 3) * 200 + 10 * Math.sin(t * 2 + i), 0.75, pop);
      regel(ctx, 'populatie: één soort, één gebied, onderling voortplanten', 1180, 140, pop * (1 - lg), MEES_G, 28, 'center', 700);
      ctx.save(); ctx.globalAlpha *= q.on('merels', 1); merel(ctx, 1640, 300, 0.7); rups(ctx, 1560, 520, 1, 1, t); eik(ctx, 1750, 820, 0.8); paddenstoel(ctx, 1520, 820, 1.4); ctx.restore();
      regel(ctx, 'levensgemeenschap: alle populaties samen', 1180, 140, lg, C.groen, 28, 'center', 700); ctx.restore();
    if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; person(ctx, 380, 860, 440, 1, { skin: SKINS[1], hair: '#6B3F22', shirt: '#5A7FA0', hairStyle: 'bun' }); eik(ctx, 1000, 800, 0.9); rups(ctx, 1180, 700, 1.2, 1, t); koolmees(ctx, 1450, 430, 0.8);
      tag(ctx, 'minder jonge koolmezen?', 1100, 160, C.text2, 1); tag(ctx, 'telt rupsen en eiken', 1330, 650, C.groen, q.on('telt', 1));
      ctx.save(); ctx.globalAlpha *= q.on('temperatuur', 1); roundRect(ctx, 1690, 260, 30, 220, 15); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, 1705, 500, 30, C.koraal); ctx.fillStyle = C.koraal; ctx.fillRect(1698, 360, 14, 130); regel(ctx, 'temperatuur', 1705, 580, 1, C.koraal, 24, 'center', 700); ctx.restore();
      ctx.save(); ctx.globalAlpha *= q.on('bodem', 1); ctx.fillStyle = '#5A4030'; ctx.fillRect(820, 820, 980, 60); for (let i = 0; i < 8; i++) circ(ctx, 880 + i * 120, 840, 6, '#5BA4C9'); regel(ctx, 'hoe nat is de bodem', 1600, 800, 1, C.teal, 24, 'center', 700); ctx.restore();
      vraagteken(ctx, 660, 400, q.on('Welk', 1), 120); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const mis = q.on('Misschien', 1), bio = q.on('biosfeer', 1);
    ladder(ctx, NIV.map((_, i) => i <= 8 ? 0.5 : i === 9 ? 1 : bio), { cur: bio > 0.5 ? 10 : 9 });
    tag(ctx, 'antwoord b: ecosysteem', 1180, 140, C.goud, q.on('Antwoord', 1) * (1 - bio));
    ctx.save(); ctx.globalAlpha *= 1 - bio; eik(ctx, 900, 760, 0.9); koolmees(ctx, 1150, 420, 0.8); rups(ctx, 1000, 640, 1.1, 1, t);
      ctx.save(); ctx.globalAlpha *= q.on('abiotische', 1); for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1700 + Math.cos(an) * 60, 250 + Math.sin(an) * 60); ctx.lineTo(1700 + Math.cos(an) * 85, 250 + Math.sin(an) * 85); ctx.stroke(); } circ(ctx, 1700, 250, 48, rgba(C.goud, 0.9)); ctx.fillStyle = '#5A4030'; ctx.fillRect(760, 780, 1060, 70); for (let i = 0; i < 6; i++) circ(ctx, 1560 + (i % 3) * 30, 420 + Math.floor(i / 3) * 40 + ((t * 60 + i * 20) % 40), 6, '#5BA4C9');
      regel(ctx, 'abiotisch: licht, water, bodem, temperatuur', 1290, 210, 1, C.teal, 26, 'center', 700); ctx.restore();
      // mismatch: rupsenpiek eerder dan de jongen
      ctx.save(); ctx.globalAlpha *= q.on('voorjaar', 1) * (1 - mis); const gx = 1280, gy = 720; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 480, gy); ctx.stroke(); regel(ctx, 'april → juni', gx + 480, gy + 30, 1, C.text2, 20, 'right', 600);
        const curve = (c, col) => { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = gx + u * 480, py = gy - 160 * Math.exp(-Math.pow((u - c) / 0.12, 2)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
        curve(lerp(0.55, 0.35, ramp(t, q.at('eerder', 1), 1.5)), '#8CC05A'); curve(0.6, MEES_G); regel(ctx, 'rupsen', gx + 120, gy - 170, 1, '#8CC05A', 22, 'center', 700); regel(ctx, 'jonge koolmezen', gx + 330, gy - 170, 1, MEES_G, 22, 'center', 700); ctx.restore();
      tag(ctx, 'levensgemeenschap = alleen het levende', 1440, 560, C.koraal, mis); tag(ctx, '+ temperatuur en bodem = ecosysteem', 1440, 640, C.teal, q.on('zodra', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= bio; aarde(ctx, 1250, 470, 260, 1, t); regel(ctx, 'biosfeer: alle ecosystemen op aarde', 1250, 820, 1, C.teal, 30, 'center', 700); ctx.restore(); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const hz = q.on('hart', 1);
    spiercel(ctx, 600, 450, 360, 70, 1, 0.5 + 0.5 * Math.sin(t * 5)); regel(ctx, 'één spiercel: trekt samen', 600, 620, q.on('spiercel', 1), SPIER, 30, 'center', 700);
    hart(ctx, 1320, 440, 1.8, hz, t); for (let i = 0; i < 6; i++) { const u = (t * 0.5 + i / 6) % 1; circ(ctx, 1320 + Math.cos(u * 6.283) * 260, 440 + Math.sin(u * 6.283) * 200, 9, rgba('#B5474A', hz)); } regel(ctx, 'hart: pompt bloed rond', 1320, 720, hz, '#E07A6E', 30, 'center', 700);
    tag(ctx, 'emergente eigenschap: iets nieuws op een hoger niveau', 960, 830, C.goud, q.on('emergente', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const lv = q.on('mooiste', 1);
    ctx.save(); ctx.globalAlpha *= 1 - lv; koolmees(ctx, 420, 440, 1.2); regel(ctx, 'één koolmees', 420, 620, 1, MEES_G, 28, 'center', 700);
      for (let i = 0; i < 12; i++) koolmees(ctx, 1000 + (i % 4) * 190, 270 + Math.floor(i / 4) * 160, 0.55, q.on('populatie', 1));
      tag(ctx, 'dichtheid', 1280, 760, C.teal, q.on('dichtheid', 1), 'right'); tag(ctx, 'geboortecijfer', 1300, 760, C.groen, q.on('geboortecijfer', 1), 'left'); tag(ctx, 'evolutie: alleen een populatie', 1290, 840, C.goud, q.on('evolueren', 1));
      tag(ctx, 'meer dan de optelsom', 420, 760, C.goud, q.on('optelsom', 1)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= lv; for (let i = 0; i < 6; i++) eiwit(ctx, 300 + (i % 2) * 260, 300 + Math.floor(i / 2) * 170, 0.6); regel(ctx, 'losse moleculen: leven niet', 430, 800, 1, C.text2, 28, 'center', 700);
      bacterieC(ctx, 1350, 460, 2.2); regel(ctx, 'een cel vol moleculen: leeft', 1350, 800, q.on('cel', 1), BAC, 28, 'center', 700); tag(ctx, 'leven = een emergente eigenschap', 960, 160, C.goud, q.on('leven', 1)); ctx.restore(); },

  s14(ctx, t, q) { bg(ctx, 'micro'); const lijst = q.on('Leg', 1);
    ctx.save(); ctx.globalAlpha *= 1 - lijst; ladder(ctx, NIV.map(() => 0.5), { virus: q.on('ladder', 1), t });
      const kt = q.on('tien', 1); griepvirus(ctx, lerp(900, 1290, kt), 430, lerp(120, 11, kt), t, q.on('virus', 2)); naamBij(ctx, 'erfelijk materiaal (RNA)', null, 900, 645, q.on('erfelijk', 1) * (1 - kt), 'center'); naamBij(ctx, 'eiwitmantel', null, 1085, 318, q.on('eiwitmantel', 1) * (1 - kt), 'left'); naamBij(ctx, 'vetlaagje', null, 1085, 568, q.on('vetlaagje', 1) * (1 - kt), 'left'); regel(ctx, 'griepvirus (op schaal)', 1290, 500, kt, VIR, 22, 'center', 700);
      bacterieC(ctx, 1500, 430, 1.7, q.on('bacterie', 1)); regel(ctx, 'bacterie: ± 10× groter', 1500, 330, q.on('tien', 1), C.text2, 26, 'center', 700);
      tag(ctx, 'bacterie = wél een cel: neemt op, groeit, deelt zich', 1250, 800, BAC, q.on('verschil', 1)); ctx.restore();
    if (lijst > 0.01) { ctx.save(); ctx.globalAlpha *= lijst; const inf = q.on('dringt', 1);
      const cols = [{ naam: 'virus', col: VIR, a: 1, v: [{ ok: false, a: q.on('cellen', 1) }, { ok: false, a: q.on('Stofwisseling', 1) }, null, null, { ok: false, a: q.on('Reageren', 1) }, { ok: false, a: q.on('Reageren', 1) }] }];
      cols[0].v[2] = { ok: false, a: q.on('Groeien', 1) };
      bord(ctx, 100, 150, 780, KENM.map(s => ({ s, a: 1 })), cols); regel(ctx, 'alleen in een cel', 840, 446, q.on('nieuwe', 1), C.goud, 22, 'right', 700);
      ctx.save(); ctx.globalAlpha *= inf; circ(ctx, 1350, 470, 260, rgba('#E6D8A8', 0.2), '#E6D8A8', 3); celkern(ctx, 1350, 470, 70); regel(ctx, 'cel van Noor', 1350, 800, 1, '#E6D8A8', 28, 'center', 700);
        const k = Math.floor(clamp((t - q.at('nieuwe', 1)) * 2, 0, 10)); for (let i = 0; i < k; i++) griepvirus(ctx, 1350 + Math.cos(i * 0.9) * 170, 470 + Math.sin(i * 0.9) * 170, 22, t);
        griepvirus(ctx, lerp(1000, 1210, inf), 470, 30, t); tag(ctx, 'met de stoffen en de energie van de cel', 1350, 880, C.goud, q.on('energie', 1)); ctx.restore(); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'micro'); const mis = q.on('Misschien', 1), erf = q.on('erfelijk', 1);
    tag(ctx, 'antwoord a: geen eigen stofwisseling', 960, 140, C.goud, q.on('Antwoord', 1));
    circ(ctx, 600, 480, 220, rgba('#E6D8A8', 0.2), '#E6D8A8', 3); celkern(ctx, 600, 480, 60); for (let i = 0; i < 8; i++) griepvirus(ctx, 600 + Math.cos(i * 0.8 + t * 0.2) * 150, 480 + Math.sin(i * 0.8 + t * 0.2) * 150, 20, t); regel(ctx, 'de cel doet het werk', 600, 780, q.on('werk', 1), '#E6D8A8', 28, 'center', 700);
    tag(ctx, 'meer virussen en evolutie: dat klopt', 1350, 320, C.text2, mis * (1 - erf)); tag(ctx, 'grensgeval', 1350, 400, C.teal, q.on('grensgeval', 1) * (1 - erf)); tag(ctx, 'maar de kopieën maakt de cel', 1350, 480, C.koraal, q.on('kopieën', 1) * (1 - erf));
    ctx.save(); ctx.globalAlpha *= erf; ctx.strokeStyle = RNA; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; i ? ctx.lineTo(1150 + u * 400, 460 + Math.sin(u * 16) * 20) : ctx.moveTo(1150, 460); } ctx.stroke(); regel(ctx, 'erfelijk materiaal = een molecuul', 1350, 580, 1, RNA, 28, 'center', 700); kruis(ctx, 1600, 380, 22, q.on('leeft', 1)); regel(ctx, 'leeft niet', 1350, 650, q.on('leeft', 1), C.koraal, 28, 'center', 700); ctx.restore(); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const up = q.on('populatie', 1);
    ladder(ctx, NIV.map((_, i) => i === 2 ? Math.max(0.5, q.on('kleinste', 1)) : i < 2 ? 0.5 : i <= 6 ? Math.max(0.5, q.on('differentiatie', 1)) : i === 7 ? Math.max(0.5, up) : i === 8 ? Math.max(0.5, q.on('levensgemeenschap', 1)) : i === 9 ? Math.max(0.5, q.on('ecosysteem', 1)) : Math.max(0.5, q.on('biosfeer', 1))), { virus: q.on('ernaast', 1) > 0 ? q.on('ernaast', 1) : q.on('Leeft', 1), t, cur: q.on('kleinste', 1) > 0.5 && q.on('differentiatie', 1) < 0.5 ? 2 : (q.on('ladder', 1) > 0.5 ? 6 : -1) });
    ctx.save(); ctx.globalAlpha *= q.on('ladder', 1); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1030, 520); ctx.lineTo(500, 444); ctx.moveTo(1480, 560); ctx.lineTo(500, 444); ctx.stroke(); ctx.restore();
    tag(ctx, 'antwoord a', 1250, 160, C.goud, q.on('antwoord', 1)); tag(ctx, 'geen eigen stofwisseling, het laat een cel werken', 1250, 240, C.koraal, q.on('stofwisseling', 1));
    koolmees(ctx, 1150, 560, 1.2, q.on('koolmees', 1)); person(ctx, 1550, 800, 380, q.on('Noor', 1), {}); griepvirus(ctx, 1700, 520, 30, t, q.on('griepvirus', 2)); },
};
