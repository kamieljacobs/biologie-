// Wat word jij? · Forensisch onderzoek 4 · Stille getuigen — scènes per alinea (v1.0, 2 nov 2026).
// Look: Schema op navy, Micro (donkerder navy, zonder korrel) voor stuifmeel, haar en kiezelwier. Cast: Bilal (stagiair,
// 'practicum'), Dr. Kim ('lab': onderzoeker en in H3 forensisch patholoog), de palynoloog (alleen 'PALYNOLOOG' in beeld),
// Erik (verdachte, alleen in beeld), Joost (bewoner, alleen in beeld). Decors: 'achtertuin' (cold open, H1 potjes en struik)
// en 'plas' (H3, leeg). Geen lichaam, geen silhouet: longblaasje en bot alleen als los schema.
// Vragen: bij Vragen uit (VU()) verdwijnen vraagtekens en vraagopstellingen; het antwoordlabel houdt alleen de inhoud.

function zakjesRij(ctx, x0, y, s, a, o = {}) { const L = [['SCHOEN', 'schoen'], ['HAAR', 'haar'], ['PREPARAAT\nANDERE ZAAK', 'preparaat']], A = o.aa || [1, 1, 1], d = o.d || 300;
  L.forEach(([lab, inh], i) => fo4_zakje(ctx, x0 + i * d, y, s, lab, { inhoud: inh, hl: o.hl === i ? 1 : 0, a: a * A[i] })); }
function bureauBlad(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 80, 720, 1760, 22, 8); shape(ctx, '#6A5240', '#8A6A50', 2); ctx.fillStyle = '#4E3C2E'; ctx.fillRect(130, 742, 30, 118); ctx.fillRect(1760, 742, 30, 118); ctx.restore(); }
function vraagA(t, q, w, n = 1, d = 0.5) { return VU() ? 0 : ramp(t, q.at(w, n) - 0.2, d); }

Object.assign(SCENES, {
  title(ctx, t) { fo4_korrel(ctx, 1330, 360, 92, 'insect', { kleef: 0.6, rot: t * 0.05 }); fo4_korrel(ctx, 1600, 300, 70, 'berk', { rot: 0.3 }); fo4_korrel(ctx, 1580, 520, 64, 'gras');
    fo4_kiezelwier(ctx, 1760, 450, 1.1, { soort: 'boot', rot: -0.5 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const tV = q.at('verdachte', 1), A = ramp(t, tV - 0.6, 0.4), E = ramp(t, q.at('zegt', 1) - 0.1, 0.15), P = ramp(t, q.at('verraden', 1) - 1.0, 0.25);
    // fase 1: bureau met drie zakjes en het lege rapport
    laag(ctx, 1 - A, () => { bg(ctx, 'schema'); bureauBlad(ctx); metaText(ctx, 'BUREAU · FORENSISCH ONDERZOEK', 160, 200, C.text2, 'left', 28);
      const Z = [q.on('schoen', 1, 0.4), q.on('haar', 1, 0.4), q.on('glaasje', 1, 0.4)];
      zakjesRij(ctx, 360, 560, 0.8, 1, { aa: Z.map(z => Math.max(0.0, z)), hl: t > q.at('schoen', 1) && t < q.at('haar', 1) ? 0 : -1 });
      laag(ctx, q.on('Drie', 1, 0.5) * (1 - q.on('schoen', 1, 0.4)), () => text(ctx, 'drie stille getuigen', 660, 330, fTekst(56, 800), C.text, 'center'));
      fo4_rapport(ctx, 1420, 170, 380, { vul: [0, 0, 0], a: q.on('Drie', 1, 0.6) });
      // Micro-flits: een stuifmeelkorrel uit het stof op de schoen
      zoom(ctx, 600, 260, 130, 360, 560, '', fase(t, q.at('stof', 1) - 0.2, q.at('glaasje', 1), 0.35), () => { fo4_korrel(ctx, 600, 260, 70, 'insect', { kleef: 0.4 }); fo4_korrel(ctx, 520, 340, 30, 'gras'); }); });
    // fase 2: de inbraak (achtertuin) en de verdachte in de verhoorkamer
    laag(ctx, A * (1 - E), () => { decor(ctx, 'achtertuin', 0.6); metaText(ctx, 'DE INBRAAK', 160, 200, C.goud, 'left', 28); naamBij(ctx, 'kapot raam', '', 400, 140, q.on('inbraak', 1, 0.4), 'center'); naamBij(ctx, 'struik', 'ONDER HET RAAM', 270, 720, q.on('inbraak', 1, 0.6), 'center'); });
    laag(ctx, E * (1 - P), () => { bg(ctx, 'schema'); verhoorkamer(ctx); tafel(ctx, 960, 690, 520);
      persoon(ctx, 'erik', 820, GROND, 440, { t, pose: 'zit', stoel: true, tafel: 690, kijk: 1, uit: 'neutraal' });
      naamBij(ctx, 'Erik', 'VERDACHTE', 820, 300, 1, 'center');
      laag(ctx, q.on('nooit', 2, 0.4), () => { kaart(ctx, 1060, 300, 560, 140, 1, C.text); text(ctx, 'alleen bij de voordeur', 1340, 385, fTekst(44, 800), C.text, 'center'); ctx.fillStyle = rgba('#0D1420', 0.9); ctx.beginPath(); ctx.moveTo(1100, 440); ctx.lineTo(1060, 480); ctx.lineTo(1150, 440); ctx.fill(); });
      laag(ctx, q.on('achtertuin', 1, 0.4), () => tag(ctx, 'nooit in de achtertuin', 1340, 520, C.koraal, 1, 'center', 34)); });
    // fase 3: de startvraag
    laag(ctx, P, () => { bg(ctx, 'schema'); kaart(ctx, 200, 260, 1240, 330, 1, C.goud); text(ctx, 'Hoe kan stuifmeel op een schoen', 250, 370, fTekst(56, 800), C.text, 'left'); text(ctx, 'verraden waar iemand is geweest?', 250, 450, fTekst(56, 800), C.text, 'left');
      metaText(ctx, 'STUIFMEEL · HAAR · KIEZELWIEREN', 250, 530, C.goud, 'left', 28); vraagteken(ctx, 1560, 520, 1, 150); fo4_schoen(ctx, 1600, 760, 0.9, { vies: 1 }); }); },

  // ---------- H1 Stuifmeel ----------
  s03(ctx, t, q) { const tV = q.at('Vorm', 1), B = ramp(t, tV - 0.3, 0.5), tP = q.at('palynoloog', 1), Pa = ramp(t, tP - 0.4, 0.5), tS = q.at('stagiair', 1), St = ramp(t, tS - 0.3, 0.2), tO = q.at('zit', 1) - 0.7, O = ramp(t, tO - 0.4, 0.5), Qv = vraagA(t, q, 'Welke');
    bg(ctx, 'schema');
    // A: de verklaring van de korrel
    laag(ctx, 1 - B, () => { const h = fo4_verklaring(ctx, 140, 230, 760, 1, { regels: ['Ik ben een stuifmeelkorrel, tien tot honderd micrometer groot.', 'Mijn wand vergaat bijna niet.', 'Ik zat op een schoen.'], typ: clamp(t / 7.0, 0, 1), tekenA: ramp(t, 6.6, 0.5) });
      microVenster(ctx, 1480, 460, 260, 'STUIFMEELKORREL · VERGROOT', 1, () => { fo4_korrel(ctx, 1480, 460, 170, 'insect', { kleef: 0, rot: t * 0.04 }); });
      fo4_schaal(ctx, 940, 700, 120, '± 25 MICROMETER', q.on('micrometer', 1, 0.4));
      laag(ctx, q.on('wand', 1, 0.4), () => naamBij(ctx, 'wand', 'VERGAAT BIJNA NIET', 1480, 150, 1, 'center', C.goud));
      laag(ctx, q.on('zat', 1, 0.4), () => fo4_schoen(ctx, 620, 800, 0.8, { vies: 1 })); });
    // B: vorm, openingen, wandpatroon
    laag(ctx, B * (1 - Pa), () => { micro(ctx); metaText(ctx, 'STUIFMEEL · VERGROOT', 160, 200, C.grain, 'left', 28);
      const Vo = q.on('Vorm', 1, 0.4), Op = q.on('openingen', 1, 0.4), Wp = q.on('wandpatroon', 1, 0.4);
      [['gras', 420], ['berk', 960], ['insect', 1500]].forEach(([s, x], i) => fo4_korrel(ctx, x, 470, 150, s, { a: Vo, hl: 0, rot: i === 1 ? 0.2 : 0 }));
      laag(ctx, Op, () => { [[420 + 57, 470 - 41, 40], [960, 470 - 130, 30], [960 - 112, 470 + 66, 30], [960 + 112, 470 + 66, 30]].forEach(([x, y, r]) => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); }); metaText(ctx, 'OPENINGEN', 690, 720, C.goud, 'center', 30); });
      laag(ctx, Wp, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1500, 470, 175, 0, 6.283); ctx.stroke(); metaText(ctx, 'WANDPATROON', 1500, 720, C.goud, 'center', 30); });
      laag(ctx, Vo * (1 - Op), () => metaText(ctx, 'VORM', 960, 720, C.goud, 'center', 30));
      laag(ctx, q.on('plantengroep', 1, 0.4), () => tag(ctx, 'per plantengroep anders', 960, 820, C.groen, 1, 'center', 34)); });
    // C: de palynoloog aan de microscoop
    laag(ctx, Pa * (1 - St), () => { tafel(ctx, 820, 700, 560); microscoop(ctx, 760, 700, 1.3); palyno(ctx, 420, t, { kijk: 1, uit: 'blij' });
      naamBij(ctx, 'palynoloog', 'STUIFMEELDESKUNDIGE', 420, 345, q.on('palynoloog', 1, 0.3), 'center');
      microVenster(ctx, 1420, 420, 240, '', q.on('herkent', 1, 0.4), () => { fo4_korrel(ctx, 1360, 380, 90, 'berk', { rot: 0.4 }); fo4_korrel(ctx, 1490, 500, 70, 'gras'); });
      laag(ctx, q.on('familie', 1, 0.4), () => { tag(ctx, 'familie', 1320, 760, C.groen, 1, 'center', 34); });
      laag(ctx, q.on('geslacht', 1, 0.4), () => { tag(ctx, 'geslacht', 1540, 760, C.groen, 1, 'center', 34); metaText(ctx, 'VAAK', 1420, 830, C.text2, 'center', 28); }); });
    // D: de stagiair met drie vergelijkingsmonsters
    laag(ctx, St * (1 - O), () => { bilal(ctx, 320, t, { kijk: 1, pose: q.on('voortuin', 1) > 0.5 ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Bilal', 'STAGIAIR', 320, 330, 1, 'center');
      metaText(ctx, 'VERGELIJKINGSMONSTERS', 1120, 300, C.goud, 'center', 28);
      fo4_grondpot(ctx, 800, 720, 1, 'VOORTUIN', { a: q.on('voortuin', 1, 0.3) }); fo4_grondpot(ctx, 1120, 720, 1, 'ACHTERTUIN', { a: q.on('achtertuin', 1, 0.3) }); fo4_grondpot(ctx, 1440, 720, 1, 'STRAAT\nVERDACHTE', { a: q.on('straat', 1, 0.3) }); });
    // E: wat er op de schoen zit (en de vraag)
    laag(ctx, O, () => { const Kz = [q.on('gras', 1, 0.3), q.on('berk', 1, 0.3), q.on('struik', 1, 0.3)];
      laag(ctx, 1 - Qv, () => { fo4_schoen(ctx, 330, 760, 1.2, { vies: 1 }); metaText(ctx, 'SCHOEN VERDACHTE', 330, 830, C.text2, 'center', 28);
        zoom(ctx, 960, 470, 250, 300, 760, 'STOF VAN DE ZOOL · VERGROOT', 1, () => { for (let i = 0; i < 40; i++) circ(ctx, 730 + hash(i * 3) * 460, 240 + hash(i * 3 + 1) * 460, 3 + 6 * hash(i + 7), rgba(i % 3 ? '#8A7A64' : '#6A5A48', 0.7)); fo4_korrel(ctx, 860, 400, 70, 'gras', { a: Kz[0] }); fo4_korrel(ctx, 1060, 410, 64, 'berk', { a: Kz[1], rot: 0.5 }); fo4_korrel(ctx, 960, 560, 62, 'insect', { a: Kz[2], kleef: 0.7 });
          naamBij(ctx, 'gras', '', 860, 505, Kz[0], 'center'); naamBij(ctx, 'berk', '', 1060, 510, Kz[1], 'center'); naamBij(ctx, 'struik', '', 960, 665, Kz[2], 'center'); });
        laag(ctx, q.on('raam', 1, 0.4), () => { fo4_struik(ctx, 1560, 800, 0.8, { bloei: 1 }); naamBij(ctx, 'struik', 'ONDER HET RAAM', 1560, 820, 1, 'center'); }); });
      laag(ctx, Qv, () => { metaText(ctx, 'WELKE KORREL ZEGT HET MEEST OVER DE ACHTERTUIN?', 960, 220, C.goud, 'center', 28);
        [['gras', 480, 'gras'], ['berk', 960, 'berk'], ['insect', 1440, 'struik']].forEach(([s, x, n], i) => { fo4_korrel(ctx, x, 470, 130, s, { kleef: i === 2 ? 0.7 : 0, rot: i === 1 ? 0.4 : 0 }); naamBij(ctx, n, '', x, 680, 1, 'center'); });
        vraagteken(ctx, 960, 820, 1, 110); }); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de struik', 1);
    const tS = q.at('struik', 1), S = ramp(t, tS - 0.4, 0.5), tZ = q.at('staat', 1) - 0.4, Z = ramp(t, tZ - 0.3, 0.5), tM = q.at('Maar', 1), M = ramp(t, tM - 0.3, 0.5), Qv = vraagA(t, q, 'betekent');
    // wind: gras en berk, stuifmeel waait ver weg
    laag(ctx, 1 - S, () => { gras(ctx, 260, 800, 1.1, q.on('Gras', 1, 0.3), t); berk(ctx, 560, 800, 1, q.on('berk', 1, 0.3), t); naamBij(ctx, 'gras', '', 260, 850, q.on('Gras', 1, 0.3), 'center'); naamBij(ctx, 'berk', '', 560, 850, q.on('berk', 1, 0.3), 'center');
      laag(ctx, q.on('wind', 1, 0.4), () => { for (let i = 0; i < 3; i++) { const yy = 300 + i * 60; ctx.strokeStyle = rgba(C.text2, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(760, yy); ctx.bezierCurveTo(900, yy - 20, 1000, yy + 20, 1120 + i * 40, yy); ctx.stroke(); } metaText(ctx, 'WIND', 760, 260, C.text2, 'left', 28); });
      const u = clamp((t - q.at('waait', 1) + 1.5) / 3, 0, 1); fo4_stuifwolk(ctx, 600, 430, { a: q.on('stuifmeel', 1, 0.5), u: 0.25 + 0.75 * u, t, ver: 1150, n: 110, r: 7 });
      laag(ctx, q.on('overal', 1, 0.4), () => tag(ctx, 'bijna overal', 1500, 720, C.oker, 1, 'center', 36)); });
    // insecten: de struik, de hommel, kleverige klontjes die bij de plant blijven
    laag(ctx, S * (1 - Z), () => { const tros = fo4_struik(ctx, 620, 800, 1.3, { bloei: 1, klontjes: q.on('minder', 1, 0.5) }); naamBij(ctx, 'struik', '', 620, 850, 1, 'center');
      const tr = tros[3] || [620, 500], tI = q.at('insecten', 1), u = clamp((t - tI) / 2.2, 0, 1); const hx = lerp(1200, tr[0] + 30, ease(u)), hy = lerp(300, tr[1] - 50, ease(u)) + Math.sin(t * 3) * 6;
      fo4_hommel(ctx, hx, hy, 0.75, { houding: 'bestuiven', t, kijk: -1, a: q.on('insecten', 1, 0.4) }); naamBij(ctx, 'hommel', 'INSECT', hx, hy - 90, q.on('insecten', 1, 0.4) * (1 - q.on('dicht', 1, 0.4)), 'center');
      laag(ctx, q.on('minder', 1, 0.4), () => { fo4_klontje(ctx, 1400, 420, 38); naamBij(ctx, 'kleverige klontjes', 'VEEL MINDER STUIFMEEL', 1400, 560, 1, 'center'); });
      laag(ctx, q.on('dicht', 1, 0.4), () => tag(ctx, 'blijft dicht bij de plant', 1400, 720, C.koraal, 1, 'center', 36)); });
    // alleen in de achtertuin
    laag(ctx, Z * (1 - M), () => { metaText(ctx, 'VERGELIJKINGSMONSTERS', 960, 300, C.goud, 'center', 28);
      fo4_grondpot(ctx, 560, 700, 1.3, 'VOORTUIN'); fo4_grondpot(ctx, 960, 700, 1.3, 'ACHTERTUIN', { bloem: q.on('alleen', 1, 0.4), gl: q.on('achtertuin', 1, 0.4) }); fo4_grondpot(ctx, 1360, 700, 1.3, 'STRAAT\nVERDACHTE'); });
    // vier dagen tot de inbeslagname
    laag(ctx, M, () => { kalenderFo4(ctx, 300, 300, 1.4, { d1: q.on('Maar', 1, 0.4), pijl: q.on('vier', 1, 0.4), d4: q.on('dagen', 1, 0.4) });
      laag(ctx, q.on('beslag', 1, 0.4), () => { fo4_zakje(ctx, 1380, 560, 1.05, 'SCHOEN', { inhoud: 'schoen' }); metaText(ctx, 'IN BESLAG: 4 DAGEN LATER', 1380, 820, C.goud, 'center', 28); });
      vraagteken(ctx, 1640, 420, Qv, 110); }); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: deels weggesleten', 1);
    const tT = q.at('Toch', 1), M = ramp(t, tT - 0.4, 0.5), tD = q.at('Daarom', 1), D = ramp(t, tD - 0.3, 0.5);
    laag(ctx, 1 - M, () => { metaText(ctx, 'ZOOL · VERGROOT', 160, 230, C.grain, 'left', 28);
      const g = clamp((t - q.at('nieuw', 1)) / 2, 0, 1), sl = clamp((t - q.at('valt', 1)) / 1.6, 0, 1);
      const zx = 700, zy = 660; ctx.save(); ctx.translate(zx, zy); ctx.scale(1.6, 1.6); fo4_zool(ctx, 0, 0, 640, { groei: 0.2 + 0.8 * g, slijt: sl }); ctx.restore();
      laag(ctx, q.on('nieuw', 1, 0.4) * (1 - D), () => naamBij(ctx, 'nieuw stuifmeel', 'LAATSTE PLEK', zx, 400, 1, 'center', C.groen));
      laag(ctx, q.on('oud', 1, 0.4) * (1 - D), () => naamBij(ctx, 'oud valt af', '', zx + 420, 740, 1, 'center', C.text2));
      laag(ctx, q.on('overheerst', 1, 0.4), () => tag(ctx, 'laatste plek overheerst', zx, 820, C.groen, 1, 'center', 34));
      laag(ctx, D, () => { fo4_zakje(ctx, 1540, 540, 1, 'SCHOEN', { inhoud: 'schoen' }); laag(ctx, q.on('snel', 1, 0.4), () => tag(ctx, 'zo snel mogelijk', 1540, 820, C.goud, 1, 'center', 34)); naamBij(ctx, 'in beslag', 'POLITIE', 1540, 300, 1, 'center'); }); });
    laag(ctx, M, () => { const Hl = q.on('achtertuin', 1, 0.3); fo4_mengsel(ctx, 120, 230, 1040, 560, { groei: clamp((t - tT + 0.4) / 1.2, 0, 1), hl: 0 });
      laag(ctx, Hl * (1 - q.on('straat', 1, 0.3)), () => tag(ctx, 'lijkt meer op de achtertuin', 640, 845, C.goud, 1, 'center', 32));
      laag(ctx, q.on('straat', 1, 0.3) * (1 - q.on('Opvallend', 1, 0.3)), () => tag(ctx, 'meer dan op zijn eigen straat', 640, 845, C.goud, 1, 'center', 32));
      const R = q.on('past', 1, 0.4); fo4_rapport(ctx, 1380, 200, 420, { vul: [clamp((t - q.at('past', 1)) / 1.6, 0, 1), 0, 0], hl: R > 0.5 ? 0 : -1, a: q.on('Opvallend', 1, 0.5) });
      laag(ctx, q.on('Opvallend', 1, 0.3) * (1 - q.on('bewijzen', 1, 0.3)), () => tag(ctx, 'opvallend, maar zwak', 640, 845, C.oker, 1, 'center', 32));
      laag(ctx, q.on('bewijzen', 1, 0.3), () => tag(ctx, 'past bij ≠ bewijs', 640, 845, C.koraal, 1, 'center', 34)); }); },

  // ---------- H2 Haar ----------
  s08(ctx, t, q) { bg(ctx, 'schema');
    const tO = q.at('Onder', 1), O = ramp(t, tO - 0.3, 0.5), tE = q.at('eerste', 1), E = ramp(t, tE - 0.4, 0.5), tK = q.at('onderzoeker', 1), K = ramp(t, tK - 0.4, 0.5), Qv = vraagA(t, q, 'kun');
    // A: verklaring 2 en de rand van het raam met drie haren, elk in een eigen zakje
    laag(ctx, 1 - O, () => { fo4_verklaring(ctx, 140, 230, 720, 2, { regels: ['Wij zijn drie haren.', 'We bleven hangen aan het kapotte glas.'], typ: clamp(t / 3.9, 0, 1), teken: 'haar', tekenA: ramp(t, 3.4, 0.4) });
      raamRand(ctx, 1300, 440, 1, { a: q.on('hangen', 1, 0.4) }); });
    // B: haar onder de microscoop, met zoomcirkel voor de details
    laag(ctx, O * (1 - E), () => { micro(ctx); filmKaartje(ctx, 120, 110, 'Preparaat en microscoop', fase(t, q.at('microscoop', 1) - 0.2, q.at('Binnenin', 1) + 0.4, 0.4));
      const Me = q.on('mensen', 1, 0.4), Di = q.on('dieren', 1, 0.4);
      fo4_haarLengte(ctx, 640, 360, 1.3, { soort: 'mens', len: 1000, schub: 1, merg: q.on('merg', 1, 0.5) });
      zoom(ctx, 1440, 360, 200, 860, 330, 'VERGROOT', q.on('schubjes', 1, 0.4) * (1 - Me), () => { fo4_haarLengte(ctx, 1440, 360, 4.2, { soort: 'mens', len: 900, merg: q.on('merg', 1, 0.5), seed: 3 }); });
      laag(ctx, q.on('schubjes', 1, 0.4) * (1 - Me), () => naamBij(ctx, 'schubjes', 'PLAT, OVERLAPPEND', 1700, 135, 1, 'center', C.goud));
      laag(ctx, q.on('merg', 1, 0.4) * (1 - Me), () => naamBij(ctx, 'merg', 'KANAALTJE', 1440, 650, 1, 'center', C.goud));
      laag(ctx, Me, () => { naamBij(ctx, 'mens', 'MERG SMAL, ONDERBROKEN OF AFWEZIG', 640, 500, 1, 'center'); fo4_haarDwars(ctx, 1440, 400, 90, { soort: 'mens', a: 1 - Di }); metaA(ctx, 'DWARSDOORSNEDE', 1440, 250, 1 - Di, C.grain, 'center', 28); });
      laag(ctx, Di, () => { fo4_haarLengte(ctx, 640, 680, 1.5, { soort: 'hond', len: 1000 }); naamBij(ctx, 'dier', 'MERG BREED EN REGELMATIG', 640, 830, 1, 'center'); fo4_haarDwars(ctx, 1440, 600, 100, { soort: 'hond', ovaal: 0.85 }); fo4_haarDwars(ctx, 1440, 330, 80, { soort: 'mens' }); metaText(ctx, 'DWARSDOORSNEDE', 1440, 200, C.grain, 'center', 28); }); });
    // C: haar 1 = hond, bewoner; haar 2 en 3 = mens
    laag(ctx, E * (1 - K), () => { micro(ctx); const M2 = q.on('mens', 2, 0.4);
      fo4_haarLengte(ctx, 600, 300, 1.4, { soort: 'hond', len: 900 }); naamBij(ctx, 'haar 1', 'MERG > 1/3', 600, 430, 1, 'center', C.goud);
      laag(ctx, q.on('hond', 1, 0.4), () => { hondenmand(ctx, 1450, 500, 1.4); naamBij(ctx, 'hondenmand', 'VAN DE BEWONER', 1380, 400, 1, 'center'); });
      laag(ctx, q.on('bewoner', 1, 0.3) * (1 - M2), () => { persoon(ctx, 'joost', 1740, GROND, 430, { t, kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Joost', 'BEWONER', 1740, 370, 1, 'center'); });
      laag(ctx, M2, () => { fo4_haarLengte(ctx, 600, 580, 1, { soort: 'mens', len: 900, seed: 6 }); fo4_haarLengte(ctx, 600, 740, 1, { soort: 'mens', len: 900, merg: 0, seed: 9 });
        naamBij(ctx, 'haar 2', 'MENS', 1180, 590, 1, 'left'); naamBij(ctx, 'haar 3', 'MENS', 1180, 750, 1, 'left'); }); });
    // D: vergelijkingshaar van de verdachte naast haar 2
    laag(ctx, K, () => { kim(ctx, 260, t, { kijk: 1, pose: q.on('Dikte', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Dr. Kim', 'ONDERZOEKER', 260, 380, 1, 'center');
      microVenster(ctx, 1020, 470, 340, 'VERGELIJKINGSMICROSCOOP', 1, () => { fo4_haarLengte(ctx, 1020, 390, 1.6, { soort: 'mens', len: 720, seed: 6 }); fo4_haarLengte(ctx, 1020, 560, 1.6, { soort: 'mens', len: 720, seed: 12, a: q.on('verdachte', 1, 0.4) });
        ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(1020, 140); ctx.lineTo(1020, 800); ctx.stroke(); ctx.setLineDash([]); });
      naamBij(ctx, 'haar 2', '', 1060, 310, 1, 'left'); naamBij(ctx, 'Erik', 'VERDACHTE', 1060, 660, q.on('verdachte', 1, 0.4), 'left');
      const Ch = [['dikte', 'Dikte'], ['kleur', 'kleur'], ['merg', 'merg']]; Ch.forEach(([n, w], i) => { const A = q.on(w, w === 'merg' ? 3 : 1, 0.3); if (A < 0.01) return; laag(ctx, A, () => { tag(ctx, n, 1560, 320 + i * 100, C.groen, 1, 'center', 34); vink_(ctx, 1700, 306 + i * 100, 16, 1); }); });
      laag(ctx, q.on('sterk', 1, 0.4) * (1 - Qv), () => tag(ctx, 'lijken sterk op elkaar', 1560, 640, C.goud, 1, 'center', 32));
      vraagteken(ctx, 1600, 700, Qv, 120); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const AW = () => antwoord(ctx, 'antwoord a: kan van hem zijn, ook van anderen', 1);
    const tF = q.at('onderzoek', 1) - 0.4, F = ramp(t, tF - 0.3, 0.5), tH = q.at('tweede', 1), Hh = ramp(t, tH - 0.4, 0.5), Qv = vraagA(t, q, 'Welk');
    laag(ctx, 1 - F, () => { microVenster(ctx, 960, 420, 190, '', 1 - q.on('uitsluiten', 1, 0.4), () => { fo4_haarLengte(ctx, 960, 370, 1, { soort: 'mens', len: 420, seed: 6 }); fo4_haarLengte(ctx, 960, 480, 1, { soort: 'mens', len: 420, seed: 12 }); });
      kaart(ctx, 260, 300, 620, 220, q.on('uitsluiten', 1, 0.4), C.groen); laag(ctx, q.on('uitsluiten', 1, 0.4), () => { text(ctx, 'uitsluiten', 570, 430, fTekst(60, 800), C.text, 'center'); vink_(ctx, 820, 410, 26, 1); });
      kaart(ctx, 1040, 300, 620, 220, q.on('aanwijzen', 1, 0.4), C.koraal); laag(ctx, q.on('aanwijzen', 1, 0.4), () => { text(ctx, 'aanwijzen', 1350, 430, fTekst(60, 800), C.text, 'center'); kruis(ctx, 1600, 410, 22, 1); });
      metaA(ctx, 'ONDER DE MICROSCOOP', 960, 260, q.on('microscoop', 1, 0.4), C.grain, 'center', 28); });
    laag(ctx, F * (1 - Hh), () => { infoKaart(ctx, 260, 230, 1400, 'FBI-LAB · 1996–2000', [['80 haren pasten onder de microscoop', q.on('pasten', 1, 0.3)], ['met DNA: 9 van iemand anders', q.on('DNA', 1, 0.3)]], 1, { lh: 66, px: 46, extraH: 260, bron: 'HOUCK & BUDOWLE 2002',
      teken: (x, y) => { for (let i = 0; i < 80; i++) { const c = i % 20, r = Math.floor(i / 20), iemand = [3, 11, 18, 26, 37, 44, 52, 63, 71].includes(i); const A = q.on('pasten', 1, 0.3 + i * 0.01); if (A < 0.01) continue;
        ctx.save(); ctx.globalAlpha *= A; roundRect(ctx, x + 40 + c * 64, y + 20 + r * 56, 46, 42, 6); const k = iemand && q.on('DNA', 1, 0.3) > 0.5; shape(ctx, k ? rgba(C.koraal, 0.6) : '#5A6478', k ? C.koraal : '#8FA0B5', 2); ctx.restore(); } } }); });
    laag(ctx, Hh, () => { micro(ctx); metaText(ctx, 'DE WORTELS · VERGROOT', 160, 220, C.grain, 'left', 28);
      fo4_haarWortel(ctx, 380, 420, 1.6, { soort: 'groeiend', len: 900, kernen: 0 }); naamBij(ctx, 'haar 2', 'ERUIT GETROKKEN', 1360, 430, 1, 'left');
      laag(ctx, q.on('derde', 1, 0.4), () => { fo4_haarWortel(ctx, 380, 700, 1.6, { soort: 'uitgevallen', len: 900, kernen: 0 }); naamBij(ctx, 'haar 3', 'VANZELF UITGEVALLEN', 1360, 710, 1, 'left'); });
      vraagteken(ctx, 1700, 300, Qv, 110); laag(ctx, Qv, () => tag(ctx, 'DNA-profiel', 1560, 170, C.goud, 1, 'center', 32)); }); AW(); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const AW = () => antwoord(ctx, 'antwoord c: het haar dat nog groeide', 1);
    const tO = q.at('onderzoeker', 1), K = ramp(t, tO - 0.3, 0.25), Dn = q.on('lukt', 1, 0.4);
    laag(ctx, 1 - K, () => { micro(ctx); const Kn = clamp((t - q.at('cellen', 1)) / 1.4, 0, 1), U = q.on('uitgevallen', 1, 0.4);
      const w2 = fo4_haarWortel(ctx, 260, 360, 1.3, { soort: 'groeiend', len: 760, kernen: Kn, hl: q.on('groeide', 1, 0.4) * (1 - U) });
      zoom(ctx, 1300, 330, 190, 260 + 100, 360, 'WORTEL · VERGROOT', q.on('cellen', 1, 0.4) * (1 - U), () => { fo4_haarWortel(ctx, 1150, 330, 3.4, { soort: 'groeiend', len: 600, kernen: Kn }); });
      laag(ctx, q.on('kern', 1, 0.4) * (1 - U), () => naamBij(ctx, 'cellen met een kern', '', 1300, 590, 1, 'center', C.kernL || '#A392D6'));
      laag(ctx, U, () => { fo4_haarWortel(ctx, 260, 660, 1.3, { soort: 'uitgevallen', len: 760, kernen: 1, hl: 1 - Dn });
        naamBij(ctx, 'knotsje', 'MEESTAL WEINIG KERNEN', 520, 790, q.on('knotsje', 1, 0.4), 'left');
        naamBij(ctx, 'haar 2', 'GROEIDE NOG', 1060, 330, 1, 'left'); naamBij(ctx, 'haar 3', 'UITGEVALLEN', 1060, 630, 1, 'left'); });
      laag(ctx, Dn, () => { pijl(ctx, 1380, 320, 1520, 320, C.goud, 1, 5, 18); tag(ctx, 'DNA-lab', 1650, 335, C.goud, 1, 'center', 34); tag(ctx, 'profiel vaak niet volledig', 1600, 640, C.koraal, 1, 'center', 30); }); });
    laag(ctx, K, () => { kim(ctx, 340, t, { kijk: 1, pose: 'wijs' }); bilal(ctx, 760, t, { kijk: -1, uit: 'neutraal', pose: q.on('Schrijf', 1) > 0.5 ? 'vasthouden' : 'staan' });
      naamBij(ctx, 'Dr. Kim', 'ONDERZOEKER', 340, 390, 1, 'center'); naamBij(ctx, 'Bilal', 'STAGIAIR', 760, 330, 1, 'center');
      fo4_rapport(ctx, 1160, 180, 640, { vul: [1, clamp((t - q.at('Schrijf', 1)) / 2, 0, 1), 0], hl: q.on('Schrijf', 1, 0.3) > 0.5 ? 1 : -1 });
      laag(ctx, q.on('spoor', 1, 0.4), () => tag(ctx, 'alleen wat het spoor laat zien', 560, 250, C.goud, 1, 'center', 32)); }); AW(); },

  // ---------- H3 Kiezelwieren ----------
  s13(ctx, t, q) { const tP = q.at('Uit', 1), P = ramp(t, tP - 0.3, 0.5), tF = q.at('forensisch', 1), Fp = ramp(t, tF - 0.4, 0.5), tK = q.at('algen', 1), Kz = ramp(t, tK - 0.3, 0.25), tL = q.at('longen', 1) - 0.4, L = ramp(t, tL - 0.3, 0.5), Qv = vraagA(t, q, 'zegt');
    bg(ctx, 'schema');
    laag(ctx, 1 - P, () => { dossierMap(ctx, 1220, 300, 1); fo4_verklaring(ctx, 160, 260, 760, 3, { regels: [], teken: 'kiezel' }); });
    laag(ctx, P * (1 - Fp), () => { decor(ctx, 'plas', 0.6); metaText(ctx, 'ANDERE ZAAK · DE PLAS', 160, 200, C.goud, 'left', 28);
      laag(ctx, q.on('Verdronk', 1, 0.4), () => { tag(ctx, 'verdronken?', 700, 820, C.teal, 1, 'center', 36); tag(ctx, 'al dood?', 1220, 820, C.koraal, q.on('dood', 1, 0.4), 'center', 36); }); });
    laag(ctx, Fp * (1 - Kz), () => { kim(ctx, 420, t, { kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'FORENSISCH PATHOLOOG · NFI', 420, 380, 1, 'center');
      infoKaart(ctx, 900, 330, 720, 'SECTIE IN HET NFI', [['zoekt: kiezelwieren', q.on('kiezelwieren', 1, 0.4)]], 1, { lh: 60, px: 42 }); });
    laag(ctx, Kz * (1 - L), () => { micro(ctx); metaText(ctx, 'KIEZELWIER · VERGROOT', 160, 220, C.grain, 'left', 28);
      fo4_kiezelwier(ctx, 620, 480, 3.4, { soort: 'boot', levend: 1, rot: -0.2 }); fo4_kiezelwier(ctx, 1000, 360, 1.8, { soort: 'schijf', levend: 1, a: q.on('cel', 1, 0.4) });
      naamBij(ctx, 'één cel', '', 620, 700, q.on('cel', 1, 0.4), 'center'); naamBij(ctx, 'schaaltje van kiezel', '', 620, 300, q.on('schaaltje', 1, 0.4), 'center', C.goud);
      fo4_schaal(ctx, 860, 640, 150, '10–100 MICROMETER', q.on('schaaltje', 1, 0.4));
      laag(ctx, q.on('water', 1, 0.4), () => { fo4_druppel(ctx, 1480, 480, 210, { t }); naamBij(ctx, 'bijna elk water', '', 1480, 790, 1, 'center', C.teal); }); });
    laag(ctx, L, () => { bg(ctx, 'schema'); laag(ctx, 1 - Qv, () => { fo4_monsterpot(ctx, 960, 700, 1.4, 'LONG', { inhoud: 'long', kiezel: 6, kiezelA: q.on('vindt', 1, 0.5) }); naamBij(ctx, 'kiezelwieren in de longen', '', 960, 800, q.on('vindt', 1, 0.4), 'center', C.teal); });
      laag(ctx, Qv, () => { fo4_monsterpot(ctx, 640, 680, 1.3, 'LONG', { inhoud: 'long', onder: 'VERDRONKEN' }); fo4_monsterpot(ctx, 1280, 680, 1.3, 'LONG', { inhoud: 'long', onder: 'NA DE DOOD\nIN HET WATER' }); vraagteken(ctx, 960, 560, 1, 120); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: niet genoeg', 1);
    const tW = q.at('verdrinkt', 1), B = ramp(t, tW - 0.4, 0.5), tH = q.at('brengt', 1) - 0.3, Bo = ramp(t, tH - 0.4, 0.5), tS = q.at('Stel', 1), St = ramp(t, tS + 0.2, 0.3), Qv = vraagA(t, q, 'zegt');
    laag(ctx, 1 - B, () => { const k = q.on('kiezelwieren', 1, 0.6); fo4_monsterpot(ctx, 640, 700, 1.3, 'LONG', { inhoud: 'long', kiezel: 6, kiezelA: k, onder: 'VERDRONKEN' }); fo4_monsterpot(ctx, 1280, 700, 1.3, 'LONG', { inhoud: 'long', kiezel: 6, kiezelA: k, onder: 'NA DE DOOD\nIN HET WATER' });
      laag(ctx, q.on('luchtwegen', 1, 0.4), () => tag(ctx, 'water loopt de luchtwegen in', 960, 300, C.teal, 1, 'center', 34)); });
    laag(ctx, B * (1 - Bo), () => { const u = clamp((t - q.at('door', 1)) / 2.2, 0, 1) * 0.5 + clamp((t - q.at('bloed', 1)) / 1.6, 0, 1) * 0.5;
      const Lb = fo4_longblaasje(ctx, 760, 500, 1.05, { u, scheur: q.on('wand', 1, 0.4), t }); metaText(ctx, 'LOS SCHEMA · NIET OP SCHAAL', 160, 220, C.text2, 'left', 28);
      laag(ctx, q.on('pompt', 1, 0.4), () => { kaart(ctx, 1220, 250, 600, 150, 1, C.koraal); metaText(ctx, 'HART POMPT NOG', 1250, 300, C.koraal, 'left', 28); metaText(ctx, '→ BLOED VOERT ZE MEE', 1250, 340, C.text, 'left', 28); metaText(ctx, 'VEREENVOUDIGD', 1250, 380, C.text2, 'left', 26); });
      naamBij(ctx, 'longblaasje', 'DUNNE WAND', 560, 820, q.on('longblaasjes', 1, 0.4), 'center'); naamBij(ctx, 'bloed', 'HAARVAT', Lb.haarvat[0] + 60, Lb.haarvat[1] + 10, q.on('bloed', 1, 0.4), 'left', C.koraal); });
    laag(ctx, Bo * (1 - St), () => { const bx = 560, by = 470; fo4_bot(ctx, bx, by, 12, { kiezel: q.on('beenmerg', 1, 0.6) }); metaText(ctx, 'BOT IN DOORSNEDE · LOS SCHEMA', 160, 220, C.text2, 'left', 28);
      naamBij(ctx, 'beenmerg', 'ZIT DICHT', bx + 130, by - 140, q.on('dicht', 1, 0.4), 'left');
      zoom(ctx, 1380, 440, 230, bx, by - 150, 'BEENMERG · VERGROOT', q.on('beenmerg', 1, 0.4), () => { ctx.fillStyle = '#7A2A26'; ctx.fillRect(1150, 210, 460, 460); for (let i = 0; i < 26; i++) { ctx.fillStyle = rgba('#E6DCC6', 0.5); ctx.beginPath(); ctx.ellipse(1150 + hash(i * 3) * 460, 210 + hash(i * 3 + 1) * 460, 22 + hash(i) * 30, 8, hash(i + 4) * 3, 0, 6.283); ctx.fill(); }
        for (let i = 0; i < 18; i++) circ(ctx, 1160 + hash(i * 7) * 440, 220 + hash(i * 7 + 2) * 440, 9, '#C2453E', '#E07A6A', 1); fo4_kiezelwier(ctx, 1330, 400, 1.1, { soort: 'boot', rot: 0.6 }); fo4_kiezelwier(ctx, 1450, 520, 0.9, { soort: 'schijf' }); });
      laag(ctx, q.on('organen', 1, 0.4) * (1 - q.on('beenmerg', 1, 0.4)), () => tag(ctx, 'organen die dicht zitten', 1380, 300, C.goud, 1, 'center', 32)); });
    laag(ctx, St, () => { fo4_glaasje(ctx, 960, 480, 2.2, { inhoud: 'leeg', lab: '', hl: q.on('geen', 1, 0.4) }); naamBij(ctx, 'beenmerg: 0', 'STEL', 960, 680, q.on('geen', 1, 0.4), 'center', C.goud); vraagteken(ctx, 1500, 520, Qv, 120); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const AW = () => antwoord(ctx, 'antwoord c: weinig, ze ontbreken soms', 1);
    const tV = q.at('vinden', 1), V = ramp(t, tV - 0.4, 0.5), tG = q.at('betrouwbare', 1) - 0.3, G = ramp(t, tG - 0.3, 0.5), tD = q.at('Deskundigen', 1), D = ramp(t, tD - 0.3, 0.5), tH = q.at('Hier', 1), Hi = ramp(t, tH - 0.3, 0.5), tW = q.at('weegt', 1), Wg = ramp(t, tW - 0.3, 0.5);
    // waarom leeg weinig zegt, en waarom vinden ook niet zeker is
    laag(ctx, 1 - G, () => { fo4_glaasje(ctx, 400, 380, 1.9, { inhoud: 'leeg', lab: 'BEENMERG: 0', a: 1 - V });
      const r = (y, s2, a, kl) => laag(ctx, a, () => { kaart(ctx, 760, y, 1000, 110, 1, kl); text(ctx, s2, 800, y + 72, fTekst(42, 800), C.text, 'left'); });
      r(260, 'weinig water nodig om te verdrinken', q.on('nodig', 1, 0.4), C.teal); r(400, 'het hart kan snel stoppen', q.on('stoppen', 1, 0.4), C.koraal);
      laag(ctx, V, () => { fo4_glaasje(ctx, 400, 640, 1.9, { inhoud: 'kiezel', lab: 'BEENMERG' }); });
      r(560, 'ook bij leven binnen, bijv. bij zwemmen', q.on('leven', 1, 0.4), C.goud); });
    laag(ctx, G * (1 - D), () => { const g = q.on('betrouwbare', 1, 0.4); laag(ctx, g, () => { // schaal zonder grens
        metaText(ctx, 'AANTAL KIEZELWIEREN', 260, 300, C.grain, 'left', 28); roundRect(ctx, 260, 330, 1000, 60, 30); shape(ctx, '#2A3446', C.line, 2);
        for (let i = 0; i < 9; i++) circ(ctx, 300 + i * 115, 360, 10, i < 5 ? C.teal : C.koraal);
        stippel(ctx, 760, 300, 760, 430, C.goud, 1, 3); text(ctx, '?', 760, 500, fTitel(90), C.goud, 'center'); tag(ctx, 'geen betrouwbare grens', 760, 600, C.goud, 1, 'center', 34); });
      infoKaart(ctx, 1080, 640, 760, 'OVERZICHT 2025 · 17 STUDIES', [['bewijswaarde onzeker', q.on('onzeker', 1, 0.4)]], q.on('overzicht', 1, 0.4), { lh: 56, px: 42, bron: 'TYR E.A. 2025' }); });
    laag(ctx, D * (1 - Hi), () => { tag(ctx, 'deskundigen zijn het oneens', 960, 260, C.goud, 1, 'center', 36);
      laag(ctx, ramp(t, tD + 0.5, 0.4), () => { kaart(ctx, 260, 360, 620, 300, 1, C.line); metaText(ctx, 'SOMMIGE LANDEN', 290, 410, C.text2, 'left', 28); text(ctx, 'bijna niemand', 290, 500, fTekst(52, 800), C.text, 'left'); text(ctx, 'gebruikt de test', 290, 570, fTekst(40, 700), C.text2, 'left'); });
      laag(ctx, ramp(t, tD + 1.0, 0.4), () => { kaart(ctx, 1040, 360, 620, 300, 1, C.line); metaText(ctx, 'JAPAN', 1070, 410, C.text2, 'left', 28); text(ctx, 'veel artsen', 1070, 500, fTekst(52, 800), C.text, 'left'); text(ctx, 'gebruiken hem juist', 1070, 570, fTekst(40, 700), C.text2, 'left'); });
      metaA(ctx, 'YUKAWA E.A. 2012', 960, 720, q.on('Japan', 1, 0.4), C.text2, 'center', 26); });
    laag(ctx, Hi * (1 - Wg), () => { micro(ctx); fo4_glaasje(ctx, 520, 330, 1.6, { inhoud: 'kiezel', lab: 'BEENMERG' }); fo4_druppel(ctx, 1400, 420, 190, { t }); naamBij(ctx, 'water uit de plas', '', 1400, 700, 1, 'center', C.teal);
      laag(ctx, q.on('soorten', 1, 0.4), () => { [0, 1].forEach(i => { const x = 360 + i * 220; fo4_kiezelwier(ctx, x, 640, 1.3, { soort: i ? 'schijf' : 'boot', rot: 0.3 }); }); text(ctx, '=', 960, 470, fTitel(110), C.goud, 'center'); metaText(ctx, 'DEZELFDE SOORTEN', 960, 560, C.goud, 'center', 28); });
      laag(ctx, q.on('verdrinking', 1, 0.4), () => tag(ctx, 'past bij verdrinking', 960, 820, C.groen, 1, 'center', 36)); });
    laag(ctx, Wg, () => { const n = clamp((t - tW) / 0.7, 0, 1) + q.on('lichaam', 1, 0.5) + q.on('omstandigheden', 1, 0.5); weegHoop(ctx, 640, 760, ['kiezelwieren', 'onderzoek lichaam', 'omstandigheden'], n, 1);
      fo4_rapport(ctx, 1220, 160, 560, { vul: [1, 1, clamp((t - tW) / 2, 0, 1)], hl: 2, a: ramp(t, tW - 0.3, 0.4) }); }); AW(); },

  // ---------- H4 Wat het bewijs zegt ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); const tZ = q.at('Ze', 1), Z = ramp(t, tZ - 0.3, 0.25), Qv = vraagA(t, q, 'Tegen');
    laag(ctx, 1 - Z, () => { bureauBlad(ctx); zakjesRij(ctx, 1260, 600, 0.6, 1, { d: 220 }); kim(ctx, 330, t, { kijk: 1, pose: 'vasthouden', hold: (c, hx, hy) => document_(c, hx - 10, hy - 30, 0.9, C.text, 1) });
      naamBij(ctx, 'Dr. Kim', 'ONDERZOEKER', 330, 380, 1, 'center'); fo4_rapport(ctx, 640, 170, 400, { vul: [1, 1, 1] }); laag(ctx, q.on('rechtbank', 1, 0.4), () => tag(ctx, 'voor de rechtbank', 840, 120, C.goud, 1, 'center', 30)); });
    laag(ctx, Z, () => { filmKaartje(ctx, 1320, 120, 'Hoe zeker is een match?', q.on('DNA', 1, 0.4));
      balans(ctx, 960, 330, 1, { a: 1, tilt: 0, titel: 'HET STUIFMEEL', aT: q.on('stuifmeel', 1, 0.4),
        L: { naam: 'in de achtertuin', sub: 'VERHAAL 1', aN: q.on('achtertuin', 1, 0.4) }, R: Qv > 0.01 ? { naam: '?', sub: 'VERHAAL 2', aN: Qv } : null });
      fo4_korrel(ctx, 960, 270, 26, 'insect', { kleef: 0.6, a: q.on('stuifmeel', 1, 0.4) });
      laag(ctx, q.on('verhalen', 1, 0.4) * (1 - q.on('achtertuin', 1, 0.4)), () => tag(ctx, 'twee verhalen', 960, 820, C.goud, 1, 'center', 34)); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: alleen bij de voordeur', 1);
    const tO = q.at('Over', 1), O = ramp(t, tO - 0.4, 0.5), tF = q.at('2015', 1), F = ramp(t, tF - 0.4, 0.5), tS = q.at('stille', 1), Sg = ramp(t, tS - 0.3, 0.25);
    laag(ctx, 1 - O, () => { const tilt = 0.22 * ramp(t, q.at('beter', 1) - 0.3, 1.0), h1 = fase(t, q.at('Hoe', 1) - 0.2, q.at('hoe', 2) - 0.2, 0.3), h2 = fase(t, q.at('hoe', 2) - 0.3, q.at('Het', 1) + 0.1, 0.3), th = -tilt * 0.3, ex = Math.cos(th) * 340, ey = Math.sin(th) * 340;
      balans(ctx, 760, 330, 1, { tilt, titel: 'HET STUIFMEEL', L: { naam: 'in de achtertuin', sub: 'VERHAAL 1' }, R: { naam: 'alleen bij de voordeur', sub: 'ZIJN EIGEN VERHAAL', aN: q.on('vergelijkt', 1, 0.4) } });
      fo4_korrel(ctx, 760, 270, 26, 'insect', { kleef: 0.6 });
      laag(ctx, h1, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(760 - ex, 330 - ey + 200, 125, 52, 0, 0, 6.283); ctx.stroke(); });
      laag(ctx, h2, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(760 + ex, 330 + ey + 200, 125, 52, 0, 0, 6.283); ctx.stroke(); });
      laag(ctx, q.on('beter', 1, 0.4), () => tag(ctx, 'past iets beter bij de achtertuin', 760, 800, C.goud, 1, 'center', 34));
      fo4_rapport(ctx, 1380, 180, 440, { vul: [1, 1, 1], hl: 0, a: q.on('schrijft', 1, 0.25) });
      laag(ctx, q.on('niet', 1, 0.4), () => tag(ctx, 'niet meer', 1600, 820, C.koraal, 1, 'center', 34)); });
    laag(ctx, O * (1 - F), () => { kaart(ctx, 360, 300, 1200, 300, 1, C.goud); metaText(ctx, 'OVER SCHULD', 410, 360, C.goud, 'left', 28); text(ctx, 'beslist de rechter', 410, 460, fTekst(64, 800), C.text, 'left');
      laag(ctx, q.on('andere', 1, 0.4), () => text(ctx, 'met al het andere bewijs', 410, 540, fTekst(40, 700), C.text2, 'left')); });
    laag(ctx, F * (1 - Sg), () => infoKaart(ctx, 260, 250, 1400, 'FBI 2015 · HAARONDERZOEK', [['minstens 9 van de 10 nagekeken', q.on('minstens', 1, 0.3)], ['getuigenissen met fouten', q.on('getuigenissen', 1, 0.3)]], 1, { lh: 66, px: 46, extraH: 140, bron: 'FBI · INNOCENCE PROJECT',
      teken: (x, y) => { for (let i = 0; i < 10; i++) { const A = q.on('minstens', 1, 0.3 + i * 0.05); if (A < 0.01) continue; ctx.save(); ctx.globalAlpha *= A; roundRect(ctx, x + 40 + i * 120, y + 20, 90, 90, 10); const k = i < 9 && q.on('negen', 1, 0.3) > 0.5; shape(ctx, k ? rgba(C.koraal, 0.6) : '#5A6478', k ? C.koraal : '#8FA0B5', 2); ctx.restore(); } } }));
    laag(ctx, Sg, () => { bureauBlad(ctx); zakjesRij(ctx, 760, 600, 0.75, 1, { d: 300 }); bilal(ctx, 260, t, { kijk: 1, pose: 'denk', uit: 'neutraal' }); naamBij(ctx, 'Bilal', 'STAGIAIR', 260, 330, 1, 'center');
      laag(ctx, q.on('zien', 1, 0.4), () => tag(ctx, 'alleen wat hij kan laten zien', 1060, 250, C.goud, 1, 'center', 36)); }); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const tE = q.at('Elke', 1), R = ramp(t, tE - 0.4, 0.5);
    laag(ctx, 1 - R, () => { kaart(ctx, 260, 330, 1400, 220, 1, C.goud); text(ctx, 'Hoe kan stuifmeel op een schoen', 310, 420, fTekst(52, 800), C.text, 'left'); text(ctx, 'verraden waar iemand is geweest?', 310, 495, fTekst(52, 800), C.text, 'left'); });
    laag(ctx, R, () => { const h0 = fase(t, tE - 0.2, q.at('Onder', 1), 0.3), h1 = fase(t, q.at('Onder', 1) - 0.2, q.at('Kiezelwieren', 1), 0.3), h2 = fase(t, q.at('Kiezelwieren', 1) - 0.2, q.at('vak', 1), 0.3);
      const hl = h0 > 0.5 ? 0 : h1 > 0.5 ? 1 : h2 > 0.5 ? 2 : -1;
      fo4_rapport(ctx, 640, 120, 640, { vul: [1, 1, 1], hl });
      const vk = (x, y, nr, regels, teken, rot, h) => { const hh = fo4_verklaring(ctx, x, y, 440, nr, { regels, teken, rot, px: 26 }); if (h > 0.01) laag(ctx, h, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -10, -10, 460, hh + 20, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }); };
      vk(120, 200, 1, ['Ik zat op een schoen.'], 'korrel', -0.03, h0); vk(1360, 200, 2, ['Wij zijn drie haren.'], 'haar', 0.02, h1); vk(1360, 560, 3, [], 'kiezel', -0.02, h2);
      laag(ctx, h0, () => { metaText(ctx, 'ELKE PLEK EEN EIGEN MENGSEL', 340, 600, C.oker, 'center', 26); metaA(ctx, 'LAATSTE PLEK OVERHEERST', 340, 640, q.on('laatste', 1, 0.4), C.oker, 'center', 26); metaA(ctx, 'STEUNEN OF ONTKRACHTEN', 340, 680, q.on('steunen', 1, 0.4), C.oker, 'center', 26); });
      laag(ctx, q.on('vak', 1, 0.4), () => tag(ctx, 'precies opschrijven wat een spoor wel en niet zegt', 960, 840, C.goud, 1, 'center', 32)); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'OPLEIDINGEN · STAND 2026', 160, 200, C.goud, 'left', 28);
    opleiding(ctx, 160, 250, 1000, 'HBO · 4 JAAR · NUMERUS FIXUS', 'Forensisch Onderzoek', 'Enschede (Saxion) · Amsterdam (HvA)', q.on('hbo', 1, 0.4), C.teal);
    opleiding(ctx, 160, 450, 760, 'WO · BACHELOR · ENGELSTALIG', 'Biology', 'Nijmegen (Radboud) · 3 jaar', q.on('Engelstalige', 1, 0.4), C.groen);
    laag(ctx, q.on('master', 1, 0.4), () => { pijl(ctx, 940, 525, 1010, 525, C.line, 1, 4, 16); opleiding(ctx, 1030, 450, 760, 'WO · MASTER', 'Forensic Science', 'Amsterdam (UvA) · 2 jaar', 1, C.groen); });
    laag(ctx, q.on('werkt', 1, 0.4), () => { metaText(ctx, 'WERKEN BIJ', 160, 700, C.text2, 'left', 28); tag(ctx, 'NFI', 260, 790, C.goud, q.on('NFI', 1, 0.4), 'center', 40); tag(ctx, 'politie', 470, 790, C.goud, q.on('politie', 1, 0.4), 'center', 40); });
    bilal(ctx, 1640, t, { kijk: -1, uit: 'blij', a: 1 - ramp(t, q.at('Of', 2) - 0.2, 0.25) }); }
});
