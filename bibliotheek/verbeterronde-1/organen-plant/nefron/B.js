// =====================================================================================
// NEFRON — schema met de plaats in de nier (lengtedoorsnede, schors boven).
// Recept: glomerulus in het kapsel van Bowman (schors); aanvoerend vaatje wijder dan afvoerend; kronkelend eerste
// deel (proximaal: hier gaat het meeste terug: alle glucose, veel zout en water), lis van Henle diep in het merg,
// kronkelend tweede deel (distaal) dat terugkomt bij de vaatpool van zijn eigen glomerulus, verzamelbuis (vangt
// meerdere nefronen op; hier wordt onder invloed van ADH nog water teruggewonnen). De haarvaten rond het buisje
// komen uit het afvoerende vaatje en nemen terug wat het buisje teruggeeft.
// Bron: OpenStax A&P 25.4 (Oregon State-versie 25.2); OpenStax Biology 41.2.
// Bekende fouten: lis in de schors; terugresorptie naar 'buiten' in plaats van naar het bloed; geen plaats in de nier.
// Ontwerp: hoogte ± 600, oorsprong = midden. Aanpak B: rustig Schema: buisje als gelijkmatige buis, één bloedvat
// dat het buisje volgt, open pijlen voor filtratie (bloed → kapsel) en terugresorptie (buisje → bloed), en een
// kleine nier (nierBijnier) met een gouden kader waar het nefron ligt.
// o: a, t, filtratie (0..1), terug (0..1), water (0..1 water uit verzamelbuis, ADH), nier (1 = plaats in de nier), hi
// =====================================================================================
function nefron(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, filtratie = 0, terug = 0, water = 0, nier = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const GX = -190, GY = -200, GR = 42;
  const BUISPAD = [[-160, -168], [-120, -150], [-80, -170], [-50, -140], [-40, -90], [-40, 240], [-10, 272], [20, 240], [20, -60], [-10, -120], [-60, -210], [-110, -250], [-40, -268], [60, -250], [120, -200], [170, -170]];
  const VB = [[170, -290], [170, 290]];
  const anker = { glomerulus: W(GX, GY), proximaal: W(-90, -175), lis: W(-10, 260), distaal: W(-60, -230), verzamelbuis: W(170, 150), haarvaten: W(-80, 60), nier: W(215, -215) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const BUIS = '#E6D59C', BUISr = '#B8A66A', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.35 : 1;
  // zones (rustig): schors/merg-grens als stippellijn
  ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 1.5; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-290, -30); ctx.lineTo(250, -30); ctx.stroke(); ctx.setLineDash([]);
  const lijn = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  // bloed: aanvoerend vaatje → glomerulus → afvoerend vaatje → haarvat langs het buisje (rood → blauw)
  const BLOED = [[-168, -244], [-140, -205], [-100, -212], [-70, -196], [-74, -110], [-70, -40], [-70, 280], [-10, 300], [50, 280], [50, -40], [80, -120], [110, -140], [250, -140]];
  const BD = bioDicht(BLOED, 14);
  for (let i = 0; i < BD.length - 1; i++) { const u = i / BD.length; const A = [0xC2, 0x45, 0x3E], B = [0x5B, 0x7F, 0xB0]; ctx.strokeStyle = `rgb(${A.map((v, j) => Math.round(lerp(v, B[j], clamp((u - 0.15) * 1.6, 0, 1)))).join(',')})`;
    ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(BD[i][0], BD[i][1]); ctx.lineTo(BD[i + 1][0], BD[i + 1][1]); ctx.stroke(); }
  lijn([[-290, -250], [-230, -244], [-200, -236]], 15, RIJK);
  // kapsel + glomerulus
  ctx.save(); ctx.globalAlpha *= dimF('glomerulus'); ctx.beginPath(); ctx.arc(GX, GY, GR + 9, 0, 6.283); ctx.fillStyle = BUIS; ctx.fill(); ctx.strokeStyle = hi === 'glomerulus' ? C.goud : BUISr; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(GX, GY, GR, 0, 6.283); ctx.fillStyle = '#F6EDCC'; ctx.fill();
  ctx.strokeStyle = RIJK; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(GX, GY, 26, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.arc(GX - 8, GY + 6, 13, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.arc(GX + 10, GY - 6, 12, 0, 6.283); ctx.stroke();
  ctx.restore();
  // buisje
  const segs = [['proximaal', 0, 5], ['lis', 4, 9], ['distaal', 8, 16]];
  for (const [key, i0, i1] of segs) { ctx.save(); ctx.globalAlpha *= dimF(key); const P = BUISPAD.slice(i0, i1); if (key === 'proximaal') P.unshift([GX + 30, GY + 28]); lijn(P, 22, hi === key ? C.goud : BUISr); lijn(P, 18, BUIS); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimF('verzamelbuis'); lijn(VB, 26, hi === 'verzamelbuis' ? C.goud : BUISr); lijn(VB, 22, BUIS); ctx.restore();
  // open pijlen
  const pijl = (x1, y1, x2, y2, col, al) => { if (al <= 0.02) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2 - Math.cos(an - 0.5) * 11, y2 - Math.sin(an - 0.5) * 11); ctx.lineTo(x2, y2); ctx.lineTo(x2 - Math.cos(an + 0.5) * 11, y2 - Math.sin(an + 0.5) * 11); ctx.stroke(); ctx.restore(); };
  const puls = (k) => 0.55 + 0.45 * Math.sin(t * 3 + k);
  pijl(GX - 6, GY - 4, GX - 6, GY + 30, C.text, filtratie * puls(0)); pijl(GX + 14, GY - 12, GX + 30, GY + 18, C.text, filtratie * puls(1));
  for (const [px, py, qx, qy, k] of [[-120, -156, -122, -196, 0], [-84, -168, -86, -198, 1], [-48, -60, -64, -60, 2], [-48, 40, -64, 40, 3]]) pijl(px, py, qx, qy, C.oker, terug * puls(k));
  for (const [py, k] of [[60, 0], [160, 1], [240, 2]]) pijl(176, py, 214, py, C.teal, water * puls(k));
  // plaats in de nier
  if (nier > 0.01) { ctx.save(); ctx.globalAlpha *= nier; nierBijnier(ctx, 215, -215, 0.42, { t }); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.strokeRect(215 - 0.42 * 66, -215 - 0.42 * 38, 18, 26); ctx.restore(); }
  ctx.restore(); return anker;
}
