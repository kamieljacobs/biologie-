// Wat word jij? · Gezondheidswetenschappen 2 · Screenen of niet? — eigen tekeningen (31 okt 2026)
// Seriekleuren deze film: teal = niets gevonden / gezond, oker = poliep (voorstadium), koraal = kanker, groen = weggehaald of gewonnen, goud = focus en afkapwaarde.
// Gebruikt de hulpjes uit teken_gz1.js (antwoord, metaA, laag, popje, echtKaart, filmKaartje, kantoor, recapKaart).

const LOKAAL = '#0D1420';
// ---------- decor Opa Henk (hal + keuken) ----------
function henkVlak(ctx, sterkte = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG.henk; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= sterkte; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); } ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const HENKPLEK = { mat: [318, 700], brief: [330, 438], tafel: 545, tafelX: [1180, 1760], grond: 862 };

// ---------- envelop, buisje, folder, pen ----------
function envelop(ctx, x, y, w, a = 1, rot = 0, o = {}) { if (a <= 0.01) return; const h = w * 0.62; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, w * 0.04); shape(ctx, '#ECE6D6', '#B9B2A0', 1.5);
  ctx.strokeStyle = '#B9B2A0'; ctx.lineWidth = Math.max(1.2, w * 0.012); ctx.beginPath(); ctx.moveTo(-w / 2 + 2, -h / 2 + 2); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 2, -h / 2 + 2); ctx.stroke();
  ctx.fillStyle = o.band || '#5B8CC9'; ctx.fillRect(-w / 2 + w * 0.08, h * 0.22, w * 0.42, h * 0.08); ctx.fillRect(-w / 2 + w * 0.08, h * 0.34, w * 0.28, h * 0.06);
  if (o.open) { ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, -h * 1.05); ctx.lineTo(w / 2, -h / 2); ctx.closePath(); shape(ctx, '#E2DBC8', '#B9B2A0', 1.5); }
  ctx.restore(); }
function buisje(ctx, x, y, s, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -14, -60, 28, 96, 12); shape(ctx, '#DCE5EC', '#9AA8B8', 2); ctx.fillStyle = rgba('#AFC0D0', 0.55); roundRect(ctx, -10, 6, 20, 24, 8); ctx.fill();
  roundRect(ctx, -18, -84, 36, 30, 8); shape(ctx, '#5B8CC9', '#3E6FA8', 2); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-12, -40, 24, 26); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-8, -34, 16, 3); ctx.fillRect(-8, -26, 12, 3); ctx.restore(); }
function folder(ctx, x, y, w, a = 1, rot = 0) { if (a <= 0.01) return; const h = w * 1.35; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, 6); shape(ctx, '#F2F2EE', '#B9B2A0', 1.5); ctx.fillStyle = '#5B8CC9'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.2);
  ctx.fillStyle = '#B8C0CC'; for (let i = 0; i < 5; i++) ctx.fillRect(-w * 0.38, -h * 0.12 + i * h * 0.11, w * (i % 2 ? 0.55 : 0.76), Math.max(2, h * 0.035)); ctx.restore(); }
function pen(ctx, x, y, l, a = 1, rot = -0.6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -l / 2, -6, l, 12, 6); shape(ctx, '#3E6FA8', '#2E5580', 1.5); ctx.beginPath(); ctx.moveTo(l / 2, -6); ctx.lineTo(l / 2 + 18, 0); ctx.lineTo(l / 2, 6); ctx.closePath(); shape(ctx, '#E6E1D3', null); ctx.restore(); }

// ---------- de tijdlijn onderin (rode draad: steeds opnieuw wegen) ----------
const TL = { y: 812, x0: 150, x1: 1700, p: { 1968: 220, 2009: 520, j14: 760, l14: 900, 2015: 1035, 2019: 1170, 2022: 1360, 2026: 1590 },
  naam: { 1968: '1968', 2009: '2009', j14: 'JAN 2014', l14: 'JUL 2014', 2015: '2015', 2019: '2019', 2022: '2022', 2026: '2026' } };
// o.zicht = {sleutel: alpha}, o.hl = sleutel (gouden ring), o.label = [sleutel, tekst, alpha, kleur], o.y
function tijdlijn(ctx, a = 1, o = {}) { if (a <= 0.01) return; const y = o.y || TL.y; ctx.save(); ctx.globalAlpha *= a;
  if (o.band) { ctx.fillStyle = rgba('#121A26', 0.8); ctx.fillRect(0, y - 26, W, 76); }
  lijn(ctx, [[TL.x0, y], [350, y]], C.line, 3); lijn(ctx, [[372, y], [TL.x1, y]], C.line, 3); pijl(ctx, TL.x1 - 30, y, TL.x1 + 6, y, C.line, 1, 3, 14);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; [350, 362].forEach(x => { ctx.beginPath(); ctx.moveTo(x - 4, y + 10); ctx.lineTo(x + 8, y - 10); ctx.stroke(); }); // tijdsprong
  const Z = o.zicht || {}; for (const k in TL.p) { const za = Z[k] == null ? 0 : Z[k]; if (za <= 0.01) continue; const x = TL.p[k], hl = o.hl === k;
    ctx.save(); ctx.globalAlpha *= za; circ(ctx, x, y, hl ? 11 : 8, hl ? C.goud : C.text, null); if (hl) circ(ctx, x, y, 19, null, C.goud, 2.5); metaText(ctx, TL.naam[k], x, y + 34, hl ? C.goud : C.text2, 'center', 22); ctx.restore(); }
  if (o.label) { const [k, s2, la, col] = o.label; if (la > 0.01) { const x = clamp(TL.p[k], 260, 1640); tag(ctx, s2, x, y - 52, col || C.goud, la, 'center', 24); } }
  if (o.wijzer != null) { const x = o.wijzer; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x - 11, y - 32); ctx.lineTo(x + 11, y - 32); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
const tlAlle = (lijst, a = 1) => { const z = {}; lijst.forEach(k => z[k] = a); return z; };

// ---------- drie niveaus van preventie ----------
const PREV = { x: [170, 730, 1290], y: 220, w: 460, h: 470, naam: ['voorkómen', 'vroeg vinden', 'erger voorkomen'], sub: ['DAT EEN ZIEKTE ONTSTAAT', 'NOG VÓÓR KLACHTEN', 'BIJ WIE AL ZIEK IS'] };
function appel(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x - r * 0.35, y, r * 0.75, 0, 6.283); ctx.arc(x + r * 0.35, y, r * 0.75, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.8); ctx.fill(); ctx.strokeStyle = '#3E6A48'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - r * 0.6); ctx.lineTo(x + r * 0.15, y - r * 1.15); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x + r * 0.4, y - r * 1.0, r * 0.32, r * 0.15, -0.5, 0, 6.283); ctx.fillStyle = '#5FA86E'; ctx.fill(); }
function schoen(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 20); ctx.lineTo(-58, -22); ctx.quadraticCurveTo(-40, -30, -22, -22); ctx.lineTo(10, -4); ctx.quadraticCurveTo(58, 0, 62, 14); ctx.lineTo(62, 20); ctx.closePath(); shape(ctx, '#5BA4C9', '#86C3E8', 2);
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-62, 16, 126, 9); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; [-24, -12, 0].forEach(dx => { ctx.beginPath(); ctx.moveTo(dx - 6, -18 + dx * 0.4); ctx.lineTo(dx + 6, -12 + dx * 0.4); ctx.stroke(); }); ctx.restore(); }
function sigaretWeg(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -9, 96, 18, 4); shape(ctx, '#F2F2EE', '#B9B2A0', 1.5); roundRect(ctx, 36, -9, 28, 18, 4); shape(ctx, '#C9A35C', null); ctx.fillStyle = '#9AA3B2'; [[-72, -16], [-84, -28], [-76, -42]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(dx, dy, 5, 0, 6.283); ctx.fill(); });
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, 0, 74, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-52, -52); ctx.lineTo(52, 52); ctx.stroke(); ctx.restore(); }
function vergrootglas(ctx, x, y, r, col = C.goud) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = r * 0.14; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.lineCap = 'round'; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.5, y + r * 1.5); ctx.stroke(); ctx.restore(); }
function bedIcoon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-110, -60); ctx.lineTo(-110, 50); ctx.moveTo(-110, 10); ctx.lineTo(110, 10); ctx.lineTo(110, 50); ctx.moveTo(110, 10); ctx.lineTo(110, -20); ctx.stroke();
  roundRect(ctx, -104, -14, 210, 22, 8); shape(ctx, rgba('#AFC0D0', 0.25), null); roundRect(ctx, -100, -38, 56, 24, 10); shape(ctx, '#DCE5EC', null);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(150, -110); ctx.lineTo(150, 50); ctx.moveTo(130, 50); ctx.lineTo(170, 50); ctx.stroke(); roundRect(ctx, 136, -110, 28, 40, 8); shape(ctx, rgba(C.teal, 0.5), '#AFC0D0', 2);
  ctx.fillStyle = C.groen; ctx.fillRect(-10, -100, 20, 56); ctx.fillRect(-28, -82, 56, 20); ctx.restore(); }
// a = [a0, a1, a2] zichtbaarheid per kolom; hl = index die goud oplicht; dim = index die gedimd wordt
function preventie(ctx, a, o = {}) { const t = o.t || 0; PREV.x.forEach((x, k) => { const ak = a[k]; if (ak <= 0.01) return; const y = PREV.y, w = PREV.w, h = PREV.h, hl = o.hl === k;
  ctx.save(); ctx.globalAlpha *= ak * (o.dim && o.dim.includes(k) ? 0.35 : 1); roundRect(ctx, x, y, w, h, 20); shape(ctx, rgba(LOKAAL, 0.85), hl ? C.goud : rgba(C.line, 0.6), hl ? 3.5 : 1.5);
  text(ctx, PREV.naam[k], x + w / 2, y + 74, fTitel(52), C.text, 'center'); metaText(ctx, PREV.sub[k], x + w / 2, y + 116, C.grain, 'center', 22);
  const cx = x + w / 2, cy = y + 290;
  if (k === 0) { appel(ctx, cx - 130, cy - 40, 40); schoen(ctx, cx + 100, cy - 40, 0.95); sigaretWeg(ctx, cx, cy + 100, 0.62); }
  if (k === 1) { popje(ctx, cx - 10, cy + 60, 34, C.teal, 1); vergrootglas(ctx, cx - 10, cy - 10, 74, C.goud); }
  if (k === 2) bedIcoon(ctx, cx - 20, cy + 40, 1.15);
  ctx.restore(); }); }
// kleine versie bovenin (s04, s06): zelfde tekening, geschaald
function preventieKlein(ctx, a, o = {}) { ctx.save(); ctx.translate(160, 96); ctx.scale(0.62, 0.62); ctx.translate(-160, -160); preventie(ctx, a, o); ctx.restore(); }
// midden van kolom k in de kleine versie (schermcoördinaten)
const prevKleinMid = (k, dy = 0) => [160 + (PREV.x[k] + PREV.w / 2 - 160) * 0.62, 96 + (PREV.y + dy - 160) * 0.62];

// ---------- darm in doorsnede met poliepen ----------
const DARM = { x0: 200, x1: 1720, y: 640, h: 210, wand: 36 };
function darmDoorsnede(ctx, a = 1, t = 0) { if (a <= 0.01) return; const { x0, x1, y, h, wand } = DARM; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, x1 - x0, h, h / 2); shape(ctx, '#3A2E3A', '#A88A90', 2); // wand
  ctx.beginPath(); const yi1 = y - h / 2 + wand, yi2 = y + h / 2 - wand; ctx.moveTo(x0 + 40, yi1); for (let x = x0 + 40; x <= x1 - 40; x += 6) ctx.lineTo(x, yi1 + Math.sin(x * 0.07) * 4); for (let x = x1 - 40; x >= x0 + 40; x -= 6) ctx.lineTo(x, yi2 + Math.sin(x * 0.07 + 1) * 4); ctx.closePath(); ctx.fillStyle = '#141B28'; ctx.fill();
  ctx.strokeStyle = '#C99A9A'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0 + 40; x <= x1 - 40; x += 6) { const yy = yi2 + Math.sin(x * 0.07 + 1) * 4; x === x0 + 40 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.beginPath(); for (let x = x0 + 40; x <= x1 - 40; x += 6) { const yy = yi1 + Math.sin(x * 0.07) * 4; x === x0 + 40 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
  ctx.restore(); }
const darmBodem = (x) => DARM.y + DARM.h / 2 - DARM.wand + Math.sin(x * 0.07 + 1) * 4;
// poliep op de onderwand; g = grootte 0..1; kanker 0..1 = overgang naar koraal, onregelmatig
function poliep(ctx, x, g, a = 1, kanker = 0, o = {}) { if (a <= 0.01 || g <= 0.01) return; const yb = darmBodem(x) + 2, r = 14 + 26 * g; ctx.save(); ctx.globalAlpha *= a;
  const col = _mixHex(C.oker, C.koraal, kanker); ctx.beginPath(); ctx.moveTo(x - r * 0.45, yb); ctx.lineTo(x - r * 0.25, yb - r * 0.5);
  const n = 18; for (let i = 0; i <= n; i++) { const an = Math.PI + i / n * Math.PI; const w = 1 + kanker * 0.22 * Math.sin(i * 2.7 + 1.3); ctx.lineTo(x + Math.cos(an) * r * w, yb - r * 0.55 + Math.sin(an) * r * 0.95 * w); }
  ctx.lineTo(x + r * 0.25, yb - r * 0.5); ctx.lineTo(x + r * 0.45, yb); ctx.closePath(); shape(ctx, rgba(col, 0.9), _mixHex(col, '#FFFFFF', 0.3), 2);
  if (o.ring) { ctx.beginPath(); ctx.arc(x, yb - r * 0.7, r * 1.5, 0, 6.283); ctx.strokeStyle = o.ring; ctx.lineWidth = 3; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); return [x, yb - r * 1.3]; }
// kijkonderzoek: slangetje met camera in de darm (van links)
function scoop(ctx, u, a = 1, t = 0) { if (a <= 0.01) return; const { x0, y } = DARM, xe = lerp(x0 - 60, 1040, ease(u)); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2E3440'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0 - 160, y + 120); ctx.quadraticCurveTo(x0 - 60, y, x0 + 20, y); ctx.lineTo(xe, y + Math.sin(xe * 0.01) * 6); ctx.stroke(); ctx.strokeStyle = '#6A7488'; ctx.lineWidth = 4; ctx.stroke();
  circ(ctx, xe + 10, y, 12, '#E6E1D3', '#9AA3B2', 2); ctx.globalAlpha *= 0.25 + 0.15 * Math.sin(t * 4); ctx.beginPath(); ctx.moveTo(xe + 18, y); ctx.lineTo(xe + 190, y - 60); ctx.lineTo(xe + 190, y + 60); ctx.closePath(); ctx.fillStyle = '#F2E6B0'; ctx.fill(); ctx.restore(); }

// ---------- raster telpoppetjes ----------
// kleur(i) geeft kleur of null (grijs); per = aantal per rij
function popRaster(ctx, x, y, n, per, gap, r, kleur, a = 1, o = {}) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const c = kleur(i); const px = x + (i % per) * gap, py = y + Math.floor(i / per) * gap * 1.18; popje(ctx, px, py, r, c || '#7C8698', a * (o.alpha ? o.alpha(i) : 1)); if (o.vink && o.vink(i)) vink_(ctx, px + r * 0.9, py - r * 2.2, r * 0.45, a, C.groen); } }

// ---------- balk 'bloed in ontlasting' met afkapwaarde ----------
function bloedBalk(ctx, x, y, w, niveau, afkap, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 54;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3446', C.line, 1.5); if (niveau > 0.01) { roundRect(ctx, x, y, Math.max(16, w * niveau), h, 14); shape(ctx, rgba(niveau > afkap ? C.oker : C.teal, 0.75), null); }
  if (o.afkapA == null || o.afkapA > 0.01) { ctx.save(); ctx.globalAlpha *= o.afkapA == null ? 1 : o.afkapA; ctx.fillStyle = C.goud; ctx.fillRect(x + w * afkap - 4, y - 24, 8, h + 48); ctx.restore(); }
  metaText(ctx, 'MINDER BLOED', x, y + h + 40, C.text2, 'left', 22); metaText(ctx, 'MEER BLOED', x + w, y + h + 40, C.text2, 'right', 22); ctx.restore(); }

// ---------- zeef (afkapwaarde = maaswijdte) ----------
const ZEEF = { cx: 900, cy: 300, rx: 360, ry: 170, bak: 660 };
// 24 testuitslagen: grootte = hoeveel bloed; index 9 = kleine tumor die weinig bloedt
const UITSLAG = (() => { const L = []; for (let i = 0; i < 24; i++) L.push(0.12 + 0.86 * hash(i * 5.3 + 2)); L[9] = 0.47; return L; })();
const M0 = 0.36, M1 = 0.6; // maaswijdte bij start (15) en daarna (47)
function zeefSlot(i) { const k = [3, 7, 11, 14, 17, 19, 21, 0, 1, 5, 9, 13, 15, 2, 4, 6, 8, 10, 12, 16, 18, 20, 22, 23].indexOf(i); const col = k % 8, row = Math.floor(k / 8); return [ZEEF.cx - 245 + col * 70 + (row % 2) * 35, ZEEF.cy + 110 - row * 52]; }
function bakSlot(i) { return [ZEEF.cx - 330 + (i % 12) * 60, ZEEF.bak - 26 - Math.floor(i / 12) * 46]; }
// m = maaswijdte (0..1), val(i) = 0..1 hoe ver bal i al gevallen is (alleen als hij erdoor kan), o.tumor = alpha van het koraal kenmerk
function zeef(ctx, m, val, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { cx, cy, rx, ry, bak } = ZEEF;
  // opvangbak onder de zeef
  roundRect(ctx, cx - 380, bak, 760, 26, 10); shape(ctx, rgba(C.teal, 0.25), rgba(C.teal, 0.8), 2); naamBij(ctx, 'goed', 'GEEN VERVOLG', cx - 400, bak + 22, o.namen == null ? 1 : o.namen, 'right', C.teal);
  // kom van de zeef met mazen
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI); ctx.closePath(); ctx.fillStyle = rgba('#0D1420', 0.6); ctx.fill(); ctx.clip();
  const g = 22 + 46 * m; ctx.strokeStyle = rgba(C.goud, 0.75); ctx.lineWidth = 3; for (let x = cx - rx; x <= cx + rx; x += g) { ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy + ry); ctx.stroke(); } for (let y = cy + g * 0.6; y <= cy + ry; y += g) { ctx.beginPath(); ctx.moveTo(cx - rx, y); ctx.lineTo(cx + rx, y); ctx.stroke(); } ctx.restore();
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI); ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.stroke(); lijn(ctx, [[cx - rx - 30, cy], [cx + rx + 30, cy]], C.line, 6);
  // ballen
  UITSLAG.forEach((s, i) => { const [sx, sy] = zeefSlot(i), [bx, by] = bakSlot(i), r = 10 + 20 * s, door = s <= m, u = door ? clamp(val(i), 0, 1) : 0, e = u * u;
    const x = lerp(sx, bx, ease(u)), y = lerp(sy, by, e); const tumor = i === 9 && (o.tumor || 0) > 0.01; const col = door && u > 0.6 ? C.teal : (o.kleur === false ? '#8C96A8' : C.oker);
    circ(ctx, x, y - r, r, rgba(col, 0.9), _mixHex(col, '#FFFFFF', 0.3), 2); if (tumor) { ctx.save(); ctx.globalAlpha *= o.tumor; circ(ctx, x, y - r, r + 9, null, C.koraal, 4); circ(ctx, x, y - r, r * 0.45, C.koraal, null); ctx.restore(); } });
  ctx.restore(); }
const zeefTumorPos = (m, val) => { const s = UITSLAG[9], door = s <= m, u = door ? clamp(val(9), 0, 1) : 0, [sx, sy] = zeefSlot(9), [bx, by] = bakSlot(9); return [lerp(sx, bx, ease(u)), lerp(sy, by, u * u) - 10 - 20 * s]; };
// schuif 'afkapwaarde' naast de zeef (verticaal)
function afkapSchuif(ctx, x, y, h, m, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 9, y, 18, h, 9); shape(ctx, '#2A3446', C.line, 1.5); const yy = y + h - h * m;
  roundRect(ctx, x - 36, yy - 9, 72, 18, 9); shape(ctx, C.goud, _mixHex(C.goud, '#000000', 0.3), 2); metaText(ctx, 'AFKAPWAARDE', x, y - 22, C.goud, 'center', 22);
  if (o.waarde) text(ctx, o.waarde, x + 56, yy + 14, fTekst(40, 800), C.text, 'left'); if (o.eenheid) metaText(ctx, o.eenheid, x + 56, yy + 46, C.text2, 'left', 20); ctx.restore(); return yy; }

// ---------- weegschaal ----------
function weegschaal(ctx, cx, cy, tilt, links, rechts, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = o.arm || 440, an = tilt * 0.12;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(cx - 70, cy + 330); ctx.lineTo(cx + 70, cy + 330); ctx.lineTo(cx + 14, cy); ctx.lineTo(cx - 14, cy); ctx.closePath(); ctx.fill();
  const lx = cx - Math.cos(an) * L, ly = cy - Math.sin(an) * L, rx = cx + Math.cos(an) * L, ry = cy + Math.sin(an) * L; lijn(ctx, [[lx, ly], [rx, ry]], '#AFC0D0', 10); circ(ctx, cx, cy, 16, C.goud, null);
  [[lx, ly, links, C.groen], [rx, ry, rechts, C.oker]].forEach(([px, py, items, col]) => { const pb = py + 150; lijn(ctx, [[px, py], [px - 170, pb]], '#8FA0B5', 2.5); lijn(ctx, [[px, py], [px + 170, pb]], '#8FA0B5', 2.5);
    ctx.beginPath(); ctx.moveTo(px - 200, pb); ctx.lineTo(px + 200, pb); ctx.quadraticCurveTo(px, pb + 60, px - 200, pb); ctx.closePath(); shape(ctx, rgba(col, 0.25), col, 2.5);
    items.forEach(([s2, ia], i) => { if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia; ctx.font = fTekst(28, 700); const w = Math.min(470, ctx.measureText(s2).width + 36), yy = pb + 44 + i * 50 + (1 - ease(ia)) * -20; roundRect(ctx, px - w / 2, yy, w, 44, 12); shape(ctx, rgba(LOKAAL, 0.92), col, 2); text(ctx, s2, px, yy + 31, fTekst(28, 700), C.text, 'center'); ctx.restore(); }); });
  ctx.restore(); }

// ---------- muntje (loting) ----------
function muntje(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; const sx = Math.cos(t * 9); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(Math.abs(sx) < 0.08 ? 0.08 : Math.abs(sx), 1); circ(ctx, 0, 0, r, C.goud, _mixHex(C.goud, '#000000', 0.3), 4); circ(ctx, 0, 0, r * 0.7, null, _mixHex(C.goud, '#000000', 0.25), 2); ctx.restore(); }

// ---------- hersenen met stipjes (toevalsvondsten) ----------
function breinStippen(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; breinGrijs(ctx, x, y, s, a); const P = [[-170, -90], [-40, -150], [110, -110], [190, -20], [-210, 10], [40, -40], [-90, 30], [150, 60]];
  P.forEach(([dx, dy], i) => { const pa = o.stip == null ? 1 : clamp(o.stip * P.length - i, 0, 1); if (pa <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * pa; circ(ctx, x + dx * s, y + dy * s, 10 * s + 4, i % 3 === 0 ? C.oker : '#E6E1D3', null); if (o.vraag) { ctx.globalAlpha *= o.vraag; text(ctx, '?', x + dx * s + 16, y + dy * s - 8, fTekst(28, 800), C.goud, 'center'); } ctx.restore(); }); }

// ---------- vakken van het pijlenschema (wie beslist) ----------
function vak(ctx, x, y, w, h, kop, meta, a = 1, col = C.line, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(LOKAAL, 0.9), col, o.dik ? 4 : 2);
  text(ctx, kop, x + w / 2, y + h / 2 + (meta ? -4 : 12), fTekst(o.px || 36, 800), C.text, 'center'); if (meta) metaText(ctx, meta, x + w / 2, y + h / 2 + 36, col === C.line ? C.grain : col, 'center', 20); ctx.restore(); }

// ---------- geld- en kaartje met kop ----------
function kaartje(ctx, x, y, w, h, kop, regels, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(LOKAAL, 0.92), col, 2); metaText(ctx, kop, x + 24, y + 38, col, 'left', 20);
  regels.forEach(([s2, ra, px], i) => { if (ra <= 0.01) return; ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 24, y + 84 + i * 44, fTekst(px || 32, 700), C.text, 'left'); ctx.restore(); }); ctx.restore(); }

// ---------- Yasmin en Farid in het kantoor, zonder badge en zonder afdeling ----------
function duoGz2(ctx, t, o = {}) { const ry = persoon(ctx, 'yasmin', o.yx || 560, GROND, 450, { t, kijk: 1, uit: o.uitY || 'blij', pose: o.poseY || 'staan', a: o.aY == null ? 1 : o.aY });
  const rf = persoon(ctx, 'farid', o.fx || 1420, GROND, 450, { t, kijk: -1, uit: o.uitF || 'blij', pose: o.poseF || 'staan', outfit: 'kantoor', a: o.aF == null ? 1 : o.aF }); return { ry, rf }; }

// hersenen in neutrale tint (BEELDAFSPRAKEN 28 okt: paars alleen met betekenis); vorm als brein() uit brein.js
function breinGrijs(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-300, 40); ctx.bezierCurveTo(-330, -120, -170, -230, 10, -220); ctx.bezierCurveTo(200, -215, 320, -110, 300, 20); ctx.bezierCurveTo(290, 100, 220, 130, 150, 120); ctx.bezierCurveTo(100, 170, 20, 160, -40, 120); ctx.bezierCurveTo(-140, 140, -260, 120, -300, 40); ctx.closePath(); shape(ctx, '#3A4458', '#AFC0D0', 2.5);
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 2; [[-200, -120, -120, -40], [-60, -190, -20, -80], [80, -190, 60, -60], [180, -130, 200, -30], [-230, 20, -120, 40], [20, 40, 140, 30]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.quadraticCurveTo((a1 + a2) / 2 + 30, (b1 + b2) / 2, a2, b2); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(210, 120, 80, 45, 0.2, 0, 6.283); shape(ctx, '#323C4E', rgba('#AFC0D0', 0.7), 2); roundRect(ctx, 90, 110, 50, 130, 20); shape(ctx, '#323C4E', rgba('#AFC0D0', 0.7), 2); ctx.restore(); }
