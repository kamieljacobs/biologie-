// De cyclus 1.0 — scènes per alinea (7 nov 2026). Eén regelkring (LUS) die het hele eerste hoofdstuk blijft staan,
// één cyclusgrafiek (rechts) die in hoofdstuk 2–4 meegroeit, en het eierstokvak (links) waarin dezelfde follikels groeien,
// afsterven, openscheuren en een geel lichaam worden. Geen namen van personages in stem of beeld.
const L = { bx: 820, by: 230, bs: 0.42, zx: 820, zy: 700, mx: 1330, my: 360, mh: 380 };
function lusMan(ctx, t, o = {}) { // o: stim (stroom FSH/LH 0..1), terug (testo-stroom), rem (gloed), lvl (meter), a, extra (testo uit spuit), eigen (testo uit zaadbal)
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  brein(ctx, L.bx, L.by, L.bs, a, { gloed: o.gloed || 0, rem: o.remB || 0, namen: o.namen });
  ctx.save(); ctx.globalAlpha *= a * (o.za == null ? 1 : o.za); zaadbalDoorsnede(ctx, L.zx, L.zy, 170, 112, {}); naamBij(ctx, 'zaadbal', null, L.zx - 190, L.zy + 8, 1, 'right'); ctx.restore();
  const P1 = [[L.bx + 8, L.by + 80], [L.bx + 8, L.by + 220], [L.bx + 8, L.zy - 130]];
  koppel(ctx, P1, '+', a * (o.ka == null ? 1 : o.ka), o.stimGl || 0, { teken: 0.45 });
  stroom(ctx, [[L.bx - 26, L.by + 90], [L.bx - 26, L.zy - 128]], 'fsh', (o.stim == null ? 1 : o.stim) * 0.8, t, a * (o.ka == null ? 1 : o.ka), { n: 5, r: 10 });
  stroom(ctx, [[L.bx + 42, L.by + 90], [L.bx + 42, L.zy - 128]], 'lh', (o.stim == null ? 1 : o.stim) * 0.8, t, a * (o.ka == null ? 1 : o.ka), { n: 5, r: 10, fase: 0.5 });
  if ((o.ka == null ? 1 : o.ka) > 0.01) { chip(ctx, 'FSH', L.bx - 92, L.by + 300, HC.fsh, a * (o.ka == null ? 1 : o.ka), 24); chip(ctx, 'LH', L.bx + 110, L.by + 300, HC.lh, a * (o.ka == null ? 1 : o.ka), 24); }
  const P2 = [[L.zx + 175, L.zy - 10], [L.zx + 300, L.zy - 60], [L.zx + 300, L.by + 140], [L.bx + 120, L.by + 40]];
  const ra = a * (o.ra == null ? 1 : o.ra);
  if (ra > 0.01) { koppel(ctx, P2, 'rem', ra, o.remGl || 0, { teken: 0.55, gloed: C.text }); stroom(ctx, P2, 'testo', o.terug == null ? 0.8 : o.terug, t, ra, { n: 6, r: 10 }); }
  if (o.ma > 0.01) meter(ctx, L.mx, L.my, L.mh, o.lvl == null ? 0.5 : o.lvl, HC.testo, 'testosteron', o.ma * a, { band: o.band ? [0.42, 0.62] : null, sub: 'in het bloed' });
}

Object.assign(SCENES, {
  title(ctx, t) { pillenstrip(ctx, 1460, 640, 0.62, 9, 0.55); },

  // ---------- Cold open ----------
  s01(ctx, t, q) {
    const sa = q.on('strip', 1, 0.8); const gen = Math.floor(clamp((t - q.at('elke')) / Math.max(1, q.at('Wat') - q.at('elke')), 0, 1) * 14);
    pillenstrip(ctx, 760, 470, 1, gen, sa);
    const ha = q.on('hormonen', 1) * (1 - q.on('toch', 1, 1.2) * 0.3);
    for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + t * 0.25; hd(ctx, 760 + Math.cos(an) * 520, 470 + Math.sin(an) * 300, i % 2 ? 'prog' : 'oestro', 14, ha); }
    const ga = q.on('eisprong', 1); if (ga > 0.01) { follikel(ctx, 1540, 300, 1, { R: 120 }); kruis(ctx, 1540, 300, 70, ga); tag(ctx, 'geen eisprong', 1540, 470, C.koraal, ga, 'center', 30); ctx.save(); ctx.globalAlpha *= 1; ctx.restore(); }
    vraagteken(ctx, 1540, 720, q.on('tegenhouden', 1), 140);
  },

  // ---------- H1 De rem ----------
  s03(ctx, t, q) { persoon(ctx, 'erik', 300, 880, 560, { t, uit: 'neutraal' });
    const bA = q.on('hypothalamus', 1); const kA = q.on('FSH', 1); const zA = q.on('zaadbal', 1); const tA = q.on('testosteron', 1); const rA = q.on('rijpen', 1);
    lusMan(ctx, t, { a: bA, za: zA, ka: kA, ra: 0, ma: 0, gloed: q.on('GnRH', 1) * (1 - q.on('FSH', 1)) });
    if (q.on('GnRH', 1) > 0.01) { chip(ctx, 'GnRH', L.bx + 170, L.by - 70, HC.gnrh, q.on('GnRH', 1), 24); stroom(ctx, [[L.bx - 4, L.by - 6], [L.bx + 4, L.by + 60]], 'gnrh', 0.8, t, q.on('GnRH', 1), { n: 3, r: 7 }); }
    if (tA > 0.01) { stroom(ctx, [[L.zx + 175, L.zy], [L.mx - 40, L.zy - 40]], 'testo', 0.8, t, tA, { n: 5, r: 10 }); meter(ctx, L.mx, L.my, L.mh, 0.5 * tA, HC.testo, 'testosteron', tA, { sub: 'in het bloed' }); }
    if (rA > 0.01) { for (let i = 0; i < 6; i++) zaadcelEcht(ctx, L.zx + 230 + i * 34, L.zy + 120 + Math.sin(t * 3 + i) * 6, -0.2, t + i, 0.5, { a: rA }); chip(ctx, 'zaadcellen rijpen', L.zx + 330, L.zy + 175, C.text, rA, 22); }
  },
  s04(ctx, t, q) { persoon(ctx, 'erik', 300, 880, 560, { t, uit: 'neutraal' });
    // eenvoudig model van de lus: niveau volgt de cue-woorden
    const up1 = q.on('Stijgt', 1, 1.6), down1 = q.on('zakt', 1, 1.6), down2 = q.on('Daalt', 1, 1.2), up2 = q.on('stijgt', 2, 1.6);
    const lvl = 0.5 + 0.28 * up1 - 0.28 * down1 - 0.2 * down2 + 0.2 * up2;
    const rem = clamp((lvl - 0.35) / 0.4, 0, 1);
    lusMan(ctx, t, { ra: q.on('hersenen', 1), terug: 0.4 + lvl, remGl: q.on('remt', 1) * rem, remB: q.on('remt', 1) * rem, stim: 1.2 - rem, lvl, ma: 1, band: q.on('Stijgt', 1) > 0.5 });
    chip(ctx, 'remt', L.zx + 410, L.by + 330, C.text, q.on('remt', 1) * (1 - q.on('Stijgt', 1)), 26);
    chip(ctx, lvl > 0.6 ? 'meer rem: minder LH' : lvl < 0.42 ? 'rem weg: meer LH' : '', L.mx + 10, L.my - 40, C.text, lvl > 0.6 || lvl < 0.42 ? q.on('Stijgt', 1) : 0, 24);
  },
  s05(ctx, t, q) { const lvl = 0.52 + 0.05 * Math.sin(t * 1.2);
    ctx.save(); ctx.globalAlpha *= 1 - 0.55 * q.on('thermostaat', 1); persoon(ctx, 'erik', 300, 880, 560, { t, uit: 'neutraal' }); lusMan(ctx, t, { terug: 0.9, remB: 0.6, remGl: 0.5, stim: 0.7, lvl, ma: 1, band: true }); ctx.restore();
    tag(ctx, 'negatieve terugkoppeling', 1480, 200, C.text, q.on('negatieve', 1), 'center', 40);
    regel(ctx, 'het signaal remt zijn eigen oorzaak', 1480, 262, q.on('oorzaak', 1), C.text2, 28, 'center', 600);
    const ta = q.on('thermostaat', 1); if (ta > 0.01) { ctx.save(); ctx.globalAlpha *= ta; roundRect(ctx, 1150, 300, 660, 520, 24); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 2); ctx.restore();
      const warm = q.on('warm', 1, 2.5); const gem = lerp(0.3, 0.52, warm); thermostaat(ctx, 1330, 520, 130, gem, ta, { instel: 0.5 }); radiator(ctx, 1520, 520, 1 - q.on('slaat', 1, 1.2), t, ta);
      text(ctx, 'instelling', 1330, 700, fTekst(24, 700), C.goud, 'center', 'alphabetic'); text(ctx, 'gemeten', 1330, 734, fTekst(24, 700), C.koraal, 'center');
      chip(ctx, 'warm genoeg: verwarming uit', 1480, 790, C.text, q.on('slaat', 1), 24); }
  },
  s06(ctx, t, q) { persoon(ctx, 'erik', 420, 880, 600, { t, uit: 'neutraal' }); halter(ctx, 600, 860, 1, 1);
    const sp = q.on('spuit', 1); if (sp > 0.01) { ctx.save(); ctx.translate(540, 560); ctx.scale(-1, 1); injectiespuit(ctx, 0, 0, 2.4, { a: sp }); ctx.restore(); tag(ctx, 'extra testosteron', 760, 470, HC.testo, sp, 'center', 26); for (let i = 0; i < 6; i++) hd(ctx, 640 + i * 50, 640 + Math.sin(t * 2 + i) * 10, 'testo', 16, sp); }
    const vs = [['LH ?', HC.lh, 'LH'], ['eigen testosteron ?', HC.testo, 'maakt'], ['zaadcellen ?', C.text, 'zaadcellen']];
    vs.forEach(([s, c, w], i) => chip(ctx, s, 1380, 330 + i * 130, c, q.on(w, 1), 30));
    vraagteken(ctx, 1380, 800, q.on('denk', 1), 90);
  },
  s08(ctx, t, q) { persoon(ctx, 'erik', 300, 880, 560, { t, uit: 'neutraal' });
    const rem = q.on('remt', 1, 1.2); const laag = q.on('minder', 1, 1.6); const zelf = q.on('zelf', 1, 1.6);
    lusMan(ctx, t, { terug: 1.4, remGl: rem, remB: rem, stim: 1 - 0.85 * laag, lvl: 0.95, ma: 1, band: true });
    hd(ctx, L.mx + 70, L.my + 40, 'testo', 14, 1); chip(ctx, 'uit de spuit', L.mx + 90, L.my - 30, HC.testo, 1, 22);
    chip(ctx, 'minder LH en FSH', L.bx - 210, L.by + 210, C.text, laag, 26);
    // zoom naast de zaadbal: hoeveel testosteron ín de zaadbal
    const za = q.on('nodig', 1); if (za > 0.01) { zoomNaast(ctx, L.zx + 160, L.zy, 1650, 620, 190, za, 'in de zaadbal', () => {
        const hoog = lerp(1, 0.25, zelf * (1 - 0) + 0 * 1); const nZ = Math.round(lerp(14, 3, q.on('rijpen', 1, 1.5)));
        meter(ctx, 1580, 500, 210, 0.95, HC.testo, '', 1, {}); meter(ctx, 1720, 500, 210, lerp(0.95, 0.25, zelf), HC.testo, '', 1, {});
        text(ctx, 'nodig', 1580, 745, fTekst(22, 700), C.text, 'center'); text(ctx, 'nu', 1720, 745, fTekst(22, 700), C.text, 'center');
        for (let i = 0; i < nZ; i++) zaadcelEcht(ctx, 1530 + (i % 7) * 36, 460 + Math.floor(i / 7) * 30, 0, t + i, 0.3, {}); }); }
    chip(ctx, 'veel hoger dan in het bloed', 1650, 390, HC.testo, q.on('hoger', 1) * (1 - 0), 22);
    chip(ctx, 'minder zaadcellen', 1650, 850, C.koraal, q.on('rijpen', 1), 24);
  },

  // ---------- H2 Eén follikel wint ----------
  s09(ctx, t, q) { vrouwOrganenVoor(ctx, 440, 470, 1.15, {}); naamBij(ctx, 'eierstok', null, 175, 400, q.on('vrouw', 1), 'center'); naamBij(ctx, 'baarmoeder', null, 440, 640, q.on('vrouw', 1), 'center');
    const ga = q.on('cyclus', 1); cyclusGrafiek(ctx, GR, { a: ga, la: { fsh: 0.35, lh: 0.35, oestro: 0.35, prog: 0.35, slijm: 0.35 }, namen: 0, dag: 0.5, cursor: q.on('Dag', 1), menstr: q.on('menstruatie', 1) });
    chip(ctx, 'ongeveer 4 weken', GR.x + GR.w / 2, GR.y - 40, C.text, q.on('weken', 1), 26);
  },
  s10(ctx, t, q) { const za = q.on('eierstok', 1); const ex = 470, ey = 470;
    eierstokVak(ctx, ex, ey, za, { groei: q.on('groeien', 1, 3) });
    if (q.on('follikel', 1) > 0.01) { const [fx, fy] = folPos(ex, ey); naamBij(ctx, 'follikel', 'blaasje van hulpcellen', fx, fy + 190, q.on('follikel', 1), 'center'); }
    const fsh = q.on('FSH', 1); for (let i = 0; i < 8; i++) hd(ctx, ex - 360 + i * 100, 120 + ((t * 40 + i * 37) % 120), 'fsh', 10, fsh * (1 - 0.3 * q.on('maken', 1)));
    const oe = q.on('oestrogeen', 1); for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; hd(ctx, ex + 380 + u * 120, ey - 120 + i * 50, 'oestro', 11, oe * Math.min(1, (1 - u) * 4)); }
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(1, 6, q.on('FSH', 1, 2)), lh: 0, oestro: lerp(0, 7, q.on('oestrogeen', 1, 1.5)), prog: 0, slijm: 5 }, menstr: 1 - q.on('FSH', 1), dag: lerp(1, 7, q.on('groeien', 1, 4)) });
  },
  s11(ctx, t, q) { const ex = 470, ey = 470;
    eierstokVak(ctx, ex, ey, 1, { groei: 1, sterf: q.on('Eén', 1, 3.5) });
    const sa = q.on('baarmoederslijmvlies', 1) * (1 - q.on('remt', 1)); if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; roundRect(ctx, 120, 640, 700, 230, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2); baarmoederwand(ctx, 470, 760, 600, 190, lerp(0.25, 0.5, q.on('dikker', 1, 2)), {}); ctx.restore(); }
    const ra = q.on('remt', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; roundRect(ctx, 120, 650, 700, 220, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2); ctx.restore();
      chip(ctx, 'hypofyse', 280, 720, C.text, ra, 26); chip(ctx, 'follikels', 660, 720, C.text, ra, 26); koppel(ctx, [[600, 790], [470, 810], [345, 790]], 'rem', ra, q.on('negatieve', 1)); stroom(ctx, [[600, 790], [470, 810], [345, 790]], 'oestro', 0.7, t, ra, { n: 3 });
      regel(ctx, 'weer negatieve terugkoppeling', 470, 860, q.on('negatieve', 1), C.text2, 24, 'center', 600); }
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(7, 11, q.on('daalt', 1, 1.5)), lh: 0, oestro: lerp(7, 10, q.on('remt', 1, 3)), prog: 0, slijm: lerp(5, 10, q.on('dikker', 1, 2)) }, dag: lerp(7, 11, q.on('daalt', 1, 3)), dik: { fsh: q.on('daalt', 1) > 0.3 && q.on('nodig', 1) < 0.5 } });
  },
  s12(ctx, t, q) { const ex = 470, ey = 470;
    eierstokVak(ctx, ex, ey, 1, { groei: 1, sterf: 0.8 + 0.2 * q.on('één', 1, 2), dom: q.on('groeit', 1, 4) * 0.6, receptor: q.on('receptoren', 1), volg: q.on('Alleen', 1) });
    const [fx, fy] = folPos(ex, ey); chip(ctx, 'meeste receptoren voor FSH', fx, fy - 170, HC.fsh, q.on('receptoren', 1) * (1 - q.on('Niemand', 1)), 24);
    chip(ctx, 'niemand kiest: hij houdt het langst vol', ex, 160, C.goud, q.on('Niemand', 1), 26);
    cyclusGrafiek(ctx, GR, { tot: { fsh: 11.5, lh: 0, oestro: lerp(10, 11.5, q.on('groeit', 1, 3)), prog: 0, slijm: 11 }, dag: 11.5 });
  },
  s13(ctx, t, q) { const ex = 470, ey = 470;
    eierstokVak(ctx, ex, ey, 1, { groei: 0.4 });
    const sp = q.on('prik', 1); injectiespuit(ctx, 1150, 320, 4, { a: sp }); for (let i = 0; i < 10; i++) hd(ctx, 1160 + (i % 5) * 70, 420 + Math.floor(i / 5) * 60, 'fsh', 13, sp);
    tag(ctx, 'elke dag veel FSH', 1300, 220, HC.fsh, sp, 'center', 30); vraagteken(ctx, 1400, 700, q.on('denk', 1), 110);
  },
  s15(ctx, t, q) { const ex = 470, ey = 470; const al = q.on('genoeg', 1, 3);
    eierstokVak(ctx, ex, ey, 1, { groei: 1, alle: al });
    for (let i = 0; i < 8; i++) hd(ctx, ex - 360 + i * 100, 120 + ((t * 40 + i * 37) % 120), 'fsh', 10, 1);
    chip(ctx, 'de wedstrijd valt weg', ex, 160, C.goud, q.on('wedstrijd', 1), 26);
    chip(ctx, 'meerdere follikels tegelijk', 1360, 520, C.text, q.on('meerdere', 1), 30); chip(ctx, 'zo werkt ivf', 1360, 620, C.text2, q.on('artsen', 1), 26);
    injectiespuit(ctx, 1150, 320, 4, { a: 1 - q.on('meerdere', 1) });
  },

  // ---------- H3 Van rem naar gaspedaal ----------
  s16(ctx, t, q) { const om = q.on('slaat', 1, 1.6);
    const ex = 470, ey = 560; eierstokVak(ctx, ex, ey, 0.9, { groei: 1, sterf: 1, dom: 0.6 + 0.3 * q.on('steeds', 1, 3) });
    chip(ctx, 'hypofyse', 470, 120, C.text, 1, 28);
    const P = [[ex + 300, 300], [ex + 260, 210], [ex + 90, 140]];
    if (om < 0.5) koppel(ctx, P, 'rem', 1 - om * 2, q.on('remt', 1) * (1 - om), { teken: 0.5 }); else koppel(ctx, P, '+', (om - 0.5) * 2, 0.6, { teken: 0.5, gloed: C.goud });
    stroom(ctx, P, 'oestro', lerp(0.5, 1.2, q.on('steeds', 1, 3)), t, 1, { n: 5 });
    const [mx, my] = bioPunt(bioDicht(P, 40), 0.5); tekenMorph(ctx, mx, my, om, 1, 28);
    chip(ctx, om < 0.5 ? 'weinig oestrogeen: rem' : 'lang veel oestrogeen: gaspedaal', ex + 380, 360, om < 0.5 ? C.text : C.goud, q.on('Zolang', 1), 26);
    const lh = q.on('LH', 1); stroom(ctx, [[ex - 60, 150], [ex - 120, 330]], 'lh', lh, t, lh, { n: 4 });
    cyclusGrafiek(ctx, GR, { tot: { fsh: 12, lh: lerp(11, 12.6, lh), oestro: lerp(11.5, 12.8, q.on('steeds', 1, 3)), prog: 0, slijm: 12.5 }, dag: 12.6, dik: { oestro: q.on('hoog', 1) > 0.5 && om < 0.9 } });
  },
  s17(ctx, t, q) { const ex = 470, ey = 560; const sp = 1 + 2 * q.on('omhoog', 1, 2);
    eierstokVak(ctx, ex, ey, 0.9, { groei: 1, sterf: 1, dom: 0.95 });
    chip(ctx, 'hypofyse', 470, 120, C.text, 1, 28);
    const P = [[ex + 300, 300], [ex + 260, 210], [ex + 90, 140]]; koppel(ctx, P, '+', 1, 0.8, { teken: 0.5, gloed: C.goud }); stroom(ctx, P, 'oestro', 1.2, t * sp, 1, { n: 6 });
    const P2 = [[ex - 60, 150], [ex - 120, 330]]; koppel(ctx, [[ex - 30, 150], [ex - 90, 330]], '+', q.on('Meer', 1), 0.6, { teken: 0.5, gloed: C.goud }); stroom(ctx, P2, 'lh', lerp(1, 1.6, q.on('omhoog', 1)), t * sp, 1, { n: 6 });
    tag(ctx, 'positieve terugkoppeling', 1420, 110, C.goud, q.on('positieve', 1), 'center', 36); regel(ctx, 'het signaal versterkt zichzelf', 1420, 160, q.on('versterkt', 1), C.text2, 28, 'center', 600);
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(12, 14, q.on('omhoog', 1, 2)), lh: lerp(12.6, 14.1, q.on('omhoog', 1, 2)), oestro: 13, prog: 0, slijm: 13 }, dag: lerp(12.6, 14, q.on('omhoog', 1, 2)), piek: q.on('piek', 1), dik: { lh: true } });
  },
  s18(ctx, t, q) { const ex = 470, ey = 560; const [fx, fy] = folPos(ex, ey); const sc = q.on('openscheuren', 1, 1.2);
    eierstokVak(ctx, ex, ey, 0.9, { groei: 1, sterf: 1, dom: 0.95 });
    if (sc > 0.01) { const ui = q.on('vrij', 1, 2.5); ctx.save(); ctx.globalAlpha *= sc; ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(fx, fy, 128, -1.1, -0.5); ctx.stroke(); ctx.restore();
      eicelEcht(ctx, fx + 90 + ui * 300, fy - 90 - ui * 200, 34, sc, true); naamBij(ctx, 'eicel', null, fx + 90 + ui * 300, fy - 150 - ui * 200, ui, 'center'); }
    tag(ctx, 'eisprong', fx + 260, fy + 120, C.text, q.on('eisprong', 1), 'center', 30);
    const br = q.on('doorbroken', 1); chip(ctx, 'hypofyse', 470, 120, C.text, 1, 28);
    const P = [[ex + 300, 300], [ex + 260, 210], [ex + 90, 140]]; koppel(ctx, P, '+', 1 - 0.75 * q.on('terug', 1), 0.4 * (1 - q.on('terug', 1)), { teken: 0.5, gloed: C.goud });
    if (br > 0.01) { kruis(ctx, ex + 270, 220, 34, br, C.text); }
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(14, 16.5, q.on('terug', 1, 2)), lh: lerp(14.1, 16.5, q.on('terug', 1, 2)), oestro: lerp(13, 16.5, q.on('terug', 1, 2)), prog: 0, slijm: 15 }, dag: lerp(14, 16, q.on('terug', 1, 3)), piek: 1, eisprong: q.on('eisprong', 1) });
  },

  // ---------- H4 Het gele lichaam ----------
  s19(ctx, t, q) { const ex = 470, ey = 470; const [fx, fy] = folPos(ex, ey); const gl = q.on('geel', 1, 1.6);
    ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, 430, 270, 0, 0, 6.283); shape(ctx, '#4A3A40', '#C98A7E', 3); ctx.restore();
    ctx.save(); ctx.globalAlpha *= 1 - gl; follikel(ctx, fx, fy, 0.9, { R: 150 }); ctx.restore(); geelLichaam(ctx, fx, fy, 120 * (0.6 + 0.4 * gl), { a: gl }); naamBij(ctx, 'geel lichaam', null, fx, fy + 170, gl, 'center');
    const pr = q.on('progesteron', 1); for (let i = 0; i < 7; i++) { const u = (t * 0.25 + i / 7) % 1; hd(ctx, fx + 140 + u * 220, fy - 150 + i * 46, 'prog', 12, pr * Math.min(1, (1 - u) * 4)); }
    const ba = q.on('klaar', 1); if (ba > 0.01) { ctx.save(); ctx.globalAlpha *= ba; roundRect(ctx, 120, 650, 700, 230, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2); baarmoederwand(ctx, 470, 770, 600, 190, lerp(0.5, 0.9, q.on('dikker', 1, 2)), {}); text(ctx, 'klaar voor een embryo', 470, 680, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
    const ra = q.on('remt', 1); if (ra > 0.01) { chip(ctx, 'hypofyse', 1010 - 330, 120, C.text, ra, 26); koppel(ctx, [[fx + 60, fy - 150], [fx - 60, 170], [1010 - 420, 130]], 'rem', ra, ra, { teken: 0.5 }); chip(ctx, 'geen nieuwe follikels', 680, 220, C.text, q.on('nieuwe', 1), 22); }
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(16.5, 21, q.on('remt', 1, 3)), lh: lerp(16.5, 21, q.on('remt', 1, 3)), oestro: lerp(16.5, 21, q.on('progesteron', 2, 3)), prog: lerp(14, 21, q.on('progesteron', 1, 6)), slijm: lerp(15, 21, q.on('dikker', 1, 3)) }, dag: lerp(16, 21, q.on('progesteron', 1, 8)), piek: 0.5, eisprong: 0.6, dik: { prog: q.on('progesteron', 1) > 0.5 && q.on('remt', 1) < 0.5 } });
  },
  s20(ctx, t, q) { const ex = 470, ey = 470; const [fx, fy] = folPos(ex, ey); const af = q.on('sterft', 1, 3);
    ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, 430, 270, 0, 0, 6.283); shape(ctx, '#4A3A40', '#C98A7E', 3); ctx.restore();
    geelLichaam(ctx, fx, fy, 120 * (1 - 0.6 * af), { a: 1 - 0.8 * af }); naamBij(ctx, af < 0.5 ? 'geel lichaam' : 'geel lichaam sterft af', null, fx, fy + 170, 1, 'center');
    chip(ctx, '± 12 dagen', fx + 230, fy - 60, C.text2, q.on('twaalf', 1), 24);
    const ms = q.on('menstruatie', 1); const lo = q.on('los', 1, 2.5); ctx.save(); roundRect(ctx, 120, 650, 700, 230, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2); baarmoederwand(ctx, 470, 770, 600, 190, 0.9, { los: lo }); ctx.restore(); tag(ctx, 'menstruatie', 470, 700, VK.slijm, ms, 'center', 28);
    const fs = q.on('FSH', 1); if (fs > 0.01) { for (let i = 0; i < 6; i++) hd(ctx, ex - 300 + i * 120, 140 + ((t * 40 + i * 37) % 80), 'fsh', 10, fs); chip(ctx, 'rem weg: FSH stijgt', ex, 160, HC.fsh, fs, 24); }
    const opn = q.on('opnieuw', 1);
    cyclusGrafiek(ctx, GR, { tot: { fsh: lerp(21, 28, q.on('FSH', 1, 2)), lh: lerp(21, 28, q.on('FSH', 1, 2)), oestro: lerp(21, 28, q.on('daalt', 1, 3)), prog: lerp(21, 28, q.on('daalt', 1, 3)), slijm: lerp(21, 28, q.on('menstruatie', 1, 2)) }, dag: opn > 0.5 ? 0.5 : lerp(21, 28, q.on('menstruatie', 1, 3)), piek: 0.5, eisprong: 0.6, menstr: opn });
    chip(ctx, 'de cyclus begint opnieuw', GR.x + GR.w / 2, GR.y - 50, C.text, opn, 26);
  },
  s21(ctx, t, q) { cyclusGrafiek(ctx, { x: 520, y: 140, w: 900 }, { dag: null }); },
  s23(ctx, t, q) { const G = { x: 520, y: 140, w: 900 };
    cyclusGrafiek(ctx, G, { piek: q.on('piek', 1), eisprong: q.on('eisprong', 1), dik: { lh: q.on('piek', 1) > 0.5 && q.on('progesteron', 1) < 0.5, prog: q.on('progesteron', 1) > 0.5 }, la: { fsh: 0.4, oestro: 0.4, slijm: 0.5 } });
    chip(ctx, 'geel lichaam afgestorven: geen embryo', G.x + G.w - 160, G.y + 250 - 40, HC.prog, q.on('afgestorven', 1), 24);
  },

  // ---------- H5 De pil ----------
  s24(ctx, t, q) { const gen = 7 + Math.floor(q.on('dag', 1, 8) * 8); pillenstrip(ctx, 450, 330, 0.62, gen, 1);
    const ha = q.on('bevat', 1); hd(ctx, 280, 580, 'oestro', 20, ha); hd(ctx, 620, 580, 'prog', 20, ha); regel(ctx, 'een vorm van oestrogeen', 280, 640, ha, HC.oestro, 22, 'center', 700); regel(ctx, 'nagemaakt progesteron', 620, 640, ha, HC.prog, 22, 'center', 700);
    ctx.save(); ctx.globalAlpha *= ha; ctx.restore();
    const ra = q.on('remmen', 1);  koppel(ctx, [[300, 670], [400, 740]], 'rem', ra, ra * 0.6, { teken: 0.5 }); koppel(ctx, [[600, 670], [500, 740]], 'rem', ra, ra * 0.6, { teken: 0.5 }); chip(ctx, 'hypofyse', 450, 790, C.text, ra, 26);
    tag(ctx, 'negatieve terugkoppeling, de hele maand', 450, 860, C.text, q.on('negatieve', 1), 'center', 26);
    cyclusGrafiek(ctx, GR, { krommen: PILK, tot: { fsh: 28, lh: 28, oestro: lerp(0, 20.5, q.on('hoog', 1, 3)), prog: lerp(0, 20.5, q.on('hoog', 1, 3)), slijm: 20.5 }, la: { fsh: q.on('remmen', 1), lh: q.on('remmen', 1) }, dag: null });
    regel(ctx, 'met de pil (pilhormonen in het bloed)', GR.x + GR.w / 2, GR.y - 40, 1, C.text2, 24, 'center', 600);
  },
  s25(ctx, t, q) { const ex = 470, ey = 400;
    ctx.save(); ctx.translate(ex, ey); ctx.scale(0.8, 0.8); ctx.translate(-ex, -ey); eierstokVak(ctx, ex, ey, 1, { groei: 0.1 }); ctx.restore();
    chip(ctx, 'geen follikel rijpt', ex, 120, C.text, q.on('rijpen', 1), 26);
    const om = q.on('omslaan', 1); if (om > 0.01) { tekenMorph(ctx, ex + 300, 200, 0.2, om, 28); kruis(ctx, ex + 300, 200, 40, q.on('tegen', 1), C.text); chip(ctx, 'omslaan geblokkeerd', ex + 300, 280, C.goud, q.on('tegen', 1), 22); }
    const sl = q.on('slijm', 1); if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; roundRect(ctx, 120, 650, 700, 230, 16); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 2); ctx.strokeStyle = rgba('#D8E0E8', 0.55); ctx.lineWidth = 3;
      for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.moveTo(140 + hash(i) * 660, 670 + hash(i + 9) * 190); ctx.bezierCurveTo(200 + hash(i + 3) * 600, 670 + hash(i + 5) * 190, 200 + hash(i + 4) * 600, 670 + hash(i + 6) * 190, 140 + hash(i + 7) * 660, 670 + hash(i + 8) * 190); ctx.stroke(); }
      for (let i = 0; i < 5; i++) zaadcelEcht(ctx, 200 + i * 40 + Math.sin(t * 2 + i) * 4, 720 + i * 26, 0.2, t + i, 0.55, {}); text(ctx, 'taai slijm in de baarmoederhals', 470, 860, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
    cyclusGrafiek(ctx, GR, { krommen: PILK, tot: { fsh: 28, lh: 28, oestro: 20.5, prog: 20.5, slijm: 20.5 }, dik: { lh: q.on('LH-piek', 1) > 0.5 } });
    tag(ctx, 'geen LH-piek, geen eisprong', GR.x + GR.w / 2, GR.y + 120, C.goud, q.on('uit', 1), 'center', 26);
  },
  s26(ctx, t, q) { // vwo: eiwithormoon tegenover steroïdhormoon
    const da = 1 - q.on('celmembraan', 1, 1.2) * 0.75;
    ctx.save(); ctx.globalAlpha *= da; roundRect(ctx, 80, 140, 760, 560, 20); shape(ctx, rgba(C.fill, 0.35), C.line, 2); text(ctx, 'in de darm', 460, 190, fTekst(28, 700), C.text2, 'center');
    const ve = q.on('verteerd', 1, 2.5); // FSH valt uiteen in stukjes
    if (ve < 0.95) hd(ctx, 300, 360, 'fsh', 44, 1 - ve); for (let i = 0; i < 6; i++) { const an = i * 1.05; circ(ctx, 300 + Math.cos(an) * 90 * ve, 360 + Math.sin(an) * 70 * ve, 9, rgba(HC.fsh, ve)); }
    text(ctx, 'eiwithormoon: verteerd', 300, 470, fTekst(24, 700), HC.fsh, 'center');
    hd(ctx, 620, 360, 'oestro', 44, q.on('steroïdhormonen', 1)); text(ctx, 'steroïdhormoon: blijft heel', 620, 470, fTekst(24, 700), HC.oestro, 'center', 'alphabetic');
    regel(ctx, 'gemaakt van cholesterol', 620, 510, q.on('cholesterol', 1), C.text2, 22, 'center', 600); ctx.restore();
    // de cel
    const ca = q.on('receptor', 1); if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; const cx = 1400, cy = 1150, R = 760; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = rgba('#2A3550', 0.6); ctx.fill(); membraanBoog(ctx, cx, cy, R, Math.PI * 1.2, Math.PI * 1.8, 1);
      const ra = Math.PI * 1.36; receptorBuiten(ctx, cx + Math.cos(ra) * R, cy + Math.sin(ra) * R, ra + Math.PI / 2, 1); const bind = q.on('binden', 1, 1.5);
      const rr = R + 70 + 160 * (1 - bind); hd(ctx, cx + Math.cos(ra) * rr, cy + Math.sin(ra) * rr, 'fsh', 34, 1);
      text(ctx, 'receptor op het membraan', cx + Math.cos(ra) * (R + 190), cy + Math.sin(ra) * (R + 190), fTekst(22, 700), C.text, 'center');
      const door = q.on('door', 1, 3); const sa = Math.PI * 1.62; const r2 = lerp(R + 120, R - 260, door); hd(ctx, cx + Math.cos(sa) * r2, cy + Math.sin(sa) * r2, 'oestro', 34, q.on('Ze', 3));
      if (q.on('cel', 3) > 0.01) { const rx = cx + Math.cos(sa) * (R - 300), ry = cy + Math.sin(sa) * (R - 300); circ(ctx, rx, ry, 30, rgba('#7A8BA8', 0.9), '#AFC0D0', 2); text(ctx, 'receptor in de cel', rx, ry + 70, fTekst(22, 700), C.text, 'center'); }
      ctx.restore(); }
    tag(ctx, 'waarom een pil, en geen prik?', 960, 80, C.text, q.on('Waarom', 1) * (1 - q.on('eiwithormonen', 1) * 0.0), 'center', 32);
  },
  s27(ctx, t, q) { pillenstrip(ctx, 450, 330, 0.62, 21, 1, { stop: q.on('stopweek', 1) });
    const lo = q.on('los', 1, 2.5); ctx.save(); roundRect(ctx, 120, 620, 700, 250, 16); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2); baarmoederwand(ctx, 470, 750, 600, 190, 0.35, { los: lo }); ctx.restore();
    tag(ctx, 'bloeding', 470, 680, VK.slijm, q.on('bloeding', 1), 'center', 26);
    cyclusGrafiek(ctx, GR, { krommen: PILK, tot: { fsh: 28, lh: 28, oestro: lerp(20.5, 28, q.on('zakken', 1, 2)), prog: lerp(20.5, 28, q.on('zakken', 1, 2)), slijm: lerp(20.5, 28, q.on('los', 1, 2)) } });
    chip(ctx, 'geen echte menstruatie', GR.x + GR.w / 2, GR.y - 50, C.text, q.on('echte', 1), 26); chip(ctx, 'geen eisprong · geen geel lichaam', GR.x + GR.w / 2, GR.y + 330, C.text2, q.on('geen', 2), 24);
  },
  s28(ctx, t, q) { pillenstrip(ctx, 760, 430, 1, 10, 1, { mis: [7, 8, 9] }); chip(ctx, '3 dagen vergeten', 760, 760, C.koraal, q.on('vergeet', 1), 30); vraagteken(ctx, 1480, 470, q.on('denk', 1), 140); },
  s30(ctx, t, q) { pillenstrip(ctx, 450, 300, 0.55, 10, 1, { mis: [7, 8, 9] });
    const ex = 470, ey = 700; ctx.save(); ctx.translate(ex, ey); ctx.scale(0.55, 0.55); ctx.translate(-ex, -ey); eierstokVak(ctx, ex, ey, 1, { groei: 0.2 + 0.8 * q.on('rijpen', 1, 3), sterf: 0.8 * q.on('genoeg', 1, 2), dom: 0.4 * q.on('genoeg', 1, 2) }); ctx.restore();
    chip(ctx, 'een follikel rijpt', ex, ey - 190, C.text, q.on('rijpen', 1), 24);
    const dg = lerp(8, 14, q.on('hormonen', 1, 9)); cyclusGrafiek(ctx, GR, { krommen: Object.assign({}, PILK, VERGEET), tot: { fsh: dg, lh: dg, oestro: dg, prog: dg, slijm: 0 }, rij: { slijm: 0.3 }, dag: dg });
    if (q.on('misschien', 1) > 0.01) { const X = (d) => GR.x + d / 28 * GR.w; const y0 = GR.y + 190; ctx.save(); ctx.globalAlpha *= q.on('misschien', 1); ctx.strokeStyle = HC.lh; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(X(14), y0 - 0.24 * 170); ctx.quadraticCurveTo(X(15), y0 - 1.4 * 170, X(16), y0 - 0.2 * 170); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); vraagteken(ctx, X(15), GR.y - 10, q.on('misschien', 1), 70); }
  },

  // ---------- Recap ----------
  s31(ctx, t, q) { const pan = [[80, 'man: testosteron blijft gelijk', 'testosteron'], [520, 'van een groepje blijft er één over', 'follikels'], [960, 'LH-piek: de rem wordt gaspedaal', 'gaspedaal'], [1400, 'de pil: de rem de hele maand', 'pil']];
    tag(ctx, 'hormonen remmen hun eigen oorzaak', 960, 170, C.text, q.on('remmen', 1), 'center', 36);
    pan.forEach(([x, s, w], i) => { const a = q.on(w, i === 3 ? 1 : 1); if (a <= 0.01) return; paneel(ctx, x, 220, 440, 560, null, a); ctx.save(); ctx.globalAlpha *= a;
      const cx = x + 220;
      if (i === 0) { meter(ctx, cx - 60, 320, 300, 0.52 + 0.04 * Math.sin(t), HC.testo, '', 1, { band: [0.42, 0.62] }); teken(ctx, cx + 80, 470, false, 1, 34); }
      if (i === 1) { for (let k = 0; k < 5; k++) { follikel(ctx, cx - 140 + k * 70, 480, k === 2 ? 0.8 : 0.25, { R: k === 2 ? 110 : 70 }); if (k !== 2) kruis(ctx, cx - 140 + k * 70, 480, 20, 1, C.text2); } }
      if (i === 2) { ctx.strokeStyle = HC.lh; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx - 170, 600); ctx.lineTo(cx - 40, 590); ctx.quadraticCurveTo(cx, 300, cx + 40, 590); ctx.lineTo(cx + 170, 600); ctx.stroke(); teken(ctx, cx + 120, 400, true, 1, 34); }
      if (i === 3) pillenstrip(ctx, cx, 470, 0.5, 12, 1);
      ctx.restore(); wrapTekst(ctx, s, cx, 720, 380, a); });
  },
});
function wrapTekst(ctx, s, x, y, w, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); ctx.fillStyle = C.text; ctx.textAlign = 'center'; const ws = s.split(' '); let l = '', yy = y; for (const wd of ws) { if (ctx.measureText(l + ' ' + wd).width > w && l) { ctx.fillText(l, x, yy); l = wd; yy += 34; } else l = l ? l + ' ' + wd : wd; } ctx.fillText(l, x, yy); ctx.restore(); }
function zoomNaast(ctx, sx, sy, x, y, r, a, caption, draw) { if (a <= 0.01) return; zoomCircle(ctx, x, y, r * (0.6 + 0.4 * ease(a)), sx, sy, caption, a, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); draw(); }); }
// grafiek naast de vraag over de grafiek (q22)
window.VRAAGBEELD = { q22(ctx) { ctx.translate(1290, 40); ctx.scale(0.54, 0.54); cyclusGrafiek(ctx, { x: 0, y: 30, w: 900 }, {}); } };
// elke scène begint met een schone achtergrond (Part C: Schema-navy, Micro-blauwzwart voor het vwo-blok in de cel)
Object.keys(SCENES).forEach(k => { const f = SCENES[k]; if (f.__bg) return; const look = k === 's26' ? 'micro' : 'schema'; const g = function (ctx, t, q, st) { bg(ctx, look); return f(ctx, t, q, st); }; g.__bg = 1; SCENES[k] = g; });
