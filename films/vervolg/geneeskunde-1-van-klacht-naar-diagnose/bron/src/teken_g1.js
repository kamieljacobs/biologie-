// Wat word jij? · Geneeskunde 1 · Van klacht naar diagnose — eigen tekeningen (20 okt 2026)

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// trap (zijaanzicht), treden van linksonder naar rechtsboven
function trapje(ctx, x, y, n, sw, sh, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); for (let i = 0; i < n; i++) { ctx.lineTo(x + i * sw, y - (i + 1) * sh); ctx.lineTo(x + (i + 1) * sw, y - (i + 1) * sh); } ctx.lineTo(x + n * sw, y); ctx.closePath(); shape(ctx, '#3A4458', C.line, 2); ctx.restore(); }

// iconen van de drie schakels
function longIcoon(ctx, x, y, s, a = 1, col = C.teal, vocht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(0, -20); ctx.moveTo(0, -20); ctx.lineTo(-22, 0); ctx.moveTo(0, -20); ctx.lineTo(22, 0); ctx.stroke();
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 14, -50); ctx.bezierCurveTo(k * 80, -60, k * 90, 40, k * 70, 70); ctx.bezierCurveTo(k * 50, 80, k * 20, 70, k * 14, 40); ctx.closePath(); shape(ctx, rgba(col, 0.25), col, 4);
    if (vocht > 0.01) { ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#5B8FD9', 0.75 * vocht); ctx.fillRect(k > 0 ? 10 : -100, 70 - 50 * vocht, 90, 60); ctx.restore(); } }
  ctx.restore(); }
function druppelIcoon(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -75); ctx.bezierCurveTo(30, -30, 60, 0, 60, 30); ctx.arc(0, 30, 60, 0, Math.PI); ctx.bezierCurveTo(-60, 0, -30, -30, 0, -75); shape(ctx, rgba(col, 0.25), col, 4);
  [[-20, 25], [18, 10], [10, 52]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(dx, dy, 15, 10, 0, 0, 6.283); shape(ctx, rgba(col, 0.7), col, 2); }); ctx.restore(); }
function hartIcoon(ctx, x, y, s, a = 1, col = C.koraal, t = 0, knijp = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const p = 1 + 0.06 * knijp * Math.max(0, Math.sin(t * 7)); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 70); ctx.bezierCurveTo(-90, 10, -80, -70, -30, -70); ctx.bezierCurveTo(-10, -70, 0, -55, 0, -40); ctx.bezierCurveTo(0, -55, 10, -70, 30, -70); ctx.bezierCurveTo(80, -70, 90, 10, 0, 70); shape(ctx, rgba(col, 0.3), col, 4);
  ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(4, 40); ctx.stroke(); ctx.restore(); }

// keten: long → bloed → hart; zwak = index van de haperende schakel (-1 = geen)
function keten(ctx, x, y, s, a = 1, zwak = -1, t = 0, namen = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = [x - 360 * s, x, x + 360 * s];
  for (let i = 0; i < 2; i++) pijl(ctx, X[i] + 110 * s, y, X[i + 1] - 110 * s, y, C.line, 1, 4, 16);
  longIcoon(ctx, X[0], y, s, 1, zwak === 0 ? C.goud : C.teal); druppelIcoon(ctx, X[1], y, s, 1, zwak === 1 ? C.goud : C.koraal); hartIcoon(ctx, X[2], y, s, 1, zwak === 2 ? C.goud : C.koraal, t, 1);
  if (namen > 0.01) ['longen: opnemen', 'bloed: vervoeren', 'hart: rondpompen'].forEach((n, i) => regel(ctx, n, X[i], y + 140 * s, namen, i === zwak ? C.goud : C.text, 30, 'center', 700));
  ctx.restore(); }

// spreekkamer: bureau met scherm
function bureau(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x - 220, y, 440, 24); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 200, y + 24, 20, 140); ctx.fillRect(x + 180, y + 24, 20, 140);
  roundRect(ctx, x - 70, y - 120, 140, 96, 8); shape(ctx, '#1A2030', '#8A93A6', 3); ctx.fillStyle = '#8A93A6'; ctx.fillRect(x - 8, y - 24, 16, 24); ctx.restore(); }

// enkel met een putje na indrukken
function enkel(ctx, x, y, s, a = 1, put = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-50, -160); ctx.lineTo(-56, 20); ctx.quadraticCurveTo(-60, 70, -20, 80); ctx.lineTo(120, 80); ctx.quadraticCurveTo(140, 60, 110, 40); ctx.lineTo(40, 20); ctx.quadraticCurveTo(46, -40, 50, -160); shape(ctx, '#E3B998', '#C69A78', 3);
  if (put > 0.01) { ctx.beginPath(); ctx.ellipse(-30, -20, 16 * put, 10 * put, 0, 0, 6.283); shape(ctx, '#C69A78', '#A87E60', 2); } ctx.restore(); }

// saturatiemeter (vingerclip met getal)
function satMeter(ctx, x, y, a = 1, waarde = '93%') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 50, 180, 100, 20); shape(ctx, '#2A3446', '#8A93A6', 3); roundRect(ctx, x - 60, y - 30, 120, 60, 8); shape(ctx, '#0E141E', null); text(ctx, waarde, x, y + 18, fTekst(42, 800), C.goud, 'center'); metaText(ctx, 'ZUURSTOF', x, y + 86, C.grain, 'center', 22); ctx.restore(); }

// lijst met mogelijke oorzaken (differentiaaldiagnose); kans 0..1 per regel; hl = gemarkeerde regel
function ddLijst(ctx, x, y, a = 1, rijen = [], hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'MOGELIJKE OORZAKEN', x, y - 20, C.grain, 'left', 24);
  rijen.forEach(([n, kans, al], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + i * 90; roundRect(ctx, x, yy, 560, 72, 12); shape(ctx, rgba(i === hl ? C.goud : C.teal, i === hl ? 0.28 : 0.12), i === hl ? C.goud : C.teal, 2); text(ctx, (i + 1) + '. ' + n, x + 24, yy + 46, fTekst(32, 700), C.text, 'left'); roundRect(ctx, x + 400, yy + 28, 130 * kans, 16, 8); shape(ctx, rgba(C.goud, 0.8), null); ctx.restore(); }); ctx.restore(); }

// bloedbuisje met dop
function buisje(ctx, x, y, a = 1, col = '#B23A3A', lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 110, 44, 160, 20); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 2.5); ctx.fillStyle = rgba(col, 0.85); roundRect(ctx, x - 18, y - 60, 36, 106, 16); ctx.fill(); roundRect(ctx, x - 26, y - 130, 52, 30, 6); shape(ctx, '#7FA3C9', null); if (lab) text(ctx, lab, x, y + 96, fTekst(26, 700), C.text, 'center'); ctx.restore(); }

// echo van het hart (vierkamerbeeld): boezems boven, kamers onder; de linkerkamer (rechts in beeld) knijpt zwak
function echoScherm(ctx, x, y, w, h, a = 1, t = 0, zwak = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0A0E14', '#6A7080', 3);
  const cx = x + w / 2, top = y + 24; ctx.save(); ctx.beginPath(); ctx.moveTo(cx, top); ctx.arc(cx, top, h - 50, Math.PI * 0.3, Math.PI * 0.7); ctx.closePath(); ctx.fillStyle = '#1A1E24'; ctx.fill(); ctx.clip();
  const k = 1 - (zwak ? 0.04 : 0.2) * Math.max(0, Math.sin(t * 6)), kr = 1 - 0.18 * Math.max(0, Math.sin(t * 6)); ctx.strokeStyle = '#C9CCD2'; ctx.fillStyle = '#05070A';
  const kamer = (px, py, rx, ry, f) => { ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(px, py, rx * f, ry * f, 0, 0, 6.283); ctx.fill(); ctx.stroke(); };
  kamer(cx - 52, y + h * 0.33, 34, 26, 1); kamer(cx + 52, y + h * 0.33, 34, 26, 1); kamer(cx - 52, y + h * 0.62, 38, 62, kr); kamer(cx + 56, y + h * 0.63, 44, 66, k); ctx.restore();
  text(ctx, 'boezems', cx, y + h * 0.33 - 44, fTekst(22, 600), C.text2, 'center'); text(ctx, 'linkerkamer', cx + 70, y + h - 16, fTekst(24, 700), C.goud, 'center'); text(ctx, 'rechterkamer', cx - 70, y + h - 16, fTekst(20, 600), C.text2, 'center'); ctx.restore(); }

// nier (boon) met druppels die terugkomen
function nierIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(10, -70); ctx.bezierCurveTo(80, -80, 90, 70, 10, 70); ctx.bezierCurveTo(-30, 70, -20, 20, -10, 0); ctx.bezierCurveTo(-20, -20, -30, -60, 10, -70); shape(ctx, rgba('#B0605A', 0.6), '#D88E7A', 3); ctx.restore(); }

// personenweegschaal met getal
function weegschaal(ctx, x, y, a = 1, s2 = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 18, 180, 26, 8); shape(ctx, '#C9CCD2', '#8A93A6', 2); if (s2) tag(ctx, s2, x, y + 70, C.goud, 1, 'center', 26); ctx.restore(); }
