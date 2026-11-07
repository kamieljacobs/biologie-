/* =====================================================================================
   Evolutie · les 8 · Stambomen lezen (31 okt 2026)
   Film 8 Stambomen lezen (films/evolutie/8-stambomen-lezen.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min). Laatste les van de reeks; het slotscherm blikt vooruit op de vier extra films.
   Eigen hulpen hebben het voorvoegsel L8_: cladogram (L8_boom), dieren als eenvoudige silhouetten
   (zwemmers, viervoeters, hagedis/krokodil, vogel, mens), armbotten (homologie), streepjes voor kenmerken.
   Kleuren: kenmerken op de takken goud, stroomlijn (selectie) groen, afstammingslijn goud.
   Homologe botten: bovenarm goud, onderarm blauw, hand paars. Personage: alleen mevrouw Visser in de opening (zoals de film).
   ===================================================================================== */

// ---------- dieren ----------
// zwemmer van opzij, kop rechts; s = 1 → ± 340 px lang; soort: haai, dolfijn, ichthyosaurus, walvis
function L8_zwemmer(ctx, x, y, s, soort, a = 1, T = 0, kijk = 1) { if (a <= 0.01) return;
  const K = { haai: ['#7D8A96', '#C9D0D6'], dolfijn: ['#6F8FA8', '#C6D4DE'], ichthyosaurus: ['#8A7A5E', '#CFC2A4'], walvis: ['#4A5A6E', '#9AA6B4'] }[soort];
  const [kl, buik] = K, dkl = mix(kl, '#000000', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 1.6) * 3); ctx.scale(s * kijk, s); ctx.lineJoin = 'round';
  const vul = (fn, c) => { ctx.beginPath(); fn(); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); };
  const g = ctx.createLinearGradient(0, -48, 0, 44); g.addColorStop(0, kl); g.addColorStop(0.55, kl); g.addColorStop(0.75, buik); g.addColorStop(1, buik);
  // vinnen achter het lijf
  if (soort === 'haai') { vul(() => { ctx.moveTo(10, -40); ctx.lineTo(-12, -104); ctx.lineTo(-46, -36); }, kl);
    vul(() => { ctx.moveTo(-128, -6); ctx.quadraticCurveTo(-170, -40, -205, -86); ctx.quadraticCurveTo(-182, -30, -168, -2); ctx.lineTo(-186, 40); ctx.quadraticCurveTo(-150, 18, -132, 6); }, kl); }
  if (soort === 'dolfijn' || soort === 'walvis') { const hg = soort === 'walvis' ? 0.45 : 1;
    vul(() => { ctx.moveTo(18, -42); ctx.quadraticCurveTo(2, -42 - 50 * hg, -44, -42 - 52 * hg); ctx.quadraticCurveTo(-24, -60, -30, -36); }, kl);
    vul(() => { ctx.moveTo(-128, -4); ctx.quadraticCurveTo(-160, -16, -196, -8); ctx.quadraticCurveTo(-178, 0, -196, 8); ctx.quadraticCurveTo(-160, 16, -128, 4); }, dkl); }
  if (soort === 'ichthyosaurus') { vul(() => { ctx.moveTo(4, -40); ctx.lineTo(-24, -92); ctx.lineTo(-52, -34); }, kl);
    vul(() => { ctx.moveTo(-128, -2); ctx.quadraticCurveTo(-160, -40, -190, -76); ctx.quadraticCurveTo(-176, -20, -172, 0); ctx.quadraticCurveTo(-176, 20, -190, 76); ctx.quadraticCurveTo(-160, 40, -128, 2); }, kl);
    vul(() => { ctx.moveTo(-58, 22); ctx.lineTo(-88, 54); ctx.lineTo(-78, 18); }, dkl); }
  // lijf
  const neus = soort === 'dolfijn' ? 122 : soort === 'ichthyosaurus' ? 112 : soort === 'walvis' ? 140 : 152, kop = soort === 'walvis' ? -40 : soort === 'dolfijn' ? -50 : -44;
  ctx.beginPath(); ctx.moveTo(neus, soort === 'haai' ? -6 : 0); ctx.quadraticCurveTo(95, kop - 6, 0, -45); ctx.quadraticCurveTo(-70, -40, -122, -10); ctx.lineTo(-136, -5); ctx.lineTo(-136, 5); ctx.lineTo(-122, 10);
  ctx.quadraticCurveTo(-70, 34, 0, 40); ctx.quadraticCurveTo(95, 44, neus, soort === 'haai' ? 4 : 2); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = dkl; ctx.lineWidth = 2; ctx.stroke();
  if (soort === 'dolfijn') vul(() => { ctx.moveTo(120, -6); ctx.quadraticCurveTo(150, -3, 168, 1); ctx.quadraticCurveTo(150, 7, 120, 6); }, kl);
  if (soort === 'ichthyosaurus') vul(() => { ctx.moveTo(110, -6); ctx.lineTo(196, -1); ctx.lineTo(196, 2); ctx.lineTo(110, 6); }, kl);
  // borstvin vóór het lijf
  if (soort === 'haai') vul(() => { ctx.moveTo(62, 26); ctx.lineTo(18, 84); ctx.lineTo(28, 30); }, dkl);
  else if (soort === 'walvis') vul(() => { ctx.moveTo(70, 26); ctx.quadraticCurveTo(40, 80, 0, 96); ctx.quadraticCurveTo(30, 60, 44, 28); }, dkl);
  else vul(() => { ctx.moveTo(72, 26); ctx.quadraticCurveTo(52, 60, 40, 74); ctx.quadraticCurveTo(40, 46, 44, 30); }, dkl);
  // oog, kieuwen
  if (soort === 'ichthyosaurus') { circ(ctx, 88, -10, 11, '#EDE6D2', dkl, 2); circ(ctx, 89, -10, 6, '#111'); }
  else circ(ctx, soort === 'haai' ? 112 : soort === 'walvis' ? 104 : 96, soort === 'haai' ? -12 : -6, 4, '#111');
  if (soort === 'haai') { ctx.strokeStyle = dkl; ctx.lineWidth = 2.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(68 + i * 7, -16); ctx.quadraticCurveTo(64 + i * 7, 0, 68 + i * 7, 14); ctx.stroke(); } }
  ctx.restore(); }

// viervoeter van opzij, voeten op y, kop rechts; s = 1 → ± 260 px lang
const L8_VIER = {
  nijlpaard: { kl: '#8E7C86', rx: 105, ry: 56, poot: 42, pw: 28 },
  koe: { kl: '#EDE8DE', rx: 92, ry: 44, poot: 80, pw: 17 },
  leeuw: { kl: '#C99A55', rx: 86, ry: 38, poot: 72, pw: 18 },
  tijger: { kl: '#DE8A3C', rx: 88, ry: 38, poot: 70, pw: 18 },
  huiskat: { kl: '#8F8F96', rx: 70, ry: 30, poot: 56, pw: 13 },
  chimpansee: { kl: '#3E322B', rx: 62, ry: 44, poot: 64, pw: 20 } };
function L8_vier(ctx, x, y, s, soort, a = 1, T = 0, kijk = 1) { if (a <= 0.01) return; const P = L8_VIER[soort], { kl, rx, ry, poot, pw } = P, dkl = mix(kl, '#000000', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const cy = -(poot + ry * 0.7), ap = soort === 'chimpansee';
  const been = (px, h, c) => { roundRect(ctx, px - pw / 2, -h, pw, h, pw / 2.4); ctx.fillStyle = c; ctx.fill(); };
  // staart
  ctx.strokeStyle = soort === 'koe' ? '#B9B2A6' : kl; ctx.lineWidth = soort === 'nijlpaard' ? 8 : 6;
  if (soort === 'huiskat') { ctx.beginPath(); ctx.moveTo(-rx * 0.9, cy - 6); ctx.quadraticCurveTo(-rx * 1.5, cy - 30, -rx * 1.25, cy - 90 + Math.sin(T * 2) * 6); ctx.stroke(); }
  else if (!ap) { ctx.beginPath(); ctx.moveTo(-rx * 0.95, cy - 8); ctx.quadraticCurveTo(-rx * 1.25, cy + 10, -rx * 1.2, cy + (soort === 'nijlpaard' ? 20 : 60)); ctx.stroke();
    if (soort === 'leeuw' || soort === 'koe') circ(ctx, -rx * 1.2, cy + 64, 9, soort === 'leeuw' ? '#7A4E24' : '#3A3330'); }
  // verre poten
  been(-rx * 0.45, poot + 6, dkl); been(rx * 0.7, ap ? poot + 40 : poot + 6, dkl);
  // lijf
  ctx.save(); ctx.translate(0, cy); if (ap) ctx.rotate(-0.38); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dkl; ctx.lineWidth = 2; ctx.stroke();
  if (soort === 'koe') { ctx.save(); ctx.clip(); [[-30, -20, 30, 22], [40, 6, 26, 20], [-60, 20, 20, 16]].forEach(([vx, vy, wx, wy]) => { ctx.beginPath(); ctx.ellipse(vx, vy, wx, wy, 0.3, 0, 6.283); ctx.fillStyle = '#3A3330'; ctx.fill(); }); ctx.restore(); }
  if (soort === 'tijger') { ctx.save(); ctx.clip(); ctx.strokeStyle = '#2A1E18'; ctx.lineWidth = 6; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 24, -ry); ctx.quadraticCurveTo(i * 24 + 8, -ry * 0.3, i * 24 - 2, ry * 0.2); ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  // nabije poten
  been(-rx * 0.7, poot + 4, kl); been(rx * 0.45, ap ? poot + 46 : poot + 4, kl);
  if (soort === 'koe') circ(ctx, -rx * 0.15, cy + ry * 0.85, 12, '#E8A9A0');
  // kop
  const hx = rx * (ap ? 0.82 : 0.95) + (soort === 'koe' ? 22 : 10), hy = cy - (ap ? 70 : soort === 'nijlpaard' ? 4 : soort === 'koe' ? 30 : 26);
  if (soort === 'leeuw') { circ(ctx, hx - 6, hy, 52, '#8A5A2A'); }
  if (soort === 'nijlpaard') { ctx.beginPath(); ctx.ellipse(hx + 26, hy + 6, 56, 38, 0.15, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dkl; ctx.lineWidth = 2; ctx.stroke(); circ(ctx, hx + 8, hy - 30, 9, dkl); circ(ctx, hx + 40, hy - 18, 5, '#111'); circ(ctx, hx + 70, hy - 10, 4, dkl); }
  else if (soort === 'koe') { ctx.beginPath(); ctx.ellipse(hx + 14, hy, 36, 22, 0.5, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dkl; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(hx + 34, hy + 16, 15, 12, 0.5, 0, 6.283); ctx.fillStyle = '#E8B8AE'; ctx.fill(); ctx.strokeStyle = '#B9B2A6'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(hx - 4, hy - 18); ctx.quadraticCurveTo(hx - 10, hy - 40, hx + 6, hy - 46); ctx.stroke(); circ(ctx, hx + 10, hy - 6, 4, '#111'); }
  else if (ap) { circ(ctx, hx, hy, 34, kl); ctx.beginPath(); ctx.ellipse(hx + 12, hy + 6, 22, 24, 0, 0, 6.283); ctx.fillStyle = '#C9A48A'; ctx.fill(); circ(ctx, hx - 26, hy - 2, 10, '#C9A48A'); circ(ctx, hx + 16, hy - 4, 3.5, '#111'); }
  else { const r = soort === 'huiskat' ? 24 : 30; circ(ctx, hx, hy, r, kl, dkl, 2); ctx.beginPath(); ctx.moveTo(hx - r * 0.7, hy - r * 0.5); ctx.lineTo(hx - r * 0.55, hy - r * 1.35); ctx.lineTo(hx - r * 0.05, hy - r * 0.85); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dkl; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(hx + r * 0.7, hy + r * 0.3, r * 0.5, r * 0.36, 0, 0, 6.283); ctx.fillStyle = mix(kl, '#FFFFFF', 0.4); ctx.fill(); circ(ctx, hx + r * 0.35, hy - r * 0.2, 3.5, '#111'); circ(ctx, hx + r * 1.12, hy + r * 0.18, 4, dkl);
    if (soort === 'tijger') { ctx.strokeStyle = '#2A1E18'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx - 10, hy - r + 4); ctx.lineTo(hx - 6, hy - r + 16); ctx.moveTo(hx + 2, hy - r + 2); ctx.lineTo(hx + 4, hy - r + 14); ctx.stroke(); } }
  ctx.restore(); }

// hagedis of krokodil van opzij, buik op y, kop rechts; s = 1 → ± 300 px lang
function L8_hagedis(ctx, x, y, s, a = 1, T = 0, kroko = false) { if (a <= 0.01) return; const kl = kroko ? '#556F3E' : '#8E9C4E', dkl = mix(kl, '#000000', 0.35);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = kroko ? 1.25 : 1;
  ctx.strokeStyle = dkl; ctx.lineWidth = 9; [[-40, 1], [50, -1]].forEach(([px, k], i) => { const sw = Math.sin(T * 3 + i * 2) * 5; ctx.beginPath(); ctx.moveTo(px * L, -14); ctx.lineTo(px * L + 18 * k + sw, 4); ctx.lineTo(px * L + 26 * k + sw, 6); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-60 * L, -26); ctx.quadraticCurveTo(-140 * L, -18, -200 * L, -10); ctx.quadraticCurveTo(-140 * L, -6, -60 * L, -6); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dkl; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -18, 72 * L, kroko ? 18 : 16, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.stroke();
  if (kroko) { ctx.beginPath(); ctx.moveTo(70 * L, -30); ctx.quadraticCurveTo(110 * L, -32, 160 * L, -16); ctx.lineTo(160 * L, -8); ctx.quadraticCurveTo(110 * L, -6, 70 * L, -6); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); ctx.stroke();
    ctx.fillStyle = dkl; for (let i = 0; i < 12; i++) { const px = -150 * L + i * 22 * L; ctx.beginPath(); ctx.moveTo(px - 6, px < -60 * L ? -18 + (px + 200 * L) * 0 - 6 : -34); ctx.lineTo(px, px < -60 * L ? -32 : -42); ctx.lineTo(px + 6, px < -60 * L ? -24 : -34); ctx.fill(); }
    circ(ctx, 90 * L, -30, 4.5, '#C9A43A', '#111', 2); }
  else { ctx.beginPath(); ctx.ellipse(82, -22, 28, 13, 0.1, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.stroke(); circ(ctx, 90, -26, 3.5, '#111'); }
  ctx.strokeStyle = kl; ctx.lineWidth = 9; [[-20, 1], [70, -1]].forEach(([px, k], i) => { const sw = Math.sin(T * 3 + i * 2 + 1) * 5; ctx.beginPath(); ctx.moveTo(px * L, -10); ctx.lineTo(px * L - 16 * k + sw, 6); ctx.lineTo(px * L - 24 * k + sw, 8); ctx.stroke(); });
  ctx.restore(); }

// vogel (zangvogel), zoals in les 2
function L8_vogel(ctx, x, y, s, a = 1, T = 0, kijk = 1) { if (a <= 0.01) return; const kl = C.licht ? '#6E5A44' : '#8A7258', kop = C.licht ? '#4A3C2E' : '#5C4B3A';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 2) * 2); ctx.scale(s * kijk, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 46, 30, -0.15, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.ellipse(-6, -4, 30, 16, -0.3, 0, 6.283); ctx.fillStyle = kop; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-84, -6); ctx.lineTo(-80, 14); ctx.closePath(); ctx.fillStyle = kop; ctx.fill();
  circ(ctx, 38, -24, 22, kop); ctx.beginPath(); ctx.moveTo(56, -32); ctx.lineTo(82, -22); ctx.lineTo(56, -16); ctx.closePath(); ctx.fillStyle = C.oker; ctx.fill();
  circ(ctx, 44, -28, 3.5, '#111'); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-6, 28); ctx.lineTo(-10, 52); ctx.moveTo(10, 28); ctx.lineTo(8, 52); ctx.stroke(); ctx.restore(); }

// mens als eenvoudig silhouet; y = voeten, h = lengte
function L8_mens(ctx, x, y, h, a = 1, kl = null) { if (a <= 0.01) return; const k = kl || (C.licht ? '#8A7A6E' : '#B8A898');
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = k; ctx.strokeStyle = k; ctx.lineCap = 'round';
  circ(ctx, x, y - h * 0.9, h * 0.075, k); roundRect(ctx, x - h * 0.1, y - h * 0.8, h * 0.2, h * 0.38, h * 0.06); ctx.fill();
  ctx.lineWidth = h * 0.075; ctx.beginPath(); ctx.moveTo(x - h * 0.05, y - h * 0.46); ctx.lineTo(x - h * 0.06, y - h * 0.03); ctx.moveTo(x + h * 0.05, y - h * 0.46); ctx.lineTo(x + h * 0.06, y - h * 0.03); ctx.stroke();
  ctx.lineWidth = h * 0.055; ctx.beginPath(); ctx.moveTo(x - h * 0.11, y - h * 0.75); ctx.lineTo(x - h * 0.15, y - h * 0.47); ctx.moveTo(x + h * 0.11, y - h * 0.75); ctx.lineTo(x + h * 0.15, y - h * 0.47); ctx.stroke(); ctx.restore(); }

// één dier op een tegelplek: (x, y) = midden van een vak van ± 240 × 150 bij s = 1
function L8_dier(ctx, nm, x, y, s = 1, a = 1, T = 0) { if (a <= 0.01) return;
  if (['haai', 'dolfijn', 'ichthyosaurus', 'walvis'].includes(nm)) L8_zwemmer(ctx, x + 6 * s, y, s * 0.62, nm, a, T);
  else if (L8_VIER[nm]) L8_vier(ctx, x - 6 * s, y + 66 * s, s * (nm === 'huiskat' ? 0.62 : nm === 'chimpansee' ? 0.78 : 0.72), nm, a, T);
  else if (nm === 'mens') L8_mens(ctx, x, y + 74 * s, 150 * s, a);
  else if (nm === 'hagedis' || nm === 'krokodil') L8_hagedis(ctx, x + 10 * s, y + 24 * s, s * (nm === 'krokodil' ? 0.62 : 0.7), a, T, nm === 'krokodil');
  else if (nm === 'vogel') L8_vogel(ctx, x, y, s * 1.2, a, T); }

// ---------- cladogram ----------
// boom = geneste lijsten met namen, tipX = {naam: x}; toppen op yTop, knooppunten op het midden van hun uiterste toppen (schuine boom).
// o.ea(sleutel) = doorzichtigheid per tak (sleutel = naam of 'a+b'), o.kl(sleutel) = kleur, o.stam = lengte van de stam onder de wortel.
// Geeft { tips, nodes, edges, wortel } terug; edges[sleutel] = [ouderpunt, kindpunt].
const L8_sleutel = (n) => typeof n === 'string' ? n : n.map(L8_sleutel).join('+');
function L8_boom(ctx, boom, tipX, yTop, slope, a = 1, o = {}) {
  const R = { tips: {}, nodes: {}, edges: {} };
  const lay = (n) => { if (typeof n === 'string') { const p = [tipX[n], yTop]; R.tips[n] = p; return { p, xs: [tipX[n]] }; }
    const ch = n.map(lay), xs = ch.flatMap(c => c.xs), lo = Math.min(...xs), hi = Math.max(...xs), p = [(lo + hi) / 2, yTop + (hi - lo) / 2 * slope];
    R.nodes[L8_sleutel(n)] = p; ch.forEach((c, i) => { R.edges[L8_sleutel(n[i])] = [p, c.p]; }); return { p, xs }; };
  R.wortel = lay(boom).p; if (o.stam) R.edges.stam = [[R.wortel[0], R.wortel[1] + o.stam], R.wortel];
  if (a > 0.01) { ctx.save(); ctx.lineCap = 'round'; Object.entries(R.edges).forEach(([k, [p, q]]) => { const ea = a * (o.ea ? o.ea(k) : 1); if (ea <= 0.01) return;
      ctx.globalAlpha = ea; ctx.strokeStyle = o.kl ? (o.kl(k) || C.line) : C.line; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }); ctx.restore(); }
  return R; }
// dieren en namen boven de toppen; o.ta(naam) = doorzichtigheid per top, o.s = schaal van de dieren
function L8_toppen(ctx, R, a = 1, T = 0, o = {}) { Object.entries(R.tips).forEach(([nm, [x, y]], i) => { const ta = a * (o.ta ? o.ta(nm) : 1); if (ta <= 0.01) return;
  L8_dier(ctx, nm, x, y - 92, o.s || 1, ta, T + i); naam(ctx, o.label ? o.label(nm) : nm, x, y - 182, ta, 'center', o.kn ? o.kn(nm) || C.text : C.text, 32); }); }
// lijn langs een tak oplichten (afstammingslijn), u = 0..1 vanaf de top
function L8_licht(ctx, R, keten, u, col = C.goud, lw = 12) { if (u <= 0.01) return; const pts = keten.map(k => R.edges[k]); const lijn = [pts[0][1]]; pts.forEach(e => lijn.push(e[0]));
  const L = padLengte(lijn), tot = L[L.length - 1] * clamp(u, 0, 1); ctx.save(); ctx.strokeStyle = rgba(col, 0.85); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(lijn[0][0], lijn[0][1]);
  for (let i = 1; i < lijn.length; i++) { if (L[i] <= tot) ctx.lineTo(lijn[i][0], lijn[i][1]); else { const v = (tot - L[i - 1]) / (L[i] - L[i - 1]); ctx.lineTo(lerp(lijn[i - 1][0], lijn[i][0], v), lerp(lijn[i - 1][1], lijn[i][1], v)); break; } } ctx.stroke(); ctx.restore(); }
// streepje (kenmerk) dwars op een tak, op fractie f vanaf de ouder; tekst links of rechts
function L8_streep(ctx, e, f, tekst, a = 1, col = C.goud, kant = 1, px = 30) { if (a <= 0.01) return; const [p, q] = e, x = lerp(p[0], q[0], f), y = lerp(p[1], q[1], f), an = Math.atan2(q[1] - p[1], q[0] - p[0]) + Math.PI / 2;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * 26, y - Math.sin(an) * 26); ctx.lineTo(x + Math.cos(an) * 26, y + Math.sin(an) * 26); ctx.stroke(); ctx.restore();
  if (tekst) tekst.split('\n').forEach((r, i, arr) => naam(ctx, r, x + kant * 40, y + 10 + (i - (arr.length - 1) / 2) * (px + 6), a, kant > 0 ? 'left' : 'right', col, px)); }
// knooppunt
function L8_knoop(ctx, p, a = 1, col = C.goud, r = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, p[0], p[1], r, col, C.bg, 3); ctx.restore(); }

// armbotten (homologie): bovenarm goud, onderarm (twee botten) blauw, hand paars; vin = korte dikke botten in een vinvorm
function L8_arm(ctx, x, y, s, rot, a = 1, vin = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  const [lb, lo, lh] = vin ? [46, 40, 120] : [150, 130, 90], w = vin ? 22 : 16;
  if (vin) { ctx.beginPath(); ctx.moveTo(-8, -40); ctx.quadraticCurveTo(lb + lo + 40, -60, lb + lo + lh + 20, 0); ctx.quadraticCurveTo(lb + lo + 40, 50, -8, 40); ctx.closePath(); ctx.fillStyle = rgba(C.line, 0.18); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.stroke(); }
  const bot = (x1, y1, x2, y2, b, c) => { ctx.strokeStyle = c; ctx.lineWidth = b; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
  bot(0, 0, lb, 0, w, C.goud); bot(lb + 6, -w * 0.45, lb + lo, -w * 0.5, w * 0.6, C.teal); bot(lb + 6, w * 0.45, lb + lo, w * 0.5, w * 0.6, C.teal);
  for (let i = 0; i < 5; i++) { const dy = (i - 2) * (vin ? 9 : 11), hl = lh * (vin ? [0.6, 1, 0.95, 0.8, 0.55][i] : [0.55, 0.9, 1, 0.92, 0.75][i]); circ(ctx, lb + lo + 12, dy * 0.7, 6, C.paars);
    for (let k = 0; k < (vin ? 5 : 3); k++) { const u0 = k / (vin ? 5 : 3), u1 = (k + 0.8) / (vin ? 5 : 3); bot(lb + lo + 22 + hl * u0, dy * (0.8 + u0 * 0.6), lb + lo + 22 + hl * u1, dy * (0.8 + u1 * 0.6), vin ? 7 : 8, C.paars); } }
  ctx.restore(); }

// cursieve wetenschappelijke naam: geslacht + soortaanduiding; geeft {x0, x1, x2} terug (begin, eind geslacht, eind)
function L8_wnaam(ctx, g, s, x, y, a = 1, px = 64, kg = C.text, ks = C.text) { ctx.save(); ctx.font = `italic 600 ${px}px ${F.tekst}`; const wg = ctx.measureText(g + ' ').width, ws = ctx.measureText(s).width; ctx.restore();
  if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.font = `italic 600 ${px}px ${F.tekst}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = kg; ctx.fillText(g, x, y); ctx.fillStyle = ks; ctx.fillText(s, x + wg, y); ctx.restore(); }
  return { x0: x, x1: x + wg - px * 0.25, x2: x + wg + ws }; }
// accolade onder een stuk tekst met een woord eronder
function L8_onder(ctx, x1, x2, y, tekst, a, col) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1, y + 14); ctx.lineTo(x2, y + 14); ctx.lineTo(x2, y); ctx.moveTo((x1 + x2) / 2, y + 14); ctx.lineTo((x1 + x2) / 2, y + 28); ctx.stroke(); ctx.restore(); regel(ctx, tekst, (x1 + x2) / 2, y + 64, a, col, 30, 'center', 700); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 8: stambomen lezen. Knooppunten, kenmerken op de takken, homoloog en analoog, namen en groepen', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 8 van de nieuwe reeks, Stambomen lezen: havo Biologie voor jou H4, vwo Nectar H7. Laatste les van de reeks; bewust kort (± 25 minuten), te combineren met les 7.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 8', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Stambomen', 140, 465, fTitel(98), C.text); text(ctx, 'lezen', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'knooppunt · kenmerk · homoloog of analoog', 144, 675, 1, C.text2, 32, 'left', 400);
    const R = L8_boom(ctx, ['haai', ['dolfijn', 'nijlpaard']], { haai: 1180, dolfijn: 1460, nijlpaard: 1740 }, 520, 1.3, 1, { stam: 60 });
    L8_toppen(ctx, R, 1, T, { s: 0.9 }); L8_knoop(ctx, R.nodes['dolfijn+nijlpaard'], 1); L8_knoop(ctx, R.wortel, 1, C.line, 10);
  } });

// ---------- 2 · dolfijn en haai ----------
SCHERMEN.push({ titel: 'Dolfijn en haai', kop: 'Is een dolfijn familie van een haai?', deel: 'Opening',
  stappen: [
    { t: 'Een dolfijn en een haai. Van een afstand zie je bijna geen verschil.', n: 'De opening van de film. Laat leerlingen eerst noemen wat ze hetzelfde zien.' },
    { t: 'Allebei een gestroomlijnd lijf, een vin op de rug en een krachtige staart.', n: 'Let op: de staartvin van de haai staat rechtop, die van de dolfijn plat (je ziet hem hier van opzij als een smalle streep). Dat komt terug op scherm 8.' },
    { t: 'Mevrouw Visser vraagt het aan de klas: is een dolfijn familie van een haai?', n: 'Startvraag van de film; laat leerlingen gokken. Het antwoord komt op scherm 9: alleen heel ver. De vorm is analoog, niet geërfd van één voorouder.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9), a2 = S.on(2, 0.9);
    L8_zwemmer(ctx, 470, 430, 1.55, 'haai', a0, T); L8_zwemmer(ctx, 1200, 430, 1.55, 'dolfijn', a0, T + 1);
    naam(ctx, 'haai', 470, 620, a0, 'center', C.text, 36); naam(ctx, 'dolfijn', 1200, 620, a0, 'center', C.text, 36);
    if (a1 > 0.01) { wijs(ctx, 'rugvin', 835, 215, 470 - 12 * 1.55, 430 - 92 * 1.55, a1, C.goud, 32); wijs(ctx, '', 835, 215, 1200 - 30 * 1.55, 430 - 84 * 1.55, a1, C.goud, 32);
      [['gestroomlijnd lijf', 170], ['vin op de rug', 610], ['krachtige staart', 990]].forEach(([s, x], i) => { const a = a1 * S.on(1, 0.5, 0.2 + i * 0.2); vink(ctx, x, 748, 15, a, C.groen); regel(ctx, s, x + 30, 760, a, C.text, 34, 'left', 700); }); }
    if (a2 > 0.01) { pers(ctx, 'visser', 1690, 1010, 470, { t: T, uit: 'praat', kijk: -1, a: a2 });
      ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(500, 870); ctx.quadraticCurveTo(835, 990, 1170, 870); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      regel(ctx, 'familie?', 835, 900, a2, C.goud, 48, 'center', 700); }
  } });

// ---------- 3 · een stamboom lezen ----------
const L8_B3 = [['walvis', 'nijlpaard'], 'koe'], L8_X3 = { walvis: 560, nijlpaard: 900, koe: 1240 };
SCHERMEN.push({ titel: 'Cladogram', kop: 'Een stamboom lezen', deel: 'Een stamboom lezen',
  stappen: [
    { t: 'Walvis en nijlpaard hebben een gemeenschappelijke voorouder (film 7). In een <b>cladogram</b> is dat een vertakking: elk knooppunt is een <b>gemeenschappelijke voorouder</b>.', n: 'Een knooppunt is een populatie die zich splitste in twee lijnen. De toppen zijn soorten die nu leven.' },
    { t: 'Volg je een lijn van een soort omlaag naar de wortel, dan volg je zijn <b>afstammingslijn</b>.', n: 'Tijd loopt in een cladogram van de wortel naar de toppen, niet van links naar rechts.' },
    { t: 'Voeg de koe toe. Walvis en nijlpaard delen een jongere voorouder dan walvis en koe. Hoe jonger de laatste gemeenschappelijke voorouder, hoe nauwer verwant.', n: 'Kern van het hele stamboomlezen: zoek het jongste knooppunt dat twee soorten delen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 0.9);
    const R = L8_boom(ctx, L8_B3, L8_X3, 600, 1.12, a0, { stam: 50, ea: k => (k === 'koe' ? a2 : 1) });
    L8_licht(ctx, R, ['walvis', 'walvis+nijlpaard', 'stam'], a1);
    L8_toppen(ctx, R, a0, T, { ta: nm => (nm === 'koe' ? a2 : 1) });
    L8_knoop(ctx, R.nodes['walvis+nijlpaard'], a0); L8_knoop(ctx, R.wortel, a2, C.oker);
    termKaart(ctx, 'cladogram', 'stamboom met vertakkingen', 1600, 190, a0 * S.on(0, 0.5, 0.4));
    const nw = R.nodes['walvis+nijlpaard']; naam(ctx, a2 > 0.5 ? 'jongere voorouder' : 'gemeenschappelijke voorouder', nw[0] - 34, nw[1] + 10, a0 * S.on(0, 0.5, 0.6), 'right', C.goud, 30);
    if (a1 > 0.01) naam(ctx, 'afstammingslijn', 420, 880, a1, 'left', C.goud, 32);
    if (a2 > 0.01) { naam(ctx, 'oudere voorouder', R.wortel[0] + 30, R.wortel[1] + 10, a2, 'left', C.oker, 30);
      balk(ctx, 'jongere voorouder = nauwer verwant', 1540, 760, 660, a2 * S.on(2, 0.6, 0.6), C.goud, 32); }
  } });

// ---------- 4 · draaien ----------
SCHERMEN.push({ titel: 'Draaien', kop: 'Een knooppunt is een scharnier', deel: 'Een stamboom lezen',
  stappen: [
    { t: 'In deze boom staat de walvis naast de koe, en het nijlpaard aan de rand. Wie is nu het nauwst verwant aan de walvis?', n: 'Vraag uit de film: Wie is nu het nauwst verwant aan de walvis? (a) het nijlpaard, (b) de koe: die staat er het dichtst naast, (c) dat verschilt per tekening. Antwoord a.' },
    { t: 'Draai de takken om het knooppunt: alleen de volgorde van de namen verandert. De boom blijft dezelfde.', n: 'Walvis en nijlpaard delen nog steeds hetzelfde, jongste knooppunt. Je kunt elk knooppunt zo draaien.' },
    { t: 'Lees een stamboom dus aan de <b>vertakkingen</b>, nooit aan de volgorde van de namen.', n: 'Een veelgemaakte fout: soorten die naast elkaar staan, zouden het nauwst verwant zijn.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 0.9), u = ease(a1);
    const X = { nijlpaard: lerp(560, 900, u), walvis: lerp(900, 560, u), koe: 1240 };
    const R = L8_boom(ctx, [['nijlpaard', 'walvis'], 'koe'], X, 600, 1.12, a0, { stam: 50 });
    L8_toppen(ctx, R, a0, T + Math.sin(u * Math.PI) * 0.5);
    const nw = R.nodes['nijlpaard+walvis']; L8_knoop(ctx, nw, a0, a2 > 0.01 ? C.goud : C.line); L8_knoop(ctx, R.wortel, a0, C.line, 10);
    if (a1 > 0.01 && a1 < 0.999 || (a1 >= 0.999 && a2 < 0.01)) { const k = a1 >= 0.999 ? 1 : Math.sin(a1 * Math.PI); ctx.save(); ctx.globalAlpha *= Math.max(k, 0.6) * (a1 > 0.01 ? 1 : 0); ctx.strokeStyle = C.goud; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.ellipse(nw[0], nw[1] - 6, 120, 34, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore(); pijl(ctx, nw[0] + 92, nw[1] - 30, nw[0] + 110, nw[1] - 18, C.goud, 5, Math.max(k, 0.6));
      naam(ctx, 'scharnier', nw[0], nw[1] - 58, Math.max(k, 0.6), 'center', C.goud, 30); }
    if (a2 > 0.01) { L8_licht(ctx, R, ['walvis'], a2, C.goud, 10); L8_licht(ctx, R, ['nijlpaard'], a2, C.goud, 10);
      balk(ctx, 'lees de vertakkingen, niet de volgorde', 1540, 760, 660, a2, C.goud, 30); }
  } });

// ---------- 5 · mens en chimpansee ----------
SCHERMEN.push({ titel: 'Mens en chimpansee', kop: 'Geen voorouder, maar een neef', deel: 'Een stamboom lezen',
  stappen: [
    { t: 'De chimpansee staat in de boom naast de mens. Maar een soort die nu leeft, is nooit de voorouder van een andere soort die nu leeft.', n: 'De misvatting "de mens stamt af van de chimpansee". Beide toppen zijn soorten van nu.' },
    { t: 'Mens en chimpansee hadden allebei evenveel tijd om te veranderen. Ze delen een gemeenschappelijke voorouder, ± 6 tot 8 miljoen jaar geleden.', n: 'Het getal van de film. Schattingen lopen uiteen (± 5 tot 8 miljoen jaar, afhankelijk van de methode); zie de briefing.' },
    { t: 'Die voorouder was geen mens en geen chimpansee.', n: 'Beide lijnen zijn sinds de splitsing veranderd. De chimpansee is dus geen "achtergebleven" mens.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 0.9);
    const R = L8_boom(ctx, ['mens', 'chimpansee'], { mens: 420, chimpansee: 900 }, 600, 1.4, a0, { stam: 50 });
    L8_toppen(ctx, R, a0, T, { s: 1.1 });
    misvatting(ctx, 'de chimpansee is onze voorouder', 'we delen een voorouder', 1440, 260, 780, a0, S.on(0, 0.6, 0.6));
    if (a1 > 0.01) { L8_licht(ctx, R, ['mens'], a1, C.teal, 12); L8_licht(ctx, R, ['chimpansee'], a1, C.teal, 12);
      metaText(ctx, 'nu', 1000, 610, C.text2, 'left', 22, a1); metaText(ctx, '± 6–8 miljoen jaar geleden', 1000, R.wortel[1] + 8, C.text2, 'left', 22, a1);
      ctx.save(); ctx.globalAlpha *= a1 * 0.6; ctx.setLineDash([6, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 600); ctx.lineTo(990, 600); ctx.moveTo(R.wortel[0] + 20, R.wortel[1]); ctx.lineTo(990, R.wortel[1]); ctx.stroke(); ctx.restore();
      regel(ctx, 'evenveel tijd', 1440, 600, a1 * S.on(1, 0.5, 0.8), C.teal, 38, 'center', 700); }
    L8_knoop(ctx, R.wortel, Math.max(a0 * 0.6, a2), a2 > 0.01 ? C.goud : C.line);
    if (a2 > 0.01) { L8_mens(ctx, R.wortel[0] - 150, R.wortel[1] + 60, 150, a2, rgba(C.line, 0.5)); regel(ctx, '?', R.wortel[0] - 150, R.wortel[1] - 50, a2, C.goud, 48, 'center', 700);
      regel(ctx, 'geen mens, geen chimpansee', 1440, 760, a2, C.goud, 36, 'center', 700); }
  } });

// ---------- 6 · kenmerken op de takken ----------
SCHERMEN.push({ titel: 'Kenmerken', kop: 'Kenmerken op de takken', deel: 'Kenmerken op de takken',
  stappen: [
    { t: 'Een kenmerk dat in een voorouder ontstond, erven de soorten op zijn takken. Je zet het als streepje op de tak waar het verscheen.', n: 'Soms raakt een lijn een kenmerk later weer kwijt, zoals de walvis zijn achterpoten (film 7).' },
    { t: 'Een wervelkolom hebben ze alle drie. Longen en vier poten alleen hagedis en mens. Haar en melk alleen de mens. Elk nieuw kenmerk maakt de groep kleiner.', n: 'Lees van onder naar boven: elk streepje sluit een kleinere groep in.' },
    { t: 'De haai is de <b>buitengroep</b>: hij valt buiten de groep die je onderzoekt en laat zien welke kenmerken al oud zijn.', n: 'Wat de buitengroep ook heeft (wervelkolom), is ouder dan de splitsing in de groep zelf.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 0.9);
    const R = L8_boom(ctx, ['haai', ['hagedis', 'mens']], { haai: 520, hagedis: 960, mens: 1400 }, 560, 0.75, a0, { stam: 70 });
    L8_toppen(ctx, R, a0, T, { kn: nm => (nm === 'haai' && a2 > 0.5 ? C.koraal : null) });
    L8_streep(ctx, R.edges.stam, 0.45, 'wervelkolom', a0 * S.on(0, 0.6, 0.5), C.goud, 1);
    L8_streep(ctx, R.edges['hagedis+mens'], 0.5, 'longen\nvier poten', a1 * S.on(1, 0.5, 0.2), C.goud, 1);
    L8_streep(ctx, R.edges.mens, 0.45, 'haar\nmelk', a1 * S.on(1, 0.5, 0.8), C.goud, 1);
    if (a2 > 0.01) { const [x, y] = R.tips.haai; ctx.save(); ctx.globalAlpha *= a2; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; roundRect(ctx, x - 170, y - 240, 340, 260, 22); ctx.stroke(); ctx.restore();
      termKaart(ctx, 'buitengroep', 'valt buiten de groep die je onderzoekt', 520, 190, a2, C.koraal); }
  } });

// ---------- 7 · krokodil, hagedis, vogel ----------
SCHERMEN.push({ titel: 'Krokodil', kop: 'Wie is nauwer verwant aan de krokodil?', deel: 'Kenmerken op de takken',
  stappen: [
    { t: 'Krokodil en hagedis: allebei schubben, vier poten opzij, en ze leggen eieren. Een vogel heeft veren en vleugels.', n: 'Vraag uit de film: Wie is nauwer verwant aan de krokodil? (a) de hagedis: die lijkt er het meest op, (b) ze zijn alle drie even nauw verwant, (c) de vogel. Antwoord c.' },
    { t: 'Krokodil en vogel delen kenmerken die de hagedis mist: een hart met vier kamers, een spiermaag met steentjes. Ook hun DNA wijst die kant op.', n: 'In de spiermaag vermalen ingeslikte steentjes het voedsel. Krokodillen en vogels zijn samen de enige nog levende archosauriërs.' },
    { t: 'Schubben hadden de voorouders van alle drie al: een oud kenmerk zegt niets. Alleen <b>gedeelde nieuwe kenmerken</b> tellen.', n: 'Vakterm (niet nodig voor havo/vwo-toets): gedeelde afgeleide kenmerken. Uiterlijke gelijkenis kan dus misleiden.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 0.9);
    const X = { hagedis: 520, krokodil: 960, vogel: 1400 };
    const R = L8_boom(ctx, ['hagedis', ['krokodil', 'vogel']], X, 560, 0.75, a1, { stam: 70 });
    L8_toppen(ctx, R, a0, T);
    if (a0 > 0.01 && a1 < 0.99) { const k = a0 * (1 - a1); ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(400, 600); ctx.lineTo(400, 620); ctx.lineTo(1080, 620); ctx.lineTo(1080, 600); ctx.stroke(); ctx.restore();
      regel(ctx, 'schubben · vier poten opzij · eieren', 740, 680, k, C.text2, 32, 'center', 600); regel(ctx, 'veren · vleugels', 1400, 680, k, C.text2, 32, 'center', 600); }
    L8_streep(ctx, R.edges['krokodil+vogel'], 0.5, 'hart met vier kamers\nspiermaag\nDNA', a1 * S.on(1, 0.5, 0.5), C.goud, 1);
    if (a1 > 0.01) L8_knoop(ctx, R.nodes['krokodil+vogel'], a1);
    if (a2 > 0.01) { L8_streep(ctx, R.edges.stam, 0.5, 'schubben: oud kenmerk', a2, C.text2, -1);
      termKaart(ctx, 'gedeelde nieuwe kenmerken', 'alleen die tonen wie bij wie hoort', 1560, 890, a2 * S.on(2, 0.6, 0.4)); }
  } });

// ---------- 8 · onder de huid ----------
SCHERMEN.push({ titel: 'Onder de huid', kop: 'Kijk onder de huid', deel: 'Dezelfde vorm, andere tak',
  stappen: [
    { t: 'De haai heeft een skelet van kraakbeen en kieuwen. De dolfijn heeft botten en longen.', n: 'Een dolfijn moet naar boven om adem te halen, door het blaasgat. Een haai haalt zuurstof uit het water.' },
    { t: 'In de borstvin van de dolfijn zitten dezelfde botten als in jouw arm: bovenarm, twee onderarmbotten, hand en vingers.', n: 'Zelfde bouw, andere functie: dat zijn homologe organen (film 7). Kleuren: bovenarm goud, onderarm blauw, hand paars.' },
    { t: 'En er is nog een derde zwemmer: de ichthyosaurus, een reptiel uit de tijd van de dinosauriërs. Hetzelfde stroomlijnlijf, dezelfde rugvin.', n: 'Ichthyosauriërs zijn uitgestorven zeereptielen; ze ademden ook met longen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.2), a2 = S.on(2, 0.9);
    L8_zwemmer(ctx, 480, 340, 1.4, 'haai', a0, T); L8_zwemmer(ctx, 1380, 340, 1.4, 'dolfijn', a0, T + 1);
    regel(ctx, 'haai', 480, 560, a0, C.text, 36, 'center', 700); regel(ctx, 'dolfijn', 1380, 560, a0, C.text, 36, 'center', 700);
    [['kraakbeen', 480 - 110, 610], ['kieuwen', 480 + 110, 610], ['botten', 1380 - 110, 610], ['longen', 1380 + 110, 610]].forEach(([s, x, y], i) => regel(ctx, s, x, y, a0 * S.on(0, 0.5, 0.3 + i * 0.1), i < 2 ? C.text2 : C.teal, 30, 'center', 600));
    if (a1 > 0.01) { zoom(ctx, 1460, 820, 170, a1, [1380 + 50 * 1.4, 340 + 50 * 1.4], () => L8_arm(ctx, 1340, 820, 0.95, 0.12, 1, true));
      L8_arm(ctx, 800, 830, 1.05, 0.05, a1 * S.on(1, 0.6, 0.4)); regel(ctx, 'jouw arm', 960, 960, a1 * S.on(1, 0.6, 0.4), C.text, 32, 'center', 700);
      regel(ctx, 'borstvin dolfijn', 1460, 1030, a1, C.text, 30, 'center', 700); }
    if (a2 > 0.01) { L8_zwemmer(ctx, 400, 840, 1.15, 'ichthyosaurus', a2, T + 2); regel(ctx, 'ichthyosaurus · reptiel', 400, 1000, a2, C.text, 32, 'center', 700); }
  } });

// ---------- 9 · drie keer dezelfde vorm ----------
const L8_B9 = ['haai', [['ichthyosaurus', 'hagedis'], ['nijlpaard', 'dolfijn']]], L8_X9 = { haai: 300, ichthyosaurus: 640, hagedis: 960, nijlpaard: 1280, dolfijn: 1620 };
SCHERMEN.push({ titel: 'Convergentie', kop: 'Drie keer dezelfde vorm', deel: 'Dezelfde vorm, andere tak',
  stappen: [
    { t: 'Zet ze in de boom: de dolfijn bij de zoogdieren, de ichthyosaurus bij de reptielen, de haai helemaal apart.', n: 'Vraag uit de film: Waarom hebben haai, dolfijn en ichthyosaurus bijna dezelfde vorm? (a) ze erfden die vorm van één voorouder die al zo zwom, (b) ze kregen die vorm los van elkaar, door dezelfde selectiedruk in water, (c) ze pasten zich aan omdat ze snel moesten zwemmen. Antwoord b (c is de doelgerichte misvatting uit les 2).' },
    { t: 'De voorouders van dolfijn en ichthyosaurus liepen op vier poten over land. Het zwemmerslijf ontstond later, in elke lijn opnieuw.', n: 'In water geeft een gestroomlijnd lijf minder weerstand. In elke lijn kregen individuen met een iets gladdere vorm meer nakomelingen: drie keer natuurlijke selectie, los van elkaar.' },
    { t: 'Dezelfde functie, een andere bouw: <b>analoge organen</b>. Ze ontstaan door dezelfde selectiedruk: <b>convergente evolutie</b>.', n: 'Homologe organen wijzen op verwantschap, analoge niet. Daarom kijken biologen naar bouw en DNA, niet naar het uiterlijk. Antwoord op de startvraag: dolfijn en haai zijn maar heel ver familie.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.4), a2 = S.on(2, 0.9);
    const R = L8_boom(ctx, L8_B9, L8_X9, 580, 0.45, a0, { stam: 40 });
    L8_toppen(ctx, R, a0, T, { s: 0.9, kn: nm => (['haai', 'ichthyosaurus', 'dolfijn'].includes(nm) && a1 > 0.5 ? C.groen : null) });
    L8_knoop(ctx, R.nodes['ichthyosaurus+hagedis'], a0 * S.on(0, 0.5, 0.5), C.line, 10); L8_knoop(ctx, R.nodes['nijlpaard+dolfijn'], a0 * S.on(0, 0.5, 0.5), C.line, 10);
    naam(ctx, 'reptielen', R.nodes['ichthyosaurus+hagedis'][0], R.nodes['ichthyosaurus+hagedis'][1] + 50, a0 * S.on(0, 0.5, 0.6), 'center', C.text2, 28);
    naam(ctx, 'zoogdieren', R.nodes['nijlpaard+dolfijn'][0], R.nodes['nijlpaard+dolfijn'][1] + 50, a0 * S.on(0, 0.5, 0.6), 'center', C.text2, 28);
    L8_streep(ctx, R.edges['ichthyosaurus+hagedis+nijlpaard+dolfijn'], 0.55, 'vier poten', a1 * S.on(1, 0.5, 0.1), C.goud, 1, 28);
    ['haai', 'ichthyosaurus', 'dolfijn'].forEach((k, i) => L8_streep(ctx, R.edges[k], 0.55, String(i + 1), a1 * S.on(1, 0.4, 0.5 + i * 0.3), C.groen, k === 'haai' ? -1 : 1, 30));
    regel(ctx, 'stroomlijn: drie keer los van elkaar', 960, 1035, a1 * S.on(1, 0.5, 1.2), C.groen, 32, 'center', 700);
    if (a2 > 0.01) { termKaart(ctx, 'analoge organen', 'zelfde functie, andere bouw', 560, 175, a2, C.groen); termKaart(ctx, 'convergente evolutie', 'zelfde selectiedruk, andere tak', 1360, 175, a2 * S.on(2, 0.6, 0.4), C.groen); }
  } });

// ---------- 10 · namen en groepen ----------
const L8_GROEP = [['rijk', 'dieren', 100, 180, 1720, 860], ['stam', 'gewervelde dieren', 150, 246, 1620, 776], ['klasse', 'zoogdieren', 200, 312, 1520, 692],
  ['orde', 'roofdieren', 250, 378, 1420, 608], ['familie', 'katachtigen', 300, 444, 1320, 526], ['geslacht', 'Panthera', 350, 510, 860, 440]];
SCHERMEN.push({ titel: 'Groepen', kop: 'Groepen in groepen', deel: 'Namen en groepen',
  stappen: [
    { t: 'Leeuw en tijger horen bij hetzelfde <b>geslacht</b>: Panthera.', n: 'Biologen ordenen soorten in groepen die in elkaar passen (classificatie).' },
    { t: 'Panthera hoort bij de familie katachtigen, samen met de huiskat. Dan de orde roofdieren, de klasse zoogdieren, de stam gewervelde dieren en het rijk dieren.', n: 'Ezelsbruggetje voor de volgorde (zelf te verzinnen met de klas): rijk, stam, klasse, orde, familie, geslacht, soort.' },
    { t: 'De kleinste groep is de <b>soort</b>: individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen. Leeuw en tijger zijn twee soorten.', n: 'In gevangenschap kunnen leeuw en tijger soms jongen krijgen (liger, tijgon), maar die zijn meestal onvruchtbaar en in de natuur gebeurt het niet; zie de briefing.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 2.4), a2 = S.on(2, 0.9);
    L8_GROEP.forEach(([rang, nm, x, y, w, h], i) => { const a = i === 5 ? a0 : a1 > 0.01 ? clamp(a1 * 6 - (4 - i) * 1.1, 0, 1) : 0; if (a <= 0.01) return;
      ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); shape(ctx, rgba(C.fill, C.licht ? 0.25 : 0.2), rgba(i === 5 ? C.goud : C.line, 0.7), i === 5 ? 3 : 2); ctx.restore();
      metaText(ctx, rang, x + 26, y + 40, C.text2, 'left', 20, a); regel(ctx, nm, x + 26 + (rang.length + 1) * 17, y + 42, a, i === 5 ? C.goud : C.text, 30, 'left', 700); });
    L8_vier(ctx, 560, 860, 0.95, 'leeuw', a0, T, 1); L8_vier(ctx, 980, 860, 0.95, 'tijger', a0, T + 1, 1);
    naam(ctx, 'leeuw', 560, 905, a0, 'center', C.text, 30); naam(ctx, 'tijger', 980, 905, a0, 'center', C.text, 30);
    const ak = a1 > 0.01 ? clamp(a1 * 6 - 0.2, 0, 1) : 0; L8_vier(ctx, 1420, 860, 0.85, 'huiskat', ak, T + 2); naam(ctx, 'huiskat', 1420, 905, ak, 'center', C.text, 30);
    if (a2 > 0.01) [560, 980].forEach((x, i) => { const a = a2 * S.on(2, 0.5, i * 0.3); ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; roundRect(ctx, x - 175, 640, 350, 290, 18); ctx.stroke(); ctx.restore();
      regel(ctx, 'soort', x + 160, 680, a, C.teal, 28, 'right', 700); });
  } });

// ---------- 11 · twee woorden ----------
SCHERMEN.push({ titel: 'Twee woorden', kop: 'Een naam van twee woorden', deel: 'Namen en groepen',
  stappen: [
    { t: 'De leeuw heet <i>Panthera leo</i>, de tijger <i>Panthera tigris</i>.', n: 'Vraag uit de film: De leeuw heet Panthera leo en de tijger Panthera tigris. Wat zegt het eerste woord? (a) de soort, (b) de familie, (c) het geslacht. Antwoord c.' },
    { t: 'Eerst de geslachtsnaam, met een hoofdletter, dan de soortaanduiding. Samen zijn ze de naam van de soort: <b>binomiale naamgeving</b>.', n: 'Wetenschappelijke namen schrijf je cursief (in handschrift onderstreept). De soortaanduiding alleen (leo) is geen naam.' },
    { t: 'Voor dieren deed Carl Linnaeus dat vanaf 1758. Hij noemde de mens <i>Homo sapiens</i>: de wijze mens.', n: '1758 = de 10e druk van zijn Systema Naturae; dat is nog steeds het officiële beginpunt van de dierennamen.' },
    { t: 'Hoe kleiner de groep die twee soorten delen, hoe nauwer verwant. Leeuw en tijger delen een geslacht, leeuw en huiskat alleen een familie.', n: 'Een goede indeling volgt de stamboom: de groepen zijn takken van de boom.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9), a2 = S.on(2, 0.9), a3 = S.on(3, 0.9);
    L8_vier(ctx, 300, 390, 0.9, 'leeuw', a0, T); L8_vier(ctx, 300, 640, 0.9, 'tijger', a0, T + 1);
    const n1 = L8_wnaam(ctx, 'Panthera', 'leo', 560, 330, a0, 72, a1 > 0.01 ? C.goud : C.text, a1 > 0.01 ? C.teal : C.text);
    const n2 = L8_wnaam(ctx, 'Panthera', 'tigris', 560, 580, a0 * S.on(0, 0.5, 0.3), 72, a1 > 0.01 ? C.goud : C.text, a1 > 0.01 ? C.teal : C.text);
    if (a1 > 0.01) { L8_onder(ctx, n2.x0, n2.x1, 600, 'geslacht', a1, C.goud); L8_onder(ctx, n2.x1 + 26, n2.x2, 600, 'soortaanduiding', a1 * S.on(1, 0.5, 0.3), C.teal); }
    if (a2 > 0.01) { paneel(ctx, 1290, 190, 520, 560, a2); L8_mens(ctx, 1550, 560, 260, a2);
      L8_wnaam(ctx, 'Homo', 'sapiens', 1350, 640, a2, 58, C.goud, C.teal); regel(ctx, 'de wijze mens', 1550, 700, a2, C.text2, 30, 'center', 600); metaText(ctx, 'Linnaeus · 1758', 1550, 260, C.meta, 'center', 22, a2); }
    if (a3 > 0.01) { [['leeuw', 'tijger', 'zelfde geslacht', 'nauw verwant', C.goud, 120], ['leeuw', 'huiskat', 'alleen zelfde familie', 'minder nauw', C.text2, 1000]].forEach(([d1, d2, g, v, col, x], i) => { const a = a3 * S.on(3, 0.6, i * 0.4);
        L8_vier(ctx, x + 70, 930, 0.48, d1, a, T); L8_vier(ctx, x + 210, 930, 0.48, d2, a, T + 1);
        regel(ctx, g, x + 320, 880, a, col, 34, 'left', 700); regel(ctx, v, x + 320, 925, a, C.text2, 30, 'left', 500); }); }
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Stambomen lezen', deel: 'Afsluiting',
  stappen: [
    { t: 'Lees een stamboom aan de <b>vertakkingen</b>, niet aan de volgorde van de namen. Hoe jonger de gedeelde voorouder, hoe nauwer verwant.', n: 'Scherm 3–5: knooppunt, draaien, geen soort van nu is de voorouder van een andere.' },
    { t: 'Alleen <b>gedeelde nieuwe kenmerken</b>, bouw en DNA tonen wie bij wie hoort. Oude kenmerken zeggen niets.', n: 'Scherm 6–7: streepjes op de takken, buitengroep, krokodil en vogel.' },
    { t: 'Dolfijn en haai zijn maar heel ver familie: hun stroomlijn en rugvin zijn <b>analoog</b>, door dezelfde selectiedruk in water.', n: 'Scherm 8–9: homoloog wijst op verwantschap, analoog niet (convergente evolutie). Antwoord op de startvraag.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['vertakkingen', C.goud, ['jongste knooppunt', 'telt, niet de', 'volgorde van namen']], ['nieuwe kenmerken', C.oker, ['gedeelde nieuwe', 'kenmerken, bouw', 'en DNA']], ['analoog', C.groen, ['zelfde vorm,', 'andere tak:', 'convergente evolutie']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { const R = L8_boom(ctx, [['walvis', 'nijlpaard'], 'koe'], { walvis: x + 120, nijlpaard: x + 270, koe: x + 420 }, 380, 0.9, a, { stam: 30 }); L8_knoop(ctx, R.nodes['walvis+nijlpaard'], a, C.goud, 11);
        ['walvis', 'nijlpaard', 'koe'].forEach(nm => regel(ctx, nm, R.tips[nm][0], 360, a, C.text2, 24, 'center', 600)); }
      if (i === 1) { const R = L8_boom(ctx, ['hagedis', ['krokodil', 'vogel']], { hagedis: x + 120, krokodil: x + 270, vogel: x + 420 }, 380, 0.9, a, { stam: 30 }); L8_streep(ctx, R.edges['krokodil+vogel'], 0.5, '', a, C.goud);
        ['hagedis', 'krokodil', 'vogel'].forEach(nm => regel(ctx, nm, R.tips[nm][0], 360, a, C.text2, 24, 'center', 600)); }
      if (i === 2) { L8_zwemmer(ctx, x + 270, 410, 0.8, 'haai', a, T); L8_zwemmer(ctx, x + 270, 560, 0.8, 'dolfijn', a, T + 1); }
      regels.forEach((r, k) => regel(ctx, r, x + 40, 720 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · wie meer wil ----------
function L8_icoonSchip(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 1.5) * 4);
  const hout = C.licht ? '#7A5A3A' : '#9A7A55', zeil = C.licht ? '#EFE8D8' : '#E4DCC6';
  ctx.beginPath(); ctx.moveTo(-120, 40); ctx.lineTo(120, 40); ctx.lineTo(96, 80); ctx.lineTo(-100, 80); ctx.closePath(); ctx.fillStyle = hout; ctx.fill();
  [-60, 10, 76].forEach((mx, i) => { ctx.strokeStyle = hout; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx, 40); ctx.lineTo(mx, -100 + i * 14); ctx.stroke();
    [[-86, -30], [-26, 30]].forEach(([y1, y2]) => { ctx.beginPath(); ctx.moveTo(mx - 30, y1 + i * 14); ctx.quadraticCurveTo(mx, y1 + 8 + i * 14, mx + 30, y1 + i * 14); ctx.lineTo(mx + 26, y2 - 6); ctx.quadraticCurveTo(mx, y2, mx - 26, y2 - 6); ctx.closePath(); ctx.fillStyle = zeil; ctx.fill(); }); });
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const xx = -150 + i * 7.5, yy = 92 + Math.sin(i * 0.8 + T * 2) * 5; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
function L8_icoonCel(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y + 10, 92, 80, 2, 0.07); shape(ctx, rgba(C.teal, 0.12), C.teal, 4);
  ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const xx = x - 50 + i * 3.4, yy = y + 10 + Math.sin(i * 0.6 + T * 2) * 14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (let i = 0; i < 9; i++) { const an = i * 0.7 + T * 0.3, r = 130 + hash(i) * 20; circ(ctx, x + Math.cos(an) * r, y + 10 + Math.sin(an) * r * 0.75, 7, [C.goud, C.oker, C.groen][i % 3]); } ctx.restore(); }
function L8_icoonTijd(ctx, x, y, a, T) { if (a <= 0.01) return; const x0 = x - 140, w = 280;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y + 40); ctx.lineTo(x0 + w, y + 40); ctx.stroke(); ctx.restore();
  [[0.02, C.teal, 10], [0.45, C.groen, 12], [0.86, C.paars, 13], [0.95, C.oker, 14], [0.999, C.goud, 16]].forEach(([u, col, r]) => circ(ctx, x0 + u * w, y + 40, r * a, col, C.bg, 2));
  metaText(ctx, '4 mld jaar', x0, y + 96, C.text2, 'left', 18, a); metaText(ctx, 'nu', x0 + w, y + 96, C.text2, 'right', 18, a);
  L8_hagedis(ctx, x + 70, y - 20, 0.42, a, T, true); L8_zwemmer(ctx, x - 70, y - 50, 0.32, 'haai', a, T); }
function L8_icoonMens(ctx, x, y, a) { L8_mens(ctx, x - 80, y + 100, 170, a * 0.45, C.line); L8_mens(ctx, x + 80, y + 100, 180, a * 0.45, C.line); L8_mens(ctx, x, y + 108, 210, a); }
SCHERMEN.push({ titel: 'Wie meer wil', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Dit was de laatste les van de reeks. <b>Wie meer wil</b>: vier extra films over Darwin, het ontstaan van het leven, de geschiedenis van het leven en de evolutie van de mens.', n: 'Huiswerk: de film Stambomen lezen (nog eens) kijken. De extra films zijn verdieping, niet verplicht: De reis van Darwin (wat zag hij onderweg, en waarom wachtte hij twintig jaar?), Het ontstaan van het leven (van losse moleculen naar een cel die zichzelf kopieert), Van eerste cel tot nu (vier miljard jaar: wanneer verschijnt wat?), Hoe werden we mens? (waarom zijn wij nu de enige mensensoort?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Wie meer wil', [['De reis van Darwin', 'wat zag hij onderweg?', L8_icoonSchip], ['Ontstaan van het leven', 'van molecuul tot cel', L8_icoonCel], ['Van eerste cel tot nu', 'vier miljard jaar leven', L8_icoonTijd], ['Hoe werden we mens?', 'nog maar één mensensoort', L8_icoonMens]]); } });
