// Wat word jij? · Tuin- en landschapsinrichting 2 · Natuur in de stad — scènes per alinea (v1.0, 2 nov 2026).
// Look: Schema met cast (Lotte = stagiair; Hovenier Jeroen). In de stem alleen 'de stagiair' en 'de hovenier'; namen alleen in beeld.
// Decor 'schoolplein' (middag) en 'schoolpleinAvond' alleen waar de scène op het plein speelt (cold open, H1, H2-begin, H3-begin, recap);
// uitleg (doorsneden, huidmondje, wadi, groen dak, nest, bovenaanzicht) op navy. Donkere asfaltstrook over het plein (keuring r4).
// Doorlopende camera met hoogtemeter rechtsboven (STAD · DAK · BLAD · PLEIN · BODEM, in echte hoogte; het lichtje loopt mee).
// Per hoofdstuk hooguit één snede: H2 bij 'Een boom doet dus twee dingen' (naar de boom op navy), verder zooms en pans.

const STAD = (o = {}) => (ctx) => tu2_stadNacht(ctx, 960, 700, 1700, o);
// het plein als volledig beeld (avond of middag), met overlays in wereldmaat
function pleinBeeld(ctx, avond, o = {}) { bg(ctx, 'schema'); decorBeeld(ctx, avond ? 'schoolpleinAvond' : 'schoolplein', 0.6); asfaltStrook(ctx, 1, { avond, heet: o.heet || 0, rand: o.rand || 0 }); }
// kaartje met een vraag (cold open)
function puzzelKaart(ctx, a) { laag(ctx, a, () => { kaart(ctx, 120, 190, 1000, 290, 1, C.goud); text(ctx, 'Hoe maak je dit plein koeler', 170, 300, fTekst(56, 800), C.text, 'left'); text(ctx, 'zonder airco?', 170, 375, fTekst(56, 800), C.text, 'left');
  metaText(ctx, 'NATUUR IN DE STAD', 170, 440, C.goud, 'left', 28); vraagteken(ctx, 1040, 420, 1, 120); }); }
// boom op navy (H2): stam op (BX, BY)
const BX = 640, BY = 800, BS = 0.42;
// zoomcirkel met het huidmondje
function huidmondjeCirkel(ctx, a, t, o = {}) { if (a <= 0.01) return; const cx = 1300, cy = 470, r = 320 * (0.6 + 0.4 * a);
  zoomCircle(ctx, cx, cy, r, o.bron ? o.bron[0] : BX + 150, o.bron ? o.bron[1] : BY - 470, 'HUIDMONDJE · ONDERKANT VAN EEN BLAD', a, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
    tu2_huidmondje(ctx, cx, cy + 30, 1.15, { open: o.open == null ? 1 : o.open, warmte: o.warmte || 0, t }); }); }

// plas op het plein bij de bui (P 0..1 = groeit van het putje tot aan de schooldeur)
function plas(ctx, P) { if (P <= 0.01) return; ctx.save(); const cx = lerp(1360, 820, P), cy = lerp(700, 770, P), rx = lerp(110, 760, P), ry = lerp(14, 96, P);
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(cx, cy, rx * (1 - k * 0.05), ry * (1 - k * 0.12), 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.14 + k * 0.06); ctx.fill(); }
  ctx.strokeStyle = rgba('#BFE3F2', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(cx - rx * 0.2 + k * rx * 0.25, cy - ry * 0.3, rx * 0.12, ry * 0.08, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { tu2_boom(ctx, 1620, 820, 0.3, { schaduw: 1, t }); tu2_wildeBij(ctx, 1380 + Math.sin(t * 0.7) * 24, 360 + Math.sin(t * 1.3) * 12, 0.9, { houding: 'vliegen', t, kijk: -1 });
    tu2_druppel(ctx, 1830, 420 + ((t * 120) % 300), 18, {}); tu2_luchtThermo(ctx, 1290, 790, 150, 0.7, C.koraal); },

  // ---------- Cold open: 's avonds om elf uur, hand op de tegels ----------
  s01(ctx, t, q) { const Vr = q.on('Hoe', 1, 0.5), Va = fase(t, q.at('Vanmiddag', 1) - 0.2, q.at('Hoe', 1) + 0.2, 0.5);
    pleinBeeld(ctx, true, { rand: fase(t, q.at('asfalt', 1), q.at('Hoe', 1), 0.4) });
    laag(ctx, 1 - Vr, () => tu2_klok(ctx, 230, 250, 72, 23, 0, { tekst: '23:00' }));
    const L = ramp(t, 0.2, 0.3); gloed(ctx, 665, 860, 150, q.on('warm', 1, 0.8) * (1 - Vr * 0.4));
    laag(ctx, q.on('warm', 1, 0.6), () => { for (let i = 0; i < 4; i++) { const ph = (t * 0.35 + i * 0.25) % 1; tu2_warmtePijl(ctx, 590 + i * 52, 846 - ph * 70, 80, Math.sin(ph * Math.PI), t + i, -Math.PI / 2, 5); } });
    lotteHurk(ctx, 545, t, { a: L, uit: q.on('warm', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Lotte', 'STAGIAIR', 540, 490, L * q.on('stagiair', 1, 0.4), 'center');
    // inzet: hetzelfde plein vanmiddag, infraroodthermometer op het asfalt
    laag(ctx, Va, () => { const ix = 1120, iy = 150, iw = 540, ih = 304; ctx.save(); roundRect(ctx, ix - 6, iy - 6, iw + 12, ih + 12, 14); shape(ctx, rgba('#0D1420', 0.9), C.goud, 2.5); ctx.restore();
      krimp(ctx, 1, [ix, iy, iw, ih], () => { pleinBeeld(ctx, false, { heet: q.on('vijftig', 1, 0.5) }); }); metaB(ctx, 'VANMIDDAG', ix + 16, iy + ih - 18, 1, C.goud, 'left', 24);
      const tx = ix + iw * 0.7, ty = iy + ih * 0.83; tu2_irThermometer(ctx, ix + 60, iy + 120, 0.42, { waarde: q.on('vijftig', 1) > 0.3 ? '50 °C' : '', kleur: '#B23A2A', doel: [tx, ty], straal: q.on('asfalt', 1, 0.4) });
      meetLabel(ctx, '50 °C', tx, ty - 26, C.koraal, q.on('vijftig', 1, 0.4), 28); });
    puzzelKaart(ctx, Vr);
    hMeter(ctx, 3, ramp(t, 0.6, 0.6)); },

  // ---------- H1 Meten op het plein: het hitte-eiland ----------
  s03(ctx, t, q) { const tM = q.at('Vanmiddag', 1), tN = q.at('nacht', 1), tO = q.at('omhoog', 1);
    const dag = fase(t, tM - 0.3, tN + 0.3, 0.6), Om = ramp(t, tO - 0.2, 2.6);
    const cam = camPad(t, [[0, CAM0], [q.at('lucht', 1) - 0.2, { x: 1440, y: 560, z: 1.35 }, 1.4], [q.at('asfalt', 1) - 0.3, { x: 1200, y: 720, z: 1.25 }, 1.3], [tN - 0.2, CAM0, 1.2]]);
    const plein = () => { metCam(ctx, cam, () => { pleinBeeld(ctx, true); laag(ctx, dag, () => pleinBeeld(ctx, false, { heet: q.on('heter', 1, 0.6) * dag }));
        // meethut op het grasrandje: luchtthermometer met 30 °C
        laag(ctx, q.on('lucht', 1, 0.5) * dag, () => { tu2_luchtThermo(ctx, 1640, 560, 130, q.on('dertig', 1, 0.8) * 0.55, C.koraal, { waarde: q.on('dertig', 1) > 0.3 ? '30 °C' : '' }); });
        laag(ctx, q.on('meethut', 1, 0.4) * dag, () => { ctx.save(); ctx.beginPath(); ctx.ellipse(PL.meethut[0], 560, 46, 80, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); });
        laag(ctx, q.on('asfalt', 1, 0.4) * dag, () => meetLabel(ctx, '50 °C', 1330, 830, C.koraal, 1, 34)); });
      laag(ctx, q.on('meethut', 1, 0.4) * dag * (1 - q.on('asfalt', 1, 0.4)), () => metaB(ctx, 'LUCHT: 1,5 M HOOG, IN EEN MEETHUT', 960, 820, 1, C.text, 'center', 28));
      // personages (in beeld, niet in de camera): Jeroen met tablet, Lotte met de infraroodthermometer
      const J = q.on('hovenier', 1, 0.3), irA = q.on('asfalt', 1, 0.3) * dag;
      laag(ctx, 1 - ramp(t, q.at('lucht', 1) - 0.4, 0.5) * (1 - ramp(t, tN - 0.3, 0.5)), () => {
        jeroen(ctx, 1180, t, { a: J, pose: 'vasthouden', hold: houdTablet, uit: 'blij' }); naamBij(ctx, 'Hovenier Jeroen', 'HOVENIER', 1180, 370, J, 'center');
        lotte(ctx, 760, t, { kijk: 1, uit: 'blij' }); naamBij(ctx, 'Lotte', 'STAGIAIR', 760, 380, 1, 'center');
        laag(ctx, q.on('meten', 1, 0.4), () => tag(ctx, 'EERST METEN', 1180, 300, C.goud, 1, 'center', 32)); });
      laag(ctx, irA, () => { lotte(ctx, 420, t, { kijk: 1, pose: 'vasthouden', hold: houdIR({ waarde: '50 °C', kleur: '#B23A2A', doel: [1122, 700] }), uit: 'neutraal' }); }); };
    bg(ctx, 'schema'); laag(ctx, Om, () => { STAD({ therm: q.on('Waar', 1, 0.5), vraag: true, verschil: 0, warm: 0, t })(ctx); });
    laag(ctx, Om, () => { metaA(ctx, 'WEILAND', 260, 800, q.on('weiland', 1, 0.5), C.text2, 'center', 28); metaA(ctx, 'WEILAND', 1660, 800, q.on('weiland', 1, 0.5), C.text2, 'center', 28); metaA(ctx, 'STAD', 960, 800, q.on('stad', 1, 0.5), C.text2, 'center', 28); });
    krimp(ctx, Om, [920, 700, 80, 45], () => plein(), 1 - ramp(t, tO + 1.8, 0.8));
    hMeter(ctx, hPos(t, [[0, 3], [tO - 0.2, 0, 2.6]])); },

  s05(ctx, t, q) { const tO = q.at('Overdag', 1), tD = q.at('Daarom', 1), tV = q.at('voelden', 1);
    const In = ramp(t, tO - 0.6, 1.4), Uit = ramp(t, tD - 0.3, 1.4), Weg = ramp(t, tV - 0.75, 0.35), Pl = ramp(t, tV - 0.35, 0.35); // camera: stad → doorsnede → stad → plein
    const fz = ramp(t, q.at('zonsondergang', 1) - 0.2, 1.6);
    bg(ctx, 'schema');
    const stad = () => STAD({ therm: 1, verschil: q.on('minder', 1, 1.6), warm: q.on('minder', 1, 1.6), t })(ctx);
    const door = () => { bg(ctx, 'schema'); tu2_tegelsDoorsnede(ctx, 960, 470, 1400, { fase: fz, warmte: clamp(0.15 + q.on('zonnewarmte', 1, 1.6) * 0.85 - fz * 0.25, 0, 1), t });
      laag(ctx, 1 - fz, () => { zon(ctx, 230, 260, 46, 1, t); metaText(ctx, 'OVERDAG', 320, 270, C.goud, 'left', 28); });
      laag(ctx, fz, () => { circ(ctx, 230, 260, 40, '#E8E4D4'); circ(ctx, 248, 250, 36, C.bgSchema); metaText(ctx, "'S NACHTS", 320, 270, C.text2, 'left', 28); });
      metaA(ctx, 'ASFALT · TEGELS · BETON', 960, 760, q.on('asfalt', 1, 0.5), C.oker, 'center', 28);
      laag(ctx, q.on('groen', 1, 0.5), () => { tu2_grasVeld(ctx, 1560, 516, 160, { damp: 0.9, t }); metaText(ctx, 'WEINIG GROEN', 1560, 650, C.groen, 'center', 26); }); };
    // stad (begin en na 'Daarom'), doorsnede ertussen
    if (In < 1 || Uit > 0) { laag(ctx, (In < 1 ? 1 : Uit) * (1 - Weg), stad); }
    if (In > 0 && Uit < 1) krimp(ctx, In < 1 ? 1 - In : Uit, [880, 690, 160, 90], door, In < 1 ? In : 1 - Uit);
    laag(ctx, Uit * (1 - Weg), () => { laag(ctx, q.on('hitte-eiland', 1, 0.5), () => tag(ctx, 'HITTE-EILAND', 1270, 300, C.koraal, 1, 'center', 36));
      metaB(ctx, 'LUCHT: TOT ± 7 °C · HELDERE, WINDSTILLE NACHT', 960, 850, q.on('zeven', 1, 0.5), C.text, 'center', 26); });
    // terug naar het plein: de tegels voelen nog warm
    // korte overgang via navy (stad weg, dan het plein), nooit twee scènes met een persoon over elkaar
    const Lh = ramp(t, tV, 0.2); // Lotte pas als het plein ondoorzichtig staat (geen spookachtige persoon)
    laag(ctx, Pl, () => { pleinBeeld(ctx, true); gloed(ctx, 665, 860, 150, 0.9 * Lh); lotteHurk(ctx, 545, t, { uit: 'neutraal', a: Pl >= 0.999 ? Lh : 0 }); for (let i = 0; i < 4; i++) { const ph = (t * 0.35 + i * 0.25) % 1; tu2_warmtePijl(ctx, 590 + i * 52, 846 - ph * 60, 70, Math.sin(ph * Math.PI) * 0.9 * Lh, t + i, -Math.PI / 2, 5); } });
    antwoord(ctx, 'antwoord b: stenen geven warmte af', 1 - ramp(t, tO + 4, 0.6));
    hMeter(ctx, hPos(t, [[0, 0], [tO - 0.6, 3, 1.4], [tD - 0.3, 0, 1.4], [tV - 0.4, 3, 0.3]])); },

  // ---------- H2 Een boom als airco ----------
  s06(ctx, t, q) { const cam = camPad(t, [[0, CAM0], [q.at('blad', 1) - 0.3, { x: 700, y: 560, z: 1.3 }, 1.6]]);
    const tE = q.at('eenendertig', 1), tZ = q.at('zon', 1);
    metCam(ctx, cam, () => { pleinBeeld(ctx, false, { heet: q.on('vijftig', 1, 0.5) });
      laag(ctx, q.on('blad', 1, 0.5), () => { ctx.save(); ctx.beginPath(); ctx.ellipse(PL.kroon[0], PL.kroon[1], 200, 165, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); });
      meetLabel(ctx, '31 °C', PL.schaduw[0], PL.schaduw[1] - 24, C.teal, q.on('eenendertig', 1, 0.4), 34);
      meetLabel(ctx, '50 °C', 1340, 830, C.koraal, q.on('vijftig', 1, 0.4), 34);
      laag(ctx, q.on('schaduw', 1, 0.4), () => { tag(ctx, 'SCHADUW', PL.schaduw[0], PL.schaduw[1] + 60, C.text2, 1, 'center', 26); vink_(ctx, PL.schaduw[0] + 110, PL.schaduw[1] + 44, 16, q.on('klopt', 1, 0.4)); });
      laag(ctx, q.on('Wat', 1, 0.4), () => vraagteken(ctx, PL.kroon[0] + 260, PL.kroon[1] - 40, 1, 110)); });
    const doel = t < tZ ? [PL.schaduw[0], PL.schaduw[1]] : [1340, 856];
    laag(ctx, 1 - q.on('blad', 1, 0.5), () => { lotte(ctx, 230, t, { kijk: 1, pose: 'vasthouden', uit: q.on('denkt', 1) > 0.5 ? 'denkt' : 'neutraal', hold: houdIR({ waarde: t < tZ ? (t > tE ? '31 °C' : '') : '50 °C', kleur: t < tZ ? '#1A2740' : '#B23A2A', doel: doel }) });
      naamBij(ctx, 'Lotte', 'STAGIAIR', 230, 390, 1 - q.on('eenendertig', 1, 0.4), 'center'); });
    hMeter(ctx, 3); },

  s08(ctx, t, q) { const tS = q.at('twee', 1), Sn = ramp(t, tS - 0.25, 0.3), tDi = q.at('directie', 1);
    // deel 1 (decor): camera in de kroon, zoomcirkel met het huidmondje; dan naar het veld (kunstgras en echt gras)
    laag(ctx, 1 - Sn, () => { const cam = camPad(t, [[0, { x: 700, y: 560, z: 1.3 }], [0.3, { x: 560, y: 400, z: 2.1 }, 1.6], [tDi - 0.3, { x: 985, y: 560, z: 1.9 }, 1.8]]);
      metCam(ctx, cam, () => { pleinBeeld(ctx, false); veldVlakken(ctx, q.on('kunstgras', 1, 0.5));
        laag(ctx, q.on('kunstgras', 1, 0.5), () => { metaB(ctx, 'KUNSTGRAS', PL.kunst[0] + PL.kunst[2] / 2 + 60, PL.kunst[1] - 16, 1, C.text, 'center', 15); metaB(ctx, 'ECHT GRAS', PL.echt[0] + PL.echt[2] / 2 - 120, PL.echt[1] - 16, 1, C.text, 'center', 15);
          laag(ctx, q.on('echte', 1, 0.5), () => { for (let k = 0; k < 7; k++) { const ph = (t * 0.4 + hash(k * 3)) % 1; waterMol(ctx, PL.echt[0] + 330 + hash(k * 7) * 280, PL.echt[1] + 30 - ph * 90, 6, Math.sin(ph * Math.PI)); } }); });
        meetLabel(ctx, '60 °C', PL.kunst[0] + 430, PL.kunst[1] + 64, C.koraal, q.on('zestig', 1, 0.4), 24);
        meetLabel(ctx, '35 °C', PL.echt[0] + 260, PL.echt[1] + 58, C.teal, q.on('vijfendertig', 1, 0.4), 24); });
      const H = fase(t, q.at('huidmondjes', 1) - 0.3, tDi, 0.6); huidmondjeCirkel(ctx, H, t, { warmte: q.on('Verdampen', 1, 1.0), bron: [600, 420] });
      laag(ctx, q.on('transport', 1, 0.4) * (1 - ramp(t, tDi - 0.5, 0.5)), () => filmKaartje(ctx, 120, 790, 'Transport in planten'));
      // infraroodthermometer in beeld op het veld
      laag(ctx, q.on('kunstgras', 2, 0.3), () => { const e = t >= q.at('echte', 1), op = e ? [1560, 560] : [420, 560]; lotte(ctx, 190, t, { kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: houdIR({ waarde: t < q.at('zestig', 1) ? '' : e ? '35 °C' : '60 °C', kleur: e ? '#1A5A7A' : '#B23A2A', doel: op }) }); }); });
    // deel 2 (snede naar navy): de boom doet twee dingen
    laag(ctx, Sn, () => { bg(ctx, 'schema'); const Z = q.on('schaduw', 1, 0.5), Vd = q.on('verdampt', 2, 0.5);
      const b = tu2_boom(ctx, BX, BY, BS, { zon: Z, zonU: q.on('schaduw', 1, 1.6), schaduw: 1, grond: 1, t });
      laag(ctx, Vd, () => { for (let k = 0; k < 9; k++) { const ph = (t * 0.3 + hash(k * 5)) % 1; waterMol(ctx, BX - 230 + hash(k * 11) * 460, BY - 380 - ph * 260, 9, Math.sin(ph * Math.PI)); } });
      laag(ctx, Z, () => tag(ctx, 'SCHADUW', BX + 330, BY + 40, C.goud, 1, 'center', 32));
      laag(ctx, Vd, () => tag(ctx, 'VERDAMPING', BX + 470, BY - 560, C.teal, 1, 'center', 32));
      metaB(ctx, 'GEVOELSTEMPERATUUR · KAN 10–15 °C KOELER VOELEN', 1340, 470, q.on('tien', 1, 0.5), C.text, 'center', 24); });
    antwoord(ctx, 'antwoord b: het blad verdampt water', 1 - ramp(t, 6, 0.6));
    hMeter(ctx, hPos(t, [[0, 3], [0.3, 2, 1.6], [tDi - 0.3, 3, 1.6]])); },

  s09(ctx, t, q) { bg(ctx, 'schema'); tu2_boom(ctx, BX, BY, BS, { schaduw: 1, grond: 1, t });
    const J = ramp(t, 0.1, 0.3); jeroen(ctx, 1420, t, { a: J, kijk: -1, pose: 'wijs', uit: 'neutraal' }); naamBij(ctx, 'Hovenier Jeroen', 'HOVENIER', 1420, 370, J, 'center');
    laag(ctx, q.on('augustus', 1, 0.4), () => tag(ctx, 'EN IN AUGUSTUS?', 1420, 290, C.goud, 1, 'center', 34)); hMeter(ctx, 3); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const tDa = q.at('Daarom', 1), Up = ramp(t, tDa - 0.4, 1.4);
    const dr = q.on('water', 1, 2.0), dicht = q.on('dicht', 1, 2.0);
    laag(ctx, 1 - Up, () => { tu2_boom(ctx, BX, BY + Up * 600, BS, { schaduw: 1, grond: 1, droog: dr, t });
      laag(ctx, q.on('warmer', 1, 0.6), () => { for (let i = 0; i < 6; i++) { const ph = (t * 0.3 + i / 6) % 1; tu2_warmtePijl(ctx, BX - 200 + i * 80, BY - 560 - ph * 70, 70, Math.sin(ph * Math.PI), t + i, -Math.PI / 2, 5); } });
      laag(ctx, q.on('grond', 1, 0.5), () => { for (let k = 0; k < 14; k++) tu2_druppel(ctx, BX - 220 + k * 34, BY + 16 + (k % 2) * 6, 7, { a: 0.9 }); metaText(ctx, 'WATER IN DE GROND', BX, BY + 70, C.teal, 'center', 26); });
      huidmondjeCirkel(ctx, ramp(t, 0.6, 0.6), t, { open: 1 - dicht * 0.95, warmte: 1 - dicht * 0.6 }); });
    // de camera stijgt: boomvak van boven, smal gat → breed plantvak; daarna een bui die het riool in loopt
    laag(ctx, Up, () => { const u = q.on('breed', 1, 1.2); tu2_plantvak(ctx, 820, 470 - (1 - Up) * 300, 0.85, { u, rand: q.on('plantvak', 1, 0.5), kroon: 1 });
      laag(ctx, q.on('plantvak', 1, 0.5), () => tag(ctx, 'PLANTVAK', 820, 860 - 40, C.goud, 1, 'center', 32));
      const B = q.on('bui', 1, 0.5); laag(ctx, B, () => { tu2_bui(ctx, 300, 1500, 130, 790, { t, n: 90, hard: 1 }); roundRect(ctx, 1310, 600, 70, 46, 6); shape(ctx, '#6A6E78', null); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(1322 + i * 15, 606); ctx.lineTo(1322 + i * 15, 640); ctx.stroke(); }
        for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k * 0.25) % 1; pijl(ctx, 1150 + k * 10, 330 + k * 90, lerp(1150, 1300, ph) + k * 10, lerp(330 + k * 90, 610, ph), C.teal, Math.sin(ph * Math.PI), 4, 14); }
        metaB(ctx, 'PUTJE → RIOOL', 1345, 700, q.on('riool', 1, 0.4), C.text, 'center', 24); }); });
    antwoord(ctx, 'antwoord a: zijn huidmondjes gaan dicht', 1 - ramp(t, 6, 0.6));
    hMeter(ctx, hPos(t, [[0, 2], [tDa - 0.4, 3, 1.4]])); },

  // ---------- H3 Waar laat je de regen? ----------
  s12(ctx, t, q) { const tR = q.at('rolt', 1), tDu = q.at('Duizenden', 1), tV = q.at('regendruppel', 1);
    const val = clamp((t - 0.3) / (q.at('tegel', 1) + 0.1 - 0.3), 0, 1), dx = 1250, dyT = 700, dy = lerp(60, dyT, ease(val));
    const rol = ease(clamp((t - tR) / 1.2, 0, 1)), px = lerp(dx, PL.putje[0], rol), py = lerp(dy, PL.putje[1], rol);
    const cam0 = { x: 1250, y: clamp(dy, 318, 762), z: 1.7 }, cam = camL(cam0, CAM0, ramp(t, tDu - 0.3, 1.6));
    metCam(ctx, cam, () => { pleinBeeld(ctx, false); stormLucht(ctx, 1);
      plas(ctx, ramp(t, q.at('water', 1) - 0.3, 2.4));
      laag(ctx, q.on('deur', 1, 0.4), () => { const [x, y, w, h] = PL.deur; ctx.save(); roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); });
      if (t < tDu + 1.5) tu2_druppel(ctx, px, py - 30 * (1 - rol), 26 / Math.max(1, cam.z * 0.7), { focus: true, a: 1 - ramp(t, tDu + 0.8, 0.6) }); });
    tu2_bui(ctx, 0, W, 0, 880, { t, n: Math.round(40 + 140 * ramp(t, tDu - 0.2, 0.8)), hard: 1 });
    const L = q.on('stagiair', 1, 0.2); lotte(ctx, 1540, t, { a: L, kijk: -1, pose: 'wijs', uit: 'neutraal' }); naamBij(ctx, 'Lotte', 'STAGIAIR', 1540, 370, L, 'center');
    laag(ctx, q.on('riool', 1, 0.4), () => tag(ctx, 'RIOOL TE KLEIN', 1540, 300, C.koraal, 1, 'center', 32));
    laag(ctx, q.on('hovenier', 1, 0.4), () => vraagteken(ctx, 1220, 420, 1, 110));
    hMeter(ctx, hPos(t, [[0, 1], [0.3, 3, q.at('tegel', 1)]])); },

  s14(ctx, t, q) { const tR = q.at('riool', 1), tD = q.at('dezelfde', 1);
    const cam = camPad(t, [[0, CAM0], [tR - 0.3, { x: 960, y: 1620, z: 1 }, 1.8], [tD - 0.3, { x: 2880, y: 1620, z: 1 }, 1.8]]);
    const vul = lerp(0.35, 1, ramp(t, q.at('wolkbreuk', 1), 1.6));
    const u = t < q.at('makkelijker', 1) ? 0.25 * ramp(t, tD + 0.2, 1.4) : t < q.at('wormengangen', 1) ? lerp(0.25, 0.45, ramp(t, q.at('makkelijker', 1) - 0.3, 1.0)) : t < q.at('humus', 1) ? lerp(0.45, 0.65, ramp(t, q.at('wormengangen', 1), 1.6)) : lerp(0.65, 1, ramp(t, q.at('humus', 1), 1.2));
    bg(ctx, 'schema');
    metCam(ctx, cam, () => { pleinBeeld(ctx, false); stormLucht(ctx, 0.8); plas(ctx, 1);
      tu2_riool(ctx, 960, 1320, 1700, { vul, t });
      tu2_bodemDruppel(ctx, 2880, 1440, 1500, { u }); });
    // labels in beeld
    const RV = 1 - ramp(t, tD - 0.3, 0.8), BD = ramp(t, tD + 0.6, 0.6);
    laag(ctx, RV, () => { metaB(ctx, 'RIOOL: BEPERKT PER UUR', 960, 800, q.on('uur', 1, 0.5), C.text, 'center', 28); laag(ctx, q.on('duur', 1, 0.4), () => tag(ctx, 'GROTER RIOOL: DUUR', 1450, 760, C.koraal, 1, 'center', 28)); });
    laag(ctx, BD, () => { laag(ctx, q.on('spons', 1, 0.5), () => tag(ctx, 'BODEM ALS SPONS', 1320, 300, C.goud, 1, 'center', 34));
      naamBij(ctx, 'wormengang', '', 960 - 180 - 30, 700, q.on('wormengangen', 1, 0.5), 'right'); naamBij(ctx, 'humus', '', 1530, 480, q.on('humus', 1, 0.5), 'center');
      filmKaartje(ctx, 1200, 790, 'Wat zit er in de bodem?', q.on('film', 1, 0.4)); });
    tu2_bui(ctx, 0, W, -200, 880 - (cam.y - 540), { t, n: 120, hard: 1, a: clamp(1 - (cam.y - 540) / 500, 0, 1) });
    antwoord(ctx, 'antwoord c: regen in de grond laten zakken', 1 - ramp(t, 6, 0.6));
    hMeter(ctx, hPos(t, [[0, 3], [tR - 0.3, 4, 1.8]])); },

  s15(ctx, t, q) { const tDk = q.at('dak', 1), tB = q.at('weg', 1) + 0.2;
    const tT = q.at('weg', 1) + 0.2, cam = camPad(t, [[0, { x: 960, y: 1620, z: 1 }], [0, CAM0, 1.8], [tDk - 0.3, { x: 900, y: -600, z: 1.1 }, 1.8], [tT, CAM0, 1.2]]);
    const water = Math.max(0, lerp(0, 0.75, ramp(t, q.at('stroomt', 1), 2.4)) - 0.55 * ramp(t, q.at('zakt', 1), 2.2) - 0.2 * ramp(t, q.at('droog', 1) - 0.8, 1.0));
    const regen = q.on('gewone', 1, 0.5) * 0.55 + q.on('wolkbreuk', 1, 0.5) * 0.45, vol = lerp(0, 0.75, q.on('gewone', 1, 2.0)) + 0.25 * q.on('wolkbreuk', 1, 1.5);
    bg(ctx, 'schema');
    metCam(ctx, cam, () => {
      tu2_bodemDruppel(ctx, 960, 1440, 1500, { u: 1, worm: true });
      tu2_wadi(ctx, 960, 520, 1500, { water, instroom: fase(t, q.at('stroomt', 1), q.at('zakt', 1) + 0.5, 0.5), zak: fase(t, q.at('zakt', 1), q.at('droog', 1) + 0.6, 0.5), t });
      // boom naast de wadi; wortels alleen in de bodemband (doorsnede), water van de wadi naar de wortels
      const B = q.on('grond', 1, 0.5); laag(ctx, B, () => { ctx.save(); ctx.strokeStyle = TU2.stam; ctx.lineCap = 'round'; for (let k = -2; k <= 2; k++) { ctx.lineWidth = 7 - Math.abs(k); ctx.beginPath(); ctx.moveTo(1560, 492); ctx.quadraticCurveTo(1560 + k * 30, 560, 1560 + k * 70, 640 + Math.abs(k) * 10); ctx.stroke(); } ctx.restore();
        tu2_boom(ctx, 1560, 490, 0.2, { schaduw: 0, t }); for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; tu2_druppel(ctx, lerp(1180, 1520, ph), lerp(690, 640, ph), 8, { a: Math.sin(ph * Math.PI) }); }
        laag(ctx, q.on('verdampen', 1, 0.4), () => { for (let k = 0; k < 5; k++) { const ph = (t * 0.4 + k / 5) % 1; waterMol(ctx, 1500 + hash(k * 3) * 120, 230 - ph * 80, 7, Math.sin(ph * Math.PI)); } }); });
      tu2_groenDak(ctx, 960, -680, 1100, { vol, regen, straal: ramp(t, q.at('later', 1) - 0.2, 1.2) * 0.9, t });
      laag(ctx, q.on('groen', 1, 0.4), () => { const L = { s: -680 - 116, g: -680 - 70, b: -680 - 17 }; metaText(ctx, 'VETPLANTJES', 395, L.s + 8, C.groen, 'right', 22); metaText(ctx, 'GROND', 395, L.g + 8, C.oker, 'right', 22); metaText(ctx, 'HOUDT WATER VAST', 395, L.b + 8, C.teal, 'right', 22); }); });
    const Wd = 1 - ramp(t, tDk - 0.3, 0.6) + ramp(t, tB - 0.5, 0.6);
    laag(ctx, q.on('wadi', 1, 0.5) * clamp(Wd, 0, 1), () => { tag(ctx, 'WADI', 960, 330, C.goud, 1, 'center', 40); });
    laag(ctx, fase(t, q.at('dag', 1) - 0.2, tDk - 0.2, 0.4), () => { tu2_kalender(ctx, 1500, 300, '2', 1); metaB(ctx, 'NA EEN DAG OF TWEE: DROOG', 1500, 430, 1, C.text, 'center', 24); });
    laag(ctx, fase(t, tDk + 1.5, tB, 0.4), () => tag(ctx, 'GROEN DAK', 960, 200, C.goud, 1, 'center', 36));
    hMeter(ctx, hPos(t, [[0, 4], [0, 3, 1.8], [tDk - 0.3, 1, 1.8], [tT, 3, 1.2]])); },

  // ---------- H4 Het ontwerp: bloei van maart tot oktober ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const In = ramp(t, 0, 1.6);
    krimp(ctx, In, [1060, 600, 120, 68], () => { bg(ctx, 'schema'); tu2_wadi(ctx, 960, 520, 1500, { t }); }, 1 - In);
    laag(ctx, In, () => { tu2_plan(ctx, { dak: 1, bomen: q.on('bomen', 1, 1.0), gras: q.on('gras', 1, 0.8), wadi: q.on('wadi', 1, 0.8), bloem: q.on('bloemen', 1, 1.0), bloei: 0.4, t });
      laag(ctx, q.on('wadi', 1, 0.5), () => naamBij(ctx, 'wadi', '', PLAN.wadi[0], PLAN.wadi[1] + 12, 1, 'center'));
      laag(ctx, q.on('bestuivers', 1, 0.5), () => { for (let k = 0; k < 3; k++) tu2_wildeBij(ctx, 560 + k * 260 + Math.sin(t * 0.9 + k) * 20, 798 + Math.sin(t * 1.4 + k * 2) * 6, 0.32, { houding: 'vliegen', t: t + k, kijk: k % 2 ? 1 : -1 }); });
      filmKaartje(ctx, 170, 800, 'Binnen de grenzen', q.on('grenzen', 1, 0.4)); });
    const L = q.on('bijenhotel', 1, 0.3); lotte(ctx, 1745, t, { a: L, kijk: -1, pose: 'vasthouden', uit: 'blij', hold: (c, hx, hy) => tu2_bijenhotel(c, hx - 6, hy - 40, 0.5) }); naamBij(ctx, 'Lotte', 'STAGIAIR', 1745, 380, L, 'center');
    laag(ctx, q.on('genoeg', 1, 0.4), () => vraagteken(ctx, 1560, 470, 1, 100));
    hMeter(ctx, hPos(t, [[0, 3]])); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('graven', 1), tH = q.at('Daarom', 1), tV = q.at('vliegen', 1), tB = q.at('dichtbij', 1), tS = q.at('soorten', 1);
    const In = ramp(t, q.at('meeste', 1) - 0.2, 1.2), Ut = ramp(t, q.at('hovenier', 1) - 0.1, 1.2); const nest = In * (1 - Ut);
    const k = lerp(1, 0.09, ramp(t, tV - 0.2, 1.8)) / lerp(1, 0.09, ramp(t, tB + 0.6, 1.4)) * 1; const kk = Math.min(1, k);
    const Kal = ramp(t, tS - 0.2, 0.8);
    // plan (met wijk bij het uitzoomen)
    const planA = 1 - nest; laag(ctx, planA, () => { const cx = PLAN.x + PLAN.w / 2, cy = PLAN.y + PLAN.h / 2; ctx.save(); ctx.translate(900, 480); ctx.scale(kk, kk); ctx.translate(-cx, -cy);
      tu2_wijk(ctx, clamp((1 - kk) * 3, 0, 1)); tu2_plan(ctx, { dak: 1, bomen: 1, gras: 1, wadi: 1, bloem: 1, zand: ramp(t, tH, 0.8), zandRand: q.on('zand', 1, 0.5) * (1 - ramp(t, tV - 0.2, 0.5)), bloei: lerp(0.4, ramp(t, q.at('momenten', 1), 3.3), Kal), t }); ctx.restore();
      const Ci = fase(t, q.at('honderd', 1) - 0.3, tS - 0.1, 0.5); laag(ctx, Ci, () => { const zx = 900 + (PLAN.zand[0] + 60 - cx) * kk, zy = 480 + (PLAN.zand[1] + 46 - cy) * kk; ctx.save(); ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.arc(zx, zy, 373, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); circ(ctx, zx, zy, 8, C.goud);
        metaB(ctx, 'PAAR HONDERD METER', zx + 400, zy + 10, 1, C.goud, 'left', 26); laag(ctx, q.on('bloemen', 1, 0.4), () => { for (let i = 0; i < 9; i++) { const an = i * 0.7, r = 90 + hash(i) * 230; circ(ctx, zx + Math.cos(an) * r, zy + Math.sin(an) * r, 9, ['#F2E27A', '#C98AC0', '#86A8E0'][i % 3]); } }); });
      laag(ctx, Kal, () => { ctx.save(); ctx.globalAlpha *= 0.55; ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ctx.restore(); tu2_bloeikalender(ctx, 820, 560, 760, { u: ramp(t, q.at('momenten', 1), 3.3), rijen: [q.on('momenten', 1, 0.5), q.on('momenten', 1, 0.8), q.on('momenten', 1, 1.1), 0] }); }); });
    // de camera duikt in het zand: grondnest in doorsnede
    laag(ctx, nest, () => { krimp(ctx, 1 - In, [PLAN.zand[0], PLAN.zand[1], PLAN.zand[2], PLAN.zand[2] * 0.5625], () => { bg(ctx, 'schema'); tu2_grondnest(ctx, 960, 340, 1.2, { bij: clamp((t - tG + 0.6) / 3.6, 0, 1), t });
      const ub = clamp((t - tG + 0.6) / 3.6, 0, 1), f0 = ease(clamp(ub / 0.3, 0, 1)); metaB(ctx, 'WILDE BIJ', 960 + lerp(120, 6, f0) * 1.2 + 90, 340 + lerp(-140, -2, f0) * 1.2 - 70, 1 - ramp(t, tG + 1.4, 0.4), C.goud, 'left', 26);
      metaB(ctx, 'DE MEESTE WILDE BIJEN: IN DE GROND', 960, 270, q.on('kale', 1, 0.5), C.goud, 'center', 28); }); });
    const J = fase(t, tH, tV - 0.3, 0.4); jeroen(ctx, 1745, t, { a: J, kijk: -1, pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Hovenier Jeroen', 'HOVENIER', 1745, 370, J, 'center');
    antwoord(ctx, 'antwoord a: de meeste nestelen in de grond', 1 - ramp(t, 6, 0.6));
    hMeter(ctx, hPos(t, [[0, 3], [tG - 0.6, 4, 1.4], [tH - 0.2, 3, 1.2], [tV - 0.2, 0, 1.8], [tB + 0.6, 3, 1.4]])); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('Inheems', 1, 0.4), U = q.on('Uitheems', 1, 0.4);
    laag(ctx, I, () => { kaart(ctx, 140, 200, 700, 620, 1, C.groen); tu2_bloem(ctx, 380, 780, 'klok', 1.3); tu2_bloem(ctx, 600, 780, 'scherm', 1.2); metaText(ctx, 'INHEEMS', 180, 260, C.groen, 'left', 30); metaText(ctx, 'HIER VAN NATURE', 180, 300, C.text, 'left', 26); });
    laag(ctx, U, () => { kaart(ctx, 940, 200, 700, 620, 1, C.oker); tu2_bloem(ctx, 1160, 780, 'pluim', 1.2); metaText(ctx, 'UITHEEMS', 980, 260, C.oker, 'left', 30); metaText(ctx, 'DOOR DE MENS MEEGENOMEN', 980, 300, C.text, 'left', 26);
      ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.oker; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1520, 690); ctx.quadraticCurveTo(1500, 470, 1300, 470); ctx.stroke(); ctx.restore(); pijl(ctx, 1320, 471, 1280, 474, C.oker, 1, 4, 18);
      circ(ctx, 1520, 700, 34, '#2E5C6E', C.oker, 3); metaText(ctx, 'ANDER GEBIED', 1520, 770, C.oker, 'center', 22); });
    hMeter(ctx, 3); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tP = q.at('proef', 1), tM = q.at('Maar', 2), tMg = q.at('mengsel', 1);
    const A = 1 - ramp(t, tP - 0.3, 0.5), Bp = fase(t, tP - 0.1, tM - 0.1, 0.5), K = ramp(t, tM - 0.2, 0.6);
    // bloemen: de bij landt alleen op de klokjes
    laag(ctx, A, () => { const X = [480, 820, 1160, 1500], S = ['klok', 'ster', 'scherm', 'klok']; X.forEach((x, i) => tu2_bloem(ctx, x, 800, S[i], 1.2, 1, { rand: i % 3 === 0 ? q.on('groepje', 1, 0.5) : 0 }));
      const u = clamp((t - q.at('Sommige', 1)) / 3.2, 0, 1), bx = u < 0.5 ? lerp(300, 480, ease(u * 2)) : lerp(480, 1500, ease((u - 0.5) * 2)), by = u < 0.5 ? lerp(380, 512, ease(u * 2)) : 512 - Math.sin((u - 0.5) * 2 * Math.PI) * 260;
      tu2_wildeBij(ctx, bx, by, 0.8, { houding: (u > 0.4 && u < 0.5) || u > 0.97 ? 'staan' : 'vliegen', t, kijk: 1 }); metaB(ctx, 'WILDE BIJ', bx, by - 80, q.on('Sommige', 1, 0.4) * (1 - q.on('groepje', 1, 0.4)), C.goud, 'center', 24);
    });
    // proef in Engeland: staafjes
    laag(ctx, Bp, () => { assen(ctx, 600, 260, 760, 470, '', 'BEZOEKEN VAN BESTUIVERS'); const b = (x, h, kl, l1, l2, a2) => laag(ctx, a2, () => { roundRect(ctx, x, 730 - h, 220, h, 8); shape(ctx, rgba(kl, 0.8), kl, 2); metaText(ctx, l1, x + 110, 780, kl, 'center', 24); metaText(ctx, l2, x + 110, 812, C.text2, 'center', 22); });
      b(720, 380 * q.on('Engeland', 1, 1.0), C.groen, 'INHEEMS', '', 1); b(1040, 230 * q.on('andere', 1, 0.8), C.oker, 'ANDERE KANT', 'VAN DE WERELD', q.on('andere', 1, 0.4));
      metaText(ctx, 'PROEF IN ENGELAND · INHEEMS TEGEN ZUIDELIJK HALFROND', 960, 180, C.goud, 'center', 24); metaText(ctx, 'SCHEMATISCH', 1360, 300, C.text2, 'right', 22); });
    // bloeikalender: een paar uitheemse late bloeiers maken het seizoen langer; hovenier en stagiair bij het tablet
    laag(ctx, K, () => { tu2_bloeikalender(ctx, 420, 360, 700, { u: 1, rijen: [1, 1, 1, q.on('uitheemse', 1, 0.6)] }); laag(ctx, q.on('langer', 1, 0.5), () => { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, 420 + 700 * 6 / 8 - 6, 360 + 3 * 52 + 2, 700 * 2 / 8 + 12, 46, 23); ctx.stroke(); ctx.restore(); }); });
    const P = ramp(t, tMg - 1.0, 0.4); jeroen(ctx, 1420, t, { a: P, kijk: 1, pose: 'vasthouden', hold: houdTablet, uit: 'blij' }); lotte(ctx, 1700, t, { a: P, kijk: -1, uit: 'blij' });
    naamBij(ctx, 'Hovenier Jeroen', 'HOVENIER', 1420, 370, P, 'center'); naamBij(ctx, 'Lotte', 'STAGIAIR', 1700, 370, P, 'center');
    antwoord(ctx, 'antwoord c: vooral inheems, een paar uitheemse', 1 - ramp(t, 6, 0.6));
    hMeter(ctx, 3); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const Uw = ramp(t, 0.1, 0.4), In = ramp(t, 0.55, 0.4);
    laag(ctx, 1 - Uw, () => tu2_plan(ctx, { dak: 1, bomen: 1, gras: 1, wadi: 1, bloem: 1, zand: 1, bloei: 0.6, t }));
    laag(ctx, In, () => { pleinBeeld(ctx, true);
      // minder steen: de asfaltstrook is gras en lage beplanting geworden
      ctx.save(); ctx.beginPath(); ASFALT.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = rgba('#34552F', 0.92); ctx.fill(); ctx.clip();
      for (let i = 0; i < 140; i++) { const v = hash(i * 7.1), y = lerp(665, 1075, v), xl = lerp(1060, 1110, (y - 657) / 423), xr = lerp(1328, 1800, (y - 657) / 423); circ(ctx, lerp(xl, xr, hash(i * 3.3)), y, 3 + 5 * v, ['#4E7A48', '#5E9A55', '#7A9A52', '#C98AC0', '#E2CC58'][i % 5]); } ctx.restore();
      // een paar jaar later: bomen in brede plantvakken, nog maar een zwakke gloed
      ctx.save(); ctx.fillStyle = rgba('#3E6A3A', 0.85); ctx.beginPath(); ctx.ellipse(1000, 742, 230, 34, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(1560, 700, 160, 24, 0, 0, 6.283); ctx.fill(); ctx.restore();
      tu2_boom(ctx, 1000, 742, 0.36, { groei: 1, schaduw: 0.6, t }); tu2_boom(ctx, 1560, 700, 0.26, { groei: 1, schaduw: 0.6, t: t + 2 });
      const Lh = In >= 0.999 ? ramp(t, 0.95, 0.2) : 0; gloed(ctx, 980, 860, 100, 0.35 * Lh); lotteHurk(ctx, 860, t, { uit: 'blij', a: Lh });
      tu2_klok(ctx, 1420, 150, 48, 23, 0, {}); metaB(ctx, '23:00 · EEN PAAR JAAR LATER', 1420, 250, 1, C.goud, 'center', 22); });
    const K = [['STEEN: HEET OVERDAG, WARM \'S NACHTS', C.oker, 'Minder'], ['BOOM: SCHADUW + VERDAMPING', C.groen, 'Meer'], ['REGEN: IN DE GROND, WADI, GROEN DAK', C.teal, 'Houd'], ['BIJEN: BLOEI MAART–OKTOBER, KALE GROND', C.goud, 'bloeien']];
    K.forEach(([s2, kl, cue], i) => { const a = q.on(cue, 1, 0.4); if (a <= 0.01) return; laag(ctx, a, () => { roundRect(ctx, 110, 150 + i * 92, 900, 72, 14); shape(ctx, rgba('#0D1420', 0.88), kl, 2); metaText(ctx, s2, 140, 197 + i * 92, kl, 'left', 26); }); });
    hMeter(ctx, 3); },

  s23(ctx, t, q) { bg(ctx, 'schema'); decorBeeld(ctx, 'schoolpleinAvond', 0.35); ctx.fillStyle = rgba(C.bgSchema, 0.5); ctx.fillRect(0, 0, W, H);
    roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 28);
    const rij = [['mbo', 'Hovenier en groene ruimte', 'NIVEAU 2–4', 'mbo'], ['hbo', 'Tuin- en Landschapsinrichting', 'VELP', 'Velp'], ['wo', 'Landschapsarchitectuur en ruimtelijke planning', 'WAGENINGEN', 'Wageningen'], ['werk', 'hovenier, landschapsarchitect, beleidsadviseur', '', 'landschapsarchitect']];
    rij.forEach(([n, o, m, cue], i) => { const a = cue === 'mbo' ? ramp(t, 0.15, 0.4) : q.on(cue, cue === 'landschapsarchitect' ? 2 : 1, 0.4); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 150;
      roundRect(ctx, 100, y, 1260, 130, 18); shape(ctx, rgba('#0D1420', 0.9), i < 3 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 80, fTitel(44), i < 3 ? C.groen : C.goud); text(ctx, o, 300, y + (m ? 62 : 78), fTekst(38, 700), C.text); if (m) metaText(ctx, m, 300, y + 106, C.grain, 'left', 26); ctx.restore(); });
    jeroen(ctx, 1540, t, { kijk: 1, uit: 'blij' }); lotte(ctx, 1760, t, { kijk: -1, uit: 'blij' }); }
});
