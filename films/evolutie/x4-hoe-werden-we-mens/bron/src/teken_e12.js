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
