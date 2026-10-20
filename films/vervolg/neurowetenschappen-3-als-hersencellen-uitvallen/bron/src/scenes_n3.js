// Wat word jij? · Neurowetenschappen · Als hersencellen uitvallen — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk, Noor, Dr. Kim).
// Rode draad: Opa Henks pil die steeds korter werkt.

function tuin(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 760, W, 140); for (let i = 0; i < 7; i++) { const x = 980 + i * 130; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, 780); ctx.lineTo(x, 700); ctx.stroke(); bloemMotief(ctx, x, 690, 26, [C.koraal, C.goud, C.paars][i % 3], 1, 0); } ctx.restore(); }
function bloemMotief(ctx, x, y, r, col, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.2; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.45, r * 0.22, an, 0, 6.283); ctx.fillStyle = rgba(col, 0.8); ctx.fill(); } circ(ctx, x, y, r * 0.25, C.goud); ctx.restore(); }
function muisje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-110, 20); ctx.bezierCurveTo(-180, 30, -200, -20, -250, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 120, 66, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5); circ(ctx, 110, -20, 46, '#B8B0A8'); circ(ctx, 92, -66, 24, '#D8B0B0', '#B8B0A8', 3); circ(ctx, 130, -28, 6, '#121A26'); circ(ctx, 156, -12, 7, '#D8909A'); ctx.restore(); }
function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function herinnering(ctx, x, y, titel, sub, ok, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 420, 150, 16); shape(ctx, rgba(ok ? C.groen : C.koraal, 0.14), ok ? C.groen : C.koraal, 2); text(ctx, titel, x + 30, y + 62, fTekst(36, 700), C.text, 'left'); text(ctx, sub, x + 30, y + 110, fTekst(28, 600), C.text2, 'left'); ctx.restore(); if (ok) vink_(ctx, x + 370, y + 75, 26, a); else kruis(ctx, x + 370, y + 75, 24, a); }

Object.assign(SCENES, {
  title(ctx, t) { breinDoorsnede(ctx, 1560, 560, 0.8, 1, { zs: 1, str: 1, banen: 1, over: 0.45, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('jaar', 1, 0.8);
    tuin(ctx, 1 - G); persoon(ctx, 'henk', 400, 880, 560, { t, uit: q.on('stijf', 1) > 0.5 ? 'bezorgd' : (q.on('tuinieren', 1) > 0.5 ? 'blij' : 'neutraal') }); naamBij(ctx, 'Opa Henk', 'ziekte van Parkinson', 560, 300, q.on('Henk', 1) * (1 - G));
    trilHand(ctx, 760, 460, 0.9, q.on('trilt', 1) * (1 - G), t); chip(ctx, 'trilt in rust · kleine stapjes', 820, 600, C.goud, q.on('stapjes', 1) * (1 - G), 28);
    pillenDoos(ctx, 1360, 300, 1, q.on('levodopa', 1) * (1 - G), Math.round(q.on('drie', 1) * 3)); chip(ctx, 'levodopa', 1360, 210, C.oker, q.on('levodopa', 1) * (1 - G), 30); chip(ctx, 'eerste jaren: werkt goed', 1360, 460, C.groen, q.on('eerste', 1) * (1 - G), 30);
    if (G > 0.01) { dopaGrafiek(ctx, 900, 230, 860, 420, G, { buffer: 0.12, u: clamp((t - q.at('jaar', 1)) / 3, 0, 1), banden: q.on('stijf', 1), col: C.koraal, label: 'na een paar jaar' }); chip(ctx, 'effect al weg vóór de volgende pil', 1330, 790, C.koraal, q.on('volgende', 1), 28); }
    vraagteken(ctx, 1820, 160, q.on('korter', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const af = 1 - 0.55 * q.on('sterven', 1, 3);
    breinDoorsnede(ctx, 700, 470, 1.05, 1, { zs: q.on('zwarte', 1), str: q.on('uitlopers', 1), banen: q.on('uitlopers', 1), over: af, t }); naamBij(ctx, 'zwarte stof', 'maakt dopamine', 790, 650, q.on('zwarte', 1)); naamBij(ctx, 'basale kernen', 'bewegingen starten', 960, 330, q.on('uitlopers', 1));
    chip(ctx, 'pas klachten bij ± de helft weg', 1500, 470, C.koraal, q.on('helft', 1), 30); chip(ctx, 'eiwitten klonteren samen', 1500, 550, C.oker, q.on('klonteren', 1), 30); chip(ctx, 'ouderdom · erfelijkheid · sommige gifstoffen', 1500, 630, C.text2, q.on('Ouderdom', 1), 28); chip(ctx, 'oorzaak: niet precies bekend', 1500, 710, C.text2, q.on('precies', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Later', 1, 0.8);
    chip(ctx, 'film: Knoeien met de synaps', 360, 150, C.teal, q.on('Knoeien', 1), 28); chip(ctx, 'gewenning? niet de hoofdoorzaak', 360, 230, C.koraal, q.on('wennen', 1), 28);
    dopaUiteinde(ctx, 360, 640, 1.1, 1, 1 - L * 0.85, t, q.on('levodopa', 1)); naamBij(ctx, 'uiteinde dopaminecel', 'blaasjes = opslag', 470, 820, q.on('blaasjes', 1));
    chip(ctx, 'halfwaardetijd in bloed ± 1,5 uur', 1260, 150, C.oker, q.on('anderhalf', 1), 28);
    dopaGrafiek(ctx, 820, 260, 900, 360, q.on('begin', 1) * (1 - L), { buffer: 0.95, u: 1, banden: 1, col: C.teal, label: 'veel cellen: rustig' });
    dopaGrafiek(ctx, 820, 260, 900, 360, L, { buffer: 0.1, u: clamp((t - q.at('Later', 1)) / 3, 0, 1), banden: 1, col: C.koraal, label: 'weinig cellen: op en neer' });
    haak(ctx, 820, 1720, 760, 'het verschil zit in de cellen die overblijven', C.groen, q.on('overblijven', 1)); },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vrouw', 1, 0.8);
    regel(ctx, 'Alzheimer: meest voorkomende vorm van dementie', 960, 160, 1 - V, C.text, 40, 'center', 700);
    neuronenRij(ctx, 420, 470, 1 - V, { plak: q.on('plakkaten', 1), tau: q.on('tau', 1), verlies: q.on('synapsen', 1, 2) * 0.6, dood: q.on('hele', 1, 2) }); naamBij(ctx, 'amyloïd', 'plakkaten tussen cellen', 700, 680, q.on('amyloïd', 1) * (1 - V)); naamBij(ctx, 'tau', 'kluwens in cellen', 1160, 330, q.on('tau', 1) * (1 - V));
    herinnering(ctx, 300, 330, 'trouwdag', 'vijftig jaar geleden', true, V * q.on('trouwdag', 1)); herinnering(ctx, 1200, 330, 'ontbijt', 'vanochtend', false, V * q.on('vanochtend', 1)); vraagteken(ctx, 960, 640, q.on('kan', 1) * V, 120); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const M = q.on('medicijnen', 1, 0.8);
    breinHippo(ctx, 700, 500, 1.05, 1 - M, q.on('hippocampus', 1), q.on('schors', 1) * (1 - 0.8 * q.on('verloren', 1, 1.5)), t, C.koraal); naamBij(ctx, 'hippocampus', 'nieuwe herinneringen vastleggen', 600, 660, q.on('hippocampus', 1) * (1 - M)); chip(ctx, 'film: Leren en onthouden', 1500, 200, C.teal, q.on('Leren', 1) * (1 - M), 28);
    chip(ctx, 'oude herinneringen: verspreid in de schors', 1500, 400, C.teal, q.on('verspreid', 1) * (1 - M), 28); chip(ctx, 'later: ook die gaan verloren', 1500, 480, C.koraal, q.on('verloren', 1) * (1 - M), 28);
    if (M > 0.01) { neuronenRij(ctx, 420, 330, M, { plak: 1 - q.on('meeste', 1, 1.5) * 0.85, tau: 1, verlies: 0.3 }); balk(ctx, 560, 620, 800, 1, C.text2, 'zonder medicijn: achteruitgang', M * q.on('kwart', 1)); balk(ctx, 560, 730, 800, 0.75, C.groen, 'met medicijn: ± een kwart langzamer', M * q.on('kwart', 1)); tag(ctx, 'klonten het hele verhaal?', 960, 850, C.goud, q.on('twijfelen', 1), 'center', 30); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('allemaal', 1, 0.6), E = q.on('EEG', 1, 0.6);
    chip(ctx, 'geen afsterven: evenwicht dat zoekraakt', 960, 150, C.goud, q.on('evenwicht', 1), 30);
    weegschaal(ctx, 480, 330, 0.9, 1, -0.9 * q.on('zoek', 1));
    celNetwerk(ctx, 1000, 260, 760, 380, 1, t, N, 0.2 + 0.9 * q.on('Breidt', 1)); tag(ctx, 'groep cellen tegelijk: aanval', 1380, 700, C.koraal, N, 'center', 30);
    golf(ctx, 200, 700, 700, 26, E, { t, piek: 0, col: C.teal, freq: 3 }); metaA(ctx, 'EEG · FILM: KIJKEN IN EEN DENKEND BREIN', 200, 640, E, C.grain, 'left', 26);
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 700; i += 3) { const ph = (i / 700 * 6) % 1; const k = hash(Math.floor(i / 700 * 6) + 5); const v = ph < 0.12 ? -70 * (0.7 + 0.3 * k) * Math.sin(ph / 0.12 * 3.14) : 45 * (0.6 + 0.4 * k) * Math.sin((ph - 0.12) / 0.88 * 3.14); i ? ctx.lineTo(200 + i, 820 - v * 0.8) : ctx.moveTo(200 + i, 820 - v * 0.8); } ctx.stroke(); ctx.restore();
      metaA(ctx, 'NORMAAL', 920, 706, E, C.teal, 'left', 24); metaA(ctx, 'AANVAL', 920, 826, E, C.koraal, 'left', 24); }
    chip(ctx, 'litteken: soms, vaak niet', 1380, 790, C.text2, q.on('litteken', 1), 28); vraagteken(ctx, 1780, 600, q.on('medicijn', 1), 100); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const C2 = q.on('chirurg', 1, 0.8);
    weegschaal(ctx, 560, 300, 0.95, 1 - C2, -0.9 + 0.9 * q.on('rem', 1, 1.5)); chip(ctx, 'moeilijker snel achter elkaar vuren', 360, 580, C.koraal, q.on('moeilijker', 1) * (1 - C2), 28); chip(ctx, 'rem versterken', 800, 640, C.teal, q.on('rem', 1) * (1 - C2), 28);
    stippen(ctx, 1240, 330, 3, 2, C.groen, q.on('twee', 1) * (1 - C2), 3, 40, 110); regel(ctx, '± 2 op 3: geen aanvallen meer', 1350, 460, q.on('twee', 1) * (1 - C2), C.groen, 32, 'center', 700);
    if (C2 > 0.01) { breinHippo(ctx, 900, 520, 1.1, C2, q.on('plek', 1), 0, t, C.koraal); chip(ctx, 'steeds dezelfde plek → soms weghalen', 960, 200, C.goud, C2, 30); chip(ctx, 'film: Leren en onthouden', 960, 820, C.teal, q.on('Leren', 1), 28); } },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'reden 1: de bloed-hersenbarrière', 120, 150, q.on('reden', 1), C.goud, 40, 'left', 700);
    hersenHaarvat(ctx, 260, 300, 1400, 1, t, q.on('meeste', 1)); naamBij(ctx, 'wandcellen sluiten strak aan', 'haarvat in de hersenen', 300, 640, q.on('strak', 1));
    chip(ctx, 'beschermt tegen gif', 700, 760, C.groen, q.on('gif', 1), 30); chip(ctx, '… en tegen de meeste medicijnen', 1150, 760, C.koraal, q.on('medicijnen', 2), 30); chip(ctx, 'levodopa: mee met een transporteiwit', 960, 840, C.teal, q.on('transporteiwit', 1), 30); },

  s13(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'reden 2: proeven bij muizen', 120, 150, 1, C.goud, 40, 'left', 700); const M = q.on('muizen', 1, 0.8);
    brein(ctx, 960, 480, 0.9, 1 - M); kruis(ctx, 960, 480, 50, q.on('onderzoeken', 1) * (1 - M)); regel(ctx, 'levend menselijk brein: niet zomaar onderzoeken', 960, 760, q.on('onderzoeken', 1) * (1 - M), C.text, 34, 'center', 700);
    muisje(ctx, 560, 500, 1.1, M); ctx.save(); ctx.translate(980, 380); ctx.scale(0.62, 0.62); neuronenRij(ctx, 0, 0, q.on('klonten', 1), { plak: 1 - q.on('beter', 1), tau: 0 }); ctx.restore();
    vink_(ctx, 560, 700, 30, q.on('beter', 1)); regel(ctx, 'muis: klonten weg, onthoudt beter', 560, 780, q.on('beter', 1), C.groen, 30, 'center', 700);
    kruis(ctx, 1380, 700, 26, q.on('mensen', 1)); regel(ctx, 'mens: werkt niet', 1380, 780, q.on('mensen', 1), C.koraal, 30, 'center', 700); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const S = q.on('testten', 1, 0.8);
    muisje(ctx, 500, 500, 1.1, 1 - S); chip(ctx, 'krijgen vanzelf geen Alzheimer', 500, 300, C.koraal, q.on('vanzelf', 1) * (1 - S), 28); chip(ctx, 'genen van families met erfelijke Alzheimer', 500, 720, C.paars, q.on('families', 1) * (1 - S), 28); chip(ctx, '= maar een deel van de ziekte', 500, 800, C.text2, q.on('deel', 1) * (1 - S), 28);
    middelenStapel(ctx, 1000, 260, S, clamp((t - q.at('testten', 1)) / 2.5, 0, 1), 40); regel(ctx, '2002–2012: ruim tweehonderd middelen, één goedgekeurd', 1300, 230, S, C.text, 30, 'center', 700); metaA(ctx, 'IEDER KAARTJE ≈ 6 MIDDELEN', 1300, 600, S, C.grain, 'center', 26); tag(ctx, 'muismodellen: één van de redenen', 1300, 700, C.goud, q.on('Muismodellen', 1), 'center', 30); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('neurochirurg', 1, 0.8); regel(ctx, 'reden 3: een dode hersencel komt meestal niet terug', 120, 150, 1 - q.on('Daarom', 1), C.goud, 40, 'left', 700); regel(ctx, 'zonder pil: diepe hersenstimulatie', 120, 150, q.on('Daarom', 1), C.goud, 40, 'left', 700);
    neuronenRij(ctx, 420, 470, 1 - D, { dood: 1 });
    dbsPersoon(ctx, 'henk', 800, 880, 640, D, q.on('elektrode', 1, 1.5), t); naamBij(ctx, 'diepe hersenstimulatie', 'stroompjes · zoals een pacemaker', 1200, 300, q.on('stimulatie', 1));
    chip(ctx, 'trillen en stijfheid: vaak veel minder', 1450, 520, C.groen, q.on('trillen', 1), 28); chip(ctx, 'cellen blijven afsterven', 1450, 610, C.koraal, q.on('afsterven', 1), 28); },

  // ---------- Recap ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'henk', 360, 880, 540, { t, uit: 'neutraal' }); persoon(ctx, 'noor', 660, 880, 480, { t, kijk: -1, uit: q.on('Noor', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'praat' : 'neutraal' }); persoon(ctx, 'kim', 1640, 880, 560, { t, kijk: -1, uit: q.on('neuroloog', 1) > 0.5 ? 'praat' : 'neutraal' });
    bubbel(ctx, 700, 260, 'gewend aan je pillen?', '#F2F2EE', q.on('gewend', 1) * (1 - q.on('Nee', 1)), 30); dopaGrafiek(ctx, 900, 230, 560, 300, q.on('minder', 1), { buffer: 0.1, u: 1, banden: 0, col: C.koraal, label: 'minder cellen' });
    naamBij(ctx, 'Dr. Kim', 'neuroloog', 1500, 240, q.on('dokter', 1)); chip(ctx, 'diepe hersenstimulatie?', 1180, 640, C.goud, q.on('stimulatie', 1), 30); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'neuroloog ← geneeskunde', 960, 220, C.koraal, q.on('Neuroloog', 1), 'center', 34);
    ['biomedische wetenschappen', 'biologie', 'psychologie'].forEach((s2, i) => { const a2 = q.on(s2.split(' ')[0], 1); tag(ctx, s2, 480 + i * 480, 380, C.teal, a2, 'center', 30); pijl(ctx, 480 + i * 480, 410, 960 + (i - 1) * 120, 500, C.line, q.on('master', 1), 3, 14); }); tag(ctx, 'onderzoeker · master over de hersenen', 960, 570, C.goud, q.on('master', 1), 'center', 32);
    roundRect(ctx, 360, 640, 1200, 190, 16); ctx.save(); ctx.globalAlpha *= q.on('zoeken', 1); shape(ctx, rgba(C.paars, 0.12), C.paars, 2); ctx.restore(); regel(ctx, 'waarom sterven hersencellen af?', 960, 710, q.on('waarom', 1), C.text, 34, 'center', 700); regel(ctx, 'hoe krijg je een medicijn langs de barrière?', 960, 780, q.on('barrière', 1), C.text, 34, 'center', 700); }
});
