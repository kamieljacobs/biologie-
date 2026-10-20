// Wat word jij? · Verpleegkunde en Fysiotherapie · Hoe weefsel herstelt — scènes per alinea (v1.0, 20 okt 2026). Look: Schema en Micro, met cast (Lotte, Sam, Opa Henk, Verpleegkundige Jesse, Fysiotherapeut Femke).
// Rode draad: Lotte (schaafwond) en Sam (achillespees) raken op dezelfde zaterdag gewond.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function draaiPijl(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; const a0 = Math.PI * 1.05, a1 = a0 + 2.4; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke();
  pijl(ctx, x + Math.cos(a1 - 0.25) * r, y + Math.sin(a1 - 0.25) * r, x + Math.cos(a1) * r, y + Math.sin(a1) * r, C.goud, 1, 7, 26); ctx.restore(); }
// één tekstbalk tegelijk: de oude weg, dan de nieuwe
function wisselChip(ctx, lijst, x, y, t, q, px = 28) { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n)) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.3)) / 0.3, 0, 1) : 0; chip(ctx, s2, x, y, col, q.on(w, n, 0.35) * (1 - uit), px); }

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.12) % 1; huidWond(ctx, 1000, 330, 800, 440, t, { bloed: clamp(1 - u * 3, 0, 1), korst: clamp(u * 4 - 0.4, 0, 1) * clamp(2.4 - u * 3, 0, 1), fib: clamp(u * 3 - 0.8, 0, 1), vaat: clamp(u * 3 - 1, 0, 1), epi: clamp(u * 3 - 1.2, 0, 1), wbc: clamp(u * 4 - 0.5, 0, 1) * clamp(2 - u * 3, 0, 1) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const LX = 520, SX = 1380, VY = 820, PH = 470;
    tag(ctx, 'zaterdag', 960, 130, C.goud, clamp(t / 0.6, 0, 1) * (1 - q.on('week', 1)), 'center', 32);
    // Lotte met fiets (omgevallen)
    const L = q.on('Lotte', 1, 0.3), wond = q.on('schaaft', 1, 0.3), dicht = q.on('dicht', 1, 1.2);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.translate(LX - 250, VY - 30); ctx.rotate(-0.35); fiets(ctx, 0, 0, 1.7, 1); ctx.restore(); }
    persoon(ctx, 'lotte', LX, VY, PH, { t, a: L, outfit: 'sport', kijk: 1, uit: t < q.at('week', 1) ? (wond > 0.5 ? 'bezorgd' : 'neutraal') : 'blij' });
    if (L > 0.01) { const k = knieWond(ctx, 'lotte', LX, VY, PH, 1, wond * L, dicht * 0.75); flits(ctx, k.x, k.y, 60, wond * (1 - q.on('Sam', 1)), C.koraal); naamBij(ctx, 'Lotte', '', LX, 300, L, 'center'); }
    // Sam na de sprint
    const S = q.on('Sam', 1, 0.3), klap = q.on('klap', 1, 0.3);
    persoon(ctx, 'sam', SX, VY, PH, { t, a: S, outfit: 'sport', kijk: -1, uit: klap > 0.5 ? 'bezorgd' : 'blij' });
    if (S > 0.01) { const hp = hielPunt('sam', SX, VY, PH, 1); flits(ctx, hp.x + 10, hp.y, 60, klap * (1 - q.on('week', 1)), C.koraal); naamBij(ctx, 'Sam', '', SX, 300, S, 'center');
      naamBij(ctx, 'achillespees', 'gescheurd', hp.x + 70, hp.y - 30, q.on('achillespees', 1) * (1 - q.on('week', 1)), 'left', C.koraal); }
    // na een week / na drie maanden
    const W1 = q.on('week', 1); if (W1 > 0.01) { tag(ctx, 'na 1 week', LX, 160, C.groen, W1, 'center', 34); vink_(ctx, LX + 170, 145, 22, q.on('dicht', 1)); }
    const M3 = q.on('maanden', 1); if (M3 > 0.01) { tag(ctx, 'na 3 maanden', SX, 160, C.koraal, M3, 'center', 34); naamBij(ctx, 'nog niet rennen', '', SX + 130, 560, q.on('rennen', 1), 'left', C.koraal); kruis(ctx, SX + 200, 145, 18, q.on('rennen', 1)); }
    vraagteken(ctx, 960, 520, q.on('verschil', 1), 150); },

  // ---------- H1 ----------
  s04(ctx, t, q) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); // micro-kleur zonder korrel antwoord(ctx, 'Antwoord a', 1 - q.on('vier', 1));
    const st0 = q.at('stolling', 1), on = q.at('ontsteking', 1), ob = q.at('opbouw', 1), vb = q.at('verbouwen', 1);
    const act = t < st0 ? -1 : t < on ? 0 : t < ob ? 1 : t < vb ? 2 : 3; faseLijn(ctx, 260, 76, 1400, q.on('vier', 1), act);
    const S = { bloed: q.on('Binnen', 1, 1.2) * (1 - q.on('maken', 2, 6)), korst: q.on('korstje', 1, 0.8) * (1 - q.on('opperhuid', 1, 1.2)),
      bact: q.on('ontsteking', 1, 0.6) * (1 - q.on('rood', 1, 1.2)), wbc: clamp((t - q.at('Witte', 1)) / 3, 0, 1) * (1 - q.on('Daarna', 1, 1)),
      rood: q.on('rood', 1, 0.8) * (1 - q.on('Daarna', 1, 1.2)) * (1 + 0.35 * q.on('roder', 1)), fib: clamp((t - q.at('maken', 2)) / 4, 0, 1), vaat: clamp((t - q.at('bloedvaatjes', 1)) / 2.5, 0, 1),
      epi: clamp((t - q.at('opperhuid', 1)) / 2.5, 0, 1), verbouw: clamp((t - q.at('Maandenlang', 1)) / 3, 0, 1), litteken: q.on('litteken', 1, 1) * 0.0 };
    S.rood = clamp(S.rood, 0, 1.3); const G = huidWond(ctx, 360, 250, 1200, 580, t, S);
    // namen bij de lagen (voor de stolling)
    const L0 = q.on('wond', 1) * (1 - q.on('stolling', 1));
    naamBij(ctx, 'opperhuid', '', 380, G.yE0 - 16, L0, 'left'); naamBij(ctx, 'lederhuid', '', 380, G.yE0 + G.eT + 54, L0, 'left'); naamBij(ctx, 'wond', '', G.cx + G.wr + 20, G.yE0 + 70, L0, 'left');
    // stolling
    const b1 = q.on('bloedplaatjes', 1) * (1 - q.on('ontsteking', 1)); naamBij(ctx, 'bloedplaatjes', '', G.cx - G.wr + 14, G.yE0 + 92, b1, 'left'); naamBij(ctx, 'fibrinedraden', '', G.cx + G.wr + 30, G.yE0 + 100, q.on('fibrinedraden', 1) * (1 - q.on('ontsteking', 1)), 'left', WK.fibrine);
    naamBij(ctx, 'korstje', '', G.cx + G.wr + 30, G.yE0 - 24, q.on('korstje', 1) * (1 - q.on('ontsteking', 1)), 'left');
    // ontsteking
    naamBij(ctx, 'witte bloedcellen', '', G.cx + G.wr + 30, G.yE0 + 120, q.on('Witte', 1) * (1 - q.on('rood', 1)), 'left'); naamBij(ctx, 'bacteriën', '', G.cx - G.wr - 30, G.yE0 + 120, q.on('bacteriën', 1) * (1 - q.on('rood', 1)), 'right', WK.bact);
    wisselChip(ctx, [['rood', 1, 'rood, warm, dik: zo begint herstel', C.koraal], ['infectie', 1, 'hoeft geen infectie te zijn', C.groen], ['roder', 1, 'na dagen erger? dan wel infectie', C.koraal], ['Daarna', 1, '', C.text2]], 560, 250, t, q, 30);
    // opbouw
    const o1 = q.on('bloedvaatjes', 1) * (1 - q.on('verbouwen', 1)); naamBij(ctx, 'nieuwe bloedvaatjes', '', G.cx + G.wr + 30, G.yE0 + 170, o1, 'left');
    naamBij(ctx, 'collageen', 'eiwitdraden', G.cx - G.wr - 30, G.yE0 + 150, q.on('collageen', 1) * (1 - q.on('verbouwen', 1)), 'right'); naamBij(ctx, 'opperhuid schuift over', '', G.cx, G.yE0 - 26, q.on('schuift', 1) * (1 - q.on('verbouwen', 1)), 'center');
    // verbouwen + sterkte
    naamBij(ctx, 'draden opnieuw gelegd', '', G.cx + G.wr + 30, G.yE0 + 150, q.on('gelegd', 1) * (1 - q.on('Toch', 1)), 'left');
    const T = q.on('litteken', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; roundRect(ctx, 400, 800, 1120, 70, 16); shape(ctx, rgba('#121A26', 0.85), null); ctx.restore();
      balk(ctx, 640, 816, 300, 1, C.text2, '', T); regel(ctx, 'gezond', 620, 848, T, C.text2, 28, 'right', 700); balk(ctx, 1160, 816, 300, 0.8 * clamp((t - q.at('litteken', 1)) / 1.5, 0, 1), C.koraal, '', T); regel(ctx, 'litteken ± 80%', 1140, 848, T, C.koraal, 28, 'right', 700); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const Y = 270, H = 360, TW = 500;
    const i1 = q.on('bloed', 1), i2 = q.on('delen', 1); druppel(ctx, 700, 165, 18, WK.bloed, i1); regel(ctx, 'veel bloed', 740, 178, i1, C.text, 36, 'left', 700); delendeCel(ctx, 1080, 160, 20, i2, t, 1); regel(ctx, 'cellen die delen', 1130, 178, i2, C.text, 36, 'left', 700);
    const A = q.on('Lotte', 1, 0.4), P = q.on('pees', 1, 0.4), K = q.on('Kraakbeen', 1, 0.4), xs = [170, 710, 1250];
    tegel(ctx, xs[0], Y, TW, H, 'huid', t, A, { vaat: q.on('haarvaten', 1), deel: q.on('Bovendien', 1) }); naamBij(ctx, 'huid', '', xs[0] + TW / 2, Y - 16, A, 'center');
    naamBij(ctx, 'haarvaten', '', xs[0] + TW - 20, Y + H - 30, q.on('haarvaten', 1), 'right'); naamBij(ctx, 'onderste laag deelt', '', xs[0] + 20, Y + 40, q.on('Bovendien', 1), 'left');
    tegel(ctx, xs[1], Y, TW, H, 'pees', t, P); naamBij(ctx, 'pees', '', xs[1] + TW / 2, Y - 16, P, 'center');
    tegel(ctx, xs[2], Y, TW, H, 'kraakbeen', t, K); naamBij(ctx, 'kraakbeen', 'knie', xs[2] + TW / 2, Y - 46, K, 'center'); naamBij(ctx, 'bot', '', xs[2] + 30, Y + H - 30, K, 'left');
    const r1 = Y + H + 70, r2 = r1 + 66;
    statusRij(ctx, xs[0] + 90, r1, 'bloed', 'bloed', 'ja', q.on('haarvaten', 1), t); statusRij(ctx, xs[0] + 90, r2, 'cel', 'delen', 'ja', q.on('Bovendien', 1), t);
    statusRij(ctx, xs[1] + 90, r1, 'bloed', 'bloed', 'weinig', q.on('bloedvaten', 1), t); statusRij(ctx, xs[1] + 90, r2, 'cel', 'cellen', 'weinig', q.on('cellen', 3), t);
    statusRij(ctx, xs[2] + 90, r1, 'bloed', 'bloed', 'nee', q.on('bloedvaten', 2), t); vraagteken(ctx, xs[2] + 360, r2 + 4, q.on('beschadigd', 1), 90);
    tag(ctx, 'traag', xs[1] + TW / 2, Y + H / 2 + 14, C.oker, q.on('trager', 1), 'center', 36); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const Y = 260, H = 400, TW = 620;
    tegel(ctx, 180, Y, TW, H, 'kraakbeen', t, 1, { scheur: q.on('Beschadigd', 1) }); naamBij(ctx, 'kraakbeen', '', 180 + TW / 2, Y - 16, 1, 'center');
    tag(ctx, 'groeit bijna niet terug', 180 + TW / 2, Y + H + 76, C.koraal, q.on('terug', 1), 'center', 30); naamBij(ctx, 'jarenlang klachten', 'na een knieblessure', 180 + TW / 2, Y + H + 140, q.on('jarenlang', 1), 'center', C.text2);
    const Hh = q.on('hart', 1, 0.5); tegel(ctx, 1100, Y, TW, H, 'hart', t, Hh, { knijp: 1, infarct: q.on('hartinfarct', 1, 1.2) }); naamBij(ctx, 'hartspier', '', 1100 + TW / 2, Y - 16, Hh, 'center');
    statusRij(ctx, 1180, Y + H + 70, 'bloed', 'bloed', 'ja', q.on('bloed', 1), t); statusRij(ctx, 1180, Y + H + 136, 'cel', 'delen', 'nee', q.on('delen', 1), t);
    naamBij(ctx, 'litteken', 'trekt niet samen', 1100 + TW / 2, Y + H + 196, q.on('litteken', 1), 'center', C.koraal); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const BX = 720, BY = 560; const Z = q.on('haarvaatjes', 1, 0.6), J = q.on('verpleegkundige', 1, 0.5);
    const B = henkBed(ctx, BX, BY, t, { drukH: q.on('hiel', 1) * (1 + 0.3 * q.on('afsterven', 1)), drukS: q.on('stuitje', 1), donker: q.on('afsterven', 1), uit: 'bezorgd' });
    naamBij(ctx, 'Opa Henk', '', BX - 270, 230, q.on('bed', 1), 'center');
    naamBij(ctx, 'hiel', '', B.hiel.x, B.hiel.y + 108, q.on('hiel', 1), 'center'); naamBij(ctx, 'stuitje', '', B.stuit.x + 70, B.stuit.y + 108, q.on('stuitje', 1), 'left');
    klokje(ctx, 1120, 250, 46, clamp((t - q.at('paar', 1)) / 2, 0, 1) * 0.25, q.on('paar', 1) * (1 - J)); regel(ctx, 'een paar uur', 1190, 264, q.on('paar', 1) * (1 - J), C.text2, 30, 'left', 700);
    const dz = drukZoom(ctx, 1290, 330, 540, 420, t, Z * (1 - J), { druk: clamp((t - q.at('haarvaatjes', 1)) / 1.5, 0, 1), rood: q.on('zuurstof', 1), donker: q.on('afsterven', 1, 1.2) });
    naamBij(ctx, 'bot', '', 1320, 380, Z * (1 - J), 'left'); naamBij(ctx, 'haarvaatje', 'dichtgedrukt', 1320, 330 + 420 * 0.55 - 38, q.on('dichtgedrukt', 1) * (1 - J), 'left'); naamBij(ctx, 'matras', '', 1320, 730, Z * (1 - J), 'left');
    tag(ctx, 'doorliggen', BX, 150, C.koraal, q.on('doorliggen', 1), 'center', 36);
    persoon(ctx, 'jesse', 1480, 820, 470, { t, a: J, kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Verpleegkundige Jesse', '', 1480, 300, J, 'center');
    vraagteken(ctx, 1700, 420, q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('andere', 1)); const O = q.on('andere', 1, 0.6), BX = 720, BY = 560;
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O;
      const B = henkBed(ctx, BX, BY, t, { matras: q.on('matras', 1, 0.8), kussen: q.on('hielen', 1, 0.8), draai: q.on('draait', 1), uit: 'blij' });
      draaiPijl(ctx, BX - 230, 330, 90, q.on('draait', 1) * (1 - q.on('matras', 1)), t);
      ctx.save(); ctx.translate(1290, 0); ctx.scale(-1, 1); persoon(ctx, 'jesse', 0, 820, 470, { t, kijk: 1, pose: t < q.at('kijkt', 1) ? 'wijs' : 'staan', uit: 'blij' }); ctx.restore(); naamBij(ctx, 'Jesse', 'verpleegkundige', 1290, 280, 1, 'center');
      wisselChip(ctx, [['draait', 1, 'om de paar uur van houding wisselen', C.goud], ['matras', 1, 'matras die de druk verdeelt', C.teal], ['hielen', 1, 'hielen vrij', C.groen], ['kijkt', 1, 'elke dag de huid bekijken', C.oker]], BX, 200, t, q, 30);
      ctx.restore(); }
    if (O > 0.01) { const Y = 250, PH = 440, PW = 480, xs = [180, 720, 1260]; ctx.save(); ctx.globalAlpha *= O;
      const I = q.on('infectie', 1, 0.5), R = q.on('Roken', 1, 0.5), D = q.on('diabetes', 1, 0.5);
      [[xs[0], 'infectie', I], [xs[1], 'roken', R], [xs[2], 'diabetes', D]].forEach(([x, n, a]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, Y, PW, PH, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); ctx.restore(); naamBij(ctx, n, '', x + PW / 2, Y - 18, a, 'center'); });
      // infectie: bacteriën houden de ontsteking gaande
      if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; ctx.beginPath(); ctx.arc(xs[0] + PW / 2, Y + 230, 120, 0, 6.283); const g = ctx.createRadialGradient(xs[0] + PW / 2, Y + 230, 10, xs[0] + PW / 2, Y + 230, 150); g.addColorStop(0, rgba('#E04A3A', 0.6)); g.addColorStop(1, rgba('#E04A3A', 0)); ctx.fillStyle = g; ctx.fill();
        for (let i = 0; i < 7; i++) { const w = wander(i, t, 50, 0.5), px = xs[0] + PW / 2 + w.x, py = Y + 230 + w.y; ctx.save(); ctx.translate(px, py); ctx.rotate(i); roundRect(ctx, -14, -6, 28, 12, 6); shape(ctx, WK.bact, '#4A8A5A', 1.5); ctx.restore(); }
        for (let i = 0; i < 3; i++) { const w = wander(i + 20, t, 70, 0.4); circ(ctx, xs[0] + PW / 2 + w.x, Y + 230 + w.y, 22, WK.wbc, '#B8B0CC', 2); } ctx.restore(); naamBij(ctx, 'ontsteking blijft', '', xs[0] + PW / 2, Y + PH - 30, q.on('gang', 1), 'center'); }
      // roken: vaatje knijpt samen
      if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; sigaret(ctx, xs[1] + 140, Y + 110, 1, 1, t); vatDoorsnede(ctx, xs[1] + PW / 2, Y + 270, 100, clamp((t - q.at('knijpt', 1)) / 1.2, 0, 1), 1); ctx.restore(); naamBij(ctx, 'bloedvaatje knijpt samen', '', xs[1] + PW / 2, Y + PH - 30, q.on('samen', 1), 'center'); }
      // diabetes: minder bloed en afweer, wondje aan de voet niet voelen
      if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; suikerRing(ctx, xs[2] + 110, Y + 100, 44, 1); voetZool(ctx, xs[2] + PW / 2 + 60, Y + 205, 0.8, 1, q.on('wondje', 1)); ctx.restore();
        naamBij(ctx, 'minder bloed en afweer', '', xs[2] + PW / 2, Y + PH - 66, q.on('afweer', 1) * (1 - q.on('voel', 1)), 'center'); naamBij(ctx, 'wondje niet voelen', '', xs[2] + PW / 2, Y + PH - 66, q.on('voel', 1), 'center', C.koraal);
        naamBij(ctx, 'maanden open', '', xs[2] + PW / 2, Y + PH - 20, q.on('maanden', 1), 'center', C.koraal); }
      ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('opbouwfase', 1, 0.8), P3 = q.on('fysiotherapeut', 1, 0.8), SX = 470, VY = 820, PH = 480;
    if (P2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P2;
      persoon(ctx, 'sam', SX, VY, PH, { t, outfit: 'sport', kijk: 1, uit: 'neutraal' }); loopschoen(ctx, 'sam', SX, VY, PH, 1, q.on('schoen', 1)); krukken(ctx, 'sam', SX, VY, PH, q.on('krukken', 1)); naamBij(ctx, 'Sam', '', SX, 260, 1, 'center');
      const sb = beenZij(ctx, 1240, 700, 1.15, 1, { scheur: 1, schoen: q.on('schoen', 1, 1.2), huid: CAST.sam.huid, t });
      naamBij(ctx, 'achillespees', '', sb.pees[0] - 40, sb.pees[1] - 20, 1, 'right', WK.pees); naamBij(ctx, 'hakje', '', 1160, 792, q.on('hakje', 1) * (1 - q.on('krukken', 1)), 'left', C.goud);
      wisselChip(ctx, [['opgerekt', 1, 'uiteinden blijven dicht bij elkaar', C.goud], ['krukken', 1, 'eerst krukken', C.teal], ['daarna', 1, 'daarna steeds meer op zijn been', C.groen], ['rusten', 1, 'te lang rusten: niet goed', C.koraal]], 1300, 200, t, q, 30);
      ctx.restore(); }
    if (P2 > 0.01 && P3 < 0.99) { ctx.save(); ctx.globalAlpha *= P2 * (1 - P3);
      const orde = clamp((t - q.at('belasten', 1)) / 2.5, 0, 1), trek = q.on('belasten', 1) * (1 - q.on('veel', 1)); vezelPaneel(ctx, 460, 270, 1000, 420, t, 1, { orde, trek, rood: q.on('scheuren', 1) });
      naamBij(ctx, 'nieuwe eiwitdraden', 'kriskras', 960, 212, 1 - q.on('lengte', 1), 'center'); naamBij(ctx, 'in de lengte', 'sterker', 960, 212, q.on('lengte', 1), 'center', C.groen);
      metaText(ctx, 'pees · opbouwfase', 460, 740, C.grain, 'left', 22);
      tag(ctx, 'voorzichtig belasten', 960, 800, C.goud, q.on('belasten', 1) * (1 - q.on('veel', 1)), 'center', 30); tag(ctx, 'te veel, te snel: opnieuw scheuren', 960, 800, C.koraal, q.on('veel', 1), 'center', 30);
      if (q.on('scheuren', 1) > 0.01) flits(ctx, 960, 480, 120, q.on('scheuren', 1) * 0.8, C.koraal); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3;
      belastGrafiek(ctx, 170, 290, 820, 420, clamp((t - q.at('bouwt', 1)) / 3, 0, 1), 1, { half: q.on('half', 1), jaar: q.on('niveau', 1) });
      const T = q.on('test', 1, 0.5); const ten = T > 0.01 ? 0.5 + 0.5 * Math.sin((t - q.at('tenen', 1)) * 2.2 - 1.57) : 0;
      beenZij(ctx, 1260, 700, 0.95, T, { tenen: t > q.at('tenen', 1) ? ten : 0, huid: CAST.sam.huid, t });
      naamBij(ctx, 'op één been op de tenen', 'test', 1260, 300, q.on('één', 1), 'center');
      persoon(ctx, 'femke', 1700, 820, 470, { t, a: q.on('fysiotherapeut', 1, 0.3), kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1700, 270, q.on('fysiotherapeut', 1), 'center');
      ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const LX = 380, SX = 1540, VY = 720, PH = 440;
    persoon(ctx, 'lotte', LX, VY, PH, { t, outfit: 'sport', kijk: 1, uit: 'blij' }); const k = knieWond(ctx, 'lotte', LX, VY, PH, 1, 1, 1); naamBij(ctx, 'klein litteken', '', k.x + 40, k.y + 10, q.on('litteken', 1), 'left');
    const R = q.on('rent', 1, 0.4); persoon(ctx, 'sam', SX, VY - 10 * Math.abs(Math.sin(t * 5)) * R, PH, { t, outfit: 'sport', kijk: -1, uit: 'lacht', pose: 'staan', a: q.on('Sam', 1, 0.3) });
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(SX + 110 + i * 10, 400 + i * 60); ctx.lineTo(SX + 190 + i * 10, 400 + i * 60); ctx.stroke(); } ctx.restore(); }
    faseLijn(ctx, 260, 780, 1400, q.on('vier', 1), -1);
    const b = q.on('bloed', 1), c = q.on('cellen', 1); druppel(ctx, 820, 330, 30, WK.bloed, b); regel(ctx, 'bloed', 820, 420, b, C.text, 36, 'center', 700); regel(ctx, '+', 960, 350, c, C.goud, 64, 'center', 800); delendeCel(ctx, 1100, 320, 32, c, t, 1); regel(ctx, 'delende cellen', 1100, 420, c, C.text, 36, 'center', 700);
    regel(ctx, 'tempo', 960, 220, q.on('tempo', 1), C.goud, 44, 'center', 800); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'jesse', 520, 820, 480, { t, kijk: 1, uit: 'blij' }); naamBij(ctx, 'Jesse', 'verpleegkundige · wonden, doorliggen', 520, 240, q.on('Verpleegkundigen', 1), 'center');
    const F = q.on('Fysiotherapeuten', 1, 0.4); persoon(ctx, 'femke', 1300, 820, 470, { t, a: F, kijk: 1, uit: 'blij', pose: 'wijs' }); persoon(ctx, 'sam', 1580, 820, 480, { t, a: F, outfit: 'sport', kijk: -1, uit: 'lacht' });
    naamBij(ctx, 'Femke', 'fysiotherapeut · spieren en pezen', 1300, 240, F, 'center');
    tag(ctx, 'fysiotherapie: hbo · vier jaar', 1440, 160, C.teal, q.on('Fysiotherapie', 1), 'center', 30); tag(ctx, 'verpleegkunde: mbo of hbo', 520, 160, C.teal, q.on('Fysiotherapie', 1), 'center', 30); }
});
