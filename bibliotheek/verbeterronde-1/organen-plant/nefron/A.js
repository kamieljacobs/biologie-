// =====================================================================================
// NEFRON — één nierbuisje met bloedvaten, in schors en merg (lengtedoorsnede door de nier, schors boven).
// Recept: alle glomeruli liggen in de schors. Kapsel van Bowman (beker) om een kluwen haarvaten (glomerulus);
// aanvoerend vaatje (afferent) wijder dan afvoerend (efferent). Daarna: kronkelend eerste deel (proximaal, meeste
// terugresorptie: glucose, zouten, water), lis van Henle (dalend deel, scherpe bocht diep in het merg, stijgend
// deel), kronkelend tweede deel (distaal) dat terugkomt tégen de vaatjes van zijn eigen glomerulus, dan de
// verzamelbuis die recht naar beneden loopt en buisjes van meerdere nefronen opvangt. Haarvaten om de buisjes
// komen uit het efferente vaatje; langs de lis lopen lange haarvaten (vasa recta) mee.
// Filtratie: ± 10–20 % van het plasma gaat het kapsel in; bloedcellen en grote eiwitten niet.
// Bron: OpenStax A&P 25.4 (Oregon State-versie 25.2) en OpenStax Biology 41.2; vorm gecontroleerd met referentieplaat.
// Bekende fouten: glomerulus buiten het kapsel; lis in de schors; distale buis die niet terugkomt bij de glomerulus;
// verzamelbuis als deel van één nefron; bloedcellen in de voorurine.
// Ontwerp: hoogte ± 600 (y −300..300), schors y < −40, merg eronder; oorsprong = midden.
// Aanpak A: anatomisch (naar referentieplaat), buisje als dikke buis met lumen, deeltjes voor filtratie en terugresorptie.
// o: a, t, filtratie (0..1), terug (0..1 terugresorptie), stroom (0..1 voorurine stroomt), vaten (1), zones (1), hi ('glomerulus','proximaal','lis','distaal','verzamelbuis')
// =====================================================================================
function nefron(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, filtratie = 0, terug = 0, stroom = 0, vaten = 1, zones = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const GX = -175, GY = -222, GR = 44;
  const PROX = [[-150, -176], [-118, -186], [-100, -214], [-68, -214], [-56, -184], [-92, -164], [-112, -134], [-84, -110], [-46, -122], [-34, -92], [-58, -66], [-60, -40]];
  const LIS = [[-60, -40], [-60, 100], [-58, 230], [-40, 268], [-20, 262], [-6, 230], [-4, 100], [-2, -40]];
  const DIST = [[-2, -40], [14, -90], [-12, -128], [20, -162], [-14, -206], [-80, -252], [-140, -270], [-90, -290], [0, -286], [70, -250], [120, -205], [150, -188]];
  const VB = [[150, -300], [150, -170], [150, 50], [150, 300]];
  const anker = { glomerulus: W(GX, GY), kapsel: W(GX - GR - 8, GY + 10), proximaal: W(-90, -150), lis: W(-30, 255), distaal: W(20, -150), verzamelbuis: W(150, 120),
    aanvoer: W(-260, -250), afvoer: W(-110, -275), schors: W(220, -250), merg: W(220, 60) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const BUIS = '#E6D59C', BUISr = '#B8A66A', LUM = '#F6EDCC', ARM = BIO.ader, RIJK = BIO.bloed;
  const dimF = key => (hi && hi !== key) ? 0.35 : 1;
  // zones: schors en merg
  if (zones > 0.01) { ctx.save(); ctx.globalAlpha *= zones; ctx.fillStyle = rgba('#2E3D5C', 0.55); ctx.fillRect(-300, -300, 600, 260); ctx.fillStyle = rgba('#24304A', 0.55); ctx.fillRect(-300, -40, 600, 340);
    ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(-300, -40); ctx.lineTo(300, -40); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = rgba(C.line, 0.18); ctx.lineWidth = 1; for (let i = 0; i < 9; i++) { const xx = -280 + i * 70; ctx.beginPath(); ctx.moveTo(xx, -20); ctx.lineTo(xx + 10, 290); ctx.stroke(); } ctx.restore(); }
  const lijn = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const mix = (u) => { const A = [0xC2, 0x45, 0x3E], B = [0x5B, 0x7F, 0xB0]; u = clamp(u, 0, 1); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], u))).join(',')})`; };
  // ---------- bloedvaten (achter het buisje) ----------
  if (vaten > 0.01) { ctx.save(); ctx.globalAlpha *= vaten;
    // haarvaten om de buisjes (uit het efferente vaatje), van rood naar blauw
    for (let i = 0; i < 9; i++) { const pts = []; const y0 = -250 + i * 24; for (let k = 0; k <= 10; k++) { const xx = -150 + k * 30; pts.push([xx, y0 + Math.sin(k * 1.7 + i) * 16 + (hash(i * 11 + k) - 0.5) * 10]); }
      for (let k = 0; k < 10; k++) { ctx.strokeStyle = mix(k / 10); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(pts[k][0], pts[k][1]); ctx.lineTo(pts[k + 1][0], pts[k + 1][1]); ctx.stroke(); } }
    // vasa recta langs de lis
    lijn([[-90, -200], [-84, -40], [-82, 240], [-50, 290], [-10, 292], [18, 250], [20, -40], [40, -150], [240, -150]], 4, rgba(RIJK, 0.9));
    lijn([[-10, 292], [18, 250], [20, -40], [40, -150], [240, -150]], 4, rgba(ARM, 0.9));
    // aanvoerend (wijd) en afvoerend (smal) vaatje
    lijn([[-300, -280], [-240, -282], [-180, -270], [-150, -258]], 16, RIJK);
    lijn([[-140, -252], [-112, -246], [-96, -230], [-90, -200]], 9, RIJK);
    lijn([[240, -150], [300, -140]], 10, ARM);
    ctx.restore(); }
  // ---------- kapsel van Bowman met glomerulus ----------
  ctx.save(); ctx.globalAlpha *= dimF('glomerulus');
  ctx.beginPath(); ctx.arc(GX, GY, GR + 10, 0, 6.283); ctx.fillStyle = BUIS; ctx.fill(); ctx.strokeStyle = hi === 'glomerulus' ? C.goud : BUISr; ctx.lineWidth = hi === 'glomerulus' ? 4 : 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(GX, GY, GR + 2, 0, 6.283); ctx.fillStyle = LUM; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(GX, GY, GR - 4, 0, 6.283); ctx.clip(); // kluwen haarvaten
  for (let i = 0; i < 16; i++) { const an = hash(i * 2.3) * 6.283, rr = 8 + hash(i * 4.1) * 26; const cx = GX + Math.cos(an) * rr * 0.6, cy = GY + Math.sin(an) * rr * 0.6;
    ctx.strokeStyle = i % 3 ? RIJK : lighten(RIJK, 0.2); ctx.lineWidth = 5.5; ctx.beginPath(); ctx.arc(cx, cy, 9 + hash(i) * 8, an, an + 3.6 + hash(i * 7)); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(GX + 30, GY - 36, 13, 0, 6.283); ctx.fill(); // vaatpool (opening van de beker)
  ctx.restore();
  // ---------- het buisje ----------
  const buis = (pts, key, w = 20) => { ctx.save(); ctx.globalAlpha *= dimF(key); lijn(pts, w + 4, hi === key ? C.goud : BUISr); lijn(pts, w, BUIS); lijn(pts, w * 0.42, LUM); ctx.restore(); };
  buis([[GX + 22, GY + 40], ...PROX], 'proximaal', 20); buis(LIS, 'lis', 16); buis(DIST, 'distaal', 18); buis(VB, 'verzamelbuis', 26);
  ctx.save(); ctx.globalAlpha *= dimF('verzamelbuis'); buis([[150, -40], [190, -70], [240, -80]], 'verzamelbuis', 16); buis([[150, 100], [196, 76], [250, 70]], 'verzamelbuis', 16); ctx.restore(); // buisjes van andere nefronen
  // ---------- deeltjes ----------
  const pad = [[GX + 22, GY + 40], ...PROX, ...LIS.slice(1), ...DIST.slice(1), [150, -100], [150, 50], [150, 290]];
  const D = bioDicht(pad, 12); const L = D.length;
  const molecuul = (px, py, soort, al = 1) => { ctx.save(); ctx.globalAlpha *= al; if (soort === 0) { ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fill(); }
    else if (soort === 1) { ctx.fillStyle = C.oker; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * 1.047; ctx.lineTo(px + Math.cos(an) * 4.5, py + Math.sin(an) * 4.5); } ctx.closePath(); ctx.fill(); }
    else { ctx.fillStyle = '#B8BEC8'; ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.283); ctx.fill(); } ctx.restore(); };
  if (filtratie > 0.01) { ctx.save(); ctx.globalAlpha *= filtratie; for (let j = 0; j < 12; j++) { const u = (t * 0.5 + hash(j * 1.9)) % 1; const an = hash(j * 3.7) * 6.283; const r0 = lerp(GR * 0.5, GR + 2, u);
      molecuul(GX + Math.cos(an) * r0, GY + Math.sin(an) * r0, j % 4 === 0 ? 1 : j % 4 === 1 ? 2 : 0, Math.min(1, (1 - u) * 4)); } ctx.restore(); }
  const uProxEind = (PROX.length) / (pad.length - 1);
  if (stroom > 0.01) { ctx.save(); ctx.globalAlpha *= stroom; for (let j = 0; j < 40; j++) { const u = (t * 0.04 + j / 40) % 1; const soort = j % 3 === 0 ? 1 : j % 3 === 1 ? 2 : 0;
      if (soort === 1 && u > uProxEind) continue; if (soort === 0 && u > 0.8 && j % 2) continue; const p = D[Math.min(L - 1, Math.floor(u * (L - 1)))]; molecuul(p[0], p[1], soort); } ctx.restore(); }
  if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= terug; for (let j = 0; j < 14; j++) { const u0 = hash(j * 5.1) * 0.9; const P = bioPunt(PROX, u0); const nrm = P[2] + (j % 2 ? 1.571 : -1.571);
      const v = (t * 0.6 + hash(j)) % 1; const d = lerp(4, 30, v); molecuul(P[0] + Math.cos(nrm) * d, P[1] + Math.sin(nrm) * d, j % 2 ? 1 : 0, Math.min(1, (1 - v) * 3)); }
    for (let j = 0; j < 6; j++) { const P = bioPunt([[-60, 0], [-60, 220]], hash(j * 2.2)); const v = (t * 0.6 + hash(j + 3)) % 1; molecuul(P[0] - lerp(6, 26, v), P[1], 0, Math.min(1, (1 - v) * 3)); }
    ctx.restore(); }
  ctx.restore(); return anker;
}
