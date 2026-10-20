// Wat word jij? · Neurowetenschappen 1 · Je brein vult het in — eigen tekeningen (20 okt 2026)

// stopcontact (Nederlands, randaarde), vooraanzicht; gez 0..1 = goudkleurig gezicht erover
function stopcontact(ctx, x, y, s, a = 1, gez = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -150, 300, 300, 34); shape(ctx, '#EDEAE2', '#B9B4A8', 3);
  circ(ctx, 0, -10, 98, '#DCD8CE', '#B9B4A8', 3);
  roundRect(ctx, -12, -112, 24, 20, 4); shape(ctx, '#B8BCC4', '#8A8E96', 2); roundRect(ctx, -12, 72, 24, 20, 4); shape(ctx, '#B8BCC4', '#8A8E96', 2);
  circ(ctx, -40, -18, 15, '#3A3E48'); circ(ctx, 40, -18, 15, '#3A3E48');
  circ(ctx, 0, 118, 11, '#C8C4BA', '#9A968C', 2); ctx.strokeStyle = '#9A968C'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-7, 118); ctx.lineTo(7, 118); ctx.stroke();
  if (gez > 0.01) { ctx.save(); ctx.globalAlpha *= gez; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round';
    circ(ctx, -40, -18, 26, null, C.goud, 5); circ(ctx, 40, -18, 26, null, C.goud, 5); circ(ctx, 0, 118, 22, null, C.goud, 5);
    ctx.beginPath(); ctx.arc(-40, -48, 26, 3.6, 5.8); ctx.stroke(); ctx.beginPath(); ctx.arc(40, -48, 26, 3.6, 5.8); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// kleine voorwerpen met een 'gezicht' (pareidolie): 'auto' | 'huis' | 'kraan'
function gezichtDing(ctx, soort, x, y, s, a = 1, gez = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'auto') { roundRect(ctx, -120, -70, 240, 120, 30); shape(ctx, '#6E8CA8', '#9DB4C8', 2); circ(ctx, -62, -20, 22, '#F2EEE4', '#B8B0A0', 2); circ(ctx, 62, -20, 22, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, -50, 14, 100, 22, 10); shape(ctx, '#2A3446', null); }
  if (soort === 'huis') { ctx.beginPath(); ctx.moveTo(-110, -40); ctx.lineTo(0, -130); ctx.lineTo(110, -40); ctx.closePath(); shape(ctx, '#8C5A3A', null); roundRect(ctx, -100, -40, 200, 150, 4); shape(ctx, '#C9A35C', '#E0C27A', 2); roundRect(ctx, -70, -10, 44, 44, 4); shape(ctx, '#3E5C86', null); roundRect(ctx, 26, -10, 44, 44, 4); shape(ctx, '#3E5C86', null); roundRect(ctx, -22, 50, 44, 60, 4); shape(ctx, '#5A4632', null); }
  if (soort === 'kraan') { roundRect(ctx, -26, -110, 52, 70, 12); shape(ctx, '#AFC0D0', '#D8E2EC', 2); roundRect(ctx, -110, -40, 220, 60, 26); shape(ctx, '#AFC0D0', '#D8E2EC', 2); circ(ctx, -60, -76, 18, '#7A8BA8'); circ(ctx, 60, -76, 18, '#7A8BA8'); roundRect(ctx, -14, 20, 28, 50, 8); shape(ctx, '#AFC0D0', '#D8E2EC', 2); }
  if (gez > 0.01) { ctx.save(); ctx.globalAlpha *= gez; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; const E = soort === 'auto' ? [[-62, -20], [62, -20], [0, 25]] : soort === 'huis' ? [[-48, 12], [48, 12], [0, 80]] : [[-60, -76], [60, -76], [0, 45]];
    E.forEach(([px, py], i) => circ(ctx, px, py, i === 2 ? 34 : 30, null, C.goud, 4)); ctx.restore(); }
  ctx.restore(); }

// oog in doorsnede (voorkant links) met oogzenuw als kabel naar rechts
function oogKabel(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { gv = 0, bv = 0, kabel = 1, vezels = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (kabel > 0.01) { ctx.save(); ctx.globalAlpha *= kabel; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(128, 64); ctx.bezierCurveTo(300, 80, 420, -20, 620, -10); ctx.stroke();
    if (vezels > 0.01) { for (let i = 0; i < 9; i++) { const u = ((t * 0.35 + i / 9) % 1); const px = 128 + u * 490, py = 64 - u * 74 + Math.sin(u * 3) * 10; circ(ctx, px, py, 6, rgba(C.goud, vezels)); } } ctx.restore(); }
  circ(ctx, 0, 0, 150, '#F2EEE4', '#B8B0A0', 3);
  ctx.beginPath(); ctx.arc(0, 0, 138, -1.15, 1.15); ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 10; ctx.stroke(); // netvlies
  ctx.beginPath(); ctx.ellipse(-112, 0, 22, 56, 0, 0, 6.283); shape(ctx, rgba('#BFE3F0', 0.6), '#7FA8C0', 2); // lens
  circ(ctx, -148, 0, 34, null, '#3E5C86', 6);
  if (gv > 0.01) { circ(ctx, 146, 0, 14, rgba(C.goud, gv), null); }
  if (bv > 0.01) { circ(ctx, 128, 64, 15, rgba('#121A26', bv), C.text2, 2); }
  ctx.restore(); }

// eenvoudig straatbeeld; scherp = cirkel (x,y,r) die scherp en in kleur is, de rest wazig en grijzig
function straatBeeld(ctx, X, Y, w, h, a = 1, scherp = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const teken = () => { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(X, Y, w, h * 0.55); ctx.fillStyle = '#5A6070'; ctx.fillRect(X, Y + h * 0.78, w, h * 0.22); ctx.fillStyle = '#7FC48F'; ctx.fillRect(X, Y + h * 0.7, w, h * 0.08);
    const huizen = [['#C9A35C', 0.04, 0.3], ['#E07A5F', 0.24, 0.22], ['#8C7BBF', 0.42, 0.34], ['#C9A35C', 0.62, 0.26], ['#5BA4C9', 0.8, 0.3]];
    huizen.forEach(([col, fx, fh]) => { ctx.fillStyle = col; ctx.fillRect(X + w * fx, Y + h * (0.7 - fh), w * 0.16, h * fh); ctx.fillStyle = '#2C3E5E'; for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) ctx.fillRect(X + w * (fx + 0.025 + k * 0.07), Y + h * (0.7 - fh + 0.05 + r * 0.1), w * 0.04, h * 0.06); });
    ctx.fillStyle = '#F2C94C'; ctx.beginPath(); ctx.arc(X + w * 0.86, Y + h * 0.14, h * 0.07, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#E8E2D8'; for (let i = 0; i < 6; i++) ctx.fillRect(X + w * (0.05 + i * 0.16), Y + h * 0.88, w * 0.08, 6); };
  ctx.save(); roundRect(ctx, X, Y, w, h, 12); ctx.clip(); ctx.filter = 'blur(9px) saturate(0.25)'; teken(); ctx.filter = 'none'; ctx.restore();
  if (scherp) { const [sx, sy, sr] = scherp; ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 6.283); ctx.clip(); teken(); ctx.restore(); circ(ctx, sx, sy, sr, null, C.goud, 3); }
  roundRect(ctx, X, Y, w, h, 12); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// sprongetjes van het oog: punten 0..k verbonden door een zigzag
const SPRONG = [[0.18, 0.4], [0.47, 0.32], [0.33, 0.62], [0.66, 0.45], [0.86, 0.2], [0.55, 0.78], [0.8, 0.66]];
function sprongen(ctx, X, Y, w, h, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath();
  const n = Math.min(SPRONG.length, Math.floor(k) + 1); for (let i = 0; i < n; i++) { const [u, v] = SPRONG[i]; i ? ctx.lineTo(X + u * w, Y + v * h) : ctx.moveTo(X + u * w, Y + v * h); } ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < n; i++) { const [u, v] = SPRONG[i]; circ(ctx, X + u * w, Y + v * h, 9, C.goud); } ctx.restore(); }

// test voor de blinde vlek: kaart met kruisje links en stip rechts; weg 0..1 = stip verdwijnt; lijn = er loopt een lijn door de stip
function blindeVlekKaart(ctx, x, y, w, a = 1, weg = 0, lijn = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.36; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  const cy = y + h / 2; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.16 - 22, cy); ctx.lineTo(x + w * 0.16 + 22, cy); ctx.moveTo(x + w * 0.16, cy - 22); ctx.lineTo(x + w * 0.16, cy + 22); ctx.stroke();
  if (lijn > 0.01) { ctx.save(); ctx.globalAlpha *= lijn; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + w * 0.62, cy); ctx.lineTo(x + w * 0.94, cy); ctx.stroke(); ctx.restore(); }
  circ(ctx, x + w * 0.78, cy, 30, rgba(C.koraal, 1 - weg)); ctx.restore(); }

// schaakbord met schaduw (naar de illusie van Adelson). A = donker vakje buiten de schaduw, B = licht vakje midden in de schaduw: precies dezelfde grijswaarde.
const BORD_N = 5, BORD_A = [1, 0], BORD_B = [3, 1];
function _schaduwF(u, v) { // u, v in vakjes (0..5); schaduw = band van de cilinder (4.3, 1.5) naar linksonder, zachte rand
  const ax = 4.3, ay = 1.6, bx = 1.2, by = 4.8, dx = bx - ax, dy = by - ay; let t = ((u - ax) * dx + (v - ay) * dy) / (dx * dx + dy * dy); t = clamp(t, 0, 1);
  const d = Math.hypot(u - (ax + dx * t), v - (ay + dy * t)); const k = clamp((d - 1.45) / 0.55, 0, 1); const sm = k * k * (3 - 2 * k); return 0.6 + 0.4 * sm; }
let _bordCache = null;
function _bordBeeld(sz) { if (_bordCache && _bordCache.sz === sz) return _bordCache.c; const n = BORD_N * sz, c = document.createElement('canvas'); c.width = n; c.height = n; const g = c.getContext('2d'); const im = g.createImageData(n, n);
  for (let py = 0; py < n; py++) for (let px = 0; px < n; px++) { const u = (px + 0.5) / sz, v = (py + 0.5) / sz, r = Math.floor(v), cc = Math.floor(u); const licht = (r + cc) % 2 === 0;
    const isA = r === BORD_A[0] && cc === BORD_A[1], isB = r === BORD_B[0] && cc === BORD_B[1]; let val = (licht ? 200 : 120) * _schaduwF(u, v); if (isA) val = 120; if (isB) val = 120; // A en B exact gelijk
    const o = (py * n + px) * 4; im.data[o] = im.data[o + 1] = im.data[o + 2] = Math.round(val); im.data[o + 3] = 255; }
  g.putImageData(im, 0, 0); _bordCache = { sz, c }; return c; }
function grijs(v) { const k = Math.round(v); return `rgb(${k},${k},${k})`; }
function schaakbord(ctx, x, y, sz, a = 1, o = {}) { if (a <= 0.01) return; const { rest = 1, labels = 1, cilinder = 1, strook = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  if (rest > 0.01) { ctx.save(); ctx.globalAlpha *= rest; ctx.drawImage(_bordBeeld(sz), x, y); ctx.restore(); }
  if (rest < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - rest; [BORD_A, BORD_B].forEach(([r, c]) => { ctx.fillStyle = grijs(120); ctx.fillRect(x + c * sz, y + r * sz, sz, sz); }); ctx.restore(); }
  if (cilinder > 0.01 && rest > 0.01) { ctx.save(); ctx.globalAlpha *= cilinder * rest; const cx = x + 4.3 * sz, cyb = y + 1.6 * sz; ctx.fillStyle = '#4F8A5C'; ctx.fillRect(cx - 0.42 * sz, cyb - 1.6 * sz, 0.84 * sz, 1.6 * sz); ctx.beginPath(); ctx.ellipse(cx, cyb, 0.42 * sz, 0.16 * sz, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#6FAE7C'; ctx.beginPath(); ctx.ellipse(cx, cyb - 1.6 * sz, 0.42 * sz, 0.16 * sz, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = rgba(C.line, 0.5 * rest); ctx.lineWidth = 2; ctx.strokeRect(x, y, BORD_N * sz, BORD_N * sz);
  if (strook > 0.01) { ctx.save(); ctx.globalAlpha *= strook; ctx.fillStyle = grijs(120); const ax = x + (BORD_A[1] + 0.5) * sz, ay = y + (BORD_A[0] + 0.5) * sz, bx = x + (BORD_B[1] + 0.5) * sz, by = y + (BORD_B[0] + 0.5) * sz; ctx.fillRect(ax - 0.18 * sz, ay, 0.36 * sz, by - ay + 0.18 * sz); ctx.fillRect(ax - 0.18 * sz, by - 0.18 * sz, bx - ax + 0.18 * sz, 0.36 * sz); ctx.restore(); }
  if (labels > 0.01) { const lab = (rc, s2) => text(ctx, s2, x + (rc[1] + 0.5) * sz, y + (rc[0] + 0.5) * sz + 18, fTekst(52, 800), C.goud, 'center'); ctx.save(); ctx.globalAlpha *= labels; lab(BORD_A, 'A'); lab(BORD_B, 'B'); ctx.restore(); }
  ctx.restore(); }

// speelveld van bovenaf: drie witte en drie zwarte spelers als schijfjes, ballen die overgaan; g 0..1 = gorilla loopt door
function speelveld(ctx, x, y, w, h, a = 1, t = 0, g = -1, o_bors = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3446', rgba(C.line, 0.6), 2);
  const P = []; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.35 * (i % 2 ? 1 : -1); P.push([x + w / 2 + Math.cos(an) * w * 0.32, y + h / 2 + Math.sin(an) * h * 0.3, i % 2 === 0]); }
  P.forEach(([px, py, wit]) => circ(ctx, px, py, 22, wit ? '#F2F2EE' : '#151A22', wit ? '#B8B0A0' : '#5A6478', 3));
  [[0, 2], [1, 3]].forEach(([i0, i1], k) => { const u = ((t * 0.7 + k * 0.5) % 1); const A = P[i0 + (Math.floor(t * 0.7 + k * 0.5) % 2) * 2 % 6] || P[i0], B = P[(i1 + (Math.floor(t * 0.7 + k * 0.5) % 2) * 2) % 6]; const bx = A[0] + (B[0] - A[0]) * u, by = A[1] + (B[1] - A[1]) * u - Math.sin(u * 3.14) * 40; circ(ctx, bx, by, 11, C.oker, '#8C6A3A', 2); });
  if (g >= 0 && g <= 1) { ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); const gx = x - 60 + g * (w + 120), gy = y + h / 2; gorilla(ctx, gx, gy, 0.55, 1, t, typeof o_bors === 'number' ? o_bors : 0); ctx.restore(); }
  ctx.restore(); }
// gorilla(pak) van opzij, eenvoudig silhouet; bors = slaat op de borst
function gorilla(ctx, x, y, s, a = 1, t = 0, bors = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const GC = '#4A4E58'; ctx.fillStyle = GC;
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -110, 46, GC); ctx.beginPath(); ctx.ellipse(0, -100, 26, 20, 0, 0, 6.283); ctx.fillStyle = '#6A6E78'; ctx.fill(); circ(ctx, -10, -118, 5, '#E8E2D8'); circ(ctx, 10, -118, 5, '#E8E2D8');
  const sw = bors ? Math.sin(t * 14) * 0.25 : 0; ctx.strokeStyle = GC; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(-80 + sw * 60, 50 - bors * 70); ctx.moveTo(50, -40); ctx.lineTo(80 - sw * 60, 50 - bors * 70); ctx.moveTo(-30, 70); ctx.lineTo(-36, 150); ctx.moveTo(30, 70); ctx.lineTo(36, 150); ctx.stroke(); ctx.restore(); }

// longscan (CT, doorsnede) met knobbeltjes en een kleine gorilla rechtsboven in de long
function longScan(ctx, x, y, s, a = 1, gor = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -260, -200, 520, 400, 16); shape(ctx, '#0E1118', '#4A5060', 2); ctx.beginPath(); ctx.ellipse(0, 10, 220, 170, 0, 0, 6.283); shape(ctx, '#8A8E96', null);
  ctx.beginPath(); ctx.ellipse(-90, 0, 90, 130, 0.1, 0, 6.283); ctx.fillStyle = '#20242C'; ctx.fill(); ctx.beginPath(); ctx.ellipse(95, 0, 85, 125, -0.1, 0, 6.283); ctx.fill();
  circ(ctx, 0, 30, 34, '#B8BCC4'); [[-110, -40], [-70, 50], [120, 60], [70, -70]].forEach(([px, py]) => circ(ctx, px, py, 8, '#C9CED6'));
  if (gor > 0.01) { ctx.save(); ctx.globalAlpha *= gor; ctx.fillStyle = '#D8DCE2'; ctx.translate(105, -40); ctx.scale(0.3, 0.3); ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(0, -110, 46, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#D8DCE2'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(-80, 50); ctx.moveTo(50, -40); ctx.lineTo(80, 50); ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) circ(ctx, 105, -50, 66, null, rgba(C.goud, hl), 4);
  ctx.restore(); }

// weg van bovenaf: kruising met fietser (stip met richting) en een afslaande auto
function kruising(ctx, x, y, w, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4458'; ctx.fillRect(x, y + w * 0.32, w, w * 0.22); ctx.fillRect(x + w * 0.42, y, w * 0.22, w * 0.9);
  ctx.fillStyle = '#7A4A40'; ctx.fillRect(x, y + w * 0.55, w, w * 0.06); // fietspad
  ctx.strokeStyle = '#E8E2D8'; ctx.lineWidth = 3; ctx.setLineDash([16, 14]); ctx.beginPath(); ctx.moveTo(x, y + w * 0.43); ctx.lineTo(x + w, y + w * 0.43); ctx.stroke(); ctx.setLineDash([]);
  const bx = x + w * (0.08 + u * 0.45), by = y + w * 0.58; circ(ctx, bx, by, 12, C.teal, '#BFE3F0', 2);
  ctx.save(); const an = -Math.min(1, u * 1.4) * 1.57; const cx2 = x + w * 0.62 + Math.sin(-an) * w * 0.05, cy2 = y + w * 0.38 + (1 - Math.cos(an)) * w * 0.1; ctx.translate(cx2, cy2); ctx.rotate(an + 3.14); roundRect(ctx, -36, -18, 72, 36, 8); shape(ctx, C.koraal, null); ctx.restore(); ctx.restore(); }

// telefoon in de hand (los voorwerp)
function telefoon(ctx, x, y, s, a = 1, licht = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26 * s, y - 48 * s, 52 * s, 96 * s, 10 * s); shape(ctx, '#20242E', '#6A7080', 2); roundRect(ctx, x - 21 * s, y - 40 * s, 42 * s, 78 * s, 5 * s); shape(ctx, rgba(C.teal, 0.3 + 0.5 * licht), null); ctx.restore(); }

// arm (onderarm + hand) van opzij; fantoom 0..1: de hand wordt gestippeld
function armHand(ctx, x, y, s, a = 1, fantoom = 0, pijn = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -320, -40, 220, 80, 36); shape(ctx, '#D9A982', null); // bovenarm/stomp
  ctx.save(); if (fantoom > 0.01) { ctx.globalAlpha *= 1 - fantoom * 0.8; } roundRect(ctx, -120, -36, 200, 72, 32); shape(ctx, '#D9A982', null); ctx.beginPath(); ctx.ellipse(120, 0, 62, 48, 0, 0, 6.283); shape(ctx, '#D9A982', null); for (let i = 0; i < 4; i++) { roundRect(ctx, 150, -40 + i * 22, 70, 18, 9); shape(ctx, '#D9A982', null); } ctx.restore();
  if (fantoom > 0.01) { ctx.save(); ctx.globalAlpha *= fantoom; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, -120, -36, 200, 72, 32); ctx.stroke(); ctx.beginPath(); ctx.ellipse(120, 0, 62, 48, 0, 0, 6.283); ctx.stroke(); for (let i = 0; i < 4; i++) { roundRect(ctx, 150, -40 + i * 22, 70, 18, 9); ctx.stroke(); } ctx.setLineDash([]);
    ctx.strokeStyle = '#B8876A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-100, -38); ctx.quadraticCurveTo(-90, 0, -100, 38); ctx.stroke(); ctx.restore(); }
  if (pijn > 0.01) { ctx.save(); ctx.globalAlpha *= pijn; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * 1.05 + t; const r1 = 80 + 6 * Math.sin(t * 6 + i); ctx.beginPath(); ctx.moveTo(130 + Math.cos(an) * r1, Math.sin(an) * r1); ctx.lineTo(130 + Math.cos(an) * (r1 + 30), Math.sin(an) * (r1 + 30)); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

// kaart van het lichaam in de schors: een strook vakjes; over = 0..1 hoe ver het gezichtsvak het handvak overneemt
const STROOK = [['voet', C.oker], ['been', C.oker], ['romp', C.teal], ['arm', C.teal], ['hand', C.goud], ['gezicht', C.koraal], ['lippen', C.koraal]];
function lichaamsKaart(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { over = 0, handLeeg = 0, hl = -1 } = o; ctx.save(); ctx.globalAlpha *= a; const bw = w / STROOK.length;
  STROOK.forEach(([n, col], i) => { const isH = n === 'hand', isG = n === 'gezicht'; let x0 = x + i * bw, ww = bw - 8; if (isG) { x0 -= over * bw * 0.6; ww += over * bw * 0.6; } if (isH) ww -= over * bw * 0.6;
    roundRect(ctx, x0, y, ww, 110, 12); shape(ctx, rgba(col, isH ? 0.35 * (1 - handLeeg * 0.7) : (hl === i ? 0.6 : 0.3)), col, 2); text(ctx, n, x0 + ww / 2, y + 66, fTekst(28, 700), C.text, 'center'); });
  ctx.restore(); }

// spiegelkist van bovenaf: twee vakken, spiegel in het midden, een hand en zijn spiegelbeeld
function spiegelKist(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -300, -150, 600, 300, 14); shape(ctx, '#3A3E46', '#6A7080', 2); ctx.fillStyle = '#BFE3F0'; ctx.fillRect(-6, -150, 12, 300); metaText(ctx, 'SPIEGEL', 0, -170, C.grain, 'center', 26);
  const g = Math.sin(t * 2) * 12; ctx.beginPath(); ctx.ellipse(150, 20 + g, 60, 44, 0, 0, 6.283); shape(ctx, '#D9A982', null); ctx.save(); ctx.globalAlpha *= 0.55; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(-150, 20 + g, 60, 44, 0, 0, 6.283); ctx.stroke(); ctx.restore();
  ctx.restore(); }

// oog met donkere vlek in het midden (slechtziend) en een muur waarop beelden opkomen
function vlekOog(ctx, x, y, s, a = 1, vlek = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(0, -90, 120, 0); ctx.quadraticCurveTo(0, 90, -120, 0); shape(ctx, '#F2EEE4', '#B8B0A0', 3); circ(ctx, 0, 0, 46, '#3E5C86'); circ(ctx, 0, 0, 20, '#121A26'); if (vlek > 0.01) { ctx.save(); ctx.globalAlpha *= vlek; circ(ctx, 0, 0, 56, rgba('#121A26', 0.75)); ctx.restore(); } ctx.restore(); }
function bloemMotief(ctx, x, y, r, col, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.2; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.45, r * 0.22, an, 0, 6.283); ctx.fillStyle = rgba(col, 0.7); ctx.fill(); } circ(ctx, x, y, r * 0.25, C.goud); ctx.restore(); }

// gezichtsgebied op het brein: brein() in zijaanzicht (voorkant links), vlek onder in de slaapkwab
function breinGezicht(ctx, x, y, s, a = 1, hl = 0, t = 0) { brein(ctx, x, y, s, a); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a; vlek(ctx, x + 60 * s, y + 80 * s, 52 * s, C.goud, hl, t, 1); ctx.restore(); } }
// zicht achterin: hersenschors voor zien
function breinZicht(ctx, x, y, s, a = 1, hl = 0, t = 0) { brein(ctx, x, y, s, a); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a; vlek(ctx, x + 250 * s, y - 20 * s, 56 * s, C.teal, hl, t, 1); ctx.restore(); } }
