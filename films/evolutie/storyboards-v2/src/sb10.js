// Evolutie v2 · extra film 10 'Het ontstaan van het leven' — storyboard: één keyframe per scène (23 okt 2026)
// Laden: micro_evo, teken_evo10, sb10 (python3 render.py micro_evo,teken_evo10,sb10 SB10)

function olSchema(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function olMicro(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
// drie vakjes: bouwstenen, kopieerder, omhulsel. st = per vakje 0 leeg, 1 groen vinkje, 'h' hypothese
function olVakjes(ctx, x, y, st = [0, 0, 0], o = {}) { const { w = 470, h = 300, gap = 40, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  const namen = ['bouwstenen', 'informatie die zich kopieert', 'een omhulsel'];
  const icoon = [(cx, cy) => { olAminozuur(ctx, cx - 70, cy, 0.8); olNucleotide(ctx, cx + 60, cy, 'G', 0.55); },
    (cx, cy) => olRnaStreng(ctx, olSlap(cx, cy, 260, 0, 2, 0.8), 'AUGGCUAAGUUCG', { w: 5 }),
    (cx, cy) => olBlaasje(ctx, cx, cy, 78, { s: 0.42 })];
  for (let i = 0; i < 3; i++) { const bx = x + i * (w + gap); roundRect(ctx, bx, y, w, h, 18); shape(ctx, rgba(C.fill, 0.6), st[i] === 1 ? C.groen : C.line, st[i] === 1 ? 3 : 1.5);
    icoon[i](bx + w / 2, y + h * 0.45); text(ctx, namen[i], bx + w / 2, y + h - 30, fTekst(36, 600), C.text, 'center');
    if (st[i] === 1) { circ(ctx, bx + w - 34, y + 34, 22, C.groen); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx + w - 45, y + 34); ctx.lineTo(bx + w - 37, y + 43); ctx.lineTo(bx + w - 22, y + 25); ctx.stroke(); }
    if (st[i] === 'h') metaText(ctx, 'hypothese', bx + w - 24, y + 44, C.goud, 'right', 26); }
  ctx.restore(); }
// plasje met RNA-strengen (simulatie, Schema): n strengen, aandeel 'snel' (goud omlijnd), voorraad losse letters
function olPlasje(ctx, x, y, w, h, o = {}) { const { snel = 0.2, letters = 60, fout = 2, a = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2 - 8, h / 2 - 8, 0, 0, 6.283); ctx.clip();
  const seq = ['AUGGCUAAG', 'GCUAAGUUC', 'CCGAUAGGA', 'UAGGCAACU'];
  for (let i = 0; i < letters; i++) { const px = x + 40 + hash(i * 3.3) * (w - 80), py = y + 30 + hash(i * 7.1) * (h - 60); olBase(ctx, px, py, 'AUGC'[i % 4], 0.16, { letter: false, dir: hash(i) > 0.5 ? 1 : -1 }); }
  const N = 16; for (let i = 0; i < N; i++) { const px = x + 120 + (i % 4) * (w - 240) / 3 + (hash(i * 2.2) - 0.5) * 60, py = y + 70 + Math.floor(i / 4) * (h - 140) / 3 + (hash(i * 5.5) - 0.5) * 30;
    const isSnel = i < Math.round(N * snel); olRnaStreng(ctx, olSlap(px, py, 150, (hash(i) - 0.5) * 0.8, i, 0.5), seq[i % 4], { w: 4, rand: isSnel ? C.goud : null });
    if (i % 7 === 3 && fout) circ(ctx, px + 30, py - 4, 7, C.goud); }
  ctx.restore(); ctx.restore(); }
function olGrafiek(ctx, x, y, w, h, n, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const f = (u) => 0.33 + 0.32 * (1 - Math.exp(-u * 4)); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 60 * n; i++) { const u = i / 60; const yy = y - (f(u) + 0.02 * Math.sin(i * 1.7)) * h; i ? ctx.lineTo(x + u * w, yy) : ctx.moveTo(x, yy); } ctx.stroke();
  metaText(ctx, 'rondes kopiëren', x + w, y + 44, C.text2, 'right', 26); metaText(ctx, 'gemiddelde kopieersnelheid', x, y - h - 40, C.text2, 'left', 26); ctx.restore(); }
// korte tijdas in miljard jaar geleden
function olTijdAs(ctx, x, y, w, van, tot, merk = []) { const X = (g) => x + (van - g) / (van - tot) * w; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let g = van, k = 0; g >= tot - 0.001; k++, g = van - k * (van - tot > 2 ? 0.4 : 0.2)) { const px = X(g); ctx.beginPath(); ctx.moveTo(px, y - 10); ctx.lineTo(px, y + 10); ctx.stroke(); metaText(ctx, g < 0.05 ? 'nu' : g.toFixed(1).replace('.', ','), px, y + 46, C.text2, 'center', 26); }
  metaText(ctx, 'miljard jaar geleden', x, y + 90, C.text2, 'left', 26);
  merk.forEach(m => { const px = X(m.g); if (m.van) { roundRect(ctx, X(m.van), y - 16, X(m.tot) - X(m.van), 32, 16); shape(ctx, rgba(m.kleur || C.goud, 0.35), m.kleur || C.goud, 2); } else circ(ctx, px, y, 11, m.kleur || C.text, null);
    naamBij(ctx, m.tekst, m.meta || null, m.van ? (X(m.van) + X(m.tot)) / 2 : px, y - 44 - (m.hoog || 0), 1, 'center', m.kleur === C.goud ? C.goud : C.text); });
  return X; }

const SB10 = {
  // ---------------- Opening ----------------
  e10s01(ctx) { olSchema(ctx); olTag(ctx, 'OPENING');
    persoon(ctx, 'henk', 230, 800, 400, { uit: 'blij' }); persoon(ctx, 'ria', 400, 800, 380, { uit: 'blij' });
    persoon(ctx, 'linda', 760, 800, 400, { uit: 'blij' }); persoon(ctx, 'rachid', 930, 800, 420, { uit: 'blij' }); persoon(ctx, 'noor', 1560, 800, 410, { uit: 'blij', kijk: -1 });
    ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(470, 470); ctx.quadraticCurveTo(580, 330, 690, 470); ctx.moveTo(1000, 470); ctx.quadraticCurveTo(1150, 300, 1250, 330); ctx.lineTo(1450, 380); ctx.stroke(); ctx.setLineDash([]);
    olZygote(ctx, 580, 380, 30); olZygote(ctx, 1250, 330, 40); naamBij(ctx, 'bevruchte eicel', 'jij, als één cel', 1250, 230, 1, 'center', C.goud);
    naamBij(ctx, 'Noor', null, 1560, 350, 1, 'center'); naamBij(ctx, 'Linda en Rachid', 'haar ouders', 845, 330, 1, 'center');  naamBij(ctx, 'Opa Henk en Oma Ria', null, 315, 350, 1, 'center');
    evoSchaal(ctx, 'eicel vergroot · niet op schaal'); },
  e10s02(ctx) { olSchema(ctx); olTag(ctx, 'OPENING'); const y = 470;
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1800, y); ctx.lineTo(120, y); ctx.stroke();
    persoon(ctx, 'noor', 1780, y + 140, 200, { a: 0.9 }); persoon(ctx, 'linda', 1690, y + 140, 190, { a: 0.6 }); persoon(ctx, 'henk', 1610, y + 140, 190, { a: 0.4 });
    for (let i = 0; i < 26; i++) { const px = 1540 - i * 46; circ(ctx, px, y, 6, rgba(C.goud, 0.9 - i * 0.02)); }
    olCelIcoon(ctx, 'eukaryoot', 520, y - 120, 1.3); olCelIcoon(ctx, 'bacterie', 250, y - 110, 1.3);
    olTijdAs(ctx, 140, 760, 1640, 4, 0, []);
    naamBij(ctx, 'elke cel komt uit een cel', null, 960, 300, 1, 'center'); naamBij(ctx, 'eencelligen', null, 390, 300, 1, 'center'); },
  e10s03(ctx) { olJongeAarde(ctx); olTag(ctx, 'OPENING');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W, 820); ctx.lineTo(1500, 820); ctx.stroke(); ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.moveTo(1500, 820); ctx.lineTo(1300, 820); ctx.stroke(); ctx.setLineDash([]);
    roundRect(ctx, 90, 220, 1060, 200, 18); ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fill(); text(ctx, 'Hoe word je van losse moleculen', 130, 300, fTitel(64), C.text, 'left'); text(ctx, 'een cel die zichzelf kopieert?', 130, 380, fTitel(64), C.text, 'left'); evoSchaal(ctx, 'jonge aarde · ongeveer 4 miljard jaar geleden'); },
  e10s04(ctx) { olTitelKaart(ctx, (c) => { olBlaasje(c, 1480, 640, 230, { inhoud: () => olRnaStreng(c, olSlap(1480, 640, 240, 0.3, 3, 0.9), 'AUGGCUAAGUUCGA', { w: 6 }) }); }); },
  e10s05(ctx) { olSchema(ctx); olTag(ctx, 'OPENING'); olVakjes(ctx, 200, 330, [0, 0, 0]); text(ctx, 'Kan dit zonder leven ontstaan?', 960, 780, fTekst(48, 600), C.goud, 'center');
    naamBij(ctx, 'wat elke cel heeft', null, 200, 270, 1, 'left'); },
  // ---------------- H1 Bouwstenen ----------------
  e10s06(ctx) { olJongeAarde(ctx, { bliksem2: false }); olTag(ctx, 'BOUWSTENEN'); olBewijs(ctx, 'gemeten');
    [['h2o', 1260, 300], ['co2', 1420, 270], ['n2', 1580, 320], ['h2o', 1700, 260], ['co2', 1180, 380]].forEach(([m, x, y]) => olMolecuul(ctx, m, x, y, 2.2));
    olMolecuul(ctx, 'n2', 1380, 420, 2.2); ctx.save(); ctx.translate(1560, 470); circ(ctx, 0, 0, 30, null, C.koraal, 4); ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.moveTo(-21, 21); ctx.lineTo(21, -21); ctx.stroke(); ctx.restore();
    naamBij(ctx, 'geen zuurstof', 'O₂ bijna nul', 1610, 480, 1, 'left'); naamBij(ctx, 'energie', 'bliksem · vulkanen · uv', 120, 230, 1, 'left');
    evoSchaal(ctx, 'moleculen sterk vergroot'); },
  e10s07(ctx) { olSchema(ctx); olTag(ctx, 'BOUWSTENEN'); olMiller(ctx, 1000, 760, 0.92, { kleur: 0.2 }); persoon(ctx, 'miller', 260, 900, 470, { pose: 'wijs', kijk: 1, uit: 'neutraal' });
    naamBij(ctx, 'Stanley Miller', '1953 · Chicago', 260, 360, 1, 'center'); metaText(ctx, '7 dagen', 1660, 860, C.text2, 'left', 28); circ(ctx, 1620, 852, 18, null, C.line, 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1620, 852); ctx.lineTo(1620, 838); ctx.stroke(); },
  e10q08(ctx) { olVraag(ctx, 'Na een week vonken: wat zat er in Millers kolf?', ['Niets nieuws: alleen water en gassen', 'Aminozuren, maar geen eiwitten of cellen', 'Eiwitten en zelfs eenvoudige cellen']); olMiller(ctx, 1600, 780, 0.5, { kleur: 1, labels: false }); },
  e10s09(ctx) { olSchema(ctx); olTag(ctx, 'BOUWSTENEN'); olBewijs(ctx, 'gemeten'); const r = olMiller(ctx, 560, 740, 0.62, { kleur: 1, labels: false });
    zoomCircle(ctx, 1320, 470, 330, r.val[0], r.val[1], 'in de rode vloeistof · sterk vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(980, 130, 680, 680);
      for (let i = 0; i < 16; i++) olMolecuul(ctx, 'h2o', 1060 + hash(i * 3.1) * 520, 200 + hash(i * 5.3) * 540, 1.4, { rot: i });
      olAminozuur(ctx, 1200, 400, 1.5, { soort: 'glycine', rand: C.goud }); olAminozuur(ctx, 1460, 560, 1.5, { soort: 'alanine', rand: C.goud }); });
    naamBij(ctx, 'glycine', null, 1200, 310, 1, 'center', C.goud); naamBij(ctx, 'alanine', null, 1590, 470, 1, 'center', C.goud);
    naamBij(ctx, 'heranalyse 2008', 'proef 1953: 14 soorten · stoomproef: 22', 160, 230, 1, 'left'); },
  e10s10(ctx) { olSchema(ctx); olTag(ctx, 'BOUWSTENEN'); olBewijs(ctx, 'onzeker');
    const kol = (x, gassen, titel, meta, balk, dimA) => { ctx.save(); ctx.globalAlpha *= dimA; circ(ctx, x, 460, 190, rgba(C.fill, 0.5), '#AFC0D0', 4);
      gassen.forEach((g, i) => { const an = i * 2.4, rr = Math.sqrt((i + 0.5) / gassen.length) * 140; olMolecuul(ctx, g, x + Math.cos(an) * rr, 460 + Math.sin(an) * rr, 1.6, { rot: i }); });
      naamBij(ctx, titel, meta, x, 230, 1, 'center'); roundRect(ctx, x - 160, 760, 320, 40, 20); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); roundRect(ctx, x - 160, 760, 320 * balk, 40, 20); shape(ctx, OL.aa, OL.aaR, 1.5); metaText(ctx, 'aminozuren', x, 840, C.text2, 'center', 26); ctx.restore(); };
    kol(560, ['ch4', 'nh3', 'h2', 'ch4', 'nh3', 'h2', 'h2o', 'ch4', 'nh3'], 'Millers lucht', 'methaan · ammoniak · waterstof', 0.9, 0.5);
    kol(1360, ['co2', 'n2', 'co2', 'n2', 'h2o', 'co2', 'n2', 'co2', 'n2'], 'jonge lucht volgens geologen nu', 'vooral koolstofdioxide · stikstof', 0.35, 1);
    pijl(ctx, 820, 460, 1100, 460, C.line, 1, 4, 18); },
  e10s11(ctx) { olJongeAarde(ctx, { bliksem: false }); olTag(ctx, 'BOUWSTENEN'); olBewijs(ctx, 'gemeten'); olVuurbal(ctx, 560, 280, 2.55, 420); olMeteorietBrok(ctx, 520, 760, 110);
    zoomCircle(ctx, 1360, 450, 290, 560, 760, null, 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1060, 170, 600, 600);
      olAminozuur(ctx, 1220, 360, 1.2); olAminozuur(ctx, 1460, 330, 1.2, { soort: 'alanine' }); olAminozuur(ctx, 1260, 600, 1.1);
      ctx.save(); ctx.translate(1470, 560); ctx.rotate(-0.4); olBase(ctx, 0, 0, 'A', 0.7); ctx.restore(); ctx.save(); ctx.translate(1580, 520); ctx.rotate(0.3); olBase(ctx, 0, 0, 'U', 0.7); ctx.restore(); });
    naamBij(ctx, 'meteoriet van Murchison', '1969 · Australië', 520, 920 - 60, 1, 'center'); naamBij(ctx, 'meer dan 70 soorten aminozuren', 'en basen van DNA en RNA · sterk vergroot', 1360, 810, 1, 'center'); },
  e10s12(ctx) { olSchema(ctx); olTag(ctx, 'BOUWSTENEN'); olVakjes(ctx, 200, 250, [1, 0, 0]);
    // zak met losse letters
    vul(ctx, [[760, 860], [700, 700], [760, 640], [960, 620], [1160, 640], [1220, 700], [1160, 860]], '#5A4A38', '#8C7660', 3);
    'AUGCGAUCCAGU'.split('').forEach((b, i) => { ctx.save(); ctx.translate(800 + (i % 6) * 64, 690 + Math.floor(i / 6) * 70); ctx.rotate((hash(i * 4) - 0.5) * 2); olBase(ctx, 0, -24, b, 0.38); ctx.restore(); });
    naamBij(ctx, 'losse letters: nog geen boek', null, 1260, 760, 1, 'left'); },
  // ---------------- H2 Informatie en gereedschap ----------------
  e10s13(ctx) { olMicro(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP');
    ctx.save(); ctx.beginPath(); ctx.arc(560, 520, 300, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.25); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    dnaDraad(ctx, [[340, 520], [430, 440], [540, 560], [650, 450], [760, 540]], { w: 22, helix: true }); naamBij(ctx, 'DNA', 'bouwtekening', 560, 380, 1, 'center');
    olEiwit(ctx, 1380, 520, 1.1); naamBij(ctx, 'eiwit (enzym)', 'gereedschap', 1380, 330, 1, 'center');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(800, 430); ctx.quadraticCurveTo(1000, 300, 1180, 420); ctx.stroke(); pijl(ctx, 1170, 412, 1190, 426, C.goud, 1, 4, 18);
    ctx.beginPath(); ctx.moveTo(1180, 640); ctx.quadraticCurveTo(1000, 760, 800, 630); ctx.stroke(); pijl(ctx, 812, 638, 792, 624, C.goud, 1, 4, 18);
    naamBij(ctx, 'beschrijft', null, 990, 300, 1, 'center', C.goud); naamBij(ctx, 'kopieert', null, 990, 790, 1, 'center', C.goud); evoSchaal(ctx, 'schematisch · sterk vergroot'); },
  e10q14(ctx) { olVraag(ctx, ['DNA heeft eiwitten nodig, en eiwitten hebben DNA nodig.', 'Wat zou dat kringetje kunnen doorbreken?'], ['Een molecuul dat informatie draagt én werk doet', 'Meer DNA, want dat is de bouwtekening', 'Grotere eiwitten, want die doen het werk']);
    dnaDraad(ctx, [[1520, 300], [1580, 250], [1650, 310], [1720, 250]], { w: 16, helix: true }); olEiwit(ctx, 1640, 520, 0.6, { actief: false }); pijl(ctx, 1780, 300, 1790, 460, C.goud, 1, 3, 14); pijl(ctx, 1500, 480, 1500, 330, C.goud, 1, 3, 14); },
  e10s15(ctx) { olMicro(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP');
    olRnaStreng(ctx, olSlap(560, 520, 760, 0, 4, 1.4), 'AUGGCUAAGUUCGACGAUCCAG', { w: 7 }); naamBij(ctx, 'RNA', 'één losse streng · vier letters: A U G C', 200, 340, 1, 'left');
    olRibozym(ctx, 1480, 560, 1.0, { fold: 0.75, actief: false }); naamBij(ctx, 'vouwt terug', 'stukken die passen, paren', 1480, 260, 1, 'center');
    pijl(ctx, 1000, 520, 1140, 540, C.line, 1, 4, 18); evoSchaal(ctx, 'model · sterk vergroot'); },
  e10s16(ctx) { olMicro(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olBewijs(ctx, 'gemeten');
    olRibozym(ctx, 520, 500, 1.15, { fold: 1 }); naamBij(ctx, 'ribozym', 'RNA dat werkt als een enzym', 520, 180, 1, 'center');
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(1000, 120); ctx.lineTo(1000, 860); ctx.stroke();
    olRibosoom(ctx, 1460, 640, 1.0); naamBij(ctx, 'ribosoom', 'RNA zet de aminozuren aan elkaar', 1460, 230, 1, 'center'); naamBij(ctx, 'RNA zet aaneen', null, 1520, 620, 1, 'left', C.goud);
    evoSchaal(ctx, 'schematisch · sterk vergroot'); },
  e10s17(ctx) { olSchema(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olBewijs(ctx, 'hypothese');
    olRnaStreng(ctx, olSlap(560, 480, 640, 0, 4, 1.2), 'AUGGCUAAGUUCGACGAUC', { w: 7 }); naamBij(ctx, 'bouwtekening', 'informatie in de volgorde', 560, 320, 1, 'center');
    olRibozym(ctx, 1380, 480, 0.95, { fold: 1 }); naamBij(ctx, 'gereedschap', 'versnelt een reactie', 1380, 190, 1, 'center');
    haak(ctx, 220, 1700, 700, 'RNA-wereld: leven met RNA, vóór DNA en eiwitten', C.groen); },
  e10s18(ctx) { olMicro(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olBewijs(ctx, 'gemeten');
    olRnaStreng(ctx, [[300, 600], [700, 600], [1100, 600], [1500, 600]], 'GCUAAGUUCGAC', { w: 10, groot: 0.55, letters: true, kant: -1 });
    olRnaStreng(ctx, [[300, 470], [750, 470], [1200, 470]], 'CGAUUCAAG', { w: 10, groot: 0.55, letters: true, kant: 1, stap: 1200 / 12 });
    [[300, 'CGA'], [600, 'UUC'], [900, 'AAG']].forEach(([x]) => { roundRect(ctx, x + 6, 420, 288, 130, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]); });
    olRibozym(ctx, 1380, 300, 0.7, { fold: 1 }); 
    naamBij(ctx, 'klein ribozym: 45 letters', 'Cambridge, 2026', 1560, 200, 1, 'left'); naamBij(ctx, 'sjabloon', null, 1560, 640, 1, 'left'); naamBij(ctx, 'stukjes van drie letters', 'aan elkaar gezet', 300, 360, 1, 'left', C.goud);
    evoSchaal(ctx, 'na 72 dagen: 0,2 % kopie · in half bevroren water'); },
  e10s19(ctx) { olSchema(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olBewijs(ctx, 'model'); olPlasje(ctx, 260, 220, 1400, 600, { snel: 0.12, letters: 70 });
    naamBij(ctx, 'fout bij kopiëren', null, 1480, 200, 1, 'left', C.goud); naamBij(ctx, 'losse letters raken op', null, 260, 880 - 20, 1, 'left'); },
  e10q20(ctx) { olVraag(ctx, 'Wat gebeurt er na veel rondes kopiëren met de strengen in het plasje?', ['Niets: de fouten zijn toeval, dus alles blijft gelijk', 'Ze worden slechter: fouten maken de strengen stuk', 'Strengen die sneller kopiëren, worden steeds talrijker']); olPlasje(ctx, 1470, 300, 400, 300, { snel: 0.12, letters: 20 }); },
  e10s21(ctx) { olSchema(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olBewijs(ctx, 'model'); olPlasje(ctx, 140, 220, 900, 560, { snel: 0.75, letters: 18 });
    olGrafiek(ctx, 1200, 760, 580, 460, 1); naamBij(ctx, 'snelle variant', 'goud omlijnd', 140, 180, 1, 'left', C.goud); },
  e10s22(ctx) { olSchema(ctx); olTag(ctx, 'INFORMATIE EN GEREEDSCHAP'); olPlasje(ctx, 120, 260, 760, 480, { snel: 0.6, letters: 20 });
    ['erfelijke variatie', 'te weinig voor iedereen', 'selectie'].forEach((t, i) => { roundRect(ctx, 1000, 280 + i * 140, 760, 100, 18); shape(ctx, rgba(C.fill, 0.7), C.groen, 2); text(ctx, t, 1040, 345 + i * 140, fTekst(44, 600), C.text, 'left'); });
    naamBij(ctx, 'zoals in de film Natuurlijke selectie', 'maar zonder cel', 1000, 230, 1, 'left'); },
  // ---------------- H3 Een omhulsel ----------------
  e10s23(ctx) { olMicro(ctx); olTag(ctx, 'EEN OMHULSEL');
    olRnaStreng(ctx, olSlap(700, 500, 300, 0.2, 1, 0.9), 'AUGGCUAAGU', { w: 6, rand: C.goud }); naamBij(ctx, 'snelle kopieerder', null, 700, 380, 1, 'center', C.goud);
    [[1100, 360, 0.5], [1300, 600, -0.3], [1550, 420, 0.8], [400, 700, 0.3], [1700, 700, -0.6]].forEach(([x, y, r], i) => { olRnaStreng(ctx, olSlap(x, y, 200, r, i + 3, 0.7), 'AUGGCUAAGU', { w: 5, a: 0.9 - i * 0.12 }); });
    pijl(ctx, 880, 470, 1040, 400, C.line, 1, 3, 14); pijl(ctx, 880, 540, 1220, 600, C.line, 1, 3, 14); pijl(ctx, 540, 560, 440, 660, C.line, 1, 3, 14);
    naamBij(ctx, 'kopieën drijven weg', 'naar de buren', 1460, 250, 1, 'center'); },
  e10s24(ctx) { olMicro(ctx); olTag(ctx, 'EEN OMHULSEL'); olBewijs(ctx, 'gemeten'); olVetzuur(ctx, 620, 500, 0, 9);
    naamBij(ctx, 'kop', 'lost op in water', 620, 300, 1, 'center'); naamBij(ctx, 'staart', 'lost niet op in water', 1160, 410, 1, 'center');
    for (let i = 0; i < 10; i++) olMolecuul(ctx, 'h2o', 140 + hash(i * 3) * 260, 380 + hash(i * 7) * 400, 1.6, { rot: i }); evoSchaal(ctx, 'vetzuur · sterk vergroot'); },
  e10q25(ctx) { olVraag(ctx, 'Je doet heel veel vetzuren in water. Wat gebeurt er?', ['Ze lossen op en verdwijnen, net als suiker in thee', 'Ze klonteren samen tot holle bolletjes', 'Ze drijven als een laagje olie op het water']);
    roundRect(ctx, 1520, 280, 300, 380, 20); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.2); ctx.fillRect(1524, 380, 292, 276);
    for (let i = 0; i < 16; i++) olVetzuur(ctx, 1560 + hash(i * 2) * 220, 410 + hash(i * 5) * 220, hash(i) * 6.28, 1.2); },
  e10s26(ctx) { olMicro(ctx); olTag(ctx, 'EEN OMHULSEL'); olBewijs(ctx, 'gemeten'); olBlaasje(ctx, 640, 500, 280);
    zoomCircle(ctx, 1440, 440, 270, 880, 420, null, 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 180, 580, 580);
      for (let i = 0; i < 7; i++) { const yy = 230 + i * 74; olVetzuur(ctx, 1270, yy, 0, 2.2); olVetzuur(ctx, 1610, yy, Math.PI, 2.2); } });
    naamBij(ctx, 'buiten', 'water', 1250, 780, 1, 'center'); naamBij(ctx, 'binnen', 'water', 1630, 780, 1, 'center');
    naamBij(ctx, 'dubbele laag', 'staarten bij elkaar · bij de juiste zuurgraad', 640, 140, 1, 'center'); evoSchaal(ctx, 'model · sterk vergroot'); },
  e10s27(ctx) { olMicro(ctx); olTag(ctx, 'EEN OMHULSEL'); olBewijs(ctx, 'gemeten');
    olBlaasje(ctx, 560, 500, 260, { gat: [0.02, 0.06], inhoud: () => olRnaStreng(ctx, olSlap(560, 520, 220, 0.2, 2, 0.8), 'AUGGCUAAGUU', { w: 5 }) });
    olNucleotide(ctx, 920, 380, 'A', 0.6); olNucleotide(ctx, 960, 600, 'G', 0.6); pijl(ctx, 900, 460, 830, 500, C.goud, 1, 3, 14);
    olBlaasje(ctx, 1460, 500, 220, { deling: 0.75, inhoud: () => { olRnaStreng(ctx, olSlap(1290, 500, 120, 0.4, 2, 0.6), 'AUGGCU', { w: 4 }); olRnaStreng(ctx, olSlap(1640, 500, 120, -0.3, 5, 0.6), 'GCUAAG', { w: 4 }); } });
    naamBij(ctx, 'losse letters: erin', null, 960, 290, 1, 'center', C.goud); naamBij(ctx, 'splitst met inhoud', 'bij lichte stroming', 1460, 180, 1, 'center'); evoSchaal(ctx, 'model · sterk vergroot'); },
  e10s28(ctx) { olMicro(ctx); olTag(ctx, 'EEN OMHULSEL'); olBewijs(ctx, 'model');
    olBlaasje(ctx, 960, 350, 190, { inhoud: () => { olRibozym(ctx, 930, 320, 0.34, { fold: 1 }); olRnaStreng(ctx, olSlap(1000, 410, 110, 0.3, 1, 0.45), 'AUGGCU', { w: 4 }); olRnaStreng(ctx, olSlap(880, 420, 90, -0.4, 3, 0.45), 'GCUAAG', { w: 4 }); } });
    naamBij(ctx, 'protocel', 'blaasje met een kopieerder', 1220, 300, 1, 'left', C.goud); olVakjes(ctx, 200, 590, [1, 'h', 1], { h: 270 }); },
  // ---------------- H4 Eén voorouder ----------------
  e10s29(ctx) { olSchema(ctx); olTag(ctx, 'EÉN VOOROUDER');
    olCelIcoon(ctx, 'bacterie', 320, 480, 2); olPaddenstoel(ctx, 760, 600, 280); olEik(ctx, 1200, 620, 360); persoon(ctx, 'noor', 1620, 640, 360, { uit: 'blij' });
    ['een bacterie', 'een paddenstoel', 'een eik', 'jij'].forEach((t, i) => naamBij(ctx, t, null, [320, 760, 1200, 1620][i], 740, 1, 'center')); evoSchaal(ctx, 'niet op schaal'); },
  e10s30(ctx) { olSchema(ctx); olTag(ctx, 'EÉN VOOROUDER'); olBewijs(ctx, 'gemeten');
    olCelIcoon(ctx, 'bacterie', 320, 300, 1.4); olPaddenstoel(ctx, 760, 380, 180); olEik(ctx, 1200, 400, 230); persoon(ctx, 'noor', 1620, 420, 240);
    [320, 760, 1200, 1620].forEach(x => olCodon(ctx, x - 160, 600, 0.62)); naamBij(ctx, 'codon G-C-U (in het RNA) → alanine', 'bijna overal dezelfde code', 960, 820, 1, 'center'); },
  e10q31(ctx) { olVraag(ctx, 'Waarom gebruiken een bacterie, een eik en jij dezelfde code?', ['Ze stammen af van één gemeenschappelijke voorouder', 'Het is de enige code die scheikundig kan werken', 'De code ontstond bij elke groep apart, toevallig gelijk']); olCodon(ctx, 1480, 380, 0.8); },
  e10s32(ctx) { olSchema(ctx); olTag(ctx, 'EÉN VOOROUDER');
    mitochondrion(ctx, 360, 320, 300, -0.15, 1, 6); naamBij(ctx, 'in je mitochondriën', 'U-G-A betekent hier tryptofaan, niet stop', 360, 180, 1, 'center');
    const top = [[960, 300, 'bacterie'], [1240, 300, 'archaeon'], [1520, 300, 'eukaryoot']]; top.forEach(([x, y, s]) => olCelIcoon(ctx, s, x, y, 1.1));
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1240, 360); ctx.lineTo(1380, 560); ctx.lineTo(1520, 360); ctx.moveTo(1380, 560); ctx.lineTo(1240, 720); ctx.lineTo(960, 360); ctx.stroke();
    circ(ctx, 1240, 720, 18, C.goud, _mvL(C.goud, 0.3), 2); naamBij(ctx, 'LUCA', 'laatste gemeenschappelijke voorouder', 1240, 800, 1, 'center', C.goud); },
  e10s33(ctx) { olSchema(ctx); olTag(ctx, 'EÉN VOOROUDER'); olBewijs(ctx, 'hypothese');
    const L = [[560, 260, 'bacteriën', 'bacterie'], [960, 260, 'archaea', 'archaeon'], [1360, 260, 'cellen met een kern', 'eukaryoot']];
    L.forEach(([x, y, n, s]) => { olCelIcoon(ctx, s, x, y, 1); naamBij(ctx, n, null, x, y - 90, 1, 'center'); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, 330); ctx.lineTo(760, 600); ctx.moveTo(960, 330); ctx.lineTo(1160, 470); ctx.lineTo(1360, 330); ctx.moveTo(1160, 470); ctx.lineTo(760, 600); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(760, 600); ctx.lineTo(760, 660); ctx.stroke();
    circ(ctx, 760, 600, 18, C.goud, _mvL(C.goud, 0.3), 2); naamBij(ctx, 'LUCA', null, 820, 620, 1, 'left', C.goud);
    ctx.setLineDash([8, 10]); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(760, 660); ctx.lineTo(760, 840); ctx.moveTo(760, 700); ctx.lineTo(560, 740); ctx.moveTo(760, 760); ctx.lineTo(1000, 800); ctx.stroke(); ctx.setLineDash([]);
    circ(ctx, 560, 740, 8, null, rgba(C.line, 0.6), 2); circ(ctx, 1000, 800, 8, null, rgba(C.line, 0.6), 2); naamBij(ctx, 'andere vroege cellen', 'geen nakomelingen meer', 1040, 770, 1, 'left', C.text2);
    naamBij(ctx, 'niet de eerste cel', 'wel de laatste waarin alle takken samenkomen', 1220, 640, 1, 'left'); },
  e10s34(ctx) { olMicro(ctx); olTag(ctx, 'EÉN VOOROUDER'); olBewijs(ctx, 'model'); olLuca(ctx, 860, 500, 470, 300);
    olMolecuul(ctx, 'h2', 1460, 340, 2.4); olMolecuul(ctx, 'co2', 1500, 470, 2.2); pijl(ctx, 1420, 400, 1340, 440, C.line, 1, 3, 14);
    naamBij(ctx, 'LUCA', 'model · ± 4,2 miljard jaar geleden (schatting)', 860, 140, 1, 'center', C.goud); naamBij(ctx, 'DNA', 'geen kern', 860, 850, 1, 'center');
    naamBij(ctx, 'waterstof en koolstofdioxide', 'geen zuurstof', 1560, 600, 1, 'center'); evoSchaal(ctx, 'model · vorm onbekend'); },
  e10s35(ctx) { macroNacht(ctx, { horizon: 560, heuvel: false }); olTag(ctx, 'EÉN VOOROUDER'); olBewijs(ctx, 'gemeten');
    ctx.fillStyle = rgba('#2E6FBF', 0.45); ctx.fillRect(0, 560, W, 200); ctx.fillStyle = OL.zand; ctx.fillRect(0, 760, W, H - 760);
    [[260, 760, 220, 150], [560, 760, 300, 210], [880, 760, 180, 120]].forEach(([x, y, w, h]) => olStromatoliet(ctx, x, y, w, h));
    olStromatoliet(ctx, 1420, 860, 420, 300, { doorsnede: true }); naamBij(ctx, 'stromatolieten', 'West-Australië · ± 3,5 miljard jaar oud', 160, 230, 1, 'left');
    naamBij(ctx, 'doorgezaagd: laagjes', 'opgebouwd door matten van microben', 1420, 500, 1, 'center'); },
  e10s36(ctx) { olDiepzee(ctx, { x0: 0, w: 960 }); olPoelLand(ctx, { x0: 960, w: 960 }); ctx.fillStyle = C.line; ctx.fillRect(958, 0, 4, H); olTag(ctx, 'EÉN VOOROUDER');
    olBewijs(ctx, 'hypothese', 900, 130); olBewijs(ctx, 'hypothese', W - 80, 130);
    naamBij(ctx, 'hete bron op de oceaanbodem', 'energie uit waterstof', 480, 900 - 60, 1, 'center'); naamBij(ctx, 'ondiepe poel op land', 'Darwin, 1871: een warm poeltje', 1440, 900 - 60, 1, 'center'); },
  e10s37(ctx) { olSchema(ctx); olTag(ctx, 'EÉN VOOROUDER');
    olTijdAs(ctx, 160, 560, 1600, 4.6, 3.4, [{ g: 4.54, tekst: 'aarde', hoog: 0 }, { g: 4.4, tekst: 'vloeibaar water', hoog: 90 },
      { van: 4.33, tot: 4.09, tekst: 'LUCA', meta: 'schatting', kleur: C.goud, hoog: 0 }, { g: 3.48, tekst: 'stromatolieten', meta: 'oudste harde spoor', hoog: 0 }]);
    haak(ctx, 160 + (4.6 - 4.54) / 1.2 * 1600, 160 + (4.6 - 4.21) / 1.2 * 1600, 680, 'een paar honderd miljoen jaar', C.groen); },
  // ---------------- Samenvatting ----------------
  e10s38(ctx) { olSchema(ctx); olTag(ctx, 'SAMENVATTING'); olVakjes(ctx, 200, 300, [1, 'h', 1]);
    text(ctx, 'Hoe de stappen in elkaar grepen, en waar: nog onbekend', 960, 760, fTekst(44, 600), C.text2, 'center'); },
  e10s39(ctx) { olEindKaart(ctx, ['Bouwstenen kunnen vanzelf ontstaan (Miller, meteorieten).', 'RNA draagt informatie én doet werk: de RNA-wereld (hypothese).', 'Vetzuren vormen vanzelf een omhulsel: de protocel (model).', 'Alles wat leeft, deelt één code: één voorouder, LUCA.', 'Verder in: Van eerste cel tot nu']);
    ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(1820, 860); ctx.lineTo(1560, 860); ctx.stroke(); ctx.setLineDash([]); circ(ctx, 1540, 860, 12, C.goud); metaText(ctx, 'LUCA', 1540, 830, C.goud, 'center', 26); },
};
