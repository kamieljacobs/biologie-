// Wat word jij? · Leraar biologie 2 · Een practicum dat werkt — eigen tekeningen (20 okt 2026)

// fles met gist en suiker, ballon erop; op 0..1 = hoe ver de ballon is opgezwollen; lek = scheurtje met ontsnappend gas
function gistFles(ctx, x, y, s, a = 1, op = 0, t = 0, lek = 0, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // ballon (achter de hals)
  const r = 26 + 64 * clamp(op, 0, 1), by = -150 - r * 0.8; ctx.beginPath(); ctx.ellipse(0, by, r * 0.85, r, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.85), '#F0A08A', 2.5); ctx.fillStyle = '#C9654B'; ctx.fillRect(-14, -160, 28, 22);
  if (lek > 0.01) { ctx.save(); ctx.globalAlpha *= lek; ctx.strokeStyle = '#E8E2D8'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; ctx.globalAlpha = lek * (1 - ph); ctx.beginPath(); ctx.arc(r * 0.8 + 20 + ph * 70, by - 10, 8 + ph * 16, -0.8, 0.8); ctx.stroke(); } ctx.restore(); }
  // fles
  ctx.beginPath(); ctx.moveTo(-16, -140); ctx.lineTo(-16, -90); ctx.quadraticCurveTo(-70, -70, -70, -20); ctx.lineTo(-70, 90); ctx.quadraticCurveTo(-70, 110, -50, 110); ctx.lineTo(50, 110); ctx.quadraticCurveTo(70, 110, 70, 90); ctx.lineTo(70, -20); ctx.quadraticCurveTo(70, -70, 16, -90); ctx.lineTo(16, -140); ctx.closePath(); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#D9B77A', 0.75); ctx.fillRect(-70, 10, 140, 100); for (let i = 0; i < 6; i++) { const ph = (t * 0.8 + i / 6) % 1; circ(ctx, -40 + i * 16, 100 - ph * 90, 4, rgba('#FFF4D8', 0.7 * clamp(op * 3, 0, 1))); } ctx.restore();
  if (lab) text(ctx, lab, 0, 160, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// waterbad met thermometergetal
function waterbad(ctx, x, y, w, a = 1, graden = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 70, w, 120, 12); shape(ctx, rgba(C.water, 0.35), '#7FA3C9', 2.5); if (graden) text(ctx, graden, x, y + 92, fTekst(34, 800), C.goud, 'center'); ctx.restore(); }

// werkblad met n stappen; hl = hoeveel stappen al afgevinkt
function werkblad(ctx, x, y, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 300, 420, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'Werkblad gist', x + 24, y + 46, fTekst(28, 800), '#1A2740', 'left');
  for (let i = 0; i < 10; i++) { const yy = y + 86 + i * 32; text(ctx, (i + 1) + '.', x + 24, yy, fTekst(22, 700), '#5A6478', 'left'); ctx.fillStyle = '#B8B0A0'; ctx.fillRect(x + 60, yy - 10, 150 + (i * 37) % 70, 6); if (i < hl) vink_(ctx, x + 268, yy - 8, 10, 1); } ctx.restore(); }

// trap met vier treden (niveaus van onderzoekend leren); aan[i] = zichtbaarheid; hl = actieve trede
function trap(ctx, x, y, a = 1, aan = [1, 1, 1, 1], hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = ['bevestigen', 'gestructureerd', 'begeleid', 'open'], D = ['uitkomst al bekend', 'vraag en werkwijze gegeven', 'alleen de vraag gegeven', 'ook de vraag zelf'];
  N.forEach((n, i) => { if (aan[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= aan[i]; const bx = x + i * 270, by = y - i * 110; roundRect(ctx, bx, by, 260, 100 + i * 110, 8); shape(ctx, rgba(i === hl ? C.goud : C.teal, i === hl ? 0.35 : 0.16), i === hl ? C.goud : C.teal, 2); text(ctx, n, bx + 130, by + 44, fTekst(30, 800), C.text, 'center'); text(ctx, D[i], bx + 130, by + 80, fTekst(21, 600), C.text2, 'center'); ctx.restore(); });
  ctx.restore(); }

// verslag: soort 'A' = mooie grafiek, geen uitleg; 'B' = lekke ballon, veel uitleg
function verslag(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 360, 460, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'Groep ' + soort, x + 24, y + 48, fTekst(32, 800), '#1A2740', 'left');
  if (soort === 'A') { ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40, y + 90); ctx.lineTo(x + 40, y + 330); ctx.lineTo(x + 320, y + 330); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); [[0, 0], [1, 0.25], [2, 0.55], [3, 0.8], [4, 0.95]].forEach(([i, v], k) => { const px = x + 60 + i * 60, py = y + 320 - v * 210; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); [[0, 0], [1, 0.25], [2, 0.55], [3, 0.8], [4, 0.95]].forEach(([i, v]) => circ(ctx, x + 60 + i * 60, y + 320 - v * 210, 7, C.teal)); }
  else { gistFles(ctx, x + 90, y + 230, 0.6, 1, 0.15, 0, 1); for (let i = 0; i < 8; i++) { ctx.fillStyle = '#9A9282'; ctx.fillRect(x + 170, y + 100 + i * 34, 150 - (i * 23) % 50, 7); } for (let i = 0; i < 3; i++) { ctx.fillStyle = '#9A9282'; ctx.fillRect(x + 30, y + 380 + i * 24, 300 - i * 40, 7); } }
  ctx.restore(); }

// dienblad met klaargezette flessen (werk van de toa)
function dienblad(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 300, y, 600, 40, 10); shape(ctx, '#8A6A4E', '#6B5440', 2);
  for (let i = 0; i < 4; i++) gistFles(ctx, x - 210 + i * 140, y - 62, 0.55, 1, 0, t); text(ctx, 'klaargezet', x, y + 90, fTekst(28, 700), C.text2, 'center'); ctx.restore(); }
