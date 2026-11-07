// Wat word jij? · Forensisch onderzoek 3 · Hoe lang al dood? — scènes per alinea (v1.0, 25 okt 2026)
// Look: Schema met cast (Dr. Kim, forensisch arts, en Bilal, stagiair, outfit plaatsdelict; in het lab practicum), Micro alleen
// in H2 (myosinekop en actine, afbraak in de cel). De overledene is nooit te zien, ook niet als silhouet: de kamer, schema's,
// Kim en Bilal dragen het verhaal. Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

const ZL = { x0: 1290, dx: 160, y: 128, h: 132 };
function klokBord(ctx, t, fr, o = {}) { zandlopers(ctx, t, Object.assign({ fr, zicht: [1, 1, 1, o.vlieg == null ? 0 : o.vlieg] }, ZL, o)); }
function glucoseRing(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(C.oker, 0.45), C.oker, 2); ctx.restore(); }
function houdKopje(s = 0.62) { return (c, x, y) => kopje(c, x + 16, y + 6, s); }
// cyclus van een myosinekop met ATP (los → vastpakken → trekken → ATP maakt los); geeft {aan, slag, atp}
function kopFase(t, i) { const p = ((t * 0.42 + i * 0.23) % 1 + 1) % 1;
  if (p < 0.12) return { aan: 1 - p / 0.12, slag: 1, atp: 1 };
  if (p < 0.4) return { aan: 0, slag: 1 - (p - 0.12) / 0.28, atp: 1 - (p - 0.12) / 0.1 };
  if (p < 0.55) return { aan: (p - 0.4) / 0.15, slag: 0, atp: 0 };
  if (p < 0.88) return { aan: 1, slag: ease((p - 0.55) / 0.33), atp: 0 };
  return { aan: 1, slag: 1, atp: (p - 0.88) / 0.12 }; }

Object.assign(SCENES, {
  title(ctx, t) {
    zandloper(ctx, 1520, 500, 460, 0.55, { t, loopt: true });
    vlieg(ctx, 1690, 260, 0.62, { t, rot: 0.35 });
    metaA(ctx, 'de klok die blijft lopen', 1520, 800, 1, C.grain, 'center', 28);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const N = q.on('gevonden', 1, 0.5);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; gang(ctx, t);
      persoon(ctx, 'buurvrouw', 930, 800, 440, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, hold: houdKopje() });
      naamBij(ctx, 'Mevrouw Jansen', 'de buurvrouw', 930, 340, 1, 'center');
      kalender(ctx, 180, 230, 1, { w1: q.on('Twee', 1), w2: q.on('Vorige', 1), w3: 0 });
      naamBij(ctx, 'laatst gezien', 'twee weken geleden', 180, 610, q.on('laatst', 1), 'left', C.groen);
      naamBij(ctx, 'niet open', 'vorige zondag', 180, 690, q.on('open', 1), 'left', C.koraal);
      ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N;
      kamer(ctx, t, { hlVlieg: q.on('vlieg', 1), hlThermo: 0 });
      naamBij(ctx, 'lege leesstoel', '', 860, 440, 1, 'center');
      naamBij(ctx, '15 graden', '', 520, 590, 1, 'center');
      metaA(ctx, 'verwarming uit', 1520, 628, 1, C.grain, 'center', 24);
      const K = q.on('gevonden', 1, 0.4);
      persoon(ctx, 'kim', 220, 800, 440, { t, a: K, uit: 'neutraal', pose: 'staan', kijk: 1, outfit: 'plaatsdelict' });
      naamBij(ctx, 'Dr. Kim', 'forensisch arts', 220, 300, K, 'center');
      persoon(ctx, 'bilal', 1250, 800, 440, { t, a: K, uit: 'neutraal', pose: q.on('vlieg', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1, outfit: 'plaatsdelict' });
      naamBij(ctx, 'Bilal', 'stagiair', 1250, 290, K, 'center');
      vraagteken(ctx, 860, 250, q.on('Wanneer', 1), 120);
      ctx.restore(); } },

  // ---------- H1 de eerste uren ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vliegen leggen snel eitjes');
    const K = q.on('Kim', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K;
      vlieg(ctx, 560, 470, 1.5, { t, rot: 0.25 });
      naamBij(ctx, 'bromvlieg', 'vergroot', 560, 690, 1, 'center');
      eitjes(ctx, 1000, 520, 18, 46, { a: q.on('eitjes', 1) });
      naamBij(ctx, 'eitjes', 'binnen een paar uur', 1000, 650, q.on('eitjes', 1), 'center');
      const G = q.on('groeit', 1); const gr = clamp((t - q.at('groeit', 1)) / 3, 0, 1);
      made(ctx, 1450, 500, lerp(40, 220, ease(gr)), { a: G, t });
      naamBij(ctx, 'larve', 'groeit meetbaar', 1450, 650, G, 'center');
      ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      persoon(ctx, 'kim', 300, 800, 440, { t, uit: 'neutraal', pose: q.on('grenzen', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1, outfit: 'plaatsdelict' });
      naamBij(ctx, 'Dr. Kim', 'forensisch arts', 300, 300, 1, 'center');
      const T1 = q.on('tijdstip', 1) * (1 - q.on('grenzen', 1));
      tijdbalk(ctx, 620, 1460, 600, { pmi: q.on('postmortaal', 1), hlL: q.on('grenzen', 1), hlR: q.on('grenzen', 1) });
      if (T1 > 0.01) { circ(ctx, tijdbalkX(620, 1460, 7), 600, 16, rgba(C.text2, T1), null); kruis(ctx, tijdbalkX(620, 1460, 7), 530, 18, T1); }
      const B = q.on('bovengrens', 1, 0.4);
      persoon(ctx, 'buurvrouw', 1700, 800, 420, { t, a: B, uit: 'neutraal', pose: 'vasthouden', kijk: -1, hold: houdKopje(0.58) });
      naamBij(ctx, 'bovengrens', 'twee weken geleden leefde hij nog', 1460, 740, q.on('leefde', 1), 'right', C.goud);
      ctx.restore(); }
    zandlopers(ctx, t, Object.assign({ fr: [1, 1, 1, 0], zicht: [0, 1, 2].map(i => clamp((t - q.at('zandlopers', 1)) * 2 - i * 0.4, 0, 1)).concat([0]) }, ZL)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); klokBord(ctx, t, [1, 1, 1], { hl: 0, dimAnder: 1 });
    const S = q.on('stopt', 1, 1.2);
    celRond(ctx, 560, 500, 230, { t, a: 1 });
    // glucose gaat erin, warmte komt eruit (zolang de cel leeft)
    const G = q.on('glucose', 1) * (1 - S);
    for (let i = 0; i < 4; i++) { const u = ((t * 0.3 + i * 0.25) % 1); glucoseRing(ctx, lerp(150, 400, u), 360 + i * 60, 18, G * Math.sin(u * Math.PI)); }
    const Wm = (1 - S);
    for (let i = 0; i < 6; i++) { const an = -0.9 + i * 0.36, u = ((t * 0.4 + i * 0.17) % 1), r0 = 250 + u * 90; ctx.save(); ctx.globalAlpha *= Wm * Math.sin(u * Math.PI); pijl(ctx, 560 + Math.cos(an) * r0, 500 + Math.sin(an) * r0, 560 + Math.cos(an) * (r0 + 40), 500 + Math.sin(an) * (r0 + 40), C.koraal, 1, 5, 14); ctx.restore(); }
    naamBij(ctx, 'cel', 'verbrandt glucose', 560, 790, 1, 'center');
    regel(ctx, '37 graden', 960, 420, q.on('zevenendertig', 1) * (1 - S * 0.6), C.koraal, 56, 'left', 800);
    chip(ctx, 'na het overlijden: geen warmte meer bij', 1170, 520, C.text2, S, 30);
    const B = q.on('Bilal', 1, 0.3);
    persoon(ctx, 'bilal', 1620, 800, 440, { t, a: B, uit: 'neutraal', pose: 'denk', kijk: -1, outfit: 'plaatsdelict' });
    naamBij(ctx, 'Bilal', '', 1620, 300, B, 'center');
    vraagteken(ctx, 1300, 700, q.on('denk', 1), 120); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: eerst bijna niet, dan snel, daarna trager');
    const t0 = q.at('Eerst', 1), tD = q.at('daalt', 1), tT = q.at('trager', 1);
    const toon = t < tD ? lerp(0.003, 6 / 48, (t - t0) / Math.max(1, tD - t0)) : (t < tT ? lerp(6 / 48, 30 / 48, (t - tD) / Math.max(1, tT - tD)) : lerp(30 / 48, 1, (t - tT) / 3));
    afkoelGrafiek(ctx, 230, 300, 880, 440, { toon, kamerA: q.on('kamer', 1), plateau: q.on('plateau', 1), vuist: q.on('vuistregel', 1, 1.6), marge: q.on('marge', 1), stilA: q.on('dag', 1) });
    // kleding, tocht, koorts: dezelfde start, een andere curve
    const KL2 = q.on('Kleding', 1) * (1 - q.on('Henssge', 1) * 0.5);
    if (KL2 > 0.01) { ctx.save(); ctx.globalAlpha *= KL2 * 0.6; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([3, 9]);
      for (const B of [0.04, 0.11]) { ctx.beginPath(); for (let h = 0; h <= 48; h += 0.5) { const T = 15 + 22 * (1.4 * Math.exp(-B * h) - 0.4 * Math.exp(-3.5 * B * h)); const xx = 230 + h / 48 * 880, yy = 300 + 440 - (T - 10) / 30 * 440; h ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.restore(); chip(ctx, 'kleding · tocht · koorts', 760, 420, C.koraal, KL2, 28); }
    const tH = q.at('Henssge', 1), N = clamp((t - tH - 0.35) / 0.5, 0, 1); // eerst kern/huid weg, dan het kaartje (geen overlap)
    kernHuid(ctx, 1500, 560, 170, { a: 1 - clamp((t - tH) / 0.35, 0, 1), t, stroom: q.on('huid', 1) });
    nomogramKaart(ctx, 1270, 380, { a: N, rijen: clamp((t - q.at('Henssge', 1)) / 3, 0, 1), uit: q.on('marge', 1) });
    klokBord(ctx, t, [1 - toon, 1, 1], { hl: 0, dimAnder: 1 }); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    const tp = q.at('pompt', 1) + 0.6, loopT = Math.min(t, tp);
    const L = clamp((t - q.at('lijkvlekken', 1)) / 30, 0, 1);
    klokBord(ctx, t, [0, 1 - clamp((t - q.at('halve', 1)) / 6, 0, 1), 1], { hl: 1, dimAnder: 1 });
    hartIcoon(ctx, 230, 500, 1.6, { t, klopt: 1 - q.on('pompt', 1) });
    naamBij(ctx, 'hart', q.on('pompt', 1) > 0.5 ? 'pompt niet meer' : '', 230, 620, 1, 'center');
    const tw = q.at('wegdrukken', 1), th = q.at('halve', 1);
    const d1 = clamp((t - tw - 0.4) / 0.8, 0, 1) * (1 - clamp((t - tw - 3.2) / 0.8, 0, 1));
    const d2 = clamp((t - th - 0.4) / 0.8, 0, 1) * (1 - clamp((t - th - 6) / 0.8, 0, 1));
    const late = t > th;
    bloedvatLang(ctx, 480, 1500, 520, 110, t, { loopT, zak: q.on('zakt', 1, 2.2), uiteen: q.on('uiteen', 1, 1.6), druk: late ? d2 : d1, wegdruk: late ? 0 : 1, drukX: 820 });
    naamBij(ctx, 'bloedvat', 'doorsnede', 480, 360, 1, 'left');
    pijl(ctx, 1600, 400, 1600, 600, C.text2, q.on('zakt', 1), 5, 18); metaA(ctx, 'zwaartekracht', 1620, 510, q.on('zakt', 1), C.grain, 'left', 26);
    { const HV = q.on('halve', 1); // zodra de vlek vast is: label wisselt van 'halfuur' naar 'vast'
      naamBij(ctx, 'lijkvlek', 'na ongeveer een halfuur', 700, 700, q.on('halfuur', 1) * (1 - HV), 'left', C.text);
      naamBij(ctx, 'lijkvlek', 'vast: niet meer weg te drukken', 700, 700, HV, 'left', C.text); }
    chip(ctx, 'weg te drukken', 1260, 300, C.teal, q.on('wegdrukken', 1) * (1 - q.on('halve', 1)), 30);
    chip(ctx, 'na een halve dag: vast', 1260, 300, C.koraal, q.on('halve', 1), 30);
    naamBij(ctx, 'vaatwand kleurt', 'bloedcellen vallen uiteen', 1500, 780, q.on('vaatwand', 1), 'right', C.text); },

  s09(ctx, t, q) { bg(ctx, 'schema'); klokBord(ctx, t, [0, 0, 1 - 0.35 * clamp((t - q.at('stijf', 1)) / 10, 0, 1)], { hl: 2, dimAnder: 1 });
    spierBundel(ctx, 160, 400, 720, { n: 3, h: 34 });
    naamBij(ctx, 'spiervezels', '', 160, 320, 1, 'left');
    // stijfheid over de tijd (vorm uit Osmosis: begint na 2–4 uur, sterkst na 6–12 uur)
    const X = 180, Y = 560, Wd = 700, Hd = 200, px = hh => X + hh / 24 * Wd, py = v => Y + Hd - v * Hd;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X, Y + Hd); ctx.lineTo(X + Wd, Y + Hd); ctx.stroke();
    [0, 6, 12, 18, 24].forEach(hh => metaText(ctx, String(hh), px(hh), Y + Hd + 38, C.text2, 'center', 28)); metaText(ctx, 'uren', X + Wd, Y + Hd + 76, C.text2, 'right', 26); metaText(ctx, 'stijfheid', X, Y - 18, C.text2, 'left', 26);
    const st = hh => hh < 2 ? 0 : (hh < 6 ? ease((hh - 2) / 4) * 0.9 : (hh < 12 ? 0.9 + 0.1 * Math.sin((hh - 6) / 6 * Math.PI) : 0.9));
    const toonH = 24 * clamp((t - q.at('stijf', 1) + 1) / (q.at('sterkst', 1) - q.at('stijf', 1) + 2), 0, 1);
    if (toonH > 0.1) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); for (let hh = 0; hh <= toonH; hh += 0.2) { hh ? ctx.lineTo(px(hh), py(st(hh))) : ctx.moveTo(px(hh), py(st(hh))); } ctx.stroke(); }
    const S1 = q.on('stijf', 1), S2 = q.on('sterkst', 1);
    if (S1 > 0.01) { ctx.save(); ctx.globalAlpha *= S1; ctx.fillStyle = rgba(C.teal, 0.18); ctx.fillRect(px(2), Y, px(4) - px(2), Hd); metaA(ctx, '2–4 uur: stijf', px(4) + 8, Y + Hd - 16, 1, C.teal, 'left', 24); ctx.restore(); }
    if (S2 > 0.01) { ctx.save(); ctx.globalAlpha *= S2; ctx.fillStyle = rgba(C.goud, 0.16); ctx.fillRect(px(6), Y, px(12) - px(6), Hd); metaA(ctx, '6–12 uur: sterkst', px(6) + 8, Y + 78, 1, C.goud, 'left', 24); ctx.restore(); }
    // zoomcirkel naar een myosinekop aan het actine
    const Z = q.on('myosinekoppen', 1, 0.8);
    if (Z > 0.01) zoomCircle(ctx, 1420, 580, 240, 860, 400, 'myosine pakt actine', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1180, 340, 480, 480);
      const ks = [0, 1, 2].map(i => kopFase(t, i)); kopCloseUp(ctx, 1260, 610, 320, { t, koppen: ks.map(k => ({ aan: k.aan, slag: k.slag })), schuif: t * 18 * q.on('trekken', 1), namen: false });
      naamBij(ctx, 'actine', '', 1420, 452, 1, 'center'); naamBij(ctx, 'myosine', '', 1420, 742, 1, 'center'); });
    vraagteken(ctx, 1100, 270, q.on('denk', 1), 110); },

  // ---------- H2 afbraak (Micro) ----------
  s11(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord b: zonder ATP laten de koppen niet los');
    const tv = q.at('vastzitten', 1), V = clamp((t - tv) / 1.2, 0, 1), tz = q.at('zuurstof', 1);
    const koppen = [0, 1, 2, 3, 4].map(i => { const k = kopFase(Math.min(t, tv), i); return { aan: lerp(k.aan, 1, V), slag: lerp(k.slag, 0.8, V), atp: k.atp * (1 - V), vast: V }; });
    kopCloseUp(ctx, 420, 560, 1100, { t, koppen, schuif: Math.min(t, tv) * 22 });
    naamBij(ctx, 'myosinekop', '', 1545, 560, 1, 'left');
    naamBij(ctx, 'ATP', 'maakt de kop los', 1560, 330, q.on('ATP', 1) * (1 - V), 'left', C.koraal);
    // ATP-voorraad zakt leeg
    const vr = 1 - clamp((t - tz) / Math.max(1, tv - tz), 0, 1);
    ctx.save(); ctx.globalAlpha *= q.on('zuurstof', 1); roundRect(ctx, 120, 790, 440, 30, 10); shape(ctx, '#2A3446', C.line, 1.5); if (vr > 0.01) { roundRect(ctx, 120, 790, 440 * vr, 30, 10); shape(ctx, rgba(C.koraal, 0.75), C.koraal, 1.5); } metaText(ctx, 'ATP-voorraad', 120, 776, C.grain, 'left', 26); ctx.restore();
    chip(ctx, 'vast: de spier wordt stijf', 960, 230, C.koraal, q.on('stijf', 1), 32);
    chip(ctx, 'warmer: sneller stijf', 960, 300, C.oker, q.on('Warmte', 1), 28);
    chip(ctx, 'na een dag of twee weer slap', 1360, 820, C.text2, q.on('slap', 1), 28);
    metaA(ctx, 'vergroot · schematisch', 1800, 860, 1, C.text2, 'right', 26); },

  s12(ctx, t, q) { bg(ctx, 'micro');
    const P2 = q.on('spiervezel', 1, 0.9), P3 = q.on('bacteriën', 1, 1);
    // deel 1: de cel zonder ATP zwelt op, eigen enzymen knippen eiwitten
    if (P2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P2;
      const Z = q.on('zwelt', 1, 2.5), r = lerp(230, 285, Z);
      celRond(ctx, 620, 500, r, { t, eiwitten: [-0.4, 0.9, 2.2, 3.6, 5.0] });
      naamBij(ctx, 'pomp in het membraan', 'werkt op ATP', 620, r > 250 ? 160 : 210, q.on('pompen', 1), 'center');
      for (let i = 0; i < 10; i++) { const an = i * 0.63, u = ((t * 0.35 + i * 0.1) % 1); const rr = r + 120 - u * 140; ctx.save(); ctx.globalAlpha *= Z * Math.sin(u * Math.PI) * (1 - P2); circ(ctx, 620 + Math.cos(an) * rr, 500 + Math.sin(an) * rr, 7, rgba(C.teal, 0.85), lighten(C.teal, 0.4), 1); ctx.restore(); }
      metaA(ctx, 'water stroomt in', 620, 850, Z, C.teal, 'center', 26);
      const E = q.on('Eigen', 1);
      eiwitKeten(ctx, 1150, 470, 560, { a: E, knip: q.on('knippen', 1, 1.4), t });
      enzymKluwen(ctx, 1290, 380, 46, { a: E, an: 0.6, sluit: q.on('knippen', 1) });
      enzymKluwen(ctx, 1560, 560, 46, { a: E, an: 3.6, sluit: q.on('knippen', 1) });
      naamBij(ctx, 'eigen enzymen', 'knippen eiwitten', 1430, 680, E, 'center');
      ctx.restore(); }
    // deel 2: de eiwitten die de spiervezel bij elkaar houden worden geknipt (Z-schijf), actine en myosine blijven heel
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2 * (1 - 0.6 * P3);
      const kn = q.on('houvast', 1, 2.4);
      sarcomeren(ctx, 300, 500, 1320, 300, 3, { t, knip: kn });
      for (let k = 0; k < 4; k++) { const ex = 300 + k * 440, w = wander(k + 8, t, 10, 0.5); enzymKluwen(ctx, ex + (k % 2 ? 140 : 40) + w.x, 300 + (k % 2) * 400 + w.y, 34, { a: q.on('spiervezel', 1), an: (k % 2 ? 2 : -1.2), sluit: kn }); }
      naamBij(ctx, 'Z-schijf', 'houdt de vezel bij elkaar', 300, 700, 1 - kn * 0.5, 'left');
      chip(ctx, 'actine en myosine blijven heel', 960, 820, C.teal, q.on('Actine', 1), 30);
      chip(ctx, 'houvast weg: de spier laat los', 960, 230, C.koraal, q.on('houvast', 1), 30);
      metaA(ctx, 'vereenvoudigd', 1800, 860, 1, C.text2, 'right', 26);
      ctx.restore(); }
    regel(ctx, 'autolyse', 120, 160, q.on('autolyse', 1), C.goud, 52, 'left', 800);
    metaA(ctx, 'afbraak door eigen enzymen', 120, 210, q.on('autolyse', 1), C.grain, 'left', 26);
    if (P3 > 0.01) { for (let i = 0; i < 9; i++) { const w = wander(i + 20, t, 30, 0.35), u = clamp(P3 * 1.4 - i * 0.05, 0, 1); staafje(ctx, lerp(1900, 1100 + (i % 3) * 200, ease(u)) + w.x, 380 + Math.floor(i / 3) * 150 + w.y, 70, hash(i) * 6, C.teal, u); }
      naamBij(ctx, 'bacteriën', '', 1300, 860, P3, 'center'); }
    vraagteken(ctx, 1500, 260, q.on('denk', 1), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ze leefden al in de darm');
    const E = q.on('Enzymen', 1, 0.9);
    darmBuis(ctx, 140, 820, 470, 80, t, { a: 1 - E * 0.65 });
    naamBij(ctx, 'darm', 'ontelbaar veel bacteriën', 480, 620, 1 - E * 0.65, 'center');
    const V = q.on('verspreiden', 1);
    ctx.save(); ctx.globalAlpha *= (1 - E);
    bloedvat(ctx, [[820, 470], [960, 420], [1060, 360], [1150, 330]], 22, t, { a: V, n: 8, cel: 7, deeltjes: { n: 8, col: C.teal, rr: 7 } });
    bloedvat(ctx, [[820, 470], [960, 520], [1060, 600], [1150, 640]], 22, t + 3, { a: V, n: 8, cel: 7, deeltjes: { n: 8, col: C.teal, rr: 7 } });
    orgaanKaartje(ctx, 1270, 330, 'lever', { a: V, hl: V }); orgaanKaartje(ctx, 1270, 640, 'spieren', { a: V, hl: V });
    regel(ctx, 'verrotting', 1060, 830, q.on('verrotting', 1), C.goud, 52, 'center', 800);
    metaA(ctx, 'afbraak door bacteriën', 1060, 870, q.on('verrotting', 1) * 0, C.grain, 'center', 26);
    ctx.restore();
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E;
      enzymGrafiek(ctx, 1000, 380, 700, 340, { toon: clamp((t - q.at('Enzymen', 1)) / 2.5, 0, 1), stip15: q.on('warmer', 1), stip22: q.on('warmer', 1) });
      chip(ctx, 'warmer: sneller, tot een grens', 1350, 330 + 520, C.goud, q.on('grens', 1), 28);
      chip(ctx, 'grove schatting', 480, 760, C.text2, q.on('grove', 1), 30);
      ctx.restore(); }
    const lg = q.on('leeg', 1, 1.5);
    klokBord(ctx, t, [0, 0, lerp(0.65, 0, lg)], { vlieg: q.on('vlieg', 1), hl: q.on('vlieg', 1) > 0.5 ? 3 : -1, dimAnder: 1 }); },

  // ---------- H3 insecten als klok ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); klokBord(ctx, t, [0, 0, 0], { vlieg: 1, hl: 3, dimAnder: 1 });
    const cx = 760, cy = 530, R = 270;
    const ST = [{ an: -90, nm: 'vlieg', w: 'vrouwtje' }, { an: -30, nm: 'eitjes', w: 'eitjes' }, { an: 30, nm: 'larve 1', w: 'larve' }, { an: 90, nm: 'larve 2', w: 'vervelt' }, { an: 150, nm: 'larve 3', w: 'larvestadia' }, { an: 210, nm: 'pop', w: 'verpopt' }];
    const P = ST.map(s => [cx + Math.cos(s.an / 57.3) * R, cy + Math.sin(s.an / 57.3) * R]);
    const A = ST.map((s, i) => i === 0 ? 1 : q.on(s.w, 1, 0.6));
    // pijlen langs de cirkel
    for (let i = 0; i < 6; i++) { const f = i < 5 ? A[i + 1] : q.on('nieuwe', 1, 0.8); if (f < 0.01) continue; const a0 = (ST[i].an + 16) / 57.3, a1 = (ST[(i + 1) % 6].an - 16 + (i === 5 ? 360 : 0)) / 57.3;
      ctx.save(); ctx.globalAlpha *= f; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, a0, lerp(a0, a1, f)); ctx.stroke();
      const ae = lerp(a0, a1, f); pijl(ctx, cx + Math.cos(ae - 0.02) * R, cy + Math.sin(ae - 0.02) * R, cx + Math.cos(ae) * R, cy + Math.sin(ae) * R, C.line, 1, 3, 16); ctx.restore(); }
    vlieg(ctx, P[0][0], P[0][1], 0.62, { t, rot: 0.1, hl: q.on('nieuwe', 1) });
    eitjes(ctx, P[1][0], P[1][1], 14, 22, { a: A[1] });
    made(ctx, P[2][0], P[2][1], 26, { a: A[2], t });
    made(ctx, P[3][0], P[3][1], 66, { a: A[3], t: t + 1 });
    made(ctx, P[4][0], P[4][1], 130, { a: A[4], t: t + 2 });
    pop(ctx, P[5][0], P[5][1], 80, { a: A[5], oud: 0.5 });
    const lab = [[0, -100, 'center'], [70, 8, 'left'], [70, 8, 'left'], [0, 80, 'center'], [-96, 8, 'right'], [-70, 8, 'right']];
    ST.forEach((s, i) => naamBij(ctx, s.nm, i === 1 ? 'tientallen' : (i === 0 ? 'bromvlieg' : ''), P[i][0] + lab[i][0], P[i][1] + lab[i][1], A[i], lab[i][2]));
    metaA(ctx, 'vervelt', cx + Math.cos(60 / 57.3) * (R + 30) + 20, cy + Math.sin(60 / 57.3) * (R + 30) - 20, q.on('vervelt', 1), C.grain, 'left', 26);
    metaA(ctx, 'vervelt', cx + Math.cos(120 / 57.3) * (R + 30) - 20, cy + Math.sin(120 / 57.3) * (R + 30) - 20, q.on('vervelt', 1), C.grain, 'right', 26);
    chip(ctx, 'maden komen uit eitjes', cx, cy - 10, C.groen, q.on('Maden', 1), 30);
    chip(ctx, 'niet vanzelf', cx, cy + 60, C.koraal, q.on('vanzelf', 1), 28);
    chip(ctx, 'stopt met eten · kruipt weg', 1520, 520, C.text2, q.on('eten', 1), 28);
    chip(ctx, 'vaak binnen een paar uur', 1520, 420, C.goud, q.on('Bromvliegen', 1), 28);
    metaA(ctx, 'larven niet op schaal met de vlieg', 1800, 860, 1, C.text2, 'right', 26); },

  s16(ctx, t, q) { bg(ctx, 'schema'); klokBord(ctx, t, [0, 0, 0], { vlieg: 1, hl: 3, dimAnder: 1 });
    const L = q.on('lab', 1, 0.9);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; vloer(ctx);
      raam(ctx, 620, 230, 520, 360, { hlBank: q.on('vensterbank', 1) });
      for (let i = 0; i < 4; i++) made(ctx, 700 + i * 110, 612 - (i % 2) * 4, 84, { t: t + i, rot: (i % 2 ? 0.12 : -0.1), hl: q.on('derde', 1) });
      naamBij(ctx, 'larven, derde stadium', 'klaar met eten', 880, 700, q.on('larven', 1), 'center');
      persoon(ctx, 'bilal', 340, 800, 440, { t, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'plaatsdelict' });
      naamBij(ctx, 'Bilal', '', 340, 300, 1, 'center');
      ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L;
      ctx.fillStyle = rgba('#3A4458', 0.85); ctx.fillRect(100, 790, 1720, 16);
      persoon(ctx, 'bilal', 280, 800, 440, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, outfit: 'practicum', hold: (c, x, y) => potje(c, x + 20, y + 40, 0.75, { t }) });
      naamBij(ctx, 'Bilal', 'stagiair', 280, 300, 1, 'center');
      const E = q.on('entomoloog', 1, 0.3);
      persoon(ctx, 'lieke', 1620, 800, 430, { t, a: E, uit: 'neutraal', pose: q.on('lengte', 1) > 0.5 ? 'wijs' : 'staan', kijk: -1 });
      naamBij(ctx, 'Lieke', 'forensisch entomoloog', 1620, 330, E, 'center');
      const M = q.on('lengte', 1);
      liniaal(ctx, 700, 480, 20, 26, { a: M }); made(ctx, 700 + 7.5 * 26, 440, 15 * 26, { a: M, t, kruip: 0 }); // precies 0–15 mm op de liniaal, stil tijdens het meten
      metaA(ctx, '15 millimeter', 700 + 20 * 26, 560, M, C.grain, 'right', 26);
      const K = q.on('kweekt', 1), vt = clamp((t - q.at('vlieg', 1)) / 1.5, 0, 1);
      kweekbak(ctx, 960, 760, { a: K, pop: 1, vliegA: vt, t });
      naamBij(ctx, 'kweek: pop wordt vlieg', '', 1180, 700, K, 'left');
      chip(ctx, 'zo weet ze de soort', 700, 650, C.groen, q.on('soort', 1), 28);
      chip(ctx, 'hoe oud zijn de larven?', 960, 300, C.goud, q.on('oud', 1), 32);
      vraagteken(ctx, 1240, 430, q.on('denk', 1), 100);
      ctx.restore(); } },

  // ---------- H4 groeien met de temperatuur ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: op zijn minst zo lang geleden');
    const x0 = 300, x1 = 1620, y = 560;
    tijdbalk(ctx, x0, x1, y, {});
    // de leeftijd van de larven als balk vanaf vandaag
    const LA = q.on('leeftijd', 1);
    if (LA > 0.01) { ctx.save(); ctx.globalAlpha *= LA; const xb = tijdbalkX(x0, x1, 11) ; roundRect(ctx, x0, y - 140, (xb - x0) * ease(clamp(LA * 1.2, 0, 1)), 40, 10); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); regel(ctx, 'leeftijd van de larven', x0 + 20, y - 110, 1, C.text, 28, 'left', 700); ctx.restore(); }
    const OG = q.on('ondergrens', 1), xo = tijdbalkX(x0, x1, 11);
    if (OG > 0.01) { ctx.save(); ctx.globalAlpha *= OG; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xo, y - 90); ctx.lineTo(xo, y + 24); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'ondergrens', '', xo, y + 100, OG, 'center', C.goud);
    const MI = q.on('minstens', 1);
    if (MI > 0.01) { pijl(ctx, xo + 20, y + 150, tijdbalkX(x0, x1, 13.2), y + 150, C.goud, MI, 5, 18); metaA(ctx, 'minstens zo lang', tijdbalkX(x0, x1, 12.1), y + 196, MI, C.goud, 'center', 26); }
    // de vlieg kwam ná het overlijden, soms later
    vlieg(ctx, 340, 300, 0.5, { t, rot: 0.3, a: q.on('vlieg', 1) });
    metaA(ctx, 'de vlieg komt ná het overlijden', 410, 310, q.on('vlieg', 1), C.grain, 'left', 24);
    ['binnen', "'s nachts", 'dicht raam'].forEach((s2, i) => chip(ctx, s2, 1140 + i * 210, 310, C.text2, q.on(['Binnen', 'nachts', 'raam'][i], 1), 28));
    chip(ctx, 'soms pas later', 1350, 390, C.koraal, q.on('later', 1), 28); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const D = q.on('drempel', 1, 0.8);
    // deel 1: hoe warmer, hoe sneller de larve groeit
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D;
      const sc = clamp((t - q.at('warmer', 1)) / 4, 0, 1), T = lerp(12, 26, 0.5 + 0.5 * Math.sin(sc * 6.283 - 1.57));
      thermoKlein(ctx, 420, 480, 1.6, q.on('warmer', 1) > 0.01 ? T : 15, { hl: q.on('omgeving', 1) });
      naamBij(ctx, 'temperatuur', 'van de omgeving', 420, 750, 1, 'center');
      made(ctx, 1100, 480, lerp(120, 320, (T - 12) / 14), { t, kruip: 1 });
      naamBij(ctx, 'larve', 'warmer: groeit sneller', 1100, 640, q.on('sneller', 1), 'center');
      ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D;
      const K = q.on('kamer', 1, 0.6);
      // eerst twee voorbeeldstaafjes: onder de drempel telt niet, erboven telt het deel boven de drempel
      if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K;
        graadStaafjes(ctx, 200, 300, 400, [6, 15], { toon: q.on('Daaronder', 1) + q.on('graaddagen', 1), drempel: 1, bw: 110, gap: 140, label: 0, goud: q.on('graaddagen', 1) });
        chip(ctx, 'telt niet mee', 325, 220, C.text2, q.on('Daaronder', 1), 28);
        chip(ctx, '15 − 8 = 7', 575, 220, C.goud, q.on('graaddagen', 1), 30);
        ctx.restore(); }
      const nT = (80 / 7) * clamp((t - q.at('kamer', 1)) / Math.max(2, q.at('tachtig', 1) - q.at('kamer', 1)), 0, 1);
      if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
        graadStaafjes(ctx, 160, 300, 400, Array(12).fill(15), { toon: nT, bw: 54, gap: 16 });
        graadKolom(ctx, 1340, 300, 400, Math.min(80, Math.min(nT, 80 / 7) * 7), 7, { kop: q.on('tachtig', 1) });
        metaA(ctx, 'graaddagen opgeteld', 1340, 280, 1, C.grain, 'center', 26);
        regel(ctx, '15 − 8 = 7 graaddagen per dag', 160, 220, q.on('zeven', 1), C.text, 34, 'left', 700);
        ctx.restore(); }
      regel(ctx, '80 : 7 ≈ 11,4  →  ruim 11 dagen', 700, 850, q.on('gedeeld', 1), C.goud, 42, 'center', 800);
      metaA(ctx, 'vereenvoudigd model', 1800, 856, q.on('vereenvoudigde', 1), C.text2, 'right', 26);
      ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema');
    // boven: de kamer van 15 graden, gedimd; onder: dezelfde larven bij 22 graden
    ctx.save(); ctx.globalAlpha *= 0.35; graadStaafjes(ctx, 160, 260, 220, Array(12).fill(15), { toon: 12, bw: 54, gap: 16, label: 0, drempel: 1 }); ctx.restore();
    metaA(ctx, '15 graden: ruim 11 dagen', 160, 200, 0.6, C.text2, 'left', 26);
    radiator(ctx, 1260, 330, 240, 110, { hl: q.on('verwarming', 1) });
    const W2 = q.on('tweeëntwintig', 1, 0.8);
    thermoKlein(ctx, 1640, 420, 1.1, lerp(15, 22, W2), { hl: W2 });
    regel(ctx, '22 graden', 1560, 640, W2, C.koraal, 40, 'center', 800);
    const V = q.on('veertien', 1);
    const n = clamp((t - q.at('veertien', 1)) * 1.4, 0, 4);
    graadStaafjes(ctx, 160, 560, 220, [22, 22, 22, 22], { a: W2, toon: n, bw: 54, gap: 16, max: 25 });
    regel(ctx, '22 − 8 = 14 graaddagen per dag', 760, 640, V, C.text, 34, 'left', 700);
    regel(ctx, 'hoeveel dagen tot 80?', 760, 700, q.on('dezelfde', 1), C.goud, 34, 'left', 700);
    vraagteken(ctx, 1000, 800, q.on('denk', 1), 100); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: bijna zes dagen');
    const x0 = 360, sc = 70; // 70 px per dag
    const dagBalk = (y, d, col, nm, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - 22, d * sc * ease(clamp(a * 1.3, 0, 1)), 44, 10); shape(ctx, rgba(col, 0.55), col, 2);
      for (let k = 1; k < 12; k++) { if (k * sc > d * sc) break; ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + k * sc, y - 22); ctx.lineTo(x0 + k * sc, y + 22); ctx.stroke(); }
      regel(ctx, nm, x0 - 24, y + 12, 1, C.text, 34, 'right', 700); ctx.restore(); };
    dagBalk(270, 80 / 7, C.teal, '15 graden', 1); metaA(ctx, 'ruim 11 dagen', x0 + 80 / 7 * sc + 20, 280, 1, C.teal, 'left', 26);
    dagBalk(380, 80 / 14, C.koraal, '22 graden', q.on('tweeëntwintig', 1)); metaA(ctx, 'bijna 6 dagen', x0 + 80 / 14 * sc + 20, 390, q.on('zes', 1), C.koraal, 'left', 26);
    regel(ctx, '22 − 8 = 14   ·   80 : 14 ≈ 5,7', x0, 500, q.on('Tachtig', 1), C.goud, 40, 'left', 800);
    chip(ctx, 'een paar graden: een veel snellere of tragere klok', 760, 620, C.text2, q.on('verschil', 1), 30);
    const M = q.on('meet', 1, 0.3);
    persoon(ctx, 'lieke', 1500, 800, 430, { t, a: M, uit: 'neutraal', pose: 'vasthouden', kijk: 1, hold: (c, x, y) => thermoKlein(c, x + 18, y - 40, 0.5, 15) });
    naamBij(ctx, 'Lieke', 'meet de kamer na', 1500, 340, M, 'center');
    weerhut(ctx, 1730, 800, 1.1, { a: q.on('weerstation', 1) });
    naamBij(ctx, 'weerstation', '', 1730, 470, q.on('weerstation', 1), 'center'); },

  s23(ctx, t, q) { bg(ctx, 'schema');
    // eerst vlieg, eitjes, thermometer en made weg, pas dan Kim (geen half doorzichtige Kim over de vlieg)
    const tK = q.at('Kim', 1), Kuit = clamp((t - tK + 0.2) / 0.4, 0, 1), K = clamp((t - tK - 0.25) / 0.45, 0, 1);
    const hl3 = q.on('Warmte', 1) * (1 - Kuit);
    klokBord(ctx, t, [0, 0, 0], { vlieg: 1, hl: hl3 > 0.5 ? -1 : 3, dimAnder: 1 });
    if (hl3 > 0.01) { ctx.save(); ctx.globalAlpha *= hl3; haak(ctx, ZL.x0 - 50, ZL.x0 + 2 * ZL.dx + 50, 340, 'alleen de eerste dagen', C.koraal, 1); ctx.restore(); }
    if (Kuit < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Kuit;
      vlieg(ctx, 360, 470, 1, { t, rot: 0.25 });
      eitjes(ctx, 650, 500, 12, 34, { a: q.on('eitjes', 1) });
      chip(ctx, 'meestal snel, soms later', 560, 330, C.goud, q.on('later', 1), 28);
      const gr = clamp((t - q.at('tempo', 1)) / 4, 0, 1), T = lerp(15, 22, 0.5 + 0.5 * Math.sin(gr * 6.283));
      made(ctx, 1070, 520, lerp(60, 200, gr), { a: q.on('tempo', 1), t });
      thermoKlein(ctx, 840, 560, 0.8, T, { a: q.on('temperatuur', 1) });
      ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      persoon(ctx, 'kim', 250, 800, 440, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, outfit: 'lab' });
      naamBij(ctx, 'Dr. Kim', 'combineert de klokken', 250, 300, 1, 'center');
      rapport(ctx, 480, 280, { a: q.on('rapport', 1), regelA: q.on('elf', 1) });
      const V = q.on('venster', 1);
      tijdbalk(ctx, 520, 1400, 700, { venster: [11, 14], vensterA: Math.max(q.on('elf', 1), V), vaag: 1, labels: 1, dagen: 1 });
      naamBij(ctx, 'venster met grenzen', '', tijdbalkX(520, 1400, 12.5), 800, V, 'center', C.goud);
      const B = q.on('buurvrouw', 1, 0.4);
      persoon(ctx, 'buurvrouw', 1680, 800, 420, { t, a: B, uit: 'neutraal', pose: 'vasthouden', kijk: -1, hold: houdKopje(0.58) });
      naamBij(ctx, 'Mevrouw Jansen', 'de buurvrouw', 1680, 350, B, 'center');
      ctx.restore(); } },

  s24(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'bilal', 230, 800, 440, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', 'stagiair, hbo', 230, 300, 1, 'center');
    const F2 = q.on('Forensisch', 2, 0.3);
    persoon(ctx, 'kim', 1720, 800, 440, { t, a: F2, uit: 'blij', pose: 'staan', kijk: -1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'forensisch arts', 1720, 300, F2, 'center');
    tag(ctx, 'hbo · Forensisch Onderzoek', 960, 240, C.teal, q.on('hbo', 1), 'center', 34);
    regel(ctx, 'Saxion Enschede of HvA Amsterdam · 4 jaar · selectie', 960, 300, q.on('Enschede', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'wo · bachelor biologie (Radboud Nijmegen)', 960, 400, C.paars, q.on('bachelor', 1), 'center', 32);
    regel(ctx, '→ master Forensic Science, UvA Amsterdam · 2 jaar', 960, 460, q.on('master', 1), C.text2, 30, 'center', 600);
    const Wk = q.on('NFI', 1);
    ['NFI', 'politie', 'particulier lab'].forEach((s2, i) => chip(ctx, s2, 720 + i * 240, 560, [C.goud, C.teal, C.oker][i], clamp(Wk * 1.5 - i * 0.3, 0, 1), 28));
    tag(ctx, 'forensisch arts · geneeskunde (o.a. Radboud)', 960, 690, C.koraal, q.on('geneeskunde', 1), 'center', 32);
    regel(ctx, 'daarna 3 jaar opleiding · GGD of forensisch-medische dienst', 960, 750, q.on('drie', 1), C.text2, 30, 'center', 600); }
});
// eindkaart met vijf regels: meer ruimte en sneller opbouwen (alleen deze film; engine/player.js blijft ongemoeid)
window.addEventListener('DOMContentLoaded', () => { drawEnd = function (ctx, it, t) { bg(ctx, 'schema'); const lines = it.seg.lines, n = lines.length;
  const y0 = n > 4 ? 230 : (n > 3 ? 300 : 380), st = n > 4 ? 92 : (n > 3 ? 105 : 120);
  lines.forEach((l, i) => { const a = ramp(t, 0.3 + i * 0.9, 0.6); ctx.save(); ctx.globalAlpha = a; text(ctx, l, W / 2, y0 + i * st, fTekst(44, 600), C.text, 'center'); ctx.restore(); });
  haak(ctx, 360, 1560, n > 3 ? y0 + (n - 1) * st + 80 : 740, DATA.film.endHaak, C.groen, ramp(t, 0.3 + n * 0.9, 0.6));
  metaText(ctx, 'biologie bij kamiel · stem: roos (elevenlabs) · versie ' + DATA.film.version, W / 2, CAPTION_Y - 20, C.text2, 'center', 28); }; });
