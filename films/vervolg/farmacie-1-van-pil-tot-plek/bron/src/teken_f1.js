// Wat word jij? · Farmacie en Verpleegkunde 1 · Van pil tot plek en weer terug — eigen tekeningen (20 okt 2026)

const PIL = { bd: '#E07A8F', bdR: '#F4A6B4', pa: '#F2F2EE', paR: '#C9CED6', sim: '#C9A35C', nitro: '#E0B64A' };

// capsule (bloeddrukpil): twee helften
function capsule(ctx, x, y, s = 1, c1 = PIL.bd, c2 = '#F2F2EE', rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.save(); ctx.clip(); ctx.fillStyle = c1; ctx.fillRect(-26, -11, 26, 22); ctx.fillStyle = c2; ctx.fillRect(0, -11, 26, 22); ctx.restore();
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 1.5 / s; ctx.stroke(); ctx.restore(); }
// rond tablet (paracetamol) met breukgleuf
function tablet(ctx, x, y, r = 12, a = 1, col = PIL.pa) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, col, PIL.paR, 1.5); ctx.strokeStyle = PIL.paR; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y); ctx.lineTo(x + r * 0.6, y); ctx.stroke(); ctx.restore(); }
// strip paracetamol (blister met n tabletten)
function blister(ctx, x, y, n = 4, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 70, n * 46 + 16, 8); shape(ctx, '#C9D2DE', '#8FA0B5', 2);
  for (let i = 0; i < n; i++) { circ(ctx, x + 35, y + 31 + i * 46, 18, rgba('#FFFFFF', 0.35), '#8FA0B5', 1.5); tablet(ctx, x + 35, y + 31 + i * 46, 12); } ctx.restore(); }

// pillendoos: 7 dagen × 3 momenten; bd = aantal dagen met een bloeddrukpil (ochtend, mag fractie), pa = paracetamol-vakjes (per dag ochtend/middag/avond)
const DAGEN = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
function pillendoos(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { bd = 0, pa = 0, labels = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const cw = w / 7, rh = cw * 0.66, h = rh * 3;
  roundRect(ctx, x - 10, y - 44, w + 20, h + 56, 14); shape(ctx, '#3E6E9A', '#5B8CC9', 2);
  DAGEN.forEach((d, i) => text(ctx, d, x + cw * (i + 0.5), y - 12, fTekst(24, 700), '#E8EEF4', 'center'));
  for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const cx = x + i * cw + 4, cy = y + r * rh + 4; roundRect(ctx, cx, cy, cw - 8, rh - 8, 8); shape(ctx, rgba('#DDE8F2', 0.85), '#9AB4CC', 1.5);
    const mx = cx + (cw - 8) / 2, my = cy + (rh - 8) / 2;
    if (r === 0) { const f = clamp(bd - i, 0, 1); if (f > 0.01) capsule(ctx, mx - 8 * (pa > 0 ? 1 : 0), my - (1 - f) * 30, cw / 110, PIL.bd, '#F2F2EE', 0.5, f); }
    const fp = clamp(pa - i, 0, 1); if (fp > 0.01) tablet(ctx, mx + (r === 0 ? 14 : 0), my - (1 - fp) * 30, cw / 7.5, fp); }
  if (labels) ['ochtend', 'middag', 'avond'].forEach((s2, r) => metaText(ctx, s2, x - 22, y + r * rh + rh / 2 + 8, C.text2, 'right', 18));
  ctx.restore(); }

// tafel (bovenblad + voorkant) die de benen afdekt
function tafel(ctx, y = 650, x0 = 260, x1 = 1660) { ctx.fillStyle = '#7A5C44'; roundRect(ctx, x0, y, x1 - x0, 22, 6); ctx.fill(); ctx.fillStyle = '#5E4636'; ctx.fillRect(x0 + 20, y + 22, x1 - x0 - 40, 880 - y - 22); ctx.fillStyle = rgba('#000000', 0.12); ctx.fillRect(x0 + 20, y + 22, x1 - x0 - 40, 10); }

// maag (vooraanzicht): bonenvorm met slokdarm bovenaan en uitgang rechtsonder
function maag(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-30, -190); ctx.lineTo(10, -190); ctx.lineTo(20, -120); ctx.bezierCurveTo(60, -100, 130, -60, 120, 20); ctx.bezierCurveTo(110, 70, 150, 90, 200, 80);
  ctx.lineTo(205, 125); ctx.bezierCurveTo(120, 150, 40, 170, -40, 150); ctx.bezierCurveTo(-150, 120, -170, -10, -120, -90); ctx.bezierCurveTo(-90, -130, -40, -120, -30, -190); ctx.closePath();
  shape(ctx, rgba('#D99A8A', 0.35), '#E3A89A', 3); ctx.strokeStyle = rgba('#E3A89A', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.quadraticCurveTo(-20, 40, 100, 100); ctx.stroke(); ctx.restore(); }
// dunne darm als kronkelende buis (vier rijen met bochten)
function dunneDarm(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(-170, -105); for (let k = 0; k < 4; k++) { const yy = -105 + k * 70; if (k % 2 === 0) { ctx.lineTo(140, yy); if (k < 3) ctx.arc(140, yy + 35, 35, -Math.PI / 2, Math.PI / 2, false); } else { ctx.lineTo(-140, yy); if (k < 3) ctx.arc(-140, yy + 35, 35, -Math.PI / 2, Math.PI / 2, true); } } ctx.lineTo(-180, 105); };
  pad(); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 46; ctx.stroke(); pad(); ctx.strokeStyle = '#E8B4A6'; ctx.lineWidth = 32; ctx.stroke(); ctx.restore(); }

// een rij darmcellen langs een cirkelboog (de darm is rond): centrum (cx, cy), binnenrand R (darmholte), diepte d
function darmBoog(ctx, cx, cy, R, a0, a1, n, d = 200, a = 1, o = {}) { if (a <= 0.01) return; const { bloed = true, mv = true } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const da = (a1 - a0) / n, gap = 0.004;
  if (bloed) { ctx.beginPath(); ctx.arc(cx, cy, R + d + 34, a0, a1); ctx.arc(cx, cy, R + d + 96, a1, a0, true); ctx.closePath(); shape(ctx, rgba('#B23A3A', 0.35), rgba('#D8573F', 0.7), 2); }
  for (let i = 0; i < n; i++) { const b0 = a0 + i * da + gap, b1 = b0 + da - 2 * gap;
    const sec = (r0, r1, g) => { ctx.beginPath(); ctx.arc(cx, cy, r0 + g, b0 + g / R, b1 - g / R); ctx.arc(cx, cy, r1 - g, b1 - g / R, b0 + g / R, true); ctx.closePath(); };
    sec(R, R + d, 0); shape(ctx, rgba('#D99A8A', 0.22), C.er, 2.5); sec(R, R + d, 7); ctx.strokeStyle = rgba(C.er, 0.55); ctx.lineWidth = 1.2; ctx.stroke();
    if (mv) { ctx.strokeStyle = rgba(C.er, 0.7); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 1; k < 8; k++) { const an = b0 + (b1 - b0) * k / 8; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); ctx.lineTo(cx + Math.cos(an) * (R - 22), cy + Math.sin(an) * (R - 22)); ctx.stroke(); } }
    const am = (b0 + b1) / 2, kr = R + d * 0.6; ctx.beginPath(); ctx.ellipse(cx + Math.cos(am) * kr, cy + Math.sin(am) * kr, 22, 26, am, 0, 6.283); shape(ctx, rgba(C.kern, 0.7), C.kernR, 1.2); }
  ctx.restore(); }
// punt op een cirkel
const opBoog = (cx, cy, R, an) => [cx + Math.cos(an) * R, cy + Math.sin(an) * R];
const hoekVoorX = (cx, cy, R, x) => Math.PI / 2 - Math.asin((x - cx) / R); // hoek (onderkant van de cirkel) bij een gegeven x

// dubbel laagje vet (fosfolipiden) langs een boog; koppen = bolletjes, staarten = lijntjes naar het midden
function dubbelLaag(ctx, cx, cy, R, a0, a1, dik = 110, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, R + 12, a0, a1); ctx.arc(cx, cy, R + dik - 12, a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.oker, 0.16); ctx.fill();
  const n = Math.round((a1 - a0) * R / 26); ctx.lineCap = 'round';
  for (let i = 0; i <= n; i++) { const an = a0 + (a1 - a0) * i / n, w = Math.sin(t * 1.3 + i * 0.7) * 1.5;
    for (const [r0, r1] of [[R, R + dik * 0.46], [R + dik, R + dik * 0.54]]) { const [hx, hy] = opBoog(cx, cy, r0 + w, an); ctx.strokeStyle = rgba(C.oker, 0.85); ctx.lineWidth = 2.5;
      for (const off of [-0.0035, 0.0035]) { const [p, q2] = opBoog(cx, cy, r0 + (r1 > r0 ? 8 : -8), an + off), [e, f] = opBoog(cx, cy, r1, an + off * 1.4); ctx.beginPath(); ctx.moveTo(p, q2); ctx.lineTo(e, f); ctx.stroke(); }
      circ(ctx, hx, hy, 10, '#E8C27A', '#F2D8A0', 1.2); } }
  ctx.restore(); }

// vetoplosbare stof: zigzagketen (oker); wateroplosbare stof: blauwgroene ring met watermoleculen eromheen
function vetStof(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#F0C060'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const px = -50 + i * 20, py = i % 2 ? -8 : 8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); hexagon(ctx, 62, 0, 16, rgba('#F0C060', 0.4), '#F0C060', 3); ctx.restore(); }
function waterStof(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  hexagon(ctx, -14, 0, 18, rgba(C.teal, 0.45), C.teal, 3); hexagon(ctx, 18, 0, 18, rgba(C.teal, 0.45), C.teal, 3, 0);
  for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + t * 0.6, r = 46; circ(ctx, Math.cos(an) * r * 1.2, Math.sin(an) * r, 6, rgba('#8FC4E8', 0.8)); } ctx.restore(); }

// lever (vooraanzicht) en hart
function leverVorm(ctx, x, y, s = 1, a = 1, dimK = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - dimK * 0.6); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-210, -40); ctx.bezierCurveTo(-200, -120, -40, -130, 120, -110); ctx.bezierCurveTo(220, -95, 240, -50, 200, -20); ctx.bezierCurveTo(140, 30, 40, 80, -60, 110); ctx.bezierCurveTo(-170, 130, -220, 60, -210, -40); ctx.closePath();
  shape(ctx, rgba('#8C3A30', 0.75), '#C0605A', 3); ctx.strokeStyle = rgba('#E09A90', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-10, -120); ctx.quadraticCurveTo(10, -20, -30, 100); ctx.stroke(); ctx.restore(); }
function hart(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; const p = 1 + 0.04 * Math.max(0, Math.sin(t * 6)); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-90, 0, -80, -70, -35, -70); ctx.bezierCurveTo(-10, -70, 0, -50, 0, -40); ctx.bezierCurveTo(0, -50, 10, -70, 35, -70); ctx.bezierCurveTo(80, -70, 90, 0, 0, 60); ctx.closePath(); shape(ctx, rgba('#D8573F', 0.8), '#F08A70', 2.5); ctx.restore(); }
// klein molecuul (twee ringen); geknipt = twee losse stukjes die uit elkaar drijven
function molecuul(ctx, x, y, s = 1, col = PIL.bd, a = 1, knip = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = knip * 16;
  if (knip < 0.05) { ctx.strokeStyle = col; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 9 * s, y); ctx.lineTo(x + 9 * s, y); ctx.stroke(); }
  hexagon(ctx, x - 11 * s - d, y - d * 0.4, 9 * s, rgba(col, knip > 0.05 ? 0.25 : 0.6), knip > 0.05 ? rgba(C.text2, 0.7) : col, 2); hexagon(ctx, x + 11 * s + d, y + d * 0.4, 9 * s, rgba(col, knip > 0.05 ? 0.25 : 0.6), knip > 0.05 ? rgba(C.text2, 0.7) : col, 2); ctx.restore(); }
// positie langs een polylijn, u 0..1
function padPos(path, u) { const L = []; let tot = 0; for (let i = 1; i < path.length; i++) { const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); L.push(d); tot += d; }
  let d = clamp(u, 0, 1) * tot, i = 0; while (i < L.length - 1 && d > L[i]) { d -= L[i]; i++; } const f = L[i] ? d / L[i] : 0; return [lerp(path[i][0], path[i + 1][0], f), lerp(path[i][1], path[i + 1][1], f)]; }
function vat(ctx, path, col, lw = 26, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.strokeStyle = rgba(col, 0.45); ctx.lineWidth = lw; ctx.stroke(); ctx.strokeStyle = rgba(col, 0.9); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// raster van 100 moleculen; weg = hoeveel er afgebroken zijn (grijs)
function honderd(ctx, x, y, weg, a = 1, col = PIL.bd, gap = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 100; i++) { const px = x + (i % 10) * gap, py = y + Math.floor(i / 10) * gap, k = clamp(weg - (99 - i), 0, 1); // de laatste in de lijst gaan eerst weg (onderaan)
    if (k > 0.5) { hexagon(ctx, px, py, 9, rgba(C.text2, 0.12), rgba(C.text2, 0.45), 1.5); } else hexagon(ctx, px, py, 11, rgba(col, 0.6), col, 1.8); }
  ctx.restore(); }

// spuitbus nitroglycerine (oromucosaal)
function sprayFles(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -34, -40, 68, 150, 14); shape(ctx, '#C9503C', '#E07A5F', 2); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-34, 0, 68, 50); ctx.fillStyle = '#C9503C'; ctx.fillRect(-22, 18, 44, 6);
  roundRect(ctx, -14, -78, 28, 40, 6); shape(ctx, '#E8E2D8', '#B8B0A0', 2); roundRect(ctx, -6, -74, 34, 12, 4); shape(ctx, '#E8E2D8', '#B8B0A0', 1.5); ctx.restore(); }
// tong (zijaanzicht) met bloedvaatjes aan de onderkant
function tongSchema(ctx, x, y, s = 1, a = 1, vaatjes = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // onderkaak / mondbodem
  ctx.beginPath(); ctx.moveTo(-260, 40); ctx.bezierCurveTo(-250, 150, 150, 170, 240, 60); ctx.lineTo(240, 110); ctx.bezierCurveTo(150, 220, -250, 210, -280, 80); ctx.closePath(); shape(ctx, rgba('#D99A8A', 0.3), '#C98A7A', 2.5);
  // tong (punt naar links, iets opgetild)
  ctx.beginPath(); ctx.moveTo(-230, -30); ctx.bezierCurveTo(-240, -110, -60, -140, 120, -110); ctx.bezierCurveTo(230, -90, 260, -10, 230, 40); ctx.bezierCurveTo(120, 60, 0, 30, -80, 30); ctx.bezierCurveTo(-170, 30, -220, 20, -230, -30); ctx.closePath(); shape(ctx, '#E39A98', '#F2B8B4', 3);
  ctx.strokeStyle = rgba('#B86A68', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-180, -60); ctx.quadraticCurveTo(0, -100, 200, -50); ctx.stroke();
  if (vaatjes > 0.01) { ctx.globalAlpha *= vaatjes; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const x0 = -170 + i * 40, yy = 60 + (i % 3) * 14; ctx.strokeStyle = i % 2 ? '#5B7FC9' : '#D8573F'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(x0 + 15, yy + 30, x0 + 35, yy + 10, x0 + 30, yy + 50); ctx.stroke(); } }
  ctx.restore(); }
function pleister(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -70, -50, 140, 100, 20); shape(ctx, '#E8D6B8', '#C9B48E', 2); roundRect(ctx, -36, -30, 72, 60, 10); shape(ctx, '#F2EEE4', '#C9B48E', 1.5); ctx.restore(); }
function injectie(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s);
  roundRect(ctx, -70, -16, 120, 32, 6); shape(ctx, rgba('#DDE8F2', 0.6), '#9AB4CC', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-20, -12, 66, 24); ctx.fillStyle = '#9AB4CC'; ctx.fillRect(-100, -4, 32, 8); ctx.fillRect(-106, -18, 8, 36);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(110, 0); ctx.stroke(); ctx.restore(); }
function zetpil(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, -22); ctx.lineTo(20, -22); ctx.quadraticCurveTo(70, -20, 76, 0); ctx.quadraticCurveTo(70, 20, 20, 22); ctx.lineTo(-50, 22); ctx.closePath(); shape(ctx, '#F2EAD0', '#C9B48E', 2); ctx.restore(); }

// bloedspiegelgrafiek: x0,y0 = linksboven van het plotvlak; o.curves = [{f, col, u, lw, a}], o.grens, o.xmax, o.ymax, o.xt (ticks), o.xlab
function spiegelGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, xmin = 0, xmax = 8, ymax = 100, xfmt = v => String(v), xt = [], yt = [], xlab = 'tijd (uur)', ylab = 'bloedspiegel', curves = [], grens = null, grensA = 0, grensLab = 'werkt', yHi = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = v => x + (v - xmin) / (xmax - xmin) * w, Y = v => y + h - v / ymax * h;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 20, y + h); ctx.stroke();
  for (const v of xt) { ctx.beginPath(); ctx.moveTo(X(v), y + h); ctx.lineTo(X(v), y + h + 10); ctx.stroke(); text(ctx, xfmt(v), X(v), y + h + 42, fTekst(28, 600), C.text2, 'center'); }
  for (const v of yt) { ctx.beginPath(); ctx.moveTo(x - 10, Y(v)); ctx.lineTo(x, Y(v)); ctx.stroke(); text(ctx, String(v), x - 18, Y(v) + 10, fTekst(28, 600), C.text2, 'right'); }
  metaText(ctx, xlab, x + w + 20, y + h + 84, C.grain, 'right', 22); metaText(ctx, ylab, x, y - 40, yHi > 0.5 ? C.goud : C.grain, 'left', 24);
  if (grens != null && grensA > 0.01) { ctx.save(); ctx.globalAlpha *= grensA; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(grens)); ctx.lineTo(x + w, Y(grens)); ctx.stroke(); ctx.setLineDash([]); text(ctx, grensLab, x + w + 14, Y(grens) + 10, fTekst(26, 700), C.groen, 'left'); ctx.restore(); }
  for (const c of curves) { const u = c.u == null ? 1 : c.u, ca = c.a == null ? 1 : c.a; if (u <= 0.001 || ca <= 0.01) continue; ctx.save(); ctx.globalAlpha *= ca; ctx.strokeStyle = c.col; ctx.lineWidth = c.lw || 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    const xa = c.x0 == null ? xmin : c.x0, x1 = xa + ((c.x1 == null ? xmax : c.x1) - xa) * u, N = 400; let last; for (let i = 0; i <= N; i++) { const xv = xa + (x1 - xa) * i / N, yv = c.f(xv); const px = X(xv), py = Y(clamp(yv, 0, ymax * 1.05)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); last = [px, py]; } ctx.stroke();
    if (c.punt && u < 0.999) circ(ctx, last[0], last[1], 8, c.col); ctx.restore(); }
  ctx.restore(); return { X, Y }; }

// nier met bloed erin en urine (druppels) eruit; uit = 0..1 hoeveel er wordt uitgescheiden
function nierFilter(ctx, x, y, s = 1, a = 1, t = 0, uit = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vat(ctx, [[x - 260 * s, y - 40 * s], [x - 40 * s, y - 10 * s]], '#D8573F', 22 * s); vat(ctx, [[x - 40 * s, y + 20 * s], [x - 260 * s, y + 50 * s]], '#5B7FC9', 22 * s);
  nierVorm(ctx, x, y, 2.6 * s, -1, 1);
  ctx.strokeStyle = '#E0C860'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 40 * s); ctx.quadraticCurveTo(x - 20 * s, y + 140 * s, x + 10 * s, y + 200 * s); ctx.stroke();
  for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; if (hash(i * 7 + 3) > uit) continue; const [px, py] = padPos([[x - 260 * s, y - 40 * s], [x - 60 * s, y - 12 * s], [x - 20 * s, y + 60 * s], [x - 10 * s, y + 140 * s], [x + 10 * s, y + 200 * s]], ph); molecuul(ctx, px, py, 0.8 * s, PIL.bd, 1); }
  ctx.restore(); }
// grapefruit (doorsnede)
function grapefruit(ctx, x, y, r = 70, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2B04A', '#E0943A', 3); circ(ctx, x, y, r * 0.86, '#F08A70', null);
  ctx.strokeStyle = '#FBD3C4'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.86, y + Math.sin(an) * r * 0.86); ctx.stroke(); } circ(ctx, x, y, r * 0.1, '#FBD3C4'); ctx.restore(); }
// staafje bloedspiegel (verticaal)
function spiegelStaaf(ctx, x, y, h, frac, col, lab, a = 1, max = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 70, h, 10); shape(ctx, '#2A3446', C.line, 1.5); const hh = h * clamp(frac, 0, 1); if (hh > 2) { roundRect(ctx, x, y + h - hh, 70, hh, 10); shape(ctx, rgba(col, 0.7), col, 2); }
  if (max != null) { ctx.setLineDash([8, 7]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 16, y + h - h * max); ctx.lineTo(x + 86, y + h - h * max); ctx.stroke(); ctx.setLineDash([]); }
  if (lab) text(ctx, lab, x + 35, y + h + 40, fTekst(26, 700), C.text2, 'center'); ctx.restore(); }
// bijsluiter (gevouwen papier) met een doorgestreepte grapefruit
function bijsluiter(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -140, 220, 280, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 6; i++) ctx.fillRect(-80, -110 + i * 22, 160 - (i % 3) * 30, 7); grapefruit(ctx, 0, 70, 46, 1); kruis(ctx, 0, 70, 44, 1); ctx.restore(); }
// medicijnkar (verpleegafdeling): kar met laatjes en bekertjes
function medicijnKar(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -300, 340, 280, 14); shape(ctx, '#DDE4EC', '#9AB4CC', 2.5);
  const kl = [C.teal, C.groen, C.oker, C.koraal]; for (let r = 0; r < 4; r++) for (let k = 0; k < 2; k++) { roundRect(ctx, -150 + k * 156, -280 + r * 64, 144, 52, 8); shape(ctx, '#F2F6FA', '#B8C8D8', 1.5); roundRect(ctx, -150 + k * 156 + 52, -262 + r * 64, 40, 10, 4); shape(ctx, kl[r], null); }
  roundRect(ctx, -190, -330, 380, 34, 10); shape(ctx, '#B8C8D8', '#9AB4CC', 2);
  for (let i = 0; i < 5; i++) { const bx = -140 + i * 70; ctx.beginPath(); ctx.moveTo(bx - 20, -370); ctx.lineTo(bx + 20, -370); ctx.lineTo(bx + 15, -330); ctx.lineTo(bx - 15, -330); ctx.closePath(); shape(ctx, rgba('#FFFFFF', 0.85), '#B8C8D8', 1.5); if (i % 2 === 0) tablet(ctx, bx - 4, -376, 7); else capsule(ctx, bx, -376, 0.45, PIL.bd, '#F2F2EE', 0.3); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(170, -300); ctx.lineTo(230, -340); ctx.stroke();
  circ(ctx, -130, 0, 20, '#3A4458', '#8FA0B5', 3); circ(ctx, 130, 0, 20, '#3A4458', '#8FA0B5', 3); ctx.restore(); }
// apotheekbalie
function balie(ctx, x0, x1, y = 640) { ctx.fillStyle = '#E8E2D4'; roundRect(ctx, x0, y, x1 - x0, 24, 6); ctx.fill(); ctx.fillStyle = '#3E6E7A'; ctx.fillRect(x0 + 14, y + 24, x1 - x0 - 28, 880 - y - 24); ctx.fillStyle = rgba('#FFFFFF', 0.15); ctx.fillRect(x0 + 14, y + 60, x1 - x0 - 28, 6); }
// icoontjes voor de route in de recap
function routeIcoon(ctx, soort, x, y, a = 1, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (0.35 + 0.65 * aan);
  if (soort === 'pil') capsule(ctx, x, y, 1.3, PIL.bd, '#F2F2EE', -0.4);
  else if (soort === 'darm') dunneDarm(ctx, x, y, 0.22);
  else if (soort === 'lever') leverVorm(ctx, x, y, 0.22);
  else if (soort === 'bloed') { ctx.beginPath(); ctx.moveTo(x, y - 32); ctx.bezierCurveTo(x + 28, y, x + 24, y + 30, x, y + 30); ctx.bezierCurveTo(x - 24, y + 30, x - 28, y, x, y - 32); shape(ctx, '#D8573F', '#F08A70', 2); }
  else if (soort === 'nier') nierVorm(ctx, x, y, 0.9, -1, 1);
  ctx.restore(); }
