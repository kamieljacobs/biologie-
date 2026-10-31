/* =====================================================================================
   Evolutie · les 6 · Hoe een soort er twee wordt (31 okt 2026)
   Film 6 Hoe één soort er twee wordt (films/evolutie/6-hoe-een-soort-er-twee-wordt.html, script v2); havo + vwo.
   Compact (± 25 min). Eigen hulpen hebben het voorvoegsel L6_. Kleuren zoals de reeks: allel 1 blauw, allel 2 geel,
   nieuw allel paars; krachten: selectie groen, toeval goud, uitwisseling (genenstroom) blauw, mutatie paars.
   Chromosomen: van de vader (paard) blauw, van de moeder (ezel) oker, zoals de erfelijkheidslessen.
   Personage: de veehouder (alleen in de opening, zoals in de film), zonder naam in beeld.
   vwo-blokken uit het script (allopatrisch/sympatrisch, cichliden in het Victoriameer) = scherm 10 en 11.
   ===================================================================================== */

// ---------- hulpen ----------
// viervoeter van opzij, kijkt naar rechts (o.kijk = -1 naar links); anker = grond onder het midden van de romp; s = 1 → romp ± 300 lang
// o: kl (vacht), bl/bh (romp), poot, nek (0..1.2), kop, snuit, oor, staart ('paard','ezel','pluim','krul'), manen, hoef, buik
function L6_dier(ctx, x, y, s, a, T, o = {}) { if (a <= 0.01) return;
  const { kl = '#8A6A4A', bl = 300, bh = 110, poot = 150, nek = 1, kop = 1, snuit = 1, oor = 30, staart = 'paard', kijk = 1 } = o;
  const dkl = mix(kl, '#000000', 0.28), lkl = mix(kl, '#FFFFFF', 0.18), by = -poot - bh / 2, lw = bh * 0.2;
  laag(ctx, a, (c) => { c.save(); c.translate(x, y); c.scale(s * kijk, s);
    const been = (px, kleur, fase) => { const sw = Math.sin(T * 1.2 + fase) * 2; c.strokeStyle = kleur; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(px, by + bh * 0.15); c.lineTo(px + sw, -lw / 2); c.stroke();
      if (o.hoef) { c.fillStyle = '#2A2422'; c.fillRect(px + sw - lw * 0.55, -lw * 0.6, lw * 1.1, lw * 0.6); } };
    been(-bl / 2 + 40, dkl, 0); been(bl / 2 - 30, dkl, 1);
    // staart
    const sx = -bl / 2 + 8, sy = by - bh * 0.3; c.lineCap = 'round';
    if (staart === 'paard') { c.strokeStyle = o.manen || dkl; c.lineWidth = 22; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - 50, sy + 30, sx - 40, sy + bh + 40); c.stroke(); }
    else if (staart === 'ezel') { c.strokeStyle = dkl; c.lineWidth = 7; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - 30, sy + 20, sx - 26, sy + bh); c.stroke(); circ(c, sx - 26, sy + bh + 10, 12, '#2A2422'); }
    else if (staart === 'pluim') { c.fillStyle = kl; c.beginPath(); c.moveTo(sx + 6, sy - 10); c.quadraticCurveTo(sx - 60, sy + 10, sx - 70, sy + bh * 0.9); c.quadraticCurveTo(sx - 30, sy + bh * 0.7, sx + 6, sy + 16); c.closePath(); c.fill(); circ(c, sx - 66, sy + bh * 0.86, 9, dkl); }
    else { c.strokeStyle = kl; c.lineWidth = 9; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - 40, sy - 10, sx - 24, sy - 50); c.stroke(); }
    // romp
    c.beginPath(); c.ellipse(0, by, bl / 2, bh / 2, 0, 0, 6.283); c.fillStyle = kl; c.fill();
    if (o.buik) { c.save(); c.beginPath(); c.ellipse(0, by, bl / 2, bh / 2, 0, 0, 6.283); c.clip(); c.fillStyle = o.buik; c.beginPath(); c.ellipse(0, by + bh * 0.42, bl * 0.42, bh * 0.22, 0, 0, 6.283); c.fill(); c.restore(); }
    been(-bl / 2 + 64, kl, 2.4); been(bl / 2 - 56, kl, 3.6);
    // nek en kop
    const nx = bl / 2 - 30, ny = by - bh * 0.25, kx = bl / 2 + 20 + 30 * nek, ky = by - bh * 0.3 - 110 * nek;
    c.strokeStyle = kl; c.lineWidth = bh * 0.62; c.lineCap = 'round'; c.beginPath(); c.moveTo(nx, ny); c.lineTo(kx - 6, ky + 8); c.stroke();
    if (o.manen && nek > 0.4) { c.strokeStyle = o.manen; c.lineWidth = 16; c.beginPath(); c.moveTo(nx - 30, ny - bh * 0.32); c.lineTo(kx - 26, ky - 18); c.stroke(); }
    // oren
    const oorP = (dx, kk) => { c.beginPath(); c.moveTo(kx - 18 + dx, ky - 18 * kop); c.lineTo(kx - 30 + dx + oor * 0.25, ky - 18 * kop - oor); c.lineTo(kx - 2 + dx, ky - 22 * kop); c.closePath(); c.fillStyle = kk; c.fill(); };
    oorP(-10, dkl); oorP(4, kl);
    const rot = 0.25 + 0.35 * nek;
    c.save(); c.translate(kx, ky); c.rotate(rot); c.beginPath(); c.ellipse(16 * snuit, 0, 44 * kop * snuit, 24 * kop, 0, 0, 6.283); c.fillStyle = kl; c.fill();
    c.beginPath(); c.ellipse(50 * kop * snuit, 4 * kop, 16 * kop, 15 * kop, 0, 0, 6.283); c.fillStyle = o.neus || lkl; c.fill();
    circ(c, 60 * kop * snuit, 0, 3.5 * kop, '#1A1416'); c.restore();
    circ(c, kx + 8 * kop, ky - 8 * kop, 4.5 * kop, '#14100E');
    c.restore(); }); }
const L6_PAARD = () => ({ kl: '#8A5A36', manen: '#3A2A1E', staart: 'paard', hoef: true, oor: 30, nek: 1, kop: 1.05, snuit: 1.15, bl: 320, bh: 115, poot: 160 });
const L6_EZEL = () => ({ kl: '#8E8A86', buik: '#D6D0C6', neus: '#D6D0C6', staart: 'ezel', hoef: true, oor: 78, nek: 0.75, kop: 1.05, snuit: 1, bl: 270, bh: 105, poot: 120 });
const L6_MUIL = () => ({ kl: '#6E5440', manen: '#3A2A1E', neus: '#B8A08A', staart: 'ezel', hoef: true, oor: 56, nek: 0.85, kop: 1.05, snuit: 1.1, bl: 300, bh: 112, poot: 145 });
const L6_WOLF = () => ({ kl: '#8E8478', buik: '#D2CCC0', neus: '#C8C0B4', staart: 'pluim', oor: 36, nek: 0.35, kop: 0.95, snuit: 0.9, bl: 260, bh: 92, poot: 120 });
const L6_CHI = () => ({ kl: '#D2A46A', neus: '#E8C9A0', staart: 'krul', oor: 52, nek: 0.25, kop: 1.25, snuit: 0.55, bl: 200, bh: 90, poot: 90 });
// veulen als stippellijn (geen jong)
function L6_geenJong(ctx, x, y, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(x, y - 100 * s, 80 * s, 34 * s, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 60 * s, y - 120 * s); ctx.lineTo(x + 90 * s, y - 170 * s); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x + 104 * s, y - 180 * s, 28 * s, 16 * s, 0.5, 0, 6.283); ctx.stroke();
  [-50, -30, 40, 60].forEach(dx => { ctx.beginPath(); ctx.moveTo(x + dx * s, y - 72 * s); ctx.lineTo(x + dx * s, y); ctx.stroke(); }); ctx.restore(); kruis(ctx, x + 10 * s, y - 100 * s, 30 * s, a); }
// muis van opzij (kijk = 1 naar rechts)
function L6_muis(ctx, x, y, s, a, kijk = 1, kl = '#9A8670') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.strokeStyle = mix(kl, '#E8B0A0', 0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-56, 6, -64, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -12, 30, 16, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.beginPath(); ctx.moveTo(18, -22); ctx.lineTo(44, -8); ctx.lineTo(18, -2); ctx.closePath(); ctx.fill();
  circ(ctx, 16, -26, 9, mix(kl, '#E8B0A0', 0.4)); circ(ctx, 30, -14, 2.4, '#111'); circ(ctx, 44, -8, 2.4, '#3A2A2A'); ctx.restore(); }
// vogel in de vlucht
function L6_vogel(ctx, x, y, s, a, T, kl = null) { if (a <= 0.01) return; const k = kl || (C.licht ? '#4A5A6E' : '#B8C4D2'), f = Math.sin(T * 6) * 0.5;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = k; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-50, -20 * f - 10); ctx.quadraticCurveTo(-22, -24, 0, 0); ctx.quadraticCurveTo(22, -24, 50, -20 * f - 10); ctx.stroke(); circ(ctx, 0, 2, 8, k); ctx.restore(); }
// slak (kijkt naar rechts)
function L6_slak(ctx, x, y, s, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, -8, 44, -4); ctx.quadraticCurveTo(54, -14, 46, -24); ctx.lineTo(30, -16); ctx.lineTo(-40, -6); ctx.closePath(); ctx.fillStyle = '#B8A07E'; ctx.fill();
  ctx.strokeStyle = '#8A7458'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(44, -20); ctx.lineTo(52, -42); ctx.moveTo(38, -18); ctx.lineTo(40, -38); ctx.stroke();
  circ(ctx, -4, -30, 30, '#A0643A', '#6E4022', 2.5); ctx.strokeStyle = '#6E4022'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i < 60; i++) { const an = i * 0.22, r = 26 - i * 0.4; const px = -4 + Math.cos(an) * r, py = -30 + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// kikker, zittend van opzij (kijk = 1 naar rechts)
function L6_kikker(ctx, x, y, s, a, kl, kijk = 1, T = 0) { if (a <= 0.01) return; const d = mix(kl, '#000000', 0.3), adem = 1 + Math.sin(T * 3) * 0.03;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.beginPath(); ctx.ellipse(-34, -26, 40, 26, -0.2, 0, 6.283); ctx.fillStyle = d; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-70, -60, -10, -66); ctx.quadraticCurveTo(46, -64, 58, -30); ctx.quadraticCurveTo(50, -6, 20, 0); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  ctx.beginPath(); ctx.ellipse(10, -16 * adem, 30, 12 * adem, 0, 0, 6.283); ctx.fillStyle = mix(kl, '#FFFFFF', 0.4); ctx.fill();
  circ(ctx, 24, -64, 13, kl); circ(ctx, 26, -66, 7, '#1A1A14'); circ(ctx, 28, -68, 2, '#FFFFFF');
  ctx.strokeStyle = d; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, -20); ctx.lineTo(38, 0); ctx.lineTo(50, 0); ctx.stroke(); ctx.restore(); }
// cichlide (kijk = 1 naar rechts); kl = lijf, o.rug = rugkleur, o.streep = donkere banden
function L6_vis(ctx, x, y, s, a, kl, o = {}) { if (a <= 0.01) return; const kijk = o.kijk || 1, T = o.T || 0, d = mix(kl, '#000000', 0.35);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 1.5 + x * 0.01) * 4); ctx.scale(s * kijk, s);
  const st = Math.sin(T * 5 + x) * 6;
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-86, -24 + st); ctx.lineTo(-86, 24 + st); ctx.closePath(); ctx.fillStyle = o.vin || d; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, -20); ctx.quadraticCurveTo(0, -46, 34, -24); ctx.lineTo(-30, -18); ctx.closePath(); ctx.fillStyle = o.vin || d; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, 58, 26, 0, 0, 6.283); ctx.fillStyle = kl; ctx.fill();
  if (o.rug) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 58, 26, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = o.rug; ctx.fillRect(-60, -30, 120, 22); ctx.restore(); }
  if (o.streep) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 58, 26, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = 'rgba(20,20,30,0.35)'; [-30, -12, 6, 24].forEach(sx => ctx.fillRect(sx, -30, 7, 60)); ctx.restore(); }
  circ(ctx, 38, -6, 6, '#F2EEE0'); circ(ctx, 39, -6, 3.2, '#111'); ctx.restore(); }
const L6_BLAUW = () => ({ kl: '#6E8FB8', rug: '#4A6A98', streep: true, vin: '#3A5480' }), L6_ROOD = () => ({ kl: '#E8B23A', rug: '#D2452C', streep: true, vin: '#B8382A' }), L6_VROUW = () => ({ kl: '#B8A66A', streep: true, vin: '#8A7A4A' });
// chromosoom (X-vorm), h = hoogte; o.lang = verschil in armlengte; o.rot
function L6_chrom(ctx, x, y, h, kl, a = 1, o = {}) { if (a <= 0.01) return; const w = h * 0.2, b = o.band || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0);
  [-1, 1].forEach(k => { ctx.save(); ctx.rotate(k * 0.12); roundRect(ctx, -w / 2 + k * w * 0.55, -h / 2, w, h, w / 2); shape(ctx, rgba(kl, 0.85), dk(kl, 0.25), 2);
    ctx.fillStyle = rgba('#000000', 0.25); [0.18 + b, 0.3, 0.68 - b, 0.82].forEach(f => ctx.fillRect(-w / 2 + k * w * 0.55 + 2, -h / 2 + h * f, w - 4, h * 0.05)); ctx.restore(); });
  circ(ctx, 0, -h * 0.06, w * 0.45, dk(kl, 0.35)); ctx.restore(); }
// rij chromosoomstreepjes: n in kleur k1, m in kleur k2
function L6_rij(ctx, x, y, n, m, k1, k2, a = 1, dx = 8.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n + m; i++) { const h = 46 - (i % 32) * 0.9; roundRect(ctx, x + i * dx, y - h, 5, h, 2.5); ctx.fillStyle = i < n ? k1 : k2; ctx.fill(); } ctx.restore(); }
// rivier van boven naar beneden (golvend), breedte w
function L6_rivier(ctx, x, y1, y2, w, a = 1, T = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  for (let yy = y1; yy <= y2; yy += 10) { const xx = x + Math.sin(yy * 0.012) * 30 - w / 2; yy === y1 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); }
  for (let yy = y2; yy >= y1; yy -= 10) ctx.lineTo(x + Math.sin(yy * 0.012) * 30 + w / 2, yy); ctx.closePath(); ctx.fillStyle = rgba(C.water, 0.45); ctx.fill();
  ctx.strokeStyle = rgba(C.bg, 0.6); ctx.lineWidth = 3; for (let k = 0; k < 6; k++) { const yy = y1 + ((k * 70 + T * 40) % (y2 - y1 - 30)) + 10, xx = x + Math.sin(yy * 0.012) * 30; ctx.beginPath(); ctx.moveTo(xx - 12, yy); ctx.lineTo(xx + 12, yy + 10); ctx.stroke(); }
  ctx.restore(); }
// klein icoontje 'kracht': knikker + woord
function L6_kracht(ctx, x, y, kl, woord, a) { if (a <= 0.01) return; knikker(ctx, x, y, 18, kl, a); regel(ctx, woord, x + 32, y + 11, a, kl, 30, 'left', 700); }
// hartje
function L6_hart(ctx, x, y, r, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, r * 0.9);
  ctx.bezierCurveTo(-r * 1.4, -r * 0.1, -r * 0.7, -r * 1.2, 0, -r * 0.45); ctx.bezierCurveTo(r * 0.7, -r * 1.2, r * 1.4, -r * 0.1, 0, r * 0.9); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }

// ---------- 1 · start ----------
SCHERMEN.push({ titel: 'Start', deel: 'Opening', geenKop: true,
  stappen: [{ t: '<b>Evolutie</b> · les 6: hoe een soort er twee wordt. Wat is een soort, een barrière, en reproductieve isolatie', n: 'Kies eerst havo of vwo: in vwo komen er twee schermen bij (allopatrische en sympatrische soortvorming, cichliden in het Victoriameer; scherm 10–11). Groot scherm (F) vult het hele scherm; T zet de tekst eronder uit. Hoort bij film 6 van de nieuwe reeks, Hoe één soort er twee wordt. Bewust kort (± 25 minuten), te combineren met les 5 of les 7 in één lesuur.' }],
  teken(ctx, S) {
    const T = S.T;
    metaText(ctx, 'Evolutie · les 6', 140, 330, C.meta, 'left', 30);
    text(ctx, 'Hoe een soort', 140, 465, fTitel(98), C.text); text(ctx, 'er twee wordt', 140, 585, fTitel(98), C.goud);
    regel(ctx, 'soort · barrière · reproductieve isolatie', 144, 675, 1, C.text2, 32, 'left', 400);
    L6_dier(ctx, 1240, 560, 0.75, 1, T, L6_PAARD()); L6_dier(ctx, 1620, 560, 0.75, 1, T + 1, Object.assign({ kijk: -1 }, L6_EZEL()));
    regel(ctx, '×', 1430, 430, 1, C.text2, 60, 'center', 700);
    L6_dier(ctx, 1430, 960, 0.85, 1, T + 2, L6_MUIL()); pijl(ctx, 1430, 590, 1430, 660, C.line, 4, 1);
  } });

// ---------- 2 · de muilezel ----------
SCHERMEN.push({ titel: 'De muilezel', kop: 'Is een muilezel een soort?', deel: 'Opening',
  stappen: [
    { t: 'Veehouder Gerrit heeft een muilezel. Sterk, rustig en slim.', n: 'De opening van de film. Laat leerlingen eerst zeggen wat ze zien: een paard? een ezel?' },
    { t: 'Zijn vader is een paard, zijn moeder een ezel. Maar een muilezel krijgt nooit jongen.', n: 'Startvraag van de film (kun je zelf stellen): Is een muilezel dan een soort? Laat leerlingen gokken; het antwoord komt in scherm 4. In het Nederlands: muilezel = vader paard, moeder ezel; muildier = vader ezel, moeder paard (zie briefing). Het verschil doet er voor de les niet toe.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.0);
    pers(ctx, 'gerrit', 330, 980, 640, { t: T, uit: a1 > 0.5 ? 'denkt' : 'blij', kijk: 1, outfit: 'stal', a: a0 });
    L6_dier(ctx, 1000, 980, 1.25, a0, T, L6_MUIL()); naam(ctx, 'muilezel', 1000, 1040, a0, 'center');
    if (a1 > 0.01) { L6_dier(ctx, 1000, 440, 0.6, a1, T, L6_PAARD()); naam(ctx, 'paard (vader)', 1000, 488, a1, 'center', C.text, 30);
      L6_dier(ctx, 1600, 440, 0.6, a1, T + 1, Object.assign({ kijk: -1 }, L6_EZEL())); naam(ctx, 'ezel (moeder)', 1600, 488, a1, 'center', C.text, 30);
      regel(ctx, '×', 1300, 360, a1, C.text2, 64, 'center', 700);
      L6_geenJong(ctx, 1620, 980, 1.1, a1 * S.on(1, 0.6, 0.6)); regel(ctx, 'geen jongen', 1680, 1040, a1 * S.on(1, 0.6, 0.6), C.koraal, 32, 'center', 700); }
  } });

// ---------- 3 · wat is een soort? ----------
SCHERMEN.push({ titel: 'Wat is een soort?', kop: 'Niet aan het uiterlijk', deel: 'Wat is een soort?',
  stappen: [
    { t: 'Een chihuahua en een wolf lijken nauwelijks op elkaar.', n: 'Een soort herken je niet aan het uiterlijk.' },
    { t: 'Toch krijgen ze samen jongen, en die jongen ook weer. Een <b>soort</b>: individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen.', n: 'De soortdefinitie uit de film (biologisch soortbegrip). Hond en wolf zijn dus één soort (de hond geldt vaak als ondersoort van de wolf, zie briefing). \'In de natuur\' staat erin omdat in gevangenschap soms kruisingen lukken die in het wild niet voorkomen.' },
    { t: 'Een hondenras is een groep binnen die soort, net als een <b>ondersoort</b> in de natuur.', n: 'Een ras is door de mens gefokt; een ondersoort is een groep die in de natuur apart leeft en wat afwijkt, maar nog wel met de rest kan paren.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.0), a2 = S.on(2, 0.9);
    L6_dier(ctx, 560, 640, 0.6, a0, T, L6_CHI()); naam(ctx, 'chihuahua', 560, 692, a0, 'center');
    L6_dier(ctx, 1360, 640, 1.2, a0, T + 1, Object.assign({ kijk: -1 }, L6_WOLF())); naam(ctx, 'wolf', 1360, 692, a0, 'center');
    if (a1 > 0.01) { L6_hart(ctx, 900, 400, 26, C.koraal, a1); [0, 1, 2].forEach(i => L6_dier(ctx, 860 + i * 70, 640, 0.32, a1 * S.on(1, 0.4, 0.3 + i * 0.15), T + i, Object.assign({}, L6_WOLF(), { kl: ['#A08A6A', '#7E7468', '#B89A72'][i] })));
      vink(ctx, 1080, 560, 20, a1 * S.on(1, 0.5, 0.8));
      termKaart(ctx, 'soort', 'samen vruchtbare nakomelingen, in de natuur', 960, 740, a1 * S.on(1, 0.6, 0.6), C.goud); }
    if (a2 > 0.01) { termKaart(ctx, 'ras', 'groep binnen een soort, door de mens gefokt', 560, 900, a2, C.teal, 720); termKaart(ctx, 'ondersoort', 'groep binnen een soort, in de natuur', 1360, 900, a2 * S.on(2, 0.6, 0.3), C.teal, 720); }
  } });

// ---------- 4 · paard en ezel ----------
SCHERMEN.push({ titel: 'Paard en ezel', kop: 'Een kruising tussen twee soorten', deel: 'Wat is een soort?',
  stappen: [
    { t: 'Paard en ezel krijgen wel een jong, maar dat is onvruchtbaar. Er stromen geen genen van paarden naar ezels: twee soorten. De muilezel is een <b>hybride</b>.', n: 'Vraag uit de film: Een paard en een ezel krijgen samen een muilezel. Die is gezond, maar onvruchtbaar. Zijn paard en ezel één soort? (a) Ja, want ze krijgen samen een jong, (b) Nee, want hun jong kan zelf geen jongen krijgen, (c) Ja, want ze lijken veel op elkaar. Antwoord b.' },
    { t: 'Een paard heeft 64 chromosomen, een ezel 62. De muilezel krijgt van elk de helft: 63.', n: 'Paard 2n = 64, ezel 2n = 62; de geslachtscellen hebben 32 en 31 chromosomen.' },
    { t: 'Bij de meiose moeten chromosomen in paren liggen. Die van paard en ezel passen niet goed op elkaar: bijna geen werkende geslachtscellen.', n: 'Meiose: zie erfelijkheid. Heel zelden is een muilezelmerrie toch vruchtbaar (een paar gevallen bekend, zie briefing).' },
    { t: 'Is een muilezel een soort? Nee. Elke muilezel is opnieuw gemaakt door een paard en een ezel.', n: 'Het antwoord op de startvraag: een soort is een groep die zich voortplant, en dat doen muilezels niet.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.0), a2 = S.on(2, 1.0), a3 = S.on(3, 0.8);
    L6_dier(ctx, 280, 470, 0.58, a0, T, L6_PAARD()); naam(ctx, 'paard', 280, 516, a0, 'center', C.text, 30);
    L6_dier(ctx, 760, 470, 0.58, a0, T + 1, Object.assign({ kijk: -1 }, L6_EZEL())); naam(ctx, 'ezel', 760, 516, a0, 'center', C.text, 30);
    regel(ctx, '×', 520, 330, a0, C.text2, 56, 'center', 700); pijl(ctx, 520, 380, 520, 560, C.line, 4, a0);
    L6_dier(ctx, 470, 890, 0.72, a0, T + 2, L6_MUIL()); L6_geenJong(ctx, 830, 890, 0.6, a0 * S.on(0, 0.5, 0.5));
    termKaart(ctx, 'hybride', 'kruising tussen twee soorten', 1420, 190, a0 * S.on(0, 0.6, 0.6), C.goud, 760);
    if (a1 > 0.01) { paneel(ctx, 1030, 350, 790, 300, a1);
      [['paard', 64, 0, CH.vader, CH.vader], ['ezel', 62, 0, CH.moeder, CH.moeder], ['muilezel', 32, 31, CH.vader, CH.moeder]].forEach(([nm, n1, n2, k1, k2], i) => { const y = 430 + i * 82, a = a1 * S.on(1, 0.5, i * 0.3);
        regel(ctx, nm, 1060, y, a, C.text, 30, 'left', 600); regel(ctx, String(n1 + n2), 1230, y, a, i === 2 ? C.goud : C.text, 34, 'right', 700);
        L6_rij(ctx, 1250, y + 6, n1, n2 || (i === 1 ? 0 : 0), k1, k2, a); }); }
    if (a2 > 0.01) { const y = 800; metaText(ctx, 'meiose: paren vormen', 1425, 700, C.text2, 'center', 22, a2);
      [[1160, 0, 1], [1420, 0.12, 0], [1680, null, 0]].forEach(([x, band, goed], i) => { const a = a2 * S.on(2, 0.5, i * 0.3);
        L6_chrom(ctx, x - 34, y, 110, CH.vader, a); if (band !== null) L6_chrom(ctx, x + 34, y + (goed ? 0 : 12), goed ? 110 : 86, CH.moeder, a, { band: band });
        if (goed) vink(ctx, x, y + 96, 18, a); else kruis(ctx, x, y + 96, 16, a); }); }
    if (a3 > 0.01) balk(ctx, 'een muilezel is geen soort, maar een hybride', 1425, 985, 790, a3, C.goud, 34);
  } });

// ---------- 5 · genenstroom en barrière ----------
const L6_MUIZEN = Array.from({ length: 16 }, (_, i) => [hash(i * 3.3), hash(i * 7.1), hash(i * 1.9)]);
SCHERMEN.push({ titel: 'Een barrière', kop: 'Eén populatie, dan een rivier', deel: 'Eén pot wordt twee',
  stappen: [
    { t: 'Eén populatie in een groot gebied. Dieren trekken heen en weer en paren overal: allelen gaan van groep naar groep, <b>genenstroom</b>.', n: 'Genenstroom = uitwisseling, zoals in de vorige film (les 5). Blauw in de reeks.' },
    { t: 'Er komt een barrière: een rivier verlegt zijn loop. De dieren aan de ene kant komen de andere kant niet meer tegen: <b>geografische isolatie</b>.', n: 'Andere voorbeelden uit de film: een zee die stijgt, een bergrug of een woestijn die ontstaat.' },
    { t: 'Wat een barrière is, hangt af van het dier. Een rivier houdt een muis tegen, geen vogel. Voor een slak is een weg al genoeg.', n: 'Laat leerlingen zelf voorbeelden bedenken (een snelweg voor egels, een akker voor een salamander).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.2), a2 = S.on(2, 0.9);
    paneel(ctx, 160, 190, 1600, 520, a0, rgba(C.groen, 0.5));
    L6_rivier(ctx, 960, 196, 704, 120, a1, T);
    L6_MUIZEN.forEach(([u, v, w], i) => { const links = u < 0.5, bx = 220 + u * 1480, by = 290 + v * 380;
      const vrij = bx + Math.sin(T * (0.25 + w * 0.2) + i) * 520, opKant = links ? clamp(bx + Math.sin(T * 0.3 + i) * 120, 220, 840) : clamp(bx + Math.sin(T * 0.3 + i) * 120, 1080, 1700);
      const x = lerp(clamp(vrij, 220, 1700), opKant, a1), kijk = Math.cos(T * (0.25 + w * 0.2) + i) > 0 ? 1 : -1;
      L6_muis(ctx, x, by, 1.1, a0, a1 > 0.5 ? (Math.cos(T * 0.3 + i) > 0 ? 1 : -1) : kijk); });
    if (a0 > 0.01 && a1 < 0.99) { pijl(ctx, 760, 250, 1160, 250, C.teal, 5, a0 * (1 - a1)); pijl(ctx, 1160, 250, 760, 250, C.teal, 5, a0 * (1 - a1)); naam(ctx, 'genenstroom', 960, 236, a0 * (1 - a1), 'center', C.teal); }
    if (a1 > 0.01) { kruis(ctx, 960, 250, 22, a1 * S.on(1, 0.5, 0.6)); naam(ctx, 'rivier', 960, 690, a1, 'center', C.text, 28); }
    if (a2 > 0.01) { const P = [[400, 'muis', 0], [960, 'vogel', 1], [1520, 'slak', 0]];
      P.forEach(([x, nm, kan], i) => { const a = a2 * S.on(2, 0.5, i * 0.3); paneel(ctx, x - 250, 750, 500, 270, a);
        if (i < 2) L6_rivier(ctx, x, 756, 1014, 60, a, T); else { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(C.line, 0.45); ctx.fillRect(x - 40, 756, 80, 258); ctx.strokeStyle = C.bg; ctx.lineWidth = 4; ctx.setLineDash([20, 18]); ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x, 1010); ctx.stroke(); ctx.restore(); }
        if (i === 0) L6_muis(ctx, x - 130, 900, 1.3, a); if (i === 1) L6_vogel(ctx, x + Math.sin(T * 0.8) * 150, 840, 1.1, a, T); if (i === 2) L6_slak(ctx, x - 140, 910, 1.1, a);
        if (kan) vink(ctx, x + 170, 970, 18, a); else kruis(ctx, x + 170, 970, 16, a); naam(ctx, nm, x - 140, 1000, a, 'center', C.text, 28); }); }
  } });

// ---------- 6 · twee genenpools ----------
SCHERMEN.push({ titel: 'Twee genenpools', kop: 'Eén pot wordt twee', deel: 'Eén pot wordt twee',
  stappen: [
    { t: 'De genenstroom stopt: één pot is twee potten. In elke pot andere mutaties, eigen selectiedruk en eigen toeval.', n: 'Vraag uit de film: De rivier blijft duizenden generaties liggen. Wat gebeurt er met de twee genenpools? (a) Ze blijven gelijk, want ze komen uit dezelfde pot, (b) Ze passen zich samen aan, want het is één soort, (c) Ze gaan steeds meer van elkaar verschillen. Antwoord c.' },
    { t: 'Generatie na generatie lopen de allelfrequenties verder uit elkaar: <b>divergente evolutie</b>.', n: 'Eerst merk je het nauwelijks, na veel generaties zijn de verschillen groot. Misschien is het links kouder, of zijn er andere roofdieren.' },
    { t: 'Hond en wolf gaan al minstens 15.000 jaar elk hun eigen weg. Waar ze elkaar tegenkomen, krijgen ze soms jongen: nog genenstroom, nog één soort.', n: 'Die genenstroom houdt de twee genenpools bij elkaar.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 2.2), a2 = S.on(2, 0.9);
    const pL = lerp(0.5, 0.82, a1), pR = lerp(0.5, 0.18, a1);
    L6_rivier(ctx, 960, 190, 620, 110, a0, T);
    pot(ctx, 600, 520, 0.95, { p: pL, n: 48, seed: 3, a: a0 }); pot(ctx, 1320, 520, 0.95, { p: pR, n: 48, seed: 7, a: a0 });
    [[EV().kracht.mutatie, 'mutatie'], [EV().kracht.selectie, 'selectie'], [EV().kracht.drift, 'toeval']].forEach(([kl, w], i) => { const a = a0 * S.on(0, 0.5, 0.4 + i * 0.2);
      L6_kracht(ctx, 190, 300 + i * 90, kl, w, a); L6_kracht(ctx, 1560, 300 + i * 90, kl, w, a); });
    if (a1 > 0.01) { allelBalk(ctx, 450, 560, 300, pL, a1); allelBalk(ctx, 1170, 560, 300, pR, a1);
      regel(ctx, 'generatie ' + Math.round(lerp(1, 2000, a1)), 960, 690, a1, C.text2, 30, 'center', 600);
      termKaart(ctx, 'divergente evolutie', 'twee genenpools lopen uit elkaar', 960, 720, a1 * S.on(1, 0.5, 1.6), C.goud); }
    if (a2 > 0.01) { const y = 1020; paneel(ctx, 460, 870, 1000, 180, a2);
      L6_dier(ctx, 640, y, 0.5, a2, T, L6_WOLF()); L6_dier(ctx, 1280, y, 0.55, a2, T + 1, Object.assign({ kijk: -1 }, L6_WOLF(), { kl: '#C89A5E', neus: '#E8CCA0', staart: 'krul' }));
      pijl(ctx, 870, 940, 1050, 940, C.teal, 5, a2); pijl(ctx, 1050, 940, 870, 940, C.teal, 5, a2); naam(ctx, 'nog genenstroom', 960, 1000, a2, 'center', C.teal, 30); }
  } });

// ---------- 7 · reproductieve isolatie ----------
SCHERMEN.push({ titel: 'Reproductieve isolatie', kop: 'Zijn het nu twee soorten?', deel: 'Een tweede soort',
  stappen: [
    { t: 'De rivier verdwijnt en de groepen komen elkaar weer tegen. Krijgen ze nog samen vruchtbare jongen? Zo niet: <b>reproductieve isolatie</b>.', n: 'Dat is de toets van de soortdefinitie uit scherm 3.' },
    { t: 'Soms komt het niet eens tot een bevruchting: ander moment, andere plek, ander lied, of de geslachtsorganen passen niet.', n: 'Isolatie vóór de bevruchting: in de tijd, in de plek (ander leefgebied in hetzelfde gebied), in gedrag (balts, lied) en mechanisch.' },
    { t: 'Soms gaat het mis ná de bevruchting: het jong sterft jong of is onvruchtbaar, zoals de muilezel.', n: 'Ook dan stroomt er geen gen meer van de ene naar de andere groep.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.0), a2 = S.on(2, 0.9);
    L6_rivier(ctx, 960, 190, 500, 110, 1 - a0 * 0.85, T);
    for (let i = 0; i < 5; i++) { L6_muis(ctx, 300 + i * 90 + a0 * 140, 300 + (i % 2) * 90, 1.1, 1, 1, '#9A8670'); L6_muis(ctx, 1260 + i * 90 - a0 * 140, 300 + (i % 2) * 90, 1.1, 1, -1, '#6E6052'); }
    if (a0 > 0.01) { regel(ctx, '?', 960, 330, a0, C.goud, 80, 'center', 700); termKaart(ctx, 'reproductieve isolatie', 'samen geen vruchtbare jongen meer', 960, 400, a0 * S.on(0, 0.6, 0.6), C.goud); }
    if (a1 > 0.01) { paneel(ctx, 120, 580, 1060, 440, a1); metaText(ctx, 'vóór de bevruchting', 650, 630, C.meta, 'center', 22, a1);
      const ic = [['ander moment', (x, y, a) => { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 70, 120, 120, 12); shape(ctx, rgba(C.bg, 0.9), C.line, 3); ctx.fillStyle = C.koraal; ctx.fillRect(x - 60, y - 70, 120, 30); ctx.restore(); text(ctx, 'apr', x, y + 26, fTekst(40, 700), C.text, 'center'); }],
        ['andere plek', (x, y, a) => { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(C.groen, 0.5); ctx.beginPath(); ctx.moveTo(x - 80, y + 50); ctx.lineTo(x - 30, y - 60); ctx.lineTo(x + 10, y + 50); ctx.fill(); ctx.fillStyle = rgba(C.water, 0.5); ctx.fillRect(x + 10, y + 10, 76, 40); ctx.restore(); }],
        ['ander lied', (x, y, a) => { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.fillStyle = C.text; ctx.lineWidth = 5; [[-30, 0], [20, -16]].forEach(([dx, dy]) => { circ(ctx, x + dx, y + 30 + dy, 14, C.text); ctx.beginPath(); ctx.moveTo(x + dx + 12, y + 30 + dy); ctx.lineTo(x + dx + 12, y - 50 + dy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x - 18, y - 50); ctx.lineTo(x + 32, y - 66); ctx.stroke(); ctx.restore(); }],
        ['past niet', (x, y, a) => { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 40, 70, 80, 8); shape(ctx, rgba(C.teal, 0.5), C.teal, 3); circ(ctx, x - 10, y, 18, rgba(C.teal, 0.5), C.teal, 3); roundRect(ctx, x + 20, y - 40, 70, 80, 8); shape(ctx, rgba(C.oker, 0.5), C.oker, 3); ctx.beginPath(); ctx.rect(x + 20, y - 12, 26, 24); ctx.fillStyle = C.bg; ctx.fill(); ctx.restore(); }]];
      ic.forEach(([nm, f], i) => { const x = 250 + i * 265, a = a1 * S.on(1, 0.5, i * 0.25); f(x, 800, a); naam(ctx, nm, x, 930, a, 'center', C.text, 30); }); }
    if (a2 > 0.01) { paneel(ctx, 1220, 580, 580, 440, a2); metaText(ctx, 'ná de bevruchting', 1510, 630, C.meta, 'center', 22, a2);
      L6_dier(ctx, 1420, 920, 0.5, a2, T, L6_MUIL()); L6_geenJong(ctx, 1660, 920, 0.5, a2 * S.on(2, 0.5, 0.4)); naam(ctx, 'jong onvruchtbaar', 1510, 990, a2, 'center', C.text, 30); }
  } });

// ---------- 8 · kikkers in april en juni ----------
const L6_MAAND = ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'];
SCHERMEN.push({ titel: 'Kikkers', kop: 'Dezelfde vijver, een andere maand', deel: 'Een tweede soort',
  stappen: [
    { t: 'Twee kikkersoorten in dezelfde vijver. De ene paart in april, de andere in juni.', n: 'Vraag uit de film: Twee kikkersoorten leven in dezelfde vijver. De ene paart in april, de andere in juni. Wat voor isolatie is dit? (a) Isolatie vóór de bevruchting, (b) Geografische isolatie, (c) Isolatie ná de bevruchting. Antwoord a.' },
    { t: 'De scheiding zit niet in de plek, maar in de tijd. Er komt niet eens een bevruchting: isolatie <b>vóór de bevruchting</b>.', n: 'De vrouwtjes van de ene soort zijn al klaar als de mannetjes van de andere gaan roepen. Geen geografische isolatie: ze leven in dezelfde vijver.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 0.9), a1 = S.on(1, 1.0);
    const g = C.licht ? '#5E9A4C' : '#6FB05A', b = C.licht ? '#8A6A44' : '#A8865A';
    ctx.save(); ctx.globalAlpha *= a0; ctx.beginPath(); ctx.ellipse(960, 440, 560, 170, 0, 0, 6.283); ctx.fillStyle = rgba(C.water, 0.35); ctx.fill(); ctx.strokeStyle = rgba(C.water, 0.7); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    [[640, 470, 0], [1240, 470, 1]].forEach(([x, y, k]) => { ctx.save(); ctx.globalAlpha *= a0; ctx.beginPath(); ctx.ellipse(x, y, 110, 30, 0, 0, 6.283); ctx.fillStyle = C.licht ? '#7FAE6A' : '#4F7A44'; ctx.fill(); ctx.restore(); L6_kikker(ctx, x, y - 6, 1.3, a0, k ? b : g, k ? -1 : 1, T + k); });
    const x0 = 360, w = 1200, y = 780, mw = w / 12;
    ctx.save(); ctx.globalAlpha *= a0; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke(); ctx.restore();
    L6_MAAND.forEach((m, i) => regel(ctx, m, x0 + i * mw + mw / 2, y + 40, a0, i === 3 || i === 5 ? C.text : C.text2, 28, 'center', i === 3 || i === 5 ? 700 : 400));
    [[3.5, g, 0], [5.5, b, 1]].forEach(([mc, kl, i]) => { const a = a0 * S.on(0, 0.6, 0.4 + i * 0.3); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x0 + (mc - 0.9) * mw, y);
      for (let k = 0; k <= 30; k++) { const u = mc - 0.9 + k / 30 * 1.8; ctx.lineTo(x0 + u * mw, y - 150 * Math.exp(-0.5 * ((u - mc) / 0.35) ** 2)); } ctx.closePath(); ctx.fillStyle = rgba(kl, 0.55); ctx.fill(); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); });
    naam(ctx, 'paartijd', x0 - 20, y - 20, a0, 'right', C.text2, 28);
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 + 4.5 * mw, y - 190); ctx.lineTo(x0 + 4.5 * mw, y + 10); ctx.stroke(); ctx.restore(); kruis(ctx, x0 + 4.5 * mw, y - 210, 16, a1);
      termKaart(ctx, 'isolatie vóór de bevruchting', 'hier: in de tijd', 960, 880, a1 * S.on(1, 0.6, 0.4), C.goud); }
  } });

// ---------- 9 · van barrière tot soort ----------
SCHERMEN.push({ titel: 'Van barrière tot soort', kop: 'Zo verloopt het meestal', deel: 'Een tweede soort',
  stappen: [
    { t: 'Eerst een barrière, dan verschillen die zich opstapelen, en ten slotte reproductieve isolatie. Eén soort is er twee geworden.', n: 'De drie stappen van soortvorming uit de film. Laat leerlingen de stappen terugvertellen met de muilezel of de kikkers erbij.' },
    { t: 'Daar zijn meestal tienduizenden generaties of meer voor nodig.', n: 'Bij muizen (een paar generaties per jaar) is dat sneller dan bij olifanten. Hoe lang het echt duurt, verschilt sterk per groep (zie briefing).' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.6), a1 = S.on(1, 1.0);
    const st = [['barrière', 0.5, 0.5, C.teal], ['verschillen stapelen', 0.72, 0.28, C.groen], ['reproductieve isolatie', 0.9, 0.1, C.goud]];
    st.forEach(([nm, p1, p2, kl], i) => { const a = clamp(a0 * 3 - i, 0, 1), x = 360 + i * 600; if (a <= 0.01) return;
      paneel(ctx, x - 260, 200, 520, 560, a, rgba(kl, 0.6)); regel(ctx, (i + 1) + '. ' + nm, x, 270, a, kl, 36, 'center', 700);
      pot(ctx, x - 120, 640, 0.6, { p: p1, n: 30, seed: 2 + i, a }); pot(ctx, x + 120, 640, 0.6, { p: p2, n: 30, seed: 9 + i, a });
      if (i === 0) L6_rivier(ctx, x, 360, 650, 40, a, T); if (i === 1) { L6_rivier(ctx, x, 360, 650, 40, a, T); }
      if (i === 2) { kruis(ctx, x, 520, 20, a); L6_hart(ctx, x, 440, 20, C.koraal, a * 0.6); }
      if (i < 2) pijl(ctx, x + 268, 480, x + 332, 480, C.line, 5, clamp(a0 * 3 - i - 1, 0, 1)); });
    if (a1 > 0.01) { pijl(ctx, 140, 830, 1780, 830, C.text2, 5, a1, 22); regel(ctx, 'tienduizenden generaties of meer', 960, 810, a1, C.text, 34, 'center', 700);
      balk(ctx, 'de genenstroom stopt, de genenpools lopen uit elkaar', 960, 960, 1400, a1 * S.on(1, 0.6, 0.5), C.goud, 38); }
  } });

// ---------- 10 · zonder barrière (vwo) ----------
SCHERMEN.push({ titel: 'Zonder barrière', kop: 'Allopatrisch of sympatrisch', deel: 'Zonder barrière (vwo)',
  stappen: [
    { vwo: true, t: 'Wat je net zag, heet <b>allopatrische soortvorming</b>: op gescheiden plaatsen. Soms ontstaan soorten op dezelfde plek, zonder barrière: <b>sympatrische soortvorming</b>.', n: 'allo = anders, sym = samen, patria = vaderland. Alleen vwo (Nectar); havo slaat dit scherm over.' },
    { vwo: true, t: 'Het Victoriameer liep rond 15.000 jaar geleden weer vol. Sindsdien zijn er ongeveer 500 soorten cichliden ontstaan, een deel zonder barrière in het water.', n: 'Getallen zoals in de film; ze kloppen met Meier et al. 2017 (Eawag/Bern, zie briefing). Cichliden = baarsachtige vissen.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.0);
    paneel(ctx, 120, 190, 820, 560, a0, rgba(C.teal, 0.6)); paneel(ctx, 980, 190, 820, 560, a0 * S.on(0, 0.6, 0.5), rgba(C.paars, 0.6));
    L6_rivier(ctx, 530, 200, 600, 90, a0, T); pot(ctx, 330, 580, 0.7, { p: 0.82, n: 30, seed: 4, a: a0 }); pot(ctx, 730, 580, 0.7, { p: 0.18, n: 30, seed: 5, a: a0 });
    termKaart(ctx, 'allopatrisch', 'gescheiden plaatsen', 530, 610, a0, C.teal, 600);
    const a = a0 * S.on(0, 0.6, 0.5);
    if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(1390, 400, 340, 170, 0, 0, 6.283); ctx.fillStyle = rgba(C.water, 0.3); ctx.fill(); ctx.strokeStyle = rgba(C.water, 0.7); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      [[1200, 340, 1], [1300, 440, 1], [1180, 470, 1], [1500, 330, -1], [1580, 430, -1], [1460, 470, -1]].forEach(([x, y, k], i) => L6_vis(ctx, x + Math.sin(T * 0.4 + i) * 30, y, 0.7, a, (i < 3 ? L6_BLAUW() : L6_ROOD()).kl, Object.assign({}, i < 3 ? L6_BLAUW() : L6_ROOD(), { kijk: k, T: T + i })));
      termKaart(ctx, 'sympatrisch', 'dezelfde plek, geen barrière', 1390, 610, a, C.paars, 600); }
    if (a1 > 0.01) { for (let i = 0; i < 14; i++) { const x = 360 + (i % 7) * 200 + (i >= 7 ? 100 : 0), y = i < 7 ? 820 : 885;
        const kl = ['#6E8FB8', '#E8B23A', '#C0583A', '#7FA86A', '#B8A66A', '#8C7BBF', '#D2452C'][i % 7]; L6_vis(ctx, x, y, 0.42, a1 * S.on(1, 0.3, i * 0.06), kl, { T: T + i, kijk: i < 7 ? -1 : 1 }); }
      regel(ctx, '± 500 soorten in ± 15.000 jaar', 960, 985, a1, C.goud, 44, 'center', 700); naam(ctx, 'Victoriameer', 960, 1035, a1, 'center', C.text2, 28); }
  } });

// ---------- 11 · blauw en rood (vwo) ----------
SCHERMEN.push({ titel: 'Blauw en rood', kop: 'Kiezen op kleur', deel: 'Zonder barrière (vwo)',
  stappen: [
    { vwo: true, t: 'Twee soorten in hetzelfde deel van het meer. Bij de ene zijn de mannetjes blauw, bij de andere rood. Ondiep is blauw licht goed te zien, dieper vooral rood licht.', n: 'Pundamilia pundamilia (blauw) en Pundamilia nyererei (rood). Vraag uit de film: Er is geen muur in het water. Hoe kunnen de blauwe en de rode vissen toch apart blijven? (a) Er moet een barrière zijn die we niet zien, (b) Vrouwtjes kiezen een mannetje met de kleur die zij het best zien, (c) Het zijn geen echte soorten, maar kleurvarianten. Antwoord b.' },
    { vwo: true, t: 'De ogen van de vrouwtjes zijn afgestemd op hun licht. Ze kiezen vooral een mannetje van hun eigen kleur: <b>partnerkeuze</b> stopt de genenstroom.', n: 'Zonder rivier of berg. Het verschil zit in een gen voor een lichtgevoelig pigment in het oog (LWS-opsine, zie briefing).' },
    { vwo: true, t: 'In troebel water zijn de kleuren niet te zien. Daar ontstaat geen scheiding.', n: 'Afsluitende zin van de film: allopatrisch of sympatrisch, in beide gevallen stopt de genenstroom en lopen twee genenpools uit elkaar. Het verschil is alleen wat de genenstroom stopt.' }
  ],
  teken(ctx, S) {
    const T = S.T, a0 = S.on(0, 1.0), a1 = S.on(1, 1.0), a2 = S.on(2, 1.0);
    const x0 = 160, x1 = 1260, y0 = 200, y1 = 1000;
    ctx.save(); ctx.globalAlpha *= a0; const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, rgba(C.teal, 0.45)); g.addColorStop(0.5, rgba(C.teal, 0.12)); g.addColorStop(1, rgba(C.koraal, 0.4));
    roundRect(ctx, x0, y0, x1 - x0, y1 - y0, 18); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    naam(ctx, 'ondiep · blauw licht', x0 + 24, y0 + 50, a0, 'left', C.teal, 30); naam(ctx, 'diep · rood licht', x0 + 24, y1 - 24, a0, 'left', C.koraal, 30);
    [[420, 330], [760, 390], [1060, 320]].forEach(([x, y], i) => L6_vis(ctx, x, y, 0.95, a0, L6_BLAUW().kl, Object.assign({}, L6_BLAUW(), { T: T + i, kijk: i % 2 ? -1 : 1 })));
    [[440, 820], [800, 760], [1080, 860]].forEach(([x, y], i) => L6_vis(ctx, x, y, 0.95, a0, L6_ROOD().kl, Object.assign({}, L6_ROOD(), { T: T + i + 3, kijk: i % 2 ? 1 : -1 })));
    if (a1 > 0.01) { [[560, 470, 1], [940, 660, 0]].forEach(([x, y, ondiep], i) => { const a = a1 * S.on(1, 0.5, i * 0.4);
        L6_vis(ctx, x, y, 0.8, a, L6_VROUW().kl, Object.assign({}, L6_VROUW(), { T: T + 7 + i, kijk: ondiep ? -1 : 1 }));
        L6_hart(ctx, ondiep ? 470 : 1020, ondiep ? 400 : 590, 18, C.koraal, a); });
      naam(ctx, 'vrouwtje', 560, 530, a1, 'center', C.text, 26); naam(ctx, 'vrouwtje', 940, 720, a1, 'center', C.text, 26);
      termKaart(ctx, 'partnerkeuze', 'stopt de genenstroom', 1540, 220, a1 * S.on(1, 0.6, 0.6), C.goud, 480); }
    if (a2 > 0.01) { const px = 1310, py = 420; ctx.save(); ctx.globalAlpha *= a2; roundRect(ctx, px, py, 480, 420, 18); ctx.fillStyle = C.licht ? 'rgba(150,130,90,0.45)' : 'rgba(120,100,70,0.5)'; ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      regel(ctx, 'troebel water', px + 240, py + 56, a2, C.text, 32, 'center', 700);
      [[1420, 560], [1660, 620], [1450, 720], [1640, 760]].forEach(([x, y], i) => L6_vis(ctx, x, y, 0.65, a2 * 0.8, '#B88A5A', { rug: i % 2 ? '#A0583A' : '#6A7A98', streep: true, vin: '#7A5A44', T: T + i, kijk: i % 2 ? -1 : 1 }));
      regel(ctx, 'geen scheiding', px + 240, py + 470, a2, C.koraal, 32, 'center', 700); }
  } });

// ---------- 12 · samenvatting ----------
SCHERMEN.push({ titel: 'Samenvatting', kop: 'Hoe een soort er twee wordt', deel: 'Afsluiting',
  stappen: [
    { t: 'Een <b>soort</b>: samen vruchtbare nakomelingen in de natuur. De muilezel is een onvruchtbare <b>hybride</b>, geen soort.', n: 'Terug naar de startvraag van de veehouder.' },
    { t: 'Een barrière stopt de <b>genenstroom</b>: de genenpools lopen uit elkaar (divergente evolutie).', n: 'Mutatie, selectie en toeval werken in elke pot anders.', th: 'Een barrière stopt de <b>genenstroom</b>: de genenpools lopen uit elkaar (divergente evolutie).' },
    { t: '<b>Reproductieve isolatie</b> maakt er twee soorten van: vóór of ná de bevruchting. Ook partnerkeuze kan de genenstroom stoppen.', th: '<b>Reproductieve isolatie</b> maakt er twee soorten van: vóór of ná de bevruchting.', n: 'vwo: allopatrisch (gescheiden plaatsen) of sympatrisch (dezelfde plek, bv. door partnerkeuze).' }
  ],
  teken(ctx, S) {
    const T = S.T, s = [S.on(0, 0.9), S.on(1, 0.9), S.on(2, 0.9)];
    const kol = [['soort', C.goud, ['samen vruchtbare', 'nakomelingen', 'muilezel: hybride']], ['genenstroom stopt', C.teal, ['barrière', 'geografische isolatie', 'genenpools divergeren']], ['reproductieve isolatie', C.groen, ['vóór de bevruchting', 'ná de bevruchting', 'twee soorten']]];
    kol.forEach(([kop, col, regels], i) => { const a = s[i]; if (a <= 0.01) return; const x = 120 + i * 580;
      paneel(ctx, x, 190, 540, 790, a, rgba(col, 0.6)); regel(ctx, kop, x + 270, 268, a, col, 40, 'center', 700);
      if (i === 0) { L6_dier(ctx, x + 230, 580, 0.68, a, T, L6_MUIL()); L6_geenJong(ctx, x + 440, 580, 0.42, a); }
      if (i === 1) { L6_rivier(ctx, x + 270, 320, 600, 50, a, T); pot(ctx, x + 140, 590, 0.55, { p: 0.8, n: 26, seed: 3, a }); pot(ctx, x + 400, 590, 0.55, { p: 0.2, n: 26, seed: 8, a }); }
      if (i === 2) { L6_kikker(ctx, x + 150, 560, 1.0, a, C.licht ? '#5E9A4C' : '#6FB05A', 1, T); L6_kikker(ctx, x + 400, 560, 1.0, a, C.licht ? '#8A6A44' : '#A8865A', -1, T + 1); kruis(ctx, x + 275, 500, 18, a); }
      regels.forEach((r, k) => regel(ctx, r, x + 40, 690 + k * 66, a * S.on(i, 0.5, 0.2 + k * 0.12), C.text, 31, 'left', 500)); });
  } });

// ---------- 13 · volgende keer ----------
function L6_icoonLagen(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = ['#C9B896', '#A88E6A', '#8A7458', '#B8A07E', '#6E5A44'];
  kl.forEach((k, i) => { ctx.fillStyle = k; ctx.fillRect(x - 130, y - 90 + i * 36, 260, 36); });
  ctx.strokeStyle = '#3A2E22'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i < 40; i++) { const an = i * 0.3, r = 4 + i * 0.5; const px = x + 30 + Math.cos(an) * r, py = y + 40 + Math.sin(an) * r * 0.8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
function L6_icoonWalvis(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T) * 4); const kl = C.licht ? '#4A5A6E' : '#8FA0B5';
  ctx.beginPath(); ctx.moveTo(-130, -10); ctx.quadraticCurveTo(-120, -50, -20, -46); ctx.quadraticCurveTo(80, -40, 110, -10); ctx.lineTo(150, -40); ctx.lineTo(140, 0); ctx.lineTo(150, 36); ctx.lineTo(108, 8); ctx.quadraticCurveTo(40, 40, -60, 30); ctx.quadraticCurveTo(-130, 24, -130, -10); ctx.fillStyle = kl; ctx.fill();
  circ(ctx, -96, -14, 4, '#111'); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, 4); ctx.lineTo(50, 14); ctx.moveTo(34, 18); ctx.lineTo(54, 10); ctx.stroke(); ctx.restore(); }
function L6_icoonSkelet(ctx, x, y, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineCap = 'round';
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x - 110, y - 70); ctx.lineTo(x - 30, y - 10); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 30, y - 16); ctx.lineTo(x + 40, y - 30); ctx.moveTo(x - 28, y - 2); ctx.lineTo(x + 42, y - 6); ctx.stroke();
  ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { const an = -0.7 + i * 0.32; ctx.beginPath(); ctx.moveTo(x + 50, y - 18); ctx.lineTo(x + 50 + Math.cos(an) * 80, y - 18 + Math.sin(an) * 80); ctx.stroke(); } ctx.restore(); }
function L6_icoonDNA(ctx, x, y, a, T) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 18; i++) { const u = i / 17, xx = x - 130 + u * 260, f = u * 9 + T, y1 = y + Math.sin(f) * 50, y2 = y - Math.sin(f) * 50;
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y1); ctx.lineTo(xx, y2); ctx.stroke(); circ(ctx, xx, y1, 7, C.teal); circ(ctx, xx, y2, 7, C.oker); } ctx.restore(); }
SCHERMEN.push({ titel: 'Volgende keer', deel: 'Vooruitblik', geenKop: true,
  stappen: [{ t: 'Volgende keer (les 7): <b>hoe weten we dat?</b> Lagen en fossielen, walvissen, hetzelfde skelet en het spoor in het DNA.', n: 'Huiswerk: de film Hoe één soort er twee wordt (nog eens) kijken. Wie vooruit wil: film 7 Hoe weten we dat? (startvraag: hoe weet je welke laag in de grond het oudst is?).' }],
  teken(ctx, S) { vooruitblik(ctx, S, 'Hoe weten we dat?', [['Lagen en fossielen', 'welke laag is het oudst?', L6_icoonLagen], ['Walvissen', 'heupbotjes zonder poten', L6_icoonWalvis], ['Hetzelfde skelet', 'arm, poot en vin', L6_icoonSkelet], ['Het spoor in het DNA', 'verwantschap aflezen', L6_icoonDNA]]); } });
