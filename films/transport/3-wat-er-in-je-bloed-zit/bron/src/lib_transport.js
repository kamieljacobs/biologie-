// ===== Seriebibliotheek Transport (Part C, Schema-look voor organen) =====
// Kleuren (seriebrief): bloed zuurstofrijk/zuurstofarm zoals Gas op reis; plasma lichte oker; lymfe groen-grijs;
// elektrisch signaal teal; water in de plant teal, suikers oker.
const TR = { arm: '#8E3E46', rijk: '#D9483E', armL: '#B0646B', rijkL: '#F07A6E', spier: '#6A4646', spierR: '#A8716A',
  bind: '#AFC0D0', plasma: '#D9C27E', lymfe: '#9FB89A', signaal: C.teal, water: C.teal, suiker: C.oker, klep: '#E8E1D0' };

// ---------- hartcyclus ----------
// u in [0,1): 0–0.42 hartpauze (diastole), 0.42–0.58 boezemsystole, 0.58–0.63 kamers spannen aan (alle kleppen dicht),
// 0.63–0.88 uitdrijving (halvemaanvormige kleppen open), 0.88–0.93 ontspanning (alle kleppen dicht).
function hartFase(u) {
  u = ((u % 1) + 1) % 1;
  const atr = u >= 0.42 && u < 0.6 ? Math.sin((u - 0.42) / 0.18 * Math.PI) : 0;
  let ven = 0; if (u >= 0.58 && u < 0.95) { const v = (u - 0.58) / 0.37; ven = v < 0.25 ? ease(v / 0.25) : v < 0.75 ? 1 : 1 - ease((v - 0.75) / 0.25); }
  const av = u < 0.585 || u >= 0.93 ? 1 : 0;         // hartkleppen open?
  const sl = u >= 0.63 && u < 0.88 ? 1 : 0;           // halvemaanvormige kleppen open?
  const naam = u < 0.42 ? 'hartpauze' : u < 0.58 ? 'boezems trekken samen' : u < 0.93 ? 'kamers trekken samen' : 'hartpauze';
  return { u, atr, ven, av, sl, naam };
}
// zachte overgang van een klepstand (0..1) rond de schakelmomenten
function klepZacht(u, open, k = 0.02) { return open; }

// ---------- het hart in doorsnede (vooraanzicht; links op het plaatje = rechterharthelft) ----------
// o: { a, f (hartFase), dimR, dimL, hi: {RA,RV,LA,LV,septum,klepAV,klepSL,krans,bind}, vaten: 0..1, krans: 0..1, peesdraden: 0..1,
//      t (voor bloedstroom), stroom: 0..1, wandLabel }
function hart(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = hartFase(0.2), vaten = 1, krans = 0, peesdraden = 1, stroom = 0, t = 0, hi = {}, dimR = 0, dimL = 0, bind = 0, kleur = 1 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const vI = f.ven * 22, aI = f.atr * 12;
  const armF = kleur ? TR.arm : '#4A5468', rijkF = kleur ? TR.rijk : '#4A5468';
  const tube = (pts, w, fill, edge, al = 1) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = edge; ctx.lineWidth = w + 4; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = fill; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); };
  // --- grote vaten (achter het hart) ---
  const dR = 1 - 0.65 * dimR, dL = 1 - 0.65 * dimL;
  ctx.save(); ctx.globalAlpha *= vaten;
  tube([[-40, -40], [-40, -215], [-70, -245], [-330, -250]], 30, armF, lighten(TR.arm, 0.3), dR);            // longslagader naar rechterlong
  tube([[-40, -215], [-10, -255], [230, -265], [300, -262]], 26, armF, lighten(TR.arm, 0.3), dR);              // naar linkerlong (achter aorta)
  tube([[40, -40], [40, -270], [110, -330], [240, -320], [310, -260], [320, 270]], 36, rijkF, lighten(TR.rijk, 0.25), dL); // aorta + boog + dalende aorta
  tube([[90, -322], [80, -375]], 12, rijkF, lighten(TR.rijk, 0.25), dL); tube([[165, -334], [168, -385]], 12, rijkF, lighten(TR.rijk, 0.25), dL); tube([[235, -322], [252, -372]], 12, rijkF, lighten(TR.rijk, 0.25), dL);
  tube([[-175, -150], [-175, -310]], 34, armF, lighten(TR.arm, 0.3), dR);                                     // bovenste holle ader
  tube([[-225, -100], [-300, -100], [-300, 290]], 34, armF, lighten(TR.arm, 0.3), dR);                         // onderste holle ader
  tube([[220, -150], [285, -170]], 18, rijkF, lighten(TR.rijk, 0.25), dL); tube([[220, -95], [285, -80]], 18, rijkF, lighten(TR.rijk, 0.25), dL); // longaders
  ctx.restore();
  // --- spiermassa kamers ---
  const sc = 1 - 0.04 * f.ven;
  ctx.save(); ctx.scale(sc, sc);
  ctx.beginPath(); ctx.moveTo(-262, -40); ctx.bezierCurveTo(-268, 70, -240, 170, -150, 225); ctx.bezierCurveTo(-60, 280, 90, 330, 170, 300);
  ctx.bezierCurveTo(250, 270, 280, 150, 272, -40); ctx.closePath(); shape(ctx, TR.spier, TR.spierR, 2);
  // boezems (dunne spierwand)
  roundRect(ctx, -240, -188, 182, 150, 46); shape(ctx, TR.spier, TR.spierR, 2);
  roundRect(ctx, 58, -188, 182, 150, 46); shape(ctx, TR.spier, TR.spierR, 2);
  ctx.restore();
  // --- holtes (bloed) ---
  const lum = (path, col, al) => { ctx.save(); ctx.globalAlpha *= al; path(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rgba('#000000', 0.25); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); };
  // rechterboezem, linkerboezem
  lum(() => roundRect(ctx, -232 + aI, -180 + aI, 166 - 2 * aI, 134 - aI, 40), armF, dR);
  lum(() => roundRect(ctx, 66 + aI, -180 + aI, 166 - 2 * aI, 134 - aI, 40), rijkF, dL);
  // rechterkamer (dunne wand), linkerkamer (dikke wand)
  lum(() => { ctx.beginPath(); ctx.moveTo(-248 + vI * 0.5, -22); ctx.bezierCurveTo(-252 + vI, 60, -230 + vI, 140, -150 + vI * 0.6, 185 - vI * 0.8); ctx.bezierCurveTo(-90, 215 - vI, -45 - vI * 0.2, 200 - vI, -32 - vI * 0.3, 150); ctx.lineTo(-32 - vI * 0.2, -22); ctx.closePath(); }, armF, dR);
  lum(() => { ctx.beginPath(); ctx.moveTo(32 + vI * 0.3, -22); ctx.lineTo(32 + vI * 0.4, 150); ctx.bezierCurveTo(50 + vI * 0.4, 215 - vI, 120, 262 - vI * 1.2, 168 - vI * 0.3, 240 - vI * 1.1); ctx.bezierCurveTo(225 - vI, 210 - vI, 240 - vI, 120, 238 - vI * 0.9, -22); ctx.closePath(); }, rijkF, dL);
  // bindweefselring tussen boezems en kamers
  ctx.save(); ctx.globalAlpha *= 0.55 + 0.45 * bind; ctx.fillStyle = bind > 0.01 ? rgba(TR.bind, 0.35 + 0.4 * bind) : rgba(TR.bind, 0.25);
  ctx.fillRect(-250, -46, 500, 22); ctx.restore();
  // --- hartkleppen (twee slippen per opening) ---
  const avKlep = (cx, open, al, hiK) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = hiK ? C.goud : TR.klep; ctx.lineWidth = 6; ctx.lineCap = 'round';
    const half = 44, ang = lerp(0.05, 1.25, open); // 0 = dicht (horizontaal), open = naar beneden
    for (const sd of [-1, 1]) { const hx = cx + sd * half, hy = -35; const ex = hx - sd * Math.cos(ang) * half * 0.98, ey = hy + Math.sin(ang) * half * 0.98;
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(ex, ey); ctx.stroke();
      if (peesdraden > 0.01) { ctx.save(); ctx.globalAlpha *= peesdraden * 0.8; ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(TR.klep, 0.8); const px = cx + sd * 30, py = 120; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(px, py); ctx.stroke(); ctx.fillStyle = TR.spierR; ctx.beginPath(); ctx.ellipse(px, py + 10, 10, 16, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    } ctx.restore(); };
  avKlep(-150, f.av, dR, hi.klepAV); avKlep(150, f.av, dL, hi.klepAV);
  const slKlep = (cx, yy, open, al, hiK) => { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = hiK ? C.goud : TR.klep; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (const sd of [-1, 1]) { const hx = cx + sd * 20; const tip = lerp(cx + sd * 3, cx + sd * 17, open); ctx.beginPath(); ctx.moveTo(hx, yy - 18); ctx.quadraticCurveTo(hx - sd * 2, yy + 6, tip, yy + lerp(0, -22, open)); ctx.stroke(); } ctx.restore(); };
  slKlep(-40, -62, f.sl, dR * vaten, hi.klepSL); slKlep(40, -62, f.sl, dL * vaten, hi.klepSL);
  // --- kransslagaders ---
  if (krans > 0.01) { ctx.save(); ctx.globalAlpha *= krans; ctx.strokeStyle = TR.rijkL; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(30, -70); ctx.bezierCurveTo(140, -30, 230, 40, 225, 160); ctx.stroke(); ctx.beginPath(); ctx.moveTo(150, 0); ctx.bezierCurveTo(110, 100, 120, 200, 160, 280); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(25, -75); ctx.bezierCurveTo(-60, -95, -200, -40, -235, 60); ctx.bezierCurveTo(-245, 110, -230, 150, -220, 170); ctx.stroke(); ctx.restore(); }
  // --- bloedstroom ---
  if (stroom > 0.01) { const pf = (pts, col, on, sp, n, seed) => { if (on > 0.01) particleFlow(ctx, pts, n, t, sp, col, 6, seed, stroom * on); };
    const inflow = f.av ? 1 : 0.15; const out = f.sl;
    pf([[-175, -300], [-175, -120], [-150, -40], [-150, 80]], TR.armL, inflow, 140, 7, 1);
    pf([[-290, 260], [-290, -100], [-200, -100], [-150, -20]], TR.armL, inflow, 140, 7, 11);
    pf([[280, -170], [150, -130], [150, 80]], TR.rijkL, inflow, 140, 7, 21);
    pf([[-110, 120], [-40, -40], [-40, -215], [-300, -250]], TR.armL, out, 420, 9, 31);
    pf([[110, 160], [40, -40], [40, -270], [110, -330], [240, -320], [320, 200]], TR.rijkL, out, 520, 12, 41);
  }
  ctx.restore();
}
// handige ankerpunten (in lokale coördinaten × s + x/y)
function hartPunt(x, y, s, naam) { const P = { RA: [-150, -115], LA: [150, -115], RV: [-140, 80], LV: [140, 100], septum: [0, 90], aorta: [110, -330], longslagader: [-40, -180], longader: [280, -170], bovenste: [-175, -290], onderste: [-300, 200], klepR: [-150, -35], klepL: [150, -35], slR: [-40, -62], slL: [40, -62], krans: [200, 60], wandLV: [255, 120], wandRV: [-258, 80], sinus: [-190, -165], avknoop: [-30, -35], apex: [150, 300], bind: [0, -35] };
  const p = P[naam]; return [x + p[0] * s, y + p[1] * s]; }

// ---------- schematisch hart (vier vakjes) voor de bloedsomloop-lus ----------
function hartVakjes(ctx, x, y, s = 1, o = {}) { const { a = 1, hi = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const w = 90 * s, h = 70 * s, g = 8 * s;
  const cel = (cx, cy, col, lab, key) => { roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 14 * s); shape(ctx, rgba(col, 0.75), hi === key ? C.goud : lighten(col, 0.3), hi === key ? 3 : 1.5); metaText(ctx, lab, cx, cy + 9 * s, C.text, 'center', Math.max(20, 22 * s)); };
  cel(x - w / 2 - g / 2, y - h / 2 - g / 2, TR.arm, 'RB', 'RA'); cel(x + w / 2 + g / 2, y - h / 2 - g / 2, TR.rijk, 'LB', 'LA');
  cel(x - w / 2 - g / 2, y + h / 2 + g / 2, TR.arm, 'RK', 'RV'); cel(x + w / 2 + g / 2, y + h / 2 + g / 2, TR.rijk, 'LK', 'LV');
  ctx.restore(); }

// ---------- dubbele bloedsomloop als lus (rechte lijnen, één kruising met brugje) ----------
function lusPunten(x, y, s = 1) { const P = (px, py) => [x + px * s, y + py * s];
  return { klein: [P(-94, 39), P(-200, 39), P(-200, -310), P(-150, -310), P(150, -310), P(220, -310), P(220, -39), P(94, -39)],
           groot: [P(94, 39), P(300, 39), P(300, 390), P(210, 390), P(-210, 390), P(-300, 390), P(-300, -39), P(-94, -39)] }; }
function _polyLen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function _polySub(pts, u0, u1) { const L = _polyLen(pts); const out = []; let acc = 0; const a0 = u0 * L, a1 = u1 * L;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); const s0 = acc, s1 = acc + d;
    if (s1 >= a0 && s0 <= a1) { const f0 = clamp((a0 - s0) / d, 0, 1), f1 = clamp((a1 - s0) / d, 0, 1); const p0 = [lerp(pts[i - 1][0], pts[i][0], f0), lerp(pts[i - 1][1], pts[i][1], f0)], p1 = [lerp(pts[i - 1][0], pts[i][0], f1), lerp(pts[i - 1][1], pts[i][1], f1)]; if (!out.length) out.push(p0); out.push(p1); }
    acc = s1; } return out; }
function lus(ctx, x, y, s = 1, o = {}) {
  const { a = 1, klein = 1, groot = 1, labels = 1, hi = null, druppel = -1, druppelRonde = 'klein' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = lusPunten(x, y, s); const lw = Math.max(8, 14 * s);
  const mix = (k) => { const A = [0x8E, 0x3E, 0x46], B = [0xD9, 0x48, 0x3E]; return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(k, 0, 1))).toString(16).padStart(2, '0')).join(''); };
  const draw = (pts, u0, u1, col, al) => { if (al <= 0.01) return; const D = _polySub(pts, u0, u1); ctx.save(); ctx.globalAlpha *= al; ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); D.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); };
  // grote ronde eerst: zuurstofrijk tot de organen, dan zuurstofarm
  draw(L.groot, 0, 0.5, TR.rijk, groot); draw(L.groot, 0.5, 1, TR.arm, groot);
  // brugje: donkere onderlaag waar de kleine ronde de grote kruist
  if (klein > 0.01 && groot > 0.01) { const bx = x - 200 * s, by = y - 39 * s; ctx.save(); ctx.globalAlpha *= Math.min(klein, groot); ctx.fillStyle = C.bgSchema; ctx.fillRect(bx - lw, by - lw * 1.2, lw * 2, lw * 2.4); ctx.restore(); }
  draw(L.klein, 0, 0.5, TR.arm, klein); draw(L.klein, 0.5, 1, TR.rijk, klein);
  const pijl = (pts, u, al) => { if (al <= 0.01) return; const p = padPunt(pts, u, false), q = padPunt(pts, u + 0.012, false); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.text; ctx.lineWidth = 3; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.beginPath(); ctx.moveTo(q[0] - Math.cos(an - 0.5) * 16, q[1] - Math.sin(an - 0.5) * 16); ctx.lineTo(q[0], q[1]); ctx.lineTo(q[0] - Math.cos(an + 0.5) * 16, q[1] - Math.sin(an + 0.5) * 16); ctx.stroke(); ctx.restore(); };
  for (const u of [0.22, 0.8]) pijl(L.klein, u, klein); for (const u of [0.2, 0.82]) pijl(L.groot, u, groot);
  const orgaan = (cx, cy, w, h, lab, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 24); shape(ctx, C.fill, C.line, 1.5); text(ctx, lab, cx, cy + 12, fTekst(Math.max(28, 34 * s), 600), C.text, 'center'); ctx.restore(); };
  orgaan(x, y - 310 * s, 300 * s, 90 * s, 'longen', klein); orgaan(x, y + 390 * s, 420 * s, 90 * s, s < 0.6 ? 'organen' : 'organen in je lichaam', groot);
  hartVakjes(ctx, x, y, s, { hi });
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels; const fs = Math.max(28, 30 * s);
    const lab = (s1, px, py, al, al2, col) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; text(ctx, s1, px, py, fTekst(fs, 600), col, al2); ctx.restore(); };
    lab('longslagader', x - 216 * s, y - 190 * s, klein, 'right', TR.armL); lab('longaders', x + 236 * s, y - 190 * s, klein, 'left', TR.rijkL);
    lab('aorta', x + 316 * s, y + 230 * s, groot, 'left', TR.rijkL); lab('holle aders', x - 316 * s, y + 230 * s, groot, 'right', TR.armL); ctx.restore(); }
  if (druppel >= 0) { const pts = L[druppelRonde]; const p = padPunt(pts, druppel, false); const k = druppelRonde === 'klein' ? (druppel > 0.5 ? 1 : 0) : (druppel < 0.5 ? 1 : 0);
    ctx.save(); ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(12, 16 * s), 0, 6.283); shape(ctx, mix(k), C.goud, 3); ctx.restore(); }
  ctx.restore(); return L;
}

// ---------- ECG ----------
// v(p) voor p in [0,1) van één hartslag; uitgelijnd op hartFase: P vóór de boezemsystole, QRS bij het begin van de kamersystole
function ecgV(p) { p = ((p % 1) + 1) % 1; const g = (c, w, h) => h * Math.exp(-((p - c) ** 2) / (2 * w * w));
  return g(0.40, 0.022, 0.16) - g(0.555, 0.006, 0.12) + g(0.57, 0.007, 1) - g(0.585, 0.007, 0.25) + g(0.80, 0.04, 0.3); }
function ecg(ctx, x, y, w, h, o = {}) { const { a = 1, beats = 2, u = 1, cursor = -1, labels = 0, col = TR.signaal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + h * 0.7); ctx.lineTo(x + w, y + h * 0.7); ctx.stroke();
  ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); const N = 400;
  for (let i = 0; i <= N * u; i++) { const px = x + i / N * w, p = i / N * beats; const py = y + h * 0.7 - ecgV(p) * h * 0.6; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (cursor >= 0) { const px = x + cursor / beats * w; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px, y + h); ctx.stroke(); }
  if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels; const L = (lab, p, dy) => text(ctx, lab, x + p / beats * w, y + h * 0.7 - ecgV(p) * h * 0.6 + dy, fTekst(30, 700), C.text, 'center');
    L('P', 0.40, -22); L('QRS', 0.57, -22); if (o.labelT !== false) L('T', 0.80, -24); ctx.restore(); }
  ctx.restore(); }

// ---------- bloedvaten in doorsnede (film 2) ----------
function vatDoorsnede(ctx, x, y, kind, o = {}) { const { a = 1, s = 1, puls = 0, label = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (kind === 'slagader') { const r = 120 * (1 + 0.06 * puls); ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, '#C9B896', lighten('#C9B896', 0.3), 2); // bindweefsel buiten
    ctx.beginPath(); ctx.arc(0, 0, r - 18, 0, 6.283); shape(ctx, TR.spier, TR.spierR, 2); // spierlaag
    ctx.strokeStyle = rgba('#F2E6C8', 0.8); ctx.lineWidth = 2; for (const k of [0.35, 0.6, 0.85]) { ctx.beginPath(); ctx.arc(0, 0, r - 18 - 40 * k, 0, 6.283); ctx.stroke(); } // elastische vezels
    ctx.beginPath(); ctx.arc(0, 0, r - 62, 0, 6.283); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 1.5); }
  else if (kind === 'ader') { ctx.beginPath(); ctx.ellipse(0, 0, 150, 95, 0, 0, 6.283); shape(ctx, '#C9B896', lighten('#C9B896', 0.3), 2); ctx.beginPath(); ctx.ellipse(0, 0, 140, 85, 0, 0, 6.283); shape(ctx, TR.spier, TR.spierR, 1.5);
    ctx.beginPath(); ctx.ellipse(0, 0, 130, 76, 0, 0, 6.283); shape(ctx, TR.arm, lighten(TR.arm, 0.3), 1.5); }
  else { ctx.beginPath(); ctx.arc(0, 0, 34, 0, 6.283); shape(ctx, rgba(C.er, 0.3), C.er, 2); ctx.beginPath(); ctx.arc(0, 0, 27, 0, 6.283); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 1.5);
    ctx.fillStyle = rgba(C.er, 0.8); for (const an of [0.4, 2.5, 4.4]) { ctx.beginPath(); ctx.ellipse(Math.cos(an) * 31, Math.sin(an) * 31, 9, 4, an + Math.PI / 2, 0, 6.283); ctx.fill(); } }
  ctx.restore(); }

// ---------- klein lichaam met bloedvaten (film 2–5) ----------
function lichaamVaten(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, stroom = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  lichaam(ctx, x, y, s, 1, { darm: 0 }); ctx.restore(); }
