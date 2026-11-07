// Wat word jij? · Verpleegkunde 1 · Bel je de arts? — eigen tekeningen (20 okt 2026)

// kleuren voor punten 0..3 (waarschuwingsscore)
const PUNTKL = ['#7FC48F', '#E0B64A', '#E8875A', '#D8473A'];

// ziekenhuisbed in vooraanzicht (voeteneind naar de kijker), hoofdeinde opgezet; Opa Henk zit half rechtop, zichtbaar vanaf de borst.
// o: t, uit, adem (ademhalingen per minuut), o2 (neusbrilletje 0..1), meter (saturatiemeter op de vinger 0..1), spo2 (tekst op meter)
function henkInBed(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  // opgezette rugleuning en kussen
  ctx.save(); ctx.translate(x, y - 430 * s); ctx.beginPath(); ctx.moveTo(-210 * s, 210 * s); ctx.lineTo(-180 * s, -200 * s); ctx.quadraticCurveTo(0, -240 * s, 180 * s, -200 * s); ctx.lineTo(210 * s, 210 * s); ctx.closePath(); shape(ctx, '#55657F', '#7D8CA6', 2 * s);
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(-150 * s, -150 * s); ctx.quadraticCurveTo(0, -180 * s, 150 * s, -150 * s); ctx.stroke(); ctx.restore();
  roundRect(ctx, x - 165 * s, y - 640 * s, 330 * s, 190 * s, 70 * s); shape(ctx, '#E6EAEE', '#C4CCD6', 2 * s);
  // Henk (ademt: borst gaat op en neer)
  const yB = y - 330 * s, h = 560 * s, L = CAST.henk.lengte || 1, hh = h * L / 6.1, top = yB - 2.6 * hh, voet = top + h * L;
  const fr = (o.adem || 16) / 60, b = Math.sin(t * fr * 6.283);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 400 * s, 0, 800 * s, yB + 6 * s); ctx.clip();
  ctx.translate(x, yB); ctx.scale(1 + 0.012 * b, 1 + 0.022 * b); ctx.translate(-x, -yB);
  const P = persoon(ctx, 'henk', x, voet, h, { t, uit: o.uit || 'neutraal', kijk: o.kijk || 1 }); ctx.restore();
  // neusbrilletje
  if ((o.o2 || 0) > 0.01 && P.hoofd) { ctx.save(); ctx.globalAlpha *= o.o2; const { x: hx, y: hy, r } = P.hoofd; ctx.strokeStyle = '#CFE4F0'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(hx - r * 0.2, hy + r * 0.32); ctx.quadraticCurveTo(hx - r * 0.75, hy + r * 0.45, hx - r * 1.02, hy + r * 0.05); ctx.quadraticCurveTo(hx - r * 1.15, hy + r * 0.9, hx - r * 0.2, hy + r * 1.55);
    ctx.moveTo(hx + r * 0.2, hy + r * 0.32); ctx.quadraticCurveTo(hx + r * 0.75, hy + r * 0.45, hx + r * 1.02, hy + r * 0.05); ctx.quadraticCurveTo(hx + r * 1.15, hy + r * 0.9, hx + r * 0.2, hy + r * 1.55);
    ctx.moveTo(hx, hy + r * 1.55); ctx.bezierCurveTo(hx + 120 * s, hy + r * 2.2, x + 230 * s, y - 520 * s, x + 300 * s, y - 640 * s); ctx.stroke();
    // zuurstofaansluiting aan de wand
    roundRect(ctx, x + 280 * s, y - 700 * s, 50 * s, 64 * s, 8 * s); shape(ctx, '#3E8E6A', '#7FC48F', 2 * s); circ(ctx, x + 305 * s, y - 680 * s, 9 * s, '#E0F0E6'); ctx.restore(); }
  // deken
  ctx.beginPath(); ctx.moveTo(x - 255 * s, y - 150 * s); ctx.lineTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 255 * s, y - 150 * s); ctx.closePath();
  shape(ctx, '#8DB3D0', '#A9C8DE', 2 * s); ctx.fillStyle = '#E6EAEE'; ctx.beginPath(); ctx.moveTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 250 * s, yB + 44 * s); ctx.bezierCurveTo(x + 150 * s, yB + 20 * s, x - 150 * s, yB + 20 * s, x - 250 * s, yB + 44 * s); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba('#5E86A6', 0.6); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 120 * s, yB + 70 * s); ctx.quadraticCurveTo(x - 90 * s, yB + 120 * s, x - 130 * s, y - 160 * s); ctx.moveTo(x + 140 * s, yB + 80 * s); ctx.quadraticCurveTo(x + 110 * s, yB + 130 * s, x + 150 * s, y - 160 * s); ctx.stroke();
  // hand op de deken (rechts in beeld), met eventueel de saturatiemeter
  const hx = x + 120 * s, hy = yB + 70 * s; ctx.fillStyle = CAST.henk.topKleur; ctx.beginPath(); ctx.ellipse(hx - 46 * s, hy + 4 * s, 34 * s, 22 * s, -0.15, 0, 6.283); ctx.fill();
  ctx.fillStyle = CAST.henk.huid; ctx.beginPath(); ctx.ellipse(hx, hy, 32 * s, 20 * s, -0.1, 0, 6.283); ctx.fill(); roundRect(ctx, hx + 18 * s, hy - 12 * s, 40 * s, 16 * s, 8 * s); ctx.fill();
  if ((o.meter || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.meter; roundRect(ctx, hx + 26 * s, hy - 26 * s, 48 * s, 42 * s, 10 * s); shape(ctx, '#3A4A66', '#8FA0B5', 2 * s); circ(ctx, hx + 50 * s, hy - 4 * s, 9 * s, rgba('#FF4A3A', 0.35)); circ(ctx, hx + 50 * s, hy - 4 * s, 4 * s, '#FF5A4A');
    if (o.spo2) { roundRect(ctx, hx + 10 * s, hy - 82 * s, 80 * s, 46 * s, 8 * s); shape(ctx, '#121A26', '#5BA4C9', 2 * s); text(ctx, o.spo2, hx + 50 * s, hy - 48 * s, fTekst(30 * s, 800), '#7FE0A0', 'center'); } ctx.restore(); }
  // matras, voeteneind en poten
  ctx.fillStyle = '#6A7590'; ctx.fillRect(x - 265 * s, y - 160 * s, 530 * s, 22 * s);
  roundRect(ctx, x - 280 * s, y - 250 * s, 560 * s, 150 * s, 18 * s); shape(ctx, '#C9D2E0', '#8FA0B5', 2.5 * s); roundRect(ctx, x - 250 * s, y - 225 * s, 500 * s, 100 * s, 12 * s); shape(ctx, '#B4BFD0', null);
  roundRect(ctx, x - 70 * s, y - 205 * s, 140 * s, 60 * s, 6 * s); shape(ctx, '#F2F2EE', '#8FA0B5', 1.5 * s); ctx.fillStyle = '#5A6478'; for (let i = 0; i < 3; i++) ctx.fillRect(x - 52 * s, y - 192 * s + i * 16 * s, (90 - i * 24) * s, 5 * s);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 250 * s, y - 100 * s, 14 * s, 76 * s); ctx.fillRect(x + 236 * s, y - 100 * s, 14 * s, 76 * s); circ(ctx, x - 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s); circ(ctx, x + 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s);
  ctx.restore(); return Object.assign({}, P, { hand: { x: hx, y: hy } }); }

// lijstje metingen (klembord); rijen = [[naam, waarde, hl 0..1]]; titel = 'OCHTEND' / 'MIDDAG'
function meetLijst(ctx, x, y, w, titel, rijen, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 84 + rijen.length * 58;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, x + w / 2 - 60, y - 16, 120, 32, 8); shape(ctx, '#8A8E96', '#5A5E66', 2);
  metaText(ctx, titel, x + 24, y + 54, col === C.teal ? '#2E6F8F' : '#A8402F', 'left', 24);
  rijen.forEach(([n, v, hl], i) => { const yy = y + 104 + i * 58; if ((hl || 0) > 0.01) { roundRect(ctx, x + 10, yy - 38, w - 20, 52, 8); shape(ctx, rgba(C.oker, 0.35 * hl), null); }
    text(ctx, n, x + 24, yy, fTekst(28, 600), '#3A4458', 'left'); text(ctx, v, x + w - 24, yy, fTekst(30, 800), '#1A2740', 'right'); });
  ctx.restore(); }

// hart (vooraanzicht, schematisch-anatomisch); beat 0..1 = kloppen
function hartje(ctx, x, y, s, a = 1, t = 0, beat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = 1 + 0.06 * beat * Math.max(0, Math.sin(t * 9.5)); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, -50); ctx.quadraticCurveTo(-10, -110, 40, -110); ctx.quadraticCurveTo(80, -110, 80, -70); ctx.stroke();
  ctx.strokeStyle = '#4A6AB0'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(-40, -110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(-60, -110, -120, -50, -90, 10); ctx.bezierCurveTo(-70, 60, -20, 90, 10, 110); ctx.bezierCurveTo(50, 70, 100, 30, 100, -20); ctx.bezierCurveTo(100, -80, 40, -90, 0, -60); ctx.closePath(); shape(ctx, '#C8504A', '#E07A70', 3);
  ctx.strokeStyle = rgba('#7A2A2A', 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(10, -50); ctx.quadraticCurveTo(-10, 20, 12, 100); ctx.stroke(); ctx.restore(); }

// longen met luchtpijp; adem 0..1 = uitzetten
function longen(ctx, x, y, s, a = 1, adem = 0, vocht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, -40); ctx.moveTo(0, -40); ctx.lineTo(-40, -10); ctx.moveTo(0, -40); ctx.lineTo(40, -10); ctx.stroke();
  for (const sd of [-1, 1]) { const k = 1 + 0.06 * adem; ctx.save(); ctx.scale(k, k); ctx.beginPath(); ctx.moveTo(sd * 22, -70); ctx.bezierCurveTo(sd * 90, -90, sd * 120, 0, sd * 115, 90); ctx.quadraticCurveTo(sd * 70, 115, sd * 22, 90); ctx.closePath(); shape(ctx, '#E3A8B0', '#F4C8CE', 3);
    if (vocht > 0.01 && sd > 0) { ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#5BA4C9', 0.6 * vocht); ctx.fillRect(0, 30, 130, 100); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }

// thermometer met rode kolom; v 0..1
function thermometer(ctx, x, y, s, a = 1, v = 0.6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -18, -120, 36, 190, 18); shape(ctx, '#E8EEF2', '#9AA3B2', 3); circ(ctx, 0, 84, 32, '#D8473A', '#9AA3B2', 3); ctx.fillStyle = '#D8473A'; ctx.fillRect(-8, 70 - 170 * v, 16, 170 * v + 10);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(18, -100 + i * 25); ctx.lineTo(i % 2 ? 28 : 34, -100 + i * 25); ctx.stroke(); } ctx.restore(); }

// bloeddrukmeter: manchet om een bovenarm + wijzerplaat
function bloeddrukMeter(ctx, x, y, s, a = 1, v = 0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = CAST.henk.huid; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-120, -70); ctx.lineTo(-40, 90); ctx.stroke();
  ctx.save(); ctx.translate(-82, 8); ctx.rotate(-0.46); roundRect(ctx, -40, -50, 80, 100, 10); shape(ctx, '#3E5C7A', '#5B7FA8', 2); ctx.restore();
  ctx.strokeStyle = '#2A3242'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-60, 20); ctx.quadraticCurveTo(0, 60, 40, 10); ctx.stroke();
  circ(ctx, 70, -20, 56, '#F2F2EE', '#9AA3B2', 4); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const an = 2.4 + i * 0.58; ctx.beginPath(); ctx.moveTo(70 + Math.cos(an) * 42, -20 + Math.sin(an) * 42); ctx.lineTo(70 + Math.cos(an) * 50, -20 + Math.sin(an) * 50); ctx.stroke(); }
  const an = 2.4 + v * 4.6; ctx.strokeStyle = '#D8473A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(70, -20); ctx.lineTo(70 + Math.cos(an) * 40, -20 + Math.sin(an) * 40); ctx.stroke(); circ(ctx, 70, -20, 6, '#2A3242'); ctx.restore(); }

// close-up: vingertop in een saturatiemeter; licht 0..1 = rood licht schijnt door de vingertop; waarde = tekst op het schermpje
function vingerMeter(ctx, x, y, s, a = 1, licht = 0, waarde = '', t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const huid = CAST.henk.huid; const vinger = () => { ctx.beginPath(); ctx.moveTo(-520, -70); ctx.lineTo(60, -70); ctx.bezierCurveTo(130, -70, 150, -20, 150, 0); ctx.bezierCurveTo(150, 30, 130, 70, 60, 70); ctx.lineTo(-520, 70); ctx.closePath(); };
  vinger(); shape(ctx, huid, _donker(huid, 0.15), 3); ctx.strokeStyle = _donker(huid, 0.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-300, -64); ctx.quadraticCurveTo(-290, 0, -300, 64); ctx.stroke();
  // rood licht door de vingertop
  if (licht > 0.01) { ctx.save(); vinger(); ctx.clip(); const g = ctx.createRadialGradient(20, 0, 10, 20, 0, 120); g.addColorStop(0, rgba('#FF3A2A', 0.75 * licht)); g.addColorStop(1, rgba('#FF3A2A', 0)); ctx.fillStyle = g; ctx.fillRect(-120, -80, 300, 160);
    ctx.strokeStyle = rgba('#FF6A5A', 0.8 * licht); ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 40; for (const dx of [-14, 20, 54]) { ctx.beginPath(); ctx.moveTo(dx, -66); ctx.lineTo(dx, 66); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
  // nagel (bovenop, voor de vingertop)
  ctx.beginPath(); ctx.ellipse(100, -60, 44, 12, 0.08, 0, 6.283); shape(ctx, _licht(huid, 0.45), _donker(huid, 0.1), 2);
  // klem: bovenste en onderste helft, scharnier links
  ctx.fillStyle = '#3A4A66'; roundRect(ctx, -170, -170, 300, 96, 26); shape(ctx, '#3A4A66', '#8FA0B5', 3); roundRect(ctx, -170, 74, 300, 96, 26); shape(ctx, '#3A4A66', '#8FA0B5', 3);
  ctx.fillStyle = '#2A3242'; ctx.fillRect(-180, -90, 26, 180); circ(ctx, -167, 0, 18, '#5A6478');
  // lampje en lichtsensor
  circ(ctx, 20, -80, 16, licht > 0.01 ? '#FF4A3A' : '#7A3A3A', '#F2F2EE', 2); if (licht > 0.01) circ(ctx, 20, -80, 30, rgba('#FF4A3A', 0.3 * licht));
  roundRect(ctx, 0, 72, 40, 16, 4); shape(ctx, '#121A26', '#8FA0B5', 1.5);
  // schermpje bovenop
  roundRect(ctx, -140, -160, 240, 76, 12); shape(ctx, '#121A26', '#5BA4C9', 2);
  if (waarde) { text(ctx, waarde, -30, -106, fTekst(50, 800), '#7FE0A0', 'center'); }
  if (puls > 0.01) { ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const xx = 30 + i * 1.6, ph = (i / 40 + t * 1.6) % 1, yy = -122 - (ph < 0.25 ? Math.sin(ph / 0.25 * Math.PI) * 18 : 0); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  ctx.restore(); }

// rode bloedcel (schijf met indeuking), zijaanzicht licht gekanteld
function rbc(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.72, 0, 0, 6.283); shape(ctx, '#C8383A', '#E0605A', 2); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.48, r * 0.32, 0, 0, 6.283); ctx.fillStyle = '#A82A30'; ctx.fill(); ctx.restore(); }
// hemoglobinemolecuul (vier delen); vol = zuurstof erop (helder rood, met O2-paartjes) of leeg (donker)
function hbMol(ctx, x, y, r, vol, a = 1, o2 = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = vol ? '#E0403A' : '#6A3A5C', rd = vol ? '#F08070' : '#8C5A7A';
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => circ(ctx, x + dx * r * 0.45, y + dy * r * 0.45, r * 0.55, kl, rd, 1.2));
  if (vol && o2 && r > 14) [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => { circ(ctx, x + dx * r * 0.95 - 3, y + dy * r * 0.95, 4, '#BFE6F5'); circ(ctx, x + dx * r * 0.95 + 4, y + dy * r * 0.95, 4, '#BFE6F5'); });
  ctx.restore(); }

// longblaasjes in doorsnede; vocht 0..1 = deel gevuld met vocht; o2 = zuurstofpijltjes naar het bloed
function longblaasjesVocht(ctx, x, y, s, a = 1, vocht = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -230); ctx.lineTo(0, -110); ctx.moveTo(0, -120); ctx.lineTo(-90, -60); ctx.moveTo(0, -120); ctx.lineTo(90, -60); ctx.stroke();
  const B = [[-140, -10, 0], [-60, 40, 0], [-110, 100, 0], [60, 40, 1], [140, -10, 1], [110, 100, 1]];
  B.forEach(([bx, by, ziek]) => { circ(ctx, bx, by, 62, '#3A2A36', '#F4C8CE', 4); if (ziek && vocht > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(bx, by, 60, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#5BA4C9', 0.7); ctx.fillRect(bx - 62, by + 62 - 124 * vocht * 0.8, 124, 124); for (let i = 0; i < 4; i++) circ(ctx, bx - 26 + i * 18, by + 30 - (i % 2) * 14, 7, rgba('#F2F2EE', 0.7 * vocht)); ctx.restore(); }
    // haarvaatje om het blaasje
    ctx.strokeStyle = rgba('#C8383A', 0.85); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(bx, by, 72, 0.3, 2.8); ctx.stroke(); });
  // zuurstof: veel bij gezonde, weinig bij zieke blaasjes
  for (let i = 0; i < 12; i++) { const L = i < 6 ? B[i % 3] : B[3 + (i % 3)]; const ziek = i >= 6; if (ziek && i % 3 !== 0 && vocht > 0.5) continue; const ph = (t * 0.6 + i * 0.37) % 1, an = 0.6 + (i % 3) * 0.6;
    const px = L[0] + Math.cos(an) * (20 + ph * 50), py = L[1] + Math.sin(an) * (20 + ph * 50); circ(ctx, px - 4, py, 5, rgba('#BFE6F5', 1 - ph)); circ(ctx, px + 4, py, 5, rgba('#BFE6F5', 1 - ph)); }
  ctx.restore(); }

// horloge met secondewijzer
function horloge(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 0.55, y - r * 1.7, r * 1.1, r * 3.4, r * 0.3); shape(ctx, '#3A3F4E', null);
  circ(ctx, x, y, r * 1.08, '#9AA3B2'); circ(ctx, x, y, r, '#F2F2EE', '#5A6478', Math.max(2, r * 0.05)); ctx.strokeStyle = '#2A3242';
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.lineWidth = Math.max(1.5, r * (i % 3 ? 0.03 : 0.06)); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8); ctx.lineTo(x + Math.cos(an) * r * 0.92, y + Math.sin(an) * r * 0.92); ctx.stroke(); }
  ctx.lineCap = 'round'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r * 0.45, y - r * 0.2); ctx.moveTo(x, y); ctx.lineTo(x - r * 0.1, y - r * 0.65); ctx.stroke();
  const an = -Math.PI / 2 + (t % 60) / 60 * 6.283; ctx.strokeStyle = '#D8473A'; ctx.lineWidth = Math.max(1.5, r * 0.03); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.85, y + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, x, y, r * 0.06, '#D8473A'); ctx.restore(); }

// telefoon (in de hand); rot = hoek
function telefoon(ctx, x, y, s, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -16, -34, 32, 68, 7); shape(ctx, '#2A2F3E', '#9AA3B2', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-11, -26, 22, 46); ctx.restore(); }
// golfjes tussen twee bellers
function belGolf(ctx, x, y, a = 1, t = 0, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k / 3) % 1; ctx.globalAlpha = a * (1 - ph); ctx.beginPath(); ctx.arc(x, y, 20 + ph * 60, dir > 0 ? -0.6 : Math.PI - 0.6, dir > 0 ? 0.6 : Math.PI + 0.6); ctx.stroke(); } ctx.restore(); }

// waarschuwingsscore als tabel: rij = [naam, ochtendwaarde, ochtendpunten, middagwaarde, middagpunten]; uO, uM[i] = zichtbaarheid
function scoreTabel(ctx, x, y, rijen, o = {}) { const { a = 1, uO = 0, uM = [], hlM = [], totO = 0, totM = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rh = 56, X = [x, x + 330, x + 520, x + 660, x + 850], bw = 990;
  roundRect(ctx, x - 20, y - 60, bw, 60 + rijen.length * rh + 90, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5);
  metaText(ctx, 'METING', X[0], y - 16, C.text2, 'left', 22); if (uO > 0.01) { ctx.save(); ctx.globalAlpha *= uO; metaText(ctx, 'OCHTEND', X[1], y - 16, C.teal, 'left', 22); ctx.restore(); } if ((uM[0] || 0) > 0.01) metaText(ctx, 'MIDDAG', X[3], y - 16, C.koraal, 'left', 22);
  rijen.forEach(([n, vo, po, vm, pm], i) => { const yy = y + i * rh; ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 10, yy); ctx.lineTo(x + bw - 30, yy); ctx.stroke();
    const grijs = n === 'extra zuurstof'; if (grijs) { ctx.save(); ctx.globalAlpha *= 0.6; } text(ctx, n, X[0], yy + 38, fTekst(30, 600), grijs ? C.text2 : C.text, 'left');
    const cel = (v, p, xv, u, hl) => { if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; if (hl > 0.01) { roundRect(ctx, xv - 12, yy + 6, 330, rh - 12, 10); shape(ctx, rgba(C.goud, 0.18 * hl), rgba(C.goud, 0.8 * hl), 2); } text(ctx, v, xv, yy + 38, fTekst(30, 700), C.text, 'left'); roundRect(ctx, xv + 190 - 30, yy + 8, 60, rh - 16, 10); shape(ctx, rgba(PUNTKL[p], p ? 0.85 : 0.25), PUNTKL[p], 2); text(ctx, String(p), xv + 190, yy + 39, fTekst(32, 800), p ? '#1A2740' : C.text, 'center'); ctx.restore(); };
    cel(vo, po, X[1], uO, 0); cel(vm, pm, X[3], uM[i] || 0, hlM[i] || 0); if (grijs) ctx.restore(); });
  const yt = y + rijen.length * rh; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 10, yt); ctx.lineTo(x + bw - 30, yt); ctx.stroke();
  text(ctx, 'totaal', X[0], yt + 58, fTekst(32, 800), C.text, 'left');
  if (totO > 0.01) { ctx.save(); ctx.globalAlpha *= totO; circ(ctx, X[1] + 190, yt + 46, 34, rgba(C.groen, 0.3), C.groen, 3); text(ctx, '1', X[1] + 190, yt + 58, fTekst(38, 800), C.text, 'center'); ctx.restore(); }
  if (totM > 0.01) { ctx.save(); ctx.globalAlpha *= totM; const k = 1 + 0.25 * (1 - totM); circ(ctx, X[3] + 190, yt + 46, 38 * k, rgba('#D8473A', 0.55), '#D8473A', 4); text(ctx, '7', X[3] + 190, yt + 60, fTekst(44, 800), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// verticale scoremeter 0..10 met grens; waarden = [[score, kleur, label, u]]
function scoreMeter(ctx, x, y, h, a = 1, grens = 0, waarden = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = h / 10;
  roundRect(ctx, x - 30, y - h, 60, h, 14); shape(ctx, '#2A3446', C.line, 1.5); ctx.save(); roundRect(ctx, x - 30, y - h, 60, h, 14); ctx.clip(); const g = ctx.createLinearGradient(0, y, 0, y - h); g.addColorStop(0, rgba(C.groen, 0.45)); g.addColorStop(0.5, rgba(C.goud, 0.45)); g.addColorStop(1, rgba('#D8473A', 0.55)); ctx.fillStyle = g; ctx.fillRect(x - 30, y - h, 60, h); ctx.restore();
  for (let i = 0; i <= 10; i += 2) text(ctx, String(i), x - 46, y - i * st + 9, fTekst(24, 600), C.text2, 'right');
  if (grens > 0.01) { ctx.save(); ctx.globalAlpha *= grens; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(x - 60, y - 5 * st); ctx.lineTo(x + 60, y - 5 * st); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  waarden.forEach(([v, col, lab, u]) => { if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; const yy = y - v * st; ctx.beginPath(); ctx.moveTo(x + 34, yy); ctx.lineTo(x + 58, yy - 16); ctx.lineTo(x + 58, yy + 16); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); text(ctx, lab, x + 72, yy + 11, fTekst(30, 800), col, 'left'); ctx.restore(); });
  ctx.restore(); }

// SBAR-blok; aan 0..1 = licht op
function sbarBlok(ctx, x, y, w, h, letter, naam, inhoud, a = 1, aan = 0, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.06 + 0.22 * aan), rgba(col, 0.3 + 0.7 * aan), 2 + 2 * aan);
  roundRect(ctx, x + 14, y + 14, h - 28, h - 28, 12); shape(ctx, rgba(col, 0.25 + 0.65 * aan), null); text(ctx, letter, x + h / 2, y + h / 2 + 22, fTitel(62), aan > 0.5 ? '#1A2740' : C.text, 'center');
  text(ctx, naam, x + h + 10, y + 46, fTekst(34, 800), C.text, 'left'); if (inhoud) { ctx.save(); ctx.globalAlpha *= clamp(aan * 1.5, 0, 1); text(ctx, inhoud, x + h + 10, y + 88, fTekst(28, 500), C.text2, 'left'); ctx.restore(); } ctx.restore(); }

// lichtbak met longfoto (rechterlong deels wit: ontsteking)
function longfoto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -170, -140, 340, 280, 14); shape(ctx, '#C9D2E0', '#8FA0B5', 3); roundRect(ctx, -150, -120, 300, 240, 8); shape(ctx, '#0D1420', null);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 62, 0, 52, 92, sd * 0.08, 0, 6.283); ctx.fillStyle = '#26324A'; ctx.fill(); }
  ctx.strokeStyle = rgba('#DDE6F0', 0.55); ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(0, -60 + i * 34, 128, 26, 0, 0.15, Math.PI - 0.15); ctx.stroke(); }
  ctx.fillStyle = rgba('#DDE6F0', 0.85); ctx.fillRect(-6, -110, 12, 220); const g = ctx.createRadialGradient(-62, 50, 4, -62, 50, 50); g.addColorStop(0, rgba('#F2F2EE', 0.8)); g.addColorStop(1, rgba('#F2F2EE', 0)); ctx.fillStyle = g; ctx.fillRect(-130, -10, 130, 120); ctx.restore(); }
// infuuszak aan een standaard
function infuus(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -420); ctx.moveTo(-50, -420); ctx.lineTo(50, -420); ctx.stroke();
  roundRect(ctx, -46, -400, 92, 140, 18); shape(ctx, rgba('#E8F2F8', 0.85), '#AFC0D0', 2); ctx.fillStyle = rgba(C.goud, 0.4); ctx.fillRect(-40, -330, 80, 64); text(ctx, 'AB', 0, -350, fTekst(24, 800), '#2E3A55', 'center');
  ctx.strokeStyle = '#CFE4F0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -220); ctx.quadraticCurveTo(0, -150, -90, -120); ctx.stroke(); roundRect(ctx, -8, -240, 16, 30, 4); shape(ctx, rgba('#F2F2EE', 0.4), '#AFC0D0', 1.5);
  const ph = (t * 1.2) % 1; circ(ctx, 0, -236 + ph * 20, 3, '#E0B64A'); ctx.restore(); }
// klein grafiekje: score per dag
function scoreDagen(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const V = [7, 6, 4, 2, 1]; assen(ctx, x, y, w, h, 'DAGEN', 'SCORE');
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = (V.length - 1) * clamp(u, 0, 1);
  for (let i = 0; i <= Math.floor(n); i++) { const xx = x + 30 + i * (w - 60) / (V.length - 1), yy = y + h - V[i] / 8 * h; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  if (n % 1 > 0) { const i = Math.floor(n), f = n % 1; ctx.lineTo(x + 30 + (i + f) * (w - 60) / (V.length - 1), y + h - lerp(V[i], V[i + 1], f) / 8 * h); } ctx.stroke();
  for (let i = 0; i <= Math.floor(n + 0.001); i++) { const xx = x + 30 + i * (w - 60) / (V.length - 1), yy = y + h - V[i] / 8 * h; circ(ctx, xx, yy, 8, PUNTKL[V[i] >= 7 ? 3 : V[i] >= 5 ? 2 : V[i] >= 2 ? 1 : 0]); }
  ctx.restore(); }
// losse saturatiemeter (klemmetje met schermpje), voor rijtjes apparaten
function saturatieKastje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -60, 140, 56, 18); shape(ctx, '#3A4A66', '#8FA0B5', 3); roundRect(ctx, -70, 6, 140, 56, 18); shape(ctx, '#3A4A66', '#8FA0B5', 3); ctx.fillStyle = '#2A3242'; ctx.fillRect(-78, -20, 18, 40);
  roundRect(ctx, -50, -52, 100, 40, 8); shape(ctx, '#121A26', '#5BA4C9', 2); text(ctx, '93%', 0, -22, fTekst(28, 800), '#7FE0A0', 'center'); circ(ctx, 30, 0, 8, '#FF4A3A'); ctx.restore(); }
