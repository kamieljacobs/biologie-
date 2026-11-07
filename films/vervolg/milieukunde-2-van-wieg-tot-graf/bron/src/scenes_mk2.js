// Wat word jij? · Milieukunde 2 · Van wieg tot graf — scènes per alinea (v1.0, 2 nov 2026).
// Look: Schema met cast (Thijs, stagiair, outfit 'stage'; Milieukundige Iris, outfit 'kantoor'). Geen decor: het kantoor van
// de omgevingsdienst staat op navy zoals in mk1. In beeld geen echte gemeente, winkel of merk.
// Kleuren (keuring ronde 4): klimaat koraal, stikstof oker, land groen, water teal; goud = focus; plastic lichtgrijs, papier kraft.

function thijs(ctx, x, t, o = {}) { return persoon(ctx, 'thijs', x, GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'stage', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function iris(ctx, x, t, o = {}) { return persoon(ctx, 'iris', x, GROND, o.h || 445, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: 'kantoor', a: o.a == null ? 1 : o.a, hold: o.hold }); }
const MK2_PS = 2.6 / MK2_CM; // tas op persoonsschaal (Thijs 430 px ≈ 1,65 m)
// vier vakken: vaste plek
const VK = { x: 120, y: 190, w: 1680, h: 600 };
function vakken(ctx, o = {}) { const { x = VK.x, y = VK.y, w = VK.w, h = VK.h, a = [1, 1, 1, 1], staaf = [1, 1, 1, 1], maal = [1, 1, 1, 1], hl = -1 } = o; const gap = 28, vw = (w - 3 * gap) / 4;
  for (let i = 0; i < 4; i++) mk2_vak(ctx, x + i * (vw + gap), y, vw, h, i, { a: a[i], staaf: staaf[i], maal: maal[i], hl: hl === i ? 1 : 0 }); }
// vinkje boven de winnaar in vak i ('p' = plastic, 'q' = papier)
function vakVink(ctx, i, wie, a, o = {}) { if (a <= 0.01) return; const G = mk2_vakGeo(o.x || VK.x, o.y || VK.y, o.w || VK.w, o.h || VK.h, i); const bx = wie === 'p' ? G.bp : G.bq, hh = wie === 'p' ? G.hp : G.hq; vink_(ctx, bx, G.g0 - Math.max(5, hh) - 40, 20, a, C.groen); }
// kleine telefoon voor 'de gemeente belt'
function telefoon(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 18) * 0.04);
  roundRect(ctx, -60, -110, 120, 220, 18); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, -50, -96, 100, 180, 8); shape(ctx, '#3E7A52', null);
  circ(ctx, 0, -30, 26, '#F2F2EE'); ctx.strokeStyle = '#3E7A52'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -30, 13, 0.6, 2.6); ctx.stroke(); roundRect(ctx, -36, 36, 72, 26, 13); shape(ctx, '#7FC48F', null); ctx.restore(); }
// cijferkaart 'één cijfer' (leeg vakje)
function cijferVak(ctx, x, y, a = 1, kruisA = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 90, 180, 150, 14); shape(ctx, '#F2EEE4', '#9AA3B2', 2);
  text(ctx, '?', x, y + 30, fTitel(96), '#2A3446', 'center'); metaText(ctx, 'ÉÉN CIJFER', x, y + 104, C.text2, 'center', 28); ctx.restore(); if (kruisA > 0.01) kruis(ctx, x, y - 15, 70, kruisA, C.koraal); }
// katoenplant (stengel met bolsters en witte pluizen) — eenvoudig, alleen in H3
function katoenPlant(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#6A5A3A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-6, -90, 4, -180); ctx.moveTo(-2, -70); ctx.lineTo(-50, -120); ctx.moveTo(2, -110); ctx.lineTo(52, -150); ctx.stroke();
  [[-50, -120], [52, -150], [4, -180]].forEach(([bx, by]) => { [-1, 0, 1].forEach(k => mk2_bol(ctx, bx + k * 13, by - 6 + Math.abs(k) * 4, 15, '#F4F0E6', '#C9C0AE', 1.5)); ctx.fillStyle = '#7A5A3A'; ctx.beginPath(); ctx.moveTo(bx - 20, by + 6); ctx.lineTo(bx, by + 22); ctx.lineTo(bx + 20, by + 6); ctx.closePath(); ctx.fill(); });
  ctx.fillStyle = '#5FA86E'; [[-30, -40, -0.6], [30, -60, 0.6]].forEach(([lx, ly, r]) => { ctx.save(); ctx.translate(lx, ly); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 26, 13, 0, 0, 6.283); ctx.fill(); ctx.restore(); }); ctx.restore(); }
// kast (zijaanzicht) met een tas erin
function kast(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 360, 300, 360, 8); shape(ctx, '#5A4A3A', '#8A7458', 2); roundRect(ctx, x - 134, y - 344, 268, 328, 4); shape(ctx, '#2E2620', null);
  ctx.fillStyle = '#8A7458'; ctx.fillRect(x - 134, y - 190, 268, 8); mk2_katoenTas(ctx, x - 10, y - 26, 0.42, {}); ctx.fillStyle = '#6A5644'; ctx.beginPath(); ctx.moveTo(x + 150, y - 360); ctx.lineTo(x + 250, y - 330); ctx.lineTo(x + 250, y - 20); ctx.lineTo(x + 150, y); ctx.closePath(); ctx.fill(); ctx.restore(); }
// balkje 'milieulast per keer' (H3 en recap)
function lastBalk(ctx, x, yb, w, h, kl, a = 1, lab = '') { if (a <= 0.01 || h < 1) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, yb - h, w, h, Math.min(8, h / 2)); shape(ctx, rgba(kl, 0.6), kl, 2.5); if (lab) text(ctx, lab, x, yb + 44, fTekst(36, 800), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { lijn(ctx, [[1250, 760], [1830, 760]], C.line, 2); mk2_papierTasje(ctx, 1420, 760, 1.25, {}); mk2_plasticTasje(ctx, 1680, 760, 0.85, {});
    metaText(ctx, 'WIEG', 1250, 810, C.text2, 'left', 28); metaText(ctx, 'GRAF', 1830, 810, C.text2, 'right', 28); stippel(ctx, 1360, 800, 1720, 800, C.line, 0.7, 2); },

  // ---------- Cold open: kantoor op navy ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const P2 = ramp(t, q.at('Papieren', 2) - 0.5, 0.5);
    laag(ctx, 1 - P2, () => { metaText(ctx, 'OMGEVINGSDIENST · KANTOOR', 160, 220, C.text2, 'left', 28);
      mk2_bureau(ctx, 620, 650, 440); const dicht = q.on('tasje', 1, 0.6); mk2_papierTasje(ctx, 800, 650, 0.55, { open: 1 - dicht, lunch: 1 });
      thijs(ctx, 460, t, { kijk: 1, uit: 'blij', pose: dicht < 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Thijs', 'STAGIAIR', 460, 372, 1, 'center');
      const Gd = q.on('Goed', 1, 0.4) * (1 - q.on('gemeente', 1, 0.4)); laag(ctx, Gd, () => { wolk(ctx, 560, 190, 210, 120, '', 1); ctx.save(); ctx.translate(665, 250); ctx.rotate(-0.5); ctx.beginPath(); ctx.moveTo(0, 34); ctx.quadraticCurveTo(-30, 0, 0, -36); ctx.quadraticCurveTo(30, 0, 0, 34); ctx.fillStyle = '#5FA86E'; ctx.fill(); ctx.restore(); vink_(ctx, 720, 252, 16, 1, '#3E8A58'); });
      iris(ctx, 1180, t, { kijk: -1, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => mk2_plasticTasje(c, hx, hy - 4, MK2_PS, { hang: true, vol: 0.3 }) }); naamBij(ctx, 'Milieukundige Iris', 'OMGEVINGSDIENST', 1180, 362, 1, 'center');
      const Ge = q.on('gemeente', 1, 0.4), Po = q.on('poster', 1, 0.6);
      mk2_tablet(ctx, 1560, 430, 0.78, { a: Ge * (1 - 0.75 * Po) });
      laag(ctx, Po, () => mk2_poster(ctx, lerp(1652, 1580, ease(Po)), lerp(434, 480, ease(Po)), lerp(94, 250, ease(Po)), { rot: 0.02 })); });
    laag(ctx, P2, () => { kaart(ctx, 160, 240, 1120, 330, 1, C.goud); text(ctx, 'Papieren tasje of plastic tas:', 210, 350, fTekst(56, 800), C.text, 'left'); text(ctx, 'welke is beter voor het milieu?', 210, 430, fTekst(56, 800), C.text, 'left');
      metaText(ctx, 'VAN WIEG TOT GRAF', 210, 510, C.goud, 'left', 28); lijn(ctx, [[1380, 760], [1840, 760]], C.line, 2); mk2_papierTasje(ctx, 1490, 760, 1.0, {}); mk2_plasticTasje(ctx, 1720, 760, 0.95, {}); vraagteken(ctx, 1600, 330, 1, 120); }); },

  // ---------- H1 Van wieg tot graf ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const K = ramp(t, q.at('volgt', 1) - 0.7, 0.9), k = ease(K);
    // mensen en de strook die uitrolt
    laag(ctx, 1 - k, () => { const r = thijs(ctx, 280, t, { kijk: 1, uit: 'blij' }); if (r.hoofd) badge(ctx, r.hoofd.x + 10, r.hoofd.y + r.hoofd.r * 4.6, 1.2, 1);
      naamBij(ctx, 'Thijs', 'STAGIAIR', 280, 300, 1, 'center'); tag(ctx, 'SNUFFELSTAGE · OMGEVINGSDIENST', 360, 250, C.teal, 1, 'center', 28);
      iris(ctx, 1680, t, { kijk: -1, pose: q.on('rolt', 1) > 0.5 && q.on('uit', 1) < 0.5 ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Milieukundige Iris', '', 1680, 380, 1, 'center'); });
    const sx = lerp(450, 60, k), sy = lerp(330, 210, k), sw = lerp(1080, 1800, k), ss = lerp(0.6, 1, k);
    const u = clamp((t - q.at('rolt', 1)) / 2.6, 0, 1);
    const n0 = q.on('aardolie', 1, 0.5) + 2 * q.on('fabriek', 1, 0.8) + q.on('vervoer', 1, 0.5) + q.on('winkel', 1, 0.5) + q.on('afval', 1, 0.5);
    const n1 = q.on('papier', 2, 0.5) + 2 * q.on('fabriek', 1, 0.8) + q.on('vervoer', 1, 0.5) + q.on('winkel', 1, 0.5) + q.on('afval', 1, 0.5);
    const Ei = q.on('erin', 1, 0.5), Eu = q.on('eruit', 1, 0.5);
    const hl = q.on('welke', 1) > 0.5 ? [[0, 2], [3, 3], [5, 5]] : [];
    const G = mk2_strook(ctx, sx, sy, sw, { u, s: ss, t, kop: q.on('wieg', 1, 0.4), nRij: [n0, n1], hl, a: q.on('rolt', 1, 0.3),
      pijlA: (i, so, r) => Math.max(i === 0 && r === 0 ? (so === 'in' ? Ei : Eu) : 0, clamp((r ? n1 : n0) - i, 0, 1)) });
    // ERIN / ERUIT bij de eerste kolom
    laag(ctx, Ei * K, () => metaText(ctx, 'ERIN', G.kol[0] - 26, G.rij[0] - 150, '#8A6A2A', 'left', 28)); laag(ctx, Eu * K, () => metaText(ctx, 'ERUIT', G.kol[0] + 54, G.rij[0] + 58, '#B8462E', 'left', 28));
    // een stip volgt het tasje van wieg tot graf
    const tv = q.at('volgt', 1), uv = clamp((t - tv) / 2.4, 0, 1); laag(ctx, K * (uv > 0 && uv < 1 ? 1 : 0), () => { [0, 1].forEach(r => circ(ctx, lerp(G.kol[0] - 100, G.kol[5], ease(uv)), G.rij[r], 14, C.goud, '#8A6A2A', 2)); });
    laag(ctx, q.on('levenscyclusanalyse', 1, 0.5) * (1 - q.on('Wat', 1, 0.4)), () => termKaart(ctx, 560, 470, 800, 'levenscyclusanalyse', 'VAN WIEG TOT GRAF', 1));
    laag(ctx, q.on('vervoer', 1, 0.4) * K, () => metaText(ctx, 'CHINA → VK', G.kol[3] - 70, G.rij[0] + 54, MK2.inkt, 'center', 28));
    laag(ctx, q.on('aarde', 1, 0.4), () => filmKaartje(ctx, 160, 788, 'Eén aarde · een tasje is klein voor je voetafdruk', 1));
    laag(ctx, q.on('zoiets', 1, 0.4) * (1 - q.on('Plastic', 1, 0.4)), () => vraagteken(ctx, 1080, 860, 1, 80));
    laag(ctx, q.on('welke', 1, 0.4), () => { text(ctx, 'BROEIKASGAS?', 1740, 860, fTekst(36, 800), C.koraal, 'right'); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: bij de grondstof en het maken van de tas', 1);
    const B = ramp(t, q.at('papieren', 1) - 0.4, 0.6);
    laag(ctx, 1 - B, () => { const G = mk2_strook(ctx, 120, 190, 1680, { s: 0.6, t, kop: 1, hl: [[0, 2]], afval: ['stort', 'stort'] });
      const yb = 820, br = q.on('broeikasgas', 1, 1.2); lijn(ctx, [[120, yb], [1800, yb]], C.line, 2);
      metaText(ctx, 'BROEIKASGAS · SCHEMATISCH', 120, 556, C.koraal, 'left', 28); metaText(ctx, 'ENVIRONMENT AGENCY (VK) 2011', 1800, 556, C.text2, 'right', 28);
      lastBalk(ctx, (G.kol[0] + G.kol[2]) / 2, yb, G.kol[2] - G.kol[0] + 120, 190 * ease(br), C.koraal, 1); naamBij(ctx, 'grondstof en maken', '', (G.kol[0] + G.kol[2]) / 2, yb - 190 * ease(br) - 18, br, 'center', C.text);
      const kl = q.on('schip', 1, 0.5); [[3, 22], [4, 6], [5, 28]].forEach(([i, h]) => lastBalk(ctx, G.kol[i], yb, 110, h * ease(br), C.koraal, i === 3 ? 1 : 1 - 0.5 * kl));
      laag(ctx, kl, () => { roundRect(ctx, G.kol[3] - 120, 230, 240, 290, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); naamBij(ctx, 'per schip', 'CHINA → VK', G.kol[3], 740, 1, 'center'); }); });
    laag(ctx, B, () => { const W8 = q.on('woog', 1, 1.0); mk2_weegschaal(ctx, 960, 810, 1, { tilt: 0.13 * ease(W8), links: (c, px, py) => mk2_papierTas(c, px, py - 6, 0.42, {}), rechts: (c, px, py) => mk2_plasticTasje(c, px, py - 6, 0.36, { kreuk: 0.5 }) });
      text(ctx, '55 gram', 600, 850, fTekst(48, 800), C.text, 'center'); metaText(ctx, 'PAPIEREN TASJE', 600, 790, C.text2, 'center', 28);
      text(ctx, '8 gram', 1320, 850, fTekst(48, 800), C.text, 'center'); metaText(ctx, 'PLASTIC TASJE', 1320, 790, C.text2, 'center', 28);
      laag(ctx, q.on('zeven', 1, 0.4), () => tag(ctx, 'bijna 7×', 960, 430, C.goud, 1, 'center', 40));
      const ic = [['materiaal', 560, (x, y) => mk2_pulp(ctx, x, y, 1.1, { t })], ['hout', 960, (x, y) => mk2_bos(ctx, x, y, 0.95, {})], ['energie', 1360, (x, y) => mk2_fabriek(ctx, x, y, 0.95, { t })]];
      ic.forEach(([w, x, fn], i) => laag(ctx, q.on(w, 1, 0.4), () => { fn(x, 330); metaText(ctx, w.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, 372, C.oker, 'center', 28); })); }); },

  // ---------- H2 Appels met peren ----------
  s06(ctx, t, q) { bg(ctx, 'schema');
    const vis = [q.on('Broeikasgas', 1, 0.4), q.on('Stikstof', 1, 0.4), q.on('Land', 1, 0.4), q.on('water', 1, 0.4)];
    const M = q.on('Methaan', 1, 0.5) * (1 - q.on('rekenmethode', 1, 0.5)), R = q.on('rekenmethode', 1, 0.5) * (1 - q.on('papieren', 1, 0.5)), Bo = q.on('papieren', 1, 0.5) * (1 - q.on('Hoe', 1, 0.5)), Vq = q.on('Hoe', 1, 0.5);
    const dim = i => vis[i] * (1 - 0.65 * M * (i ? 1 : 0)) * (1 - 0.8 * R) * (1 - 0.85 * Bo) * (Vq > 0 && i < 2 ? 1 - 0.65 * Vq : 1);
    vakken(ctx, { a: [0, 1, 2, 3].map(dim), staaf: [0, 0, 0, 0], maal: [0, 0, 0, 0] });
    laag(ctx, Vq, () => { const G2 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 2), G3 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 3); [G2, G3].forEach(G => { roundRect(ctx, G.x, VK.y, G.w, VK.h, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }); vraagteken(ctx, G2.x + G2.w + 14, 178, 1, 90); });
    // methaan wordt CO₂ in het klimaatvak
    const G0 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 0), uM = clamp((t - q.at('Methaan', 1)) / (q.at('CO₂', 1) + 0.6 - q.at('Methaan', 1)), 0, 1);
    mk2_methaanNaarCO2(ctx, G0.x + G0.w / 2, 470, 0.85, uM, { a: M, t });
    // de rekenmethode: zo'n 18 milieueffecten
    laag(ctx, R, () => echtKaart(ctx, 460, 240, 1000, 'REKENMETHODE · RECIPE', [["zo'n 18 milieueffecten", q.on('achttien', 1)]], '', 1, { lh: 60, px: 44, extraH: 300,
      teken: (x, y) => { const kl = [C.koraal, C.oker, C.groen, C.teal]; for (let i = 0; i < 18; i++) { const cx = x + 60 + (i % 9) * 98, cy = y + 30 + Math.floor(i / 9) * 98, f = q.on('achttien', 1, 0.2 + i * 0.05);
          laag(ctx, f, () => { roundRect(ctx, cx, cy, 80, 80, 10); shape(ctx, i < 4 ? rgba(kl[i], 0.55) : '#2A3A58', i < 4 ? kl[i] : '#5A6A88', 2); }); }
        laag(ctx, q.on('Nijmegen', 1, 0.4), () => metaText(ctx, 'O.A. RIVM EN RADBOUD UNIVERSITEIT, NIJMEGEN', x + 60, y + 250, C.goud, 'left', 28)); } }));
    // papier komt uit hout, bomen groeien weer aan
    laag(ctx, Bo, () => { const tg = q.at('groeien', 1), gr = t < tg ? 1 : 0.15 + 0.85 * ease(clamp((t - tg) / 1.8, 0, 1)); const cut = t > tg - 0.25 && t < tg;
      mk2_bos(ctx, 700, 760, 2.6, { groei: cut ? 1 - (t - tg + 0.25) / 0.25 * 0.85 : gr }); lijn(ctx, [[340, 762], [1500, 762]], C.line, 2);
      laag(ctx, q.on('hout', 1, 0.4), () => pijl(ctx, 960, 620, 1150, 620, C.line, 1, 3, 14)); mk2_papierTasje(ctx, 1300, 760, 1.25, { a: q.on('tasje', 1, 0.4) });
      laag(ctx, q.on('groeien', 1, 0.4), () => { ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(700, 470, 70, -2.6, 1.6); ctx.stroke(); ctx.restore(); pijl(ctx, 700 + 70 * Math.cos(1.5), 470 + 70 * Math.sin(1.5), 700 + 70 * Math.cos(1.6) - 8, 470 + 70 * Math.sin(1.6), C.groen, 1, 4, 16); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: slechter: bos en fabriek vragen veel land en water', 1);
    const tn = q.at('nam', 1), Uit = ramp(t, tn - 0.7, 0.35), B = ramp(t, tn - 0.3, 0.4);
    laag(ctx, 1 - Uit, () => { metaText(ctx, 'NEDERLANDS ONDERZOEK · TNO 2015', 160, 240, C.text2, 'left', 28); lijn(ctx, [[460, 760], [1460, 760]], C.line, 2);
      laag(ctx, 1, () => { mk2_plasticTas(ctx, 720, 760, 0.95, {}); text(ctx, '30 gram', 720, 830, fTekst(48, 800), C.text, 'center'); naamBij(ctx, 'stevige plastic tas', '', 720, 440, 1, 'center', q.on('stevige', 1) > 0.5 ? C.goud : C.text); });
      laag(ctx, 1, () => { mk2_papierTas(ctx, 1200, 760, 0.95, {}); text(ctx, '51 gram', 1200, 830, fTekst(48, 800), C.text, 'center'); naamBij(ctx, 'papieren tas', '', 1200, 440, 1, 'center'); }); });
    laag(ctx, B, () => { const st = [q.on('klimaat', 1, 1.2), q.on('stikstof', 1, 1.2), q.on('land', 1, 1.2), q.on('water', 1, 1.2)];
      vakken(ctx, { staaf: st, maal: st.map(v => clamp(v * 2 - 1, 0, 1)) });
      metaText(ctx, 'TNO 2015 · MIDDELGROTE TAS · PLASTIC 30 G · PAPIER 51 G · 2 KG BOODSCHAPPEN', 120, 836, C.text2, 'left', 28); metaText(ctx, 'VEREENVOUDIGD · AFGEROND', 1800, 872, C.text2, 'right', 28); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const S = ease(q.on('gemeente', 1, 0.8)), w = lerp(VK.w, 1180, S), Wd = q.on('Wat', 1, 0.5);
    vakken(ctx, { w }); metaText(ctx, 'TNO 2015 · VEREENVOUDIGD', 120, 856, C.text2, 'left', 28);
    const P = q.on('plastic', 1, 0.4), Pa = q.on('papier', 1, 0.4); vakVink(ctx, 2, 'p', P, { w }); vakVink(ctx, 3, 'p', P, { w }); vakVink(ctx, 0, 'q', Pa, { w }); vakVink(ctx, 1, 'q', Pa, { w });
    laag(ctx, ramp(t, q.at('gemeente', 1) + 0.6, 0.4) * (1 - Wd), () => { telefoon(ctx, 1460, 420, 1, 1, t < q.at('belt', 1) + 1.2 ? t : 0); metaText(ctx, 'GEMEENTE', 1460, 580, C.text2, 'center', 28); laag(ctx, q.on('cijfer', 1, 0.4), () => cijferVak(ctx, 1680, 420, 1)); });
    laag(ctx, Wd, () => { mk2_weegschaal(ctx, 1570, 790, 0.78, { zoek: 1, t, links: (c, px, py) => mk2_eenheid(c, px, py, 'KG CO₂', C.koraal, 1, 48), rechts: (c, px, py) => mk2_eenheid(c, px, py, 'M² LAND', C.groen, 1, 48) }); vraagteken(ctx, 1570, 400, 1, 110); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ze zet ze naast elkaar, zonder optellen', 1);
    const tS = q.at('Schuif', 1), B = ramp(t, tS - 0.4, 0.5), tN = q.at('Volgens', 1), Cn = ramp(t, tN - 0.4, 0.5), tD = q.at('Dus', 1), D = ramp(t, tD - 0.3, 0.6);
    laag(ctx, 1 - B, () => { mk2_weegschaal(ctx, 960, 820, 1, { zoek: 1, t, links: (c, px, py) => mk2_eenheid(c, px, py, 'KG CO₂', C.koraal), rechts: (c, px, py) => mk2_eenheid(c, px, py, 'M² LAND', C.groen) });
      laag(ctx, q.on('geen', 1, 0.4), () => text(ctx, '≠', 960, 470, fTitel(110), C.goud, 'center'));
      laag(ctx, q.on('optelt', 1, 0.4), () => { text(ctx, 'KG CO₂  +  M² LAND  =  ?', 960, 300, fTekst(48, 800), C.text, 'center'); });
      laag(ctx, q.on('kiezen', 1, 0.4), () => metaText(ctx, 'EERST KIEZEN HOE ZWAAR ELK TELT', 960, 350, C.goud, 'center', 28)); });
    laag(ctx, B * (1 - Cn), () => { const tL = q.at('land', 2), tK = q.at('klimaat', 1); const v = t < tK - 0.3 ? lerp(0.5, 0.88, ease(clamp((t - tL + 0.2) / 0.9, 0, 1))) : lerp(0.88, 0.12, ease(clamp((t - tK + 0.3) / 1.1, 0, 1)));
      mk2_schuifje(ctx, 960, 400, 640, v, { label: 1 });
      laag(ctx, q.on('keuze', 1, 0.4), () => tag(ctx, 'een keuze', 1560, 400, C.goud, 1, 'center', 36)); });
    laag(ctx, Cn * (1 - D), () => { kaart(ctx, 300, 240, 1320, 220, 1, C.goud); metaText(ctx, 'ISO 14040 / 14044 · INTERNATIONALE NORM', 340, 296, C.goud, 'left', 28); text(ctx, 'wegen is een waardekeuze', 340, 390, fTekst(56, 800), C.text, 'left');
      laag(ctx, q.on('eindcijfer', 1, 0.4), () => { cijferVak(ctx, 760, 640, 1, q.on('niet', 1, 0.5)); laag(ctx, q.on('openlijke', 1, 0.4), () => { metaText(ctx, 'NIET IN EEN OPENLIJKE', 900, 620, C.koraal, 'left', 28); metaText(ctx, 'VERGELIJKING', 900, 660, C.koraal, 'left', 28); }); }); });
    laag(ctx, D, () => { vakken(ctx, { y: 220, h: 560 }); laag(ctx, q.on('naast', 1, 0.5), () => haak(ctx, 120, 1800, 790, '', C.groen, 1)); }); },

  // ---------- H3 Hoe vaak gebruik je hem? ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Ir = 1 - q.on('tweeëntachtig', 1, 0.4);
    laag(ctx, Ir, () => { iris(ctx, 1450, t, { kijk: -1, pose: q.on('eerlijk', 1) > 0.5 ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Milieukundige Iris', '', 1450, 380, 1, 'center'); });
    const Bo = q.on('boodschappen', 1, 1.4); mk2_boodschappen(ctx, 330, 740, 0.9, { n: Bo, a: Bo > 0 ? 1 : 0 });
    laag(ctx, q.on('boodschappen', 1, 0.5), () => { text(ctx, '483 dingen', 330, 820, fTekst(44, 800), C.text, 'center'); metaText(ctx, 'BRITS ONDERZOEK · 1 MAAND BOODSCHAPPEN', 120, 870, C.text2, 'left', 28); });
    const kP = 82 * clamp((t - q.at('tweeëntachtig', 1)) / 1.6, 0, 1), kQ = 65 * clamp((t - q.at('vijfenzestig', 1)) / 1.4, 0, 1);
    mk2_tasjesRaster(ctx, 740, 340, 82, 'plastic', { per: 10, gap: 44, h: 36, k: kP }); laag(ctx, kP > 0 ? 1 : 0, () => { text(ctx, '82 plastic tasjes', 940, 836, fTekst(40, 800), C.text, 'center'); });
    mk2_tasjesRaster(ctx, 1300, 340, 65, 'papier', { per: 10, gap: 44, h: 36, k: kQ }); laag(ctx, kQ > 0 ? 1 : 0, () => { text(ctx, '65 papieren', 1500, 836, fTekst(40, 800), C.text, 'center'); });
    // niet tas met tas
    laag(ctx, q.on('vergelijkt', 1, 0.4) * (1 - q.on('samen', 1, 0.4)), () => { kaart(ctx, 760, 110, 400, 150, 1); mk2_miniTas(ctx, 880, 236, 110, 'plastic'); mk2_miniTas(ctx, 1040, 236, 110, 'papier'); kruis(ctx, 960, 185, 46, q.on('niet', 1, 0.4)); });
    laag(ctx, q.on('samen', 1, 0.4) * (1 - q.on('heet', 1, 0.4)), () => { text(ctx, '=', 640, 560, fTitel(110), C.goud, 'center'); text(ctx, '=', 1250, 560, fTitel(110), C.goud, 'center'); });
    laag(ctx, q.on('functionele', 1, 0.4), () => termKaart(ctx, 660, 96, 860, 'functionele eenheid', 'EEN MAAND BOODSCHAPPEN NAAR HUIS', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const tK = q.at('katoenen', 1), K = ramp(t, tK - 0.5, 0.6);
    const tE = q.at('Elke', 1), nT = t < tE ? 0 : Math.min(4, Math.floor((t - tE) / 0.9) + 1); // turf gelijk met de balkjes
    let hp = null; const rT = thijs(ctx, 250, t, { kijk: 1, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => { hp = [hx, hy]; mk2_papierTasje(c, hx, hy - 4, MK2_PS, { hang: true, turf: nT }); } });
    naamBij(ctx, 'Thijs', 'STAGIAIR', 250, 372, 1 - K, 'center');
    laag(ctx, 1 - K, () => { if (hp) zoomCircle(ctx, 640, 470, 200, hp[0], hp[1] + 30, 'LUNCHTASJE · VERGROOT', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(420, 250, 440, 440); mk2_papierTasje(ctx, 640, 620, 1.0, { turf: nT }); });
      // milieulast per keer
      const yb = 760, L = 470; metaText(ctx, 'PAPIEREN TASJE · MILIEULAST PER KEER', 960, 230, C.text2, 'left', 28); lijn(ctx, [[940, yb], [1820, yb]], C.line, 2);
      for (let i = 0; i < 4; i++) { const ti = tE + i * 0.9, f = ease(clamp((t - ti) / 0.5, 0, 1)); if (f <= 0) continue; const x = 1010 + i * 170, hl = q.on('drie', 1) > 0.5 && i >= 2;
        lastBalk(ctx, x, yb, 120, L / (i + 1), C.koraal, f, '÷ ' + (i + 1)); if (hl) { roundRect(ctx, x - 72, yb - L / (i + 1) - 12, 144, L / (i + 1) + 12, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } }
      const Pl = q.on('plastic', 1, 0.5), yP = yb - L / 3.5; laag(ctx, Pl, () => { stippel(ctx, 940, yP, 1820, yP, '#C9CED6', 1, 3); metaText(ctx, 'PLASTIC TASJE · 1 ×', 1820, yP - 16, '#C9CED6', 'right', 28); });
      laag(ctx, q.on('klimaat', 1, 0.5), () => metaText(ctx, 'BRITS ONDERZOEK: 3 TOT 4 KEER · KLIMAAT', 940, 862, C.goud, 'left', 28)); });
    laag(ctx, K, () => { lijn(ctx, [[700, 780], [1300, 780]], C.line, 2); mk2_katoenTas(ctx, 960, 780, 1.05, {}); naamBij(ctx, 'katoenen tas', '', 960, 240, 1, 'center');
      laag(ctx, q.on('Hoe', 1, 0.4), () => { ['10', '25', '50+'].forEach((s2, i) => { const y = 380 + i * 150; roundRect(ctx, 1460, y - 60, 220, 100, 16); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); text(ctx, s2 + ' ×', 1570, y + 6, fTekst(48, 800), C.text, 'center'); }); vraagteken(ctx, 1760, 560, 1, 110); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vijftig keer of vaker', 1);
    lijn(ctx, [[160, 760], [700, 760]], C.line, 2); katoenPlant(ctx, 280, 760, 1.4, q.on('Katoen', 1, 0.4)); mk2_katoenTas(ctx, 560, 760, 0.62, {});
    laag(ctx, q.on('land', 1, 0.4), () => chip(ctx, 'land', 260, 300, C.groen, 1, 32)); laag(ctx, q.on('water', 1, 0.4), () => chip(ctx, 'water', 460, 300, C.teal, 1, 32));
    const t50 = q.at('vijftig', 1), t150 = q.at('honderdvijftig', 1); const n = t < t50 ? 0 : t < t150 ? 50 * ease(clamp((t - t50) / 0.6, 0, 1)) : 50 + 100 * ease(clamp((t - t150) / 1.6, 0, 1));
    metaA(ctx, 'KATOENEN TAS · KEER GEBRUIKT', 820, 250, q.on('Volgens', 1, 0.4), C.text2, 'left', 28);
    mk2_turf(ctx, 830, 300, n, { h: 50, gap: 14, kl: C.text, lw: 4, perRij: 50 });
    laag(ctx, n >= 49.5 ? 1 : 0, () => text(ctx, '50', 1700, 344, fTekst(44, 800), C.goud, 'left')); laag(ctx, n >= 149.5 ? 1 : 0, () => text(ctx, '150', 1700, 494, fTekst(44, 800), C.goud, 'left'));
    laag(ctx, q.on('Naties', 1, 0.4) * (1 - q.on('kast', 1, 0.4)), () => metaText(ctx, 'UNEP 2020 · KLIMAAT · 50 TOT 150 KEER', 830, 580, C.goud, 'left', 28));
    laag(ctx, q.on('dun', 1, 0.4), () => { mk2_plasticTasje(ctx, 900, 840, 0.62, {}); text(ctx, '1 ×', 1000, 760, fTekst(44, 800), C.text, 'left'); metaText(ctx, 'DUN PLASTIC TASJE', 1000, 800, C.text2, 'left', 28); });
    laag(ctx, q.on('kast', 1, 0.5), () => kast(ctx, 1500, 860)); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const D = ease(q.on('Denemarken', 1, 0.9)), V = q.on('Wat', 1, 0.4);
    mk2_rapport(ctx, lerp(700, 220, D), 210, 640, 'VK', 'ENVIRONMENT AGENCY · 2011', ['', '', ''], { n: 0, rot: -0.02, vraag: V });
    mk2_rapport(ctx, lerp(1980, 1060, D), 210, 640, 'DENEMARKEN', 'MILJØSTYRELSEN · 2018', ['', '', ''], { n: 0, rot: 0.02, vraag: V });
    const R = q.on('Daar', 1, 0.4); laag(ctx, R, () => { [[540, '3 tot 4 ×'], [1380, '1 ×']].forEach(([x, s2], i) => { mk2_miniTas(ctx, x - 110, 800, 70, 'papier'); text(ctx, '=', x - 40, 790, fTekst(48, 800), C.text, 'center'); mk2_miniTas(ctx, x + 30, 800, 70, 'plastic'); text(ctx, s2, x + 100, 790, fTekst(44, 800), i ? C.goud : C.text, 'left'); });
      metaText(ctx, 'PAPIER GELIJK MET PLASTIC · KLIMAAT', 960, 870, C.text2, 'center', 28); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ze vergelijkt de aannames van allebei', 1);
    const n1 = q.on('stort', 1, 0.5) + q.on('plastic', 1, 0.5) + q.on('papieren', 1, 0.5), n2 = q.on('verbrand', 1, 0.5) + q.on('plastic', 1, 0.5) + q.on('papieren', 1, 0.5);
    const hl = q.on('papieren', 1) > 0.5 ? 2 : q.on('plastic', 1) > 0.5 ? 1 : 0;
    mk2_rapport(ctx, 220, 200, 640, 'VK', 'ENVIRONMENT AGENCY · 2011', ['AFVAL: VOORAL STORTEN', 'PLASTIC TASJE 8 G', 'PAPIER 55 G'], { n: n1, hl, rot: -0.02 });
    mk2_rapport(ctx, 1060, 200, 640, 'DENEMARKEN', 'MILJØSTYRELSEN · 2018', ['VERBRANDEN · ENERGIE TELT MEE', 'PLASTIC TASJE 24 G', 'PAPIER 45 G'], { n: n2, hl, rot: 0.02 });
    laag(ctx, q.on('stort', 1, 0.4), () => { mk2_afval(ctx, 380, 790, 1.4, { soort: 'stort' }); naamBij(ctx, 'stort', '', 540, 776, 1, 'left'); }); laag(ctx, q.on('verbrand', 1, 0.4), () => { mk2_afval(ctx, 1240, 790, 1.4, { soort: 'verbranden', t }); naamBij(ctx, 'verbranding', '', 1360, 776, 1, 'left'); });
    laag(ctx, q.on('Geen', 1, 0.4), () => { vink_(ctx, 800, 760, 24, 1, C.groen); vink_(ctx, 1640, 760, 24, 1, C.groen); });
    laag(ctx, q.on('schreven', 1, 0.4), () => { metaText(ctx, 'ANDERE KEUZES · OPGESCHREVEN', 960, 836, C.goud, 'center', 28); });
    metaText(ctx, 'RICHTING · GEEN HERBEREKENING', 960, 872, C.text2, 'center', 28); },

  // ---------- H4 Van rekensom naar advies ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); mk2_bureau(ctx, 520, 650, 560);
    iris(ctx, 420, t, { kijk: 1, uit: 'neutraal', pose: 'staan' }); thijs(ctx, 1160, t, { kijk: -1, uit: 'neutraal', pose: 'denk' });
    mk2_adviesbrief(ctx, 800, 520, 230, { typ: clamp(t / 4, 0, 0.35), aannames: [] }); naamBij(ctx, 'Milieukundige Iris', '', 420, 362, 1, 'center');
    mk2_poster(ctx, 1560, 470, 280, { rot: 0.02 }); laag(ctx, q.on('Wat', 1, 0.4), () => vraagteken(ctx, 1760, 330, 1, 110)); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: geen winnaar: gebruik de tas die je hebt vaak', 1 - q.on('Onder', 1, 0.4));
    const ph = [q.at('Wat', 1), q.at('lunchtasje', 1), q.at('Volgens', 1), q.at('plastic', 1), q.at('Onder', 1), q.at('Wil', 1), q.at('bijna', 1) - 0.3, q.at('Spaanse', 1) - 0.4, q.at('besluit', 1)];
    const F = i => ramp(t, (i ? ph[i - 1] : -1) - 0.2, 0.3) * (1 - ramp(t, (ph[i] || 99) - 0.55, 0.3)); // eerst weg, dan de volgende (geen overlap)
    // 0: geen tas wint op alles
    laag(ctx, F(0), () => { vakken(ctx, { y: 220, h: 560 }); [[2, 'p'], [3, 'p'], [0, 'q'], [1, 'q']].forEach(([i, w]) => vakVink(ctx, i, w, 1, { y: 220, h: 560 })); });
    // 1: hoe vaak je hem gebruikt
    laag(ctx, F(1), () => { metaText(ctx, 'HOE VAAK GEBRUIK JE HEM?', 960, 260, C.goud, 'center', 28); [[560, 'plastic', 1], [960, 'tasje', 4], [1360, 'katoen', 50]].forEach(([x, so, n]) => { mk2_miniTas(ctx, x, 620, 200, so); mk2_turf(ctx, x - 140, 680, Math.min(n, 25) * clamp((t - ph[0]) / 1.2, 0, 1), { h: 36, gap: 11, perRij: 25, lw: 3 }); if (n > 25) text(ctx, '…', x + 160, 716, fTekst(40, 800), C.text, 'left'); }); });
    // 2: het lunchtasje op tien streepjes, met een scheurtje
    laag(ctx, F(2), () => { thijs(ctx, 360, t, { kijk: 1, uit: 'blij' }); naamBij(ctx, 'Thijs', 'STAGIAIR', 360, 372, 1, 'center'); lijn(ctx, [[700, 800], [1300, 800]], C.line, 2);
      const n = 4 + 6 * ease(clamp((t - q.at('tien', 1) + 0.6) / 1.2, 0, 1)); mk2_papierTasje(ctx, 1000, 800, 2.0, { turf: n, scheur: q.on('streepjes', 1, 0.6) }); metaText(ctx, 'LUNCHTASJE · VERGROOT', 1000, 856, C.text2, 'center', 28); });
    // 3: de beste tas is de tas die je al hebt
    laag(ctx, F(3), () => { lijn(ctx, [[420, 700], [1500, 700]], C.line, 2); mk2_katoenTas(ctx, 620, 700, 0.6, {}); mk2_papierTasje(ctx, 960, 700, 1.1, { turf: 10, scheur: 1 }); mk2_plasticTas(ctx, 1290, 700, 0.6, {});
      kaart(ctx, 460, 760, 1000, 110, 1, C.goud); text(ctx, 'de beste tas: die je al hebt', 500, 830, fTekst(44, 800), C.goud, 'left'); metaText(ctx, 'UNEP 2020', 1430, 830, C.text2, 'right', 28); });
    // 4: plastic tasje als vuilniszak
    laag(ctx, F(4), () => { const Vz = ease(clamp((t - q.at('boodschappen', 1)) / 1.4, 0, 1)); lijn(ctx, [[560, 820], [1400, 820]], C.line, 2);
      mk2_pedaalemmer(ctx, 1120, 820, 1.25, { deksel: Vz > 0.95 ? 0.9 : Math.min(0.9, Vz * 3), tasje: ramp(Vz, 0.8, 0.2) });
      laag(ctx, 1 - ramp(Vz, 0.8, 0.2), () => mk2_plasticTasje(ctx, lerp(760, 1120, Vz), lerp(820, 600, Math.sin(Vz * Math.PI) * 0.7) + Vz * -60, 0.95 * (1 - 0.25 * Vz), { vol: 0.6 * (1 - Vz) }));
      laag(ctx, ramp(Vz, 0.85, 0.15), () => naamBij(ctx, 'vuilniszak', '', 1300, 560, 1, 'left')); metaText(ctx, 'NA HET BOODSCHAPPEN', 960, 300, C.text2, 'center', 28); });
    // 5: aannames onder het advies
    laag(ctx, F(5), () => { mk2_bureau(ctx, 420, 650, 640); iris(ctx, 300, t, { kijk: 1, uit: 'neutraal', pose: 'wijs' }); naamBij(ctx, 'Milieukundige Iris', '', 300, 362, 1, 'center'); thijs(ctx, 1240, t, { kijk: -1, uit: 'neutraal', pose: 'staan' });
      const k = q.on('tassen', 1, 0.4) + q.on('studies', 1, 0.4) + q.on('afvalverwerking', 1, 0.4); mk2_adviesbrief(ctx, 760, 470, 500, { typ: Math.min((6 + k) / 9, clamp((t - ph[3]) / 1.4, 0, 1) * 6 / 9 + k / 9) }); });
    // 6: eerst laten nakijken
    laag(ctx, F(6), () => { mk2_poster(ctx, 620, 480, 330, { briefje: q.on('nagekeken', 1, 0.5), rot: -0.02 }); laag(ctx, q.on('norm', 1, 0.4), () => { kaart(ctx, 960, 330, 820, 240, 1, C.goud); metaText(ctx, 'ISO 14040', 1000, 390, C.goud, 'left', 28); text(ctx, 'vergelijking naar buiten', 1000, 460, fTekst(44, 800), C.text, 'left'); text(ctx, '→ kritische toets', 1000, 530, fTekst(44, 800), C.goud, 'left'); }); });
    // 7: zwerfafval in de berm
    laag(ctx, F(7), () => { const ub = clamp((t - q.at('berm', 1)) / 3.2, 0, 1); mk2_berm(ctx, 360, 680, 1200, { u: ub, t });
      kaart(ctx, 360, 240, 1200, 150, 1, C.koraal); text(ctx, 'zwerfafval', 400, 320, fTekst(52, 800), C.koraal, 'left'); metaText(ctx, 'ZIT IN DE MEESTE ANALYSES NIET · UNEP 2020', 400, 366, C.text, 'left', 28); });
    // 8: de Spaanse studie
    laag(ctx, F(8), () => { echtKaart(ctx, 160, 200, 1100, 'SPAANSE STUDIE MET ZWERFAFVAL', [['zwerfafval wel meegeteld', 1], ['andere volgorde', q.on('volgorde', 1)]], 'CIVANCIK-USLU E.A. 2019 · UPF', 1, { lh: 64, px: 44 });
      mk2_berm(ctx, 160, 740, 600, { u: 1, t });
      // volgorde: de andere tassen boven, het dunne plastic tasje onderaan
      laag(ctx, q.on('volgorde', 1, 0.5), () => { metaText(ctx, 'ZWERFAFVAL', 1640, 230, C.text2, 'center', 28); lijn(ctx, [[1440, 260], [1440, 830]], C.line, 2); metaText(ctx, 'MINDER', 1460, 290, C.text2, 'left', 28); metaText(ctx, 'MEER', 1460, 820, C.koraal, 'left', 28);
        mk2_miniTas(ctx, 1570, 420, 110, 'papier'); mk2_miniTas(ctx, 1740, 420, 110, 'katoen'); metaText(ctx, 'ANDERE TASSEN', 1660, 470, C.text2, 'center', 28); });
      laag(ctx, q.on('dunne', 1, 0.4), () => { mk2_plasticTasje(ctx, 1680, 780, 0.55, {}); laag(ctx, q.on('slechtst', 1, 0.4), () => naamBij(ctx, 'slechtst', 'DUN PLASTIC TASJE', 1680, 560, 1, 'center', C.koraal)); }); });
    // 9: het besluit
    laag(ctx, F(9), () => { iris(ctx, 340, t, { kijk: 1, uit: 'blij', pose: q.on('winnaar', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Milieukundige Iris', '', 340, 362, 1, 'center'); thijs(ctx, 620, t, { kijk: 1, uit: 'blij' });
      mk2_adviesbrief(ctx, 1240, 490, 420, { typ: 1, stempel: q.on('gemeente', 2, 0.8) }); }); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const tL = q.at('milieulast', 1), B = ramp(t, tL - 0.3, 0.5), tM = q.at('milieukundige', 1), Cm = ramp(t, tM - 0.3, 0.5);
    laag(ctx, 1 - B, () => { const p = [['milieueffect', 420], ['vaak', 960], ['afval', 1500]];
      laag(ctx, 0.4 + 0.6 * q.on('milieueffect', 1, 0.4), () => { ctx.save(); ctx.translate(120, 330); ctx.scale(0.5, 0.5); vakken(ctx, { x: 0, y: 0, w: 1680, h: 760 }); ctx.restore(); });
      laag(ctx, q.on('vaak', 1, 0.4), () => { mk2_papierTasje(ctx, 1150, 690, 1.3, { turf: 4 }); metaText(ctx, 'HOE VAAK', 1150, 760, C.text2, 'center', 28); });
      laag(ctx, q.on('afval', 1, 0.4), () => { mk2_afval(ctx, 1400, 690, 1.3, { soort: 'stort' }); mk2_afval(ctx, 1640, 690, 1.3, { soort: 'verbranden', t }); metaText(ctx, 'AANNAMES OVER AFVAL', 1560, 760, C.text2, 'center', 28); }); });
    laag(ctx, B * (1 - Cm), () => { mk2_papierTasje(ctx, 560, 760, 2.0, { turf: 10, scheur: q.on('heel', 1, 0.5) }); const yb = 760, L = 420; lijn(ctx, [[900, yb], [1800, yb]], C.line, 2);
      for (let i = 0; i < 5; i++) lastBalk(ctx, 980 + i * 180, yb, 110, L / (i + 1), C.koraal, q.on('kleiner', 1, 0.3 + i * 0.25)); metaText(ctx, 'MILIEULAST PER KEER', 900, 260, C.text2, 'left', 28);
      laag(ctx, q.on('beste', 1, 0.4), () => { kaart(ctx, 900, 140, 900, 90, 1, C.goud); text(ctx, 'de beste tas: die je al hebt', 930, 200, fTekst(40, 800), C.goud, 'left'); }); });
    laag(ctx, Cm, () => { thijs(ctx, 260, t, { kijk: 1, uit: 'blij' }); iris(ctx, 520, t, { kijk: 1, uit: 'blij', pose: 'wijs' });
      klembord(ctx, 760, 210, 1000, 'MILIEUKUNDIGE', [['van wieg tot graf volgen', q.on('volgt', 1), q.on('graf', 1, 0.4)], ['effecten naast elkaar', q.on('zet', 1), q.on('elkaar', 1, 0.4)], ['vergelijking eerlijk maken', q.on('maakt', 1), q.on('eerlijk', 1, 0.4)], ['aannames opschrijven', q.on('schrijft', 1), q.on('aannam', 1, 0.4)]], 1, { lh: 90, px: 44 }); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = [['hbo', 'Milieukunde · 4 jaar', 'HAS GREEN ACADEMY, DEN BOSCH · CIRCULAIRE ECONOMIE', 'hbo', C.groen], ['wo', 'Environmental Sciences · 3 jaar', 'WAGENINGEN · ENGELSTALIG', 'Wageningen', C.groen], ['onderzoek', 'Radboud Universiteit, Nijmegen', 'REKENMETHODES VOOR LEVENSCYCLUSANALYSES', 'Radboud', C.teal], ['werk', 'bijv. omgevingsdienst, adviesbureau, RIVM', '', 'rekenmethodes', C.goud]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 236 + i * 150;
      roundRect(ctx, 100, y, 1340, 130, 18); shape(ctx, rgba('#0D1420', 0.9), kl, 2); text(ctx, n, 140, y + 80, fTitel(i === 2 ? 38 : 46), kl); text(ctx, o, 360, y + 60, fTekst(42, 700), C.text); if (m) metaText(ctx, m, 360, y + 104, C.grain, 'left', 28); ctx.restore(); });
    thijs(ctx, 1600, t, { kijk: 1, uit: 'blij' }); iris(ctx, 1800, t, { kijk: -1, uit: 'blij' }); }
});
