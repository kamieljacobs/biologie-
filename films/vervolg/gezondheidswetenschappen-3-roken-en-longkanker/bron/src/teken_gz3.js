// Wat word jij? · Gezondheidswetenschappen 3 · Roken en longkanker — eigen tekeningen (31 okt 2026)
// Seriekleuren deze film: teal = nooit gerookt, oker = rookt, koraal = longkanker, groen = gestopt, goud = focus. Hulpjes en kantoor overgenomen uit teken_gz1.js (Gezondheid 1).
// Wat word jij? · Gezondheidswetenschappen 1 · Hoe een epidemie groeit en stopt — eigen tekeningen (26 okt 2026)
// Seriekleuren: koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus, paars = virus.

// ---------- algemene hulpjes (zoals lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 62, y + 37, fTekst(26, 700), C.text, 'left'); ctx.restore(); }
// kaartje met echte getallen: kop (meta), regels, bron (meta) — altijd apart van het oefendossier
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 44, h = 76 + regels.length * lh + (bron ? 50 : 6) + (o.extraH || 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2); metaText(ctx, kop, x + 26, y + 46, C.goud, 'left', 28);
  regels.forEach((r, i) => { const [s2, ra] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 26, y + 100 + i * lh, fTekst(o.px || 32, 700), C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 70 + regels.length * lh, w, o.extraH || 0);
  if (bron) metaText(ctx, bron, x + 26, y + h - 22, C.text2, 'left', 28); ctx.restore(); return h; }
const RHO = (n) => n.toLocaleString('nl-NL');
// ---------- telpoppetje (alleen in groepen en ketens, BEELDAFSPRAKEN) ----------
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
// ---------- het GGD-kantoor met camerazoom naar het scherm ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
const SCR = { x: 717, y: 111, w: 600, h: 320 }; // het grote lege scherm in het decor (1920×1080)
const SCR_K = Math.min(SCR.w / W, SCR.h / H), SCR_O = [SCR.x + SCR.w / 2 - SCR_K * W / 2, SCR.y + SCR.h / 2 - SCR_K * H / 2];
const GROND = 862;
// u = 0: kantoor (decor op 60 %), u = 1: het scherm vult het beeld (navy). mensen(ctx) tekent personen in decorcoördinaten; inhoud(ctx) in schermcoördinaten (1920×1080)
function kantoor(ctx, u, mensen, inhoud) { const e = ease(u); bg(ctx, 'schema');
  if (e >= 0.999) { if (inhoud) inhoud(ctx); return; }
  const sc = Math.pow(1 / SCR_K, e), f = (1 - 1 / sc) / (1 - SCR_K), cx = SCR.x + SCR.w / 2, cy = SCR.y + SCR.h / 2, Px = lerp(960, cx, f), Py = lerp(540, cy, f);
  ctx.save(); ctx.translate(960, 540); ctx.scale(sc, sc); ctx.translate(-Px, -Py);
  const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); }
  ctx.save(); roundRect(ctx, SCR.x - 6, SCR.y - 6, SCR.w + 12, SCR.h + 12, 6); ctx.fillStyle = '#0F1622'; ctx.fill(); ctx.beginPath(); ctx.rect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h);
  ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); if (inhoud) inhoud(ctx); ctx.restore();
  if (mensen) mensen(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 1 - e; ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); ctx.restore(); }
// decor zonder zoom, met een eigen paneel ervoor (recap)
function kantoorVlak(ctx) { bg(ctx, 'schema'); const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); } ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }

// ---------- kleine recapkaart ----------
function recapKaart(ctx, x, y, w, h, kop, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.8), 2); teken(x + w / 2, y + (h - 60) / 2 + 6);
  text(ctx, kop, x + w / 2, y + h - 26, fTekst(30, 700), C.text, 'center'); ctx.restore(); }


// ================= eigen tekeningen gz3 =================
// tijdlijn bovenin (rechts van de seriemeta): 1945–2030; gouden stip bij 'jaar'
const TL = { x0: 1310, x1: 1820, y: 96, j0: 1945, j1: 2030 };
const tlX = (j) => TL.x0 + (j - TL.j0) / (TL.j1 - TL.j0) * (TL.x1 - TL.x0);
function tijdlijn(ctx, jaar, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, TL.x0 - 50, 44, TL.x1 - TL.x0 + 100, 108, 14); ctx.fillStyle = rgba('#0D1420', 0.72); ctx.fill();
  lijn(ctx, [[TL.x0, TL.y], [TL.x1, TL.y]], C.line, 2.5);
  for (const j of [1950, 1970, 1990, 2010]) { const x = tlX(j); ctx.fillStyle = C.line; ctx.fillRect(x - 1, TL.y - 6, 2, 12); metaText(ctx, String(j), x, TL.y + 38, C.text2, 'center', 28); }
  if (o.van != null) lijn(ctx, [[tlX(o.van), TL.y], [tlX(jaar), TL.y]], C.goud, 5);
  (o.stations || []).forEach((j) => circ(ctx, tlX(j), TL.y, 7, rgba(C.goud, 0.35), C.goud, 2));
  const x = tlX(jaar); circ(ctx, x, TL.y, 11, C.goud, '#0D1420', 2); metaText(ctx, String(Math.round(o.label || jaar)), x, TL.y - 18, C.goud, 'center', 28); ctx.restore(); }

// raster van telpoppetjes; kleur(i) geeft kleur of null; gap = afstand; r = grootte
function raster(ctx, x, y, cols, n, gap, r, kleur, a = 1, o = {}) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const c = kleur(i); if (!c) continue; const cx = x + (i % cols) * gap, cy = y + Math.floor(i / cols) * (o.gapY || gap); const dx = o.dx ? o.dx(i) : 0, ia = o.ia ? o.ia(i) : 1; popje(ctx, cx + dx, cy, r, c, a * ia);
    if (o.ring && o.ring(i) > 0.01) { ctx.save(); ctx.globalAlpha *= a * o.ring(i); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx + dx, cy - r * 0.4, r * (o.ringR || 2.1), 0, 6.283); ctx.stroke(); ctx.restore(); } } }
// raster van 100 (10 × 10): k koraal, de rest 'basis'
function raster100(ctx, x, y, basis, k, a = 1, o = {}) { const gap = o.gap || 40, r = o.r || 12; const kf = o.kf == null ? k : o.kf;
  raster(ctx, x, y, 10, 100, gap, r, (i) => i < Math.floor(kf) ? C.koraal : (i < kf ? _mixHex(basis, C.koraal, kf - Math.floor(kf)) : basis), a); }

// sigaret (met oker filter)
function sigaret(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40 * s, y - 6 * s, 64 * s, 12 * s, 3 * s); shape(ctx, '#F2EEE4', '#9AA3B2', 1); roundRect(ctx, x + 24 * s, y - 6 * s, 18 * s, 12 * s, 3 * s); shape(ctx, C.oker, null); circ(ctx, x - 41 * s, y, 5 * s, '#C96A4A'); ctx.restore(); }
// koffiekop
function koffiekop(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 34 * s, y - 40 * s); ctx.lineTo(x + 34 * s, y - 40 * s); ctx.lineTo(x + 26 * s, y + 16 * s); ctx.quadraticCurveTo(x, y + 26 * s, x - 26 * s, y + 16 * s); ctx.closePath(); shape(ctx, '#E8E2D8', '#9AA3B2', 2);
  ctx.strokeStyle = '#E8E2D8'; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.arc(x + 36 * s, y - 14 * s, 13 * s, -1.3, 1.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y - 40 * s, 34 * s, 7 * s, 0, 0, 6.283); shape(ctx, '#6A4430', null);
  ctx.beginPath(); ctx.ellipse(x, y + 22 * s, 52 * s, 9 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 1.5); ctx.restore(); }
// envelop met vragenlijst
function envelop(ctx, x, y, s, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (open > 0.01) { ctx.save(); roundRect(ctx, -70, -40 - 80 * open, 140, 100, 4); shape(ctx, '#F2EEE4', '#9AA3B2', 1.5); ctx.fillStyle = '#5A6478'; ctx.font = fTekst(15, 700); ctx.textAlign = 'center'; ctx.fillText('Rookt u?', 0, -14 - 80 * open); ctx.fillText('Hoeveel per dag?', 0, 8 - 80 * open); ctx.restore(); }
  roundRect(ctx, -90, -55, 180, 110, 6); shape(ctx, '#D9C9A6', '#A89470', 2); ctx.strokeStyle = '#A89470'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, -55); ctx.lineTo(0, 10); ctx.lineTo(90, -55); ctx.stroke(); ctx.restore(); }
// afspeel- en terugspoelknop
function mediaKnop(ctx, x, y, r, soort, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.goud, 0.16), C.goud, 3); ctx.fillStyle = C.goud;
  const drie = (dx, dir) => { ctx.beginPath(); ctx.moveTo(x + dx - dir * r * 0.28, y - r * 0.38); ctx.lineTo(x + dx + dir * r * 0.36, y); ctx.lineTo(x + dx - dir * r * 0.28, y + r * 0.38); ctx.closePath(); ctx.fill(); };
  if (soort === 'play') drie(r * 0.05, 1); else { drie(-r * 0.2, -1); drie(r * 0.25, -1); }
  if (label) metaText(ctx, label, x, y + r + 40, C.goud, 'center', 28); ctx.restore(); }
// staafgrafiek met eerlijke as vanaf 0; items = [[naam, waarde, kleur, a, waardeTekst]]
function staven(ctx, g, items, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.lineTo(g.x, g.y + g.h); ctx.lineTo(g.x + g.w, g.y + g.h); ctx.stroke();
  for (let v = 0; v <= g.max; v += g.stap) { const y = g.y + g.h - v / g.max * g.h; ctx.fillStyle = C.line; ctx.fillRect(g.x - 10, y - 1, 10, 2); metaText(ctx, String(v), g.x - 18, y + 9, C.text2, 'right', 28); }
  if (o.yl) metaText(ctx, o.yl, g.x - 70, g.y - 26, C.text2, 'left', 28);
  const n = items.length, bw = Math.min(200, g.w / n * 0.55);
  items.forEach(([naam, v, col, ia, vt], i) => { const ea = ia == null ? 1 : ia; if (ea <= 0.01) return; const cx = g.x + g.w * (i + 0.5) / n, hh = v / g.max * g.h * ease(clamp(ea * 1.4, 0, 1)); ctx.save(); ctx.globalAlpha *= clamp(ea * 3, 0, 1);
    roundRect(ctx, cx - bw / 2, g.y + g.h - hh, bw, Math.max(hh, 3), 6); shape(ctx, rgba(col, 0.85), col, 2); text(ctx, vt || ('± ' + v), cx, g.y + g.h - hh - 16, fTekst(40, 800), C.text, 'center');
    naamBij(ctx, naam, '', cx, g.y + g.h + 46, 1, 'center', col); ctx.restore(); }); ctx.restore(); }
// krant met kop
function krant(ctx, x, y, w, h, kop, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 6); shape(ctx, '#EDE8DC', '#9AA3B2', 2); ctx.fillStyle = '#121A26'; ctx.fillRect(x + 24, y + 22, w - 48, 6);
  metaText(ctx, 'DE DAGKRANT', x + 24, y + 62, '#5A6478', 'left', 28); ctx.font = fTitel(46); ctx.fillStyle = '#121A26'; ctx.textAlign = 'left'; wrap(ctx, kop, x + 24, y + 120, w - 48, 54);
  ctx.fillStyle = '#B8B2A6'; for (let i = 0; i < 4; i++) { ctx.fillRect(x + 24, y + h - 120 + i * 24, (w - 60) / 2, 8); ctx.fillRect(x + 36 + (w - 60) / 2, y + h - 120 + i * 24, (w - 60) / 2, 8); } ctx.restore(); }
// blok met naam (voor de verstorende factor)
function factorBlok(ctx, x, y, w, naam, col, a = 1, teken = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 60, w, 120, 18); shape(ctx, rgba(col, 0.16), col, 3); if (teken) teken(x - w / 2 + 70, y);
  text(ctx, naam, teken ? x + 40 : x, y + 14, fTekst(40, 800), C.text, 'center'); ctx.restore(); }
// klein kantoorscherm met het getal (terugverwijzing naar de cold open)
function getalScherm(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -6, -6, 612, 332, 8); ctx.fillStyle = '#0F1622'; ctx.fill(); ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, 600, 320);
  ctx.scale(600 / 1920, 600 / 1920); schermGetal(ctx, 1); ctx.restore(); }
// inhoud van Farids scherm (1920 × 1080): het getal
function schermGetal(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k1 = o.k1 == null ? 16 : o.k1;
  metaText(ctx, 'LONGKANKER · OVERLEDEN VÓÓR 75 JAAR · VK · PETO E.A. 2000', 160, 230, C.grain, 'left', 30);
  raster100(ctx, 200, 340, C.oker, k1, 1, { gap: 46, r: 14 }); raster100(ctx, 820, 340, C.teal, 0, 1, { gap: 46, r: 14 });
  text(ctx, 'bleven roken', 200, 300, fTekst(40, 700), C.oker, 'left'); text(ctx, 'nooit gerookt', 820, 300, fTekst(40, 700), C.teal, 'left');
  text(ctx, '± 16 van de 100', 200, 860, fTekst(60, 800), C.text, 'left'); text(ctx, '< 1 van de 100', 820, 860, fTekst(60, 800), C.text, 'left'); ctx.restore(); }
// raster van 10.000 stipjes (100 × 100), k koraal (groot gemarkeerd)
function stip10k(ctx, x, y, size, k, a = 1, ring = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = size / 100; ctx.fillStyle = rgba(C.teal, 0.8); for (let r = 0; r < 100; r++) for (let c = 0; c < 100; c++) ctx.fillRect(x + c * st, y + r * st, st * 0.62, st * 0.62);
  const P = [[37, 61], [71, 24]]; for (let i = 0; i < k; i++) { const [c, r] = P[i]; popje(ctx, x + c * st + 1, y + r * st + 9, 7, C.koraal); if (ring > 0.01) { ctx.save(); ctx.globalAlpha *= ring; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + c * st + 1, y + r * st + 1, 24, 0, 6.283); ctx.stroke(); ctx.restore(); } }
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x - 6, y - 6, size + 12, size + 12); ctx.restore(); }
// tegel (H4: vier aanwijzingen)
function tegel(ctx, x, y, w, h, kop, aan, a = 1, teken = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, aan > 0.01 ? rgba(C.goud, 0.12 * aan) : '#22304A', aan > 0.01 ? _mixHex('#4A5468', C.goud, aan) : '#4A5468', 2.5);
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; if (teken) teken(x + w / 2, y + h * 0.42); ctx.font = fTekst(32, 800); ctx.fillStyle = C.text; ctx.textAlign = 'center'; wrap(ctx, kop, x + w / 2, y + h - 74, w - 40, 38); ctx.restore(); } ctx.restore(); }
// experimentopstelling met kruis 'MAG NIET'
function experiment(ctx, x, y, a = 1, kr = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520, 400, 18); shape(ctx, rgba('#0D1420', 0.6), rgba(C.line, 0.7), 2); metaText(ctx, 'EXPERIMENT', x + 26, y + 46, C.text2, 'left', 28);
  metaText(ctx, 'LOTING', x + 260, y + 92, C.goud, 'center', 28); pijl(ctx, x + 230, y + 104, x + 140, y + 160, C.goud, 1, 3, 12); pijl(ctx, x + 290, y + 104, x + 380, y + 160, C.goud, 1, 3, 12);
  raster(ctx, x + 60, y + 220, 4, 12, 44, 12, () => C.oker, 1, { gapY: 56 }); raster(ctx, x + 330, y + 220, 4, 12, 44, 12, () => C.teal, 1, { gapY: 56 });
  sigaret(ctx, x + 130, y + 375, 1); metaText(ctx, 'MOET ROKEN', x + 126, y + 178, C.oker, 'center', 28); metaText(ctx, 'ROOKT NIET', x + 396, y + 178, C.teal, 'center', 28);
  if (kr > 0.01) { kruis(ctx, x + 260, y + 300, 95 * ease(kr), kr); stempel(ctx, x + 260, y + 300, 'MAG NIET', C.koraal, kr); } ctx.restore(); }
// artsencohort: 20 × 8 telpoppetjes (één ≈ 200 artsen); rookt = vaste trekking
const ART = { x: 800, y: 430, cols: 20, n: 160, gap: 50, r: 13 };
const artRookt = (i) => hash(i * 7.31 + 2) < 0.7; const artZiek = (i) => artRookt(i) ? hash(i * 3.77 + 9) < 0.25 : hash(i * 3.77 + 9) < 0.015; const artT = (i) => hash(i * 5.13 + 1);
function artsen(ctx, a = 1, o = {}) { const kl = o.kleur == null ? 1 : o.kleur, zk = o.ziek || 0;
  raster(ctx, ART.x, ART.y, ART.cols, ART.n, ART.gap, ART.r, (i) => { let c = artRookt(i) ? _mixHex(C.line, C.oker, kl * clamp(kl * 2 - artT(i) * 0.8, 0, 1)) : _mixHex(C.line, C.teal, kl * clamp(kl * 2 - artT(i) * 0.8, 0, 1)); if (artZiek(i) && zk > artT(i) * 0.9 + 0.05) c = C.koraal; return c; }, a, { ia: o.ia, dx: o.dx }); }
const artTel = (zk, rookt) => { let n = 0; for (let i = 0; i < ART.n; i++) if (artRookt(i) === rookt && artZiek(i) && zk > artT(i) * 0.9 + 0.05) n++; return n; };
// groep van 649 telpoppetjes (30 breed); rookte(i) bepaalt oker/teal zodra 'kl' > 0
function groep649(ctx, x, y, nooit, kl, a = 1, o = {}) { const N = o.n || 649, cols = o.cols || 30; const nooitSet = (i) => i >= N - nooit;
  raster(ctx, x, y, cols, N, 18, 6, (i) => kl <= 0.001 ? C.line : (nooitSet(i) ? _mixHex(C.line, C.teal, kl) : _mixHex(C.line, C.oker, kl)), a, { gapY: 21, ring: o.ring ? (i) => nooitSet(i) ? o.ring : 0 : null }); }
