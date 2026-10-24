// Wat word jij? · Laboratoriumtechniek 1 · Preparaat en microscoop — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Yasmin, stagiair-analist, outfit 'practicum').
// Rode draad: één stagedag van Yasmin in een onderzoekslab; dezelfde druppel kweekcellen aan het begin en in H4.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// Yasmin aan de microscoop op een labtafel; x = Yasmin, microscoop rechts van haar
function yasminLab(ctx, t, x, h, a = 1, o = {}) { if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; const s = h / 560;
  persoon(ctx, 'yasmin', x, 880, h, { t, outfit: 'practicum', kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  const ty = 880 - 250 * s; labTafel(ctx, x + 40 * s, ty, 360 * s);
  const m = lichtMicroscoop(ctx, x + 250 * s, ty, 0.62 * s, { obj: o.obj || 0, licht: o.licht == null ? 1 : o.licht, glas: o.glas == null ? 1 : o.glas });
  ctx.restore(); return m; }
const OOG = { x: 1340, y: 460, r: 300 };

Object.assign(SCENES, {
  title(ctx, t) { leverCoupe(ctx, 1560, 620, 250, t, {}); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const G = clamp((t - q.at('schuift', 1)) / 1.2, 0, 1), K = q.on('kijkt', 1, 0.5);
    yasminLab(ctx, t, 330, 560, 1, { uit: t > q.at('ziet', 1) ? 'verbaasd' : 'neutraal', glas: G });
    naamBij(ctx, 'Yasmin', 'stagiair-analist', 120, 240, 1 - K * 0.0);
    metaA(ctx, 'onderzoekslab · eerste opdracht', 1340, 120, q.on('onderzoekslab', 1), C.grain, 'center', 24);
    const F = 1 - K; kweekFles(ctx, 1150, 560, 1.4, F); naamBij(ctx, 'kweekfles', 'kweekcellen', 1150, 620, F * q.on('kweekfles', 1), 'center');
    const D = q.on('druppel', 1) * (1 - K); pipet(ctx, 1450, 420, 1.1, D, clamp((t - q.at('druppel', 1)) / 1, 0, 1)); glaasje(ctx, 1450, 560, 0.9, D * (1 - G), 0, 0); naamBij(ctx, 'glaasje', '', 1450, 650, D * (1 - G), 'center');
    kijkVeld(ctx, OOG.x, OOG.y, OOG.r, K, LICHTVELD, () => kweekCellen(ctx, OOG.x, OOG.y, OOG.r, { k: 0.05, t, hlRand: 0.15 * q.on('randjes', 1) }));
    metaA(ctx, 'door het oculair', OOG.x, OOG.y + OOG.r + 70, K, C.text2, 'center', 22);
    chip(ctx, 'bijna niets', 1760, 640, C.koraal, q.on('niets', 1) * (1 - q.on('kan', 1)), 28);
    vraagteken(ctx, OOG.x + OOG.r + 90, 320, q.on('kan', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ze laten bijna al het licht door', 1 - q.on('Eerst', 1));
    const B = q.on('Eerst', 1, 0.8), A = 1 - B;
    // A: waarom zie je niets? licht gaat er bijna ongehinderd doorheen
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      kijkVeld(ctx, 1380, 520, 300, 1, LICHTVELD, () => kweekCellen(ctx, 1380, 520, 300, { k: 0.05, t }));
      // een cel van opzij met een lichtbundel erdoor
      ctx.save(); ctx.globalAlpha *= q.on('water', 1); ctx.fillStyle = rgba('#FFF1B8', 0.5); ctx.fillRect(420, 260, 140, 540); ctx.fillStyle = rgba('#FFF1B8', 0.46); ctx.fillRect(420, 260, 140, 540); kweekCelLos(ctx, 490, 520, 120, 0.35); ctx.restore();
      pijl(ctx, 490, 820, 490, 760, C.goud, q.on('water', 1), 5, 18); pijl(ctx, 490, 280, 490, 220, C.goud, q.on('houden', 1), 5, 18);
      naamBij(ctx, 'vooral water', '', 640, 520, q.on('water', 1));
      naamBij(ctx, 'bijna al het licht', 'gaat erdoor', 640, 220, q.on('houden', 1));
      chip(ctx, 'te weinig contrast', 1380, 900 - 20, C.koraal, q.on('contrast', 1), 30);
      ctx.restore(); }
    if (B < 0.01) return;
    ctx.save(); ctx.globalAlpha *= B;
    const objI = t < q.at('sterker', 1) + 0.3 ? 0 : t < q.at('sterkste', 1) + 0.3 ? 2 : 3;
    const hl = t >= q.at('sterkste', 1) - 0.2 ? 'obj' : t >= q.at('oculair', 1) - 0.1 && t < q.at('objectief', 3) ? 'oc' : t >= q.at('objectief', 3) - 0.1 && t < q.at('Tien', 1) + 2 ? 'obj' : t >= q.at('fijne', 1) - 0.2 && t < q.at('vergroting', 1) ? 'fijn' : t >= q.at('grote', 1) - 0.2 && t < q.at('Daarna', 1) ? 'grof' : t >= q.at('kleinste', 1) - 0.2 && t < q.at('grote', 1) - 0.2 ? 'obj' : null;
    const grof = clamp((t - q.at('grote', 1)) / 1.6, 0, 1) * 4, fijn = clamp((t - q.at('fijne', 1)) / 1.2, 0, 1) * 3;
    const M = lichtMicroscoop(ctx, 560, 850, 1.22, { obj: objI, grof, fijn, hl, olie: q.on('olie', 1) });
    naamBij(ctx, 'objectief', OBJ[objI].v, M.obj.x + 70, M.obj.y + 10, (q.on('kleinste', 1) * (1 - q.on('oculair', 1, 0.3)) + q.on('objectief', 3) * (1 - q.on('puntjes', 1, 0.3)) + q.on('sterkste', 1)) > 0.01 ? Math.min(1, q.on('kleinste', 1) * (1 - q.on('oculair', 1, 0.3)) + q.on('objectief', 3) * (1 - q.on('puntjes', 1, 0.3)) + q.on('sterkste', 1)) : 0);
    naamBij(ctx, 'grote schroef', '', M.grof.x - 70, M.grof.y - 40, q.on('grote', 1) * (1 - q.on('fijne', 1, 0.3)), 'right');
    naamBij(ctx, 'fijne schroef', '', M.fijn.x - 70, M.fijn.y - 40, q.on('fijne', 1) * (1 - q.on('vergroting', 1, 0.3)), 'right');
    naamBij(ctx, 'oculair', '10×', M.oc.x - 30, M.oc.y - 30, q.on('oculair', 1) * (1 - q.on('puntjes', 1, 0.3)), 'right');
    naamBij(ctx, 'olie', '', M.tafel.x + 150, M.tafel.y + 60, q.on('olie', 1) * (1 - q.on('Stel', 2, 0.3)));
    // rechts: wat Yasmin ziet; daarna de twee puntjes
    const P = q.on('puntjes', 1, 0.6) * (1 - q.on('sterkste', 1, 0.6)), V = 1 - P;
    const scherp1 = clamp((t - q.at('grote', 1)) / 1.6, 0, 1), scherp2 = clamp((t - q.at('fijne', 1)) / 1.2, 0, 1);
    const zoom = objI === 0 ? 0.6 : objI === 2 ? 1.5 : 2.6, blur = objI === 0 ? 1 - scherp1 : objI === 2 ? 1 - scherp2 : 0;
    if (V > 0.01) kijkVeld(ctx, OOG.x, OOG.y, OOG.r, V, LICHTVELD, () => kweekCellen(ctx, OOG.x, OOG.y, OOG.r, { k: 0.3, blur, zoom, n: objI === 0 ? 30 : 14, t }));
    tag(ctx, 'vergroting = oculair × objectief', OOG.x, 860, C.goud, q.on('vergroting', 1) * (1 - q.on('puntjes', 1, 0.3)), 'center', 30);
    tag(ctx, '10 × 40 = 400×', OOG.x, 95, C.goud, q.on('Tien', 1) * (1 - q.on('puntjes', 1, 0.3)), 'center', 34);
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; roundRect(ctx, 1040, 200, 620, 560, 20); shape(ctx, LICHTVELD, C.line, 2);
      const d = lerp(240, 40, clamp((t - q.at('dichter', 1)) / 4.5, 0, 1)); puntjes(ctx, 1350, 470, d, 60, '#2A3446', 1);
      metaA(ctx, d > 120 ? 'twee puntjes' : 'één vlek', 1350, 700, 1, '#3A4458', 'center', 26);
      ctx.restore();
      tag(ctx, '< ongeveer 0,2 micrometer', 1350, 160, C.koraal, q.on('micrometer', 1) * P, 'center', 30);
      tag(ctx, 'oplossend vermogen', 1350, 860, C.goud, q.on('oplossend', 1) * P, 'center', 32); }
    tag(ctx, '10 × 100 = 1000×', OOG.x, 95, C.goud, q.on('duizend', 1), 'center', 34);
    const Z = q.on('Stel', 2); if (Z > 0.01) { tag(ctx, '× 2 ?', OOG.x + OOG.r - 10, OOG.y + OOG.r + 30, C.koraal, Z, 'center', 34); }
    vraagteken(ctx, 1810, 300, q.on('denk', 1), 100);
    ctx.restore(); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: groter beeld, geen extra details');
    const inner = (cx, cy, sc) => () => { ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc); kweekCelLos(ctx, 0, 0, 120, 0.8); for (let i = 0; i < 9; i++) { const an = i * 0.7, d = 40 + 30 * hash(i); for (let k = 5; k >= 1; k--) circ(ctx, Math.cos(an) * d, Math.sin(an) * d, 5 * k / 5 + 5, 'rgba(60,56,70,0.12)'); } ctx.restore(); };
    kijkVeld(ctx, 500, 470, 220, 1, LICHTVELD, inner(500, 470, 0.85)); metaA(ctx, '1000×', 500, 760, 1, C.text2, 'center', 26);
    pijl(ctx, 750, 470, 1080, 470, C.line, q.on('groter', 1), 5, 20);
    kijkVeld(ctx, 1400, 470, 280, q.on('groter', 1), LICHTVELD, inner(1400, 470, 2.0)); metaA(ctx, '2000×', 1400, 820, q.on('groter', 1), C.text2, 'center', 26);
    chip(ctx, 'wazig blijft wazig', 930, 410, C.koraal, q.on('wazige', 2), 26);
    tag(ctx, 'lege vergroting', 930, 600, C.koraal, q.on('lege', 1), 'center', 32);
    chip(ctx, 'meer zien: meer contrast', 930, 700, C.groen, q.on('contrast', 1), 26); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    const st = ['fixeren', 'ontwateren', 'inbedden', 'snijden'], ws = [['formaline', 1], ['water', 1], ['paraffine', 1], ['microtoom', 1]];
    const S0 = q.on('Yasmin', 1, 0.6);
    // stappenbalk bovenaan
    st.forEach((s2, i) => { const on = q.on(ws[i][0], ws[i][1]); const cur = i === 3 ? t >= q.at(ws[i][0]) : t >= q.at(ws[i][0]) && t < q.at(ws[i + 1][0]); chip(ctx, (i + 1) + '. ' + s2, 420 + i * 360, 150, cur ? C.goud : C.line, Math.max(0.25 * S0, on), 28); });
    // begin: een glaasje dat kleur krijgt
    glaasje(ctx, 960, 480, 2.2, 1 - S0, ramp(t, 0.6, 1.2), 1); chip(ctx, 'kleuren = contrast', 960, 700, C.goud, q.on('kleuring', 1) * (1 - S0), 30);
    if (S0 < 0.01) return; ctx.save(); ctx.globalAlpha *= S0;
    const fx = q.on('formaline', 1), Pf = 1 - q.on('Daarna', 1, 0.6), Pp = q.on('Daarna', 1, 0.6) * (1 - q.on('snijmachine', 1, 0.6)), Pm = q.on('snijmachine', 1, 0.6);
    // links het object van deze stap
    if (Pf > 0.01) { potje(ctx, 420, 560, 1.6, Pf, t, 1); naamBij(ctx, 'stukje lever', '', 420, 310, Pf * (1 - fx), 'center'); naamBij(ctx, 'formaline', '', 420, 790, Pf * fx, 'center');
      // rechts: inzoomen op de eiwitten
      const Z = q.on('knoopt', 1) * Pf; if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; roundRect(ctx, 820, 260, 1000, 560, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5);
        eiwitKetens(ctx, 1320, 520, 860, clamp((t - q.at('knoopt', 1)) / 1.8, 0, 1), t, 1); metaA(ctx, 'eiwitten in de cel · vergroot', 850, 300, 1, C.grain, 'left', 22);
        const E = q.on('enzymen', 1); const ex = lerp(1900, 1700, E), bx = lerp(1900, 1720, q.on('bacteriën', 1));
        knipEnzym(ctx, ex, 330 + 80, 1, E); staafBacterie(ctx, bx, 760, 1.1, 0.3, q.on('bacteriën', 1));
        kruis(ctx, 1700, 410, 30, q.on('afbreken', 1)); kruis(ctx, 1720, 760, 30, q.on('afbreken', 1));
        tag(ctx, 'vastgeknoopt', 1320, 880 - 10, C.goud, q.on('vast', 1), 'center', 28); ctx.restore(); }
      chip(ctx, 'cellen blijven in vorm', 420, 860, C.groen, q.on('vorm', 1) * Pf, 26); }
    if (Pp > 0.01) { const al = q.on('alcohol', 1); ctx.save(); ctx.globalAlpha *= Pp; kleurBak(ctx, 520, 560, 1.4, 1, '#C9D6E0', t); naamBij(ctx, 'alcohol', 'haalt het water eruit', 520, 760, al, 'center');
      paraffineBlok(ctx, 1300, 600, 2.0, q.on('paraffine', 1)); naamBij(ctx, 'paraffine', 'een soort kaarsvet', 1300, 790, q.on('paraffine', 1), 'center'); pijl(ctx, 760, 520, 960, 520, C.line, q.on('paraffine', 1), 5, 18);
      chip(ctx, 'stevig genoeg om te snijden', 1300, 300, C.groen, q.on('stevig', 1), 28); ctx.restore(); }
    if (Pm > 0.01) { ctx.save(); ctx.globalAlpha *= Pm; microtoom(ctx, 760, 700, 1.9, 1, t, clamp((t - q.at('snijdt', 1)) / 2.5, 0, 1), 1); naamBij(ctx, 'microtoom', 'snijmachine', 860, 280, q.on('microtoom', 1), 'center');
      tag(ctx, 'plakjes van ± 4 micrometer', 1450, 420, C.goud, q.on('vier', 1), 'center', 32); vraagteken(ctx, 1450, 700, q.on('Waarom', 1), 110); ctx.restore(); }
    ctx.restore(); },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: cellen liggen niet over elkaar', 1 - q.on('kleurt', 1));
    const K = q.on('kleurt', 1, 0.8), A = 1 - K;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const g = weefselBlok(ctx, 160, 260, 1040, 560, { band: 1, dik: q.on('stapel', 1) });
      naamBij(ctx, 'levercel', '20–30 micrometer', 1240, 360, q.on('levercel', 1));
      naamBij(ctx, 'plakje', '4 micrometer', 1240, g.by + 26, q.on('plakje', 1));
      chip(ctx, 'één laag cellen', 1500, 640, C.groen, q.on('laag', 1), 28); chip(ctx, 'geen stapel', 1500, 740, C.koraal, q.on('stapel', 1), 28);
      metaA(ctx, 'zijaanzicht · op schaal', 160, 860, 1, C.grain, 'left', 22); ctx.restore(); }
    if (K < 0.01) return; ctx.save(); ctx.globalAlpha *= K;
    const kk = clamp((t - q.at('Hematoxyline', 1)) / 2.2, 0, 1), rr = clamp((t - q.at('Eosine', 1)) / 2.0, 0, 1);
    kleurBak(ctx, 330, 640, 1.2, 1, HE.paars, t); naamBij(ctx, 'hematoxyline', 'DNA en RNA', 330, 780, q.on('Hematoxyline', 1), 'center');
    kleurBak(ctx, 660, 640, 1.2, 1, '#E06A8E', t); naamBij(ctx, 'eosine', 'eiwitten', 660, 780, q.on('Eosine', 1), 'center');
    const g = leverCoupe(ctx, 1320, 470, 330, t, { kern: kk, rest: rr, hlKern: q.on('kernen', 2) * (1 - q.on('celgrenzen', 1)), hlCel: q.on('celgrenzen', 1) * (1 - q.on('bloedvaatjes', 1)), hlVat: q.on('bloedvaatjes', 1) * (1 - q.on('coupe', 1)) });
    chip(ctx, 'kernen blauwpaars', 495, 330, HE.paars, q.on('blauwpaars', 1), 28); chip(ctx, 'de rest roze', 495, 410, '#E06A8E', q.on('roze', 1), 28);
    naamBij(ctx, 'coupe', 'gesneden en gekleurd plakje', 1320, 880 - 2, q.on('coupe', 1), 'center');
    ctx.restore(); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    const tF = q.at('beschijnt', 1), tE = q.at('Fijner', 1), tY = q.at('Yasmin', 2);
    const A = 1 - ramp(t, tF - 0.3, 0.6), Fv = ramp(t, tF - 0.3, 0.6) * (1 - ramp(t, tE - 0.3, 0.6)), Ev = ramp(t, tE - 0.3, 0.6) * (1 - ramp(t, tY - 0.55, 0.3)), Yv = ramp(t, tY - 0.2, 0.3);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; membraanStuk(ctx, 960, 1500, 1000, -2.25, -0.89, [-1.9, -1.57, -1.2], 1, -1.57);
      const b = clamp((t - q.at('antistof', 1)) / 2.0, 0, 1), ex = -1.57, px = 960 + Math.cos(ex) * 1050, py = 1500 + Math.sin(ex) * 1050;
      const ax = lerp(1500, px, b), ay = lerp(250, py - 40, b);
      antistof(ctx, ax, ay, 1.2, 3.1416, q.on('antistof', 1), q.on('lichtgevend', 1));
      naamBij(ctx, 'eiwit in het membraan', 'dit eiwit zoekt Yasmin', 1030, 360, q.on('eiwit', 1) * (1 - q.on('antistof', 1)));
      naamBij(ctx, 'antistof', 'past alleen op dit eiwit', ax - 70, ay + 20, q.on('antistof', 1), 'right');
      naamBij(ctx, 'lichtgevend label', '', ax + 50, ay - 90, q.on('lichtgevend', 1)); metaA(ctx, 'vergroot · niet op schaal', 120, 860, 1, C.grain, 'left', 22); ctx.restore(); }
    if (Fv > 0.01) { ctx.save(); ctx.globalAlpha *= Fv;
      // principe links: blauw erin, groen eruit, filter
      const g = clamp((t - q.at('andere', 1)) / 0.8, 0, 1), fl = q.on('filter', 1);
      roundRect(ctx, 200, 640, 360, 30, 8); shape(ctx, rgba('#DCEBF4', 0.4), '#AFC0D0', 2); antistof(ctx, 380, 600, 0.45, 3.1416, 1, 1); metaA(ctx, 'preparaat', 380, 720, 1, C.text2, 'center', 20);
      pijl(ctx, 260, 260, 340, 570, FL.blauw, q.on('beschijnt', 1), 8, 22); naamBij(ctx, 'licht van één kleur', '', 120, 230, q.on('beschijnt', 1));
      pijl(ctx, 420, 570, 500, 340, FL.groen, g, 8, 22); naamBij(ctx, 'licht van een andere kleur', '', 450, 300, g * (1 - fl * 0), 'left');
      roundRect(ctx, 420, 360, 220, 18, 4); shape(ctx, rgba(FL.groen, 0.35 * fl), rgba(FL.groen, fl), 2); naamBij(ctx, 'filter', 'laat alleen groen door', 660, 390, fl);
      kijkVeld(ctx, OOG.x + 80, OOG.y, OOG.r, q.on('Zo', 1), '#05080D', () => { fluorVeld(ctx, OOG.x + 80, OOG.y, OOG.r, q.on('Zo', 1), t); });
      tag(ctx, 'fluorescentie', OOG.x + 80, 95, C.goud, q.on('fluorescentie', 1), 'center', 34);
      tag(ctx, 'grens blijft ± 0,2 micrometer', OOG.x + 80, 850, C.koraal, q.on('grens', 1), 'center', 30); ctx.restore(); }
    if (Ev > 0.01) { ctx.save(); ctx.globalAlpha *= Ev;
      emKolom(ctx, 460, 880, 1.0, { bundel: q.on('elektronen', 1), vac: q.on('vacuüm', 1), t });
      naamBij(ctx, 'elektronenmicroscoop', '', 460, 150, 1, 'center'); naamBij(ctx, 'vacuüm', '', 730, 530, q.on('vacuüm', 1));
      const B = q.on('elektronen', 2, 0.6);
      kijkVeld(ctx, OOG.x + 40, OOG.y, OOG.r, B, '#D8D8D8', () => emBeeld(ctx, OOG.x + 40, OOG.y, OOG.r, { hlRibo: q.on('ribosomen', 1) * (1 - q.on('vacuüm', 1)), hlMito: q.on('plooien', 1) * (1 - q.on('vacuüm', 1)) }));
      naamBij(ctx, 'ribosomen', '', 1060, 260, q.on('ribosomen', 1) * (1 - q.on('vacuüm', 1)), 'right'); naamBij(ctx, 'plooien (cristae)', '', OOG.x + 40, OOG.y + OOG.r + 64, q.on('plooien', 1) * (1 - q.on('vacuüm', 1)), 'center');
      tag(ctx, 'details van ± 1 nanometer', OOG.x + 40, 95, C.goud, q.on('nanometer', 1), 'center', 30);
      const st = [['gefixeerd', 'gefixeerd'], ['ontwaterd', 'ontwaterd'], ['dunner', 'veel dunner gesneden'], ['metalen', 'zware metalen']];
      st.forEach(([w, s2], i) => chip(ctx, s2, 880, 250 + i * 66, C.teal, q.on(w, 1), 24));
      metaA(ctx, 'dode cellen', OOG.x + 40, 860, q.on('gefixeerd', 1), C.koraal, 'center', 24); ctx.restore(); }
    if (Yv > 0.01) { ctx.save(); ctx.globalAlpha *= Yv; persoon(ctx, 'yasmin', 460, 880, 560, { t, outfit: 'practicum', kijk: 1, pose: 'denk', uit: 'neutraal' });
      kijkVeld(ctx, 1200, 470, 280, 1, LICHTVELD, () => { kweekCelLos(ctx, 1200, 470, 230, 0.8); for (let i = 0; i < 7; i++) { const w = wander(i, t, 26, 0.4); const an = hash(i * 3) * 6.283, d = 70 + 90 * hash(i * 3 + 1); ctx.beginPath(); ctx.ellipse(1200 + Math.cos(an) * d + w.x, 470 + Math.sin(an) * d + w.y, 30, 12, hash(i) * 3 + t * 0.2, 0, 6.283); ctx.strokeStyle = 'rgba(90,86,76,0.75)'; ctx.lineWidth = 3; ctx.stroke(); } });
      metaA(ctx, 'mitochondriën in een levende cel', 1200, 820, 1, C.text2, 'center', 22);
      vraagteken(ctx, 1640, 300, q.on('denk', 1), 110); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: lichtmicroscoop met lichtgevend label');
    const L = q.on('levende', 1);
    paneel(ctx, 120, 260, 480, 440, 'elektronenmicroscoop', 1); kijkVeld(ctx, 360, 500, 150, 1, '#D8D8D8', () => emBeeld(ctx, 360, 500, 150, {})); kruis(ctx, 540, 320, 26, q.on('dood', 1)); metaA(ctx, 'dood', 360, 750, q.on('dood', 1), C.koraal, 'center', 24);
    paneel(ctx, 720, 260, 480, 440, 'gekleurde coupe', q.on('coupe', 1)); if (q.on('coupe', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('coupe', 1); leverCoupe(ctx, 960, 500, 150, t, {}); kruis(ctx, 1140, 320, 26, 1); metaA(ctx, 'ook dood', 960, 750, 1, C.koraal, 'center', 24); ctx.restore(); }
    paneel(ctx, 1320, 260, 480, 440, 'levende cel', L); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.fillStyle = '#05080D'; ctx.beginPath(); ctx.arc(1560, 500, 160, 0, 6.283); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(1560, 500, 160, 0, 6.283); ctx.clip(); levendeCel(ctx, 1560, 500, 140, t, q.on('lichtgevend', 1)); ctx.restore(); ctx.restore(); }
    chip(ctx, 'gen voor het label ingebouwd', 1560, 790, C.groen, q.on('gen', 1), 26); vink_(ctx, 1740, 320, 26, q.on('bewegen', 1)); },

  // ---------- H4 ----------
  s13(ctx, t, q) { bg(ctx, 'schema');
    const tT = q.at('Nu', 1), C1 = 1 - ramp(t, tT - 0.5, 0.3), C2 = ramp(t, tT - 0.2, 0.3);
    if (C1 > 0.01) { ctx.save(); ctx.globalAlpha *= C1;
      persoon(ctx, 'yasmin', 230, 880, 520, { t, outfit: 'practicum', kijk: 1, pose: t > q.at('acht', 1) ? 'wijs' : 'staan', uit: 'neutraal' });
      const ob = q.on('objectmicrometer', 1), cel = q.on('cel', 2);
      kijkVeld(ctx, 1260, 470, 340, 1, LICHTVELD, () => { kweekCellen(ctx, 1260, 470, 340, { k: 0.25 * (1 - ob), t, n: 10, seed: 5 }); oculairSchaal(ctx, 1260, 470, { oc: q.on('liniaaltje', 1), obj: ob * (1 - cel), cel, hlCel: q.on('acht', 1), pxDiv: 13 }); });
      naamBij(ctx, 'liniaaltje in het oculair', 'geen vaste lengte', 470, 320, q.on('liniaaltje', 1) * (1 - ob));
      naamBij(ctx, 'objectmicrometer', 'bekende schaal', 470, 320, ob * (1 - cel)); naamBij(ctx, 'eigen cellen eronder', 'objectmicrometer eruit', 470, 320, cel);
      chip(ctx, '100 µm = 40 streepjes', 680, 550, C.goud, q.on('veertig', 1), 28);
      chip(ctx, '1 streepje = 2,5 µm', 680, 640, C.goud, q.on('halve', 1), 28);
      chip(ctx, '8 × 2,5 = 20 µm', 680, 730, C.koraal, q.on('twintig', 1), 28);
      chip(ctx, 'ander objectief: opnieuw ijken', 680, 830, C.teal, q.on('opnieuw', 1), 26); ctx.restore(); }
    if (C2 > 0.01) { ctx.save(); ctx.globalAlpha *= C2;
      telkamerZij(ctx, 110, 330, 720, { vloei: q.on('vult', 1), maat: q.on('diep', 1) }); naamBij(ctx, 'telkamer', 'zijaanzicht', 470, 220, 1, 'center');
      chip(ctx, '0,1 millimeter diep', 470, 430, C.goud, q.on('diep', 1), 26);
      const R = 1, hl = q.on('vierkant', 1), n = clamp((t - q.at('telt', 1)) / 1.4, 0, 1) * 50;
      kijkVeld(ctx, 1300, 470, 340, R, LICHTVELD, () => telRaster(ctx, 1300, 470, 200, { hl, n, t }));
      metaA(ctx, 'gele vierkant: 1 × 1 millimeter', 1300, 880 - 30, hl, C.text2, 'center', 22);
      tag(ctx, '1 × 1 × 0,1 mm = 0,1 microliter', 470, 590, C.goud, q.on('microliter', 1), 'center', 28);
      tag(ctx, '50 cellen', 470, 690, C.goud, q.on('vijftig', 1), 'center', 30);
      chip(ctx, 'hoeveel per milliliter?', 470, 790, C.text2, q.on('Hoeveel', 1), 28); vraagteken(ctx, 1700, 170, q.on('denk', 1), 90); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vijfhonderdduizend');
    regel(ctx, '50 cellen in 0,1 microliter', 140, 330, 1, C.text, 44, 'left', 700);
    regel(ctx, '= 500 per microliter', 140, 430, q.on('vijfhonderd', 1), C.text, 44, 'left', 700);
    regel(ctx, '1 milliliter = 1000 microliter', 140, 560, q.on('duizend', 1), C.text2, 40, 'left', 600);
    tag(ctx, '500 000 per milliliter', 420, 700, C.goud, q.on('vijfhonderdduizend', 1), 'center', 40);
    kijkVeld(ctx, 1400, 470, 340, 1, LICHTVELD, () => telRaster(ctx, 1400, 470, 200, { hl: 1, n: 50, extra: q.on('vierkanten', 1), t }));
    chip(ctx, 'meer vierkanten tellen → gemiddelde', 1400, 880 - 30, C.teal, q.on('vierkanten', 1), 26); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const Kd = q.on('analist', 1, 0.8);
    const m = yasminLab(ctx, t, 230, 520, 1 - Kd * 0.0, { uit: 'blij' });
    kijkVeld(ctx, 1300, 380, 220, 1 - Kd, LICHTVELD, () => kweekCellen(ctx, 1300, 380, 220, { k: 0.05, t }));
    chip(ctx, 'te klein', 1180, 700, C.koraal, q.on('klein', 1) * (1 - Kd), 28); kruis(ctx, 1290, 690, 18, q.on('klein', 1) * (1 - Kd));
    chip(ctx, 'te weinig contrast', 1440, 780, C.groen, q.on('tegenhouden', 1) * (1 - Kd), 28);
    if (Kd > 0.01) { const y = 470, w = 360, h = 360;
      kaartje(ctx, 900, y, w, h, 'kleuring', 'lichtmicroscoop', HE.rozeR, q.on('kleuring', 1), (x, yy) => leverCoupe(ctx, x, yy, 100, t, {}));
      kaartje(ctx, 1290, y, w, h, 'lichtgevend label', 'fluorescentie', FL.groen, q.on('label', 1), (x, yy) => { ctx.fillStyle = '#05080D'; ctx.beginPath(); ctx.arc(x, yy, 100, 0, 6.283); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x, yy, 100, 0, 6.283); ctx.clip(); fluorVeld(ctx, x, yy, 100, 1, t); ctx.restore(); });
      kaartje(ctx, 1680, y, w, h, 'zware metalen', 'elektronenmicroscoop', C.line, q.on('metalen', 1), (x, yy) => kijkVeld(ctx, x, yy, 92, 1, '#D8D8D8', () => emBeeld(ctx, x, yy, 92, {})));
      tag(ctx, 'een analist maakt contrast', 1290, 200, C.goud, Kd, 'center', 32); } },

  s17(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 230, 880, 560, { t, outfit: 'practicum', kijk: 1, uit: 'blij', pose: t > q.at('Analisten', 1) ? 'wijs' : 'staan' });
    const kaart = (x, y, niv, naam, sub, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 800, 150, 18); shape(ctx, rgba(col, 0.12), col, 2.5); metaText(ctx, niv, x + 30, y + 46, col, 'left', 24); text(ctx, naam, x + 30, y + 96, fTekst(36, 800), C.text, 'left'); text(ctx, sub, x + 30, y + 134, fTekst(26, 600), C.text2, 'left'); ctx.restore(); };
    kaart(560, 190, 'mbo', 'biologisch-medisch analist', 'laboratoriumtechniek · niveau 4 · 4 jaar', C.teal, q.on('mbo', 1));
    kaart(560, 380, 'hbo', 'Biologie en medisch laboratoriumonderzoek', '4 jaar', C.goud, q.on('hbo', 1));
    const wp = [['ziekenhuizen', 'ziekenhuizen'], ['bedrijven', 'bedrijven'], ['onderzoeksinstituten', 'onderzoeksinstituten'], ['milieulabs', 'voedsel- en milieulabs']];
    wp.forEach(([w, s2], i) => chip(ctx, s2, 700 + (i % 2) * 400 + (i === 3 ? 0 : 0), 640 + Math.floor(i / 2) * 80, C.line, q.on(w, 1), 28));
    ziekenhuisje(ctx, 1560, 800, 1.1, q.on('ziekenhuislab', 1)); metaA(ctx, 'volgende film: het ziekenhuislab', 1560, 860, q.on('ziekenhuislab', 1), C.grain, 'center', 20); },
});
