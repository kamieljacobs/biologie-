// =====================================================================================
// HOOFD MET HERSENEN, zijaanzicht (mediane doorsnede), kijkt naar rechts.
// Recept: hoofdlengte ≈ 1,2× hersenlengte; grote hersenen ≈ 2/3 van de schedel; kleine hersenen achter-onder,
// ≈ 1/8 van het volume; hypothalamus onder de thalamus, vóór de hersenstam; hypofyse (± 1 cm, erwt) hangt aan
// een steeltje in het Turkse zadel (botkuiltje) recht boven de neusholte; hersenbalk als C-band boven de thalamus.
// Bron: Gray's Anatomy (mediaan sagittaal), Kenhub 'Hypothalamus'. Bekende fouten: hypofyse los zwevend of
// náást de hersenen; hersenen als ovaal zonder kleine hersenen en hersenstam; hypothalamus achterin.
// Ontwerpcoördinaten: hoofd ± 470 breed × 600 hoog, oorsprong = hypothalamus.
// v2 (beeldbank 27 okt 2026): mediale wand van de grote hersenen met windingen langs de rand (dubbele contour) en de vaste
// groeven van het mediale vlak: gordelgroeve (evenwijdig boven de hersenbalk), centrale groeve als kerf bovenaan, groeve tussen
// wand- en achterhoofdskwab en de vogelspoorgroeve (calcarina) naar de achterhoofdspool (bron: Kenhub 'Medial surface of the
// brain'; OpenStax A&P 2e 13.2). Hoofd als vlak weefsel in huidtint (in mediane doorsnede is geen oog te zien: weg), harde
// gehemelte en tong als herkenningspunt. Klein (hoofd < ± 140 px): alleen silhouet, hersenen vlak en hypothalamus/hypofyse
// als gloeipunt. Alleen in een zoomcirkel náást een personage gebruiken (BEELDAFSPRAKEN).
// =====================================================================================
function hoofdHersenen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, hthCol = BIO.klier, hypCol = BIO.klier, huid = BIO.huid, gloed = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  if (a <= 0.01) return { hth: P(0, 0), hyp: P(8, 64), steel: P(4, 34) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hoofd + hals (profiel naar rechts: voorhoofd, neus, lippen, kin)
  const HOOFD = [[-60, 330], [-70, 250], [-120, 190], [-205, 120], [-245, 10], [-240, -110], [-190, -215], [-90, -280], [30, -290], [140, -250], [205, -170],
    [225, -90], [228, -30], [244, 10], [272, 60], [262, 78], [246, 84], [252, 106], [244, 122], [252, 138], [240, 160], [222, 182], [196, 196], [150, 200], [120, 240], [110, 330]];
  ctx.beginPath(); bioPad(ctx, HOOFD, false); ctx.lineTo(-60, 330); ctx.closePath();
  shape(ctx, _mixHex(huid, '#1A2740', 0.55), rgba(huid, 0.85), 2.5);
  const klein = s * 600 < 140;
  // schedel (binnenrand) als dunne botlijn
  ctx.beginPath(); bioPad(ctx, [[-200, 110], [-225, 0], [-218, -110], [-170, -200], [-80, -258], [30, -266], [130, -228], [190, -150], [204, -70], [190, -10], [150, 30]], false);
  ctx.strokeStyle = rgba(BIO.bot, 0.55); ctx.lineWidth = 8; ctx.stroke();
  // Turks zadel (botkuiltje voor de hypofyse) en neusholte erboven/ervoor
  ctx.beginPath(); ctx.moveTo(-30, 70); ctx.quadraticCurveTo(-18, 100, 10, 98); ctx.quadraticCurveTo(36, 96, 44, 66); ctx.strokeStyle = rgba(BIO.bot, 0.75); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[60, 50], [140, 40], [215, 50], [232, 90], [200, 120], [120, 118], [70, 100]], true); ctx.fillStyle = rgba('#0D1420', 0.35); ctx.fill();
  if (!klein) { ctx.strokeStyle = rgba(BIO.bot, 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(80, 122); ctx.lineTo(218, 128); ctx.stroke(); // harde gehemelte
    ctx.beginPath(); bioPad(ctx, [[60, 200], [70, 150], [120, 138], [190, 142], [214, 160], [170, 176], [110, 196]], true); shape(ctx, rgba('#C9787A', 0.7), rgba('#E0A0A0', 0.7), 1.5); } // tong
  // grote hersenen
  const GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
  ctx.beginPath(); bioPad(ctx, GROOT, true); shape(ctx, rgba(BIO.brein, 0.9), BIO.breinS, 2);
  // windingen langs de rand: binnencontour op ± 22 eenheden die bij elke groeve naar binnen knikt (dubbele contour)
  if (!klein) { ctx.save(); ctx.beginPath(); bioPad(ctx, GROOT, true); ctx.clip();
    const R = bioDicht(GROOT.concat([GROOT[0]]), 14), n = R.length, cx0 = -10, cy0 = -110;
    ctx.strokeStyle = rgba(BIO.breinD, 0.6); ctx.lineWidth = 2.5; ctx.beginPath();
    R.forEach((p, i) => { const dx = p[0] - cx0, dy = p[1] - cy0, d = Math.hypot(dx, dy) || 1; const g = Math.pow(Math.abs(Math.sin(i / n * Math.PI * 17)), 0.6); const k = 18 + 24 * (1 - g);
      const q = [p[0] - dx / d * k, p[1] - dy / d * k]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke();
    // vaste groeven van het mediale vlak
    ctx.strokeStyle = rgba(BIO.breinD, 0.8); ctx.lineWidth = 3.5;
    const GR = [[[150, -40], [140, -95], [70, -135], [-20, -142], [-70, -136]],                  // gordelgroeve (evenwijdig boven de hersenbalk, van voor naar achter)
      [[-70, -136], [-86, -190], [-82, -246]],                                                       // achterste tak omhoog naar de rand
      [[-22, -262], [-28, -232], [-40, -214]],                                                       // centrale groeve (kerf bovenaan, vóór die tak)
      [[-178, -205], [-160, -140], [-140, -70], [-128, -22]],                                        // groeve wand-/achterhoofdskwab (omlaag en naar voren)
      [[-118, 18], [-150, -24], [-188, -56], [-214, -68]]];                                          // vogelspoorgroeve: van onder de hersenbalk naar de achterhoofdspool
    GR.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
    ctx.strokeStyle = rgba(BIO.breinD, 0.4); ctx.lineWidth = 2;
    [[[-60, -200], [-40, -175], [-70, -160]], [[60, -215], [70, -185], [50, -165]], [[-200, -120], [-175, -110]], [[160, -150], [140, -130]]].forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
    ctx.restore(); }
  // hersenbalk (C-vormige band)
  ctx.beginPath(); bioPad(ctx, [[-120, -10], [-130, -60], [-80, -95], [20, -100], [100, -80], [125, -45], [105, -30], [70, -55], [10, -68], [-70, -62], [-100, -35], [-95, -5]], true);
  shape(ctx, rgba(BIO.wit, 0.9), rgba(BIO.breinS, 0.8), 1.5);
  // thalamus
  ctx.beginPath(); ctx.ellipse(-10, -28, 46, 26, -0.1, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.75), BIO.breinD, 1.5);
  // kleine hersenen met boompje (arbor vitae)
  const KLEIN = [[-110, 60], [-150, 70], [-200, 80], [-210, 130], [-170, 175], [-110, 170], [-80, 130], [-85, 85]];
  ctx.beginPath(); bioPad(ctx, KLEIN, true); shape(ctx, rgba(BIO.brein, 0.95), BIO.breinS, 2);
  if (!klein) { ctx.save(); ctx.beginPath(); bioPad(ctx, KLEIN, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.wit, 0.8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-88, 112); ctx.lineTo(-130, 118); ctx.stroke(); for (let k = 0; k < 5; k++) { const an = 2.35 + k * 0.38; const bx = -112 - k * 4, by = 116; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.cos(an) * 40, by + Math.sin(an) * 28, bx + Math.cos(an) * 78, by + Math.sin(an) * 52); ctx.stroke(); ctx.lineWidth = 1.6; for (const sd of [-0.3, 0.3]) { ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * 45, by + Math.sin(an) * 30); ctx.lineTo(bx + Math.cos(an + sd) * 74, by + Math.sin(an + sd) * 50); ctx.stroke(); } }
  ctx.restore(); }
  // hersenstam (middenhersenen, brug, verlengde merg) naar het ruggenmerg
  ctx.beginPath(); bioPad(ctx, [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]], true);
  shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  // hypothalamus (onder de thalamus, vóór de hersenstam) + gloed
  if (hth > 0.01 && gloed) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90); g.addColorStop(0, rgba(hthCol, 0.5 * hth)); g.addColorStop(1, rgba(hthCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); bioPad(ctx, [[-26, -6], [10, -14], [36, -2], [30, 18], [4, 22], [-20, 14]], true); shape(ctx, rgba(hthCol, 0.35 + 0.6 * Math.max(hth, 0.25)), lighten(hthCol, 0.25), 2);
  // steeltje (infundibulum) en hypofyse in het Turkse zadel
  ctx.strokeStyle = lighten(hthCol, 0.15); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(10, 18); ctx.quadraticCurveTo(12, 40, 6, 58); ctx.stroke();
  if (hyp > 0.01 && gloed) { const g = ctx.createRadialGradient(8, 72, 0, 8, 72, 60); g.addColorStop(0, rgba(hypCol, 0.5 * hyp)); g.addColorStop(1, rgba(hypCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(8, 72, 60, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(8, 74, 24, 17, 0, 0, 6.283); shape(ctx, rgba(hypCol, 0.35 + 0.6 * Math.max(hyp, 0.25)), lighten(hypCol, 0.25), 2);
  ctx.strokeStyle = rgba('#0D1420', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4, 58); ctx.lineTo(6, 90); ctx.stroke(); // voor- en achterkwab
  if (klein) { // alleen de klier als gloeipunt: vaste minimummaat op het scherm
    const rr = Math.max(26, 4 / s); if (hth > 0.01) { ctx.beginPath(); ctx.arc(0, 0, rr, 0, 6.283); ctx.fillStyle = rgba(hthCol, 0.9 * hth); ctx.fill(); }
    if (hyp > 0.01) { ctx.beginPath(); ctx.arc(8, 74, rr, 0, 6.283); ctx.fillStyle = rgba(hypCol, 0.9 * hyp); ctx.fill(); } }
  ctx.restore();
  return { hth: P(0, 0), hyp: P(8, 74), steel: P(8, 40) };
}
