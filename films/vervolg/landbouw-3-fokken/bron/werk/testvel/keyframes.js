// Keyframes voor het twijfelblad van Landbouw 3 (zelfde tekenfuncties als de film straks). Elke functie tekent één frame op 1920×1080.
const KF = {};
const sub = (ctx, s) => { if (!s) return; ctx.save(); ctx.font = fTekst(40, 700); const w = Math.min(1760, ctx.measureText(s).width + 60); roundRect(ctx, 960 - w / 2, 930, w, 76, 12); ctx.fillStyle = rgba('#0D1420', 0.9); ctx.fill(); text(ctx, s, 960, 982, fTekst(40, 700), C.text, 'center'); ctx.restore(); };
// klein Amerikaans vlaggetje (strepen + blauw kanton, zonder sterren-detail)
function vlagVS(ctx, x, y, w, a = 1) { const h = w * 0.6; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#F2F2EE' : '#C8463C'; ctx.fillRect(x, y + i * h / 7, w, h / 7 + 0.5); } ctx.fillStyle = '#2E3A6E'; ctx.fillRect(x, y, w * 0.42, h * 0.55); ctx.restore(); }

// D1 cold open: stal, Yasmin langs zwartbonte koeien, staven 1970/2026, leeg keuzebord
KF.d1 = (ctx) => { bg(ctx, 'schema'); decorLabel(ctx); const g = 840, P = 1.3; stalGrond(ctx, g);
  [230, 500, 770].forEach((x, i) => rund(ctx, 'holstein', x, g, P, { kijk: 1, houding: i === 1 ? 'grazen' : 'staan' }));
  persoon(ctx, 'yasmin', 960, g + 6, 165 * P, { zij: true, kijk: -1, gang: 'loop', t: 0.2, outfit: 'stal', uit: 'blij' });
  // staven: 4242 kg (1970) en 9935 kg (2025-2026), 1 px = 19 kg
  const yb = 800, k = 1 / 19, h0 = 4242 * k, h1 = 9935 * k, x0 = 1130, x1 = 1300, bw = 120;
  melkStaaf(ctx, x0, yb, bw, h0, C.text2); melkStaaf(ctx, x1, yb, bw, h0, C.text2);
  roundRect(ctx, x1 - bw / 2, yb - h1, bw, h1 - h0, 10); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.goud, 0.28), C.goud, 3); ctx.setLineDash([]);
  naamBij(ctx, 'EXTRA MELK', '', x1 - bw / 2 - 16, yb - h0 - (h1 - h0) / 2 + 12, 1, 'right', C.goud);
  naamBij(ctx, 'ruim 4000 kg', '1970', x0, yb - h0 - 50, 1, 'center'); naamBij(ctx, 'bijna 10.000 kg', '2026', x1 + 10, yb - h1 - 50, 1, 'center');
  metaText(ctx, 'MELK PER KOE PER JAAR', 1215, 870, C.text2, 'center', 22);
  keuzebord(ctx, 1490, 110, 370, 340, { rijen: [['VADER', 1], ['MOEDERS', 3]] });
  sub(ctx, 'Nu, in tweeduizendzesentwintig, bijna tienduizend: ruim twee keer zoveel.'); };

KF.d2 = (ctx) => { bg(ctx, 'schema'); const g = 850, P = 1.75; ctx.fillStyle = rgba('#2F4A3A', 0.5); ctx.fillRect(0, g, W, 30);
  hek(ctx, 80, 860, g - 4, 150);
  persoon(ctx, 'henk', 300, g, 172 * P, { kijk: 1, pose: 'denk', uit: 'blij' }); persoon(ctx, 'yasmin', 560, g, 165 * P, { kijk: -1, outfit: 'stal', uit: 'blij' });
  denkwolk(ctx, 90, 70, 760, 360, 300, g - 172 * P * 1.02);
  rund(ctx, 'dubbel', 470, 370, 1.35, { kijk: 1 }); metaText(ctx, 'MELK ÉN VLEES', 470, 138, C.text, 'center', 26);
  // rechts: slanke melkkoe van nu (zelfde schaal als de mensen), met rietje uit Amerika
  rund(ctx, 'holstein', 1390, g, P, { kijk: -1 });
  roundRect(ctx, 1420, 220, 330, 96, 14); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); rietje(ctx, 1555, 268, 1.25, 1, 0, C.teal); vlagVS(ctx, 1652, 244, 70);
  naamBij(ctx, 'Holstein', 'NA 1970 · GEFOKT OP MELK', 1585, 380, 1, 'center'); metaText(ctx, 'SPERMA VAN AMERIKAANSE STIEREN', 1585, 200, C.text2, 'center', 20);
  sub(ctx, 'Toen hij jong was, hield je zwartbonte koeien voor melk én vlees.'); };

KF.d3 = (ctx) => { bg(ctx, 'schema'); const g = 840, P = 1.75; ctx.fillStyle = rgba('#2B3442', 0.8); ctx.fillRect(0, g, W, 30);
  rund(ctx, 'holstein', 640, g, P, { kijk: 1 });
  // inseminator achter de koe, van opzij gezien zoals in de praktijk: handschoen, pistool met rietje op heuphoogte; geen anatomisch detail
  const id = 'inseminator', hh = 175 * P; persoon(ctx, id, 210, g, hh, { kijk: 1, pose: 'vasthouden', uit: 'neutraal' });
  const hd = kiHandschoen(ctx, id, 210, g, hh, 'vasthouden', 1); kiPistool(ctx, hd.x - 6, hd.y, -0.08, 120);
  naamBij(ctx, 'kunstmatige inseminatie', 'ZONDER STIER', 560, 300, 1, 'center');
  stikstofVat(ctx, 1000, g, 0.95, 1, 0.3);
  // één rietjeskist, honderden koeien waaieren uit
  const kx = 1230, ky = 560; roundRect(ctx, kx - 50, ky - 34, 100, 68, 10); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 5; i++) rietje(ctx, kx - 34 + i * 17, ky - 6, 0.3, 1, Math.PI / 2, [C.teal, C.goud, C.koraal][i % 3]);
  for (let r = 0; r < 7; r++) { const R = 120 + r * 70, m = 7 + r * 4; for (let j = 0; j < m; j++) { const an = -0.95 + j / (m - 1) * 1.9; const px = kx + Math.cos(an) * R, py = ky + Math.sin(an) * R * 0.78; if (px > 1850 || py < 150 || py > 840) continue; koeIcoon(ctx, px, py + 14, 26 + r * 1.2, rgba(C.text2, 0.85 - r * 0.07), 1, { bont: 1 + (j % 5) }); } }
  naamBij(ctx, 'één keer afnemen', 'HONDERDEN KOEIEN', kx, 470, 1, 'center');
  sub(ctx, 'Een inseminator brengt het sperma van de stier met een rietje in de koe.'); };

KF.d4 = (ctx) => { bg(ctx, 'schema'); roundRect(ctx, 80, 90, 900, 760, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2);
  metaText(ctx, 'TOPKOE', 120, 140, C.text2, 'left', 22);
  chromAllelen(ctx, 280, 420, 440, 3, { breed: 56 }); chromAllelen(ctx, 380, 420, 440, 8, { breed: 56 });
  naamBij(ctx, 'chromosomenpaar', 'ALLELEN, MEESTAL KLEIN EFFECT', 330, 700, 1, 'center');
  pijl(ctx, 450, 420, 610, 420, C.paars, 1, 5, 20);
  circ(ctx, 780, 420, 150, rgba('#F6EEDC', 0.08), rgba('#F6EEDC', 0.8), 3); circ(ctx, 780, 420, 136, null, rgba('#F6EEDC', 0.35), 1.5);
  chromAllelen(ctx, 780, 420, 210, 8, { breed: 30, n: 9 }); naamBij(ctx, 'eicel', '', 780, 620, 1, 'center');
  metaText(ctx, 'VAN ELK PAAR ÉÉN · WELKE: TOEVAL', 530, 800, C.paars, 'center', 24);
  const g = 850, P = 2.05; persoon(ctx, 'yasmin', 1330, g, 165 * P, { kijk: 1, uit: 'blij', pose: 'staan' }); persoon(ctx, 'bilal', 1560, g, 165 * P, { kijk: -1, uit: 'lacht', pose: 'handenHeup' });
  metaText(ctx, 'ZELFDE OUDERS', 1440, 440, C.text2, 'center', 26);
  sub(ctx, 'Welke helft is toeval: Yasmin en haar broer Bilal hebben dezelfde ouders en verschillen toch.'); };

// D5 H2: kudde van 12 koeien met staven en de schaalbalk erfelijkheidsgraad
KF.d5 = (ctx) => { bg(ctx, 'schema'); const P = 0.8;
  for (let i = 0; i < 12; i++) { const rij = Math.floor(i / 6), x = 250 + (i % 6) * 270 + rij * 60, g = 300 + rij * 230; const m = 0.35 + 0.65 * hash(i * 4.7 + 2);
    melkStaaf(ctx, x - 108, g, 26, 40 + m * 110, C.goud, 0.9); rund(ctx, 'holstein', x + 20, g, P, { kijk: 1, houding: i % 4 === 2 ? 'grazen' : 'staan' }); }
  // schaalbalk 0–1
  const xa = 260, xb = 1660, yb = 700, X = (v) => xa + (xb - xa) * v; roundRect(ctx, xa, yb - 10, xb - xa, 20, 10); shape(ctx, rgba(C.fill, 0.9), C.line, 2);
  for (let v = 0; v <= 10; v++) { ctx.fillStyle = C.line; ctx.fillRect(X(v / 10) - 1.5, yb + 12, 3, v % 5 ? 10 : 18); } text(ctx, '0', X(0), yb + 58, fTekst(32, 700), C.text2, 'center'); text(ctx, '1', X(1), yb + 58, fTekst(32, 700), C.text2, 'center');
  naamBij(ctx, 'erfelijkheidsgraad (h²)', '', xa, yb - 36, 1, 'left');
  roundRect(ctx, X(1 / 3), yb - 16, X(0.5) - X(1 / 3), 32, 10); shape(ctx, rgba(C.paars, 0.7), C.paars, 2.5); naamBij(ctx, 'MELK', '⅓ TOT ½', X(0.415), yb - 66, 1, 'center');
  roundRect(ctx, X(0.01), yb - 16, X(0.09) - X(0.01), 32, 8); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2.5); naamBij(ctx, 'VRUCHTBAARHEID', 'VAAK < 0,1', X(0.06), yb + 96, 1, 'left');
  metaText(ctx, 'VERSCHILLEN IN EEN GROEP, NIET IN ÉÉN KOE', 1660, 850, C.text2, 'right', 22);
  sub(ctx, 'Voor melk is dat ongeveer een derde tot de helft, voor vruchtbaarheid vaak minder dan een tiende.'); };

// D6 H3: kalverhok in de stal — Yasmin aait het stierkalfje, de veehoudster trekt haren met een tangetje; rechts de chip (Micro)
KF.d6 = (ctx) => { bg(ctx, 'schema'); decorLabel(ctx, 'STAL · KALVERHOK · DECOR VOLGT (ELEVENLABS)'); const g = 850, P = 2.05; stalGrond(ctx, g);
  kalverhok(ctx, 90, 1060, g, 330);
  rund(ctx, 'kalf', 625, g, P * 0.56, { kijk: 1 });
  // kistje met het buisje naast de veehoudster
  roundRect(ctx, 130, g - 70, 110, 70, 8); shape(ctx, '#6A5A48', '#8A7A66', 2); haarBuisje(ctx, 186, g - 76, 0.75, 1, 0, 5);
  persoon(ctx, 'veehoudster', 390, g, 168 * P, { kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: (c, x, y) => tangetje(c, x - 10, y, 0.75, 0.35) });
  persoon(ctx, 'yasmin', 810, g, 165 * P, { kijk: -1, pose: 'vasthouden', uit: 'blij', outfit: 'stal' });
  // rechts: navy kader met de chip
  roundRect(ctx, 1120, 110, 720, 740, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2);
  dnaChip(ctx, 1210, 170, 300, 240, { n: 14, seed: 4 }); naamBij(ctx, 'DNA-chip', 'TIENDUIZENDEN MERKERS · SNP', 1360, 470, 1, 'center');
  chromKaal(ctx, 1640, 300, 300, 44); [0.14, 0.3, 0.47, 0.66, 0.84].forEach((p) => merkerVlag(ctx, 1662, 150 + p * 300, 0.9));
  loep(ctx, 1290, 650, 70); schaar(ctx, 1560, 640, 1); doorstreep(ctx, 1560, 640, 62); spuit(ctx, 1720, 640, 1); doorstreep(ctx, 1720, 640, 62);
  naamBij(ctx, 'LEZEN, NIET VERANDEREN', '', 1480, 800, 1, 'center', C.goud);
  sub(ctx, 'De veehouder trekt een paar haren uit zijn staart en doet ze in een buisje.'); };

KF.d7 = (ctx) => { bg(ctx, 'schema'); const cw = 300, ch = 196, gx = 30, gy = 22, x0 = 140, y0 = 120; const goedSet = [1, 7, 8, 13];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const i = r * 5 + c, goed = goedSet.includes(i), melk = goed ? 0.85 : 0.25 + 0.4 * hash(i * 9.1 + 1);
    stierKaart(ctx, x0 + c * (cw + gx), y0 + r * (ch + gy), cw, ch, { code: goed ? 7 : i + 3, dochters: 6, melk, rand: goed ? C.goud : null, a: goed ? 1 : 0.72 }); }
  const sy = 850, sx = 760; roundRect(ctx, sx - 40, sy - 70, 440, 96, 14); shape(ctx, rgba(C.paars, 0.25), C.paars, 3); roundRect(ctx, sx - 20, sy - 56, 230, 68, 6); shape(ctx, '#F2EEE4', null); streepjescode(ctx, sx - 12, sy - 50, 214, 56, 7);
  rund(ctx, 'kalf', sx + 320, sy + 14, 0.5, { kijk: 1 }); pijl(ctx, sx - 60, sy - 22, sx - 150, sy - 22, C.paars, 0.9, 4, 16);
  naamBij(ctx, 'jouw kalf', '', sx + 420, sy - 14, 1, 'left');
  metaText(ctx, 'DUIZENDEN STIEREN · DNA + DOCHTERS BEKEND', 140, 90, C.text2, 'left', 22); metaText(ctx, 'NL · SINDS 2010', 1780, 90, C.text2, 'right', 22);
  sub(ctx, 'Lijkt het DNA van jouw kalf op dat van stieren met goede dochters? Dan krijgt hij een hoge fokwaarde.'); };

KF.d8 = (ctx) => { bg(ctx, 'schema'); const r = 34, G = C.goud, L = C.line;
  const S = [760, 170], zA = [520, 340], zAp = [360, 340], dB = [1000, 340], dBp = [1160, 340], kA = [440, 510], kAp = [250, 510], kB = [1080, 510], kBp = [1250, 510], kalf = [760, 690], dr = [250, 690];
  const paar = (a, b) => lijn(ctx, [[a[0] + (a[0] < b[0] ? r : -r), a[1]], [b[0] + (a[0] < b[0] ? -r : r), b[1]]], L, 3);
  const kind = (a, b, c, col, lw) => { const mx = (a[0] + b[0]) / 2; lijn(ctx, [[mx, a[1]], [mx, a[1] + 70], [c[0], a[1] + 70], [c[0], c[1] - r]], col, lw); };
  // stier (vierkant) met ster; zijn zoon (links, vaderkant) en dochter (rechts, moederkant) met elk een niet-verwante partner
  lijn(ctx, [[S[0], S[1] + r], [S[0], S[1] + 70], [zA[0], S[1] + 70], [zA[0], zA[1] - r]], G, 6); lijn(ctx, [[S[0], S[1] + 70], [dB[0], S[1] + 70], [dB[0], dB[1] - r]], G, 6);
  paar(zAp, zA); paar(dB, dBp); kind(zAp, zA, kA, G, 6); kind(dB, dBp, kB, G, 6);
  paar(kAp, kA); paar(kA, kB); kind(kA, kB, kalf, G, 6); kind(kAp, kA, dr, L, 3);
  knoop(ctx, ...S, r + 6, true, { rand: G, lw: 4 }); ster(ctx, S[0], S[1], 24); naamBij(ctx, 'topstier', 'JOUW KALF VAN TOEN', S[0] + 52, S[1] + 10, 1, 'left', G);
  knoop(ctx, ...zA, r, true, { rand: G }); knoop(ctx, ...zAp, r, false); knoop(ctx, ...dB, r, false, { rand: G }); knoop(ctx, ...dBp, r, true);
  knoop(ctx, ...kA, r, true, { rand: G }); knoop(ctx, ...kAp, r, false); knoop(ctx, ...kB, r, false, { rand: G }); knoop(ctx, ...kalf, r, false, { vul: rgba(C.koraal, 0.35), rand: C.koraal, lw: 4 }); knoop(ctx, ...dr, r, false, { vul: rgba(C.koraal, 0.12), rand: C.text });
  metaText(ctx, 'VADERKANT', 300, 250, C.text2, 'left', 20); metaText(ctx, 'MOEDERKANT', 1180, 250, C.text2, 'left', 20);
  naamBij(ctx, 'kleinzoon', '', kA[0] + 10, kA[1] + 76, 1, 'center'); naamBij(ctx, 'kleindochter', '', kB[0], kB[1] + 76, 1, 'center');
  // Micro: chromosomenparen bij het kalf en de drager
  roundRect(ctx, 1370, 150, 470, 680, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2);
  chromR(ctx, 1450, 380, 260, 0.36, 'r'); chromR(ctx, 1545, 380, 260, 0.36, 'r'); naamBij(ctx, 'HOMOZYGOOT', '', 1515, 560, 1, 'center', C.koraal); text(ctx, 'rr', 1515, 604, fTekst(34, 700), C.koraal, 'center');
  chromR(ctx, 1670, 380, 260, 0.36, 'r'); chromR(ctx, 1760, 380, 260, 0.36, 'R'); naamBij(ctx, 'DRAGER', '', 1720, 560, 1, 'center'); text(ctx, 'Rr · gezond', 1720, 604, fTekst(30, 700), C.text, 'center');
  metaText(ctx, 'HETZELFDE ALLEL,', 1605, 740, C.text2, 'center', 20); metaText(ctx, 'VAN DEZELFDE VOOROUDER', 1605, 772, C.text2, 'center', 20);
  naamBij(ctx, 'kalf', '', kalf[0], kalf[1] + 80, 1, 'center', C.koraal); naamBij(ctx, 'drager', '', dr[0], dr[1] + 80, 1, 'center');
  sub(ctx, 'Een kalf krijgt nu vaker van vader én moeder hetzelfde allel: het is homozygoot.'); };

// D9 H4: tijdbalk 1962 met de echte stier; vrucht die stopt met groeien (sober)
KF.d9 = (ctx) => { bg(ctx, 'schema'); const ty = 640; lijn(ctx, [[140, ty], [960, ty]], C.line, 4);
  [[200, '1950'], [420, '1962'], [700, '1990'], [900, 'NU']].forEach(([x, s]) => { ctx.fillStyle = s === '1962' ? C.goud : C.line; ctx.fillRect(x - 2, ty - (s === '1962' ? 22 : 12), 4, s === '1962' ? 44 : 24); text(ctx, s, x, ty + 50, fTekst(s === '1962' ? 38 : 30, 700), s === '1962' ? C.goud : C.text2, 'center'); });
  lijn(ctx, [[420, ty - 22], [420, 500]], C.goud, 3);
  stierKaart(ctx, 230, 200, 380, 300, { rand: C.goud, geenStier: 1 }); rund(ctx, 'stier', 420, 470, 0.95, { kijk: 1 });
  metaText(ctx, 'ECHTE STIER · PAWNEE FARM ARLINDA CHIEF (VS)', 140, 160, C.goud, 'left', 22);
  naamBij(ctx, '> 16.000 dochters', '', 650, 360, 1, 'left');
  // in de loop van de dracht: de vrucht groeit, groeit, stopt (grijs); sober, geen bloed
  [[1160, 0.5, 0], [1440, 0.8, 0], [1720, 0.82, 1]].forEach(([x, gr, st], i) => { baarmoederVrucht(ctx, x, 390, 100, gr, st); metaText(ctx, ['GROEIT', 'GROEIT', 'STOPT'][i], x, 540, st ? C.koraal : C.text2, 'center', 22); });
  pijl(ctx, 1110, 600, 1790, 600, C.line, 0.7, 3, 14); metaText(ctx, 'DRACHT', 1110, 640, C.text2, 'left', 20);
  naamBij(ctx, 'twee kopieën van het allel', '', 1440, 720, 1, 'center', C.koraal);
  metaText(ctx, 'NAAR SCHATTING ± HALF MILJOEN · WERELDWIJD', 1450, 830, C.text2, 'center', 22);
  sub(ctx, 'Kalfjes met twee kopieën stierven al in de baarmoeder: wereldwijd naar schatting een half miljoen.'); };

KF.d10 = (ctx) => { bg(ctx, 'schema'); decorLabel(ctx); const g = 850, P = 1.85; stalGrond(ctx, g);
  rund(ctx, 'holstein', 330, g, P, { kijk: 1 });
  persoon(ctx, 'veehoudster', 760, g, 168 * P, { kijk: 1, pose: 'vasthouden', uit: 'denkt', hold: (c, x, y) => { roundRect(c, x - 6, y - 52, 70, 50, 6); shape(c, '#1E232C', '#5A6070', 2); roundRect(c, x - 1, y - 47, 60, 40, 3); shape(c, rgba(C.teal, 0.5), null); } });
  persoon(ctx, 'yasmin', 1000, g, 165 * P, { kijk: -1, outfit: 'stal', uit: 'neutraal' });
  tabletScherm(ctx, 1110, 140, 730, 520, { streep: 1 });
  sub(ctx, 'De beste melkstier is familie, een mindere niet. Ze kiest de tweede.'); };
