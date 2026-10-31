// Wat word jij? · Tuin- en landschapsinrichting 1 · Welke plant waar? — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Lotte, stagiair; Hovenier Jeroen; Opa Henk, de tuineigenaar). Namen alleen bij de eerste verschijning in beeld, nooit in de stem.
// Decor 'tuin' (tuin van Opa Henk met nieuw terras) alleen onder scènes die daar spelen: cold open, H3-meting, H3-vraag 5, recap. De kas van de kwekerij,
// de sleutel, micro, pH-balk, ton en plattegrond op navy.
// Rode draad: de kloon. De moederplant in de kas (pH 5) en de struik van de tuineigenaar (pH 7,8) hebben dezelfde genen; alleen de plek verschilt.

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860;

// ---------- hulpjes (zoals gz3/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(rand, 0.85), 2); ctx.restore(); }
function vereenvoudigd(ctx, s2, a = 1) { metaA(ctx, s2 || 'VEREENVOUDIGD', 1860, 120, a, C.text2, 'right', 28); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(30, 700); const ww = ctx.measureText(s2).width + 110; roundRect(ctx, x, y, ww, 64, 12); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 24, y + 18); ctx.lineTo(x + 48, y + 32); ctx.lineTo(x + 24, y + 46); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 64, y + 43, fTekst(30, 700), C.text, 'left'); ctx.restore(); }
function stippel(ctx, pts, col, a = 1, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([14, 10]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
// gouden lijn die over de tijd u (0..1) langs een pad groeit
function groeiLijn(ctx, pts, u, col = C.goud, lw = 5, a = 1) { if (a <= 0.01 || u <= 0.01) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rest = L * clamp(u, 0, 1); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && rest > 0; i++) { const f = Math.min(1, rest / seg[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rest -= seg[i - 1]; } ctx.stroke(); ctx.restore(); }
const HPX = 420; // basislengte personages in px (lengte uit het castboek komt erbij)
const ROZE = '#C86FA0';
// loopt van x0 naar xT (zijaanzicht), staat daarna in vooraanzicht
function loopIn(ctx, id, x0, xT, t, t0, h, o = {}) { if (t < t0) return; const dir = Math.sign(xT - x0), v = gangSnelheid(id, h, 'loop'), tw = Math.abs(xT - x0) / Math.max(v, 1);
  if (t < t0 + tw) persoon(ctx, id, x0, GROND + 6, h, { zij: true, kijk: dir, gang: 'loop', t: t - t0, vooruit: true, outfit: o.outfit, uit: o.uit || 'neutraal' });
  else persoon(ctx, id, xT, GROND, h, Object.assign({ t, kijk: o.kijkNa || dir, uit: 'neutraal' }, o)); return t >= t0 + tw; }
// zaailing in een potje: kleine struik met een tros in eigen kleur en vorm
function zaailing(ctx, x, yb, s, col, k = 0, a = 1, vraag = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; pot(ctx, x, yb, 110 * s, 80 * s, 1);
  const top = yb - 80 * s; ctx.strokeStyle = TAK; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, top - 110 * s); ctx.stroke();
  for (let j = 0; j < 6; j++) blad(ctx, x, top - (50 + j * 10) * s, (60 + 8 * (k % 2)) * s, -Math.PI / 2 + (j - 2.5) * (0.5 + 0.08 * k), { nerf: false, col: k === 2 ? '#4E8A4A' : BLAD });
  if (vraag > 0.01) vraagteken(ctx, x, top - 150 * s, vraag, 90 * s); else if (col) { const r = 40 * s * (k === 1 ? 0.8 : 1); tros(ctx, x, top - 128 * s, r, col, 1); }
  ctx.restore(); }
// seringstruik: takken met hartvormig blad en lila pluimen
function seringStruik(ctx, x, yb, s, a = 1, bloei = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const T = [[-120, -230], [-60, -300], [10, -320], [80, -290], [140, -220], [-150, -140], [160, -150]];
  ctx.strokeStyle = '#7A6A58'; ctx.lineCap = 'round'; T.forEach(([dx, dy]) => { ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, yb); ctx.quadraticCurveTo(x + dx * 0.3 * s, yb + dy * 0.5 * s, x + dx * s, yb + dy * s); ctx.stroke(); });
  T.forEach(([dx, dy], i) => { const cx = x + dx * s, cy = yb + dy * s; for (let j = 0; j < 4; j++) { const an = -Math.PI / 2 + (j - 1.5) * 0.9; blad(ctx, cx, cy + 20 * s, 54 * s, an, { vorm: 'sering', nerf: false }); }
    if (bloei > 0.01 && dy < -200) { ctx.save(); ctx.globalAlpha *= bloei; for (let k = 0; k < 14; k++) { const u = k / 13, px = cx + (hash(i * 11 + k) - 0.5) * 34 * s * (1 - u * 0.7), py = cy - u * 90 * s; circ(ctx, px, py, 9 * s, k % 3 ? '#A98BD0' : '#BBA2DC'); } ctx.restore(); } });
  ctx.restore(); }
// verhoogd bed (houten bak met zure grond)
function verhoogdBed(ctx, x, yb, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#4A3A2C'; ctx.fillRect(x - w / 2, yb - h, w, h); ctx.fillStyle = '#8C6A48'; for (let i = 0; i < 3; i++) { roundRect(ctx, x - w / 2 - 6, yb - h + i * h / 3, w + 12, h / 3 - 4, 4); ctx.fill(); }
  ctx.fillStyle = rgba(C.teal, 0.45); ctx.fillRect(x - w / 2, yb - h - 8, w, 10); ctx.restore(); }
// gesplitst beeld: moederplant in de kas (pH 5) · struik naast het terras (pH 7,8), gouden lijn 'KLOON'
function splitKloon(ctx, a = 1, t = 0, lijnU = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  kaart(ctx, 120, 150, 820, 700, 1, C.teal); kaart(ctx, 980, 150, 820, 700, 1, C.oker);
  kasLijn(ctx, 200, 860, 800, 520, 0.9); rhodoStruik(ctx, 530, 790, 1.15, { kleur: ROZE, bloei: 1 }); metaText(ctx, 'IN DE KAS', 160, 200, C.text2, 'left', 28); meterUit(ctx, 760, 300, '5,0', 1, C.teal);
  ctx.fillStyle = rgba('#8A8E96', 0.9); for (let i = 0; i < 5; i++) { roundRect(ctx, 990 + i * 132, 780, 126, 40, 4); ctx.fill(); }
  rhodoStruik(ctx, 1450, 780, 1.1, { chl: 1 }); metaText(ctx, 'NAAST HET TERRAS', 1020, 200, C.text2, 'left', 28); meterUit(ctx, 1620, 300, '7,8', 1, C.oker);
  ctx.restore(); groeiLijn(ctx, [[640, 520], [960, 470], [1280, 520]], lijnU, C.goud, 6, a); if (lijnU > 0.6) tag(ctx, 'KLOON', 960, 452, C.goud, a * clamp((lijnU - 0.6) * 3, 0, 1), 'center', 34); }

Object.assign(SCENES, {
  title(ctx, t) { rhodoTwijg(ctx, 1460, 880, 1.45, { chl: 1, n: 7 }); rhodoTwijg(ctx, 1720, 880, 1.1, { n: 6 }); metaText(ctx, 'JONG BLAD: GEEL TUSSEN DE NERVEN', 1840, 180, C.grain, 'right', 28); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'tuin', 0.6); const G = q.on('geel', 1, 0.8), N = q.on('nerven', 1, 0.5), Wq = q.on('Waarom', 1, 0.5), Z = q.on('jonge', 1, 0.5) * (1 - q.on('hovenier', 1, 0.4));
    rhodoStruik(ctx, 700, 812, 0.95, { chl: G });
    persoon(ctx, 'henk', 400, GROND, HPX, { t, kijk: 1, uit: G > 0.5 ? 'bezorgd' : 'neutraal', pose: G > 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Opa Henk', 'TUINEIGENAAR', 400, 380, 1 - q.on('hovenier', 1), 'center');
    zoomCircle(ctx, 1150, 420, 250, 760, 560, 'JONG BLAD', Z, () => { ctx.fillStyle = '#1A2740'; ctx.fillRect(880, 160, 540, 520); rhodoTwijg(ctx, 1150, 720, 1.25, { chl: G, n: 6 }); });
    naamBij(ctx, 'nerven blijven groen', '', 1150, 140, N * Z, 'center', C.groen);
    const J = q.at('hovenier', 1); loopIn(ctx, 'jeroen', 1960, 1440, t, J - 0.2, HPX, { pose: 'staan', kijkNa: -1, outfit: 'buiten' }); loopIn(ctx, 'lotte', 2150, 1680, t, J + 0.3, HPX, { pose: 'staan', kijkNa: -1 });
    const Na = q.on('stagiair', 1) * (1 - Wq * 0.999); naamBij(ctx, 'Hovenier Jeroen', '', 1440, 360, Na, 'center'); naamBij(ctx, 'Lotte', 'STAGIAIR', 1680, 340, Na, 'center');
    laag(ctx, Wq, () => { kaart(ctx, 160, 150, 1060, 200, 1, C.goud); text(ctx, 'Waarom gaat een rododendron dood', 200, 230, fTekst(52, 800), C.text, 'left'); text(ctx, 'in een kalkrijke tuin?', 200, 300, fTekst(52, 800), C.text, 'left'); vraagteken(ctx, 1130, 310, 1, 120); }); },

  // ---------- H1 Determineren ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const tI = q.at('Is', 1) - 0.2, A = 1 - ramp(t, tI, 0.4), B = ramp(t, tI, 0.4);
    const r = persoon(ctx, 'lotte', 1500, GROND, HPX, { t, kijk: -1, pose: 'vasthouden', uit: q.on('twijfelt', 1) > 0.5 ? 'bezorgd' : 'neutraal', hold: (c, x, y) => rhodoTwijg(c, x, y + 8, 0.32, { n: 5 }) });
    // A: eerst de naam, dan wat hij nodig heeft
    laag(ctx, A, () => { kaart(ctx, 140, 230, 1040, 380, q.on('nodig', 1, 0.4)); tag(ctx, 'naam', 330, 440, C.goud, q.on('naam', 1, 0.4), 'center', 48); pijl(ctx, 460, 420, 600, 420, C.line, q.on('nodig', 1, 0.4), 4, 18);
      laag(ctx, q.on('nodig', 1, 0.5), () => { phBalk(ctx, 650, 330, 200, { neutraal: 0, woorden: false }); picHalfschaduw(ctx, 960, 430, 0.6, 1, t); picVocht(ctx, 1100, 440, 0.6, 1, t); metaText(ctx, 'WAT HIJ NODIG HEEFT', 650, 570, C.grain, 'left', 28); }); });
    laag(ctx, B, () => { zoomCircle(ctx, 820, 430, 270, r.handR ? r.handR.x : 1450, r.handR ? r.handR.y - 50 : 560, 'TWIJG · HERFST', 1, () => { ctx.fillStyle = '#1A2740'; ctx.fillRect(540, 150, 560, 560); rhodoTwijg(ctx, 820, 690, 1.05, { n: 6 }); });
      tag(ctx, 'rododendron?', 820, 120, C.goud, q.on('rododendron', 1, 0.4), 'center', 34);
      etiket(ctx, 260, 830, 1.1, q.on('etiket', 1, 0.4)); naamBij(ctx, 'etiket', 'ONLEESBAAR', 330, 560, q.on('weg', 1, 0.4), 'left');
      const Bl = q.on('bloem', 1, 0.4), F = q.on('zonder', 1, 1.2); laag(ctx, Bl * (1 - F), () => { rhodoBloem(ctx, 1240, 300 + 400 * F * F, 70, ROZE, 1); }); laag(ctx, Bl, () => { vraagteken(ctx, 1240, 360, 1, 120); metaText(ctx, 'GEEN BLOEM', 1240, 450, C.koraal, 'center', 28); }); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const tD = q.at('Daarvoor', 1); antwoord(ctx, 'antwoord c: ook blad en stengel hebben kenmerken', 1 - ramp(t, tD - 0.3, 0.4));
    rhodoTwijg(ctx, 620, 860, 1.25, { n: 7 });
    naamBij(ctx, 'blad', 'VORM · RAND · STAND', 470, 330, q.on('Blad', 1, 0.4), 'right', C.groen); naamBij(ctx, 'stengel', 'HOUTIG', 590, 800, q.on('stengel', 1, 0.4), 'right', C.groen);
    laag(ctx, q.on('groeivorm', 1, 0.4), () => { rhodoStruik(ctx, 250, 640, 0.42, {}); metaText(ctx, 'GROEIVORM: STRUIK', 250, 700, C.grain, 'center', 28); });
    const S = q.on('determineersleutel', 1, 0.5), Tw = q.on('tegengestelde', 1, 0.4), K = q.on('kiest', 1, 0.4), V = q.on('volgende', 1, 0.5);
    laag(ctx, S, () => { regel(ctx, 'determineersleutel', 1400, 200, 1, C.goud, 56, 'center', 800);
      metaText(ctx, '1', 1000, 365, C.grain, 'left', 32); tegelK(ctx, 1040, 300, 340, 100, 'kruid', -0.6 * K); tegelK(ctx, 1430, 300, 340, 100, 'struik of boom', K);
      laag(ctx, Tw * (1 - K), () => { text(ctx, '↔', 1405, 362, fTekst(48, 800), C.goud, 'center'); metaText(ctx, 'TWEE TEGENGESTELDE KEUZES', 1405, 470, C.goud, 'center', 28); });
      pijl(ctx, 1600, 410, 1600, 520, C.goud, V, 4, 18); laag(ctx, V, () => { metaText(ctx, '2', 1000, 595, C.grain, 'left', 32); [1040, 1430].forEach(x => { roundRect(ctx, x, 530, 340, 100, 14); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); }); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); vereenvoudigd(ctx, 'VEREENVOUDIGD · ZELFGEMAAKTE SLEUTEL');
    const R1 = 1, R2 = q.on('Staan', 1, 0.4), s2 = q.on('Om', 3, 0.4), R3 = q.on('Heeft', 1, 0.4), s3 = q.on('Glad', 2, 0.4), E = q.on('rododendron', 1, 0.5);
    const tF = q.at('flora', 1) - 0.3, F = ramp(t, tF, 0.5), keyA = 1;
    const kx0 = 1040, kx1 = 1430, rows = [175, 365, 555];
    const row = (i, a, links, rechts, kies) => laag(ctx, a, () => { metaText(ctx, String(i + 1), 1000, rows[i] + 62, C.grain, 'left', 32); tegelK(ctx, kx0, rows[i], 340, 96, links, kies < 0 ? 1 : -kies); tegelK(ctx, kx1, rows[i], 340, 96, rechts, kies); });
    const k1 = q.on('struik', 2, 0.4); row(0, R1, 'kruid', 'struik of boom', k1); pijl(ctx, 1600, rows[0] + 104, 1600, rows[1] - 8, C.goud, R2, 4, 16);
    row(1, R2, 'tegenover elkaar', 'om en om', s2); pijl(ctx, 1600, rows[1] + 104, 1600, rows[2] - 8, C.goud, R3, 4, 16);
    row(2, R3, 'rand met stekels', 'rand glad', s3); pijl(ctx, 1600, rows[2] + 104, 1600, 735, C.goud, E, 4, 16);
    laag(ctx, E, () => { tegelK(ctx, 1430, 740, 340, 86, 'rododendron', 1, 1, ''); metaText(ctx, 'LEERACHTIG BLAD', 1380, 795, C.grain, 'right', 28); });
    // links: de twijg die we determineren + de twijg die afvalt
    laag(ctx, 1 - F, () => { const Rh = rhodoTwijg(ctx, 700, 860, 1.05, { n: 6 });
      const bl = q.on('bladeren', 1, 0.4); naamBij(ctx, 'om en om', 'VERSPREID', 790, 470, bl * (1 - R3), 'left', C.goud);
      const Se = q.on('tegenover', 1, 0.5) * (1 - R3); laag(ctx, Se, () => { seringTwijg(ctx, 300, 860, 1.05, 1); naamBij(ctx, 'tegenover elkaar', '', 300, 450, 1, 'center', C.text); kruis(ctx, 300, 600, 70, q.on('sering', 1, 0.4)); naamBij(ctx, 'sering', '', 300, 800, q.on('sering', 1, 0.4), 'center', C.koraal); });
      const Hu = q.on('stekels', 1, 0.5) * (1 - E); laag(ctx, Hu, () => { hulstTwijg(ctx, 300, 860, 1.05, 1); naamBij(ctx, 'stekels', 'JONG HULSTBLAD', 300, 450, 1, 'center', C.text); kruis(ctx, 300, 600, 70, q.on('hulst', 1, 0.4)); naamBij(ctx, 'hulst', '', 300, 800, q.on('hulst', 1, 0.4), 'center', C.koraal); });
      laag(ctx, q.on('rand', 2, 0.4) * (1 - E), () => naamBij(ctx, 'rand glad', '', 790, 640, 1, 'left', C.goud));
      laag(ctx, E, () => { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(700, 650, 250, 300, 0, 0, 6.283); ctx.stroke(); ctx.restore(); naamBij(ctx, 'rododendron', '', 700, 330, 1, 'center', C.goud); }); });
    // flora en de hovenier
    laag(ctx, F, () => { const V = q.on('veel', 1, 0.5), Hj = q.on('hovenier', 1, 0.3), Sl = q.on('sleutel', 1, 0.4);
      flora(ctx, 640, 450, 1.0, V > 0.5 ? 1 : 0, 1, t); metaA(ctx, 'HEEL VEEL GENUMMERDE STAPPEN', 640, 700, V, C.grain, 'center', 28); metaA(ctx, 'FLORA', 640, 250, V, C.goud, 'center', 32);
      laag(ctx, Hj, () => { persoon(ctx, 'jeroen', 210, GROND, HPX * 0.95, { t, kijk: 1, outfit: 'buiten', pose: Sl > 0.5 ? 'wijs' : 'staan', uit: 'blij' }); }); }); },

  // ---------- H2 Vermeerderen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); kasLijn(ctx, 110, 900, 840, 640, 1); metaText(ctx, 'KAS VAN DE KWEKERIJ', 140, 180, C.text2, 'left', 28);
    rhodoStruik(ctx, 500, 820, 1.55, { kleur: ROZE, bloei: 1 }); naamBij(ctx, 'moederplant', '', 500, 280, q.on('moederplant', 1, 0.4), 'center', C.goud);
    const He = q.on('tuineigenaar', 1, 0.3), D = q.on('drie', 1, 0.4), Lo = q.on('stagiair', 1, 0.3), Za = q.on('zaadjes', 1, 0.5), Dr = q.on('drie', 2, 0.5);
    laag(ctx, He > 0.01 ? 1 : 0, () => persoon(ctx, 'henk', 1060, GROND, HPX, { t, kijk: -1, uit: 'blij', pose: D > 0.5 ? 'wijs' : 'staan' }));
    bubbel(ctx, 1060, 350, 'Nog drie, net zo mooi!', '#F2F2EE', D * (1 - Za), 32);
    laag(ctx, Lo > 0.01 ? 1 : 0, () => persoon(ctx, 'lotte', 1420, GROND, HPX, { t, kijk: -1, uit: 'blij', pose: 'vasthouden', hold: (c, x, y) => zaaddoos(c, x, y - 30, 1.1, 1, Za) }));
    naamBij(ctx, 'zaaddoos', 'ZAADJES VAN DEZE STRUIK', 1420, 330, Za * (1 - Dr), 'center');
    for (let i = 0; i < 3; i++) zaailing(ctx, 1600 + i * 115, 840, 0.9, null, i, clamp(Dr * 3 - i, 0, 1), 1); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const tW = q.at('Wil', 1) - 0.3, A = 1 - ramp(t, tW, 0.5), B = ramp(t, tW, 0.5);
    antwoord(ctx, 'antwoord b: de zaailingen worden allemaal anders', A);
    laag(ctx, A, () => { const Be = q.on('bestuiving', 1, 1.0), Bv = q.on('bevruchting', 1, 1.4), Gn = q.on('genen', 1, 0.5), Sm = q.on('samen', 1, 0.8), Mx = q.on('zaailing', 1, 0.6);
      stamper(ctx, 360, 760, 1.05, { best: Be, bevr: Bv }); naamBij(ctx, 'bestuiving', 'STUIFMEEL OP DE STAMPER', 430, 290, Be * (1 - Bv), 'left'); naamBij(ctx, 'bevruchting', 'KERN BIJ DE EICEL', 460, 640, Bv, 'left', C.paars);
      const pA = [1, 0, 1, 1, 0, 1, 0, 0], pB = [0, 1, 1, 0, 1, 0, 0, 1];
      genBalk(ctx, 760, 260, 300, pA, Gn * (1 - Sm), 'UIT HET STUIFMEEL'); genBalk(ctx, 760, 400, 300, pB, q.on('eicel', 1, 0.4) * Gn * (1 - Sm), 'UIT DE EICEL');
      [[1, 1, 0, 1, 0, 0, 1, 0], [0, 1, 1, 0, 1, 1, 0, 0], [1, 0, 0, 1, 1, 0, 1, 1]].forEach((p, i) => { const x = 1280 + i * 220, a2 = clamp(Mx * 3 - i, 0, 1);
        zaailing(ctx, x, 700, 1.0, ['#E8A0C0', '#C83A5A', '#F2F2EE'][i], i, a2); genBalk(ctx, x - 90, 730, 180, p, a2 * Sm); });
      laag(ctx, ramp(t, q.at('samen', 1) + 0.6, 0.5) * (1 - Mx), () => { genBalk(ctx, 760, 330, 300, [1, 1, 1, 0, 1, 0, 0, 1], 1, 'NIEUWE MIX'); pijl(ctx, 1080, 345, 1200, 345, C.paars, 1, 4, 16); });
      tag(ctx, 'geslachtelijk: nieuwe mix', 1500, 300, C.paars, q.on('mix', 1, 0.4), 'center', 34);
      metaA(ctx, 'LIJKEN VAAK NIET OP DE OUDER', 1500, 380, q.on('ouder', 1, 0.4), C.text2, 'center', 28); });
    laag(ctx, B, () => { const Kn = q.on('knipt', 1, 0.6), On = q.on('onderste', 1, 1.0), Wd = q.on('wondje', 1, 0.5), Po = q.on('stekpoeder', 1, 0.6), Wr = q.on('groeien', 1, 0.4);
      tag(ctx, 'stekken', 960, 150, C.goud, q.on('stekt', 1, 0.4), 'center', 40);
      kasLijn(ctx, 40, 560, 840, 560, 0.6); rhodoStruik(ctx, 190, 820, 1.25, { kleur: ROZE, bloei: 1 }); metaText(ctx, 'MOEDERPLANT', 190, 300, C.goud, 'center', 28);
      const rj = persoon(ctx, 'jeroen', 560, GROND, HPX, { t, kijk: -1, outfit: 'buiten', uit: 'neutraal', pose: 'vasthouden', hold: (c, x, y) => { snoeischaar(c, x - 10, y - 6, 0.6, Math.PI + 0.5, 0.25 + 0.25 * Math.sin(Kn * 9), 1); if (Kn > 0.5) { c.strokeStyle = '#5E8A50'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 30, y - 4); c.lineTo(x - 30, y - 40); c.stroke(); blad(c, x - 30, y - 36, 22, -2.2, { nerf: false }); blad(c, x - 30, y - 36, 22, -0.9, { nerf: false }); } } });
      const hx = rj.handR ? rj.handR.x - 30 : 520, hy = rj.handR ? rj.handR.y - 20 : 470;
      zoomCircle(ctx, 1130, 470, 330, hx, hy, 'STEK · VERGROOT', Kn, () => { ctx.fillStyle = '#1A2740'; ctx.fillRect(790, 130, 680, 680);
        stek(ctx, 1130, 760, 0.62, { weg: [On, clamp(On * 1.3 - 0.1, 0, 1), clamp(On * 1.5 - 0.3, 0, 1), clamp(On * 1.7 - 0.5, 0, 1)], wond: Wd, poeder: Po, t });
        laag(ctx, Wr, () => { vraagteken(ctx, 1070, 790, 1, 70); vraagteken(ctx, 1300, 520, 1, 70); vraagteken(ctx, 1170, 650, 1, 70); }); });
      naamBij(ctx, 'een paar blijven zitten', '', 1500, 360, q.on('paar', 1, 0.3) * (1 - Wd), 'left', C.groen);
      naamBij(ctx, 'wondje', '', 1500, 700, Wd * (1 - Wr), 'left');
      poederPotje(ctx, 1680, 780, 1.0, Po); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('Bovenin', 1); antwoord(ctx, 'antwoord a: onderaan, waar de stengel in de grond zit', 1 - ramp(t, tB + 1.2, 0.4));
    const Ax = q.on('auxine', 1, 1.2), Wr = q.on('wortels', 1, 1.5), Po = q.on('Stekpoeder', 1, 0.5), Jb = q.on('jonge', 1, 0.8), Kp = q.on('kap', 1, 0.6), Mn = q.on('maanden', 1, 2.0);
    const px = 900, pyb = 840, ph = 250, rim = pyb - ph;
    pot(ctx, px, pyb, 330, ph, 1, true);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, rim + 4); ctx.moveTo(px - 160, rim); ctx.lineTo(px + 160, rim); ctx.lineTo(px + 120, pyb - 6); ctx.lineTo(px - 120, pyb - 6); ctx.closePath(); ctx.clip();
    stek(ctx, px, rim + 110, 0.86, { weg: [1, 1, 1, 1], wond: 0.8, aux: Ax, bladAux: Jb, wortel: Wr, kluit: Mn, t }); ctx.restore();
    kap(ctx, px, rim + 6, 420, 500, Kp, t);
    naamBij(ctx, 'auxine', 'PLANTENHORMOON', px - 230, 220, Ax * (1 - Kp), 'right', C.paars);
    tag(ctx, 'top → voet', px - 260, 520, C.paars, q.on('voet', 1, 0.4) * (1 - Po), 'center', 32);
    naamBij(ctx, 'wortels', '', px + 150, rim + 160, Wr, 'left', C.text);
    filmKaartje(ctx, 120, 780, 'Hoe een plant groeit', q.on('film', 1, 0.4) * (1 - q.on('voet', 1, 0.4)));
    laag(ctx, Po * (1 - Kp), () => { poederPotje(ctx, 1450, 640, 1.2, 1); tag(ctx, 'kunstmatig auxine', 1450, 470, C.paars, 1, 'center', 32); });
    naamBij(ctx, 'jonge bladeren', 'MAKEN OOK AUXINE', px + 180, 330, Jb * (1 - Kp), 'left', C.paars);
    naamBij(ctx, 'kap', 'LUCHT VOCHTIG', px + 230, 400, Kp * (1 - Mn), 'left', C.teal);
    laag(ctx, q.on('maanden', 1, 0.4), () => { kalender(ctx, 1500, 420, 1.2, Mn, 1); metaText(ctx, 'NA EEN PAAR MAANDEN', 1500, 640, C.grain, 'center', 28); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const tO = q.at('Ook', 1) - 0.3, A = 1 - ramp(t, tO, 0.5), B = ramp(t, tO, 0.5);
    laag(ctx, A, () => { const Gr = q.on('graaf', 1, 0.8), De = q.on('stukken', 1, 1.2), Sc = q.on('scheuren', 1, 0.4), Ge = q.on('genen', 1, 0.5), Kl = q.on('klonen', 1, 0.4);
      ctx.fillStyle = rgba(BODEM, 0.75); ctx.fillRect(120, 600, 1100, 240); metaText(ctx, 'GROND', 150, 820, C.text2, 'left', 28);
      pol(ctx, 640, 600, 1.25, { deel: De, wortel: Gr });
      spitvork(ctx, 590 - 100 * De, 660, 0.9, -0.15 - 0.2 * De, Gr * (1 - Ge)); spitvork(ctx, 700 + 100 * De, 660, 0.9, 0.15 + 0.2 * De, Gr * (1 - Ge));
      naamBij(ctx, 'wortels en scheuten', 'ELK STUK', 640, 790, q.on('scheuten', 1, 0.4) * (1 - Ge), 'center');
      regel(ctx, 'scheuren', 640, 200, Sc, C.goud, 56, 'center', 800); metaA(ctx, 'EEN POL IN STUKKEN DELEN', 640, 250, Sc, C.text2, 'center', 28);
      const pk = [1, 0, 1, 1, 0, 1, 0, 0]; [0, 1, 2].forEach(i => genBalk(ctx, 640 + (i - 1) * 290 - 80, 310, 160, pk, Ge));
      laag(ctx, Ge, () => { stek(ctx, 1680, 760, 0.6, { weg: [1, 1, 1, 1], wortel: 1, kluit: 0.4 }); genBalk(ctx, 1600, 810, 160, pk, 1); metaText(ctx, 'STEK', 1680, 280, C.grain, 'center', 28); genBalk(ctx, 1600, 160, 160, pk, 1, ''); metaText(ctx, 'OUDER', 1680, 140, C.grain, 'center', 28); });
      tag(ctx, 'ongeslachtelijk: klonen', 1250, 470, C.paars, Kl, 'center', 34); filmKaartje(ctx, 1080, 510, 'Celdeling', Kl); });
    laag(ctx, B, () => { const St = q.on('struik', 1, 0.4), Ko = q.on('kloon', 1, 0.6), U = ramp(t, q.at('kloon', 1) - 0.2, 1.6);
      kasLijn(ctx, 140, 600, 820, 480, 0.7); rhodoStruik(ctx, 370, 800, 1.0, { kleur: ROZE, bloei: 1 }); naamBij(ctx, 'moederplant', '', 370, 380, 1, 'center', C.goud);
      pot(ctx, 960, 800, 150, 120, 1); stek(ctx, 960, 680, 0.5, { weg: [1, 1, 1, 1] }); tag(ctx, 'GESTEKT OP DE KWEKERIJ', 960, 330, C.goud, ramp(t, q.at('kloon', 1) - 0.2, 0.3), 'center', 28);
      rhodoStruik(ctx, 1560, 800, 1.0, { chl: 1 }); naamBij(ctx, 'struik van de tuineigenaar', '', 1560, 380, St, 'center');
      groeiLijn(ctx, [[470, 560], [880, 540], [1040, 540], [1450, 560]], U, C.goud, 6, Ko); tag(ctx, 'kloon', 1210, 500, C.goud, q.on('moederplant', 1, 0.4), 'center', 34); }); },

  // ---------- H3 Standplaats ----------
  s13(ctx, t, q) { const tE = q.at('Een', 1) - 0.3, tK = q.at('Kalk', 1) - 0.3, tJ = q.at('jonge', 1) - 0.3;
    const A = 1 - ramp(t, tE, 0.4), B = ramp(t, tE, 0.4) * (1 - ramp(t, tK, 0.4)), Cc = ramp(t, tK, 0.4) * (1 - ramp(t, tJ, 0.4)), D = ramp(t, tJ, 0.4);
    if (A > 0.01) { laag(ctx, A, () => { decor(ctx, 'tuin', 0.6); mestZak(ctx, 430, 852, 0.85, 1); rhodoStruik(ctx, 700, 812, 0.95, { chl: 1 });
      persoon(ctx, 'lotte', 1650, GROND, HPX, { t, kijk: -1, uit: 'neutraal' });
      phMeter(ctx, 960, 852, 0.65, ramp(t, q.at('acht', 1), 0.2) > 0.5 ? '7,8' : '', q.on('meet', 1, 0.4), 1);
      persoon(ctx, 'jeroen', 1180, GROND, HPX, { t, kijk: -1, outfit: 'buiten', pose: 'wijs', uit: 'neutraal' });
      const In = q.on('moederplant', 1, 0.4) * (1 - q.on('Hier', 1, 0.3)); laag(ctx, In, () => { kaart(ctx, 140, 130, 620, 440, 1, C.teal); metaText(ctx, 'EERDER · IN DE KAS', 170, 176, C.text2, 'left', 28); kasLijn(ctx, 170, 730, 540, 340, 0.8);
        rhodoStruik(ctx, 330, 520, 0.62, { kleur: ROZE, bloei: 1 }); phMeter(ctx, 520, 530, 0.5, q.on('vijf', 1, 0.2) > 0.5 ? '5,0' : '', 1); meterUit(ctx, 610, 290, '5,0', q.on('vijf', 1, 0.3), C.teal); });
      meterUit(ctx, 960, 330, '7,8', q.on('acht', 1, 0.3), C.oker, 'NAAST HET TERRAS'); }); }
    else bg(ctx, 'schema');
    laag(ctx, B, () => { const X = phBalk(ctx, 260, 470, 1400, { band: q.on('vier', 1, 0.6), pins: [[5.0, '5,0', C.teal, 1], [7.8, '7,8', C.oker, 1]] }); metaText(ctx, 'ZUURGRAAD (pH)', 260, 300, C.grain, 'left', 28);
      tag(ctx, 'zure grond', 640, 700, C.teal, q.on('zure', 1, 0.4), 'center', 34); });
    laag(ctx, Cc, () => { const g = terrasDoorsnede(ctx, { kalk: q.on('Kalk', 1, 1.5), basisch: q.on('basisch', 1, 0.8), t, chl: 1 }); naamBij(ctx, 'tegels', '', 500, 340, 1, 'center'); naamBij(ctx, 'cementzand', '', 500, 520, q.on('cementzand', 1, 0.4), 'center'); naamBij(ctx, 'beton', '', 1015, 300, q.on('beton', 1, 0.4), 'center');
      naamBij(ctx, 'kalk', 'MAAKT DE GROND BASISCH', 1180, 760, q.on('basisch', 1, 0.4), 'left', C.oker); metaText(ctx, 'DOORSNEDE NAAST HET TERRAS', 140, 180, C.text2, 'left', 28); });
    laag(ctx, D, () => { blad(ctx, 360, 470, 720, -0.12, { chl: 1 }); naamBij(ctx, 'geel tussen de nerven', '', 760, 260, q.on('geel', 1, 0.4), 'center', GEEL); naamBij(ctx, 'nerven groen', '', 760, 700, q.on('nerven', 1, 0.4), 'center', C.groen);
      const Tk = q.on('tekort', 1, 0.5); [['mest', 1250], ['ijzer', 1460], ['water', 1670]].forEach(([s2, x], i) => laag(ctx, clamp(Tk * 3 - i, 0, 1), () => { kaart(ctx, x - 90, 380, 180, 160, 1); text(ctx, s2, x, 478, fTekst(40, 700), C.text, 'center'); }));
      laag(ctx, Tk, () => { mestZak(ctx, 1250, 360, 0.6, 1); fe(ctx, 1460, 320, 26, 0, 1); picVocht(ctx, 1670, 320, 0.45, 1, t); });
      vraagteken(ctx, 1460, 700, q.on('denk', 1, 0.3), 100); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const tI = q.at('In', 1) - 0.2, tJ = q.at('jongste', 1) - 0.3, tG = q.at('Gewoon', 1) - 0.3;
    antwoord(ctx, 'antwoord b: vooral ijzer', 1 - ramp(t, tI, 0.4));
    const pH = 7.8, Vk = q.on('verandert', 1, 1.0), Op = q.on('opnemen', 1, 0.4);
    // bodemuitsnede
    roundRect(ctx, 120, 300, 1060, 520, 18); ctx.fillStyle = '#3A2E24'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke(); metaText(ctx, 'GROND · VERGROOT', 150, 790, C.text2, 'left', 28);
    ctx.save(); roundRect(ctx, 120, 300, 1060, 520, 18); ctx.clip();
    ctx.fillStyle = rgba('#8C7A5A', 0.45); for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.ellipse(160 + hash(i * 3) * 700, 330 + hash(i * 7) * 460, 30 + 30 * hash(i), 20 + 16 * hash(i * 2), hash(i * 5) * 3, 0, 6.283); ctx.fill(); }
    wortelHaar(ctx, 900, 560, 300, 1);
    // ijzer: in zure grond los (teal) en opgenomen; bij hoge pH klonteren ze tot korrels (oker)
    const opgenomen = 1 - Vk; for (let i = 0; i < 12; i++) { const bx = 190 + (i % 4) * 150 + hash(i) * 40, by = 370 + Math.floor(i / 4) * 140 + hash(i * 3) * 40, w = wander(i, t, 10, 0.6);
      const kx = 300 + (i % 3) * 200, ky = 420 + (Math.floor(i / 4)) * 140; const x = lerp(bx + w.x, kx, Vk), y = lerp(by + w.y, ky, Vk);
      if (Vk < 0.98) fe(ctx, x, y, 22, 0, 1 - Vk); }
    if (Vk > 0.01) [[300, 420], [500, 420], [700, 420], [300, 560], [500, 560], [700, 560], [400, 700]].slice(0, 6).forEach(([x, y], i) => korrel(ctx, x + (i > 2 ? 60 : 0), y, 34, Vk, 5));
    const Gs = ramp(t, tG, 0.4), St = q.on('strooien', 1, 0.6), Vs = q.on('vast', 2, 0.6); if (Gs > 0.01) { for (let i = 0; i < 6; i++) { const u = clamp(St * 1.4 - i * 0.08, 0, 1), x = 260 + i * 120, y = lerp(260, 380 + (i % 2) * 60, u); if (Vs < 0.5) fe(ctx, x, y, 20, 0, Gs); else korrel(ctx, x, y + 20, 22, Gs, 3); } }
    ctx.restore();
    laag(ctx, Gs, () => { regel(ctx, 'ijzer strooien', 420, 250, 1, C.text, 36, 'center', 700); tag(ctx, 'nauwelijks', 870, 250, C.koraal, q.on('nauwelijks', 1, 0.4), 'center', 32); });
    laag(ctx, ramp(t, tI, 0.4) * (1 - Gs), () => phBalk(ctx, 200, 200, 820, { neutraal: 0, woorden: false, pins: [[pH, '7,8', C.oker, 1]] }));
    naamBij(ctx, 'wortelhaar', '', 760, 640, 1 - Vk * 0.0, 'center');
    naamBij(ctx, 'ijzer', 'IS ER WEL', 640, 350, (1 - Vk) * ramp(t, tI, 0.4), 'center', C.teal); naamBij(ctx, 'wortel', '', 1040, 400, 1, 'center');
    naamBij(ctx, 'vaste korreltjes', 'NIET OP TE NEMEN', 500, 700, Vk * (1 - Gs), 'center', C.oker); kruis(ctx, 830, 560, 34, Op * (1 - Gs));
    // rechts: bladcel, dan het jongste blad, dan de mest
    const Z = q.on('Zonder', 1, 0.5), J = ramp(t, tJ, 0.4), M = q.on('mest', 1, 0.4);
    laag(ctx, Z * (1 - J), () => { bladCel(ctx, 1500, 500, 460, 320, q.on('bladgroen', 1, 1.2), 1); naamBij(ctx, 'te weinig bladgroen', '', 1500, 740, q.on('bladgroen', 1, 0.4), 'center', GEEL); metaText(ctx, 'BLADCEL', 1500, 300, C.grain, 'center', 28); });
    laag(ctx, J, () => { rhodoTwijg(ctx, 1420, 860, 1.05, { chl: 1, n: 6 }); naamBij(ctx, 'jongste blad eerst', '', 1420, 330, J, 'center', GEEL); });
    laag(ctx, M, () => { mestZak(ctx, 1730, 840, 0.95, 1); kruis(ctx, 1730, 760, 60, M); }); },

  s16(ctx, t, q) { decor(ctx, 'tuin', 0.6); const Z = q.on('zon', 1, 0.4), S = q.on('suiker', 1, 0.4), G = q.on('gebeurt', 1, 0.4);
    rhodoStruik(ctx, 1000, 812, 0.95, { chl: 1 });
    persoon(ctx, 'lotte', 640, GROND, HPX, { t, kijk: 1, uit: S > 0.5 ? 'blij' : 'neutraal', pose: Z > 0.5 ? 'wijsOmhoog' : 'staan' });
    zon(ctx, 1500, 250, 70, Z, t); tag(ctx, 'volle zon?', 1500, 420, C.goud, Z, 'center', 36);
    wolk(ctx, 700, 130, 360, 140, 'meer suiker', S, '#F2F2EE', 36);
    laag(ctx, G, () => { const ux = [1280, 1480, 1680]; ux.forEach((x, i) => { kaart(ctx, x - 90, 560, 180, 200, 1); });
      blad(ctx, 1220, 680, 120, -0.4, { nerf: true }); blad(ctx, 1420, 680, 110, -0.4, { nerf: true }); picVocht(ctx, 1550, 640, 0.35, 1, t); blad(ctx, 1620, 690, 130, -0.4, { chl: 1, verbrand: 1 });
    }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const tE = q.at('rododendron', 1) - 0.6, tZ = q.at('Zuurgraad', 1) - 0.3, tK = q.at('kas', 1) - 0.4;
    const A = 1 - ramp(t, tE, 0.5), B = ramp(t, tE, 0.5) * (1 - ramp(t, tZ, 0.5)), Cc = ramp(t, tZ, 0.5) * (1 - ramp(t, tK, 0.5)), D = ramp(t, tK, 0.5);
    antwoord(ctx, 'antwoord c: hij blijft geel, en het blad kan verbranden', A * (1 - q.on('Meer', 1, 0.4)));
    laag(ctx, A, () => { const Me = q.on('Meer', 1, 1.2); const r = ton(ctx, 560, 820, 560, 520, [['licht', 0.92, '#8C6A48'], ['water', 0.85, '#8C6A48'], ['ijzer', 0.42, '#8C6A48'], ['stikstof', 0.88, '#8C6A48'], ['warmte', 0.8, '#8C6A48']], { t, groeiI: 0, groei: Me });
      regel(ctx, 'beperkende factor', 1400, 300, q.on('beperkende', 1, 0.4), C.goud, 56, 'center', 800); metaA(ctx, 'HET LAAGSTE BEPAALT HOE VOL', 1400, 360, q.on('factor', 1, 0.4), C.text2, 'center', 28);
      filmKaartje(ctx, 1190, 460, 'Waar past een soort?', q.on('film', 1, 0.4));
      laag(ctx, Me, () => { zon(ctx, 470, 220, 40, 1, t); tag(ctx, 'meer licht: niet voller', 1350, 680, C.koraal, 1, 'center', 32); }); });
    laag(ctx, B, () => { const Hs = q.on('halfschaduw', 1, 0.4), Vb = q.on('verbranden', 1, 0.8), Vo = q.on('vochtige', 1, 0.4), Wo = q.on('wortels', 1, 0.5), Dr = q.on('droogt', 1, 1.2);
      kaart(ctx, 140, 160, 520, 640, Hs); laag(ctx, Hs, () => { picHalfschaduw(ctx, 400, 360, 1.2, 1, t); naamBij(ctx, 'halfschaduw', '', 400, 600, 1, 'center', C.text); });
      laag(ctx, q.on('middagzon', 1, 0.4), () => { blad(ctx, 230, 720, 260, -0.2, { verbrand: Vb }); metaText(ctx, 'FELLE MIDDAGZON', 400, 780, C.koraal, 'center', 28); });
      kaart(ctx, 700, 160, 520, 640, Vo); laag(ctx, Vo, () => { picVocht(ctx, 960, 380, 1.4, 1, t); naamBij(ctx, 'vochtig', 'GOED DOORLATEND', 960, 640, 1, 'center', C.teal); });
      kaart(ctx, 1260, 160, 540, 640, Wo); laag(ctx, Wo, () => { const g = 420; ctx.fillStyle = '#4E3E2E'; ctx.fillRect(1280, g, 500, 360); ctx.fillStyle = _mixHex('#4E3E2E', '#A88A5A', Dr); ctx.fillRect(1280, g, 500, 90);
        rhodoStruik(ctx, 1530, g, 0.62, {}); ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let r2 = 0; r2 < 10; r2++) { const sg = r2 % 2 ? 1 : -1, len = 60 + 150 * hash(r2 * 3); ctx.beginPath(); ctx.moveTo(1530 + sg * 8, g + 4); ctx.quadraticCurveTo(1530 + sg * len * 0.5, g + 30, 1530 + sg * len, g + 25 + 40 * hash(r2 * 7)); ctx.stroke(); }
        naamBij(ctx, 'ondiepe wortels', '', 1530, 650, 1, 'center'); naamBij(ctx, 'bovenste laag droogt uit', '', 1530, 740, Dr, 'center', C.oker); }); });
    laag(ctx, Cc, () => { const St = q.on('standplaats', 1, 0.5); [[400, 'zuurgraad', q.on('Zuurgraad', 1, 0.4)], [960, 'licht', q.on('licht', 1, 0.4)], [1520, 'vocht', q.on('vocht', 2, 0.4)]].forEach(([x, s2, a2], i) => laag(ctx, a2, () => { kaart(ctx, x - 230, 260, 460, 400, 1, St > 0.5 ? C.goud : C.line);
        if (i === 0) phBalk(ctx, x - 160, 410, 320, { neutraal: 0, woorden: false }); if (i === 1) picHalfschaduw(ctx, x, 440, 1.0, 1, t); if (i === 2) picVocht(ctx, x, 450, 1.1, 1, t); text(ctx, s2, x, 630, fTekst(42, 700), C.text, 'center'); }));
      regel(ctx, 'standplaats', 960, 200, St, C.goud, 64, 'center', 800); haak(ctx, 170, 1750, 690, 'samen: de standplaats', C.groen, St); });
    laag(ctx, D, () => splitKloon(ctx, 1, t, ramp(t, tK + 0.6, 1.0))); },

  // ---------- H4 Beplantingsplan ----------
  s19(ctx, t, q) { decor(ctx, 'tuin', 0.6 * (1 - ramp(t, 0.3, 1.2))); const Zu = q.on('zuurder', 1, 0.8) * (1 - q.on('lang', 1, 1.2)), Ee = q.on('eerst', 1, 0.5);
    plattegrond(ctx, 160, 170, 1060, 640, { zuur: Zu, t, lijnen: ramp(t, 0, 0.6) }); metaText(ctx, 'DE TUIN VAN BOVENAF', 160, 150, C.text2, 'left', 28);
    tag(ctx, 'zuurder maken: blijft niet zo', 690, 500, C.koraal, q.on('lang', 1, 0.4) * (1 - Ee), 'center', 30);
    persoon(ctx, 'jeroen', 1620, GROND, HPX, { t, kijk: -1, outfit: 'buiten', uit: 'neutraal', pose: 'vasthouden', hold: (c, x, y) => tablet(c, x - 20, y - 30, 0.8, 1) });
    persoon(ctx, 'lotte', 1400, GROND, HPX * 0.98, { t, kijk: 1, uit: q.on('vraagt', 1) > 0.5 ? 'bezorgd' : 'neutraal', pose: q.on('vraagt', 1) > 0.5 ? 'denk' : 'staan', a: q.on('stagiair', 1, 0.3) });
    laag(ctx, Ee, () => { [[1340, 'meter'], [1540, 'zak'], [1740, 'bloem']].forEach(([x, k]) => { kaart(ctx, x - 85, 180, 170, 170, 1); if (k === 'meter') phMeter(ctx, x, 340, 0.42, '', 1); if (k === 'zak') { ctx.save(); ctx.fillStyle = '#6E5A44'; roundRect(ctx, x - 44, 220, 88, 110, 12); ctx.fill(); ctx.restore(); } if (k === 'bloem') tros(ctx, x, 270, 40, ROZE, 1); });
      vraagteken(ctx, 1540, 450, 1, 90); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tT = q.at('tekent', 1); antwoord(ctx, 'antwoord a: eerst de plek meten', 1 - ramp(t, tT - 0.4, 0.4));
    const Bu = q.on('bui', 1, 0.4) * (1 - q.on('tekent', 1, 0.6)), P = { lijnen: 1, t, zon: q.on('zonnig', 1, 0.5), half: q.on('schaduw', 1, 0.5), schaduw: q.on('schaduw', 1, 0.5), nat: Math.max(q.on('nat', 1, 0.5), q.on('droogvalt', 1, 0.6)), bas: q.on('basisch', 1, 0.5),
      planten: q.on('planten', 1, 1.6), sering: q.on('sering', 1, 0.6), rhodo: q.on('rododendron', 1, 0.6), bed: q.on('verhoogd', 1, 0.5) };
    const L = plattegrond(ctx, 140, 190, 1000, 620, P);
    if (Bu > 0.01) { ctx.save(); ctx.globalAlpha *= Bu; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 3; for (let i = 0; i < 40; i++) { const x = 160 + hash(i * 3) * 960, y = 200 + ((t * 300 + hash(i * 7) * 600) % 600); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); } ctx.restore(); }
    naamBij(ctx, 'zon', '', L.zon[0], L.zon[1] + 12, P.zon * (1 - P.planten), 'center', C.goud); naamBij(ctx, 'halfschaduw', '', L.half[0], L.half[1] + 110, P.half * (1 - P.planten), 'center');
    naamBij(ctx, 'nat', '', L.nat[0] - 135, L.nat[1] + 12, q.on('nat', 1, 0.5) * (1 - P.planten), 'right', C.teal); naamBij(ctx, 'basisch', 'LANGS HET TERRAS', L.bas[0] + 250, L.bas[1] - 20, P.bas * (1 - P.sering), 'left', C.oker);
    naamBij(ctx, 'sering', 'VERDRAAGT KALK', L.sering[0], L.sering[1] - 70, P.sering, 'center', '#C9B4EC');
    naamBij(ctx, 'rododendron', 'VERHOOGD BED · ZURE GROND', L.rhodo[0] + 20, L.rhodo[1] + 125, P.rhodo, 'center', '#E6A0C8');
    const Li = q.on('lijst', 1, 0.5); laag(ctx, Li, () => { kaart(ctx, 1200, 120, 620, 380, 1, C.goud); metaText(ctx, 'PLANT · AANTAL · WAAROM', 1230, 170, C.goud, 'left', 28); metaText(ctx, 'VOORBEELD', 1790, 480, C.text2, 'right', 28);
      [['rododendron', '1', 'halfschaduw, zuur bed'], ['sering', '1', 'verdraagt kalk'], ['vaste planten', '12', 'zon, droog'], ['varens', '5', 'schaduw']].forEach(([a1, a2, a3], i) => { const y = 240 + i * 62, ra = clamp(Li * 4 - i, 0, 1); laag(ctx, ra, () => { text(ctx, a1, 1230, y, fTekst(32, 700), C.text, 'left'); text(ctx, a2, 1480, y, fTekst(32, 700), C.goud, 'center'); text(ctx, a3, 1530, y, fTekst(28, 400), C.text2, 'left'); }); }); });
    regel(ctx, 'beplantingsplan', 640, 175, q.on('beplantingsplan', 1, 0.4), C.goud, 52, 'center', 800);
    persoon(ctx, 'henk', 1330, GROND, HPX * 0.72, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'lotte', 1490, GROND, HPX * 0.72, { t, kijk: 1, uit: 'blij' });
    persoon(ctx, 'jeroen', 1670, GROND, HPX * 0.72, { t, kijk: -1, outfit: 'buiten', uit: 'neutraal', pose: 'vasthouden', hold: (c, x, y) => tablet(c, x - 20, y - 30, 0.7, 1) }); },

  // ---------- Recap ----------
  s22(ctx, t, q) { const tI = q.at('basische', 1) - 0.5, S = 1 - ramp(t, tI, 0.5), Tn = ramp(t, tI, 0.5);
    if (S > 0.01) { bg(ctx, 'schema'); splitKloon(ctx, S, t, 1); }
    laag(ctx, Tn, () => { decor(ctx, 'tuin', 0.6); metaText(ctx, 'EEN PAAR MAANDEN LATER', 1860, 860, C.text2, 'right', 28);
      verhoogdBed(ctx, 420, 668, 190, 44, 1); rhodoStruik(ctx, 420, 628, 0.48, { nieuw: true }); naamBij(ctx, 'nieuw groen blad', 'ACHTERIN · HALFSCHADUW', 420, 730, q.on('Dezelfde', 1, 0.4), 'center', C.groen);
      [[-0.7, 0.85], [-0.35, 1], [0, 1.1], [0.35, 1], [0.7, 0.85]].forEach(([an, k]) => { ctx.save(); ctx.translate(1640, 815); ctx.rotate(an); seringTwijg(ctx, 0, 0, 1.0 * k, 1); ctx.restore(); }); naamBij(ctx, 'sering', 'NAAST HET TERRAS', 1640, 330, q.on('Dezelfde', 1, 0.4), 'center', '#C9B4EC');
      persoon(ctx, 'henk', 760, GROND, HPX, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'lotte', 1000, GROND, HPX, { t, kijk: -1, uit: 'blij' }); persoon(ctx, 'jeroen', 1240, GROND, HPX, { t, kijk: -1, outfit: 'buiten', uit: 'blij' });
      const K = [['HOGE pH: IJZER ZIT VAST → GEEL BLAD', 'ijzer', (x, y) => blad(ctx, x - 70, y, 140, -0.15, { chl: 1, nerf: false })],
        ['SLEUTEL: STEEDS KIEZEN UIT TWEE', 'sleutel', (x, y) => { tegelK(ctx, x - 130, y - 30, 120, 56, 'a', -0.4); tegelK(ctx, x + 10, y - 30, 120, 56, 'b', 1); }],
        ['ZAAIEN: NIEUWE MIX · STEKKEN EN SCHEUREN: KLONEN', 'stekken', (x, y) => { genBalk(ctx, x - 110, y - 30, 100, [1, 0, 1, 0], 1); genBalk(ctx, x + 10, y - 30, 100, [1, 0, 1, 0], 1); }],
        ['EERST DE PLEK, DAN DE PLANT', 'plek', (x, y) => { ctx.save(); ctx.translate(x - 85, y - 52); ctx.scale(0.17, 0.17); plattegrond(ctx, 0, 0, 1000, 620, { zon: 1, bas: 1, sering: 1, rhodo: 1, bed: 1 }); ctx.restore(); }]];
      K.forEach(([s2, cue, fn], i) => { const a2 = cue === 'plek' ? q.on('plek', 2, 0.5) : q.on(cue, 1, 0.5); const x = 130 + i * 420, y = 120; laag(ctx, a2, () => { kaart(ctx, x, y, 400, 270, 1, C.goud); fn(x + 200, y + 76); ctx.font = fMeta(28); ctx.fillStyle = C.text; ctx.textAlign = 'center'; wrap(ctx, s2, x + 200, y + 158, 370, 32); }); }); }); },

  s23(ctx, t, q) { decor(ctx, 'tuin', 0.6); roundRect(ctx, 120, 130, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Waar leer je dit?', 150, 200, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 200, C.grain, 'right', 28);
    [['mbo', 'Hovenier en groene ruimte', 'NIVEAU 2–4 · O.A. VELP', 'mbo'], ['hbo', 'Tuin- en Landschapsinrichting', 'VELP', 'hbo'], ['wo', 'Landschapsarchitectuur en ruimtelijke planning', 'WAGENINGEN', 'Wageningen']].forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, 120, 280 + i * 165, 1180, 140, 18); shape(ctx, rgba('#0D1420', 0.88), C.groen, 2); text(ctx, n, 170, 365 + i * 165, fTitel(48), C.groen); text(ctx, o, 310, 360 + i * 165, fTekst(o.length > 34 ? 38 : 44, 700), C.text); metaText(ctx, m, 310, 400 + i * 165, C.grain, 'left', 28); ctx.restore(); });
    laag(ctx, q.on('Daarna', 1, 0.4), () => { roundRect(ctx, 120, 780, 1180, 80, 14); shape(ctx, rgba('#0D1420', 0.88), null); metaText(ctx, 'WERK', 150, 832, C.grain, 'left', 28);
      [['hovenier', 'tuinen', 270], ['kweker', 'kweek', 560], ['landschapsarchitect', 'ontwerp', 800]].forEach(([s2, cue, x]) => regel(ctx, s2, x, 834, q.on(cue, 1, 0.4), C.text, 36, 'left', 600)); });
    persoon(ctx, 'jeroen', 1600, GROND, HPX, { t, kijk: -1, outfit: 'buiten', uit: 'blij' }); }
});
