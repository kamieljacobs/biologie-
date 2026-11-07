// =====================================================================================
// NEFRON — schema met de plaats in de nier (lengtedoorsnede, schors boven).
// Recept: glomerulus in het kapsel van Bowman (schors); aanvoerend vaatje wijder dan afvoerend; kronkelend eerste
// deel (proximaal: hier gaat het meeste terug: alle glucose, veel zout en water), lis van Henle diep in het merg,
// kronkelend tweede deel (distaal) dat terugkomt bij de vaatpool van zijn eigen glomerulus, verzamelbuis (vangt
// meerdere nefronen op; hier wordt onder invloed van ADH nog water teruggewonnen). De haarvaten rond het buisje
// komen uit het afvoerende vaatje en nemen terug wat het buisje teruggeeft.
// Bron: OpenStax A&P 25.4 (Oregon State-versie 25.2); OpenStax Biology 41.2.
// Bekende fouten: lis in de schors; terugresorptie naar 'buiten' in plaats van naar het bloed; geen plaats in de nier.
// Ontwerp: hoogte ± 600, oorsprong = midden. Aanpak C (ronde 2, uit B): rustig Schema met échte kronkels in het
// eerste en tweede deel en zijtakken (buisjes van andere nefronen) aan de verzamelbuis; één bloedvat dat het buisje volgt
// (geen zigzag-haarvaten); filtratie als deeltjes (water teal, glucose oker, ureum grijs) van de kluwen naar het kapsel,
// open pijlen voor terugresorptie (buisje → bloed) en water uit de verzamelbuis naar een meelopend vat (ADH);
// kleine nier (nierBijnier) met een gouden kader waar het nefron ligt.
// o: a, t, filtratie (0..1), terug (0..1), water (0..1 water uit verzamelbuis, ADH), nier (1 = plaats in de nier), hi
// =====================================================================================
function nefron(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, filtratie = 0, terug = 0, water = 0, nier = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const GX = -190, GY = -200, GR = 42;
  const PROX = [[GX + 26, GY + 32], [-132, -182], [-112, -210], [-80, -210], [-66, -182], [-98, -160], [-112, -128], [-80, -108], [-48, -122], [-34, -94], [-40, -60], [-40, -30]];
  const LIS = [[-40, -30], [-40, 240], [-10, 272], [20, 240], [20, -40]];
  const DIST = [[20, -40], [36, -78], [8, -110], [40, -142], [4, -178], [-60, -228], [-150, -252], [-100, -280], [-10, -284], [70, -252], [124, -206], [170, -186]];
  const VB = [[170, -290], [170, 290]]; const ZT = [[[170, -60], [206, -88], [252, -96]], [[170, 80], [212, 58], [252, 52]]];
  const anker = { glomerulus: W(GX, GY), proximaal: W(-95, -150), lis: W(-10, 260), distaal: W(30, -120), verzamelbuis: W(170, 150), haarvaten: W(-80, 60), nier: W(215, -215) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const BUIS = '#E6D59C', BUISr = '#B8A66A', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.35 : 1;
  // zones (rustig): schors/merg-grens als stippellijn
  ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 1.5; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-290, -30); ctx.lineTo(250, -30); ctx.stroke(); ctx.setLineDash([]);
  const lijn = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  // bloed: aanvoerend vaatje → glomerulus → afvoerend vaatje → haarvat langs het buisje (rood → blauw)
  const BLOED = [[-168, -244], [-235, -205], [-240, -120], [-160, -86], [-72, -70], [-70, -40], [-70, 280], [-10, 300], [50, 280], [50, -40], [80, -120], [110, -140], [250, -140]];
  const BD = bioDicht(BLOED, 14);
  for (let i = 0; i < BD.length - 1; i++) { const u = i / BD.length; const A = [0xC2, 0x45, 0x3E], B = [0x5B, 0x7F, 0xB0]; ctx.strokeStyle = `rgb(${A.map((v, j) => Math.round(lerp(v, B[j], clamp((u - 0.15) * 1.6, 0, 1)))).join(',')})`;
    ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(BD[i][0], BD[i][1]); ctx.lineTo(BD[i + 1][0], BD[i + 1][1]); ctx.stroke(); }
  lijn([[-290, -250], [-230, -244], [-200, -236]], 15, RIJK);
  // kapsel + glomerulus
  ctx.save(); ctx.globalAlpha *= dimF('glomerulus'); ctx.beginPath(); ctx.arc(GX, GY, GR + 9, 0, 6.283); ctx.fillStyle = BUIS; ctx.fill(); ctx.strokeStyle = hi === 'glomerulus' ? C.goud : BUISr; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(GX, GY, GR, 0, 6.283); ctx.fillStyle = '#F6EDCC'; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(GX, GY, GR - 4, 0, 6.283); ctx.clip(); for (let i = 0; i < 12; i++) { const an = hash(i * 2.3) * 6.283, rr = 6 + hash(i * 4.1) * 18; ctx.strokeStyle = i % 3 ? RIJK : lighten(RIJK, 0.2); ctx.lineWidth = 5.5; ctx.beginPath(); ctx.arc(GX + Math.cos(an) * rr, GY + Math.sin(an) * rr, 8 + hash(i) * 7, an, an + 3.6); ctx.stroke(); } ctx.restore();
  ctx.restore();
  // buisje
  for (const [key, P] of [['proximaal', PROX], ['lis', LIS], ['distaal', DIST]]) { ctx.save(); ctx.globalAlpha *= dimF(key); lijn(P, 22, hi === key ? C.goud : BUISr); lijn(P, 18, BUIS); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimF('verzamelbuis'); lijn(VB, 26, hi === 'verzamelbuis' ? C.goud : BUISr); lijn(VB, 22, BUIS); for (const Z of ZT) { lijn(Z, 18, BUISr); lijn(Z, 14, BUIS); } ctx.restore(); // zijtakken: buisjes van andere nefronen
  lijn([[226, -20], [228, 300]], 6, ARM); // vat langs de verzamelbuis (vasa recta)
  // open pijlen
  const pijl = (x1, y1, x2, y2, col, al) => { if (al <= 0.02) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2 - Math.cos(an - 0.5) * 11, y2 - Math.sin(an - 0.5) * 11); ctx.lineTo(x2, y2); ctx.lineTo(x2 - Math.cos(an + 0.5) * 11, y2 - Math.sin(an + 0.5) * 11); ctx.stroke(); ctx.restore(); };
  const puls = (k) => 0.55 + 0.45 * Math.sin(t * 3 + k);
  if (filtratie > 0.01) { ctx.save(); ctx.globalAlpha *= filtratie; for (let j = 0; j < 12; j++) { const u = (t * 0.5 + hash(j * 1.9)) % 1; const an = hash(j * 3.7) * 6.283; const r0 = lerp(GR * 0.45, GR + 1, u); const px = GX + Math.cos(an) * r0, py = GY + Math.sin(an) * r0;
    ctx.globalAlpha = a * filtratie * Math.min(1, (1 - u) * 4); if (j % 4 === 0) { ctx.fillStyle = C.oker; ctx.beginPath(); for (let k = 0; k < 6; k++) ctx.lineTo(px + Math.cos(k * 1.047) * 4.5, py + Math.sin(k * 1.047) * 4.5); ctx.closePath(); ctx.fill(); } else { ctx.fillStyle = j % 4 === 1 ? '#B8BEC8' : C.teal; ctx.beginPath(); ctx.arc(px, py, 3.4, 0, 6.283); ctx.fill(); } } ctx.restore(); }
  for (const [px, py, qx, qy, k] of [[-112, -120, -122, -92, 0], [-80, -100, -84, -78, 1], [-48, -10, -64, -10, 2], [-48, 80, -64, 80, 3]]) pijl(px, py, qx, qy, C.oker, terug * puls(k));
  for (const [py, k] of [[60, 0], [160, 1], [240, 2]]) pijl(184, py, 220, py, C.teal, water * puls(k));
  // plaats in de nier
  if (nier > 0.01) { ctx.save(); ctx.globalAlpha *= nier; nierBijnier(ctx, 215, -215, 0.42, { t }); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.strokeRect(215 - 0.42 * 66, -215 - 0.42 * 38, 18, 26); ctx.restore(); }
  ctx.restore(); return anker;
}
