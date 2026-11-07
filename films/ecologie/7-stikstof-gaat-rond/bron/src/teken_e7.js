// teken_e7.js — animatiehulpen voor film 7 'Stikstof gaat rond' (Ecologie v2). Laadt na teken_eco7.js, vóór sb7.js.
// Alleen eigen functies (voorvoegsel a7) plus één overschrijving: e7Klok toont hele weken bij een lopende wijzer.

// seizoensklok: wijzer loopt vloeiend, getal in hele weken
function e7Klok(ctx, x, y, week, o = {}) { const { max = 8, r = 54, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.fill, 0.85), C.line, 1.5);
  if (week > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r - 10, -Math.PI / 2, -Math.PI / 2 + 6.283 * Math.min(1, week / max)); ctx.stroke(); }
  const w = Math.floor(week + 0.001); text(ctx, String(w), x, y + 16, fTekst(46, 700), C.text, 'center'); metaText(ctx, w === 1 ? 'WEEK' : 'WEKEN', x, y + r + 34, C.text2, 'center', 26); ctx.restore(); }

const a7 = {
  // pijl die groeit van (x1,y1) naar (x2,y2); u = 0..1
  pijl(ctx, x1, y1, x2, y2, u, kl, a = 1, lw = 4, kop = 16) { if (u <= 0.01 || a <= 0.01) return; pijl(ctx, x1, y1, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u, kl, a, lw, kop * Math.min(1, u * 4)); },
  // punt op een polylijn bij fractie u (0..1)
  langs(P, u) { let L = 0; const d = []; for (let i = 1; i < P.length; i++) { const s = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); d.push(s); L += s; }
    let r = clamp(u, 0, 1) * L, i = 0; while (i < d.length - 1 && r > d[i]) { r -= d[i]; i++; } const f = d[i] ? r / d[i] : 0; return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f]; },
  // deeltjes die langs een pad stromen (vervagen aan begin en eind); teken(ctx, x, y, k, u)
  stroom(ctx, P, t, n, teken, o = {}) { const { snel = 0.18, a = 1, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    for (let k = 0; k < n; k++) { const u = ((t * snel + k / n + hash(seed + k) * 0.04) % 1 + 1) % 1; const [x, y] = this.langs(P, u); ctx.save(); ctx.globalAlpha *= Math.min(1, u * 8, (1 - u) * 8); teken(ctx, x, y, k, u); ctx.restore(); }
    ctx.restore(); },
  // regendruppels die vallen tussen y0 en y1
  regen(ctx, x0, x1, y0, y1, t, n, o = {}) { const { a = 1, seed = 3, snel = 1.1, kl = '#9CCBE3' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(kl, 0.85);
    for (let i = 0; i < n; i++) { const u = (t * snel + hash(seed + i * 1.7)) % 1, x = x0 + hash(seed + i * 3.1) * (x1 - x0), y = y0 + u * (y1 - y0); ctx.save(); ctx.globalAlpha *= Math.min(1, u * 6, (1 - u) * 6);
      ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.quadraticCurveTo(x + 6, y, x, y + 5); ctx.quadraticCurveTo(x - 6, y, x, y - 10); ctx.fill(); ctx.restore(); }
    ctx.restore(); },
  druppel(ctx, x, y, a = 1, s = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#9CCBE3', 0.9); ctx.beginPath(); ctx.moveTo(x, y - 10 * s); ctx.quadraticCurveTo(x + 6 * s, y, x, y + 5 * s); ctx.quadraticCurveTo(x - 6 * s, y, x, y - 10 * s); ctx.fill(); ctx.restore(); },
  // pulserende gouden ring (nadruk)
  ring(ctx, x, y, r, a, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * (1 + 0.04 * Math.sin(t * 3)), 0, 6.283); ctx.stroke(); ctx.restore(); },
  // bak met een eigen (groeiende) plant: tekent e7Bak zonder plant en daarna wortels en plant
  bak(ctx, x, y, o = {}, p = null) { const g = e7Bak(ctx, x, y, Object.assign({}, o, { plant: null })); if (!p || (p.a ?? 1) <= 0.01) return g; const { w = 240 } = o, seed = o.seed || 1;
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1) * (p.a ?? 1);
    ctx.save(); ctx.beginPath(); ctx.rect(g.x0 + 3, g.top0 - 4, w - 6, g.bodem - g.top0 + 4); ctx.clip(); e7Wortels(ctx, x, g.top0, Math.min(110, (g.bodem - g.top0) * 0.75) * (p.wortel ?? 1), w * 0.7, { knol: p.knol || 0, seed }); ctx.restore();
    const grond = g.top0 - (o.mest || 0) * 0.6;
    if (p.soort === 'gras') e7Gras(ctx, x, grond, w - 30, p.h, { seed, kleur: p.kleur || E7.gras, n: p.n || 14 });
    if (p.soort === 'klaver') e7Klaver(ctx, x, grond, w - 40, p.h, { seed, n: p.n || 8 });
    ctx.restore(); return g; },
  // eiwitketen met per kraal een stikstofstip die oplicht (nA(i) = 0..1) en kralen die verschijnen (kA(i))
  eiwit(ctx, cx, cy, s = 1, o = {}) { const { vouw = 0.8, n = 30, nA = () => 1, kA = () => 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    const los = (i) => [(i - n / 2) * 22 * s, Math.sin(i * 0.6) * 30 * s];
    const kluw = (i) => { const u = i / n; if (u < 0.35) { const k = i; return [(-120 + k * 7) * s, (-60 + Math.sin(k * 1.7) * 26) * s]; } if (u < 0.55) { const k = i - 0.35 * n; return [(30 + Math.cos(k * 0.9) * 60) * s, (-10 + k * 12) * s]; } const k = i - 0.55 * n; return [(90 - k * 14) * s, (70 + Math.sin(k * 1.6) * 22) * s]; };
    const f = ease(vouw), P = Array.from({ length: n }, (_, i) => { const A = los(i), B = kluw(i); return [cx + A[0] + (B[0] - A[0]) * f, cy + A[1] + (B[1] - A[1]) * f]; });
    const zicht = P.filter((p, i) => kA(i) > 0.5); if (zicht.length > 1) lijn(ctx, zicht, '#9AA8C0', 3 * s);
    P.forEach((p, i) => { const ka = kA(i); if (ka <= 0.01) return; ctx.save(); ctx.globalAlpha *= ka; circ(ctx, p[0], p[1], 11 * s, i % 4 === 0 ? '#8C9DBA' : '#7A8BA8', '#A9B8D0', 1.2);
      const na = nA(i); if (na > 0.01) { ctx.globalAlpha *= na; circ(ctx, p[0] + 4 * s, p[1] - 4 * s, 3.6 * s * (1 + 0.6 * (1 - na)), E7.nit); } ctx.restore(); });
    ctx.restore(); return P; },
  // waterplant die wiegt
  waterplant(ctx, x, y, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const P = [[x + i * 6 - 12, y]]; for (let k = 1; k <= 5; k++) P.push([x + i * 6 - 12 + Math.sin(k + i + t * 0.9) * 8 * k / 5 + Math.sin(k + i) * 4, y - h * k / 5 * (0.7 + 0.3 * hash(i))]); lijn(ctx, P, '#5FA86E', 3); } ctx.restore(); },
  // gloeiend lampje boven de bakken
  lamp(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(0, y, 0, y + 220); g.addColorStop(0, rgba('#F2D88A', 0.22)); g.addColorStop(1, rgba('#F2D88A', 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - w / 2 + 20, y + 10); ctx.lineTo(x + w / 2 - 20, y + 10); ctx.lineTo(x + w / 2 + 60, y + 230); ctx.lineTo(x - w / 2 - 60, y + 230); ctx.fill();
    roundRect(ctx, x - w / 2, y - 8, w, 20, 8); shape(ctx, '#5E6A80', '#97A3B6', 1.5); ctx.fillStyle = '#F2D88A'; ctx.fillRect(x - w / 2 + 14, y + 8, w - 28, 5);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y - 60); ctx.stroke(); ctx.restore(); },
  // trekker met ploeg (zijaanzicht, naar rechts); x = achterkant van de ploeg op de grond y
  trekker(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); // y = grondlijn; ploeg (links) aan de trekhaak, wielen op de grond
    lijn(ctx, [[70, -34], [158, -44]], '#97A3B6', 7); // trekboom naar de trekhaak
    vul(ctx, [[30, 6], [110, 6], [86, -34], [56, -34]], '#7A8494'); ctx.fillStyle = '#5E6A80'; ctx.fillRect(50, -40, 44, 10); // ploegschaar steekt in de grond
    roundRect(ctx, 150, -150, 210, 84, 10); shape(ctx, '#3F7A5A', '#5E9A78', 2); roundRect(ctx, 176, -232, 100, 84, 8); shape(ctx, '#2E4A5C', '#5E7A9A', 2); ctx.fillStyle = rgba('#9CCBE3', 0.4); ctx.fillRect(188, -220, 76, 52);
    roundRect(ctx, 308, -192, 18, 50, 4); shape(ctx, '#5E6A80', null); circ(ctx, 156, -44, 7, '#5E6A80');
    const wiel = (wx, r) => { ctx.save(); ctx.translate(wx, -r); circ(ctx, 0, 0, r, '#2A2E36', '#4A505C', 2); circ(ctx, 0, 0, r * 0.45, '#8F98A6'); ctx.rotate(t * 3); ctx.strokeStyle = '#4A505C'; ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.moveTo(-r * 0.8, 0); ctx.lineTo(r * 0.8, 0); ctx.stroke(); } ctx.restore(); };
    wiel(220, 72); wiel(334, 42); ctx.restore(); },
  // mini-sloot (doorsnede) als klein kader
  slootje(ctx, x, y, w, h, groen = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip();
    ctx.fillStyle = '#5A4632'; ctx.fillRect(x, y + h * 0.42, w, h); ctx.fillStyle = '#2E6A8A'; ctx.beginPath(); ctx.moveTo(x + w * 0.25, y + h * 0.42); ctx.lineTo(x + w * 0.35, y + h * 0.85); ctx.lineTo(x + w * 0.65, y + h * 0.85); ctx.lineTo(x + w * 0.75, y + h * 0.42); ctx.fill();
    for (let i = 0; i < 26 * groen; i++) { ctx.fillStyle = i % 3 ? E7.kroos : '#6AA040'; ctx.beginPath(); ctx.ellipse(x + w * 0.27 + hash(i * 1.7) * w * 0.46, y + h * 0.44, 7, 3.5, 0, 0, 6.283); ctx.fill(); }
    for (let i = 0; i < 18; i++) { const gx = x + hash(i * 3.3) * w; if (gx > x + w * 0.22 && gx < x + w * 0.78) continue; lijn(ctx, [[gx, y + h * 0.42], [gx + 2, y + h * 0.42 - 12]], '#6FAA6A', 2.5); }
    ctx.restore(); ctx.restore(); },
  // stikstofkringloop met per stap een eigen oplichting (L[id] 0..1, basis 0.3) en per knoop (K[id]); zuur = 0..1 maakt met/zonder zuurstof goud
  kringloop(ctx, o = {}) { const { L = {}, K = {}, zuur = 0, dx = 0, dy = 0, basis = 0.3, labels = true } = o; ctx.save(); ctx.translate(dx, dy);
    const kleurK = (k) => (k === 'plant' || k === 'dier' || k === 'dood') ? E7.org : (k === 'lucht' ? E7.n2 : E7.nit);
    for (const [id, S] of Object.entries(E7_STAP)) { const [, , x1, y1, x2, y2, naam, meta, lx, ly, al] = S; const on = L[id] ?? 0; const kl = (id === 'eten' || id === 'dood') ? E7.org : E7.nit;
      pijl(ctx, x1, y1, x2, y2, C.line, basis * (1 - on), 3, 18); pijl(ctx, x1, y1, x2, y2, kl, on, 5, 18);
      if (labels && naam) { const z = (id === 'nitrificatie' || id === 'denitrificatie') ? zuur : 0; ctx.save(); ctx.globalAlpha *= basis + (1 - basis) * on; naamBij(ctx, naam, meta, lx, ly, 1, al, z > 0.5 ? C.goud : C.text); ctx.restore(); } }
    for (const [k, [x, y, naam, meta]] of Object.entries(E7_KNOOP)) { const kl = kleurK(k), ka = K[k] ?? 1; if (ka <= 0.01) continue; ctx.save(); ctx.globalAlpha *= ka; roundRect(ctx, x - 135, y - 46, 270, 92, 46); shape(ctx, _m7(kl, 0.72, C.bgSchema), kl, 2); text(ctx, naam, x, y + 4, fTekst(36, 600), C.text, 'center'); metaText(ctx, meta, x, y + 34, C.text2, 'center', 22); ctx.restore(); }
    ctx.restore(); },
  // een stikstofbolletje dat de kringloop rondgaat (fractie u over de zeven stappen, met de denitrificatie als laatste)
  kringPunt(u) { const volg = ['binding', 'nitrificatie', 'opname', 'eten', 'dood', 'ammonificatie', 'nitrificatie', 'denitrificatie'];
    const v = ['binding', 'nitrificatie', 'opname', 'eten', 'dood', 'ammonificatie']; // amm → nit → plant → dier → dood → amm; daarna denitrificatie terug naar de lucht
    const route = [[420, 262], [420, 588], [520, 594], [910, 300], [1134, 262], [1406, 318], [1540, 380], [1540, 590], [1408, 676], [1136, 770], [866, 786], [556, 676], [520, 594], [910, 300], [866, 238], [556, 218], [420, 262]];
    return this.langs(route, ((u % 1) + 1) % 1); },
  // stikstofbalans met groeiende blokken (f = {kunst, mest, lucht, oogst} 0..1) en een overschot (ov 0..1)
  balans(ctx, x, y, o = {}) { const { k = 2.2, f = {}, ov = 0, as = 1 } = o; ctx.save();
    ctx.globalAlpha *= as; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x + 720, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x - 40, y - 250 * k); ctx.stroke();
    for (let v = 0; v <= 250; v += 50) { ctx.beginPath(); ctx.moveTo(x - 48, y - v * k); ctx.lineTo(x - 40, y - v * k); ctx.stroke(); metaText(ctx, String(v), x - 58, y - v * k + 9, C.text2, 'right', 26); }
    metaText(ctx, 'KG N PER HA PER JAAR', x - 40, y - 250 * k - 26, C.text2, 'left', 26); metaText(ctx, 'VOORBEELD', x + 720, y - 250 * k - 26, C.text2, 'right', 26);
    text(ctx, 'erop', x + 140, y + 54, fTekst(40, 700), C.text, 'center'); text(ctx, 'eraf', x + 540, y + 54, fTekst(40, 700), C.text, 'center');
    const blok = (bx, v0, v, u, kl, naam) => { if (u <= 0.01) return; const vv = v * ease(u); roundRect(ctx, bx, y - (v0 + vv) * k, 200, Math.max(2, vv * k - 3), 6); shape(ctx, _m7(kl, 0.25, C.bgSchema), _l7(kl, 0.3), 1.5); if (naam && u > 0.6) { ctx.save(); ctx.globalAlpha *= (u - 0.6) / 0.4; text(ctx, naam, bx + 100, y - (v0 + v / 2) * k + 13, fTekst(36, 600), C.text, 'center'); ctx.restore(); } };
    blok(x + 40, 0, 120, f.kunst ?? 1, E7.nit, 'kunstmest 120'); blok(x + 40, 120, 80, f.mest ?? 1, ECOK.organisch, 'mest 80'); blok(x + 40, 200, 20, f.lucht ?? 1, E7.n2, '');
    if ((f.lucht ?? 1) > 0.6) { ctx.save(); ctx.globalAlpha *= ((f.lucht ?? 1) - 0.6) / 0.4; text(ctx, 'lucht 20', x + 260, y - 210 * k + 12, fTekst(36, 600), C.text, 'left'); ctx.restore(); }
    blok(x + 440, 0, 140, f.oogst ?? 1, C.oker, 'oogst 140');
    if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x + 440, y - 220 * k, 200, 80 * k - 3, 6); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = rgba(C.goud, 0.12 * ov); ctx.fill(); text(ctx, 'overschot 80', x + 540, y - 180 * k + 13, fTekst(36, 700), C.goud, 'center'); ctx.restore(); }
    ctx.restore(); },
};
