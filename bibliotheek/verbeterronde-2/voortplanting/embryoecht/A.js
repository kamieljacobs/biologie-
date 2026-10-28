// =====================================================================================
// EMBRYO van ± 6 weken na de bevruchting — variant A 'doorschijnend' (verbeterronde 2, 28 okt 2026).
// Recept (bronnen in bron.md: UNSW Embryology 'Carnegie stage 16'; embryology.ch 'Carnegie stages 14–16';
// National Museum of Health and Medicine, Human Developmental Anatomy Center 'Stage 16'):
// - Carnegie-stadium 15–16, ± 37–42 dagen, ± 8–11 mm; zijaanzicht, C-vormig, gezicht naar links, rug rechts.
// - HOOFD (± de helft van de lengte) met zichtbare hersenblaasjes: voorhersenen (telencephalon) vóór als ronde bult,
//   tussenhersenen met het oog (donker pigmentringetje), middenhersenen als hoogste koepel (bovenaan de kromming),
//   achterhersenen met het dunne, ruitvormige dak van de vierde ventrikel aan de achterkant. Oorputje achter de
//   kieuwbogen; 1e–3e kieuwboog als drie richels onder het hoofd.
// - HARTBULT: het hart ligt in een echte uitbolling van de buikwand onder de kieuwbogen ('heart prominence') en
//   klopt; daaronder de kleinere leverbult.
// - NAVELSTRENG: dikke streng die uit de buik komt tussen leverbult en beenknop (fysiologische navelbreuk) en
//   naar links-onder het beeld uit loopt; in de doorsnede twee slagaders en één ader.
// - STAART: kort, spits staartje onderaan dat naar de navelstreng toe krult (los van de streng te zien).
// - armknop met handplaat ter hoogte van het hart, kleinere beenknop met voetplaat lager; somieten (blokjes) langs de rug.
// - aanleg geslachtsklier (genitale lijst) binnenin tegen de achterwand van de buikholte (o.glow laat hem oplichten).
// Bekende fouten: kommavorm met een stip; hart als rode schijf zonder bult; onduidelijke kromming onderaan
// (staart en navelstreng door elkaar); hoofd zonder verschil tussen de hersenblaasjes; ledematen als vingers.
// Aanroep zoals voorheen: embryoEcht(ctx, x, y, s, {a, glow, t}); oorsprong = midden, ± 300 × 440 bij s = 1
// (inclusief het stuk navelstreng). Geeft ankerpunten terug (schermcoördinaten): hoofd, oog, hart, lever, arm, been,
// staart, navelstreng, aanleg, voorhersenen, middenhersenen, achterhersenen.
// =====================================================================================
function _embAVorm() { // omtrek (met de klok mee vanaf de koepel van de middenhersenen)
  return {
    lijf: [[18, -206], [76, -192], [116, -160], [124, -128], [118, -104], [142, -64], [160, -8], [160, 52], [144, 108], [114, 152], [78, 182], [46, 196],
      [16, 192], [-6, 172], [-20, 150], [-40, 132], [-66, 124], [-82, 104], [-82, 80], [-74, 64], [-98, 56], [-122, 34], [-130, 2], [-120, -28], [-96, -44],
      [-92, -58], [-104, -72], [-112, -88], [-136, -108], [-146, -140], [-136, -174], [-104, -200], [-52, -212]],
    staart: [[44, 194], [34, 214], [12, 228], [-10, 226], [-22, 212]],
    streng: [[-36, 136], [-62, 170], [-96, 206], [-138, 236]],
    hartC: [-82, 8], leverC: [-52, 92], oog: [-82, -122], oor: [-6, -92],
    voor: [-96, -160, 46, 40], tussen: [-42, -176, 36, 30], midden: [24, -178, 42, 32], achter: [84, -150, 34, 30],
    rug: [[108, -118], [138, -60], [148, 0], [146, 56], [130, 108], [100, 150], [66, 178]],
    arm: [[50, -20], [-8, 22]], been: [[80, 132], [36, 166]],
    aanleg: [[96, 40], [104, 76], [96, 112]]
  };
}
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; const F = _embAVorm(); const P = (p) => [x + p[0] * s, y + p[1] * s];
  const ret = { hoofd: P([-30, -160]), oog: P(F.oog), hart: P(F.hartC), lever: P(F.leverC), arm: P(F.arm[1]), been: P(F.been[1]), staart: P(F.staart[4]),
    navelstreng: P(F.streng[2]), aanleg: P(F.aanleg[1]), voorhersenen: P(F.voor), middenhersenen: P(F.midden), achterhersenen: P(F.achter) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#B97A6C', licht = '#F7D3C3', diep = '#D49A8A';
  const detail = s > 0.3;
  // navelstreng (achter het lijf): dikke streng met afgesneden eind waarin 2 slagaders + 1 ader
  ctx.strokeStyle = rand; ctx.lineWidth = 40; ctx.beginPath(); bioPad(ctx, F.streng, false); ctx.stroke();
  ctx.strokeStyle = '#EACBB8'; ctx.lineWidth = 35; ctx.beginPath(); bioPad(ctx, F.streng, false); ctx.stroke();
  const e = F.streng[3], an = Math.atan2(e[1] - F.streng[2][1], e[0] - F.streng[2][0]);
  ctx.save(); ctx.translate(e[0], e[1]); ctx.rotate(an); ctx.beginPath(); ctx.ellipse(0, 0, 7, 19, 0, 0, 6.283); shape(ctx, '#F3DCCD', rand, 2);
  if (detail) { _bioCirc(ctx, 0, -9, 3.6, '#C8463C'); _bioCirc(ctx, 0, 9, 3.6, '#C8463C'); _bioCirc(ctx, 0, 0, 4.6, '#4A6CA8'); } ctx.restore();
  // staart: spits, krult naar de streng toe
  ctx.strokeStyle = rand; ctx.lineWidth = 2.5; const st = bioDicht(F.staart, 10);
  for (let i = 0; i < st.length - 1; i++) { const u = i / (st.length - 1); ctx.strokeStyle = rand; ctx.lineWidth = lerp(30, 6, u) + 3; ctx.beginPath(); ctx.moveTo(st[i][0], st[i][1]); ctx.lineTo(st[i + 1][0], st[i + 1][1]); ctx.stroke(); }
  for (let i = 0; i < st.length - 1; i++) { const u = i / (st.length - 1); ctx.strokeStyle = huid; ctx.lineWidth = lerp(30, 6, u) - 2; ctx.beginPath(); ctx.moveTo(st[i][0], st[i][1]); ctx.lineTo(st[i + 1][0], st[i + 1][1]); ctx.stroke(); }
  // lijf
  ctx.beginPath(); bioPad(ctx, F.lijf, true); const gr = ctx.createLinearGradient(-140, 0, 160, 0); gr.addColorStop(0, rgba(huid, 0.96)); gr.addColorStop(1, rgba(_mixHex(huid, rand, 0.25), 0.96)); shape(ctx, gr, rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, F.lijf, true); ctx.clip();
  // hersenblaasjes: elk een eigen licht vlak met een zachte grens
  for (const [bx, by, rx, ry] of [F.voor, F.tussen, F.midden, F.achter]) { ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, 0, 0, 6.283); shape(ctx, rgba(licht, 0.55), rgba(rand, 0.25), 1.5); }
  // dak van de vierde ventrikel: dun, ruitvormig, donkerder
  ctx.beginPath(); ctx.moveTo(62, -168); ctx.lineTo(106, -148); ctx.lineTo(96, -122); ctx.lineTo(66, -134); ctx.closePath(); ctx.fillStyle = rgba(rand, 0.35); ctx.fill();
  // lever (donker, in de leverbult) en hart (in de hartbult, klopt): S-vormige hartbuis met kamer en boezem
  ctx.beginPath(); ctx.ellipse(F.leverC[0], F.leverC[1], 34, 26, -0.3, 0, 6.283); ctx.fillStyle = rgba('#9A3E36', 0.55); ctx.fill();
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2, hs = 1 + 0.07 * slag;
  ctx.save(); ctx.translate(F.hartC[0], F.hartC[1]); ctx.scale(hs, hs);
  ctx.beginPath(); ctx.ellipse(-6, 10, 26, 22, 0.4, 0, 6.283); ctx.fillStyle = rgba('#B83A34', 0.85); ctx.fill(); // kamer
  ctx.beginPath(); ctx.ellipse(14, -16, 18, 14, -0.3, 0, 6.283); ctx.fillStyle = rgba('#8E2E2A', 0.8); ctx.fill(); // boezem (achter-boven)
  ctx.strokeStyle = rgba('#B83A34', 0.85); ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-22, -6); ctx.quadraticCurveTo(-30, -26, -14, -36); ctx.stroke(); // uitstroombaan omhoog
  ctx.restore();
  // somieten langs de rug
  if (detail) { const rug = bioDicht(F.rug, 6); rug.forEach((p, i) => { if (i % 2) return; const q = rug[Math.min(rug.length - 1, i + 1)], an2 = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an2) * 12, p[1] + Math.cos(an2) * 12); ctx.rotate(an2); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.55), null); ctx.restore(); }); }
  // aanleg geslachtsklier tegen de achterwand
  ctx.strokeStyle = rgba(C.oker, 0.6); ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, F.aanleg, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 24; ctx.beginPath(); bioPad(ctx, F.aanleg, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwbogen: drie richels onder het hoofd
  ctx.strokeStyle = rand; ctx.lineWidth = 2.5; [[-104, -84, 30], [-92, -62, 24], [-76, -44, 17]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx + r, by - 4, r, 2.5, 3.75); ctx.stroke(); });
  // oog en oorputje
  _bioCirc(ctx, F.oog[0], F.oog[1], 14, rgba('#4E2E2A', 0.85)); _bioCirc(ctx, F.oog[0] - 2, F.oog[1], 6.5, rgba('#F6E6DC', 0.9));
  ctx.beginPath(); ctx.arc(F.oor[0], F.oor[1], 6, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.2; ctx.stroke();
  // armknop met handplaat en beenknop met voetplaat
  // knop = brede, platte peddel die direct aan het lijf vastzit; de hand-/voetplaat is het verbrede eind (lichte insnoering)
  const knop = (pts, L, B) => { const p0 = pts[0], p1 = pts[pts.length - 1], an = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
    ctx.save(); ctx.translate(p0[0], p0[1]); ctx.rotate(an);
    ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.58, B * 0.5, 0, 0, 6.283); ctx.fillStyle = _mixHex(huid, '#FFFFFF', 0.1); ctx.fill(); // knop
    ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.58, B * 0.5, 0, -1.9, 1.9); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke(); // rand alleen aan de vrije kant
    ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.58, B * 0.5, 0, 0, 6.283); const gz = ctx.createLinearGradient(-L * 0.08, 0, L * 0.35, 0); gz.addColorStop(0, rgba(huid, 1)); gz.addColorStop(1, rgba(huid, 0)); ctx.fillStyle = gz; ctx.fill(); // loopt over in het lijf
    ctx.beginPath(); ctx.ellipse(L * 0.5, 0, L * 0.22, B * 0.44, 0, -1.2, 1.2); ctx.strokeStyle = rgba(rand, 0.45); ctx.lineWidth = 1.8; ctx.stroke(); // grens hand-/voetplaat
    ctx.restore(); };
  knop(F.arm, 70, 38); knop(F.been, 56, 30);
  ctx.restore(); return ret;
}
