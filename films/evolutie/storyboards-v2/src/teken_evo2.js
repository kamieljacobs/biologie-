// Evolutie v2 · film 2 Natuurlijke selectie — nieuwe tekeningen (22 okt 2026). Ook gebruikt door film 3 (zangvogellijf, zaadjes).
// Elk dier: f(ctx, x, y, s, o). Anker (x, y) = midden onder de voeten; kop naar rechts (o.kijk = -1 spiegelt). Recepten volgens Part C9.

// ===================================================================================
// MIDDELSTE GRONDVINK (Geospiza fortis). Recept: lengte ± 12,5 cm; 1 eenheid = 0,5 mm (lijf 250 eenheden lang).
// Snavel: kegel, hoogte aan de basis 7–12 mm (gemiddeld ± 9,3 mm vóór 1977), lengte ± 1,3 × de hoogte; bovensnavel iets gebogen.
// Kop groot (± 20 mm), korte staart (± 40 mm), tarsus ± 20 mm, 3 tenen voor + 1 achter. Man zwart, vrouw/jong bruin gestreept;
// snavel van de vrouw hoornkleurig, van de man in de broedtijd zwart. Bekende fouten: snavel als driehoekje los voor de kop; zwarte vogel onzichtbaar op nacht.
// o.snavel = hoogte in mm; o.kleed = 'vrouw' | 'man'; o.snavelKleur overschrijft (betekeniskleur bij selectie); o.pik = 0..1 kop omlaag (eet).
function grondvink(ctx, x, y, s = 1, o = {}) {
  const { snavel = 9.3, kleed = 'vrouw', kijk = 1, a = 1, snavelKleur = null, pik = 0, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const man = kleed === 'man';
  const veer = man ? '#2B2A2C' : '#7A6450', veerL = man ? '#4A484C' : '#A38A6E', buik = man ? '#38363A' : '#C9B79C', streep = man ? '#1C1B1D' : '#5A4636';
  const snv = snavelKleur || (man ? '#232224' : '#C8B48C'), snvL = snavelKleur ? _lt(snavelKleur, 0.35) : (man ? '#4A4A4E' : '#E2D2AE');
  // poten: tarsus schuin, tenen
  for (const [px, ver] of [[-6, true], [8, false]]) { const col = ver ? '#3A3430' : '#4E4640';
    lijn(ctx, [[px - 2, -44], [px, 0]], col, 5); lijn(ctx, [[px, -1], [px + 22, 0]], col, 3.5); lijn(ctx, [[px, -1], [px + 16, 3]], col, 3.5); lijn(ctx, [[px, -1], [px - 14, 0]], col, 3.5); }
  // tak waarop hij zit (optioneel)
  if (o.tak) { lijn(ctx, [[-120, 4], [130, 0]], '#5A4636', 9); }
  // staart: kort, smal, iets omlaag
  vul(ctx, [[-66, -70], [-108, -56], [-112, -46], [-102, -44], [-62, -52]], _dk(veer, 0.1), veerL, 1.5);
  // lijf
  const L = [[34, -64], [28, -96], [6, -112], [-30, -108], [-62, -88], [-76, -66], [-66, -48], [-36, -38], [0, -36], [26, -44]];
  vul(ctx, L, veer, veerL, 2);
  binnen(ctx, L, () => { vul(ctx, [[40, -84], [10, -70], [-40, -54], [-70, -40], [0, -20], [50, -40]], buik);
    ctx.strokeStyle = streep; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const px = 20 - i * 9, py = -70 + (i % 3) * 7; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 6, py + 9); ctx.stroke(); } });
  // vleugel: gevouwen, met slagpennen als randjes
  const V = [[18, -96], [-10, -104], [-46, -96], [-82, -74], [-96, -62], [-60, -64], [-20, -70], [10, -78]];
  vul(ctx, V.map(([a,b])=>[a>-80?a:a+14,b]), _dk(veer, 0.18), veerL, 1.5);
  ctx.strokeStyle = veerL; ctx.lineWidth = 1.5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-30 - i * 14, -92 + i * 5); ctx.lineTo(-56 - i * 12, -70 + i * 2); ctx.stroke(); }
    // kop (kantelt bij pikken)
  ctx.save(); ctx.translate(26, -104); ctx.rotate(pik * 0.6);
  const K = [[-18, 6], [-16, -14], [-2, -26], [16, -26], [30, -16], [34, 0], [26, 14], [6, 18], [-12, 16]];
  vul(ctx, K, veer, veerL, 2);
  binnen(ctx, K, () => { if (!man) { ctx.strokeStyle = streep; ctx.lineWidth = 1.6; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-8 + i * 6, -22 + (i % 2) * 3); ctx.lineTo(-10 + i * 6, -14 + (i % 2) * 3); ctx.stroke(); } } });
  // snavel: hoogte = snavel mm × 2 eenheden, basis vast in de kop
  const hS = snavel * 2.2, lS = hS * 1.2, bx = 22, by = 0;
  const top = [bx - 4, by - hS * 0.55], tip = [bx + lS, by + hS * 0.12], ond = [bx - 2, by + hS * 0.45];
  ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.quadraticCurveTo(bx + lS * 0.55, by - hS * 0.62, tip[0], tip[1]); ctx.quadraticCurveTo(bx + lS * 0.5, by + hS * 0.42, ond[0], ond[1]); ctx.closePath();
  ctx.fillStyle = snv; ctx.fill(); ctx.strokeStyle = snvL; ctx.lineWidth = 1.5; ctx.stroke();
  // snavelnaad (mondhoek) en neusgat
  ctx.strokeStyle = _dk(snv, 0.4); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(bx - 2, by + hS * 0.05); ctx.quadraticCurveTo(bx + lS * 0.5, by + hS * 0.12, tip[0] - 1, tip[1]); ctx.stroke();
  circ(ctx, bx + 4, by - hS * 0.3, 1.6, _dk(snv, 0.45));
  dierOog(ctx, 12, -6, 4.6, '#2A1A10', { rand: man ? null : '#E6DCC6' });
  ctx.restore();
  ctx.restore();
}

// ===================================================================================
// ZANGVOGELLIJF met grote snavel — ZWARTBUIKZAADKRAKER (Pyrenestes ostrinus) staat in teken_evo3.js en gebruikt grondvink-maten niet.

// ===================================================================================
// TRIBULUS-ZAAD (Tribulus cistoides, één deelvrucht = mericarp). Recept: ± 8 mm lang, wigvormig, hard, met twee lange stekels en
// enkele kortere knobbels; geelbruin. Bekende fout: rond knikkertje. s: 1 eenheid = 0,1 mm bij s=1 (± 80 eenheden lang).
function tribulus(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, kleur = '#B0905A' } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  const d = _dk(kleur, 0.2);
  // twee lange en twee korte doornen: spits toelopend, vast op de rug van de deelvrucht
  for (const [bx, tx, ty, w] of [[-14, -30, -66, 7], [14, 34, -66, 7], [-30, -52, -30, 5], [30, 56, -28, 5]]) { ctx.beginPath(); ctx.moveTo(bx - w, -12); ctx.lineTo(tx, ty); ctx.lineTo(bx + w, -12); ctx.closePath(); ctx.fillStyle = d; ctx.fill(); }
  // wigvormige deelvrucht met ribbels (bovenaanzicht van opzij)
  const P = [[-44, 14], [-38, -10], [-16, -20], [16, -20], [38, -10], [44, 14], [20, 22], [-20, 22]];
  vul(ctx, P, kleur, _lt(kleur, 0.3), 2);
  binnen(ctx, P, () => { ctx.strokeStyle = d; ctx.lineWidth = 2; for (const k of [-24, -8, 8, 24]) { ctx.beginPath(); ctx.moveTo(k * 1.2, -18); ctx.lineTo(k, 22); ctx.stroke(); }
    ctx.fillStyle = d; for (const [px, py] of [[-30, 2], [-16, 8], [0, 0], [16, 8], [30, 2]]) { ctx.beginPath(); ctx.moveTo(px, py - 6); ctx.lineTo(px + 4, py + 3); ctx.lineTo(px - 4, py + 3); ctx.closePath(); ctx.fill(); } });
  ctx.restore(); }
// klein zacht zaadje (± 1–2 mm), zelfde schaal als tribulus
function zaadje(ctx, x, y, s = 1, o = {}) { const { a = 1, kleur = '#D9C08A', rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  ctx.beginPath(); ctx.ellipse(0, 0, 9, 6, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); ctx.strokeStyle = _lt(kleur, 0.3); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }

// ===================================================================================
// RUPS (spanner-/uilrups, groen). Recept: ± 3 cm; één doorlopende lijfvorm met segmentbanden erin (C9), kopkapsel rond;
// 3 paar borstpoten vóór, buikpoten (4 paar) achter en 1 paar naschuivers; ademgaten als stipjes langs de zij; lichte zijstreep.
// Bekende fout: losse bolletjes als kralenketting. Eenheid: 1 = 0,1 mm (lengte ± 300). kleur = rupskleur.
function rups(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, kleur = '#86B85A', t = 0, krom = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const n = 24, pts = []; for (let i = 0; i <= n; i++) { const u = i / n; const xx = -150 + u * 290; const yy = -18 - Math.sin(u * Math.PI) * krom * 60; pts.push([xx, yy]); }
  const r = (u) => 17 * (0.8 + 0.2 * Math.sin(Math.min(1, u * 1.3) * 1.57));
  const boven = pts.map(([px, py], i) => [px, py - r(i / n)]), onder = pts.map(([px, py], i) => [px, py + r(i / n)]).reverse();
  // poten
  const pootKl = _dk(kleur, 0.25);
  for (const u of [0.86, 0.91, 0.96]) { const i = Math.round(u * n), [px, py] = pts[i]; lijn(ctx, [[px, py + 10], [px + 4, py + 20]], pootKl, 5); }
  for (const u of [0.38, 0.46, 0.54, 0.62, 0.02]) { const i = Math.round(u * n), [px, py] = pts[i]; roundRect(ctx, px - 7, py + 6, 14, 16, 5); ctx.fillStyle = pootKl; ctx.fill(); }
  const LIJF = boven.concat(onder);
  ctx.beginPath(); ctx.moveTo(...LIJF[0]); for (const p of LIJF) ctx.lineTo(...p); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  ctx.save(); ctx.clip();
  ctx.fillStyle = _lt(kleur, 0.25); ctx.beginPath(); pts.forEach(([px, py], i) => { const yy = py + r(i / n) * 0.35; i ? ctx.lineTo(px, yy) : ctx.moveTo(px, yy); }); pts.slice().reverse().forEach(([px, py], i) => ctx.lineTo(px, py + r(1 - i / n) * 0.62)); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = _dk(kleur, 0.18); ctx.lineWidth = 2; for (let k = 1; k < 12; k++) { const i = Math.round(k / 12 * n), [px, py] = pts[i]; ctx.beginPath(); ctx.moveTo(px, py - 20); ctx.quadraticCurveTo(px + 3, py, px, py + 20); ctx.stroke(); }
  ctx.fillStyle = _dk(kleur, 0.45); for (let k = 1; k < 11; k++) { const i = Math.round(k / 12 * n), [px, py] = pts[i]; circ(ctx, px + 6, py + 2, 2.2, _dk(kleur, 0.5)); }
  ctx.restore();
  ctx.beginPath(); ctx.moveTo(...LIJF[0]); for (const p of LIJF) ctx.lineTo(...p); ctx.closePath(); ctx.strokeStyle = _lt(kleur, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
  // kopkapsel
  const [hx, hy] = pts[n]; ctx.beginPath(); ctx.ellipse(hx + 6, hy + 2, 15, 15, 0, 0, 6.283); ctx.fillStyle = _dk(kleur, 0.08); ctx.fill(); ctx.strokeStyle = _lt(kleur, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
  circ(ctx, hx + 12, hy - 2, 2.4, '#1A1A12'); circ(ctx, hx + 8, hy + 3, 2, '#1A1A12'); lijn(ctx, [[hx + 18, hy + 10], [hx + 22, hy + 14]], _dk(kleur, 0.5), 2);
  ctx.restore(); }

// BLAD (loofblad, bijv. eik/berk-achtig ovaal met tanden): steel links-onder, punt rechts; nerven. lengte ± 2·w.
function blad(ctx, x, y, w, o = {}) { const { a = 1, rot = 0, kleur = '#5FA86E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const P = []; const n = 30; for (let i = 0; i <= n; i++) { const u = i / n; const hw = Math.sin(u * Math.PI) ** 0.8 * w * 0.42 * (1 + 0.04 * Math.sin(u * 60)); P.push([u * 2 * w, -hw]); }
  for (let i = n; i >= 0; i--) { const u = i / n; const hw = Math.sin(u * Math.PI) ** 0.8 * w * 0.42 * (1 + 0.04 * Math.sin(u * 60 + 1)); P.push([u * 2 * w, hw]); }
  lijn(ctx, [[-w * 0.3, 0], [0, 0]], _dk(kleur, 0.2), w * 0.04);
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill(); ctx.strokeStyle = _lt(kleur, 0.2); ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = _lt(kleur, 0.25); ctx.lineWidth = Math.max(1.5, w * 0.012); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w * 1.95, 0); ctx.stroke();
  ctx.lineWidth = Math.max(1, w * 0.007); for (let k = 1; k < 8; k++) { const u = k / 8; const hw = Math.sin(u * Math.PI) ** 0.8 * w * 0.36; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(u * 2 * w, 0); ctx.quadraticCurveTo(u * 2 * w + w * 0.1, sg * hw * 0.5, u * 2 * w + w * 0.22, sg * hw); ctx.stroke(); } }
  ctx.restore(); }

// ===================================================================================
// MEREL (Turdus merula), man. Recept: ± 25 cm (± 2× de lengte van een grondvink); zwart met lichtere veerranden (anders onzichtbaar op nacht),
// oranjegele snavel en oogring; staart lang (± 40 % van de lengte); rechtop, kop iets schuin (zoekt). Eenheid 1 = 1 mm.
function merel(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, pik = 0, prooi = null } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const zw = '#2C2B30', zwL = '#55545C'; ctx.lineJoin = 'round';
  for (const [px, ver] of [[-8, true], [8, false]]) { const col = ver ? '#3E3226' : '#5A4838'; lijn(ctx, [[px - 4, -40], [px, 0]], col, 4); lijn(ctx, [[px, -1], [px + 18, 0]], col, 2.5); lijn(ctx, [[px, -1], [px + 12, 3]], col, 2.5); lijn(ctx, [[px, -1], [px - 12, 0]], col, 2.5); }
  // staart (lang, schuin omlaag)
  vul(ctx, [[-50, -74], [-132, -40], [-136, -30], [-122, -26], [-44, -52]], _dk(zw, 0.1), zwL, 1.5);
  const L = [[40, -84], [30, -112], [0, -124], [-36, -114], [-60, -88], [-62, -60], [-40, -42], [0, -38], [30, -52]];
  vul(ctx, L, zw, zwL, 2);
  vul(ctx, [[22, -110], [-14, -118], [-50, -100], [-96, -40], [-70, -50], [-30, -70], [10, -86]], _dk(zw, 0.15), zwL, 1.5);
  ctx.strokeStyle = zwL; ctx.lineWidth = 1.2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-26 - i * 12, -100 + i * 8); ctx.lineTo(-52 - i * 12, -64 + i * 6); ctx.stroke(); }
  ctx.save(); ctx.translate(36, -118); ctx.rotate(pik * 0.8);
  vul(ctx, [[-16, 14], [-14, -10], [0, -20], [18, -18], [28, -6], [26, 10], [8, 18]], zw, zwL, 2);
  vul(ctx, [[24, -6], [56, -2], [24, 6]], '#E3A23A', '#F0C070', 1.2); lijn(ctx, [[25, 0], [52, -1]], '#9A6420', 1.2);
  dierOog(ctx, 12, -6, 4, '#1A1210', { rand: '#E3A23A' });
  if (prooi) prooi(ctx, 54, 0);
  ctx.restore();
  ctx.restore(); }

// ===================================================================================
// DAPHNE MAJOR: kleine vulkaankegel (tufsteen) met krater, ± 0,3 km², steile flanken, schaarse struikjes; in zee (nacht, Macro).
// (x, y) = midden op de waterlijn, w = breedte van de voet.
function daphneMajor(ctx, x, y, w, o = {}) { const { a = 1, droog = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  const h = w * 0.3;
  vul(ctx, [[-w / 2, 0], [-w * 0.36, -h * 0.55], [-w * 0.22, -h * 0.96], [-w * 0.12, -h], [-w * 0.05, -h * 0.86], [w * 0.06, -h * 0.84], [w * 0.14, -h * 0.98], [w * 0.24, -h * 0.94], [w * 0.38, -h * 0.5], [w / 2, 0]], '#6A5E52', '#8C8072', 2);
  vul(ctx, [[-w * 0.5, 0], [-w * 0.3, -h * 0.5], [-w * 0.2, -h * 0.9], [-w * 0.1, -h * 0.4], [-w * 0.2, 0]], '#5A5046');
  // kraterrand
  lijn(ctx, [[-w * 0.12, -h], [-w * 0.05, -h * 0.86], [w * 0.06, -h * 0.84], [w * 0.14, -h * 0.98]], '#B8AC98', 3);
  // struikjes (groen of dor)
  const sk = droog ? '#8A7A58' : '#5F8A5E';
  for (let i = 0; i < 16; i++) { const u = hash(i * 4.1), v = hash(i * 7.3); const px = (u - 0.5) * w * 0.8; const top = -h * (1 - Math.abs(px) / (w * 0.5)) * 0.9; const py = top * (0.2 + 0.7 * v);
    ctx.beginPath(); ctx.ellipse(px, py, w * 0.012 * (0.8 + 0.4 * hash(i)), w * 0.008, 0, 0, 6.283); ctx.fillStyle = sk; ctx.fill(); }
  // zee
  ctx.fillStyle = '#26507E'; ctx.fillRect(-W, 0, 2 * W, 40); ctx.strokeStyle = '#3E6E9E'; ctx.lineWidth = 2; for (let i = -8; i < 8; i++) { ctx.beginPath(); ctx.moveTo(i * 110, 16 + (i % 2) * 8); ctx.lineTo(i * 110 + 50, 16 + (i % 2) * 8); ctx.stroke(); }
  ctx.restore(); }

// ===================================================================================
// TELLER en kleine hulpjes voor de storyboardstills
function grootGetal(ctx, s, x, y, kleur = C.text, px = 96, align = 'left') { text(ctx, s, x, y, fTitel(px), kleur, align); }

// ===================================================================================
// STORYBOARD-HULPEN (film 2 en 3)
// tak met bladeren: pad P (punten), bladen = [[u langs de tak 0..1, w, hoek]]
function takMetBladeren(ctx, P, bladen, o = {}) { const { a = 1, dikte = 10, kleur = '#5FA86E' } = o; ctx.save(); ctx.globalAlpha *= a;
  lijn(ctx, P, '#5A4636', dikte); const pos = []; for (const [u, w, hoek, kl] of bladen) { const i = Math.min(P.length - 2, Math.floor(u * (P.length - 1))), f = u * (P.length - 1) - i; const px = lerp(P[i][0], P[i + 1][0], f), py = lerp(P[i][1], P[i + 1][1], f); blad(ctx, px, py, w, { rot: hoek, kleur: kl || kleur }); pos.push({ x: px, y: py, w, hoek }); }
  ctx.restore(); return pos; }
// gouden focusring (geen gloed): ellips, 3 px
function focusRing(ctx, x, y, rx, ry, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
// assen voor een grafiek (Schema): (x, y) = oorsprong; xt/yt = [[waarde 0..1, label]]
function grafiekAs(ctx, x, y, w, h, o = {}) { const { xLabel = '', yLabel = '', xt = [], yt = [], raster = true } = o;
  if (raster) { ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1; for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(x, y - h * i / 4); ctx.lineTo(x + w, y - h * i / 4); ctx.stroke(); } }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 20, y); ctx.stroke();
  for (const [u, l] of xt) { ctx.beginPath(); ctx.moveTo(x + u * w, y); ctx.lineTo(x + u * w, y + 10); ctx.stroke(); metaText(ctx, l, x + u * w, y + 46, C.text2, 'center', 28); }
  for (const [u, l] of yt) { ctx.beginPath(); ctx.moveTo(x - 10, y - u * h); ctx.lineTo(x, y - u * h); ctx.stroke(); metaText(ctx, l, x - 18, y - u * h + 10, C.text2, 'right', 28); }
  if (xLabel) metaText(ctx, xLabel, x + w, y + 90, C.grain, 'right', 28); if (yLabel) metaText(ctx, yLabel, x, y - h - 40, C.grain, 'left', 28); }
function lijnPad(ctx, P, kleur, lw = 5, dash = null) { ctx.save(); if (dash) ctx.setLineDash(dash); lijn(ctx, P, kleur, lw); ctx.restore(); }
// tekstkaart op een basislijn (Schema), met optioneel icoon bovenin
function tekstKaart(ctx, x, y, w, h, titel, o = {}) { const { kleur = C.text, a = 1, icoon = null, sub = null, rand = C.line } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.8), rand, 2); if (icoon) icoon(ctx, x + w / 2, y + h * 0.42);
  text(ctx, titel, x + w / 2, y + h - (sub ? 74 : 40), fTekst(40, 600), kleur, 'center'); if (sub) metaText(ctx, sub, x + w / 2, y + h - 30, C.grain, 'center', 26); ctx.restore(); }
function doorstreep(ctx, x1, y1, x2, y2) { ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }
function eindKaart(ctx, film, zinnen, volgende) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, `EVOLUTIE ${film}/8 · SAMENGEVAT`, 140, 160, C.text2, 'left', 28);
  zinnen.forEach((z, i) => text(ctx, z, 140, 300 + i * 96, fTekst(52, 600), C.text, 'left')); haak(ctx, 140, 1500, 300 + zinnen.length * 96 - 40, '', C.groen);
  if (volgende) { metaText(ctx, 'VOLGENDE FILM', 140, 780, C.grain, 'left', 28); text(ctx, volgende, 140, 846, fTitel(60), C.goud, 'left'); } }
// populatie als raster van stippen (telpictogrammen): n totaal, k levend (rest gedimd)
function stipRaster(ctx, x, y, kol, rij, d, k, kleur = C.oker, seed = 3) { const n = kol * rij; const levend = new Set(); const idx = [...Array(n).keys()].sort((p, q) => hash(p * 7 + seed) - hash(q * 7 + seed)); idx.slice(0, k).forEach(i => levend.add(i));
  for (let i = 0; i < n; i++) { const c = i % kol, r = Math.floor(i / kol); populatieStip(ctx, x + c * d, y + r * d, d * 0.34, kleur, levend.has(i) ? 1 : 0.22); } }
// nestje met eieren (grondvink: 2–5 eieren, wit met bruine stippen)
function nestje(ctx, x, y, s = 1, eieren = 4) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 60, 26, 0, 0, Math.PI); ctx.fillStyle = '#7A6040'; ctx.fill(); ctx.strokeStyle = '#A08060'; ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(0, -4, 40 + i * 2.4, 0.2 + i * 0.05, Math.PI - 0.2); ctx.stroke(); }
  for (let i = 0; i < eieren; i++) { const ex = -30 + i * 20, ey = -4 - (i % 2) * 6; ctx.beginPath(); ctx.ellipse(ex, ey, 10, 13, 0.2, 0, 6.283); ctx.fillStyle = '#EDE6D6'; ctx.fill(); ctx.fillStyle = '#8A6A4A'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(ex - 4 + hash(i * 9 + k) * 8, ey - 6 + hash(i * 5 + k) * 12, 1.6, 0, 6.283); ctx.fill(); } }
  ctx.restore(); }
// opuntia-cactus (schijfcactus, Galápagos), alleen context
function opuntia(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -22, -260, 44, 260, 16); ctx.fillStyle = '#7A6A50'; ctx.fill();
  for (const [px, py, r, rot] of [[-60, -300, 60, -0.5], [60, -320, 64, 0.5], [0, -380, 58, 0], [-110, -380, 48, -0.8], [110, -400, 50, 0.7]]) { ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.62, r, 0, 0, 6.283); ctx.fillStyle = '#5F8A5E'; ctx.fill(); ctx.strokeStyle = '#7FA87A'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#D8D0B0'; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.arc((hash(k * 3 + px) - 0.5) * r * 0.9, (hash(k * 5 + py) - 0.5) * r * 1.5, 2, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// rups langs de middennerf van een blad uit takMetBladeren (b = {x, y, w, hoek}); f = plek langs de nerf (0..1)
function rupsOpBlad(ctx, b, s, o = {}) { const f = o.f ?? 0.5; const cx = b.x + Math.cos(b.hoek) * b.w * 2 * f, cy = b.y + Math.sin(b.hoek) * b.w * 2 * f;
  const naarLinks = Math.cos(b.hoek) < 0; rups(ctx, cx, cy + 18 * s, s, Object.assign({}, o, { rot: naarLinks ? b.hoek + Math.PI : b.hoek, kijk: naarLinks ? -1 : 1 })); return [cx, cy]; }
// gedimd dier (35 %) zonder doorschijnende overlappen: eerst op een eigen laag tekenen, dan als geheel dimmen
function gedimd(ctx, a, fn) { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.setTransform(ctx.getTransform()); fn(g);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= a; ctx.drawImage(c, 0, 0); ctx.restore(); }

// ===================================================================================
// r4 (23 okt 2026) · Kamiel: 'blaadjes moeten echt vast aan de tak zitten' en 'opuntia mooier'.
// STRUIKTAK: zoals takMetBladeren, maar elk blad zit zichtbaar vast: verdikte knoop op de tak, een stevige, licht gebogen bladsteel
// (± 0,32·w lang, 0,09·w dik aan de tak, donkerder groen) die doorloopt in de middennerf, en een bladvoet die over het eind van de steel valt.
// Geeft dezelfde {x, y, w, hoek} per blad terug (rupsOpBlad, focusRing).
function struikTak(ctx, P, bladen, o = {}) { const { a = 1, dikte = 18, kleur = '#5FA86E' } = o; ctx.save(); ctx.globalAlpha *= a;
  const bast = '#5A4636', bastL = '#7A624E', n = P.length;
  const W8 = P.map((_, i) => dikte * (1.1 - 0.62 * i / (n - 1))); _streek(ctx, P, W8, bast, _D(bast, 0.25), 1.2);
  lijn(ctx, P.map((p, i) => [p[0], p[1] - W8[i] * 0.26]), _A(bastL, 0.8), Math.max(1.5, dikte * 0.12));
  const op = (u) => { const i = Math.min(n - 2, Math.floor(u * (n - 1))), f = u * (n - 1) - i; return { p: [lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)], r: Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]), d: lerp(W8[i], W8[i + 1], f) }; };
  ctx.fillStyle = _A('#C8B496', 0.55); for (let i = 0; i < 16; i++) { const { p, d } = op(0.03 + i * 0.06); ctx.beginPath(); ctx.ellipse(p[0], p[1] + d * 0.08, d * 0.11, d * 0.045, 0, 0, 6.283); ctx.fill(); }
  { const e = P[n - 1], { r } = op(0.999); ctx.save(); ctx.translate(...e); ctx.rotate(r); vul(ctx, [[-3, -4], [12, -3], [20, 0], [12, 3], [-3, 4]], '#7A5A3E'); ctx.restore(); }
  const pos = [], later = [];
  for (const [u, w, hoek, kl] of bladen) { const { p, r, d } = op(u); const diff = Math.atan2(Math.sin(hoek - r), Math.cos(hoek - r)); const k = diff < 0 ? -1 : 1; const m = Math.min(1.2, Math.max(0.55, Math.abs(diff)));
    const sa = r + k * m * 0.62, ba = r + k * m; const sl = w * 0.32, kc = kl || kleur, sk = _D(kc, 0.35);
    const voet = [p[0] + Math.cos(sa) * d * 0.35, p[1] + Math.sin(sa) * d * 0.35]; // steel begint IN de tak (knoop)
    const b0 = [p[0] + Math.cos(sa) * sl + Math.cos(ba) * sl * 0.12, p[1] + Math.sin(sa) * sl + Math.sin(ba) * sl * 0.12];
    const mid = [lerp(voet[0], b0[0], 0.5) + Math.cos(ba) * sl * 0.06, lerp(voet[1], b0[1], 0.5) + Math.sin(ba) * sl * 0.06];
    later.push(() => { // eerst alle bladeren, dan stelen en knopen erover: de aanhechting is altijd zichtbaar
      blad(ctx, b0[0], b0[1], w, { rot: ba, kleur: kc, steel: 0 });
      _streek(ctx, [voet, mid, b0, [b0[0] + Math.cos(ba) * w * 0.14, b0[1] + Math.sin(ba) * w * 0.14]], [w * 0.095, w * 0.07, w * 0.055, w * 0.02], sk);
      ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(r); vul(ctx, [[-d * 0.7, 0], [-d * 0.3, -d * 0.62 * k], [d * 0.35, -d * 0.66 * k], [d * 0.75, 0], [d * 0.3, d * 0.5 * k], [-d * 0.3, d * 0.5 * k]], _L(bast, 0.06)); ctx.restore(); // verdikte knoop
      const kn = [p[0] + Math.cos(r + k * 0.5) * d * 0.62, p[1] + Math.sin(r + k * 0.5) * d * 0.62]; circ(ctx, kn[0], kn[1], d * 0.2, '#8A6A48'); });
    pos.push({ x: b0[0], y: b0[1], w, hoek: ba }); }
  later.forEach(f => f()); ctx.restore(); return pos; }

// OPUNTIABOOM (Opuntia echios, boomvormige schijfcactus van de Galápagos): stam met roodbruine schorsplaten; schijven (cladoden) omgekeerd eirond,
// met een smalle voet die IN de rand van de oudere schijf zit (een zichtbaar ingesnoerd gewricht); areolen als viltige stipjes in een schuin
// ruitpatroon, elk met een bosje van 3–5 gele stekels; gele bloemen (veel kroonbladen, groen stempeltje) en eivormige vruchten met areolen op de
// bovenrand. Eenheid ± 0,5 cm, (x, y) = voet van de stam; bij (0, −315) is een vork voor een nest. o.t = heel rustig wiegen (± 0,4°), o.bloei 0..1.
function _opSchijf(ctx, L, kl, seed) {
  const hw = (u) => L * (0.07 + 0.33 * Math.pow(Math.sin(Math.PI * Math.min(1, 0.08 + u * 0.78)), 0.75) * Math.min(1, 0.25 + u * 1.6));
  const O = []; for (let i = 0; i <= 28; i++) { const u = i / 28; O.push([hw(u), -u * L]); } for (let i = 28; i >= 0; i--) { const u = i / 28; O.push([-hw(u), -u * L]); }
  const rand = _D(kl, 0.28);
  vul(ctx, O, kl, rand, 2.2);
  binnen(ctx, O, () => { vul(ctx, [[-L, -L * 0.42], [L, -L * 0.55], [L, 20], [-L, 20]], _D(kl, 0.1)); // onderhelft iets donkerder (licht van boven)
    vul(ctx, [[-L * 0.25, -L * 0.98], [L * 0.32, -L * 0.98], [L * 0.2, -L * 0.62], [-L * 0.12, -L * 0.6]], _A(_L(kl, 0.25), 0.35)); // glans
    ctx.strokeStyle = _A(_L(kl, 0.3), 0.5); ctx.lineWidth = 2.4; ctx.beginPath(); O.forEach((p, i) => { const q = [p[0] * 0.9, p[1] * 0.97 - L * 0.015]; i ? ctx.lineTo(...q) : ctx.moveTo(...q); }); ctx.closePath(); ctx.stroke(); }); // dikke rand
  // areolen in een schuin ruitpatroon
  const sp = L * 0.2; for (let r = 0; r < 7; r++) for (let c = -3; c <= 3; c++) { const u = 0.12 + r * 0.135, px = (c + (r % 2 ? 0.5 : 0)) * sp; if (u > 0.95 || Math.abs(px) > hw(u) * 0.84) continue;
    const py = -u * L; circ(ctx, px, py, 2.4, '#CFC6A8'); circ(ctx, px, py + 0.3, 1.1, '#8A7A58');
    ctx.strokeStyle = '#E8D27A'; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; const nS = 2 + Math.floor(hash(seed * 13 + r * 5 + c) * 2.4);
    for (let k = 0; k < nS; k++) { const an = -1.57 + (k - (nS - 1) / 2) * 0.55 + (hash(seed + r * 3 + c * 7 + k) - 0.5) * 0.35 + px / L * 0.6, len = 4.5 + hash(seed * 5 + k + r) * 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * len, py + Math.sin(an) * len); ctx.stroke(); } }
  return { hw, O }; }
function opuntiaBoom(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, bloei = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const groen = '#5E8C5A', groenD = '#507C50', groenL = '#6C9A62', schors = '#7A5A44', schorsD = '#5E4434';
  // stam: taps, licht gebogen, met schorsplaten
  const ST = [[-36, 0], [-32, -70], [-27, -150], [-24, -212], [24, -212], [26, -150], [31, -70], [38, 0]]; vul(ctx, ST, schors, _D(schors, 0.3), 2);
  binnen(ctx, ST, () => { for (let i = 0; i < 30; i++) { const c = i % 5, r = Math.floor(i / 5); const px = -32 + c * 14 + (r % 2) * 7, py = -10 - r * 40 - hash(i) * 10;
      vul(ctx, [[px, py], [px + 11, py - 3], [px + 12, py - 30], [px + 2, py - 35], [px - 2, py - 16]], [schorsD, _L(schors, 0.1), _D(schors, 0.1)][i % 3], _A('#2E2018', 0.5), 1); } });
  // schijven: [hoek, lengte, kinderen, plek op de rand (−1..1)]
  const boom = [[-0.78, 104, [[-0.42, 88, [[-0.1, 70, [], 0.1]], -0.35], [0.38, 76, [], 0.45]], -0.5],
    [0.02, 112, [[-0.42, 72, [], -0.4], [0.4, 74, [], 0.45]], 0], // achter het nest
    [0.8, 106, [[0.4, 86, [[0.08, 68, [], 0.1]], 0.35], [-0.35, 74, [], -0.4]], 0.5]];
  const eind = [];
  const schijf = (def, diep, seed) => { const [an, L, kids] = def; ctx.save(); ctx.rotate(an + Math.sin(t * 0.8 + seed) * 0.007 * diep);
    const { hw } = _opSchijf(ctx, L, [groen, groenD, groenL][(seed + diep) % 3], seed);
    kids.forEach((k, i) => { const u = 0.97 - 0.12 * Math.abs(k[3]); ctx.save(); ctx.translate(k[3] * hw(u) * 0.95, -u * L + 7); schijf(k, diep + 1, seed * 3 + i + 1);
      // ingesnoerd gewricht: donkere naad waar de jonge schijf in de oude zit
      ctx.rotate(k[0]); ctx.strokeStyle = _D(groen, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, -2, L * 0.07, 2.2, 0, 0, 6.283); ctx.stroke(); ctx.restore(); });
    if (!kids.length) eind.push([ctx.getTransform(), L, seed]); ctx.restore(); };
  ctx.save(); ctx.translate(0, -206); [1, 0, 2].forEach((i) => { ctx.save(); ctx.translate((i - 1) * 18, 0); schijf(boom[i], 1, i + 2); ctx.restore(); }); ctx.restore();
  // bloemen en vruchten op de bovenrand van de jongste schijven
  eind.forEach(([m, L, seed], j) => { ctx.save(); ctx.setTransform(m); const plek = [[-0.22, 0.97], [0.18, 0.99]];
    plek.forEach(([px, u], q) => { ctx.save(); ctx.translate(px * L, -u * L + 6); ctx.rotate(px * 1.2); const vrucht = (j + q + seed) % 3 === 0;
      if (vrucht) { const V = [[-7, 0], [-10, -12], [-8, -24], [0, -28], [8, -24], [10, -12], [7, 0]]; vul(ctx, V, '#B89A3A', '#8A7228', 1.4); binnen(ctx, V, () => vul(ctx, [[-14, -14], [-2, -30], [-14, -30]], _A('#D8BC5A', 0.7))); for (const [ax, ay] of [[-4, -8], [4, -14], [-3, -20], [5, -6]]) circ(ctx, ax, ay, 1.3, '#E6DCB4'); }
      else if ((j + q) % 2 === 0 && bloei > 0.01) { ctx.globalAlpha *= bloei; vul(ctx, [[-6, 0], [-7, -12], [7, -12], [6, 0]], groenL, _D(groen, 0.3), 1); // vruchtbeginsel
        for (let k = 0; k < 9; k++) { ctx.save(); ctx.translate(0, -12); ctx.rotate(-1.35 + k * 0.34); vul(ctx, [[0, 0], [-6, -8], [-3, -19], [3, -19], [6, -8]], k % 2 ? '#F0CE3E' : '#E6BE30', '#C99A22', 0.8); ctx.restore(); }
        circ(ctx, 0, -18, 4, '#F6E08A'); circ(ctx, 0, -19, 2, '#7A9A4A'); }
      ctx.restore(); }); ctx.restore(); });
  ctx.restore(); }
