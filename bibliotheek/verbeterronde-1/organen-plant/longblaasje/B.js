// =====================================================================================
// LONGBLAASJE — één blaasje in doorsnede, ingezoomd (micro), op schaal.
// Recept: blaasje Ø ± 200 µm; wand van platte type I-cellen (± 25 nm dik, bedekken ± 97 % van het oppervlak),
// hier en daar een bolle type II-cel (maakt surfactant, blaasjes met lamellen) en een stofcel (macrofaag) die
// over de wand kruipt. In de tussenschotten tussen blaasjes lopen haarvaten van ± 8 µm met rode bloedcellen
// (Ø 7,5 µm, ± 2 µm dik) die er net in passen. Wand blaasje + haarvat samen ± 0,5 µm.
// O2 diffundeert van de lucht naar het bloed (rode bloedcel kleurt van blauwig naar rood), CO2 andersom.
// Schaal in dit ontwerp: 2,3 eenheden per µm (blaasje Ø 460, haarvat Ø 18, rode bloedcel Ø 17).
// Bron: LibreTexts Human Anatomy Lab 19.6 (Ø ± 200 µm, type I/II, macrofagen).
// Bekende fouten: dikke wand; haarvaten die midden in de lucht liggen; rode bloedcel veel kleiner dan het haarvat;
// blaasje als vierkant of zonder buren.
// Ontwerp: cirkelvormig micro-venster Ø 600, oorsprong = midden van het blaasje. Aanpak B: één blaasje op schaal
// met buren, haarvaten in doorsnede en één haarvat in de lengte waar cellen één voor één doorheen schuiven.
// o: a, t, adem (0..1), gas (0..1), hi ('wand','haarvat','typeII','macrofaag'), schaal (1 = schaalstreep 50 µm linksonder)
// =====================================================================================
function longblaasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, adem = 0.5, gas = 0, hi = null, schaal = 1 } = o;
  const k = 0.95 + 0.07 * adem, R = 228 * k;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { blaasje: W(0, -40), wand: W(-R * 0.7, -R * 0.7), haarvat: W(R + 12, 0), typeII: W(-R * 0.5, R * 0.86), macrofaag: W(R * 0.35, -R * 0.55), roodBloed: W(0, R + 14) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const VENS = 300, WEEFSEL = '#B9837E', WAND = '#E3B2AA', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.45 : 1;
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, VENS, 0, 6.283); ctx.clip();
  // tussenschotten (weefsel) met buurblaasjes als lucht-gaten
  ctx.fillStyle = WEEFSEL; ctx.fillRect(-VENS, -VENS, 2 * VENS, 2 * VENS);
  const BA = [-2.75, -1.85, -0.95, -0.05, 0.85, 2.55, 3.5]; const buren = BA.map((an, i) => { const r = 165 + 12 * hash(i); const d = R + r + 24 + 6 * hash(i + 9); return [Math.cos(an) * d, Math.sin(an) * d, r]; });
  const lucht = (bx, by, r) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.strokeStyle = WAND; ctx.lineWidth = 3; ctx.stroke(); };
  for (const [bx, by, r] of buren) lucht(bx, by, r);
  lucht(0, 0, R);
  // haarvaten in doorsnede in de tussenschotten (± 18 eenheden) met een rode bloedcel
  const HV = [-2.75, -2.3, -1.85, -1.4, -0.95, -0.5, -0.05, 0.4, 0.85, 2.55, 3.02, 3.5, 3.95].map(an => [an, 1]);
  ctx.save(); ctx.globalAlpha *= dimF('haarvat');
  for (let i = 0; i < HV.length; i++) { const [an, f] = HV[i]; const cx = Math.cos(an) * (R + 13), cy = Math.sin(an) * (R + 13);
    ctx.beginPath(); ctx.arc(cx, cy, 11, 0, 6.283); ctx.fillStyle = '#F0D6CF'; ctx.fill(); ctx.strokeStyle = hi === 'haarvat' ? C.goud : '#C98E86'; ctx.lineWidth = hi === 'haarvat' ? 3 : 1.4; ctx.stroke();
    const ox = gas > 0.01 ? clamp((Math.sin(t * 1.3 + i) * 0.5 + 0.5), 0, 1) : 0.6; ctx.beginPath(); ctx.ellipse(cx, cy, 8.4, 6.2, an + hash(i) * 2, 0, 6.283); ctx.fillStyle = ox > 0.5 ? RIJK : lighten(ARM, 0.05); ctx.fill(); }
  ctx.restore();
  // één haarvat in de lengte in het tussenschot onderaan: cellen één voor één, ze vervormen een beetje
  ctx.save(); ctx.globalAlpha *= dimF('haarvat'); const hr = R + 13, h0 = 1.15, h1 = 2.05;
  ctx.lineCap = 'round'; ctx.strokeStyle = hi === 'haarvat' ? C.goud : '#C98E86'; ctx.lineWidth = 25; ctx.beginPath(); ctx.arc(0, 0, hr, h0, h1); ctx.stroke(); ctx.strokeStyle = '#F0D6CF'; ctx.lineWidth = 22; ctx.stroke();
  for (let i = 0; i < 6; i++) { const u = ((t * 0.12 + i / 6) % 1); const an = lerp(h0 + 0.03, h1 - 0.03, u); const col = u < 0.4 ? ARM : u > 0.6 ? RIJK : (u < 0.5 ? '#7E6B97' : '#A8566A');
    ctx.save(); ctx.translate(Math.cos(an) * hr, Math.sin(an) * hr); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 8.4 - 1.2 * Math.sin(u * 3.14), 7.6, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
  ctx.restore();
  // wand van het blaasje: platte type I-cellen met een plat kerntje
  ctx.save(); ctx.globalAlpha *= dimF('wand'); ctx.strokeStyle = hi === 'wand' ? C.goud : WAND; ctx.lineWidth = hi === 'wand' ? 4 : 3; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.stroke();
  ctx.fillStyle = BIO.kernL; for (const an of [0.5, 1.4, 2.6, 3.3, 4.0, 4.7, 5.5]) { ctx.save(); ctx.translate(Math.cos(an) * (R + 1), Math.sin(an) * (R + 1)); ctx.rotate(an + 1.571); ctx.beginPath(); ctx.ellipse(0, 0, 10, 3, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
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
