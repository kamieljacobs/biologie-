// =====================================================================================
// ECHO van ± 20 weken (2D, sagittaal profiel) — variant A 'echoweefsel' (verbeterronde 2, 28 okt 2026).
// Recept (bronnen in bron.md: ISUOG '20 planes approach to the routine mid-trimester scan'; Univ. of Saskatchewan,
// 'Undergraduate Diagnostic Imaging Fundamentals', hoofdstuk echografie):
// - waaiervormig beeld (sector), de transducer bovenaan in de punt. Vocht (vruchtwater, maag, blaas) is zwart
//   (geen echo), weke delen grijs en licht gevlekt, bot helder wit (veel echo). Dieper wordt het beeld iets donkerder.
// - alles is ECHOWEEFSEL: zachte grijze vlakken met zachte randen en een rustige vlekking, géén lijnen of symbolen.
// - kind in profiel, op de rug: hoofd links, gezicht schuin omhoog naar de transducer (voorhoofd–neusbotje–lippen–kin
//   tegen het zwarte vruchtwater), heldere schedelrand; romp naar rechts met de rug onder;
//   wervelkolom = twee rijen heldere kraaltjes (twee botkernen per wervel) die de rug volgen, onder de huid, en naar
//   het heiligbeen toe naar elkaar toe lopen; hart in de borst = grijze vlek met donkere kamers die klopt (± 140/min);
//   maag als zwart blaasje in de bovenbuik; bekken met de blaas; benen opgetrokken (dijbeen als helder streepje);
//   armpje met vuistje bij het gezicht. Bovenaan buikwand en placenta, onderaan de baarmoederwand.
// Bekende fouten: hart als cirkel met kruis; wervelkolom als stippellijnen; romp die abrupt eindigt zonder bekken of
// benen; kind getekend met lijnen; drukke korrel (Kamiel: rustig houden).
// Aanroep zoals voorheen: echoBeeld(ctx, x, y, R, {a, t, hl: {hoofd, armen, hart}, s, open}); (x, y) = top van de
// waaier, R = diepte, s = grootte van het kind, open = openingshoek (rad). Het stilstaande deel wordt per maat één
// keer opgebouwd en bewaard (snel in een film); alleen het hart en het oplichten worden elke frame getekend.
// Geeft ankerpunten terug: { hart, hoofd, arm }.
// =====================================================================================
const _ECHO_A = { cache: {}, vlak: false, rot: 0 }; // rot = extra draaiing van het kind (rad)
function _echoAHoofd() { // omtrek van het hoofd met profiel; het gezicht kijkt schuin omhoog (naar de transducer)
  const c = [-120, 0], pts = []; const bult = (th, m, w, h) => h * Math.exp(-((((th - m + 540) % 360 - 180) / w) ** 2));
  for (let th = -40; th <= 318; th += 2) { // graden, 0 = rechts, 90 = onder, 270 = boven (schermassen)
    const r = 82 + bult(th, 236, 14, 4) + bult(th, 259, 9, 22) + bult(th, 273, 5, 11) - bult(th, 278, 3, 4) + bult(th, 283, 5, 9) + bult(th, 296, 8, 7) - bult(th, 312, 9, 12);
    pts.push([c[0] + Math.cos(th * Math.PI / 180) * r, c[1] + Math.sin(th * Math.PI / 180) * r]); }
  return pts;
}
function _echoAVorm() { // vormen in kind-eenheden (R = 520), oorsprong = midden van het kind; buik boven, rug onder
  return {
    hoofd: _echoAHoofd(),
    schedel: [[-54, 56], [-90, 78], [-140, 82], [-184, 56], [-202, 10], [-196, -36], [-170, -68]], // achterhoofd-kruin-voorhoofd
    romp: [[-86, -60], [-20, -70], [50, -70], [110, -56], [150, -30], [176, 0], [172, 40], [140, 62], [80, 74], [20, 76], [-40, 66], [-66, 40], [-60, -10]],
    dij: [[140, -10], [122, -46], [102, -78]], onderbeen: [[102, -78], [126, -94], [156, -98], [176, -94]],
    arm: [[-46, -48], [-44, -92], [-66, -108], [-90, -112]],
    rug: [[-50, 50], [10, 62], [76, 60], [126, 46], [156, 22], [168, -6]],
    hart: [-14, -22], maag: [66, -24], blaas: [146, 0]
  };
}
function _echoAKorrel(w, h, sd) { // rustige vlekking: ruis op lage resolutie, zacht opgeschaald
  const f = 4, cw = Math.ceil(w / f), ch = Math.ceil(h / f); const c = document.createElement('canvas'); c.width = cw; c.height = ch; const g = c.getContext('2d'); const im = g.createImageData(cw, ch);
  for (let i = 0; i < cw * ch; i++) { const v = 200 + Math.floor(hash(sd + i * 1.37) * 55); im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
  g.putImageData(im, 0, 0); const o = document.createElement('canvas'); o.width = w; o.height = h; const og = o.getContext('2d'); og.imageSmoothingEnabled = true; og.filter = 'blur(1.5px)'; og.drawImage(c, 0, 0, w, h); return o;
}
function _echoABouw(R, s, open, vlak) {
  const key = [Math.round(R), s.toFixed(2), open.toFixed(2), vlak ? 1 : 0].join('_'); if (_ECHO_A.cache[key]) return _ECHO_A.cache[key];
  const half = Math.sin(open / 2) * R, W = Math.ceil(half * 2 + 4), H = Math.ceil(R + 2), ox = W / 2; // apex op (ox, 0)
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const k = R / 520 * s * 0.8, cx = ox + R * 0.04, cy = R * 0.6, rot = _ECHO_A.rot; const F = _echoAVorm();
  const grijs = (v, al = 1) => `rgba(${v},${v},${v + 4},${al})`;
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  // moeder: buikwand (helder, gelaagd) en placenta bovenaan; baarmoederwand onderaan
  const boog = (r0, r1, v) => { g.beginPath(); g.arc(ox, 0, r1, 0, Math.PI); g.arc(ox, 0, r0, Math.PI, 0, true); g.closePath(); g.fillStyle = grijs(v); g.fill(); };
  boog(R * 0.02, R * 0.06, 150); boog(R * 0.06, R * 0.075, 90); boog(R * 0.075, R * 0.1, 135); boog(R * 0.12, R * 0.22, 105); boog(R * 0.215, R * 0.228, 150);
  boog(R * 0.9, R * 0.935, 120); boog(R * 0.935, R * 1.0, 85);
  g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(k, k); g.lineJoin = 'round'; g.lineCap = 'round';
  const vul = (pts, v, dicht = true) => { g.beginPath(); bioPad(g, pts, dicht); g.fillStyle = grijs(v); g.fill(); };
  const lijn = (pts, v, w) => { g.beginPath(); bioPad(g, pts, false); g.strokeStyle = grijs(v); g.lineWidth = w; g.stroke(); };
  // weke delen
  lijn(F.dij, 94, 50); lijn(F.onderbeen, 94, 36); g.beginPath(); g.ellipse(178, -92, 18, 11, 0.2, 0, 6.283); g.fillStyle = grijs(94); g.fill(); vul(F.romp, 92); vul(F.hoofd, 88);
  g.beginPath(); g.ellipse(-62, -40, 26, 26, 0.4, 0, 6.283); g.fillStyle = grijs(92); g.fill(); // hals/schouder
  // huidrand iets helderder
  for (const v of [F.romp, F.hoofd]) { g.beginPath(); bioPad(g, v, true); g.strokeStyle = grijs(165, 0.85); g.lineWidth = 5; g.stroke(); } // huid geeft een heldere grens met het vruchtwater
  // hersenen: donkerder binnen de schedel
  g.beginPath(); g.ellipse(-118, 18, 54, 50, 0.1, 0, 6.283); g.fillStyle = grijs(76); g.fill();
  // vochtholtes: maag en blaas zwart
  g.beginPath(); g.ellipse(F.maag[0], F.maag[1], 20, 14, -0.2, 0, 6.283); g.fillStyle = grijs(6); g.fill();
  g.beginPath(); g.ellipse(F.blaas[0], F.blaas[1], 13, 11, 0.3, 0, 6.283); g.fillStyle = grijs(8); g.fill();
  // lever iets helderder onder het hart
  g.beginPath(); g.ellipse(14, -40, 40, 18, 0.1, 0, 6.283); g.fillStyle = grijs(106, 0.8); g.fill();
  // longen rond het hart iets helderder
  g.beginPath(); g.ellipse(-22, -4, 40, 36, 0, 0, 6.283); g.fillStyle = grijs(112, 0.7); g.fill();
  // bot: schedel, neusbotje, kaak, wervels, ribben, arm- en beenbotjes
  lijn(F.schedel, 235, 11); // schedelrand (achter het gezicht open: daar zit het aangezicht)
  lijn([[-142, -80], [-145, -91]], 245, 6); // neusbotje
  lijn([[-90, -66], [-100, -46], [-118, -32]], 185, 6); // onderkaak
  const rug = bioDicht(F.rug, 22); rug.forEach((p, i) => { const q = rug[Math.min(rug.length - 1, i + 1)], pp = rug[Math.max(0, i - 1)], an = Math.atan2(q[1] - pp[1], q[0] - pp[0]); const nx = -Math.sin(an), ny = Math.cos(an); const d = lerp(9, 3.5, i / (rug.length - 1));
    for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(p[0] + nx * d * sd, p[1] + ny * d * sd, 5, 3.6, an, 0, 6.283); g.fillStyle = grijs(sd < 0 ? 240 : 205); g.fill(); } });
  for (let i = 0; i < 4; i++) lijn([[-40 + i * 20, 46], [-46 + i * 20, 12], [-38 + i * 20, -20]], 120, 3); // ribben, zwak
  lijn([[136, -16], [106, -70]], 235, 8); lijn([[114, -88], [160, -96]], 215, 6); // dijbeen, scheenbeen
  for (const [px, py] of [[156, 10], [150, 24]]) { g.beginPath(); g.arc(px, py, 6, 0, 6.283); g.fillStyle = grijs(190); g.fill(); } // bekkenbotje
  // arm en vuistje (zacht weefsel over de botjes)
  lijn(F.arm, 100, 26); g.beginPath(); g.ellipse(-94, -112, 15, 12, 0.3, 0, 6.283); g.fillStyle = grijs(100); g.fill();
  lijn([[-46, -54], [-44, -86]], 220, 6); lijn([[-50, -100], [-80, -110]], 210, 5); for (let f = 0; f < 4; f++) { g.beginPath(); g.arc(-102 + f * 2, -118 + f * 4, 2.4, 0, 6.283); g.fillStyle = grijs(225); g.fill(); }
  // hart in rust: grijze vlek; kamers worden per frame getekend
  g.beginPath(); g.ellipse(F.hart[0], F.hart[1], 30, 25, -0.4, 0, 6.283); g.fillStyle = grijs(96); g.fill();
  g.restore();
  // zachte randen
  const b = document.createElement('canvas'); b.width = W; b.height = H; const bg = b.getContext('2d'); bg.filter = `blur(${Math.max(0.8, R / (vlak ? 320 : 240))}px)`; bg.drawImage(c, 0, 0); bg.filter = 'none';
  if (!vlak) { bg.globalCompositeOperation = 'multiply'; bg.drawImage(_echoAKorrel(W, H, 7 + Math.round(R)), 0, 0); bg.globalCompositeOperation = 'source-over'; }
  // diepteverloop
  const dg = bg.createRadialGradient(ox, 0, R * 0.3, ox, 0, R); dg.addColorStop(0, 'rgba(0,0,0,0)'); dg.addColorStop(1, 'rgba(0,0,0,0.35)'); bg.fillStyle = dg; bg.fillRect(0, 0, W, H);
  return (_ECHO_A.cache[key] = { img: b, W, H, ox, k, cx, cy, rot });
}
function echoBeeld(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, hl = {}, s = 1, open = 1.22 } = o;
  const B = _echoABouw(R, s, open, _ECHO_A.vlak); const F = _echoAVorm(); const k = B.k, bx = x - B.ox;
  const cr = Math.cos(_ECHO_A.rot), sr = Math.sin(_ECHO_A.rot); const P = (px, py) => [bx + B.cx + (px * cr - py * sr) * k, y + B.cy + (px * sr + py * cr) * k];
  const ret = { hart: P(F.hart[0], F.hart[1]), hoofd: P(-110, 14), arm: P(-60, -104) };
  if (a <= 0.01) return ret;
  const a0 = Math.PI / 2 - open / 2, a1 = Math.PI / 2 + open / 2;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.fillStyle = '#000'; ctx.fill(); ctx.save(); ctx.clip();
  ctx.drawImage(B.img, bx, y);
  // kloppend hart: twee donkere kamers die samentrekken (± 140 slagen per minuut)
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.3)) ** 2; const [hx, hy] = P(F.hart[0], F.hart[1]);
  ctx.save(); ctx.translate(hx, hy); ctx.rotate(-0.4); ctx.filter = `blur(${Math.max(0.6, R / 260)}px)`;
  for (const [dx, dy, rx, ry] of [[-5, 0, 14, 11]]) { ctx.beginPath(); ctx.ellipse(dx * k, dy * k, rx * k * (1 - 0.3 * slag), ry * k * (1 - 0.3 * slag), 0, 0, 6.283); ctx.fillStyle = 'rgba(14,14,16,0.75)'; ctx.fill(); }
  ctx.filter = 'none'; ctx.restore();
  // oplichten (alleen als het gevraagd wordt)
  const hlv = (n) => clamp(hl[n] || 0, 0, 1);
  if (hlv('hoofd') > 0.01) { ctx.save(); ctx.globalAlpha *= hlv('hoofd') * 0.8; ctx.beginPath(); bioPad(ctx, F.hoofd.map(p => P(p[0], p[1])), true); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 5 * k); ctx.setLineDash([10 * k, 8 * k]); ctx.stroke(); ctx.restore(); }
  if (hlv('armen') > 0.01) { ctx.save(); ctx.globalAlpha *= hlv('armen') * 0.35; ctx.beginPath(); bioPad(ctx, F.arm.map(p => P(p[0], p[1])), false); ctx.strokeStyle = C.goud; ctx.lineWidth = 40 * k; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  if (hlv('hart') > 0.01) { ctx.save(); ctx.globalAlpha *= hlv('hart'); ctx.beginPath(); ctx.ellipse(hx, hy, 44 * k * (1 + 0.06 * slag), 38 * k * (1 + 0.06 * slag), -0.4, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = Math.max(2, 4 * k); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.strokeStyle = 'rgba(120,128,140,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.stroke();
  ctx.restore(); return ret;
}
