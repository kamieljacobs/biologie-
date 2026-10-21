// Wat word jij? · Tandheelkunde 4 · Een tand door bot — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Noor met een beugel; Tandarts Wouter; Mondhygiënist Ilse).
// Rode draad: Noors scheve hoektand die in twee jaar door het kaakbot schuift. De beugel staat alleen op close-ups van de tanden (niet over het gezicht van Noor).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }
// één tekstvak tegelijk op een vaste plek: lijst = [[woord, n, tekst, kleur], …]; de vorige gaat weg vóór de volgende komt
function tekstVak(ctx, lijst, x, y, t, q, px = 30, soort = 'tag') { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n) - 0.05) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.35)) / 0.3, 0, 1) : 0; const a = q.on(w, n, 0.35) * (1 - uit);
  if (soort === 'naam') naamBij(ctx, s2, '', x, y, a, 'center', col || C.text); else tag(ctx, s2, x, y, col, a, 'center', px); }
const golfje = (t, t0) => t > t0 ? Math.max(0, Math.sin((t - t0) * 4.2)) * Math.exp(-((t - t0) % 1.5) * 0.4) : 0;

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.1) % 1; tandBot(ctx, 1480, 520, 0.6, { t, sh: 46 * ease(u * 1.3), p: 1, eat: 1, clast: 1, blast: 1, dep: 1, beugel: 1, kracht: 1, cellen: 0.8, kruimels: 1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Maar', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'noor', 380, 880, 560, { t, kijk: 1, uit: 'lacht', a: clamp(t / 0.3, 0, 1) });
      spiegel(ctx, 1180, 450, 860, 600, 1, () => { const H = gebitVoor(ctx, 1180, 450, 0.66, { t, beugel: q.on('beugel', 1), scheef: 1, kring: q.on('hoektand', 1) });
        if (q.on('millimeter', 1) > 0.01) { const d = 30 * q.on('opschuiven', 1, 1.6); pijl(ctx, H.x + 50, H.y - 120, H.x + 50, H.y - 40 + d * 0.2, C.goud, q.on('millimeter', 1), 6, 20); } });
      naamBij(ctx, 'Noor', '', 380, 250, clamp(t / 0.4, 0, 1) * (1 - q.on('orthodontist', 1)), 'center');
      tag(ctx, 'beugel van de orthodontist', 1180, 100, C.teal, q.on('orthodontist', 1) * (1 - q.on('hoektand', 1)), 'center', 30);
      naamBij(ctx, 'hoektand', 'staat scheef', 1180, 820, q.on('hoektand', 1), 'center'); });
    laag(ctx, B, () => { tandBot(ctx, 900, 450, 0.82, { t, beugel: 1, kracht: q.on('bewegen', 1) });
      naamBij(ctx, 'kaakbot', 'hard als steen', 1300, 700, q.on('hard', 1), 'left');
      vraagteken(ctx, 1520, 360, q.on('bewegen', 1), 130); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('eerst', 1));
    tandBot(ctx, 760, 460, 0.82, { t, a: clamp(t / 0.6, 0, 1) });
    laag(ctx, q.on('eerst', 1), () => { spijkerHout(ctx, 1480, 400, 1.1); regel(ctx, 'zoals een spijker in hout?', 1480, 620, 1, C.text, 34, 'center', 700); vraagteken(ctx, 1480, 260, q.on('vastzit', 1), 90); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const X = 600, Y = 450, S = 0.84;
    const hap = q.at('hap', 1), veert = t > hap ? Math.max(0, Math.sin((t - hap) * 4)) * clamp((q.at('Zo', 1) + 1.2 - t), 0, 1) : 0;
    tandBot(ctx, X, Y, S, { t, dy: 9 * veert, drukGloed: q.on('wortelvlies', 1) * (1 - q.on('hap', 1)), trekGloed: q.on('wortelvlies', 1) * (1 - q.on('hap', 1)) });
    if (veert > 0.02) pijl(ctx, X, Y - 400 * S, X, Y - 330 * S + 6 * veert, C.goud, 1, 8, 24);
    kruis(ctx, X + 140, Y - 200, 26, q.on('vastgegroeid', 1) * (1 - q.on('Tussen', 1)));
    const W = tbPunt(X, Y, S, {}, 'wortel'); naamBij(ctx, 'wortel', '', W.x, W.y + 40, q.on('wortel', 1), 'center');
    naamBij(ctx, 'kaakbot', '', X - 300 * S, Y + 420 * S, q.on('bot', 1), 'left'); naamBij(ctx, 'tandvlees', '', X - 330 * S, Y - 60 * S, q.on('bot', 1), 'center');
    // inzoomen op de spleet
    const Z = q.on('spleet', 1, 0.8), pr = { x: X + 70 * S, y: Y + 180 * S };
    zoomCircle(ctx, 1450, 420, 270, pr.x, pr.y, '', Z, () => vliesVeer(ctx, 1450, 420, 270, { t, druk: veert }));
    laag(ctx, Z, () => { naamBij(ctx, 'wortel', '', 1300, 730, 1, 'center'); naamBij(ctx, 'bot', '', 1640, 730, 1, 'center');
      tekstVak(ctx, [['spleet', 1, 'een paar tiende mm', C.text2], ['wortelvlies', 1, 'wortelvlies', C.text], ['hap', 1, 'veert in', C.goud]], 1450, 800, t, q, 30, 'naam'); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const af = clamp((t - q.at('afbreken', 1) + 0.6) / 5, 0, 1), op = clamp((t - q.at('maken', 1) + 0.4) / 6, 0, 1);
    botWeefsel(ctx, 640, 480, 860, 560, { t, af, op, a: clamp(t / 0.5, 0, 1) });
    naamBij(ctx, 'levend weefsel', 'botcellen', 640, 830, q.on('levend', 1) * (1 - q.on('afbreken', 1)), 'center');
    naamBij(ctx, 'botafbreker', '', 434, 300, q.on('afbreken', 1), 'center', C.paars); naamBij(ctx, 'botopbouwer', '', 836, 300, q.on('maken', 1), 'center', C.groen);
    const SK = q.on('skelet', 1); dijbeen(ctx, 1460, 470, 1.05, { a: SK, t, dik: q.on('belast', 1, 2) * (0.5 + 0.5 * Math.sin(t * 0.8)), cellen: SK });
    naamBij(ctx, 'meer belast: steviger', '', 1460, 830, q.on('belast', 1) * (1 - q.on('film', 1)), 'center');
    tag(ctx, 'film: Hoe weefsel herstelt', 1460, 850, C.teal, q.on('film', 1) * (1 - q.on('leven', 2)), 'center', 28);
    rondPijl(ctx, 1460, 470, 230, q.on('leven', 2), t); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 440, S = 0.92;
    const p = q.on('samengeknepen', 1, 1.2), eat = clamp((t - q.at('afbreken', 1) + 0.4) / 2.6, 0, 1), dep = clamp((t - q.at('neer', 1) + 0.5) / 2, 0, 1);
    const sh = 52 * clamp((t - q.at('schuift', 1)) / 4.5, 0, 1);
    const o = { t, beugel: 1, kracht: clamp(t / 0.8, 0, 1) * (0.75 + 0.25 * Math.sin(t * 3)), p, eat, clast: q.on('Daar', 1), kruimels: q.on('afbreken', 1), drukGloed: q.on('samengeknepen', 1) * (1 - q.on('Daar', 1) * 0.6),
      trekGloed: q.on('uitgerekt', 1) * (1 - q.on('Daar', 2) * 0.6), blast: q.on('Daar', 2, 1.2), dep, sh, oud: 0, oudA: q.on('schuift', 1) * 0.9 };
    tandBot(ctx, X, Y, S, o);
    const D = tbPunt(X, Y, S, o, 'drukkant'), T = tbPunt(X, Y, S, o, 'trekkant');
    naamBij(ctx, 'drukkant', t < q.at('afbreken', 1) ? 'samengeknepen' : 'bot wordt afgebroken', 1170, D.y - 60, q.on('drukkant', 1), 'left', C.koraal);
    naamBij(ctx, 'trekkant', t < q.at('neer', 1) ? 'vezels uitgerekt' : 'nieuw bot', 350, T.y - 60, q.on('trekkant', 1), 'right', C.goud);
    naamBij(ctx, 'botafbrekers', '', 1170, D.y + 40, q.on('afbreken', 1) * (1 - q.on('schuift', 1)), 'left', C.paars);
    naamBij(ctx, 'botopbouwers', '', 350, T.y + 40, q.on('neer', 1) * (1 - q.on('schuift', 1)), 'right', C.groen);
    naamBij(ctx, 'beugel', 'licht, hele dag', X - 330 * S, Y - 330 * S, q.on('beugel', 1) * (1 - q.on('kant', 1)), 'center');
    laag(ctx, q.on('millimeter', 1), () => { kalender(ctx, 1600, 260, 0.9, '1 mm', 'per maand'); });
    naamBij(ctx, 'hele tandbed schuift mee', '', 1170, D.y + 40, q.on('bed', 1) * (1 - q.on('millimeter', 1)), 'left'); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'noor', 520, 880, 520, { t, kijk: 1, uit: t < q.at('controle', 1) ? 'lacht' : 'praat', pose: q.on('harder', 1) > 0.5 ? 'wijsOmhoog' : 'staan', a: clamp(t / 0.3, 0, 1) });
    naamBij(ctx, 'Noor', 'wil haar beugel kwijt', 520, 270, clamp(t / 0.5, 0, 1) * (1 - q.on('Wouter', 1)), 'center');
    persoon(ctx, 'wouter', 1000, 880, 560, { t, kijk: -1, uit: q.on('harder', 1) > 0.5 ? 'denkt' : 'blij', a: q.on('controle', 1, 0.3) });
    naamBij(ctx, 'Tandarts Wouter', 'gewone controle', 1000, 250, q.on('Wouter', 1), 'center');
    krachtMeter(ctx, 1520, 520, 190, 0.3 + 0.62 * q.on('harder', 1, 1.2) + 0.02 * Math.sin(t * 9) * q.on('harder', 1), q.on('kan', 1));
    vraagteken(ctx, 1520, 240, q.on('denk', 1), 110); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const X = 700, Y = 450, S = 0.88;
    const licht = q.on('Licht', 1, 1), ruim = q.on('opgeruimd', 1, 2.5), verder = clamp((t - q.at('verder', 1)) / 3, 0, 1);
    tandBot(ctx, X, Y, S, { t, beugel: 1, kracht: 1, hard: 1 - licht, p: 1, eat: 0.25 + 0.75 * verder, clast: verder, dicht: q.on('bloed', 1, 1) * (1 - verder), grijs: q.on('sterft', 1, 1) * (1 - ruim),
      achter: q.on('opgeruimd', 1) * (1 - verder), sh: 30 * verder, cellen: 0.6, kruimels: verder });
    krachtMeter(ctx, 1560, 330, 160, 0.95 - 0.7 * licht + 0.02 * Math.sin(t * 9) * (1 - licht), 1);
    tekstVak(ctx, [['bloed', 1, 'vaatjes dichtgedrukt', C.koraal], ['sterft', 1, 'stukje weefsel sterft af', C.koraal], ['Pas', 1, 'tand staat stil', C.koraal], ['opgeruimd', 1, 'botafbrekers ruimen op', C.paars], ['verder', 1, 'pas dan weer verder', C.groen],
      ['Harder', 1, 'harder ≠ sneller', C.goud], ['Licht', 1, 'licht en lang', C.groen]], 1560, 640, t, q, 30);
    laag(ctx, q.on('Pas', 1) * (1 - q.on('verder', 1)), () => klokje(ctx, 1560, 760, 46, (t * 0.15) % 1, 1));
    naamBij(ctx, 'de orthodontist stelt de kracht in', '', 1560, 760, q.on('orthodontist', 1), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verbouwing', 1, 1), Cc = q.on('Daarom', 1, 1); const [A1, B1] = wisselA(B); const [, C1] = wisselA(Cc); const Bz = B1 * (1 - clamp(Cc * 2, 0, 1));
    laag(ctx, A1, () => { persoon(ctx, 'noor', 360, 880, 540, { t, kijk: 1, uit: 'lacht' });
      gebitVoor(ctx, 1200, 460, 0.82, { t, beugel: 1 - q.on('eraf', 1, 1), scheef: 0 });
      kalender(ctx, 1200, 800 - 2, 0.6, '2 jaar', '', q.on('twee', 1) * (1 - q.on('Klaar', 1)));
      tag(ctx, 'klaar?', 1200, 860, C.goud, q.on('Klaar', 1), 'center', 32); kruis(ctx, 1330, 845, 22, q.on('niet', 1)); });
    laag(ctx, Bz, () => { const X = 760, Y = 450, S = 0.88; const back = 14 * clamp((t - q.at('terug', 1)) / 2, 0, 1);
      tandBot(ctx, X, Y, S, { t, sh: 50 - back + 3 * Math.sin(t * 2) * q.on('terug', 1), blast: 1, dep: 1, clast: 0.6, eat: 0.5, cellen: 1, elast: q.on('vezels', 1), oud: 0, oudA: q.on('terug', 1) * 0.9 });
      naamBij(ctx, 'nog in verbouwing', '', 1180, 760, 1 - q.on('vezels', 1), 'left');
      naamBij(ctx, 'vezels in het tandvlees', 'gespannen', 340, 300, q.on('vezels', 1), 'right', C.koraal);
      naamBij(ctx, 'oude plek', '', X, Y - 330 * S, q.on('terug', 1), 'center', C.goud);
      if (q.on('terug', 1) > 0.01) pijl(ctx, X + 160, 230, X + 40, 230, C.koraal, q.on('terug', 1), 6, 20); });
    laag(ctx, C1, () => { const H = gebitBoven(ctx, 760, 470, 0.95, { t, draad: q.on('draadje', 1, 1.5), schuif: q.on('schuiven', 1) });
      naamBij(ctx, 'draadje aan de binnenkant', '', 1240, 400, q.on('binnenkant', 1), 'left', C.text);
      kalender(ctx, 1450, 650, 0.85, 'jaren', '', q.on('jaren', 1) * (1 - q.on('leven', 1) * 0)); naamBij(ctx, 'soms je hele leven', '', 1450, 820, q.on('leven', 1), 'center'); }); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Sk = q.on('schedels', 1, 0.8); const [A, B] = wisselA(Sk);
    laag(ctx, A, () => { [['sam', 560], ['noor', 800], ['bilal', 1040], ['yasmin', 1280]].forEach(([id, x], i) => persoon(ctx, id, x + 40, 880, 440, { t, kijk: i < 2 ? 1 : -1, uit: 'lacht', a: q.on('jongeren', 1, 0.3) }));
      vraagteken(ctx, 1560, 360, q.on('beugel', 1), 110); });
    laag(ctx, B, () => { schedelZij(ctx, 520, 410, 0.82, { t, k: 1, rij: q.on('recht', 1), hl: q.on('verstandskiezen', 1), hlKleur: C.groen });
      naamBij(ctx, 'jager-verzamelaar', 'ruime kaak', 520, 760, 1, 'center');
      laag(ctx, q.on('moderne', 1), () => { schedelZij(ctx, 1380, 410, 0.82, { t, k: 0, hl: q.on('klein', 1), hlKleur: C.koraal }); naamBij(ctx, 'nu', 'krappe kaak', 1380, 760, 1, 'center'); });
      naamBij(ctx, 'verstandskies past', '', 820, 300, q.on('verstandskiezen', 1) * (1 - q.on('moderne', 1)), 'left', C.groen);
      vraagteken(ctx, 960, 300, q.on('denk', 1), 110); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a', 1 - q.on('kaak', 1)); const E = q.on('Dit', 1, 1); const [A, B] = wisselA(E);
    laag(ctx, A, () => { const kw = q.on('kauwen', 1);
      schedelZij(ctx, 520, 420, 0.8, { t, k: 1, kauw: kw * (1 - q.on('zacht', 1)), rij: q.on('tanden', 1) });
      voedsel(ctx, 520, 820, 0.9, 'taai', q.on('kauwen', 1)); naamBij(ctx, 'veel en hard kauwen', 'kaak groeit sterker', 520, 110, q.on('sterker', 1), 'center');
      laag(ctx, q.on('zacht', 1), () => { schedelZij(ctx, 1380, 420, 0.8, { t, k: 0, kauw: 0.3, rij: q.on('tanden', 1), hl: q.on('minder', 1), hlKleur: C.koraal }); voedsel(ctx, 1380, 820, 0.9, 'zacht'); naamBij(ctx, 'zacht eten', 'kaak groeit minder', 1380, 110, q.on('minder', 1), 'center'); });
      naamBij(ctx, 'tanden: bijna even groot', '', 960, 520, q.on('tanden', 1) * (1 - q.on('minder', 1)), 'center', C.groen); });
    laag(ctx, B, () => { schedelZij(ctx, 1280, 430, 0.85, { t, k: 0, kauw: 0.3, hl: 1, hlKleur: C.koraal }); voedsel(ctx, 1280, 820, 0.9, 'zacht');
      tag(ctx, 'film: Selectie van dichtbij', 480, 300, C.teal, q.on('Selectie', 1), 'center', 30); kruis(ctx, 760, 280, 22, q.on('snel', 1));
      regel(ctx, 'te snel voor evolutie', 480, 380, q.on('snel', 1), C.text2, 30, 'center', 700);
      tag(ctx, 'vooral de omgeving', 480, 540, C.groen, q.on('omgeving', 1), 'center', 40);
      tag(ctx, 'erfelijkheid speelt mee', 480, 660, C.paars, q.on('erfelijkheid', 1), 'center', 30); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const X = 1180, Y = 450, S = 0.74;
    gebitVoor(ctx, X, Y, S, { t, beugel: 1 - q.on('eraf', 1, 0.8), scheef: 0, plak: q.on('plak', 1, 1.5) * (1 - q.on('Ilse', 1, 1.5) * 0.85), wit: q.on('witte', 1) * 0.9, rager_: q.on('Ilse', 1) * (1 - q.on('eraf', 1)) });
    naamBij(ctx, 'plak rond de blokjes', '', X, Y + 300, q.on('plak', 1) * (1 - q.on('Ilse', 1)), 'center', C.oker);
    tag(ctx, 'film: Zuur in je mond', X, Y + 340, C.teal, q.on('witte', 1), 'center', 28);
    kruis(ctx, X + 440, Y - 250, 26, q.on('witte', 1));
    persoon(ctx, 'ilse', 330, 880, 540, { t, kijk: 1, uit: 'blij', pose: 'vasthouden', hold: ragerHold, a: q.on('Daarom', 1, 0.3) });
    naamBij(ctx, 'Mondhygiënist Ilse', '', 330, 250, q.on('Ilse', 1), 'center'); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('draadje', 1, 1); const [A, B] = wisselA(D);
    persoon(ctx, 'noor', 230, 880, 520, { t, kijk: 1, uit: 'lacht' });
    laag(ctx, A, () => { const sh = 50 * clamp((t - q.at('hoektand', 1)) / 6, 0, 1); tandBot(ctx, 760, 470, 0.62, { t, sh, p: 1, eat: 1, clast: q.on('afbraken', 1), blast: q.on('opbouwden', 1), dep: q.on('opbouwden', 1), beugel: 1, kracht: q.on('duwtje', 1), oud: 0, oudA: q.on('schoof', 1) * 0.8 }); });
    laag(ctx, B, () => gebitBoven(ctx, 760, 470, 0.72, { t, draad: 1 }));
    recapKaart(ctx, 1210, 220, 620, 'wortelvlies: de tand hangt in vezels', C.teal, q.on('hoektand', 1));
    recapKaart(ctx, 1210, 350, 620, 'drukkant: bot afgebroken', C.koraal, q.on('afbraken', 1));
    recapKaart(ctx, 1210, 480, 620, 'trekkant: bot opgebouwd', C.goud, q.on('opbouwden', 1));
    recapKaart(ctx, 1210, 610, 620, 'licht en lang duwen', C.groen, q.on('duwtje', 1));
    recapKaart(ctx, 1210, 740, 620, 'draadje houdt alles op zijn plek', C.paars, q.on('draadje', 1)); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'wouter', 250, 880, 520, { t, kijk: 1, uit: 'blij', a: clamp(t / 0.3, 0, 1) }); naamBij(ctx, 'tandarts', '', 250, 260, q.on('tandarts', 1), 'center');
    const x0 = 560, u = 118, y0 = 300; const b1 = q.on('tandheelkunde', 1, 1), b2 = q.on('vier', 1, 1.2);
    laag(ctx, b1, () => { roundRect(ctx, x0, y0, 6 * u * b1, 70, 14); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); regel(ctx, 'tandheelkunde · 6 jaar', x0 + 3 * u, y0 + 46, 1, C.text, 30, 'center', 700); });
    laag(ctx, b2, () => { roundRect(ctx, x0 + 6 * u + 12, y0, 4 * u * b2, 70, 14); shape(ctx, rgba(C.goud, 0.3), C.goud, 2); regel(ctx, '+ 4 jaar', x0 + 8 * u + 12, y0 + 46, 1, C.text, 30, 'center', 700);
      naamBij(ctx, 'orthodontist', 'stand van tanden en kaken', x0 + 8 * u + 12, y0 + 140, q.on('specialiseert', 1), 'center', C.goud); });
    const sp = q.on('specialismen', 1); laag(ctx, sp, () => { metaText(ctx, 'twee erkende specialismen', 960, 560, C.grain, 'left', 26); });
    laag(ctx, sp, () => { roundRect(ctx, 600, 600, 520, 230, 18); shape(ctx, rgba(C.goud, 0.14), C.goud, 2); gebitVoor(ctx, 760, 715, 0.22, { t, beugel: 1 }); regel(ctx, 'orthodontie', 1010, 728, 1, C.text, 34, 'center', 700); });
    laag(ctx, q.on('kaakchirurgie', 1), () => { roundRect(ctx, 1180, 600, 560, 230, 18); shape(ctx, rgba(C.teal, 0.14), C.teal, 2); schedelZij(ctx, 1310, 710, 0.28, { t, k: 0.6 }); regel(ctx, 'kaakchirurgie', 1580, 728, 1, C.text, 34, 'center', 700); }); }
});
