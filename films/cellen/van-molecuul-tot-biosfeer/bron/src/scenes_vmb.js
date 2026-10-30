// ===== Van molecuul tot biosfeer 2.0 — scènes per alinea (beeld-remake 30 okt 2026, takes behouden) =====
// Elke scène hangt aan de woordtijden van de bestaande take: q.on('woord', n, duur) = 0→1 vanaf het n-de woord dat 'woord' bevat.
const KM = '#E2C44A'; // koolmeesgeel (buik), voor de koolmees-curve en labels

// koolmees als ankerpunt rechtsboven (s06–s08): 'een spiercel van de koolmees'; gouden stip op het hart
function meesMedaillon(ctx, a, t = 0, x = 1790, y = 160, r = 92) { if (a <= 0.01) return; A(ctx, a, () => {
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#16233A'; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip(); koolmees(ctx, x + 18, y + 40, 0.5); ctx.restore();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
  const hx = x + 18 + MEES_HART[0] * 0.5, hy = y + 40 + MEES_HART[1] * 0.5; circ(ctx, hx, hy, 5 + 1.5 * Math.max(0, Math.sin(t * 8)), C.goud);
  metaText(ctx, 'KOOLMEES', x, y + r + 30, C.grain, 'center', 22); }); }
// tak met koolmees (Schema-achtergrond, s04)
function takLijn(ctx, P, dik = 14) { lijn(ctx, P, '#6A5444', dik); lijn(ctx, P.map(([x, y]) => [x, y - dik * 0.25]), '#8A7058', dik * 0.3); }
// sneeuw
function sneeuw(ctx, t, a, x0, x1, y0, y1, n = 60) { if (a <= 0.01) return; A(ctx, a, () => { for (let i = 0; i < n; i++) { const u = (t * (0.06 + 0.04 * hash(i)) + hash(i + 3)) % 1; const x = x0 + hash(i + 7) * (x1 - x0) + Math.sin(t + i) * 12, y = lerp(y0, y1, u);
  circ(ctx, x, y, 2 + 2 * hash(i + 11), rgba('#F2F2EE', 0.85)); } }); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; A(ctx, a, () => { ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.15; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.62, y + Math.sin(an) * r * 1.62); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C', '#E0B64A', 2); }); }
function regenWolk(ctx, x, y, t, a = 1, tot = 780) { if (a <= 0.01) return; A(ctx, a, () => { for (let i = 0; i < 26; i++) { const u = (t * 0.7 + hash(i + 2)) % 1; const px = x - 140 + hash(i + 5) * 280, py = lerp(y + 40, tot, u); ctx.strokeStyle = rgba('#A8D0EA', 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 4, py + 16); ctx.stroke(); }
  for (const [dx, dy, r] of [[-90, 10, 50], [-30, -12, 66], [50, 0, 56], [110, 16, 42]]) circ(ctx, x + dx, y + dy, r, '#B8C4D2'); ctx.fillStyle = '#B8C4D2'; ctx.fillRect(x - 130, y + 10, 270, 50); }); }
// het bos voor s09/s11: alles met eigen sterkte (o.mezen, o.merels, o.eik, o.pad, o.rups)
function bosScene(ctx, t, o = {}) { const { mezen = 1, ringen = 0, merels = 0, pad = 0, nest = 0, hlEik = 0, nat = 0, hlBodem = 0 } = o;
  bosAchter(ctx); bosEiken(ctx);
  if (hlEik > 0.01) BOS_EIK.forEach(([x, y, s]) => A(ctx, hlEik, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x, y - 380 * s, 300 * s, 360 * s, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }));
  bosBodem(ctx, { hl: hlBodem, nat });
  BOS_MEZEN.forEach(([x, y, kj], i) => { A(ctx, mezen, () => { lijn(ctx, [[x - 46, y + 3], [x + 50, y - 3]], E2.stam, 6); koolmees(ctx, x, y, 0.32, { kijk: kj, houding: 'tak', takY: y }); });
    if (ringen > 0.01) A(ctx, ringen * mezen, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x - 6 * kj, y - 28, 52, 0, 6.283); ctx.stroke(); }); });
  if (nest > 0.01) nestje(ctx, 1290, 520, 1.0, 6, nest);
  BOS_MERELS.forEach(([x, y, kj], i) => A(ctx, merels, () => merel(ctx, x, y, 0.4, { kijk: kj, houding: i ? 'pikken' : 'staan' })));
  [[560, 812, 1.0], [1010, 818, 1.3], [1080, 822, 0.9], [1620, 808, 1.1]].forEach(([x, y, s]) => paddenstoel(ctx, x, y, s, { a: pad }));
}

Object.assign(SCENES, {
  // ---------- titel: vier medaillons van klein naar groot ----------
  title(ctx, t) { const M = [[1090, 760, 64, 0, 'molecuul'], [1290, 650, 90, 2, 'cel'], [1520, 520, 118, 6, 'organisme'], [1750, 350, 140, 10, 'biosfeer']];
    M.forEach(([x, y, r, i, n], k) => A(ctx, ramp(t, 0.6 + k * 0.4, 0.6), () => { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = i === 6 ? '#2A3E5C' : '#121A26'; ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip();
      if (i === 0) eiwitVouw(ctx, x, y, 0.42, 1, Array(46).fill('a'), { kleur: 'eiwit', t });
      else if (i === 2) hartspierCel(ctx, x, y, r * 2.1, { c: 0.5 + 0.5 * Math.sin(t * 3) });
      else if (i === 6) koolmees(ctx, x + 30, y + 60, 0.62);
      else aarde(ctx, x, y, r, 1, t);
      ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
      metaText(ctx, n.toUpperCase(), x, y + r + 32, C.grain, 'center', 22); })); },

  // ---------- s01: ziek in bed; griepvirussen in de keel; elk jaar een nieuwe prik; deurklink ----------
  s01(ctx, t, q) { const tD = q.at('deurklink'), aD = ramp(t, tD - 0.15, 0.5);
    if (aD < 0.99) { kamerAchter(ctx); const r = bedScene(ctx, 760, 700, t); const hx = r.hoofd ? r.hoofd.x : 610, hy = r.hoofd ? r.hoofd.y : 404;
      const zoom = q.on('neus', 1, 0.7) * (1 - q.on('veranderen', 1, 0.6));
      zoomCircle(ctx, 1320, 400, 250, hx + 46, hy + 92, 'keel · vergroot', zoom, () => { keelEpitheel(ctx, 1320, 430, 520, 500, { t, virussen: q.on('miljoenen', 1, 1.6), vr: 15 }); });
      naamBij(ctx, 'nieuwe griepvirussen', null, 1320, 112, zoom * q.on('griepvirussen', 1), 'center');
      const aV = q.on('veranderen', 1, 0.6); if (aV > 0.01) { virusVarianten(ctx, 1320, 330, 50, aV); ['JAAR 1', 'JAAR 2', 'JAAR 3'].forEach((s, i) => metaText(ctx, s, 1320 + (i - 1) * 134, 420, rgba(C.grain, aV), 'center', 22));
        naamBij(ctx, 'steeds een beetje anders', null, 1320, 210, aV, 'center'); }
      const aP = q.on('griepprik', 1, 0.6); if (aP > 0.01) { injectiespuit(ctx, 1440, 560, 3.2, { a: aP, rot: 0, vul: 0.17 }); tag(ctx, 'elk jaar een nieuwe griepprik', 1320, 700, C.teal, aP); }
      if (aD > 0.01) { ctx.fillStyle = rgba('#2E3C56', aD); ctx.fillRect(0, 0, W, H); } }
    if (aD > 0.01) A(ctx, aD, () => { deurKlink(ctx, 640, 1); griepVirus(ctx, 836, 487, 5);
      zoomCircle(ctx, 1420, 410, 260, 836, 487, 'op de deurklink · vergroot', 1, () => { ctx.fillStyle = '#AEB6C0'; ctx.fillRect(1100, 100, 640, 640); ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.moveTo(1100, 110 + i * 22); ctx.lineTo(1740, 104 + i * 22); ctx.stroke(); }
        griepVirus(ctx, 1420, 420, 120); });
      tag(ctx, 'eet niet', 1300, 800, C.text2, q.on('eet', 1)); tag(ctx, 'groeit niet', 1560, 800, C.text2, q.on('groeit', 1));
      vraagteken(ctx, 1790, 210, q.on('Leeft', 1), 120); }); },

  // ---------- s04: levenskenmerken; de koolmees vinkt ze af ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('koolmees') - 0.4, m = ramp(t, tN, 0.9);
    const cue = ['cellen', 'stofwisseling', 'groeit', 'plant', 'prikkels', 'constant'];
    const rows = KENM.map((s, i) => ({ s, a: q.on(cue[i], 1) })); const ck = (w, n = 1) => ({ ok: true, a: q.on(w, n) });
    const cols = [{ a: q.on('koolmees', 1), icoon: (cx, cy) => koolmees(ctx, cx + 10, cy + 20, 0.17), v: [ck('koolmees'), ck('rupsen'), ck('groeit', 2), ck('legt'), ck('vliegt'), ck('warm')] }];
    bord(ctx, lerp(460, 70, m), 150, lerp(1000, 880, m), rows, cols, q.on('levenskenmerken', 1));
    metaText(ctx, 'ELKE METHODE HEEFT EEN IETS ANDERE LIJST', lerp(960, 510, m), 640, rgba(C.text2, q.on('boek', 1) * (1 - m)), 'center', 22);
    // een plant beweegt ook, heel langzaam: buigt naar het licht
    const aPl = q.on('plant', 2, 0.6) * (1 - ramp(t, tN - 0.8, 0.6)); if (aPl > 0.01) { zon(ctx, 1830, 300, 34, aPl, t); kamerplant(ctx, 1640, 800, 1.3, ramp(t, q.at('plant', 2), 2.6), aPl); naamBij(ctx, 'plant', 'buigt naar het licht', 1640, 380, aPl, 'center'); }
    if (m <= 0.01) return;
    A(ctx, m, () => { const tR = q.at('rupsen'), tG = q.at('groeit', 2), tL = q.at('legt'), tV = q.at('vliegt'), tW = q.at('warm');
      const winter = ramp(t, tW - 0.4, 0.8); if (winter > 0.01) { ctx.fillStyle = rgba('#DCE4EC', 0.16 * winter); roundRect(ctx, 990, 130, 900, 740, 24); ctx.fill(); }
      takLijn(ctx, [[1000, 640], [1400, 622], [1880, 600]], 16); if (winter > 0.01) A(ctx, winter, () => lijn(ctx, [[1000, 630], [1400, 612], [1880, 590]], '#F2F2EE', 6));
      const aRups = q.on('rupsen', 1, 0.4) * (1 - ramp(t, tR + 0.7, 0.3)); if (aRups > 0.01) rups(ctx, 1630, 608, 0.3, { t, a: aRups, rot: -0.04 });
      // vliegen: weg (tV), boven blijven, terug op de tak vóór 'warm'
      const u1 = ramp(t, tV, 1.0), u2 = ramp(t, tW - 1.4, 1.0), vlieg = t > tV && t < tW - 0.4;
      const bx = 1420 + 300 * u1 - 300 * u2, by = 628 - 300 * u1 + 300 * u2;
      const pik = t > tR && t < tR + 1.4;
      koolmees(ctx, bx, by, 1.5, vlieg ? { houding: 'vliegen', t: t * 4 } : pik ? { houding: 'pikken', prooi: t > tR + 0.6 ? (c, px, py) => rups(c, px + 34, py + 6, 0.2, { rot: 0.4 }) : null } : { houding: 'tak', takY: by, prooi: t > tR + 0.6 && t < tG ? (c, px, py) => rups(c, px + 34, py + 6, 0.2, { rot: 0.4 }) : null });
      const aEi = q.on('groeit', 2, 0.5) * (1 - ramp(t, tL - 0.2, 0.4)); if (aEi > 0.01) { meesEi(ctx, 1170, 420, 9, { a: aEi, barst: ramp(t, tG + 0.4, 1.2) }); naamBij(ctx, 'ei', null, 1170, 300, aEi, 'center'); }
      const aN = q.on('legt', 1, 0.5) * (1 - ramp(t, tV + 0.6, 0.6)); nestje(ctx, 1170, 470, 3.0, Math.round(clamp((t - tL) * 4, 0, 6)), aN);
      sneeuw(ctx, t, winter, 1000, 1880, 140, 860);
      tag(ctx, 'blijft warm, ook als het vriest', 1440, 800, C.koraal, winter * (1 - q.on('koolmees', 2)));
      tag(ctx, 'een koolmees leeft', 1440, 800, C.groen, q.on('koolmees', 2)); }); },

  // ---------- s05: een los eiwit leeft niet; een bacterie wel ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('bacterie'), dim = 1 - 0.65 * ramp(t, tB, 0.6);
    A(ctx, dim, () => { koolmees(ctx, 230, 860, 0.75);
      zoomCircle(ctx, 620, 380, 240, 230, 800, 'eiwit uit de koolmees · vergroot', ramp(t, 0.2, 0.6), () => { ctx.fillStyle = '#121A26'; ctx.fillRect(380, 140, 480, 480); eiwitVouw(ctx, 620, 390, 1.15, 1, Array(46).fill('a'), { kleur: 'eiwit', t }); });
      kruis(ctx, 850, 170, 26, q.on('niet', 1)); naamBij(ctx, 'leeft niet', null, 890, 182, q.on('niet', 1), 'left', C.koraal);
      tag(ctx, 'neemt geen stoffen op', 620, 760, C.koraal, q.on('stoffen', 1)); tag(ctx, 'plant zich niet voort', 620, 836, C.koraal, q.on('voort', 1)); });
    const aB = q.on('bacterie', 1, 0.6); bacterieEcht(ctx, 1400, 380, 500, { a: aB, t });
    naamBij(ctx, 'bacterie', 'één cel · ± 2 µm, vergroot', 1400, 620, aB * q.on('cel', 1), 'center');
    for (let i = 0; i < 6; i++) vink(ctx, 1190 + i * 84, 730, 18, ramp(t, q.at('levenskenmerken') + i * 0.12, 0.3));
    naamBij(ctx, 'alle levenskenmerken', null, 1400, 810, q.on('levenskenmerken', 1), 'center', C.groen);
    const aK = q.on('kleinste', 1); if (aK > 0.01) A(ctx, aK, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(1400, 380, 330, 170, 0, 0, 6.283); ctx.stroke(); });
    tag(ctx, 'de cel is het kleinste niveau dat leeft', 1400, 170, C.goud, aK);
    const aG = q.on('griepvirus', 1); griepVirus(ctx, 960, 560, 34, aG); vraagteken(ctx, 960, 480, aG, 80); },

  // ---------- s06: ladder; molecuul → organel → cel (zoom naar buiten) ----------
  s06(ctx, t, q) { micro(ctx); const tB = q.at('Begin'), tM = q.at('molecuul'), tV = q.at('Veel'), tO = q.at('organel'), tC = q.at('Organellen');
    const cur = t >= tC ? 2 : t >= tO + 0.6 ? 1 : t >= tM ? 0 : -1; const X = 1150, Y = 460;
    // de koolmees waar het om gaat, krimpt naar het medaillon
    const aBird = 1 - ramp(t, tB, 0.9); if (aBird > 0.01) A(ctx, aBird, () => { takLijn(ctx, [[600, 700], [1150, 690], [1700, 676]], 18); koolmees(ctx, 1130, 690, 2.0, { houding: 'tak', takY: 690 }); });
    meesMedaillon(ctx, ramp(t, tB + 0.3, 0.8), t);
    const eiwitten = () => { eiwitVouw(ctx, X, Y, 1.5, 0.3 + 0.7 * ramp(t, tM, 3.0), Array(46).fill('a'), { kleur: 'eiwit', t, a: q.on('molecuul', 1, 0.5) });
      const aV = q.on('moleculen', 1, 0.8); if (aV > 0.01) [[-330, -200], [320, -230], [-380, 150], [360, 190], [-80, 300], [60, -330]].forEach(([dx, dy], i) => eiwitVouw(ctx, X + dx, Y + dy, 0.7, 1, Array(46).fill('a'), { kleur: 'eiwit', t: t + i, a: ramp(t, q.at('moleculen') + i * 0.12, 0.4), seed: 4 + i })); };
    const kern = () => kernEnvelopPorie(ctx, X, Y, 1.7, { r: 150, t });
    const cel = () => { const r = hartspierCel(ctx, X, Y + 10, 1250, { c: 0 }); const aM = q.on('Organellen', 1, 0.6) * (1 - ramp(t, tC + 2.2, 0.6));
      if (aM > 0.01) r.mito.forEach(([mx, my]) => A(ctx, aM, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(mx, my, 40, 22, 0, 0, 6.283); ctx.stroke(); })); };
    if (t < tO) eiwitten();
    else if (t < tC) zoomUit(ctx, (t - tO) / 1.4, [X, Y], [X + 70, Y + 80], 9, eiwitten, kern);
    else zoomUit(ctx, (t - tC) / 1.3, [X, Y], [X + 25, Y + 10], 2.35, kern, cel);
    naamBij(ctx, 'eiwit', 'molecuul', X, 820, q.on('eiwit', 1) * (1 - ramp(t, tO, 0.4)), 'center');
    naamBij(ctx, 'celkern', 'organel', X, 800, q.on('celkern', 1) * (1 - ramp(t, tC, 0.4)), 'center');
    naamBij(ctx, 'hartspiercel', 'een cel · organellen erin', X, 800, q.on('cel', 3), 'center');
    ladderBalk(ctx, cur, { a: q.on('niveaus', 1), breed: 370 }); },

  // ---------- s07: differentiatie ----------
  s07(ctx, t, q) { micro(ctx); const tE = q.at('bevruchte'), tD = q.at('deelt'), tT = q.at('Toch'), tGen = q.at('genen');
    // 0: hoe wordt een cel een spiercel?
    const a0 = 1 - ramp(t, q.at('Elke') + 0.4, 0.6); if (a0 > 0.01) { hartspierCel(ctx, 960, 470, 900, { a: a0 }); vraagteken(ctx, 960, 260, a0, 110); }
    // 1: bevruchte eicel die zich deelt (1 → 2 → 4 → 8)
    const a1 = q.on('bevruchte', 1, 0.6) * (1 - ramp(t, tT + 0.2, 0.8));
    if (a1 > 0.01) A(ctx, a1, () => { const C0 = [960, 420], R0 = 140; const dirs = [0, Math.PI / 2, Math.PI / 4];
      let gen = [{ p: C0, r: R0 }];
      for (let g = 0; g < 3; g++) { const f = ramp(t, tD + g * 0.85, 0.8); if (f <= 0.001) break;
        if (f < 0.999) { gen.forEach(c => delendeCel(ctx, c.p[0], c.p[1], c.r, f, { rot: dirs[g] })); gen = null; break; }
        const nw = []; gen.forEach(c => { const r1 = c.r * 0.8, d = r1 * 1.04; for (const s of [-1, 1]) nw.push({ p: [c.p[0] + s * Math.cos(dirs[g]) * d, c.p[1] + s * Math.sin(dirs[g]) * d], r: r1 }); }); gen = nw; }
      if (gen) gen.forEach(c => delendeCel(ctx, c.p[0], c.p[1], c.r, 0));
      naamBij(ctx, 'bevruchte eicel', 'vergroot', 960, 640, q.on('eicel', 1) * (1 - ramp(t, tD, 0.4)), 'center');
      const aDNA = q.on('DNA', 1, 0.6); if (aDNA > 0.01) { _gdStrip(ctx, 960, 720, 520, null, aDNA); tag(ctx, 'alle cellen: hetzelfde DNA', 960, 836, C.goud, aDNA); } });
    // 2: drie celtypen, elk met hetzelfde DNA maar een ander gen aan
    const T = [['spier', 'spiercellen', 'hartspiercel', 'gen voor myosine aan', 'trekt samen'], ['zenuw', 'zenuwcellen', 'zenuwcel', 'gen voor signaalstof aan', 'geeft signalen door'], ['huid', 'huidcellen', 'huidcel', 'gen voor keratine aan', 'beschermt']];
    const aG = q.on('genen', 1, 0.6), aTaak = q.on('taak', 1, 0.6);
    T.forEach(([tp, cue, naam, gen, taak], i) => { const x = 380 + i * 590, y = 380, tc = q.at(cue), d = ramp(t, tc, 1.2); if (d <= 0.001) return;
      A(ctx, 1 - d, () => delendeCel(ctx, x, y, 70, 0));
      A(ctx, d, () => { if (tp === 'spier') hartspierCel(ctx, x, y, 400, { c: aTaak * (0.5 + 0.5 * Math.sin(t * 4)) });
        else if (tp === 'zenuw') zenuwcel(ctx, x - 110, y, { s: 0.8, naar: [x + 190, y + 20], takken: 6, col: '#C9A35C', t, puls: aTaak > 0.01 ? (t * 0.6) % 1 : -1 });
        else _gdCel(ctx, 'huid', x, y, 140); });
      naamBij(ctx, naam, aG > 0.01 ? gen : null, x, 600, d, 'center');
      if (aG > 0.01) _gdStrip(ctx, x, 690, 360, tp, aG);
      naamBij(ctx, taak, null, x, 790, aTaak, 'center', C.groen); });
    tag(ctx, 'zelfde DNA, andere genen aan', 960, 170, C.goud, aG * (1 - q.on('differentiatie', 1, 0.3)));
    tag(ctx, 'differentiatie: eigen bouw, eigen taak', 960, 170, C.groen, ramp(t, q.at('differentiatie') + 0.3, 0.5)); },

  // ---------- s08: cel → weefsel → orgaan → orgaanstelsel → organisme (één doorlopende zoom naar buiten); bacterie ----------
  s08(ctx, t, q) { micro(ctx); A(ctx, ramp(t, q.at('hart', 2) + 0.4, 0.9) * (1 - ramp(t, q.at('bacterie') - 0.2, 0.6)), () => { ctx.fillStyle = '#2A3E5C'; ctx.fillRect(0, 0, W, H); }); const X = 1170, Y = 460; const tW = q.at('weefsel'), tV = q.at('Verschillende'), tO = q.at('orgaan'), tH = q.at('hart', 2), tS = q.at('bloedvatenstelsel'), tA = q.at('alle'), tK = q.at('koolmees'), tB = q.at('bacterie');
    const cur = t >= tK ? 6 : t >= tS ? 5 : t >= tO ? 4 : t >= tW ? 3 : 2;
    const u = (t * 1.2) % 1, c = 0.5 + 0.5 * Math.sin(u * 6.283);
    const cel = () => hartspierCel(ctx, X, Y, 700, { c: 0 });
    const weefsel = () => hartspierWeefsel(ctx, X, Y, 1300, 760, { cel: 260, t, c: t > tW + 1 ? c * 0.6 : 0 });
    const HS_ = 1.25, HX = X, HY = 470, wand = [HX + 190 * HS_, HY + 110 * HS_];
    const hart = () => hartDoorsnede(ctx, HX, HY, HS_, { u, t, stroom: 0.6 });
    const BX = X + 20, BY = 790, BS = 2.8; const hartInMees = [BX + MEES_HART[0] * BS, BY + MEES_HART[1] * BS];
    const vogel = () => { koolmees(ctx, BX, BY, BS); meesVaten(ctx, BX, BY, BS, ramp(t, q.at('bloedvaten'), 1.6) * (1 - ramp(t, tA, 0.8)), t, 1); };
    const aBac = q.on('bacterie', 1, 0.7);
    if (aBac < 0.99) A(ctx, 1 - aBac * 0.8, () => { ctx.save(); ctx.beginPath(); ctx.rect(420, 0, W - 420, H); ctx.clip();
      if (t < tW) { cel(); const aN = q.on('bouw', 1, 0.8); if (aN > 0.01) A(ctx, aN * 0.6, () => { hartspierCel(ctx, X - 690, Y - 40, 680, {}); hartspierCel(ctx, X + 690, Y + 35, 690, {}); }); }
      else if (t < tV + 0.6) zoomUit(ctx, (t - tW) / 1.0, [X, Y], [X, Y], 700 / 260, cel, weefsel, { uitBinnen: [0.85, 0.99] });
      else if (t < tH - 0.3) zoomUit(ctx, (t - tV - 0.6) / 1.6, [X, Y], wand, 28, weefsel, hart);
      else zoomUit(ctx, (t - tH + 0.3) / 1.4, [HX, HY], hartInMees, HS_ / (MEES_HS * BS), hart, vogel, { inBuiten: [0.3, 0.75], uitBinnen: [0.8, 0.98] }); ctx.restore(); });
    if (t >= tW && t < tH - 0.3) A(ctx, 1, () => {});
    naamBij(ctx, 'hartspiercel', null, X, 840, 1 - ramp(t, tW, 0.4), 'center');
    naamBij(ctx, 'hartspierweefsel', 'weefsel · cellen met dezelfde bouw en functie', X, 870, q.on('spierweefsel', 1) * (1 - ramp(t, tV + 0.4, 0.4)), 'center');
    naamBij(ctx, 'spierweefsel', null, HX + 300, HY + 230, ramp(t, tV + 2.0, 0.5) * (1 - ramp(t, tH - 0.9, 0.4)), 'left');
    naamBij(ctx, 'bindweefsel', 'kleppen', HX - 420, HY + 60, ramp(t, tV + 2.3, 0.5) * (1 - ramp(t, tH - 0.9, 0.4)), 'right');
    naamBij(ctx, 'hart', 'orgaan', HX, 870, q.on('hart', 1) * (1 - ramp(t, tH, 0.4)), 'center');
    naamBij(ctx, 'bloedvatenstelsel', 'orgaanstelsel · hart en bloedvaten', BX - 160, 330, q.on('bloedvatenstelsel', 1) * (1 - ramp(t, tA, 0.5)) * (1 - aBac), 'center');
    naamBij(ctx, 'koolmees', 'organisme · alle orgaanstelsels samen', BX - 160, 330, q.on('organisme', 1) * (1 - aBac), 'center');
    meesMedaillon(ctx, 1 - ramp(t, tH - 0.4, 0.5), t);
    if (aBac > 0.01) { bacterieEcht(ctx, X, 430, 600, { a: aBac, t }); naamBij(ctx, 'bacterie', 'vergroot', X, 690, aBac, 'center');
      tag(ctx, 'één cel = het hele organisme', X, 820, C.goud, q.on('organisme', 2)); }
    ladderBalk(ctx, cur, { breed: 370, lit: aBac > 0.5 ? NIV.map((_, i) => i === 2 || i === 6 ? 1 : i < 6 ? 0.6 : 0.4) : null });
    if (aBac > 0.5) A(ctx, aBac, () => { const y = 836 - 2 * 66; roundRect(ctx, 42, y - 32, 364, 52, 26); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.6; ctx.stroke(); }); },

  // ---------- s09: populatie, levensgemeenschap; de onderzoeker telt en meet ----------
  s09(ctx, t, q) { const tP = q.at('populatie'), tL = q.at('levensgemeenschap'), tO = q.at('onderzoeker');
    const vogel = () => koolmees(ctx, 1190, 790, 2.8);
    const bos = () => bosScene(ctx, t, { ringen: q.on('populatie', 1) * (1 - ramp(t, q.at('Maar') + 0.4, 0.5)), merels: q.on('merels', 1), pad: q.on('schimmels', 1), nest: q.on('voortplanten', 1) * (1 - ramp(t, q.at('Maar'), 0.5)), hlEik: q.on('eiken', 1) * (1 - ramp(t, q.at('eiken') + 1.4, 0.5)), nat: q.on('nat', 1), hlBodem: q.on('bodem', 1) });
    if (t < q.at('koolmezen') + 1.4) zoomUit(ctx, (t - 0.4) / 1.8, [1190, 790], [BOS_MEZEN[2][0], BOS_MEZEN[2][1]], 2.8 / 0.32, vogel, bos, { inBuiten: [0, 0.25] });
    else bos();
    // rupsen in een zoomcirkel
    const aR = q.on('rupsen', 1) * (1 - ramp(t, q.at('populaties') + 0.4, 0.5)) + q.on('rupsen', 2) * (1 - ramp(t, q.at('eiken', 2) + 1.2, 0.5));
    A(ctx, clamp(aR, 0, 1), () => rups(ctx, 1170, 520, 0.08, { t })); zoomCircle(ctx, 1560, 250, 120, 1180, 520, 'rupsen · vergroot', clamp(aR, 0, 1), () => { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(1440, 130, 240, 240); blad(ctx, 1460, 300, 120, { rot: -0.25, kleur: '#5FA86E' }); rups(ctx, 1560, 270, 0.42, { t, krom: 0.3 * Math.max(0, Math.sin(t * 4)) }); });
    naamBij(ctx, 'populatie', 'één soort · één gebied · onderling voortplanten', 1150, 120, q.on('populatie', 1) * (1 - ramp(t, q.at('Maar'), 0.5)), 'center');
    naamBij(ctx, 'merel', null, 660, 700, q.on('merels', 1) * (1 - ramp(t, tO, 0.5)), 'center'); naamBij(ctx, 'eik', null, 700, 210, q.on('eiken', 1) * (1 - ramp(t, tO, 0.5)), 'center');
    naamBij(ctx, 'paddenstoel', 'schimmel', 1010, 735, q.on('schimmels', 1) * (1 - ramp(t, tO, 0.5)), 'center');
    naamBij(ctx, 'levensgemeenschap', 'alle populaties samen', 1150, 120, q.on('levensgemeenschap', 1) * (1 - ramp(t, tO, 0.5)), 'center');
    // onderzoeker loopt het bos in en telt en meet
    const aK = q.on('onderzoeker', 1, 0.5); if (aK > 0.01) A(ctx, aK, () => { const h = 410, v = gangSnelheid('kim', h, 'loop'), dur = 1.8, x0 = 470, tl = t - tO;
      const loopt = tl < dur; const kx = loopt ? x0 : x0 + v * dur;
      persoon(ctx, 'kim', kx, 880, h, loopt ? { zij: true, kijk: 1, gang: 'loop', t: tl, vooruit: true, outfit: 'gewoon' } : { zij: true, kijk: 1, outfit: 'gewoon', uit: 'denkt' });
      const xe = x0 + v * dur; klembord(ctx, xe + 190, 650, 0.9, [['rupsen  ' + '|'.repeat(Math.round(clamp((t - q.at('rupsen', 2)) * 6, 0, 9))), q.on('rupsen', 2)], ['eiken  ' + '|'.repeat(Math.round(clamp((t - q.at('eiken', 2)) * 5, 0, 4))), q.on('eiken', 2)]], q.on('telt', 1));
      thermometerGlas(ctx, 1110, 860, 1.05, 0.25 + 0.3 * ramp(t, q.at('temperatuur'), 2), q.on('temperatuur', 1));
      naamBij(ctx, 'temperatuur', 'in het voorjaar', 1150, 660, q.on('temperatuur', 1), 'left');
      naamBij(ctx, 'bodem', 'hoe nat?', 1380, 872, q.on('bodem', 1), 'left'); });
    tag(ctx, 'minder jonge koolmezen?', 1150, 140, C.text2, q.on('minder', 1) * (1 - q.on('Welk', 1)));
    vraagteken(ctx, 1150, 170, q.on('Welk', 1), 120);
    ladderBalk(ctx, t >= tO ? -1 : t >= tL ? 8 : t >= tP ? 7 : 6, { breed: 370, lit: t >= tO ? NIV.map((_, i) => i < 7 ? 0.6 : 0.4) : null }); },

  // ---------- s11: ecosysteem = levensgemeenschap + abiotische factoren; rupsenpiek; biosfeer ----------
  s11(ctx, t, q) { const tG = q.at('warm') - 0.2, tM = q.at('Misschien'), tB = q.at('biosfeer'), graf = ramp(t, tG - 0.1, 0.5) * (1 - ramp(t, tM - 0.3, 0.5));
    const aAb = q.on('abiotische', 1);
    const bos = () => { bosScene(ctx, t, { merels: 1, pad: 1, hlBodem: Math.max(q.on('bodem', 1) * (1 - ramp(t, q.at('water'), 0.5)), q.on('bodem', 2) * (1 - ramp(t, tB, 0.5))), nat: q.on('water', 1) });
      regenWolk(ctx, 1260, 150, t, q.on('water', 1) * (1 - ramp(t, q.at('licht'), 0.5)) + 0.0);
      zon(ctx, 1760, 160, 48, q.on('licht', 1), t);
      thermometerGlas(ctx, 1480, 860, 1.0, 0.45, q.on('temperatuur', 1));
      const hlT = q.on('temperatuur', 2) * (1 - ramp(t, tB, 0.5)); if (hlT > 0.01) A(ctx, hlT, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(1480, 760, 46, 150, 0, 0, 6.283); ctx.stroke(); }); };
    const aarde_ = () => aarde(ctx, 1170, 450, 330, 1, Math.max(0, t - tB));
    if (t < tB) bos(); else { const u = (t - tB) / 1.8; bg(ctx, 'schema'); zoomUit(ctx, u, [960, 540], [1080, 300], 6, () => { ctx.save(); ctx.beginPath(); ctx.arc(960, 540, lerp(1150, 520, ease(clamp(u * 2, 0, 1))), 0, 6.283); ctx.clip(); bos(); ctx.restore(); }, aarde_, { inBuiten: [0, 0.3], uitBinnen: [0.25, 0.7] }); }
    const aBos = 1 - ramp(t, tB, 0.5);
    A(ctx, aBos * (1 - graf), () => {
      tag(ctx, 'antwoord b: een ecosysteem', 1150, 140, C.goud, q.on('Antwoord', 1) * (1 - q.on('abiotische', 1)));
      naamBij(ctx, 'abiotische factoren', 'de levenloze omgeving', 1150, 110, aAb * (1 - q.on('Levend', 1)), 'center');
      naamBij(ctx, 'bodem', null, 640, 872, q.on('bodem', 1) * (1 - ramp(t, q.at('Levend'), 0.5)), 'left');
      naamBij(ctx, 'water', null, 1260, 300, q.on('water', 1) * (1 - ramp(t, q.at('Levend'), 0.5)), 'center');
      naamBij(ctx, 'licht', null, 1760, 270, q.on('licht', 1) * (1 - ramp(t, q.at('Levend'), 0.5)), 'center');
      naamBij(ctx, 'temperatuur', null, 1520, 640, q.on('temperatuur', 1) * (1 - ramp(t, q.at('Levend'), 0.5)), 'left');
      const aLL = q.on('Levend', 1) * (1 - ramp(t, tG - 0.3, 0.3)); if (aLL > 0.01) { tag(ctx, 'levend', 860, 140, C.groen, aLL); tag(ctx, 'levenloos', 1460, 140, C.teal, aLL); A(ctx, q.on('beïnvloeden', 1), () => { pijl(ctx, 990, 128, 1330, 128, C.text, 1, 3, 14); pijl(ctx, 1330, 128, 990, 128, C.text, 1, 3, 14); }); }
      tag(ctx, 'levensgemeenschap: alleen het levende', 1150, 140, C.koraal, q.on('levensgemeenschap', 2) * (1 - q.on('zodra', 1)));
      tag(ctx, '+ temperatuur en bodem: een ecosysteem', 1150, 140, C.teal, q.on('ecosysteem', 2));
      const aPD = q.on('planten', 1) * (1 - ramp(t, q.at('Maar'), 0.4)); if (aPD > 0.01) BOS_MEZEN.forEach(([x, y]) => A(ctx, aPD, () => { ctx.strokeStyle = C.groen; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y - 28, 50, 0, 6.283); ctx.stroke(); })); });
    // de rupsenpiek die te vroeg komt (Schema-kaart)
    if (graf > 0.01) A(ctx, graf, () => { bg(ctx, 'schema'); const gx = 560, gy = 760, gw = 1200, gh = 480;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 20); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
      [['APRIL', 0.1], ['MEI', 0.5], ['JUNI', 0.9]].forEach(([s, u]) => metaText(ctx, s, gx + u * gw, gy + 40, C.text2, 'center', 22)); metaText(ctx, 'HOEVEEL', gx - 10, gy - gh - 34, C.text2, 'left', 22);
      const pR = lerp(0.55, 0.34, ramp(t, q.at('eerder'), 1.6)), pK = 0.6;
      const kromme = (c, col, lw, fill) => { const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80; P.push([gx + u * gw, gy - gh * 0.86 * Math.exp(-Math.pow((u - c) / 0.11, 2))]); }
        if (fill) { ctx.beginPath(); ctx.moveTo(P[0][0], gy); P.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(P[80][0], gy); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
        ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); };
      kromme(pR, '#8CC05A', 5, rgba('#8CC05A', 0.12)); kromme(pK, KM, 5, null);
      naamBij(ctx, 'rupsen', null, gx + pR * gw, gy - gh * 0.86 - 26, 1, 'center', '#A8D47A'); naamBij(ctx, 'jonge koolmezen', 'hebben rupsen nodig', gx + pK * gw + 30, gy - gh * 0.86 + 10, 1, 'left', KM);
      thermometerGlas(ctx, 1780, 580, 0.8, 0.75, q.on('warm', 1)); naamBij(ctx, 'warm voorjaar', null, 1780, 640, q.on('warm', 1), 'center', C.koraal);
      const aE = q.on('Zijn', 1) * (1 - ramp(t, q.at('missen'), 0.4)); meesEi(ctx, gx + pR * gw, gy - 50, 4, { a: aE }); naamBij(ctx, 'nog in het ei', null, gx + pR * gw, gy - 100, aE, 'center');
      const aMis = q.on('missen', 1); if (aMis > 0.01) A(ctx, aMis, () => { ctx.fillStyle = rgba(C.koraal, 0.22); const x0 = gx + (pK - 0.12) * gw, x1 = gx + (pK + 0.12) * gw; ctx.fillRect(x0, gy - gh * 0.86, x1 - x0, gh * 0.86); });
      tag(ctx, 'te laat: de jongen missen hun voedsel', 1160, 160, C.koraal, aMis); });
    naamBij(ctx, 'biosfeer', 'alle ecosystemen op aarde · ± 12 742 km', 1170, 860, q.on('ecosystemen', 1), 'center');
    ladderBalk(ctx, t >= tB ? 10 : 9, { breed: 370 }); },

  // ---------- s12: emergente eigenschap: een cel trekt samen, een hart pompt ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const aS = q.on('spiercel', 1), aH = q.on('hart', 1);
    hartspierCel(ctx, 520, 460, 600, { a: Math.max(0.35, aS), c: t > q.at('trekt') ? 0.5 + 0.5 * Math.sin(t * 5) : 0 });
    naamBij(ctx, 'één hartspiercel', 'trekt samen', 520, 700, aS, 'center');
    hartDoorsnede(ctx, 1380, 460, 1.0, { a: Math.max(0.35, aH), u: (t * 1.2) % 1, t, stroom: q.on('pompt', 1) });
    naamBij(ctx, 'hart', 'pompt bloed rond', 1380, 840, aH, 'center');
    tag(ctx, 'emergente eigenschap: iets nieuws op een hoger niveau', 960, 150, C.goud, q.on('emergente', 1)); },

  // ---------- s13 (vwo): meer dan de optelsom; populatie; leven ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const tK = q.at('koolmees'), tMo = q.at('mooiste'), aA = 1 - ramp(t, tK - 0.4, 0.5), aB = ramp(t, tK - 0.3, 0.5) * (1 - ramp(t, tMo - 0.3, 0.5)), aC = ramp(t, tMo - 0.2, 0.5) * (1 - ramp(t, q.at('Terug') + 0.2, 0.6));
    if (aA > 0.01) A(ctx, aA, () => { for (let i = 0; i < 3; i++) hartspierCel(ctx, 380, 300 + i * 150, 360, { c: 0.5 + 0.5 * Math.sin(t * 5 + i) }); text(ctx, '+', 380, 382, fTitel(60), C.text2, 'center'); text(ctx, '+', 380, 532, fTitel(60), C.text2, 'center');
      pijl(ctx, 700, 450, 980, 450, C.line, q.on('samenwerken', 1), 4, 18); hartDoorsnede(ctx, 1380, 460, 0.95, { u: (t * 1.2) % 1, t, stroom: 0.6, a: q.on('samenwerken', 1) });
      tag(ctx, 'meer dan de optelsom', 960, 820, C.goud, q.on('optelsom', 1)); });
    if (aB > 0.01) A(ctx, aB, () => { koolmees(ctx, 420, 620, 1.3); naamBij(ctx, 'één koolmees', 'geen dichtheid · geen geboortecijfer', 330, 760, 1, 'center');
      A(ctx, q.on('populatie', 1), () => { roundRect(ctx, 860, 160, 960, 560, 24); shape(ctx, rgba('#2F4A3A', 0.55), rgba(C.line, 0.5), 1.5); });
      const P = [[960, 300], [1120, 260], [1300, 320], [1480, 270], [1660, 330], [1030, 450], [1210, 480], [1400, 430], [1590, 470], [1730, 560], [980, 620], [1160, 640], [1360, 600], [1540, 650]];
      P.forEach(([x, y], i) => koolmees(ctx, x, y, 0.3 + 0.05 * hash(i * 3), { kijk: hash(i) > 0.5 ? 1 : -1, a: ramp(t, q.at('populatie') - 0.2 + i * 0.05, 0.3) }));
      metaText(ctx, 'AANTAL PER HECTARE', 1340, 205, rgba(C.teal, q.on('dichtheid', 1)), 'center', 22);
      nestje(ctx, 1700, 690, 1.1, 6, q.on('geboortecijfer', 1)); naamBij(ctx, 'jongen per jaar', null, 1690, 640, q.on('geboortecijfer', 1), 'right', C.groen);
      naamBij(ctx, 'populatie', 'wel', 1340, 790, q.on('populatie', 1), 'center');
      tag(ctx, 'evolutie: alleen een populatie', 1340, 860, C.goud, q.on('evolueren', 1)); });
    if (aC > 0.01) A(ctx, aC, () => { [[300, 280], [560, 260], [270, 520], [560, 500], [420, 700]].forEach(([x, y], i) => eiwitVouw(ctx, x, y, 0.6, 1, Array(46).fill('a'), { kleur: 'eiwit', t: t + i, seed: 4 + i }));
      naamBij(ctx, 'losse moleculen', 'leven niet', 420, 840, q.on('molecuul', 1), 'center'); kruis(ctx, 720, 200, 24, q.on('leeft', 1));
      celRond(ctx, 1380, 450, 290, { t, a: q.on('cel', 1, 0.6) }); naamBij(ctx, 'een cel vol moleculen', 'leeft', 1380, 820, q.on('moleculen', 1), 'center'); vink(ctx, 1720, 200, 26, q.on('wel', 2));
      tag(ctx, 'leven = een emergente eigenschap', 960, 150, C.goud, q.on('leven', 1)); }); },

  // ---------- s14: het virus naast de ladder; bouw; op schaal naast een bacterie; de lijst; de cel maakt virussen ----------
  s14(ctx, t, q) { micro(ctx); const tL = q.at('Leg'), tE = q.at('dringt') - 0.7, aI = 1 - ramp(t, tL - 0.3, 0.5), aL = ramp(t, tL - 0.2, 0.5) * (1 - ramp(t, tE - 0.2, 0.5)), aC = ramp(t, tE - 0.1, 0.5);
    if (aI > 0.01) A(ctx, aI, () => { const tT = q.at('tien'), k = ramp(t, tT, 1.2), tVe = q.at('verschil');
      const vx = lerp(1150, 1640, k), vy = lerp(440, 470, k), vr = lerp(220, 14, k);
      griepVirus(ctx, vx, vy, vr, q.on('virus', 1, 0.6));
      const hl = (cue, fn) => { const a = q.on(cue, 1) * (1 - ramp(t, tT, 0.4)); if (a > 0.01) A(ctx, a, fn); };
      hl('erfelijk', () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(vx, vy - 10, vr * 0.42, vr * 0.6, 0, 0, 6.283); ctx.stroke(); });
      hl('eiwitmantel', () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(vx, vy, vr * 0.86, 0, 6.283); ctx.stroke(); });
      hl('vetlaagje', () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(vx, vy, vr * 1.02, 0, 6.283); ctx.stroke(); });
      const aN = 1 - ramp(t, tT, 0.4);
      naamBij(ctx, 'RNA', 'erfelijk materiaal', 1500, 300, q.on('erfelijk', 1) * aN, 'left');
      naamBij(ctx, 'eiwitmantel', null, 1500, 450, q.on('eiwitmantel', 1) * aN, 'left');
      naamBij(ctx, 'vetlaagje', 'uit de gastheercel', 1500, 570, q.on('vetlaagje', 1) * aN, 'left');
      bacterieEcht(ctx, 1080, 470, 640, { a: k, t, flagel: false }); naamBij(ctx, 'bacterie', '± 2 µm', 1080, 720, k, 'center'); naamBij(ctx, 'griepvirus', '± 0,1 µm', 1640, 560, k, 'center');
      metaText(ctx, 'OP SCHAAL · VERGROOT', 1360, 820, rgba(C.text2, k), 'center', 22);
      tag(ctx, 'bacterie: wél een cel', 1080, 200, C.groen, q.on('wél', 1));
      const aSt = q.on('stoffen', 1); if (aSt > 0.01) for (let i = 0; i < 8; i++) { const u = (t * 0.5 + i / 8) % 1; circ(ctx, lerp(700, 860, u), 470 + Math.sin(i * 2.3) * 90 * (1 - u), 6, rgba(C.oker, aSt * (1 - u))); } });
    if (aI > 0.01 && t < tL) {}
    if (aL > 0.01) A(ctx, aL, () => { const ck = (w, n = 1) => ({ ok: true, a: 1 }), kr = (w) => ({ ok: false, a: q.on(w, 1, 0.3) });
      bord(ctx, 480, 150, 1100, KENM.map(s => ({ s, a: 1 })), [{ naam: 'bacterie', col: '#C9A35C', a: 1, icoon: (cx, cy) => bacterieEcht(ctx, cx, cy + 8, 90, {}), v: KENM.map(() => ({ ok: true, a: 1 })) }, { naam: 'virus', a: 1, icoon: (cx, cy) => griepVirus(ctx, cx, cy + 6, 20), v: [kr('cellen'), kr('Stofwisseling'), kr('Groeien'), null, kr('prikkels'), null] }]);
      griepVirus(ctx, 1760, 470, 40); });
    if (aC > 0.01) A(ctx, aC, () => { const cx = 1180, cy = 470, R = 330; const r = celRond(ctx, cx, cy, R, { t });
      naamBij(ctx, 'keelcel', 'gastheercel', cx - R - 30, cy - R * 0.55, q.on('cel', 3), 'right');
      const tDr = q.at('dringt'), tBi = q.at('binnen'), uIn = ramp(t, tDr, 1.2);
      const vx = lerp(560, cx - R + 30, ease(clamp((t - tE) / (tDr - tE + 0.3), 0, 1))), vxIn = lerp(cx - R + 30, cx - R * 0.35, uIn);
      if (t < tBi) griepVirus(ctx, t < tDr ? vx : vxIn, cy - 40, 26); else A(ctx, 1 - ramp(t, tBi + 0.8, 0.6), () => { ctx.strokeStyle = rgba('#AFC0D0', 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx - R * 0.35, cy - 40, 40, 0, 6.283); ctx.stroke(); griepVirus(ctx, cx - R * 0.35, cy - 40, 26); });
      metaText(ctx, 'VIRUS VERGROOT', 560, cy + 60, rgba(C.text2, 1 - ramp(t, tDr, 0.5)), 'center', 20);
      // nieuwe virussen: RNA-kopieën in de cel, nieuwe deeltjes knoppen af aan het membraan
      const tN = q.at('nieuwe'), aN = ramp(t, tN, 0.5);
      if (aN > 0.01) { for (let i = 0; i < 10; i++) { const an = hash(i * 3) * 6.283, d = R * (0.25 + 0.4 * hash(i + 7)); A(ctx, aN * ramp(t, tN + i * 0.15, 0.3), () => { roundRect(ctx, cx + Math.cos(an) * d - 9, cy + Math.sin(an) * d - 3, 18, 6, 3); shape(ctx, rgba('#3E86AE', 0.7), '#3E86AE', 1); }); }
        const n = Math.round(clamp((t - q.at('virussen')) * 3, 0, 9)); for (let i = 0; i < n; i++) { const an = -1.3 + i * 0.36, u = clamp((t - q.at('virussen') - i / 3) / 2.5, 0, 1); const rr = R + 4 + 30 * u;
          griepVirus(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 22); } }
      const aE = q.on('energie', 1); if (aE > 0.01) A(ctx, aE, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(r.mito[0], r.mito[1], 40, 0, 6.283); ctx.stroke(); });
      tag(ctx, 'met de stoffen en de energie van de cel', cx, 862, C.goud, q.on('stoffen', 2)); });
    ladderBalk(ctx, -1, { breed: 370, a: (1 - ramp(t, tL - 0.4, 0.5)), virus: q.on('ladder', 1), lit: NIV.map((_, i) => i === 2 ? 1 : 0.5) });
    naamBij(ctx, 'een virus is geen cel', null, 1150, 880, q.on('geen', 1) * (1 - ramp(t, q.at('pakketje'), 0.4)), 'center', C.koraal); },

  // ---------- s15: antwoord a; grensgeval; erfelijk materiaal is een molecuul ----------
  s15(ctx, t, q) { micro(ctx); const cx = 600, cy = 480, R = 300, tO = q.at('dacht', 2) - 0.4, aR = 1 - ramp(t, tO - 0.2, 0.5), aM = ramp(t, tO, 0.6);
    const r = celRond(ctx, cx, cy, R, { t });
    for (let i = 0; i < 9; i++) { const an = -1.35 + i * 0.3 + 0.02 * Math.sin(t + i), rr = R + 34 + 8 * Math.sin(t * 0.7 + i); griepVirus(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 22); }
    const aW = q.on('werk', 1); if (aW > 0.01) A(ctx, aW, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(r.mito[0], r.mito[1], 40, 0, 6.283); ctx.stroke(); });
    naamBij(ctx, 'de cel doet het werk', null, cx, 870, aW, 'center');
    tag(ctx, 'antwoord a: geen eigen stofwisseling', 1380, 120, C.goud, q.on('Antwoord', 1) * (1 - q.on('Misschien', 1)));
    A(ctx, aR, () => { const aV = q.on('evolueren', 1); virusVarianten(ctx, 1420, 320, 40, aV); naamBij(ctx, 'evolutie', 'steeds een beetje anders', 1420, 440, aV, 'center');
      for (let i = 0; i < 12; i++) griepVirus(ctx, 1160 + (i % 6) * 104, 560 + Math.floor(i / 6) * 90, 18, ramp(t, q.at('virussen') + i * 0.08, 0.3) * (1 - ramp(t, q.at('evolueren') - 0.2, 0.4)));
      tag(ctx, 'dat klopt', 1420, 200, C.groen, q.on('waar', 1) * (1 - q.on('grensgeval', 1)));
      tag(ctx, 'grensgeval', 1420, 200, C.teal, q.on('grensgeval', 1));
      const aK = q.on('kopieën', 1); if (aK > 0.01) { pijl(ctx, 930, 360, 1180, 330, C.koraal, aK, 4, 16); tag(ctx, 'de kopieën maakt de cel', 1420, 620, C.koraal, aK); } });
    A(ctx, aM, () => { mrnaSliert(ctx, 1150, 430, 560, { a: q.on('erfelijk', 1), basen: 1, t }); naamBij(ctx, 'RNA', 'erfelijk materiaal', 1430, 330, q.on('erfelijk', 1), 'center');
      naamBij(ctx, 'een molecuul', null, 1430, 590, q.on('molecuul', 1), 'center', C.text); kruis(ctx, 1760, 420, 24, q.on('leeft', 1)); naamBij(ctx, 'leeft niet', null, 1430, 680, q.on('leeft', 1), 'center', C.koraal); }); },

  // ---------- s16: samenvatting: de ladder met een beeld per niveau; koolmees en Noor; het virus ernaast ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const cues = [null, null, ['cel', 2], ['weefsel', 1], ['organen', 1], ['orgaanstelsels', 1], ['organisme', 1], ['populatie', 1], ['levensgemeenschap', 1], ['ecosysteem', 1], ['biosfeer', 1]];
    const tC = q.at('cel', 2), tDe = q.at('koolmees') - 0.1;
    let cur = -1; cues.forEach((c, i) => { if (c && t >= q.at(c[0], c[1])) cur = i; }); if (t >= tDe) cur = 6;
    const lit = NIV.map((_, i) => cues[i] ? Math.max(0.45, ramp(t, q.at(cues[i][0], cues[i][1]), 0.4)) : 0.45);
    ladderBalk(ctx, cur, { breed: 370, lit, virus: Math.max(q.on('Leeft', 1) * (1 - ramp(t, tC - 0.6, 0.5)), q.on('griepvirus', 2)) });
    // antwoord
    const aA = 1 - ramp(t, tC - 0.4, 0.5); if (aA > 0.01) A(ctx, aA, () => { griepVirus(ctx, 1200, 470, 150); kruis(ctx, 1420, 280, 28, q.on('nee', 1));
      tag(ctx, 'antwoord a', 1200, 760, C.goud, q.on('antwoord', 1)); tag(ctx, 'geen eigen stofwisseling: het laat een cel werken', 1200, 840, C.koraal, q.on('stofwisseling', 1)); });
    // beeld van het huidige niveau
    if (t >= tC - 0.4 && t < tDe) { const items = cues.map((c, i) => c ? [i, q.at(c[0], c[1])] : null).filter(Boolean);
      items.forEach(([i, ti], k) => { const tv = k + 1 < items.length ? items[k + 1][1] : tDe; const a = ramp(t, ti - 0.2, 0.4) * (1 - ramp(t, tv - 0.2, 0.4)); if (a > 0.01) A(ctx, a, () => { ctx.save(); ctx.beginPath(); ctx.arc(1200, 460, 330, 0, 6.283); ctx.fillStyle = i <= 4 ? '#121A26' : '#2A3E5C'; ctx.fill(); ctx.clip(); niveauIcoon(ctx, i, 1200, 460, 560, t); ctx.restore();
        ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(1200, 460, 330, 0, 6.283); ctx.stroke(); metaText(ctx, NIV[i].toUpperCase(), 1200, 840, C.grain, 'center', 26); }); });
      naamBij(ctx, 'differentiatie', 'zelfde DNA, andere genen aan', 1200, 120, q.on('differentiatie', 1) * (1 - ramp(t, q.at('populatie'), 0.4)), 'center'); }
    // de koolmees en Noor op de ladder; het virus ernaast
    const aO = ramp(t, tDe - 0.2, 0.5); if (aO > 0.01) A(ctx, aO, () => { koolmees(ctx, 980, 740, 1.4); persoon(ctx, 'noor', 1460, 800, 520, { uit: 'moe', a: q.on('net', 1, 0.6) });
      haak(ctx, 700, 1640, 822, 'allebei een organisme', C.groen, q.on('ladder', 1));
      naamBij(ctx, 'een pakketje moleculen', 'doet pas iets in een cel', 1250, 200, q.on('pakketje', 1), 'center'); }); },

  // ---------- eindbeeld: alle organisatieniveaus op een rij ----------
  eind(ctx, t) { bg(ctx, 'schema'); text(ctx, 'Van molecuul tot biosfeer', W / 2, 122, fTitel(54), C.text, 'center');
    const vak = []; for (let i = 0; i < 6; i++) vak.push([60 + i * 306, 190, 270, 330]); for (let i = 0; i < 5; i++) vak.push([114 + i * 348, 612, 300, 340]);
    const k = i => ramp(t, 0.5 + i * 0.5, 0.6);
    ctx.save(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < 10; i++) { const a = k(i + 1); if (a <= 0.01) continue; ctx.globalAlpha = a; const [x, y, w, h] = vak[i], [x2, y2, w2] = vak[i + 1];
      if (i === 5) { const yy = 568; ctx.beginPath(); ctx.moveTo(x + w / 2, y + h + 8); ctx.lineTo(x + w / 2, yy); ctx.lineTo(x2 + w2 / 2, yy); ctx.lineTo(x2 + w2 / 2, y2 - 14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x2 + w2 / 2 - 9, y2 - 22); ctx.lineTo(x2 + w2 / 2, y2 - 8); ctx.lineTo(x2 + w2 / 2 + 9, y2 - 22); ctx.stroke(); }
      else { const xa = x + w + 7, xb = x2 - 7, ym = y + h / 2; ctx.beginPath(); ctx.moveTo(xa, ym); ctx.lineTo(xb, ym); ctx.moveTo(xb - 9, ym - 9); ctx.lineTo(xb, ym); ctx.lineTo(xb - 9, ym + 9); ctx.stroke(); } }
    ctx.restore();
    vak.forEach(([x, y, w, h], i) => { const a = k(i); if (a <= 0.01) return; A(ctx, a, () => { roundRect(ctx, x, y, w, h, 22); shape(ctx, i <= 4 ? '#121A26' : rgba(C.fill, 0.55), EXAMEN[i] ? rgba(C.goud, 0.7) : rgba(C.line, 0.45), EXAMEN[i] ? 2 : 1.5);
      ctx.save(); roundRect(ctx, x + 2, y + 2, w - 4, h - 70, 20); ctx.clip(); niveauIcoon(ctx, i, x + w / 2, y + (h - 70) / 2 + 4, Math.min(w, h - 70) * 0.95, t); ctx.restore();
      text(ctx, NIV[i], x + w / 2, y + h - 26, fTekst(NIV[i].length > 14 ? 25 : 29, EXAMEN[i] ? 700 : 500), C.text, 'center'); }); }); },
});
