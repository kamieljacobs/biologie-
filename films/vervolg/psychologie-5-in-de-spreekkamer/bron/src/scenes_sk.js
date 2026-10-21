// Wat word jij? · Psychologie · In de spreekkamer — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Sam als cliënt; jij als psycholoog in ik-perspectief: bureau en notitieboek).
// Rode draad: het eerste gesprek met Sam, van zijn vraag om geheimhouding tot de hulpkaart.

// ---------- eigen tekeningen ----------
function spreek(ctx, uit, t, a = 1) { kamer(ctx, a); persoon(ctx, 'sam', 1160, 800, 520, { a, uit, pose: 'staan', kijk: -1, t }); bureau(ctx, a); }
function jijZegt(ctx, regels, a = 1, x = 240, y = 560, w = 760) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 40 + regels.length * 46; roundRect(ctx, x, y - h, w, h, 16); shape(ctx, rgba(C.teal, 0.92), null); ctx.beginPath(); ctx.moveTo(x + 80, y); ctx.lineTo(x + 60, y + 40); ctx.lineTo(x + 130, y); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.92); ctx.fill(); metaText(ctx, 'JIJ', x + 24, y - h + 36, '#121A26', 'left', 28); regels.forEach((r, i) => text(ctx, r, x + 24, y - h + 80 + i * 46, fTekst(32, 700), '#121A26', 'left')); ctx.restore(); }
function samZegt(ctx, regels, a = 1, x = 1000, y = 200) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 700); const w = Math.max(...regels.map(r => ctx.measureText(r).width)) + 60, h = 30 + regels.length * 46; roundRect(ctx, x - w / 2, y, w, h, 16); shape(ctx, '#F2F2EE', null); ctx.beginPath(); ctx.moveTo(x + 20, y + h); ctx.lineTo(x + 50, y + h + 34); ctx.lineTo(x + 70, y + h); ctx.closePath(); ctx.fillStyle = '#F2F2EE'; ctx.fill(); regels.forEach((r, i) => text(ctx, r, x, y + 50 + i * 46, fTekst(32, 700), '#1A2740', 'center')); ctx.restore(); }
function vakKaart(ctx, x, y, w, h, kop, tekst, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.16), col, 2.5); metaText(ctx, kop, x + 28, y + 52, col, 'left', 30); ctx.font = fTekst(32, 700); ctx.fillStyle = C.text; wrap(ctx, tekst, x + 28, y + 110, w - 56, 42); ctx.restore(); }
function dossier(ctx, x, y, s, a = 1, slot = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#C9A35C'; roundRect(ctx, -120, -90, 240, 180, 10); ctx.fill(); ctx.fillStyle = '#E0C07A'; roundRect(ctx, -120, -70, 240, 160, 10); ctx.fill(); metaText(ctx, 'DOSSIER', 0, -20, '#5A4632', 'center', 28);
  if (slot > 0.01) { ctx.globalAlpha *= slot; ctx.strokeStyle = '#8A8E96'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 30, 30, Math.PI, 0); ctx.stroke(); roundRect(ctx, -44, 30, 88, 64, 10); shape(ctx, '#B8BEC8', '#6A7080', 2); circ(ctx, 0, 58, 8, '#2A2F3E'); } ctx.restore(); }
function weegschaal2(ctx, x, y, links, rechts, kant, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = kant * 0.12; ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + 200); ctx.lineTo(x, y); ctx.stroke(); ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-300, 0); ctx.lineTo(300, 0); ctx.stroke(); ctx.restore();
  [[-1, links, C.teal], [1, rechts, C.koraal]].forEach(([d, s2, col]) => { const px = x + d * 300 * Math.cos(an), py = y + d * 300 * Math.sin(an); ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 80, py + 80); ctx.moveTo(px, py); ctx.lineTo(px + 80, py + 80); ctx.stroke(); roundRect(ctx, px - 110, py + 80, 220, 64, 14); shape(ctx, rgba(col, 0.3), col, 2); text(ctx, s2, px, py + 122, fTekst(32, 700), C.text, 'center'); }); circ(ctx, x, y, 12, C.goud); ctx.restore(); }
function stapRij(ctx, x, y, nr, s2, a = 1, act = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x + 28, y - 10, 28, act ? C.goud : '#2A3A58', C.goud, 2); text(ctx, String(nr), x + 28, y + 1, fTekst(30, 800), act ? '#121A26' : C.goud, 'center'); ctx.restore(); regel(ctx, s2, x + 80, y + 2, a, C.text, 32, 'left', 700); }
function boekDSM(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -150, 220, 300, 10); shape(ctx, '#3E5C86', '#8FA0B5', 2); ctx.fillStyle = '#E8E2D8'; ctx.fillRect(100, -140, 14, 280); text(ctx, 'DSM', 0, -20, fTitel(64), '#F2F2EE', 'center'); metaText(ctx, 'HANDBOEK', 0, 40, C.grain, 'center', 28); ctx.restore(); }
const DSM_KENMERKEN = ['somber (bij jongeren: prikkelbaar)', 'nergens zin in, geen plezier', 'slecht of te veel slapen', 'eetlust of gewicht verandert', 'moe, geen energie', 'traag of onrustig', 'waardeloos of schuldig voelen', 'slecht concentreren', 'denken aan de dood'];
function kenmerkLijst(ctx, x, y, a = 1, vink = 0, kern = 0) { if (a <= 0.01) return; DSM_KENMERKEN.forEach((s2, i) => { const yy = y + i * 64 + (i >= 2 ? 40 : 0); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, yy - 36, 50, 50, 8); shape(ctx, '#2A3A58', i < 2 && kern > 0.5 ? C.goud : rgba(C.line, 0.7), i < 2 && kern > 0.5 ? 3 : 2); ctx.restore(); if (i < vink) vink_(ctx, x + 25, yy - 11, 16, a); regel(ctx, s2, x + 74, yy, a, i < 2 && kern > 0.5 ? C.goud : C.text, 30, 'left', 700); });
  if (kern > 0.01) { ctx.save(); ctx.globalAlpha *= a * kern; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); roundRect(ctx, x - 16, y - 54, 640, 140, 12); ctx.stroke(); ctx.restore(); metaText(ctx, 'MINSTENS ÉÉN HIERVAN', x, y + 124, C.goud, 'left', 28); } }
function licht2zwaar(ctx, x, y, w, a = 1, sam = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, rgba(C.teal, 0.3)); g.addColorStop(1, rgba(C.koraal, 0.9)); roundRect(ctx, x, y, w, 50, 14); ctx.fillStyle = g; ctx.fill(); metaText(ctx, 'LICHT', x, y + 100, C.grain, 'left', 28); metaText(ctx, 'ZWAAR', x + w, y + 100, C.grain, 'right', 28); ctx.restore(); }
function kappaSchaal(ctx, x, y, w, a = 1, d = 0, ang = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); for (let i = 0; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(x + w * i / 10, y - (i % 5 ? 8 : 16)); ctx.lineTo(x + w * i / 10, y + (i % 5 ? 8 : 16)); ctx.stroke(); }
  text(ctx, '0', x, y + 56, fTekst(30, 700), C.text, 'center'); text(ctx, '1', x + w, y + 56, fTekst(30, 700), C.text, 'center'); metaText(ctx, 'TOEVAL', x, y + 100, C.grain, 'center', 28); metaText(ctx, 'HELEMAAL EENS', x + w, y + 100, C.grain, 'center', 28);
  [[0.28, 'depressie ≈ 0,3', C.koraal, d, -1], [0.2, 'angst ≈ 0,2', C.paars, ang, 1]].forEach(([v, l, col, aa, up]) => { if (aa <= 0.01) return; ctx.save(); ctx.globalAlpha *= aa; circ(ctx, x + w * v, y, 16, col); text(ctx, l, x + w * v + (up < 0 ? 40 : -40), y + (up < 0 ? -40 : 64), fTekst(30, 700), col, up < 0 ? 'left' : 'right'); ctx.restore(); }); ctx.restore(); }
function hulpkaart(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 1180, 600, 20); shape(ctx, '#F2EEE4', C.goud, 3); text(ctx, 'Zit je ergens mee?', x + 50, y + 70, fTitel(44), '#1A2740', 'left');
  [['Kindertelefoon', '0800-0432 · kindertelefoon.nl · 8–18 jaar, gratis, anoniem'], ['Veilig Thuis', '0800-2000 · ook voor jongeren zelf'], ['113 Zelfmoordpreventie', '113 of 0800-0113 · 113.nl'], ['Direct gevaar', '112']].forEach(([k, v], i) => { text(ctx, k, x + 50, y + 160 + i * 92, fTekst(32, 800), i === 3 ? '#B03A2E' : '#1A2740', 'left'); text(ctx, v, x + 50, y + 200 + i * 92, fTekst(28, 600), '#3A4458', 'left'); }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { [['luisteren', C.teal], ['geheim, tenzij', C.goud], ['classificeren', C.paars]].forEach(([w, col], i) => chip(ctx, w, 760 + i * 360, 720, col, 1, 34)); dossier(ctx, 1560, 420, 1, 1, 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vraagt', 1);
    spreek(ctx, V > 0.5 && q.on('denk', 1) < 0.5 ? 'praat' : 'bezorgd', t); naamBij(ctx, 'Sam', '16 jaar · cliënt', 700, 300, q.on('Sam', 1));
    chip(ctx, 'slaapt slecht', 640, 440, C.koraal, q.on('slaapt', 1) * (1 - V), 30); chip(ctx, 'bijna niet naar school', 640, 520, C.koraal, q.on('school', 1) * (1 - V), 30);
    samZegt(ctx, ['Als ik je iets vertel,', 'beloof je dan dat je het', 'aan niemand doorvertelt?'], V, 900, 120); vraagteken(ctx, 400, 520, q.on('denk', 1), 130); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Sam', 2, 0.8);
    regel(ctx, 'Antwoord b: eerlijk zijn (waarom: hoofdstuk 3)', 120, 140, 1 - S, C.groen, 40, 'left', 700);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S; chip(ctx, 'vooral adviezen geven?', 700, 360, C.text2, q.on('adviezen', 1), 34); kruis(ctx, 940, 350, 22, q.on('luisteren', 1)); regel(ctx, 'eerst het gesprek zelf', 960, 300, q.on('gesprek', 1) * (1 - q.on('adviezen', 1)), C.text, 44, 'center', 700); regel(ctx, 'eerst: luisteren', 960, 520, q.on('luisteren', 1), C.goud, 56, 'center', 700);
      tag(ctx, 'wat zegt Sam, en wat zegt hij niet?', 960, 640, C.text, q.on('niet', 1), 'center', 32); ctx.restore(); }
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; persoon(ctx, 'sam', 1580, 880, 520, { t, uit: 'bezorgd', kijk: -1 }); samZegt(ctx, ['het gaat gewoon slecht op school'], 1, 1400, 200);
      ['a. Waarom ga je niet meer naar school?', 'b. Komt dat door thuis?', "c. Hoe ziet zo'n slechte dag eruit?"].forEach((s2, i) => vraagKaartje(ctx, 160, 380 + i * 140, 900, s2, q.on('Welke', 1))); vraagteken(ctx, 1160, 520, q.on('denk', 1), 110); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('vraagt', 1, 0.8), D = q.on('doorvragen', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; regel(ctx, 'Het antwoord is c', 120, 140, 1, C.groen, 40, 'left', 700);
      vraagKaartje(ctx, 160, 230, 900, 'a. Waarom ga je niet meer naar school?', 1, q.on('verwijt', 1) > 0.5 ? 'VERWIJT?' : '', C.oker); vraagKaartje(ctx, 160, 370, 900, 'b. Komt dat door thuis?', 1, q.on('sturend', 1) > 0.5 ? 'STUREND' : '');
      vraagKaartje(ctx, 160, 510, 900, "c. Hoe ziet zo'n slechte dag eruit?", 1, q.on('open', 1) > 0.5 ? 'OPEN' : '', C.groen, q.on('open', 1) > 0.5);
      tag(ctx, 'open, maar klinkt als verwijt', 1420, 275, C.oker, q.on('verwijt', 1), 'center', 30); tag(ctx, 'jij bedenkt de oorzaak al', 1420, 415, C.koraal, q.on('oorzaak', 1), 'center', 30); tag(ctx, 'Sam vertelt in eigen woorden', 1420, 555, C.groen, q.on('woorden', 1), 'center', 30);
      chip(ctx, 'gesloten vraag (ja of nee): handig om te checken', 960, 760, C.text2, q.on('gesloten', 1), 32); ctx.restore(); }
    if (B > 0.01 && D < 0.99) { ctx.save(); ctx.globalAlpha *= B * (1 - D); spreek(ctx, q.on('verbeteren', 1) > 0.5 ? 'blij' : 'praat', t); const Z = q.on('samen', 1);
      jijZegt(ctx, ["Hoe ziet zo'n slechte dag eruit?"], 1 - Z, 160, 640, 760); tag(ctx, 'open vraag', 540, 700, C.groen, q.on('vraagt', 1) * (1 - Z), 'center', 30);
      samZegt(ctx, ['Ik lig tot drie uur wakker.', 'En dan kom ik mijn bed niet uit.'], q.on('vertelt', 1) * (1 - Z * 0.7), 1150, 110);
      jijZegt(ctx, ['Dus je ligt tot drie uur wakker.', "'s Ochtends kom je je bed niet uit.", 'En daarom mis je de eerste uren.', 'Klopt dat?'], Z, 160, 640, 760); tag(ctx, 'samenvatten: je laat zien dat je luistert', 1500, 680, C.goud, q.on('luistert', 1), 'center', 30); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; regel(ctx, 'doorvragen', 960, 180, 1, C.goud, 48, 'center', 700); chip(ctx, 'Wat doe je als je wakker ligt?', 960, 290, C.teal, q.on('doe', 1), 32); chip(ctx, 'Waar denk je dan aan?', 960, 380, C.teal, q.on('Waar', 1), 32);
      regel(ctx, 'vaag', 700, 500, q.on('vaag', 1), C.text2, 40, 'center', 700); pijl(ctx, 780, 488, 1100, 488, C.goud, q.on('concrete', 1), 4, 18); regel(ctx, 'concreet', 1220, 500, q.on('concrete', 1), C.groen, 40, 'center', 700);
      [['luisteren', C.teal], ['samenvatten', C.groen], ['doorvragen', C.paars]].forEach(([w, col], i) => chip(ctx, w, 560 + i * 400, 640, col, q.on('doorvragen', 2), 34)); chip(ctx, 'in de opleiding: oefenen met acteurs en video', 960, 760, C.text2, q.on('acteurs', 1), 30); ctx.restore(); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('kaart', 1, 0.8), P = q.on('plan', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; regel(ctx, 'de intake: het eerste gesprek', 960, 160, q.on('intake', 1), C.text, 40, 'center', 700);
      vakKaart(ctx, 160, 300, 640, 260, 'KLACHT', q.on('niemand', 1) > 0.5 ? '"Ik slaap slecht, en ik zie niemand meer."' : '', C.koraal, q.on('klacht', 1)); pijl(ctx, 830, 430, 1080, 430, C.goud, q.on('hulpvraag', 1), 5, 22);
      vakKaart(ctx, 1110, 300, 640, 260, 'HULPVRAAG', q.on('vrienden', 1) > 0.5 ? '"Ik wil weer naar school, en weer met mijn vrienden afspreken."' : '', C.groen, q.on('hulpvraag', 1)); ctx.restore(); }
    if (K > 0.01 && P < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - P); regel(ctx, 'de klachten in kaart', 120, 160, 1, C.goud, 40, 'left', 700);
      [['Hoe lang zijn ze er al?', 'lang'], ['Hoe erg zijn ze?', 'erg'], ['Wat helpt al, wat maakt het erger?', 'helpt'], ['Wie zijn er belangrijk voor hem?', 'belangrijk'], ['Hoe veilig voelt hij zich?', 'veilig']].forEach(([s2, w], i) => stapRij(ctx, 160, 270 + i * 100, i + 1, s2, q.on(w, 1), i === 4));
      vakKaart(ctx, 1240, 300, 520, 300, 'VRAGENLIJST', 'zoals in de film over meten', C.teal, q.on('vragenlijst', 1)); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; regel(ctx, 'samen een plan', 960, 160, 1, C.text, 40, 'center', 700); chip(ctx, 'jij legt uit: wat en waarom', 960, 250, C.teal, q.on('legt', 1), 32); chip(ctx, 'Sam beslist mee', 960, 330, C.groen, q.on('beslist', 1), 32);
      metaText(ctx, 'WIE GEEFT TOESTEMMING?', 300, 450, C.grain, 'left', 28); const Z = q.on('zelf', 1);
      [['jonger dan 12', 'de ouders', 0], ['12 tot 16', 'jongere én ouders', q.on('twaalf', 1)], ['16 en ouder', 'de jongere zelf', Z]].forEach(([l, v, aa], i) => { ctx.save(); ctx.globalAlpha *= Math.max(0.35, aa); roundRect(ctx, 300 + i * 450, 480, 420, 180, 16); shape(ctx, i === 2 && Z > 0.5 ? rgba(C.goud, 0.2) : rgba(C.fill, 0.6), i === 2 && Z > 0.5 ? C.goud : rgba(C.line, 0.6), i === 2 && Z > 0.5 ? 3 : 1.5); text(ctx, l, 510 + i * 450, 550, fTekst(32, 800), C.text, 'center'); text(ctx, v, 510 + i * 450, 610, fTekst(30, 600), C.text2, 'center'); ctx.restore(); });
      tag(ctx, 'Sam is 16: hij beslist zelf', 1410, 740, C.goud, Z, 'center', 32); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('grenzen', 1, 0.8), D = q.on('Daarom', 1, 0.8);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; dossier(ctx, 520, 440, 1.6, q.on('beroepsgeheim', 1), q.on('blijft', 1)); regel(ctx, 'beroepsgeheim', 520, 220, q.on('beroepsgeheim', 1), C.goud, 44, 'center', 700);
      chip(ctx, 'de wet', 1180, 290, C.teal, q.on('wet', 1), 34); chip(ctx, 'de beroepscode', 1480, 290, C.teal, q.on('beroepscode', 1), 34);
      ['verantwoordelijkheid', 'integriteit', 'respect', 'deskundigheid'].forEach((w, i) => chip(ctx, w, 1180 + (i % 2) * 340, 390 + Math.floor(i / 2) * 80, C.text2, q.on('beroepscode', 1) * 0.9, 28));
      vakKaart(ctx, 1040, 560, 720, 200, 'DELEN MET DE HUISARTS?', 'eerst toestemming vragen', C.groen, q.on('huisarts', 1)); ctx.restore(); }
    if (G > 0.01 && D < 0.99) { ctx.save(); ctx.globalAlpha *= G * (1 - D); regel(ctx, 'het geheim heeft grenzen', 960, 160, 1, C.text, 40, 'center', 700); chip(ctx, 'iemand in ernstig gevaar', 960, 250, C.koraal, q.on('ernstig', 1), 32);
      weegschaal2(ctx, 640, 360, 'zwijgen', 'beschermen', q.on('doorbreken', 1), q.on('plichten', 1)); tag(ctx, 'conflict van plichten', 640, 720, C.goud, q.on('plichten', 1), 'center', 30);
      [['geen andere weg meer', 'andere'], ['niet meer vertellen dan nodig', 'nodig'], ['als het kan: eerst je cliënt', 'eerst']].forEach(([s2, w], i) => checkRij(ctx, 1160, 420 + i * 110, s2, q.on(w, 1), 1)); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; spreek(ctx, q.on('jou', 1) > 0.5 ? 'blij' : 'neutraal', t); jijZegt(ctx, ['Bijna alles blijft hier.', 'Alleen als iemand in gevaar is,', 'moet ik daar iets mee.', 'Dat bespreek ik, als het kan,', 'eerst met jou.'], q.on('zegt', 1), 120, 700, 780); ctx.restore(); } },

  // ---------- H4 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const Z = q.on('zegt', 1); spreek(ctx, Z > 0.5 && q.on('Wat', 1) < 0.5 ? 'praat' : 'bezorgd', t);
    samZegt(ctx, ['Mijn vader slaat', 'mijn jongere zusje soms.'], Z, 950, 150); vraagteken(ctx, 420, 520, q.on('denk', 1), 130); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('schuldig', 1, 0.8), A = q.on('acuut', 1);
    ctx.save(); ctx.globalAlpha *= 1 - 0.75 * K; regel(ctx, 'Het antwoord is b', 120, 140, 1, C.groen, 40, 'left', 700); metaText(ctx, 'MELDCODE · SINDS 2013 · STAPPENPLAN', 120, 210, C.grain, 'left', 28);
    [['signalen op een rij', 'signalen'], ['advies: collega of Veilig Thuis', 'advies'], ['praten met betrokkenen, als het veilig kan', 'betrokkenen'], ['afwegen', 'weeg'], ['beslissen: hulp regelen of melden', 'acuut']].forEach(([s2, w], i) => stapRij(ctx, 120, 300 + i * 100, i + 1, s2, q.on(w, 1), i === 1 && q.on('advies', 1) > 0.5 && A < 0.5));
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; [['acuut onveilig?', 'acuut'], ['blijft het onveilig?', 'blijft'], ['zelf niet genoeg hulp?', 'genoeg']].forEach(([s2, w], i) => chip(ctx, s2, 1400, 290 + i * 80, C.koraal, q.on(w, 1), 30));
      pijl(ctx, 1400, 520, 1400, 570, C.goud, q.on('meld', 2), 4, 14); chip(ctx, 'melden bij Veilig Thuis', 1400, 610, C.goud, q.on('meld', 2), 32); tag(ctx, 'mag ook zonder toestemming', 1400, 690, C.text2, q.on('mag', 1), 'center', 28); ctx.restore(); }
    chip(ctx, 'niet in je eentje, niet overhaast: eerst overleggen', 900, 800, C.groen, q.on('eentje', 1), 30); ctx.restore();
    const D = q.on('direct', 1) * (1 - 0.75 * K); if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; roundRect(ctx, 1590, 740, 280, 110, 16); shape(ctx, '#B03A2E', '#F2F2EE', 2); text(ctx, '112', 1730, 800, fTekst(48, 800), '#F2F2EE', 'center'); text(ctx, 'bij direct gevaar', 1730, 838, fTekst(26, 700), '#F2F2EE', 'center'); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; roundRect(ctx, 360, 330, 1200, 260, 24); shape(ctx, rgba('#1A2740', 0.95), C.goud, 3); text(ctx, 'Het is goed dat Sam het vertelde.', 960, 430, fTekst(40, 700), C.text, 'center'); text(ctx, 'Kinderen zijn nooit schuldig aan geweld thuis.', 960, 510, fTekst(40, 800), C.goud, 'center'); ctx.restore(); } },

  // ---------- H5 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Stel', 1, 0.8);
    boekDSM(ctx, 300, 440, 1.2, q.on('DSM', 1)); metaText(ctx, 'DEPRESSIE · 9 KENMERKEN', 700, 150, C.grain, 'left', 28);
    kenmerkLijst(ctx, 720, 260, q.on('negen', 1), S > 0.5 ? 4 : 0, q.on('somberheid', 2));
    chip(ctx, 'minstens 5', 1620, 300, C.goud, q.on('vijf', 1), 32); chip(ctx, 'al 2 weken', 1620, 390, C.goud, q.on('weken', 1), 32); chip(ctx, 'veel last', 1620, 480, C.goud, q.on('last', 1), 32); tag(ctx, '→ depressieve stoornis', 1620, 580, C.text, q.on('stoornis', 2), 'center', 30);
    if (S > 0.01) { chip(ctx, 'Sam: 4 van de 9', 1620, 700, C.koraal, S, 34); vraagteken(ctx, 1620, 840, q.on('denk', 1), 90); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('kritiek', 1, 0.8), N = q.on('nuttig', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; regel(ctx, 'Het antwoord is b', 120, 140, 1, C.groen, 40, 'left', 700); tag(ctx, '4 kenmerken: geen lichte depressie, maar geen stoornis volgens de criteria', 960, 260, C.koraal, q.on('lichte', 1), 'center', 32);
      licht2zwaar(ctx, 260, 420, 1400, q.on('licht', 1)); const gx = 260 + 1400 * 0.55; ctx.save(); ctx.globalAlpha *= q.on('grens', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(gx, 360); ctx.lineTo(gx, 540); ctx.stroke(); ctx.restore(); tag(ctx, 'grens van 5: een afspraak', gx, 330, C.goud, q.on('afspraak', 1), 'center', 30);
      const sx = 260 + 1400 * 0.47; circ(ctx, sx, 445, 18, rgba('#F2F2EE', q.on('vier', 1))); tag(ctx, 'Sam: 4 kenmerken, wel veel last', sx - 120, 650, C.text, q.on('vier', 1), 'center', 30); ctx.restore(); }
    if (K > 0.01 && N < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - N); regel(ctx, 'kritiek: dezelfde patiënt, andere diagnose', 960, 170, 1, C.text, 40, 'center', 700);
      vakKaart(ctx, 360, 230, 520, 180, 'HULPVERLENER 1', 'depressie', C.koraal, q.on('los', 1)); vakKaart(ctx, 1040, 230, 520, 180, 'HULPVERLENER 2', 'angst', C.paars, q.on('altijd', 1));
      metaText(ctx, 'OVEREENSTEMMING · PROEVEN VOOR DE DSM-5', 960, 500, C.grain, 'center', 28); kappaSchaal(ctx, 360, 600, 1200, q.on('proeven', 1), q.on('drie', 1), q.on('angst', 1)); ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; boekDSM(ctx, 420, 470, 1.1, 1); regel(ctx, 'toch nuttig', 1180, 260, 1, C.groen, 44, 'center', 700); chip(ctx, 'een gemeenschappelijke taal', 1180, 370, C.teal, q.on('taal', 1), 34);
      chip(ctx, 'het label', 960, 500, C.paars, q.on('label', 1), 34); text(ctx, '+', 1180, 512, fTekst(44, 800), C.text, 'center'); chip(ctx, 'het verhaal van deze persoon', 1460, 500, C.goud, q.on('verhaal', 1), 34); ctx.restore(); } },

  // ---------- Recap ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vak', 1, 0.8), Z = q.on('Zit', 1, 0.8);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; spreek(ctx, q.on('veilig', 1) > 0.5 ? 'blij' : 'neutraal', t); tag(ctx, 'niet alles beloofd, wel eerlijk', 600, 260, C.goud, q.on('eerlijk', 1), 'center', 34); tag(ctx, 'dat maakt het veilig om te praten', 600, 340, C.groen, q.on('veilig', 1), 'center', 32); ctx.restore(); }
    if (V > 0.01 && Z < 0.99) { ctx.save(); ctx.globalAlpha *= V * (1 - Z); regel(ctx, 'het vak in de spreekkamer', 960, 170, 1, C.goud, 44, 'center', 700);
      [['goed luisteren', 'luisteren', C.teal], ['samen een hulpvraag vinden', 'hulpvraag', C.groen], ['de regels kennen', 'regels', C.goud], ['een diagnose, niet de persoon', 'diagnose', C.paars]].forEach(([s2, w, col], i) => chip(ctx, s2, 960, 280 + i * 90, col, q.on(w, 1), 34));
      chip(ctx, 'studie psychologie (bachelor + master) → 2 jaar opleiding → gezondheidszorgpsycholoog', 960, 720, C.text2, q.on('master', 1), 28); ctx.restore(); }
    if (Z > 0.01) { hulpkaart(ctx, 120, 150, Z); persoon(ctx, 'sam', 1620, 880, 520, { a: Z, t, kijk: -1 }); chip(ctx, 'praat ook met je mentor', 710, 810, C.teal, q.on('mentor', 1), 32); } }
});
