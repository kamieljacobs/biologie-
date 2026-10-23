// Evolutie v2 — film 7 'Hoe weten we dat?' (gedeeld met film 8). 22 okt 2026.
// Tekenrecepten volgens C9: echte verhoudingen, echt oog (dierOog), aanhangsels beginnen binnen de omtrek van het lijf.
// Conventie: f(ctx, x, y, s, o) · kop naar rechts (o.kijk = -1 spiegelt) · (x, y) = midden onder het dier (landdieren) of midden van het lijf (zwemmers).
// Eenheden bij s = 1: de lengte van het dier staat per functie vermeld.

// ---- hulpjes ----
// ledemaat: een poot als reeks segmenten met gewrichten [[x,y],...] en breedtes [w0, w1, ...] per punt (taps toelopend, ronde gewrichten)
function ledemaat(ctx, P, Wd, col) { ctx.fillStyle = col;
  for (let i = 0; i < P.length - 1; i++) { const [x1, y1] = P[i], [x2, y2] = P[i + 1]; const w1 = Wd[i] / 2, w2 = Wd[i + 1] / 2; const an = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(an), ny = Math.cos(an);
    ctx.beginPath(); ctx.moveTo(x1 + nx * w1, y1 + ny * w1); ctx.lineTo(x2 + nx * w2, y2 + ny * w2); ctx.lineTo(x2 - nx * w2, y2 - ny * w2); ctx.lineTo(x1 - nx * w1, y1 - ny * w1); ctx.closePath(); ctx.fill(); }
  P.forEach(([x, y], i) => circ(ctx, x, y, Wd[i] / 2, col)); }
// bot: capsule met knobbelige uiteinden (skeletten), vulling in de botkleur, rand iets lichter
function bot(ctx, x1, y1, x2, y2, w, col, o = {}) { const { kop = 1.25, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = Math.hypot(x2 - x1, y2 - y1), an = Math.atan2(y2 - y1, x2 - x1); ctx.translate(x1, y1); ctx.rotate(an);
  const r = w / 2, R = r * kop; ctx.beginPath(); ctx.moveTo(R * 0.6, -r * 0.62); ctx.quadraticCurveTo(L / 2, -r * 0.42, L - R * 0.6, -r * 0.62);
  ctx.arc(L - R * 0.25, -R * 0.42, R * 0.62, 3.6, 0.9); ctx.arc(L - R * 0.25, R * 0.42, R * 0.62, -0.9, 2.7);
  ctx.lineTo(L - R * 0.6, r * 0.62); ctx.quadraticCurveTo(L / 2, r * 0.42, R * 0.6, r * 0.62);
  ctx.arc(R * 0.25, R * 0.42, R * 0.62, 0.45, 3.9); ctx.arc(R * 0.25, -R * 0.42, R * 0.62, 2.4, 5.6); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = _lt(col, 0.35); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
const BOT = { arm: '#5BA4C9', onder: '#C9A35C', hand: '#8C7BBF', kaal: '#D8CBB0', kaalR: '#EFE6D2' }; // vaste botkleuren: opperarmbeen teal, spaakbeen + ellepijp oker, pols en hand paars

// ================= BULTRUG (Megaptera novaeangliae) =================
// Recept: ±15 m; lengte 800 eenheden (bij s = 1). Borstvinnen ±1/3 van de lichaamslengte (tot ±5 m), wit, met knobbels op de voorrand;
// kop met knobbels (tuberkels), keelgroeven van kin tot navel, kleine rugvin op een bult op ±2/3 van de lengte, horizontale staartvin.
// Oog net boven de mondhoek. Bekende fout: borstvin te kort (dan lijkt het een blauwe vinvis), staartvin rechtop (dat is een vis).
// o.rontgen 0..1: romp doorschijnend, skelet zichtbaar (wervelkolom, schedel, borstvin, heupbotjes los van de wervelkolom); o.heup 0..1 = heupbotjes in goud
const BULT_ROMP = [[400, -6], [384, -26], [340, -44], [280, -60], [200, -76], [110, -88], [20, -88], [-60, -78], [-140, -58], [-220, -38], [-290, -22], [-345, -12], [-362, -4],
  [-345, 8], [-290, 20], [-210, 40], [-110, 66], [0, 92], [100, 100], [200, 90], [282, 66], [344, 40], [384, 18]];
function bultrug(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, heup = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const rug = '#2F3742', buik = '#C8CED6', vin = '#D9DEE4', vinR = '#9AA3B2'; const r = 1 - rontgen * 0.8;
  const slag = Math.sin(t * 1.1) * 0.08;
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin (horizontaal, iets van boven gezien) — vast aan de staartwortel
  ctx.save(); ctx.translate(-350, -2); ctx.rotate(slag); vul(ctx, [[10, -7], [-30, -10], [-84, -16], [-118, -12], [-112, -4], [-84, 0], [-112, 6], [-118, 14], [-84, 14], [-30, 8], [10, 7]], rug, _lt(rug, 0.2), 2); ctx.restore(); // staartvin plat (horizontaal): van opzij een smalle wig met twee punten
  // rugvin op een bult
  vul(ctx, [[-30, -82], [-62, -98], [-84, -104], [-80, -90], [-92, -74], [-60, -74]], rug);
  // romp
  vul(ctx, BULT_ROMP, rug, _lt(rug, 0.18), 2);
  binnen(ctx, BULT_ROMP, () => { vul(ctx, [[392, 6], [300, 40], [180, 70], [60, 86], [-60, 70], [-140, 52], [-150, 140], [400, 140]], buik);
    // keelgroeven van kin tot navel
    ctx.strokeStyle = rgba('#7A8290', 0.8); ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(386 - i * 6, 14 + i * 4); ctx.quadraticCurveTo(220, 52 + i * 7, 10 - i * 6, 82 + i * 2); ctx.stroke(); }
    // knobbels op de kop
    for (let i = 0; i < 9; i++) circ(ctx, 372 - i * 16, -28 - i * 3.6, 3.4, _lt(rug, 0.16));
    for (let i = 0; i < 4; i++) circ(ctx, 368 - i * 22, 2 + i * 3, 3, _lt(rug, 0.12)); });
  // mondlijn en oog
  lijn(ctx, [[398, -2], [330, 4], [262, 12], [238, 18]], '#141A22', 2.5); dierOog(ctx, 244, 2, 5, '#3A2A1E', { rand: '#1C232C' });
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen;
    vul(ctx, BULT_ROMP, null, rgba(C.line, 0.9), 2);
    // schedel en wervelkolom
    vul(ctx, [[396, -8], [330, -30], [260, -46], [214, -44], [206, -10], [250, 0], [330, -2]], BOT.kaal, BOT.kaalR, 1.5);
    vul(ctx, [[396, 2], [320, 8], [250, 14], [240, 6], [320, 0]], BOT.kaal);
    for (let i = 0; i < 30; i++) { const u = i / 29, vx = 200 - u * 540, vy = -42 + Math.sin(u * 3.1) * -16 + u * 34; roundRect(ctx, vx - 7, vy - 9 + u * 3, 14 - u * 5, 18 - u * 8, 3); shape(ctx, BOT.kaal, BOT.kaalR, 1); }
    // ribben
    ctx.strokeStyle = BOT.kaal; ctx.lineWidth = 3.5; for (let i = 0; i < 9; i++) { const rx = 180 - i * 22; ctx.beginPath(); ctx.moveTo(rx, -48 + i * 0.6); ctx.quadraticCurveTo(rx - 26, 10, rx - 18, 56 - i * 2); ctx.stroke(); }
    // heupbotjes: los in de buikwand, niet vast aan de wervelkolom
    ctx.save(); ctx.globalAlpha *= 1; const hc = heup > 0.01 ? C.goud : BOT.kaal; bot(ctx, -122, 46, -86, 34, 9, hc); bot(ctx, -112, 56, -76, 44, 9, hc); ctx.restore();
    ctx.restore(); }
  // borstvin: wit, met knobbels op de voorrand — begint in de romp achter de mondhoek
  ctx.save(); ctx.globalAlpha *= (rontgen > 0.01 ? 1 - rontgen * 0.75 : 1);
  ctx.save(); ctx.translate(196, 46); ctx.rotate(Math.sin(t * 0.7) * 0.05);
  const FL = [[18, -12], [6, 10], [-40, 44], [-110, 92], [-190, 132], [-232, 150], [-240, 140], [-200, 112], [-130, 70], [-60, 30], [-20, -2], [0, -16]];
  vul(ctx, FL, vin, vinR, 2); ctx.fillStyle = vinR; for (let i = 0; i < 9; i++) { const u = 0.08 + i * 0.1; circ(ctx, 6 - u * 238, 10 + u * 132 + 4, 4.5); }
  ctx.restore(); ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(196, 46); bot(ctx, 4, -2, -26, 16, 20, BOT.arm); bot(ctx, -28, 18, -70, 46, 14, BOT.onder); bot(ctx, -24, 30, -64, 56, 12, BOT.onder);
    for (let d = 0; d < 4; d++) { let px = -72 - d * 2, py = 50 + d * 8; const n = [5, 7, 6, 4][d]; for (let k = 0; k < n; k++) { const nx = px - 22, ny = py + 13 - d * 0.5; bot(ctx, px, py, nx, ny, 8 - k * 0.5, BOT.hand, { kop: 1.1 }); px = nx; py = ny; } }
    ctx.restore(); }
  ctx.restore(); }

// ================= GESTEENTELAGEN =================
// lagen: [{kleur, dik (0..1 deel van de hoogte), naam?}] van onder naar boven; o.rot = kanteling (rad) rond het midden; o.breuk = verschuiving langs een breuk
const LAAG_KLEUREN = ['#6E5A44', '#8C7258', '#A8916A', '#7A6A5A', '#B8A07A', '#93805E', '#6A5E50'];
function gesteente(ctx, x, y, w, h, lagen, o = {}) { const { rot = 0, a = 1, fossielen = [], nadruk = -1, dim = false, golf = 6, seed = 2 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot);
  const tot = lagen.reduce((s, l) => s + l.dik, 0); let yy = h / 2; const grenzen = [];
  lagen.forEach((l, i) => { const dh = l.dik / tot * h; const y0 = yy, y1 = yy - dh; const bovenrand = (xx) => y1 + Math.sin(xx / w * 6.283 * 1.3 + i * 1.7 + seed) * golf * (i < lagen.length - 1 ? 1 : 0);
    const onderrand = (xx) => i === 0 ? y0 : y0 + Math.sin(xx / w * 6.283 * 1.3 + (i - 1) * 1.7 + seed) * golf;
    ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -w / 2 + k / 30 * w; k ? ctx.lineTo(xx, onderrand(xx)) : ctx.moveTo(xx, onderrand(xx)); }
    for (let k = 30; k >= 0; k--) { const xx = -w / 2 + k / 30 * w; ctx.lineTo(xx, bovenrand(xx)); } ctx.closePath();
    const kl = l.kleur || LAAG_KLEUREN[i % LAAG_KLEUREN.length]; ctx.fillStyle = (dim && i !== nadruk) ? _dk(kl, 0.35) : kl; ctx.fill();
    // korrel: een paar platte steentjes en streepjes in de laag (structuur, geen decoratie)
    ctx.fillStyle = rgba('#F2E6CC', 0.10); for (let k = 0; k < 10; k++) { const px = -w / 2 + hash(i * 31 + k * 7 + seed) * w, py = y1 + dh * (0.25 + 0.5 * hash(i * 17 + k * 3)); ctx.beginPath(); ctx.ellipse(px, py, 6 + hash(k + i) * 10, 2.5, 0, 0, 6.283); ctx.fill(); }
    if (i === nadruk) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }
    grenzen.push({ y0, y1, mid: (y0 + y1) / 2 }); yy = y1; });
  fossielen.forEach(f => { const g = grenzen[f.laag]; fossiel(ctx, f.soort, -w / 2 + f.x * w, g.mid + (f.dy || 0), f.s || 1, { a: f.a == null ? 1 : f.a, goud: f.goud }); });
  ctx.restore(); return grenzen; }
// fossiel in een laag: versteende botten (lichte botkleur) in de houding waarin het dier is bedolven
function fossiel(ctx, soort, x, y, s = 1, o = {}) { const { a = 1, goud = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const k = goud ? C.goud : BOT.kaal, kr = goud ? _lt(C.goud, 0.3) : BOT.kaalR; ctx.strokeStyle = k; ctx.fillStyle = k; ctx.lineCap = 'round';
  if (soort === 'schelp') { ctx.beginPath(); ctx.arc(0, 0, 16, 3.3, 6.1); ctx.lineTo(14, 4); ctx.quadraticCurveTo(0, 8, -14, 4); ctx.closePath(); shape(ctx, k, kr, 1.5); ctx.strokeStyle = _dk(k, 0.25); ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(i * 6, -14); ctx.stroke(); } }
  else if (soort === 'vis') { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(30, 0); ctx.stroke(); for (let i = 0; i < 9; i++) { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-26 + i * 6, -8 + Math.abs(i - 4)); ctx.lineTo(-26 + i * 6, 8 - Math.abs(i - 4)); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(34, 0, 9, 7, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-46, -10); ctx.lineTo(-46, 10); ctx.closePath(); ctx.fill(); }
  else { // zoogdierskelet, zijaanzicht, liggend: schedel rechts, wervelkolom, ribben, poten (lengte poten per soort)
    const poot = { pakicetus: 1, ambulocetus: 0.7, rodhocetus: 0.55, basilosaurus: 0.12 }[soort] ?? 1; const lang = soort === 'basilosaurus' ? 2.2 : 1;
    const L = 90 * lang; ctx.lineWidth = 3; for (let i = 0; i < 16; i++) { const u = i / 15; roundRect(ctx, -L + u * (L + 40) - 3, -3 + Math.sin(u * 3) * -4, 6, 6, 2); ctx.fill(); }
    ctx.beginPath(); ctx.ellipse(56, -2, 22, 9, -0.08, 0, 6.283); shape(ctx, k, kr, 1.5); ctx.beginPath(); ctx.moveTo(70, 4); ctx.lineTo(84, 6); ctx.stroke();
    ctx.lineWidth = 2.2; for (let i = 0; i < 7; i++) { const rx = 28 - i * 8; ctx.beginPath(); ctx.moveTo(rx, -4); ctx.quadraticCurveTo(rx - 6, 10, rx - 2, 18); ctx.stroke(); }
    ctx.lineWidth = 3.5; const hp = -L * 0.55 + 20; ctx.beginPath(); ctx.moveTo(26, 2); ctx.lineTo(30, 2 + 26 * poot); ctx.lineTo(24, 2 + 46 * poot); ctx.stroke();
    if (poot > 0.3) { ctx.beginPath(); ctx.moveTo(hp, 2); ctx.lineTo(hp - 6, 2 + 28 * poot); ctx.lineTo(hp, 2 + 50 * poot); ctx.stroke(); } else { ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(hp, 6); ctx.lineTo(hp - 4, 14); ctx.stroke(); } }
  ctx.restore(); }

// ================= VROEGE WALVISACHTIGEN (reconstructies, zijaanzicht) =================
// Pakicetus (±50 Mj, 1–2 m): wolfachtig landzoogdier met lange slanke poten, kleine hoefjes, lange staart, lange snuit met tanden, ogen bovenop de kop.
// Lengte 400 eenheden (zonder staart ±300). Anker = midden tussen de voeten.
function pakicetus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#8C6A48', donker = '#6A4E34', buik = '#B89A76';
  ledemaat(ctx, [[-96, -150], [-104, -96], [-88, -50], [-94, -6]], [30, 16, 10, 10], donker); ledemaat(ctx, [[86, -150], [92, -96], [86, -40], [90, -6]], [26, 14, 9, 9], donker);
  roundRect(ctx, -104, -10, 18, 10, 3); ctx.fillStyle = '#2E2620'; ctx.fill(); roundRect(ctx, 82, -10, 16, 10, 3); ctx.fill();
  // staart
  ctx.strokeStyle = vacht; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-130, -168); ctx.quadraticCurveTo(-200, -150, -236, -104); ctx.stroke(); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-226, -116); ctx.quadraticCurveTo(-250, -84, -254, -62); ctx.stroke();
  const R = [[-136, -170], [-110, -196], [-40, -206], [40, -204], [100, -200], [128, -192], [134, -158], [116, -128], [60, -122], [-20, -124], [-90, -128], [-130, -140]];
  vul(ctx, R, vacht); binnen(ctx, R, () => vul(ctx, [[-140, -138], [-60, -142], [40, -138], [140, -150], [140, -100], [-140, -100]], buik));
  // nek en kop: lange snuit, ogen hoog bovenop
  vul(ctx, [[104, -196], [140, -220], [176, -232], [214, -228], [262, -214], [292, -206], [294, -194], [262, -188], [214, -186], [180, -176], [148, -160], [118, -150]], vacht);
  lijn(ctx, [[292, -198], [250, -194], [208, -190]], '#2A1E14', 2); ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(276 - i * 14, -196); ctx.lineTo(272 - i * 14, -188); ctx.lineTo(268 - i * 14, -196); ctx.fill(); }
  vul(ctx, [[158, -226], [150, -248], [166, -236]], donker); dierOog(ctx, 194, -224, 5, '#3A2414');
  ledemaat(ctx, [[-70, -150], [-84, -100], [-66, -52], [-72, -6]], [32, 17, 11, 11], vacht); ledemaat(ctx, [[100, -150], [110, -96], [104, -40], [108, -6]], [28, 15, 10, 10], vacht);
  ctx.fillStyle = '#3A3028'; roundRect(ctx, -82, -10, 18, 10, 3); ctx.fill(); roundRect(ctx, 100, -10, 16, 10, 3); ctx.fill();
  ctx.restore(); }
// Ambulocetus (±48 Mj, ±3 m): laag lijf, korte poten, zeer grote achtervoeten, lange snuit, ogen bovenop, lange dikke staart. Lengte ±560 eenheden.
function ambulocetus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#6E5E4A', donker = '#54473A', buik = '#9C8A70';
  ledemaat(ctx, [[-120, -84], [-140, -50], [-118, -22], [-128, -4]], [30, 18, 12, 12], donker); vul(ctx, [[-142, -12], [-92, -10], [-80, 0], [-150, 2]], '#3E3428');
  ledemaat(ctx, [[110, -80], [124, -48], [118, -14], [124, -4]], [24, 14, 10, 10], donker);
  ctx.strokeStyle = vacht; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -96); ctx.quadraticCurveTo(-240, -80, -300, -40); ctx.stroke(); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-290, -46); ctx.quadraticCurveTo(-330, -22, -350, -16); ctx.stroke();
  const R = [[-160, -96], [-130, -126], [-40, -136], [60, -132], [120, -126], [150, -112], [146, -80], [100, -66], [0, -62], [-100, -66], [-150, -76]];
  vul(ctx, R, vacht); binnen(ctx, R, () => vul(ctx, [[-170, -74], [0, -80], [160, -86], [160, -50], [-170, -50]], buik));
  vul(ctx, [[130, -126], [176, -138], [230, -136], [290, -122], [330, -112], [334, -100], [290, -94], [220, -92], [168, -86], [136, -84]], vacht);
  lijn(ctx, [[332, -104], [270, -100], [214, -98]], '#2A1E14', 2); ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(320 - i * 16, -102); ctx.lineTo(316 - i * 16, -94); ctx.lineTo(312 - i * 16, -102); ctx.fill(); }
  dierOog(ctx, 212, -134, 5, '#3A2414');
  ledemaat(ctx, [[-96, -82], [-114, -48], [-92, -20], [-100, -4]], [32, 19, 13, 13], vacht); vul(ctx, [[-116, -12], [-58, -10], [-44, 0], [-122, 2]], '#4A3E30');
  ledemaat(ctx, [[128, -80], [144, -46], [140, -14], [146, -4]], [26, 15, 11, 11], vacht); vul(ctx, [[134, -8], [164, -8], [170, 0], [130, 0]], '#4A3E30');
  ctx.restore(); }
// Rodhocetus (±47 Mj, 2–3 m): langgerekt, korte poten met lange smalle tenen (zwemvoeten), lange staart; neusgaten nog voorop. Lengte ±500.
function rodhocetus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const huid = '#5E5A54', donker = '#46423E', buik = '#9A948A';
  ledemaat(ctx, [[-110, 10], [-130, 30], [-160, 44]], [26, 14, 10], donker); vul(ctx, [[-156, 38], [-224, 52], [-228, 62], [-160, 54]], donker);
  ctx.strokeStyle = huid; ctx.lineWidth = 32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, 0); ctx.quadraticCurveTo(-230, 6, -300, 14); ctx.stroke(); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-296, 14); ctx.lineTo(-352, 18); ctx.stroke();
  const R = [[-170, 0], [-130, -28], [-30, -42], [80, -38], [150, -26], [176, -6], [160, 18], [80, 32], [-30, 34], [-130, 26]];
  vul(ctx, R, huid); binnen(ctx, R, () => vul(ctx, [[-180, 18], [0, 12], [190, 4], [190, 50], [-180, 50]], buik));
  vul(ctx, [[160, -24], [220, -26], [280, -16], [306, -6], [304, 4], [270, 8], [214, 12], [168, 14]], huid); lijn(ctx, [[304, 0], [250, 2], [206, 4]], '#1E1A16', 2);
  dierOog(ctx, 206, -12, 4.5, '#2E2016');
  ledemaat(ctx, [[-90, 14], [-110, 34], [-136, 48]], [28, 15, 10], huid); vul(ctx, [[-134, 42], [-206, 58], [-210, 68], [-136, 58]], _dk(huid, 0.1));
  ledemaat(ctx, [[120, 16], [134, 36], [150, 50]], [22, 13, 9], huid); vul(ctx, [[146, 46], [190, 58], [190, 66], [146, 58]], _dk(huid, 0.1));
  ctx.restore(); }
// Basilosaurus (±41–34 Mj, 15–18 m): zeer langgerekt (palingvormig), kleine kop met tanden, borstvinnen, piepkleine achterpootjes (±35 cm) los van de wervelkolom,
// kleine horizontale staartvin. Lengte 900 eenheden: 1 eenheid = ±2 cm, achterpootje ±18 eenheden.
function basilosaurus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, poot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = '#4E5862', buik = '#9AA6B0';
  const R = []; for (let i = 0; i <= 24; i++) { const u = i / 24, xx = 440 - u * 880, d = 40 * Math.sin(Math.PI * Math.pow(u, 0.75)) + 6, gy = Math.sin(u * 6 + t) * 10 * u; R.push([xx, gy - d]); }
  for (let i = 24; i >= 0; i--) { const u = i / 24, xx = 440 - u * 880, d = 34 * Math.sin(Math.PI * Math.pow(u, 0.75)) + 6, gy = Math.sin(u * 6 + t) * 10 * u; R.push([xx, gy + d]); }
  vul(ctx, [[-430, 4], [-470, -24], [-480, -18], [-460, 4], [-480, 26], [-470, 32]], huid);
  vul(ctx, R, huid); binnen(ctx, R, () => vul(ctx, [[460, 6], [0, 14], [-460, 14], [-460, 60], [460, 60]], buik));
  lijn(ctx, [[440, 2], [400, 4], [372, 6]], '#1A1E22', 2); ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(430 - i * 14, 3); ctx.lineTo(426 - i * 14, 10); ctx.lineTo(422 - i * 14, 3); ctx.fill(); }
  dierOog(ctx, 384, -12, 4, '#2E2016');
  vul(ctx, [[300, 22], [262, 52], [248, 66], [242, 58], [262, 30], [282, 16]], _dk(huid, 0.1));
  // achterpootje: dij, onderbeen, voet met tenen — klein en los van de wervelkolom
  ctx.save(); const pk = poot > 0.01 ? C.goud : _dk(huid, 0.15); ledemaat(ctx, [[-196, 28], [-206, 38], [-214, 46]], [7, 5, 4], pk); ctx.strokeStyle = pk; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-214, 46); ctx.lineTo(-222 + i * 3, 52); ctx.stroke(); } ctx.restore();
  ctx.restore(); }

// ================= NIJLPAARD, KOE, ZEEHOND, VARKEN =================
// Nijlpaard (Hippopotamus amphibius): tonvormig lijf, korte zuilpoten met vier tenen, grote brede kop, ogen/oren/neusgaten bovenop. ±4 m; lengte 420 eenheden.
function nijlpaard(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = '#6E5E66', donker = '#56484F', roze = '#C98E8A';
  ledemaat(ctx, [[-130, -90], [-136, -40], [-132, -6]], [50, 36, 34], donker); ledemaat(ctx, [[110, -86], [116, -40], [112, -6]], [46, 34, 32], donker);
  const R = [[-180, -110], [-150, -170], [-60, -196], [40, -194], [120, -178], [168, -150], [176, -104], [150, -66], [60, -54], [-60, -54], [-150, -64], [-182, -84]];
  vul(ctx, R, huid); binnen(ctx, R, () => vul(ctx, [[-190, -78], [0, -84], [190, -96], [190, -40], [-190, -40]], _lt(huid, 0.12)));
  ctx.strokeStyle = huid; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-178, -132); ctx.lineTo(-200, -110); ctx.stroke();
  vul(ctx, [[150, -170], [196, -184], [232, -176], [268, -150], [290, -140], [296, -96], [282, -74], [240, -70], [196, -76], [160, -92]], huid);
  binnen(ctx, [[150, -170], [196, -184], [232, -176], [268, -150], [290, -140], [296, -96], [282, -74], [240, -70], [196, -76], [160, -92]], () => vul(ctx, [[220, -100], [300, -104], [300, -60], [220, -60]], roze));
  lijn(ctx, [[292, -98], [250, -92], [222, -100]], '#3A2A30', 2.5); circ(ctx, 286, -142, 3, '#2A1E22');
  vul(ctx, [[196, -186], [200, -206], [212, -188]], donker); dierOog(ctx, 226, -170, 5, '#3A2414', { rand: _dk(huid, 0.2) });
  ledemaat(ctx, [[-100, -88], [-104, -40], [-100, -6]], [52, 38, 36], huid); ledemaat(ctx, [[136, -84], [140, -40], [138, -6]], [48, 36, 34], huid);
  ctx.fillStyle = '#3A3034'; [-112, -100, -88, 126, 138, 150].forEach(tx => { ctx.beginPath(); ctx.ellipse(tx, -4, 5, 4, 0, 0, 6.283); ctx.fill(); });
  ctx.restore(); }
// Koe (rund): rechte rug, diepe borst, poten met hoeven (twee tenen), kop met hoorns. ±2,5 m; lengte 380.
function koe7(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const k = '#8C5A3A', d = '#6E4630';
  ledemaat(ctx, [[-120, -150], [-130, -100], [-118, -60], [-122, -8]], [44, 24, 15, 15], d); ledemaat(ctx, [[100, -140], [104, -90], [100, -40], [104, -8]], [36, 20, 14, 14], d);
  ctx.strokeStyle = k; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-150, -230); ctx.quadraticCurveTo(-166, -170, -160, -110); ctx.stroke(); vul(ctx, [[-168, -116], [-150, -116], [-152, -90], [-166, -92]], '#3A2A20');
  const R = [[-156, -232], [-120, -244], [0, -238], [100, -246], [140, -236], [152, -196], [140, -150], [100, -130], [0, -126], [-100, -132], [-150, -160]];
  vul(ctx, R, k); vul(ctx, [[-60, -130], [-30, -112], [-80, -112]], '#D8A090');
  vul(ctx, [[120, -244], [170, -246], [210, -226], [236, -186], [240, -164], [222, -154], [196, -170], [160, -178], [130, -170]], k);
  vul(ctx, [[176, -248], [168, -268], [184, -250]], '#D8CBB0'); dierOog(ctx, 198, -216, 5, '#2A1A10'); circ(ctx, 232, -168, 3, '#3A2418');
  ledemaat(ctx, [[-92, -150], [-104, -100], [-90, -60], [-94, -8]], [46, 25, 16, 16], k); ledemaat(ctx, [[124, -140], [128, -90], [124, -40], [128, -8]], [38, 22, 15, 15], k);
  ctx.fillStyle = '#2E2620'; [-108, -132, 116, 92].forEach(hx => { roundRect(ctx, hx - 9, -12, 18, 12, 3); ctx.fill(); });
  ctx.restore(); }
// Gewone zeehond (Phoca vitulina): ±1,6 m, spoelvormig, korte voorflippers met nagels, achterflippers naar achteren, gevlekte vacht, geen oorschelp. Lengte 360.
function zeehond(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const k = '#8A8C88', d = '#5E605C';
  vul(ctx, [[-150, -30], [-196, -50], [-210, -40], [-190, -22], [-212, -6], [-196, 2], [-150, -10]], d);
  const R = [[-160, -24], [-120, -60], [-20, -80], [80, -82], [140, -94], [180, -88], [198, -66], [190, -46], [140, -30], [40, -6], [-80, -4], [-150, -10]];
  vul(ctx, R, k); binnen(ctx, R, () => { ctx.fillStyle = d; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.ellipse(-140 + hash(i * 3.1) * 300, -70 + hash(i * 4.7) * 50, 4, 3, 0, 0, 6.283); ctx.fill(); } vul(ctx, [[-170, -14], [0, -18], [200, -40], [200, 10], [-170, 10]], '#B4B6B0'); });
  vul(ctx, [[70, -36], [90, -10], [110, -2], [96, -20], [86, -40]], d); dierOog(ctx, 166, -78, 6, '#1A1410'); circ(ctx, 196, -66, 2.5, '#1A1410');
  ctx.strokeStyle = '#D8D8D2'; ctx.lineWidth = 1; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(190, -60); ctx.lineTo(214, -60 + i * 6); ctx.stroke(); }
  ctx.restore(); }

// ================= HOMOLOGE VOORPOTEN (skeletten) =================
// armSkelet(ctx, soort, x, y, h, o): schouder bij (x, y), h = hoogte in px. Vaste botkleuren (BOT): opperarmbeen teal, spaakbeen + ellepijp oker, pols- en handbotten paars.
// Botten tellen (C9): mens 1 + 2 + 8 handwortel + 5 middenhand + 14 vingerkootjes; vleermuis 5 vingers, duim kort met klauw, vingers 2–5 heel lang, ellepijp dun en kort;
// walvis (bultrug) korte brede opperarm, platte spaakbeen en ellepijp, géén duim (4 vingers), veel kootjes in vinger 2 en 3; paard ellepijp gereduceerd en vergroeid,
// één teen (middenhandsbeen III = pijpbeen) met twee griffelbeentjes, drie kootjes en een hoef. o.huid = silhouet van het lidmaat erachter; o.u = opbouw 0..1 per groep.
function armSkelet(ctx, soort, x, y, h, o = {}) { const { a = 1, huid = 0.25, u = 1, nadruk = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const k = h / 400; ctx.scale(k, k);
  const F = (i) => clamp(u * 3 - i, 0, 1); const D = (g) => nadruk && nadruk !== g ? 0.3 : 1;
  const A = (g, i) => ({ a: F(i) * D(g) });
  const huidVorm = (P) => { if (huid > 0.01) vul(ctx, P, rgba('#C9B896', huid * 0.45), rgba('#C9B896', huid), 2); };
  if (soort === 'mens') {
    huidVorm([[-24, -10], [26, -8], [30, 150], [26, 300], [40, 330], [44, 410], [20, 418], [-30, 404], [-46, 350], [-30, 300], [-28, 150]]);
    bot(ctx, 0, 0, 0, 150, 24, BOT.arm, A('arm', 0));
    bot(ctx, -10, 158, -16, 292, 12, BOT.onder, A('onder', 1)); bot(ctx, 10, 158, 14, 292, 13, BOT.onder, A('onder', 1));
    const ha = A('hand', 2); for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) bot(ctx, -21 + i * 13, 300 + r * 13, -15 + i * 13, 302 + r * 13, 11, BOT.hand, { ...ha, kop: 1 });
    const vingers = [[-26, 322, 2, -0.38], [-14, 332, 3, -0.15], [0, 334, 3, 0], [13, 333, 3, 0.12], [25, 330, 3, 0.26]];
    vingers.forEach(([vx, vy, n, an], i) => { const ml = i === 0 ? 26 : 34; let px = vx, py = vy, nx = vx + Math.sin(an) * ml, ny = vy + Math.cos(an) * ml; bot(ctx, px, py, nx, ny, 8, BOT.hand, ha); px = nx; py = ny;
      for (let j = 0; j < n; j++) { const L = [20, 15, 11][j] * (i === 2 ? 1.1 : i === 4 ? 0.85 : 1); nx = px + Math.sin(an) * L; ny = py + Math.cos(an) * L; bot(ctx, px + Math.sin(an) * 2, py + Math.cos(an) * 2, nx, ny, 6.5, BOT.hand, ha); px = nx; py = ny; } });
  }
  if (soort === 'vleermuis') { // vleugel gespreid naar rechts-onder; vlieghuid tussen de vingers
    if (huid > 0.01) { ctx.save(); ctx.beginPath(); ctx.moveTo(-6, 6); ctx.lineTo(52, 104); ctx.lineTo(150, 196); ctx.lineTo(350, 140);
      ctx.quadraticCurveTo(330, 210, 384, 262); ctx.quadraticCurveTo(320, 270, 300, 322); ctx.quadraticCurveTo(250, 340, 250, 398); ctx.quadraticCurveTo(150, 360, 40, 380); ctx.quadraticCurveTo(10, 200, -6, 6); ctx.closePath();
      ctx.fillStyle = rgba('#8C7A6A', huid * 0.55); ctx.fill(); ctx.strokeStyle = rgba('#C9B896', huid); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    bot(ctx, 0, 0, 50, 100, 14, BOT.arm, A('arm', 0));
    bot(ctx, 54, 106, 148, 198, 9, BOT.onder, A('onder', 1)); bot(ctx, 54, 112, 84, 140, 4, BOT.onder, A('onder', 1));
    const ha = A('hand', 2); bot(ctx, 148, 198, 158, 206, 12, BOT.hand, { ...ha, kop: 1 }); bot(ctx, 142, 204, 152, 212, 10, BOT.hand, { ...ha, kop: 1 });
    // duim: kort, met klauw
    bot(ctx, 156, 196, 168, 176, 5, BOT.hand, ha); bot(ctx, 168, 176, 174, 164, 4, BOT.hand, ha); ctx.save(); ctx.globalAlpha *= ha.a; vul(ctx, [[172, 166], [186, 152], [176, 168]], '#2E2620'); ctx.restore();
    const V = [[350, 140, 3], [384, 262, 3], [300, 322, 2], [250, 398, 2]];
    V.forEach(([ex, ey, n], i) => { const sx = 156, sy = 208, mx = sx + (ex - sx) * 0.55, my = sy + (ey - sy) * 0.55; bot(ctx, sx, sy, mx, my, 6, BOT.hand, ha); let px = mx, py = my;
      for (let j = 0; j < n; j++) { const f = (j + 1) / n, nx = mx + (ex - mx) * f, ny = my + (ey - my) * f; bot(ctx, px, py, nx, ny, 4.5 - j, BOT.hand, ha); px = nx; py = ny; } });
  }
  if (soort === 'walvis') { // borstvin van de bultrug: korte opperarm, platte onderarm, vier lange vingers in één vin
    if (huid > 0.01) vul(ctx, [[-30, -6], [34, -4], [52, 90], [48, 200], [34, 330], [10, 410], [-14, 404], [-34, 320], [-50, 200], [-46, 90]], rgba('#D9DEE4', huid * 0.4), rgba('#D9DEE4', huid), 2);
    bot(ctx, 0, 0, 0, 70, 38, BOT.arm, A('arm', 0));
    bot(ctx, -13, 78, -16, 150, 22, BOT.onder, A('onder', 1)); bot(ctx, 13, 78, 16, 150, 24, BOT.onder, A('onder', 1));
    const ha = A('hand', 2); for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) bot(ctx, -20 + i * 18, 160 + r * 15, -14 + i * 18, 162 + r * 15, 14, BOT.hand, { ...ha, kop: 1 });
    const vingers = [[-26, 190, 4, -0.08], [-9, 192, 7, -0.02], [9, 192, 6, 0.03], [25, 190, 4, 0.1]];
    vingers.forEach(([vx, vy, n, an], i) => { let px = vx, py = vy; for (let j = 0; j < n + 1; j++) { const L = j === 0 ? 30 : [26, 24, 22, 20, 18, 16, 14][j - 1]; const nx = px + Math.sin(an) * L, ny = py + Math.cos(an) * L; bot(ctx, px, py, nx, ny, j === 0 ? 11 : 9 - j * 0.6, BOT.hand, { ...ha, kop: 1.15 }); px = nx; py = ny + 2; } });
  }
  if (soort === 'paard') { // staat op één teen; ellepijp vergroeid met het spaakbeen; twee griffelbeentjes
    if (huid > 0.01) vul(ctx, [[-40, -10], [40, -4], [62, 100], [40, 140], [38, 240], [30, 270], [28, 360], [40, 400], [-14, 404], [-4, 360], [-6, 270], [-14, 240], [-20, 140], [-40, 100]], rgba('#9A5E38', huid * 0.6), rgba('#C9B896', huid), 2);
    bot(ctx, 0, 0, 28, 104, 30, BOT.arm, A('arm', 0));
    bot(ctx, 22, 110, 14, 236, 22, BOT.onder, A('onder', 1)); bot(ctx, 30, 104, 22, 150, 9, BOT.onder, A('onder', 1));
    const ha = A('hand', 2); for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) bot(ctx, 2 + i * 10, 244 + r * 12, 6 + i * 10, 246 + r * 12, 11, BOT.hand, { ...ha, kop: 1 });
    bot(ctx, 12, 272, 12, 360, 17, BOT.hand, ha); bot(ctx, 0, 272, 2, 330, 5, BOT.hand, ha); bot(ctx, 24, 272, 23, 330, 5, BOT.hand, ha);
    bot(ctx, 13, 364, 15, 384, 15, BOT.hand, ha); bot(ctx, 15, 386, 16, 398, 14, BOT.hand, ha);
    ctx.save(); ctx.globalAlpha *= ha.a; vul(ctx, [[-2, 396], [34, 396], [42, 418], [-8, 418]], '#3A3430'); bot(ctx, 16, 400, 18, 410, 13, BOT.hand, ha); ctx.restore();
  }
  ctx.restore(); }

// ================= DNA ALS TWEE LETTERRIJEN =================
// rijen: [{naam, seq}] — verschillen met de eerste rij in goud; o.ins = [begin, eind] een ingevoegd stuk (paars, dikkere rand) dat in de gegeven rijen staat; o.cw = celbreedte
function dnaRijen(ctx, x, y, rijen, o = {}) { const { cw = 44, ch = 56, a = 1, ins = null, insIn = [], gap = 26, naamW = 220, toonVerschil = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const ref = rijen[0].seq; rijen.forEach((r, ri) => { const yy = y + ri * (ch + gap); text(ctx, r.naam, x + naamW - 24, yy + ch * 0.68, fTekst(36, 600), C.text, 'right');
    const heeftIns = insIn.includes(ri);
    [...r.seq].forEach((b, i) => { const xx = x + naamW + i * cw; const leeg = b === '-'; const inIns = ins && i >= ins[0] && i < ins[1];
      const diff = toonVerschil && ri > 0 && b !== ref[i] && !leeg;
      roundRect(ctx, xx + 3, yy, cw - 6, ch, 8);
      if (leeg) { ctx.setLineDash([5, 5]); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]); return; }
      shape(ctx, inIns ? rgba(C.paars, 0.55) : diff ? rgba(C.goud, 0.28) : rgba(C.paars, 0.22), inIns ? _lt(C.paars, 0.4) : diff ? C.goud : rgba(C.paars, 0.6), inIns || diff ? 2.5 : 1.2);
      text(ctx, b, xx + cw / 2, yy + ch * 0.7, fTekst(34, 700), diff ? C.goud : C.text, 'center'); }); });
  ctx.restore(); }

// ================= HALVERINGSGRAFIEK (koolstof-14) =================
function halveringsGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, n = 4, u = 1, maxLabel = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let i = 1; i <= n; i++) ctx.fillRect(x + i * w / n, y - h, 1.5, h);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 20, y); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 120 * u; i++) { const f = i / 120, px = x + f * w, py = y - h * Math.pow(0.5, f * n); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  for (let i = 0; i <= Math.min(n, Math.floor(n * u + 0.001)); i++) { const px = x + i * w / n, py = y - h * Math.pow(0.5, i); circ(ctx, px, py, 8, C.teal, _lt(C.teal, 0.4), 2); if (i <= maxLabel) text(ctx, String(Math.round(100 * Math.pow(0.5, i) * 10) / 10).replace('.', ',') + '%', px + 16, py - 14, fTekst(32, 700), C.text, 'left');
    metaText(ctx, i === 0 ? '0' : i + '×', px, y + 40, C.text2, 'center', 26); }
  metaText(ctx, '× 5730 jaar', x + w, y + 80, C.text2, 'right', 26); metaText(ctx, 'koolstof-14 over', x, y - h - 70, C.grain, 'left', 26);
  ctx.restore(); }

// ================= TIJDAS (miljoenen jaren) =================
// van links (oud) naar rechts (nu); o.van = 60 (Mj), o.merk = [{mj, tekst, kleur}]
function tijdAs(ctx, x, y, w, o = {}) { const { van = 60, a = 1, merk = [], stap = 10 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); pijl(ctx, x + w - 10, y, x + w + 20, y, C.line, 1, 3, 14);
  for (let m = van; m >= 0; m -= stap) { const px = x + (1 - m / van) * w; ctx.beginPath(); ctx.moveTo(px, y - 10); ctx.lineTo(px, y + 10); ctx.stroke(); metaText(ctx, m === 0 ? 'nu' : String(m), px, y + 46, C.text2, 'center', 26); }
  metaText(ctx, 'miljoen jaar geleden', x, y + 86, C.text2, 'left', 26);
  merk.forEach(mk => { const px = x + (1 - mk.mj / van) * w; circ(ctx, px, y, 10, mk.kleur || C.goud, _lt(mk.kleur || C.goud, 0.4), 2); if (mk.tekst) naamBij(ctx, mk.tekst, mk.meta || null, px, y - 30, 1, 'center', mk.kleur === C.goud ? C.goud : C.text); });
  ctx.restore(); return (mj) => x + (1 - mj / van) * w; }

// ================= MENSELIJK STAARTBEEN (schema) =================
// onderste deel van de wervelkolom: lendenwervels, heiligbeen, staartbeen (3–5 vergroeide wervels) in goud
function staartbeen(ctx, x, y, s = 1, o = {}) { const { a = 1, nadruk = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -34, -260 + i * 54, 68, 44, 10); shape(ctx, BOT.kaal, BOT.kaalR, 1.5); }
  vul(ctx, [[-56, -94], [56, -94], [40, -10], [16, 26], [-16, 26], [-40, -10]], BOT.kaal, BOT.kaalR, 1.5);
  const sk = nadruk ? C.goud : BOT.kaal; for (let i = 0; i < 4; i++) { roundRect(ctx, -14 + i * 2.5, 32 + i * 22, 28 - i * 5, 18, 6); shape(ctx, sk, _lt(sk, 0.35), 1.5); }
  ctx.restore(); }

// ================= HAAI (grijze rifhaai, Carcharhinus-type) — gedeeld met film 8 =================
// Recept: ±2 m; lengte 500 eenheden. Spoelvormig, puntige snuit, onderstandige bek, vijf kieuwspleten vóór de borstvin, hoge driehoekige rugvin op ±40% van de kop,
// borstvinnen laag en sikkelvormig, heterocerke staartvin (verticaal, bovenlob langer). Oog rond met donkere iris. Bekende fout: staartvin horizontaal (dat is een walvis).
// o.rontgen 0..1: kraakbeenstralen in de borstvin en kraakbeenskelet (geen botten).
function haai(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const rug = '#6E7A86', buik = '#D4D8DC', d = '#56616C'; const sl = Math.sin(t * 3) * 0.12; const r = 1 - rontgen * 0.75;
  ctx.save(); ctx.globalAlpha *= r;
  ctx.save(); ctx.translate(-200, -4); ctx.rotate(sl); vul(ctx, [[10, -8], [-30, -26], [-74, -78], [-88, -84], [-70, -30], [-54, 0], [-74, 30], [-86, 44], [-60, 34], [-20, 12], [10, 8]], rug, _lt(rug, 0.2), 2); ctx.restore();
  vul(ctx, [[60, -40], [30, -100], [16, -108], [0, -98], [-10, -40]], rug, _lt(rug, 0.2), 2); vul(ctx, [[-120, -18], [-132, -40], [-140, -18]], rug);
  const R = [[250, 4], [232, -18], [180, -36], [100, -46], [0, -46], [-100, -32], [-170, -16], [-206, -4], [-170, 10], [-100, 20], [0, 34], [100, 34], [180, 26], [230, 16]];
  vul(ctx, R, rug, _lt(rug, 0.18), 2); binnen(ctx, R, () => vul(ctx, [[260, 6], [150, 4], [0, 8], [-200, 0], [-200, 60], [260, 60]], buik));
  ctx.strokeStyle = _dk(rug, 0.35); ctx.lineWidth = 2.2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(150 - i * 11, -16); ctx.quadraticCurveTo(146 - i * 11, 0, 150 - i * 11, 14); ctx.stroke(); }
  lijn(ctx, [[222, 18], [204, 24], [190, 22]], '#2A3038', 2); dierOog(ctx, 204, -12, 5, '#1A2026');
  vul(ctx, [[-60, 22], [-80, 46], [-70, 44], [-50, 26]], d);
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, R, null, rgba(C.line, 0.9), 2);
    ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(220, -4); ctx.lineTo(-200, -4); ctx.stroke(); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const xx = 190 - i * 15; ctx.beginPath(); ctx.moveTo(xx, -10); ctx.lineTo(xx, 2); ctx.stroke(); }
    ctx.restore(); }
  // borstvin (vastzittend achter de kieuwen, laag aan de buik)
  ctx.save(); ctx.translate(110, 24); vul(ctx, [[10, -4], [-20, 30], [-62, 72], [-74, 74], [-56, 40], [-30, 4]], rontgen > 0.01 ? rgba('#6E7A86', 0.25) : d, rontgen > 0.01 ? C.line : null, 2);
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 2.5; for (let i = 0; i < 9; i++) { const f = i / 8; ctx.beginPath(); ctx.moveTo(-6 - f * 20, 4 + f * 4); ctx.lineTo(-30 - f * 36, 36 + f * 32); ctx.stroke(); } bot(ctx, 4, -6, -26, 4, 7, '#B8C8C0'); ctx.restore(); }
  ctx.restore();
  ctx.restore(); }

function tijdAsMj(ctx, x, y, w, van, tot, o = {}) { const { a = 1, stap = 5, nu = false } = o; ctx.save(); ctx.globalAlpha *= a; const w2 = nu ? w - 160 : w; const X = (mj) => mj <= 0.001 && nu ? x + w : x + (van - mj) / (van - tot) * w2;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w2, y); ctx.stroke();
  for (let m = van; m >= tot - 0.001; m -= stap) { const px = X(m); ctx.beginPath(); ctx.moveTo(px, y - 10); ctx.lineTo(px, y + 10); ctx.stroke(); metaText(ctx, String(m), px, y + 46, C.text2, 'center', 26); }
  if (nu) { ctx.beginPath(); ctx.moveTo(x + w2 + 20, y + 14); ctx.lineTo(x + w2 + 34, y - 14); ctx.moveTo(x + w2 + 36, y + 14); ctx.lineTo(x + w2 + 50, y - 14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + w2 + 66, y); ctx.lineTo(x + w, y); ctx.stroke(); metaText(ctx, 'nu', x + w, y + 46, C.text2, 'center', 26); }
  metaText(ctx, 'miljoen jaar geleden', x, y + 86, C.text2, 'left', 26); ctx.restore(); return X; }
