// Keyframes voor het twijfelblad (zelfde tekenfuncties als de film straks). Elke functie tekent één frame op 1920×1080.
const KF = {};
const sub = (ctx, s) => { if (!s) return; ctx.save(); ctx.font = fTekst(40, 700); const w = Math.min(1700, ctx.measureText(s).width + 60); roundRect(ctx, 960 - w / 2, 930, w, 76, 12); ctx.fillStyle = rgba('#0D1420', 0.9); ctx.fill(); text(ctx, s, 960, 982, fTekst(40, 700), C.text, 'center'); ctx.restore(); };
const grondBand = (ctx) => { ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 820, W, 80); ctx.fillStyle = '#3A5540'; ctx.fillRect(0, 812, W, 10); };

// D1 cold open: moestuin, twee bakken, een maand later
KF.d1 = (ctx) => { bg(ctx, 'schema'); grondBand(ctx);
  metaText(ctx, 'MOESTUIN · DECOR VOLGT (ELEVENLABS)', 80, 90, C.text2, 'left', 24);
  const yz = plantenbak(ctx, 760, 830, 360, 'zand', 1, { label: 'zand' }); tomatenplant(ctx, 760, yz, 230, 0, { blad: 4, trossen: [0.3] });
  const yk = plantenbak(ctx, 1240, 830, 360, 'klei', 1, { label: 'klei' }); tomatenplant(ctx, 1240, yk, 340, 0, { blad: 6, trossen: [0.6, 0.3] });
  persoon(ctx, 'yasmin', 420, 830, 400, { kijk: 1, pose: 'wijs', uit: 'verbaasd' }); persoon(ctx, 'henk', 1580, 830, 420, { kijk: -1, pose: 'denk' });
  tag(ctx, 'een maand later', 1000, 170, C.goud, 1, 'center', 32);
  sub(ctx, 'Een maand later groeien de planten heel anders.'); };

// D2 H1 schaal + kalium plakt (Micro)
KF.d2 = (ctx) => { bg(ctx, 'micro');
  zandkorrel(ctx, 520, 470, 250, 4); naamBij(ctx, 'zandkorrel', '50 µm TOT 2 mm', 520, 790, 1, 'center');
  for (let i = 0; i < 3; i++) kleideeltje(ctx, 1200 + i * 230, 360 + i * 120, 200, -0.2 + i * 0.25, 1, { lading: 5 });
  naamBij(ctx, 'kleideeltjes', 'KLEINER DAN 2 µm · VERGROOT', 1450, 790, 1, 'center');
  ion(ctx, 1235, 290, 'K', 1.8, 1, { vast: 1, volg: true });
  ion(ctx, 560, 150, 'K', 1.6, 0.6, { vast: 0 }); pijl(ctx, 640, 190, 820, 560, C.teal, 0.6, 3);
  metaText(ctx, 'NIET OP SCHAAL', 80, 860, C.grain, 'left', 28);
  sub(ctx, 'Kleideeltjes zijn negatief geladen, dus het kaliumion blijft aan de klei plakken.'); };

// D3 H1 schudproef + trechters
KF.d3 = (ctx) => { bg(ctx, 'schema');
  jampot(ctx, 330, 760, 230, 400, 1, 0.85, (c, x0, y0, w, h) => { for (let i = 0; i < 70; i++) circ(c, x0 + 12 + hash(i * 3) * (w - 24), y0 + h - 10 - hash(i * 5) * 70, 5 + 3 * hash(i), BODEM.zand); });
  jampot(ctx, 640, 760, 230, 400, 1, 0.85, (c, x0, y0, w, h) => { c.fillStyle = rgba(BODEM.klei, 0.55); c.fillRect(x0, y0 + 20, w, h - 20); c.fillStyle = BODEM.klei; c.fillRect(x0, y0 + h - 22, w, 22); });
  naamBij(ctx, 'zand', 'ZAKT METEEN', 330, 830, 1, 'center'); naamBij(ctx, 'klei', 'BLIJFT ZWEVEN', 640, 830, 1, 'center');
  trechter(ctx, 1150, 400, 1.1, 'zand', 1, 0.9, 0.8, 1); trechter(ctx, 1550, 400, 1.1, 'klei', 1, 0.3, 0.8, 1);
  naamBij(ctx, 'zandgrond', '', 1150, 160, 1, 'center'); naamBij(ctx, 'kleigrond', '', 1550, 160, 1, 'center');
  metaText(ctx, 'VEREENVOUDIGD', 1720, 90, C.grain, 'right', 28);
  sub(ctx, 'Waar komt het meeste water onderuit? Wat denk je?'); };

// D4 H2 worm in de hand + bodemprofiel
KF.d4 = (ctx) => { bg(ctx, 'schema');
  bodemprofiel(ctx, 820, 300, 1000, 520, 1, { gang: [[1180, 296], [1176, 380], [1200, 500], [1240, 640], [1230, 790]], gangDik: 28, wortels: [[[[980, 300], [990, 450], [960, 620]], 0, 5], [[[1500, 300], [1520, 420], [1490, 560]], 0, 4]] });
  regenworm(ctx, [[1183, 318], [1180, 400], [1200, 500], [1236, 610]], 13);
  doodBlad(ctx, 1150, 300, 0.9, 0.25, 1, 0);
  naamBij(ctx, 'regenworm', 'TREKT EEN DOOD BLAD ZIJN GANG IN', 1270, 440, 1, 'left'); metaText(ctx, 'WORM VERGROOT', 840, 860, C.grain, 'left', 24);
  persoon(ctx, 'yasmin', 340, 830, 440, { kijk: 1, pose: 'vasthouden', uit: 'verbaasd', hold: (c, x, y) => regenworm(c, [[x - 46, y - 4], [x - 10, y - 14], [x + 26, y - 6], [x + 60, y - 16]], 9) });
  persoon(ctx, 'henk', 690, 830, 450, { kijk: -1, pose: 'staan', uit: 'blij' });
  sub(ctx, 'Opa Henk legt een regenworm in Yasmins hand.'); };

KF.d5 = (ctx) => { bg(ctx, 'micro'); ctx.fillStyle = rgba(BODEM.grond, 0.25); ctx.fillRect(0, 0, W, 900);
  mycorrhiza(ctx, 960, 470, 1300, 1, { groei: 0.8, stroom: 1, t: 0.4 });
  naamBij(ctx, 'wortel', 'MET WORTELHAREN', 420, 400, 1, 'left'); naamBij(ctx, 'schimmeldraden', 'REIKEN VERDER DE GROND IN', 1380, 210, 1, 'left');
  metaText(ctx, 'ZEVEN OP DE TIEN SOORTEN LANDPLANTEN', 80, 860, C.grain, 'left', 28);
  sub(ctx, 'De schimmeldraden halen vooral fosfaat voor de plant op.'); };

// D6 H4 nitraat glipt weg, fosfaat zit vast
KF.d6 = (ctx) => { bg(ctx, 'micro');
  for (let i = 0; i < 4; i++) zandkorrel(ctx, 380 + i * 340, 300 + (i % 2) * 260, 120, i + 2);
  kleideeltje(ctx, 560, 640, 220, 0.3, 1, { lading: 5 }); humusVlok(ctx, 1300, 300, 90, 5);
  ion(ctx, 600, 560, 'K', 1.6, 1, { vast: 1 }); ion(ctx, 1290, 200, 'K', 1.6, 1, { vast: 1 });
  ion(ctx, 960, 450, 'NO3', 1.9, 1, { vast: 0, volg: true }); pijl(ctx, 960, 540, 960, 820, C.teal, 1, 4);
  ion(ctx, 1640, 620, 'P', 1.6, 1, { vast: 1 }); naamBij(ctx, 'fosfaat', 'VAST AAN IJZER, ALUMINIUM OF CALCIUM', 1640, 730, 1, 'center');
  naamBij(ctx, 'nitraat', 'SPOELT MEE', 1010, 640, 1, 'left');
  sub(ctx, 'Het nitraatdeeltje blijft nergens aan hangen.'); };

// D7 H4 strookje (menselijk moment)
KF.d7 = (ctx) => { bg(ctx, 'schema');
  druppelbak(ctx, 960, 560, 520, 1, { druppels: 1, vol: 0.7, t: 0.3, soort: 'tuin' }); naamBij(ctx, 'tuingrond', 'KLEI + HUMUS', 960, 250, 1, 'center');
  persoon(ctx, 'yasmin', 1470, 900, 430, { kijk: -1, pose: 'vasthouden', uit: 'verbaasd', hold: (c, x, y) => teststrookje(c, x, y + 40, 0.75, 0.85, 1, 0) }); persoon(ctx, 'henk', 420, 900, 440, { kijk: 1, pose: 'staan' });
  metaText(ctx, 'VEREENVOUDIGD', 1840, 90, C.grain, 'right', 28);
  sub(ctx, 'Het strookje kleurt donker: er druppelt nitraat uit de bak.'); };

// D8 recap opleidingen
KF.d8 = (ctx) => { bg(ctx, 'schema'); regel(ctx, 'Waar leer je dit?', 140, 200, 1, C.text, 64, 'left', 700);
  [['mbo', 'Vakexpert teelt en groene technologie', 'PLAATS NOG NAGAAN'], ['hbo', 'Tuinbouw en Akkerbouw', 'O.A. DEN BOSCH'], ['wo', 'Plantenwetenschappen', 'WAGENINGEN']].forEach(([n, o, m], i) => { roundRect(ctx, 140, 290 + i * 170, 1100, 140, 18); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); text(ctx, n, 190, 375 + i * 170, fTitel(48), C.groen); text(ctx, o, 330, 370 + i * 170, fTekst(44, 700), C.text); metaText(ctx, m, 330, 410 + i * 170, C.grain, 'left', 24); });
  regel(ctx, 'akkerbouwer · teeltadviseur · bodemspecialist · onderzoeker', 140, 830, 1, C.text2, 36, 'left', 600);
  sub(ctx, 'Op het mbo leer je telen, bijvoorbeeld in de opleiding Vakexpert teelt en groene technologie.'); };
