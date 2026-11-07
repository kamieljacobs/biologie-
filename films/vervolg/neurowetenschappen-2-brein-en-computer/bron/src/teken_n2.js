// Wat word jij? · Neurowetenschappen 2 · Brein en computer — eigen tekeningen (20 okt 2026)

// telefoon met fotogalerij; zoek 0..1 = 'kat' getypt en kattenfoto's oplichten
function galerijTelefoon(ctx, x, y, s, a = 1, zoek = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -320, 340, 640, 40); shape(ctx, '#20242E', '#6A7080', 3); roundRect(ctx, -150, -290, 300, 580, 24); shape(ctx, '#121A26', null);
  roundRect(ctx, -130, -270, 260, 52, 26); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); text(ctx, zoek > 0.3 ? 'kat' : 'zoeken…', -100, -234, fTekst(28, 600), zoek > 0.3 ? C.text : C.text2, 'left');
  for (let i = 0; i < 12; i++) { const r = Math.floor(i / 3), c = i % 3; const px = -130 + c * 90, py = -195 + r * 112; const kat = [0, 4, 5, 9, 11].includes(i); const al = zoek > 0.3 ? (kat ? 1 : 0.18) : 1;
    ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, px, py, 80, 100, 8); shape(ctx, ['#3E5C86', '#5A6478', '#4F6E5A', '#6E5A78'][i % 4], kat && zoek > 0.3 ? C.goud : null, 3); if (kat) katIcoon(ctx, px + 40, py + 62, 0.42); else { circ(ctx, px + 40, py + 40, 16, rgba('#F2F2EE', 0.35)); ctx.fillStyle = rgba('#F2F2EE', 0.2); ctx.fillRect(px + 10, py + 66, 60, 22); } ctx.restore(); }
  ctx.restore(); }
function katIcoon(ctx, x, y, s, a = 1, col = '#C9A35C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 30, 70, 50, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -50, 50, col); ctx.beginPath(); ctx.moveTo(-46, -70); ctx.lineTo(-36, -118); ctx.lineTo(-12, -92); ctx.moveTo(46, -70); ctx.lineTo(36, -118); ctx.lineTo(12, -92); ctx.fill();
  circ(ctx, -18, -54, 6, '#121A26'); circ(ctx, 18, -54, 6, '#121A26'); ctx.strokeStyle = col; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(60, 50); ctx.quadraticCurveTo(120, 40, 110, -10); ctx.stroke(); ctx.restore(); }

// klein netwerk van bolletjes en lijnen (decoratief, achter de telefoon)
function netwerkje(ctx, x, y, w, h, a = 1, t = 0, lagen = [3, 4, 4, 2]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pos = lagen.map((n, i) => Array.from({ length: n }, (_, k) => [x + i * w / (lagen.length - 1), y + (k + 0.5) * h / n]));
  for (let i = 0; i < pos.length - 1; i++) pos[i].forEach((p, k) => pos[i + 1].forEach((q2, m) => { const wgt = hash(i * 31 + k * 7 + m * 3); ctx.strokeStyle = rgba(wgt > 0.5 ? C.teal : C.koraal, 0.25 + 0.4 * wgt); ctx.lineWidth = 1 + wgt * 3; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); }));
  pos.flat().forEach(([px, py], i) => circ(ctx, px, py, 16, '#2A3A58', lighten(C.line, 0.1), 2)); ctx.restore(); }

// neuron: dendrieten links, cellichaam, axon naar rechts; ins = [{w, an, on}] binnenkomende synapsen met + of -
function neuronSom(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { ins = [], som = null, drempel = 3, vuur = 0, t = 0, toonSom = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6FA8'; ctx.lineCap = 'round';
  ins.forEach(({ an, on, w }) => { const L = 226; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(an) * L * 0.5, Math.sin(an) * L * 0.5 + 20, Math.cos(an) * L, Math.sin(an) * L); ctx.stroke();
    if (on > 0.01) { const px = Math.cos(an) * 260, py = Math.sin(an) * 260; const col = w > 0 ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= on; circ(ctx, px, py, 34, rgba(col, 0.3), col, 3); text(ctx, (w > 0 ? '+' : '−') + Math.abs(w), px, py + 14, fTekst(38, 800), col, 'center');
      const u = 0.16 + 0.7 * ((t * 0.8) % 1); circ(ctx, px * (1 - u), py * (1 - u), 8, col); ctx.restore(); } });
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(560, 0); ctx.stroke(); ctx.lineWidth = 8; [[600, -44], [612, 0], [600, 44]].forEach(([ex, ey]) => { ctx.beginPath(); ctx.moveTo(540, 0); ctx.lineTo(ex, ey); ctx.stroke(); circ(ctx, ex, ey, 12, '#7A6FA8', '#A392D6', 2); });
  circ(ctx, 0, 0, 74, '#4A4270', '#A392D6', 3);
  if (toonSom > 0.01 && som != null) { ctx.save(); ctx.globalAlpha *= toonSom; const hgt = 110, fr = clamp(som / 6, 0, 1); roundRect(ctx, -20, -hgt / 2, 40, hgt, 8); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, -20, hgt / 2 - hgt * fr, 40, hgt * fr, 8); shape(ctx, som >= drempel ? C.goud : C.teal, null); const dy = hgt / 2 - hgt * drempel / 6; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(-38, dy); ctx.lineTo(38, dy); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if (vuur > 0.01) { const u = clamp(vuur, 0, 1); circ(ctx, 80 + u * 500, 0, 16, C.goud, '#F2D88A', 2); }
  ctx.restore(); }

// model van McCulloch en Pitts: ingangen (getallen) → gewichten → Σ → drempel → 0/1
function mpModel(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { w = [2, 2, 1, -3], ins = 1, som = 0, uit = 0, uitW = '', drempel = 3 } = o; ctx.save(); ctx.globalAlpha *= a;
  w.forEach((g, i) => { const iy = y + i * 120; const col = g > 0 ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= ins; circ(ctx, x, iy, 40, rgba(col, 0.25), col, 3); text(ctx, (g > 0 ? '+' : '−') + Math.abs(g), x, iy + 16, fTekst(40, 800), col, 'center'); pijl(ctx, x + 46, iy, x + 330, y + 180, rgba(col, 0.8), 1, 3, 14); ctx.restore(); });
  ctx.save(); ctx.globalAlpha *= som; circ(ctx, x + 400, y + 180, 70, '#2A3A58', C.text2, 3); text(ctx, 'Σ', x + 400, y + 204, fTitel(70), C.text, 'center'); metaText(ctx, 'OPTELLEN', x + 400, y + 300, C.grain, 'center', 28); pijl(ctx, x + 474, y + 180, x + 590, y + 180, C.line, 1, 3, 14);
  roundRect(ctx, x + 600, y + 120, 170, 120, 16); shape(ctx, '#2A3A58', C.goud, 3); text(ctx, '≥ ' + drempel + ' ?', x + 685, y + 196, fTekst(44, 800), C.goud, 'center'); metaText(ctx, 'DREMPEL', x + 685, y + 300, C.grain, 'center', 28); ctx.restore();
  if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; pijl(ctx, x + 776, y + 180, x + 880, y + 180, C.line, 1, 3, 14); circ(ctx, x + 940, y + 180, 56, rgba(uitW === '1' ? C.goud : C.text2, 0.25), uitW === '1' ? C.goud : C.text2, 3); text(ctx, uitW, x + 940, y + 204, fTitel(64), uitW === '1' ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// synaps die sterker wordt (blaasjes aan beide kanten) naast een lijn die dikker wordt
function synapsLijn(ctx, x, y, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 120, 70, 0, 0.3, 2.84, true); shape(ctx, '#4A4270', '#A392D6', 3); ctx.beginPath(); ctx.ellipse(x, y + 190, 140, 70, 0, 3.44, 6.0); shape(ctx, '#4A4270', '#A392D6', 3);
  const n = 4 + Math.round(u * 6); for (let i = 0; i < n; i++) circ(ctx, x - 70 + (i % 5) * 34, y + 14 + Math.floor(i / 5) * 30, 12, C.ves, C.vesR, 1.5);
  const r = 3 + Math.round(u * 4); for (let i = 0; i < r; i++) roundRect(ctx, x - 80 + i * 26, y + 116, 16, 18, 4), shape(ctx, C.teal, null);
  ctx.restore(); }
function gewichtLijn(ctx, x1, y1, x2, y2, g, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = g >= 0 ? col : C.koraal; ctx.lineWidth = 2 + Math.abs(g) * 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }

// perceptron: 3x3 plaatje links, negen verbindingen naar één uitgang; gew = 9 gewichten (−1..1)
const KRUIS = [1, 0, 1, 0, 1, 0, 1, 0, 1], RONDJE = [0, 1, 0, 1, 0, 1, 0, 1, 0], KRUIS2 = [1, 0, 1, 0, 1, 0, 1, 1, 0];
function plaatje9(ctx, x, y, cel, pix, a = 1, col = '#151A22', uit = '#E8E2D8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 8, y - 8, cel * 3 + 10, cel * 3 + 10, 10); shape(ctx, uit, null); for (let i = 0; i < 9; i++) { const r = Math.floor(i / 3), c = i % 3; roundRect(ctx, x + c * cel, y + r * cel, cel - 6, cel - 6, 6); shape(ctx, pix[i] ? col : uit, '#B8B0A0', 1.5); } ctx.restore(); }
function perceptron(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { pix = KRUIS, gew = [], uit = '', uitCol = C.text, goed = -1, lijnen = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  plaatje9(ctx, x, y, 80, pix); const ox = x + 760, oy = y + 117;
  for (let i = 0; i < 9; i++) { const r = Math.floor(i / 3), c = i % 3; const px = x + c * 80 + 37, py = y + r * 80 + 37; const dy = y - 40 + i * 40; const g = gew[i] || 0; ctx.save(); ctx.globalAlpha *= lijnen * (pix[i] ? 1 : 0.3);
    ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 240, py); ctx.lineTo(x + 320, dy); ctx.stroke(); gewichtLijn(ctx, x + 320, dy, ox - 70, oy, g, 1, C.teal); circ(ctx, x + 320, dy, 9, pix[i] ? C.text : '#3A4458'); ctx.restore(); }
  circ(ctx, ox, oy, 70, '#2A3A58', goed === 1 ? C.groen : goed === 0 ? C.koraal : C.text2, 4); text(ctx, uit, ox, oy + 16, fTekst(36, 800), uitCol, 'center');
  metaText(ctx, 'DIK = STERK · ROOD = REMMEND', x + 320, y + 360, C.grain, 'left', 28);
  ctx.restore(); }

// netwerk in lagen met wat elke laag 'ziet': randjes → vormen → kat
function lagenNetwerk(ctx, x, y, a = 1, k = 3, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kol = [x, x + 400, x + 800, x + 1200];
  plaatje9(ctx, kol[0] - 10, y + 60, 70, [0, 1, 0, 1, 1, 1, 1, 0, 1], 1, C.oker, '#2A3446'); katIcoon(ctx, kol[0] + 95, y + 380, 0.8);
  const tit = ['randjes', 'vormen', 'kat']; for (let i = 1; i <= 3; i++) { const al = clamp(k - i + 1, 0, 1); if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; pijl(ctx, kol[i - 1] + 230, y + 250, kol[i] - 30, y + 250, C.line, 1, 3, 14);
    roundRect(ctx, kol[i], y + 80, 260, 340, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, tit[i - 1], kol[i] + 130, y + 470, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'LAAG ' + i, kol[i] + 130, y + 60, C.grain, 'center', 28);
    ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round';
    if (i === 1) [[0.3, 0.2, 0.7, 0.2], [0.2, 0.4, 0.2, 0.7], [0.4, 0.8, 0.8, 0.55], [0.6, 0.35, 0.85, 0.35]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(kol[i] + a1 * 260, y + 80 + b1 * 340); ctx.lineTo(kol[i] + a2 * 260, y + 80 + b2 * 340); ctx.stroke(); });
    if (i === 2) { ctx.beginPath(); ctx.arc(kol[i] + 90, y + 190, 44, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kol[i] + 150, y + 160); ctx.lineTo(kol[i] + 180, y + 110); ctx.lineTo(kol[i] + 210, y + 160); ctx.stroke(); ctx.beginPath(); ctx.ellipse(kol[i] + 130, y + 330, 70, 40, 0, 0, 6.283); ctx.stroke(); }
    if (i === 3) katIcoon(ctx, kol[i] + 130, y + 290, 1.1, 1, C.teal); ctx.restore(); }
  ctx.restore(); }

// muis in een doolhof (van bovenaf), met een meetnaald op de kop
function doolhof(ctx, x, y, w, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, w * 0.7, 10); shape(ctx, '#2A3446', C.line, 2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  [[0.25, 0, 0.25, 0.5], [0.5, 0.2, 0.5, 0.52], [0.75, 0, 0.75, 0.5], [0.5, 0.2, 0.7, 0.2]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(x + a1 * w, y + b1 * w); ctx.lineTo(x + a2 * w, y + b2 * w); ctx.stroke(); });
  const pad = [[0.12, 0.1], [0.12, 0.61], [0.5, 0.61], [0.88, 0.61], [0.88, 0.3]]; const L = pad.length - 1, f = clamp(u, 0, 1) * L, i = Math.min(L - 1, Math.floor(f)), r = f - i; const mx = x + w * (pad[i][0] + (pad[i + 1][0] - pad[i][0]) * r), my = y + w * (pad[i][1] + (pad[i + 1][1] - pad[i][1]) * r);
  circ(ctx, x + w * 0.88, y + w * 0.3, 14, C.oker); ctx.save(); ctx.translate(mx, my); ctx.scale(0.28, 0.28); ctx.fillStyle = '#B8B0A8'; ctx.beginPath(); ctx.ellipse(0, 0, 90, 60, 0, 0, 6.283); ctx.fill(); circ(ctx, 70, 0, 40, '#B8B0A8'); ctx.fillStyle = C.goud; ctx.fillRect(56, -70, 10, 60); ctx.restore(); ctx.restore(); }
// meetnaald met veel meetpunten in een stukje hersenweefsel; actief = punten lichten op
function meetNaald(ctx, x, y, h, a = 1, t = 0, act = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 26; i++) { const px = x + (hash(i + 3) - 0.5) * 360, py = y + hash(i + 9) * h; const on = act > 0 && hash(i * 7 + Math.floor(t * 4)) > 0.7; circ(ctx, px, py, 16, on ? rgba(C.goud, 0.8) : '#4A4270', '#A392D6', 1.5); }
  roundRect(ctx, x - 12, y - 40, 24, h + 40, 6); shape(ctx, '#AFC0D0', '#D8E2EC', 1.5); for (let i = 0; i < 18; i++) { ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 6, y + i * h / 18, 12, 6); } ctx.restore(); }
// rijen pulsjes: elke rij één cel, streepjes = pulsjes (vaste willekeur)
function pulsRijen(ctx, x, y, w, n, a = 1, nu = 1, hlRij = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let r = 0; r < n; r++) { const ry = y + r * 26; ctx.strokeStyle = rgba(C.line, 0.3); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x + w, ry); ctx.stroke(); ctx.strokeStyle = hlRij.includes(r) ? C.goud : C.teal; ctx.lineWidth = 3;
    for (let k = 0; k < 18; k++) { const u = hash(r * 41 + k * 13); if (u > nu) continue; const px = x + u * w; ctx.beginPath(); ctx.moveTo(px, ry + 8); ctx.lineTo(px, ry - 12); ctx.stroke(); } } ctx.restore(); }
// venster met een paar regels code (Python)
function codeVenster(ctx, x, y, w, a = 1, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = ['pulsjes = laad("muis_dag3")', 'for cel in pulsjes:', '    t = zoek_pulsjes(cel)', '    if samen_actief(t, bocht):', '        groep.append(cel)', 'print(len(groep), "cellen")'];
  roundRect(ctx, x, y, w, 70 + R.length * 50, 14); shape(ctx, '#0E141E', '#6A7080', 2); [C.koraal, C.goud, C.groen].forEach((c, i) => circ(ctx, x + 30 + i * 30, y + 28, 9, c));
  R.slice(0, Math.max(0, Math.floor(n))).forEach((r, i) => text(ctx, r, x + 30, y + 100 + i * 50, fMeta(28), i === 0 ? C.teal : C.text, 'left')); ctx.restore(); }

// robotarm met beker; u 0..1 = arm brengt de beker omhoog
function robotArm(ctx, x, y, s, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -40, 180, 60, 10); shape(ctx, '#5A6478', '#8A94A8', 2);
  const a1 = -1.2 - u * 0.4, a2 = 1.0 - u * 1.3; const j1 = [Math.cos(a1) * 260, -40 + Math.sin(a1) * 260], j2 = [j1[0] + Math.cos(a1 + a2) * 220, j1[1] + Math.sin(a1 + a2) * 220];
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 36; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(j1[0], j1[1]); ctx.lineTo(j2[0], j2[1]); ctx.stroke(); circ(ctx, 0, -40, 30, '#8A94A8'); circ(ctx, j1[0], j1[1], 26, '#8A94A8');
  roundRect(ctx, j2[0] - 34, j2[1] - 50, 68, 90, 10); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 2); ctx.restore(); }
// chipje met draadjes (klein vierkant met pinnetjes)
function chipje(ctx, x, y, s, a = 1, act = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -40, 80, 80, 8); shape(ctx, '#3A3E46', C.goud, 3); for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) circ(ctx, -24 + i * 16, -24 + k * 16, 4, act > 0 && hash(i * 4 + k + Math.floor(t * 5)) > 0.6 ? C.goud : '#8A8E96'); ctx.restore(); }
