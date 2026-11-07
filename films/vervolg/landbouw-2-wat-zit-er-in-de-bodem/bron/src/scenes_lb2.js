// Wat word jij? · Landbouw 2 · Wat zit er in de bodem? — scènes per alinea (v1.0, 25 okt 2026). Look: Schema met cast (Yasmin, Opa Henk);
// Micro voor de deeltjes. Decor 'moestuin' alleen onder scènes die echt in de moestuin spelen (cold open, H2-opening, H3, recap).
// Kleuren: bodem oker-familie, water teal (opgelost ion = teal rand, vast = oker rand), plant groen, 'let op' koraal, focus goud.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function vereenvoudigd(ctx, a = 1) { metaA(ctx, 'VEREENVOUDIGD', 1840, 90, a, C.grain, 'right', 26); }
const GROND = 860; // voetlijn op het decor (± 80 % van de hoogte)

// twee bakken met tomatenplant (cold open en recap); u = groei 0..1 (een maand later)
function tweeBakken(ctx, t, u, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const yz = plantenbak(ctx, 760, GROND, 340, 'zand', 1, { label: 'zand' }), yk = plantenbak(ctx, 1200, GROND, 340, 'klei', 1, { label: 'klei' });
  tomaatBleek(ctx, 760, yz, lerp(150, 230, u), t, { blad: lerp(3, 4, u) | 0, trossen: u > 0.6 ? [0.2] : [] }, u * (o.bleek == null ? 1 : o.bleek));
  tomatenplant(ctx, 1200, yk, lerp(150, 340, u), t, { blad: lerp(3, 6, u) | 0, trossen: u > 0.6 ? [0.6, 0.3] : [] }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.translate(140, 0); bodemprofiel(ctx, 1080, 560, 760, 320, 1, { gang: [[1420, 556], [1410, 640], [1450, 760], [1430, 870]], gangDik: 24, wortels: [[[[1240, 560], [1250, 700], [1230, 840]], 0, 5]] });
    regenworm(ctx, [[1414, 600], [1412, 660], [1440, 740], [1446, 800]], 14); tomatenplant(ctx, 1240, 556, 360, t, { blad: 6, trossen: [0.7, 0.4] });
    for (let i = 0; i < 4; i++) { const ph = (t * 0.25 + i / 4) % 1; ion(ctx, 1600 + i * 30, 590 + ph * 260, i % 2 ? 'K' : 'NO3', 0.8, Math.sin(ph * 3.14) * 0.8, { vast: 0 }); } ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'moestuin', 0.6);
    const giet = fase(t, q.at('evenveel', 1), q.at('maand', 1), 0.4), u = q.on('maand', 1, 2);
    tweeBakken(ctx, t, u, 1);
    persoon(ctx, 'yasmin', 400, GROND, 420, { t, kijk: 1, pose: u > 0.5 ? 'wijs' : 'staan', uit: u > 0.6 ? 'verbaasd' : 'blij' });
    persoon(ctx, 'henk', 1560, GROND, 440, { t, kijk: -1, pose: q.on('Hoe', 1) > 0.5 ? 'denk' : 'staan' });
    gieter(ctx, 1000, 560, 0.9, giet, 1, t); metaA(ctx, 'ZELFDE WATER · ZELFDE MEST', 960, 300, fase(t, q.at('evenveel', 1), q.at('maand', 1), 0.4), C.grain, 'center', 26);
    tag(ctx, 'een maand later', 980, 190, C.goud, q.on('maand', 1), 'center', 32);
    
    vraagteken(ctx, 980, 330, q.on('denk', 1), 100); },

  // ---------- H1 De schudproef ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: door zand spoelen water en mineralen sneller weg', 1 - q.on('plant', 1));
    const P = q.on('plant', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; plantenbak(ctx, 620, 760, 380, 'zand', 1, { label: 'zand' }); plantenbak(ctx, 1300, 760, 380, 'klei', 1, { label: 'klei' });
      for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; ctx.beginPath(); ctx.ellipse(560 + i * 30, 780 + ph * 90, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.9 * Math.sin(ph * 3.14)); ctx.fill(); }
      ctx.beginPath(); ctx.ellipse(1300, 790 + ((t * 0.3) % 1) * 60, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fill(); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; const S = q.on('suiker', 1);
      tomatenplant(ctx, 760, 760, 440, t, { blad: 6, trossen: [0.6] }); ctx.fillStyle = BODEM.grond; ctx.fillRect(400, 760, 720, 90);
      kruis(ctx, 760, 820, 40, q.on('geen', 1) * (1 - q.on('Uit', 1)), C.koraal); tag(ctx, 'geen voedsel uit de grond', 760, 900 - 60, C.koraal, q.on('geen', 1) * (1 - q.on('Uit', 1)), 'center', 28);
      suiker(ctx, 980, 420, 1.6, S, C.oker); naamBij(ctx, 'suiker', 'MAAKT HIJ ZELF, IN HET BLAD', 1030, 410, S);
      const M = q.on('Uit', 1); pijl(ctx, 1260, 820, 1260, 640, C.teal, M, 4); ion(ctx, 1380, 760, 'K', 1.4, q.on('kalium', 1), { vast: 0 }); ion(ctx, 1520, 700, 'NO3', 1.4, q.on('nitraat', 1), { vast: 0 });
      naamBij(ctx, 'water en mineralen', 'OPGELOSTE DEELTJES', 1300, 560, M); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.at('schudproef', 1), Z = q.at('zakt', 1);
    const A1 = 1 - q.on('schudproef', 1, 0.6);
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; persoon(ctx, 'yasmin', 960, GROND, 520, { t, kijk: 1, pose: 'vasthouden', hold: (c, x, y) => { zandkorrel(c, x + 10, y - 10, 10, 1); zandkorrel(c, x - 6, y - 4, 9, 2); } }); naamBij(ctx, 'zand: korrelig', '', 1180, 420, q.on('korrelig', 1)); naamBij(ctx, 'klei: glad en plakkerig', '', 1180, 520, q.on('glad', 1)); ctx.restore(); }
    const B = q.on('schudproef', 1, 0.6) * (1 - q.on('kleideeltje', 1, 0.6));
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const sch = fase(t, q.at('schudden', 1), Z, 0.2), wob = Math.sin(t * 40) * 14 * sch, zak = t < Z ? 0 : clamp((t - Z) / 1.4, 0, 1);
      ctx.save(); ctx.translate(wob, 0); jampot(ctx, 700, 780, 240, 420, 1, q.on('water', 1) * 0.85, (c, x0, y0, w, h) => { for (let i = 0; i < 70; i++) { const fy = lerp(hash(i * 5) * h * 0.9, h - 10 - hash(i * 5) * 70, t < Z ? (sch > 0.5 ? 0 : 1) : zak); circ(c, x0 + 12 + hash(i * 3) * (w - 24), y0 + fy, 5 + 3 * hash(i), BODEM.zand); } }); ctx.restore();
      ctx.save(); ctx.translate(-wob, 0); jampot(ctx, 1220, 780, 240, 420, 1, q.on('water', 1) * 0.85, (c, x0, y0, w, h) => { const zw = sch > 0.3 || t > Z ? 1 : 0; c.fillStyle = rgba(BODEM.klei, 0.55 * zw); c.fillRect(x0, y0 + 20, w, h - 20); c.fillStyle = BODEM.klei; c.fillRect(x0, y0 + h - 18, w, 18); }); ctx.restore();
      naamBij(ctx, 'zand', 'ZAKT METEEN', 700, 850, q.on('meteen', 1), 'center'); naamBij(ctx, 'klei', 'BLIJFT ZWEVEN', 1220, 850, q.on('zweven', 1), 'center'); vereenvoudigd(ctx, 1); ctx.restore(); }
    const C2 = q.on('kleideeltje', 1, 0.6); if (C2 > 0.01) { ctx.save(); ctx.globalAlpha *= C2; bg(ctx, 'micro'); ctx.globalAlpha = C2;
      const g = q.on('zandkorrel', 1, 1.2); zandkorrel(ctx, 640, 480, lerp(40, 260, g), 4); kleideeltje(ctx, 1380, 480, 120, -0.2, 1, { lading: 0 });
      naamBij(ctx, 'kleideeltje', 'KLEINER DAN 2 MICROMETER', 1380, 600, 1, 'center'); naamBij(ctx, 'zandkorrel', '50 MICROMETER TOT 2 MILLIMETER', 640, 480 + lerp(40, 260, g) * 0.86 + 60, g, 'center');
      tag(ctx, 'honderden keren zo groot', 960, 190, C.goud, q.on('honderden', 1), 'center', 32); metaA(ctx, 'NIET OP SCHAAL', 1840, 860, 1, C.grain, 'right'); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('giet', 1, 1.5);
    trechter(ctx, 760, 470, 1.15, 'zand', 1, 0, 0, 1); trechter(ctx, 1180, 470, 1.15, 'klei', 1, 0, 0, 1);
    naamBij(ctx, 'zandgrond', '', 760, 250, 1, 'center'); naamBij(ctx, 'kleigrond', '', 1180, 250, 1, 'center');
    gieter(ctx, 1460, 300, 0.8, G * (1 - q.on('Waar', 1)), G, t); vraagteken(ctx, 980, 760, q.on('denk', 1), 100); vereenvoudigd(ctx, 1); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: uit het zand', 1 - q.on('deel', 1)); const u = clamp((t - 0.3) / 6, 0, 1);
    trechter(ctx, 640, 470, 1.15, 'zand', 1, 0.9, u, 1); trechter(ctx, 1060, 470, 1.15, 'klei', 1, 0.3, u, 1);
    naamBij(ctx, 'zandgrond', 'WATER ZAKT VLOT DOOR', 640, 250, 1, 'center'); naamBij(ctx, 'kleigrond', 'HOUDT MEER WATER VAST', 1060, 250, q.on('Klei', 1), 'center');
    const D = q.on('deel', 1); if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; roundRect(ctx, 1380, 260, 440, 440, 20); shape(ctx, '#121A26', C.line, 2); ctx.save(); roundRect(ctx, 1380, 260, 440, 440, 20); ctx.clip();
      for (let i = 0; i < 3; i++) { const x = 1480 + i * 120, y = 360 + (i % 2) * 140; kleideeltje(ctx, x, y, 140, -0.3 + i * 0.4, 1, { lading: 0 }); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(x, y + 4, 80, 34, -0.3 + i * 0.4, 0, 6.283); ctx.stroke(); }
      ctx.restore(); naamBij(ctx, 'stevig vastgehouden water', 'WORTEL KAN ER NIET BIJ', 1600, 740, q.on('wortel', 1), 'center'); kruis(ctx, 1760, 620, 26, q.on('wortel', 1)); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'micro'); const tV = q.at('Volg', 1), tL = q.at('Langs', 1), tH = q.at('humus', 1);
    const korrels = [[420, 520, 170, 4], [1500, 720, 110, 6]]; korrels.forEach(k => zandkorrel(ctx, k[0], k[1], k[2], k[3], 1));
    const kl = [[1000, 560], [1180, 660], [1340, 560]]; kl.forEach((p, i) => kleideeltje(ctx, p[0], p[1], 190, -0.2 + i * 0.2, 1, { lading: 5, laA: q.on('negatief', 1) }));
    tag(ctx, 'lading', 960, 160, C.goud, q.on('lading', 1) * (1 - q.on('Volg', 1)), 'center', 36);
    // kaliumion 1: naar de klei (plakt); kaliumion 2: langs de zandkorrel naar beneden
    const u1 = clamp((t - q.at('plakken', 1) + 1.6) / 1.6, 0, 1), vast = t > q.at('plakken', 1) - 0.1 ? 1 : 0;
    ion(ctx, lerp(820, 1000, ease(u1)), lerp(220, 500, ease(u1)) + (vast ? 0 : Math.sin(t * 2) * 6), 'K', 1.7, q.on('kaliumdeeltje', 1, 0.3), { vast, volg: true });
    naamBij(ctx, 'kaliumion', 'POSITIEF GELADEN', 860, 150, q.on('positief', 1) * (1 - q.on('Kleideeltjes', 1)), 'left');
    const u2 = clamp((t - tL) / 3, 0, 1); ion(ctx, 600, lerp(230, 820, u2), 'K', 1.5, q.on('Langs', 1) * (1 - ramp(t, tL + 3, 0.4)), { vast: 0 }); naamBij(ctx, 'zandkorrel', 'HOUDT BIJNA NIETS VAST', 420, 780, q.on('zandkorrel', 1) * (1 - q.on('humus', 1)), 'center');
    const Hm = q.on('humus', 1, 0.6); if (Hm > 0.01) { humusVlok(ctx, 1560, 380, 110, 5, Hm, { lading: 4 }); ion(ctx, 1560, 290, 'K', 1.3, Hm, { vast: 1 }); mantel(ctx, 1560, 380, 150, false, q.on('water', 2) * Hm, t, 9); naamBij(ctx, 'humus', 'HOUDT OOK WATER VAST', 1300, 420, Hm, 'center'); }
    tag(ctx, 'vooral op zand belangrijk', 960, 160, C.goud, q.on('Vooral', 1), 'center', 32); metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('veen', 1, 0.6);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; const kaart = (x, kop, regels, a, col) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 260, 640, 380, 20); shape(ctx, rgba(col, 0.12), col, 2); text(ctx, kop, x + 40, 340, fTitel(52), col); regels.forEach((r, i) => { const [s2, ra] = r; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 40, 420 + i * 70, fTekst(38, 600), C.text); ctx.restore(); } }); ctx.restore(); };
      kaart(220, 'klei', [['zwaar te bewerken', q.on('zwaar', 1)], ['scheurt als hij uitdroogt', q.on('scheurt', 1)], ['houdt water en kalium vast', 1]], 1, BODEM.kleiR);
      kaart(1060, 'zand', [['warmt in het voorjaar', q.on('warmt', 1)], ['sneller op', q.on('warmt', 1)], ['laat water en mineralen door', 1]], 1, BODEM.zandR);
      if (q.on('scheurt', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('scheurt', 1); ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(560, 600); ctx.lineTo(590, 560); ctx.lineTo(580, 520); ctx.moveTo(620, 610); ctx.lineTo(640, 570); ctx.stroke(); ctx.restore(); }
      zon(ctx, 1600, 330, 32, q.on('warmt', 1), t); ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; const zak = q.on('zakt', 1, 2.5); veenprofiel(ctx, 360, 330, 1200, 460, 1, q.on('ontwaterd', 1, 2) * 0.4 + zak * 0.6);
      naamBij(ctx, 'veen', 'PLANTENRESTEN, NIET VERTEERD', 400, 260, 1, 'left'); tag(ctx, 'houdt veel water vast', 1150, 220, C.teal, q.on('houdt', 1) * (1 - q.on('ontwaterd', 1)), 'center', 30);
      tag(ctx, 'ontwaterd: zuurstof erbij, afbraak', 1150, 220, C.koraal, q.on('ontwaterd', 1), 'center', 30);
      for (let i = 0; i < 6; i++) { const ph = (t * 0.4 + i / 6) % 1; circ(ctx, 500 + i * 160, 360 - ph * 120, 8, rgba(C.text2, 0.5 * q.on('micro-organismen', 1) * Math.sin(ph * 3.14))); }
      metaA(ctx, 'TOT ± 1 CM PER JAAR', 1560, 860, zak, C.grain, 'right', 28); ctx.restore(); } },

  // ---------- H2 Wie maakt de grond? ----------
  s11(ctx, t, q) { const P = q.on('eetlepel', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; decor(ctx, 'moestuin', 0.6); const W2 = q.on('regenworm', 1, 0.6);
      persoon(ctx, 'yasmin', 760, GROND, 440, { t, kijk: 1, pose: 'vasthouden', uit: W2 > 0.5 ? 'verbaasd' : 'blij', hold: (c, x, y) => { if (W2 > 0.01) regenworm(c, [[x - 26, y - 8 + Math.sin(t * 3) * 2], [x - 8, y - 16], [x + 10, y - 8 + Math.sin(t * 3 + 1) * 2], [x + 28, y - 14]], 7, 1); } });
      persoon(ctx, 'henk', 1160, GROND, 450, { t, kijk: -1, pose: 'staan', uit: 'blij' }); tag(ctx, 'dood materiaal?', 960, 200, C.koraal, q.on('dood', 1), 'center', 34); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'schema'); ctx.globalAlpha = P;
      ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(680, 510); ctx.quadraticCurveTo(820, 470, 960, 400); ctx.stroke(); ctx.beginPath(); ctx.ellipse(560, 520, 130, 62, 0, 0, 6.283); shape(ctx, '#AFC0D0', '#8FA0B5', 2); ctx.beginPath(); ctx.ellipse(560, 512, 112, 48, 0, 0, 6.283); ctx.fillStyle = BODEM.grond; ctx.fill();
      for (let i = 0; i < 60; i++) circ(ctx, 470 + hash(i * 3) * 180, 490 + hash(i * 5) * 44, 1.6, rgba(C.teal, 0.8 * q.on('organismen', 1)));
      naamBij(ctx, 'een eetlepel gezonde grond', '', 560, 640, 1, 'center'); text(ctx, '>', 1060, 540, fTitel(96), C.goud, 'center');
      stippen(ctx, 1180, 400, 40, 40, C.text2, q.on('mensen', 1), 10, 9, 26); naamBij(ctx, 'alle mensen op aarde', '', 1300, 640, q.on('mensen', 1), 'center');
      const R = q.on('grasland', 1); if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; bg(ctx, 'schema'); ctx.globalAlpha = P * R; roundRect(ctx, 610, 220, 700, 560, 8); shape(ctx, rgba(BODEM.grond, 0.6), C.line, 2); for (let i = 0; i < 30; i++) { const x = 650 + hash(i * 7) * 620, y = 270 + hash(i * 11) * 470; regenworm(ctx, [[x, y], [x + 20, y + 10], [x + 44, y + 4]], 5, q.on('driehonderd', 1)); }
        metaA(ctx, '1 VIERKANTE METER GRASLAND', 960, 830, 1, C.grain, 'center', 26); tag(ctx, 'vaak zo’n driehonderd regenwormen', 960, 190, C.goud, q.on('driehonderd', 1), 'center', 32); metaA(ctx, 'WORMEN VERGROOT', 80, 860, 1); ctx.restore(); }
      ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const tr = q.on('trekken', 1, 2.2);
    bodemprofiel(ctx, 460, 300, 1000, 520, 1, { gang: [[860, 296], [856, 380], [880, 500], [920, 640], [910, 790]], gangDik: 28, wortels: [[[[600, 300], [610, 450], [590, 620]], 0, 5], [[[1260, 300], [1280, 420], [1250, 560]], 0, 4]] });
    const g = q.on('gangen', 1, 1.5); regenworm(ctx, [[lerp(870, 863, g), lerp(560, 318, g)], [860, lerp(620, 400, g)], [880, lerp(680, 500, g)], [916, lerp(760, 610, g)]], 13);
    const L = q.on('lucht', 1); for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; ctx.beginPath(); ctx.ellipse(866 + Math.sin(i) * 6, 300 + ph * 400, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(i % 2 ? C.teal : '#E8EEF2', 0.8 * L * Math.sin(ph * 3.14)); ctx.fill(); }
    doodBlad(ctx, lerp(760, 862, tr), lerp(286, 360, tr), 0.9, lerp(0.2, 1.5, tr), 1, 0);
    naamBij(ctx, 'regenworm', 'GRAAFT GANGEN', 980, 450, q.on('wormen', 1) * (1 - q.on('stikstof', 1)), 'left'); metaA(ctx, 'WORM VERGROOT', 480, 860, 1, C.grain, 'left', 24);
    const N = q.on('stikstof', 1); if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 1300, 70, 560, 180, 18); shape(ctx, '#121A26', C.goud, 2); eiwitje(ctx, 1410, 160, 1.2); text(ctx, 'stikstof in eiwitten', 1500, 172, fTekst(34, 700), C.text, 'left'); ctx.restore(); }
    vraagteken(ctx, 1500, 560, q.on('denk', 1), 100); },

  s14(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord a: pas na afbraak door bacteriën en schimmels', 1 - q.on('Eerst', 1));
    const af = q.on('breken', 1, 3.5); doodBlad(ctx, 760, 480, 3.2, 0.1, 1, af);
    for (let i = 0; i < 6; i++) { const w2 = wander(i, t, 20, 0.6); bacterieCel(ctx, 560 + i * 90 + w2.x, 420 + (i % 2) * 130 + w2.y, 46, { a: q.on('bacteriën', 1), ang: i * 0.8 }); }
    ctx.save(); ctx.globalAlpha *= q.on('schimmels', 1); ctx.strokeStyle = BODEM.schimmel; ctx.lineWidth = 2.2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(500 + i * 120, 680); ctx.quadraticCurveTo(540 + i * 120, 560, 520 + i * 120, 460); ctx.stroke(); } ctx.restore();
    const L = q.on('los', 1, 1); for (let i = 0; i < 5; i++) { const ph = clamp(L * 1.2 - i * 0.05, 0, 1); ion(ctx, lerp(780, 1200 + i * 90, ph), lerp(480, 300 + (i % 2) * 160, ph), i % 3 === 2 ? 'P' : i % 2 ? 'NO3' : 'NH4', 1.2, L, { vast: 0 }); }
    const O = q.on('opnemen', 1, 1); ctx.save(); ctx.globalAlpha *= O; ctx.strokeStyle = BODEM.wortel; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1800, 120); ctx.quadraticCurveTo(1700, 400, 1760, 760); ctx.stroke(); ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(1730 + i * 2, 200 + i * 70); ctx.lineTo(1660, 210 + i * 70); ctx.stroke(); } ctx.restore(); naamBij(ctx, 'wortel', '', 1800, 820, O, 'center'); naamBij(ctx, 'wortelharen', '', 1560, 360, O, 'right');
    regel(ctx, 'mineralisatie', 960, 830, q.on('mineralisatie', 1), C.goud, 56, 'center', 800); },

  s15(ctx, t, q) { bg(ctx, 'micro'); const lijm = q.on('plakken', 1, 2);
    kruimel(ctx, 700, 460, 220, 1, { lijm }); kruimel(ctx, 1240, 460, 180, 1, { lijm: q.on('plakken', 1, 2.5) });
    naamBij(ctx, 'schimmeldraden', '', 520, 220, q.on('Schimmeldraden', 1), 'center'); naamBij(ctx, 'slijm van bacteriën', '', 1240, 220, q.on('slijm', 1), 'center');
    regel(ctx, 'kruimels', 960, 780, q.on('kruimels', 1), C.goud, 52, 'center', 800);
    const R = q.on('ruimte', 1); for (let i = 0; i < 4; i++) { const ph = (t * 0.4 + i / 4) % 1; ctx.beginPath(); ctx.ellipse(960 + Math.sin(i * 2) * 20, 200 + ph * 560, 6, 9, 0, 0, 6.283); ctx.fillStyle = rgba(i % 2 ? C.teal : '#E8EEF2', 0.8 * R * Math.sin(ph * 3.14)); ctx.fill(); }
    metaA(ctx, 'RUIMTE VOOR LUCHT, WATER EN WORTELS', 960, 850, R, C.grain, 'center', 26); metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); },

  s16(ctx, t, q) { bg(ctx, 'micro'); ctx.fillStyle = rgba(BODEM.grond, 0.25); ctx.fillRect(0, 0, W, 900);
    mycorrhiza(ctx, 960, 450, 1300, 1, { groei: q.on('schimmels', 1, 2.5), stroom: q.on('fosfaat', 1), t });
    metaA(ctx, 'ZEVEN OP DE TIEN SOORTEN LANDPLANTEN', 80, 860, q.on('zeven', 1));
    naamBij(ctx, 'wortel', '', 360, 380, 1, 'left'); naamBij(ctx, 'schimmeldraden', 'REIKEN VERDER DE GROND IN', 1380, 200, q.on('schimmeldraden', 1), 'left');
    naamBij(ctx, 'fosfaat', 'NAAR DE PLANT', 240, 760, q.on('fosfaat', 1), 'left'); naamBij(ctx, 'suiker', 'NAAR DE SCHIMMEL', 700, 200, q.on('suiker', 1), 'left'); },

  // ---------- H3 Het proefveldje ----------
  s17(ctx, t, q) { decor(ctx, 'moestuin', 0.6); const B = q.on('bodemmonster', 1);
    const strook = (x, l, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(BODEM.grond, 0.85); ctx.fillRect(x - 170, 700, 340, 160); roundRect(ctx, x - 40, 560, 80, 60, 6); shape(ctx, '#F2EAD8', '#B8A880', 2); text(ctx, l, x, 604, fTekst(40, 800), '#3A2E24', 'center'); ctx.fillStyle = '#8C6A48'; ctx.fillRect(x - 4, 620, 8, 90); ctx.restore(); };
    strook(560, 'A', 1); strook(960, 'B', 1); strook(1360, 'C', 1);
    for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) bladrozet(ctx, 460 + k * 100 + i * 400, 830, 0.55, 0.2, 0, 1, t);
    bodemmonster(ctx, 1700, 340, 0.9, B * (1 - q.on('Strook', 1))); roundRect(ctx, 1380, 120, 480, 120, 14); ctx.save(); ctx.globalAlpha *= B * (1 - q.on('Strook', 1)); shape(ctx, '#121A26', C.line, 2); text(ctx, 'stikstof: te laag', 1410, 170, fTekst(34, 700), C.koraal); text(ctx, 'kalium: ruim voldoende', 1410, 215, fTekst(34, 700), C.groen); ctx.restore();
    tag(ctx, 'geen stikstof', 560, 500, C.koraal, q.on('Strook', 1, 0.3), 'center', 28); tag(ctx, 'stikstof', 960, 500, C.groen, q.on('Strook', 2, 0.3), 'center', 28); tag(ctx, 'stikstof + extra kalium', 1360, 500, C.goud, q.on('Strook', 3, 0.3), 'center', 28);
    vraagteken(ctx, 1160, 380, q.on('denk', 1), 100); },

  s19(ctx, t, q) { const T = q.on('ton', 1, 0.6);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; decor(ctx, 'moestuin', 0.6); antwoord(ctx, 'antwoord c: even goed', 1 - q.on('Kalium', 1)); const gr = q.on('groeit', 1, 2);
      [[560, 0.35, 0.8], [960, 1, 0], [1360, 1, 0]].forEach(([x, g, b], i) => { ctx.fillStyle = rgba(BODEM.grond, 0.85); ctx.fillRect(x - 170, 700, 340, 160); for (let k = 0; k < 3; k++) bladrozet(ctx, x - 100 + k * 100, 830, 0.55, lerp(0.2, g, gr), b * gr, 1, t); text(ctx, 'ABC'[i], x, 620, fTekst(44, 800), C.text, 'center'); });
      tag(ctx, 'B en C even groot', 1160, 420, C.groen, q.on('groeit', 1), 'center', 30); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; bg(ctx, 'schema'); ctx.globalAlpha = T; const A = q.on('Strook', 2);
      const kH = lerp(0.85, 0.98, q.on('verhoogt', 1, 1.2)); ton(ctx, 380, 800, 480, 500, [0.45, 0.7, kH], ['stikstof', 'fosfor', 'kalium'], 1, 1, t, q.on('laagste', 2) > 0.5 ? 0 : -1);
      metaA(ctx, 'DE TON UIT MEER OOGST', 380, 220, 1, C.grain, 'left', 26); tag(ctx, 'extra kalium: hoger, maar niet de laagste duig', 620, 160, C.goud, q.on('verhoogt', 1) * (1 - A), 'center', 28);
      if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; bladrozet(ctx, 1240, 700, 1.4, 0.5, 1, 1, t); naamBij(ctx, 'strook A', 'BLEKE, GELE OUDERE BLADEREN', 1240, 760, 1, 'center'); ctx.restore(); }
      const E = q.on('eiwitten', 1); if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; roundRect(ctx, 1500, 220, 340, 260, 16); shape(ctx, '#121A26', C.line, 2); eiwitje(ctx, 1590, 320, 1); text(ctx, 'eiwit', 1700, 330, fTekst(30, 700), C.text); ctx.beginPath(); ctx.ellipse(1600, 420, 50, 22, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.7), C.groen, 2); text(ctx, 'bladgroen', 1680, 430, fTekst(30, 700), C.text); ctx.restore(); }
      ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema'); ton(ctx, 560, 800, 480, 500, [0.45, 0.7, 0.98], ['stikstof', 'fosfor', 'kalium'], 1, q.on('voedingsstof', 1, 1.5), t, 0);
    regel(ctx, 'wet van het minimum', 1180, 420, q.on('minimum', 1), C.goud, 56, 'left', 800); metaA(ctx, 'SPRENGEL (± 1828)', 1180, 480, q.on('tweehonderd', 1)); metaA(ctx, 'LIEBIG (VANAF 1840)', 1180, 520, q.on('tweehonderd', 1));
    regel(ctx, 'wat het meest tekortschiet,', 1180, 600, q.on('tekortschiet', 1), C.text, 38, 'left', 700); regel(ctx, 'bepaalt de groei', 1180, 652, q.on('bepaalt', 1), C.goud, 38, 'left', 700); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const kaart = (x, kop, col, a, teken) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 230, 500, 500, 22); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, kop, x + 250, 310, fTitel(56), col, 'center'); teken(x + 250, 500); ctx.restore(); };
    kaart(140, 'stikstof', C.groen, 1, (x, y) => { eiwitje(ctx, x - 60, y - 40, 1.3); ctx.beginPath(); ctx.ellipse(x + 60, y + 90, 70, 30, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); text(ctx, 'eiwit · bladgroen', x, y + 190, fTekst(30, 700), C.text, 'center'); });
    kaart(710, 'fosfor', C.oker, q.on('Fosfor', 1), (x, y) => { ctx.strokeStyle = C.oker; ctx.lineWidth = 5; for (let i = 0; i < 2; i++) { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const yy = y - 120 + k * 5, xx = x - 60 + Math.sin(k * 0.35 + i * 3.14) * 40; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } text(ctx, 'DNA · ATP · membraan', x, y + 190, fTekst(30, 700), C.text, 'center'); });
    kaart(1280, 'kalium', C.teal, q.on('Kalium', 1), (x, y) => { const op = 0.5 + 0.5 * Math.sin(t * 1.5); huidmondje(ctx, x, y, 0.9, op * q.on('huidmondjes', 1), 1, t, 0); text(ctx, 'huidmondjes · enzymen', x, y + 190, fTekst(30, 700), C.text, 'center'); }); },

  // ---------- H4 De druppelbak ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const G = fase(t, q.at('giet', 1), q.at('Yasmin', 1) + 1.5, 0.4), dr = q.on('druppelt', 1);
    druppelbak(ctx, 960, 560, 520, q.on('bak', 1), { korrels: q.on('kunstmest', 1), druppels: Math.max(G, dr), vol: q.on('druppelt', 1, 2) * 0.6, t, soort: 'tuin' });
    naamBij(ctx, 'tuingrond', 'MET KLEI EN HUMUS', 960, 240, q.on('tuingrond', 1), 'center'); tag(ctx, 'kunstmest', 1330, 330, C.text2, q.on('kunstmest', 1) * (1 - G), 'left', 28);
    persoon(ctx, 'henk', 540, 900, 440, { t, kijk: 1, pose: 'vasthouden', hold: (c, x, y) => gieter(c, x + 20, y - 10, 0.8, 1, G, t) });
    persoon(ctx, 'yasmin', 1240, 900, 430, { t, kijk: -1, pose: 'vasthouden', hold: (c, x, y) => teststrookje(c, x, y + 40, 0.75, 0, 1, 0) });
    vereenvoudigd(ctx, 1); vraagteken(ctx, 1200, 820, q.on('denk', 1), 90); },

  s24(ctx, t, q) { const P = q.on('Volg', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: veel nitraat', 1); druppelbak(ctx, 860, 560, 520, 1, { druppels: 1, vol: 0.7, t, soort: 'tuin' });
      persoon(ctx, 'yasmin', 1140, 900, 430, { t, kijk: -1, pose: 'vasthouden', uit: 'verbaasd', hold: (c, x, y) => teststrookje(c, x, y + 40, 0.75, q.on('donker', 1, 0.8), 1, 0) });
      persoon(ctx, 'henk', 380, 900, 440, { t, kijk: 1, uit: 'verbaasd' }); tag(ctx, 'nitraat', 1560, 330, C.koraal, q.on('nitraat', 1), 'center', 30); vereenvoudigd(ctx, 1); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'micro'); ctx.globalAlpha = P;
      for (let i = 0; i < 3; i++) zandkorrel(ctx, 360 + i * 560, 300 + (i % 2) * 300, 110, i + 2); kleideeltje(ctx, 600, 640, 230, 0.3, 1, { lading: 5 }); humusVlok(ctx, 1300, 300, 90, 5, 1, { lading: 3 });
      ion(ctx, 610, 560, 'K', 1.5, 1, { vast: 1 }); ion(ctx, 1290, 210, 'NH4', 1.4, 1, { vast: 1 });
      const tz = q.at('zakt', 1), uN = clamp((t - tz) / 3, 0, 1), nx = 960, ny = lerp(330, 760, ease(uN)) + Math.sin(t * 2) * 4;
      mantel(ctx, nx, ny, 66, true, q.on('nitraatdeeltje', 1), t); ion(ctx, nx, ny, 'NO3', 1.6, q.on('nitraatdeeltje', 1, 0.3), { vast: 0, volg: true });
      naamBij(ctx, 'nitraat', 'NEGATIEF · MANTEL VAN WATER', nx, ny + 120, 1 - q.on('Fosfaat', 1), 'center');
      const F = q.on('Fosfaat', 1), R = q.on('reageert', 1, 1.2); if (F > 0.01) { mantel(ctx, 1600, 620, 66, true, F * (1 - R), t); ion(ctx, 1600, 620, 'P', 1.5, F * (1 - R * 0.8), { vast: 0 }); fosfaatKorrel(ctx, 1600, 620, 1.6, R, F); naamBij(ctx, 'fosfaat', R > 0.5 ? 'LOST SLECHT OP' : 'OOK NEGATIEF', 1600, 720, F, 'center'); metaA(ctx, '+ IJZER, ALUMINIUM OF CALCIUM', 1600, 770, R * F, C.grain, 'center', 22); }
      metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); ctx.restore(); } },

  s25(ctx, t, q) { bg(ctx, 'schema'); const H2 = q.on('herfst', 1), Z = 1 - q.on('herfst', 1);
    akkerDoorsnede(ctx, 260, 360, 1400, 460, 1, { zand: Z > 0.5 || true, regen: q.on('regent', 1), nitraat: q.on('spoelt', 2), u: (t * 0.12) % 1, t });
    tag(ctx, 'op zand houdt bijna niets iets vast', 960, 200, C.koraal, Z * q.on('zand', 1), 'center', 30);
    kalender(ctx, 540, 150, H2 * (1 - q.on('drijfmest', 1)), q.on('regent', 1)); metaA(ctx, 'REGEN > VERDAMPING', 960, 260, q.on('verdampt', 1) * (1 - q.on('drijfmest', 1)), C.teal, 'center', 26);
    naamBij(ctx, 'grondwater', '', 1700, 760, q.on('grondwater', 1), 'left');
    tag(ctx, 'herfst en winter: geen drijfmest op het land', 960, 200, C.koraal, q.on('drijfmest', 1) * (1 - q.on('Europa', 1)), 'center', 30);
    const E = q.on('Europa', 1); if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; roundRect(ctx, 1180, 110, 700, 230, 16); shape(ctx, '#121A26', C.line, 2); grensStaaf(ctx, 1210, 310, 70, 170, 50, 50, 70, 1, 'GRENS: 50 MG/L'); metaA(ctx, 'OOK VOOR DRINKWATER', 1400, 290, q.on('drinkwater', 1), C.grain, 'left', 24); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); akkerDoorsnede(ctx, 260, 420, 1400, 400, 1, { u: 0, t });
    for (let i = 0; i < 9; i++) { const x = 360 + i * 150; ctx.fillStyle = '#B8935A'; ctx.beginPath(); ctx.ellipse(x, 404, 26, 18, 0, 0, 6.283); ctx.fill(); } // gerooide aardappels, liggen op de grond
    for (let i = 0; i < 6; i++) ion(ctx, 400 + i * 220, 520 + (i % 2) * 60, 'NO3', 0.9, q.on('stikstof', 1), { vast: 0 });
    tag(ctx, 'eind september', 960, 200, C.goud, q.on('september', 1), 'center', 32); metaA(ctx, 'AKKER KAAL · NOG STIKSTOF IN DE GROND', 960, 260, q.on('kaal', 1), C.grain, 'center', 26); vraagteken(ctx, 1700, 300, q.on('denk', 1), 100); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: een vanggewas zaaien', 1 - q.on('winter', 1)); const G = q.on('vanggewas', 1, 2.5);
    akkerDoorsnede(ctx, 260, 420, 1400, 400, 1, { gewas: G, nitraat: 1, u: (t * 0.06) % 1, t });
    naamBij(ctx, 'vanggewas', 'ROGGE OF GRAS', 1460, 380, q.on('vanggewas', 1), 'center'); tag(ctx, 'neemt een groot deel van de stikstof op', 960, 260, C.groen, q.on('neemt', 1), 'center', 30);
    tag(ctx, 'veel minder uitspoeling', 960, 330, C.groen, q.on('minder', 1), 'center', 30); },

  s29(ctx, t, q) { bg(ctx, 'schema'); const kol = (x, kop, col, a, regels) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 220, 700, 520, 22); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, kop, x + 40, 300, fTitel(52), col); regels.forEach(([s2, ra], i) => { if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 40, 400 + i * 74, fTekst(36, 600), C.text); ctx.restore(); } }); ctx.restore(); };
    kol(180, 'kunstmest', C.text2, 1, [['werkt snel', q.on('snel', 1)]]);
    kol(1040, 'mest en compost', BODEM.zandR, 1, [['stikstof zit vast', q.on('vast', 1)], ['komt langzaam vrij', q.on('bodemleven', 1)], ['geeft meer humus', q.on('humus', 1)], ['ook dan: nitraat!', q.on('nitraat', 1)]]);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; circ(ctx, 300 + i * 90, 640 + ph * 60, 8, rgba('#F2F2EE', 0.7 * q.on('snel', 1))); }
    if (q.on('nitraat', 1) > 0.01) ion(ctx, 1660, 700, 'NO3', 1.2, q.on('nitraat', 1), { vast: 0 }); },

  s30(ctx, t, q) { bg(ctx, 'schema'); bodemmonster(ctx, 380, 480, 1.2, 1);
    ['juiste meststof', 'hoeveelheid', 'moment', 'plek'].forEach((s2, i) => tag(ctx, s2, 1100, 300 + i * 90, C.groen, q.on(i ? s2 : 'meststof', 1), 'center', 32));
    const W2 = q.on('weegt', 1); if (W2 > 0.01) { ctx.save(); ctx.globalAlpha *= W2; weegschaal(ctx, 1500, 560, 0, 1, 'oogst', 'water'); ctx.restore(); }
    regel(ctx, 'genoeg oogst, en schoon grondwater', 960, 840, q.on('genoeg', 1), C.goud, 40, 'center', 700); },

  // ---------- Recap ----------
  s31(ctx, t, q) { const P = q.on('Kleigrond', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; decor(ctx, 'moestuin', 0.6); tweeBakken(ctx, t, 1, 1);
      persoon(ctx, 'yasmin', 400, GROND, 420, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'henk', 1560, GROND, 440, { t, kijk: -1, pose: 'wijs' });
      const G = q.on('gieter', 1); for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; ion(ctx, 700 + i * 28, 880 + ph * 20, 'NO3', 0.6, G * Math.sin(ph * 3.14) * (1 - q.on('Kleigrond', 1)), { vast: 0 }); }
      tag(ctx, 'te weinig stikstof: bleke onderste bladeren', 760, 330, C.koraal, q.on('bleke', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'schema'); ctx.globalAlpha = P; ['schudproef', 'wie maakt de grond?', 'proefveldje', 'druppelbak'].forEach((s2, i) => kaartje(ctx, 150 + i * 420, 300, 380, s2, [BODEM.kleiR, C.groen, C.goud, C.teal][i], 1));
      tag(ctx, 'klei houdt water en positieve ionen vast', 960, 520, C.groen, 1, 'center', 32); tag(ctx, 'de grond én de stof die het meest tekortschiet', 960, 640, C.goud, q.on('Welke', 1), 'center', 32); ctx.restore(); } },

  s32(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Waar leer je dit?', 140, 200, 1, C.text, 64, 'left', 700);
    [['mbo', 'Vakexpert teelt en groene technologie', 'MBO 4', 'mbo'], ['hbo', 'Tuinbouw en Akkerbouw', 'O.A. DEN BOSCH', 'hbo'], ['wo', 'Plantenwetenschappen', 'WAGENINGEN', 'Wageningen']].forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 140, 290 + i * 170, 1100, 140, 18); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); text(ctx, n, 190, 375 + i * 170, fTitel(48), C.groen); text(ctx, o, 330, 370 + i * 170, fTekst(44, 700), C.text); metaText(ctx, m, 330, 410 + i * 170, C.grain, 'left', 24); ctx.restore(); });
    regel(ctx, 'akkerbouwer · teeltadviseur · bodemspecialist · onderzoeker', 140, 830, q.on('akkerbouwer', 1), C.text2, 36, 'left', 600);
    tomatenplant(ctx, 1600, 760, 380, t, { blad: 6, trossen: [0.7, 0.4] }); ctx.fillStyle = BODEM.grond; ctx.fillRect(1440, 760, 320, 70); }
});
