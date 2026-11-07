// Gedrag 6 · Wiens schuld is het? Interne en externe attributie — scènes per alinea (v1.0, 15 okt 2026). Noor met een 4; drie schuifjes van Weiner; zelfdienende vertekening; Sam groet niet; Jones en Harris; vwo: actor-observer.

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


const INT = '#E0A040', EXT = '#4E9FCF';
function toets(ctx, x, y, s, cijfer, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.06); roundRect(ctx, -90, -120, 180, 240, 8); shape(ctx, '#F4F1E8', '#C9C2B2', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-70, -60 + i * 22); ctx.lineTo(60 - (i % 3) * 20, -60 + i * 22); ctx.stroke(); } text(ctx, 'Biologie', -70, -84, fTekst(20, 700), '#3A3A44', 'left'); circ(ctx, 46, -78, 34, null, col, 4); text(ctx, cijfer, 46, -64, fTitel(44), col, 'center'); ctx.restore(); }
// drie schuifjes van Weiner: waarden 0..1 (0 = links)
const VRAGEN = [['intern', 'extern'], ['blijvend', 'tijdelijk'], ['niet beheersbaar', 'beheersbaar']];
function schuifjes(ctx, x, y, w, vals, o = {}) { const { a = 1, rows = [1, 1, 1], px = 26, gap = 90 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  VRAGEN.forEach(([l, r], i) => { const ra = rows[i]; if (ra <= 0.01) return; ctx.save(); ctx.globalAlpha *= ra; const yy = y + i * gap; ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); text(ctx, l, x - 20, yy + 9, fTekst(px, 600), C.text2, 'right'); text(ctx, r, x + w + 20, yy + 9, fTekst(px, 600), C.text2, 'left'); if (vals && vals[i] != null) { const v = vals[i]; circ(ctx, x + v * w, yy, 18, v < 0.5 ? INT : EXT, '#F2F2EE', 3); } ctx.restore(); });
  ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { persoon(ctx, 'noor', 1400, 880, 520, { uit: 'denkt', pose: 'denk', kijk: -1, t }); toets(ctx, 1640, 520, 1.1, '4', 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'noor', 300, 880, 560, { uit: q.on('vier', 1) > 0.5 ? 'bezorgd' : 'neutraal', pose: 'staan', kijk: 1, t });
    toets(ctx, 620, 520, 1.3, '4', q.on('toets', 1));
    tag(ctx, 'twee keer doorgelezen', 620, 780, C.text2, q.on('doorgelezen', 1), 'center', 26);
    wolk(ctx, 900, 150, 520, 150, 'ik ben gewoon slecht in biologie', q.on('slecht', 1), '#F6E6C8', 28);
    wolk(ctx, 1300, 360, 480, 150, 'die toets was oneerlijk', q.on('oneerlijk', 1), '#D6E8F0', 28);
    wolk(ctx, 900, 560, 560, 150, 'ik heb op de verkeerde manier geleerd', q.on('verkeerde', 1), '#E2F0DC', 28);
    vraagteken(ctx, 1640, 800, q.on('Wat', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const we = q.on('Weiner', 1, 0.8), ki = q.on('Kijk', 1, 0.8);
    regel(ctx, 'attributie: een oorzaak toeschrijven', 140, 140, q.on('attributie', 1) * (1 - ki), C.text, 40, 'left', 700);
    if (we < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - we;
      const i = 0.3 + 0.7 * q.on('interne', 1), e = 0.3 + 0.7 * q.on('externe', 1);
      ctx.save(); ctx.globalAlpha *= i; roundRect(ctx, 200, 230, 700, 560, 20); shape(ctx, rgba(INT, 0.1), INT, 2); text(ctx, 'intern', 550, 300, fTekst(44, 700), INT, 'center'); text(ctx, 'de oorzaak ligt bij de persoon', 550, 350, fTekst(28, 600), C.text, 'center'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= e; roundRect(ctx, 1020, 230, 700, 560, 20); shape(ctx, rgba(EXT, 0.1), EXT, 2); text(ctx, 'extern', 1370, 300, fTekst(44, 700), EXT, 'center'); text(ctx, 'de oorzaak ligt in de situatie', 1370, 350, fTekst(28, 600), C.text, 'center'); ctx.restore();
      [['aanleg', 'aanleg'], ['inzet', 'inzet'], ['karakter', 'karakter']].forEach(([w, s2], k) => chip(ctx, s2, 550, 470 + k * 90, INT, q.on(w, 1), 30));
      [['toets', 'moeilijke toets'], ['lawaai', 'lawaai'], ['pech', 'pech']].forEach(([w, s2], k) => chip(ctx, s2, 1370, 470 + k * 90, EXT, q.on(w, 1), 30));
      ctx.restore(); }
    if (we > 0.01 && ki < 0.99) { ctx.save(); ctx.globalAlpha *= we * (1 - ki); regel(ctx, 'Bernard Weiner: drie vragen', 960, 230, 1, C.text, 40, 'center', 700);
      schuifjes(ctx, 760, 380, 400, [0.5 + 0.4 * Math.sin(t * 1.2), 0.5 + 0.4 * Math.sin(t * 1.5 + 1), 0.5 + 0.4 * Math.sin(t * 1.1 + 2)], { rows: [1, q.on('blijvend', 1), q.on('beheersbaar', 1)], px: 32, gap: 130 }); ctx.restore(); }
    if (ki > 0.01) { ctx.save(); ctx.globalAlpha *= ki; regel(ctx, 'Noors drie gedachten', 140, 140, 1, C.text, 40, 'left', 700);
      const G = [['ik ben slecht in biologie', [0.05, 0.05, 0.05], 'slecht', '#F6E6C8'], ['de toets was oneerlijk', [0.95, 0.25, 0.05], 'oneerlijk', '#D6E8F0'], ['ik heb verkeerd geleerd', [0.05, 0.95, 0.95], 'verkeerd', '#E2F0DC']];
      G.forEach(([s2, v, w, col], k) => { const a = q.on(w, 1); if (a <= 0.01) return; const y = 240 + k * 220; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120, y, 520, 120, 18); shape(ctx, rgba(col, 0.9), null); text(ctx, s2, 380, y + 72, fTekst(30, 700), '#121A26', 'center'); ctx.restore(); schuifjes(ctx, 1000, y + 2, 340, v, { a, px: 24, gap: 54 }); });
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const tr = q.on('trucje', 1, 0.8), to = q.on('Toch', 1, 0.8);
    if (tr < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - tr;
      const rij = (y, s2, col, steps, cues) => { roundRect(ctx, 120, y, 440, 110, 16); shape(ctx, rgba(col, 0.9), null); text(ctx, s2, 340, y + 66, fTekst(28, 700), '#121A26', 'center'); steps.forEach((st, k) => { const a = q.on(cues[k][0], cues[k][1]); const x = 640 + k * 420; pijl(ctx, x - 70, y + 55, x - 10, y + 55, C.line, a, 4, 14); chip(ctx, st[0], x + 160, y + 70, st[1], a, 26); }); };
      ctx.save(); ctx.globalAlpha *= q.on('slecht', 1); rij(250, 'ik ben er gewoon slecht in', '#F6E6C8', [['machteloos', C.koraal], ['minder moeite', C.koraal]], [['machteloos', 1], ['moeite', 1]]); ctx.restore();
      ctx.save(); ctx.globalAlpha *= q.on('verkeerd', 1); rij(500, 'ik heb verkeerd geleerd', '#E2F0DC', [['andere aanpak: oefenvragen', C.groen], ['hoop, motivatie', C.groen]], [['oefenvragen', 1], ['hoop', 1]]); ctx.restore();
      tag(ctx, 'een oorzaak waar je invloed op hebt, geeft hoop', 960, 760, C.goud, q.on('hoop', 1)); ctx.restore(); }
    if (tr > 0.01 && to < 0.99) { ctx.save(); ctx.globalAlpha *= tr * (1 - to); regel(ctx, 'geen trucje', 960, 330, 1, C.text, 54, 'center', 700); regel(ctx, 'soms was de toets echt moeilijk', 960, 420, q.on('moeilijk', 1), C.text2, 34, 'center', 600); regel(ctx, 'eerlijk kijken, en zoeken naar iets waar je invloed op hebt', 960, 500, q.on('eerlijk', 1), C.goud, 34, 'center', 700); ctx.restore(); }
    if (to > 0.01) { ctx.save(); ctx.globalAlpha *= to;
      toets(ctx, 520, 420, 1.2, '10', q.on('tien', 1), C.groen); chip(ctx, '"door mij"  → intern', 520, 660, INT, q.on('mij', 1), 30);
      toets(ctx, 1400, 420, 1.2, '4', q.on('vier', 1)); chip(ctx, '"door die toets"  → extern', 1400, 660, EXT, q.on('toets', 2), 30);
      tag(ctx, 'de meeste mensen · in sommige culturen minder sterk', 960, 170, C.text2, q.on('culturen', 1) * (1 - q.on('zelfdienende', 1)), 'center', 26);
      if (q.on('zelfdienende', 1) > 0.01) card(ctx, 560, 740, 800, 120, 'zelfdienende vertekening', 'self-serving bias: succes → ik, falen → de situatie', q.on('zelfdienende', 1), C.goud);
      ctx.restore(); } },

  // ---------- H3 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const ja = q.on('1967', 1, 0.8);
    if (ja < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ja;
      const sx = lerp(1800, 1560, clamp((t - q.at('Sam')) / 2.5, 0, 1)); persoon(ctx, 'sam', sx, 880, 520, { uit: 'neutraal', pose: 'staan', kijk: -1, t, a: q.on('Sam', 1) });
      persoon(ctx, 'noor', 360, 880, 520, { uit: 'denkt', pose: 'staan', kijk: 1, t });
      wolk(ctx, 520, 160, 520, 150, 'wat doet die chagrijnig', q.on('chagrijnig', 1), '#F6E6C8', 30); chip(ctx, 'interne verklaring', 780, 400, INT, q.on('interne', 1), 26);
      wolk(ctx, 1020, 400, 360, 120, 'slecht nieuws?', q.on('nieuws', 1) * 0.6, '#D6E8F0', 26); wolk(ctx, 1020, 570, 360, 120, 'bril niet op?', q.on('bril', 1) * 0.6, '#D6E8F0', 26);
      ctx.restore(); }
    if (ja > 0.01) { ctx.save(); ctx.globalAlpha *= ja; regel(ctx, 'Jones en Harris · 1967', 140, 140, 1, C.text, 40, 'left', 700); regel(ctx, 'opstellen over Fidel Castro', 140, 186, q.on('Castro', 1), C.text2, 28, 'left', 600);
      const cel = (x, y, s1, s2, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 460, 170, 16); shape(ctx, rgba(col, 0.12), col, 2); text(ctx, s1, x + 230, y + 70, fTekst(32, 700), col, 'center'); text(ctx, s2, x + 230, y + 120, fTekst(26, 600), C.text2, 'center'); ctx.restore(); };
      regel(ctx, 'vrije keuze', 760, 300, q.on('Sommige', 1), C.text, 28, 'center', 700); regel(ctx, 'opgelegd', 1260, 300, q.on('opgelegd', 1), C.text, 28, 'center', 700);
      cel(530, 330, 'vóór Castro', 'de schrijver koos zelf', C.groen, q.on('vóór', 1)); cel(530, 530, 'tegen Castro', 'de schrijver koos zelf', C.koraal, q.on('tegen', 1));
      cel(1030, 330, 'vóór Castro', 'standpunt opgelegd', C.groen, q.on('opgelegd', 1)); cel(1030, 530, 'tegen Castro', 'standpunt opgelegd', C.koraal, q.on('opgelegd', 1));
      vraagteken(ctx, 1260, 820, q.on('Wat', 2), 100); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const on = q.on('onderschatten', 1, 0.8);
    if (on < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - on;
      const x = 360, y = 220, w = 1200, h = 520, Y = (v) => y + h - (v - 10) / 60 * h; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
      ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x, Y(40)); ctx.lineTo(x + w, Y(40)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'geen mening', x + w + 10, Y(40) + 8, fTekst(22, 600), C.text2, 'left');
      text(ctx, 'voor Castro', x - 14, y + 20, fTekst(22, 600), C.groen, 'right'); text(ctx, 'tegen Castro', x - 14, y + h, fTekst(22, 600), C.koraal, 'right');
      const B = [['vóór · keuze', 59.6, C.groen, 'vrije', 1], ['vóór · opgelegd', 44.1, C.groen, 'opgelegd', 1], ['tegen · keuze', 17.4, C.koraal, 'vrije', 1], ['tegen · opgelegd', 22.9, C.koraal, 'tegen', 1]];
      B.forEach(([nm, v, col, w2, n2], k) => { const a = k === 1 ? 1 : q.on(w2, n2); if (a <= 0.01) return; const bx = x + 80 + k * 280, by = Y(v); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, bx, by - 12, 180, 24, 8); shape(ctx, rgba(col, k % 2 ? 0.9 : 0.4), col, 2); ctx.restore(); regel(ctx, nm, bx + 90, y + h + 40, a, C.text, 22, 'center', 600); });
      tag(ctx, 'opgelegd, en toch: "hij is er wel een beetje voor"', 960, 170, C.goud, q.on('positiever', 1), 'center', 28);
      metaText(ctx, 'gemiddelde schatting (10 = tegen, 70 = voor) · Jones & Harris (1967)', x + w, y + h + 90, C.text2, 'right', 16); ctx.restore(); }
    if (on > 0.01) { ctx.save(); ctx.globalAlpha *= on;
      const kant = 0.3 * q.on('overschatten', 1); ctx.save(); ctx.translate(960, 420); ctx.rotate(-kant); ctx.strokeStyle = C.text2; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-360, 0); ctx.lineTo(360, 0); ctx.stroke(); roundRect(ctx, -460, -110, 200, 100, 16); shape(ctx, rgba(INT, 0.3), INT, 2); text(ctx, 'karakter', -360, -48, fTekst(30, 700), C.text, 'center'); roundRect(ctx, 260, -70, 200, 60, 12); shape(ctx, rgba(EXT, 0.2), EXT, 2); text(ctx, 'situatie', 360, -30, fTekst(26, 700), C.text, 'center'); ctx.restore(); ctx.strokeStyle = C.text2; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(960, 420); ctx.lineTo(960, 600); ctx.moveTo(880, 600); ctx.lineTo(1040, 600); ctx.stroke();
      if (q.on('fundamentele', 1) > 0.01) card(ctx, 520, 680, 880, 120, 'fundamentele attributiefout', 'bij anderen: situatie onderschat, karakter overschat', q.on('fundamentele', 1), C.goud);
      tag(ctx, 'kleiner in Oost-Azië, vooral als de situatie duidelijk zichtbaar is', 960, 170, C.text2, q.on('culturen', 1), 'center', 26); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const mt = q.on('Maar', 1, 0.8); regel(ctx, 'actor-observer-effect', 140, 140, 1, C.paars, 40, 'left', 700);
    if (mt < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - mt; persoon(ctx, 'noor', 520, 860, 480, { uit: 'neutraal', pose: 'staan', kijk: 1, t }); chip(ctx, 'over jezelf: extern', 520, 300, EXT, q.on('externe', 1), 30);
      persoon(ctx, 'sam', 1400, 860, 480, { uit: 'neutraal', pose: 'staan', kijk: -1, t }); chip(ctx, 'over anderen: intern', 1400, 300, INT, q.on('interne', 1), 30); ctx.restore(); }
    if (mt > 0.01) { ctx.save(); ctx.globalAlpha *= mt; regel(ctx, 'alle studies samen (2006)', 960, 260, 1, C.text, 36, 'center', 700);
      const x = 460, w = 1000, y = 460; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); [['0', 0], ['klein', 0.25], ['middel', 0.6], ['groot', 1]].forEach(([s2, u]) => { ctx.beginPath(); ctx.moveTo(x + u * w, y - 12); ctx.lineTo(x + u * w, y + 12); ctx.stroke(); text(ctx, s2, x + u * w, y + 50, fTekst(24, 600), C.text2, 'center'); });
      const verw = 0.75, gev = 0.05 + 0.03, pg = q.on('nul', 1, 1.5); circ(ctx, x + verw * w, y, 18, rgba(C.paars, 0.4 * (1 - pg) + 0.15), C.paars, 2); regel(ctx, 'verwacht', x + verw * w, y - 34, 1, C.text2, 24, 'center', 600);
      circ(ctx, x + lerp(verw, gev, pg) * w, y, 22, C.goud, '#F2F2EE', 3); regel(ctx, 'gevonden: bijna nul', x + gev * w + 10, y - 40, pg, C.goud, 28, 'left', 700);
      tag(ctx, 'zo corrigeert de wetenschap zichzelf', 960, 720, C.groen, q.on('corrigeert', 1), 'center', 32); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'drie vragen', q.on('Attributie', 1), (x) => { VRAGEN.forEach(([l, r], i) => { const yy = 360 + i * 120; text(ctx, l, x + 200, yy - 20, fTekst(20, 600), INT, 'center'); ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 60, yy); ctx.lineTo(x + 340, yy); ctx.stroke(); text(ctx, r, x + 200, yy + 34, fTekst(20, 600), EXT, 'center'); }); });
    panel(1, 'invloed geeft hoop', q.on('invloed', 1), (x) => { toets(ctx, x + 200, 470, 1, '4', 1); pijl(ctx, x + 200, 610, x + 200, 680, C.groen, 1, 5, 16); regel(ctx, 'anders aanpakken', x + 200, 720, 1, C.groen, 26, 'center', 700); });
    panel(2, 'zelfdienende vertekening', q.on('succes', 1), (x) => { toets(ctx, x + 110, 440, 0.8, '10', 1, C.groen); toets(ctx, x + 290, 440, 0.8, '4', 1); regel(ctx, 'ik', x + 110, 620, 1, INT, 30, 'center', 700); regel(ctx, 'de toets', x + 290, 620, 1, EXT, 30, 'center', 700); });
    panel(3, 'fundamentele attributiefout', q.on('anderen', 1), (x) => { persoon(ctx, 'sam', x + 200, 740, 400, { uit: 'neutraal', pose: 'staan', kijk: -1, t }); });
    tag(ctx, 'binnen of buiten · blijvend of tijdelijk · kun je er iets aan doen?', 960, 850, C.goud, q.on('doen', 1) * (1 - q.on('succes', 1)), 'center', 26); },
};
