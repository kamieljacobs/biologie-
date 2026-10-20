// Wat word jij? · Geneeskunde 2 · Als regelkringen ontsporen — eigen tekeningen (20 okt 2026)

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// scooter (zijaanzicht)
function scooter(ctx, x, y, s, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  circ(ctx, -90, 0, 34, '#2A2F3E', '#6A7080', 4); circ(ctx, 90, 0, 34, '#2A2F3E', '#6A7080', 4); ctx.beginPath(); ctx.moveTo(-120, -20); ctx.lineTo(40, -20); ctx.lineTo(70, -110); ctx.lineTo(100, -110); ctx.lineTo(90, -20); ctx.lineTo(110, -10); ctx.lineTo(-120, -10); ctx.closePath(); shape(ctx, '#5BA4C9', '#4A8BB0', 2);
  roundRect(ctx, -110, -60, 110, 26, 10); shape(ctx, '#2A2F3E', null); ctx.restore(); }

// monitor: hartslag en bloeddruk, met een ECG-lijn
function monitor(ctx, x, y, w, h, a = 1, t = 0, hr = 80, bp = '120/80', bpKleur = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0A0E14', '#6A7080', 3);
  ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); const per = 60 / hr; for (let i = 0; i <= 120; i++) { const f = i / 120, tt = t + f * 3, ph = (tt % per) / per; const v = ph < 0.05 ? -Math.sin(ph / 0.05 * Math.PI) * 50 : ph < 0.1 ? Math.sin((ph - 0.05) / 0.05 * Math.PI) * 14 : 0; const px = x + 20 + f * (w * 0.55), py = y + h * 0.5 + v; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  text(ctx, String(Math.round(hr)), x + w - 30, y + h * 0.42, fTekst(54, 800), C.groen, 'right'); metaText(ctx, 'HARTSLAG', x + w - 30, y + h * 0.42 + 28, C.grain, 'right', 18);
  text(ctx, bp, x + w - 30, y + h * 0.85, fTekst(44, 800), bpKleur, 'right'); metaText(ctx, 'BLOEDDRUK', x + w - 30, y + h * 0.85 + 26, C.grain, 'right', 18); ctx.restore(); }

// kaartje voor een regelkring
function kring(ctx, x, y, w, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const bw = Math.max(w, ctx.measureText(s2).width + 40); roundRect(ctx, x - bw / 2, y - 40, bw, 80, 14); shape(ctx, rgba(col, 0.1 + 0.2 * aan), col, 2); text(ctx, s2, x, y + 10, fTekst(28, 700), C.text, 'center'); ctx.restore(); }

// grafiek bloeddruk tegen bloedverlies: vlak tot ± 30 %, daarna steil omlaag; u = hoe ver de stip is
function drukGrafiek(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const f = v => v < 0.3 ? 0.8 - v * 0.15 : 0.755 - Math.pow((v - 0.3) / 0.2, 1.7) * 0.55; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const v = i / 100 * 0.5, px = x + (v / 0.5) * w, py = y + h - f(v) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  const v = u * 0.5; circ(ctx, x + u * w, y + h - f(v) * h, 12, C.goud); ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 0.6 * w, y); ctx.lineTo(x + 0.6 * w, y + h); ctx.stroke(); ctx.setLineDash([]);
  text(ctx, 'kantelpunt', x + 0.6 * w + 12, y + 30, fTekst(26, 700), C.goud, 'left');
  [['0', 0], ['1 l', 0.4], ['1,5 l', 0.6], ['2,5 l', 1]].forEach(([l, p]) => text(ctx, l, x + p * w, y + h + 36, fTekst(24, 600), C.text2, 'center'));
  metaText(ctx, 'BLOEDDRUK · SCHEMATISCH', x, y - 18, C.grain, 'left', 22); metaText(ctx, 'BLOEDVERLIES', x + w, y + h + 74, C.grain, 'right', 22); ctx.restore(); }

// vicieuze cirkel met vier stappen; draai = rotatie van de pijlen
function cirkel(ctx, x, y, r, a = 1, stappen = [], t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5;
  for (let i = 0; i < 4; i++) { const a0 = -Math.PI / 2 + i * Math.PI / 2 + 0.38, a1 = a0 + Math.PI / 2 - 0.76; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); const ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r, an = a1 + Math.PI / 2; ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.moveTo(ex + Math.cos(an) * 16, ey + Math.sin(an) * 16); ctx.lineTo(ex + Math.cos(an + 2.5) * 16, ey + Math.sin(an + 2.5) * 16); ctx.lineTo(ex + Math.cos(an - 2.5) * 16, ey + Math.sin(an - 2.5) * 16); ctx.fill(); }
  stappen.forEach(([s2, al], i) => { const an = -Math.PI / 2 + i * Math.PI / 2; kring(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, 200, s2, al, C.koraal, 1); }); ctx.restore(); }

// bloedvat (doorsnede in de lengte) met wijdte w0..1 en lekkende stippen
function vat(ctx, x, y, L, a = 1, wijd = 0, lek = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = 50 + 40 * wijd;
  ctx.fillStyle = rgba('#B23A3A', 0.35); ctx.fillRect(x, y - hh, L, hh * 2); ctx.strokeStyle = '#D88E7A'; ctx.lineWidth = 6; ctx.setLineDash(lek > 0.3 ? [40, 14] : []); ctx.beginPath(); ctx.moveTo(x, y - hh); ctx.lineTo(x + L, y - hh); ctx.moveTo(x, y + hh); ctx.lineTo(x + L, y + hh); ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < 10; i++) { const ph = ((t * 0.4 + i / 10) % 1); circ(ctx, x + ph * L, y + Math.sin(i * 2.3) * hh * 0.5, 12, '#C9453A'); }
  if (lek > 0.01) for (let i = 0; i < 8; i++) { const ph = ((t * 0.5 + i / 8) % 1); circ(ctx, x + 60 + i * (L - 120) / 7, y + (i % 2 ? -1 : 1) * (hh + 10 + ph * 70), 6, rgba('#7FA3C9', lek * (1 - ph))); }
  ctx.restore(); }

// bacterie (staafje) en afweercel met alarmstoffen
function staafje(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -26 * s, -11 * s, 52 * s, 22 * s, 11 * s); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); ctx.restore(); }
function afweercel(ctx, x, y, r, a = 1, t = 0, alarm = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283, rr = r * (1 + 0.06 * Math.sin(an * 5 + t * 2)); ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba('#E8E2D8', 0.25), '#E8E2D8', 2.5); circ(ctx, x, y, r * 0.38, rgba(C.paars, 0.7));
  if (alarm > 0.01) for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 + t * 0.3, d = r + ((t * 60 + i * 13) % 120); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 5, rgba(C.goud, alarm * (1 - (d - r) / 120))); } ctx.restore(); }

// orgaanicoontjes (nier, long, hoofd) die rood kleuren bij uitval
function orgaan(ctx, soort, x, y, s, a = 1, uit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const col = uit > 0.5 ? C.koraal : C.teal; ctx.lineWidth = 4;
  if (soort === 'nier') { ctx.beginPath(); ctx.moveTo(10, -60); ctx.bezierCurveTo(70, -70, 80, 60, 10, 60); ctx.bezierCurveTo(-25, 60, -18, 18, -8, 0); ctx.bezierCurveTo(-18, -18, -25, -52, 10, -60); shape(ctx, rgba(col, 0.3), col, 4); }
  if (soort === 'long') { for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 10, -50); ctx.bezierCurveTo(k * 70, -55, k * 75, 40, k * 55, 60); ctx.bezierCurveTo(k * 35, 66, k * 14, 55, k * 10, 30); ctx.closePath(); shape(ctx, rgba(col, 0.3), col, 4); } }
  if (soort === 'hoofd') { ctx.beginPath(); ctx.arc(0, -10, 50, 0, 6.283); shape(ctx, rgba(col, 0.3), col, 4); ctx.beginPath(); ctx.moveTo(-20, 40); ctx.lineTo(-20, 64); ctx.moveTo(20, 40); ctx.lineTo(20, 64); ctx.strokeStyle = col; ctx.stroke(); }
  ctx.restore(); }

// ziekenhuisbed met een liggend personage
function bed(ctx, x, y, a = 1, t = 0, id = 'bilal') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6A7080'; ctx.fillRect(x - 330, y, 660, 20); ctx.fillRect(x - 320, y + 20, 16, 120); ctx.fillRect(x + 304, y + 20, 16, 120); ctx.fillRect(x + 322, y - 90, 18, 110);
  ctx.save(); ctx.translate(x - 250, y - 10); ctx.rotate(Math.PI / 2); persoon(ctx, id, 0, 0, 480, { t, uit: 'slaapt' }); ctx.restore();
  roundRect(ctx, x - 280, y - 70, 380, 70, 18); shape(ctx, '#C9D2E0', '#AFC0D0', 2); ctx.restore(); }

// infuuspaal met zak (kleur) en lijn
function infuus(ctx, x, y, a = 1, col = '#B23A3A', lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#8A93A6'; ctx.fillRect(x - 4, y - 360, 8, 360); ctx.fillRect(x - 50, y - 360, 100, 6); roundRect(ctx, x - 40, y - 350, 60, 100, 14); shape(ctx, rgba(col, 0.6), col, 2); if (lab) text(ctx, lab, x - 10, y - 220, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
