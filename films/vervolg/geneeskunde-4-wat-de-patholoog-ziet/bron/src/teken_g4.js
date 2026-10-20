// Wat word jij? · Geneeskunde 4 · Wat de patholoog ziet — eigen tekeningen (20 okt 2026)

// kleur mengen (hex → hex, f 0..1)
function mixC(a, b, f) { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); const c = s => Math.round(((p >> s) & 255) * (1 - f) + ((q >> s) & 255) * f); return `rgb(${c(16)},${c(8)},${c(0)})`; }
// HE-kleuren: kernen blauwpaars (hematoxyline), de rest roze (eosine); ongekleurd = bijna doorzichtig
const HE = { glas: '#F3EEF1', grijs: '#E4E0E5', grijsR: '#D6D1D8', roze: '#EDB0C6', rozeR: '#D98AA8', rozeL: '#F6CFDC', vezel: '#E096B2', hoorn: '#E58FB0', paars: '#55398C', paarsD: '#3B2470', pigment: '#8A5A3A', bloed: '#C8324A' };

// vrije vorm rond een punt (moedervlek, kern): straal varieert met grillig 0..1
function grilVorm(ctx, x, y, r, gr, seed = 0) { ctx.beginPath(); for (let k = 0; k <= 48; k++) { const an = k / 48 * 6.283; const rr = r * (1 + gr * (0.2 * Math.sin(3 * an + seed) + 0.12 * Math.sin(7 * an + seed * 2.3) + 0.06 * Math.sin(11 * an + seed))); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.9; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }

// moedervlek: u 0 = vroeger (klein, rond, één kleur) → 1 = nu (groter, grillige rand, twee kleuren)
function moedervlek(ctx, x, y, r, u = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = r * (1 + 0.8 * u);
  grilVorm(ctx, x, y, R, u, 1.3); shape(ctx, mixC('#7A4A2E', '#8E5A36', u), mixC('#6A3E26', '#5A3420', u), 2);
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; grilVorm(ctx, x + R * 0.22, y + R * 0.08, R * 0.52, 0.8, 4.1); shape(ctx, '#2E1C14', null); ctx.restore(); }
  ctx.restore(); }

// close-up van een onderarm met moedervlek (paneel); u = verandering
function armPaneel(ctx, x, y, w, h, a = 1, u = 0, titel = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.55), C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  const ay = y + h * 0.55; ctx.beginPath(); ctx.moveTo(x - 10, ay - h * 0.3); ctx.quadraticCurveTo(x + w * 0.5, ay - h * 0.36, x + w + 10, ay - h * 0.24); ctx.lineTo(x + w + 10, ay + h * 0.26); ctx.quadraticCurveTo(x + w * 0.5, ay + h * 0.34, x - 10, ay + h * 0.3); ctx.closePath(); shape(ctx, '#C8956E', '#A87650', 2);
  ctx.beginPath(); ctx.moveTo(x - 10, ay + h * 0.12); ctx.quadraticCurveTo(x + w * 0.5, ay + h * 0.2, x + w + 10, ay + h * 0.12); ctx.strokeStyle = rgba('#A87650', 0.5); ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#3E8E7E'; ctx.beginPath(); ctx.moveTo(x - 10, ay - h * 0.36); ctx.lineTo(x + w * 0.14, ay - h * 0.36); ctx.quadraticCurveTo(x + w * 0.18, ay, x + w * 0.14, ay + h * 0.36); ctx.lineTo(x - 10, ay + h * 0.36); ctx.closePath(); ctx.fill();
  moedervlek(ctx, x + w * 0.56, ay - h * 0.04, h * 0.075, u); ctx.restore();
  if (titel) metaText(ctx, titel, x + 24, y + 42, C.grain, 'left', 24); ctx.restore(); }

// potje met formaline en een stukje huid
function potje(ctx, x, y, s = 1, a = 1, t = 0, stukje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -110, 140, 190, 22); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); roundRect(ctx, -70, -110, 140, 190, 22); ctx.clip(); ctx.fillStyle = rgba('#DDEFF0', 0.22); ctx.fillRect(-70, -70 + Math.sin(t * 1.5) * 2, 140, 160); ctx.restore();
  roundRect(ctx, -78, -140, 156, 38, 10); shape(ctx, '#F2F2EE', '#C9CED6', 2);
  roundRect(ctx, -52, -30, 104, 54, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.fillStyle = '#5A6478'; ctx.fillRect(-38, -16, 76, 5); ctx.fillRect(-38, -2, 54, 5);
  if (stukje > 0.01) { ctx.save(); ctx.globalAlpha *= stukje; const dy = 44 + Math.sin(t * 1.2) * 4; ctx.beginPath(); ctx.ellipse(0, dy, 34, 12, 0.08, 0, 6.283); shape(ctx, '#D9A78C', '#B5806A', 2); ctx.fillStyle = '#E8C2AE'; ctx.beginPath(); ctx.ellipse(0, dy - 4, 30, 6, 0.08, 0, 6.283); ctx.fill(); grilVorm(ctx, 2, dy - 4, 7, 0.8, 2); shape(ctx, '#5A3420', null); ctx.restore(); }
  ctx.restore(); }

// cassette met paraffineblokje en het weefsel erin
function paraffineBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -100, -20, 200, 90, 8); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.fillStyle = rgba('#1A2740', 0.35); for (let i = 0; i < 7; i++) ctx.fillRect(-84 + i * 24, 6, 12, 50);
  ctx.beginPath(); ctx.moveTo(-80, -20); ctx.lineTo(-70, -110); ctx.lineTo(70, -110); ctx.lineTo(80, -20); ctx.closePath(); shape(ctx, '#EFE6CC', '#CDBF98', 2.5);
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(-60, -100, 20, 70);
  ctx.beginPath(); ctx.ellipse(4, -64, 40, 14, 0, 0, 6.283); shape(ctx, '#D9A08C', '#B5806A', 1.5); grilVorm(ctx, 8, -66, 6, 0.8, 2); shape(ctx, '#5A3420', null);
  ctx.restore(); }

// snijmachine (microtoom): blok gaat op en neer langs het mes, lint van plakjes groeit (u)
function microtoom(ctx, x, y, s = 1, a = 1, t = 0, u = 0, draai = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -20, 340, 40, 10); shape(ctx, '#D8DEE6', '#8FA0B5', 2);
  roundRect(ctx, -40, -200, 170, 180, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2);
  const fase = draai ? (t * 1.4) % 1 : 0, by = -150 + Math.sin(fase * 6.283) * 26;
  roundRect(ctx, -20, by - 30, 50, 60, 6); shape(ctx, '#EFE6CC', '#CDBF98', 2); ctx.fillStyle = '#D9A08C'; ctx.fillRect(-20, by - 10, 10, 20);
  ctx.beginPath(); ctx.moveTo(-26, -136); ctx.lineTo(-90, -122); ctx.lineTo(-90, -108); ctx.lineTo(-26, -112); ctx.closePath(); shape(ctx, '#EEF2F6', '#7A8BA8', 2);
  ctx.save(); ctx.translate(150, -110); circ(ctx, 0, 0, 56, null, '#8FA0B5', 6); const an = fase * 6.283; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56); ctx.stroke(); circ(ctx, Math.cos(an) * 56, Math.sin(an) * 56, 9, '#2A3446'); ctx.restore();
  if (u > 0.01) { const n = Math.round(u * 6); for (let i = 0; i < n; i++) { const sx = -100 - i * 40, sy = -112 + i * 3; ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.05); roundRect(ctx, -18, -4, 36, 22, 3); shape(ctx, rgba('#F4EEDC', 0.85), '#CDBF98', 1.2); ctx.fillStyle = rgba('#D9A08C', 0.8); ctx.fillRect(-12, 2, 10, 10); ctx.restore(); } }
  ctx.restore(); }

// glaasje met coupe; k 0 = ongekleurd (bijna doorzichtig) → 1 = HE (roze met blauwpaarse rand)
function glaasje(ctx, x, y, s = 1, a = 1, k = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -45, 300, 90, 6); shape(ctx, rgba('#DCEBF4', 0.28), '#AFC0D0', 2.5); ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(-146, -41, 70, 82);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-136, -20, 50, 5); ctx.fillRect(-136, -6, 40, 5);
  ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); shape(ctx, mixC('#E4E0E5', HE.roze, k), rgba('#B9B4BC', 0.6 * (1 - k)), 1.5); ctx.globalAlpha *= 0.25 + 0.75 * k;
  if (k > 0.01) { ctx.save(); ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); ctx.clip(); ctx.strokeStyle = mixC('#E4E0E5', HE.paars, k); ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(40, 6, 70, 26, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// kleurbak met vloeistof
function kleurBak(ctx, x, y, s = 1, a = 1, col = HE.paars, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-100, -60); for (let i = 0; i <= 20; i++) ctx.lineTo(-100 + i * 10, -60 + Math.sin(t * 2 + i * 0.6) * 3); ctx.lineTo(100, 70); ctx.lineTo(-100, 70); ctx.closePath(); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); ctx.stroke();
  ctx.restore(); }

// microscoop met twee oculairen; kant = -1: oculairen naar links (gebruiker links)
function labMicroscoop(ctx, x, y, s = 1, a = 1, kant = -1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * -kant, s);
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446';
  roundRect(ctx, -110, -34, 220, 34, 10); shape(ctx, body, rand, 2.5); if (licht > 0.01) circ(ctx, -20, -40, 14, rgba('#FFF4C8', 0.9 * licht));
  ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(70, -34); ctx.lineTo(70, -250); ctx.quadraticCurveTo(70, -300, 20, -300); ctx.lineTo(-10, -300); ctx.lineTo(-10, -262); ctx.lineTo(30, -262); ctx.lineTo(40, -250); ctx.closePath(); shape(ctx, body, rand, 2.5);
  roundRect(ctx, -100, -128, 160, 14, 4); shape(ctx, donker, rand, 2); roundRect(ctx, -40, -116, 30, 16, 3); shape(ctx, body, rand, 1.5);
  roundRect(ctx, -66, -134, 80, 6, 2); shape(ctx, rgba('#DCEBF4', 0.8), null);
  ctx.fillStyle = '#5A6478'; [-44, -22].forEach((ox, i) => { roundRect(ctx, ox - 8, -230, 16, 46 + i * 12, 4); ctx.fill(); });
  roundRect(ctx, -60, -262, 100, 40, 10); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(-40, -262); ctx.rotate(-0.6); roundRect(ctx, -14, -80, 28, 80, 6); shape(ctx, donker, rand, 2); roundRect(ctx, 16, -76, 26, 76, 6); shape(ctx, donker, rand, 2); ctx.restore();
  circ(ctx, 56, -90, 18, body, rand, 2.5); circ(ctx, 56, -90, 8, rand);
  ctx.restore(); }

// labtafel
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// schematische doorsnede van de huid (H1). o: hl ('dek'|'bind'|'spier'|'zenuw'|'pig'), nest 0..1 (moedervlek), mel 0..1 (melanoom), kap 0..1 (pigment boven de kernen)
function huidSchema(ctx, x, y, w, h, t, o = {}) { const { a = 1, hl = null, nest = 0, mel = 0, kap = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const yS = y + 34;
  const eB = xx => y + h * 0.34 + Math.sin((xx - x) / w * Math.PI * 5) * h * 0.04;
  const nx = x + w * 0.42; // plek van de moedervlek
  ctx.save(); roundRect(ctx, x, yS - 20, w, h - (yS - 20 - y), 26); ctx.clip();
  // lederhuid
  ctx.fillStyle = '#5E4550'; ctx.fillRect(x, yS - 20, w, h);
  ctx.strokeStyle = rgba('#9A7480', 0.7); ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < 14; i++) { const yy = y + h * 0.45 + i * h * 0.04; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = x + k * w / 30; const py = yy + Math.sin(k * 0.9 + i * 1.7) * 8; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // bloedvat (lusje naar boven)
  const vx = x + w * 0.54; ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(vx - 30, y + h + 10); ctx.lineTo(vx - 30, eB(vx) + 50); ctx.arc(vx, eB(vx) + 50, 30, Math.PI, 0); ctx.lineTo(vx + 30, y + h + 10); ctx.stroke();
  // haar met haarspiertje
  const hx0 = x + w * 0.84, hy0 = y + h * 0.88, hx1 = x + w * 0.76, hy1 = yS;
  ctx.beginPath(); ctx.ellipse(hx0 - 4, hy0 - 40, 26, 64, 0.38, 0, 6.283); shape(ctx, '#B88A76', '#8A6050', 2);
  const mx0 = x + w * 0.815, my0 = y + h * 0.62, mx1 = x + w * 0.9, my1 = eB(x + w * 0.9) + 6;
  ctx.strokeStyle = '#C05A5E'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(mx0, my0); ctx.quadraticCurveTo((mx0 + mx1) / 2 + 20, (my0 + my1) / 2 + 10, mx1, my1); ctx.stroke();
  ctx.strokeStyle = rgba('#F0B8A6', 0.6); ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const f = i / 5, px = mx0 + (mx1 - mx0) * f + 8, py = my0 + (my1 - my0) * f + 6; ctx.beginPath(); ctx.ellipse(px, py, 7, 2.5, -0.9, 0, 6.283); ctx.stroke(); }
  // zenuw met vertakte uiteinden
  const zx = x + w * 0.14; ctx.strokeStyle = '#E8C35A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(zx - 20, y + h + 10); ctx.bezierCurveTo(zx + 30, y + h * 0.75, zx - 20, y + h * 0.6, zx + 6, eB(zx) + 50); ctx.stroke();
  ctx.lineWidth = 3; [[-30, -30], [0, -40], [30, -28]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(zx + 6, eB(zx) + 50); ctx.quadraticCurveTo(zx + 6 + dx * 0.4, eB(zx) + 50 + dy * 0.6, zx + 6 + dx, eB(zx) + 50 + dy + 12); ctx.stroke(); circ(ctx, zx + 6 + dx, eB(zx) + 50 + dy + 12, 5, '#E8C35A'); });
  // opperhuid (dekweefsel): ronde cellen
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yS); for (let k = 0; k <= 60; k++) { const xx = x + k * w / 60; ctx.lineTo(xx, k ? yS : yS); } ctx.lineTo(x + w, eB(x + w)); for (let k = 60; k >= 0; k--) { const xx = x + k * w / 60; ctx.lineTo(xx, eB(xx)); } ctx.closePath(); ctx.fillStyle = '#B98A76'; ctx.fill(); ctx.clip();
  for (let r = 0; r < 12; r++) { const yy = yS + 22 + r * 25; for (let xx = x + 12 + (r % 2) * 13; xx < x + w; xx += 26) { if (yy > eB(xx) - 8) continue; circ(ctx, xx, yy, 11.5, '#D9AE96', '#B88870', 1.5); circ(ctx, xx, yy, 4, '#8A5A48'); if (kap > 0.01) { ctx.save(); ctx.globalAlpha *= kap; ctx.fillStyle = '#5A3420'; ctx.beginPath(); ctx.arc(xx, yy - 1, 5.5, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); ctx.restore(); } } }
  ctx.restore();
  // hoornlaag
  ctx.fillStyle = '#E8D2B0'; ctx.fillRect(x, yS - 20, w, 22); ctx.strokeStyle = rgba('#C9B08A', 0.8); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x, yS - 14 + i * 6); ctx.lineTo(x + w, yS - 14 + i * 6); ctx.stroke(); }
  // pigmentcellen onderin de opperhuid
  const pigs = []; for (let xx = x + 50; xx < x + w - 20; xx += 92) { const py = eB(xx) - 12; pigs.push([xx, py]); ctx.strokeStyle = '#4A2A18'; ctx.lineWidth = 3; [[-16, -18], [4, -24], [18, -14]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(xx, py); ctx.lineTo(xx + dx, py + dy); ctx.stroke(); }); circ(ctx, xx, py, 11, '#6A3E26', '#3A2014', 2); circ(ctx, xx, py, 4, '#2A1810'); }
  // moedervlek: groepje pigmentcellen
  if (nest > 0.01) { const N = [[0, 0], [-22, -4], [22, -4], [-11, -22], [11, -22], [-33, 14], [33, 14], [0, 18], [-14, 32], [14, 32]]; const n = Math.round(nest * N.length); for (let i = 0; i < n; i++) { const px = nx + N[i][0], py = eB(nx) - 12 + N[i][1]; circ(ctx, px, py, 11, '#6A3E26', '#3A2014', 2); circ(ctx, px, py, 4, '#2A1810'); } }
  // melanoom: cellen delen ongeremd, omhoog en de diepte in
  if (mel > 0.01) { const n = Math.round(mel * 46); for (let i = 0; i < n; i++) { const up = i % 5 === 0; const ang = hash(i * 7 + 1) * 6.283, d = 20 + hash(i * 7 + 2) * (up ? 70 : 120); const px = nx + Math.cos(ang) * d * (up ? 1.4 : 1.1), py = up ? eB(nx) - 30 - hash(i * 3 + 5) * (eB(nx) - yS - 40) : eB(nx) + Math.abs(Math.sin(ang)) * d * 1.0; const r = 9 + hash(i * 5 + 3) * 6, puls = 1 + 0.08 * Math.sin(t * 4 + i); circ(ctx, px, py, r * puls, '#3A1E14', C.koraal, 2); circ(ctx, px, py, r * 0.5, '#1A0E0A'); } }
  ctx.restore();
  // haar steekt boven de huid uit
  ctx.strokeStyle = '#2A1A12'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx0 - 4, hy0 - 40); ctx.quadraticCurveTo(hx1 + 6, hy1 + 60, hx1 - 30, yS - 110); ctx.stroke();
  // markering van het besproken weefsel
  if (hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    if (hl === 'dek') { ctx.beginPath(); ctx.moveTo(x, yS - 20); ctx.lineTo(x + w, yS - 20); for (let k = 60; k >= 0; k--) { const xx = x + k * w / 60; ctx.lineTo(xx, eB(xx)); } ctx.closePath(); ctx.stroke(); }
    if (hl === 'bind') { ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x + k * w / 60; k ? ctx.lineTo(xx, eB(xx)) : ctx.moveTo(xx, eB(xx)); } ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.stroke(); }
    if (hl === 'spier') { ctx.beginPath(); ctx.ellipse((mx0 + mx1) / 2 + 10, (my0 + my1) / 2 + 4, 70, 30, -0.95, 0, 6.283); ctx.stroke(); }
    if (hl === 'zenuw') { ctx.beginPath(); ctx.ellipse(zx + 4, (eB(zx) + y + h) / 2 + 10, 60, (y + h - eB(zx)) / 2 + 10, 0, 0, 6.283); ctx.stroke(); }
    if (hl === 'pig') pigs.forEach(([px, py]) => circ(ctx, px, py, 19, null, C.goud, 4)); }
  ctx.restore();
  return { yS, eB, nx, ny: eB(nx) - 12, zx, mx: (mx0 + mx1) / 2, my: (my0 + my1) / 2, vx }; }

// HE-coupe in een rond microscoopbeeld. o: soort 'gewoon'|'melanoom', kern 0..1 (kernen gekleurd), rest 0..1 (rest gekleurd), deling/kernen 0..1 (markering), meet 0..1 (diepte), vat 0..1
function coupe(ctx, cx, cy, r, t, o = {}) { const { a = 1, soort = 'gewoon', kern = 1, rest = 1, deling = 0, kernen = 0, meet = 0, vat = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const u = r / 300;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = HE.glas; ctx.fill(); ctx.save(); ctx.clip();
  const cR = (c) => mixC(HE.grijs, c, rest), cK = (c) => mixC(HE.grijs, c, kern), lR = (c) => mixC(HE.grijsR, c, rest);
  const y0 = xx => cy - 0.6 * r + Math.sin(xx / (60 * u)) * 5 * u;
  const yb = xx => cy - 0.12 * r + Math.sin((xx - cx) / r * 7) * 0.08 * r;
  // lederhuid
  ctx.fillStyle = cR(HE.rozeL); ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.strokeStyle = lR(HE.vezel); ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const yy = cy + (0.0 + i * 0.09) * r; ctx.beginPath(); for (let k = 0; k <= 24; k++) { const xx = cx - r + k * r / 12; const py = yy + Math.sin(k * 1.1 + i * 2.1) * 9 * u; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  for (let i = 0; i < 14; i++) { const fx = cx - r + hash(i * 3 + 11) * 2 * r, fy = cy + hash(i * 3 + 12) * r; ctx.fillStyle = cK(HE.paars); ctx.beginPath(); ctx.ellipse(fx, fy, 9 * u, 2.8 * u, hash(i) * 0.6 - 0.3, 0, 6.283); ctx.fill(); }
  // bloedvat
  const bx = cx + 0.45 * r, byy = cy + 0.62 * r; circ(ctx, bx, byy, 34 * u, cR('#F8E4EA'), lR(HE.rozeR), 5 * u); for (let i = 0; i < 4; i++) circ(ctx, bx - 14 * u + (i % 2) * 22 * u, byy - 10 * u + Math.floor(i / 2) * 18 * u, 8 * u, mixC(HE.grijs, HE.bloed, rest));
  if (vat > 0.01) circ(ctx, bx, byy, 46 * u, null, rgba(C.goud, vat), 5 * u);
  // opperhuid met ronde cellen
  ctx.save(); ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = cx - r + k * r / 20; k ? ctx.lineTo(xx, y0(xx)) : ctx.moveTo(xx, y0(xx)); } for (let k = 40; k >= 0; k--) { const xx = cx - r + k * r / 20; ctx.lineTo(xx, yb(xx)); } ctx.closePath(); ctx.fillStyle = cR(HE.roze); ctx.fill(); ctx.clip();
  for (let rr = 0; rr < 14; rr++) { const yy = cy - 0.6 * r + 10 * u + rr * 21 * u; for (let xx = cx - r + (rr % 2) * 11 * u; xx < cx + r; xx += 22 * u) { if (yy > yb(xx) + 6 * u || yy < y0(xx) + 4 * u) continue; circ(ctx, xx, yy, 10 * u, cR('#F0BCD0'), lR(HE.rozeR), 1.2 * u); circ(ctx, xx, yy, 3.6 * u, cK(HE.paars)); } }
  ctx.restore();
  // hoornlaag
  ctx.strokeStyle = lR(HE.hoorn); ctx.lineWidth = 2.5 * u; for (let i = 0; i < 4; i++) { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = cx - r + k * r / 20; const py = y0(xx) - 4 * u - i * 6 * u + Math.sin(k * 2.3 + i) * 2 * u; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // basale rij met pigment
  for (let xx = cx - r + 8 * u; xx < cx + r; xx += 19 * u) { const py = yb(xx) - 7 * u; circ(ctx, xx, py, 8 * u, cR('#E9AFC4'), lR(HE.rozeR), 1.2 * u); circ(ctx, xx, py, 3.6 * u, cK(HE.paarsD)); if (hash(xx) > 0.6) circ(ctx, xx + 4 * u, py - 4 * u, 2 * u, mixC(HE.grijs, HE.pigment, rest)); }
  const geo = { y0: y0(cx), yb: yb(cx), yD: cy + 0.42 * r, bx, by: byy, mit: [] };
  if (soort === 'gewoon') { [-0.5, -0.05, 0.4].forEach((fx, g) => { const nxp = cx + fx * r, nyp = yb(nxp) + 2 * u; for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + g, d = i ? 14 * u : 0; const px = nxp + Math.cos(an) * d * 1.3, py = nyp + Math.sin(an) * d; circ(ctx, px, py, 9 * u, cR('#E6A6BE'), lR(HE.rozeR), 1.2 * u); circ(ctx, px, py, 3.8 * u, cK(HE.paars)); if (i % 3 === 0) circ(ctx, px + 4 * u, py - 3 * u, 2 * u, mixC(HE.grijs, HE.pigment, rest)); } }); }
  else {
    const cel = (px, py, rc, rk, seed, mit) => { circ(ctx, px, py, rc, cR('#E2A0BA'), lR(HE.rozeR), 1.4 * u);
      if (mit === 1) { ctx.strokeStyle = cK(HE.paarsD); ctx.lineWidth = 2.6 * u; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(px + k * 2.6 * u, py - 8 * u); ctx.lineTo(px + k * 2.6 * u + (k % 2) * 2 * u, py + 8 * u); ctx.stroke(); } }
      else if (mit === 2) { ctx.strokeStyle = cK(HE.paarsD); ctx.lineWidth = 2.6 * u; for (const s2 of [-1, 1]) for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(px + s2 * 5 * u, py + k * 3 * u); ctx.lineTo(px + s2 * 11 * u, py + k * 3.4 * u); ctx.stroke(); } }
      else { grilVorm(ctx, px, py, rk, 0.9, seed); shape(ctx, cK(HE.paarsD), null); circ(ctx, px + rk * 0.25, py - rk * 0.2, 2.2 * u, mixC(HE.grijs, '#C0306A', kern)); }
      if (hash(seed * 3) > 0.55) circ(ctx, px - rc * 0.5, py + rc * 0.4, 2.4 * u, mixC(HE.grijs, HE.pigment, rest)); };
    // massa die de lederhuid in groeit
    const cells = []; for (let i = 0; i < 58; i++) { const fx = -0.42 + hash(i * 13 + 1) * 0.8, f = hash(i * 13 + 2); const px = cx + fx * r; const top = yb(px) - 6 * u, bot = cy + (0.42 - 0.5 * Math.abs(fx + 0.02) ** 2 * 1.4) * r; cells.push([px, top + f * (bot - top), i]); }
    // cellen die omhoog de opperhuid in groeien
    for (let i = 0; i < 12; i++) { const px = cx + (-0.6 + hash(i * 17 + 4) * 1.15) * r; const py = y0(px) + (0.2 + hash(i * 17 + 5) * 0.65) * (yb(px) - y0(px)); cells.push([px, py, 100 + i]); }
    const MIT = { 7: 1, 23: 2, 41: 1, 104: 1, 51: 2 };
    cells.forEach(([px, py, i]) => { const rc = (12 + hash(i * 5 + 1) * 6) * u, rk = (5.5 + hash(i * 5 + 2) * 5.5) * u; cel(px, py, rc, rk, i * 1.7, MIT[i] || 0); if (MIT[i]) geo.mit.push([px, py]); });
    if (deling > 0.01) geo.mit.forEach(([px, py], j) => circ(ctx, px, py, (24 + 3 * Math.sin(t * 5 + j)) * u, null, rgba(C.goud, deling), 4 * u));
    if (kernen > 0.01) [[2, 0], [30, 0], [45, 0]].forEach(([i]) => { const c = cells[i]; circ(ctx, c[0], c[1], 22 * u, null, rgba(C.koraal, kernen), 4 * u); });
    geo.massa = cells.slice(0, 58);
  }
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 10 * u; ctx.stroke(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  if (meet > 0.01) { const mx = cx - 0.62 * r, top = geo.y0 + 2 * u, bot = top + (geo.yD - top) * clamp(meet, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx, top); ctx.lineTo(mx, bot); ctx.stroke(); ctx.lineWidth = 4 * u; [top, bot].forEach(yy => { ctx.beginPath(); ctx.moveTo(mx - 14 * u, yy); ctx.lineTo(mx + 14 * u, yy); ctx.stroke(); }); ctx.setLineDash([8 * u, 8 * u]); ctx.lineWidth = 2.5 * u; ctx.beginPath(); ctx.moveTo(mx, bot); ctx.lineTo(cx + 0.3 * r, bot); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); return geo; }

// liniaal in millimeters (0..n mm), met een goud stuk van 'waarde' mm (u = groei)
function liniaal(ctx, x, y, pxmm, n, a = 1, waarde = 0.6, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = pxmm * n;
  roundRect(ctx, x - 20, y - 10, w + 40, 110, 10); shape(ctx, '#E8DCB8', '#B8A878', 2);
  ctx.strokeStyle = '#4A3A2E'; ctx.lineWidth = 2; for (let i = 0; i <= n * 10; i++) { const xx = x + i * pxmm / 10, L = i % 10 === 0 ? 40 : i % 5 === 0 ? 28 : 18; ctx.beginPath(); ctx.moveTo(xx, y - 10); ctx.lineTo(xx, y - 10 + L); ctx.stroke(); if (i % 10 === 0) text(ctx, String(i / 10), xx, y + 64, fTekst(26, 700), '#4A3A2E', 'center'); }
  text(ctx, 'mm', x + w + 6, y + 90, fTekst(22, 700), '#4A3A2E', 'right');
  if (u > 0.01) { roundRect(ctx, x, y - 34, pxmm * waarde * clamp(u, 0, 1), 16, 6); shape(ctx, C.goud, null); }
  ctx.restore(); }

// weggehaald stukje huid van bovenaf (spoelvorm), melanoom in het midden, snijrand groen als vrij
function excisie(ctx, x, y, s = 1, a = 1, vrij = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, 0); ctx.quadraticCurveTo(0, -150, 220, 0); ctx.quadraticCurveTo(0, 150, -220, 0); ctx.closePath(); shape(ctx, '#D9A78C', '#B5806A', 3);
  moedervlek(ctx, 0, 0, 26, 1);
  if (vrij > 0.01) { ctx.save(); ctx.globalAlpha *= vrij; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(0, 0, 80, 62, 0, 0, 6.283); ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(-220, 0); ctx.quadraticCurveTo(0, -150, 220, 0); ctx.quadraticCurveTo(0, 150, -220, 0); ctx.closePath(); ctx.strokeStyle = C.groen; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// verslag van de patholoog; regels = [[label, waarde, alpha], …]
function verslag(ctx, x, y, w, h, a = 1, regels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#3E8E9A'; ctx.fillRect(x, y, w, 14);
  metaText(ctx, 'Pathologie · verslag', x + 32, y + 66, '#5A6478', 'left', 22); ctx.fillStyle = '#C9C0AE'; ctx.fillRect(x + 32, y + 86, w - 64, 2);
  regels.forEach(([lab, waarde, al], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + 150 + i * 96; text(ctx, lab, x + 32, yy - 30, fTekst(22, 700), '#7A8290', 'left'); text(ctx, waarde, x + 32, yy + 6, fTekst(36, 700), '#1A2740', 'left'); ctx.restore(); });
  ctx.restore(); }

// beeldscherm met inhoud
function scherm(ctx, x, y, w, h, a = 1, inhoud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.fillRect(x + w / 2 - 12, y + h, 24, 50); roundRect(ctx, x + w / 2 - 80, y + h + 44, 160, 14, 6); ctx.fill();
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 14); shape(ctx, '#0D1420', '#5A6478', 2); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#F3EEF1'; ctx.fillRect(x, y, w, h); inhoud && inhoud(); ctx.restore(); ctx.restore(); }

// overlegtafel met naambordjes
function overlegTafel(ctx, x, y, w, a = 1, namen = [], al = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - 40, y + 70); ctx.lineTo(x + 40, y + 70); ctx.closePath(); shape(ctx, '#8C6A4E', '#6B5440', 2); ctx.fillStyle = '#6B5440'; ctx.fillRect(x + 60, y + 70, 16, 880 - y - 70); ctx.fillRect(x + w - 76, y + 70, 16, 880 - y - 70);
  namen.forEach((n, i) => { const f = al[i] == null ? 1 : al[i]; if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const bx = x + (i + 0.5) * w / namen.length; ctx.font = fTekst(34, 700); const bw = ctx.measureText(n).width + 48; ctx.beginPath(); ctx.moveTo(bx - bw / 2, y + 40); ctx.lineTo(bx - bw / 2 + 12, y - 50); ctx.lineTo(bx + bw / 2 - 12, y - 50); ctx.lineTo(bx + bw / 2, y + 40); ctx.closePath(); shape(ctx, '#F2EEE4', '#8FA0B5', 2.5); ctx.fillStyle = '#3E8E9A'; ctx.fillRect(bx - bw / 2 + 14, y - 46, bw - 28, 8); text(ctx, n, bx, y + 8, fTekst(34, 700), '#1A2740', 'center'); ctx.restore(); });
  ctx.restore(); }

// sneeuwvlok (vriescoupe)
function sneeuwvlok(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#BFE3F4'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; const ex = x + Math.cos(an) * r, ey = y + Math.sin(an) * r; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke(); const mx = x + Math.cos(an) * r * 0.6, my = y + Math.sin(an) * r * 0.6; [-0.6, 0.6].forEach(d => { ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(an + d) * r * 0.3, my + Math.sin(an + d) * r * 0.3); ctx.stroke(); }); } ctx.restore(); }

// oog (voor 'het oog van de dermatoloog') en bloedbuisje
function oogIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(0, -42, 50, 0); ctx.quadraticCurveTo(0, 42, -50, 0); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA3B2', 3); circ(ctx, 0, 0, 18, '#5A8FC4'); circ(ctx, 0, 0, 8, '#121A26'); ctx.restore(); }
function bloedBuis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -16, -60, 32, 110, 14); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 3); ctx.save(); roundRect(ctx, -16, -60, 32, 110, 14); ctx.clip(); ctx.fillStyle = '#B23A3A'; ctx.fillRect(-16, -10, 32, 70); ctx.restore(); roundRect(ctx, -20, -76, 40, 22, 6); shape(ctx, '#7A3E9A', null); ctx.restore(); }
