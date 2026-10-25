// Keyframes fase 1 · Geslachtsorganen en puberteit 2.0 (storyboard, ronde 1). Eén functie per keyframe.
function koptekst(ctx, s, sub) { text(ctx, s, 70, 92, fTekst(40, 700), C.text, 'left'); if (sub) metaText(ctx, sub, 70, 132, C.grain, 'left', 22); }
function meta(ctx, s, x = 70, y = 1040) { metaText(ctx, s, x, y, C.text2, 'left', 24); }
function lijnStrip(ctx, P, col, lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function samZij(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ zij: true, kijk: 1, t, uit: 'neutraal' }, o)); }

const KF = {
 // K1 · s03 — doorlopende zoom: Sam van opzij → röntgenblik in het hoofd → hypothalamus. Tussenstand van de zoom.
 'k1-zoom-hoofd'(ctx, t) { bg(ctx, 'schema');
  const z = 2.6; ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-760, -330); // camera zoomt in op het hoofd
  const p = samZij(ctx, 760, 1180, 900, t);
  const hd = p.hoofd; _vbVenster(ctx, hd.x + hd.r * 0.1, hd.y, hd.r * 1.25, hd.r * 1.15, 0.8);
  const s = hd.r * 2.25 / 470; hoofdHersenen(ctx, hd.x + hd.r * 0.12, hd.y + hd.r * 0.22, s, { hth: 1, hyp: 0.4, t, a: 0.95 });
  ctx.restore();
  const hx = 960 + (hd.x + hd.r * 0.12 - 760) * z, hy = 540 + (hd.y + hd.r * 0.22 - 330) * z;
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, hy, 70, 0, 6.283); ctx.stroke(); // zoomdoel
  naamBij(ctx, 'hypothalamus', 'een klein deel van je hersenen', 1420, hy - 150, 1, 'left');
  schaalStreep(ctx, 80, 960, 0.1 * 470 * s * z / 2, '1 centimeter'); meta(ctx, 'ZOOM · LEERLING → HERSENEN → HYPOTHALAMUS (één doorlopende beweging)', 80, 1050); },

 // K2 · s04 — stoten GnRH: links de echte plek (poortaders in het steeltje), rechts de stoten die er tegelijk bij komen, steeds vaker.
 'k2-stoten-gnrh'(ctx, t) { bg(ctx, 'schema');
  hypofysePoort(ctx, 520, 520, 0.92, { puls: 0.42, aan: 0.3, uit: 0.15, t });
  naamBij(ctx, 'hypothalamus', null, 140, 230, 1, 'left'); naamBij(ctx, 'GnRH', 'een stoot', 620, 640, 1, 'left', C.goud); naamBij(ctx, 'hypofyse', null, 760, 860, 1, 'left');
  const gx = 1080, gy = 280, gw = 760, gh = 380; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
  for (const v of [0, 4, 8, 12, 16]) text(ctx, String(v), gx + v / 16 * gw, gy + gh + 36, fTekst(24), C.text2, 'center');
  metaText(ctx, 'leeftijd (jaar)', gx + gw, gy + gh + 74, C.grain, 'right', 20); metaText(ctx, 'stoten GnRH (schets)', gx, gy - 16, C.grain, 'left', 20);
  ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(gx + 8 / 16 * gw, gy, 6 / 16 * gw, gh); text(ctx, 'start: ergens tussen 8 en 14', gx + 11 / 16 * gw, gy + 32, fTekst(22, 700), C.goud, 'center');
  const tot = 13; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh);
  for (let k = 0; k < 1600; k++) { const age = k / 100; if (age > tot) break; const f = age < 8 ? 0.5 : lerp(0.5, 2.6, (age - 8) / 6); const hgt = age < 8 ? 0.1 : lerp(0.1, 0.85, clamp((age - 8) / 6, 0, 1)); const ph = (age * f * 2) % 1; const v = ph < 0.2 ? Math.sin(ph / 0.2 * Math.PI) * hgt : 0; ctx.lineTo(gx + age / 16 * gw, gy + gh - v * (gh - 50)); }
  ctx.stroke(); const nx = gx + tot / 16 * gw; ctx.beginPath(); ctx.arc(nx, gy + gh - 0.78 * (gh - 50), 10, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill();
  text(ctx, 'deze stoot', nx + 18, gy + gh - 0.78 * (gh - 50) - 16, fTekst(22, 700), C.goud, 'left');
  schaalStreep(ctx, 80, 960, 45, '1 millimeter'); meta(ctx, 'ELKE STOOT IN DE GRAFIEK = EEN WOLKJE GNRH DAT JE LINKS DOOR HET STEELTJE ZIET GAAN', 80, 1050); },

 // T1 · s05 — hypofyse met poortaders: GnRH komt aan in de voorkwab, de cellen maken FSH en LH, één LH-deeltje (goud omlijnd) gaat het bloed in.
 't1-hypofyse-poort'(ctx, t) { bg(ctx, 'schema');
  const R = hypofysePoort(ctx, 760, 470, 1.15, { puls: 0.98, aan: 1, uit: 1, t, volgLH: 0.55 });
  naamBij(ctx, 'hypothalamus', null, 290, 150, 1, 'left'); naamBij(ctx, 'steeltje', null, 640, 570, 1, 'right');
  naamBij(ctx, 'hypofyse', 'klier ter grootte van een erwt', 1150, 800, 1, 'left');
  naamBij(ctx, 'FSH', null, 1300, 600, 1, 'left', HORM.fsh[0]); naamBij(ctx, 'LH', null, 1300, 650, 1, 'left', HORM.lh[0]);
  hormDeeltje(ctx, 1280, 590, 'fsh', 10); hormDeeltje(ctx, 1280, 640, 'lh', 10);
  schaalStreep(ctx, 80, 960, 59, '1 millimeter'); meta(ctx, 'GNRH VIA KLEINE BLOEDVAATJES IN HET STEELTJE · VOORKWAB MAAKT FSH EN LH · ÉÉN LH-DEELTJE GEVOLGD', 80, 1050); },

 // T2 · s06 — FSH en LH reizen met het bloed door het hele lichaam; kijkje bij Sam (zijaanzicht, organen op hun echte plek) en Noor (buikKijkje).
 't2-kijkje-sam-noor'(ctx, t) { bg(ctx, 'schema');
  const yb = 1000, h = 820; const p = samZij(ctx, 560, yb, h, t);
  const hd = p.hoofd; _vbVenster(ctx, hd.x + hd.r * 0.1, hd.y, hd.r * 1.2, hd.r * 1.1, 0.7);
  const sH = hd.r * 2.25 / 470; const H = hoofdHersenen(ctx, hd.x + hd.r * 0.12, hd.y + hd.r * 0.22, sH, { hth: 0.6, hyp: 1, t });
  // bekkenkijkje: mediane doorsnede op echte maat (lengte Sam ± 1,75 m → px per cm)
  const pxcm = h * 1.04 / 175, sM = pxcm / 14; const hx = p.heup.x, hy = p.heup.y;
  _vbVenster(ctx, hx + 6 * pxcm, hy + 8 * pxcm, 13 * pxcm, 14 * pxcm, 0.75);
  const M = manDoorsnede(ctx, hx + 9 * pxcm, hy - 2 * pxcm, sM, { dim: ['darm', 'blaas', 'bot', 'penis', 'balzak'], hl: { zaadbal: 1 }, t });
  // bloedbaan hoofd → romp → zaadbal (vereenvoudigd: hals, grote slagader, liesslagader)
  const baan = bioDicht([H.hyp, [hd.x - hd.r * 0.1, hd.y + hd.r * 1.6], [hx + 2 * pxcm, hy - 30 * pxcm], [hx + 4 * pxcm, hy - 4 * pxcm], M.naam.zaadbal], 20);
  ctx.save(); ctx.globalAlpha = 0.55; lijnStrip(ctx, baan, BIO.bloed, 7); ctx.restore();
  for (let i = 0; i < 9; i++) { const [px, py] = bioPunt(baan, (i / 9 + t * 0.05) % 1); hormDeeltje(ctx, px, py, i % 2 ? 'lh' : 'fsh', 7); }
  const [vx, vy] = bioPunt(baan, 0.83); hormDeeltje(ctx, vx, vy, 'lh', 8, 1, true);
  naamBij(ctx, 'zaadbal', null, M.naam.zaadbal[0] + 36, M.naam.zaadbal[1] + 12, 1, 'left');
  // Noor van voren met kijkje in de buik
  const n = persoon(ctx, 'noor', 1380, yb, 800, { t, uit: 'neutraal' }); const V = buikKijkje(ctx, 'noor', 1380, yb, 800, 0, { t, hlEierstok: 1 });
  const hk = hoofdKijkje(ctx, n.hoofd, { hyp: 1, t });
  const baan2 = bioDicht([hk.hyp, [1380, n.hoofd.y + 150], [1395, 560], V.eierstokR], 20); ctx.save(); ctx.globalAlpha = 0.55; lijnStrip(ctx, baan2, BIO.bloed, 6); ctx.restore();
  for (let i = 0; i < 7; i++) { const [px, py] = bioPunt(baan2, (i / 7 + t * 0.05) % 1); hormDeeltje(ctx, px, py, i % 2 ? 'lh' : 'fsh', 6); }
  naamBij(ctx, 'eierstok', null, V.eierstokR[0] + 40, V.eierstokR[1] + 50, 1, 'left');
  text(ctx, 'FSH en LH reizen met het bloed door je hele lichaam', 960, 90, fTekst(36, 700), C.text, 'center');
  meta(ctx, 'ORGANEN OP HUN ECHTE PLEK EN MAAT · ALLEEN INWENDIGE ORGANEN IN HET KIJKJE · GOUD = HET GEVOLGDE LH-DEELTJE', 80, 1050); },

 // K3 · s06 (slot) — het gevolgde LH-deeltje komt aan; in de zaadbal maken cellen tussen de buisjes testosteron, in de eierstok groeit een follikel die oestrogeen maakt.
 'k3-zaadbal-eierstok'(ctx, t) { bg(ctx, 'micro'); ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
  const Z = zaadbalWeefsel(ctx, 500, 450, 860, 560, { t, leydig: 1, testo: 1, sertoli: 0.5, productie: 1 });
  hormDeeltje(ctx, Z.leydig[0] - 40, Z.leydig[1] - 70, 'lh', 10, 1, true);
  naamBij(ctx, 'zaadbuisje', 'hier rijpen zaadcellen', Z.buisjes[0][0] - 40, Z.buisjes[0][1] + Z.buisjes[0][2] + 50, 1, 'left');
  naamBij(ctx, 'testosteron', null, Z.leydig[0] + 50, Z.leydig[1] + 10, 1, 'left', HORM.testo[0]);
  ctx.save(); ctx.beginPath(); ctx.rect(990, 170, 860, 560); ctx.clip(); ctx.fillStyle = '#16202E'; ctx.fillRect(990, 170, 860, 560);
  const E = eierstokDoorsnede(ctx, 1420, 450, 380, 250, { groei: 0.75, t, winnaar: 3 }); ctx.restore();
  if (E) { for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283 + t * 0.2, rr = 90 + 50 * hash(i); hormDeeltje(ctx, E.x + Math.cos(an) * rr, E.y + Math.sin(an) * rr * 0.8, 'oestro', 7); }
    hormDeeltje(ctx, E.x - 120, E.y - 110, 'fsh', 10, 1, true); naamBij(ctx, 'follikel met eicel', null, E.x - 10, E.y - 150, 1, 'center'); naamBij(ctx, 'oestrogeen', null, E.x - 60, E.y + 150, 1, 'center', HORM.oestro[0]); }
  text(ctx, 'zaadbal', 500, 140, fTekst(32, 700), C.text, 'center'); text(ctx, 'eierstok', 1420, 140, fTekst(32, 700), C.text, 'center');
  schaalStreep(ctx, 80, 800, 100, '0,1 millimeter'); schaalStreep(ctx, 1000, 800, 76, '1 millimeter');
  meta(ctx, 'LH/FSH KOMEN AAN · DE CELLEN GAAN ZELF HORMONEN MAKEN (VORM PER HORMOON, STEROÏDEN PAARS)', 80, 1050); },

 // T3 · s14 — mannelijke organen op schaal, zaadcel volgt de echte route; de wand van de zaadleider knijpt hem vooruit (golf).
 't3-man-doorsnede'(ctx, t) { bg(ctx, 'schema');
  const s = 3.0, M = manDoorsnede(ctx, 1080, 300, s, { hl: { leider: 0.6 }, t, dim: ['darm'] }); const k = 14 * s;
  // peristaltische golf: verdikking van de wand achter de zaadcel
  const u = 0.315, D = M.route; const [zx, zy, za] = bioPunt(D, u); const [wx, wy] = bioPunt(D, u - 0.025);
  ctx.save(); ctx.translate(wx, wy); ctx.rotate(bioPunt(D, u - 0.025)[2]); ctx.beginPath(); ctx.ellipse(0, 0, 0.9 * k, 0.48 * k, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.85), lighten(C.goud, 0.4), 2); ctx.restore();
  zaadcelEcht(ctx, zx, zy, za, t, 1.8, { a: 1 }); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(zx, zy, 44, 0, 6.283); ctx.stroke();
  const N = M.naam; const nb = (s1, p, dx, dy, al = 'left', col) => naamBij(ctx, s1, null, p[0] + dx, p[1] + dy, 1, al, col);
  nb('zaadbal', N.zaadbal, -10, 110, 'center'); nb('bijbal', N.bijbal, -40, 10, 'right'); nb('zaadleider', N.leider, 70, 120); nb('blaas', N.blaas, 0, 10, 'center');
  nb('zaadblaasje', N.blaasjes, -30, -30, 'right'); nb('prostaat', N.prostaat, -70, 40, 'right'); nb('urinebuis', N.buis, 170, 90, 'left'); nb('schaambeen', N.schaambeen, 20, -150, 'left');
  nb('endeldarm', N.darm, -30, 0, 'right', C.text2);
  text(ctx, 'de wand knijpt', zx + 150, zy - 30, fTekst(26, 700), C.goud, 'left'); text(ctx, 'de zaadcel vooruit', zx + 150, zy + 2, fTekst(26, 700), C.goud, 'left');
  schaalStreep(ctx, 80, 960, 5 * k, '5 centimeter'); meta(ctx, 'MEDIANE DOORSNEDE OP SCHAAL · BUIK RECHTS · ZAADLEIDER IN EEN BOOG NAAR DE ACHTERKANT VAN DE BLAAS', 80, 1050); },

 // T4 · s16 — zwellichamen: dwarsdoorsnede in rust en vol bloed (vlak schema, zakelijk).
 't4-zwellichamen'(ctx, t) { bg(ctx, 'schema');
  const M = manDoorsnede(ctx, 520, 250, 2.4, { t, zw: 0.2, dim: ['darm', 'blaas', 'blaasjes', 'prostaat', 'bot', 'zaadbal', 'bijbal', 'leider', 'balzak'] });
  const [cx, cy] = M.P(3.1, 10.0); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(cx - 60, cy); ctx.lineTo(cx + 60, cy); ctx.stroke(); ctx.setLineDash([]);
  text(ctx, 'doorsnede hier', cx + 70, cy + 8, fTekst(22, 600), C.goud, 'left');
  const A = penisDoorsnede(ctx, 1140, 520, 130, { vul: 0 }), B = penisDoorsnede(ctx, 1600, 520, 130, { vul: 1 });
  text(ctx, 'in rust', 1140, 300, fTekst(30, 700), C.text, 'center'); text(ctx, 'vol bloed: erectie', 1600, 300, fTekst(30, 700), C.text, 'center');
  naamBij(ctx, 'zwellichamen', null, 1370, 420, 1, 'center'); naamBij(ctx, 'urinebuis', null, 1370, 740, 1, 'center');
  meta(ctx, 'ALLEEN ALS DWARSDOORSNEDE · HOLTEN LOPEN VOL BLOED, HET VLIES SPANT (MORPH IN 1,5 S)', 80, 1050); },

 // T5 · s21 — buitenkant: vlak vooraanzicht naast het kijkje in Noors buik.
 't5-buitenkant'(ctx, t) { bg(ctx, 'schema');
  const n = persoon(ctx, 'noor', 480, 1000, 820, { t }); const V = buikKijkje(ctx, 'noor', 480, 1000, 820, 0, { t, hlBaarmoeder: 0.5 });
  naamBij(ctx, 'baarmoeder', null, V.baarmoeder.x + 90, V.baarmoeder.y - 10, 1, 'left'); naamBij(ctx, 'vagina', null, V.cervix[0] + 40, V.cervix[1] + 50, 1, 'left');
  paneel(ctx, 1080, 150, 700, 800, ''); metaText(ctx, 'buitenkant · vooraanzicht · schema', 1430, 200, C.grain, 'center', 22);
  const S = vulvaSchema(ctx, 1430, 580, 1.25, { hl: { cli: 0.6, buis: 0.6, vag: 0.6 } });
  naamBij(ctx, 'clitoris', null, S.cli[0] + 60, S.cli[1] + 10, 1, 'left'); naamBij(ctx, 'opening urinebuis', null, S.buis[0] + 60, S.buis[1] + 10, 1, 'left');
  naamBij(ctx, 'vagina', null, S.vag[0] + 60, S.vag[1] + 10, 1, 'left'); naamBij(ctx, 'schaamlippen', null, S.groot[0] - 30, S.groot[1] + 10, 1, 'right');
  meta(ctx, 'LINKS: ORGANEN OP HUN ECHTE PLEK (BIBLIOTHEEK) · RECHTS: NIEUW VLAK SCHEMA, LOS VAN HET PERSONAGE', 80, 1050); },

 // K4 · s23 — schaal voelbaar: zo'n 300 000 eicellen als vlak van stipjes, de ± 400 die ooit een eisprong halen in goud.
 'k4-eicelvoorraad'(ctx, t) { bg(ctx, 'schema');
  const x0 = 260, y0 = 170, n = 548; const id = ctx.createImageData(n, n); for (let i = 0; i < n * n; i++) { const v = 150 + 40 * hash(i * 0.37); id.data[i * 4] = v + 40; id.data[i * 4 + 1] = v + 20; id.data[i * 4 + 2] = v - 10; id.data[i * 4 + 3] = hash(i * 1.7) > 0.5 ? 200 : 120; }
  ctx.putImageData(id, x0, y0);
  for (let i = 0; i < 400; i++) { const px = x0 + hash(i * 3.1) * n, py = y0 + hash(i * 5.7) * n; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); }
  text(ctx, 'zo’n 300 000 eicellen', x0 + n / 2, y0 - 30, fTekst(34, 700), C.text, 'center');
  text(ctx, 'ongeveer 400', 1180, 420, fTitel(70), C.goud, 'left'); text(ctx, 'halen ooit een eisprong', 1180, 470, fTekst(32, 600), C.text, 'left');
  text(ctx, 'nieuw erbij: 0', 1180, 600, fTekst(34, 700), C.koraal, 'left');
  eicelEcht(ctx, 1600, 760, 26, 1, true); metaText(ctx, 'één eicel (vergroot)', 1600, 840, C.grain, 'center', 20);
  meta(ctx, 'ELK STIPJE IS ÉÉN EICEL · DE GOUDEN STIPJES (± 400) ZIJN VERGROOT OM ZICHTBAAR TE ZIJN', 80, 1050); },

 // K5 · s24 — de hypofyse stuurt de eierstok, de eierstok stuurt de baarmoeder: keten met echte tekeningen, dag 10 van de cyclus.
 'k5-cyclus-keten'(ctx, t) { bg(ctx, 'schema');
  hypofysePoort(ctx, 260, 330, 0.42, { aan: 1, uit: 1, t });
  text(ctx, 'hypofyse', 260, 120, fTekst(28, 700), C.text, 'center');
  const D1 = bioDicht([[430, 520], [560, 540], [700, 500]], 12); ctx.save(); ctx.globalAlpha = 0.7; lijnStrip(ctx, D1, BIO.bloed, 8); ctx.restore();
  for (let i = 0; i < 5; i++) { const [px, py] = bioPunt(D1, (i / 5 + t * 0.1) % 1); hormDeeltje(ctx, px, py, i % 2 ? 'lh' : 'fsh', 8); }
  text(ctx, 'FSH en LH', 565, 600, fTekst(26, 700), C.teal, 'center');
  const E = eierstokDoorsnede(ctx, 960, 450, 210, 140, { groei: 0.6, t, winnaar: 3 }); text(ctx, 'eierstok', 960, 260, fTekst(28, 700), C.text, 'center');
  const D2 = bioDicht([[1190, 470], [1290, 500], [1400, 470]], 12); ctx.save(); ctx.globalAlpha = 0.7; lijnStrip(ctx, D2, BIO.bloed, 8); ctx.restore();
  for (let i = 0; i < 5; i++) { const [px, py] = bioPunt(D2, (i / 5 + t * 0.1) % 1); hormDeeltje(ctx, px, py, 'oestro', 8); }
  text(ctx, 'hormonen van de eierstok', 1300, 570, fTekst(24, 700), HORM.oestro[0], 'center');
  baarmoederwand(ctx, 1440, 290, 420, 380, slijmDikte(10), { t, kronkel: 0.2 }); text(ctx, 'baarmoederslijmvlies', 1650, 250, fTekst(28, 700), C.text, 'center');
  cyclusKlok(ctx, 960, 800, 110, 10, { fasen: 0 }); text(ctx, 'nu: dag 10', 1180, 860, fTekst(26, 700), C.text, 'left');
  meta(ctx, 'DEZELFDE HYPOFYSE ALS IN HOOFDSTUK 1 · GEEN TERUGKOPPELING (DIE ZIT IN VAN BEVRUCHTING TOT BABY)', 80, 1050); },

 // T6 · alternatief bij K5: met één remlijn (terugkoppeling) — ter keuze voor Kamiel.
 't6-keten-met-rem'(ctx, t) { KF['k5-cyclus-keten'](ctx, t);
  ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 1000, W, 80);
  ctx.save(); ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(960, 230); ctx.bezierCurveTo(900, 90, 450, 70, 330, 150); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(318, 140); ctx.lineTo(346, 140); ctx.lineWidth = 7; ctx.stroke(); ctx.restore();
  text(ctx, 'veel oestrogeen remt de hypofyse', 650, 60, fTekst(26, 700), C.paars, 'center');
  meta(ctx, 'ALTERNATIEF: ÉÉN ZIN EN ÉÉN REMLIJN OVER TERUGKOPPELING (OOK VOOR HAVO, DIE FILM 1 NIET ZIEN)', 80, 1050); },
};
