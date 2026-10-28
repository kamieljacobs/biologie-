// Hormonen 1 · Post voor iedereen — scènes per alinea.
// draw(ctx, t, q): t = seconden in de take; q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat; q.on(...) = ramp 0..1.

const PERSON_LOOK = { skin: SKINS[1], hair: '#3B2E28', shirt: '#5A7FA0', hairStyle: 'short' };

// ---------- kleine UI-stukken (zoals in de voedingsreeks) ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kop(ctx, s, x, y, a = 1, col = C.text, px = 44, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTitel(px), col, align); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function pijl(ctx, x0, y0, x1, y1, col, a = 1, lw = 3, u = 1) { if (a <= 0.01) return; arrow(ctx, x0, y0, lerp(x0, x1, u), lerp(y0, y1, u), col, a, lw); }
function mix2(h1, h2, u) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = [16, 8, 0].map(k => Math.round(lerp((a >> k) & 255, (b >> k) & 255, u))); return `rgb(${c[0]},${c[1]},${c[2]})`; }
function fade(q, w1, n1, w2, n2) { return q.on(w1, n1) * (1 - q.on(w2, n2)); }

// ---------- klaslokaal (Macro) ----------
function klas(ctx, t, o = {}) {
  const { stoel = 0, schrik = 0, knal = 0, tril = 0 } = o;
  ctx.fillStyle = '#26364F'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2E4060'; ctx.fillRect(0, 0, W, 640);
  ctx.fillStyle = '#3A3530'; ctx.fillRect(0, 640, W, H - 640); // vloer
  for (let i = 0; i < 12; i++) { ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(i * 180 - 200, H); ctx.lineTo(i * 180 + 100, 640); ctx.stroke(); }
  // bord
  roundRect(ctx, 240, 110, 900, 360, 10); shape(ctx, '#2F5246', '#8C6A44', 10);
  ctx.save(); ctx.globalAlpha = 0.6; text(ctx, 'Biologie', 300, 190, fTitel(52), '#E6E1D3', 'left'); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(300, 240); ctx.lineTo(760, 240); ctx.moveTo(300, 300); ctx.lineTo(640, 300); ctx.stroke(); ctx.restore();
  // raam
  roundRect(ctx, 1360, 110, 420, 330, 8); shape(ctx, '#3E5C80', '#8FA0B5', 6); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1570, 110); ctx.lineTo(1570, 440); ctx.stroke();
  const jy = -26 * Math.sin(Math.PI * clamp(schrik, 0, 1)); const jx = tril * Math.sin(t * 60) * 2;
  // de stoel die achter de leerling omvalt (verder weg, dus kleiner, links achter)
  ctx.save(); ctx.translate(560, 700); ctx.scale(0.62, 0.62); ctx.rotate(-ease(stoel) * 1.5); ctx.fillStyle = '#6E7E9A';
  roundRect(ctx, -172, -420, 22, 420, 8); ctx.fill(); roundRect(ctx, -172, -230, 182, 24, 8); ctx.fill(); roundRect(ctx, -10, -230, 20, 230, 8); ctx.fill(); roundRect(ctx, -190, -420, 70, 110, 12); ctx.fill(); ctx.restore();
  // jij = Noor uit het castboek (ROLLEN.md), zittend aan de schoolbank; geen naam in beeld of stem (B4)
  const pr = persoon(ctx, 'noor', 960 + jx, 820 + jy, 600, { pose: 'zit', tafel: 650, uit: schrik > 0.3 && schrik < 0.9 ? 'verbaasd' : 'neutraal', t });
  // schoolbank met frontpaneel (verbergt de benen)
  roundRect(ctx, 640, 640, 640, 30, 6); shape(ctx, '#B08A5C', '#8C6A44', 2); ctx.fillStyle = '#8C6A44'; ctx.fillRect(660, 670, 600, 200);
  ctx.fillStyle = '#E6E1D3'; ctx.fillRect(880, 626, 170, 14);
  if (knal > 0.01 && knal < 1) { ctx.save(); ctx.globalAlpha = 1 - knal; ctx.translate(1500, 760); ctx.fillStyle = C.goud; ctx.beginPath(); for (let i = 0; i < 16; i++) { const an = i * Math.PI / 8, r = i % 2 ? 60 : 130 + 40 * knal; i ? ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.7) : ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r * 0.7); } ctx.closePath(); ctx.fill(); text(ctx, 'KNAL', 0, 16, fTitel(52), C.bgSchema, 'center'); ctx.restore(); }
  return pr;
}

// ---------- zenuw en post (Schema) ----------
function zenuwLijn(ctx, x, y, s, a, pulse = -1) { // lijn van hersenen via ruggenmerg en arm naar de hand
  const pts = [KP(x, y, s, 0, 0.92), KP(x, y, s, 0, 1.45), KP(x, y, s, 0.55, 1.5), KP(x, y, s, 0.9, 2.1), KP(x, y, s, 1.02, 3.0), KP(x, y, s, 1.17, 4.3)]; if (a <= 0.01) return pts;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = HK.zenuw; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  if (pulse >= 0 && pulse <= 1) { const p = padPunt(pts, pulse, false); const g = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 34); g.addColorStop(0, rgba('#FFFFFF', 0.95)); g.addColorStop(0.4, rgba(HK.zenuw, 0.8)); g.addColorStop(1, rgba(HK.zenuw, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], 34, 0, 6.283); ctx.fill(); }
  ctx.restore(); return pts;
}
function huisje(ctx, x, y, s = 1, a = 1, folder = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 40 * s, y - 50 * s); ctx.lineTo(x, y - 84 * s); ctx.lineTo(x + 40 * s, y - 50 * s); ctx.lineTo(x + 40 * s, y); ctx.closePath(); shape(ctx, rgba(C.fill, 0.9), C.line, 2);
  ctx.fillStyle = C.kast; ctx.fillRect(x - 12 * s, y - 30 * s, 24 * s, 30 * s); if (folder > 0.01) { ctx.save(); ctx.globalAlpha *= folder; ctx.fillStyle = HK.hormoon; ctx.fillRect(x + 14 * s, y - 46 * s - 20 * s * (1 - folder), 22 * s, 28 * s); ctx.restore(); } ctx.restore(); }
function envelop(ctx, x, y, s = 1, a = 1, col = HK.zenuw) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40 * s, y - 26 * s, 80 * s, 52 * s, 4); shape(ctx, rgba(col, 0.25), col, 2); ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(x - 40 * s, y - 26 * s); ctx.lineTo(x, y + 4 * s); ctx.lineTo(x + 40 * s, y - 26 * s); ctx.stroke(); ctx.restore(); }

// ---------- vergelijkingstabel ----------
function vergTabel(ctx, x, y, o) { const { a = 1, rows = [], rowA = [], colA = [1, 1] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const cw = [330, 560, 560], lh = 120; kop(ctx, 'zenuwstelsel', x + cw[0] + cw[1] / 2, y, colA[0], HK.zenuw, 56); kop(ctx, 'hormoonstelsel', x + cw[0] + cw[1] + cw[2] / 2, y, colA[1], HK.hormoon, 56);
  rows.forEach((r, i) => { const al = rowA[i] == null ? 1 : rowA[i]; if (al <= 0.01) return; const yy = y + 40 + i * lh; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + cw[0] + cw[1] + cw[2], yy); ctx.stroke();
    metaText(ctx, r[0], x, yy + 74, C.grain, 'left', 30); text(ctx, r[1], x + cw[0] + cw[1] / 2, yy + 78, fTekst(46, 600), C.text, 'center'); text(ctx, r[2], x + cw[0] + cw[1] + cw[2] / 2, yy + 78, fTekst(46, 600), C.text, 'center'); ctx.restore(); });
  ctx.restore(); }

// ---------- iconen ----------
function pan(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 70, 22, 0, 0, 6.283); shape(ctx, '#5B6B88', C.line, 2); ctx.fillStyle = '#5B6B88'; ctx.fillRect(x + 60, y - 8, 90, 14); for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 30 + i * 30, y - 34); ctx.bezierCurveTo(x - 40 + i * 30, y - 60, x - 20 + i * 30, y - 70, x - 30 + i * 30, y - 96); ctx.stroke(); } ctx.restore(); }
function lengteStreep(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; persoon(ctx, 'kind', x - 55, y, 200 * 0.7 / ((CAST.kind && CAST.kind.lengte) || 1), {}); /* ± 1,15 m naast 1,65 m */ persoon(ctx, 'noor', x + 45, y, 200, {}); ctx.restore(); }
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E6E1D3'; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(x + r * 0.45, y - r * 0.25, r * 0.85, 0, 6.283); ctx.fill(); ctx.restore(); }
function druppel(ctx, x, y, r, a = 1, col = HK.water) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.4); ctx.bezierCurveTo(x + r, y - r * 0.2, x + r, y + r, x, y + r); ctx.bezierCurveTo(x - r, y + r, x - r, y - r * 0.2, x, y - r * 1.4); shape(ctx, rgba(col, 0.6), col, 2); ctx.restore(); }
function glucoseZ(ctx, x, y, r = 12, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(HK.glucose, 0.55), HK.glucose, 1.5, 0); ctx.restore(); }

// ---------- vwo: membraan met cascade en kern ----------
function membraanBand(ctx, y, a = 1, xa = 80, xb = 1840) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(HK.cel, 0.18); ctx.fillRect(xa, y - 22, xb - xa, 44);
  for (let x = xa; x < xb; x += 18) { circ(ctx, x, y - 16, 6, rgba(HK.cel, 0.85)); circ(ctx, x, y + 16, 6, rgba(HK.cel, 0.85)); ctx.strokeStyle = rgba(HK.cel, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 2, y - 10); ctx.lineTo(x - 2, y + 10); ctx.moveTo(x + 2, y - 10); ctx.lineTo(x + 2, y + 10); ctx.stroke(); }
  metaText(ctx, 'BUITEN DE CEL', xa + 10, y - 50, C.grain, 'left', 24); metaText(ctx, 'IN DE CEL', xa + 10, y + 74, C.grain, 'left', 24); ctx.restore(); }
// gekromd celmembraan (prompt v13 C9: membraan altijd gebogen met de cel) uit de beeldbank; de cel ligt onder het membraan
const MEM_R = 2600; function memY(my, x) { return my + MEM_R - Math.sqrt(MEM_R * MEM_R - (x - 960) * (x - 960)); }
function membraanKrom(ctx, my, a = 1, t = 0) { if (a <= 0.01) return; const an = Math.asin(1050 / MEM_R); ctx.save(); ctx.globalAlpha *= a;
  celTextuur(ctx, (px, py) => py > memY(my, px) + 40, 110, 5);
  membraanBoog(ctx, 960, my + MEM_R, MEM_R, -Math.PI / 2 - an, -Math.PI / 2 + an, { t, s: 1.25 });
  metaText(ctx, 'BUITEN DE CEL', 100, my - 110, C.grain, 'left', 24); metaText(ctx, 'IN DE CEL', 100, memY(my, 100) + 110, C.grain, 'left', 24); ctx.restore(); }
// enzym als gevouwen kralenketen (enzymKluwen uit de beeldbank) in plaats van een pac-man-bolletje
function enzymBol(ctx, x, y, r, on, a = 1) { if (a <= 0.01) return; enzymKluwen(ctx, x, y, r * 1.25, { a, col: on > 0.5 ? HK.hormoon : C.enzym, seed: 2 + Math.round(x / 50) % 5 }); }
function cascade(ctx, x, y, u, a = 1) { // 1 → 3 → 9 enzymen, u = 0..1 hoe ver de kettingreactie is
  if (a <= 0.01) return; const lv = [[[x, y]], [], []]; for (let i = 0; i < 3; i++) lv[1].push([x - 260 + i * 260, y + 120]); for (let i = 0; i < 9; i++) lv[2].push([x - 400 + i * 100, y + 240]);
  for (let L = 0; L < 3; L++) lv[L].forEach((p, i) => { const on = clamp(u * 3 - L, 0, 1); if (L > 0) { const par = lv[L - 1][Math.floor(i / 3)]; ctx.save(); ctx.globalAlpha *= a * (0.3 + 0.7 * on); ctx.strokeStyle = on > 0.5 ? HK.hormoon : C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(par[0], par[1] + 22); ctx.lineTo(p[0], p[1] - 22); ctx.stroke(); ctx.restore(); } enzymBol(ctx, p[0], p[1], 22, on, a); });
}
function kernMetGen(ctx, x, y, r, gen = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.75, 0, 0, 6.283); shape(ctx, rgba(C.kern, 0.45), C.kernR, 2);
  // chromatine als losse, zacht kronkelende grijze draden (BEELDAFSPRAKEN; palet B: DNA-ruggengraat grijs)
  const draad = (k, px) => Math.sin(px * 0.018 + k * 2.1) * r * 0.16 + Math.sin(px * 0.047 + k) * r * 0.05 + (k - 1) * r * 0.22;
  ctx.strokeStyle = '#97A3B6'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let px = -r * 0.72; px <= r * 0.72; px += 6) { const py = draad(k, px); px === -r * 0.72 ? ctx.moveTo(x + px, y + py) : ctx.lineTo(x + px, y + py); } ctx.stroke(); }
  if (gen > 0.01) { ctx.save(); ctx.globalAlpha *= gen; ctx.strokeStyle = HK.hormoon; ctx.lineWidth = 8; ctx.beginPath(); for (let px = -40; px <= 40; px += 6) { const py = draad(1, px); px === -40 ? ctx.moveTo(x + px, y + py) : ctx.lineTo(x + px, y + py); } ctx.stroke(); metaText(ctx, 'GEN AAN', x, y + r * 0.75 + 40, C.goud, 'center', 24); ctx.restore(); }
  ctx.restore(); }

// ---------- adrenalineconcentratie (model) ----------
const HALF = 2; // halfwaardetijd in minuten (vereenvoudigd)
function conc(m) { return 100 * Math.pow(0.5, m / HALF); }

const SCENES = {
  title(ctx, t) { klierKaart(ctx, 1480, 640, 0.62, { lit: { bijnier: 1 }, base: 0.45 }); const L = bloedLus(1480, 640, 0.62); bloedNet(ctx, L, 0.6); hormoonStroom(ctx, L, 18, t, 0.9, 'adrenaline', 1, 8); },

  // ---------- Cold open ----------
  s01(ctx, t, q) {
    const st = q.on('stoel', 1, 0.7), kn = ramp(t, q.at('Knal'), 0.9), sch = ramp(t, q.at('schrikt'), 0.7);
    const tril = q.on('trillen', 1, 0.4);
    klas(ctx, t, { stoel: st, schrik: sch, knal: kn, tril: tril });
    const hm = q.on('hart', 1, 0.5); const bpm = lerp(72, 128, ramp(t, q.at('schrikt'), 1.5)) - 4 * ramp(t, q.at('allang'), 3);
    hartMeter(ctx, 1380, 470, bpm, t, hm);
    tag(ctx, 'nog minuten lang', 1590, 690, C.koraal, q.on('minuten', 1));
    tag(ctx, 'zenuwstelsel: snel en precies', 960, 120, HK.zenuw, fade(q, 'zenuwstelsel', 1, 'Maar', 1));
    vraagteken(ctx, 1250, 380, q.on('Waarom', 1), 130);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const x = 700, y = 600, s = 0.8; klierKaart(ctx, x, y, s, { base: 0, show: {}, nieren: 0, hersenen: 1 });
    const z = q.on('zenuwstelsel', 1, 0.8); const p0 = q.at('signaal'); const pu = t > p0 ? clamp((t - p0) / 0.9, 0, 1) : -1;
    zenuwLijn(ctx, x, y, s, z, pu > 0 && pu < 1 ? pu : -1);
    if (pu >= 1) { const fl = 1 - ramp(t, p0 + 0.9, 1.2), hp = KP(x, y, s, 1.17, 4.3); ctx.save(); ctx.globalAlpha *= fl; circ(ctx, hp[0], hp[1], 40, rgba(HK.zenuw, 0.4)); ctx.restore(); }
    metaText(ctx, 'ÉÉN VASTE LIJN · ÉÉN PLEK', 1340, 330, C.grain, 'center', 26 * 1);
    tag(ctx, 'tot 100 m/s', 1340, 450, HK.zenuw, q.on('honderd'));
    tag(ctx, 'en snel weer voorbij', 1340, 560, C.text2, q.on('voorbij'));
    envelop(ctx, 1340, 240, 1.6, q.on('zenuwcel'));
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const x = 560, y = 620, s = 0.78; const bA = q.on('bloed', 1, 0.8);
    klierKaart(ctx, x, y, s, { lit: { bijnier: q.on('klier', 1) }, base: 0.35 });
    const L = bloedLus(x, y, s); bloedNet(ctx, L, bA);
    const sp = ramp(t, q.at('mee'), 3.5); hormoonStroom(ctx, L, 26, t, sp, 'adrenaline', 1, 8, 0.6);
    klok(ctx, 1080, 300, 80, ramp(t, q.at('rust'), 2) * 12, '≈ 1 minuut rond', q.on('rust', 1) * (1 - q.on('post', 1)));
    // post
    const pa = q.on('post', 1); if (pa > 0.01) { envelop(ctx, 1080, 300, 1.4, q.on('brief', 1)); pijl(ctx, 1150, 300, 1330, 300, HK.zenuw, q.on('brief', 1), 3, q.on('adres', 1)); huisje(ctx, 1400, 330, 1, q.on('brief', 1));
      metaText(ctx, 'ZENUW: ÉÉN ADRES', 1240, 200, HK.zenuw, 'center', 24 * pa);
      const fA = q.on('folder', 1); for (let i = 0; i < 7; i++) huisje(ctx, 1000 + i * 120, 620, 0.9, fA, ramp(t, q.at('folder') + 0.3 + i * 0.18, 0.5)); metaText(ctx, 'HORMOON: IEDEREEN KRIJGT DE FOLDER', 1360, 700, C.goud, 'center', 24); }
  },
  s06(ctx, t, q) { bg(ctx, 'schema');
    const rows = [['SNELHEID', 'snel', 'meestal trager'], ['DUUR', 'kort', 'langer'], ['BEREIK', 'gericht', 'heel het lichaam']];
    const ra = [q.on('snel', 1), q.on('kort', 1), q.on('gericht', 1)]; const ha = q.on('trager', 1);
    const tA = 1 - q.on('hete', 1) * 0.0;
    vergTabel(ctx, 110, 130, { rows: rows.map((r, i) => [r[0], r[1], ha > 0.3 ? r[2] : '']), rowA: ra, colA: [q.on('zenuwstelsel', 1), ha] });
    // voorbeelden
    const ex = q.on('hete', 1); pan(ctx, 720, 640, ex); regel(ctx, 'hand terugtrekken', 720, 760, ex, HK.zenuw, 34, 'center');
    const gr = q.on('Groeien', 1); lengteStreep(ctx, 1130, 720, gr); regel(ctx, 'groeien', 1130, 790, gr, HK.hormoon, 34, 'center');
    const ok = q.on('slaap', 1); maan(ctx, 1450, 630, 44, ok); glucoseZ(ctx, 1570, 630, 26, q.on('bloedsuiker', 1)); druppel(ctx, 1690, 636, 28, q.on('waterbalans', 1));
    regel(ctx, 'slaap · bloedsuiker · water', 1570, 760, ok, HK.hormoon, 34, 'center');
    tag(ctx, 'veel meer dan puberteitsstoffen', 1180, 860, C.goud, q.on('puberteitsstoffen', 1));
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    const kk = q.on('belangrijkste', 1, 0.8), a1 = 1 - kk;
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1;
      // links: speekselklier met buisje naar de mond
      const sa = q.on('speekselklier', 1); ctx.save(); ctx.globalAlpha *= sa; blob(ctx, 480, 400, 120, 90, 0.08, 3, t); shape(ctx, rgba(HK.klier, 0.35), HK.klierR, 2);
      ctx.strokeStyle = HK.klierR; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(560, 360); ctx.quadraticCurveTo(680, 260, 760, 300); ctx.stroke(); metaText(ctx, 'AFVOERBUIS → MOND', 760, 250, C.grain, 'center', 24);
      for (let i = 0; i < 5; i++) { const u = (t * 0.4 + i / 5) % 1; druppel(ctx, lerp(560, 760, u), lerp(360, 300, u) - Math.sin(u * 3) * 40, 7, 0.9, C.teal); }
      regel(ctx, 'speekselklier', 480, 560, 1, C.text, 36, 'center'); ctx.restore();
      // rechts: hormoonklier, afgifte direct aan het bloed
      const ha = q.on('rechtstreeks', 1); ctx.save(); ctx.globalAlpha *= q.on('Een', 1); blob(ctx, 1320, 420, 130, 90, 0.08, 7, t); shape(ctx, rgba(HK.klier, 0.35), HK.klierR, 2);
      ctx.strokeStyle = HK.bloed; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1060, 590); ctx.bezierCurveTo(1250, 540, 1420, 560, 1640, 600); ctx.stroke();
      for (let i = 0; i < 9; i++) { const u = (t * 0.12 + i / 9) % 1; const bx = lerp(1060, 1640, u), by = 580 + Math.sin(u * 3.14) * -30; if (ha > 0.01 && u > 0.35) hormoonVorm(ctx, bx, by, 8, 'adrenaline', ha); }
      if (ha > 0.01) for (let i = 0; i < 4; i++) { const u = (t * 0.5 + i / 4) % 1; hormoonVorm(ctx, 1290 + i * 20, lerp(470, 560, u), 7, 'adrenaline', ha * (1 - u)); }
      regel(ctx, 'hormoonklier: geen afvoerbuis', 1320, 260, 1, C.text, 36, 'center'); metaText(ctx, 'BLOEDVAT', 1640, 660, HK.bloedL, 'right', 24); ctx.restore(); ctx.restore(); }
    if (kk > 0.01) { const x = 960, y = 620, s = 0.92; const lit = { hypofyse: q.on('hypofyse', 1), hypothalamus: q.on('taalamus', 1) || q.on('hypothalamus', 1), schildklier: q.on('schildklier', 1), bijnier: q.on('Boven', 2) };
      ctx.save(); ctx.globalAlpha *= kk; const K = klierKaart(ctx, x, y, s, { lit, base: 0.3, show: { alvleesklier: 0.3, eierstok: 0.3 } });
      const kz = Math.max(lit.hypofyse, lit.hypothalamus); const HZ = kopZoom(ctx, x, y, s, kz, { cx: 1330, cy: 250, r: 170, hth: lit.hypothalamus, hyp: lit.hypofyse, t });
      naamBij(ctx, 'hypothalamus', 'deel van de hersenen', 1520, HZ.hth[1] - 10, kz * lit.hypothalamus, 'left');
      naamBij(ctx, 'hypofyse', 'onder de hersenen', 1520, HZ.hyp[1] + 34, kz * lit.hypofyse, 'left');
      naamBij(ctx, 'schildklier', 'in je hals', K.schildklier[0] - 60, K.schildklier[1] + 8, lit.schildklier, 'right');
      naamBij(ctx, 'bijnieren', 'boven op de nieren', K.bijnierL[0] - 200, K.bijnierL[1] + 4, lit.bijnier, 'right');
      ctx.restore(); }
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const x = 760, y = 620, s = 0.92; const al = q.on('alvleesklier', 1), ei = q.on('eierstokken', 1);
    const K = klierKaart(ctx, x, y, s, { lit: { alvleesklier: al, eierstok: ei, hypofyse: 0.5, hypothalamus: 0.5, schildklier: 0.5, bijnier: 0.5 }, base: 0.55 });
    naamBij(ctx, 'alvleesklier', 'in je buik', x - 230, K.alvleesklier[1] + 8, al, 'right');
    label(ctx, 'eierstokken / zaadballen', '', K.eierstokR[0], K.eierstokR[1], 1060, 800, ei);
    const z = q.on('allebei', 1) * (1 - q.on('eierstokken', 1) * 0.0);
    zoomCircle(ctx, 1450, 400, 300, K.alvleesklier[0] + 50, K.alvleesklier[1], 'alvleesklier · vereenvoudigd', z, () => {
      ctx.fillStyle = C.bgMicro; ctx.fillRect(1150, 100, 600, 600);
      // klierblaasjes (exocrien) rond een afvoerbuis
      ctx.strokeStyle = HK.klierR; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1230, 220); ctx.lineTo(1330, 300); ctx.lineTo(1450, 330); ctx.lineTo(1700, 330); ctx.stroke();
      for (const [cx, cy] of [[1210, 190], [1290, 250], [1250, 330], [1380, 250], [1520, 270], [1600, 250]]) { ctx.beginPath(); ctx.arc(cx, cy, 34, 0, 6.283); shape(ctx, rgba(HK.klier, 0.3), HK.klierR, 1.5); }
      metaText(ctx, 'BUIS → DARM', 1690, 300, C.grain, 'right', 22);
      for (let i = 0; i < 5; i++) { const u = (t * 0.35 + i / 5) % 1; druppel(ctx, lerp(1340, 1700, u), 330, 6, 0.9, C.teal); }
      // eilandje van Langerhans (endocrien) met een bloedvat
      const ei2 = q.on('eilandjes', 1); ctx.save(); ctx.globalAlpha *= 0.45 + 0.55 * ei2; ctx.beginPath(); ctx.arc(1400, 500, 70, 0, 6.283); shape(ctx, rgba(HK.hormoon, 0.35), HK.hormoon, 3); ctx.restore();
      ctx.strokeStyle = HK.bloed; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(1200, 610); ctx.quadraticCurveTo(1400, 560, 1700, 520); ctx.stroke(); metaText(ctx, 'BLOED', 1690, 570, HK.bloedL, 'right', 22);
      if (ei2 > 0.01) for (let i = 0; i < 6; i++) { const u = (t * 0.3 + i / 6) % 1; hormoonVorm(ctx, lerp(1430, 1700, u), lerp(560, 520, u), 8, 'insuline', ei2); }
      text(ctx, 'eilandje van Langerhans', 1400, 430 - 0, fTekst(28, 700), C.goud, 'center');
    });
  },
  s09(ctx, t, q) { bg(ctx, 'schema');
    const en = q.on('endocriene', 1), ex = q.on('exocriene', 1);
    tag(ctx, 'endocrien: stof aan het bloed', 520, 230, HK.hormoon, en); tag(ctx, 'exocrien: stof via een afvoerbuis', 520, 330, HK.klier, ex);
    tag(ctx, 'alvleesklier: allebei', 520, 430, C.text2, q.on('allebei', 1));
    const hy = q.on('hypothalamus', 1); if (hy > 0.01) { ctx.save(); ctx.globalAlpha *= hy; const HH9 = hoofdHersenen(ctx, 1350, 400, 0.62, { hth: 1, hyp: 0.35, t }); naamBij(ctx, 'hypothalamus', '', HH9.hth[0] + 150, HH9.hth[1] - 60, 1, 'left');
      ctx.restore();
      const zA = q.on('hersenen', 1); ctx.save(); ctx.globalAlpha *= zA; ctx.strokeStyle = HK.zenuw; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1180, 250); ctx.quadraticCurveTo(1300, 300, 1345, 392); ctx.stroke(); metaText(ctx, 'ZENUWSIGNAAL', 1150, 230, HK.zenuw, 'center', 22); ctx.restore();
      const hA = q.on('maakt', 1); for (let i = 0; i < 5; i++) { const u = (t * 0.35 + i / 5) % 1; hormoonVorm(ctx, 1355 + Math.sin(i * 2) * 14, lerp(445, 740, u), 8, 'adh', hA * (1 - u * 0.6)); } metaText(ctx, 'HORMOON → BLOED', 1560, 700, C.goud, 'center', 22 * 1);
      tag(ctx, 'hier komen ze samen', 1350, 860, C.goud, q.on('samen', 1)); }
  },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    const x = 640, y = 620, s = 0.84; const K = klierKaart(ctx, x, y, s, { lit: { bijnier: q.on('bijnieren', 1) }, base: 0.3 });
    // zenuwsignaal van hersenen via ruggenmerg naar de bijnier
    const za = q.on('zenuwstelsel', 1); const zp = [KP(x, y, s, 0, 0.92), KP(x, y, s, 0, 1.6), KP(x, y, s, 0.06, 2.35), [K.bijnierR[0], K.bijnierR[1] - 4]];
    ctx.save(); ctx.globalAlpha *= za; ctx.strokeStyle = HK.zenuw; ctx.lineWidth = 4; ctx.beginPath(); zp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    const p0 = q.at('signaal'); const pu = clamp((t - p0) / 0.8, 0, 1); if (t > p0 && pu < 1) { const p = padPunt(zp, pu, false); circ(ctx, p[0], p[1], 14, '#FFFFFF'); } ctx.restore();
    const zm = q.on('bijniermerg', 1); zoomCircle(ctx, 1420, 330, 220, K.bijnierR[0], K.bijnierR[1], 'bijnier op de nier', zm, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1200, 110, 440, 440);
      const ad = q.on('adrenaline', 1); const NB = nierBijnier(ctx, 1410, 600, 2.0, { glowMerg: ad, t });
      naamBij(ctx, 'schors', '', NB.bijnierSchors[0] + 10, NB.bijnierSchors[1] - 80, 1, 'center');
      for (let i = 0; i < 8; i++) { const w2 = wander(i, t, 30, 0.9); hormoonVorm(ctx, NB.bijnierMerg[0] + w2.x * 1.6, NB.bijnierMerg[1] + w2.y * 0.6 - 10, 8, 'adrenaline', ad); }
      naamBij(ctx, 'merg', '', NB.bijnierMerg[0] + 80, NB.bijnierMerg[1] + 50, 1, 'left'); });
    const L = bloedLus(x, y, s); bloedNet(ctx, L, q.on('bloed', 1)); hormoonStroom(ctx, L, 30, t, ramp(t, q.at('overal'), 2.5), 'adrenaline', 1, 8, 0.5);
    vraagteken(ctx, 1420, 760, q.on('Welke', 1), 120);
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    // drie cellen in het bloed; adrenaline overal, maar alleen cellen met receptoren reageren
    const rec = q.on('receptor', 1); const bindA = ramp(t, q.at('past', 1), 2.2);
    const cells = [[420, 430, true], [960, 470, false], [1500, 430, true]];
    for (let i = 0; i < 26; i++) { const w2 = wander(i, t, 40, 0.7); const px = 120 + hash(i * 7) * 1680 + w2.x, py = 140 + hash(i * 7 + 1) * 640 + w2.y; let near = false; for (const c of cells) if (Math.hypot(px - c[0], py - c[1]) < 230) near = true; if (!near) hormoonVorm(ctx, px, py, 9, 'adrenaline', 0.9); }
    cells.forEach(([cx, cy, has], i) => { doelcel(ctx, cx, cy, 170, { t, seed: i + 2, n: 5, noRec: !has, bound: has ? bindA : 0, glow: has ? ramp(t, q.at('past', 1) + 1.5, 1) : 0, a: 1 });
      if (!has) { metaText(ctx, 'GEEN RECEPTOR', cx, cy + 250, C.text2, 'center', 24); } else metaText(ctx, 'RECEPTOREN', cx, cy + 250, C.goud, 'center', 24 * 1); });
    tag(ctx, 'sleutel past in slot', 960, 120, C.goud, q.on('sleutel', 1) * (1 - q.on('doelcel', 1)));
    tag(ctx, 'doelcel', 420, 760, C.goud, q.on('doelcel', 1)); tag(ctx, 'doelcel', 1500, 760, C.goud, q.on('doelcel', 1)); tag(ctx, 'geen doelcel', 960, 820, C.text2, q.on('doelcel', 1));
    tag(ctx, 'doelorgaan = orgaan met zulke cellen', 960, 120, C.goud, q.on('doelorgaan', 1));
  },
  s13(ctx, t, q) { bg(ctx, 'schema');
    const cw = 400, gy = 160; const panels = [['hart', 'sneller en harder', q.on('hart', 1)], ['lever', 'glycogeen → glucose', q.on('lever', 1)], ['spieren', 'vaten wijder', q.on('wijder', 1)], ['darm en huid', 'vaten knijpen samen', q.on('knijpen', 1)]];
    panels.forEach(([n, e, a], i) => { if (a <= 0.01) return; const px = 80 + i * (cw + 50), cx = px + cw / 2; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, px, gy, cw, 560, 18); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 1.5);
      text(ctx, n, cx, gy + 60, fTitel(40), C.text, 'center');
      if (i === 0) { const k = Math.exp(-((t * 2.1) % 1) * 7); ctx.save(); ctx.translate(cx, gy + 270); ctx.scale(1.4 + 0.2 * k, 1.4 + 0.2 * k); ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-110, -30, -50, -90, 0, -30); ctx.bezierCurveTo(50, -90, 110, -30, 0, 60); ctx.closePath(); shape(ctx, rgba(HK.bloed, 0.6), HK.bloedL, 2); ctx.restore(); }
      if (i === 1) { glycogeenKeten(ctx, cx - 70, gy + 270, 1.2, 1, 1); for (let j = 0; j < 5; j++) { const u = (t * 0.35 + j / 5) % 1; glucoseZ(ctx, lerp(cx - 20, cx + 130, u), gy + 250 + Math.sin(j * 2) * 60, 13, 1 - u * 0.5); } }
      if (i === 2 || i === 3) { const wd = i === 2 ? lerp(44, 80, q.on('wijder', 1, 1.5)) : lerp(44, 16, q.on('knijpen', 1, 1.5)); ctx.strokeStyle = HK.bloed; ctx.lineWidth = wd + 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px + 60, gy + 280); ctx.lineTo(px + cw - 60, gy + 280); ctx.stroke(); ctx.strokeStyle = rgba(HK.bloedL, 0.9); ctx.lineWidth = wd; ctx.beginPath(); ctx.moveTo(px + 60, gy + 280); ctx.lineTo(px + cw - 60, gy + 280); ctx.stroke();
        for (let j = 0; j < 6; j++) { const u = (t * (i === 2 ? 0.5 : 0.18) + j / 6) % 1; circ(ctx, lerp(px + 70, px + cw - 70, u), gy + 280, 6, '#F0D0C8'); } }
      text(ctx, e, cx, gy + 470, fTekst(32, 600), C.goud, 'center'); hormoonVorm(ctx, px + 40, gy + 40, 10, 'adrenaline', 1); ctx.restore(); });
    const te = q.on('tenen', 1); if (te > 0.01) { ctx.save(); ctx.globalAlpha *= te; ctx.beginPath(); ctx.ellipse(560, 790, 70, 30, 0, 0, 6.283); shape(ctx, mix2(SKINS[1], '#C9D8E6', te), C.teal, 2); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(615 + k * 4, 770 + k * 11, 10 - k, 0, 6.283); shape(ctx, mix2(SKINS[1], '#C9D8E6', te), C.teal, 1.5); } ctx.restore(); }
    tag(ctx, 'zelfs je tenen: koud en bleek', 960, 800, C.teal, te);
    tag(ctx, 'het effect hangt af van receptor en cel', 960, 860, C.goud, q.on('hangt', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const x = 700, y = 620, s = 0.84; klierKaart(ctx, x, y, s, { base: 0.2, lit: { bijnier: 0.6 } });
    const sp = q.on('spieren', 1); kaartSpieren(ctx, x, y, s, sp * 0.5);
    hartMeter(ctx, 1240, 200, 125, t, q.on('hart', 1));
    tag(ctx, 'klaar voor een flinke inspanning', 1440, 470, C.goud, q.on('inspanning', 1));
    tag(ctx, 'meer bloed en brandstof', 1440, 560, C.koraal, q.on('brandstof', 1));
    const w = q.on('weet', 1); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; roundRect(ctx, 1180, 640, 520, 210, 18); shape(ctx, rgba(C.bgMicro, 0.92), C.line, 1.5); receptor(ctx, 1440, 800, -Math.PI / 2, 'adrenaline', ramp(t, q.at('past'), 1.2), 1, 1.6); metaText(ctx, 'HET PAST, MEER NIET', 1440, 690, C.grain, 'center', 24); ctx.restore(); }
  },
  s15(ctx, t, q) { bg(ctx, 'micro');
    const my = 330; membraanKrom(ctx, my, 1, t);
    // receptor uit de beeldbank: kralenketen die zeven keer door het membraan gaat, pasvorm buiten, vormverandering bij binden
    const ra = Math.max(0.35, q.on('receptor', 1)); const bnd = ramp(t, q.at('bindt'), 1.2) * (1 - ramp(t, q.at('loslaat'), 1));
    membraanReceptor(ctx, 960, my, 1.05, { a: ra, bind: bnd, signaal: bnd, ligCol: HK.hormoon, vorm: 'drie', membraan: false, R: MEM_R, t });
    if (ra > 0.01 && t < q.at('bindt')) { for (let i = 0; i < 6; i++) { const w2 = wander(i, t, 30, 0.8); hormoonVorm(ctx, 400 + i * 220 + w2.x, 170 + w2.y, 11, i % 2 ? 'insuline' : 'adrenaline', 0.85); } }
    tag(ctx, 'lost op in water: kan niet door het membraan', 960, 110, C.text2, fade(q, 'water', 1, 'bindt', 1));
    const cu = clamp((t - q.at('kettingreactie')) / 3, 0, 1) * (1 - ramp(t, q.at('loslaat'), 1.5)); cascade(ctx, 960, 470, cu, q.on('kettingreactie', 1));
    tag(ctx, 'signaaltransductie', 1560, 560, C.goud, q.on('signaaltransductie', 1));
    tag(ctx, 'binnen seconden · groot effect', 1560, 650, C.goud, q.on('seconden', 1));
    tag(ctx, 'en snel weer voorbij', 1560, 740, C.text2, q.on('voorbij', 1));
  },
  s16(ctx, t, q) { bg(ctx, 'micro');
    const my = 260; membraanKrom(ctx, my, 1, t);
    const st = q.at('Steroïdhormonen'), dw = q.at('dwars'), rk = q.at('receptor'), kn = q.at('kern'), ew = q.at('eiwitten'), sk = q.at('Schildklierhormoon');
    const kx = 1300, ky = 640; kernMetGen(ctx, kx, ky, 230, q.on('genen', 1) * (1 - q.on('Schildklierhormoon', 1)), 1);
    // het cortisolmolecuul: buiten → door het membraan → bindt aan receptor in het cytoplasma → naar de kern
    const pIn = ramp(t, dw, 1.6), pB = ramp(t, rk + 0.3, 1.0), pK = ramp(t, kn, 2.0); const sA = q.on('Steroïdhormonen', 1) * (1 - q.on('Schildklierhormoon', 1));
    let hx = lerp(560, 600, pIn), hy = lerp(140, 470, pIn); const rx = 640 + pK * (kx - 120 - 640), ry = 520 + pK * (ky - 520);
    if (pB > 0.01) { hx = lerp(hx, rx - 18, pB); hy = lerp(hy, ry - 30, pB); }
    ctx.save(); ctx.globalAlpha *= sA * q.on('receptor', 1); enzymKluwen(ctx, rx, ry, 40, { col: HK.receptor, sluit: pB, seed: 3 }); metaText(ctx, 'RECEPTOR IN DE CEL', rx, ry + 70, C.grain, 'center', 22); ctx.restore();
    hormoonVorm(ctx, hx, hy, 22, 'cortisol', sA);
    tag(ctx, 'gemaakt van cholesterol · lost op in vet', 1300, 110, C.text2, fade(q, 'cholesterol', 1, 'dwars', 1));
    tag(ctx, 'cortisol · testosteron · oestrogeen', 1300, 190, HK.hormoon, fade(q, 'testosteron', 1, 'dwars', 1));
    tag(ctx, 'transcriptiefactor', 1300, 150, C.goud, fade(q, 'transcriptiefactor', 1, 'Schildklierhormoon', 1));
    const ea = q.on('eiwitten', 1) * (1 - q.on('Schildklierhormoon', 1)); for (let i = 0; i < 8; i++) { const u = clamp((t - ew - i * 0.3) / 1.5, 0, 1); proteinChain(ctx, coilPath(kx - 600 + i * 70, 760 - u * 120, 4, 14, 10), [2, 5, 9, 14], 7, { alpha: ea * u }); }
    klok(ctx, 400, 700, 70, ramp(t, q.at('uren'), 2) * 6, 'uren', q.on('uren', 1) * (1 - q.on('Schildklierhormoon', 1)));
    // schildklierhormoon: geen steroïd, wel door het membraan
    const sh = q.on('Schildklierhormoon', 1); if (sh > 0.01) { const pp = ramp(t, q.at('membraan', 2), 1.6); hormoonVorm(ctx, 760, lerp(140, 520, pp), 16, 'thyroxine', sh); tag(ctx, 'schildklierhormoon: geen steroïd', 760, 110, HK.hormoon, sh);
      tag(ctx, 'werkt na uren · duurt dagen', 760, 860, C.text2, q.on('dagen', 1)); vraagteken(ctx, 1000, 620, q.on('Waar', 1), 120); }
  },
  s18(ctx, t, q) { bg(ctx, 'schema');
    const a = q.on('Antwoord', 1); vergTabel(ctx, 110, 150, { rows: [['RECEPTOR', 'op het membraan', 'in de cel'], ['EFFECT START', 'binnen seconden', 'na uren'], ['DUUR', 'kort', 'lang: genen aan/uit']], rowA: [a, a, a], colA: [0, 0] });
    kop(ctx, 'membraanreceptor', 110 + 330 + 280, 150, a, C.text2, 50); kop(ctx, 'receptor in de cel', 110 + 330 + 560 + 280, 150, a, C.goud, 50);
    const sh = q.on('werking', 1); hormoonVorm(ctx, 110 + 330 + 560 + 280, 640, 34, 'thyroxine', sh); regel(ctx, 'schildklierhormoon hoort hier', 110 + 330 + 560 + 280, 730, sh, C.goud, 36, 'center');
    tag(ctx, 'het gaat om de werking, niet om de naam', 960, 840, C.goud, q.on('naam', 1));
  },

  // ---------- H3 ----------
  s19(ctx, t, q) { bg(ctx, 'schema');
    const lv = 0.1 + 0.01 * Math.sin(t * 0.8); bakKraan(ctx, 520, 300, 560, 420, lv, 0.35 * q.on('kraan', 1), 0.35 * q.on('afvoer', 1), t, q.on('bak', 1), { labels: 0 });
        tag(ctx, 'klier = kraan', 1560, 330, HK.klier, q.on('klier', 1)); tag(ctx, 'afbraak = afvoer', 1560, 430, C.text2, q.on('afbraak', 1));
    tag(ctx, 'lever · nieren · andere weefsels', 1560, 530, C.text2, q.on('lever', 1));
    tag(ctx, 'peil = concentratie', 1560, 630, C.goud, q.on('waterpeil', 1));
  },
  s20(ctx, t, q) { bg(ctx, 'schema');
    const kn = q.at('knal'), dicht = q.at('dicht'); const open = ramp(t, kn, 0.5) * (1 - ramp(t, dicht, 0.6));
    const lv = 0.08 + 0.72 * ramp(t, kn + 0.3, 3.0); bakKraan(ctx, 420, 300, 560, 420, lv, open, 0.4, t, 1, { labels: 1 });
    tag(ctx, 'in rust: ≈ een tienmiljoenste gram per liter', 1580, 200, C.goud, q.on('tienmiljoenste', 1));
    tag(ctx, 'bij de knal tot wel tien keer zo hoog', 1580, 290, C.koraal, q.on('schiet', 1));
    tag(ctx, 'kraan dicht · peil nog hoog', 1580, 640, C.text2, q.on('dicht', 1));
  },
  s21(ctx, t, q) { bg(ctx, 'schema');
    const u = clamp((t - q.at('grafiek')) / 9, 0, 1);
    grafiek(ctx, 300, 160, 1200, 560, { xmax: 12, ymax: 100, f: conc, u: Math.max(u, q.on('grafiek', 1) * 0.02), xticks: [0, 2, 4, 6, 8, 10, 12], yticks: [0, 25, 50, 75, 100], xlab: 'tijd na de knal (minuten)', ylab: 'extra adrenaline boven rust (piek = 100)',
      marks: [[2, '50', q.on('vijftig', 1)], [4, '25', q.on('vijfentwintig', 1)], [6, '≈ 12', q.on('twaalf', 1)]] });
    tag(ctx, 'elke ≈ 2 minuten de helft weg', 1180, 280, C.goud, q.on('helft', 1));
    tag(ctx, 'na ≈ 10 minuten bijna alles extra weg', 1180, 380, C.text2, q.on('tien', 1));
    metaText(ctx, 'MODEL · HALFWAARDETIJD ≈ 2 MIN', 1500, 640, C.text2, 'right', 22);
  },
  s22(ctx, t, q) { bg(ctx, 'schema');
    const st = 0.45 + 0.03 * Math.sin(t * 0.6); bakKraan(ctx, 520, 300, 520, 400, st, 0.35, 0.35, t, 1, { labels: 0 });
    tag(ctx, 'steeds afbreken, steeds bijmaken', 780, 200, C.goud, q.on('bijmaken', 1));
    tag(ctx, 'te veel of te weinig maakt ziek', 1460, 420, C.koraal, q.on('ziek', 1));
    const nf = q.on('volgende', 1); if (nf > 0.01) { ctx.save(); ctx.globalAlpha *= nf; roundRect(ctx, 1220, 520, 500, 260, 18); shape(ctx, rgba(C.bgSchema, 0.92), C.goud, 1.5); metaText(ctx, 'VOLGENDE FILM', 1470, 570, C.grain, 'center', 24);
      text(ctx, 'Suiker in balans', 1470, 640, fTitel(46), C.text, 'center'); for (let i = 0; i < 6; i++) glucoseZ(ctx, 1340 + i * 52, 720 + Math.sin(t * 2 + i) * 8, 16, 1); ctx.restore(); }
  },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    const steps = [['knal', 'Macro', q.on('knal', 1)], ['zenuw', '', q.on('zenuwstelsel', 1)], ['bijniermerg', '', q.on('bijniermerg', 1)], ['bloed', '', q.on('bloed', 1)], ['hart · lever · vaten', '', q.on('receptoren', 1)]];
    const y = 260; steps.forEach(([n, , a], i) => { const x = 220 + i * 370; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 70, 300, 140, 20); shape(ctx, rgba(C.fill, 0.7), i === 1 ? HK.zenuw : i === 4 ? C.goud : C.line, 2);
      text(ctx, n, x, y + 14, fTekst(36, 700), C.text, 'center'); if (i < 4) arrow(ctx, x + 160, y, x + 210, y, C.line, 1, 3); ctx.restore(); });
    const bpm = lerp(126, 76, ramp(t, q.at('afgebroken'), 7)); hartMeter(ctx, 160, 470, bpm, t, q.on('kalmeren', 1));
    grafiek(ctx, 900, 440, 760, 260, { a: q.on('afgebroken', 1), xmax: 12, ymax: 100, f: conc, u: ramp(t, q.at('afgebroken'), 6), xticks: [0, 4, 8, 12], yticks: [], xlab: 'minuten', ylab: 'extra adrenaline' });
    tag(ctx, 'zenuwen kalmeren snel', 370, 700, HK.zenuw, q.on('kalmeren', 1));
    tag(ctx, 'antwoord b: een stof in je bloed', 960, 850, C.goud, q.on('antwoord', 1));
  },
};
