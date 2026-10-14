// Cellen · Stamcellen — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#3A2A1E', shirt: '#5A7FA0', hairStyle: 'short', trousers: '#2A3242' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 38, w, 54, 27); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 30, align = 'center', w = 700) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x0, y0, x1, y1, col = C.line, a = 1, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 18 * Math.cos(an - 0.45), y1 - 18 * Math.sin(an - 0.45)); ctx.lineTo(x1 - 18 * Math.cos(an + 0.45), y1 - 18 * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function fade(ctx, a, f) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); }

// ---------- kleuren ----------
const SPIER = '#D86A6A', ZENUW = '#E0B64A', HUIDC = '#C9A35C', STAM = '#A08BE0', ALV = '#7FB8A8', ROOD = '#C9483E', WIT = '#E6E1D3', HOORN = '#8C8A80', LEUK = '#E07A5F';

// ---------- figuren ----------
function celkern(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.kern, 0.6), C.kernR, 2); circ(ctx, x + r * 0.2, y - r * 0.15, r * 0.25, rgba(C.kernR, 0.8)); ctx.restore(); }
function spiercel(ctx, x, y, w, h, a = 1, kracht = 0, col = SPIER) { if (a <= 0.01) return; const ww = w * (1 - 0.15 * kracht), hh = h * (1 + 0.15 * kracht); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - ww / 2, y); ctx.quadraticCurveTo(x, y - hh, x + ww / 2, y); ctx.quadraticCurveTo(x, y + hh, x - ww / 2, y); shape(ctx, rgba(col, 0.5), col, 2); circ(ctx, x, y, hh * 0.28, rgba(C.kern, 0.85)); ctx.restore(); }
function zenuwcel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = ZENUW; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * 46 * s, y + Math.sin(an) * 46 * s); ctx.stroke(); } ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 110 * s, y + 26 * s); ctx.stroke(); circ(ctx, x, y, 24 * s, rgba(ZENUW, 0.6), ZENUW, 2); circ(ctx, x, y, 9 * s, rgba(C.kern, 0.9)); ctx.restore(); }
function huidcel(ctx, x, y, s = 1, a = 1, col = HUIDC) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 24 * s, 100 * s, 48 * s, 12 * s); shape(ctx, rgba(col, 0.5), col, 2); circ(ctx, x, y, 10 * s, rgba(C.kern, 0.9)); ctx.restore(); }
function alvcel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.5; const px = x + Math.cos(an) * 52 * s, py = y + Math.sin(an) * 46 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(ALV, 0.45), ALV, 2); for (let i = 0; i < 7; i++) circ(ctx, x + (hash(i + 3) - 0.5) * 60 * s, y - 14 * s + (hash(i + 11) - 0.5) * 30 * s, 4 * s, '#E8D27A'); circ(ctx, x, y + 16 * s, 11 * s, rgba(C.kern, 0.9)); ctx.restore(); }
function bolcel(ctx, x, y, r, a = 1, col = '#E6D8A8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(col, 0.35), col, 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.8)); ctx.restore(); }
function stamcel(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r * (1.25 + 0.05 * Math.sin(t * 3)), rgba(STAM, 0.12)); circ(ctx, x, y, r, rgba(STAM, 0.4), STAM, 2.5); circ(ctx, x, y, r * 0.42, rgba(C.kern, 0.9), C.kernR, 1.5); ctx.restore(); }
function rodeBC(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, ROOD, '#E07A6E', 2); circ(ctx, x, y, r * 0.45, rgba('#8A2A2A', 0.6)); ctx.restore(); }
function witteBC(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(WIT, 0.5), WIT, 2); for (let i = 0; i < 3; i++) circ(ctx, x + (i - 1) * r * 0.35, y + (i % 2 ? -1 : 1) * r * 0.15, r * 0.25, rgba(C.kern, 0.9)); ctx.restore(); }
function plaatje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.55, 0.4, 0, 6.283); shape(ctx, '#E8C27A', null); ctx.restore(); }
function leukcel(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const an = i / 12 * 6.283, rr = r * (0.85 + 0.25 * hash(i + Math.floor(x))); i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba(LEUK, 0.45), LEUK, 2); circ(ctx, x, y, r * 0.5, rgba(C.kern, 0.95)); ctx.restore(); }
function iks(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 9 * s, y - 14 * s); ctx.quadraticCurveTo(x, y, x + 9 * s, y + 14 * s); ctx.moveTo(x + 9 * s, y - 14 * s); ctx.quadraticCurveTo(x, y, x - 9 * s, y + 14 * s); ctx.stroke(); ctx.restore(); }
const CHR = ['#E07A5F', '#5BA4C9', '#7FC48F', '#E0B64A', '#8C7BBF'];
function chromRij(ctx, x, y, a = 1) { for (let i = 0; i < 5; i++) iks(ctx, x - 64 + i * 32, y, 0.9, CHR[i], a); }
// genen als lampjes: aan[] = 0..1 per lampje; hl = index gemarkeerd
function lampjes(ctx, x, y, aan, col, a = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = aan.length, w = 40; ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - n * w / 2 - 10, y); ctx.lineTo(x + n * w / 2 + 10, y); ctx.stroke();
  for (let i = 0; i < n; i++) { const cx = x - n * w / 2 + w / 2 + i * w, v = aan[i]; if (v > 0.05) circ(ctx, cx, y, 22, rgba(col, 0.25 * v)); circ(ctx, cx, y, 13, v > 0.5 ? col : rgba(C.line, 0.25), v > 0.5 ? lighten(col, 0.3) : rgba(C.line, 0.6), 2); if (i === hl) { roundRect(ctx, cx - 20, y - 22, 40, 44, 10); shape(ctx, null, C.goud, 2.5); } } ctx.restore(); }
function knie(ctx, x, y, s, heal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.strokeStyle = SKINS[1]; ctx.lineWidth = 120; ctx.beginPath(); ctx.moveTo(-260, -160); ctx.lineTo(0, 0); ctx.lineTo(220, -190); ctx.stroke(); ctx.strokeStyle = '#3A4A6A'; ctx.lineWidth = 128; ctx.beginPath(); ctx.moveTo(-420, -300); ctx.lineTo(-250, -150); ctx.stroke();
  const sc = 1 - heal; if (sc > 0.01) { ctx.save(); ctx.globalAlpha *= sc; for (let i = 0; i < 9; i++) { ctx.strokeStyle = i % 2 ? '#B5474A' : '#D86A6A'; ctx.lineWidth = 6; ctx.beginPath(); const ox = -40 + i * 10, oy = -20 + (i % 3) * 8; ctx.moveTo(ox - 22, oy - 6); ctx.lineTo(ox + 22, oy + 6); ctx.stroke(); } ctx.restore(); }
  if (heal > 0.01 && heal < 0.9) { ctx.save(); ctx.globalAlpha *= heal * (1 - heal) * 3; ctx.beginPath(); ctx.ellipse(0, -10, 50, 26, -0.3, 0, 6.283); shape(ctx, rgba('#E8B4A0', 0.8), null); ctx.restore(); }
  ctx.restore(); }
function hart(ctx, x, y, s = 1, a = 1, t = 0, dood = 0, litteken = 0) { if (a <= 0.01) return; const p = 1 + 0.05 * Math.max(0, Math.sin(t * 6)); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * p, s * p); ctx.beginPath(); ctx.moveTo(0, 80); ctx.bezierCurveTo(-110, 10, -90, -80, -30, -70); ctx.bezierCurveTo(-10, -66, 0, -50, 0, -40); ctx.bezierCurveTo(0, -50, 10, -66, 30, -70); ctx.bezierCurveTo(90, -80, 110, 10, 0, 80); shape(ctx, '#B5474A', '#E07A6E', 3);
  ctx.save(); ctx.clip(); if (dood > 0.01) { ctx.globalAlpha *= dood; ctx.beginPath(); ctx.ellipse(36, 30, 40, 30, 0.5, 0, 6.283); shape(ctx, lerpColor('#4A1E22', '#C9C2B0', litteken), null); if (litteken > 0.3) { ctx.strokeStyle = rgba('#9A9284', litteken); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(10 + i * 10, 10); ctx.lineTo(30 + i * 10, 52); ctx.stroke(); } } } ctx.restore(); ctx.restore(); }
function lerpColor(a, b, u) { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
// opperhuid: kiemlaag onderin, cellen schuiven omhoog, verhoornen en schilferen af
function opperhuid(ctx, x, y, w, h, t, o = {}) { const { a = 1, beweeg = 1, kiem = 1, hoorn = 1, schilfer = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y - 60, w, h + 60); ctx.clip();
  ctx.fillStyle = '#5A3A3A'; ctx.fillRect(x, y + h - 40, w, 40); regel(ctx, 'lederhuid', x + w - 20, y + h - 10, kiem * 0.8, C.text2, 22, 'right', 600);
  const rows = 7, rh = (h - 90) / rows, cols = 6, cw = w / cols, ph = (t * 0.22 * beweeg) % 1;
  for (let r = rows - 1; r >= 0; r--) { const pos = r + ph, u = pos / rows, yy = y + h - 80 - pos * rh; for (let c = 0; c < cols; c++) { const xx = x + cw / 2 + c * cw + (r % 2 ? cw / 2 : 0) - cw / 4; const hh = lerp(rh * 0.8, rh * 0.32, u), ww = cw * 0.92; let col = lerpColor('#C9A35C', '#8C8A80', clamp((u - 0.35) / 0.5, 0, 1)); let al = 1; let dx = 0, dy = 0; if (u > 0.86) { const f = (u - 0.86) / 0.14; al = 1 - f * schilfer; dx = f * 40 * (hash(c + r) - 0.5) * schilfer; dy = -f * 50 * schilfer; }
      ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, xx - ww / 2 + dx, yy - hh / 2 + dy, ww, hh, Math.min(10, hh / 2)); shape(ctx, rgba(col, 0.55), col, 1.5); if (u < 0.6) circ(ctx, xx + dx, yy + dy, Math.max(3, hh * 0.18), rgba(C.kern, 0.85 * (1 - u / 0.6))); ctx.restore(); } }
  for (let c = 0; c < cols; c++) stamcel(ctx, x + cw / 2 + c * cw, y + h - 62, Math.min(30, cw * 0.32), 1, t + c);
  ctx.restore(); }
function bot(ctx, x, y, s = 1, a = 1, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 260, 200, 0, 0, 6.283); shape(ctx, '#E6E1D3', '#C9C2B0', 3); ctx.beginPath(); ctx.ellipse(0, 0, 210, 155, 0, 0, 6.283); shape(ctx, '#7A2E34', '#5A1E24', 2); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 208, 153, 0, 0, 6.283); ctx.clip(); if (inhoud) inhoud(); ctx.restore(); ctx.restore(); }
function blastocyst(ctx, x, y, r, a = 1, icm = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#2A3A58', 0.6), rgba(C.line, 0.6), 2); const n = 18; for (let i = 0; i < n; i++) { const an = i / n * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.9, y + Math.sin(an) * r * 0.9, r * 0.17, r * 0.09, an + 1.57, 0, 6.283); shape(ctx, rgba('#C9B896', 0.6), '#C9B896', 1.5); }
  for (let i = 0; i < 7; i++) { const cx = x - r * 0.25 + (i % 3) * r * 0.2 + (i > 5 ? r * 0.1 : 0), cy = y - r * 0.62 + Math.floor(i / 3) * r * 0.17; circ(ctx, cx, cy, r * 0.11, rgba(STAM, 0.3 + 0.4 * icm), lerpColor('#C9B896', '#A08BE0', icm), 2); } ctx.restore(); }
function schaal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, rgba('#C9E0E8', 0.12), rgba('#C9E0E8', 0.7), 3); ctx.beginPath(); ctx.ellipse(x, y + 10, r * 0.92, r * 0.36, 0, 0, 6.283); shape(ctx, rgba('#E8B4C0', 0.22), null); ctx.restore(); }
function infuus(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50, y, 100, 150, 18); shape(ctx, rgba('#C9E0E8', 0.2), '#C9E0E8', 2.5); roundRect(ctx, x - 40, y + 50, 80, 90, 12); shape(ctx, rgba(STAM, 0.4), null); for (let i = 0; i < 6; i++) circ(ctx, x - 24 + (i % 3) * 24, y + 75 + Math.floor(i / 3) * 34, 8, STAM); regel(ctx, 'donor', x, y + 32, 1, C.text, 22, 'center', 700); ctx.strokeStyle = '#C9E0E8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 150); ctx.lineTo(x, y + 240); ctx.stroke(); const d = (t * 1.2) % 1; circ(ctx, x, y + 160 + d * 70, 6, STAM); ctx.restore(); }
function dnaStreng(ctx, x0, x1, y, a = 1, col = '#5BA4C9') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 5; for (const [c, ph] of [[col, 0], [lighten(col, 0.3), Math.PI]]) { ctx.strokeStyle = c; ctx.beginPath(); for (let xx = x0; xx <= x1; xx += 6) { const yy = y + Math.sin((xx - x0) / 34 + ph) * 16; xx === x0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function tf(ctx, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y + 14); ctx.quadraticCurveTo(x - 30, y - 30, x, y - 34); ctx.quadraticCurveTo(x + 30, y - 30, x + 26, y + 14); ctx.lineTo(x + 10, y + 4); ctx.lineTo(x - 10, y + 4); ctx.closePath(); shape(ctx, rgba(col, 0.6), col, 2); ctx.restore(); }
function histon(ctx, x, y, a = 1, strak = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 34, 28, 0, 0, 6.283); shape(ctx, rgba('#C9A35C', 0.5), '#C9A35C', 2); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, y, 34 + 10 * (1 - strak), 28 + 8 * (1 - strak), 0, 0.3, 5.9); ctx.stroke(); ctx.restore(); }
function methyl(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 34); ctx.stroke(); circ(ctx, x, y - 44, 14, C.koraal); text(ctx, 'CH₃', x, y - 66, fTekst(18, 700), C.koraal, 'center'); ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); stamcel(ctx, 1420, 460, 80, 1, t); const doel = [[1660, 260, 'z'], [1720, 520, 's'], [1580, 730, 'h'], [1240, 730, 'r'], [1180, 250, 'a']];
    doel.forEach(([x, y, k], i) => { pijl(ctx, 1420 + (x - 1420) * 0.3, 460 + (y - 460) * 0.3, 1420 + (x - 1420) * 0.72, 460 + (y - 460) * 0.72, rgba(STAM, 0.8), 1, 3); if (k === 'z') zenuwcel(ctx, x - 20, y, 1.1); else if (k === 's') spiercel(ctx, x, y, 200, 46, 1, 0.5 + 0.5 * Math.sin(t * 4)); else if (k === 'h') huidcel(ctx, x, y, 1.3); else if (k === 'r') rodeBC(ctx, x, y, 34); else alvcel(ctx, x, y, 1); }); },

  s01(ctx, t, q) { bg(ctx, 'macro'); ctx.fillStyle = '#2A2F3E'; ctx.fillRect(0, 0, W, CAPTION_Y);
    const heal = ramp(t, q.at('later', 1), q.at('hersteld', 1) - q.at('later', 1) + 0.6);
    knie(ctx, 560, 560, 1.1, heal, q.on('fiets', 1)); tag(ctx, 'schaafwond', 560, 760, C.koraal, q.on('schaaft', 1) * (1 - heal)); tag(ctx, 'huid hersteld', 560, 760, C.groen, heal);
    const hz = q.on('hartinfarct', 1); hart(ctx, 1380, 470, 2.4, hz, t * (1 - q.on('sterft', 1) * 0.8), q.on('sterft', 1), q.on('littekenweefsel', 1));
    tag(ctx, 'hartinfarct', 1380, 760, C.koraal, hz * (1 - q.on('littekenweefsel', 1))); tag(ctx, 'litteken: groeit niet terug', 1380, 760, C.text2, q.on('littekenweefsel', 1));
    vraagteken(ctx, 960, 300, q.on('Waarom', 1), 130); },

  s04(ctx, t, q) { bg(ctx, 'micro'); const B = q.on('kopie', 1);
    fade(ctx, 1 - B, () => { const dl = q.on('deelde', 1), n = dl > 0 ? Math.min(8, Math.pow(2, Math.floor(clamp((t - q.at('deelde', 1)) / 1.1, 0, 3)))) : 1;
      const pts = [[0, 0], [1, 0], [0, 1], [1, 1], [0.5, -0.8], [0.5, 1.8], [-0.8, 0.5], [1.8, 0.5]], r = n === 1 ? 120 : n === 2 ? 86 : n === 4 ? 66 : 50;
      for (let i = 0; i < n; i++) { const [px, py] = n === 1 ? [0.5, 0.5] : n === 2 ? [i, 0.5] : pts[i]; bolcel(ctx, 960 + (px - 0.5) * r * 2.1, 470 + (py - 0.5) * r * 2.1, r, q.on('bevruchte', 1)); }
      regel(ctx, 'bevruchte eicel', 960, 200, q.on('bevruchte', 1) * (1 - dl), C.text, 34); regel(ctx, 'mitose: steeds meer cellen', 960, 200, dl, C.text, 34);
      tag(ctx, '± 30 biljoen cellen, > 200 soorten', 960, 820, C.goud, q.on('dertig', 1)); });
    fade(ctx, B, () => { const types = [['zenuwcel', ZENUW, 'zenuwcel'], ['spiercel', SPIER, 'spiercel'], ['alvleeskliercel', ALV, 'alvleesklier'], ['huidcel', HUIDC, 'dezelfde']];
      types.forEach(([nm, col, w], i) => { const x = 330 + i * 400, al = Math.max(0.15, q.on(w, 1)); if (i === 0) zenuwcel(ctx, x - 40, 330, 1.6, al); else if (i === 1) spiercel(ctx, x, 330, 300, 64, al); else if (i === 2) alvcel(ctx, x, 330, 1.5, al); else huidcel(ctx, x, 330, 1.8, al); regel(ctx, nm, x, 460, al, col, 28); chromRij(ctx, x, 540, q.on('kopie', 1)); });
      regel(ctx, 'een kopie van hetzelfde DNA', 960, 160, q.on('kopie', 1), C.text, 34); tag(ctx, 'dezelfde genen', 960, 650, C.goud, q.on('dezelfde', 1) * (1 - q.on('bloedcel', 1)));
      fade(ctx, q.on('bloedcel', 1), () => { rodeBC(ctx, 960, 720, 46); regel(ctx, 'rode bloedcel: geen kern, dus geen DNA', 960, 820, 1, ROOD, 28); }); }); },

  s05(ctx, t, q) { bg(ctx, 'micro'); const ins = q.on('insuline', 1), dif = q.on('gedifferentieerd', 1);
    const types = [['zenuwcel', ZENUW], ['spiercel', SPIER], ['alvleeskliercel', ALV], ['huidcel', HUIDC]], patroon = [[1, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1]];
    types.forEach(([nm, col], i) => { const x = 330 + i * 400; if (i === 0) zenuwcel(ctx, x - 40, 300, 1.6); else if (i === 1) spiercel(ctx, x, 300, 300, 64); else if (i === 2) alvcel(ctx, x, 300, 1.5); else huidcel(ctx, x, 300, 1.8); regel(ctx, nm, x, 430, 1, col, 28);
      const g = q.on('genen', 1); lampjes(ctx, x, 540, patroon[i].map(v => v * g), col, Math.max(0.3, g), ins > 0.5 && (i === 2 || i === 3) ? 2 : -1); });
    regel(ctx, 'genen', 120, 548, q.on('genen', 1), C.text2, 24, 'left', 600);
    tag(ctx, 'insuline-gen: aan', 1130, 640, C.groen, ins * (1 - dif)); tag(ctx, 'insuline-gen: uit, maar wel aanwezig', 1530, 720, C.text2, q.on('huidcellen', 1) * (1 - dif));
    tag(ctx, 'gedifferentieerd: eigen bouw, eigen taak', 960, 700, C.goud, dif * (1 - q.on('differentiatie', 1))); tag(ctx, 'differentiatie', 960, 700, C.goud, q.on('differentiatie', 1)); },

  s06(ctx, t, q) { bg(ctx, 'micro'); zenuwcel(ctx, 460, 380, 2, q.on('zenuwcel', 1)); regel(ctx, 'zenuwcel (hersenen)', 520, 560, q.on('zenuwcel', 1), ZENUW, 30);
    spiercel(ctx, 1460, 380, 440, 90, q.on('spiercel', 1)); regel(ctx, 'spiercel (been)', 1460, 560, q.on('spiercel', 1), SPIER, 30);
    chromRij(ctx, 520, 660, q.on('DNA', 1)); chromRij(ctx, 1460, 660, q.on('DNA', 1)); vraagteken(ctx, 960, 470, q.on('verschil', 1), 150); },

  s08(ctx, t, q) { bg(ctx, 'micro'); const dl = q.on('gedifferentieerde', 1);
    tag(ctx, 'antwoord b: hetzelfde DNA', 960, 140, C.goud, q.on('Antwoord', 1) * (1 - dl));
    fade(ctx, 1 - dl, () => { zenuwcel(ctx, 480, 340, 1.8); regel(ctx, 'zenuwcel', 520, 500, 1, ZENUW, 30); spiercel(ctx, 1440, 340, 400, 80); regel(ctx, 'spiercel', 1440, 500, 1, SPIER, 30);
      const zg = q.on('zenuwgenen', 1); lampjes(ctx, 520, 610, [1, 0, 1, 1, 0, 0], ZENUW, 1, zg > 0.5 ? 0 : -1); lampjes(ctx, 1440, 610, [0, 1, 0, 1, 1, 0], SPIER, 1, zg > 0.5 ? 0 : -1);
      tag(ctx, 'zenuwgenen zitten ook in de spiercel: ze staan uit', 960, 760, C.text2, q.on('spiercel', 1)); });
    fade(ctx, dl, () => { zenuwcel(ctx, 520, 380, 1.8); regel(ctx, 'zenuwcel: deelt niet', 560, 560, q.on('zenuwcel', 2), ZENUW, 30); kruis(ctx, 700, 270, 26, q.on('deelt', 1));
      hart(ctx, 1400, 380, 1.5, q.on('hartspiercel', 1), t); regel(ctx, 'hartspiercel: bijna niet', 1400, 560, q.on('hartspiercel', 1), SPIER, 30);
      tag(ctx, 'stabiel lichaam', 760, 720, C.groen, q.on('stabiel', 1)); tag(ctx, 'slecht nieuws na een infarct', 1220, 720, C.koraal, q.on('infarct', 1)); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const uit = q.on('Daarnaast', 1), del = q.on('deling', 1);
    // gen aan: DNA met promotor en gen
    const y1 = uit > 0.5 ? 320 : 460, X0 = 200, PX = 520, GX0 = 640, GX1 = 1500;
    fade(ctx, 1 - del, () => { dnaStreng(ctx, X0, 1700, y1, 1); roundRect(ctx, PX - 80, y1 - 34, 160, 68, 12); shape(ctx, rgba(C.goud, 0.15 * q.on('promotor', 1)), rgba(C.goud, q.on('promotor', 1)), 2.5); regel(ctx, 'promotor', PX, y1 - 52, q.on('promotor', 1), C.goud, 26);
      roundRect(ctx, GX0, y1 - 34, GX1 - GX0, 68, 12); shape(ctx, null, rgba(C.groen, 0.8), 2); regel(ctx, 'gen', (GX0 + GX1) / 2, y1 - 52, q.on('gen', 1), C.groen, 26);
      const tfa = q.on('transcriptiefactoren', 1); tf(ctx, PX - 30, y1 - 20 - 60 * (1 - tfa), C.teal, tfa); tf(ctx, PX + 34, y1 - 20 - 80 * (1 - tfa), '#8C7BBF', tfa); regel(ctx, 'transcriptiefactoren', PX, y1 + 80, tfa, C.teal, 24);
      const pol = q.on('polymerase', 1), px = lerp(GX0, GX1 - 60, ramp(t, q.at('overschrijven', 1), 4)); fade(ctx, pol, () => { ctx.beginPath(); ctx.ellipse(px + 40, y1, 60, 46, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.4), C.koraal, 2); regel(ctx, 'RNA-polymerase', px + 40, y1 + 84, 1, C.koraal, 24); ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(GX0, y1 - 60); ctx.quadraticCurveTo((GX0 + px) / 2, y1 - 110, px + 20, y1 - 40); ctx.stroke(); });
      tag(ctx, 'gen aan', 1760, y1 + 6, C.groen, q.on('overschrijven', 1));
      tag(ctx, 'elke celsoort: eigen combinatie', 960, y1 + 160, C.teal, q.on('combinatie', 1) * (1 - uit));
      fade(ctx, uit, () => { const y2 = 640; dnaStreng(ctx, X0, 760, y2, 1); roundRect(ctx, PX - 80, y2 - 34, 160, 68, 12); shape(ctx, null, C.goud, 2); methyl(ctx, PX - 30, y2 - 30, q.on('methylgroep', 1)); methyl(ctx, PX + 30, y2 - 30, q.on('methylgroep', 1));
        for (let i = 0; i < 4; i++) histon(ctx, 1000 + i * 150, y2, q.on('histonen', 1), q.on('strak', 1)); regel(ctx, 'histonen', 1225, y2 + 76, q.on('histonen', 1), '#C9A35C', 24); regel(ctx, 'methylgroep op de promotor', PX, y2 + 84, q.on('methylgroep', 1), C.koraal, 24);
        tag(ctx, 'gen uit', 1760, y2 + 6, C.koraal, q.on('overgeschreven', 1)); }); });
    fade(ctx, del, () => { huidcel(ctx, 560, 470, 2.4); for (let i = 0; i < 3; i++) methyl(ctx, 520 + i * 40, 430, 1); pijl(ctx, 760, 470, 960, 470, C.line, 1);
      huidcel(ctx, 1160, 400, 2); huidcel(ctx, 1160, 560, 2); for (let k = 0; k < 2; k++) for (let i = 0; i < 3; i++) methyl(ctx, 1125 + i * 35, 370 + k * 160, 0.9);
      regel(ctx, 'markeringen blijven na de deling', 960, 720, 1, C.text, 30); tag(ctx, 'epigenetica', 960, 820, C.goud, q.on('epigenetica', 1)); }); },

  s10(ctx, t, q) { bg(ctx, 'micro'); const om = q.on('omhoog', 1);
    opperhuid(ctx, 260, 140, 760, 700, t, { a: q.on('Onderin', 1), beweeg: om, schilfer: q.on('schilfert', 1) });
    regel(ctx, 'opperhuid', 640, 110, q.on('opperhuid', 1), C.text, 30); label(ctx, 'kiemlaag: stamcellen', null, 1000, 778, 1120, 780, q.on('kiemlaag', 1), STAM);
    label(ctx, 'verhoornen', null, 1000, 420, 1120, 420, q.on('verhoornt', 1), HOORN); label(ctx, 'dood, schilfert af', null, 1000, 160, 1120, 160, q.on('schilfert', 1), HOORN);
    // schema asymmetrische deling
    fade(ctx, q.on('deling', 1) * (1 - q.on('verhoornt', 1)), () => { stamcel(ctx, 1500, 700, 46, 1, t); pijl(ctx, 1500, 650, 1420, 520, STAM, 1); pijl(ctx, 1500, 650, 1600, 520, C.line, 1); stamcel(ctx, 1400, 470, 40, q.on('stamcel', 3), t); regel(ctx, 'blijft stamcel', 1400, 400, q.on('stamcel', 3), STAM, 26); huidcel(ctx, 1620, 470, 1.2, q.on('andere', 1)); regel(ctx, 'schuift omhoog', 1620, 400, q.on('andere', 1), HUIDC, 26); regel(ctx, 'meestal', 1500, 800, q.on('meestal', 1), C.text2, 26); });
    tag(ctx, 'voorraad stamcellen blijft op peil', 1500, 300, STAM, q.on('peil', 1)); tag(ctx, 'in ± 4 weken een nieuwe opperhuid', 1500, 640, C.goud, q.on('weken', 1)); },

  s11(ctx, t, q) { bg(ctx, 'micro'); const mis = q.on('Misschien', 1);
    tag(ctx, 'antwoord a', 960, 120, C.goud, q.on('Antwoord', 1) * (1 - mis));
    fade(ctx, 1 - mis, () => { opperhuid(ctx, 200, 240, 560, 520, t, { beweeg: 1 }); regel(ctx, 'huid: stamcellen blijven delen', 480, 820, q.on('huid', 1), C.groen, 28);
      hart(ctx, 1400, 460, 2, q.on('hartspier', 1), t); kruis(ctx, 1580, 280, 26, q.on('gevonden', 1)); regel(ctx, 'hartspier: geen stamcellen gevonden', 1400, 720, q.on('gevonden', 1), C.koraal, 28);
      tag(ctx, 'hartspiercellen: ± 1 % per jaar vernieuwd', 1400, 820, C.text2, q.on('procent', 1)); });
    fade(ctx, mis, () => { spiercel(ctx, 540, 450, 360, 70, 1); regel(ctx, 'hartspiercel: "te groot"?', 540, 600, 1, SPIER, 28); const dl = q.on('deelt', 1), sp = ramp(t, q.at('deelt', 1), 1.2) * 70;
      bolcel(ctx, 1400 - sp, 450, 170 - sp * 0.9, q.on('eicel', 1)); if (dl > 0.01) bolcel(ctx, 1400 + sp, 450, 170 - sp * 0.9, dl); regel(ctx, 'bevruchte eicel: heel groot, en deelt wél', 1400, 720, q.on('eicel', 1), '#E6D8A8', 28);
      tag(ctx, 'het gaat om specialisatie, niet om grootte', 960, 820, C.goud, q.on('specialisatie', 1)); }); },

  s12(ctx, t, q) { bg(ctx, 'micro'); const darm = q.on('darm', 1), vol = q.on('volwassen', 1);
    fade(ctx, 1 - vol * 0.7, () => { bot(ctx, 520, 430, 1.1, q.on('beenmerg', 1), () => { stamcel(ctx, -120, 0, 34, 1, t); const dc = q.on('dochtercellen', 1); for (let i = 0; i < 10; i++) { const u = (t * 0.25 + i / 10) % 1; const bx = -80 + u * 260, by = Math.sin(i * 2.1) * 90; if (i % 4 === 3) witteBC(ctx, bx, by, 16, q.on('witte', 1)); else if (i % 4 === 2) plaatje(ctx, bx, by, 10, q.on('bloedplaatjes', 1)); else rodeBC(ctx, bx, by, 16, dc); } });
      regel(ctx, 'rood beenmerg', 520, 720, q.on('beenmerg', 1), '#E07A6E', 28); tag(ctx, '± 2 miljoen rode bloedcellen per seconde', 520, 810, ROOD, q.on('miljoen', 1));
      fade(ctx, darm, () => { darmvlok(ctx, 1400, 780, 560, 240, 1); for (let i = 0; i < 4; i++) { const u = (t * 0.12 + i / 4) % 1; circ(ctx, 1290 + u * 40, 760 - u * 480, 10, rgba(C.goud, 0.9 * (1 - u))); } stamcel(ctx, 1290, 770, 18, 1, t); stamcel(ctx, 1510, 770, 18, 1, t);
        regel(ctx, 'darm: binnenste laag', 1400, 150, 1, C.text, 28); tag(ctx, 'elke 3 tot 5 dagen nieuw', 1400, 810, C.goud, q.on('drie', 1)); }); });
    fade(ctx, vol, () => { tag(ctx, 'volwassen stamcel: alleen celsoorten van het eigen weefsel', 960, 140, STAM, 1); const bs = q.on('bloedstamcel', 1);
      fade(ctx, bs, () => { roundRect(ctx, 620, 260, 680, 420, 24); shape(ctx, rgba(C.kast, 0.85), rgba(C.line, 0.5), 1.5); stamcel(ctx, 780, 470, 46, 1, t); regel(ctx, 'bloedstamcel', 780, 570, 1, STAM, 26); pijl(ctx, 840, 430, 1040, 360, C.groen, 1); rodeBC(ctx, 1090, 350, 30); witteBC(ctx, 1170, 350, 26); vink(ctx, 1250, 340, 18, q.on('bloedcellen', 1));
        pijl(ctx, 840, 510, 1040, 580, C.koraal, 1); huidcel(ctx, 1110, 590, 1.1); kruis(ctx, 1230, 590, 18, q.on('huid', 1)); }); }); },

  s13(ctx, t, q) { bg(ctx, 'micro'); const icm = q.on('klompje', 1), kw = q.on('kweken', 1);
    blastocyst(ctx, lerp(960, 600, kw), 440, 230, q.on('embryo', 2), icm, t); regel(ctx, 'embryo van 5 dagen: holle bol', lerp(960, 600, kw), 740, q.on('embryo', 2), C.text, 30);
    label(ctx, 'klompje cellen binnenin', null, lerp(960, 600, kw), 310, lerp(1260, 900, kw), 180, icm * (1 - kw), STAM);
    fade(ctx, q.on('celsoort', 1) * (1 - kw), () => { const icons = [[1320, 330], [1380, 470], [1320, 610]]; zenuwcel(ctx, icons[0][0], icons[0][1], 0.9); spiercel(ctx, icons[1][0], icons[1][1], 160, 36); alvcel(ctx, icons[2][0], icons[2][1], 0.9); regel(ctx, 'elke celsoort', 1380, 740, 1, STAM, 28); });
    fade(ctx, kw, () => { schaal(ctx, 1380, 480, 300); for (let i = 0; i < 14; i++) stamcel(ctx, 1260 + (i % 7) * 40, 460 + Math.floor(i / 7) * 40 + Math.sin(i) * 6, 18, ramp(t, q.at('kweken', 1) + i * 0.08, 0.3), t); regel(ctx, 'kweek in het lab', 1380, 640, 1, C.text, 28); });
    tag(ctx, 'embryonale stamcellen', 960, 830, STAM, q.on('embryonale', 2)); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Daarna', 1), Cc = q.on('passen', 1), D = q.on('Daarna', 2);
    fade(ctx, 1 - B, () => { const chemo = q.on('chemo', 1); bot(ctx, 760, 450, 1.3, q.on('leukemie', 1), () => { for (let i = 0; i < 16; i++) { const px = -170 + (i % 6) * 66 + (Math.floor(i / 6) % 2) * 30, py = -100 + Math.floor(i / 6) * 90; const ab = ramp(t, q.at('ongeremd', 1) + i * 0.15, 0.4); if (i % 3 === 0 || ab > 0.5) leukcel(ctx, px, py, 26, (i % 3 === 0 ? 1 : ab) * (1 - chemo * 0.9), t); else rodeBC(ctx, px, py, 18, (1 - ab) * (1 - chemo)); } });
      regel(ctx, 'leukemie: afwijkende bloedcellen', 760, 790, q.on('afwijkende', 1), LEUK, 30); tag(ctx, 'delen ongeremd, verdringen gezonde cellen', 1440, 300, LEUK, q.on('verdringen', 1) * (1 - chemo)); tag(ctx, 'chemo (soms bestraling)', 1440, 380, C.teal, chemo); });
    fade(ctx, B * (1 - Cc), () => { infuus(ctx, 500, 160, q.on('infuus', 1), t); person(ctx, 820, 860, 520, 1); bot(ctx, 1380, 470, 0.9, 1, () => { const ar = q.on('beenmerg', 3); for (let i = 0; i < 5; i++) stamcel(ctx, lerp(-260, -140 + i * 60, ar), lerp(-160, 0, ar) + Math.sin(i * 2) * 50, 20, q.on('bloedstamcellen', 1), t); for (let i = 0; i < 8; i++) rodeBC(ctx, 40 + (i % 4) * 40, -40 + Math.floor(i / 4) * 70, 15, q.on('gezond', 2)); });
      regel(ctx, 'bloedstamcellen van een donor', 500, 470, q.on('donor', 1), STAM, 26); regel(ctx, 'zoeken zelf het beenmerg op', 1380, 760, q.on('zoeken', 1), STAM, 28); });
    fade(ctx, Cc * (1 - D), () => { const sym = (x, y, k, a) => { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const an = -1.2 + i * 1.2, sx = x + Math.cos(an) * 62, sy = y + Math.sin(an) * 62; if (k) { roundRect(ctx, sx - 10, sy - 10, 20, 20, 3); shape(ctx, C.goud, null); } else circ(ctx, sx, sy, 11, C.teal); } ctx.restore(); };
      bolcel(ctx, 520, 430, 60, 1, STAM); sym(520, 430, 1, q.on('herkenningseiwitten', 1)); regel(ctx, 'cel van de donor', 520, 570, 1, STAM, 28);
      bolcel(ctx, 1000, 430, 60, 1, '#E6D8A8'); sym(1000, 430, 1, q.on('herkenningseiwitten', 1)); regel(ctx, 'cel van de patiënt', 1000, 570, 1, '#E6D8A8', 28); vink(ctx, 760, 430, 26, q.on('herkenningseiwitten', 1));
      tag(ctx, 'de donor moet passen: bijna dezelfde herkenningseiwitten', 960, 140, C.goud, q.on('passen', 1));
      fade(ctx, q.on('Anders', 1), () => { bolcel(ctx, 1460, 430, 60, 1, STAM); sym(1460, 430, 0, 1); witteBC(ctx, lerp(1760, 1560, ramp(t, q.at('afweersysteem', 1), 1.5)), 430, 40); kruis(ctx, 1460, 300, 22, q.on('ruimt', 1)); regel(ctx, 'past niet: afstoting', 1520, 570, 1, C.koraal, 28); tag(ctx, 'of de donorcellen keren zich tegen de patiënt', 960, 720, C.koraal, q.on('keren', 1)); }); });
    fade(ctx, D, () => { person(ctx, 960, 860, 560, 1); circ(ctx, 760, 420, 60, ROOD); regel(ctx, 'bloed: DNA en bloedgroep van de donor', 560, 280, q.on('bloed', 4), STAM, 28, 'center');
      regel(ctx, 'huid: eigen DNA', 1330, 330, q.on('huid', 1), HUIDC, 28); regel(ctx, 'geslachtscellen: eigen DNA', 1380, 560, q.on('geslachtscellen', 1), C.groen, 28); pijl(ctx, 1200, 330, 1040, 380, HUIDC, q.on('huid', 1), 3); pijl(ctx, 1180, 560, 1000, 600, C.groen, q.on('geslachtscellen', 1), 3); }); },

  s15(ctx, t, q) { bg(ctx, 'micro'); stamcel(ctx, 560, 450, 80, q.on('bloedstamcellen', 1), t); regel(ctx, 'bloedstamcel', 560, 600, q.on('bloedstamcellen', 1), STAM, 30); pijl(ctx, 700, 450, 1120, 450, C.line, q.on('hart', 1)); hart(ctx, 1380, 450, 2, q.on('hart', 1), t, 1, 1); vraagteken(ctx, 910, 360, q.on('herstellen', 1), 120); },

  s17(ctx, t, q) { bg(ctx, 'micro'); const mis = q.on('Misschien', 1);
    tag(ctx, 'antwoord c', 960, 120, C.goud, q.on('Antwoord', 1) * (1 - mis));
    fade(ctx, 1 - mis, () => { stamcel(ctx, 480, 450, 70, 1, t); regel(ctx, 'bloedstamcel', 480, 590, 1, STAM, 30); pijl(ctx, 570, 400, 900, 260, C.groen, q.on('bloedcellen', 1)); rodeBC(ctx, 960, 240, 32, q.on('bloedcellen', 1)); witteBC(ctx, 1040, 240, 30, q.on('bloedcellen', 1)); plaatje(ctx, 1110, 250, 14, q.on('bloedcellen', 1)); vink(ctx, 1180, 230, 20, q.on('bloedcellen', 1));
      pijl(ctx, 570, 500, 900, 620, C.koraal, q.on('alleen', 1)); spiercel(ctx, 1010, 640, 200, 44, q.on('alleen', 1)); kruis(ctx, 1170, 640, 20, q.on('alleen', 1));
      tag(ctx, 'alle genen, maar de keuzes liggen al vast', 1420, 440, C.text2, q.on('keuzes', 1)); tag(ctx, 'geprobeerd: geen nieuwe hartspier', 1420, 800, C.koraal, q.on('geprobeerd', 1)); });
    fade(ctx, mis, () => { const tz = q.on('terugzetten', 1); huidcel(ctx, 380, 450, 2.2, q.on('huidcel', 1)); regel(ctx, 'gewone huidcel', 380, 570, q.on('huidcel', 1), HUIDC, 28); pijl(ctx, 540, 450, 820, 450, STAM, tz); regel(ctx, 'terugzetten', 680, 410, tz, STAM, 26);
      stamcel(ctx, 960, 450, 80, q.on('stamcel', 2), t); regel(ctx, 'geïnduceerde stamcel', 960, 600, q.on('geïnduceerde', 1), STAM, 28); regel(ctx, 'kan bijna elke celsoort worden', 960, 650, q.on('celsoort', 1), C.text2, 24);
      const hs = q.on('hartspiercellen', 1); pijl(ctx, 1060, 450, 1300, 450, C.groen, hs); for (let i = 0; i < 3; i++) spiercel(ctx, 1480, 360 + i * 90, 260, 40, hs, 0.5 + 0.5 * Math.sin(t * 5 + i)); regel(ctx, 'hartspiercellen', 1480, 640, hs, SPIER, 28); }); },

  s18(ctx, t, q) { bg(ctx, 'micro'); const veel = q.on('veel', 1), sync = q.on('tegelijk', 1), sig = q.on('signaal', 1), wf = q.on('weefsel', 1);
    schaal(ctx, 960, 470, 640, 1); regel(ctx, 'hartspiercellen in het lab', 960, 130, 1, C.text, 30);
    if (veel < 0.99) fade(ctx, 1 - veel, () => { const k = 0.5 + 0.5 * Math.sin(t * 5); spiercel(ctx, 960, 470, 300, 60, 1, k); regel(ctx, 'één losse cel: klopt al, in eigen tempo', 960, 620, q.on('losse', 1), SPIER, 28); });
    fade(ctx, veel, () => { for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const i = r * 6 + c, ph = hash(i) * 6.283 * (1 - sync), sp = lerp(3.5 + 2.5 * hash(i + 7), 5, sync), k = 0.5 + 0.5 * Math.sin(t * sp + ph); spiercel(ctx, 560 + c * 160 + (r % 2) * 80, 360 + r * 75, 170, 30, 1, k); }
      if (sig > 0.01 && sync < 0.99) { const u = ((t - q.at('signaal', 1)) * 0.8) % 1; ctx.save(); ctx.globalAlpha *= sig * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(560, 470, u * 600, u * 260, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      tag(ctx, 'ze geven een signaal aan elkaar door', 960, 690, C.goud, sig * (1 - sync)); tag(ctx, 'samen in één ritme', 960, 690, C.groen, sync * (1 - wf)); });
    tag(ctx, 'weefsel: groep gelijke cellen met dezelfde taak', 960, 690, C.teal, wf * (1 - q.on('emergente', 1))); tag(ctx, 'emergente eigenschap: het geheel kan wat één cel niet kan', 960, 800, C.goud, q.on('emergente', 1)); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const ips = q.on('Geïnduceerde', 1);
    regel(ctx, 'embryonale stamcellen', 480, 130, 1, STAM, 30); blastocyst(ctx, 480, 380, 150, 1 - 0.6 * q.on('verloren', 1), 1, t); kruis(ctx, 620, 250, 22, q.on('verloren', 1));
    tag(ctx, 'het embryo gaat verloren', 480, 620, C.koraal, q.on('verloren', 1)); tag(ctx, 'restembryo’s van ivf, met toestemming', 480, 700, C.text2, q.on('ivf', 1)); tag(ctx, 'strenge regels (Embryowet)', 480, 780, C.text2, q.on('streng', 1));
    ctx.save(); ctx.globalAlpha *= ips * 0.6; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 160); ctx.lineTo(960, 840); ctx.stroke(); ctx.restore();
    fade(ctx, ips, () => { regel(ctx, 'geïnduceerde stamcellen', 1440, 130, 1, STAM, 30); huidcel(ctx, 1250, 340, 1.5); pijl(ctx, 1340, 340, 1480, 340, STAM, 1); stamcel(ctx, 1580, 340, 60, 1, t);
      tag(ctx, 'eigen cellen: geen afstoting', 1440, 540, C.groen, q.on('afgestoten', 1)); const tu = q.on('tumoren', 1); for (let i = 0; i < 9; i++) leukcel(ctx, 1700 + (i % 3) * 30, 560 + Math.floor(i / 3) * 30, 15, tu * ramp(t, q.at('tumoren', 1) + i * 0.1, 0.3), t);
      tag(ctx, 'risico: tumoren', 1440, 620, C.koraal, tu); tag(ctx, 'nu: vooral lab, enkele proeven bij patiënten', 1440, 780, C.text2, q.on('proeven', 1)); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const Y = q.on('2006', 1);
    fade(ctx, 1 - Y, () => { const rows = [['totipotent', 'hele lichaam + placenta', 'totipotent', 0], ['pluripotent', 'elke celsoort, geen placenta', 'pluripotent', 1], ['multipotent', 'een paar celsoorten van eigen weefsel', 'multipotent', 2], ['unipotent', 'maar één celsoort', 'unipotent', 3]];
      rows.forEach(([nm, uitleg, w, i]) => { const y = 230 + i * 165, a = Math.max(0.15, q.on(w, 1)), wbar = 1100 - i * 230; roundRect(ctx, 420, y - 50, wbar, 100, 20); shape(ctx, rgba(STAM, 0.12 + 0.12 * (3 - i) / 3), rgba(STAM, 0.7 * a), 1.5);
        ctx.save(); ctx.globalAlpha *= a; text(ctx, nm, 450, y - 4, fTekst(34, 700), C.text, 'left'); text(ctx, uitleg, 450, y + 34, fTekst(24, 600), C.text2, 'left');
        if (i === 0) { bolcel(ctx, 260, y, 44); } else if (i === 1) blastocyst(ctx, 260, y, 56, 1, 1, t); else if (i === 2) { stamcel(ctx, 240, y, 26, 1, t); rodeBC(ctx, 300, y - 20, 14); witteBC(ctx, 300, y + 20, 14); } else { stamcel(ctx, 240, y, 26, 1, t); huidcel(ctx, 310, y, 0.6); } ctx.restore(); });
      label(ctx, 'binnenste celmassa / embryonale stamcellen', null, 300, 330 + 20, 1150, 420, q.on('celmassa', 1) * (1 - q.on('multipotent', 1)), STAM); });
    fade(ctx, Y, () => { const muis = q.on('muis', 1), mens = q.on('menselijke', 1), ip = q.on('iPS', 1);
      regel(ctx, '2006 · Yamanaka', 960, 140, 1, C.goud, 36); huidcel(ctx, 420, 420, 2, muis); regel(ctx, mens > 0.5 ? 'huidcel (2007: mens)' : 'cel van een muis', 420, 540, muis, HUIDC, 28);
      const f = q.on('vier', 1); const cols = [C.koraal, C.teal, C.groen, C.goud]; for (let i = 0; i < 4; i++) tf(ctx, 640 + i * 70, 420 - 30 * Math.sin(t * 2 + i) * (1 - f), cols[i], f); regel(ctx, '4 transcriptiefactoren', 745, 540, f, C.text, 26);
      pijl(ctx, 960, 420, 1180, 420, STAM, f); stamcel(ctx, 1320, 420, 80, f, t); regel(ctx, 'iPS-cel', 1320, 560, ip, STAM, 32); regel(ctx, 'geïnduceerde pluripotente stamcel', 1320, 600, ip, C.text2, 24);
      tag(ctx, '2007: ook met menselijke cellen', 960, 700, C.teal, mens * (1 - q.on('2012', 1))); tag(ctx, 'Nobelprijs 2012: Yamanaka en John Gurdon', 960, 700, C.goud, q.on('2012', 1)); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const dna = q.on('DNA', 1);
    fade(ctx, 1 - dna, () => { knie(ctx, 560, 560, 1, 1); hart(ctx, 1380, 470, 2.2, 1, t, 1, 1); vraagteken(ctx, 960, 300, 1, 120); });
    fade(ctx, dna * (1 - q.on('kiemlaag', 1)), () => { const types = [[ZENUW, 'z'], [SPIER, 's'], [ALV, 'a'], [HUIDC, 'h']]; types.forEach(([col, k], i) => { const x = 330 + i * 400; if (k === 'z') zenuwcel(ctx, x - 40, 320, 1.4); else if (k === 's') spiercel(ctx, x, 320, 260, 56); else if (k === 'a') alvcel(ctx, x, 320, 1.3); else huidcel(ctx, x, 320, 1.6); chromRij(ctx, x, 450, 1); lampjes(ctx, x, 560, [[1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1], [1, 0, 1, 0]][i].map(v => v * q.on('differentiatie', 1)), col, q.on('differentiatie', 1)); });
      tag(ctx, 'zelfde DNA, andere genen aan: differentiatie', 960, 700, C.goud, q.on('differentiatie', 1)); tag(ctx, 'gespecialiseerde cellen delen vaak niet meer', 960, 800, C.text2, q.on('Gespecialiseerde', 1)); });
    fade(ctx, q.on('kiemlaag', 1), () => { opperhuid(ctx, 220, 220, 560, 560, t, {}); regel(ctx, 'kiemlaag: stamcellen', 500, 830, 1, STAM, 28); hart(ctx, 1380, 470, 2, 1, t, 1, 1); kruis(ctx, 1560, 290, 26, q.on('gevonden', 1)); regel(ctx, 'geen stamcellen gevonden', 1380, 720, q.on('gevonden', 1), C.koraal, 28); tag(ctx, 'antwoord a', 960, 140, C.goud, q.on('antwoord', 1)); }); },
};
