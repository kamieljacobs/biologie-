// Wat word jij? · Biomedische wetenschappen · Van lab tot patiënt — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk als deelnemer, Dr. Kim als onderzoeker, Noor).
// Rode draad: Opa Henk doet mee aan fase 3 van een nieuw medicijn tegen hartfalen.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// fase: in bij woord w1 (null = vanaf het begin), uit bij woord w2 (null = blijft)
function fase(q, w1, n1, w2, n2) { return (w1 ? q.on(w1, n1, 0.6) : 1) * (w2 ? 1 - q.on(w2, n2, 0.6) : 1); }
function pers(ctx, id, x, h, o) { persoon(ctx, id, x, 880, h, o); }
function tafelBlad(ctx, x, w, a = 1) { zacht(ctx, a, () => { roundRect(ctx, x, 700, w, 26, 6); shape(ctx, '#6A5440', '#8A7058', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 30, 726, 20, 154); ctx.fillRect(x + w - 50, 726, 20, 154); }); }

Object.assign(SCENES, {
  title(ctx, t) { eiwitSlot(ctx, 1380, 520, 1.1, 1, 0.55 + 0.45 * Math.sin(t * 0.7), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    tafelBlad(ctx, 560, 640);
    pers(ctx, 'kim', 430, 470, { t, pose: q.on('vraagt', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1, uit: 'blij' });
    const rH = persoon(ctx, 'henk', 1300, 880, 450, { t, kijk: -1, uit: q.on('Waarom', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    pers(ctx, 'noor', 1540, 410, { t, kijk: -1, uit: 'neutraal' });
    naamBij(ctx, 'Opa Henk', 'hartfalen', 1300, 400, 1, 'center');
    naamBij(ctx, 'Dr. Kim', 'arts en onderzoeker', 220, 300, q.on('Kim', 1));
    rompKijkje(ctx, rH, q.on('hartfalen', 1) * (1 - q.on('onderzoek', 1)), { hart: 1 }, t);
    zacht(ctx, q.on('onderzoek', 1), () => { ctx.save(); ctx.translate(880, 640); ctx.rotate(-0.05); roundRect(ctx, -120, -70, 240, 140, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'onderzoek', 0, -24, fTekst(26, 800), '#2A3446', 'center'); text(ctx, 'nieuw medicijn', 0, 8, fTekst(22, 600), '#2A3446', 'center'); text(ctx, 'bij hartfalen', 0, 38, fTekst(22, 600), '#2A3446', 'center'); ctx.restore(); });
    // tijdlijn bovenin
    gebouwtje(ctx, 820, 250, 0.8, 'lab', q.on('lab', 1)); regel(ctx, 'lab', 820, 330, q.on('lab', 1), C.text2, 28, 'center', 700);
    zacht(ctx, q.on('geleden', 1), () => { ctx.setLineDash([14, 12]); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(920, 230); ctx.lineTo(1240, 230); ctx.stroke(); ctx.setLineDash([]); });
    tag(ctx, 'meer dan tien jaar', 1080, 200, C.goud, q.on('tien', 1), 'center', 30);
    gebouwtje(ctx, 1340, 250, 0.8, 'apotheek', q.on('apotheek', 1)); regel(ctx, 'apotheek', 1340, 330, q.on('apotheek', 1), C.text2, 28, 'center', 700);
    vraagteken(ctx, 1480, 280, q.on('lang', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: elke stap moet het tonen', 1 - q.on('lab', 1, 2) * 0 - q.on('Robots', 1));
    const A = fase(q, null, 1, 'tienduizend', 1), B = fase(q, 'tienduizend', 1, 'schaaltje', 1), D = fase(q, 'schaaltje', 1, 'Nederland', 1), F = fase(q, 'Nederland', 1, 'V\'s', 1), G = fase(q, 'V\'s', 1, 'onderzoeker', 2), H = fase(q, 'onderzoeker', 2, null);
    // A: lab, robot, eiwit
    kweekPlaat(ctx, 160, 420, 640, A, q.on('Past', 1), t); robotArm(ctx, 480, 300, 0.9, A, t); naamBij(ctx, 'cellen in putjes', '', 170, 400, A * q.on('putjes', 1));
    eiwitSlot(ctx, 1370, 520, 0.95, A * q.on('eiwit', 1), clamp((t - q.at('eiwit', 1)) / 2.5, 0, 1), t); naamBij(ctx, 'eiwit bij de ziekte', '', 1370, 780, A * q.on('eiwit', 1), 'center'); naamBij(ctx, 'stof', '', 1660, 460, A * q.on('eiwit', 1) * (1 - clamp((t - q.at('eiwit', 1)) / 2.5, 0, 1)), 'center');
    // B: trechter
    trechter(ctx, 960, 300, B, clamp((t - q.at('haalt', 1)) / 2, 0, 1), t); tag(ctx, '10.000 stoffen', 520, 260, C.text2, B, 'center', 30); tag(ctx, '1 of 2 bij de apotheek', 1380, 760, C.goud, B * q.on('twee', 1), 'center', 30);
    // D: schaaltje tegenover lichaam, dan dieren
    const D2 = q.on('dieren', 1);
    petri(ctx, 420, 520, 190, D * (1 - D2)); naamBij(ctx, 'schaaltje cellen', '', 420, 680, D * (1 - D2), 'center');
    const rH = persoon(ctx, 'henk', 1300, 880, 520, { t, a: D * (1 - D2), kijk: -1 }); rompKijkje(ctx, rH, D * (1 - D2) * q.on('hart', 1, 0.4), { hart: 1, lever: q.on('lever', 1, 0.4), nieren: q.on('nieren', 1, 0.4) }, t);
    regel(ctx, 'hart, lever en nieren werken samen', 1300, 260, D * (1 - D2) * q.on('samenwerken', 1), C.text, 32, 'center', 700);
    rat(ctx, 560, 620, 1.3, D * D2, 1, t); naamBij(ctx, 'knaagdier', 'bv. rat', 560, 760, D * q.on('knaagdier', 1), 'center');
    hond(ctx, 1320, 640, 1.2, D * q.on('tweede', 1), t); naamBij(ctx, 'tweede diersoort', 'geen knaagdier, bv. hond', 1320, 790, D * q.on('tweede', 1), 'center');
    regel(ctx, 'de regels vragen dierproeven', 960, 300, D * D2, C.text, 34, 'center', 700);
    // F: vergunning en afweging
    vergunning(ctx, 420, 470, F, q.on('Centrale', 1, 1)); naamBij(ctx, 'Centrale Commissie Dierproeven', '', 420, 730, F * q.on('Centrale', 1), 'center');
    weegschaal(ctx, 1320, 560, 1, F * q.on('weegt', 1), Math.sin(t * 1.2) * 0.25 * (1 - q.on('ongerief', 1)) + 0.15 * q.on('ongerief', 1), 'doel', 'ongerief', C.groen, C.koraal);
    // G: drie V's
    vKaart(ctx, 360, 260, 620, 'vervangen', 'een proef zonder dieren', C.teal, G, 0.25 + 0.75 * q.on('vervangen', 1));
    vKaart(ctx, 360, 420, 620, 'verminderen', 'minder dieren', C.paars, G, 0.25 + 0.75 * q.on('verminderen', 1));
    vKaart(ctx, 360, 580, 620, 'verfijnen', 'minder lijden per dier', C.goud, G, 0.25 + 0.75 * q.on('verfijnen', 1));
    metaA(ctx, 'DE DRIE V\'S', 360, 230, G, C.grain, 'left', 26);
    // H: de vraag
    rat(ctx, 700, 560, 1.4, H, 1, t); spuit(ctx, 920, 430, 1.1, H * q.on('pijnstilling', 1));
    chip(ctx, 'pijnstilling na een ingreep', 700, 300, C.teal, H * q.on('pijnstilling', 1), 30); chip(ctx, 'stoppen als een dier te ziek wordt', 700, 760, C.koraal, H * q.on('ziek', 2), 30);
    regel(ctx, 'welke V?', 1450, 470, H * q.on('Welke', 1), C.goud, 60, 'center', 800); vraagteken(ctx, 1450, 660, H * q.on('denk', 1), 120); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: verfijnen', 1 - q.on('Toch', 1, 0.3));
    const K = 1 - q.on('Toch', 1, 0.3);
    vKaart(ctx, 120, 240, 600, 'verfijnen', 'minder lijden per dier', C.goud, K, t < q.at('Verminderen', 1) ? 1 : 0.35);
    vKaart(ctx, 120, 400, 600, 'verminderen', 'minder dieren', C.paars, K * q.on('Verminderen', 1), t >= q.at('Verminderen', 1) && t < q.at('vervangen', 1) ? 1 : 0.35);
    vKaart(ctx, 120, 560, 600, 'vervangen', 'een proef zonder dieren', C.teal, K * q.on('vervangen', 1), t >= q.at('vervangen', 1) ? 1 : 0.35);
    const r1 = 1 - q.on('Verminderen', 1), r2 = q.on('Verminderen', 1) * (1 - q.on('vervangen', 1)), r3 = q.on('vervangen', 1);
    rat(ctx, 1280, 520, 1.4, K * r1, -1, t); spuit(ctx, 1500, 400, 1.1, K * r1, -2.5);
    for (let i = 0; i < 10; i++) { const weg = i >= 6 ? q.on('minder', 3, 1) : 0; rat(ctx, 960 + (i % 5) * 180, 400 + Math.floor(i / 5) * 200, 0.5, K * r2 * (1 - weg), -1, t + i); }
    chip(ctx, 'zelfde antwoord, minder dieren', 1320, 820, C.paars, K * r2 * q.on('hetzelfde', 1), 28);
    petri(ctx, 1300, 520, 230, K * r3); naamBij(ctx, 'menselijke levercellen', 'gekweekt', 1300, 720, K * r3 * q.on('levercellen', 1), 'center');
    // telling 2024
    const T = clamp((t - q.at('Toch', 1) - 0.2) / 0.3, 0, 1);
    metaA(ctx, 'DIERPROEVEN IN NEDERLAND · 2024', 960, 230, T, C.grain, 'center', 28);
    regel(ctx, '± 435.000', 960, 380, T, C.text, 110, 'center', 800); regel(ctx, 'voor allerlei doelen', 960, 450, T * q.on('doelen', 1), C.text2, 34, 'center', 600);
    const V = q.on('Vier', 1); rat(ctx, 560, 650, 0.55, T * V, 1, t + 1); naamBij(ctx, 'muizen', '', 560, 760, T * V, 'center');
    rat(ctx, 960, 640, 0.75, T * V, 1, t); naamBij(ctx, 'ratten', '', 960, 760, T * V, 'center');
    visje(ctx, 1360, 640, 1.3, T * V); naamBij(ctx, 'vissen', '', 1360, 760, T * V, 'center');
    tag(ctx, 'samen 4 op de 5', 960, 860, C.goud, T * q.on('vijf', 1), 'center', 30); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const P = 1 - q.on('fase', 1, 0.8), S = q.on('fase', 1, 0.8);
    pers(ctx, 'kim', 360, 470, { t, a: P, kijk: 1, uit: 'blij', pose: 'wijs' }); pers(ctx, 'henk', 1180, 450, { t, a: P, kijk: -1, pose: 'vasthouden' }); pers(ctx, 'noor', 1440, 410, { t, a: P, kijk: -1 });
    vergunning(ctx, 770, 470, P * q.on('medisch-ethische', 1), q.on('goedkeuren', 1, 1), 'onderzoeksplan', 'goedgekeurd'); naamBij(ctx, 'medisch-ethische commissie', '', 770, 230, P * q.on('medisch-ethische', 1), 'center');
    chip(ctx, 'vooraf uitleg', 1340, 250, C.teal, P * q.on('uitleg', 1), 28); chip(ctx, 'zelf tekenen', 1340, 330, C.teal, P * q.on('tekent', 1), 28); formulier(ctx, 1000, 760, P * q.on('tekent', 1), clamp((t - q.at('tekent', 1)) / 1.2, 0, 1)); chip(ctx, 'altijd mogen stoppen', 1340, 410, C.goud, P * q.on('stoppen', 1), 28);
    // trap
    const f2 = q.at('twee', 1), f3 = q.at('drie', 1), hl = t < f2 ? 0 : t < f3 ? 1 : 2;
    faseTrap(ctx, 140, 840, 900, S, [1, q.on('twee', 1), q.on('drie', 1)], q.on('maanden', 1) > 0.5 ? -1 : hl);
    const E = q.on('maanden', 1, 0.3), I1 = S * (1 - q.on('twee', 1, 0.25)) * (1 - E), I2 = q.on('twee', 1, 0.25) * (1 - q.on('drie', 1, 0.25)) * (1 - E), I3 = q.on('drie', 1, 0.25) * (1 - E);
    // fase 1
    metaA(ctx, 'FASE 1 · 20 TOT 100 MENSEN', 1160, 240, I1, C.teal, 'left', 26);
    popjes(ctx, 1200, 340, 20, 10, 56, 16, C.teal, I1 * q.on('groep', 1)); chip(ctx, 'vaak gezond', 1460, 470, C.teal, I1 * q.on('gezonde', 1), 28);
    zacht(ctx, I1 * q.on('dosis', 1), () => { for (let i = 0; i < 5; i++) { const k = clamp((t - q.at('stap', 1)) * 1.2 - i, 0, 1); roundRect(ctx, 1200 + i * 110, 700 - (i + 1) * 30 * k, 80, (i + 1) * 30 * k + 4, 6); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); } text(ctx, 'dosis', 1200, 740, fTekst(28, 700), C.text2, 'left'); });
    regel(ctx, 'veilig?', 1660, 560, I1 * q.on('veilig', 1), C.goud, 44, 'center', 800);
    // fase 2
    metaA(ctx, 'FASE 2 · EEN PAAR HONDERD PATIËNTEN', 1160, 240, I2, C.paars, 'left', 26);
    popjes(ctx, 1200, 330, 60, 15, 40, 12, C.paars, I2);
    regel(ctx, 'doet het iets?', 1160, 620, I2 * q.on('Doet', 1), C.goud, 40, 'left', 800); regel(ctx, 'welke dosis?', 1160, 690, I2 * q.on('dosis', 2), C.goud, 40, 'left', 800);
    // fase 3
    metaA(ctx, 'FASE 3 · HONDERDEN TOT DUIZENDEN', 1160, 240, I3, C.goud, 'left', 26);
    popjes(ctx, 1180, 310, 160, 20, 30, 9, C.goud, I3);
    tag(ctx, 'vaccin: soms tienduizenden', 1500, 820, C.goud, I3 * q.on('tienduizenden', 1), 'center', 28);
    regel(ctx, 'werkt het echt?', 1160, 650, I3 * q.on('Werkt', 1), C.goud, 40, 'left', 800); regel(ctx, 'welke bijwerkingen?', 1160, 712, I3 * q.on('bijwerkingen', 1), C.goud, 40, 'left', 800);
    // afvallen
    chip(ctx, 'per fase maanden tot jaren', 1440, 260, C.text2, E, 28);
    zacht(ctx, E * q.on('vallen', 1), () => { for (let i = 0; i < 9; i++) { const k = clamp((t - q.at('vallen', 1)) * 0.8 - i * 0.15, 0, 1); const x0 = 300 + (i % 3) * 300 + (i % 2) * 40, y0 = 840 - 110 * (1 + (i % 3)) - 30; circ(ctx, x0 + k * 60, Math.min(y0 + k * k * 300, 800), 12, rgba(C.koraal, 1 - k * 0.6), '#F0A890', 1.5); } });
    regel(ctx, '1 op 10', 1440, 470, E * q.on('toelating', 1), C.text, 90, 'center', 800); regel(ctx, 'van fase 1 tot toelating', 1440, 530, E * q.on('toelating', 1), C.text2, 30, 'center', 600);
    popjes(ctx, 1220, 640, 10, 10, 50, 14, i => i === 0 ? C.groen : '#5A6478', E * q.on('toelating', 1));
    tag(ctx, 'vaccins tegen infecties: 1 op 3', 1440, 800, C.teal, E * q.on('infecties', 1), 'center', 30); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('weet', 1, 0.8), A = 1 - B;
    tag(ctx, 'film: Supplementen en superfoods', 960, 200, C.teal, A * (1 - q.on('computer', 1)), 'center', 30);
    // loting
    zacht(ctx, A * q.on('computer', 1), () => { roundRect(ctx, 830, 260, 260, 170, 12); shape(ctx, '#2C3B57', '#8FA0B5', 3); ctx.fillStyle = '#3A4A68'; ctx.fillRect(845, 275, 230, 140); ctx.fillStyle = '#6A7A94'; ctx.fillRect(930, 430, 60, 20); ctx.fillRect(890, 450, 140, 10); text(ctx, 'loting', 960, 360, fTekst(34, 800), C.goud, 'center'); });
    const L = clamp((t - q.at('loot', 1)) / 2.5, 0, 1);
    zacht(ctx, A * q.on('loot', 1), () => { for (let i = 0; i < 24; i++) { const links = (i * 7) % 2 === 0; const sx = 760 + (i % 8) * 50, sy = 520 + Math.floor(i / 8) * 60; const gi = Math.floor(i / 2), tx = (links ? 260 : 1340) + (gi % 4) * 80, ty = 300 + Math.floor(gi / 4) * 100; const k = ease(L);
      const x = sx + (tx - sx) * k, y = sy + (ty - sy) * k; const oud = i % 3 === 0; popjes(ctx, x, y, 1, 1, 0, 16, oud ? '#B8B0A0' : (links ? C.goud : C.teal), 1); } });
    chip(ctx, 'ongeveer evenveel ouderen', 960, 560, C.text2, A * q.on('ouderen', 1), 28); chip(ctx, 'ongeveer evenveel met een zwak hart', 960, 640, C.text2, A * q.on('hart', 1), 28);
    pil(ctx, 420, 760, 1.2, '#F2EEE4', A * q.on('nieuwe', 1)); naamBij(ctx, 'nieuwe stof', '', 420, 850, A * q.on('nieuwe', 1), 'center');
    pil(ctx, 1500, 760, 1.2, '#F2EEE4', A * q.on('placebo', 1)); naamBij(ctx, 'placebo', 'ziet er precies zo uit', 1500, 850, A * q.on('placebo', 1), 'center');
    tag(ctx, '+ hun gewone medicijnen', 960, 760, C.groen, A * q.on('gewone', 1), 'center', 28);
    // Henk en Kim
    pers(ctx, 'henk', 560, 450, { t, a: B, kijk: 1, pose: 'vasthouden' }); potje(ctx, 760, 640, 0.9, B, 0); naamBij(ctx, 'Opa Henk', '', 300, 420, B, 'left');
    bubbel(ctx, 660, 380, '?', '#F2F2EE', B * q.on('niet', 1), 44);
    pers(ctx, 'henk', 960, 450, { t, a: A * (1 - q.on('computer', 1)), kijk: 1 }); naamBij(ctx, 'Opa Henk', 'doet mee aan fase 3', 960, 380, A * (1 - q.on('computer', 1)), 'center');
    pers(ctx, 'kim', 1360, 470, { t, a: B, kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1480, 380, B, 'left');
    vraagteken(ctx, 1600, 600, B * q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ze kijkt anders', 1 - q.on('werd', 1)); const B = q.on('werd', 1, 0.5), A = 1 - B;
    pers(ctx, 'kim', 520, 470, { t, a: A, kijk: 1, outfit: 'lab', pose: 'denk' });
    chip(ctx, 'vragen', 900, 330, C.koraal, A * q.on('vraagt', 1), 30); chip(ctx, 'meten', 900, 420, C.koraal, A * q.on('meet', 1), 30); chip(ctx, 'noteren', 900, 510, C.koraal, A * q.on('noteert', 1), 30);
    regel(ctx, 'onbewust anders', 900, 610, A * q.on('onbewust', 1), C.koraal, 36, 'center', 700);
    pers(ctx, 'henk', 1360, 450, { t, a: A * q.on('Daarom', 1), kijk: -1 });
    potje(ctx, 1600, 640, 0.9, A * q.on('Daarom', 1), q.on('open', 1)); slot(ctx, 1600, 400, 1, A * q.on('dubbelblind', 1), q.on('open', 1));
    tag(ctx, 'dubbelblind: patiënt én onderzoeker weten het niet', 960, 830, C.goud, A * q.on('dubbelblind', 1), 'center', 30);
    // mRNA-vaccin
    flacon(ctx, 380, 520, 1.4, B); naamBij(ctx, 'eerste mRNA-vaccin', 'corona · 2020', 380, 720, B, 'center');
    metaA(ctx, '43.548 DEELNEMERS · HELFT VACCIN, HELFT PLACEBO', 760, 230, B * q.on('veertigduizend', 1), C.grain, 'left', 24);
    const u = clamp((t - q.at('vaccingroep', 1)) / 1.2, 0, 1), u2 = clamp((t - q.at('placebogroep', 1)) / 1.2, 0, 1);
    zacht(ctx, B * q.on('vaccingroep', 1), () => { const base = 760, sc = 2.9; roundRect(ctx, 900, base - 8 * sc * u - 4, 180, 8 * sc * u + 4, 8); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); text(ctx, 'vaccin', 990, base + 44, fTekst(30, 700), C.text, 'center'); if (t > q.at('acht', 1)) text(ctx, '8 ziek', 990, base - 8 * sc - 22, fTekst(34, 800), C.text, 'center');
      roundRect(ctx, 1300, base - 162 * sc * u2 - 4, 180, 162 * sc * u2 + 4, 8); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); text(ctx, 'placebo', 1390, base + 44, fTekst(30, 700), C.text, 'center'); if (t > q.at('honderdtweeënzestig', 1) - 0.3) text(ctx, '162 ziek', 1390, base - 162 * sc - 22, fTekst(34, 800), C.text, 'center');
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(860, base); ctx.lineTo(1560, base); ctx.stroke(); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('onderzoek', 1, 0.8), A = 1 - B;
    dossier(ctx, 260, 470, 0.9, A); pijl(ctx, 400, 470, 560, 470, C.line, A * q.on('Geneesmiddelenbureau', 1), 5, 18);
    sterren(ctx, 700, 470, 90, A * q.on('Geneesmiddelenbureau', 1), t); naamBij(ctx, 'EMA', 'Europees Geneesmiddelenbureau', 700, 650, A * q.on('Geneesmiddelenbureau', 1), 'center');
    tafel(ctx, 1360, 480, A * q.on('Experts', 1) * (1 - q.on('Wegen', 1, 0.25)), q.on('CBG', 1), t); naamBij(ctx, 'CBG', 'Nederland', 1360 + (-378 + 4 * 58), 730, A * q.on('CBG', 1) * (1 - q.on('Wegen', 1, 0.25)), 'center');
    regel(ctx, 'experts uit alle EU-landen', 1360, 210, A * q.on('Experts', 1) * (1 - q.on('Wegen', 1, 0.25)), C.text, 32, 'center', 700);
    weegschaal(ctx, 1340, 470, 0.9, A * q.on('Wegen', 1, 0.25) * (1 - q.on('Daarna', 1, 0.25)), -0.6 + 0.08 * Math.sin(t * 1.5), 'voordelen', 'risico\'s', C.groen, C.koraal);
    zacht(ctx, A * q.on('Daarna', 1, 0.25), () => { stempel(ctx, 1340, 400, 'toegelaten in de EU', C.groen, 1, -0.08); text(ctx, 'besluit: Europese Commissie', 1340, 520, fTekst(32, 700), C.text, 'center'); });
    klokje(ctx, 1340, 680, 60, 1, A * q.on('jaar', 1)); regel(ctx, 'beoordelen: ruim een jaar', 1340, 800, A * q.on('jaar', 1), C.text2, 32, 'center', 700);
    // bewaking
    metaA(ctx, 'FASE 3 · 3.000 MENSEN · ELK POPPETJE = 10', 160, 220, B, C.goud, 'left', 24);
    popjes(ctx, 180, 290, 300, 30, 24, 7, C.goud, B);
    regel(ctx, 'bijwerking bij 1 op 100.000', 1370, 330, B * q.on('honderdduizend', 1), C.koraal, 40, 'center', 800);
    zacht(ctx, B * q.on('honderdduizend', 1), () => { const X = 940, Y = 380, Wd = 860, Ht = 420; // 100.000 mensen = 33 × het fase-3-blok
      roundRect(ctx, X, Y, Wd, Ht, 10); shape(ctx, rgba(C.koraal, 0.10), C.koraal, 2); ctx.strokeStyle = rgba(C.koraal, 0.25); ctx.lineWidth = 1;
      for (let i = 1; i < 11; i++) { ctx.beginPath(); ctx.moveTo(X + i * Wd / 11, Y); ctx.lineTo(X + i * Wd / 11, Y + Ht); ctx.stroke(); } for (let j = 1; j < 3; j++) { ctx.beginPath(); ctx.moveTo(X, Y + j * Ht / 3); ctx.lineTo(X + Wd, Y + j * Ht / 3); ctx.stroke(); }
      roundRect(ctx, X, Y, Wd / 11, Ht / 3, 4); shape(ctx, rgba(C.goud, 0.55), C.goud, 2); text(ctx, 'fase 3', X + Wd / 22, Y + Ht / 6 + 8, fTekst(22, 800), C.text, 'center');
      circ(ctx, X + Wd * 0.71, Y + Ht * 0.62, 9, C.koraal, '#F4B0A0', 2);
      text(ctx, '100.000 mensen · 1 met de bijwerking', X + Wd / 2, Y + Ht + 42, fTekst(28, 700), C.text2, 'center'); });
    kruis(ctx, 1080, 520, 30, B * q.on('nooit', 1)); vraagteken(ctx, 1700, 300, B * q.on('ontdek', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: blijven melden', 1 - q.on('AstraZeneca', 1)); const B = q.on('AstraZeneca', 1, 0.8) * (1 - q.on('Volgens', 1, 0.8)), C3 = q.on('Volgens', 1, 0.8), A = 1 - q.on('AstraZeneca', 1, 0.8);
    pers(ctx, 'henk', 380, 450, { t, a: A, kijk: 1 }); naamBij(ctx, 'patiënt', '', 220, 380, A * q.on('patiënt', 1), 'left');
    zacht(ctx, A * q.on('melden', 1), () => { for (let i = 0; i < 6; i++) { const k = ((t * 0.5 + i / 6) % 1); document_(ctx, 560 + k * 340, 420 + Math.sin(i * 2) * 120 * (1 - k), 1.2, C.teal, 1); } });
    zacht(ctx, A * q.on('Lareb', 1), () => { roundRect(ctx, 920, 330, 280, 220, 14); shape(ctx, '#2C3B57', C.teal, 3); text(ctx, 'Lareb', 1060, 410, fTekst(42, 800), C.text, 'center'); text(ctx, 'meldingen', 1060, 460, fTekst(26, 600), C.text2, 'center'); });
    chip(ctx, 'zoekt naar patronen', 1060, 640, C.teal, A * q.on('patronen', 1), 28);
    pijl(ctx, 1220, 440, 1400, 440, C.line, A * q.on('signalen', 1), 5, 18); gebouwtje(ctx, 1560, 470, 1, 'cbg', A * q.on('CBG', 1)); naamBij(ctx, 'CBG', '', 1560, 590, A * q.on('CBG', 1), 'center');
    // AstraZeneca
    flacon(ctx, 360, 470, 1.3, B, C.paars); naamBij(ctx, 'AstraZeneca-vaccin', 'corona · 2021', 360, 660, B, 'center');
    popjes(ctx, 720, 260, 80, 20, 34, 9, C.paars, B * q.on('miljoenen', 1)); regel(ctx, 'miljoenen prikken', 720, 470, B * q.on('miljoenen', 1), C.text2, 30, 'left', 700);
    vatStolsel(ctx, 720, 560, 980, B * q.on('trombose', 1), clamp((t - q.at('trombose', 1)) / 2, 0, 1), t); naamBij(ctx, 'trombose: een stolsel in een bloedvat', 'heel zeldzaam', 720, 780, B * q.on('trombose', 1), 'left');
    chip(ctx, 'weinig bloedplaatjes', 1500, 790, C.oker, B * q.on('bloedplaatjes', 1), 26);
    // afweging
    weegschaal(ctx, 560, 560, 0.95, C3, -0.6, 'voordelen', 'risico\'s', C.groen, C.koraal); naamBij(ctx, 'EMA', '', 560, 260, C3, 'center');
    pers(ctx, 'henk', 1340, 450, { t, a: C3 * q.on('zestig', 1), kijk: -1, uit: 'blij' }); tag(ctx, 'vooral vanaf 60 jaar', 1340, 300, C.goud, C3 * q.on('zestig', 1), 'center', 32);
    chip(ctx, 'corona was voor hen veel gevaarlijker', 1340, 860, C.text2, C3 * q.on('gevaarlijker', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    pers(ctx, 'henk', 820, 450, { t, kijk: 1, pose: 'vasthouden', uit: 'blij' }); pers(ctx, 'noor', 1080, 410, { t, kijk: -1 }); potje(ctx, 1020, 640, 0.8, 1, 0);
    slot(ctx, 1340, 560, 1, q.on('code', 1), q.on('opengaat', 1)); naamBij(ctx, 'code pas na afloop open', '', 1420, 520, q.on('code', 1), 'left');
    stappenLijn(ctx, 260, 250, 1400, ['lab', 'dieren', 'fase 1', 'fase 2', 'fase 3', 'toelating', 'bewaking'], q.on('stappen', 1), Math.floor(clamp((t - q.at('stappen', 1)) * 2.2, 0, 6)));
    chip(ctx, 'zo veilig als we kunnen weten', 1420, 800, C.goud, q.on('veilig', 1), 28); },
  s15(ctx, t, q) { bg(ctx, 'schema');
    const W = 1; gebouwtje(ctx, 560, 360, 1, 'lab', W); naamBij(ctx, 'in het lab', '', 560, 450, W, 'center');
    zacht(ctx, W, () => { potje(ctx, 1000, 380, 0.75, 1, 0); }); naamBij(ctx, 'onderzoek met patiënten', '', 1000, 450, W, 'center');
    gebouwtje(ctx, 1440, 360, 1, 'cbg', W); naamBij(ctx, 'bij het CBG', '', 1440, 450, W, 'center');
    pers(ctx, 'kim', 230, 420, { t, outfit: 'lab', kijk: 1, uit: 'blij' });
    tag(ctx, 'Biomedische wetenschappen · universiteit', 960, 600, C.teal, q.on('studeert', 1), 'center', 34);
    tag(ctx, 'bachelor: 3 jaar', 760, 720, C.text2, q.on('bachelor', 1), 'center', 30); pijl(ctx, 930, 708, 1010, 708, C.line, q.on('master', 1), 4, 14); tag(ctx, 'master: meestal 2 jaar', 1220, 720, C.text2, q.on('master', 1), 'center', 30); }
});
