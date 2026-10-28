// =====================================================================================
// LONGBLAASJES — trosje aan het eind van een bronchiool, met haarvatennet eroverheen.
// Recept: longblaasje ± 200 µm doorsnede; in een trosje (alveolaire zak) zitten veel blaasjes rond een gangetje.
// Haarvaten ± 8 µm breed: rode bloedcellen (7–8 µm) gaan er één voor één doorheen. Wand blaasje + haarvat
// samen ± 0,5 µm (te dun om te tekenen; vandaar: haarvaten liggen er plat óp). Het net krijgt zuurstofarm bloed
// (blauw) van een takje longslagader en geeft zuurstofrijk bloed (rood) af aan een takje longader.
// O2 gaat van de lucht in het blaasje naar het bloed, CO2 andersom (diffusie). Op schaal in dit ontwerp:
// blaasje Ø 140 eenheden = 200 µm → rode bloedcel ± 5 eenheden.
// Bron: LibreTexts Human Anatomy Lab 19.6 (Ø ± 200 µm, type I-cellen).
// Bekende fouten: blaasjes als losse ballonnen zonder gangetje; haarvaten dikker dan het blaasje; rode bloedcel
// even groot als een blaasje; O2 en CO2 dezelfde kant op.
// Ontwerp: hoogte ± 600, oorsprong = midden van het trosje. Aanpak A: trosje met net, bloedcellen stromen door.
// o: a, t, adem (0 uit … 1 in; blaasjes iets groter), gas (0..1 O2/CO2-deeltjes), net (1 = haarvaten), hi ('net','blaasje')
// =====================================================================================
function longblaasje(ctx, x, y, s = 1, o = {}) {
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
