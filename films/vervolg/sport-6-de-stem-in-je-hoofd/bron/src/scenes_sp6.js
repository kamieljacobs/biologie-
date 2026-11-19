// Wat word jij? · Sport en topsport 6 · De stem in je hoofd — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast (de zwemmer = Sam, outfit 'zwem'; sportpsycholoog; zwemtrainer). Geen namen in beeld.
// Decor (zwembad, wachtruimte, kamer) alleen waar de scène op die plek speelt; schema's op navy. Klok rechtsboven telt af naar de start.

// ---------- gedeelde scènedelen ----------
const SP6_KOUD = ['WAT ALS IK DE START MIS?', 'IEDEREEN KIJKT', 'WAT ALS IK HET VERPEST?'];
// voorkant van een startblok (vooraanzicht), (x, y) = midden bovenkant
function SP6_blokVoor(ctx, x, y, w, voet, nr) { ctx.fillStyle = '#5E6A80'; ctx.fillRect(x - w * 0.36, y + 24, w * 0.1, voet - y - 24); ctx.fillRect(x + w * 0.26, y + 24, w * 0.1, voet - y - 24);
  roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, SP6.blok, null); roundRect(ctx, x - w * 0.3, y + 34, w * 0.6, w * 0.42, 8); shape(ctx, '#2E5C8A', null);
  text(ctx, nr, x, y + 34 + w * 0.3, fTekst(w * 0.28, 800), C.text, 'center'); }
// startkant in vooraanzicht: muur met tribune, dek, water vooraan
function SP6_startkant(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, 690);
  ctx.fillStyle = '#2A3550'; ctx.fillRect(0, 150, W, 230); // tribune
  for (let r = 0; r < 4; r++) for (let i = 0; i < 34; i++) { const px = 20 + i * 57 + (r % 2) * 28, py = 190 + r * 52, kl = r % 2 ? '#46547A' : '#525F86'; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(px, py + 22, 22, 15, 0, 0, 6.283); ctx.fill(); circ(ctx, px, py, 13, _mixHex(kl, '#FFFFFF', 0.1)); }
  ctx.fillStyle = '#3A4A66'; ctx.fillRect(0, 380, W, 16);
  ctx.fillStyle = SP6.vloer; ctx.fillRect(0, 770, W, 30); ctx.fillStyle = SP6.water; ctx.fillRect(0, 800, W, 80);
  ctx.strokeStyle = rgba(SP6.waterL, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= W; px += 12) { const py = 803 + 3 * Math.sin(px * 0.02 + t * 2); px ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
function SP6_scorebord(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 330, y - 50, 660, 100, 10); shape(ctx, '#0D1420', '#4A5A78', 3);
  text(ctx, 'FINALE 100 M VRIJ', x, y + 18, fTekst(50, 800), '#F2C94C', 'center'); ctx.restore(); }
// de zwemmer in de startrij (vooraanzicht) achter blok 4, met finalisten achter blok 3 en 5
function SP6_startrij(ctx, t, o = {}) { const { uit = 'bezorgd' } = o;
  persoon(ctx, 'bilal', 300, 770, 520, { outfit: 'zwem', t }); persoon(ctx, 'daan', 1620, 770, 490, { outfit: 'zwem', t });
  const r = persoon(ctx, 'sam', 960, 770, 520, { outfit: 'zwem', uit, t });
  SP6_blokVoor(ctx, 300, 610, 230, 770, '3'); SP6_blokVoor(ctx, 960, 610, 230, 770, '4'); SP6_blokVoor(ctx, 1620, 610, 230, 770, '5'); return r; }
// zijaanzicht van de startkant met het blok en de zwemmer erop
const SP6_ZIJ = { rand: 1000, dek: 760, water: 800, s: 235 };
function SP6_zijKant(ctx, t) { bg(ctx, 'schema'); SP6_badZij(ctx, SP6_ZIJ.rand, SP6_ZIJ.dek, SP6_ZIJ.water, t); SP6_blok(ctx, SP6_ZIJ.rand, SP6_ZIJ.water - 0.75 * SP6_ZIJ.s, SP6_ZIJ.s, { nummer: '4' }); }
const SP6_BLOKTOP = SP6_ZIJ.water - 0.75 * SP6_ZIJ.s;
// routine-tijdlijn onderaan rechts
function SP6_tijdlijn(ctx, l1, l2, l3, a = 1) { if (a <= 0.01) return; laag(ctx, a, () => { lijn(ctx, [[1250, 826], [1610, 826]], C.line, 3); SP6_icoon(ctx, 1250, 826, 'bril', l1); SP6_icoon(ctx, 1430, 826, 'armen', l2); SP6_icoon(ctx, 1610, 826, 'lang', l3); }); }
// de proefkolommen van Kross: links IK, rechts EIGEN NAAM OF JE
const SP6_LINKS = ['noor', 'thijs', 'sanne'], SP6_RECHTS = ['yasmin', 'lotte', 'jesse'];
function SP6_kolom(ctx, x, kop, ids, y, t, o = {}) { const { kopA = 1, ppl = 1, schrijf = 0, licht = 0, w = 600 } = o;
  laag(ctx, kopA, () => { ctx.save(); ctx.font = fTekst(44, 800); const kw = ctx.measureText(kop).width + 60; roundRect(ctx, x - kw / 2, y - 52, kw, 76, 14); shape(ctx, licht > 0.01 ? rgba(C.goud, 0.2 * licht) : rgba('#0D1420', 0.6), licht > 0.01 ? C.goud : C.line, 2 + 2 * licht); ctx.restore(); text(ctx, kop, x, y + 2, fTekst(44, 800), licht > 0.5 ? C.goud : C.text, 'center'); });
  ids.forEach((id, i) => { const px = x + (i - 1) * 170; SP6_portret(ctx, id, px, y + 190, 1.15, ppl, { t }); SP6_potlood(ctx, px + 30, y + 290, t + i, ppl * schrijf); }); }

Object.assign(SCENES, {
  title(ctx, t) { const u = ease(ramp(t, 0.3, 3.5)); const s = 15;
    const B = SP6_badBoven(ctx, 1490, 650, 13, { t, tribune: false, licht: u });
    SP6_zwemmerBoven(ctx, B.x0 + 1.4 * s, B.baan(4), 1.8 * s, 0, { slag: false });
    const wx = lerp(1490, B.x0 + 2.5 * s, u), wy = lerp(420, B.baan(4) - 1.7 * s, u), sc = lerp(1, 0.32, u);
    ctx.save(); ctx.translate(wx, wy); ctx.scale(sc, sc); SP6_wolk(ctx, 0, 0, 'WAT ALS …', C.paars, 1, { px: 40 }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const Zij = q.on('Het', 1, 0.35), Sp = q.on('spreek', 1, 0.5);
    if (Zij < 1) { bg(ctx, 'schema'); const u = ease(ramp(t, 0.4, 3.0)), s = lerp(24, 96, u), fx = lerp(0, -24.5, u), fy = lerp(0, 1.25 + 0.0, u);
      const cx = lerp(960, 640, u) - fx * s, cy = lerp(560, 560, u) - fy * s;
      laag(ctx, 1 - Zij, () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 84, W, 796); ctx.clip(); const B = SP6_badBoven(ctx, cx, cy, s, { t, licht: u });
        const bx = B.x0 - 1.6 * s, by = B.baan(4); ctx.fillStyle = CAST.sam.huid; ctx.beginPath(); ctx.ellipse(bx, by, 0.22 * s, 0.5 * s, 0, 0, 6.283); ctx.fill(); circ(ctx, bx + 0.03 * s, by, 0.13 * s, '#D8573F');
        SP6_scorebord(ctx, 960, 150, 1); ctx.restore(); }); }
    if (Zij > 0.01) laag(ctx, Zij, () => { SP6_startkant(ctx, t); SP6_scorebord(ctx, 960, 150, 1);
      const r = SP6_startrij(ctx, t, { uit: Sp > 0.5 ? 'denkt' : 'bezorgd' }); const kop = { x: r.hoofd.x, y: r.hoofd.y - 30 };
      const w1 = q.on('Wat', 1, 0.3), w2 = q.on('Iedereen', 1, 0.3), w3 = ramp(t, q.at('kijkt', 1) + 0.55, 0.25), uit = 1 - Sp;
      const tril = (k) => ({ x: 4 * Math.sin(t * 17 + k), y: 3 * Math.sin(t * 13 + k * 2) });
      let d = tril(1); SP6_wolk(ctx, 620 + d.x, 330 + d.y, SP6_KOUD[0], C.paars, w1 * uit, { staart: kop });
      d = tril(2); SP6_wolk(ctx, 1330 + d.x, 300 + d.y, SP6_KOUD[1], C.paars, w2 * uit, { staart: kop });
      d = tril(3); SP6_wolk(ctx, 660 + d.x, 480 + d.y, SP6_KOUD[2], C.paars, w3 * uit, { staart: kop });
      laag(ctx, Sp, () => { kaart(ctx, 1080, 400, 470, 190, 1, C.goud); text(ctx, 'Jezelf bij je naam', 1110, 470, fTekst(42, 800), C.text, 'left'); text(ctx, 'aanspreken?', 1110, 526, fTekst(42, 800), C.text, 'left');
        metaText(ctx, 'ADVIES VAN EEN SPORTPSYCHOLOOG', 1110, 570, C.goud, 'left', 18); vraagteken(ctx, 1490, 520, q.on('Waarom', 1, 0.4), 100); }); }); },

  // ---------- H1 Je innerlijke stem ----------
  s03(ctx, t, q) { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); SP6_klok(ctx, '−20 MIN', 1);
    const x = 860 + 110 * Math.sin(t * 0.32), r = zwemmer(ctx, 'sam', x, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t);
    const kop = { x: r.hoofd.x, y: WY - 30 };
    const Pr = q.on('praat', 1, 0.4), E = q.on('Eerste', 1, 0.4), S = q.on('Sterk', 1, 0.4);
    SP6_wolk(ctx, kop.x - 60, 230, '…', C.paars, Pr * (1 - E), { staart: kop, px: 44 });
    naamBij(ctx, 'innerlijke stem', 'zonder geluid', kop.x + 70, 220, q.on('innerlijke', 1, 0.4) * (1 - E), 'left');
    const gl = q.on('plan', 1, 0.5);
    SP6_wolk(ctx, 520, 220, 'EERSTE 50 RUSTIG', C.goud, E, { staart: kop });
    SP6_wolk(ctx, 1380, 220, 'STERK UIT HET KEERPUNT', C.goud, S, { staart: kop });
    laag(ctx, gl, () => { metaText(ctx, 'RACEPLAN', 960, 140, C.goud, 'center', 30); }); },

  s04(ctx, t, q) { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); SP6_klok(ctx, '−20 MIN', 1);
    const x = 860 + 110 * Math.sin((t + 17.8) * 0.32), r = zwemmer(ctx, 'sam', x, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t);
    const kop = { x: r.hoofd.x, y: WY - 30 };
    const M = q.on('malen', 1, 0.6), K = q.on('kwartier', 1, 1.2);
    // het raceplan schuift weg als de stem gaat malen
    SP6_wolk(ctx, 520 - 300 * K, 220 - 40 * M, 'EERSTE 50 RUSTIG', C.goud, 1 - K, { staart: kop, px: 34 - 6 * M });
    SP6_wolk(ctx, 1380 + 300 * K, 220 - 40 * M, 'STERK UIT HET KEERPUNT', C.goud, 1 - K, { staart: kop, px: 34 - 6 * M });
    const w1 = q.on('Wat', 1, 0.3), w2 = ramp(t, q.at('verlies', 1) - 0.5, 0.3), extra = K;
    const rond = (i, n) => { const an = -Math.PI / 2 + i * 6.283 / n + K * (t - q.at('kwartier', 1)) * 0.9; return { x: kop.x + Math.cos(an) * 380, y: 245 + Math.sin(an) * 115 }; };
    const lijst = [['WAT ALS …', w1], ['EN ALS …', w2], ['WAT ALS …', extra], ['EN ALS …', extra], ['WAT ALS …', extra]];
    lijst.forEach(([s2, a], i) => { if (a <= 0.01) return; const vast = [{ x: kop.x - 330, y: 300 }, { x: kop.x + 330, y: 300 }][i] || rond(i, 5); const p = i < 2 ? { x: lerp(vast.x, rond(i, 5).x, K), y: lerp(vast.y, rond(i, 5).y, K) } : rond(i, 5);
      SP6_wolk(ctx, p.x, p.y, s2, C.paars, a, { staart: kop, px: 32 }); });
    SP6_kaartje(ctx, 110, 560, 820, 'CHATTER', ['de innerlijke stem die gaat malen,', 'piekeren en zichzelf verwijten'], q.on('chatter', 1, 0.4), C.paars, 32);
    metaA(ctx, 'ETHAN KROSS', 136, 760, q.on('chatter', 1, 0.4), C.grain, 'left', 22);
    vraagteken(ctx, 1640, 700, q.on('betekent', 1, 0.4), 130); },

  s06(ctx, t, q) { const WY = 470, L = 280; SP6_onderWater(ctx, WY, t, 120); SP6_klok(ctx, '−20 MIN', 1); antwoord(ctx, 'antwoord c: het kan ruimte kosten die hij nodig heeft', 1);
    const r = zwemmer(ctx, 'sam', 330 + 30 * Math.sin(t * 0.3), WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, 900, WY, t);
    const Z = q.on('werkbank', 1, 0.6), CX = 1300, CY = 500, R = 340;
    zoomCircle(ctx, CX, CY, R, r.hoofd.x, r.hoofd.y, '', Z, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(CX - R, CY - R, 2 * R, 2 * R);
      const vl = q.on('weinig', 1, 0.4) * (1 - q.on('Piekeren', 2, 0.4));
      const B = SP6_werkbank(ctx, CX, CY + 120, 640, { a: 1, vakLicht: vl, kop: q.on('werkgeheugen', 1, 0.4) > 0.01 });
      const st = q.on('stil', 1, 0.8), plan = [['EERSTE 50\nRUSTIG', 0], ['STERK UIT\nKEERPUNT', 1], ['LANG', 2]];
      // koraal blokjes schuiven op de bank, elk duwt een goud kaartje eraf
      const tb = [q.at('Piekeren', 2), q.at('weer', 1), q.at('werkbank', 2)], uit = [null, 2, 1];
      const blok = (k) => ramp(t, tb[k], 0.7);
      plan.forEach(([s2, v], i) => { const p = B.vak(v); const k = uit.indexOf(v); const val = k >= 0 ? ramp(t, tb[k] + 0.35, 0.9) * (1 - st) : 0;
        const gl = q.on('raceplan', 1, 0.5) * (v === 0 ? 1 : 0);
        SP6_blokje(ctx, p.x + val * 70, p.y + val * val * 330, B.vw - 30, 84, s2, C.goud, 1, val * 0.9);
        if (gl > 0.01) laag(ctx, gl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; roundRect(ctx, p.x - (B.vw - 22) / 2, p.y - 46, B.vw - 22, 92, 10); ctx.stroke(); }); });
      const doel = [3, 2, 1]; doel.forEach((v, k) => { const p = B.vak(v), u = blok(k); if (u <= 0.01) return; const puls = q.on('angstig', 1, 0.5) * 0.06 * Math.sin(t * 8 + k);
        SP6_blokje(ctx, lerp(CX + R + 80, p.x, ease(u)), p.y - 6, B.vw - 34, 80 * (1 + puls), "WAT\nALS …", C.koraal, 1 - st, 0); });
      laag(ctx, q.on('werkgeheugen', 1, 0.4), () => metaText(ctx, 'KLEINE WERKRUIMTE', CX, CY - 230, C.text2, 'center', 26)); });
    metaA(ctx, 'HATZIGEORGIADIS E.A. 2011 · EYSENCK E.A. 2007 · MORAN 2016', 960, 868, q.on('proeven', 1, 0.5), C.grain, 'center', 24); },

  // ---------- H2 Afstand nemen ----------
  s07(ctx, t, q) { const V = q.on('vorige', 1, 0.35);
    if (V < 1) laag(ctx, 1 - V, () => { SP6_wachtruimte(ctx, t); SP6_klok(ctx, '−10 MIN', 1);
      persoon(ctx, 'daan', 330, 774, 400, { outfit: 'zwem', pose: 'zit', zitHoogte: 134, uit: 'neutraal', t });
      for (const [sx, k] of [[600, 0], [1120, 1]]) { ctx.fillStyle = k ? '#3E4C6A' : '#435273'; ctx.beginPath(); ctx.ellipse(sx, 560, 62, 90, 0, 0, 6.283); ctx.fill(); circ(ctx, sx, 440, 42, _mixHex(ctx.fillStyle, '#FFFFFF', 0.06)); roundRect(ctx, sx - 50, 620, 100, 150, 20); ctx.fill(); }
      persoon(ctx, 'bilal', 1360, 774, 420, { outfit: 'zwem', pose: 'zit', zitHoogte: 134, uit: 'neutraal', t });
      const r = persoon(ctx, 'sam', 860, 774, 420, { outfit: 'zwem', pose: 'vasthouden', zitHoogte: 134, uit: 'denkt', t, hold: (c, hx, hy) => SP6_bril(c, hx, hy - 6, 1.2) });
      SP6_handdoek(ctx, r, 420); });
    if (V > 0.01) laag(ctx, V, () => { SP6_kamer(ctx, t); SP6_whiteboard(ctx, 760, 180, 1060, 440);
      tag(ctx, 'VORIGE WEEK', 260, 150, C.text2, 1, 'center', 30);
      const L1 = q.on('mis', 1, 1.0), L2 = ramp(t, q.at('En:', 1) + 0.3, 1.2), Hl = q.on('anders', 1, 0.5);
      // kolommen op het bord
      text(ctx, 'IK', 1025, 260, fTekst(46, 800), Hl > 0.5 ? '#A07A10' : '#2A3550', 'center'); text(ctx, 'JE', 1555, 260, fTekst(46, 800), Hl > 0.5 ? '#A07A10' : '#2A3550', 'center');
      lijn(ctx, [[1290, 220], [1290, 590]], '#9AA6B6', 3);
      SP6_schrijf(ctx, 'WAT ALS IK', 1025, 380, 48, '#2A3F8A', ramp(t, q.at('Wat', 1) - 0.2, 0.8), 'center'); SP6_schrijf(ctx, 'DE START MIS?', 1025, 450, 48, '#2A3F8A', L1, 'center');
      if (Hl > 0.01) laag(ctx, Hl, () => { ctx.fillStyle = rgba(C.goud, 0.45); ctx.fillRect(1555 - 18 + 52, 340, 72, 54); ctx.fillRect(1555 - 38, 218, 76, 54); });
      SP6_schrijf(ctx, 'WAT ALS JE', 1555, 380, 48, '#2A3F8A', L2, 'center'); SP6_schrijf(ctx, 'DE START MIST?', 1555, 450, 48, '#2A3F8A', ramp(t, q.at('En:', 1) + 1.0, 1.0), 'center');
      const schrijft = Math.max(fase(t, q.at('Wat', 1) - 0.3, q.at('mis', 1) + 0.9, 0.3), fase(t, q.at('En:', 1) + 0.2, q.at('mist', 1) + 0.7, 0.3));
      const kant = t < q.at('En:', 1) ? 0 : 1, doel = schrijft > 0.5 ? { x: kant ? 1500 + 200 * ramp(t, q.at('En:', 1) + 0.3, 2) : 900 + 260 * ramp(t, q.at('Wat', 1) - 0.2, 1.8), y: 420 } : null;
      const wijst = q.on('Kijk', 1, 0.3) * (1 - q.on('Dat', 1, 0.3));
      SP6_reik(ctx, 'sportpsycholoog', kant ? 1850 : 720, 784, 440, { zij: true, kijk: kant ? -1 : 1, uit: wijst > 0.5 ? 'praat' : 'neutraal', t, pose: wijst > 0.5 ? 'wijs' : 'staan' }, doel || (wijst > 0.5 ? { x: kant ? 1600 : 1010, y: 300 } : null));
      persoon(ctx, 'sam', 470, 784, 420, { outfit: 'zwem', pose: 'zit', stoel: true, zij: true, kijk: 1, uit: 'neutraal', t });
      tag(ctx, 'AFSTAND NEMEN', 1290, 712, C.goud, q.on('afstand', 1, 0.4), 'center', 36); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); paneel(ctx, 220, 170, 1480, 640, '', 1); metaText(ctx, 'DE PROEF VAN KROSS', 960, 230, C.text2, 'center', 26);
    const St = q.on('Studenten', 1, 0.5), Sc = q.on('bereiden', 1, 0.5);
    SP6_kolom(ctx, 600, 'IK', SP6_LINKS, 340, t, { kopA: q.on("'ik'", 1, 0.4), ppl: St, schrijf: Sc });
    SP6_kolom(ctx, 1320, 'EIGEN NAAM OF JE', SP6_RECHTS, 340, t, { kopA: q.on('naam', 1, 0.4), ppl: St, schrijf: Sc });
    laag(ctx, q.on('vijf', 1, 0.4), () => { klokje(ctx, 960, 470, 56, clamp((t - q.at('vijf', 1)) / 9, 0, 1), 1); metaText(ctx, '5 MIN', 960, 570, C.text, 'center', 30); metaText(ctx, 'SPEECH', 960, 610, C.text2, 'center', 22); });
    vraagteken(ctx, 1320, 760, q.on('Hoe', 1, 0.4), 110); },

  s10(ctx, t, q) { const K = q.on('Met', 1, 0.35);
    if (K < 1) laag(ctx, 1 - K, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: beter, en achteraf piekerden ze minder', 1); paneel(ctx, 320, 190, 1280, 640, '', 1);
      const V = q.on('verschilde', 1, 0.5);
      SP6_kolom(ctx, 660, 'IK', SP6_LINKS, 300, t, { licht: V, w: 560 }); SP6_kolom(ctx, 1260, 'EIGEN NAAM OF JE', SP6_RECHTS, 300, t, { licht: V, w: 560 });
      tag(ctx, 'BETER GESPROKEN', 1260, 410, C.goud, q.on('beter', 1, 0.4), 'center', 28);
      const Ach = q.on('Achteraf', 1, 0.4), s1 = q.on('schaamden', 1, 0.8), s2 = q.on('maalden', 1, 0.8);
      balk(ctx, 450, 640, 420, 0.72, C.koraal, 'SCHAAMTE', Ach); balk(ctx, 450, 740, 420, 0.75, C.koraal, 'NAPIEKEREN', Ach);
      balk(ctx, 1050, 640, 420, 0.72 - 0.34 * s1, C.koraal, 'SCHAAMTE', Ach); balk(ctx, 1050, 740, 420, 0.75 - 0.36 * s2, C.koraal, 'NAPIEKEREN', Ach);
      laag(ctx, q.on('zekerder', 1, 0.4) * (1 - Ach * 0), () => { [['JE HEBT DIT GEOEFEND', 1260, 590]].forEach(([s3, x, y]) => { roundRect(ctx, x - 210, y - 30, 420, 44, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, s3, x, y + 2, fTekst(24, 800), '#2A3F8A', 'center'); }); });
      // twee beoordelaars met scorekaarten
      const Bo = q.on('beoordelaars', 1, 0.3), kaartje = (c, hx, hy) => { roundRect(c, hx - 34, hy - 84, 68, 84, 6); shape(c, '#F2EEE4', '#B8B0A0', 2); for (let k = 0; k < 3; k++) { c.fillStyle = '#9AA3B2'; c.fillRect(hx - 22, hy - 70 + k * 18, 44, 6); } };
      laag(ctx, Bo, () => { persoon(ctx, 'erik', 150, 860, 420, { pose: 'vasthouden', kijk: 1, uit: 'neutraal', t, hold: kaartje }); persoon(ctx, 'joost', 1770, 860, 410, { pose: 'vasthouden', kijk: -1, uit: 'neutraal', t, hold: kaartje }); });
      metaA(ctx, 'KROSS E.A. 2014', 960, 868, Bo, C.grain, 'center', 24); });
    if (K > 0.01) laag(ctx, K, () => { SP6_kamer(ctx, t); SP6_whiteboard(ctx, 1150, 180, 670, 360);
      text(ctx, 'WAT ALS IK DE START MIS?', 1485, 300, fTekst(38, 700), '#2A3F8A', 'center'); text(ctx, 'WAT ALS JE DE START MIST?', 1485, 420, fTekst(38, 700), '#2A3F8A', 'center');
      ctx.fillStyle = rgba(C.goud, 0.45); ctx.fillRect(1430, 386, 50, 46);
      const rs = persoon(ctx, 'sam', 700, 820, 440, { outfit: 'zwem', pose: 'zit', stoel: true, uit: q.on('vriend', 1, 0.4) > 0.5 ? 'blij' : 'neutraal', t });
      const hh = 440 * 1.04 / 6.1, sch = { x: rs.hoofd.x + hh * 0.95, y: rs.hoofd.y + hh * 1.45 };
      const H = q.on('vriend', 1, 0.5);
      SP6_reik(ctx, 'sportpsycholoog', 900, 820, 450, { zij: true, kijk: -1, uit: 'blij', t }, H > 0.5 ? sch : null);
      metaA(ctx, 'KROSS E.A. 2014', 960, 868, 1, C.grain, 'center', 24); }); },

  s11(ctx, t, q) { const Vl = q.on('vlieg', 1, 0.8), Vt = q.on('vooruit', 1, 0.6), Wl = q.on('Wel', 1, 0.6), Kl = q.on('kleine', 1, 0.5);
    if (Vl < 1) laag(ctx, 1 - Vl, () => { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); const r = zwemmer(ctx, 'sam', 860, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t); });
    if (Vl > 0.01 && Wl < 1) laag(ctx, Vl * (1 - Wl), () => { bg(ctx, 'schema'); const s = lerp(30, 14, ease(Vt)), cx = lerp(960, 520, ease(Vt)), cy = lerp(540, 520, ease(Vt));
      const B = SP6_badBoven(ctx, cx, cy, s, { t, tribune: false, licht: 0.6 }); const sx = B.x0 + ((4 + t * 1.7 * 0.5) % 46) * s; SP6_zwemmerBoven(ctx, sx, B.baan(4), 1.8 * s, t);
      SP6_vlieg(ctx, 1810, 190, 2.2, t, 1 - Vt);
      laag(ctx, Vt, () => { const fl = ramp(t, q.at('vooruit', 1) + 0.6, 1.6); SP6_kalender(ctx, 1450, 330, fl < 0.5 ? 'VANDAAG' : 'OVER EEN JAAR', 1, (fl * 4) % 1);
        SP6_rooster(ctx, 1060, 540, 800, 300, q.on('jaar', 1, 0.5), q.on('jaar', 1, 0.8)); metaA(ctx, 'DEZE FINALE', 1060 + 24 + 2.5 * 63, 535, q.on('jaar', 1, 0.5), C.goud, 'left', 22); }); });
    if (Wl > 0.01) laag(ctx, Wl, () => { bg(ctx, 'schema'); SP6_kaartje(ctx, 120, 150, 760, 'ONDERZOEK', ['vooral met studenten'], 1, C.oker, 38);
      laag(ctx, 1 - Kl, () => { SP6_LINKS.concat(SP6_RECHTS).forEach((id, i) => SP6_portret(ctx, id, 420 + i * 216, 520, 1.6, 1, { t })); metaText(ctx, 'STUDENTEN IN EEN LAB', 960, 700, C.text2, 'center', 26); });
      laag(ctx, Kl, () => { SP6_hometrainer(ctx, 560, 800, 230, t, 'erik'); tag(ctx, '10 KM', 830, 420, C.teal, q.on('tijdrit', 1, 0.4), 'center', 34);
        metaA(ctx, 'KLEINE PROEF · 16 ACTIEVE MANNEN', 1440, 330, q.on('zestien', 1, 0.4), C.text2, 'center', 26);
        const Bt = q.on('tijdrit', 1, 0.5); laag(ctx, Bt, () => { metaText(ctx, 'TIJD VOOR 10 KM', 1100, 440, C.text2, 'left', 24);
          const g = q.on('sneller', 1, 0.8); text(ctx, 'IK', 1080, 530, fTekst(40, 800), C.text, 'right'); text(ctx, 'JE', 1080, 640, fTekst(40, 800), C.text, 'right');
          balk(ctx, 1110, 500, 650, 0.92, C.line, '', 1); balk(ctx, 1110, 610, 650, 0.92 - 0.02 * g, C.goud, '', 1); metaA(ctx, '≈ 2 % SNELLER', 1110 + 650 * 0.9, 700, g, C.goud, 'right', 24); }); }); });
    metaA(ctx, 'AYDUK & KROSS 2010 · BRUEHLMAN-SENECAL & AYDUK 2015 · HARDY E.A. 2019', 960, 868, q.on('vlieg', 1, 0.5), C.grain, 'center', 22); },

  // ---------- H3 Uitdaging of bedreiging ----------
  s12(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '−1 MIN', 1); const v = 0.35 + 0.55 * ramp(t, 0.8, 5);
    const sw = 0.35 * Math.sin(t * 9), tr = q.on('handen', 1, 0.4) * 0.04 * Math.sin(t * 40);
    const r = SP6_samZij(ctx, 780, SP6_ZIJ.dek, 430, t, { arm: [0.25 + sw + tr, 0.15], armVer: [0.25 - sw, 0.15], uit: 'bezorgd' });
    const hh = 430 * 1.04 / 6.1, bx = 780 + hh * 0.3, by = SP6_ZIJ.dek - 430 * 1.04 + hh * 2.4;
    const Zh = q.on('hart', 1, 0.5), CX = 420, CY = 330, R = 170;
    zoomCircle(ctx, CX, CY, R, bx, by, 'HART', Zh, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(CX - R, CY - R, 2 * R, 2 * R); const HH = 300; BODY = { cx: CX - 0.09 * HH, yb: CY - 2.22 * HH + 7.3 * HH, h: 7.3 * HH }; anHeart(1, t * (2.4 + 3 * v) * Math.PI, 0); });
    SP6_hartmeter(ctx, 1440, 330, 380, v, t, { a: q.on('hart', 1, 0.5) });
    vraagteken(ctx, 1440, 560, q.on('betekent', 1, 0.4), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: het kan allebei, dat hangt van zijn uitleg af', 1);
    const Ve = q.on('Vereenvoudigd', 1, 0.6), Kl = q.on('klein', 1, 0.5), Tr = q.on('Training', 1, 0.5);
    SP6_hartmeter(ctx, 1640, 300, 340, 0.8, t, { a: 1 });
    // weegschaal
    laag(ctx, 1 - Ve, () => { const k = 0.75 * q.on('bedreiging', 1, 0.8) - 1.5 * q.on('huis', 1, 0.8);
      SP6_weegschaal(ctx, 820, 330, 0.95, k, 1);
      tag(ctx, 'UITDAGING', 520, 760, C.goud, q.on('uitdaging', 1, 0.4), 'center', 32); tag(ctx, 'BEDREIGING', 1120, 760, C.koraal, q.on('bedreiging', 1, 0.4), 'center', 32); });
    // lichaamsschema en een bloedvat in de zoomcirkel
    if (Ve > 0.01) laag(ctx, Ve, () => { const Ui = q.on('uitdaging', 2, 0.6), Be = q.on('bedreiging', 2, 0.6), Sp = q.on('sport', 1, 0.6);
      const st = clamp(Ui - Be + Sp, 0, 1); // 1 = uitdaging, 0 = bedreiging (vóór 'uitdaging': gewoon)
      const vatB = Ui < 0.01 ? 0.5 : lerp(0.18, 0.95, st), stroom = Ui < 0.01 ? 0.4 : lerp(0.25, 1, st), kl = Ui < 0.01 ? null : (st > 0.5 ? C.goud : C.koraal);
      BODY = { cx: 560, yb: 860, h: 600 }; ctx.save(); anFigure(1, t); anVessels(1, t * (0.8 + 1.6 * stroom), 1); anHeart(1, t * (5 + 3 * stroom), 0); ctx.restore();
      metaText(ctx, 'VEREENVOUDIGD · IN METINGEN VAAK', 560, 236, C.grain, 'center', 24);
      const [sx, sy] = AP(-1.05, 3.4);
      zoomCircle(ctx, 1180, 500, 230, sx, sy, 'BLOEDVAT', 1, () => SP6_vat(ctx, 1180, 500, 230, vatB, stroom, t, kl));
      tag(ctx, st > 0.5 ? 'UITDAGING · WIJDER' : 'BEDREIGING · NAUWER', 1180, 240, st > 0.5 ? C.goud : C.koraal, Ui, 'center', 30);
      laag(ctx, Kl, () => { balk(ctx, 1000, 800, 360, 0.12, C.goud, '', 1); text(ctx, 'EFFECT: KLEIN', 990, 832, fTekst(28, 800), C.text, 'right'); });
      laag(ctx, Tr, () => { kaart(ctx, 1490, 480, 300, 330, 1, C.teal); metaText(ctx, 'TRAINING', 1640, 528, C.teal, 'center', 26);
        ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'].forEach((d, i) => { metaText(ctx, d, 1530, 580 + i * 32, C.text2, 'left', 18); const n = [3, 2, 3, 0, 3, 2, 0][i]; for (let k = 0; k < n; k++) { roundRect(ctx, 1580 + k * 60, 564 + i * 32, 52, 20, 5); shape(ctx, rgba(C.teal, 0.7), null); } });
        tag(ctx, 'DE BASIS', 1640, 790, C.teal, 1, 'center', 26); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const Na = q.on('naamgroep', 1, 0.5), Bp = q.on('Beide', 1, 0.5);
    const kaartH = (c, hx, hy) => { roundRect(c, hx - 110, hy - 120, 220, 110, 10); shape(c, '#F2EEE4', C.goud, 3); text(c, 'OPWINDING', hx, hy - 76, fTekst(26, 800), '#1A2740', 'center'); text(c, 'HELPT', hx, hy - 40, fTekst(26, 800), '#1A2740', 'center'); };
    persoon(ctx, 'passant', 300, 760, 400, { pose: 'vasthouden', kijk: 1, uit: 'blij', t, hold: kaartH });
    const Li = q.on('lichaam', 1, 0.5), Ui = q.on('uitdaging', 1, 0.6);
    zoomCircle(ctx, 820, 430, 200, 330, 470, '', Li, () => SP6_vat(ctx, 820, 430, 200, lerp(0.3, 0.95, Ui), lerp(0.35, 1, Ui), t, Ui > 0.5 ? C.goud : C.koraal));
    tag(ctx, 'UITDAGING', 820, 190, C.goud, Ui, 'center', 32);
    laag(ctx, Na, () => { paneel(ctx, 1160, 190, 660, 560, '', 1); SP6_kolom(ctx, 1490, 'EIGEN NAAM OF JE', SP6_RECHTS, 290, t, {}); tag(ctx, 'VAKER UITDAGING', 1490, 640, C.goud, q.on('vaker', 1, 0.4), 'center', 32); });
    laag(ctx, Bp, () => { tag(ctx, 'PROEF 1: UITLEG', 560, 840, C.text2, 1, 'center', 30); tag(ctx, 'PROEF 2: JE NAAM', 1490, 840, C.text2, 1, 'center', 30); });
    metaA(ctx, 'JAMIESON E.A. 2012 · VINE E.A. 2016 · MOORE E.A. 2015', 960, 130, q.on('proef', 1, 0.5), C.grain, 'center', 24); },

  // ---------- H4 Routines en rituelen ----------
  s16(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
    const Br = fase(t, q.at('bril', 1) - 0.2, q.at('twee', 1), 0.3), Zw = ramp(t, q.at('twee', 1), q.at('Dat', 1) - q.at('twee', 1)), op = q.at('bril', 1) + 0.5 < t;
    const hh = 420 * 1.04 / 6.1, sx = 930, oog = { x: sx + hh * 0.75, y: SP6_BLOKTOP - 420 * 1.04 + hh * 0.55 };
    const zwaai = Zw > 0.001 && Zw < 0.999 ? Zw * 2 * 6.283 : 0;
    if (Br > 0.5) SP6_reik(ctx, 'sam', sx, SP6_BLOKTOP, 420, { outfit: 'zwem', zij: true, kijk: 1, t, bril: op ? 'ogen' : undefined, armVer: [0.1, 0.15] }, oog);
    else SP6_samZij(ctx, sx, SP6_BLOKTOP, 420, t, { bril: op ? 'ogen' : undefined, arm: [0.1 + zwaai, 0.1], armVer: [0.1 + zwaai, 0.1] });
    const kn = q.on('geoefend', 1, 0.3) * (1 - q.on('trainer', 1, 0.3)) * 0.25 * Math.max(0, Math.sin((t - q.at('geoefend', 1)) * 9));
    persoon(ctx, 'zwemtrainer', 330, SP6_ZIJ.dek, 430, { zij: true, kijk: 1, t, knik: kn, uit: q.on('geoefend', 1, 0.3) > 0.5 ? 'blij' : 'neutraal' });
    SP6_tijdlijn(ctx, q.on('bril', 1, 0.3), ramp(t, q.at('zwaaien', 1), 0.3), 0, q.on('bril', 1, 0.4));
    SP6_kaartje(ctx, 110, 140, 800, 'OVERZICHT VAN VEEL ONDERZOEKEN', ['routine → beter, ook onder druk'], q.on('overzicht', 1, 0.4), C.goud, 38);
    metaA(ctx, 'RUPPRECHT E.A. 2021', 136, 300, q.on('overzicht', 1, 0.4), C.grain, 'left', 22); },

  s17(ctx, t, q) { const On = q.on('Onderzoekers', 1, 0.35);
    if (On < 1) laag(ctx, 1 - On, () => { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
      const u = ease(ramp(t, q.at('voet', 1) - 0.6, 1.3)), x = lerp(780, 930, u), y = lerp(SP6_ZIJ.dek, SP6_BLOKTOP, u), til = Math.sin(u * Math.PI);
      const r = SP6_samZij(ctx, x, y, 420, t, { bril: 'ogen', been1: { th: 0.9 * til, kn: 1.5 * til, an: 0 }, vrij: til > 0.05 });
      const hh = 420 * 1.04 / 6.1; laag(ctx, q.on('voet', 1, 0.4) * (1 - ramp(t, q.at('op.', 1) + 0.8, 0.4)), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + hh * 0.5, y - hh * 0.2, hh * 1.1, hh * 0.6, 0, 0, 6.283); ctx.stroke(); });
      SP6_kaartje(ctx, 110, 140, 760, 'RITUEEL', ['vaste reeks handelingen,', 'zonder direct nut'], q.on('ritueel', 1, 0.4), C.paars, 36); });
    if (On > 0.01) laag(ctx, On, () => { bg(ctx, 'schema'); const ph = Math.floor((t - q.at('Onderzoekers', 1)) / 1.1) % 4, poses = ['zwaai', 'wijsOmhoog', 'handenHeup', 'staan'];
      const groep = (x, ids, lab, a) => { ids.forEach((id, i) => persoon(ctx, id, x + (i - 1) * 170, 800, 380, { pose: poses[ph], t, uit: 'neutraal', kijk: i === 2 ? -1 : 1 }));
        laag(ctx, a, () => { ctx.font = fTekst(32, 800); const w = ctx.measureText(lab).width + 50; kaart(ctx, x - w / 2, 300, w, 66, 1, C.line); text(ctx, lab, x, 345, fTekst(32, 800), C.text, 'center'); }); };
      groep(500, ['passant', 'anouk', 'milan'], 'RITUEEL', q.on('ritueel', 2, 0.4)); groep(1420, ['sanne', 'bram', 'joost'], 'WILLEKEURIGE HANDELINGEN', q.on('willekeurige', 1, 0.4));
      metaText(ctx, 'ZELFDE HANDELINGEN · VÓÓR EEN SPANNENDE TAAK', 960, 200, C.text2, 'center', 24);
      vraagteken(ctx, 960, 620, q.on('gebeurde', 1, 0.4), 130); }); },

  s19(ctx, t, q) { const Zo = q.on('zongen', 1, 0.35), Ge = q.on('Geluk', 1, 0.35);
    if (Zo < 1) laag(ctx, 1 - Zo, () => { bg(ctx, 'schema'); antwoord(ctx, "antwoord c: als het 'ritueel' heette, werkte het beter", 1);
      [[500, ['passant', 'anouk', 'milan'], 'RITUEEL', C.goud], [1420, ['sanne', 'bram', 'joost'], 'WILLEKEURIGE HANDELINGEN', C.line]].forEach(([x, ids, lab, kl]) => {
        if (kl === C.goud) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; roundRect(ctx, x - 290, 270, 580, 560, 20); ctx.stroke(); ctx.restore(); }
        ids.forEach((id, i) => persoon(ctx, id, x + (i - 1) * 170, 800, 380, { t, uit: kl === C.goud ? 'blij' : 'neutraal', kijk: i === 2 ? -1 : 1 }));
        ctx.font = fTekst(32, 800); const w = ctx.measureText(lab).width + 50; kaart(ctx, x - w / 2, 300, w, 66, 1, kl); text(ctx, lab, x, 345, fTekst(32, 800), kl === C.goud ? C.goud : C.text, 'center'); }); });
    if (Zo > 0.01 && Ge < 1) laag(ctx, Zo * (1 - Ge), () => { bg(ctx, 'schema'); antwoord(ctx, "antwoord c: als het 'ritueel' heette, werkte het beter", 1);
      const Ru = q.on('rustiger', 1, 1.2), Bt = q.on('beter', 1, 0.4);
      persoon(ctx, 'passant', 960, 820, 400, { t, uit: 'neutraal', pose: 'staan' }); metaText(ctx, 'EEN VREEMDE', 960, 380, C.text2, 'center', 22);
      persoon(ctx, 'anouk', 480, 820, 420, { t, uit: 'praat', kijk: 1 }); SP6_noot(ctx, 540, 520, t, 1, C.goud);
      persoon(ctx, 'milan', 1440, 820, 430, { t, uit: 'praat', kijk: -1 }); SP6_noot(ctx, 1340, 510, t + 0.7, 1, C.text2);
      ctx.font = fTekst(30, 800); tag(ctx, 'RITUEEL', 480, 300, C.goud, 1, 'center', 30); tag(ctx, 'NIETS', 1440, 300, C.line, 1, 'center', 30);
      SP6_hartmeter(ctx, 200, 520, 240, lerp(0.85, 0.35, Ru), t, { kl: lerp(0, 1, Ru) > 0.5 ? C.goud : C.koraal }); SP6_hartmeter(ctx, 1720, 520, 240, 0.85, t, {});
      vink_(ctx, 600, 430, 30, Bt, C.groen); });
    if (Ge > 0.01) laag(ctx, Ge, () => { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
      const r = SP6_samZij(ctx, 930, SP6_BLOKTOP, 420, t, { bril: 'ogen', uit: q.on('Lang', 1, 0.3) > 0.5 ? 'neutraal' : 'neutraal' });
      const kader = 1 - q.on('routine', 1, 0.6); laag(ctx, kader, () => { SP6_portret(ctx, 'sportpsycholoog', 260, 330, 1.9, 1, { uit: 'praat', t, rand: C.goud }); metaText(ctx, 'SPORTPSYCHOLOOG', 260, 470, C.text2, 'center', 22); });
      SP6_tijdlijn(ctx, 1, 1, q.on('Lang', 1, 0.3), q.on('routine', 1, 0.4));
      SP6_wolk(ctx, 1260, 260, 'LANG', C.goud, q.on('Lang', 1, 0.3), { staart: { x: r.hoofd.x + 30, y: r.hoofd.y - 20 }, px: 48 }); });
    metaA(ctx, 'RUPPRECHT E.A. 2021 · BROOKS E.A. 2016', 120, 868, 1, C.grain, 'left', 24); },

  // ---------- Recap ----------
  s20(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
    const Tr = q.on('Training', 1, 0.5), Sig = ramp(t, q.at('Wat', 2), 0.1), Du = ease(ramp(t, q.at('Wat', 2) + 0.25, 1.7));
    // de zwemmer: staan → startpositie → duik
    if (Tr < 0.5) SP6_samZij(ctx, 930, SP6_BLOKTOP, 420, t, { bril: 'ogen', uit: 'neutraal' });
    else if (Du <= 0.001) zwemmer(ctx, 'sam', SP6_ZIJ.rand, SP6_BLOKTOP, 420, { slag: 'startblok', kijk: 1, t });
    else { const x = lerp(SP6_ZIJ.rand + 40, 1560, Du), y = SP6_BLOKTOP - 120 * Math.sin(Du * Math.PI * 0.8) + (SP6_ZIJ.water + 70 - SP6_BLOKTOP) * Du * Du, an = lerp(-0.25, 0.55, Du);
      ctx.save(); ctx.translate(x, y); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, 420, { slag: 'stroomlijn', kijk: 1, t }); ctx.restore(); SP6_waterlijn(ctx, SP6_ZIJ.rand, W, SP6_ZIJ.water, t); }
    SP6_pieper(ctx, 860, 712, Sig, Tr);
    const kop = { x: 990, y: 200 }, wolkA = 1 - q.on('Minder', 2, 0.5);
    const her = [q.on('naam', 2, 0.6), q.on('anders', 1, 0.6), q.on('uitdaging', 1, 0.6)];
    const NIEUW = ['WAT ALS JE DE START MIST?\nJE KENT DEZE START', 'KIJK NAAR JE EIGEN BAAN', 'EÉN RACE IN EEN SEIZOEN'], POS = [[480, 230], [1460, 250], [470, 520]];
    SP6_KOUD.forEach((s2, i) => { const h = her[i]; SP6_wolk(ctx, POS[i][0], POS[i][1], s2, C.paars, wolkA * (1 - clamp(h * 2, 0, 1)), { staart: kop, px: 32 }); SP6_wolk(ctx, POS[i][0], POS[i][1], NIEUW[i], C.goud, wolkA * clamp(h * 2 - 1, 0, 1), { staart: kop, px: 32 }); });
    // werkbank met minder 'wat als'
    const Wb = ramp(t, q.at('Minder', 2) + 0.45, 0.4) * (1 - Tr);
    zoomCircle(ctx, 470, 440, 280, 960, 210, '', Wb, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(190, 160, 560, 560); const B = SP6_werkbank(ctx, 470, 530, 520, { kop: true });
      [['EERSTE 50\nRUSTIG', 0], ['STERK UIT\nKEERPUNT', 1], ['LANG', 2]].forEach(([s2, v]) => { const p = B.vak(v); SP6_blokje(ctx, p.x, p.y, B.vw - 16, 70, s2, C.goud, 1); });
      const p = B.vak(3); SP6_blokje(ctx, p.x, p.y, B.vw - 24, 60, 'WAT\nALS …', C.koraal, 1 - q.on('werkbank', 1, 1.0) * 0.0); });
    // vier kleine panelen: werkbank · ik/je · weegschaal · routine
    laag(ctx, Tr, () => { const P = [[120, 140], [470, 140], [120, 400], [470, 400]], tit = ['WERKGEHEUGEN', 'AFSTAND', 'UITDAGING', 'ROUTINE'];
      P.forEach(([x, y], i) => { paneel(ctx, x, y, 320, 230, tit[i], 1); });
      SP6_werkbank(ctx, 280, 300, 220, { kop: false }); for (let k = 0; k < 3; k++) { roundRect(ctx, 280 - 110 + k * 55 + 8, 300 - 40, 40, 30, 5); shape(ctx, C.goud, null); }
      text(ctx, 'IK', 570, 300, fTekst(48, 800), C.text2, 'center'); text(ctx, '→', 630, 300, fTekst(48, 800), C.text2, 'center'); text(ctx, 'JE', 690, 300, fTekst(48, 800), C.goud, 'center');
      SP6_weegschaal(ctx, 280, 480, 0.28, -0.8, 1); ctx.save(); ctx.translate(630, 560); ctx.scale(0.55, 0.55); SP6_icoon(ctx, -150, 0, 'bril', 1); SP6_icoon(ctx, 0, 0, 'armen', 1); SP6_icoon(ctx, 150, 0, 'lang', 1); ctx.restore(); }); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    const c = [q.on('bachelor', 1, 0.4), q.on('master', 1, 0.4), q.on('begeleiden', 1, 0.4)];
    SP6_kaartje(ctx, 140, 150, 1040, 'WO · BACHELOR', ['Psychologie'], c[0], C.goud, 40);
    pijl(ctx, 300, 290, 300, 330, C.line, c[1], 4, 14);
    const h2 = SP6_kaartje(ctx, 140, 340, 1040, 'WO · MASTER', ['Sport and Performance Psychology'], c[1], C.goud, 40); metaA(ctx, 'UVA AMSTERDAM · 1 JAAR · ENGELS', 1150, 386, c[1], C.grain, 'right', 22);
    pijl(ctx, 300, 340 + h2 + 10, 300, 340 + h2 + 50, C.line, c[2], 4, 14);
    SP6_kaartje(ctx, 140, 340 + h2 + 60, 1040, 'DAARNA', ['praktijkopleiding sportpsycholoog'], c[2], C.goud, 40);
    persoon(ctx, 'sportpsycholoog', 1500, 820, 460, { t, uit: 'blij', kijk: -1 });
    metaText(ctx, 'STAND 2026', 1500, 868, C.grain, 'center', 22); },
});
