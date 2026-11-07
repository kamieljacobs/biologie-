// Wat word jij? · Pedagogiek · Opgroeien onder druk — scènes per alinea (v1.0, 20 okt 2026). Look: Schema; mensen als telpoppetjes in groepen, Dr. Kim als pedagoog.
// Rode draad: het Kauai-onderzoek. Geen castkind als slachtoffer.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// risicogroep van 30 poppetjes (1 = ongeveer 7 kinderen): k groen (goed terechtgekomen) van de 30
const RISK = (i, k) => i < k ? C.groen : C.koraal;
function hulpNummers(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 420, y - 60, 840, 150, 18); shape(ctx, rgba(C.teal, 0.12), C.teal, 2);
  text(ctx, 'Kindertelefoon 0800-0432 · bellen of chatten', x, y, fTekst(34, 700), C.text, 'center'); text(ctx, 'Veilig Thuis 0800-2000 · direct gevaar: 112', x, y + 52, fTekst(34, 700), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { balans(ctx, 1500, 520, 0.8, 1, 0.6); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('tegenslag', 1, 0.8);
    eiland(ctx, 420, 470, 1.3, 1 - G * 0.6); metaA(ctx, 'KAUAI · HAWAÏ', 420, 760, 1 - G * 0.6, C.grain, 'center', 28);
    groep(ctx, 900, 280, 100, 20, 44, 13, i => (G > 0.5 && i % 3 === 0) ? C.koraal : rgba(C.text2, 0.9), q.on('zevenhonderd', 1));
    metaA(ctx, 'IEDER POPJE ≈ 7 KINDEREN · GEBOREN IN 1955', 900, 200, q.on('zevenhonderd', 1), C.grain, 'left', 24);
    tijdlijn(ctx, 900, 820, 860, [[0, 'geboren 1955'], [0.25, '10 jaar'], [0.45, '18'], [0.75, '32'], [1, '40']], clamp((t - q.at('veertig', 1)) / 2, 0, 1), q.on('veertig', 1));
    chip(ctx, '1 op 3: veel tegenslag', 1330, 760, C.koraal, G, 28); vraagteken(ctx, 1820, 500, q.on('later', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); metaText(ctx, 'DE GROEP MET VEEL TEGENSLAG', 960, 250, C.grain, 'center', 28);
    const k = q.on('stabiele', 1) > 0.5 ? 10 + Math.round(6 * q.on('later', 1)) : 0; groep(ctx, 560, 340, 30, 10, 88, 22, i => i < k ? C.groen : C.koraal, 1);
    chip(ctx, '2 op 3: al jong problemen', 960, 700, C.koraal, q.on('Twee', 1) * (1 - q.on('stabiele', 1)), 30); chip(ctx, '1 op 3: stabiel en zorgzaam', 960, 700, C.groen, q.on('stabiele', 1) * (1 - q.on('later', 1)), 30); chip(ctx, 'later ging het met velen alsnog beter', 960, 700, C.groen, q.on('later', 1), 30);
    haak(ctx, 560, 1360, 800, 'moeilijker, maar niet onmogelijk', C.groen, q.on('onmogelijk', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('negentig', 1, 0.8);
    chip(ctx, 'film: Stress', 360, 180, C.teal, q.on('Stress', 1), 28); balans(ctx, 520, 420, 0.75, 1 - A, -0.9 * q.on('alarm', 1), 'stress', 'kalmerende volwassene'); chip(ctx, 'kan overbelast raken', 520, 760, C.koraal, q.on('overbelast', 1) * (1 - A), 28);
    if (A > 0.01) { metaA(ctx, 'ACE-ONDERZOEK · VS · RUIM 17.000 VOLWASSENEN', 160, 220, A, C.grain, 'left', 28); ['mishandeling', 'verwaarlozing', 'geweld in huis', 'verslaving in huis'].forEach((s2, i) => tag(ctx, s2, 330, 330 + i * 80, C.oker, A * q.on(['mishandeld', 'verwaarloosd', 'geweld', 'verslaving'][i], 1), 'center', 28));
      aceStaven(ctx, 760, 300, 900, 420, q.on('meer', 1), clamp((t - q.at('meer', 1)) / 2, 0, 1), q.on('vier', 1) > 0.5 ? 4 : -1); vraagteken(ctx, 1780, 250, q.on('toekomst', 1), 90); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); aceStaven(ctx, 200, 300, 760, 380, 1, 1, 4); chip(ctx, 'groepen: depressie en verslaving 4 tot 7 keer zo vaak', 580, 820, C.koraal, q.on('zeven', 1), 26);
    groep(ctx, 1160, 270, 20, 5, 110, 26, i => i < 4 ? C.koraal : C.groen, q.on('persoon', 1)); regel(ctx, 'één persoon: niets zeker', 1380, 790, q.on('persoon', 1), C.text, 32, 'center', 700); tag(ctx, 'wat maakt het verschil?', 960, 200, C.goud, q.on('verschil', 1), 'center', 30); },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'veerkracht', 960, 200, q.on('veerkracht', 1), C.goud, 56, 'center', 800); regel(ctx, 'goed opgroeien ondanks tegenslag', 960, 270, q.on('ondanks', 1), C.text, 34, 'center', 600);
    groep(ctx, 560, 400, 30, 10, 88, 22, i => i < 10 ? C.groen : rgba(C.koraal, 0.5), q.on('gemeen', 1)); vraagteken(ctx, 1600, 600, q.on('vaakst', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const V = q.on('Veerkracht', 1, 0.8);
    balans(ctx, 960, 340, 0.9, 1, -0.8 + 1.4 * q.on('volwassene', 1, 1.5) + 0.2 * q.on('goed', 1), 'risico\'s', 'vaste volwassene');
    ['oma', 'tante', 'leraar', 'buurman'].forEach((s2, i) => tag(ctx, s2, 1250 + (i % 2) * 220, 620 + Math.floor(i / 2) * 76, C.groen, q.on(s2, 1) * (1 - V), 'center', 28)); chip(ctx, 'film: Hechting', 520, 640, C.teal, q.on('Hechting', 1) * (1 - V), 28);
    chip(ctx, 'ergens goed in zijn · zelf invloed hebben', 520, 720, C.groen, q.on('invloed', 1) * (1 - V), 26);
    haak(ctx, 560, 1360, 820, 'veerkracht ontstaat in de relaties om een kind heen', C.groen, V); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Stel', 1, 0.8);
    regel(ctx, '± 3 op de 100 kinderen per jaar', 960, 220, q.on('honderd', 1) * (1 - L), C.koraal, 44, 'center', 800); groep(ctx, 560, 320, 100, 20, 42, 12, i => i < 3 ? C.koraal : rgba(C.text2, 0.8), q.on('honderd', 1) * (1 - L)); metaA(ctx, 'SCHATTING NEDERLAND (UNIVERSITEIT LEIDEN)', 960, 640, q.on('honderd', 1) * (1 - L), C.grain, 'center', 24);
    ['school', 'zorg', 'jeugdhulp'].forEach((s2, i) => tag(ctx, s2, 700 + i * 260, 760, C.teal, q.on('jeugdhulp', 1) * (1 - L), 'center', 30));
    if (L > 0.01) { plekIcoon(ctx, 'school', 520, 480, 1.4, L, C.teal); ['vaak blauwe plekken', 'bang om naar huis te gaan'].forEach((s2, i) => stapKaart(ctx, 900, 380 + i * 120, 700, '!', s2, L * q.on(['plekken', 'bang'][i], 1), C.koraal, 1)); vraagteken(ctx, 1720, 700, q.on('eerst', 1), 100); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); metaText(ctx, 'MELDCODE · VIJF STAPPEN', 960, 200, C.grain, 'center', 30);
    [['vastleggen wat je ziet', 'vast'], ['overleggen · advies Veilig Thuis', 'overleg'], ['gesprek met ouders en kind', 'praat'], ['afwegen hoe ernstig', 'weeg'], ['melden? en/of hulp?', 'beslist']].forEach(([s2, w], i) => stapKaart(ctx, 560, 240 + i * 112, 800, i + 1, s2, q.on(w, 1), C.teal, q.on(w, 1)));
    chip(ctx, 'op school: een vaste persoon', 1640, 380, C.teal, q.on('school', 1), 26); chip(ctx, 'soms allebei', 1640, 700, C.goud, q.on('allebei', 1), 28); },

  s14(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Het is nooit de schuld van een kind.', 960, 300, q.on('schuld', 1), C.goud, 48, 'center', 800);
    regel(ctx, 'praat met iemand die je vertrouwt', 960, 420, q.on('vertrouwt', 1), C.text, 36, 'center', 600); hulpNummers(ctx, 960, 600, q.on('Kindertelefoon', 1)); },

  // ---------- H4 ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'VIDEOFEEDBACK · ONTWIKKELD IN LEIDEN', 120, 150, C.grain, 'left', 28);
    persoon(ctx, 'kim', 300, 880, 520, { t, uit: 'blij', outfit: 'gewoon' }); ctx.save(); ctx.translate(372, 640); ctx.rotate(-0.12); roundRect(ctx, -58, -40, 116, 80, 10); shape(ctx, '#1A2030', '#8A93A6', 3); ctx.fillStyle = '#2C3E5E'; ctx.fillRect(-48, -30, 96, 60); ctx.restore(); naamBij(ctx, 'Dr. Kim', 'pedagoog', 420, 320, q.on('pedagoog', 1));
    videoScherm(ctx, 700, 250, 900, 560, q.on('filmt', 1), t, q.on('goede', 1, 2), 0); chip(ctx, 'samen terugkijken', 1150, 860, C.teal, q.on('terug', 1), 28); vraagteken(ctx, 1760, 300, q.on('Waarom', 1), 100); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); videoScherm(ctx, 400, 220, 900, 540, 1, t, 1, q.on('reageert', 1));
    chip(ctx, 'signaal opgepikt', 850, 820, C.groen, q.on('signaal', 1), 28); chip(ctx, 'beter dan een lijst met fouten', 1600, 300, C.text2, q.on('fouten', 1), 26); chip(ctx, 'gemiddeld: beter aanvoelen', 1600, 400, C.groen, q.on('gemiddeld', 1), 26); chip(ctx, 'net als op Kauai: iemand die er is', 1600, 500, C.goud, q.on('Kauai', 1), 26); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); groep(ctx, 200, 360, 30, 10, 70, 18, i => i < 10 ? C.groen : C.koraal, 1); balans(ctx, 1300, 380, 0.75, 1, -0.6 + 1.1 * q.on('iemand', 1, 1.5), 'tegenslag', 'iemand die er is'); haak(ctx, 900, 1700, 800, 'een pedagoog helpt zo iemand te vinden of te versterken', C.groen, q.on('pedagoog', 1)); },
  s19(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'pedagogiek (hbo)', 640, 300, C.teal, q.on('hbo', 1), 'center', 34); tag(ctx, 'pedagogische wetenschappen (wo)', 1280, 300, C.teal, q.on('universiteit', 1), 'center', 34);
    ['jeugdhulp', 'school', 'Veilig Thuis', 'onderzoek'].forEach((s2, i) => tag(ctx, s2, 420 + i * 360, 520, C.goud, q.on(s2.split(' ')[0], 1), 'center', 30)); hulpNummers(ctx, 960, 740, q.on('onderzoek', 1)); }
});
