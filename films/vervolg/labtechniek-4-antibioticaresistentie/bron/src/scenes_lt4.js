// Wat word jij? · Laboratoriumtechniek · Antibioticaresistentie: kweken, testen en selectie — scènes per alinea (v1.0, 24 okt 2026)
// Look: Schema, met cast (Yasmin als stagiair-analist, outfit practicum; Opa Henk als patiënt; Dr. Kim als arts, outfit lab).
// Rode draad: één monster, de urine van Opa Henk. Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// persoon die naar links kijkt: de hele figuur gespiegeld rond x, zodat ook de wijzende of vasthoudende arm naar links gaat
// (in lib_cast wisselt bij kijk: -1 de armpose maar niet de kant; dit omzeilt dat zonder de gedeelde engine te raken)
function persoonK(ctx, id, x, y, h, o = {}) {
  if ((o.kijk || 1) > 0) return persoon(ctx, id, x, y, h, o);
  ctx.save(); ctx.translate(2 * x, 0); ctx.scale(-1, 1); const r = persoon(ctx, id, x, y, h, Object.assign({}, o, { kijk: 1 })); ctx.restore();
  const m = p => (p && p.x != null) ? Object.assign({}, p, { x: 2 * x - p.x, ang: p.ang != null ? Math.PI - p.ang : p.ang }) : p;
  return (r && r.handR) ? Object.assign({}, r, { handR: m(r.handR), handL: m(r.handL), hoofd: m(r.hoofd) }) : r; }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// de werkbank waar Yasmin staat: brander links, platen op het blad
function werkbank(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba('#3A4458', 0.85); ctx.fillRect(120, 790, 1680, 16);
  ctx.fillStyle = rgba('#2A3446', 0.6); ctx.fillRect(120, 806, 1680, 10);
  ctx.restore(); }

// de MIC-reeks die de film gebruikt (verdubbelingsstappen, nagerekend in reken/verdunning.py)
const MIC_CONC = [0.03, 0.06, 0.125, 0.25, 0.5, 1, 2];   // schrijfwijze EUCAST
const MIC_WAARDE = 0.5;

Object.assign(SCENES, {
  title(ctx, t) {
    petrischaal(ctx, 1670, 450, 180, { kolonies: 34, groei: 1, seed: 3 });
    bacterieLT(ctx, 1670, 740, 170, { rot: 0.1, plasmide: 1, col: C.teal, t });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    persoon(ctx, 'henk', 380, 790, 420, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1 });
    naamBij(ctx, 'Opa Henk', 'blaasontsteking', 380, 290, q.on('Henk', 1), 'center');
    pilDoosje(ctx, 560, 540, 1, { a: q.on('kuur', 1) });
    chip(ctx, 'kuur gehad, nog niet beter', 620, 420, C.koraal, q.on('beter', 1), 26);
    const Y = q.on('Yasmin', 1, 0.3);
    persoonK(ctx, 'yasmin', 1450, 790, 430, { t, a: Y, uit: 'neutraal', pose: 'vasthouden', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Yasmin', 'stagiair-analist', 1450, 290, Y, 'center');
    monsterPotje(ctx, 980, 700, 1.4, { a: 1 });
    naamBij(ctx, 'urine', 'het monster', 980, 790, q.on('urine', 1), 'center');
    pijl(ctx, 720, 640, 880, 640, rgba(C.goud, 0.8), q.on('lab', 1), 4, 14);
    vraagteken(ctx, 1180, 430, q.on('denk', 1), 110); },

  // ---------- H1 steriel werken ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: welke bacterie, en welk middel nog werkt');
    const B = q.on('Dus', 1, 0.7), K = q.on('veiligheidskabinet', 1, 0.7);
    // deel 1: niet jij maar de bacterie, en een bacterie uit de lucht
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      bacterieLT(ctx, 560, 440, 300, { rot: -0.1, col: C.koraal, t });
      naamBij(ctx, 'de bacterie wordt resistent', 'niet jij', 560, 600, 1, 'center');
      for (let i = 0; i < 5; i++) { const w = wander(i + 3, t, 24, 0.5), f = q.on('lucht', 1); if (f < 0.01) continue;
        bacterieLT(ctx, 1240 + i * 110 + w.x, 400 + (i % 2) * 90 + w.y, 90, { a: f * 0.85, rot: 0.4 + i, col: C.text2, t }); }
      naamBij(ctx, 'een bacterie uit de lucht', 'groeit net zo hard', 1480, 620, q.on('lucht', 1), 'center');
      chip(ctx, 'eerst laten groeien', 560, 240, C.goud, q.on('groeien', 1), 28);
      ctx.restore(); }
    // deel 2: steriel werken aan de bank
    if (B > 0.01 && K < 0.99) { ctx.save(); ctx.globalAlpha *= B * (1 - K); werkbank(ctx, t);
      brander(ctx, 400, 790, 1.3, { t });
      naamBij(ctx, 'vlam', '', 400, 520, 1, 'center');
      const t0 = q.at('entoog', 1), H = clamp((t - t0 - 0.6) / 1.2, 0, 1) * (1 - clamp((t - t0 - 3.2) / 1.4, 0, 1));
      entoog(ctx, 700, 580, 1.8, { hitte: H, rot: -0.5 });
      naamBij(ctx, 'entoog', 'door de vlam', 700, 720, 1, 'center');
      chip(ctx, 'gloeiend heet', 700, 380, C.koraal, q.on('gloeiend', 1), 30);
      petrischaal(ctx, 1380, 600, 200, { a: q.on('plaat', 1),
        open: q.on('stukje', 1) * (1 - clamp((t - q.at('stukje', 1) - 2.6) / 1.2, 0, 1)) });
      naamBij(ctx, 'de kweekplaat', 'maar even open', 1380, 840, q.on('plaat', 1), 'center');
      ctx.restore(); }
    // deel 3: veiligheidskabinet
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      veiligheidskabinet(ctx, 820, 500, 640, 520, { t, stroom: q.on('stroomt', 1), filterHl: q.on('filter', 1) });
      persoonK(ctx, 'yasmin', 1560, 790, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: -1, outfit: 'practicum' });
      naamBij(ctx, 'veiligheidskabinet', 'voor gevaarlijker werk', 470, 330, 1, 'right');
      naamBij(ctx, 'filter', '', 1162, 310, q.on('filter', 1), 'left');
      chip(ctx, 'de lucht stroomt naar binnen', 1560, 300, C.teal, q.on('binnen', 1), 26); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    petrischaal(ctx, 620, 480, 210, { leeg: 1 });
    naamBij(ctx, 'de kweekplaat', 'urine van Opa Henk', 620, 740, 1, 'center');
    const E = q.on('extra', 1, 0.5);
    petrischaal(ctx, 1280, 480, 210, { a: E, leeg: 1, open: q.on('opent', 1) * (1 - clamp((t - q.at('opent', 1) - 1.6) / 1, 0, 1)) });
    naamBij(ctx, 'extra plaat', 'alleen open en dicht', 1280, 740, E, 'center');
    vraagteken(ctx, 1280, 215, q.on('denk', 1), 100); },

  // ---------- H2 kolonies en tellen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: dan kan er overal iets op gevallen zijn');
    petrischaal(ctx, 460, 460, 190, { leeg: 1 });
    naamBij(ctx, 'negatieve controle', 'blijft leeg', 460, 700, q.on('negatieve', 1), 'center');
    vink_(ctx, 460, 300, 26, q.on('schoon', 1));
    petrischaal(ctx, 1020, 460, 190, { kolonies: 26, groei: q.on('groeit', 1), seed: 19 });
    naamBij(ctx, 'positieve controle', 'moet groeien', 1020, 700, q.on('positieve', 1), 'center');
    vink_(ctx, 1020, 300, 26, q.on('positieve', 1));
    const G = q.on('Groeit', 2);
    petrischaal(ctx, 1560, 460, 190, { a: G, leeg: 1 });
    kruis(ctx, 1560, 300, 26, G);
    chip(ctx, 'dan: iets met de agar of de warmtekast', 1560, 760, C.koraal, q.on('warmtekast', 1), 26); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    petrischaal(ctx, 340, 430, 190, {});
    naamBij(ctx, 'agar', 'vaste voedingsbodem', 340, 680, 1, 'center');
    warmtekast(ctx, 800, 430, 290, 390, { a: q.on('nacht', 1), graden: '37 °C', hl: q.on('zevenendertig', 1) });
    naamBij(ctx, 'warmtekast', 'ongeveer 37 graden', 800, 680, q.on('nacht', 1), 'center');
    // van één cel naar een kolonie, binnen een uitvergroting
    const D = q.on('deelt', 1), tt = clamp((t - q.at('deelt', 1)) / 6, 0, 1);
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D;
      circ(ctx, 1480, 430, 230, rgba(C.fill, 0.5), rgba(C.line, 0.6), 2);
      const n = Math.max(1, Math.round(Math.pow(2, tt * 8)));
      if (n <= 8) { for (let i = 0; i < n; i++) { const an = i / Math.max(1, n) * 6.283 + 0.4, rr = n > 1 ? 46 : 0;
          bacterieLT(ctx, 1480 + Math.cos(an) * rr, 430 + Math.sin(an) * rr, 110, { rot: an, col: C.teal, t }); } }
      else { const R = 70 + 110 * ease((tt - 0.3) / 0.7);
        circ(ctx, 1480, 430, R, rgba('#DED6BE', 0.95), rgba('#B9B09A', 0.9), 2);
        puntenInCirkel('kolgroei', 300, 1, 41).forEach(([px, py], i) => circ(ctx, 1480 + px * (R - 8), 430 + py * (R - 8), 3.4, rgba(KL_KOLONIE, 0.9))); }
      metaA(ctx, 'UITVERGROOT · ELKE 30 MINUTEN EEN DELING', 1480, 170, 1, C.grain, 'center', 22);
      naamBij(ctx, n <= 8 ? (n + (n > 1 ? ' cellen' : ' cel')) : 'honderden miljoenen cellen', '', 1480, 700, 1, 'center');
      ctx.restore(); }
    naamBij(ctx, 'kolonie', 'een stipje van 1 millimeter', 1480, 790, q.on('kolonie', 1), 'center');
    chip(ctx, 'gegroeid uit één cel (of een klompje)', 1480, 860, C.goud, q.on('cel.', 1), 28); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    const V = q.on('verdunt', 1, 0.5), Pl = q.on('dag', 1);
    monsterPotje(ctx, 250, 420, 1.1, { a: 1 - V * 0.4 });
    naamBij(ctx, 'monster', '', 250, 490, 1 - V * 0.4, 'center');
    verdunningsreeks(ctx, 470, 430, 6, { a: V, dx: 150, stap: clamp((t - q.at('tiende', 1)) * 1.3, 0, 6), t,
      pipet: q.on('milliliter', 1) > 0.5 ? 4 : -1 });
    naamBij(ctx, 'verdunningsreeks', 'elke keer 1 op 10', 850, 560, q.on('verdunningsreeks', 1), 'center');
    metaA(ctx, '0,1 milliliter per plaat', 470, 650, q.on('milliliter', 1), C.goud, 'left', 22);
    // drie platen met de telling
    const mm = [[1250, 680], [1500, 68], [1750, 7]];
    mm.forEach(([px, n], i) => { const f = clamp((t - q.at('zeshonderdtachtig', 1)) * 1.4 - i * 0.5, 0, 1) * Pl;
      if (f < 0.01) return; petrischaal(ctx, px, 700, 108, { a: f, kolonies: Math.min(n, 300), groei: 1, seed: 5 + i * 11 });
      regel(ctx, String(n), px, 576, f, C.text, 38, 'center', 800);
      regel(ctx, ['10 000', '100 000', '1 miljoen'][i] + ' × verdund', px, 848, f, C.text2, 19, 'center', 600); });
    vraagteken(ctx, 1500, 280, q.on('denk', 1), 100); },

  // ---------- H3 antibiogram ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de plaat met 68 kolonies');
    const mm = [[400, 680], [800, 68], [1200, 7]];
    mm.forEach(([px, n], i) => { petrischaal(ctx, px, 420, 155, { kolonies: Math.min(n, 300), groei: 1, seed: 5 + i * 11,
        omlijst: i === 1 ? q.on('telbaar', 1) : 0 });
      regel(ctx, String(n), px, 230, 1, i === 1 ? C.groen : C.text2, 38, 'center', 800); });
    chip(ctx, 'te veel: je telt te laag', 400, 650, C.koraal, q.on('laag', 1), 24);
    chip(ctx, 'telbaar: 30 tot 300', 800, 650, C.groen, q.on('telbaar', 1), 24);
    chip(ctx, 'te weinig: toeval', 1200, 650, C.koraal, q.on('toeval', 1), 24);
    const R = q.on('Achtenzestig', 1, 0.6);
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R;
      regel(ctx, '68 ÷ 0,1 ml × 100 000 (verdunning)', 800, 780, 1, C.text, 34, 'center', 600);
      regel(ctx, '≈ 70 miljoen per milliliter', 800, 840, q.on('miljoen', 1), C.goud, 42, 'center', 800);
      ctx.restore(); }
    tag(ctx, 'grens blaasontsteking:', 1600, 380, C.teal, q.on('grens', 1), 'center', 28);
    regel(ctx, '100 000 per milliliter', 1600, 460, q.on('grens', 1), C.text, 34, 'center', 700); },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const ZONES = [{ an: -2.2, mm: 24, nm: 'middel 1' }, { an: -0.5, mm: 9, nm: 'middel 2' },
                   { an: 1.1, mm: 21, nm: 'middel 3' }, { an: 2.6, mm: 17, nm: 'middel 4' }];
    const B = q.on('breekpunt', 1, 0.7);
    antibiogramPlaat(ctx, 520, 470, 270, ZONES, { groei: q.on('schijfjes', 1), toonMm: q.on('remzone', 1),
      meet: q.on('negen', 1) > 0.5 ? 1 : (q.on('vierentwintig', 1) > 0.5 ? 0 : -1) });
    naamBij(ctx, 'antibiogram', 'één plaat, vier middelen', 520, 810, q.on('antibiogram', 1), 'center');
    chip(ctx, 'remzone: hier groeit niets', 520, 150, C.teal, q.on('remzone', 1), 26);
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      breekpuntAs(ctx, 1080, 420, 700, { grens: 19, tussen: 2, punten: [
        { v: 24, nm: '24 mm', a: q.on('vierentwintig', 1) }, { v: 9, nm: '9 mm', a: q.on('negen', 1) }] });
      ctx.restore(); }
    metaA(ctx, 'ZONE GEMETEN MET EEN LINIAAL', 1080, 250, q.on('liniaal', 1) * B, C.grain, 'left', 22); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    micReeks(ctx, 300, 560, MIC_CONC, MIC_WAARDE, { toon: Math.max(2 / MIC_CONC.length, clamp((t - 0.2) / 2.2, 0, 1)) });
    metaA(ctx, 'ELKE STAP TWEE KEER ZO VEEL', 300, 250, q.on('verdubbelt', 1), C.grain, 'left', 24);
    chip(ctx, 'troebel: de bacterie groeit', 560, 760, C.grain, q.on('troebel', 1), 26);
    chip(ctx, 'helder: geen groei', 1340, 760, C.teal, q.on('helder', 1), 26);
    regel(ctx, 'MIC = ?', 1640, 300, q.on('MIC', 1), C.goud, 48, 'center', 800);
    vraagteken(ctx, 1640, 430, q.on('denk', 1), 100); },

  // ---------- H4 hoe resistentie ontstaat ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: 0,5, het eerste buisje zonder groei');
    micReeks(ctx, 300, 500, MIC_CONC, MIC_WAARDE, { toon: 1, hlMic: 1, bh: 130 });
    regel(ctx, 'MIC = 0,5 milligram per liter', 670, 680, q.on('MIC', 1), C.goud, 38, 'center', 800);
    regel(ctx, 'MIC: de laagste concentratie zonder zichtbare groei', 670, 740, 1, C.text2, 28, 'center', 600);
    const B = q.on('breekpunt', 1, 0.6), xb = 300 + 3.5 * 124;   // tussen de buisjes 0,25 en 0,5
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xb, 555); ctx.lineTo(xb, 320); ctx.stroke();
      metaA(ctx, 'BREEKPUNT 0,25', xb, 296, 1, C.goud, 'center', 22);
      roundRect(ctx, 1210, 380, 580, 110, 12); shape(ctx, rgba(C.koraal, 0.18), C.koraal, 2.5);
      regel(ctx, 'MIC erboven: resistent', 1500, 450, 1, C.koraal, 38, 'center', 700);
      regel(ctx, 'groeit door bij een concentratie', 1500, 560, q.on('haalbaar', 1), C.text, 32, 'center', 600);
      regel(ctx, 'die in het lichaam haalbaar is', 1500, 610, q.on('haalbaar', 1), C.text, 32, 'center', 600);
      ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema');
    const W = q.on('miljard', 1), P = q.on('zeven', 1);
    // eerst de plaat met antibioticum (nog leeg); de gewone plaat is alleen een 'zou zo worden', met een gestippelde rand
    const A = q.on('antibioticum', 1, 0.5), G = q.on('gewone', 1, 0.5);
    petrischaal(ctx, 560, 460, 250, { a: G * 0.8, waas: G, seed: 23 });
    if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; ctx.setLineDash([18, 14]); circ(ctx, 560, 460, 268, null, C.text2, 3); ctx.restore(); }
    naamBij(ctx, 'gewone plaat', 'zou een dichte waas worden', 560, 790, G, 'center');
    petrischaal(ctx, 1360, 460, 250, { a: 1, kolonies: 7, groei: clamp((t - q.at('zeven', 1)) / 1.6, 0, 1), seed: 71 });
    naamBij(ctx, 'plaat met antibioticum', P > 0.5 ? 'zeven kolonies' : 'een miljard cellen erop', 1360, 790, A, 'center');
    metaA(ctx, 'EEN MILJARD CELLEN UITGEPLAAT', 960, 190, W, C.grain, 'center', 24);
    vraagteken(ctx, 960, 480, q.on('denk', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: die zeven hadden de verandering al');
    const S = q.on('Ligt', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S;
      // af en toe een kopieerfout: een rij delende bacteriën, één met een veranderd gen
      for (let i = 0; i < 7; i++) { const mut = i === 4 ? q.on('verandert', 1) : 0;
        bacterieLT(ctx, 330 + i * 200, 420, 150, { rot: (i % 2 ? 0.1 : -0.1), col: mut > 0.5 ? C.goud : C.teal, t, mutatie: mut, hlGen: mut }); }
      metaA(ctx, 'AF EN TOE EEN KOPIEERFOUT BIJ EEN DELING', 330, 250, q.on('kopieerfout', 1) * (1 - clamp(S * 3, 0, 1)), C.grain, 'left', 24);
      chip(ctx, '± 1 op de 1000 delingen', 1330, 270, C.text2, q.on('duizend', 1), 24);
      chip(ctx, 'toeval: de meeste helpen niets', 700, 620, C.text2, q.on('toeval', 1), 26);
      chip(ctx, 'het middel grijpt niet meer aan', 1330, 620, C.goud, q.on('aangrijpt', 1), 26);
      regel(ctx, 'ongeveer 1 op de 100 miljoen cellen', 960, 740, q.on('honderd', 1), C.text, 36, 'center', 700);
      ctx.restore(); }
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      // het middel erbij: alle andere groeien niet uit, de mutant blijft over en deelt verder
      const D = clamp((t - q.at('andere', 1)) / 1.8, 0, 1);
      const deel = clamp((t - q.at('overlevers', 1)) / 2.4, 0, 1);  // de overlevers delen verder
      for (let i = 0; i < 7; i++) { if (i === 4) continue;
        bacterieLT(ctx, 330 + i * 200, 400, 150, { rot: (i % 2 ? 0.1 : -0.1), col: C.teal, t, dood: D }); }
      // de mutant, die aan het eind deelt: de nakomelingen schuiven naar lege plekken boven en onder de rij
      const PLEK = [[0, 0], [-100, -96], [100, 96], [100, -96]];
      const n = deel > 0.01 ? Math.min(4, 1 + Math.floor(deel * 4)) : 1;
      for (let k = 0; k < n; k++) { const u = ease(clamp(deel * 4 - k, 0, 1));
        bacterieLT(ctx, 1130 + PLEK[k][0] * u, 400 + PLEK[k][1] * u, 150,
          { rot: 0.1 * (k % 2 ? 1 : -1), col: C.goud, t, mutatie: 1, hlGen: 1 }); }
      chip(ctx, 'antibioticum erbij', 330, 230, C.koraal, clamp((S - 0.5) * 2, 0, 1), 26);
      regel(ctx, 'het middel maakte de mutatie niet: die was er al', 960, 640, q.on('gemaakt', 1), C.text, 40, 'center', 700);
      metaA(ctx, 'aangetoond door Luria en Delbrück (1943)', 960, 586, q.on('aangetoond', 1), C.grain, 'center', 20);
      regel(ctx, 'het kiest alleen uit', 960, 708, q.on('kiest', 1), C.goud, 40, 'center', 800);
      chip(ctx, 'de cel verandert niet erfelijk', 560, 800, C.text2, q.on('erfelijk', 1), 26);
      chip(ctx, 'de populatie verandert', 1380, 800, C.groen, q.on('populatie', 1), 26);
      ctx.restore(); } },

  // ---------- H5 plasmiden ----------
  s19(ctx, t, q) { bg(ctx, 'schema');
    bacterieLT(ctx, 540, 450, 320, { rot: 0, col: C.teal, t, plasmide: 1 });
    bacterieLT(ctx, 1400, 450, 320, { rot: 0, col: C.paars, t,
      plasmide: clamp((t - q.at('over', 1) - 1.4) / 0.8, 0, 1) });
    naamBij(ctx, 'E. coli', '', 540, 640, 1, 'center');
    naamBij(ctx, 'Klebsiella', 'andere soort', 1400, 640, q.on('andere', 1), 'center');
    metaA(ctx, 'GROOT DNA-MOLECUUL + KLEINE RINGETJES', 540, 200, q.on('ringetjes', 1), C.grain, 'center', 22);
    naamBij(ctx, 'plasmide', 'met resistentiegen', 660, 320, q.on('resistentiegen', 1), 'left');
    // pilus en de kopie die overgaat
    const P = q.on('pilus', 1);
    if (P > 0.01) { pilus(ctx, [700, 450], [1240, 450], { a: P, groei: clamp((t - q.at('pilus', 1)) / 1.2, 0, 1) });
      naamBij(ctx, 'pilus', '', 970, 400, P, 'center');
      const K = clamp((t - q.at('over', 1)) / 1.6, 0, 1);
      if (K > 0.01 && K < 1) plasmideRing(ctx, 700 + 540 * K, 450, 28, { a: 1 });
      if (K >= 1) chip(ctx, 'de kopie is overgegaan', 970, 290, C.groen, 1, 26); }
    regel(ctx, 'conjugatie', 970, 760, q.on('conjugatie', 1), C.goud, 44, 'center', 800);
    chip(ctx, 'haar eigen plasmide houdt ze', 400, 830, C.teal, q.on('houdt', 1), 24);
    chip(ctx, 'werkt ook tussen soorten', 1500, 830, C.paars, q.on('soorten', 1), 24); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    const y = persoon(ctx, 'yasmin', 340, 790, 420, { t, uit: 'blij', pose: 'vasthouden', kijk: 1, outfit: 'practicum' });
    if (y.handR) telefoontje(ctx, y.handR.x, y.handR.y - 20, 1, { t, a: q.on('belt', 1) });
    naamBij(ctx, 'Yasmin', 'analist', 340, 300, 1, 'center');
    const KA = q.on('Kim', 1, 0.3);
    const k = persoonK(ctx, 'kim', 1620, 790, 420, { t, a: KA, uit: 'blij', pose: 'vasthouden', kijk: -1, outfit: 'lab' });
    if (k && k.handR) telefoontje(ctx, k.handR.x, k.handR.y - 20, 1, { t, a: KA });
    naamBij(ctx, 'Dr. Kim', 'arts', 1620, 300, KA, 'center');
    // het antibiogram als kaartje tussen hen in (zelfde zones als in s12: middel 2 = 9 mm, middel 1 en 3 ruim boven het breekpunt)
    roundRect(ctx, 630, 200, 520, 280, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 2);
    metaText(ctx, 'antibiogram Opa Henk', 660, 242, C.grain, 'left', 20);
    regel(ctx, 'middel 2: resistent', 660, 300, q.on('resistent', 1), C.koraal, 30, 'left', 700);
    metaA(ctx, 'het middel van de eerste kuur', 660, 334, q.on('eerste', 1), C.text2, 'left', 16);
    regel(ctx, 'middel 1: MIC onder breekpunt', 660, 400, q.on('andere', 1), C.groen, 26, 'left', 700);
    regel(ctx, 'middel 3: MIC onder breekpunt', 660, 450, q.on('andere', 1), C.groen, 26, 'left', 700);
    petrischaal(ctx, 760, 640, 105, { kolonies: 7, groei: 1, seed: 71, a: q.on('kolonies', 1) });
    chip(ctx, 'toeval + selectie', 760, 800, C.goud, q.on('selectie', 1), 26);
    persoonK(ctx, 'henk', 1230, 790, 390, { t, a: q.on('beter', 1), uit: 'blij', kijk: -1 });
    naamBij(ctx, 'Opa Henk', 'weer beter', 1230, 350, q.on('beter', 1), 'center'); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 300, 790, 400, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'practicum' });
    tag(ctx, 'mbo · biologisch-medisch analist', 1060, 280, C.teal, q.on('analist', 1), 'center', 34);
    regel(ctx, 'niveau 4 · drie tot vier jaar', 1060, 350, q.on('niveau', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'hbo · Biologie en Medisch Laboratoriumonderzoek', 1060, 470, C.teal, q.on('hbo', 1), 'center', 32);
    regel(ctx, 'vier jaar', 1060, 540, q.on('hbo', 1), C.text2, 30, 'center', 600);
    const W = q.on('ziekenhuislab', 1);
    ['ziekenhuislab', 'onderzoeksinstituut (RIVM)', 'voedsel- en milieulab'].forEach((s2, i) =>
      chip(ctx, s2, 700 + i * 400, 700, [C.goud, C.groen, C.oker][i], clamp(W * 1.4 - i * 0.35, 0, 1), 26)); }
});
