// Wat word jij? · Farmacie 3 · Achter de balie — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk als patiënt; Apotheker Ravi; Dr. Kim als huisarts in H4).
// Rode draad: Opa Henk haalt zijn medicijnen op en vraagt er ibuprofen bij.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function schaal(ctx, x, y, s, fn) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
// apotheek: kast achter, Ravi achter de balie, monitor, doosjes; Henk ervoor (links)
function apotheek(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  apotheekKast(ctx, 820, 150, 940, 390); if (o.kruis !== false) apotheekKruis(ctx, 220, 230, 0.9, o.kruis == null ? 1 : o.kruis);
  persoon(ctx, 'ravi', 1440, 880, 530, { t, kijk: o.ravKijk || -1, uit: o.uitR || 'neutraal', pose: o.poseR || 'staan', a: o.ravi == null ? 1 : o.ravi });
  balie(ctx, 760, 600, 1020); monitor(ctx, 1680, 600, 1, o.signaal || 0, t);
  const d = o.doos == null ? 1 : o.doos; for (let i = 0; i < 5; i++) doosje(ctx, 920 + i * 120, 598, 72, 82, LIJST_KL[i], '', d * clamp(d * 5 - i, 0, 1), (o.hl || [])[i] || 0);
  persoon(ctx, 'henk', 560, 880, 430, { t, kijk: 1, uit: o.uitH || 'neutraal', pose: o.poseH || 'vasthouden', hold: o.tas === false ? null : (c, x, y) => tasje(c, x, y) });
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { apotheekKruis(ctx, 1640, 250, 1); for (let i = 0; i < 5; i++) doosje(ctx, 1240 + i * 100, 640, 72, 82, LIJST_KL[i]); strip(ctx, 1450, 760, 1, C.koraal); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const sig = q.on('aarzelt', 1);
    apotheek(ctx, t, { doos: q.on('vijf', 1, 1), hl: [q.on('plastablet', 1) * (1 - q.on('hartfalen', 1) * 0.5), q.on('ACE', 1) * (1 - q.on('hartfalen', 1) * 0.5)], signaal: sig,
      ravKijk: t > q.at('scherm', 1) ? 1 : -1, uitR: sig > 0.5 ? 'bezorgd' : 'neutraal', poseR: sig > 0.5 ? 'denk' : 'staan', uitH: q.on('knie', 1) > 0.5 && q.on('ibuprofen', 1) < 0.5 ? 'bezorgd' : 'neutraal' });
    naamBij(ctx, 'Opa Henk', '', 560, 410, q.on('Henk', 1, 0.4) * (1 - q.on('vijf', 1)), 'center');
    naamBij(ctx, 'plastablet', '', 920, 668, q.on('plastablet', 1), 'center'); naamBij(ctx, 'ACE-remmer', '', 1040, 724, q.on('ACE', 1), 'center');
    hart(ctx, 300, 360, 0.42, q.on('hartfalen', 1), t, 0.6); naamBij(ctx, 'hartfalen', '', 300, 450, q.on('hartfalen', 1), 'center');
    const kn = q.on('knie', 1) * (1 - q.on('ibuprofen', 1)); if (kn > 0.01) { for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; circ(ctx, 590, 790, 14 + ph * 46, null, rgba(C.koraal, kn * (1 - ph)), 4); } }
    strip(ctx, 300, 620, 0.8, C.groen, q.on('paracetamol', 1), ''); naamBij(ctx, 'paracetamol', '', 300, 560, q.on('paracetamol', 1), 'center');
    strip(ctx, 300, 790, 0.8, C.koraal, q.on('ibuprofen', 1)); naamBij(ctx, 'ibuprofen', '', 300, 735, q.on('ibuprofen', 1), 'center');
    naamBij(ctx, 'Apotheker Ravi', '', 1440, 370, q.on('Ravi', 1) * (1 - q.on('aarzelt', 1)), 'center');
    vraagteken(ctx, 1250, 135, q.on('Waarom', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a', 1 - q.on('Bovendien', 1)); const N = q.on('nier', 1, 0.8), B = q.on('Bovendien', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; const ts = q.at('kijkt', 1);
      medScherm(ctx, 240, 230, 900, 560, 1, { lijst: clamp((t - 0.3) / 1.2, 0, 1), nieuw: clamp((t - q.at('nieuw', 1)) / 0.8, 0, 1), scan: t > ts && t < q.at('gebruikt', 1) + 0.6 ? Math.floor((t - ts) * 2.2) % 5 : -1, signaal: q.on('signaal', 1), hl: [0, 1], t });
      tag(ctx, 'medicatiebewaking', 690, 190, C.goud, q.on('medicatiebewaking', 1), 'center', 32);
      persoon(ctx, 'ravi', 1520, 880, 480, { t, kijk: -1, pose: t > q.at('signaal', 1) ? 'wijs' : 'staan', uit: t > q.at('signaal', 1) ? 'bezorgd' : 'neutraal' }); ctx.restore(); }
    if (N > 0.01 && B < 0.99) { ctx.save(); ctx.globalAlpha *= N * (1 - B);
      const kn = q.on('knijpt', 1, 1.2), op = q.on('open', 1, 1.2), dr = q.on('vocht', 1, 1.2), Z = q.on('zakt', 1, 1.5);
      const druk = 1 - 0.1 * kn - 0.08 * op - 0.08 * dr - 0.5 * Z;
      glomerulus(ctx, 1100, 470, 1, 1, { knijp: kn, open: op, droog: dr, druk, t });
      naamBij(ctx, 'filtertjes', '', 1120, 245, q.on('filtertjes', 1), 'center');
      naamBij(ctx, 'aanvoerend vaatje', '', 930, 640, q.on('aanvoerend', 1), 'center', kn > 0.3 ? C.koraal : C.text); naamBij(ctx, 'afvoerend vaatje', '', 830, 320, q.on('afvoerend', 1), 'center', op > 0.3 ? C.paars : C.text);
      naamBij(ctx, 'naar de urine', '', 1420, 420, q.on('filtertjes', 1) * 0.9, 'center', C.text2);
      // drie middelen met hun pijl
      middelIcoon(ctx, 260, 300, 'ace', q.on('ACE', 1), 'ACE-remmer', op); pijl(ctx, 330, 320, 680, 382, C.paars, op, 5, 20);
      middelIcoon(ctx, 260, 470, 'plas', q.on('plastablet', 1), 'plastablet', dr); pijl(ctx, 330, 480, 610, 560, C.teal, dr, 5, 20);
      middelIcoon(ctx, 260, 660, 'ibuprofen', q.on('Ibuprofen', 1), 'ibuprofen', kn); pijl(ctx, 330, 650, 760, 572, C.koraal, kn, 5, 20);
      if (dr > 0.01) for (let k = 0; k < 6; k++) { const ph = (t * 0.45 + k / 6) % 1; druppel(ctx, 660 + k * 22 + ph * 10, 600 + ph * 200, 10, C.teal, dr * (1 - ph)); }
      const M = q.on('apart', 1); drukmeter(ctx, 1640, 250, 90, druk, M); naamBij(ctx, 'filterdruk', '', 1640, 300, M, 'center');
      tag(ctx, 'samen: nier filtert slecht', 1420, 720, C.koraal, q.on('slecht', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const zv = q.on('vasthouden', 1, 1.5), last = q.on('belast', 1, 1);
      middelIcoon(ctx, 330, 450, 'ibuprofen', 1, 'ibuprofen'); pijl(ctx, 420, 450, 640, 450, C.line, q.on('zout', 1), 4, 16);
      for (let k = 0; k < 10; k++) { const al = clamp(zv * 10 - k, 0, 1); const w = wander(k, t, 6, 0.5); if (k % 2) druppel(ctx, 760 + (k % 5) * 50 + w.x, 400 + Math.floor(k / 5) * 90 + w.y, 16, C.teal, al); else zoutje(ctx, 760 + (k % 5) * 50 + w.x, 410 + Math.floor(k / 5) * 90 + w.y, 12, al); }
      naamBij(ctx, 'zout en vocht blijven', '', 860, 620, q.on('zout', 1), 'center'); pijl(ctx, 1040, 450, 1260, 450, C.line, q.on('belast', 1), 4, 16);
      hart(ctx, 1420, 440, 0.75, q.on('belast', 1), t, last); naamBij(ctx, 'zwak hart', '', 1420, 600, q.on('zwak', 1), 'center');
      const O = q.on('ouderen', 1, 0.3); persoon(ctx, 'henk', 1700, 880, 400, { t, a: O, kijk: -1, uit: 'bezorgd' }); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('andere', 1), G = q.on('Hoeveel', 1, 0.8), W = q.on('plastablet', 1) * (1 - G);
    apotheek(ctx, t, { a: 1 - G, kruis: 0, doos: 1, hl: [A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7], ravKijk: -1, uitR: t < q.at('vaker', 1) ? 'praat' : 'blij', poseR: t < q.at('andere', 1) ? 'wijs' : 'staan', uitH: t > q.at('geeft', 1) ? 'bezorgd' : 'neutraal' });
    // ibuprofen gaat weg, paracetamol verdeeld over de dag
    const ib = 1 - q.on('paracetamol', 1, 0.8); strip(ctx, 300, 790, 0.8, C.koraal, Math.max(ib, 0) * (1 - G)); kruis(ctx, 300, 790, 34, q.on('gewone', 1) * ib);
    strip(ctx, 300, 790, 0.8, C.groen, q.on('paracetamol', 1) * (1 - G)); naamBij(ctx, 'paracetamol', '', 300, 735, q.on('paracetamol', 1) * (1 - A), 'center');
    const D = q.on('verdeeld', 1) * (1 - A); dagBalk(ctx, 170, 260, 540, D); [8, 12, 17, 22].forEach((u, i) => tablet(ctx, uurX(170, 540, u), 200, 20, C.groen, D * clamp((t - q.at('verdeeld', 1)) * 2.5 - i, 0, 1)));
    // Henk: plastablet overslaan op tuinclubdag
    denkWolk(ctx, 380, 250, 420, 230, W, 1); tablet(ctx, 300, 250, 30, C.teal, W); kruis(ctx, 300, 250, 40, q.on('overslaat', 1) * W); bloem(ctx, 440, 300, 0.9, C.koraal, q.on('tuinclub', 1) * W); bloem(ctx, 500, 290, 0.75, C.goud, q.on('tuinclub', 1) * W);
    naamBij(ctx, 'tuinclub', '', 470, 120, q.on('tuinclub', 1) * W, 'center');
    if (G > 0.01) { for (let i = 0; i < 20; i++) popje(ctx, 620 + (i % 10) * 76, 380 + Math.floor(i / 10) * 115, 24, '#5A6478', G * clamp((t - q.at('Hoeveel', 1)) * 6 - i * 0.3, 0, 1)); vraagteken(ctx, 960, 680, q.on('denk', 1), 110); } },

  // ---------- H3 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('plastablet', 1)); const P = q.on('plastablet', 1, 0.8), R = q.on('pillen', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; const hf = q.on('helft', 1, 1.2);
      for (let i = 0; i < 20; i++) popje(ctx, 620 + (i % 10) * 76, 300 + Math.floor(i / 10) * 115, 24, i % 2 && hf > 0.5 ? C.goud : '#5A6478', 1);
      regel(ctx, 'ongeveer de helft', 960, 470, hf, C.goud, 36, 'center', 800);
      tag(ctx, 'lui?', 1600, 330, C.koraal, q.on('luiheid', 1), 'center', 34); kruis(ctx, 1690, 310, 24, q.on('luiheid', 1, 0.4) * clamp((t - q.at('luiheid', 1) - 0.5) * 2, 0, 1));
      const prak = q.on('praktische', 1);
      redenTegel(ctx, 420, 650, 'vergeten', 'vergeten', q.on('vergeet', 1)); redenTegel(ctx, 780, 650, 'bijwerking', 'bijwerkingen', q.on('bijwerkingen', 1)); redenTegel(ctx, 1140, 650, 'verschil', 'geen verschil', q.on('verschil', 1)); redenTegel(ctx, 1500, 650, 'wc', 'vaak naar de wc', prak, prak);
      ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; const x0 = 300, w = 1200, y = 280; dagBalk(ctx, x0, y, w, 1, { nacht: q.on('nachts', 1) });
      const club = q.on('clubdagen', 1, 1); const tIn = lerp(8, 14.5, club), dur = 6;
      // tuinclub 9:00–14:00
      ctx.save(); ctx.globalAlpha *= q.on('plastablet', 1); roundRect(ctx, uurX(x0, w, 9), y - 150, uurX(x0, w, 14) - uurX(x0, w, 9), 64, 12); shape(ctx, rgba(C.groen, 0.18), C.groen, 2); bloem(ctx, uurX(x0, w, 9) + 40, y - 92, 0.6, C.koraal); regel(ctx, 'tuinclub', uurX(x0, w, 11.8), y - 106, 1, C.text, 28, 'center', 700); ctx.restore();
      // werking van de plastablet: vaak naar de wc
      const sh = q.on('paar', 1, 1); ctx.save(); ctx.globalAlpha *= sh; roundRect(ctx, uurX(x0, w, tIn), y - 14, uurX(x0, w, tIn + dur) - uurX(x0, w, tIn), 28, 14); shape(ctx, rgba(C.teal, 0.6), C.teal, 2);
      for (let k = 0; k < 4; k++) druppel(ctx, uurX(x0, w, tIn + 0.8 + k * 1.4), y + 90, 11, C.teal, 1); ctx.restore();
      tablet(ctx, uurX(x0, w, tIn), y - 50, 24, C.teal, 1); kruis(ctx, uurX(x0, w, 11), y - 118, 30, sh * (1 - club) * 0.9);
      naamBij(ctx, 'thuis', '', uurX(x0, w, 14.5), y + 140, q.on('thuis', 1), 'center');
      const L = q.on('vijf', 1); ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(uurX(x0, w, 17), y - 70); ctx.lineTo(uurX(x0, w, 17), y + 24); ctx.moveTo(uurX(x0, w, 17), y + 72); ctx.lineTo(uurX(x0, w, 17), y + 112); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      naamBij(ctx, 'uiterlijk 17:00', '', uurX(x0, w, 17) + 20, y + 150, L, 'left', C.koraal);
      if (R > 0.01) { medRol(ctx, 330, 690, R, clamp((t - q.at('zakje', 1) + 1.5) / 2.5, 0, 1), Math.floor(clamp((t - q.at('oogopslag', 1)) * 1.5, 0, 2))); naamBij(ctx, 'medicijnrol', '', 330, 820, q.on('rol', 1), 'center'); }
      persoon(ctx, 'henk', 1720, 880, 400, { t, kijk: -1, uit: 'blij' }); ctx.restore(); } },

  // ---------- H4 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('medicatiebeoordeling', 1);
    persoon(ctx, 'henk', 300, 880, 420, { t, a: q.on('mensen', 1, 0.3), kijk: 1, uit: 'neutraal' });
    persoon(ctx, 'ravi', 700, 880, 450, { t, kijk: t < q.at('mensen', 1) ? 1 : -1, uit: 'praat', pose: t > q.at('Werkt', 1) && t < q.at('nodig', 1) ? 'wijs' : 'staan' });
    persoon(ctx, 'kim', 1100, 880, 440, { t, a: q.on('bericht', 1, 0.3), kijk: -1, outfit: 'gewoon', uit: 'neutraal' });
    tafel(ctx, 150, 650, 1110, q.on('mensen', 1, 0.4));
    const ev = clamp((t - q.at('bericht', 1)) / 1.4, 0, 1); if (ev > 0 && ev < 1) envelop(ctx, lerp(760, 1050, ev), 420 - Math.sin(ev * Math.PI) * 120, 1, Math.min(1, (1 - ev) * 4));
    naamBij(ctx, 'Opa Henk', 'patiënt', 300, 380, q.on('patiënt', 1) * (1 - S), 'center'); naamBij(ctx, 'Apotheker Ravi', 'apotheker', 700, 352, q.on('apotheker', 1) * (1 - S), 'center'); naamBij(ctx, 'Dr. Kim', 'huisarts', 1100, 360, q.on('huisarts', 1) * (1 - S), 'center');
    lijstPapier(ctx, 1320, 230, 540, q.on('lijst', 1), { vink: clamp((t - q.at('Werkt', 1)) * 4, 0, 5), dubbel: q.on('dubbel', 1) * (1 - q.on('Kan', 1)), weg: clamp((t - q.at('nodig', 1) + 0.6) / 0.8, 0, 1), t });
    tag(ctx, 'medicatiebeoordeling', 700, 200, C.goud, S, 'center', 32); vraagteken(ctx, 1590, 740, q.on('doel', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b', 1 - q.on('apotheker', 1)); const A = q.on('apotheker', 1, 0.8);
    if (A < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - A; const cx = 520, cy = 500, R = 210, n = Math.round(clamp((t - q.at('meer', 1)) * 3 + 2, 2, 8));
      const P = []; for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / 8 * 6.283; P.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R]); }
      const L = q.on('kans', 1), K = q.on('elkaar', 1); ctx.lineWidth = 3; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { ctx.strokeStyle = rgba(K > 0.5 ? C.koraal : C.line, 0.55 * L); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
      const pa = q.on('patiënt', 1); if (pa > 0.01) { for (let i = 0; i < n; i++) { ctx.strokeStyle = rgba(C.koraal, 0.6 * pa); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(cx, cy); ctx.stroke(); } gezichtIcoon(ctx, cx, cy, 1.1, pa, 'henk'); }
      P.forEach(([x, y], i) => tablet(ctx, x, y, 30, [C.teal, C.paars, C.oker, C.goud, C.groen, C.koraal, C.teal, C.paars][i], 1));
      // ziekenhuisopnames: 1 op 20
      const Z = q.on('twintig', 1), O = q.on('ziekenhuisopnames', 1);
      for (let i = 0; i < 20; i++) bedje(ctx, 1050 + (i % 10) * 76, 330 + Math.floor(i / 10) * 90, 1.1, i === 13 && O > 0.5 ? C.koraal : '#7A8496', Z * clamp((t - q.at('twintig', 1)) * 8 - i * 0.4, 0, 1));
      naamBij(ctx, 'acute ziekenhuisopnames', '', 1390, 260, Z, 'center');
      const V = q.on('helft', 1, 1.2); balk(ctx, 1050, 600, 690, 0.46 * V, C.groen, '', q.on('helft', 1, 0.4)); bedje(ctx, 1010, 620, 1, C.koraal, q.on('helft', 1, 0.4)); naamBij(ctx, 'bijna de helft te voorkomen', '', 1050, 700, q.on('voorkomen', 1), 'left', C.groen); ctx.restore(); }
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; persoon(ctx, 'ravi', 700, 880, 470, { t, kijk: 1, uit: 'praat', pose: t > q.at('advies', 1) ? 'wijs' : 'staan' });
      niertje(ctx, 560, 230, 0.8, q.on('lichaam', 1)); hart(ctx, 700, 210, 0.36, q.on('lichaam', 1), t, 0); tablet(ctx, 840, 220, 24, C.teal, q.on('medicijnen', 3)); capsule(ctx, 910, 250, 0.6, C.paars, q.on('medicijnen', 3));
      persoon(ctx, 'henk', 1250, 880, 430, { t, kijk: -1, uit: 'blij', a: q.on('vertaalt', 1, 0.3) }); tag(ctx, 'advies voor Henk', 1000, 330, C.goud, q.on('advies', 1), 'center', 30); ctx.restore(); } },

  // ---------- Recap ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = '#2F4A3A'; ctx.beginPath(); ctx.moveTo(0, 880); ctx.quadraticCurveTo(960, 700, 1920, 860); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.fill();
    zon(ctx, 1700, 170, 50, 1, t); [[300, C.koraal], [380, C.goud], [1250, C.paars], [1340, C.koraal], [1430, C.goud], [1520, C.koraal]].forEach(([x, col], i) => bloem(ctx, x, 830 - Math.sin(x / 1920 * Math.PI) * 60, 1.1, col));
    persoon(ctx, 'henk', 820, 870, 440, { t, kijk: 1, uit: 'blij', pose: 'vasthouden', hold: (c, x, y, an) => schepje(c, x, y, 0.4) });
    const D = q.on('verdeeld', 1); dagBalk(ctx, 260, 200, 900, q.on('paracetamol', 1)); [8, 12, 17, 22].forEach((u, i) => tablet(ctx, uurX(260, 900, u), 140, 18, C.groen, D * clamp((t - q.at('verdeeld', 1)) * 3 - i, 0, 1)));
    naamBij(ctx, 'paracetamol', '', 710, 300, q.on('paracetamol', 1), 'center');
    schaal(ctx, 1200, 470, 0.6, () => medRol(ctx, 0, 0, q.on('rol', 1), clamp((t - q.at('rol', 1)) / 1.2, 0, 1), 2, 4)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('farmacie', 1), M = q.on('master', 1), B = q.on('balie', 1);
    regel(ctx, 'apotheker', 160, 230, q.on('apotheker', 1), C.text, 44, 'left', 800); metaA(ctx, 'universiteit · 6 jaar', 160, 272, q.on('universiteit', 1), C.grain, 'left', 24);
    jaarBlokken(ctx, 160, 320, 3, C.teal, q.on('bachelor', 1), clamp((t - q.at('bachelor', 1)) * 2, 0, 1), 'bachelor farmacie'); jaarBlokken(ctx, 530, 320, 3, C.paars, M, clamp((t - q.at('master', 1)) * 2, 0, 1), 'master farmacie');
    regel(ctx, 'apothekersassistent', 160, 560, q.on('apothekersassistenten', 1), C.text, 44, 'left', 800); metaA(ctx, 'mbo · niveau 4', 160, 602, q.on('mbo', 1), C.grain, 'left', 24);
    jaarBlokken(ctx, 160, 650, 3, C.oker, q.on('mbo', 1), clamp((t - q.at('mbo', 1)) * 2, 0, 1), '');
    apotheekKast(ctx, 1080, 180, 760, 360, 1); persoon(ctx, 'ravi', 1420, 880, 520, { t, kijk: -1, uit: 'blij', a: 1 - q.on('apothekersassistenten', 1, 0.3) }); balie(ctx, 1080, 600, 760); monitor(ctx, 1700, 600, 1, 0, t); naamBij(ctx, 'apothekersassistent', 'aan de balie', 1460, 700, q.on('apothekersassistenten', 1), 'center');
    for (let i = 0; i < 3; i++) doosje(ctx, 1160 + i * 90, 598, 66, 76, LIJST_KL[i], '', B * clamp((t - q.at('balie', 1)) * 4 - i, 0, 1)); }
});
