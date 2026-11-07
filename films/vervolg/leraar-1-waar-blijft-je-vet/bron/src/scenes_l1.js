// Wat word jij? · Leraar biologie · Waar blijft je vet? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Mevrouw Visser als docent; Sam, Noor, Daan, Yasmin).
// Rode draad: één vraag van Mevrouw Visser aan de klas.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// lokaal: bord links, Visser ervoor, leerlingen rechts
function lokaal(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  schoolbord(ctx, 120, 170, 760, 380, 1, o.bord || []);
  persoon(ctx, 'visser', 980, 880, 470, { t, pose: o.pose || 'wijs', kijk: 1, uit: o.uitV || 'blij' });
  persoon(ctx, 'daan', 1380, 880, 380, { t, kijk: -1, uit: o.uitL || 'neutraal' }); persoon(ctx, 'noor', 1560, 880, 400, { t, kijk: -1, uit: o.uitL || 'neutraal' });
  persoon(ctx, 'sam', 1740, 880, 420, { t, kijk: -1, uit: o.uitSam || 'blij', outfit: 'sport' }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { vetMolecuul(ctx, 1380, 560, 0.85, 1, 0.35 + 0.1 * Math.sin(t * 0.8), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    lokaal(ctx, t, { bord: [['Sam: tien kilo afgevallen', q.on('Sam', 1)], ['Waar is dat vet gebleven?', q.on('Waar', 1)]], uitSam: 'lacht' });
    naamBij(ctx, 'Mevrouw Visser', 'docent biologie', 1040, 330, q.on('Visser', 1)); chip(ctx, '−10 kilo', 1760, 300, C.goud, q.on('kilo', 1), 30); vraagteken(ctx, 1640, 250, q.on('denk', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const u = clamp((t - q.at('terecht', 1)) / 4, 0, 1);
    vetMolecuul(ctx, 330, 430, 0.85, 1, u, t); naamBij(ctx, 'vetmolecuul', 'C, H en O', 250, 610, 1 - u * 0.7);
    const k1 = q.on('koolstofdioxide', 1), k2 = q.on('water', 1); if (k1 > 0.01) { ctx.save(); ctx.globalAlpha *= k1; atoom(ctx, 'O', 1366, 318, 0.8); atoom(ctx, 'C', 1392, 318, 0.8); atoom(ctx, 'O', 1418, 318, 0.8); ctx.restore(); } tag(ctx, 'koolstofdioxide', 1450, 330, C.grain, k1, 'left', 30);
    if (k2 > 0.01) { ctx.save(); ctx.globalAlpha *= k2; atoom(ctx, 'O', 1392, 404, 0.8); atoom(ctx, 'H', 1372, 418, 0.8); atoom(ctx, 'H', 1412, 418, 0.8); ctx.restore(); } tag(ctx, 'water', 1450, 420, C.teal, k2, 'left', 30);
    kiloStaaf(ctx, 300, 700, 1320, q.on('kilo', 1), clamp((t - q.at('kilo', 1)) / 3, 0, 1)); chip(ctx, 'energie komt vrij · de atomen blijven bestaan', 960, 850, C.goud, q.on('ergens', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Alles', 1, 0.8);
    metaA(ctx, 'ENQUÊTE · 2014 · 150 ARTSEN, DIËTISTEN EN TRAINERS', 160, 200, q.on('Onderzoekers', 1) * (1 - B), C.grain, 'left', 26);
    groep(ctx, 200, 300, 150, 25, 52, 13, i => (q.on('drie', 1) > 0.5 && i >= 147) ? C.groen : (q.on('meesten', 1) > 0.5 && i < 120 ? C.koraal : '#5A6478'), q.on('honderdvijftig', 1) * (1 - B));
    chip(ctx, 'de meesten: het vet wordt energie', 700, 720, C.koraal, q.on('meesten', 1) * (1 - B), 28); chip(ctx, 'goed: 3', 1500, 720, C.groen, q.on('drie', 1) * (1 - B), 28);
    if (B > 0.01) { tag(ctx, 'film: Alles in het groen', 480, 240, C.teal, B, 'center', 28); ctx.save(); ctx.globalAlpha *= B; ctx.fillStyle = '#6B4A30'; ctx.fillRect(470, 420, 30, 220); circ(ctx, 485, 380, 120, rgba(C.chloro, 0.85), C.chloro, 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(330, 640, 310, 50); ctx.restore();
      tag(ctx, 'hout uit de grond?', 485, 760, C.koraal, q.on('grond', 1), 'center', 30); kruis(ctx, 700, 740, 22, q.on('grond', 1) * 0.9);
      regel(ctx, 'hardnekkig, ook bij slimme mensen', 1300, 420, q.on('hardnekkig', 1), C.text, 40, 'center', 700); vraagteken(ctx, 1300, 640, q.on('Waarom', 1), 120); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const S = q.on('stappen', 1, 0.8), K = q.on('Noor', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S; persoon(ctx, 'daan', 520, 880, 400, { t, uit: 'neutraal', pose: 'denk' });
      ideeWolk(ctx, 960, 400, 640, 360, q.on('idee', 1), [['vet → energie', C.koraal], ['hout ← grond', C.koraal]], 'vet → koolstofdioxide', q.on('vastgeplakt', 1, 2.5), t);
      chip(ctx, 'geen leeg vat', 520, 240, C.goud, q.on('vat', 1), 28); chip(ctx, 'oude idee blijft staan', 960, 680, C.koraal, q.on('staan', 1), 28); chip(ctx, 'eerst zichtbaar maken', 1500, 700, C.teal, q.on('zichtbaar', 1), 28); ctx.restore(); }
    if (S > 0.01) { const k1 = q.on('voorspellen', 1), k2 = q.on('kijken', 1), k3 = q.on('verklaren', 1);
      stapKaart(ctx, 120, 230, 470, 1, 'voorspellen', S * k1, C.teal, q.at('kijken', 1) > t ? 1 : 0.4); stapKaart(ctx, 120, 350, 470, 2, 'waarnemen', S * k2, C.teal, t >= q.at('kijken', 1) && t < q.at('verklaren', 1) ? 1 : 0.4); stapKaart(ctx, 120, 470, 470, 3, 'verklaren', S * k3, C.teal, t >= q.at('verklaren', 1) ? 1 : 0.4);
      if (K > 0.01) { ctx.save(); ctx.globalAlpha *= S; persoon(ctx, 'noor', 860, 880, 400, { t, a: K, kijk: 1, uit: 'neutraal' });
        const bt = q.at('troebel', 1); kalkBuis(ctx, 1140, 560, 0.85, K, clamp((t - bt + 1) / 2, 0, 1), t > q.at('blaast', 1) ? 1 : 0, t, 'uitgeademde lucht');
        kalkBuis(ctx, 1480, 560, 0.85, q.on('tweede', 1), 0, t > q.at('gewone', 2) ? 1 : 0, t, 'gewone lucht'); chip(ctx, 'troebel: meer koolstofdioxide', 1140, 240, C.grain, q.on('troebel', 1), 26); chip(ctx, 'helder', 1480, 240, C.teal, q.on('helder', 1), 26); ctx.restore(); }
      tag(ctx, 'daarom stelt deze film steeds eerst een vraag', 960, 860, C.goud, q.on('Daarom', 1), 'center', 30); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'AMERIKAANSE ONDERZOEKERS · STUDENTEN LEREN EEN TEKST', 160, 180, q.on('onderzoekers', 1), C.grain, 'left', 26);
    regel(ctx, 'groep A', 200, 330, q.on('ene', 1), C.oker, 36, 'left', 800); regel(ctx, 'groep B', 200, 600, q.on('andere', 1), C.groen, 36, 'left', 800);
    for (let i = 0; i < 4; i++) leerTegel(ctx, 420 + i * 160, 250, 'lees', q.on('vier', 1) * clamp((t - q.at('vier', 1)) * 3 - i, 0, 1));
    leerTegel(ctx, 420, 520, 'lees', q.on('één', 1)); for (let i = 0; i < 3; i++) leerTegel(ctx, 580 + i * 160, 520, 'ophaal', q.on('schreef', 1) * clamp((t - q.at('schreef', 1)) * 3 - i, 0, 1));
    chip(ctx, 'zonder te kijken', 820, 760, C.groen, q.on('kijken', 1), 26); chip(ctx, 'direct na afloop: groep A iets beter', 1500, 400, C.oker, q.on('Direct', 1), 26); regel(ctx, 'na een week?', 1500, 560, q.on('week', 1), C.goud, 44, 'center', 800); vraagteken(ctx, 1500, 720, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const L = q.on('Leren', 1, 0.8);
    onthoudStaven(ctx, 200, 280, 760, 420, 1, 1, clamp((t - 0.3) / 2, 0, 1));
    chip(ctx, 'leesgroep dacht zelf: wij kennen het beter', 1400, 300, C.oker, q.on('dacht', 1), 26); chip(ctx, 'herlezen voelt vertrouwd', 1400, 400, C.oker, q.on('vertrouwd', 1), 26); chip(ctx, 'ophalen versterkt het spoor', 1400, 500, C.groen, q.on('versterkt', 1), 26);
    tag(ctx, 'film: Leren en onthouden · gespreid oefenen', 1400, 620, C.teal, L, 'center', 26); tag(ctx, 'zoals de vragen in deze film', 1400, 740, C.goud, q.on('Zoals', 1), 'center', 30); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Darmvlokken', 1, 0.8);
    boekenRij(ctx, 590, 300, (1 - D) * q.on('hoofdstukken', 1), q.on('draden', 1, 2) * (1 - D)); regel(ctx, 'losse hoofdstukken?', 960, 640, q.on('losse', 1) * (1 - D), C.text2, 34, 'center', 700);
    darmvlok(ctx, 440, 520, 1.1, D); naamBij(ctx, 'darmvlokken', 'dunne darm', 440, 720, D, 'center');
    longblaasjes(ctx, 960, 500, 1.1, q.on('Longblaasjes', 1)); naamBij(ctx, 'longblaasjes', 'longen', 960, 720, q.on('Longblaasjes', 1), 'center');
    wortelharen(ctx, 1480, 500, 1.2, q.on('Wortelharen', 1)); naamBij(ctx, 'wortelharen', 'plant', 1480, 720, q.on('Wortelharen', 1), 'center'); vraagteken(ctx, 960, 230, q.on('gemeen', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const M = q.on('mitochondrium', 1);
    darmvlok(ctx, 300, 430, 0.85, 1); longblaasjes(ctx, 720, 410, 0.85, 1); wortelharen(ctx, 1140, 410, 0.95, 1); mitochondrion(ctx, 1600, 420, 300, 0.2, M, 6, t); naamBij(ctx, 'mitochondrium', 'plooien: enzymen', 1600, 580, M, 'center'); naamBij(ctx, 'darmvlokken', '', 300, 580, 1, 'center'); naamBij(ctx, 'longblaasjes', '', 720, 580, 1, 'center'); naamBij(ctx, 'wortelharen', '', 1140, 580, 1, 'center');
    if (q.on('oppervlak', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('oppervlak', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const L = M > 0.5 ? 1 : 0.72; for (let k = 0; k <= 80 * L; k++) { const f = k / 80, xx = 160 + f * 1640, yy = 690 + Math.sin(f * 14) * 14; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
    regel(ctx, 'groot idee: oppervlak vergroten', 960, 775, q.on('oppervlak', 1), C.goud, 40, 'center', 800); chip(ctx, 'niet alles los onthouden', 700, 850, C.text2, q.on('los', 1), 26); chip(ctx, 'een les rond een groot idee', 1300, 850, C.goud, q.on('idee', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); lokaal(ctx, t, { bord: [['voorspellen · waarnemen · verklaren', q.on('denkt', 1)], ['ophalen, niet herlezen', q.on('onthoudt', 1)], ['groot idee: oppervlak vergroten', q.on('onthoudt', 1)]], uitL: 'blij', uitSam: 'lacht' });
    for (let i = 0; i < 6; i++) { const w = wander(i, t, 40, 0.4), f = q.on('lucht', 1); if (f < 0.01) continue; ctx.save(); ctx.globalAlpha *= f; const x = 1150 + i * 120 + w.x, y = 200 + (i % 2) * 60 + w.y; atoom(ctx, 'O', x - 26, y, 0.8); atoom(ctx, 'C', x, y, 0.8); atoom(ctx, 'O', x + 26, y, 0.8); ctx.restore(); }
    chip(ctx, 'het vet van Sam', 1500, 330, C.grain, q.on('lucht', 1), 26); },
  s15(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'hbo-lerarenopleiding', 560, 280, C.teal, q.on('hbo', 1), 'center', 34); regel(ctx, 'o.a. onderbouw, vmbo en mbo · tweedegraads', 560, 360, q.on('vmbo', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'master: hbo of universiteit', 1360, 280, C.teal, q.on('master', 1), 'center', 34); regel(ctx, 'ook bovenbouw havo en vwo · eerstegraads', 1360, 360, q.on('master', 1), C.text2, 30, 'center', 600);
    pijl(ctx, 800, 300, 1100, 300, C.line, q.on('daarna', 1), 4, 16);
    persoon(ctx, 'visser', 960, 880, 360, { t, pose: 'wijs', uit: 'blij' }); chip(ctx, 'al tijdens je opleiding: stage voor de klas', 960, 450, C.goud, q.on('klas', 1), 28); }
});
