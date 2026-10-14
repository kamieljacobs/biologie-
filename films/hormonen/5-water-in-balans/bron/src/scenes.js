// Hormonen 5 · Water in balans — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[0], hair: '#6B4A2E', shirt: '#B36A5E', hairStyle: 'short' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const WATER = C.teal, URINE_D = '#D4A017', URINE_L = '#F2EBB0', ZOUT = '#E6E1D3', UREUM = '#C9A35C', ADHC = HK.hormoon, SLAG = '#B5574A', ADER = '#6F7FB0';
function urineKleur(c) { return lerpColor ? lerpColor(URINE_L, URINE_D, c) : (c > 0.5 ? URINE_D : URINE_L); }
function mixHex(a, b, u) { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }
var lerpColor = mixHex;
function beker(ctx, x, y, w, h, level, conc, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const lh = h * clamp(level, 0, 1); ctx.fillStyle = rgba(mixHex(URINE_L, URINE_D, conc), 0.9); ctx.fillRect(x - w / 2 + 6, y - lh, w - 12, lh - 4);
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h - 10); ctx.lineTo(x - w / 2 + 4, y); ctx.lineTo(x + w / 2 - 4, y); ctx.lineTo(x + w / 2, y - h - 10); ctx.stroke();
  if (lab) metaText(ctx, lab, x, y + 36, C.grain, 'center', 20); ctx.restore(); }
function fles(ctx, x, y, s = 1, a = 1, vol = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-40, -200); ctx.quadraticCurveTo(-40, -240, -16, -260); ctx.lineTo(-16, -290); ctx.lineTo(16, -290); ctx.lineTo(16, -260); ctx.quadraticCurveTo(40, -240, 40, -200); ctx.lineTo(40, 0); ctx.closePath(); shape(ctx, rgba('#9FC3E0', 0.15), '#9FC3E0', 3);
  ctx.fillStyle = rgba(WATER, 0.45); ctx.fillRect(-36, -200 * vol, 72, 200 * vol - 4); roundRect(ctx, -18, -310, 36, 22, 4); ctx.fillStyle = '#3E6FB0'; ctx.fill(); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2C94C'); ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = 6; for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.7, y + Math.sin(an) * r * 1.7); ctx.stroke(); } ctx.restore(); }
function druppel(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.5); ctx.bezierCurveTo(x + r, y - r * 0.3, x + r, y + r, x, y + r); ctx.bezierCurveTo(x - r, y + r, x - r, y - r * 0.3, x, y - r * 1.5); shape(ctx, rgba(col, 0.6), col, 1.5); ctx.restore(); }

// ---------- nier en nefron ----------
function nierDoorsnede(ctx, x, y, s = 1, o = {}) { const { a = 1, schors = 1, merg = 1, bekken = 1, leider = 1, slag = 0, ader = 0, nef = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const vorm = k => { ctx.beginPath(); ctx.moveTo(40 * k, -230 * k); ctx.bezierCurveTo(260 * k, -240 * k, 280 * k, 240 * k, 40 * k, 230 * k); ctx.bezierCurveTo(-110 * k, 225 * k, -130 * k, 90 * k, -60 * k, 40 * k); ctx.bezierCurveTo(-30 * k, 15 * k, -30 * k, -15 * k, -60 * k, -40 * k); ctx.bezierCurveTo(-130 * k, -90 * k, -110 * k, -225 * k, 40 * k, -230 * k); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= schors; vorm(1); shape(ctx, rgba('#9C5A50', 0.45), '#C98A7E', 3); ctx.restore();
  ctx.save(); ctx.globalAlpha *= merg; for (let i = 0; i < 6; i++) { const an = -1.15 + i * 0.46; const bx = 30 + Math.cos(an) * 150, by = Math.sin(an) * 165; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an + 1.57) * 34, by + Math.sin(an + 1.57) * 34); ctx.lineTo(bx - Math.cos(an + 1.57) * 34, by - Math.sin(an + 1.57) * 34); ctx.lineTo(30 + Math.cos(an) * 60, Math.sin(an) * 66); ctx.closePath(); shape(ctx, rgba('#7A3E38', 0.6), '#A85E54', 2); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= bekken; ctx.beginPath(); ctx.ellipse(-10, 0, 70, 110, 0, 0, 6.283); shape(ctx, rgba(URINE_L, 0.35), URINE_D, 2); ctx.restore();
  if (leider > 0.01) { ctx.save(); ctx.globalAlpha *= leider; ctx.strokeStyle = URINE_D; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-60, 60); ctx.quadraticCurveTo(-150, 170, -120, 280); ctx.stroke(); ctx.restore(); }
  if (slag > 0.01) { ctx.save(); ctx.globalAlpha *= slag; ctx.strokeStyle = SLAG; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-320, -40); ctx.lineTo(-70, -20); ctx.stroke(); ctx.restore(); }
  if (ader > 0.01) { ctx.save(); ctx.globalAlpha *= ader; ctx.strokeStyle = ADER; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-70, 20); ctx.lineTo(-320, 40); ctx.stroke(); ctx.restore(); }
  if (nef > 0.01) { ctx.save(); ctx.globalAlpha *= nef; for (let i = 0; i < 40; i++) { const an = -1.3 + hash(i) * 2.6, r = 165 + hash(i * 3) * 50; circ(ctx, 30 + Math.cos(an) * r, Math.sin(an) * r * 1.05, 4, C.goud); } ctx.restore(); }
  ctx.restore(); }
// uitgerold nefron: glomerulus links, buisje naar rechts, verzamelbuis rechts omlaag
const NF = { gx: 330, gy: 380, tubeY: 380, x1: 1380, vx: 1500 };
function nefronSchema(ctx, o = {}) { const { a = 1, glom = 1, kapsel = 1, buis = 1, verz = 1, haarvat = 0, vaatjes = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const { gx, gy } = NF;
  if (vaatjes > 0.01) { ctx.save(); ctx.globalAlpha *= vaatjes; ctx.strokeStyle = SLAG; ctx.lineCap = 'round'; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(120, 200); ctx.quadraticCurveTo(220, 240, gx - 30, gy - 30); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(gx + 10, gy - 40); ctx.quadraticCurveTo(gx + 60, 230, gx + 160, 200); ctx.stroke();
    metaText(ctx, 'AANVOEREND (WIJD)', 120, 170, C.grain, 'left', 20); metaText(ctx, 'AFVOEREND (NAUW)', gx + 170, 190, C.grain, 'left', 20); ctx.restore(); }
  if (kapsel > 0.01) { ctx.save(); ctx.globalAlpha *= kapsel; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(gx, gy, 110, -0.25, Math.PI * 2 - 0.9, false); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 92, -0.25, Math.PI * 2 - 0.9); ctx.stroke(); ctx.restore(); }
  if (glom > 0.01) { ctx.save(); ctx.globalAlpha *= glom; ctx.strokeStyle = SLAG; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60 * Math.PI * 6; const px = gx + Math.cos(u) * (40 + 18 * Math.sin(u * 1.7)), py = gy + Math.sin(u * 1.3) * (44 + 12 * Math.cos(u)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  if (buis > 0.01) { ctx.save(); ctx.globalAlpha *= buis; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; for (const d of [-26, 26]) { ctx.beginPath(); ctx.moveTo(gx + 100, gy + d * 0.6 - 30 + (d > 0 ? 50 : 0)); ctx.lineTo(NF.x1, NF.tubeY + d); ctx.stroke(); } ctx.fillStyle = rgba(URINE_L, 0.12); ctx.fillRect(gx + 100, NF.tubeY - 26, NF.x1 - gx - 100, 52); ctx.restore(); }
  if (haarvat > 0.01) { ctx.save(); ctx.globalAlpha *= haarvat; ctx.strokeStyle = rgba(SLAG, 0.8); ctx.lineWidth = 7; ctx.beginPath(); for (let px = gx + 140; px <= NF.x1 - 20; px += 6) { const py = NF.tubeY + 90 + Math.sin(px * 0.03) * 12; px === gx + 140 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); metaText(ctx, 'HAARVATEN ROND HET NIERBUISJE', 900, NF.tubeY + 150, C.grain, 'center', 20); ctx.restore(); }
  if (verz > 0.01) { ctx.save(); ctx.globalAlpha *= verz; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(NF.x1, NF.tubeY - 26); ctx.lineTo(NF.vx + 30, NF.tubeY - 26); ctx.lineTo(NF.vx + 30, 840); ctx.moveTo(NF.x1, NF.tubeY + 26); ctx.lineTo(NF.vx - 30, NF.tubeY + 26); ctx.lineTo(NF.vx - 30, 840); ctx.stroke(); ctx.fillStyle = rgba(URINE_L, 0.12); ctx.fillRect(NF.vx - 30, NF.tubeY - 26, 60, 840 - NF.tubeY + 26); ctx.restore(); }
  ctx.restore(); }
// deeltjes die van de glomerulus het buisje in gaan
function filtraat(ctx, t, a = 1, terug = 0) { if (a <= 0.01) return; const kinds = ['w', 'w', 'w', 'g', 'z', 'z', 'u'];
  for (let i = 0; i < 28; i++) { const k = kinds[i % kinds.length]; const u = (t * 0.08 + hash(i * 5)) % 1; const x = NF.gx + 120 + u * (NF.x1 - NF.gx - 140); const y = NF.tubeY + (hash(i * 7) - 0.5) * 34;
    const weg = k === 'g' ? clamp(terug * 3 * u, 0, 1) : (k === 'w' || k === 'z') ? clamp(terug * 2 * u, 0, 0.9) : clamp(terug * u * 0.6, 0, 0.5);
    const yy = y + weg * 90; const al = a * (1 - weg * 0.6);
    if (k === 'w') circ(ctx, x, yy, 6, rgba(WATER, al)); else if (k === 'g') glucoseDeeltje(ctx, x, yy, 10, al); else if (k === 'z') circ(ctx, x, yy, 4, rgba(ZOUT, al)); else { ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 8, yy - 4, 16, 8, 4); ctx.fillStyle = UREUM; ctx.fill(); ctx.restore(); } } }
function legenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = [['water', () => circ(ctx, x, y, 8, WATER)], ['glucose', () => glucoseDeeltje(ctx, x, y + 44, 12, 1)], ['zouten', () => circ(ctx, x, y + 88, 6, ZOUT)], ['ureum', () => { roundRect(ctx, x - 10, y + 128, 20, 10, 5); ctx.fillStyle = UREUM; ctx.fill(); }]];
  L.forEach(([n, f], i) => { f(); text(ctx, n, x + 26, y + 10 + i * 44, fTekst(28, 600), C.text, 'left'); }); ctx.restore(); }
function verzamelbuisClose(ctx, x, adh, t, a = 1, zout = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (zout > 0.01) { for (let i = 0; i < 70; i++) { const px = x - 380 + hash(i * 3) * 760, py = 160 + hash(i * 7) * 640; if (Math.abs(px - x) < 90) continue; circ(ctx, px, py, 5, rgba(ZOUT, 0.55 * zout)); } metaText(ctx, 'ZOUT WEEFSEL VAN HET NIERMERG', x + 260, 150, C.grain, 'center', 20); }
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 6; for (const d of [-70, 70]) { ctx.save(); if (adh > 0.3) ctx.setLineDash([22, 12 * adh]); ctx.beginPath(); ctx.moveTo(x + d, 150); ctx.lineTo(x + d, 820); ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 26; i++) { const u = (t * 0.12 + hash(i * 11)) % 1; const out = hash(i * 13) < adh * 0.85; let px = x + (hash(i * 5) - 0.5) * 100, py = 150 + u * 670; if (out && u > 0.25) { const v = (u - 0.25) / 0.75; px = x + (hash(i) > 0.5 ? 1 : -1) * (40 + v * 260); py = 150 + (0.25 + v * 0.3) * 670; }
    circ(ctx, px, py, 7, rgba(WATER, out && u > 0.9 ? 0 : 0.9)); }
  ctx.restore(); }
function adhSchuif(ctx, x, y, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'ADH', x, y - 30, ADHC, 'center', 26); roundRect(ctx, x - 12, y, 24, 360, 12); shape(ctx, rgba(C.fill, 0.8), C.line, 2); const py = y + 360 - 360 * v; ctx.fillStyle = rgba(ADHC, 0.4); ctx.fillRect(x - 10, py, 20, y + 360 - py); circ(ctx, x, py, 22, ADHC, '#F0CC7A', 2); text(ctx, 'veel', x + 40, y + 20, fTekst(26), C.text2, 'left'); text(ctx, 'weinig', x + 40, y + 360, fTekst(26), C.text2, 'left'); ctx.restore(); }
function glasDrank(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 60, y - 200); ctx.lineTo(x - 44, y); ctx.lineTo(x + 44, y); ctx.lineTo(x + 60, y - 200); ctx.closePath(); shape(ctx, rgba('#C9D2DE', 0.1), '#C9D2DE', 3); ctx.fillStyle = rgba('#D9A94A', 0.5); ctx.beginPath(); ctx.moveTo(x - 54, y - 140); ctx.lineTo(x - 44, y - 4); ctx.lineTo(x + 44, y - 4); ctx.lineTo(x + 54, y - 140); ctx.closePath(); ctx.fill(); text(ctx, 'alcohol', x, y + 44, fTekst(30, 700), C.text2, 'center'); ctx.restore(); }

const SCENES = {
  title(ctx, t) { nierDoorsnede(ctx, 1460, 520, 1.15, { nef: 0.6 }); },

  s01(ctx, t, q) { const b = q.on('andere', 1);
    ctx.save(); ctx.globalAlpha *= 1 - b; ctx.fillStyle = '#7FB3D9'; ctx.fillRect(0, 0, W, 600); ctx.fillStyle = '#5E9E4E'; ctx.fillRect(0, 600, W, H - 600); zon(ctx, 1600, 180, 80, 1, t);
      person(ctx, 640, 900, 560, 1, { shirt: '#B36A5E', armR: { a1: 0.6 }, armL: { a1: 0.4 } }); for (let i = 0; i < 4; i++) druppel(ctx, 600 + i * 30, 430 + ((t * 60 + i * 40) % 120), 8, '#9FC3E0', 0.8);
      { const ga = q.on('gesport', 1); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga; roundRect(ctx, 560, 80, 800, 60, 30); ctx.fillStyle = rgba('#1A2740', 0.85); ctx.fill(); text(ctx, 'warm · twee uur sporten · weinig gedronken', 960, 120, fTekst(36, 600), C.text, 'center'); ctx.restore(); } } beker(ctx, 1200, 820, 140, 220, 0.25, 1, q.on('donkergeel', 1) || q.on('plast', 1)); ctx.restore();
    if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; ctx.fillStyle = '#2E4060'; ctx.fillRect(0, 0, W, 640); ctx.fillStyle = '#3A3530'; ctx.fillRect(0, 640, W, H - 640); roundRect(ctx, 1380, 120, 380, 300, 8); shape(ctx, '#3E5C80', '#8FA0B5', 6);
      person(ctx, 640, 900, 560, 1, { shirt: '#5A7FA0' }); fles(ctx, 900, 720, 1.1, 1, 1 - ramp(t, q.at('drinkt'), 3) * 0.9);
      beker(ctx, 1200, 820, 140, 220, 0.85, 0.05, q.on('veel', 1)); tag(ctx, 'rustig binnen · een fles water', 960, 120, C.text, 1); ctx.restore(); }
    vraagteken(ctx, 1560, 640, q.on('Hoe', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const cut = q.on('Snijd', 1);
    const bodyA = 1 - Math.max(cut, q.on('nierslagader', 1)); if (bodyA > 0.01) { ctx.save(); ctx.globalAlpha *= bodyA; lichaam(ctx, 600, 560, 0.95, 1, { darm: 0, hoofd: true });
      nierVorm(ctx, 600 - 90, 560, 1.0, -1, 1); nierVorm(ctx, 600 + 90, 560, 1.0, 1, 1);
      const ul = q.on('nieren', 1); ctx.strokeStyle = URINE_D; ctx.lineWidth = 6; ctx.globalAlpha *= 1; ctx.save(); ctx.globalAlpha *= ul; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(600 + d * 70, 590); ctx.quadraticCurveTo(600 + d * 60, 720, 600 + d * 20, 790); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(600, 810, 50, 34, 0, 0, 6.283); shape(ctx, rgba(URINE_L, 0.5), URINE_D, 2); ctx.restore();
      { const lv = q.on('lever', 1) * (1 - q.on('nierslagader', 1)); if (lv > 0.01) { ctx.save(); ctx.globalAlpha *= lv; ctx.beginPath(); ctx.ellipse(560, 470, 110, 55, -0.2, 0, 6.283); shape(ctx, rgba('#9C5A50', 0.5), '#C98A7E', 2.5); ctx.restore(); } }
      label(ctx, 'nieren', 'achter in je buik', 690, 560, 1000, 420, q.on('nieren', 1), '#C98A7E'); ctx.restore(); }
    const tk = [['afvalstoffen eruit, zoals ureum', 'afvalstoffen'], ['water en zout regelen', 'regelen']]; tk.forEach(([s, w], i) => tag(ctx, s, 1420, 250 + i * 90, C.goud, q.on(w, 1) * (1 - cut)));
    tag(ctx, 'ureum: uit de lever (afbraak aminozuren)', 1420, 160, UREUM, q.on('lever', 1) * (1 - q.on('nierslagader', 1)));
    nierDoorsnede(ctx, 1150, 470, 1.25, { a: Math.max(cut, q.on('nierslagader', 1) * (1 - cut)), schors: cut ? q.on('nierschors', 1) * 0.8 + 0.2 : 0.4, merg: q.on('niermerg', 1), bekken: q.on('nierbekken', 1), leider: q.on('urineleider', 1), slag: q.on('nierslagader', 1), ader: q.on('nierader', 1), nef: q.on('nefronen', 1) });
    label(ctx, 'nierslagader', '', 1150 - 360, 470 - 50, 600, 300, q.on('nierslagader', 1), SLAG); label(ctx, 'nierader', 'minste ureum', 1150 - 360, 470 + 50, 600, 680, q.on('nierader', 1), ADER);
    label(ctx, 'nierschors', '', 1150 + 300, 470 - 160, 1650, 220, q.on('nierschors', 1) * cut, '#C98A7E'); label(ctx, 'niermerg', '', 1150 + 230, 470 + 40, 1650, 420, q.on('niermerg', 1) * cut, '#A85E54'); label(ctx, 'nierbekken', 'een holte', 1150 - 10, 470 + 60, 1650, 620, q.on('nierbekken', 1) * cut, URINE_D);
    label(ctx, 'urineleider', 'naar de blaas', 1150 - 150, 470 + 330, 700, 820, q.on('urineleider', 1) * cut, URINE_D);
    tag(ctx, '≈ 1 miljoen nefronen per nier', 1500, 840, C.goud, q.on('nefronen', 1));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    nefronSchema(ctx, { glom: q.on('kluwen', 1), kapsel: q.on('kommetje', 1), buis: q.on('perst', 1), verz: 0, vaatjes: q.on('vaatje', 1), t });
    label(ctx, 'glomerulus', 'kluwen haarvaten', NF.gx, NF.gy + 30, 350, 660, q.on('kluwen', 1), SLAG); label(ctx, 'kapsel van Bowman', '', NF.gx + 100, NF.gy + 70, 640, 560, q.on('kommetje', 1), '#C9D2DE');
    tag(ctx, 'hoge bloeddruk', NF.gx + 150, 120, SLAG, q.on('hoog', 1) * (1 - q.on('nuttige', 1)));
    const pers = q.on('perst', 1); filtraat(ctx, t, pers, 0); legenda(ctx, 1650, 560, pers);
    const bl = q.on('Bloedcellen', 1); if (bl > 0.01) { for (let i = 0; i < 5; i++) { const an = t * 0.8 + i * 1.25; circ(ctx, NF.gx + Math.cos(an) * 34, NF.gy + Math.sin(an) * 34, 13, rgba(SLAG, bl), '#D88A7E', 2); } ctx.save(); ctx.globalAlpha *= bl; circ(ctx, NF.gx, NF.gy, 20, rgba('#8C7AB8', 0.6), '#B8A8E0', 2); ctx.restore(); tag(ctx, 'bloedcellen en grote eiwitten blijven in het bloed', 900, 820, C.text2, bl * (1 - q.on('filtratie', 1))); }
    tag(ctx, 'filtratie → voorurine', 900, 250, C.goud, q.on('filtratie', 1)); tag(ctx, 'niet alleen afval: bijna alles eruit', 900, 820, C.koraal, q.on('afval', 1));
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    const bad = q.on('honderdtachtig', 1) * (1 - q.on('teruggehaald', 1));
    if (bad > 0.01) { ctx.save(); ctx.globalAlpha *= bad; roundRect(ctx, 460, 360, 700, 260, 120); shape(ctx, rgba(URINE_L, 0.2), '#C9D2DE', 4); kop(ctx, '180 liter voorurine per dag', 810, 300, 1, C.text, 48); kop(ctx, '→ 1 tot 2 liter urine', 810, 720, q.on('liter', 2), URINE_D, 44); ctx.restore(); }
    const te = q.on('teruggehaald', 1); if (te > 0.01) { ctx.save(); ctx.globalAlpha *= te; nefronSchema(ctx, { haarvat: 1, verz: 1, t }); filtraat(ctx, t, 1, ramp(t, q.at('pompen'), 3));
      const ar = q.on('pompen', 1); for (let i = 0; i < 5; i++) arrow(ctx, 520 + i * 180, NF.tubeY + 34, 520 + i * 180, NF.tubeY + 76, C.goud, ar, 4); tag(ctx, 'actief transport: kost energie', 760, 650, C.goud, q.on('energie', 1));
      for (let i = 0; i < 4; i++) arrow(ctx, 610 + i * 180, NF.tubeY + 34, 610 + i * 180, NF.tubeY + 76, WATER, q.on('osmose', 1), 3); tag(ctx, 'water volgt: osmose', 1200, 650, WATER, q.on('osmose', 1));
      tag(ctx, 'terugresorptie', 900, 160, C.goud, q.on('terugresorptie', 1));
      const pct = q.on('Normaal', 1); if (pct > 0.01) { ctx.save(); ctx.globalAlpha *= pct; roundRect(ctx, 300, 720, 1320, 120, 18); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); text(ctx, 'glucose: 100% terug', 520, 795, fTekst(34, 700), C.text, 'center'); ctx.globalAlpha *= q.on('water', 2) || 0; text(ctx, 'water: ≈ 99% terug', 960, 795, fTekst(34, 700), WATER, 'center'); ctx.restore(); ctx.save(); ctx.globalAlpha *= q.on('ureum', 1); text(ctx, 'ureum: groot deel blijft', 1390, 795, fTekst(34, 700), UREUM, 'center'); ctx.restore(); }
      ctx.restore(); }
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    ctx.save(); ctx.strokeStyle = SLAG; ctx.lineWidth = 120; ctx.globalAlpha *= 0.3; ctx.beginPath(); ctx.moveTo(200, 450); ctx.lineTo(1720, 450); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 40; i++) { const u = (t * 0.05 + hash(i * 3)) % 1; glucoseDeeltje(ctx, 200 + u * 1520, 410 + hash(i * 9) * 80, 14, q.on('glucose', 1)); }
    metaText(ctx, 'BLOED BIJ ONBEHANDELDE DIABETES', 960, 330, C.grain, 'center', 22); vraagteken(ctx, 960, 760, q.on('Wat', 1), 140);
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    grafiek(ctx, 360, 200, 1100, 460, { a: 1, xmax: 20, ymax: 10, f: g => g < 10 ? 0 : (g - 10) * 0.9, u: ramp(t, q.at('bloedsuiker'), 4), xticks: [0, 5, 10, 15, 20], yticks: [], xlab: 'glucose in het bloed (mmol/L)', ylab: 'glucose in de urine (model)', col: C.teal, marks: [[10, 'nierdrempel', q.on('nierdrempel', 1)]] });
    tag(ctx, 'tot ≈ 10 mmol/L: alles terug', 700, 600, C.groen, q.on('millimol', 1) * (1 - q.on('lukt', 1)));
    tag(ctx, 'boven de nierdrempel: glucose in de urine', 1250, 150, C.koraal, q.on('urine', 1));
  },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const z = q.on('zout', 1); const adh = z > 0.01 ? lerp(0.5, 1, q.on('veel', 2)) * (1 - 0.95 * q.on('weinig', 2)) : 0.5;
    const sch = q.on('verzamelbuis', 1) * (1 - z);
    if (sch > 0.01) { ctx.save(); ctx.globalAlpha *= sch; nefronSchema(ctx, { verz: 1, t }); tag(ctx, 'verzamelbuis: urine van veel nefronen', 1300, 250, C.text, 1); ctx.restore(); }
    if (sch > 0.01 || z < 0.01) { const nm = q.on('antidiuretisch', 1); ctx.save(); ctx.globalAlpha *= nm * (1 - z); roundRect(ctx, 200, 620, 1140, 200, 24); shape(ctx, rgba(ADHC, 0.1), ADHC, 2); text(ctx, 'ADH = anti-diuretisch hormoon', 770, 700, fTitel(48), C.text, 'center'); text(ctx, 'anti = tegen · diurese = plassen', 770, 770, fTekst(34), C.text2, 'center'); ctx.restore();
      tag(ctx, 'gemaakt in de hypothalamus, afgegeven door de hypofyse', 770, 560, C.text2, q.on('afgegeven', 1) * (1 - z)); }
    if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; verzamelbuisClose(ctx, 760, adh, t, 1, 1); adhSchuif(ctx, 1260, 260, adh, 1);
      const vel = q.on('veel', 2) * (1 - q.on('weinig', 2)), wei = q.on('weinig', 2);
      beker(ctx, 1600, 760, 160, 260, lerp(0.5, 0.2, vel) + 0.7 * wei, lerp(0.5, 1, vel) * (1 - wei) + 0.05 * wei, 1, 'URINE');
      tag(ctx, 'veel ADH: wand laat water door', 1560, 220, ADHC, vel); tag(ctx, 'weinig ADH: water stroomt door', 1560, 220, C.text2, wei); ctx.restore(); }
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    const w2 = q.on('fles', 1);
    const nodes = [{ t: 'osmotische waarde bloed', s: 'opgeloste stoffen per water', col: C.teal, rol: 'WAARDE' }, { t: 'hypothalamus', s: 'meet', col: HK.klierR, rol: 'SENSOR + REGELCENTRUM' }, { t: 'ADH', s: 'via de hypofyse', col: ADHC, rol: 'SIGNAAL' }, { t: 'verzamelbuis', s: 'haalt water terug', col: '#C9D2DE', rol: 'EFFECTOR' }];
    kringSchema(ctx, 960, 450, { a: 1 - 0.0 * w2, nodes, rx: 540, ry: 280, bw: 470, bh: 120, arr: [q.on('meet', 1), q.on('ADH', 2), q.on('terug', 1), q.on('daalt', 1)], minus: q.on('terugkoppeling', 1), pulse: (t / 5) % 1 });
    tag(ctx, 'zweten → osmotische waarde omhoog', 960, 330, C.koraal, q.on('zweten', 1) * (1 - q.on('dorst', 1)));
    const d = q.on('dorst', 1) * (1 - q.on('daalt', 1)); if (d > 0.01) { tag(ctx, 'ADH maakt geen water → dorst', 960, 330, C.goud, d); }
    tag(ctx, 'fles water → weinig ADH → veel urine', 960, 330, WATER, w2 * (1 - q.on('plassen', 1)));
    tag(ctx, 'veel plassen ≠ betere nieren', 960, 330, C.koraal, q.on('plassen', 1));
  },
  s12(ctx, t, q) { bg(ctx, 'schema'); glasDrank(ctx, 760, 640, 1); arrow(ctx, 900, 540, 1060, 540, C.line, q.on('plassen', 1), 4); beker(ctx, 1200, 700, 160, 260, 0.85, 0.15, q.on('plassen', 1)); vraagteken(ctx, 1500, 560, q.on('Hoe', 1), 140); },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const nodes = [{ t: 'osmotische waarde bloed', s: '', col: C.teal, rol: 'WAARDE' }, { t: 'hypothalamus', s: 'meet', col: HK.klierR, rol: 'SENSOR' }, { t: 'ADH', s: 'geremd', col: ADHC, rol: 'SIGNAAL' }, { t: 'verzamelbuis', s: 'haalt minder terug', col: '#C9D2DE', rol: 'EFFECTOR' }];
    kringSchema(ctx, 960, 430, { nodes, rx: 540, ry: 270, bw: 470, bh: 120, broken: { 1: q.on('remt', 1) }, pulse: (t / 5) % 1 });
    glasDrank(ctx, 1770, 290, q.on('Alcohol', 1)); tag(ctx, 'meer water naar de blaas', 960, 330, URINE_D, q.on('blaas', 1) * (1 - q.on('geconcentreerd', 1)));
    tag(ctx, 'ADH blijft geremd', 960, 330, C.koraal, q.on('geconcentreerd', 1) * (1 - q.on('uit', 1)));
    tag(ctx, 'terugkoppeling werkt niet → uitdroging', 960, 330, C.koraal, q.on('uit', 1));
  },

  s15(ctx, t, q) { bg(ctx, 'micro');
    const lis = q.on('zout', 1);
    if (lis < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - lis;
      roundRect(ctx, 460, 200, 1000, 560, 60); shape(ctx, rgba(HK.cel, 0.12), HK.cel, 3); metaText(ctx, 'CEL VAN DE VERZAMELBUIS', 960, 180, C.grain, 'center', 22);
      text(ctx, 'buis (urine)', 360, 490, fTekst(30, 600), C.text2, 'center'); text(ctx, 'bloed', 1580, 490, fTekst(30, 600), C.text2, 'center');
      receptor(ctx, 1460, 480, 0, 'adh', ramp(t, q.at('bindt'), 1), q.on('receptor', 1), 1.5); hormoonVorm(ctx, 1560 - 40 * ramp(t, q.at('bindt'), 1), 480, 16, 'adh', q.on('bindt', 1));
      const f = ramp(t, q.at('versmelten'), 3); for (let i = 0; i < 4; i++) { const by = 300 + i * 120, bx = lerp(900, 480, f); circ(ctx, bx, by, 34, rgba('#F2F2EE', 0.12), '#C9D2DE', 2); for (let k = 0; k < 2; k++) { roundRect(ctx, bx - 14 + k * 16, by - 10, 10, 20, 3); ctx.fillStyle = WATER; ctx.fill(); } }
      tag(ctx, 'aquaporinen: waterkanaaltjes', 960, 860, WATER, q.on('aquaporinen', 1));
      for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; circ(ctx, lerp(380, 1560, u), 300 + (i % 4) * 120, 7, rgba(WATER, q.on('cel', 3) || 0)); }
      ctx.restore(); }
    if (lis > 0.01) { ctx.save(); ctx.globalAlpha *= lis; const g = ctx.createLinearGradient(0, 260, 0, 840); g.addColorStop(0, rgba(ZOUT, 0.02)); g.addColorStop(1, rgba(ZOUT, 0.28 * q.on('osmotische', 1) + 0.05)); ctx.fillStyle = g; ctx.fillRect(300, 260, 1320, 600); metaText(ctx, 'NIERMERG: STEEDS ZOUTER NAAR BENEDEN', 960, 240, C.grain, 'center', 22);
      const L = 1 + 0.35 * q.on('Woestijndieren', 1); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(700, 260); ctx.lineTo(700, 260 + 350 * L); ctx.arc(800, 260 + 350 * L, 100, Math.PI, 0, true); ctx.lineTo(900, 260); ctx.stroke();
      { const sr = q.on('opstijgende', 1); arrow(ctx, 660, 360, 660, 440, C.text2, sr, 3); arrow(ctx, 940, 560, 940, 480, C.text2, sr, 3); regel(ctx, 'dalend', 640, 340, sr, C.text2, 24, 'right'); }
      label(ctx, 'lis van Henle', '', 800, 260 + 350 * L + 100, 500, 820, q.on('Henle', 1), '#C9D2DE');
      const op = q.on('opstijgende', 1); for (let i = 0; i < 5; i++) { const y = 340 + i * 90; arrow(ctx, 910, y, 1000, y, C.goud, op, 4); circ(ctx, 1020 + (t * 30 + i * 9) % 40, y, 6, rgba(ZOUT, op)); } regel(ctx, 'pompt zout naar buiten', 1060, 330, op, C.goud, 30); regel(ctx, 'laat geen water door', 1060, 380, q.on('geen', 1), C.text2, 30);
      ctx.strokeStyle = '#C9D2DE'; ctx.beginPath(); ctx.moveTo(1300, 200); ctx.lineTo(1300, 840); ctx.moveTo(1380, 200); ctx.lineTo(1380, 840); ctx.stroke(); metaText(ctx, 'VERZAMELBUIS', 1340, 190, C.grain, 'center', 20);
      for (let i = 0; i < 5; i++) arrow(ctx, 1300, 480 + i * 80, 1200, 480 + i * 80, WATER, q.on('osmotische', 1), 3);
      tag(ctx, 'kangoeroerat: extra lange lis', 960, 130, C.goud, q.on('kangoeroerat', 1)); vraagteken(ctx, 1580, 600, q.on('urine', 1), 110); ctx.restore(); }
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const al = q.on('aldosteron', 1);
    ctx.save(); ctx.globalAlpha *= 1 - al; beker(ctx, 700, 700, 160, 260, 0.15, 1, 1, 'KANGOEROERAT'); tag(ctx, 'langere lis → zouter merg → meer water terug', 960, 260, C.goud, 1); ctx.restore();
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; ketenB(ctx, 400, 230, 'bijnierschors', 'net als cortisol (film 4)', HK.klier); arrow(ctx, 400, 290, 400, 420, ADHC, 1, 4); text(ctx, 'aldosteron', 430, 360, fTekst(32, 700), C.text, 'left');
      ketenB(ctx, 400, 480, 'nierbuisje', '', '#C9D2DE'); regel(ctx, 'Na⁺ terug, water gaat osmotisch mee', 400, 580, q.on('natrium', 1), C.text, 30, 'center');
      const vs = q.on('verschil', 1); if (vs > 0.01) { ctx.save(); ctx.globalAlpha *= vs; roundRect(ctx, 900, 220, 860, 380, 22); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, 'ADH', 1110, 300, fTitel(44), ADHC, 'center'); text(ctx, 'aldosteron', 1550, 300, fTitel(44), HK.klierR, 'center');
        text(ctx, 'osmotische waarde', 1110, 400, fTekst(32, 600), C.text, 'center'); text(ctx, 'hoeveelheid bloed', 1550, 400, fTekst(32, 600), C.text, 'center'); ctx.globalAlpha *= q.on('bloeddruk', 1); text(ctx, '→ bloeddruk', 1550, 460, fTekst(30), C.text2, 'center'); ctx.restore(); }
      ctx.restore(); }
  },
  s18(ctx, t, q) { bg(ctx, 'schema');
    const fin = q.on('eind', 1);
    ctx.save(); ctx.globalAlpha *= 1 - fin;
    const sp = q.on('sporten', 1), fl = q.on('fles', 1);
    kop(ctx, '180 L voorurine → 1 tot 2 L urine', 960, 450, q.on('honderdtachtig', 1) * (1 - sp), C.text, 48);
    ctx.save(); ctx.globalAlpha *= sp; zon(ctx, 420, 290, 50, 1, t); adhSchuif(ctx, 300, 370, 0.9, 1); beker(ctx, 560, 700, 150, 240, 0.2, 1, 1, 'WEINIG, DONKER'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= fl; fles(ctx, 1420, 520, 0.9, 1, 0.1); adhSchuif(ctx, 1560, 330, 0.12, 1); beker(ctx, 1760, 700, 150, 240, 0.85, 0.05, 1, 'VEEL, LICHT'); ctx.restore();
    tag(ctx, 'hersenen meten je bloed, en sturen je nieren aan met ADH', 960, 140, C.goud, q.on('antwoord', 1));
    tag(ctx, '180 L voorurine → bijna alles terug', 960, 860, C.text2, q.on('honderdtachtig', 1) * (1 - q.on('antwoord', 1)));
    ctx.restore();
    if (fin > 0.01) { const st = [['klier', HK.klier], ['hormoon', ADHC], ['doelwitcel', HK.cel], ['kring', C.teal]]; st.forEach(([n, c], i) => { const x = 330 + i * 420, al = fin * q.on(['plek', 'bloed', 'doelwitcel', 'kring'][i], i === 1 ? 4 : 1); ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 160, 380, 320, 140, 24); shape(ctx, rgba(c, 0.2), c, 2.5); text(ctx, n, x, 465, fTekst(40, 700), C.text, 'center'); if (i < 3) arrow(ctx, x + 170, 450, x + 250, 450, C.line, 1, 4); ctx.restore(); });
      kop(ctx, 'reeks Hormonen · 5 films', 960, 250, fin, C.text2, 40); }
  },
};
function ketenB(ctx, x, y, t1, t2, col) { roundRect(ctx, x - 200, y - 50, 400, 100, 18); shape(ctx, rgba(col, 0.2), col, 2.5); text(ctx, t1, x, y + (t2 ? -2 : 12), fTekst(36, 700), C.text, 'center'); if (t2) metaText(ctx, t2, x, y + 32, C.grain, 'center', 20); }
