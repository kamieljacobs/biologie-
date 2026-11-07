// Wat word jij? · Biomedische wetenschappen · Signalen in de cel — scènes per alinea (v1.0, 24 okt 2026). Look: Schema en Micro, met cast (Opa Henk, Noor, Dr. Kim).
// Rode draad: het tabletje naast de koffie van Opa Henk.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// gebogen celrand (bovenkant van een grote ronde cel): middelpunt ver onder beeld
const MB = { cx: 960, cy: 2900, R: 2600 };
function celRand(ctx, t, o = {}) { const { a = 1, gaten = [] } = o; celBinnen(ctx, MB.cx, MB.cy, MB.R, a, t); membraan(ctx, MB.cx, MB.cy, MB.R, 40, 1880, { a, gaten }); }
function opRand(x, dy = 0) { return [x, arcY(MB.cx, MB.cy, MB.R, x) + dy, arcHoek(MB.cx, MB.cy, MB.R, x)]; }
// ontbijtscène: Henk en Noor aan tafel
function ontbijt(ctx, t, o = {}) { const { a = 1, uitH = 'blij', uitN = 'blij', pil = 1, gloed = 0, pose = 'staan' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  persoon(ctx, 'henk', 560, 880, 470, { t, uit: uitH, kijk: 1, pose }); persoon(ctx, 'noor', 1360, 880, 450, { t, uit: uitN, kijk: -1 });
  ontbijtTafel(ctx, 640, 640, 640, 1, { pil, gloed, t }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const [x, y, an] = opRand(1520); membraan(ctx, MB.cx, MB.cy, MB.R, 1300, 1800, { gaten: [[1520, 120]] }); receptor7(ctx, x, y, an, 1.1, { bind: 1, vorm: 0.5 + 0.5 * Math.sin(t * 1.2), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const Z = q.on('snappen', 1, 0.8);
    if (Z < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * Z, 0, 1); ontbijt(ctx, t, { gloed: q.on('tabletje', 1, 0.4) * (1 - q.on('hij', 1)) + q.on('tabletje', 2, 0.4) * (1 - q.on('toom', 1)) + q.on('remt', 1) });
      naamBij(ctx, 'Opa Henk', '', 400, 300, 1, 'center'); naamBij(ctx, 'Noor', 'kleindochter', 1500, 320, 1, 'center');
      // sig-8 (25 okt): één kaartje tegelijk boven Opa Henk, niet over de tafel
      tag(ctx, 'elke ochtend · al vier jaar', 400, 200, C.goud, q.on('ochtend', 1) * (1 - q.on('leukemie', 1, 0.4)), 'center', 28); tag(ctx, 'leukemie', 400, 200, C.koraal, q.on('leukemie', 1) * (1 - q.on('remt', 1, 0.4)), 'center', 28);
      tag(ctx, 'remt een eiwit in zijn cellen', 400, 200, C.goud, q.on('remt', 1), 'center', 28); ctx.restore(); }
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * Z - 1, 0, 1); celRand(ctx, t, { gaten: [960] }); const [x, y, an] = opRand(960); receptor7(ctx, x, y, an, 1, { t });
      naamBij(ctx, 'levercel', 'binnenkant', 300, 700, q.on('levercel', 1), 'center');
      for (let i = 0; i < 4; i++) { const w = wander(i, t, 20, 0.5); hormoonVorm(ctx, 300 + i * 130 + w.x, 250 + (i % 2) * 40 + w.y, 18, 'adrenaline', q.on('adrenaline', 1)); }
      naamBij(ctx, 'adrenaline', 'buiten de cel', 300, 150, q.on('adrenaline', 1), 'left');
      tag(ctx, 'lost op in water', 1400, 150, C.teal, q.on('water', 1), 'center', 26); tag(ctx, 'slecht in vet: het membraan', 1400, 225, C.oker, q.on('vet', 1), 'center', 26);
      glycogeenKeten(ctx, 1100, 760, 1.4, q.on('glycogeen', 1)); for (let i = 0; i < 10; i++) { const f = clamp((t - q.at('glucose', 1)) * 0.8 - i * 0.12, 0, 1); glucose(ctx, 1400 + (i % 5) * 60, 720 + Math.floor(i / 5) * 60 + (1 - f) * 20, 14, f); }
      naamBij(ctx, 'glycogeen', '', 1100, 850, q.on('glycogeen', 1), 'center'); vraagteken(ctx, 960, 560, q.on('Hoe', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de receptor verandert van vorm', 1); const S = q.on('film', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * S, 0, 1); celRand(ctx, t, { gaten: [960] }); const [x, y, an] = opRand(960); const b = q.on('Bindt', 1, 1.2), v = clamp((t - q.at('verandert', 1)) / 1.5, 0, 1);
      receptor7(ctx, x, y, an, 1.25, { t, bind: Math.max(b, 0.001) > 0.01 ? b : 0, vorm: v, gloed: q.on('signaal', 1) });
      for (let i = 0; i < 3; i++) hormoonVorm(ctx, 400 + i * 170, 200 + (i % 2) * 40, 16, 'adrenaline', 1 - q.on('Bindt', 1) * (i === 1 ? 1 : 0));
      naamBij(ctx, 'membraan', 'dubbele laag vet', 1500, 520, q.on('vet', 1), 'center'); naamBij(ctx, 'receptor', 'eiwit: kralenketting', 1180, 200, q.on('receptor', 1), 'left');
      tag(ctx, 'buiten', 200, 290, C.text2, 1, 'left', 26); tag(ctx, 'binnen', 200, 760, C.text2, 1, 'left', 26);
      tag(ctx, 'vormverandering = signaal', 960, 860, C.goud, q.on('signaal', 1), 'center', 30); ctx.restore(); }
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * S - 1, 0, 1); tag(ctx, 'film: Post voor iedereen', 960, 250, C.teal, 1, 'center', 28);
      // links: membraanreceptor, rechts: steroïd door het membraan naar de kern
      paneel(ctx, 140, 310, 760, 470, 'receptor in het membraan'); paneel(ctx, 1020, 310, 760, 470, 'receptor in de cel');
      ctx.save(); ctx.beginPath(); ctx.rect(150, 360, 740, 410); ctx.clip(); membraan(ctx, 520, 1500, 1050, 150, 890, { gaten: [520] }); const [x1, y1, a1] = [520, arcY(520, 1500, 1050, 520), 0]; receptor7(ctx, x1, y1, a1, 0.9, { bind: 1, vorm: 1, t, gloed: 0.6 }); ctx.restore();
      klokje(ctx, 760, 700, 40, 0.08, q.on('seconden', 1)); regel(ctx, 'seconden', 690, 710, q.on('seconden', 1), C.text, 30, 'right', 700);
      ctx.save(); ctx.beginPath(); ctx.rect(1030, 360, 740, 410); ctx.clip(); membraan(ctx, 1400, 1500, 1050, 1030, 1770, {}); const u = clamp((t - q.at('steroïdhormonen', 1)) / 4, 0, 1);
      kernDNA(ctx, 1330, 660, 85, { aan: q.on('transcriptiefactor', 1), t }); const rc = q.on('receptor', 2), m = clamp((t - q.at('Samen', 1)) / 2, 0, 1); const hx = lerp(1620, 1560, u), hy = lerp(400, 560, u); const rx2 = lerp(1560, 1340, ease(m)), ry2 = lerp(570, 650, ease(m)); kluwen(ctx, rx2, ry2, 30, { a: rc, seed: 11, kleur: C.groen, n: 14, aan: u > 0.95 ? 1 : 0, t }); hormoonVorm(ctx, u > 0.95 ? rx2 + 20 : hx, u > 0.95 ? ry2 - 26 : hy, 14, 'cortisol', q.on('steroïdhormonen', 1)); ctx.restore();
      naamBij(ctx, 'steroïdhormoon', '', 1400, 760, q.on('steroïdhormonen', 1) * (1 - q.on('receptor', 2)), 'center'); naamBij(ctx, 'receptor in het cytoplasma', '', 1400, 760, q.on('receptor', 2) * (1 - q.on('kern', 1)), 'center'); naamBij(ctx, 'samen naar de kern', '', 1400, 760, q.on('kern', 1), 'center');
      klokje(ctx, 1700, 700, 40, 0.7, q.on('uren', 1)); regel(ctx, 'uren', 1640, 710, q.on('uren', 1), C.text, 30, 'right', 700); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'micro'); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); receptor7(ctx, rx, ry, ra, 0.8, { bind: 1, vorm: 1, gloed: 0.5, t });
    hormoonVorm(ctx, 360, 120, 1, 'adrenaline', 0); naamBij(ctx, 'adrenaline', 'eerste boodschapper', 420, 150, q.on('eerste', 1), 'left');
    const E = q.on('enzym', 1); const ex = 640, ey = arcY(MB.cx, MB.cy, MB.R, 640) + 90; kluwen(ctx, ex, ey, 54, { a: E, seed: 2, kleur: '#7A8BA8', aan: E, t }); naamBij(ctx, 'enzym', '', ex, ey + 100, E * (1 - q.on('kinase', 1)), 'center');
    // ATP → cAMP
    const A = q.on('ATP', 1); atp(ctx, 760, 560, 0.9, { a: A * (1 - q.on('cAMP', 1)) }); naamBij(ctx, 'ATP', '', 690, 620, A * (1 - q.on('cAMP', 1)), 'center');
    const nC = Math.floor(clamp((t - q.at('cAMP', 1)) * 3, 0, 18)); for (let i = 0; i < nC; i++) { const w = wander(i, t, 30, 0.6); const sp = clamp((t - q.at('verspreidt', 1)) / 3, 0, 1); camp(ctx, 760 + (i % 6) * 70 + w.x + sp * 60, 520 + Math.floor(i / 6) * 70 + w.y + sp * 60, 0.75, 1 - 0.6 * q.on('volgende', 1)); }
    naamBij(ctx, 'cAMP', 'tweede boodschapper', 1000, 470, q.on('tweede', 1) * (1 - q.on('volgende', 1)), 'left');
    // kinase met fosfaat
    const K = q.on('kinase', 1); const kx = 1240, ky = 700; const Zd = 1 - q.on('volgende', 1); kluwen(ctx, kx, ky, 58, { a: K * Zd, seed: 5, aan: q.on('kinase', 1), t }); naamBij(ctx, 'kinase', '', kx, ky + 110, K * (1 - q.on('volgende', 1)), 'center');
    const F = q.on('ATP', 2); const lu = clamp((t - q.at('zet', 3)) / 1.2, 0, 1); atp(ctx, 1385, 770, 0.75, { a: F * (1 - q.on('volgende', 1)), los: lu, lx: 1652, ly: 668 });
    kluwen(ctx, 1660, 720, 46, { a: F * (1 - q.on('volgende', 1)), seed: 9, kleur: '#9AA3B2', aan: q.on('gaat', 1) }); naamBij(ctx, 'ATP', '', 1390, 830, F * clamp(1 - lu * 2, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'eiwit', '', 1660, 640, F * clamp(1 - lu * 2, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'ADP', '', 1360, 830, F * clamp(lu * 2 - 1, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'P op het eiwit: aan', '', 1660, 830, F * clamp(lu * 2 - 1, 0, 1) * (1 - q.on('volgende', 1)), 'center');
    // cascade (vanaf 'Zo')
    const Z = q.on('volgende', 1); if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; const st = [[1080, 360, 1], [1080, 470, 3], [1080, 590, 9]]; const nu = clamp((t - q.at('volgende', 1)) / 4, 0, 1);
      // niets: kolom met steeds meer actieve eiwitten
      const rij = [[1, 1], [6, 8], [24, 12]]; rij.forEach(([n, per], k) => { const f = clamp(nu * 3 - k, 0, 1); for (let i = 0; i < n; i++) { const xx = 1500 - (Math.min(n, per) - 1) * 21 + (i % per) * 42, yy = [400, 470, 545][k] + Math.floor(i / per) * 38; kluwen(ctx, xx, yy, k === 2 ? 15 : 17, { a: f * clamp(nu * 3 * n / 2 - i * 1.5 / 2 - k * n / 2, 0, 1), seed: k * 3 + i, n: 11, aan: f, kleur: k === 2 ? SB_AFBRAAK : SB.kinase }); } });
      regel(ctx, 'steeds meer', 1180, 490, clamp(nu * 3 - 1, 0, 1), C.goud, 30, 'right', 700); naamBij(ctx, 'enzym dat glycogeen afbreekt', '', 1500, 660, clamp(nu * 3 - 2, 0, 1), 'center');
      const gk = q.on('glycogeen', 1), g = clamp((t - q.at('glucose', 1)) / 4, 0, 1); glycogeenKeten(ctx, 1260, 770, 1.6, gk, 1 - 0.75 * g);
      for (let i = 0; i < 40; i++) { const f = clamp(g * 4 - i * 0.08, 0, 1); if (f <= 0) continue; const w = wander(i + 50, t, 8, 0.6); glucose(ctx, lerp(1330, 1480 + (i % 10) * 36, f) + w.x, lerp(770, 720 + Math.floor(i / 10) * 34, f) + w.y, 11, f); }
      naamBij(ctx, 'glycogeen', '', 1100, 790, gk, 'right');
      tag(ctx, 'versterking bij elke stap', 760, 860, C.goud, q.on('versterkt', 1) * (1 - q.on('miljoenen', 1, 0.3)), 'center', 30); tag(ctx, '1 adrenaline → miljoenen glucose', 760, 860, C.goud, q.on('miljoenen', 1), 'center', 30); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'micro'); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); const los = q.on('los', 1, 1.2); receptor7(ctx, rx, ry, ra, 0.8, { bind: 1 - los + 0.001 > 0.01 ? 1 - los : 0, vorm: 1 - los, t });
    if (los > 0.01) hormoonVorm(ctx, rx + los * 120, ry - 120 - los * 120, 16, 'adrenaline', 1 - los * 0.6);
    for (let i = 0; i < 14; i++) { const w = wander(i, t, 30, 0.6); camp(ctx, 760 + (i % 7) * 80 + w.x, 500 + Math.floor(i / 7) * 80 + w.y, 0.75, 1); } naamBij(ctx, 'cAMP', 'nog in de cel', 560, 470, q.on('cAMP', 1), 'left');
    for (let i = 0; i < 5; i++) kluwen(ctx, 860 + i * 160, 740, 34, { seed: i * 2, n: 14, aan: 1, P: 1, t }); naamBij(ctx, 'aangezette eiwitten', '', 1180, 840, q.on('aangezette', 1), 'center');
    vraagteken(ctx, 1700, 560, q.on('Hoe', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord c: afbreken en fosfaat eraf', 1); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); receptor7(ctx, rx, ry, ra, 0.8, { t });
    const af = clamp((t - q.at('breekt', 1)) / 3, 0, 1); kluwen(ctx, 600, 560, 50, { seed: 13, kleur: C.koraal, aan: 0.3, t }); naamBij(ctx, 'enzym breekt cAMP af', '', 600, 670, q.on('breekt', 1), 'center');
    for (let i = 0; i < 14; i++) { const w = wander(i, t, 30, 0.6); const k = clamp(af * 14 - i, 0, 1); const x0 = 760 + (i % 7) * 80 + w.x, y0 = 470 + Math.floor(i / 7) * 80 + w.y; if (k < 0.5) camp(ctx, x0, y0, 0.75, 1 - k * 2); else amp(ctx, x0 + (k - 0.5) * 60, y0 + (k - 0.5) * 30, 0.55, (k - 0.5) * 2 * (1 - 0.5 * q.on('Die', 1))); }
    naamBij(ctx, 'AMP', 'ring opengeknipt', 1420, 450, af > 0.5 ? q.on('breekt', 1) * (1 - q.on('halen', 1)) : 0, 'left');
    const fe = clamp((t - q.at('halen', 1)) / 3, 0, 1); const fx = 800 + fe * 640; kluwen(ctx, fx, 680, 26, { a: q.on('halen', 1) * (1 - q.on('knop', 1)), seed: 17, kleur: C.groen, n: 13, aan: 0.4, t }); naamBij(ctx, 'ander enzym', 'haalt fosfaat eraf', fx, 620, q.on('halen', 1) * (1 - q.on('knop', 1)), 'center');
    for (let i = 0; i < 5; i++) { const ex = 860 + i * 160, f = clamp((fx - ex + 40) / 80, 0, 1); kluwen(ctx, ex, 740, 34, { seed: i * 2, n: 14, aan: 1 - f, t }); if (f < 1) fosfaat(ctx, ex - 24, 700, 9, 1); else fosfaat(ctx, ex - 24 + 6, 760 + 40, 9, 0.6); }
    naamBij(ctx, 'fosfaat eraf: eiwit uit', '', 1180, 840, q.on('uit', 1), 'center');
    tag(ctx, 'alleen aan zolang er een nieuw signaal komt', 1200, 210, C.goud, q.on('zolang', 1), 'center', 30); },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('receptor', 1, 0.8);
    if (C2 < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * C2, 0, 1); paneel(ctx, 560, 230, 800, 560, 'schaafwond, vergroot'); ctx.fillStyle = '#B5574A'; ctx.beginPath(); ctx.ellipse(960, 600, 300, 70, 0, 0, 6.283); ctx.fill();
      for (let i = 0; i < 6; i++) bloedplaatje(ctx, 760 + i * 80, 600 + (i % 2) * 20, 22, q.on('bloedplaatjes', 1)); naamBij(ctx, 'bloedplaatjes', '', 960, 720, q.on('bloedplaatjes', 1), 'center');
      for (let i = 0; i < 8; i++) { const f = clamp((t - q.at('groeifactor', 1)) * 0.8 - i * 0.1, 0, 1); hormoonVorm(ctx, 800 + i * 45, 560 - f * 200, 12, 'groei', f, C.groen); } naamBij(ctx, 'groeifactor', '', 960, 330, q.on('groeifactor', 1), 'center'); ctx.restore(); }
    // sig-3 (25 okt): bij 'Het laatste kinase gaat de kern in' zoomt het beeld uit naar de hele ronde cel; de kern ligt binnenin, het derde kinase gaat door een kernporie
    const Zm = q.on('laatste', 1, 1.4), ez = ease(Zm), P0 = [350, 210], P1 = [793, 230];
    if (C2 > 0.01 && Zm < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(2 * C2 - 1, 0, 1) * (1 - Zm); ctx.translate(lerp(P0[0], P1[0], ez), lerp(P0[1], P1[1], ez)); ctx.scale(lerp(1, 0.3, ez), lerp(1, 0.3, ez)); ctx.translate(-P0[0], -P0[1]);
      const sam = clamp((t - q.at('tegen', 1)) / 1.5, 0, 1); const P = t > q.at('fosfaatgroepen', 1) + 0.6 ? 2 : 0; const xa = 300 - 40 * (1 - sam), xb = 400 + 40 * (1 - sam); celRand(ctx, t, { gaten: [[xa, 12], [xb, 12]] });
      const [x1, y1, a1] = opRand(xa), [x2, y2, a2] = opRand(xb); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, P, aan: P ? 1 : 0, ligand: q.on('groeifactor', 2), t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, P, aan: P ? 1 : 0, ligand: q.on('groeifactor', 2), t });
      naamBij(ctx, 'receptor = kinase', '', 360, 160, q.on('kinase', 1) * (1 - Zm), 'center');
      const R = q.on('Ras', 1); rasSchakel(ctx, 620, 560, q.on('Ras', 2) > 0.5 ? 1 : 0, R, { t }); naamBij(ctx, 'Ras', 'schakelaar', 560, 680, R * (1 - Zm), 'center');
      const ks = [[900, 540], [1080, 600], [1260, 540]]; ks.forEach(([x, y], k) => { const f = clamp((t - q.at('rij', 1)) * 1.2 - k * 0.7, 0, 1); kluwen(ctx, x, y, 44, { a: f, seed: 20 + k, aan: f, P: f > 0.8 ? 1 : 0, t }); if (k) pijl(ctx, ks[k - 1][0] + 50, ks[k - 1][1] + (k === 1 ? 20 : -20), x - 50, y + (k === 1 ? -20 : 20), C.goud, f, 3, 12); });
      pijl(ctx, 680, 540, 850, 540, C.goud, q.on('rij', 1), 3, 12); naamBij(ctx, 'drie kinasen', '', 1080, 700, q.on('drie', 1) * (1 - Zm), 'center'); ctx.restore(); }
    if (Zm > 0.01) { ctx.save(); ctx.globalAlpha *= Zm; ctx.translate(lerp(P0[0], P1[0], ez), lerp(P0[1], P1[1], ez)); const sc = lerp(1 / 0.3, 1, ez); ctx.scale(sc, sc); ctx.translate(-P1[0], -P1[1]);
      const CX = 960, CY = 500, CR = 320, KX = 1060, KY = 560, KR = 105, uitR = q.on('uit', 1), LZ = clamp((Zm - 0.75) / 0.25, 0, 1); const dv = ease(clamp((t - q.at('deelt', 1) - 0.5) / 2.2, 0, 1)), D0 = 1 - q.on('deelt', 1, 0.5);
      if (dv < 0.01) { celHeel(ctx, CX, CY, CR, { t, gaten: [-2.25, -2.0] });
        [-2.25, -2.0].forEach((h, k) => receptorRTK(ctx, CX + Math.cos(h) * CR, CY + Math.sin(h) * CR, h + Math.PI / 2, 0.3, { a: D0, seed: 3 + k, P: 2, aan: 1, ligand: 1, t }));
        ctx.save(); ctx.translate(870, 300); ctx.scale(0.45, 0.45); rasSchakel(ctx, 0, 0, 1, D0, { t }); ctx.restore(); naamBij(ctx, 'Ras', '', 900, 262, D0 * LZ, 'left');
        kernDNA(ctx, KX, KY, KR, { tf: q.on('transcriptiefactoren', 1), aan: q.on('Genen', 1), t }); kernPorien(ctx, KX, KY, KR, [-2.4, -1.4, -0.4, 0.6, 1.7, 2.7]);
        const ks = [[900, 360], [940, 405], [968, 448]]; ks.forEach(([x, y], k) => { let xx = x, yy = y; if (k === 2) { const m = clamp((t - q.at('kern', 1) + 0.3) / 1.6, 0, 1), pr = [KX + Math.cos(-2.4) * KR, KY + Math.sin(-2.4) * KR * 0.9]; if (m < 0.5) { xx = lerp(x, pr[0], ease(m * 2)); yy = lerp(y, pr[1], ease(m * 2)); } else { xx = lerp(pr[0], KX - 45, ease(m * 2 - 1)); yy = lerp(pr[1], KY - 20, ease(m * 2 - 1)); } }
          kluwen(ctx, xx, yy, 16, { a: D0, seed: 20 + k, n: 12, aan: 1 - 0.85 * uitR, P: 1, t }); });
        naamBij(ctx, 'receptoren', '', 720, 190, D0 * LZ, 'right'); naamBij(ctx, 'kern', 'met kernporiën', KX - 60, KY + KR + 30, LZ * D0 * (1 - q.on('Genen', 1)), 'center');
        naamBij(ctx, 'genen voor celdeling aan', '', 1320, 560, q.on('Genen', 1) * D0, 'left'); }
      else { const d = 250 * dv, r = lerp(CR, 240, dv); for (const sd of [-1, 1]) celHeel(ctx, CX + sd * d, CY, r, { t, niet: [CX - sd * d, CY, r - 22] }); for (const sd of [-1, 1]) kernDNA(ctx, lerp(KX, CX + sd * 270, dv), lerp(KY, CY + 20, dv), lerp(KR, 72, dv), { t }); }
      tag(ctx, 'de cel deelt', 960, 120, C.goud, q.on('deelt', 1) * (1 - q.on('korte', 1)), 'center', 28); tag(ctx, 'Ras zet zichzelf weer uit', 960, 120, C.text2, q.on('korte', 1), 'center', 26); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); celRand(ctx, t, { gaten: [[300, 12], [400, 12]] }); const [x1, y1, a1] = opRand(300), [x2, y2, a2] = opRand(400);
    const B = q.on('blokkeert', 1); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, t });
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 270, 250 - (1 - B) * 80, 160, 46, 12); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2.5); ctx.restore(); } naamBij(ctx, 'medicijn blokkeert de receptor', '', 450, 250, B, 'left');
    rasSchakel(ctx, 620, 560, 1, 1, { vast: q.on('steeds', 1), t }); naamBij(ctx, 'Ras', 'mutatie: blijft aan', 560, 680, q.on('mutatie', 1), 'center');
    [[900, 540], [1080, 600], [1260, 540]].forEach(([x, y], k) => kluwen(ctx, x, y, 44, { seed: 20 + k, aan: 0.6, t }));
    kernDNA(ctx, 1590, 610, 125, { t }); vraagteken(ctx, 1590, 860, q.on('verwacht', 1), 100); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de cellen blijven delen', 1); const P = q.on('ongeveer', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * P, 0, 1); celRand(ctx, t, { gaten: [[300, 12], [400, 12]] }); const [x1, y1, a1] = opRand(300), [x2, y2, a2] = opRand(400); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, t });
      roundRect(ctx, 270, 250, 160, 46, 12); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2.5); rasSchakel(ctx, 620, 560, 1, 1, { vast: 1, t });
      const ks = [[900, 540], [1080, 600], [1260, 540]]; ks.forEach(([x, y], k) => kluwen(ctx, x, y, 44, { seed: 20 + k, aan: 1, P: 1, t })); kernDNA(ctx, 1590, 610, 125, { tf: 1, aan: 1, t });
      // sig-2 (25 okt): het defect zit in Ras; het signaal start ná de blokkade gewoon opnieuw (pulsen van Ras naar de kern)
      naamBij(ctx, 'defect in Ras', '', 620, 700, q.on('defect', 1, 0.4), 'center'); naamBij(ctx, 'medicijn', 'blokkeert de receptor', 450, 212, q.on('medicijn', 1, 0.4), 'left');
      const ST = q.on('start', 1, 0.4); if (ST > 0.01) { const pad = [[700, 560], ...ks, [1500, 600]]; for (let p = 0; p < 3; p++) { const u = ((t - q.at('start', 1)) * 0.45 + p / 3) % 1; const f = u * (pad.length - 1), i = Math.min(pad.length - 2, Math.floor(f)), r = f - i; circ(ctx, lerp(pad[i][0], pad[i + 1][0], r), lerp(pad[i][1], pad[i + 1][1], r) - 70, 11, rgba(C.goud, 0.9 * ST)); } } tag(ctx, 'route vast op aan', 1080, 820, C.koraal, q.on('vast', 1), 'center', 30);
      tag(ctx, 'film: Mutaties · proto-oncogen + mutatie = vastzittend gaspedaal', 1200, 200, C.teal, q.on('Mutaties', 1), 'center', 26); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * P - 1, 0, 1); metaA(ctx, 'MENSEN MET KANKER · RAS-MUTATIE', 200, 280, 1, C.grain, 'left', 26);
      for (let i = 0; i < 20; i++) popjeB(ctx, 260 + (i % 10) * 70, 420 + Math.floor(i / 10) * 110, 22, i % 5 === 0 ? C.koraal : '#5A6478', clamp((t - q.at('ongeveer', 1)) * 4 - i * 0.1, 0, 1));
      chip(ctx, 'ongeveer 1 op de 5', 590, 690, C.koraal, q.on('vijf', 1), 28);
      const O = q.on('onderzoeken', 1); paneel(ctx, 1120, 300, 640, 420, 'eerst onderzoeken', O); ctx.save(); ctx.globalAlpha *= O;
      ['receptor', 'Ras', 'kinasen', 'kern'].forEach((n, k) => { const yy = 400 + k * 70; roundRect(ctx, 1180, yy - 34, 360, 50, 10); shape(ctx, rgba(k === 1 ? C.koraal : C.fill, 0.5), k === 1 ? C.koraal : C.line, 2); text(ctx, n, 1210, yy, fTekst(28, 700), C.text, 'left'); if (k === 1) kruis(ctx, 1600, yy - 10, 14, 1); }); ctx.restore();
      tag(ctx, 'dan het medicijn kiezen', 1440, 790, C.goud, q.on('kiest', 1), 'center', 28); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('tabletje', 1, 0.8), D = q.on('Kim', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * K, 0, 1); const u = clamp((t - q.at('uitgewisseld', 1)) / 2, 0, 1);
      metaA(ctx, 'IN DE BLOEDCELLEN VAN OPA HENK', 160, 220, 1, C.grain, 'left', 26);
      chromosoom(ctx, 300, 300, 46, [[C.teal, 110, 1], [C.teal, 200 - 30 * u], [C.koraal, 70 * u]], 1, '9');
      chromosoom(ctx, 480, 300, 38, [[C.koraal, 34, 1], [C.koraal, 96 - 70 * u], [C.teal, 30 * u]], 1, '22'); naamBij(ctx, 'Philadelphia-chromosoom', 'korter', 530, 330, u, 'left'); tabletje(ctx, 160, 300, 1.4, 1 - q.on('chromosoom', 1));
      const G = q.on('vast', 1); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; roundRect(ctx, 640, 460, 200, 50, 10); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2); roundRect(ctx, 840, 460, 200, 50, 10); shape(ctx, rgba(C.teal, 0.6), C.teal, 2); text(ctx, 'BCR · 22', 740, 494, fTekst(24, 700), C.text, 'center'); text(ctx, 'ABL · 9', 940, 494, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
      naamBij(ctx, 'twee genen aan elkaar', 'fusiegen', 840, 570, G, 'center');
      kluwen(ctx, 840, 700, 56, { a: q.on('kinase', 1), seed: 31, kleur: '#B88A6A', aan: 1, P: 2, t }); naamBij(ctx, 'kinase dat nooit uitgaat', '', 840, 810, q.on('nooit', 1), 'center');
      for (let i = 0; i < 9; i++) { const f = clamp((t - q.at('witte', 1)) * 1.5 - i * 0.25, 0, 1); witteCel(ctx, 1260 + (i % 3) * 150, 340 + Math.floor(i / 3) * 150, 56, f, 1); }
      naamBij(ctx, 'witte bloedcellen blijven delen', '', 1410, 810, q.on('witte', 1), 'center'); tag(ctx, 'chronische myeloïde leukemie', 1410, 250, C.koraal, q.on('leukemie', 1), 'center', 28); ctx.restore(); }
    if (K > 0.01 && D < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(2 * K - 1, 0, 1) * clamp(1 - 2 * D, 0, 1); const R = q.on('Zonder', 1);
      kluwen(ctx, 760, 520, 150, { seed: 31, kleur: '#B88A6A', aan: 1 - R * 0.85, zak: true, n: 34, t }); const ix = lerp(1250, 760 + 150 * 0.55, ease(clamp((t - q.at('past', 1)) / 2, 0, 1)));
      remmer(ctx, ix - 20, 520 - 150 * 0.1, 1.1, 1); naamBij(ctx, 'remmer uit het tabletje', '', 860, 300, 1, 'center'); naamBij(ctx, 'plek voor ATP', '', 860, 700, q.on('ATP', 1), 'center');
      atp(ctx, 1300, 700, 0.9, { a: q.on('ATP', 1) }); kruis(ctx, 1300, 700, 30, R); tabletje(ctx, 1480, 260, 1.2, 1, 0.6); naamBij(ctx, 'tabletje', 'veel groter dan het molecuul', 1480, 330, 1, 'center');
      tag(ctx, 'geen fosfaatgroepen meer: het signaal stopt', 960, 850, C.goud, R, 'center', 28); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * D - 1, 0, 1); labTafel(ctx, 160, 640, 640, 1); labMicroscoop(ctx, 330, 640, 0.9, 1, -1, 1); persoon(ctx, 'kim', 620, 880, 470, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'lab' });
      naamBij(ctx, 'Dr. Kim', 'onderzoeker', 620, 330, 1, 'center');
      overleving(ctx, 1000, 400, 760, 1, Math.max(q.on('Vroeger', 1, 1.2), 0.0001) > 0.001 ? q.on('Vroeger', 1, 1.2) : 0, q.on('middel', 1, 1.5)); metaA(ctx, 'CHRONISCHE MYELOÏDE LEUKEMIE', 1000, 300, 1, C.text2, 'left', 22); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); ontbijt(ctx, t, { uitH: 'lacht', gloed: q.on('klein', 1) });
    const K = q.on('kettingreactie', 1); if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; roundRect(ctx, 560, 150, 800, 150, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5);
      hormoonVorm(ctx, 620, 225, 16, 'adrenaline', 1); const L = ['receptor', 'cAMP', 'kinasen', 'glucose']; L.forEach((n, k) => { const x = 720 + k * 150; pijl(ctx, x - 50, 225, x - 14, 225, C.goud, 1, 3, 10); chip(ctx, n, x + 50, 236, C.goud, 1, 22); }); ctx.restore(); }
    tag(ctx, 'één stap blokkeren', 960, 350, C.koraal, q.on('blokkeert', 1), 'center', 28); },
  s15(ctx, t, q) { bg(ctx, 'schema'); labTafel(ctx, 160, 640, 700, 1); labMicroscoop(ctx, 330, 640, 0.9, 1, -1, 1); persoon(ctx, 'kim', 680, 880, 470, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'lab' });
    regel(ctx, 'Biomedische wetenschappen', 1340, 300, q.on('Biomedische', 1), C.text, 48, 'center', 800);
    tag(ctx, 'bachelor · 3 jaar · universiteit', 1340, 410, C.teal, q.on('drie', 1), 'center', 32); regel(ctx, 'o.a. Nijmegen en Leiden', 1340, 480, q.on('Nijmegen', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'master · 2 jaar', 1340, 590, C.teal, q.on('master', 1), 'center', 32); regel(ctx, 'onderzoeksstages in het lab', 1340, 660, q.on('onderzoeksstages', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'hoe werken signaalroutes, en waar gaan ze kapot?', 960, 190, C.goud, q.on('kapotgaan', 1), 'center', 30); }
});
