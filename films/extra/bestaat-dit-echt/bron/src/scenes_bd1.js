// Bijzondere dieren 1 · Bestaat dit echt? — scènes per alinea (v1.0, 22 okt 2026)
// Dieren uit teken_bd1.js/teken_bd1b.js (Part C9-recepten); keyframes goedgekeurd in de storyboardkeuring.
const U = (t, t0, d = 0.8) => ease((t - t0) / d);
function oordeel(ctx, s2, a, col = C.goud) { stempel(ctx, 1600, 200, s2, col, a, -0.12); }
function kaartIn(ctx, a, x, y, w, h, kop, r2, col) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 20); kaartje_(ctx, x, y, w, h, kop, r2, col); ctx.restore(); }
function vertraagd(ctx, s2, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, 80, 860, C.goud, 'left', 26); ctx.restore(); }
function ruimteRaket(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[0, -120], [30, -60], [30, 60], [-30, 60], [-30, -60]], '#C8CCD4', '#E8ECF2', 2); vul(ctx, [[30, 20], [56, 70], [30, 60]], C.koraal); vul(ctx, [[-30, 20], [-56, 70], [-30, 60]], C.koraal); circ(ctx, 0, -40, 12, '#3A6A8A', '#AFC0D0', 2); ctx.restore(); }
function sterren(ctx, a = 1) { for (let i = 0; i < 60; i++) circ(ctx, hash(i * 2.3) * W, hash(i * 5.1) * 860, 1 + hash(i) * 1.6, rgba('#F2F2EE', 0.5 * a)); }

Object.assign(SCENES, {
  title(ctx, t) { kwalT(ctx, 1500, 420, 1.5, { t }); beerdiertje(ctx, 1320, 820, 0.9, { t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { onderWater(ctx, t, { bodem: '#2E3A36' });
    const a1 = q.on('ruimte', 1), a2 = q.on('kreeft', 1), a3 = q.on('kever', 1), rest = q.on('bestaan', 1, 1.2);
    beerdiertje(ctx, 330, 390 + (1 - a1) * 40, 0.75, { t, a: a1 }); bidsprinkhaankreeft(ctx, 960, 400, 0.8, { t, a: a2, slag: clamp((t - q.at('slaat', 1)) * 4, 0, 1) * (1 - clamp((t - q.at('slaat', 1) - 0.6) * 2, 0, 1)) });
    bombardeerkever(ctx, 1560, 360, 0.65, { t, a: a3, rot: 1.57, spuit: clamp((t - q.at('spuit', 1)) * 2, 0, 1) * (1 - clamp((t - q.at('spuit', 1) - 1.4), 0, 1)), richting: Math.PI * 0.4 });
    axolotl(ctx, 380, 760, 0.6, { t, a: rest }); octopus(ctx, 860, 840, 0.38, { t, a: rest }); kwalT(ctx, 1260, 640, 0.5, { t, a: rest }); molrat(ctx, 1650, 780, 0.7, { t, a: rest });
    const st = q.on('overdreven', 1); if (st > 0.01) oordeel(ctx, 'klopt het?', st, C.goud); },

  // ---------- 1. Beerdiertje ----------
  s03(ctx, t, q) { microGrond(ctx); const z = U(t, 0, 3.5); ctx.save(); const k = lerp(0.35, 1, z); ctx.translate(960, 900); ctx.scale(k, k); ctx.translate(-960, -900); mosVeld(ctx); ctx.restore();
    beerdiertje(ctx, lerp(1300, 1000, U(t, 1.5, 4)), 740, 2.1 * z, { t, a: z });
    naamBij(ctx, 'beerdiertje', 'echt: ±0,5 mm', 1480, 380, q.on('halve', 1)); schaalBalk(ctx, 260, '0,1 mm (vergroot)');
    const c = q.on('onsterfelijk', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 620, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Beerdiertjes zijn onsterfelijk!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s05(ctx, t, q) { microGrond(ctx); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4) * (1 - q.on('raket', 1)));
    const tun = U(t, q.at('trekt', 1), 2.2); beerdiertje(ctx, 760, 620, 1.9, { t, tun });
    kaartIn(ctx, q.on('zevenendertig', 1), 140, 680, 420, 120, '37 °C', 'na een dag: de helft dood', C.koraal); naamBij(ctx, 'tonnetje', 'uitgedroogd', 820, 300, q.on('tonnetje', 1));
    kaartIn(ctx, q.on('diepgevroren', 1), 1200, 520, 420, 120, '30 jaar', 'diepgevroren in mos', C.teal);
    const r = q.on('raket', 1); if (r > 0.01) { sterren(ctx, r * 0.6); ruimteRaket(ctx, 1300, 330, 1, r); }
    kaartIn(ctx, q.on('ruimte', 1), 1200, 680, 420, 120, '10 dagen', 'in de ruimte', C.goud);
    const z = q.on('zonlicht', 1); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; circ(ctx, 1800, 120, 50, C.goud); for (let i = 0; i < 10; i++) { const an = i * 0.628; lijn(ctx, [[1800 + Math.cos(an) * 64, 120 + Math.sin(an) * 64], [1800 + Math.cos(an) * 90, 120 + Math.sin(an) * 90]], C.goud, 4); } ctx.restore(); naamBij(ctx, 'fel zonlicht', 'UV: bijna niemand overleefde', 1660, 230, z, 'right', C.koraal); } },
  s06(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('Droogt', 1), 2.5), op = U(t, q.at('water', 1), 2);
    const kracht = g * (1 - op); const cx = 760, cy = 460; cel(ctx, cx, cy, lerp(300, 270, kracht), '#22344E');
    for (let i = 0; i < 16; i++) { const a0 = hash(i * 3) * 6.283 + t * 0.15 * (1 - kracht), rr = hash(i * 5) * 210; const px = cx + Math.cos(a0) * rr, py = cy + Math.sin(a0) * rr; const P = []; for (let k = 0; k < 7; k++) P.push([px + Math.sin(k * 1.3 + i + t * (1 - kracht)) * 20 + k * 6, py + Math.cos(k * 0.9 + i) * 18]); lijn(ctx, P, rgba(C.oker, 1 - kracht * 0.6), 4); }
    if (kracht > 0.01) { ctx.save(); ctx.globalAlpha *= kracht; ctx.strokeStyle = rgba(C.oker, 0.85); ctx.lineWidth = 4; for (let i = 0; i < 26; i++) { const a0 = hash(i * 7) * 6.283, a1 = a0 + 1 + hash(i) * 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a0) * 260, cy + Math.sin(a0) * 260); ctx.lineTo(cx + Math.cos(a1) * 260, cy + Math.sin(a1) * 260); ctx.stroke(); } ctx.restore(); }
    for (let i = 0; i < 9; i++) { const a0 = hash(i * 11) * 6.283 + t * 0.4 * (1 - kracht), rr = hash(i * 13) * 190; circ(ctx, cx + Math.cos(a0) * rr, cy + Math.sin(a0) * rr, 14, '#7A8BA8', '#AFC0D0', 2); }
    naamBij(ctx, 'eiwitten', 'alleen bij beerdiertjes', 1120, 300, q.on('eiwitten', 1), 'left', C.oker); naamBij(ctx, 'gel', 'houdt alles op zijn plek', 1120, 470, q.on('gel', 1) * (1 - op), 'left', C.oker); naamBij(ctx, 'weer water', 'gel lost op', 1120, 640, op, 'left', C.teal);
    beerdiertje(ctx, 1500, 840, 0.6, { t, tun: kracht, a: 0.9 }); },
  s07(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('DNA', 1); helix(ctx, 460, 470, 1000, 70, 1, t * 0.6);
    const w = q.on('wolk', 1, 1.2); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.fillStyle = rgba('#7A8BA8', 0.28); zacht(ctx, [[420, 360], [800, 330], [1200, 350], [1500, 360], [1520, 590], [1200, 600], [800, 610], [420, 590]]); ctx.fill(); ctx.strokeStyle = rgba('#AFC0D0', 0.7); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    const s2 = q.on('straling', 1); for (let i = 0; i < 6; i++) { const x0 = 520 + i * 180, ph = ((t * 0.7 + i * 0.37) % 1); const yy = lerp(120, w > 0.5 ? 330 : 400, ph); pijl(ctx, x0 + 40 - ph * 40, yy - 80, x0 + 40 - ph * 40 - 10, yy, C.koraal, s2 * (1 - ph * 0.3), 4); }
    naamBij(ctx, 'straling', '', 520, 110, s2); naamBij(ctx, 'DNA', '', 300, 480, d, 'left', C.paars); naamBij(ctx, 'beschermwolk', 'een speciaal eiwit', 1530, 660, w, 'right');
    const m = q.on('Mos', 1) * (1 - d); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; bg(ctx, 'schema'); mosVeld(ctx); text(ctx, 'nat → droog → nat → droog', 960, 300, fTekst(48, 700), C.text, 'center'); ctx.restore(); } },

  // ---------- 2. Axolotl ----------
  s08(ctx, t, q) { onderWater(ctx, t); axolotl(ctx, lerp(1400, 980, U(t, 0, 3)), 700, 2.2, { t, poot: q.at('aan', 1) ? (t < q.at('af', 1) ? 1 : U(t, q.at('aan', 1), 3)) : 1 });
    naamBij(ctx, 'kieuwen', 'blijft een larve', 1180, 300, q.on('kieuwen', 1)); const v = q.on('vis', 1) * (1 - q.on('aan', 1)); vis(ctx, 1500, 560, 1.4, '#9AB8C8', { kijk: -1 }); if (v < 0.01 && t < q.at('vis', 1)) {}
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 700, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Hij kan alles teruggroeien!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s10(ctx, t, q) { onderWater(ctx, t); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); axolotl(ctx, 960, 640, 2.1, { t });
    [['poten', 'ja', 640, 820, 'Poten'], ['staart', 'ja', 300, 420, 'staart'], ['kieuwen', 'ja', 1180, 300, 'kieuwen'], ['hart, hersenen', 'stukjes', 200, 300, 'hart'], ['kop', 'nee', 1520, 420, 'kop']].forEach(([n, m, x, y, w]) => naamBij(ctx, n, m, x, y, q.on(w, 1), 'left', m === 'nee' ? C.koraal : C.groen)); },
  s11(ctx, t, q) { bg(ctx, 'schema'); const huid = '#EEC3BC'; const fase = [q.at('huidcellen', 1), q.at('blastema', 1), q.at('arm', 1), q.at('vingers', 1)];
    const x0 = 960, y0 = 760; ctx.save(); ctx.translate(x0, y0); roundRect(ctx, -60, -40, 120, 140, 26); ctx.fillStyle = huid; ctx.fill();
    const w1 = U(t, fase[0], 1.2); if (w1 > 0) { ctx.strokeStyle = rgba('#F6DCD6', w1); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -40, 60, Math.PI, Math.PI + Math.PI * w1); ctx.stroke(); }
    const b = U(t, fase[1] - 1.5, 1.5); if (b > 0) { ctx.beginPath(); ctx.ellipse(0, -60, 56 * b, 50 * b, 0, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
    const g = U(t, fase[2] - 0.4, 2.5); if (g > 0) { roundRect(ctx, -40, -60 - 260 * g, 80, 260 * g, 36); ctx.fillStyle = huid; ctx.fill(); }
    const v = U(t, fase[3] - 0.3, 1.5); if (v > 0) { for (let k = 0; k < 4; k++) { ctx.save(); ctx.translate(0, -60 - 250 * g); ctx.rotate(-0.6 + k * 0.4); roundRect(ctx, -10, -90 * v, 20, 90 * v, 10); ctx.fillStyle = huid; ctx.fill(); ctx.restore(); } }
    ctx.restore(); naamBij(ctx, 'wond dicht', 'geen korst, geen litteken', 1140, 760, q.on('korst', 1)); naamBij(ctx, 'afweercellen', 'ruimen op, geven startsein', 1140, 640, q.on('Afweercellen', 1), 'left', C.teal);
    for (let i = 0; i < 5; i++) { const a = q.on('Afweercellen', 1) * (1 - q.on('jong', 1)); circ(ctx, 860 + i * 50 + Math.sin(t * 2 + i) * 8, 700 + Math.cos(t * 1.7 + i) * 8, 14, rgba(C.teal, a), null); }
    naamBij(ctx, 'blastema', 'bultje delende cellen', 1140, 560, q.on('blastema', 1), 'left', C.koraal); naamBij(ctx, 'arm, hand, vingers', 'in volgorde', 1140, 330, q.on('arm', 1)); },
  s12(ctx, t, q) { bg(ctx, 'schema'); const c = q.on('pinkkant', 1), d = q.on('duimkant', 1);
    ctx.save(); ctx.translate(820, 520); ctx.beginPath(); ctx.ellipse(0, 0, 340, 210, 0, 0, 6.283); ctx.fillStyle = '#EEC3BC'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.55 * c); ctx.fillRect(-400, -260, 400, 520); ctx.fillStyle = rgba(C.oker, 0.55 * d); ctx.fillRect(0, -260, 400, 520); ctx.restore();
    for (let i = 0; i < 40; i++) circ(ctx, -300 + hash(i * 3) * 600, -170 + hash(i * 5) * 340, 12, rgba('#F6E0DA', 0.8), '#D9A49C', 1.5); ctx.restore();
    naamBij(ctx, 'pinkkant', 'ander gen aan', 520, 260, c, 'center', C.teal); naamBij(ctx, 'duimkant', '', 1120, 260, d, 'center', C.oker); naamBij(ctx, 'blastema', '', 820, 800, 1, 'center');
    const m = q.on('mensen', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; persoon(ctx, 'lotte', 1560, 820, 380, { t, uit: 'verbaasd' }); ctx.restore(); naamBij(ctx, 'zelfde genen', 'anders aangestuurd', 1560, 380, m, 'center'); }
    const w = q.on('wild', 1); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); onderWater(ctx, t, { bodem: '#3A3A30', diep: '#2A3A3A', midden: '#34463E', licht: '#3E5446' }); axolotl(ctx, 960, 700, 1.4, { t, kleur: 'wild' }); ctx.restore(); kaartIn(ctx, q.on('moeilijk', 1), 160, 200, 760, 130, 'Bijna verdwenen', 'in het wild ernstig bedreigd', C.koraal); } },

  // ---------- 3. Bidsprinkhaankreeft ----------
  s13(ctx, t, q) { onderWater(ctx, t, { bodem: '#4A4A3A' }); const k = q.at('kapot', 1), sl = clamp((t - k + 0.5) * 5, 0, 1) * (1 - clamp((t - k) * 2, 0, 1));
    bidsprinkhaankreeft(ctx, lerp(500, 820, U(t, 0, 3)), 760, 2.0, { t, slag: sl }); const kap = t > k; if (!kap) slakkenhuis(ctx, 1480, 760, 110); else { for (let i = 0; i < 7; i++) { const u = clamp((t - k) * 1.2, 0, 1); vul(ctx, [[0, 0], [30, -10], [20, 20]].map(([a, b]) => [1480 + a + Math.cos(i) * 120 * u, 740 + b + Math.sin(i * 1.7) * 60 * u - 60 * u + 140 * u * u]), '#B8946A', '#D8B48A', 2); } }
    naamBij(ctx, 'knots', 'onder de kop', 1040, 860 - 40, q.on('knotsen', 1));
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 760, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Zijn slag is sneller dan een kogel!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s15(ctx, t, q) { bg(ctx, 'schema'); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); text(ctx, 'Snelheid', 160, 260, fTekst(48, 700), C.text, 'left');
    const a = q.on('tachtig', 1), b = q.on('kogel', 1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, 'knots', 160, 384, fTekst(38, 600), C.text, 'left'); roundRect(ctx, 460, 340, 1300 * 80 / 1200, 60, 10); shape(ctx, rgba(C.koraal, 0.75), C.koraal, 2); text(ctx, '± 80 km/u', 460 + 1300 * 80 / 1200 + 20, 384, fTekst(34, 600), C.koraal, 'left'); ctx.restore(); }
    if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; const bw = (1600 - 300) * U(t, q.at('kogel', 1), 1.2); text(ctx, 'kogel', 160, 504, fTekst(38, 600), C.text, 'left'); roundRect(ctx, 460, 460, Math.max(14, bw), 60, 10); shape(ctx, rgba(C.line, 0.75), C.line, 2); if (bw > 900) text(ctx, 'meer dan 1000 km/u', 460 + bw - 24, 504, fTekst(34, 700), C.bgSchema, 'right'); ctx.restore(); }
    kaartIn(ctx, q.on('optrekken', 1), 160, 640, 980, 130, 'Optrekken: net zo heftig', 'topsnelheid binnen een paar duizendsten van een seconde', C.goud); },
  s16(ctx, t, q) { bg(ctx, 'schema'); const sp = U(t, q.at('spant', 1), 2.5), los = t > q.at('los', 1) ? clamp((t - q.at('los', 1)) * 6, 0, 1) : 0;
    bidsprinkhaankreeft(ctx, 640, 700, 1.7, { t, slag: los });
    ctx.save(); ctx.translate(1350, 470); const amp = lerp(30, 12, sp * (1 - los)), len = lerp(320, 220, sp * (1 - los)); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i < 9; i++) ctx.lineTo(-160 + i * len / 8, i % 2 ? -amp : amp); ctx.stroke();
    circ(ctx, -160 + len + 40, 0, 30, C.koraal); const palA = q.on('pal', 1); roundRect(ctx, -160 + len + 0, -70 + los * -40, 22, 50, 6); shape(ctx, rgba(C.teal, palA), null); ctx.restore();
    naamBij(ctx, 'veer', 'langzaam gespannen', 1200, 380, q.on('veer', 1)); naamBij(ctx, 'pal', 'houdt vast', 1490, 360, q.on('pal', 1), 'left', C.teal); naamBij(ctx, 'kruisboog', 'zelfde idee', 1200, 640, q.on('kruisboog', 1), 'left', C.goud); },
  s17(ctx, t, q) { onderWater(ctx, t, { bodem: '#4A4A3A' }); const t0 = q.at('dampbel', 1); const fase = clamp((t - t0 + 1) / 3, 0, 1);
    bidsprinkhaankreeft(ctx, 700, 760, 1.8, { t, slag: 1 }); const r = fase < 0.6 ? fase / 0.6 * 46 : 46 * (1 - (fase - 0.6) / 0.4); if (t > t0 - 1 && fase < 1) bel(ctx, 1090, 660, Math.max(2, r));
    if (fase >= 1 && t < t0 + 3) { for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba('#E6F4FF', 0.6 - i * 0.12); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1090, 660, 30 + i * 40 + (t - t0 - 2) * 80, 0, 6.283); ctx.stroke(); } }
    vertraagd(ctx, '1000× vertraagd', q.on('dampbel', 1)); naamBij(ctx, 'dampbel', 'lage druk, geen hitte', 1180, 560, q.on('cavitatie', 1)); stempel(ctx, 1400, 300, 'kookt niet', C.koraal, q.on('kookt', 1), -0.1);
    const v = q.on('knots', 2); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.translate(1550, 300); ctx.beginPath(); ctx.arc(0, 0, 150, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.clip(); for (let k = 0; k < 6; k++) { const yy = 90 - k * 36; ctx.save(); ctx.translate(0, yy); ctx.scale(1, 0.32); ctx.rotate(k * 0.45 + t * 0.1); ctx.strokeStyle = rgba(C.koraal, 0.45 + k * 0.09); ctx.lineWidth = 6; for (let i2 = -7; i2 <= 7; i2++) { ctx.beginPath(); ctx.moveTo(-160, i2 * 22); ctx.lineTo(160, i2 * 22); ctx.stroke(); } ctx.restore(); }
      const bx = U(t, q.at('barstje', 1), 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -140); let px = 0, py = -140; for (let k = 0; k < 6 * bx; k++) { px += (k % 2 ? 26 : -22); py += 34; ctx.lineTo(px, py); } ctx.stroke(); ctx.restore(); metaText(ctx, 'vezels in een spiraal', 1550, 480, C.goud, 'center', 24); } },

  // ---------- 4. Pistoolgarnaal ----------
  s18(ctx, t, q) { onderWater(ctx, t); pistoolgarnaal(ctx, 820, 720, 2.2, { t, open: U(t, 1, 1.5) }); vis(ctx, lerp(1900, 1640, U(t, 2, 4)), 600, 1.4, '#9AB8C8', { kijk: -1 });
    naamBij(ctx, 'knalschaar', 'half zo lang als het lijf', 1100, 470, q.on('schaar', 1)); schaalBalk(ctx, 300, '1 cm (vergroot)'); const h = q.on('hardste', 1); if (h > 0.01) { for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.goud, h * (0.5 - i * 0.12)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1240, 700, 60 + i * 40, -0.7, 0.7); ctx.stroke(); } } },
  s20(ctx, t, q) { onderWater(ctx, t); const t0 = q.at('Klapt', 1); const o = t < t0 ? 1 : 1 - clamp((t - t0) * 8, 0, 1); const bf = clamp((t - q.at('bel', 2)) / 2.5, 0, 1);
    pistoolgarnaal(ctx, 680, 720, 2.0, { t, open: o, bel: bf < 1 ? bf : 0 }); if (t > t0) { const jl = clamp((t - t0) * 2, 0, 1); ctx.strokeStyle = rgba('#E6F4FF', 0.7 * (1 - bf)); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1040, 726); ctx.lineTo(1040 + 200 * jl, 726); ctx.stroke(); }
    const kn = q.on('knal', 1); if (kn > 0.01) for (let i = 0; i < 5; i++) { ctx.strokeStyle = rgba('#E6F4FF', 0.6 - i * 0.1); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1180, 720, 80 + i * 60 + kn * 40, -0.6, 0.6); ctx.stroke(); }
    vis(ctx, 1600, 700, 1.4, '#9AB8C8', { kijk: -1, verdoofd: kn }); naamBij(ctx, 'straaltje water', '± 90 km/u', 1000, 520, q.on('straaltje', 1)); naamBij(ctx, 'bel', 'net als bij de kreeft', 1160, 900 - 60, q.on('bel', 2)); vertraagd(ctx, 'vertraagd', q.on('Klapt', 1)); },
  s21(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('schiet', 1); const o = t < t0 ? U(t, 0.5, 1.5) * 0.8 : 0.8 * (1 - clamp((t - t0) * 6, 0, 1)); const kl = q.on('Verliest', 1);
    ctx.save(); ctx.translate(-700, 300); pistoolgarnaal(ctx, 1000, 400, 4.0, { t, open: o, a: 1 - kl }); ctx.restore();
    naamBij(ctx, 'zuiger', 'op het vingertje', 1180, 290, q.on('zuiger', 1) * (1 - kl)); naamBij(ctx, 'kuiltje', 'in de schaar', 1340, 640, q.on('kuiltje', 1) * (1 - kl));
    if (kl > 0.01) { const g = U(t, q.at('groeit', 1), 3); ctx.save(); ctx.globalAlpha *= kl; ctx.translate(960, 640); vul(ctx, [[-260, 0], [-200, -60], [-60, -80], [60, -60], [120, -20], [60, 20], [-200, 20]], '#E3A27A', '#F4C8A8', 2); ctx.translate(120, -30); ctx.scale(lerp(0.4, 1.4, g), lerp(0.4, 1.4, g)); vul(ctx, [[0, -26], [50, -34], [110, -30], [130, -14], [176, 0], [180, 10], [130, 18], [70, 24], [8, 20], [-6, -2]], '#D0703E', '#F0A070', 2); ctx.restore(); naamBij(ctx, 'kleine schaar', 'groeit uit tot knalschaar', 960, 820, kl, 'center'); } },
  s22(ctx, t, q) { onderWater(ctx, t); const t0 = q.at('klapt', 1); const r = lerp(140, 8, clamp((t - t0 + 0.5) / 1.5, 0, 1)); bel(ctx, 960, 470, r); const f = q.on('flitsje', 1) * (1 - clamp((t - q.at('flitsje', 1) - 1.2), 0, 1));
    if (f > 0.01) { circ(ctx, 960, 470, 26, rgba('#FFF6D8', 0.9 * f)); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; lijn(ctx, [[960 + Math.cos(an) * 40, 470 + Math.sin(an) * 40], [960 + Math.cos(an) * 70, 470 + Math.sin(an) * 70]], rgba('#FFF6D8', 0.6 * f), 3); } }
    naamBij(ctx, 'misschien zo heet als de zon', 'schatting', 960, 700, q.on('zon', 1), 'center', C.goud); naamBij(ctx, 'flitsje licht', 'te zwak om te zien', 1200, 330, q.on('flitsje', 1)); vertraagd(ctx, 'sterk vertraagd', 1);
    const s = q.on('kolonie', 1); if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; ctx.fillStyle = rgba('#14324A', 0.92); ctx.fillRect(0, 0, W, 880); for (let i = 0; i < 9; i++) pistoolgarnaal(ctx, 200 + i * 190, 760 - (i % 2) * 60, 0.45, { t: t + i, open: (Math.sin(t * 3 + i) > 0.6) ? 1 : 0 }); ctx.restore(); naamBij(ctx, 'stoort sonar', 'van onderzeeboten', 960, 300, q.on('onderzeebootsonar', 1), 'center'); } },

  // ---------- 5. Octopus ----------
  s23(ctx, t, q) { onderWater(ctx, t); octopus(ctx, 760, 760, 1.4, { t }); const h = q.on('hond', 1); hond(ctx, lerp(2100, 1500, U(t, q.at('hond', 1), 2)), 760, 0.9, { t, a: h });
    naamBij(ctx, '500 miljoen zenuwcellen', '', 520, 220, q.on('vijfhonderd', 1)); naamBij(ctx, 'ongeveer even veel', '', 1380, 470, h); },
  s25(ctx, t, q) { onderWater(ctx, t); const k = U(t, q.at('kleur', 1), 1); const kl = '#' + [0xB0, 0x60, 0x3E].map((c, i) => Math.round(lerp(c, [0xC8, 0xB4, 0x8A][i], k)).toString(16).padStart(2, '0')).join('');
    octopus(ctx, 960, 780, 1.5, { t, kleur: kl, vlek: lerp(0.5, 0.9, k) }); const z = q.on('armen', 1);
    if (z > 0.01) for (let i = 0; i < 60; i++) { const an = hash(i * 3) * 3.4 + 2.9, rr = 120 + hash(i * 7) * 220; circ(ctx, 960 + Math.cos(an) * rr * 1.2, 700 + Math.abs(Math.sin(an)) * rr * 0.5 + 40, 4, rgba(C.goud, z * (0.5 + 0.5 * Math.sin(t * 3 + i)))); }
    naamBij(ctx, 'twee derde', 'in de armen', 1400, 820, q.on('derde', 1)); naamBij(ctx, 'hersenen', 'geven de opdracht', 1080, 300, q.on('hersenen', 1)); },
  s26(ctx, t, q) { bg(ctx, 'schema'); const sp = 0.5 + 0.5 * Math.sin((t - q.at('trekken', 1)) * 1.6); const o = t < q.at('trekken', 1) ? 0.2 : t < q.at('Laten', 1) ? lerp(0.2, 1, U(t, q.at('trekken', 1), 1.2)) : lerp(1, 0.2, U(t, q.at('Laten', 1), 1));
    const cx = 760; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; lijn(ctx, [[cx + Math.cos(an) * (50 + 150 * o), 470 + Math.sin(an) * (50 + 150 * o)], [cx + Math.cos(an) * 320, 470 + Math.sin(an) * 320]], '#D8A090', 5); }
    circ(ctx, cx, 470, 50 + 150 * o, '#B04A2E', '#E08A6A', 3); naamBij(ctx, 'kleurzakje', o > 0.6 ? 'open: grote vlek' : 'dicht: stipje', cx, 860 - 40, 1, 'center'); naamBij(ctx, 'spiertjes', '', 1100, 230, q.on('spiertjes', 1));
    const l = q.on('weerkaatsen', 1); if (l > 0.01) { ctx.save(); ctx.globalAlpha *= l; for (let i = 0; i < 6; i++) { roundRect(ctx, 1180, 400 + i * 40, 520, 26, 8); shape(ctx, i < 3 ? rgba(C.teal, 0.5 + i * 0.1) : rgba('#F2F2EE', 0.35), null); } ctx.restore(); naamBij(ctx, 'lagen die licht weerkaatsen', '', 1180, 690, l); } },
  s27(ctx, t, q) { bg(ctx, 'schema'); dierOog(ctx, 560, 440, 170, '#D8B44A', { pupil: 'liggend', rand: '#B0603E' }); naamBij(ctx, 'één soort lichtcel', 'waarschijnlijk kleurenblind', 560, 760, q.on('kleurenblind', 1), 'center');
    kaartIn(ctx, q.on('huid', 1), 1040, 300, 760, 130, 'Hypothese 1', 'zijn huid voelt zelf licht', C.paars); kaartIn(ctx, q.on('pupil', 1), 1040, 470, 760, 130, 'Hypothese 2', 'de vorm van zijn pupil helpt', C.paars); kaartIn(ctx, q.on('hypothesen', 1), 1040, 640, 760, 130, 'Nog niet bekend', 'onderzoekers zoeken het uit', C.line); },

  // ---------- 6. Vogelbekdier ----------
  s28(ctx, t, q) { bodemLand(ctx); ctx.fillStyle = '#24587A'; ctx.fillRect(0, 760, W, 320); const e = q.on('eend', 1), b = q.on('bever', 1), ei = q.on('eieren', 1);
    vogelbekdier(ctx, lerp(500, 900, U(t, 0, 3)), 740, 2.0, { t }); naamBij(ctx, 'snavel', 'als een eend', 1400, 560, e); naamBij(ctx, 'staart', 'als een bever', 300, 560, b);
    if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; ctx.beginPath(); ctx.ellipse(1520, 712, 26, 32, 0, 0, 6.283); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.beginPath(); ctx.ellipse(1576, 716, 24, 30, 0.2, 0, 6.283); ctx.fill(); ctx.restore(); naamBij(ctx, 'eieren', 'in een hol in de oever', 1460, 640, ei); }
    const g = q.on('gek', 1); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.fillStyle = rgba(C.bgSchema, 0.85); ctx.fillRect(0, 0, W, 880); vogelbekdier(ctx, 960, 560, 1.8, { t }); for (let i = 0; i < 5; i++) { ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1230, 470 + i * 14); ctx.lineTo(1260, 474 + i * 14); ctx.stroke(); } text(ctx, 'Europa, eind 18e eeuw: "nep!"', 960, 300, fTekst(48, 700), C.text, 'center'); ctx.restore(); } },
  s30(ctx, t, q) { bodemLand(ctx); vogelbekdier(ctx, 900, 760, 2.0, { t }); vogelbekdier(ctx, 1500, 790, 0.7, { t, kijk: -1, a: q.on('jongen', 1) });
    const m = q.on('melk', 1); for (let i = 0; i < 6; i++) circ(ctx, 820 + i * 30, 700 + (i % 2) * 8, 7, rgba('#F4F0E4', m)); naamBij(ctx, 'melk op de buik', 'geen tepels', 700, 880 - 60, q.on('tepels', 1), 'center'); naamBij(ctx, 'vacht', '', 760, 470, q.on('vacht', 1)); stempel(ctx, 1500, 260, 'zoogdier', C.groen, q.on('zoogdier', 1), -0.1); },
  s31(ctx, t, q) { onderWater(ctx, t); const d = q.on('dicht', 1); vogelbekdier(ctx, 760, 560, 1.9, { t, zwem: 1, ogenDicht: d });     pistoolgarnaal(ctx, 1500, 700, 0.6, { t }); const e = q.on('stroompje', 1);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; ctx.strokeStyle = rgba(C.teal, (0.7 - ph * 0.7) * Math.max(e, q.on('elektriciteit', 1) * 0.6)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1460, 640, 40 + ph * 320, Math.PI * 0.75, Math.PI * 1.25); ctx.stroke(); }
    naamBij(ctx, '40.000 zintuigcellen', 'voelen elektriciteit', 1000, 360, q.on('veertigduizend', 1)); naamBij(ctx, 'ogen, oren, neus dicht', '', 300, 330, d); },
  s32(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('voorouders', 1), 2.5);
    lijn(ctx, [[300, 800], [lerp(300, 960, g), lerp(800, 650, g)]], C.line, 6); if (g > 0.99) { const g2 = U(t, q.at('voorouders', 1) + 2.5, 1.5); lijn(ctx, [[960, 650], [lerp(960, 1600, g2), lerp(650, 300, g2)]], C.line, 6); lijn(ctx, [[960, 650], [lerp(960, 1600, g2), lerp(650, 760, g2)]], C.line, 6); lijn(ctx, [[1280, 475], [lerp(1280, 1600, g2), lerp(475, 520, g2)]], C.line, 6 * (g2 > 0.5 ? 1 : 0)); }
    const tak = q.on('tak', 1); vogelbekdier(ctx, 1700, 790, 0.45, { a: tak }); naamBij(ctx, 'eieren leggers', 'vogelbekdier, mierenegel', 1640, 840, tak, 'left', C.oker); naamBij(ctx, 'buideldieren', '', 1640, 540, tak); naamBij(ctx, 'placentadieren', 'mens, hond, muis', 1640, 300, tak);
    naamBij(ctx, 'voorouder', 'legde eieren, gaf al melk', 300, 860 - 40, q.on('voorouders', 1), 'left', C.goud); stempel(ctx, 700, 300, 'melk ouder dan tepels', C.groen, q.on('tepels', 1), -0.08);
    const s = q.on('spoor', 1); if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fillRect(0, 0, W, 880); vogelbekdier(ctx, 900, 700, 2.2, { t, spoor: 1 }); ctx.restore(); naamBij(ctx, 'giftige spoor', 'alleen het mannetje', 660, 830, s, 'left', C.koraal); } },

  // ---------- 7. Naakte molrat ----------
  s33(ctx, t, q) { grondDoorsnede(ctx); const m = U(t, 0, 2); molrat(ctx, lerp(700, 960, m), 660, 1.6, { t, koningin: q.on('koningin', 1) }); molrat(ctx, 420 - Math.sin(t * 0.5) * 30, 650, 1.0, { t, a: q.on('anderen', 1) }); molrat(ctx, 1500 + Math.sin(t * 0.4) * 30, 660, 1.0, { t, kijk: -1, a: q.on('anderen', 1) });
    naamBij(ctx, 'tanden', 'buiten de mond', 1260, 520, q.on('tanden', 1)); naamBij(ctx, 'koningin', 'krijgt als enige jongen', 920, 440, q.on('koningin', 1), 'center', C.goud);
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 230, 760, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Molratten krijgen nooit kanker!"', 170, 298, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 220, C.text2, 'left', 22); ctx.restore(); } },
  s35(ctx, t, q) { bg(ctx, 'schema'); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); kaartIn(ctx, q.on('zelden', 1), 160, 200, 900, 130, 'Kanker: heel zelden', 'een paar gevallen, bij dieren ouder dan 20 jaar', C.koraal);
    const a = q.on('dertig', 1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, 'Hoe oud ze worden', 160, 460, fTekst(44, 700), C.text, 'left'); const g = U(t, q.at('dertig', 1), 1.5); staafVergelijk(ctx, [['muis', 3, C.line, 'een paar jaar'], ['naakte molrat', 3 + 29 * g, C.groen, 'meer dan 30 jaar']], 160, 520, 1500); ctx.restore(); } },
  s36(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('suikerketen', 1, 1.5);
    for (let i = 0; i < 9; i++) { const cx = 520 + (i % 3) * 200, cy = 330 + Math.floor(i / 3) * 200; cel(ctx, cx, cy, 86, '#2A3A58'); circ(ctx, cx, cy, 30, C.kern, C.kernR, 2); }
    if (k > 0.01) for (let i = 0; i < 6; i++) { const P = []; const n = Math.floor(30 * k); for (let j = 0; j < Math.max(2, n); j++) P.push([400 + j * 30, 260 + i * 110 + Math.sin(j * 0.8 + i + t * 0.6) * 20]); lijn(ctx, P, rgba(C.oker, 0.8), 4); }
    const st = q.on('stoppen', 1); const dc = q.on('kanker', 2); if (dc > 0.01) { ctx.save(); ctx.globalAlpha *= dc; for (let i = 0; i < 7; i++) cel(ctx, 1500 + Math.cos(i) * 90 * dc, 470 + Math.sin(i * 1.3) * 90 * dc, 46, '#4A2A2A', C.koraal); ctx.restore(); naamBij(ctx, 'kanker', 'cellen gaan door met delen', 1500, 700, dc, 'center', C.koraal); }
    naamBij(ctx, 'lange suikerketens', 'hyaluronzuur', 1100, 230, k, 'left', C.oker); naamBij(ctx, 'vol? stop met delen', '', 1100, 830, st, 'left', C.groen); },
  s37(ctx, t, q) { grondDoorsnede(ctx); molrat(ctx, 760, 660, 1.6, { t }); for (let i = 0; i < 10; i++) { const ph = (t * 0.3 + i / 10) % 1; circ(ctx, 200 + i * 160, 600 - ph * 60, 6, rgba(C.teal, (1 - q.on('weinig', 1) * 0.8) * (1 - ph))); }
    naamBij(ctx, 'weinig zuurstof', '', 400, 470, q.on('weinig', 1), 'left', C.teal); kaartIn(ctx, q.on('achttien', 1), 1220, 560, 560, 130, '18 minuten', 'zonder zuurstof (proef)', C.teal); kaartIn(ctx, q.on('fructose', 1), 1220, 720, 560, 130, 'Brandstof: fructose', 'in plaats van glucose', C.oker); },

  // ---------- 8. Kwal ----------
  s38(ctx, t, q) { onderWater(ctx, t); kwalT(ctx, 860, 520 + Math.sin(t * 1.5) * 20, 2.0, { t }); const r = q.on('rijstkorrel', 1); rijstkorrel(ctx, lerp(2100, 1460, r), 520, 1.6); naamBij(ctx, 'rijstkorrel', 'zelfde schaal', 1400, 660, r); naamBij(ctx, 'maag', '', 960, 190, q.on('kwal', 1), 'left', C.koraal); schaalBalk(ctx, 200, '1 mm');
    const j = q.on('jong', 1); if (j > 0.01) stempel(ctx, 1520, 260, 'weer jong?', C.goud, j, -0.1); },
  s40(ctx, t, q) { onderWater(ctx, t); const eet = q.on('opgegeten', 1); kwalT(ctx, 760, 480, 1.6, { t, a: 1 - eet * 0.7 }); vis(ctx, lerp(1500, 1000, eet), 500, 2.0, '#B8C8A8', { kijk: -1 });
    kaartIn(ctx, q.on('lab', 1), 1260, 680, 560, 130, 'Alleen in het lab gezien', 'niet in de vrije natuur', C.line); },
  s41(ctx, t, q) { bg(ctx, 'schema'); const p = q.on('poliep', 1), k = q.on('kwalletjes', 1), b = q.on('bolletje', 1), n = q.on('nieuwe', 1);
    poliep(ctx, 480, 760, 0.7, { t, groei: p }); kwalT(ctx, lerp(700, 1440, k), lerp(600, 420, k), 0.9, { t, a: k }); pijl(ctx, 640, 520, 1240, 340, C.groen, k, 5);
    kwalT(ctx, 960, lerp(420, 740, b), 0.7, { t, terug: b, a: b }); pijl(ctx, 1420, 620, 1090, 720, C.goud, b, 5); pijl(ctx, 830, 760, 680, 760, C.goud, q.on('weer', 1), 5);
    naamBij(ctx, 'poliep', 'vast op de bodem', 420, 520, p); naamBij(ctx, 'kwal', '', 1560, 220, k); naamBij(ctx, 'bolletje', 'terug naar de bodem', 960, 860, b, 'center', C.goud); if (n > 0.01) for (let i = 0; i < 3; i++) kwalT(ctx, 360 + i * 120, lerp(560, 380, n), 0.35, { t: t + i, a: n }); },
  s42(ctx, t, q) { bg(ctx, 'schema'); const v = U(t, q.at('veranderen', 1), 2.5); const r = lerp(150, 0, v);
    ctx.save(); ctx.translate(960, 470); ctx.beginPath(); ctx.ellipse(0, 0, lerp(150, 190, v), lerp(150, 110, v), 0, 0, 6.283); ctx.fillStyle = lerp(0, 1, v) > 0.5 ? '#5A3A30' : '#2E4A6A'; ctx.fill(); ctx.strokeStyle = v > 0.5 ? C.koraal : C.teal; ctx.lineWidth = 3; ctx.stroke(); circ(ctx, 0, 0, 50, C.kern, C.kernR, 2); ctx.restore();
    naamBij(ctx, v < 0.5 ? 'cel van het klokje' : 'cel van de poliep', '', 960, 720, 1, 'center'); naamBij(ctx, 'transdifferentiatie', '', 960, 260, q.on('transdifferentiatie', 1), 'center', C.goud);
    const kl = q.on('klonen', 1); if (kl > 0.01) { for (let i = 0; i < 3; i++) kwalT(ctx, 1400 + i * 150, 420, 0.4, { t: t + i, a: kl }); naamBij(ctx, 'klonen', 'zelfde DNA', 1550, 640, kl, 'center', C.paars); } },

  // ---------- 9. Bombardeerkever ----------
  s43(ctx, t, q) { bodemLand(ctx, { voor: '#4A4232' }); steen(ctx, 1300, 780, 600, 260); const l = U(t, 0.5, 3); bombardeerkever(ctx, lerp(1150, 760, l), 760, 2.4, { t: t * (l < 1 ? 1 : 0.2), rot: 1.57 }); schaalBalk(ctx, 260, '1 cm (vergroot)');
    const p = q.on('plofje', 1); if (p > 0.01) { text(ctx, 'plof!', 400, 400, fTitel(72), rgba(C.goud, p), 'center'); } },
  s45(ctx, t, q) { bodemLand(ctx, { voor: '#4A4232' }); bombardeerkever(ctx, 760, 700, 2.4, { t: t + 0.3, rot: 1.57, spuit: q.on('gif', 1), richting: Math.PI * (0.45 + Math.sin(t * 0.8) * 0.08) }); naamBij(ctx, 'bijna 100 °C', '', 220, 640, q.on('honderd', 1), 'left', C.koraal);
    const pd = q.on('pad', 1); if (pd > 0.01) kaartIn(ctx, pd, 1180, 200, 660, 130, 'Pad spuugt hem uit', 'bij een verwante soort, de kever leeft nog', C.groen); },
  s46(ctx, t, q) { bg(ctx, 'schema'); ctx.beginPath(); ctx.ellipse(800, 470, 420, 220, 0, 0, 6.283); ctx.fillStyle = '#2A3A5E'; ctx.fill(); ctx.strokeStyle = '#4A6A9A'; ctx.lineWidth = 3; ctx.stroke();
    const k1 = q.on('mengsel', 1), k2 = q.on('enzymen', 1); ctx.beginPath(); ctx.ellipse(780, 470, 140, 100, 0, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.5 * k1); ctx.fill(); ctx.strokeStyle = C.oker; ctx.stroke(); ctx.beginPath(); ctx.ellipse(1080, 470, 80, 60, 0, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.5 * k2); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.stroke();
    const dr = clamp((t - q.at('Druppelt', 1)) / 1.2, 0, 1); if (dr > 0 && dr < 1) circ(ctx, lerp(900, 1050, dr), 470, 12, C.oker); const sp = q.on('spuit', 1); if (sp > 0.01) { lijn(ctx, [[1160, 470], [1160 + 220 * sp, 470]], '#F4EED6', 12); for (let i = 0; i < 4; i++) circ(ctx, 1380 + i * 40 * sp, 470 + Math.sin(t * 6 + i) * 10, 10 + i * 6, rgba('#F4EED6', 0.6 * sp)); }
    if (dr >= 1 && t < q.at('spuit', 1) + 1) circ(ctx, 1080, 470, 30 + Math.sin(t * 20) * 6, rgba('#FFF6D8', 0.6));
    naamBij(ctx, 'mengsel', 'twee stoffen', 780, 720, k1, 'center', C.oker); naamBij(ctx, 'kamer met enzymen', '', 1080, 300, k2, 'center', C.koraal); naamBij(ctx, 'bijna 100 °C', '', 1400, 400, q.on('honderd', 1), 'left', C.koraal); },
  s47(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('honderden', 1), 4); assen(ctx, 200, 260, 1400, 400, 'tijd (duizendsten van een seconde)', 'druk');
    ctx.save(); ctx.beginPath(); ctx.rect(200, 200, 1400 * g, 500); ctx.clip(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 1400; i += 4) { const ph = (i / 70) % 1; ctx.lineTo(200 + i, 660 - (ph < 0.3 ? ph / 0.3 : 1 - (ph - 0.3) / 0.7) * 320); } ctx.stroke(); ctx.restore();
    naamBij(ctx, 'honderden pufjes per seconde', 'klepje dicht, open, dicht', 900, 820, q.on('honderden', 1), 'center');
    const st = q.on('Stap', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.fillStyle = rgba(C.bgSchema, 0.94); ctx.fillRect(0, 0, W, 880); [['stinkend goedje', 'veel loopkevers'], ['opslag', 'een reservoir'], ['enzymen', 'in bijna elke cel'], ['reactiekamer', 'heet en onder druk']].forEach(([a, b], i) => { kaartIn(ctx, U(t, q.at('Stap', 1) + i * 0.8, 0.6), 180 + i * 420, 400, 380, 130, a, b, C.groen); if (i < 3) pijl(ctx, 560 + i * 420, 465, 600 + i * 420, 465, C.goud, 1, 4); }); ctx.restore(); } },

  // ---------- 10. Liervogel ----------
  s48(ctx, t, q) { bosGrond(ctx); liervogel(ctx, lerp(600, 900, U(t, 0, 3)), 800, 1.6, { t, zing: q.on('na', 1) * (0.5 + 0.5 * Math.sin(t * 9)) }); naamBij(ctx, 'liervogel', 'Australië', 1240, 340, q.on('liervogel', 1));
    const z = q.on('kettingzaag', 1); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; roundRect(ctx, 140, 160, 860, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Liervogel doet kettingzaag na!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s50(ctx, t, q) { bosGrond(ctx); const g = q.on('gevangenschap', 1); for (let i = 0; i < 12; i++) { ctx.fillStyle = rgba('#5A5E66', g); ctx.fillRect(1100 + i * 60, 360, 8, 420); } ctx.fillStyle = rgba('#5A5E66', g); ctx.fillRect(1080, 380, 760, 8); ctx.fillRect(1080, 560, 760, 8);
    liervogel(ctx, 1400, 800, 1.2, { t, zing: 0.5 + 0.5 * Math.sin(t * 9) }); kaartIn(ctx, g, 160, 300, 760, 130, 'Alleen in gevangenschap', 'vogels die bouwlawaai hoorden', C.goud); kaartIn(ctx, q.on('wilde', 1), 160, 470, 760, 130, 'In het wild', 'niet bekend', C.line); },
  s51(ctx, t, q) { bosGrond(ctx); const toon = U(t, q.at('staart', 1), 2.2); liervogel(ctx, 960, 820, 1.6, { t, toon, zing: (1 - toon) * (0.5 + 0.5 * Math.sin(t * 9)) });
    naamBij(ctx, '3/4 van zijn zang', 'nagedaan', 300, 300, q.on('driekwart', 1)); naamBij(ctx, 'leert van oudere liervogels', '', 300, 420, q.on('oudere', 1)); naamBij(ctx, 'zilveren sluier', 'de staart', 1340, 230, q.on('sluier', 1)); },
  s52(ctx, t, q) { bosGrond(ctx); const w = q.on('weggaan', 1); liervogel(ctx, 1100, 820, 1.3, { t, toon: 1 }); liervogel(ctx, lerp(420, 260, w * (1 - q.on('blijft', 1))), 820, 0.95, { t, kijk: w > 0.5 && q.on('blijft', 1) < 0.5 ? -1 : 1 });
    const al = q.on('alarm', 1); [[1500, 260], [1640, 340], [1560, 440], [1720, 220]].forEach(([x, y], i) => { const a = clamp(al * 4 - i, 0, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; vul(ctx, [[x - 26, y], [x, y - 12], [x + 30, y - 4], [x + 6, y + 10]], '#8A7A6A'); text(ctx, '!', x + 40, y - 6, fTekst(44, 800), C.koraal, 'left'); ctx.restore(); });
    naamBij(ctx, 'nep-alarm', 'alsof er een roofdier is', 1500, 560, al, 'left', C.koraal); naamBij(ctx, 'vrouwtje', '', 300, 420, q.on('vrouwtje', 2)); naamBij(ctx, 'show', 'vrouwtjes kiezen', 1100, 120, q.on('show', 1), 'center'); stempel(ctx, 1500, 760, 'ontdekt in 2021', C.goud, q.on('2021', 1), -0.08); },

  // ---------- Slot ----------
  s53(ctx, t, q) { onderWater(ctx, t, { bodem: '#2E3A36' }); tienDieren(ctx, t); const v = q.on('gemeten', 1); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; text(ctx, 'Wie heeft het gemeten? En hoe?', W / 2, 140, fTitel(72), C.text, 'center'); ctx.restore(); } },
});
