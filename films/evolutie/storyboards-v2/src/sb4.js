// Evolutie v2 · film 4 De mens als selectiefactor — keyframes storyboard (één per scène)
const _F4 = 4;
function _sch(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function _mic(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); }
// kolonie: n bacteriën in een ellips; f(i) geeft {type, dood, plasmide, focus}
function _kolonie(ctx, cx, cy, rx, ry, n, len, f, seed = 1) { for (let i = 0; i < n; i++) { const an = hash(i * 7 + seed) * 6.283, d = Math.sqrt(hash(i * 13 + seed)); const x = cx + Math.cos(an) * d * rx, y = cy + Math.sin(an) * d * ry;
  const o = Object.assign({ seed: i, zweep: len > 100 }, f(i)); bacterie(ctx, x, y, len * (0.85 + 0.3 * hash(i * 3 + seed)), hash(i * 5 + seed) * 3.14, o); } }
function _balie(ctx, y) { roundRect(ctx, 0, y, W, 40, 0); ctx.fillStyle = '#3A4A66'; ctx.fill(); ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, y + 40, W, CAPTION_Y - y - 40); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
function _kast(ctx, x, y, w, h) { roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba(C.fill, 0.7), C.line, 2); for (let r = 1; r < 4; r++) { ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(x, y + r * h / 4); ctx.lineTo(x + w, y + r * h / 4); ctx.stroke(); }
  for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) { const bx = x + 20 + i * (w - 40) / 6, by = y + (r + 1) * h / 4 - 4; roundRect(ctx, bx, by - 50 + (i % 2) * 10, (w - 60) / 6 - 8, 50 - (i % 2) * 10, 4); ctx.fillStyle = ['#EDE6D2', '#C9D6E2', '#E8D8C0'][(i + r) % 3]; ctx.fill(); } }
function _tijdlijn(ctx, x, y, w, n, kleur, label, meta) { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < n; i++) { const xx = x + (i + 0.5) * w / n; ctx.strokeStyle = kleur; ctx.lineWidth = n > 20 ? 4 : 8; ctx.beginPath(); ctx.moveTo(xx, y - 24); ctx.lineTo(xx, y + 24); ctx.stroke(); }
  text(ctx, label, x, y - 50, fTekst(40, 600), C.text, 'left'); metaText(ctx, meta, x + w, y - 50, C.grain, 'right', 26); }
function _hand(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[-30, 60], [-34, 10], [-30, -30], [-18, -34], [-14, -6], [-10, -46], [2, -48], [4, -8], [10, -44], [22, -42], [20, -4], [28, -30], [38, -26], [32, 20], [24, 60]], '#E3B998', '#B8906E', 2); ctx.restore(); }
function _klok(ctx, x, y, r) { circ(ctx, x, y, r, rgba(C.fill, 0.8), C.line, 3); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - r * 0.7); ctx.moveTo(x, y); ctx.lineTo(x + r * 0.5, y); ctx.stroke(); }
function _balk(ctx, x, y, w, p, n1, n2) { allelBalk(ctx, x, y, w, p, { procent: false }); text(ctx, n1 + ' ' + Math.round(p * 100) + '%', x, y + 76, fTekst(32, 700), EVO.a1R, 'left'); text(ctx, n2 + ' ' + Math.round((1 - p) * 100) + '%', x + w, y + 76, fTekst(32, 700), EVO.a2R, 'right'); }
function _knikkerRij(ctx, x, y, paren, kr = 16) { paren.forEach((p, i) => { const xx = x + i * kr * 5; circ(ctx, xx, y, kr, p[0] ? EVO.a2 : EVO.a1, p[0] ? EVO.a2R : EVO.a1R, 2); circ(ctx, xx + kr * 2.1, y, kr, p[1] ? EVO.a2 : EVO.a1, p[1] ? EVO.a2R : EVO.a1R, 2); if (p[0] && p[1]) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; roundRect(ctx, xx - kr - 6, y - kr - 6, kr * 4.1 + 12, kr * 2 + 12, kr + 6); ctx.stroke(); } }); }

const SB4 = {
  e4s01(ctx) { _sch(ctx); evoTag(ctx, _F4, 'OPENING'); _kast(ctx, 120, 160, 700, 520); _balie(ctx, 700);
    persoon(ctx, 'ravi', 1000, 760, 520, { pose: 'vasthouden', hold: (c, x, y) => medicijnDoosje(c, x + 40, y + 10, 120) });
    persoon(ctx, 'henk', 1500, 880, 560, { kijk: -1, uit: 'verbaasd' });
    naamBij(ctx, 'Apotheker Ravi', null, 1000, 200, 1, 'center'); naamBij(ctx, 'Opa Henk', null, 1500, 280, 1, 'center');
    text(ctx, '"maak je kuur af"', 1500, 170, fTitel(56), C.goud, 'center'); },
  e4s02(ctx) { titelKaart(ctx, _F4, 'De mens als selectiefactor', ['Waarom helpt een antibioticum niet tegen griep,', 'maar maakt het wel resistentie?'], (c) => {
    c.save(); c.beginPath(); c.arc(1460, 760, 280, 0, 6.283); c.fillStyle = C.bgMicro; c.fill(); c.clip(); _kolonie(c, 1460, 760, 230, 230, 22, 120, (i) => ({ type: i === 3 ? 'resistent' : 'gevoelig', focus: i === 3, plasmide: i === 3 ? 1 : 0 }), 3); c.restore(); circ(c, 1460, 760, 280, null, C.goud, 2); }); },
  e4s03(ctx) { _mic(ctx); evoTag(ctx, _F4, 'BACTERIËN EVOLUEREN SNEL');
    bacterie(ctx, 420, 470, 360, 0, { seed: 2 }); pijl(ctx, 650, 470, 760, 470, C.line, 1, 4);
    bacterie(ctx, 1000, 470, 400, 0, { deling: 0.75, seed: 3 }); pijl(ctx, 1240, 470, 1350, 470, C.line, 1, 4);
    for (const [dx, dy] of [[0, -110], [0, 110]]) bacterie(ctx, 1600 + dx, 470 + dy, 300, 0.05, { seed: 4 + dy });
    text(ctx, '1', 420, 330, fTekst(56, 700), C.text, 'center'); text(ctx, '2', 1000, 330, fTekst(56, 700), C.text, 'center'); text(ctx, '4 …', 1600, 280, fTekst(56, 700), C.text, 'center');
    naamBij(ctx, 'E. coli', 'darmbacterie · 2 micrometer', 420, 640, 1, 'center'); evoSchaal(ctx, 'deling elke ±20 min (lab, 37 °C)'); },
  e4s04(ctx) { _mic(ctx); evoTag(ctx, _F4, 'BACTERIËN EVOLUEREN SNEL');
    _kolonie(ctx, 960, 470, 860, 380, 160, 58, (i) => ({ type: 'gevoelig', a: 0.8 }), 7);
    bacterie(ctx, 1220, 380, 110, 0.4, { type: 'gevoelig', focus: true, seed: 3, zweep: false }); circ(ctx, 1220, 380, 9, EVO.kracht.mutatie, _lt(EVO.kracht.mutatie, 0.3), 2);
    naamBij(ctx, 'mutatie', 'NIEUW ALLEL', 1300, 330, 1, 'left', EVO.kracht.mutatie); evoSchaal(ctx, 'in je darmen: ±38 000 miljard bacteriën'); },
  e4q05(ctx) { vraagKaart(ctx, ["Waarom kan een populatie bacteriën veel sneller", "evolueren dan een populatie mensen?"], ["Bacteriën passen zich aan als het nodig is", "Korte generatietijd en enorme aantallen", "Bacteriën hebben meer genen dan mensen"], _F4); },
  e4s06(ctx) { _sch(ctx); evoTag(ctx, _F4, 'BACTERIËN EVOLUEREN SNEL');
    _tijdlijn(ctx, 140, 340, 1100, 1, C.koraal, 'mens', '1 generatie per ±30 jaar'); persoon(ctx, 'henk', 1320, 420, 180);
    _tijdlijn(ctx, 140, 640, 1100, 72, EVO.a1, 'bacterie', 'in het lab tot 72 generaties per dag');
    pot(ctx, 1620, 760, 0.95, { p: 0.62, n: 75, extra: [[EVO.kracht.mutatie, 3]], seed: 4, label: 'genenpool kolonie' });
    haak(ctx, 140, 1240, 700, 'meer generaties = vaker mutatie en selectie', C.groen); },
  e4s07(ctx) { _sch(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    persoon(ctx, 'henk', 420, 860, 560, { uit: 'moe' }); persoon(ctx, 'kim', 900, 860, 580, { kijk: -1, pose: 'vasthouden', hold: (c, x, y) => { roundRect(c, x - 18, y - 70, 36, 70, 8); shape(c, rgba('#E8D86A', 0.5), C.er, 2); } });
    naamBij(ctx, 'Opa Henk', 'blaasontsteking', 420, 250, 1, 'center'); naamBij(ctx, 'Dr. Kim', null, 900, 230, 1, 'center');
    zoomCircle(ctx, 1460, 440, 300, 930, 330, 'URINE · VERGROOT ±2000×', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1100, 100, 720, 700); _kolonie(ctx, 1460, 440, 250, 250, 18, 120, () => ({ type: 'gevoelig' }), 5); }); },
  e4s08(ctx) { _mic(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    const res = [4, 17, 29]; _kolonie(ctx, 960, 520, 820, 340, 44, 120, (i) => res.includes(i) ? { type: 'resistent', focus: true } : { type: 'gevoelig', a: 0.75 }, 11);
    naamBij(ctx, 'gevoelig', 'allel 1', 120, 140, 1, 'left', EVO.a1R); naamBij(ctx, 'resistent', 'allel 2 · door toevallige mutatie', 1800, 140, 1, 'right', EVO.a2R); },
  e4q09(ctx) { vraagKaart(ctx, ["Opa Henk slikt het antibioticum. Wat gebeurt er met", "de bacteriën in zijn blaas?"], ["Ze worden langzaam immuun voor het middel", "Het middel veroorzaakt resistentie-mutaties", "Gevoelige gaan dood, resistente delen verder"], _F4); },
  e4s10(ctx) { _mic(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    const res = [4, 17, 29]; _kolonie(ctx, 960, 460, 820, 360, 44, 120, (i) => res.includes(i) ? { type: 'resistent', deling: i === 17 ? 0.7 : 0 } : { type: 'gevoelig', dood: 1 }, 11);
    for (let i = 0; i < 40; i++) antibioticum(ctx, 120 + hash(i * 9) * 1680, 120 + hash(i * 9 + 1) * 700, 13, hash(i) * 6);
    naamBij(ctx, 'antibioticum', null, 1800, 150, 1, 'right', C.koraal); },
  e4s11(ctx) { _sch(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    pot(ctx, 560, 640, 1.2, { p: 0.94, n: 80, seed: 3, label: 'vóór de kuur' }); _balk(ctx, 330, 760, 460, 0.94, 'gevoelig', 'resistent');
    pijl(ctx, 820, 470, 1080, 470, C.koraal, 1, 6, 22); metaText(ctx, 'antibioticum = selectiedruk', 960, 250, C.koraal, 'center', 26);
    pot(ctx, 1360, 640, 1.2, { p: 0.08, n: 70, seed: 6, label: 'na de kuur' }); _balk(ctx, 1130, 760, 460, 0.08, 'gevoelig', 'resistent'); },
  e4s12(ctx) { _mic(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    for (const [x, y] of [[640, 320], [960, 560], [560, 640], [1300, 300], [1380, 620]]) griepVirus(ctx, x, y, 70);
    for (let i = 0; i < 18; i++) antibioticum(ctx, 300 + hash(i * 4) * 1320, 160 + hash(i * 4 + 1) * 620, 12, i);
    naamBij(ctx, 'griepvirus', '0,1 micrometer · geen bacterie', 960, 800, 1, 'center');
    naamBij(ctx, 'antibioticum', 'doet niets tegen een virus', 1800, 150, 1, 'right', C.koraal);
    evoSchaal(ctx, 'vergroot · virus niet op schaal met het antibioticum'); },
  e4q13(ctx) { vraagKaart(ctx, ["Iemand neemt een antibioticum tegen griep. Wat doet", "dat?"], ["Het selecteert resistente bacteriën in je darmen", "Niets: er zijn geen ziekmakende bacteriën", "Het griepvirus wordt er resistent door"], _F4); },
  e4s14(ctx) { _mic(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST');
    _kolonie(ctx, 960, 470, 820, 360, 40, 120, (i) => [6, 13, 22, 30, 35].includes(i) ? { type: 'resistent', deling: i === 13 ? 0.7 : 0 } : { type: 'gevoelig', dood: 1 }, 21);
    naamBij(ctx, 'resistente darmbacteriën krijgen de ruimte', null, 960, 150, 1, 'center', EVO.a2R); },
  e4s15(ctx) { _sch(ctx); evoTag(ctx, _F4, 'HET ANTIBIOTICUM KIEST'); _balie(ctx, 700);
    persoon(ctx, 'ravi', 520, 760, 520, { pose: 'wijs' }); persoon(ctx, 'henk', 1500, 880, 560, { kijk: -1 });
    roundRect(ctx, 760, 260, 560, 300, 14); shape(ctx, '#EDE6D2', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(760, 290, 560, 26);
    text(ctx, 'Neem zoals voorgeschreven', 1040, 380, fTekst(38, 700), '#2A2A2A', 'center'); text(ctx, 'Eerder stoppen? Overleg.', 1040, 440, fTekst(36, 500), '#2A2A2A', 'center'); text(ctx, 'Restje: terug naar de apotheek', 1040, 500, fTekst(34, 500), '#2A2A2A', 'center');
    naamBij(ctx, 'Apotheker Ravi', null, 520, 200, 1, 'center'); naamBij(ctx, 'Opa Henk', null, 1500, 280, 1, 'center'); },
  e4s16(ctx) { _mic(ctx); evoTag(ctx, _F4, 'DE POT LEKT');
    bacterie(ctx, 900, 470, 980, 0, { type: 'resistent', plasmide: 2, seed: 5 });
    naamBij(ctx, 'plasmide', 'klein ringetje DNA', 1060, 215, 1, 'right', C.kernR); naamBij(ctx, 'resistentiegen', null, 1180, 215, 1, 'left', EVO.a2R); naamBij(ctx, 'groot DNA-molecuul', null, 900, 740, 1, 'center', C.kernR);
    evoSchaal(ctx, 'vergroot · E. coli is 2 micrometer lang'); },
  e4s17(ctx) { _mic(ctx); evoTag(ctx, _F4, 'DE POT LEKT');
    bacterie(ctx, 560, 480, 560, 0, { type: 'resistent', plasmide: 1, zweep: false, seed: 2 }); bacterie(ctx, 1460, 520, 500, 0.08, { type: 'gevoelig', zweep: false, seed: 9 });
    pilus(ctx, 830, 470, 1220, 500, 0.5, 24); naamBij(ctx, 'kopie van het plasmide', null, 1030, 370, 1, 'center', EVO.a2R);
    naamBij(ctx, 'E. coli', null, 560, 680, 1, 'center'); naamBij(ctx, 'andere soort', 'BV. KLEBSIELLA', 1460, 710, 1, 'center'); },
  e4q18(ctx) { vraagKaart(ctx, ["Een E. coli met een plasmide voor resistentie ligt", "naast een bacterie van een andere soort. Wat kan er", "gebeuren?"], ["Niets: genen gaan alleen naar dochtercellen", "De E. coli verliest zijn resistentie", "De andere soort krijgt een kopie en wordt resistent"], _F4); },
  e4s19(ctx) { _sch(ctx); evoTag(ctx, _F4, 'DE POT LEKT');
    pot(ctx, 560, 700, 1.25, { p: 0.4, n: 80, seed: 2, label: 'E. coli' }); pot(ctx, 1360, 700, 1.25, { p: 0.95, n: 80, seed: 9, label: 'Klebsiella' });
    ctx.strokeStyle = EVO.glas; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(723, 560); ctx.lineTo(1197, 560); ctx.moveTo(723, 600); ctx.lineTo(1197, 600); ctx.stroke();
    circ(ctx, 960, 580, 15, EVO.a2, EVO.a2R, 2); pijl(ctx, 1000, 520, 1110, 520, EVO.a2, 1, 4);
    naamBij(ctx, 'ESBL-gen op een plasmide', null, 960, 460, 1, 'center', EVO.a2R); metaText(ctx, 'twee soorten · één lek', 960, 200, C.grain, 'center', 28); },
  e4s20(ctx) { _sch(ctx); evoTag(ctx, _F4, 'DE POT LEKT');
    ziekenhuisIcoon(ctx, 560, 720, 2.1);
    const k = [['veel antibiotica', 1200, 300], ['zieke mensen dicht bij elkaar', 1200, 450], ['handen en bedden', 1200, 600]];
    k.forEach(([t, x, y]) => { circ(ctx, x - 40, y - 12, 14, C.koraal); text(ctx, t, x, y, fTekst(44, 600), C.text, 'left'); });
    haak(ctx, 1140, 1760, 680, 'grootste selectiedruk', C.koraal); },
  e4s21(ctx) { macroNacht(ctx, { horizon: 600 }); evoTag(ctx, _F4, 'DE MENS KIEST');
    circ(ctx, 1600, 200, 60, '#E6E0C8'); wolf(ctx, 700, 860, 7.5, { kopHoek: -0.05 });
    naamBij(ctx, 'wolf', 'Canis lupus · schofthoogte 80 cm', 300, 200, 1, 'left'); },
  e4s22(ctx) { macroNacht(ctx, { horizon: 520 }); evoTag(ctx, _F4, 'DE MENS KIEST');
    const g = 820, s = 5.0; wolf(ctx, 290, g, s, { a: 0.55 }); hond(ctx, 'herder', 930, g, s); hond(ctx, 'teckel', 1360, g, s); hond(ctx, 'mops', 1590, g, s); hond(ctx, 'chihuahua', 1790, g, s);
    naamBij(ctx, 'wolf', null, 300, 320, 0.8, 'center'); naamBij(ctx, 'herder', null, 960, 400, 1, 'center'); naamBij(ctx, 'teckel', null, 1370, 660, 1, 'center'); naamBij(ctx, 'mops', null, 1600, 600, 1, 'center'); naamBij(ctx, 'chihuahua', null, 1800, 690, 1, 'center');
    evoSchaal(ctx, 'op schaal · één soort: Canis lupus'); },
  e4q23(ctx) { vraagKaart(ctx, ["Hoe kan uit een wolf ooit een chihuahua ontstaan?"], ["Fokkers lieten steeds de kleinste honden jongen krijgen", "Binnen wonen en weinig rennen maakte honden kleiner", "Eén grote mutatie maakte in één keer een chihuahua"], _F4); },
  e4s24(ctx) { _sch(ctx); evoTag(ctx, _F4, 'DE MENS KIEST');
    pot(ctx, 460, 700, 1.15, { p: 0.75, n: 75, seed: 4, label: 'generatie 1' }); _balk(ctx, 270, 790, 380, 0.75, 'groot', 'klein');
    persoon(ctx, 'gerrit', 900, 640, 330, { pose: 'vasthouden', hold: (c, x, y) => { circ(c, x + 4, y - 6, 15, EVO.a2, EVO.a2R, 2); circ(c, x + 30, y + 4, 15, EVO.a2, EVO.a2R, 2); } });
    naamBij(ctx, 'de fokker kiest', 'Veehouder Gerrit', 900, 250, 1, 'center', C.goud);
    pot(ctx, 1380, 700, 1.15, { p: 0.35, n: 75, seed: 8, label: 'generatie 10' }); _balk(ctx, 1190, 790, 380, 0.35, 'groot', 'klein');
    pijl(ctx, 1040, 560, 1200, 560, C.line, 1, 4); },
  e4s25(ctx) { _sch(ctx); evoTag(ctx, _F4, 'DE MENS KIEST');
    kool(ctx, 'wild', 960, 560, 3.6); naamBij(ctx, 'wilde kool', 'BRASSICA OLERACEA', 960, 620, 1, 'center');
    const r = [['boerenkool', 'blad', 260, 470, [0, -40, 22, 34]], ['spruitjes', 'zijknoppen', 520, 760, [0, -40, 14, 40]], ['koolrabi', 'stengel', 1400, 790, [0, -13, 15, 15]], ['broccoli', 'bloeiwijze', 1660, 470, [0, -32, 17, 12]], ['bloemkool', 'bloeiwijze', 1660, 780, [0, -18, 16, 14]]];
    for (const [k, deel, x, y, n] of r) { kool(ctx, k, x, y, k === 'spruitjes' ? 2.6 : 3, { nadruk: n }); naamBij(ctx, k, deel, x, y + 50, 1, 'center'); }
    pijl(ctx, 820, 420, 380, 300, C.line, 0.6, 3); pijl(ctx, 830, 560, 640, 640, C.line, 0.6, 3); pijl(ctx, 1100, 560, 1300, 680, C.line, 0.6, 3); pijl(ctx, 1110, 420, 1540, 340, C.line, 0.6, 3); },
  e4s26(ctx) { _sch(ctx); evoTag(ctx, _F4, 'INTEELT EN DE GENENBANK');
    persoon(ctx, 'mila', 520, 860, 560, { pose: 'wijs' }); hond(ctx, 'mops', 960, 860, 8, { kijk: -1 });
    naamBij(ctx, 'Dierenarts Mila', null, 520, 250, 1, 'center');
    // mini-stamboom: één vader bij veel pups
    const vx = 1500, vy = 300; roundRect(ctx, vx - 26, vy - 26, 52, 52, 6); shape(ctx, rgba(C.goud, 0.3), C.goud, 3);
    for (let i = 0; i < 7; i++) { const px = 1260 + i * 80, py = 470; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, vy + 26); ctx.lineTo(px, py - 20); ctx.stroke(); circ(ctx, px, py, 20, rgba(C.fill, 0.9), C.line, 2); }
    naamBij(ctx, 'populaire dekreu', null, 1580, 290, 1, 'left', C.goud); metaText(ctx, 'veel pups · één vader', 1500, 560, C.grain, 'center', 26); },
  e4q27(ctx) { vraagKaart(ctx, ["Waarom hebben rashonden vaker erfelijke ziekten?"], ["Bij inteelt ontstaan meer mutaties", "Rashonden zijn zwakker door het leven in huis", "Jongen krijgen vaker twee dezelfde recessieve allelen"], _F4); },
  e4s28(ctx) { _sch(ctx); evoTag(ctx, _F4, 'INTEELT EN DE GENENBANK');
    pot(ctx, 300, 640, 1, { p: 0.8, n: 70, seed: 3, label: 'zelfde pot' }); _balk(ctx, 110, 740, 380, 0.8, 'gezond', 'ziek');
    text(ctx, 'vrij paren', 620, 330, fTekst(40, 600), C.text, 'left'); _knikkerRij(ctx, 640, 410, [[0, 0], [1, 0], [0, 0], [0, 1], [0, 0], [0, 0]], 18);
    text(ctx, 'inteelt', 620, 590, fTekst(40, 600), C.text, 'left'); _knikkerRij(ctx, 640, 670, [[1, 1], [0, 0], [0, 0], [1, 1], [0, 0], [0, 0]], 18);
    naamBij(ctx, 'homozygoot: ziekte zichtbaar', null, 1220, 760, 1, 'center', C.koraal); metaText(ctx, 'allelfrequentie blijft 20%', 1220, 230, C.grain, 'center', 26); },
  e4s29(ctx) { _sch(ctx); evoTag(ctx, _F4, 'INTEELT EN DE GENENBANK');
    genenbankRek(ctx, 140, 220, 860, 520); naamBij(ctx, 'genenbank', 'CGN WAGENINGEN · −20 °C', 570, 800, 1, 'center');
    const berg = (P, k) => { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = k; ctx.fill(); };
    berg([[1180, 780], [1450, 300], [1580, 430], [1700, 270], [1900, 780]], C.berg); berg([[1450, 300], [1505, 398], [1475, 385], [1440, 410], [1405, 372]], C.bergTop); berg([[1700, 270], [1760, 370], [1725, 360], [1690, 380], [1650, 345]], C.bergTop);
    roundRect(ctx, 1490, 620, 160, 140, 8); shape(ctx, '#2A3A58', C.line, 2); zaadPotje(ctx, 1570, 740, 90, '#C9A35C', true);
    pijl(ctx, 1010, 480, 1440, 640, C.goud, 1, 4); naamBij(ctx, 'reservekopie', 'Spitsbergen · >1,3 miljoen monsters', 1540, 210, 1, 'center'); },
  e4s30(ctx) { macroNacht(ctx, { horizon: 520 }); evoTag(ctx, _F4, 'INTEELT EN DE GENENBANK');
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 160 + i * 130 + (r % 2) * 50, y = 640 + r * 100; ctx.save(); ctx.globalAlpha = 0.45; kool(ctx, 'sluitkool', x, y, 2.2); ctx.restore(); circ(ctx, x + 10, y - 50, 11, rgba(C.koraal, 0.85)); circ(ctx, x - 14, y - 40, 7, rgba(C.koraal, 0.85)); }
    kool(ctx, 'sluitkool', 1560, 760, 4.2); naamBij(ctx, 'oud ras', 'ALLEL VOOR RESISTENTIE', 1560, 500, 1, 'center', C.groen); naamBij(ctx, 'één modern ras · nieuwe ziekte', null, 700, 520, 1, 'center'); },
  e4s31(ctx) { _sch(ctx); evoTag(ctx, _F4, 'SAMENVATTING');
    const T = [['antibioticum', 'selecteert resistente bacteriën', 0.1], ['fokken', 'kiest kleine honden', 0.4], ['veredelen', 'kiest grote bladeren, knoppen …', 0.55]];
    T.forEach(([t, s2, p], i) => { const x = 140 + i * 580; roundRect(ctx, x, 180, 520, 620, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5);
      text(ctx, t, x + 260, 250, fTekst(44, 700), C.text, 'center'); text(ctx, s2, x + 260, 300, fTekst(32, 400), C.text2, 'center');
      if (i === 0) { ctx.save(); ctx.beginPath(); ctx.rect(x + 20, 320, 480, 150); ctx.clip(); _kolonie(ctx, x + 260, 395, 200, 55, 8, 70, (k) => ({ type: k < 2 ? 'resistent' : 'gevoelig', dood: k < 2 ? 0 : 1, zweep: false }), 2); ctx.restore(); }
      if (i === 1) { hond(ctx, 'chihuahua', x + 360, 480, 5); wolf(ctx, x + 160, 480, 1.7, { a: 0.6 }); }
      if (i === 2) { kool(ctx, 'boerenkool', x + 160, 490, 1.9); kool(ctx, 'spruitjes', x + 360, 490, 1.5); }
      pot(ctx, x + 260, 730, 0.62, { p: p, n: 40, seed: i + 2 }); });
    haak(ctx, 140, 1780, 820, 'de mens bepaalt welke allelen vaker worden', C.groen); },
  e4s32(ctx) { _sch(ctx); metaText(ctx, 'EVOLUTIE 4/8 · DE MENS ALS SELECTIEFACTOR', 140, 160, C.text2, 'left', 26);
    const Z = ['Een antibioticum doodt bacteriën, geen virussen, en selecteert overal resistente bacteriën.', 'Plasmiden geven resistentie door, ook aan andere bacteriesoorten.', 'Fokken en veredelen is selectie door de mens; inteelt maakt jongen vaker homozygoot.'];
    Z.forEach((z, i) => { text(ctx, (i + 1) + '', 160, 320 + i * 130, fTekst(56, 800), C.goud, 'left'); ctx.font = fTekst(42, 500); ctx.fillStyle = C.text; wrap(ctx, z, 230, 320 + i * 130, 1500, 50); });
    haak(ctx, 140, 1700, 690, 'Zelf proberen: Resistentielab', C.groen); },
};
