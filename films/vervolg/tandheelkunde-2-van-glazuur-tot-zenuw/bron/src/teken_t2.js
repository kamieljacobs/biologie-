// Wat word jij? · Tandheelkunde 2 · Van glazuur tot zenuw — eigen tekeningen (21 okt 2026).
// De doorsnede van de kies komt uit tand_kies.js (gedeeld); hier: röntgenfoto, instrumenten, zooms en overlays.

// ---------- kleine voorwerpen (in een hand via persoon({hold})) ----------
function ijsjeHold(hap = 0) { return (ctx, x, y, an) => { ctx.save(); ctx.translate(x, y); ctx.rotate(an - Math.PI / 2 - 0.25);
  ctx.beginPath(); ctx.moveTo(-17, -6); ctx.lineTo(17, -6); ctx.lineTo(0, 62); ctx.closePath(); shape(ctx, '#D9A35A', '#A87632', 2);
  ctx.strokeStyle = rgba('#A87632', 0.8); ctx.lineWidth = 1.5; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 10 - 6, -4); ctx.lineTo(i * 10 + 10, 30); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, -22, 22, 0, 6.283); if (hap > 0.5) { ctx.save(); ctx.clip(); ctx.restore(); }
  shape(ctx, '#F4D6E0', '#E2A9BC', 2); circ(ctx, -10, -32, 5, rgba('#FFFFFF', 0.7));
  if (hap > 0.5) circ(ctx, 18, -36, 12, C.bgSchema); ctx.restore(); }; }
function spiegelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(70, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(84, 0, 15, 15, 0, 0, 6.283); shape(ctx, '#DDE6EE', '#8A939E', 3); circ(ctx, 80, -4, 4, rgba('#FFFFFF', 0.8)); ctx.restore(); }
function spuitHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -10, -11, 80, 22, 6); shape(ctx, rgba('#DDE6EE', 0.9), '#8A939E', 2); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(14, -7, 50, 14);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(118, 0); ctx.stroke(); ctx.restore(); }
function boorHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -14, -10, 96, 20, 9); shape(ctx, '#C9CED6', '#7A838E', 2); ctx.beginPath(); ctx.moveTo(82, -10); ctx.lineTo(104, -16); ctx.lineTo(104, 16); ctx.lineTo(82, 10); shape(ctx, '#B8BEC6', '#7A838E', 2);
  ctx.strokeStyle = '#E8EAEE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(104, 12); ctx.lineTo(104, 34); ctx.stroke(); ctx.restore(); }

// tandartslamp aan een arm (van boven); aan = lichtbundel
function tandLamp(ctx, x, y, a = 1, aan = 0, richting = 0.35) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#8A939E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 260, 0); ctx.lineTo(x - 260, y - 120); ctx.lineTo(x, y - 40); ctx.stroke();
  ctx.save(); ctx.translate(x, y); ctx.rotate(richting);
  if (aan > 0.01) { const g = ctx.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, rgba('#FFF4C8', 0.32 * aan)); g.addColorStop(1, rgba('#FFF4C8', 0)); ctx.beginPath(); ctx.moveTo(-50, 20); ctx.lineTo(50, 20); ctx.lineTo(170, 420); ctx.lineTo(-170, 420); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); }
  roundRect(ctx, -80, -40, 160, 60, 24); shape(ctx, '#DDE2E8', '#8A939E', 2.5); ctx.beginPath(); ctx.ellipse(0, 20, 62, 12, 0, 0, Math.PI); shape(ctx, aan > 0.3 ? '#FFF4C8' : '#B8C0C8', null); ctx.restore(); ctx.restore(); }

// tandartsstoel (zijaanzicht, rugleuning schuin)
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }

// röntgenapparaat (buis aan arm)
function rontgenBuis(ctx, x, y, a = 1, straal = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#8A939E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 200, 0); ctx.lineTo(x - 200, y - 80); ctx.lineTo(x - 40, y); ctx.stroke();
  roundRect(ctx, x - 50, y - 50, 110, 100, 18); shape(ctx, '#DDE2E8', '#8A939E', 2.5); roundRect(ctx, x + 60, y - 30, 90, 60, 6); shape(ctx, '#C9CED6', '#8A939E', 2.5);
  if (straal > 0.01) for (let i = 0; i < 4; i++) { const u = (t * 1.5 + i / 4) % 1; ctx.strokeStyle = rgba(C.teal, straal * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + 150, y, 20 + u * 120, -0.5, 0.5); ctx.stroke(); }
  ctx.restore(); }

// ---------- röntgenfoto (bitewing) ----------
// omtrek van een kies (kroon boven, wortels omlaag), halsrand op y=0; w = breedte, hc = kroonhoogte, hr = wortellengte
function _kiesPad(ctx, w, hc, hr, k = 0) { const W2 = w / 2, kr = 1 - k; ctx.beginPath();
  ctx.moveTo(-W2 * 0.8 * kr, 0); ctx.bezierCurveTo(-W2 * 1.02 * kr, -hc * 0.3, -W2 * 1.0 * kr, -hc * 0.75 * kr, -W2 * 0.72 * kr, -hc * kr);
  ctx.quadraticCurveTo(-W2 * 0.45 * kr, -hc * 1.06 * kr, -W2 * 0.22 * kr, -hc * 0.9 * kr); ctx.quadraticCurveTo(0, -hc * 0.82 * kr, W2 * 0.22 * kr, -hc * 0.9 * kr);
  ctx.quadraticCurveTo(W2 * 0.45 * kr, -hc * 1.06 * kr, W2 * 0.72 * kr, -hc * kr); ctx.bezierCurveTo(W2 * 1.0 * kr, -hc * 0.75 * kr, W2 * 1.02 * kr, -hc * 0.3, W2 * 0.8 * kr, 0);
  if (hr > 0) { ctx.bezierCurveTo(W2 * 0.78, hr * 0.5, W2 * 0.62, hr * 0.95, W2 * 0.42, hr); ctx.quadraticCurveTo(W2 * 0.28, hr * 0.98, W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(W2 * 0.18, hr * 0.3, 0, hr * 0.26);
    ctx.quadraticCurveTo(-W2 * 0.18, hr * 0.3, -W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(-W2 * 0.28, hr * 0.98, -W2 * 0.42, hr); ctx.bezierCurveTo(-W2 * 0.62, hr * 0.95, -W2 * 0.78, hr * 0.5, -W2 * 0.8, 0); }
  ctx.closePath(); }
function _xrKies(ctx, x, y, w, hc, hr, boven) { ctx.save(); ctx.translate(x, y); if (boven) ctx.scale(1, -1);
  _kiesPad(ctx, w, hc, hr, 0); ctx.fillStyle = '#A9A9A6'; ctx.fill(); // tandbeen
  ctx.save(); _kiesPad(ctx, w, hc, 0, 0); ctx.clip(); ctx.lineWidth = w * 0.11; ctx.strokeStyle = '#EDEDEA'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); // glazuur: rand van de kroon
  ctx.beginPath(); ctx.rect(-w, -hc * 1.2, w * 2, hc * 0.32); ctx.fillStyle = '#EDEDEA'; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w, -hc * 1.3, w * 2, hc * 1.25); ctx.clip(); ctx.lineWidth = w * 0.06; ctx.strokeStyle = '#E4E4E0'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); ctx.restore();
  // pulpa: kamer + twee kanalen
  ctx.fillStyle = '#4A4A4C'; ctx.beginPath(); ctx.moveTo(-w * 0.2, -hc * 0.1); ctx.quadraticCurveTo(-w * 0.22, -hc * 0.5, -w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(0, -hc * 0.4, w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(w * 0.22, -hc * 0.5, w * 0.2, -hc * 0.1);
  ctx.quadraticCurveTo(w * 0.22, hr * 0.5, w * 0.21, hr * 0.92); ctx.lineTo(w * 0.17, hr * 0.92); ctx.quadraticCurveTo(w * 0.14, hr * 0.4, w * 0.04, hr * 0.12); ctx.lineTo(-w * 0.04, hr * 0.12); ctx.quadraticCurveTo(-w * 0.14, hr * 0.4, -w * 0.17, hr * 0.92); ctx.lineTo(-w * 0.21, hr * 0.92); ctx.quadraticCurveTo(-w * 0.22, hr * 0.5, -w * 0.2, -hc * 0.1); ctx.fill();
  ctx.restore(); }
// gaatje: 0 = geen, 1 = in het glazuur, 2 = tot in het tandbeen; plek = tussen kies 1 en 2 onder (rechterkant van kies 1)
function rontgenFoto(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { gaatje = 1, donker = 1, ring = 0, licht = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 26); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); ctx.fillStyle = '#151618'; ctx.fillRect(x, y, w, h);
  ctx.filter = 'blur(2.2px)';
  // kaakbot (lichtgrijs, vlekkerig) boven en onder
  ctx.fillStyle = '#4E4F52'; ctx.fillRect(x, y, w, h * 0.3); ctx.fillRect(x, y + h * 0.7, w, h * 0.3);
  for (let i = 0; i < 140; i++) { const bx = x + hash(i * 3 + 1) * w, by = hash(i * 3 + 2) < 0.5 ? y + hash(i * 7) * h * 0.3 : y + h * 0.7 + hash(i * 7) * h * 0.3; circ(ctx, bx, by, 4 + hash(i * 11) * 10, rgba(hash(i) < 0.5 ? '#6A6B6E' : '#353638', 0.55)); }
  const cw = w * 0.27, hc = h * 0.25, hr = h * 0.3, midY = y + h * 0.5, xs = [x + w * 0.2, x + w * 0.5, x + w * 0.8];
  xs.forEach((xx, i) => { _xrKies(ctx, xx + (i - 1) * 4, midY + h * 0.02 + hc, cw, hc, hr, false); _xrKies(ctx, xx + w * 0.1 * (i === 0 ? 0.3 : 0.4), midY - h * 0.02 - hc, cw * 0.98, hc * 0.95, hr, true); });
  // gaatje tussen kies 1 en 2 onder, aan de zijkant van kies 1
  if (gaatje > 0 && donker > 0.01) { const gx = xs[0] + cw * 0.47, gy = midY + h * 0.02 + hc * 0.55; ctx.fillStyle = rgba('#0E0F10', donker); ctx.beginPath();
    if (gaatje === 1) { ctx.moveTo(gx + 8, gy - 30); ctx.lineTo(gx - 30, gy); ctx.lineTo(gx + 8, gy + 30); ctx.closePath(); }
    else { ctx.moveTo(gx + 6, gy - 34); ctx.lineTo(gx - 22, gy - 14); ctx.lineTo(gx - 58, gy + 2); ctx.lineTo(gx - 22, gy + 18); ctx.lineTo(gx + 6, gy + 34); ctx.closePath(); } ctx.fill(); }
  ctx.filter = 'none';
  if (licht > 0.01) { ctx.fillStyle = rgba('#FFFFFF', 0.08 * licht * (0.6 + 0.4 * Math.sin(t * 4))); ctx.fillRect(x, y, w, h); }
  const v = ctx.createRadialGradient(x + w / 2, y + h / 2, h * 0.3, x + w / 2, y + h / 2, w * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(x, y, w, h); ctx.restore();
  if (ring > 0.01 && gaatje > 0) { const gx = xs[0] + cw * 0.47 - (gaatje === 2 ? 16 : 6), gy = midY + h * 0.02 + hc * 0.55; ctx.save(); ctx.globalAlpha *= ring; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(gx, gy, 62 + 4 * Math.sin(t * 3), 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { gx: xs[0] + cw * 0.47, gy: midY + h * 0.02 + hc * 0.55 }; }

// ---------- zooms ----------
// glazuurkristallen: dicht opeengepakte zeskantige staafjes
function kristallen(ctx, cx, cy, r, a = 1, gat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A3446'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); const s = 26;
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const px = cx + i * s * 1.5, py = cy + j * s * 1.73 + (i % 2 ? s * 0.865 : 0); if (gat > 0 && Math.hypot(px - cx, py - cy) < r * 0.55 * gat && hash(i * 31 + j * 7) < 0.7) continue;
    ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; const xx = px + Math.cos(an) * s * 0.92, yy = py + Math.sin(an) * s * 0.92; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.closePath();
    shape(ctx, (i + j) % 3 ? '#E8EEF2' : '#D6DFE6', '#AEBAC6', 1.5); }
  ctx.restore(); }
// één kanaaltje in het tandbeen, horizontaal van x0 (glazuurkant) naar x1 (pulpa); beweeg = vochtverschuiving 0..1; zenuw = gloed van het zenuwuiteinde
function kanaaltje(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; const { t = 0, beweeg = 0, zenuw = 0, kou = 0, dood = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const L = x1 - x0;
  // tandbeen
  roundRect(ctx, x0 - 20, y - 150, L + 40, 300, 20); shape(ctx, '#E8D9A8', '#C9B680', 2);
  ctx.strokeStyle = rgba('#B8A470', 0.6); ctx.lineWidth = 2; for (const dy of [-110, -60, 60, 110]) { ctx.beginPath(); ctx.moveTo(x0, y + dy); for (let k = 0; k <= 30; k++) ctx.lineTo(x0 + L * k / 30, y + dy + Math.sin(k * 0.5 + dy) * 3); ctx.stroke(); }
  // kanaal
  ctx.beginPath(); ctx.moveTo(x0, y - 18); for (let k = 0; k <= 30; k++) ctx.lineTo(x0 + L * k / 30, y - 18 + Math.sin(k * 0.4) * 4); for (let k = 30; k >= 0; k--) ctx.lineTo(x0 + L * k / 30, y + 18 + Math.sin(k * 0.4) * 4); ctx.closePath(); shape(ctx, rgba('#9FD0E8', 0.55), '#7AAFC8', 2);
  // vochtdeeltjes, schuiven richting pulpa
  for (let i = 0; i < 16; i++) { const u0 = hash(i * 5 + 1), sh = beweeg * 0.12 * (0.7 + 0.6 * hash(i)) + 0.004 * Math.sin(t * 2 + i); const u = clamp(u0 + sh, 0, 1); circ(ctx, x0 + u * L, y + (hash(i * 9) - 0.5) * 22 + Math.sin(u * 12) * 4, 4, rgba('#F2F2EE', 0.85)); }
  // zenuwuiteinde aan de pulpakant
  ctx.strokeStyle = dood > 0.5 ? '#8A8478' : (zenuw > 0.01 ? C.goud : '#E8D27A'); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 120, y + 60); ctx.bezierCurveTo(x1 + 60, y + 40, x1 + 10, y + 10, x1 - L * 0.12, y); ctx.stroke();
  if (zenuw > 0.01) { ctx.save(); ctx.globalAlpha *= zenuw; circ(ctx, x1 - L * 0.12, y, 16 + 4 * Math.sin(t * 10), rgba(C.goud, 0.45)); ctx.restore(); }
  // kou van buiten
  if (kou > 0.01) { ctx.save(); ctx.globalAlpha *= kou; sneeuwvlok(ctx, x0 - 70, y, 34); for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = rgba('#BFE3F5', 1 - u); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x0 - 70, y, 40 + u * 50, -0.6, 0.6); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function sneeuwvlok(ctx, x, y, r, col = '#BFE3F5') { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3, cx2 = Math.cos(an), sy2 = Math.sin(an); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + cx2 * r, y + sy2 * r); ctx.stroke();
  for (const d of [-0.5, 0.5]) { ctx.beginPath(); ctx.moveTo(x + cx2 * r * 0.6, y + sy2 * r * 0.6); ctx.lineTo(x + Math.cos(an + d) * r * 0.85, y + Math.sin(an + d) * r * 0.85); ctx.stroke(); } } ctx.restore(); }
// wortelvlies: wortel (links) — spleet met vezels — kaakbot (rechts)
function vliesZoom(ctx, cx, cy, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#E8D9A8'; ctx.fillRect(cx - r, cy - r, r * 0.85, 2 * r); ctx.fillStyle = '#F2EDE0'; ctx.fillRect(cx - r * 0.15 - 14, cy - r, 14, 2 * r); // wortel met cement
  ctx.fillStyle = '#D9C9B4'; ctx.fillRect(cx + r * 0.25, cy - r, r, 2 * r); for (let i = 0; i < 40; i++) { const bx = cx + r * 0.3 + hash(i * 3) * r * 0.75, by = cy - r + hash(i * 5) * 2 * r; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 12, 6 + hash(i * 2) * 8, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#B8A68E', null); }
  ctx.fillStyle = '#EDB8B8'; ctx.fillRect(cx - r * 0.15, cy - r, r * 0.4, 2 * r);
  ctx.strokeStyle = '#B86A72'; ctx.lineWidth = 3; for (let k = 0; k < 14; k++) { const yy = cy - r + 20 + k * (2 * r - 40) / 13, sw = Math.sin(t * 1.5 + k) * 2; ctx.beginPath(); ctx.moveTo(cx - r * 0.15, yy + 14); ctx.quadraticCurveTo(cx + r * 0.05, yy + sw, cx + r * 0.25, yy - 14); ctx.stroke(); }
  ctx.restore(); }

// ---------- bacteriën ----------
function bacterie(ctx, x, y, s, an, soort = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (soort === 0) { roundRect(ctx, -14 * s, -6 * s, 28 * s, 12 * s, 6 * s); shape(ctx, '#7FB58A', '#5A8F66', 1.5); } else { circ(ctx, -5 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); circ(ctx, 6 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); }
  ctx.restore(); }

// ---------- overige ----------
function tandpastaTube(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.2);
  ctx.beginPath(); ctx.moveTo(-90, -30); ctx.lineTo(70, -24); ctx.lineTo(70, 24); ctx.lineTo(-90, 30); ctx.lineTo(-100, 0); ctx.closePath(); shape(ctx, '#F2F2EE', '#AEB6C0', 2); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fillRect(-60, -16, 90, 32);
  roundRect(ctx, 70, -16, 30, 32, 6); shape(ctx, '#2E8A9A', null); text(ctx, 'F', -15, 12, fTekst(30, 800), '#F2F2EE', 'center'); ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
function floss(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -30, 80, 60, 14); shape(ctx, '#E8EEF2', '#9AA3B2', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(30, -24); ctx.bezierCurveTo(80, -60, 120, -10, 150, -50); ctx.stroke(); ctx.restore(); }
function blauwLampje(ctx, x, y, an, a = 1, aan = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (aan > 0.01) { const g = ctx.createLinearGradient(0, 0, 160, 0); g.addColorStop(0, rgba('#6AA8FF', 0.7 * aan)); g.addColorStop(1, rgba('#6AA8FF', 0)); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(170, -60); ctx.lineTo(170, 60); ctx.lineTo(0, 14); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); }
  roundRect(ctx, -240, -18, 220, 36, 16); shape(ctx, '#3A4458', '#8A939E', 2); ctx.beginPath(); ctx.moveTo(-20, -14); ctx.lineTo(10, -22); ctx.lineTo(10, 22); ctx.lineTo(-20, 14); shape(ctx, '#C9CED6', '#8A939E', 2);
  circ(ctx, 6, 0, 10, aan > 0.3 ? '#9CC6FF' : '#5A6478'); ctx.restore(); }
function maantje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.85, 0, 6.283, true); ctx.fillStyle = '#F2E2A8'; ctx.fill('evenodd'); ctx.restore(); }
// klein stukje huid in doorsnede met een ontsteking die naar buiten kan bollen
function huidStuk(ctx, x, y, w, a = 1, zwel = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const b = 70 * zwel;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - 90, y); ctx.bezierCurveTo(x - 60, y - b, x + 60, y - b, x + 90, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + 170); ctx.lineTo(x - w / 2, y + 170); ctx.closePath(); shape(ctx, '#E8B8A0', '#C98A70', 2);
  ctx.beginPath(); ctx.moveTo(x - w / 2, y + 26); ctx.lineTo(x - 90, y + 26); ctx.bezierCurveTo(x - 60, y + 26 - b, x + 60, y + 26 - b, x + 90, y + 26); ctx.lineTo(x + w / 2, y + 26); ctx.strokeStyle = rgba('#C98A70', 0.6); ctx.lineWidth = 2; ctx.stroke();
  if (zwel > 0.01) { ctx.beginPath(); ctx.ellipse(x, y + 60 - b * 0.4, 70 + 20 * zwel, 40 + 30 * zwel, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.5 * zwel), null); }
  ctx.restore(); }
// kaartje Nederland met drie steden
function nlKaart(ctx, x, y, s, a = 1, aan = [1, 1, 1]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const P = [[-60, -190], [10, -215], [120, -205], [150, -150], [120, -60], [150, 0], [120, 60], [70, 90], [60, 190], [-10, 210], [-20, 120], [-110, 110], [-170, 60], [-120, 20], [-90, -60], [-70, -130]];
  ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); shape(ctx, rgba(C.groen, 0.18), rgba(C.groen, 0.7), 2.5);
  [['Groningen', 115, -175], ['Amsterdam', -60, -40], ['Nijmegen', 70, 40]].forEach(([n, px, py], i) => { if (aan[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= aan[i]; circ(ctx, px, py, 11, C.goud, '#121A26', 2); text(ctx, n, px + 18, py + 9, fTekst(28, 700), C.text, 'left'); ctx.restore(); });
  ctx.restore(); }
// kaartje voor de recap
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// felle steek (bliksem) bij de wang
function steek(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(24, -10); ctx.lineTo(6, -6); ctx.lineTo(30, 50); ctx.lineTo(-14, 0); ctx.lineTo(4, -4); ctx.lineTo(-16, -56); ctx.closePath(); shape(ctx, C.goud, '#FFF4C8', 2);
  ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [a1, a2] of [[-2.4, 60], [-0.6, 64], [2.6, 58]]) { ctx.beginPath(); ctx.moveTo(Math.cos(a1) * 40, Math.sin(a1) * 40); ctx.lineTo(Math.cos(a1) * a2 * 1.3, Math.sin(a1) * a2 * 1.3); ctx.stroke(); } ctx.restore(); }
// signaalpulsjes langs een pad (lijst punten); u = fase
function signaalPad(ctx, pts, a = 1, t = 0, col = C.goud, n = 3, spd = 0.7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  for (let k = 0; k < n; k++) { let u = ((t * spd + k / n) % 1) * tot; let i = 0; while (i < L.length - 1 && u > L[i]) { u -= L[i]; i++; } const f = u / L[i]; const px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f); circ(ctx, px, py, 10, rgba(col, 0.9), '#FFF4C8', 2); }
  ctx.restore(); }

// ================= kies: wrapper rond de gedeelde kies() + eigen uitbreidingen =================
// Lokale maat (s = 1): kroontop y≈-300, hals y≈-60, wortelpunten y≈+330, breedte kroon ±190. Midden (x, y) = halsrand.
const KG = { top: -300, hals: -60, punt: 330, bw: 190, kamerTop: -175, kamerBodem: -40, hoorn: 80, kanaalX: 92, glz: 34, tvlees: -30, bot: 10 };
// punt in schermcoördinaten voor labels en zooms
function kiesPunt(x, y, s, wat) { const P = { glazuur: [-150, -250], tandbeen: [-112, -120], pulpa: [0, -110], zenuw: [-92, 150], wortelvlies: [-150, 160], kaakbot: [-300, 200], gaatje1: [178, -170], gaatje2: [150, -150], wortelpunt: [-92, 330] }[wat] || [0, 0]; return { x: x + P[0] * s, y: y + P[1] * s }; }
// pad van de buitenkant van de tand (kroon + twee wortels), lokale maat
function kiesOmtrek(ctx, k = 0) { const b = KG.bw - k, tp = KG.top + k; ctx.beginPath();
  ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals);
  ctx.bezierCurveTo(b * 0.8 - k * 0.2, 80, 150 - k, 280, 118 - k * 0.6, KG.punt - k); ctx.quadraticCurveTo(92, KG.punt + 12 - k, 66 + k * 0.6, KG.punt - 10 - k); ctx.bezierCurveTo(60 + k, 200, 40 + k, 60 + k, 0, 40 + k);
  ctx.bezierCurveTo(-40 - k, 60 + k, -60 - k, 200, -66 - k * 0.6, KG.punt - 10 - k); ctx.quadraticCurveTo(-92, KG.punt + 12 - k, -118 + k * 0.6, KG.punt - k); ctx.bezierCurveTo(-150 + k, 280, -b * 0.8 + k * 0.2, 80, -b * 0.78, KG.hals); ctx.closePath(); }
function kiesKroon(ctx) { const b = KG.bw, tp = KG.top; ctx.beginPath(); ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals); ctx.quadraticCurveTo(0, -95, -b * 0.78, KG.hals); ctx.closePath(); }
// grens glazuur/tandbeen: binnenrand van de kroon (dun bij de hals)
function kiesDEJ(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.beginPath(); ctx.moveTo(-KG.bw * 0.78 + 4, KG.hals); ctx.bezierCurveTo(-b * 1.02, -110, -b * 1.0, -230, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.12, tp + 38, 0, tp + 34);
  ctx.quadraticCurveTo(b * 0.12, tp + 38, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.0, -230, b * 1.02, -110, KG.bw * 0.78 - 4, KG.hals); }
function kiesPulpaPad(ctx, k = 0) { const h = KG.hoorn - k * 0.5, tp = KG.kamerTop + k; ctx.beginPath(); ctx.moveTo(-h - 12 + k, -50); ctx.quadraticCurveTo(-h - 14 + k, tp + 30, -h + 6, tp); ctx.quadraticCurveTo(-h + 30, tp + 26, -30, tp + 44); ctx.quadraticCurveTo(0, tp + 52, 30, tp + 44); ctx.quadraticCurveTo(h - 30, tp + 26, h - 6, tp); ctx.quadraticCurveTo(h + 14 - k, tp + 30, h + 12 - k, -50);
  ctx.bezierCurveTo(h + 10 - k, 40, KG.kanaalX + 12 - k * 0.6, 200, KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(KG.kanaalX - 14 + k * 0.6, 200, 60 + k, 50, 24, KG.kamerBodem + 6);
  ctx.lineTo(-24, KG.kamerBodem + 6); ctx.bezierCurveTo(-60 - k, 50, -KG.kanaalX + 14 - k * 0.6, 200, -KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(-KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(-KG.kanaalX - 12 + k * 0.6, 200, -h - 10 + k, 40, -h - 12 + k, -50); ctx.closePath(); }
// midden van een kanaal (zenuw en bloedvat lopen erdoor): van de kamer naar de wortelpunt; kant ±1, off = zijwaartse verschuiving
function kanaalLijn(ctx, kant, off = 0) { ctx.beginPath(); ctx.moveTo(kant * 30 + off, -150); ctx.quadraticCurveTo(kant * 70 + off, -100, kant * 72 + off * 0.7, -40); ctx.bezierCurveTo(kant * 74 + off * 0.5, 60, kant * KG.kanaalX + off * 0.3, 200, kant * KG.kanaalX + off * 0.2, KG.punt - 6); }

// eigen doorsnede (tijdelijk, tot tand_kies.js er is; ook als basis voor de uitbreidingen)
function _kiesEigen(ctx, x, y, s, o = {}) { const { t = 0, hl = null, kanaal = 0, zenuwKleur = '#F2D06A', pulpaKleur = '#E89AA8', zonderPulpa = false } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const dimm = (n) => 1;
  // kaakbot (sponsachtig) met tandvlees erover
  ctx.save(); ctx.globalAlpha *= dimm('kaakbot'); ctx.beginPath(); ctx.moveTo(-390, KG.bot + 20); ctx.quadraticCurveTo(-250, KG.bot - 10, -175, KG.bot); ctx.lineTo(175, KG.bot); ctx.quadraticCurveTo(250, KG.bot - 10, 390, KG.bot + 20); ctx.lineTo(390, 370); ctx.lineTo(-390, 370); ctx.closePath(); shape(ctx, '#D9C9B4', '#B8A68E', 2);
  ctx.save(); ctx.clip(); for (let i = 0; i < 90; i++) { const bx = -380 + hash(i * 3 + 7) * 760, by = KG.bot + 20 + hash(i * 5 + 3) * 350; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 16, 6 + hash(i * 2) * 10, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#BFAC92', rgba('#A8957C', 0.7), 1); } ctx.restore(); ctx.restore();
  // wortelvlies: smalle spleet om de wortels met vezeltjes
  ctx.save(); ctx.globalAlpha *= dimm('wortelvlies'); ctx.save(); ctx.beginPath(); ctx.rect(-400, KG.bot - 6, 800, 420); ctx.clip(); kiesOmtrek(ctx, -9); shape(ctx, '#F0C4BE', null); ctx.strokeStyle = rgba('#F7E4DA', 0.95); ctx.lineWidth = 1.6;
  for (const kant of [-1, 1]) for (let k = 0; k < 13; k++) { const yy = 30 + k * 23; for (const zij of [-1, 1]) { const bx = kant * (zij < 0 ? (KG.bw * 0.76 - (yy / 330) * 70) : (40 + (yy / 330) * 26)) * 1; const sx = kant * (zij < 0 ? 1 : -1); ctx.beginPath(); ctx.moveTo(bx - sx * 4 * 0, yy); ctx.lineTo(bx + sx * 9, yy - 5); ctx.stroke(); } } ctx.restore(); ctx.restore();
  // tand: tandbeen
  ctx.save(); ctx.globalAlpha *= dimm('tandbeen'); kiesOmtrek(ctx); shape(ctx, '#EBDCA6', '#B9A56E', 2.5);
  // kanaaltjes: fijne evenwijdige lijntjes van pulpa naar buiten
  ctx.save(); kiesOmtrek(ctx); ctx.clip(); ctx.strokeStyle = rgba('#B9A06A', 0.5 + 0.4 * kanaal); ctx.lineWidth = 1.3 + kanaal;
  for (let i = 0; i < 46; i++) { const u = i / 45, an = Math.PI * (1.08 + u * 0.84); const r0 = 95, r1 = 300; const cx0 = 0, cy0 = -60; ctx.beginPath(); ctx.moveTo(cx0 + Math.cos(an) * r0, cy0 + Math.sin(an) * r0 * 0.9); ctx.quadraticCurveTo(cx0 + Math.cos(an) * (r0 + r1) * 0.5 + 10 * Math.sin(an), cy0 + Math.sin(an) * (r0 + r1) * 0.45, cx0 + Math.cos(an) * r1, cy0 + Math.sin(an) * r1); ctx.stroke(); }
  for (const kant of [-1, 1]) for (let k = 0; k < 9; k++) { const yy = 0 + k * 34; ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) + 16), yy); ctx.lineTo(kant * (KG.bw * 0.78 - yy * 0.18), yy - 18); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) - 16), yy); ctx.lineTo(kant * (44 + yy * 0.06), yy - 12); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // glazuur
  ctx.save(); ctx.globalAlpha *= dimm('glazuur'); kiesKroon(ctx); ctx.save(); ctx.clip(); ctx.beginPath(); ctx.rect(-300, -400, 600, 400); kiesDEJ(ctx); ctx.lineTo(300, -400); ctx.lineTo(-300, -400); ctx.closePath();
  const gg = ctx.createLinearGradient(-200, -320, 200, -60); gg.addColorStop(0, '#FBFDFF'); gg.addColorStop(1, '#DCE6EE'); kiesKroon(ctx); ctx.fillStyle = gg; ctx.restore();
  ctx.save(); kiesKroon(ctx); ctx.clip(); ctx.beginPath(); ctx.moveTo(-400, -400); ctx.lineTo(400, -400); ctx.lineTo(400, KG.hals); ctx.lineTo(KG.bw * 0.78 - 4, KG.hals); kiesDEJReverse(ctx); ctx.lineTo(-400, KG.hals); ctx.closePath(); ctx.fillStyle = gg; ctx.fill(); ctx.restore();
  kiesDEJ(ctx); ctx.strokeStyle = rgba('#B9A56E', 0.8); ctx.lineWidth = 2; ctx.stroke(); kiesKroon(ctx); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.85); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -245); ctx.quadraticCurveTo(-120, -280, -70, -282); ctx.stroke(); ctx.restore();
  // pulpa met bloedvat en zenuw
  if (!zonderPulpa) { ctx.save(); ctx.globalAlpha *= dimm('pulpa'); kiesPulpaPad(ctx); shape(ctx, pulpaKleur, '#C77A88', 2);
    ctx.save(); kiesPulpaPad(ctx); ctx.clip(); ctx.lineCap = 'round';
    for (const kant of [-1, 1]) { kanaalLijn(ctx, kant, -7); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 6; ctx.stroke(); kanaalLijn(ctx, kant, 7); ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 5; ctx.stroke(); }
    ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-37, -152); ctx.bezierCurveTo(-60, -190, -20, -150, 0, -140); ctx.bezierCurveTo(20, -150, 60, -190, 23, -152); ctx.stroke();
    ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 3; for (const kant of [-1, 1]) { ctx.beginPath(); ctx.moveTo(kant * 34, -150); ctx.quadraticCurveTo(kant * 70, -150, kant * 72, -170); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * 36, -150); ctx.quadraticCurveTo(kant * 50, -165, kant * 30, -178); ctx.stroke(); }
    ctx.restore(); ctx.restore(); }
  // tandvlees: roze rand over het bot tot tegen de hals
  if (hl) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.shadowColor = rgba(C.goud, 0.8); ctx.shadowBlur = 14;
    if (hl === 'glazuur') { kiesKroon(ctx); ctx.stroke(); } else if (hl === 'tandbeen') { kiesOmtrek(ctx, 4); ctx.save(); ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } else if (hl === 'pulpa') { kiesPulpaPad(ctx); ctx.stroke(); } else if (hl === 'wortel') { ctx.save(); ctx.beginPath(); ctx.rect(-300, KG.bot, 600, 400); ctx.clip(); kiesOmtrek(ctx); ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimm('tandvlees'); for (const kant of [-1, 1]) { ctx.beginPath(); ctx.moveTo(kant * 400, KG.bot + 30); ctx.quadraticCurveTo(kant * 260, KG.bot - 30, kant * (KG.bw * 0.8 + 6), KG.tvlees - 28); ctx.quadraticCurveTo(kant * (KG.bw * 0.76), KG.tvlees, kant * (KG.bw * 0.74), KG.bot + 8); ctx.quadraticCurveTo(kant * 250, KG.bot + 4, kant * 400, KG.bot + 50); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2); } ctx.restore();
  ctx.restore(); }
function kiesDEJReverse(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.bezierCurveTo(b * 1.02, -110, b * 1.0, -230, b * 0.8, tp + 30); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.12, tp + 38, 0, tp + 34); ctx.quadraticCurveTo(-b * 0.12, tp + 38, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.8, tp + 30); ctx.bezierCurveTo(-b * 1.0, -230, -b * 1.02, -110, -KG.bw * 0.78 + 4, KG.hals); }

// gaatje (lokale maat) aan de rechterzijkant van de kroon: diepte 1 = alleen glazuur, 2 = tot in het tandbeen, 3 = tot in de pulpa
function gaatjePad(ctx, diep) { const d = diep <= 1 ? 30 : diep <= 2 ? 92 : 150; ctx.beginPath(); ctx.moveTo(190, -230); ctx.quadraticCurveTo(186 - d * 0.35, -215, 180 - d * 0.7, -190 + d * 0.05); ctx.quadraticCurveTo(178 - d, -170, 180 - d * 0.7, -150); ctx.quadraticCurveTo(186 - d * 0.3, -132, 194, -120); ctx.closePath(); }
function kiesGaatje(ctx, x, y, s, diep = 1, a = 1) { if (a <= 0.01 || diep <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.save(); kiesOmtrek(ctx); ctx.clip();
  if (diep >= 2) { ctx.save(); ctx.translate(-26, 0); gaatjePad(ctx, diep); ctx.fillStyle = rgba('#B08A4A', 0.45); ctx.fill(); ctx.restore(); }
  gaatjePad(ctx, diep); shape(ctx, '#4A3A2A', '#2E2418', 2); ctx.restore(); ctx.restore(); }
// vulling (komvormig, van het kauwvlak naar de rechterzijkant): f = grootte (0.5 klein … 1.2 groot); vol 0..1 = laagjes gevuld; gat = alleen de lege holte
function vulPad(ctx, f) { const x0 = 150 - 170 * f, d = 60 + 70 * f; ctx.beginPath(); ctx.moveTo(x0, KG.top - 10); ctx.lineTo(260, KG.top - 10); ctx.lineTo(260, KG.top + d + 50 * f); ctx.quadraticCurveTo(150, KG.top + d + 40 * f, x0 + 30, KG.top + d); ctx.quadraticCurveTo(x0 - 6, KG.top + d * 0.6, x0, KG.top - 10); ctx.closePath(); }
function kiesVulling(ctx, x, y, s, f = 1, a = 1, o = {}) { if (a <= 0.01) return; const { vol = 1, blauw = 0, gat = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.save(); kiesOmtrek(ctx); ctx.clip();
  vulPad(ctx, f); ctx.fillStyle = C.bgSchema; if (gat > 0.01 || vol < 1) { ctx.save(); ctx.globalAlpha *= Math.max(gat, vol < 1 ? 1 : 0); ctx.fill(); ctx.strokeStyle = rgba('#8A6A3A', 0.9); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (vol > 0.01) { ctx.save(); vulPad(ctx, f); ctx.clip(); const d = 60 + 70 * f, H0 = KG.top + d + 50 * f, Hh = H0 - KG.top + 12; const lvl = H0 - Hh * vol; ctx.fillStyle = '#F1E6CA'; ctx.fillRect(-300, lvl, 600, H0 - lvl + 10);
    ctx.strokeStyle = rgba('#C9B88E', 0.9); ctx.lineWidth = 2; for (let k = 1; k < 4; k++) { const ly = H0 - Hh * k / 4; if (ly > lvl + 1) { ctx.beginPath(); ctx.moveTo(-300, ly); ctx.lineTo(300, ly); ctx.stroke(); } }
    if (blauw > 0.01) { ctx.fillStyle = rgba('#6AA8FF', 0.35 * blauw); ctx.fillRect(-300, lvl - 2, 600, 36); } ctx.restore(); vulPad(ctx, f); ctx.strokeStyle = rgba('#B8A67A', vol); ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ---------- kies-functies voor de scènes ----------
// basis: gedeelde kies() als die er is en past, anders de eigen doorsnede
function kiesBasis(ctx, x, y, s, o) { _kiesEigen(ctx, x, y, s, o); }
function kiesT2(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  kiesBasis(ctx, x, y, s, o); if (o.gaatje) kiesGaatje(ctx, x, y, s, o.gaatje, 1); if (o.vulling) kiesVulling(ctx, x, y, s, o.vulling, 1); ctx.restore(); }
// namen bij de onderdelen (alpha per onderdeel)
function kiesLabels(ctx, x, y, s, A) { const L = (k, n, sub, dx, dy, al) => naamBij(ctx, n, sub, x + dx * s, y + dy * s, A[k] || 0, al);
  L('glazuur', 'glazuur', 'geen zenuwen', -230, -270, 'right'); L('tandbeen', 'tandbeen', '', -232, -120, 'right'); L('pulpa', 'pulpa', '', 0, -100, 'center');
  L('bloedvat', 'bloedvaatje', '', 240, 70, 'left'); L('zenuw', 'zenuw', '', 240, 150, 'left'); L('kaakbot', 'kaakbot', '', -380, 360, 'left'); L('wortelvlies', 'wortelvlies', '', 240, 260, 'left'); L('wortel', 'wortel', '', -240, 120, 'right');
  // markeringen zonder wijslijn: stipje in het onderdeel bij de rechter namen
  const dot = (k, dx, dy, col) => { if ((A[k] || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= A[k]; circ(ctx, x + dx * s, y + dy * s, 7, col, '#121A26', 2); ctx.restore(); } };
  dot('bloedvat', 79, 60, '#C0392B'); dot('zenuw', 93, 150, '#F2D06A'); dot('wortelvlies', 128, 250, '#F0C4BE'); }
function kanaaltjeMini(ctx, x0, x1, y, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#EBDCA6'; ctx.fillRect(x0, y - 39, x1 - x0, 78); ctx.beginPath(); ctx.moveTo(x0, y - 9); for (let k = 0; k <= 20; k++) ctx.lineTo(x0 + (x1 - x0) * k / 20, y - 9 + Math.sin(k * 0.6 + y) * 3); for (let k = 20; k >= 0; k--) ctx.lineTo(x0 + (x1 - x0) * k / 20, y + 9 + Math.sin(k * 0.6 + y) * 3); ctx.closePath(); shape(ctx, rgba('#9FD0E8', 0.6), '#B9A06A', 1.5); ctx.restore(); }
// rij van drie kiezen (bovenaanzicht van opzij, in de mond): witPlek = wit plekje op het glazuur van de middelste; tussen = markering tussen twee kiezen
function kiezenRij(ctx, x, y, s, o = {}) { const { t = 0, witPlek = 0, tussen = 0 } = o; ctx.save();
  [-1, 0, 1].forEach(i => _kiesKlein(ctx, x + i * 400 * s, y, s));
  if (witPlek > 0.01) { ctx.save(); ctx.globalAlpha *= witPlek; ctx.translate(x - 400 * s, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(-70, -200, 46, 30, -0.3, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(200,210,220,0.9)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  if (tussen > 0.01) { ctx.save(); ctx.globalAlpha *= tussen; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x + 200 * s, y - 150 * s, 50 * s, 140 * s, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// kies van buiten (zonder doorsnede), met tandvlees
function _kiesKlein(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-210, KG.bot + 10); ctx.quadraticCurveTo(-150, KG.hals - 30, 0, KG.hals - 5); ctx.quadraticCurveTo(150, KG.hals - 30, 210, KG.bot + 10); ctx.lineTo(210, 120); ctx.lineTo(-210, 120); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2.5); ctx.restore(); }

// behandeling (H3): verdoving, boren, laagjes vullen en uitharden
function kiesBehandeling(ctx, x, y, s, o = {}) { const { t = 0, verdoofd = 0, blok = 0, geboord = 0, vul = 0, blauw = 0 } = o;
  kiesBasis(ctx, x, y, s, { t, zenuwKleur: verdoofd > 0.5 ? '#9AA8B8' : '#F2D06A' });
  if (geboord < 0.99 && vul <= 0) kiesGaatje(ctx, x, y, s, 2, 1 - geboord);
  if (geboord > 0.01 || vul > 0) kiesVulling(ctx, x, y, s, 0.85, 1, { vol: vul, gat: Math.min(1, geboord * 1.2), blauw: blauw * (0.6 + 0.4 * Math.sin(t * 6)) });
  // boortje dat in het gaatje werkt
  if (geboord > 0.01 && geboord < 0.99) { ctx.save(); const bx = x + (170 - 60 * geboord) * s, by = y + (KG.top - 20) * s; ctx.translate(bx, by); ctx.rotate(-0.5); roundRect(ctx, -8, -140, 16, 120, 6); shape(ctx, '#C9CED6', '#7A838E', 2); ctx.fillStyle = '#E8EAEE'; ctx.fillRect(-3, -22, 6, 26 + 3 * Math.sin(t * 40)); ctx.restore();
    for (let i = 0; i < 6; i++) { const u = (t * 2 + i / 6) % 1; circ(ctx, bx + 30 * s + u * 60, by - u * 50 + Math.sin(i * 3) * 10, 3, rgba('#E8D9A8', 1 - u)); } }
  // verdoving: blauwe wolk rond de wortelpunt, signaal stopt
  if (verdoofd > 0.01) { ctx.save(); ctx.globalAlpha *= verdoofd; const vx = x - KG.kanaalX * s, vy = y + (KG.punt + 30) * s; const g = ctx.createRadialGradient(vx, vy, 0, vx, vy, 110 * s); g.addColorStop(0, rgba(C.teal, 0.55)); g.addColorStop(1, rgba(C.teal, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(vx, vy, 110 * s, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vx - 260 * s, vy - 120 * s); ctx.lineTo(vx - 30 * s, vy - 10 * s); ctx.stroke(); ctx.restore();
    if (blok > 0.01) { const zx = x - KG.kanaalX * s, zy = y + (KG.punt + 20) * s; signaalPad(ctx, [[x - 72 * s, y - 40 * s], [x - 88 * s, y + 150 * s], [zx, zy - 50 * s]], blok * (1 - verdoofd * 0.0), t, '#9AA8B8', 2, 0.5); kruis(ctx, zx, zy + 10 * s, 22, blok, C.koraal); } }
  if (blauw > 0.01) blauwLampje(ctx, x + 330 * s, y + (KG.top - 110) * s, Math.PI * 0.78, blauw, 1); }

// ontsteking (H4): bacteriën door het gaatje tot in de pulpa, pulpa rood en gezwollen, druk op de zenuw
function kiesOntsteking(ctx, x, y, s, o = {}) { const { t = 0, bact = 0, afval = 0, ontst = 0, wijd = 0, zwel = 0, druk = 0, klop = 0, dood = 0, punt = 0 } = o;
  const pk = dood > 0.5 ? '#8A7A70' : ontst > 0.01 ? _mixHex('#E89AA8', '#D2453A', ontst * 0.8) : '#E89AA8';
  kiesBasis(ctx, x, y, s, { t, pulpaKleur: pk, zenuwKleur: dood > 0.5 ? '#8A8478' : druk > 0.3 ? '#FFD84A' : '#F2D06A' });
  kiesGaatje(ctx, x, y, s, 3, 1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // bacteriën kruipen van het gaatje naar de pulpa
  for (let i = 0; i < 14; i++) { const f = clamp(bact * 1.4 - i * 0.04, 0, 1); if (f <= 0) continue; const u = hash(i * 7 + 2) * f; const px = lerp(170, 50, u) + Math.sin(t * 2 + i) * 4 + (hash(i * 3) - 0.5) * 30, py = lerp(-175, -150, u) + (hash(i * 5) - 0.5) * 40; bacterie(ctx, px, py, 0.9, hash(i) * 6 + t * 0.3, i % 3 === 0 ? 1 : 0, 1); }
  if (afval > 0.01) for (let i = 0; i < 16; i++) { const u = (t * 0.25 + hash(i * 11)) % 1; circ(ctx, lerp(150, -20, u) + (hash(i) - 0.5) * 40, lerp(-170, -110, u) + (hash(i * 2) - 0.5) * 50, 4, rgba('#B8D46A', afval * 0.8 * (1 - u * 0.6))); }
  // zwelling: rode gloed + kloppende rand in de pulpakamer
  if (zwel > 0.01 || ontst > 0.01) { const p = 1 + (klop + druk) * 0.04 * Math.sin(t * 7); ctx.save(); kiesPulpaPad(ctx); ctx.clip(); const g = ctx.createRadialGradient(0, -110, 10, 0, -110, 140 * p); g.addColorStop(0, rgba('#FF5A4A', 0.55 * Math.max(zwel, ontst * 0.5) * (1 - dood))); g.addColorStop(1, rgba('#FF5A4A', 0)); ctx.fillStyle = g; ctx.fillRect(-200, -260, 400, 300);
    if (wijd > 0.01) { ctx.strokeStyle = rgba('#C0392B', wijd * (1 - dood)); ctx.lineWidth = 6 + 7 * wijd; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-37, -152); ctx.bezierCurveTo(-60, -190, -20, -150, 0, -140); ctx.bezierCurveTo(20, -150, 60, -190, 23, -152); ctx.stroke(); }
    ctx.restore(); }
  if (druk > 0.01) { ctx.save(); ctx.globalAlpha *= druk * (1 - dood); for (let k = 0; k < 8; k++) { const an = -Math.PI * 0.9 + k * Math.PI * 0.8 / 7; const r0 = 60 + 6 * Math.sin(t * 7); pijl(ctx, Math.cos(an) * (r0 + 40), -100 + Math.sin(an) * (r0 + 30) * 0.7, Math.cos(an) * r0 * 0.55, -100 + Math.sin(an) * r0 * 0.4, '#FFD84A', 1, 4, 12); } ctx.restore(); }
  if (punt > 0.01) { ctx.save(); ctx.globalAlpha *= punt; for (const kant of [-1, 1]) { const g = ctx.createRadialGradient(kant * KG.kanaalX, KG.punt + 20, 0, kant * KG.kanaalX, KG.punt + 20, 70); g.addColorStop(0, rgba('#D2453A', 0.7)); g.addColorStop(1, rgba('#D2453A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(kant * KG.kanaalX, KG.punt + 20, 70, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// wortelkanaalbehandeling (H4): weg = pulpa verdwijnt, schoon = vijltje, vul = kanalen gevuld (oranjeroze vulmateriaal) + vulling bovenop
function kiesWortelkanaal(ctx, x, y, s, o = {}) { const { t = 0, weg = 0, schoon = 0, vul = 0, vijl = 0 } = o;
  kiesBasis(ctx, x, y, s, { t, pulpaKleur: _mixHex('#8A7A70', '#8A7A70', 0), zenuwKleur: '#8A8478' });
  kiesGaatje(ctx, x, y, s, 3, 1 - weg);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // pulpa weghalen: holte (achtergrondkleur) groeit van boven naar beneden
  if (weg > 0.01) { ctx.save(); kiesPulpaPad(ctx); ctx.clip(); const lvl = lerp(-200, KG.punt + 10, weg); ctx.fillStyle = '#F4EEDB'; ctx.fillRect(-200, -260, 400, lvl + 260); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-40, KG.top - 10); ctx.lineTo(60, KG.top - 10); ctx.lineTo(40, -150); ctx.lineTo(-30, -150); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.globalAlpha *= weg; ctx.fill(); ctx.restore(); }
  // vijltje op en neer in een kanaal
  if (vijl > 0.01) { ctx.save(); ctx.globalAlpha *= vijl; const kant = Math.sin(t * 0.7) > 0 ? 1 : -1, d = 0.5 + 0.5 * Math.sin(t * 5); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kant * 10, KG.top - 120); ctx.quadraticCurveTo(kant * 60, -60, kant * KG.kanaalX * 0.95, lerp(120, KG.punt - 30, d)); ctx.stroke(); roundRect(ctx, kant * 10 - 16, KG.top - 170, 32, 54, 8); shape(ctx, kant > 0 ? '#E0B64A' : '#5BA4C9', null); ctx.restore(); }
  // vullen: kanalen oranjeroze van de punt omhoog, daarna vulling in de kroon
  if (vul > 0.01) { ctx.save(); kiesPulpaPad(ctx, 4); ctx.clip(); const lvl = lerp(KG.punt, -40, clamp(vul * 1.4, 0, 1)); ctx.fillStyle = '#E8946A'; ctx.fillRect(-200, lvl, 400, KG.punt - lvl + 20); ctx.restore();
    if (vul > 0.7) kiesVulling(ctx, 0, 0, 1, 1.25, clamp((vul - 0.7) / 0.3, 0, 1), {}); }
  ctx.restore(); }
