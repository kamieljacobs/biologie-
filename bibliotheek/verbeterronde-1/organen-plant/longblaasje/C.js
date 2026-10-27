// =====================================================================================
// LONGBLAASJES — overzicht (trosje aan een luchtwegtakje met aan- en afvoerend vaatje) + zoom: één blaasje in doorsnede op schaal.
// Recept: blaasje Ø ± 200 µm, in trosjes (alveolaire zak) aan het eind van een bronchiool. Wand van platte type I-cellen
// (± 25 nm) + haarvatwand samen ± 0,5 µm: in het micro-venster (2,3 eenheden per µm) dus een haarlijn van ± 1 eenheid,
// tegen een blaasje van 460. Haarvaten (± 8 µm) liggen ín de dunne tussenschotten en raken aan twee kanten de lucht;
// rode bloedcellen (7,5 µm) passen er net in, één voor één. Type II-cel (surfactant) en stofcel (macrofaag) op de wand.
// O2 van de lucht naar het bloed, CO2 andersom; bloed kleurt van zuurstofarm (blauw) naar zuurstofrijk (rood).
// Bron: LibreTexts Human Anatomy Lab 19.6 (Ø ± 200 µm, type I ± 25 nm, ± 97 % oppervlak, type II, macrofagen;
// de pagina noemt de luchtwegmembraan '0,5 mm' — moet 0,5 µm zijn, zie bron.md). Bekende fouten: dikke wand;
// haarvaten midden in de lucht; trosje zonder luchtwegtakje.
// Ontwerp: hoogte ± 600, breedte ± 740; linksboven het trosje (overzicht), rechtsonder het micro-venster (Ø 480).
// Aanpak C (ronde 2, uit B): micro-venster van B met veel dunnere wand + het trosje uit A ernaast, met zoomlijnen.
// o: a, t, adem (0..1), gas (0..1), hi ('wand','haarvat','typeII','macrofaag','blaasje','net'), tros (1), schaal (1)
// =====================================================================================
function longblaasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, tros = 1 } = o; const TX = -300, TY = -175, MX = 80, MY = 40, km = 0.8, kt = 0.38;
  const ankM = _longMicro(ctx, x + MX * s, y + MY * s, s * km, Object.assign({}, o, { a: 0 })); const ankT = _longTros(ctx, x + TX * s, y + TY * s, s * kt, Object.assign({}, o, { a: 0 }));
  const anker = Object.assign({}, ankM, { tros: ankT.blaasje, bronchiool: ankT.bronchiool, longslagader: ankT.longslagader, longader: ankT.longader });
  if (a <= 0.01) return anker;
  if (tros > 0.01) { ctx.save(); ctx.globalAlpha *= tros; _longTros(ctx, x + TX * s, y + TY * s, s * kt, Object.assign({}, o, { gas: 0, net: 1, a: a }));
    // zoomlijnen van één blaasje naar het venster
    const bx = x + (TX + 70 * kt) * s, by = y + (TY + 30 * kt) * s, br = 76 * kt * s; ctx.strokeStyle = rgba(C.goud, 0.85); ctx.lineWidth = 2 * Math.max(0.5, s); ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.283); ctx.stroke();
    const mx = x + MX * s, my = y + MY * s, R = 300 * km * s; ctx.beginPath(); ctx.moveTo(bx + br * 0.9, by - br * 0.4); ctx.lineTo(mx - R * 0.17, my - R * 0.985); ctx.moveTo(bx - br * 0.4, by + br * 0.9); ctx.lineTo(mx - R * 0.94, my + R * 0.34); ctx.stroke(); ctx.restore(); }
  _longMicro(ctx, x + MX * s, y + MY * s, s * km, o);
  return anker;
}
function _longTros(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, adem = 0.5, gas = 0, net = 1, hi = null } = o;
  const k = 0.94 + 0.08 * adem;
  const BL = [[-40, -150, 70], [55, -145, 66], [-120, -60, 72], [130, -55, 70], [-30, -40, 74], [70, 30, 72], [-115, 70, 68], [-15, 105, 72], [110, 125, 66], [10, 205, 66], [-95, 175, 62]];
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { bronchiool: W(-200, -250), blaasje: W(-30, -40), haarvaten: W(70, 30), longslagader: W(-250, 100), longader: W(240, 120) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WAND = '#D79A93', WANDl = '#EDC3BC', WANDd = '#B57872', ARM = BIO.ader, RIJK = BIO.bloed;
  const mix = (u) => { const A = [0x5B, 0x7F, 0xB0], B = [0xC2, 0x45, 0x3E]; u = clamp(u, 0, 1); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], u))).join(',')})`; };
  // bronchiool + gangetje (achter de blaasjes)
  ctx.strokeStyle = WANDd; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(-250, -300); ctx.quadraticCurveTo(-130, -200, -30, -90); ctx.lineTo(10, 120); ctx.stroke();
  ctx.strokeStyle = WAND; ctx.lineWidth = 40; ctx.stroke();
  // longslagader-takje (blauw) en longader-takje (rood)
  const vat = (pts, w, col) => { ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = w + 3; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); };
  vat([[-300, 120], [-200, 60], [-150, -10], [-90, -110]], 16, ARM);
  vat([[150, -120], [190, 20], [210, 120], [300, 150]], 18, RIJK);
  // blaasjes
  const blaas = BL.map(([bx, by, r]) => [bx, by, r * k]);
  for (let i = 0; i < blaas.length; i++) { const [bx, by, r] = blaas[i];
    ctx.save(); ctx.globalAlpha *= (hi && hi !== 'blaasje' && hi !== 'net') ? 0.35 : 1;
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fillStyle = WAND; ctx.fill(); ctx.strokeStyle = (hi === 'blaasje' && i === 4) ? C.goud : WANDl; ctx.lineWidth = (hi === 'blaasje' && i === 4) ? 4 : 1.5; ctx.stroke();
    // lichte koepel (vlak, geen verloop): kleinere lichtere schijf linksboven
    ctx.beginPath(); ctx.arc(bx - r * 0.22, by - r * 0.24, r * 0.55, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.fill();
    // haarvatennet over het blaasje
    if (net > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(bx, by, r - 1, 0, 6.283); ctx.clip(); ctx.globalAlpha *= net;
      const N = 7; const pts = []; for (let j = 0; j < N * N; j++) { const gx = (j % N) / (N - 1) - 0.5, gy = Math.floor(j / N) / (N - 1) - 0.5; pts.push([bx + gx * r * 2.2 + (hash(i * 50 + j) - 0.5) * r * 0.25, by + gy * r * 2.2 + (hash(i * 50 + j + 7) - 0.5) * r * 0.25]); }
      ctx.lineWidth = 4.5; for (let j = 0; j < N * N; j++) { const p = pts[j]; for (const d of [1, N]) { if (d === 1 && j % N === N - 1) continue; const q = pts[j + d]; if (!q) continue;
        const u = ((p[0] + q[0]) / 2 + 300) / 600; ctx.strokeStyle = hi === 'net' ? C.goud : mix(u); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo((p[0] + q[0]) / 2 + (hash(j + d) - 0.5) * 8, (p[1] + q[1]) / 2 + (hash(j * 3 + d) - 0.5) * 8, q[0], q[1]); ctx.stroke(); } }
      // rode bloedcellen (op schaal, ± 5 eenheden) die één voor één door het net schuiven
      for (let j = 0; j < 10; j++) { const r0 = Math.floor(hash(i * 13 + j) * N); const u = ((t * 0.18 + hash(i * 7 + j)) % 1); const fx = u * (N - 1); const c0 = Math.floor(fx);
        const p = pts[r0 * N + c0], q = pts[r0 * N + Math.min(N - 1, c0 + 1)]; const px = lerp(p[0], q[0], fx - c0), py = lerp(p[1], q[1], fx - c0);
        ctx.fillStyle = lighten(mix((px + 300) / 600), 0.15); ctx.beginPath(); ctx.ellipse(px, py, 3.2, 2.3, 0, 0, 6.283); ctx.fill(); }
      ctx.restore(); }
    ctx.restore(); }
  // gaswisseling: O2 (teal) gaat het bloed in, CO2 (grijs) komt eruit
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; for (let j = 0; j < 22; j++) { const b = blaas[j % blaas.length]; const u = (t * 0.35 + hash(j * 3.1)) % 1; const ang = hash(j * 5.7) * 6.283;
      const o2 = j % 3 !== 0; const r0 = b[2] * (o2 ? lerp(0.15, 0.85, u) : lerp(0.85, 0.15, u)); const px = b[0] + Math.cos(ang) * r0, py = b[1] + Math.sin(ang) * r0;
      if (o2) { ctx.fillStyle = C.teal; ctx.strokeStyle = lighten(C.teal, 0.35); ctx.lineWidth = 1; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 3.4, py, 3.6, 0, 6.283); ctx.fill(); ctx.stroke(); } }
      else { ctx.fillStyle = '#AEB6C2'; ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 6.4, py, 3, 0, 6.283); ctx.fill(); } } }
    ctx.restore(); }
  ctx.restore(); return anker;
}

function _longMicro(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, adem = 0.5, gas = 0, hi = null, schaal = 1 } = o;
  const k = 0.95 + 0.07 * adem, R = 228 * k;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { blaasje: W(0, -40), wand: W(-R * 0.7, -R * 0.7), haarvat: W(R + 12, 0), typeII: W(-R * 0.5, R * 0.86), macrofaag: W(R * 0.35, -R * 0.55), roodBloed: W(0, R + 14) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const VENS = 300, WEEFSEL = '#4E3D46', WAND = '#E3B2AA', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.45 : 1;
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, VENS, 0, 6.283); ctx.clip();
  // tussenschotten (weefsel) met buurblaasjes als lucht-gaten
  ctx.fillStyle = WEEFSEL; ctx.fillRect(-VENS, -VENS, 2 * VENS, 2 * VENS);
  const BA = [...Array(10)].map((_, i) => -2.9 + i * 0.6283); const buren = BA.map((an, i) => { const r = 106; const d = R + r + 20; return [Math.cos(an) * d, Math.sin(an) * d, r]; });
  for (let i = 0; i < 10; i++) { const an = BA[i] + 0.314; const d = R + 230; buren.push([Math.cos(an) * d, Math.sin(an) * d, 70]); } // tweede ring
  const lucht = (bx, by, r) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.strokeStyle = WAND; ctx.lineWidth = 1.2; ctx.stroke(); };
  for (const [bx, by, r] of buren) lucht(bx, by, r);
  lucht(0, 0, R);
  // haarvaten in doorsnede in de tussenschotten (± 18 eenheden) met een rode bloedcel
  const HV = [...Array(20)].map((_, i) => [-2.9 + i * 0.314 + (i % 2 ? 0 : 0.05), 1]).filter(([an]) => !(an > 1.1 && an < 2.1));
  ctx.save(); ctx.globalAlpha *= dimF('haarvat');
  for (let i = 0; i < HV.length; i++) { const [an, f] = HV[i]; const cx = Math.cos(an) * (R + 10), cy = Math.sin(an) * (R + 10);
    ctx.beginPath(); ctx.arc(cx, cy, 9.6, 0, 6.283); ctx.fillStyle = '#F0D6CF'; ctx.fill(); ctx.strokeStyle = hi === 'haarvat' ? C.goud : '#C98E86'; ctx.lineWidth = hi === 'haarvat' ? 3 : 1; ctx.stroke();
    const ox = gas > 0.01 ? clamp((Math.sin(t * 1.3 + i) * 0.5 + 0.5), 0, 1) : 0.6; ctx.beginPath(); ctx.ellipse(cx, cy, 8.4, 6.2, an + hash(i) * 2, 0, 6.283); ctx.fillStyle = ox > 0.5 ? RIJK : lighten(ARM, 0.05); ctx.fill(); }
  ctx.restore();
  // één haarvat in de lengte in het tussenschot onderaan: cellen één voor één, ze vervormen een beetje
  ctx.save(); ctx.globalAlpha *= dimF('haarvat'); const hr = R + 10, h0 = 1.15, h1 = 2.05;
  ctx.lineCap = 'round'; ctx.strokeStyle = hi === 'haarvat' ? C.goud : '#C98E86'; ctx.lineWidth = 20; ctx.beginPath(); ctx.arc(0, 0, hr, h0, h1); ctx.stroke(); ctx.strokeStyle = '#F0D6CF'; ctx.lineWidth = 18; ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = ((t * 0.12 + i / 6) % 1); const an = lerp(h0 + 0.03, h1 - 0.03, u); const col = u < 0.4 ? ARM : u > 0.6 ? RIJK : (u < 0.5 ? '#7E6B97' : '#A8566A');
    ctx.save(); ctx.translate(Math.cos(an) * hr, Math.sin(an) * hr); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 8.4 - 1.2 * Math.sin(u * 3.14), 7.6, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
  ctx.restore();
  // wand van het blaasje: platte type I-cellen met een plat kerntje
  ctx.save(); ctx.globalAlpha *= dimF('wand'); ctx.strokeStyle = hi === 'wand' ? C.goud : WAND; ctx.lineWidth = hi === 'wand' ? 3 : 1.2; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.stroke(); // wand ± 0,5 µm: haarlijn
  ctx.fillStyle = BIO.kernL; for (const an of [0.5, 1.4, 2.6, 3.3, 4.0, 4.7, 5.5]) { ctx.save(); ctx.translate(Math.cos(an) * (R + 1), Math.sin(an) * (R + 1)); ctx.rotate(an + 1.571); ctx.beginPath(); ctx.ellipse(0, 0, 9, 2.2, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.restore();
  // type II-cel (bol, met lamellenblaasjes)
  ctx.save(); ctx.globalAlpha *= dimF('typeII'); const a2 = 2.1; ctx.translate(Math.cos(a2) * (R - 2), Math.sin(a2) * (R - 2)); ctx.rotate(a2 + 1.571);
  ctx.beginPath(); ctx.ellipse(0, 6, 22, 18, 0, 0, 6.283); ctx.fillStyle = '#E8C9A8'; ctx.fill(); ctx.strokeStyle = hi === 'typeII' ? C.goud : lighten('#E8C9A8', 0.3); ctx.lineWidth = hi === 'typeII' ? 3 : 1.2; ctx.stroke();
  ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.arc(4, 10, 7, 0, 6.283); ctx.fill(); ctx.fillStyle = C.ves; for (const [px, py] of [[-12, 2], [-6, 14], [12, 0]]) { ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fill(); }
  ctx.restore();
  // stofcel (macrofaag) kruipt over de binnenkant
  ctx.save(); ctx.globalAlpha *= dimF('macrofaag'); const am = -1.0 + 0.05 * Math.sin(t * 0.5); ctx.translate(Math.cos(am) * (R - 22), Math.sin(am) * (R - 22)); ctx.rotate(am + 1.571);
  ctx.beginPath(); bioPad(ctx, [[-26, 6], [-30, -6], [-14, -12], [-4, -22], [10, -12], [28, -10], [30, 4], [14, 14], [-8, 16]], true); ctx.fillStyle = '#9FB0A2'; ctx.fill(); ctx.strokeStyle = hi === 'macrofaag' ? C.goud : '#C5D2C7'; ctx.lineWidth = hi === 'macrofaag' ? 3 : 1.2; ctx.stroke();
  ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.ellipse(0, 2, 8, 6, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#5A5048'; ctx.beginPath(); ctx.arc(-14, 4, 2.5, 0, 6.283); ctx.arc(14, 2, 2, 0, 6.283); ctx.fill();
  ctx.restore();
  // gassen: O2 van midden naar wand (naar een haarvat), CO2 van wand naar midden
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; for (let j = 0; j < 26; j++) { const hv = HV[j % HV.length][0] + (hash(j) - 0.5) * 0.25; const u = (t * 0.3 + hash(j * 3.3)) % 1; const o2 = j % 3 !== 0;
      const r0 = o2 ? lerp(R * 0.15, R - 6, u) : lerp(R - 6, R * 0.15, u); const px = Math.cos(hv) * r0, py = Math.sin(hv) * r0; const al = Math.min(1, u * 5, (1 - u) * 5); ctx.save(); ctx.globalAlpha *= al;
      if (o2) { ctx.fillStyle = C.teal; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 4.2, py, 4.4, 0, 6.283); ctx.fill(); } }
      else { ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 7.6, py, 3.6, 0, 6.283); ctx.fill(); } ctx.fillStyle = '#AEB6C2'; ctx.beginPath(); ctx.arc(px, py, 4.4, 0, 6.283); ctx.fill(); }
      ctx.restore(); } ctx.restore(); }
  ctx.restore();
  // rand van het micro-venster
  ctx.beginPath(); ctx.arc(0, 0, VENS, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  if (schaal > 0.01) { ctx.save(); ctx.globalAlpha *= schaal; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-200, 230); ctx.lineTo(-85, 230); ctx.stroke(); ctx.restore(); } // 50 µm = 115 eenheden
  ctx.restore(); return anker;
}
