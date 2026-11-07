// Wat word jij? · Forensisch onderzoek · Sporen op de plaats delict: is dit bloed? — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Bilal stagiair forensisch onderzoek, Dr. Kim forensisch onderzoeker, beiden outfit plaatsdelict);
// Micro alleen binnen een zoomcirkel (hemoglobine met vier heemgroepen, antistof op de strook, amylase en zetmeel).
// Rode draad: één bruine vlek in de gang. Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

const PD = { outfit: 'plaatsdelict' };
const VLEK = [930, 838], MES = [1290, 846];
function bilal(ctx, x, t, o = {}) { return persoon(ctx, 'bilal', x, FLOOR, 430, Object.assign({ t, uit: 'neutraal', kijk: 1 }, PD, o)); }
function kim(ctx, x, t, o = {}) { return persoon(ctx, 'kim', x, FLOOR, 420, Object.assign({ t, uit: 'neutraal', kijk: -1 }, PD, o)); }
// de vlek en het mes in de gang, met bordjes
function sporenInGang(ctx, o = {}) { const { a = 1, mesA = 1, spatA = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vloerVlek(ctx, VLEK[0], VLEK[1], 40, 1, { seed: 5 });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.ellipse(VLEK[0], VLEK[1], 78, 32, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  nummerbordje(ctx, VLEK[0] + 80, VLEK[1] + 8, 1, 1);
  mes(ctx, MES[0], MES[1], 0.75, -0.12, mesA); nummerbordje(ctx, MES[0] + 90, MES[1] + 6, 2, mesA);
  if (spatA > 0.01) { [[400, 560, 14, 14, 0], [440, 600, 12, 24, 1.3], [380, 640, 10, 10, 0], [470, 650, 9, 18, 1.2]].forEach(([x, y, b, l, an]) => spat(ctx, x, y, b, l, an, spatA)); }
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) {
    // rechts: de vlek met bordje en liniaal, en het blauwe licht van luminol als voetstappen
    ctx.save(); ctx.fillStyle = KL_VLOER; roundRect(ctx, 1060, 620, 760, 220, 20); ctx.fill(); ctx.restore();
    vloerVlek(ctx, 1260, 720, 70, 1, { seed: 5 }); nummerbordje(ctx, 1390, 740, 1, 1);
    liniaal(ctx, 1170, 790, 10, 18, 1, { labels: false });
    for (let i = 0; i < 4; i++) { const k = 0.6 + 0.4 * Math.sin(t * 1.4 + i); lichtVlek(ctx, 1500 + i * 70, 700 - (i % 2) * 40, 26, 11, k * 0.8); voetafdruk(ctx, 1500 + i * 70, 700 - (i % 2) * 40, 1, -0.3, rgba(KL_LUMI, 0.9), k); }
    hemoglobine(ctx, 1640, 400, 120, { t });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); gang(ctx);
    sporenInGang(ctx, { mesA: q.on('mes', 1), hl: q.on('bloed', 1) });
    chip(ctx, 'de bewoner: gewond, in het ziekenhuis', 960, 210, C.koraal, q.on('ziekenhuis', 1), 28);
    const B = q.on('Bilal', 1, 0.3);
    bilal(ctx, 640, t, { a: B, pose: q.on('vlek', 1) > 0.5 ? 'wijs' : 'staan' });
    naamBij(ctx, 'Bilal', 'stagiair forensisch onderzoek', 640, 352, B, 'center');
    naamBij(ctx, 'bruine vlek', '', VLEK[0], 770, q.on('bruine', 1), 'center');
    naamBij(ctx, 'mes', '', MES[0], 770, q.on('mes', 1), 'center');
    tag(ctx, 'bloed?', 1180, 380, C.koraal, q.on('bloed', 1), 'center', 34);
    tag(ctx, 'van een mens?', 1180, 470, C.koraal, q.on('mens', 1), 'center', 34);
    vraagteken(ctx, 1180, 640, q.on('denk', 1), 110); },

  // ---------- H1 Sporen vinden ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord b: naar hemoglobine');
    // links: drie bruine vlekken die er hetzelfde uitzien
    const N = [['koffie', '#6A4A30'], ['roest', '#8A4E2A'], ['bloed?', KL_BLOED]];
    N.forEach(([nm, col], i) => { const y = 330 + i * 170; vloerVlek(ctx, 300, y, 54, 1, { col, seed: 3 + i });
      naamBij(ctx, nm, '', 420, y + 12, i < 2 ? q.on(nm, 1) : 1, 'left'); });
    // zoomcirkel vanuit de bloedvlek: rode bloedcel → één hemoglobine
    const Z = q.on('hemoglobine', 1, 0.8), HB = q.on('heemgroepen', 1, 0.8);
    zoomCircle(ctx, 1180, 460, 290, 360, 670, 'VERGROOT · HEMOGLOBINE ± 5 NANOMETER', Z, () => {
      ctx.fillStyle = C.bgMicro; ctx.fillRect(840, 130, 680, 680);
      if (HB < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - HB; rodeBloedcel(ctx, 1180, 470, 230, 0.2, 0, 1);
        for (let i = 0; i < 26; i++) hbKlein(ctx, 1180 + (hash(i) - 0.5) * 300, 470 + (hash(i + 9) - 0.5) * 180, 12, 0.9); ctx.restore(); }
      if (HB > 0.01) { const P = hemoglobine(ctx, 1180, 460, 210, { a: HB, heem: q.on('heemgroepen', 1), fe: q.on('ijzeratoom', 1), t, hlHeem: q.on('Heem', 2) });
        const R = q.on('waterstofperoxide', 1, 0.8), k = clamp((t - q.at('waterstofperoxide', 1)) / 2.4, 0, 1);
        if (R > 0.01 && P.length) { const [hx, hy] = P[1]; h2o2(ctx, lerp(1450, hx + 40, ease(k)), lerp(230, hy - 30, ease(k)), 0.9, 0.4, R * (1 - clamp((k - 0.9) * 10, 0, 1) * 0.6)); } } });
    naamBij(ctx, 'rode bloedcel', '', 1180, 700, Z * (1 - HB), 'center');
    naamBij(ctx, 'heem', 'elk met één ijzeratoom', 1430, 250, q.on('heemgroepen', 1), 'left');
    chip(ctx, 'versnelt de reactie, zoals een enzym', 340, 820, C.goud, q.on('enzym', 1), 26);
    metaA(ctx, 'VEREENVOUDIGD', 340, 760, q.on('enzym', 1), C.grain, 'center', 24); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const X = [300, 720, 1140, 1560], st = [q.on('fotografeert', 1, 0.4), q.on('wattenstaafje', 1, 0.4), q.on('kleurloze', 1, 0.4), q.on('waterstofperoxide', 1, 0.4)];
    X.forEach((x, i) => { if (i < 3) pijl(ctx, x + 130, 460, X[i + 1] - 130, 460, rgba(C.line, 0.8), st[i + 1], 3, 14);
      metaA(ctx, 'STAP ' + (i + 1), x, 230, st[i], C.grain, 'center', 26); });
    // 1 foto met liniaal
    vloerVlek(ctx, X[0], 520, 56, 1, { seed: 5 }); liniaal(ctx, X[0] - 90, 580, 10, 18, st[0], { labels: false });
    camera(ctx, X[0], 380, 0.9, st[0], clamp((t - q.at('fotografeert', 1) - 0.3) / 0.6, 0, 1));
    naamBij(ctx, 'foto', 'met liniaal', X[0], 700, st[0], 'center');
    // 2 monster met vochtig staafje
    wattenstaafje(ctx, X[1] - 40, 600, 140, -1.2, { a: st[1], tip: '#C49A8A', nat: q.on('vochtig', 1) });
    naamBij(ctx, 'monster', 'vochtig wattenstaafje', X[1], 700, st[1], 'center');
    // 3 kleurloze vloeistof en wachten
    wattenstaafje(ctx, X[2] - 40, 600, 140, -1.2, { a: st[2], tip: '#C49A8A' });
    druppelflesje(ctx, X[2] + 10, 330, 0.7, rgba('#E8ECF0', 0.5), st[2]);
    { const k = clamp((t - q.at('kleurloze', 1) - 0.3) / 0.8, 0, 1); fo1Druppel(ctx, X[2] + 10, lerp(400, 440, k), rgba('#E8ECF0', 0.8), st[2] * (k < 1 ? 1 : 0)); }
    klokje(ctx, X[2] + 120, 330, 40, clamp((t - q.at('wacht', 1)) / 3, 0, 1), q.on('wacht', 1));
    naamBij(ctx, 'kleurloze vloeistof', 'even wachten', X[2], 700, st[2], 'center');
    // 4 peroxide
    wattenstaafje(ctx, X[3] - 40, 600, 140, -1.2, { a: st[3], tip: '#C49A8A' });
    druppelflesje(ctx, X[3] + 10, 330, 0.7, rgba(C.teal, 0.45), st[3]);
    naamBij(ctx, 'waterstofperoxide', 'pas als laatste', X[3], 700, st[3], 'center');
    vraagteken(ctx, 960, 860 - 40, q.on('denk', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord c: kleurt het al zonder peroxide?');
    const X = [380, 960, 1540];
    // 1 zonder peroxide: hoort kleurloos te blijven
    wattenstaafje(ctx, X[0] - 30, 640, 170, -1.35, { tip: '#E8E2D8' });
    naamBij(ctx, 'zonder peroxide', 'hoort niets te gebeuren', X[0], 260, 1, 'center');
    vink_(ctx, X[0] + 110, 400, 26, q.on('gebeuren', 1));
    // 2 al roze vóór de peroxide: iets anders kleurt
    const R = q.on('toch', 1);
    wattenstaafje(ctx, X[1] - 30, 640, 170, -1.35, { a: R, tip: KL_ROZE });
    naamBij(ctx, 'al roze vóór de peroxide', 'bijvoorbeeld koperzout', X[1], 260, R, 'center');
    kruis(ctx, X[1] + 110, 400, 24, q.on('telt', 1)); chip(ctx, 'test telt niet', X[1], 760, C.koraal, q.on('telt', 1), 28);
    // 3 Bilal: pas na de peroxide roze
    const B = q.on('Bilal', 1), k = clamp((t - q.at('peroxide', 2) - 0.2) / 0.8, 0, 1);
    wattenstaafje(ctx, X[2] - 30, 640, 170, -1.35, { a: B, tip: k > 0.5 ? KL_ROZE : '#E8E2D8' });
    druppelflesje(ctx, X[2] + 150, 560, 0.6, rgba(C.teal, 0.45), B * (1 - k * 0.5));
    naamBij(ctx, 'Bilal', 'roze ná de peroxide', X[2], 260, B, 'center');
    vink_(ctx, X[2] + 110, 400, 26, k); },

  s08(ctx, t, q) {
    const D = q.on('uit', 1, 1.2), Mr = q.on('Maar', 1, 0.8);
    bg(ctx, 'schema'); gang(ctx, { lint: 1 });
    // de vlek is al bemonsterd: alleen bordje 1 en de schone vloer
    vloerVlek(ctx, VLEK[0], VLEK[1], 40, 1, { seed: 5 }); nummerbordje(ctx, VLEK[0] + 80, VLEK[1] + 8, 1, 1);
    chip(ctx, 'foto en staafje gedaan, nu pas luminol', 960, 210, C.goud, q.on('luminol', 1) * (1 - D), 28);
    chip(ctx, 'zoekt bloed dat je niet ziet', 960, 300, C.teal, q.on('ziet', 1) * (1 - D), 28);
    // licht uit
    if (D > 0.01) { ctx.save(); ctx.fillStyle = rgba('#05080F', 0.72 * D); ctx.fillRect(0, 0, W, 880); ctx.restore(); }
    bilal(ctx, 560, t, { pose: 'staan', a: 1 - Mr }); naamBij(ctx, 'Bilal', '', 560, 380, 1 - Mr, 'center');
    const K = q.on('Kim', 1, 0.3), S = q.on('spuit', 1);
    const kh = kim(ctx, 1380, t, { a: K * (1 - Mr), pose: S > 0.01 ? 'vasthouden' : 'staan' });
    if (kh && kh.handR && S > 0.01) { sproeier(ctx, kh.handR.x - 4, kh.handR.y - 30, 0.8, S);
      const m = clamp((t - q.at('spuit', 1)) / 3, 0, 1) * (1 - clamp((t - q.at('spuit', 1) - 4) / 1, 0, 1));
      if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m * 0.5; for (let i = 0; i < 26; i++) circ(ctx, kh.handR.x - 30 - hash(i) * 300, kh.handR.y + hash(i + 4) * 280, 3, '#C9D6E4'); ctx.restore(); } }
    naamBij(ctx, 'Dr. Kim', 'forensisch onderzoeker', 1380, 352, K * (1 - Mr), 'center');
    // blauw licht waar heem zit: de vlek, en voetstappen naar de deur
    const L = q.on('blauw', 1, 0.8);
    lichtVlek(ctx, VLEK[0], VLEK[1], 46, 18, L * (1 - Mr * 0.5));
    const V = q.on('voetstappen', 1);
    for (let i = 0; i < 6; i++) { const x = 1020 + i * 95, y = 852 - (i % 2) * 26, k = clamp(V * 6 - i * 0.8, 0, 1) * (1 - Mr * 0.5);
      lichtVlek(ctx, x, y, 22, 9, k * 0.7); voetafdruk(ctx, x, y, 1, -0.1, rgba(KL_LUMI, 0.95), k); }
    chip(ctx, 'ook bloed dat ± 10 000 keer verdund is', 960, 210, C.teal, q.on('tienduizend', 1) * (1 - Mr), 28);
    metaA(ctx, 'GEMETEN (TOBE E.A. 2007)', 960, 262, q.on('tienduizend', 1) * (1 - Mr), C.grain, 'center', 24);
    // maar: licht = reactie versneld, en fel zegt weinig over de hoeveelheid
    if (Mr > 0.01) { ctx.save(); ctx.globalAlpha *= Mr; roundRect(ctx, 540, 150, 840, 420, 18); shape(ctx, rgba(C.bgSchema, 0.94), C.line, 2);
      regel(ctx, 'licht = de reactie gaat sneller', 960, 222, q.on('versnelt', 1), C.text, 36, 'center', 700);
      regel(ctx, 'niet: dit is bloed', 960, 274, q.on('versnelt', 1), C.koraal, 34, 'center', 700);
      const F = q.on('fel', 1);
      vloerVlek(ctx, 760, 470, 90, F * 0.7, { seed: 8 }); vloerVlek(ctx, 1160, 470, 26, F * 0.7, { seed: 9 });
      lichtVlek(ctx, 760, 470, 60, 24, F); lichtVlek(ctx, 1160, 470, 60, 24, F);
      naamBij(ctx, 'veel bloed', '', 760, 380, F, 'center'); naamBij(ctx, 'weinig bloed', '', 1160, 380, F, 'center');
      metaA(ctx, 'EVEN FEL', 960, 480, q.on('hoeveelheid', 1), C.grain, 'center', 26); ctx.restore(); } },

  // ---------- H2 Is het menselijk? ----------
  s09(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'voorproef: het kán bloed zijn', 960, 200, C.goud, 1, 'center', 36);
    // links: planten met enzymen die net zo werken
    const P = q.on('Mierikswortel', 1);
    mierikswortel(ctx, 260, 520, 1.3, P); aardappel(ctx, 470, 560, 1.1, q.on('aardappel', 1));
    naamBij(ctx, 'mierikswortel', '', 260, 720, P, 'center'); naamBij(ctx, 'aardappel', '', 470, 720, q.on('aardappel', 1), 'center');
    chip(ctx, 'werkt net zo', 365, 300, C.groen, q.on('werken', 1), 26);
    // midden: heem van mens en hond is hetzelfde, het eiwit eromheen verschilt
    const Z = q.on('zoogdieren', 1);
    hemoglobine(ctx, 860, 520, 120, { a: Z, kleur: ['#C46A5A', '#D9907E'] }); hemoglobine(ctx, 1180, 520, 120, { a: Z, kleur: ['#B08A5C', '#C9A35C'] });
    naamBij(ctx, 'mens', '', 860, 720, Z, 'center'); naamBij(ctx, 'hond', '', 1180, 720, Z, 'center');
    metaA(ctx, 'ZELFDE HEEM · ANDER EIWIT', 1020, 340, Z, C.grain, 'center', 26);
    // rechts: de hondenmand bij de deur, pootafdrukken in de gang
    const H = q.on('hond', 1);
    hondenmand(ctx, 1600, 600, 1, H); for (let i = 0; i < 5; i++) pootafdruk(ctx, 1460 - i * 60, 690 + (i % 2) * 22, 1.2, 0, rgba('#B8B0A0', 0.6), clamp(q.on('gang', 1) * 5 - i, 0, 1));
    naamBij(ctx, 'de hond van de bewoner', 'ongedeerd', 1600, 480, H, 'center'); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const HD = q.on('hondenbloed', 1, 0.8);
    const stroom = clamp((t - q.at('strookje', 1)) / 10, 0, 1);
    strookSchema(ctx, { a: 1 - HD * 0.75, mono: q.on('antistoffen', 1), stroom, T: q.on('testlijn', 1) * q.on('tweede', 1), Cl: q.on('controlelijn', 1), t, labels: q.on('testlijn', 1) });
    naamBij(ctx, 'monster', '', STRK.x0 + 100, 470, 1 - HD, 'center');
    naamBij(ctx, 'antistoffen met rood deeltje', 'tegen menselijk hemoglobine', STRK.xConj, 680, q.on('kleurdeeltje', 1) * (1 - HD), 'center');
    tag(ctx, 'zoals een zelftest', 960, 200, C.text2, q.on('zelftest', 1) * (1 - q.on('vorm', 1)), 'center', 28);
    // zoom op de testlijn: antistof — hemoglobine — antistof (sandwich)
    const ZT = q.on('vorm', 1, 0.8) * (1 - q.on('controlelijn', 1, 0.8)), ZC = q.on('controlelijn', 1, 0.8) * (1 - HD);
    zoomCircle(ctx, 960, 270, 130, STRK.xT, STRK.y - 50, null, ZT * (1 - HD), () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(820, 130, 280, 280);
      antistof(ctx, 960, 350, 1.1, 0, { col: '#AFC0D0' });                              // vastgezette antistof op de lijn
      const k = q.on('tweede', 1, 1.2); hbKlein(ctx, 960, lerp(170, 296, k), 26, 1);
      antistof(ctx, 960, lerp(124, 250, k), 1.1, Math.PI, { col: '#8FA0C8', deeltje: 1 }); });
    metaA(ctx, 'PAST OP ÉÉN VORM', 960, 444, ZT * (1 - HD) * q.on('vorm', 1), C.grain, 'center', 22);
    zoomCircle(ctx, 1420, 270, 130, STRK.xC, STRK.y - 50, null, ZC, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1280, 130, 280, 280);
      antistof(ctx, 1420, 350, 1.1, 0, { col: '#7FC48F' }); antistof(ctx, 1420, 236, 1.1, Math.PI, { col: '#8FA0C8', deeltje: 1 }); });
    metaA(ctx, 'VANGT LEGE GEKLEURDE ANTISTOFFEN', 1420, 444, ZC, C.grain, 'center', 22);
    naamBij(ctx, 'testlijn T', '', STRK.xT, 680, q.on('testlijn', 1) * (1 - HD), 'center');
    naamBij(ctx, 'controlelijn C', '', STRK.xC, 680, q.on('controlelijn', 1) * (1 - HD), 'center');
    // in het lab getest met hondenbloed: alleen C
    if (HD > 0.01) { strookjeKlein(ctx, 960, 340, 1.6, 0, clamp((t - q.at('streep', 1)) / 0.8, 0, 1), HD);
      naamBij(ctx, 'in het lab getest: hondenbloed', '', 960, 210, HD, 'center'); }
    vraagteken(ctx, 1600, 330, q.on('denk', 1), 100); },

  s12(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord a: geen menselijk hemoglobine');
    strookjeKlein(ctx, 520, 420, 1.5, 0, 1, 1, q.on('werkte', 1));
    naamBij(ctx, 'hondenbloed', '', 520, 290, 1, 'center');
    chip(ctx, 'C kleurt: de test werkte', 520, 560, C.groen, q.on('werkte', 1), 26);
    chip(ctx, 'T leeg: geen (of te weinig) menselijk hemoglobine', 520, 640, C.text2, q.on('hangen', 1), 24);
    const G = q.on('gang', 1);
    strookjeKlein(ctx, 1400, 420, 1.5, G, G, G);
    naamBij(ctx, 'de vlek uit de gang', '', 1400, 290, G, 'center');
    chip(ctx, 'T én C: waarschijnlijk mensenbloed', 1400, 560, C.goud, q.on('waarschijnlijk', 1), 26);
    const M = q.on('mensapen', 1);
    roundRect(ctx, 1080, 640, 640, 140, 14); ctx.save(); ctx.globalAlpha *= M; shape(ctx, rgba(C.fill, 0.6), C.koraal, 2);
    regel(ctx, 'kleurt T ook: mensapen, fret', 1400, 704, 1, C.text, 32, 'center', 700);
    metaA(ctx, 'GEMETEN', 1400, 752, q.on('gemeten', 1), C.grain, 'center', 24); ctx.restore(); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const Pp0 = q.on('testpapier', 1);
    // links: het aanrecht in de keuken met het glas
    aanrecht(ctx, 100, 640, 560); glas(ctx, 380, 640, 1.1, 1, { hl: q.on('hoort', 1), vlek: q.on('speeksel', 1) });
    naamBij(ctx, 'glas', 'hoort hier niet', 380, 410, 1, 'center');
    naamBij(ctx, 'speeksel?', '', 520, 520, q.on('speeksel', 1) * (1 - q.on('amylase', 1)), 'left'); naamBij(ctx, 'speeksel', 'veel amylase', 520, 520, q.on('amylase', 1) * (1 - Pp0), 'left');
    // rechts: testpapier dat blauw kleurt als amylase het zetmeel knipt
    const Pp = q.on('testpapier', 1), K = q.on('Knipt', 2, 1), los = clamp((t - q.at('Knipt', 2)) / 2.5, 0, 1);
    roundRect(ctx, 820, 170, 940, 140, 12); ctx.save(); ctx.globalAlpha *= Pp; shape(ctx, '#F2EEE4', '#B8B0A0', 2);
    for (let i = 0; i < 46; i++) { const px = 850 + hash(i + 70) * 880, py = 190 + hash(i + 71) * 100; circ(ctx, px, py, 5, rgba('#3E6FD8', 0.85), null); }  // kleurstof vast aan zetmeel
    ctx.fillStyle = rgba('#3E6FD8', 0.5 * los); ctx.beginPath(); ctx.ellipse(1290, 240, 60 + 360 * los, 30 + 34 * los, 0, 0, 6.283); ctx.fill(); ctx.restore();
    metaA(ctx, 'TESTPAPIER', 1290, 150, Pp, C.grain, 'center', 24);
    zoomCircle(ctx, 1290, 560, 250, 1290, 310, null, Pp, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1030, 300, 520, 520);
      kleurstofZetmeel(ctx, 1120, 600, 9, 16, { los, t });
      enzymKluwen(ctx, lerp(1480, 1300, ease(K)), 520, 60, { a: q.on('amylase', 1), sluit: K }); });
    naamBij(ctx, 'amylase', 'enzym in speeksel', 1500, 400, Pp, 'left');
    naamBij(ctx, 'zetmeel', 'met blauwe kleurstof', 1480, 770, Pp, 'left');
    chip(ctx, 'ook in andere lichaamsvochten', 380, 780, C.koraal, q.on('andere', 1), 26);
    tag(ctx, 'ook een voorproef', 380, 200, C.goud, q.on('voorproef', 1), 'center', 30); },

  // ---------- H3 Bloedsporen lezen ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    ctx.fillStyle = KL_MUUR; ctx.fillRect(140, 160, 1640, 640); ctx.fillStyle = '#151F33'; ctx.fillRect(140, 160, 120, 640);
    metaA(ctx, 'MUUR BIJ DE KEUKENDEUR', 300, 220, 1, C.grain, 'left', 26);
    spat(ctx, 720, 480, 120, 120, 0, 1);
    spat(ctx, 1240, 440, 110, 220, 1.35, 1, { staart: 1 });
    naamBij(ctx, 'rond', '', 720, 660, q.on('rond', 1), 'center'); naamBij(ctx, 'ovaal met staartje', '', 1250, 700, q.on('ovaal', 1), 'center');
    vraagteken(ctx, 1600, 500, q.on('denk', 1), 110); },

  s16(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord b: de ovale, die gleed door');
    const WX = 1080; ctx.fillStyle = KL_MUUR; ctx.fillRect(WX, 220, 60, 620); metaA(ctx, 'MUUR · ZIJAANZICHT', WX + 30, 880 - 16 - 20, 1, C.grain, 'center', 22);
    // boven: recht erop
    const k1 = clamp((t - q.at('recht', 1)) / 1.2, 0, 1), sp1 = q.on('alle', 1);
    if (k1 < 1) druppelZij(ctx, lerp(420, WX - 20, ease(k1)), 360, 20, 0, 1); else { ctx.fillStyle = KL_BLOED; roundRect(ctx, WX - 8, 360 - 22 - 14 * sp1, 10, 44 + 28 * sp1, 4); ctx.fill(); }
    pijl(ctx, 420, 300, 900, 300, rgba(C.line, 0.7), q.on('recht', 1), 2.5, 12);
    spat(ctx, 1420, 360, 110, 110, 0, sp1); naamBij(ctx, 'rond', 'recht erop', 1520, 370, sp1, 'left');
    // onder: schuin, onder een hoek van 30 graden met de muur
    const S = q.on('schuin', 1), k2 = clamp((t - q.at('schuin', 1)) / 1.2, 0, 1), gl = clamp((t - q.at('glijdt', 1)) / 1.2, 0, 1);
    const ax = WX - 20, ay = 600, bx = ax - 280 * Math.tan(Math.PI / 6) * 1.7, by = ay - 280 * 1.7 * 0.35;
    pijl(ctx, ax - 360, ay - 360 / Math.tan(Math.PI / 6) * 0.35, ax - 80, ay - 80 / Math.tan(Math.PI / 6) * 0.35, rgba(C.line, 0.7), S, 2.5, 12);
    if (k2 < 1) druppelZij(ctx, lerp(ax - 360, ax, ease(k2)), lerp(ay - 360 / Math.tan(Math.PI / 6) * 0.35, ay, ease(k2)), 20, 0, S);
    else { ctx.fillStyle = KL_BLOED; roundRect(ctx, WX - 8, ay - 20, 10, 40 + 110 * gl, 4); ctx.fill(); }
    spat(ctx, 1420, 640, 90, 180, Math.PI / 2, gl, { staart: q.on('staartje', 1) });
    naamBij(ctx, 'ovaal', 'schuin: glijdt door', 1490, 620, gl, 'left');
    chip(ctx, 'staartje wijst de vliegrichting', 1620, 800, C.goud, q.on('wijst', 1), 24); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    const PX = 30, cx = 420, cy = 470, b = 5 * PX, l = 10 * PX;  // 30 px per millimeter
    spat(ctx, cx, cy, b, l, Math.PI / 2, 1, { staart: rgba('#8A9AB0', 0.6) });
    metaA(ctx, 'STAARTJE TELT NIET MEE', cx + 120, cy + l / 2 + 70, q.on('staartje', 1), C.grain, 'left', 22);
    liniaal(ctx, cx - b / 2, cy - l / 2 - 70, 5, PX, q.on('breed', 1));
    liniaal(ctx, cx + b / 2 + 60, cy - l / 2, 10, PX, q.on('lang', 1), { rot: Math.PI / 2, labels: false });
    naamBij(ctx, 'breedte', '5 millimeter', cx - b / 2 - 30, cy - l / 2 - 90, q.on('breed', 1), 'right');
    naamBij(ctx, 'lengte', '10 millimeter', cx + b / 2 + 120, cy + 10, q.on('lang', 1), 'left');
    // de som
    const G = q.on('gedeeld', 1);
    regel(ctx, 'sin α = breedte / lengte', 860, 260, G, C.text, 46, 'left', 700);
    regel(ctx, '= 5 / 10 = 0,5', 860, 330, q.on('vijf', 2), C.text, 46, 'left', 700);
    regel(ctx, 'α = 30°', 860, 420, q.on('dertig', 1), C.goud, 56, 'left', 800);
    metaA(ctx, 'SIN 30° = 0,5', 1160, 420, q.on('half', 1), C.grain, 'left', 26);
    // driehoek: druppelbaan onder 30 graden met de muur
    const D = q.on('dertig', 1); if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const wx = 1680, wy = 760;
      ctx.fillStyle = KL_MUUR; ctx.fillRect(wx, 470, 40, 320); const L = 300, an = Math.PI / 6;
      ctx.strokeStyle = C.line; ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx - L * Math.sin(an), wy - L * Math.cos(an)); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(wx, wy, 90, -Math.PI / 2 - an, -Math.PI / 2); ctx.stroke();
      text(ctx, 'α', wx - 40, wy - 108, fTekst(36, 700), C.goud, 'center'); druppelZij(ctx, wx - L * Math.sin(an), wy - L * Math.cos(an), 16, 0, 1); ctx.restore(); }
    const R = q.on('ronde', 1);
    regel(ctx, 'rond: 1 → α = 90°, recht erop', 860, 540, R, C.text, 38, 'left', 700); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    const N = q.on('bijna', 1, 0.8);
    // deel 1: lijnen van een paar spatjes terug naar één gebied
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N * 0.75;
      ctx.fillStyle = KL_MUUR; ctx.fillRect(140, 160, 1000, 640); ctx.fillStyle = KL_VLOER; ctx.fillRect(140, 800, 1000, 40);
      const O = [560, 600], SP = [[860, 330, 1.0], [900, 420, 1.2], [880, 260, 0.9], [940, 520, 1.35]];
      SP.forEach(([x, y], i) => { const an = Math.atan2(y - O[1], x - O[0]); spat(ctx, x, y, 18, 36 + i * 4, an, 1);
        const k = clamp((t - q.at('terug', 1)) / 1.2 - i * 0.15, 0, 1); if (k > 0.01) { ctx.strokeStyle = rgba(C.goud, 0.85); ctx.setLineDash([12, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(lerp(x, O[0], k), lerp(y, O[1], k)); ctx.stroke(); ctx.setLineDash([]); } });
      const H = q.on('vandaan', 1); if (H > 0.01) { ctx.save(); ctx.globalAlpha *= H; ctx.beginPath(); ctx.arc(O[0], O[1], 46, 0, 6.283); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
      naamBij(ctx, 'herkomst', 'ongeveer', O[0], O[1] + 96, H, 'center');
      const hh = q.on('hoogte', 1); if (hh > 0.01) { ctx.save(); ctx.globalAlpha *= hh; ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(300, O[1]); ctx.lineTo(300, 800); ctx.stroke(); pijl(ctx, 300, 760, 300, O[1] + 6, C.text2, 1, 2.5, 12); ctx.restore(); }
      naamBij(ctx, 'hoogte', 'uit de hoeken', 320, 730, hh, 'left');
      metaA(ctx, 'VEREENVOUDIGD: DRUPPELS VLIEGEN IN EEN BOOG', 640, 220, q.on('terug', 1), C.grain, 'center', 22);
      ctx.restore(); }
    // deel 2: bijna rond tegen langgerekt, met de meetfout
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N;
      const wiebel = (x, y, a0, a1, lab) => { circ(ctx, x, y, 120, rgba(C.fill, 0.5), C.line, 2);
        ctx.strokeStyle = rgba(C.koraal, 0.45); ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(x, y, 100, -a1 * Math.PI / 180, -a0 * Math.PI / 180); ctx.stroke();
        const am = (a0 + a1) / 2 + (a1 - a0) / 2 * Math.sin(t * 3.2), ar = -am * Math.PI / 180; pijl(ctx, x, y, x + Math.cos(ar) * 110, y + Math.sin(ar) * 110, C.goud, 1, 4, 14);
        ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 120, y); ctx.lineTo(x + 120, y); ctx.stroke();
        metaA(ctx, lab, x, y + 60, 1, C.grain, 'center', 24); };
      spat(ctx, 640, 360, 95 * 0.95, 100, Math.PI / 2, 1); naamBij(ctx, 'bijna rond', '9,5 bij 10 millimeter', 640, 210, 1, 'center');
      wiebel(640, 640, 64, 90, '64° TOT 90°');
      const L = q.on('Langgerekte', 1);
      spat(ctx, 1280, 360, 50, 100, Math.PI / 2, L); naamBij(ctx, 'langgerekt', '5 bij 10 millimeter', 1280, 210, L, 'center');
      if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; wiebel(1280, 640, 27, 33, '27° TOT 33°'); ctx.restore(); }
      metaA(ctx, 'MEETFOUT ± 0,5 MILLIMETER', 960, 860 - 20, q.on('meetfout', 1), C.grain, 'center', 24);
      chip(ctx, 'minder gevoelig', 1280, 480, C.groen, q.on('minder', 1), 26);
      ctx.restore(); } },

  // ---------- H4 Veiligstellen zonder te besmetten ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); gang(ctx, { keuken: 0 });
    vloerVlek(ctx, 360, 838, 40, 1, { seed: 5 }); nummerbordje(ctx, 440, 846, 1, 1);
    const r = bilal(ctx, 720, t, { pose: 'vasthouden' });
    if (r && r.handR) wattenstaafje(ctx, r.handR.x - 8, r.handR.y + 6, 70, -1.1, { tip: '#B88A7A' });
    naamBij(ctx, 'Bilal', 'handschoenen aan', 720, 352, 1, 'center');
    aanrecht(ctx, 1180, 640, 380); glas(ctx, 1370, 640, 1, q.on('glas', 1), { hl: q.on('bemonsteren', 1) });
    naamBij(ctx, 'glas', 'volgende spoor', 1370, 430, q.on('glas', 1), 'center');
    pijl(ctx, 900, 560, 1200, 560, rgba(C.goud, 0.8), q.on('bemonsteren', 1), 4, 16);
    vraagteken(ctx, 1050, 400, q.on('denk', 1), 100); },

  s21(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord c: nieuwe handschoenen');
    const O = q.on('onderzoeker', 1, 0.8);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O;
      handschoen(ctx, 420, 520, 1.6, 1, { vlek: 1 }); naamBij(ctx, 'handschoen', 'na de vlek', 420, 700, 1, 'center');
      glas(ctx, 1020, 640, 1.1, 1); naamBij(ctx, 'glas', '', 1020, 420, 1, 'center');
      const k = clamp((t - q.at('meereizen', 1)) / 1.4, 0, 1); if (k > 0.01) { const x = lerp(420, 1000, k), y = 460 - Math.sin(k * Math.PI) * 160; circ(ctx, x, y, 9, KL_BLOED, C.koraal, 1.5); }
      kruis(ctx, 720, 330, 30, q.on('Daarom', 1));
      handschoen(ctx, 1500, 520, 1.6, q.on('nieuwe', 1)); naamBij(ctx, 'nieuw paar', 'na elk spoor', 1500, 700, q.on('nieuwe', 1), 'center');
      ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O;
      const r = bilal(ctx, 420, t, { pose: 'staan' }); naamBij(ctx, 'Bilal', '', 420, 380, 1, 'center');
      const hk = clamp((t - q.at('haar', 1)) / 1.6, 0, 1); haar(ctx, 470 + 30 * hk, 640 + 200 * ease(hk), 40, 0.6 + hk * 2, q.on('haar', 1));
      naamBij(ctx, 'een haar', '', 540, 780, q.on('haar', 1), 'left');
      const E = q.on('eliminatiedatabank', 1);
      roundRect(ctx, 820, 230, 560, 330, 16); ctx.save(); ctx.globalAlpha *= E; shape(ctx, rgba(C.fill, 0.7), C.paars, 2);
      metaText(ctx, 'ELIMINATIEDATABANK', 1100, 284, C.grain, 'center', 24);
      gezichtIcoon(ctx, 990, 410, 1.3, 1, 'bilal'); gezichtIcoon(ctx, 1210, 410, 1.3, 1, 'kim');
      regel(ctx, 'Bilal', 990, 520, 1, C.text, 28, 'center', 700); regel(ctx, 'Dr. Kim', 1210, 520, 1, C.text, 28, 'center', 700); ctx.restore();
      const V = q.on('Vindt', 1);
      document_(ctx, 1600, 420, 2.2, C.paars, V); naamBij(ctx, 'spoor', 'DNA van een medewerker', 1600, 560, V, 'center');
      pijl(ctx, 1520, 400, 1400, 400, rgba(C.paars, 0.9), V, 4, 16);
      chip(ctx, 'waarschijnlijk besmetting door een eigen medewerker', 1100, 700, C.koraal, q.on('besmetting', 1), 28);
      ctx.restore(); } },

  s22(ctx, t, q) { bg(ctx, 'schema');
    wattenstaafje(ctx, 700, 560, 360, -0.35, { tip: '#B88A7A', nat: 1 });
    for (let i = 0; i < 3; i++) { const k = ((t * 0.5 + i / 3) % 1); fo1Druppel(ctx, 1110 + i * 14, 470 + k * 160, rgba(C.teal, 0.8), (1 - k) * q.on('vochtig', 1)); }
    naamBij(ctx, 'wattenstaafje met bloed', 'nog vochtig', 1060, 300, 1, 'center');
    tag(ctx, 'naar het lab', 960, 760, C.goud, q.on('lab', 1), 'center', 30);
    vraagteken(ctx, 1500, 520, q.on('denk', 1), 110); },

  s24(ctx, t, q) { bg(ctx, 'schema'); fo1Antwoord(ctx, 'antwoord a: eerst drogen, dan papier');
    const M = q.on('mes', 1);
    zakPlastic(ctx, 330, 440, 0.9, 1 - M * 0.65, { schimmel: q.on('schimmelen', 1), t });
    naamBij(ctx, 'dichte plastic zak', '', 330, 630, 1 - M * 0.65, 'center');
    kruis(ctx, 450, 300, 26, q.on('breekt', 1) * (1 - M * 0.65)); chip(ctx, 'schimmel breekt het spoor af', 330, 230, C.koraal, q.on('breekt', 1) * (1 - M), 26);
    const Dr = q.on('droogt', 1), dk = clamp((t - q.at('droogt', 1)) / 2, 0, 1);
    droogrek(ctx, 840, 620, 1.1, Dr, { nat: 1 - dk }); naamBij(ctx, 'eerst drogen', '', 840, 700, Dr, 'center');
    const P = q.on('papier', 1);
    zakPapier(ctx, 1250, 460, 0.8, P); staafjesDoosje(ctx, 1530, 460, 0.8, q.on('doosje', 1));
    naamBij(ctx, 'papier', '', 1250, 640, P, 'center'); naamBij(ctx, 'doosje dat ademt', '', 1530, 640, q.on('doosje', 1), 'center');
    chip(ctx, 'elk spoor apart', 1390, 230, C.groen, q.on('apart', 1), 26);
    doosMes(ctx, 400, 760, 0.75, M); naamBij(ctx, 'mes', 'vastgezet in een doos', 650, 760, M, 'left'); },

  s25(ctx, t, q) { bg(ctx, 'schema');
    zakPapier(ctx, 400, 470, 1.15, 1, { nr: q.on('nummer', 1) > 0.5 ? 'SPOOR 1 · 0417-01' : '', zegel: q.on('zegel', 1) });
    naamBij(ctx, 'nummer en zegel', '', 400, 700, q.on('zegel', 1), 'center');
    const F = q.on('formulier', 1), k0 = q.at('formulier', 1);
    const rij = (i) => clamp((t - k0 - 0.1 - i * 1.0) / 0.6, 0, 1);
    formulier(ctx, 900, 180, [{ wie: 'Bilal', wanneer: '14:05', a: rij(0) }, { wie: 'Dr. Kim', wanneer: '14:40', a: rij(1) }, { wie: '', wanneer: '' }, { wie: 'DNA-lab', wanneer: 'di 09:10', a: rij(2) }],
      F, { gat: 2, gatHl: q.on('schakel', 1) });
    regel(ctx, 'keten van bewaring', 1210, 760 - 20, q.on('keten', 1), C.goud, 40, 'center', 800);
    chip(ctx, 'advocaat: verwisseld of besmet?', 1210, 860 - 30, C.koraal, q.on('advocaat', 1), 26); },

  // ---------- Recap ----------
  s26(ctx, t, q) { bg(ctx, 'schema'); gang(ctx);
    vloerVlek(ctx, VLEK[0], VLEK[1], 40, 1, { seed: 5 }); nummerbordje(ctx, VLEK[0] + 80, VLEK[1] + 8, 1, 1);
    const kaart = (x, a, fn, nm) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, 220, 300, 260, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); fn(); regel(ctx, nm, x, 450, 1, C.text, 28, 'center', 700); ctx.restore(); };
    const K1 = q.on('Kleurtest', 1);
    kaart(560, K1, () => wattenstaafje(ctx, 500, 400, 90, -1.1, { tip: KL_ROZE }), 'kleurtest: roze');
    kaart(900, q.on('luminol', 1), () => { lichtVlek(ctx, 900, 330, 50, 22, 1); voetafdruk(ctx, 900, 330, 1.3, 0, rgba(KL_LUMI, 0.95), 1); }, 'luminol: blauw licht');
    kaart(1240, q.on('sneltest', 1), () => strookjeKlein(ctx, 1240, 330, 0.75, 1, 1), 'sneltest: T en C');
    stempel(ctx, 730, 560, 'voorproef: kán bloed zijn', C.goud, q.on('bewijs', 1), -0.06);
    hondenmand(ctx, 1150, 850, 0.7, q.on('hond', 1)); naamBij(ctx, 'niet van de hond', '', 1150, 770, q.on('hond', 1), 'center');
    tag(ctx, 'van wie? nog onbekend', 560, 680, C.paars, q.on('niemand', 1), 'center', 28);
    const M = q.on('mes', 1), mk = clamp((t - q.at('mes', 1)) / 2.2, 0, 1);
    doosMes(ctx, lerp(1300, 1390, ease(mk)), 600, 0.6, M, { zegel: 1 });
    tag(ctx, 'DNA-lab →', 1390, 520, C.paars, q.on('DNA-lab', 1), 'center', 30); },

  s27(ctx, t, q) { bg(ctx, 'schema');
    bilal(ctx, 300, t, { pose: 'wijs', outfit: 'practicum', uit: 'blij' }); naamBij(ctx, 'Bilal', 'stagiair, hbo', 300, 352, 1, 'center');
    tag(ctx, 'hbo · Forensisch Onderzoek', 1040, 250, C.teal, q.on('hbo-opleiding', 1), 'center', 34);
    regel(ctx, 'Saxion Enschede · HvA Amsterdam · vier jaar · selectie', 1040, 320, q.on('Enschede', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'bachelor biologie · Radboud Nijmegen', 1040, 440, C.teal, q.on('bachelor', 1), 'center', 30);
    pijl(ctx, 1040, 470, 1040, 520, rgba(C.line, 0.8), q.on('master', 1), 3, 12);
    tag(ctx, 'master Forensic Science · UvA Amsterdam', 1040, 590, C.teal, q.on('master', 1), 'center', 30);
    const P = q.on('politie', 1);
    [['politie', 'politie'], ['nfi', 'NFI'], ['lab', 'particulier lab']].forEach(([s2, nm], i) => { const x = 720 + i * 320, a = clamp(P * 1.4 - i * 0.3, 0, 1) * (i === 1 ? q.on('Instituut', 1) : i === 2 ? q.on('particulier', 1) : 1);
      plekIcoon(ctx, x, 720, s2, a); naamBij(ctx, nm, '', x + 80, 730, a, 'left'); }); }
});
