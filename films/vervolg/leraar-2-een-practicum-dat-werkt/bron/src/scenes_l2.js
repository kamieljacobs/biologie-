// Wat word jij? · Leraar biologie · Een practicum dat werkt — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Mevrouw Visser als docent; Lotte en Daan, Noor en Yasmin).
// Rode draad: het gistpracticum, eerst als kookboek, dan als onderzoek.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// labtafel onderin
function tafel(ctx, y = 760) { ctx.fillStyle = '#3A4458'; ctx.fillRect(80, y, 1760, 26); ctx.fillStyle = '#2A3242'; ctx.fillRect(140, y + 26, 30, 110); ctx.fillRect(1750, y + 26, 30, 110); }

Object.assign(SCENES, {
  title(ctx, t) { gistFles(ctx, 1500, 640, 1.2, 1, 0.55 + 0.1 * Math.sin(t * 0.9), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const W = q.on('week', 1, 0.8);
    if (W < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - W; tafel(ctx); persoon(ctx, 'lotte', 300, 880, 400, { t, outfit: 'practicum', kijk: 1, uit: 'blij' }); persoon(ctx, 'daan', 480, 880, 370, { t, kijk: 1, uit: 'neutraal', outfit: 'practicum' });
      werkblad(ctx, 640, 300, q.on('werkblad', 1), clamp((t - q.at('werkblad', 1)) * 1.6, 0, 10)); const op = clamp((t - q.at('zwelt', 1) + 0.5) / 2.5, 0, 1);
      waterbad(ctx, 1350, 700, 360, q.on('water', 1)); gistFles(ctx, 1350, 640, 1, q.on('fles', 1), op * q.on('ballon', 1), t); chip(ctx, 'precies zoals het hoort', 1350, 230, C.groen, q.on('hoort', 1), 28); ctx.restore(); }
    if (W > 0.01) { ctx.save(); ctx.globalAlpha *= W; metaA(ctx, 'EEN WEEK LATER', 160, 200, 1, C.grain, 'left', 28); persoon(ctx, 'visser', 620, 880, 470, { t, kijk: 1, uit: 'blij', pose: 'wijs' }); bubbel(ctx, 760, 300, 'wat liet die proef zien?', '#F2F2EE', q.on('proef', 1), 32);
      persoon(ctx, 'lotte', 1180, 880, 400, { t, kijk: -1, uit: 'verbaasd' }); persoon(ctx, 'daan', 1380, 880, 370, { t, kijk: -1, uit: 'verbaasd' }); vraagteken(ctx, 1290, 380, q.on('niet', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const T = q.on('niveaus', 1, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; metaA(ctx, 'ENGELSE ONDERZOEKERS · 25 PRACTICUMLESSEN', 160, 230, q.on('onderzoekers', 1), C.grain, 'left', 26);
      tafel(ctx); persoon(ctx, 'lotte', 760, 880, 400, { t, outfit: 'practicum', uit: 'neutraal' }); persoon(ctx, 'daan', 960, 880, 370, { t, uit: 'neutraal', outfit: 'practicum' }); gistFles(ctx, 1250, 650, 0.9, 1, 0.6, t);
      tag(ctx, 'handen bezig', 600, 380, C.groen, q.on('handen', 1), 'center', 30); tag(ctx, 'hoofd niet', 1100, 380, C.koraal, q.on('hoofd', 1), 'center', 30); chip(ctx, 'weinig nagedacht over de ideeën', 860, 300, C.koraal, q.on('ideeën', 1), 26); ctx.restore(); }
    if (T > 0.01) trap(ctx, 300, 640, T, [q.on('bevestigen', 1), q.on('gestructureerd', 1), q.on('begeleid', 1), q.on('open', 1)], t > q.at('trap', 1) ? -1 : (t > q.at('open', 1) ? 3 : t > q.at('begeleid', 1) ? 2 : t > q.at('gestructureerd', 1) ? 1 : 0));
    if (T > 0.01) { pijl(ctx, 260, 760, 1360, 260, C.goud, q.on('trap', 1), 5, 20); tag(ctx, 'meer zelf nadenken', 1500, 220, C.goud, q.on('nadenken', 1), 'center', 30); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'visser', 260, 880, 440, { t, outfit: 'practicum', kijk: 1, uit: 'neutraal', pose: 'denk' }); naamBij(ctx, 'Mevrouw Visser', 'kiest begeleid onderzoek', 120, 330, q.on('begeleid', 1));
    vraagKaartje(ctx, 620, 260, 1100, 'Hoe werkt gist?', q.on('Hoe', 1)); vraagKaartje(ctx, 620, 400, 1100, 'Maakt gist meer gas bij 20 of bij 35 graden?', q.on('Maakt', 1)); vraagKaartje(ctx, 620, 540, 1100, 'Welke kleur ballon zwelt het snelst op?', q.on('kleur', 1));
    klokje(ctx, 1170, 760, 60, 50 / 60, q.on('vijftig', 1)); regel(ctx, '50 minuten', 1260, 778, q.on('vijftig', 1), C.text, 32, 'left', 700); vraagteken(ctx, 1780, 380, q.on('denk', 1), 100); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const G = q.on('middelste', 1, 0.8);
    vraagKaartje(ctx, 160, 230, 1000, 'Hoe werkt gist?', 1 - G * 0.6, q.on('groot', 1) > 0.5 ? 'te groot' : '', C.koraal); vraagKaartje(ctx, 160, 370, 1000, 'Maakt gist meer gas bij 20 of bij 35 graden?', 1, G > 0.5 ? 'past' : '', C.groen, G > 0.5); vraagKaartje(ctx, 160, 510, 1000, 'Welke kleur ballon zwelt het snelst op?', 1 - G * 0.6, q.on('klein', 1) > 0.5 ? 'te klein' : '', C.koraal);
    const V = q.on('verandert', 1); if (V > 0.01) { waterbad(ctx, 1380, 700, 260, V, '20 °C'); gistFles(ctx, 1380, 640, 0.75, V, 0.2, t); waterbad(ctx, 1700, 700, 260, V, '35 °C'); gistFles(ctx, 1700, 640, 0.75, V, 0.85, t); chip(ctx, 'één ding verandert, de rest blijft gelijk', 1540, 330, C.goud, q.on('gelijk', 1), 26); }
    tag(ctx, 'film: Onderzoek doen', 1540, 230, C.teal, q.on('Onderzoek', 2), 'center', 26); chip(ctx, 'past bij tijd, materiaal en voorkennis', 660, 720, C.groen, q.on('materiaal', 1), 28); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); tafel(ctx); persoon(ctx, 'noor', 220, 880, 400, { t, kijk: 1, uit: 'blij', outfit: 'practicum' }); persoon(ctx, 'yasmin', 400, 880, 400, { t, outfit: 'practicum', kijk: 1, uit: q.on('roept', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('roept', 1) > 0.5 ? 'wijsOmhoog' : 'staan' });
    waterbad(ctx, 760, 700, 260, 1, '20 °C'); gistFles(ctx, 760, 640, 0.75, 1, 0.15, t); waterbad(ctx, 1080, 700, 260, 1, '35 °C'); gistFles(ctx, 1080, 640, 0.75, 1, 0.35 + 0.55 * clamp(t / 3, 0, 1), t); chip(ctx, 'bijna slap', 760, 260, C.koraal, q.on('slap', 1), 26);
    persoon(ctx, 'visser', 1560, 880, 460, { t, a: q.on('roept', 1, 0.3), outfit: 'practicum', kijk: -1, uit: 'neutraal' }); bubbel(ctx, 600, 300, 'klopt onze uitkomst?', '#F2F2EE', q.on('klopt', 1), 30); vraagteken(ctx, 1780, 300, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); persoon(ctx, 'visser', 1560, 880, 460, { t, outfit: 'practicum', kijk: -1, uit: 'blij', pose: 'wijs' }); persoon(ctx, 'noor', 260, 880, 400, { t, kijk: 1, uit: 'neutraal', pose: 'denk', outfit: 'practicum' }); persoon(ctx, 'yasmin', 440, 880, 400, { t, kijk: 1, uit: 'neutraal', outfit: 'practicum' });
    bubbel(ctx, 1220, 280, 'wat had je verwacht?', '#F2F2EE', q.on('vraag', 1), 30); chip(ctx, 'ja of nee: het denken stopt', 960, 400, C.koraal, q.on('stopt', 1) * (1 - q.on('enzymen', 1)), 26);
    tag(ctx, 'net als voorspellen, waarnemen, verklaren', 860, 220, C.teal, q.on('voorspellen', 1), 'center', 26);
    chip(ctx, 'enzymen: sneller als het warmer is, tot ± 40 °C', 900, 420, C.goud, q.on('enzymen', 1), 26); chip(ctx, 'ontsnapt er gas?', 900, 510, C.koraal, q.on('ontsnapt', 1), 26);
    regel(ctx, 'laten worstelen, niet laten verdrinken', 960, 640, q.on('worstelen', 1), C.goud, 40, 'center', 800); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); verslag(ctx, 380, 230, 'A', q.on('Groep', 1)); verslag(ctx, 1180, 230, 'B', q.on('Groep', 2)); chip(ctx, 'mooie grafiek, geen uitleg', 560, 760, C.oker, q.on('niets', 1), 26); chip(ctx, 'ballon lekte · goed uitgelegd', 1360, 760, C.teal, q.on('misging', 1), 26); vraagteken(ctx, 960, 470, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); verslag(ctx, 200, 260, 'B', 1); ['vraag', 'opzet', 'uitvoering', 'conclusie', 'discussie'].forEach((n, i) => { const a = q.on(n, 1); if (a <= 0.01) return; stapKaartL(ctx, 700, 230 + i * 100, 520, n, a); });
    chip(ctx, 'niet alleen het resultaat', 1500, 300, C.goud, q.on('resultaat', 1), 28); chip(ctx, 'snappen waarom het misging = veel geleerd', 1500, 640, C.groen, q.on('geleerd', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('regel', 1, 0.8); tafel(ctx, 820);     persoon(ctx, 'lotte', 260, 880, 400, { t, uit: 'blij' }); persoon(ctx, 'daan', 440, 880, 370, { t, uit: 'blij' }); chip(ctx, 'een echte vraag + een leraar die terugvraagt', 520, 230, C.goud, q.on('terugvraagt', 1) * (1 - R), 28);
    dienblad(ctx, 1200, 780, R, t); naamBij(ctx, 'toa', 'technisch onderwijsassistent', 1200, 520, q.on('technisch', 1), 'center'); persoon(ctx, 'visser', 1720, 880, 440, { t, a: clamp(R * 3 - 2, 0, 1), outfit: 'practicum', kijk: -1, uit: 'blij' }); },
  s15(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'lerarenopleiding', 960, 260, C.teal, q.on('lerarenopleiding', 1), 'center', 36); chip(ctx, 'biologie', 700, 380, C.text2, q.on('biologie', 1), 30); chip(ctx, 'hoe je anderen laat leren', 1220, 380, C.goud, q.on('anderen', 1), 30); chip(ctx, 'een practicum opzetten', 960, 480, C.groen, q.on('practicum', 1), 30);
    persoon(ctx, 'visser', 960, 880, 340, { t, outfit: 'practicum', uit: 'blij', pose: 'wijs' }); }
});
// regel van de beoordelingslijst
function stapKaartL(ctx, x, y, w, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 80, 12); shape(ctx, rgba(C.teal, 0.16), C.teal, 2); text(ctx, s2, x + 30, y + 52, fTekst(32, 700), C.text, 'left'); vink_(ctx, x + w - 50, y + 40, 16, 1); ctx.restore(); }
