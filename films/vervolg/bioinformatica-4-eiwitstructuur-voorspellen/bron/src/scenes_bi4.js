// Wat word jij? · Bio-informatica · film 4 Van letters naar vorm — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam 16, meeloopweek, standaardkleding; Dr. Kim 'gewoon'); Micro voor het eiwitmodel dat vouwt
// (eiwit3D uit teken_bi4.js, altijd met label 'model'). Doorlopend UI-element: envelop rechtsboven ('gemeten · nog geheim'),
// gaat open in H4. Echte personen alleen als naamkaartje. Geen collega-figurant: Dr. Kim houdt de envelop zelf vast (Kamiel akkoord). Het eiwitmodel is PDB 5DFR (E. coli DHFR).
// Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

const SEQ30 = EIWIT.SEQ.slice(0, 30).join('');
function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, FLOOR, 420, Object.assign({ t, uit: 'neutraal', kijk: 1 }, o)); }
function kim(ctx, x, t, o = {}) { return persoon(ctx, 'kim', x, FLOOR, 410, Object.assign({ t, uit: 'neutraal', kijk: -1, outfit: 'gewoon' }, o)); }
function modelLabel(ctx, x, y, a = 1, s2 = 'model · naar PDB ' + EIWIT.PDB) { metaA(ctx, s2, x, y, a, C.grain, 'center', 24); }
// paneel in Micro-look binnen een Schema-scène (alleen voor het eiwitmodel)
function microPaneel(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, C.bgMicro, rgba(C.line, 0.6), 1.5); ctx.restore(); }
// rij aminozuren als kralen (reeksobject aaKralen, okertinten) met optionele randen per kolom; x, y = midden van de eerste kraal
const UL_DX = 52, UL_R = 24;
function seqRij(ctx, x, y, s2, o = {}) { const { a = 1, kol = {}, upto = s2.length } = o; if (a <= 0.01) return; aaKralenRij(ctx, x, y, s2, { a, r: UL_R, dx: UL_DX, zicht: upto, rand: i => kol[i] || null }); }
// uitlijning rond de echte volgorde van 5DFR in twee blokken: aminozuur 34–43 en 86–95 (10 + 10 kolommen, '…' ertussen);
// de verwante rijen zijn VERZONNEN (voorbeeld). Kolom 4 en 14 = Lys38 en Glu90: in de echte vorm een zoutbrug
// (NZ–OE1 2,7 Å, nagemeten in werk/pdb/5dfr_minimized.pdb); in de verwanten veranderen ze samen, steeds + met − (E–K, R–D, D–R, K–E, R–E).
const UL_BASIS = EIWIT.SEQ.slice(33, 43).join('') + EIWIT.SEQ.slice(85, 95).join('');
const UL_PAAR = [4, 14];
const _ulMut = (paar, rest = {}) => { const c = UL_BASIS.split(''); c[4] = paar[0]; c[14] = paar[1]; Object.entries(rest).forEach(([k, v]) => { c[+k] = v; }); return c.join(''); };
const UL = [UL_BASIS, _ulMut('EK', { 1: 'S', 11: 'E' }), _ulMut('RD', { 7: 'L', 17: 'L' }), _ulMut('DR', { 2: 'M', 12: 'I' }), _ulMut('KE', { 9: 'A', 16: 'V' }), _ulMut('RE', { 0: 'D', 18: 'V' })];
const UL_NAAM = ['ons eiwit', 'verwant 1', 'verwant 2', 'verwant 3', 'verwant 4', 'verwant 5'];
const ulX = (x, k) => x + (k < 10 ? k : k + 1) * UL_DX; // kolom k → x (gat na kolom 9)
function uitlijningAA(ctx, x, y, o = {}) { const { a = 1, rijen = 6, paar = 0, upto0 = 20, rijA = null } = o; if (a <= 0.01) return; const n = UL_BASIS.length;
  for (let r = 0; r < 6; r++) { const ra = (rijA ? rijA[r] : (r < rijen ? 1 : 0)) * a; if (ra <= 0.01) continue; const yy = y + r * 64;
    metaA(ctx, UL_NAAM[r], x - UL_R - 20, yy + 8, ra, r === 0 ? C.text : C.text2, 'right', 22);
    const kol = {}; if (paar > 0.5) UL_PAAR.forEach(k => { kol[k] = C.goud; }); else { for (let k = 0; k < n; k++) if (r > 0 && UL[r][k] !== UL[0][k]) kol[k] = rgba(C.koraal, 0.85); }
    const up = r === 0 ? upto0 : n;
    seqRij(ctx, x, yy, UL[r].slice(0, 10), { a: ra, kol, upto: Math.min(10, up) });
    if (up > 10) { const kol2 = {}; Object.entries(kol).forEach(([k, v]) => { if (+k >= 10) kol2[+k - 10] = v; }); seqRij(ctx, ulX(x, 10), yy, UL[r].slice(10), { a: ra, kol: kol2, upto: up - 10 }); }
    if (up > 10) text(ctx, '…', x + 10 * UL_DX, yy + 10, fTekst(36, 700), rgba(C.text2, ra), 'center'); }
  metaA(ctx, '34–43', x - UL_R, y - 44, a * 0.9, C.text2, 'left', 20); metaA(ctx, '86–95', ulX(x, 10) - UL_R, y - 44, a * 0.9 * (upto0 > 10 ? 1 : 0), C.text2, 'left', 20);
  if (paar > 0.01) { ctx.save(); ctx.globalAlpha *= paar * a; UL_PAAR.forEach(k => { const xx = ulX(x, k); roundRect(ctx, xx - UL_R - 9, y - UL_R - 10, 2 * UL_R + 18, 5 * 64 + 2 * UL_R + 20, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }); ctx.restore(); } }
// gok-vorm (lus 'leren van voorbeelden'): mini-eiwit met afwijking err
function miniGok(ctx, x, y, s, err, a = 1, col = C.koraal, seed = 3) { if (a <= 0.01) return; const r = bi4Rng(seed); const base = EIWIT.MINI;
  const pts = base.map(([px, py]) => [x + (px + (r() - 0.5) * 34 * err) * s, y + (py + (r() - 0.5) * 34 * err) * s]); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); pts.forEach(p => circ(ctx, p[0], p[1], 5 * s, col)); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) {
    microPaneel(ctx, 1180, 430, 640, 420, 1);
    eiwit3D(ctx, 1500, 630, 6.2, { fold: clamp((t - 0.6) / 4.5, 0, 1), t, yaw: 0.95 + 0.25 * Math.sin(t * 0.25), lint: ramp(t, 5.6, 1) });
    modelLabel(ctx, 1500, 830, 1);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); afdeling(ctx, 1, false);
    const E1 = q.on('envelop', 1, 0.4);
    kim(ctx, 1450, t, { pose: 'vasthouden', kijk: -1, hold: (c, hx, hy) => envelopBi(c, hx - 4, hy + 6, 0.36, {}) });
    naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1450, 380, 1, 'center');
    tag(ctx, 'gemeten · nog geheim', 1450, 300, C.goud, E1, 'center', 28);
    const S = q.on('Sam', 1, 0.3);
    sam(ctx, 1080, t, { a: S, pose: 'vasthouden', kijk: 1, hold: (c, hx, hy) => { c.save(); c.translate(hx, hy); c.rotate(-0.15); roundRect(c, -34, -22, 68, 44, 4); shape(c, '#FBF8F1', KL_PAPIER_R, 1.5); c.fillStyle = '#5A6478'; for (let k = 0; k < 3; k++) c.fillRect(-26, -12 + k * 10, 52, 3); c.restore(); } });
    naamBij(ctx, 'Sam', 'meeloopweek · dag 4', 1080, 380, S, 'center');
    // het briefje groot: volgorde van de aminozuren
    const B = q.on('volgorde', 1, 0.5); briefje(ctx, 470, 290, SEQ30, { a: B, upto: Math.floor(clamp((t - q.at('volgorde', 1)) / 2.2, 0, 1) * 30) });
    metaA(ctx, 'volgorde van de aminozuren', 470, 400, B, C.grain, 'center', 24);
    // in de cel vouwt die keten tot die vorm (Micro-paneel)
    const P = q.on('vouwt', 1, 0.5); microPaneel(ctx, 160, 450, 620, 380, P);
    if (P > 0.01) { eiwit3D(ctx, 470, 640, 6.2, { a: P, fold: clamp((t - q.at('vouwt', 1)) / 3.4, 0, 1), t }); modelLabel(ctx, 470, 815, P); }
    tag(ctx, 'computer?', 1260, 220, C.teal, q.on('computer', 1), 'center', 34);
  },

  // ---------- H1 Wat staat er op het spel? ----------
  s03(ctx, t, q) { microVlak(ctx); envUI(ctx);
    // ribosoom met de keten die eruit komt (Van DNA naar eiwit)
    const R = 1 - q.on('Die', 1, 0.6);
    ribosoomBi(ctx, 330, 420, 230, R); naamBij(ctx, 'ribosoom', '', 330, 640, R, 'center');
    filmKaartje(ctx, 330, 230, 'Van DNA naar eiwit', q.on('Van', 1) * R);
    if (R > 0.01) { const n = 6 + Math.floor(clamp(t / 8, 0, 1) * 18); for (let k = 0; k < n; k++) { const px = 470 + k * 26, py = 400 + Math.sin(k * 0.6 + t * 0.6) * 22; ctx.save(); ctx.globalAlpha *= R; circ(ctx, px, py, 11, AA_KL[EIWIT.KIND[k]], lighten(AA_KL[EIWIT.KIND[k]], 0.35), 1.2); ctx.restore(); } naamBij(ctx, 'keten van aminozuren', '', 700, 500, q.on('keten', 1) * R, 'left'); }
    // de keten vouwt tot een eiwitstructuur
    const V0 = q.at('vouwt', 1), F = clamp((t - V0) / 4.5, 0, 1), M = q.on('vouwt', 1, 0.4);
    const hol = q.on('holte', 1), sub = q.on('substraat', 1);
    if (M > 0.01) { eiwit3D(ctx, 960, 470, 11, { a: M, fold: F, t, holte: hol, letters: q.on('volgorde', 1) * (1 - q.on('bepaalt', 1)), medicijn: sub, substraat: true, medicijnPos: sub < 0.99 ? medPos(1 - sub) : null, lint: q.on('ruimtelijke', 1) * (1 - q.on('volgorde', 1)) });
      modelLabel(ctx, 960, 790, M); }
    naamBij(ctx, 'eiwitstructuur', 'de ruimtelijke vorm', 1260, 300, q.on('eiwitstructuur', 1), 'left');
    naamBij(ctx, 'holte', 'voor het substraat', 1260, 470, hol, 'left');
    // een antistof grijpt één vorm
    const A = q.on('antistof', 1); antistofBi(ctx, 1640, 640, 2.2, 0, { a: A }); if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; ctx.beginPath(); ctx.moveTo(1640 - 70, 560); ctx.lineTo(1640, 520); ctx.lineTo(1640 + 70, 560); ctx.lineTo(1640, 600); ctx.closePath(); shape(ctx, rgba(C.koraal, 0.35), C.koraal, 2); ctx.restore(); }
    naamBij(ctx, 'antistof', 'grijpt één vorm', 1640, 770, A, 'center');
    filmKaartje(ctx, 560, 820, 'Alles versneld', q.on('Alles', 1)); filmKaartje(ctx, 1080, 820, 'Antistoffen op maat', q.on('Antistoffen', 1)); },

  s04(ctx, t, q) { microVlak(ctx); envUI(ctx);
    bacterieCel(ctx, 330, 560, 380, { t, rot: -0.25 }); naamBij(ctx, 'ziekteverwekker', 'bacterie', 330, 720, q.on('ziekteverwekker', 1), 'center');
    zoomCircle(ctx, 1150, 450, 340, 380, 560, '', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(800, 100, 700, 700);
      const md = q.on('medicijn', 1, 0.5), pas = clamp((t - q.at('passen', 1)) / 1.6, 0, 1);
      eiwit3D(ctx, 1150, 450, 11, { t, holte: q.on('holte', 1), hl: q.on('ander', 1) > 0.5 ? [EIWIT.MUT] : [], medicijn: md * (1 - 0.6 * q.on('ander', 1)), medicijnPos: pas < 1 ? medPos(1 - ease(pas)) : null, mutKleur: q.on('ander', 1) }); });
    naamBij(ctx, 'enzym met holte', 'model · naar PDB ' + EIWIT.PDB, 1150, 830, 1, 'center');
    naamBij(ctx, 'medicijn', 'past in de holte', 1540, 300, q.on('medicijn', 1) * (1 - q.on('stel', 1)), 'left');
    filmKaartje(ctx, 330, 230, 'Sleutel, slot en dosis', q.on('Sleutel', 1));
    tag(ctx, 'één ander aminozuur', 1640, 520, C.koraal, q.on('ander', 1), 'center', 30);
    vraagteken(ctx, 1640, 700, q.on('denk', 1), 100); },

  s06(ctx, t, q) { microVlak(ctx); envUI(ctx); bi4Antwoord(ctx, 'antwoord b: de holte krijgt een andere vorm');
    const mu = clamp((t - q.at('veranderen', 1)) / 1.8, 0, 1);
    const weg = clamp((t - q.at('past', 1)) / 1.6, 0, 1);
    eiwit3D(ctx, 560, 500, 10.5, { t, holte: 1, medicijn: 1 }); modelLabel(ctx, 560, 800, 1, 'model · zoals eerst');
    eiwit3D(ctx, 1360, 500, 10.5, { t, holte: 1, mutant: ease(mu), mutKleur: 1, medicijn: q.on('medicijn', 1), medicijnPos: medPos(0.9 * ease(weg), 8) });
    modelLabel(ctx, 1360, 800, 1, 'model · één ander aminozuur');
    naamBij(ctx, 'holte verandert', '', 1360, 250, q.on('veranderen', 1), 'center');
    tag(ctx, 'bouwt de holte niet terug', 960, 360, C.koraal, q.on('terug', 1) * (1 - q.on('past', 1)), 'center', 28);
    kruis(ctx, 1560, 360, 26, q.on('meer', 1));
    tag(ctx, 'medicijn past niet meer', 1600, 300, C.koraal, q.on('meer', 1), 'center', 26);
    tag(ctx, 'het lab wil de vorm precies weten', 960, 220, C.goud, q.on('lab', 1), 'center', 28); },

  // ---------- H2 Wat zit er in de envelop? ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx);
    const env = 1 - q.on('kristal', 1, 0.5); envelopBi(ctx, 960, 470, 1.2, { a: env, open: 0 });
    metaA(ctx, 'terugblik · zo kwam de vorm in de envelop', 960, 230, 1, C.grain, 'center', 26);
    const K = q.on('kristal', 1, 0.5); kristalPlaat(ctx, 280, 400, 0.9, { a: K, hl: q.on('heel', 1) }); naamBij(ctx, 'kristal', 'heel veel dezelfde eiwitten', 280, 560, K, 'center');
    const Z = q.on('heel', 1, 0.6) * (1 - q.on('zagen', 1));
    zoomCircle(ctx, 300, 730, 120, 300, 600, '', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(160, 600, 300, 300); kristalRooster(ctx, 300, 730, 260, 260, 1); });
    const RX = q.on('röntgenstraling', 1, 0.4); rontgen(ctx, 860, 400, { a: RX, bundel: clamp((t - q.at('röntgenstraling', 1)) / 1.2, 0, 1), stip: clamp((t - q.at('stippenpatroon', 1)) / 1.5, 0, 1) });
    naamBij(ctx, 'stippenpatroon', '', 1310, 600, q.on('stippenpatroon', 1), 'center');
    const T = q.on('terug', 1, 0.5); pijl(ctx, 1480, 400, 1560, 400, C.line, T, 3, 14); miniEiwit(ctx, 1680, 400, 2.2, T); naamBij(ctx, 'vorm', 'teruggerekend', 1680, 520, T, 'center');
    chip(ctx, '1958 · myoglobine', 860, 720, C.goud, q.on('1958', 1), 30);
    const CR = q.on('bevroren', 1, 0.5); cryoRooster(ctx, 1380, 770, 80, { a: CR }); sneeuw(ctx, 1475, 705, 20, CR);
    naamBij(ctx, 'cryo-EM', 'bevroren · zonder kristal', 1285, 765, CR, 'right'); chip(ctx, 'scherp sinds ± 2013', 1640, 850, C.teal, q.on('scherp', 1), 24); },

  s08(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx);
    const J = 1; kalenderBi(ctx, 260, 320, 1, clamp((t - q.at('jaren', 1)) / 3.5, 0, 1), J); naamBij(ctx, 'jaren werk', '', 260, 470, J, 'center');
    chip(ctx, 'dure apparaten', 600, 330, C.koraal, q.on('apparaten', 1), 30);
    // twee balken op schaal: gemeten structuren tegen bekende eiwitten
    const X0 = 160, WB = 1300, B1 = q.on('kwart', 1, 0.5), B2 = q.on('tweehonderd', 1, 0.8);
    if (B1 > 0.01) { ctx.save(); ctx.globalAlpha *= B1; roundRect(ctx, X0, 560, Math.max(4, WB * 250441 / 200e6), 44, 2); shape(ctx, C.goud, null); ctx.restore();
      naamBij(ctx, '± 250 000 structuren gemeten', 'databank pdb · openbaar', X0 + 20, 545, B1, 'left'); }
    if (B2 > 0.01) { ctx.save(); ctx.globalAlpha *= B2; roundRect(ctx, X0, 690, WB * ease(B2), 44, 8); shape(ctx, rgba(V.ew, 0.6), V.ew, 2); ctx.restore();
      naamBij(ctx, '> 200 000 000 eiwitten bekend', '', X0, 790, B2, 'left'); metaA(ctx, 'op schaal', X0 + WB, 790, B2, C.text2, 'right', 24); }
    const S = q.on('Sams', 1, 0.3); sam(ctx, 1700, t, { a: S, pose: 'denk', kijk: -1 }); naamBij(ctx, 'Sam', '', 1700, 380, S, 'center');
    wolk(ctx, 1260, 210, 430, 110, 'elke vorm proberen?', q.on('idee', 1), '#F2F2EE', 30);
    vraagteken(ctx, 1500, 470, q.on('denk', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx); bi4Antwoord(ctx, 'antwoord a: veel te veel vormen');
    // elke schakel drie kanten op: de boom waaiert uit
    const D = clamp((t - q.at('drie', 1)) / 7, 0, 1); waaier(ctx, 140, 230, 820, 600, Math.max(0.16, D), 1);
    metaA(ctx, 'schakel 1 · 2 · 3 · 4 · 5 · 6 · 7 …', 140, 870 - 10 - 20, q.on('drie', 1), C.text2, 'left', 22);
    naamBij(ctx, '100 aminozuren', 'elke schakel 3 kanten op', 560, 240, 1 - q.on('macht', 1), 'center');
    const XR = 1080;
    regel(ctx, '3 × 3 × 3 × … (100 keer)', XR, 290, q.on('macht', 1, 0.5), C.text, 40, 'left', 600);
    regel(ctx, '= 3¹⁰⁰ ≈ 5 × 10⁴⁷ vormen', XR, 360, q.on('macht', 1, 0.5), C.goud, 48, 'left', 700);
    { const a = q.on('zevenenveertig', 1, 0.5); const s47 = '5' + '0'.repeat(47); const g = s47.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      metaA(ctx, g.slice(0, 31), XR, 420, a, C.text2, 'left', 26); metaA(ctx, g.slice(31), XR, 458, a, C.text2, 'left', 26); }
    regel(ctx, 'stel: 10¹² vormen per seconde', XR, 550, q.on('biljoen', 1), C.text, 34, 'left', 600);
    regel(ctx, 'nodig: ± 10²⁸ jaar', XR, 610, q.on('duurt', 1), C.koraal, 38, 'left', 700);
    regel(ctx, 'heelal: ± 10¹⁰ jaar oud', XR, 664, q.on('heelal', 1), C.text2, 34, 'left', 600);
    metaA(ctx, 'vereenvoudigd', XR, 720, q.on('macht', 1), C.grain, 'left', 24);
    const V2 = q.on('doorloopt', 1, 0.5); miniEiwit(ctx, 1150, 800, 1.3, V2); regel(ctx, 'het eiwit zelf vouwt veel sneller', 1220, 812, V2, C.groen, 32, 'left', 700); },

  // ---------- H3 De voorspelling maken ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx);
    sam(ctx, 240, t, { pose: 'wijs', kijk: 1 }); naamBij(ctx, 'Sam', '', 240, 380, 1, 'center');
    codeScherm(ctx, 480, 220, 1340, 620, [], { tab: 'AlphaFold · Google DeepMind' });
    const X = 700, Y = 330; const typ = clamp((t - q.at('plakt', 1)) / 2.2, 0, 1);
    const zoek = clamp((t - q.at('zoekt', 1)) / 3, 0, 1), onder = q.on('onder', 1, 0.6);
    const rijA = [1, 0, 0, 0, 0, 0].map((v, r) => r === 0 ? 1 : clamp((t - q.at('onder', 1) - r * 0.35) / 0.4, 0, 1));
    uitlijningAA(ctx, X, Y, { upto0: Math.ceil(typ * 20), rijA, paar: q.on('samen', 1) });
    if (typ < 1) cursor(ctx, ulX(X, Math.ceil(typ * 20)) - UL_R + 4, Y - 20, 40, t);
    voortgang(ctx, 760, 760, 600, zoek, 'zoekt verwante eiwitten uit andere soorten', q.on('zoekt', 1) * (1 - onder * 0.6));
    filmKaartje(ctx, 1600, 790, 'uitlijnen · film 1', q.on('eerste', 1) * 1);
    vraagteken(ctx, 1730, 420, q.on('denk', 1), 90); },

  s13(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx); bi4Antwoord(ctx, 'antwoord c: ze liggen tegen elkaar');
    // links: de twee kolommen uit de uitlijning (hoe minder verwanten, hoe minder rijen)
    const minder = q.on('minder', 1, 0.8);
    for (let r = 0; r < 6; r++) { const ra = r < 2 ? 1 : 1 - minder; if (ra <= 0.01) continue; const yy = 250 + r * 70; metaA(ctx, UL_NAAM[r], 230, yy + 36, ra, r ? C.text2 : C.text, 'right', 22);
      UL_PAAR.forEach((k, j) => aaKralenRij(ctx, 290 + j * 110, yy + 29, UL[r][k], { a: ra, r: 26, rand: () => C.goud })); }
    // rechts: het model, de twee kralen raken elkaar
    zoomCircle(ctx, 1160, 460, 290, 420, 420, '', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(860, 160, 600, 600); modelLabel(ctx, 1160, 640, 1);
      const R = eiwit3D(ctx, 1160, 480, 11, { t, ruis: 0.5, hl: EIWIT.PAAR, contact: q.on('schets', 1) * (1 - 0.6 * minder), yaw: 0.5 });
      const wissel = q.on('mee', 1, 0.5) > 0.5; EIWIT.PAAR.forEach((i, j) => { const p = R.S[i]; text(ctx, j === 0 ? (wissel ? 'E' : 'K') : (wissel ? 'K' : 'E'), p[0], p[1] + 9, `700 26px ${F.meta}`, C.bgMicro, 'center'); }); });
    tag(ctx, 'raken elkaar · passen bij elkaar', 1160, 830, C.goud, q.on('raken', 1) * (1 - q.on('schets', 1)), 'center', 28);
    tag(ctx, 'verandert de één, dan de ander mee', 560, 780, C.goud, q.on('Verandert', 1) * (1 - q.on('geven', 1)), 'center', 28);
    tag(ctx, 'samen: een schets van de vorm', 1160, 830, C.teal, q.on('schets', 1), 'center', 28);
    tag(ctx, 'minder verwanten → minder hints', 560, 780, C.koraal, minder, 'center', 28); },

  s14(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx);
    // stapel voorbeelden: volgorde + gemeten vorm
    const V0 = 1; for (let k = 5; k >= 0; k--) voorbeeldKaart(ctx, 300 + k * 10, 430 - k * 12, 1.1, 40 + k, V0);
    naamBij(ctx, '> 100 000 voorbeelden', 'volgorde + gemeten vorm · pdb', 330, 600, q.on('honderdduizend', 1), 'center');
    // de lus: gok → vergelijk → bijstellen; de gok komt steeds dichter bij de echte vorm
    const L = 0.35 + 0.65 * q.on('gokte', 1, 0.5); const cx = 1110, cy = 470, rr = 220; const tl = q.at('herhaalde', 1); const iter = t > tl ? (t - tl) * 2.2 : 0;
    lusPijl(ctx, cx, cy, rr, t * (t > tl ? 3 : 0.6), L);
    metaA(ctx, 'gok', cx, cy - rr - 24, q.on('gokte', 1), C.koraal, 'center', 28);
    metaA(ctx, 'vergelijk', cx + rr + 30, cy + rr * 0.6, q.on('vergeleek', 1), C.text, 'left', 28);
    metaA(ctx, 'bijstellen', cx - rr - 30, cy + rr * 0.6, q.on('stelde', 1), C.groen, 'right', 28);
    const err = Math.max(0.05, 1 - 0.25 * q.on('stelde', 1) - 0.12 * Math.min(6, iter));
    miniEiwit(ctx, cx, cy, 2.2, q.on('echte', 1), { lijn: KL_MEET }); miniGok(ctx, cx, cy, 2.2, err, L * 0.85);
    naamBij(ctx, 'echte vorm', 'wit', cx + 120, cy - 40, q.on('echte', 1), 'left', KL_MEET); naamBij(ctx, 'gok', '', cx - 120, cy + 70, q.on('gokte', 1) * q.on('echte', 1), 'right', C.koraal);
    // geen voorgeschreven stappen; patronen uit de voorbeelden
    const N = q.on('Niemand', 1); document_(ctx, 1600, 330, 2.2, C.line, N); kruis(ctx, 1600, 330, 46, N);
    regel(ctx, 'geen stappenplan voor het vouwen', 1600, 450, N, C.text2, 28, 'center', 600);
    regel(ctx, 'patronen uit de voorbeelden', 1600, 640, q.on('patronen', 1), C.groen, 32, 'center', 700); },

  s15(ctx, t, q) { bg(ctx, 'schema'); envUI(ctx);
    tag(ctx, 'CASP · blind · sinds 1994', 1460, 270, C.goud, q.on('CASP', 1), 'center', 32);
    tag(ctx, 'net gemeten, nog geheim', 1460, 360, C.text2, q.on('geheim', 1), 'center', 28);
    chip(ctx, 'eerlijk getest: zoals Sam nu', 600, 230, C.goud, q.on('eerlijk', 1) * (1 - q.on('score', 1)), 30);
    scorebord(ctx, 220, 300, 760, 420, { a: 0.35 + 0.65 * q.on('score', 1, 0.5), b16: q.on('moeilijke', 1), b18: q.on('zestig', 1), b20: q.on('negentig', 2), lijn: q.on('negentig', 1, 1.2) });
    metaA(ctx, 'beste team · moeilijke eiwitten', 340, 278, q.on('moeilijke', 1), C.text2, 'left', 24);
    regel(ctx, 'zo goed als meten', 990, 300 + 420 - 378 + 8, q.on('meten', 2), C.groen, 30, 'left', 700);
    metaA(ctx, 'alle eiwitten 2020: mediaan 92,4', 220, 300 + 420 + 84, q.on('negentig', 2), C.text2, 'left', 22);
    chip(ctx, 'Nobelprijs voor Scheikunde 2024', 1460, 480, C.goud, q.on('Nobelprijs', 1), 30);
    naamKaartje(ctx, 1290, 610, 'Demis Hassabis', 'alphafold', q.on('Hassabis', 1)); naamKaartje(ctx, 1640, 610, 'John Jumper', 'alphafold', q.on('Jumper', 1));
    naamKaartje(ctx, 1460, 760, 'David Baker', 'eiwitten ontwerpen', q.on('Baker', 1), C.teal); },

  // ---------- H4 De envelop gaat open ----------
  s16(ctx, t, q) { microVlak(ctx);
    const PL = q.on('kleuren', 1, 1.2);
    eiwit3D(ctx, 700, 480, 12, { t, kleur: 'pl', plA: PL, lint: 0 }); modelLabel(ctx, 700, 800, 1, 'sams voorspelling · model');
    plLegenda(ctx, 1180, 250, q.on('blauw', 1));
    regel(ctx, 'bijna alles blauw', 1180, 380, q.on('Bijna', 1), C.text, 32, 'left', 700);
    const O = clamp((t - q.at('open', 1)) / 1.2, 0, 1);
    envelopBi(ctx, 1500, 600, 0.9, { open: O, uit: clamp((t - q.at('open', 1) - 0.6) / 1.2, 0, 1) });
    metaA(ctx, O > 0.5 ? 'gemeten vorm · voorbeeld' : 'gemeten · nog geheim', 1500, 760, 1, C.grain, 'center', 24);
    vraagteken(ctx, 1750, 470, q.on('denk', 1), 90); },

  s18(ctx, t, q) { microVlak(ctx); envUI(ctx, { open: 1 }); bi4Antwoord(ctx, 'antwoord a: in de oranje stukken');
    const M = q.on('blauwe', 1, 0.8), Hh = q.on('holte', 1), D = q.on('anders', 1, 0.8);
    const R = eiwit3D(ctx, 640, 500, 12.5, { t, ruis: 0.4, kleur: 'pl', meting: M, verschil: D, holte: Hh * (1 - D * 0.5) });
    modelLabel(ctx, 640, 820, 1, 'voorbeeld · zo gaat het vaak');
    naamBij(ctx, 'meting', 'uit de envelop · wit', 380, 560, M, 'right');
    if (R) naamBij(ctx, 'oranje lus', 'ligt anders', Math.max(R.box[2] + 40, 960), Math.min(R.box[1] + 60, 330), q.on('lus', 1), 'left');
    // gemiddeld ± 90 ≠ elk stuk
    const G = q.on('gemiddelde', 1, 0.6); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; const vals = [96, 92, 88, 95, 71, 93, 90, 85, 98, 94, 64, 91]; const bx = 1180, by = 560, bw = 40;
      vals.forEach((v, k) => { roundRect(ctx, bx + k * 50, by - v * 2.2, bw, v * 2.2, 5); shape(ctx, rgba(C.teal, 0.45), C.teal, 1.5); });
      ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(bx - 10, by - 90 * 2.2); ctx.lineTo(bx + 12 * 50, by - 90 * 2.2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      metaA(ctx, 'per eiwit · voorbeeld', 1180, 610, G, C.text2, 'left', 22); }
    tag(ctx, 'gemiddeld ± 90 ≠ elk stuk', 1480, 280, C.goud, q.on('Per', 1), 'center', 30);
    tag(ctx, 'geen vaste vorm?', 1330, 720, C.koraal, q.on('vaste', 1), 'center', 28);
    tag(ctx, 'te weinig hints?', 1650, 720, C.koraal, q.on('weinig', 1), 'center', 28);
    regel(ctx, 'de kleur zegt niet welke', 1490, 810, q.on('kleur', 1), C.text2, 28, 'center', 600); },

  s19(ctx, t, q) { microVlak(ctx); envUI(ctx, { open: 1 });
    const B = q.on('beweegt', 1), BI = clamp((t - q.at('bindt', 1) + 1.6) / 2.4, 0, 1), F2 = q.on('Nieuwere', 1);
    const dicht = BI > 0 ? ease(BI) * (1 - 0) : 0;
    eiwit3D(ctx, 620, 520, 12, { t, ruis: 1 + 1.4 * B, holte: q.on('enzym', 1), dicht: dicht * (1 - 0) , medicijn: q.on('enzym', 1), medicijnPos: BI < 1 ? medPos(1 - ease(BI)) : null });
    modelLabel(ctx, 620, 830, 1);
    naamBij(ctx, 'echt eiwit beweegt', '', 620, 190, B, 'center');
    naamBij(ctx, 'vorm verandert even bij binding', '', 620, 245, q.on('veranderen', 1), 'center');
    // fase 1: wat lastig blijft
    const p1 = 1 - F2; tag(ctx, 'hoe bindt een medicijn precies?', 1460, 300, C.koraal, q.on('medicijn', 1) * p1, 'center', 28);
    tag(ctx, 'wat doet één ander aminozuur?', 1460, 400, C.koraal, q.on('veranderd', 1) * p1, 'center', 28);
    regel(ctx, 'lastig', 1460, 480, q.on('lastig', 1) * p1, C.text2, 34, 'center', 700);
    // fase 2: nieuwere versies, hypothese, databank
    if (F2 > 0.01) { ctx.save(); ctx.globalAlpha *= F2; roundRect(ctx, 1120, 230, 690, 120, 14); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
      text(ctx, 'AlphaFold 3 (2024): ook met kleine moleculen', 1150, 280, fTekst(30, 700), C.text, 'left'); metaText(ctx, 'nog steeds een voorspelling', 1150, 324, C.grain, 'left', 22); ctx.restore(); }
    stempel(ctx, 1460, 460, 'hypothese', C.goud, q.on('hypothese', 1));
    { const a = q.on('kiezen', 1); miniEiwit(ctx, 1240, 600, 1.2, a, { col: KL_PL[1] }); pijl(ctx, 1310, 600, 1400, 600, C.line, a, 3, 12); kristalPlaat(ctx, 1500, 600, 0.38, { a }); pijl(ctx, 1590, 600, 1660, 600, C.line, q.on('testen', 1), 3, 12); regel(ctx, 'meten en testen', 1680, 610, q.on('testen', 1), C.text, 28, 'left', 700); }
    { const a = q.on('tweehonderd', 1, 0.5); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1120, 690, 690, 110, 14); shape(ctx, rgba(C.teal, 0.12), C.teal, 2); for (let k = 0; k < 5; k++) miniEiwit(ctx, 1170 + k * 34, 745 + (k % 2) * 6, 0.7, 1, { col: KL_PL[k % 2] }); ctx.restore();
        text(ctx, '± 200 miljoen voorspellingen · gratis', 1350, 758, fTekst(30, 700), C.text, 'left'); } } },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema');
    briefje(ctx, 330, 330, SEQ30, { w: 440 }); metaA(ctx, 'volgorde', 330, 440, 1, C.grain, 'center', 22);
    pijl(ctx, 570, 330, 650, 330, C.line, 1, 3, 14);
    microPaneel(ctx, 670, 170, 460, 340, 1); eiwit3D(ctx, 900, 340, 5.8, { t, ruis: 0.3, kleur: 'pl', meting: q.on('openging', 1), verschil: q.on('zekere', 1) });
    metaA(ctx, 'voorspelling + meting', 900, 545, 1, C.grain, 'center', 22);
    pijl(ctx, 1150, 330, 1230, 330, C.line, 1, 3, 14); envelopBi(ctx, 1420, 340, 0.75, { open: 1, uit: 1 });
    vink_(ctx, 712, 470, 18, q.on('zekere', 1)); regel(ctx, 'zeker: klopte', 740, 482, q.on('zekere', 1), C.groen, 26, 'left', 700);
    kruis(ctx, 1000, 470, 14, q.on('onzekere', 1)); regel(ctx, 'onzeker: niet', 1022, 482, q.on('onzekere', 1), C.koraal, 26, 'left', 700);
    chip(ctx, 'niet alles uitproberen', 420, 680, C.koraal, q.on('proberen', 1), 30);
    chip(ctx, 'leren van voorbeelden', 960, 680, C.teal, q.on('leerde', 1), 30);
    chip(ctx, 'hints uit uitlijnen', 1500, 680, C.goud, q.on('hints', 1), 30);
    stempel(ctx, 1640, 520, 'toets het', C.groen, q.on('toets', 1)); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    opleidingBi(ctx, 120, 200, 820, 'hbo · 4 jaar', 'Bio-informatica', 'HAN · Nijmegen', 1, C.teal);
    opleidingBi(ctx, 120, 380, 820, 'wo-bachelor · 3 jaar', 'Biology of Molecular Life Sciences', 'Radboud Universiteit · Nijmegen', q.on('bachelor', 1), C.paars);
    pijl(ctx, 530, 535, 530, 572, C.line, q.on('master', 1), 3, 12);
    opleidingBi(ctx, 120, 580, 820, 'wo-master · 2 jaar', 'Bioinformatics and Systems Biology', 'Wageningen University & Research', q.on('master', 1), C.paars);
    [['ziekenhuis', 'ziekenhuis'], ['instituut', 'onderzoeksinstituut'], ['bedrijf', 'bedrijf']].forEach(([s2, w], k) => { werkIcoon(ctx, 1110 + k * 170, 300, s2, q.on(w, 1)); metaA(ctx, k === 1 ? 'instituut' : s2, 1110 + k * 170, 400, q.on(w, 1), C.text2, 'center', 22); });
    sam(ctx, 1260, t, { kijk: 1 }); kim(ctx, 1560, t, { pose: q.on('samen', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1 });
    kristalPlaat(ctx, 1770, 650, 0.55, { a: q.on('lab', 1) }); tag(ctx, 'samen met het lab', 1745, 545, C.goud, q.on('lab', 1), 'center', 26); }
});
