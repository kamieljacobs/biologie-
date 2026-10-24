// Wat word jij? · Laboratoriumtechniek 2 · Van buisje tot uitslag — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim in labjas, Yasmin in practicumkleding).
// Rode draad: Yasmin volgt het buisje van Opa Henk door het lab. Rekenvoorbeeld (ijklijn, Ct 25 ≈ 3900 kopieën) in reken/bereken.py.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
const BUIS_X = [760, 1010, 1260, 1510, 1760], BUIS_STERK = [1, 0.5, 0.26, 0.13, 0.06], BUIS_LAB = ['1×', '10×', '100×', '1000×', '10 000×'];
// boog met pijl tussen twee buisjes
function overBoog(ctx, x1, x2, y, a = 1, col = C.text2, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1 + 10, y); ctx.quadraticCurveTo((x1 + x2) / 2, y - 90, x2 - 16, y - 6); ctx.stroke();
  pijl(ctx, x2 - 30, y - 22, x2 - 12, y - 4, col, 1, 3.5, 14); if (lab) text(ctx, lab, (x1 + x2) / 2, y - 62, fTekst(24, 700), col, 'center'); ctx.restore(); }
function plaatControles(ctx, x, y, w, a, o) { const { neg = 0, pos = 0, opa = 0, intern = 0, mis = 0 } = o;
  plaat96(ctx, x, y, w, a, (i, j) => { if (i === 0 && j === 0) return neg > 0.01 ? ['#3A4458', 0] : null; if (i === 1 && j === 0) return pos > 0.01 ? [KL_OPA, pos] : null; if (i === 2 && j === 3) return opa > 0.01 ? [KL_OPA, opa] : (intern > 0.01 ? [C.teal, intern * 0.5] : null);
    if (i === 4 && j === 7) return mis > 0.01 ? ['#3A4458', 0] : (intern > 0.01 ? [C.teal, intern * 0.5] : null); return intern > 0.01 ? [C.teal, intern * 0.5] : null; }); }
function putjeXY(x, y, w, i, j) { const p = w / 13.2; return [x + p * 1.1 + j * p, y + p * 1.0 + i * p * 0.98]; }

Object.assign(SCENES, {
  title(ctx, t) { transportBuis(ctx, 1240, 700, 1.3, 1, { naam: 'H. de Vries' }); plaat96(ctx, 1380, 430, 440, 1, (i, j) => (i + j * 3) % 7 === 2 ? [KL_OPA, 0.5 + 0.3 * Math.sin(t * 1.5 + i)] : null); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('lab', 1, 0.8);
    const sw = clamp((t - q.at('strijkt', 1)) / 2.2, 0, 1);
    persoon(ctx, 'henk', 760, 880, 430, { t, kijk: -1, uit: 'moe' });
    persoon(ctx, 'kim', 420, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: 'vasthouden', hold: (c, x, y) => { if (sw < 0.98 || t < q.at('stuurt', 1)) wattenstaafje2(c, x, y, -0.76 - 0.06 * Math.sin(sw * 9.4), 1, 160 + 8 * Math.sin(sw * 6.3)); } });
    naamBij(ctx, 'Opa Henk', 'al dagen ziek', 860, 400, 1 - q.on('Dezelfde', 1), 'left'); naamBij(ctx, 'Dr. Kim', 'arts', 230, 400, q.on('Kim', 1) * (1 - q.on('Dezelfde', 1)), 'left');
    transportBuis(ctx, 1120, 700, 0.9, q.on('buisje', 1), { naam: 'H. de Vries' });
    tag(ctx, 'lab', 1700, 300, C.teal, L, 'center', 32); pijl(ctx, 1180, 420, 1600, 320, C.line, L, 4, 18);
    if (t > q.at('uitslag', 1)) { const u = q.on('uitslag', 1); document_(ctx, 1700, 560, 2.4, C.groen, u); regel(ctx, 'uitslag: dezelfde dag', 1700, 680, u, C.text, 28, 'center', 700); }
    const n = 20 * clamp((t - q.at('tientallen', 1)) / 1.6, 0, 1); for (let i = 0; i < n; i++) { const u = i / 19, x = 1250 + u * 400, y = 470 + Math.sin(u * 6.28) * 40; circ(ctx, x, y, 7, C.goud); }
    regel(ctx, 'tientallen handelingen', 1450, 370, q.on('tientallen', 1), C.goud, 26, 'center', 700);
    vraagteken(ctx, 1450, 640, q.on('mis', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vóór het meten'); const D = q.on('ontvangst', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; const bx = 240, bw = 900, rows = [['vóór het meten', 0.57, C.koraal, '± 46–68 %'], ['tijdens het meten', 0.1, C.teal, 'klein deel'], ['na het meten', 0.3, C.oker, '± 19–47 %']];
      metaA(ctx, 'WAAR ONTSTAAN LABFOUTEN? · OVERZICHT VAN ONDERZOEKEN', bx, 250, 1, C.grain, 'left', 22);
      rows.forEach(([s2, f, col, v], i) => { const y = 320 + i * 120, u = i === 0 ? q.on('helft', 1, 1.2) : q.on('helft', 1, 1.2) * q.on('meten', 1); regel(ctx, s2, bx, y + 30, 1, C.text, 30, 'left', 600); roundRect(ctx, bx + 300, y, bw - 300, 44, 10); shape(ctx, '#2A3446', C.line, 1.5); if (u > 0.01) { roundRect(ctx, bx + 300, y, Math.max(16, (bw - 300) * f * u), 44, 10); shape(ctx, rgba(col, 0.7), col, 2); } regel(ctx, v, bx + bw + 20, y + 32, u, col, 28, 'left', 700); });
      chip(ctx, 'verwisseld buisje', 1500, 330, C.koraal, q.on('verwisseld', 1), 28); chip(ctx, 'verkeerd etiket', 1500, 420, C.koraal, q.on('etiket', 1), 28); chip(ctx, 'te lang warm', 1500, 510, C.koraal, q.on('warm', 1), 28); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const Y = q.on('Yasmin', 1, 0.3), sc = q.on('scant', 1);
      persoon(ctx, 'yasmin', 330, 880, 420, { t, a: Y, kijk: 1, outfit: 'practicum', pose: 'vasthouden', uit: 'neutraal', hold: (c, x, y) => handScanner(c, x + 10, y - 10, 0.8, 1, sc * (t < q.at('scant', 1) + 2.5 ? 1 : 0), 640, 480) });
      naamBij(ctx, 'Yasmin', 'stage als analist', 120, 400, Y * (1 - q.on('Klopt', 1)), 'left');
      transportBuis(ctx, 640, 640, 1.0, 1, { naam: 'H. de Vries' });
      const kz = q.on('zonder', 1); transportBuis(ctx, 880, 640, 1.0, kz, { etiket: false }); kruis(ctx, 880, 420, 34, q.on('keurt', 1)); stempel(ctx, 880, 300, 'afgekeurd', C.koraal, q.on('keurt', 1));
      const V = q.on('Vanaf', 1, 0.6);
      labScherm(ctx, 1080, 230, 720, 430, 1 - V, 'ONTVANGST · AANVRAAG DR. KIM', [['naam en geboortedatum = aanvraag', q.on('naam', 1), C.text, q.on('aanvraag', 1)], ['juiste buisje', q.on('juiste', 1), C.text, q.on('juiste', 1, 0.8) * ramp(t, q.at('juiste', 1) + 0.8, 0.5)], ['op tijd en koel genoeg', q.on('koel', 1), C.text, ramp(t, q.at('koel', 1) + 0.8, 0.5)]], 30);
      labScherm(ctx, 1080, 230, 720, 430, V, 'SPOOR VAN HET BUISJE', [['08:42  ontvangen · Yasmin', q.on('Vanaf', 1), C.text], ['09:10  RNA eruit · robot 2', q.on('stap', 1), C.text], ['10:55  PCR-run 14', q.on('vastgelegd', 1), C.text], ['wie · wat · wanneer', q.on('wanneer', 1), C.goud]], 28);
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('standaarden', 1, 0.8);
    handPipet(ctx, 330, 760, 0.95, 1, '10 µl', q.on('druppeltje', 1));
    druppelLiniaal(ctx, 470, 660, 44, q.on('Tien', 1) * (1 - S)); regel(ctx, '10 µl: nog geen 3 mm', 580, 470, q.on('millimeter', 1) * (1 - S), C.text, 30, 'center', 700); metaA(ctx, 'VERGROOT · 1 STREEP = 1 MILLIMETER', 470, 770, q.on('Tien', 1) * (1 - S), C.grain, 'left', 18);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      const tW = q.at('negentig', 1), tVol = q.at('volgende', 1), tT = q.at('tienduizend', 1);
      for (let i = 0; i < 5; i++) { const water = i === 0 ? 1 : (i === 1 ? ramp(t, tW, 0.8) : ramp(t, q.at('Uit', 1), 1)); const kleur = i === 0 ? 1 : (i === 1 ? ramp(t, q.at('Dat', 1), 1) : ramp(t, tVol + (i - 2) * 1.2, 0.8));
        eppje(ctx, BUIS_X[i], 600, 1.15, i === 0 ? 1 : q.on('negentig', 1), 0.15 + 0.45 * water, BUIS_STERK[i] * kleur);
        regel(ctx, BUIS_LAB[i], BUIS_X[i], 760, i === 0 ? q.on('sterkste', 1) : ramp(t, (i === 1 ? q.at('tien', 3) : tVol + (i - 2) * 1.2) + 0.3, 0.5), i === 0 ? C.text : C.goud, 30, 'center', 700); }
      metaA(ctx, 'KEER VERDUND', 1260, 810, q.on('verdund', 1), C.grain, 'center', 20);
      regel(ctx, 'sterkste standaard', BUIS_X[0], 300, q.on('sterkste', 1) * (1 - q.on('Stel', 1)), C.text, 26, 'center', 700);
      overBoog(ctx, BUIS_X[0], BUIS_X[1], 430, q.on('pipetteert', 1), q.on('eerste', 1) > 0.5 ? C.koraal : C.text2, q.on('eerste', 1) > 0.5 ? '−2 %' : '10 µl');
      regel(ctx, '+ 90 µl water', BUIS_X[1], 300, q.on('negentig', 1) * (1 - q.on('Uit', 1)), C.teal, 26, 'center', 700);
      tag(ctx, '10 µl in 90 µl = 1 op 10', 1400, 200, C.goud, q.on('verdunning', 1), 'center', 32);
      for (let i = 1; i < 4; i++) overBoog(ctx, BUIS_X[i], BUIS_X[i + 1], 430, ramp(t, tVol + (i - 1) * 1.2, 0.6), C.text2, '10 µl');
      ctx.restore(); }
    vraagteken(ctx, 1760, 300, q.on('denk', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de verdunde buisjes allemaal 2 % te laag'); const T = q.on('Twee', 2, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T;
      for (let i = 0; i < 5; i++) { eppje(ctx, BUIS_X[i] - 300, 470, 0.85, 1, 0.5, BUIS_STERK[i]); regel(ctx, BUIS_LAB[i], BUIS_X[i] - 300, 590, 1, C.goud, 26, 'center', 700); if (i < 4) overBoog(ctx, BUIS_X[i] - 300, BUIS_X[i + 1] - 300, 360, q.on('vorige', 1), i === 0 ? C.koraal : C.text2, ''); }
      regel(ctx, 'fout in stap 1', 160, 680, 1, C.text2, 26, 'left', 700); regel(ctx, 'fout in elke stap', 160, 780, q.on('Pas', 1), C.text2, 26, 'left', 700);
      for (let i = 1; i < 5; i++) { chip(ctx, '−2 %', BUIS_X[i] - 300, 680, C.koraal, ramp(t, q.at('laag', 1) + (i - 1) * 0.25, 0.4), 26); chip(ctx, '−' + ['2', '4', '6', '8'][i - 1] + ' %', BUIS_X[i] - 300, 780, C.koraal, ramp(t, q.at('stapelen', 1) + (i - 1) * 0.3, 0.4), 26); }
      chip(ctx, 'gaat mee, groeit niet', 1710, 680, C.groen, q.on('groeit', 1), 26); chip(ctx, 'stapelt op', 1710, 780, C.oker, q.on('stapelen', 1), 26); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; handPipet(ctx, 330, 800, 0.95, 1, '10 µl', 1);
      tag(ctx, '2 % van 10 µl = 0,2 µl', 900, 330, C.goud, q.on('tiende', 1), 'center', 34);
      regel(ctx, 'norm voor pipetten van 2 tot 20 µl (ISO 8655):', 560, 460, q.on('norm', 1), C.text, 28, 'left', 600); regel(ctx, 'bij 10 µl hooguit 0,2 µl ernaast', 560, 510, q.on('norm', 1), C.text, 28, 'left', 700);
      balans(ctx, 1450, 780, 1.0, q.on('gecontroleerd', 1), '9,98 mg'); regel(ctx, '10 µl water weegt 10 mg', 1450, 860, q.on('wegen', 1), C.teal, 26, 'center', 700); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Nieuw', 1, 0.8), Cc = q.on('cyclus', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const rt = clamp((t - 1.5) / 10, 0, 1);
      buisRek(ctx, 240, 760, 6, 1, 0.55); pipetRobot(ctx, 220, 260, 1200, 1, 0.5 + 0.45 * Math.sin(t * 0.9), 0.5 + 0.5 * Math.sin(t * 1.8));
      plaat96(ctx, 900, 570, 420, 1, (i, j) => (i * 12 + j) < 96 * rt * q.on('pipetteert', 1, 2) * 1.0 ? [rgba(C.teal, 0.8), 0] : null);
      regel(ctx, 'plaat met 96 putjes', 1110, 550, q.on('zesennegentig', 1), C.text, 26, 'center', 700);
      naamBij(ctx, 'monsters', '', 240, 600, q.on('monsters', 1), 'left');
      tag(ctx, 'grootste robots: ruim 100 uitslagen per uur', 1300, 180, C.goud, q.on('honderd', 1), 'center', 28);
      tag(ctx, 'film: Op maat gekopieerd', 1640, 420, C.teal, q.on('PCR', 1), 'center', 26); ctx.restore(); }
    if (B > 0.01 && Cc < 0.99) { ctx.save(); ctx.globalAlpha *= B * (1 - Cc); const tp = q.at('polymerase', 1), tk = q.at('openknipt', 1);
      tag(ctx, 'real-time: licht meten na elke cyclus', 960, 210, C.goud, 1, 'center', 32); regel(ctx, 'eerst: RNA → DNA (reverse transcriptase)', 960, 290, 1, C.text2, 26, 'center', 600);
      const x0 = 160, x1 = 1760, Px = x0 + 1600 * 0.55, pol = lerp(x0 + 140, Px - 70, clamp((t - tp) / (tk - tp + 0.4), 0, 1));
      probeOpDNA(ctx, x0, x1, 560, 1, { pa: q.on('probe', 1), px: 0.55, pw: 260, pol: t > tp - 0.5 ? pol : null, knip: q.on('openknipt', 1, 0.8), gloei: q.on('openknipt', 1, 1.2), nieuw: q.on('polymerase', 1) });
      naamBij(ctx, 'probe', 'kort stukje DNA', Px + 130, 470, q.on('probe', 1) * (1 - q.on('openknipt', 1)), 'center');
      naamBij(ctx, 'kleurstof', '', Px - 14, 690, q.on('kleurstof', 1) * (1 - q.on('polymerase', 1)), 'center');
      naamBij(ctx, 'blokkeert het licht', '', Px + 300, 690, q.on('kleurstof', 1) * (1 - q.on('openknipt', 1)), 'left');
      naamBij(ctx, 'polymerase', '', pol, 720, q.on('polymerase', 1), 'center');
      naamBij(ctx, 'DNA-kopie van het virus-RNA', '', x0, 720, 1 - q.on('polymerase', 1), 'left');
      naamBij(ctx, 'licht!', '', Px - 150, 330, q.on('openknipt', 1, 1), 'right', C.goud);
      metaA(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 260, 800, 1, C.grain, 'left', 18); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('cyclus', 1) + 0.8, 0.6); const nu = 40 * clamp((t - q.at('cyclus', 1)) / 6, 0, 1);
      ampGrafiek(ctx, 220, 230, 1150, 500, 1, [{ ct: 25, col: KL_OPA, u: 1, m: q.on('vijfentwintig', 1), lab: 'Ct 25', lr: -1 }, { ct: 30, col: KL_ANDER, u: q.on('ander', 1, 1.2), m: q.on('dertig', 1), lab: 'Ct 30' }], nu, q.on('drempel', 1));
      naamBij(ctx, 'Opa Henk', '', 1450, 300, q.on('Opa', 1), 'left', KL_OPA); naamBij(ctx, 'ander monster', '', 1450, 380, q.on('ander', 1), 'left', KL_ANDER);
      tag(ctx, 'Ct-waarde = cycli tot boven de drempel', 1600, 520, C.goud, q.on('Ct-waarde', 1), 'center', 26);
      vraagteken(ctx, 1600, 700, q.on('virus', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer virus bij Opa Henk (eerder boven de drempel)'); const I = q.on('ijklijn', 1, 0.8);
    if (I < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - I;
      ampGrafiek(ctx, 220, 260, 1000, 480, 1, [{ ct: 25, col: KL_OPA, u: 1, m: 1, lab: 'Ct 25', lr: -1 }, { ct: 30, col: KL_ANDER, u: 1, m: 1, lab: 'Ct 30' }], 40, 1);
      tag(ctx, 'meer virus → eerder boven de drempel', 1580, 300, C.goud, q.on('eerder', 1), 'center', 26);
      tag(ctx, 'elke cyclus ≈ × 2', 1580, 420, C.teal, q.on('verdubbelt', 1), 'center', 28);
      tag(ctx, '3,3 cycli eerder ≈ 10 × zoveel', 1580, 540, C.goud, q.on('derde', 1), 'center', 28); regel(ctx, '2 × 2 × 2 … (3,3 keer) ≈ 10', 1580, 610, q.on('zoveel', 1), C.text2, 24, 'center', 600); ctx.restore(); }
    if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; const np = 5 * clamp((t - q.at('standaarden', 1)) / 1.5, 0, 1);
      ijklijnGrafiek(ctx, 240, 250, 1100, 480, 1, { np, stap: q.on('verdunnen', 1), lijn: q.on('lijn', 2, 1.2), opa: q.on('vijfentwintig', 1) });
      naamBij(ctx, 'ijklijn', 'standaarden van Yasmin', 1400, 300, q.on('ijklijn', 1) * (1 - q.on('Let', 1)), 'left');
      tag(ctx, 'Ct 25 ≈ 4000 kopieën per putje', 1580, 450, KL_OPA, q.on('vierduizend', 1), 'center', 26);
      tag(ctx, 'Ct alleen vergelijken binnen dezelfde test', 1520, 590, C.koraal, q.on('vergelijken', 1), 'center', 24);
      regel(ctx, 'ander lab: een paar cycli anders', 1520, 670, q.on('ander', 1), C.text2, 24, 'center', 600); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('controlekaart', 1, 0.8);
    persoon(ctx, 'yasmin', 1730, 880, 420, { t, kijk: -1, outfit: 'practicum', uit: q.at('Vandaag', 1) <= t ? 'bezorgd' : 'neutraal', pose: q.at('Vandaag', 1) <= t ? 'denk' : 'staan' });
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; const px = 200, py = 240, pw = 820;
      plaatControles(ctx, px, py, pw, 1, { neg: q.on('negatieve', 1), pos: q.on('oplichten', 1), intern: q.on('interne', 1), mis: q.on('niet', 1) });
      const [nx, ny] = putjeXY(px, py, pw, 0, 0), [sx, sy] = putjeXY(px, py, pw, 1, 0), [mx, my] = putjeXY(px, py, pw, 4, 7);
      circ(ctx, nx, ny, 30, null, C.text, 3 * q.on('negatieve', 1)); circ(ctx, sx, sy, 30, null, KL_OPA, 3 * q.on('positieve', 1));
      chip(ctx, 'negatieve controle: water · geen licht', 1260, 280, C.teal, q.on('negatieve', 1), 26);
      chip(ctx, 'positieve controle: bekend virus · licht', 1260, 370, KL_OPA, q.on('positieve', 1), 26);
      chip(ctx, 'interne controle: gen van de mens', 1260, 460, C.teal, q.on('interne', 1), 26);
      if (q.on('niet', 1) > 0.01) circ(ctx, mx, my, 30, null, C.koraal, 4 * q.on('niet', 1));
      regel(ctx, 'geen licht: te weinig materiaal', 1260, 560, q.on('materiaal', 1), C.koraal, 26, 'center', 700); regel(ctx, 'of de PCR werd geremd', 1260, 605, q.on('remde', 1), C.koraal, 26, 'center', 700);
      metaA(ctx, 'PLAAT VAN DE RUN', px, py - 20, 1, C.grain, 'left', 20); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; const n = QC_PUNTEN.length * clamp((t - q.at('controlekaart', 1)) / 2.5, 0, 1);
      const V = q.on('Vandaag', 1); controleKaart(ctx, 180, 260, 1200, 520, 1, { n: Math.min(n, 15 + V), band: q.on('standaardafwijkingen', 1), drie: 0, hl: { 14: [V > 0.5 ? C.koraal : C.oker, 1], 15: [C.koraal, V] } });
      vraagteken(ctx, 1560, 360, q.on('denk', 1), 90); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: run afkeuren en de oorzaak zoeken'); const O = q.on('oorzaak', 1, 0.8);
    const kx = 160, ky = 270, kw = 1100 - 300 * O, kh = 480;
    controleKaart(ctx, kx, ky, kw, kh, 1, { n: QC_PUNTEN.length, band: 1, drie: 0, hl: { 6: [C.oker, q.on('punt', 1)], 14: [C.koraal, q.on('Twee', 1)], 15: [C.koraal, q.on('Twee', 1)] } });
    const [p6x, p6y] = qcPunt(kx, ky, kw, kh, 6); regel(ctx, 'waarschuwing', p6x, ky + kh / 2 - 3 * kh / 7 - 16, q.on('waarschuwing', 1) * (1 - O), C.oker, 26, 'center', 700);
    const [p15x, p15y] = qcPunt(kx, ky, kw, kh, 15); regel(ctx, '2× aan dezelfde kant', p15x - 40, ky + kh / 2 - 3 * kh / 7 - 16, q.on('kant', 1) * (1 - O), C.koraal, 26, 'right', 700);
    stempel(ctx, 1600, 300, 'run afgekeurd', C.koraal, q.on('keurt', 1) * (1 - O));
    chip(ctx, 'monsters opnieuw', 1600, 440, C.teal, q.on('opnieuw', 1) * (1 - O), 28);
    if (O > 0.01) { vriezer(ctx, 1520, 760, 1.05, O); reagensFles(ctx, 1730, 760, 1.2, q.on('flesje', 1)); thermometer(ctx, 1850, 720, q.on('buiten', 1), clamp((t - q.at('buiten', 1)) / 1.5, 0, 1));
      tag(ctx, 'reagens te lang buiten de vriezer', 1560, 300, C.koraal, q.on('flesje', 1), 'center', 26); chip(ctx, 'vastgelegd', 1560, 400, C.groen, q.on('vastgelegd', 1), 28); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('belt', 1, 0.3);
    const opHand = (P, d, ang) => { if (!P.handR || !P.handL) return; const h = P.handR.y < P.handL.y ? P.handR : P.handL; telefoon(ctx, h.x + d, h.y + 12, 1.1, ang); };
    opHand(persoon(ctx, 'kim', 330, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }), 4, 0.15);
    opHand(persoon(ctx, 'henk', 1600, 880, 430, { t, kijk: -1, uit: q.at('corona', 1) <= t ? 'moe' : 'neutraal', pose: 'denk' }), -4, -0.15);
    ctx.save(); ctx.globalAlpha *= B; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(560, 470, 30 + k * 22, -0.6, 0.6); ctx.stroke(); ctx.beginPath(); ctx.arc(1380, 470, 30 + k * 22, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); } ctx.restore();
    document_(ctx, 960, 380, 2.2, C.groen, q.on('corona', 1) * (1 - q.on('keten', 1))); regel(ctx, 'positief: corona', 960, 490, q.on('corona', 1) * (1 - q.on('keten', 1)), C.text, 30, 'center', 700); regel(ctx, 'nieuwe run: controles in orde', 960, 535, q.on('corona', 1) * (1 - q.on('keten', 1)), C.text2, 24, 'center', 600);
    const it = [['juiste buisje', 'juiste'], ['pipetteren', 'pipetteren'], ['Ct-waarde', 'Ct-waarde'], ['controles', 'controles']];
    it.forEach(([s2, w], i) => { const a = q.on(w, 1); tag(ctx, s2, 700 + i * 175, 320 + (i % 2) * 100, [C.teal, C.goud, KL_OPA, C.groen][i], a, 'center', 26); });
    regel(ctx, 'achter één uitslag: een hele keten', 960, 230, q.on('keten', 1), C.text, 34, 'center', 700); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 300, 880, 430, { t, kijk: 1, outfit: 'practicum', uit: 'blij', pose: 'wijs' });
    naamBij(ctx, 'analist in opleiding', '', 300, 400, 1, 'center');
    const k1 = q.on('mbo-opleiding', 1), k2 = q.on('hbo', 1);
    paneel(ctx, 560, 200, 600, 270, 'MBO', k1); regel(ctx, 'Analist, bijv. biologisch-', 600, 320, k1, C.text, 32, 'left', 700); regel(ctx, 'medisch analist', 600, 365, k1, C.text, 32, 'left', 700); regel(ctx, 'niveau 4 · meestal 4 jaar', 600, 430, k1, C.text2, 28, 'left', 600);
    paneel(ctx, 1220, 200, 600, 270, 'HBO', k2); regel(ctx, 'Biologie en Medisch', 1260, 320, k2, C.text, 32, 'left', 700); regel(ctx, 'Laboratoriumonderzoek', 1260, 365, k2, C.text, 32, 'left', 700); regel(ctx, '4 jaar (met vwo soms 3)', 1260, 430, k2, C.text2, 28, 'left', 600);
    [['ziekenhuis', 'ziekenhuizen'], ['bedrijven', 'bedrijven'], ['onderzoeksinstituut', 'onderzoeksinstituten'], ['RIVM en GGD', 'RIVM'], ['voedsel en milieu', 'voedsel']].forEach(([s2, w], i) => chip(ctx, s2, 700 + (i % 3) * 400, 620 + Math.floor(i / 3) * 100, [C.teal, C.oker, C.paars, C.groen, C.goud][i], q.on(w, 1), 28)); },
});
