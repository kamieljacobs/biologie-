// Geslachtsorganen en puberteit 2.0 — scènes per alinea (26 okt 2026). Gezichten blijven heel: organen staan in een
// zoomcirkel NÁÁST het lichaam (BEELDAFSPRAKEN, Kamiel 25 okt 2026), nooit over gezicht of kleding.
// Bibliotheek: hoofdHersenen, vrouwOrganenVoor, zaadbalWeefsel, eierstokDoorsnede, baarmoederwand, zenuwcel, vetweefsel,
// zaadcelEcht, eicelEcht, bloedvat. Nieuw (teken_g2.js deel 2): hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, hormDeeltje.

const NAV = { y: 900 }; // vloer
function zoomNaast(ctx, sx, sy, x, y, r, a, caption, draw) { if (a <= 0.01) return; zoomCircle(ctx, x, y, r * (0.6 + 0.4 * ease(a)), sx, sy, caption, a, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); draw(); }); }
function hersenenRond(ctx, x, y, r, o = {}) { const s = r * 1.6 / 470; hoofdHersenen(ctx, x + 20 * s, y + 30 * s, s, o); }
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#E6E1D3'); circ(ctx, x + r * 0.45, y - r * 0.2, r * 0.9, C.bgSchema); ctx.restore(); }
function bloedbaan(ctx, pts, t, soorten, a = 1, n = 9, volg = -1) { if (a <= 0.01) return; const D = bioDicht(pts, 20); ctx.save(); ctx.globalAlpha *= a * 0.55; lijnStrip(ctx, D, BIO.bloed, 7); ctx.restore();
  for (let i = 0; i < n; i++) { const [px, py] = bioPunt(D, (i / n + t * 0.06) % 1); hormDeeltje(ctx, px, py, soorten[i % soorten.length], 7, a); }
  if (volg >= 0) { const [px, py] = bioPunt(D, clamp(volg, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 8, a, true); } }
function lijnStrip(ctx, P, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function stotenGrafiek(ctx, gx, gy, gw, gh, tot, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.nacht > 0.01) { ctx.save(); ctx.globalAlpha *= o.nacht; for (let k = 8; k < 16; k += 1) { ctx.fillStyle = rgba('#0D1420', 0.55); ctx.fillRect(gx + (k + 0.55) / 16 * gw, gy, 0.35 / 16 * gw, gh); } ctx.restore(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
  for (const v of [0, 4, 8, 12, 16]) text(ctx, String(v), gx + v / 16 * gw, gy + gh + 36, fTekst(24), C.text2, 'center');
  metaText(ctx, 'leeftijd (jaar)', gx + gw, gy + gh + 74, C.grain, 'right', 20); metaText(ctx, 'stoten GnRH (schets)', gx, gy - 16, C.grain, 'left', 20);
  ctx.fillStyle = rgba(HKLEUR.gnrh, 0.12 * (o.band == null ? 1 : o.band)); ctx.fillRect(gx + 8 / 16 * gw, gy, 6 / 16 * gw, gh); text(ctx, 'start: ergens tussen 8 en 14', gx + 11 / 16 * gw, gy + 32, fTekst(22, 700), rgba(HKLEUR.gnrh, o.band == null ? 1 : o.band), 'center');
  ctx.strokeStyle = HKLEUR.gnrh; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh); let last = null;
  for (let k = 0; k < 1600; k++) { const age = k / 100; if (age > tot) break; const f = age < 8 ? 0.5 : lerp(0.5, 2.6, (age - 8) / 6); const hgt = age < 8 ? 0.1 : lerp(0.1, 0.85, clamp((age - 8) / 6, 0, 1)); const ph = (age * f * 2) % 1; const v = ph < 0.2 ? Math.sin(ph / 0.2 * Math.PI) * hgt : 0; last = [gx + age / 16 * gw, gy + gh - v * (gh - 50)]; ctx.lineTo(last[0], last[1]); }
  ctx.stroke(); ctx.restore(); }
function maatglas(ctx, x, y, w, h, f, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // f = [zaadcellen, blaasjes, prostaat] 0..1 (vulgraad per laag)
  const parts = [[0.05, '#F2F2EE'], [0.6, C.groen], [0.3, PROSTAAT]]; let yy = y + h;
  parts.forEach(([frac, col], i) => { const hh = h * 0.95 * frac * clamp(f[i], 0, 1); ctx.fillStyle = rgba(col, 0.75); ctx.fillRect(x + 4, yy - hh, w - 8, hh); yy -= hh; });
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y - 10); ctx.stroke();
  for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x + w - 18, y + h - i * h / 6); ctx.lineTo(x + w, y + h - i * h / 6); ctx.stroke(); } ctx.restore(); }
function meioseMini(ctx, x, y, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // 1 cel → 2 → 4 (vlak, kort; zelfde idee als Celdeling)
  const st = u < 0.33 ? 0 : u < 0.66 ? 1 : 2; const n = [1, 2, 4][st], r = [34, 26, 19][st];
  for (let i = 0; i < n; i++) { const px = x + (i - (n - 1) / 2) * r * 2.3; ctx.beginPath(); ctx.arc(px, y, r, 0, 6.283); shape(ctx, rgba('#E6D7B0', 0.35), '#E6D7B0', 2); ctx.beginPath(); ctx.arc(px, y, r * 0.42, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); }
  text(ctx, ['46 chromosomen', '', '23 per zaadcel'][st], x, y + 70, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
function zaadVolg(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 5, C.goud); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.stroke(); ctx.restore(); } // orgaanschaal: zaadcel als ring met stip, geen staart
function eileiderStuk(ctx, ex, ey, a = 1) { // kort stuk eileider met trechter en franjes rechts van de eierstok (eierstokDoorsnede rx 210)
  ctx.save(); ctx.globalAlpha *= Math.max(0.55, a); const col = '#C98088', lc = '#E3A6AC';
  ctx.beginPath(); ctx.moveTo(ex + 150, ey - 120); ctx.bezierCurveTo(ex + 240, ey - 210, ex + 330, ey - 170, ex + 400, ey - 230); ctx.strokeStyle = rgba(col, 0.75); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.stroke(); ctx.strokeStyle = rgba('#5A2A36', 0.55); ctx.lineWidth = 12; ctx.stroke();
  for (let i = 0; i < 7; i++) { const an = 2.2 + i * 0.32; ctx.beginPath(); ctx.moveTo(ex + 150, ey - 120); ctx.quadraticCurveTo(ex + 150 + Math.cos(an) * 40, ey - 120 + Math.sin(an) * 40, ex + 150 + Math.cos(an + 0.15) * 66, ey - 120 + Math.sin(an + 0.15) * 66); ctx.strokeStyle = lc; ctx.lineWidth = 7; ctx.stroke(); }
  ctx.restore(); naamBij(ctx, 'eileider', 'trechter met franjes', ex + 330, ey - 270, a, 'center'); }
function samZij(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ zij: true, kijk: 1, t, uit: 'neutraal' }, o)) || {}; }

Object.assign(SCENES, {
  title(ctx, t) { meetlat(ctx, 1620, 880, 380, 1); persoon(ctx, 'daan', 1500, 880, 360 / 0.95, { uit: 'denkt', pose: 'denk', kijk: 1, t }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { klasAchtergrond(ctx);
    const groei = q.on('Nu', 1, 1.4); const hS = lerp(370, 470, groei), hD = lerp(370, 382, groei);
    meetlat(ctx, 1250, 880, 360, 1);
    persoon(ctx, 'daan', 1080, 880, hD / 0.95, { uit: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'bezorgd' : (q.on('Nee', 1) > 0.5 ? 'blij' : 'neutraal'), pose: q.on('mis', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'schouders' : 'staan', kijk: 1, t });
    persoon(ctx, 'sam', 1420, 880, hS / 1.04, { uit: q.on('stem', 1) > 0.5 && q.on('gegroeid', 1) < 0.5 ? 'praat' : 'blij', pose: 'staan', kijk: -1, t });
    const st = q.on('Vorig', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - 372); ctx.lineTo(1282, 880 - 372); ctx.stroke(); ctx.restore(); chip(ctx, 'vorig jaar: even groot', 1250, 300, C.goud, st * (1 - q.on('Nu', 1)), 24); }
    if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= groei; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1218, 880 - hS); ctx.lineTo(1282, 880 - hS); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'een kop groter', 1590, 330, C.groen, q.on('kop', 1), 24);
    const sb = q.on('stem', 1) * (1 - q.on('mis', 1)); if (sb > 0.01) { bubbel(ctx, 1560, 430, 'Hoi!', '#F2F2EE', sb, 30); chip(ctx, 'lage stem', 1720, 470, C.teal, sb, 22); }
    chip(ctx, 'bijna niet gegroeid', 900, 420, C.text2, q.on('gegroeid', 1) * (1 - q.on('startsein', 1)), 24);
    vraagteken(ctx, 960, 470, q.on('mis', 1) * (1 - q.on('Nee', 1)), 90);
    const sl = q.on('startsein', 1); startlamp(ctx, 1080, 392, 0, sl); startlamp(ctx, 1420, 880 - hS - 90, 1, sl);
    chip(ctx, 'startsein: nog niet', 1080, 292, C.koraal, sl, 24); chip(ctx, 'startsein: gegeven', 1500, 880 - hS - 170, C.groen, sl, 24); },
  s02(ctx, t, q) { klasAchtergrond(ctx); meetlat(ctx, 1250, 880, 360, 1);
    persoon(ctx, 'daan', 1080, 880, 382 / 0.95, { uit: 'denkt', pose: 'staan', kijk: 1, t }); persoon(ctx, 'sam', 1420, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t });
    startlamp(ctx, 1080, 392, 0, 1); startlamp(ctx, 1420, 320, 1, 1);
    tag(ctx, 'wie geeft het startsein?', 640, 560, C.goud, 1, 'center', 34); vraagteken(ctx, 640, 720, q.on('denk', 1), 110); },

  // ---------- H1 Het startsein ----------
  s05(ctx, t, q) { bg(ctx, 'schema');
    const p = samZij(ctx, 430, NAV.y, 700, t); const hd = p.hoofd || { x: 430, y: 300, r: 40 };
    const z = q.on('hypothalamus', 1, 1); const zx = 980, zy = 380, zr = 300;
    zoomNaast(ctx, hd.x + hd.r * 0.2, hd.y, zx, zy, zr, z, 'hersenen van opzij · vergroot', () => hersenenRond(ctx, zx, zy, zr, { hth: 0.5 + 0.5 * z, hyp: 0.3, t }));
    if (z > 0.6) { const s = zr * 1.6 / 470; const hx = zx + 20 * s, hy = zy + 30 * s; ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, hy, 36, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'hypothalamus', 'een klein deel van je hersenen', zx + zr + 30, zy - 40, z, 'left');
      const gh = q.on('gehemelte', 1); if (gh > 0.01) { ctx.save(); ctx.globalAlpha *= gh * (1 - q.on('Zaadballen', 1)); ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(hx + 40 * s * 2.2, hy + 125 * s); ctx.lineTo(hx + 210 * s, hy + 118 * s); ctx.stroke(); ctx.restore(); naamBij(ctx, 'gehemelte', null, zx + zr + 30, zy + 120, gh * (1 - q.on('Zaadballen', 1)), 'left', C.teal); } }
    const ge = q.on('Zaadballen', 1); if (ge > 0.01) { ctx.save(); ctx.globalAlpha *= ge; paneel(ctx, 1320, 560, 520, 260, '');
      ctx.beginPath(); ctx.ellipse(1440, 680, 34, 44, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); text(ctx, 'zaadballen', 1440, 760, fTekst(24, 700), C.text, 'center');
      ctx.beginPath(); ctx.ellipse(1700, 680, 44, 28, 0, 0, 6.283); shape(ctx, rgba(VK.stok, 0.7), lighten(VK.stok, 0.3), 2); text(ctx, 'eierstokken', 1700, 760, fTekst(24, 700), C.text, 'center');
      regel(ctx, 'al vanaf je geboorte', 1580, 610, 1, C.text2, 24, 'center', 700); ctx.restore(); }
    chip(ctx, 'kindertijd: bijna stil', 1580, 880, C.text2, q.on('stil', 1), 24); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const gr = q.on('Ergens', 1);
    const nu = clamp((t - q.at('Dan')) / 4, 0, 1); const tot = lerp(8, 13, nu); const stootFase = (t * lerp(0.35, 0.9, nu)) % 1;
    hypofysePoort(ctx, 480, 520, 0.85, { puls: gr > 0.5 ? stootFase : -1, aan: 0.25 * nu, uit: 0.2 * nu, t });
    naamBij(ctx, 'hypothalamus', null, 120, 220, 1, 'left');
    stotenGrafiek(ctx, 1060, 260, 760, 380, gr > 0.01 ? lerp(4, tot, gr) : 0, gr, { band: q.on('veertiende', 1), nacht: q.on('nachts', 1) });
    naamBij(ctx, 'GnRH', 'steeds vaker een stoot', 790, 560, q.on('GnRH', 1), 'left', HKLEUR.gnrh);
    const nt = q.on('nachts', 1); if (nt > 0.01) { maan(ctx, 1150, 760, 26, nt); regel(ctx, 'in het begin vooral ’s nachts, in diepe slaap', 1200, 772, nt, C.text, 26, 'left', 700); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const st = q.on('stoot', 1), aan = q.on('FSH', 1), sl = q.on('steeltje', 1);
    const puls = st > 0.01 ? clamp((t - q.at('stoot')) / 3.2, 0, 1) : -1;
    const R = hypofysePoort(ctx, 700, 500, 1.0, { puls: aan > 0.5 ? (t * 0.4) % 1 : puls, aan, uit: q.on('LH', 1), t, volgLH: q.on('LH', 1) > 0.5 ? clamp((t - q.at('LH')) / 4, 0, 0.8) : -1 });
    naamBij(ctx, 'hypothalamus', null, 280, 200, 1, 'left');
    naamBij(ctx, 'kleine bloedvaatjes', 'in het steeltje', 520, 580, sl * (1 - aan), 'right');
    const hy = q.on('hypofyse', 1); naamBij(ctx, 'hypofyse', 'klier ter grootte van een erwt', 1020, 790, hy, 'left');
    const ew = q.on('erwt', 1) * (1 - q.on('maken', 1));     if (ew > 0.01) { ctx.save(); ctx.globalAlpha *= ew; circ(ctx, 1560, 400, 295, '#8DBA5A', '#B8DA88', 3); text(ctx, 'erwt van 1 centimeter · zelfde vergroting', 1560, 740, fTekst(22, 600), C.text2, 'center'); ctx.restore(); }
    naamBij(ctx, 'FSH', null, 1310, 560, aan, 'left', HORM.fsh[0]); hormDeeltje(ctx, 1290, 550, 'fsh', 10, aan);
    naamBij(ctx, 'LH', null, 1310, 620, q.on('LH', 1), 'left', HORM.lh[0]); hormDeeltje(ctx, 1290, 610, 'lh', 10, q.on('LH', 1));
    schaalStreep(ctx, 80, 840, 59, '1 millimeter'); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Daar', 1, 0.9), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; // lichamen heel; bloed en organen in schema en zoomcirkels ernaast (BEELDAFSPRAKEN 25 okt)
      const p = samZij(ctx, 210, NAV.y, 680, t); const n = persoon(ctx, 'noor', 1720, NAV.y, 660 / 0.97, { t, uit: 'neutraal', kijk: -1 }) || {};
      const heupS = p.heup || { x: 210, y: 560 }, heupN = n.heup || { x: 1720, y: 560 };
      const ov = q.on('overal', 1), rc = q.on('receptoren', 1), volg = q.on('bloed', 1) > 0.5 ? clamp((t - q.at('bloed')) / 6, 0, 1) : -1;
      circ(ctx, 960, 210, 70, rgba('#C98A6A', 0.3), '#E0A88A', 2.5); naamBij(ctx, 'hypofyse', null, 960, 140, 1, 'center');
      bloedbaan(ctx, [[960, 280], [930, 420], [700, 560], [560, 640]], t, ['fsh', 'lh'], 1, 7, volg);
      bloedbaan(ctx, [[960, 280], [990, 420], [1220, 560], [1360, 640]], t + 0.3, ['lh', 'fsh'], 1, 7);
      bloedbaan(ctx, [[960, 280], [960, 480], [960, 600]], t + 0.6, ['fsh', 'lh'], ov, 4);
      if (ov > 0.01) { ctx.save(); ctx.globalAlpha *= ov; doelcel(ctx, 960, 690, 70, { noRec: true, t, fill: '#B5574A' }); ctx.restore(); naamBij(ctx, 'spiercel', 'geen receptoren: er gebeurt niets', 960, 800, ov * (1 - rc * 0.0), 'center'); }
      zoomNaast(ctx, heupS.x + 30, heupS.y + 70, 470, 690, 130, rc, 'zaadbal · vergroot', () => zaadbalWeefsel(ctx, 470, 690, 300, 210, { t, leydig: rc, sertoli: 0.3 }));
      zoomNaast(ctx, heupN.x - 10, heupN.y + 10, 1450, 690, 130, rc, 'eierstok · vergroot', () => eierstokDoorsnede(ctx, 1450, 690, 115, 80, { groei: 0.4, t }));
      if (rc > 0.01) { for (const [x, y] of [[560, 640], [1360, 640]]) { ctx.save(); ctx.globalAlpha *= rc; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 22, 0, 6.283); ctx.stroke(); ctx.restore(); } naamBij(ctx, 'receptoren', null, 560, 600, rc, 'center'); naamBij(ctx, 'receptoren', null, 1360, 600, rc, 'center'); }
      text(ctx, 'FSH en LH reizen met het bloed door je hele lichaam', 960, 90, fTekst(34, 700), C.text, 'center');
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
      const ts = q.on('testosteron', 1), oe = q.on('oestrogeen', 1), rp = q.on('rijpen', 1);
      const Z = zaadbalWeefsel(ctx, 500, 450, 860, 560, { t, leydig: 1, testo: ts, sertoli: 0.5, productie: 0.4 + 0.6 * rp });
      hormDeeltje(ctx, Z.leydig[0] - 40, Z.leydig[1] - 70, 'lh', 10, 1, true);
      naamBij(ctx, 'testosteron', null, Z.leydig[0] + 50, Z.leydig[1] + 10, ts, 'left', HORM.testo[0]);
      naamBij(ctx, 'zaadbuisje', 'hier rijpen zaadcellen', Z.buisjes[0][0] - 40, Z.buisjes[0][1] + Z.buisjes[0][2] + 50, rp, 'left');
      ctx.save(); ctx.beginPath(); ctx.rect(990, 170, 860, 560); ctx.clip(); ctx.fillStyle = '#16202E'; ctx.fillRect(990, 170, 860, 560);
      const E = eierstokDoorsnede(ctx, 1420, 450, 380, 250, { groei: lerp(0.4, 0.85, rp), t, winnaar: 3 }); ctx.restore();
      if (E) { for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283 + t * 0.2, rr = 90 + 50 * hash(i); hormDeeltje(ctx, E.x + Math.cos(an) * rr, E.y + Math.sin(an) * rr * 0.8, 'oestro', 7, oe); }
        naamBij(ctx, 'oestrogeen', null, E.x - 60, E.y + 150, oe, 'center', HORM.oestro[0]); naamBij(ctx, 'eicel rijpt', null, E.x - 10, E.y - 150, rp, 'center'); }
      text(ctx, 'zaadbal', 500, 140, fTekst(32, 700), C.text, 'center'); text(ctx, 'eierstok', 1420, 140, fTekst(32, 700), C.text, 'center');
      schaalStreep(ctx, 80, 800, 100, '0,1 millimeter');  ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const pr = q.on('primaire', 1), se = q.on('secundaire', 1);
    persoon(ctx, 'sam', 640, 880, 560, { uit: 'blij', pose: 'staan', kijk: 1, t }); persoon(ctx, 'noor', 1280, 880, 545, { uit: 'blij', pose: 'staan', kijk: -1, t });
    const vd = q.on('veranderen', 1); naamBij(ctx, 'testosteron', null, 640, 290, vd, 'center', HORM.testo[0]); naamBij(ctx, 'oestrogeen', null, 1280, 290, vd, 'center', HORM.oestro[0]); for (let i = 0; i < 4; i++) { hormDeeltje(ctx, 560 + i * 50, 250, 'testo', 9, vd); hormDeeltje(ctx, 1200 + i * 50, 250, 'oestro', 9, vd); }
    tag(ctx, 'primaire geslachtskenmerken: de geslachtsorganen, al bij de geboorte', 960, 140, C.text2, pr, 'center', 26);
    tag(ctx, 'secundaire geslachtskenmerken: komen in de puberteit', 960, 214, C.goud, se, 'center', 26); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1), gs = on('groeispurt'); const hS = 560 * (1 + 0.04 * gs), hN = 545 * (1 + 0.04 * gs);
    persoon(ctx, 'sam', 640, 880, hS, { uit: 'blij', pose: 'staan', kijk: 1, t }); persoon(ctx, 'noor', 1280, 880, hN, { uit: 'blij', pose: 'staan', kijk: -1, t });
    const J = [['haar op de kin', 'kin'], ['bredere schouders', 'schouders'], ['sterkere spieren', 'spieren'], ['groter strottenhoofd', 'strottenhoofd']];
    const LY = { kin: 360, strottenhoofd: 412, schouders: 494, spieren: 552 };
    J.forEach(([l, w]) => naamBij(ctx, l, w === 'strottenhoofd' ? 'lagere stem' : null, 640 - hS * 0.2 - 70, LY[w], on(w), 'right', C.teal));
    naamBij(ctx, 'borsten groeien', null, 1280 + hN * 0.2 + 24, 880 - hN * 0.69 + 10, on('borsten'), 'left', C.koraal);
    naamBij(ctx, 'bredere heupen', null, 1280 + hN * 0.2 + 24, 880 - hN * 0.5 + 10, on('heupen'), 'left', C.koraal);
    regel(ctx, 'iedereen', 960, 330, on('iedereen'), C.goud, 28, 'center', 800); naamBij(ctx, 'okselhaar en schaamhaar', null, 960, 470, on('oksels'), 'center', C.goud);
    if (gs > 0.01) { naamBij(ctx, 'groeispurt', null, 960, 560, gs, 'center', C.goud); pijl(ctx, 960, 640, 960, 590, C.goud, gs, 4, 14); }
    chip(ctx, 'geslachtsorganen gaan werken', 960, 720, C.text2, on('werken'), 24);
    chip(ctx, 'eerste zaadlozing', 960, 780, C.teal, on('zaadlozing'), 24); chip(ctx, 'eerste menstruatie', 960, 840, C.koraal, on('menstruatie'), 24); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verschillen', 1, 0.8), A = 1 - B;
    const v = (age, pk, ph) => { const pre = Math.max(0, 6.2 - 0.32 * (age - 6)); let s2 = pre + ph * Math.exp(-Math.pow((age - pk) / 1.05, 2)); if (age > pk) s2 *= Math.exp(-(age - pk) / 1.6); return s2; };
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const gx = 220, gy = 230, gw = 1000, gh = 460;
      grafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 12, xlab: 'leeftijd (jaar)', ylab: 'groei (cm per jaar)', f: (x) => v(x + 6, 11, 4.2), u: q.on('meisjes', 1, 1.5), xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: (x) => String(x + 6), col: C.koraal });
      grafiek(ctx, gx, gy, gw, gh, { a: q.on('jongens', 1), xmax: 12, ymax: 12, f: (x) => v(x + 6, 13, 4.6), u: q.on('jongens', 1, 1.5), col: C.teal });
      regel(ctx, 'meisjes', gx + 5 / 12 * gw - 20, gy + 70, q.on('meisjes', 1), C.koraal, 28, 'right', 800); regel(ctx, 'jongens', gx + 7 / 12 * gw + 24, gy + 50, q.on('jongens', 1), C.teal, 28, 'left', 800);
      chip(ctx, 'groeispurt: meisjes ± 2 jaar eerder', 720, 150, C.goud, q.on('groeispurt', 1), 26);
      const tw = q.on('twaalfde', 1); if (tw > 0.01) { ctx.save(); ctx.globalAlpha *= tw; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; const px = gx + 6 / 12 * gw; ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + gh); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); regel(ctx, '12 jaar', gx + 6 / 12 * gw, gy - 20, tw, C.goud, 24, 'center', 700); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 200, gw = 1050, ax = (a) => gx + (a - 6) / 12 * gw; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, 640); ctx.lineTo(gx + gw, 640); ctx.stroke(); for (let a = 6; a <= 18; a += 2) text(ctx, String(a), ax(a), 680, fTekst(24), C.text2, 'center'); metaText(ctx, 'leeftijd (jaar)', gx + gw, 720, C.grain, 'right', 20);
      regel(ctx, 'begin van de puberteit', gx, 300, 1, C.text2, 28, 'left', 700);
      roundRect(ctx, ax(8), 360, ax(13) - ax(8), 70, 35); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); regel(ctx, 'meisjes: 8 tot 13 jaar', (ax(8) + ax(13)) / 2, 406, 1, C.text, 26, 'center', 700);
      roundRect(ctx, ax(9), 470, ax(14) - ax(9), 70, 35); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); regel(ctx, 'jongens: 9 tot 14 jaar', (ax(9) + ax(14)) / 2, 516, 1, C.text, 26, 'center', 700);
      chip(ctx, 'vroeg is normaal', ax(9), 800, C.groen, q.on('Vroeg', 1), 26); chip(ctx, 'laat ook', ax(13.5), 800, C.groen, q.on('laat', 1), 26); ctx.restore(); }
    const sd = q.on('laat', 1, 0.8); persoon(ctx, 'daan', 1500, 880, 390 / 0.95, { uit: sd > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: 1, t, a: 0.35 + 0.65 * B }); persoon(ctx, 'sam', 1760, 880, 470 / 1.04, { uit: 'blij', pose: 'staan', kijk: -1, t, a: 0.35 + 0.65 * B });
    startlamp(ctx, 1500, 400, sd > 0.6 ? 1 : 0, B); startlamp(ctx, 1760, 320, 1, B); chip(ctx, 'gewoon later', 1500, 290, C.groen, sd, 26); },

  // ---------- vwo ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    circ(ctx, 760, 470, 320, rgba(HK.klier, 0.08), rgba(HK.klier, 0.6), 2); metaText(ctx, 'hypothalamus · vergroot', 760, 130, C.grain, 'center', 22);
    const kc = q.on('kisspeptine', 1), gc = q.on('GnRH', 1), rx = q.on('receptor', 1); const kp = ((t * 0.6) % 1);
    const eind = zenuwcel(ctx, 560, 380, { a: Math.max(0.25, kc), s: 0.95, col: HKLEUR.kiss, naar: [850, 470], seed: 2, puls: gc > 0.01 ? kp : -1, pulsCol: _mixHex(HKLEUR.kiss, '#FFFFFF', 0.4) });
    zenuwcel(ctx, 900, 510, { a: Math.max(0.25, gc), s: 0.95, col: HKLEUR.gnrh, naar: [950, 740], seed: 5, takken: 5 });
    naamBij(ctx, 'kisspeptinecel', null, 520, 500, kc, 'center'); naamBij(ctx, 'GnRH-cel', null, 1040, 540, gc, 'left');
    if (gc > 0.01 && eind) for (let i = 0; i < 5; i++) { const u = (t * 0.5 + i / 5) % 1; circ(ctx, lerp(eind[0] - 10, 880, u), lerp(eind[1] - 4, 500, u) + Math.sin(u * 7 + i) * 6, 5, rgba(HKLEUR.kiss, gc * (1 - 0.8 * rx))); }
    kruis(ctx, 872, 492, 24, rx); chip(ctx, 'receptor werkt niet: de puberteit begint niet vanzelf', 760, 860, C.koraal, rx, 24); },
  s13(ctx, t, q) { bg(ctx, 'schema'); const vw = q.on('Vetweefsel', 1), lp = q.on('leptine', 1), ts = q.on('toestemming', 1), wn = q.on('weinig', 1, 1.2);
    vetweefsel(ctx, 1460, 440, lerp(460, 260, wn), lerp(380, 220, wn), { t, d: lerp(100, 55, wn), seed: 7, a: Math.max(0.3, vw) }); naamBij(ctx, 'vetweefsel', 'vetcellen · vergroot', 1460, 680, vw, 'center');
    zenuwcel(ctx, 420, 430, { s: 0.95, col: HKLEUR.gnrh, naar: [470, 680], seed: 5, takken: 5 }); naamBij(ctx, 'GnRH-cel', null, 420, 330, 1, 'center');
    if (lp > 0.01) { regel(ctx, 'leptine', 960, 300, lp, HKLEUR.leptine, 30, 'center', 800); for (let i = 0; i < 7; i++) { if (wn > 0.5 && i % 3) continue; const u = (t * 0.3 + i / 7) % 1; circ(ctx, lerp(1220, 640, u), lerp(420, 430, u) + Math.sin(u * 9 + i) * 14, 8, rgba(HKLEUR.leptine, lp)); } }
    // slagboom: gaat alleen open met genoeg leptine (toestemming, geen startknop)
    if (ts > 0.01) { ctx.save(); ctx.globalAlpha *= ts; const open = ease(clamp((t - q.at('toestemming')) / 1.2, 0, 1)) * (1 - q.on('weinig', 1)); ctx.fillStyle = '#6B7287'; ctx.fillRect(612, 470, 16, 120); ctx.save(); ctx.translate(620, 480); ctx.rotate(-open * 1.3); roundRect(ctx, 0, -10, 230, 20, 8); shape(ctx, '#E6E1D3', C.koraal, 2); for (let k = 0; k < 4; k++) { ctx.fillStyle = C.koraal; ctx.fillRect(30 + k * 52, -10, 22, 20); } ctx.restore(); ctx.restore(); chip(ctx, 'geen startsein, wel toestemming', 760, 660, C.groen, ts * (1 - q.on('weinig', 1)), 24); }
    chip(ctx, 'veel leptine = genoeg energie opgeslagen', 960, 820, C.groen, q.on('genoeg', 1) * (1 - q.on('weinig', 1)), 24);
    chip(ctx, 'heel weinig lichaamsvet: eerste menstruatie later, of stopt', 960, 820, C.koraal, q.on('weinig', 1), 24); },
  s14(ctx, t, q) { bg(ctx, 'schema'); const P2 = [[1850, 16.5], [1880, 15.8], [1900, 15.2], [1920, 14.6], [1950, 13.7], [1965, 13.4], [1980, 13.3], [1997, 13.15], [2009, 13.05], [2020, 13.0]];
    const f = (x) => { const yr = 1850 + x; for (let i = 1; i < P2.length; i++) if (yr <= P2[i][0]) return lerp(P2[i - 1][1], P2[i][1], (yr - P2[i - 1][0]) / (P2[i][0] - P2[i - 1][0])) - 10; return 3; };
    grafiek(ctx, 360, 230, 1200, 460, { xmax: 170, ymax: 8, f, u: clamp((t - q.at('1850')) / Math.max(1, q.at('dertiende') - q.at('1850')), 0, 1), xticks: [0, 50, 100, 150], xfmt: (x) => String(1850 + x), yticks: [2, 4, 6], ylab: 'leeftijd eerste menstruatie', xlab: 'jaar', col: C.koraal, marks: [[0, '± 16–17 jaar', q.on('zestiende', 1)], [159, '± 13 jaar (Nederland)', q.on('dertiende', 1)]] });
    ctx.fillStyle = C.bgSchema; ctx.fillRect(250, 220, 100, 480); for (const v of [2, 4, 6]) text(ctx, String(10 + v), 342, 690 - v / 8 * 460 + 10, fTekst(28), C.text2, 'right');
    chip(ctx, 'betere voeding en gezondheid', 960, 820, C.groen, q.on('Voeding', 1), 26); },

  // ---------- H2 Van zaadbal tot penis ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const z = q.on('zaadballen', 1), bu = q.on('buisjes', 1), me = q.on('meiose', 1);
    const M = manDoorsnede(ctx, 780, 270, 2.5, { hl: { zaadbal: z * (0.6 + 0.4 * Math.sin(t * 3)) }, t, dim: ['darm'] });
    naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] - 10, M.naam.zaadbal[1] + 110, z, 'center'); naamBij(ctx, 'balzak', null, M.naam.zaadbal[0] - 150, M.naam.zaadbal[1] + 60, q.on('balzak', 1) * (1 - bu), 'right');
    const ko = q.on('koeler', 1) * (1 - bu); if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; roundRect(ctx, 1240, 220, 40, 260, 20); shape(ctx, '#E6E1D3', '#9AA3B2', 2); const lvl = lerp(0.8, 0.62, clamp((t - q.at('koeler')) / 1.5, 0, 1)); roundRect(ctx, 1250, 230 + 240 * (1 - lvl), 20, 240 * lvl, 10); shape(ctx, C.teal, null); circ(ctx, 1260, 500, 34, C.teal, '#9AA3B2', 2);
      regel(ctx, 'een paar graden koeler dan in de buik', 1320, 330, 1, C.text, 30, 'left', 700); regel(ctx, 'nodig om goed zaadcellen te maken', 1320, 380, q.on('nodig', 1), C.text2, 26, 'left', 600); ctx.restore(); }
    zoomNaast(ctx, M.naam.zaadbal[0], M.naam.zaadbal[1] - 10, 1480, 420, 260, bu, 'zaadbuisjes · vergroot', () => zaadbalWeefsel(ctx, 1480, 420, 560, 360, { t, productie: 1, sertoli: 0.3 }));
    meioseMini(ctx, 1480, 760, clamp((t - q.at('meiose')) / 2.4, 0, 1), me * (1 - q.on('honderd', 1)));
    const mi = q.on('honderd', 1); if (mi > 0.01) { ctx.save(); ctx.globalAlpha *= mi; const n = 100; regel(ctx, '± ' + n + ' 000 000 per dag', 1480, 780, 1, C.goud, 44, 'center', 800); ctx.restore(); }
    chip(ctx, 'vanaf de puberteit, tot op hoge leeftijd', 1480, 856, C.text2, q.on('leeftijd', 1), 24); schaalStreep(ctx, 80, 840, 5 * 35, '5 centimeter'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const bj = q.on('bijbal', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { hl: { zaadbal: 1 - bj, bijbal: bj }, t, dim: ['darm'] });
    const u = lerp(0, 0.075, ease(clamp((t - q.at('buisjes')) / 3, 0, 1))); const [zx, zy, za] = bioPunt(M.route, u); zaadVolg(ctx, zx, zy, q.on('zaadcel', 1)); metaText(ctx, 'ring = de gevolgde zaadcel (te klein om te zien)', 1450, 380, rgba(C.grain, q.on('zaadcel', 1)), 'center', 26);
    naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] + 70, M.naam.zaadbal[1] + 20, 1, 'left'); naamBij(ctx, 'bijbal', 'tegen de achterkant', M.naam.bijbal[0] - 50, M.naam.bijbal[1], bj, 'right');
    chip(ctx, 'rijpt ± 2 weken en wordt bewaard', 1400, 300, C.oker, q.on('rijpt', 1), 26); schaalStreep(ctx, 80, 840, 5 * 35, '5 centimeter'); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const on = (w, n = 1) => q.on(w, n);
    const stops = [['zaadlozing', 0.075], ['buikwand', 0.33], ['boog', 0.55], ['blaasjes', 0.68], ['prostaat', 0.78], ['urinebuis', 0.84]];
    let u = 0.075; for (let i = 0; i < stops.length; i++) { const t0 = q.at(stops[i][0]); if (t < t0) break; const from = i ? stops[i - 1][1] : 0.075; u = lerp(from, stops[i][1], ease((t - t0) / 2.4)); }
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm'], hl: { leider: on('zaadleider') * (1 - on('blaasjes')), lies: on('buikwand') * (1 - on('boog')), blaas: on('blaas') * (1 - on('gespierd')), blaasjes: on('blaasjes') * (1 - on('prostaat')), prostaat: on('prostaat') * (1 - on('urinebuis')), buis: on('urinebuis') } });
    const k = 35, [zx, zy, za] = bioPunt(M.route, u); const kn = on('knijpt');
    if (kn > 0.01) { const [wx, wy, wa] = bioPunt(M.route, Math.max(0.01, u - 0.022)); const pulse = 0.85 + 0.15 * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= kn; ctx.translate(wx, wy); ctx.rotate(wa); ctx.beginPath(); ctx.ellipse(0, 0, 0.9 * k, 0.48 * k * pulse, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), lighten(C.goud, 0.4), 2); ctx.restore(); chip(ctx, 'de wand knijpt de zaadcellen vooruit', 1460, 300, C.goud, kn * (1 - on('blaasjes')), 24); }
    zaadVolg(ctx, zx, zy, 1);
    const N = M.naam; const nb = (s1, p, dx, dy, a, al = 'left') => naamBij(ctx, s1, null, p[0] + dx, p[1] + dy, a, al);
    nb('zaadleider', N.leider, 70, 120, on('zaadleider')); nb('blaas', N.blaas, 0, 10, on('blaas'), 'center'); nb('zaadblaasje', N.blaasjes, -30, -30, on('blaasjes'), 'right'); nb('prostaat', N.prostaat, -70, 40, on('prostaat'), 'right'); nb('urinebuis', N.buis, 170, 90, on('urinebuis')); naamBij(ctx, 'urineleider', 'zaadleider kruist erover', N.ureter[0] - 30, N.ureter[1] + 30, on('boog') * (1 - on('prostaat')) * 0.8, 'right');
    schaalStreep(ctx, 80, 840, 5 * k, '5 centimeter'); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const kr = q.on('kringspier', 1), bu = q.on('urinebuis', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm', 'zaadbal', 'bijbal', 'leider', 'blaasjes'], hl: { buis: bu * (0.6 + 0.4 * Math.sin(t * 3)), blaas: q.on('Urine', 1) * (1 - kr) }, kring: kr });
    naamBij(ctx, 'urinebuis', null, M.naam.buis[0] + 170, M.naam.buis[1] + 90, bu, 'left'); naamBij(ctx, 'blaas', null, M.naam.blaas[0], M.naam.blaas[1] + 10, 1, 'center');
    const [kx, ky] = M.P(-3.4, 3.1); naamBij(ctx, 'kringspier', 'sluit de blaas af', kx - 60, ky + 20, kr, 'right');
    chip(ctx, 'urine en sperma: dezelfde buis, niet tegelijk', 1460, 300, C.teal, q.on('dezelfde', 1), 24); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const zw = q.on('zwellichamen', 1), vul = ease(clamp((t - q.at('bloed')) / 1.5, 0, 1));
    const M = manDoorsnede(ctx, 520, 250, 2.4, { t, zw: vul, dim: ['darm', 'blaas', 'blaasjes', 'prostaat', 'bot', 'zaadbal', 'bijbal', 'leider', 'balzak'] });
    const [cx, cy] = M.P(3.1, 10.0); ctx.save(); ctx.globalAlpha *= zw; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(cx - 60, cy); ctx.lineTo(cx + 60, cy); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    text(ctx, 'doorsnede hier', cx + 70, cy + 8, fTekst(22, 600), rgba(C.goud, zw), 'left');
    penisDoorsnede(ctx, 1360, 500, 150, { vul, a: zw }); naamBij(ctx, 'zwellichamen', null, 1360, 290, zw, 'center'); naamBij(ctx, 'urinebuis', null, 1360, 735, zw, 'center');
    chip(ctx, 'vol bloed: erectie', 1360, 160, MK.zwel, q.on('erectie', 1), 26); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('vocht', 1);
    const M = manDoorsnede(ctx, 840, 270, 2.5, { t, dim: ['darm'], hl: { zaadbal: k, blaasjes: k, prostaat: k } });
    const badge = (l, p) => { ctx.save(); ctx.globalAlpha *= k; circ(ctx, p[0], p[1], 26, C.goud); text(ctx, l, p[0], p[1] + 10, fTekst(30, 800), '#121A26', 'center'); ctx.restore(); };
    badge('a', M.P(1.0, 12.0)); badge('b', M.P(-6.7, 2.3)); badge('c', M.P(-3.4, 4.7));
    maatglas(ctx, 1400, 300, 200, 380, [0, 0, 0], q.on('Sperma', 1)); regel(ctx, 'sperma', 1500, 270, q.on('Sperma', 1), C.text, 30, 'center', 800); vraagteken(ctx, 1500, 500, q.on('vandaan', 1), 120); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const zb = q.on('zaadblaasjes', 1), pr = q.on('prostaat', 1), zc = q.on('procent', 1), al = q.on('alleen', 1);
    const M = manDoorsnede(ctx, 500, 300, 2.2, { t, dim: ['darm'], hl: { blaasjes: zb * (1 - pr), prostaat: pr * (1 - zc), zaadbal: al } });
    naamBij(ctx, 'zaadblaasje', null, M.naam.blaasjes[0] - 20, M.naam.blaasjes[1] - 30, zb, 'right'); naamBij(ctx, 'prostaat', null, M.naam.prostaat[0] - 50, M.naam.prostaat[1] + 40, pr, 'right'); naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] - 70, M.naam.zaadbal[1] + 20, al, 'right');
    const fz = (w) => ease(clamp((t - q.at(w)) / 1.4, 0, 1));
    maatglas(ctx, 1040, 260, 220, 460, [zc > 0.01 ? fz('procent') : 0, zb > 0.01 ? fz('zaadblaasjes') : 0, pr > 0.01 ? fz('prostaat') : 0]);
    regel(ctx, 'zaadblaasjes: ruim de helft', 1300, 560, zb, C.groen, 28, 'left', 800); regel(ctx, 'met suiker als brandstof', 1300, 600, q.on('suiker', 1), C.text2, 24, 'left', 600);
    regel(ctx, 'prostaat: kwart tot een derde', 1300, 360, pr, PROSTAAT, 28, 'left', 800); regel(ctx, 'helpt overleven en bewegen', 1300, 400, q.on('overleven', 1), C.text2, 24, 'left', 600);
    regel(ctx, 'zaadcellen: een paar procent', 1300, 710, zc, C.text, 26, 'left', 800);
    const mis = q.on('dus', 1); if (mis > 0.01) { tag(ctx, 'zaadcellen komen uit de prostaat', 1500, 180, C.koraal, mis * (1 - al), 'center', 26); kruis(ctx, 1250, 164, 24, mis * (1 - al)); }
    tag(ctx, 'zaadcellen: alleen uit de zaadballen', 1500, 180, C.groen, al, 'center', 28); },

  // ---------- H3 Eierstok en baarmoeder ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    const n = persoon(ctx, 'noor', 330, NAV.y, 720 / 0.97, { t }) || {}; const hp = n.heup || { x: 330, y: 560 };
    const zx = 1180, zy = 470, zr = 380; let V = null;
    zoomNaast(ctx, hp.x + 10, hp.y + 20, zx, zy, zr, Math.max(0.35, on('bekken')), 'in het bekken · vooraanzicht · vergroot', () => { V = vrouwOrganenVoor(ctx, zx - 50, zy + 120, 1.9, { t, hlEierstok: on('eierstok') * (1 - on('eileider')) }); });
    if (!V) V = vrouwOrganenVoor(ctx, zx - 50, zy + 120, 1.9, { a: 0 });
    const eo = V.eierstokR, eoL = V.eierstokL;
    naamBij(ctx, 'eierstok', null, eoL[0] - 10, eoL[1] + 70, on('eierstok'), 'center');
    chip(ctx, '± zo groot als een amandel', 1180, 185, VK.stok, on('amandel') * (1 - on('eileider')), 22);
    const tr = [eo[0] + 57 * 1.9, eo[1] - 12 * 1.9]; naamBij(ctx, 'eileider', 'trechter met franjes', eo[0] - 20, eo[1] - 160, on('eileider'), 'center');
    const ep = clamp((t - q.at('eisprong')) / 2.2, 0, 1); if (on('eisprong') > 0.01) { const ex = lerp(eo[0] + 20, tr[0], ease(ep)), ey = lerp(eo[1], tr[1], ease(ep)); eicelEcht(ctx, ex, ey, 9, on('eisprong'), true); }
    chip(ctx, 'hier kan een eicel bevrucht worden', 1180, 185, VK.leider, on('bevrucht'), 24); },
  s24(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1); const f2 = (a, b) => on(a) * (1 - on(b));
    const n = persoon(ctx, 'noor', 330, NAV.y, 720 / 0.97, { t }) || {}; const hp = n.heup || { x: 330, y: 560 };
    const zx = 1180, zy = 470, zr = 380;
    zoomCircle(ctx, zx, zy, zr, hp.x + 10, hp.y + 20, 'in het bekken · vooraanzicht · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr); vrouwOrganenVoor(ctx, zx, zy + 170, 2.6, { t, hlBaarmoeder: f2('baarmoeder', 'binnenkant') }); });
    const V = vrouwOrganenVoor(ctx, zx, zy + 170, 2.6, { a: 0 }); const bm = V.baarmoeder;
    naamBij(ctx, 'baarmoeder', 'holle spier', bm.x + bm.rx + 24, bm.y + bm.ry * 0.7, on('baarmoeder'), 'left');
    chip(ctx, '± zo groot als een peer', 1180, 185, VK.wand, f2('peer', 'nestelen'), 24);
    naamBij(ctx, 'baarmoederslijmvlies', null, bm.x, bm.y - bm.ry * 0.15, on('baarmoederslijmvlies'), 'center'); chip(ctx, 'hier kan een embryo zich nestelen', 1180, 185, VK.slijm, on('nestelen'), 24);
    naamBij(ctx, 'baarmoederhals', null, V.cervix[0] + 60, V.cervix[1] - 20, on('baarmoederhals'), 'left'); naamBij(ctx, 'vagina', null, V.cervix[0] + 60, V.cervix[1] + 70, on('vagina'), 'left'); },
  s25(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    persoon(ctx, 'noor', 420, NAV.y, 720 / 0.97, { t });
    paneel(ctx, 1000, 140, 760, 740, ''); metaText(ctx, 'buitenkant · vooraanzicht · schema', 1380, 190, C.grain, 'center', 22);
    const S = vulvaSchema(ctx, 1380, 560, 1.3, { hl: { lip: on('schaamlippen'), cli: on('clitoris'), buis: on('opening'), vag: on('vagina') } });
    naamBij(ctx, 'schaamlippen', null, S.groot[0] - 40, S.groot[1] + 10, on('schaamlippen'), 'right'); naamBij(ctx, 'clitoris', null, S.cli[0] + 100, S.cli[1] + 10, on('clitoris'), 'left');
    naamBij(ctx, 'opening urinebuis', null, S.buis[0] + 100, S.buis[1] + 10, on('opening'), 'left'); naamBij(ctx, 'vagina', null, S.vag[0] + 100, S.vag[1] + 10, on('vagina'), 'left'); },
  s26(ctx, t, q) { bg(ctx, 'schema');
    eierstokDoorsnede(ctx, 760, 470, 380, 250, { groei: 0.2, t }); naamBij(ctx, 'eierstok', 'vergroot', 760, 790, 1, 'center');
    persoon(ctx, 'noor', 1560, 880, 500 / 0.97, { uit: 'denkt', pose: 'denk', kijk: -1, t, a: q.on('meisje', 1) }); vraagteken(ctx, 1700, 360, q.on('eicellen', 1), 110); },

  s28(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('driehonderdduizend', 1, 1), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; eierstokDoorsnede(ctx, 760, 470, 380, 250, { groei: 0.2, t }); chip(ctx, 'al aangelegd vóór de geboorte', 760, 140, C.goud, q.on('aangelegd', 1), 26); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const x0 = 200, y0 = 190, n = 560;
      if (!SCENES._telvlak) { const c = document.createElement('canvas'); c.width = n; c.height = n; const g = c.getContext('2d'); const id = g.createImageData(n, n); for (let i = 0; i < n * n; i++) { const v = 150 + 40 * hash(i * 0.37); id.data[i * 4] = v + 40; id.data[i * 4 + 1] = v + 20; id.data[i * 4 + 2] = v - 10; id.data[i * 4 + 3] = hash(i * 1.7) > 0.5 ? 200 : 120; } g.putImageData(id, 0, 0); SCENES._telvlak = c; }
      ctx.drawImage(SCENES._telvlak, x0, y0); text(ctx, 'zo’n 300 000 eicellen', x0 + n / 2, y0 - 30, fTekst(34, 700), C.text, 'center');
      const vh = q.on('vierhonderd', 1); for (let i = 0; i < 400; i++) { const px = x0 + hash(i * 3.1) * n, py = y0 + hash(i * 5.7) * n; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = rgba(C.goud, vh); ctx.fill(); }
      metaText(ctx, 'elk stipje is één eicel', x0 + n / 2, y0 + n + 40, C.grain, 'center', 20);
      regel(ctx, 'nieuw erbij: 0', 1180, 340, q.on('Nieuwe', 1), C.koraal, 36, 'left', 800);
      regel(ctx, 'per cyclus rijpt een groepje, meestal haalt er één de eisprong', 1180, 430, q.on('groepje', 1), C.text2, 24, 'left', 700);
      if (vh > 0.01) { text(ctx, 'ongeveer 400', 1180, 540, fTitel(70), rgba(C.goud, vh), 'left'); regel(ctx, 'halen in een heel leven een eisprong', 1180, 590, vh, C.text, 28, 'left', 600); }
      const mn = q.on('mannen', 1); if (mn > 0.01) { ctx.save(); ctx.globalAlpha *= mn; paneel(ctx, 1180, 660, 560, 160, ''); ctx.beginPath(); ctx.ellipse(1260, 740, 30, 40, 0.2, 0, 6.283); shape(ctx, rgba(MK.zaadbal, 0.75), lighten(MK.zaadbal, 0.3), 2); regel(ctx, 'man: steeds nieuwe zaadcellen', 1310, 752, 1, C.text, 28, 'left', 700); ctx.restore(); }
      ctx.restore(); } },

  s29(ctx, t, q) { bg(ctx, 'schema'); const on = (w) => q.on(w, 1);
    const dag = lerp(1, 14, ease(clamp((t - q.at('rijpen')) / Math.max(1, q.at('eisprong') - q.at('rijpen') + 1.5), 0, 1)));
    const HP = hypofysePoort(ctx, 260, 330, 0.42, { aan: on('hypofyse'), uit: on('FSH'), t }); naamBij(ctx, 'hypofyse', 'voorkwab', HP.voor[0] - 90, HP.voor[1] + 120, 1, 'center'); naamBij(ctx, 'hypothalamus', null, 260, 160, 0.8, 'center');
    const D1 = [[430, 490], [560, 510], [700, 470]]; bloedbaan(ctx, D1, t, ['fsh', 'lh'], on('FSH'), 5); text(ctx, 'FSH', 530, 600, fTekst(26, 700), rgba(HKLEUR.fsh, on('FSH')), 'right'); text(ctx, 'en', 565, 600, fTekst(26, 700), rgba(C.text, on('FSH')), 'center'); text(ctx, 'LH', 600, 600, fTekst(26, 700), rgba(HKLEUR.lh, on('FSH')), 'left');
    const eis = on('eisprong') * clamp((t - q.at('eisprong')) / 2, 0, 1); eileiderStuk(ctx, 960, 420, on('eisprong'));
    const E = eierstokDoorsnede(ctx, 960, 420, 210, 140, { groei: lerp(0.2, 0.95, (dag - 1) / 13), eis: 0, t, winnaar: 3 }); text(ctx, 'eierstok', 960, 240, fTekst(28, 700), C.text, 'center');
    if (eis > 0.01) { const e = ease(eis); eicelEcht(ctx, lerp(1150, 1185, e), lerp(390, 245, e), 14, 1 - clamp((eis - 0.85) / 0.15, 0, 1) * 0.6, true); }
    const D2 = [[1190, 500], [1290, 530], [1400, 500]]; bloedbaan(ctx, D2, t, ['oestro'], on('dikker'), 5); text(ctx, 'hormonen van de eierstok', 1300, 600, fTekst(24, 700), rgba(HORM.oestro[0], on('dikker')), 'center');
    baarmoederwand(ctx, 1440, 290, 420, 380, slijmDikte(dag), { t, kronkel: 0.2, a: Math.max(0.35, on('baarmoeder')) }); text(ctx, 'baarmoederslijmvlies', 1650, 250, fTekst(28, 700), C.text, 'center');
    const rm = on('remt'); if (rm > 0.01) { ctx.save(); ctx.globalAlpha *= rm; ctx.strokeStyle = HKLEUR.oestro; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(830, 320); ctx.bezierCurveTo(760, 200, 560, 200, HP.voor[0] + 40, HP.voor[1] - 20); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); { const [vx, vy] = [HP.voor[0] + 40, HP.voor[1] - 20]; ctx.moveTo(vx - 14, vy - 14); ctx.lineTo(vx + 14, vy + 14); } ctx.lineWidth = 7; ctx.stroke(); ctx.restore(); text(ctx, 'veel oestrogeen remt de hypofyse weer', 640, 150, fTekst(26, 700), rgba(HKLEUR.oestro, rm), 'center'); }
    cyclusKlok(ctx, 960, 740, 85, dag, { fasen: 0, a: on('cyclus') }); text(ctx, 'dag ' + Math.floor(dag), 1065, 755, fTekst(26, 700), rgba(C.text, on('cyclus')), 'left');
    chip(ctx, 'eisprong: de eicel gaat de eileider in', 1500, 780, C.goud, on('eisprong'), 24); },

  s30(ctx, t, q) { bg(ctx, 'schema'); const bf = q.on('bevrucht', 1), me = q.on('menstruatie', 1);
    const los = ease(clamp((t - q.at('menstruatie')) / 2, 0, 1));
    const L = baarmoederwand(ctx, 900, 380, 900, 300, slijmDikte(26) / 0.92, { los, kronkel: 1, t });
    metaText(ctx, 'baarmoederwand · uitsnede · vergroot', 450, 200, C.grain, 'left', 20);
    naamBij(ctx, 'slijmvlies', null, 430, (L.oppervlak + L.basaal) / 2 + 8, 1, 'right');
    chip(ctx, 'niet bevrucht: slijmvlies laat ± 2 weken na de eisprong los', 960, 160, C.teal, bf * (1 - me), 24);
    tag(ctx, 'menstruatie', 1620, 360, VK.slijm, me, 'center', 30);
    const ni = q.on('naar', 1); if (ni > 0.01) { chip(ctx, 'slijmvlies met wat bloed', 1620, 470, VK.slijm, ni, 24); tag(ctx, 'de eicel', 1620, 560, C.koraal, ni, 'center', 24); kruis(ctx, 1530, 544, 20, ni); }
    chip(ctx, 'eerste jaren: vaak onregelmatig, en dat is normaal', 960, 820, C.groen, q.on('onregelmatig', 1), 24); },

  // ---------- Recap ----------
  s31(ctx, t, q) { bg(ctx, 'schema'); const sk = q.on('secundaire', 1);
    paneel(ctx, 120, 160, 820, 640, 'startsein', 1); if (1) { ctx.save(); hypofysePoort(ctx, 400, 420, 0.42, { puls: (t * 0.4) % 1, aan: q.on('FSH', 1), uit: q.on('FSH', 1), t });
      const D = [[560, 500], [700, 560], [820, 700]]; bloedbaan(ctx, D, t, ['fsh', 'lh'], q.on('FSH', 1), 5, (t * 0.15) % 1);
      regel(ctx, 'hypothalamus → GnRH → hypofyse → FSH en LH', 530, 760, 1, C.text, 24, 'center', 700); ctx.restore(); }
    paneel(ctx, 980, 160, 820, 640, 'kenmerken', sk); if (sk > 0.01) { ctx.save(); ctx.globalAlpha *= sk; persoon(ctx, 'sam', 1250, 740, 460, { uit: 'blij', t }); persoon(ctx, 'noor', 1530, 740, 450, { uit: 'blij', t, kijk: -1 }); regel(ctx, 'testosteron', 1366, 252, 1, HKLEUR.testo, 26, 'right', 700); regel(ctx, 'en', 1390, 252, 1, C.text, 26, 'center', 700); regel(ctx, 'oestrogeen', 1414, 252, 1, HKLEUR.oestro, 26, 'left', 700); ctx.restore(); }
    tag(ctx, 'wanneer het begint, verschilt veel tussen mensen', 960, 860, C.goud, q.on('verschilt', 1), 'center', 28); },
  s32(ctx, t, q) { bg(ctx, 'schema'); const ec = q.on('Eicellen', 1), d = 0, A = 1; // 29 okt 2026: slotzin met de klas geknipt (castnaam in de stem)
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      paneel(ctx, 120, 160, 820, 640, 'zaadcel', 1); if (1) { ctx.save(); ctx.save(); ctx.beginPath(); ctx.rect(122, 222, 816, 520); ctx.clip(); const M = manDoorsnede(ctx, 560, 330, 1.25, { t, dim: ['darm'], hl: { blaasjes: q.on('vocht', 1), prostaat: q.on('vocht', 1) } }); ctx.save(); ctx.globalAlpha *= 0.8; lijnStrip(ctx, M.route, C.goud, 3); ctx.restore(); ctx.restore(); regel(ctx, 'vocht: zaadblaasjes en prostaat', 530, 770, q.on('vocht', 1), C.text, 24, 'center', 700); ctx.restore(); }
      paneel(ctx, 980, 160, 820, 640, 'eicellen', ec); if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec; eierstokDoorsnede(ctx, 1390, 430, 260, 170, { groei: 0.2, t }); regel(ctx, 'voorraad al vóór de geboorte', 1390, 690, 1, C.goud, 26, 'center', 700); regel(ctx, 'geen nieuwe erbij', 1390, 740, q.on('geen', 1), C.koraal, 26, 'center', 700); ctx.restore(); }
      ctx.restore(); }
  },
});
