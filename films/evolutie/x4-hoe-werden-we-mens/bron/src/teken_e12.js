// Film 12 · Hoe werden we mens? — eigen hulpfuncties voor de geanimeerde scènes (laadt na lib_dieren/teken_evo12, vóór sb12).
// Linksboven tekent de speler al 'evolutie extra 4/4': de scènes gebruiken daarom nooit e12Tag/e12Schema uit sb12.js.
const E12 = {};
E12.schema = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
E12.fr = (v) => ((v % 1) + 1) % 1;
// ---- gang zonder glijden (zelfde aanpak als lib_cast.js 'vooruit'): de steunvoet staat stil op de grond ----
E12.ax = (soort, Hp, p) => { const S = E12_SOORT[soort], G = GANG.loop, D = Math.PI / 180, L1 = (S.heup - S.knie) * Hp, L2 = (S.knie - 0.04) * Hp;
  const th = _kf(G.th, p) * D, kn = _kf(G.kn, p) * D; return Math.sin(th) * L1 + Math.sin(th - kn) * L2; };
E12.f = (tempo = 1) => GANG.loop.f * tempo;
E12.v = (soort, Hp, tempo = 1) => (E12.ax(soort, Hp, 0) - E12.ax(soort, Hp, 0.5)) * E12.f(tempo) / 0.5;
// verplaatsing na tijd tt (fase = tt·f): exact zo dat de voet met fase < 0,5 stil staat
E12.dx = (soort, Hp, tt, tempo = 1) => { const f = E12.f(tempo), v = E12.v(soort, Hp, tempo), fase = tt * f, p1 = E12.fr(fase), sp = p1 < 0.5 ? p1 : p1 - 0.5;
  return v * tt + (E12.ax(soort, Hp, 0) - E12.ax(soort, Hp, sp)) - v * sp / f; };
// Iemand loopt van x0 naar x1 (start op tijd t0) en blijft daarna staan. o gaat door naar e12Mens (hold, kijk wordt gezet).
// Begin en einde vallen op fase 0,25 (benen kruisen), zodat de overgang naar staan rustig is. Geeft {x, loopt, info} terug.
function e12Loopt(ctx, soort, y, Hp, t, w, o = {}) { const { x0, x1, t0 = 0, tempo = 1, cam = 0 } = w; const dir = x1 >= x0 ? 1 : -1, f = E12.f(tempo), v = E12.v(soort, Hp, tempo);
  const off = 0.25 / f, d0 = E12.dx(soort, Hp, off, tempo); let dur = Math.abs(x1 - x0) / v; dur = Math.round(dur * f * 2) / (2 * f); // hele halve passen
  const tt = clamp(t - t0, 0, dur), loopt = t > t0 && t < t0 + dur; const x = x0 + dir * (E12.dx(soort, Hp, tt + off, tempo) - d0) - cam;
  const opt = Object.assign({}, o, { kijk: dir }); if (loopt) { opt.pose = 'loop'; opt.t = (tt + off) * f; } else if (!o.pose || o.pose === 'loop') opt.pose = 'staan';
  const info = e12Mens(ctx, soort, x, y, Hp, opt); return { x, loopt, info, eind: t0 + dur }; }
// zachte gouden gloed (iets 'licht op')
function e12Gloed(ctx, x, y, rx, ry, a = 1, kleur = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(1, ry / rx);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, rgba(kleur, 0.55)); g.addColorStop(0.6, rgba(kleur, 0.22)); g.addColorStop(1, rgba(kleur, 0));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 6.283); ctx.fill(); ctx.restore(); }
function e12Ring(ctx, x, y, rx, ry, a = 1, kleur = C.goud, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
// slagritme (stenen bewerken): 0 = neer (klap), 1 = hoog; klap op k·per + 0,85·per
E12.slag = (t, per = 0.8) => { const p = E12.fr(t / per); return p < 0.7 ? ease(p / 0.7) : p < 0.85 ? 1 - ease((p - 0.7) / 0.15) : 0; };
E12.klap = (t, per = 0.8) => { const p = E12.fr(t / per); return p >= 0.85 ? (p - 0.85) * per : 9; }; // seconden sinds de laatste klap (9 = net geen)
// grond die meeschuift met de camera (graspollen en steentjes), voor de wandeling over de steppe
function e12Grond(ctx, cam, y0 = 760, y1 = 900) { for (let i = 0; i < 46; i++) { const per = 2400, gx = ((hash(i * 3.1) * per - cam) % per + per) % per - 240, gy = y0 + hash(i * 5.3) * (y1 - y0), s = 0.6 + (gy - y0) / (y1 - y0) * 0.8;
    if (i % 3) { ctx.strokeStyle = i % 2 ? '#5E7A58' : '#4E6A4C'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(gx + k * 4 * s, gy); ctx.quadraticCurveTo(gx + k * 7 * s, gy - 14 * s, gx + k * 11 * s, gy - 24 * s); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.ellipse(gx, gy, 16 * s, 7 * s, 0, 0, 6.283); ctx.fillStyle = '#6E6A62'; ctx.fill(); } } }
// route die meegroeit (u = 0..1), met pijlpunt
function e12RouteU(ctx, K, pts, kleur, u, o = {}) { if (u <= 0.01) return; const { lw = 7, a = 1 } = o; const P = pts.map(([lo, la]) => [K.X(lo), K.Y(la)]);
  const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); const tot = L[L.length - 1] * clamp(u, 0, 1);
  const Q = [P[0]]; for (let i = 1; i < P.length; i++) { if (L[i] <= tot) Q.push(P[i]); else { const k = (tot - L[i - 1]) / (L[i] - L[i - 1]); Q.push([lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)]); break; } }
  ctx.save(); ctx.globalAlpha *= a; lijn(ctx, Q, kleur, lw); const n = Q.length; if (n >= 2) { const [x1, y1] = Q[n - 2], [x2, y2] = Q[n - 1]; if (Math.hypot(x2 - x1, y2 - y1) > 2) pijl(ctx, x2 - (x2 - x1) * 0.01, y2 - (y2 - y1) * 0.01, x2, y2, kleur, 1, lw, 22); } ctx.restore(); }
// genoom met stukjes die apart in- en uitfaden (aNea/aDen) en chromosomen die één voor één verschijnen (n)
function e12Genoom2(ctx, x, y, w, o = {}) { const { pNea = 0.02, pDen = 0, aNea = 1, aDen = 1, a = 1, seed = 3, h = 300, n = 23 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const lens = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156]; const tot = lens.reduce((s, v) => s + v, 0), bw = w / 23;
  lens.forEach((L, i) => { const k = clamp(n - i, 0, 1); if (k <= 0.08) return; const hh = L / 249 * h * ease(k), cx = x + (i + 0.5) * bw; roundRect(ctx, cx - bw * 0.3, y - hh, bw * 0.6, hh, Math.min(bw * 0.3, hh / 2)); shape(ctx, rgba(C.paars, 0.75), _lt(C.paars, 0.3), 1.5);
    const stukken = Math.round(L / tot * 60); for (let q = 0; q < stukken; q++) { const r = hash(seed + i * 13 + q * 7.7); const sh = hh * 0.02 * (0.5 + hash(i + q * 3) * 1.6);
      if (r < pNea * 26 && aNea > 0.01) { ctx.fillStyle = rgba(C.oker, aNea); ctx.fillRect(cx - bw * 0.3, y - hh + hash(i * 5 + q) * (hh - sh), bw * 0.6, sh); }
      else if (pDen && r > 1 - pDen * 26 && aDen > 0.01) { ctx.fillStyle = rgba(C.koraal, aDen); ctx.fillRect(cx - bw * 0.3, y - hh + hash(i * 9 + q) * (hh - sh), bw * 0.6, sh); } } });
  ctx.restore(); }
// tijdstruik met as in woorden (geen 'Mj'), opbouw met een veeg (tot = tijd in miljoen jaar tot waar getekend is), einde van uitgestorven takken
function e12Struik2(ctx, x, y, w, h, o = {}) { const { a = 1, nu = null, markeer = [], dim = [], veeg = 0, eind = 0, mk = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  const X = (mj) => e12TijdX(x, w, mj), rijH = h / 7, RY = (r) => y + (r + 0.5) * rijH;
  lijn(ctx, [[x, y + h + 20], [x + w, y + h + 20]], C.line, 2.5);
  for (const [mj, lab] of [[7, '7'], [4, '4'], [2, '2'], [1, '1'], [0.4, '0,4'], [0.1, '0,1'], [0, 'nu']]) { const px = X(mj); lijn(ctx, [[px, y + h + 12], [px, y + h + 28]], C.line, 2); metaText(ctx, lab, px, y + h + 60, C.text2, 'center', 26); }
  metaText(ctx, 'miljoen jaar geleden · as niet lineair', x, y + h + 96, C.text2, 'left', 24);
  const xv = X(veeg); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, xv + 2, H); ctx.clip();
  ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba('#8FA0B5', 0.6); ctx.lineWidth = 2.5; const L = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.bezierCurveTo(x1 + 30, y1, x2 - 30, y2, x2, y2); ctx.stroke(); };
  L(X(6.5), RY(0), X(3.9), RY(1)); L(X(3.0), RY(1), X(1.9), RY(2)); L(X(0.75), RY(2.5), X(0.3), RY(6)); L(X(0.75), RY(2.5), X(0.4), RY(4)); L(X(0.55), RY(4), X(0.3), RY(3)); L(X(1.2), RY(2), X(0.19), RY(5)); ctx.setLineDash([]);
  for (const s of E12_STRUIK) { const gd = typeof dim === 'object' && !Array.isArray(dim) ? (dim[s.id] || 0) : (dim.includes(s.id) ? 1 : 0), kl = s.kleur || '#C8BCA4'; ctx.save(); ctx.globalAlpha *= 1 - 0.65 * gd;
    const x1 = X(s.van), x2 = X(s.tot), yy = RY(s.rij); roundRect(ctx, x1, yy - 16, Math.max(10, x2 - x1), 32, 16); if (s.onzeker) { ctx.setLineDash([8, 6]); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = rgba(kl, 0.35); ctx.fill(); } else shape(ctx, rgba(kl, 0.85), _lt(kl, 0.3), 2);
    if (markeer.includes(s.id) && mk > 0.01) { ctx.save(); ctx.globalAlpha *= mk; roundRect(ctx, x1 - 6, yy - 22, Math.max(10, x2 - x1) + 12, 44, 22); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    if (s.tot > 0 && eind > 0.01 && xv >= x2) { ctx.save(); ctx.globalAlpha *= eind; lijn(ctx, [[x2 + 6, yy - 20], [x2 + 6, yy + 20]], C.koraal, 5); ctx.restore(); }
    const lx = s.tot < 0.5 ? x1 - 16 : x2 + 16; text(ctx, s.naam, lx, yy + 12, fTekst(32, 600), C.text, s.tot < 0.5 ? 'right' : 'left'); ctx.restore(); }
  ctx.restore();
  if (veeg > 0.001 && veeg < 7) { lijn(ctx, [[xv, y - 10], [xv, y + h + 10]], rgba(C.text2, 0.5), 2); }
  if (nu != null) { const px = X(nu); ctx.setLineDash([10, 8]); lijn(ctx, [[px, y - 20], [px, y + h + 10]], C.goud, 3); ctx.setLineDash([]); }
  ctx.restore(); return { X, RY }; }
// steen (knol vuursteen) die stap voor stap een handbijl wordt
function e12Knol(ctx, x, y, len, u, o = {}) { const { rot = 0 } = o; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const L = len, B = len * 0.6;
  if (u < 1) { ctx.save(); ctx.globalAlpha *= 1 - u; const P = []; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283, r = 0.5 + hash(i * 2.7) * 0.12; P.push([Math.cos(an) * r * B * 1.15, Math.sin(an) * r * L * 0.95]); } vul(ctx, P, '#9A928A', '#6E6A64', 3);
    for (let i = 0; i < 6; i++) circ(ctx, (hash(i * 4.1) - 0.5) * B * 0.8, (hash(i * 6.3) - 0.5) * L * 0.7, 6 + hash(i) * 8, rgba('#C8BCA4', 0.5)); ctx.restore(); }
  if (u > 0) e12Handbijl(ctx, 0, 0, len, { a: u }); ctx.restore(); }
// schilfers die wegspringen na een klap (dt = seconden sinds de klap)
function e12Schilfers(ctx, x, y, dt, seed = 1, n = 5, kleur = '#C8BCA4') { if (dt > 0.7 || dt < 0) return; for (let i = 0; i < n; i++) { const an = -Math.PI * (0.15 + hash(seed + i * 3.3) * 0.7), v = 260 + hash(seed + i) * 260;
    const px = x + Math.cos(an) * v * dt, py = y + Math.sin(an) * v * dt + 700 * dt * dt; ctx.save(); ctx.globalAlpha *= 1 - dt / 0.7; vul(ctx, [[px - 6, py], [px, py - 5], [px + 7, py + 1], [px, py + 5]], kleur); ctx.restore(); } }
// klein graf: aarden heuvel met stenen
function e12Graf(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 130, 34, 0, Math.PI, 0); ctx.fillStyle = '#5E4A36'; ctx.fill(); for (let i = 0; i < 9; i++) { const px = -110 + i * 27, py = -Math.sin((i + 0.5) / 9 * Math.PI) * 28 + 4; ctx.beginPath(); ctx.ellipse(px, py, 16, 10, i, 0, 6.283); ctx.fillStyle = i % 2 ? '#7A746A' : '#8A847A'; ctx.fill(); }
  ctx.restore(); }
// oude prent (sepia kader) voor het foute beeld van 1911 en de 'mars'
function e12Prent(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#3A3226', '#8A7656', 3); roundRect(ctx, x + 12, y + 12, w - 24, h - 24, 6); ctx.strokeStyle = rgba('#8A7656', 0.6); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
// warmte die van een lichaam opstijgt (golfjes)
function e12Warmte(ctx, x, y, n, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const p = E12.fr(t * 0.45 + i / n), xx = x + (i - (n - 1) / 2) * 34, yy = y - p * 120; ctx.globalAlpha = a * Math.sin(p * Math.PI); ctx.beginPath(); for (let k = 0; k <= 12; k++) { const py = yy - k * 4; const px = xx + Math.sin(k * 0.8 + t * 3 + i) * 7; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore(); }

// ===== Kleding (Kamiel 24 okt 2026: 'doe die kleren maar'): neanderthaler = omslag van huid + beenwindsels, Homo sapiens = genaaide tuniek met mouwen, broek, laarzen, tandketting.
// Lucy, Homo erectus en floresiensis blijven zonder (geen bewijs voor kleding). o.naakt = true zet de kleding uit.
const E12_KLEDING = {
  neanderthaler:  { soort: 'omslag', stof: '#6E4C2E', licht: '#9A7448', pluis: '#C9B48E', leer: '#4E3624', naad: '#2E2014' },
  neanderthalerV: { soort: 'omslag', stof: '#7C5834', licht: '#A47E50', pluis: '#CDB894', leer: '#523A26', naad: '#2E2014' },
  sapiens:        { soort: 'tuniek', stof: '#B8975E', licht: '#D2B67E', broek: '#7A6A52', leer: '#4A3A2C', naad: '#5A4630', ketting: true }
};
const E12K = {
  steek(ctx, P, Q, n, kleur, lw) { for (let i = 1; i <= n; i++) { const u = i / (n + 1), x = P[0] + (Q[0] - P[0]) * u, y = P[1] + (Q[1] - P[1]) * u, dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * lw * 2.2, ny = dx / L * lw * 2.2;
    lijn(ctx, [[x - nx, y - ny], [x + nx, y + ny]], kleur, lw); } },
  been(ctx, KL, S, H, hx, hy, b, ver) { const d = (c) => ver ? _dk(c, 0.18) : c, K = [hx + b.kx, hy + b.ky], A = [hx + b.ax, hy + b.ay]; ctx.lineCap = 'round';
    const voet = [[hx + b.hx, hy + b.hy + 0.004 * H], [hx + b.ax - 0.025 * H, hy + b.ay - 0.03 * H], [hx + b.ax + 0.035 * H, hy + b.ay - 0.005 * H], [hx + b.tx, hy + b.ty - 0.014 * H], [hx + b.tx + 0.008 * H, hy + b.ty + 0.005 * H], [hx + b.hx - 0.004 * H, hy + b.hy + 0.006 * H]];
    if (KL.soort === 'tuniek') { ctx.strokeStyle = d(KL.broek); ctx.lineWidth = 0.088 * H; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(K[0], K[1]); ctx.stroke(); ctx.lineWidth = 0.064 * H; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(A[0], A[1]); ctx.stroke();
      E12K.steek(ctx, [hx, hy], K, 3, d(_dk(KL.broek, 0.3)), Math.max(1, H * 0.004)); vul(ctx, voet, d(KL.leer)); lijn(ctx, [[A[0] - 0.03 * H, A[1] - 0.01 * H], [A[0] + 0.03 * H, A[1] - 0.012 * H]], d(_dk(KL.leer, 0.3)), Math.max(1.2, H * 0.006)); }
    else { const W = [lerp(K[0], A[0], 0.12), lerp(K[1], A[1], 0.12)]; ctx.strokeStyle = d(KL.leer); ctx.lineWidth = 0.066 * H * 1.1; ctx.beginPath(); ctx.moveTo(W[0], W[1]); ctx.lineTo(A[0], A[1]); ctx.stroke(); // beenwindsels
      for (let i = 0; i < 5; i++) { const u = 0.12 + i * 0.17, P = [lerp(K[0], A[0], u), lerp(K[1], A[1], u)], Q = [lerp(K[0], A[0], u + 0.1), lerp(K[1], A[1], u + 0.1)], w = 0.034 * H;
        lijn(ctx, [[P[0] - w, P[1]], [Q[0] + w, Q[1]]], d(_dk(KL.leer, 0.35)), Math.max(1, H * 0.005)); }
      vul(ctx, voet, d(_dk(KL.leer, 0.1))); }
  },
  arm(ctx, KL, H, sh, ex, ey, hx, hy, ver, dk) { const d = (c) => ver ? _dk(c, 0.18) : c; ctx.lineCap = 'round';
    if (KL.soort === 'tuniek') { ctx.strokeStyle = d(KL.stof); ctx.lineWidth = 0.062 * H; ctx.beginPath(); ctx.moveTo(sh[0], sh[1]); ctx.lineTo(ex, ey); ctx.stroke(); const wx = lerp(ex, hx, 0.88), wy = lerp(ey, hy, 0.88); ctx.lineWidth = 0.052 * H; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(wx, wy); ctx.stroke();
      ctx.strokeStyle = d(KL.licht); ctx.lineWidth = 0.056 * H; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(lerp(ex, hx, 0.8), lerp(ey, hy, 0.8)); ctx.lineTo(wx, wy); ctx.stroke(); ctx.lineCap = 'round'; }
    else { const mx = lerp(sh[0], ex, 0.55), my = lerp(sh[1], ey, 0.55); ctx.strokeStyle = d(KL.stof); ctx.lineWidth = 0.072 * H * dk; ctx.beginPath(); ctx.moveTo(sh[0], sh[1]); ctx.lineTo(mx, my); ctx.stroke();
      if (!ver) for (let i = 0; i < 4; i++) circ(ctx, mx + (hash(i * 3.1) - 0.5) * 0.06 * H, my + (hash(i * 5.3) - 0.3) * 0.02 * H, 0.012 * H, KL.pluis); }
  },
  romp(ctx, KL, S, H, Lr, rot, uK, bK) { const P = (pts) => pts.map(([px, py]) => rot(px * H, py * H)), top = -Lr / H;
    if (KL.soort === 'tuniek') { const T = P([[-0.042, top - 0.028], [-0.07 * Math.sqrt(bK), top + 0.03], [-0.072 * bK, top + 0.1], [-0.06, -0.06], [-0.07, 0.06], [-0.02, 0.085], [0.04, 0.08], [0.066 * uK, 0.05], [0.06 * uK, -0.08], [0.072 * bK, top + 0.13], [0.06 * bK, top + 0.03], [0.03, top - 0.03]]);
      vul(ctx, T, KL.stof); lijn(ctx, P([[-0.066, -0.02], [0.064 * uK, -0.024]]), KL.leer, 0.014 * H); // riem
      E12K.steek(ctx, ...P([[0.03, top + 0.02], [0.05, -0.04]]), 4, KL.naad, Math.max(1, H * 0.004)); lijn(ctx, P([[-0.07, 0.06], [-0.02, 0.085], [0.04, 0.08], [0.066 * uK, 0.05]]), KL.licht, Math.max(1.5, H * 0.006)); }
    else { const T = P([[-0.04, top - 0.022], [-0.074 * Math.sqrt(bK), top + 0.035], [-0.076 * bK, top + 0.1], [-0.058 * Math.sqrt(bK), -0.04], [-0.075, 0.0], [0.062 * uK, 0.0], [0.07 * uK, -0.09], [0.074 * bK, top + 0.13], [0.062 * bK, top + 0.03], [0.026, top - 0.032]]);
      vul(ctx, T, KL.stof); const Q = P([[-0.03, top - 0.02], [0.07 * bK, top + 0.2]]); lijn(ctx, Q, KL.licht, 0.014 * H); // schouderband van de omslag
      E12K.steek(ctx, ...P([[-0.06, top + 0.12], [-0.055, -0.03]]), 4, KL.naad, Math.max(1, H * 0.004)); lijn(ctx, P([[-0.07, -0.012], [0.064 * uK, -0.014]]), KL.leer, 0.012 * H); }
  },
  rok(ctx, KL, S, H, hx, hy, B, rot, uK) { const m = B.map(b => [hx + b.kx * 0.55, hy + b.ky * 0.55]).sort((a, b) => a[0] - b[0]), w = 0.058 * H, lang = KL.soort === 'tuniek' ? 0.2 : 0.55;
    if (KL.soort === 'tuniek') return; // de tuniek van sapiens houdt op bij de heup
    const a0 = rot(-0.078 * H, -0.02 * H), a1 = rot(0.068 * uK * H, -0.02 * H), bB = [m[0][0] - w, m[0][1] + 0.01 * H], bF = [m[1][0] + w, m[1][1] + 0.01 * H], mid = [(m[0][0] + m[1][0]) / 2, Math.max(m[0][1], m[1][1]) + 0.005 * H];
    vul(ctx, [a0, a1, bF, mid, bB], KL.stof); lijn(ctx, [a0, bB], KL.licht, Math.max(1.5, H * 0.005));
    for (let i = 0; i <= 8; i++) { const u = i / 8, p = u < 0.5 ? [lerp(bB[0], mid[0], u * 2), lerp(bB[1], mid[1], u * 2)] : [lerp(mid[0], bF[0], u * 2 - 1), lerp(mid[1], bF[1], u * 2 - 1)]; circ(ctx, p[0], p[1] + 0.004 * H, 0.014 * H, KL.pluis); }
    E12K.steek(ctx, [lerp(a1[0], bF[0], 0.15), lerp(a1[1], bF[1], 0.15)], [lerp(a1[0], bF[0], 0.8), lerp(a1[1], bF[1], 0.8)], 3, KL.naad, Math.max(1, H * 0.004)); },
  ketting(ctx, H, nek, rot, Lr) { const c = rot(0.03 * H, -Lr + 0.035 * H); for (let i = 0; i < 7; i++) { const an = 0.4 + i * 0.36, px = c[0] + Math.cos(an) * 0.032 * H - 0.012 * H, py = c[1] + Math.sin(an) * 0.022 * H;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an - Math.PI / 2); vul(ctx, [[-0.004 * H, 0], [0.004 * H, 0], [0, 0.014 * H]], '#EFE6D2'); ctx.restore(); } }
};
e12Mens = function (ctx, soort, x, y, hpx, o = {}) { const KL = o.naakt ? null : E12_KLEDING[soort]; const S = KL ? Object.assign({}, E12_SOORT[soort], { kleed: null }) : E12_SOORT[soort]; if (!S) return {}; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const H = hpx, kijk = o.kijk || 1, sk = S.schedel, Pz = Object.assign(e12Pose(o.pose || 'staan', o.t, S), o.hoek || {});
  const L1 = (S.heup - S.knie) * H, L2 = (S.knie - 0.04) * H, A1 = S.arm1 * H, A2 = S.arm2 * H, Lr = (S.sch - S.heup) * H;
  // benen t.o.v. de heup: punt van knie, enkel, hiel, teen
  const been = (th, kn, vh = 0) => { const kx = Math.sin(th) * L1, ky = Math.cos(th) * L1, sa = th - kn, ax = kx + Math.sin(sa) * L2, ay = ky + Math.cos(sa) * L2; const fa = vh;
    const vx = Math.cos(fa) * S.voet * H, vy = -Math.sin(fa) * S.voet * H; return { kx, ky, ax, ay, hx: ax - vx * 0.22, hy: ay + 0.035 * H - vy * 0.22, tx: ax + vx * 0.78, ty: ay + 0.035 * H + vy * 0.78 }; };
  const B = [been(Pz.th[0], Pz.kn[0]), been(Pz.th[1], Pz.kn[1], Pz.voet2 || 0)];
  // laagste punt bepaalt de heuphoogte (voeten of knie op de grond)
  let low = -1e9; for (const b of B) low = Math.max(low, b.ay + 0.035 * H, b.hy, b.ty, Pz.voet2 ? b.ky + 0.03 * H : -1e9); const hipY = y - low, hipX = x;
  ctx.save(); ctx.globalAlpha *= a; if (kijk < 0) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); } ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (Pz.zit) { const sy = hipY + 0.06 * H; vul(ctx, [[x - 0.17 * H, y], [x - 0.15 * H, sy + 0.02 * H], [x - 0.06 * H, sy - 0.005 * H], [x + 0.08 * H, sy + 0.01 * H], [x + 0.12 * H, y]], '#6E6A62', '#8A867C', 2); } // steen om op te zitten
  const huidV = S.vacht ? _dk(S.haar, 0.18) : _dk(S.huid, 0.16), huid = S.vacht ? S.haar : S.huid;
  const tekenBeen = (b, ver) => { const c = ver ? huidV : huid; ctx.strokeStyle = c; ctx.lineWidth = 0.085 * H * (S.borst > 1.2 ? 1.12 : 1); ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(hipX + b.kx, hipY + b.ky); ctx.stroke();
    ctx.lineWidth = 0.06 * H * (S.borst > 1.2 ? 1.1 : 1); ctx.beginPath(); ctx.moveTo(hipX + b.kx, hipY + b.ky); ctx.lineTo(hipX + b.ax, hipY + b.ay); ctx.stroke();
    const vk = S.vacht ? (ver ? _dk(S.huid, 0.16) : S.huid) : c; ctx.fillStyle = vk; vul(ctx, [[hipX + b.hx, hipY + b.hy], [hipX + b.ax - 0.02 * H, hipY + b.ay - 0.02 * H], [hipX + b.ax + 0.03 * H, hipY + b.ay], [hipX + b.tx, hipY + b.ty - 0.012 * H], [hipX + b.tx + 0.005 * H, hipY + b.ty + 0.004 * H], [hipX + b.hx, hipY + b.hy + 0.004 * H]], vk); if (KL) E12K.been(ctx, KL, S, H, hipX, hipY, b, ver); };
  // romp-frame: draait om de heup met lean
  const R = (px, py) => [hipX + px * Math.cos(Pz.lean) - py * Math.sin(Pz.lean) * -1 * 0 + Math.sin(Pz.lean) * -py, hipY + py * Math.cos(Pz.lean) + px * Math.sin(Pz.lean) * 0];
  const rot = (px, py) => { const c = Math.cos(Pz.lean), s = Math.sin(Pz.lean); return [hipX + px * c - py * s, hipY + px * s + py * c]; };
  const shJ = rot(0.0, -Lr + 0.03 * H);
  const arm = (shA, el, ver, hold) => { const c = ver ? huidV : huid; const u1 = shA + Pz.lean, ex = shJ[0] + Math.sin(u1) * A1, ey = shJ[1] + Math.cos(u1) * A1, u2 = u1 + el, hx = ex + Math.sin(u2) * A2, hy = ey + Math.cos(u2) * A2;
    const dk = S.borst > 1.2 ? 1.15 : 1; if (!ver) { ctx.strokeStyle = rgba('#0B1020', 0.35); ctx.lineWidth = 0.055 * H * dk + 0.008 * H; ctx.beginPath(); ctx.moveTo(shJ[0], shJ[1]); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); }
    ctx.strokeStyle = c; ctx.lineWidth = 0.055 * H * dk; ctx.beginPath(); ctx.moveTo(shJ[0], shJ[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 0.046 * H * dk; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    if (KL) E12K.arm(ctx, KL, H, shJ, ex, ey, hx, hy, ver, dk); const hc = S.vacht ? (ver ? _dk(S.huid, 0.16) : S.huid) : c; const hl = S.hand * H; ctx.fillStyle = hc; ctx.beginPath(); ctx.ellipse(hx + Math.sin(u2) * hl * 0.4, hy + Math.cos(u2) * hl * 0.4, hl * 0.28, hl * 0.52, -u2, 0, 6.283); ctx.fill();
    const hp = { x: hx + Math.sin(u2) * hl * 0.6, y: hy + Math.cos(u2) * hl * 0.6, ang: u2 }; if (hold) hold(ctx, hp.x, hp.y, u2); return hp; };
  tekenBeen(B[1], true); const handVer = arm(Pz.sh[1], Pz.el[1], true);
  // romp
  const bK = S.borst, uK = S.buik, Hh = H;
  const romp = [[-0.045, -Lr / Hh - 0.03], [-0.07 * Math.sqrt(bK), -Lr / Hh + 0.025], [-0.072 * bK, -Lr / Hh + 0.09], [-0.05 * Math.sqrt(bK), -0.12], [-0.075, -0.02], [-0.07, 0.04], [-0.02, 0.06], [0.03, 0.05], [0.055 * uK, -0.02], [0.06 * uK, -0.11], [0.072 * bK, -Lr / Hh + 0.13], [0.062 * bK, -Lr / Hh + 0.03], [0.035, -Lr / Hh - 0.035]].map(([px, py]) => rot(px * Hh, py * Hh));
  vul(ctx, romp, huid);
  if (S.vacht) { ctx.save(); zacht(ctx, romp); ctx.clip(); ctx.strokeStyle = _lt(S.haar, 0.08); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { const [p, q] = [rot(-0.05 * Hh + i * 0.012 * Hh, -Lr * (0.2 + i * 0.07)), rot(-0.035 * Hh + i * 0.012 * Hh, -Lr * (0.15 + i * 0.07))]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } ctx.restore(); }
  if (KL) E12K.romp(ctx, KL, S, H, Lr, rot, uK, bK);
  // kleding: heupvel, cape of bovenstuk (reconstructie)
  if (S.kleed) { const wrap = [[-0.056, -0.085], [0.058 * uK, -0.09], [0.064 * uK, 0.0], [0.056, 0.1], [0.0, 0.085], [-0.048, 0.11], [-0.07, 0.04]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, wrap, S.kleed);
    lijn(ctx, [rot(-0.054 * Hh, -0.078 * Hh), rot(0.056 * uK * Hh, -0.083 * Hh)], S.kleedD, 0.012 * Hh);
    if (S.cape) { const cp = [[-0.04, -Lr / Hh - 0.03], [-0.085 * Math.min(bK, 1.2), -Lr / Hh + 0.04], [-0.09, -Lr / Hh + 0.2], [-0.07, -0.16], [0.02, -0.2], [0.075 * bK, -Lr / Hh + 0.14], [0.065 * bK, -Lr / Hh + 0.02], [0.02, -Lr / Hh - 0.035]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, cp, S.kleed); ctx.save(); zacht(ctx, cp); ctx.clip(); ctx.fillStyle = S.kleedD; ctx.beginPath(); const [cx2, cy2] = rot(-0.07 * Hh, -Lr * 0.55); ctx.ellipse(cx2, cy2, 0.03 * Hh, 0.2 * Hh, Pz.lean, 0, 6.283); ctx.fill(); ctx.restore(); }
    if (S.boven) { const bt = [[-0.04, -Lr / Hh - 0.025], [-0.07 * Math.sqrt(bK), -Lr / Hh + 0.03], [-0.072 * bK, -Lr / Hh + 0.1], [-0.052 * Math.sqrt(bK), -0.06], [0.056 * S.buik, -0.07], [0.068 * bK, -Lr / Hh + 0.13], [0.058 * bK, -Lr / Hh + 0.03], [0.03, -Lr / Hh - 0.03]].map(([px, py]) => rot(px * Hh, py * Hh)); vul(ctx, bt, S.kleed); lijn(ctx, [rot(0.02 * Hh, -Lr + 0.02 * Hh), rot(0.04 * Hh, -0.1 * Hh)], S.kleedD, 0.006 * Hh); } }
  tekenBeen(B[0], false); if (KL) E12K.rok(ctx, KL, S, H, hipX, hipY, B, rot, uK);
  // nek + hoofd
  const u = S.hoofd * H / 1.13, nek = rot(0.012 * H, -Lr - 0.02 * H), kopO = rot(0.022 * H + (Pz.kop < 0 ? -Pz.kop * 0.05 * H : 0), -(H * (1 - S.hoofd) + 0.33 * u - S.heup * H) - (o.pose === 'boule' ? -0.01 * H : 0));
  ctx.strokeStyle = S.vacht ? S.haar : _dk(S.huid, 0.08); ctx.lineWidth = 0.068 * H; ctx.beginPath(); ctx.moveTo(nek[0], nek[1]); ctx.lineTo(kopO[0], kopO[1] + 0.02 * H); ctx.stroke();
  ctx.save(); ctx.translate(kopO[0], kopO[1]); ctx.rotate(Pz.kop * 0.6); e12Kop(ctx, sk, S, u, o); ctx.restore(); if (KL && KL.ketting) E12K.ketting(ctx, H, nek, rot, Lr);
  const hand = arm(Pz.sh[0], Pz.el[0], false, o.hold);
  ctx.restore();
  const m = (p) => kijk < 0 ? { ...p, x: 2 * x - p.x } : p;
  return { hoofd: m({ x: kopO[0], y: kopO[1] - 0.3 * u }), hand: m(hand), handVer: m(handVer), top: y - H };
};

