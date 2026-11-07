// Wat word jij? · Fysiotherapie 2 · Opnieuw leren bewegen — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Opa Henk, Fysiotherapeut Femke).
// Rode draad: Henks rechterarm, van de eerste dagen tot een kopje koffie.

Object.assign(SCENES, {
  title(ctx, t) { breinBoven(ctx, 1600, 640, 0.95, 1, { motor: 1, schade: 1, nieuw: 0.5 + 0.5 * Math.sin(t * 0.8), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Drie', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; metaA(ctx, 'EEN PAAR JAAR GELEDEN', 160, 200, q.on('jaar', 1), C.grain, 'left', 28);
      roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); persoon(ctx, 'henk', 980, 860, 470, { t, outfit: 'gewoon', uit: q.on('lepel', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
      const lv = clamp((t - q.at('lepel', 1)) / 0.8, 0, 1); ctx.save(); ctx.translate(820, 560 + lv * 80); ctx.rotate(lv * 2); ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(20, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(30, 0, 14, 9, 0, 0, 6.283); ctx.fillStyle = '#D8DEE4'; ctx.fill(); ctx.restore();
      naamBij(ctx, 'Opa Henk', 'beroerte', 1080, 340, q.on('Henk', 1)); tag(ctx, 'rechterhand: niets', 820, 470, C.koraal, q.on('rechterhand', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; metaA(ctx, 'DRIE DAGEN LATER', 160, 200, 1, C.grain, 'left', 28); henkBed(ctx, 800, 640, t, { H: 470, uit: 'neutraal' });
      persoon(ctx, 'femke', 1460, 860, 480, { t, outfit: 'werk', kijk: -1, pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1520, 330, q.on('Femke', 1));
      tag(ctx, '1 · strek je vingers', 1080, 330, C.goud, q.on('vingers', 1), 'center', 32); tag(ctx, '2 · til je arm opzij', 1080, 400, C.goud, q.on('opzij', 1), 'center', 32); vraagteken(ctx, 1200, 280, q.on('Waarom', 1), 100); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const N = q.on('Nederlands', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; const sch = q.on('sterven', 1, 1.2), rt = q.on('kruisen', 1, 2);
      breinBoven(ctx, 600, 400, 1, 1, { motor: q.on('plant', 1), schade: sch, route: Math.max(rt, q.on('banen', 1) * 0.35), t });
      naamBij(ctx, 'links', 'schade', 370, 420, q.on('links', 1), 'right'); naamBij(ctx, 'bewegingsgebied', 'plant beweging', 600, 170, q.on('plant', 1), 'center'); verwijs(ctx, 'Het hoofdkantoor', 600, 820, q.on('hoofdkantoor', 1));
      armSchema(ctx, 1150, 520, 1, q.on('rechterarm', 1), { heel: q.on('heel', 1), act: 0 }); naamBij(ctx, 'rechterarm', 'spieren en zenuwen heel', 1300, 330, q.on('rechterarm', 1));
      tag(ctx, 'geen opdracht', 1400, 700, C.koraal, q.on('opdracht', 1), 'center', 30); kruis(ctx, 1000, 620, 26, q.on('opdracht', 1)); ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; metaA(ctx, 'BINNEN DRIE DAGEN: VINGERS STREKKEN EN ARM OPZIJ?', 160, 240, 1);
      regel(ctx, 'lukt', 160, 340, q.on('strekken', 1), C.groen, 40, 'left', 700); stippen(ctx, 160, 380, 100, Math.round(98 * q.on('achtennegentig', 1, 1.5)), C.groen, q.on('strekken', 1), 25, 12, 30); regel(ctx, '98 van de 100', 950, 440, q.on('achtennegentig', 1), C.groen, 44, 'left', 700);
      regel(ctx, 'lukt niet (allebei)', 160, 590, q.on('Lukt', 1), C.koraal, 40, 'left', 700); stippen(ctx, 160, 630, 100, Math.round(25 * q.on('kwart', 1, 1.2)), C.koraal, q.on('Lukt', 1), 25, 12, 30); regel(ctx, '± 25 van de 100', 950, 690, q.on('kwart', 1), C.koraal, 44, 'left', 700);
      metaA(ctx, 'NA EEN HALF JAAR: WEER IETS MET DE HAND', 160, 820, q.on('half', 1)); persoon(ctx, 'henk', 1650, 860, 420, { t, outfit: 'gewoon', uit: 'blij', a: q.on('klein', 1, 0.3) }); tag(ctx, 'lukt een klein beetje', 1650, 380, C.groen, q.on('klein', 1), 'center', 28); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Maar', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; naamBij(ctx, 'motorische eenheid', 'één neuron + zijn spiervezels', 160, 220, q.on('eenheid', 1));
      motorEenheid(ctx, 200, 420, 1, 10, q.on('oogspier', 1), 0, C.goud, t); tag(ctx, 'oogspier: ± 10 vezels', 420, 560, C.goud, q.on('tien', 1), 'center', 28);
      motorEenheid(ctx, 1000, 440, 1, 60, q.on('kuit', 1), 0, C.goud, t); tag(ctx, 'kuit: meer dan 1000', 1260, 640, C.goud, q.on('duizend', 1), 'center', 28);
      const k = q.on('kracht', 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; chip(ctx, 'meer eenheden aan', 600, 760, C.groen, q.on('zet', 1)); chip(ctx, 'sneller vuren', 1060, 760, C.groen, q.on('vuren', 1)); ctx.restore(); } ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; persoon(ctx, 'noor', 960, 860, 520, { t, outfit: 'school', pose: q.on('neus', 1) > 0.5 ? 'denk' : 'staan', uit: 'neutraal' }); tag(ctx, 'ogen dicht', 960, 260, C.teal, q.on('ogen', 1), 'center', 30); vraagteken(ctx, 1300, 380, q.on('Hoe', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const H = q.on('beroerte', 1, 0.8), rek = 0.5 + 0.5 * Math.sin(t * 1.3);
    if (H < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - H; spierSpoel(ctx, 640, 560, 760, rek, q.on('spierspoeltjes', 1), t, q.on('melden', 1)); naamBij(ctx, 'spierspoeltje', 'meet hoe ver de spier is uitgerekt', 460, 680, q.on('spierspoeltjes', 1));
      breinBoven(ctx, 1450, 340, 0.8, q.on('kaart', 1), { t }); const k = q.on('kaart', 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.strokeRect(1250, 560, 400, 240); ctx.restore(); persoon(ctx, 'noor', 1450, 790, 200, { t, outfit: 'school', a: k }); }
      tag(ctx, 'spiergevoel', 1450, 120, C.teal, q.on('spiergevoel', 1), 'center', 34); ctx.restore(); }
    if (H > 0.01) { ctx.save(); ctx.globalAlpha *= H; roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); kopje(ctx, 880, 560, 1.2); ctx.save(); ctx.translate(1060, 0); ctx.scale(-1, 1); persoon(ctx, 'henk', 0, 860, 470, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'wijs' }); ctx.restore();
      tag(ctx, 'kijken nodig', 1060, 300, C.oker, q.on('kijken', 1), 'center', 30); tag(ctx, 'naast het kopje', 640, 500, C.koraal, q.on('naast', 1), 'center', 28); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('Maar', 1, 0.8);
    breinBoven(ctx, 600, 420, 1.1, 1 - M * 0.7, { motor: 1, schade: 1, nieuw: q.on('overnemen', 1, 2.5), t }); naamBij(ctx, 'dode cellen', 'komen niet terug', 600, 200, q.on('dode', 1) * (1 - q.on('Gezonde', 1)), 'center');
    naamBij(ctx, 'nieuwe verbindingen', 'gezonde cellen nemen werk over', 600, 680, q.on('overnemen', 1) * (1 - M), 'center'); verwijs(ctx, 'Leren en onthouden', 600, 780, q.on('Leren', 1) * (1 - M));
    regel(ctx, 'plasticiteit', 1150, 260, q.on('plasticiteit', 1), C.groen, 56, 'left', 700);
    const tl = q.on('herstel', 1); if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl * (1 - M); assen(ctx, 1150, 360, 600, 260, 'TIJD', 'HERSTEL'); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50, px = 1150 + u * 600, py = 620 - 230 * (1 - Math.exp(-u * 5)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); metaA(ctx, 'EERSTE WEKEN TOT ± 3 MAANDEN', 1170, 680, 1, C.groen); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; persoon(ctx, 'henk', 1450, 860, 470, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'schouders' }); tag(ctx, 'links gaat makkelijk', 1450, 300, C.oker, q.on('links', 1), 'center', 30); vraagteken(ctx, 1150, 420, q.on('helpt', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const kr = clamp((t - q.at('kwijt', 1)) / 2, 0, 1);
    breinBoven(ctx, 600, 440, 1.2, 1, { motor: 1, schade: 1, arm: 1 - 0.55 * kr, t }); naamBij(ctx, 'armgebied', 'krimpt', 440, 220, q.on('stukje', 1), 'center');
    regel(ctx, 'aangeleerd niet-gebruik', 1100, 300, q.on('aangeleerd', 1), C.koraal, 46, 'left', 700); 
    armSchema(ctx, 1150, 560, 0.9, q.on('werk', 1), { act: q.on('werk', 1), buig: 0.4 + 0.2 * Math.sin(t * 2) }); tag(ctx, 'rechts aan het werk', 1400, 760, C.groen, q.on('werk', 1), 'center', 30); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('dierproeven', 1, 0.6), Z = q.on('zelf', 1, 0.8), ME = q.on('meet', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; regel(ctx, 'echte taken', 160, 230, q.on('taken', 1), C.goud, 48, 'left', 700); kopje(ctx, 450, 480, 1.3, q.on('kopje', 1)); sleutel(ctx, 900, 470, 1.4, q.on('sleutel', 1), Math.sin(t * 2) * 0.6); knoop(ctx, 1350, 470, 2, q.on('knoop', 1));
      tag(ctx, 'niet zomaar een arm optillen', 900, 700, C.text2, q.on('zomaar', 1), 'center', 28); ctx.restore(); }
    if (D * (1 - Z) > 0.01) { ctx.save(); ctx.globalAlpha *= D * (1 - Z); metaA(ctx, 'HERHALINGEN PER DAG / PER SESSIE', 160, 220, 1);
      balk(ctx, 160, 300, 1500, 1 * q.on('honderden', 1, 1.5), C.groen, 'dieren in onderzoek: honderden per dag', q.on('dieren', 1)); balk(ctx, 160, 420, 1500, 0.06 * q.on('dertig', 1, 1), C.koraal, 'mensen in een therapiesessie: ± 30', q.on('onderzoekers', 1)); regel(ctx, '± 30', 300, 448, q.on('dertig', 1), C.koraal, 36, 'left', 700); ctx.restore(); }
    if (Z * (1 - ME) > 0.01) { ctx.save(); ctx.globalAlpha *= Z * (1 - ME); ctx.save(); ctx.translate(960, 0); ctx.scale(-1, 1); persoon(ctx, 'henk', 0, 860, 480, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'wijs' }); ctx.restore(); kopje(ctx, 640, 600, 1, 1); want(ctx, 1040, 650, 0.9, q.on('want', 1)); naamBij(ctx, 'want om links', '', 1100, 540, q.on('want', 1)); persoon(ctx, 'femke', 1550, 860, 460, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); tag(ctx, 'dan moet rechts wel', 960, 260, C.groen, q.on('rechts', 1), 'center', 30); ctx.restore(); }
    if (ME > 0.01) { ctx.save(); ctx.globalAlpha *= ME; blokjesBak(ctx, 160, 300, 1.2, clamp((t - q.at('blokjes', 1)) / 3, 0, 1)); kopje(ctx, 400, 640, 1, q.on('glas', 1)); metaA(ctx, 'ELKE WEEK DEZELFDE TAKEN', 160, 260, 1);
      scoreGrafiek(ctx, 1000, 300, 700, 360, clamp((t - q.at('punten', 1)) / 4, 0, 1), q.on('punten', 1)); tag(ctx, 'te makkelijk → moeilijker', 1350, 760, C.goud, q.on('moeilijker', 1), 'center', 28); tag(ctx, 'net boven wat hij kan', 700, 820, C.groen, q.on('boven', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); persoon(ctx, 'henk', 960, 860, 480, { t, outfit: 'gewoon', uit: 'blij', pose: 'vasthouden' }); kopje(ctx, 840, 560 + 4 * Math.sin(t * 5), 1);
    metaA(ctx, 'EEN HALF JAAR LATER', 160, 200, 1); tag(ctx, 'niet zo soepel, wel zelf', 960, 270, C.groen, q.on('zelf', 1), 'center', 30);
    breinBoven(ctx, 1550, 420, 0.7, q.on('brein', 1), { motor: 1, schade: 1, nieuw: 1, route: q.on('aanleggen', 1, 2), t }); armSchema(ctx, 160, 460, 0.7, q.on('kapot', 1), { heel: 1 }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    metaA(ctx, 'REVALIDATIECENTRUM · HET TEAM', 160, 200, q.on('revalidatiecentrum', 1));
    tag(ctx, 'revalidatiearts', 480, 330, C.teal, q.on('revalidatiearts', 1), 'center', 30); tag(ctx, 'ergotherapeut: dagelijkse taken', 480, 420, C.teal, q.on('ergotherapeut', 1), 'center', 28); tag(ctx, 'logopedist: praten en slikken', 480, 510, C.teal, q.on('logopedist', 1), 'center', 28);
    tag(ctx, 'fysiotherapie: hbo', 1450, 400, C.goud, q.on('hbo', 1), 'center', 30); tag(ctx, 'daarna: specialiseren in hersenletsel', 1450, 490, C.paars, q.on('hersenletsel', 1), 'center', 28); },
});
