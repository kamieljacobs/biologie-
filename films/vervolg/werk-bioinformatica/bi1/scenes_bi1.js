// Wat word jij? · Bio-informatica · Zoeken in DNA: databanken, BLAST en een beetje Python — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam 16, meeloopweek, outfit gewoon; Dr. Kim, onderzoeker bio-informatica, outfit gewoon);
// reeksobject 'scherm met code / sequenties' (teken_bi1.js); Micro alleen binnen de zoomcirkel in H2 (twee DNA-strengen bij het gat).
// Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

const SX = 100, SW = 1720; // breedte van het grote scherm
function samLoopt(ctx, t, x0, x1, t0, o = {}) { const h = 430, v = gangSnelheid('sam', h, 'loop'), dur = Math.abs(x1 - x0) / v, kijk = x1 > x0 ? 1 : -1;
  if (t < t0) return null;
  if (t < t0 + dur) return persoon(ctx, 'sam', x0, FLOOR, h, { zij: true, kijk, gang: 'loop', t: t - t0, vooruit: true });
  return sam(ctx, x1, t, o); }
function barcodeRijen(ctx, B, o = {}) { const { s = 1, per = 30, rijen = 3, zicht = Infinity, start = 0, a = 1, letters = true, dy = 92 } = o; const dx = (44 + 6) * s;
  for (let r = 0; r < rijen; r++) { const z = clamp(zicht - r * per, 0, per); if (z <= 0) break;
    sequentieRij(ctx, B.x + 22 * s + 10, B.y + 40 * s + r * dy * s, SUSHI.slice(start + r * per, start + (r + 1) * per), { s, zicht: z, a, letters }); } }
function wisselTekst(t, a, b, tw, d = 0.4) { return t < tw ? [a, 1 - ramp(t, tw - d, d)] : [b, ramp(t, tw, d)]; }
// de twee oefenstukjes, rij 1 met een gat dat openschuift (g = 0..1)
function oefenRijen(ctx, x0, y, g, o = {}) { const s = o.s || 1.1, dx = (44 + 6) * s, h = 52 * s, y2 = y + h + 40 * s, a = o.a == null ? 1 : o.a;
  if (g >= 0.999) return uitlijning(ctx, x0, y, OEF1G, OEF2, Object.assign({ s, namen: ['stukje 1', 'stukje 2'], a }, o));
  if (g <= 0.001) return uitlijning(ctx, x0, y, OEF1, OEF2, Object.assign({ s, namen: ['stukje 1', 'stukje 2'], a, klopt: 0 }, o));
  ctx.save(); ctx.globalAlpha *= a;
  sequentieRij(ctx, x0, y, 'ACCT', { s }); sequentieRij(ctx, x0 + 4 * dx, y, '-', { s, a: ease(g) }); sequentieRij(ctx, x0 + (4 + ease(g)) * dx, y, 'AGGACTTCAGTA', { s });
  sequentieRij(ctx, x0, y2, OEF2, { s }); metaText(ctx, 'stukje 1', x0 - dx * 0.5 - 18, y + 10, C.text2, 'right', 28); metaText(ctx, 'stukje 2', x0 - dx * 0.5 - 18, y2 + 10, C.text2, 'right', 28);
  ctx.restore(); return null; }

Object.assign(SCENES, {
  title(ctx, t) {
    codeScherm(ctx, 1080, 170, 740, 420, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => barcodeRijen(ctx, B, { s: 0.84, per: 15, rijen: 4, zicht: 15 * 4 }) });
    sushiGroot(ctx, 1450, 760, 0.62, {});
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const BU = bureau(ctx, 860, FLOOR, { w: 560 });
    sushiBakje(ctx, 1010, BU.top - 2, 1.4, { hl: q.on('bakje', 1) });
    const N = q.on('Kim', 2, 0.3), bk = clamp((t - q.at('Kim', 2)) / 1.6, 0, 1);
    if (N > 0.01) { buisje(ctx, lerp(1060, 1110, ease(bk)), BU.top - 4 - 30 * Math.sin(Math.PI * ease(bk)), 1.4, { a: N, nr: '017' }); }
    tag(ctx, 'stukje naar het lab', 1180, BU.top - 130, C.teal, q.on('onderzoeken', 1), 'center', 28);
    kim(ctx, 1400, t, { pose: q.on('bakje', 1) > 0.5 && t < q.at('Kim', 2) ? 'wijs' : 'staan' });
    naamBij(ctx, 'Dr. Kim', 'onderzoeker bio-informatica', 1400, 370, q.on('Kim', 1), 'center');
    const S = samLoopt(ctx, t, -120, 420, 0, { pose: 'staan', uit: 'blij' });
    naamBij(ctx, 'Sam', 'meeloopweek bio-informatica', 420, 352, q.on('week', 1), 'center');
    // het etiket van dichtbij (gisteren, bij de lunch)
    const L = q.on('sushi', 1);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; roundRect(ctx, 660, 110, 500, 290, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5); metaText(ctx, 'gisteren · lunch', 910, 156, C.grain, 'center', 26);
      sushiGroot(ctx, 910, 296, 0.92, { hl: q.on('blauwvintonijn', 1) }); ctx.restore(); }
  },
  s02(ctx, t, q) { bg(ctx, 'schema');
    const z = 30 + clamp(t / 1.8, 0, 1) * 60;
    codeScherm(ctx, SX, 150, SW, 560, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => { barcodeRijen(ctx, B, { s: 1, per: 30, rijen: 4, zicht: z + 30 * ramp(t, q.at('Ongeveer'), 1) });
        const fx = B.x + B.w - 40; ctx.save(); ctx.globalCompositeOperation = 'source-over'; ctx.restore(); } });
    const n = Math.round(lerp(0, 650, ramp(t, q.at('zeshonderdvijftig'), 1.0)));
    metaA(ctx, n > 0 ? `${n >= 650 ? 'ongeveer ' : ''}${n} letters` : '', SX + SW, 770, 1, C.grain, 'right', 30);
    metaA(ctx, '… loopt verder: 4 van ± 22 rijen', SX, 770, q.on('Ongeveer', 1), C.text2, 'left', 28);
  },
  s03(ctx, t, q) { bg(ctx, 'schema');
    dim(ctx, () => { codeScherm(ctx, SX, 150, SW, 560, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => barcodeRijen(ctx, B, { s: 1, per: 30, rijen: 4, zicht: 120 }) }); metaA(ctx, 'ongeveer 650 letters', SX + SW, 770, 1, C.grain, 'right', 30); }, 0.35);
    visIcoon(ctx, 860, 815, 1.15, { col: '#7A8698', buik: '#AEB6C2' });
    vraagteken(ctx, 1080, 860, 1, 130);
  },

  // ---------- H1 Databanken ----------
  s05(ctx, t, q) { bg(ctx, 'schema');
    const SQ = q.on('sequentie', 1), BC = q.on('DNA-barcode', 1);
    codeScherm(ctx, SX, 140, SW, 300, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => {
      const xs = sequentieRij(ctx, B.x + 70, B.y + 70, SUSHI.slice(0, 30), { s: 1, hl: () => q.on('vergelijken', 1) * 0.9 });
      metaA(ctx, 'stuk van één gen in de mitochondriën', B.x + 48, B.y + 160, q.on('mitochondriën', 1), C.grain, 'left', 28);
      metaA(ctx, 'volgorde van basen', B.x + B.w - 20, B.y + 160, SQ, C.grain, 'right', 28); } });
    tag(ctx, 'sequentie', 1500, 128, C.paars, SQ, 'center', 34);
    // drie diergroepen met elk een eigen barcode
    const D = q.on('dieren', 1), V = q.on('verschilt', 1);
    const dier = [[420, (x, y, a) => visIcoon(ctx, x, y, 1.05, { a }), 101], [960, (x, y, a) => vogelIcoon(ctx, x, y, 1.15, { a }), 202], [1500, (x, y, a) => keverIcoon(ctx, x, y, 1.2, { a }), 303]];
    dier.forEach(([x, fn, sd], i) => { const a = clamp(D * 1.6 - i * 0.3, 0, 1); fn(x, 610, a); streepjes(ctx, x - 150, 720, 300, 54, sd, { a: a * V, n: 30 });
      metaA(ctx, ['vis', 'vogel', 'kever'][i], x, 830, a, C.text2, 'center', 28);
      vraagteken(ctx, x + 190, 760, q.on('vergelijken', 1) * a, 64); });
    tag(ctx, 'DNA-barcode', 960, 512, C.goud, BC, 'center', 40);
    metaA(ctx, 'sequencen: zie de film DNA lezen', SX + SW, 512, q.on('lezen', 2) * (1 - BC * 0) * 0.9, C.text2, 'right', 26);
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    codeScherm(ctx, SX, 150, 1100, 300, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => sequentieRij(ctx, B.x + 50, B.y + 80, SUSHI.slice(0, 19), { s: 1 }) });
    tag(ctx, 'DNA-barcode', 650, 520, C.goud, 1, 'center', 36);
    vraagteken(ctx, 650, 760, q.on('Waar', 1, 0.4), 150);
    sam(ctx, 1380, t, { pose: 'denk', uit: 'verbaasd', kijk: 1 }); naamBij(ctx, 'Sam', '', 1380, 370, 1, 'center');
    kim(ctx, 1680, t, {}); naamBij(ctx, 'Dr. Kim', '', 1680, 380, 1, 'center');
  },
  s08(ctx, t, q) { bg(ctx, 'schema'); bi1Antwoord(ctx, 'antwoord a: in openbare databanken');
    const DB = [[480, 'Amerika', 'GenBank', 'Amerika'], [960, 'Europa', 'ENA', 'Europa'], [1440, 'Japan', 'DDBJ', 'Japan']], Y = 440;
    // sequenties van onderzoekers stromen naar binnen (de hele alinea, rustig)
    for (let i = 0; i < 9; i++) { const ph = (t * 0.22 + i / 9) % 1, d = DB[i % 3], an = hash(i * 3.1) * 6.283, R = 520;
      const sx = d[0] + Math.cos(an) * R, sy = Y + Math.sin(an) * R * 0.6, x = lerp(sx, d[0], ease(ph)), y = lerp(sy, Y - 20, ease(ph));
      if (y > 840 || y < 200) continue; streepjes(ctx, x - 36, y - 8, 72, 16, 40 + i, { a: Math.sin(Math.PI * ph) * 0.85 * (1 - q.on('miljarden', 1) * 0.6), n: 12 }); }
    DB.forEach(([x, nm, kort, w], i) => { databank(ctx, x, Y, 1, { vul: 0.4 + 0.6 * ramp(t, 0, 20) });
      naamBij(ctx, nm, kort, x, 590, q.on(w, 1), 'center'); });
    // dagelijkse uitwisseling
    const P = q.on('delen', 1);
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; ctx.strokeStyle = C.teal; ctx.fillStyle = C.teal; ctx.lineWidth = 3;
      for (const [x1, x2] of [[560, 880], [1040, 1360]]) { ctx.beginPath(); ctx.moveTo(x1, 400); ctx.quadraticCurveTo((x1 + x2) / 2, 340, x2, 400); ctx.stroke(); pijl(ctx, x2 - 20, 392, x2, 400, C.teal, 1, 3, 14); pijl(ctx, x1 + 20, 392, x1, 400, C.teal, 1, 3, 14); }
      const k = (t * 0.8) % 1; for (const [x1, x2] of [[560, 880], [1040, 1360]]) { const u = k, bx = (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * (x1 + x2) / 2 + u * u * x2, by = (1 - u) * (1 - u) * 400 + 2 * (1 - u) * u * 340 + u * u * 400; circ(ctx, bx, by, 7, C.teal, null); }
      ctx.restore(); }
    klokje(ctx, 960, 250, 34, (t * 0.15) % 1, q.on('dag', 1)); metaA(ctx, 'elke dag', 1010, 262, q.on('dag', 1), C.teal, 'left', 28);
    text(ctx, '', 0, 0, fTekst(10), C.text);
    regel(ctx, 'miljarden sequenties', 960, 720, q.on('miljarden', 1), C.text, 52, 'center', 700);
    metaA(ctx, 'van meer dan een half miljoen soorten', 960, 772, q.on('half', 1), C.grain, 'center', 30);
    tag(ctx, 'iedereen mag erin zoeken · gratis', 960, 846, C.groen, q.on('Iedereen', 1), 'center', 30);
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    const S = q.on('soort', 1), G = q.on('gen', 1), L = q.on('las', 1), Z = q.on('Dus', 1);
    codeScherm(ctx, SX, 150, SW, 400, [], { tab: 'databank · één regel', inhoud: (B) => {
      const rij = (y, k, v, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, k, B.x + 30, y, C.text2, 'left', 28); text(ctx, v, B.x + 290, y, fTekst(40, 600), C.text, 'left'); ctx.restore(); };
      rij(B.y + 60, 'soort', 'Gadus morhua · kabeljauw', S); rij(B.y + 120, 'gen', 'COI (stuk van één gen in de mitochondriën)', G); rij(B.y + 180, 'gelezen door', 'een onderzoekslab, met datum', L);
      sequentieRij(ctx, B.x + 52, B.y + 262, bi1Seq(30, 77), { s: 1, hl: () => q.on('meest', 1) * 0.9 }); } });
    // de eigen sequentie eronder, om mee te vergelijken
    if (Z > 0.01) { naamBij(ctx, 'jouw sequentie', 'de sushi', SX, 640, Z, 'left');
      sequentieRij(ctx, SX + 52 + 22, 740, SUSHI.slice(0, 30), { s: 1, a: Z }); }
    metaA(ctx, 'lijkt het meest?', SX + SW, 640, q.on('meest', 1), C.goud, 'right', 30);
  },

  // ---------- H2 Uitlijnen ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    const x0 = 380, t1 = q.at('letter', 1), t2 = q.at('gelijk', 1), t3 = q.at('Daarna', 1), t4 = q.at('meer', 1);
    const kol = t < t1 ? 0 : t < t2 ? 4 * clamp((t - t1) / (t2 - t1), 0, 1) : t < t3 ? 4 : lerp(4, 17, (t - t3) / Math.max(0.5, t4 - t3));
    codeScherm(ctx, SX, 150, 1340, 440, [], { tab: 'uitlijnen · oefenvoorbeeld', inhoud: () => oefenRijen(ctx, x0, 320, 0, { kol, streep: 1 }) });
    metaA(ctx, 'oefenvoorbeeld · geen echte vis', SX, 640, 1, C.text2, 'left', 28);
    kim(ctx, 1580, t, { pose: t < q.at('Sam', 1) ? 'wijs' : 'staan' }); naamBij(ctx, 'Dr. Kim', '', 1580, 382, 1, 'center');
    sam(ctx, 1790, t, { kijk: -1, pose: t > q.at('legt', 1) ? 'wijs' : 'staan' }); naamBij(ctx, 'Sam', '', 1790, 360, 1, 'center');
  },
  s11(ctx, t, q) { bg(ctx, 'schema');
    codeScherm(ctx, SX, 150, 1340, 440, [], { tab: 'uitlijnen · oefenvoorbeeld', inhoud: () => oefenRijen(ctx, 380, 320, 0, { kol: 17 }) });
    vraagteken(ctx, 770, 790, q.on('Wat', 1, 0.4), 140);
    kim(ctx, 1580, t, {}); sam(ctx, 1790, t, { kijk: -1, pose: 'denk', uit: 'verbaasd' });
  },
  s13(ctx, t, q) { bg(ctx, 'schema'); bi1Antwoord(ctx, 'antwoord b: er mist één letter');
    const x0 = 420, s = 1.1, dx = 55, Z = q.on('ontbreekt', 1, 0.6) * (1 - q.on('verschoven', 1, 0.6)), g = q.on('gat', 1, 1.0), K = q.on('weer', 1), U = q.on('uitlijnen', 1);
    const dimS = 1 - 0.65 * Z;
    ctx.save(); ctx.globalAlpha *= dimS;
    codeScherm(ctx, SX, 190, SW, 430, [], { tab: 'uitlijnen · oefenvoorbeeld', inhoud: () => {
      oefenRijen(ctx, x0, 330, g, { kol: 17, klopt: K, streep: g >= 0.999 ? 1 : 0 });
      if (g < 0.999) { const R = q.on('ontbreekt', 1); if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; roundRect(ctx, x0 + 3.5 * dx - 4, 290, 10, 160, 4); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); } }
      const GH = q.on('gaten', 1); if (GH > 0.01 && g >= 0.999) { ctx.save(); ctx.globalAlpha *= GH; roundRect(ctx, x0 + 4 * dx - 30, 296, 60, 68, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } } });
    ctx.restore();
    // Micro: twee aparte dubbele strengen; in stukje 1 verdwijnt één heel basenpaar en schuift de rest op
    if (Z > 0.01) { const D = q.on('deletie', 1, 1.2), SH = clamp((t - q.at('deletie', 1) - 0.8) / 1.4, 0, 1);
      zoomCircle(ctx, 1400, 610, 240, x0 + 4 * dx, 360, '', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 360, 500, 500);
        metaText(ctx, 'stukje 1', 1400, 458, C.text2, 'center', 26); metaText(ctx, 'stukje 2', 1400, 628, C.text2, 'center', 26);
        dubbeleStreng(ctx, 1248, 478, 'ACCTCAGGA', { dx: 38, gap: 110, weg: 4, wegA: D, schuif: ease(SH) });
        dubbeleStreng(ctx, 1248, 648, 'ACCTCAGGA', { dx: 38, gap: 110 });
        metaText(ctx, 'DNA · vergroot', 1400, 812, C.grain, 'center', 24); });
      tag(ctx, 'echte deletie of leesfout', 560, 760, C.koraal, q.on('deletie', 1) * Z, 'center', 30); }
    tag(ctx, 'gat', x0 + 4 * dx, 270, C.goud, g * (1 - U), 'center', 30);
    tag(ctx, 'uitlijnen', 960, 712, C.goud, U, 'center', 40);
    if (U > 0.01) haak(ctx, x0 - 30, x0 + 16 * dx + 30, 548, '', C.groen, q.on('zoveel', 1));
    regel(ctx, 'zoveel mogelijk gelijke letters onder elkaar', 960, 790, q.on('zoveel', 1), C.groen, 36, 'center', 600);
    regel(ctx, 'gaten waar een stukje ontbreekt of extra is', 960, 846, q.on('gaten', 1), C.goud, 32, 'center', 600);
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const x0 = 420, P = q.on('plus', 1), M = q.on('andere', 1), G = q.on('gat', 1), H = q.at('Hier', 1);
    const sk = t < q.at('plus', 1) ? 0 : lerp(0, 17, (t - q.at('plus', 1)) / Math.max(1, H - q.at('plus', 1)));
    codeScherm(ctx, SX, 150, SW, 470, [], { tab: 'uitlijnen · oefenvoorbeeld', inhoud: (B) => {
      oefenRijen(ctx, x0, 290, 1, { kol: 17, klopt: 1, score: q.on('score', 1), scoreKol: sk });
      const lg = [['+1 gelijk', C.groen, P], ['−1 anders', C.koraal, M], ['−1 gat', C.koraal, G]];
      lg.forEach(([s2, c, a], i) => metaA(ctx, s2, B.x + 30 + i * 260, B.y + 26, a, c, 'left', 30)); } });
    // de som, regel voor regel
    const st = [['15', q.at('Vijftien', 1)], [' − 1', q.at('min', 3)], [' − 1', q.at('min', 4)], [' = 13', q.at('dertien', 1)]];
    let x = 640; ctx.save(); ctx.font = fTekst(60, 700); const tot = st.map(s => s[0]).join(''); const w0 = ctx.measureText(tot).width; x = 700 - w0 / 2; ctx.restore();
    st.forEach(([s2, tt], i) => { const a = ramp(t, tt, 0.4); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, 740, fTekst(60, 700), i === 3 ? C.groen : C.text, 'left'); ctx.restore(); } ctx.font = fTekst(60, 700); x += ctx.measureText(s2).width; });
    metaA(ctx, '15 gelijk · 1 anders · 1 gat', 700, 800, q.on('Hier', 1), C.text2, 'center', 28);
    // hetzelfde paar zonder gat, klein
    const Z = q.on('Zonder', 1);
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; uitlijning(ctx, 1250, 690, OEF1, OEF2, { s: 0.6, tussen: 22, streep: 1 }); metaA(ctx, 'zonder gat: 6 gelijk, 10 anders', 1500, 650, 1, C.text2, 'center', 26);
      text(ctx, '= −4', 1780, 760, fTekst(48, 700), C.koraal, 'left'); ctx.restore(); }
  },
  s15(ctx, t, q) { bg(ctx, 'schema');
    dim(ctx, () => codeScherm(ctx, SX, 150, SW, 380, [], { tab: 'uitlijnen · oefenvoorbeeld', inhoud: () => oefenRijen(ctx, 420, 290, 1, { kol: 17, klopt: 1 }) }), 0.35);
    text(ctx, '13', 560, 700, fTitel(120), C.groen, 'center');
    haak(ctx, 460, 660, 728, 'hoe hoger, hoe beter', C.groen, q.on('hoger', 1, 0.5) || 1);
    tag(ctx, "echte programma's: andere punten", 1300, 600, C.teal, q.on("programma's", 1), 'center', 32);
    metaA(ctx, 'BLAST voor DNA bijvoorbeeld +5 en −4', 1300, 660, q.on('punten', 1), C.text2, 'center', 26);
    const CP = q.on('computer', 1); computerIcoon(ctx, 1300, 790, 0.9, CP);
    if (CP > 0.01) { for (let i = 0; i < 3; i++) metaA(ctx, String(Math.floor(hash(Math.floor(t * 12) + i * 7) * 40) - 8), 1440 + i * 70, 760 + (i % 2) * 34, CP * 0.8, C.groen, 'left', 28); metaA(ctx, 'razendsnel', 1440, 840, q.on('razendsnel', 1), C.grain, 'left', 28); }
  },

  // ---------- H3 BLAST ----------
  s16(ctx, t, q) { bg(ctx, 'schema');
    codeScherm(ctx, SX, 170, 700, 330, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => barcodeRijen(ctx, B, { s: 0.5, per: 24, rijen: 5, zicht: 120, letters: false, dy: 96 }) });
    const M = q.on('miljarden', 1); stapel(ctx, 900, 840, 640, { n: 50, top: 170, scroll: t * lerp(30, 180, M) });
    naamBij(ctx, 'databank', 'miljarden sequenties', 1220, 118, q.on('databank', 1), 'center');
    tag(ctx, 'zoekprogramma BLAST', 450, 600, C.goud, q.on('BLAST', 1), 'center', 36);
    metaA(ctx, 'vaak al na korte tijd', 450, 670, q.on('tijd', 1), C.text2, 'center', 28);
    sam(ctx, 1730, t, { kijk: -1, pose: 'denk', uit: 'verbaasd' }); naamBij(ctx, 'Sam', '', 1730, 360, 1, 'center');
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    codeScherm(ctx, SX, 170, 700, 330, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => barcodeRijen(ctx, B, { s: 0.5, per: 24, rijen: 5, zicht: 120, letters: false, dy: 96 }) });
    stapel(ctx, 900, 840, 640, { n: 50, top: 170, scroll: 3.5 * 180 + t * 180 });
    naamBij(ctx, 'databank', 'miljarden sequenties', 1220, 118, 1, 'center');
    tag(ctx, 'zoekprogramma BLAST', 450, 600, C.goud, 1, 'center', 36);
    vraagteken(ctx, 450, 800, q.on('Hoe', 1, 0.4), 130);
    sam(ctx, 1730, t, { kijk: -1, pose: 'denk', uit: 'verbaasd' });
  },
  s19(ctx, t, q) { bg(ctx, 'schema'); bi1Antwoord(ctx, 'antwoord c: eerst korte stukjes');
    const tB = q.at('Alleen', 1), A = 1 - ramp(t, tB - 0.2, 0.6), Bv = ramp(t, tB, 0.6);
    const LI = new Set([4, 13, 22]), Lv = q.on('voorkomt', 1), Dm = q.on('toevallig', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      codeScherm(ctx, SX, 190, 700, 600, [], { tab: 'barcode_sushi.fasta', inhoud: (B) => { const s = 0.42, dx = 21;
        for (let r = 0; r < 5; r++) { const y = B.y + 40 + r * 96; sequentieRij(ctx, B.x + 20, y, SUSHI.slice(r * 28, r * 28 + 28), { s, letters: false });
          const k = clamp((t - q.at('woordjes', 1)) * 2.2 - r * 0.6, 0, 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, B.x + 20 - 14, y - 18, 28 * dx + 8, 36, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } }
        metaA(ctx, '…', B.x + 20, B.y + 520, 1, C.text2, 'left', 28); } });
      metaA(ctx, 'woordjes van 28 letters', SX + 350, 840, q.on('achtentwintig', 1), C.goud, 'center', 28);
      stapel(ctx, 900, 840, 640, { n: 50, top: 170, scroll: 0, licht: (k) => LI.has(k) ? Lv : 0, dimRest: Dm });
      metaA(ctx, 'bijna nooit toevallig', 1220, 150, Dm, C.grain, 'center', 28);
      tag(ctx, 'woordje past', 1620, 840 - 4 * 22 - 2, C.goud, Lv, 'left', 26);
      ctx.restore(); }
    // uitbreiden vanuit het woordje, naar links en rechts zolang de score goed blijft
    if (Bv > 0.01) { ctx.save(); ctx.globalAlpha *= Bv;
      const Q = SUSHI.slice(200, 252), Dc = Q.split(''); [0, 1, 2, 3, 48, 49, 50, 51].forEach(i => { Dc[i] = { A: 'G', T: 'C', C: 'A', G: 'T' }[Q[i]]; }); Dc[7] = { A: 'C', T: 'G', C: 'T', G: 'A' }[Q[7]]; Dc[45] = { A: 'T', T: 'A', C: 'G', G: 'C' }[Q[45]]; const Db = Dc.join('');
      const e = clamp((t - q.at('verder', 1)) / Math.max(1, q.at('blijft', 1) - q.at('verder', 1)), 0, 1), L = Math.round(lerp(12, 3.6, e)), R = Math.round(lerp(39, 48.4, e));
      const s = 0.56, dx = (44 + 6) * s, x0 = 980 - 25.5 * dx, y1 = 360;
      const inR = (i) => i >= L && i <= R; const al = (i) => inR(i) ? 1 : 0.35;
      metaText(ctx, 'sushi', x0 - 30, y1 + 10, C.text2, 'right', 26); metaText(ctx, 'databank', x0 - 30, y1 + 100 + 10, C.text2, 'right', 26);
      uitlijning(ctx, x0, y1, Q, Db, { s, tussen: 68, letters: false, alpha1: al, alpha2: al, kol: 99, streep: 1, klopt: 1 });
      // alleen binnen het bereik streepjes/verschillen laten zien: buiten het bereik dekken we de streepjes af met de dim
      ctx.save(); ctx.fillStyle = rgba(C.bgSchema, 0.7); ctx.fillRect(x0 - dx / 2 - 4, y1 + 18, (L) * dx, 64); ctx.fillRect(x0 + (R + 0.5) * dx, y1 + 18, (51 - R) * dx + 4, 64); ctx.restore();
      roundRect(ctx, x0 + 12 * dx - dx / 2 - 6, y1 - 30, 28 * dx + 12, 160, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke();
      metaA(ctx, 'woordje: 28 letters precies gelijk', 960, y1 - 50, 1, C.goud, 'center', 26);
      let sc = 0; for (let i = L; i <= R; i++) sc += Q[i] === Db[i] ? 1 : -1;
      pijl(ctx, x0 + 12 * dx - 30, y1 + 200, x0 + L * dx - 10, y1 + 200, C.groen, q.on('links', 1), 3, 14); pijl(ctx, x0 + 39 * dx + 30, y1 + 200, x0 + R * dx + 10, y1 + 200, C.groen, q.on('rechts', 1), 3, 14);
      regel(ctx, `score ${sc}`, 960, 640, q.on('verder', 1), C.groen, 44, 'center', 700);
      metaA(ctx, 'hier stopt het: de letters passen niet meer', 960, 700, q.on('blijft', 1), C.koraal, 'center', 26);
      ctx.restore(); }
  },
  s20(ctx, t, q) { bg(ctx, 'schema');
    const RJ = [{ soort: 'geelvintonijn', gelijk: '100 %', toeval: 'bijna 0', best: true }, { soort: 'grootoogtonijn', gelijk: '99 %', toeval: 'bijna 0' }, { soort: 'blauwvintonijn', gelijk: '98 %', toeval: 'bijna 0' }];
    const T = q.on('toeval', 1), PG = q.on('procent', 1), BV = q.on('Bovenaan', 1);
    codeScherm(ctx, SX, 150, 1260, 500, [], { tab: 'BLAST · resultaten', inhoud: (B) => { resultatenLijst(ctx, B.x + 70, B.y + 70, 1080, RJ, { kolHl: PG > 0.5 ? 'gelijk' : 'toeval', kolA: PG > 0.5 ? PG * (1 - BV) : T * (1 - PG), haak: BV }); } });
    metaA(ctx, 'voorbeeld', SX + 1260 - 24, 188, 1, C.grain, 'right', 26);
    tag(ctx, 'toeval bijna nul: zeker tonijn', 520, 730, C.teal, q.on('tonijn', 1), 'center', 30);
    tag(ctx, 'welke tonijn: procent gelijk', 1000, 820, C.goud, PG, 'center', 30);
    metaA(ctx, 'tonijnsoorten: maar weinig letters verschil', SX + 630, 610, q.on('Tonijnsoorten', 1), C.text2, 'center', 26);
    const G = q.on('Geelvin', 2, 0.3);
    sam(ctx, 1620, t, { kijk: -1, pose: G > 0.5 ? 'wijsOmhoog' : 'staan', uit: G > 0.5 ? 'blij' : 'neutraal' }); naamBij(ctx, 'Sam', '', 1620, 360, 1 - G, 'center');
    bubbel(ctx, 1500, 300, 'Geelvin!', '#F2F2EE', G, 34);
  },
  s21(ctx, t, q) { bg(ctx, 'schema');
    const RJ = [{ soort: 'geelvintonijn', gelijk: '100 %', toeval: 'bijna 0', best: true }, { soort: 'grootoogtonijn', gelijk: '99 %', toeval: 'bijna 0' }, { soort: 'blauwvintonijn', gelijk: '98 %', toeval: 'bijna 0' }];
    dim(ctx, () => codeScherm(ctx, SX, 150, 1100, 500, [], { tab: 'BLAST · resultaten', inhoud: (B) => resultatenLijst(ctx, B.x + 50, B.y + 70, 960, RJ, { haak: 1 }) }), 0.35);
    sam(ctx, 1330, t, { kijk: 1, pose: 'wijsOmhoog', uit: 'blij' }); naamBij(ctx, 'Sam', '', 1330, 360, 1, 'center');
    kim(ctx, 1660, t, { pose: 'wijsOmhoog' }); naamBij(ctx, 'Dr. Kim', '', 1660, 372, 1, 'center');
    vraagteken(ctx, 640, 780, q.on('klaar', 1, 0.4), 140);
  },
  s23(ctx, t, q) { bg(ctx, 'schema'); bi1Antwoord(ctx, 'antwoord b: de databank kan een fout bevatten');
    const VN = q.on('verkeerde', 1), MT = q.on('meerdere', 1), BT = q.on('betrouwbare', 1), TW = q.on('tweede', 1);
    codeScherm(ctx, SX, 190, 1150, 280, [], { tab: 'databank · één regel', inhoud: (B) => {
      metaText(ctx, 'soort', B.x + 30, B.y + 56, C.text2, 'left', 28); text(ctx, 'grootoogtonijn', B.x + 200, B.y + 56, fTekst(40, 600), C.text, 'left');
      if (VN > 0.01) { ctx.save(); ctx.globalAlpha *= VN; roundRect(ctx, B.x + 186, B.y + 12, 300, 62, 10); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
      metaA(ctx, 'verkeerde naam?', B.x + 510, B.y + 54, VN, C.koraal, 'left', 28);
      sequentieRij(ctx, B.x + 52, B.y + 140, bi1Seq(30, 4117), { s: 0.95 }); } });
    tag(ctx, 'verkeerde naam → verkeerde treffer', 640, 520, C.koraal, q.on('treffer', 1) * (1 - MT * 0.7), 'center', 30);
    for (let i = 0; i < 3; i++) { const a = clamp(MT * 1.5 - i * 0.25, 0, 1); if (a <= 0.01) continue; const x = SX + i * 380;
      codeScherm(ctx, x, 560, 350, 170, [], { a, tab: `treffer ${i + 1}`, inhoud: (B) => { text(ctx, 'geelvintonijn', B.x + 10, B.y + 44, fTekst(36, 600), C.text, 'left'); metaText(ctx, ['lab a', 'lab b', 'lab c'][i], B.x + 10, B.y + 86, C.text2, 'left', 26); } });
      vink_(ctx, x + 310, 680, 18, a * BT); }
    if (TW > 0.01) { naamBij(ctx, 'tweede stukje DNA', 'soms, bij tonijn', SX, 800, TW, 'left'); sequentieRij(ctx, SX + 470, 790, bi1Seq(16, 909), { s: 0.62, a: TW, letters: false }); }
    kim(ctx, 1560, t, { pose: MT > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Dr. Kim', '', 1560, 382, 1, 'center');
    sam(ctx, 1800, t, { kijk: -1, uit: 'neutraal' });
  },

  // ---------- H4 Zelf programmeren ----------
  s24(ctx, t, q) { bg(ctx, 'schema');
    codeScherm(ctx, SX, 190, SW, 440, [], { tab: 'vertaal.py', cursor: { regel: 0, kol: 0 }, t });
    tag(ctx, 'Python: een programmeertaal', 960, 420, C.teal, q.on('programmeertaal', 1), 'center', 36);
    naamBij(ctx, 'mRNA van insuline', 'zonder introns', 140, 676, q.on('insuline', 1), 'left');
    const xs = sequentieRij(ctx, 162, 760, INS18, { s: 0.8, rna: true, a: q.on('insuline', 1, 0.5) || (t > 0.1 ? 0 : 0) });
    // met de hand: per drie letters aanwijzen
    const H = q.on('hand', 1); if (H > 0.01) { const k = Math.floor((t - q.at('hand', 1)) / 0.7) % 6, x1 = xs[k * 3] - 22, x2 = xs[k * 3 + 2] + 22; ctx.save(); ctx.globalAlpha *= H; roundRect(ctx, x1, 728, x2 - x1, 64, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    miniCodontabel(ctx, 1500, 670, 1, q.on('genetische', 1)); metaA(ctx, 'met de hand: De genetische code lezen', SX + SW, 850, q.on('genetische', 1), C.text2, 'right', 26);
  },
  s25(ctx, t, q) { bg(ctx, 'schema');
    const L = CODE_BI1(INS18);
    const z = 2 * ramp(t, q.at('codontabel', 1), 0.8) + 3 * ramp(t, q.at('Dan', 1), 1.0) + ramp(t, q.at('Elk', 1), 0.5) + ramp(t, q.at('plakt', 1), 0.5);
    const hl = t < q.at('Dan', 1) ? [0, 1] : t < q.at('Elk', 1) ? [4] : [5];
    codeScherm(ctx, SX, 190, SW, 440, L, { tab: 'vertaal.py', px: 32, zicht: z, hl, cursor: z < 0.05 ? { regel: 0, kol: 0 } : null, t });
    metaA(ctx, 'woordenboek: bij elk codon één aminozuur', SX + SW, 676, q.on('woordenboek', 1) * (1 - q.on('stappen', 1)), C.goud, 'right', 26);
    naamBij(ctx, 'mRNA van insuline', 'zonder introns', 140, 676, 1, 'left');
    const xs = sequentieRij(ctx, 162, 760, INS18, { s: 0.8, rna: true });
    const S = q.on('stappen', 1); if (S > 0.01) { const k = Math.floor((t - q.at('stappen', 1)) / 0.9) % 6, x1 = xs[k * 3] - 22, x2 = xs[k * 3 + 2] + 22; ctx.save(); ctx.globalAlpha *= S; roundRect(ctx, x1, 728, x2 - x1, 64, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      metaA(ctx, 'stap van drie', (x1 + x2) / 2, 840, S, C.goud, 'center', 26); }
    const P = q.on('plakt', 1); if (P > 0.01) { pijl(ctx, 900, 760, 980, 760, C.goud, P, 3, 14); aaKralen(ctx, 1060, 760, 'M', { a: P, r: 32 }); metaA(ctx, 'aminozuur achter de keten', 1110, 676, P, C.grain, 'left', 26); }
  },
  s26(ctx, t, q) { bg(ctx, 'schema');
    const tv = q.at('verbetering', 1), goed = t >= tv, sw = ramp(t, tv, 0.5);
    const L = CODE_BI1(goed ? INS18 : INS_LAAT);
    codeScherm(ctx, SX, 190, SW, 440, L, { tab: 'vertaal.py', px: 32, hl: [2], dim: 0.6, fout: [{ regel: 2, van: 7, tot: 27, a: (1 - sw) * q.on('laat', 1) }], merk: [{ regel: 2, van: 8, tot: 11, a: q.on('methionine', 1) }] });
    const xs = sequentieRij(ctx, 162, 760, goed ? INS18 : INS_LAAT, { s: 0.8, rna: true, mark: (i) => (!goed && q.on('laat', 1) > 0.5 && i === 0) ? C.koraal : null });
    metaA(ctx, goed ? 'begint bij AUG' : 'één letter te laat', 140, 690, goed ? sw : q.on('laat', 1), goed ? C.groen : C.koraal, 'left', 26);
    pijl(ctx, 900, 760, 980, 760, C.goud, 1, 3, 14);
    const F = q.on('verkeerde', 1); if (!goed && F > 0.01) aaKralen(ctx, 1060, 760, 'WPCGCA', { r: 34, dx: 120, zicht: (t - q.at('verkeerde', 1)) * 5, fout: true });
    if (goed) { if (sw < 0.99) aaKralen(ctx, 1060, 760, 'WPCGCA', { r: 34, dx: 120, fout: true, a: 1 - sw });
      aaKralen(ctx, 1060, 760, 'MALWMR', { r: 34, dx: 120, zicht: (t - q.at('zes', 1)) * 5, hl: q.on('methionine', 1) > 0.5 ? 0 : -1 });
      metaA(ctx, 'zes aminozuren · elk een eigen lettercode', 1360, 676, q.on('lettercode', 1) * (1 - q.on('methionine', 1)), C.grain, 'center', 26);
      naamBij(ctx, 'methionine', 'start', 1060, 830, q.on('methionine', 1), 'center');
      naamBij(ctx, 'alanine', '', 1180, 704, q.on('alanine', 1), 'center');
      naamBij(ctx, 'leucine', '', 1300, 830, q.on('leucine', 1), 'center');
      naamBij(ctx, 'tryptofaan', '', 1420, 704, q.on('tryptofaan', 1), 'center'); }
    regel(ctx, 'net als met de hand', 1360, 860, q.on('Net', 1) * (1 - sw), C.koraal, 30, 'center', 600);
  },
  s27(ctx, t, q) { bg(ctx, 'schema');
    dim(ctx, () => { codeScherm(ctx, SX, 190, SW, 440, CODE_BI1(INS18), { tab: 'vertaal.py', px: 32 }); }, 0.35);
    const off = -Math.max(0, t - 0.6) * 300;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 700, W, 120); ctx.clip();
    sequentieRij(ctx, 162 + off, 760, INS333, { s: 0.8, rna: true, fadeX: 1600, fadeW: 260, alpha: (i) => clamp((162 + off + i * 40 - 40) / 140, 0, 1) });
    ctx.restore();
    const n = Math.round(lerp(18, 333, clamp((t - 0.6) / Math.max(1, q.at('driehonderd', 1) - 0.6), 0, 1)));
    metaA(ctx, n >= 333 ? 'ruim 300 letters (333)' : `${n} letters`, SX + SW, 676, 1, C.grain, 'right', 30);
    metaA(ctx, 'het deel dat codeert', 140, 676, q.on('codeert', 1), C.text2, 'left', 26);
  },
  s28(ctx, t, q) { bg(ctx, 'schema');
    dim(ctx, () => { codeScherm(ctx, SX, 190, SW, 440, CODE_BI1(INS18), { tab: 'vertaal.py', px: 32 }); }, 0.35);
    sequentieRij(ctx, 162 - 2200, 760, INS333, { s: 0.8, rna: true, fadeX: 1600, fadeW: 260, alpha: (i) => clamp((162 - 2200 + i * 40 - 40) / 140, 0, 1) });
    metaA(ctx, 'ruim 300 letters (333)', SX + SW, 676, 1, C.grain, 'right', 30);
    vraagteken(ctx, 960, 470, q.on('Wat', 1, 0.4), 160);
  },
  s30(ctx, t, q) { bg(ctx, 'schema'); bi1Antwoord(ctx, 'antwoord a: niets, dezelfde regels');
    const LN = q.on('lengte', 1), DZ = q.on('duizend', 1), MA = q.on('Maar', 1), BG = q.on('beginnen', 1);
    codeScherm(ctx, SX, 190, SW, 440, CODE_BI1(INS18), { tab: 'vertaal.py', px: 32, hl: [4], dim: 0.4 * (1 - BG), merk: [{ regel: 4, van: 18, tot: 27, a: LN * (1 - DZ) }, { regel: 2, van: 8, tot: 11, a: BG }] });
    metaA(ctx, 'de code meet de lengte zelf', SX + SW, 676, LN * (1 - DZ), C.goud, 'right', 26);
    // de kralenketting groeit razendsnel uit beeld
    const zt = (t - q.at('herhaalt', 1)) * 16, dx = 62, x0 = Math.min(240, 1700 - zt * dx);
    if (DZ < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - DZ; ctx.beginPath(); ctx.rect(110, 690, SW + 20, 160); ctx.clip(); aaKralen(ctx, x0, 770, INS_EIWIT, { r: 24, dx, zicht: zt }); ctx.restore();
      metaA(ctx, `${Math.min(110, Math.max(0, Math.floor(zt)))} aminozuren`, 140, 676, ramp(t, q.at('herhaalt', 1), 0.4) * (1 - DZ), C.grain, 'left', 26); }
    // duizend recepten (hier honderd getekend) tegelijk vertaald
    if (DZ > 0.01) { ctx.save(); ctx.globalAlpha *= DZ * (1 - MA * 0.75) * (1 - BG * 0.8); const k = clamp((t - q.at('duizend', 1) - 0.4) / 1.6, 0, 1);
      for (let i = 0; i < 100; i++) { const c = i % 25, r = Math.floor(i / 25), x = 150 + c * 66, y = 712 + r * 40; const S = bi1Seq(6, 500 + i).replace(/T/g, 'U');
        for (let j = 0; j < 6; j++) { ctx.fillStyle = RNA_KL[S[j]]; ctx.fillRect(x + j * 8, y, 7, 10); }
        if (k > hash(i) * 0.8) { for (let j = 0; j < 3; j++) circ(ctx, x + 6 + j * 16, y + 26, 6, AA_KL[(i + j) % 5], null); } }
      ctx.restore(); metaA(ctx, '100 van de duizend recepten', SX + SW, 676, DZ * (1 - MA), C.grain, 'right', 26); }
    tag(ctx, 'beginpunt: zet Sam zelf', 960, 790, C.goud, BG, 'center', 34);
    metaA(ctx, 'de computer doet alleen wat er staat', 960, 676, MA, C.text2, 'center', 26);
  },

  // ---------- Recap ----------
  s31(ctx, t, q) { bg(ctx, 'schema');
    const st = [['barcode_sushi.fasta', 'barcode', (B) => barcodeRijen(ctx, B, { s: 0.42, per: 15, rijen: 3, zicht: 45, letters: false, dy: 110 })],
      ['databank', 'databank', (B) => { databank(ctx, B.x + 90, B.y + 80, 0.55); databank(ctx, B.x + 190, B.y + 80, 0.55); databank(ctx, B.x + 290, B.y + 80, 0.55); }],
      ['uitlijnen', 'lijnde', (B) => uitlijning(ctx, B.x + 30, B.y + 40, OEF1G.slice(0, 13), OEF2.slice(0, 13), { s: 0.48, tussen: 20, streep: 1, klopt: 1 })],
      ['BLAST · resultaten', 'Bovenaan', (B) => { text(ctx, 'geelvintonijn', B.x + 14, B.y + 52, fTekst(34, 700), C.groen, 'left'); text(ctx, '100 %', B.x + 320, B.y + 52, fTekst(34, 700), C.groen, 'right'); metaText(ctx, 'toeval bijna 0', B.x + 14, B.y + 100, C.text2, 'left', 26); }]];
    st.forEach(([tab, w, fn], i) => { const a = q.on(w, 1); codeScherm(ctx, 110 + i * 430, 150, 390, 240, [], { a, tab, inhoud: fn }); if (i < 3) pijl(ctx, 110 + i * 430 + 396, 270, 110 + i * 430 + 424, 270, C.line, q.on(st[i + 1][1], 1), 2, 10); });
    sushiGroot(ctx, 560, 640, 0.9, { hl: q.on('bakje', 1) * (1 - q.on('restaurant', 1)), streep: q.on('blauwvintonijn', 1) });
    metaA(ctx, 'op het bakje', 560, 780, 1, C.text2, 'center', 26);
    tag(ctx, 'in het bakje: geelvintonijn', 1320, 610, C.groen, q.on('geelvintonijn', 1), 'center', 36);
    metaA(ctx, 'duurder, en dat stond erop: blauwvintonijn', 1320, 680, q.on('duurdere', 1), C.text2, 'center', 26);
    regel(ctx, 'of het restaurant het wist, zegt het DNA niet', 1320, 780, q.on('restaurant', 1), C.text2, 32, 'center', 600);
  },
  s32(ctx, t, q) { bg(ctx, 'schema');
    const tC = q.at('computer', 1), A = 1 - ramp(t, tC - 0.3, 0.6), Bv = ramp(t, tC, 0.6), TW = q.on('Twintig', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      tag(ctx, 'Radar · 2017 · 21 Nederlandse restaurants', 960, 190, C.teal, q.on('Radar', 1) || 1, 'center', 32);
      for (let i = 0; i < 21; i++) { const c = i % 7, r = Math.floor(i / 7), x = 540 + c * 140, y = 320 + r * 130, a = clamp(q.on('restaurants', 1) * 2 - i * 0.04, 0, 1) || (t > 0 ? 1 : 0);
        komIcoon(ctx, x, y, 1, { a: Math.max(a, 1), vis: '#C9CED6', rand: (TW > 0.5 && i !== 13) ? C.goud : null }); }
      metaA(ctx, '20 van de 21 keer: geelvintonijn', 960, 720, TW, C.goud, 'center', 30);
      regel(ctx, 'ook als het restaurant blauwvin zei', 960, 790, q.on('blauwvin', 1), C.text, 34, 'center', 600);
      ctx.restore(); }
    if (Bv > 0.01) { ctx.save(); ctx.globalAlpha *= Bv;
      computerIcoon(ctx, 360, 420, 1.3, 1); metaA(ctx, 'razendsnel', 360, 540, 1, C.grain, 'center', 28);
      const V = (s2, x, y, a) => { if (a <= 0.01) return; tag(ctx, s2, x + 20, y, C.groen, a, 'center', 30); ctx.save(); ctx.font = fTekst(30, 600); const w = ctx.measureText(s2).width + 40; ctx.restore(); vink_(ctx, x + 20 - w / 2 - 30, y - 12, 14, a); };
      V('bedachten wat te zoeken', 1420, 190, q.on('bedachten', 1)); V('controleerde de treffer', 1110, 300, q.on('controleerde', 1)); V('schreef de code', 1720, 300, q.on('schreef', 1));
      const BU = bureau(ctx, 1420, FLOOR, { w: 340 }); sushiBakje(ctx, 1530, BU.top - 2, 1.4, {});
      sam(ctx, 1730, t, { kijk: -1, uit: 'blij' }); kim(ctx, 1110, t, { kijk: 1, uit: 'blij' });
      tag(ctx, 'samen: bio-informatica', 600, 760, C.goud, q.on('samen', 1), 'center', 40);
      ctx.restore(); }
  },
  s33(ctx, t, q) { bg(ctx, 'schema');
    sam(ctx, 280, t, { pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Sam', 'meeloopweek', 280, 352, 1, 'center');
    tag(ctx, 'hbo · Bio-informatica', 1040, 230, C.teal, q.on('hbo-opleiding', 1), 'center', 34);
    regel(ctx, 'HAN Nijmegen · vier jaar', 1040, 296, q.on('Nijmegen', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'programmeren vanaf jaar 1', 1560, 296, C.goud, q.on('Programmeren', 1), 'center', 28);
    tag(ctx, 'bachelor Biology of Molecular Life Sciences', 1040, 410, C.teal, q.on('bachelor', 1), 'center', 30);
    regel(ctx, 'Radboud Universiteit Nijmegen', 1040, 470, q.on('Nijmegen', 2), C.text2, 28, 'center', 600);
    pijl(ctx, 1040, 494, 1040, 536, rgba(C.line, 0.8), q.on('master', 1), 3, 12);
    tag(ctx, 'master Bioinformatics and Systems Biology', 1040, 600, C.teal, q.on('master', 1), 'center', 30);
    regel(ctx, 'Wageningen University', 1040, 660, q.on('Wageningen', 1), C.text2, 28, 'center', 600);
    [['ziekenhuis', 'ziekenhuis'], ['instituut', 'onderzoeksinstituut'], ['bedrijf', 'bedrijf']].forEach(([s2, w], i) => { const x = 620 + i * 430, a = q.on(w, 1);
      werkplekIcoon(ctx, x, 760, s2, a); naamBij(ctx, w, '', x, 862, a, 'center'); });
  }
});
