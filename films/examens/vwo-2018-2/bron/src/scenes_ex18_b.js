// Examenbespreking vwo 2018-II — scènes deel b: s27–s43 (Nieuwe eilandjes voor de alvleesklier, vragen 9–15),
// s65–s69 (Biologische productie van waterstofgas, vragen 27–30), s86–s87 (Wat neem je mee?). v1, 21 okt 2026.

function b_ruth(ctx, t, x, a, o = {}) { const an = persoon(ctx, 'lotte', x, o.voet || 860, o.h || 540, Object.assign({ t, kijk: 1, a }, o)); if (o.naam != null) naamBij(ctx, 'Ruth', '', x, (an.top || 300) - 22, a * o.naam, 'center'); return an; }
// schuif een tekening (getekend rond (960,480)) naar een andere plek en schaal: k = 0..1
function b_schuif(ctx, k, dx, dy, s, fn) { ctx.save(); const kk = ease(k); ctx.translate(960 + dx * kk, 480 + dy * kk); ctx.scale(lerp(1, s, kk), lerp(1, s, kk)); ctx.translate(-960, -480); fn(); ctx.restore(); }
const b_OPT10 = ['ADH neemt af · resorptie neemt af', 'ADH neemt af · resorptie neemt toe', 'ADH neemt toe · resorptie neemt af', 'ADH neemt toe · resorptie neemt toe'];
const b_OPT12 = ['Minder insuline, dus minder aerobe dissimilatie', 'Minder insuline, dus de lever slaat minder glucose op', 'Glucosegehalte gedaald, dus de alvleesklier maakt glucagon', 'Tijdens de slaap wordt minder glucose verbruikt'];
function b_citaat(ctx, x, y, w, a, hl) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 110, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  metaText(ctx, 'zin vlak voor de vraag', x + 26, y + 34, '#6A6458', 'left', 18);
  const s1 = '… een lage bloedglucosewaarde ', s2 = 'in de nacht', s3 = ' en het dageraadfenomeen …'; ctx.font = fTekst(32, 600); const w1 = ctx.measureText(s1).width, w2 = ctx.measureText(s2).width;
  if (hl > 0.01) { ctx.fillStyle = rgba(C.goud, 0.55 * hl); ctx.fillRect(x + 26 + 2, y + 52, (w1 + w2) * clamp(hl * 1.3, 0, 1), 44); }
  text(ctx, s1, x + 26, y + 86, fTekst(32, 600), '#1A2233', 'left'); text(ctx, s2, x + 26 + w1, y + 86, fTekst(32, 600), '#1A2233', 'left'); text(ctx, s3, x + 26 + w1 + w2, y + 86, fTekst(32, 500), '#6A6458', 'left'); ctx.restore(); }

Object.assign(SCENES, {
  // ================= Nieuwe eilandjes voor de alvleesklier =================
  s27(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE, q.on('tweede', 1, 0.5));
    const ra = q.on('Ruth', 1, 0.3); b_ruth(ctx, t, 300, ra, { pose: 'vasthouden', naam: 1, hold: (c, x, y) => b_glucosemeter(c, x + 12, y - 34, 0.95, '15,8', 1, q.on('diabetes', 1)) });
    const al = q.on('bètacellen', 1, 0.6), za = q.on('bètacellen', 1, 0.8), tc = ramp(t, q.at('afweersysteem', 1), Math.max(1, q.at('Zonder', 1) - q.at('afweersysteem', 1))), kp = q.on('Zonder', 1, 1.6);
    b_alvleesklier(ctx, 860, 600, 1.05, al, { hl: za, t }); naamBij(ctx, 'alvleesklier', '', 860, 700, al, 'center');
    if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; ctx.strokeStyle = rgba(b_BETAR, 0.5); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(876 + 22, 585); ctx.lineTo(1450 - 260, 470 - 150); ctx.moveTo(876 + 22, 615); ctx.lineTo(1450 - 250, 470 + 165); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    b_zoomRing(ctx, 1450, 470, 300, za, () => b_eiland(ctx, 1450, 470, 300, t, { ins: 1 - kp, tc, kapot: kp }));
    naamBij(ctx, 'eilandje van Langerhans', '', 1450, 820, q.on('Langerhans', 1), 'center', b_BETAR);
    naamBij(ctx, 'bètacellen maken insuline', '', 1450, 140, q.on('maken', 1) * (1 - q.on('Zonder', 1)), 'center', b_BETA);
    tag(ctx, 'auto-immuunziekte', 860, 300, C.koraal, q.on('auto', 1), 'center', 34); },

  s28(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 9, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waarom normale insulineproductie in de thymus nodig is', 70, 170, 860, q.on('Tijdens', 1, 0.6));
    const th = q.on('ontwikkeling', 1), ins = q.on('afgelezen', 1, 1) * (1 - 0.75 * q.on('minder', 1, 1));
    b_thymus(ctx, 1400, 470, 1.55, th, { ins, t }); naamBij(ctx, 'thymus', '', 1400, 740, th, 'center', b_THY);
    naamBij(ctx, 'insuline wordt hier ook gemaakt', '', 1400, 200, q.on('afgelezen', 1) * (1 - q.on('minder', 1)), 'center', C.goud);
    naamBij(ctx, 'diabetes type 1: minder insuline', '', 1400, 200, q.on('minder', 1) * (1 - q.on('Leg', 1)), 'center', C.koraal);
    if (q.on('Leg', 1) > 0.01) { const tcS = q.on('Leg', 1); for (let i = 0; i < 4; i++) { const an = i * 1.57 + 0.6 + t * 0.15; b_tcel(ctx, 1400 + Math.cos(an) * 240, 470 + Math.sin(an) * 200, 30, t, { a: tcS, vorm: ['rond', 'drie', 'vierkant', 'rond'][i], seed: i }); } } },

  s29(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 9, 2);
    const ph2 = q.on('antwoord', 1, 1);
    b_schuif(ctx, ph2, -440, 30, 0.82, () => {
      const cx = 960, cy = 480; const th = q.on('thymus', 1, 0.6);
      b_thymus(ctx, cx, cy, 2.35, th * 0.45); naamBij(ctx, 'thymus', '', cx - 330, 200, th, 'center', b_THY);
      const ins = q.on('lichaamseigen', 1, 0.8); b_thymusCel(ctx, cx, cy, 92, t, { a: q.on('eiwitten', 1, 0.6) > 0 ? 1 : q.on('Daar', 1), ins });
      naamBij(ctx, 'lichaamseigen eiwit (insuline)', '', cx + 330, cy + 230, q.on('eiwitten', 1) * (1 - ph2), 'left', C.goud);
      const re = q.on('reageren', 1, 1.4), op = q.on('opgeruimd', 1, 1.2), lr = q.on('leren', 1, 1.2);
      const vormen = ['rond', 'drie', 'vierkant', 'rond', 'drie', 'rond', 'drie'];
      vormen.forEach((v, i) => { const verschijn = ramp(t, q.at('T-cellen', 1) + i * 0.18, 0.4); const an = -Math.PI / 2 + i * 6.283 / 7 + 0.25; const w = wander(i + 5, t, 8, 0.6); let R = 280;
        const zelf = v === 'vierkant'; if (zelf) R = lerp(280, 150, re); else R = 280 + 40 * lr;
        const x = cx + Math.cos(an) * R + w.x, y = cy + Math.sin(an) * R * 0.92 + w.y;
        b_tcel(ctx, x, y, 40, t, { a: verschijn * (zelf ? 1 - 0.85 * op : 1), vorm: v, seed: i, gloed: zelf ? re * (1 - op) : lr * 0.6, gloedKl: zelf ? C.koraal : null, kapot: zelf ? op : 0 });
        if (zelf) kruis(ctx, x, y, 30, op * (1 - ph2)); });
      naamBij(ctx, 'T-cellen', '', cx + 340, cy + 10, ramp(t, q.at('T-cellen', 1), 0.5) * (1 - re), 'left', b_TC);
    });
    punten(ctx, [{ t: 'Insuline in de thymus: T-cellen die op insuline reageren, worden niet rijp', a: q.on('Eén', 1), v: q.on('rijp', 2) },
      { t: 'Dus geen aanval op de bètacellen (die insuline maken) in de alvleesklier', a: q.on('Twee', 2), v: q.on('niet', 2) }], 1020, 190, 840, ph2, { px: 32 });
    b_zoomRing(ctx, 1440, 700, 140, q.on('alvleesklier', 1), () => b_eiland(ctx, 1440, 700, 140, t, { ins: 1 }));
    naamBij(ctx, 'bètacellen blijven heel', '', 1440, 875 - 10, 0, 'center'); },

  s30(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 10, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'combinatie van ADH-afgifte en terugresorptie van water is juist?', 70, 170, 860, ramp(t, 0.3, 0.5));
    const gl = q.on('bloedsuikerspiegel', 1, 1.2); b_bloedvat(ctx, 140, 860, 560, 110, t, q.on('hoge', 1));
    for (let i = 0; i < 14; i++) { const ia = clamp(gl * 14 - i, 0, 1); const px = 200 + ((t * 40 + hash(i * 4) * 600) % 600), py = 560 + (hash(i * 4 + 1) - 0.5) * 60; glucoseDeeltje(ctx, px, py, 11, ia * q.on('hoge', 1)); }
    naamBij(ctx, 'veel glucose in het bloed', '', 500, 478, q.on('hoge', 1) * (1 - q.on('Neemt', 1)), 'center', C.teal);
    b_beker(ctx, 500, 810, 150, 150, lerp(0.75, 0.35, q.on('minder', 1, 1.2)), q.on('urine', 1), 'urine');
    hormoonVorm(ctx, 700, 750, 18, 'adh', q.on('ADH', 1)); naamBij(ctx, 'ADH', '', 730, 762, q.on('ADH', 1), 'left', C.goud);
    opties(ctx, b_OPT10, 1000, 190, 850, { a: [0, 1, 2, 3].map(i => ramp(t, q.at('Neemt', 1) + i * 0.25, 0.4)) }, 1, { px: 32 }); },

  s31(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 10, 'mc');
    const p2 = ramp(t, q.at('antwoord', 1) + 0.6, 0.6); const p1 = 1 - q.on('antwoord', 1, 0.5);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      // rechts: minder urine
      const ua = q.on('Begin', 1); b_beker(ctx, 1680, 720, 160, 220, lerp(0.75, 0.35, q.on('minder', 1, 1.2)), ua, 'urine');
      naamBij(ctx, 'gegeven: minder urine', '', 1680, 420, q.on('minder', 1) * (1 - q.on('Dan', 1)), 'center', C.goud);
      // midden: verzamelbuis in de nier, meer water terug naar het bloed
      const va = q.on('water', 1), adh = q.on('ADH', 1, 1.5), res = Math.max(0.15, q.on('teruggeresorbeerd', 1, 1.2));
      b_verzamelbuis(ctx, 1130, 450, 420, t, { a: va, adh, res }); naamBij(ctx, 'nier: water terug naar het bloed', '', 1130, 720, va, 'center', C.teal);
      // links: hypothalamus en hypofyse
      const ba = q.on('Waarom', 1), hy = q.on('hypothalamus', 1, 0.8); b_brein(ctx, 440, 420, 0.7, ba, { hyp: hy, t });
      naamBij(ctx, 'hypothalamus', '', 330, 452, hy, 'right', C.goud); naamBij(ctx, 'hypofyse', '', 480, 560, hy, 'left', C.goud);
      const ga = q.on('glucose', 1, 1); b_bloedvat(ctx, 150, 760, 730, 90, t, ga);
      for (let i = 0; i < 12; i++) { const px = 190 + ((t * 40 + hash(i * 7) * 520) % 520), py = 730 + (hash(i * 7 + 1) - 0.5) * 46; glucoseDeeltje(ctx, px, py, 10, ga * clamp(ga * 12 - i, 0, 1)); }
      naamBij(ctx, 'osmotische waarde ↑', '', 455, 810, q.on('osmotische', 1), 'center', C.teal);
      // ADH van de hypofyse via het bloed naar de nier
      const af = Math.max(q.on('ADH', 1) * 0.4, q.on('afgeven', 1)); if (af > 0.01) for (let k = 0; k < 7; k++) { const u = (t * 0.25 + k / 7) % 1; const px = lerp(460, 1040, u), py = 545 + Math.sin(u * Math.PI) * -150 * 0 + (u > 0.5 ? 0 : 0) + lerp(0, -80, Math.sin(u * Math.PI)); hormoonVorm(ctx, px, py, 13, 'adh', af * Math.sin(u * Math.PI)); }
      naamBij(ctx, 'meer ADH', '', 760, 430, q.on('ADH', 1) * (1 - q.on('Waarom', 1)) + q.on('afgeven', 1), 'center', C.goud);
      // terugredeneren: pijlen van rechts naar links
      b_A(ctx, q.on('Dan', 1), () => { ctx.save(); ctx.setLineDash([12, 10]); pijl(ctx, 1560, 300, 1290, 300, C.goud, 1, 4, 18); ctx.restore(); });
      b_A(ctx, q.on('doordat', 1), () => { ctx.save(); ctx.setLineDash([12, 10]); pijl(ctx, 960, 300, 720, 300, C.goud, 1, 4, 18); ctx.restore(); });
      ctx.restore(); }
    if (p2 > 0.01) { antwoordLabel(ctx, 'Antwoord D', p2);
      opties(ctx, b_OPT10, 300, 240, 1320, { weg: [0, 1, 2].map(i => ramp(t, q.at('antwoord', 1) + 1.3 + i * 0.25, 0.6)), goed: 3, g: p2 }, p2, { px: 34 });
      tipKaart(ctx, 'Staat de uitkomst al in de tekst? Redeneer dan terug.', 300, 660, 1320, q.on('Tip', 1)); } },

  s32(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 11, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waardoor Ruth zonder insuline afvalt, ondanks veel glucose in haar bloed', 70, 170, 860, q.on('Ruth', 1, 0.6));
    const ra = q.on('Ruth', 1, 0.3), af = q.on('afvallen', 1, 2.5); b_weegschaal(ctx, 1460, 860, 260, lerp(54, 49.5, af), ra, af);
    b_ruth(ctx, t, 1460, ra, { voet: 826, h: 520, naam: 1, uit: af > 0.6 ? 'bezorgd' : 'neutraal' });
    const ga = q.on('glucose', 1, 1); b_bloedvat(ctx, 120, 880, 640, 120, t, ga);
    for (let i = 0; i < 18; i++) { const px = 170 + ((t * 45 + hash(i * 5) * 660) % 660), py = 640 + (hash(i * 5 + 1) - 0.5) * 70; glucoseDeeltje(ctx, px, py, 11, ga * clamp(ga * 18 - i, 0, 1)); }
    naamBij(ctx, 'veel glucose in het bloed', '', 500, 555, ga, 'center', C.teal); },

  s33(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 11, 2);
    const ph2 = q.on('Twee', 1, 1); const zonder = q.on('Zonder', 1, 0.8);
    b_schuif(ctx, ph2, -470, 40, 0.7, () => {
      b_bloedvat(ctx, 360, 1560, 230, 110, t, 1); naamBij(ctx, 'bloed', '', 340, 242, 1 - ph2, 'right', b_BLOEDL);
      const ins = 1 - zonder; const opn = 1 - 0.85 * zonder; const kp = b_lichaamscel(ctx, 960, 600, 220, t, { ins, opname: opn, honger: q.on('brandstof', 1) * (1 - 0.5 * q.on('verbranden', 1)), vet: 1 - 0.7 * q.on('verbranden', 1, 3), eiwit: 1 - 0.6 * q.on('verbranden', 1, 3.5), brand: q.on('verbranden', 1) });
      // insuline in het bloed (alleen in het eerste stuk)
      for (let i = 0; i < 5; i++) { const px = 420 + ((t * 60 + i * 230) % 1100); b_insuline(ctx, px, 210 + 20 * Math.sin(i * 2), 9, ins); }
      // glucose: veel in het bloed; met insuline de cel in, zonder insuline blijft het buiten
      const n = 10 + Math.round(10 * zonder); for (let i = 0; i < n; i++) { const px = 400 + ((t * 50 + hash(i * 3) * 1120) % 1120), py = 230 + (hash(i * 3 + 1) - 0.5) * 66; glucoseDeeltje(ctx, px, py, 10, 1); }
      for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1; const sx = kp.kanaal.x, sy0 = 290, sy1 = 600; const py = lerp(sy0, sy1, u); glucoseDeeltje(ctx, sx + Math.sin(u * 6 + k) * 10 + (u > 0.45 ? (u - 0.45) * 60 : 0), py, 10, opn * (u < 0.85 ? 1 : (1 - u) / 0.15) * (u > 0.05 ? 1 : u / 0.05)); }
      naamBij(ctx, 'lichaamscel', '', 960, 860 - 8, 1 - ph2, 'center');
      naamBij(ctx, 'vet', '', 834, 630, q.on('vet', 1) * (1 - ph2), 'right', '#F0D88A'); naamBij(ctx, 'eiwit', '', 1060, 540, q.on('vet', 1) * (1 - ph2), 'center', C.groen);
      // urine
      const ua = q.on('urine', 1) * (1 - ph2); b_beker(ctx, 1720, 780, 140, 170, 0.45, ua, 'urine');
      for (let k = 0; k < 3; k++) { const u = (t * 0.35 + k / 3) % 1; glucoseDeeltje(ctx, lerp(1580, 1720, u), lerp(250, 700, u * u), 10, ua * Math.sin(u * Math.PI)); }
      const wa = q.on('valt', 1) * (1 - ph2); b_weegschaal(ctx, 300, 800, 220, lerp(54, 49.5, q.on('valt', 1, 2)), wa, 1);
    });
    naamBij(ctx, 'te weinig brandstof', '', 960, 360, q.on('brandstof', 1) * (1 - q.on('verbranden', 1)), 'center', C.koraal);
    punten(ctx, [{ t: 'Minder glucose de cellen in (of glucose verdwijnt met de urine)', a: q.on('Twee', 1), v: q.on('verdwijnt', 2) }, { t: 'Vet- en eiwitverbranding', a: q.on('voor', 2), v: q.on('eiwitverbranding', 1) }], 990, 200, 860, ph2, { px: 32 }); },

  s34(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    b_ruth(ctx, t, 280, q.on('Ruth', 1, 0.3), { naam: 1, pose: 'vasthouden', hold: (c, x, y) => b_pen(c, x + 10, y - 20, 0.9, q.on('spuit', 1)) });
    const ka = q.on('snelwerkende', 1, 0.6); examenKader(ctx, 560, 110, 1300, 500, 'AFBEELDING 1', ka);
    const G = b_afb1(ctx, 560, 110, 1300, 500, { a: ka, snel: ramp(t, q.at('snelwerkende', 1), 2.4), lang: ramp(t, q.at('langzaam', 1), 2.2) });
    naamBij(ctx, 'snelwerkend', '', G.X(2), G.Y(0.88) - 16, q.on('snelwerkende', 1, 1), 'center', C.goud);
    naamBij(ctx, 'langzaam werkend', '', G.X(18), G.Y(0.3) - 16, q.on('langzaam', 1, 1), 'center', C.teal);
    const sa = q.on('schommelt', 1, 0.6); if (sa > 0.01) { const Yg = b_glucSchets(ctx, G.X, 660, 180, ramp(t, q.at('schommelt', 1), 3), { a: sa, laag: q.on('Nachts', 1), stijg: q.on('stijgt', 1) });
      b_maan(ctx, G.X(19.6), 700, 18, q.on('Nachts', 1)); naamBij(ctx, 'te laag', '', G.X(18.3), Yg(4) + 38, q.on('laag', 1), 'right', C.teal);
      naamBij(ctx, 'dageraadfenomeen', '', G.X(24), 650, q.on('dageraadfenomeen', 1), 'right', C.goud); } },

  s35(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 12, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'verklaring past het best bij het dageraadfenomeen?', 70, 170, 1780, ramp(t, 0.3, 0.5));
    const ap = [ramp(t, q.at('minder', 1) - 0.6, 0.4), ramp(t, q.at('lever', 1) - 1.4, 0.4), ramp(t, q.at('gedaald', 1) - 1.0, 0.4), ramp(t, q.at('slaap', 1) - 1.0, 0.4)];
    opties(ctx, b_OPT12, 70, 380, 1780, { a: ap }, 1, { px: 34 }); },

  s36(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 12, 'mc');
    const p1 = 1 - q.on('antwoord', 1, 0.4), p2 = ramp(t, q.at('antwoord', 1) + 0.4, 0.5);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      b_citaat(ctx, 70, 150, 1200, q.on('Gebruik', 1), q.on('laag', 1, 1));
      const ea = q.on('lichaam', 1), gl = q.on('glucagon', 1, 1);
      b_zoomRing(ctx, 420, 560, 190, ea, () => b_eiland(ctx, 420, 560, 190, t, { ins: 0.15, gluca: gl }), C.groen);
      naamBij(ctx, 'alfacellen: glucagon', '', 420, 800, gl, 'center', C.groen); naamBij(ctx, 'eilandje', '', 420, 800, ea * (1 - gl), 'center', b_BETAR);
      for (let k = 0; k < 6; k++) { const u = (t * 0.32 + k / 6) % 1; hormoonVorm(ctx, lerp(620, 840, u), 560 + Math.sin(u * 6 + k) * 18, 12, 'glucagon', gl * Math.sin(u * Math.PI), C.groen); }
      const la = q.on('lever', 1), gg = q.on('glycogeen', 1, 3);
      cel(ctx, 1060, 560, 380, 260, { a: Math.max(la, gl * 0.4), naam: 'levercel', glyco: 1 - 0.75 * gg, col: C.oker });
      for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; glucoseDeeltje(ctx, lerp(1180, 1400, u), 560 + Math.sin(u * 5 + k) * 30 - u * 40, 11, gg * Math.sin(u * Math.PI)); }
      // grafiekje: 's nachts te laag, daarna stijging
      const ga = q.on('lichaam', 1); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga; const gx = 1430, gy = 380, gw = 420, gh = 300; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
        metaText(ctx, 'bloedglucose', gx, gy - 16, C.text2, 'left', 18); text(ctx, 'nacht', gx + gw * 0.3, gy + gh + 34, fTekst(24, 600), C.text2, 'center'); text(ctx, 'ochtend', gx + gw * 0.85, gy + gh + 34, fTekst(24, 600), C.text2, 'center');
        const st = q.on('stijging', 1, 1.5); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; if (u > 0.55 + 0.45 * st) break; const v = u < 0.55 ? 0.55 - 0.35 * Math.sin(u / 0.55 * Math.PI / 2) : 0.2 + 0.55 * ease((u - 0.55) / 0.45); k ? ctx.lineTo(gx + gw * u, gy + gh - gh * v) : ctx.moveTo(gx + gw * u, gy + gh - gh * v); } ctx.stroke();
        if (st > 0.01) pijl(ctx, gx + gw * 0.68, gy + gh * 0.62, gx + gw * 0.9, gy + gh * 0.32, C.goud, st, 4, 16); ctx.restore(); }
      ctx.restore(); }
    if (p2 > 0.01) { antwoordLabel(ctx, 'Antwoord C', p2);
      const vr = q.at('verklaren', 1); opties(ctx, b_OPT12, 70, 230, 1780, { weg: [0, 1, 3].reduce((o, i, k) => { o[i] = ramp(t, vr + k * 0.3, 0.6); return o; }, [0, 0, 0, 0]), goed: 2, g: q.on('antwoord', 1, 0.8) }, p2, { px: 34 });
      ketting(ctx, [{ t: 'glucagon', a: q.on('stijging', 2), col: C.groen }, { t: 'lever: glycogeen → glucose', a: ramp(t, q.at('stijging', 2) + 0.5, 0.6), col: C.oker }, { t: 'glucose stijgt', a: ramp(t, q.at('stijging', 2) + 1, 0.6), col: C.koraal }], 220, 720, 1480, p2); } },

  s37(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    const ra = q.on('Sinds', 1, 0.3); b_ruth(ctx, t, 270, ra, { naam: 1, pose: 'vasthouden', hold: (c, x, y) => b_pomp(c, x + 6, y - 10, 0.9, q.on('insulinepompje', 1), t, 1) });
    const ka = q.on('insulinepompje', 1, 0.6); examenKader(ctx, 520, 110, 1340, 740, 'AFBEELDING 2', ka);
    b_afb2(ctx, 540, 150, 1300, { a: ka, lijn: ramp(t, q.at('steeds', 1), 2.6), bolus: q.on('extra', 1, 1), onder: q.on('onderste', 1, 0.6), gluc: ramp(t, q.at('onderste', 1), 2.6), t });
    naamBij(ctx, 'maaltijdbolus', '', 540 + 96 + 1170 * 4.15 / 24, 150 + 40 - 8, q.on('maaltijd', 1) * (1 - q.on('onderste', 1) * 0.5), 'center', C.goud); },

  s38(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 13, 2, q.on('Vraag', 1, 0.4));
    examenKader(ctx, 40, 130, 1060, 730, 'AFBEELDING 2', 1);
    const d1 = q.on('Eén', 1), d2 = q.on('Twee', 2), d3 = q.on('Drie', 2);
    const r1 = d1 * (1 - d2), r2 = d2 * (1 - d3), r3 = d3;
    b_afb2(ctx, 50, 170, 1040, { lijn10: q.on('tien', 1) * (1 - d2), hlL: q.on('smalle', 1) * (1 - d3), hlA: q.on('breed', 1) * (1 - d3), maat: q.on('hoogte', 1) * (1 - d3), hlN: q.on('drie', 3) , ochtend: q.on('stijgt', 1), dimBot: r2, dimTop: r1, t });
    welNiet(ctx, [{ t: 'Glucose nooit boven 10 mmol/L', v: 'niet', a: d1, s: q.on('Niet', 1, 0.5), hl: r1 }, { t: 'Avondeten ± de helft van de insuline bij de lunch', v: 'niet', a: d2, s: q.on('Niet', 3, 0.5), hl: r2 }, { t: 'Pompje voorkomt het dageraadfenomeen', v: 'wel', a: d3, s: q.on('Wel', 1, 0.5), hl: r3 }], 1130, 150, 750, 1, { px: 28 });
    b_wisselTag(ctx, t, [['één vereenvoudigde dag', q.at('vereenvoudigde', 1), C.goud], ['hoeveelheid = hoogte × tijd', q.at('hoogte', 1), C.goud], ['avondeten: méér insuline', q.at('groter', 1), C.koraal], ['afgifte omhoog rond 03:00', q.at('drie', 3), C.teal]], 1505, 640, 30);
    if (t > q.at('Twee', 1) && t < q.at('Drie', 1)) { naamBij(ctx, 'lunch', '', 50 + 96 + 910 * 4.15 / 24, 220, q.on('smalle', 1), 'center', C.goud); naamBij(ctx, 'avondeten', '', 50 + 96 + 910 * 11 / 24, 290, q.on('breed', 1), 'center', C.koraal); } },

  s39(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 13, 2);
    const h1 = tipKaart(ctx, 'Wantrouw absolute woorden als nooit en altijd', 300, 190, 1320, q.on('Wantrouw', 1));
    tipKaart(ctx, 'Hoeveelheid uit afgifte per tijd = oppervlakte onder de lijn, niet de hoogte', 300, 340, 1320, q.on('hoeveelheid', 1));
    const sa = q.on('grafiek', 1); if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; const x0 = 620, y0 = 820, w = 700; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, 560); ctx.lineTo(x0, y0); ctx.lineTo(x0 + w, y0); ctx.stroke();
      metaText(ctx, 'afgifte', x0, 548, C.text2, 'left', 18); metaText(ctx, 'tijd →', x0 + w, y0 + 32, C.text2, 'right', 18);
      const op = q.on('oppervlakte', 1, 0.8), hg = q.on('hoogte', 1, 0.6);
      const blok = (bx, bw, bh, col) => { ctx.fillStyle = rgba(col, 0.15 + 0.4 * op); ctx.fillRect(bx, y0 - bh, bw, bh); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, y0); ctx.lineTo(bx, y0 - bh); ctx.lineTo(bx + bw, y0 - bh); ctx.lineTo(bx + bw, y0); ctx.stroke(); };
      blok(x0 + 90, 40, 220, C.goud); blok(x0 + 330, 260, 90, C.koraal);
      if (hg > 0.01) { kruis(ctx, x0 + 110, y0 - 250, 16, hg); vink_(ctx, x0 + 460, y0 - 130, 20, hg); }
      ctx.restore(); } },

  s40(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    b_ruth(ctx, t, 260, q.on('genezing', 1, 0.3), { naam: 1, uit: 'blij' });
    const ka = q.on('capsule', 1, 0.8), hu = q.on('huid', 1, 1.6), ce = ramp(t, q.at('stamcellen', 1) + 0.4, 2.2);
    const sa = q.on('bètacellen', 1) * (1 - hu); const df = q.on('stamcellen', 1, 1);
    if (sa > 0.01) { b_stamcel(ctx, 700, 360, 60, t, sa, df); naamBij(ctx, df > 0.5 ? 'bètacel uit eigen stamcel' : 'stamcel', '', 700, 470, sa, 'center', df > 0.5 ? b_BETA : '#B8A8E0');
      for (let k = 0; k < 3; k++) { const u = clamp(ce * 3 - k, 0, 1); if (u > 0.01 && u < 0.99) b_stamcel(ctx, lerp(700, 1150, ease(u)), 360 + Math.sin(u * 3.14) * -60, 26, t, sa, 1); } }
    const huid = b_huid(ctx, 620, 560, 1220, 300, hu);
    const zx = lerp(1150, 1240, hu), zy = lerp(380, 790, hu), zw = lerp(400, 200, hu), zh = lerp(260, 110, hu);
    b_theezakje(ctx, zx, zy, zw, zh, t, { a: ka, cellen: ce });
    naamBij(ctx, 'theezakje van gel', '', zx, zy - zh / 2 - 26, q.on('theezakje', 1) * (1 - hu), 'center', b_GEL);
    naamBij(ctx, 'onder de huid', '', 640, 545, hu, 'left', '#E3B998');
    const be = q.on('beschermt', 1, 0.8); if (be > 0.01) { for (let k = 0; k < 3; k++) { const an = -2.6 + k * 0.9; const d = 160 + 30 * Math.abs(Math.sin(t * 1.8 + k)); b_tcel(ctx, zx + Math.cos(an) * d, zy + Math.sin(an) * d * 0.6 + 20, 26, t, { a: be, vorm: 'vierkant', seed: k }); } }
    naamBij(ctx, 'afweer kan er niet bij', '', zx + 120, 520, be, 'left', C.groen); },

  s41(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 14, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Noem', 'de stof die de minimale en het type stoffen dat de maximale poriegrootte bepaalt', 70, 170, 860, q.on('poriën', 1, 0.6));
    const wa = q.on('poriën', 1); const kl = q.on('klein', 1, 0.8), gr = q.on('groot', 1, 0.8); const pr = lerp(lerp(40, 14, kl), 90, gr) * (gr > 0.99 ? 1 : 1) - (gr > 0.99 ? 50 * q.on('Welke', 1, 1) : 0);
    if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(1460, 190, 400, 600);
      for (let i = 0; i < 4; i++) b_stamcel(ctx, 1170 + (i % 2) * 70, 300 + i * 130, 44, t, 1, 1);
      b_gelWand(ctx, 1400, 190, 790, 80, [490], pr, 1);
      naamBij(ctx, 'bètacellen', '', 1205, 862 - 20, 1, 'center', b_BETA); naamBij(ctx, 'gel', '', 1400, 172, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 1660, 172, 1, 'center', b_BLOEDL);
      vraagteken(ctx, 1400, 520, q.on('Welke', 1) * 0.9, 90); ctx.restore(); }
    b_wisselTag(ctx, t, [['min?', q.at('minimale', 1), C.teal], ['max?', q.at('maximale', 1), C.koraal]], 1660, 520, 34); },

  s42(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 14, 2);
    const ys = [270, 410, 550, 690], pr = 17, wx = 620;
    ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(wx + 30, 170, 460, 640);
    for (let i = 0; i < 4; i++) b_stamcel(ctx, 300 + (i % 2) * 110, 300 + i * 120, 52, t, 1, 1);
    b_gelWand(ctx, wx, 170, 810, 60, ys, pr, 1);
    naamBij(ctx, 'bètacellen', '', 355, 820, 1, 'center', b_BETA); naamBij(ctx, 'gel', '', wx, 152, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 880, 152, 1, 'center', b_BLOEDL);
    // insuline eruit
    const ia = q.on('insuline', 1, 0.8); for (let k = 0; k < 10; k++) { const u = (t * 0.22 + k / 10) % 1; const py0 = 300 + (k % 4) * 120, pyp = ys[k % 4]; let px, py;
      if (u < 0.45) { const e = u / 0.45; px = lerp(360 + (k % 2) * 110, wx - 40, e); py = lerp(py0, pyp, e); } else if (u < 0.6) { px = lerp(wx - 40, wx + 40, (u - 0.45) / 0.15); py = pyp; } else { px = lerp(wx + 40, 1060, (u - 0.6) / 0.4); py = pyp + Math.sin(u * 9 + k) * 20; }
      b_insuline(ctx, px, py, 10, ia * Math.min(1, u * 8) * Math.min(1, (1 - u) * 6)); }
    naamBij(ctx, 'insuline', '', 880, 230, ia * (1 - q.on('antistoffen', 1)), 'center', C.goud);
    // antistoffen en complement: te groot, botsen tegen de poriën
    const aa = q.on('antistoffen', 1, 0.8), ca = q.on('complementeiwitten', 1, 0.8);
    for (let k = 0; k < 4; k++) { const u = (t * 0.35 + k / 4) % 1, d = Math.abs(Math.sin(u * Math.PI)); const px = wx + 54 + 260 * (1 - d), py = ys[k] + (k % 2 ? 8 : -8);
      b_antistof(ctx, px, py, 1.1, -Math.PI / 2, aa); if (ca > 0.01) b_complement(ctx, px + 150 + 120 * (1 - Math.abs(Math.sin(u * Math.PI + 1))), ys[k] + 40, 1, ca); }
    naamBij(ctx, 'antistof', '', 960, 330, aa * (1 - q.on('afweercellen', 1)), 'center', b_AS);
    naamBij(ctx, 'complement', '', 960, 610, ca * (1 - q.on('afweercellen', 1)), 'center', b_COMP);
    const fa = q.on('afweercellen', 1, 0.6); b_tcel(ctx, 940, 740, 70, t, { a: fa, vorm: 'vierkant' }); naamBij(ctx, 'afweercel', '', 1110, 760, fa, 'left', b_TC);
    punten(ctx, [{ t: 'Minimaal: insuline', a: q.on('insuline', 1), v: q.on('insulinemolecuul', 1) }, { t: 'Maximaal: antistoffen, cytokinen of complementeiwitten', a: q.on('antistoffen', 1), v: q.on('maximale', 1) }], 1140, 190, 720, 1, { px: 32 });
    valkuil(ctx, 'Afweercellen noemen: die zijn veel groter, en het gaat om stoffen', 1140, 560, 720, q.on('afweercellen', 1)); },

  s43(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 15, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waarom glucose zo snel mogelijk door de gel moet kunnen diffunderen', 70, 170, 880, q.on('Leg', 1, 0.6));
    const sa = q.on('gellaag', 1); const dik = lerp(140, 46, q.on('diffunderen', 1, 1.2)); const wx = 1340;
    if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(wx + dik / 2, 190, 1850 - wx - dik / 2, 620);
      const op = q.on('opmerken', 1, 0.8); if (op > 0.01) { const g = ctx.createRadialGradient(1130, 500, 60, 1130, 500, 220); g.addColorStop(0, rgba(C.goud, 0.35 * op)); g.addColorStop(1, rgba(C.goud, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(1130, 500, 220, 0, 6.283); ctx.fill(); }
      b_stamcel(ctx, 1130, 500, 130, t, 1, 1); naamBij(ctx, 'bètacel', '', 1130, 690, 1, 'center', b_BETA);
      b_gelWand(ctx, wx, 190, 810, dik, [], 0, 1); naamBij(ctx, 'gel', '', wx, 172, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 1690, 172, 1, 'center', b_BLOEDL);
      const st = q.on('stijging', 1, 1.2), nm = q.on('normaal', 1, 2); const n = Math.round(6 + 10 * st * (1 - 0.7 * nm));
      for (let i = 0; i < n; i++) { const w = wander(i + 30, t, 30, 0.6); glucoseDeeltje(ctx, wx + dik / 2 + 60 + hash(i * 5) * 380 + w.x, 230 + hash(i * 5 + 1) * 540 + w.y, 11, clamp((n - i), 0, 1)); }
      // glucose diffundeert door de gel; snelheid hangt af van de dikte
      const sp = 0.5 * 46 / dik; for (let k = 0; k < 4; k++) { const u = (t * sp + k / 4) % 1; glucoseDeeltje(ctx, lerp(wx + dik / 2 + 40, 1260, u), 380 + k * 70 + Math.sin(u * 8 + k) * 14, 10, Math.sin(u * Math.PI) * (0.4 + 0.6 * st)); }
      const ia = q.on('insuline', 1, 0.8); for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1; b_insuline(ctx, lerp(1250, 1800, u), 300 + k * 80 + Math.sin(u * 6) * 16, 11, ia * Math.sin(u * Math.PI)); }
      naamBij(ctx, 'te dik: glucose komt traag aan', '', 1580, 860 - 20, q.on('dik', 1) * (1 - q.on('diffunderen', 1)), 'center', C.koraal);
      ctx.restore(); }
    punten(ctx, [{ t: 'Bètacellen merken een glucosestijging snel op', a: q.on('Twee', 2), v: q.on('opmerken', 2) }, { t: 'Zo geven ze op tijd insuline af', a: q.on('Twee', 2), v: q.on('afgeven', 1) }], 70, 420, 880, 1, { px: 32 }); },

  // ================= Biologische productie van waterstofgas =================
  s65(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW, q.on('vierde', 1, 0.5));
    const ha = ramp(t, 0.3, 0.6) * (1 - q.on('eerste', 1, 0.4)); if (ha > 0.01) { const vb = q.on('verbranding', 1, 1.0), wa = q.on('water', 2, 0.7);
      b_verbranding(ctx, t, 960, 480, { a: ha, vb, wa });
      naamBij(ctx, 'waterstofgas (H₂)', '', 530, 700, q.on('Waterstofgas', 1) * (1 - vb) * ha, 'center', C.text);
      naamBij(ctx, 'zuurstof (O₂)', '', 1390, 700, q.on('verbranding', 1) * (1 - vb) * ha, 'center', C.text);
      naamBij(ctx, 'verbranding', '', 960, 700, vb * (1 - wa) * ha, 'center', C.koraal);
      naamBij(ctx, 'alleen water (H₂O)', '', 960, 700, wa * ha, 'center', C.teal);
      ctx.save(); ctx.globalAlpha *= vb * ha; text(ctx, '2 H₂ + O₂  →  2 H₂O', 960, 290, fTekst(54, 700), C.text, 'center'); ctx.restore(); }
    b_reactoren(ctx, t, { r1: q.on('eerste', 1), bio: q.on('aardappelschillen', 1), schil: q.on('aardappelschillen', 1), gas: q.on('waterstofgas', 2), r2: q.on('tweede', 1), pomp: q.on('zuren', 2), licht: q.on('licht', 1), scheider: q.on('meer', 1), belT: 1 }); },

  s66(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 27, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Noem', 'twee typen polysachariden in aardappelschillen', 70, 170, 820, q.on('Noem', 1, 0.6));
    const pc = q.on('Plantencellen', 1, 0.8); const aa = q.on('aardappelschillen', 1) * (1 - pc);
    b_aardappel(ctx, 1300, 450, 1.4, aa, { schil: 1 }); naamBij(ctx, 'aardappelschil', '', 1560, 640, aa, 'center', '#D2B48C');
    b_plantcel(ctx, 1360, 380, 600, 330, t, { a: pc, wand: q.on('cellulose', 1, 0.8), zetmeel: q.on('zetmeel', 1, 0.8) });
    naamBij(ctx, 'celwand', '', 1680, 600, q.on('cellulose', 1) * pc, 'left', C.groen); naamBij(ctx, 'zetmeelkorrels', '', 1360, 590, q.on('zetmeel', 1) * pc, 'center', '#F2EEDC');
    b_ketenRecht(ctx, 1010, 690, 8, 15, C.groen, q.on('cellulose', 1)); naamBij(ctx, 'cellulose', '', 1080, 770, q.on('cellulose', 1), 'left', C.groen);
    b_ketenVertakt(ctx, 1440, 690, 13, C.teal, q.on('zetmeel', 1), 0); naamBij(ctx, 'zetmeel', '', 1700, 770, q.on('zetmeel', 1), 'left', C.teal);
    punten(ctx, [{ t: 'Cellulose en zetmeel', a: q.on('antwoord', 1), v: q.on('zetmeel', 2) }], 70, 380, 820, 1, { px: 34 });
    tag(ctx, 'ook goed: amylose, amylopectine', 480, 560, C.groen, q.on('Amylose', 1), 'center', 30);
    valkuil(ctx, 'Glycogeen, chitine, lignine', 70, 620, 820, q.on('Glycogeen', 1)); },

  s67(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 28, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Wat is', 'het belang van NAD⁺ voor de bacterie?', 70, 170, 800, q.on('belang', 1, 0.6));
    const ra = q.on('hydrogenase', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; roundRect(ctx, 1050, 150, 720, 90, 14); shape(ctx, rgba(EX.papier, 0.9), EX.papierR, 2); text(ctx, 'H⁺ + NADH  →  H₂ + NAD⁺', 1410, 210, fTekst(40, 700), C.text, 'center'); ctx.restore(); }
    const cx = 1410, cy = 560, rx = 250, ry = 150; const kring = q.on('glycolyse', 1, 0.8); const op = q.on('Raakt', 1, 1) * (1 - q.on('antwoord', 1, 1)), stop = q.on('stopt', 1) * (1 - q.on('antwoord', 1, 1));
    if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring;
      ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]);
      // links: glycolyse (glucose → 2 pyrodruivenzuur), rechts: hydrogenase
      const lx = cx - rx - 150, hx = cx + rx + 110; roundRect(ctx, lx - 90, cy - 40, 180, 80, 20); shape(ctx, rgba(C.oker, 0.16 + 0.2 * q.on('elektronen', 1)), C.oker, 2.5); text(ctx, 'glycolyse', lx, cy + 10, fTekst(30, 700), C.text, 'center');
      b_hydrogenase(ctx, hx, cy, 0.9, 1 - 0.7 * op, t); text(ctx, 'hydrogenase', hx, cy + 108, fTekst(26, 700), C.text2, 'center'); kruis(ctx, hx, cy, 30, op);
      const loop = 1 - 0.95 * op; const gt = t * 0.25 * loop;
      for (let k = 0; k < 2; k++) { const u = (gt + k / 2) % 1; if (u < 0.5) hexagon(ctx, lerp(lx - 150, lx - 105, u / 0.5), cy, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); else { const e = (u - 0.5) / 0.5; b_pyro(ctx, lx - 30 - e * 40, cy + 60 + e * 90, 0.9, 1 - e); b_pyro(ctx, lx + 30 + e * 30, cy + 60 + e * 100, 0.9, 1 - e); } }
      if (stop > 0.01) { hexagon(ctx, lx - 125, cy, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); hexagon(ctx, lx - 160, cy + 6, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); stempel(ctx, lx, cy - 90, 'STOP', C.koraal, stop); }
      // NAD-tokens rond de kring; bij 'op' schuiven ze allemaal als NADH naar de hydrogenase toe en blijven staan
      for (let k = 0; k < 6; k++) { let an = (t * 0.6 * loop + k / 6 * 6.283) % 6.283; let fy = 1; if (op > 0.01) { an = lerp(an, 4.7 + (k >> 1) * 0.5, op); fy = op * (k % 2 ? 44 : 0); }
        const px = cx + Math.cos(an) * rx, py = cy + Math.sin(an) * ry + fy; const plus = an < Math.PI - 0.05 && op < 0.5; b_nadToken(ctx, px, py, 1, plus);
        if (!plus && an > 6.0 && op < 0.5) b_h2(ctx, hx + 20, cy - 60 - (an - 6.0) * 300, 1.1, 1 - (an - 6.0) / 0.28); }
      naamBij(ctx, 'neemt elektronen op', '', lx - 20, cy - 70, q.on('elektronen', 1) * (1 - q.on('Raakt', 1)), 'center', C.oker);
      ctx.restore(); }
    punten(ctx, [{ t: 'NAD⁺ komt weer vrij, dus de glycolyse (anaerobe dissimilatie) kan doorgaan', a: q.on('antwoord', 1), v: q.on('doorgaan', 1) }], 70, 420, 800, 1, { px: 32 });
    tag(ctx, 'zelfde principe: melkzuurgisting', 470, 700, C.teal, q.on('Hetzelfde', 1), 'center', 30); },

  s68(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 29, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'leefwijze hebben de purperbacteriën in reactor 2?', 70, 170, 780, q.on('Welke', 1, 0.6));
    // reactor 2 met purperbacteriën, licht en organische zuren, geen CO2-opname
    const ra = q.on('purperbacteriën', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; const fx = 380, fy = 640;
      roundRect(ctx, fx - 150, fy - 140, 300, 260, 18); shape(ctx, rgba('#8FA0B5', 0.2), C.text2, 3);
      for (let i = 0; i < 8; i++) { const w = wander(i + 60, t, 14, 0.7); bacterie(ctx, fx - 100 + (i % 4) * 66 + w.x, fy - 70 + Math.floor(i / 4) * 110 + w.y, 0.7, i + Math.sin(t + i) * 0.3, 1, b_PURPER); }
      naamBij(ctx, 'purperbacteriën', '', fx, fy + 170, 1, 'center', b_PURPER);
      const la = q.on('licht', 1); zon(ctx, fx + 300, fy - 120, 34, la, t); for (let k = 0; k < 3; k++) pijl(ctx, fx + 250, fy - 90 + k * 30, fx + 165, fy - 60 + k * 40, C.goud, la, 3, 12);
      const ca = q.on('koolstofdioxide', 1); b_co2(ctx, fx + 290, fy + 60, 1.6, ca); kruis(ctx, fx + 290, fy + 60, 34, ca);
      const za = q.on('zuren', 1); for (let k = 0; k < 3; k++) b_pyro(ctx, fx - 230 + Math.sin(t + k) * 6, fy - 60 + k * 60, 1, za, C.oker); naamBij(ctx, 'organische zuren', '', fx - 230, fy - 120, za, 'center', C.oker);
      ctx.restore(); }
    b_raster(ctx, 900, 190, 950, 600, { a: q.on('Splits', 1), rij: q.on('Foto', 1) * (1 - q.on('Auto', 1)), kol: q.on('Auto', 1), fotoK: q.on('foto', 2, 0.8), heteroK: q.on('hetero', 2, 0.8), goed: q.on('antwoord', 1, 0.6) }); },

  s69(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 30, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Verklaar', 'waarom het proces toch koolstofdioxideneutraal genoemd kan worden', 70, 170, 800, q.on('Toch', 1, 0.6));
    const la = q.on('beide', 1), fs = q.on('fossiele', 1, 1.2); const nLucht = 8 + Math.round(8 * q.on('fossiele', 1, 3));
    if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; roundRect(ctx, 960, 140, 880, 170, 26); shape(ctx, rgba(C.teal, 0.08), rgba(C.teal, 0.5), 2); metaText(ctx, 'lucht', 990, 180, C.text2, 'left', 20);
      for (let i = 0; i < nLucht; i++) { const w = wander(i + 80, t, 20, 0.5); b_co2(ctx, 1020 + hash(i * 3 + 2) * 780 + w.x, 220 + hash(i * 3 + 4) * 70 + w.y, 1, i < 8 ? 1 : clamp(fs * 3 - (i - 8) * 0.3, 0, 1), i); }
      ctx.restore(); }
    const pa = q.on('aardappelschillen', 1), ra = q.on('beide', 1); b_plant(ctx, 1080, 690, 1, pa, t); naamBij(ctx, 'aardappelplant', '', 1080, 840, pa, 'center', C.groen);
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; const fx = 1670, fy = 640; roundRect(ctx, fx - 100, fy - 90, 200, 180, 14); shape(ctx, rgba('#8FA0B5', 0.2), C.text2, 3); for (let i = 0; i < 5; i++) bacterie(ctx, fx - 60 + (i % 3) * 60, fy - 30 + Math.floor(i / 3) * 70, 0.55, i + t * 0.3, 1, C.koraal); ctx.restore(); naamBij(ctx, 'reactoren', '', 1670, 770, ra, 'center'); }
    // korte kringloop: lucht → plant (fotosynthese) → schillen → reactor → lucht
    const fa = q.on('fotosynthese', 1), sa = q.on('aardappelschillen', 1, 1), va = q.on('beide', 1, 1);
    const pad = (pts, a, col, n) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); const e = pts[pts.length - 1], d = pts[pts.length - 2]; pijl(ctx, d[0], d[1], e[0], e[1], col, 1, 4, 16);
      for (let k = 0; k < n; k++) { const p = padPunt(pts, (t * 0.2 + k / n) % 1, false); b_co2(ctx, p[0], p[1], 0.8, 1); } ctx.restore(); };
    pad([[1150, 320], [1110, 420], [1090, 480]], fa, C.groen, 2); naamBij(ctx, 'fotosynthese', '', 1160, 420, fa, 'left', C.groen);
    if (sa > 0.01) { for (let k = 0; k < 2; k++) { const u = (t * 0.25 + k / 2) % 1; ctx.save(); ctx.globalAlpha *= sa; ctx.translate(lerp(1160, 1560, u), 700 - Math.sin(u * Math.PI) * 50); ctx.rotate(u * 3); roundRect(ctx, -16, -6, 32, 12, 6); shape(ctx, '#B08A5C', '#D2B48C', 1.5); ctx.restore(); } pijl(ctx, 1500, 700, 1560, 690, C.oker, sa, 3, 14); }
    pad([[1690, 540], [1720, 430], [1700, 320]], va, C.koraal, 2);
    if (fs > 0.01) { b_olie(ctx, 1280, 770, 260, 90, fs); naamBij(ctx, 'miljoenen jaren vast', '', 1410, 760, q.on('miljoenen', 1), 'center', C.text2); pad([[1410, 760], [1400, 520], [1400, 320]], fs, C.koraal, 3); }
    punten(ctx, [{ t: 'De CO₂ die vrijkomt, is kort ervoor opgenomen bij de fotosynthese', a: q.on('kort', 1), v: q.on('fotosynthese', 1) }], 70, 470, 800, 1, { px: 32 }); },

  // ================= Wat neem je mee? =================
  s86(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CN, q.on('leer', 1, 0.5));
    const na = Math.min(1, t / 0.4); const an = persoon(ctx, 'noor', 330, 860, 560, { t, a: na, uit: 'blij', pose: 'vasthouden', hold: (c, x, y) => b_boekje(c, x + 8, y - 20, 1.1, 1) });
    naamBij(ctx, 'Noor', '', 330, (an.top || 300) - 22, na, 'center'); vink_(ctx, 470, 230, 36, q.on('examen', 1, 0.6));
    const tips = [['Punten = aantal schakels in je antwoord', 'punten'], ['Wantrouw nooit en altijd', 'nooit'], ['Lees een stamboom, gel of grafiek eerst rustig', 'stamboom'], ['De tussenstap staat vaak al in de tekst', 'tussenstap']];
    let y = 160; tips.forEach(([s, w]) => { const h = tipKaart(ctx, s, 640, y, 1220, q.on(w, 1)); y += 128; }); },

  s87(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CN);
    const an = persoon(ctx, 'noor', 330, 860, 560, { t, uit: 'lacht', pose: q.on('Succes', 1) > 0.5 ? 'zwaai' : 'staan' }); naamBij(ctx, 'Noor', '', 330, (an.top || 300) - 22, 1 - q.on('Examenatlas', 1), 'center');
    b_atlas(ctx, 1150, 470, 1.15, q.on('Examenatlas', 1, 0.6), t, ramp(t, q.at('onderwerpen', 1), 2)); }
});
