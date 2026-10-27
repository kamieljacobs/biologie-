// =====================================================================================
// HART IN DOORSNEDE (frontaal, vooraanzicht) — naast anHeart (lib_anatomie.js, buitenkant in het lichaam).
// Links op het plaatje = rechterharthelft (zuurstofarm, blauw); rechts = linkerharthelft (zuurstofrijk, rood).
// Recept: hart ± vuist (12 × 8,5 cm); punt (apex) wijst naar links-onder van de persoon = rechtsonder op het
// plaatje. Wand linkerkamer ± 3× zo dik als rechterkamer (pompt naar het hele lichaam); boezems dunwandig.
// Rechterkamer ligt vóór en loopt als sikkel om het tussenschot heen en omhoog naar de longslagader.
// Kleppen: tricuspidalis (R) en mitralis (L) tussen boezem en kamer, met peesdraden naar papilspieren;
// halvemaanvormige kleppen aan de basis van longslagader en aorta. Grote vaten: bovenste en onderste holle ader
// in de rechterboezem, aorta(boog met 3 takken) uit de linkerkamer achter de longslagader langs, longaders
// in de linkerboezem. Cyclus (o.u 0..1): 0–0,42 hartpauze (AV-kleppen open, kamers vullen), 0,42–0,58 boezems
// trekken samen, 0,58–0,93 kamers trekken samen (AV dicht; 0,63–0,88 halvemaankleppen open), dan ontspanning.
// Bron: OpenStax Biology 40.3; vorm naar referentieplaat (bron.md). Wand ± 3×: nog een tweede bron nodig. Bekende fouten: apex naar
// links op het plaatje; linkerkamerwand even dun als rechts; kamers tegelijk met boezems; aorta uit de rechterkamer.
// Ontwerp: hoogte ± 600 (y −300..300), breedte ± 500, oorsprong = midden van het hart. Aanpak C (ronde 2, uit A):
// anatomisch (naar referentieplaat), rustige holtes (geen streepjes), onderste holle ader mondt van onderen in de
// rechterboezem (langs de buitenkant, niet door de rechterkamer), AV-kleppen als echte klepslippen met peesdraden aan
// de vrije rand, grotere halvemaanvormige kleppen, bloedstroom als open pijlen door de open kleppen.
// Longaders: alleen de linker twee getekend (de rechter liggen achter de rechterboezem en zijn in vooraanzicht verborgen).
// o: a, u (fase), t, pijlen (1 = stroompijlen), stroom (0..1 bloeddeeltjes, oud), hi ('RB','RK','LB','LK','kleppen', null), detail (1; <0,5 = minder)
// Geeft ankerpunten terug (wereldcoördinaten).
// =====================================================================================
function hartDoorsnedeFase(u) {
  u = ((u % 1) + 1) % 1;
  const atr = u >= 0.42 && u < 0.6 ? Math.sin((u - 0.42) / 0.18 * Math.PI) : 0;
  let ven = 0; if (u >= 0.58 && u < 0.95) { const v = (u - 0.58) / 0.37; ven = v < 0.22 ? ease(v / 0.22) : v < 0.72 ? 1 : 1 - ease((v - 0.72) / 0.28); }
  const av = u < 0.58 || u >= 0.93 ? 1 : (u < 0.6 ? 1 - (u - 0.58) / 0.02 : u > 0.91 ? (u - 0.91) / 0.02 : 0);
  const sl = u >= 0.63 && u < 0.88 ? Math.min(1, (u - 0.63) / 0.03, (0.88 - u) / 0.03) : 0;
  return { u, atr, ven, av: clamp(av, 0, 1), sl: clamp(sl, 0, 1) };
}
function hartDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, u = 0.2, t = 0, stroom = 0, pijlen = 1, hi = null, detail = 1 } = o;
  const f = hartDoorsnedeFase(u);
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { RB: W(-125, -45), RK: W(-110, 120), LB: W(118, -55), LK: W(115, 130), tussenschot: W(25, 120), aorta: W(110, -268),
    longslagader: W(150, -205), holleAderBoven: W(-140, -270), holleAderOnder: W(-262, 250), longaders: W(232, -70),
    klepR: W(-92, 30), klepL: W(98, 6), klepLong: W(-18, -100), klepAorta: W(35, -72), punt: W(95, 290) };
  if (a <= 0.01) return anker;
  const ARM = BIO.ader, RIJK = BIO.bloed, ARMd = '#3F5F8E', RIJKd = '#8E2E2A';
  const SPIER = '#9A4A46', SNIJ = '#D99A8E', SNIJd = '#C27F73', VET = '#E3C77A', KLEP = '#EDE3CF';
  const dimF = k => (hi && hi !== k && hi !== 'kleppen') ? 0.35 : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (pts, closed = true) => { ctx.beginPath(); bioPad(ctx, pts, closed); };
  const buis = (pts, w, col, al = 1) => { ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'butt'; ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = w * 0.25; ctx.beginPath(); bioPad(ctx, pts.map(p => [p[0] - w * 0.18, p[1]]), false); ctx.stroke(); ctx.restore(); };
  const opening = (cx, cy, rx, ry, col) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = lighten(col, 0.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx, cy + 1, rx * 0.7, ry * 0.6, 0, 0, 6.283); ctx.fillStyle = col === ARM ? ARMd : RIJKd; ctx.fill(); };
  const schaal = (pts, k, c) => pts.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  // ---------- achterste vaten ----------
  buis([[30, -150], [-40, -175], [-120, -185], [-200, -178]], 34, ARM, dimF('RK'));                // rechter longslagader (achter aorta)
  buis([[150, -80], [200, -96], [238, -100]], 24, RIJK, dimF('LB')); buis([[150, -45], [205, -46], [238, -40]], 24, RIJK, dimF('LB'));      // linker longaders
  opening(238, -100, 5, 12, RIJK); opening(238, -40, 5, 12, RIJK); 
  buis([[175, -240], [195, -180], [198, -120]], 40, RIJK, dimF('LK') * 0.9);                       // dalende aorta (achter het hart)
  // ---------- hartspier (buitenkant) ----------
  const kV = 1 - 0.035 * f.ven, cHart = [20, 110];
  const kA = 1 - 0.16 * f.atr, kK = 1 - 0.28 * f.ven;
  const RB = schaal([[-188, -100], [-140, -130], [-80, -114], [-62, -55], [-70, 8], [-110, 24], [-170, 16], [-200, -38]], kA, [-130, -45]);
  const LB = schaal([[52, -95], [95, -124], [160, -118], [200, -80], [194, -20], [150, 2], [90, 2], [55, -30]], kA, [125, -58]);
  const RK = schaal([[-200, 52], [-130, 40], [-62, 44], [-38, -20], [-42, -92], [-2, -96], [4, -20], [8, 90], [-14, 172], [-70, 228], [-148, 200], [-200, 122]], kK, [-90, 120]);
  const LK = schaal([[30, -64], [50, -70], [60, 6], [98, 14], [160, 20], [188, 82], [180, 172], [136, 246], [104, 260], [78, 206], [48, 110], [30, 24]], kK, [118, 140]);
  // kamers: één spiermassa van de klepring tot de punt (wand links ± 3× zo dik als rechts)
  const KAMERS = schaal([[-200, 22], [-216, 105], [-176, 182], [-98, 244], [-5, 284], [95, 302], [162, 262], [216, 170], [236, 62], [226, 10], [170, -2], [62, -40], [22, -100], [-60, -110], [-62, 12], [-140, 30]], kV, cHart);
  const wandVul = (P) => { pad(P); ctx.fillStyle = SNIJ; ctx.fill(); ctx.strokeStyle = SPIER; ctx.lineWidth = 6; ctx.stroke(); };
  wandVul(KAMERS);
  if (detail > 0.5) { ctx.save(); pad(KAMERS); ctx.clip(); ctx.strokeStyle = rgba(SNIJd, 0.55); ctx.lineWidth = 1.2; // vezelrichting in het snijvlak
    for (let i = 0; i < 8; i++) { const k = 0.95 - i * 0.025; pad(schaal(KAMERS, k, [30, 140])); ctx.stroke(); } ctx.restore(); }
  // boezems: dunne wand rond de holte
  wandVul(schaal(RB, 1.12, [-130, -45])); wandVul(schaal(LB, 1.12, [125, -58]));
  if (detail > 0.5) { ctx.save(); ctx.globalAlpha *= 0.85; ctx.fillStyle = VET; // vet in de kransgroeve (tussen boezem en kamer)
    pad([[-214, 30], [-196, 12], [-168, 24], [-190, 42]]); ctx.fill(); pad([[204, 4], [230, 14], [228, 34], [206, 24]]); ctx.fill(); ctx.restore(); }
  const lumen = (P, col, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); pad(P); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rgba('#3A1A1A', 0.45); ctx.lineWidth = 2; ctx.stroke();
    if (hi === key) { pad(P); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); };
  lumen(RB, ARM, 'RB'); lumen(LB, RIJK, 'LB'); lumen(RK, ARM, 'RK'); lumen(LK, RIJK, 'LK');
  // onderste holle ader: komt van onderen langs de buitenkant van de rechterkamer en mondt uit in de rechterboezem
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-262, 300], [-258, 160], [-246, 60], [-218, 4], [-186, -6]], 40, ARM);
  ctx.beginPath(); ctx.ellipse(-182, -8, 9, 18, -0.3, 0, 6.283); ctx.fillStyle = ARM; ctx.fill(); ctx.restore();
  // papilspieren (uitsteeksels van de kamerwand)
  const papil = (bx, by, hgt, wdt, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.beginPath(); ctx.moveTo(bx - wdt * 1.3, by + 6); ctx.bezierCurveTo(bx - wdt, by - hgt * 0.5, bx - wdt * 0.8, by - hgt, bx, by - hgt); ctx.bezierCurveTo(bx + wdt * 0.8, by - hgt, bx + wdt, by - hgt * 0.5, bx + wdt * 1.3, by + 6); ctx.closePath(); ctx.fillStyle = SNIJd; ctx.fill(); ctx.restore(); return [bx, by - hgt]; };
  const pR1 = papil(-150, 178 - 20 * f.ven, 46, 15, 'RK'), pR2 = papil(-60, 190 - 25 * f.ven, 40, 13, 'RK');
  const pL1 = papil(92, 230 - 30 * f.ven, 58, 17, 'LK'), pL2 = papil(156, 200 - 26 * f.ven, 56, 17, 'LK');
  // ---------- kleppen ----------
  const klepKl = hi === 'kleppen' ? C.goud : KLEP;
  const avKlep = (x1, x2, yy, open, pa, pb, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); const half = (x2 - x1) / 2, L = half * 1.08;
    const ang = lerp(0.18, 1.3, open); // dicht: slippen bijna horizontaal (raken elkaar in het midden), open: hangen langs de wand
    const tips = []; for (const sd of [-1, 1]) { const hx = sd < 0 ? x1 : x2; const ex = hx - sd * Math.cos(ang) * L, ey = yy + Math.sin(ang) * L; tips.push([ex, ey]);
      const nx = -Math.sin(ang) * sd, ny = -Math.cos(ang); // normaal op de slip
      ctx.beginPath(); ctx.moveTo(hx, yy - 7); ctx.quadraticCurveTo((hx + ex) / 2 + nx * 9, (yy + ey) / 2 + ny * 9 - 4, ex, ey); // bovenkant (bol)
      ctx.quadraticCurveTo((hx + ex) / 2 - nx * 3, (yy + ey) / 2 - ny * 3 + 6, hx + -sd * 1, yy + 7); ctx.closePath();
      ctx.fillStyle = klepKl; ctx.fill(); ctx.strokeStyle = '#B8AC92'; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (detail > 0.3) { ctx.strokeStyle = rgba(KLEP, 0.85); ctx.lineWidth = 1.4; for (const [tp, pp, sd] of [[tips[0], pa, -1], [tips[1], pb, 1]]) for (let k = 0; k < 3; k++) { const f0 = 0.55 + k * 0.22; const hx = sd < 0 ? x1 : x2;
        const ax = lerp(hx, tp[0], f0), ay = lerp(yy, tp[1], f0); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(pp[0] + (k - 1) * 5, pp[1] + 2); ctx.stroke(); } }
    ctx.restore(); };
  avKlep(-134, -50, 28, f.av, pR1, pR2, 'RK'); avKlep(56, 146, 8, f.av, pL1, pL2, 'LK');
  // ---------- voorste vaten: aorta (stijgt achter de longslagader), longslagader, bovenste holle ader ----------
  const slKlep = (cx, cy, w, open, col) => { ctx.save(); ctx.fillStyle = klepKl; ctx.strokeStyle = '#B8AC92'; ctx.lineWidth = 1.2; for (const sd of [-1, 1]) { const tip = lerp(cx + sd * 3, cx + sd * (w - 4), open);
      ctx.beginPath(); ctx.moveTo(cx + sd * w, cy + 4); ctx.quadraticCurveTo(cx + sd * w * 0.5, cy + 10 - 6 * open, tip, cy - 14 - 6 * open); ctx.lineTo(cx + sd * w, cy - 6); ctx.closePath(); ctx.fill(); ctx.stroke(); } ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= dimF('LK');
  buis([[35, -70], [32, -150], [45, -230], [90, -272], [150, -268], [178, -240]], 40, RIJK);
  for (const [bx, tx] of [[75, 62], [112, 108], [148, 158]]) buis([[bx, -270], [tx, -300]], 15, RIJK);
  slKlep(35, -76, 22, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RK');
  buis([[-20, -95], [-12, -150], [20, -185], [90, -200], [160, -205], [210, -198]], 36, ARM);
  slKlep(-20, -100, 21, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-140, -115], [-140, -200], [-138, -300]], 40, ARM); opening(-138, -300, 19, 6, ARM); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('LK'); for (const tx of [62, 108, 158]) opening(tx + (tx === 62 ? -1 : tx === 158 ? 3 : 0), -300, 7, 3, RIJK); ctx.restore();
  opening(210, -198, 6, 17, ARM);
  // ---------- bloedstroom ----------
  if (stroom > 0.01) { const r = 5; const vul = f.av * (1 - f.ven), uit = f.sl;
    ctx.save(); ctx.globalAlpha *= stroom;
    const dl = (path, col, on, sp, n, sd) => { if (on > 0.02) particleFlow(ctx, path, n, t, sp, lighten(col, 0.45), r, sd, on); };
    dl([[-140, -290], [-140, -100], [-110, -20], [-95, 90]], ARM, vul, 120, 6, 1); dl([[-262, 290], [-246, 60], [-186, -6], [-110, 0], [-90, 100]], ARM, vul, 120, 6, 7);
    dl([[230, -70], [140, -60], [100, 20], [110, 150]], RIJK, vul, 120, 6, 13);
    dl([[-100, 150], [-20, 40], [-20, -100], [20, -185], [200, -200]], ARM, uit, 380, 9, 19);
    dl([[110, 200], [45, 40], [35, -70], [40, -220], [100, -270], [175, -235]], RIJK, uit, 420, 10, 29);
    ctx.restore(); }
  // ---------- bloedstroom als open pijlen (alleen waar een klep open is) ----------
  if (pijlen > 0.01) { const pijl = (pts, al) => { if (al <= 0.02) return; ctx.save(); ctx.globalAlpha *= pijlen * al; ctx.strokeStyle = C.text; ctx.lineWidth = 4;
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); const p = pts[pts.length - 1], q = pts[pts.length - 2]; const an = Math.atan2(p[1] - q[1], p[0] - q[0]);
      ctx.beginPath(); ctx.moveTo(p[0] - Math.cos(an - 0.5) * 18, p[1] - Math.sin(an - 0.5) * 18); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[0] - Math.cos(an + 0.5) * 18, p[1] - Math.sin(an + 0.5) * 18); ctx.stroke(); ctx.restore(); };
    const vul = f.av * (f.ven < 0.1 ? 1 : 0);
    pijl([[-140, -260], [-136, -90], [-108, -10], [-100, 90]], vul); pijl([[-246, 120], [-232, 30], [-196, 2], [-150, 10]], vul); pijl([[226, -64], [160, -56], [112, 30], [112, 120]], vul);
    pijl([[-110, 150], [-24, 60], [-20, -110], [-4, -175]], f.sl); pijl([[120, 190], [50, 60], [36, -90], [40, -200]], f.sl); }
  ctx.restore(); return anker;
}
