// Wat word jij? · Medische beeldvorming 1 · In het lichaam kijken — eigen tekeningen (24 okt 2026)
// Röntgen, MRI, echo en CT. Beelden in grijswaarden zoals op de scanner; schema's op het gewone navy.

const MB = { bot: '#E6DCC6', botR: '#B8AC94', huid: '#F1D2B8', spier: '#C9786A', vet: '#E8C98A', plaat: '#0B1018', rand: '#5A6478', gips: '#F2F2EE' };
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
function grijs(v) { const k = Math.round(clamp(v, 0, 1) * 255); return `rgb(${k},${k},${k})`; }
// liggend castpersonage: voeten op (x,y), hoofd naar links (kop = -1) of rechts (kop = 1)
function liggend(ctx, id, x, y, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate((o.kop || -1) * Math.PI / 2); persoon(ctx, id, 0, 0, h, Object.assign({ uit: 'neutraal' }, o, { a })); ctx.restore(); }
// brancard / scannerbed: bovenkant matras op y
function brancard(ctx, x, y, w, a = 1, wielen = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 34, 12); shape(ctx, '#DDE6EE', '#B8C8D8', 2);
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x + 10, y + 34, w - 20, 14); if (wielen) { ctx.fillRect(x + 30, y + 48, 12, 110); ctx.fillRect(x + w - 42, y + 48, 12, 110); circ(ctx, x + 36, y + 166, 12, '#4A5266'); circ(ctx, x + w - 36, y + 166, 12, '#4A5266'); } ctx.restore(); }

// ===== tuin met omgevallen ladder =====
function tuin(ctx, a = 1, ladder = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3F6B45'; ctx.fillRect(0, 760, 1000, 120); ctx.fillStyle = '#345A3A'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(60 + i * 115, 760, 80, 46, 0, Math.PI, 0); ctx.fill(); }
  // ladder ligt schuin tegen de grond
  if (ladder > 0.01) { ctx.save(); ctx.globalAlpha *= ladder; ctx.translate(560, 790); ctx.rotate(-0.22); ctx.strokeStyle = '#B8A07A'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(380, -20); ctx.moveTo(0, 30); ctx.lineTo(380, 30); ctx.stroke(); ctx.lineWidth = 8; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(k * 55, -20); ctx.lineTo(k * 55, 30); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

// ===== röntgenfoto van onderarm en pols. (x,y) = midden; breuk 0..1 = donkere lijn in het spaakbeen =====
function polsFoto(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { breuk = 0, wit = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 380 * s, h = 520 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, MB.plaat, MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  // weke delen: vage grijze arm
  ctx.fillStyle = 'rgba(150,160,170,0.28)'; ctx.beginPath(); ctx.moveTo(-120, 280); ctx.lineTo(-108, -10); ctx.quadraticCurveTo(-140, -150, -120, -290); ctx.lineTo(130, -290); ctx.quadraticCurveTo(150, -150, 112, -10); ctx.lineTo(120, 280); ctx.closePath(); ctx.fill();
  ctx.filter = 'blur(1.5px)'; ctx.fillStyle = `rgba(235,240,245,${0.9 * wit})`;
  // spaakbeen (links in beeld, breder bij de pols) en ellepijp
  ctx.beginPath(); ctx.moveTo(-70, 280); ctx.lineTo(-58, 40); ctx.quadraticCurveTo(-96, -10, -92, -40); ctx.lineTo(-10, -40); ctx.quadraticCurveTo(-10, 0, -22, 40); ctx.lineTo(-24, 280); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30, 280); ctx.lineTo(36, 30); ctx.quadraticCurveTo(30, -10, 44, -30); ctx.lineTo(80, -30); ctx.quadraticCurveTo(84, 0, 66, 30); ctx.lineTo(66, 280); ctx.closePath(); ctx.fill();
  // handwortelbeentjes
  [[-70, -78, 26, 22], [-28, -82, 24, 22], [14, -82, 22, 20], [52, -74, 22, 20], [-62, -128, 24, 22], [-20, -132, 22, 22], [20, -132, 22, 20], [58, -124, 20, 20]].forEach(([bx, by, rx, ry]) => { ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, 0, 0, 6.283); ctx.fill(); });
  // middenhandsbeentjes
  [-84, -40, 4, 44, 80].forEach((bx, i) => { ctx.save(); ctx.translate(bx, -170); ctx.rotate((i - 2) * -0.08); roundRect(ctx, -12, -150, 24, 150, 12); ctx.fill(); ctx.restore(); });
  ctx.filter = 'none';
  // merg iets donkerder
  ctx.fillStyle = 'rgba(11,16,24,0.18)'; ctx.fillRect(-52, 60, 18, 220); ctx.fillRect(44, 60, 12, 220);
  if (breuk > 0.01) { ctx.strokeStyle = rgba('#0B1018', 0.95 * breuk); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-98, -2); ctx.lineTo(-70, 6); ctx.lineTo(-50, -4); ctx.lineTo(-16, 8); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== röntgenfoto van de knie (naar Wat is er met die knie?): botten wit, banden onzichtbaar; spook = waar de banden zouden zitten =====
function knieFoto(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spook = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 190 * s, y - 260 * s, 380 * s, 520 * s, 14); shape(ctx, MB.plaat, MB.rand, 3);
  ctx.save(); roundRect(ctx, x - 190 * s, y - 260 * s, 380 * s, 520 * s, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s * 0.55, s * 0.55);
  ctx.fillStyle = 'rgba(150,160,170,0.25)'; ctx.fillRect(-250, -500, 500, 1000);
  ctx.filter = 'blur(2px)'; ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.beginPath(); ctx.moveTo(-55, -480); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -480); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 480); ctx.lineTo(-46, 480); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); ctx.fill(); ctx.fillRect(146, 150, 26, 330); ctx.filter = 'none';
  if (spook > 0.01) { ctx.globalAlpha *= spook; ctx.setLineDash([14, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-24, 40); ctx.lineTo(46, -62); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== röntgenopstelling: buis boven, doorsnede van de onderarm, plaat onder. u = stralen lopen (0..1) =====
// doorsnede arm: huid/vet, spier, twee botten. Stralen door bot stoppen; de plaat wordt zwart waar straling aankomt.
function rontgenOpstelling(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { u = 1, plaat = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  // buis
  roundRect(ctx, x - 110, y - 330, 220, 90, 18); shape(ctx, '#8A93A6', '#C9D2DE', 2.5); circ(ctx, x, y - 240, 16, C.goud);
  // arm (doorsnede) op y
  const armY = y, R = 150, bones = [[-55, 0, 42, 34], [60, 6, 34, 30]];
  ctx.beginPath(); ctx.ellipse(x, armY, R + 18, 104, 0, 0, 6.283); shape(ctx, MB.huid, '#C8A488', 2.5); ctx.beginPath(); ctx.ellipse(x, armY, R - 4, 88, 0, 0, 6.283); shape(ctx, MB.spier, '#A85A4C', 2);
  bones.forEach(([bx, by, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x + bx, armY + by, rx, ry, 0, 0, 6.283); shape(ctx, MB.bot, MB.botR, 3); });
  // plaat
  const pY = y + 220, pW = 520; roundRect(ctx, x - pW / 2, pY, pW, 40, 8); shape(ctx, '#C9CED6', '#8A93A6', 2);
  // stralen: van de buis recht naar beneden (evenwijdig, vereenvoudigd)
  const N = 13; for (let i = 0; i < N; i++) { const rx = x - 240 + i * 40; let stop = pY; let hitBone = false;
    for (const [bx, by, brx, bry] of bones) { const dx = (rx - x - bx) / brx; if (Math.abs(dx) < 0.95) { stop = armY + by - bry * Math.sqrt(1 - dx * dx); hitBone = true; } }
    if (!hitBone && Math.abs(rx - x) < R + 18) stop = armY + 110;
    const y0 = y - 230, yEnd = y0 + (stop - y0) * clamp(u * 1.3, 0, 1); ctx.strokeStyle = rgba(C.goud, 0.85); ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(rx, y0); ctx.lineTo(rx, yEnd); ctx.stroke(); ctx.setLineDash([]);
    const inLijf = Math.abs(rx - x) < R + 18;
    if (!hitBone && u > 0.6) { ctx.strokeStyle = rgba(C.goud, inLijf ? 0.4 : 0.85); ctx.lineWidth = inLijf ? 2.5 : 4; ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(rx, armY + 110); ctx.lineTo(rx, pY); ctx.stroke(); ctx.setLineDash([]); }
    if (plaat > 0.01 && u > 0.7) { ctx.fillStyle = hitBone ? rgba('#F2F2EE', plaat) : inLijf ? rgba('#6A707A', plaat) : rgba('#0B1018', 0.95 * plaat); ctx.fillRect(rx - 20, pY + 2, 40, 36); } }
  ctx.restore(); return { plaatY: pY, armY, bones: bones.map(([bx, by]) => ({ x: x + bx, y: armY + by })) }; }

// grijsschaal lucht - vet - spier/band - bot
function grijsSchaal(ctx, x, y, a = 1, hl = -1, aan = [1, 1, 1, 1], d = 215) { if (a <= 0.01) return; const T = [['lucht', 0.04, 'bijna zwart'], ['vet', 0.38, 'grijs'], ['spier en band', 0.5, 'grijs'], ['bot', 0.93, 'wit']];
  T.forEach(([n, v, m], i) => { const ai = a * aan[i]; if (ai <= 0.01) return; ctx.save(); ctx.globalAlpha *= ai; const xx = x + i * d; roundRect(ctx, xx, y, 200, 110, 14); shape(ctx, grijs(v), hl === i ? C.goud : C.line, hl === i ? 5 : 2); ctx.restore(); naamBij(ctx, n, m, xx + 100, y + 160, ai, 'center'); }); }

// kalender-strook: één week (7 vakjes) gevuld
function weekStrook(ctx, x, y, a = 1, k = 7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { roundRect(ctx, x + i * 58, y, 48, 48, 8); shape(ctx, i < k ? rgba(C.goud, 0.7) : '#2A3A58', C.line, 1.5); } ctx.restore(); }

// ===== MRI =====
// scanner van opzij: grote ring met tunnel, bed dat erin schuift. Persoon ligt met hoofd naar rechts (de knie in de ring).
function mriScanner(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { schuif = 0, id = 'lotte', t = 0, label = true, naam = 'MRI-SCANNER', outfit } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // achterkant ring
  roundRect(ctx, -160, -330, 320, 520, 70); shape(ctx, '#C9D2DE', '#8FA0B5', 2.5);
  ctx.fillStyle = '#1A2740'; roundRect(ctx, -160, -120, 320, 150, 40); ctx.fill();
  // bed en persoon
  const bx = -560 + schuif * 380; ctx.fillStyle = '#7A8294'; ctx.fillRect(-640, 70, 640, 22); ctx.fillRect(-600, 92, 30, 120); ctx.fillRect(-80, 92, 30, 120);
  roundRect(ctx, bx - 100, 10, 700, 30, 12); shape(ctx, '#DDE6EE', '#B8C8D8', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(-1000, -400, 840, 700); ctx.rect(160, -400, 900, 700); ctx.clip('evenodd');
  liggend(ctx, id, bx - 60, 6, 420, { kop: 1, t, outfit }); ctx.restore();
  // deel in de tunnel: alleen de rand van het bed
  ctx.strokeStyle = 'rgba(143,160,181,0.5)'; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.strokeRect(-160, -120, 320, 150); ctx.setLineDash([]);
  if (label) metaText(ctx, naam, 0, -360, C.grain, 'center', 28);
  ctx.restore(); }
function waterMolecuul(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-64, 46); ctx.lineTo(0, 0); ctx.lineTo(64, 46); ctx.stroke();
  circ(ctx, 0, 0, 52, '#D8645A', '#F09A8E', 3); text(ctx, 'O', 0, 16, fTekst(46, 800), '#FFFFFF', 'center');
  for (const k of [-1, 1]) { circ(ctx, k * 70, 52, 32, '#F2F2EE', hl > 0.5 ? C.goud : '#9AA3B2', hl > 0.5 ? 6 : 3); text(ctx, 'H', k * 70, 64, fTekst(32, 800), '#2A3446', 'center'); }
  ctx.restore(); }
// één kompasnaaldje: hoek an (0 = omhoog)
function naald(ctx, x, y, L, an, col = C.koraal) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(L * 0.22, 0); ctx.lineTo(-L * 0.22, 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, L); ctx.lineTo(L * 0.22, 0); ctx.lineTo(-L * 0.22, 0); ctx.closePath(); ctx.fillStyle = '#C9CED6'; ctx.fill(); circ(ctx, 0, 0, L * 0.12, '#2A3446'); ctx.restore(); }
// raster van naaldjes. orde 0..1: van willekeurig naar (de meeste) met het veld mee; kantel 0..1: radiogolf duwt ze opzij; terug 0..1: ze zwaaien terug
function naaldVeld(ctx, x, y, nx, ny, d, a = 1, o = {}) { if (a <= 0.01) return; const { orde = 0, kantel = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const k = j * nx + i, r0 = hash(k * 7.3) * 6.283, tegen = hash(k * 3.1) < 0.3;
    const doel = tegen ? Math.PI : 0, wiebel = 0.12 * Math.sin(t * 2 + k); let an = r0 + (doel - r0) * orde + wiebel * orde;
    an += kantel * (tegen ? -1.3 : 1.3) * (0.85 + 0.15 * Math.sin(t * 9 + k));
    naald(ctx, x + i * d, y + j * d, d * 0.36, an); }
  ctx.restore(); }
function radioGolf(ctx, x1, y, x2, a = 1, t = 0, col = C.teal, amp = 22, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); const n = 80; for (let k = 0; k <= n; k++) { const f = k / n, xx = x1 + (x2 - x1) * f, yy = y + Math.sin(f * 30 - t * 10) * amp; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); pijl(ctx, x2 - 10, y, x2 + 14, y, col, 1, lw, 20); ctx.restore(); }
// MRI-beeld van de knie van opzij (grijswaarden). scheur 0..1: band onderbroken + lichte vlek
function mriKnie(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { scheur = 0, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 440 * s, h = 520 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#050709', MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  // weke delen
  ctx.fillStyle = grijs(0.32); ctx.beginPath(); ctx.moveTo(-150, -300); ctx.quadraticCurveTo(-180, 0, -130, 300); ctx.lineTo(150, 300); ctx.quadraticCurveTo(190, 0, 160, -300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = grijs(0.62); ctx.beginPath(); ctx.moveTo(-150, -300); ctx.quadraticCurveTo(-180, 0, -130, 300); ctx.lineTo(-112, 300); ctx.quadraticCurveTo(-160, 0, -132, -300); ctx.closePath(); ctx.fill();
  // dijbeen (boven) en scheenbeen (onder): beenmerg middelgrijs, cortex zwart
  const bot = (pad) => { ctx.beginPath(); pad(); ctx.fillStyle = grijs(0.55); ctx.fill(); ctx.strokeStyle = '#050709'; ctx.lineWidth = 9; ctx.stroke(); };
  bot(() => { ctx.moveTo(-70, -300); ctx.lineTo(-62, -120); ctx.bezierCurveTo(-110, -60, -100, 10, -30, 12); ctx.bezierCurveTo(30, 16, 110, -10, 90, -80); ctx.lineTo(62, -130); ctx.lineTo(60, -300); ctx.closePath(); });
  bot(() => { ctx.moveTo(-110, 60); ctx.quadraticCurveTo(-10, 40, 100, 60); ctx.lineTo(80, 130); ctx.lineTo(50, 300); ctx.lineTo(-50, 300); ctx.lineTo(-70, 130); ctx.closePath(); });
  // knieschijf voor (rechts in beeld = voorkant)
  ctx.beginPath(); ctx.ellipse(132, -70, 26, 62, 0.15, 0, 6.283); ctx.fillStyle = grijs(0.55); ctx.fill(); ctx.strokeStyle = '#050709'; ctx.lineWidth = 7; ctx.stroke();
  // gewrichtsvocht dun en licht
  ctx.strokeStyle = grijs(0.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-80, 34); ctx.quadraticCurveTo(0, 26, 86, 38); ctx.stroke();
  // voorste kruisband: donkere streep van scheenbeen (voor) naar dijbeen (achter)
  const A0 = [40, 52], A1 = [-40, -40]; ctx.lineCap = 'round'; ctx.lineWidth = 22; ctx.strokeStyle = '#0A0D12';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...A1); ctx.stroke(); }
  else { const P = u => [A0[0] + (A1[0] - A0[0]) * u, A0[1] + (A1[1] - A0[1]) * u]; ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...P(0.32)); ctx.moveTo(...P(0.72)); ctx.lineTo(...A1); ctx.stroke();
    const m = P(0.52); const g = ctx.createRadialGradient(m[0], m[1], 4, m[0], m[1], 50); g.addColorStop(0, `rgba(240,242,245,${0.95 * scheur})`); g.addColorStop(1, 'rgba(240,242,245,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(m[0], m[1], 50, 38, -0.8, 0, 6.283); ctx.fill(); }
  if (hl > 0.01) { ctx.strokeStyle = rgba(C.goud, hl); ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(0, 6, 82, 70, -0.8, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); ctx.restore(); }
function sleutels(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -40, 26, 0, 6.283); ctx.stroke();
  for (const k of [-1, 1]) { ctx.save(); ctx.rotate(k * 0.35); ctx.fillStyle = '#C9CED6'; ctx.fillRect(-7, -16, 14, 90); ctx.fillRect(7, 50, 16, 8); ctx.fillRect(7, 66, 12, 8); circ(ctx, 0, -6, 18, '#C9CED6'); ctx.restore(); } ctx.restore(); }
function bankpas(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -80, -50, 160, 100, 12); shape(ctx, '#3E6A8E', '#6A8AAE', 2); ctx.fillStyle = '#1A2740'; ctx.fillRect(-80, -30, 160, 20); roundRect(ctx, -60, 4, 30, 24, 4); shape(ctx, C.goud, null); ctx.restore(); }

// ===== ECHO =====
function echoKop(ctx, x, y, s, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s); roundRect(ctx, -22, -110, 44, 100, 14); shape(ctx, '#E8ECF0', '#9AA3B2', 2); ctx.beginPath(); ctx.moveTo(-34, -14); ctx.lineTo(34, -14); ctx.quadraticCurveTo(36, 8, 0, 10); ctx.quadraticCurveTo(-36, 8, -34, -14); shape(ctx, '#5A6478', '#3A4458', 2);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -110); ctx.quadraticCurveTo(10, -170, 50, -190); ctx.stroke(); ctx.restore(); }
// principe: echokop bovenaan, lagen weefsel, puls naar beneden en echo's terug; rechts diepte-as. p = fase 0..1 van de puls
function echoPrincipe(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { p = 0, gel = 1, toon = 1, diepte = 0, blok = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = [['huid', 46, '#E8C2A4'], ['vet', 70, '#E8D49A'], ['spier', 100, '#C9786A'], ['lever', 190, '#9A5A4A']]; let yy = y + 70; const grens = [];
  if (gel > 0.01) { ctx.save(); ctx.globalAlpha *= gel; ctx.beginPath(); ctx.ellipse(x + w / 2, y + 66, 90, 14, 0, 0, 6.283); ctx.fillStyle = rgba('#9CD6E8', 0.8); ctx.fill(); ctx.restore(); }
  L.forEach(([n, h, c]) => { ctx.fillStyle = c; ctx.fillRect(x, yy, w, h); grens.push(yy); yy += h; }); grens.push(yy);
  ctx.strokeStyle = 'rgba(26,39,64,0.6)'; ctx.lineWidth = 2; grens.forEach(g => { ctx.beginPath(); ctx.moveTo(x, g); ctx.lineTo(x + w, g); ctx.stroke(); });
  L.forEach(([n], i) => naamBij(ctx, n, '', x + 24, (grens[i] + grens[i + 1]) / 2 + 12, toon, 'left'));
  if (blok > 0.01) { ctx.save(); ctx.globalAlpha *= blok; const ry = (grens[2] + grens[3]) / 2 - 20; ctx.fillStyle = MB.bot; roundRect(ctx, x + w * 0.6, ry, 140, 40, 20); ctx.fill(); ctx.fillStyle = 'rgba(5,7,9,0.75)'; ctx.fillRect(x + w * 0.6 + 10, ry + 40, 120, grens[4] - ry - 40); naamBij(ctx, 'rib', '', x + w * 0.6 + 70, ry + 30, 1, 'center', '#2A3446'); naamBij(ctx, 'schaduw', '', x + w * 0.6 + 70, grens[4] - 40, 1, 'center'); ctx.restore(); }
  echoKop(ctx, x + w / 2, y + 62, 0.7, 0, 1);
  // puls naar beneden (koraal) en echo's terug (teal)
  const px = x + w / 2 - 70, bodem = grens[4], pyy = y + 70 + (bodem - y - 70) * p;
  if (p > 0.001 && p < 0.999) { ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.moveTo(px - 30, pyy - k * 10); ctx.quadraticCurveTo(px, pyy - k * 10 + 10, px + 30, pyy - k * 10); } ctx.stroke(); ctx.restore(); }
  grens.slice(0, 4).forEach((g, i) => { const tg = (g - y - 70) / (bodem - y - 70); if (p > tg) { const back = g - (p - tg) * (bodem - y - 70); if (back > y + 70) { ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px + 70 - 22, back + 6); ctx.quadraticCurveTo(px + 70, back - 4, px + 70 + 22, back + 6); ctx.stroke(); } } });
  // diepte-as
  if (diepte > 0.01) { ctx.save(); ctx.globalAlpha *= diepte; pijl(ctx, x + w + 50, y + 80, x + w + 50, bodem - 10, C.line, 1, 4, 18); metaA(ctx, 'LATER TERUG', x + w + 74, bodem - 20, 1, C.grain, 'left', 24); metaA(ctx, '= DIEPER', x + w + 74, bodem + 12, 1, C.grain, 'left', 24); ctx.restore(); }
  ctx.restore(); return { grens }; }
// echobeeld (waaier). vocht 0..1 = zwarte plek; rib 0..1 = witte boog met schaduw
function echoScherm(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { vocht = 0, rib = 1, t = 0, kader = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  if (kader > 0.01) { roundRect(ctx, x - r - 30, y - 40, 2 * r + 60, r + 90, 16); shape(ctx, '#050709', MB.rand, 3); }
  const a0 = Math.PI / 2 - 0.62, a1 = Math.PI / 2 + 0.62; ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.clip();
  ctx.fillStyle = '#111418'; ctx.fillRect(x - r, y, 2 * r, r);
  // spikkels: huid en lever
  const n = 1400; for (let k = 0; k < n; k++) { const rr = r * Math.sqrt(hash(k * 1.7)), an = a0 + (a1 - a0) * hash(k * 2.9 + 1); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; let v = rr < r * 0.14 ? 0.75 : rr < r * 0.24 ? 0.3 : 0.45 + 0.2 * hash(k * 5.3 + Math.floor(t * 12));
    if (rib > 0.01 && px > x + r * 0.08 && px < x + r * 0.42 && py > y + r * 0.5) v *= 1 - 0.92 * rib;
    ctx.fillStyle = grijs(v); ctx.fillRect(px, py, 5, 4); }
  if (rib > 0.01) { ctx.strokeStyle = `rgba(245,245,245,${rib})`; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(x + r * 0.25, y + r * 0.62, r * 0.2, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
  if (vocht > 0.01) { ctx.fillStyle = `rgba(5,6,8,${0.95 * vocht})`; ctx.beginPath(); ctx.ellipse(x - r * 0.28, y + r * 0.78, r * 0.2, r * 0.07, 0.3, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ===== CT =====
// vooraanzicht van de ring: buis draait rond, waaier stralen naar de detectorboog; doorsnede van de patiënt in het midden
function ctRing(ctx, x, y, R, a = 1, o = {}) { if (a <= 0.01) return; const { an = 0, stralen = 1, id = 'henk' } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, R + 70, 0, 6.283); ctx.arc(x, y, R, 0, 6.283, true); ctx.fillStyle = '#C9D2DE'; ctx.fill('evenodd'); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.fillStyle = '#1A2740'; ctx.fill();
  // bed en lichaam (doorsnede)
  ctx.fillStyle = '#DDE6EE'; roundRect(ctx, x - R * 0.62, y + R * 0.38, R * 1.24, 26, 10); ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y + R * 0.08, R * 0.55, R * 0.3, 0, 0, 6.283); shape(ctx, MB.huid, '#C8A488', 2);
  const tx = x + Math.cos(an) * (R + 35), ty = y + Math.sin(an) * (R + 35), dx = x - Math.cos(an) * (R + 20), dy = y - Math.sin(an) * (R + 20);
  if (stralen > 0.01) { ctx.save(); ctx.globalAlpha *= stralen * 0.75; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.arc(x, y, R + 4, an + Math.PI - 0.5, an + Math.PI + 0.5); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.22); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -46, -26, 92, 52, 10); shape(ctx, '#8A93A6', '#5A6478', 2); circ(ctx, 0, 24, 9, C.goud); ctx.restore();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(x, y, R + 22, an + Math.PI - 0.5, an + Math.PI + 0.5); ctx.stroke();
  ctx.restore(); }
// brood in sneetjes; los = hoeveel het voorste sneetje los ligt
function brood(ctx, x, y, s, a = 1, los = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 7; k >= 0; k--) { const dx = k * 34 + (k === 0 ? -los * 90 : 0); ctx.beginPath(); ctx.moveTo(dx - 90, 80); ctx.lineTo(dx - 96, -30); ctx.bezierCurveTo(dx - 110, -110, dx + 110, -110, dx + 96, -30); ctx.lineTo(dx + 90, 80); ctx.closePath(); shape(ctx, '#E8D2A0', '#A8743A', 6); }
  ctx.restore(); }
// CT-plak van de bovenbuik, gezien vanaf de voeten: rechts van de patiënt = links in beeld.
// o.hl: {lever, maag, milt, aorta, wervel, rib}; o.breuk 0..1; o.contrast 0..1 (organen in kleur)
function ctPlak(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { hl = {}, breuk = 0, kleur = 0, RL = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 760 * s, h = 560 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#050709', MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  const g = (v, c) => kleur > 0.01 ? _mixHex(_hexG(v), c, kleur * 0.55) : _hexG(v);
  // lichaam: vet-rand en spieren
  ctx.beginPath(); ctx.ellipse(0, 10, 330, 230, 0, 0, 6.283); ctx.fillStyle = grijs(0.3); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 14, 296, 198, 0, 0, 6.283); ctx.fillStyle = grijs(0.42); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 18, 270, 178, 0, 0, 6.283); ctx.fillStyle = grijs(0.33); ctx.fill();
  // ruggenmerg-spieren achter
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 62, 168, 52, 40, 0, 0, 6.283); ctx.fillStyle = grijs(0.48); ctx.fill(); }
  // lever (links in beeld)
  const orgaan = (pad, v, c, key) => { ctx.beginPath(); pad(); ctx.fillStyle = g(v, c); ctx.fill(); if ((hl[key] || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl[key]); ctx.lineWidth = 6; ctx.stroke(); } };
  orgaan(() => { ctx.moveTo(-250, -40); ctx.bezierCurveTo(-240, -150, -120, -170, -30, -140); ctx.bezierCurveTo(10, -110, -10, -40, -50, 0); ctx.bezierCurveTo(-80, 60, -120, 130, -170, 140); ctx.bezierCurveTo(-240, 120, -262, 40, -250, -40); }, 0.6, '#B8645A', 'lever');
  // maag (rechts in beeld, voor) met lucht bovenin
  orgaan(() => { ctx.moveTo(20, -120); ctx.bezierCurveTo(80, -160, 190, -150, 200, -80); ctx.bezierCurveTo(205, -20, 150, 20, 90, 10); ctx.bezierCurveTo(40, 0, 10, -60, 20, -120); }, 0.45, '#D8B46A', 'maag');
  ctx.beginPath(); ctx.ellipse(115, -128, 70, 18, 0, 0, 6.283); ctx.fillStyle = '#050709'; ctx.fill();
  // milt (rechts in beeld, achter)
  orgaan(() => { ctx.moveTo(190, 10); ctx.bezierCurveTo(250, 20, 262, 100, 220, 140); ctx.bezierCurveTo(190, 160, 160, 120, 170, 70); ctx.bezierCurveTo(175, 40, 170, 15, 190, 10); }, 0.58, '#8C6AB8', 'milt');
  // wervel (wit) en aorta (rond, iets naar rechts in beeld = links van de patiënt)
  ctx.beginPath(); ctx.arc(0, 112, 46, 0, 6.283); ctx.fillStyle = grijs(0.9); ctx.fill(); ctx.beginPath(); ctx.moveTo(-20, 150); ctx.lineTo(20, 150); ctx.lineTo(10, 200); ctx.lineTo(-10, 200); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(0, 168, 13, 0, 6.283); ctx.fillStyle = grijs(0.35); ctx.fill();
  if ((hl.wervel || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl.wervel); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 112, 50, 0, 6.283); ctx.stroke(); }
  orgaan(() => { ctx.arc(26, 46, 26, 0, 6.283); }, 0.55, '#E05A4A', 'aorta');
  // holle ader naast de lever
  ctx.beginPath(); ctx.ellipse(-40, 50, 22, 16, 0, 0, 6.283); ctx.fillStyle = grijs(0.5); ctx.fill();
  // ribben rondom (witte doorsneden)
  const ribP = []; for (let k = 0; k < 14; k++) { const an = -Math.PI * 0.95 + k * (Math.PI * 1.9 / 13); if (Math.abs(an - Math.PI / 2) < 0.5 || Math.abs(an + Math.PI / 2) < 0.12) continue; const rx = Math.cos(an) * 285, ry = 12 + Math.sin(an) * 188; ribP.push([rx, ry, an]); }
  ribP.forEach(([rx, ry, an], i) => { ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -26, -8, 52, 16, 8); ctx.fillStyle = grijs(0.92); ctx.fill();
    if ((hl.rib || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl.rib); ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); });
  // breukjes in twee ribben links in beeld = rechterzij van Henk (hij viel op zijn rechterzij)
  if (breuk > 0.01) { [ribP[1], ribP[2]].forEach(([rx, ry, an]) => { ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = '#050709'; ctx.fillRect(-3, -12, 6, 24); ctx.restore(); circ(ctx, rx, ry, 34, null, rgba(C.koraal, breuk), 5); }); }
  ctx.restore();
  if (RL > 0.01) { ctx.save(); ctx.globalAlpha *= RL; text(ctx, 'R', x - w / 2 + 34, y - h / 2 + 52, fTekst(40, 800), C.goud, 'center'); text(ctx, 'L', x + w / 2 - 34, y - h / 2 + 52, fTekst(40, 800), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }
function _hexG(v) { const k = Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0'); return '#' + k + k + k; }
// kijkrichting: Henk ligt (hoofd van ons af gezien als bovenaanzicht), een oog bij zijn voeten
function oog(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, -30, 40, 0); ctx.quadraticCurveTo(0, 30, -40, 0); shape(ctx, '#F2F2EE', '#9AA3B2', 3); circ(ctx, 0, 0, 13, '#3E6A8E'); circ(ctx, 0, 0, 6, '#0B1018'); ctx.restore(); }
// gips om een pols: dikke witte koker rond de hand van een persoon
function gips(ctx, p, a = 1, r = 20) { if (a <= 0.01 || !p) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(p.x, p.y); ctx.rotate((p.ang || 0)); roundRect(ctx, -r * 3.4, -r, r * 3.8, r * 2, r * 0.8); shape(ctx, MB.gips, '#C9CED6', 2); ctx.restore(); }

// kleine thoraxfoto: zwarte longen, witte ribben en wervelkolom
function longFoto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 300 * s, h = 340 * s; roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, MB.plaat, MB.rand, 3);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(150,160,170,0.35)'; ctx.beginPath(); ctx.ellipse(0, 20, 140, 170, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#0B1018'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 62, 10, 50, 120, k * 0.08, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = 'rgba(200,205,212,0.6)'; ctx.beginPath(); ctx.ellipse(18, 70, 40, 52, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = 'rgba(235,240,245,0.85)'; ctx.lineWidth = 6; for (let i = 0; i < 7; i++) { const yy = -110 + i * 34; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 10, yy); ctx.quadraticCurveTo(k * 120, yy - 10, k * 128, yy + 30); ctx.stroke(); } }
  ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.fillRect(-9, -170, 18, 340); ctx.restore(); ctx.restore(); }
// blote huid met een klodder gel en de echokop erop
function echoOpHuid(ctx, x, y, a = 1, gel = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y + 6, 74, 22, 0, 0, 6.283); ctx.fillStyle = CAST.henk.huid; ctx.fill();
  if (gel > 0.01) { ctx.save(); ctx.globalAlpha *= gel; ctx.beginPath(); ctx.ellipse(x, y - 2, 46, 11, 0, 0, 6.283); ctx.fillStyle = rgba('#9CD6E8', 0.9); ctx.fill(); ctx.restore(); }
  echoKop(ctx, x, y - 6, 0.6, 0, 1); ctx.restore(); }
