// Wat word jij? · Neurowetenschappen 3 · Als hersencellen uitvallen — eigen tekeningen (20 okt 2026)

// pillendoosje met vakjes (ochtend, middag, avond)
function pillenDoos(ctx, x, y, s, a = 1, n = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -180, -60, 360, 120, 16); shape(ctx, '#5BA4C9', '#8CC4E0', 2);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -165 + i * 115, -45, 100, 90, 10); shape(ctx, '#2C5E7E', null); if (i < n) { ctx.beginPath(); ctx.ellipse(-115 + i * 115, 0, 26, 14, 0.4, 0, 6.283); shape(ctx, '#F2EEE4', '#B8B0A0', 2); } } ctx.restore(); }

// trillende hand (rusttremor): klein handje met trillijntjes
function trilHand(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = Math.sin(t * 30) * 4; ctx.translate(x + d, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 50, 40, 0, 0, 6.283); shape(ctx, '#E3B998', null); for (let i = 0; i < 4; i++) { roundRect(ctx, 30, -32 + i * 17, 54, 14, 7); shape(ctx, '#E3B998', null); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.lineCap = 'round'; [-1, 1].forEach(k => { for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(10, 0, 72 + i * 16, k > 0 ? -0.5 : 2.64, k > 0 ? 0.5 : 3.64); ctx.stroke(); } }); ctx.restore(); }

// grafiek: dopamine in de hersenen na pillen (drie pillen), vroeg (vlak, gebufferd) of laat (pieken en dalen) — curve uit een simpel model
function dopaKurve(tt, buffer) { // tt in uren (0..12); pillen op 0, 4, 8; levodopa in bloed: halfwaardetijd 1,5 uur
  let bloed = 0; [0, 4, 8].forEach(p => { if (tt >= p) { const dt = tt - p; bloed += (1 - Math.exp(-dt / 0.35)) * Math.pow(0.5, dt / 1.5); } });
  // buffer: met veel cellen volgt dopamine een traag gemiddelde, met weinig cellen het bloed
  let gem = 0, n = 0; for (let k = 0; k <= 30; k++) { const s = tt - k * 0.2; if (s < 0) break; let b = 0; [0, 4, 8].forEach(p => { if (s >= p) { const dt = s - p; b += (1 - Math.exp(-dt / 0.35)) * Math.pow(0.5, dt / 1.5); } }); gem += b; n++; }
  gem = n ? gem / n : 0; return buffer * (0.35 + gem * 0.6) + (1 - buffer) * (0.05 + bloed * 1.25); }
function dopaGrafiek(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { buffer = 1, u = 1, banden = 1, col = C.teal, label = '' } = o; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD (UREN)', 'DOPAMINE');
  if (banden > 0.01) { ctx.save(); ctx.globalAlpha *= banden; ctx.fillStyle = rgba(C.koraal, 0.14); ctx.fillRect(x + 2, y, w - 2, h * 0.18); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(x + 2, y + h * 0.62, w - 2, h * 0.38 - 2); metaText(ctx, 'TE VEEL: OVERBEWEGELIJK', x + w - 10, y + 34, C.koraal, 'right', 26); metaText(ctx, 'TE WEINIG: STIJF', x + w - 10, y + h - 14, C.teal, 'right', 26); ctx.restore(); }
  [0, 4, 8].forEach(p => { const px = x + p / 12 * w; ctx.beginPath(); ctx.ellipse(px, y + h + 30, 16, 9, 0.4, 0, 6.283); shape(ctx, '#F2EEE4', '#B8B0A0', 2); });
  ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const N = 120; for (let i = 0; i <= N * u; i++) { const tt = i / N * 12; const v = clamp(dopaKurve(tt, buffer), 0, 1); const px = x + i / N * w, py = y + h - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (label) text(ctx, label, x + 20, y - 40, fTekst(34, 700), col, 'left'); ctx.restore(); }

// doorsnede van de hersenen (vooraanzicht, schematisch) met zwarte stof en kernen voor beweging
function breinDoorsnede(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { zs = 0, str = 0, banen = 0, over = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -230); ctx.bezierCurveTo(200, -240, 300, -120, 290, 20); ctx.bezierCurveTo(280, 140, 170, 190, 60, 170); ctx.lineTo(40, 300); ctx.lineTo(-40, 300); ctx.lineTo(-60, 170); ctx.bezierCurveTo(-170, 190, -280, 140, -290, 20); ctx.bezierCurveTo(-300, -120, -200, -240, 0, -230); ctx.closePath(); shape(ctx, '#3A3550', '#8C7BBF', 2.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -230); ctx.lineTo(0, 40); ctx.stroke();
  [[-1], [1]].forEach(([k]) => { if (str > 0.01) { ctx.save(); ctx.globalAlpha *= str; ctx.beginPath(); ctx.ellipse(k * 110, -20, 56, 80, k * 0.2, 0, 6.283); shape(ctx, rgba(C.teal, 0.45), C.teal, 2.5); ctx.restore(); }
    if (zs > 0.01) { ctx.save(); ctx.globalAlpha *= zs; ctx.beginPath(); ctx.ellipse(k * 50, 150, 40, 16, k * 0.35, 0, 6.283); shape(ctx, '#20182A', C.goud, 2.5);
      const nc = 6; for (let i = 0; i < nc; i++) { const alive = i / nc < over; circ(ctx, k * (30 + i * 8), 146 + (i % 2) * 8, 6, alive ? C.goud : '#5A5468'); } ctx.restore(); }
    if (banen > 0.01) { ctx.save(); ctx.globalAlpha *= banen * Math.max(0.15, over); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(k * 50, 140); ctx.quadraticCurveTo(k * 110, 90, k * 110, 30); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }

// dopaminecel (uiteinde) met opgeslagen blaasjes; vol 0..1
function dopaUiteinde(ctx, x, y, s, a = 1, vol = 1, t = 0, levodopa = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -40, 100, 80, 0, 0, 6.283); shape(ctx, '#4A4270', '#A392D6', 3);
  const n = Math.round(vol * 9); for (let i = 0; i < n; i++) circ(ctx, -60 + (i % 5) * 30, -70 + Math.floor(i / 5) * 34, 13, C.ves, C.vesR, 1.5);
  if (levodopa > 0.01) { for (let i = 0; i < 5; i++) { const u = ((t * 0.5 + i / 5) % 1); circ(ctx, -170 + u * 120, -150 + i * 30 + u * 60, 8, rgba(C.oker, levodopa)); } }
  ctx.restore(); }

// neuronen met synapsen; plak 0..1 = plakkaten (amyloïd) ertussen, tau 0..1 = kluwens erin, verlies 0..1 = synapsen weg
function neuronenRij(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { plak = 0, tau = 0, verlies = 0, dood = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const P = [[x, y], [x + 360, y + 60], [x + 720, y - 20], [x + 1080, y + 40]];
  for (let i = 0; i < P.length - 1; i++) { const [x1, y1] = P[i], [x2, y2] = P[i + 1]; const weg = hash(i + 4) < verlies; ctx.save(); ctx.globalAlpha *= weg ? 0.18 : 1; ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 60, y1); ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 70, x2 - 70, y2); ctx.stroke(); circ(ctx, x2 - 66, y2, 13, C.ves, C.vesR, 2); ctx.restore(); }
  P.forEach(([px, py], i) => { const d = i === 2 ? dood : 0; ctx.save(); ctx.globalAlpha *= 1 - d * 0.8; circ(ctx, px, py, 56, '#4A4270', '#A392D6', 3); ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 6; [[-1.2, 90], [1.9, 80], [2.6, 70], [-2.2, 80]].forEach(([an, l]) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * l, py + Math.sin(an) * l); ctx.stroke(); }); circ(ctx, px, py, 56, '#4A4270', '#A392D6', 3);
    if (tau > 0.01) { ctx.save(); ctx.globalAlpha *= tau; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k < 14; k++) { const an = k * 2.4, r = 10 + (k % 5) * 6; ctx.lineTo(px + Math.cos(an) * r, py + Math.sin(an) * r); } ctx.stroke(); ctx.restore(); } ctx.restore(); });
  if (plak > 0.01) { ctx.save(); ctx.globalAlpha *= plak; [[x + 180, y + 120], [x + 560, y + 150], [x + 900, y + 140], [x + 520, y - 110]].forEach(([px, py], i) => { ctx.beginPath(); for (let k = 0; k <= 12; k++) { const an = k / 12 * 6.283, r = 44 + 12 * Math.sin(k * 2.3 + i); ctx.lineTo(px + Math.cos(an) * r, py + Math.sin(an) * r * 0.7); } ctx.closePath(); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); }); ctx.restore(); }
  ctx.restore(); }

// zijaanzicht van het brein met de hippocampus (diep in de slaapkwab) en de schors
function breinHippo(ctx, x, y, s, a = 1, hip = 0, schors = 0, t = 0, col = C.koraal) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (schors > 0.01) { ctx.save(); ctx.globalAlpha *= schors; [[-180, -120], [-20, -170], [150, -110], [-120, 10]].forEach(([dx, dy]) => circ(ctx, x + dx * s, y + dy * s, 26 * s, rgba(C.teal, 0.6), C.teal, 2)); ctx.restore(); }
  if (hip > 0.01) { ctx.save(); ctx.globalAlpha *= hip; ctx.strokeStyle = col; ctx.lineWidth = 22 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 40 * s, y + 70 * s); ctx.quadraticCurveTo(x + 60 * s, y + 100 * s, x + 110 * s, y + 40 * s); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// weegschaal prikkelen (koraal) tegen remmen (teal); kant > 0 = prikkelen zwaarder
function weegschaal(ctx, x, y, s, a = 1, kant = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const an = clamp(kant, -1, 1) * 0.3;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(-60, 200); ctx.lineTo(60, 200); ctx.lineTo(0, 120); ctx.closePath(); ctx.fill(); ctx.fillRect(-8, -10, 16, 140);
  ctx.save(); ctx.rotate(an); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-260, -14, 520, 14); ctx.restore();
  [[-1, C.koraal, 'prikkelen', 'GLUTAMAAT'], [1, C.teal, 'remmen', 'GABA']].forEach(([k, col, n, m]) => { const px = k * 240 * Math.cos(an), py = k * 240 * Math.sin(an); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 80); ctx.stroke(); roundRect(ctx, px - 110, py + 80, 220, 90, 14); shape(ctx, rgba(col, 0.3), col, 3); text(ctx, n, px, py + 124, fTekst(34, 700), C.text, 'center'); metaText(ctx, m, px, py + 158, col, 'center', 24); });
  ctx.restore(); }

// netwerk van cellen; sync 0..1 = alle cellen tegelijk aan (aanval), anders af en toe één
function celNetwerk(ctx, x, y, w, h, a = 1, t = 0, sync = 0, plek = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = 22; const P = Array.from({ length: N }, (_, i) => [x + hash(i + 1) * w, y + hash(i + 50) * h]);
  ctx.strokeStyle = rgba(C.line, 0.3); ctx.lineWidth = 2; P.forEach((p, i) => { const q2 = P[(i * 7 + 3) % N]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); });
  P.forEach(([px, py], i) => { const inPlek = Math.hypot(px - (x + w * 0.3), py - (y + h * 0.4)) < plek * w; const flits = hash(i * 13 + Math.floor(t * 3)) > 0.82; const synk = inPlek && sync > 0.5; const on = synk || (!sync && flits); circ(ctx, px, py, 16, on ? (synk ? C.koraal : C.goud) : '#4A4270', '#A392D6', 2); });
  ctx.restore(); }

// haarvat in de hersenen in doorsnede: wandcellen die strak aansluiten; stofjes die wel of niet doorkomen
function hersenHaarvat(ctx, x, y, w, a = 1, t = 0, poging = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 260;
  roundRect(ctx, x, y, w, h, 40); shape(ctx, rgba(C.koraal, 0.12), null);
  for (let i = 0; i < 6; i++) { [y - 10, y + h - 30].forEach(py => { roundRect(ctx, x + i * w / 6, py, w / 6 - 4, 40, 10); shape(ctx, '#C98A7A', '#E8B4A4', 2); }); if (i) [y + 10, y + h - 10].forEach(py => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + i * w / 6 - 2, py - 18); ctx.lineTo(x + i * w / 6 - 2, py + 18); ctx.stroke(); }); }
  for (let i = 0; i < 8; i++) { const u = ((t * 0.12 + hash(i + 3)) % 1); const px = x + 40 + u * (w - 80), py = y + 60 + hash(i + 21) * (h - 120); const klein = i < 2; const tegen = poging > 0.01 && !klein && i < 6; const dy = tegen ? -Math.abs(Math.sin(t * 3 + i)) * 26 * poging : 0;
    if (klein) circ(ctx, px, py, 10, C.teal, '#BFE3F0', 2); else { roundRect(ctx, px - 22, py - 14 + dy, 44, 28, 8); shape(ctx, C.oker, '#E0C27A', 2); } }
  ctx.restore(); }

// stapel geteste middelen: n kaartjes, waarvan k met een vinkje
function middelenStapel(ctx, x, y, a = 1, u = 1, n = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const m = Math.floor(n * u); for (let i = 0; i < m; i++) { const r = Math.floor(i / 10), c = i % 10; const px = x + c * 62, py = y + r * 70; roundRect(ctx, px, py, 52, 58, 8); shape(ctx, '#2A3A58', rgba(C.line, 0.5), 1.5); if (i === 23) vink_(ctx, px + 26, py + 28, 12, 1); else kruis(ctx, px + 26, py + 28, 12, 1, rgba(C.koraal, 0.9)); } ctx.restore(); }

// diepe hersenstimulatie bij een castpersonage: hersenen in het hoofd, elektrode diep, draad naar een kastje onder het sleutelbeen
function dbsPersoon(ctx, id, x, y, h, a = 1, u = 1, t = 0) { if (a <= 0.01) return; const A = persoon(ctx, id, x, y, h, { a, t }); if (!A || !A.hoofd) return; const { x: hx, y: hy, r } = A.hoofd; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.arc(hx, hy - r * 0.15, r * 0.82, 0, 6.283); ctx.clip(); brein(ctx, hx, hy - r * 0.05, r / 330, 0.85); ctx.restore();
  if (u > 0.01) { ctx.globalAlpha *= u; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx - r * 0.1, hy - r * 0.95); ctx.lineTo(hx - r * 0.02, hy + r * 0.15); ctx.stroke(); circ(ctx, hx - r * 0.02, hy + r * 0.18, 5, C.goud); if (Math.sin(t * 8) > 0) circ(ctx, hx - r * 0.02, hy + r * 0.18, 12, null, rgba(C.goud, 0.7), 2);
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(hx - r * 0.1, hy - r * 0.95); ctx.bezierCurveTo(hx - r * 1.3, hy - r * 0.9, hx - r * 1.2, hy + r * 1.2, hx - r * 0.6, hy + r * 2.6); ctx.stroke(); roundRect(ctx, hx - r * 0.95, hy + r * 2.6, r * 0.75, r * 0.5, 6); shape(ctx, '#8A94A8', '#C9CED6', 2); }
  ctx.restore(); }
// hoofd en borst van opzij (schematisch, geen persoon): elektrode diep in de hersenen, draad naar een kastje onder de huid
function dbsSchema(ctx, x, y, s, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 260); ctx.lineTo(-60, 180); ctx.bezierCurveTo(-200, 170, -240, 40, -220, -60); ctx.bezierCurveTo(-200, -220, 160, -240, 200, -60); ctx.bezierCurveTo(220, 60, 160, 170, 70, 180); ctx.lineTo(70, 260); ctx.lineTo(300, 300); ctx.lineTo(300, 560); ctx.lineTo(-300, 560); ctx.lineTo(-300, 300); ctx.closePath(); shape(ctx, '#2C3A52', rgba(C.line, 0.6), 2);
  brein(ctx, -10, -40, 0.55, 1);
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-20, -200); ctx.lineTo(-10, 20); ctx.stroke(); circ(ctx, -10, 24, 10, C.goud, null); if (Math.sin(t * 8) > 0) circ(ctx, -10, 24, 22, null, rgba(C.goud, 0.6), 3);
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, -200); ctx.bezierCurveTo(-120, -220, -230, -100, -210, 80); ctx.bezierCurveTo(-200, 260, -160, 330, -140, 380); ctx.stroke(); roundRect(ctx, -190, 380, 110, 80, 18); shape(ctx, '#8A94A8', '#C9CED6', 2); ctx.restore(); }
  ctx.restore(); }
