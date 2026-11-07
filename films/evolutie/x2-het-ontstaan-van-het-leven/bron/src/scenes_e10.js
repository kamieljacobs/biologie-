// Film 10 · Het ontstaan van het leven — geanimeerde scènes (keyframes uit sb10.js als eindbeeld, opgebouwd in de maat van de stem).
// Vraag-alinea's tonen de situatie, nooit de vraagkaart; antwoord-alinea's tonen de inhoud zonder 'antwoord a'.
const E10_FAM = { henk: [230, 400], ria: [400, 380], linda: [760, 400], rachid: [930, 420], noor: [1560, 410] };
const E10_MIL = [1000, 660, 0.8];            // Millers opstelling in s07/s08 (iets hoger en kleiner dan het keyframe zodat niets onder 880 valt)
const E10_MIL2 = [560, 700, 0.62];           // in s10
function e10Familie(ctx, t, q) { // eindbeeld van s01 (start van de zoom in s02)
  const F = E10_FAM; persoon(ctx, 'henk', F.henk[0], 800, F.henk[1], { uit: 'blij' }); persoon(ctx, 'ria', F.ria[0], 800, F.ria[1], { uit: 'blij' });
  persoon(ctx, 'linda', F.linda[0], 800, F.linda[1], { uit: 'blij' }); persoon(ctx, 'rachid', F.rachid[0], 800, F.rachid[1], { uit: 'blij' }); persoon(ctx, 'noor', F.noor[0], 800, F.noor[1], { uit: 'blij', kijk: -1 });
  ctx.save(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(470, 470); ctx.quadraticCurveTo(580, 330, 690, 470); ctx.moveTo(1000, 470); ctx.quadraticCurveTo(1150, 300, 1250, 330); ctx.lineTo(1450, 380); ctx.stroke(); ctx.restore();
  olZygote(ctx, 580, 400, 30); olZygote(ctx, 1250, 330, 40); }
function e10MillerGas(ctx, X, Y, s, al, t) { // gassen in de grote kolf, zelfde plekken als olMiller; al = {ch4, nh3, h2, h2o}
  const so = ['ch4', 'nh3', 'h2', 'ch4', 'h2o', 'nh3', 'ch4', 'h2', 'nh3', 'h2o', 'ch4', 'nh3'];
  so.forEach((sd, i) => { const a = al[sd] || 0; if (a <= 0.01) return; const an = i * 2.39 + 0.4, rr = Math.sqrt((i + 0.5) / so.length) * 128, wd = wander(i + 40, t, 10, 0.5);
    olMolecuul(ctx, sd, X + (300 + Math.cos(an) * rr + wd.x) * s, Y + (-330 + Math.sin(an) * rr * 0.9 + wd.y) * s, 1.05 * s * (0.6 + 0.4 * ease(a)), { rot: i + t * 0.3, a }); }); }
function e10Damp(ctx, X, Y, s, a, t) { if (a <= 0.01) return; const P = [[-325, -46], [-325, -470], [-290, -515], [-250, -520], [150, -520], [175, -455]]; const L = [0]; let acc = 0; for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(acc); }
  for (let k = 0; k < 9; k++) { const d = ((t * 120 + k * acc / 9) % acc); let j = 0; while (j < L.length - 2 && L[j + 1] < d) j++; const u = (d - L[j]) / (L[j + 1] - L[j]); circ(ctx, X + lerp(P[j][0], P[j + 1][0], u) * s, Y + lerp(P[j][1], P[j + 1][1], u) * s, 5 * s, rgba('#BFE0EF', 0.7 * a)); } }
function e10Klok(ctx, x, y, r, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.fill, 0.7), C.line, 2); const an = -Math.PI / 2 + frac * 6.283;
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); ctx.restore(); }
function e10Lus(ctx, t, aDNA, aE, groeiE, foldE, aB, aK, loop) { // het kringetje DNA ⇄ eiwit (s14, s15)
  ctx.save(); ctx.beginPath(); ctx.arc(560, 520, 300, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.25); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
  const w = Math.sin(t * 0.8) * 10; dnaDraad(ctx, [[340, 520], [430, 440 + w], [540, 560 - w], [650, 450 + w], [760, 540]], { w: 22, helix: true });
  e10Gloed(ctx, 560, 500, 260, aDNA, C.kernR);
  e10Eiwit(ctx, 1380, 520, 1.1, groeiE, foldE, aE, t);
  e10Boog(ctx, 800, 430, 1000, 300, 1180, 420, aB); e10Boog(ctx, 1180, 640, 1000, 760, 800, 630, aK);
  if (loop > 0.01) for (let k = 0; k < 2; k++) { const u = ((t * 0.32) + k * 0.5) % 1; const p = u < 0.5 ? e10Quad(800, 430, 1000, 300, 1180, 420, u * 2) : e10Quad(1180, 640, 1000, 760, 800, 630, (u - 0.5) * 2); e10Gloed(ctx, p[0], p[1], 40, loop); circ(ctx, p[0], p[1], 9, rgba(C.goud, loop)); } }
function e10Codons(ctx, aC, puls = -1) { [320, 760, 1200, 1620].forEach((x, i) => { const a = aC[i]; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = (1 - ease(a)) * 30;
    if (puls === i) e10Gloed(ctx, x + 20, 620, 150, 0.8); olCodon(ctx, x - 160, 600 + dy, 0.62); ctx.restore(); }); }
function e10Rij(ctx, u, a = [1, 1, 1, 1]) { // vier levensvormen; u = 0 rij van s33 (groot), 1 rij van s34 (klein, hoger)
  const L = (p, k) => lerp(p, k, u);
  olCelIcoon(ctx, 'bacterie', 320, L(480, 300), L(2, 1.4), a[0]); olPaddenstoel(ctx, 760, L(600, 380), L(280, 180), a[1]); olEik(ctx, 1200, L(620, 400), L(360, 230), a[2]); if (a[3] > 0.01) persoon(ctx, 'noor', 1620, L(640, 420), L(360, 240), { uit: 'blij', a: a[3] }); }
function e10Vetzuren(ctx, t, cx, cy, R, u0, dur) { // losse vetzuren die zich tot een blaasje ordenen; u0 = starttijd
  const s = R / 150, P = e10BilaagPlekken(cx, cy, R, s);
  P.forEach((p, i) => { const st = u0 + hash(i * 1.7) * dur * 0.6, u = ease((t - st) / (dur * 0.4));
    const x0 = cx + (hash(i * 3.1) - 0.5) * 1100, y0 = cy + (hash(i * 5.7) - 0.5) * 640, a0 = hash(i * 9.3) * 6.283, wd = wander(i, t, 26, 0.35);
    olVetzuur(ctx, lerp(x0 + wd.x, p[0], u), lerp(y0 + wd.y, p[1], u), e10Hoek(a0 + t * 0.3 * (hash(i) - 0.5), p[2], u), s); }); }

Object.assign(SCENES, {
  // ---------------- titel: rechts één blaasje met een RNA-streng; losse letters glippen erin
  title(ctx, t) { olBlaasje(ctx, 1480, 640, 230, { inhoud: () => { olRnaStreng(ctx, olSlap(1480, 640, 240, 0.3 + Math.sin(t * 0.4) * 0.1, 3 + Math.sin(t * 0.6) * 0.5, 0.9), 'AUGGCUAAGUUCGA', { w: 6 });
      for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k / 3) % 1); if (u > 0.55) olNucleotide(ctx, lerp(1600, 1520, (u - 0.55) / 0.45), lerp(500 + k * 60, 560 + k * 40, (u - 0.55) / 0.45), 'AUG'[k], 0.4, { rot: u * 3 }); } } });
    for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k / 3) % 1); if (u <= 0.55) olNucleotide(ctx, lerp(1860, 1600, u / 0.55), lerp(380 + k * 90, 500 + k * 60, u / 0.55), 'AUG'[k], 0.4, { rot: u * 3, a: Math.min(1, u * 8) }); } },

  // ================= Opening =================
  s01(ctx, t, q) { olSchema(ctx); const F = E10_FAM;
    persoon(ctx, 'noor', F.noor[0], 800, F.noor[1], { uit: 'blij', kijk: -1 }); naamBij(ctx, 'Noor', null, 1560, 350, ramp(t, 0.1, 0.4), 'center');
    const l1 = ease((t - 1.9) / 0.6); if (l1 > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(1450, 380); ctx.lineTo(lerp(1450, 1250, l1), lerp(380, 330, l1)); ctx.stroke(); ctx.restore(); }
    const az = q.on('bevruchte', 1, 0.6); e10Gloed(ctx, 1250, 330, 90, az * (1 - ramp(t, 3.6, 1))); if (az > 0.01) A(ctx, az, () => olZygote(ctx, 1250, 330, 40 * (0.6 + 0.4 * az)));
    e10Naam(ctx, 'bevruchte eicel', 'jij, als één cel', 1250, 230, az, q.on('eicel', 1, 0.5), 'center', C.goud);
    e10Boog(ctx, 1250, 330, 1150, 300, 1000, 470, ease((t - q.at('uit') + 0.2) / 0.7), rgba(C.goud, 0.8), 3, false, [8, 8]);
    const ao = q.on('ouders', 1, 0.3); persoon(ctx, 'linda', F.linda[0], 800, F.linda[1], { uit: 'blij', a: ao }); persoon(ctx, 'rachid', F.rachid[0], 800, F.rachid[1], { uit: 'blij', a: ao });
    e10Naam(ctx, 'Linda en Rachid', 'haar ouders', 845, 330, ao, q.on('ouders', 1, 0.8), 'center');
    e10Boog(ctx, 690, 470, 580, 330, 470, 470, ease((t - q.at('kwamen')) / 0.9), rgba(C.goud, 0.8), 3, false, [8, 8]);
    const az2 = ramp(t, q.at('kwamen') + 0.3, 0.6); e10Gloed(ctx, 580, 400, 70, az2 * (1 - ramp(t, 7.2, 1))); if (az2 > 0.01) A(ctx, az2, () => olZygote(ctx, 580, 400, 30));
    const ag = q.on('hún', 1, 0.3); persoon(ctx, 'henk', F.henk[0], 800, F.henk[1], { uit: 'blij', a: ag }); persoon(ctx, 'ria', F.ria[0], 800, F.ria[1], { uit: 'blij', a: ag });
    naamBij(ctx, 'Opa Henk en Oma Ria', null, 315, 350, ag, 'center');
    A(ctx, q.on('bevruchte', 1, 0.6), () => evoSchaal(ctx, 'eicel vergroot · niet op schaal')); },
  s02(ctx, t, q) { olSchema(ctx); const z = ease(t / 1.8), sc = lerp(1, 0.46, z), ax = 1060 * z, ay = 250 * z;
    ctx.save(); ctx.translate(ax, ay); ctx.scale(sc, sc); e10Familie(ctx, t, q); ctx.restore();
    const y = 470, x0 = ax + 200 * sc, xe = 140, head = lerp(x0, xe, ease((t - 0.6) / 5.2));
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(head, y); ctx.stroke();
    for (let px = x0 - 46; px > head; px -= 46) circ(ctx, px, y, 6, rgba(C.goud, 0.9));
    circ(ctx, head, y, 9, C.goud); e10Gloed(ctx, head, y, 40, ramp(t, 0.6, 0.4));
    const aE = ease((680 - head) / 60), aB = ease((400 - head) / 60);
    A(ctx, aE, () => olCelIcoon(ctx, 'eukaryoot', 520, y - 120, 1.3)); A(ctx, aB, () => olCelIcoon(ctx, 'bacterie', 250, y - 110, 1.3));
    naamBij(ctx, 'eencelligen', null, 390, 300, aB, 'center'); naamBij(ctx, 'elke cel komt uit een cel', null, 960, 300, ramp(t, 0.3, 0.6), 'center');
    A(ctx, q.on('miljarden', 1, 0.8), () => { olTijdAs(ctx, 140, 760, 1640, 4, 0, []); circ(ctx, clamp(head, 140, 1780), 760, 10, C.goud); }); },
  s03(ctx, t, q) { olJongeAarde(ctx); const f1 = e10Flits(t, 3.6, 2.4), f2 = e10Flits(t, 4.4, 0.3);
    olBliksem(ctx, 860, 150, 380, 3, 0.15 + 0.85 * f1); olBliksem(ctx, 1720, 160, 300, 5, 0.1 + 0.6 * f2);
    const u = ease(t / 1.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W, 820); ctx.lineTo(lerp(W, 1500, u), 820); ctx.stroke();
    const d = ease((t - 1.6) / 1); if (d > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.moveTo(1500, 820); ctx.lineTo(lerp(1500, 1300, d), 820); ctx.stroke(); ctx.restore(); }
    const ab = q.on('begint', 1, 0.5); if (ab > 0.01) { e10Gloed(ctx, 1300, 820, 60, ab * (0.6 + 0.4 * Math.sin(t * 3))); circ(ctx, 1300, 820, 10, rgba(C.goud, ab)); }
    const aV = q.on('Hoe', 1, 0.7); if (aV > 0.01) A(ctx, aV, () => { roundRect(ctx, 90, 220, 1060, 200, 18); ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fill(); text(ctx, 'Hoe word je van losse moleculen', 130, 300, fTitel(64), C.text, 'left'); text(ctx, 'een cel die zichzelf kopieert?', 130, 380, fTitel(64), C.text, 'left'); });
    A(ctx, ramp(t, 0.4, 0.6), () => evoSchaal(ctx, 'jonge aarde · ongeveer 4 miljard jaar geleden')); },
  s05(ctx, t, q) { olSchema(ctx); const uit = 1 - q.on('Elke', 1, 0.7);
    if (uit > 0.01) A(ctx, uit, () => { celRond(ctx, 760, 500, 190, { t }); vraagteken(ctx, 760, 560, 1, 150);
      const ak = q.on('proeven', 1, 0.6); if (ak > 0.01) A(ctx, ak, () => { olMiller(ctx, 1290, 700, 0.42, { kleur: 0.4, labels: false, t }); naamBij(ctx, 'proeven', null, 1360, 380, 1, 'center'); }); });
    const al = [q.on('bouwstenen', 1, 0.6), q.on('informatie', 1, 0.6), q.on('omhulsel', 1, 0.6)]; e10Vakjes(ctx, 200, 330, [0, 0, 0], al);
    naamBij(ctx, 'wat elke cel heeft', null, 200, 270, q.on('drie', 1, 0.6), 'left');
    A(ctx, q.on('Kunnen', 1, 0.6), () => text(ctx, 'Kan dit zonder leven ontstaan?', 960, 780, fTekst(48, 600), C.goud, 'center')); },

  // ================= H1 Bouwstenen =================
  s06(ctx, t, q) { olJongeAarde(ctx); olBewijs(ctx, 'gemeten');
    const aw = q.on('water', 1, 1.2); [['h2o', 1260, 300, 0], ['h2o', 1700, 260, 1]].forEach(([m, x, y, i]) => { const wd = wander(i, t, 10, 0.4); olMolecuul(ctx, m, x + wd.x, lerp(640, y, aw) + wd.y, 2.2, { a: aw, rot: t * 0.2 + i }); });
    const ag = q.on('Zuurstof', 1, 0.8); [['co2', 1420, 270, 2], ['n2', 1580, 320, 3], ['co2', 1180, 380, 4], ['n2', 1380, 420, 5]].forEach(([m, x, y, i]) => { const wd = wander(i, t, 10, 0.4); olMolecuul(ctx, m, x + wd.x, y + wd.y, 2.2, { a: ag, rot: t * 0.15 + i }); });
    const ao = q.on('niet', 1, 0.5); if (ao > 0.01) A(ctx, ao, () => { ctx.save(); ctx.translate(1560, 470); circ(ctx, 0, 0, 30, null, C.koraal, 4); ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.moveTo(-21, 21); ctx.lineTo(21, -21); ctx.stroke(); ctx.restore(); });
    naamBij(ctx, 'geen zuurstof', 'O₂ bijna nul', 1610, 480, ao, 'left');
    const fb = e10Flits(t - q.at('bliksem'), 2.6); olBliksem(ctx, 860, 150, 380, 3, t < q.at('bliksem') ? 0.15 : 0.15 + 0.85 * fb);
    const av = q.on('vulkanen', 1, 0.4) * (1 - ramp(t, q.at('vulkanen') + 1.2, 0.8)); e10Gloed(ctx, 420, 300, 140, av, C.koraal);
    const au = q.on('uv', 1, 0.8); if (au > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.paars, 0.8 * au); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const x = 1150 + k * 170 - u * 160, y = 40 + u * 200; const nx = x + Math.sin(u * 30 - t * 8) * 8; i ? ctx.lineTo(nx, y) : ctx.moveTo(nx, y); } ctx.stroke(); } ctx.restore(); }
    e10Naam(ctx, 'energie', 'bliksem · vulkanen · uv', 120, 230, q.on('energie', 1, 0.6), q.on('bliksem', 1, 0.6), 'left');
    A(ctx, aw, () => evoSchaal(ctx, 'moleculen sterk vergroot')); },
  s07(ctx, t, q) { olSchema(ctx); const [X, Y, s] = E10_MIL;
    const wipe = lerp(0.25, 1, ease(t / 4.2)); const tv = q.at('vonken'), kl = ramp(t, tv + 0.4, 1.2);
    const vonk = q.on('vonken', 1, 0.3) * (0.55 + 0.45 * (Math.sin(t * 9) > 0.2 ? 1 : 0.4));
    if (wipe > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(400, 0, 1400 * wipe, H); ctx.clip(); olMiller(ctx, X, Y, s, { kleur: 0.2 * kl, gas: false, vonk, labels: false, t }); ctx.restore(); }
    e10Damp(ctx, X, Y, s, q.on('Verwarmd', 1, 0.8), t); e10Gloed(ctx, X - 300 * s, Y + 60 * s, 110, q.on('Verwarmd', 1, 0.5) * (1 - ramp(t, q.at('oceaan') + 0.8, 0.8)), C.koraal);
    e10MillerGas(ctx, X, Y, s, { h2o: q.on('Verwarmd', 1, 0.8), ch4: q.on('methaan', 1, 0.5), nh3: q.on('ammoniak', 1, 0.5), h2: q.on('waterstof', 1, 0.5) }, t);
    naamBij(ctx, 'water', 'de oceaan, verwarmd', X - 300 * s, Y + 170, q.on('Verwarmd', 1, 0.6), 'right');
    naamBij(ctx, 'gassen', 'de oerlucht', X + 500 * s, Y - 560 * s, q.on('Daarboven', 1, 0.6), 'left'); naamBij(ctx, 'vonken', 'de bliksem', X + 490 * s, Y - 290 * s, q.on('vonken', 1, 0.6), 'left');
    persoon(ctx, 'miller', 260, 880, 450, { pose: t > q.at('glas') ? 'wijs' : 'staan', kijk: 1, uit: 'neutraal' });
    naamBij(ctx, 'Stanley Miller', '1953 · Chicago', 260, 370, q.on('Stanley', 1, 0.6), 'center');
    const ak = q.on('week', 1, 0.5); e10Klok(ctx, 1640, 820, 22, ease((t - tv) / 1.6) * 7, ak); A(ctx, ak, () => metaText(ctx, '7 dagen', 1676, 830, C.text2, 'left', 28)); },
  s08(ctx, t, q) { olSchema(ctx); const [X, Y, s] = E10_MIL; const vonk = 0.55 + 0.45 * (Math.sin(t * 9) > 0.2 ? 1 : 0.4);
    olMiller(ctx, X, Y, s, { kleur: 0.2, gas: false, vonk, labels: false, t }); e10Damp(ctx, X, Y, s, 1, t); e10MillerGas(ctx, X, Y, s, { h2o: 1, ch4: 1, nh3: 1, h2: 1 }, t);
    persoon(ctx, 'miller', 260, 880, 450, { kijk: 1, uit: 'neutraal' }); e10Klok(ctx, 1640, 820, 22, 7 + t * 0.8, 1); metaText(ctx, '7 dagen', 1676, 830, C.text2, 'left', 28);
    vraagteken(ctx, X - 300 * s - 150, Y + 30 * s, q.on('kolf', 1, 0.5), 110); },
  s10(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'gemeten'); const [X, Y, s] = E10_MIL2; const kl = lerp(0.2, 1, ease((t - 0.3) / 1.6));
    const r = olMiller(ctx, X, Y, s, { kleur: kl, labels: false, vonk: 0.5 + 0.3 * Math.sin(t * 9), t });
    const az = q.on('aminozuren', 1, 0.9); if (az > 0.01) A(ctx, az, () => zoomCircle(ctx, 1320, 470, 330 * (0.6 + 0.4 * az), r.val[0], r.val[1], 'in de rode vloeistof · sterk vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(980, 130, 680, 680);
      for (let i = 0; i < 16; i++) { const wd = wander(i, t, 16, 0.4); olMolecuul(ctx, 'h2o', 1060 + hash(i * 3.1) * 520 + wd.x, 200 + hash(i * 5.3) * 540 + wd.y, 1.4, { rot: i + t * 0.3 }); }
      const n = 3 * q.on('veertien', 1, 1) + 3 * q.on('tweeëntwintig', 1, 1);
      [[1120, 640, 'alanine'], [1520, 300, 'glycine'], [1250, 220, 'alanine'], [1560, 680, 'glycine'], [1090, 420, 'glycine'], [1420, 760, 'alanine']].forEach(([x, y, so], i) => { const a = clamp(n - i, 0, 1); const wd = wander(i + 20, t, 12, 0.3); olAminozuur(ctx, x + wd.x, y + wd.y, 1.1, { soort: so, a, rot: 0.4 * Math.sin(t * 0.3 + i) }); });
      const wg = wander(90, t, 8, 0.3), wa = wander(91, t, 8, 0.3);
      olAminozuur(ctx, 1200 + wg.x, 400 + wg.y, 1.5, { soort: 'glycine', rand: q.on('glycine', 1, 0.4) > 0.5 ? C.goud : null }); olAminozuur(ctx, 1460 + wa.x, 560 + wa.y, 1.5, { soort: 'alanine', rand: q.on('alanine', 1, 0.4) > 0.5 ? C.goud : null }); }));
    naamBij(ctx, 'glycine', null, 1200, 310, q.on('glycine', 1, 0.5) * az, 'center', C.goud); naamBij(ctx, 'alanine', null, 1590, 470, q.on('alanine', 1, 0.5) * az, 'center', C.goud);
    naamBij(ctx, 'soorten aminozuren', null, 120, 190, q.on('vond', 1, 0.6), 'left');
    const n14 = Math.round(lerp(5, 14, ease((t - q.at('veertien') + 0.3) / 0.8))), n22 = Math.round(lerp(14, 22, ease((t - q.at('tweeëntwintig') + 0.3) / 0.8)));
    A(ctx, q.on('vond', 1, 0.6), () => metaText(ctx, 'proef 1953 · gevonden: 5', 120, 240, C.text2, 'left', 28));
    A(ctx, q.on('2008', 1, 0.6), () => metaText(ctx, `heranalyse 2008 · ${n14}`, 120, 285, C.goud, 'left', 28));
    A(ctx, q.on('stoom', 1, 0.6), () => metaText(ctx, `stoomproef · ${n22}`, 120, 330, C.goud, 'left', 28)); },
  s11(ctx, t, q) { olSchema(ctx); A(ctx, q.on('Waarschijnlijk', 1, 0.6), () => olBewijs(ctx, 'onzeker'));
    const kol = (x, gassen, titel, meta, balk, dimA, aIn) => { if (aIn <= 0.01) return; ctx.save(); ctx.globalAlpha *= dimA * Math.min(1, aIn * 2); circ(ctx, x, 460, 190, rgba(C.fill, 0.5), '#AFC0D0', 4);
      gassen.forEach(([g, a], i) => { if (a <= 0.01) return; const an = i * 2.4, rr = Math.sqrt((i + 0.5) / gassen.length) * 140, wd = wander(i + x, t, 8, 0.5); olMolecuul(ctx, g, lerp(x + 420, x + Math.cos(an) * rr, ease(a)) + wd.x, 460 + Math.sin(an) * rr + wd.y, 1.6, { rot: i + t * 0.3, a: Math.min(1, a * 2) }); });
      naamBij(ctx, titel, meta, x, 230, 1, 'center');
      const ab = q.on('minder', 1, 0.6); if (ab > 0.01) { ctx.save(); ctx.globalAlpha *= ab; roundRect(ctx, x - 160, 760, 320, 40, 20); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); roundRect(ctx, x - 160, 760, Math.max(40, 320 * balk * ease((t - q.at('minder')) / 1)), 40, 20); shape(ctx, OL.aa, OL.aaR, 1.5); metaText(ctx, 'aminozuren', x, 840, C.text2, 'center', 26); ctx.restore(); }
      ctx.restore(); };
    kol(560, ['ch4', 'nh3', 'h2', 'ch4', 'nh3', 'h2', 'h2o', 'ch4', 'nh3'].map(g => [g, 1]), 'Millers lucht', 'methaan · ammoniak · waterstof', 0.9, 1 - 0.5 * q.on('Waarschijnlijk', 1, 0.8), 1);
    const ac = q.on('koolstofdioxide', 1, 0.8), an = q.on('stikstof', 1, 0.8);
    kol(1360, ['co2', 'n2', 'co2', 'n2', 'h2o', 'co2', 'n2', 'co2', 'n2'].map(g => [g, g === 'n2' ? an : ac]), 'jonge lucht volgens geologen nu', 'vooral koolstofdioxide · stikstof', 0.35, 1, q.on('geologen', 1, 0.6));
    pijl(ctx, 820, 460, 1100, 460, C.line, q.on('geologen', 1, 0.6), 4, 18);
    e10Gloed(ctx, 1256, 780, 90, q.on('steeds', 1, 0.4) * (1 - ramp(t, q.at('steeds') + 1, 0.6)), C.oker); },
  s12(ctx, t, q) { olJongeAarde(ctx); olBliksem(ctx, 860, 150, 380, 3, 0.12); olBewijs(ctx, 'gemeten');
    const tI = 2.3, u = ease(clamp(t / tI, 0, 1)); if (t < tI + 0.1) olVuurbal(ctx, lerp(1420, 540, u), lerp(-120, 720, u), 2.4, 420 * (0.4 + 0.6 * Math.min(1, t)));
    const fl = ramp(t, tI, 0.1) * (1 - ramp(t, tI + 0.1, 0.9)); e10Gloed(ctx, 530, 740, 260, fl, '#F6F2D8');
    A(ctx, ramp(t, tI, 0.5), () => olMeteorietBrok(ctx, 520, 760, 110));
    naamBij(ctx, 'meteoriet', 'zoals die van Murchison', 520, 620, q.on('Murchison', 1, 0.6), 'center');
    const az = q.on('zitten', 1, 0.9); if (az > 0.01) A(ctx, az, () => zoomCircle(ctx, 1360, 450, 290 * (0.6 + 0.4 * az), 560, 760, null, 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1060, 170, 600, 600);
      [[1220, 360, 'glycine', 1.2], [1460, 330, 'alanine', 1.2], [1260, 600, 'glycine', 1.1]].forEach(([x, y, so, sc], i) => { const wd = wander(i, t, 10, 0.3); olAminozuur(ctx, x + wd.x, y + wd.y, sc, { soort: so, rot: 0.3 * Math.sin(t * 0.4 + i) }); });
      const ba = q.on('basen', 1, 0.8); [[1470, 560, -0.4, 'A'], [1580, 520, 0.3, 'U']].forEach(([x, y, r, b], i) => { const wd = wander(i + 5, t, 10, 0.3); ctx.save(); ctx.translate(x + wd.x, y + wd.y); ctx.rotate(r + Math.sin(t * 0.5 + i) * 0.2); olBase(ctx, 0, 0, b, 0.7, { a: ba }); ctx.restore(); }); }));
    e10Naam(ctx, 'meer dan 70 soorten aminozuren', 'en basen van DNA en RNA · sterk vergroot', 1360, 800, q.on('zeventig', 1, 0.6), q.on('basen', 1, 0.6), 'center'); },
  s13(ctx, t, q) { olSchema(ctx); e10Vakjes(ctx, 200, 250, [1, 0, 0], [1, 0.6, 0.6], [ramp(t, 0.4, 0.9), 0, 0]);
    const az = q.on('zak', 1, 0.5); if (az > 0.01) A(ctx, az, () => { const sh = Math.sin(t * 7) * 4 * (1 - ramp(t, q.at('boek'), 0.6));
      vul(ctx, [[760, 860], [700, 700], [760, 640], [960, 620], [1160, 640], [1220, 700], [1160, 860]].map(p => [p[0] + sh * 0.5, p[1]]), '#5A4A38', '#8C7660', 3);
      'AUGCGAUCCAGU'.split('').forEach((b, i) => { ctx.save(); ctx.translate(800 + (i % 6) * 64 + Math.sin(t * 6 + i) * 4, 690 + Math.floor(i / 6) * 70 + Math.cos(t * 5 + i) * 3); ctx.rotate((hash(i * 4) - 0.5) * 2 + Math.sin(t * 3 + i) * 0.15); olBase(ctx, 0, -24, b, 0.38); ctx.restore(); }); });
    naamBij(ctx, 'losse letters: nog geen boek', null, 1260, 760, q.on('geen', 1, 0.6), 'left'); },

  // ================= H2 Informatie en gereedschap =================
  s14(ctx, t, q) { olMicro(ctx);
    const aE = q.on('eiwitten', 1, 0.4), g = ease((t - q.at('eiwitten')) / 1.6);
    e10Lus(ctx, t, q.on('bouwtekening', 1, 0.5) * (1 - ramp(t, q.at('eiwitten'), 0.6)) * 0.8 + q.on('DNA', 3, 0.5) * 0.5, aE, g, ease((t - q.at('eiwitten') - 0.8) / 1.6), q.on('eiwitten', 1, 0.9), q.on('kopiëren', 1, 0.9), ramp(t, q.at('staan'), 0.6));
    e10Naam(ctx, 'DNA', 'bouwtekening', 560, 380, ramp(t, 0, 0.4), q.on('bouwtekening', 1, 0.6), 'center');
    e10Naam(ctx, 'eiwit (enzym)', 'gereedschap', 1380, 330, aE, q.on('kopiëren', 1, 0.6), 'center');
    naamBij(ctx, 'beschrijft', null, 990, 300, q.on('eiwitten', 1, 0.8), 'center', C.goud); naamBij(ctx, 'kopieert', null, 990, 790, q.on('kopiëren', 1, 0.8), 'center', C.goud);
    A(ctx, ramp(t, 0.3, 0.6), () => evoSchaal(ctx, 'schematisch · sterk vergroot')); },
  s15(ctx, t, q) { olMicro(ctx); e10Lus(ctx, t + 9, 0, 1, 1, 1, 1, 1, 1);
    naamBij(ctx, 'DNA', 'bouwtekening', 560, 380, 1, 'center'); naamBij(ctx, 'eiwit (enzym)', 'gereedschap', 1380, 330, 1, 'center');
    naamBij(ctx, 'beschrijft', null, 990, 300, 1, 'center', C.goud); naamBij(ctx, 'kopieert', null, 990, 790, 1, 'center', C.goud);
    vraagteken(ctx, 990, 580, q.on('kringetje', 1, 0.6), 120); evoSchaal(ctx, 'schematisch · sterk vergroot'); },
  s17(ctx, t, q) { olMicro(ctx); const sx = lerp(-120, 0, ease(t / 1.2));
    const P = olSlap(560 + sx, 520, 760, 0, 4 + Math.sin(t * 0.6) * 0.4, 1.4); olRnaStreng(ctx, P, 'AUGGCUAAGUUCGACGAUCCAG', { w: 7 });
    const ai = q.on('informatie', 1, 0.3) * (1 - ramp(t, q.at('informatie') + 2, 0.6)); if (ai > 0.01) { const k = ((t - q.at('informatie')) / 1.6) % 1; const p = P[Math.min(P.length - 1, Math.floor(k * P.length))]; e10Gloed(ctx, p[0], p[1], 70, ai); }
    e10Naam(ctx, 'RNA', 'één losse streng · vier letters: A U G C', 200, 340, ramp(t, 0, 0.5), q.on('losse', 1, 0.6), 'left');
    pijl(ctx, 1000, 520, 1140, 540, C.line, q.on('Maar', 1, 0.6), 4, 18);
    const af = q.on('streng', 1, 0.5); olRibozym(ctx, 1480, 560, 1.0, { fold: 0.75 * ease((t - q.at('streng')) / 2), actief: false, a: af, t });
    naamBij(ctx, 'vouwt terug', 'stukken die passen, paren', 1480, 260, q.on('terugvouwen', 1, 0.6), 'center');
    A(ctx, ramp(t, 0.3, 0.6), () => evoSchaal(ctx, 'model · sterk vergroot')); },
  s18(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'gemeten');
    const sp = ramp(t, q.at('ribosomen') - 0.4, 0.8), Lx = 520;
    olRibozym(ctx, Lx, 500, 1.15, { fold: lerp(0.75, 1, ease(t / 1.2)), t, actief: true });
    const ar = ease((t - q.at('reactie')) / 1.2), ab = ramp(t, q.at('reactie') + 1.2, 0.4); // twee bouwstenen schuiven naar het ribozym en worden aaneengezet
    if (q.on('reactie', 1, 0.3) > 0.01) { const my = 760; olAminozuur(ctx, lerp(Lx - 380, Lx - 52, ar), my, 0.6, { soort: 'glycine', a: q.on('reactie', 1, 0.3) }); olAminozuur(ctx, lerp(Lx + 380, Lx + 52, ar), my, 0.6, { soort: 'alanine', a: q.on('reactie', 1, 0.3) });
      if (ab > 0.01) { e10Gloed(ctx, Lx, my, 70, ab * (1 - ramp(t, q.at('reactie') + 2.2, 0.8))); ctx.strokeStyle = rgba(C.goud, ab); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(Lx - 20, my); ctx.lineTo(Lx + 20, my); ctx.stroke(); }
 }
    e10Naam(ctx, 'ribozym', 'RNA dat werkt als een enzym', Lx, 180, q.on('ribozym', 1, 0.6), q.on('ribozym', 1, 1.2), 'center');
    A(ctx, sp, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(1000, 120); ctx.lineTo(1000, 860); ctx.stroke();
      olRibosoom(ctx, 1460, 640, 1.0, { keten: 2 + Math.floor(clamp((t - q.at('zet')) / 0.45, 0, 6)), kern: q.on('RNA', 2, 0.4) > 0.5 }); });
    naamBij(ctx, 'ribosoom', 'RNA zet de aminozuren aan elkaar', 1460, 230, sp, 'center'); naamBij(ctx, 'RNA zet aaneen', null, 1520, 620, q.on('RNA', 2, 0.6), 'left', C.goud);
    evoSchaal(ctx, 'schematisch · sterk vergroot'); },
  s19(ctx, t, q) { olSchema(ctx); A(ctx, q.on('hypothese', 1, 0.6), () => olBewijs(ctx, 'hypothese')); e10Gloed(ctx, W - 160, 70, 120, q.on('hypothese', 1, 0.3) * (1 - ramp(t, q.at('hypothese') + 0.8, 0.8)));
    olRnaStreng(ctx, olSlap(560, 480, 640, 0, 4 + Math.sin(t * 0.6) * 0.4, 1.2), 'AUGGCUAAGUUCGACGAUC', { w: 7 }); e10Naam(ctx, 'bouwtekening', 'informatie in de volgorde', 560, 320, q.on('bouwtekening', 1, 0.5), q.on('bouwtekening', 1, 1.1), 'center');
    olRibozym(ctx, 1380, 480, 0.95, { fold: 1, t, a: Math.max(0.35, q.on('gereedschap', 1, 0.5)) }); e10Naam(ctx, 'gereedschap', 'versnelt een reactie', 1380, 190, q.on('gereedschap', 1, 0.5), q.on('gereedschap', 1, 1.1), 'center');
    haak(ctx, 220, 1700, 700, 'RNA-wereld: leven met RNA, vóór DNA en eiwitten', C.groen, q.on('wereld', 1, 0.7)); },
  s20(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'gemeten');
    e10RnaLetters(ctx, e10Golf(300, 1500, 640, 5, t * 0.4), 'GCUAAGUUCGAC', { kant: 1 });
    const T = [[300, 'CGA', q.at('stukjes')], [600, 'UUC', q.at('drie')], [900, 'AAG', q.at('letters', 2) + 0.2]], tj = [q.at('kopie') - 0.3, q.at('maken')];
    const lig = ramp(t, tj[1] + 0.4, 0.6);
    T.forEach(([x, sq, ta], i) => { const u = ease((t - ta) / 1.0); if (u <= 0.01) return; const dy = (1 - u) * -260, dx = (1 - u) * (i - 1) * 120, wd = wander(i, t, 10 * (1 - u), 0.6);
      if (lig < 0.99) e10RnaLetters(ctx, e10Golf(x + dx + wd.x, x + 300 + dx + wd.x, 560 + dy + wd.y, 4, i), sq, { kant: -1, a: 1 - lig });
      A(ctx, u * (1 - lig), () => { roundRect(ctx, x + 6 + dx, 488 + dy, 288, 96, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]); }); });
    if (lig > 0.01) e10RnaLetters(ctx, e10Golf(300, 1200, 560, 4, 0.5), 'CGAUUCAAG', { kant: -1, a: lig });
    [600, 900].forEach((x, i) => e10Gloed(ctx, x, 560, 70, ramp(t, tj[i] + 0.3, 0.3) * (1 - ramp(t, tj[i] + 1.2, 0.6))));
    const rx = t < tj[0] - 0.6 ? 1380 : t < tj[1] - 0.4 ? lerp(1380, 600, ease((t - tj[0] + 0.6) / 0.8)) : lerp(600, 900, ease((t - tj[1] + 0.4) / 0.6)), ry = t < tj[0] - 0.6 ? 300 : 300;
    olRibozym(ctx, rx, ry, 0.7, { fold: 1, t, a: Math.max(0.3, q.on('RNA', 1, 0.6)) });
    e10Naam(ctx, 'klein ribozym: 45 letters', 'Cambridge, 2026', 1560, 200, q.on('45', 1, 0.6), q.on('45', 1, 1.2), 'left');
    naamBij(ctx, 'sjabloon', null, 1540, 652, ramp(t, 0.2, 0.5), 'left'); naamBij(ctx, 'stukjes van drie letters', 'aan elkaar gezet', 300, 420, q.on('stukjes', 1, 0.6) * (1 - ramp(t, tj[1] + 1, 0.5)), 'left', C.goud);
    const ak = q.on('langzaam', 1, 0.6); e10Klok(ctx, 1640, 820, 22, (t - q.at('langzaam')) * 0.05, ak);
    const an = q.on('opnieuw', 1, 0.6); if (an > 0.01) { naamBij(ctx, 'zichzelf steeds opnieuw kopiëren', 'nog niet gevonden', 1180, 800, an, 'center', C.text2); kruis(ctx, 1180, 740, 14, an); }
    A(ctx, ak, () => evoSchaal(ctx, 'na 72 dagen: 0,2 procent kopie · in half bevroren water')); },
  s21(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'model');
    e10Plasje(ctx, 260, 220, 1400, 600, { t, letters: lerp(70, 26, ease((t - 1) / 7)),
      vis: (i) => i < 6 ? 1 : ramp(t, 0.2 + (i - 6) * 0.65, 0.9), ouder: (i) => i < 6 ? -1 : (i - 6) % 6, fout: (i) => (i % 7 === 3 ? q.on('fout', 1, 0.5) : 0) });
    naamBij(ctx, 'fout bij kopiëren', null, 1480, 200, q.on('fout', 1, 0.6), 'left', C.goud); naamBij(ctx, 'losse letters raken op', null, 260, 860, q.on('raken', 1, 0.6), 'left'); },
  s22(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'model');
    e10Plasje(ctx, 260, 220, 1400, 600, { t: t + 8, letters: lerp(26, 18, ease(t / 5)), fout: (i) => (i % 7 === 3 ? 1 : 0) });
    naamBij(ctx, 'fout bij kopiëren', null, 1480, 200, 1, 'left', C.goud); naamBij(ctx, 'losse letters raken op', null, 260, 860, 1, 'left'); },
  s24(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'model');
    const tS = q.at('sneller'), tK = q.at('kopieën'), tM = q.at('meerderheid'); const ORDE = [3, 0, 5, 9, 12, 1, 14, 6, 10, 2, 15, 7];
    e10Plasje(ctx, 140, 220, 900, 560, { t: t + 13, letters: 18,
      goud: (i) => { const k = ORDE.indexOf(i); if (k < 0) return [0, -1]; if (k === 0) return [ramp(t, tS, 0.5), -1]; const tk = tK + (k - 1) * ((tM - tK) / 10); return [ramp(t, tk, 0.9), ORDE[Math.floor((k - 1) / 2)]]; },
      dim: (i) => (i === 10 || i === 4 || i === 13) ? q.on('trager', 1, 0.6) * (1 - q.on('meerderheid', 1, 0.6)) : 0, fout: (i) => (i % 7 === 3 ? 1 : 0) });
    olGrafiek(ctx, 1200, 760, 580, 460, Math.max(0.02, ease((t - tS) / (tM - tS + 1.5))), { a: ramp(t, 0, 0.5) });
    naamBij(ctx, 'trager', null, 590, 830, q.on('trager', 1, 0.5) * (1 - q.on('sneller', 1, 0.5)), 'center', C.text2);
    naamBij(ctx, 'snelle variant', 'goud omlijnd', 140, 180, q.on('sneller', 1, 0.6), 'left', C.goud); },
  s25(ctx, t, q) { olSchema(ctx); e10Plasje(ctx, 120, 260, 760, 480, { t: t + 25, letters: lerp(20, 12, ease(t / 6)), goud: (i) => [[3, 0, 5, 9, 12, 1, 14, 6, 10, 2].includes(i) ? 1 : 0, -1] });
    const tt = [q.at('Erfelijke') - 0.2, q.at('meer'), q.at('selectie')];
    ['erfelijke variatie', 'te weinig voor iedereen', 'selectie'].forEach((s, i) => { const a = ramp(t, tt[i], 0.5); A(ctx, a, () => { const dx = (1 - ease(a)) * 40; roundRect(ctx, 1000 + dx, 280 + i * 140, 760, 100, 18); shape(ctx, rgba(C.fill, 0.7), C.groen, 2); text(ctx, s, 1040 + dx, 345 + i * 140, fTekst(44, 600), C.text, 'left'); }); });
    e10Naam(ctx, 'zoals in de film Natuurlijke selectie', 'maar zonder cel', 1000, 230, q.on('mechanisme', 1, 0.6), q.on('geen', 1, 0.6), 'left'); },

  // ================= H3 Een omhulsel =================
  s26(ctx, t, q) { olMicro(ctx);
    olRnaStreng(ctx, olSlap(700, 500, 300, 0.2, 1 + Math.sin(t * 0.7) * 0.4, 0.9), 'AUGGCUAAGU', { w: 6, rand: C.goud }); naamBij(ctx, 'snelle kopieerder', null, 700, 380, ramp(t, 0, 0.4), 'center', C.goud);
    [[1550, 420, 0.8], [400, 760, 0.3], [1700, 720, -0.6]].forEach(([x, y, r], i) => { const wd = wander(i + 7, t, 14, 0.3); olRnaStreng(ctx, olSlap(x + wd.x, y + wd.y, 200, r, i + 3 + t * 0.4, 0.7), 'CCGAUAGGAC', { w: 5, a: 0.7 }); });
    [[1250, 380, 0.5, 0], [1300, 640, -0.3, 0.6], [470, 620, 0.3, 1.2]].forEach(([x, y, r, d], i) => { const u = ease((t - d) / 3.2); olRnaStreng(ctx, olSlap(lerp(720, x, u), lerp(500 + (i - 1) * 30, y, u), 200 * (0.6 + 0.4 * u), r * u + 0.2 * (1 - u), i + 9 + t * 0.4, 0.7), 'AUGGCUAAGU', { w: 5, rand: C.goud, a: t < d ? 0.6 : 1 }); });
    naamBij(ctx, 'kopieën drijven weg', 'naar de buren', 1460, 250, q.on('drijven', 1, 0.6), 'center');
    A(ctx, q.on('geen', 1, 0.6), () => text(ctx, 'geen binnen en buiten', 960, 840, fTekst(40, 600), C.text2, 'center')); },
  s27(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'gemeten'); const av = ramp(t, 0, 0.6), vx = lerp(1100, 620, ease(t / 1.6)), ang = (1 - ease(Math.min(1, t / 4))) * 1.4 + Math.sin(t * 0.4) * 0.08;
    const ak = q.on('kop', 1, 1.4); for (let i = 0; i < 10; i++) { const wd = wander(i, t, 20, 0.4); const x0 = 140 + hash(i * 3) * 260, y0 = 380 + hash(i * 7) * 400, an = i / 10 * 6.283; const tx = vx + Math.cos(an) * 80, ty = 500 + Math.sin(an) * 80;
      olMolecuul(ctx, 'h2o', lerp(x0, tx, ak) + wd.x * (1 - ak * 0.7), lerp(y0, ty, ak) + wd.y * (1 - ak * 0.7), 1.6, { rot: i + t * 0.3 }); }
    olVetzuur(ctx, vx, 500, ang * (1 - ak), 9, { a: av });
    const am = q.on('meteorieten', 1, 0.5) * (1 - ramp(t, q.at('meteorieten') + 1.6, 0.6)); A(ctx, am, () => { olMeteorietBrok(ctx, 1500, 260, 60); naamBij(ctx, 'ook in meteorieten', null, 1500, 370, 1, 'center'); });
    e10Naam(ctx, 'kop', 'lost op in water', 620, 300, q.on('kop', 1, 0.5), q.on('oplost', 1, 0.6), 'center');
    e10Naam(ctx, 'staart', 'lost niet op in water', 1160, 410, q.on('staart', 1, 0.5), q.on('niet', 1, 0.6), 'center');
    naamBij(ctx, 'vetzuur', null, vx + 200, 380, q.on('vetzuren', 1, 0.6) * (1 - q.on('kop', 1, 0.5)), 'center');
    A(ctx, av, () => evoSchaal(ctx, 'vetzuur · sterk vergroot')); },
  s28(ctx, t, q) { olMicro(ctx);
    roundRect(ctx, 660, 180, 600, 640, 26); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.18); ctx.fillRect(665, 300, 590, 515);
    ctx.save(); ctx.beginPath(); ctx.rect(670, 305, 580, 505); ctx.clip(); const n = Math.round(lerp(14, 40, q.on('veel', 1, 1.2)));
    for (let i = 0; i < n; i++) { const wd = wander(i, t, 22, 0.4); olVetzuur(ctx, 700 + hash(i * 2) * 500 + wd.x, 340 + hash(i * 5) * 440 + wd.y, hash(i) * 6.28 + t * 0.4 * (hash(i * 3) - 0.5), 1.8); }
    ctx.restore(); naamBij(ctx, 'vetzuren in water', null, 960, 150, ramp(t, 0, 0.4), 'center'); },
  s30(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'gemeten'); const cx = 640, cy = 530, R = 250;
    const tz = q.at('vormen'); const fill = ramp(t, tz + 2.6, 0.8); if (fill > 0.01) { ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.5 * fill); ctx.fill(); }
    e10Vetzuren(ctx, t, cx, cy, R, tz - 1.4, 4.2);
    const az = q.on('staarten', 1, 0.8); if (az > 0.01) A(ctx, az, () => zoomCircle(ctx, 1440, 440, 270 * (0.6 + 0.4 * az), 880, 470, null, 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 180, 580, 580);
      for (let i = 0; i < 7; i++) { const yy = 230 + i * 74, br = Math.sin(t * 1.2 + i) * 3; olVetzuur(ctx, 1270 + br, yy, 0, 2.2); olVetzuur(ctx, 1610 - br, yy, Math.PI, 2.2); }
      e10Gloed(ctx, 1440, 460, 140, q.on('staarten', 1, 0.4) * (1 - ramp(t, q.at('water', 2), 0.8)), C.oker); }));
    naamBij(ctx, 'buiten', 'water', 1250, 780, q.on('buiten', 1, 0.6), 'center'); naamBij(ctx, 'binnen', 'water', 1630, 780, q.on('binnen', 1, 0.6), 'center');
    e10Naam(ctx, 'dubbele laag', 'staarten bij elkaar · bij de juiste zuurgraad', 640, 140, q.on('dubbele', 1, 0.6), q.on('dubbele', 1, 1.2), 'center');
    A(ctx, ramp(t, 0.3, 0.6), () => evoSchaal(ctx, 'model · sterk vergroot')); },
  s31(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'gemeten'); const tb = q.at('buiten'), tL = q.at('RNA-letters');
    const lt = [[0, 'A'], [0.8, 'G'], [1.6, 'U']];
    olBlaasje(ctx, 560, 500, 260, { gat: [0.02, 0.06], inhoud: () => { const bo = Math.max(0, Math.sin(clamp((t - tb + 0.6) / 1.4, 0, 1) * Math.PI));
        olRnaStreng(ctx, olSlap(560 + 70 * bo, 520 - 10 * bo, 220, 0.2, 2 + t * 0.3, 0.8), 'AUGGCUAAGUU', { w: 5 });
        lt.forEach(([d, b], i) => { const u = (t - tL - d) / 2.2; if (u > 0.55) { const v = ease((u - 0.55) / 0.45); olNucleotide(ctx, lerp(812, 690 - i * 40, v), lerp(564, 610 + i * 40, v), b, 0.6, { rot: u }); } }); } });
    lt.forEach(([d, b], i) => { const u = (t - tL - d) / 2.2; if (u <= 0.55) olNucleotide(ctx, lerp(980, 830, ease(u / 0.55)), lerp(380 + i * 110, 560, ease(u / 0.55)), b, 0.6, { rot: u * 2, a: u < 0 ? 0.5 : 1 }); });
    kruis(ctx, 790, 440, 24, q.on('buiten', 1, 0.3) * (1 - ramp(t, tb + 2, 0.6)));
    naamBij(ctx, 'losse letters: erin', null, 960, 290, q.on('RNA-letters', 1, 0.6), 'center', C.goud);
    const tg = q.at('groeien'), ts = q.at('splitsen'), g = ease((t - tg) / 1.6), d = ease((t - ts + 0.6) / 1.4), sp = ease((t - ts - 1.0) / 0.45);
    const R2 = lerp(170, 220, g);
    if (sp < 0.99) olBlaasje(ctx, 1460, 500, R2, { deling: 0.75 * d, a: 1 - sp, inhoud: () => { olRnaStreng(ctx, olSlap(lerp(1400, 1290, d), 500, 120, 0.4, 2 + t * 0.3, 0.6), 'AUGGCU', { w: 4 }); olRnaStreng(ctx, olSlap(lerp(1520, 1640, d), 500, 120, -0.3, 5 + t * 0.3, 0.6), 'GCUAAG', { w: 4 }); } });
    if (sp > 0.01) [[1290 - 30 * sp, 'AUGGCU', 2, 0.4], [1640 + 30 * sp, 'GCUAAG', 5, -0.3]].forEach(([x, sq, sd, r]) => olBlaasje(ctx, x, 500, 150, { a: sp, inhoud: () => olRnaStreng(ctx, olSlap(x, 500, 110, r, sd + t * 0.3, 0.5), sq, { w: 4 }) }));
    const av = q.on('extra', 1, 0.3) * (1 - ramp(t, q.at('vetzuren') + 1.6, 0.4)); if (av > 0.01) for (let i = 0; i < 6; i++) { const u = clamp((t - q.at('extra') - i * 0.15) / 1.2, 0, 1), an = -1.2 + i * 0.5; olVetzuur(ctx, 1460 + Math.cos(an) * lerp(R2 + 200, R2, u), 500 + Math.sin(an) * lerp(R2 + 200, R2, u), an + Math.PI, 1.3, { a: av * (1 - u * 0.8) }); }
    const as = q.on('stroming', 1, 0.4); if (as > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.5 * as); ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = 1150; x <= 1800; x += 20) { const y = 230 + k * 30 + Math.sin(x / 50 - t * 3) * 6; x === 1150 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore(); }
    naamBij(ctx, 'groeit met extra vetzuren', null, 1460, 150, q.on('groeien', 1, 0.6) * (1 - q.on('splitsen', 1, 0.4)), 'center');
    e10Naam(ctx, 'splitst met inhoud', 'bij lichte stroming', 1460, 150, q.on('splitsen', 1, 0.6), q.on('inhoud', 1, 0.6), 'center');
    evoSchaal(ctx, 'model · sterk vergroot'); },
  s32(ctx, t, q) { olMicro(ctx); A(ctx, q.on('model', 1, 0.6), () => olBewijs(ctx, 'model'));
    const nk = clamp((t - q.at('kopieën') + 0.6) / 1.0, 0, 3);
    olBlaasje(ctx, 960, 350, 190, { inhoud: () => { olRibozym(ctx, 930, 320, 0.34, { fold: 1, t });
      [[1000, 410, 0.3, 1], [880, 420, -0.4, 3], [1010, 270, 0.8, 5], [870, 260, -0.2, 7]].forEach(([x, y, r, sd], i) => { const a = clamp(nk + 1 - i, 0, 1); if (a <= 0.01) return; const wd = wander(i + 3, t, 18, 0.5); olRnaStreng(ctx, olSlap(lerp(930, x, a) + wd.x, lerp(330, y, a) + wd.y, 100, r + Math.sin(t * 0.5 + i) * 0.3, sd + t * 0.4, 0.45), 'AUGGCU', { w: 4, a }); }); } });
    e10Naam(ctx, 'protocel', 'blaasje met een kopieerder', 1220, 300, q.on('protocel', 1, 0.6), q.on('protocel', 1, 1.2), 'left', C.goud);
    e10Vakjes(ctx, 200, 590, [1, 'h', 1], [1, 1, 1], [1, 1, q.on('protocel', 1, 1)], { h: 270 }); },

  // ================= H4 Eén voorouder =================
  s33(ctx, t, q) { olSchema(ctx); const uit = 1 - q.on('Maar', 1, 0.6);
    if (uit > 0.01) A(ctx, uit, () => { olBlaasje(ctx, 560, 470, 130, { inhoud: () => olRnaStreng(ctx, olSlap(560, 470, 100, 0.3, 2 + t * 0.4, 0.5), 'AUGGCU', { w: 4 }) });
      naamBij(ctx, 'protocel', null, 560, 700, 1, 'center', C.goud);
      e10Boog(ctx, 720, 470, 960, 380, 1260, 470, ease(t / 2), rgba(C.line, 0.8), 3, false, [8, 10], -t * 20); vraagteken(ctx, 990, 540, ramp(t, 1.2, 0.6), 110);
      olLuca(ctx, 1400, 470, 120, 80, { rand: null, a: 0.35 * ramp(t, 1.6, 0.8) }); naamBij(ctx, 'echte cel', null, 1400, 600, ramp(t, 1.6, 0.8), 'center', C.text2); });
    const al = [q.on('kijk', 1, 0.5), q.on('paddenstoel', 1, 0.5), q.on('eik', 1, 0.5), q.on('jij', 1, 0.3)]; e10Rij(ctx, 0, al);
    ['een bacterie', 'een paddenstoel', 'een eik', 'jij'].forEach((s, i) => naamBij(ctx, s, null, [320, 760, 1200, 1620][i], 740, al[i], 'center'));
    A(ctx, al[0], () => evoSchaal(ctx, 'niet op schaal')); },
  s34(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'gemeten'); e10Rij(ctx, ease(t / 1.2));
    const tl = q.at('vier'); e10Codons(ctx, [0, 1, 2, 3].map(i => ramp(t, tl + i * 0.35, 0.6)));
    naamBij(ctx, 'codon G-C-U (in het RNA) → alanine', 'bijna overal dezelfde code', 960, 820, q.on('code', 1, 0.6), 'center'); },
  s35(ctx, t, q) { olSchema(ctx); olBewijs(ctx, 'gemeten'); e10Rij(ctx, 1); e10Codons(ctx, [1, 1, 1, 1], Math.floor(t / 0.9) % 4);
    naamBij(ctx, 'codon G-C-U (in het RNA) → alanine', 'bijna overal dezelfde code', 960, 820, 1, 'center'); },
  s37(ctx, t, q) { olSchema(ctx);
    const am = q.on('mitochondriën', 1, 0.6); A(ctx, am, () => mitochondrion(ctx, 360, 340, 300, -0.15, 1, 6, t));
    e10Naam(ctx, 'in je mitochondriën', 'U-G-A betekent hier tryptofaan, niet stop', 90, 180, am, q.on('anders', 1, 0.6), 'left');
    const X = [880, 1100, 1340, 1580]; olCelIcoon(ctx, 'bacterie', X[0], 330, 1.0); olPaddenstoel(ctx, X[1], 380, 130); olEik(ctx, X[2], 390, 160); persoon(ctx, 'noor', X[3], 390, 170, { uit: 'blij' });
    const tb = q.at('erfenis') - 0.6, g = (k) => ease((t - tb - k * 0.5) / 0.9); const L = [1240, 720];
    const tak = (x0, y0, x1, y1, u) => { if (u <= 0.01) return; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, u), lerp(y0, y1, u)); ctx.stroke(); };
    tak(X[3], 420, 1460, 540, g(0)); tak(X[1], 420, 1460, 540, g(0)); tak(X[2], 420, 1380, 610, g(0.6)); tak(1460, 540, 1380, 610, g(1)); tak(1380, 610, L[0], L[1], g(1.6)); tak(X[0], 370, L[0], L[1], g(1.2));
    const aL = q.on('LUCA', 1, 0.5); e10Gloed(ctx, L[0], L[1], 80, aL * (0.6 + 0.4 * Math.sin(t * 2.5))); if (aL > 0.01) circ(ctx, L[0], L[1], 18, rgba(C.goud, aL), _mvL(C.goud, 0.3), 2);
    e10Naam(ctx, 'LUCA', 'laatste gemeenschappelijke voorouder', L[0], 800, aL, q.on('laatste', 1, 0.6), 'center', C.goud);
    A(ctx, ramp(t, 0, 0.4), () => evoSchaal(ctx, 'niet op schaal')); },
  s38(ctx, t, q) { olSchema(ctx); A(ctx, ramp(t, 0.2, 0.5), () => olBewijs(ctx, 'hypothese'));
    [[560, 260, 'bacteriën', 'bacterie'], [960, 260, 'archaea', 'archaeon'], [1360, 260, 'cellen met een kern', 'eukaryoot']].forEach(([x, y, n, s]) => { olCelIcoon(ctx, s, x, y, 1); naamBij(ctx, n, null, x, y - 90, 1, 'center'); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, 330); ctx.lineTo(760, 600); ctx.moveTo(960, 330); ctx.lineTo(1160, 470); ctx.lineTo(1360, 330); ctx.moveTo(1160, 470); ctx.lineTo(760, 600); ctx.stroke();
    const ga = q.on('takken', 1, 0.3) * (1 - ramp(t, q.at('samenkomen') + 1.2, 0.6)); if (ga > 0.01) { const u = ease((t - q.at('takken')) / 1.4);
      [[[560, 330], [760, 600]], [[960, 330], [1160, 470], [760, 600]], [[1360, 330], [1160, 470], [760, 600]]].forEach(P => { const n = P.length - 1, k = Math.min(n - 1, Math.floor(u * n)), v = u * n - k; const p = [lerp(P[k][0], P[k + 1][0], v), lerp(P[k][1], P[k + 1][1], v)]; e10Gloed(ctx, p[0], p[1], 36, ga); circ(ctx, p[0], p[1], 8, rgba(C.goud, ga)); }); }
    const st = ease((t - q.at('eerste')) / 1.2); if (st > 0.01) { ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(760, 600); ctx.lineTo(760, lerp(600, 660, st)); ctx.stroke();
      ctx.setLineDash([8, 10]); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(760, 660); ctx.lineTo(760, lerp(660, 840, st)); ctx.stroke(); ctx.restore(); }
    const zs = ease((t - q.at('andere') + 0.3) / 1.2); if (zs > 0.01) { ctx.save(); ctx.setLineDash([8, 10]); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(760, 700); ctx.lineTo(lerp(760, 560, zs), lerp(700, 740, zs)); ctx.moveTo(760, 760); ctx.lineTo(lerp(760, 1000, zs), lerp(760, 800, zs)); ctx.stroke(); ctx.restore();
      const ae = q.on('over', 1, 0.5); circ(ctx, 560, 740, 8, null, rgba(C.line, 0.6 * ae), 2); circ(ctx, 1000, 800, 8, null, rgba(C.line, 0.6 * ae), 2); kruis(ctx, 560, 740, 9, ae * 0.7, C.text2); kruis(ctx, 1000, 800, 9, ae * 0.7, C.text2); }
    circ(ctx, 760, 600, 18, C.goud, _mvL(C.goud, 0.3), 2); e10Gloed(ctx, 760, 600, 70, 0.5 + 0.3 * Math.sin(t * 2.5)); naamBij(ctx, 'LUCA', null, 820, 620, 1, 'left', C.goud);
    e10Naam(ctx, 'andere vroege cellen', 'geen nakomelingen meer', 1040, 770, q.on('andere', 1, 0.6), q.on('tak', 1, 0.6), 'left', C.text2);
    e10Naam(ctx, 'niet de eerste cel', 'wel de laatste waarin alle takken samenkomen', 1000, 640, q.on('eerste', 1, 0.6), q.on('laatste', 1, 0.6), 'left'); },
  s39(ctx, t, q) { olMicro(ctx); olBewijs(ctx, 'model'); olLuca(ctx, 860, 500, 470, 300);
    e10Gloed(ctx, 820, 500, 230, q.on('kern', 1, 0.4) * (1 - ramp(t, q.at('kern') + 1.4, 0.6)), C.kernR);
    e10Gloed(ctx, 860, 500, 420, q.on('ribosomen', 1, 0.4) * (1 - ramp(t, q.at('ribosomen') + 1.2, 0.6)) * 0.7, C.ribo);
    const tz = q.at('leefde'); [['h2', 1520, 330, 2.4, 0], ['co2', 1560, 470, 2.2, 0.7], ['h2', 1500, 620, 2.4, 1.4]].forEach(([m, x, y, s, d], i) => { const u = ease((t - tz - d) / 2.2); const tx = 1180, ty = 420 + i * 70; const wd = wander(i, t, 8, 0.4);
      const px = lerp(x, tx, u) + wd.x, py = lerp(y, ty, u) + wd.y; const bin = ((px - 860) / 450) ** 2 + ((py - 500) / 280) ** 2 < 1; olMolecuul(ctx, m, px, py, s * (bin ? 0.8 : 1), { rot: t * 0.3 + i, a: bin ? 1 - ramp(u, 0.85, 0.15) : 1 }); });
    e10Naam(ctx, 'LUCA', 'model · ± 4,2 miljard jaar geleden (schatting)', 860, 140, ramp(t, 0, 0.4), q.on('4,2', 1, 0.6), 'center', C.goud);
    naamBij(ctx, 'DNA', 'geen kern', 860, 850, q.on('kern', 1, 0.6), 'center');
    e10Naam(ctx, 'waterstof en koolstofdioxide', 'geen zuurstof', 1560, 720, q.on('leefde', 1, 0.6), q.on('zuurstof', 1, 0.6), 'center');
    evoSchaal(ctx, 'model · vorm onbekend'); },
  s40(ctx, t, q) { macroNacht(ctx, { horizon: 560, heuvel: false }); olBewijs(ctx, 'gemeten');
    ctx.fillStyle = rgba('#2E6FBF', 0.45); ctx.fillRect(0, 560, W, 200); ctx.strokeStyle = rgba('#9CCBE3', 0.4); ctx.lineWidth = 2; for (let r = 0; r < 3; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 24) { const yy = 590 + r * 55 + Math.sin(x / 70 + r - t * 0.6) * 4; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
    ctx.fillStyle = OL.zand; ctx.fillRect(0, 760, W, H - 760);
    [[260, 760, 220, 150], [560, 760, 300, 210], [880, 760, 180, 120]].forEach(([x, y, w, h]) => olStromatoliet(ctx, x, y, w, h));
    const tz = q.at('Steen'), cut = ease((t - tz + 0.4) / 1.0);
    olStromatoliet(ctx, 1420, 860, 420, 300);
    if (cut > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(1100, 560, 640, 300 * cut + 2); ctx.clip(); olStromatoliet(ctx, 1420, 860, 420, 300, { doorsnede: true });
      const L = clamp((t - q.at('laagje')) / 2.6, 0, 1) * 14; for (let k = 13; k >= 0; k--) { const kk = 13 - k; const a = clamp(L - kk, 0, 1) * (1 - clamp(L - kk - 1.5, 0, 1) * 0.7); if (a <= 0.01) continue;
        const hh = 300 * (1 - k / 14), ww = 420 * (1 - k / 14 * 0.6); ctx.beginPath(); ctx.moveTo(1420 - ww / 2, 860); ctx.bezierCurveTo(1420 - ww / 2, 860 - hh * 0.9, 1420 - ww * 0.25, 860 - hh, 1420, 860 - hh); ctx.bezierCurveTo(1420 + ww * 0.25, 860 - hh, 1420 + ww / 2, 860 - hh * 0.9, 1420 + ww / 2, 860); ctx.strokeStyle = rgba('#F2E6C8', 0.8 * a); ctx.lineWidth = 3; ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = rgba('#F2F2EE', 0.9 * (1 - ramp(t, tz + 1, 0.5))); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1180, 560 + 300 * cut); ctx.lineTo(1660, 560 + 300 * cut); ctx.stroke(); }
    const am = q.on('microben', 1, 0.6); if (am > 0.01) { ctx.beginPath(); ctx.ellipse(1420, 562, 80, 8, 0, 0, 6.283); ctx.fillStyle = rgba('#5FA86E', am * (0.7 + 0.3 * Math.sin(t * 3))); ctx.fill(); }
    e10Naam(ctx, 'stromatolieten', 'West-Australië · ± 3,5 miljard jaar oud', 160, 230, q.on('stromatolieten', 1, 0.6), q.on('3,5', 1, 0.6), 'left');
    naamBij(ctx, 'het oudste spoor van leven', null, 160, 230, q.on('oudste', 1, 0.5) * (1 - q.on('stromatolieten', 1, 0.4)), 'left');
    e10Naam(ctx, 'doorgezaagd: laagjes', 'opgebouwd door matten van microben', 1420, 500, q.on('Steen', 1, 0.6), q.on('microben', 1, 0.6), 'center'); },
  s41(ctx, t, q) { const aL = 0.45 + 0.55 * q.on('hete', 1, 0.8), aR = 0.45 + 0.55 * q.on('ondiepe', 1, 0.8);
    const dr = q.at('opdrogen') - 0.3, droog = t < dr ? 0.3 : 0.3 + 0.6 * (0.5 - 0.5 * Math.cos((t - dr) * 1.6));
    olDiepzee(ctx, { x0: 0, w: 960 }); olPoelLand(ctx, { x0: 960, w: 960, droog });
    for (const [x, y, k0] of [[403, 340, 0], [653, 470, 3]]) for (let k = 0; k < 4; k++) { const ph = (t * 0.25 + k / 4 + k0 * 0.1) % 1; circ(ctx, x + Math.sin(ph * 6 + k) * 16, y - ph * 200, 14 + ph * 30, rgba('#DCE4EC', 0.18 * (1 - ph))); }
    const ah = q.on('waterstof', 1, 0.6); if (ah > 0.01) for (let k = 0; k < 4; k++) { const ph = (t * 0.3 + k / 4) % 1; olMolecuul(ctx, 'h2', 403 + Math.sin(ph * 5 + k) * 30, 330 - ph * 200, 2, { a: ah * Math.min(1, (1 - ph) * 3), rot: ph * 3 }); }
    const ab = q.on('bouwstenen', 1, 0.6); if (ab > 0.01) for (let k = 0; k < 7; k++) { const a = clamp((t - q.at('bouwstenen')) * 2 - k * 0.4, 0, 1) * ab; const an = 3.4 + k * 0.42; const x = 1392 + Math.cos(an) * 260, y = 740 + Math.sin(an) * 64;
      if (k % 2) olAminozuur(ctx, x, y, 0.45, { a, rot: k }); else olNucleotide(ctx, x, y, 'AUGC'[k % 4], 0.35, { a, rot: k }); }
    ctx.save(); ctx.fillStyle = rgba('#0D1420', 1 - aL); ctx.fillRect(0, 0, 958, H); ctx.fillStyle = rgba('#0D1420', 1 - aR); ctx.fillRect(962, 0, 958, H); ctx.restore();
    ctx.fillStyle = C.line; ctx.fillRect(958, 0, 4, H);
    A(ctx, q.on('hete', 1, 0.6), () => olBewijs(ctx, 'hypothese', 900, 130)); A(ctx, q.on('ondiepe', 1, 0.6), () => olBewijs(ctx, 'hypothese', W - 80, 130));
    const vq = (1 - q.on('hete', 1, 0.6)); if (vq > 0.01) { circ(ctx, 960, 480, 90, rgba(C.bgSchema, 0.85 * vq)); vraagteken(ctx, 960, 525, vq, 140); }
    e10Naam(ctx, 'hete bron op de oceaanbodem', 'energie uit waterstof', 480, 840, q.on('hete', 1, 0.6), q.on('energie', 1, 0.6), 'center');
    e10Naam(ctx, 'ondiepe poel op land', 'Darwin, 1871: een warm poeltje', 1440, 840, q.on('ondiepe', 1, 0.6), q.on('Darwin', 1, 0.6), 'center'); },
  s42(ctx, t, q) { olSchema(ctx); const ax = 160, aw = 1600, gx = (g) => ax + (4.6 - g) / 1.2 * aw;
    olTijdAs(ctx, ax, 560, aw, 4.6, 3.4, [{ g: 4.54, tekst: 'aarde', hoog: 0 }, { g: 4.4, tekst: 'vloeibaar water', hoog: 90 }, { g: 3.48, tekst: 'stromatolieten', meta: 'oudste harde spoor', hoog: 0 }]);
    const aL = q.on('schatting', 1, 0.7); A(ctx, aL, () => { const x0 = gx(4.21), w2 = Math.max(16, (gx(4.09) - gx(4.33)) / 2 * ease(aL)); roundRect(ctx, x0 - w2, 544, w2 * 2, 32, 16); shape(ctx, rgba(C.goud, 0.35), C.goud, 2); });
    e10Naam(ctx, 'LUCA', 'schatting', gx(4.21), 516, q.on('LUCA', 1, 0.6), q.on('LUCA', 1, 1), 'center', C.goud);
    e10Gloed(ctx, gx(4.54), 560, 50, q.on('aarde', 1, 0.4) * (1 - ramp(t, q.at('aarde') + 1, 0.5)));
    haak(ctx, gx(4.54), gx(4.21), 680, 'een paar honderd miljoen jaar', C.groen, q.on('honderd', 1, 0.6)); },

  // ================= Samenvatting =================
  s43(ctx, t, q) { olSchema(ctx); const k = [q.on('Bouwstenen', 1, 1), q.on('RNA', 1, 1), q.on('Vetzuren', 1, 1)];
    e10Vakjes(ctx, 200, 300, [1, 'h', 1], [1, 1, 1], k);
    [[435, 'Bouwstenen'], [945, 'RNA'], [1455, 'Vetzuren']].forEach(([x, w]) => e10Gloed(ctx, x, 450, 230, q.on(w, 1, 0.4) * (1 - ramp(t, q.at(w) + 1.6, 0.6)) * 0.6));
    A(ctx, q.on('Hoe', 1, 0.6), () => text(ctx, 'Hoe de stappen in elkaar grepen, en waar: nog onbekend', 960, 760, fTekst(44, 600), C.text2, 'center')); },
  s44(ctx, t, q) { const zin = ['Bouwstenen kunnen vanzelf ontstaan (Miller, meteorieten).', 'RNA draagt informatie én doet werk: de RNA-wereld (hypothese).', 'Vetzuren vormen vanzelf een omhulsel: de protocel (model).', 'Alles wat leeft, deelt één code: één voorouder, LUCA.', 'Verder in: Van eerste cel tot nu'];
    olEindKaart(ctx, zin.slice(0, 4).concat([''])); const af = q.on('film', 1, 0.6); text(ctx, zin[4], 170, 250 + 4 * 104, fTekst(46, 600), af > 0.5 ? C.goud : C.text2, 'left');
    persoon(ctx, 'noor', 1840, 850, 120, { uit: 'blij', kijk: -1 });
    const u = ease((t - q.at('ketting')) / 1.8); if (u > 0.01) { ctx.save(); ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.lineDashOffset = -t * 20; ctx.beginPath(); ctx.moveTo(1800, 800); ctx.lineTo(lerp(1800, 1560, u), 800); ctx.stroke(); ctx.restore(); }
    const aL = q.on('LUCA', 1, 0.5); if (aL > 0.01) { e10Gloed(ctx, 1540, 800, 50, aL); circ(ctx, 1540, 800, 12, rgba(C.goud, aL)); A(ctx, aL, () => metaText(ctx, 'LUCA', 1540, 770, C.goud, 'center', 26)); } },
});
// tijd in de alinea doorgeven aan de gedeelde decors (rook, golven, vakjes)
for (const k of Object.keys(SCENES)) { const f = SCENES[k]; if (typeof f !== 'function') continue; SCENES[k] = function (ctx, t, q, st) { E10T = t; return f.call(this, ctx, t, q, st); }; }
