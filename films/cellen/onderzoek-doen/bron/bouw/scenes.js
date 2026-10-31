// Onderzoek doen in de biologie 2.0 — scènes per alinea (prompt v13; beeldplan: Schema + Macro-nacht voor het paard;
// CASUS-kaart = voorbeeld, BEGRIP-kaart = stof; doorlopend onderzoeksbord met de kiemproef; echte personen zonder portret).
const KV = { 0: 'tuinkers komt snel op', 1: 'meer kieming in het licht?', 2: 'licht bevordert kiemen', 3: 'licht/donker, 50 zaadjes', 4: 'blind tellen', 5: '41 tegen 38, veel spreiding', 6: 'verworpen', 7: 'lange gele plantjes?' };
function vulTot(i) { const v = {}; for (let k = 0; k <= i; k++) v[k] = KV[k]; return v; }
function miniBord(ctx, upto, actief, a = 1) { bord(ctx, { x: 120, y: 60, w: 1680, h: 210, vul: vulTot(upto), actief, a, licht: STAPPEN.map((_, i) => i <= upto ? 1 : 0.35) }); }
const uit = (t, q, w, n = 1, d = 0.5) => 1 - q.on(w, n, d);
function openVraag(ctx, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, 960, 470, fTitel(60), C.text, 'center'); ctx.restore(); }
// paard met vraagsteller (Macro-nacht, Berlijn); o: {tik 0..n, pfungst}
function paardScene(ctx, t, q, o = {}) { nachtDecor(ctx, { stad: true });
  // bord met de som op een ezel
  ctx.save(); roundRect(ctx, 260, 360, 300, 220, 10); shape(ctx, '#1F2A26', '#8C5A3A', 6); ctx.strokeStyle = '#8C5A3A'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(300, 580); ctx.lineTo(270, 800); ctx.moveTo(520, 580); ctx.lineTo(550, 800); ctx.stroke();
  text(ctx, o.som || '3 + 2 = ?', 410, 490, fTitel(56), '#EDE6D3', 'center'); ctx.restore();
  paard(ctx, 1150, 820, 1.55, { houding: 'staan', kijk: -1, t });
  // vraagsteller: silhouet zonder gezicht (echte persoon, geen portret), met hoed
  const kop = o.kop || 0; ctx.save(); pict(ctx, 760, 820, 300, '#141B28', 1); ctx.fillStyle = '#141B28'; ctx.fillRect(760 - 46, 820 - 300 * 0.82 - 40 - kop * 8, 92, 12); ctx.fillRect(760 - 26, 820 - 300 * 0.82 - 80 - kop * 8, 52, 42); ctx.restore();
  if (o.publiek) for (let i = 0; i < 9; i++) pict(ctx, 1460 + i * 48 + (i % 2) * 10, 900 - (i % 3) * 14, 150 + (i % 4) * 10, rgba('#9AA3B2', 0.55), o.publiek);
  // tikken: streepjes onder het bord
  const n = Math.floor(o.tik || 0); for (let i = 0; i < Math.min(n, 9); i++) { ctx.fillStyle = C.goud; ctx.fillRect(320 + i * 34, 620, 8, 50); } }

const SCENES = {
  title(ctx, t) { vensterbank(ctx, 1200, 980, 560); bakje(ctx, 1480, 965, { w: 380, n: 20, gekiemd: 0.9, groei: clamp(t / 3, 0, 1), seed: 2 }); zonIcoon(ctx, 1680, 640, 36, 1); },

  s01(ctx, t, q) { paardScene(ctx, t, q, { tik: q.on('tikt', 1, 2.5) * 5, publiek: q.on('commissie', 1) });
    casusKaart(ctx, 'Berlijn', '1904', ramp(t, 0.2, 0.6)); tag(ctx, 'geen bedrog gevonden', 1500, 560, C.groen, q.on('bedrog', 1)); vraagteken(ctx, 1150, 420, q.on('Hoe', 1), 140); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const cx = 960, cy = 470, R = 300;
    STAPPEN.forEach((s, i) => { const an = -Math.PI / 2 + i * Math.PI / 4, a = ramp(t, 1.2 + i * 0.25, 0.4); const x = cx + Math.cos(an) * R * 1.35, y = cy + Math.sin(an) * R;
      knoop(ctx, s, x, y, i === 0 ? C.groen : C.teal, a, 280); const an2 = an + Math.PI / 4, b = ramp(t, 1.4 + i * 0.25, 0.4); pijl(ctx, cx + Math.cos(an + 0.32) * R * 1.35, cy + Math.sin(an + 0.32) * R, cx + Math.cos(an2 - 0.32) * R * 1.35, cy + Math.sin(an2 - 0.32) * R, C.line, b * 0.8, 2.5); });
    regel(ctx, 'de onderzoekscyclus', cx, cy + 14, q.on('onderzoekscyclus', 1), C.goud, 44, 'center', 700); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const W0 = ['waarneming', 'onderzoeksvraag', 'hypothese', 'werkplan', 'voert', 'resultaten', 'conclusie', 'discussie'];
    const lit = W0.map((w, i) => q.on(w, 1, 0.5)); const upto = lit.reduce((m, v, i) => v > 0.5 ? i : m, -1);
    bord(ctx, { x: 120, y: 60, w: 1680, h: 230, vul: vulTot(Math.min(upto, 2)), actief: upto, licht: lit.map(v => 0.3 + 0.7 * v) });
    vensterbank(ctx, 1060, 830, 640); bakje(ctx, 1380, 815, { w: 380, n: 22, gekiemd: 0.9, groei: 1, seed: 3 });
    persoon(ctx, 'yasmin', 640, 880, 480, { outfit: 'school', t, uit: lit[1] > 0.5 && lit[2] < 0.5 ? 'verbaasd' : 'neutraal' });
    tag(ctx, 'licht?', 1380, 470, C.goud, lit[1] * (1 - lit[3])); zonIcoon(ctx, 1600, 470, 34, lit[1] * 0.9); },

  s06(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Hoe maak je van een vraag iets testbaars?', ramp(t, 0.1, 0.4) * uit(t, q, 'onderzoeksvraag', 1, 0.4)); if (isFinite(q.at('onderzoeksvraag', 1)) && q.on('onderzoeksvraag', 1, 0.4) < 0.05) return; begripKaart(ctx, 'onderzoeksvraag', 'gaat over één factor, en over iets wat je kunt meten', 120, 90, q.on('onderzoeksvraag', 1), { w: 820 });
    const a1 = q.on('vaag', 1, 0.4) || q.on('Wat', 1, 0.6), a2 = q.on('onderzoeken', 1);
    zinKaart(ctx, 'TE VAAG', 'Wat doet licht met tuinkers?', 1040, 110, 760, q.on('doet', 1), C.koraal); kruis(ctx, 1760, 150, 22, q.on('vaag', 1));
    zinKaart(ctx, 'GOEDE ONDERZOEKSVRAAG', 'Kiemen er in het licht meer tuinkerszaadjes dan in het donker?', 1040, 330, 760, q.on('Kiemen', 1), C.groen); vink(ctx, 1760, 370, 22, a2);
    bakje(ctx, 1240, 790, { w: 300, n: 14, gekiemd: 0.8, groei: 0.9, seed: 4, label: 'licht', a: q.on('Kiemen', 1) }); bakje(ctx, 1620, 790, { w: 300, n: 14, gekiemd: 0.8, groei: 0.9, seed: 5, label: 'donker', donker: 0.9, a: q.on('donker', 1) }); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const hy = q.on('hypothese', 1), vw = q.on('verwachting', 1);
    begripKaart(ctx, 'hypothese', 'een mogelijk antwoord op je onderzoeksvraag', 120, 90, hy * uit(t, q, 'verwachting', 1), { w: 760 });
    begripKaart(ctx, 'verwachting', 'wat je in deze proef zult meten als de hypothese klopt', 120, 90, vw, { w: 760 });
    zinKaart(ctx, 'HYPOTHESE', 'Licht bevordert het kiemen van tuinkers.', 1000, 110, 800, q.on('Bijvoorbeeld', 1), C.teal);
    zinKaart(ctx, 'VERWACHTING', 'Als licht het kiemen bevordert, dan kiemen er in het licht meer zaadjes dan in het donker.', 1000, 300, 800, q.on('Als', 1), C.goud);
    const g = q.on('Als', 1, 1.5); bakje(ctx, 1200, 800, { w: 300, n: 14, gekiemd: lerp(0, 0.9, g), seed: 6, label: 'licht: meer', a: g }); bakje(ctx, 1600, 800, { w: 300, n: 14, gekiemd: lerp(0, 0.4, g), seed: 7, label: 'donker: minder', a: g }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); zinKaart(ctx, '?', 'Welke zin is een verwachting?', 560, 330, 800, ramp(t, 0.2, 0.5), C.goud); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5);
    zinKaart(ctx, 'VERWACHTING · wat je in deze proef meet', 'Als licht het kiemen bevordert, dan kiemen er in het licht meer zaadjes dan in het donker.', 360, 140, 1200, a, C.goud, q.on('Antwoord', 1));
    zinKaart(ctx, 'HYPOTHESE · het idee zelf', 'Licht bevordert het kiemen van tuinkers.', 360, 420, 1200, q.on('hypothese', 1), C.teal);
    tag(ctx, 'hypothese ≠ verwachting', 960, 720, C.koraal, q.on('hetzelfde', 1)); },

  s11(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'falsifieerbaar', 'er is een uitkomst denkbaar die de hypothese weerlegt', 120, 90, q.on('falsifieerbaar', 1), { w: 820 });
    const g = q.on('Kiemen', 1, 1.2); bakje(ctx, 1180, 700, { w: 320, n: 16, gekiemd: 0.85 * g, seed: 8, label: 'licht' , a: g}); bakje(ctx, 1600, 700, { w: 320, n: 16, gekiemd: 0.85 * g, seed: 9, label: 'donker', a: g });
    regel(ctx, '=', 1390, 640, g, C.text, 70); tag(ctx, 'hypothese verworpen', 1390, 380, C.koraal, q.on('verwerp', 1)); tag(ctx, 'ook een resultaat', 1390, 470, C.groen, q.on('nieuws', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Wenen', '1847', ramp(t, 0.3, 0.5));
    const a1 = q.on('artsen', 1); plaatsIcoon(ctx, 'ziekenhuis', 330, 400, 1, a1, 'artsen'); plaatsIcoon(ctx, 'ziekenhuis', 650, 400, 1, q.on('vroedvrouwen', 1), 'vroedvrouwen');
    // sterftebalkjes (± 10 % en ± 4 %, vereenvoudigd)
    staven(ctx, 230, 820, 520, 200, [{ v: 10, col: C.koraal, label: '' }, { v: 4, col: C.groen, label: '' }], 12, q.on('stierven', 1), q.on('stierven', 1, 1));
    zinKaart(ctx, 'HYPOTHESE', 'iets van lijken, op de handen, veroorzaakt de koorts', 920, 120, 900, q.on('hypothese', 1), C.teal);
    zinKaart(ctx, 'VERWACHTING', 'als artsen hun handen wassen met chloorkalk, dan daalt de sterfte', 920, 300, 900, q.on('verwachting', 1), C.goud);
    const g = q.on('gebeurde', 1, 2.5); assen(ctx, 1000, 820, 760, 300, { a: g, xl: 'maand (1847)', yl: 'sterfte %' }); lijnen(ctx, 1000, 820, 760, 300, [{ col: C.koraal, pts: [[0.05, 0.9], [0.3, 0.85], [0.55, 0.12], [0.8, 0.07], [0.97, 0.09]] }], g, g);
    regel(ctx, '± 18 %', 1060, 520, g, C.koraal, 30, 'left'); regel(ctx, '1 à 2 %', 1700, 760, q.on('procent', 2), C.groen, 30, 'right'); },

  s13(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Wanneer is een proef eerlijk?', ramp(t, 0.1, 0.4) * uit(t, q, 'onafhankelijke', 1, 0.4)); if (isFinite(q.at('onafhankelijke', 1)) && q.on('onafhankelijke', 1, 0.4) < 0.05) return; begripKaart(ctx, 'eerlijke proef', 'tussen de groepen verschilt maar één ding', 120, 70, ramp(t, 0.2, 0.6) * uit(t, q, 'onafhankelijke', 1), { w: 760 });
    const on = q.on('onafhankelijke', 1), af = q.on('afhankelijke', 2), co = q.on('constante', 1);
    bakje(ctx, 760, 760, { w: 340, n: 18, gekiemd: 0.8, seed: 11, label: 'licht' }); bakje(ctx, 1220, 760, { w: 340, n: 18, gekiemd: 0.75, seed: 12, label: 'donker', donker: 0.85 });
    zinKaart(ctx, 'ONAFHANKELIJK · wat je verandert', 'licht of donker', 120, 330, 560, on, C.goud); zinKaart(ctx, 'AFHANKELIJK · wat je meet', 'aantal gekiemde zaadjes', 120, 500, 560, af, C.teal);
    zinKaart(ctx, 'CONSTANT · wat je gelijk houdt', 'zelfde zaadjes, evenveel water, zelfde temperatuur', 1420, 330, 420, co, C.groen); },

  s14(ctx, t, q) { bg(ctx, 'schema'); bakje(ctx, 760, 700, { w: 360, n: 18, gekiemd: 0.8, seed: 11, label: 'licht' }); bakje(ctx, 1220, 700, { w: 360, n: 18, gekiemd: 0.75, seed: 12, label: 'donker', donker: 0.85 });
    vraagteken(ctx, 1220, 330, q.on('Wat', 1), 120); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); bakje(ctx, 560, 720, { w: 340, n: 18, gekiemd: 0.8, seed: 11, label: 'licht' }); bakje(ctx, 1000, 720, { w: 340, n: 18, gekiemd: 0.75, seed: 12, label: 'donker', donker: 0.85 });
    tag(ctx, 'controlegroep', 1000, 360, C.goud, a); begripKaart(ctx, 'controlegroep', 'zonder de factor die je onderzoekt, verder precies gelijk', 1260, 90, q.on('controlegroep', 1), { w: 600, px: 42 });
    ['water', 'temperatuur', 'zaadjes'].forEach((s, i) => tag(ctx, s, 300 + i * 260, 230, C.groen, q.on('factoren', 1) * (1 - q.on('willekeurig', 1, 0.4) * 0.6), 'center', 28)); regel(ctx, '= constante variabelen', 560, 300, q.on('factoren', 1) * (1 - q.on('willekeurig', 1, 0.4) * 0.6), C.text2, 28);
    const r = q.on('willekeurig', 1, 1.2); dobbelsteen(ctx, 1500, 640, 90, r < 1 ? 1 + Math.floor((t * 7) % 6) : 5, r); tag(ctx, 'randomiseren', 1500, 790, C.teal, q.on('randomiseren', 1)); },

  s17(ctx, t, q) { const k = q.on('bewoog', 1, 0.3) * (1 - q.on('stopte', 1, 0.3)); paardScene(ctx, t, q, { som: '5 + 3 = ?', kop: k, tik: q.on('tikte', 1, 3) * 6 });
    casusKaart(ctx, 'Berlijn', '1907 · Pfungst', ramp(t, 0.2, 0.5)); tag(ctx, 'lichaamstaal', 1300, 230, C.groen, q.on('lichaamstaal', 1) * (1 - q.on('Pfungst', 1, 0.4)));
    tag(ctx, 'vraagsteller weet het antwoord zelf niet', 960, 230, C.oker, q.on('zelf', 1) * (1 - q.on('bewoog', 1, 0.4))); tag(ctx, 'bijna nooit goed', 1150, 330, C.koraal, q.on('nooit', 1) * (1 - q.on('bewoog', 1, 0.4)));
    tag(ctx, 'een heel kleine beweging, onbewust', 960, 230, C.goud, q.on('bewoog', 1) * (1 - q.on('Misschien', 1, 0.4))); tag(ctx, 'niemand bedroog', 960, 230, C.groen, q.on('bedroog', 1)); },

  s18(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'blind', 'wie meet of telt, weet niet in welke groep iets hoort', 120, 70, q.on('blind', 1), { w: 760 });
    const k = q.on('kiemproef', 1) * (1 - q.on('medisch', 1, 0.5)); bakje(ctx, 1140, 520, { w: 300, n: 16, gekiemd: 0.8, seed: 13, label: 'bakje A', a: k }); bakje(ctx, 1560, 520, { w: 300, n: 16, gekiemd: 0.75, seed: 14, label: 'bakje B', a: k });
    persoon(ctx, 'bilal', 1350, 880, 300, { outfit: 'practicum', t, a: k });
    const m = q.on('medisch', 1); for (let i = 0; i < 6; i++) { pict(ctx, 1000 + i * 60, 520, 140, C.teal, m); pict(ctx, 1450 + i * 60, 520, 140, C.oker, m); }
    tag(ctx, 'echte behandeling', 1150, 600, C.teal, m); tag(ctx, 'placebo', 1600, 600, C.oker, q.on('placebo', 1));
    tag(ctx, 'dubbelblind: proefpersoon én onderzoeker weten het niet', 1360, 760, C.goud, q.on('dubbelblind', 1), 'center', 30); },

  s19(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Hoe goed is je meting?', ramp(t, 0.1, 0.4) * uit(t, q, 'toevallige', 1, 0.4)); if (isFinite(q.at('toevallige', 1)) && q.on('toevallige', 1, 0.4) < 0.05) return; const a1 = q.on('toevallige', 1), a2 = q.on('systematische', 1);
    regel(ctx, 'toevallige fout', 560, 160, a1, C.teal, 40); stippenLat(ctx, 160, 420, 800, 'toeval', a1 * 14 * q.on('middelt', 1, 2) + a1 * 4, a1, { gem: q.on('middelt', 1) > 0.5 });
    regel(ctx, 'systematische fout', 1400, 160, a2, C.koraal, 40); stippenLat(ctx, 1000, 420, 800, 'systematisch', a2 * 14 * q.on('middelt', 2, 2) + a2 * 4, a2, { gem: q.on('middelt', 2) > 0.5 });
    tag(ctx, 'middelt uit', 560, 650, C.groen, q.on('middelt', 1)); tag(ctx, 'middelt niet uit', 1400, 650, C.koraal, q.on('middelt', 2)); },

  s20(ctx, t, q) { bg(ctx, 'schema'); weegschaal(ctx, 960, 620, 1.6, '52,0', ramp(t, 0.2, 0.6), { fout: q.on('veel', 1) > 0.5 }); regel(ctx, 'echt: 50,0 g', 960, 300, q.on('twee', 1), C.groen, 36); tag(ctx, '+ 2 g, elke keer', 960, 760, C.koraal, q.on('veel', 1)); },

  s22(ctx, t, q) { bg(ctx, 'schema'); stippenLat(ctx, 360, 420, 1200, 'systematisch', 16, ramp(t, 0.2, 0.5), { gem: true }); tag(ctx, 'systematische fout', 960, 180, C.koraal, q.on('systematische', 1));
    weegschaal(ctx, 960, 760, 1, q.on('nul', 1) > 0.5 ? '0,0' : '2,0', q.on('weegschaal', 1), { gewicht: q.on('nul', 1) <= 0.5 }); tag(ctx, 'alleen bij toevallige fouten helpt herhalen', 960, 860, C.teal, q.on('toevallige', 1), 'center', 28); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const a1 = q.on('drie', 1), a2 = q.on('vijftig', 1);
    bakje(ctx, 420, 520, { w: 260, n: 3, gekiemd: 0.67, seed: 15, label: '3 zaadjes', a: a1 }); bakje(ctx, 900, 520, { w: 420, n: 50, gekiemd: 0.8, seed: 16, len: 55, label: '50 zaadjes, 3× herhaald', a: a2 });
    tag(ctx, 'grotere steekproef', 660, 160, C.teal, q.on('steekproef', 1)); begripKaart(ctx, 'betrouwbaar', 'bij herhalen vind je ongeveer hetzelfde', 1200, 90, q.on('Betrouwbaar', 1) * uit(t, q, 'Nauwkeurig', 1), { w: 640, px: 42 });
    begripKaart(ctx, 'nauwkeurig', 'hoe fijn je meetinstrument meet', 1200, 90, q.on('Nauwkeurig', 1), { w: 640, px: 42 }); weegschaal(ctx, 1520, 700, 1, '50,0', q.on('tiende', 1));
    tag(ctx, 'en toch systematisch verkeerd', 1520, 830, C.koraal, q.on('systematisch', 1), 'center', 28); },

  s24(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'valide', 'je meet echt wat je wilt weten', 120, 70, q.on('valide', 1), { w: 640, px: 44 }); casusKaart(ctx, 'Zuidelijke Nederlanden', 'zeventiende eeuw', q.on('eeuw', 1), 1180, 54);
    const g = q.on('jaar', 1, 3); wilgInPot(ctx, 1240, 860, lerp(0.25, 1, g), q.on('wilg', 1)); regel(ctx, '5 pond', 1440, 600, q.on('wilg', 1) * (1 - g), C.text, 32, 'left'); regel(ctx, '± 169 pond', 1500, 470, q.on('zwaar', 1), C.groen, 34, 'left');
    regel(ctx, 'aarde: bijna even zwaar', 1200, 880, q.on('aarde', 2), C.text2, 28); zinKaart(ctx, 'CONCLUSIE VAN VAN HELMONT', 'de boom groeit van water', 120, 500, 620, q.on('conclusie', 1), C.oker); },

  s25(ctx, t, q) { bg(ctx, 'schema'); wilgInPot(ctx, 960, 860, 1, 1);
    zinKaart(ctx, 'MAAR ÉÉN BOOM', 'minder betrouwbaar', 120, 160, 520, q.on('boom', 1), C.teal); zinKaart(ctx, 'BLADEREN NIET GEWOGEN', 'systematische fout: groei steeds te laag', 120, 400, 520, q.on('bladeren', 1), C.koraal);
    const l = q.on('lucht', 1); zinKaart(ctx, 'DE LUCHT VERGETEN', 'droge stof komt vooral uit koolstofdioxide', 1300, 160, 520, l, C.goud); for (let i = 0; i < 6; i++) { const u = (t * 0.25 + i / 6) % 1; ctx.save(); ctx.globalAlpha = l * Math.sin(u * Math.PI); text(ctx, 'CO₂', lerp(1500, 1040, u), lerp(420, 520 + i * 10, u), fMeta(26), C.goud, 'center'); ctx.restore(); }
    tag(ctx, 'precies gemeten, verkeerde conclusie', 960, 880, C.koraal, q.on('conclusie', 1), 'center', 30); },

  s26(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Wat doe je met je metingen?', ramp(t, 0.1, 0.4) * uit(t, q, 'tabel', 1, 0.4)); if (isFinite(q.at('tabel', 1)) && q.on('tabel', 1, 0.4) < 0.05) return; const st = q.on('staafdiagram', 1), lg = q.on('lijngrafiek', 1); tabelKiem(ctx, 360, 300, q.on('tabel', 1) * (1 - q.on('grafiek', 1, 0.5)));
    assen(ctx, 200, 780, 640, 440, { a: q.on('grafiek', 1), yl: 'gekiemd (aantal)' }); regel(ctx, 'x-as: onafhankelijke variabele', 520, 870, q.on('x-as', 1), C.goud, 28);
    staven(ctx, 200, 780, 640, 440, [{ v: 41, col: C.goud, label: 'licht' }, { v: 38, col: C.teal, label: 'donker' }], 50, st, st, { waarde: true }); tag(ctx, 'staafdiagram', 520, 200, C.goud, st);
    assen(ctx, 1100, 780, 680, 440, { a: lg, xl: 'tijd (dagen)', yl: 'gekiemd (aantal)' }); lijnen(ctx, 1100, 780, 680, 440, [{ col: C.goud, pts: [[0, 0], [0.2, 0.1], [0.4, 0.5], [0.6, 0.75], [0.8, 0.8], [1, 0.82]] }, { col: C.teal, pts: [[0, 0], [0.2, 0.08], [0.4, 0.45], [0.6, 0.7], [0.8, 0.75], [1, 0.76]] }], q.on('tijd', 1, 2), lg); tag(ctx, 'lijngrafiek', 1440, 200, C.teal, lg); },

  s27(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'spreiding', 'hoe ver de metingen uit elkaar liggen', 120, 70, q.on('spreiding', 1), { w: 700 }); casusKaart(ctx, 'Galapagos', '1976–1978', q.on('Grant', 1), 1200, 54);
    const h = q.on('histogram', 1, 1.5); const C0 = [1, 3, 7, 14, 22, 26, 21, 13, 7, 3, 1]; assen(ctx, 900, 820, 900, 420, { a: h, xl: 'snavelhoogte (mm)', yl: 'aantal vinken' }); histogram(ctx, 905, 820, 880, 400, C0, h, { groei: h, col: C.oker });
    grondvink(ctx, 520, 760, 2.2, { a: q.on('vinken', 1) }); regel(ctx, 'gemiddelde', 1345, 380, q.on('gemiddelde', 2), C.goud, 26); ctx.save(); ctx.globalAlpha = q.on('gemiddelde', 2); ctx.strokeStyle = C.goud; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1345, 400); ctx.lineTo(1345, 820); ctx.stroke(); ctx.restore();
    pijl(ctx, 1000, 860, 1700, 860, C.text2, q.on('uiteenlopen', 1), 2.5); pijl(ctx, 1700, 860, 1000, 860, C.text2, q.on('uiteenlopen', 1), 2.5); },

  s28(ctx, t, q) { bg(ctx, 'schema'); miniBord(ctx, 4, 5, 0.9); assen(ctx, 360, 820, 900, 460, { a: 1, yl: 'gekiemd (van 50)' });
    staven(ctx, 360, 820, 900, 460, [{ v: 41, col: C.goud, label: 'licht', lo: 30, hi: 50 }, { v: 38, col: C.teal, label: 'donker', lo: 30, hi: 48 }], 50, q.on('resultaten', 1), q.on('eenenveertig', 1, 1), { waarde: true, waardeIn: true, spreiding: q.on('bakje', 1) });
    for (let i = 0; i < 6; i++) { [[585, 41], [1035, 38]].forEach(([x0, m], j) => { const v = m + (hash(i * 3 + j) - 0.5) * 20; ctx.save(); ctx.globalAlpha = q.on('bakje', 1); ctx.beginPath(); ctx.arc(x0 + 170, 820 - 460 * v / 50, 8, 0, 6.283); ctx.fillStyle = C.text; ctx.fill(); ctx.restore(); }); }
    regel(ctx, 'per bakje: 30 tot 50', 1500, 500, q.on('bakje', 1), C.text, 32); },

  s30(ctx, t, q) { bg(ctx, 'schema'); miniBord(ctx, 6, 6, 1); assen(ctx, 360, 820, 900, 460, { a: 1, yl: 'gekiemd (van 50)' });
    staven(ctx, 360, 820, 900, 460, [{ v: 41, col: C.goud, label: 'licht', lo: 30, hi: 50 }, { v: 38, col: C.teal, label: 'donker', lo: 30, hi: 48 }], 50, 1, 1, { waarde: true, waardeIn: true, spreiding: 1 });
    tag(ctx, 'verschil 3 · spreiding 20', 1560, 420, C.koraal, q.on('spreiding', 1), 'center', 30); tag(ctx, 'hypothese verworpen', 1560, 560, C.goud, q.on('verworpen', 1)); tag(ctx, 'een echt resultaat', 1560, 680, C.groen, q.on('resultaat', 1)); },

  s31(ctx, t, q) { bg(ctx, 'schema'); const nw = q.on('opviel', 1), dk = q.on('donker', 1);
    miniBord(ctx, nw > 0.5 ? 7 : 6, nw > 0.5 ? 7 : 6, 1);
    zinKaart(ctx, 'CONCLUSIE', 'licht maakt voor het kiemen van tuinkers weinig uit', 120, 360, 620, q.on('conclusie', 1), C.groen); zinKaart(ctx, 'DISCUSSIE', 'alleen tuinkers onderzocht · 50 zaadjes, 3×', 120, 560, 620, q.on('discussie', 1), C.oker);
    bakje(ctx, 1000, 820, { w: 300, n: 14, gekiemd: 0.8, seed: 21, label: 'licht', a: dk }); bakje(ctx, 1420, 820, { w: 300, n: 14, gekiemd: 0.78, etio: 1, seed: 22, label: 'donker', a: dk, labelCol: ON.geel });
    persoon(ctx, 'yasmin', 1760, 900, 420, { outfit: 'school', t, uit: q.on('geel', 1) > 0.5 ? 'verbaasd' : 'neutraal', kijk: -1, a: dk });
    tag(ctx, 'nieuwe onderzoeksvraag', 1210, 360, C.goud, q.on('nieuwe', 1)); },

  s32(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Wat als je niets kunt veranderen?', ramp(t, 0.1, 0.4) * uit(t, q, 'observationeel', 1, 0.4)); if (isFinite(q.at('observationeel', 1)) && q.on('observationeel', 1, 0.4) < 0.05) return; const e = ramp(t, 0.2, 0.5), o = q.on('observationeel', 1);
    zinKaart(ctx, 'EXPERIMENT', 'jij verandert één ding', 160, 140, 700, e, C.goud); bakje(ctx, 470, 480, { w: 300, n: 14, gekiemd: 0.8, seed: 23, a: e }); zonIcoon(ctx, 700, 330, 36, e);
    zinKaart(ctx, 'OBSERVATIONEEL', 'je kijkt wat samengaat', 1060, 140, 700, o, C.teal); for (let i = 0; i < 12; i++) pict(ctx, 1120 + (i % 6) * 100, 560 + Math.floor(i / 6) * 200, 150, i % 3 ? C.mens : C.teal, o);
    begripKaart(ctx, 'correlatie', 'twee dingen gaan samen', 160, 600, q.on('correlatie', 1) * uit(t, q, 'causaliteit', 1), { w: 640, px: 42 }); begripKaart(ctx, 'causaliteit', 'het ene veroorzaakt het andere', 160, 600, q.on('causaliteit', 1), { w: 640, px: 42 }); },

  s33(ctx, t, q) { bg(ctx, 'schema'); const om = q.on('omgekeerde', 1), vs = q.on('verstorende', 1);
    knoop(ctx, 'A', 260, 240, C.teal, 1, 120); knoop(ctx, 'B', 560, 240, C.teal, 1, 120); pijl(ctx, 330, 240, 490, 240, C.line, 1); regel(ctx, 'A veroorzaakt B?', 410, 340, 1, C.text2, 28);
    knoop(ctx, 'A', 860, 240, C.koraal, om, 120); knoop(ctx, 'B', 1160, 240, C.koraal, om, 120); pijl(ctx, 1090, 240, 930, 240, C.koraal, om); regel(ctx, 'omgekeerde causaliteit', 1010, 340, om, C.koraal, 28);
    knoop(ctx, 'C', 1610, 160, C.goud, vs, 120); knoop(ctx, 'A', 1460, 330, C.teal, vs, 120); knoop(ctx, 'B', 1760, 330, C.teal, vs, 120); pijl(ctx, 1580, 210, 1490, 280, C.goud, vs); pijl(ctx, 1640, 210, 1730, 280, C.goud, vs); regel(ctx, 'verstorende variabele', 1610, 430, vs, C.goud, 28);
    const ij = q.on('ijsjes', 1); zonIcoon(ctx, 960, 560, 50, q.on('Warm', 1)); knoop(ctx, 'meer ijsjes', 640, 760, C.teal, ij, 320); knoop(ctx, 'meer verdrinkingen', 1280, 760, C.teal, ij, 380);
    pijl(ctx, 800, 760, 1080, 760, C.koraal, ij * (1 - q.on('gevaarlijk', 1)) , 3); kruis(ctx, 940, 760, 30, q.on('gevaarlijk', 1)); pijl(ctx, 900, 620, 720, 700, C.goud, q.on('Warm', 1)); pijl(ctx, 1020, 620, 1200, 700, C.goud, q.on('Warm', 1)); },

  s34(ctx, t, q) { bg(ctx, 'schema'); knoop(ctx, 'ontbijten', 600, 450, C.teal, ramp(t, 0.3, 0.5), 360); knoop(ctx, 'hogere cijfers', 1320, 450, C.teal, ramp(t, 0.8, 0.5), 400); regel(ctx, 'gaan samen', 960, 470, ramp(t, 1.2, 0.5), C.text2, 30); vraagteken(ctx, 960, 300, q.on('verklaring', 1), 100); },

  s36(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); knoop(ctx, 'ontbijten', 600, 640, C.teal, 1, 360); knoop(ctx, 'hogere cijfers', 1320, 640, C.teal, 1, 400);
    knoop(ctx, 'rust en regelmaat', 960, 300, C.goud, a, 420); pijl(ctx, 880, 350, 660, 580, C.goud, a); pijl(ctx, 1040, 350, 1260, 580, C.goud, a); regel(ctx, 'verstorende variabele', 960, 210, a, C.goud, 30);
    pijl(ctx, 1150, 700, 790, 700, C.koraal, q.on('omgekeerde', 1)); regel(ctx, 'omgekeerde causaliteit', 960, 770, q.on('omgekeerde', 1) * (1 - q.on('ontbijt', 2, 0.4)), C.koraal, 28);
    pijl(ctx, 790, 700, 1150, 700, C.teal, q.on('helpt', 1)); regel(ctx, 'kan ook', 960, 770, q.on('helpt', 1), C.teal, 28); tag(ctx, 'uit een correlatie alleen weet je het niet', 960, 880, C.text2, q.on('correlatie', 1), 'center', 28); },

  s37(ctx, t, q) { bg(ctx, 'schema'); casusKaart(ctx, 'Engeland', 'rond 1950', q.on('1950', 1)); const p = q.on('longkankerpatiënten', 1), c = q.on('andere', 1);
    for (let i = 0; i < 12; i++) { pict(ctx, 260 + (i % 6) * 90, 470 + Math.floor(i / 6) * 220, 170, i < 11 ? C.koraal : C.mens, p); pict(ctx, 1100 + (i % 6) * 90, 470 + Math.floor(i / 6) * 220, 170, i < 9 ? C.koraal : C.mens, c); }
    regel(ctx, 'longkankerpatiënten', 480, 300, p, C.text, 30); regel(ctx, 'andere mensen', 1320, 300, c, C.text, 30); sigaret(ctx, 1600, 560, 2, q.on('rookten', 1)); pict(ctx, 1620, 760, 70, C.koraal, q.on('rookten', 1)); regel(ctx, '= rookt (veel)', 1680, 745, q.on('rookten', 1), C.text2, 26, 'left');
    tag(ctx, 'experiment mag niet', 960, 200, C.koraal, q.on('mag', 1)); tag(ctx, '→ de extra film', 960, 860, C.goud, q.on('extra', 1)); },

  s38(ctx, t, q) { bg(ctx, 'schema'); openVraag(ctx, 'Mag alles in onderzoek?', ramp(t, 0.1, 0.4) * uit(t, q, '1951', 1, 0.4)); if (isFinite(q.at('1951', 1)) && q.on('1951', 1, 0.4) < 0.05) return; casusKaart(ctx, 'Baltimore', '1951', q.on('1951', 1)); plaatsIcoon(ctx, 'ziekenhuis', 420, 480, 1.2, q.on('tumor', 1)); regel(ctx, 'Henrietta Lacks', 420, 720, q.on('Henrietta', 1), C.text, 36);
    const l = q.on('lab', 1); pijl(ctx, 560, 480, 820, 480, C.line, l); plaatsIcoon(ctx, 'lab', 960, 480, 1.2, l); regel(ctx, 'zonder dat zij het wist', 690, 420, q.on('wist', 1), C.koraal, 28);
    kweekfles(ctx, 1520, 520, 1.6, q.on('cellen', 1)); regel(ctx, 'haar cellen, nog altijd gebruikt', 1560, 640, q.on('wereldwijd', 1), C.text2, 28); tag(ctx, 'familie: pas ruim twintig jaar later', 960, 840, C.oker, q.on('familie', 1)); },

  s39(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'informed consent', 'vooraf geïnformeerde toestemming', 120, 90, q.on('consent', 1), { w: 760 });
    formulier(ctx, 1300, 480, 1.4, q.on('toestemming', 1, 1.5), ramp(t, 0.2, 0.5)); ['wat er gebeurt', 'de risico\'s'].forEach((s, i) => tag(ctx, s, 400 + i * 360, 620, C.teal, q.on(i ? 'risico' : 'gebeurt', 1), 'center', 30)); tag(ctx, 'je mag altijd stoppen', 560, 760, C.groen, q.on('stoppen', 1)); },

  s40(ctx, t, q) { bg(ctx, 'schema'); muis(ctx, 360, 520, 18, { a: ramp(t, 0.2, 0.5), t }); tag(ctx, 'vergunning nodig', 360, 640, C.oker, q.on('vergunning', 1)); regel(ctx, 'belang ⇄ ongerief', 360, 760, q.on('ongerief', 1), C.text2, 30);
    [['Vervanging', 'kan het zonder dieren?'], ['Vermindering', 'zo min mogelijk dieren'], ['Verfijning', 'zo min mogelijk ongerief']].forEach(([a, b], i) => zinKaart(ctx, a.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), b, 820, 160 + i * 210, 980, q.on(a, 1), [C.groen, C.teal, C.goud][i])); },

  s41(ctx, t, q) { bg(ctx, 'schema'); for (let i = 0; i < 3; i++) muis(ctx, 560 + i * 230, 560, 14, { a: q.on('drie', 1), t: t + i, kijk: 1 }); regel(ctx, '3 per groep', 760, 700, q.on('drie', 1), C.text, 34); vraagteken(ctx, 1300, 460, q.on('idee', 1), 120); },

  s43(ctx, t, q) { bg(ctx, 'schema'); const a = ramp(t, 0.2, 0.5); for (let i = 0; i < 3; i++) muis(ctx, 260 + i * 200, 500, 12, { a, t: t + i });
    tag(ctx, 'verschil al snel toeval', 450, 640, C.koraal, q.on('toeval', 1)); for (let i = 0; i < 20; i++) muis(ctx, 1000 + (i % 5) * 150, 380 + Math.floor(i / 5) * 110, 8, { a: q.on('genoeg', 1), t: t + i * 0.3 });
    tag(ctx, 'zo min mogelijk, en toch genoeg', 1300, 880, C.groen, q.on('genoeg', 1), 'center', 30); },

  s44(ctx, t, q) { bg(ctx, 'schema'); begripKaart(ctx, 'fraude', 'bewust misleiden met je gegevens', 120, 90, q.on('Fraude', 1), { w: 700 });
    ['verzinnen', 'vervalsen', 'overnemen'].forEach((s, i) => zinKaart(ctx, 'FRAUDE', 'gegevens ' + s, 980 + 0, 120 + i * 180, 820, q.on(s, 1), C.koraal));
    zinKaart(ctx, 'EEN FOUT', 'meld je en verbeter je', 120, 560, 700, q.on('fout', 1), C.groen); tag(ctx, 'fraude verberg je', 1390, 720, C.koraal, q.on('verberg', 1)); },

  s45(ctx, t, q) { bg(ctx, 'schema'); bord(ctx, { x: 120, y: 120, w: 1680, h: 300, vul: vulTot(7), actief: -1, a: ramp(t, 0.2, 0.6) });
    tag(ctx, 'betrouwbaar?', 700, 600, C.teal, q.on('betrouwbaar', 1)); tag(ctx, 'valide?', 1220, 600, C.goud, q.on('valide', 1));
    regel(ctx, 'een eerlijke proef liet zien wat er echt gebeurde', 960, 760, q.on('eerlijke', 1) * (1 - q.on('toetsbare', 1, 0.4)), C.text, 34); },
};
// wilg in een pot (Schema-lab: lijntekening, vlak groen); g = groei 0..1
function wilgInPot(ctx, x, y, g, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 150, y - 200); ctx.lineTo(x - 120, y); ctx.lineTo(x + 120, y); ctx.lineTo(x + 150, y - 200); ctx.closePath(); shape(ctx, '#6E4A34', '#9A7458', 2);
  ctx.fillStyle = ON.aarde; ctx.fillRect(x - 140, y - 196, 280, 26); const H0 = 100 + 250 * g; ctx.strokeStyle = '#8C6A4E'; ctx.lineWidth = 10 + 18 * g; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y - 190); ctx.lineTo(x + 6, y - 190 - H0); ctx.stroke();
  const N = Math.round(6 + 10 * g); for (let i = 0; i < N; i++) { const an = -Math.PI / 2 + (i / (N - 1) - 0.5) * 2.4, L = (80 + 160 * g) * (0.7 + 0.3 * hash(i)); const sx = x + 6, sy = y - 190 - H0 * (0.85 + 0.15 * hash(i * 3));
    ctx.strokeStyle = '#7A9A62'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, sy); const ex = sx + Math.cos(an) * L, ey = sy + Math.sin(an) * L * 0.5; ctx.quadraticCurveTo(ex, ey - 40, ex + Math.cos(an) * 20, ey + L * 0.7); ctx.stroke();
    for (let k = 0; k < 5; k++) { const u = 0.4 + k * 0.13; ctx.fillStyle = '#7FC48F'; ctx.beginPath(); ctx.ellipse(lerp(sx, ex + Math.cos(an) * 20, u), lerp(sy, ey + L * 0.7, u * u), 4, 12, an, 0, 6.283); ctx.fill(); } }
  ctx.restore(); }

// tabel van de kiemproef (Schema)
function tabelKiem(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rows = [['', 'bakje 1', 'bakje 2', 'bakje 3', 'gemiddeld'], ['licht', '44', '30', '49', '41'], ['donker', '36', '30', '48', '38']];
  rows.forEach((r, i) => r.forEach((c, j) => { const cx = x + j * 220, cy = y + i * 80; roundRect(ctx, cx, cy, 210, 70, 8); shape(ctx, i === 0 || j === 0 ? '#22314E' : '#1E2B44', '#4A5A78', 1.2); text(ctx, c, cx + 105, cy + 46, i === 0 ? fMeta(24) : fTekst(30, j === 4 ? 700 : 500), j === 4 && i ? C.goud : C.text, 'center'); }));
  ctx.restore(); }
