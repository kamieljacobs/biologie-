// Wat word jij? · Tandheelkunde 1 · Zuur in je mond — eigen tekeningen (21 okt 2026)

// ---------- kleuren van de mond (vaste natuurkleuren, werken op licht en donker) ----------
const TK = { glazuur: '#EEF2F2', glazuurR: '#B9C6CC', tandbeen: '#E6CF95', tandbeenR: '#B89A5E', kanaal: 'rgba(150,112,52,0.35)', pulpa: '#E79A9C', pulpaR: '#C46A70',
  bloed: '#C8343E', zenuw: '#F2D25A', bot: '#D8C8A2', botR: '#A88E62', botGat: '#9C8258', vlies: '#C98F86', tandvlees: '#D9828E', tandvleesR: '#F0A8B2',
  plak: '#E9E2B6', paars: '#9A4DB8', slijm: '#C9D68A', speeksel: '#24405A', wit: '#FFFFFF' };

// ---------- gladde lijn door punten ----------
function padGlad(ctx, P, nieuw = true) { nieuw ? ctx.moveTo(P[0][0], P[0][1]) : ctx.lineTo(P[0][0], P[0][1]);
  for (let i = 1; i < P.length - 1; i++) { const mx = (P[i][0] + P[i + 1][0]) / 2, my = (P[i][1] + P[i + 1][1]) / 2; ctx.quadraticCurveTo(P[i][0], P[i][1], mx, my); }
  ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]); }
function verdicht(P, n = 6) { const R = []; for (let i = 0; i < P.length - 1; i++) for (let k = 0; k < n; k++) { const u = k / n; R.push([lerp(P[i][0], P[i + 1][0], u), lerp(P[i][1], P[i + 1][1], u)]); } R.push(P[P.length - 1]); return R; }

// ---------- kies in doorsnede ----------
// eenheden: s=1 → kroon ±260 px breed, van knobbel (y-256) tot wortelpunt (y+258); y = hals (glazuur eindigt bij y-40)
const KIES_KROON = [[-118, -40], [-126, -110], [-132, -170], [-118, -220], [-90, -248], [-62, -238], [-35, -214], [-8, -222], [18, -246], [48, -256], [82, -246], [112, -222], [130, -176], [126, -110], [118, -40]];
const KIES_GRENS = [[-118, -40], [-112, -110], [-108, -160], [-90, -198], [-62, -206], [-36, -190], [-8, -196], [20, -212], [48, -220], [80, -212], [104, -190], [110, -160], [110, -110], [118, -40]];
const KIES_WORTEL = [[118, -40], [116, 20], [110, 90], [98, 170], [82, 235], [66, 258], [50, 250], [42, 200], [34, 120], [22, 60], [0, 44], [-22, 60], [-34, 120], [-42, 200], [-50, 250], [-66, 258], [-82, 235], [-98, 170], [-110, 90], [-116, 20], [-118, -40]];
const KIES_PULPA = [[-62, 245], [-66, 150], [-68, 40], [-74, -40], [-66, -110], [-52, -150], [-36, -128], [-12, -118], [14, -124], [36, -150], [54, -156], [68, -112], [74, -40], [68, 40], [66, 150], [62, 245], [54, 245], [50, 150], [46, 60], [30, 22], [0, 14], [-30, 22], [-46, 60], [-50, 150], [-54, 245]];
// punten in beeldcoördinaten (voor namen en zoom): kiesPunt(x, y, s, 'hals')
const KIES_P = { hals: [-122, -62], knobbel: [48, -262], groef: [-8, -226], glazuur: [140, -214], tandbeen: [0, -165], pulpa: [0, -50], wortel: [96, 140], kaakbot: [-210, 170], tandvlees: [-215, -50], wortelvlies: [112, 120] };
function kiesPunt(x, y, s, k) { const p = KIES_P[k]; return [x + p[0] * s, y + p[1] * s]; }

function kies(ctx, x, y, s, o = {}) {
  const { a = 1, bot = 1, vlies = 0, plak = 0, paars = 0, ontkalk = 0, gat = 0, erosie = 0, zacht = 0, namen = 0, zenuw = 1, t = 0 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const kroon = KIES_KROON.map((p, i) => [lerp(p[0], KIES_GRENS[Math.min(i, KIES_GRENS.length - 1)][0], 0), p[1]]);
  // erosie: buitenkant van het glazuur schuift naar de grens toe (dunner en gladder)
  const K = KIES_KROON.map(p => { let best = KIES_GRENS[0], bd = 1e9; for (const g of KIES_GRENS) { const d = Math.hypot(g[0] - p[0], g[1] - p[1]); if (d < bd) { bd = d; best = g; } } return [lerp(p[0], best[0], erosie * 0.6), lerp(p[1], best[1], erosie * 0.6)]; });
  const omtrek = () => { ctx.beginPath(); padGlad(ctx, K); padGlad(ctx, KIES_WORTEL, false); ctx.closePath(); };
  // kaakbot (sponsachtig) met wortelvlies
  if (bot > 0.01) { ctx.save(); ctx.globalAlpha *= bot;
    roundRect(ctx, -300, -6, 600, 330, 40); ctx.fillStyle = TK.bot; ctx.fill();
    ctx.save(); roundRect(ctx, -300, -6, 600, 330, 40); ctx.clip();
    for (let i = 0; i < 90; i++) { const hx = -290 + hash(i * 3 + 1) * 580, hy = 10 + hash(i * 3 + 2) * 300, rr = 7 + hash(i * 3 + 3) * 14; ctx.beginPath(); ctx.ellipse(hx, hy, rr, rr * (0.6 + 0.4 * hash(i * 7)), hash(i * 5) * 3, 0, 6.283); ctx.fillStyle = rgba(TK.botGat, 0.55); ctx.fill(); }
    ctx.restore(); ctx.strokeStyle = TK.botR; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-300, -2); ctx.lineTo(300, -2); ctx.stroke();
    // wortelvlies: smalle spleet met vezeltjes
    ctx.beginPath(); padGlad(ctx, KIES_WORTEL.slice(1, -1)); ctx.strokeStyle = TK.vlies; ctx.lineWidth = 22; ctx.stroke();
    const W2 = verdicht(KIES_WORTEL.slice(1, -1), 5); ctx.strokeStyle = rgba('#7A3E3A', 0.7); ctx.lineWidth = 1.4;
    for (let i = 1; i < W2.length - 1; i += 2) { const [px, py] = W2[i], dx = W2[i + 1][0] - W2[i - 1][0], dy = W2[i + 1][1] - W2[i - 1][1], L = Math.hypot(dx, dy) || 1; if (py < 4) continue; const nx = dy / L, ny = -dx / L; ctx.beginPath(); ctx.moveTo(px - nx * 1, py - ny * 1); ctx.lineTo(px - nx * 11 + dx / L * 4, py - ny * 11 + dy / L * 4); ctx.stroke(); }
    ctx.restore(); }
  // tandbeen met kanaaltjes
  omtrek(); ctx.fillStyle = TK.tandbeen; ctx.fill();
  ctx.save(); omtrek(); ctx.clip(); ctx.strokeStyle = TK.kanaal; ctx.lineWidth = 1.3;
  for (let i = 0; i < 30; i++) { const an = Math.PI + 0.2 + i * (Math.PI - 0.4) / 29, c = Math.cos(an), sn = Math.sin(an); ctx.beginPath(); ctx.moveTo(c * 40, -60 + sn * 40); ctx.bezierCurveTo(c * 110 + sn * 12, -60 + sn * 110 - c * 12, c * 170 - sn * 12, -60 + sn * 170 + c * 12, c * 280, -60 + sn * 280); ctx.stroke(); }
  for (let yy = 0; yy < 250; yy += 13) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 30, yy + 6); ctx.quadraticCurveTo(sd * 80, yy - 2, sd * 140, yy - 8); ctx.stroke(); }
  ctx.restore();
  // pulpa met bloedvaatje en zenuw tot in de wortels
  ctx.beginPath(); padGlad(ctx, KIES_PULPA); ctx.closePath(); shape(ctx, TK.pulpa, TK.pulpaR, 2);
  if (zenuw > 0.01) { ctx.save(); ctx.globalAlpha *= zenuw; ctx.beginPath(); padGlad(ctx, KIES_PULPA); ctx.closePath(); ctx.clip();
    for (const [col, off, lw] of [[TK.bloed, -5, 4.5], [TK.zenuw, 5, 3.5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw;
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 58 + off * 0.6, 262); ctx.bezierCurveTo(sd * 58 + off, 140, sd * 60 + off, 20, sd * 40 + off, -50); ctx.quadraticCurveTo(sd * 20 + off * 0.5, -90, sd * 45, -140); ctx.stroke(); }
      ctx.lineWidth = lw * 0.6; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-30 + k * 20 + off, -60); ctx.quadraticCurveTo(-36 + k * 22, -90, -24 + k * 18 + off, -115); ctx.stroke(); } }
    ctx.restore(); }
  // glazuur: dik op de knobbels, dun bij de hals
  ctx.beginPath(); padGlad(ctx, K); padGlad(ctx, KIES_GRENS.slice().reverse(), false); ctx.closePath();
  const gg = ctx.createLinearGradient(-130, -250, 120, -60); gg.addColorStop(0, TK.wit); gg.addColorStop(0.5, TK.glazuur); gg.addColorStop(1, '#D7E0E4'); ctx.fillStyle = gg; ctx.fill(); ctx.strokeStyle = TK.glazuurR; ctx.lineWidth = 2; ctx.stroke();
  // glans
  ctx.save(); ctx.globalAlpha *= 0.7; ctx.strokeStyle = TK.wit; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-112, -150); ctx.quadraticCurveTo(-112, -205, -84, -232); ctx.stroke(); ctx.restore();
  // zacht geworden buitenkant (zuur)
  if (zacht > 0.01) { ctx.save(); ctx.globalAlpha *= zacht; ctx.beginPath(); padGlad(ctx, K); ctx.strokeStyle = rgba(C.koraal, 0.55); ctx.lineWidth = 14; ctx.stroke(); ctx.restore(); }
  // wit plekje (begin van ontkalken) en gaatje, op de plek waar plak blijft zitten (bij de hals)
  if (ontkalk > 0.01) { ctx.save(); ctx.globalAlpha *= ontkalk; ctx.beginPath(); ctx.ellipse(-124, -118, 10, 24, 0.1, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill(); ctx.strokeStyle = '#DDE4E6'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  if (gat > 0.01) { ctx.save(); const g = clamp(gat, 0, 1); ctx.beginPath(); ctx.moveTo(-136, -150 + 10 * (1 - g)); ctx.quadraticCurveTo(-118 + 50 * g, -145, -100 + 40 * g, -120); ctx.quadraticCurveTo(-112 + 40 * g, -95, -134, -90); ctx.closePath(); shape(ctx, '#4A3626', '#7A5A3E', 3); ctx.restore(); }
  // vliesje van speekseleiwitten en tandplak op het glazuur
  const B = verdicht(K, 8), plek = (px, py) => { const hals = clamp((py + 140) / 100, 0, 1), groef = Math.exp(-(((px + 8) / 30) ** 2) - (((py + 222) / 30) ** 2)); return 0.25 + 0.75 * Math.max(hals, groef); };
  const rand = (dik) => { const buit = [], bin = []; for (let i = 0; i < B.length; i++) { const p = B[i], q0 = B[Math.max(0, i - 1)], q1 = B[Math.min(B.length - 1, i + 1)], dx = q1[0] - q0[0], dy = q1[1] - q0[1], L = Math.hypot(dx, dy) || 1, nx = dy / L, ny = -dx / L, d = dik(p[0], p[1], i);
      buit.push([p[0] + nx * d, p[1] + ny * d]); bin.push(p); } ctx.beginPath(); padGlad(ctx, buit); padGlad(ctx, bin.reverse(), false); ctx.closePath(); };
  if (vlies > 0.01) { rand(() => 4 * vlies); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fill(); }
  if (plak > 0.01) { rand((px, py, i) => 4 + plak * 26 * plek(px, py) * (0.85 + 0.15 * Math.sin(i * 1.7))); const col = paars > 0.01 ? _mixHex(TK.plak, TK.paars, paars) : TK.plak; ctx.fillStyle = rgba(col, 0.92); ctx.fill(); ctx.strokeStyle = rgba(_mixHex('#B8AE78', TK.paars, paars), 0.9); ctx.lineWidth = 1.5; ctx.stroke(); }
  // tandvlees als roze rand over het bot, tot tegen de hals
  if (bot > 0.01) { ctx.save(); ctx.globalAlpha *= bot; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 300, 18); ctx.lineTo(sd * 300, -34); ctx.bezierCurveTo(sd * 220, -44, sd * 160, -60, sd * 128, -88); ctx.lineTo(sd * 121, -44); ctx.lineTo(sd * 117, 14); ctx.quadraticCurveTo(sd * 200, 24, sd * 300, 18); ctx.closePath(); shape(ctx, TK.tandvlees, TK.tandvleesR, 2); } ctx.restore(); }
  ctx.restore();
  if (namen > 0.01) { const nb = (k, n, al) => { const [px, py] = kiesPunt(x, y, s, k); naamBij(ctx, n, '', px, py, a * namen, al); };
    nb('glazuur', 'glazuur', 'left'); nb('tandbeen', 'tandbeen', 'center'); nb('pulpa', 'pulpa', 'center'); if (bot > 0.5) { nb('kaakbot', 'kaakbot', 'center'); nb('tandvlees', 'tandvlees', 'center'); } } }

// ---------- snoep, zak, bureau ----------
const SNOEPKLEUR = ['#E0574F', '#F2C94C', '#7FC48F', '#5BA4C9', '#C77FD0', '#F29A4A'];
function snoepje(ctx, x, y, s = 1, i = 0, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const col = SNOEPKLEUR[i % SNOEPKLEUR.length];
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 14, 0); ctx.lineTo(sd * 28, -10); ctx.lineTo(sd * 28, 10); ctx.closePath(); shape(ctx, _licht(col, 0.25), null); }
  ctx.beginPath(); ctx.ellipse(0, 0, 17, 12, 0, 0, 6.283); shape(ctx, col, _donker(col, 0.25), 1.5); ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(-5, -4, 6, 3, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); }
// zak snoep; vul 0..1 = hoeveel er nog in zit
function snoepzak(ctx, x, y, s = 1, vul = 1, a = 1, n = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-80, -150); ctx.lineTo(-62, -170); ctx.lineTo(62, -170); ctx.lineTo(80, -150); ctx.lineTo(70, 0); ctx.closePath(); shape(ctx, 'rgba(230,240,250,0.22)', '#C9D3DE', 2.5);
  ctx.save(); ctx.clip(); const k = Math.round(n * clamp(vul, 0, 1)); for (let i = 0; i < k; i++) snoepje(ctx, -50 + (i % 4) * 33 + (Math.floor(i / 4) % 2) * 14, -18 - Math.floor(i / 4) * 24, 0.8, i, 1, (i * 0.7) % 1.2 - 0.6); ctx.restore();
  ctx.fillStyle = '#E0574F'; ctx.fillRect(-64, -172, 128, 18); text(ctx, 'SNOEP', 0, -110, fTekst(26, 800), 'rgba(242,242,238,0.8)', 'center'); ctx.restore(); }
// bureau met beeldscherm (spel); de tafel staat vóór de benen
function bureau(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#7A5A40'; ctx.fillRect(x, y, w, 26); ctx.fillStyle = '#5E4430'; ctx.fillRect(x + 20, y + 26, 22, 880 - y - 26); ctx.fillRect(x + w - 42, y + 26, 22, 880 - y - 26); ctx.fillStyle = '#6B4E37'; ctx.fillRect(x + 20, y + 26, w - 40, 120);
  const mx = x + w - 230, my = y - 230; roundRect(ctx, mx, my, 200, 140, 10); shape(ctx, '#20283A', '#4A5468', 3); ctx.fillStyle = '#3A4458'; ctx.fillRect(mx + 92, my + 140, 16, 70); ctx.fillRect(mx + 60, y - 12, 80, 12);
  ctx.save(); roundRect(ctx, mx + 10, my + 10, 180, 120, 6); ctx.clip(); ctx.fillStyle = '#2E6FBF'; ctx.fillRect(mx, my, 200, 140); ctx.fillStyle = '#5FA86E'; ctx.fillRect(mx, my + 96, 200, 40);
  for (let i = 0; i < 3; i++) { const bx = mx + ((t * 60 + i * 70) % 220) - 10; ctx.fillStyle = '#F2C94C'; ctx.beginPath(); ctx.arc(bx, my + 60 + Math.sin(t * 3 + i) * 12, 8, 0, 6.283); ctx.fill(); } ctx.fillStyle = '#E07A5F'; ctx.fillRect(mx + 40, my + 74 - Math.abs(Math.sin(t * 4)) * 20, 18, 22); ctx.restore();
  ctx.restore(); }

// ---------- zuurcurve ----------
// pH-dip na één hap (minuten): binnen ±4 min omlaag, daarna herstel met speeksel (rec = hersteltijd)
function phDip(d, rec = 20) { if (d < 0) return 0; if (d < 4) return 2.4 * (1 - (1 - d / 4) ** 2); return 2.4 * Math.exp(-(((d - 4) / rec) ** 1.5)); }
function phOp(m, happen, rec = 20) { let s = 0; for (const h of happen) s += phDip(m - h, rec); return 7 - Math.min(2.7, s); }
// grafiek pH tegen tijd. o: {m0, m1, happen, tot (tot welke minuut de lijn loopt), col, krit (5,5), kritA, kritTekst, ticks:[[min,'tekst']], ymin, ymax, rec, schaduw, a, snoep, lw, naam}
function phGrafiek(ctx, x, y, w, h, o = {}) { const { m0 = 0, m1 = 60, happen = [], tot = m1, col = C.koraal, krit = 5.5, kritA = 0, kritTekst = 'glazuur lost op', ticks = [], ymin = 3.5, ymax = 7.6, rec = 20, schaduw = 0, a = 1, snoep = 0, lw = 5, as7 = 1, gestippeld = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const X = m => x + (m - m0) / (m1 - m0) * w, Y = p => y + h - (p - ymin) / (ymax - ymin) * h;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  text(ctx, 'pH', x - 18, y + 6, fTekst(30, 700), C.text2, 'right');
  if (as7 > 0.01) { ctx.save(); ctx.globalAlpha *= as7; ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, Y(7)); ctx.lineTo(x + w, Y(7)); ctx.stroke(); text(ctx, '7', x - 16, Y(7) + 10, fTekst(28, 600), C.text2, 'right'); ctx.restore(); }
  ticks.forEach(([m, s2]) => { text(ctx, s2, X(m), y + h + 36, fTekst(24, 600), C.text2, 'center'); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(m), y + h); ctx.lineTo(X(m), y + h + 8); ctx.stroke(); });
  if (kritA > 0.01) { ctx.save(); ctx.globalAlpha *= kritA; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(krit)); ctx.lineTo(x + w, Y(krit)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, String(krit.toFixed(1)).replace('.', ','), x - 16, Y(krit) + 10, fTekst(28, 700), C.goud, 'right'); if (kritTekst) text(ctx, kritTekst, x + w - 6, Y(krit) - 14, fTekst(26, 700), C.goud, 'right'); ctx.restore(); }
  const N = 360, pts = []; for (let i = 0; i <= N; i++) { const m = m0 + (m1 - m0) * i / N; if (m > tot) break; pts.push([X(m), Y(phOp(m, happen, rec))]); }
  if (pts.length > 1) {
    if (schaduw > 0.01) { ctx.save(); ctx.globalAlpha *= schaduw; ctx.beginPath(); ctx.rect(x, Y(krit), w, h); ctx.clip(); ctx.beginPath(); ctx.moveTo(pts[0][0], Y(krit)); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[pts.length - 1][0], Y(krit)); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.35); ctx.fill(); ctx.restore(); }
    if (gestippeld) { ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(gestippeld.col || C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= N; i++) { const m = m0 + (m1 - m0) * i / N; if (m > tot) break; const p = [X(m), Y(phOp(m, happen, gestippeld.rec))]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); }
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); circ(ctx, pts[pts.length - 1][0], pts[pts.length - 1][1], lw + 3, col); }
  if (snoep > 0.01) happen.forEach((m, i) => { if (m <= tot && m >= m0) snoepje(ctx, X(m), y - 14, 0.55, i, snoep * clamp((tot - m) * 2, 0, 1)); });
  ctx.restore(); }

// ---------- tandplak van dichtbij ----------
// in een cirkel (cx, cy, r): glazuur onderin, vliesje, bacteriën die landen, zich vastzetten en delen, slijm ertussen, spoelen helpt niet
const PLAK_B = (() => { const L = []; for (let i = 0; i < 26; i++) { const laag = i < 9 ? 0 : (i < 18 ? 1 : 2); L.push({ x: -0.78 + hash(i * 11 + 1) * 1.56, h: laag * 34 + 12 + hash(i * 11 + 2) * 16, staaf: hash(i * 11 + 3) > 0.45, rot: (hash(i * 11 + 4) - 0.5) * 1.2, col: [C.koraal, C.oker, C.paars, C.teal, '#D9906A'][i % 5], land: (i / 26) * 0.85 + hash(i * 11 + 5) * 0.1, deel: hash(i * 11 + 6) }); } return L; })();
function plakOpp(cx, cy, r, px) { return cy + r * 0.38 + ((px - cx) ** 2) / (r * 5); }
function bact(ctx, x, y, staaf, rot, col, s = 1, a = 1, split = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  if (staaf) { const L = 22 + split * 6; roundRect(ctx, -L * s, -8 * s, 2 * L * s, 16 * s, 8 * s); shape(ctx, rgba(col, 0.75), _donker(col, 0.2), 2); if (split > 0.3) { ctx.strokeStyle = _donker(col, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -8 * s); ctx.lineTo(0, 8 * s); ctx.stroke(); } }
  else { for (const d of split > 0.01 ? [-1, 1] : [0]) { ctx.beginPath(); ctx.arc(d * split * 9 * s, 0, 10 * s, 0, 6.283); shape(ctx, rgba(col, 0.75), _donker(col, 0.2), 2); } }
  ctx.restore(); }
function plakZoom(ctx, cx, cy, r, o = {}) { const { vlies = 0, hecht = 0, deel = 0, slijm = 0, spoel = 0, t = 0 } = o;
  ctx.fillStyle = TK.speeksel; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  // glazuur: staafjes van kristal
  ctx.beginPath(); ctx.moveTo(cx - r, cy + r); for (let i = 0; i <= 40; i++) { const px = cx - r + 2 * r * i / 40; ctx.lineTo(px, plakOpp(cx, cy, r, px)); } ctx.lineTo(cx + r, cy + r); ctx.closePath(); ctx.fillStyle = TK.glazuur; ctx.fill();
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(TK.glazuurR, 0.6); ctx.lineWidth = 2; for (let i = -12; i <= 12; i++) { const px = cx + i * r / 10; ctx.beginPath(); ctx.moveTo(px, plakOpp(cx, cy, r, px)); ctx.lineTo(px + 30, cy + r); ctx.stroke(); } ctx.restore();
  if (vlies > 0.01) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const px = cx - r + 2 * r * i / 40; const py = plakOpp(cx, cy, r, px) - 2; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.strokeStyle = rgba(C.teal, vlies); ctx.lineWidth = 10 * vlies; ctx.stroke(); }
  // slijm (één vulling, geen overlap-vlekken)
  if (slijm > 0.01) { ctx.beginPath(); PLAK_B.forEach(b => { if (hecht < b.land + 0.08) return; const px = cx + b.x * r, py = plakOpp(cx, cy, r, px) - 6 - b.h; ctx.moveTo(px + 40 * slijm + 12, py); ctx.arc(px, py, 40 * slijm + 12, 0, 6.283); if (deel > b.deel) { ctx.moveTo(px + 30 + 40 * slijm + 12, py - 14); ctx.arc(px + 30, py - 14, 40 * slijm + 12, 0, 6.283); } }); ctx.fillStyle = rgba(TK.slijm, 0.32 * slijm); ctx.fill('nonzero'); }
  PLAK_B.forEach((b, i) => { const u = clamp((hecht - b.land) / 0.12, 0, 1); if (u <= 0.01) return; const px = cx + b.x * r, py = plakOpp(cx, cy, r, px) - 6 - b.h, w = wander(i, t, 3, 1);
    const fx = px + (1 - u) * (hash(i) - 0.5) * 300, fy = py - (1 - u) * (r * 0.9); const d = clamp((deel - b.deel) / 0.12, 0, 1);
    bact(ctx, fx + w.x * (1 - u), fy + w.y * (1 - u), b.staaf, b.rot, b.col, 1, u, d < 1 ? d : 0);
    if (d >= 1) bact(ctx, px + 30, py - 14, b.staaf, b.rot + 0.5, b.col, 1, 1, 0); });
  // spoelen: water stroomt erover, de plak blijft zitten
  if (spoel > 0.01) { ctx.save(); ctx.globalAlpha *= spoel; ctx.strokeStyle = rgba('#AFD6F0', 0.7); ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { const ph = (t * 0.9 + hash(i * 3)) % 1, yy = cy - r * 0.7 + i * r * 0.11, xx = cx - r + ph * 2.4 * r - 0.2 * r; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 60, yy - 10, xx + 140, yy); ctx.stroke(); } ctx.restore(); } }

// ---------- bacterie die suiker omzet in melkzuur ----------
function suikerRingetje(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(C.goud, 0.35), C.goud, 2.5, 0); ctx.restore(); }
function melkzuurtje(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, 6); ctx.lineTo(0, -6); ctx.lineTo(18, 6); ctx.stroke(); circ(ctx, -18, 6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 0, -6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 18, 6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 30, -2, 6, '#D8573F', '#F08A70', 1.5); circ(ctx, 0, -20, 6, '#D8573F', '#F08A70', 1.5); ctx.restore(); }
function zuurBacterie(ctx, x, y, s, a = 1, t = 0, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 170 * s, y - 70 * s, 340 * s, 140 * s, 70 * s); shape(ctx, rgba(C.oker, 0.35), C.oker, 4); roundRect(ctx, x - 158 * s, y - 58 * s, 316 * s, 116 * s, 58 * s); ctx.strokeStyle = rgba(C.oker, 0.6); ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 14; i++) circ(ctx, x + (hash(i * 4) - 0.5) * 260 * s, y + (hash(i * 4 + 1) - 0.5) * 80 * s, 3 * s, rgba(C.oker, 0.6));
  if (aan > 0.01) { for (let i = 0; i < 4; i++) { const ph = (t * 0.35 + i / 4) % 1; // suiker in (links), melkzuur uit (rechts)
      if (ph < 0.5) { const u = ph / 0.5; suikerRingetje(ctx, x - 330 * s + u * 260 * s, y + (i - 1.5) * 26 * s, 16 * s, aan * Math.min(1, (1 - u) * 4)); }
      else { const u = (ph - 0.5) / 0.5; for (const k of [-1, 1]) melkzuurtje(ctx, x + 110 * s + u * 240 * s, y + k * 30 * s + (i - 1.5) * 10 * s, 0.9 * s, aan * Math.min(1, u * 4) * Math.min(1, (1 - u) * 5), k * 0.3); } } }
  ctx.restore(); }

// ---------- glazuurkristal: calcium, fosfaat, (fluoride) ----------
const KRIST = (() => { const L = []; for (let r = -4; r <= 4; r++) for (let c = -5; c <= 5; c++) { const x = c * 46 + (r % 2 ? 23 : 0), y = r * 40; if (Math.hypot(x / 1.15, y) > 200) continue; const soort = (r + c + 20) % 3 === 0 ? 'f' : (((c + 20) % 2) ? 'ca' : 'p'); L.push({ x, y, soort, rand: Math.hypot(x / 1.15, y) / 200, i: L.length }); } return L; })();
function kristal(ctx, x, y, s, o = {}) { const { a = 1, weg = 0, terug = 0, fluor = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.lineTo(Math.cos(an) * 250, Math.sin(an) * 230); } ctx.closePath(); shape(ctx, rgba(TK.glazuur, 0.1), rgba(TK.glazuur, 0.55), 2.5);
  KRIST.forEach(k => { let dx = 0, dy = 0, al = 1; if (k.rand > 0.55) { const d = clamp((weg - (1 - k.rand) * 0.6) / 0.4, 0, 1) * (1 - clamp((terug - hash(k.i) * 0.5) / 0.5, 0, 1)); const an = Math.atan2(k.y, k.x); dx = Math.cos(an) * 170 * d; dy = Math.sin(an) * 170 * d; al = 1 - d * 0.75; const w = wander(k.i, t, 6 * d, 1); dx += w.x; dy += w.y; }
    ctx.save(); ctx.globalAlpha *= al; if (k.soort === 'ca') circ(ctx, k.x + dx, k.y + dy, 13, C.goud, '#F2D88A', 2);
    else if (k.soort === 'p') { circ(ctx, k.x + dx, k.y + dy, 11, C.teal, '#9CCBE6', 2); for (let j = 0; j < 4; j++) circ(ctx, k.x + dx + Math.cos(j * 1.57 + 0.78) * 13, k.y + dy + Math.sin(j * 1.57 + 0.78) * 13, 4, '#D8573F'); }
    else { const fl = clamp((fluor - hash(k.i * 3) * 0.5) / 0.5, 0, 1); circ(ctx, k.x + dx, k.y + dy, 8, _mixHex('#C9CED6', '#7FC48F', fl), null); if (fl > 0.5) { ctx.beginPath(); ctx.arc(k.x + dx, k.y + dy, 13, 0, 6.283); ctx.strokeStyle = rgba(C.groen, fl - 0.4); ctx.lineWidth = 3; ctx.stroke(); } }
    ctx.restore(); }); ctx.restore(); }

// ---------- drankjes ----------
function blikje(ctx, x, y, s, col, lab, a = 1, light = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -190, 100, 190, 14); const g = ctx.createLinearGradient(-50, 0, 50, 0); g.addColorStop(0, _donker(col, 0.25)); g.addColorStop(0.35, col); g.addColorStop(1, _donker(col, 0.35)); ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, -46, -200, 92, 18, 8); ctx.fill(); roundRect(ctx, -46, -8, 92, 14, 6); ctx.fill();
  if (light) { ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-50, -120, 100, 40); text(ctx, 'light', 0, -90, fTekst(28, 800), col, 'center'); }
  text(ctx, lab, 0, light ? -140 : -100, fTitel(30), '#F2F2EE', 'center'); ctx.restore(); }
function sportfles(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-42, 0); ctx.lineTo(-42, -150); ctx.quadraticCurveTo(-42, -185, -20, -195); ctx.lineTo(-20, -215); ctx.lineTo(20, -215); ctx.lineTo(20, -195); ctx.quadraticCurveTo(42, -185, 42, -150); ctx.lineTo(42, 0); ctx.closePath(); shape(ctx, rgba('#5BC9C0', 0.7), '#9EE6DE', 2.5);
  ctx.fillStyle = '#2E6FBF'; ctx.fillRect(-24, -238, 48, 24); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-42, -110, 84, 46); text(ctx, 'sport', 0, -79, fTekst(24, 800), '#2E6FBF', 'center'); ctx.restore(); }
function sappak(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-50, -170); ctx.lineTo(0, -205); ctx.lineTo(50, -170); ctx.lineTo(50, 0); ctx.closePath(); shape(ctx, '#F29A2E', '#F6BC6A', 2.5); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-50, -170, 100, 12);
  circ(ctx, 0, -90, 30, '#F7B23B', '#C9761E', 2.5); ctx.strokeStyle = '#C9761E'; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, -90); ctx.lineTo(Math.cos(i * 1.047) * 26, -90 + Math.sin(i * 1.047) * 26); ctx.stroke(); } ctx.restore(); }
function glas(ctx, x, y, s, a = 1, vul = 0.7, col = '#AFD6F0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(-32, 0); ctx.lineTo(32, 0); ctx.lineTo(40, -150); ctx.closePath(); ctx.save(); ctx.clip(); ctx.fillStyle = rgba(col, 0.55); ctx.fillRect(-50, -150 * vul, 100, 150 * vul); ctx.restore(); ctx.strokeStyle = '#DDE6EE'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }

// ---------- maag met zuur dat omhoog komt ----------
function maagZuur(ctx, x, y, s, a = 1, op = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 26 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 220 * s); ctx.lineTo(x, y + 4 * s); ctx.stroke(); ctx.strokeStyle = TK.speeksel; ctx.lineWidth = 12 * s; ctx.stroke();
  maagPad(ctx, x, y, s); shape(ctx, '#D99A8E', '#F0BCB0', 3); ctx.save(); maagPad(ctx, x, y, s); ctx.clip(); ctx.fillStyle = rgba('#C9D64A', 0.55); ctx.fillRect(x - 120 * s, y + 140 * s, 360 * s, 200 * s); ctx.restore();
  if (op > 0.01) for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; circ(ctx, x - 6 * s + Math.sin(i + t) * 3, y + 40 * s - ph * 330 * s * op, 6 * s, rgba('#C9D64A', 0.9 * op * (1 - ph * 0.5))); }
  ctx.restore(); }

// ---------- tandenrij (vooraanzicht onderkaak): plak, paars, tandsteen, wit plekje, borstel ----------
function tandRij(ctx, x, y, w, o = {}) { const { a = 1, paars = 0, plak = 0, steen = 0, witPlek = 0, borstel = -1, ragertje = -1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 6, tw = w / n, th = tw * 1.25;
  ctx.fillStyle = '#5A2A34'; roundRect(ctx, x - 30, y - th - 40, w + 60, th + 120, 30); ctx.fill(); // mondholte achter de tanden
  for (let i = 0; i < n; i++) { const tx = x + i * tw + 6, bw = tw - 12; ctx.beginPath(); ctx.moveTo(tx, y + 30); ctx.lineTo(tx + 4, y - th + 26); ctx.quadraticCurveTo(tx + bw / 2, y - th - 6, tx + bw - 4, y - th + 26); ctx.lineTo(tx + bw, y + 30); ctx.closePath();
    const g = ctx.createLinearGradient(tx, 0, tx + bw, 0); g.addColorStop(0, '#DCE3E6'); g.addColorStop(0.4, '#F6F8F8'); g.addColorStop(1, '#CDD6DA'); shape(ctx, g, '#AEB9BF', 2);
    // plak/paars langs het tandvlees, niet in het midden
    if (plak > 0.01 || paars > 0.01) { ctx.save(); ctx.clip(); const col = _mixHex(TK.plak, TK.paars, paars); const hoog = th * (0.18 + 0.14 * Math.max(plak, paars) + (i % 2) * 0.05);
      ctx.fillStyle = rgba(col, 0.85 * Math.max(plak, paars)); ctx.beginPath(); ctx.moveTo(tx - 4, y + 30); ctx.lineTo(tx - 4, y - hoog - th * 0.25); ctx.quadraticCurveTo(tx + bw * 0.25, y - hoog * 0.9, tx + bw / 2, y - hoog); ctx.quadraticCurveTo(tx + bw * 0.75, y - hoog * 0.9, tx + bw + 4, y - hoog - th * 0.25); ctx.lineTo(tx + bw + 4, y + 30); ctx.closePath(); ctx.fill();
      ctx.fillStyle = rgba(col, 0.3 * paars); ctx.fillRect(tx - 4, y - th, bw + 8, th); ctx.restore(); }
    if (steen > 0.01) { ctx.save(); ctx.globalAlpha *= steen; for (const sx of [tx + 2, tx + bw - 2]) { ctx.beginPath(); ctx.ellipse(sx, y - 6, 12, 18, 0, 0, 6.283); ctx.fillStyle = '#C9A55A'; ctx.fill(); ctx.strokeStyle = '#8A6A30'; ctx.lineWidth = 1.5; ctx.stroke(); } ctx.restore(); }
    if (witPlek > 0.01 && i === 2) { ctx.save(); ctx.globalAlpha *= witPlek; ctx.beginPath(); ctx.ellipse(tx + bw * 0.45, y - th * 0.22, bw * 0.24, th * 0.09, 0, 0, 6.283); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.strokeStyle = 'rgba(200,210,214,0.9)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
  // tandvlees met puntjes tussen de tanden
  ctx.beginPath(); ctx.moveTo(x - 30, y + 90); ctx.lineTo(x - 30, y + 10); for (let i = 0; i <= n; i++) { const gx = x + i * tw; ctx.quadraticCurveTo(gx - tw / 2, y + 34, gx, y - 22); } ctx.lineTo(x + w + 30, y + 10); ctx.lineTo(x + w + 30, y + 90); ctx.closePath(); shape(ctx, TK.tandvlees, TK.tandvleesR, 2.5);
  if (borstel >= 0) { const bx = x + w * (0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 7))) ; tandenborstel(ctx, bx, y - th * 0.55, 0.9, 0, 1); }
  if (ragertje >= 0) { const rx = x + tw * (2 + Math.round(ragertje * 2)), ry = y - th * 0.15 + Math.sin(t * 6) * 12; ragertjeT(ctx, rx, ry, 1, 1); }
  ctx.restore(); }
function tandenborstel(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -60, -12, 300, 24, 12); shape(ctx, '#5BA4C9', '#8CC4E0', 2); roundRect(ctx, -80, -14, 60, 28, 6); shape(ctx, '#E8EEF2', '#AEB9BF', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 4; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-76 + i * 9, -14); ctx.lineTo(-76 + i * 9, -42); ctx.stroke(); } ctx.restore(); }
function ragertjeT(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, -8, 150, 16, 8); shape(ctx, '#7FC48F', '#A8DDB4', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-50, 0); ctx.stroke();
  ctx.strokeStyle = '#E8EEF2'; ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { const xx = -48 + i * 4; ctx.beginPath(); ctx.moveTo(xx, -10); ctx.lineTo(xx, 10); ctx.stroke(); } ctx.restore(); }
function tandpasta(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, -40); ctx.lineTo(90, -32); ctx.lineTo(90, 32); ctx.lineTo(-120, 40); ctx.closePath(); shape(ctx, '#F2F2EE', '#C9CED6', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-120, -14, 210, 28);
  roundRect(ctx, 90, -18, 40, 36, 6); shape(ctx, '#E07A5F', null); text(ctx, 'fluoride', -15, 9, fTekst(22, 800), '#F2F2EE', 'center'); ctx.restore(); }
function plakVerklikker(ctx, x, y, ang = 0) { ctx.save(); ctx.translate(x, y); roundRect(ctx, -16, -60, 32, 60, 8); shape(ctx, rgba(TK.paars, 0.9), '#C9A0DC', 2); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-8, -78, 16, 18); ctx.restore(); }
function spiegeltje(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -90); ctx.stroke(); circ(ctx, 12, -104, 16, '#AFD6F0', '#E8EEF2', 3); ctx.restore(); }
function kauwgom(ctx, x, y) { ctx.save(); ctx.translate(x, y); roundRect(ctx, -38, -60, 76, 46, 8); shape(ctx, '#7FC48F', '#A8DDB4', 2); text(ctx, 'suikervrij', 0, -31, fTekst(15, 800), '#1A2740', 'center'); ctx.restore(); }
function colaLight(ctx, x, y) { blikje(ctx, x, y + 10, 0.42, '#B23A3A', 'cola', 1, true); }
// klein kaartje met de titel van een andere film
function filmKaart(ctx, titel, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const w = ctx.measureText(titel).width + 110; roundRect(ctx, x - w / 2, y - 40, w, 64, 14); shape(ctx, rgba(C.teal, 0.16), C.teal, 2);
  ctx.beginPath(); ctx.moveTo(x - w / 2 + 28, y - 22); ctx.lineTo(x - w / 2 + 52, y - 8); ctx.lineTo(x - w / 2 + 28, y + 6); ctx.closePath(); ctx.fillStyle = C.teal; ctx.fill(); text(ctx, titel, x - w / 2 + 70, y + 2, fTekst(28, 700), C.text, 'left'); ctx.restore(); }
// rij eetmomenten: n borden + snacks; hl = zichtbaarheid
function eetmoment(ctx, x, y, soort, a = 1, i = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 62, rgba(soort === 'bord' ? C.teal : C.goud, 0.15), soort === 'bord' ? C.teal : C.goud, 2.5);
  if (soort === 'bord') { ctx.beginPath(); ctx.ellipse(x, y + 6, 44, 16, 0, 0, 6.283); shape(ctx, '#E8EEF2', '#AEB9BF', 2); ctx.beginPath(); ctx.ellipse(x - 8, y, 16, 8, 0, 0, 6.283); ctx.fillStyle = '#C9763E'; ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 14, y + 2, 12, 6, 0, 0, 6.283); ctx.fillStyle = '#5FA86E'; ctx.fill(); }
  else snoepje(ctx, x, y, 1.2, i, 1); ctx.restore(); }
// thee-kopje
function kopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-44, -60); ctx.lineTo(-36, 0); ctx.lineTo(36, 0); ctx.lineTo(44, -60); ctx.closePath(); shape(ctx, '#E8EEF2', '#AEB9BF', 2); ctx.beginPath(); ctx.arc(52, -32, 16, -1.4, 1.4); ctx.strokeStyle = '#E8EEF2'; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#B07A3A'; ctx.beginPath(); ctx.ellipse(0, -56, 40, 7, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
// wasbak met schuim (uitspugen)
function wasbak(ctx, x, y, a = 1, schuim = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 110, y - 50); ctx.lineTo(x + 110, y - 50); ctx.quadraticCurveTo(x + 100, y + 40, x, y + 40); ctx.quadraticCurveTo(x - 100, y + 40, x - 110, y - 50); ctx.closePath(); shape(ctx, '#E8EEF2', '#AEB9BF', 3);
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 6, y - 120, 12, 70); ctx.fillRect(x - 6, y - 120, 50, 12); if (schuim > 0.01) for (let i = 0; i < 6; i++) circ(ctx, x - 30 + i * 12, y + 10 - (i % 2) * 8, 9, rgba('#FFFFFF', schuim)); ctx.restore(); }

// ---------- kleine hulpjes (zoals in l1 / de engine) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// één chip tegelijk: [woord, n, tekst, kleur]; de vorige gaat weg vóór de volgende komt
function wisselChip(ctx, lijst, x, y, t, q, px = 28) { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n)) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.3)) / 0.3, 0, 1) : 0; chip(ctx, s2, x, y, col, q.on(w, n, 0.35) * (1 - uit), px); }
