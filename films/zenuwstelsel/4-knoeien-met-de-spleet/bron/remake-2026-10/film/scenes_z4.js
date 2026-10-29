// Zenuwstelsel 4 · Knoeien met de synaps — scènes (lichte remake 29 okt 2026). Eén functie per gesproken alinea;
// cues via q.on(woord, n, duur) / q.at(woord, n) op de woordtijden van Roos (oude takes, nieuwe take s15).
const SX = 600, SY = 470; // vaste plek van de synaps in de uitlegscènes
function kaartStof(q, t, extra = {}) { return Object.assign({}, extra); }

Object.assign(SCENES, {
  title(ctx, t) { synapsZ4(ctx, 1560, 560, 0.72, { fase: (t * 0.16) % 1, t }); },

  // ---------- Cold open: ochtend en avond, dezelfde spleet
  s01(ctx, t, q) { bg(ctx, 'schema'); const s = 2.9; const vloer = 800;
    const zoom = q.on('spleet', 1, 0.8), dimO = q.on('Avond', 1, 0.5) * (1 - q.on('Twee', 1, 0.5)) + zoom, dimA = (1 - q.on('Avond', 1, 0.5)) + zoom;
    const O = ochtend(ctx, 60, 880, vloer, s, t, { uit: t < q.at('wakker') ? 'moe' : 'blij', dim: clamp(dimO, 0, 1) });
    const A = avond(ctx, 980, 880, vloer, s, t, { uit: t < q.at('losser') ? 'neutraal' : (t < q.at('trager') ? 'lacht' : 'moe'), dim: clamp(dimA, 0, 1) });
    tag(ctx, 'wakker', 500, 220, C.groen, q.on('wakker', 1, 0.4) * UIT(t, q.at('spleet'), 0.4), 'center', 34);
    tag(ctx, 'losser', 1420, 220, C.oker, q.on('losser', 1, 0.4) * UIT(t, q.at('spleet'), 0.4), 'center', 34); tag(ctx, 'trager', 1420, 290, C.oker, q.on('trager', 1, 0.4) * UIT(t, q.at('spleet'), 0.4), 'center', 34);
    if (zoom > 0.01 && O.L && O.L.hoofd && A.L && A.L.hoofd) { const cx = 960, cy = 430, r = 250;
      ctx.save(); ctx.globalAlpha *= zoom; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; const h2 = A.L.hoofd; ctx.beginPath(); ctx.moveTo(h2.x, h2.y); ctx.lineTo(cx + r * 0.7, cy + r * 0.7); ctx.stroke(); ctx.restore();
      zoomCircle(ctx, cx, cy, r, O.L.hoofd.x, O.L.hoofd.y, 'synaps · vergroot', zoom, () => { bgM(ctx); synapsZ4(ctx, cx, cy + 10, 0.62, { fase: clamp((t - q.at('spleet')) / 3.2, 0, 0.95), t }); }); }
    vraagteken(ctx, 1290, 300, q.on('reageren', 1, 0.4), 120); },

  // ---------- Hoofdstuk 1 · Vier plekken
  s03(ctx, t, q) { bgM(ctx); const bl = q.on('bloed', 1, 0.5);
    bloedvat(ctx, [[-40, 150], [500, 130], [1000, 165], [1500, 140], [1960, 150]], 34, t, { a: bl, n: 16, deeltjes: { n: 12, col: Z4.stof, rr: 7, sp: 0.1 } });
    naamBij(ctx, 'bloed', null, 80, 230, bl, 'left');
    synapsZ4(ctx, 960, 560, 0.85, { fase: 0, t, a: 0.85 });
    for (let k = 0; k < 6; k++) { const u = ramp(t, q.at('stof', 1) + 0.3 + k * 0.5, 2.4); if (u <= 0.01) continue; mol(ctx, 'blok', lerp(300 + k * 260, 760 + k * 80, u), lerp(160, 360 + (k % 3) * 40, u) + Math.sin(t * 2 + k) * 5, 14, Z4.stof, u); }
    const v = q.on('hoeveel', 1, 0.4); vraagteken(ctx, 1500, 520, v, 140); },

  s05(ctx, t, q) { bgM(ctx); const s = 1.0;
    const c1 = q.at('Eén'), c2 = q.at('Twee'), c3 = q.at('Drie'), c4 = q.at('Vier', 2) < Infinity ? q.at('Vier', 2) : q.at('Vier');
    // fase van de synaps volgt de uitleg: afgifte bij 'Eén', heropname bij 'Drie'
    let fase = 0; if (t >= c1) fase = lerp(0.12, 0.62, (t - c1) / 3.2); if (t >= c2) fase = 0.66; if (t >= c3) fase = lerp(0.66, 1, (t - c3 - 1.6) / 3.0); if (t >= c4) fase = 0;
    synapsZ4(ctx, SX, SY, s, { fase, t, hi: t >= c3 && t < c4 ? 'transporter' : null });
    aanmaak(ctx, SX, SY, s, t, IN(t, c4 + 0.6, 0.6));
    naamBij(ctx, 'synaps', 'vergroot · niet op schaal', SX, 140, IN(t, 0, 0.6) * UIT(t, c1, 0.4), 'center');
    const ci = [c1, c2, c3, c4]; for (let i = 0; i < 4; i++) { const on = IN(t, ci[i], 0.4); const nxt = i < 3 ? ci[i + 1] : Infinity; plekRing(ctx, SX, SY, s, i, on * (t < nxt ? 1 : 0.0), 1); if (t >= nxt) plekBadge(ctx, i === 2 ? SX + 200 * s : SX + (PLEKPOS[i].x - PLEKPOS[i].rx - 34) * s, SY + PLEKPOS[i].y * s, i + 1, on); }
    // zoom op de receptor: agonist en antagonist
    const zA = IN(t, q.at('precies'), 0.6) * UIT(t, c3, 0.5); const zx = 1490, zy = 330, zr = 230;
    if (zA > 0.01) { const ag = t < q.at('wel') ? 1 : 0; const tb = ag ? t - q.at('precies') : t - q.at('wel');
      zoomCircle(ctx, zx, zy, zr, SX - 30 * s, SY + 30 * s, '', zA, () => { bgM(ctx); const pt = celBoog(ctx, zx - zr, zx + zr, zy + 10, 600, { t });
        const [rx, ry, an] = pt(0.5); const b = ease(clamp(tb / 1.2, 0, 1)); receptor(ctx, rx, ry, an, 1.5, { bind: b, lig: { soort: ag ? 'nt' : 'blok', col: ag ? Z4.stof : Z4.stof }, open: ag ? ease(clamp((tb - 1.2) / 0.6, 0, 1)) : 0, t });
        if (!ag) for (let k = 0; k < 3; k++) { const v = (t * 0.5 + k / 3) % 1; mol(ctx, 'nt', rx - 120 + k * 90, zy - 140 + Math.abs(Math.sin(v * 3.14)) * 60, 11, Z4.nt, 0.9); } });
      const agA = IN(t, q.at('agonist'), 0.4) * UIT(t, q.at('wel'), 0.3), anA = IN(t, q.at('antagonist'), 0.4);
      naamBij(ctx, 'agonist', 'past · zet aan', zx, zy + zr + 50, zA * agA, 'center', C.groen);
      naamBij(ctx, 'antagonist', 'past · blokkeert', zx, zy + zr + 50, zA * anA, 'center', C.koraal); }
    // de kaart bouwt mee op
    const rij = ci.map(c => IN(t, c, 0.4)); const kA = IN(t, c3 + 0.6, 0.5);
    ingreepkaart(ctx, 1240, 280, 620, { a: kA, rij, hl: t >= q.at('kaart') ? -1 : (t >= c4 ? 3 : 2), stof: { 1: [['agonist', C.groen, 1], ['antagonist', C.koraal, 1]] } });
    if (t >= q.at('kaart')) { ctx.save(); ctx.globalAlpha *= IN(t, q.at('kaart'), 0.4); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 1232, 272, 636, 454, 22); ctx.stroke(); ctx.restore(); } },

  // ---------- Hoofdstuk 2 · Koffie
  s06(ctx, t, q) { bg(ctx, 'schema'); ochtend(ctx, 260, 1400, 820, 3.0, t, { uit: 'moe', stoom: 1 }); vraagteken(ctx, 1500, 520, q.on('wakker', 1, 0.4), 130); },

  s08(ctx, t, q) { bgM(ctx); const x0 = 680, x1 = 1860, yT = 430; const pt = celBoog(ctx, x0, x1, yT, 680, { t }); const cA = q.at('Cafeïne'), aw = q.at('afgebroken'), tg = q.at('tegelijk');
    // links: klok + slaapdrukbalk + Linda
    const u = clamp((t - 0.3) / 6.5, 0, 1); const uur = lerp(8, 22, u);
    { const kx = 230, ky = 230, kr = 70; circ(ctx, kx, ky, kr, '#E8E4DA', '#9AA3B2', 3); for (let i = 0; i < 12; i++) { const q2 = i * 0.5236; ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx + Math.cos(q2) * kr * 0.82, ky + Math.sin(q2) * kr * 0.82); ctx.lineTo(kx + Math.cos(q2) * kr * 0.92, ky + Math.sin(q2) * kr * 0.92); ctx.stroke(); }
      const hq = (uur % 12) / 12 * 6.283 - Math.PI / 2, mq = (uur % 1) * 6.283 - Math.PI / 2; ctx.strokeStyle = '#2A3446'; ctx.lineCap = 'round'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(hq) * kr * 0.5, ky + Math.sin(hq) * kr * 0.5); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(mq) * kr * 0.75, ky + Math.sin(mq) * kr * 0.75); ctx.stroke();
      text(ctx, String(Math.floor(uur)).padStart(2, '0') + ':00', kx, ky + kr + 50, fMeta(30), C.text, 'center'); }
    const dip = IN(t, tg, 0.5);
    const druk = Math.max(u, 0.15) * (t > cA ? 1 : 1); // adenosine blijft zich ophopen
    { const bx = 360, by = 170, bh = 560; roundRect(ctx, bx, by, 80, bh, 16); shape(ctx, '#0D1420', C.line, 1.5); for (let k = 0; k < Math.round(druk * 16); k++) mol(ctx, 'ado', bx + 28 + (k % 2) * 16, by + bh - 30 - k * 32, 10, Z4.nt, 1);
      metaText(ctx, 'adenosine', bx + 40, by + bh + 44, C.grain, 'center', 28); naamBij(ctx, 'slaapdruk', null, bx + 40, by - 20, q.on('slaapdruk', 1, 0.4), 'center'); }
    const wak = t >= q.at('wakker', 2) && t < tg; persoon(ctx, 'linda', 230, 830, 420, { uit: wak ? 'blij' : (t > q.at('slaapdruk') ? 'moe' : 'neutraal'), t });
    // rechts: membraan van een zenuwcel met adenosinereceptoren
    naamBij(ctx, 'zenuwcel', null, 1240, 820, IN(t, 0.5, 0.5), 'center', C.text2);
    const RU = [0.18, 0.39, 0.61, 0.82]; const adoB = IN(t, q.at('receptor'), 0.8) * (t < q.at('dezelfde') ? 1 : 0) + dip;
    const cafB = IN(t, q.at('dezelfde'), 0.8) * (1 - ramp(t, aw, 1.2));
    RU.forEach((uu, i) => { const [rx, ry, an] = pt(uu); const cb = cafB, ab = clamp(adoB, 0, 1);
      receptor(ctx, rx, ry, an, 1.25, { bind: cb > 0.05 ? cb : ab, lig: cb > 0.05 ? { soort: 'cafe', col: Z4.cafe } : { soort: 'ado', col: Z4.nt }, open: 0, t, col: Z4.rec, hl: i === 1 && t > q.at('eigen') && t < q.at('remt') + 1 ? 1 : 0 }); });
    // adenosine in de spleet: blijft zich ophopen, wacht
    const nA = Math.round(lerp(4, 16, clamp((t - 2) / 22, 0, 1))); for (let k = 0; k < nA; k++) { if (t < cA && t > q.at('receptor') && k < 4) continue; const w2 = wander(k, t, 26, 0.5); mol(ctx, 'ado', 700 + hash(k) * 1100 + w2.x, 170 + hash(k + 9) * 160 + w2.y, 13, Z4.nt, (1 - dip) * IN(t, 1.5 + k * 0.25, 0.5)); }
    for (let k = 0; k < 6; k++) { if (t < cA) break; const w2 = wander(k + 40, t, 20, 0.5); const brk = ramp(t, aw, 1.2); mol(ctx, 'cafe', 720 + hash(k + 20) * 1060 + w2.x, 190 + hash(k + 30) * 140 + w2.y, 13, Z4.cafe, IN(t, cA + 0.3, 0.6) * (1 - brk) * (t < q.at('dezelfde') + 0.8 ? 1 : 0.6)); }
    const rem = clamp(IN(t, q.at('remt'), 0.5) * (1 - IN(t, q.at('dezelfde'), 0.6)) + dip, 0, 1);
    tag(ctx, 'rem: zenuwcel minder actief', 1240, 720, C.teal, rem * UIT(t, q.at('dip'), 0.01) + (t >= q.at('dip') ? 0 : 0), 'center', 32);
    tag(ctx, 'antagonist: blokkeert', 1240, 720, C.koraal, IN(t, q.at('antagonist'), 0.4) * UIT(t, aw, 0.4), 'center', 32);
    tag(ctx, 'de dip', 1240, 720, C.koraal, IN(t, q.at('dip'), 0.4) * UIT(t, q.at('energie'), 0.3), 'center', 34);
    naamBij(ctx, 'adenosine', null, 760, 150, IN(t, q.at('adenosine'), 0.4) * UIT(t, cA, 0.4), 'left'); naamBij(ctx, 'cafeïne', 'lijkt op adenosine', 1700, 150, IN(t, cA, 0.4) * UIT(t, aw, 0.4), 'right', '#E2C3A2');
    tag(ctx, 'geen energie', 1040, 720, C.text2, IN(t, q.at('energie'), 0.4), 'center', 34); if (t > q.at('energie')) kruis(ctx, 1040, 708, 110, IN(t, q.at('energie') + 0.3, 0.3) * 0.8, C.koraal);
    tag(ctx, 'verbergt vermoeidheid', 1480, 720, C.oker, IN(t, q.at('verbergt'), 0.4), 'center', 34); },

  // ---------- Hoofdstuk 3 · Wijn
  s09(ctx, t, q) { bgM(ctx); const tr = q.at('trager'); const pA = UIT(t, tr, 0.6);
    const paneelR = (x0, titel, meta, isG, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pt = celBoog(ctx, x0, x0 + 760, 470, 420, { t });
      const alc = isG ? IN(t, q.at('gevoeliger'), 0.6) : IN(t, q.at('remt'), 0.6);
      [0.28, 0.72].forEach((uu, i) => { const [rx, ry, an] = pt(uu); receptor(ctx, rx, ry, an, 1.35, { bind: 1, lig: { soort: 'nt', col: Z4.nt }, open: isG ? lerp(0.6, 1, alc) : lerp(0.8, 0.35, alc), t: t * (isG ? lerp(1, 1.8, alc) : lerp(1, 0.4, alc)), ion: isG ? '#B9C6D8' : C.teal, ionTeken: isG ? '−' : '+' });
        if (alc > 0.01) mol(ctx, 'alc', rx + 60, ry - 40, 19, Z4.stof, alc); });
      for (let k = 0; k < 5; k++) { const w2 = wander(k + (isG ? 0 : 20), t, 22, 0.5); mol(ctx, 'nt', x0 + 120 + k * 120 + w2.x, 300 + w2.y, 11, Z4.nt, 0.9); }
      naamBij(ctx, titel, meta, x0 + 380, 210, 1, 'center', C.text);
      const v = isG ? lerp(0.5, 0.85, alc) : lerp(0.6, 0.3, alc); balkMeter(ctx, x0 + 170, 700, 420, v, isG ? 'rem' : 'gas', isG ? '#B9C6D8' : C.teal, 1);
      ctx.restore(); };
    paneelR(110, 'GABA', 'remmend · Cl⁻ naar binnen', true, IN(t, q.at('GABA'), 0.5) * pA);
    paneelR(1050, 'glutamaat', 'exciterend · Na⁺ naar binnen', false, IN(t, q.at('glutamaat'), 0.5) * pA);
    if (t < q.at('GABA')) { vraagteken(ctx, 960, 470, IN(t, q.at('twee'), 0.4) * UIT(t, q.at('GABA'), 0.3), 120); mol(ctx, 'alc', 960, 330, 30, Z4.stof, IN(t, 0, 0.5) * UIT(t, q.at('GABA'), 0.3)); naamBij(ctx, 'alcohol', null, 960, 260, IN(t, 0, 0.5) * UIT(t, q.at('GABA'), 0.3), 'center'); }
    tag(ctx, 'meer rem', 640, 140, '#B9C6D8', IN(t, q.at('Meer'), 0.4) * pA, 'center', 34); tag(ctx, 'minder gas', 1430, 140, C.teal, IN(t, q.at('minder', 2), 0.4) * pA, 'center', 34);
    // het hele netwerk wordt trager
    const nA = IN(t, tr, 0.6); if (nA > 0.01) { ctx.save(); ctx.globalAlpha *= nA; const P = [[420, 300], [760, 220], [1100, 330], [1440, 240], [760, 520], [1180, 600], [1500, 520]]; const E = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [2, 5], [3, 6]];
      const sp = lerp(1, 0.3, ramp(t, tr, 1.5)); E.forEach(([i, j], k) => { const ph = (t * 0.6 * sp + k * 0.21) % 1; axon(ctx, P[i][0], P[i][1], P[j][0], P[j][1], 1, { pulsen: [ph] }); }); P.forEach(([x, y]) => cel(ctx, x, y, 34, 1));
      chip(ctx, 'langzamer reageren', 520, 800, C.oker, IN(t, q.at('langzamer'), 0.4), 32); chip(ctx, 'dubbele tong', 960, 800, C.oker, IN(t, q.at('dubbele'), 0.4), 32); chip(ctx, 'minder herinneringen', 1400, 800, C.oker, IN(t, q.at('herinneringen'), 0.4), 32); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); avond(ctx, 260, 1400, 820, 3.0, t, { uit: t > q.at('losser') ? 'lacht' : 'neutraal' }); vraagteken(ctx, 1150, 330, q.on('Waarom', 1, 0.4), 130); },

  s12(ctx, t, q) { bgM(ctx); const gev = q.at('gevoelig'), meer = q.at('meer'), traag = q.at('traag');
    const remDim = IN(t, gev + 0.4, 0.8), alleDim = IN(t, meer + 0.4, 1.0);
    const R = [430, 300], D = [1050, 470], U = [1520, 470];
    // glazen
    for (let g = 0; g < 3; g++) wijnglas(ctx, 160 + g * 90, 860, 3.6, g === 0 ? IN(t, gev, 0.4) : IN(t, meer, 0.4), 0.6);
    // alcohol rond de remcel, later overal
    for (let k = 0; k < 8; k++) { const w2 = wander(k, t, 18, 0.5); mol(ctx, 'alc', R[0] - 90 + (k % 4) * 60 + w2.x, R[1] + 110 + Math.floor(k / 4) * 50 + w2.y, 12, Z4.stof, IN(t, gev, 0.5)); }
    for (let k = 0; k < 10; k++) { const w2 = wander(k + 30, t, 18, 0.5); mol(ctx, 'alc', D[0] - 140 + (k % 5) * 70 + w2.x, D[1] + 120 + Math.floor(k / 5) * 50 + w2.y, 12, Z4.stof, IN(t, meer, 0.5)); }
    // remcel → doelcel → 'praten en doen'
    const remPuls = [(t * 0.7) % 1, (t * 0.7 + 0.5) % 1].map(p => remDim > 0.5 ? -1 : p);
    const doelSnel = lerp(0.35, 1.2, remDim) * (1 - 0.8 * alleDim);
    axon(ctx, R[0] + 40, R[1] + 20, D[0] - 60, D[1] - 30, 1, { pulsen: remPuls, dim: remDim, rem: true });
    axon(ctx, D[0] + 40, D[1], U[0] - 60, U[1], 1, { pulsen: [(t * doelSnel) % 1, (t * doelSnel + 0.5) % 1], dim: alleDim });
    cel(ctx, R[0], R[1], 50, 1, { dim: remDim, hl: t > q.at('remmen') && t < gev ? 1 : 0 }); cel(ctx, D[0], D[1], 56, 1, { dim: alleDim });
    naamBij(ctx, 'remcel', 'remt gedrag af', R[0], R[1] - 90, IN(t, 0.4, 0.5), 'center'); naamBij(ctx, 'zenuwcel voor gedrag', null, D[0], D[1] - 100, IN(t, 0.8, 0.5), 'center');
    // wat je doet: een tekstballon die groter wordt als de rem wegvalt
    const los = lerp(0.55, 1, remDim) * (1 - 0.5 * alleDim);
    ctx.save(); ctx.globalAlpha *= IN(t, q.at('zeggen'), 0.5); const bw = 240 * los, bh = 120 * los; roundRect(ctx, U[0] - bw / 2 + 60, U[1] - bh / 2, bw, bh, 30); shape(ctx, '#E8E4DA', null);
    text(ctx, '…', U[0] + 60, U[1] + 12 * los, fTekst(60 * los, 700), '#121A26', 'center'); ctx.restore();
    naamBij(ctx, 'praten en doen', null, U[0] + 60, U[1] + 120, IN(t, q.at('doen'), 0.4), 'center', C.text2);
    tag(ctx, 'rem op de rem valt weg', 760, 160, C.oker, IN(t, q.at('valt'), 0.4) * UIT(t, meer, 0.4), 'center', 34);
    tag(ctx, 'eerst losser', 1300, 160, C.groen, IN(t, q.at('losser'), 0.4) * UIT(t, meer, 0.4), 'center', 34);
    tag(ctx, 'dan alles traag', 1040, 160, C.oker, IN(t, traag, 0.4), 'center', 34);
    haak(ctx, 330, 1150, 730, 'overal rem · de volgorde bepaalt wat je merkt', C.groen, IN(t, q.at('overal'), 0.5)); },

  // ---------- Hoofdstuk 4 · Medicijnen
  s13(ctx, t, q) { bgM(ctx); synapsZ4(ctx, 960, 520, 0.95, { fase: lerp(0.4, 0.85, clamp(t / 6, 0, 1)), t, hi: t > q.at('heropname') ? 'transporter' : null });
    pil(ctx, 1500, 260, 1.2, IN(t, q.at('SSRI'), 0.4)); naamBij(ctx, 'SSRI', 'antidepressivum', 1500, 360, IN(t, q.at('SSRI'), 0.4), 'center');
    naamBij(ctx, 'serotonine', null, 600, 600, IN(t, q.at('serotonine'), 0.4) * UIT(t, q.at('Wat'), 0.4), 'center', Z4.nt);
    vraagteken(ctx, 1420, 560, q.on('spleet', 1, 0.4), 130); },

  s15(ctx, t, q) { bgM(ctx); const sR = q.at('SSRI'), lv = q.at('Levodopa'), dr = q.at('Drie');
    // kaart blijft rechts staan en vult zich
    const st = { 1: [['nicotine', C.groen, IN(t, q.at('Nicotine'), 0.4)]], 2: [['SSRI', Z4.blok, IN(t, sR, 0.4)]], 3: [['levodopa', Z4.grond, IN(t, lv, 0.4)]] };
    const hl = t >= dr ? -1 : (t >= lv ? 3 : (t >= sR ? 2 : 1));
    ingreepkaart(ctx, 1240, 120, 620, { stof: st, hl, rh: 84 });
    if (t >= dr) { ctx.save(); ctx.globalAlpha *= IN(t, dr, 0.4); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 1232, 112, 636, 422, 22); ctx.stroke(); ctx.restore(); }
    // A · nicotine op de acetylcholinereceptor
    const aA = IN(t, q.at('Nicotine'), 0.5) * UIT(t, sR, 0.5);
    if (aA > 0.01) { ctx.save(); ctx.globalAlpha *= aA; const pt = celBoog(ctx, 120, 1120, 470, 1100, { t }); const tb = t - q.at('past');
      [0.3, 0.7].forEach((uu, i) => { const [rx, ry, an] = pt(uu); const b = ease(clamp((tb - i * 0.3) / 1.0, 0, 1)); receptor(ctx, rx, ry, an, 1.5, { bind: b, lig: { soort: 'nt', col: Z4.stof }, open: ease(clamp((t - q.at('aan') + 0.4) / 0.6, 0, 1)), t }); });
      naamBij(ctx, 'nicotine', 'agonist · past en zet aan', 620, 230, IN(t, q.at('Nicotine'), 0.4), 'center', C.groen);
      naamBij(ctx, 'receptor voor acetylcholine', null, 620, 860, IN(t, q.at('acetylcholine'), 0.4), 'center');
      tag(ctx, 'trek → hersenen: een paar seconden', 620, 340, C.teal, IN(t, q.at('seconden'), 0.4), 'center', 32); ctx.restore(); }
    // B · SSRI blokkeert de heropname
    const bA = IN(t, sR, 0.5) * UIT(t, q.at('zeker'), 0.5); const ss = IN(t, q.at('geblokkeerd'), 0.8);
    if (bA > 0.01) { ctx.save(); ctx.globalAlpha *= bA; synapsZ4(ctx, 560, 470, 0.95, { fase: lerp(0.45, 0.9, clamp((t - sR) / 5, 0, 1)), t, ssri: ss, hi: t < q.at('geblokkeerd') + 1.5 ? 'transporter' : null });
      naamBij(ctx, 'heropname geblokkeerd', null, 560, 140, ss * UIT(t, q.at('zeker'), 0.4), 'center', C.koraal);
      naamBij(ctx, 'serotonine blijft langer', null, 560, 830, IN(t, q.at('langer'), 0.4) * UIT(t, q.at('zeker'), 0.4), 'center', Z4.nt); ctx.restore(); }
    // zeker / minder zeker, en uur tegen weken
    const zA = IN(t, q.at('zeker'), 0.4) * UIT(t, lv, 0.5);
    if (zA > 0.01) { ctx.save(); ctx.globalAlpha *= zA; ctx.fillStyle = rgba(C.bgMicro, 0.78); ctx.fillRect(60, 100, 1120, 780);
      tag(ctx, 'in de synaps: heropname geremd', 620, 220, C.groen, 1, 'center', 34); vink_(ctx, 1050, 206, 22, 1, C.groen);
      tag(ctx, 'oorzaak van depressie: minder zeker', 620, 330, C.oker, IN(t, q.at('minder'), 0.4), 'center', 34);
      tag(ctx, 'niet simpelweg een tekort aan één stof', 620, 440, C.text2, IN(t, q.at('tekort'), 0.4), 'center', 32);
      const tA = IN(t, q.at('weken'), 0.5); if (tA > 0.01) { ctx.save(); ctx.globalAlpha *= tA; const x0 = 160, x1 = 1080, y = 640; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        for (let w = 0; w <= 6; w++) { const xx = lerp(x0, x1, w / 6); ctx.beginPath(); ctx.moveTo(xx, y - 8); ctx.lineTo(xx, y + 8); ctx.stroke(); metaText(ctx, w === 0 ? 'start' : w + ' wk', xx, y + 46, C.text2, 'center', 28); }
        const u1 = IN(t, q.at('uur'), 0.4); circ(ctx, x0 + 4, y, 12, C.koraal); naamBij(ctx, 'heropname geremd', 'na ± 1 uur', x0 - 10, y - 40, u1, 'left', C.koraal);
        ctx.fillStyle = rgba(C.groen, 0.5); ctx.fillRect(lerp(x0, x1, 2 / 6), y - 6, lerp(x0, x1, 6 / 6) - lerp(x0, x1, 2 / 6), 12); naamBij(ctx, 'het medicijn werkt', 'na weken', lerp(x0, x1, 4.3 / 6), y - 40, 1, 'center', C.groen); ctx.restore(); }
      ctx.restore(); }
    tag(ctx, 'er verandert meer dan de stof in de spleet', 620, 800, C.goud, IN(t, q.at('verandert'), 0.4) * UIT(t, lv, 0.4), 'center', 34);
    // C · levodopa: bloed-hersenbarrière en aanmaak
    const cA = IN(t, lv, 0.5);
    if (cA > 0.01) { ctx.save(); ctx.globalAlpha *= cA;
      // Parkinson: dopaminecellen die afsterven
      const pk = IN(t, q.at('sterven'), 1.2); for (let i = 0; i < 5; i++) cel(ctx, 170 + i * 120, 230, 30, 1 * (i % 2 === 0 ? 1 - 0.7 * pk : 1) * IN(t, q.at('Parkinson'), 0.4));
      naamBij(ctx, 'cellen die dopamine maken', 'ziekte van Parkinson: ze sterven af', 410, 330, IN(t, q.at('Parkinson'), 0.4) * UIT(t, q.at('Daar'), 0.4), 'center');
      // bloedvat met wand = barrière; hersenweefsel erboven
      const yb = 720; bloedvat(ctx, [[60, yb + 60], [600, yb + 50], [1160, yb + 60]], 44, t, { n: 10, speed: 0.08 });
      ctx.strokeStyle = '#C9A0A0'; ctx.lineWidth = 3; ctx.setLineDash([26, 5]); ctx.beginPath(); ctx.moveTo(60, yb); ctx.lineTo(1160, yb); ctx.stroke(); ctx.setLineDash([]);
      metaText(ctx, 'bloed-hersenbarrière', 1150, yb - 18, C.grain, 'right', 28); metaText(ctx, 'bloed', 80, yb + 140, C.grain, 'left', 28);
      // dopamine botst af
      const dA = IN(t, q.at('Dopamine'), 0.4); for (let k = 0; k < 3; k++) { const v = (t * 0.6 + k / 3) % 1; const hop = Math.abs(Math.sin(v * 3.1416)); mol(ctx, 'nt', 260 + k * 110, yb + 40 - hop * 30, 13, Z4.nt, dA); }
      if (dA > 0.01) kruis(ctx, 370, yb - 30, 22, dA * IN(t, q.at('niet'), 0.3), C.koraal);
      naamBij(ctx, 'dopamine', 'komt er niet door', 370, yb + 140, dA * UIT(t, q.at('grondstof'), 0.4), 'center', Z4.nt);
      // levodopa gaat erdoor en wordt in het eindknopje dopamine
      const lA = IN(t, q.at('levodopa', 2), 0.4); const kx = 880, ky = 470;
      blob(ctx, kx, ky, 110, 90, 0.05, 3); shape(ctx, '#2A3550', C.er, 3); naamBij(ctx, 'eindknopje', null, kx, ky - 120, lA, 'center', C.text2);
      for (let k = 0; k < 5; k++) { const v = clamp(((t - q.at('levodopa', 2)) * 0.45 + k * 0.17) % 1.2, 0, 1); const px = lerp(780 + k * 30, kx - 30 + (k % 3) * 30, v), py = lerp(yb + 40, ky + 10 - (k % 2) * 30, v); const omz = t > q.at('omgezet') && v > 0.85;
        if (lA > 0.01) { if (omz) mol(ctx, 'nt', px, py, 12, Z4.nt, lA); else mol(ctx, 'grond', px, py, 12, Z4.grond, lA); } }
      for (let k = 0; k < 5; k++) mol(ctx, 'nt', kx - 50 + (k % 3) * 45, ky - 25 + Math.floor(k / 3) * 40 + Math.sin(t * 2 + k) * 3, 12, Z4.nt, IN(t, q.at('omgezet') + 0.3 + k * 0.15, 0.4));
      naamBij(ctx, 'levodopa', 'grondstof · gaat erdoor', 1010, yb + 140, lA, 'center', Z4.grond);
      ctx.restore(); } },

  // ---------- Hoofdstuk 5 · Gewenning en verslaving
  s16(ctx, t, q) { bgM(ctx); const pt = celBoog(ctx, 160, 1300, 470, 1200, { t }); const RU = [0.1, 0.26, 0.42, 0.58, 0.74, 0.9];
    RU.forEach(uu => { const [rx, ry, an] = pt(uu); receptor(ctx, rx, ry, an, 1.2, { bind: 1, lig: { soort: 'nt', col: Z4.stof }, open: 1, t }); });
    for (let k = 0; k < 18; k++) { const w2 = wander(k, t, 26, 0.6); mol(ctx, 'nt', 220 + hash(k) * 1040 + w2.x, 190 + hash(k + 5) * 200 + w2.y, 11, Z4.stof, IN(t, q.at('signaal'), 0.5)); }
    meter(ctx, 1520, 200, 520, lerp(0.5, 0.95, IN(t, q.at('signaal'), 1.2)), 1, { titel: 'signaal' });
    naamBij(ctx, 'wekenlang', null, 700, 150, IN(t, q.at('wekenlang'), 0.4), 'center', C.oker); vraagteken(ctx, 1400, 300, q.on('doet', 1, 0.4), 120); },

  s18(ctx, t, q) { bgM(ctx); const nog = q.at('nog'), stop = q.at('Stop');
    const pA = UIT(t, nog, 0.6);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; const pt = celBoog(ctx, 160, 1300, 470, 1200, { t }); const RU = [0.1, 0.26, 0.42, 0.58, 0.74, 0.9];
      const weg = IN(t, q.at('weg'), 1.4); const stofN = t < q.at('meer') ? 18 : 26; const stofA = t < stop ? 1 : 1 - ramp(t, stop, 0.8);
      RU.forEach((uu, i) => { const [rx, ry, an] = pt(uu); const gaat = i % 2 === 1; const dy = gaat ? weg * 120 : 0; const ra = gaat ? 1 - ease(clamp((weg - 0.4) / 0.6, 0, 1)) : 1;
        receptor(ctx, rx, ry + dy, an, 1.2, { a: ra, bind: stofA, lig: { soort: 'nt', col: Z4.stof }, open: stofA, t });
        if (gaat && weg > 0.05 && weg < 0.98) { ctx.save(); ctx.globalAlpha *= Math.sin(weg * 3.14) * 0.8; circ(ctx, rx, ry + dy, 40, null, C.er, 3); ctx.restore(); } }); // blaasje snoert af: receptor gaat de cel in
      for (let k = 0; k < stofN; k++) { const w2 = wander(k, t, 26, 0.6); mol(ctx, 'nt', 220 + hash(k) * 1040 + w2.x, 190 + hash(k + 5) * 200 + w2.y, 11, Z4.stof, stofA); }
      const sig = t < stop ? lerp(0.92, 0.52, weg) : lerp(0.52, 0.16, ramp(t, stop, 1.0)); meter(ctx, 1520, 200, 520, sig, 1, { titel: 'signaal', col: sig < 0.4 ? '#B9C6D8' : C.teal });
      naamBij(ctx, 'normaal', null, 1630, 150, 0, 'center');
      tag(ctx, 'te veel signaal', 730, 150, C.oker, IN(t, q.at('veel'), 0.4) * UIT(t, q.at('weg'), 0.4), 'center', 34);
      tag(ctx, 'receptoren weg', 730, 150, C.oker, IN(t, q.at('weg'), 0.4) * UIT(t, q.at('gewenning'), 0.4), 'center', 34);
      tag(ctx, 'gewenning (tolerantie)', 730, 150, C.groen, IN(t, q.at('gewenning'), 0.4) * UIT(t, stop, 0.4), 'center', 36);
      tag(ctx, 'meer nodig voor hetzelfde', 730, 860, C.oker, IN(t, q.at('nodig'), 0.4) * UIT(t, stop, 0.4), 'center', 32);
      tag(ctx, 'ontwenning', 730, 150, C.koraal, IN(t, q.at('ontwenning'), 0.4), 'center', 36);
      chip(ctx, 'hoofdpijn zonder koffie', 480, 860, C.koraal, IN(t, q.at('Hoofdpijn'), 0.4), 32); chip(ctx, 'trillen zonder alcohol', 1000, 860, C.koraal, IN(t, q.at('trillen'), 0.4), 32);
      ctx.restore(); }
    // beloningssysteem: hersenen in doorsnede met VTA → nucleus accumbens → prefrontale schors
    const bA = IN(t, nog, 0.6); if (bA > 0.01) { const hx = 600, hy = 470, hs = 1.15; const sterk = IN(t, q.at('sterker'), 1.0);
      ctx.save(); ctx.globalAlpha *= bA; hoofdHersenen(ctx, hx, hy, hs, { hthCol: BIO.breinS, hypCol: BIO.breinS, gloed: 0 });
      beloningsbaan(ctx, hx, hy, hs, t, { a: IN(t, q.at('dopamine'), 0.6), sterk, pulsen: 1 });
      const P = k => [hx + BELONING[k][0] * hs, hy + BELONING[k][1] * hs]; const lb = IN(t, q.at('beloont'), 0.4) * UIT(t, q.at('verlangen'), 0.4);
      naamBij(ctx, 'ventraal tegmentum', null, P('vta')[0] - 30, P('vta')[1] + 70, lb, 'right'); naamBij(ctx, 'nucleus accumbens', null, P('nac')[0] + 40, P('nac')[1] + 60, lb, 'left'); naamBij(ctx, 'prefrontale schors', null, P('pfc')[0] + 30, P('pfc')[1] - 40, lb, 'left');
      naamBij(ctx, 'beloningssysteem', 'dopamine', 40, 300, IN(t, q.at('beloont'), 0.4), 'left', C.goud);
      tag(ctx, 'dit was goed, doe het nog eens', hx, 860, C.groen, IN(t, q.at('goed'), 0.4) * UIT(t, q.at('Dat', 3), 0.4), 'center', 32);
      ctx.restore();
      // rechts: eten en gezelschap, daarna effect tegen verlangen
      const eA = IN(t, q.at('eten'), 0.4) * UIT(t, q.at('verlangen'), 0.5); bord(ctx, 1320, 330, 1.2, eA); naamBij(ctx, 'eten', null, 1320, 420, eA, 'center');
      if (eA > 0.01) { persoon(ctx, 'noor', 1560, 470, 300, { a: IN(t, q.at('gezelschap'), 0.4) * UIT(t, q.at('verlangen'), 0.5), uit: 'lacht', t }); persoon(ctx, 'daan', 1700, 470, 310, { a: IN(t, q.at('gezelschap'), 0.4) * UIT(t, q.at('verlangen'), 0.5), uit: 'blij', t, kijk: -1 }); naamBij(ctx, 'gezelschap', null, 1630, 530, IN(t, q.at('gezelschap'), 0.4) * UIT(t, q.at('verlangen'), 0.5), 'center'); }
      tag(ctx, 'een stof zet het sterker aan', 1550, 640, C.oker, IN(t, q.at('sterker'), 0.4) * UIT(t, q.at('verlangen'), 0.4), 'center', 32);
      const mA = IN(t, q.at('verlangen'), 0.5); if (mA > 0.01) { const eff = lerp(0.8, 0.15, ramp(t, q.at('allang'), 1.2)), ver = lerp(0.3, 0.95, ramp(t, q.at('verlangen'), 2.0));
        balkMeter(ctx, 1260, 300, 520, eff, 'effect', C.teal, mA); balkMeter(ctx, 1260, 440, 520, ver, 'verlangen', C.koraal, mA);
        tag(ctx, 'verslaving', 1520, 590, C.koraal, IN(t, q.at('verslaving'), 0.4), 'center', 36);
        haak(ctx, 1260, 1780, 650 + 30, 'geen zwakke wil: een aangepaste synaps', C.groen, IN(t, q.at('zwakke'), 0.5)); } } },

  // ---------- Samenvatting
  s19(ctx, t, q) { bgM(ctx); const s = 0.78, sx = 470, sy = 520;
    synapsZ4(ctx, sx, sy, s, { fase: 0.5 + 0.3 * Math.sin(t * 0.4), t, a: 0.95 });
    const W4 = ['afgifte', 'receptor', 'opruimen', 'aanmaak']; for (let i = 0; i < 4; i++) { const P = PLEKPOS[i]; plekBadge(ctx, i === 2 ? sx + 200 * s : sx + (P.x - P.rx - 34) * s, sy + P.y * s, i + 1, IN(t, q.at(W4[i]), 0.4)); }
    const mA = UIT(t, q.at('Vier'), 0.6); if (mA > 0.01) { ctx.save(); ctx.globalAlpha *= mA; const O = ochtend(ctx, 200, 700, 760, 2.4, t, { uit: 'blij' }); const A = avond(ctx, 1000, 700, 760, 2.4, t, { uit: 'lacht' }); ctx.restore(); }
    const st = { 1: [['cafeïne', Z4.cafe, IN(t, q.at('Cafeïne'), 0.4)], ['alcohol', C.text2, IN(t, q.at('Alcohol'), 0.4)], ['nicotine', C.groen, IN(t, q.at('Nicotine'), 0.4)]], 2: [['SSRI', Z4.blok, IN(t, q.at('SSRI'), 0.4)]], 3: [['levodopa', Z4.grond, IN(t, q.at('Levodopa'), 0.4)]] };
    ingreepkaart(ctx, 960, 150, 900, { a: IN(t, q.at('Vier'), 0.5), stof: st, rh: 96 });
    const aA = IN(t, q.at('elke'), 0.4); chip(ctx, 'gewenning', 1120, 760, C.groen, IN(t, q.at('gewenning'), 0.4) * aA, 32); chip(ctx, 'ontwenning', 1410, 760, C.koraal, IN(t, q.at('ontwenning'), 0.4) * aA, 32); chip(ctx, 'verlangen', 1690, 760, C.koraal, IN(t, q.at('verlangen'), 0.4) * aA, 32);
    const k = IN(t, q.at('knoeit'), 0.5); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(sx, sy - 10, 270, 300, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'dezelfde spleet, een ander effect', null, sx, 140, IN(t, q.at('Dezelfde'), 0.4), 'center', C.goud); }
});
