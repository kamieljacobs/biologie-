// Zenuwstelsel 7 · Slaap — scènes per alinea (v1.0, 16 okt 2026; v1.1 opgewaardeerd naar prompt v13, 28 okt 2026: bibliotheekobjecten, zie bron/info.md). Bilal en Sam (castboek) halen een nacht door; EEG en slaapcyclus; slaapdruk (adenosine) en biologische klok (melatonine); waarom slapen; vwo: klokgenen.

// ---------- algemene helpers (zoals Gedrag 12) ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function paneel(ctx, x, y, w, h, titel, a = 1, col = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 48, 1, col, 30, 'center', 700); ctx.restore(); }
function fadeIn(q, w, n = 1, d = 0.6) { return q.on(w, n, d); }

// ---------- kleuren van deze film ----------
const ADENO = C.goud, CAF = C.koraal, MELA = '#B6A6E6', KLOK = C.teal, NACHT = '#0E1626';
const NIV = { wakker: '#F2F2EE', rem: C.paars, licht: '#8FB8D8', diep: C.teal };

// ---------- personages: ogen dicht ----------
function ogenDicht(ctx, A, id, frac = 1, kijk = 1) { if (!A || !A.hoofd || frac <= 0.01) return; const P = CAST[id]; const hh = A.hoofd.r / 0.55, fw = hh * 0.86, ax = kijk * hh * 0.03;
  for (const s of [-1, 1]) { const bx = A.hoofd.x + ax + s * fw * 0.2, ey = A.hoofd.y + hh * 0.02; ctx.save(); ctx.beginPath(); ctx.ellipse(bx, ey, fw * 0.12, hh * 0.095, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = P.huid; ctx.fillRect(bx - fw * 0.15, ey - hh * 0.1, fw * 0.3, hh * 0.2 * frac); ctx.restore();
    if (frac > 0.85) { ctx.save(); ctx.strokeStyle = _donker(P.huid, 0.62); ctx.lineWidth = Math.max(2, hh * 0.04); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx - fw * 0.1, ey); ctx.quadraticCurveTo(bx, ey + hh * 0.06, bx + fw * 0.1, ey); ctx.stroke(); ctx.restore(); } } }
// iemand in bed (hoofd links): x,y = hoofdeinde, bovenkant matras
function slaper(ctx, id, x, y, h, o = {}) { const { a = 1, t = 0, dicht = 1, deken = '#4A6FA0', elektroden = 0, outfit = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = (CAST[id].lengte || 1), hh = h * L / 6.1, len = h * L;
  roundRect(ctx, x - 60, y, len + 150, 70, 14); shape(ctx, '#5E4A36', '#3E3024', 2); roundRect(ctx, x - 80, y - 150, 34, 260, 10); shape(ctx, '#6B5338', '#3E3024', 2);
  roundRect(ctx, x - 40, y - 12, len + 100, 26, 10); shape(ctx, '#E6E1D3', '#C9C2B4', 1.5);
  roundRect(ctx, x - 40, y - hh * 1.6, hh * 2.4, hh * 1.5, hh * 0.6); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  const br = Math.sin(t * 1.4) * 0.012; ctx.save(); ctx.translate(x + len + 10, y - hh * 0.98); ctx.rotate(-Math.PI / 2); ctx.scale(1 + br, 1);
  const A = persoon(ctx, id, 0, 0, h, { uit: 'neutraal', t: 0, outfit }); ogenDicht(ctx, A, id, dicht);
  if (elektroden > 0.01 && A.hoofd) { ctx.save(); ctx.globalAlpha *= elektroden; const r = A.hoofd.r; [[-0.7, -0.75], [0, -1.05], [0.7, -0.75], [-0.95, -0.1], [0.95, -0.1]].forEach(([dx, dy]) => { circ(ctx, A.hoofd.x + dx * r, A.hoofd.y + dy * r, r * 0.11, C.goud, '#8A6A20', 2); }); ctx.restore(); }
  ctx.restore();
  ctx.beginPath(); ctx.moveTo(x + hh * 2.1, y - hh * 0.2); ctx.bezierCurveTo(x + hh * 2.4, y - hh * 2.4, x + len * 0.75, y - hh * 2.2, x + len + 60, y - hh * 1.3); ctx.lineTo(x + len + 70, y + 14); ctx.lineTo(x + hh * 2.1, y + 14); ctx.closePath(); shape(ctx, deken, _donker(deken, 0.25), 2);
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + hh * 2.1 + i * len * 0.18, y - hh * (1.9 - i * 0.12)); ctx.lineTo(x + hh * 2.1 + i * len * 0.18, y + 10); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: x + hh * 0.55, y: y - hh * 0.98 }, hh }; }
function zzz(ctx, x, y, t, a = 1) { if (a <= 0.01) return; for (let i = 0; i < 3; i++) { const u = (t * 0.45 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= a * Math.sin(u * Math.PI); text(ctx, 'z', x + u * 60 + i * 6, y - u * 110, fTitel(30 + i * 10), C.text2, 'center'); ctx.restore(); } }
function maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2E6B8'); ctx.fillStyle = NACHT; ctx.beginPath(); ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.9, 0, 6.283); ctx.fill(); ctx.restore(); }
function sterren(ctx, x0, y0, w, h, n, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 2.1); circ(ctx, x0 + hash(i * 5 + 1) * w, y0 + hash(i * 5 + 2) * h, 1.5 + hash(i * 5 + 3) * 1.8, rgba('#F2F2EE', 0.4 + 0.5 * tw)); } ctx.restore(); }
function zonnetje(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }
function digiKlok(ctx, x, y, s2, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 110, y - 56, 220, 84, 14); shape(ctx, '#121820', '#3A4458', 3); text(ctx, s2, x, y + 10, `700 54px ${F.meta}`, col, 'center'); ctx.restore(); }
function controller(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -34, -14, 68, 28, 14); shape(ctx, '#2A2F3E', '#141820', 2); circ(ctx, -16, -2, 5, '#6A7080'); circ(ctx, 18, -4, 4, C.koraal); circ(ctx, 26, 2, 4, C.groen); ctx.restore(); }

// ---------- EEG ----------
function eegGolf(kind, x, t) { const u = x / 100;
  if (kind === 'wakker') return 0.18 * Math.sin(u * 23 + t * 9) + 0.12 * Math.sin(u * 37 + 1.3) + 0.1 * Math.sin(u * 51 + t * 5) + 0.06 * Math.sin(u * 71);
  if (kind === 'licht') return 0.32 * Math.sin(u * 9 + t * 3) + 0.12 * Math.sin(u * 23 + 0.7) + 0.06 * Math.sin(u * 41);
  if (kind === 'diep') return 0.85 * Math.sin(u * 2.6 + t * 1.2) + 0.08 * Math.sin(u * 13);
  return 0.16 * Math.sin(u * 21 + t * 8) + 0.13 * Math.sin(u * 33 + 2.1) + 0.08 * Math.sin(u * 57 + t * 4) + 0.05 * Math.sin(u * 79); }
function eegSpoor(ctx, x, y, w, amp, kind, t, a = 1, col = C.text, grow = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.max(2, Math.floor(w * grow / 3)); for (let i = 0; i <= n; i++) { const px = x + i * 3; const py = y - amp * eegGolf(kind, px, t); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
function monitor(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, '#0B1220', '#4A5878', 3); ctx.strokeStyle = rgba(C.line, 0.12); ctx.lineWidth = 1; for (let gx = x + 40; gx < x + w; gx += 60) { ctx.beginPath(); ctx.moveTo(gx, y + 10); ctx.lineTo(gx, y + h - 10); ctx.stroke(); } ctx.restore(); }
function cellenRij(ctx, x, y, t, sync, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 8; i++) { const ph = sync ? t * 1.4 : t * (2.1 + hash(i) * 2.5) + hash(i + 9) * 6; const on = Math.max(0, Math.sin(ph * 3.14)) ** 6; circ(ctx, x + i * 46, y, 13, rgba(col, 0.25 + 0.75 * on), col, 2); } ctx.restore(); }

// ---------- slaapgrafiek (hypnogram) ----------
const NACHTDATA = [[0, 0.15, 0], [0.15, 0.45, 2], [0.45, 1.1, 3], [1.1, 1.3, 2], [1.3, 1.45, 1], [1.45, 1.7, 2], [1.7, 2.35, 3], [2.35, 2.65, 2], [2.65, 2.95, 1], [2.95, 3.35, 2], [3.35, 3.65, 3], [3.65, 3.95, 2], [3.95, 4.5, 1], [4.5, 4.58, 0], [4.58, 5.15, 2], [5.15, 5.35, 3], [5.35, 5.6, 2], [5.6, 6.3, 1], [6.3, 6.36, 0], [6.36, 6.95, 2], [6.95, 7.8, 1], [7.8, 8, 0]];
function hypnogram(ctx, x, y, w, h, o = {}) { const { a = 1, u = 1, cyc = 0, diepHL = 0, remHL = 0, labels = 1, uren = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rij = h / 3, Y = (lv) => y + [0, 1, 2, 3][lv] * rij, X = (hr) => x + hr / 8 * w;
  const namen = [['wakker', NIV.wakker], ['REM-slaap', NIV.rem], ['lichte slaap', NIV.licht], ['diepe slaap', NIV.diep]];
  if (labels > 0.01) namen.forEach(([n, c], i) => regel(ctx, n, x - 20, Y(i) + 10, labels, c, 26, 'right', 700));
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i)); ctx.lineTo(x + w, Y(i)); ctx.stroke(); }
  if (uren) for (let hr = 0; hr <= 8; hr++) text(ctx, String((23 + hr) % 24) + ':00', X(hr), y + h + 44, fTekst(22, 600), C.text2, 'center');
  const end = 8 * u; ctx.lineWidth = 4; ctx.lineJoin = 'round'; let prev = null;
  for (const [s0, s1, lv] of NACHTDATA) { if (s0 >= end) break; const e = Math.min(s1, end);
    if (lv === 3) { ctx.save(); ctx.fillStyle = rgba(NIV.diep, 0.25 + 0.4 * diepHL * (s0 < 4 ? 1 : 0.3)); ctx.fillRect(X(s0), Y(2), X(e) - X(s0), rij); ctx.restore(); }
    if (lv === 1) { ctx.save(); ctx.fillStyle = rgba(NIV.rem, 0.55 + 0.4 * remHL); roundRect(ctx, X(s0), Y(1) - 9, Math.max(4, X(e) - X(s0)), 18, 6); ctx.fill(); ctx.restore(); }
    ctx.strokeStyle = C.text; ctx.beginPath(); if (prev !== null) { ctx.moveTo(X(s0), Y(prev)); ctx.lineTo(X(s0), Y(lv)); } else ctx.moveTo(X(s0), Y(lv)); ctx.lineTo(X(e), Y(lv)); ctx.stroke(); prev = lv; }
  if (cyc > 0.01) { ctx.save(); ctx.globalAlpha *= cyc; const gr = [0, 1.45, 2.95, 4.5, 6.3, 8]; for (let i = 0; i < 5; i++) { const x0 = X(gr[i]) + 4, x1 = X(gr[i + 1]) - 4; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y - 26); ctx.lineTo(x0, y - 38); ctx.lineTo(x1, y - 38); ctx.lineTo(x1, y - 26); ctx.stroke(); text(ctx, String(i + 1), (x0 + x1) / 2, y - 50, fTekst(26, 800), C.goud, 'center'); } ctx.restore(); }
  ctx.restore(); }

// ---------- moleculen ----------
function ring(ctx, x, y, r, n, rot) { ctx.beginPath(); for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }
function purine(ctx, x, y, r, col) { ring(ctx, x, y, r, 6, Math.PI / 6); shape(ctx, rgba(col, 0.25), col, 2.5); ring(ctx, x + r * 1.45, y, r * 0.85, 5, Math.PI); shape(ctx, rgba(col, 0.25), col, 2.5); }
function adenosine(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); purine(ctx, -10 * s, 0, 12 * s, ADENO); ctx.strokeStyle = ADENO; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(14 * s, 8 * s); ctx.lineTo(20 * s, 20 * s); ctx.stroke(); ring(ctx, 24 * s, 30 * s, 11 * s, 5, -Math.PI / 2); shape(ctx, rgba('#E8D9A8', 0.35), '#E8D9A8', 2.5); ctx.restore(); }
function cafeine(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); purine(ctx, -10 * s, 0, 12 * s, CAF); ctx.strokeStyle = CAF; ctx.lineWidth = 3; [[-10, -12, -10, -24], [-22, 6, -32, 12], [10, 9, 14, 20]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1 * s, b1 * s); ctx.lineTo(a2 * s, b2 * s); ctx.stroke(); circ(ctx, a2 * s, b2 * s, 3.5 * s, CAF); }); ctx.restore(); }
function melatonine(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ring(ctx, -8 * s, 0, 10 * s, 6, Math.PI / 6); shape(ctx, rgba(MELA, 0.3), MELA, 2.5); ring(ctx, 5 * s, 0, 8 * s, 5, 0); shape(ctx, rgba(MELA, 0.3), MELA, 2.5); ctx.strokeStyle = MELA; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(12 * s, -4 * s); ctx.lineTo(20 * s, -12 * s); ctx.lineTo(30 * s, -8 * s); ctx.lineTo(36 * s, -16 * s); ctx.stroke(); ctx.restore(); }
// v1.1 (prompt v13): receptor = membraanReceptor uit de bibliotheek (G-eiwitgekoppelde receptor: zeven helices als
// kralenketen, pasvorm buiten, G-eiwit binnen; de adenosinereceptor A1 is zo'n receptor). bez: 0 leeg, 1 adenosine
// (receptor actief: G-eiwit laat los), 2 cafeïne (past, maar activeert niet). Membraan = membraanBoog (fosfolipiden
// langs de boog); de cel is rond, de receptoren staan loodrecht op het membraan.
function kommetje(ctx, x, y, ang, bez, a = 1, R = 980, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = membraanReceptor(ctx, x, y, 0.9, { ang: ang - Math.PI / 2, R, membraan: false, bind: 0, signaal: bez === 1 ? 0.85 : 0, t });
  const [lx, ly] = r.ligand; if (bez === 1) adenosine(ctx, lx - 4, ly - 2, 0.75, 1, ang); if (bez === 2) cafeine(ctx, lx + 2, ly, 0.75, 1, ang); ctx.restore(); }
function boogMembraan(ctx, cx, cy, r, a0, a1, a = 1, gaten = [], gat = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(0, 0, W, CAPTION_Y - 6); ctx.clip();
  ctx.beginPath(); ctx.arc(cx, cy, r - 20, 0, 6.283); ctx.fillStyle = rgba(C.fill, 0.55); ctx.fill();
  for (let i = 0; i < 14; i++) { const an = a0 + hash(i * 7) * (a1 - a0), d = 70 + hash(i * 7 + 1) * 220; circ(ctx, cx + Math.cos(an) * (r - d), cy + Math.sin(an) * (r - d), 2.5, rgba(C.grain, 0.25)); }
  const dg = gat / r; let van = a0; for (const g of gaten) { if (dg > 0.0005) { membraanBoog(ctx, cx, cy, r, van, g - dg, { s: 0.5, t }); van = g + dg; } } membraanBoog(ctx, cx, cy, r, van, a1, { s: 0.5, t });
  ctx.restore(); }
function meter(ctx, x, y, w, v, col, lab, a = 1, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; regel(ctx, lab, x, y - 14, 1, col, 28, 'left', 700); roundRect(ctx, x, y, w, 40, 12); shape(ctx, '#232C3E', C.line, 1.5); if (v > 0.005) { roundRect(ctx, x, y, Math.max(24, w * clamp(v, 0, 1)), 40, 12); shape(ctx, rgba(col, 0.7), col, 2); } if (sub) regel(ctx, sub, x + w, y - 14, 1, C.text2, 22, 'right', 600); ctx.restore(); }

// ---------- hoofd in profiel (kijkt naar rechts) ----------
// v1.1 (prompt v13): het hoofd is hoofdHersenen uit de bibliotheek (mediane doorsnede: grote en kleine hersenen, hersenbalk,
// thalamus, hersenstam, hypothalamus, hypofyse in het Turkse zadel). Daarbovenop alleen de lagen van deze film. Lokale
// coördinaten = die van hoofdHersenen (oorsprong = hypothalamus), schaal HZK × s. Geen gloed (Part C).
// Plaatsen: SCN (klok) vóór-onder in de hypothalamus, vlak boven de kruising van de oogzenuwen; pijnappelklier achter de
// thalamus, onder het achtereinde van de hersenbalk (Kenhub 'Pineal gland', 'Suprachiasmatic nucleus').
const HZK = 0.8;
const HZP = { scn: [22, 8], kruising: [44, 30], oog: [190, 22], pijnappel: [-66, -12], hypofyse: [8, 74], stam: [-42, 250], hippo: [-30, 40], schors: [-20, -200], schorsLabel: [-238, -160] };
const HZ_GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
const HZ_STAM = [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]];
const HZ_SCHORS = [[-150, -150], [-60, -215], [50, -210], [140, -150], [-180, -60]];
function hoofdZij(ctx, x, y, s, o = {}) { const { a = 1, oog = 1, zenuw = 0, scn = 0, pijnappel = 0, hypofyse = 0, stam = 0, hippo = 0, schors = 0, licht = 0, t = 0, puls = 0 } = o; if (a <= 0.01) return; const k = HZK * s;
  ctx.save(); ctx.globalAlpha *= a;
  hoofdHersenen(ctx, x, y, k, { hyp: hypofyse, hth: scn * 0.5, gloed: 0, t });
  ctx.translate(x, y); ctx.scale(k, k); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (schors > 0.01) { ctx.save(); ctx.beginPath(); bioPad(ctx, HZ_GROOT, true); ctx.fillStyle = rgba(C.teal, 0.22 * schors); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.9 * schors); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (stam > 0.01) { ctx.save(); ctx.beginPath(); bioPad(ctx, HZ_STAM, true); ctx.fillStyle = rgba(C.koraal, 0.55 * stam); ctx.fill(); ctx.strokeStyle = rgba(C.koraal, stam); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (hippo > 0.01) { ctx.save(); ctx.globalAlpha *= hippo; ctx.strokeStyle = C.goud; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(36, 30); ctx.bezierCurveTo(10, 62, -60, 58, -98, -6); ctx.stroke(); ctx.restore(); }
  if (pijnappel > 0.01) { ctx.save(); ctx.globalAlpha *= pijnappel; ctx.beginPath(); ctx.ellipse(HZP.pijnappel[0], HZP.pijnappel[1], 15, 10, -0.5, 0, 6.283); shape(ctx, rgba(MELA, 0.9), '#E6DEFA', 2); ctx.restore(); }
  if (scn > 0.01) { ctx.save(); ctx.globalAlpha *= scn; const [cx, cy] = HZP.scn; circ(ctx, cx, cy, 11, KLOK, '#E6F2F8', 2); ctx.strokeStyle = '#0B1220'; ctx.lineWidth = 2; const an = t * 0.8; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * 8, cy + Math.sin(an) * 8); ctx.stroke(); ctx.restore(); }
  if (oog > 0.01) { ctx.save(); ctx.globalAlpha *= oog; const [ex, ey] = HZP.oog; circ(ctx, ex, ey, 20, '#F2F2EE', '#9AA3B2', 2); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(ex, ey, 17, Math.PI * 0.6, Math.PI * 1.4); ctx.stroke(); circ(ctx, ex + 15, ey, 6, '#2A3446'); ctx.restore(); }
  if (zenuw > 0.01) { ctx.save(); ctx.globalAlpha *= zenuw; const [cx, cy] = HZP.kruising; ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(171, 26); ctx.quadraticCurveTo(105, 40, cx, cy); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 12, cy - 8); ctx.lineTo(cx + 12, cy + 8); ctx.moveTo(cx + 12, cy - 8); ctx.lineTo(cx - 12, cy + 8); ctx.stroke();
    if (puls > 0.01) { const u = (t * 0.9) % 1; const px = (1 - u) * (1 - u) * 171 + 2 * (1 - u) * u * 105 + u * u * cx, py = (1 - u) * (1 - u) * 26 + 2 * (1 - u) * u * 40 + u * u * cy; ctx.globalAlpha *= puls; circ(ctx, px, py, 8, '#FFF2B0'); } ctx.restore(); }
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht; ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = 4; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(400, 10 + i * 40); ctx.lineTo(212, 22 + i * 6); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function HZ(x, y, s, lx, ly) { return [x + lx * HZK * s, y + ly * HZK * s]; } // lokaal punt van hoofdZij → scherm

// ---------- grafieken ----------
function circadiaan(h) { const m = ((h - 4) % 24 + 24) % 24; return m <= 16 ? Math.pow((1 - Math.cos(Math.PI * m / 16)) / 2, 0.6) : (1 + Math.cos(Math.PI * (m - 16) / 8)) / 2; }
function assen(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) metaText(ctx, xl, x + w, y + h + 74, C.text2, 'right', 20); if (yl) metaText(ctx, yl, x, y - 18, C.text2, 'left', 20); }
function grafLijn(ctx, x, y, w, h, f, u, col, lw = 5, dash = null) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const N = 160; for (let i = 0; i <= N * u; i++) { const v = i / N; const px = x + v * w, py = y + h - f(v) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

// ---------- klokcel (vwo) ----------
function klokCel(ctx, x, y, t, o = {}) { const { a = 1, gen = 1, mrna = 0, eiw = 0, rem = 0, afbraak = 0, fase = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, 420, 300, 0.03, 3, t); ctx.fillStyle = rgba(C.fill, 0.5); ctx.fill(); membrane(ctx, x, y, 420, 300, C.er, 0.03, 3, t);
  for (let i = 0; i < 16; i++) { const an = hash(i * 3) * 6.283, d = 160 + hash(i * 3 + 1) * 200; const px = x + Math.cos(an) * d * 0.95, py = y + Math.sin(an) * d * 0.68; if (Math.hypot(px - (x - 150), py - y) < 150) continue; circ(ctx, px, py, 2.4, rgba(C.grain, 0.3)); }
  const kx = x - 150, ky = y; blob(ctx, kx, ky, 140, 130, 0.03, 4, 0); shape(ctx, rgba(C.kern, 0.6), C.kernR, 2); metaText(ctx, 'kern', kx, ky - 92, C.kernR, 'center', 22);
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const px = kx - 100 + i * 5, py = ky + 10 + Math.sin(i * 0.5) * 6; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = rgba(KLOK, 0.4 + 0.6 * gen); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 14; i <= 26; i++) { const px = kx - 100 + i * 5, py = ky + 10 + Math.sin(i * 0.5) * 6; i > 14 ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); regel(ctx, 'klokgen', kx - 15, ky + 60, 1, KLOK, 26, 'center', 700);
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.fillStyle = C.koraal; roundRect(ctx, kx - 40, ky - 14, 54, 40, 10); ctx.fill(); text(ctx, '−', kx - 13, ky + 18, fTekst(40, 800), '#0B1220', 'center'); ctx.restore(); }
  if (mrna > 0.01) { ctx.save(); ctx.globalAlpha *= mrna; for (let k = 0; k < 3; k++) { const u = clamp(mrna * 1.5 - k * 0.25, 0, 1); if (u <= 0.02) continue; mrnaSliert(ctx, kx - 10 + k * 8, ky - 30 - k * 14, 280 * u, { rot: -0.24, t, seed: k + 2, dikte: 2.6 }); } regel(ctx, 'mRNA', kx + 290, ky - 160, 1, C.teal, 24, 'left', 700); ctx.restore(); }
  const nE = Math.round(9 * eiw); for (let k = 0; k < nE; k++) { const u = hash(k * 13 + 2), v = hash(k * 13 + 5); let px = x + 60 + u * 230, py = y - 150 + v * 290; const terug = clamp(rem * 1.3 - k * 0.05, 0, 1); if (k < 4) { px = lerp(px, kx + 40 + k * 18, terug); py = lerp(py, ky - 20 + (k % 2) * 30, terug); } const w = wander(k, t, 6, 0.8); const af = clamp(afbraak * 1.4 - k * 0.06, 0, 1);
    eiwitKluwen(ctx, px + w.x, py + w.y, 1.7 * (1 - af * 0.5), (1 - af) * 0.95, k); }
  if (eiw > 0.01) regel(ctx, 'klokeiwitten', x + 175, y + 190, eiw, C.oker, 24, 'center', 700);
  ctx.restore(); }
function eiwitKluwen(ctx, x, y, s, a, seed) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = 2; const pts = []; for (let i = 0; i < 9; i++) { const an = i * 1.9 + seed; pts.push([x + Math.cos(an) * (6 + i * 1.6) * s, y + Math.sin(an) * (6 + i * 1.4) * s]); } ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); pts.forEach((p, i) => circ(ctx, p[0], p[1], 4.2 * s, i % 3 ? C.oker : lighten(C.oker, 0.3))); ctx.restore(); }
function dagwijzer(ctx, x, y, r, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(C.bgSchema, 0.9), C.line, 2); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, -Math.PI / 2, -Math.PI / 2 + Math.PI); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.18); ctx.fill(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); ctx.fillStyle = rgba('#5A6A9A', 0.3); ctx.fill();
  const an = -Math.PI / 2 + u * 6.283; ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8); ctx.stroke(); text(ctx, '± 24 uur', x, y + r + 42, fTekst(26, 700), C.text2, 'center'); ctx.restore(); }

// ---------- hoofdstuk 3 ----------
// antistof als Y van vier ketens: twee zware (lang, door de stam en de armen) en twee lichte (kort, buiten langs de armen); binden aan de toppen (Part C9).
function antistof(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.groen; ctx.lineWidth = 3.2 * s;
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 2.2 * s, 22 * s); ctx.lineTo(d * 2.2 * s, 0); ctx.lineTo(d * 15 * s, -17 * s); ctx.stroke(); }
  ctx.strokeStyle = lighten(C.groen, 0.35); ctx.lineWidth = 2.6 * s; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 9 * s, -3 * s); ctx.lineTo(d * 20 * s, -15 * s); ctx.stroke(); } ctx.restore(); }
function spuitje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.6); ctx.scale(s, s); roundRect(ctx, -60, -14, 100, 28, 6); shape(ctx, rgba('#F2F2EE', 0.85), '#9AA3B2', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-20, -10, 56, 20); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(80, 0); ctx.moveTo(-60, 0); ctx.lineTo(-84, 0); ctx.moveTo(-84, -16); ctx.lineTo(-84, 16); ctx.stroke(); ctx.restore(); }
function kalender(ctx, x, y, n, a = 1, lab = '6 u') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const cx = x + (i % 7) * 92, cy = y + Math.floor(i / 7) * 92; const on = i < n; roundRect(ctx, cx, cy, 80, 80, 10); shape(ctx, on ? rgba(C.koraal, 0.18) : '#232C3E', on ? C.koraal : C.line, 1.5); text(ctx, on ? lab : '', cx + 40, cy + 50, fTekst(24, 700), C.text, 'center'); } ctx.restore(); }
function glas(ctx, x, y, h, level, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 34, y - h); ctx.lineTo(x - 26, y); ctx.lineTo(x + 26, y); ctx.lineTo(x + 34, y - h); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.stroke(); ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#E0B64A', 0.75); ctx.fillRect(x - 40, y - h * level, 80, h * level); ctx.restore(); if (lab) text(ctx, lab, x, y + 40, fTekst(26, 700), C.text, 'center'); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { ctx.save(); ctx.fillStyle = NACHT; roundRect(ctx, 1120, 120, 740, 700, 30); ctx.fill(); ctx.restore(); sterren(ctx, 1150, 150, 680, 260, 40, t); maan(ctx, 1720, 230, 60);
    slaper(ctx, 'noor', 1230, 650, 460, { t }); zzz(ctx, 1330, 500, t); eegSpoor(ctx, 1170, 760, 640, 40, 'diep', t, 0.8, NIV.diep); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const dag = q.on('zon', 1, 2.5), kapot = q.on('kapot', 1), gaap = q.on('gaapt', 1);
    ctx.save(); ctx.fillStyle = mix2('#141C2E', '#2A3550', dag); ctx.fillRect(0, 0, W, CAPTION_Y); ctx.restore();
    // raam
    roundRect(ctx, 1380, 110, 420, 300, 12); ctx.fillStyle = mix2(NACHT, '#E8A866', dag); ctx.fill(); ctx.save(); ctx.beginPath(); roundRect(ctx, 1380, 110, 420, 300, 12); ctx.clip(); sterren(ctx, 1380, 110, 420, 300, 24, t, 1 - dag); maan(ctx, 1700, 190, 40, 1 - dag); zonnetje(ctx, 1590, 420 - 150 * dag, 46, dag, t); ctx.restore(); ctx.strokeStyle = '#8A7A66'; ctx.lineWidth = 10; ctx.strokeRect(1380, 110, 420, 300); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1590, 110); ctx.lineTo(1590, 410); ctx.stroke();
    digiKlok(ctx, 1000, 200, dag > 0.5 ? '08:00' : '04:00', q.on('vier', 1), dag > 0.5 ? C.goud : C.koraal);
    roundRect(ctx, 200, 560, 1000, 160, 40); shape(ctx, '#3F4E66', '#2C384C', 2);
    const sw = q.on('wakkerder', 1);
    const Bs = persoon(ctx, 'sam', 480, 880, 560, { uit: sw > 0.5 ? 'neutraal' : (gaap > 0.5 ? 'verbaasd' : 'neutraal'), pose: 'vasthouden', t, hold: (c, x, y) => controller(c, x, y, 1.1) });
    const Bb = persoon(ctx, 'bilal', 900, 880, 560, { uit: 'neutraal', pose: 'vasthouden', t, hold: (c, x, y) => controller(c, x, y, 1.1) });
    const slaapB = clamp(q.on('slaap', 1) - sw, 0, 1); ogenDicht(ctx, Bb, 'bilal', slaapB * 0.75); ogenDicht(ctx, Bs, 'sam', gaap * (1 - sw) * 0.45);
    roundRect(ctx, 160, 700, 1080, 190, 30); shape(ctx, '#4A5A74', '#2C384C', 2); roundRect(ctx, 140, 620, 110, 270, 30); shape(ctx, '#52627C', '#2C384C', 2); roundRect(ctx, 1150, 620, 110, 270, 30); shape(ctx, '#52627C', '#2C384C', 2);
    if (slaapB > 0.01) zzz(ctx, 990, 300, t, slaapB);
    meter(ctx, 1380, 560, 420, lerp(0.35, 0.85, kapot) + 0.08 * dag, ADENO, 'hoe lang al wakker?', q.on('kapot', 1), dag > 0.5 ? '24 uur' : '20 uur');
    tag(ctx, 'toch wakkerder?', 1590, 720, C.teal, sw, 'center', 30); vraagteken(ctx, 1590, 860, q.on('denk', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const el = q.on('elektroden', 1); slaper(ctx, 'noor', 150, 760, 430, { t, elektroden: el, dicht: q.on('slaap', 2) });
    regel(ctx, 'EEG: elektrische activiteit van miljoenen zenuwcellen', 140, 150, q.on('EEG', 1), C.text, 32, 'left', 700);
    monitor(ctx, 860, 230, 960, 520, q.on('Onderzoekers', 1));
    const rows = [['wakker', 'wakker', 'snel en klein', NIV.wakker, 'Ben'], ['lichte slaap', 'licht', 'trager', NIV.licht, 'lichte'], ['diepe slaap', 'diep', 'groot en traag', NIV.diep, 'diepe']];
    rows.forEach(([n, k, d, c, w], i) => { const a = q.on(w, 1); const yy = 330 + i * 150; regel(ctx, n, 890, yy - 40, a, c, 28, 'left', 700); regel(ctx, d, 1790, yy - 40, a, C.text2, 24, 'right', 600); eegSpoor(ctx, 890, yy + 20, 900, k === 'diep' ? 52 : 52, k, t, a, c, clamp((t - q.at(w)) / 1.2, 0, 1)); });
    const sy = q.on('tegelijk', 2); if (sy > 0.01) { ctx.save(); ctx.globalAlpha *= sy; regel(ctx, 'wakker: elk iets anders', 890, 800, 1, C.text2, 22, 'left', 700); cellenRij(ctx, 910, 840, t, false, 1, NIV.wakker); regel(ctx, 'diepe slaap: allemaal tegelijk', 1380, 800, 1, NIV.diep, 22, 'left', 700); cellenRij(ctx, 1400, 840, t, true, 1, NIV.diep); ctx.restore(); }
    tag(ctx, 'niet uit: anders', 430, 260, C.goud, q.on('anders', 2), 'center', 30); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('droomt', 1, 0.8), A = 1 - B;
    slaper(ctx, 'noor', 150, 760, 430, { t, elektroden: 1 });
    const ogen = q.on('ogen', 1); if (ogen > 0.01) { ctx.save(); ctx.globalAlpha *= ogen; const ox = 200, oy = 760; const d = Math.sin(t * 7) * 18; pijl(ctx, ox - 10 + d, oy - 120, ox + 50 + d, oy - 120, C.paars, 1, 4, 14); pijl(ctx, ox + 40 - d, oy - 150, ox - 20 - d, oy - 150, C.paars, 1, 4, 14); regel(ctx, 'ogen schieten heen en weer', 120, 560, 1, C.paars, 26, 'left', 700); ctx.restore(); }
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; monitor(ctx, 860, 230, 960, 520, 1);
      regel(ctx, 'wakker', 890, 290, 1, NIV.wakker, 28, 'left', 700); eegSpoor(ctx, 890, 350, 900, 52, 'wakker', t, 0.6, NIV.wakker);
      const r = q.on('REM-slaap', 1); regel(ctx, 'REM-slaap', 890, 490, r, NIV.rem, 28, 'left', 700); eegSpoor(ctx, 890, 550, 900, 52, 'rem', t, r, NIV.rem, clamp((t - q.at('REM-slaap')) / 1.2, 0, 1));
      regel(ctx, 'lijkt bijna op wakker', 1790, 490, q.on('lijkt', 1), C.text2, 24, 'right', 600);
      tag(ctx, 'REM = rapid eye movement: snelle oogbewegingen', 1340, 680, C.paars, q.on('afkorting', 1), 'center', 24); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; ctx.beginPath(); ctx.ellipse(1300, 400, 440, 250, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.92), null); circ(ctx, 900, 640, 22, rgba('#F2F2EE', 0.92)); circ(ctx, 840, 690, 13, rgba('#F2F2EE', 0.92));
      // droom: je rent weg voor een hond (castboek-zijaanzicht 'ren'; de grond schuift mee met gangSnelheid, zodat de steunvoet niet glijdt; de hond draaft met dezelfde grondsnelheid: draf-pas 108 cm)
      ctx.save(); ctx.beginPath(); ctx.ellipse(1300, 400, 436, 246, 0, 0, 6.283); ctx.clip(); const v = gangSnelheid('noor', 300, 'ren'), sx = t * v;
      ctx.strokeStyle = rgba('#7FA06A', 0.8); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(840, 562); ctx.lineTo(1760, 562); ctx.stroke(); for (let k = 0; k < 14; k++) { const gx = 840 + (((k * 71 + sx) % 994) + 994) % 994; ctx.beginPath(); ctx.moveTo(gx, 562); ctx.lineTo(gx - 6, 548); ctx.moveTo(gx + 6, 562); ctx.lineTo(gx + 8, 550); ctx.stroke(); }
      persoon(ctx, 'noor', 1150, 562, 300, { zij: true, kijk: -1, gang: 'ren', t, uit: 'bezorgd' }); hond(ctx, 'herder', 1490, 562, 1.8, { kijk: -1, houding: 'draven', t: ((sx / (108 * 1.8)) % 1 + 1) % 1 }); ctx.restore(); ctx.restore(); }
    regel(ctx, 'droom vooral in de REM-slaap', 1340, 820, q.on('levendigst', 1) * A, NIV.rem, 28, 'center', 700);
    vraagteken(ctx, 1700, 300, q.on('denk', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); slaper(ctx, 'noor', 120, 800, 470, { t, deken: '#3E5A82' });
    hoofdZij(ctx, 1380, 420, 1.15, { stam: q.on('hersenstam', 1), oog: 0.6, t });
    const [sx, sy] = HZ(1380, 420, 1.15, ...HZP.stam); const blok = q.on('remt', 1);
    if (blok > 0.01) { ctx.save(); ctx.globalAlpha *= blok; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(sx, sy - 10); ctx.quadraticCurveTo(sx - 300, sy + 60, 620, 720); ctx.stroke(); ctx.setLineDash([]); kruis(ctx, 900, 724, 22, 1); ctx.restore(); }
    naamBij(ctx, 'hersenstam', 'remt de motorische neuronen', 1420, 640, q.on('hersenstam', 1), 'left', C.koraal);
    tag(ctx, 'armen en benen: slap', 640, 520, C.koraal, q.on('slap', 1), 'center', 28);
    tag(ctx, 'ogen bewegen wel', 330, 420, C.groen, q.on('ogen', 1), 'center', 26); tag(ctx, 'ademhaling gaat door', 680, 420, C.groen, q.on('ademhalingsspieren', 1), 'center', 26);
    chip(ctx, 'je speelt je droom niet na', 640, 610, C.goud, q.on('na', 2), 26);
    const mis = q.on('Misschien', 1); if (mis > 0.01) { ctx.save(); ctx.globalAlpha *= mis; kruis(ctx, 1380, 160, 26, 1); regel(ctx, "'mijn hersenen staan uit'", 1430, 172, 1, C.text2, 28, 'left', 700); ctx.restore(); }
    chip(ctx, 'REM: veel gebieden juist heel actief', 1380, 850, NIV.rem, q.on('actief', 1), 26); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const a0 = q.on('Lichte', 1); regel(ctx, 'één nacht', 300, 170, a0, C.text2, 30, 'left', 700);
    hypnogram(ctx, 360, 290, 1420, 420, { a: a0, u: clamp((t - 0.3) / 6, 0, 1), cyc: q.on('anderhalf', 1), diepHL: q.on('begin', 1), remHL: q.on('ochtend', 1) });
    chip(ctx, 'één slaapcyclus ≈ 1,5 uur', 1300, 170, C.goud, q.on('slaapcyclus', 1), 26); chip(ctx, '4 tot 6 per nacht', 1640, 170, C.goud, q.on('zes', 1), 24);
    tag(ctx, 'begin van de nacht: veel diepe slaap', 700, 830, NIV.diep, q.on('begin', 1), 'center', 26); tag(ctx, 'tegen de ochtend: langere REM', 1420, 830, NIV.rem, q.on('ochtend', 1), 'center', 26); },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const cx = 760, cy = 1500, R = 980; const slaap = q.on('slaapt', 1, 1.2), caf = q.on('Cafeïne', 1, 0.8), fb = q.on('slaapdruk', 3, 0.8);
    tag(ctx, 'twee systemen bepalen wanneer je moe wordt', 960, 110, C.text2, q.on('Wanneer', 1) * (1 - q.on('eerste', 1)), 'center', 30); regel(ctx, 'systeem 1: slaapdruk', 140, 150, q.on('eerste', 1), ADENO, 36, 'left', 700); regel(ctx, "zie de film 'Knoeien met de synaps'", 140, 196, q.on('Knoeien', 1), C.text2, 24, 'left', 600);
    const angs = [1.32, 1.42, 1.52, 1.62, 1.72].map(k => k * Math.PI); boogMembraan(ctx, cx, cy, R, Math.PI * 1.18, Math.PI * 1.82, q.on('hersencellen', 1), angs, 56 * q.on('receptor', 1), t); naamBij(ctx, 'zenuwcel', null, 330, 760, q.on('hersencellen', 1), 'left', C.text2);
    const vol = q.on('stapelt', 1, 3) * (1 - slaap) + (1 - caf) * 0; const nA = Math.round(26 * clamp(q.on('stapelt', 1, 4) - slaap * 0.85 + caf * 0.6, 0, 1));
    angs.forEach((an, i) => { const px = cx + Math.cos(an) * R, py = cy + Math.sin(an) * R; let bez = 0; if (caf > 0.5 && i !== 2) bez = 2; else if (q.on('past', 1) > 0.5 && i < Math.round(1 + 4 * clamp(q.on('langer', 1, 2) - slaap, 0, 1)) && slaap < 0.6) bez = 1; else if (caf > 0.5 && i === 2) bez = 1; kommetje(ctx, px, py, an + Math.PI / 2, bez, q.on('receptor', 1), R, t); });
    for (let k = 0; k < nA; k++) { const u = hash(k * 11 + 3), v = hash(k * 11 + 7); const w = wander(k, t, 14, 0.6); adenosine(ctx, 260 + u * 1000 + w.x, 300 + v * 230 + w.y, 1, q.on('adenosine', 1), hash(k) * 6); }
    if (caf > 0.01) for (let k = 0; k < 7; k++) { const w = wander(k + 40, t, 14, 0.7); cafeine(ctx, 300 + hash(k * 5 + 1) * 900 + w.x, 330 + hash(k * 5 + 2) * 180 + w.y, 1, caf, hash(k + 3) * 6); }
    const druk = clamp(q.on('stapelt', 1, 4) * 0.5 + q.on('langer', 1, 2) * 0.4 - slaap * 0.85 + caf * 0.6, 0.05, 1);
    meter(ctx, 1380, 330, 420, druk, ADENO, 'slaapdruk', q.on('slaapdruk', 1));
    regel(ctx, slaap > 0.5 && caf < 0.5 ? 'slapen: adenosine opgeruimd' : 'wakker: adenosine stapelt op', 1380, 430, q.on('stapelt', 1), slaap > 0.5 && caf < 0.5 ? C.teal : ADENO, 24, 'left', 700);
    naamBij(ctx, 'adenosine', 'remt zenuwcellen', 1380, 520, q.on('Adenosine', 1) * (1 - caf), 'left', ADENO);
    const kr = q.on('terugkoppeling', 1); if (kr > 0.01 && caf < 0.99) { ctx.save(); ctx.globalAlpha *= kr * (1 - caf); const kx = 1590, ky = 640; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(kx, ky, 190, 100, 0, 0, 6.283); ctx.stroke(); tag(ctx, 'hoge slaapdruk', kx, ky - 88, ADENO, 1, 'center', 22); tag(ctx, 'slaap', kx + 190, ky + 10, C.teal, 1, 'center', 22); tag(ctx, 'slaapdruk omlaag', kx, ky + 126, C.teal, 1, 'center', 22); regel(ctx, 'negatieve terugkoppeling', kx, ky + 14, 1, C.goud, 24, 'center', 700); ctx.restore(); }
    if (caf > 0.01) { ctx.save(); ctx.globalAlpha *= caf; naamBij(ctx, 'cafeïne', 'past, maar remt niet: blokkeert', 1380, 540, 1, 'left', CAF); tag(ctx, 'adenosine is er nog steeds', 1590, 700, ADENO, q.on('steeds', 1), 'center', 26); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 500, S = 1.3;
    regel(ctx, 'systeem 2: de biologische klok', 140, 150, q.on('tweede', 1), KLOK, 36, 'left', 700);
    hoofdZij(ctx, X, Y, S, { scn: q.on('hypothalamus', 1), zenuw: q.on('kruisen', 1), oog: 1, t, licht: q.on('licht', 2), puls: q.on('signaal', 1) });
    const [hx, hy] = HZ(X, Y, S, ...HZP.scn); naamBij(ctx, 'hypothalamus', 'met de biologische klok', hx + 100 * HZK * S, hy + 70 * HZK * S, q.on('hypothalamus', 1), 'left', KLOK);
    const [kx, ky] = HZ(X, Y, S, ...HZP.kruising); naamBij(ctx, 'oogzenuwen kruisen', null, kx + 30 * HZK * S, ky + 125 * HZK * S, q.on('kruisen', 1), 'left', C.goud);
    const [ox, oy] = HZ(X, Y, S, ...HZP.oog); naamBij(ctx, 'netvlies', 'lichtgevoelige cellen', ox + 40 * HZK * S, oy - 105 * HZK * S, q.on('netvlies', 1), 'left', C.koraal);
    dagwijzer(ctx, 1560, 360, 150, (t * 0.12) % 1, q.on('vierentwintig', 1)); tag(ctx, 'circadiaans ritme', 1560, 620, KLOK, q.on('circadiaans', 1), 'center', 28);
    chip(ctx, 'zonder daglicht: loopt uit de pas', 1560, 710, C.text2, q.on('pas', 1), 24); tag(ctx, 'licht zet de klok gelijk', 1560, 800, C.goud, q.on('gelijk', 1), 'center', 28);
    zonnetje(ctx, 1260, 260, 34, q.on('licht', 2), t); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const X = 520, Y = 470, S = 1.4; const donker = q.on('donker', 1, 1.2);
    ctx.save(); ctx.fillStyle = rgba(NACHT, 0.6 * donker); ctx.fillRect(0, 0, W, CAPTION_Y); ctx.restore();
    hoofdZij(ctx, X, Y, S, { scn: 1, zenuw: 0.6, oog: 1, t, pijnappel: q.on('pijnappelklier', 1) });
    const [px, py] = HZ(X, Y, S, ...HZP.pijnappel); naamBij(ctx, 'pijnappelklier', null, px - 30, py - 50, q.on('pijnappelklier', 1), 'center', MELA);
    const [kx, ky] = HZ(X, Y, S, ...HZP.scn); naamBij(ctx, 'klok', null, kx + 40, ky - 20, 1, 'left', KLOK);
    const mel = q.on('melatonine', 1); if (mel > 0.01) { // nacontrole 29 okt 2026: melatonine komt zichtbaar uit de pijnappelklier (gloed + wolkje) en zakt achter de hersenstam naar het bloed; klein molecuul (s 0,75)
      const gl = mel * (0.55 + 0.3 * Math.sin(t * 3)); ctx.save(); ctx.globalAlpha *= gl; const rg = ctx.createRadialGradient(px, py, 4, px, py, 46); rg.addColorStop(0, rgba(MELA, 0.85)); rg.addColorStop(1, rgba(MELA, 0)); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(px, py, 46, 0, 6.283); ctx.fill(); ctx.restore();
      for (let k = 0; k < 12; k++) { const u = ((t * 0.12 + hash(k * 3)) % 1); const sp = (hash(k * 7) - 0.5); const mx = px + sp * 50 * Math.min(1, u * 5) - u * 20 + Math.sin(k + t) * 10 * u, my = py + 8 + u * (250 + k * 6); melatonine(ctx, mx, my, 0.75, mel * Math.min(1, u / 0.05) * Math.pow(1 - u, 0.5) * (1 - 0.4 * q.on('scherm', 1)), k); } }
    // dagcurve melatonine
    const gx = 1080, gy = 260, gw = 720, gh = 300, ga = q.on('vertelt', 1); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga; regel(ctx, 'melatonine in je bloed', gx, gy - 30, 1, MELA, 28, 'left', 700);
      ctx.fillStyle = rgba('#5A6A9A', 0.25); ctx.fillRect(gx + gw * (10 / 24), gy, gw * (8 / 24), gh); assen(ctx, gx, gy, gw, gh, '', '');
      [['12:00', 0], ['18:00', 6], ['24:00', 12], ['06:00', 18], ['12:00', 24]].forEach(([s2, h]) => text(ctx, s2, gx + gw * h / 24, gy + gh + 36, fTekst(22, 600), C.text2, 'center'));
      const mf = (sh) => (v) => { const h = v * 24 + 12; const c = 0.05 + 0.85 * Math.exp(-(((h - 27 - sh) / 3.2) ** 2)); return c; };
      grafLijn(ctx, gx, gy, gw, gh, mf(0), 1, MELA, 5); const pub = q.on('puberteit', 1); if (pub > 0.01) { ctx.save(); ctx.globalAlpha *= pub; grafLijn(ctx, gx, gy, gw, gh, mf(1.5), 1, C.goud, 4, [12, 8]); ctx.restore(); }
      ctx.restore(); }
    tag(ctx, "'het is nacht'", 1440, 650, MELA, q.on('nacht', 1), 'center', 30);
    chip(ctx, "fel licht 's avonds (ook een scherm): iets minder melatonine", 1440, 740, C.text2, q.on('scherm', 1), 22);
    tag(ctx, 'puberteit: 1 à 2 uur later moe', 1440, 840, C.goud, q.on('puberteit', 1), 'center', 26); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const gx = 160, gy = 220, gw = 1060, gh = 460; const H0 = 8, span = 30;
    regel(ctx, 'wakker vanaf 08:00', gx, 150, q.on('Bilal', 1), C.text, 30, 'left', 700); assen(ctx, gx, gy, gw, gh, 'tijd', '');
    for (let h = 0; h <= span; h += 4) text(ctx, String((H0 + h) % 24).padStart(2, '0') + ':00', gx + gw * h / span, gy + gh + 36, fTekst(22, 600), C.text2, 'center');
    ctx.fillStyle = rgba('#5A6A9A', 0.2); ctx.fillRect(gx + gw * (14 / span), gy, gw * (10 / span), gh);
    const S = (v) => 0.12 + 0.8 * (1 - Math.exp(-(v * span) / 16)); const Cc = (v) => 0.05 + 0.5 * circadiaan(H0 + v * span);
    grafLijn(ctx, gx, gy, gw, gh, S, clamp(q.on('slaapdruk', 1, 2.5), 0, 1), ADENO, 6); regel(ctx, 'slaapdruk', gx + gw - 10, gy + gh - S(1) * gh - 18, q.on('slaapdruk', 1), ADENO, 26, 'left', 700);
    grafLijn(ctx, gx, gy, gw, gh, Cc, clamp(q.on('klok', 1, 2.5), 0, 1), KLOK, 6); regel(ctx, 'wekker-signaal van de klok', gx + gw - 10, gy + gh - Cc(1) * gh + 40, q.on('klok', 1), KLOK, 26, 'right', 700);
    const m4 = q.on('diepste', 1), m8 = q.on('acht', 3); [[20, m4, '04:00', C.koraal], [24, m8, '08:00', C.goud]].forEach(([h, a, lab, col]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = gx + gw * h / span; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(px, gy - 10); ctx.lineTo(px, gy + gh); ctx.stroke(); ctx.setLineDash([]); text(ctx, lab, px, gy - 20, fTekst(26, 800), col, 'center'); ctx.restore(); });
    const v4 = 20 / span, v8 = 24 / span; meter(ctx, 1400, 360, 420, (S(v4) - Cc(v4)) * 1.2, C.koraal, '04:00 slaperig', m4, 'dubbel'); meter(ctx, 1400, 500, 420, (S(v8) - Cc(v8)) * 1.2, C.goud, '08:00 slaperig', m8);
    chip(ctx, 'licht = signaal voor de klok, geen energie', 760, 760, C.text2, q.on('energie', 1), 24);
    const mis = q.on('Misschien', 1); if (mis > 0.01) { ctx.save(); ctx.globalAlpha *= mis; kruis(ctx, 1420, 640, 20, 1); regel(ctx, 'adenosine vanzelf weg?', 1460, 652, 1, C.text2, 26, 'left', 700); ctx.restore(); }
    tag(ctx, "'s middags: instorten", 1640, 760, C.koraal, q.on('storten', 1), 'center', 28); },

  s13(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'de klok in een zenuwcel', 140, 150, q.on('bijhouden', 1), KLOK, 34, 'left', 700);
    const T = q.at('afgelezen'), u = clamp((t - T) / 22, 0, 1); const mrna = q.on('afgelezen', 1, 2) * (1 - q.on('remmen', 1, 1.5) * 0.85) + q.on('opnieuw', 1, 1.5) * 0.9; const eiw = clamp(q.on('klokeiwitten', 1, 3) - q.on('afgebroken', 1, 3) * 0.9 + q.on('opnieuw', 1, 2) * 0.3, 0, 1);
    klokCel(ctx, 800, 520, t, { a: 1, gen: 1 - q.on('remmen', 1) * 0.6 + q.on('weg', 1) * 0.6, mrna: clamp(mrna, 0, 1), eiw, rem: q.on('kern', 1) * (1 - q.on('weg', 1)), afbraak: q.on('afgebroken', 1, 2) * (1 - q.on('opnieuw', 1)) });
    dagwijzer(ctx, 1600, 330, 130, ((t - T) / 24 + 1) % 1, q.on('etmaal', 1));
    tag(ctx, 'het product remt zijn eigen aanmaak', 1560, 640, C.goud, q.on('product', 1), 'center', 24); regel(ctx, 'negatieve terugkoppeling', 1560, 580, q.on('terugkoppeling', 1), C.goud, 28, 'center', 700);
    chip(ctx, 'Nobelprijs 2017', 1560, 760, C.text2, q.on('Nobelprijs', 1), 26); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const X = 700, Y = 470, S = 1.5; regel(ctx, '1 · geheugen', 140, 150, q.on('geheugen', 1), C.goud, 36, 'left', 700); regel(ctx, "zie de film 'Leren en onthouden'", 140, 196, q.on('Leren', 1), C.text2, 24, 'left', 600);
    const rp = q.on('speelt', 1); hoofdZij(ctx, X, Y, S, { oog: 0.4, hippo: q.on('hippocampus', 1), schors: q.on('hersenschors', 1) * 0.6, t });
    const [hx, hy] = HZ(X, Y, S, ...HZP.hippo); naamBij(ctx, 'hippocampus', null, hx, hy + 80, q.on('hippocampus', 1), 'center', C.goud); const [sx, sy] = HZ(X, Y, S, ...HZP.schors); const [slx, sly] = HZ(X, Y, S, ...HZP.schorsLabel); naamBij(ctx, 'hersenschors', null, slx, sly, q.on('hersenschors', 1), 'right', C.teal);
    if (rp > 0.01) { ctx.save(); ctx.globalAlpha *= rp; HZ_SCHORS.forEach(([lx, ly], i) => { const [ax, ay] = HZ(X, Y, S, ...HZP.hippo), [bx, by] = HZ(X, Y, S, lx, ly); const u = ((t * 0.6 + i * 0.2) % 1); ctx.strokeStyle = rgba(C.goud, 0.5); ctx.lineWidth = 3; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]); circ(ctx, lerp(ax, bx, u), lerp(ay, by, u), 8, '#FFF2B0'); circ(ctx, bx, by, 10, rgba(C.teal, 0.8), C.goud, 2); }); ctx.restore(); }
    tag(ctx, 'de dag wordt opnieuw afgespeeld', 1450, 330, C.goud, rp, 'center', 28); tag(ctx, 'verbindingen in de schors vastgelegd', 1450, 450, C.teal, q.on('vastgelegd', 1), 'center', 28);
    tag(ctx, 'goed slapen na het leren: meer onthouden', 1450, 600, C.groen, q.on('onthoudt', 1), 'center', 26); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const pw = 540, gap = 50, x0 = (W - 3 * pw - 2 * gap) / 2, y0 = 200, ph = 600;
    const panel = (i, titel, col, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); paneel(ctx, x, y0, pw, ph, titel, 1, col); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 70, pw, ph - 70); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, '2 · opruimen', C.teal, q.on('opruimen', 1), (x) => { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { blob(ctx, x + 110 + i * 160, y0 + 160 + j * 120, 62, 46, 0.06, i * 3 + j, 0); shape(ctx, rgba('#8FA0B5', 0.2), '#8FA0B5', 1.5); }
      const fl = q.on('vloeistof', 1); for (let k = 0; k < 26; k++) { const u = ((t * 0.25 + hash(k)) % 1); const lane = k % 4; const px = x + 20 + u * (pw - 40), py = y0 + 220 + lane * 120 - 60 + Math.sin(u * 9 + k) * 8; circ(ctx, px, py, 5, rgba(C.teal, 0.8 * fl)); if (k % 3 === 0) { ctx.save(); ctx.globalAlpha *= q.on('afvalstoffen', 1) * fl; ctx.fillStyle = C.oker; ctx.fillRect(px + 8, py - 4, 8, 8); ctx.restore(); } }
      muis(ctx, x + 410, y0 + 520, 11, { kijk: -1, a: q.on('muizen', 1) }); regel(ctx, 'vooral bij muizen onderzocht', x + pw / 2, y0 + 580, q.on('muizen', 1), C.text2, 22, 'center', 700); });
    panel(1, '3 · herstel', C.oker, q.on('herstel', 1), (x) => { hoofdZij(ctx, x + 230, y0 + 300, 0.75, { hypofyse: q.on('hypofyse', 1), oog: 0.4 }); const [hx, hy] = HZ(x + 230, y0 + 300, 0.75, ...HZP.hypofyse); naamBij(ctx, 'hypofyse', null, hx + 30, hy + 10, q.on('hypofyse', 1), 'left', C.oker);
      const g = q.on('groeihormoon', 1); for (let k = 0; k < 8; k++) { const u = ((t * 0.3 + hash(k * 7)) % 1); hormoonVorm(ctx, hx + 20 + u * 160, hy + 30 + u * 140 + Math.sin(k) * 20, 9, 'groei', g * Math.sin(u * Math.PI)); } regel(ctx, 'groeihormoon', x + pw / 2, y0 + 520, g, C.oker, 28, 'center', 700); regel(ctx, 'groei en herstel', x + pw / 2, y0 + 566, q.on('groei', 2), C.text2, 24, 'center', 600); });
    panel(2, '4 · afweer', C.groen, q.on('afweer', 1), (x) => { spuitje(ctx, x + 160, y0 + 230, 1.2, q.on('vaccinatie', 1)); const goed = 14, weinig = 6, v = q.on('antistoffen', 1);
      regel(ctx, 'goed geslapen', x + 150, y0 + 360, v, C.text, 22, 'center', 700); regel(ctx, 'te weinig', x + 400, y0 + 360, v, C.koraal, 22, 'center', 700);
      for (let k = 0; k < goed; k++) antistof(ctx, x + 70 + (k % 4) * 52, y0 + 410 + Math.floor(k / 4) * 50, 1, v); for (let k = 0; k < weinig; k++) antistof(ctx, x + 340 + (k % 3) * 56, y0 + 410 + Math.floor(k / 3) * 50, 1, v); regel(ctx, 'minder antistoffen', x + pw / 2, y0 + 580, v, C.koraal, 24, 'center', 700); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'hoeveel slaap?', 140, 150, q.on('Hoeveel', 1), C.text, 36, 'left', 700);
    const a = q.on('tiener', 1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; regel(ctx, 'tiener: 8 tot 10 uur per nacht', 140, 250, 1, C.groen, 32, 'left', 700); for (let h = 0; h < 10; h++) { roundRect(ctx, 140 + h * 76, 290, 66, 60, 10); shape(ctx, h < 8 ? rgba(C.groen, 0.6) : rgba(C.groen, 0.25), C.groen, 1.5); text(ctx, String(h + 1), 173 + h * 76, 330, fTekst(24, 700), C.text, 'center'); } ctx.restore(); }
    const b = q.on('Stel', 1); regel(ctx, 'twee weken lang: 6 uur per nacht', 140, 470, b, C.koraal, 32, 'left', 700); kalender(ctx, 140, 510, Math.round(14 * clamp((t - q.at('Stel')) / 2.5, 0, 1)), b, '6 u');
    persoon(ctx, 'sam', 1500, 860, 560, { uit: 'denkt', pose: 'denk', t, kijk: -1, a: b }); vraagteken(ctx, 1700, 360, q.on('denk', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const gx = 200, gy = 230, gw = 1000, gh = 460; regel(ctx, 'twee weken lang 6 uur per nacht (volwassenen)', gx, 160, q.on('onderzoek', 1), C.text, 30, 'left', 700);
    assen(ctx, gx, gy, gw, gh, 'dagen', ''); for (let d = 0; d <= 14; d += 2) text(ctx, String(d), gx + gw * d / 14, gy + gh + 36, fTekst(22, 600), C.text2, 'center');
    const nacht = q.on('nacht', 1); if (nacht > 0.01) { ctx.save(); ctx.globalAlpha *= nacht; ctx.strokeStyle = C.text2; ctx.setLineDash([10, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.18); ctx.lineTo(gx + gw, gy + gh * 0.18); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'na een hele nacht zonder slaap', gx + 16, gy + gh * 0.18 - 14, 1, C.text2, 22, 'left', 700); ctx.restore(); }
    grafLijn(ctx, gx, gy, gw, gh, (v) => 0.12 + 0.22 * (1 - Math.exp(-v * 6)), clamp(q.on('voelden', 1, 2), 0, 1), C.teal, 6); regel(ctx, 'hoe slaperig ze zich voelden', gx + gw + 16, gy + gh - 0.34 * gh + 8, q.on('voelden', 1), C.teal, 24, 'left', 700);
    grafLijn(ctx, gx, gy, gw, gh, (v) => 0.12 + 0.7 * v, clamp(q.on('reactietijd', 1, 2.5), 0, 1), C.koraal, 6); regel(ctx, 'trager reageren', gx + gw + 16, gy + gh - 0.82 * gh + 8, q.on('reactietijd', 1), C.koraal, 24, 'left', 700);
    tag(ctx, 'je went er niet aan: je merkt het minder', 760, 790, C.goud, q.on('went', 1), 'center', 28); chip(ctx, 'uitslapen in het weekend: haalt niet alles in', 1500, 880 - 40, C.text2, q.on('Uitslapen', 1), 22); },

  s19(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'gevolgen van te weinig slaap', 140, 150, q.on('gevolgen', 1), C.text, 36, 'left', 700);
    [['concentratie ↓', 'concentratie', C.koraal], ['humeur ↓', 'humeur', C.koraal], ['sneller ziek', 'ziek', C.koraal]].forEach(([s2, w, c], i) => tag(ctx, s2, 300 + i * 340, 250, c, q.on(w, 1), 'center', 28));
    const al = q.on('achttien', 1); if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; regel(ctx, '± 18 uur wakker', 300, 380, 1, C.text, 28, 'center', 700); text(ctx, '≈', 450, 480, fTitel(60), C.text2, 'center'); glas(ctx, 560, 560, 140, 0.4, 1, '0,5 promille'); ctx.restore(); }
    const bs = q.on('Bilal', 1); if (bs > 0.01) { ctx.save(); ctx.globalAlpha *= bs; regel(ctx, '24 uur wakker', 900, 380, 1, C.text, 28, 'center', 700); text(ctx, '≈', 1030, 480, fTitel(60), C.text2, 'center'); glas(ctx, 1140, 560, 140, 0.8, 1, '1 promille'); persoon(ctx, 'bilal', 780, 860, 300, { uit: 'bezorgd', t }); persoon(ctx, 'sam', 1000, 860, 300, { uit: 'bezorgd', t }); ctx.restore(); }
    const vk = q.on('verkeer', 1); if (vk > 0.01) { ctx.save(); ctx.globalAlpha *= vk; roundRect(ctx, 1340, 360, 480, 440, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); ctx.fillStyle = '#3A4458'; ctx.fillRect(1360, 640, 440, 90); ctx.strokeStyle = '#F2F2EE'; ctx.setLineDash([30, 20]); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1360, 685); ctx.lineTo(1800, 685); ctx.stroke(); ctx.setLineDash([]);
      const cx2 = 1420 + ((t * 60) % 300); roundRect(ctx, cx2, 600, 130, 50, 14); shape(ctx, C.koraal, '#9A4A3A', 2); circ(ctx, cx2 + 30, 655, 14, '#1A1A1A'); circ(ctx, cx2 + 100, 655, 14, '#1A1A1A'); regel(ctx, 'een paar seconden slapen', 1580, 440, q.on('seconden', 1), C.text, 26, 'center', 700); tag(ctx, 'microslaap', 1580, 540, C.koraal, q.on('microslaap', 1), 'center', 32); ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 200, ph = 560;
    const panel = (i, titel, col, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); paneel(ctx, x, y0, pw, ph, titel, 1, col); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 70, pw, ph - 70); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'slaapcycli', NIV.rem, q.on('cycli', 1), (x) => { hypnogram(ctx, x + 30, y0 + 140, pw - 60, 240, { labels: 0, cyc: 1, uren: 0 }); regel(ctx, '± 1,5 uur per cyclus', x + pw / 2, y0 + 470, 1, C.text2, 24, 'center', 700); regel(ctx, 'REM: dromen, spieren slap', x + pw / 2, y0 + 516, q.on('spieren', 1), NIV.rem, 22, 'center', 700); });
    panel(1, 'slaapdruk', ADENO, q.on('slaapdruk', 1), (x) => { for (let k = 0; k < 10; k++) adenosine(ctx, x + 80 + (k % 4) * 80, y0 + 170 + Math.floor(k / 4) * 90, 1.1, 1, k); regel(ctx, 'adenosine', x + pw / 2, y0 + 470, 1, ADENO, 26, 'center', 700); });
    panel(2, 'biologische klok', KLOK, q.on('klok', 1), (x) => { dagwijzer(ctx, x + pw / 2, y0 + 240, 110, (t * 0.1) % 1, 1); melatonine(ctx, x + pw / 2 - 40, y0 + 470, 1.2, q.on('melatonine', 1)); regel(ctx, "licht · 's avonds melatonine", x + pw / 2, y0 + 520, q.on('melatonine', 1), MELA, 22, 'center', 700); });
    panel(3, 'waarom slapen?', C.groen, q.on('geheugen', 1), (x) => { ['geheugen', 'opruimen', 'herstel', 'afweer'].forEach((s2, i) => tag(ctx, s2, x + pw / 2, y0 + 170 + i * 80, C.groen, q.on(s2, 1), 'center', 26)); regel(ctx, 'te weinig: je merkt het minder', x + pw / 2, y0 + 516, q.on('minder', 1), C.koraal, 22, 'center', 700); }); },
};
function mix2(h1, h2, u) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, u))); return `rgb(${c[0]},${c[1]},${c[2]})`; }
