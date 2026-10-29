// Ecologie v2 · film 5 Waarom zo weinig roofdieren? — storyboard: één keyframe per scène (29 okt 2026)
// Kleuren: energie goud · warmte/dissimilatie koraal · productie groen · feces/voer oker · stoffen grijs. Macro-nacht; 2 px/cm in de weilandscènes (koe ± 2,4 m, mens 1,80 m).
const _F5 = 5;
const e5PX = 2; // px per cm
function e5Koe(ctx, x, y, o = {}) { koe7(ctx, x, y, e5PX / 1.7, o); }
function e5Gerrit(ctx, x, y, o = {}) { return persoon(ctx, 'gerrit', x, y, 180 * e5PX / 1.02, o); }
function e5Vraag(ctx, regels, opties) { ecoVraagKaart(ctx, regels, opties, _F5); }
function e5Pijl(ctx, x1, y1, x2, y2, kl = C.line, lw = 3) { pijl(ctx, x1, y1, x2, y2, kl, 1, lw, 18); }

const SB5 = {
  // ================= OPENING =================
  e5s01(ctx) { e5Weiland(ctx, { slootY: 780 }); ecoTag(ctx, _F5, 'OPENING');
    e5Koe(ctx, 520, 700, { houding: 'grazen' }); e5Koe(ctx, 1060, 640, { houding: 'staan', kijk: -1 });
    muis(ctx, 1320, 770, 6, { houding: 'staan' }); ecoSpitsmuis(ctx, 1560, 772, 6, { houding: 'snuffelen', t: 0.3 }); muis(ctx, 1730, 768, 6, { kijk: -1 });
    naamBij(ctx, 'muizen en spitsmuizen', 'honderden per hectare', 1530, 680, 1, 'center'); ecoSchaal(ctx, 'muizen en spitsmuis 3× vergroot'); },
  e5s02(ctx) { e5Weiland(ctx, { horizon: 430, slootY: 820, bomen: true }); ecoTag(ctx, _F5, 'OPENING');
    for (const [x, y] of [[300, 600], [420, 640], [760, 590], [1180, 620], [1300, 650]]) koe7(ctx, x, y, 0.5 / 1.7, { houding: 'grazen' });
    ctx.strokeStyle = E5.sloot; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 700); ctx.lineTo(1920, 690); ctx.stroke();
    ecoVos(ctx, 1560, 700, 0.9, { houding: 'staan', kijk: -1 }); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1560, 660, 70, 0, 6.283); ctx.stroke();
    naamBij(ctx, 'één vos', '100–400 hectare leefgebied', 1640, 470, 1, 'center', C.goud); text(ctx, '?', 960, 330, fTitel(160), C.goud, 'center'); },
  e5s03(ctx) { ecoTitelKaart(ctx, _F5, 'Waarom zo weinig roofdieren?', ['Op een weiland honderden muizen.', 'In de hele polder één vos.'], (c) => {
    e5Piramide(c, 1460, 880, [[680, C.groen, null], [380, C.oker, null], [130, C.koraal, null]], { h: 150 });
    for (const x of [1200, 1330, 1460, 1590, 1720]) grasPol(c, x, 850, 1.6);
    muis(c, 1380, 708, 7); muis(c, 1540, 708, 7, { kijk: -1 }); ecoVos(c, 1460, 562, 1.1, { houding: 'staan' }); }); },

  // ================= H1 HET GRAS =================
  e5s04(ctx) { e5Weiland(ctx, { slootY: 820 }); ecoTag(ctx, _F5, 'HET GRAS');
    e5Hek(ctx, 140, 1080, 800); e5Gerrit(ctx, 1260, 820, { uit: 'neutraal', pose: 'wijs', kijk: -1 });
    e5Boek(ctx, 1420, 150, 440, 300, 'één hectare · één jaar', [['erin', 0, C.goud], ['eruit', 0, C.koraal]]);
    naamBij(ctx, 'één hectare', '100 × 100 meter', 610, 640, 1, 'center', C.goud); },
  e5s05(ctx) { e5Weiland(ctx, { slootY: 830 }); ecoTag(ctx, _F5, 'HET GRAS'); e5Zon(ctx, 260, 170, 60);
    e5Stroom(ctx, 330, 230, 1000, 640, 150, { a: 0.35, kop: false }); e5Stroom(ctx, 340, 220, 980, 640, 6, { buig: 0.2 });
    e5Warmte(ctx, 1150, 620, 1.2, { a: 0.9 }); e5Warmte(ctx, 1350, 640, 1.0, { a: 0.7 }); e5Stroom(ctx, 1020, 620, 1500, 300, 60, { kleur: C.goud, a: 0.25, buig: -0.3 });
    naamBij(ctx, 'zonlicht', 'per jaar enorm veel', 420, 330, 1, 'left', C.goud); naamBij(ctx, 'vastgelegd door het gras', '± 1–2 %', 980, 560, 1, 'center', C.goud);
    naamBij(ctx, 'teruggekaatst en warmte', null, 1500, 250, 1, 'center', C.text2); },
  e5s06(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS');
    e5Boek(ctx, 360, 200, 1200, 560, 'het boek van de veehouder · één hectare · één jaar', [['BPP', 1, C.goud, 'alles wat het gras vastlegt'], ['', 0, C.goud], ['', 0, C.goud]]);
    naamBij(ctx, 'bruto primaire productie', 'BPP', 960, 860, 1, 'center', C.goud); },
  e5q07(ctx) { e5Vraag(ctx, ['Wanneer breekt het gras zelf glucose af, met dissimilatie?'], ["Alleen 's nachts, als er geen licht is", 'Dag en nacht, net als jij', 'Nooit: planten doen alleen fotosynthese']); },
  e5s08(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS');
    for (const [x, dag] of [[520, true], [1400, false]]) { roundRect(ctx, x - 380, 170, 760, 640, 20); shape(ctx, rgba(dag ? '#2E4466' : '#141E30', 0.9), C.line, 2);
      grasPol(ctx, x, 700, 2.6); e5Warmte(ctx, x + 120, 560, 1, {}); e5Pijl(ctx, x + 40, 520, x + 200, 400, '#9AA3B2', 5); text(ctx, 'CO₂', x + 225, 395, fTekst(36, 700), '#C8CED8', 'left');
      if (dag) { e5Zon(ctx, x - 250, 270, 40); e5Pijl(ctx, x - 200, 360, x - 50, 520, C.goud, 6); naamBij(ctx, 'fotosynthese', 'alleen met licht', x - 210, 760, 1, 'center', C.goud); }
      else { circ(ctx, x - 250, 270, 36, '#C8CED8'); circ(ctx, x - 234, 260, 32, '#141E30'); }
      naamBij(ctx, 'dissimilatie', 'altijd', x + 200, 760, 1, 'center', C.koraal); metaText(ctx, dag ? 'DAG' : 'NACHT', x, 220, C.text2, 'center', 28); } },
  e5s09(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS');
    e5Boek(ctx, 360, 200, 1200, 560, 'het boek van de veehouder', [['BPP', 1, C.goud, 'vastgelegd'], ['R', 0.5, C.koraal, 'eigen dissimilatie · vaak ± de helft'], ['NPP', 0.5, C.groen, 'aangroei = voedsel']]);
    e5Warmte(ctx, 1140, 360, 0.9); naamBij(ctx, 'netto primaire productie', 'NPP = BPP − R', 960, 860, 1, 'center', C.groen); },
  e5s10(ctx) { e5Weiland(ctx, { slootY: 860 }); ecoTag(ctx, _F5, 'HET GRAS');
    e5Proefvlak(ctx, 160, 790, 380, { geknipt: 1 }); naamBij(ctx, '1 m²', 'proefvlak, geknipt', 350, 860, 1, 'center', C.goud);
    e5Gerrit(ctx, 700, 820, { uit: 'neutraal', pose: 'vasthouden', kijk: 1 });
    roundRect(ctx, 880, 300, 900, 520, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
    e5Stoof(ctx, 930, 360, 300, 300, { temp: '70 °C' }); e5Weegschaal(ctx, 1460, 640, 300, { getal: '0,35 kg', lading: (c, x, y) => grasHoop(c, x, y, 0.9, true) });
    e5Pijl(ctx, 1250, 520, 1320, 520, C.line, 4); naamBij(ctx, 'drooggewicht', 'tot het gewicht niet meer verandert', 1330, 740, 1, 'center', C.groen); },
  e5s11(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS');
    for (const [x, h, lab] of [[640, 0.35, 'begin seizoen'], [1280, 1, 'eind seizoen']]) { e5Weegschaal(ctx, x, 720, 360, { getal: h < 0.5 ? 'weinig' : 'veel', lading: (c, xx, yy) => grasHoop(c, xx, yy, 1.2 + 1.6 * h, true) }); naamBij(ctx, lab, null, x, 800, 1, 'center'); }
    e5Pijl(ctx, 830, 520, 1080, 520, C.groen, 6); naamBij(ctx, 'aangroei', 'tot ± 14 ton droge stof per hectare per jaar', 960, 300, 1, 'center', C.groen); },
  e5s12(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS'); vwoMarker(ctx); e5Staaf(ctx, 300, 760, 1340, 520, {});
    naamBij(ctx, 'te weinig mineralen', null, 300 + 1340 / 7 * 5.5, 600, 1, 'center', C.text2); },
  e5s13(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'HET GRAS'); vwoMarker(ctx); e5Staaf(ctx, 300, 760, 1340, 520, { licht: 4 });
    naamBij(ctx, 'het weiland', 'meer NPP = meer voedsel', 300 + 1340 / 7 * 4.5, 470, 1, 'center', C.groen); },

  // ================= H2 DE KOE =================
  e5s14(ctx) { e5Weiland(ctx, { slootY: 860 }); ecoTag(ctx, _F5, 'DE KOE');
    e5Koe(ctx, 860, 800, { houding: 'staan' }); e5Warmte(ctx, 780, 470, 1.4, { n: 4 }); e5Warmte(ctx, 1080, 430, 0.8, { kleur: '#C8CED8', a: 0.8 });
    e5Gerrit(ctx, 1320, 820, { uit: 'blij', pose: 'wijs', kijk: -1 }); naamBij(ctx, 'warmte uit dissimilatie', null, 780, 330, 1, 'center', C.koraal); ecoSchaal(ctx, '−2 °C · vroeg in de ochtend'); },
  e5s15(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'DE KOE'); e5Meetstal(ctx, 300, 240, 900, 520); e5Koe(ctx, 760, 740, { houding: 'staan' });
    e5Pijl(ctx, 130, 310, 290, 310, '#C8CED8', 4); e5Pijl(ctx, 1210, 310, 1380, 310, '#C8CED8', 4);
    e5Meter(ctx, 1520, 260, 64, 0.8, C.oker, 'voer', { meta: 'erin' }); e5Meter(ctx, 1520, 480, 64, 0.35, C.oker, 'mest', { meta: 'eruit' }); e5Meter(ctx, 1520, 700, 64, 0.6, C.koraal, 'gassen en warmte', { meta: 'eruit' });
    naamBij(ctx, 'meetstal', 'afgesloten · lucht in en uit gemeten', 750, 200, 1, 'center'); },
  e5s16(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'DE KOE'); e5Schema(ctx, 760, 220, 1, { opname: 200, feces: 60 }, { toon: ['opname', 'feces'], getal: false, focus: 'feces' });
    e5Koe(ctx, 1500, 520, { houding: 'staan', kijk: -1, a: 0.35 }); },
  e5s17(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'DE KOE'); e5Schema(ctx, 760, 220, 1, { opname: 200, feces: 60, diss: 135, prod: 5 }, { getal: false, focus: 'prod' }); },
  e5q18(ctx) { e5Vraag(ctx, ['Opname 200 MJ per dag. Feces 60 MJ. Dissimilatie 135 MJ.', 'Hoeveel procent van de opname wordt productie?'], ['Ongeveer tweeënhalf procent', 'Dertig procent', 'Zeventig procent']); },
  e5s19(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'DE KOE'); e5Schema(ctx, 760, 220, 1, { opname: 200, feces: 60, diss: 135, prod: 5 }, { getal: true, focus: 'prod', pct: '± 2,5 %' });
    text(ctx, '200 − 60 − 135 = 5', 960, 870, fTekst(44, 700), C.text, 'center'); },
  e5s20(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'DE KOE'); vwoMarker(ctx); e5Schema(ctx, 520, 220, 0.75, { opname: 200, feces: 60, diss: 135, prod: 5 }, { getal: false, namen: false, focus: 'prod' });
    text(ctx, 'secundaire productie', 1500, 330, fTekst(48, 700), C.groen, 'center'); text(ctx, '= opname − feces − dissimilatie', 1500, 400, fTekst(40, 500), C.text, 'center');
    for (let i = 0; i < 6; i++) koe7(ctx, 1240 + (i % 3) * 170, 640 + Math.floor(i / 3) * 140, 0.6 / 1.7, { houding: 'grazen', a: 0.85 });
    roundRect(ctx, 1440, 820, 120, 50, 10); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); metaText(ctx, 'per m² per jaar', 1500, 900, C.text2, 'center', 26); },
  e5s21(ctx) { e5Weiland(ctx, { horizon: 420, slootY: 900 }); ecoTag(ctx, _F5, 'WAAR BLIJFT DE ENERGIE?');
    e5Vlaai(ctx, 760, 700, 2.6); ecoRegenworm(ctx, 1080, 770, 16, { houding: 'zij', t: 0.3 }); e5Mestkever(ctx, 700, 640, 2.2); e5Mestkever(ctx, 880, 700, 2.2);
    naamBij(ctx, 'mestkevers', 'detrituseter', 600, 560, 1, 'center'); naamBij(ctx, 'regenworm', 'detrituseter', 1180, 840, 1, 'center'); naamBij(ctx, 'mest', 'nog vol energie', 760, 800, 1, 'center', C.oker); naamBij(ctx, 'schimmels en bacteriën', 'reducenten', 1500, 640, 1, 'center'); },
  e5q22(ctx) { e5Vraag(ctx, ['De energie in de mest. Komt die terug in het gras?'], ['Ja: via de mineralen neemt het gras die energie weer op', 'Ja: die blijft in de bodem, en het gras gebruikt hem later', 'Nee: bodemdieren en reducenten gebruiken hem, en hij verdwijnt als warmte']); },
  e5s23(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WAAR BLIJFT DE ENERGIE?');
    const cx = 960, cy = 520, R = 260; ctx.strokeStyle = E5K.stof; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke();
    for (const an of [0.3, 1.9, 3.5, 5.0]) { const x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; pijl(ctx, x, y, cx + Math.cos(an + 0.25) * R, cy + Math.sin(an + 0.25) * R, E5K.stof, 1, 8, 22); }
    [['gras', -1.5708], ['koe', 0], ['mest', 1.5708], ['bodem', 3.1416]].forEach(([n, an]) => { const x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; circ(ctx, x, y, 62, '#2A3A58', C.line, 2); text(ctx, n, x, y + 12, fTekst(36, 700), C.text, 'center'); });
    e5Stroom(ctx, 420, 140, cx - 40, cy - R - 64, 22, { buig: 0.2 }); naamBij(ctx, 'zonlicht', null, 420, 120, 1, 'center', C.goud);
    for (const an of [-1.0, 0.6, 2.2]) e5Warmte(ctx, cx + Math.cos(an) * (R + 90), cy + Math.sin(an) * (R + 90), 0.9, { hoek: an });
    naamBij(ctx, 'stoffen gaan rond', null, cx, cy - 20, 1, 'center', '#C8CED8'); metaText(ctx, 'CO₂ · water', cx, cy + 24, C.grain, 'center', 26); metaText(ctx, 'mineralen', cx, cy + 58, C.grain, 'center', 26); naamBij(ctx, 'warmte', 'verlaat het weiland', 1500, 270, 1, 'center', C.koraal); },
  e5s24(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WAAR BLIJFT DE ENERGIE?');
    e5Zon(ctx, 170, 330, 50); e5Stroom(ctx, 250, 330, 1500, 330, 60, { kop: false });
    [['gras', 520], ['koe', 900], ['bodemleven', 1280]].forEach(([n, x]) => { roundRect(ctx, x - 110, 280, 220, 100, 16); shape(ctx, '#2A3A58', C.line, 2); text(ctx, n, x, 345, fTekst(36, 700), C.text, 'center'); e5Warmte(ctx, x, 270, 0.9, {}); });
    e5Warmte(ctx, 1620, 330, 1.4, { hoek: 0, n: 4 }); naamBij(ctx, 'warmte', 'naar buiten', 1700, 450, 1, 'center', C.koraal);
    ctx.strokeStyle = E5K.stof; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(900, 640, 520, 110, 0, 0, 6.283); ctx.stroke(); pijl(ctx, 1420, 640, 1410, 610, E5K.stof, 1, 6, 20); pijl(ctx, 380, 640, 390, 670, E5K.stof, 1, 6, 20);
    naamBij(ctx, 'energie stroomt', 'één kant op', 900, 150, 1, 'center', C.goud); naamBij(ctx, 'stoffen gaan rond', null, 900, 655, 1, 'center', '#C8CED8'); },
  e5s25(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WAAR BLIJFT DE ENERGIE?');
    grasPol(ctx, 380, 600, 3); koe7(ctx, 960, 620, 0.9 / 1.7, { houding: 'staan' }); persoon(ctx, 'noor', 1560, 640, 300, { uit: 'neutraal' });
    e5Stroom(ctx, 520, 500, 760, 500, 14); e5Stroom(ctx, 1160, 500, 1440, 500, 14);
    [['producent', 'trofisch niveau 1', 380], ['consument 1e orde', 'niveau 2', 960], ['consument 2e orde', 'niveau 3', 1560]].forEach(([a, b, x]) => naamBij(ctx, a, b, x, 760, 1, 'center'));
    naamBij(ctx, 'van gegeten naar eter', 'richting van de energie', 960, 230, 1, 'center', C.goud); },

  // ================= H4 VAN NIVEAU NAAR NIVEAU =================
  e5s26(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    const B = [[760, 'producenten'], [520, 'planteneters'], [300, 'roofdieren'], [140, 'toproofdieren']];
    B.forEach(([b, n], i) => { const y = 780 - i * 150; roundRect(ctx, 760 - b / 2, y - 90, b, 90, 12); shape(ctx, rgba(C.goud, 0.18 + 0.1 * (3 - i)), C.goud, 2); text(ctx, n, 760, y - 32, fTekst(36, 700), C.text, 'center');
      e5Warmte(ctx, 760 + b / 2 + 60, y - 40, 0.8, { hoek: 0 }); if (i < 3) e5Stroom(ctx, 760, y - 92, 760, y - 150 + 4, Math.max(5, b / 40)); });
    naamBij(ctx, '± 10 % gaat door', 'per niveau, gemiddeld', 1280, 360, 1, 'left', C.goud); naamBij(ctx, 'de rest: warmte,', null, 1280, 540, 1, 'left', C.koraal); naamBij(ctx, 'feces, niet gegeten', null, 1280, 590, 1, 'left', C.koraal); },
  e5s27(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    const V = [['planten', '1.000.000 kJ', 1100], ['planteneters', '100.000 kJ', 110], ['roofdieren', '10.000 kJ', 11], ['toproofdieren', '1000 kJ', 1.1]];
    V.forEach(([n, v, b], i) => { const y = 260 + i * 150; text(ctx, n, 560, y + 48, fTekst(40, 700), C.text, 'right'); roundRect(ctx, 600, y, Math.max(6, b), 70, 8); shape(ctx, rgba(C.goud, 0.7), C.goud, 2);
      if (b > 600) text(ctx, v, 630, y + 50, fTekst(38, 700), C.bgSchema, 'left'); else text(ctx, v, 630 + Math.max(6, b), y + 50, fTekst(38, 600), C.goud, 'left'); });
    metaText(ctx, 'per jaar · per gebied · elk niveau ± 10 % van het vorige', 600, 880, C.text2, 'left', 26); },
  e5s28(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    e5Piramide(ctx, 380, 760, [[440, C.groen, null], [300, C.oker, null], [140, C.koraal, null]], { h: 100, titel: 'aantallen' });
    e5Piramide(ctx, 960, 760, [[440, C.groen, null], [240, C.oker, null], [80, C.koraal, null]], { h: 100, titel: 'biomassa' });
    e5Piramide(ctx, 1540, 760, [[440, C.goud, null], [120, C.goud, null], [36, C.goud, null]], { h: 100, titel: 'energie' });
    naamBij(ctx, 'individuen per niveau', null, 380, 360, 1, 'center'); naamBij(ctx, 'droge massa · één moment', null, 960, 360, 1, 'center'); naamBij(ctx, 'energie per jaar', null, 1540, 360, 1, 'center', C.goud); },
  e5s29(ctx) { e5Weiland(ctx, { horizon: 520, slootY: 900, bomen: false }); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    e5Knotwilg(ctx, 230, 880, 300); naamBij(ctx, 'knotwilg', 'aan de slootkant', 300, 820, 1, 'left');
    zoomCircle(ctx, 720, 400, 200, 330, 470, 'twijg · ± 20× vergroot', 1, () => { ctx.fillStyle = '#2E4466'; ctx.fillRect(500, 180, 440, 440); ctx.strokeStyle = '#8A7A4E'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(520, 560); ctx.lineTo(920, 260); ctx.stroke();
      for (let i = 0; i < 26; i++) { const u = 0.08 + i * 0.033, px = lerp(520, 920, u) + (hash(i) - 0.5) * 18, py = lerp(560, 260, u) + (hash(i * 3) - 0.5) * 18 - 8; e5Bladluis(ctx, px, py, 6, -0.64); }
      lhb(ctx, 640, 500, 0.32, { rot: 0.9, stippen: 7 }); lhb(ctx, 820, 330, 0.32, { rot: 0.9, stippen: 7 }); });
    roundRect(ctx, 1080, 170, 780, 640, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
    e5Piramide(ctx, 1330, 760, [[60, C.groen, '1 wilg'], [420, C.oker, 'bladluizen'], [110, C.koraal, 'lieveheersbeestjes']], { h: 140 });
    metaText(ctx, 'piramide van aantallen', 1470, 230, C.grain, 'center', 26); naamBij(ctx, 'bladluizen', 'duizenden', 720, 160, 1, 'center'); },
  e5q30(ctx) { e5Vraag(ctx, ['Welke piramide staat nooit op zijn kop?'], ['De piramide van energie', 'De piramide van aantallen', 'De piramide van biomassa']);
    e5Piramide(ctx, 1680, 420, [[60, C.groen, null], [220, C.oker, null], [80, C.koraal, null]], { h: 60 }); },
  e5s31(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    e5Piramide(ctx, 960, 820, [[900, C.goud, null], [460, C.goud, null], [200, C.goud, null], [70, C.goud, null]], { h: 130, labels: false });
    [[450], [230], [100], [35]].forEach(([b], i) => e5Warmte(ctx, 960 + b + 70, 820 - i * 130 - 60, 0.9, { hoek: 0 }));
    haak(ctx, 510, 1410, 834, 'altijd smaller naar boven', C.groen); },
  e5s32(ctx) { e5Weiland(ctx, { horizon: 460, slootY: 830 }); ecoTag(ctx, _F5, 'VAN NIVEAU NAAR NIVEAU');
    ecoVos(ctx, 820, 790, 2.2, { houding: 'staan' }); ecoKonijn(ctx, 300, 790, 2.2, { houding: 'zitten', a: 0.6 }); muis(ctx, 480, 800, 4, { a: 0.6 });
    roundRect(ctx, 1240, 170, 560, 560, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
    e5Piramide(ctx, 1520, 680, [[460, C.groen, null], [200, C.oker, null], [40, C.koraal, null]], { h: 130, labels: false });
    naamBij(ctx, 'vos', '± 1 % van de NPP', 1480, 340, 1, 'right', C.koraal); metaText(ctx, 'piramide van energie', 1520, 220, C.grain, 'center', 26); },

  // ================= H5 WARM OF KOUD =================
  e5s33(ctx) { e5Weiland(ctx, { horizon: 300, slootY: 960, bomen: false }); ecoTag(ctx, _F5, 'WARM OF KOUD');
    ecoSpitsmuis(ctx, 900, 760, 40, { houding: 'snuffelen', t: 0.2 }); ecoRegenworm(ctx, 1420, 800, 22, { houding: 'zij', t: 0.4 });
    e5Klok(ctx, 220, 240, 80, 3); naamBij(ctx, 'om de 2 à 3 uur eten', null, 220, 380, 1, 'center');
    naamBij(ctx, 'bosspitsmuis', '± 10 gram · vergroot', 900, 470, 1, 'center'); },
  e5s34(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WARM OF KOUD');
    e5Bakje(ctx, 110, 680, 540, 380, { label: 'spitsmuis' }); ecoSpitsmuis(ctx, 420, 656, 24, { houding: 'staan' }); e5Hoopje(ctx, 200, 658, 50);
    e5Bakje(ctx, 690, 680, 540, 380, { label: 'zandhagedis' }); hagedis(ctx, 980, 654, 0.95, { houding: 'staan' }); e5Hoopje(ctx, 780, 658, 50);
    e5Bakje(ctx, 1270, 680, 540, 380, { label: 'alleen voer' }); e5Hoopje(ctx, 1460, 658, 50); naamBij(ctx, 'controle', 'voer droogt vanzelf uit', 1490, 520, 1, 'center', C.groen);
    metaText(ctx, 'ONAFHANKELIJK: SOORT DIER · AFHANKELIJK: VOER DAT VERDWIJNT', 960, 830, C.grain, 'center', 26); metaText(ctx, 'CONSTANT: 20 °C · ZELFDE GEWICHT', 960, 874, C.grain, 'center', 26); },
  e5q35(ctx) { e5Vraag(ctx, ['Welk dier eet per gram lichaam het meest?'], ['Ze eten ongeveer even veel: ze zijn even zwaar', 'De spitsmuis: vele keren zo veel', 'De hagedis: die moet zich steeds opwarmen']); },
  e5s36(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WARM OF KOUD');
    e5Bakje(ctx, 160, 700, 760, 420, { label: 'spitsmuis · endotherm' }); ecoSpitsmuis(ctx, 560, 676, 30, { houding: 'snuffelen', t: 0.5 }); e5Hoopje(ctx, 270, 678, 12, C.oker, 0.7); e5Warmte(ctx, 600, 500, 1.3, { n: 4 });
    e5Bakje(ctx, 1000, 700, 760, 420, { label: 'zandhagedis · ectotherm' }); hagedis(ctx, 1380, 674, 1.2, { houding: 'staan' }); e5Hoopje(ctx, 1110, 678, 56);
    naamBij(ctx, 'bijna op', null, 270, 600, 1, 'center', C.oker); naamBij(ctx, 'bijna alles over', null, 1150, 580, 1, 'center', C.oker);
    naamBij(ctx, '< 1/10 van de energie', 'van een zoogdier van zijn gewicht', 1300, 180, 1, 'center', C.text); naamBij(ctx, 'warm houden', null, 600, 400, 1, 'center', C.koraal); },
  e5s37(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WARM OF KOUD');
    e5Schema(ctx, 352, 320, 0.8, { opname: 100, feces: 30, diss: 68, prod: 2 }, { getal: false, namen: false, pct: 'een paar %' }); text(ctx, 'warmbloedig', 496, 260, fTekst(48, 700), C.text, 'center');
    e5Schema(ctx, 1312, 320, 0.8, { opname: 100, feces: 30, diss: 40, prod: 30 }, { getal: false, namen: false, pct: 'tientallen %' }); text(ctx, 'koudbloedig (insect)', 1456, 260, fTekst(48, 700), C.text, 'center'); },
  e5s38(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WARM OF KOUD');
    e5Weegschaal(ctx, 560, 760, 440, { lading: (c, x, y) => { e5Zak(c, x - 40, y, 1.2); e5Zak(c, x + 40, y, 1.2); } }); naamBij(ctx, '2 kg voer', '→ 1 kg insecten', 560, 840, 1, 'center');
    e5Weegschaal(ctx, 1360, 760, 600, { lading: (c, x, y) => { for (let i = 0; i < 8; i++) e5Zak(c, x - 210 + (i % 4) * 140, y - Math.floor(i / 4) * 70, 1.2); } }); naamBij(ctx, '8 kg voer', '→ 1 kg rund', 1360, 840, 1, 'center');
    naamBij(ctx, 'voedselconversie', 'kg voer per kg groei', 960, 230, 1, 'center', C.goud); },
  e5s39(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'WARM OF KOUD'); const vloer = 860, tafel = 640;
    persoon(ctx, 'rachid', 260, vloer, 500, { pose: 'zit', stoel: true, tafel, uit: 'neutraal' }); persoon(ctx, 'noor', 520, vloer, 470, { pose: 'zit', stoel: true, tafel, uit: 'blij' }); persoon(ctx, 'kind', 760, vloer, 330, { pose: 'zit', stoel: true, tafel, uit: 'blij' });
    ctx.fillStyle = '#7A5E44'; ctx.fillRect(120, tafel, 780, 20); ctx.fillStyle = '#8A6E52'; ctx.fillRect(120, tafel, 780, 6); ctx.fillStyle = '#5E4834'; ctx.fillRect(150, tafel + 20, 18, vloer - tafel - 20); ctx.fillRect(852, tafel + 20, 18, vloer - tafel - 20);
    e5Bord(ctx, 520, tafel - 4, 0.3); e5Bord(ctx, 290, tafel - 4, 0.3); e5Bord(ctx, 760, tafel - 4, 0.24);
    grasHoop(ctx, 1480, 760, 4.5, false); e5Stroom(ctx, 1260, 600, 600, 620, 8, { buig: 0.3 });
    naamBij(ctx, 'het voer dat de koe at', null, 1480, 500, 1, 'center', C.groen); naamBij(ctx, '± 3 % in het vlees', 'bord ± 25 cm', 1000, 540, 1, 'center', C.goud); },
  // ================= SAMENVATTING =================
  e5s40(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'SAMENVATTING');
    e5Schema(ctx, 360, 260, 0.82, { opname: 200, feces: 60, diss: 135, prod: 5 }, { getal: false, namen: false });
    e5Piramide(ctx, 1460, 760, [[560, C.groen, null], [260, C.oker, null], [60, C.koraal, null]], { h: 140, labels: false }); ecoVos(ctx, 1460, 340, 0.6, { houding: 'staan' });
    naamBij(ctx, 'te weinig energie over', null, 1460, 250, 1, 'center', C.koraal); e5Warmte(ctx, 520, 680, 1.1, { n: 4 }); },
  e5s41(ctx) { e5Bg(ctx); ecoTag(ctx, _F5, 'SAMENVATTING');
    const R = ['Energie stroomt één kant op en verlaat het ecosysteem als warmte; stoffen gaan rond.', 'Per trofisch niveau komt gemiddeld maar ± 10 % van de energie in het volgende.', 'Daarom is er hoog in de piramide te weinig energie voor veel roofdieren.'];
    R.forEach((r, i) => { ctx.font = fTekst(44, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, r, 200, 300 + i * 150, 1500, 54); });
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(150, 240); ctx.lineTo(130, 240); ctx.lineTo(130, 700); ctx.lineTo(150, 700); ctx.stroke(); },
};

// kleine planten- en voerhulpen (film-eigen)
function grasPol(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const dx = (i - 4) * 5, h = 34 + hash(i * 3.3) * 22, b = (hash(i * 7.1) - 0.5) * 30; ctx.strokeStyle = i % 2 ? '#7FC48F' : '#5FA86E'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(dx, 0); ctx.quadraticCurveTo(dx + b * 0.3, -h * 0.6, dx + b, -h); ctx.stroke(); } ctx.restore(); }
function grasHoop(ctx, x, y, s = 1, droog = false) { const k = droog ? '#B9A86A' : '#5FA86E', l = droog ? '#D2C48A' : '#7FC48F'; vul(ctx, [[x - 60 * s, y], [x - 40 * s, y - 34 * s], [x, y - 44 * s], [x + 44 * s, y - 30 * s], [x + 62 * s, y]], k, l, 2);
  ctx.strokeStyle = l; ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 40 * s + i * 16 * s, y - 6 * s); ctx.lineTo(x - 30 * s + i * 14 * s, y - 30 * s); ctx.stroke(); } }
