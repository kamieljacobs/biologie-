// Bevruchting 1.0 — scènes per alinea (7 nov 2026). Lichte remake, deel 2 van de splitsing van Van bevruchting tot baby.
// Bibliotheek: eicelEcht, zaadcelEcht, vrouwOrganenVoor, eileiderDoorsnede, blastocyste, baarmoederwand; nieuw (teken_bv.js):
// bvMantel (bevruchting van dichtbij), bvKlieving (1 → 16 cellen in de zona). Personages zonder naam (oma Ria 'vroeger',
// Linda, Noor); gezichten heel. Kleuren: herkomst chromosomen moeder zandgeel, vader donkerblauw (palet B), focus goud.

const MOEDER = '#F2CF7A', VADER = '#34609A', VADERL = '#7FA6D9';
function vragenUit() { try { const p = new URLSearchParams(location.search).get('vragen'); if (p) return p === 'uit'; return localStorage.getItem('bk-vragen') === 'uit'; } catch (e) { return false; } }
function eiKaal(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); ctx.fillStyle = rgba('#F4F6F2', 0.8); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.97), '#D9C49A', 1.5); }
function micro2(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
function fadeIO(t, a, b, d = 0.5) { return ramp(t, a, d) * (1 - ramp(t, b, d)); }
function pill(ctx, x, y, s, col, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const w = ctx.measureText(s).width + 48;
  roundRect(ctx, x - w / 2, y - px * 0.95, w, px * 1.6, px * 0.8); shape(ctx, rgba('#121A26', 0.85), col, 2); text(ctx, s, x, y + px * 0.2, fTekst(px, 700), col, 'center'); ctx.restore(); }
function meta2(ctx, s) { metaText(ctx, s, W - 40, H - 22, C.text2, 'right', 28); }
function schaal(ctx, x, y, len, s) { ctx.save(); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y); ctx.lineTo(x + len, y); ctx.lineTo(x + len, y - 8); ctx.stroke(); metaText(ctx, s, x + len / 2, y + 34, C.text2, 'center', 28); ctx.restore(); }
// set chromosomen als chip (n), kleur = herkomst
function setChip(ctx, x, y, col, lab, a = 1, w = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 34, w, 68, 16); shape(ctx, rgba(col, 0.85), lighten(col, 0.3), 2);
  for (let k = 0; k < 5; k++) { const cx = x - w / 2 + 18 + k * (w - 36) / 4; ctx.strokeStyle = col === VADER ? '#DCE3EC' : '#5A4A20'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, y - 18 + (k % 2) * 6); ctx.lineTo(cx + 4, y + 14 - (k % 3) * 4); ctx.stroke(); }
  if (lab) text(ctx, lab, x, y + 72, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
// kern met chromosomen (herkomst) in een cel
function kernMet(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(col, 0.22), lighten(col, 0.2), 2);
  for (let k = 0; k < 7; k++) { const an = k * 0.9 + 0.3, rr = r * 0.5 * (0.4 + 0.6 * hash(k + (col === VADER ? 9 : 2))); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr;
    ctx.strokeStyle = col; ctx.lineWidth = Math.max(3, r * 0.1); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - r * 0.14, py - r * 0.1); ctx.quadraticCurveTo(px, py + r * 0.08, px + r * 0.14, py - r * 0.04); ctx.stroke(); }
  ctx.restore(); }
// voorraad in de eicel: voedingsstoffen (oker druppels), mitochondriën (koraal), ribosomen (stipjes)
function voorraad(ctx, x, y, r, o = {}) { const { voed = 0, mito = 0, ribo = 0, sch = 1 } = o; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.96, 0, 6.283); ctx.clip();
  for (let k = 0; k < 46; k++) { const an = hash(k * 3.1) * 6.283, rr = r * 0.9 * Math.sqrt(hash(k * 7.7)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr;
    if (k % 3 === 0 && voed > 0) { ctx.globalAlpha = voed; ctx.beginPath(); ctx.arc(px, py, 7 * sch, 0, 6.283); shape(ctx, rgba(C.oker, 0.8), lighten(C.oker, 0.3), 1); }
    if (k % 3 === 1 && mito > 0) { ctx.globalAlpha = mito; ctx.beginPath(); ctx.ellipse(px, py, 13 * sch, 6 * sch, an, 0, 6.283); shape(ctx, rgba(C.mito, 0.9), C.mitoR, 1.2); }
    if (k % 3 === 2 && ribo > 0) { ctx.globalAlpha = ribo; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(px + j * 5 * sch, py + (j % 2) * 4 * sch, 2.2 * sch, 0, 6.283); ctx.fillStyle = C.ribo; ctx.fill(); } } }
  ctx.restore(); }
// zwerm zaadcellen langs een pad (punten in schermcoördinaten); u0 = voorste positie (0..1), n = aantal, over = deel dat nog meedoet
function zwerm(ctx, P, u0, n, t, o = {}) { const { a = 1, over = 1, s = 0.55, spreid = 0.18, breed = 14, foc = -1 } = o; if (a <= 0.01) return; const D = bioDicht(P, 60);
  for (let i = 0; i < n; i++) { if (hash(i * 3.7) > over && i !== foc) continue; const u = clamp(u0 - spreid * hash(i * 1.9), 0, 1); const [px, py] = bioPunt(D, u); const [qx, qy] = bioPunt(D, Math.min(1, u + 0.01));
    const ang = Math.atan2(qy - py, qx - px), off = (hash(i * 5.3) - 0.5) * breed * 2; zaadcelEcht(ctx, px - Math.sin(ang) * off, py + Math.cos(ang) * off, ang, t + i * 0.37, s, { a });
    if (i === foc) { ctx.beginPath(); ctx.arc(px - Math.sin(ang) * off, py + Math.cos(ang) * off, 12, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); } } }
// pad door vrouwelijke organen (vooraanzicht, z = 0): schede → hals → holte → eileider (d = 1 rechts, -1 links) → wijde deel
function vbPad(x, y, s, d = 1) { const V = _vbBaarmoederVorm(0, 1); const H0 = V.hoek; const ox = Math.max(H0[0] + 95, V.maxX + 48), oy = H0[1] + 48; const dx = ox - H0[0];
  const S = (px, py) => [x + px * s, y + py * s];
  return { pad: [S(0, 120), S(0, 40), S(0, 0), S(0, -V.Lc * 0.6), S(0, V.yci), S(d * H0[0] * 0.7, H0[1] + 14), S(d * (H0[0] - 4), H0[1] + 2), S(d * (H0[0] + dx * 0.4), H0[1] - 6), S(d * (H0[0] + dx * 0.9), H0[1] - 14)],
    ampulla: S(d * (H0[0] + dx * 0.78), H0[1] - 12), holte: S(0, V.yci), hals: S(0, -V.Lc * 0.4), schede: S(0, 80) }; }
function tijdbalk(ctx, o = {}) { const { sp = 0, ei = 0, venster = 0, mark = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const x0 = 260, x1 = 1660, y = 560; const X = (d) => lerp(x0, x1, (d + 6) / 8);
  if (venster > 0.01) { ctx.save(); ctx.globalAlpha *= venster; ctx.fillStyle = rgba(C.groen, 0.13); ctx.fillRect(X(-5), y - 250, X(0) + 30 - X(-5), 340); text(ctx, 'seks in deze dagen kan tot een bevruchting leiden', (X(-5) + X(0)) / 2, y + 150, fTekst(36, 700), C.groen, 'center'); ctx.restore(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (let d = -6; d <= 2; d++) { ctx.beginPath(); ctx.moveTo(X(d), y - 10); ctx.lineTo(X(d), y + 10); ctx.stroke(); metaText(ctx, d === 0 ? 'eisprong' : (d > 0 ? '+' : '') + d, X(d), y + 52, d === 0 ? C.goud : C.text2, 'center', 28); }
  metaText(ctx, 'dagen', x1 + 20, y + 8, C.text2, 'left', 28);
  if (ei > 0.01) { const w = (X(1) - X(0)) * ease(ei); roundRect(ctx, X(0), y - 110, w, 56, 14); shape(ctx, rgba(C.oker, 0.45), C.oker, 2); if (ei > 0.6) text(ctx, 'eicel ± 1 dag', X(0) + 6 + w / 2, y - 72, fTekst(30, 700), C.text, 'center'); eicelEcht(ctx, X(0) - 34, y - 82, 18, ei, false); }
  if (sp > 0.01) { const w = (X(0) - X(-5)) * ease(sp); roundRect(ctx, X(0) - w, y - 200, w, 56, 14); shape(ctx, rgba(C.teal, 0.4), C.teal, 2); if (sp > 0.6) text(ctx, 'zaadcellen tot ± 5 dagen', X(0) - w / 2, y - 162, fTekst(30, 700), C.text, 'center'); }
  if (mark > 0.01) { ctx.save(); ctx.globalAlpha *= mark; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(X(-3), y - 290); ctx.lineTo(X(-3), y); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'seks', X(-3), y - 304, fTekst(32, 700), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }
// familielijn (geen namen): oma zwanger · moeder · jij
function familie(ctx, t, o = {}) { const { yb = 820, h = 300, ar = 1, al = 1, an = 1, xs = [330, 960, 1590], lab = 1 } = o;
  ctx.save(); ctx.globalAlpha *= ar; persoon(ctx, 'ria', xs[0], yb, h, { outfit: 'vroeger', zwanger: 0.85, uit: 'blij', t }); if (lab) text(ctx, 'oma, zwanger van je moeder', xs[0], yb + 46, fTekst(30, 600), C.text, 'center'); ctx.restore();
  ctx.save(); ctx.globalAlpha *= al; persoon(ctx, 'linda', xs[1], yb, h * 1.03, { uit: 'blij', t, kijk: 1 }); if (lab) text(ctx, 'je moeder', xs[1], yb + 46, fTekst(30, 600), C.text, 'center'); ctx.restore();
  ctx.save(); ctx.globalAlpha *= an; persoon(ctx, 'noor', xs[2], yb, h, { uit: 'blij', t, kijk: -1 }); if (lab) text(ctx, 'jij', xs[2], yb + 46, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
// eicel met zaadcellen die van alle kanten komen; 'een' = één bereikt het membraan
function eicelZwerm(ctx, x, y, r, t, k, een, n = 22, s = 0.9) { eicelEcht(ctx, x, y, r, 1, true);
  for (let i = 0; i < n; i++) { const an = i / n * 6.283 + 0.2 * hash(i), d0 = r * (3.2 + 0.8 * hash(i * 3)), d1 = r * (1.62 + 0.06 * hash(i * 7)); const dd = i === 0 ? lerp(d1, r * 1.04, een) : d1; const d = lerp(d0, dd, ease(clamp(k * 1.15 - 0.15 * hash(i * 2), 0, 1)));
    zaadcelEcht(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, an + Math.PI, t + i * 0.3, s, { a: i === 0 || een < 0.5 ? 1 : 0.55 });
    if (i === 0 && een > 0.05) { ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, 16, 0, 6.283); ctx.strokeStyle = rgba(C.goud, een); ctx.lineWidth = 2.5; ctx.stroke(); } } }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.beginPath(); ctx.rect(980, 140, 900, 720); ctx.clip(); eicelZwerm(ctx, 1420, 500, 150, t, 1, 1); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const an = q.on('jij', 1), ar = q.on('oma', 1), al = q.on('moeder', 1), st = q.on('Jarenlang', 1, 1.2), vr = q.on('vrij', 1), dg = q.on('dag', 1), hz = q.on('Honderden', 1, 0.8), een = q.on('één', 1, 1.2), hk = q.on('Hoe', 1);
    familie(ctx, t, { ar, al, an, yb: 790, h: 290 });
    // tijdbalk: de eicel ligt stil van oma's zwangerschap tot bij moeder
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; const x0 = 420, x1 = lerp(420, 870, ease(st)); roundRect(ctx, x0, 444, x1 - x0, 40, 20); shape(ctx, rgba(C.line, 0.28), C.line, 1.5);
      text(ctx, 'stil, jarenlang', (x0 + x1) / 2, 474, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
    const ex = lerp(420, 900, ease(vr)), eA = Math.max(st, vr) * (1 - hz); if (eA > 0.01) eicelEcht(ctx, ex, 420, 20, eA, false);
    pill(ctx, 960, 380, 'vrij bij de eisprong: nog ± 1 dag', C.oker, dg * (1 - hz), 28);
    // zoomcirkel naar de eicel met de zaadcellen
    if (hz > 0.01) zoomCircle(ctx, 1420, 250, 180 * (0.7 + 0.3 * ease(hz)), 990, 600, 'eicel en zaadcellen · vergroot', hz, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1220, 50, 400, 400); eicelZwerm(ctx, 1420, 250, 60, t, hz, een, 20, 0.6); });
    if (hk > 0.01 && !(typeof vragenUit === 'function' && vragenUit())) vraagteken(ctx, 1700, 250, hk, 120);
  },

  // ---------- H1 ----------
  s03(ctx, t, q) { micro2(ctx); const zc = q.on('zaadcel', 1), tw = q.on('twintig', 1, 1.6), bo = q.on('blote', 1);
    const ex = 640, ey = 470, r = 280; eicelEcht(ctx, ex, ey, r, 1, false); naamBij(ctx, 'eicel', 'grootste cel', ex, ey - r - 60, 1, 'center');
    if (bo > 0.01) { ctx.save(); ctx.globalAlpha *= bo; schaal(ctx, ex - r, ey + r + 50, 2 * r, '± 0,1 mm · net zichtbaar'); ctx.restore(); }
    zaadcelEcht(ctx, 1470, 470, 0, t, 2.4, { a: zc }); naamBij(ctx, 'zaadcel', 'kop ± 5 µm', 1470, 380, zc, 'center');
    if (tw > 0.01) { for (let k = 0; k < 20; k++) { const f = clamp(tw * 20 - k, 0, 1); if (f <= 0) break; const kx = ex - r + 14 + k * (2 * r - 28) / 19; ctx.beginPath(); ctx.ellipse(kx, ey, 13, 8.5, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.9 * f), C.goud, 1); }
      text(ctx, '20 koppen naast elkaar', ex, ey + r + 135, fTekst(34, 700), rgba(C.goud, tw), 'center'); }
    meta2(ctx, 'ware verhouding'); },

  s04(ctx, t, q) { micro2(ctx); const de = q.on('deling', 1), sp = q.on('eisprong', 1), ong = q.on('ongelijk', 1, 1.0), bk = q.on('bolletje', 1, 1.2), pl = q.on('poollichaampje', 1), sa = q.on('sterft', 1, 1.2), wz = q.on('Waarom', 1), vo = q.on('voedingsstoffen', 1), mi = q.on('mitochondriën', 1), ri = q.on('ribosomen', 1);
    const x = 820, y = 520, r = 250; eicelEcht(ctx, x, y, r, 1, false);
    // ongelijke deling: aan de rand snoert een klein bolletje af met één set chromosomen
    const g = Math.max(ong, bk); const px = x + r * 0.55, py = y - r * 0.92, pr = 44 * ease(g);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - 0.65 * sa; ctx.beginPath(); ctx.arc(px + 22 * ease(bk), py - 30 * ease(bk), pr, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 2); kernMet(ctx, px + 22 * ease(bk), py - 30 * ease(bk), pr * 0.5, MOEDER, ease(g)); ctx.restore(); }
    naamBij(ctx, 'poollichaampje', sa > 0.5 ? 'sterft af' : 'alleen een set chromosomen', px + 80, py - 70, pl, 'left', C.goud);
    pill(ctx, 960, 92, 'eerste deling van de meiose: vlak voor de eisprong af', C.goud, fadeIO(t, sp, wz, 0.4), 28);
    haak(ctx, x - r, x + r, y + r + 30, 'bijna al het cytoplasma in één cel', C.groen, ong * (1 - wz));
    voorraad(ctx, x, y, r, { voed: vo, mito: mi, ribo: ri, sch: 1.3 });
    naamBij(ctx, 'voorraad voor het embryo', 'voedingsstoffen · mitochondriën · ribosomen', 1180, 700, vo, 'left');
    meta2(ctx, 'vergroot · niet op schaal'); },

  s05(ctx, t, q) { micro2(ctx); const ko = q.on('kop', 1), mi = q.on('middenstuk', 1), mo = q.on('motor', 1), sta = q.on('staart', 1), ml = q.on('miljoenen', 1, 1), te = q.on('tegenover', 1, 0.8);
    const A = 1 - ml, hx = 1450, hy = 420, s = 9, U = 2.4 * s, kopL = 4.6 * U, midL = 5 * U;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; zaadcelEcht(ctx, hx, hy, 0, t * 0.3, s, { slag: 0.6 });
      if (mo > 0.01 || mi > 0.01) { const m = Math.max(mi, mo); for (let k = 0; k < 8; k++) { const mx = hx - kopL / 2 - 10 - k * (midL - 14) / 7; ctx.beginPath(); ctx.ellipse(mx, hy + Math.sin((-kopL / 2 - 10 - k * (midL - 14) / 7) / (0.42 * 50 * U) * 6.283 - t * 0.3 * 0.6 * 6.283) * 0, 7, 16, 0.4, 0, 6.283); shape(ctx, rgba(C.mito, 0.9 * m), C.mitoR, 1.5); } }
      naamBij(ctx, 'kop', 'kern met DNA', hx, hy - 110, ko, 'center'); naamBij(ctx, 'middenstuk', 'mitochondriën als motor', hx - kopL / 2 - midL / 2, hy + 110, mi, 'center', C.koraal); naamBij(ctx, 'staart', null, 520, hy + 150, sta, 'center');
      ctx.restore(); }
    if (ml > 0.01) { ctx.save(); ctx.globalAlpha *= ml; for (let i = 0; i < 70; i++) { const px = lerp(980, 1820, hash(i * 2.3)) + Math.sin(t * 0.7 + i) * 8, py = lerp(140, 820, hash(i * 4.1)); zaadcelEcht(ctx, px, py, Math.PI + (hash(i) - 0.5) * 0.6, t + i * 0.2, 0.75); }
      pill(ctx, 1400, 92, 'elke dag miljoenen nieuwe', C.teal, 1, 30); ctx.restore(); }
    if (te > 0.01) { eicelEcht(ctx, 480, 480, 230, te, false); voorraad(ctx, 480, 480, 230, { voed: te, mito: te, ribo: te }); naamBij(ctx, 'één eicel', 'neemt alles mee', 480, 800, te, 'center'); naamBij(ctx, 'heel veel zaadcellen', 'licht en snel', 1400, 880, te, 'center'); }
    meta2(ctx, 'vergroot'); },

  s06(ctx, t, q) { micro2(ctx); eicelEcht(ctx, 560, 470, 230, 1, false); voorraad(ctx, 560, 470, 230, { voed: 1, mito: 1, ribo: 1 }); zaadcelEcht(ctx, 1380, 470, 0, t, 5);
    naamBij(ctx, 'veel cytoplasma', null, 560, 780, 1, 'center'); naamBij(ctx, 'bijna geen cytoplasma', null, 1300, 600, 1, 'center');
    if (!(typeof vragenUit === 'function' && vragenUit())) vraagteken(ctx, 960, 300, q.on('Wat', 1), 120); meta2(ctx, 'vergroot'); },

  s08(ctx, t, q) { micro2(ctx); const dna = q.on('DNA', 1), li = q.on('Licht', 1), al = q.on('Alles', 1);
    const ex = 700, ey = 480, r = 260; eicelEcht(ctx, ex, ey, r, 1, false); voorraad(ctx, ex, ey, r, { voed: 0.35 + 0.65 * al, mito: 0.35 + 0.65 * al, ribo: 0.35 + 0.65 * al });
    const sx = lerp(1500, ex + r + 40, ease(dna)); zaadcelEcht(ctx, sx, ey, Math.PI, t, 4);
    if (dna > 0.3) kernMet(ctx, lerp(sx - 20, ex + r * 0.55, clamp((dna - 0.3) / 0.7, 0, 1)), ey, 22, VADER, 1);
    naamBij(ctx, 'alleen DNA', 'uit de zaadcel', ex + r + 120, ey - 90, dna, 'left', VADERL);
    pill(ctx, 1450, 230, 'licht = goedkoop en snel', C.teal, li, 30);
    naamBij(ctx, 'de rest zit in de eicel', 'voorraad voor de eerste dagen', ex, ey + r + 50, al, 'center', C.groen); meta2(ctx, 'vergroot'); },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const x = 960, y = 640, s = 2.9, P = vbPad(x, y, s, 1);
    vrouwOrganenVoor(ctx, x, y, s, { t });
    const u = 0.05 + 0.95 * ramp(t, q.at('lang', 1) - 1, q.at('eileider', 1) - q.at('lang', 1) + 2.5);
    zwerm(ctx, P.pad, u, 26, t, { s: 0.75, breed: 14 });
    naamBij(ctx, 'baarmoederhals', null, P.hals[0] - 150, P.hals[1], q.on('baarmoederhals', 1), 'right'); naamBij(ctx, 'baarmoeder', null, P.holte[0] - 220, P.holte[1] - 40, q.on('baarmoeder', 2), 'right'); naamBij(ctx, 'eileider', null, P.ampulla[0] + 40, P.ampulla[1] - 90, q.on('eileider', 1), 'left');
    const wd = q.on('wijde', 1); if (wd > 0.01) { ctx.save(); ctx.globalAlpha *= wd; ctx.beginPath(); ctx.arc(P.ampulla[0], P.ampulla[1], 40, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); naamBij(ctx, 'hier: bevruchting', 'wijde deel van de eileider', P.ampulla[0] + 60, P.ampulla[1] + 70, 1, 'left', C.goud); ctx.restore(); }
    const ni = q.on('Niet', 1); if (ni > 0.01) kruis(ctx, P.holte[0], P.holte[1], 26, ni);
    pill(ctx, 960, 92, '± 200 000 000 zaadcellen', C.teal, fadeIO(t, q.at('tweehonderd') - 0.2, q.at('Voor') + 1.5), 30); meta2(ctx, 'vooraanzicht · zaadcellen vergroot'); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const x = 960, y = 640, s = 2.9, P = vbPad(x, y, s, 1), PL = vbPad(x, y, s, -1);
    vrouwOrganenVoor(ctx, x, y, s, { t });
    const zu = q.on('zuur', 1), sl = q.on('slijm', 1), af = q.on('afweercellen', 1), ve = q.on('verkeerde', 1), ui = q.on('Uiteindelijk', 1);
    const over = 1 - 0.35 * zu - 0.3 * sl - 0.15 * af - 0.12 * ve; const u = lerp(0.6, 1, ui);
    zwerm(ctx, P.pad, u, 40, t, { s: 0.75, breed: 14, over: Math.max(0.08, over - 0.05 * ui), foc: 0 }); zwerm(ctx, PL.pad, lerp(0.6, 0.98, ve), 20, t + 3, { s: 0.75, breed: 12, a: ve * (1 - 0.5 * ui) });
    naamBij(ctx, 'zuur', 'in de vagina', P.schede[0] + 70, P.schede[1] + 30, zu, 'left', C.koraal); naamBij(ctx, 'taai slijm', 'baarmoederhals', P.hals[0] + 80, P.hals[1] + 20, sl, 'left', C.koraal);
    naamBij(ctx, 'afweercellen', null, P.holte[0] + 70, P.holte[1] - 30, af, 'left', C.koraal); naamBij(ctx, 'verkeerde eileider', null, PL.ampulla[0] - 40, PL.ampulla[1] - 90, ve, 'right', C.koraal);
    const st = zu + sl + af + ve; const lab = ui > 0.5 ? 'een paar honderd bij de eicel' : ['± 200 miljoen', 'nog ± 100 miljoen', 'nog ± 10 miljoen', 'nog ± 1 miljoen', 'nog duizenden'][Math.min(4, Math.floor(st + 0.5))]; pill(ctx, 960, 92, lab, C.teal, 1, 30);
    meta2(ctx, 'vooraanzicht · zaadcellen vergroot'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); pill(ctx, 960, 92, 'de tijd is krap', C.goud, q.on('krap', 1), 30); tijdbalk(ctx, { ei: q.on('dag', 1, 1), sp: q.on('vijf', 1, 1.2) }); },
  s12(ctx, t, q) { bg(ctx, 'schema'); tijdbalk(ctx, { ei: 1, sp: 1, mark: q.on('seks', 1) }); if (!(typeof vragenUit === 'function' && vragenUit())) vraagteken(ctx, 960, 240, q.on('Wat', 1), 110); },
  s14(ctx, t, q) { bg(ctx, 'schema'); tijdbalk(ctx, { ei: 1, sp: 1, mark: 1 - q.on('Daardoor', 1), venster: q.on('vijf', 1, 1) }); pill(ctx, 960, 92, 'zaadcellen wachten in de eileider', C.teal, q.on('wachten', 1), 30); },

  // ---------- H3 ----------
  s15(ctx, t, q) { micro2(ctx); const fo = q.on('follikel', 1), ma = q.on('mantel', 1), bl = q.on('blaasje', 1), op = q.on('open', 1, 0.8), tu = ramp(t, q.at('tunneltje') - 0.6, 2.4);
    const d1 = lerp(0.05, 0.35, ramp(t, q.at('doorheen') - 0.5, 3.2)) + 0.6 * tu;
    bvMantel(ctx, 960, 470, 1100, { t, krans: 1, sp: [{ u: -0.02, d: d1, acro: op, foc: bl * (1 - op * 0.5) }, { u: -0.36, d: 0.04 + 0.22 * ramp(t, 2, 14), acro: 0, t: t + 0.4 }, { u: 0.34, d: 0.02 + 0.12 * ramp(t, 4, 14), acro: 0, t: t + 0.9 }, { u: 0.62, d: 0.12, acro: 0, t: t + 1.3 }] });
    naamBij(ctx, 'cellen uit de follikel', null, 260, 330, fo, 'left'); naamBij(ctx, 'mantel', 'stevig en doorzichtig', 1460, 560, ma, 'left');
    naamBij(ctx, 'blaasje met enzymen', op > 0.5 ? 'open: enzymen verteren een tunneltje' : 'in de kop', 1010, 300, bl, 'left', C.goud); naamBij(ctx, 'eicel', null, 960, 860, ma, 'center');
    meta2(ctx, 'vergroot · eicel ± 0,1 mm'); },

  s16(ctx, t, q) { micro2(ctx); const zo = q.on('zona', 1), ac = q.on('acrosoom', 1), ar = q.on('acrosoomreactie', 1), ne = q.on('vrijgekomen', 1, 0.8), ve = q.on('veranderen', 1, 1.2), pa = q.on('Pas', 1);
    const B = ne, A = 1 - B * 0.85;
    ctx.save(); ctx.globalAlpha *= A; bvMantel(ctx, 960, 470, 1100, { t, krans: 0.6, sp: [{ u: -0.02, d: lerp(0.35, 0.42, ar), acro: ar, foc: ac * (1 - ar) }, { u: -0.36, d: 0.26, acro: 0, t: t + 0.4 }, { u: 0.34, d: 0.14, acro: 0, t: t + 0.9 }] });
    naamBij(ctx, 'zona pellucida', 'de mantel', 1440, 560, zo, 'left'); naamBij(ctx, 'acrosoom', 'blaasje in de kop', 1010, 300, ac * (1 - ar), 'left', C.goud); naamBij(ctx, 'acrosoomreactie', 'bij binding aan de zona', 1010, 300, ar, 'left', C.goud); ctx.restore();
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 360, 180, 1200, 560, 22); shape(ctx, rgba('#121A26', 0.92), C.line, 1.5); ctx.beginPath(); roundRect(ctx, 360, 180, 1200, 560, 22); ctx.clip();
      zaadcelEcht(ctx, 760, 420, 0, t, 6); naamBij(ctx, 'net vrijgekomen', 'acrosoom gaat nog niet open', 640, 600, 1, 'center', C.koraal);
      zaadcelEcht(ctx, 1380, 420, 0, t + 1, 6, { a: ve }); ctx.save(); ctx.globalAlpha *= ve; ctx.beginPath(); ctx.ellipse(1380, 420, 46, 30, 0, 0, 6.283); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      naamBij(ctx, 'na de tocht', 'celmembraan veranderd', 1260, 600, ve, 'center', C.groen); pijl(ctx, 900, 420, 1080, 420, C.line, ve, 3);
      metaText(ctx, 'stoffen in baarmoeder en eileider', 990, 380, C.grain, 'center', 26 * 1.08); haak(ctx, 1060, 1440, 650, 'pas dan kan het acrosoom open', C.groen, pa); ctx.restore(); }
    meta2(ctx, 'vergroot'); },

  s17(ctx, t, q) { micro2(ctx); const b = ramp(t, 1.5, 3) % 1;
    bvMantel(ctx, 960, 470, 1100, { t, krans: 0.6, sp: [{ u: -0.02, d: 0.3 + 0.06 * Math.sin(t * 2.4), acro: 0 }, { u: -0.36, d: 0.26, acro: 0, t: t + 0.4 }] });
    naamBij(ctx, 'niet veranderd onderweg', 'zwemt wel, maar …', 1010, 300, 1, 'left', C.koraal);
    if (!(typeof vragenUit === 'function' && vragenUit())) vraagteken(ctx, 1500, 260, q.on('Wat', 1), 110); meta2(ctx, 'vergroot'); },

  s19(ctx, t, q) { micro2(ctx); bvMantel(ctx, 960, 470, 1100, { t, krans: 0.6, sp: [{ u: -0.02, d: 0.32, acro: 0 }] });
    kruis(ctx, 960, 300, 26, q.on('niet', 1)); naamBij(ctx, 'acrosoom blijft dicht', 'geen tunneltje door de zona pellucida', 1010, 220, q.on('acrosoom', 1), 'left', C.koraal); meta2(ctx, 'vergroot'); },

  s20(ctx, t, q) { micro2(ctx); const ra = ramp(t, 0.2, 2.6), ve = q.on('versmelten', 1, 1.4), bi = q.on('binnen', 1, 1.6), ma = q.on('Meteen', 1, 2.6), an = q.on('Andere', 1);
    const d = lerp(0.95, 1.0, ra) + 0.3 * ve;
    bvMantel(ctx, 960, 470, 1100, { t, krans: 0.7, ux: -0.02, dicht: ma, kern: bi, sp: [{ u: -0.02, d, acro: 1 }, { u: -0.36, d: lerp(0.3, 0.42, ramp(t, 1, 5)), acro: 1, t: t + 0.4 }, { u: 0.34, d: 0.28, acro: 0.3, t: t + 0.9 }, { u: 0.6, d: 0.2 + 0.03 * Math.sin(t * 2), acro: 0, t: t + 1.3 }] });
    naamBij(ctx, 'membranen versmelten', null, 1010, 330, fadeIO(t, q.at('versmelten'), q.at('Meteen')), 'left', C.goud); naamBij(ctx, 'kern van de zaadcel', 'naar binnen', 1010, 760, bi, 'left', VADERL);
    naamBij(ctx, 'mantel verandert', 'rondom', 1360, 470, ma, 'left', C.teal); pill(ctx, 520, 300, 'kan niet meer binden', C.koraal, an, 28); meta2(ctx, 'vergroot'); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tw = q.on('twee', 1), dr = q.on('drie', 1), no = q.on('normaal', 1);
    text(ctx, 'normaal', 560, 230, fTitel(48), C.text, 'center'); setChip(ctx, 470, 380, MOEDER, 'eicel'); setChip(ctx, 650, 380, VADER, 'zaadcel'); text(ctx, '2 sets', 560, 560, fTekst(44, 700), C.groen, 'center'); vink_(ctx, 560, 640, 30, 1);
    ctx.save(); ctx.globalAlpha *= tw; text(ctx, 'twee zaadcellen', 1380, 230, fTitel(48), C.text, 'center'); setChip(ctx, 1200, 380, MOEDER, 'eicel'); setChip(ctx, 1380, 380, VADER, 'zaadcel 1'); setChip(ctx, 1560, 380, VADER, 'zaadcel 2', dr); ctx.restore();
    if (dr > 0.01) { text(ctx, '3 sets', 1380, 560, fTekst(44, 700), rgba(C.koraal, dr), 'center'); kruis(ctx, 1380, 640, 30, no || dr); } },

  s22(ctx, t, q) { micro2(ctx); const td = q.on('tweede', 1), pl = q.on('poollichaampje', 1, 1.2), sa = q.on('samen', 1, 2.2), be = q.on('bevruchting', 1), zy = q.on('zygote', 1);
    const x = 900, y = 500, r = 270; eiKaal(ctx, x, y, r);
    ctx.beginPath(); ctx.arc(x + r * 0.5, y - r * 0.98 - 40, 40, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.55), '#D9C49A', 1.5); // eerste poollichaampje (al eerder)
    if (td > 0.01 || pl > 0.01) { const g = Math.max(td * 0.4, pl); const px = x - r * 0.42, py = y - r * 0.95 - 30 * ease(pl); ctx.beginPath(); ctx.arc(px, py, 38 * ease(g), 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 2); kernMet(ctx, px, py, 18 * ease(g), MOEDER, ease(g)); }
    naamBij(ctx, 'tweede poollichaampje', null, x - r * 0.42 - 60, y - r - 110, pl, 'right', C.goud);
    const m = ease(sa); kernMet(ctx, lerp(x - 110, x - 48, m), y + 20, 56, MOEDER, 1); kernMet(ctx, lerp(x + 170, x + 48, m), y + 10, 56, VADER, 1);
    naamBij(ctx, '23 van de eicel', null, x - r - 30, y + 60, sa, 'right', MOEDER); naamBij(ctx, '23 van de zaadcel', null, x + r + 30, y + 60, sa, 'left', VADERL);
    pill(ctx, x, 92, 'bevruchting: 23 + 23 = 46', C.goud, be, 32);
    if (zy > 0.01) { ctx.save(); ctx.globalAlpha *= zy; ctx.beginPath(); ctx.arc(x, y, r + 8, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); naamBij(ctx, 'zygote', 'de bevruchte eicel', x + r + 60, y - 40, zy, 'left', C.goud); }
    meta2(ctx, 'vergroot · schematisch'); },

  // ---------- H4 ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); const x0 = 140, x1 = 1780, yc = 600;
    eileiderDoorsnede(ctx, x0, x1, yc, { t, trilhaar: 1, s: 1.15, franjes: 1 });
    const tri = q.on('Trilharen', 1); naamBij(ctx, 'trilharen en spiertjes', 'schuiven naar de baarmoeder', 980, 380, tri, 'center');
    metaText(ctx, '← naar de baarmoeder', x0 + 20, 820, C.text2, 'left', 28);
    const vo = ramp(t, q.at('voort') - 0.3, 12); const ux = lerp(x1 - 330, x0 + 220, vo);
    const n = 1 + (q.on('twee', 1, 0.8)) + 2 * q.on('vier', 1, 0.8) + 4 * q.on('acht', 1, 0.8) + 8 * q.on('zestien', 1, 0.8);
    bvKlieving(ctx, ux, yc + 10 * Math.sin(ux / 140), 24, n, { pool: 2, kern: 0 });
    zoomCircle(ctx, 1460, 230, 150, ux, yc, 'vergroot', ramp(t, q.at('deelt') - 0.5, 0.8), () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1300, 70, 320, 320); bvKlieving(ctx, 1460, 230, 112, n, { pool: 2 }); });
    const dag = 1 + Math.floor(clamp(vo, 0, 0.999) * 4); pill(ctx, 420, 92, 'dag ' + dag, C.goud, ramp(t, q.at('duurt') - 0.3, 0.5), 30);
    naamBij(ctx, 'klievingsdelingen', null, 1460, 480, q.on('klievingsdelingen', 1), 'center', C.goud); meta2(ctx, 'eileider in doorsnede · embryo vergroot'); },

  s24(ctx, t, q) { micro2(ctx); bvKlieving(ctx, 560, 470, 200, 1, { pool: 2 }); text(ctx, 'zygote', 560, 760, fTekst(36, 600), C.text, 'center');
    bvKlieving(ctx, 1360, 470, 200, 16, { pool: 2, a: q.on('zestien', 1) }); text(ctx, '16 cellen', 1360, 760, fTekst(36, 600), rgba(C.text, q.on('zestien', 1)), 'center');
    if (!(typeof vragenUit === 'function' && vragenUit())) vraagteken(ctx, 960, 470, q.on('Wat', 1), 110); meta2(ctx, 'vergroot'); },

  s26(ctx, t, q) { micro2(ctx); const xs = [250, 600, 960, 1320, 1670], ns = [1, 2, 4, 8, 16], gr = q.on('groeien', 1), cy = q.on('cytoplasma', 1), da = q.on('Daarom', 1);
    xs.forEach((x, i) => { const a = ramp(t, 0.2 + i * 0.5, 0.5); bvKlieving(ctx, x, 440, 140, ns[i], { spook: i ? 0.8 * gr : 0, pool: 2, a }); text(ctx, ['zygote', '2', '4', '8', '16 cellen'][i], x, 660, fTekst(34, 600), rgba(C.text, a), 'center');
      if (cy > 0.01) { ctx.save(); ctx.globalAlpha *= cy * a; for (let k = 0; k < 10; k++) { const an = hash(k * 3 + i) * 6.283, rr = 120 * Math.sqrt(hash(k * 7 + i)); ctx.beginPath(); ctx.arc(x + Math.cos(an) * rr, 440 + Math.sin(an) * rr, 5, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.85); ctx.fill(); } ctx.restore(); } });
    haak(ctx, 150, 1770, 720, 'meer cellen, niet groter: elke cel wordt kleiner', C.groen, q.on('even', 1));
    naamBij(ctx, 'voorraad uit de eicel', null, 960, 850, cy * (1 - da), 'center', C.oker); pill(ctx, 960, 92, 'daarom kreeg de eicel zoveel mee', C.goud, da, 30);
    meta2(ctx, 'vergroot · gestippeld: grootte van de zygote'); },

  s27(ctx, t, q) { micro2(ctx); const bu = q.on('buitenste', 1), kl = q.on('klompje', 1), kr = 0.5 * ramp(t, q.at('kruipt') - 0.2, 2.5), ne = q.on('nestelen', 1, 1), zw = q.on('Zwanger', 1);
    if (ne > 0.01) { ctx.save(); ctx.globalAlpha *= ne; ctx.fillStyle = rgba('#C98088', 0.55); ctx.beginPath(); ctx.moveTo(0, 760); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 760 + Math.sin(x / 90) * 10); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); naamBij(ctx, 'slijmvlies van de baarmoeder', null, 260, 820, 1, 'left'); ctx.restore(); }
    blastocyste(ctx, 980, 430, 210, { hlB: bu * (1 - kl), hlI: kl, hatch: kr, icm: 0 });
    pill(ctx, 960, 92, 'na ± 5 dagen: een holle bal van ± 100 cellen', C.goud, fadeIO(t, 0.3, q.at('buitenste')), 30);
    naamBij(ctx, 'buitenste laag', 'helpt straks de placenta te maken', 1250, 300, bu, 'left'); naamBij(ctx, 'klompje cellen', 'wordt het kind zelf', 1250, 520, kl, 'left');
    naamBij(ctx, 'uit de mantel', null, 1250, 680, kr * (1 - ne), 'left', C.goud); pill(ctx, 1400, 980 - 120, 'verder in de film Zwanger', C.teal, zw, 28);
    meta2(ctx, 'vergroot · ± 0,15 mm'); },

  // ---------- Recap ----------
  s28(ctx, t, q) { bg(ctx, 'schema'); const p1 = q.on('Honderden', 1), p2 = q.on('verandert', 1), p3 = q.on('twee', 1), p4 = q.on('oma', 1, 0.8);
    const pan = (i, a, fn) => { if (a <= 0.01) return; const x = 90 + i * 445, y = 150, w = 415, h = 560; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); ctx.beginPath(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); fn(x, y, w, h); ctx.restore(); };
    pan(0, p1, (x, y, w, h) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x, y, w, h); eicelZwerm(ctx, x + w / 2, y + 250, 70, t, 1, ramp(t, q.at('één'), 1), 18, 0.6); text(ctx, 'honderden komen aan', x + w / 2, y + h - 40, fTekst(28, 700), C.text, 'center'); });
    pan(1, p2, (x, y, w, h) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x, y, w, h); ctx.save(); ctx.translate(x + w / 2, y + 120); ctx.scale(0.36, 0.36); bvMantel(ctx, 0, 0, 1100, { t, krans: 0.6, ux: -0.02, dicht: ramp(t, q.at('verandert'), 2.5), kern: 1, sp: [{ u: -0.02, d: 1.3, acro: 1 }, { u: -0.4, d: 0.3, acro: 1 }, { u: 0.4, d: 0.2, acro: 0 }] }); ctx.restore(); text(ctx, 'mantel verandert', x + w / 2, y + h - 40, fTekst(28, 700), C.teal, 'center'); });
    pan(2, p3, (x, y, w, h) => { setChip(ctx, x + w / 2 - 80, y + 240, MOEDER, 'eicel'); setChip(ctx, x + w / 2 + 80, y + 240, VADER, 'zaadcel'); text(ctx, 'precies 2 sets', x + w / 2, y + h - 40, fTekst(28, 700), C.groen, 'center'); });
    pan(3, p4, (x, y, w, h) => { familie(ctx, t, { xs: [x + 80, x + 210, x + 340], yb: y + 420, h: 200, lab: 0 }); text(ctx, 'oma → moeder → jij', x + w / 2, y + h - 40, fTekst(28, 700), C.text, 'center'); }); },
});
