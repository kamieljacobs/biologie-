// Zenuwstelsel 6 · Leren en onthouden — scènes (lichte remake 29 okt 2026). Cues via q.on(woord, n, duur) op de woordtijden van de bestaande takes.
// Personages (castboek, geen namen in stem of beeld): kind van zes = Teun ('kind'), ouder achter het zadel = Rachid, de twee fietsende tieners = Noor en Yasmin.
const NEURON = '#7E8FA8';
const GROND = 800;
function wissel(t, t0, t1, d = 0.4) { return ramp(t, t0, d) * (t1 == null ? 1 : 1 - ramp(t, t1 - d, d)); } // één tekstbalk tegelijk: oud weg, dan nieuw
function legenda(ctx, x, y, items, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; items.forEach(([naam, kl, al = 1], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, x + 12, y + i * 46 - 11, 10, kl); regel(ctx, naam, x + 34, y + i * 46, 1, C.text, 30, 'left', 600); ctx.restore(); }); ctx.restore(); }
function haakTekst(ctx, x1, x2, y, msg, a = 1, kl = C.groen) { haak(ctx, x1, x2, y, msg, kl, a); }

// Teens op de fiets in de straat (cold open fase 2 en samenvatting). X = camera; geeft posities terug.
function fietsTieners(ctx, t, X, o = {}) { const { xN = 820, xY = 990, kletsN = 0, kletsY = 0 } = o;
  const Y = fietser(ctx, 'yasmin', xY, GROND - 22, 322, { t: t + 0.37, cad: 0.9, kleur: '#7A5A8E', leun: 9 });
  const N = fietser(ctx, 'noor', xN, GROND + 4, 330, { t, cad: 0.9, kleur: '#3E6E8E', leun: 10 });
  if (kletsY > 0.01 && Y.P.hoofd) spraakwolk(ctx, Y.P.hoofd.x + 40, Y.P.hoofd.y - 90, 110, 56, kletsY, -1);
  if (kletsN > 0.01 && N.P.hoofd) spraakwolk(ctx, N.P.hoofd.x - 30, N.P.hoofd.y - 100, 110, 56, kletsN, 1);
  return { N, Y }; }

Object.assign(SCENES, {
  // ---------- titelkaart: rechts een klein netwerk waarin een patroon steeds opnieuw oplicht
  title(ctx, t) { const P = netwerkPunten(18, 1340, 340, 500, 420, 7), E = netwerkLijnen(P, 200); const pat = [2, 5, 6, 9, 10, 13, 14];
    const golf = (t * 0.6) % 1; netwerk(ctx, P, E, { pat, sterk: 1, act: i => pat.includes(i) ? clamp(1 - Math.abs(golf - pat.indexOf(i) / pat.length) * 3, 0, 1) : 0, r: 18, t }); },

  // ---------- Cold open (Macro): kind leert fietsen, tien jaar later kletsend naar school
  s00(ctx, t, q) { const tL = q.at('Tien'), X1 = t * 95; const f2 = ramp(t, tL - 0.3, 0.7);
    if (f2 < 0.99) { ctx.save(); ctx.globalAlpha = 1; straat(ctx, { x: X1 + 400, grond: GROND });
      // fase 1: Rachid loopt mee en houdt het zadel vast; het kind trapt langzaam, zwabbert
      const kantel = 0.045 * Math.sin(t * 8.5) * wissel(t, q.at('zwabbert') - 0.2, q.at('Tien'), 0.4);
      const eraf = q.at('eraf'), uitU = clamp((t - eraf) / 1.6, 0, 1);
      const zwU = t > eraf ? { dx: -(X1 - eraf * 95) - uitU * 40, dy: -Math.sin(uitU * 3.14) * 30 + uitU * 12, rot: uitU * 4 } : null;
      // wiebelspoor op het fietspad achter het achterwiel
      if (kantel !== 0 || t > q.at('zwabbert')) { const sa = wissel(t, q.at('zwabbert'), tL, 0.4); ctx.save(); ctx.globalAlpha *= sa * 0.7; ctx.strokeStyle = rgba('#1C2230', 0.8); ctx.lineWidth = 4; ctx.beginPath();
        for (let k = 0; k <= 40; k++) { const xx = 1000 - 78 - k * 12, wt = t - k * 12 / 95; ctx[k ? 'lineTo' : 'moveTo'](xx, GROND + 6 + 8 * Math.sin(wt * 8.5)); } ctx.stroke(); ctx.restore(); }
      const vast = 1 - ramp(t, eraf, 0.3);
      // Rachid achter de fiets (loopt op zijn plek, de straat schuift mee)
      const F0 = fietsMaat('kind', 228); const zadelAchter = [1000 + F0.zadelX - 14, GROND - F0.S + 4];
      persoon(ctx, 'rachid', 905, GROND - 8, 330, { zij: true, kijk: 1, gang: 'loop', t: t * 0.62, tempo: 0.62, reikNaar: zadelAchter, a: 1 });
      const K = fietser(ctx, 'kind', 1000, GROND + 6, 228, { t, cad: 0.55, kleur: '#C9503C', zijwiel: vast, zijwielUit: zwU, kantel, leun: 6, uit: t > q.at('zwabbert') ? 'verbaasd' : 'blij' });
      naamBij(ctx, 'zes jaar', null, 1090, GROND - 330, ramp(t, 0.1, 0.4) * UIT(t, tL - 0.3, 0.4), 'left', C.text);
      ctx.restore(); }
    if (f2 > 0.01) { ctx.save(); ctx.globalAlpha *= f2; const X = 260 * (t - 9.8) - 171; straat(ctx, { x: X, grond: GROND, raam: 5, raamOpen: q.on('raam', 1, 0.5) });
      const T = fietsTieners(ctx, t, X, { kletsN: wissel(t, q.at('klets'), q.at('Uit'), 0.3) * (Math.sin(t * 3) > 0 ? 1 : 0.35), kletsY: wissel(t, q.at('klets') + 0.4, q.at('Uit'), 0.3) * (Math.sin(t * 3) > 0 ? 0.35 : 1) });
      metaText(ctx, 'tien jaar later', 60, 120, C.grain, 'left', 30);
      // twee tonen uit het open raam, drijven naar het hoofd
      if (RAAMPOS) { const R = RAAMPOS, H0 = T.N.P.hoofd || { x: 900, y: 420 };
        for (let k = 0; k < 2; k++) { const u = ease(clamp((t - q.at('tonen') + 0.4 - k * 0.35) / 1.8, 0, 1)); if (u <= 0) continue; const nx = lerp(R[0], H0.x + 40 + k * 50, u), ny = lerp(R[1], H0.y - 120 - k * 20, u) - Math.sin(u * 3.14) * 80;
          noot(ctx, nx, ny, 1.1, wissel(t, q.at('tonen') - 0.4 + k * 0.35, q.at('Niemand') + 0.6, 0.3)); }
        if (T.N.P.hoofd) spraakwolk(ctx, H0.x + 120, H0.y - 210, 200, 70, wissel(t, q.at('meteen'), q.at('Niemand') + 0.6, 0.3), -1, () => { regel(ctx, 'ken ik!', H0.x + 120, H0.y - 198, 1, '#121A26', 36, 'center', 700); }); }
      // in je hoofd: zoomcirkel náást het hoofd (gezicht blijft heel)
      const zh = q.on('hoofd', 1, 0.6); if (zh > 0.01 && T.N.P.hoofd) { const Hd = T.N.P.hoofd; const P = netwerkPunten(16, 1300, 140, 360, 300, 3), E = netwerkLijnen(P, 150);
        zoomCircle(ctx, 1480, 290, 190, Hd.x + 20, Hd.y - 10, 'in je hoofd', zh, () => { bgM(ctx); netwerk(ctx, P, E, { pat: [1, 4, 5, 8, 9], sterk: 1, act: i => [1, 4, 5, 8, 9].includes(i) ? PULS(t, 0.8) : 0, r: 14, t }); });
        vraagteken(ctx, 1480, 560 + 0, q.on('veranderd', 1, 0.4), 90); }
      ctx.restore(); } },

  // ---------- H1 vraag: drie mogelijkheden in beeld op de optiewoorden
  q1(ctx, t, q) { bgS(ctx); const B = hersenZij(ctx, 960, 290, 0.62, { a: ramp(t, 0, 0.4) }); vraagteken(ctx, 1230, 260, q.on('hersenen', 1, 0.4), 110);
    const kaart = (i, a, teken, lab) => { const x = 210 + i * 520; kaartje(ctx, x, 560, 460, 280, a); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; teken(x + 230, 690); metaText(ctx, lab, x + 230, 820, C.grain, 'center', 28); ctx.restore(); } };
    kaart(0, q.on('zenuwcellen', 1, 0.4), (cx, cy) => { [[-120, -30], [-40, 30], [50, -20]].forEach(([dx, dy], k) => circ(ctx, cx + dx, cy + dy, 22, '#3A4A66', '#8FA0B5', 2)); const n = ramp(t, q.at('zenuwcellen') + 0.3, 0.6); circ(ctx, cx + 130, cy + 20, 22 * n, rgba(C.goud, 0.35), C.goud, 3); }, 'meer zenuwcellen');
    kaart(1, q.on('Bestaande', 1, 0.4), (cx, cy) => { const g = ramp(t, q.at('sterker') - 0.2, 0.8), n = ramp(t, q.at('groeien'), 0.7); circ(ctx, cx - 120, cy, 24, '#3A4A66', '#8FA0B5', 2); circ(ctx, cx + 120, cy, 24, '#3A4A66', '#8FA0B5', 2);
      ctx.strokeStyle = lerp(0, 1, g) > 0.5 ? Z6.sig : '#8FA0B5'; ctx.lineWidth = 3 + 9 * g; ctx.beginPath(); ctx.moveTo(cx - 96, cy); ctx.lineTo(cx + 96, cy); ctx.stroke();
      ctx.strokeStyle = Z6.sig; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 100, cy - 14); ctx.quadraticCurveTo(cx, cy - 80 * n, lerp(cx - 100, cx + 100, n), cy - 14 * n); ctx.stroke(); }, 'sterkere verbindingen');
    kaart(2, q.on('Of', 1, 0.4), (cx, cy) => { const g = 1 + 0.18 * ramp(t, q.at('groter'), 0.8); hersenZij(ctx, cx, cy, 0.24 * g, {}); pijl(ctx, cx + 110 * g, cy - 40, cx + 150 * g, cy - 70, C.goud, ramp(t, q.at('groter'), 0.4), 3, 12); pijl(ctx, cx - 110 * g, cy - 40, cx - 150 * g, cy - 70, C.goud, ramp(t, q.at('groter'), 0.4), 3, 12); }, 'groter brein'); },

  // ---------- H1 antwoord: twee cellen die tegelijk vuren → zoom tot in de synaps → sterker worden
  a1(ctx, t, q) { const tz = q.at('eindknopje') - 0.9, zf = ease(clamp((t - tz) / 0.9, 0, 1));
    const syn = [1110, 470];
    const tweeCellen = (alpha) => { const P = netwerkPunten(16, 80, 80, 1760, 760, 11), E = netwerkLijnen(P, 260); netwerk(ctx, P, E, { a: 0.3 * alpha, r: 12, t });
      const nieuw = wissel(t, q.at('hooguit'), q.at('Leren') + 0.5, 0.4); if (nieuw > 0.01) { circ(ctx, 1500, 230, 16, rgba(C.goud, 0.3), C.goud, 2.5); naamBij(ctx, 'hooguit een paar nieuwe cellen', null, 1500, 300, nieuw * alpha, 'center', C.text); }
      const p1 = (t - q.at('tegelijk')) * 0.9, aan = t > q.at('tegelijk') - 0.1;
      const e1 = zenuwcel(ctx, 420, 360, { a: alpha, s: 1.5, col: NEURON, naar: [syn[0] - 20, syn[1] - 30], seed: 3, takken: 6, puls: aan ? (p1 % 1.2) : -1, pulsCol: Z6.sig, t });
      zenuwcel(ctx, 1420, 620, { a: alpha, s: 1.4, col: aan && (p1 % 1.2) > 0.85 ? _mixHex(NEURON, Z6.sig, 0.6) : NEURON, seed: 6, takken: 7, t, naar: [1840, 820] });
      naamBij(ctx, 'tegelijk actief', null, 960, 160, q.on('tegelijk', 1, 0.4) * alpha, 'center', Z6.sig);
      naamBij(ctx, 'verbinding', 'synaps', syn[0] + 70, syn[1] - 60, q.on('verbindingen', 1, 0.4) * UIT(t, q.at('synapsen'), 0.3) * alpha, 'left'); };
    if (zf < 1) { bgM(ctx); tweeCellen(1); const zc = q.on('synapsen', 1, 0.5); if (zc > 0.01) { const r = lerp(170, 1300, zf), cx = lerp(1420, 960, zf), cy = lerp(250, 540, zf);
        zoomCircle(ctx, cx, cy, r, syn[0], syn[1], zf < 0.2 ? 'synaps · vergroot' : null, zc, () => { bgM(ctx); synapsVoetje(ctx, cx, cy + 40 * (r / 170) * 0.2, 0.22 * r / 170 * 1.0, { t }); }); } }
    if (zf >= 1) { bgM(ctx); const S0 = [640, 400], s = 1.0;
      const rep = t > q.at('Herhaal') && t < q.at('eiwitten') ? ((t - q.at('Herhaal')) % 0.9) / 0.9 : -1;
      const glu = clamp(Math.max(q.on('glutamaat', 1, 0.8) * UIT(t, q.at('Hetzelfde') + 1.5, 0.8), rep >= 0 ? Math.sin(rep * 3.14) : 0, t > q.at('Hetzelfde') - 0.2 && t < q.at('Dat', 1) + 1.2 ? 0.8 : 0), 0, 1);
      const actief = Math.max(q.on('volgende', 1, 0.5) * UIT(t, q.at('Calcium', 2) + 2.5, 0.6), rep >= 0 ? 0.6 : 0);
      const mg = 1 - q.on('tegelijk', 2, 0.6) * UIT(t, q.at('extra') + 0.5, 0.6), ca = q.on('Calcium', 2, 1.6) * UIT(t, q.at('Hetzelfde'), 0.8) + (rep >= 0 ? 0.5 * Math.sin(rep * 3.14) : 0);
      const A = synapsVoetje(ctx, S0[0], S0[1], s, { t, glu, actief, mg, ca, nmdaHi: wissel(t, q.at('speciale'), q.at('Calcium', 2), 0.4), nieuw: q.on('receptoren', 1, 1.4), eiwit: q.on('eiwitten', 1, 1.6), groei: q.on('groter', 2, 1.2), tweede: q.on('voetjes', 1, 1.2), imp: rep >= 0 ? rep : clamp((t - q.at('eindknopje') + 0.6) / 1.2, 0, 1) });
      // namen direct bij de onderdelen
      naamBij(ctx, 'eindknopje', null, S0[0] - 250 * s - 16, S0[1] - 150 * s, q.on('eindknopje', 1, 0.4), 'right');
      naamBij(ctx, 'glutamaat', null, S0[0] + 270, S0[1] - 10, q.on('glutamaat', 1, 0.4) * UIT(t, q.at('Calcium', 2), 0.4), 'left', Z6.nt);
      naamBij(ctx, 'dendrietvoetje', null, S0[0] - 215 * (1 + 0.35 * q.on('groter', 2, 1.2)), S0[1] + 150, q.on('dendrietvoetje', 1, 0.4) * UIT(t, q.at('Hetzelfde'), 0.4) + q.on('groter', 2, 0.4) * UIT(t, q.at('voetjes'), 0.4), 'right');
      naamBij(ctx, 'toevalsdetector', 'nmda-receptor', S0[0], S0[1] + 170, q.on('toevalsdetector', 1, 0.4) * UIT(t, q.at('Calcium', 2) + 0.8, 0.4), 'center');
      naamBij(ctx, 'magnesium', null, S0[0] + 40, S0[1] + 108, q.on('alleen', 1, 0.4) * UIT(t, q.at('tegelijk', 2) + 0.8, 0.4), 'left', Z6.mg);
      naamBij(ctx, 'extra receptoren', null, S0[0] + 240, S0[1] + 60, q.on('receptoren', 1, 0.4) * UIT(t, q.at('Hetzelfde') + 1.4, 0.4), 'left');
      naamBij(ctx, 'nieuwe eiwitten', null, S0[0] - 210, S0[1] + 445, q.on('eiwitten', 1, 0.4) * UIT(t, q.at('voetjes') + 0.4, 0.4), 'center');
      naamBij(ctx, 'nieuw voetje', null, S0[0] + 500, S0[1] + 90, q.on('voetjes', 1, 0.4) * UIT(t, q.at('vuren') , 0.4), 'center');
      // rechts: legenda + één wisselend paneel tegelijk
      const px = 1440; legenda(ctx, px, 90, [['glutamaat', Z6.nt, q.on('glutamaat', 1, 0.4)], ['calcium', Z6.ca, q.on('calcium', 1, 0.4)], ['zenuwsignaal', Z6.sig, q.on('volgende', 1, 0.4)]]);
      const p1 = wissel(t, q.at('terwijl'), q.at('Hetzelfde'), 0.4); if (p1 > 0.01) { kaartje(ctx, px - 20, 250, 460, 330, p1); ctx.save(); ctx.globalAlpha *= p1; regel(ctx, 'toevalsdetector', px + 210, 300, 1, C.goud, 32, 'center', 700);
        const c1 = q.on('glutamaat', 1, 0.3), c2 = q.on('volgende', 1, 0.3); [['eindknopje actief', c1, 350], ['volgende cel actief', c2, 420]].forEach(([s2, v, yy]) => { circ(ctx, px + 24, yy - 11, 14, v > 0.5 ? Z6.sig : '#3A4A66', '#8FA0B5', 2); regel(ctx, s2, px + 52, yy, 1, C.text, 30, 'left', 600); });
        const beide = q.on('tegelijk', 2, 0.4); regel(ctx, 'beide → calcium erin', px + 210, 520, beide, C.text, 32, 'center', 700); ctx.restore(); }
      const p2 = wissel(t, q.at('Hetzelfde'), q.at('vuren'), 0.4); if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; kaartje(ctx, px - 20, 250, 460, 240, 1); regel(ctx, 'reactie op één signaal', px + 210, 300, 1, C.text2, 28, 'center', 700);
        balk(ctx, px + 110, 340, 300, 0.3, Z6.sig, null, 1); regel(ctx, 'eerst', px + 96, 370, 1, C.text2, 28, 'right', 600); balk(ctx, px + 110, 410, 300, lerp(0.3, 0.85, q.on('grotere', 1, 0.8)), Z6.sig, null, q.on('grotere', 1, 0.4)); regel(ctx, 'nu', px + 96, 440, q.on('grotere', 1, 0.4), C.text2, 28, 'right', 600);
        // tijdbalk minuten ↔ maanden
        const tb = q.on('minuten', 1, 0.4); if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; kaartje(ctx, px - 20, 530, 460, 200, 1); regel(ctx, 'hoe lang?', px + 210, 580, 1, C.text2, 28, 'center', 700);
          ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px + 30, 640); ctx.lineTo(px + 390, 640); ctx.stroke(); metaText(ctx, 'minuten', px + 30, 690, C.grain, 'left', 28); metaText(ctx, 'maanden', px + 390, 690, C.grain, 'right', 28);
          const m = lerp(px + 40, px + 380, q.on('maanden', 1, 1)); circ(ctx, m, 640, 13, C.goud); regel(ctx, q.on('maanden', 1, 0.3) > 0.5 ? 'blijvend' : 'tijdelijk', m, 620 - 6, 1, C.goud, 28, 'center', 700); ctx.restore(); }
        ctx.restore(); }
      haak(ctx, 1440, 1860, 760, 'samen vuren → verbonden', C.groen, q.on('samen', 1, 0.5)); } },

  // ---------- H2 patroon: een nummer = veel cellen die samen een patroon vormen
  s21(ctx, t, q) { bgS(ctx); const P = netwerkPunten(34, 110, 110, 1180, 720, 21), E = netwerkLijnen(P, 230);
    const groep = { tonen: [9, 10, 16], ritme: [15, 22], stem: [17, 23], plek: [11, 18, 24] }; const pat = [].concat(groep.tonen, groep.ritme, groep.stem, groep.plek);
    const tRest = q.at('rest'), tTwee = q.at('twee'), dood = 18;
    // verspreiding: afstand (in stappen) vanaf de twee toon-cellen binnen het patroon
    const dist = {}; { const st = [9, 10]; st.forEach(i => dist[i] = 0); let fr = st.slice(); for (let d = 1; d < 6; d++) { const nf = []; fr.forEach(i => E.forEach(([a, b]) => { const j = a === i ? b : b === i ? a : -1; if (j >= 0 && pat.includes(j) && dist[j] == null) { dist[j] = d; nf.push(j); } })); fr = nf; } }
    const act = (i) => { let v = 0; for (const [k, w] of [['tonen', 'tonen'], ['ritme', 'ritme'], ['stem', 'stem'], ['plek', 'waar']]) if (groep[k].includes(i)) v = Math.max(v, wissel(t, q.at(w), q.at('Door'), 0.3));
      if (t > tTwee - 0.1 && (i === 9 || i === 10)) v = Math.max(v, 1); if (pat.includes(i) && dist[i] != null) v = Math.max(v, ramp(t, tRest - 0.3 + dist[i] * 0.35, 0.3));
      if (t > q.at('verspreid') && pat.includes(i)) v = Math.max(v, 0.55 + 0.45 * PULS(t, 0.7)); if (i === dood) v *= 1 - q.on('uitvalt', 1, 0.4); return v * UIT(t, 30.6, 0.1) + (t > 30.6 ? 0 : 0); };
    netwerk(ctx, P, E, { pat, sterk: q.on('sterker', 1, 1.2), act, dood, doodA: q.on('één', 1, 0.5), r: 17, t });
    // patroon omlijnen
    const pp = q.on('patroon', 1, 0.5) * UIT(t, q.at('twee') - 0.4, 0.4) + q.on('deel', 1, 0.4) * UIT(t, q.at('omdat'), 0.4); if (pp > 0.01) { ctx.save(); ctx.globalAlpha *= pp; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); bioPad(ctx, [[440, 280], [760, 230], [900, 420], [800, 640], [480, 620], [380, 450]], true); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'patroon', null, 640, 210, pp, 'center', C.goud); }
    if (t > tTwee - 0.2) for (let k = 0; k < 2; k++) noot(ctx, P[9 + k][0] - 30 + k * 10, P[9 + k][1] - 40, 0.9, wissel(t, tTwee + k * 0.3, q.at('rest'), 0.3));
    // rechts: één nummer = …
    const px = 1370; kaartje(ctx, px - 20, 140, 520, 440, ramp(t, 0, 0.4)); regel(ctx, 'één nummer', px + 240, 200, ramp(t, 0, 0.4), C.text, 36, 'center', 700);
    [['de tonen', 'tonen'], ['het ritme', 'ritme'], ['de stem', 'stem'], ['waar je was', 'waar']].forEach(([s2, w], i) => { const a = q.on(w, 1, 0.4); circ(ctx, px + 24, 266 + i * 64, 10, wissel(t, q.at(w), q.at('Door'), 0.3) > 0.5 ? Z6.sig : '#3A4A66', null); regel(ctx, s2, px + 50, 278 + i * 64, a, C.text, 34, 'left', 600); });
    regel(ctx, 'sterker door vaak luisteren', px + 240, 545, q.on('sterker', 1, 0.4), Z6.sig, 30, 'center', 700);
    const dg = q.on('deel', 1, 0.5); if (dg > 0.01) { tag(ctx, 'deel → geheel', px + 240, 690, C.goud, dg, 'center', 34); metaText(ctx, 'twee tonen → het hele nummer', px + 240, 750, C.grain, 'center', 28); }
    const uv = q.on('één', 1, 0.4); if (uv > 0.01) regel(ctx, 'één cel weg: nummer blijft', px + 240, 830, uv, C.text, 32, 'center', 700);
    if (q.on('hele', 1, 0.4) > 0.01) noot(ctx, 1150, 170, 1.4, wissel(t, q.at('hele'), q.at('deel') + 0.8, 0.3)); },

  // ---------- H2 Pavlov
  s22(ctx, t, q) { bgS(ctx); const jouT = q.at('Bij'); const fdog = UIT(t, jouT - 0.2, 0.6);
    if (fdog > 0.01) { ctx.save(); ctx.globalAlpha *= fdog; const ds = 0.66, dx = 140, dy = 300; if (HOND_IMG.complete) ctx.drawImage(HOND_IMG, dx, dy, 615 * ds, 535 * ds);
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(80, dy + 535 * ds); ctx.lineTo(820, dy + 535 * ds); ctx.stroke();
      const mond = [dx + 560 * ds, dy + 170 * ds];
      const ring = (w, n) => { const u = (t - q.at(w, n)); return u > 0 && u < 1.6 ? Math.sin(u * 14) * 0.25 * (1 - u / 1.6) : 0; };
      const sw = ring('bel', 1) + ring('bel', 2) + ring('bel', 3) + ring('bel', 4);
      bel(ctx, 640, 210, 1.1, ramp(t, 0, 0.3) * 1, sw); belGolf(ctx, 640, 210, clamp(Math.abs(sw) * 3, 0, 1), Math.abs(sw) > 0.02 ? 1 : 0);
      const eten = Math.max(wissel(t, q.at('eten', 1), q.at('bel', 2) - 0.2, 0.3), wissel(t, q.at('eten', 3), q.at('Na'), 0.3));
      etensbak(ctx, dx + 640 * ds, dy + 535 * ds, 1.25, 1, eten);
      const kwijl = Math.max(wissel(t, q.at('speeksel', 1), q.at('bel', 2) - 0.2, 0.3), wissel(t, q.at('samen') - 0.5, q.at('Na') - 0.1, 0.3), wissel(t, q.at('speeksel', 3), q.at('Bij') - 0.2, 0.3));
      for (let k = 0; k < 3; k++) { const u = ((t * 0.9 + k / 3) % 1); druppel(ctx, mond[0] - 10, mond[1] + 10 + u * 60, 8, kwijl * (1 - u)); }
      if (t > q.at('bel', 2) - 0.2 && t < q.at('Maar')) kruis(ctx, mond[0] + 50, mond[1] + 30, 18, wissel(t, q.at('geen'), q.at('Maar'), 0.3), C.koraal);
      tag(ctx, 'Ivan Pavlov · rond 1900', 440, 120, C.text2, wissel(t, q.at('Pavlov'), q.at('Eten'), 0.4), 'center', 32);
      ctx.restore(); }
    // rechts: de vier koppelregels
    const px = 880, rij = (i, a, links, rechts, tekst) => { if (a <= 0.01) return; const y = 170 + i * 150; kaartje(ctx, px, y, 980, 128, a); ctx.save(); ctx.globalAlpha *= a; links(px + 70, y + 64); pijl(ctx, px + 190, y + 64, px + 330, y + 64, C.line, 1, 3, 14); rechts(px + 380, y + 64); regel(ctx, tekst, px + 450, y + 76, 1, C.text, 32, 'left', 600); ctx.restore(); };
    const uit2 = UIT(t, jouT - 0.2, 0.5);
    const bakje = (x, y) => etensbak(ctx, x, y + 20, 0.8, 1, 1), belle = (x, y) => bel(ctx, x, y + 6, 0.6, 1, 0), sp = (x, y) => druppel(ctx, x, y, 12, 1), geen = (x, y) => kruis(ctx, x, y, 16, 1, C.koraal);
    rij(0, q.on('ongeconditioneerde', 1, 0.4) * uit2, bakje, sp, 'eten: ongeconditioneerde prikkel'); if (q.on('reflex', 1, 0.3) * uit2 > 0.01) { ctx.save(); ctx.globalAlpha *= uit2; metaText(ctx, 'speeksel = reflex', px + 450, 280, C.grain, 'left', 28); ctx.restore(); }
    rij(1, q.on('neutrale', 1, 0.4) * uit2, belle, geen, 'bel: neutrale prikkel');
    rij(2, q.on('steeds', 1, 0.4) * uit2, (x, y) => { belle(x - 34, y); bakje(x + 34, y); }, sp, 'bel + eten, steeds samen'); if (q.on('steeds', 1, 0.4) * uit2 > 0.01) metaText(ctx, '× 10', px + 940, 500, C.grain, 'right', 28);
    rij(3, q.on('geconditioneerde', 2, 0.4) * uit2, belle, sp, 'bel: geconditioneerde prikkel');
    tag(ctx, 'klassieke conditionering', 1370, 100, C.goud, q.on('klassieke', 1, 0.4) * uit2, 'center', 36);
    // bij jou: friet
    const ja = q.on('Bij', 1, 0.6); if (ja > 0.01) { ctx.save(); ctx.globalAlpha *= ja; persoon(ctx, 'noor', 620, 840, 520, { uit: t > q.at('mond') ? 'blij' : 'neutraal', t }); frietbak(ctx, 1000, 640, 1.6, q.on('friet', 1, 0.4));
      ctx.strokeStyle = rgba(C.oker, 0.6); ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); ctx.save(); ctx.globalAlpha *= q.on('friet', 1, 0.4) * (1 - u); ctx.beginPath(); ctx.moveTo(960 - k * 20 - u * 160, 520 - u * 60); ctx.quadraticCurveTo(930 - k * 20 - u * 160, 490 - u * 60, 950 - k * 20 - u * 160, 460 - u * 60); ctx.stroke(); ctx.restore(); }
      druppel(ctx, 720, 400, 12, q.on('water', 1, 0.4)); tag(ctx, 'friet → speeksel', 1350, 400, C.text2, q.on('water', 1, 0.4), 'center', 34); tag(ctx, 'net als bij de hond', 1350, 490, C.text2, q.on('water', 1, 0.4), 'center', 30); ctx.restore(); } },

  // ---------- H2 vraag
  q2(ctx, t, q) { bgS(ctx); const ds = 0.6, dx = 160, dy = 300; if (HOND_IMG.complete) ctx.drawImage(HOND_IMG, dx, dy, 615 * ds, 535 * ds);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(100, dy + 535 * ds); ctx.lineTo(760, dy + 535 * ds); ctx.stroke();
    const sw = Math.sin(t * 12) * 0.2 * (((t % 2.4) < 1.2) ? 1 : 0); bel(ctx, 620, 230, 1.0, 1, sw); etensbak(ctx, dx + 640 * ds, dy + 535 * ds, 1.2, 1, 0); kruis(ctx, dx + 640 * ds, dy + 535 * ds - 50, 16, q.on('geen', 1, 0.3), C.koraal);
    vraagteken(ctx, dx + 600 * ds, dy + 60, q.on('speeksel', 1, 0.4), 90);
    const mini = (i, a, f) => { const x = 900 + i * 320; kaartje(ctx, x, 520, 280, 260, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x + 40, 560, 200, 160, null, 'speeksel'); ctx.strokeStyle = Z6.sig; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20; ctx[k ? 'lineTo' : 'moveTo'](x + 44 + u * 196, 720 - f(u) * 140); } ctx.stroke(); metaText(ctx, 'keer', x + 240, 760, C.grain, 'right', 28); ctx.restore(); };
    mini(0, q.on('hond', 1, 0.4), u => 0.8); mini(1, q.on('Het', 2, 0.4), u => 0.8 - 0.65 * u); mini(2, q.on('Of', 1, 0.4), u => 0.5 + 0.45 * u); },

  // ---------- H2 antwoord: uitdoven en spontaan herstel
  a2(ctx, t, q) { bgS(ctx); const gx = 140, gy = 180, gw = 1000, gh = 560; assen(ctx, gx, gy, gw, gh, 'keer', 'speeksel bij de bel'); metaText(ctx, 'schets', gx + gw, gy - 16, C.text2, 'right', 28);
    const f = (u) => u < 0.32 ? 0.85 * (1 - Math.exp(-u * 12)) : u < 0.68 ? 0.85 * Math.exp(-(u - 0.32) * 8) : u < 0.76 ? null : 0.38 * Math.exp(-(u - 0.76) * 9);
    const teken = (u0, u1, kl, a = 1, dun = false) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = dun ? 3 : 6; ctx.beginPath(); let st = false; for (let k = 0; k <= 200; k++) { const u = lerp(u0, u1, k / 200), v = f(u); if (v == null) { st = false; continue; } const X = gx + u * gw, Y = gy + gh - v * gh * 0.95; if (!st) { ctx.moveTo(X, Y); st = true; } else ctx.lineTo(X, Y); } ctx.stroke(); ctx.restore(); };
    teken(0, 0.32, '#8FA0B5', 1); regel(ctx, 'bel + eten', gx + 0.16 * gw, gy + 90, 1, C.text2, 30, 'center', 600);
    const ex = ramp(t, q.at('Komt'), 2.6); teken(0.32, 0.32 + 0.36 * ex, Z6.sig, 1); regel(ctx, 'bel zonder eten', gx + 0.5 * gw, gy + 90, q.on('zonder', 1, 0.4), C.text, 30, 'center', 600);
    naamBij(ctx, 'uitdoven', 'extinctie', gx + 0.52 * gw, gy + gh - 0.3 * gh, q.on('uitdoven', 1, 0.4), 'left', C.goud);
    const pz = q.on('pauze', 1, 0.4); if (pz > 0.01) { ctx.save(); ctx.globalAlpha *= pz; ctx.fillStyle = rgba('#FFFFFF', 0.05); ctx.fillRect(gx + 0.68 * gw, gy, 0.08 * gw, gh); metaText(ctx, 'pauze', gx + 0.72 * gw, gy + gh + 34, C.grain, 'center', 28); ctx.restore(); }
    teken(0.76, 0.76 + 0.24 * ramp(t, q.at('terugkomen'), 1.6), Z6.sig, q.on('terugkomen', 1, 0.3)); naamBij(ctx, 'even terug', 'wat zwakker', gx + 0.8 * gw, gy + gh - 0.48 * gh, q.on('terugkomen', 1, 0.4), 'left', C.text);
    const px = 1260; const k1 = q.on('koppeling', 1, 0.4); kaartje(ctx, px, 200, 580, 380, k1); if (k1 > 0.01) { ctx.save(); ctx.globalAlpha *= k1; regel(ctx, 'wat de hond weet', px + 290, 252, 1, C.text2, 30, 'center', 700);
      bel(ctx, px + 60, 330, 0.5, 1, 0); pijl(ctx, px + 100, 330, px + 170, 330, C.line, 1, 3, 12); etensbak(ctx, px + 220, 350, 0.6, 1, 1); regel(ctx, 'oud: blijft bewaard', px + 290, 345, q.on('gewist', 1, 0.4), C.text, 30, 'left', 600);
      const nb = q.on('betekent', 1, 0.4); ctx.globalAlpha *= nb; bel(ctx, px + 60, 470, 0.5, 1, 0); pijl(ctx, px + 100, 470, px + 170, 470, C.line, 1, 3, 12); etensbak(ctx, px + 220, 490, 0.6, 1, 0); kruis(ctx, px + 220, 455, 14, 1, C.koraal); regel(ctx, 'nieuw: erbij geleerd', px + 290, 485, 1, C.text, 30, 'left', 600); ctx.restore(); }
    haak(ctx, px + 40, px + 540, 620, 'ook uitdoven is leren', C.groen, q.on('leren', 1, 0.5)); },

  // ---------- H3 Henry: hippocampus weggehaald
  s31(ctx, t, q) { bgS(ctx); const herstel = q.on('De', 2, 0.6) /* 'De hippocampus legt …' */; const tF = q.at('hippocampus', 2);
    const B = hersenZij(ctx, 700, 450, 1.18, { hl: { slaap: wissel(t, q.at('slaapkwab'), q.at('hippocampus'), 0.4), hippo: q.on('hippocampus', 1, 0.5) }, weg: q.on('weggehaald', 1, 0.6) * UIT(t, tF - 0.2, 0.6) });
    naamBij(ctx, 'slaapkwab', null, B.slaap[0] + 40, B.slaap[1] + 110, q.on('slaapkwab', 1, 0.4) * UIT(t, q.at('hippocampus'), 0.4), 'center');
    naamBij(ctx, 'weggehaald', 'links én rechts', B.slaap[0] + 230, B.slaap[1] + 30, q.on('weggehaald', 1, 0.4) * UIT(t, q.at('hippocampus'), 0.4), 'left', C.koraal);
    naamBij(ctx, 'hippocampus', 'diep in de slaapkwab', B.hippo[0] + 40, B.hippo[1] + 120, q.on('hippocampus', 1, 0.4), 'center', C.goud);
    // archiefkaart + gevolgen
    const px = 1260, k0 = ramp(t, 0, 0.4) * UIT(t, tF - 0.3, 0.5); kaartje(ctx, px, 110, 600, 170, k0); if (k0 > 0.01) { ctx.save(); ctx.globalAlpha *= k0; regel(ctx, 'Henry Molaison (H.M.)', px + 30, 165, 1, C.text, 36, 'left', 700); metaText(ctx, '1926–2008 · operatie in 1953', px + 30, 210, C.grain, 'left', 28); regel(ctx, 'tegen zware epilepsie', px + 30, 255, q.on('epilepsie', 1, 0.4), C.text2, 30, 'left', 600); ctx.restore(); }
    const lijst = [['aanvallen minder', 'aanvallen', 'v'], ['nieuwe herinneringen: lukt niet', 'herinneringen', 'x'], ['na een halve minuut weg', 'minuut', 'k'], ['jeugd: nog wel', 'jeugd', 'v']];
    lijst.forEach(([s2, w, sym], i) => { const a = q.on(w, 1, 0.4) * UIT(t, tF - 0.3, 0.5); if (a <= 0.01) return; const y = 360 + i * 110; kaartje(ctx, px, y - 52, 600, 90, a); if (sym === 'v') vink_(ctx, px + 46, y - 8, 18, a); else if (sym === 'x') kruis(ctx, px + 46, y - 8, 16, a, C.koraal); else klokje(ctx, px + 46, y - 8, 24, 0.5, a); regel(ctx, s2, px + 90, y + 4, a, C.text, 32, 'left', 600); });
    // functie: legt vast en geeft later door aan de schors
    const fa = q.on('hippocampus', 2, 0.5); if (fa > 0.01) { ctx.save(); ctx.globalAlpha *= fa; kaartje(ctx, px, 200, 600, 420, 1); regel(ctx, 'hippocampus', px + 300, 260, 1, C.goud, 36, 'center', 700);
      regel(ctx, 'legt nieuwe herinneringen vast', px + 300, 330, q.on('legt', 1, 0.4), C.text, 32, 'center', 600); metaText(ctx, 'gebeurtenissen en feiten', px + 300, 380, C.grain, 'center', 28);
      pijl(ctx, px + 300, 420, px + 300, 500, C.goud, q.on('later', 1, 0.4), 3, 14); regel(ctx, 'later: naar de schors', px + 300, 560, q.on('later', 1, 0.4), C.text, 32, 'center', 600); ctx.restore();
      const sch = q.on('schors', 1, 0.5); if (sch > 0.01) { const S = B.schors; ctx.save(); ctx.globalAlpha *= sch; ctx.setLineDash([8, 7]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(B.hippo[0], B.hippo[1]); ctx.quadraticCurveTo(B.hippo[0] - 200, B.hippo[1] - 120, S[0], S[1] + 20); ctx.stroke(); ctx.restore(); naamBij(ctx, 'schors', null, S[0], S[1] - 20, sch, 'center', C.goud); } } },

  // ---------- H3 vraag: spiegeltekenen
  q3(ctx, t, q) { bgS(ctx); const cx = 760; // papier (bovenaanzicht) met ster, een schot ervoor en een spiegel erachter
    roundRect(ctx, cx - 260, 470, 520, 320, 10); shape(ctx, '#E8E4D8', '#B8B2A0', 2); ster(ctx, cx, 630, 120, { kl: '#5A6478', lw: 6 }); ster(ctx, cx, 630, 120, { kl: C.koraal, lw: 4, wiebel: 1, deel: clamp((t - q.at('natekenen')) / 7, 0, 1), seed: 2 });
    roundRect(ctx, cx - 300, 380, 600, 40, 8); shape(ctx, '#3A4A66', '#8FA0B5', 2); metaText(ctx, 'schot: je ziet je hand niet', cx, 360, C.grain, 'center', 28);
    roundRect(ctx, cx - 280, 110, 560, 220, 10); shape(ctx, rgba('#AFC0D0', 0.18), '#AFC0D0', 3); ctx.save(); ctx.translate(0, 2 * 220); ctx.scale(1, -1); ctx.globalAlpha *= 0.85; ster(ctx, cx, 220 + 0, 80, { kl: '#8FA0B5', lw: 4 }); ster(ctx, cx, 220, 80, { kl: C.koraal, lw: 3, wiebel: 1, deel: clamp((t - q.at('natekenen')) / 7, 0, 1), seed: 2 }); ctx.restore();
    naamBij(ctx, 'spiegel', null, cx + 300, 160, q.on('spiegel', 1, 0.4), 'left'); naamBij(ctx, 'ster natekenen', null, cx + 280, 640, q.on('ster', 1, 0.4), 'left');
    vraagteken(ctx, 1480, 420, q.on('beter', 1, 0.4), 140); },

  // ---------- H3 antwoord: beter worden zonder het te weten; weten wát en weten hoe
  a3(ctx, t, q) { bgS(ctx); const tW = q.at('Weten'), g = UIT(t, tW - 0.3, 0.5);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; const gx = 150, gy = 220, gw = 640, gh = 460; assen(ctx, gx, gy, gw, gh, null, 'fouten bij spiegeltekenen'); metaText(ctx, 'schets', gx + gw, gy - 16, C.text2, 'right', 28);
      [0.9, 0.6, 0.38].forEach((v, i) => { const a = ramp(t, q.at('beter') - 0.4 + i * 0.35, 0.4); const bx = gx + 80 + i * 200; roundRect(ctx, bx, gy + gh - v * gh * a, 110, v * gh * a, 8); shape(ctx, rgba(Z6.sig, 0.6), Z6.sig, 2); metaText(ctx, 'dag ' + (i + 1), bx + 55, gy + gh + 36, C.grain, 'center', 28);
        spraakwolk(ctx, bx + 55, gy + gh - v * gh - 70, 180, 64, q.on('nooit', 1, 0.4) * ramp(t, q.at('nooit') + i * 0.25, 0.3), -1, () => regel(ctx, 'nooit gedaan', bx + 55, gy + gh - v * gh - 60, 1, '#121A26', 28, 'center', 700)); });
      ctx.restore(); }
    const twee = q.on('Weten', 1, 0.5); const hWat = wissel(t, tW, q.at('hoe'), 0.3), hHoe = q.on('hoe', 1, 0.4);
    const B = hersenZij(ctx, 1350, 420, 0.95, { hl: { hippo: hWat, klein: Math.max(wissel(t, q.at('kleine'), tW, 0.4), hHoe), basaal: Math.max(wissel(t, q.at('basale'), tW, 0.4), hHoe), motor: Math.max(wissel(t, q.at('motorische'), tW, 0.4), hHoe) } });
    const hipX = q.on('hippocampus', 1, 0.4) * UIT(t, tW, 0.4); kruis(ctx, B.hippo[0], B.hippo[1], 26, hipX, C.koraal);
    naamBij(ctx, 'hippocampus', null, B.hippo[0] + 20, B.hippo[1] + 110, Math.max(hipX, hWat), 'center', hWat > 0.5 ? C.goud : C.text);
    naamBij(ctx, 'kleine hersenen', null, B.klein[0] - 30, B.klein[1] + 100, q.on('kleine', 1, 0.4), 'center');
    naamBij(ctx, 'basale kernen', 'diep', B.basaal[0] + 10, B.basaal[1] - 20, q.on('basale', 1, 0.4), 'center');
    naamBij(ctx, 'motorische schors', null, B.motor[0], B.motor[1] - 140, q.on('motorische', 1, 0.4), 'center');
    if (twee > 0.01) { ctx.save(); ctx.globalAlpha *= twee; const kol = (x, kop, regels, a, hl) => { kaartje(ctx, x, 220, 400, 470, a, hl > 0.5 ? C.goud : C.line); ctx.save(); ctx.globalAlpha *= a; regel(ctx, kop, x + 200, 285, 1, hl > 0.5 ? C.goud : C.text, 40, 'center', 700); regels.forEach((r, i) => regel(ctx, r, x + 200, 350 + i * 48, 1, i === 0 ? C.text : C.text2, i === 0 ? 32 : 28, 'center', i === 0 ? 600 : 400)); ctx.restore(); };
      kol(120, 'weten wát', ['feiten en gebeurtenissen', 'via de hippocampus'], 1, hWat); kol(560, 'weten hoe', ['vaardigheden', 'kleine hersenen', 'basale kernen', 'motorische schors'], q.on('hoe', 1, 0.4), hHoe);
      const fz = q.on('Fietsen', 1, 0.6); if (fz > 0.01) fiets(ctx, 'lotte', 760, 670, 200, { a: fz, hoek: t * 2, rol: t * 3 }); ctx.restore(); } },

  // ---------- H4 vraag: drie uur leren
  q4(ctx, t, q) { bgS(ctx); const x0 = 380, cw = 330; ['dag 1', 'dag 2', 'dag 3', 'toets'].forEach((d, i) => { metaText(ctx, d, x0 + i * cw + cw / 2, 170, i === 3 ? C.goud : C.grain, 'center', 28); ctx.strokeStyle = rgba('#8FA0B5', 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 + i * cw, 190); ctx.lineTo(x0 + i * cw, 820); ctx.stroke(); });
    const rij = (i, a, blokken, extra) => { if (a <= 0.01) return; const y = 240 + i * 200; ctx.save(); ctx.globalAlpha *= a; blokken.forEach(([d, uur]) => { roundRect(ctx, x0 + d * cw + 20, y, cw * 0.28 * uur, 120, 10); shape(ctx, rgba(C.goud, 0.35), C.goud, 2); regel(ctx, uur + ' uur', x0 + d * cw + 20 + cw * 0.14 * uur, y + 72, 1, C.text, 30, 'center', 700); }); if (extra) extra(y); ctx.restore(); };
    vraagteken(ctx, 220, 420, q.on('hangen', 1, 0.4), 120);
    rij(0, q.on('avond', 1, 0.4), [[2.1, 3]]); rij(1, q.on('verspreid', 1, 0.4), [[0, 1], [1, 1], [2, 1]]); rij(2, q.on('Of', 1, 0.4), [], (y) => { regel(ctx, 'uur is uur?', x0 + 1.5 * cw, y + 76, 1, C.text, 40, 'center', 700); }); },

  // ---------- H4 antwoord: gespreid leren en snoeien
  a4(ctx, t, q) { bgS(ctx); const tS = q.at('Synapsen'), g = UIT(t, tS - 0.4, 0.5);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; const gx = 150, gy = 180, gw = 1150, gh = 560; assen(ctx, gx, gy, gw, gh, 'tijd', 'wat je nog weet'); metaText(ctx, 'schets, geen meting', gx + gw, gy - 16, C.text2, 'right', 28);
      const een = (u) => u < 0.62 ? 0 : u < 0.66 ? (u - 0.62) / 0.04 * 0.9 : 0.9 * Math.exp(-(u - 0.66) * 5.5);
      const spr = (u) => { const pk = [0.12, 0.38, 0.62], dec = [7, 4, 2.2]; let v = 0; for (let k = 0; k < 3; k++) { if (u < pk[k]) break; const base = k ? v : 0; v = u < pk[k] + 0.03 ? lerp(base, 0.9, (u - pk[k]) / 0.03) : 0.9 * Math.exp(-(u - pk[k] - 0.03) * dec[k]); } return v; };
      const lijn = (f, kl, a, lw = 6) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); for (let k = 0; k <= 300; k++) { const u = k / 300; ctx[k ? 'lineTo' : 'moveTo'](gx + u * gw, gy + gh - f(u) * gh * 0.95); } ctx.stroke(); ctx.restore(); };
      lijn(een, '#8FA0B5', 1, 4); regel(ctx, 'drie uur in één keer', gx + gw - 10, gy + gh - 40, 1, C.text2, 30, 'right', 600);
      lijn(spr, Z6.sig, q.on('Gespreid', 1, 0.6)); regel(ctx, '3 × 1 uur, gespreid', gx + 0.12 * gw, gy + 80, q.on('Gespreid', 1, 0.4), Z6.sig, 30, 'left', 700);
      ctx.save(); ctx.globalAlpha *= q.on('ophaalt', 1, 0.4); [0.38, 0.62].forEach((u) => { circ(ctx, gx + (u + 0.03) * gw, gy + gh - 0.9 * gh * 0.95, 11, C.goud); regel(ctx, 'weer ophalen', gx + (u + 0.03) * gw, gy + gh - 0.9 * gh * 0.95 - 26, 1, C.goud, 28, 'center', 700); });
      ctx.restore(); naamBij(ctx, 'steviger', null, gx + 0.95 * gw, gy + gh - 0.35 * gh, q.on('steviger', 1, 0.4), 'right', Z6.sig); metaText(ctx, 'toets', gx + 0.66 * gw, gy + gh + 36, C.grain, 'center', 28); ctx.restore(); }
    const n = q.on('Synapsen', 1, 0.5); if (n > 0.01) { ctx.save(); ctx.globalAlpha *= n; const P = netwerkPunten(28, 110, 180, 940, 640, 31), E = netwerkLijnen(P, 230); const vaak = new Set(E.map((e, k) => k).filter(k => hash(k * 7 + 3) > 0.45));
      const dun = (k) => vaak.has(k) ? 0 : q.on('weinig', 1, 0.6), weg = (k) => vaak.has(k) ? 0 : q.on('opgeruimd', 1, 1.2);
      const pat = [...new Set(E.filter((e, k) => vaak.has(k)).flatMap(e => [e[0], e[1]]))];
      netwerk(ctx, P, E, { pat, sterk: 0.5, dun, weg, act: i => q.on('efficiënter', 1, 0.5) * PULS(t + hash(i) , 0.9) * (pat.includes(i) ? 1 : 0), r: 15, t });
      naamBij(ctx, 'snoeien', null, 580, 110, q.on('snoeien', 1, 0.4), 'center', C.goud); legenda(ctx, 140, 860, [], 1);
      // rechts: voorhoofdskwab snoeit door tot ver na de puberteit
      const B = hersenZij(ctx, 1460, 360, 0.72, { hl: { voor: q.on('voorhoofdskwab', 1, 0.5) } }); naamBij(ctx, 'voorhoofdskwab', null, B.voor[0] + 20, B.voor[1] - 110, q.on('voorhoofdskwab', 1, 0.4), 'center', C.goud);
      const tl = q.on('puberteit', 1, 0.5); if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; const x0 = 1120, x1 = 1820, y = 700; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        ['kind', 'puberteit', 'volwassen'].forEach((s2, i) => { metaText(ctx, s2, lerp(x0, x1, i / 2), y + 44, C.grain, i === 0 ? 'left' : i === 2 ? 'right' : 'center', 28); });
        ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(x0 + 120, y - 30, (x1 - x0) * 0.8, 22); regel(ctx, 'snoeit flink', x0 + 120 + (x1 - x0) * 0.4, y - 46, 1, C.goud, 28, 'center', 700); ctx.restore(); }
      regel(ctx, 'geen verlies: efficiënter', 1460, 820, q.on('efficiënter', 1, 0.4) * UIT(t, q.at('Gebruik', 4), 0.3), C.text, 32, 'center', 700);
      tag(ctx, 'gebruik het, of raak het kwijt', 1460, 830, C.goud, q.on('Gebruik', 4, 0.4), 'center', 32); ctx.restore(); } },

  // ---------- H5 vraag: beginner tegenover ervaren fietser
  q5(ctx, t, q) { bgS(ctx); ctx.fillStyle = rgba(Z6.pad, 0.6); ctx.fillRect(0, GROND - 30, W, 60); const K = fietser(ctx, 'kind', 470, GROND + 4, 228, { t, cad: 0.5, kleur: '#C9503C', kantel: 0.04 * Math.sin(t * 8), uit: 'verbaasd', leun: 6 });
    metaText(ctx, 'beginner', 470, 360, C.grain, 'center', 28); if (K.P && K.P.hoofd) spraakwolk(ctx, K.P.hoofd.x + 10, K.P.hoofd.y - 110, 150, 60, q.on('praten', 1, 0.4), -1, () => kruis(ctx, K.P.hoofd.x + 10, K.P.hoofd.y - 110, 14, 1, C.koraal));
    const T = fietsTieners(ctx, t, 0, { xN: 1240, xY: 1400, kletsN: q.on('jaren', 1, 0.4) * (Math.sin(t * 3) > 0 ? 1 : 0.4), kletsY: q.on('jaren', 1, 0.4) * (Math.sin(t * 3) > 0 ? 0.4 : 1) });
    metaText(ctx, 'fietst al jaren', 1320, 220, C.grain, 'center', 28); vraagteken(ctx, 960, 300, q.on('dat', 1, 0.4), 120); },

  // ---------- H5 antwoord: automatiseren
  a5(ctx, t, q) { bgS(ctx); const tO = q.at('kleine'), vrij = q.on('vrij', 1, 0.6);
    const drukV = q.on('nadenken', 1, 0.6) * (1 - 0.8 * ramp(t, q.at('over', 2) - 0.2, 1.4)), kb = q.on('kleine', 1, 0.5), bk = q.on('basale', 1, 0.5);
    const B = hersenZij(ctx, 720, 450, 1.15, { hl: { voor: drukV > 0.2 ? drukV : 0, klein: kb, basaal: bk, motor: 0.35 * ramp(t, 0, 0.5) }, kl: { motor: C.goud } });
    naamBij(ctx, 'voorhoofdskwab', null, B.voor[0] + 40, B.voor[1] - 170, q.on('voorhoofdskwab', 1, 0.4) * UIT(t, tO, 0.4) + q.on('voorhoofdskwab', 2, 0.4) * UIT(t, q.at('automatiseren') - 0.2, 0.4), 'center', C.goud);
    naamBij(ctx, 'kleine hersenen', null, B.klein[0] - 20, B.klein[1] + 110, kb, 'center', C.goud); naamBij(ctx, 'basale kernen', null, B.basaal[0], B.basaal[1] - 20, bk, 'center', C.goud);
    // rondje 'bijsturen' om de kleine hersenen
    const bs = wissel(t, q.at('sturen', 2), q.at('Je', 1) + 2, 0.4); if (bs > 0.01) { ctx.save(); ctx.globalAlpha *= bs; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(B.klein[0], B.klein[1], 110, t * 2, t * 2 + 4.6); ctx.stroke(); ctx.restore(); }
    // rechts: drukte in de voorhoofdskwab + waar hij vrij voor is
    const px = 1340; kaartje(ctx, px, 150, 520, 300, ramp(t, 0, 0.4)); regel(ctx, 'voorhoofdskwab bezig', px + 260, 205, ramp(t, 0, 0.4), C.text2, 30, 'center', 700);
    balk(ctx, px + 40, 240, 440, lerp(0.15, 0.95, drukV), C.goud, null, ramp(t, 0, 0.4));
    ['sturen', 'trappen', 'evenwicht'].forEach((w, i) => tag(ctx, w, px + 90 + i * 172, 370, C.text2, q.on(w, 1, 0.4) * UIT(t, tO + 1.5, 0.5), 'center', 30));
    const vk = q.on('vrij', 1, 0.4); if (vk > 0.01) { kaartje(ctx, px, 500, 520, 300, vk); regel(ctx, 'vrij voor', px + 260, 555, vk, C.text2, 30, 'center', 700); [['praten', 'praten'], ['kijken', 'kijken'], ['de weg zoeken', 'zoeken']].forEach(([s2, w], i) => regel(ctx, s2, px + 260, 615 + i * 56, q.on(w, 1, 0.4), C.text, 34, 'center', 600)); }
    tag(ctx, 'automatiseren', 720, 110, C.goud, q.on('automatiseren', 1, 0.4), 'center', 40);
    regel(ctx, 'verleer je bijna nooit', 720, 860, q.on('nooit', 1, 0.4) * UIT(t, q.at('deel') + 0.8, 0.4), C.text, 34, 'center', 700);
    const sl = q.on('slaapt', 1, 0.5); if (sl > 0.01) { maan(ctx, 330, 160, 44, sl); regel(ctx, 'ook als je slaapt', 400, 175, sl, C.text, 34, 'left', 700); } },

  // ---------- Samenvatting (Macro): terug op het fietspad
  s70(ctx, t, q) { const X = 240 * t + 1400; straat(ctx, { x: X, grond: GROND }); fietsTieners(ctx, t, X, { xN: 360, xY: 520 });
    const px = 960; const pa = ramp(t, 0.3, 0.6); kaartje(ctx, px, 70, 900, 790, pa * 0.97); regel(ctx, 'samenvatting', px + 40, 130, pa, C.grain, 28, 'left', 700);
    const ITEMS = [['synapsen sterker, nieuwe voetjes', 'synapsen'], ['samen vuren → verbonden', 'samen'], ['fietsen: kleine hersenen, basale kernen', 'fietsen'], ['nummer: patroon in de schors', 'nummer'],
      ['reflex + bel: conditionering', 'reflex'], ['hippocampus legt vast', 'hippocampus'], ['niet gebruikt → gesnoeid', 'gesnoeid'], ['nooit af', 'nooit']];
    let laatste = -1; ITEMS.forEach(([s2, w], i) => { if (t >= q.at(w)) laatste = i; });
    ITEMS.forEach(([s2, w], i) => { const a = q.on(w, 1, 0.4); if (a <= 0.01) return; const y = 200 + i * 82; const nu = i === laatste; circ(ctx, px + 52, y - 12, 9, nu ? C.goud : '#5A6478'); regel(ctx, s2, px + 80, y, a * (nu ? 1 : 0.72), i === 7 ? C.goud : C.text, 36, 'left', nu ? 700 : 600); }); }
});
