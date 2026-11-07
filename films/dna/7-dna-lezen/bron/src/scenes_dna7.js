// DNA lezen 2.0 (DNA 7/8) — scènes, één functie per gesproken alinea (FILMDATA-straat). 31 okt 2026, beeld-remake op prompt v13.
// Takes en woordtijden zijn die van versie 1.5; het beeld volgt de cue-woorden (q.at zoekt een stukje van een woord, hoofdletterongevoelig).
// Tekeningen: teken_dna7.js + gedeelde bibliotheek (pcrBuisje, thermocycler, gelElektroforese, micropipet, sequencer, primerStuk,
// d2Base/d2Rug, polymeraseAchter/-Voor, enzymKluwen, rodeBloedcel, witteBloedcellen, restrictieEnzym, plasmideKnipPlak, ligase,
// crisprCas9, bacterieEcht, petrischaal, mrnaSliert, genOpbouw, cdChromosoom, stamboom; castpersonages; zeehond uit lib_dieren).

const NACHT = { lucht: '#1E2E4A', muur: '#2E3A52', muurD: '#28334A', grond: '#2A3346' };
function nachtGevel(ctx) { ctx.fillStyle = NACHT.lucht; ctx.fillRect(0, 0, W, H); ctx.fillStyle = NACHT.muur; ctx.fillRect(0, 70, W, 790);
  ctx.fillStyle = NACHT.muurD; for (let r = 0; r < 18; r++) for (let k = 0; k < 14; k++) { if (hash(r * 31 + k) < 0.7) continue; ctx.fillRect(k * 140 + (r % 2) * 70, 80 + r * 44, 132, 3); }
  ctx.fillStyle = '#3A465E'; ctx.fillRect(0, 60, W, 14); ctx.fillStyle = NACHT.grond; ctx.fillRect(0, 860, W, H - 860); }
function menigte(ctx, x, y, n, a = 1, hlI = -1, s = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const c = i % 12, r = Math.floor(i / 12), px = x + c * 44 * s + (r % 2) * 22 * s, py = y + r * 70 * s, kl = i === hlI ? C.goud : C.mens;
    circ(ctx, px, py - 30 * s, 11 * s, kl); roundRect(ctx, px - 15 * s, py - 16 * s, 30 * s, 34 * s, 12 * s); shape(ctx, kl, null); } ctx.restore(); }
function databankStapel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 3; k >= 0; k--) { ctx.beginPath(); ctx.ellipse(x, y + k * 46, 120, 34, 0, 0, 6.283); shape(ctx, k ? '#3E4C68' : '#4E5E7E', '#8FA0B5', 1.5); }
  ctx.fillStyle = '#3E4C68'; ctx.fillRect(x - 120, y, 240, 138); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - 120, y); ctx.lineTo(x - 120, y + 138); ctx.moveTo(x + 120, y); ctx.lineTo(x + 120, y + 138); ctx.stroke();
  for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.ellipse(x, y + k * 46, 120, 34, 0, 0, Math.PI); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(x, y, 120, 34, 0, 0, 6.283); shape(ctx, '#56688C', '#8FA0B5', 1.5); ctx.restore(); }
const DADER_SEED = 7;

Object.assign(SCENES, {
  // ---------------- titel: glasscherf met drie druppels bloed, eronder het profiel als streepjescode
  title(ctx, t) { ctx.save(); ctx.beginPath(); const P = [[1120, 170], [1690, 130], [1820, 470], [1600, 760], [1180, 700], [1060, 430]]; P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath();
    ctx.fillStyle = rgba('#2C4462', 0.9); ctx.fill(); ctx.strokeStyle = '#C9D6E2'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    ctx.strokeStyle = rgba('#C9D6E2', 0.5); ctx.lineWidth = 1.2; [[1300, 300, 1500, 520], [1500, 520, 1700, 620], [1500, 520, 1420, 700]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); });
    druppelIcoon(ctx, 1420, 360, 26); druppelIcoon(ctx, 1500, 440, 18); druppelIcoon(ctx, 1372, 470, 14);
    profielCode(ctx, 1180, 800, 560, 80, DADER_SEED, ramp(t, 1.0, 0.8)); },

  // ---------------- Opening: de ruit, de databank, het archief, de vraag
  n0(ctx, t, q) { const tDB = q.at('DNA-profiel') - 0.3, tKast = q.at('zaak', 2) - 0.2, tNiet = q.at('Niet') - 0.2, tHoe = q.at('Hoe') - 0.2;
    if (t < tDB) { nachtGevel(ctx); const R = ruit(ctx, 230, 210, 640, 520);
      const dr = ramp(t, q.at('druppels') - 0.4, 0.6); R.druppels.forEach((p, k) => bloedDruppel(ctx, p[0], p[1], [13, 10, 8][k], dr, 0.8));
      if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr * (1 - ramp(t, q.at('dader') + 0.3, 0.5)); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(R.druppels[0][0] + 6, R.druppels[0][1] + 14, 58, 0, 6.283); ctx.stroke(); ctx.restore(); }
      nb(ctx, 'bloed van de dader', null, R.druppels[0][0] - 40, R.druppels[0][1] - 70, ramp(t, q.at('bloed') - 0.2, 0.5), 'center');
      const d0 = R.druppels[0], u = ramp(t, q.at('dader') - 0.6, 1.0), tip = [lerp(d0[0] + 90, d0[0] + 12, u), lerp(d0[1] + 30, d0[1] + 6, u)], grip = [tip[0] + 100, tip[1] + 14];
      persoon(ctx, 'kim', 900, 870, 600, { outfit: 'plaatsdelict', kijk: -1, t, pose: 'handdruk', hand: { x: grip[0], y: grip[1] }, uit: 'ernstig' });
      wattenstaafje(ctx, grip[0], grip[1], 104, Math.atan2(tip[1] - grip[1], tip[0] - grip[0]), 1, ramp(t, q.at('dader') + 0.6, 0.3));
      meta(ctx, 'jaren geleden', 1750, 130, 'right', C.text2, ramp(t, q.at('jaren') - 0.2, 0.5)); return; }
    if (t < tKast) { sch(ctx); const u = ramp(t, tDB, 0.4); ctx.save(); ctx.globalAlpha *= u;
      meta(ctx, 'bloedspoor', 400, 300, 'center', C.koraal); profielCode(ctx, 140, 330, 520, 200, DADER_SEED, 1, { rand: C.koraal });
      meta(ctx, 'DNA-databank politie', 1340, 150, 'center', C.text2); const tc = q.at('komt'), te = q.at('overeen');
      for (let k = 0; k < 6; k++) { const y = 190 + k * 100, tk = lerp(tc, te, k / 6); profielCode(ctx, 1000, y, 680, 76, 40 + k * 3, 1, { rand: t > tk && t < tk + 0.45 ? C.goud : C.line }); kruisje(ctx, 1730, y + 38, 1, C.koraal, ramp(t, tk + 0.35, 0.25)); }
      pijlA(ctx, 700, 430, 950, 430, C.line, ramp(t, tc - 0.3, 0.4));
      tx(ctx, 'geen match', 400, 640, 48, C.koraal, 'center', 700, ramp(t, te + 0.2, 0.4)); ctx.restore(); return; }
    if (t < tNiet) { sch(ctx); const la1 = ramp(t, tKast, 0.5) * (1 - ramp(t, q.at('in.') + 0.2, 0.6)), terug = ramp(t, q.at('aanwijzing') - 0.5, 0.7);
      const map = 1 - ramp(t, q.at('in.'), 0.5) * (1 - terug); archiefKast(ctx, 830, 230, 1, Math.max(la1, terug), map, 1, 'onopgelost');
      titel(ctx, 'jaren later', 960, 170, 64, C.text, 'center', ramp(t, q.at('Jaren', 2) - 0.2, 0.5));
      if (terug > 0.01) { ctx.save(); ctx.globalAlpha *= terug; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; roundRect(ctx, 850, 196, 220, 120, 10); ctx.stroke(); tx(ctx, 'nieuwe aanwijzing', 960, 720, 44, C.goud); ctx.restore(); }
      return; }
    if (t < tHoe) { sch(ctx); databankStapel(ctx, 600, 330); nb(ctx, 'niet uit de databank', null, 600, 600, 1, 'center'); kruisje(ctx, 600, 400, 3, C.koraal, ramp(t, q.at('databank', 2), 0.3));
      const d = ramp(t, q.at('dader', 2) - 0.6, 0.5); kaart(ctx, 1180, 230, 300, 330, d); titel(ctx, '?', 1330, 440, 160, C.text2, 'center', d);
      nb(ctx, 'niet van de dader zelf', null, 1330, 600, d, 'center'); kruisje(ctx, 1330, 395, 3, C.koraal, ramp(t, q.at('zelf'), 0.3)); return; }
    sch(ctx); const a1 = ramp(t, tHoe, 0.5), a2 = ramp(t, q.at('hoe', 2) - 0.2, 0.5);
    ctx.save(); ctx.globalAlpha *= a1 * (1 - 0.6 * a2); druppelIcoon(ctx, 330, 330, 44); pijlA(ctx, 420, 380, 560, 380, C.line); dubbelStreng(ctx, 600, 330, 'GATACAGT', 30); ctx.restore();
    tx(ctx, 'DNA lezen uit een paar druppels bloed?', 480, 560, 44, C.goud, 'center', 700, a1 * (1 - 0.6 * a2));
    menigte(ctx, 1150, 300, 36, a2, 17); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1440, 360, 70, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1490, 410); ctx.lineTo(1560, 480); ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
    tx(ctx, 'iemand vinden die nergens geregistreerd staat?', 1420, 560, 44, C.goud, 'center', 700, a2); },

  // ---------------- Hoofdstuk 1: bloed → te weinig DNA → PCR
  n3(ctx, t, q) { const tDus = q.at('Dus', 2) - 0.1, tVerh = q.at('Verhitten') - 0.3, tEen = q.at('cyclus') - 0.6;
    if (t < tDus) { mic(ctx); const witHl = ramp(t, q.at('witte') - 0.3, 0.5), roodDim = 1 - 0.65 * ramp(t, q.at('alleen') - 0.2, 0.6);
      bloedVeld(ctx, 820, 440, 360, t, { rodeA: roodDim, n: 90 });
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(820, 440, 360, 0, 6.283); ctx.stroke();
      nb(ctx, 'rode bloedcellen', 'geen kern, dus geen DNA', 1220, 300, ramp(t, q.at('Rode') - 0.2, 0.5), 'left');
      if (witHl > 0.01) { ctx.save(); ctx.globalAlpha *= witHl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(820 + 0.25 * 360, 440 - 0.3 * 360, 72, 0, 6.283); ctx.stroke(); ctx.restore(); }
      nb(ctx, 'witte bloedcel', 'kern met DNA', 1220, 520, witHl, 'left', C.goud);
      meta(ctx, 'vergroot · een druppel bloed', 820, 860, 'center', C.text2, 1);
      tx(ctx, 'te weinig om iets mee te doen', 1220, 700, 40, C.koraal, 'left', 700, ramp(t, q.at('weinig') - 0.3, 0.5)); return; }
    if (t < tVerh) { sch(ctx); const kop = ramp(t, q.at('kopi') - 0.3, 0.6), vd = ramp(t, q.at('lijkt') - 0.2, 0.5), tb = q.at('buisje');
      const buisA = 1 - 0.7 * vd * (1 - ramp(t, tb - 0.4, 0.5));
      pcrBuisje(ctx, 330, 150, 15, { dna: 1 + Math.floor(kop * 5), a: buisA, hl: ramp(t, tb - 0.3, 0.4) });
      titel(ctx, 'PCR', 330, 760, 96, C.text, 'center', ramp(t, q.at('PCR') - 0.3, 0.5)); meta(ctx, 'polymerasekettingreactie', 330, 815, 'center', C.text2, ramp(t, q.at('PCR'), 0.5));
      if (vd > 0.01) { ctx.save(); ctx.globalAlpha *= vd * (1 - 0.5 * ramp(t, tb - 0.4, 0.5)); kaart(ctx, 700, 180, 1100, 470); meta(ctx, 'zoals de DNA-verdubbeling uit aflevering 2', 1250, 230, 'center', C.text2);
        const los = ramp(t, q.at('los') - 0.3, 0.9), bouw = clamp((t - q.at('bouwt') + 0.2) / 1.6, 0, 1), sq = 'GATTACAGCTGAC', bp = 44, x0 = 960;
        const R = dubbelStreng(ctx, x0, 300, sq, bp, { los, sep: 110 });
        if (bouw > 0.001) { const nN = Math.floor(bouw * sq.length); enkStreng(ctx, x0, R.onder - 2 * R.L, sq.slice(0, nN), bp, 1, { kleur: D2.nieuw }); polymeraseAchter(ctx, x0 + nN * bp, R.onder - R.L, 2 * R.L, { dir: 1, up: 1, a: 0.9 }); polymeraseVoor(ctx, x0 + nN * bp, R.onder - R.L, 2 * R.L, { dir: 1, up: 1, a: 0.9 }); }
        nb(ctx, 'strengen los', null, 720, 330, los * (1 - bouw), 'left'); nb(ctx, 'polymerase bouwt bij', null, x0 + 640, 590, ramp(t, q.at('bouwt') - 0.2, 0.4), 'center'); ctx.restore(); }
      const sw = ramp(t, q.at('temperatuur') - 0.2, 0.5); if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; kaart(ctx, 700, 690, 1100, 120); tx(ctx, 'temperatuur = schakelaar', 1250, 765, 48, C.goud); ctx.restore(); }
      return; }
    if (t < tEen) { sch(ctx); const tAf = q.at('Afkoelen'), tOp = q.at('opwarmen'); let f;
      if (t < tAf) f = 0.24 * clamp((t - tVerh) / 3.5, 0, 1); else if (t < tOp) f = lerp(0.25, 0.49, (t - tAf + 0.3) / 3.5); else f = lerp(0.5, 0.99, (t - tOp + 0.3) / 8.5);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 880); ctx.clip(); thermocycler(ctx, 160, 860, 1.6, { fase: f }); ctx.restore(); // teller van de bibliotheek viel onder y 880 (ondertitels); de verdubbeling heeft een eigen beeld
      const st = [['≈ 95 °C', 'strengen los', tVerh, tAf], ['≈ 55 °C', 'primers binden', tAf, tOp], ['≈ 72 °C', 'polymerase bouwt', tOp, 1e9]];
      st.forEach(([tmp, w, a0, a1], k) => { const on = fade(t, a0, a1, 0.3); const x = 1640, y = 200 + k * 150; ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * on; roundRect(ctx, x - 160, y - 50, 320, 110, 12); shape(ctx, rgba(C.fill, 0.9), on > 0.5 ? C.goud : C.line, on > 0.5 ? 2.5 : 1.2);
        text(ctx, tmp, x, y, fTekst(40, 800), [C.koraal, C.teal, C.koraal][k], 'center'); text(ctx, w, x, y + 42, fTekst(30, 600), C.text, 'center'); ctx.restore(); });
      const taq = fade(t, q.at('hittebestendige') - 0.3, q.at('bouwt') + 0.8, 0.4); if (taq > 0.01) { ctx.save(); ctx.globalAlpha *= taq; kaart(ctx, 1440, 640, 400, 200); bacterieEcht(ctx, 1540, 740, 120, { t, rot: -0.2 });
        text(ctx, 'uit een bacterie', 1720, 720, fTekst(28, 700), C.text, 'center'); text(ctx, 'uit hete bronnen', 1720, 760, fTekst(28, 600), C.text2, 'center'); ctx.restore(); }
      return; }
    // verdubbelen: 1 → 2 → 4 → 8 → 16 → 32, dan 30 cycli
    sch(ctx); const col = [1, 2, 4, 8, 16, 32]; const tTw = q.at('twee', 2), tDer = q.at('Dertig') - 0.2;
    col.forEach((n, c) => { const ac = c === 0 ? 1 : ramp(t, tTw - 0.5 + (c - 1) * 0.5, 0.4); const x = 200 + c * 230; ctx.save(); ctx.globalAlpha *= ac * (1 - 0.6 * ramp(t, tDer, 0.6));
      for (let k = 0; k < n; k++) { const y = 470 + (k - (n - 1) / 2) * Math.min(56, 600 / n); ctx.fillStyle = D2.oud; ctx.fillRect(x - 50, y - 6, 100, 4); ctx.fillStyle = c ? D2.nieuw : D2.oud; ctx.fillRect(x - 50, y + 2, 100, 4); }
      meta(ctx, c === 0 ? 'start' : 'cyclus ' + c, x, 850, 'center', C.text2); text(ctx, n + '', x, 150, fTekst(44, 800), C.text, 'center'); ctx.restore(); });
    const m = ramp(t, q.at('miljard') - 0.4, 0.6); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; kaart(ctx, 1200, 280, 640, 380); meta(ctx, 'na 30 cycli', 1520, 350, 'center', C.text2);
      titel(ctx, '> 1 miljard', 1520, 480, 88, C.goud); text(ctx, 'kopieën van precies dat ene stuk', 1520, 560, fTekst(32, 600), C.text, 'center'); ctx.restore(); } },

  // ---------------- vraag 1 (gesproken): coronatest
  v4(ctx, t, q) { sch(ctx); pcrBuisje(ctx, 520, 170, 14, { dna: 0, kleur: C.teal }); nb(ctx, 'neusmonster', null, 520, 700, 1, 'center');
    coronaVirus(ctx, 1260, 420, 170, { t }); nb(ctx, 'virus', null, 1260, 700, ramp(t, q.at('virus') - 0.2, 0.4), 'center');
    titel(ctx, '?', 880, 470, 140, C.goud, 'center', ramp(t, q.at('aangetoond') - 0.4, 0.5)); },

  // ---------------- antwoord: primers passen alleen op het virus; PCR meet het gekopieerde stuk; zelftest vangt eiwitten
  n5(ctx, t, q) { sch(ctx); const t2 = q.at('Zit') - 0.2, t3 = q.at('zelftest') - 0.8;
    if (t < t2) { const b = ramp(t, q.at('passen') - 0.2, 1.4);
      meta(ctx, 'virus', 150, 230, 'left', C.teal); primerStuk(ctx, 520, 200, 0.9, { bind: b, t, seq: 'GACCTGAAGTCCATGG' });
      nb(ctx, 'primer', 'past op het virus', 520 + 16 * 0.9 * 34 + 40, 190, b, 'left', C.goud); vinkje(ctx, 1640, 250, 1.6, C.groen, ramp(t, q.at('virus.') - 0.3, 0.4));
      meta(ctx, 'mens', 150, 560, 'left', C.text2, ramp(t, q.at('alleen') - 0.2, 0.5)); ctx.save(); ctx.globalAlpha *= ramp(t, q.at('alleen') - 0.2, 0.5);
      enkStreng(ctx, 420, 600, 'TACGGATTCAGGCTTAACCGTGA', 30.6, -1); enkStreng(ctx, 520, 470, 'GACCTGAAGTCCATGG', 30.6, 1, { kleur: C.goud });
      kruisje(ctx, 1640, 560, 1.6, C.koraal); meta(ctx, 'past niet', 1640, 640, 'center', C.koraal); ctx.restore(); return; }
    if (t < t3) { const kop = ramp(t, q.at('miljard') - 1.2, 1.4), meet = ramp(t, q.at('meet') - 0.2, 0.5);
      pcrBuisje(ctx, 470, 170, 13, { dna: Math.round(1 + kop * 7), kleur: C.teal, hl: meet }); nb(ctx, 'met virus', null, 470, 720, 1, 'center');
      pcrBuisje(ctx, 1450, 170, 13, { dna: 0, kleur: C.teal }); nb(ctx, 'zonder virus', 'primers passen niet', 1450, 720, 1, 'center');
      if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; for (let k = 0; k < 9; k++) { const x = 650 + (k % 3) * 120, y = 280 + Math.floor(k / 3) * 70; ctx.fillStyle = D2.oud; ctx.fillRect(x, y, 90, 5); ctx.fillStyle = D2.nieuw; ctx.fillRect(x, y + 8, 90, 5); }
        tx(ctx, '× 1 miljard', 770, 560, 40, C.goud); ctx.restore(); }
      const nv = ramp(t, q.at('niet') - 0.2, 0.5); if (nv > 0.01) { coronaVirus(ctx, 960, 610, 60, { t, a: 0.35 + 0.65 * (1 - nv) }); kruisje(ctx, 960, 610, 2, C.koraal, nv); meta(ctx, 'niet het virus zelf', 960, 720, 'center', C.koraal, nv); }
      haak(ctx, 650, 1000, 600, C.goud, meet * (1 - nv * 0.5), 'het gekopieerde stuk', 30); return; }
    const z = ramp(t, t3, 0.5), pc = ramp(t, q.at('nucleotidenvolgordes') - 0.4, 0.6), gev = ramp(t, q.at('gevoeliger') - 0.3, 0.5);
    ctx.save(); ctx.globalAlpha *= z; kaart(ctx, 120, 160, 780, 640); tx(ctx, 'zelftest', 510, 230, 44); zelftest(ctx, 330, 500, 6, { lijnT: 0.35 });
      for (let k = 0; k < 4; k++) { const x = 610 + (k % 2) * 140, y = 420 + Math.floor(k / 2) * 150; enzymKluwen(ctx, x, y, 34, { seed: 3 + k, col: C.oker }); }
      nb(ctx, 'eiwitten van het virus', 'niet te kopiëren', 680, 700, ramp(t, q.at('eiwitten') - 0.2, 0.5), 'center'); ctx.restore();
    ctx.save(); ctx.globalAlpha *= pc; kaart(ctx, 1020, 160, 780, 640); tx(ctx, 'PCR', 1410, 230, 44);
      const n = Math.round(lerp(1, 16, ramp(t, q.at('nucleotidenvolgordes'), 2))); for (let k = 0; k < n; k++) { const x = 1100 + (k % 4) * 160, y = 330 + Math.floor(k / 4) * 90; ctx.fillStyle = D2.oud; ctx.fillRect(x, y, 120, 6); ctx.fillStyle = D2.nieuw; ctx.fillRect(x, y + 10, 120, 6); }
      nb(ctx, 'nucleotidenvolgorde', 'wel te kopiëren', 1410, 720, 1, 'center'); ctx.restore();
    haak(ctx, 1060, 1760, 830, C.groen, gev, 'gevoeliger', 34); },

  // ---------------- vwo: RNA-virus → reverse transcriptase → DNA; primerkeuze
  n6(ctx, t, q) { sch(ctx); const tDe = q.at('primers') - 0.4, tTerug = q.at('Terug') - 0.2;
    if (t < tDe) { const rna = 'AUGGCUACCUGAAGUCC', bp = 52, x0 = 520, y = 330; const rt = clamp((t - q.at('reverse') + 0.2) / 4.0, 0, 1), nN = Math.floor(rt * rna.length);
      coronaVirus(ctx, 230, 380, 110, { t }); nb(ctx, 'coronavirus', 'RNA, geen DNA', 230, 600, ramp(t, q.at('coronavirus') - 0.3, 0.5), 'center');
      enkStreng(ctx, x0, y, rna, bp, 1, { kleur: D2.rna, rna: true, a: ramp(t, q.at('RNA') - 0.4, 0.6) }); nb(ctx, 'virus-RNA', null, x0 - 20, y - 50, ramp(t, q.at('RNA') - 0.2, 0.5), 'left', C.teal);
      const dna = rna.split('').map(b => ({ A: 'T', U: 'A', C: 'G', G: 'C' })[b]).join('');
      if (nN > 0) enkStreng(ctx, x0, y + 2 * bp * 30 / 34, dna.slice(0, nN), bp, -1, { kleur: D2.oud });
      if (rt > 0.001 && rt < 0.999) enzymKluwen(ctx, x0 + nN * bp, y + bp * 30 / 34, 70, { seed: 6, sluit: 0.4 + 0.2 * Math.sin(t * 6) });
      nb(ctx, 'reverse transcriptase', 'schrijft RNA over naar DNA', 1300, 640, ramp(t, q.at('reverse') - 0.2, 0.5), 'center', C.goud);
      nb(ctx, 'DNA', null, x0 - 20, y + 2 * bp * 30 / 34 + 70, ramp(t, q.at('DNA', 2) - 0.2, 0.5), 'left');
      tx(ctx, 'dan pas PCR', 1300, 780, 40, C.text, 'center', 700, ramp(t, q.at('begint') - 0.2, 0.5)); return; }
    if (t < tTerug) { const k = ramp(t, q.at('kiest') - 0.3, 0.6), m = ramp(t, q.at('nergens') - 0.3, 0.6);
      meta(ctx, 'virus-DNA', 150, 260, 'left', C.teal); primerStuk(ctx, 520, 230, 0.9, { bind: ramp(t, q.at('passen') - 0.3, 1.2), t, seq: 'GACCTGAAGTCCATGG' }); vinkje(ctx, 1640, 280, 1.6, C.groen, ramp(t, q.at('virus-DNA') - 0.1, 0.4));
      ctx.save(); ctx.globalAlpha *= m; meta(ctx, 'DNA van de mens', 150, 580, 'left', C.text2); enkStreng(ctx, 420, 620, 'TACGGATTCAGGCTTAACCGTGA', 30.6, -1); enkStreng(ctx, 520, 490, 'GACCTGAAGTCCATGG', 30.6, 1, { kleur: C.goud }); kruisje(ctx, 1640, 580, 1.6, C.koraal); ctx.restore();
      tx(ctx, 'de primers bepalen wát je kopieert', 960, 820, 40, C.goud, 'center', 700, k); return; }
    const u = ramp(t, tTerug, 0.5); druppelIcoon(ctx, 960, 380, 60, u); tx(ctx, 'terug naar het bloedspoor', 960, 640, 44, C.text, 'center', 700, u); },
});

// ---------------- Hoofdstuk 2: herhalingen, gel, profiel
const VADER = '#34609A', MOEDER = '#F2CF7A';
function herhaalBalk(ctx, x, y, n, kl, a = 1, bw = 46, letters = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = D2.oud; ctx.fillRect(x - 60, y + 14, 60, 8); ctx.fillRect(x + n * bw, y + 14, 60, 8);
  for (let k = 0; k < n; k++) { roundRect(ctx, x + k * bw + 2, y, bw - 4, 36, 6); shape(ctx, kl, _mixHex(kl, '#FFFFFF', 0.35), 1.2); if (letters) text(ctx, 'GATA', x + k * bw + bw / 2, y + 25, fTekst(16, 700), kl === VADER ? '#F2F2EE' : '#121A26', 'center'); }
  ctx.restore(); }
Object.assign(SCENES, {
  n8(ctx, t, q) { sch(ctx); const tVer = q.at('verschilt') - 0.3, tTwee = q.at('twee') - 0.3;
    if (t < tVer) { const chr = ramp(t, 0.2, 0.6); chromStaaf(ctx, 170, 180, 520, 46, '#AEB8C8', [[0.62, 0.66]], chr); chromStaaf(ctx, 240, 180, 520, 46, '#AEB8C8', [[0.62, 0.66]], chr);
      nb(ctx, 'een plek die niet codeert', null, 300, 150, ramp(t, q.at('niet') - 0.2, 0.5), 'left', C.goud);
      const sq = 'CTGATAGATAGATAGATACG', bp = 60, x0 = 420, y0 = 420, z = ramp(t, q.at('motief') - 0.6, 0.8);
      ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(268, 180 + 0.64 * 520); ctx.lineTo(x0 - 40, y0 - 40); ctx.moveTo(268, 180 + 0.64 * 520 + 6); ctx.lineTo(x0 - 40, y0 + 130); ctx.stroke(); dubbelStreng(ctx, x0, y0, sq, bp, { wiebel: 0, t });
      const tg = [wt('n8', 'G'), wt('n8', 'G', 2), wt('n8', 'G', 3), q.at('herhaald') + 0.3];
      for (let k = 0; k < 4; k++) { const on = ramp(t, k < 3 ? tg[k] - 0.1 : q.at('motief') + 0.2, 0.3) * (k === 3 ? ramp(t, wt('n8', 'G', 3) + 1.2, 0.3) : 1); if (on <= 0.01) continue; ctx.save(); ctx.globalAlpha *= on; ctx.strokeStyle = C.goud; ctx.lineWidth = 3;
        roundRect(ctx, x0 + (2 + 4 * k) * bp - bp * 0.48, y0 - 30, 4 * bp - 4, 2 * bp * 30 / 34 + 60, 10); ctx.stroke(); meta(ctx, 'GATA', x0 + (2 + 4 * k) * bp + 1.5 * bp, y0 - 46, 'center', C.goud); ctx.restore(); }
      meta(ctx, 'vergroot', x0, 700, 'left', C.text2, z); ctx.restore(); return; }
    if (t < tTwee) { const a = ramp(t, tVer, 0.5); [7, 10, 12].forEach((n, k) => { herhaalBalk(ctx, 520, 260 + k * 150, n, C.goud, a * ramp(t, tVer + k * 0.3, 0.4)); meta(ctx, 'iemand ' + (k + 1), 380, 286 + k * 150, 'right', C.text2, a); tx(ctx, n + '×', 520 + n * 46 + 90, 290 + k * 150, 36, C.text, 'left', 700, a); });
      tx(ctx, 'het aantal herhalingen verschilt per mens', 960, 780, 40, C.goud, 'center', 700, ramp(t, q.at('mens') - 0.2, 0.5)); return; }
    const v = ramp(t, q.at('vader') - 0.3, 0.5), m = ramp(t, q.at('moeder') - 0.3, 0.5), n8 = ramp(t, q.at('acht') - 0.2, 0.4), n11 = ramp(t, q.at('elf') - 0.2, 0.4);
    chromStaaf(ctx, 200, 200, 460, 46, VADER, [[0.62, 0.66]], v, C.goud); chromStaaf(ctx, 280, 200, 460, 46, MOEDER, [[0.62, 0.66]], m, C.goud);
    meta(ctx, 'van je vader', 200, 720, 'center', C.text2, v); meta(ctx, 'van je moeder', 300, 760, 'center', C.text2, m);
    herhaalBalk(ctx, 520, 330, 8, VADER, v, 66, true); herhaalBalk(ctx, 520, 520, 11, MOEDER, m, 66, true);
    tx(ctx, '8×', 520 + 8 * 66 + 90, 360, 48, C.text, 'left', 800, n8); tx(ctx, '11×', 520 + 11 * 66 + 90, 550, 48, C.text, 'left', 800, n11);
    tx(ctx, 'twee versies van dezelfde plek', 960, 160, 44, C.goud, 'center', 700, ramp(t, tTwee + 0.2, 0.5)); },

  n9(ctx, t, q) { sch(ctx); const tGel = q.at('gelelektroforese') - 0.4, tNeg = q.at('negatief') - 0.6, tBand = q.at('tijdje') - 0.7, tTw = q.at('Doe', 2) - 0.2;
    if (t < tGel) { const kop = ramp(t, 0.2, 1.2); pcrBuisje(ctx, 420, 180, 13, { dna: 6, a: 1 }); nb(ctx, 'gekopieerd stuk', null, 420, 720, kop, 'center');
      tx(ctx, 'hoe lang?', 1200, 470, 72, C.goud, 'center', 700, ramp(t, q.at('lang') - 0.3, 0.5));
      ctx.save(); ctx.globalAlpha *= kop; herhaalBalk(ctx, 900, 260, 8, VADER, 1, 46); herhaalBalk(ctx, 900, 620, 11, MOEDER, 1, 46); ctx.restore(); return; }
    if (t < tNeg) { const u = ramp(t, tGel, 0.6); gelElektroforese(ctx, 960, 420, 3.4, { a: u, loop: 0.15 + 0.3 * ramp(t, tGel + 1, 2), kleur: 0 }); nb(ctx, 'gelelektroforese', null, 960, 160, u, 'center'); return; }
    if (t < tBand) { // ingezoomd in de gel: netwerk van vezels, DNA met minladingen kruipt naar de pluspool; kort sneller
      ctx.save(); ctx.fillStyle = '#26384E'; roundRect(ctx, 360, 120, 1200, 720, 16); ctx.fill(); ctx.beginPath(); roundRect(ctx, 360, 120, 1200, 720, 16); ctx.clip();
      ctx.strokeStyle = rgba('#AFC0D0', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const x = 360 + hash(k * 3) * 1200, y = 120 + hash(k * 5 + 1) * 720, an = hash(k * 7) * 3.14, l = 80 + 120 * hash(k * 11); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an + 0.6) * l / 2, y + Math.sin(an + 0.6) * l / 2, x + Math.cos(an) * l, y + Math.sin(an) * l); ctx.stroke(); }
      const tl = q.at('kruipt') - 0.4, sp = (v) => clamp((t - tl) * v, 0, 560);
      const frag = (x, len, v) => { const y = 200 + sp(v); ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 2 + x) * 0.15); ctx.fillStyle = D2.oud; ctx.fillRect(-len / 2, -5, len, 4); ctx.fillStyle = D2.oud; ctx.fillRect(-len / 2, 3, len, 4);
        if (ramp(t, q.at('negatief') - 0.2, 0.4) > 0.5) for (let k = 0; k < len / 40; k++) text(ctx, '−', -len / 2 + 20 + k * 40, -14, fTekst(30, 800), C.teal, 'center'); ctx.restore(); };
      frag(620, 360, 30); frag(1050, 140, 75 * ramp(t, q.at('Korte') - 0.2, 0.3) + 30 * (1 - ramp(t, q.at('Korte') - 0.2, 0.3))); frag(1350, 240, 45); ctx.restore();
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; roundRect(ctx, 360, 120, 1200, 720, 16); ctx.stroke(); meta(ctx, 'vergroot · in de gel', 380, 100, 'left', C.text2);
      tx(ctx, '−', 300, 200, 64, C.text2); tx(ctx, '+', 300, 820, 64, C.koraal); nb(ctx, 'pluspool', null, 1590, 820, ramp(t, q.at('pluspool') - 0.3, 0.4), 'left', C.koraal);
      nb(ctx, 'kort stuk: sneller', 'door de mazen', 1590, 480, ramp(t, q.at('Korte') - 0.1, 0.4), 'left'); nb(ctx, 'lang stuk: trager', null, 1590, 300, ramp(t, q.at('lange') - 0.1, 0.4), 'left'); return; }
    if (t < tTw) { const u = ramp(t, tBand, 0.5); ctx.save(); ctx.globalAlpha *= u; const G = gelBoven(ctx, 700, 150, 360, 680, [[500, 300, 200, 100], [276, 288]], { loop: ramp(t, tBand, 1.8), namen: ['maat', 'bloedspoor'] });
      nb(ctx, 'banden', null, 1100, G.yb(282), ramp(t, q.at('banden') - 0.2, 0.4), 'left', C.goud);
      const hv = ramp(t, q.at('verder') - 0.2, 0.4); pijlA(ctx, 600, 220, 600, 780, C.line, hv); meta(ctx, 'lang', 560, 240, 'right', C.text2, hv); meta(ctx, 'kort', 560, 780, 'right', C.text2, hv); ctx.restore(); return; }
    const n = Math.round(lerp(2, 20, ramp(t, q.at('twintig') - 0.3, 1.6))), pr = ramp(t, q.at('DNA-profiel') - 0.4, 0.6), sc = ramp(t, q.at('streepjescode') - 0.3, 0.5);
    ctx.save(); ctx.globalAlpha *= 1 - pr; meta(ctx, 'een stuk of twintig plekken', 960, 150, 'center', C.text2); for (let i = 0; i < n; i++) { const x = 260 + i * 70; roundRect(ctx, x, 190, 56, 600, 6); shape(ctx, '#141A24', C.line, 1);
      for (let k = 0; k < 2; k++) { if (k === 1 && hash(DADER_SEED * 31 + i * 7) < 0.18) continue; const u = 0.12 + 0.76 * hash(DADER_SEED * 17 + i * 3 + k * 101); ctx.fillStyle = '#F4E3C8'; ctx.fillRect(x + 8, 190 + 600 * u - 4, 40, 8); } } ctx.restore();
    if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; profielCode(ctx, 360, 300, 1200, 300, DADER_SEED, 1, { rand: C.goud }); tx(ctx, 'DNA-profiel', 960, 250, 56, C.text); tx(ctx, 'een streepjescode van een mens', 960, 700, 44, C.goud, 'center', 700, sc); ctx.restore(); } },

  v10(ctx, t, q) { ctx.fillStyle = '#1E2E4A'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#C9A86A'; ctx.fillRect(0, 640, W, 240); ctx.fillStyle = '#2A6E7E'; ctx.fillRect(0, 560, W, 80);
    const B = bruinvis(ctx, 760, 600, 1.9, { houding: 'recht', wonden: ramp(t, q.at('bijtwonden') - 0.3, 0.5) }); nb(ctx, 'bruinvis', 'aangespoeld', 760, 330, 1, 'center');
    zeehond(ctx, 1560, 650, 1.7, { kijk: -1, t, a: ramp(t, q.at('zeehond') - 0.5, 0.6) }); nb(ctx, 'grijze zeehond', null, 1520, 420, ramp(t, q.at('zeehond') - 0.3, 0.5), 'center');
    const ms = [['dichte wond', q.at('dichte'), [869, 611]], ['open wond', q.at('open'), [943, 585]], ['gewone huid', q.at('gewone'), [640, 590]]]; // op de bijtwonden van bruinvis() (u 0,28–0,42), huid op de flank
    ms.forEach(([n, tt, p], k) => { const a = ramp(t, tt - 0.2, 0.4); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p[0], p[1], 26, 0, 6.283); ctx.stroke(); ctx.restore(); tx(ctx, (k + 1) + '', p[0], p[1] - 34, 30, C.goud, 'center', 800, a); meta(ctx, (k + 1) + ' · ' + n, 160, 160 + k * 46, 'left', C.text, a); });
    titel(ctx, '?', 1200, 260, 120, C.goud, 'center', ramp(t, q.at('Waar') - 0.3, 0.4)); },

  n11(ctx, t, q) { sch(ctx); const tGel = q.at('Eerst') - 0.3;
    const kol = [['dichte wond', 'cellen beschermd', true], ['open wond', 'uitgespoeld in zee', false], ['gewone huid', 'niets achtergelaten', false]];
    if (t < tGel) { kol.forEach(([n, m, ja], k) => { const x = 380 + k * 580, a = ramp(t, [q.at('dichte'), q.at('open'), q.at('gewone')][k] - 0.3, 0.5); kaart(ctx, x - 240, 200, 480, 520, a);
        ctx.save(); ctx.globalAlpha *= a; tx(ctx, n, x, 270, 40); celRond(ctx, x, 470, 110, { t, organellen: true, a: ja ? 1 : 0.0 }); if (!ja) { ctx.strokeStyle = rgba(C.line, 0.6); ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(x, 470, 110, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
        meta(ctx, m, x, 650, 'center', ja ? C.groen : C.text2); ctx.restore(); if (ja) nb(ctx, 'zeehondcel', null, x, 610, a, 'center'); }); return; }
    const lanes = [[282], [], [], []], hl = ramp(t, q.at('band') - 0.3, 0.4), ctrl = ramp(t, q.at('wattenstaafje') - 0.3, 0.5);
    pcrBuisje(ctx, 250, 260, 11, { dna: 5, a: ramp(t, tGel, 0.4) * (1 - ramp(t, q.at('gel.') - 0.2, 0.5) * 0.6) }); nb(ctx, 'PCR', 'primers: alleen zeehond-DNA', 290, 150, ramp(t, tGel, 0.4), 'center');
    const g = ramp(t, q.at('gel.') - 0.3, 0.5); ctx.save(); ctx.globalAlpha *= g;
    const G = gelBoven(ctx, 640, 170, 900, 600, lanes.map((l, i) => i === 3 && ctrl < 0.5 ? [] : l), { namen: ['dichte wond', 'open wond', 'huid', 'controle'], hl: hl > 0.5 ? [[0, 282]] : [], laanHl: ctrl > 0.5 ? 3 : -1, bandW: 70 });
    meta(ctx, 'verwachte hoogte', 630, G.yb(282) - 14, 'right', C.goud, hl); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(C.goud, 0.6 * hl); ctx.beginPath(); ctx.moveTo(640, G.yb(282)); ctx.lineTo(1560, G.yb(282)); ctx.stroke(); ctx.setLineDash([]);
    nb(ctx, 'zeehond-DNA zat erin', null, 752, 120, ramp(t, q.at('monster') - 0.4, 0.4), 'center', C.groen);
    if (ctrl > 0.01) { wattenstaafje(ctx, 1600, 420, 200, -1.3, ctrl); nb(ctx, 'schoon wattenstaafje', 'geen band', 1735, 470, ctrl, 'center'); vinkje(ctx, 1700, 560, 1.2, C.groen, ramp(t, q.at('band', 2) - 0.2, 0.4)); }
    ctx.restore(); },

  n12(ctx, t, q) { sch(ctx); const tPer = q.at('Per') - 0.3, tTw = q.at('eeneiige') - 0.6, tTerug = q.at('Terug') - 0.2;
    if (t < tPer) { titel(ctx, 'STR', 300, 220, 96, C.text, 'center', ramp(t, q.at('verder'), 0.5)); meta(ctx, 'short tandem repeat', 300, 270, 'center', C.text2, ramp(t, q.at('verder'), 0.5)); // gevuld zodra de speler na de vwo-zin begint
      const a1 = ramp(t, q.at('acht') - 0.3, 0.5), a2 = ramp(t, q.at('elf') - 0.3, 0.5), g1 = ramp(t, q.at('banden') - 0.3, 0.5), h2 = ramp(t, q.at('allebei') - 0.3, 0.5);
      herhaalBalk(ctx, 150, 420, 8, VADER, a1 * (1 - h2), 40); herhaalBalk(ctx, 150, 500, 11, MOEDER, a2 * (1 - h2), 40);
      herhaalBalk(ctx, 150, 420, 11, VADER, h2, 40); herhaalBalk(ctx, 150, 500, 11, MOEDER, h2, 40);
      const G = gelBoven(ctx, 1000, 170, 520, 640, [[300, 200, 100], [220, 288], [288]], { a: g1, namen: ['maat', '8 en 11', '11 en 11'], bandW: 52 }); // 8 en 11 herhalingen: twee duidelijk gescheiden banden (afstand vergroot)
      if (h2 > 0.01 && G.yb) { ctx.save(); ctx.globalAlpha *= h2 * g1; ctx.fillStyle = '#F4E3C8'; ctx.fillRect(1000 + 2.5 * 520 / 3 - 52, G.yb(288) - 6, 104, 12); ctx.restore(); }
      nb(ctx, 'twee banden', null, 1560, G.yb ? G.yb(250) : 500, g1 * (1 - h2), 'left', C.goud); nb(ctx, 'één band', null, 1560, G.yb ? G.yb(288) : 500, h2, 'left', C.goud);
      ctx.save(); ctx.globalAlpha *= h2; ctx.fillStyle = C.bgSchema; ctx.fillRect(1000 + 2.5 * 520 / 3 - 60, 160, 0, 0); ctx.restore(); return; }
    if (t < tTw) { const n20 = ramp(t, q.at('twintig') - 0.3, 0.6), kans = ramp(t, q.at('kans') - 0.2, 0.5);
      meta(ctx, 'op één plek: veel mensen hetzelfde', 960, 180, 'center', C.text2, ramp(t, tPer, 0.5) * (1 - n20)); menigte(ctx, 700, 300, 36, ramp(t, tPer, 0.5) * (1 - n20), -1);
      if (n20 > 0.01) { ctx.save(); ctx.globalAlpha *= n20; profielCode(ctx, 260, 220, 640, 220, DADER_SEED); profielCode(ctx, 1020, 220, 640, 220, 51); text(ctx, '=', 960, 350, fTitel(80), C.text2, 'center'); text(ctx, '?', 960, 420, fTitel(60), C.goud, 'center'); ctx.restore(); }
      tx(ctx, 'alle twintig gelijk: kans < 1 op een miljard', 960, 600, 44, C.goud, 'center', 700, kans); return; }
    if (t < tTerug) { const a = ramp(t, tTw, 0.6); persoon(ctx, 'daan', 700, 820, 420, { t, uit: 'blij', a }); persoon(ctx, 'thijs', 1220, 820, 420, { t, uit: 'blij', a, kijk: -1 });
      profielCode(ctx, 520, 160, 360, 110, 77, ramp(t, q.at('profiel') - 0.4, 0.5)); profielCode(ctx, 1040, 160, 360, 110, 77, ramp(t, q.at('profiel') - 0.4, 0.5)); text(ctx, '=', 960, 230, fTitel(64), C.goud, 'center');
      nb(ctx, 'eeneiige tweeling', 'hetzelfde profiel', 960, 860, a, 'center'); return; }
    const u = ramp(t, tTerug, 0.5); druppelIcoon(ctx, 960, 380, 60, u); tx(ctx, 'terug naar het bloedspoor', 960, 640, 44, C.text, 'center', 700, u); },
});

// ---------------- Hoofdstuk 3: sequencen, genoom, NIPT
// kleurstoffen bij het sequencen (frisse review 31 okt 2026): de stem noemt 'rood, groen, blauw, geel' zonder letters; de toewijzing volgt palet B
// zo veel mogelijk (A rood, T geel, C blauw; alleen G groen), anders leest een rode T als een A. SEQ_KLEUR (bibliotheek-sequencer) gaat mee.
const DYE = { A: '#E0503E', G: '#6CC07A', C: '#4E8FD6', T: '#E8C547' }; Object.assign(SEQ_KLEUR, DYE);
function leesStukjes(ctx, x0, y0, w, u, n, seed, a = 1, kl = '#AEB8C8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // losse stukjes → op hun plek in één lange volgorde
  for (let k = 0; k < n; k++) { const L = 70 + 50 * hash(seed + k), px = x0 + (k / n) * (w - L) , py = y0 + (k % 3) * 22; const sx = x0 + hash(seed + k * 3) * (w - L), sy = y0 - 260 + hash(seed + k * 5) * 200;
    const e = ease(clamp(u * 1.4 - (k % 7) * 0.06, 0, 1)); const x = lerp(sx, px, e), y = lerp(sy, py, e); ctx.fillStyle = kl; roundRect(ctx, x, y, L, 12, 4); ctx.fill();
    for (let j = 0; j < 5; j++) { ctx.fillStyle = DNA_BASE.base['ATCG'[Math.floor(hash(seed * 7 + k * 13 + j) * 4)]]; ctx.fillRect(x + 6 + j * (L - 12) / 5, y + 3, (L - 12) / 5 - 2, 6); } }
  ctx.restore(); }
function genoomKaart(ctx, x0, yb, s, a = 1, o = {}) { const { hl = {}, tel = 0, extra21 = 0, verwacht = 0 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; const P = [];
  for (let i = 0; i < 22; i++) { const x = x0 + i * 60 * s, h = CHROM_MB[i] * 1.2 * s; const kl = hl[i + 1] || '#AEB8C8';
    if (tel > 0.01) { const hh = h * (1 + (i === 20 ? 0.12 * extra21 : 0)) * tel; roundRect(ctx, x - 20 * s, yb - hh, 40 * s, hh, 6); shape(ctx, i === 20 && extra21 > 0.5 ? C.koraal : rgba(C.teal, 0.8), null);
      if (verwacht > 0.01 && i === 20) { ctx.save(); ctx.globalAlpha *= verwacht; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 34 * s, yb - h * tel); ctx.lineTo(x + 34 * s, yb - h * tel); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }
    else chromStaaf(ctx, x, yb - h, h, 22 * s, kl);
    meta(ctx, (i + 1) + '', x, yb + 34, 'center', hl[i + 1] ? C.goud : C.text2, 1, 22); P.push([x, yb - h]); }
  ctx.restore(); return P; }
Object.assign(SCENES, {
  n14(ctx, t, q) { sch(ctx); const tIdee = q.at('idee') - 0.6, tLeg = q.at('Leg') - 0.3, tGen = q.at('eerste') - 0.4;
    const tmpl = 'ATGCCTAGGCAT', bp = 60, x0 = 560, yT = 300;
    if (t < tIdee) { profielCode(ctx, 120, 200, 360, 200, DADER_SEED, 1 - 0.6 * ramp(t, q.at('basen') - 0.3, 0.5)); meta(ctx, 'profiel: lengtes', 300, 450, 'center', C.text2);
      const lees = ramp(t, q.at('letter') - 0.2, 1.4), n = Math.floor(lees * tmpl.length);
      ctx.save(); ctx.globalAlpha *= ramp(t, q.at('basen') - 0.3, 0.5); enkStreng(ctx, x0, 520, tmpl, bp, -1, { aan: (i) => i < n ? 1 : 0 });
      for (let i = n; i < tmpl.length; i++) text(ctx, '?', x0 + i * bp, 500, fTekst(48, 800), C.text2, 'center'); ctx.restore();
      titel(ctx, 'sequencen', 960, 760, 72, C.text, 'center', ramp(t, q.at('sequencen') - 0.3, 0.5)); meta(ctx, 'letter voor letter', 960, 810, 'center', C.goud, ramp(t, q.at('letter') - 0.2, 0.5)); return; }
    if (t < tLeg) { // één kopie wordt gebouwd en stopt bij een gekleurde stopnucleotide; dan kopieën van alle lengtes
      const b = clamp((t - q.at('polymerase') + 0.2) / 2.2, 0, 1), stop = ramp(t, q.at('stopt') - 0.4, 0.4), alle = ramp(t, q.at('alle') - 0.4, 0.8);
      enkStreng(ctx, x0, yT, tmpl, bp, 1); meta(ctx, 'voorbeeld', x0 - 50, yT + 10, 'right', C.text2);
      const copy = compl(tmpl), nB = Math.min(5, Math.floor(b * 5.99)), nStop = 6, yC = yT + 2 * bp * 30 / 34;
      ctx.save(); ctx.globalAlpha *= 1 - alle; enkStreng(ctx, x0, yC, copy.slice(0, nB), bp, -1, { kleur: D2.nieuw });
      if (stop > 0.01) { enkStreng(ctx, x0 + nB * bp, yC, copy[nB], bp, -1, { kleur: D2.nieuw, a: stop }); ctx.save(); ctx.globalAlpha *= stop; circ(ctx, x0 + nB * bp, yC + 30, 15, DYE[copy[nB]], '#F2F2EE', 2); ctx.restore();
        nb(ctx, 'gekleurde stopnucleotide', 'hier stopt de keten', x0 + nB * bp, yC + 110, stop, 'center', C.goud); }
      if (b > 0.001 && stop < 0.5) { polymeraseAchter(ctx, x0 + nB * bp, yT + bp * 30 / 34, 2 * bp * 30 / 34, { a: 0.9 }); polymeraseVoor(ctx, x0 + nB * bp, yT + bp * 30 / 34, 2 * bp * 30 / 34, { a: 0.9 }); }
      ctx.restore();
      const sp = ramp(t, q.at('speciale') - 0.3, 0.5); if (sp > 0.01 && alle < 0.5) { ctx.save(); ctx.globalAlpha *= sp * (1 - alle); kaart(ctx, 1360, 520, 460, 260); meta(ctx, 'vrije nucleotiden', 1590, 565, 'center', C.text2);
        'ATCGTACG'.split('').forEach((c, k) => { vrijNucleotide(ctx, 1420 + (k % 4) * 100, 640 + Math.floor(k / 4) * 80, c, -Math.PI / 2, 0.55, {}); if (k >= 6) circ(ctx, 1420 + (k % 4) * 100, 615 + Math.floor(k / 4) * 80, 9, DYE[c], '#F2F2EE', 1.5); }); ctx.restore(); }
      if (alle > 0.01) { ctx.save(); ctx.globalAlpha *= alle; for (let k = 0; k < 6; k++) { const n = k + 1, y = 400 + k * 62; ctx.fillStyle = D2.nieuw; ctx.fillRect(x0 - 20, y, n * bp, 10); circ(ctx, x0 - 20 + n * bp + 12, y + 5, 13, DYE['TACGGA'[k]], '#F2F2EE', 1.5); }
        nb(ctx, 'kopieën van alle lengtes', 'elk met één gekleurde base aan het eind', 1400, 560, 1, 'left'); ctx.restore(); }
      return; }
    if (t < tGen) { const f = 0.3 + 0.7 * clamp((t - tLeg) / (q.at('volgorde') - tLeg), 0, 1); sequencer(ctx, 150, 140, 1.05, { fase: f, seq: 'TACGGATC' });
      ['rood', 'groen', 'blauw', 'geel'].forEach((w, k) => { const a = ramp(t, q.at(w) - 0.2, 0.3), x = 760 + k * 130; roundRect(ctx, x - 50, 700, 100, 100, 12); ctx.save(); ctx.globalAlpha *= a; shape(ctx, DYE['AGCT'[k]], null); text(ctx, 'AGCT'[k], x, 770, fTekst(56, 800), '#121A26', 'center'); ctx.restore(); });
      haak(ctx, 700, 1210, 830, C.groen, ramp(t, q.at('volgorde') - 0.2, 0.4), '', 30); tx(ctx, 'de volgorde', 1300, 770, 44, C.groen, 'left', 700, ramp(t, q.at('volgorde') - 0.2, 0.4)); return; }
    const toen = ramp(t, tGen, 0.5), nu = ramp(t, q.at('Nu') - 0.3, 0.5), pz = ramp(t, q.at('computer') - 0.4, 2.4);
    ctx.save(); ctx.globalAlpha *= toen * (1 - 0.5 * nu); kaart(ctx, 120, 170, 620, 560); tx(ctx, 'het eerste menselijke genoom', 430, 240, 34); titel(ctx, '13 jaar', 430, 420, 88, C.text, 'center', ramp(t, q.at('dertien') - 0.3, 0.4));
      tx(ctx, '± 3 miljard dollar', 430, 540, 48, C.koraal, 'center', 700, ramp(t, q.at('miljard') - 0.3, 0.4)); ctx.restore();
    ctx.save(); ctx.globalAlpha *= nu; kaart(ctx, 820, 170, 980, 560); tx(ctx, 'nu', 1310, 240, 40); sequencer(ctx, 860, 640, 6, { soort: 'ngs', fase: 0.6 });
      leesStukjes(ctx, 1180, 560, 560, pz, 21, 5, ramp(t, q.at('miljoenen') - 0.3, 0.5)); nb(ctx, 'puzzelstukjes', null, 1460, 330, ramp(t, q.at('puzzelstukjes') - 0.3, 0.4) * (1 - pz), 'center');
      titel(ctx, 'een genoom in een dag', 1310, 690, 52, C.goud, 'center', ramp(t, q.at('dag') - 0.4, 0.4)); ctx.restore(); },

  v15(ctx, t, q) { sch(ctx); persoon(ctx, 'esra', 420, 840, 560, { outfit: 'jas', t, uit: 'neutraal' }); nb(ctx, 'zwanger', null, 420, 220, 1, 'center');
    const z = ramp(t, q.at('bloed') - 0.5, 0.6); zoomCircle(ctx, 1150, 420, 270, 470, 560, null, z, () => { ctx.fillStyle = '#3A2026'; ctx.fillRect(800, 100, 700, 700);
      for (let k = 0; k < 22; k++) { const dr = wander(k, t, 10, 0.3), x = 920 + hash(k * 3) * 460 + dr.x, y = 220 + hash(k * 5) * 400 + dr.y, kind = k % 9 === 0; ctx.save(); ctx.translate(x, y); ctx.rotate(hash(k) * 3);
        ctx.fillStyle = kind ? C.goud : '#AEB8C8'; ctx.fillRect(-26, -4, 52, 3); ctx.fillRect(-26, 2, 52, 3); ctx.restore(); } });
    nb(ctx, 'stukjes DNA in het bloed van de moeder', null, 1150, 740, z, 'center'); nb(ctx, 'goud = van de foetus', null, 1150, 790, ramp(t, q.at('foetus') - 0.3, 0.4) * z, 'center', C.goud);
    titel(ctx, '?', 1560, 240, 120, C.goud, 'center', ramp(t, q.at('Waaraan') - 0.3, 0.4)); },

  n16(ctx, t, q) { sch(ctx); const tPl = wt('n16', 'Die', 2) - 0.3, tTel = wt('n16', 'Je') - 0.3, tZek = wt('n16', 'Waarschijnlijk', 2) - 0.3;
    if (t < tPl) { const P = genoomKaart(ctx, 260, 780, 1, 1, { hl: { 2: t > q.at('twee') - 0.3 ? C.goud : 0, 7: t > q.at('zeven') - 0.3 ? C.goud : 0, 21: t > q.at('twintig') - 0.3 ? C.goud : 0 } });
      meta(ctx, 'het genoom: chromosoom 1 tot 22', 960, 140, 'center', C.text2, ramp(t, q.at('genoom') - 0.4, 0.4));
      [[2, q.at('twee')], [7, q.at('zeven')], [21, q.at('twintig')]].forEach(([c, tc], k) => { const u = ramp(t, tc - 1.0, 1.0); const sx = 400 + k * 500, sy = 250, [ex, ey] = P[c - 1]; const x = lerp(sx, ex, u), y = lerp(sy, ey - 30, u);
        ctx.save(); ctx.globalAlpha *= ramp(t, q.at('gesequencet') - 0.4, 0.4); ctx.fillStyle = '#AEB8C8'; roundRect(ctx, x - 60, y - 6, 120, 12, 4); ctx.fill(); for (let j = 0; j < 6; j++) { ctx.fillStyle = DNA_BASE.base['ATCG'[Math.floor(hash(c * 9 + j) * 4)]]; ctx.fillRect(x - 54 + j * 18, y - 3, 14, 6); } ctx.restore(); });
      return; }
    if (t < tTel) { persoon(ctx, 'esra', 360, 840, 560, { outfit: 'jas', t }); const z = ramp(t, tPl, 0.6);
      zoomCircle(ctx, 1100, 420, 280, 400, 560, null, z, () => { ctx.fillStyle = '#3A2026'; ctx.fillRect(800, 120, 700, 640); for (let k = 0; k < 20; k++) { const dr = wander(k, t, 10, 0.3), x = 880 + (k % 5) * 110 + dr.x, y = 250 + Math.floor(k / 5) * 100 + dr.y, kind = k === 7 || k === 16;
        const hl = ramp(t, q.at('tien') - 0.3, 0.4); ctx.save(); ctx.translate(x, y); ctx.rotate(hash(k) * 0.6 - 0.3); ctx.fillStyle = kind ? (hl > 0.5 ? C.goud : '#C9B896') : '#AEB8C8'; ctx.fillRect(-36, -5, 72, 4); ctx.fillRect(-36, 3, 72, 4); ctx.restore(); } });
      nb(ctx, 'uit de placenta', 'afgestorven cellen', 480, 380, ramp(t, q.at('placenta') - 0.3, 0.4), 'left', C.goud);
      nb(ctx, '± 1 op de 10 is van het kind', null, 1100, 760, ramp(t, q.at('tien') - 0.3, 0.4), 'center', C.goud); return; }
    if (t < tZek) { const tel = ramp(t, q.at('telt') - 0.5, 1.2), ex = ramp(t, q.at('meer') - 0.2, 1.0), ver = ramp(t, q.at('verwacht') - 0.3, 0.4);
      genoomKaart(ctx, 260, 760, 1, 1, { tel: 0.85 * tel + 0.001, extra21: ex, verwacht: ver }); meta(ctx, 'aantal stukjes per chromosoom', 960, 140, 'center', C.text2, tel);
      nb(ctx, 'iets te veel van 21', 'verwacht: stippellijn', 1520, 380, ex, 'center', C.koraal); tx(ctx, 'trisomie 21', 1520, 300, 48, C.koraal, 'center', 700, ramp(t, q.at('trisomie') - 0.3, 0.4)); return; }
    const w = ramp(t, tZek, 0.4), b = ramp(t, q.at('Maar') - 0.3, 0.5); tx(ctx, 'waarschijnlijk', 960, 170, 56, C.goud, 'center', 700, w); meta(ctx, 'screening, geen zekerheid', 960, 220, 'center', C.text2, w);
    kaart(ctx, 260, 280, 620, 480, b); bloedBuis(ctx, 570, 640, 2.6, b); tx(ctx, 'buisje bloed van de moeder', 570, 720, 34, C.text, 'center', 700, b); vinkje(ctx, 800, 340, 1.4, C.groen, b);
    kaart(ctx, 1040, 280, 620, 480, ramp(t, q.at('zekerheid') - 0.3, 0.4)); ctx.save(); ctx.globalAlpha *= ramp(t, q.at('zekerheid') - 0.3, 0.4); ctx.strokeStyle = '#DCE3EC'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1240, 600); ctx.lineTo(1460, 440); ctx.stroke(); roundRect(ctx, 1130, 590, 130, 40, 8); shape(ctx, rgba('#DCE3EC', 0.3), '#AFC0D0', 1.5); ctx.restore();
    tx(ctx, 'test van de foetus zelf', 1350, 720, 34, C.text, 'center', 700, ramp(t, q.at('zekerheid') - 0.3, 0.4)); meta(ctx, 'met een naald in de baarmoeder', 1350, 760, 'center', C.text2, ramp(t, q.at('naald') - 0.3, 0.4)); },

  n17(ctx, t, q) { sch(ctx); const tMeeste = q.at('meeste') - 0.3, tLezen = q.at('Lezen') - 0.3, tTerug = q.at('Terug') - 0.2;
    const ref = 'GATTACAGCTTGACCA', mijn = 'GATTACAGTTTGACCA', bp = 70, x0 = 400;
    if (t < tMeeste) { const r = ramp(t, q.at('verder'), 0.5), m = ramp(t, q.at('jouw') - 0.4, 0.6), v = ramp(t, q.at('variant') - 0.3, 0.4);
      meta(ctx, 'referentiegenoom', x0 - 40, 260, 'right', C.text2, r); enkStreng(ctx, x0, 230, ref, bp, 1, { a: r }); meta(ctx, 'jouw DNA', x0 - 40, 560, 'right', C.text2, m); enkStreng(ctx, x0, 560, mijn, bp, -1, { a: m });
      if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x0 + 8 * bp - bp * 0.5, 200, bp, 400, 10); ctx.stroke(); ctx.restore(); } nb(ctx, 'variant', 'hier wijkt het af', x0 + 8 * bp, 680, v, 'center', C.goud); return; }
    if (t < tLezen) { const a = ramp(t, tMeeste, 0.5), z = ramp(t, q.at('paar') - 0.3, 0.5); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 200, 420, 1520, 40, 20); shape(ctx, '#AEB8C8', null);
      for (let k = 0; k < 60; k++) { const x = 220 + hash(k * 7) * 1480, ziek = k % 23 === 4; ctx.fillStyle = ziek ? (z > 0.5 ? C.koraal : C.goud) : C.goud; ctx.fillRect(x - 2, 408, 4, 64); if (ziek) { ctx.save(); ctx.globalAlpha *= z; circ(ctx, x, 380, 14, C.koraal); ctx.restore(); } }
      tx(ctx, 'de meeste varianten doen niets', 960, 300, 44, C.text, 'center', 700, 1); tx(ctx, 'een paar: mutaties die een ziekte geven', 960, 580, 40, C.koraal, 'center', 700, z); ctx.restore(); return; }
    if (t < tTerug) { const a = ramp(t, tLezen, 0.5), b = ramp(t, q.at('weten') - 0.3, 0.5); kaart(ctx, 200, 240, 700, 460, a); ctx.save(); ctx.globalAlpha *= a; tx(ctx, 'lezen', 550, 320, 48); sequencer(ctx, 400, 640, 3.2, { soort: 'ngs', fase: 0.6 }); vinkje(ctx, 800, 300, 1.4, C.groen); ctx.restore();
      kaart(ctx, 1020, 240, 700, 460, b); ctx.save(); ctx.globalAlpha *= b; tx(ctx, 'wat betekent een variant?', 1370, 320, 40); enkStreng(ctx, 1160, 470, 'GATTAC', 70, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 1160 + 3 * 70 - 35, 440, 70, 120, 8); ctx.stroke(); titel(ctx, '?', 1370, 660, 80, C.goud); ctx.restore();
      tx(ctx, 'het echte werk', 1370, 790, 40, C.goud, 'center', 700, ramp(t, q.at('werk') - 0.3, 0.4)); return; }
    const u = ramp(t, tTerug, 0.5); druppelIcoon(ctx, 960, 380, 60, u); tx(ctx, 'terug naar het bloedspoor', 960, 640, 44, C.text, 'center', 700, u); },
});

// ---------------- Hoofdstuk 4: zoeken via verre familie
function snpChip(ctx, x, y, w, h, a = 1, t = 0, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0D1420', C.line, 1.5);
  const nx = 36, ny = 14; for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const k = i * ny + j; ctx.fillStyle = ['#D8604A', '#F2CF7A', '#86C3E8', '#34609A'][Math.floor(hash(k * 3 + 1) * 4)]; ctx.globalAlpha = a * (0.5 + 0.5 * hash(k * 7 + Math.floor(t * 2))); ctx.fillRect(x + 12 + i * (w - 24) / nx, y + 12 + j * (h - 24) / ny, (w - 24) / nx - 3, (h - 24) / ny - 3); }
  ctx.restore(); }
function siteScherm(ctx, x, y, w, h, a = 1, titel_ = 'stamboomsite') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#202C44', '#8FA0B5', 2); ctx.fillStyle = '#2E3C5A'; ctx.fillRect(x + 2, y + 2, w - 4, 44);
  text(ctx, titel_, x + 24, y + 32, fTekst(26, 700), C.text, 'left'); for (let k = 0; k < 3; k++) circ(ctx, x + w - 30 - k * 24, y + 24, 7, '#56688C'); ctx.restore(); }
function landKaart(ctx, x, y, w, h, land, regels, a = 1, kl = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.92), kl, 2);
  text(ctx, land, x + w / 2, y + 60, fTekst(44, 800), C.text, 'center'); regels.forEach(([s, aa, k2], k) => { ctx.save(); ctx.globalAlpha *= aa; text(ctx, s, x + w / 2, y + 130 + k * 52, fTekst(32, 600), k2 || C.text, 'center'); ctx.restore(); }); ctx.restore(); }
// gedeelde stukken tussen twee mensen: twee staven, gelijke stukken goud
function gedeeldPaar(ctx, x, y, len, segs, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < 2; k++) { roundRect(ctx, x, y + k * 34, len, 22, 11); shape(ctx, '#AEB8C8', null);
  ctx.save(); roundRect(ctx, x, y + k * 34, len, 22, 11); ctx.clip(); for (const [u0, u1] of segs) { ctx.fillStyle = C.goud; ctx.fillRect(x + u0 * len, y + k * 34, (u1 - u0) * len, 22); } ctx.restore(); }
  if (lab) text(ctx, lab, x - 24, y + 40, fTekst(30, 700), C.text, 'right'); ctx.restore(); }
Object.assign(SCENES, {
  n19(ctx, t, q) { sch(ctx); const tWel = q.at('anders') - 0.2, tZo = q.at('site') - 0.3, tAm = q.at('Amerika') - 0.5;
    if (t < tWel) { profielCode(ctx, 200, 300, 640, 220, DADER_SEED, 1, { rand: C.koraal }); nb(ctx, 'profiel van het bloedspoor', 'staat klaar', 520, 250, 1, 'center');
      databankStapel(ctx, 1360, 300, ramp(t, q.at('databank') - 0.5, 0.5)); nb(ctx, 'databank van de politie', null, 1360, 560, ramp(t, q.at('politie') - 0.3, 0.4), 'center'); kruisje(ctx, 1360, 370, 3, C.koraal, ramp(t, q.at('niet') - 0.1, 0.3)); return; }
    if (t < tZo) { const m = ramp(t, q.at('Miljoenen') - 0.3, 0.5), st = clamp((t - q.at('gestuurd') + 1.2) / 2, 0, 1);
      menigte(ctx, 140, 300, 36, m, -1, 1); siteScherm(ctx, 1080, 220, 700, 480, ramp(t, tWel, 0.5)); tx(ctx, 'ergens anders, in een andere vorm', 1430, 780, 36, C.text2, 'center', 600, fade(t, tWel, q.at('Miljoenen') + 1.5, 0.4));
      for (let k = 0; k < 6; k++) { const u = clamp(st * 1.5 - k * 0.1, 0, 1); if (u <= 0.01 || u >= 0.99) continue; const x = lerp(260 + k * 80, 1300, ease(u)), y = lerp(330 + (k % 3) * 70, 450, ease(u)); bloedBuis(ctx, x, y, 0.6, 1, 0.4, C.teal); }
      if (st > 0.5) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('gestuurd'), 0.6); for (let k = 0; k < 12; k++) { const x = 1140 + (k % 4) * 160, y = 300 + Math.floor(k / 4) * 120; roundRect(ctx, x, y, 140, 90, 8); shape(ctx, '#2A3A58', C.line, 1); circ(ctx, x + 30, y + 34, 12, C.mens); ctx.fillStyle = '#56688C'; ctx.fillRect(x + 54, y + 28, 70, 8); ctx.fillRect(x + 54, y + 46, 50, 8); } ctx.restore(); }
      nb(ctx, 'om familie te vinden', 'niet voor de politie', 1430, 760, ramp(t, q.at('familie') - 0.3, 0.4), 'center', C.goud); return; }
    if (t < tAm) { const c = ramp(t, tZo, 0.5), op = ramp(t, q.at('opnieuw') - 0.4, 0.5), ng = ramp(t, q.at('genoeg') - 0.3, 0.4);
      snpChip(ctx, 160, 200, 760, 380, c, t); nb(ctx, 'honderdduizenden plekken', 'waar mensen verschillen', 540, 650, ramp(t, q.at('honderdduizenden') - 0.3, 0.4), 'center');
      ctx.save(); ctx.globalAlpha *= op; druppelIcoon(ctx, 1150, 310, 38); pijlA(ctx, 1210, 340, 1340, 340); sequencer(ctx, 1380, 420, 4, { soort: 'ngs', fase: 0.6 }); nb(ctx, 'bloedspoor opnieuw gelezen', null, 1450, 500, 1, 'center');
        profielCode(ctx, 1150, 580, 520, 120, DADER_SEED, 1); kruisje(ctx, 1700, 640, 1.4, C.koraal, ng); meta(ctx, 'gewoon profiel: niet genoeg', 1410, 740, 'center', C.koraal, ng); ctx.restore(); return; }
    const am = ramp(t, tAm, 0.5), nl = ramp(t, q.at('Nederland') - 0.4, 0.5);
    landKaart(ctx, 260, 220, 640, 420, 'Amerika', [['politie mag zoeken', ramp(t, q.at('mag') - 0.3, 0.4), C.groen]], am);
    landKaart(ctx, 1020, 220, 640, 420, 'Nederland', [['mag ook, maar alleen', ramp(t, q.at('ook') - 0.3, 0.4)], ['bij ernstige misdrijven', ramp(t, q.at('ernstige') - 0.3, 0.4), C.goud], ['met toestemming', ramp(t, q.at('rechter') - 0.4, 0.4), C.goud], ['van een rechter', ramp(t, q.at('rechter') - 0.4, 0.4), C.goud]], nl); },

  v20(ctx, t, q) { sch(ctx); // stamboom: gedeelde overgrootouders, dader (?) en achterneef
    const L = (x1, y1, x2, y2) => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    L(900, 170, 1020, 170); L(960, 170, 960, 230); L(720, 230, 1200, 230); [[720], [1200]].forEach(([x]) => L(x, 230, x, 290)); L(720, 330, 720, 410); L(1200, 330, 1200, 410); L(720, 450, 720, 530); L(1200, 450, 1200, 530);
    sbSymbool(ctx, 900, 170, 30, 'm', false); sbSymbool(ctx, 1020, 170, 30, 'v', false); meta(ctx, 'overgrootouders', 1080, 178, 'left', C.text2);
    sbSymbool(ctx, 720, 310, 26, 'v', false); sbSymbool(ctx, 1200, 310, 26, 'm', false); sbSymbool(ctx, 720, 430, 26, 'm', false); sbSymbool(ctx, 1200, 430, 26, 'v', false);
    sbSymbool(ctx, 720, 560, 30, 'm', false, { vraag: true, hl: 1 }); nb(ctx, 'de dader', 'onbekend', 720, 640, 1, 'center', C.koraal);
    persoon(ctx, 'joost', 1440, 820, 300, { t, uit: 'neutraal', a: ramp(t, q.at('achterneef') - 0.4, 0.5) }); sbSymbool(ctx, 1200, 560, 30, 'm', false, { hl: ramp(t, q.at('achterneef') - 0.3, 0.4) });
    nb(ctx, 'achterneef', 'op de stamboomsite', 1200, 640, ramp(t, q.at('achterneef') - 0.3, 0.4), 'center', C.goud);
    titel(ctx, '?', 960, 600, 110, C.goud, 'center', ramp(t, q.at('gemeen') - 0.4, 0.4)); },

  n21(ctx, t, q) { sch(ctx); const tAch = q.at('Achterneven') - 0.3, tSite = q.at('site') - 0.3, tRech = q.at('Rechercheurs') - 0.3, tWat = q.at('Bij') - 0.3;
    if (t < tAch) { const h1 = ramp(t, q.at('helft') - 0.3, 0.5), h2 = ramp(t, q.at('kwart') - 0.4, 0.5), h3 = ramp(t, q.at('achtste') - 0.4, 0.5);
      persoon(ctx, 'noor', 860, 870, 200, { t, uit: 'blij' }); meta(ctx, 'jij', 930, 860, 'left', C.text2);
      persoon(ctx, 'linda', 720, 650, 200, { t, a: h1 }); persoon(ctx, 'rachid', 1000, 650, 210, { t, a: h1, kijk: -1 }); tx(ctx, '½', 1300, 560, 64, C.goud, 'center', 800, h1); meta(ctx, 'ouders', 1360, 560, 'left', C.text2, h1);
      [['ria', 520], ['henk', 700], ['malika', 1020], ['ahmed', 1200]].forEach(([id, x], k) => persoon(ctx, id, x, 410, 170, { t, a: h2, kijk: k < 2 ? 1 : -1 })); tx(ctx, '¼', 1400, 340, 64, C.goud, 'center', 800, h2); meta(ctx, 'grootouders', 1460, 340, 'left', C.text2, h2);
      for (let k = 0; k < 8; k++) sbSymbool(ctx, 470 + k * 110, 160, 22, k % 2 ? 'v' : 'm', false, { a: h3 }); tx(ctx, '⅛', 1460, 175, 64, C.goud, 'center', 800, h3); meta(ctx, 'overgrootouders', 1520, 175, 'left', C.text2, h3); return; }
    if (t < tSite) { const a = ramp(t, tAch, 0.5), d = ramp(t, q.at('delen') - 0.3, 0.5), l = ramp(t, q.at('lange') - 0.3, 0.5);
      ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; [[420, 170, 540, 170], [480, 170, 480, 220], [320, 220, 640, 220], [320, 220, 320, 260], [640, 220, 640, 260], [320, 300, 320, 360], [640, 300, 640, 360], [320, 400, 320, 460], [640, 400, 640, 460]].forEach(([a1, b1, c1, d1]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(c1, d1); ctx.stroke(); });
      sbSymbool(ctx, 420, 170, 24, 'm', false, { hl: 1, a }); sbSymbool(ctx, 540, 170, 24, 'v', false, { hl: 1, a }); meta(ctx, 'dezelfde overgrootouders', 480, 120, 'center', C.goud);
      [320, 640].forEach(x => { sbSymbool(ctx, x, 280, 20, 'v', false); sbSymbool(ctx, x, 380, 20, 'm', false); sbSymbool(ctx, x, 490, 26, 'm', false, { hl: 1, a }); }); nb(ctx, 'achterneven', null, 480, 560, 1, 'center'); ctx.restore();
      tx(ctx, '± 3 % gedeeld DNA', 1300, 200, 52, C.goud, 'center', 800, d);
      for (let k = 0; k < 4; k++) gedeeldPaar(ctx, 900, 300 + k * 120, 820, k === 0 ? [[0.2, 0.42]] : k === 2 ? [[0.55, 0.72]] : [], d, 'chr ' + [1, 4, 7, 12][k]);
      nb(ctx, 'een paar lange stukken: precies hetzelfde', null, 1310, 800, l, 'center', C.goud); return; }
    if (t < tRech) { const a = ramp(t, tSite, 0.5); [['nauw verwant', [[0.05, 0.4], [0.5, 0.95]]], ['', [[0.1, 0.35], [0.6, 0.8]]], ['', [[0.3, 0.45]]], ['ver verwant', [[0.6, 0.66]]]].forEach(([lab, sg], k) => { gedeeldPaar(ctx, 500, 220 + k * 140, 1000, sg, a * ramp(t, tSite + k * 0.4, 0.4)); meta(ctx, lab, 1530, 252 + k * 140, 'left', k === 0 ? C.goud : C.text2, a); });
      tx(ctx, 'langer en meer = nauwer verwant', 960, 820, 44, C.goud, 'center', 700, ramp(t, q.at('nauwer') - 0.3, 0.4)); return; }
    if (t < tWat) { const lijst = ramp(t, tRech, 0.5), boom = ramp(t, q.at('stamboom') - 0.4, 1.6), een = ramp(t, q.at('één') - 0.3, 0.5), pas = ramp(t, q.at('leeftijd') - 0.3, 0.5);
      kaart(ctx, 120, 200, 460, 540, lijst); ctx.save(); ctx.globalAlpha *= lijst; tx(ctx, 'verre familie', 350, 260, 36); for (let k = 0; k < 6; k++) { circ(ctx, 180, 320 + k * 66, 16, k === 0 ? C.goud : C.mens); ctx.fillStyle = '#56688C'; ctx.fillRect(210, 312 + k * 66, 280 - 40 * (k % 3), 14); } ctx.restore();
      const knopen = [[1100, 200, 'm'], [1220, 200, 'v'], [920, 360, 'v'], [1400, 360, 'm'], [820, 520, 'm'], [1020, 520, 'v'], [1300, 520, 'm'], [1500, 520, 'v']];
      ctx.save(); ctx.globalAlpha *= boom; ctx.strokeStyle = C.line; ctx.lineWidth = 2; [[1160, 200, 1160, 280], [920, 280, 1400, 280], [920, 280, 920, 330], [1400, 280, 1400, 330], [920, 390, 920, 450], [1400, 390, 1400, 450], [820, 450, 1020, 450], [1300, 450, 1500, 450], [820, 450, 820, 490], [1020, 450, 1020, 490], [1300, 450, 1300, 490], [1500, 450, 1500, 490]].forEach(([a1, b1, c1, d1]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(c1, d1); ctx.stroke(); });
      knopen.forEach(([x, y, s], k) => sbSymbool(ctx, x, y, 26, s, false, { dimA: k >= 4 && een > 0.5 && k !== 4 ? 0.35 : 1, hl: k === 3 ? 1 : 0, a: boom })); meta(ctx, 'achterneef', 1440, 368, 'left', C.goud); ctx.restore();
      if (een > 0.01) { persoon(ctx, 'erik', 820, 860, 260, { t, a: een, uit: 'neutraal' }); nb(ctx, 'past in leeftijd en woonplaats', null, 820, 590, pas, 'center', C.goud); }
      return; }
    const a = ramp(t, tWat, 0.5), sw = ramp(t, q.at('wattenstaafje') - 0.3, 0.6), cmp = ramp(t, q.at('Profiel') - 0.3, 0.5), m = ramp(t, q.at('Match') - 0.2, 0.3);
    const E = persoon(ctx, 'erik', 420, 860, 560, { t, a, uit: 'neutraal' }); const wx = E.hoofd ? E.hoofd.x + E.hoofd.r * 0.7 : 470, wy = E.hoofd ? E.hoofd.y + E.hoofd.r * 0.4 + Math.sin(t * 5) * 3 * sw : 360;
    const tip = [lerp(wx + 80, wx, sw), lerp(wy + 120, wy, sw)], grip = [tip[0] + 96, tip[1] + 28];
    persoon(ctx, 'kim', 700, 860, 560, { t, a, outfit: 'lab', kijk: -1, pose: sw > 0.01 ? 'handdruk' : 'staan', hand: { x: grip[0], y: grip[1] } });
    if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= a * sw; wattenstaafje(ctx, grip[0], grip[1], 100, Math.atan2(tip[1] - grip[1], tip[0] - grip[0])); ctx.restore(); nb(ctx, 'wattenstaafje langs de wang', null, 560, 200, sw, 'center'); }
    ctx.save(); ctx.globalAlpha *= cmp; profielCode(ctx, 1040, 220, 760, 150, DADER_SEED, 1, { rand: C.koraal }); meta(ctx, 'bloedspoor', 1420, 205, 'center', C.koraal); profielCode(ctx, 1040, 470, 760, 150, DADER_SEED, 1); meta(ctx, 'wattenstaafje', 1420, 455, 'center', C.text2); ctx.restore();
    if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; roundRect(ctx, 1030, 210, 780, 420, 16); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); titel(ctx, 'match', 1420, 740, 88, C.groen, 'center', m); } },

  n23(ctx, t, q) { sch(ctx); const tEl = q.at('Elke') - 0.3, tTerug = q.at('Terug') - 0.2;
    if (t < tEl) { const s1 = ramp(t, q.at('verder'), 0.5), snp = ramp(t, q.at('SNP') - 0.3, 0.5), lang = ramp(t, q.at('Lange') - 0.3, 0.6);
      tx(ctx, "STR's: lengte van een herhaling", 520, 200, 36, C.text2, 'center', 600, s1 * (1 - 0.6 * snp)); kruisje(ctx, 880, 190, 1, C.koraal, snp);
      ctx.save(); ctx.globalAlpha *= snp; tx(ctx, "SNP's: één base verschilt", 1340, 200, 40, C.goud, 'center'); enkStreng(ctx, 1080, 260, 'GATTACAG', 64, 1); enkStreng(ctx, 1080, 440, 'GATCACAG', 64, -1);
        ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 1080 + 3 * 64 - 32, 240, 64, 220, 8); ctx.stroke(); ctx.restore();
      meta(ctx, 'honderdduizenden tegelijk', 520, 300, 'center', C.text2, ramp(t, q.at('Honderdduizenden') - 0.3, 0.4)); snpChip(ctx, 200, 330, 640, 220, ramp(t, q.at('Honderdduizenden') - 0.3, 0.4), t);
      gedeeldPaar(ctx, 300, 650, 1300, [[0.25, 0.7]], lang, ''); nb(ctx, 'lang gelijk stuk', 'van een gezamenlijke voorouder', 960, 760, lang, 'center', C.goud); return; }
    if (t < tTerug) { const a = ramp(t, tEl, 0.5); const gens = [[[0.1, 0.9]], [[0.15, 0.55], [0.62, 0.85]], [[0.2, 0.42], [0.65, 0.78]], [[0.3, 0.4]]];
      gens.forEach((sg, k) => { const u = ramp(t, tEl + 0.8 + k * 1.1, 0.6); gedeeldPaar(ctx, 420, 160 + k * 160, 1100, sg, a * u); meta(ctx, 'generatie ' + (k + 1), 380, 200 + k * 160, 'right', C.text2, a * u);
        if (k > 0 && u > 0.01) { ctx.save(); ctx.globalAlpha *= u * a; meta(ctx, 'crossing-over knipt', 1560, 200 + k * 160, 'left', C.koraal, 1, 22); ctx.restore(); } });
      tx(ctx, 'hoe langer het stuk, hoe minder generaties geleden', 960, 830, 40, C.goud, 'center', 700, ramp(t, q.at('langer') - 0.3, 0.4)); return; }
    const u = ramp(t, tTerug, 0.5); archiefKast(ctx, 830, 220, 1, 0.6, 1, u, 'de zaak'); tx(ctx, 'terug naar de zaak', 960, 760, 44, C.text, 'center', 700, u); },
});

// ---------------- Hoofdstuk 4 (vervolg): DNA veranderen
function alvleesCel(ctx, x, y, r, t, a = 1, mrna = 0) { if (a <= 0.01) return; celRond(ctx, x, y, r, { t, a }); if (mrna > 0.01) { ctx.save(); ctx.globalAlpha *= a * mrna; for (let k = 0; k < 3; k++) mrnaSliert(ctx, x - r * 0.3 + k * r * 0.25, y + r * 0.35 - k * r * 0.12, r * 0.5, { t, seed: k + 2, rot: -0.3 + k * 0.2 }); ctx.restore(); } }
function koloniesSchaal(ctx, x, y, s, n, a = 1, groei = 1) { if (a <= 0.01) return; petrischaal(ctx, x, y, s, { a }); ctx.save(); ctx.globalAlpha *= a; const sy = Math.sin(35 * Math.PI / 180);
  for (let k = 0; k < n; k++) { const an = hash(k * 11) * 6.283, rr = 34 * s * Math.sqrt(hash(k * 7 + 3)); const cx = x + Math.cos(an) * rr, cy = y - 4 * s * sy + Math.sin(an) * rr * sy; ctx.beginPath(); ctx.ellipse(cx, cy, 2.6 * s * groei, 2.6 * s * groei * sy, 0, 0, 6.283); shape(ctx, '#EFE6CF', '#C9B896', 1); }
  ctx.restore(); }
Object.assign(SCENES, {
  n22(ctx, t, q) { sch(ctx); const S = [1, 2, 3, 4, 5].map(k => wt('n22', 'Stap', k)), tCr = q.at('Sinds') - 0.3;
    const stap = t < S[0] ? 0 : t < S[1] ? 1 : t < S[2] ? 2 : t < S[3] ? 3 : t < S[4] ? 4 : 5;
    stappenBalk(ctx, stap, ramp(t, S[0] - 0.4, 0.5) * (1 - ramp(t, tCr, 0.5)));
    if (stap === 0) { const v = ramp(t, q.at('veranderen') - 0.4, 0.5), b = ramp(t, q.at('bacterie') - 0.3, 0.5), g = ramp(t, q.at('Hoe') - 0.3, 0.5);
      tx(ctx, 'lezen', 560, 220, 48, C.text2, 'center', 700, 1 - b); pijlA(ctx, 680, 205, 840, 205, C.line, v * (1 - b)); tx(ctx, 'veranderen', 1030, 220, 56, C.goud, 'center', 800, v * (1 - b));
      ctx.save(); ctx.globalAlpha *= b; bacterieEcht(ctx, 1300, 470, 420, { t, plasmide: true }); insulineKeten(ctx, 1300, 740, 1.4, ramp(t, q.at('insuline') - 0.3, 0.5)); nb(ctx, 'menselijke insuline', null, 1300, 820, ramp(t, q.at('insuline') - 0.3, 0.5), 'center', C.oker); meta(ctx, 'aflevering 4', 1300, 220, 'center', C.text2); ctx.restore();
      ctx.save(); ctx.globalAlpha *= g; genOpbouw(ctx, 180, 470, 640, { t }); nb(ctx, 'menselijk insulinegen', null, 500, 400, 1, 'center'); pijlA(ctx, 860, 470, 1040, 470, C.goud, 1, 4); titel(ctx, '?', 950, 430, 72, C.goud); ctx.restore(); return; }
    if (stap === 1) { const sp = ramp(t, q.at('kern') - 0.6, 3.2), nk = ramp(t, q.at('bacterie', 2) - 0.3, 0.5), wa = ramp(t, q.at('Waarom') - 0.4, 0.5);
      alvleesCel(ctx, 330, 460, 210, t, 1 - 0.6 * wa, ramp(t, q.at('mRNA') - 0.4, 0.6)); nb(ctx, 'cel van de alvleesklier', 'maakt insuline', 330, 740, ramp(t, q.at('alvleesklier') - 0.3, 0.4), 'center'); nb(ctx, 'mRNA van het insulinegen', null, 330, 210, ramp(t, q.at('mRNA') - 0.3, 0.4), 'center', C.teal);
      ctx.save(); ctx.globalAlpha *= wa; genOpbouw(ctx, 720, 400, 1000, { t, splice: sp, hl: t > q.at('introns') - 0.3 && sp < 0.3 ? 'intron' : null }); nb(ctx, 'introns', 'komen niet in het eiwit', 1220, 300, ramp(t, q.at('introns') - 0.3, 0.4) * (1 - ramp(t, q.at('kern') - 0.4, 0.4)), 'center', C.goud);
        nb(ctx, 'in de kern geknipt', null, 1220, 300, ramp(t, q.at('geknipt') - 0.6, 0.4) * (1 - nk), 'center', C.goud); ctx.restore();
      if (nk > 0.01) { ctx.save(); ctx.globalAlpha *= nk; bacterieEcht(ctx, 1220, 720, 260, { t }); kruisje(ctx, 1420, 720, 1.4, C.koraal); meta(ctx, 'een bacterie kan geen introns knippen', 1220, 850, 'center', C.koraal); ctx.restore(); } return; }
    if (stap === 2) { const rna = 'AUGGCCCUGUGGAUGCGC', bp = 50, x0 = 460, y = 360, rt = clamp((t - q.at('transcriptase') + 0.4) / 3.2, 0, 1), nN = Math.floor(rt * rna.length);
      enkStreng(ctx, x0, y, rna, bp, 1, { kleur: D2.rna, rna: true }); nb(ctx, 'mRNA', 'zonder introns', x0 - 30, y - 50, 1, 'left', C.teal);
      const dna = rna.split('').map(b => ({ A: 'T', U: 'A', C: 'G', G: 'C' })[b]).join(''); if (nN > 0) enkStreng(ctx, x0, y + 2 * bp * 30 / 34, dna.slice(0, nN), bp, -1, { kleur: D2.oud });
      if (rt > 0.001 && rt < 0.999) enzymKluwen(ctx, x0 + nN * bp, y + bp * 30 / 34, 66, { seed: 6, sluit: 0.4 + 0.2 * Math.sin(t * 6) });
      nb(ctx, 'reverse transcriptase', null, 960, 620, ramp(t, q.at('reverse') - 0.3, 0.4), 'center', C.goud);
      const c = ramp(t, q.at('cDNA') - 0.3, 0.5); ctx.save(); ctx.globalAlpha *= c; kaart(ctx, 620, 680, 680, 130); tx(ctx, 'cDNA', 780, 760, 56, C.text); tx(ctx, 'het gen, zonder introns', 1080, 760, 36, C.goud); ctx.restore(); return; }
    if (stap === 3) { const kn = ramp(t, q.at('open') - 0.6, 1.0), re = ramp(t, q.at('restrictie-enzym') - 0.4, 0.5), st = clamp((t - q.at('restrictie-enzym')) / 3.6, 0, 1) * 2.4 + (t > q.at('plakkerige') - 0.5 ? 0.6 * ramp(t, q.at('plakkerige') - 0.5, 1) : 0);
      plasmideKnipPlak(ctx, 420, 520, 170, { stap: kn, t }); nb(ctx, 'plasmide', 'klein cirkeltje DNA', 420, 730, ramp(t, q.at('plasmide') - 0.3, 0.4), 'center');
      ctx.save(); ctx.globalAlpha *= re; restrictieEnzym(ctx, 1260, 460, 3.2, { stap: 1 + st, t }); ctx.restore(); nb(ctx, 'restrictie-enzym', 'knipt op een vaste volgorde', 1260, 220, re, 'center', C.goud);
      nb(ctx, 'plakkerige uiteinden', 'korte enkele strengen die passen', 1260, 760, ramp(t, q.at('plakkerige') - 0.3, 0.4), 'center', C.goud);
      meta(ctx, 'cDNA met hetzelfde enzym', 1260, 160, 'center', C.text2, ramp(t, q.at('cDNA') - 0.3, 0.4)); return; }
    if (stap === 4) { const st = 1 + 2 * clamp((t - q.at('ligase') + 0.6) / 3.0, 0, 1); plasmideKnipPlak(ctx, 820, 480, 230, { stap: st, t });
      nb(ctx, 'ligase plakt', null, 1260, 300, ramp(t, q.at('ligase') - 0.3, 0.4), 'left', C.goud); nb(ctx, 'recombinant plasmide', 'met het cDNA erin', 1260, 640, ramp(t, q.at('recombinant') - 0.3, 0.4), 'left'); return; }
    if (t < tCr) { const br = ramp(t, q.at('breng') - 0.3, 0.6), ne = ramp(t, q.at('Niet') - 0.3, 0.5), res = ramp(t, q.at('resistentie') - 0.4, 0.5), bod = ramp(t, q.at('voedingsbodem') - 0.4, 0.6), gr = ramp(t, q.at('groeien') - 0.3, 1.2), ins = ramp(t, q.at('insulinegen', 2) - 0.6, 0.6), gm = ramp(t, q.at('genetisch') - 0.3, 0.5);
      if (bod < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - bod; for (let k = 0; k < 4; k++) { const x = 360 + k * 400, met = k % 2 === 0; bacterieEcht(ctx, x, 430, 280, { t, plasmide: met && ne > 0.5 ? true : (br > 0.5 && k === 0), seed: 3 + k, rot: 0.1 * Math.sin(k) }); meta(ctx, met ? 'met plasmide' : 'zonder', x, 600, 'center', met ? C.groen : C.text2, ne); }
        nb(ctx, 'resistentiegen tegen een antibioticum', 'ook op het plasmide', 960, 740, res, 'center', C.oker); ctx.restore(); }
      if (bod > 0.01) { ctx.save(); ctx.globalAlpha *= bod * (1 - ins); koloniesSchaal(ctx, 560, 560, 5, Math.round(12 * gr), 1, 1); nb(ctx, 'voedingsbodem met antibioticum', 'alleen bacteriën mét plasmide groeien', 560, 220, 1, 'center'); ctx.restore(); }
      if (ins > 0.01) { ctx.save(); ctx.globalAlpha *= ins; bacterieEcht(ctx, 760, 480, 420, { t, plasmide: true }); for (let k = 0; k < 3; k++) insulineKeten(ctx, 1260 + (k % 2) * 160, 340 + k * 150, 1.1); nb(ctx, 'menselijke insuline', null, 1340, 780, 1, 'center', C.oker); ctx.restore(); }
      tx(ctx, 'genetisch gemodificeerd', 960, 860, 44, C.goud, 'center', 700, gm); return; }
    const c = ramp(t, tCr, 0.5), st = clamp((t - q.at('CRISPR') + 0.3) / 5, 0, 1) * 3, sk = ramp(t, q.at('sikkelcelziekte') - 0.5, 0.5);
    ctx.save(); ctx.globalAlpha *= c * (1 - sk); tx(ctx, 'CRISPR', 960, 160, 64, C.text); meta(ctx, 'moleculaire schaar · knipt op één gekozen plek', 960, 210, 'center', C.text2); crisprCas9(ctx, 960, 580, 3.0, { stap: st, t }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= sk; for (let k = 0; k < 6; k++) sikkelCel(ctx, 520 + (k % 3) * 160, 400 + Math.floor(k / 3) * 150, 50, hash(k) * 3); for (let k = 0; k < 6; k++) rodeBloedcel(ctx, 1240 + (k % 3) * 150, 400 + Math.floor(k / 3) * 150, 52, hash(k + 9) * 3, 0, 1);
      pijlA(ctx, 940, 470, 1100, 470, C.goud); tx(ctx, 'sikkelcelziekte', 680, 270, 44, C.koraal); tx(ctx, 'behandeling met CRISPR', 1390, 270, 40, C.groen); ctx.restore(); },

  n22v(ctx, t, q) { sch(ctx); const tRep = q.at('cel') - 0.3, tGen = q.at('werkend') - 0.4, tSik = wt('n22v', 'Zo', 2) - 0.3, tSom = q.at('verandering') - 0.3;
    if (t < tRep) { const st = t < q.at('zoekt') ? 0.5 : t < q.at('knipt') ? lerp(0.5, 2.4, (t - q.at('zoekt')) / (q.at('knipt') - q.at('zoekt'))) : lerp(2.5, 3, (t - q.at('knipt')) / 1.5);
      crisprCas9(ctx, 960, 470, 3.4, { stap: st, t }); nb(ctx, 'Cas9', 'het enzym dat knipt', 520, 300, ramp(t, q.at('Cas9', 2) - 0.3, 0.4), 'center', C.goud);
      nb(ctx, 'gids-RNA', 'zelf gekozen volgorde', 1420, 300, ramp(t, q.at('gids-RNA') - 0.3, 0.4), 'center', C.teal); nb(ctx, 'past via baseparing', null, 1420, 760, ramp(t, q.at('baseparing') - 0.3, 0.4), 'center', C.teal);
      nb(ctx, 'beide strengen door', null, 520, 760, ramp(t, q.at('strengen') - 0.3, 0.4), 'center', C.koraal); return; }
    if (t < tGen) { const uit = q.at('Geef') - 0.3, st = 3 + clamp((t - tRep) / 2, 0, 1); const nieuw = t > uit;
      crisprCas9(ctx, 960, 470, 3.4, { stap: nieuw ? 3 + clamp((t - uit) / 2.5, 0, 1) : st, reparatie: nieuw ? 'nieuw' : 'uit', t });
      nb(ctx, 'foutje bij het repareren', 'het gen staat uit', 960, 790, fade(t, q.at('Vaak') - 0.3, uit), 'center', C.koraal);
      nb(ctx, 'meegegeven stuk DNA als voorbeeld', 'gewijzigde versie ingebouwd', 960, 790, ramp(t, q.at('voorbeeld') - 0.6, 0.4), 'center', C.goud); return; }
    if (t < tSik) { const a = ramp(t, tGen, 0.5), vir = ramp(t, q.at('virus') - 0.4, 0.5), uit = ramp(t, q.at('Of') - 0.3, 0.5);
      persoon(ctx, 'henk', 300, 860, 520, { t, a, uit: 'neutraal' }); nb(ctx, 'patiënt', null, 300, 280, a, 'center'); tx(ctx, 'gentherapie', 960, 160, 56, C.goud, 'center', 800, ramp(t, q.at('gentherapie') - 0.3, 0.4));
      kaart(ctx, 600, 240, 560, 520, vir); ctx.save(); ctx.globalAlpha *= vir; coronaVirus(ctx, 760, 440, 70, { t, rna: 0, n: 0 }); enkStreng(ctx, 700, 432, 'ATGC', 30, 1, { kleur: C.goud }); pijlA(ctx, 850, 440, 960, 440); celRond(ctx, 1040, 450, 90, { t }); tx(ctx, 'virus als vervoermiddel', 880, 640, 30, C.text); meta(ctx, 'onschadelijk gemaakt', 880, 690, 'center', C.text2); ctx.restore();
      kaart(ctx, 1220, 240, 560, 520, uit); ctx.save(); ctx.globalAlpha *= uit; const k = clamp((t - q.at('halen')) / 3, 0, 1); for (let i = 0; i < 4; i++) celRond(ctx, 1340 + (i % 2) * 130, 400 + Math.floor(i / 2) * 120, 50, { t, organellen: false, seed: i });
      tx(ctx, 'cellen eruit, aanpassen, terug', 1500, 690, 30, C.text); pijlA(ctx, 1640, 420, 1700, 420, C.goud, ramp(t, q.at('passen') - 0.3, 0.4)); vinkje(ctx, 1730, 470, 1, C.groen, ramp(t, q.at('terug') - 0.3, 0.4)); ctx.restore(); return; }
    if (t < tSom) { const st = ramp(t, q.at('stamcellen') - 0.4, 0.5), kn = ramp(t, q.at('schakelaar') - 0.3, 0.5), hb = ramp(t, q.at('hemoglobine') - 0.6, 0.8), jr = ramp(t, q.at('2023') - 0.4, 0.5);
      tx(ctx, 'sikkelcelziekte', 960, 150, 52, C.koraal); stamcelDeling(ctx, 360, 440, 120, { t, a: st }); nb(ctx, 'stamcellen uit het beenmerg', null, 360, 262, st, 'center');
      ctx.save(); ctx.globalAlpha *= kn; kaart(ctx, 620, 200, 600, 320); tx(ctx, 'CRISPR knipt een schakelaar kapot', 920, 260, 32); genOpbouw(ctx, 700, 390, 440, { t, hl: 'promotor' }); kruisje(ctx, 730, 390, 1.4, C.koraal); ctx.restore();
      for (let k = 0; k < 3; k++) sikkelCel(ctx, 1380 + k * 120, 360, 46, 0.3 * k, 1 - hb); ctx.save(); ctx.globalAlpha *= hb; for (let k = 0; k < 3; k++) rodeBloedcel(ctx, 1380 + k * 120, 360, 48, k, 0, hb);
        nb(ctx, 'hemoglobine van vóór de geboorte', 'geen sikkels', 1500, 470, 1, 'center', C.groen); ctx.restore(); tx(ctx, 'goedgekeurd sinds 2023', 1320, 860, 40, C.goud, 'center', 700, jr); /* onder de cellenrij (stond over de rode bloedcellen) */ return; }
    const s = ramp(t, tSom, 0.5), k = ramp(t, q.at('Een', 2) - 0.3, 0.5), nl = ramp(t, q.at('Nederland') - 0.3, 0.4);
    kaart(ctx, 160, 200, 760, 560, s); ctx.save(); ctx.globalAlpha *= s; tx(ctx, 'somatisch', 540, 270, 48); persoon(ctx, 'henk', 540, 680, 340, { t }); tx(ctx, 'lichaamscellen: niet erfelijk', 540, 730, 32, C.groen); ctx.restore();
    kaart(ctx, 1000, 200, 760, 560, k); ctx.save(); ctx.globalAlpha *= k; tx(ctx, 'kiembaan', 1380, 270, 48); eicelEcht(ctx, 1180, 460, 80, { t }); zaadcelEcht(ctx, 1380, 460, 160, { t }); blastocyste(ctx, 1600, 460, 70, { t }); tx(ctx, 'eicel, zaadcel, embryo: wel erfelijk', 1380, 680, 32, C.koraal); ctx.restore();
    tx(ctx, 'in Nederland verboden', 1380, 730, 32, C.koraal, 'center', 800, nl); },

  n22c(ctx, t, q) { sch(ctx); [['lezen', q.at('Lezen')], ['vergelijken', q.at('vergelijken')], ['veranderen', q.at('veranderen')]].forEach(([w, tt], k) => tx(ctx, w, 420 + k * 540, 380, 60, C.text, 'center', 800, ramp(t, tt - 0.3, 0.4)));
    const v = ramp(t, q.at('mag') - 0.4, 0.5); tx(ctx, 'mag dat?', 760, 600, 64, C.goud, 'center', 800, v); tx(ctx, 'wie beslist?', 1180, 600, 64, C.goud, 'center', 800, ramp(t, q.at('beslist') - 0.4, 0.4)); },

  // ---------------- Samenvatting
  n25(ctx, t, q) { sch(ctx); const it = [['kopiëren', q.at('Kopi')], ['sorteren', q.at('Sorteren')], ['lezen', q.at('Lezen')], ['vinden', q.at('vinden')]];
    druppelIcoon(ctx, 960, 160, 30, ramp(t, 0.1, 0.4) * (1 - 0.6 * ramp(t, it[0][1], 0.5)));
    it.forEach(([w, tt], k) => { const a = ramp(t, tt - 0.4, 0.5), x = 300 + k * 440, hl = fade(t, tt - 0.4, k < 3 ? it[k + 1][1] - 0.4 : 1e9, 0.3); kaart(ctx, x - 190, 280, 380, 440, a, hl > 0.5 ? C.goud : C.line); ctx.save(); ctx.globalAlpha *= a;
      tx(ctx, w, x, 340, 40, hl > 0.5 ? C.goud : C.text);
      if (k === 0) pcrBuisje(ctx, x, 380, 8, { dna: 5 }); if (k === 1) gelBoven(ctx, x - 110, 380, 220, 280, [[400, 200], [282, 270]], { polen: 0 });
      if (k === 2) ['A', 'C', 'G', 'T'].forEach((b, j) => { roundRect(ctx, x - 150 + j * 76, 470, 64, 64, 8); shape(ctx, DYE[b], null); text(ctx, b, x - 118 + j * 76, 515, fTekst(36, 800), '#121A26', 'center'); });
      if (k === 3) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; [[x - 30, 420, x + 30, 420], [x, 420, x, 470], [x - 80, 470, x + 80, 470], [x - 80, 470, x - 80, 510], [x + 80, 470, x + 80, 510], [x - 80, 550, x - 80, 600], [x + 80, 550, x + 80, 600]].forEach(([a1, b1, c1, d1]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(c1, d1); ctx.stroke(); });
        sbSymbool(ctx, x - 30, 420, 18, 'm', false, { a }); sbSymbool(ctx, x + 30, 420, 18, 'v', false, { a }); sbSymbool(ctx, x - 80, 530, 18, 'v', false, { a }); sbSymbool(ctx, x + 80, 530, 18, 'm', false, { a }); sbSymbool(ctx, x - 80, 620, 20, 'm', false, { vraag: true, a }); sbSymbool(ctx, x + 80, 620, 20, 'm', false, { hl: 1, a }); }
      ctx.restore(); }); },
  n26(ctx, t, q) { sch(ctx); const ids = [['ria', 70], ['henk', 72], ['linda', 82], ['noor', 88], ['kind', 60], ['rachid', 84], ['malika', 72], ['ahmed', 74]];
    ids.forEach(([id, h], k) => persoon(ctx, id, 380 + k * 160, 760, h * 4.2, { t, uit: id === 'noor' ? 'denkt' : 'blij', a: ramp(t, 0.1 + k * 0.08, 0.4), kijk: k < 4 ? 1 : -1 }));
    haak(ctx, 300, 1620, 790, C.goud, ramp(t, q.at('familie') - 0.3, 0.4), 'je deelt je DNA met je familie', 34);
    const w = ramp(t, q.at('Wat') - 0.3, 0.4); tx(ctx, 'wat wil jij weten?', 960, 160, 56, C.goud, 'center', 800, w * (1 - 0.4 * ramp(t, q.at('niet', 2) - 0.3, 0.4))); tx(ctx, 'en wat liever niet?', 960, 230, 44, C.text, 'center', 700, ramp(t, q.at('liever') - 0.3, 0.4));
    meta(ctx, 'aflevering 8', 1760, 140, 'right', C.text2, ramp(t, q.at('acht') - 0.3, 0.4)); },
});
