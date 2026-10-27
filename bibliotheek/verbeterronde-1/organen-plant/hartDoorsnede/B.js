// =====================================================================================
// HART IN DOORSNEDE (frontaal, vooraanzicht) — naast anHeart (lib_anatomie.js, buitenkant in het lichaam).
// Links op het plaatje = rechterharthelft (zuurstofarm, blauw); rechts = linkerharthelft (zuurstofrijk, rood).
// Recept: hart ± vuist; punt naar rechtsonder op het plaatje. Wand linkerkamer ± 3× zo dik als rechterkamer,
// boezems dunwandig. Kleppen: tricuspidalis/mitralis tussen boezem en kamer (met peesdraden), halvemaanvormige
// kleppen aan de basis van longslagader en aorta. Holle aders → rechterboezem, longaders → linkerboezem,
// rechterkamer → longslagader, linkerkamer → aorta. Cyclus (o.u 0..1): 0–0,42 hartpauze (kamers vullen),
// 0,42–0,58 boezems trekken samen, 0,58–0,93 kamers trekken samen (AV-kleppen dicht, 0,63–0,88 halvemaan open).
// Bron: OpenStax Biology 40.3. Wand ± 3×: nog een tweede bron nodig. Bekende fouten: kamers tegelijk met boezems; wanden even dik;
// aorta uit de rechterkamer; bloed dat door een dichte klep stroomt.
// Ontwerp: hoogte ± 600 (y −300..300), oorsprong = midden. Aanpak B: rustig schema (Schema-look): gladde holtes
// met gelijkmatige wanden, vaten als buizen, géén deeltjes maar open pijlen alleen door een open klep; de
// holte die samentrekt krijgt een gouden rand (focus).
// o: a, u (fase), hi ('RB','RK','LB','LK','kleppen'), pijlen (1), focus (1 = gouden rand bij samentrekken)
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
  const { a = 1, u = 0.2, hi = null, pijlen = 1, focus = 1 } = o;
  const f = hartDoorsnedeFase(u);
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { RB: W(-120, -60), RK: W(-105, 110), LB: W(120, -60), LK: W(110, 120), tussenschot: W(10, 110), aorta: W(95, -265),
    longslagader: W(-150, -215), holleAderBoven: W(-150, -275), holleAderOnder: W(-150, 275), longaders: W(235, -60),
    klepR: W(-110, 5), klepL: W(110, 5), klepLong: W(-40, -85), klepAorta: W(40, -85), punt: W(80, 285) };
  if (a <= 0.01) return anker;
  const ARM = BIO.ader, RIJK = BIO.bloed, WAND = '#B8706A', WANDr = '#D9A398', KLEP = '#EDE3CF';
  const dimF = k => (hi && hi !== k && hi !== 'kleppen') ? 0.35 : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const pad = (pts) => { ctx.beginPath(); bioPad(ctx, pts, true); };
  const schaal = (pts, k, c) => pts.map(p => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]);
  const buis = (pts, w, col, al = 1) => { ctx.save(); ctx.globalAlpha *= al; ctx.lineCap = 'butt'; ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); };
  // vaten achter
  buis([[-150, 20], [-150, 300]], 40, ARM, dimF('RB'));
  buis([[160, -80], [240, -80]], 22, RIJK, dimF('LB')); buis([[160, -35], [240, -35]], 22, RIJK, dimF('LB'));
  // hartspier: kamers één geheel, boezems als dunne kapjes
  const kK = 1 - 0.22 * f.ven, kA = 1 - 0.14 * f.atr, kV = 1 - 0.03 * f.ven;
  const KAMERS = schaal([[-198, 14], [-208, 110], [-160, 200], [-50, 262], [80, 296], [170, 248], [224, 140], [228, 14], [175, 0], [74, -36], [54, -100], [-46, -100], [-62, -36], [-160, 0]], kV, [10, 140]);
  pad(KAMERS); ctx.fillStyle = WAND; ctx.fill(); ctx.strokeStyle = WANDr; ctx.lineWidth = 2; ctx.stroke();
  const RBp = schaal([[-195, -60], [-160, -125], [-90, -125], [-55, -70], [-62, -5], [-120, 10], [-185, 0]], kA, [-125, -60]);
  const LBp = schaal([[55, -70], [90, -125], [160, -125], [198, -70], [190, -5], [125, 10], [62, -5]], kA, [125, -60]);
  for (const P of [RBp, LBp]) { pad(schaal(P, 1.1, [P === RBp ? -125 : 125, -60])); ctx.fillStyle = WAND; ctx.fill(); ctx.strokeStyle = WANDr; ctx.lineWidth = 2; ctx.stroke(); }
  // holtes
  const RKp = schaal([[-185, 30], [-60, 30], [-48, -40], [-34, -86], [-14, -40], [-8, 90], [-40, 200], [-120, 190], [-182, 120]], kK, [-100, 110]);
  const LKp = schaal([[30, -40], [46, -86], [62, -40], [70, 30], [180, 30], [180, 140], [120, 240], [80, 250], [32, 120]], kK, [110, 130]);
  const holte = (P, col, key, trekt) => { ctx.save(); ctx.globalAlpha *= dimF(key); pad(P); ctx.fillStyle = col; ctx.fill();
    const g = focus * trekt; ctx.strokeStyle = g > 0.05 || hi === key ? C.goud : lighten(col, 0.3); ctx.lineWidth = g > 0.05 || hi === key ? 2 + 3 * Math.max(g, hi === key ? 1 : 0) : 1.5; ctx.stroke(); ctx.restore(); };
  holte(RBp, ARM, 'RB', f.atr); holte(LBp, RIJK, 'LB', f.atr); holte(RKp, ARM, 'RK', f.ven); holte(LKp, RIJK, 'LK', f.ven);
  // AV-kleppen: twee slippen met peesdraden
  const kl = hi === 'kleppen' ? C.goud : KLEP;
  const avKlep = (x1, x2, yy, open, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); ctx.strokeStyle = kl; ctx.lineWidth = 6; const half = (x2 - x1) / 2, ang = lerp(0.08, 1.3, open);
    for (const sd of [-1, 1]) { const hx = sd < 0 ? x1 : x2; const ex = hx - sd * Math.cos(ang) * half, ey = yy + Math.sin(ang) * half; ctx.beginPath(); ctx.moveTo(hx, yy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.save(); ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(KLEP, 0.7); ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(hx - sd * half * 0.3, yy + 95); ctx.stroke(); ctx.fillStyle = WANDr; ctx.beginPath(); ctx.ellipse(hx - sd * half * 0.3, yy + 104, 9, 12, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); };
  avKlep(-165, -65, 22, f.av, 'RK'); avKlep(72, 172, 22, f.av, 'LK');
  // vaten vóór: longslagader (uit RK) en aorta (uit LK) kruisen elkaar
  const slKlep = (cx, cy, open) => { ctx.save(); ctx.strokeStyle = kl; ctx.lineWidth = 5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + sd * 16, cy); ctx.quadraticCurveTo(cx + sd * 10, cy - 10, lerp(cx + sd * 2, cx + sd * 15, open), cy - lerp(14, 26, open)); ctx.stroke(); } ctx.restore(); };
  ctx.save(); ctx.globalAlpha *= dimF('LK'); buis([[40, -84], [40, -200], [70, -255], [130, -265], [175, -235], [180, -150]], 38, RIJK); slKlep(40, -84, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RK'); buis([[-30, -84], [-30, -170], [-70, -205], [-200, -215]], 34, ARM); slKlep(-30, -84, f.sl); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('RB'); buis([[-150, -110], [-150, -300]], 38, ARM); ctx.restore();
  // pijlen: alleen waar het bloed echt stroomt
  if (pijlen > 0.01) { const pijl = (pts, al) => { if (al <= 0.02) return; ctx.save(); ctx.globalAlpha *= pijlen * al; ctx.strokeStyle = C.text; ctx.lineWidth = 3;
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); const p = pts[pts.length - 1], q = pts[pts.length - 2]; const an = Math.atan2(p[1] - q[1], p[0] - q[0]);
      ctx.beginPath(); ctx.moveTo(p[0] - Math.cos(an - 0.5) * 14, p[1] - Math.sin(an - 0.5) * 14); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[0] - Math.cos(an + 0.5) * 14, p[1] - Math.sin(an + 0.5) * 14); ctx.stroke(); ctx.restore(); };
    const vul = f.av * (f.ven < 0.1 ? 1 : 0);
    pijl([[-150, -250], [-140, -120], [-118, -30], [-112, 80]], vul); pijl([[230, -58], [150, -50], [118, 20], [112, 100]], vul);
    pijl([[-90, 130], [-30, 40], [-30, -150], [-90, -205]], f.sl); pijl([[110, 160], [42, 40], [42, -200], [110, -258]], f.sl); }
  ctx.restore(); return anker;
}
