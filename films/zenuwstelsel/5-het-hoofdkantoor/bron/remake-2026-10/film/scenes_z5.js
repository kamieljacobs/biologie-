// Zenuwstelsel 5 · Het hoofdkantoor — scènes (lichte remake 29 okt 2026). Cues via q.on(woord, n, duur) op de woordtijden van de oude takes (a5: nieuwe take).
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const IN_UIT = (t, a, b, d = 0.5) => ramp(t, a, d) * UIT(t, b, d);
function ring(ctx, x, y, r, a = 1, kleur = C.goud, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function vandaag(q, w, n = 1) { const v = q.at(w, n); return isFinite(v) ? v : 1e9; }

// ---------- keuken (cold open): aanrecht 87 cm = 300 px, dus 3,45 px per cm; personage 1,60 m ----------
const KEUKEN = { vloer: 850, aanrechtY: 550, ax0: 1080, ax1: 1840 };
function keuken(ctx, t) {
  const K = KEUKEN; ctx.save();
  ctx.fillStyle = '#22314C'; ctx.fillRect(0, 0, W, K.vloer); ctx.fillStyle = '#16213A'; ctx.fillRect(0, K.vloer, W, H - K.vloer);
  // raam met ochtendlucht
  roundRect(ctx, 1200, 120, 420, 300, 10); shape(ctx, '#3E5A7E', '#8FA0B5', 3); ctx.fillStyle = '#5E7FA6'; ctx.fillRect(1206, 300, 408, 114);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1410, 120); ctx.lineTo(1410, 420); ctx.moveTo(1200, 270); ctx.lineTo(1620, 270); ctx.stroke();
  ctx.beginPath(); ctx.arc(1530, 205, 34, 0, 6.283); ctx.fillStyle = rgba(C.goud, 0.85); ctx.fill();
  // kastjes boven en aanrecht
  for (let i = 0; i < 2; i++) { roundRect(ctx, 760 + i * 200, 120, 190, 240, 8); shape(ctx, '#3A4A66', '#55668A', 2); }
  ctx.fillStyle = '#5A6A84'; ctx.fillRect(K.ax0 - 20, K.aanrechtY - 18, K.ax1 - K.ax0 + 40, 22);
  ctx.fillStyle = '#34435E'; ctx.fillRect(K.ax0, K.aanrechtY + 4, K.ax1 - K.ax0, K.vloer - K.aanrechtY - 4);
  ctx.strokeStyle = '#4A5A78'; ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { const xx = K.ax0 + i * (K.ax1 - K.ax0) / 4; ctx.beginPath(); ctx.moveTo(xx, K.aanrechtY + 10); ctx.lineTo(xx, K.vloer - 10); ctx.stroke(); }
  ctx.restore();
}
function radio(ctx, x, y, t, speelt) { // ± 50 cm breed = 172 px
  ctx.save(); roundRect(ctx, x - 86, y - 96, 172, 96, 14); shape(ctx, '#C9A35C', '#E0C690', 2);
  ctx.beginPath(); ctx.arc(x - 38, y - 48, 30, 0, 6.283); shape(ctx, '#7A6440', '#5A4A30', 2);
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(x - 38 + Math.cos(i) * 16 * (i % 3) / 2, y - 48 + Math.sin(i * 2) * 16 * (i % 3) / 2, 2.5, 0, 6.283); ctx.fillStyle = '#4A3A24'; ctx.fill(); }
  roundRect(ctx, x + 6, y - 74, 64, 22, 4); shape(ctx, '#F2E6C8', '#8A7448', 1.5); ctx.beginPath(); ctx.arc(x + 46, y - 26, 12, 0, 6.283); shape(ctx, '#7A6440', '#5A4A30', 2);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 60, y - 96); ctx.lineTo(x + 110, y - 190); ctx.stroke();
  ctx.restore();
}

// ---------- vraagkaart tijdens de gesproken vraag (opties lichten op als ze genoemd worden) ----------
function vraagScene(ctx, t, q, n, sleutels) {
  bg(ctx, 'schema'); const Q = DATA.segments.find(s => s.id === 'v' + n); if (!Q) return; const seg = DATA.segments.find(s => s.id === 'v' + n);
  text(ctx, 'Wat denk je?', 120, 200, fTitel(64), C.text); ctx.save(); ctx.globalAlpha *= ramp(t, 0.3, 0.5); ctx.font = fTekst(40, 600); ctx.fillStyle = C.text; wrap(ctx, seg.q, 120, 290, 1680, 52); ctx.restore();
  seg.options.forEach((o, i) => { const a = q.on(sleutels[i][0], sleutels[i][1] || 1, 0.4); if (a <= 0.01) return; const y = 430 + i * 112; ctx.save(); ctx.globalAlpha *= a;
    roundRect(ctx, 120, y, 1680, 96, 14); shape(ctx, C.fill, C.line, 1.5); text(ctx, String.fromCharCode(97 + i), 160, y + 62, fMeta(32), C.grain); text(ctx, o, 220, y + 62, fTekst(36), C.text); ctx.restore(); });
}

Object.assign(SCENES, {
  title(ctx, t) { const k = (i) => 0.5 + 0.5 * Math.sin(t * 1.3 - i * 1.1);
    z5Brein(ctx, 1480, 500, 0.62, { aud: 0.4 + 0.6 * k(0), vis: 0.4 + 0.6 * k(1), mot: 0.4 + 0.6 * k(2), assoc: { f: 0.3 + 0.5 * k(3) }, sen: 0.4 + 0.6 * k(4) }); },

  // ================= Cold open =================
  s00(ctx, t, q) { bg(ctx, 'schema'); keuken(ctx, t); const K = KEUKEN, rx = 1340, ry = K.aanrechtY - 18;
    const speelt = q.on('radio', 1, 0.3), zing = t >= q.at('zingt') && t < q.at('Wie') + 0.5, tik = t >= q.at('tikt');
    radio(ctx, rx, ry, t, speelt);
    // noten uit de radio (twee tonen eerst los, daarna doorlopend)
    const twee = q.on('Twee', 1, 0.3); z5Noot(ctx, rx - 150, ry - 170 - 20 * ease((t - q.at('Twee')) / 0.8), 1.4, twee * UIT(t, q.at('Meer') + 1.2), C.goud); z5Noot(ctx, rx - 240, ry - 220 - 20 * ease((t - q.at('tonen')) / 0.8), 1.4, q.on('tonen', 1, 0.3) * UIT(t, q.at('Meer') + 1.2), C.goud);
    if (t > q.at('nummer')) for (let i = 0; i < 6; i++) { const u = ((t - q.at('nummer')) * 0.35 + i / 6) % 1; z5Noot(ctx, rx - 120 - u * 420, ry - 140 - u * 200 - 30 * Math.sin(u * 9 + i), 1.0, Math.sin(u * Math.PI) * 0.8 * UIT(t, q.at('Wie'), 0.8), C.text2); }
    // personage (zomer: korte mouwen, zodat het kippenvel op de blote arm klopt); 1,60 m
    const hoofdW = q.on('Wie', 1, 0.6); const uit = zing ? 'praat' : 'blij';
    const P = persoon(ctx, 'noor', 640, K.vloer, 552 / 0.97, { outfit: 'zomer', uit, t });
    // voet tikt mee: tikboogjes onder de rechtervoet op de tel (120 per minuut)
    if (tik) { const ph = ((t - q.at('tikt')) * 2) % 1; const vx = 640 - 36, a = (1 - ph) * UIT(t, q.at('Wie'), 0.6); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const r of [26, 44]) { ctx.beginPath(); ctx.arc(vx, K.vloer - 4, r * (0.6 + 0.4 * ph), Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); } ctx.restore(); }
    if (zing && P.hoofd) for (let i = 0; i < 3; i++) { const u = ((t - q.at('zingt')) * 0.5 + i / 3) % 1; z5Noot(ctx, P.hoofd.x + 70 + u * 160, P.hoofd.y + 10 - u * 120, 0.8, Math.sin(u * Math.PI) * UIT(t, q.at('Wie'), 0.5), C.text); }
    // kippenvel op de arm (zoomcirkel naast de arm, huid uit de beeldbank)
    const kip = q.on('kippenvel', 1, 0.6) * UIT(t, q.at('Wie') - 0.3, 0.6);
    if (P.handL && kip > 0.01) { const ax = P.handL.x - 6, ay = P.handL.y - 120; zoomCircle(ctx, 320, 330, 200, ax, ay, 'HUID · VERGROOT', kip, () => { bg(ctx, 'micro'); huidBlok(ctx, 120, 150, 400, { kip: ramp(t, q.at('kippenvel') + 0.3, 1.2), t, focus: 'haar' }); });
      naamBij(ctx, 'kippenvel', null, 320, 110, kip * ramp(t, q.at('kippenvel') + 0.6, 0.4), 'center', C.goud); }
    // wie regelt dat? zoomcirkel náást het hoofd met de hersenen
    if (P.hoofd && hoofdW > 0.01) { ring(ctx, P.hoofd.x, P.hoofd.y, P.hoofd.r * 1.35, hoofdW, C.goud, 2); zoomCircle(ctx, 300, 360, 210, P.hoofd.x - P.hoofd.r * 1.35, P.hoofd.y, 'IN JE HOOFD', hoofdW, () => { bg(ctx, 'schema'); z5Brein(ctx, 300, 330, 0.36, {}); });
      vraagteken(ctx, 300, 410, q.on('baas', 1, 0.4), 130); } },

  // ================= Hoofdstuk 1 · Drie delen =================
  q1(ctx, t, q) { vraagScene(ctx, t, q, 1, [['tien'], ['hersenhelft'], ['gebieden']]); },
  a1(ctx, t, q) { bg(ctx, 'schema'); const tD = q.at('doorsnede'), d = ramp(t, tD, 1.0);
    const bx = lerp(900, 470, d), by = lerp(440, 420, d), bs = lerp(0.95, 0.6, d);
    const fab = UIT(t, q.at('Eerst'), 0.5), lob = {}, tint = {}, namen = {};
    const L = [['f', 'voorhoofdskwab'], ['p', 'wandbeenkwab'], ['t', 'slaapkwab'], ['o', 'achterhoofdskwab']];
    let cur = null; for (const [k, w] of L) if (t >= q.at(w)) cur = k; if (t >= q.at('Achteronder')) cur = null;
    for (const [k, w] of L) { lob[k] = k === cur ? 1 : 0; tint[k] = t >= q.at(w) ? 1 : 0; namen[k] = q.on(w, 1, 0.4) * UIT(t, tD, 0.5); }
    namen.klein = q.on('kleine', 1, 0.4) * UIT(t, tD, 0.5); namen.stam = q.on('hersenstam', 1, 0.4) * UIT(t, tD, 0.5); namen.koord = q.on('ruggenmerg', 1, 0.4) * UIT(t, tD, 0.5);
    const kl = IN_UIT(t, q.at('kleine'), q.at('En', 1) + 0.3, 0.4), st = IN_UIT(t, q.at('hersenstam'), tD, 0.4);
    const groot = IN_UIT(t, q.at('grote'), q.at('kwabben'), 0.4) * (t < q.at('helften') + 0.2 || t > q.at('Elke') ? 1 : 1);
    // fabel: alle gebieden doen mee
    const alles = fab * ramp(t, 0.3, 0.6);
    z5Brein(ctx, bx, by, bs, { lob, lobTint: tint, klein: kl, stam: st, groot, namen, aud: alles, vis: alles, mot: alles, sen: alles, assoc: { f: alles, p: alles, t: alles, o: alles } });
    if (fab > 0.01) { ctx.save(); ctx.globalAlpha *= fab; text(ctx, '10 %', 1560, 330, fTitel(120), C.text, 'center'); ctx.restore(); kruis(ctx, 1560, 290, 120, q.on('fabel', 1, 0.3) * fab);
      tag(ctx, 'bijna elke plek doet ertoe', 1560, 520, C.groen, q.on('plek', 1, 0.4) * fab, 'center', 32); }
    // twee helften en de hersenbalk: bovenaanzicht als inzet
    const boven = IN_UIT(t, q.at('helften'), q.at('kwabben'), 0.4);
    if (boven > 0.01) { z5Kaart(ctx, 1420, 110, 420, 560, boven); const B = z5Boven(ctx, 1630, 400, 0.6, { a: boven, balk: q.on('hersenbalk', 1, 0.4), namen: boven });
      naamBij(ctx, 'hersenbalk', 'van boven · diep', 1630, 160, q.on('hersenbalk', 1, 0.4) * boven, 'center', C.goud); }
    if (groot > 0.01) naamBij(ctx, 'grote hersenen', null, bx, by - 340 * bs, groot, 'center', C.goud);
    // doorsnede
    if (d > 0.01) { const sx = bx + 10 * bs; ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(sx, by - 340 * bs); ctx.lineTo(sx, by + 190 * bs); ctx.stroke(); ctx.restore();
      metaText(ctx, 'doorsnede hier', sx, by - 360 * bs, C.goud, 'center', 28);
      const gr = IN_UIT(t, q.at('grijze'), q.at('Binnen'), 0.4), wi = IN_UIT(t, q.at('witte'), q.at('Ook'), 0.4), ba = q.on('hersenbalk', 2, 0.4) * UIT(t, q.at('Grijs'), 0.5);
      const D = z5Doorsnede(ctx, 1290, 420, 1.05, { a: d, grijs: gr, wit: wi, balk: ba });
      naamBij(ctx, 'grijze stof', t >= q.at('cellichamen') ? 'hersenschors · vooral cellichamen' : (t >= q.at('hersenschors') ? 'hersenschors' : null), 1290, 140, q.on('grijze', 1, 0.4), 'center');
      naamBij(ctx, 'witte stof', 'axonen met myeline', D.wit[0], D.wit[1], q.on('witte', 1, 0.4), 'center');
      naamBij(ctx, 'hersenbalk', null, 1290, 300, ba, 'center', C.goud);
      tag(ctx, 'zo’n 200 miljoen axonen', 1290, 790, C.goud, IN_UIT(t, q.at('tweehonderd'), q.at('Grijs'), 0.4), 'center', 30);
      const gw = q.on('Grijs', 1, 0.4); if (gw > 0.01) { tag(ctx, 'grijs rekent', 1080, 790, C.text2, gw, 'center', 34); tag(ctx, 'wit verbindt', 1500, 790, C.text, q.on('verbindt', 1, 0.4), 'center', 34); } } },

  // ================= Hoofdstuk 2 · Horen en herkennen =================
  s21(ctx, t, q) { bg(ctx, 'schema'); const tR = q.at('impulsen', 2), tB = q.at('Zo', 2);
    // deel 1: slakkenhuis en uitgerold basilair membraan
    const d1 = UIT(t, tR - 0.2, 0.6);
    if (d1 > 0.01) { ctx.save(); ctx.globalAlpha *= d1; z5Slak(ctx, 260, 300, 90, ramp(t, 0.2, 0.6)); naamBij(ctx, 'slakkenhuis', 'in het binnenoor', 260, 450, q.on('slakkenhuis', 1, 0.4), 'center');
      const ur = q.on('basilair', 1, 0.8); pijl(ctx, 380, 300, 470, 300, C.line, ur, 3, 14); metaText(ctx, 'uitgerold', 425, 270, C.text2, 'center', 28);
      const hoog = IN_UIT(t, q.at('hoge'), q.at('Bij'), 0.3), laag = IN_UIT(t, q.at('lage'), q.at('Zo'), 0.3), elk = ramp(t, q.at('elke'), 0.4);
      const toon = elk > 0.01 ? [[0.12, elk * 0.7], [0.45, elk * 0.7], [0.82, elk * 0.7]] : [];
      z5Basilair(ctx, 520, 330, 1180, { a: ur, piek: hoog > 0.01 ? 0.1 : (laag > 0.01 ? 0.86 : -1), amp: Math.max(hoog, laag), t, toon });
      naamBij(ctx, 'basilair membraan', null, 1110, 230, ur, 'center');
      naamBij(ctx, 'begin', 'smal en stijf', 660, 440, q.on('smal', 1, 0.4), 'center'); naamBij(ctx, 'top', 'breed en slap', 1660, 440, q.on('breed', 1, 0.4), 'center');
      tag(ctx, 'hoge tonen', 600, 560, C.teal, q.on('hoge', 1, 0.4), 'center', 32); tag(ctx, 'lage tonen', 1620, 560, C.teal, q.on('lage', 1, 0.4), 'center', 32);
      tag(ctx, 'elke toon zijn eigen zintuigcellen', 1110, 700, C.teal, q.on('zintuigcellen', 1, 0.4), 'center', 32); ctx.restore(); }
    // deel 2: de route naar de gehoorschors (hersenen rechts, diepe delen gestippeld)
    const d2 = ramp(t, tR - 0.2, 0.6) * UIT(t, tB - 0.2, 0.6);
    const fin = ramp(t, tB - 0.2, 0.8); const bx = lerp(1180, 960, fin), by = lerp(470, 430, fin), bs = lerp(0.85, 1.0, fin);
    const aud = ramp(t, q.at('gehoorschors'), 0.4), ass = q.on('associatieve', 1, 0.5), slaap = IN_UIT(t, q.at('slaapkwab'), q.at('gehoorschors') + 0.6, 0.4);
    const R = z5Brein(ctx, bx, by, bs, { a: ramp(t, tR - 0.2, 0.6), diep: d2, thal: IN_UIT(t, q.at('thalamus'), q.at('slaapkwab'), 0.3), lob: { t: slaap }, aud,
      assoc: { t: ass * (1 - 0.5 * fin), f: ramp(t, q.at('associatieve', 2), 0.5), p: ramp(t, q.at('associatieve', 2), 0.5), o: ramp(t, q.at('associatieve', 2), 0.5) },
      vis: ramp(t, q.at('achterhoofdskwab'), 0.4), cs: IN_UIT(t, q.at('groeve'), q.at('Ervoor'), 0.3), mot: ramp(t, q.at('voorhoofdskwab', 1), 0.4), sen: ramp(t, q.at('wandbeenkwab'), 0.4),
      lob: { t: slaap, f: IN_UIT(t, q.at('voorhoofdskwab', 2), 1e9, 0.4) } });
    if (d2 > 0.01) { const sl = [260, 640]; z5Slak(ctx, sl[0], sl[1], 60, d2); naamBij(ctx, 'oor', null, sl[0], sl[1] + 110, d2, 'center', C.text2);
      const route = [sl, [480, 600], [R.stam[0] - 60, R.stam[1] + 40], R.stam, R.thal, [R.thal[0] + 30, R.thal[1] - 40], R.aud];
      const tz = q.at('gehoorzenuw'), u = lerp(0, 1, (t - tz) / (q.at('gehoorschors') - tz + 0.3)); const p = ((t - tz) * 0.45) % 1;
      z5Baan(ctx, route, u, C.teal, d2, 6, u >= 1 ? p : clamp(u - 0.01, 0, 1));
      naamBij(ctx, 'gehoorzenuw', null, 470, 560, q.on('gehoorzenuw', 1, 0.4) * d2, 'center');
      naamBij(ctx, 'hersenstam', null, R.stam[0] - 80, R.stam[1] + 120, q.on('hersenstam', 1, 0.4) * d2, 'right');
      naamBij(ctx, 'thalamus', 'schakelstation', 780, 300, IN_UIT(t, q.at('thalamus'), q.at('plek'), 0.4) * d2, 'right', C.teal);
      naamBij(ctx, 'slaapkwab', null, R.lob.t[0] + 40, R.lob.t[1] + 120, slaap * d2, 'center');
      naamBij(ctx, 'primaire gehoorschors', 'toonhoogte · luidheid', R.aud[0] + 330, R.aud[1] + 150, aud * d2 * UIT(t, q.at('Maar'), 0.4), 'center', C.teal);
      // tonotopie: zoomcirkel met banden van laag (voor) naar hoog (achter)
      const tz2 = IN_UIT(t, q.at('plek'), q.at('Maar'), 0.4); if (tz2 > 0.01) { zoomCircle(ctx, 500, 260, 170, R.aud[0], R.aud[1], 'GEHOORSCHORS · VERGROOT', tz2, () => { bg(ctx, 'schema');
          const cols = ['#2E5C7A', '#3E7698', '#5BA4C9', '#86BEDA', '#B5D8EA']; for (let i = 0; i < 5; i++) { roundRect(ctx, 360 + i * 56, 200, 50, 120, 8); ctx.fillStyle = cols[4 - i]; ctx.fill(); } });
        naamBij(ctx, 'hoog', null, 380, 210, tz2, 'center'); naamBij(ctx, 'laag', null, 620, 210, tz2, 'center'); tag(ctx, 'dezelfde volgorde als in het slakkenhuis', 500, 520, C.teal, q.on('volgorde', 1, 0.4) * tz2, 'center', 28); }
      naamBij(ctx, 'associatieve schors', 'legt verbanden', R.aud[0] + 330, R.aud[1] + 250, ass * d2, 'left', C.oker);
      const jn = IN_UIT(t, q.at('kent'), tB, 0.4); tag(ctx, '“dit is mijn nummer!”', R.aud[0] + 480, R.aud[1] + 340, C.oker, jn * d2, 'center', 32); }
    // deel 3: zo werkt het overal
    if (fin > 0.01) { const N = (txt, meta, k, px, py, col, al = 'center') => naamBij(ctx, txt, meta, R.P(px, py)[0], R.P(px, py)[1], k * fin, al, col);
      N('zien', 'primaire schors', q.on('zien', 1, 0.4) * UIT(t, q.at('associatieve', 2), 0.4), -390, -150, C.teal);
      N('centrale groeve', null, IN_UIT(t, q.at('groeve'), q.at('Ervoor'), 0.3), 40, -350, C.goud);
      N('bewegen', null, q.on('bewegen', 1, 0.4), 160, -260, C.koraal, 'left');
      N('voelen', null, q.on('voelen', 1, 0.4), -110, -260, C.teal, 'right');
      N('gehoor', null, ramp(t, tB, 0.4) * UIT(t, q.at('associatieve', 2), 0.4), 60, 140, C.teal);
      tag(ctx, 'associatieve schors geeft betekenis', 960, 860 - 40, C.oker, IN_UIT(t, q.at('betekenis'), q.at('De', 4) - 0.1, 0.4), 'center', 32);
      const pk = q.on('plannen', 1, 0.3); if (pk > 0.01) { tag(ctx, 'plannen', 1500, 220, C.oker, pk, 'center', 32); tag(ctx, 'kiezen', 1540, 310, C.oker, q.on('kiezen', 1, 0.3), 'center', 32); tag(ctx, 'je inhouden', 1580, 400, C.oker, q.on('inhouden', 1, 0.3), 'center', 32); } } },
  q2(ctx, t, q) { vraagScene(ctx, t, q, 2, [['niets'], ['tonen'], ['Of']]); },
  a2(ctx, t, q) { bg(ctx, 'schema'); const zonder = ramp(t, q.at('zonder'), 0.5);
    const R = z5Brein(ctx, 760, 430, 0.95, { aud: 1, assoc: { t: 1 }, schade: zonder, lob: {} });
    // tonen komen binnen (stippen langs een pad van links naar de gehoorschors)
    for (let i = 0; i < 7; i++) { const u = ((t * 0.4 + i / 7) % 1); const x0 = 150, y0 = 560; const px = lerp(x0, R.aud[0], u), py = lerp(y0, R.aud[1], u) - 40 * Math.sin(u * Math.PI);
      z5Noot(ctx, px, py, 0.8, Math.sin(u * Math.PI) * ramp(t, q.at('tonen'), 0.4) * UIT(t, q.at('Hoe'), 0.5), C.teal); }
    naamBij(ctx, 'primaire gehoorschors', null, 1000, 690, ramp(t, q.at('primaire'), 0.4), 'center', C.teal);
    naamBij(ctx, 'associatieve schors', zonder > 0.5 ? 'beschadigd' : null, 1000, 780, ramp(t, q.at('associatieve'), 0.4), 'center', zonder > 0.5 ? C.koraal : C.oker);
    // losse geluiden: noten blijven los, zonder lijn ertussen
    const los = IN_UIT(t, q.at('losse'), q.at('Hoe'), 0.4); if (los > 0.01) { for (let i = 0; i < 5; i++) z5Noot(ctx, 1450 + (hash(i * 3) - 0.5) * 380, 260 + (hash(i * 7) - 0.5) * 200 + 10 * Math.sin(t * 2 + i), 1.1, los, C.teal); naamBij(ctx, 'losse geluiden', null, 1450, 450, los, 'center'); }
    const hh = q.on('Horen', 1, 0.4) * UIT(t, q.at('geleerd') - 0.2, 0.4); if (hh > 0.01) { z5Kaart(ctx, 1260, 520, 520, 220, hh); ctx.save(); ctx.globalAlpha *= hh; text(ctx, 'horen', 1330, 600, fTekst(44, 700), C.text, 'left'); vink_(ctx, 1700, 585, 22, 1, C.groen);
        text(ctx, 'herkennen', 1330, 690, fTekst(44, 700), C.text, 'left'); ctx.restore(); kruis(ctx, 1700, 675, 20, q.on('herkennen', 1, 0.3) * hh, C.koraal); }
    tag(ctx, 'volgende film: leren en onthouden', 1500, 620, C.goud, q.on('geleerd', 1, 0.4), 'center', 32); },

  // ================= Hoofdstuk 3 · Kruislings =================
  q3(ctx, t, q) { vraagScene(ctx, t, q, 3, [['rechterhelft'], ['linkerhelft'], ['allebei']]); },
  a3(ctx, t, q) { bg(ctx, 'schema'); const tK = q.at('Kijk'), d1 = UIT(t, tK - 0.2, 0.6), d2 = ramp(t, tK - 0.2, 0.6);
    if (d1 > 0.01) { const B = z5Boven(ctx, 960, 290, 0.6, { a: d1, motL: ramp(t, q.at('links'), 0.4), senL: ramp(t, q.at('Voelen'), 0.4), namen: d1 });
      const hR = [1500, 700], hL = [420, 700], kruisP = [960, 600], top = [960, 450];
      z5Lijn(ctx, [top, [960, 780]], rgba(Z5.merg, 0.9 * d1), 40); metaText(ctx, 'hersenstam · ruggenmerg', 990, 790, C.text2, 'left', 28);
      z5Hand(ctx, hR[0] + 130, hR[1] + 40, 1.9, d1, 1, Math.max(0, Math.sin(t * 6.283 * 2)) * ramp(t, q.at('rechterhand'), 0.3)); z5Hand(ctx, hL[0] - 130, hL[1] + 40, 1.9, d1, -1, 0);
      naamBij(ctx, 'rechterhand', null, hR[0] + 60, hR[1] - 110, d1, 'center'); naamBij(ctx, 'linkerhand', null, hL[0] - 60, hL[1] - 110, d1, 'center');
      const tb = q.at('rechterhand'), u = (t - tb + 0.2) / 2.4; const motBaan = [B.motL, [900, 420], [935, 540], kruisP, [990, 660], [1200, 690], [hR[0] - 10, hR[1] - 10]];
      z5Baan(ctx, motBaan, clamp(u, 0, 1), C.koraal, d1, 8, u >= 1 ? ((t - tb) * 0.5) % 1 : -1);
      const tv = q.at('Voelen'), v = (t - tv) / 2.4; const senBaan = [[hR[0] - 10, hR[1] + 30], [1200, 735], [1000, 700], [972, 640], kruisP, [948, 560], [890, 460], B.senL];
      z5Baan(ctx, senBaan, clamp(v, 0, 1), C.teal, d1, 8, v >= 1 ? ((t - tv) * 0.5) % 1 : -1);
      ring(ctx, kruisP[0], kruisP[1], 42, q.on('kruisen', 1, 0.3) * d1, C.goud, 4); naamBij(ctx, 'kruising', 'in de hersenstam', kruisP[0] - 70, kruisP[1] + 10, q.on('kruisen', 1, 0.4) * d1, 'right', C.goud);
      naamBij(ctx, 'motorische schors links', null, 560, 230, q.on('motorische', 1, 0.4) * d1, 'center', C.koraal);
      naamBij(ctx, 'voelen komt links aan', null, 560, 320, q.on('kruislings', 1, 0.4) * d1, 'center', C.teal); }
    if (d2 > 0.01) { const hl = (w, n = 1) => IN_UIT(t, q.at(w, n), q.at(w, n) + 1.6, 0.25) + (t >= q.at('Tikken') ? 0.6 + 0.4 * Math.sin(t * 6) : 0);
      const seg = [['been', 0.12, 0], ['romp', 0.06, hl('rug')], ['arm', 0.1, 0], ['hand', 0.26, (t >= q.at('Tikken') ? 1 : hl('handen'))], ['gezicht', 0.1, 0], ['lippen', 0.2, t >= q.at('Tikken') ? 1 : hl('lippen')], ['tong', 0.16, t >= q.at('Tikken') ? 1 : hl('tong')]];
      const R = z5Brein(ctx, 600, 470, 0.9, { a: d2, motSeg: ramp(t, q.at('Elk'), 0.5) > 0.5 ? seg : null, mot: ramp(t, q.at('strook'), 0.4) * (t < q.at('Elk') ? 1 : 0) });
      naamBij(ctx, 'motorische schors', null, 760, 120, q.on('strook', 1, 0.4) * d2, 'left', C.koraal);
      const lab = (txt, frac, k) => { const P = z5Res(Z5B.CS.map(p => [p[0] + 33, p[1]]), 79)[Math.round(frac * 79)]; naamBij(ctx, txt, null, 600 + (P[0] + 60) * 0.9, 470 + P[1] * 0.9 + 12, k, 'left'); };
      const sl = ramp(t, q.at('lichaam'), 0.4) * d2; lab('been', 0.06, sl * 0.8); lab('hand', 0.41, sl); lab('lippen', 0.73, sl); lab('tong', 0.92, sl);
      const ho = q.on('homunculus', 1, 0.6) * d2; z5Homunculus(ctx, 1480, 470, 1.15, { a: ho, hl: { hand: hl('handen'), lippen: hl('lippen'), tong: hl('tong'), rug: hl('rug') }, t: t >= q.at('Tikken') ? t : 0 });
      naamBij(ctx, 'homunculus', null, 1480, 170, ho, 'center', C.goud);
      tag(ctx, 'precisie telt, niet de grootte', 1480, 830, C.groen, q.on('fijn', 1, 0.4) * d2, 'center', 32); } },

  // ================= Hoofdstuk 4 · De maat houden =================
  q4(ctx, t, q) { vraagScene(ctx, t, q, 4, [['Niets'], ['bewegingen'], ['Of']]); },
  a4(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('tiende'), d = UIT(t, tN - 0.4, 0.6);
    const R = z5Brein(ctx, 520, 380, 0.62, { mot: ramp(t, q.at('bevel'), 0.4), klein: IN_UIT(t, q.at('kleine'), 1e9, 0.4) * (t > tN ? 1 : 0.8) });
    naamBij(ctx, 'motorische schors', null, R.mot[0] + 40, R.mot[1] - 150, q.on('motorische', 1, 0.4) * d, 'center', C.koraal);
    naamBij(ctx, 'kleine hersenen', null, R.klein[0] - 40, R.klein[1] + 130, q.on('kleine', 1, 0.4), 'center', C.goud);
    const hand = [1520, 330], tik = Math.max(0, Math.sin((t - q.at('tik')) * 6.283 * 2)) * ramp(t, q.at('tik'), 0.2) * d;
    if (d > 0.01) { z5Hand(ctx, hand[0] + 150, hand[1], 2.0, d, 1, tik); ctx.save(); ctx.globalAlpha *= d; roundRect(ctx, 1300, hand[1] + 40, 520, 30, 8); shape(ctx, '#6A5A48', '#8A7A64', 2); ctx.restore();
      z5Baan(ctx, [R.mot, [900, 200], [1250, 260], [hand[0] - 70, hand[1] - 30]], ramp(t, q.at('bevel'), 1.0), C.koraal, d, 6);
      tag(ctx, 'bevel: tik!', 1080, 180, C.koraal, q.on('tik', 1, 0.3) * d, 'center', 32);
      z5Baan(ctx, [[R.mot[0] - 20, R.mot[1] + 60], [440, 380], R.klein], ramp(t, q.at('kopie'), 0.8), C.goud, d, 4);
      naamBij(ctx, 'kopie', null, 330, 360, q.on('kopie', 1, 0.4) * d, 'right', C.goud);
      z5Baan(ctx, [[hand[0] - 60, hand[1] + 90], [1150, 470], [820, 540], [R.klein[0] + 60, R.klein[1] + 30]], ramp(t, q.at('spieren'), 1.0), C.teal, d, 5);
      naamBij(ctx, 'terugmelding', 'spieren en gewrichten', 1060, 430, q.on('spieren', 1, 0.4) * d, 'center', C.teal);
      z5Baan(ctx, [[R.klein[0] - 60, R.klein[1] - 40], [240, 300], [260, 160], [R.mot[0] - 40, R.mot[1] - 40]], ramp(t, q.at('bij'), 0.8), C.groen, d, 5);
      naamBij(ctx, 'bijsturen', null, 200, 220, q.on('bij', 1, 0.4) * d, 'center', C.groen); }
    // tikken op de tel: met en zonder kleine hersenen
    const tel = ramp(t, q.at('tel'), 0.4) * d; if (tel > 0.01) { const x0 = 1080, x1 = 1820, y1 = 660, y2 = 770; ctx.save(); ctx.globalAlpha *= tel;
      ctx.fillStyle = rgba('#121A26', 0.8); roundRect(ctx, x0 - 30, y1 - 80, x1 - x0 + 60, 250, 14); ctx.fill();
      for (let k = 0; k < 6; k++) { const xx = x0 + 40 + k * 125; ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(xx, y1 - 50); ctx.lineTo(xx, y2 + 40); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(xx, y1, 14, 0, 6.283); ctx.fillStyle = C.groen; ctx.fill();
        const zon = ramp(t, q.at('Zonder'), 0.4); if (zon > 0.01) { ctx.save(); ctx.globalAlpha *= zon; ctx.beginPath(); ctx.arc(xx + 30 + 26 * hash(k * 5), y2 + (hash(k * 9) - 0.5) * 30, 14, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); ctx.restore(); } }
      metaText(ctx, 'met kleine hersenen', x0, y1 - 40 + 0, C.groen, 'left', 28); ctx.restore();
      if (t > q.at('Zonder')) metaText(ctx, 'zonder: schokkerig en te laat', x0, y2 + 45, C.koraal, 'left', 28); }
    tag(ctx, 'evenwicht wordt slechter', 520, 780, C.koraal, IN_UIT(t, q.at('evenwicht'), tN - 0.4, 0.4), 'center', 30);
    // getallen: een tiende van de massa, vier vijfde van de zenuwcellen
    const g = ramp(t, tN - 0.2, 0.6); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; const bx = 1080, bw = 700;
      const balk2 = (y, frac, lab, col) => { roundRect(ctx, bx, y, bw, 56, 10); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, bx, y, Math.max(24, bw * frac), 56, 10); shape(ctx, rgba(col, 0.75), col, 2); text(ctx, lab, bx, y - 18, fTekst(34, 600), C.text, 'left'); };
      balk2(300, ease((t - tN) / 0.8) * 0.1, 'deel van de hersenmassa: een tiende', C.goud); const v = ramp(t, q.at('vijfde'), 0.8); if (v > 0.01) balk2(500, v * 0.8, 'deel van de zenuwcellen: vier vijfde', C.goud);
      metaText(ctx, '69 van de 86 miljard neuronen', bx, 610, C.text2, 'left', 28); ctx.restore(); } },

  // ================= Hoofdstuk 5 · Vanzelf =================
  q5(ctx, t, q) { vraagScene(ctx, t, q, 5, [['grote'], ['hersenstam'], ['niets']]); },
  a5(ctx, t, q) { bg(ctx, 'schema'); const tH = q.at('Net'), tV = q.at('voorbeeld'), tR = q.at('refrein'), A = UIT(t, tH - 0.2, 0.6), Bf = IN_UIT(t, tH - 0.2, tV - 0.2, 0.6), Cf = IN_UIT(t, tV - 0.2, tR - 0.3, 0.6), Df = ramp(t, tR - 0.3, 0.6);
    // A · ademhaling: hersenstam stuurt het middenrif
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; BODY = { cx: 520, yb: 1500, h: 1300 }; const per = 3.6, ph = ((t - 0.5) / per) % 1, br = Math.sin(clamp((ph - 0.25) / 0.5, 0, 1) * Math.PI);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, CAPTION_Y - 10); ctx.clip(); bodyOrgans({ adem: 1, breath: br * 1.57, sil: 1, t });
      const [dx0, dy0] = AP(-0.72, 2.5), [dx1, dy1] = AP(0.72, 2.5), [dm, dmy] = AP(0, 2.32 + 0.08 * br); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(dx0, dy0); ctx.quadraticCurveTo(dm, dmy - 70, dx1, dy1); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'middenrif', null, dx1 + 30, dy1 - 10, q.on('middenrif', 1, 0.4), 'left', C.koraal);
      const nek = AP(0.08, 1.0), zen = [nek, AP(0.32, 1.5), AP(0.42, 2.0), AP(0.5, 2.36)]; const sig = ramp(t, q.at('signaal'), 0.4);
      z5Baan(ctx, zen, sig, C.teal, 1, 5, sig > 0.5 ? clamp(ph * 2.2, 0, 1) : -1);
      const kop = AP(0, 0.45); let R = null; zoomCircle(ctx, 1360, 400, 300, kop[0] + 70, kop[1], 'IN JE HOOFD', 1, () => { R = z5Brein(ctx, 1400, 360, 0.6, { stam: ramp(t, q.at('hersenstam'), 0.4) * (1 - ramp(t, q.at('verlengde'), 0.3)), merg: ramp(t, q.at('verlengde'), 0.4), namen: {} }); }); naamBij(ctx, 'verlengde merg', null, 1440, 640, ramp(t, q.at('verlengde'), 0.4), 'left', C.goud);
      tag(ctx, 'ademhaling', 1220, 790, C.teal, q.on('ademhaling', 1, 0.4), 'center', 30); tag(ctx, 'tempo van je hart', 1530, 790, C.koraal, q.on('hart', 1, 0.4), 'center', 30);
      tag(ctx, 'dag en nacht', 1360, 70, C.text2, IN_UIT(t, q.at('nacht'), q.at('longen'), 0.4), 'center', 30);
      kruis(ctx, AP(-0.4, 1.9)[0], AP(-0.4, 1.9)[1], 40, IN_UIT(t, q.at('longen'), q.at('middenrif'), 0.3), C.koraal); ctx.restore(); }
    // B · hypothalamus en hypofyse (mediane doorsnede uit de beeldbank)
    if (Bf > 0.01) { ctx.save(); ctx.globalAlpha *= Bf; const hthA = ramp(t, q.at('hypothalamus'), 0.5), hypA = ramp(t, q.at('hypofyse'), 0.5);
      const P = hoofdHersenen(ctx, 600, 460, 1.15, { hth: hthA, hyp: hypA, hthCol: C.paars, hypCol: '#B3A6DA', gloed: 0, t });
      naamBij(ctx, 'hypothalamus', null, P.hth[0] - 40, P.hth[1] - 50, hthA, 'right', C.paars); naamBij(ctx, 'hypofyse', null, P.hyp[0] + 40, P.hyp[1] + 60, hypA, 'left', '#B3A6DA');
      metaText(ctx, 'hoofd in doorsnede', 600, 860, C.text2, 'center', 28);
      tag(ctx, 'temperatuur', 1300, 230, C.oker, q.on('temperatuur', 1, 0.3), 'left', 34); tag(ctx, 'honger', 1300, 330, C.oker, q.on('honger', 1, 0.3), 'left', 34); tag(ctx, 'dorst', 1300, 430, C.oker, q.on('dorst', 1, 0.3), 'left', 34);
      const az = ramp(t, q.at('autonome'), 0.6); z5Baan(ctx, [P.hth, [880, 600], [1180, 600], [1290, 590]], az, C.teal, 1, 5); tag(ctx, 'autonoom zenuwstelsel', 1300, 600, C.teal, az, 'left', 32);
      if (hypA > 0.01) for (let i = 0; i < 8; i++) { const u = ((t - q.at('hypofyse')) * 0.35 + i / 8) % 1; const x = lerp(P.hyp[0], 1290, u), y = lerp(P.hyp[1], 720, u) + 20 * Math.sin(u * 6 + i);
        ctx.save(); ctx.globalAlpha *= Math.sin(u * Math.PI) * hypA; ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.283); shape(ctx, C.paars, '#B3A6DA', 1.5); ctx.restore(); }
      tag(ctx, 'hormonen', 1300, 720, C.paars, q.on('hormonen', 1, 0.4), 'left', 32); ctx.restore(); }
    // C · regelkring temperatuur (levend model: sensor, normwaarde, regelcentrum, effectoren, verstoring)
    if (Cf > 0.01) { ctx.save(); ctx.globalAlpha *= Cf;
      const tw = q.at('warm', 2), tk = q.at('koud'), tz = q.at('afwijking');
      const temp = (tt) => { let v = 37; if (tt > tw) v += 1.3 * Math.exp(-Math.pow((tt - tw - 1.6) / 1.4, 2)) * (tt < tw + 1.6 ? 1 : 1); if (tt > tk) v -= 1.2 * Math.exp(-Math.pow((tt - tk - 1.5) / 1.3, 2)); return v; };
      // grafiek lichaamstemperatuur (verstoring en terugkeer)
      const gx = 120, gy = 560, gw = 720, gh = 260, gA = ramp(t, tV, 0.5); z5Kaart(ctx, gx - 30, gy - 70, gw + 60, gh + 110, gA);
      if (gA > 0.01) { ctx.save(); ctx.globalAlpha *= gA; const Y = v => gy + gh / 2 - (v - 37) * 70; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - 20); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
        metaText(ctx, 'lichaamstemperatuur', gx + 10, gy - 30, C.text2, 'left', 28);
        if (t > q.at('normwaarde')) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('normwaarde'), 0.4); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(gx, Y(37)); ctx.lineTo(gx + gw, Y(37)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '37 °C', gx + gw - 4, Y(37) - 12, fMeta(28), C.goud, 'right'); ctx.restore(); }
        const t0 = tV, span = 24; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 1; i <= 200; i++) { const ta = t0 + (i - 1) / 200 * span, tb = t0 + i / 200 * span; if (tb > t) break; const va = temp(ta), vb = temp(tb);
          ctx.strokeStyle = vb > 37.15 ? C.koraal : vb < 36.85 ? C.teal : C.text; ctx.beginPath(); ctx.moveTo(gx + (ta - t0) / span * gw, Y(va)); ctx.lineTo(gx + (tb - t0) / span * gw, Y(vb)); ctx.stroke(); }
        ctx.restore();
        tag(ctx, 'te warm', gx + (tw + 1.5 - tV) / 24 * gw, gy + 40, C.koraal, IN_UIT(t, tw, tk, 0.3), 'center', 30); tag(ctx, 'te koud', gx + (tk + 1.5 - tV) / 24 * gw, gy + gh + 50, C.teal, IN_UIT(t, tk, tz, 0.3), 'center', 30); }
      // sensor
      const sA = ramp(t, q.at('Temperatuurzintuigen'), 0.5); z5Kaart(ctx, 90, 130, 420, 230, sA, C.teal); if (sA > 0.01) { ctx.save(); ctx.globalAlpha *= sA; text(ctx, 'sensor', 300, 190, fMeta(28), C.text2, 'center'); text(ctx, 'temperatuurzintuigen', 300, 250, fTekst(36, 700), C.text, 'center'); text(ctx, 'in huid en hersenen', 300, 310, fTekst(32), C.text2, 'center'); ctx.restore(); }
      // regelcentrum met knop
      const hA = ramp(t, q.at('hypothalamus'), 0.5); z5Kaart(ctx, 700, 110, 520, 330, hA, C.paars); if (hA > 0.01) { ctx.save(); ctx.globalAlpha *= hA; text(ctx, 'regelcentrum', 960, 165, fMeta(28), C.text2, 'center'); text(ctx, 'hypothalamus', 960, 220, fTekst(40, 700), C.text, 'center');
          z5Knop(ctx, 960, 330, 80, { norm: 37, temp: temp(t), toonNorm: ramp(t, q.at('normwaarde'), 0.4), toonTemp: 1 }); ctx.restore();
        naamBij(ctx, 'normwaarde', null, 868, 345, q.on('normwaarde', 1, 0.4) * Cf, 'right', C.goud); }
      // effector: huid uit de beeldbank (zweet, vaten wijd of nauw) en spieren die rillen
      const eA = ramp(t, q.at('zweetklieren'), 0.5); z5Kaart(ctx, 1380, 110, 460, 560, eA, C.line);
      if (eA > 0.01) { ctx.save(); ctx.globalAlpha *= eA; text(ctx, 'effectoren', 1610, 165, fMeta(28), C.text2, 'center');
        const vat = t < tk ? ramp(t, q.at('bloedvaten'), 0.6) : -ramp(t, q.at('bloedvaten', 2), 0.6); const zweet = ramp(t, q.at('zweet,'), 0.5) * UIT(t, tk, 0.6);
        ctx.save(); roundRect(ctx, 1410, 190, 400, 350, 12); ctx.clip(); bg(ctx, 'micro'); huidBlok(ctx, 1410, 190, 400, { vat, zweet, t, focus: null }); ctx.restore();
        const ril = ramp(t, q.at('rillen'), 0.4) * UIT(t, tR - 0.3, 0.5); text(ctx, t < tk ? (zweet > 0.5 ? 'zweten · vaten wijd' : '') : (ril > 0.01 ? 'vaten nauw · rillen' : 'vaten nauw'), 1610, 590, fTekst(32, 700), t < tk ? C.koraal : C.teal, 'center');
        if (ril > 0.01) { const sx = Math.sin(t * 60) * 5 * ril; ctx.save(); ctx.translate(sx, 0); roundRect(ctx, 1450, 610, 320, 40, 20); shape(ctx, '#B55A50', '#D98A7E', 2); ctx.restore(); text(ctx, 'spieren maken warmte', 1610, 640 + 0, fTekst(28, 600), C.text, 'center'); }
        ctx.restore(); }
      // pijlen van de kring
      const lus = IN_UIT(t, tz, tR, 0.3);
      z5Baan(ctx, [[gx + 100, gy - 70], [200, 440], [300, 370]], sA, C.teal, 1, 4); z5Baan(ctx, [[510, 245], [600, 245], [700, 260]], ramp(t, q.at('hypothalamus'), 0.6), C.teal, 1, 4);
      z5Baan(ctx, [[1220, 275], [1300, 275], [1380, 300]], eA, C.teal, 1, 4); z5Baan(ctx, [[1600, 670], [1500, 740], [gx + gw + 40, gy + gh / 2 + 30]], ramp(t, q.at('warmte'), 0.6), C.koraal, 1, 4);
      if (lus > 0.01) { ring(ctx, 1200, 740, 34, lus, C.groen, 4); text(ctx, '−', 1200, 758, fTekst(56, 700), C.groen, 'center'); naamBij(ctx, 'negatieve terugkoppeling', 'afwijking wordt tegengewerkt', 1200, 820, q.on('negatieve', 1, 0.4), 'center', C.groen); }
      ctx.restore(); }
    // D · refrein: hart sneller, kippenvel, vanzelf
    if (Df > 0.01) { ctx.save(); ctx.globalAlpha *= Df; const sn = ramp(t, q.at('sneller'), 1.0), freq = lerp(1.1, 2.0, sn);
      z5Hart(ctx, 380, 380, 110, 1, t * freq * 6.283); tag(ctx, 'hart klopt sneller', 380, 620, C.koraal, q.on('hart', 2, 0.4), 'center', 32);
      ctx.save(); roundRect(ctx, 760, 150, 440, 400, 12); ctx.clip(); bg(ctx, 'micro'); huidBlok(ctx, 760, 150, 440, { kip: ramp(t, q.at('haartjes'), 1.0), t, focus: 'haar' }); ctx.restore(); roundRect(ctx, 760, 150, 440, 400, 12); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
      naamBij(ctx, 'kippenvel', 'haarspiertje trekt samen', 980, 610, q.on('Kippenvel', 1, 0.4), 'center', C.goud);
      const R = z5Brein(ctx, 1560, 360, 0.5, { stam: ramp(t, q.at('automatische'), 0.4), diep: ramp(t, q.at('afdelingen'), 0.3) + ramp(t, q.at('automatische'), 0.4), hth: ramp(t, q.at('automatische'), 0.4) });
      tag(ctx, 'autonoom zenuwstelsel', 1560, 700, C.teal, q.on('autonome', 2, 0.4), 'center', 32); tag(ctx, 'vanzelf', 1560, 790, C.groen, q.on('automatische', 1, 0.4), 'center', 32); ctx.restore(); } },

  // ================= Hoofdstuk 6 · Samenvatting =================
  s70(ctx, t, q) { bg(ctx, 'schema'); const a = (w, n = 1) => ramp(t, q.at(w, n), 0.4);
    const R = z5Brein(ctx, 620, 450, 0.92, { aud: a('gehoorschors'), assoc: { t: a('associatieve'), f: a('baas') * 0.6, p: a('baas') * 0.6, o: a('baas') * 0.6 }, mot: a('Links'), klein: IN_UIT(t, q.at('kleine'), q.at('Lippen'), 0.3), merg: IN_UIT(t, q.at('hersenstam'), q.at('Allemaal'), 0.3), diep: 0, stam: 0 });
    const wit = a('witte'); if (wit > 0.01) { ctx.save(); ctx.globalAlpha *= wit * UIT(t, q.at('Maar'), 0.5); ctx.strokeStyle = rgba(Z5.wit, 0.9); ctx.lineWidth = 4; const pts = [R.aud, R.mot, R.vis, R.P(220, -130), R.P(-150, -175)];
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const p = pts[i], r = pts[j]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo((p[0] + r[0]) / 2, (p[1] + r[1]) / 2 + 60, r[0], r[1]); ctx.stroke(); } ctx.restore(); }
    const rx = 1250; const regels = [['gehoorschors hoort', 'gehoorschors', C.teal], ['associatieve schors herkent', 'associatieve', C.oker], ['links stuurt je rechterhand', 'Links', C.koraal], ['kleine hersenen: op de maat', 'kleine', C.goud], ['lippen en tong: veel schors', 'Lippen', C.koraal], ['hersenstam: adem gaat door', 'hersenstam', C.goud], ['kippenvel komt vanzelf', 'kippenvel', C.teal], ['verbonden door witte stof', 'witte', C.text]];
    regels.forEach(([s, w, col], i) => { const al = a(w) * UIT(t, q.at('Maar'), 0.5); if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.arc(rx, 150 + i * 72 - 12, 9, 0, 6.283); ctx.fillStyle = col; ctx.fill(); text(ctx, s, rx + 26, 150 + i * 72, fTekst(36, 600), C.text, 'left'); ctx.restore(); });
    const gb = IN_UIT(t, q.at('baas'), q.at('Maar'), 0.4); if (gb > 0.01) haak(ctx, 1240, 1820, 720, 'geen baas: samen één ervaring', C.groen, gb);
    tag(ctx, 'volgende film: leren en onthouden', 1520, 420, C.goud, a('geleerd'), 'center', 34);
    const tn = IN_UIT(t, q.at('twee'), 1e9, 0.4); if (tn > 0.01) { z5Noot(ctx, 1450, 300, 1.4, tn, C.goud); z5Noot(ctx, 1560, 270, 1.4, tn, C.goud); } },
});
