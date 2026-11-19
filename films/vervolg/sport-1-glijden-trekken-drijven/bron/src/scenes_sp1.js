// Wat word jij? · Sport en topsport 1 · Glijden, trekken, drijven — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. Sam (outfit 'zwem') = de zwemmer, de zwemtrainer, een bewegingswetenschapper (figurant 'passant', naamloos).
// Zwembad zelf getekend in schema-stijl (bovenaanzicht van de banen, zijaanzicht onder water); grafieken en balken op navy.
// Rode draad: het klembord van de trainer (VOORBEELD, zonder tijden). Geen namen in beeld.

const SP1_L = 480; // standaardlengte van Sam in het water (px)
function sp1Crawl(ctx, x, wl, L, t, o = {}) { return zwemmer(ctx, 'sam', x, wl + 0.12 * L, L, Object.assign({ slag: 'crawl', t }, o)); }
// stapsgewijs tempo: fase loopt door zonder sprong
function sp1Tijd(t, t0, k) { return t + (k - 1) * Math.max(0, t - t0); }
// weerstandspijlen bij een crawlende zwemmer (kijk 1): d = [wrijving, vorm, golven], a = [..]
function sp1Weerstand(ctx, r, yy, t, d, a, o = {}) { const { lab = [1, 1, 1], tegen = 0 } = o;
  const hx = r.hoofd.x, hy = r.hoofd.y, sx = r.heup.x;
  // wrijving: dunne pijltjes langs de huid (rug en buik)
  laag(ctx, a[0], () => { for (let i = 0; i < 4; i++) { const x = sx - 40 + i * 95, u = ((t * 0.8 + i * 0.25) % 1); SP1_pijlDik(ctx, x + 50 - u * 30, r.heup.y + 44, x - 20 - u * 30, r.heup.y + 44, d[0], C.koraal, 0.95); }
    naamBij(ctx, 'wrijving', 'langs de huid', sx - 120, r.heup.y + 200, lab[0], 'left'); });
  // vorm: water voor de kop, draaikolken achter de heupen
  laag(ctx, a[1], () => { SP1_pijlDik(ctx, hx + 330, hy + 60, hx + 150, hy + 60, d[1], C.koraal, 1);
    SP1_wervel(ctx, r.voet.x + 40, r.heup.y + 70, 34, t, C.koraal, 0.9, -1); SP1_wervel(ctx, r.voet.x - 50, r.heup.y + 40, 26, t + 1, C.koraal, 0.8, -1);
    naamBij(ctx, 'vorm', 'draaikolken erachter', hx + 160, hy + 60 + Math.max(d[1], 20) + 46, lab[1], 'left'); });
  // golven: boeggolf aan het oppervlak
  laag(ctx, a[2], () => { const y0 = yy(hx + 100) - 40; SP1_pijlDik(ctx, hx + 300, y0, hx + 130, y0, d[2], C.koraal, 1); naamBij(ctx, 'golven', 'aan het oppervlak', hx + 140, y0 - Math.max(d[2], 20) - 18, lab[2], 'left'); }); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); roundRect(ctx, 1000, 500, 860, 360, 22); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 500, 860, 360);
    const yy = SP1_water(ctx, 560, { x0: 1000, x1: 1860, y1: 880, t, amp: 3, snel: 30 }); const x = 1180 + 90 * Math.min(t, 6) - 4 * Math.min(t, 6) ** 2;
    const r = zwemmer(ctx, 'sam', x, 720, 380, { slag: 'stroomlijn', t }); SP1_bellen(ctx, r.voet.x - 10, r.voet.y, 6, t, { wl: 560, seed: 3 }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('moet', 1, 0.4), Cc = q.on('Water', 1, 0.4), D = q.on('Waarom', 1, 0.5);
    // A: bovenaanzicht 50-meterbad, de zwemmer tikt aan
    laag(ctx, 1 - B, () => { const yl = SP1_badBoven(ctx, 160, 200, 1600, 480, 6, { meter: 50, hl: 3 }); const tik = q.at('tikt', 1), u = Math.min(t, tik);
      const x = 1743 - 54 * (tik - u); SP1_zwemmerBoven(ctx, x, yl(3), 62, t, 1, { slag: t < tik });
      metaText(ctx, '50 M', 960, 760, C.text2, 'center', 28); lijn(ctx, [[160, 730], [1760, 730]], C.line, 2); lijn(ctx, [[160, 718], [160, 742]], C.line, 2); lijn(ctx, [[1760, 718], [1760, 742]], C.line, 2);
      laag(ctx, vensterA(t, tik, tik + 1.2, 0.2), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1760, yl(3), 30 + 30 * ramp(t, tik, 1.2), 0, 6.283); ctx.stroke(); });
      SP1_scorebord(ctx, 1560, 140, '100 M · VRIJ', 1, 44); laag(ctx, q.on('klok', 1, 0.3), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, 1360, 74, 400, 112, 12); ctx.stroke(); }); });
    // B: aan de muur; de zwemmer wil sterker worden, de trainer schudt het hoofd
    laag(ctx, B * (1 - Cc), () => { const wl = 600; SP1_water(ctx, wl, { x1: 1240, y1: 1080, t, amp: 3 }); SP1_kant(ctx, 1240, 572, 1);
      sp1Sam(ctx, 1110, 870, 430, t, { uit: q.on('schudt', 1) > 0.5 ? 'verbaasd' : 'neutraal', kijk: 1 });
      SP1_water(ctx, wl, { x1: 1240, y1: 1080, t, amp: 3 });
      const sch = q.at('schudt', 1), kk = t > sch && t < sch + 1.3 ? (Math.sin((t - sch) * 14) > 0 ? 1 : -1) : -1;
      sp1Trainer(ctx, 1560, 572, 430, t, { kijk: kk, uit: q.on('schudt', 1) > 0.5 ? 'neutraal' : 'blij' });
      SP1_wolkje(ctx, 820, 330, 80, () => SP1_halter(ctx, 820, 330, 110), q.on('sterker', 1, 0.4), 1);
      SP1_scorebord(ctx, 360, 200, '100 M · VRIJ', 1, 40); });
    // C: water tegen lucht
    laag(ctx, Cc * (1 - D), () => { SP1_literbak(ctx, 520, 400, 260, SP1.water); SP1_literbak(ctx, 1160, 400, 260, null);
      text(ctx, 'water', 650, 730, fTekst(44, 700), C.text, 'center'); text(ctx, 'lucht', 1290, 730, fTekst(44, 700), C.text, 'center'); metaText(ctx, '1 LITER', 650, 780, C.text2, 'center', 28); metaText(ctx, '1 LITER', 1290, 780, C.text2, 'center', 28);
      laag(ctx, q.on('achthonderd', 1, 0.4), () => text(ctx, 'ruim 800 × zo dicht', 960, 260, fTitel(72), C.teal, 'center')); });
    // D: puzzel
    laag(ctx, D, () => { kaart(ctx, 260, 230, 1400, 420, 1, C.goud); text(ctx, 'Houding of spieren?', 960, 360, fTitel(80), C.text, 'center');
      zwemmer(ctx, 'sam', 560, 520, 300, { slag: 'stroomlijn', t }); metaText(ctx, 'HOUDING', 620, 610, C.goud, 'center', 28);
      SP1_halter(ctx, 1320, 510, 170, C.oker); metaText(ctx, 'KRACHT', 1320, 610, C.oker, 'center', 28); vraagteken(ctx, 960, 590, q.on('houding', 1, 0.4), 120); }); },

  // ---------- H1 Drie soorten weerstand ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const wl = 470, L = SP1_L, Dr = q.on('drie', 1, 0.5), Gl = q.on('golven', 1, 0.5);
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140, boeg: Gl > 0.01 ? { x: 1180, h: 22 * Gl, kijk: 1 } : null });
    const r = sp1Crawl(ctx, 620, wl, L, t);
    // eerst één pijl: weerstand
    laag(ctx, q.on('tegen', 1, 0.4) * (1 - Dr), () => { SP1_pijlDik(ctx, r.hoofd.x + 360, r.hoofd.y + 30, r.hoofd.x + 160, r.hoofd.y + 30, 24, C.koraal); naamBij(ctx, 'weerstand', 'tegen je richting in', r.hoofd.x + 170, r.hoofd.y + 120, 1, 'left');
      pijl(ctx, 160, 820, 360, 820, C.goud, 1, 4, 18); metaText(ctx, 'ZWEMRICHTING', 160, 860, C.text2, 'left', 28); });
    // literbakjes
    laag(ctx, q.on('liter', 1, 0.4) * (1 - Dr), () => { SP1_literbak(ctx, 160, 200, 130, SP1.water); SP1_literbak(ctx, 470, 200, 130, null);
      metaText(ctx, 'WATER · 1 L', 225, 372, C.text2, 'center', 28); metaText(ctx, 'LUCHT · 1 L', 535, 372, C.text2, 'center', 28);
      laag(ctx, q.on('kilo', 1, 0.4), () => text(ctx, '1 kilo', 225, 426, fTekst(40, 800), C.teal, 'center')); laag(ctx, q.on('gram', 1, 0.4), () => text(ctx, '1,2 gram', 535, 426, fTekst(40, 800), C.text, 'center')); });
    // drie soorten
    const Wr = q.on('Wrijving', 1, 0.5), Vo = q.on('Vorm', 1, 0.5), d = 16;
    sp1Weerstand(ctx, r, yy, t, [d * 0.7, d, d], [Wr, Vo, Gl]);
    laag(ctx, q.on('draaikolken', 1, 0.4), () => {});
    vraagteken(ctx, 1700, 300, q.on('twee', 1, 0.4), 130); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de vorm en de golven', 1 - q.on('groeit', 1, 0.4)); const wl = 470, L = SP1_L, G = q.on('groeit', 1, 0.6);
    laag(ctx, 1 - G, () => { const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140, boeg: { x: 1180, h: 22 + 12 * q.on('Vorm', 1, 1), kijk: 1 } }); const r = sp1Crawl(ctx, 620, wl, L, t);
      const u = q.on('Vorm', 1, 1.0), k = q.on('kleinst', 1, 0.8);
      sp1Weerstand(ctx, r, yy, t, [lerp(11, 6, k), lerp(16, 34, u), lerp(16, 34, u)], [1, 1, 1]);
      laag(ctx, q.on('helft', 1, 0.4), () => tag(ctx, 'TOT ± DE HELFT', 1530, 300, C.koraal, 1, 'center', 30));
      metaA(ctx, 'SCHATTINGEN LOPEN UITEEN', 1800, 220, q.on('schattingen', 1, 0.4), C.grain, 'right', 28); });
    laag(ctx, G, () => { SP1_parabool(ctx, 420, 220, 1000, 540, { u: ramp(t, q.at('groeit', 1), 2.5) * (1 - q.on('Zwem', 2, 0.3)), m1: q.on('Zwem', 2, 0.4), m2: q.on('vier', 1, 0.4) });
      laag(ctx, q.on('vier', 1, 0.4), () => { tag(ctx, '2× zo snel → ± 4× zoveel weerstand', 1180, 200, C.koraal, 1, 'center', 32); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const wl = 520, L = SP1_L, tt = sp1Tijd(t, q.at('armen', 1), 1.6);
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140 + 60 * q.on('armen', 1, 0.6) });
    const r = sp1Crawl(ctx, 520, wl, L, tt);
    // harder duwen: kracht (oker) bij de hand
    laag(ctx, q.on('harder', 1, 0.4), () => { if (r.handR.y > yy(r.handR.x) + 10) SP1_pijlDik(ctx, r.handR.x + 10, r.handR.y, r.handR.x - 120, r.handR.y, 14, C.oker, 0.95); naamBij(ctx, 'harder duwen', '', 200, 800, 1, 'left', C.oker); });
    laag(ctx, q.on('armen', 1, 0.4), () => naamBij(ctx, 'sneller bewegen', '', 560, 800, 1, 'left', C.oker));
    // vermogen en snelheid
    const St = q.on('Stel', 1, 0.5), P = q.on('tien', 1, 0.8);
    laag(ctx, St, () => { kaart(ctx, 1130, 110, 740, 390, 1); SP1_meter(ctx, 1360, 330, 120, 0.5 + 0.08 * P, { lab: 'VERMOGEN', kl: C.oker, tekst: P > 0.5 ? '+10 %' : '' });
      metaA(ctx, 'ENERGIE PER SECONDE', 1360, 165, q.on('energie', 1, 0.4), C.oker, 'center', 28);
      laag(ctx, q.on('Hoeveel', 1, 0.4), () => { SP1_meter(ctx, 1680, 330, 120, 0.5, { lab: 'SNELHEID', kl: C.goud }); vraagteken(ctx, 1680, 470, 1, 90); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ongeveer drie procent sneller', 1);
    const X = 120, Wb = 820, f = (p) => 0.6 * p, A2 = q.on('Andersom', 1, 0.5);
    SP1_balk(ctx, X, 290, Wb, f(1.1), C.oker, 'VERMOGEN', '+10 %', 1);
    SP1_balk(ctx, X, 410, Wb, f(1 + 0.03 * q.on('drie', 1, 0.8)), C.goud, 'SNELHEID', q.on('drie', 1) > 0.5 ? '+3 %' : '', 1);
    laag(ctx, A2, () => { SP1_balk(ctx, X, 590, Wb, f(1 + 0.1 * q.on('tien', 1, 0.8)), C.goud, 'SNELHEID', q.on('tien', 1) > 0.5 ? '+10 %' : '', 1);
      SP1_balk(ctx, X, 710, Wb, f(1 + 0.33 * q.on('derde', 1, 1.0)), C.oker, 'VERMOGEN', q.on('derde', 1) > 0.5 ? '± +33 %' : '', 1);
      metaA(ctx, '1,1 × 1,1 × 1,1 ≈ 1,33', X, 830, q.on('nodig', 1, 0.4), C.text2, 'left', 30); });
    lijn(ctx, [[X + Wb * 0.6, 260], [X + Wb * 0.6, 780]], rgba(C.line, 0.7), 2); metaText(ctx, 'NU', X + Wb * 0.6, 250, C.text2, 'center', 28);
    const Du = q.on('Duur', 1, 0.3);
    laag(ctx, Du, () => { SP1_klembord(ctx, 1210, 300, 340, 1, ramp(t, q.at('klembord', 1), 1.6), { t });
      sp1Trainer(ctx, 1730, 860, 520, t, { kijk: -1, uit: t < q.at('schrijft', 1) ? 'praat' : 'neutraal', pose: 'wijs', zonderBord: true }); }); },

  // ---------- H2 Drijven en ligging ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const Sl = q.on('slag', 1, 0.5);
    laag(ctx, 1 - Sl, () => { // A: stil drijven, camera zoomt in
      const z = lerp(1, 1.55, ramp(t, q.at('Lig', 1), 1.6)), Z = (p) => ({ x: 960 + (p.x - 900) * z, y: 470 + (p.y - 470) * z });
      const wl = 430, L = 330, hx = 760, hy = wl + 0.09 * L, ang = -0.42 * ease(clamp((t - q.at('zakken', 1)) / (q.at('omlaag', 1) + 0.8 - q.at('zakken', 1)), 0, 1)), px = hx + 0.36 * L, py = hy - 0.02 * L;
      ctx.save(); ctx.translate(960, 470); ctx.scale(z, z); ctx.translate(-900, -470);
      SP1_water(ctx, wl, { x0: -400, x1: 1500, y1: 1300, t, amp: 3, snel: 10 }); SP1_kant(ctx, 1500, 404, 1, { y1: 1300 });
      laag(ctx, 1 - q.on('Lig', 1, 0.6), () => sp1Trainer(ctx, 1720, 404, 330, t, { zij: true, kijk: -1 }));
      const r = SP1_zwemRot(ctx, 'sam', hx, hy, L, ang, px, py, { slag: 'stroomlijn', t, bril: 'ogen' }); ctx.restore();
      const db = Z({ x: px, y: py }), zp = Z(SP1_rot({ x: hx + 0.1 * L, y: hy + 0.01 * L }, ang, px, py));
      laag(ctx, q.on('longen', 1, 0.4), () => { circ(ctx, db.x, db.y, 14, C.goud, '#F2F2EE', 2); laag(ctx, q.on('drijven', 1, 0.4), () => SP1_pijlDik(ctx, db.x, db.y - 20, db.x, db.y - 130, 12, C.goud)); naamBij(ctx, 'drijfpunt', 'longen vol lucht', db.x + 30, db.y - 150, 1, 'left', C.goud); });
      laag(ctx, q.on('zwaartepunt', 1, 0.4), () => { circ(ctx, zp.x, zp.y, 14, C.oker, '#F2F2EE', 2); SP1_pijlDik(ctx, zp.x, zp.y + 20, zp.x, zp.y + 130, 12, C.oker); naamBij(ctx, 'zwaartepunt', 'richting de heupen', zp.x - 30, zp.y + 190, 1, 'right', C.oker); });
      laag(ctx, q.on('wip', 1, 0.4) * (1 - q.on('gat', 1, 0.4)), () => tag(ctx, 'BORST OMHOOG · BENEN OMLAAG', 960, 160, C.goud, 1, 'center', 32));
      const Ga = q.on('gat', 1, 0.5), sch = clamp(-ang / 0.42, 0, 1);
      laag(ctx, Ga, () => { SP1_gat(ctx, 1480, 110, 340, sch * ramp(t, q.at('gat', 1), 1.5)); text(ctx, 'gat in het water', 1650, 480, fTekst(36, 700), C.koraal, 'center');
        const hd = Z(r.hoofd); laag(ctx, q.on('vormweerstand', 1, 0.4), () => SP1_pijlDik(ctx, hd.x + 300, hd.y + 80, hd.x + 110, hd.y + 80, 12 + 22 * ramp(t, q.at('vormweerstand', 1), 1.2), C.koraal)); }); });
    laag(ctx, Sl, () => { // B: in de slag kijkt hij vooruit naar de muur
      const wl = 560, L = SP1_L, hx = 560, yy = SP1_water(ctx, wl, { x1: 1600, t, amp: 4, snel: 140, boeg: { x: 1040, h: 30, kijk: 1 } }); SP1_kant(ctx, 1600, 532, 1);
      const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, -0.12, hx, wl + 0.12 * L, { slag: 'crawl', t });
      laag(ctx, q.on('muur', 1, 0.4), () => { stippel(ctx, r.hoofd.x + 30, r.hoofd.y - 6, 1590, r.hoofd.y - 40, C.goud, 1, 3); naamBij(ctx, 'kijkt vooruit', '', 1200, r.hoofd.y - 70, 1, 'left', C.goud); });
      laag(ctx, q.on('doet', 1, 0.4), () => { SP1_pijlDik(ctx, r.hoofd.x + 330, r.hoofd.y + 90, r.hoofd.x + 150, r.hoofd.y + 90, 24, C.koraal); naamBij(ctx, 'vorm', '', r.hoofd.x + 160, r.hoofd.y + 170, 1, 'left'); vraagteken(ctx, r.hoofd.x + 400, r.hoofd.y + 130, 1, 110); }); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: meer weerstand', 1 - q.on('Kijk', 1, 0.4));
    const wl = 560, L = SP1_L, hx = 560, La = q.on('laag', 1, 0.5), ang = -0.12 * (1 - ease(ramp(t, q.at('laag', 1) - 0.2, 1.2))), Kb = q.on('klembord', 1, 0.5);
    const yy = SP1_water(ctx, wl, { x1: 1600, t, amp: 4, snel: 140, boeg: { x: 1040, h: 30 - 12 * La, kijk: 1 } }); SP1_kant(ctx, 1600, 532, 1);
    laag(ctx, q.on('Kijk', 1, 0.3), () => sp1Trainer(ctx, 1770, 532, 480, t, { kijk: -1, pose: 'wijs', uit: t < q.at('trainer', 1) + 0.6 ? 'praat' : 'neutraal', zonderBord: Kb > 0.01 }));
    const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, ang, hx, wl + 0.12 * L, { slag: 'crawl', t });
    // vormpijl: dikker bij hoofd omhoog, dunner bij hoofd laag
    const dv = lerp(lerp(24, 40, q.on('Met', 1, 1)), 18, La); SP1_pijlDik(ctx, r.hoofd.x + 330, r.hoofd.y + 90, r.hoofd.x + 150, r.hoofd.y + 90, dv, C.koraal); naamBij(ctx, 'vorm', '', r.hoofd.x + 160, r.hoofd.y + 170 + (dv - 24) * 0.5, 1, 'left');
    // kijklijn: vooruit → naar de bodem
    const Bo = q.on('bodem', 1, 0.6); laag(ctx, 1 - Bo, () => stippel(ctx, r.hoofd.x + 30, r.hoofd.y - 6, 1590, r.hoofd.y - 40, C.goud, 1, 3));
    laag(ctx, Bo * (1 - Kb), () => { stippel(ctx, r.hoofd.x + 10, r.hoofd.y + 20, r.hoofd.x + 90, 870, C.goud, 1, 3); naamBij(ctx, 'kijk naar de bodem', '', r.hoofd.x + 110, 840, 1, 'left', C.goud); });
    // tekstbalk: één tegelijk
    const T1 = q.on('sleepproef', 1, 0.4) * (1 - q.on('laag', 1, 0.3)), T2 = ramp(t, q.at('laag', 1) + 0.3, 0.3) * (1 - q.on('kost', 1, 0.3)), T3 = ramp(t, q.at('kost', 1) + 0.3, 0.3);
    laag(ctx, T1, () => { tag(ctx, 'HOOFD OMHOOG: ± 5–10 % MEER WEERSTAND', 120, 270, C.koraal, 1, 'left', 32); metaText(ctx, 'SLEEPPROEF · 10 ZWEMMERS', 140, 340, C.grain, 'left', 28); });
    laag(ctx, T2, () => tag(ctx, 'HOOFD LAAG · LICHAAM VLAK', 120, 270, C.goud, 1, 'left', 32));
    laag(ctx, T3, () => tag(ctx, 'KOST ZELF GEEN EXTRA VERMOGEN', 120, 270, C.goud, 1, 'left', 32));
    laag(ctx, q.on('beenslag', 1, 0.4) * (1 - Kb * 0.0), () => naamBij(ctx, 'korte beenslag', '', r.voet.x - 60, wl + 200, 1, 'left', C.goud));
    laag(ctx, q.on('Met', 1, 0.4) * (1 - Kb), () => SP1_gat(ctx, 960, 120, 300, 1 - La));
    laag(ctx, Kb, () => SP1_klembord(ctx, 1110, 110, 320, 2, ramp(t, q.at('ligging', 1), 1.0), { t })); },

  // ---------- H3 Voortstuwing en de catch ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Hv = q.at('Hoe', 1), tv = Math.min(t, Hv), Vx = 110, Vy = 150, Vw = 1200, Vh = 620;
    SP1_video(ctx, Vx, Vy, Vw, Vh, () => { const wl = Vy + 140, L = 620; SP1_water(ctx, wl, { x0: Vx, x1: Vx + Vw, y1: Vy + Vh, t: tv * 0.5, amp: 3, snel: 60 });
      const r = zwemmer(ctx, 'sam', Vx + 450, wl + 0.12 * L, L, { slag: 'crawlLek', t: tv, tempo: 0.5 }); const p = r.fase;
      const lek = (0.45 + 0.55 * vensterA(p, 0.24, 0.62, 0.06)) * q.on('glipt', 1, 0.4);
      laag(ctx, lek, () => { const bx = r.handR.x - 20, by = r.handR.y + 10; SP1_wervel(ctx, bx, by, 40, tv, C.teal, 1); SP1_wervel(ctx, bx - 90, by - 30, 30, tv + 0.7, C.teal, 0.9); SP1_wervel(ctx, bx + 70, by + 40, 26, tv + 1.4, C.teal, 0.8);
        naamBij(ctx, 'lek', 'hand glipt weg', bx + 70, by + 90, 1, 'left', C.teal); });
      vraagteken(ctx, Vx + Vw - 160, Vy + Vh - 120, q.on('Hoe', 1, 0.4), 130); }, { u: tv / 12, pauze: t >= Hv, lab: 'VIDEO · SLOW MOTION' });
    const Ro = q.on('roert', 1, 0.3); sp1Trainer(ctx, 1640, 860, 560, t, { kijk: -1, pose: Ro > 0.5 ? 'wijs' : 'staan', uit: t > q.at('roert', 1) - 0.3 && t < q.at('vast', 2) + 0.4 ? 'praat' : 'neutraal' }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: met een hoge elleboog water naar achteren duwen', 1);
    const wl = 360, L = 620, hx = 700, k = 0.45, T0 = q.at('Veel', 1), f = 0.8 * k;
    // na 'Veel' stopt de arm bij de catch (fase 0.26)
    const P0 = T0 * f, pHold = Math.ceil(P0 - 0.26) + 0.26, Ph = t * f, fase = t >= T0 ? lerp(P0, pHold, ease((t - T0) / 1.4)) : Ph;
    const Dn = vensterA(t, q.at('beneden', 1), q.at('Onderzoekers', 1) + 0.6, 0.8), ang = -0.2 * Dn;
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 100 });
    const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, ang, hx, wl + 0.12 * L, { slag: 'crawl', fase });
    // voortstuwing: goud vooruit, teal water naar achteren
    const Vo = q.on('vooruit', 1, 0.4) * (1 - Dn);
    laag(ctx, Vo, () => { SP1_pijlDik(ctx, r.heup.x - 40, wl - 70, r.heup.x + 340, wl - 70, 20, C.goud); naamBij(ctx, 'voortstuwing', '', r.heup.x - 40, wl - 120, q.on('voortstuwing', 1, 0.4), 'left', C.goud); });
    laag(ctx, q.on('achteren', 1, 0.4) * (1 - Dn), () => { if (r.handR.y > wl + 20) SP1_waterTerug(ctx, r.handR.x, r.handR.y, 1, t, 1, 3, 110); });
    // naar beneden duwen: voorkant omhoog, benen zakken
    laag(ctx, Dn, () => { SP1_pijlDik(ctx, r.handR.x, r.handR.y + 20, r.handR.x, r.handR.y + 140, 14, C.koraal); naamBij(ctx, 'naar beneden', '', r.handR.x + 40, r.handR.y + 110, 1, 'left', C.koraal);
      laag(ctx, q.on('zakken', 1, 0.4), () => SP1_pijlDik(ctx, r.voet.x + 40, r.voet.y + 20, r.voet.x + 40, r.voet.y + 140, 14, C.koraal)); });
    metaA(ctx, 'VERMOEDEN', 1800, 220, vensterA(t, q.at('Onderzoekers', 1), T0, 0.4), C.grain, 'right', 28);
    // catch: onderarm verticaal, elleboog hoog; hand + stuk onderarm = peddel
    const Ca = q.on('onderarm', 1, 0.5), fa = L * 1.04 / 6.1 * 1.2;
    if (t >= T0) { const ex = r.handR.x - 0.12 * fa, ey = r.handR.y - 0.99 * fa;
      laag(ctx, Ca, () => { SP1_peddel(ctx, r.handR.x, r.handR.y, lerp(r.handR.x, ex, 0.62), lerp(r.handR.y, ey, 0.62), 30, 1); naamBij(ctx, 'hand + onderarm', 'peddel', r.handR.x + 70, r.handR.y + 10, 1, 'left', C.goud); });
      laag(ctx, q.on('elleboog', 1, 0.4), () => naamBij(ctx, 'elleboog hoog', '', ex + 40, ey - 40, 1, 'left'));
      laag(ctx, q.on('catch', 1, 0.4), () => tag(ctx, 'CATCH', r.handR.x - 260, r.handR.y + 150, C.goud, 1, 'center', 40));
      laag(ctx, q.on('mee', 1, 0.4), () => { SP1_waterTerug(ctx, r.handR.x - 20, r.handR.y - 10, 1, t, 1, 2, 120); SP1_waterTerug(ctx, lerp(r.handR.x, ex, 0.45) - 20, lerp(r.handR.y, ey, 0.45), 1, t + 0.4, 1, 2, 120); }); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const Ka = q.on('beter', 1, 0.5), Mb = q.on('Bewegingswetenschappers', 1, 0.5), Ba = q.on('Wedstrijdzwemmers', 1, 0.5);
    // A: weggeduwd water neemt energie mee
    laag(ctx, 1 - Ka, () => { const u = ramp(t, q.at('wegduwt', 1) - 0.4, 1.6); ctx.beginPath(); ctx.ellipse(1060 - 260 * u, 460, 120, 90, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 3);
      SP1_pijlDik(ctx, 1260 - 260 * u, 460, 1190 - 260 * u, 460, 18, C.goud); naamBij(ctx, 'weggeduwd water', '', 1060 - 260 * u, 600, 1, 'center', C.teal);
      laag(ctx, q.on('energie', 1, 0.4), () => { SP1_balk(ctx, 560, 720, 800, 0.6 * ramp(t, q.at('energie', 1), 1), C.oker, 'ENERGIE IN HET WATER', '', 1, 44); }); });
    // B: weinig water snel tegen veel water rustig
    laag(ctx, Ka * (1 - Mb), () => { const pan = (x, kop, m, v, E, aa) => laag(ctx, aa, () => { kaart(ctx, x, 200, 780, 600, 1); metaText(ctx, kop, x + 390, 260, C.text, 'center', 28);
        const u = ((t * v * 0.35) % 1), bx = x + 600 - u * 420, r0 = 40 * Math.sqrt(m); ctx.beginPath(); ctx.ellipse(bx, 450, r0 * 1.2, r0, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 3);
        SP1_pijlDik(ctx, bx - r0 * 1.2 - 10, 450, bx - r0 * 1.2 - 10 - 40 * v, 450, 12, C.teal); SP1_balk(ctx, x + 60, 680, 660, E, C.oker, 'ENERGIE MEE', '', 1, 44); });
      pan(140, 'VEEL WATER · RUSTIG', 4, 1, 0.22, q.on('veel', 1, 0.4)); pan(1000, 'WEINIG WATER · HEEL SNEL', 1, 4, 0.88, q.on('weinig', 1, 0.4)); });
    // C: de meetbaan in Amsterdam
    laag(ctx, Mb * (1 - Ba), () => { const wl = 520, L = 300, v = 1.1 * L / 1.79, sc = v * t, hy = wl + 0.12 * L, ys = wl + 0.8 / 1.79 * L, tt = t;
      SP1_water(ctx, wl, { x1: 1400, t, amp: 3, snel: v }); SP1_kant(ctx, 1400, 494, 1);
      lijn(ctx, [[0, ys], [1400, ys]], '#AFB6C0', 7); metaA(ctx, 'STANG ± 0,8 M ONDER WATER', 120, ys + 70, q.on('plaatjes', 1, 0.4), C.text2, 'left', 28);
      const r = zwemmer(ctx, 'sam', 700, hy, L, { slag: 'crawl', t: tt });
      for (let k = -2; k < 9; k++) { const px = ((k * 226 - sc) % 2034 + 2034) % 2034 - 200; if (px < -20 || px > 1400) continue; const hit = Math.abs(px - r.handR.x) < 40 && r.handR.y > ys - 60;
        ctx.fillStyle = hit ? C.goud : '#D0D6DE'; ctx.fillRect(px - 7, ys - 46, 14, 46); }
      SP1_drijvertje(ctx, lerp(r.heup.x, r.voet.x, 0.28), lerp(r.heup.y, r.voet.y, 0.28) + 4, 26);
      const F = (x) => { const p = (x * 0.8) % 1, b = (pp) => { const w = ((pp % 1) + 1) % 1; return w > 0.3 && w < 0.62 ? Math.sin(Math.PI * (w - 0.3) / 0.32) : 0; }; return Math.max(b(p), b(p + 0.5)); };
      SP1_tafel(ctx, 1450, 400, 280, 94); SP1_laptop(ctx, 1470, 226, 240, (sx, sy, sw, sh) => SP1_spoor(ctx, sx + 8, sy + 10, sw - 16, sh - 20, tt, F, { venster: 3 }));
      persoon(ctx, 'passant', 1830, 494, 300, { t, kijk: -1, uit: 'neutraal', pose: q.on('rekenden', 1) > 0.5 ? 'wijs' : 'staan' });
      metaText(ctx, 'MEETBAAN · AMSTERDAM', 120, 160, C.text2, 'left', 28);
      metaA(ctx, 'KRACHT', 1590, 200, q.on('kracht', 1, 0.4) * (1 - q.on('rekenden', 1, 0.4)), C.oker, 'center', 28);
      metaA(ctx, 'ENERGIE IN HET WATER (BEREKEND)', 1880, 200, q.on('rekenden', 1, 0.4), C.oker, 'right', 28); });
    // D: zwemmers tegen triatleten
    laag(ctx, Ba, () => { tag(ctx, 'EVEN VEEL ENERGIE', 160, 230, C.oker, q.on('even', 1, 0.4), 'left', 32); const X = 160, Wb = 1000;
      SP1_balk(ctx, X, 340, Wb, 1.11 / 1.3, C.goud, 'WEDSTRIJDZWEMMERS', '1,11 m/s', 1);
      SP1_balk(ctx, X, 480, Wb, 0.9 / 1.3, C.goud, 'TRIATLETEN', '0,90 m/s', q.on('triatleten', 1, 0.4));
      laag(ctx, q.on('verloren', 1, 0.4), () => { metaText(ctx, 'ENERGIE AAN WEGGEDUWD WATER', X, 640, C.teal, 'left', 28); SP1_balk(ctx, X, 660, 700, 0.28 / 0.45, C.teal, '', 'zwemmers', 1, 44); SP1_balk(ctx, X, 730, 700, 0.39 / 0.45, C.teal, '', 'triatleten', 1, 44); });
      metaText(ctx, 'TOUSSAINT 1990 · KLEINE GROEP', 1800, 850, C.grain, 'right', 28); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const Ac = q.on('achteren', 1, 0.4), Kb = q.on('klembord', 1, 0.4);
    tag(ctx, 'TECHNIEK VERSCHILT · PRINCIPE GELIJK', 730, 112, C.goud, q.on('principe', 1, 0.4), 'center', 30);
    const B = [['rug', 'bilal', 'RUGSLAG', 'Rugslag'], ['vlinder', 'daan', 'VLINDERSLAG', 'vlinderslag'], ['school', 'noor', 'SCHOOLSLAG', 'schoolslag'], ['crawl', 'sam', 'VRIJE SLAG', 'vrije']];
    B.forEach(([slag, id, nm, cue], i) => { const top = 148 + i * 180, wl = top + 88, L = 240, hl = q.on(cue, 1, 0.4);
      const yy = SP1_water(ctx, wl, { x0: 120, x1: 1340, y1: top + 172, t: t + i, amp: 3, snel: 90 });
      laag(ctx, hl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 120, top + 4, 1220, 168, 10); ctx.stroke(); });
      const r = zwemmer(ctx, id, 640, wl + (slag === 'rug' ? 0.07 : 0.12) * L, L, { slag, t: t + i * 0.3 });
      metaText(ctx, nm, 150, top + 50, hl > 0.5 ? C.goud : C.text2, 'left', 28);
      laag(ctx, q.on('gladde', 1, 0.4), () => stippel(ctx, r.voet.x, r.voet.y, r.hoofd.x + 20, r.hoofd.y, C.goud, 0.9, 2.5));
      laag(ctx, Ac, () => { SP1_pijlDik(ctx, 1000, wl - 40, 1180, wl - 40, 12, C.goud); for (const h of [r.handR, r.handL]) if (h && h.y > yy(h.x) + 8) SP1_waterTerug(ctx, h.x, h.y, 1, t, 1, 2, 70);
        if (slag === 'school') SP1_waterTerug(ctx, r.voet.x, r.voet.y, 1, t + 0.3, 1, 2, 70); }); });
    laag(ctx, Kb, () => SP1_klembord(ctx, 1440, 160, 380, 3, ramp(t, q.at('grip', 1) - 0.2, 0.9), { t })); },

  // ---------- H4 Start, keerpunt en de vijfde slag ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const Vi = q.on('video', 1, 0.4), Wt = q.at('Wat', 1);
    laag(ctx, 1 - Vi, () => { const wl = 180, L = 560, x = 360 + 360 * (1 - Math.exp(-t / 5)); SP1_water(ctx, wl, { t, amp: 2, snel: 10 });
      const r = zwemmer(ctx, 'sam', x, wl + 0.9 / 1.79 * L, L, { slag: 'stroomlijn', t }); SP1_bellen(ctx, r.voet.x - 20, r.voet.y, 9, t, { wl, seed: 2, drift: 90 }); SP1_bellen(ctx, r.heup.x, r.heup.y, 4, t, { wl, seed: 7, drift: 60, r: 4 });
      laag(ctx, q.on('Vijf', 1, 0.4), () => SP1_scorebord(ctx, 1640, 120, '5 M', 1, 44));
      laag(ctx, q.on('stroomlijn', 1, 0.4), () => naamBij(ctx, 'stroomlijn', '', r.heup.x - 80, r.heup.y - 110, 1, 'left', C.goud));
      laag(ctx, q.on('armen', 1, 0.4), () => naamBij(ctx, 'armen gestrekt', 'boven het hoofd', r.handR.x - 120, r.handR.y + 100, 1, 'left'));
      laag(ctx, q.on('recht', 1, 0.4), () => { stippel(ctx, r.voet.x - 20, r.voet.y + 4, r.handR.x + 20, r.handR.y + 4, C.goud, 1, 3); naamBij(ctx, 'lichaam en benen recht', '', r.voet.x - 20, r.heup.y + 120, 1, 'left'); }); });
    laag(ctx, Vi, () => { const tv = Math.min(t, Wt) - q.at('video', 1), Vx = 160, Vy = 140, Vw = 1600, Vh = 620; SP1_video(ctx, Vx, Vy, Vw, Vh, () => { const wl = Vy + 120, L = 460, up = ease(clamp(tv / 2.2, 0, 1));
        SP1_water(ctx, wl, { x0: Vx, x1: Vx + Vw, y1: Vy + Vh, t: tv, amp: 3, snel: 80 }); const x = 560 + 160 * tv, y = lerp(wl + 0.9 / 1.79 * L, wl + 0.12 * L, up);
        if (up < 0.98) SP1_zwemRot(ctx, 'sam', x, y, L, -0.25 * Math.sin(up * Math.PI), x, y, { slag: 'stroomlijn', t: tv }); else zwemmer(ctx, 'sam', x, y, L, { slag: 'crawl', t: tv });
        laag(ctx, ramp(tv, 1.6, 0.4), () => naamBij(ctx, 'al boven', 'na 5 m', Math.min(x + 260, Vx + Vw - 320), wl - 30, 1, 'left', C.koraal)); }, { u: 0.2 + tv / 10, pauze: t >= Wt });
      vraagteken(ctx, 1600, 640, q.on('Wat', 1, 0.4), 140); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: langer onder water blijven', 1 - q.on('driekwart', 1, 0.4)); const Bv = q.on('driekwart', 1, 0.5);
    laag(ctx, 1 - Bv, () => { const wl = 220, L = 520; SP1_water(ctx, wl, { t, amp: 2, snel: 10 });
      // deeltjes in het water stromen langs: hij gaat vooruit
      ctx.fillStyle = rgba('#BFE3F2', 0.35); for (let i = 0; i < 26; i++) { const x = ((hash(i) * 2200 - t * (200 + 160 * (1 - ramp(t, 3, 9)))) % 2000 + 2000) % 2000 - 40, y = wl + 30 + hash(i * 3.3) * 620; circ(ctx, x, y, 3 + hash(i * 7) * 3, rgba('#BFE3F2', 0.35)); }
      const r = zwemmer(ctx, 'sam', 760, wl + 0.9 / 1.79 * L, L, { slag: 'onderwater', t, tempo: 0.8 });
      kaart(ctx, 1390, 250, 430, 360, 1); const v = q.on('afzet', 1, 0.6) * (0.95 - 0.2 * ramp(t, q.at('houdt', 1), 6)); SP1_meter(ctx, 1605, 470, 130, v, { lab: 'SNELHEID', kl: C.goud, ref: 0.55, refLab: '' });
      metaText(ctx, 'NA DE AFZET', 1605, 300, C.goud, 'center', 28); metaA(ctx, '│ = AAN HET OPPERVLAK', 1605, 590, q.on('rest', 1, 0.4), C.text2, 'center', 28);
      laag(ctx, q.on('dolfijnslag', 1, 0.4), () => naamBij(ctx, 'dolfijnslag', 'beide benen samen', r.voet.x - 140, r.voet.y + 130, 1, 'left', C.goud)); });
    laag(ctx, Bv, () => { const wl = 330, M = 108, X0 = 140, L = 1.79 * M, yb = wl + 2 * M, d1 = wl + 0.75 * M, d2 = wl + 1 * M;
      SP1_water(ctx, wl, { x0: X0, x1: 1800, y1: yb, t, amp: 2, snel: 20 }); ctx.fillStyle = SP1.tegel; ctx.fillRect(X0 - 40, yb, 1760, 24); ctx.fillRect(X0 - 40, wl - 30, 40, yb - wl + 54);
      for (const m of [0, 5, 10, 15]) { metaText(ctx, m + ' M', X0 + m * M, yb + 64, C.text2, 'center', 28); lijn(ctx, [[X0 + m * M, yb + 24], [X0 + m * M, yb + 34]], C.line, 2); }
      laag(ctx, q.on('driekwart', 1, 0.4), () => { ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(X0, d1, 1700, d2 - d1); stippel(ctx, X0, d1, 1800, d1, C.goud, 0.8, 2); stippel(ctx, X0, d2, 1800, d2, C.goud, 0.8, 2); metaText(ctx, '± 0,75–1 M DIEP', X0 + 16, d2 + 44, C.goud, 'left', 28); });
      const T1 = q.at('driekwart', 1), T2 = q.at('boven', 1) + 0.6, u = clamp((t - T1) / (T2 - T1), 0, 1), xm = 5 + 9.6 * u, x = X0 + xm * M, upA = ramp(t, T2 - 1.6, 1.6);
      const y = lerp(wl + 0.87 * M, wl + 0.12 * L, upA);
      if (upA < 0.98) SP1_zwemRot(ctx, 'sam', x, y, L, -0.35 * Math.sin(upA * Math.PI), x, y, { slag: 'onderwater', t, tempo: 0.8 }); else sp1Crawl(ctx, x + Math.min(50, 40 * Math.max(0, t - T2)), wl, L, t);
      const G = q.on('golven', 1, 0.4) * (1 - q.on('vijfde', 1, 0.4)), V5 = q.on('vijfde', 1, 0.4) * (1 - q.on('Eindeloos', 1, 0.4)), B15 = q.on('vijftien', 1, 0.4);
      laag(ctx, G, () => tag(ctx, 'BIJNA GEEN GOLVEN', Math.min(x, 1500), 270, C.teal, 1, 'center', 30));
      laag(ctx, V5, () => tag(ctx, 'DE VIJFDE SLAG', 960, 270, C.goud, 1, 'center', 34));
      SP1_boeilijn(ctx, X0 + 15 * M, wl, yb, q.on('Eindeloos', 1, 0.4)); laag(ctx, B15, () => tag(ctx, '15 M · HOOFD BOVEN', X0 + 15 * M - 120, 270, C.koraal, 1, 'center', 30));
      laag(ctx, q.on('schoolslag', 1, 0.4), () => { kaartTekst(ctx, 140, 640, 960, 190, 'SCHOOLSLAG', [q.on('één', 1) > 0.5 ? 'één armslag + één dolfijnslag, dan omhoog' : ''], 1, C.goud, C.goud, 40);
        metaA(ctx, 'WORLD AQUATICS-REGLEMENT', 1800, 850, q.on('regel', 1, 0.4), C.grain, 'right', 28); }); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('honderd', 1, 0.5), Kb = q.on('klembord', 1, 0.4);
    laag(ctx, 1 - Bd, () => { const wl = 300, L = 520, Xm = 300; SP1_water(ctx, wl, { x0: Xm, t, amp: 2, snel: 10 }); SP1_kant(ctx, Xm, wl - 30, -1);
      const ts = q.at('start', 1), x = Xm + 0.53 * L + 700 * (1 - Math.exp(-Math.max(0, t - ts) / 1.4)); const r = zwemmer(ctx, 'sam', x, wl + 0.9 / 1.79 * L, L, { slag: 'stroomlijn', t });
      SP1_bellen(ctx, Xm + 40, r.voet.y, 10, t, { wl, seed: 5, drift: -60, a: ramp(t, ts, 0.3) });
      laag(ctx, q.on('start', 1, 0.4), () => naamBij(ctx, 'afzet van de muur', 'zonder startblok', Xm + 40, wl + 420, 1, 'left', C.goud)); });
    laag(ctx, Bd, () => { const pad = (x0, y0, w, n, cue, nr) => { const yl = SP1_badBoven(ctx, x0, y0, w, 150, 3, {}); const y1 = y0 + 30, y2 = y0 + 120, pts = [];
        for (let i = 0; i <= n; i++) pts.push([i % 2 ? x0 + w - 30 : x0 + 30, i % 2 ? y1 + (y2 - y1) * (i / n) : y1 + (y2 - y1) * (i / n)]);
        lijn(ctx, pts, C.goud, 4); const A = q.on(cue, nr, 0.4);
        for (let i = 1; i < n; i++) { const [px, py] = pts[i], al = ramp(t, q.at(cue, nr) + (i - 1) * 0.35, 0.3); circ(ctx, px, py, 24, al > 0.5 ? C.goud : '#2A3A58', C.goud, 2); text(ctx, String(i), px, py + 10, fTekst(30, 800), al > 0.5 ? '#121A26' : C.text, 'center'); }
        return A; };
      metaText(ctx, '100 M IN EEN 50-METERBAD', 360, 196, C.text2, 'left', 28); pad(360, 230, 1200, 2, 'één', 1);
      metaText(ctx, '100 M IN EEN 25-METERBAD', 360, 516, C.text2, 'left', 28); pad(360, 550, 600, 4, 'drie', 1);
      laag(ctx, q.on('één', 1, 0.4), () => text(ctx, '1 keerpunt', 1586, 460, fTekst(40, 800), C.goud, 'right'));
      laag(ctx, q.on('drie', 1, 0.4), () => text(ctx, '3 keerpunten', 1010, 640, fTekst(40, 800), C.goud, 'left'));
      laag(ctx, Kb, () => SP1_klembord(ctx, 1612, 190, 280, 4, ramp(t, q.at('onderwater', 1) - 0.1, 1.0), { t })); }); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const Gr = q.on('groeit', 1, 0.5), Li = q.on('Ligging', 1, 0.5), Am = q.on('Amsterdam', 1, 0.5), Kr = q.on('Kracht', 4, 0.5);
    laag(ctx, 1 - Gr, () => { SP1_klembord(ctx, 760, 250, 380, 4, 1, { t }); sp1Sam(ctx, 470, 860, 500, t, { kijk: 1, bril: 'muts', uit: 'neutraal' });
      sp1Trainer(ctx, 1460, 860, 500, t, { kijk: -1, pose: 'wijs', uit: 'blij', zonderBord: true });
      SP1_wolkje(ctx, 250, 260, 70, () => SP1_halter(ctx, 250, 260, 95), vensterA(t, q.at('krachtzaal', 1) - 0.3, q.at('Waarom', 1), 0.4), 1);
      laag(ctx, q.on('Waarom', 1, 0.4), () => tag(ctx, 'HOUDING OF SPIEREN?', 960, 160, C.goud, 1, 'center', 36)); });
    laag(ctx, Gr * (1 - Li), () => { SP1_parabool(ctx, 420, 240, 900, 480, { u: 0, m1: 1, m2: 1 }); laag(ctx, q.on('duur', 1, 0.4), () => tag(ctx, 'EXTRA KRACHT: DUUR GEKOCHT', 1450, 300, C.oker, 1, 'center', 32)); });
    // camerarit onder water door de baan: start → stroomlijn → ligging → catch → muur
    laag(ctx, Li * (1 - Am), () => { const T0 = q.at('Ligging', 1), cam = 1100 * ease(clamp((t - T0) / 7.0, 0, 1)), wl = 300, L = 400;
      ctx.save(); ctx.translate(-cam, 0); SP1_water(ctx, wl, { x0: cam - 20, x1: cam + W + 20, t, amp: 3, snel: 40 }); SP1_kant(ctx, 120, wl - 30, -1); SP1_kant(ctx, 2900, wl - 30, 1, { x2: 3200 });
      zwemmer(ctx, 'sam', 520, wl + 0.9 / 1.79 * L, L, { slag: 'onderwater', t }); const lab = [['onderwater', 'geen golven', 380, 760]];
      const r2 = sp1Crawl(ctx, 1300, wl, L, t); lab.push(['ligging', 'hoofd laag, lichaam vlak', 1200, wl + 260]);
      const r3 = sp1Crawl(ctx, 2150, wl, L, 0, { fase: 0.26 }); const fa = L * 1.04 / 6.1 * 1.2; SP1_peddel(ctx, r3.handR.x, r3.handR.y, r3.handR.x - 0.07 * fa, r3.handR.y - 0.6 * fa, 22, 1); lab.push(['catch', 'water naar achteren', r3.handR.x + 60, r3.handR.y + 40]);
      metaText(ctx, 'KEERPUNT', 2880, 250, C.text2, 'right', 28); ctx.restore();
      lab.forEach(([n, m, x, y]) => { const sx = x - cam; if (sx > 40 && sx < W - 420) naamBij(ctx, n, m, sx, y, 1, 'left', C.goud); });
      laag(ctx, q.on('geen', 1, 0.4), () => tag(ctx, 'GEEN EXTRA VERMOGEN', 960, 200, C.goud, 1, 'center', 32)); });
    laag(ctx, Am * (1 - Kr), () => { tag(ctx, 'EVEN VEEL ENERGIE', 160, 240, C.oker, 1, 'left', 32); SP1_balk(ctx, 160, 350, 1000, 1.11 / 1.3, C.goud, 'WEDSTRIJDZWEMMERS', '1,11 m/s', 1); SP1_balk(ctx, 160, 490, 1000, 0.9 / 1.3, C.goud, 'TRIATLETEN', '0,90 m/s', 1);
      laag(ctx, q.on('vijfde', 1, 0.4), () => text(ctx, 'ruim een vijfde sneller', 160, 660, fTekst(44, 800), C.goud, 'left')); metaText(ctx, 'TOUSSAINT 1990 · KLEINE GROEP', 1800, 850, C.grain, 'right', 28); });
    laag(ctx, Kr, () => { const kn = q.on('nodig', 1) > 0 ? 0.22 * Math.max(0, Math.sin((t - q.at('nodig', 1)) * 5)) * (t < q.at('nodig', 1) + 1.3 ? 1 : 0) + 0.22 * Math.max(0, Math.sin((t - q.at('krijgen', 1)) * 5)) * (t > q.at('krijgen', 1) && t < q.at('krijgen', 1) + 0.65 ? 1 : 0) : 0;
      SP1_klembord(ctx, 780, 200, 360, 4, 1, { t }); sp1Sam(ctx, 560, 860, 500, t, { zij: true, kijk: 1, knik: kn, bril: 'muts' }); sp1Trainer(ctx, 1380, 860, 500, t, { zij: true, kijk: -1, uit: 'blij', zonderBord: true }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    sp1Trainer(ctx, 250, 860, 480, t, { kijk: 1, pose: 'vasthouden', uit: 'blij', hold: (c, hx, hy) => { c.save(); roundRect(c, hx - 4, hy - 80, 130, 90, 8); shape(c, '#2A2F3E', '#5A6478', 2); c.fillStyle = SP1.water; c.fillRect(hx + 4, hy - 72, 114, 74); c.restore(); } });
    SP1_tafel(ctx, 1460, 620, 260, 240); SP1_laptop(ctx, 1480, 470, 220, (sx, sy, sw, sh) => SP1_spoor(ctx, sx + 6, sy + 8, sw - 12, sh - 16, t, (x) => Math.max(0, Math.sin(x * 5)) ** 3, { venster: 3 }));
    persoon(ctx, 'passant', 1790, 860, 480, { t, kijk: -1, uit: 'blij' });
    metaA(ctx, 'ZIET HET OP DE VIDEO', 250, 330, q.on('video', 1, 0.4) * (1 - q.on('Trainer', 2, 0.4)), C.text2, 'center', 28); metaA(ctx, 'MEET HET', 1600, 400, q.on('meet', 1, 0.4) * (1 - q.on('Bewegingswetenschappen', 1, 0.4)), C.text2, 'center', 28);
    kaartTekst(ctx, 470, 150, 720, 300, 'ZWEMTRAINER', ['diploma’s van de zwembond', 'mbo: CIOS', 'hbo: ALO of Sportkunde'], q.on('Trainer', 2, 0.4), C.goud, C.goud);
    kaartTekst(ctx, 680, 500, 720, 250, 'BEWEGINGSWETENSCHAPPER', ['wo: Bewegingswetenschappen', 'VU Amsterdam · Groningen'], q.on('Bewegingswetenschappen', 1, 0.4), C.teal, C.teal); }
});
