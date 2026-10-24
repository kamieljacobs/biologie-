// Wat word jij? · Landbouw 1 · Meer oogst — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Yasmin, Opa Henk).
// Decors (kas, regelruimte, kassengebied 's nachts) alleen waar de scène echt op die plek speelt; uitleg op gewoon navy.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }

Object.assign(SCENES, {
  title(ctx, t) { tomatenplant(ctx, 1450, 860, 560, t, { trossen: [0.95, 0.6, 0.2] }); for (let i = 0; i < 5; i++) { const ph = (t * 0.2 + i / 5) % 1; co2(ctx, 1200 + i * 90, 820 - ph * 520, 0.8, Math.sin(ph * 3.14) * 0.8); } },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'kas', 0.6);
    co2Buis(ctx, 360, 1560, 800, q.on('koolstofdioxide', 1), t, q.on('buisje', 1));
    persoon(ctx, 'yasmin', 620, 860, 420, { t, kijk: 1, uit: q.on('buisje', 1) > 0.5 ? 'verbaasd' : 'blij', pose: q.on('buisje', 1) > 0.5 ? 'wijs' : 'staan', a: q.on('Yasmin', 1, 0.3) });
    naamBij(ctx, 'Yasmin', 'snuffelstage in de kas', 700, 400, q.on('Yasmin', 1));
    ppmMeter(ctx, 1400, 360, 420, 'buiten', C.teal, q.on('buiten', 1)); ppmMeter(ctx, 1730, 360, lerp(420, 840, q.on('twee', 1, 1.5)), 'in de kas', C.grain, q.on('Binnen', 1));
    vraagteken(ctx, 960, 560, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: sneller suiker maken', 1 - q.on('ochtend', 1));
    const P2 = q.on('ochtend', 1, 0.8);
    if (P2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P2; const L = q.on('fotosynthese', 1);
      blad(ctx, 900, 520, 1.3, q.on('lucht', 1)); zon(ctx, 400, 300, 50, L, t); pijl(ctx, 470, 360, 700, 470, C.goud, L, 5); co2(ctx, 420, 560, 1, q.on('koolstofdioxide', 1)); pijl(ctx, 480, 560, 680, 540, C.grain, q.on('koolstofdioxide', 1), 5);
      h2o(ctx, 420, 720, 1, q.on('water', 1)); pijl(ctx, 480, 710, 690, 600, C.teal, q.on('water', 1), 5);
      const S = q.on('suiker', 1); pijl(ctx, 1170, 520, 1380, 520, C.goud, S, 5); suiker(ctx, 1450, 520, 1.6, S); naamBij(ctx, 'suiker', 'bouwstof voor de plant', 1500, 600, S);
      tag(ctx, 'een plant bouwt zichzelf op uit lucht', 960, 250, C.teal, q.on('lucht', 1), 'center', 30); ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; const v = lerp(420, 230, q.on('minder', 1, 3));
      ppmMeter(ctx, 600, 420, 420, 'buiten', C.teal, 1); ppmMeter(ctx, 1000, 420, v, 'dichte kas, zonnige ochtend', C.grain, 1);
      zon(ctx, 1420, 300, 60, 1, t); tag(ctx, 'te weinig CO₂ remt de groei', 1000, 640, C.koraal, q.on('remt', 1), 'center', 32);
      regel(ctx, 'beperkende factor', 960, 780, q.on('beperkende', 1), C.goud, 52, 'center', 800); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const hoog = [0.85, 0.5, 0.92, 0.75], lab = ['licht', 'CO₂', 'temperatuur', 'water'];
    ton(ctx, 660, 780, 520, 520, hoog, lab, q.on('ton', 1), q.on('water', 1, 1.5), t, q.on('laagste', 1) > 0.5 ? 1 : -1);
    tag(ctx, 'laagste duig', 1300, 420, C.koraal, q.on('laagste', 1), 'left', 30); regel(ctx, 'wat het meest tekortschiet,', 1300, 560, q.on('tekortschiet', 1), C.text, 36, 'left', 700); regel(ctx, 'bepaalt hoe snel de plant groeit', 1300, 610, q.on('bepaalt', 1), C.goud, 36, 'left', 700); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const tS = q.at('Soms', 1), tH = q.at('Hoe', 1);
    const u = t < tS ? ((t * 0.35) % 1) : t < tH ? clamp((t - q.at('zuurstofmolecuul', 1)) / 1.2, 0, 1) : ((t * 0.7) % 1);
    const pakt = t < tS - 0.3 || t >= tH ? 'co2' : 'o2';
    const TN = 1 - q.on('enzym', 1, 0.6); if (TN > 0.01) ton(ctx, 700, 760, 480, 460, [0.85, 0.5, 0.92, 0.75], ['licht', 'CO₂', 'temperatuur', 'water'], TN, 1, t, 1);
    rubisco(ctx, 760, 560, 1.4, q.on('enzym', 1), q.on('vastlegt', 1) > 0.5 ? pakt : null, u, t);
    naamBij(ctx, 'rubisco', 'enzym dat CO₂ vastlegt', 1020, 360, q.on('rubisco', 1));
    chip(ctx, 'meest voorkomende eiwit op aarde', 1380, 470, C.teal, q.on('eiwit', 1) * (1 - q.on('Soms', 1)), 28); klokje(ctx, 1260, 600, 44, (t * 0.05) % 1, q.on('traag', 1) * (1 - q.on('Soms', 1))); regel(ctx, 'traag', 1330, 614, q.on('traag', 1) * (1 - q.on('Soms', 1)), C.text, 34, 'left', 700);
    const V = fase(t, q.at('vergist', 1), tH);
    tag(ctx, 'pakt soms zuurstof', 1400, 470, C.koraal, V, 'center', 30); tag(ctx, 'energie verloren', 1400, 590, C.koraal, q.on('verloren', 1) * V, 'center', 28); tag(ctx, 'CO₂ komt vrij', 1400, 690, C.grain, q.on('vrij', 1) * V, 'center', 28);
    const M = q.on('Hoe', 1); for (let i = 0; i < 10; i++) co2(ctx, 400 + (i % 5) * 110 + wander(i, t, 20, 0.5).x, 220 + Math.floor(i / 5) * 90 + wander(i, t, 20, 0.5).y, 0.7, M * 0.8);
    chip(ctx, 'meer werk, minder vergissingen', 1400, 560, C.groen, q.on('vergissingen', 1), 30); },

  s07(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = rgba('#0D1420', 0.6 * q.on('donkere', 1)); ctx.fillRect(0, 0, W, CAPTION_Y);
    kasDak(ctx, 560, 240, 800, 0, 0, 1); for (let i = 0; i < 4; i++) tomatenplant(ctx, 660 + i * 200, 800, 300, t, { blad: 4, trossen: [0.2] });
    co2Buis(ctx, 600, 1320, 810, q.on('blaast', 1), t, 1); chip(ctx, 'december · weinig licht', 960, 200, C.teal, q.on('december', 1), 30); chip(ctx, '+ extra CO₂', 1500, 640, C.grain, q.on('extra', 1), 30); vraagteken(ctx, 1560, 470, q.on('denk', 1), 110); },

  // ---------- H2 ----------
  s09(ctx, t, q) { const R = q.on('Henk', 1, 0.8); decor(ctx, 'regelruimte', 0.6 * R);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; antwoord(ctx, 'antwoord b: licht is de beperkende factor');
      ton(ctx, 700, 760, 480, 460, [0.35, 0.9, 0.85, 0.8], ['licht', 'CO₂', 'temperatuur', 'water'], 1, 1, t, 0); tag(ctx, 'te weinig energie uit licht', 1460, 520, C.goud, q.on('energie', 1), 'center', 28); ctx.restore(); }
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R;
      persoon(ctx, 'henk', 560, 870, 400, { t, kijk: 1, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => thermometer(c, hx, hy - 10, 120, 0.6, 1) });
      naamBij(ctx, 'Opa Henk', 'was vroeger tuinder', 640, 420, q.on('Henk', 1)); chip(ctx, 'thermometer en gevoel', 560, 330, C.oker, q.on('gevoel', 1) * (1 - q.on('klimaatcomputer', 1)), 26);
      const k = q.on('klimaatcomputer', 1); const hl = t > q.at('koolstofdioxide', 2) ? 3 : t > q.at('luchtvochtigheid', 1) ? 2 : t > q.at('temperatuur', 1) ? 1 : t > q.at('licht', 3) ? 0 : -1;
      schuifjes(ctx, 1040, 300, [0.7, 0.55, 0.65, 0.6], ['licht', 'temp.', 'vocht', 'CO₂'], k, hl); naamBij(ctx, 'klimaatcomputer', 'meet elke paar minuten', 1040, 260, k); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const t2 = q.at('vochtig', 1), t3 = q.at('warm', 1);
    const P1 = 1 - ramp(t, t2 - 0.4, 0.5), P2 = fase(t, t2 - 0.1, t3), P3 = ramp(t, t3, 0.5);
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; const open = 1 - q.on('sluit', 1, 1.2);
      huidmondje(ctx, 960, 480, 1.6, open, q.on('Koolstofdioxide', 1), t, 1); naamBij(ctx, 'huidmondje', 'opening in het blad', 1400, 220, q.on('huidmondjes', 1));
      tag(ctx, 'CO₂ erin', 400, 300, C.grain, q.on('binnen', 1), 'center', 28); tag(ctx, 'waterdamp eruit', 1560, 720, C.teal, q.on('verdampt', 1), 'center', 28);
      tag(ctx, 'droge lucht: huidmondje dicht', 960, 850, C.koraal, q.on('droog', 1), 'center', 30); ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; ctx.save(); ctx.translate(960, 470); ctx.scale(2.2, 2.2); schimmel(ctx, 0, 0, 1, t); ctx.restore(); naamBij(ctx, 'grauwe schimmel', 'bij te vochtige lucht', 1080, 330, 1); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; const op = q.on('ramen', 1, 1); kasDak(ctx, 460, 300, 1000, op, 0, 1); thermometer(ctx, 300, 700, 260, 0.85, 1);
      for (let i = 0; i < 6; i++) { const ph = (t * 0.4 + i / 6) % 1; co2(ctx, 990 + i * 18 + ph * 120, 520 - ph * 380, 0.7, q.on('ontsnapt', 1) * Math.sin(ph * 3.14)); }
      chip(ctx, 'CO₂ ontsnapt', 1500, 260, C.grain, q.on('ontsnapt', 1), 28); vraagteken(ctx, 1560, 620, q.on('doet', 1), 110); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('veel', 1, 0.8);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; antwoord(ctx, 'antwoord c: minder CO₂ doseren'); kasDak(ctx, 460, 300, 1000, 1, 0, 1);
      for (let i = 0; i < 6; i++) { const ph = (t * 0.4 + i / 6) % 1; co2(ctx, 990 + i * 18 + ph * 120, 520 - ph * 380, 0.7, 0.5 * Math.sin(ph * 3.14)); } chip(ctx, 'dosering lager', 960, 760, C.grain, q.on('lager', 1), 30); ctx.restore(); }
    if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; ppmMeter(ctx, 330, 380, 800, 'tomatenkas: 700–900', C.grain, 1); ppmMeter(ctx, 330, 650, 420, 'buiten: ruim 400', C.teal, q.on('Buiten', 1));
      grafiekCO2(ctx, 720, 260, 860, 460, 1, 1, 0, q.on('duizend', 1) > 0.5 ? 0.72 : -1); chip(ctx, 'boven ± 1000: bijna verzadigd', 1150, 230, C.goud, q.on('verzadigd', 1), 26);
      tag(ctx, 'vuistregel: 1 % meer licht ≈ bijna 1 % meer oogst', 960, 840, C.goud, q.on('vuistregel', 1), 'center', 30); ctx.restore(); } },

  s13(ctx, t, q) { decor(ctx, 'kas', 0.6);
    tomatenplant(ctx, 1160, 860, 560, t, { trossen: [0.9, 0.5, -1] }); persoon(ctx, 'yasmin', 600, 860, 420, { t, kijk: 1, uit: 'neutraal', pose: 'wijs' });
    tag(ctx, 'kopgroei', 1200, 320, C.groen, q.on('kop', 1), 'left', 28); tag(ctx, 'stengeldikte', 1140, 625, C.oker, q.on('stengel', 1), 'right', 28); tag(ctx, 'bloeiende trossen', 1060, 470, C.goud, q.on('trossen', 1), 'right', 28);
    tag(ctx, 'sturen op de plant', 960, 200, C.teal, q.on('plant', 1), 'center', 32); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('bron', 1), P = q.on('put', 1);
    bronPut(ctx, 900, 840, 640, t, 1, { stroom: q.on('zeefvaten', 1), trossen: [0.25, 0.15, 0.05], hl: { blad: B > 0.5 && P < 0.5, vrucht: P > 0.5 && t < q.at('zeefvaten', 1) } });
    tag(ctx, 'bron: maakt suiker', 1340, 300, C.groen, B, 'left', 30); tag(ctx, 'put: verbruikt suiker', 1340, 520, '#D8573F', P, 'left', 30); naamBij(ctx, 'zeefvaten', 'van bron naar put', 940, 220, q.on('zeefvaten', 1));
    chip(ctx, 'putten concurreren', 520, 400, C.koraal, q.on('concurreren', 1), 28); chip(ctx, 'tros met jonge vruchten trekt sterk', 520, 500, '#D8573F', q.on('trekt', 1), 26); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const kant = q.on('vegetatief', 1) > 0.5 ? -lerp(0, 1, q.on('vegetatief', 1, 1)) : lerp(0, 1, q.on('generatief', 1, 1));
    const K = q.on('knoppen', 1, 0.8); weegschaal(ctx, 960, 380, kant * (1 - K), 1 - K);
    tag(ctx, 'generatief: richting vruchten', 960, 760, '#D8573F', q.on('generatief', 1) * (1 - q.on('vegetatief', 1)) * (1 - K), 'center', 30); tag(ctx, 'vegetatief: blad en stengel', 960, 760, C.groen, q.on('vegetatief', 1) * (1 - K), 'center', 30);
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; const bl = Math.round(lerp(6, 4, q.on('onderaan', 1, 1)));
      tomatenplant(ctx, 520, 820, 520, t, { blad: bl, trossen: [0.4, 0.2], vrucht: Math.round(lerp(5, 4, q.on('tros', 1))) }); tag(ctx, 'oude bladeren weg', 760, 420, C.groen, q.on('onderaan', 1), 'left', 26); tag(ctx, 'vruchten per tros kiezen', 760, 500, '#D8573F', q.on('tros', 1), 'left', 26);
      const T = q.on('temperatuur', 1); thermometer(ctx, 1160, 640, 260, 0.75, T); zon(ctx, 1160, 260, 30, T * (1 - q.on('nachten', 1)), t); regel(ctx, 'dag', 1240, 470, T, C.goud, 30, 'left', 700); thermometer(ctx, 1420, 640, 260, 0.45, q.on('nachten', 1), C.teal); regel(ctx, 'nacht', 1460, 470, q.on('nachten', 1), C.teal, 30, 'left', 700);
      vraagteken(ctx, 1700, 460, q.on('doet', 1), 110); ctx.restore(); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: bladeren weg, meer vruchten', 1 - q.on('warmer', 1)); const E = q.on('ethyleen', 1, 0.8);
    const W1 = 1 - q.on('warmer', 1, 0.6);
    if (W1 > 0.01) { ctx.save(); ctx.globalAlpha *= W1; const g = q.on('grens', 1); const bl = Math.round(lerp(5, 2, q.on('weg', 1, 1.5) * g));
      bronPut(ctx, 760, 840, 560, t, 1, { blad: bl, stroom: 1 - 0.6 * q.on('minder', 2), trossen: [0.4, 0.2] }); chip(ctx, 'minder concurrentie', 1300, 320, C.groen, q.on('concurrentie', 1) * (1 - g), 28);
      tag(ctx, 'te veel weg: te weinig licht gevangen', 1300, 460, C.koraal, q.on('licht', 1), 'center', 28); ctx.restore(); }
    const Wm = fase(t, q.at('warmer', 1), q.at('ethyleen', 1) - 0.3); if (Wm > 0.01) { ctx.save(); ctx.globalAlpha *= Wm; thermometer(ctx, 560, 700, 300, 0.85, 1); tomatenplant(ctx, 1100, 840, 520, t, { trossen: [0.95, 0.85], vrucht: 6 }); chip(ctx, 'sneller rijp · kleiner · minder zoet', 1100, 230, C.koraal, q.on('kleiner', 1), 28); ctx.restore(); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; const r = clamp((t - q.at('ethyleen', 1)) / 3, 0, 1); tomatenplant(ctx, 960, 860, 620, t, { trossen: [0.75 + 0.25 * r, 0.1 + 0.6 * r * q.on('rest', 1, 2)], vrucht: 5 }); ethyleen(ctx, 890, 720, 1030, 600, 1, t); naamBij(ctx, 'ethyleen', 'gas dat het rijpen aanzet', 1180, 460, 1); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); opbrengst(ctx, 640, 760, q.on('vijftig', 1), q.on('vijftig', 1, 1.5), q.on('negen', 1, 1.2)); zon(ctx, 1380, 380, 60, q.on('zonnige', 1), t); vraagteken(ctx, 1560, 640, q.on('denk', 1), 110); },

  // ---------- H4 ----------
  s20(ctx, t, q) { const N = q.on('Nachts', 1, 0.8); decor(ctx, 'nacht', 0.6, 240, '#3E4A48');
    antwoord(ctx, 'antwoord c: alles nauwkeurig geregeld', 1 - q.on('prijs', 1));
    chip(ctx, 'verwarmd met aardgas', 560, 300, C.koraal, q.on('aardgas', 1), 28); chip(ctx, 'lampen gebruiken veel stroom', 1360, 300, C.goud, q.on('stroom', 1), 28);
    const S = q.on('schermdoeken', 1, 1.2); if (N > 0.01) { const g = ctx.createLinearGradient(0, 300, 0, 700); g.addColorStop(0, rgba('#E0904A', 0)); g.addColorStop(1, rgba('#E0904A', 0.35 * N * (1 - 0.8 * S))); ctx.fillStyle = g; ctx.fillRect(0, 300, W, 400); }
    tag(ctx, 'schermdoeken dicht: licht blijft binnen', 960, 200, C.teal, S, 'center', 30); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('gasmotor', 1), tL = q.at('leiding', 1), tA = q.at('aardlagen', 1), tE = q.at('ledlampen', 1);
    gasmotor(ctx, 640, 480, fase(t, tG - 0.3, tL - 0.2), clamp((t - tG) / 3, 0, 1), t); naamBij(ctx, 'gasmotor', 'stroom, warmte én CO₂', 520, 300, fase(t, tG - 0.3, tL - 0.2));
    const HL = fase(t, tL - 0.2, q.at('Weer', 1) - 0.2); haven(ctx, 560, 600, HL, clamp((t - tL) / 2, 0, 1), t); regel(ctx, 'haven van Rotterdam', 560, 680, HL, C.text2, 28, 'center', 700); kasDak(ctx, 1260, 440, 360, 0, 0, HL); chip(ctx, 'CO₂ die anders de lucht in gaat', 1100, 300, C.grain, q.on('uitstoten', 1) * HL, 26);
    const tW = q.at('Weer', 1); const AL = fase(t, tW - 0.2, tE - 0.3); boorput(ctx, 960, 420, AL, clamp((t - tW) / 2.5, 0, 1), t); naamBij(ctx, 'aardwarmte', 'warm water uit diepe lagen', 1200, 360, AL);
    const LD = ramp(t, tE - 0.3, 0.5); lamp(ctx, 620, 380, 'son', LD, t); regel(ctx, 'oude lamp: veel warmte', 620, 300, LD, C.koraal, 28, 'center', 700); lamp(ctx, 1300, 380, 'led', LD, t); regel(ctx, 'led: meer licht per kilowattuur', 1300, 300, LD, C.goud, 28, 'center', 700);
    thermometer(ctx, 1300, 740, 200, 0.35, q.on('winter', 1), C.teal); chip(ctx, 'in de winter extra verwarmen', 960, 820, C.koraal, q.on('verwarmd', 1), 28); regel(ctx, 'alles hangt samen', 620, 640, q.on('samen', 1), C.text, 34, 'center', 700); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('insecten', 1, 0.8);
    if (I < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - I; bassin(ctx, 520, 600, q.on('Regenwater', 1), t); naamBij(ctx, 'regenwaterbassin', 'water opnieuw gebruikt', 400, 380, q.on('opgevangen', 1));
      const lt = (v, x, lab, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bh = v * 7 * clamp(a * 1.5, 0, 1); roundRect(ctx, x, 760 - bh, 160, bh, 10); shape(ctx, rgba(col, 0.55), col, 2); text(ctx, v + ' l', x + 80, 760 - bh - 18, fTekst(40, 800), C.text, 'center'); text(ctx, lab, x + 80, 804, fTekst(24, 700), col, 'center'); ctx.restore(); };
      lt(15, 1100, 'moderne kas', C.teal, q.on('vijftien', 1)); lt(60, 1340, 'akker Zuid-Europa', C.oker, q.on('zestig', 1)); metaA(ctx, 'water per kilo tomaten', 1100, 230, q.on('vijftien', 1), C.text2, 'left', 20); ctx.restore(); }
    if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; const tS = q.at('Sluipwespen', 1); witteVlieg(ctx, 620, 480, 2.2, 1, t); sluipwesp(ctx, 620 - 200 * (1 - clamp((t - tS) / 2, 0, 1)), 360, 2, q.on('Sluipwespen', 1), t);
      naamBij(ctx, 'sluipwesp', 'legt eitjes in witte vliegen', 360, 220, q.on('Sluipwespen', 1)); naamBij(ctx, 'witte vlieg', 'plaag', 700, 600, q.on('witte', 1));
      bloem(ctx, 1320, 520, 2, q.on('hommels', 1)); hommel(ctx, 1320 + Math.sin(t * 1.5) * 60, 400 + Math.cos(t * 1.2) * 20, 1.6, q.on('hommels', 1), t); naamBij(ctx, 'hommel', 'bestuift de bloemen', 1460, 300, q.on('bestuiven', 1));
      tag(ctx, 'gif doodt ook de hommels', 1320, 740, C.koraal, q.on('Gif', 1), 'center', 28); chip(ctx, 'veel minder spuiten', 960, 840, C.groen, q.on('gespoten', 1), 30); ctx.restore(); } },

  s23(ctx, t, q) { bg(ctx, 'schema'); tomatenplant(ctx, 960, 760, 420, t, { trossen: [0.95, 0.6] }); vraagteken(ctx, 960, 240, q.on('duurzaam', 1) * (1 - q.on('afwegingen', 1)), 100);
    chip(ctx, 'per vierkante meter', 520, 360, C.groen, q.on('vierkante', 1), 30); chip(ctx, 'per kilo', 1400, 360, C.oker, q.on('kilo', 1), 30); chip(ctx, 'water', 520, 560, C.teal, q.on('water', 1), 30); chip(ctx, 'energie', 1400, 560, C.koraal, q.on('energie', 1), 30);
    regel(ctx, 'afwegen: dat doe je in dit vak', 960, 230, q.on('afwegingen', 1), C.goud, 44, 'center', 800); },

  // ---------- Recap ----------
  s24(ctx, t, q) { decor(ctx, 'kas', 0.6); co2Buis(ctx, 360, 1560, 800, 1, t, 1);
    persoon(ctx, 'yasmin', 560, 860, 420, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'henk', 820, 860, 400, { t, kijk: -1, uit: 'lacht', a: q.on('rubisco', 1, 0.3) });
    const ks = [['licht', C.goud], ['warmte', C.koraal], ['water', C.teal], ['CO₂', C.grain]]; ks.forEach(([s2, col], i) => kaartje(ctx, 1080 + (i % 2) * 330, 260 + Math.floor(i / 2) * 120, 300, s2, col, q.on(i === 3 ? 'koolstofdioxide' : s2, 1)));
    tag(ctx, 'één systeem: de kas en de plant samen', 1240, 600, C.goud, q.on('systeem', 1), 'center', 34); },

  s25(ctx, t, q) { bg(ctx, 'schema'); const kol = [['mbo', 'zelf telen in de kas', C.groen, 'mbo'], ['hbo', 'een kas en een bedrijf leiden', C.teal, 'hbo'], ['wo · Wageningen', 'onderzoek: slimmere rubisco, kas zonder aardgas', C.goud, 'universiteit']];
    kol.forEach(([k, s2, col, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; const x = 200 + i * 540; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 300, 480, 320, 20); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, k, x + 240, 380, fTekst(44, 800), col, 'center');
      ctx.font = fTekst(30, 600); const wd = s2.split(' '); let l = '', y = 460; for (const x2 of wd) { if (ctx.measureText(l + ' ' + x2).width > 400) { text(ctx, l, x + 240, y, fTekst(30, 600), C.text, 'center'); l = x2; y += 44; } else l = l ? l + ' ' + x2 : x2; } text(ctx, l, x + 240, y, fTekst(30, 600), C.text, 'center'); ctx.restore(); }); }
});
