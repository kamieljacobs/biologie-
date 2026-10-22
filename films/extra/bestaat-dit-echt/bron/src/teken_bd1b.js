// Bestaat dit echt? — dierenbibliotheek deel 2 (herzien na de eerste controle, 22 okt 2026)

// ================= 3. BIDSPRINKHAANKREEFT (Odontodactylus scyllarus) =================
// Eén doorlopend lijf (kopborst + 6 achterlijfsegmenten als banden) dat naar achter iets smaller wordt, staartwaaier eraan vast,
// steelogen met middenband, oranje antenneschubben, slagarm gevouwen als een bidsprinkhaan onder de kop (o.slag 0..1).
function bidsprinkhaankreeft(ctx, x, y, s = 1, o = {}) { const { t = 0, slag = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const groen = '#3F8E6A', groenL = '#7FC4A0', groenD = '#2A6A4E', oranje = '#E0603A', rood = '#C8402E', blauw = '#4A9AC8';
  const pootje = (px, ver, i) => { ctx.save(); ctx.translate(px, -46); ctx.rotate(0.15 + Math.sin(t * 3 + i + (ver ? 2 : 0)) * 0.06); lijn(ctx, [[0, 0], [-8, 24], [-2, 44]], ver ? _dk(oranje, 0.3) : oranje, ver ? 4.5 : 5.5); ctx.restore(); };
  [-6, 26, 58].forEach((px, i) => pootje(px + 8, true, i));
  // staartwaaier (telson + uropoden met blauw en oranje)
  vul(ctx, [[-196, -96], [-246, -128], [-276, -118], [-268, -92], [-226, -70]], blauw, '#8AC4E0', 2);
  vul(ctx, [[-196, -58], [-246, -40], [-276, -50], [-268, -74], [-226, -88]], blauw, '#8AC4E0', 2);
  circ(ctx, -250, -116, 6, oranje); circ(ctx, -250, -50, 6, oranje);
  vul(ctx, [[-190, -96], [-248, -92], [-262, -80], [-248, -68], [-190, -62]], groenD, groenL, 2);
  // lijf
  const L = [[-200, -98], [-150, -116], [-80, -124], [0, -126], [60, -124], [120, -118], [168, -106], [192, -86], [186, -62], [150, -50], [80, -44], [0, -44], [-80, -46], [-150, -52], [-200, -64]];
  vul(ctx, L, groen, groenL, 2.5);
  binnen(ctx, L, () => { ctx.strokeStyle = groenL; ctx.lineWidth = 3; [-160, -120, -80, -40, 0, 40].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -130); ctx.quadraticCurveTo(sx + 12, -86, sx, -40); ctx.stroke(); });
    ctx.strokeStyle = groenD; ctx.lineWidth = 2; [-156, -116, -76, -36, 4].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -128); ctx.quadraticCurveTo(sx + 12, -86, sx, -40); ctx.stroke(); });
    for (let i = 0; i < 30; i++) { const cx = 50 + hash(i * 1.9) * 140, cy = -124 + hash(i * 3.7) * 70; circ(ctx, cx, cy, 3 + hash(i * 7) * 3, '#1E3A2C'); circ(ctx, cx, cy, 1.4, '#9FD4B8'); }
    ctx.fillStyle = rgba('#000000', 0.12); ctx.fillRect(-210, -62, 420, 30); });
  // zwempootjes
  for (let i = 0; i < 5; i++) { const px = -170 + i * 40; lijn(ctx, [[px, -48], [px - 8 + Math.sin(t * 6 + i) * 4, -30]], _dk(oranje, 0.1), 4); }
  // kop (vooraan de kopborst): hier groeien ogen, voelsprieten en antenneschubben uit
  const KOP = [[150, -116], [184, -122], [208, -116], [222, -100], [218, -82], [196, -70], [168, -72]];
  vul(ctx, KOP, groen, groenL, 2.5); binnen(ctx, KOP, () => { for (let i = 0; i < 6; i++) circ(ctx, 160 + hash(i * 4.1) * 50, -112 + hash(i * 2.7) * 34, 3, '#1E3A2C'); });
  // antenneschub: oranje peddel, vast aan de zijkant van de kop
  vul(ctx, [[204, -98], [236, -120], [256, -114], [244, -94], [214, -86]], oranje, rood, 2);
  // voelsprieten: twee paar, beginnen aan de voorkant van de kop
  const zw = Math.sin(t * 2) * 6; lijn(ctx, [[214, -108], [252, -146], [310, -160 + zw]], '#E8C9A8', 2.5); lijn(ctx, [[216, -104], [262, -132], [326, -134 + zw]], '#E8C9A8', 2.5);
  lijn(ctx, [[218, -96], [270, -104], [340, -96 - zw * 0.6]], '#E8C9A8', 2); 
  // steelogen met middenband: stelen staan op de kop
  [[196, -116, 0], [186, -118, 1]].forEach(([ex, ey, i]) => { const ox = ex + 10 - i * 6, oy = ey - 30 + i * 4; lijn(ctx, [[ex, ey + 6], [ox, oy + 12]], groenD, 10); ctx.save(); ctx.translate(ox, oy); ctx.rotate(-0.2 + i * 0.25); ctx.beginPath(); ctx.ellipse(0, 0, 12, 16, 0, 0, 6.283); ctx.fillStyle = i ? '#3A6A8A' : '#5A8AAA'; ctx.fill(); ctx.fillStyle = '#C9B896'; ctx.fillRect(-12, -3, 24, 6); ctx.fillStyle = '#0C1014'; ctx.fillRect(-12, -1, 24, 2); ctx.restore(); });
  // slagarm: dij (merus) schuin naar voren-onder, knots erop teruggevouwen; bij de slag klapt de knots naar voren
  const sl = ease(slag); ctx.save(); ctx.translate(168, -60); ctx.rotate(0.55);
  roundRect(ctx, -10, -10, 58, 22, 10); ctx.fillStyle = groenD; ctx.fill(); ctx.strokeStyle = groenL; ctx.lineWidth = 2; ctx.stroke();
  ctx.translate(46, 0); ctx.rotate(lerp(-2.75, -0.55, sl));
  ctx.beginPath(); ctx.ellipse(32, 0, 34, 15, 0, 0, 6.283); ctx.fillStyle = rood; ctx.fill(); ctx.strokeStyle = '#F0A080'; ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, 66, 0, 11, '#F2D6C0', '#C88A70', 2); ctx.restore();
  [-6, 26, 58].forEach((px, i) => pootje(px, false, i));
  ctx.restore(); }

// ================= 4. PISTOOLGARNAAL (Alpheus) =================
// Lijf ±3,5 cm, knalschaar ongeveer half zo lang als het lijf; het beweeglijke vingertje (dactylus) scharniert bovenaan
// de palm en heeft een plunjer die in een kuiltje van de vaste vinger past. o.open 0..1, o.bel 0..1
function pistoolgarnaal(ctx, x, y, s = 1, o = {}) { const { t = 0, open = 0, bel = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const lijf = '#E3A27A', licht = '#F4C8A8', band = '#B8664A', schaar = '#D0703E', schaarL = '#F0A070';
  for (let i = 0; i < 4; i++) { const px = -30 + i * 30; lijn(ctx, [[px, -48], [px - 6, -24], [px - 2, 0]], _dk(lijf, 0.2), 3.5); }
  vul(ctx, [[-170, -78], [-224, -104], [-244, -84], [-234, -58], [-176, -54]], licht, band, 2);
  const LIJF = [[-180, -76], [-140, -98], [-80, -110], [-10, -114], [50, -110], [100, -100], [128, -86], [124, -64], [84, -52], [20, -46], [-60, -46], [-130, -50], [-180, -58]];
  vul(ctx, LIJF, lijf, licht, 2);
  binnen(ctx, LIJF, () => { ctx.strokeStyle = band; ctx.lineWidth = 6; [-150, -110, -70, -30, 10].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -120); ctx.quadraticCurveTo(sx + 10, -80, sx, -40); ctx.stroke(); }); });
  // oogkapje met de ogen eronder
  vul(ctx, [[86, -106], [118, -112], [138, -98], [126, -84], [94, -88]], _lt(lijf, 0.2), band, 1.5); circ(ctx, 116, -98, 6, 'rgba(20,10,8,0.55)');
  lijn(ctx, [[128, -100], [210, -150], [290, -140 + Math.sin(t * 2) * 8]], '#E8C9A8', 2); lijn(ctx, [[130, -94], [220, -118], [300, -96 + Math.sin(t * 2 + 1) * 8]], '#E8C9A8', 2);
  // knalschaar
  ctx.save(); ctx.translate(96, -66); lijn(ctx, [[0, 0], [30, -2], [52, 0]], schaar, 13);
  ctx.translate(52, 0);
  vul(ctx, [[0, -26], [50, -34], [110, -30], [130, -14], [176, 0], [180, 10], [130, 18], [70, 24], [8, 20], [-6, -2]], schaar, schaarL, 2); // palm + vaste vinger
  circ(ctx, 132, 2, 6, _dk(schaar, 0.35)); // kuiltje
  ctx.save(); ctx.translate(120, -24); ctx.rotate(-lerp(0, 1.25, ease(open)));
  vul(ctx, [[0, 0], [30, -4], [62, 6], [66, 18], [40, 18], [4, 14]], _dk(schaar, 0.08), schaarL, 2); circ(ctx, 14, 22, 6, _dk(schaar, 0.25)); ctx.restore(); // dactylus met plunjer
  if (bel > 0.01) { const r = 30 * Math.sin(Math.PI * clamp(bel, 0, 1)); circ(ctx, 196, 4, r, 'rgba(220,240,255,0.22)', 'rgba(230,245,255,0.85)', 2); }
  ctx.restore();
  ctx.restore(); }

// ================= 10. LIERVOGEL (Menura novaehollandiae), mannetje =================
// Fazantachtig bruin lijf, roodbruine vleugels, lange sterke grijze poten met grote tenen; staart langer dan het lijf:
// 2 lierveren (S-vormig, licht/donker gebandeerd, zwarte punt), 12 kantachtige draadveren, 2 smalle middenveren.
// o.toon 0..1: staart in rust naar achter → als zilveren sluier naar voren over rug en kop.
function liervogel(ctx, x, y, s = 1, o = {}) { const { t = 0, toon = 0, zing = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const bruin = '#6E5038', bruinL = '#9A7A5A', grijs = '#5E6168', roest = '#A8643A';
  const u = ease(toon), B = [-70, -190];
  const veer = (kop, krom, len, soort, i) => { let ang = kop, px = B[0], py = B[1]; const P = [[px, py]]; const n = 14;
    for (let k = 1; k <= n; k++) { const v = k / n; ang += (soort === 'lier' ? krom * Math.cos(v * Math.PI) : krom) / n; px += Math.cos(ang) * len / n; py += Math.sin(ang) * len / n; P.push([px, py]); }
    if (soort === 'lier') { ctx.lineCap = 'butt'; for (let k = 0; k < n; k++) { ctx.strokeStyle = k === n - 1 ? '#1E1612' : (k % 2 ? '#7A5636' : '#E2CDA8'); ctx.lineWidth = lerp(9, 17, k / n); ctx.beginPath(); ctx.moveTo(P[k][0], P[k][1]); ctx.lineTo(P[k + 1][0], P[k + 1][1]); ctx.stroke(); } }
    else if (soort === 'draad') { lijn(ctx, P, rgba('#DCD8D0', 0.8), 1.4); ctx.strokeStyle = rgba('#CFCAC0', 0.45); ctx.lineWidth = 1; for (let k = 3; k < n; k++) { const [qx, qy] = P[k], dx = P[k][0] - P[k - 1][0], dy = P[k][1] - P[k - 1][1], d = Math.hypot(dx, dy) || 1; const nx = -dy / d * 9, ny = dx / d * 9; ctx.beginPath(); ctx.moveTo(qx + nx, qy + ny); ctx.lineTo(qx, qy); ctx.lineTo(qx - nx, qy - ny); ctx.stroke(); } }
    else lijn(ctx, P, '#3A2E26', 3); };
  const zw = (i) => u > 0.5 ? Math.sin(t * 9 + i) * 0.02 * u : 0; // trillen tijdens de baltsdans
  // draadveren en middenveren: rust = naar achter (iets omlaag), toon = omhoog en naar voren over de kop
  for (let i = 0; i < 12; i++) { const f = i / 11 - 0.5; veer(lerp(Math.PI - 0.42 + f * 0.14, -Math.PI / 2 + f * 1.5, u) + zw(i), lerp(-0.25, 1.2, u), 330 + hash(i) * 30, 'draad', i); }
  veer(lerp(Math.PI - 0.4, -Math.PI / 2 - 0.1, u), lerp(-0.25, 1.1, u), 340, 'mid', 30); veer(lerp(Math.PI - 0.44, -Math.PI / 2 + 0.1, u), lerp(-0.25, 1.1, u), 345, 'mid', 31);
  veer(lerp(Math.PI - 0.5, -Math.PI / 2 - 1.05, u) + zw(40), lerp(0.5, 1.6, u), 320, 'lier', 40); veer(lerp(Math.PI - 0.34, -Math.PI / 2 + 1.0, u) + zw(41), lerp(-0.6, 0.9, u), 320, 'lier', 41);
  // poten: loop (tarsus) schuin, 3 tenen naar voren en 1 naar achter
  [[-6, 0], [18, 1]].forEach(([px, i]) => { const col = i ? grijs : _dk(grijs, 0.2); lijn(ctx, [[px, -128], [px - 6, -70], [px + 4, -8]], col, 9); [[34, 4], [24, -2], [14, 6]].forEach(([dx, dy]) => lijn(ctx, [[px + 4, -6], [px + 4 + dx, dy]], col, 5)); lijn(ctx, [[px + 4, -6], [px - 16, 0]], col, 5); });
  [[-10, 1], [14, 0]].forEach(([px, i]) => { ctx.beginPath(); ctx.ellipse(px, -140, 26, 30, 0.2, 0, 6.283); ctx.fillStyle = i ? _dk(bruin, 0.2) : bruin; ctx.fill(); }); // dijen in de veren
  // lijf (borst omhoog), vleugel, kop
  const L = [[-90, -186], [-50, -224], [10, -238], [60, -246], [92, -270], [110, -298], [132, -312], [154, -306], [158, -288], [140, -270], [124, -244], [110, -206], [80, -164], [30, -136], [-30, -130], [-80, -150]];
  vul(ctx, L, bruin, bruinL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -210], [110, -220], [100, -160], [40, -140]], '#8A7A6A'); vul(ctx, [[-70, -200], [-10, -226], [60, -214], [40, -170], [-40, -160]], roest);
    ctx.strokeStyle = rgba('#3A2414', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 18, -214 + i * 2); ctx.quadraticCurveTo(-30 + i * 18, -190, -40 + i * 18, -164); ctx.stroke(); } });
  const sn = zing * 0.3; ctx.save(); ctx.translate(156, -296); vul(ctx, [[0, -5], [24, 0], [0, 1]], '#2A2420'); ctx.rotate(sn); vul(ctx, [[0, 1], [20, 3], [0, 5]], '#2A2420'); ctx.restore();
  dierOog(ctx, 138, -298, 5, '#1E1410', { rand: '#7A8494' });
  ctx.restore(); }
