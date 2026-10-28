// =====================================================================================
// GELELEKTROFORESE als apparaat in drie-kwart-aanzicht (horizontale bak met deksel, kabels naar de voeding) én,
// na het kleuren, de gel in het UV-kastje (o.foto), op ware maat (bak ± 1,3 × een hand).
// Recept (OpenStax Biology 2e § 17.1): DNA is negatief geladen en loopt naar de pluspool; korte stukken komen
//  verder (afstand lineair met −log lengte); markerladder in laan 1; DNA is onzichtbaar tot het gekleurd is, alleen
//  de paarse laadkleurstof is tijdens het lopen te zien. Foto: donkere gel, banden die oplichten onder UV
//  (wit-oranje), lichte uitstrijk ('smear') onder de banden, putjes als donkere streepjes bovenaan; zo ziet een
//  echte gelfoto eruit en zo lees je een DNA-profiel als streepjescode.
//  Maten (≈, minigel): bak ± 25 × 12 × 7 cm, gel ± 7 × 10 cm, putjes 5 mm, ± 8 mm uit elkaar; zwarte kabel = min
//  aan de kant van de putjes, rode kabel = plus.
//  Bekende fouten: DNA naar de min; grootste stukken het verst; banden al zichtbaar vóór het kleuren.
// x, y = midden van de gel (bovenvlak); s = px per mm. o.loop 0..1, o.kleur 0..1, o.foto (bool), o.deksel 0..1,
// o.laantjes (lijsten bp, eerste = marker), o.a. Geeft { putjes, min, plus, banden } terug.
// =====================================================================================
function gelElektroforese(ctx, x, y, s, o = {}) {
  const { a = 1, loop = 0.7, kleur = 0, foto = false, deksel = 0 } = o;
  const lanes = o.laantjes || [[10000, 6000, 4000, 3000, 2000, 1500, 1000, 700, 500, 300], [3000, 1200, 400], [3000, 800, 400], [5000, 1200], [3000, 1200, 400], [2000, 800]];
  const n = lanes.length, gw = 70, gh = 100, pitch = Math.min(9, (gw - 8) / n), putY = -gh / 2 + 10, loopMax = 72, logMin = Math.log10(200), logMax = Math.log10(12000);
  const afst = (bp) => clamp((logMax - Math.log10(bp)) / (logMax - logMin), 0, 1.05) * loopMax * loop;
  const lx = (i) => -((n - 1) / 2) * pitch + i * pitch;
  // schuine projectie: diepte (y in de bak) loopt omhoog-naar-achter
  const pr = (X, Yd, Z) => foto ? [x + X * s, y + Yd * s] : [x + Yd * s, y + (X * 0.45 - Z * 0.9) * s]; // apparaat: lange as horizontaal (min links), diepte schuin naar achter
  const ret = { putjes: lanes.map((_, i) => pr(lx(i), putY, 0)), min: pr(0, -120, 0), plus: pr(0, 120, 0), banden: lanes.map((L, i) => L.map(bp => [...pr(lx(i), putY + afst(bp), 0), bp])) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const poly = (pts, fill, stroke, lw = 1.5) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...pr(...p)) : ctx.moveTo(...pr(...p))); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  if (foto) { // gel in het UV-kastje (transilluminator): kast met UV-plaat (paars), daarop de gekleurde gel met lichtende banden
    { const k0 = pr(-gw / 2 - 22, -gh / 2 - 22, 0), k1 = pr(gw / 2 + 22, gh / 2 + 34, 0); roundRect(ctx, k0[0], k0[1], k1[0] - k0[0], k1[1] - k0[1], 6 * s); shape(ctx, '#2B2F38', '#4A505C', Math.max(1, 0.6 * s));
      const u0 = pr(-gw / 2 - 12, -gh / 2 - 12, 0), u1 = pr(gw / 2 + 12, gh / 2 + 12, 0); ctx.fillStyle = rgba(C.paars, 0.45); ctx.fillRect(u0[0], u0[1], u1[0] - u0[0], u1[1] - u0[1]);
      const kn = pr(gw / 2 + 8, gh / 2 + 24, 0); circ(ctx, kn[0], kn[1], 3 * s, C.paars); }
    poly([[-gw / 2 - 4, -gh / 2 - 4, 0], [gw / 2 + 4, -gh / 2 - 4, 0], [gw / 2 + 4, gh / 2 + 4, 0], [-gw / 2 - 4, gh / 2 + 4, 0]], '#07090C', null);
    poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], '#14171C', null);
    lanes.forEach((L, i) => { const p = pr(lx(i), putY, 0); ctx.fillStyle = '#2A2E35'; ctx.fillRect(p[0] - 2.5 * s, p[1] - 0.6 * s, 5 * s, 1.2 * s);
      L.forEach((bp, j) => { const q = pr(lx(i), putY + afst(bp), 0); const sterk = i === 0 ? (bp === 3000 || bp === 1000 ? 1 : 0.7) : 1;
        ctx.fillStyle = `rgba(255,225,190,${0.12 * sterk})`; ctx.fillRect(q[0] - 2.4 * s, q[1], 4.8 * s, 3.5 * s); // uitstrijk
        ctx.fillStyle = `rgba(255,236,210,${0.55 + 0.4 * sterk})`; roundRect(ctx, q[0] - 2.4 * s, q[1] - 0.6 * s, 4.8 * s, 1.2 * s, 0.6 * s); ctx.fill();
        ctx.fillStyle = `rgba(255,200,150,${0.25 * sterk})`; roundRect(ctx, q[0] - 2.8 * s, q[1] - 1.1 * s, 5.6 * s, 2.2 * s, 1.1 * s); ctx.fill(); }); });
    ctx.restore(); return ret; }
  const BW = 120, BL = 250, BH = 70, kast = '#3A4A66';
  // bak: bodem, achterwand, buffer, gel, voorwand (doorzichtig)
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6]], '#1E2A40', null);
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [-BW / 2, BL / 2, -BH * 0.6], [-BW / 2, BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.12), rgba(C.er, 0.6)); // achterwand
  poly([[-BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, -BH * 0.6], [BW / 2, -BL / 2, BH * 0.4], [-BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.10), rgba(C.er, 0.6)); // kopse kant links
  poly([[-BW / 2, -BL / 2, 3], [BW / 2, -BL / 2, 3], [BW / 2, BL / 2, 3], [-BW / 2, BL / 2, 3]], rgba(C.teal, 0.16), null); // bufferoppervlak
  // gel (5 mm dik) met putjes
  poly([[gw / 2, -gh / 2, -5], [gw / 2, gh / 2, -5], [gw / 2, gh / 2, 0], [gw / 2, -gh / 2, 0]], rgba('#E8E4D8', 0.30), null);
  poly([[-gw / 2, -gh / 2, 0], [gw / 2, -gh / 2, 0], [gw / 2, gh / 2, 0], [-gw / 2, gh / 2, 0]], rgba('#E8E4D8', 0.20), rgba('#E8E4D8', 0.55), 1);
  lanes.forEach((L, i) => { poly([[lx(i) - 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY - 0.6, 0], [lx(i) + 2.5, putY + 0.6, 0], [lx(i) - 2.5, putY + 0.6, 0]], '#121A26', null);
    const band = (yy, d, fill) => poly([[lx(i) - 2.4, yy - d, 0], [lx(i) + 2.4, yy - d, 0], [lx(i) + 2.4, yy + d, 0], [lx(i) - 2.4, yy + d, 0]], fill, null);
    band(putY + afst(150), 1.2, rgba(C.paars, 0.85 * (1 - kleur * 0.6)));
    if (kleur > 0.01) L.forEach(bp => band(putY + afst(bp), 0.6, rgba('#FFD9A0', kleur))); });
  // elektroden (draad langs de korte kanten) + stekkers en kabels
  for (const [Yd, kl] of [[-BL / 2 + 10, '#2B2F38'], [BL / 2 - 10, C.koraal]]) { ctx.strokeStyle = '#C8D0DA'; ctx.lineWidth = Math.max(1, 0.8 * s); ctx.beginPath(); ctx.moveTo(...pr(-BW / 2 + 8, Yd, -BH * 0.5)); ctx.lineTo(...pr(BW / 2 - 8, Yd, -BH * 0.5)); ctx.stroke();
    const st = pr(-BW / 2 + 14, Yd, BH * 0.4 + 6); ctx.fillStyle = kl; ctx.fillRect(st[0] - 4 * s, st[1] - 8 * s, 8 * s, 10 * s); ctx.strokeStyle = kl; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(st[0], st[1] - 8 * s); ctx.bezierCurveTo(st[0] + (Yd < 0 ? -30 : 30) * s, st[1] - 50 * s, st[0] + (Yd < 0 ? -60 : 60) * s, st[1] - 40 * s, st[0] + (Yd < 0 ? -80 : 80) * s, st[1] - 70 * s); ctx.stroke();
    if (kl === '#2B2F38') { ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 0.7 * s; ctx.stroke(); } }
  poly([[-BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [-BW / 2, BL / 2, BH * 0.4]], rgba(C.er, 0.08), rgba(C.er, 0.7)); // kopse kant rechts
  poly([[BW / 2, -BL / 2, -BH * 0.6], [BW / 2, BL / 2, -BH * 0.6], [BW / 2, BL / 2, BH * 0.4], [BW / 2, -BL / 2, BH * 0.4]], rgba(C.er, 0.06), rgba(C.er, 0.7)); // voorwand (doorzichtig)
  if (deksel > 0.01) { ctx.save(); ctx.globalAlpha *= deksel; poly([[-BW / 2 - 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, -BL / 2 - 3, BH * 0.4 + 2], [BW / 2 + 3, BL / 2 + 3, BH * 0.4 + 2], [-BW / 2 - 3, BL / 2 + 3, BH * 0.4 + 2]], rgba(C.er, 0.18), C.er); ctx.restore(); }
  ctx.restore(); return ret;
}
