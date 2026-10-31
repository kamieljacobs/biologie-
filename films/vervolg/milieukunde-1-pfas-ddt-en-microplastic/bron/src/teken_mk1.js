// Wat word jij? · Milieukunde 1 · PFAS, DDT en microplastic — eigen tekeningen (31 okt 2026)
// Seriekleuren (reeksbrief): oker = bodem en PFAS-stip, teal = water, groen = plant/onder de norm, blauw = eiwit (albumine),
// zandgeel = vet en DDT, koraal = boven de norm / let op, goud = focus en normstreep. Geen paars.
// Kip = kipEcht variant A uit bibliotheek/verbeterronde-1/dieren-a/kipecht (gekozen door Kamiel, 28 okt 2026).

const EIWIT = '#7E9BE6', VET = '#F0E2B6', DDTK = '#D9B85C', MPK = '#AEB6C2', HUIDKIP = '#B5653A';
const GROND = 860;

// ---------- algemene hulpjes (zoals gz3/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 64, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 18); ctx.lineTo(x + 52, y + 32); ctx.lineTo(x + 26, y + 46); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 66, y + 43, fTekst(30, 700), C.text, 'left'); ctx.restore(); }
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 48, h = 80 + regels.length * lh + (bron ? 50 : 6) + (o.extraH || 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(o.rand || C.line, 0.85), 2); metaText(ctx, kop, x + 28, y + 48, o.kopKl || C.goud, 'left', 28);
  regels.forEach((r, i) => { const [s2, ra, kl] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 28, y + 104 + i * lh, fTekst(o.px || 36, 700), kl || C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 76 + regels.length * lh, w, o.extraH || 0);
  if (bron) metaText(ctx, bron, x + 28, y + h - 22, C.text2, 'left', 28); ctx.restore(); return h; }
function termKaart(ctx, x, y, w, term, uitleg, a = 1, kl = C.goud) { if (a <= 0.01) return; const r = Array.isArray(uitleg) ? uitleg : [uitleg]; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 110 + r.length * 40, 16); shape(ctx, rgba('#0D1420', 0.9), kl, 2.5);
  text(ctx, term, x + 30, y + 70, fTekst(52, 800), kl, 'left'); r.forEach((u, i) => metaText(ctx, u, x + 30, y + 120 + i * 40, C.text, 'left', 28)); ctx.restore(); }
function somRegel(ctx, s2, x, y, a = 1, kl = C.text, px = 48, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, 800), kl, al); ctx.restore(); }

// ---------- decor (zoals lb3) ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6, dy = 0, grond = null) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, -dy, W, H); if (dy > 0 && grond) { ctx.fillStyle = grond; ctx.fillRect(0, H - dy - 2, W, dy + 2); } ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const NEST = [1692, 186]; // het zeearendnest in de populier (decor 1920×1080)

// Thijs met nitrilhandschoenen bij het monster (runtime-variant van zijn outfit 'stage'; lib_cast.js blijft ongewijzigd)
if (CAST.thijs && CAST.thijs.garderobe && CAST.thijs.garderobe.stage) CAST.thijs.garderobe.stageHand = Object.assign({}, CAST.thijs.garderobe.stage, { accessoire: ['sproeten', 'handschoenen'] });

// ---------- KIP (bibliotheek, variant A) ----------
function bioPad(ctx, pts, closed = false) { const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]; const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (closed) ctx.closePath(); }
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }
// KIP (leghen), zijaanzicht naar rechts; o.houding 'staan' | 'lopen' | 'pikken' (o.t 0–1). o.kijk = -1 spiegelt. o.kijkje(ctx) tekent organen op de romp (lokale coördinaten).
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = HUIDKIP } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const h = o.houding || 'staan', ph = ((t % 1) + 1) % 1;
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A';
  let voeten = [[-6, 0, 0], [22, 0, 0]], dein = 0, kopDx = 0, kopDy = 0, kopRot = 0;
  if (h === 'lopen') { for (let i = 0; i < 2; i++) { const p = (ph + i * 0.5) % 1; const zwaai = p > 0.6; const q = zwaai ? (p - 0.6) / 0.4 : p / 0.6;
      voeten[i][1] = zwaai ? -18 + 36 * (0.5 - 0.5 * Math.cos(Math.PI * q)) : 18 - 36 * q; voeten[i][2] = zwaai ? Math.sin(Math.PI * q) * 16 : 0; }
    dein = -Math.abs(Math.sin(ph * Math.PI * 2)) * 4; const hb = (ph * 2) % 1; kopDx = hb < 0.6 ? -10 * hb / 0.6 : -10 + 10 * (hb - 0.6) / 0.4; }
  else if (h === 'pikken') { const k = Math.sin(Math.PI * Math.min(1, ph / 0.7)); kopRot = 1.5 * k; kopDx = 34 * k; kopDy = 120 * k; }
  else { const pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6; kopRot = pik * 0.02; }
  voeten.forEach(([px, dx, lift]) => { const py = 52; const fx = px + 2 + dx, fy = py + 54 - lift;
    ctx.strokeStyle = poot; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(px, py + dein); ctx.lineTo(fx, fy); ctx.stroke();
    ctx.strokeStyle = rgba('#A07A2A', 0.7); ctx.lineWidth = 1.2; for (let k = 1; k < 5; k++) { const qx = px + (fx - px) * k / 5, qy = py + dein + (fy - py - dein) * k / 5; ctx.beginPath(); ctx.moveTo(qx - 3, qy); ctx.lineTo(qx + 3, qy); ctx.stroke(); }
    ctx.strokeStyle = poot; ctx.lineWidth = 4; const krul = lift > 2 ? 0.5 : 1; [[-22, 6], [0, 10], [20, 6]].forEach(([tx, ty]) => { ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + tx * krul, fy + ty * krul); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx - 12 * krul, fy - 4); ctx.stroke(); });
  ctx.translate(0, dein);
  [[-112, -150, -0.25], [-100, -156, -0.05], [-88, -146, 0.12], [-76, -128, 0.3]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(-70 + i * 4, -66); ctx.quadraticCurveTo(tx - 20, ty + 40, tx, ty); ctx.quadraticCurveTo(tx + 20, ty + 30, -50 + i * 4, -60); ctx.closePath();
    shape(ctx, _bioDonker(kleur, 0.38 + i * 0.04), _bioDonker(kleur, 0.55), 1.2); ctx.strokeStyle = rgba(licht, 0.35); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-62 + i * 4, -64); ctx.quadraticCurveTo(tx - 4, ty + 30, tx + 2, ty + 4); ctx.stroke(); });
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null);
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  if (o.kijkje) o.kijkje(ctx);
  ctx.save(); ctx.translate(76 + kopDx * 0.3, -64); ctx.rotate(kopRot * 0.6); ctx.translate(kopDx * 0.7, kopDy * 0.3);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null);
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.translate(24, -66); ctx.rotate(kopRot * 0.5); ctx.translate(-24, 66);
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null);
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null);
  ctx.strokeStyle = rgba('#A07A2A', 0.8); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(42, -64); ctx.lineTo(58, -62); ctx.stroke();
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill();
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill();
  _bioCirc(ctx, 30, -70, 5, '#E8A040', '#7A4A20', 1); _bioCirc(ctx, 30.6, -70, 2.6, '#121A26'); _bioCirc(ctx, 29.4, -71.4, 0.9, 'rgba(255,255,255,0.5)');
  ctx.restore(); ctx.restore();
}
// KIJKJE IN DE KIP: hart, bloedvat, lever (twee lobben, onder het hart) en buikvet achter in de buik (kip: vet vooral als buikvetkussen).
// Lokale kipcoördinaten. g = {bloed, lever, vet} 0..1 = goud oplichten; aan = 0..1 zichtbaar. Geeft ankerpunten (lokaal).
const KIP_ANKER = { vet: [-32, 20], bloed: [24, -6], lever: [50, 16], hart: [70, 0] };
function kipKijkje(g = {}, aan = 1) { return (ctx) => { if (aan <= 0.01) return; ctx.save(); ctx.globalAlpha *= aan;
  ctx.beginPath(); bioPad(ctx, [[-62, -8], [-20, -24], [40, -26], [88, -18], [86, 24], [40, 54], [-20, 48], [-62, 22]], true); ctx.clip(); // binnen de buiklijn
  ctx.beginPath(); bioPad(ctx, [[-58, -4], [-20, -20], [40, -22], [84, -14], [82, 22], [40, 50], [-20, 44], [-58, 20]], true); shape(ctx, '#3A2622', '#E0C2A8', 2);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(70, -2); ctx.bezierCurveTo(40, -14, -10, -10, -60, 6); ctx.stroke(); // aorta naar achter
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(30, -10); ctx.quadraticCurveTo(26, 14, 10, 40); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20, -6); ctx.quadraticCurveTo(-26, 20, -40, 44); ctx.stroke();
  if ((g.bloed || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= g.bloed; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(70, -2); ctx.bezierCurveTo(40, -14, -10, -10, -60, 6); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, [[-54, 4], [-30, 10], [-8, 26], [-14, 38], [-38, 32], [-56, 18]], true); shape(ctx, VET, (g.vet || 0) > 0.5 ? C.goud : '#C9B07A', (g.vet || 0) > 0.5 ? 3 : 1.5); // buikvet
  ctx.fillStyle = rgba('#C9B07A', 0.5); [[-44, 14], [-30, 22], [-20, 30], [-40, 24]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py, 5, 0, 6.283); ctx.fill(); });
  const lc = (g.lever || 0) > 0.5 ? C.goud : '#C98070';
  ctx.beginPath(); bioPad(ctx, [[30, 4], [54, -2], [74, 8], [66, 26], [44, 30], [30, 20]], true); shape(ctx, '#7A2E28', lc, (g.lever || 0) > 0.5 ? 3 : 1.5);
  ctx.beginPath(); bioPad(ctx, [[36, 22], [56, 20], [64, 32], [48, 38], [34, 34]], true); shape(ctx, '#8A3830', lc, (g.lever || 0) > 0.5 ? 3 : 1.5);
  ctx.beginPath(); ctx.ellipse(76, -4, 13, 16, 0.3, 0, 6.283); shape(ctx, '#B84A40', '#E08A7A', 1.5); // hart
  ctx.restore(); }; }

// ---------- EI ----------
function ei(ctx, x, y, r, kleur = '#C9925E', a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.beginPath(); ctx.moveTo(0, -r * 1.3); ctx.bezierCurveTo(r * 0.9, -r * 1.3, r * 1.05, r * 0.2, r, r * 0.45); ctx.bezierCurveTo(r * 0.9, r * 1.05, -r * 0.9, r * 1.05, -r, r * 0.45); ctx.bezierCurveTo(-r * 1.05, r * 0.2, -r * 0.9, -r * 1.3, 0, -r * 1.3); ctx.closePath();
  shape(ctx, kleur, o.rand || _bioDonker(kleur, 0.25), o.lw || 2); ctx.beginPath(); ctx.ellipse(-r * 0.35, -r * 0.45, r * 0.18, r * 0.35, -0.3, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.22); ctx.fill();
  if (o.stip) { const n = o.stip; for (let i = 0; i < n; i++) { const an = hash(i * 7 + 3) * 6.283, d = Math.sqrt(hash(i * 7 + 5)) * r * 0.62; circ(ctx, Math.cos(an) * d, Math.sin(an) * d * 1.1 + r * 0.05, Math.max(2.5, r * 0.09), C.oker, _bioDonker(C.oker, 0.3), 1); } }
  if (o.barst) { ctx.strokeStyle = '#4A3020'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-r * 0.75, -r * 0.6); ctx.lineTo(-r * 0.4, -r * 0.35); ctx.lineTo(-r * 0.5, -r * 0.05); ctx.lineTo(-r * 0.1, r * 0.1); ctx.lineTo(-r * 0.2, r * 0.4); ctx.lineTo(r * 0.25, r * 0.55); ctx.stroke(); }
  ctx.restore(); }

// ---------- MOLECULEN ----------
// PFAS (PFOS): koolstofketen van 8 C als zigzag, rondom fluoratomen (F), aan één kant een geladen kopgroep. Oker.
function pfasMol(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const pts = []; for (let i = 0; i < 8; i++) pts.push([-42 + i * 12, (i % 2 ? -5 : 5)]);
  ctx.strokeStyle = '#E8D9B0'; ctx.lineWidth = 1.5; pts.forEach(([px, py]) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + (py < 0 ? -11 : 11)); ctx.stroke(); circ(ctx, px, py + (py < 0 ? -13 : 13), 3.2, '#E8D9B0'); });
  ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.lineTo(52, 0); ctx.stroke();
  pts.forEach(([px, py]) => circ(ctx, px, py, 4.5, C.oker, _bioDonker(C.oker, 0.35), 1)); circ(ctx, 56, 0, 9, _bioDonker(C.oker, 0.25), lighten(C.oker, 0.3), 1.5); ctx.restore(); }
// DDT: twee ringen (benzeen, elk met een Cl) aan één koolstof met een CCl3-groep. Zandgeel.
function ddtMol(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const ring = (cx, cy) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + Math.PI / 6; ctx.lineTo(cx + Math.cos(an) * 13, cy + Math.sin(an) * 13); } ctx.closePath(); shape(ctx, rgba(DDTK, 0.3), DDTK, 3); };
  ctx.strokeStyle = DDTK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-17, 6); ctx.lineTo(0, 0); ctx.lineTo(17, 6); ctx.moveTo(0, 0); ctx.lineTo(0, -16); ctx.stroke();
  ring(-28, 12); ring(28, 12); ctx.beginPath(); ctx.moveTo(-41, 18); ctx.lineTo(-50, 24); ctx.moveTo(41, 18); ctx.lineTo(50, 24); ctx.stroke(); circ(ctx, -53, 26, 4.5, '#B8D0A0'); circ(ctx, 53, 26, 4.5, '#B8D0A0');
  [[-11, -26], [0, -31], [11, -26]].forEach(([px, py]) => { ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(px, py); ctx.stroke(); circ(ctx, px, py, 4.5, '#B8D0A0'); }); circ(ctx, 0, -16, 4, DDTK); circ(ctx, 0, 0, 4, DDTK); ctx.restore(); }
// ALBUMINE: één gevouwen kralenketting (± 60 aminozuren getekend), drie helixbundels in een hartvorm. Blauw.
const _ALB = (() => { const P = []; const n = 64; for (let i = 0; i < n; i++) { const u = i / n * 6.283; const r = 1 + 0.18 * Math.sin(3 * u) + 0.06 * Math.sin(7 * u); const helix = Math.sin(i * 1.75) * 0.11;
  P.push([Math.cos(u) * (r + helix) * 0.95 + Math.sin(u * 3) * 0.12, Math.sin(u) * (r + helix) * 0.8 + Math.cos(u * 2) * 0.1, Math.cos(i * 1.75)]); } return P; })();
function albumine(ctx, x, y, s = 60, a = 1, t = 0, o = {}) { if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a;
  const P = _ALB.map(([px, py, z], i) => { const w = wander(i + 300, t, 0.012, 0.6); return [x + (px + w.x) * s, y + (py + w.y) * s, z]; });
  ctx.strokeStyle = rgba(lighten(EIWIT, 0.3), 0.8); ctx.lineWidth = s * 0.07; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
  P.map((p, i) => [p, i]).sort((A, B) => A[0][2] - B[0][2]).forEach(([p]) => circ(ctx, p[0], p[1], s * (0.085 + 0.025 * p[2]), _mixHex(_bioDonker(EIWIT, 0.35), EIWIT, 0.5 + 0.5 * p[2]), lighten(EIWIT, 0.35), 1));
  ctx.restore(); return P; }
// punten op het oppervlak van een albumine waar PFAS aanhaakt (index in _ALB)
const ALB_PLEK = [6, 22, 37, 52];

// ---------- BLOED: rode bloedcel (deukschijf) ----------
function rodeCel(ctx, x, y, r, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.42, 0, 0, 6.283); shape(ctx, '#C0503E', '#E88A72', 1.5);
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.55, r * 0.18, 0, 0, 6.283); ctx.fillStyle = rgba('#8A2E24', 0.6); ctx.fill(); ctx.restore(); }
function vetDruppel(ctx, x, y, r, a = 1, gl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(VET, 0.28), gl > 0.5 ? C.goud : VET, gl > 0.5 ? 4 : 2.5);
  ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.4, r * 0.22, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.fill(); ctx.restore(); }

// ---------- POTJE (monsterpot met etiket) ----------
function potje(ctx, x, y, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = o.w || 120, h = o.h || 140, gl = o.gl || 0;
  roundRect(ctx, x - w / 2, y - h, w, h, 14); shape(ctx, rgba('#AFC0D0', 0.12), gl > 0.5 ? C.goud : '#AFC0D0', gl > 0.5 ? 4 : 2.5);
  roundRect(ctx, x - w / 2 - 6, y - h - 22, w + 12, 26, 6); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  if (o.inhoud) { ctx.save(); roundRect(ctx, x - w / 2 + 6, y - h * 0.62, w - 12, h * 0.62 - 6, 10); ctx.clip(); o.inhoud(x, y - h * 0.3, w, h); ctx.restore(); }
  if (lab) text(ctx, lab, x, y + 46, fTekst(36, 700), gl > 0.5 ? C.goud : C.text, 'center');
  if (o.stip) { const n = o.stip; for (let i = 0; i < n; i++) { const cx2 = x - w * 0.32 + (i % 5) * w * 0.16, cy2 = y - 18 - Math.floor(i / 5) * w * 0.16; circ(ctx, cx2, cy2, Math.max(5, w * 0.055), o.stipKl || C.oker, _bioDonker(o.stipKl || C.oker, 0.3), 1); } }
  ctx.restore(); }
function bloedBuis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -16, -110, 32, 120, 16); shape(ctx, rgba('#AFC0D0', 0.15), '#AFC0D0', 2.5);
  roundRect(ctx, -14, -60, 28, 66, 14); ctx.fillStyle = '#B84A40'; ctx.fill(); roundRect(ctx, -19, -126, 38, 22, 6); shape(ctx, '#5B8CC9', '#8FB0E0', 1.5); ctx.restore(); }

// ---------- REGENWORM (zijaanzicht, ringen en zadel) ----------
function regenworm(ctx, pts, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = o.r || 11, kl = '#C98A7A';
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = _bioDonker(kl, 0.25); ctx.lineWidth = r * 2 + 3; ctx.beginPath(); bioPad(ctx, pts); ctx.stroke();
  ctx.strokeStyle = kl; ctx.lineWidth = r * 2; ctx.beginPath(); bioPad(ctx, pts); ctx.stroke();
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const at = (u) => { let d = u * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i] || i === L.length - 1) { const f = L[i] ? d / L[i] : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f), Math.atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0])]; } d -= L[i]; } };
  const [zx, zy, za] = at(0.3); ctx.save(); ctx.translate(zx, zy); ctx.rotate(za); roundRect(ctx, -r * 2.2, -r * 1.1, r * 4.4, r * 2.2, r); shape(ctx, '#D8A090', null); ctx.restore(); // zadel (clitellum), dichter bij de kop
  ctx.strokeStyle = rgba(_bioDonker(kl, 0.35), 0.6); ctx.lineWidth = 1.5; for (let k = 1; k < 30; k++) { const [px, py, an] = at(k / 30); ctx.beginPath(); ctx.moveTo(px - Math.sin(an) * r * 0.9, py + Math.cos(an) * r * 0.9); ctx.lineTo(px + Math.sin(an) * r * 0.9, py - Math.cos(an) * r * 0.9); ctx.stroke(); }
  if (o.stip) { for (let i = 0; i < o.stip; i++) { const [px, py] = at(0.08 + 0.84 * hash(i * 13 + 2)); circ(ctx, px + (hash(i * 5) - 0.5) * r * 0.6, py + (hash(i * 9) - 0.5) * r * 0.6, Math.max(3, r * 0.32), C.oker, _bioDonker(C.oker, 0.3), 1); } }
  ctx.restore(); }

// ---------- VISSEN (zijaanzicht, kop rechts) ----------
// voorn: hoog lijf, zilver met grijsgroene rug, rode iris, oranjerode buik- en aarsvinnen. snoek: lang en laag, groen met lichte
// vlekken, platte 'eendensnavel', rug- en aarsvin ver naar achteren. Bron: RAVON soortbeschrijvingen (voorn, snoek).
function vis(ctx, x, y, len, soort = 'voorn', o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale((o.kijk || 1) * len / 200, len / 200);
  const t = o.t || 0, kw = Math.sin(t * 5) * 0.08; const snoek = soort === 'snoek'; const H = snoek ? 22 : 40;
  const rug = snoek ? '#4E6A3A' : '#5E7480', buik = snoek ? '#D8D2A0' : '#DCE2E6', zij = snoek ? '#6E8A4A' : '#AEBCC6', vin = snoek ? '#6E7A3A' : '#D8704E';
  ctx.save(); ctx.translate(-92, 0); ctx.rotate(kw); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-30, -H * 0.9); ctx.quadraticCurveTo(-18, 0, -30, H * 0.9); ctx.closePath(); shape(ctx, _bioDonker(rug, 0.1), null); ctx.restore(); // staart
  ctx.beginPath(); if (snoek) { ctx.moveTo(-60, -H * 0.6); ctx.lineTo(-74, -H * 1.75); ctx.lineTo(-52, -H * 1.6); ctx.lineTo(-40, -H * 0.6); } else { ctx.moveTo(-30, -H * 0.7); ctx.lineTo(-18, -H * 1.5); ctx.lineTo(4, -H * 1.45); ctx.lineTo(26, -H * 0.7); } ctx.closePath(); shape(ctx, snoek ? vin : _bioDonker(rug, 0.05), null); // rugvin
  ctx.beginPath(); ctx.moveTo(snoek ? -40 : -20, H * 0.55); ctx.lineTo(snoek ? -70 : -50, H * 1.22); ctx.lineTo(snoek ? -62 : -44, H * 0.55); ctx.closePath(); shape(ctx, vin, null); // aarsvin, schuin naar achteren
  ctx.beginPath(); ctx.moveTo(34, H * 0.6); ctx.lineTo(4, H * 1.15); ctx.lineTo(14, H * 0.6); ctx.closePath(); shape(ctx, vin, null); // buikvin, schuin naar achteren
  ctx.beginPath(); ctx.moveTo(-92, 0); if (snoek) { ctx.bezierCurveTo(-60, -H * 0.9, 30, -H * 1.15, 72, -H * 0.7); ctx.lineTo(126, -6); ctx.quadraticCurveTo(134, -3, 128, 0); ctx.lineTo(132, 4); ctx.quadraticCurveTo(110, 12, 74, H * 0.75); ctx.bezierCurveTo(40, H * 0.95, -40, H * 1.05, -92, 0); }
  else { ctx.bezierCurveTo(-60, -H * 0.9, 10, -H * 1.15, 80, -H * 0.55); ctx.quadraticCurveTo(100, -4, 100, 2); ctx.bezierCurveTo(70, H * 0.9, -40, H * 1.05, -92, 0); } ctx.closePath(); shape(ctx, zij, null);
  ctx.save(); ctx.clip(); ctx.fillStyle = rug; ctx.fillRect(-120, -80, 260, H * 1.4 - 40 + (snoek ? 8 : 0)); ctx.fillStyle = buik; ctx.beginPath(); ctx.ellipse(10, H * 0.75, 110, H * 0.5, 0, 0, 6.283); ctx.fill();
  if (snoek) { ctx.fillStyle = rgba('#E8E0A0', 0.6); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(-70 + (i % 7) * 22 + (i > 6 ? 10 : 0), (i > 6 ? 4 : -8), 5, 2.5, 0.2, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-80, 0); ctx.quadraticCurveTo(0, snoek ? -2 : -6, 90, -4); ctx.stroke(); ctx.restore(); // zijlijn
  ctx.beginPath(); ctx.moveTo(snoek ? 66 : 52, 6); ctx.lineTo(snoek ? 52 : 40, 22); ctx.lineTo(snoek ? 70 : 58, 12); ctx.closePath(); shape(ctx, _bioDonker(zij, 0.1), null); // borstvin
  ctx.strokeStyle = _bioDonker(zij, 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(snoek ? 74 : 60, -H * 0.5); ctx.quadraticCurveTo(snoek ? 66 : 54, 0, snoek ? 74 : 62, H * 0.5); ctx.stroke(); // kieuwdeksel
  if (snoek) { ctx.strokeStyle = _bioDonker(zij, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(130, 1); ctx.lineTo(96, 4); ctx.stroke(); } const ox = snoek ? 92 : 80, oy = snoek ? -10 : -10; circ(ctx, ox, oy, snoek ? 5 : 7, snoek ? '#E8C860' : '#C8463C'); circ(ctx, ox + 1, oy, snoek ? 2.5 : 3.5, '#121A26');
  if (o.stip) { const n = snoek ? Math.min(o.stip, 8) : o.stip; for (let i = 0; i < n; i++) circ(ctx, -60 + hash(i * 3.3) * 120, -H * 0.3 + hash(i * 7.1) * H * 0.6, snoek ? 4 : 6, C.oker, _bioDonker(C.oker, 0.3), 1); }
  if (o.plastic) { for (let i = 0; i < o.plastic; i++) { const px = -50 + hash(i * 4.4) * 110, py = -H * 0.3 + hash(i * 8.8) * H * 0.6; ctx.fillStyle = ['#7FB3D9', '#E8E8E8', '#E07A5F'][i % 3]; ctx.fillRect(px - 4, py - 3, 8, 6); } }
  ctx.restore(); }
// SLAKJE (gewone poelslak, Lymnaea stagnalis), zijaanzicht, kop rechts. Recept: spits, rechtsgewonden huisje (± 5 cm) met
// 5 windingen die naar de top snel kleiner worden; de laatste winding is groot en bol, met een ovale mondopening rechtsonder
// (opening naar de kijker als het huisje met de top naar linksboven wijst); naden als schuine bogen. Lichaam grijsbruin, plat,
// met twee platte driehoekige tentakels en de oogjes aan de basis. Bron: RAVON/Natuurbericht poelslak; WoRMS Lymnaea stagnalis.
// Bekende fouten: huisje als driehoek zonder windingen (las als zeilbootje).
function slakje(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.lineJoin = 'round';
  const huid = '#7E7462', huidD = '#5E5646', schelp = '#A07A4E', schelpD = '#6E5234', schelpL = '#C9A270';
  // voet en kop
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-46, -12, -24, -14); ctx.lineTo(48, -16); ctx.quadraticCurveTo(70, -16, 72, -4); ctx.quadraticCurveTo(70, 2, 60, 2); ctx.closePath(); shape(ctx, huid, huidD, 1.5);
  ctx.beginPath(); ctx.moveTo(56, -14); ctx.lineTo(86, -34); ctx.lineTo(70, -10); ctx.closePath(); shape(ctx, huid, huidD, 1.5); // tentakel (plat, driehoekig)
  ctx.beginPath(); ctx.moveTo(60, -12); ctx.lineTo(80, -20); ctx.lineTo(70, -6); ctx.closePath(); shape(ctx, huidD, null);
  circ(ctx, 58, -16, 3, '#121A26');
  // huisje: windingen langs een as van de mond (rechtsonder) naar de top (linksboven)
  const as0 = [8, -34], as1 = [-58, -132]; const W2 = [[1.0, 36], [0.52, 24], [0.3, 16], [0.17, 10], [0.09, 6]];
  const P = (u) => [as0[0] + (as1[0] - as0[0]) * u, as0[1] + (as1[1] - as0[1]) * u];
  ctx.beginPath(); ctx.moveTo(...P(1)); [[0.85, 8], [0.6, 18], [0.35, 30], [0.1, 40], [-0.05, 38]].forEach(([u, r]) => { const [px, py] = P(u); ctx.lineTo(px - r * 0.83, py - r * 0.55 + r * 0.1); });
  ctx.quadraticCurveTo(-30, 10, 10, 2); ctx.quadraticCurveTo(46, -4, 44, -34); [[0.1, 30], [0.35, 22], [0.6, 12], [0.85, 6]].forEach(([u, r]) => { const [px, py] = P(u); ctx.lineTo(px + r * 0.83, py + r * 0.55 - r * 0.6); }); ctx.closePath();
  shape(ctx, schelp, schelpD, 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = schelpD; ctx.lineWidth = 2.5; [0.22, 0.45, 0.64, 0.8, 0.91].forEach((u) => { const [px, py] = P(u), r = 44 * (1 - u) + 6; ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.42, -0.98, 0.15, Math.PI - 0.15); ctx.stroke(); });
  ctx.strokeStyle = rgba(schelpL, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-40, -44); ctx.quadraticCurveTo(-18, -70, -40, -100); ctx.stroke(); ctx.restore();
  ctx.beginPath(); ctx.ellipse(22, -22, 16, 24, -0.5, 0, 6.283); shape(ctx, '#3E3226', schelpL, 2.5); // mondopening
  if (o.stip) { for (let i = 0; i < o.stip; i++) circ(ctx, -26 + (i % 3) * 14, -40 - Math.floor(i / 3) * 16, 5, C.oker, _bioDonker(C.oker, 0.3), 1); }
  ctx.restore(); }

// ---------- ZEEAREND (Haliaeetus albicilla), zwevend, van onderen gezien ----------
// Recept: spanwijdte ± 2,2 m bij ± 0,9 m lichaamslengte (vleugel ± 2,4× de romp); brede rechthoekige 'deur'-vleugels met 6–7 diep
// gespreide handpennen (vingers); korte, wigvormige witte staart (adult); lichtbruine kop en hals, zware gele haaksnavel; romp en
// vleugels donkerbruin, ondervleugeldekveren donkerder dan de slagpennen. Bron: Vogelbescherming / Sovon soortpagina zeearend; RSPB.
// Bekende fouten: smalle valkenvleugels; lange staart; zwarte kop. Kop wijst naar boven; o.kijk ±1 kantelt de vogel in de vliegrichting.
function zeearend(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot != null ? o.rot : (o.kijk || -1) * 0.32); ctx.scale(s, s);
  const t = o.t || 0, slag = (o.slag == null ? 0.15 : o.slag) * Math.sin(t * 2.4); const bruin = '#5E4632', donker = '#3E2E22', pen = '#4A382A', kop = '#C9AE84';
  const dy = (px) => slag * Math.pow(Math.abs(px) / 230, 1.4) * 60; // vleugelpunt gaat op en neer
  for (const k of [-1, 1]) { const P = (px, py) => [k * px, py + dy(px)];
    ctx.beginPath(); ctx.moveTo(...P(14, -34)); [P(70, -52), P(130, -56), P(178, -52)].forEach(p => ctx.lineTo(...p));
    const hb = [176, -12]; [-1.05, -0.65, -0.3, 0.05, 0.4, 0.75].forEach((an, i) => { const L = 72 - Math.abs(i - 2.5) * 5, w = 0.1; // 6 diep gespreide handpennen
      ctx.lineTo(...P(hb[0] + Math.cos(an - w) * 22, hb[1] + Math.sin(an - w) * 22)); ctx.lineTo(...P(hb[0] + Math.cos(an - 0.03) * L, hb[1] + Math.sin(an - 0.03) * L)); ctx.lineTo(...P(hb[0] + Math.cos(an + 0.05) * (L - 6), hb[1] + Math.sin(an + 0.05) * (L - 6))); ctx.lineTo(...P(hb[0] + Math.cos(an + w) * 22, hb[1] + Math.sin(an + w) * 22)); });
    [P(176, 26), P(130, 32), P(70, 30), P(18, 24)].forEach(p => ctx.lineTo(...p)); ctx.closePath(); shape(ctx, pen, null);
    ctx.beginPath(); [P(16, -32), P(70, -50), P(130, -54), P(170, -48), P(160, -10), P(110, -4), P(60, -6), P(18, -4)].forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = donker; ctx.fill(); // ondervleugeldekveren
    ctx.strokeStyle = rgba('#8A7058', 0.55); ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { const px = 40 + i * 22; ctx.beginPath(); ctx.moveTo(...P(px, 0)); ctx.lineTo(...P(px + 4, 28)); ctx.stroke(); } }
  ctx.beginPath(); ctx.moveTo(-16, 54); ctx.lineTo(-30, 104); ctx.lineTo(0, 116); ctx.lineTo(30, 104); ctx.lineTo(16, 54); ctx.closePath(); shape(ctx, '#F2EFE6', '#C8C2B4', 1.5); // witte wigstaart
  ctx.beginPath(); ctx.ellipse(0, 4, 28, 60, 0, 0, 6.283); shape(ctx, bruin, null);
  ctx.beginPath(); ctx.ellipse(0, -60, 20, 24, 0, 0, 6.283); shape(ctx, kop, null); // kop en hals
  ctx.beginPath(); ctx.moveTo(-9, -80); ctx.quadraticCurveTo(0, -104, 9, -80); ctx.lineTo(4, -78); ctx.quadraticCurveTo(0, -84, -4, -78); ctx.closePath(); shape(ctx, '#E8C040', '#B8902A', 1.5); // snavel
  ctx.fillStyle = '#E8C040'; ctx.beginPath(); ctx.ellipse(-9, 52, 6, 9, 0, 0, 6.283); ctx.ellipse(9, 52, 6, 9, 0, 0, 6.283); ctx.fill(); // poten ingetrokken
  if (o.stip) { for (let i = 0; i < o.stip; i++) circ(ctx, -16 + hash(i * 2.7) * 32, -30 + hash(i * 5.3) * 70, 5.5, C.oker, _bioDonker(C.oker, 0.3), 1); }
  ctx.restore(); }


// ZEEAREND zittend, zijaanzicht (voor schema-iconen): rechtop, donkerbruin lijf, lichte kop, zware gele haaksnavel, witte wigstaart
// schuin naar onder, gele poten. Kop rechts. x, y = grondpunt (tenen), hoogte ± 200 × s.
function zeearendZit(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.lineJoin = 'round';
  const bruin = '#5E4632', donker = '#3E2E22', kop = '#D2BA92';
  ctx.beginPath(); ctx.moveTo(-26, -70); ctx.lineTo(-64, -6); ctx.lineTo(-40, 0); ctx.lineTo(-14, -60); ctx.closePath(); shape(ctx, '#F2EFE6', '#C8C2B4', 1.5); // witte wigstaart
  ctx.beginPath(); bioPad(ctx, [[-30, -60], [-22, -130], [8, -168], [32, -150], [34, -100], [22, -44], [-4, -30]], true); shape(ctx, bruin, null); // lijf
  ctx.beginPath(); bioPad(ctx, [[-26, -70], [-24, -132], [0, -156], [14, -120], [6, -70], [-12, -50]], true); shape(ctx, donker, null); // gevouwen vleugel
  ctx.strokeStyle = rgba('#8A7058', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-20 + i * 6, -96 + i * 8); ctx.lineTo(-30 + i * 6, -62 + i * 4); ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, [[2, -160], [10, -196], [34, -206], [52, -192], [44, -166], [30, -146]], true); shape(ctx, kop, null); // kop en hals
  ctx.beginPath(); ctx.moveTo(48, -196); ctx.quadraticCurveTo(74, -196, 74, -176); ctx.quadraticCurveTo(70, -168, 64, -172); ctx.quadraticCurveTo(62, -180, 46, -180); ctx.closePath(); shape(ctx, '#E8C040', '#B8902A', 1.5); // haaksnavel
  circ(ctx, 40, -192, 3.5, '#E8C040'); circ(ctx, 40.5, -192, 1.8, '#121A26');
  ctx.strokeStyle = '#E8C040'; ctx.lineWidth = 6; ctx.lineCap = 'round'; [[2, -38, 0, -6], [14, -38, 16, -6]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.stroke(); });
  ctx.lineWidth = 3; [[0, -4], [16, -4]].forEach(([px, py]) => { [[-10, 2], [10, 2], [14, 0]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + dx, py + dy); ctx.stroke(); }); });
  if (o.stip) { for (let i = 0; i < o.stip; i++) circ(ctx, -14 + hash(i * 2.7) * 34, -136 + hash(i * 5.3) * 80, 5, C.oker, _bioDonker(C.oker, 0.3), 1); }
  ctx.restore(); }

// ---------- WATERDRUPPEL ----------
function druppel(ctx, x, y, r, a = 1, stip = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.bezierCurveTo(x + r * 0.4, y - r * 0.8, x + r, y - r * 0.2, x + r, y + r * 0.2); ctx.arc(x, y + r * 0.2, r, 0, Math.PI); ctx.bezierCurveTo(x - r, y - r * 0.2, x - r * 0.4, y - r * 0.8, x, y - r * 1.6); ctx.closePath(); shape(ctx, rgba(C.teal, 0.4), C.teal, 2.5);
  for (let i = 0; i < stip; i++) circ(ctx, x - r * 0.3 + i * r * 0.5, y + r * 0.3, Math.max(4, r * 0.14), C.oker); ctx.restore(); }

// ---------- KLEMBORD met regels en vinkjes ----------
function klembord(ctx, x, y, w, kop, regels, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 64, h = 110 + regels.length * lh + 20;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#8A6A44', '#5A4430', 2); roundRect(ctx, x + 16, y + 26, w - 32, h - 40, 6); shape(ctx, '#F2EEE4', null);
  roundRect(ctx, x + w / 2 - 60, y - 12, 120, 40, 8); shape(ctx, '#AFB6C0', '#6E7480', 2);
  if (kop) text(ctx, kop, x + 40, y + 84, fTekst(30, 800), '#5A6478', 'left');
  regels.forEach((r, i) => { const [s2, ra, vk] = Array.isArray(r) ? r : [r, 1, 0]; const yy = y + 84 + (kop ? 30 : -20) + (i + 0.7) * lh; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.strokeRect(x + 40, yy - 30, 32, 32);
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 90, yy, fTekst(o.px || 36, 700), '#2A3446', 'left'); ctx.restore(); }
    if (vk > 0.01) vink_(ctx, x + 56, yy - 16, 14, vk, '#3E8A58'); });
  ctx.restore(); return h; }

// ---------- TELEFOON met een foto van Daan ----------
function fotoTelefoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -160, 180, 320, 26); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, -76, -140, 152, 280, 12); shape(ctx, '#BFD6C2', null);
  ctx.save(); roundRect(ctx, -76, -140, 152, 280, 12); ctx.clip(); ctx.fillStyle = '#7FB08A'; ctx.fillRect(-76, 40, 152, 100); // gras
  persoon(ctx, 'daan', -10, 132, 250, { kijk: 1, uit: 'lacht', outfit: 'veld' });
  vlinder(ctx, 46, -96, 0.8); ctx.restore(); ctx.restore(); }
function vlinder(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 14, -8, 16, 12, k * 0.5, 0, 6.283); shape(ctx, '#E0903A', '#5A3A1A', 1.5); ctx.beginPath(); ctx.ellipse(k * 11, 9, 10, 8, -k * 0.4, 0, 6.283); shape(ctx, '#E0903A', '#5A3A1A', 1.5); circ(ctx, k * 18, -10, 3, '#2A1A10'); }
  ctx.strokeStyle = '#2A1A10'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, 16); ctx.stroke(); ctx.restore(); }
// badge aan een koord
function badge(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 22 * s, y - 60 * s); ctx.lineTo(x, y - 18 * s); ctx.lineTo(x + 22 * s, y - 60 * s); ctx.stroke();
  roundRect(ctx, x - 20 * s, y - 18 * s, 40 * s, 52 * s, 5 * s); shape(ctx, '#F2EEE4', '#9AA3B2', 1.5); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(x - 20 * s, y - 18 * s, 40 * s, 12 * s); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 12 * s, y + 4 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y + 14 * s, 18 * s, 4 * s); ctx.restore(); }
// koeltas voor monsters
function koeltas(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -70, -86, 140, 86, 12); shape(ctx, '#3E7A9A', '#2E5A72', 2); roundRect(ctx, -76, -100, 152, 24, 8); shape(ctx, '#E8E2D4', '#B8B0A0', 2);
  ctx.strokeStyle = '#2A2F3E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, -100); ctx.quadraticCurveTo(0, -150, 40, -100); ctx.stroke(); roundRect(ctx, -30, -60, 60, 30, 4); shape(ctx, '#F2EEE4', null); ctx.restore(); }
function etiket(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -22, -14, 44, 28, 4); shape(ctx, '#F2EEE4', '#9AA3B2', 1.5); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-14, -5, 28, 3); ctx.fillRect(-14, 3, 20, 3); ctx.restore(); }

// ---------- MEETAPPARAAT (vereenvoudigd: LC-MS/MS 'sorteert moleculen op gewicht') ----------
function apparaat(ctx, x, y, w, h, u = 0, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, '#C9D2DE', '#8FA0B5', 2.5); roundRect(ctx, x + 30, y + 40, w - 60, h - 120, 10); shape(ctx, '#1A2740', '#5A6478', 2);
  roundRect(ctx, x - 50, y + h / 2 - 20, 60, 40, 8); shape(ctx, '#8FA0B5', '#5A6478', 2); // inlaat
  for (let k = 0; k < 3; k++) circ(ctx, x + w - 60 - k * 36, y + h - 40, 10, k === 0 ? C.groen : '#5A6478');
  if (u > 0.01) { const banen = [y + 90, y + 140, y + 190]; banen.forEach(by => { ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 50, by); ctx.lineTo(x + w - 50, by); ctx.stroke(); });
    for (let i = 0; i < 12; i++) { const baan = i % 3, sp = 0.35 + baan * 0.25, ph = ((t * sp * 0.4 + hash(i * 3.1)) % 1); const px = x + 50 + ph * (w - 100), py = banen[baan] + Math.sin(ph * 12 + i) * 4;
      ctx.save(); ctx.globalAlpha *= u; if (baan === 1) pfasMol(ctx, px, py, 0.32, 0); else circ(ctx, px, py, baan === 0 ? 6 : 9, baan === 0 ? '#9AA3B2' : '#C9B896'); ctx.restore(); }
    metaA(ctx, 'LICHT', x + 60, y + 82, u, C.text2, 'left', 28); metaA(ctx, 'ZWAAR', x + 60, y + 214, u, C.text2, 'left', 28); }
  ctx.restore(); }
// uitslag als grafiek: piek bij de PFOA-plek; grens = stippellijn (bepalingsgrens)
function uitslag(ctx, x, y, w, h, kop, piek, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), o.rand || rgba(C.line, 0.85), 2); metaText(ctx, kop, x + 24, y + 44, o.kopKl || C.goud, 'left', 28);
  const gx = x + 40, gy = y + h - 40, gw = w - 80, gh = h - 110; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
  const gr = gy - gh * 0.28; if ((o.grens || 0) > 0.01) { stippel(ctx, gx, gr, gx + gw, gr, C.goud, o.grens, 3); }
  const pk = piek * gh, col = o.piekKl || C.text; ctx.strokeStyle = col; ctx.lineWidth = o.piekKl === C.goud ? 5 : 3.5; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const u = i / 120, px = gx + u * gw; const ruis = (hash(i * 3.7 + (o.seed || 1)) - 0.5) * gh * 0.05; const v = Math.exp(-Math.pow((u - 0.55) / 0.035, 2)) * pk + gh * 0.05 + ruis; i ? ctx.lineTo(px, gy - v) : ctx.moveTo(px, gy - v); } ctx.stroke();
  metaText(ctx, 'PFOA', gx + gw * 0.55, gy + 32, C.text2, 'center', 28);
  ctx.restore(); return { gx, gy, gw, gh, gr }; }

// ---------- TIJDBALK (H1): hoeveelheid die over de tijd overblijft ----------
// soort 'ddt' (band wordt dunner: halveert), 'pfas' (blijft), 'mp' (blokjes vallen in stukjes). u = 0..1 hoe ver de tijd loopt.
function tijdBalk(ctx, x, y, w, soort, u, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const H0 = 70;
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + H0 / 2 + 10); ctx.lineTo(x + w, y + H0 / 2 + 10); ctx.stroke();
  const xe = x + w * clamp(u, 0, 1);
  if (soort === 'ddt') { ctx.beginPath(); ctx.moveTo(x, y - H0 / 2); for (let i = 0; i <= 60; i++) { const px = x + (xe - x) * i / 60, f = (px - x) / w; const hh = H0 * Math.pow(0.5, f * 2.2); ctx.lineTo(px, y + H0 / 2 - hh); } ctx.lineTo(xe, y + H0 / 2); ctx.lineTo(x, y + H0 / 2); ctx.closePath(); shape(ctx, rgba(DDTK, 0.55), DDTK, 2.5); }
  else if (soort === 'pfas') { roundRect(ctx, x, y - H0 / 2, Math.max(1, xe - x), H0, 6); shape(ctx, rgba(C.oker, 0.55), C.oker, 2.5); }
  else { const n = 7; for (let i = 0; i < n; i++) { const bx = x + i * w / n, f = i / (n - 1); if (bx > xe) break; const k = Math.pow(2, Math.round(f * 4)); const zij = H0 / Math.sqrt(k) * 0.9;
      for (let j = 0; j < Math.min(k, 16); j++) { const jx = bx + 20 + (j % 4) * (zij + 4), jy = y + H0 / 2 - zij - Math.floor(j / 4) * (zij + 4); ctx.fillStyle = MPK; ctx.save(); ctx.translate(jx + zij / 2, jy + zij / 2); ctx.rotate(hash(i * 9 + j) * 0.8 - 0.4); ctx.fillRect(-zij / 2, -zij / 2, zij, zij * 0.8); ctx.restore(); } } }
  ctx.restore(); }

// ---------- NEDERLAND (omtrek uit Ecologie 2 · Stikstof, ec_reeks.js) ----------
const NL_LONLAT = [[3.37, 51.37], [3.52, 51.44], [3.44, 51.54], [3.62, 51.62], [3.72, 51.72], [3.86, 51.82], [4.12, 51.98], [4.27, 52.12], [4.43, 52.28], [4.57, 52.46], [4.63, 52.7], [4.71, 52.9], [4.76, 52.96],
  [5.05, 52.93], [5.4, 53.08], [5.42, 53.2], [5.6, 53.32], [5.95, 53.4], [6.25, 53.41], [6.6, 53.44], [6.88, 53.45], [6.95, 53.33], [7.2, 53.24], [7.21, 53.0], [7.07, 52.65], [6.72, 52.62], [6.7, 52.48],
  [7.06, 52.42], [7.0, 52.23], [6.76, 52.1], [6.7, 51.92], [6.4, 51.83], [6.16, 51.88], [5.96, 51.8], [6.1, 51.66], [6.22, 51.5], [6.08, 51.23], [5.88, 51.05], [6.08, 50.84], [5.98, 50.76], [5.7, 50.76],
  [5.65, 50.84], [5.78, 51.08], [5.84, 51.16], [5.56, 51.27], [5.12, 51.43], [4.83, 51.42], [4.67, 51.44], [4.53, 51.48], [4.4, 51.37], [4.24, 51.37], [3.98, 51.22], [3.68, 51.27], [3.37, 51.3]];
const NL_IJSSEL = [[5.08, 52.64], [5.3, 52.6], [5.65, 52.6], [5.85, 52.62], [5.6, 52.82], [5.4, 52.95], [5.28, 53.0], [5.07, 52.92], [5.02, 52.72]];
function nlIn(pts, lo, la) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > la) !== (yj > la) && lo < (xj - xi) * (la - yi) / (yj - yi) + xi) c = !c; } return c; }
function nlXY(lon, lat) { return [(lon - 3.3) * 0.616, 53.6 - lat]; }
// 60 meetplekken (schematisch, niet de echte plekken); 31 daarvan koraal
const NL_PLEK = (() => { const P = []; let k = 0; while (P.length < 60 && k < 5000) { k++; const lo = 3.5 + hash(k * 1.7) * 3.6, la = 50.85 + hash(k * 2.9 + 1) * 2.5; if (nlIn(NL_LONLAT, lo, la) && !nlIn(NL_IJSSEL, lo, la) && P.every(p => Math.hypot(p[0] - lo, p[1] - la) > 0.17)) P.push([lo, la, hash(k * 5.3) ]); }
  const order = P.map((p, i) => [p[2], i]).sort((a2, b) => a2[0] - b[0]); order.forEach(([, i], r) => { P[i][2] = r < 31; }); return P; })();
function nederland(ctx, x, y, s, o = {}) { const { a = 1, vul = rgba(C.groen, 0.12), rand = rgba(C.groen, 0.6) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const xy = (lo, la) => { const [u, v] = nlXY(lo, la); return [x + u * s, y + v * s]; };
  ctx.beginPath(); NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  const st = o.stippen || 0, ko = o.koraal || 0; NL_PLEK.forEach(([lo, la, rood], i) => { const ai = clamp(st * 60 - i, 0, 1); if (ai <= 0.01) return; const [px, py] = xy(lo, la); const kl = rood ? _mixHex('#C9CED6', C.koraal, ko) : '#C9CED6'; ctx.save(); ctx.globalAlpha *= ai; circ(ctx, px, py, 9, kl, '#121A26', 2); ctx.restore(); });
  ctx.restore(); }

// ---------- GRAFIEK concentratie × plek in de keten (H3) ----------
const GR = { x: 180, y: 250, w: 1080, h: 500 };
const KETEN = [['water', 'water'], ['slak', 'slakje'], ['voorn', 'kleine vis'], ['snoek', 'roofvis'], ['arend', 'arend']];
function ketenIcoon(ctx, soort, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; if (soort === 'water') druppel(ctx, x, y - 6, 26 * s, a, o.stip ? 1 : 0); else if (soort === 'slak') slakje(ctx, x - 6 * s, y + 30 * s, 0.75 * s, a, { stip: o.stip }); else if (soort === 'voorn') vis(ctx, x, y, 120 * s, 'voorn', { a, stip: o.stip, plastic: o.plastic, t: o.t }); else if (soort === 'snoek') vis(ctx, x, y, 170 * s, 'snoek', { a, stip: o.stip, t: o.t }); else zeearendZit(ctx, x, y + 34 * s, 0.4 * s, { a, stip: o.stip }); }
function grafiekAssen(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { x, y, w, h } = GR;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  metaText(ctx, 'CONCENTRATIE', x - 20, y - 24, C.text2, 'left', 28); metaText(ctx, 'PLEK IN DE KETEN →', x + w, y + h + 40, C.text2, 'right', 28);
  if (o.iconen !== false) KETEN.forEach(([k], i) => ketenIcoon(ctx, k, GX(i), y + h - 46, 0.62, 0.9));
  metaText(ctx, 'SCHEMATISCH', x + 20, y + 30, C.text2, 'left', 28); ctx.restore(); }
const GX = (i) => GR.x + 110 + i * 205;
const GY = (v) => GR.y + GR.h - 110 - v * (GR.h - 150); // v 0..1
function grafiekLijn(ctx, vals, col, u = 1, a = 1, o = {}) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = vals.length, uu = u * (n - 1);
  ctx.strokeStyle = col; ctx.lineWidth = o.lw || 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (o.stip) ctx.setLineDash([12, 10]); ctx.beginPath();
  for (let i = 0; i <= Math.floor(uu); i++) { const px = GX(i), py = GY(vals[i]); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  const f = uu - Math.floor(uu), i0 = Math.floor(uu); if (f > 0 && i0 < n - 1) ctx.lineTo(lerp(GX(i0), GX(i0 + 1), f), lerp(GY(vals[i0]), GY(vals[i0 + 1]), f)); ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i <= Math.min(n - 1, Math.floor(uu)); i++) { if (o.vierkant) { ctx.fillStyle = col; ctx.fillRect(GX(i) - 9, GY(vals[i]) - 9, 18, 18); } else circ(ctx, GX(i), GY(vals[i]), 9, col, '#121A26', 2); if (o.spreid) { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(GX(i), GY(vals[i]) - o.spreid[i]); ctx.lineTo(GX(i), GY(vals[i]) + o.spreid[i]); ctx.stroke(); } }
  ctx.restore(); }
const DDT_V = [0.02, 0.15, 0.36, 0.62, 0.95], PFOS_V = [0.06, 0.14, 0.24, 0.36, 0.46], PFOS_S = [10, 26, 40, 54, 62], MP_V = [0.12, 0.11, 0.12, 0.1, 0.1];

// injectiespuit (vaccinatie)
function spuit(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5); roundRect(ctx, -60, -14, 100, 28, 6); shape(ctx, rgba('#DCE5EC', 0.6), '#AFC0D0', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-20, -10, 56, 20);
  ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-90, -4, 30, 8); ctx.fillRect(-96, -18, 8, 36); ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(84, 0); ctx.stroke(); ctx.restore(); }
// antistof (Y), klein
function antistof(ctx, x, y, s = 1, a = 1, kl = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-16, -20); ctx.moveTo(0, 0); ctx.lineTo(16, -20); ctx.stroke(); ctx.restore(); }
// personenweegschaal onder de voeten
function weegschaal(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 6, 180, 26, 10); shape(ctx, '#DCE2E8', '#8FA0B5', 2); roundRect(ctx, x - 40, y + 2, 80, 14, 4); shape(ctx, '#1A2740', null);
  if (s2) text(ctx, s2, x, y + 15, fTekst(14, 800), C.groen, 'center'); ctx.restore(); }

// ---------- NEST met eieren (H4) ----------
function nest(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const n = o.eieren == null ? 2 : o.eieren; for (let i = 0; i < n; i++) { if (o.barst && i === 1) { ctx.save(); ctx.translate(26, -14); ctx.beginPath(); ctx.moveTo(-20, 8); ctx.lineTo(-16, -8); ctx.lineTo(-8, -2); ctx.lineTo(0, -12); ctx.lineTo(8, -3); ctx.lineTo(16, -10); ctx.lineTo(20, 8); ctx.quadraticCurveTo(0, 18, -20, 8); ctx.closePath(); shape(ctx, '#E8E2D4', C.koraal, 2); ctx.restore(); } else ei(ctx, -26 + i * 52, -22, 22, '#E8E2D4', 1, { barst: o.barst && i === 0, rand: o.dun ? C.koraal : null, lw: 2 }); }
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 34, 0, 0, Math.PI); ctx.lineTo(-110, -6); ctx.closePath(); shape(ctx, '#6A5034', null); ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 3;
  for (let i = 0; i < 16; i++) { const a0 = hash(i * 3) * 3.14, x0 = Math.cos(a0) * 100, y0 = Math.sin(a0) * 26; ctx.beginPath(); ctx.moveTo(x0 - 30, y0 - 4); ctx.lineTo(x0 + 30, y0 + (hash(i) - 0.5) * 16); ctx.stroke(); }
  ctx.restore(); }

// ---------- DOSSIER / map ----------
function dossier(ctx, x, y, w, h, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0);
  ctx.fillStyle = o.kl || '#C9A35C'; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(-w / 2 + 90, -h / 2); ctx.lineTo(-w / 2 + 110, -h / 2 + 18); ctx.lineTo(w / 2, -h / 2 + 18); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2, h / 2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#F2EAD8'; ctx.fillRect(-w / 2 + 16, -h / 2 + 34, w - 32, h - 50); if (lab) { text(ctx, lab, 0, -h / 2 + 90, fTekst(30, 800), '#3A3026', 'center'); }
  ctx.strokeStyle = '#B8A88A'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 40, -h / 2 + 124 + i * 22); ctx.lineTo(w / 2 - 40 - (i % 2) * 50, -h / 2 + 124 + i * 22); ctx.stroke(); } ctx.restore(); }

// ---------- BUREAU (kantoor van de omgevingsdienst, op navy) ----------
function bureau(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  ctx.fillStyle = '#4A5468'; ctx.fillRect(x + 20, y + 22, 16, GROND - y - 22); ctx.fillRect(x + w - 36, y + 22, 16, GROND - y - 22);
  roundRect(ctx, x + w - 250, y - 180, 220, 140, 8); shape(ctx, '#1E232C', '#5A6070', 3); ctx.fillStyle = '#5A6070'; ctx.fillRect(x + w - 150, y - 40, 20, 40); roundRect(ctx, x + w - 236, y - 166, 192, 112, 4); shape(ctx, '#22304A', null);
  lijn(ctx, [[x + w - 220, y - 80], [x + w - 180, y - 110], [x + w - 140, y - 96], [x + w - 70, y - 150]], C.goud, 3); ctx.restore(); }

// ---------- kleine iconen voor de recap ----------
function icoonMeten(ctx, x, y) { apparaatMini(ctx, x, y); }
function apparaatMini(ctx, x, y) { roundRect(ctx, x - 50, y - 34, 100, 68, 8); shape(ctx, '#C9D2DE', '#8FA0B5', 2); roundRect(ctx, x - 38, y - 24, 76, 36, 4); shape(ctx, '#1A2740', null); lijn(ctx, [[x - 32, y + 6], [x - 6, y + 4], [x, y - 18], [x + 6, y + 4], [x + 32, y + 6]], C.goud, 2.5); }
