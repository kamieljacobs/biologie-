// Wat word jij? · Neurowetenschappen · Je brein vult het in — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Sam, Daan, Yasmin, Lotte).
// Rode draad: het gezicht in het stopcontact.

function keukenWand(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22314C'; ctx.fillRect(0, 100, W, 680); ctx.fillStyle = '#2C3E5E'; for (let i = 0; i < 12; i++) ctx.fillRect(820 + (i % 6) * 140, 560 + Math.floor(i / 6) * 100, 132, 92); ctx.fillStyle = '#5A4632'; roundRect(ctx, 620, 700, 560, 26, 8); ctx.fill(); ctx.fillRect(650, 726, 20, 154); ctx.fillRect(1130, 726, 20, 154); ctx.restore(); }
function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }

Object.assign(SCENES, {
  title(ctx, t) { stopcontact(ctx, 1450, 560, 1.15, 1, 1, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); keukenWand(ctx); persoon(ctx, 'sam', 470, 880, 560, { t, uit: q.on('Opeens', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Sam', 'aan de keukentafel', 620, 330, q.on('Sam', 1));
    stopcontact(ctx, 1320, 380, 1.1, 1, q.on('gezicht', 1, 1), t); chip(ctx, 'twee ronde gaatjes', 1320, 160, C.teal, q.on('gaatjes', 1) * (1 - q.on('gezicht', 1)), 30); chip(ctx, 'plastic', 1640, 260, C.text2, q.on('plastic', 1), 32); chip(ctx, 'toch een gezicht', 1640, 340, C.goud, q.on('Toch', 1), 32); vraagteken(ctx, 1700, 560, q.on('komt', 1), 120); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const B = q.on('binnenkrijgen', 1, 0.8);
    vlekOog(ctx, 520, 440, 1.1, 1 - B, 0); vink_(ctx, 520, 600, 30, q.on('prima', 1) * (1 - B)); regel(ctx, 'ogen: prima', 520, 680, q.on('prima', 1) * (1 - B), C.groen, 34, 'center', 700);
    pijl(ctx, 700, 440, 1060, 440, C.line, q.on('hersenen', 1) * (1 - B), 3, 16); breinGezicht(ctx, 1380, 460, 0.8, q.on('hersenen', 1) * (1 - B), q.on('gezicht', 1), t); regel(ctx, 'hersenen: maken het gezicht', 1380, 700, q.on('gezicht', 1) * (1 - B), C.goud, 34, 'center', 700);
    oogKabel(ctx, 520, 460, 1, B, { kabel: 1 }); breinZicht(ctx, 1400, 440, 0.7, B, 0, t); regel(ctx, 'wat komt er eigenlijk binnen?', 960, 760, B, C.text, 40, 'center', 700); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Scherp', 1, 0.8), T = q.on('Toch', 2, 0.8);
    oogKabel(ctx, 380, 470, 1.05, 1, { kabel: 1, vezels: q.on('zenuw', 1), gv: q.on('gele', 1), t }); chip(ctx, 'meer dan 100 miljoen lichtgevoelige cellen', 420, 230, C.koraal, q.on('honderd', 1) * (1 - S), 30); chip(ctx, 'maar ± 1 miljoen vezels', 820, 330, C.teal, q.on('vezels', 1) * (1 - S), 30);
    straatBeeld(ctx, 1000, 220, 820, 470, S * (1 - T), [1410, 455, 70]); chip(ctx, '± duimnagel aan een gestrekte arm', 1410, 760, C.goud, q.on('duimnagel', 1) * (1 - T), 30); chip(ctx, 'rest: wazig en weinig kleur', 1410, 830, C.text2, q.on('wazig', 1) * (1 - T), 30);
    straatBeeld(ctx, 1000, 220, 820, 470, T, [1410, 455, 2000]); regel(ctx, 'zo lijkt het wél', 1410, 780, T, C.text, 36, 'center', 700); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('springen', 1); const k = clamp((t - t0) * 3.5, 0, SPRONG.length - 1); const i = Math.floor(k), r = k - i; const P = SPRONG[i], P2 = SPRONG[Math.min(SPRONG.length - 1, i + 1)];
    const fx = 300 + (P[0] + (P2[0] - P[0]) * clamp(r * 4 - 3, 0, 1)) * 1320, fy = 170 + (P[1] + (P2[1] - P[1]) * clamp(r * 4 - 3, 0, 1)) * 600;
    straatBeeld(ctx, 300, 170, 1320, 600, 1, [fx, fy, 80]); sprongen(ctx, 300, 170, 1320, 600, k, q.on('springen', 1)); chip(ctx, '± 3 à 4 sprongen per seconde', 960, 140, C.goud, q.on('seconde', 1), 30); vraagteken(ctx, 1720, 840, q.on('schokken', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const M = q.on('voorspelmachine', 1, 0.8);
    if (M < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - M; const fl = (Math.sin(t * 3) > 0.6) ? 1 : 0; straatBeeld(ctx, 300, 220, 1320, 560, 1, [960, 480, 2000]); ctx.fillStyle = rgba('#121A26', 0.55 * fl * q.on('dempen', 1)); ctx.fillRect(300, 220, 1320, 560); tag(ctx, 'tijdens een sprong: sterk gedempt', 960, 860, C.koraal, q.on('dempen', 1) * (1 - q.on('rustig', 1)), 'center', 30); tag(ctx, 'stukjes van daarnet + wat ze verwachten', 960, 860, C.goud, q.on('verwachten', 1), 'center', 30); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; vergKaart(ctx, 160, 300, 420, 200, 'voorspelling', ['wat er gaat komen'], C.paars, 1); vergKaart(ctx, 160, 560, 420, 200, 'wat binnenkomt', ['uit je ogen'], C.teal, q.on('binnenkomt', 1)); pijl(ctx, 600, 400, 780, 500, C.line, q.on('vergelijken', 1), 3, 14); pijl(ctx, 600, 660, 780, 560, C.line, q.on('vergelijken', 1), 3, 14);
      circ(ctx, 880, 530, 90, '#2A3A58', C.text2, 3); text(ctx, 'vergelijk', 880, 542, fTekst(32, 700), C.text, 'center');
      vergKaart(ctx, 1080, 300, 640, 200, 'klopt', ['weinig te veranderen'], C.groen, q.on('Klopt', 1)); vergKaart(ctx, 1080, 560, 640, 200, 'klopt niet', ['valt je op'], C.koraal, q.on('Klopt', 2)); tag(ctx, 'MODEL · geen vaststaand feit', 960, 860, C.goud, q.on('model', 1), 'center', 30); ctx.restore(); } },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('stip', 1, 0.8);
    oogKabel(ctx, 520, 450, 1, 1 - S, { kabel: 1, bv: q.on('vlek', 1) }); naamBij(ctx, 'blinde vlek', 'geen lichtgevoelige cellen', 700, 560, q.on('vlek', 1) * (1 - S)); chip(ctx, 'film: Zintuigen', 1500, 220, C.teal, q.on('Zintuigen', 1) * (1 - S), 28);
    vlekOog(ctx, 1260, 420, 0.7, q.on('ogen', 1) * (1 - S), 0); vlekOog(ctx, 1560, 420, 0.7, q.on('ogen', 1) * (1 - S), 0); tag(ctx, 'het ene oog dekt het gat van het andere af', 1410, 600, C.groen, q.on('dekt', 1) * (1 - S), 'center', 28);
    blindeVlekKaart(ctx, 410, 300, 1100, S, q.on('verdwijnt', 1, 1), q.on('lijn', 1, 0.8)); metaA(ctx, 'ÉÉN OOG DICHT · KIJK NAAR HET KRUISJE', 960, 260, S, C.grain, 'center', 28); haak(ctx, 560, 1360, 760, 'je hersenen vullen het gat in', C.groen, q.on('vullen', 1)); },

  s10(ctx, t, q) { bg(ctx, 'schema'); schaakbord(ctx, 660, 160, 120, 1, { labels: q.on('vakje', 1), cilinder: 1 }); vraagteken(ctx, 1560, 520, q.on('donkerder', 1), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: precies even donker'); const R = q.on('weg', 1, 0.6), T = q.on('schaduw', 1, 0.6);
    const rest = 1 - R * (1 - T); schaakbord(ctx, 300, 160, 120, 1, { rest, strook: R * (1 - T) }); regel(ctx, 'zonder de rest: even donker', 600, 820, R * (1 - T), C.text, 34, 'center', 700);
    vergKaart(ctx, 1080, 220, 680, 230, 'schaduw maakt donkerder', ['B ligt in de schaduw', '→ "eigenlijk licht"'], C.paars, T); vergKaart(ctx, 1080, 500, 680, 190, 'je ziet niet het licht', ['maar wat je hersenen ervan maken'], C.teal, q.on('maken', 1));
    haak(ctx, 1080, 1760, 760, 'illusies laten de rekenregel zien', C.groen, q.on('illusies', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('pareidolie', 1, 0.8);
    stopcontact(ctx, 420, 430, 1, 1 - P, q.on('stippen', 1), t); breinGezicht(ctx, 1260, 420, 0.85, 1 - P, q.on('gebied', 1), t); naamBij(ctx, 'gezichtsgebied', 'reageert op gezichten', 1370, 545, q.on('gebied', 1) * (1 - P));
    chip(ctx, '2 stippen boven een streep', 420, 760, C.goud, q.on('stippen', 1) * (1 - P), 30); chip(ctx, '± 0,2 s · even snel als bij een gezicht', 1260, 800, C.teal, q.on('vijfde', 1) * (1 - P), 30); chip(ctx, 'niet pas achteraf', 1260, 160, C.groen, q.on('achteraf', 1) * (1 - P), 30);
    if (P > 0.01) { stopcontact(ctx, 360, 470, 0.8, P, 1, t); gezichtDing(ctx, 'auto', 820, 480, 1, P, 1); gezichtDing(ctx, 'huis', 1220, 500, 1, P, 1); gezichtDing(ctx, 'kraan', 1600, 500, 1, P, 1); regel(ctx, 'pareidolie', 960, 230, P, C.goud, 56, 'center', 800); regel(ctx, 'een gezicht zien in iets willekeurigs', 960, 790, P, C.text, 36, 'center', 600); } },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'AMERIKAANSE PSYCHOLOGEN · 1999', 120, 140, C.grain, 'left', 30); const tg = q.at('Halverwege', 1), ts = q.at('staan', 1), tw = q.at('loopt', 2);
    let g = -1; if (t >= tg) g = t < ts ? 0.5 * clamp((t - tg) / Math.max(0.5, ts - tg), 0, 1) : t < tw ? 0.5 : 0.5 + 0.5 * clamp((t - tw) / 4, 0, 1);
    persoon(ctx, 'daan', 260, 880, 460, { t }); persoon(ctx, 'yasmin', 1660, 880, 460, { t, kijk: -1 }); speelveld(ctx, 520, 200, 880, 520, q.on('filmpje', 1), t, g < 0 ? -1 : g, t > ts && t < tw ? 1 : 0);
    chip(ctx, 'tel: hoe vaak gooit wit over?', 960, 800, C.goud, q.on('tel', 1), 30); vraagteken(ctx, 1660, 300, q.on('Hoeveel', 1), 110); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const L = q.on('longscan', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; stippen(ctx, 620, 300, 10, 5, C.koraal, q.on('helft', 1), 10, 26, 72); regel(ctx, 'zag de gorilla niet', 960, 260, q.on('helft', 1), C.koraal, 34, 'center', 700); regel(ctx, 'aandachtsblindheid', 960, 520, q.on('aandachtsblindheid', 1), C.goud, 56, 'center', 800); regel(ctx, 'je aandacht kiest wat doordringt', 960, 600, q.on('kiest', 1), C.text, 36, 'center', 600); tag(ctx, 'ook al valt het op je netvlies', 960, 720, C.teal, q.on('netvlies', 1), 'center', 30); ctx.restore(); }
    if (L > 0.01) { longScan(ctx, 640, 480, 1.05, L, 1, q.on('vier', 1)); regel(ctx, 'ervaren artsen', 1420, 300, L, C.text, 38, 'center', 700); stippen(ctx, 1260, 380, 5, 4, C.koraal, q.on('vier', 1) * L, 5, 26, 80); regel(ctx, '4 op 5 zagen hem niet', 1420, 520, q.on('vier', 1) * L, C.koraal, 34, 'center', 700); tag(ctx, 'ze keken er recht naar', 1420, 640, C.goud, q.on('recht', 1) * L, 'center', 30); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('afslaat', 1) + 1) / 4, 0, 1);
    kruising(ctx, 760, 170, 680, 1, u); persoon(ctx, 'lotte', 360, 880, 520, { t, pose: 'vasthouden', hold: (c, hx, hy) => telefoon(c, hx, hy, 0.8) }); naamBij(ctx, 'Lotte', 'fietst naar school', 500, 330, q.on('Lotte', 1));
    tag(ctx, 'ogen: op de weg', 1640, 260, C.teal, q.on('weg', 1), 'center', 28); tag(ctx, 'aandacht: op de telefoon', 1640, 340, C.koraal, q.on('aandacht', 1), 'center', 28); tag(ctx, 'afslaande auto: gemist?', 1640, 420, C.koraal, q.on('afslaat', 1), 'center', 28);
    haak(ctx, 1460, 1820, 600, 'onderzoek: verkeer en werk', C.groen, q.on('onderzoeken', 1)); },

  // ---------- H4 ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); armHand(ctx, 960, 400, 1.4, 1, q.on('amputatie', 1, 1.2), q.on('pijn', 1), t); chip(ctx, 'voelt de arm nog', 960, 640, C.goud, q.on('voelen', 1), 30); chip(ctx, 'jeuk in een hand die er niet is', 960, 720, C.goud, q.on('jeuk', 1), 30);
    stippen(ctx, 1500, 160, 10, 6, C.koraal, q.on('zes', 1), 10, 14, 34); regel(ctx, '± 6 op 10: pijn', 1500 + 150, 230, q.on('zes', 1), C.koraal, 30, 'center', 700); vraagteken(ctx, 1700, 760, q.on('vandaan', 1), 110); },

  s20(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const K = q.on('kaart', 1, 0.6), S = q.on('spiegeltherapie', 1, 0.8);
    armHand(ctx, 900, 380, 1.1, 1 - K, 1, 1, t); tag(ctx, 'zenuwen in de stomp', 560, 560, C.koraal, q.on('stomp', 1) * (1 - K), 'center', 28); tag(ctx, 'hersenen tekenen de hand nog', 1260, 560, C.koraal, q.on('tekenen', 1) * (1 - K), 'center', 28);
    if (K > 0.01 && S < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - S); metaText(ctx, 'KAART VAN HET LICHAAM IN DE SCHORS · FILM: HET HOOFDKANTOOR', 960, 240, C.grain, 'center', 28); lichaamsKaart(ctx, 360, 300, 1200, 1, { over: q.on('overnemen', 1, 1.2), handLeeg: q.on('signalen', 1), hl: q.on('wang', 1) > 0.5 ? 5 : -1 });
      tag(ctx, 'wang aanraken → voelt als de hand', 960, 560, C.goud, q.on('wang', 1), 'center', 30); tag(ctx, 'oorzaak van de pijn? wordt nog onderzocht', 960, 660, C.text2, q.on('onderzoeken', 1), 'center', 30); ctx.restore(); }
    if (S > 0.01) { spiegelKist(ctx, 960, 470, 1.2, S, t); tag(ctx, 'je hersenen zien de hand weer bewegen', 960, 740, C.teal, q.on('weer', 1) * S, 'center', 30); tag(ctx, 'helpt sommigen · bewijs onzeker', 960, 820, C.text2, q.on('onzeker', 1) * S, 'center', 30); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('actief', 1, 0.8);
    vlekOog(ctx, 520, 440, 1.3, 1, q.on('slechtziend', 1)); metaA(ctx, 'SLECHTZIEND', 520, 640, q.on('slechtziend', 1), C.grain, 'center', 28);
    roundRect(ctx, 960, 200, 760, 520, 16); shape(ctx, rgba('#2C3E5E', 0.8 * q.on('slechtziend', 1)), null);
    [[1100, 330, C.paars, 'bloemen'], [1400, 300, C.koraal, 'bloemen'], [1560, 520, C.teal, 'patronen'], [1150, 560, C.groen, 'patronen']].forEach(([x, y, c, w]) => bloemMotief(ctx, x, y, 60, c, q.on(w, 1) * (1 - A), t));
    gezichtIcoon(ctx, 1350, 480, 0.8, q.on('gezichten', 1) * (1 - A), 'noor');
    tag(ctx, 'ze weten: het is niet echt', 1340, 790, C.groen, q.on('weten', 1) * (1 - A), 'center', 30); regel(ctx, 'syndroom van Charles Bonnet', 1340, 170, q.on('syndroom', 1), C.goud, 44, 'center', 800);
    breinZicht(ctx, 1340, 470, 0.85, A, 1, t); tag(ctx, 'te weinig signalen → gebieden voor zien worden zelf actief', 1340, 790, C.teal, A, 'center', 28); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('illusie', 1, 0.8);
    stopcontact(ctx, 360, 440, 0.9, 1, q.on('gezicht', 1), t); vergKaart(ctx, 700, 260, 340, 170, 'voorspelling', [], C.paars, 1 - I); text(ctx, '↔', 1100, 360, fTitel(56), rgba(C.text, 1 - I), 'center'); vergKaart(ctx, 1160, 260, 340, 170, 'wat binnenkomt', [], C.teal, 1 - I); text(ctx, '→', 1560, 360, fTitel(56), rgba(C.text, 1 - I), 'center'); regel(ctx, 'wat je ziet', 1720, 370, 1 - I, C.goud, 40, 'center', 800);
    if (I > 0.01) { vergKaart(ctx, 700, 260, 340, 220, 'illusie', ['invullen'], C.goud, I); vergKaart(ctx, 1080, 260, 340, 220, 'fantoomhand', ['invullen'], C.goud, q.on('fantoomhand', 1)); vergKaart(ctx, 1460, 260, 340, 220, 'gorilla', ['aandacht kiest'], C.teal, q.on('gorilla', 1)); } },

  s23(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'illusies als gereedschap', 960, 260, 1, C.goud, 56, 'center', 800); regel(ctx, 'ze laten zien wat de hersenen zelf toevoegen', 960, 340, q.on('toevoegen', 1), C.text, 36, 'center', 600);
    ['psychologie', 'biologie', 'biomedische wetenschappen', 'geneeskunde'].forEach((s2, i) => tag(ctx, s2, 330 + i * 420, 540, C.teal, q.on(s2.split(' ')[0], 1), 'center', 32)); pijl(ctx, 960, 590, 960, 680, C.line, q.on('master', 1), 3, 14); tag(ctx, 'master neurowetenschappen', 960, 760, C.goud, q.on('master', 1), 'center', 34); }
});
