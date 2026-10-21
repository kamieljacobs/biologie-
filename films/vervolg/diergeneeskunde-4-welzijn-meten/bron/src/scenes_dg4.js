// Wat word jij? · Diergeneeskunde 4 · Welzijn meten — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Dierenarts Mila in staloverall, stagiaire Lotte).
// Rode draad: staartbijten in een varkensstal.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// drie varkens in een hok; bijt = 0..1 (eerste varken bijt in de staart van het tweede)
function varkensGroep(ctx, x, y, s, t, o = {}) { const { bijt = 0, wond = 0, stroA = 0, rustig = 0 } = o;
  varken(ctx, x + 330 * s, y, s, { t, kijk: -1, wroet: rustig }); varken(ctx, x, y, s, { t, wond, staart: 1, hangStaart: wond > 0.5 ? 1 : 0 });
  const dx = (rustig > 0.5 ? -330 : -322) * s + Math.sin(t * 7) * 4 * bijt; varken(ctx, x + dx - 40 * s * (1 - bijt), y + (rustig > 0.5 ? 0 : 12 * s * bijt), s, { t, wroet: rustig }); }

Object.assign(SCENES, {
  title(ctx, t) { varkensHok(ctx, 1000, 760, 800, 360, 1, { stroA: 1 }); varken(ctx, 1240, 760, 1.1, { t, wroet: 1 }); varken(ctx, 1560, 760, 1, { t, kijk: -1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); varkensHok(ctx, 760, 760, 1060, 380, 1);
    varkensGroep(ctx, 1260, 760, 0.95, t, { bijt: q.on('bijt', 1), wond: q.on('bloedt', 1) });
    persoon(ctx, 'mila', 300, 880, 420, { t, outfit: 'stal', uit: q.on('anders', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('anders', 1) > 0.5 ? 'denk' : 'staan' }); naamBij(ctx, 'Dierenarts Mila', '', 300, 400, q.on('Lotte', 1), 'center');
    persoon(ctx, 'lotte', 560, 880, 370, { t, uit: q.on('agressief', 1) > 0.5 ? 'praat' : 'neutraal', pose: q.on('agressief', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Lotte', 'stagiaire', 560, 455, q.on('Lotte', 1), 'center');
    bubbel(ctx, 800, 420, 'gewoon agressief!', '#F2F2EE', q.on('agressief', 1), 30); chip(ctx, 'staart bloedt', 1180, 520, C.koraal, q.on('bloedt', 1), 28);
    vraagteken(ctx, 1240, 300, q.on('vooral', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const O = q.on('Weinig', 1);
    regel(ctx, 'alarmsignaal', 960, 230, q.on('alarmsignaal', 1), C.koraal, 56, 'center', 800);
    varken(ctx, 380, 700, 1.25, { t, wroet: 1 }); stro(ctx, 120, 700, 520, q.on('wroeten', 1)); naamBij(ctx, 'wroeten en kauwen', 'wil een varken de hele dag', 380, 380, q.on('wroeten', 1), 'center');
    varkensHok(ctx, 760, 700, 440, 300, q.on('niets', 1)); varkensGroep(ctx, 1000, 700, 0.6, t, { bijt: q.on('elkaar', 1), wond: q.on('elkaar', 1) });
    kaartje(ctx, 1290, 300, 300, 'weinig ruimte', C.oker, O, 26); kaartje(ctx, 1290, 380, 300, 'slechte lucht', C.oker, q.on('lucht', 1), 26); kaartje(ctx, 1600, 300, 260, 'tocht', C.oker, q.on('tocht', 1), 26); kaartje(ctx, 1600, 380, 260, 'te weinig voer', C.oker, q.on('voer', 1), 26);
    chip(ctx, 'het bijtende varken: niet de oorzaak, wel het eerste dat je ziet', 960, 830, C.goud, q.on('oorzaak', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Tegenwoordig', 1, 0.8);
    regel(ctx, 'wat is welzijn?', 960, 220, q.on('welzijn', 1) * (1 - D), C.goud, 52, 'center', 800);
    const v = [q.on('honger', 1), q.on('ongemak', 1), q.on('pijn', 1), q.on('angst', 1), q.on('natuurlijk', 1)].reduce((s2, x) => s2 + x, 0);
    vijfVakjes(ctx, 160, 300, 1600, ['vrij van\nhonger en dorst', 'vrij van\nongemak', 'vrij van\npijn en ziekte', 'vrij van\nangst en stress', 'vrij om\nnatuurlijk gedrag'], v, 1 - D, C.teal); regel(ctx, 'de vijf vrijheden', 960, 520, q.on('vrijheden', 1) * (1 - D), C.teal, 40, 'center', 800);
    chip(ctx, 'vooral: wat een dier níet moet hebben', 960, 610, C.text2, q.on('lijst', 1) * (1 - D), 28);
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; varken(ctx, 400, 860, 0.7, { t, wroet: q.on('spelen', 1) }); chip(ctx, 'spelen · verkennen · rusten', 400, 640, C.groen, q.on('spelen', 1), 26);
      vijfDomeinen(ctx, 1150, 300, 1, clamp((t - q.at('Voeding', 1)) / 3, 0, 1) * q.on('Voeding', 1), t); ctx.restore(); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('stereotiep', 1);
    regel(ctx, 'meet wat het dier doet', 960, 220, Math.max(0.5, q.on('meet', 1)), C.goud, 48, 'center', 800); regel(ctx, 'stereotiep gedrag', 960, 300, S, C.text, 40, 'center', 800); regel(ctx, 'steeds hetzelfde, zonder doel', 960, 350, S, C.text2, 28, 'center', 600);
    paard(ctx, 330, 800, 0.85, { t, a: q.on('paard', 1) }); kribbe(ctx, 330 + 300 * 0.85, 800, q.on('paard', 1), t); naamBij(ctx, 'kribbebijten', 'paard', 400, 420, q.on('paard', 1), 'center');
    kalfTong(ctx, 900, 790, 0.5, q.on('kalf', 1), t); naamBij(ctx, 'tongrollen', 'kalf', 980, 460, q.on('kalf', 1), 'center');
    const p = (Math.sin(t * 0.9) + 1) / 2; ijsbeer(ctx, 1380 + p * 300, 790, 1.1, q.on('ijsbeer', 1), Math.cos(t * 0.9) > 0 ? 1 : -1); naamBij(ctx, 'heen en weer lopen', 'ijsbeer', 1540, 460, q.on('ijsbeer', 1), 'center');
    chip(ctx, 'vaak: lang niet kunnen doen waar het dier door gemotiveerd is', 960, 860, C.koraal, q.on('gemotiveerd', 1), 26); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('cortisol', 1);
    tag(ctx, 'film: Stress · cortisol', 960, 220, C.teal, Math.max(0.5, q.on('lichaam', 1)), 'center', 30);
    bronIcoon(ctx, 'speeksel', 420, 430, 1.4, q.on('speeksel', 1)); naamBij(ctx, 'speeksel', '', 420, 540, q.on('speeksel', 1), 'center');
    bronIcoon(ctx, 'mest', 960, 440, 1.4, q.on('mest', 1)); naamBij(ctx, 'mest', '', 960, 540, q.on('mest', 1), 'center');
    bronIcoon(ctx, 'haar', 1500, 430, 1.4, q.on('haar', 1)); naamBij(ctx, 'haar', 'maandenlang', 1500, 540, q.on('haar', 1), 'center');
    const P = q.on('pas', 1); if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; pijl(ctx, 700, 820, 700, 660, C.koraal, 1, 6, 20); regel(ctx, 'stress', 700, 860, 1, C.koraal, 32, 'center', 800); pijl(ctx, 1220, 820, 1220, 660, C.oker, q.on('paren', 1), 6, 20); regel(ctx, 'opwinding, paren', 1220, 860, q.on('paren', 1), C.oker, 32, 'center', 800); regel(ctx, 'cortisol ↑', 960, 640, 1, C.text, 36, 'center', 800); ctx.restore(); }
    chip(ctx, 'combineer meerdere signalen', 960, 300, C.goud, q.on('combineert', 1), 30); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); melkStal(ctx, 160, 700, 620, 280, 'A', q.on('A', 1)); melkStal(ctx, 1140, 700, 620, 280, 'B', q.on('B', 1));
    koe(ctx, 470, 700, 0.55, { t, a: q.on('A', 1) }); koe(ctx, 1450, 700, 0.55, { t, a: q.on('B', 1), kijk: -1 });
    persoon(ctx, 'mila', 960, 880, 400, { t, outfit: 'stal', pose: 'denk', uit: 'denkt', a: q.on('vergelijkt', 1, 0.3) }); vraagteken(ctx, 960, 330, q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const G = q.on('gang', 1), H = q.on('hakken', 1), V = q.on('vet', 1), A = q.on('langzaam', 1, 0.6);
    regel(ctx, 'kijk naar het dier zelf', 960, 220, Math.max(0.5, q.on('zelf', 1)), C.goud, 48, 'center', 800); const S0 = 1 - q.on('gang', 1); if (S0 > 0.01) { melkStal(ctx, 160, 700, 620, 260, 'A', S0); melkStal(ctx, 1140, 700, 620, 260, 'B', S0); kruis(ctx, 960, 520, 40, S0 * q.on('mooie', 1)); }
    if (A < 0.5) { ctx.save(); ctx.globalAlpha *= (1 - 2 * A) * (1 - S0);
      const lx = 200 + clamp((t - q.at('gang', 1)) / 4, 0, 1) * 500; koe(ctx, lx, 760, 0.6, { t, a: G }); scoreKaart(ctx, 400, 400, 'KREUPELHEID', q.on('kreupel', 1) > 0.5 ? '2 / 5' : '…', C.teal, G);
      scoreKaart(ctx, 960, 400, 'HAKKEN', H > 0.5 ? '1 plek' : '…', C.oker, H); scoreKaart(ctx, 1520, 400, 'CONDITIE', V > 0.5 ? 'goed' : '…', C.groen, V);
      koe(ctx, 1400, 760, 0.6, { t, a: V, kijk: -1 }); ctx.restore(); }
    if (A > 0.5) { ctx.save(); ctx.globalAlpha *= 2 * A - 1; const nad = clamp((t - q.at('langzaam', 1)) / 4, 0, 1); const mx = 520 + nad * 320;
      koe(ctx, 1420, 780, 0.75, { t, kijk: -1 }); persoon(ctx, 'mila', mx, 880, 400, { t, outfit: 'stal', pose: 'wijs', uit: 'neutraal' }); afstandLat(ctx, mx + 120, 1250, 520, 'vluchtafstand', q.on('afstand', 1));
      chip(ctx, 'zegt iets over hoe mensen met de dieren omgaan', 960, 360, C.goud, q.on('omgaan', 1), 28); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'vaste protocollen', 960, 230, C.teal, Math.max(0.5, q.on('protocollen', 1)), 'center', 34);
    melkStal(ctx, 160, 700, 620, 260, 'A', 1); melkStal(ctx, 1140, 700, 620, 260, 'B', 1); persoon(ctx, 'gerrit', 1820, 880, 360, { t, kijk: -1, uit: 'blij', a: q.on('kent', 1) });
    scoreKaart(ctx, 470, 570, 'KREUPEL', 'meer', C.koraal, q.on('vergelijken', 1)); scoreKaart(ctx, 1450, 570, 'KREUPEL', q.on('Soms', 1) > 0.5 ? 'minder' : '…', C.groen, q.on('vergelijken', 1));
    chip(ctx, 'de veehouder kent elke koe', 1450, 830, C.groen, q.on('kent', 1), 28); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('stro', 1);
    persoon(ctx, 'lotte', 260, 880, 360, { t, uit: 'neutraal' }); persoon(ctx, 'mila', 520, 880, 420, { t, outfit: 'stal', pose: 'wijs', uit: 'blij' }); planTafel(ctx, 900, 720, Math.max(0.5, q.on('verslag', 1)), q.on('gezondheidsplan', 1) * 3); persoon(ctx, 'gerrit', 1220, 880, 420, { t, kijk: -1, uit: 'blij', a: q.on('veehouder', 1, 0.4) }); naamBij(ctx, 'Gerrit', 'veehouder', 1220, 420, q.on('veehouder', 1), 'center');
    kaartje(ctx, 1400, 250, 440, 'kauwmateriaal', C.groen, M, 26); kaartje(ctx, 1400, 340, 440, 'ruimte', C.groen, q.on('ruimte', 1), 26); kaartje(ctx, 1400, 430, 440, 'ventilatie', C.groen, q.on('ventilatie', 1), 26); kaartje(ctx, 1400, 520, 440, 'rustige groepen', C.groen, q.on('rustigere', 1), 26);
    chip(ctx, 'volgende bezoek: werkt het?', 1620, 680, C.goud, q.on('volgende', 1), 28); naamBij(ctx, 'vast bedrijfsbezoek', '', 120, 220, q.on('bedrijfsbezoek', 1), 'left'); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('dierenarts', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - B;
    const kn = q.on('verwijderd', 1); varken(ctx, 600, 720, 0.85, { t, staart: kn > 0.5 ? 0.4 : 1 }); naamBij(ctx, 'big', 'kort na de geboorte', 640, 520, q.on('biggen', 1), 'center'); heteTang(ctx, 470 - 100 * (1 - kn), 660 + 60 * (1 - kn), 1.2, Math.max(q.on('tang', 1), kn), 1, t); naamBij(ctx, 'couperen', 'hete tang', 360, 440, q.on('couperen', 1), 'center');
    chip(ctx, 'minder bijten', 1300, 300, C.groen, q.on('vermindert', 1), 28); chip(ctx, 'maar: pijn', 1300, 370, C.koraal, q.on('pijn', 1), 28); chip(ctx, 'EU: niet als vaste gewoonte', 1300, 470, C.teal, q.on('Europese', 1), 28); chip(ctx, 'in Nederland: bijna alle biggen', 1300, 560, C.oker, q.on('Nederland', 1), 28);
    regel(ctx, 'signaal weg, probleem niet', 1300, 700, q.on('signaal', 1), C.goud, 40, 'center', 800); ctx.restore();
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'mila', 260, 880, 400, { t, outfit: 'stal', uit: 'denkt', pose: 'denk' }); belangen(ctx, 1100, 760, 1, [q.on('dier', 2), q.on('veehouder', 1), q.on('regels', 1), q.on('samenleving', 1)], t); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); varkensHok(ctx, 900, 760, 900, 360, 1, { stroA: 1, touw: 1 }); varkensGroep(ctx, 1300, 760, 0.85, t, { rustig: 1 });
    persoon(ctx, 'lotte', 360, 880, 380, { t, uit: 'blij' }); persoon(ctx, 'mila', 620, 880, 420, { t, outfit: 'stal', uit: 'blij', kijk: -1 });
    regel(ctx, 'geen probleem, maar een boodschap', 960, 220, q.on('boodschap', 1), C.goud, 44, 'center', 800); chip(ctx, 'meerdere signalen tegelijk', 1350, 300, C.teal, q.on('signalen', 1), 28); },
  s15(ctx, t, q) { bg(ctx, 'schema'); kaartje(ctx, 160, 260, 480, 'praktijk', C.teal, q.on('praktijk', 1), 34); kaartje(ctx, 720, 260, 480, 'overheid', C.oker, q.on('overheid', 1), 34); kaartje(ctx, 1280, 260, 480, 'hbo · dierhouderij', C.groen, q.on('hbo', 1), 34);
    regel(ctx, 'dierenarts', 400, 400, q.on('praktijk', 1), C.text2, 28, 'center', 600); regel(ctx, 'controle bij transport en slacht', 960, 400, q.on('geslacht', 1), C.text2, 28, 'center', 600); regel(ctx, 'bedrijf · adviseur · onderzoek', 1520, 400, q.on('adviseur', 1), C.text2, 28, 'center', 600);
    persoon(ctx, 'lotte', 760, 880, 320, { t, uit: 'blij' }); persoon(ctx, 'mila', 980, 880, 360, { t, uit: 'blij' }); persoon(ctx, 'gerrit', 1200, 880, 360, { t, uit: 'blij', kijk: -1, a: q.on('bedrijf', 1, 0.4) }); }
});
