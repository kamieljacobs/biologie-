// ===== Celorganellen 2.0 — hulpjes en nieuwe objecten van deze film (30 okt 2026) =====
// Eén alvleeskliercel (celDier uit de beeldbank) is de wereld van de film. Ontwerpcoördinaten van celDier (Ø ± 910 × 850 bij
// s = 1, midden = 0, 0) zijn de wereldcoördinaten; de camera zet een wereldpunt F op een schermplek met zoom Z (C8: doorlopende
// zoom in plaats van losse schema's). Labels staan altijd in schermcoördinaten (vaste lettermaat).

const CEL_S0 = 0.92;                                   // celDier-schaal bij zoom 1 (cel ± 840 × 780 px)
const CEL = { K: [-150, -10], Kr: 165, golgi: [205, -40], RX: 455, RY: 425 };
// straal van het celmembraan per hoek (zelfde formule als binnen celDier)
function celR(f) { const c = Math.cos(f), sn = Math.sin(f); return 1 / Math.sqrt(c * c / (CEL.RX * CEL.RX) + sn * sn / (CEL.RY * CEL.RY)) * (1 + 0.009 * Math.sin(4 * f + 1) + 0.006 * Math.sin(7 * f + 2)); }
function celPunt(f, d = 0) { const r = celR(f) - d; return [Math.cos(f) * r, Math.sin(f) * r]; }
// kernporiën van kernEnvelopPorie (14 stuks, zelfde formule): hoek per porie
const PORIE = Array.from({ length: 14 }, (_, i) => 0.31 + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / 14 * 6.283);
function poriePunt(i, d = 0) { const f = PORIE[i], r = CEL.Kr + d; return [CEL.K[0] + Math.cos(f) * r, CEL.K[1] + Math.sin(f) * r]; }
// punt op het ruw ER rond de kern: blad k (0 = binnenste, 3 = buitenste), hoek f, d = afstand vanaf het midden van het blad
function erPunt(k, f, d = 0) { const r = CEL.Kr + 18 + k * 25 + d; return [CEL.K[0] + Math.cos(f) * r, CEL.K[1] + Math.sin(f) * r]; }

// ---- camera ----
function zicht(F, Z, sx = 960, sy = 450) { const s = CEL_S0 * Z; const X = sx - F[0] * s, Y = sy - F[1] * s;
  return { X, Y, s, Z, P: (p) => [X + p[0] * s, Y + p[1] * s], terug: (q) => [(q[0] - X) / s, (q[1] - Y) / s] }; }
// keys: [t0, t1, Fx, Fy, Z, sx?, sy?] — beweeg tussen t0 en t1 naar dit doel (zoom logaritmisch, ease in en uit)
function camPad(t, keys) { let F = [keys[0][2], keys[0][3]], Z = keys[0][4], sx = keys[0][5] ?? 960, sy = keys[0][6] ?? 450;
  for (let i = 1; i < keys.length; i++) { const k = keys[i]; const u = ease((t - k[0]) / Math.max(0.01, k[1] - k[0])); if (u <= 0) break;
    F = [lerp(F[0], k[2], u), lerp(F[1], k[3], u)]; Z = Math.exp(lerp(Math.log(Z), Math.log(k[4]), u)); sx = lerp(sx, k[5] ?? sx, u); sy = lerp(sy, k[6] ?? sy, u); }
  return zicht(F, Z, sx, sy); }

// ---- de cel met nadruk die vloeiend overvloeit (celDier kent alleen aan/uit) ----
// lagen = [[nadruk, sterkte 0..1], ...]; eerst de volle cel, dan per laag de gedimde versie eroverheen.
function celMet(ctx, V, t, lagen = [], o = {}) { const ank = celDier(ctx, V.X, V.Y, V.s, Object.assign({ t }, o));
  for (const [n, k] of lagen) if (k > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, k); celDier(ctx, V.X, V.Y, V.s, Object.assign({ t, nadruk: n }, o)); ctx.restore(); }
  return ank; }
// nadruk volgens de stem: lijst [naam, tAan, tUit]; geeft lagen terug voor celMet
function nadrukLagen(t, lijst, d = 0.5) { return lijst.map(([n, a, b]) => [n, ramp(t, a, d) * (1 - ramp(t, b ?? 1e9, d))]); }

// ---- exocytose / endocytose op het membraan van de echte cel ----
// celDier tekent (met exo:false) een dicht membraan; op de plek van de fusie wissen we een smal stuk en tekent blaasjeVersmelt
// daar het membraan met de Ω-vorm (zelfde rFn, dikte en rv als in celDier, dus het sluit naadloos aan).
function wisMembraan(ctx, V, hoek, U) { const s = V.s; const d0 = U / celR(hoek); ctx.save(); ctx.translate(V.X, V.Y); ctx.scale(s, s);
  const sector = (r0, r1, col) => { ctx.beginPath(); const N = 24; for (let i = 0; i <= N; i++) { const f = hoek - d0 + 2 * d0 * i / N; ctx.lineTo(Math.cos(f) * (celR(f) + r1), Math.sin(f) * (celR(f) + r1)); }
    for (let i = N; i >= 0; i--) { const f = hoek - d0 + 2 * d0 * i / N; ctx.lineTo(Math.cos(f) * (celR(f) + r0), Math.sin(f) * (celR(f) + r0)); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
  sector(-9, 0.2, '#26324A'); sector(0, 9, C.bgMicro); ctx.restore(); }
function fusieOpCel(ctx, V, hoek, f, t, o = {}) { const rv = o.rv ?? 28, U = rv * 3.4; wisMembraan(ctx, V, hoek, U);
  return blaasjeVersmelt(ctx, 0, 0, V.s, Object.assign({ cx: V.X, cy: V.Y, hoek, rFn: celR, rv, dikte: 6, f, t, cytoplasma: false }, o)); }

// ---- gevolgd molecuul en blaasjes ----
function goudRing(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function heldDeeltje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, C.oker, C.goud, Math.max(1.2, r * 0.35)); ctx.restore(); }
// blaasje zoals in celDier (ER-blaasje: lumenkleur; golgiblaasje: blaasjeskleur), met het gevolgde eiwit erin
function blaasjeHeld(ctx, x, y, r, soort = 'golgi', a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = soort === 'er' ? _mixHex(C.er, '#1A2740', 0.72) : _mixHex(C.ves, '#1A2740', 0.55); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1, r * 0.08); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, r * 0.78, 0, 6.283); ctx.stroke();
  if (o.lading !== false) { ctx.fillStyle = C.oker; for (let k = 0; k < (o.n ?? 3); k++) { ctx.beginPath(); ctx.arc(x + (hash(k * 7 + 3) - 0.5) * r * 0.9, y + (hash(k * 7 + 4) - 0.5) * r * 0.9, r * 0.11, 0, 6.283); ctx.fill(); } }
  heldDeeltje(ctx, x, y + r * 0.15, Math.max(2.2, r * 0.17));
  if (o.label) adresLabel(ctx, x + r * 0.62, y - r * 0.62, Math.max(4, r * 0.32), o.label, o.labelA ?? 1);
  if (o.ring !== false) goudRing(ctx, x, y, r + Math.max(4, r * 0.18), o.ringA ?? 1);
  ctx.restore(); }
// knop: een blaasje snoert af van een membraan (ER of golgi). (x, y) = plek op het membraan, (nx, ny) = richting waarin het
// blaasje losraakt, g 0..1 (0 = plat, 0,6 = Ω met hals, 1 = los). Recept: het membraan stulpt uit, de hals wordt smal en knipt af.
function knop(ctx, x, y, nx, ny, r, g, soort = 'er', a = 1) { if (a <= 0.01 || g <= 0.01) return; const gg = ease(clamp(g, 0, 1));
  const d = lerp(-r * 0.6, r * 1.15, gg), rr = r * lerp(0.6, 1, ease(clamp(g / 0.6, 0, 1)));
  const cx = x + nx * d, cy = y + ny * d; ctx.save(); ctx.globalAlpha *= a;
  if (g < 0.92) { const hw = rr * lerp(0.75, 0.05, clamp((g - 0.3) / 0.62, 0, 1)), tx = -ny, ty = nx; ctx.beginPath(); ctx.moveTo(x + tx * hw * 1.4, y + ty * hw * 1.4);
    ctx.quadraticCurveTo(x + nx * rr * 0.4 + tx * hw, y + ny * rr * 0.4 + ty * hw, cx + tx * rr * 0.7, cy + ty * rr * 0.7); ctx.lineTo(cx - tx * rr * 0.7, cy - ty * rr * 0.7);
    ctx.quadraticCurveTo(x + nx * rr * 0.4 - tx * hw, y + ny * rr * 0.4 - ty * hw, x - tx * hw * 1.4, y - ty * hw * 1.4); ctx.closePath();
    ctx.fillStyle = soort === 'er' ? _mixHex(C.er, '#1A2740', 0.72) : _mixHex(C.ves, '#1A2740', 0.55); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1, rr * 0.08); ctx.stroke(); }
  blaasjeHeld(ctx, cx, cy, rr, soort, 1, { ring: g > 0.5, ringA: ramp(g, 0.5, 0.3), lading: soort !== 'er' }); ctx.restore(); return [cx, cy]; }

// suikerketen (vertakt, groen) op een eiwit; n = aantal suikers, vorm 0..1 = 'aangepast' (sommige vallen af, nieuwe erbij)
function suikerBoom(ctx, x, y, an, r, n = 7, aangepast = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.groen; ctx.lineWidth = Math.max(1, r * 0.35);
  const knoop = (px, py, ang, diep, id) => { if (diep > 3) return; const L = r * 2.4; const qx = px + Math.cos(ang) * L, qy = py + Math.sin(ang) * L; const weg = aangepast > 0 && diep === 3 && hash(id) < 0.5;
    const k = weg ? 1 - ease(aangepast) : 1; if (k < 0.02) return; ctx.save(); ctx.globalAlpha *= k; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke();
    hexagonKlein(ctx, qx, qy, r, diep === 3 && aangepast > 0.5 && !weg ? '#A8D8B2' : C.groen); ctx.restore();
    if (diep < 2 || hash(id * 3) > 0.35) { knoop(qx, qy, ang - 0.55, diep + 1, id * 2 + 1); knoop(qx, qy, ang + 0.55, diep + 1, id * 2 + 2); } else knoop(qx, qy, ang, diep + 1, id * 2 + 1); };
  knoop(x, y, an, 1, 1); ctx.restore(); }
function hexagonKlein(ctx, x, y, r, col) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const f = Math.PI / 6 + i * Math.PI / 3; i ? ctx.lineTo(x + Math.cos(f) * r, y + Math.sin(f) * r) : ctx.moveTo(x + Math.cos(f) * r, y + Math.sin(f) * r); } ctx.closePath(); shape(ctx, col, lighten(col, 0.35), Math.max(0.8, r * 0.15)); }
// adreslabel: klein gouden vlaggetje (fosfaat-suiker-signaal, vereenvoudigd) — kleur geeft de bestemming
function adresLabel(ctx, x, y, r, kleur = C.goud, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + r * 1.2); ctx.lineTo(x, y - r * 1.3); ctx.strokeStyle = lighten(kleur, 0.2); ctx.lineWidth = Math.max(1, r * 0.25); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - r * 1.3); ctx.lineTo(x + r * 1.6, y - r * 0.8); ctx.lineTo(x, y - r * 0.3); ctx.closePath(); shape(ctx, kleur, lighten(kleur, 0.35), Math.max(0.8, r * 0.15)); ctx.restore(); }

// mRNA langs een eigen pad (polylijn), naar het recept van mrnaSliert: dunne teal streng met donkere rand, basen als korte stekels
// aan één kant in RNA-kleuren (palet B). u0..u1 = welk deel van het pad zichtbaar is.
function mrnaLangs(ctx, pts, u0, u1, dik = 2.4, a = 1, t = 0) { if (a <= 0.01 || u1 <= u0) return; const P = bioDicht(pts, 24); const cum = [0]; for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const L = cum[cum.length - 1], A = u0 * L, B = u1 * L; const Q = P.filter((p, i) => cum[i] >= A && cum[i] <= B); if (Q.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const stap = Math.max(3, dik * 2.2); let acc = 0, k = 0; const BK = ['A', 'U', 'G', 'C'];
  for (let i = 1; i < Q.length; i++) { const dx = Q[i][0] - Q[i - 1][0], dy = Q[i][1] - Q[i - 1][1], l = Math.hypot(dx, dy) || 1; acc += l; if (acc < stap) continue; acc = 0; k++;
    const nx = -dy / l, ny = dx / l; ctx.strokeStyle = RNA_BASE.base[BK[(k * 7 + 3) % 4]]; ctx.lineWidth = Math.max(1.2, dik * 0.55); ctx.beginPath(); ctx.moveTo(Q[i][0] + nx * dik * 0.5, Q[i][1] + ny * dik * 0.5); ctx.lineTo(Q[i][0] + nx * dik * 2.2, Q[i][1] + ny * dik * 2.2); ctx.stroke(); }
  ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = dik + 1.6; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = dik; ctx.stroke();
  ctx.restore(); const e = Q[Q.length - 1], e0 = Q[Math.max(0, Q.length - 4)]; return { kop: e, hoek: Math.atan2(e[1] - e0[1], e[0] - e0[0]) }; }
// klein ribosoom op celschaal (twee subeenheden, zoals in ruwER/polysoom), r = halve breedte grote subeenheid
function riboKlein(ctx, x, y, r, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.beginPath(); ctx.ellipse(0, -r * 0.35, r, r * 0.78, 0, 0, 6.283); shape(ctx, C.ribo, lighten(C.ribo, 0.3), Math.max(0.8, r * 0.12));
  ctx.beginPath(); ctx.ellipse(0, r * 0.62, r * 0.72, r * 0.45, 0, 0, 6.283); shape(ctx, _mixHex(C.ribo, '#121A26', 0.15), lighten(C.ribo, 0.3), Math.max(0.8, r * 0.12)); ctx.restore(); }
// gegroeide eiwitketen als kralen langs een korte kronkel (celschaal), n kralen vanaf (x, y) in richting an
function ketenKlein(ctx, x, y, an, n, r, t = 0, a = 1) { if (a <= 0.01 || n < 1) return; ctx.save(); ctx.globalAlpha *= a; let px = x, py = y, f = an;
  for (let i = 0; i < n; i++) { f += (hash(i * 3.3) - 0.5) * 1.1 + Math.sin(t * 0.7 + i) * 0.05; px += Math.cos(f) * r * 1.7; py += Math.sin(f) * r * 1.7; ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); shape(ctx, ['#C9A35C', '#B08A5C', '#D9B97A'][i % 3], '#E0C98F', Math.max(0.6, r * 0.2)); }
  ctx.restore(); }

// pad-volger: positie op een polylijn op fractie u (0..1)
function langsPad(pts, u) { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * cum[cum.length - 1]; let i = 1; while (i < pts.length - 1 && cum[i] < d) i++; const k = (d - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]);
  return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; }
function zachtPad(pts, n = 16) { return bioDicht(pts, n); }

// ---- MICROTUBULUS EN MOTOREIWIT (nieuw, voor de bibliotheek) ----
// Recept (Alberts MBoC 'Molecular motors'; OpenStax Biology 2e § 4.5; prompt C9 'Motoreiwit: steps hand over hand along the
// cytoskeleton in fixed steps of 8 nm'): microtubulus = holle buis van ± 25 nm uit tubuline-dimeren (α en β, elk ± 4 nm, samen
// 8 nm) in rijen (protofilamenten); van opzij zie je twee à drie rijen kralen in twee grijsblauwe tinten. Motoreiwit (kinesine):
// twee koppen (± 7 nm) aan een lange steel (± 60–80 nm) met bovenaan de lading (blaasje); de koppen stappen om de beurt (hand over
// hand) precies één dimeer (8 nm) verder, één kop zit altijd vast. Bekende fouten: één kop die glijdt; stappen van wisselende maat.
function microtubulus(ctx, x0, x1, y, d = 8, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = d * 0.5;
  for (let rij = -1; rij <= 1; rij++) { for (let x = x0, i = 0; x <= x1; x += d, i++) { ctx.beginPath(); ctx.arc(x + (rij === 0 ? d * 0.5 : 0), y + rij * d * 0.95, r * 0.95, 0, 6.283);
      const col = i % 2 ? '#7E8FAB' : '#A4B2CA'; shape(ctx, rij === 0 ? lighten(col, 0.08) : _mixHex(col, '#121A26', 0.25), null); } }
  ctx.restore(); }
// x = positie van de lading (blaasje) langs de buis; stap = dimeer-lengte; fase uit x
function motorEiwit(ctx, x, y, d, steel, a = 1) { if (a <= 0.01) return; const stap = d * 2, f = (x / stap) % 1, n = Math.floor(x / stap);
  const voor = (n + (f > 0.5 ? 1 : 0)) * stap, achter = voor - stap; const til = Math.sin(Math.PI * ((f * 2) % 1));
  const kopA = [f < 0.5 ? lerp(achter - stap, voor, ease(f * 2)) : voor, y - d * 1.4 - (f < 0.5 ? til * d * 1.6 : 0)];
  const kopB = [f >= 0.5 ? lerp(achter, voor + stap, ease((f - 0.5) * 2)) : achter, y - d * 1.4 - (f >= 0.5 ? til * d * 1.6 : 0)];
  const nek = [(kopA[0] + kopB[0]) / 2, y - d * 3.2]; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = lighten(C.enzym, 0.25); ctx.lineWidth = Math.max(1.5, d * 0.35); for (const k of [kopA, kopB]) { ctx.beginPath(); ctx.moveTo(k[0], k[1]); ctx.lineTo(nek[0], nek[1]); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(nek[0], nek[1]); ctx.quadraticCurveTo(nek[0] + d, nek[1] - steel * 0.5, x, y - d * 3.2 - steel); ctx.stroke();
  for (const k of [kopA, kopB]) { ctx.beginPath(); ctx.ellipse(k[0], k[1], d * 0.95, d * 0.75, 0, 0, 6.283); shape(ctx, C.enzym, lighten(C.enzym, 0.35), 1.2); }
  ctx.restore(); return [x, y - d * 3.2 - steel]; }

// ---- HARTSPIERCEL EN HUIDCEL (schematisch, nieuw) ----
// Recept hartspiercel (Alberts MBoC h. 14 en 16; Barth e.a. 1992): langwerpig en vertakt, ± 100 × 20 µm, één of twee kernen in
// het midden, myofibrillen in de lengte met dwarsstrepen, mitochondriën in rijen ertussen (± 1/3 van het volume), aan de uiteinden
// tussenschijven. Huidcel (keratinocyt): rond-hoekig, kern, weinig ER, een paar mitochondriën, veel keratinedraden.
function hartspiercel(ctx, x, y, w, h, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = x - w / 2, R = x + w / 2, T = y - h / 2, B = y + h / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(L + 20, T); ctx.lineTo(R - 60, T); ctx.lineTo(R - 30, T - h * 0.25); ctx.lineTo(R, T - h * 0.18); ctx.lineTo(R - 18, T + h * 0.1); ctx.lineTo(R - 10, B); ctx.lineTo(L + 30, B); ctx.lineTo(L, B - h * 0.3); ctx.lineTo(L + 6, T + h * 0.2); ctx.closePath(); };
  omtrek(); ctx.fillStyle = '#26324A'; ctx.fill(); ctx.save(); omtrek(); ctx.clip();
  const rijen = 5; for (let r = 0; r < rijen; r++) { const yy = T + (r + 0.5) * h / rijen; ctx.fillStyle = rgba('#B87A6A', 0.45); ctx.fillRect(L, yy - h / rijen * 0.22, w, h / rijen * 0.44);
    ctx.strokeStyle = rgba('#E0B0A0', 0.5); ctx.lineWidth = 1.2; for (let xx = L; xx < R; xx += 14) { ctx.beginPath(); ctx.moveTo(xx, yy - h / rijen * 0.22); ctx.lineTo(xx, yy + h / rijen * 0.22); ctx.stroke(); }
    if (r < rijen - 1) { const ym = T + (r + 1) * h / rijen; for (let xx = L + 18 + (r % 2) * 14; xx < R - 10; xx += 30) { if (Math.abs(xx - x) < 50 && r === 2) continue; mitochondrionEcht(ctx, xx, ym, 0.12, { lang: 210, dik: 80, cristae: 13, seed: r * 9 + xx }); } } }
  kernEnvelopPorie(ctx, x, y, 0.16, { r: 150, ribo: false, porien: 8 }); ctx.restore();
  omtrek(); ctx.strokeStyle = C.er; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function huidcel(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vorm = () => { ctx.beginPath(); bioPad(ctx, Array.from({ length: 7 }, (_, i) => { const f = i / 7 * 6.283 + 0.2, rr = r * (1 + 0.07 * Math.sin(i * 2.3)); return [x + Math.cos(f) * rr, y + Math.sin(f) * rr * 0.9]; }), true); ctx.closePath(); }; // in een weefsel veelhoekig, maar met ronde hoeken (C9)
  vorm(); ctx.fillStyle = '#26324A'; ctx.fill(); ctx.save(); vorm(); ctx.clip();
  ctx.strokeStyle = rgba('#C9B896', 0.35); ctx.lineWidth = 1.4; for (let k = 0; k < 12; k++) { ctx.beginPath(); let px = x + (hash(k) - 0.5) * r * 1.6, py = y + (hash(k + 9) - 0.5) * r * 1.5, f = hash(k + 4) * 6.283; ctx.moveTo(px, py); for (let j = 0; j < 8; j++) { f += (hash(k * 8 + j) - 0.5) * 0.7; px += Math.cos(f) * r * 0.16; py += Math.sin(f) * r * 0.16; ctx.lineTo(px, py); } ctx.stroke(); }
  kernEnvelopPorie(ctx, x - r * 0.12, y, r / 150 * 0.38, { r: 150, ribo: false, porien: 10 });
  ruwER(ctx, x - r * 0.12, y, r / 150 * 0.38, { r0: 150, gap: 11, a0: -0.7, a1: 0.1, lagen: 1, kern: false, envelop: false, aansl: [-0.4], glad: 0 });
  for (const [mx, my, ro] of [[0.55, 0.35, 0.4], [-0.5, -0.45, -0.6], [0.4, -0.5, 1.2]]) mitochondrionEcht(ctx, x + mx * r, y + my * r, r / 420, { lang: 210, dik: 84, cristae: 8, rot: ro });
  ctx.restore(); vorm(); ctx.strokeStyle = C.er; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// ---- KRUIPENDE CEL EN TRILHAREN (nieuw) ----
// Kruipen (Alberts MBoC h. 16): voorrand (lamellipodium) schuift vooruit door actinegroei, de achterkant komt mee. Trilhaar
// (C9 Beweging): stijve slag en een gebogen herstelslag dicht langs het oppervlak; buren slaan iets later (metachrone golf).
function kruipCel(ctx, x, y, r, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ph = (t * 0.5) % 1, sx = x + ((t * 0.5) % 3) * 8;
  ctx.beginPath(); for (let i = 0; i <= 48; i++) { const f = i / 48 * 6.283; const voor = Math.max(0, Math.cos(f)); const rr = r * (1 + 0.35 * voor * (0.6 + 0.4 * Math.sin(ph * 6.283)) - 0.1 * Math.max(0, -Math.cos(f)));
    const px = sx + Math.cos(f) * rr * 1.25, py = y + Math.sin(f) * rr * 0.62; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, '#26324A', C.er, 1.6);
  ctx.beginPath(); ctx.arc(sx - r * 0.35, y, r * 0.32, 0, 6.283); shape(ctx, _mixHex(C.kern, '#2A3448', 0.45), C.kernR, 1.2);
  ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 1; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(sx + r * 0.6, y + k * r * 0.1); ctx.lineTo(sx + r * 1.45, y + k * r * 0.14); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - r * 1.6, y + r * 0.66); ctx.lineTo(x + r * 2.4, y + r * 0.66); ctx.stroke(); ctx.restore(); }
function trilharen(ctx, x0, x1, y, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 4, w = (x1 - x0) / n; for (let c = 0; c < n; c++) { const cx = x0 + c * w; roundRect(ctx, cx + 2, y, w - 4, h * 0.9, 8); shape(ctx, '#26324A', C.er, 1.4); ctx.beginPath(); ctx.ellipse(cx + w / 2, y + h * 0.55, w * 0.22, h * 0.2, 0, 0, 6.283); shape(ctx, _mixHex(C.kern, '#2A3448', 0.45), C.kernR, 1); }
  ctx.strokeStyle = lighten(C.er, 0.1); ctx.lineWidth = 1.6; ctx.lineCap = 'round'; const L = h * 0.75;
  for (let i = 0; x0 + 6 + i * 7 < x1 - 4; i++) { const bx = x0 + 6 + i * 7, ph = ((t * 1.2 - i * 0.06) % 1 + 1) % 1; ctx.beginPath(); ctx.moveTo(bx, y);
    if (ph < 0.3) { const an = lerp(-2.2, -0.9, ease(ph / 0.3)); ctx.lineTo(bx + Math.cos(an) * L, y + Math.sin(an) * L); } // krachtslag: stijf
    else { const u = (ph - 0.3) / 0.7, an = lerp(-0.9, -2.2, ease(u)); const mx = bx + Math.cos(an + 0.9) * L * 0.5, my = y + Math.sin(an + 0.9) * L * 0.5 * 0.6; ctx.quadraticCurveTo(mx, my - L * 0.15, bx + Math.cos(an) * L * 0.85, y + Math.sin(an) * L * 0.5); } // herstel: gebogen, laag
    ctx.stroke(); }
  ctx.restore(); }

// ---- PLANTJE (Schema-icoon bij turgor) ----
function plantje(ctx, x, y, s, slap, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = ease(clamp(slap, 0, 1));
  ctx.beginPath(); ctx.moveTo(x - 46 * s, y); ctx.lineTo(x + 46 * s, y); ctx.lineTo(x + 36 * s, y + 70 * s); ctx.lineTo(x - 36 * s, y + 70 * s); ctx.closePath(); shape(ctx, '#8C5A3A', '#B07A5A', 1.5);
  const top = [x + 70 * d * s, y - lerp(190, 110, d) * s]; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 10 * d * s, y - 110 * s, top[0], top[1]); ctx.stroke();
  const blad = (u, kant) => { const px = lerp(x, top[0], u * u) + 6 * d * s * u, py = lerp(y, top[1], u); const an = -Math.PI / 2 + kant * lerp(0.9, 2.1, d) ;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(14 * s, -24 * s, 0, -54 * s); ctx.quadraticCurveTo(-14 * s, -24 * s, 0, 0); shape(ctx, '#7FC48F', '#A8D8B2', 1.2); ctx.restore(); };
  blad(0.45, -1); blad(0.6, 1); blad(0.85, -1); blad(1, 1); ctx.restore(); }

// ---- kleuren en zeshoek uit de Voeding-reeks (lib_voeding.js), nodig voor enkele beeldbankobjecten (membraanBoog-staarten,
// substraat van enzymKluwen); deze film laadt lib_voeding.js niet
const V = { kh: '#DCC07F', ew: '#C9A35C', vt: '#9C7A3C' };
function hexagon(ctx, x, y, r, fill, stroke, lw = 1.3, rot = 0) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = rot + Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, fill, stroke, lw); }

// ---- watermolecuul (teal, één O met twee H) ----
function waterMol(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(0, 0, 5 * s, 0, 6.283); ctx.fill(); ctx.fillStyle = '#BFE0EF'; for (const f of [-0.9, 0.9]) { ctx.beginPath(); ctx.arc(Math.cos(f + Math.PI / 2) * 6 * s, Math.sin(f + Math.PI / 2) * 6 * s, 2.8 * s, 0, 6.283); ctx.fill(); } ctx.restore(); }

// ---- GRANUM (nieuw): stapel thylakoïden van opzij, met lichtvangende eiwitten (kralen) op de schijfjes ----
// Recept (OpenStax Biology 2e fig. 8.4; chloroplastEcht): granum = 5–10 platte, ronde zakjes (thylakoïden) op elkaar, verbonden met
// stromalamellen; in het membraan zitten de eiwitcomplexen die licht vangen (fotosystemen) als kleine kluwens.
function granum(ctx, x, y, w, n, eiwit = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 26, gap = 10;
  for (let k = n - 1; k >= 0; k--) { const yy = y + (k - (n - 1) / 2) * (h + gap); ctx.beginPath(); ctx.ellipse(x, yy + h * 0.25, w / 2, h * 0.55, 0, 0, Math.PI); ctx.lineTo(x - w / 2, yy - h * 0.25); ctx.ellipse(x, yy - h * 0.25, w / 2, h * 0.55, 0, Math.PI, 0, true); ctx.closePath();
    shape(ctx, '#3F7A4C', '#7FC48F', 1.5); ctx.beginPath(); ctx.ellipse(x, yy - h * 0.25, w / 2, h * 0.55, 0, 0, 6.283); shape(ctx, '#5FA86E', '#A8D8B2', 1.5);
    if (eiwit > 0.01) { ctx.save(); ctx.globalAlpha *= eiwit; for (let i = 0; i < 7; i++) { const f = i / 7 * 6.283 + k; const px = x + Math.cos(f) * w * 0.32, py = yy - h * 0.25 + Math.sin(f) * h * 0.36; for (let b = 0; b < 4; b++) { ctx.beginPath(); ctx.arc(px + Math.cos(b * 1.6) * 4, py + Math.sin(b * 1.6) * 2.6, 2.6, 0, 6.283); shape(ctx, b % 2 ? '#E0B64A' : '#C9A35C', null); } } ctx.restore(); } }
  ctx.restore(); }

// ---- kaartje met klein beeld (s13, recap) ----
function beeldKaart(ctx, x, y, w, h, titel, sub, a, aan, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, C.fill, aan > 0.5 ? C.goud : C.line, aan > 0.5 ? 2 : 1);
  ctx.save(); roundRect(ctx, x - w / 2 + 8, y - h / 2 + 8, w - 16, h * 0.56, 10); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(x - w / 2, y - h / 2, w, h); teken(x, y - h / 2 + 8 + h * 0.28); ctx.restore();
  text(ctx, titel, x, y + h * 0.26, fTekst(34, 600), C.text, 'center'); if (sub) metaText(ctx, sub, x, y + h * 0.4, C.grain, 'center', 20); ctx.restore(); }
