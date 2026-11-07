// Evolutie v2 · film 3 Vormen van selectie — nieuwe tekeningen (22 okt 2026). Laadt na teken_evo2.js (gebruikt lijn/vul/_bd).

// ===================================================================================
// BERKENSPANNER (Biston betularia) in rusthouding op schors, bovenaanzicht. Recept: spanwijdte 45–62 mm; vleugels plat uitgespreid,
// voorvleugels driehoekig en bedekken de achtervleugels grotendeels; lijf behaard, ± 1/3 van de spanwijdte; man met geveerde antennes.
// typica = wit met fijne zwarte spikkels en twee getande dwarslijnen; carbonaria = egaal zwart. Eenheid 1 = 0,1 mm (spanwijdte ± 520).
// Bekende fout: vlinder-'strikje' met ronde vleugels; antennes los van de kop.
function berkenspanner(ctx, x, y, s = 1, o = {}) { const { vorm = 'licht', a = 1, rot = 0, seed = 2 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  const zwart = vorm === 'zwart'; const grond = zwart ? '#26252A' : '#E4E0D4', spik = zwart ? '#3A3940' : '#2A2A2E', rand = zwart ? '#4A4950' : '#B8B4A8';
  // achtervleugels (deels onder de voorvleugels)
  for (const k of [-1, 1]) { const AV = [[k * 10, 20], [k * 110, 40], [k * 170, 66], [k * 140, 96], [k * 60, 96], [k * 12, 60]]; vul(ctx, AV, _dk(grond, 0.06), rand, 1.5);
    binnen(ctx, AV, () => { if (!zwart) { ctx.fillStyle = spik; for (let i = 0; i < 40; i++) { const px = k * (20 + hash(seed + i * 3.3) * 170), py = 20 + hash(seed + i * 5.1) * 100; ctx.beginPath(); ctx.arc(px, py, 1.4 + hash(i) * 1.6, 0, 6.283); ctx.fill(); } } }); }
  // voorvleugels
  for (const k of [-1, 1]) { const VV = [[k * 8, -40], [k * 90, -70], [k * 200, -96], [k * 262, -84], [k * 250, -40], [k * 210, 30], [k * 140, 72], [k * 50, 70], [k * 10, 20]];
    vul(ctx, VV, grond, rand, 1.5);
    binnen(ctx, VV, () => { if (!zwart) { ctx.fillStyle = spik; for (let i = 0; i < 120; i++) { const px = k * (20 + hash(seed + i * 1.7) * 240), py = -90 + hash(seed + i * 2.9) * 150; ctx.beginPath(); ctx.arc(px, py, 1.2 + hash(i * 3) * 2.2, 0, 6.283); ctx.fill(); }
        ctx.strokeStyle = '#3A3A3E'; ctx.lineWidth = 3; for (const [d, b] of [[-30, 0.5], [30, 0.6]]) { ctx.beginPath(); for (let i = 0; i <= 10; i++) { const u = i / 10; const px = k * (30 + u * 210), py = d - 40 + u * 30 * b + (i % 2 ? 7 : -5); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } }
      else { ctx.strokeStyle = '#3C3B42'; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(k * 20, -30 + i * 12); ctx.lineTo(k * (200 - i * 20), -84 + i * 18); ctx.stroke(); } } }); }
  // lijf: behaard, borststuk en achterlijf in één vorm
  vul(ctx, [[0, -78], [16, -60], [18, -10], [12, 60], [0, 110], [-12, 60], [-18, -10], [-16, -60]], zwart ? '#1E1D22' : '#CFC9BA', zwart ? '#3A3940' : '#9A9488', 1.5);
  ctx.strokeStyle = zwart ? '#38373E' : '#9A9488'; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-12, 20 + i * 14); ctx.lineTo(12, 20 + i * 14); ctx.stroke(); }
  // kop met ogen en geveerde antennes (beginnen óp de kop)
  ctx.beginPath(); ctx.ellipse(0, -82, 15, 12, 0, 0, 6.283); ctx.fillStyle = zwart ? '#1E1D22' : '#BDB6A6'; ctx.fill();
  circ(ctx, -11, -86, 4, '#121214'); circ(ctx, 11, -86, 4, '#121214');
  for (const k of [-1, 1]) { const A = [[k * 6, -92], [k * 34, -130], [k * 70, -150]]; lijn(ctx, A, zwart ? '#45444C' : '#7A7468', 3);
    ctx.strokeStyle = zwart ? '#45444C' : '#8A8478'; ctx.lineWidth = 1.2; for (let i = 1; i < 9; i++) { const u = i / 9; const px = lerp(k * 10, k * 68, u), py = lerp(-98, -148, u); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - k * 8, py - 8); ctx.moveTo(px, py); ctx.lineTo(px + k * 6, py + 7); ctx.stroke(); } }
  ctx.restore(); }

// SCHORS van een stam, rechtop (Macro, close-up). o.roet 0..1: 0 = lichte schors met korstmossen (grijsgroen), 1 = zwart van het roet.
function schors(ctx, x, y, w, h, o = {}) { const { roet = 0, a = 1, seed = 4 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); ctx.fillStyle = roet > 0.5 ? '#2E2C2A' : '#A6A496'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  // korstmos-vlekken (alleen op schone schors)
  if (roet < 0.5) for (let i = 0; i < 90; i++) { const px = x + hash(seed + i * 1.9) * w, py = y + hash(seed + i * 3.7) * h, r = 12 + hash(i * 5.3) * 40; ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.6, hash(i) * 3, 0, 6.283); ctx.fillStyle = i % 3 ? 'rgba(200,208,178,0.45)' : 'rgba(120,126,110,0.4)'; ctx.fill(); }
  // groeven in de schors
  ctx.strokeStyle = roet < 0.5 ? 'rgba(70,68,60,0.5)' : 'rgba(10,10,10,0.6)'; ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) { const px = x + (i + 0.5) / 14 * w + (hash(i * 2.2) - 0.5) * 30; ctx.beginPath(); ctx.moveTo(px, y); for (let k = 1; k <= 8; k++) ctx.lineTo(px + (hash(i * 9 + k) - 0.5) * 24, y + k / 8 * h); ctx.stroke(); }
  if (roet >= 0.5) for (let i = 0; i < 60; i++) { const px = x + hash(seed + i * 2.3) * w, py = y + hash(seed + i * 4.1) * h; ctx.beginPath(); ctx.ellipse(px, py, 20, 10, hash(i) * 3, 0, 6.283); ctx.fillStyle = 'rgba(18,18,18,0.35)'; ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ===================================================================================
// PAUW (Pavo cristatus, man). Recept: lijf snavel–staart 100–120 cm; sleep (verlengde bovenstaartdekveren) tot ± 1,5 m, totaal tot 2,3 m;
// hals en borst metaalblauw, kuif van waaiervormige veertjes, witte vlekken boven en onder het oog, vleugels bruin gebandeerd, slagpennen roestbruin;
// sleep groen-brons met oogvlekken (blauw–groen–brons ringen). Rust: sleep sleept schuin omlaag over de grond (C9-les liervogel).
// o.waaier 0..1 = sleep opgezet als waaier. Eenheid 1 = 1 cm × 2 (kop–staart lijf ± 220 eenheden).
function pauw(ctx, x, y, s = 1, o = {}) { const { waaier = 0, a = 1, kijk = 1, staartLengte = 1, vlekken = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const blauw = '#2E5FA8', blauwL = '#4A82C8', groen = '#3E7A4E', brons = '#8A7A3A', bruin = '#8C6A48';
  const oogvlek = (px, py, r, ang = 0) => { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0, 0, r * 1.25, r, 0, 0, 6.283); ctx.fillStyle = '#B89A3A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.95, r * 0.75, 0, 0, 6.283); ctx.fillStyle = '#3E8A6A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(r * 0.1, 0, r * 0.62, r * 0.5, 0, 0, 6.283); ctx.fillStyle = '#2A5A9A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(r * 0.15, 0, r * 0.32, r * 0.28, 0, 0, 6.283); ctx.fillStyle = '#152238'; ctx.fill(); ctx.restore(); };
  if (waaier < 0.5) {
    // sleep in rust: lange bundel schuin naar achteren-omlaag tot op de grond
    const L = 300 * staartLengte; const S = [[-60, -150], [-60 - L * 0.5, -90], [-60 - L, -8], [-60 - L - 10, 4], [-60 - L * 0.95, 14], [-60 - L * 0.4, -60], [-40, -110]];
    vul(ctx, S, _dk(groen, 0.2), brons, 2);
    binnen(ctx, S, () => { ctx.strokeStyle = rgba('#B8A04A', 0.45); ctx.lineWidth = 1.5; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-50, -140 + i * 3); ctx.quadraticCurveTo(-60 - L * 0.5, -90 + i * 4, -60 - L, -8 + i * 1.2); ctx.stroke(); }
      for (let i = 0; i < 9; i++) { const u = 0.25 + i * 0.085; const px = -60 - L * u, py = -150 + (142 + 6) * Math.pow(u, 1.15) + ((i % 2) ? 8 : -4); oogvlek(px, py, 9, 0.5); } });
  } else {
    // waaier: halve cirkel achter het lijf, veren als spaken met oogvlekken in ringen
    const cx = -20, cy = -170, R = 300 * staartLengte;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, Math.PI * 1.02, Math.PI * 1.98 + 0.02); ctx.closePath(); ctx.fillStyle = _dk(groen, 0.25); ctx.fill(); ctx.strokeStyle = brons; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = rgba('#B8A04A', 0.5); ctx.lineWidth = 1.5; for (let i = 0; i <= 40; i++) { const an = Math.PI * (1.03 + 0.94 * i / 40); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); ctx.stroke(); }
    for (const [rr, n] of [[0.92, 26], [0.74, 21], [0.56, 16], [0.4, 11]]) for (let i = 0; i < n; i++) { if (hash(i * 13 + rr * 100) > vlekken) continue; const an = Math.PI * (1.06 + 0.88 * (i + 0.5) / n); oogvlek(cx + Math.cos(an) * R * rr, cy + Math.sin(an) * R * rr, 11 * rr + 3, an + Math.PI / 2); }
  }
  // poten: lang, grijsbruin, met spoor
  for (const [px, ver] of [[-10, true], [14, false]]) { const col = ver ? '#7A6A5A' : '#9A8A78'; lijn(ctx, [[px - 4, -96], [px - 8, -50], [px, 0]], col, 7); lijn(ctx, [[px, -2], [px + 30, 0]], col, 4); lijn(ctx, [[px, -2], [px + 22, 6]], col, 4); lijn(ctx, [[px, -2], [px - 18, 0]], col, 4); lijn(ctx, [[px - 6, -28], [px - 16, -32]], col, 3); }
  // lijf
  const LIJF = [[60, -150], [40, -182], [0, -190], [-50, -176], [-76, -146], [-60, -112], [-20, -98], [30, -104], [56, -124]];
  vul(ctx, LIJF, blauw, blauwL, 2);
  // vleugel: gebandeerd bruin, slagpennen roestbruin
  const V = [[30, -176], [-10, -184], [-60, -168], [-84, -136], [-56, -120], [-10, -130], [24, -150]];
  vul(ctx, V, '#B8A88A', '#D8CCB0', 1.5);
  binnen(ctx, V, () => { ctx.strokeStyle = '#3A3026'; ctx.lineWidth = 2.5; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(30 - i * 12, -184); ctx.lineTo(10 - i * 12, -120); ctx.stroke(); } vul(ctx, [[-50, -160], [-90, -136], [-60, -118], [-30, -126]], '#A0582E'); });
  // hals (lang, blauw) en kop
  vul(ctx, [[40, -172], [56, -230], [70, -268], [86, -276], [92, -262], [82, -230], [72, -180], [60, -150]], blauw, blauwL, 2);
  vul(ctx, [[72, -284], [92, -286], [100, -272], [94, -262], [78, -260], [70, -270]], blauw, blauwL, 1.5);
  // kuif: stelen met waaiertjes
  for (let i = 0; i < 6; i++) { const bx = 78 + i * 2, by = -284, tx = 66 + i * 6, ty = -318 - (i % 2) * 4; lijn(ctx, [[bx, by], [tx, ty]], '#5A6A8A', 1.5); ctx.beginPath(); ctx.ellipse(tx, ty, 3.4, 4.4, -0.3, 0, 6.283); ctx.fillStyle = blauwL; ctx.fill(); }
  // gezicht: witte strepen boven en onder het oog
  lijn(ctx, [[78, -278], [92, -277]], '#EDEDE6', 2.5); lijn(ctx, [[80, -267], [92, -268]], '#EDEDE6', 2.5);
  dierOog(ctx, 89, -272, 3.2, '#2A1A10');
  vul(ctx, [[98, -276], [112, -270], [98, -266]], '#8A8070', '#B0A898', 1);
  ctx.restore(); }

// PAUWIN (vrouw): ± 95 cm, geen sleep; bruingrijs, metaalgroene onderhals, witte buik en gezicht, kuif. Zelfde eenheid als pauw.
function pauwin(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const bruin = '#8A7660', bruinL = '#B0A088', groen = '#4E7A5A';
  for (const [px, ver] of [[-8, true], [14, false]]) { const col = ver ? '#7A6A5A' : '#9A8A78'; lijn(ctx, [[px - 4, -86], [px - 8, -44], [px, 0]], col, 6); lijn(ctx, [[px, -2], [px + 26, 0]], col, 3.5); lijn(ctx, [[px, -2], [px + 18, 6]], col, 3.5); lijn(ctx, [[px, -2], [px - 16, 0]], col, 3.5); }
  vul(ctx, [[-56, -150], [-120, -112], [-128, -100], [-110, -96], [-50, -116]], _dk(bruin, 0.15), bruinL, 1.5);
  const L = [[54, -136], [36, -166], [-4, -172], [-46, -158], [-66, -130], [-52, -100], [-14, -88], [30, -94], [52, -112]];
  vul(ctx, L, bruin, bruinL, 2); binnen(ctx, L, () => { vul(ctx, [[60, -120], [10, -110], [-40, -100], [-30, -60], [60, -70]], '#E6E0D2'); ctx.strokeStyle = rgba('#4A3C2C', 0.5); ctx.lineWidth = 1.5; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(10 - i * 9, -160); ctx.lineTo(-4 - i * 9, -120); ctx.stroke(); } });
  vul(ctx, [[36, -156], [50, -210], [64, -244], [80, -250], [86, -238], [76, -206], [64, -160], [52, -136]], bruin, bruinL, 2);
  vul(ctx, [[42, -166], [54, -200], [70, -204], [62, -160]], groen);
  vul(ctx, [[66, -258], [86, -260], [94, -246], [88, -236], [72, -236], [64, -246]], bruin, bruinL, 1.5);
  vul(ctx, [[72, -250], [90, -250], [90, -240], [74, -240]], '#E6E0D2');
  for (let i = 0; i < 5; i++) { const tx = 62 + i * 6, ty = -288 - (i % 2) * 4; lijn(ctx, [[74 + i * 2, -258], [tx, ty]], '#6A5A48', 1.4); ctx.beginPath(); ctx.ellipse(tx, ty, 3, 4, -0.3, 0, 6.283); ctx.fillStyle = '#7A8A6A'; ctx.fill(); }
  dierOog(ctx, 83, -248, 3, '#2A1A10');
  vul(ctx, [[92, -250], [104, -245], [92, -240]], '#8A8070', '#B0A898', 1);
  ctx.restore(); }

// ===================================================================================
// EDELHERT (Cervus elaphus), bok in de bronst. Recept: schofthoogte ± 1,2 m, lijf ± 2 m; gewei met 10–14 enden (oogspruit, ijsspruit,
// middenspruit, kroon); manen aan de hals in de bronst; lichte spiegel rond de korte staart; benen met hoge knie (tegen de buik) en
// hak halverwege (C9). o.kop: 0 = rechtop, 1 = laag (gewei naar voren, vechten). Eenheid 1 = 0,5 cm (schoft ± 240 boven de grond).
function edelhert(ctx, x, y, s = 1, o = {}) { const { kop = 0, a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#8C5A3A', vachtL = '#B07A52', donker = '#5A3A26', manen = '#5E4030', hoef = '#2A2018';
  // achterbeen: dij (in het lijf) → hak (schuin naar achter, ± 40 % hoogte) → hoef; voorbeen: elleboog → pols (knie bij paarden) → hoef
  const achter = (dx, col) => { vul(ctx, [[-190 + dx, -250], [-120 + dx, -240], [-128 + dx, -170], [-150 + dx, -110], [-160 + dx, -92], [-176 + dx, -100], [-176 + dx, -140], [-196 + dx, -200]], col);
    lijn(ctx, [[-168 + dx, -100], [-160 + dx, -40], [-154 + dx, -6]], col, 12); vul(ctx, [[-166 + dx, -12], [-146 + dx, -12], [-142 + dx, 0], [-168 + dx, 0]], hoef); };
  const voor = (dx, col) => { vul(ctx, [[70 + dx, -240], [120 + dx, -236], [118 + dx, -176], [104 + dx, -150], [84 + dx, -150], [76 + dx, -190]], col);
    lijn(ctx, [[96 + dx, -156], [100 + dx, -86], [98 + dx, -60], [104 + dx, -6]], col, 13); vul(ctx, [[92 + dx, -12], [114 + dx, -12], [118 + dx, 0], [92 + dx, 0]], hoef); };
  achter(28, _dk(vacht, 0.22)); voor(-30, _dk(vacht, 0.22));
  const L = [[130, -282], [70, -302], [-40, -296], [-150, -300], [-200, -274], [-208, -230], [-186, -192], [-120, -170], [-20, -164], [80, -170], [128, -206]];
  vul(ctx, L, vacht, vachtL, 2);
  binnen(ctx, L, () => { vul(ctx, [[-220, -286], [-180, -292], [-170, -236], [-186, -186], [-230, -200]], '#D8C4A0'); vul(ctx, [[-130, -186], [0, -180], [100, -186], [100, -150], [-130, -150]], _lt(vacht, 0.08)); });
  vul(ctx, [[-202, -274], [-216, -258], [-208, -246], [-198, -260]], donker);
  achter(0, vacht); voor(0, vacht);
  // hals (kort, dik, met manen) + kop
  ctx.save(); ctx.translate(112, -262); ctx.rotate(kop * 0.95);
  const N = [[-36, 0], [-6, -56], [30, -96], [62, -100], [74, -76], [62, -36], [52, 20], [10, 36]];
  vul(ctx, N, manen, '#7A5A44', 2);
  binnen(ctx, N, () => { ctx.strokeStyle = rgba('#2A1A10', 0.4); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-14 + i * 7, 26 - i * 12); ctx.lineTo(-24 + i * 7, 40 - i * 12); ctx.stroke(); } });
  ctx.save(); ctx.translate(56, -96);
  const K = [[-22, -14], [8, -26], [44, -12], [84, 14], [96, 30], [86, 42], [44, 36], [2, 28], [-22, 12]];
  vul(ctx, K, vacht, vachtL, 2); vul(ctx, [[82, 26], [98, 30], [94, 42], [82, 40]], hoef);
  dierOog(ctx, 26, 0, 6, '#2A1A10', { pupil: 'liggend' }); vul(ctx, [[36, 6], [50, 14], [38, 14]], '#3A2618');
  vul(ctx, [[-8, -14], [-44, -44], [-38, -22], [-14, 4]], vacht, vachtL, 1.5);
  const stang = (dx, col, lw) => { const B = [[0 + dx, -20], [-16 + dx, -74], [-34 + dx, -134], [-30 + dx, -190]]; lijn(ctx, B, col, lw);
    for (const [p0, e] of [[[dx - 4, -36], [34 + dx, -50]], [[dx - 10, -60], [30 + dx, -84]], [[dx - 26, -112], [26 + dx, -136]], [[dx - 30, -186], [6 + dx, -222]], [[dx - 30, -186], [-56 + dx, -220]], [[dx - 30, -186], [-24 + dx, -232]]]) lijn(ctx, [p0, e], col, lw * 0.62); };
  stang(-10, '#8A7A60', 7); stang(4, '#C8B898', 8);
  ctx.restore(); ctx.restore();
  ctx.restore(); }

// ===================================================================================
// ZWARTBUIKZAADKRAKER (Pyrenestes ostrinus). Recept: ± 15 cm (iets groter dan een grondvink); man: kop, borst en staart rood, buik en rug zwart;
// dikke kegelsnavel, staalblauw-zwart. Twee snavelvormen: klein (zachte zegge-zaden) en groot (harde zaden); verschil in snavelbreedte
// vergelijkbaar met het verschil tussen twee vinkensoorten. o.snavel: 'klein' | 'groot'. Zelfde eenheid als grondvink (1 = 0,5 mm).
function zaadkraker(ctx, x, y, s = 1, o = {}) { const { snavel = 'klein', a = 1, kijk = 1, snavelKleur = null } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const rood = '#B8323A', roodL = '#D85A5E', zw = '#24222A', zwL = '#4A4852';
  for (const [px, ver] of [[-6, true], [10, false]]) { const col = ver ? '#5A4E48' : '#7A6A62'; lijn(ctx, [[px - 2, -48], [px, 0]], col, 5); lijn(ctx, [[px, -1], [px + 22, 0]], col, 3.5); lijn(ctx, [[px, -1], [px + 16, 4]], col, 3.5); lijn(ctx, [[px, -1], [px - 14, 0]], col, 3.5); }
  vul(ctx, [[-76, -76], [-150, -48], [-154, -36], [-140, -34], [-70, -54]], rood, roodL, 1.5);
  const L = [[40, -70], [32, -108], [8, -124], [-34, -120], [-70, -96], [-84, -72], [-72, -52], [-38, -40], [2, -38], [30, -48]];
  vul(ctx, L, zw, zwL, 2);
  binnen(ctx, L, () => { vul(ctx, [[50, -120], [10, -110], [-10, -80], [10, -60], [60, -60]], rood); });
  vul(ctx, [[16, -106], [-14, -116], [-52, -106], [-90, -80], [-102, -66], [-64, -70], [-22, -78], [12, -86]], _dk(zw, 0.1), zwL, 1.5);
  ctx.save(); ctx.translate(30, -112);
  vul(ctx, [[-18, 6], [-16, -14], [-2, -28], [18, -28], [32, -16], [36, 2], [26, 16], [6, 20], [-12, 16]], rood, roodL, 2);
  const hS = snavel === 'groot' ? 31 : snavel === 'midden' ? 26 : 21, lS = hS * 1.15, bx = 28, by = -2; const sk = snavelKleur || '#3A4458', skL = snavelKleur ? _lt(snavelKleur, 0.35) : '#7A88A4';
  ctx.beginPath(); ctx.moveTo(bx - 4, by - hS * 0.55); ctx.quadraticCurveTo(bx + lS * 0.6, by - hS * 0.6, bx + lS, by + hS * 0.1); ctx.quadraticCurveTo(bx + lS * 0.5, by + hS * 0.45, bx - 2, by + hS * 0.48); ctx.closePath(); ctx.fillStyle = sk; ctx.fill(); ctx.strokeStyle = skL; ctx.lineWidth = 1.5; ctx.stroke();
  lijn(ctx, [[bx - 2, by + hS * 0.06], [bx + lS - 1, by + hS * 0.1]], _dk('#3A4458', 0.3), 1.6);
  dierOog(ctx, 12, -8, 4.4, '#2A1A10', { rand: '#7A88A4' });
  ctx.restore(); ctx.restore(); }

// ===================================================================================
// DARWINS ORCHIDEE (Angraecum sesquipedale). Recept: bloem stervormig, wasachtig wit-crème, Ø 13–18 cm, zes spitse bloemdekbladen + bredere lip;
// spoor (honingbuis) groenig-wit, 20–35 cm lang, hangt omlaag vanaf de achterkant van de lip; nectar alleen in de onderste paar cm.
// Bladeren dik, riemvormig, tweerijig. (x, y) = midden van de bloem; s: 1 eenheid = 1 mm. o.spoor = lengte in mm.
function orchidee(ctx, x, y, s = 1, o = {}) { const { a = 1, spoor = 300, nectar = true, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  const wit = '#EDE8D6', witL = '#FFFFFF', rand = '#C8C0A4';
  // spoor: dunne, licht gebogen buis naar beneden
  const S = [[6, 10], [16, 80], [10, 160], [-6, 240], [-10, spoor]]; lijn(ctx, S, '#C8D4A8', 7); lijn(ctx, S, '#E2E8C8', 3.5);
  if (nectar) { const n = S[S.length - 1]; circ(ctx, n[0], n[1] - 12, 5, rgba(C.goud, 0.9)); }
  // bloemdekbladen
  const blad = (ang, len, br) => { ctx.save(); ctx.rotate(ang); vul(ctx, [[0, -br * 0.4], [len * 0.4, -br], [len, 0], [len * 0.4, br], [0, br * 0.4]], wit, rand, 1.5); lijn(ctx, [[6, 0], [len * 0.9, 0]], rgba('#B8B090', 0.6), 1.2); ctx.restore(); };
  for (const [ang, len] of [[-1.57, 80], [-0.5, 78], [-2.64, 78], [0.25, 74], [-3.39, 74]]) blad(ang, len, 16);
  // lip: breder, naar beneden-voren, met spitse punt
  vul(ctx, [[-24, 4], [-30, 40], [-12, 80], [0, 96], [12, 80], [30, 40], [24, 4]], witL, rand, 1.5);
  lijn(ctx, [[0, 10], [0, 84]], rgba('#B8B090', 0.6), 1.2);
  circ(ctx, 0, 0, 10, '#E8E2C8', rand, 1.5); circ(ctx, 0, 6, 4, '#3A3A2E');
  ctx.restore(); }
function orchideeBladeren(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  lijn(ctx, [[0, 0], [0, -260]], '#4E6A3E', 14);
  for (let i = 0; i < 6; i++) { const yy = -30 - i * 40, k = i % 2 ? 1 : -1; vul(ctx, [[0, yy], [k * 80, yy - 30], [k * 170, yy - 20], [k * 190, yy - 8], [k * 160, yy + 6], [k * 70, yy + 10]], '#4E7A44', '#6E9A5E', 1.5); }
  ctx.restore(); }

// PIJLSTAARTVLINDER van Wallace (Xanthopan praedicta). Recept: spanwijdte 13–15 cm; smalle, spitse voorvleugels, grijsbruin met donkere
// lengtestrepen; dik, spoelvormig lijf met roze-gele zijbanden; roltong in rust opgerold onder de kop, uitgestoken tot ± 28 cm.
// Zijaanzicht van opzij, in de vlucht (stilhangen). o.tong 0..1 = uitgerold. Eenheid 1 = 0,5 mm (lijf ± 55 mm = 110 eenheden).
function pijlstaart(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, tong = 1, tongLengte = 280, vleugel = 0.3, tongEind = null } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const grijs = '#7A7064', grijsL = '#A8A090', donker = '#4A443C';
  // vleugels: lange, smalle, spitse voorvleugel schuin omhoog-achter (stilhangen, bovenste stand); kleine achtervleugel geel met zwarte rand
  const vl = (ver) => { ctx.save(); ctx.translate(ver ? 8 : 2, -12); ctx.rotate(0.35 + vleugel + (ver ? -0.3 : 0));
    if (ver) { const A = [[0, 0], [-30, -16], [-48, -10], [-30, 4]]; vul(ctx, A, '#B08A3A', '#2A2620', 1.2); }
    const V = [[6, 0], [-28, -30], [-86, -64], [-134, -82], [-124, -62], [-70, -22], [-14, 10]]; vul(ctx, V, ver ? _dk(grijs, 0.2) : grijs, grijsL, 1.2);
    if (!ver) binnen(ctx, V, () => { ctx.strokeStyle = donker; ctx.lineWidth = 1.4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0 - i * 2, -2 + i * 3); ctx.lineTo(-126 + i * 10, -74 + i * 7); ctx.stroke(); } });
    ctx.restore(); };
  vl(true);
  // lijf: spoelvorm, kop rechts
  const L = [[34, -8], [26, -16], [0, -18], [-30, -14], [-56, -6], [-62, 2], [-50, 8], [-20, 10], [10, 8], [30, 2]];
  vul(ctx, L, grijs, grijsL, 1.5);
  binnen(ctx, L, () => { for (let i = 0; i < 5; i++) vul(ctx, [[-14 - i * 9, -6], [-8 - i * 9, -6], [-10 - i * 9, 8], [-16 - i * 9, 8]], i % 2 ? '#D8A090' : '#E6C878'); ctx.strokeStyle = donker; ctx.lineWidth = 1.2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-10 - i * 9, -14); ctx.lineTo(-12 - i * 9, 10); ctx.stroke(); } });
  // kop, oog, antenne
  ctx.beginPath(); ctx.ellipse(38, -4, 9, 8, 0, 0, 6.283); ctx.fillStyle = grijs; ctx.fill(); dierOog(ctx, 41, -6, 4, '#2A2620', { pupil: 'vol' });
  lijn(ctx, [[38, -11], [52, -30], [62, -36]], donker, 1.6);
  // poten
  for (const dx of [10, 18, 26]) lijn(ctx, [[dx, 6], [dx + 6, 20], [dx + 2, 28]], donker, 1.4);
  // roltong
  ctx.strokeStyle = '#3A3028'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(44, 2);
  if (tong > 0.5) { const ex = tongEind ? tongEind[0] : 44 + tongLengte * 0.15, ey = tongEind ? tongEind[1] : 2 + tongLengte * 0.99; ctx.bezierCurveTo(60, 20, ex + 10, ey * 0.4, ex, ey); }
  else { for (let i = 0; i <= 40; i++) { const an = i / 40 * 6.283 * 2.5, r = 8 - i * 0.16; ctx.lineTo(48 + Math.cos(an) * r, 12 + Math.sin(an) * r); } }
  ctx.stroke();
  vl(false);
  ctx.restore(); }

// ===================================================================================
// BABYWEEGSCHAAL (consultatiebureau/verloskundige): kuipje op een voet met digitaal display. (x, y) = midden onder de voet; w = breedte kuip.
function babyWeegschaal(ctx, x, y, w, o = {}) { const { a = 1, kg = null } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  roundRect(ctx, -w * 0.5, -w * 0.16, w, w * 0.16, w * 0.03); shape(ctx, '#DCE2E8', '#F2F4F6', 2);
  roundRect(ctx, -w * 0.14, -w * 0.13, w * 0.28, w * 0.1, 6); shape(ctx, '#1E2A36', '#3A4A5A', 1.5);
  if (kg) text(ctx, kg, 0, -w * 0.055, fMeta(Math.round(w * 0.065)), '#9CE0B0', 'center');
  // kuip
  ctx.beginPath(); ctx.moveTo(-w * 0.5, -w * 0.18); ctx.quadraticCurveTo(-w * 0.52, -w * 0.34, -w * 0.46, -w * 0.36); ctx.lineTo(w * 0.46, -w * 0.36); ctx.quadraticCurveTo(w * 0.52, -w * 0.34, w * 0.5, -w * 0.18); ctx.closePath(); shape(ctx, '#C8D6E2', '#E8EEF4', 2);
  ctx.restore(); }

// KOOLMEES (Parus major): ± 14 cm; kop en keelstreep zwart, witte wang, gele buik met zwarte middenstreep, groenige rug, blauwgrijze vleugel.
// Eenheid 1 = 0,5 mm (zelfde schaal als grondvink). o.pik = kop omlaag; o.prooi(ctx, x, y) tekent iets in de snavel.
function koolmees(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, pik = 0, prooi = null, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  for (const [px, ver] of [[-4, true], [10, false]]) { const col = ver ? '#56606E' : '#6E7888'; lijn(ctx, [[px - 2, -40], [px, 0]], col, 4); lijn(ctx, [[px, -1], [px + 18, 0]], col, 3); lijn(ctx, [[px, -1], [px - 12, 0]], col, 3); }
  vul(ctx, [[-60, -70], [-128, -52], [-130, -42], [-58, -50]], '#4A5A6E', '#7A8AA0', 1.5);
  const L = [[36, -66], [28, -100], [4, -112], [-32, -106], [-62, -84], [-70, -62], [-50, -42], [-10, -36], [24, -44]];
  vul(ctx, L, '#6E8A5A', '#94AE7E', 2);
  binnen(ctx, L, () => { vul(ctx, [[46, -96], [10, -84], [-30, -60], [-40, -30], [50, -30]], '#E0C24A'); lijn(ctx, [[30, -92], [14, -66], [0, -40]], '#1E1E22', 9); });
  vul(ctx, [[14, -98], [-16, -104], [-50, -90], [-86, -66], [-56, -64], [-14, -72]], '#5E7290', '#8AA0BC', 1.5);
  ctx.save(); ctx.translate(30, -104); ctx.rotate(pik * 0.7);
  const K = [[-16, 8], [-14, -12], [0, -24], [18, -22], [30, -10], [30, 8], [18, 16], [-2, 18]]; vul(ctx, K, '#1E1E22', '#3A3A40', 1.5);
  vul(ctx, [[-6, 2], [16, -6], [24, 6], [6, 12]], '#F2F2EE');
  vul(ctx, [[28, -6], [44, -1], [28, 4]], '#2A2A2E'); dierOog(ctx, 16, -10, 3.4, '#1A1210');
  if (prooi) prooi(ctx, 44, 0);
  ctx.restore(); ctx.restore(); }

// ZEGGE (Scleria-achtig): rechte, driekantige stengel met smalle bladen en een pluim zaadjes aan de top. (x, y) = voet; h = hoogte.
function zegge(ctx, x, y, h, o = {}) { const { a = 1, zaad = '#D9C08A', buig = 0.1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  for (const k of [-1, 1, -0.5]) lijn(ctx, [[0, 0], [k * h * 0.15, -h * 0.4], [k * h * 0.32, -h * 0.62]], '#4E7A44', 5);
  lijn(ctx, [[0, 0], [h * buig * 0.5, -h * 0.5], [h * buig, -h]], '#6E9A5E', 6);
  for (let i = 0; i < 9; i++) { const u = i / 8; const px = h * buig + (i % 2 ? 1 : -1) * (6 + 10 * u), py = -h + 10 + i * 9; ctx.beginPath(); ctx.ellipse(px, py, 7, 5, 0, 0, 6.283); ctx.fillStyle = zaad; ctx.fill(); ctx.strokeStyle = _lt(zaad, 0.3); ctx.lineWidth = 1; ctx.stroke(); }
  ctx.restore(); }
