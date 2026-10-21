// Wat word jij? · Fysiotherapie 1 · Wat is er met die knie? — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Fysiotherapeut Femke, Lotte).
// Rode draad: één knie, van verhaal tot plan.

Object.assign(SCENES, {
  title(ctx, t) { knieVoor(ctx, 1400, 520, 0.85, 1, { hl: { acl: 0.6 + 0.4 * Math.sin(t * 1.5) }, knieschijf: 0.6, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('Twee', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; veld(ctx); const dr = q.on('draait', 1, 0.6), pl = q.on('plop', 1, 0.4);
      bal(ctx, 1160 - 260 * dr, 830 - 40 * Math.sin(dr * 3.14), 34, 1, dr * 6);
      persoon(ctx, 'lotte', 960, 870, 470, { t, outfit: 'sport', kijk: dr > 0.5 ? -1 : 1, pose: dr > 0.5 ? 'schouders' : 'staan', uit: pl > 0.5 ? 'verbaasd' : 'blij' });
      naamBij(ctx, 'Lotte', 'voetbal', 1080, 330, q.on('Lotte', 1));
      const K = kniePunt('lotte', 960, 870, 470, 1); tag(ctx, 'voet blijft staan', 1250, 600, C.oker, q.on('voet', 1), 'left', 28);
      flits(ctx, K.x, K.y, 60, pl * (1 - q.on('uur', 1))); tag(ctx, 'plop', K.x + 70, K.y - 50, C.koraal, pl, 'left', 30);
      dikkeKnie(ctx, 'lotte', 960, 870, 470, 1, q.on('dik', 1, 1.5)); klokje(ctx, 1500, 300, 60, q.on('uur', 1, 1.2), q.on('uur', 1)); tag(ctx, 'binnen een uur dik', 1500, 410, C.koraal, q.on('uur', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; praktijk(ctx); metaA(ctx, 'TWEE DAGEN LATER', 160, 200, P, C.grain, 'left', 28);
      persoon(ctx, 'lotte', 900, 860, 450, { t, kijk: 1, uit: 'neutraal' }); dikkeKnie(ctx, 'lotte', 900, 860, 450, 1, 1);
      persoon(ctx, 'femke', 1420, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1480, 330, q.on('Femke', 1));
      document_(ctx, 360, 470, 1.1, C.text2, q.on('verwijzing', 1)); kruis(ctx, 400, 520, 50, q.on('verwijzing', 1, 0.5)); tag(ctx, 'zonder verwijzing', 400, 680, C.teal, q.on('verwijzing', 1), 'center', 28);
      vraagteken(ctx, 1180, 300, q.on('denk', 1), 100); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); praktijk(ctx);
    persoon(ctx, 'lotte', 1180, 860, 440, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'femke', 1620, 860, 470, { t, outfit: 'werk', kijk: -1, pose: q.on('alarmsignalen', 1) > 0.5 && q.on('Lotte', 2) < 0.5 ? 'denk' : 'staan', uit: 'neutraal' });
    regel(ctx, 'anamnese', 120, 230, q.on('anamnese', 1), C.goud, 52, 'left', 700); metaA(ctx, 'HET GESPREK', 124, 272, q.on('anamnese', 1));
    const AL = q.on('alarmsignalen', 1), V = q.on('verhaal', 1, 0.8);
    if (AL > 0.01) { ctx.save(); ctx.globalAlpha *= AL * (1 - V); metaA(ctx, 'ALARMSIGNALEN', 120, 360, 1, C.koraal);
      checkRij(ctx, 'koorts, rode warme knie', 120, 440, q.on('koorts', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null); tag(ctx, 'infectie?', 640, 425, C.koraal, q.on('infectie', 1), 'left', 26);
      checkRij(ctx, 'knie staat scheef', 120, 520, q.on('scheef', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null);
      checkRij(ctx, 'helemaal niet kunnen staan', 120, 600, q.on('helemaal', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null);
      tag(ctx, '→ naar de arts', 330, 690, C.koraal, q.on('arts', 1) * (1 - q.on('Lotte', 2)), 'center', 28); ctx.restore(); }
    notitie(ctx, 140, 360, 560, [['draaien, voet op de grond', q.on('draaien', 1)], ['plop', q.on('plop', 1)], ['binnen een uur dik', q.on('snel', 1)]], V);
    dikkeKnie(ctx, 'lotte', 1180, 860, 440, 1, 1); vraagteken(ctx, 900, 330, q.on('opzwelt', 1), 100); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c');
    const tl = q.on('ontsteking', 1); paneel(ctx, 120, 230, 700, 300, '', tl); metaA(ctx, 'HOE SNEL WORDT HET DIK?', 150, 280, tl);
    balk(ctx, 160, 330, 560, 0.08, C.koraal, 'bloed: binnen een uur', q.on('snel', 1)); balk(ctx, 160, 430, 560, 0.7, C.teal, 'ontsteking: uren tot een dag', tl);
    knieVoor(ctx, 1320, 470, 0.72, q.on('gescheurd', 1), { acl: q.on('kruisband', 1, 1.2), bloed: q.on('bloedvaatjes', 1, 1.2), hl: { acl: q.on('kruisband', 1) }, t });
    naamBij(ctx, 'voorste kruisband', 'gescheurd', 1420, 300, q.on('kruisband', 1));
    persoon(ctx, 'lotte', 1000, 870, 300, { t, outfit: 'sport', kijk: 1, uit: 'neutraal', a: q.on('meisjes', 1, 0.3) }); tag(ctx, 'meisjes die voetballen: vaker', 1000, 540, C.goud, q.on('meisjes', 1), 'center', 28); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const kb = q.on('kruisbanden', 1), vk = q.on('voorste', 1), me = q.on('halve', 1), bv = q.on('buitenrand', 1);
    knieVoor(ctx, 960, 470, 0.78, 1, { hl: { acl: vk * (1 - me), pcl: kb * (1 - vk), menis: me * (1 - bv * 0.3), zij: q.on('banden', 1) * (1 - kb) }, dim: 0, t });
    verwijs(ctx, 'Skelet en spieren', 360, 200, q.on('Skelet', 1) * (1 - kb));
    naamBij(ctx, 'zijband', '', 1110, 330, q.on('banden', 1) * (1 - kb * 0.6), 'left');
    naamBij(ctx, 'kruisbanden', 'twee, schuin over elkaar', 1110, 470, kb, 'left'); naamBij(ctx, 'dijbeen', '', 1020, 170, q.on('dijbeen', 1), 'left'); naamBij(ctx, 'scheenbeen', '', 1020, 760, q.on('scheenbeen', 1), 'left');
    if (vk > 0.01) { pijl(ctx, 620, 640, 620, 560, C.goud, vk * (1 - me), 6, 20); tag(ctx, 'houdt het scheenbeen tegen', 520, 690, C.goud, vk * (1 - me), 'center', 26); }
    naamBij(ctx, 'meniscus', 'schokdemper van kraakbeen', 520, 470, me, 'center');
    if (bv > 0.01) { ctx.save(); ctx.globalAlpha *= bv; ctx.strokeStyle = WKF.bloed; ctx.lineWidth = 4; for (const k of [-1, 1]) for (let i = 0; i < 4; i++) { const bx = 960 + k * (122 + i * 6) * 0.78; ctx.beginPath(); ctx.moveTo(bx, 470 + 10); ctx.lineTo(bx + k * 10, 470 + 26); ctx.stroke(); } ctx.restore();
      tag(ctx, 'alleen de buitenrand heeft bloedvaten', 960, 860, C.koraal, bv, 'center', 28); }
    verwijs(ctx, 'Hoe weefsel herstelt', 1560, 200, q.on('weefsel', 1)); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('test', 1, 0.8), M = q.on('hoekmeter', 1);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; const g1 = 140 * clamp((t - q.at('gezonde', 1)) / 1.2, 0, 1), g2 = 100 * clamp((t - q.at('dikke', 1)) / 1.2, 0, 1);
      buigBeen(ctx, 620, 440, 0.8, g1, M, { col: C.groen }); naamBij(ctx, 'gezonde knie', '', 420, 260, q.on('gezonde', 1), 'center');
      buigBeen(ctx, 1440, 440, 0.8, g2, q.on('dikke', 1), { dik: 1, col: C.koraal }); naamBij(ctx, 'dikke knie', '', 1240, 260, q.on('dikke', 1), 'center');
      metaA(ctx, 'HOEKMETER', 160, 160, M); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; const sch = clamp((t - q.at('trekt', 1)) / 1.2, 0, 1), zacht = q.on('Lotte', 1); const sx = zacht > 0.5 ? sch * 1 : sch * 0.25;
      knieZij(ctx, 960, 460, 1, 1, { schuif: (q.on('andere', 1) > 0.5 ? 0.25 * (0.5 + 0.5 * Math.sin(t * 3)) : sx), scheur: zacht > 0.5 && q.on('andere', 1) < 0.5 ? 1 : 0, t });
      naamBij(ctx, 'dijbeen', '', 560, 330, q.on('dijbeen', 1), 'center'); naamBij(ctx, 'scheenbeen', '', 1340, 760, q.on('scheenbeen', 1), 'center');
      tag(ctx, 'harde stop', 1500, 300, C.groen, q.on('harde', 1) * (1 - zacht), 'center', 30); tag(ctx, 'schuift door · zachte stop', 1500, 300, C.koraal, zacht * (1 - q.on('andere', 1)), 'center', 30);
      tag(ctx, 'andere knie', 1500, 300, C.teal, q.on('andere', 1), 'center', 30); metaA(ctx, 'TEST VAN DE KRUISBAND', 160, 200, 1); vraagteken(ctx, 1500, 200, q.on('Waarom', 1), 90); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('perfect', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; knieZij(ctx, 560, 470, 0.62, q.on('soepele', 1), { schuif: 0.55, handen: 0, t }); knieZij(ctx, 1380, 470, 0.62, q.on('soepele', 1), { schuif: 0.55, handen: 0, t });
      naamBij(ctx, 'van nature soepel', 'links', 560, 260, q.on('soepele', 1), 'center'); naamBij(ctx, 'van nature soepel', 'rechts', 1380, 260, q.on('soepele', 1), 'center');
      tag(ctx, 'geen verschil = waarschijnlijk heel', 960, 760, C.groen, q.on('verschil', 1), 'center', 30); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; metaA(ctx, 'VAN DE HONDERD SCHEUREN VINDT DE TEST ER ONGEVEER', 160, 230, q.on('vindt', 1));
      stippen(ctx, 180, 290, 100, Math.round(85 * q.on('vijfentachtig', 1, 1.5)), C.groen, q.on('vindt', 1), 20, 13, 36); regel(ctx, '85', 960, 420, q.on('vijfentachtig', 1), C.groen, 90, 'left', 800);
      const c = q.on('combineert', 1); chip(ctx, 'verhaal', 300, 760, C.teal, c); chip(ctx, 'zwelling', 560, 760, C.teal, q.on('zwelling', 1)); chip(ctx, 'meerdere testen', 860, 760, C.teal, q.on('testen', 1)); pijl(ctx, 1020, 760, 1180, 760, C.goud, q.on('conclusie', 1)); chip(ctx, 'conclusie', 1300, 760, C.goud, q.on('conclusie', 1));
      persoon(ctx, 'femke', 1680, 860, 440, { t, outfit: 'werk', kijk: -1, pose: 'denk', uit: 'neutraal' }); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('regels', 1, 0.8), B = q.on('denkt', 1, 0.8);
    rontgen(ctx, 420, 470, 0.95, q.on('foto', 1) * (1 - B), { spook: q.on('banden', 1) });
    naamBij(ctx, 'botten: zichtbaar', '', 420, 160, q.on('botten', 1) * (1 - B), 'center'); tag(ctx, 'banden: niet zichtbaar', 420, 830, C.goud, q.on('banden', 1) * (1 - B), 'center', 28);
    if (R * (1 - B) > 0.01) { ctx.save(); ctx.globalAlpha *= R * (1 - B); metaA(ctx, 'ALLEEN EEN FOTO ALS …', 820, 220, 1); const n = q.on('Lotte', 1) > 0.5 ? 'nee' : null;
      checkRij(ctx, 'ouder dan 55', 820, 310, q.on('vijfenvijftig', 1), n); checkRij(ctx, 'geen vier stappen lopen', 820, 390, q.on('stappen', 1), n);
      checkRij(ctx, 'niet tot 90° buigen', 820, 470, q.on('buigen', 1), n); checkRij(ctx, 'drukpijn op een plekje bot', 820, 550, q.on('drukt', 1), n);
      tag(ctx, 'Lotte: geen foto nodig', 1060, 640, C.groen, q.on('Lotte', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; knieVoor(ctx, 460, 470, 0.6, 1, { acl: 1, hl: { acl: 1 }, t }); persoon(ctx, 'femke', 1000, 860, 470, { t, outfit: 'werk', kijk: 1, pose: 'wijs', uit: 'neutraal' });
      persoon(ctx, 'kim', 1500, 860, 470, { t, outfit: 'werk', kijk: -1, uit: 'neutraal', a: q.on('huisarts', 1, 0.3) }); naamBij(ctx, 'huisarts', '', 1560, 330, q.on('huisarts', 1));
      vraagteken(ctx, 1240, 300, q.on('geopereerd', 1), 100); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const P = q.on('revalidatie', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; knieVoor(ctx, 380, 500, 0.55, 1, { acl: 1, t }); tag(ctx, 'groeit meestal niet netjes terug', 380, 830, C.koraal, q.on('terug', 1), 'center', 26);
      const sp = q.on('spieren', 1); if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; ctx.fillStyle = rgba('#B8564E', 0.75); ctx.beginPath(); ctx.ellipse(380 - 105, 500 - 150, 34, 120, 0.1, 0, 6.283); ctx.ellipse(380 + 105, 500 - 150, 34, 120, -0.1, 0, 6.283); ctx.fill(); ctx.restore(); naamBij(ctx, 'sterke spieren', 'geven stabiliteit', 560, 330, sp, 'left'); }
      metaA(ctx, 'TWEE ROUTES', 820, 260, q.on('onderzoek', 1)); tag(ctx, 'trainen', 960, 360, C.groen, q.on('operatie', 1), 'center', 34); pijl(ctx, 1060, 360, 1280, 360, C.line, q.on('zakt', 1)); tag(ctx, 'blijft instabiel of veel draaien → alsnog operatie', 1300, 440, C.oker, q.on('alsnog', 1), 'center', 26);
      tag(ctx, 'lang niet iedereen een operatie nodig', 1200, 560, C.teal, q.on('iedereen', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; praktijk(ctx); persoon(ctx, 'lotte', 1260, 860, 440, { t, outfit: 'sport', kijk: 1, pose: q.on('oefent', 1) > 0.5 ? 'handenHeup' : 'staan', uit: 'blij' }); persoon(ctx, 'femke', 1640, 860, 470, { t, outfit: 'werk', kijk: -1, pose: 'wijs', uit: 'blij' });
      kalender(ctx, 160, 260, 12, Math.round(12 * clamp((t - q.at('drie', 1)) / 4, 0, 1)), 'drie keer per week', q.on('oefent', 1), 6, C.groen);
      const u = q.on('stap', 1, 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.globalAlpha *= u; ctx.beginPath(); ctx.moveTo(180, 820); for (let i = 0; i < 6; i++) { ctx.lineTo(180 + i * 100, 820 - i * 40); ctx.lineTo(280 + i * 100, 820 - i * 40); } ctx.stroke(); metaA(ctx, 'BELASTING STAP VOOR STAP', 180, 590, 1); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body) => card(ctx, 140 + i * 420, 260, 380, 220, tit, body, q.on(w0, 1), [C.teal, C.koraal, C.goud, C.groen][i]);
    regel(ctx, 'denken als een detective', 140, 190, q.on('detective', 1), C.text, 48, 'left', 700);
    kaart(0, 'verhaal', 'luisteren', 'wat gebeurde er?'); kaart(1, 'alarmsignalen', 'alarmsignalen', 'hoort het bij mij?'); kaart(2, 'testen', 'testen', 'en vergelijken'); kaart(3, 'plan', 'beslissen', 'een plan op maat');
    const V = q.on('veld', 1, 0.8); if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; ctx.fillStyle = KN.gras; ctx.fillRect(0, 700, W, 180); ctx.restore(); persoon(ctx, 'lotte', 960, 870, 330, { t, outfit: 'sport', uit: 'lacht', pose: 'wijsOmhoog', a: V }); bal(ctx, 1080, 850, 24, V); metaA(ctx, 'NA MAANDEN', 1100, 600, V); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    tag(ctx, 'fysiotherapie: hbo · vier jaar', 480, 260, C.teal, q.on('hbo', 1), 'center', 30); tag(ctx, 'bijvoorbeeld HAN Nijmegen', 480, 330, C.text2, q.on('HAN', 1), 'center', 26);
    tag(ctx, 'stage: praktijk', 480, 470, C.goud, q.on('praktijk', 1), 'center', 28); tag(ctx, 'ziekenhuis', 480, 540, C.goud, q.on('ziekenhuis', 1), 'center', 28); tag(ctx, 'revalidatiecentrum', 480, 610, C.goud, q.on('revalidatiecentrum', 1), 'center', 28);
    tag(ctx, 'bewegingswetenschappen: universiteit', 1450, 470, C.paars, q.on('bewegingswetenschappen', 1), 'center', 30); },
});
const WKF = { bloed: '#B23A3A' };
