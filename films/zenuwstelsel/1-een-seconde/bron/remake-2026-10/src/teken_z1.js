// ===== teken_z1.js — eigen tekeningen voor Zenuwstelsel 1 'Eén seconde' (lichte remake, 29 okt 2026, prompt v13) =====
// Part C: donker navy, betekeniskleuren. Zenuwsignaal = teal (C.teal); een zenuw in rust = bleek crème (Z1.zenuw);
// focus = goud. Personages uit het castboek (Daan = fietser, Teun = kind op de stoep), geen namen in beeld of stem.
function dot(ctx,x,y,r,fill,stroke,lw=1.2){ ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
const Z1 = { zenuw:'#D9CFB4', zenuwD:'#A89E84', wit:'#DCD6C8', witR:'#F2EEE4', grijs:'#8A8296', grijsR:'#A79FB3', cel:'#5E5670',
  huis1:'#2A3C5E', huis2:'#31466C', huis3:'#26365A', dak:'#22314F', raam:'#C9A35C', stoep:'#4B5878', stoepR:'#5F6C8C', weg:'#28324A', streep:'#8FA0B5',
  frame:'#6E7C98', frameR:'#8E9BB4', band:'#20252F', velg:'#9AA3B2', hart:'#B8333B', hartL:'#D9555B', bot:'#ECE5D3' };
const UIT = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);

// ---------- paden ----------
function zGlad(P, n = 10) { const out = []; for (let i = 0; i < P.length - 1; i++) { const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(j => 0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3))); } }
  out.push(P[P.length - 1]); return out; }
function zLen(P) { let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); return L; }
function zAt(P, u) { u = clamp(u, 0, 1); const L = zLen(P) * u; let acc = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc + d >= L && d > 0) { const k = (L - acc) / d; return [lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)]; } acc += d; } return P[P.length - 1].slice(); }
function zDeel(P, u0, u1) { const n = 40, out = []; for (let i = 0; i <= n; i++) out.push(zAt(P, lerp(u0, u1, i / n))); return out; }
function zLijn(ctx, P, col, lw, a = 1, dash = null) { if (a <= 0.01 || P.length < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); ctx.restore(); }
// zenuwbaan die vuurt: het stuk dat de impuls al gehad heeft wordt teal, de impuls zelf een teal kop
function zVuur(ctx, P, u, a = 1, lw = 6, kop = true) { if (a <= 0.01 || u <= 0) return; const uu = Math.min(1, u); zLijn(ctx, zDeel(P, 0, uu), C.teal, lw, a * 0.85);
  if (kop && u < 1.0) { const [x, y] = zAt(P, uu); ctx.save(); ctx.globalAlpha *= a; dot(ctx, x, y, lw * 1.7, C.teal, '#BFE0F0', 2); ctx.restore(); } }
function zPijlkop(ctx, P, col, a = 1, s = 18) { if (a <= 0.01) return; const n = P.length, [x2, y2] = P[n - 1], [x1, y1] = P[n - 3] || P[0]; const an = Math.atan2(y2 - y1, x2 - x1);
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x2 + Math.cos(an) * s * 0.6, y2 + Math.sin(an) * s * 0.6); ctx.lineTo(x2 - Math.cos(an - 0.5) * s, y2 - Math.sin(an - 0.5) * s); ctx.lineTo(x2 - Math.cos(an + 0.5) * s, y2 - Math.sin(an + 0.5) * s); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- tijdbalk (rechtsboven): de ene seconde van de film ----------
function tijdbalk(ctx, ms, a = 1, o = {}) { if (a <= 0.01) return; const x0 = 1150, x1 = 1830, y = 132, X = v => x0 + (x1 - x0) * clamp(v / 1000, 0, 1);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0 - 34, 62, x1 - x0 + 68, 132, 14); shape(ctx, rgba(C.kast, 0.82), rgba(C.line, 0.35), 1.2);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (const [v, s] of [[0, '0'], [500, '0,5 s'], [1000, '1 s']]) { ctx.beginPath(); ctx.moveTo(X(v), y - 9); ctx.lineTo(X(v), y + 9); ctx.stroke(); metaText(ctx, s, X(v), y + 46, C.text2, v === 0 ? 'left' : v === 1000 ? 'right' : 'center', 28); }
  for (const m of (o.marks || [])) { const [v, s, col, ma = 1] = m; if (ma <= 0.01) continue; ctx.save(); ctx.globalAlpha *= ma; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(v), y - 20); ctx.lineTo(X(v), y + 14); ctx.stroke(); ctx.setLineDash([]); if (s) metaText(ctx, s, X(v) + 10, y - 30, col, 'left', 24); ctx.restore(); }
  if (ms > 0) { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(X(ms), y); ctx.stroke(); }
  dot(ctx, X(ms), y, 11, C.goud, '#F5DE9A', 2);
  const s = (ms / 1000).toFixed(3).replace('.', ','); text(ctx, s + ' s', x1, 104, fTekst(34, 700), C.goud, 'right'); if (o.label && !(o.marks || []).some(m => m[1])) metaText(ctx, o.label, x0, 100, C.grain, 'left', 24);
  ctx.restore(); }

// ---------- straat (Macro-nacht): huizen, stoep, weg ----------
function straat(ctx, G = 830) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#243656'; ctx.fillRect(0, 430, W, 290); // lichtere band boven de horizon (harde rand)
  const huizen = [[-20, 250, 300, C.huis1], [230, 210, 360, Z1.huis2], [440, 240, 270, Z1.huis3], [680, 300, 330, Z1.huis1], [980, 220, 380, Z1.huis2], [1200, 260, 290, Z1.huis3], [1460, 240, 350, Z1.huis1], [1700, 260, 310, Z1.huis2]];
  for (const [x, w, hh, col] of huizen) { const b = 712; ctx.fillStyle = col || Z1.huis1; ctx.fillRect(x, b - hh, w, hh); ctx.beginPath(); ctx.moveTo(x - 10, b - hh); ctx.lineTo(x + w / 2, b - hh - w * 0.32); ctx.lineTo(x + w + 10, b - hh); ctx.closePath(); ctx.fillStyle = Z1.dak; ctx.fill();
    for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) { const wx = x + w * (0.22 + k * 0.38), wy = b - hh + 50 + r * 110; ctx.fillStyle = hash(x + r * 7 + k * 3) > 0.45 ? rgba(Z1.raam, 0.55) : rgba('#121A26', 0.6); ctx.fillRect(wx, wy, w * 0.2, 56); } }
  ctx.fillStyle = Z1.stoep; ctx.fillRect(0, 712, W, 30); ctx.fillStyle = Z1.stoepR; ctx.fillRect(0, 740, W, 6);
  ctx.fillStyle = Z1.weg; ctx.fillRect(0, 746, W, H - 746);
  ctx.strokeStyle = rgba(Z1.streep, 0.5); ctx.lineWidth = 5; ctx.setLineDash([60, 50]); ctx.beginPath(); ctx.moveTo(0, G + 46); ctx.lineTo(W, G + 46); ctx.stroke(); ctx.setLineDash([]); }

// ---------- bal (wit met grijze vlakken) ----------
function bal(ctx, x, y, r, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; dot(ctx, x, y, r, '#EDEAE2', '#B9B3A6', 2);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 1, 0, 6.283); ctx.clip(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#5E6A80';
  for (let k = 0; k < 5; k++) { const an = k * 1.2566; const cx = Math.cos(an) * r * 0.78, cy = Math.sin(an) * r * 0.78; ctx.beginPath(); for (let j = 0; j < 5; j++) { const b = an + j * 1.2566; ctx.lineTo(cx + Math.cos(b) * r * 0.26, cy + Math.sin(b) * r * 0.26); } ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); for (let j = 0; j < 5; j++) { const b = j * 1.2566 + 0.63; ctx.lineTo(Math.cos(b) * r * 0.3, Math.sin(b) * r * 0.3); } ctx.closePath(); ctx.fill(); ctx.restore(); ctx.restore(); }

// ---------- fiets met fietser (Daan, zijaanzicht, kijkt naar rechts) ----------
// x = heup, G = grond. o: draai (wielhoek), trek 0..1 (rechterhand schiet terug: terugtrekreflex), knijp 0..1 (remhendel), uit (gezicht), a.
// Maten bij h = 440 ≈ 1,80 m: 1 m ≈ 244 px; wiel r 0,34 m; trapas 0,28 m boven de grond; achteras 0,42 m achter, vooras 0,60 m vóór de trapas.
let _fietsArmZ1 = null;
function fietsMetFietser(ctx, x, G, h = 440, o = {}) { const { draai = 0, trek = 0, knijp = 0, uit = 'neutraal', a = 1 } = o; if (a <= 0.01) return {}; const k = h / 440;
  ctx.save(); ctx.globalAlpha *= a; const fy = G - 23 * k;
  const po = { zij: true, kijk: 1, pose: 'zit', zitHoogte: 0.364 * h, tafel: fy - 0.37 * h, reik: 1.6, leun: 32, uit };
  const BB = [x + 52 * k, fy - 45 * k], r = 83 * k, AA = [BB[0] - 103 * k, G - r], VA = [BB[0] + 146 * k, G - r], zadel = [x - 4 * k, fy - 0.364 * h + 8 * k], stuur = [x + 158 * k, fy - 0.37 * h + 0.13 * 68.5 * k];
  const wiel = (c) => { ctx.strokeStyle = Z1.band; ctx.lineWidth = 9 * k; ctx.beginPath(); ctx.arc(c[0], c[1], r - 4 * k, 0, 6.283); ctx.stroke(); ctx.strokeStyle = Z1.velg; ctx.lineWidth = 2.5 * k; ctx.beginPath(); ctx.arc(c[0], c[1], r - 10 * k, 0, 6.283); ctx.stroke();
    ctx.lineWidth = 1.2 * k; ctx.strokeStyle = rgba(Z1.velg, 0.8); for (let i = 0; i < 12; i++) { const an = draai + i * 0.5236; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(c[0] + Math.cos(an) * (r - 10 * k), c[1] + Math.sin(an) * (r - 10 * k)); ctx.stroke(); } dot(ctx, c[0], c[1], 5 * k, Z1.frameR); };
  wiel(AA); wiel(VA);
  // frame: zitbuis, liggende buis, onderbuis, achtervork, voorvork, stuurpen
  const kop = [VA[0] - 26 * k, stuur[1] + 26 * k]; ctx.strokeStyle = Z1.frame; ctx.lineWidth = 8 * k; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(BB[0], BB[1]); ctx.lineTo(zadel[0] + 4 * k, zadel[1] + 14 * k); ctx.moveTo(BB[0], BB[1]); ctx.lineTo(kop[0], kop[1] + 22 * k); ctx.moveTo(zadel[0] + 2 * k, zadel[1] + 30 * k); ctx.lineTo(kop[0], kop[1]);
  ctx.moveTo(BB[0], BB[1]); ctx.lineTo(AA[0], AA[1]); ctx.lineTo(zadel[0] + 3 * k, zadel[1] + 26 * k); ctx.moveTo(kop[0], kop[1] - 6 * k); ctx.lineTo(VA[0], VA[1]); ctx.stroke();
  ctx.lineWidth = 6 * k; ctx.beginPath(); ctx.moveTo(kop[0], kop[1]); ctx.lineTo(stuur[0] - 4 * k, stuur[1] + 4 * k); ctx.stroke();
  // zadel en trapper
  roundRect(ctx, zadel[0] - 34 * k, zadel[1], 62 * k, 12 * k, 6 * k); shape(ctx, '#2B2F38', null); dot(ctx, BB[0], BB[1], 11 * k, Z1.frameR, Z1.frame, 2);
  // stuur met handvat en remhendel (knijp draait de hendel naar het handvat)
  ctx.strokeStyle = '#2B2F38'; ctx.lineWidth = 10 * k; ctx.beginPath(); ctx.moveTo(stuur[0] - 10 * k, stuur[1] + 2 * k); ctx.lineTo(stuur[0] + 14 * k, stuur[1] + 2 * k); ctx.stroke();
  const hk = lerp(0.55, 0.12, knijp); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4 * k; ctx.beginPath(); ctx.moveTo(stuur[0] - 6 * k, stuur[1] - 4 * k); ctx.lineTo(stuur[0] - 6 * k + Math.cos(hk) * 42 * k, stuur[1] - 4 * k + Math.sin(hk) * 42 * k); ctx.stroke();
  // fietser
  if (trek > 0) { if (!_fietsArmZ1) { const c = document.createElement('canvas').getContext('2d'); const rr = persoon(c, 'daan', x, fy, h, Object.assign({}, po)).handR; const L = po.leun * Math.PI / 180, aa = Math.atan2(rr.elx - rr.shx, rr.ely - rr.shy), bb = Math.atan2(rr.x - rr.elx, rr.y - rr.ely); _fietsArmZ1 = [aa - L, bb - aa]; }
    const [u, e] = _fietsArmZ1, kk = ease(trek); po.arm = [u + (-0.2 - u) * kk, e + (2.4 - e) * kk]; }
  const R = persoon(ctx, 'daan', x, fy, h, po); ctx.restore(); return Object.assign({ stuur, BB, VA, AA, r }, R); }

// ---------- lichaamskaart: Daan van voren met zijn zenuwstelsel als laag ----------
// Geeft paden terug (pixels): merg (van hals naar onderrug), armR/armL (merg → hand), beenR/beenL, hart (zenuw naar het hart), punten oog, hartP, brein (midden zoomcirkel).
function lichaamKaart(ctx, cx, yb, h, o = {}) { const { a = 1, zen = 1, cz = 0, per = 0, dimLijf = 0, uit = 'neutraal', hartA = 0, beat = 0 } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.globalAlpha *= 1 - 0.45 * dimLijf; const R = persoon(ctx, 'daan', cx, yb, h, { uit }); ctx.restore();
  const k = h / 820, hy = R.hoofd.y, hr = R.hoofd.r, ox = R.handR.x - cx; // ox = halve breedte tot de hand
  const nek = [cx, hy + hr * 1.05], schY = hy + hr * 1.75, mergEind = [cx, R.heup.y - 18 * k];
  const merg = zGlad([nek, [cx, schY], [cx, (schY + mergEind[1]) / 2], mergEind]);
  const arm = s => zGlad([[cx, schY + 8 * k], [cx + s * 60 * k, schY + 2 * k], [cx + s * 108 * k, schY + 20 * k], [cx + s * (ox * 0.98 + 6 * k), hy + 3.95 * hr], [cx + s * (ox + 2 * k), R.handR.y - 26 * k], [cx + s * ox, R.handR.y + 10 * k]]);
  const been = s => zGlad([mergEind, [cx + s * 30 * k, R.heup.y + 22 * k], [cx + s * 44 * k, yb - 0.23 * h], [cx + s * 46 * k, yb - 0.08 * h], [cx + s * 52 * k, yb - 0.025 * h]]);
  const hartP = [cx + 22 * k, hy + 3.15 * hr], hartZ = zGlad([[cx, hy + 2.55 * hr], [cx + 16 * k, hy + 2.75 * hr], [hartP[0], hartP[1] - 22 * k]]);
  const P = { merg, armR: arm(1), armL: arm(-1), beenR: been(1), beenL: been(-1), hart: hartZ, hartP, oog: [cx + hr * 0.36, hy - hr * 0.02], hoofd: R.hoofd, R };
  if (hartA > 0.01) { ctx.save(); ctx.globalAlpha *= hartA; hartje(ctx, hartP[0], hartP[1], 30 * k, beat); ctx.restore(); }
  if (zen > 0.01) { const zcol = (hl) => hl > 0.5 ? C.goud : Z1.zenuw; ctx.save(); ctx.globalAlpha *= zen;
    for (const p of [P.armR, P.armL, P.beenR, P.beenL]) zLijn(ctx, p, zcol(per), 4.5 * k, 1 - 0.5 * (cz > 0.5 && per < 0.5));
    if (hartA > 0.01) zLijn(ctx, P.hart, zcol(per), 3.5 * k, hartA * (1 - 0.5 * (cz > 0.5 && per < 0.5)));
    // kleine zijtakjes (tussenribzenuwen) als context
    for (let i = 0; i < 5; i++) for (const s of [-1, 1]) { const y0 = schY + 50 * k + i * 38 * k; zLijn(ctx, [[cx, y0], [cx + s * 40 * k, y0 + 8 * k], [cx + s * 74 * k, y0 + 22 * k]], zcol(per), 1.6 * k, 0.55 * (1 - 0.5 * (cz > 0.5 && per < 0.5))); }
    zLijn(ctx, merg, zcol(cz), 11 * k, 1 - 0.5 * (per > 0.5 && cz < 0.5)); ctx.restore(); }
  ctx.restore(); return P; }
function hartje(ctx, x, y, r, beat = 0) { const p = Math.pow(Math.max(0, Math.sin(beat)), 3), kk = 1 + 0.08 * p; ctx.save(); ctx.translate(x, y); ctx.scale(kk, kk); ctx.rotate(-0.35);
  ctx.beginPath(); ctx.moveTo(0, r * 0.95); ctx.bezierCurveTo(-r * 1.1, r * 0.2, -r * 0.95, -r * 0.75, -r * 0.2, -r * 0.62); ctx.bezierCurveTo(0, -r * 0.58, r * 0.1, -r * 0.45, r * 0.18, -r * 0.4); ctx.bezierCurveTo(r * 0.75, -r * 0.85, r * 1.15, -r * 0.15, 0, r * 0.95); ctx.closePath(); shape(ctx, Z1.hart, Z1.hartL, 2);
  ctx.strokeStyle = '#7E8FBF'; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * 0.12, -r * 0.55); ctx.lineTo(-r * 0.16, -r * 1.05); ctx.stroke(); ctx.strokeStyle = Z1.hartL; ctx.beginPath(); ctx.moveTo(r * 0.12, -r * 0.5); ctx.quadraticCurveTo(r * 0.2, -r * 1.05, r * 0.55, -r * 0.95); ctx.stroke(); ctx.restore(); }

// ---------- hersenen in een zoomcirkel naast het hoofd (bibliotheek: hoofdHersenen) ----------
// Ontwerpcoördinaten van hoofdHersenen: oorsprong = hypothalamus, kijkt naar rechts. Handige punten (× s): oog (+200,+20), achterhoofdskwab (-250,-90), motorische schors (-30,-250), hersenstam/ruggenmerg (-40,+300).
function breinZoom(ctx, zx, zy, zr, sx, sy, a = 1, o = {}) { if (a <= 0.01) return null; const s = zr / 360, ox = zx + 10 * s, oy = zy - 10 * s, B = (px, py) => [ox + px * s, oy + py * s];
  zoomCircle(ctx, zx, zy, zr, sx, sy, o.caption === undefined ? 'hoofd in doorsnede' : o.caption, a, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr); hoofdHersenen(ctx, ox, oy, s, {}); if (o.binnen) o.binnen(B, s); });
  return { B, s, zx, zy, zr }; }

// ---------- vraag vooraf (zelfde opmaak als de vraagkaart van de speler); opties verschijnen op hun woord ----------
function vraagVoor(ctx, t, q, id, cues) { bg(ctx, 'schema'); const seg = (window.FILMDATA.segments || []).find(s => s.id === id); if (!seg) return;
  text(ctx, 'Wat denk je?', 120, 200, fTitel(64), C.text); ctx.save(); ctx.globalAlpha *= ramp(t, q.at('je?') + 0.1, 0.4); ctx.font = fTekst(40, 600); ctx.fillStyle = C.text; wrap(ctx, seg.q, 120, 290, 1680, 52); ctx.restore();
  seg.options.forEach((op, i) => { const y = 430 + i * 112, aa = ramp(t, q.at(cues[i][0], cues[i][1] || 1) - 0.15, 0.4); if (aa <= 0.01) return; ctx.save(); ctx.globalAlpha *= aa;
    roundRect(ctx, 120, y, 1680, 96, 14); shape(ctx, C.fill, C.line, 1.5); text(ctx, String.fromCharCode(97 + i), 160, y + 62, fMeta(32), C.grain); text(ctx, op, 220, y + 62, fTekst(36), C.text); ctx.restore(); }); }

// ---------- oog in doorsnede (van opzij, licht komt van links) ----------
function oogDoorsnede(ctx, x, y, r, o = {}) { const { a = 1, netvlies = 0, zenuw = 1 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  // oogzenuw naar rechts
  const zP = zGlad([[x + r * 0.92, y + r * 0.12], [x + r * 1.35, y + r * 0.2], [x + r * 1.9, y + r * 0.12]]); if (zenuw > 0.01) zLijn(ctx, zP, Z1.zenuw, r * 0.2, zenuw);
  dot(ctx, x, y, r, '#E9E4DA', '#B9B3A6', 2); // harde oogrok
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 5, 0, 6.283); ctx.clip(); dot(ctx, x, y, r * 0.93, '#3A4A66'); // glasachtig lichaam (donker)
  ctx.strokeStyle = netvlies > 0.5 ? C.goud : '#C98C99'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.arc(x, y, r * 0.88, -1.25, 1.25); ctx.stroke(); ctx.restore(); // netvlies achterin
  // hoornvlies, iris, lens
  ctx.beginPath(); ctx.ellipse(x - r * 0.93, y, r * 0.22, r * 0.5, 0, Math.PI / 2, Math.PI * 1.5); shape(ctx, rgba('#BFE0F0', 0.25), '#BFE0F0', 2);
  ctx.strokeStyle = '#5B7FA6'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.moveTo(x - r * 0.8, y - r * 0.5); ctx.lineTo(x - r * 0.8, y - r * 0.17); ctx.moveTo(x - r * 0.8, y + r * 0.17); ctx.lineTo(x - r * 0.8, y + r * 0.5); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x - r * 0.62, y, r * 0.16, r * 0.34, 0, 0, 6.283); shape(ctx, rgba('#EAF3F8', 0.6), '#C9D6E0', 1.5);
  ctx.restore(); return { netvlies: [x + r * 0.86, y], zenuwP: zP, voor: [x - r * 1.1, y] }; }
// lichtstralen van een punt naar het netvlies (gebundeld door de lens)
function lichtStralen(ctx, from, oog, r, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#F2E6B8'; ctx.lineWidth = 3; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -u * 60;
  for (const dy of [-0.32, 0, 0.32]) { const L = [oog[0] - r * 0.62, oog[1] + dy * r]; const T = [oog[0] + r * 0.86, oog[1] - dy * 0.15 * r]; ctx.beginPath(); ctx.moveTo(from[0], from[1]); ctx.lineTo(L[0], L[1]); ctx.lineTo(T[0], T[1]); ctx.stroke(); } ctx.restore(); }

// ---------- receptoren in het netvlies (zoom): staafjes en kegeltjes, licht valt in, impuls gaat weg ----------
function netvliesZoom(ctx, x, y, w, o = {}) { const { a = 1, licht = 0, imp = 0, hl = -1, t = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; const n = 7, dx = w / n;
  const cel = []; for (let i = 0; i < n; i++) { const cx = x - w / 2 + dx * (i + 0.5); const kegel = i % 3 === 1; cel.push([cx, kegel]);
    const top = y - 120, bot = y + 60; ctx.save(); if (hl === i) { ctx.shadowColor = 'transparent'; }
    if (kegel) { ctx.beginPath(); ctx.moveTo(cx - 14, bot); ctx.lineTo(cx - 14, y - 20); ctx.lineTo(cx, y - 80); ctx.lineTo(cx + 14, y - 20); ctx.lineTo(cx + 14, bot); ctx.closePath(); }
    else { roundRect(ctx, cx - 10, top, 20, bot - top, 9); }
    shape(ctx, hl === i ? rgba(C.goud, 0.35) : '#4E5F7E', hl === i ? C.goud : '#8FA0B5', 1.5); dot(ctx, cx, bot + 24, 13, '#5A5470', '#9C94B0', 1.5); ctx.restore(); }
  // lichtpijlen van boven (licht = prikkel)
  if (licht > 0.01) for (let i = 0; i < n; i += 1) { const [cx] = cel[i]; const yy = y - 230 + ((t * 120 + i * 37) % 70); ctx.save(); ctx.globalAlpha *= licht; ctx.strokeStyle = '#F2E6B8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, yy); ctx.lineTo(cx, yy + 40); ctx.stroke(); zPijlkop(ctx, [[cx, yy], [cx, yy + 20], [cx, yy + 44]], '#F2E6B8', 1, 12); ctx.restore(); }
  // zenuwcel onder de receptor: impuls naar rechts
  const P = zGlad([[cel[3][0], y + 37], [cel[3][0] + 60, y + 110], [x + w / 2 + 40, y + 120], [x + w / 2 + 160, y + 110]]);
  zLijn(ctx, P, Z1.zenuw, 5); if (imp > 0) zVuur(ctx, P, imp, 1, 5);
  ctx.restore(); return { cel, P }; }

// ---------- zenuw in doorsnede: bundels (perineurium) vol uitlopers met myeline, een bloedvaatje ----------
function zenuwDoorsnede(ctx, x, y, r, o = {}) { const { a = 1, hl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  dot(ctx, x, y, r, '#5C5468', '#8E86A0', 2); // epineurium (bindweefsel)
  const bundels = [[-0.36, -0.3, 0.42], [0.34, -0.32, 0.38], [-0.3, 0.38, 0.4], [0.36, 0.34, 0.4], [0.02, 0.02, 0.26]];
  let ix = 0, hlPos = null; for (const [bx, by, br] of bundels) { const BX = x + bx * r, BY = y + by * r, BR = br * r; dot(ctx, BX, BY, BR, '#3E384C', '#B2A9C4', 2.2);
    const pts = []; for (let k = 0; k < 400 && pts.length < 46; k++) { const an = hash(k * 3.1 + ix * 17) * 6.283, d = Math.sqrt(hash(k * 7.7 + ix * 5)) * (BR - 13); const px = BX + Math.cos(an) * d, py = BY + Math.sin(an) * d, rr = 6 + hash(k + ix) * 5;
      if (pts.every(p => Math.hypot(p[0] - px, p[1] - py) > p[2] + rr + 1.5)) pts.push([px, py, rr]); }
    for (const [px, py, rr] of pts) { dot(ctx, px, py, rr, '#ECE6D8', '#D2C8B4', 0.8); dot(ctx, px, py, rr * 0.45, '#8C8070'); }
    if (ix === 1 && pts.length) hlPos = pts[3] || pts[0]; ix++; }
  dot(ctx, x - 0.02 * r, y - 0.62 * r, r * 0.06, '#B8333B', '#D9555B', 1.5); dot(ctx, x + 0.66 * r, y + 0.0 * r, r * 0.045, '#B8333B', '#D9555B', 1.5);
  if (hl > 0.01 && hlPos) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hlPos[0], hlPos[1], hlPos[2] + 6, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return hlPos; }

// ---------- ruggenmerg in doorsnede: witte stof, grijze stof (vlinder), achterwortel met ganglion, voorwortel ----------
// Rugzijde boven. Geeft punten terug: achterhoorn, voorhoorn, midden, ganglion, zenuw (waar beide wortels samenkomen), wortelpaden.
function ruggenmergDoorsnede(ctx, x, y, s = 1, o = {}) { const { a = 1, grijsHl = 0, witHl = 0, cellen = 0, wortels = 1, rechts = 1 } = o; if (a <= 0.01) return {}; const rx = 170 * s, ry = 130 * s;
  ctx.save(); ctx.globalAlpha *= a; const E = (an) => [x + Math.cos(an) * rx, y + Math.sin(an) * ry];
  const ach = E(-0.62), voo = E(0.55), gang = [x + 1.48 * rx, y - 0.62 * ry], zen = [x + 2.05 * rx, y - 0.05 * ry];
  const achP = zGlad([ach, [x + 1.2 * rx, y - 0.76 * ry], gang, [x + 1.78 * rx, y - 0.4 * ry], zen]), vooP = zGlad([voo, [x + 1.35 * rx, y + 0.42 * ry], [x + 1.8 * rx, y + 0.18 * ry], zen]);
  if (wortels > 0.01) { ctx.save(); ctx.globalAlpha *= wortels; zLijn(ctx, achP, Z1.zenuw, 20 * s); zLijn(ctx, vooP, Z1.zenuw, 20 * s); ctx.beginPath(); ctx.ellipse(gang[0], gang[1], 32 * s, 22 * s, -0.25, 0, 6.283); shape(ctx, '#C8BEA2', Z1.zenuwD, 2); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); shape(ctx, witHl > 0.5 ? _mixHex(Z1.wit, C.goud, 0.25) : Z1.wit, witHl > 0.5 ? C.goud : Z1.witR, witHl > 0.5 ? 3 : 2);
  // spleten midden boven en onder
  ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.moveTo(x - 4 * s, y - ry - 2); ctx.lineTo(x, y - ry * 0.55); ctx.lineTo(x + 4 * s, y - ry - 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 12 * s, y + ry + 2); ctx.lineTo(x, y + ry * 0.62); ctx.lineTo(x + 12 * s, y + ry + 2); ctx.fill();
  const half = [[0, -0.14], [0.12, -0.16], [0.26, -0.4], [0.36, -0.74], [0.46, -0.7], [0.4, -0.38], [0.32, -0.1], [0.46, 0.04], [0.64, 0.3], [0.62, 0.56], [0.42, 0.64], [0.22, 0.46], [0.1, 0.24], [0, 0.22]];
  const vl = half.concat(half.slice(1, -1).reverse().map(p => [-p[0], p[1]])).map(p => [x + p[0] * rx, y + p[1] * ry]);
  anPath(ctx, vl, true); shape(ctx, grijsHl > 0.5 ? _mixHex(Z1.grijs, C.goud, 0.3) : Z1.grijs, grijsHl > 0.5 ? C.goud : Z1.grijsR, grijsHl > 0.5 ? 3 : 1.5);
  dot(ctx, x, y + 0.04 * ry, 5 * s, C.bgSchema);
  if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; for (let i = 0; i < 26; i++) { const p = [hash(i * 2.3) * 2 - 1, hash(i * 5.1 + 1) * 1.3 - 0.6]; const sx = Math.sign(p[0]) || 1; const px = x + (0.12 + Math.abs(p[0]) * 0.42) * sx * rx, py = y + p[1] * ry; dot(ctx, px, py, 5 * s, Z1.cel, '#C9C2D6', 1); } ctx.restore(); }
  ctx.restore();
  return { achterhoorn: [x + 0.36 * rx, y - 0.5 * ry], voorhoorn: [x + 0.48 * rx, y + 0.38 * ry], midden: [x + 0.2 * rx, y - 0.02 * ry], ganglion: gang, zenuw: zen, achP, vooP, rx, ry, wit: [x - 0.85 * rx, y - 0.1 * ry], grijs: [x - 0.42 * rx, y + 0.3 * ry] }; }

// ---------- voorhoofd-oog van voren (pupil groter of kleiner) ----------
function oogVoor(ctx, x, y, r, pupil = 0.35, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - r * 1.6, y); ctx.quadraticCurveTo(x, y - r * 1.25, x + r * 1.6, y); ctx.quadraticCurveTo(x, y + r * 1.25, x - r * 1.6, y); ctx.closePath(); shape(ctx, '#ECE6DC', '#C9B49A', 2);
  ctx.save(); ctx.clip(); dot(ctx, x, y, r * 0.78, '#6E8A5A', '#4E6A40', 2); dot(ctx, x, y, r * 0.78 * pupil * 1.6, '#121A26'); dot(ctx, x - r * 0.25, y - r * 0.25, r * 0.1, '#F2F2EE'); ctx.restore(); ctx.restore(); }
// ---------- hand met zweetdruppels (van voren, eenvoudig) ----------
function handKlam(ctx, x, y, s, klam = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const huid = '#E3B896', rand = '#C9966F';
  roundRect(ctx, -46, -20, 92, 96, 34); shape(ctx, huid, rand, 2); const vingers = [[-34, -78, 17, 70], [-12, -96, 18, 86], [10, -92, 18, 82], [31, -72, 16, 62]];
  for (const [vx, vy, vw, vh] of vingers) { roundRect(ctx, vx - vw / 2, vy, vw, vh, vw / 2); shape(ctx, huid, rand, 2); }
  ctx.beginPath(); ctx.ellipse(-58, 18, 16, 40, -0.7, 0, 6.283); shape(ctx, huid, rand, 2);
  for (let i = 0; i < 6; i++) { const u = clamp(klam * 1.4 - i * 0.12, 0, 1); if (u <= 0) continue; const px = -30 + (i % 3) * 30, py = 0 + Math.floor(i / 3) * 34 + u * 10; ctx.save(); ctx.globalAlpha *= u; ctx.beginPath(); ctx.moveTo(px, py - 12); ctx.quadraticCurveTo(px + 8, py + 2, px, py + 6); ctx.quadraticCurveTo(px - 8, py + 2, px, py - 12); shape(ctx, '#BFE0F0', '#8FC4DE', 1); ctx.restore(); }
  ctx.restore(); }
// ---------- pedaal en hartslagmeter (model) ----------
function pedaal(ctx, x, y, diep, col, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + 60); ctx.scale(1.5, 1.5); ctx.translate(-x, -y - 60); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 70, y + 100); ctx.lineTo(x + 70, y + 100); ctx.stroke();
  const an = lerp(-0.55, 0.05, diep); ctx.save(); ctx.translate(x - 40, y + 96); ctx.rotate(an); roundRect(ctx, 0, -18, 120, 26, 8); shape(ctx, rgba(col, 0.35 + 0.5 * diep), col, 2); ctx.restore();
  dot(ctx, x - 40, y + 96, 7, C.line); text(ctx, naam, x + 10, y + 150, fTekst(28, 700), col, 'center'); ctx.restore(); }
function hartslagMeter(ctx, x, y, r, bpm, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an0 = Math.PI * 0.8, an1 = Math.PI * 2.2, v = clamp((bpm - 40) / 140, 0, 1);
  ctx.lineCap = 'round'; ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(x, y, r, an0, an1); ctx.stroke(); ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.arc(x, y, r, an0, lerp(an0, an1, v)); ctx.stroke();
  for (const b of [60, 100, 140, 180]) { const an = lerp(an0, an1, (b - 40) / 140); metaText(ctx, String(b), x + Math.cos(an) * (r + 40), y + Math.sin(an) * (r + 40) + 10, C.text2, 'center', 24); }
  text(ctx, String(Math.round(bpm)), x, y + 18, fTekst(64, 700), C.text, 'center'); metaText(ctx, 'slagen per minuut · model', x, y + r + 60, C.grain, 'center', 22); ctx.restore(); }
function _mixHexZ(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
if (typeof _mixHex === 'undefined') { window._mixHex = _mixHexZ; }

// ---------- been van opzij voor de kniepeesreflex (zittend, onderbeen hangt) ----------
function beenKnie(ctx, x, y, s, zwaai = 0, a = 1) { if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; const huid = '#E3B896', rand = '#C9966F', broek = '#3F5F86';
  // dijbeen horizontaal naar rechts (zit op een tafelrand), knie bij (x, y)
  roundRect(ctx, x - 300 * s, y - 52 * s, 300 * s, 92 * s, 40 * s); shape(ctx, broek, '#5A7AA2', 2);
  const an = Math.PI / 2 - 0.08 - zwaai * 0.75; ctx.save(); ctx.translate(x, y); ctx.rotate(an - Math.PI / 2);
  roundRect(ctx, -34 * s, -10 * s, 68 * s, 300 * s, 30 * s); shape(ctx, huid, rand, 2); ctx.beginPath(); ctx.ellipse(18 * s, 304 * s, 70 * s, 26 * s, 0, 0, 6.283); shape(ctx, '#3A3F4A', '#5A606C', 2); ctx.restore();
  dot(ctx, x + 6 * s, y - 4 * s, 30 * s, '#E9C4A2', rand, 2); // knie
  const pees = [x + 22 * s, y + 46 * s]; ctx.restore(); return { pees }; }
function hamertje(ctx, x, y, s, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(150 * s, -40 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-14 * s, -24 * s); ctx.lineTo(10 * s, 24 * s); ctx.lineWidth = 0; ctx.stroke(); roundRect(ctx, -22 * s, -30 * s, 30 * s, 60 * s, 12 * s); shape(ctx, '#B8333B', '#D9555B', 2); ctx.restore(); }
// focusring (goud of betekeniskleur), zonder gloed
function ring(ctx, x, y, r, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
