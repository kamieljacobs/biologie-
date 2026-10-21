// Wat word jij? · Fysiotherapie 3 · Trainen: hoe je lichaam zich aanpast — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Noor, Bilal, Fysiotherapeut Femke).
// Rode draad: tien weken trainen van Noor en Bilal.

Object.assign(SCENES, {
  title(ctx, t) { superLijn(ctx, 1060, 420, 780, 460, 'op', Math.min(1, 0.2 + t * 0.12), 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const T = q.on('Tien', 1, 0.8), B = q.on('Bilal', 1, 0.8);
    ctx.fillStyle = '#2F3E5C'; ctx.fillRect(0, 760, W, 120);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const x = 700 + 60 * Math.sin(t * 0.6);
      persoon(ctx, 'noor', x, 860, 500, { t, outfit: 'sport', pose: 'staan', uit: T > 0.5 ? 'blij' : 'neutraal' });
      tag(ctx, '2 km · buiten adem', 1300, 300, C.koraal, q.on('twee', 1) * (1 - T), 'center', 32); tag(ctx, '10 weken later: 5 km, rustig', 1300, 300, C.groen, T, 'center', 32);
      kalenderW(ctx, 1150, 400, 10, Math.round(10 * T), q.on('weken', 1)); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'noor', 560, 860, 470, { t, outfit: 'sport', uit: 'blij' }); persoon(ctx, 'bilal', 1260, 860, 500, { t, outfit: 'sport', uit: 'lacht', pose: 'vasthouden' }); stang(ctx, 1260, 590, 520, 1);
      naamBij(ctx, 'Bilal', 'krachttraining', 1380, 280, B); naamBij(ctx, 'Noor', 'hardlopen', 640, 320, B); vraagteken(ctx, 900, 300, q.on('fitter', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const M = q.on('volgende', 1, 0.8);
    if (M < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - M; const u = clamp((t - q.at('Tijdens', 1)) / 9, 0, 1); superLijn(ctx, 240, 280, 1200, 440, 'een', u, 1);
      tag(ctx, 'training: brandstof op, kleine schade', 560, 820, C.koraal, q.on('schade', 1), 'center', 28); tag(ctx, 'rust: herstel, net iets meer', 1120, 260, C.groen, q.on('meer', 1), 'center', 28); regel(ctx, 'supercompensatie', 1460, 520, q.on('supercompensatie', 1), C.goud, 44, 'left', 700); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; const rij = (i, mod, w0, lab, col) => { const a = q.on(w0, 1); if (a < 0.01) return; superLijn(ctx, 520, 200 + i * 220, 1200, 200, mod, clamp((t - q.at(w0, 1)) / 3, 0, 1), a, col); regel(ctx, lab, 160, 320 + i * 220, a, col, 34, 'left', 700); };
      rij(0, 'op', 'hoogtepunt', 'op tijd', C.groen); rij(1, 'vroeg', 'snel', 'te snel', C.koraal); rij(2, 'laat', 'lang', 'te laat', C.oker);
      metaA(ctx, '▲ = TRAINING', 1500, 180, q.on('hoogtepunt', 1)); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const Hh = q.on('hart', 1, 0.8);
    if (Hh < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Hh; verwijs(ctx, 'Alles op adem', 960, 140, q.on('adem', 1)); const u = clamp((t - q.at('duurtraining', 1)) / 3, 0, 1), hv = clamp((t - q.at('haarvaten', 1)) / 2, 0, 1);
      vezelRond(ctx, 560, 520, 210, 6, 4, q.on('mitochondriën', 1), t); naamBij(ctx, 'spiervezel', 'doorsnede · eerst', 560, 270, q.on('mitochondriën', 1), 'center');
      vezelRond(ctx, 1320, 520, 210, Math.round(6 + 5 * u), Math.round(4 + 4 * hv), q.on('duurtraining', 1), t); naamBij(ctx, 'spiervezel', 'na een paar weken', 1320, 270, q.on('duurtraining', 1), 'center');
      tag(ctx, 'meer mitochondriën', 1320, 800, C.mito, q.on('procenten', 1), 'center', 30); tag(ctx, 'meer haarvaten', 1700, 380, '#E06A5A', q.on('haarvaten', 1), 'center', 28); ctx.restore(); }
    if (Hh > 0.01) { ctx.save(); ctx.globalAlpha *= Hh; const bpm = q.on('vijfenzestig', 1) > 0.5 ? 65 : 70, sl = Math.max(0, Math.sin(t * bpm / 60 * 6.283)); hartje(ctx, 700, 480, 2.2, 1, sl);
      regel(ctx, String(bpm), 1150, 470, q.on('rust', 1), bpm === 65 ? C.groen : C.text, 110, 'left', 800); metaA(ctx, 'SLAGEN PER MINUUT IN RUST', 1150, 530, q.on('rust', 1));
      tag(ctx, 'evenveel zuurstof', 1300, 700, C.teal, q.on('evenveel', 1), 'center', 30); vraagteken(ctx, 1640, 420, q.on('Hoe', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const sl70 = Math.max(0, Math.sin(t * 70 / 60 * 6.283)), sl60 = Math.max(0, Math.sin(t * 65 / 60 * 6.283)), g = q.on('groter', 1);
    hartje(ctx, 500, 430, 1.6, 1, sl70, 1); hartje(ctx, 1200, 430, 1.6 + 0.15 * g, 1, sl60, 1 + 0.25 * g); naamBij(ctx, 'eerst', '70 slagen', 500, 230, 1, 'center'); naamBij(ctx, 'getraind', '65 slagen, sterker en iets groter', 1200, 210, 1, 'center');
    tag(ctx, 'slagvolume', 850, 610, C.goud, q.on('slagvolume', 1), 'center', 32); slagDruppels(ctx, 430, 640, 5, q.on('slagvolume', 1)); slagDruppels(ctx, 1110, 640, 6, q.on('slagvolume', 1));
    regel(ctx, 'bloed per minuut = slagvolume × hartslag', 960, 820, q.on('keer', 1), C.text, 40, 'center', 700); verwijs(ctx, 'Het hart onder controle', 1560, 740, q.on('controle', 1)); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 960, 860, 520, { t, outfit: 'sport', uit: 'lacht', pose: 'vasthouden' }); stang(ctx, 960, 580 - 20 * Math.abs(Math.sin(t)), 600, 1, q.on('meer', 1) > 0.5 ? 2 : 1);
    tag(ctx, 'na twee weken: flink meer', 960, 200, C.groen, q.on('weken', 1), 'center', 32); tag(ctx, 'spieren nog net zo dik', 1500, 450, C.oker, q.on('dik', 1), 'center', 30); vraagteken(ctx, 1500, 330, q.on('Hoe', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const D = q.on('Pas', 1, 0.8), aan = clamp((t - q.at('tegelijk', 1)) / 2, 0, 1);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; verwijs(ctx, 'Opnieuw leren bewegen', 420, 210, q.on('Opnieuw', 1));
      for (let i = 0; i < 4; i++) motorEenheid(ctx, 260, 330 + i * 130, 0.6, 8, q.on('neuron', 1), i < 1 + Math.round(3 * aan) ? 1 : 0, C.goud, t + i);
      regel(ctx, 'eerste weken: het zenuwstelsel leert', 1000, 380, q.on('weken', 1), C.goud, 40, 'left', 700); tag(ctx, 'meer eenheden tegelijk aan', 1300, 470, C.groen, q.on('tegelijk', 1), 'center', 30); tag(ctx, 'beter samenwerken', 1300, 550, C.groen, q.on('samen', 1), 'center', 30); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const dk = clamp((t - q.at('dikker', 1)) / 2.5, 0, 1); metaA(ctx, 'NA EEN PAAR WEKEN · GOED ZICHTBAAR NA 6–8 WEKEN', 160, 220, 1);
      vezelLang(ctx, 200, 420, 1400, dk, 1); naamBij(ctx, 'spiervezel', 'dikker', 900, 300 - 30 * dk, 1, 'center'); naamBij(ctx, 'meer draden actine en myosine', '', 900, 600 + 40 * dk, q.on('actine', 1), 'center');
      tag(ctx, 'nauwelijks nieuwe spiercellen', 560, 760, C.oker, q.on('nauwelijks', 1), 'center', 28); tag(ctx, 'eiwit + slaap', 1300, 760, C.teal, q.on('eiwit', 1), 'center', 30); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('omkeerbaar', 1, 0.6), BW = q.on('Bewegingswetenschappers', 1, 0.8), KP = q.on('krachtplaat', 1, 0.6), PL = q.on('plakkers', 1, 0.6), CA = q.on('camera', 1, 0.6);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; zwembad(ctx); persoon(ctx, 'noor', 400, 590, 340, { t, outfit: 'sport', uit: 'verbaasd', pose: 'schouders' }); tag(ctx, 'na vier banen kapot', 400, 200, C.koraal, q.on('banen', 1), 'center', 32);
      regel(ctx, 'specifiek', 820, 300, q.on('specifiek', 1), C.goud, 52, 'left', 700); tag(ctx, 'benen getraind', 1500, 330, C.groen, q.on('beenspieren', 1), 'center', 28); tag(ctx, 'armen en schouders niet', 1500, 410, C.koraal, q.on('armen', 1), 'center', 28); ctx.restore(); }
    if (O * (1 - BW) > 0.01) { ctx.save(); ctx.globalAlpha *= O * (1 - BW); regel(ctx, 'omkeerbaar', 160, 260, 1, C.goud, 52, 'left', 700); kalenderW(ctx, 300, 360, 3, 3, q.on('drie', 1), C.koraal, 'drie weken stil');
      balk(ctx, 900, 420, 800, 1 - 0.25 * q.on('verdwenen', 1, 1.5), C.groen, 'conditie', q.on('drie', 1)); tag(ctx, 'deel van de winst weg', 1300, 560, C.koraal, q.on('verdwenen', 1), 'center', 30); ctx.restore(); }
    if (BW * (1 - KP) > 0.01) { ctx.save(); ctx.globalAlpha *= BW * (1 - KP); loopband(ctx, 900, 820, 700, 1, t); persoon(ctx, 'noor', 850, 820, 470, { t, outfit: 'sport', uit: 'neutraal' }); const M = lijfMaat('noor', 850, 820, 470);
      ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(850, M.top + M.hh * 0.75); ctx.quadraticCurveTo(1100, M.top, 1180, 440); ctx.stroke(); circ(ctx, 850, M.top + M.hh * 0.72, M.hh * 0.22, rgba('#3A3F4E', 0.9), '#8A93A6', 3);
      regel(ctx, 'maximale zuurstofopname', 1240, 360, q.on('maximaal', 1), C.teal, 38, 'left', 700); metaA(ctx, 'INSPANNINGSTEST MET MASKER', 1240, 410, q.on('masker', 1)); ctx.restore(); }
    if (KP * (1 - PL) > 0.01) { ctx.save(); ctx.globalAlpha *= KP * (1 - PL); krachtPlaat(ctx, 520, 820, 520, 1); const sp = clamp((t - q.at('sprong', 1)) / 1.4, 0, 1), lift = Math.sin(clamp(sp, 0, 1) * Math.PI) * 140;
      persoon(ctx, 'bilal', 520, 820 - lift, 440, { t, outfit: 'sport', uit: 'lacht', pose: lift > 30 ? 'wijsOmhoog' : 'staan' }); naamBij(ctx, 'krachtplaat', '', 520, 870 - 20, KP, 'center');
      krachtGrafiek(ctx, 1000, 280, 760, 420, clamp((t - q.at('landen', 1)) / 2, 0, 1), 1); tag(ctx, '3–5 × je lichaamsgewicht', 1400, 760, C.goud, q.on('lichaamsgewicht', 1), 'center', 30); ctx.restore(); }
    if (PL * (1 - CA) > 0.01) { ctx.save(); ctx.globalAlpha *= PL * (1 - CA); ctx.beginPath(); ctx.ellipse(700, 520, 400, 160, 0, 0, 6.283); shape(ctx, '#E3B998', '#B88A68', 3); ctx.beginPath(); ctx.ellipse(700, 540, 340, 100, 0, 0, 6.283); shape(ctx, rgba(BR.spier, 0.55), '#8A3A34', 2); for (const dx of [-80, 80]) { circ(ctx, 700 + dx, 390, 26, '#D8DEE4', '#8A93A6', 3); ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(700 + dx, 366); ctx.quadraticCurveTo(900, 300, 1060, 340); ctx.stroke(); }
      golf(ctx, 1080, 360, 700, 120, 1, { freq: 8, t, col: C.goud, schaal: 1 }); metaA(ctx, 'SPIERACTIVITEIT', 1080, 250, 1); naamBij(ctx, 'plakkers op de huid', '', 700, 720, 1, 'center'); ctx.restore(); }
    if (CA > 0.01) { ctx.save(); ctx.globalAlpha *= CA; stokSkelet(ctx, 960, 780, 1.4, t, 1); camera(ctx, 300, 260, 1.4, 1, 1); camera(ctx, 1620, 260, 1.4, 1, -1); camera(ctx, 300, 700, 1.2, 1, 1); camera(ctx, 1620, 700, 1.2, 1, -1); tag(ctx, 'reflecterende stipjes', 960, 180, C.text, q.on('stipjes', 1), 'center', 30); naamBij(ctx, 'bewegend skelet', '', 1260, 400, q.on('skelet', 1)); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body, col) => card(ctx, 120 + i * 430, 280, 400, 230, tit, body, q.on(w0, 1), col);
    persoon(ctx, 'noor', 760, 860, 340, { t, outfit: 'sport', uit: 'blij' }); persoon(ctx, 'bilal', 1160, 860, 350, { t, outfit: 'sport', uit: 'lacht' }); regel(ctx, 'in de rust', 120, 220, q.on('rust', 1), C.goud, 48, 'left', 700);
    kaart(0, 'mitochondriën', 'mitochondriën', 'meer, en meer haarvaten', C.mito); kaart(1, 'hart', 'hart', 'groter slagvolume', '#E06A5A'); kaart(2, 'zenuwen', 'zenuwen', 'meer eenheden tegelijk', C.goud); kaart(3, 'spiervezels', 'spiervezels', 'dikker', C.groen); },

  s13(ctx, t, q) { bg(ctx, 'schema'); stokSkelet(ctx, 1450, 780, 1.1, t, q.on('Bewegingswetenschappen', 1)); persoon(ctx, 'femke', 560, 860, 480, { t, outfit: 'werk', uit: 'blij', a: q.on('fysiotherapeut', 1, 0.3) });
    tag(ctx, 'bewegingswetenschappen: universiteit', 1300, 200, C.paars, q.on('universiteit', 1), 'center', 30); tag(ctx, 'bijvoorbeeld Amsterdam of Groningen', 1300, 270, C.text2, q.on('Amsterdam', 1), 'center', 26);
    tag(ctx, 'bewegen · leren bewegen · trainen', 1300, 860 - 20, C.teal, q.on('onderzoekt', 1), 'center', 26); naamBij(ctx, 'Femke', 'fysiotherapeut', 640, 330, q.on('fysiotherapeut', 1)); tag(ctx, 'stap voor stap opbouwen', 560, 230, C.groen, q.on('bouwen', 1), 'center', 28); },
});

// weken als blokjes
function kalenderW(ctx, x, y, n, k, a = 1, col = C.groen, lab = 'weken') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x + (i % 5) * 64, y + Math.floor(i / 5) * 64, 52, 52, 8); shape(ctx, i < k ? col : '#3A4458', C.line, 1.5); } metaText(ctx, lab.toUpperCase(), x, y - 16, C.grain, 'left', 22); ctx.restore(); }
