/* =====================================================================================
   Evolutie · les 2 · Natuurlijke selectie (31 okt 2026)
   Film 2 Natuurlijke selectie (films/evolutie/2-natuurlijke-selectie.html, script v2); havo BvJ H4, vwo Nectar H7.
   Compact (± 25 min), zodat Kamiel hem met les 1 of les 3 in één lesuur kan combineren.
   Eigen hulpen hebben het voorvoegsel L2_. Kleuren zoals de reeks: selectie groen, allel voor hoge snavel blauw,
   allel voor lage snavel geel, nieuw allel paars, kern van de zaak goud. Geen personages in deze les (de film heeft er geen).
   ===================================================================================== */

// ---------- hulpen ----------
// zangvogel van opzij (vink of merel); o.kl = veren, o.kop = kop, o.sn = snavelkleur, o.bek = snavelhoogte (1 = gewoon), o.kijk = -1 kijkt naar links
function L2_vogel(ctx, x, y, s, a, T, o = {}) { if (a <= 0.01) return; const { bek = 1, kijk = 1 } = o;
  const kl = o.kl || (C.licht ? '#6E5A44' : '#8A7258'), kop = o.kop || (C.licht ? '#4A3C2E' : '#5C4B3A'), sn = o.sn || C.oker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 2) * 2); ctx.scale(s * kijk, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 46, 30, -0.15, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, 4); ctx.lineTo(-84, -6); ctx.lineTo(-80, 14); ctx.closePath(); ctx.fillStyle = kop; ctx.fill();
  circ(ctx, 38, -24, 22, kop);
  ctx.beginPath(); ctx.moveTo(54, -24 - 12 * bek); ctx.quadraticCurveTo(54 + 26 + 4 * bek, -24, 56, -24 + 12 * bek); ctx.closePath(); ctx.fillStyle = sn; ctx.fill();
  circ(ctx, 44, -28, 3.5, '#111'); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-6, 28); ctx.lineTo(-10, 52); ctx.moveTo(10, 28); ctx.lineTo(8, 52); ctx.stroke(); ctx.restore(); }
const L2_MEREL = () => ({ kl: '#2E2D33', kop: '#25242A', sn: '#E3A23A' });
// blad (punt naar rechts), lengte ± 2·r
function L2_blad(ctx, x, y, r, rot = 0, a = 1, kl = null) { if (a <= 0.01) return; const k = kl || (C.licht ? '#5E9A4C' : '#4F8A42');
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(-r, 0); ctx.quadraticCurveTo(-r * 0.2, -r * 0.62, r, 0); ctx.quadraticCurveTo(-r * 0.2, r * 0.62, -r, 0); ctx.fillStyle = k; ctx.fill();
  ctx.strokeStyle = mix(k, '#FFFFFF', 0.3); ctx.lineWidth = Math.max(2, r * 0.025); ctx.beginPath(); ctx.moveTo(-r * 1.15, 0); ctx.lineTo(r * 0.95, 0); ctx.stroke();
  for (let i = 1; i < 6; i++) { const u = -r + i * r * 0.32; [-1, 1].forEach(k2 => { ctx.beginPath(); ctx.moveTo(u, 0); ctx.quadraticCurveTo(u + r * 0.12, k2 * r * 0.14, u + r * 0.22, k2 * r * 0.3 * (1 - i / 7)); ctx.stroke(); }); }
  ctx.restore(); }
const L2_GROEN = () => (C.licht ? '#6FAE4E' : '#7BBF57'), L2_BRUIN = () => (C.licht ? '#8A5F3A' : '#A7754A');
// rups: segmenten langs een golf, kop rechts; s = 1 → ± 150 px lang
function L2_rups(ctx, x, y, s, kl, a = 1, T = 0, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let i = 0; i < 10; i++) { const px = -66 + i * 14, py = Math.sin(T * 4 - i * 0.7) * 3; circ(ctx, px, py, i === 9 ? 13 : 11, i === 9 ? mix(kl, '#000000', 0.25) : kl, mix(kl, '#000000', 0.35), 1.5); }
  circ(ctx, 64, -3, 2.6, '#111'); ctx.restore(); }
// Tribulus-vruchtje (deelvrucht met twee grote stekels), s = 1 → ± 80 px
function L2_tribulus(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const kl = C.licht ? '#9C8A5E' : '#B9A576', dk = mix(kl, '#000000', 0.35);
  [[-1, -1], [1, -1]].forEach(([k]) => { ctx.beginPath(); ctx.moveTo(k * 14, -16); ctx.lineTo(k * 34, -48); ctx.lineTo(k * 6, -22); ctx.closePath(); ctx.fillStyle = dk; ctx.fill(); });
  ctx.beginPath(); ctx.moveTo(-30, -14); ctx.quadraticCurveTo(0, -30, 30, -14); ctx.quadraticCurveTo(26, 26, 0, 30); ctx.quadraticCurveTo(-26, 26, -30, -14); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = dk; ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 7; i++) { const an = -2.6 + i * 0.6; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 20, 6 + Math.sin(an) * 16); ctx.lineTo(Math.cos(an) * 27, 6 + Math.sin(an) * 22); ctx.stroke(); }
  ctx.restore(); }
// klein zacht zaadje
function L2_zaad(ctx, x, y, a = 1, r = 7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.7, 0.4, 0, 6.283); ctx.fillStyle = C.licht ? '#C9B07A' : '#D8C190'; ctx.fill(); ctx.restore(); }
// eitje
function L2_ei(ctx, x, y, r, a = 1, kapot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r * 0.78, r, 0, 0, 6.283); ctx.fillStyle = C.licht ? '#E7E1CF' : '#E4DCC6'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  [[0.2, -0.3], [-0.3, 0.1], [0.25, 0.4]].forEach(([dx, dy]) => circ(ctx, x + dx * r, y + dy * r, r * 0.09, C.licht ? '#9A8A6A' : '#8C7C5E')); ctx.restore(); }
// histogram van snavelhoogtes: normale verdeling (mu, sd in mm), as 7,5–11,5 mm; o.amp = hoogte (1 = vol), o.kl, o.rand (alleen omtrek), o.gem (gemiddelde-streep)
const L2_MIN = 7.5, L2_MAX = 11.5;
const L2_mx = (x, w, mm) => x + (mm - L2_MIN) / (L2_MAX - L2_MIN) * w;
function L2_histo(ctx, x, y, w, h, mu, sd, a = 1, o = {}) { if (a <= 0.01) return; const n = 16, bw = w / n, kl = o.kl || C.teal, amp = o.amp == null ? 1 : o.amp;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const m = L2_MIN + (i + 0.5) * (L2_MAX - L2_MIN) / n, v = Math.exp(-0.5 * ((m - mu) / sd) ** 2) * amp, bh = h * v; if (bh < 1) continue;
    roundRect(ctx, x + i * bw + bw * 0.08, y - bh, bw * 0.84, bh, Math.min(6, bw * 0.15)); shape(ctx, o.rand ? null : rgba(kl, 0.6), kl, o.rand ? 3 : 2); }
  if (o.gem) { const gx = L2_mx(x, w, mu); ctx.setLineDash([10, 8]); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, y + 4); ctx.lineTo(gx, y - h - 30); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }
function L2_as(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); ctx.restore();
  [8, 9, 10, 11].forEach(v => regel(ctx, String(v), L2_mx(x, w, v), y + 38, a, C.text2, 26, 'center', 500)); metaText(ctx, 'snavelhoogte (mm)', x + w / 2, y + 82, C.text2, 'center', 20, a); }
// pot met 'snavelallelen': blauw = allel voor een hogere snavel, geel = voor een lagere (vereenvoudigd)
function L2_pot(ctx, x, y, s, p, seed, a) { pot(ctx, x, y, s, { p, n: 50, seed, a }); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 2: natuurlijke selectie. Overproductie, de droogte op Daphne Major, fitness en adaptatie', n: 'Kies eerst havo of vwo (deze les is voor beide gelijk; de film heeft geen vwo-blokken). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 2 van de nieuwe reeks, Natuurlijke selectie: havo Biologie voor jou H4, vwo Nectar H7. Bewust kort (± 25 minuten), te combineren met les 1 of les 3 in één lesuur.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 2', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Natuurlijke', 140, 465, fTitel(98), C.text); text(ctx, 'selectie', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'overproductie · selectiedruk · fitness', 144, 675, 1, C.text2, 32, 'left', 400);
    L2_blad(ctx, 1400, 640, 330, -0.25); L2_rups(ctx, 1380, 650, 1.1, L2_GROEN(), 1, T, -0.25);
    L2_vogel(ctx, 1500, 330, 1.5, 1, T, Object.assign({ kijk: -1 }, L2_MEREL()));
  } });

// ---------- 2 · de rups ----------
SCHERMEN.push({ titel: 'De rups', kop: 'Waarom wint niet altijd de sterkste?', deel: 'Opening',
  stappen: [
    { t: 'Een merel zoekt in een struik naar rupsen. Op dit blad zit er een. Zie je hem?', n: 'De opening van de film. Laat leerlingen eerst zoeken: de groene rups valt bijna weg tegen het blad.' },
    { t: 'Een rups is niet sterk en niet snel. Toch overleven er elk jaar rupsen die de merel niet vindt.', n: 'Startvraag van de film (kun je zelf stellen): In de natuur draait het toch om de sterkste? Waarom wint dan niet altijd het sterkste dier? Het antwoord komt bij fitness (scherm 9).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.8);
    L2_blad(ctx, 760, 620, 420, -0.12, a0); L2_rups(ctx, 860, 600, 1.2, L2_GROEN(), a0, T, -0.12);
    const zoek = 0.5 + 0.5 * Math.sin(T * 0.8); L2_vogel(ctx, 1480 - zoek * 40, 360, 1.6, a0, T, Object.assign({ kijk: -1 }, L2_MEREL()));
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(860, 600, 120, 60, -0.12, 0, 6.283); ctx.stroke(); ctx.restore();
      [['niet sterk', 1460, 700], ['niet snel', 1460, 770]].forEach(([s, x, y]) => { kruis(ctx, x - 150, y - 12, 13, a1, C.koraal); regel(ctx, s, x - 120, y, a1, C.text, 36, 'left', 700); });
      regel(ctx, 'toch overleeft hij', 1310, 870, a1 * S.on(1, 0.6, 0.5), C.goud, 38, 'left', 700); }
  } });

// ---------- 3 · overproductie ----------
SCHERMEN.push({ titel: 'Te veel jongen', kop: 'Meer jongen dan er kunnen overleven', deel: 'Overproductie',
  stappen: [
    { t: 'De middelste grondvink op Daphne Major (Galápagos) legt twee tot vijf eieren per keer. In een nat jaar broedt ze meerdere keren.', n: 'Vraag uit de film: Het aantal vinken op het eiland blijft over de jaren ongeveer gelijk. Hoe kan dat? (a) alleen zoveel jongen als nodig, (b) ouders stoppen als het eiland vol is, (c) de meeste jongen sterven voordat ze zelf jongen krijgen. Antwoord c.' },
    { t: 'Als elk jong zou overleven, verdubbelt de populatie steeds. Maar het eiland heeft maar zoveel zaden.', n: 'Rekenvoorbeeld, geen meting: 2 ouders met 4 jongen per jaar → ×3 per jaar als niemand sterft. Na 5 jaar al ruim 240 keer zoveel.' },
    { t: 'De meeste jongen sterven voordat ze zelf gaan broeden. Meer nakomelingen dan er kunnen overleven heet <b>overproductie</b>.', n: 'Wie blijft er dan over? Dat is niet alleen geluk: geen twee vinken zijn hetzelfde (volgende scherm).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 1.0);
    L2_vogel(ctx, 300, 430, 1.4, a0, T); [0, 1, 2, 3].forEach(i => L2_ei(ctx, 230 + i * 50, 560, 22, a0 * S.on(0, 0.4, 0.3 + i * 0.15)));
    regel(ctx, '2–5 eieren per keer', 305, 640, a0, C.text, 32, 'center', 700);
    // groeicurve: zonder sterfte (stippellijn omhoog) tegen werkelijkheid (vlak)
    const x0 = 640, y0 = 880, gw = 1120, gh = 600;
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0 - gh); ctx.lineTo(x0, y0); ctx.lineTo(x0 + gw, y0); ctx.stroke(); ctx.restore();
      metaText(ctx, 'aantal vinken', x0, y0 - gh - 20, C.text2, 'left', 20, a1); metaText(ctx, 'jaren', x0 + gw, y0 + 44, C.text2, 'right', 20, a1);
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40 * a1, v = (Math.pow(3, u * 5) - 1) / (Math.pow(3, 5) - 1); pts.push([x0 + u * gw, y0 - 40 - v * (gh - 60)]); }
      ctx.save(); ctx.globalAlpha *= a1; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
      regel(ctx, 'als elk jong overleeft', x0 + gw * 0.62, y0 - gh + 60, a1 * S.on(1, 0.5, 1.0), C.koraal, 32, 'right', 700); }
    if (a2 > 0.01) { const u = a2; ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const xx = x0 + i / 60 * gw * u, yy = y0 - 40 - (Math.sin(i * 0.9) * 0.5 + 0.5) * 22; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
      regel(ctx, 'in werkelijkheid: ongeveer gelijk', x0 + gw, y0 - 90, a2, C.groen, 32, 'right', 700);
      termKaart(ctx, 'overproductie', 'meer nakomelingen dan er kunnen overleven', 1200, 400, a2 * S.on(2, 0.6, 0.5)); }
  } });

// ---------- 4 · variatie in snavelhoogte ----------
SCHERMEN.push({ titel: 'Snavelhoogte', kop: 'Geen twee vinken hetzelfde', deel: 'Daphne Major',
  stappen: [
    { t: 'Sinds 1973 meten Peter en Rosemary Grant bijna elke vink op Daphne Major. Onder andere de <b>snavelhoogte</b>: hoe hoog de snavel aan de basis is.', n: 'Daphne Major is een klein, onbewoond eiland; de Grants kunnen er bijna alle vinken vangen, ringen en meten. Hun onderzoek liep tientallen jaren.' },
    { t: 'In een histogram zie je hoeveel vinken elke snavelhoogte hebben. De meeste zitten rond 9 mm; sommige 8, andere 11. Dat is variatie.', n: 'Histogram: hoe hoger de staaf, hoe meer vinken met die snavelhoogte.' },
    { t: 'Die variatie is grotendeels <b>erfelijk</b>: jongen lijken in snavelhoogte op hun ouders.', n: 'Dat is voorwaarde 1 voor natuurlijke selectie (scherm 8). Zonder erfelijkheid zou selectie de volgende generatie niet veranderen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.4), a2 = S.on(2, 0.9);
    L2_vogel(ctx, 370, 470, 2.4, a0, T, { bek: 1.15 });
    if (a0 > 0.01) { const bx = 370 + 54 * 2.4, by = 470 - 24 * 2.4, hb = 13.8 * 2.4; ctx.save(); ctx.globalAlpha *= a0 * S.on(0, 0.5, 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(bx - 4, by - hb - 2); ctx.lineTo(bx - 4, by + hb + 2); ctx.moveTo(bx - 16, by - hb - 2); ctx.lineTo(bx + 8, by - hb - 2); ctx.moveTo(bx - 16, by + hb + 2); ctx.lineTo(bx + 8, by + hb + 2); ctx.stroke(); ctx.restore();
      naam(ctx, 'snavelhoogte', bx + 60, by - hb - 30, a0 * S.on(0, 0.5, 0.5), 'left', C.goud, 32); }
    const hx = 860, hy = 820, hw = 940, hh = 480;
    L2_as(ctx, hx, hy, hw, a1); L2_histo(ctx, hx, hy, hw, hh * a1, 9.2, 0.7, a1, { kl: C.teal });
    if (a2 > 0.01) { pijl(ctx, 400, 560, 470, 630, C.text2, 3, a2); regel(ctx, 'ouder', 230, 590, a2, C.text2, 28, 'center', 600);
      L2_vogel(ctx, 520, 690, 1.1, a2, T + 2, { bek: 1.15 }); regel(ctx, 'jong: lijkt op de ouder', 470, 800, a2, C.text, 30, 'center', 700); }
  } });

// ---------- 5 · droogte ----------
SCHERMEN.push({ titel: 'Droogte', kop: '1977: bijna geen regen', deel: 'Daphne Major',
  stappen: [
    { t: '1977: er valt bijna geen regen. Er groeien nauwelijks nieuwe zaden, en de vinken eten eerst alle kleine, zachte zaadjes op.', n: 'Het droge jaar na een normaal jaar. Er stierven geen vinken door dorst of hitte: ze verhongerden.' },
    { t: 'Wat overblijft zijn de vruchtjes van <b>Tribulus</b>: ± 8 mm, hard en met scherpe stekels.', n: 'Vraag uit de film: Welke vinken hebben de meeste kans om de droogte te overleven? (a) de vinken met de hoogste snavels, (b) de sterkste en snelste vinken, (c) elke vink evenveel. Antwoord a.' },
    { t: 'Een hoge snavel kraakt zo\'n vruchtje sneller open. Een vink met een lage snavel krijgt het nauwelijks open.', n: 'De droogte is hier de <b>selectiedruk</b>: de omstandigheid die bepaalt wie overleeft (scherm 8).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.6), a1 = S.on(1, 0.9), a2 = S.on(2, 1.0);
    ctx.save(); ctx.fillStyle = rgba(C.grond, C.licht ? 0.55 : 0.6); ctx.fillRect(80, 760, 1760, 260); ctx.restore();
    circ(ctx, 1700, 280, 80, rgba(C.goud, 0.85)); gloed(ctx, 1700, 280, 220, C.goud, 0.8);
    for (let i = 0; i < 26; i++) { const v = clamp(1 - a0 * 1.4 + hash(i * 3.3) * 0.5, 0, 1); L2_zaad(ctx, 160 + hash(i) * 1600, 800 + hash(i * 7.1) * 190, v); }
    for (let i = 0; i < 7; i++) L2_tribulus(ctx, 220 + i * 240 + hash(i) * 60, 870 + hash(i * 2) * 90, 0.8, a1 * S.on(1, 0.5, i * 0.1), hash(i * 5) * 2);
    if (a1 > 0.01) { L2_tribulus(ctx, 960, 400, 2.6, a1); naam(ctx, 'Tribulus · ± 8 mm, hard, stekels', 960, 560, a1, 'center', C.text, 32); }
    if (a2 > 0.01) {
      L2_vogel(ctx, 330, 680, 1.3, a2, T, { bek: 1.35 }); regel(ctx, 'hoge snavel', 330, 790, a2, C.teal, 32, 'center', 700); vink(ctx, 470, 600, 20, a2, C.groen);
      L2_vogel(ctx, 1560, 680, 1.3, a2, T + 1, { bek: 0.75, kijk: -1 }); regel(ctx, 'lage snavel', 1560, 790, a2, C.oker, 32, 'center', 700); kruis(ctx, 1420, 600, 18, a2, C.koraal);
    }
  } });

// ---------- 6 · wie overleeft ----------
SCHERMEN.push({ titel: 'Overlevers', kop: 'Wie overleeft de droogte?', deel: 'Daphne Major',
  stappen: [
    { t: 'Begin 1977: ± 1200 middelste grondvinken op het eiland. Een jaar later zijn er nog ± 180 over.', n: 'Elke stip = 5 vinken. De getallen zijn die van de film; in de literatuur verschillen ze wat (zie briefing), het beeld niet: veruit de meeste vinken stierven.' },
    { t: 'Kijk naar de overlevers: hun snavels zijn gemiddeld ruim een halve millimeter hoger dan die van de vinken vóór de droogte.', n: 'Lijkt weinig, maar bij een hard vruchtje maakt het veel uit. De overlevers zijn hier op dezelfde hoogte getekend om de verdeling te vergelijken (in aantallen zijn het er veel minder).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.8), a1 = S.on(1, 1.2);
    const lev = (i) => hash(i * 1.37 + 0.5) < 0.15;
    stippen(ctx, 160, 210, 620, 520, 240, (i) => lev(i) ? C.teal : rgba(C.teal, lerp(1, 0.12, ease(clamp(a0 * 1.6 - 0.5, 0, 1)))), S.on(0, 0.5), { r: 11 });
    regel(ctx, '± 1200', 470, 800, S.on(0, 0.5), C.text, 46, 'center', 700);
    const b = ease(clamp(a0 * 1.6 - 0.5, 0, 1)); if (b > 0.01) { pijl(ctx, 560, 785, 640, 785, C.text2, 4, b); regel(ctx, '± 180', 720, 800, b, C.teal, 46, 'center', 700); }
    const hx = 900, hy = 760, hw = 900, hh = 420;
    L2_as(ctx, hx, hy, hw, a1); L2_histo(ctx, hx, hy, hw, hh, 9.2, 0.7, a1, { kl: C.line, rand: true, gem: true });
    L2_histo(ctx, hx, hy, hw, hh * 0.92, 9.2 + 0.6 * a1, 0.65, a1 * S.on(1, 0.5, 0.3), { kl: C.teal, gem: true });
    regel(ctx, 'vóór de droogte', L2_mx(hx, hw, 9.2) - 20, hy - hh - 50, a1, C.text2, 28, 'right', 600);
    regel(ctx, 'overlevers', L2_mx(hx, hw, 9.8) + 20, hy - hh - 50, a1 * S.on(1, 0.5, 0.5), C.teal, 30, 'left', 700);
    regel(ctx, 'ruim 0,5 mm hoger', hx + hw / 2, 960, a1 * S.on(1, 0.5, 0.8), C.goud, 36, 'center', 700);
  } });

// ---------- 7 · de jongen ----------
SCHERMEN.push({ titel: 'De jongen', kop: 'De volgende generatie', deel: 'Daphne Major',
  stappen: [
    { t: 'De overlevers krijgen in 1978 jongen. Die hebben gemiddeld een hogere snavel: ± 4 % hoger dan de vinken van vóór de droogte.', n: 'Vraag uit de film: Hoe hoog zijn de snavels van die jongen? (a) net als vóór de droogte, (b) gemiddeld hoger, maar nog steeds verschillend, (c) allemaal hoog. Antwoord b.' },
    { t: 'Er zijn nog steeds lage, gemiddelde en hoge snavels. Het hele histogram is een stukje opgeschoven.', n: 'Selectie haalt de variatie niet weg; de verdeling schuift. Dat heet in les 3 gerichte selectie.' },
    { t: 'Vereenvoudigd: allelen voor een hoge snavel zijn vaker geworden in de genenpool. De allelfrequentie is veranderd. Dat is <b>evolutie</b>, in één generatie.', n: 'Snavelhoogte hangt af van veel genen; de pot is een vereenvoudiging, net als in de film. Blauw = allel voor een hogere snavel, geel = voor een lagere. Brug naar les 1: evolutie = verandering van allelfrequenties.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.2), a1 = S.on(1, 0.8), a2 = S.on(2, 1.2);
    const hx = 140, hy = 760, hw = 980, hh = 440;
    L2_as(ctx, hx, hy, hw, 1); L2_histo(ctx, hx, hy, hw, hh, 9.2, 0.7, 1, { kl: C.line, rand: true, gem: true });
    regel(ctx, '1976 · ouders', L2_mx(hx, hw, 9.2) - 20, hy - hh - 50, 1, C.text2, 28, 'right', 600);
    L2_histo(ctx, hx, hy, hw, hh * 0.98, 9.2 + 0.37 * a0, 0.7, a0, { kl: C.teal, gem: true });
    regel(ctx, '1978 · jongen', L2_mx(hx, hw, 9.57) + 20, hy - hh - 50, a0, C.teal, 30, 'left', 700);
    if (a1 > 0.01) { [[8.3, 0.8], [9.5, 1.05], [10.6, 1.35]].forEach(([mm, bek], i) => L2_vogel(ctx, L2_mx(hx, hw, mm), 900, 0.7, a1 * S.on(1, 0.5, i * 0.2), T + i, { bek }));
      regel(ctx, 'nog steeds variatie', hx + hw / 2, 1010, a1, C.goud, 36, 'center', 700); }
    if (a2 > 0.01) { L2_pot(ctx, 1380, 640, 0.75, 0.4, 3, a2); L2_pot(ctx, 1700, 640, 0.75, 0.5, 6, a2 * S.on(2, 0.6, 0.5)); pijl(ctx, 1500, 500, 1580, 500, C.goud, 4, a2 * S.on(2, 0.6, 0.5));
      allelBalk(ctx, 1260, 680, 240, 0.4, a2); allelBalk(ctx, 1580, 680, 240, 0.5, a2 * S.on(2, 0.6, 0.5));
      regel(ctx, 'evolutie', 1540, 880, a2 * S.on(2, 0.6, 0.9), C.goud, 44, 'center', 700); regel(ctx, 'in één generatie', 1540, 930, a2 * S.on(2, 0.6, 0.9), C.text2, 30, 'center', 500); }
  } });

// ---------- 8 · drie voorwaarden ----------
SCHERMEN.push({ titel: 'Drie voorwaarden', kop: 'Wat was er nodig?', deel: 'Natuurlijke selectie',
  stappen: [
    { t: 'Eén: <b>erfelijke variatie</b>. De vinken verschilden, en dat verschil ging over op de jongen.', n: 'Variatie alleen is niet genoeg: verschillen door de omgeving (les 1, de stippen door kou) erf je niet.' },
    { t: 'Twee: meer nakomelingen dan er kunnen overleven: <b>overproductie</b>.', n: 'Er is dus altijd concurrentie om voedsel, plek en partners.' },
    { t: 'Drie: <b>selectiedruk</b>. Hier bepaalde de droogte wie bleef leven.', n: 'Andere voorbeelden van selectiedruk: een rover, een ziekte, kou, een antibioticum (les 4: de mens als selectiefactor).' },
    { t: 'Komen die drie samen, dan krijg je <b>natuurlijke selectie</b>. Vinken met een hoge snavel hadden een <b>selectievoordeel</b>.', n: 'Selectievoordeel: door een erfelijke eigenschap meer kans om te overleven en jongen te krijgen.' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.8), S.on(1, 0.8), S.on(2, 0.8), S.on(3, 1.0)];
    const kol = [['erfelijke variatie', C.teal], ['overproductie', C.oker], ['selectiedruk', C.koraal]];
    kol.forEach(([kop, col], i) => { const a = s[i]; if (a <= 0.01) return; const x = 140 + i * 580;
      paneel(ctx, x, 190, 520, 480, a, rgba(col, 0.6)); regel(ctx, (i + 1) + ' · ' + kop, x + 260, 260, a, col, 38, 'center', 700);
      if (i === 0) [0.8, 1.05, 1.35].forEach((bek, k) => L2_vogel(ctx, x + 120 + k * 140, 480, 0.75, a, T + k, { bek }));
      if (i === 1) { for (let k = 0; k < 10; k++) { const ex = x + 90 + (k % 5) * 85, ey = 410 + Math.floor(k / 5) * 120; L2_ei(ctx, ex, ey, 30, a); if (k > 1) kruis(ctx, ex, ey, 16, a * S.on(1, 0.5, 0.4), C.koraal); } }
      if (i === 2) { circ(ctx, x + 380, 400, 50, rgba(C.goud, 0.85 * a)); gloed(ctx, x + 380, 400, 130, C.goud, a); L2_tribulus(ctx, x + 170, 500, 1.4, a); } });
    if (s[3] > 0.01) { balk(ctx, 'natuurlijke selectie', 960, 790, 760, s[3], C.groen, 46);
      [430, 960, 1490].forEach(x => pijl(ctx, x, 680, lerp(x, 960, 0.5), 728, C.groen, 4, s[3]));
      termKaart(ctx, 'selectievoordeel', 'door een erfelijke eigenschap meer kans op overleven en jongen', 960, 880, s[3] * S.on(3, 0.6, 0.6), C.groen); }
  } });

// ---------- 9 · fitness ----------
SCHERMEN.push({ titel: 'Fitness', kop: 'Wie wint? Tel de jongen', deel: 'Natuurlijke selectie',
  stappen: [
    { t: 'Biologen meten succes met <b>fitness</b>: het aantal nakomelingen dat zelf overleeft en zich voortplant.', n: 'Fitness is dus geen conditie of sportiviteit. Groot, sterk of snel telt alleen als het meer van zulke nakomelingen oplevert.' },
    { t: 'Een kleine vink leeft 4 jaar en brengt 6 jongen groot die zelf broeden. Een grote, sterke vink leeft 10 jaar, met 2 broedende jongen.', n: 'Vraag uit de film: Welke vink heeft de hoogste fitness? (a) de kleine vink, 6 jongen die zelf broeden, (b) de grote, sterke vink, 2 jongen, (c) allebei even hoog: fitness gaat over de soort. Antwoord a.' },
    { t: 'De kleine vink geeft de meeste allelen door. Daarom wint niet altijd het sterkste dier: soms is dat de sterkste, vaak niet.', n: 'Antwoord op de startvraag van de film (scherm 2). Fitness is een eigenschap van een individu (of een allel), niet van de soort.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.8), a1 = S.on(1, 1.6), a2 = S.on(2, 0.9);
    termKaart(ctx, 'fitness', 'aantal nakomelingen dat zelf overleeft en zich voortplant', 960, 170, a0);
    const rij = [[480, 0.95, 4, 6], [1440, 1.55, 10, 2]];
    rij.forEach(([x, s, jaar, n], i) => { const a = a1 * S.on(1, 0.6, i * 0.3); if (a <= 0.01) return;
      L2_vogel(ctx, x, 470 - (s - 1) * 20, s * 1.4, a, T + i, { bek: 1 }); regel(ctx, i ? 'groot en sterk' : 'klein', x, 620, a, C.text, 34, 'center', 700);
      regel(ctx, 'leeft ' + jaar + ' jaar', x, 670, a, C.text2, 30, 'center', 500);
      for (let k = 0; k < n; k++) { const v = S.on(1, 0.4, 0.8 + k * 0.12 + i * 0.2); L2_vogel(ctx, x + (k - (n - 1) / 2) * 110, 800, 0.55, a * v, T + k, { bek: 1 }); }
      regel(ctx, n + ' jongen die zelf broeden', x, 900, a * S.on(1, 0.5, 1.2), C.text, 30, 'center', 700); });
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, 480 - 380, 720, 760, 210, 24); ctx.stroke(); ctx.restore();
      regel(ctx, 'hoogste fitness', 480, 990, a2, C.goud, 40, 'center', 700); regel(ctx, 'niet altijd de sterkste', 1440, 990, a2, C.text2, 34, 'center', 600); }
  } });

// ---------- 10 · adaptatie ----------
const L2_RUPS = [[-300, -40, 0], [-180, 30, 1], [-60, -50, 0], [60, 20, 1], [170, -40, 0], [280, 30, 0], [-240, 80, 1], [10, 90, 0], [220, 100, 1], [-120, -110, 0]];
SCHERMEN.push({ titel: 'Adaptatie', kop: 'Groen worden, zonder het te willen', deel: 'Aangepast, zonder doel',
  stappen: [
    { t: 'Terug naar de rups. In een populatie rupsen zijn er groenere en bruinere.', n: 'Ook dit is erfelijke variatie (vereenvoudigd: een allel voor groen en een voor bruin).' },
    { t: 'De merel vindt de bruine het eerst. Groene rupsen worden vaker vlinder en krijgen meer nakomelingen.', n: 'De merel is hier de selectiedruk. De groene rupsen hebben een selectievoordeel en een hogere fitness.' },
    { t: 'Zo is groen generatie na generatie de gewone kleur geworden: een <b>adaptatie</b>. Hier is het camouflage.', n: 'Adaptatie: een erfelijke eigenschap die door natuurlijke selectie algemeen is geworden. Camouflage: hij valt weg tegen het blad.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.6), a2 = S.on(2, 1.2);
    L2_blad(ctx, 720, 560, 560, -0.05, a0);
    L2_RUPS.forEach(([dx, dy, bruin], i) => { const weg = bruin ? clamp(a1 * 1.8 - 0.4 - i * 0.03, 0, 1) : 0;
      L2_rups(ctx, 720 + dx, 560 + dy, 0.75, bruin ? L2_BRUIN() : L2_GROEN(), a0 * (1 - weg), T + i, (hash(i) - 0.5) * 0.6);
      if (bruin && weg > 0.01 && weg < 0.99) kruis(ctx, 720 + dx, 560 + dy, 16, Math.sin(weg * Math.PI), C.koraal); });
    L2_vogel(ctx, 1460, 300, 1.4, a1, T, Object.assign({ kijk: -1 }, L2_MEREL()));
    if (a2 > 0.01) { [[0.6, 'generatie 1'], [0.8, 'generatie 5'], [0.95, 'generatie 20']].forEach(([p, nm], i) => { const a = a2 * S.on(2, 0.5, i * 0.25), y = 520 + i * 110;
        ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1320, y, 420, 40, 20); ctx.save(); ctx.clip(); ctx.fillStyle = L2_GROEN(); ctx.fillRect(1320, y, 420 * p, 40); ctx.fillStyle = L2_BRUIN(); ctx.fillRect(1320 + 420 * p, y, 420 * (1 - p), 40); ctx.restore(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; roundRect(ctx, 1320, y, 420, 40, 20); ctx.stroke(); ctx.restore();
        regel(ctx, nm, 1320, y - 10, a, C.text2, 24, 'left', 500); });
      termKaart(ctx, 'adaptatie', 'erfelijke eigenschap, door selectie algemeen geworden', 960, 900, a2 * S.on(2, 0.6, 0.8), C.groen); }
  } });

// ---------- 11 · zonder doel ----------
SCHERMEN.push({ titel: 'Zonder doel', kop: 'Selectie heeft geen doel', deel: 'Aangepast, zonder doel',
  stappen: [
    { t: 'Een groene rups leeft op een rood blad. Zijn jongen erven alleen de allelen die hij al had, niet een rodere kleur.', n: 'Vraag uit de film: Wat erven zijn jongen van hem? (a) een rodere kleur, omdat hij dat nodig had, (b) de allelen die hij zelf al had, (c) niets: alleen de sterkste rupsen geven allelen door. Antwoord b.' },
    { t: 'Selectie maakt zelf geen nieuwe allelen. Ze werkt met de variatie die er al is. Nieuwe allelen ontstaan door mutatie: toeval.', n: 'Mutatie = toevallige verandering in het DNA (DNA-reeks, les 1). Paars = nieuw allel, zoals in de hele reeks.' },
    { t: 'Wat een voordeel is, hangt af van de omgeving. Na de natte El Niño-jaren van 1983 deden juist vinken met een kleinere snavel het beter.', n: 'Er lagen toen vooral kleine, zachte zaadjes. De richting van selectie kan dus omdraaien.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 0.9), a2 = S.on(2, 1.0);
    L2_blad(ctx, 340, 330, 200, -0.1, a0, C.licht ? '#B4473A' : '#C25A48'); L2_rups(ctx, 350, 320, 0.8, L2_GROEN(), a0, T, -0.1);
    misvatting(ctx, 'jongen worden roder, omdat het moet', 'jongen erven de allelen die hij al had', 1150, 220, 1160, a0, S.on(0, 0.6, 0.6));
    if (a1 > 0.01) { knikker(ctx, 300, 640, 30, EV().a1, a1); knikker(ctx, 380, 640, 30, EV().a2, a1); regel(ctx, 'bestaande variatie', 340, 710, a1, C.text, 30, 'center', 700);
      knikker(ctx, 560, 640, 30, EV().nieuw, a1 * S.on(1, 0.5, 0.5)); gloed(ctx, 560, 640, 70, C.paars, a1 * S.on(1, 0.5, 0.5) * (0.5 + 0.3 * Math.sin(T * 2))); regel(ctx, 'mutatie', 560, 710, a1 * S.on(1, 0.5, 0.5), C.paars, 30, 'center', 700); }
    if (a2 > 0.01) { [['1977 · droog', 1, 'hoge snavel wint', 1.35, 1000], ['1983 · nat (El Niño)', 0, 'kleine snavel wint', 0.75, 1560]].forEach(([kop, droog, wint, bek, x], i) => { const a = a2 * S.on(2, 0.6, i * 0.4);
        paneel(ctx, x - 270, 480, 540, 500, a, rgba(droog ? C.koraal : C.teal, 0.6)); regel(ctx, kop, x, 545, a, droog ? C.koraal : C.teal, 34, 'center', 700);
        if (droog) { L2_tribulus(ctx, x - 140, 680, 1.0, a); L2_tribulus(ctx, x - 60, 720, 0.8, a, 1.2); } else for (let k = 0; k < 9; k++) L2_zaad(ctx, x - 200 + (k % 3) * 40, 650 + Math.floor(k / 3) * 40, a, 9);
        L2_vogel(ctx, x + 110, 700, 1.1, a, T + i, { bek }); regel(ctx, wint, x, 900, a, C.text, 34, 'center', 700); }); }
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Natuurlijke selectie', deel: 'Afsluiting',
  stappen: [
    { t: 'Natuurlijke selectie heeft drie dingen nodig: <b>erfelijke variatie</b>, <b>overproductie</b> en <b>selectiedruk</b>.', n: 'De drie voorwaarden uit scherm 8. Bij Daphne Major: snavelhoogte, te veel jongen, de droogte.' },
    { t: '<b>Fitness</b>: tel de nakomelingen die zelf ook weer jongen krijgen. Wie de meeste heeft, geeft de meeste allelen door. Niet de sterkste.', n: 'Terug naar de startvraag: voor een rups is dat de groene, voor een vink in een droog jaar die met de hoogste snavel.' },
    { t: 'Selectie heeft <b>geen doel</b>: de omgeving bepaalt wat een voordeel is. Een adaptatie is zo ontstaan.', n: 'Een individu evolueert niet; de genenpool van de populatie verandert (les 1).' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['drie voorwaarden', C.groen, ['erfelijke variatie', 'overproductie', 'selectiedruk']], ['fitness', C.goud, ['nakomelingen die', 'zelf jongen krijgen', 'niet de sterkste']], ['geen doel', C.teal, ['omgeving bepaalt', 'het voordeel', 'adaptatie: camouflage']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 44, 'center', 700);
      if (i === 0) { L2_vogel(ctx, x + 180, 470, 1.0, a, T, { bek: 1.3 }); L2_tribulus(ctx, x + 380, 480, 1.2, a); }
      if (i === 1) { L2_vogel(ctx, x + 270, 420, 0.8, a, T); for (let k = 0; k < 6; k++) L2_vogel(ctx, x + 95 + k * 70, 540, 0.38, a, T + k); }
      if (i === 2) { L2_blad(ctx, x + 270, 470, 200, -0.1, a); L2_rups(ctx, x + 280, 465, 0.8, L2_GROEN(), a, T, -0.1); }
      regels.forEach((r, k) => regel(ctx, r, x + 40, 690 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · volgende keer ----------
function L2_icoonHisto(ctx, x, y, a, mus, sd, pijlR = 0) { if (a <= 0.01) return; const w = 240, hx = x - w / 2, hy = y + 70;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + w, hy); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 12; i++) { const m = (i + 0.5) / 12; let v = 0; mus.forEach(mu => { v = Math.max(v, Math.exp(-0.5 * ((m - mu) / sd) ** 2)); });
    ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, hx + i * w / 12 + 2, hy - 130 * v, w / 12 - 4, Math.max(0.1, 130 * v), 4); shape(ctx, rgba(C.teal, 0.6), C.teal, 1.5); ctx.restore(); }
  if (pijlR) pijl(ctx, x - 30, y - 90, x + 50 * pijlR, y - 90, C.goud, 4, a); }
function L2_icoonGericht(ctx, x, y, a) { L2_icoonHisto(ctx, x, y, a, [0.62], 0.15, 1); }
function L2_icoonStabiel(ctx, x, y, a) { L2_icoonHisto(ctx, x, y, a, [0.5], 0.09); }
function L2_icoonSplits(ctx, x, y, a) { L2_icoonHisto(ctx, x, y, a, [0.25, 0.75], 0.09); }
function L2_icoonPauw(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(Math.sin(T) * 0.05);
  ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 110); ctx.lineTo(0, -60); ctx.stroke();
  for (let i = 0; i < 18; i++) { const yy = 100 - i * 9; ctx.strokeStyle = rgba(C.groen, 0.6); ctx.lineWidth = 2; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(0, yy); ctx.quadraticCurveTo(k * 40, yy - 12, k * (30 + i * 2), yy - 30); ctx.stroke(); }); }
  ctx.beginPath(); ctx.ellipse(0, -60, 54, 66, 0, 0, 6.283); ctx.fillStyle = C.licht ? '#3E8E5A' : '#4FA06A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -56, 36, 44, 0, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -52, 22, 28, 0, 0, 6.283); ctx.fillStyle = '#2A6A9A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -48, 12, 15, 0, 0, 6.283); ctx.fillStyle = '#1A2238'; ctx.fill(); ctx.restore(); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 3): <b>vormen van selectie</b>. Gericht, stabiliserend, splitsend, en seksuele selectie.', n: 'Huiswerk: de film Natuurlijke selectie (nog eens) kijken. Wie vooruit wil: film 3 Vormen van selectie (startvraag: Waarom worden baby\'s niet steeds zwaarder?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Vormen van selectie', [['Gericht', 'de verdeling schuift', L2_icoonGericht], ['Stabiliserend', 'het midden wint', L2_icoonStabiel], ['Splitsend', 'de uitersten winnen', L2_icoonSplits], ['Seksuele selectie', 'pronken en kiezen', L2_icoonPauw]]); } });
