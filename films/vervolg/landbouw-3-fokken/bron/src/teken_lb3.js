// Wat word jij? · Landbouw 3 · Fokken: selecteren, inteelt en de fokwaarde — eigen tekenfuncties (25 okt 2026)
// Laadvolgorde: lib.js, lib_cast.js (actueel castboek), lib_bio.js, scenes.js r.1–32, extra.js, lib_micro_evo_min.js (dnaDraad, chromosoom1),
// hoefpop.js (HoefPop + koe7 uit bibliotheek/dieren/lib_dieren.js, goedgekeurd ronde 3–4), dan dit bestand.
// Maatvoering: P = px per cm. Koe en mens met dezelfde P staan op ware schaal (Holstein ± 145 cm schoft, mens ± 165–175 cm).

// ---------- hulpjes uit de Diergeneeskunde-reeks (teken_dg0.js / teken_dg2.js), letterlijk overgenomen ----------
const _dk3 = (hex, k = 0.25) => _mixHex(hex, '#000000', k), _lt3 = (hex, k = 0.25) => _mixHex(hex, '#FFFFFF', k);
function rietje(ctx, x, y, s = 1, a = 1, rot = 0, col = '#5BA4C9') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -70, -6, 140, 12, 6); shape(ctx, col, _lt3(col, 0.3), 1.5); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-70, -6, 14, 12); ctx.restore(); }
// vat met vloeibare stikstof (uit teken_dg0.js), nu met deksel, handvatten en label −196 °C
function stikstofVat(ctx, x, y, s = 1, a = 1, t = 0, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -220, 180, 220, 30); shape(ctx, '#8A96A8', '#C4CCD8', 2); ctx.fillStyle = rgba('#FFFFFF', 0.12); roundRect(ctx, -70, -205, 26, 190, 13); ctx.fill();
  ctx.strokeStyle = '#6A7688'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-90, -150); ctx.lineTo(90, -150); ctx.moveTo(-90, -60); ctx.lineTo(90, -60); ctx.stroke();
  roundRect(ctx, -40, -250, 80, 40, 10); shape(ctx, '#6A7688', '#C4CCD8', 2);
  for (const sx of [-1, 1]) { ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(sx * 98, -190, 18, sx > 0 ? -1.4 : 1.7, sx > 0 ? 1.4 : 4.5); ctx.stroke(); }
  for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i * 0.2) % 1; ctx.fillStyle = `rgba(230,240,255,${0.3 * (1 - ph)})`; ctx.beginPath(); ctx.arc(-20 + i * 10 + Math.sin(ph * 6 + i) * 12, -262 - ph * 80, 12 + ph * 14, 0, 6.283); ctx.fill(); }
  if (o.label !== false) { roundRect(ctx, -62, -128, 124, 46, 8); shape(ctx, '#F2EEE4', null); text(ctx, '−196 °C', 0, -94, fTekst(30, 800), '#1A2740', 'center'); }
  ctx.restore(); }

// ---------- KOEIEN: koe7-pop (HoefPop, bibliotheek) met eigen kleuren per ras ----------
// Alleen kleur, dikte van de poten en kleine toevoegingen (uier, blaar, neusring, nekkam) verschillen; vorm, skelet en gang zijn de goedgekeurde koe7.
const _KOE_BASIS = { H: 140, oogR: 2.7, oogStijl: 'koe', kopVolg: 0.95, neusK: '#7A4A44', mondK: '#7A5048', iris: '#2A1A10', dikV: 1.2, dikA: 1.15, verKleur: '#3A2E2E',
  HOEF: { type: 'klauw', L: 11, hv: 6.5, hh: 3.5, kleur: '#4A3D36' } };
const _ZW = '#25211F', _ZWOOR = '#1C1917', _WIT = '#EEE8DE', _WITPOOT = '#E9E3D8';
const _pootK = (c) => ({ rad: { c }, mc: { c }, vp: { c }, schn: { c }, mt: { c }, ap: { c } });
function _lb3KoeDef(o) { const d = _hoefDef('koe', Object.assign({}, _KOE_BASIS, o, {
    HOUDING: { staan: { ver: { V: -8, A: 8 } }, grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 14 }, dy: 6, A: { nek: 62 }, reik: 1 }, liggen: _koeLig(HOEF_VORM.koe.J) },
    GANGEN: { lopen: _hoefStap(130, 0.65, 0.88, { scap: 12, rol: 1.0 }) } })); return d; }
const KOE_RAS = {
  // Holstein zwartbont: zwarte basis met witte vlekken (de witte lappen van de MRIJ-plaat), witte poten, kop zwart met witte bles
  holstein: { def: _lb3KoeDef({ dikV: 1.0, dikA: 0.98, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.95, sy: 1.04, uier: 1.3, staartWit: 1 },
  // dubbeldoelkoe (oud zwartbont Fries-Hollands type, melk én vlees): zelfde kleuren, gedrongen, dikke poten, klein uier
  dubbel: { def: _lb3KoeDef({ dikV: 1.55, dikA: 1.45, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 1.08, sy: 0.86, uier: 0.55, staartWit: 1 },
  // Groninger blaarkop: zwart met witte kop en zwarte 'blaren' rond de ogen, witte buik en staartpunt, zwarte poten
  blaarkop: { def: _lb3KoeDef({ dikV: 1.25, dikA: 1.2, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#C6AD9B': '#E6DFD4' }, WEG: ['#E8D7C6:romp', '#834B30:kop'], POOT: _pootK('#2E2A27'),
      GEZICHT: (ctx) => { const O = HOEF_VORM.koe.oog; ctx.fillStyle = _ZW; ctx.beginPath(); ctx.ellipse(O[0] - 0.5, O[1] + 0.3, 7.2, 5.6, -0.3, 0, 6.283); ctx.fill(); } }), sx: 1.0, sy: 0.97, uier: 0.85, staartWit: 1, buikWit: 1 },
  // stier (Holstein): zwartbont, zwaarder voorhand, geen uier, neusring
  stier: { def: _lb3KoeDef({ H: 160, dikV: 1.6, dikA: 1.45, KLEUR: { '#834B30': '#201C1A', '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#C9C1B6' }, POOT: _pootK(_WITPOOT),
      GEZICHT: (ctx) => { const N = HOEF_VORM.koe.neusgat; ctx.strokeStyle = '#C9B26A'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(N[0] + 2.5, N[1] + 6.5, 3.6, 4.4, 0.2, 0, 6.283); ctx.stroke(); } }), sx: 1.07, sy: 1.0, uier: 0, kam: 1 },
  // stierkalfje: Holstein-kleuren, kortere romp (sx < sy): poten lijken naar verhouding langer
  kalf: { def: _lb3KoeDef({ dikV: 0.9, dikA: 0.9, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.76, sy: 1.0, uier: 0 }
};
for (const k in KOE_RAS) KOE_RAS[k].pop = HoefPop.maak(KOE_RAS[k].def);
// koe in wereldcoördinaten: x,y = midden onder de poten op de grond; P = px per cm; o: houding, t, kijk, a, uier (overschrijft ras)
function rund(ctx, ras, x, y, P, o = {}) { const R = KOE_RAS[ras]; if (!R) return; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(R.sx, R.sy);
  const pop = R.pop, an = pop.D.anker || 0, X = (cx) => kijk * P * (cx - an), Y = (cy) => P * cy;
  pop.teken(ctx, 0, 0, P, { houding: o.houding || 'staan', t: o.t || 0, kijk });
  // uier: ná de pop, vóór de nabije achterpoot (die staat er op x ≈ −60 tot −46 cm, het uier begint op −47); bovenrand valt in de buik
  const ui = o.uier != null ? o.uier : R.uier; if (ui > 0.01) { const u = ui, d = 13 * u; ctx.fillStyle = '#DDB0A3'; ctx.beginPath(); ctx.moveTo(X(-47), Y(-56)); ctx.bezierCurveTo(X(-50), Y(-56 + d * 0.9), X(-40), Y(-55 + d), X(-28), Y(-55 + d)); ctx.bezierCurveTo(X(-14), Y(-55 + d), X(-9), Y(-54 + d * 0.5), X(-8), Y(-57)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = rgba('#B98374', 0.4); ctx.beginPath(); ctx.ellipse(X(-28), Y(-55 + d * 0.86), P * 13, P * 2.4 * u, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba('#B98374', 0.55); ctx.lineWidth = Math.max(1, P * 0.45); ctx.beginPath(); ctx.moveTo(X(-28), Y(-55)); ctx.quadraticCurveTo(X(-27), Y(-55 + d * 0.5), X(-28), Y(-55 + d * 0.9)); ctx.stroke();
    ctx.fillStyle = '#C98E80'; for (const tx of [-39, -17]) { roundRect(ctx, X(tx) - P * 1.3, Y(-56 + d), P * 2.6, P * 5, P * 1.2); ctx.fill(); } }
  // nekkam van de stier: zware bult boven hals en schoft (stieren hebben een veel dikkere nek dan koeien)
  if (R.kam) { ctx.fillStyle = '#201C1A'; ctx.beginPath(); ctx.moveTo(X(30), Y(-130)); ctx.quadraticCurveTo(X(60), Y(-156), X(96), Y(-144)); ctx.quadraticCurveTo(X(100), Y(-120), X(80), Y(-104)); ctx.lineTo(X(40), Y(-110)); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// schofthoogte van een ras in px (handig voor labels boven de koe)
const rundTop = (ras, y, P) => y - P * 150 * (KOE_RAS[ras] ? KOE_RAS[ras].sy : 1);

// telpoppetje-koe (alleen voor groepen en tellingen, zoals de telpoppetjes bij mensen): zijaanzicht, kop rechts
function koeIcoon(ctx, x, y, h, col = C.text2, a = 1, o = {}) { if (a <= 0.01) return; const s = h / 60, kijk = o.kijk || 1; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.fillStyle = col;
  roundRect(ctx, -40, -52, 66, 30, 12); ctx.fill(); // romp
  ctx.beginPath(); ctx.moveTo(18, -50); ctx.quadraticCurveTo(34, -60, 44, -48); ctx.lineTo(48, -36); ctx.quadraticCurveTo(46, -30, 38, -32); ctx.lineTo(22, -30); ctx.closePath(); ctx.fill(); // hals en kop
  ctx.beginPath(); ctx.ellipse(28, -54, 6, 2.6, -0.4, 0, 6.283); ctx.fill(); // oor
  for (const px of [-34, -24, 12, 20]) ctx.fillRect(px, -26, 6, 26); // poten
  ctx.lineWidth = 3; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(-39, -48); ctx.quadraticCurveTo(-46, -36, -43, -18); ctx.stroke(); // staart
  if (o.uier) { ctx.beginPath(); ctx.ellipse(-12, -22, 9, 5, 0, 0, 6.283); ctx.fill(); }
  if (o.bont) { ctx.fillStyle = rgba('#FFFFFF', 0.85); blob(ctx, -18, -44, 10, 7, 0.25, o.bont); ctx.fill(); blob(ctx, 6, -34, 8, 6, 0.25, o.bont + 2); ctx.fill(); }
  ctx.restore(); }
function stierIcoon(ctx, x, y, h, col = C.text2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; koeIcoon(ctx, x, y, h, col, 1); const s = h / 60; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x + 20 * s, y - 52 * s, 13 * s, 8 * s, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); }

// ---------- figuranten in castboekstijl (voorstel, nog niet in het castboek) ----------
// Het castboek kent geen veehoudster en geen inseminator: CAST_EXTRA heeft alleen familie en buren; Veehouder Gerrit (vast, man) bestaat wel.
if (!CAST.veehoudster) CAST.veehoudster = { naam: 'Veehoudster', leeftijd: 46, rol: 'figurant · melkveehouder, haar bedrijf is Yasmins stageplek (Landbouw 3) · los van alle families',
  huid: '#E2B48F', haar: '#6A4428', kapsel: 'staart', wenkbrauw: '#4A2E1A', wimpers: true, lippen: '#B05A50',
  top: 'jas', topKleur: '#2F6A78', topAccent: '#275966', broek: '#2F6A78', schoen: '#2E3A2A', schoenAccent: '#1E261C', accessoire: [], lengte: 0.99 };
if (!CAST.inseminator) CAST.inseminator = { naam: 'Inseminator', leeftijd: 41, rol: 'figurant · inseminator (KI), overall en lange handschoen (Landbouw 3)', huid: '#C99A78', haar: '#3A2A20', kapsel: 'kort', wenkbrauw: '#2E2018', stoppels: true,
  top: 'overall', topKleur: '#55606E', topAccent: '#454F5C', broek: '#55606E', schoen: '#2E3A2A', schoenAccent: '#1E261C', accessoire: [], lengte: 1.02 };
// Yasmin in de stal: werkoverall en laarzen (voorstel voor haar garderobe)
if (CAST.yasmin && CAST.yasmin.garderobe && !CAST.yasmin.garderobe.stal) CAST.yasmin.garderobe.stal = { top: 'jas', topKleur: '#4E6B4A', topAccent: '#41593D', broek: '#3E4A3A', schoen: '#2A2F26', schoenAccent: '#1E221C', accessoire: ['oorbel'] };
// lange KI-handschoen over de rechterarm (de arm met o.pose; zelfde armformules als persoon())
function kiHandschoen(ctx, id, x, voet, h, pose, kijk = 1) { const P0 = CAST[id], pz = POSES[pose] || POSES.staan; const H = h * (P0.lengte || 1), hh = H / (P0.kop || 6.1), top = voet - H, sw = hh * (P0.schouderK || (P0.leeftijd > 30 ? 1.95 : 1.8));
  const schouderY = top + hh * 1.42, sx = x + kijk * sw * 0.4, sy = schouderY + hh * 0.25, L1 = hh * 1.32, L2 = hh * 1.2, [a1, a2] = pz.R;
  const ex = sx + kijk * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1, hx = ex + kijk * Math.sin(a2) * L2, hy = ey + Math.cos(a2) * L2;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#8FB4CF'; ctx.lineWidth = hh * 0.36; ctx.beginPath(); ctx.moveTo(sx + (ex - sx) * 0.35, sy + (ey - sy) * 0.35); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = hh * 0.06; ctx.beginPath(); ctx.moveTo(ex, ey - hh * 0.08); ctx.lineTo(hx, hy - hh * 0.08); ctx.stroke();
  const ang = Math.atan2(hy - ey, hx - ex); ctx.fillStyle = '#8FB4CF'; ctx.beginPath(); ctx.ellipse(hx + Math.cos(ang) * hh * 0.08, hy + Math.sin(ang) * hh * 0.08, hh * 0.21, hh * 0.17, ang, 0, 6.283); ctx.fill(); ctx.restore();
  return { x: hx + Math.cos(ang) * hh * 0.14, y: hy + Math.sin(ang) * hh * 0.14, ang }; }
// inseminatiepistool (lange dunne staaf met het rietje erin)
function kiPistool(ctx, x, y, ang, L = 150, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -L * 0.12, -5, L, 10, 5); shape(ctx, '#D8DEE6', '#8A94A2', 1.5); roundRect(ctx, -L * 0.2, -9, L * 0.14, 18, 5); shape(ctx, '#5B8CC9', null); ctx.restore(); }

// ---------- STAL (geen decor: alleen grond en een paar balken tot het ElevenLabs-decor er is) ----------
function stalGrond(ctx, y = 860) { ctx.fillStyle = '#2B3442'; ctx.fillRect(0, y, W, 40); ctx.fillStyle = '#3A4558'; ctx.fillRect(0, y - 6, W, 8); stroLaag(ctx, 0, y - 8, W); }
function stroLaag(ctx, x, y, w, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#C9A35C', 0.55); ctx.lineWidth = 2; for (let i = 0; i < w / 7; i++) { const px = x + hash(i * 1.7) * w, an = hash(i * 3.3) * 1.2 - 0.6; ctx.beginPath(); ctx.moveTo(px, y + 2 + hash(i) * 10); ctx.lineTo(px + Math.cos(an) * 20, y + 2 + hash(i) * 10 + Math.sin(an) * 6); ctx.stroke(); } ctx.restore(); }
function decorLabel(ctx, s = 'STAL · DECOR VOLGT (ELEVENLABS)') { metaText(ctx, s, 80, 90, C.text2, 'left', 24); }
function hek(ctx, x0, x1, y, h = 150, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#8A8F98'; ctx.lineCap = 'round';
  ctx.lineWidth = 9; for (const yy of [y - h, y - h * 0.62, y - h * 0.24]) { ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); }
  ctx.lineWidth = 12; for (let px = x0; px <= x1 + 1; px += (x1 - x0) / Math.max(1, Math.round((x1 - x0) / 260))) { ctx.beginPath(); ctx.moveTo(px, y - h - 12); ctx.lineTo(px, y); ctx.stroke(); }
  ctx.restore(); }

// ---------- keuzebord JOUW STAMBOOM ----------
// o.moeders = aantal gevulde moedervakken (0–3), o.vader = 0/1/'kaart', o.ster
function keuzebord(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.82), rgba(C.goud, 0.8), 2.5);
  text(ctx, 'JOUW STAMBOOM', x + 28, y + 52, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', x + 28, y + 86, C.text2, 'left', 20);
  const rij = o.rijen || [['VADER', 1], ['MOEDERS', 3]]; let yy = y + 120;
  for (const [naam, n] of rij) { metaText(ctx, naam, x + 28, yy + 22, C.text2, 'left', 18); const vw = 76, gap = 14;
    for (let i = 0; i < n; i++) { const bx = x + 28 + i * (vw + gap), by = yy + 34; roundRect(ctx, bx, by, vw, 58, 10); ctx.setLineDash([7, 6]); shape(ctx, rgba(C.fill, 0.4), rgba(C.line, 0.8), 2); ctx.setLineDash([]); }
    yy += 112; }
  ctx.restore(); }

// ---------- staafjes melk per koe ----------
function melkStaaf(ctx, x, yBodem, w, hPx, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, yBodem - hPx, w, hPx, 10); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }

// ---------- denkwolk ----------
function denkwolk(ctx, x, y, w, h, bronX, bronY, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = rgba('#F2F2EE', 0.1), rand = rgba('#F2F2EE', 0.55);
  ctx.beginPath(); const n = 11; for (let i = 0; i < n; i++) { const an = i / n * 6.283, an2 = (i + 1) / n * 6.283; const px = x + w / 2 + Math.cos(an) * w / 2, py = y + h / 2 + Math.sin(an) * h / 2, qx = x + w / 2 + Math.cos(an2) * w / 2, qy = y + h / 2 + Math.sin(an2) * h / 2;
    const mx = x + w / 2 + Math.cos((an + an2) / 2) * w * 0.6, my = y + h / 2 + Math.sin((an + an2) / 2) * h * 0.6; if (!i) ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, qx, qy); } ctx.closePath(); shape(ctx, col, rand, 2.5);
  for (const [k, r] of [[0.28, 16], [0.58, 11], [0.82, 7]]) circ(ctx, lerp(x + w * 0.3, bronX, k), lerp(y + h, bronY, k), r, col, rand, 2);
  ctx.restore(); }

// ---------- streepjescode ----------
function streepjescode(ctx, x, y, w, h, seed, col = '#1A2740', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; let px = x; let i = 0;
  while (px < x + w - 2) { const bw = 1.5 + Math.floor(hash(seed * 17 + i) * 3) * 1.6; if (hash(seed * 7 + i * 3) > 0.42) ctx.fillRect(px, y, bw, h); px += bw + 1.5 + hash(seed + i * 11) * 2; i++; } ctx.restore(); }

// ---------- buisje met streepjescode, tangetje ----------
function haarBuisje(ctx, x, y, s = 1, a = 1, rot = 0, seed = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -14, -70, 28, 110, 13); shape(ctx, rgba('#DCE5EC', 0.35), '#DCE5EC', 2); roundRect(ctx, -17, -84, 34, 20, 5); shape(ctx, C.paars, null);
  roundRect(ctx, -12, -50, 24, 46, 3); shape(ctx, '#F2EEE4', null); ctx.save(); ctx.translate(0, -27); ctx.rotate(Math.PI / 2); streepjescode(ctx, -20, -9, 40, 18, seed); ctx.restore();
  ctx.strokeStyle = '#2A2622'; ctx.lineWidth = 1.4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-5 + i * 3, 30); ctx.quadraticCurveTo(-2 + i * 2, 14, -6 + i * 4, 4); ctx.stroke(); } // haren
  ctx.restore(); }
function tangetje(ctx, x, y, s = 1, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(70, -7); ctx.moveTo(0, 0); ctx.lineTo(70, 7); ctx.stroke(); ctx.fillStyle = '#5A6070'; roundRect(ctx, -8, -8, 22, 16, 5); ctx.fill(); ctx.restore(); }
// stro-kalverhok: achterwand, zijschotten en strobed
function kalverhok(ctx, x0, x1, y, h = 260, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - h, x1 - x0, h, 8); shape(ctx, rgba('#5A6478', 0.35), null);
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { const px = x0 + i * (x1 - x0) / 8; ctx.beginPath(); ctx.moveTo(px, y - h); ctx.lineTo(px, y); ctx.stroke(); }
  ctx.fillStyle = '#7A8494'; ctx.fillRect(x0 - 10, y - h - 10, 18, h + 10); ctx.fillRect(x1 - 8, y - h - 10, 18, h + 10);
  ctx.fillStyle = rgba('#C9A35C', 0.3); ctx.fillRect(x0, y - 22, x1 - x0, 22); stroLaag(ctx, x0, y - 26, x1 - x0); ctx.restore(); }

// ---------- MICRO: chromosomenpaar met veel kleine allelen ----------
// kaal chromosoom (zelfde vorm en banden als chromosoom1 uit lib_micro_evo, zonder gen-band); paars = DNA
function chromKaal(ctx, x, y, h, breed) { _chromTekening(ctx, x, y - h / 2, h, breed, 0.58, C.kern, C.kernR, null, x * 0.01); }
// allelen = lijst [{p (0–1 langs het chromosoom), k: 0|1 (welke variant)}]; kleuren paars licht/donker (paars = DNA)
function chromAllelen(ctx, x, y, h, seed, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const breed = o.breed || 40; ctx.save(); ctx.globalAlpha *= a;
  chromKaal(ctx, x, y, h, breed);
  const n = o.n || 13; for (let i = 0; i < n; i++) { const p = 0.08 + i / (n - 1) * 0.84; if (Math.abs(p - 0.58) < 0.04) continue; const k = hash(seed * 31 + i * 7) > 0.5; const yy = y - h / 2 + p * h;
    ctx.fillStyle = k ? '#E6D9FF' : '#4E3C86'; roundRect(ctx, x - breed * 0.42, yy - 3, breed * 0.84, 6, 3); ctx.fill(); }
  ctx.restore(); }
// één chromosoom met een klein koraal allel 'r' op plek p
function chromR(ctx, x, y, h, p, lab = 'r', o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const breed = o.breed || 40; ctx.save(); ctx.globalAlpha *= a; chromKaal(ctx, x, y, h, breed);
  const yy = y - h / 2 + p * h; if (lab) { roundRect(ctx, x - breed * 0.46, yy - 9, breed * 0.92, 18, 5); shape(ctx, lab === 'r' ? C.koraal : '#9CCBE3', null); naamBij(ctx, lab, '', x + breed * 0.75, yy + 12, 1, 'left', lab === 'r' ? C.koraal : C.text); }
  ctx.restore(); }

// ---------- DNA-chip ----------
function dnaChip(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3446', '#8FA0B5', 2.5);
  roundRect(ctx, x + 24, y + 24, w - 48, h - 48, 8); shape(ctx, '#0D1420', null); const n = o.n || 18, m = Math.round(n * (h - 48) / (w - 48)); const dx = (w - 72) / (n - 1), dy = (h - 72) / (m - 1);
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const v = hash(i * 13.1 + j * 7.7 + (o.seed || 1)); const col = v < 0.33 ? C.paars : v < 0.66 ? '#D8CCF5' : C.goud; circ(ctx, x + 36 + i * dx, y + 36 + j * dy, Math.min(dx, dy) * 0.28, rgba(col, 0.85)); }
  ctx.fillStyle = '#5A6070'; for (let i = 0; i < 10; i++) { ctx.fillRect(x + 30 + i * (w - 60) / 9 - 4, y + h, 8, 14); } ctx.restore(); }
// merkervlaggetje op een chromosoom (goud)
function merkerVlag(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 34 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - 34 * s); ctx.lineTo(x + 22 * s, y - 27 * s); ctx.lineTo(x, y - 20 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); circ(ctx, x, y, 3.5 * s, C.goud); ctx.restore(); }
// loep, schaar, spuit (simpele herkenbare vormen)
function loep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.55, y + r * 1.55); ctx.stroke();
  circ(ctx, x, y, r, rgba('#9CCBE3', 0.12), '#C4CCD8', r * 0.12); ctx.restore(); }
function schaar(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-10, 10); ctx.lineTo(50, -24); ctx.moveTo(-10, -10); ctx.lineTo(50, 24); ctx.stroke(); circ(ctx, -24, 16, 12, null, '#C4CCD8', 6); circ(ctx, -24, -16, 12, null, '#C4CCD8', 6); ctx.restore(); }
function spuit(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -12, 70, 24, 5); shape(ctx, rgba('#DCE5EC', 0.3), '#C4CCD8', 3);
  ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(62, 0); ctx.moveTo(-40, 0); ctx.lineTo(-58, 0); ctx.moveTo(-58, -12); ctx.lineTo(-58, 12); ctx.stroke(); ctx.restore(); }
function doorstreep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, null, C.koraal, 6); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - r * 0.7, y + r * 0.7); ctx.lineTo(x + r * 0.7, y - r * 0.7); ctx.stroke(); ctx.restore(); }

// ---------- stierkaart (referentiegroep, tablet, tijdbalk) ----------
// o: dochters (aantal), melk (0–1, staafjes van de dochters), code (seed), titel, rand, licht
function stierKaart(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, o.donker ? rgba(C.fill, 0.85) : '#EEF0F2', o.rand || (o.donker ? C.line : '#B8C0CC'), o.rand ? 4 : 1.5);
  const ink = o.donker ? C.text : '#1A2740', ic = o.donker ? C.text2 : '#3A4458';
  if (!o.geenStier) { const Pp = Math.min(h * 0.4 / 160, w * 0.46 / 250); rund(ctx, 'stier', x + w * 0.26, y + h * (o.dochters ? 0.5 : 0.62), Pp, { kijk: 1 }); }
  if (o.code != null) { roundRect(ctx, x + w * 0.52, y + h * 0.12, w * 0.4, h * 0.24, 4); shape(ctx, o.donker ? '#F2EEE4' : '#FFFFFF', null); streepjescode(ctx, x + w * 0.54, y + h * 0.15, w * 0.36, h * 0.18, o.code, '#1A2740'); }
  if (o.dochters) { const n = o.dochters, dw = (w - 24) / n; for (let i = 0; i < n; i++) { const m = o.melk != null ? clamp(o.melk + (hash(o.code * 3 + i) - 0.5) * 0.3, 0.15, 1) : 0.5; const bx = x + 12 + i * dw + dw / 2;
      koeIcoon(ctx, bx, y + h - 12, Math.min(dw * 0.9, h * 0.2), ic, 1); ctx.fillStyle = rgba(C.goud, 0.85); ctx.fillRect(bx - dw * 0.18, y + h - 16 - h * 0.2 - m * h * 0.22, dw * 0.36, m * h * 0.22); } }
  if (o.titel) text(ctx, o.titel, x + w / 2, y + h * 0.92, fTekst(Math.round(h * 0.11), 700), ink, 'center');
  ctx.restore(); }

// ---------- stamboom-knoop ----------
function knoop(ctx, x, y, r, man, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vul = o.vul || C.bgSchema, rand = o.rand || C.text, lw = o.lw || 3;
  if (man) { roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 4); shape(ctx, vul, rand, lw); } else { circ(ctx, x, y, r, vul, rand, lw); } ctx.restore(); }
function ster(ctx, x, y, r, col = C.goud, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, col, _lt3(col, 0.35), 2); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); ctx.restore(); }

// ---------- vrucht in de baarmoeder (sober: dwarsdoorsnede, geen bloed) ----------
// g = grootte 0..1 van de vrucht; stop = 0..1 (grijs, groeit niet verder)
function baarmoederVrucht(ctx, x, y, r, g, stop = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); shape(ctx, rgba('#C98A7A', 0.14), rgba('#C98A7A', 0.75), 4);
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.08, r * 0.84, 0, 0, 6.283); ctx.strokeStyle = rgba('#C98A7A', 0.35); ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, r * 0.98, r * 0.74, 0, 0, 6.283); ctx.fillStyle = rgba('#9CCBE3', 0.08); ctx.fill(); // vruchtwater
  const k = r * 0.66 * g, col = stop > 0.5 ? '#80868F' : '#CFA58A', dk = stop > 0.5 ? '#60666F' : '#A97E64'; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.15); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // romp (gebogen rug), kop met snuit naar beneden-voren, gevouwen voor- en achterpoten met donkere klauwtjes
  ctx.beginPath(); ctx.moveTo(-k * 0.75, k * 0.05); ctx.bezierCurveTo(-k * 0.8, -k * 0.55, k * 0.2, -k * 0.7, k * 0.5, -k * 0.3); ctx.bezierCurveTo(k * 0.62, -k * 0.05, k * 0.4, k * 0.35, -k * 0.05, k * 0.35); ctx.bezierCurveTo(-k * 0.45, k * 0.38, -k * 0.72, k * 0.3, -k * 0.75, k * 0.05); ctx.fill();
  ctx.beginPath(); ctx.ellipse(k * 0.6, -k * 0.08, k * 0.34, k * 0.2, 1.15, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 0.74, k * 0.2, k * 0.12, k * 0.1, 0.6, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 0.46, -k * 0.32, k * 0.12, k * 0.05, -0.5, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); ctx.fillStyle = col;
  ctx.lineWidth = Math.max(2, k * 0.12); ctx.beginPath(); ctx.moveTo(k * 0.25, k * 0.25); ctx.lineTo(k * 0.38, k * 0.6); ctx.lineTo(k * 0.12, k * 0.72); ctx.moveTo(-k * 0.5, k * 0.25); ctx.lineTo(-k * 0.34, k * 0.62); ctx.lineTo(-k * 0.06, k * 0.6); ctx.stroke();
  ctx.fillStyle = dk; for (const [hx, hy] of [[k * 0.1, k * 0.73], [-k * 0.04, k * 0.61]]) { ctx.beginPath(); ctx.ellipse(hx, hy, k * 0.07, k * 0.05, 0, 0, 6.283); ctx.fill(); }
  ctx.lineWidth = Math.max(1.5, k * 0.05); ctx.strokeStyle = dk; ctx.beginPath(); ctx.moveTo(-k * 0.74, k * 0.02); ctx.quadraticCurveTo(-k * 0.9, k * 0.2, -k * 0.82, k * 0.38); ctx.stroke(); // staartje
  circ(ctx, k * 0.68, -k * 0.2, Math.max(1.5, k * 0.045), stop > 0.5 ? '#50565F' : '#3A2820'); ctx.restore();
  ctx.restore(); }

// ---------- tablet met paringsprogramma ----------
function tabletScherm(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 26); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, x + 22, y + 22, w - 44, h - 44, 10); shape(ctx, '#0F1622', null);
  metaText(ctx, 'PARINGSPROGRAMMA: TE VEEL FAMILIE → UIT', x + 46, y + 70, C.text2, 'left', 18);
  const kw = (w - 44 - 60) / 2, kh = h - 44 - 120, ky = y + 92;
  stierKaart(ctx, x + 44, ky, kw, kh, { donker: 1, code: 11, rand: C.koraal }); stierKaart(ctx, x + 44 + kw + 16, ky, kw, kh, { donker: 1, code: 23, rand: C.goud });
  text(ctx, 'MELK ↑↑', x + 44 + kw / 2, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaText(ctx, 'FAMILIE VAN DEZE KOE', x + 44 + kw / 2, ky + kh * 0.88, C.koraal, 'center', 16);
  text(ctx, 'MELK ↑', x + 60 + kw * 1.5, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaText(ctx, 'GEEN FAMILIE', x + 60 + kw * 1.5, ky + kh * 0.88, C.goud, 'center', 16);
  if (o.streep) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 54, ky + kh - 14); ctx.lineTo(x + 34 + kw, ky + 14); ctx.stroke(); }
  ctx.restore(); }
