// Evolutie v2 · film 5 — eigen hulpfuncties voor de animatie (Claude, 23 okt 2026). Geladen na lib_dieren, vóór sb5.js.
const f5fr = (u) => u - Math.floor(u);
const f5u = (t, t0, t1) => clamp((t - t0) / Math.max(0.001, t1 - t0), 0, 1);
// oude tekst eerst weg, dan de nieuwe (één tekstbalk tegelijk)
function f5wissel(t, T, d = 0.35) { return [1 - ramp(t, T - d, d), ramp(t, T, d)]; }
function f5segDur(id) { try { const s = DATA.segments.find(x => x.id === id); return s && s.dur ? s.dur : 0; } catch (e) { return 0; } }

// ---- pot met vaste kleurverdeling: o.vis = aantal zichtbare knikkers (vullen van onder naar boven zonder herschudden) ----
function pot(ctx, x, y, s = 1, o = {}) {
  const { p = 0.5, n = 60, seed = 1, label = null, meta = null, a = 1, extra = null, deksel = false, glans = true, vis = null, gloed = 0, verberg = null } = o;
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 260, h = 300, r = 34; const kr = 13, kol = 9; const kleuren = [];
  const nE = extra ? extra.reduce((t, e) => t + e[1], 0) : 0; const n1 = Math.round((n - nE) * p);
  for (let i = 0; i < n; i++) kleuren.push(i < n1 ? 'a1' : i < n - nE ? 'a2' : 'x');
  const perm = []; for (let i = 0; i < n; i++) perm.push(i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(hash(seed * 31 + i * 7) * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  const exKleur = []; if (extra) extra.forEach(([k, m]) => { for (let q = 0; q < m; q++) exKleur.push(k); });
  const zicht = vis == null ? n : vis;
  ctx.save(); roundRect(ctx, -w / 2 + 6, -h + 40, w - 12, h - 46, r - 6); ctx.clip();
  for (let i = 0; i < n; i++) {
    if (i >= zicht) break;
    if (verberg && verberg.includes(i)) continue;
    const rij = Math.floor(i / kol), k = i % kol, verschuif = (rij % 2) * kr;
    const kx = -w / 2 + 26 + k * (kr * 2.25) + verschuif + (hash(seed + i * 3.1) - 0.5) * 5;
    const ky = -18 - rij * (kr * 1.95) + (hash(seed + i * 5.7) - 0.5) * 4;
    if (ky < -h + 60) break;
    const src = perm[i], soort = kleuren[src];
    let f, rr; if (soort === 'a1') { f = EVO.a1; rr = EVO.a1R; } else if (soort === 'a2') { f = EVO.a2; rr = EVO.a2R; } else { f = exKleur[(src - (n - nE)) % exKleur.length]; rr = _lt(f, 0.4); }
    circ(ctx, kx, ky, kr, f, rr, 2);
    circ(ctx, kx - kr * 0.35, ky - kr * 0.35, kr * 0.22, 'rgba(255,255,255,0.35)');
  }
  if (gloed > 0.01) { ctx.fillStyle = rgba(C.koraal, 0.42 * gloed); ctx.fillRect(-w / 2, -h, w, h); }
  ctx.restore();
  ctx.strokeStyle = EVO.glas; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-w / 2 + 34, -h + 10); ctx.lineTo(-w / 2 + 34, -h + 34); ctx.quadraticCurveTo(-w / 2, -h + 44, -w / 2, -h + 80);
  ctx.lineTo(-w / 2, -r); ctx.quadraticCurveTo(-w / 2, 0, -w / 2 + r, 0); ctx.lineTo(w / 2 - r, 0); ctx.quadraticCurveTo(w / 2, 0, w / 2, -r);
  ctx.lineTo(w / 2, -h + 80); ctx.quadraticCurveTo(w / 2, -h + 44, w / 2 - 34, -h + 34); ctx.lineTo(w / 2 - 34, -h + 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 + 26, -h + 10); ctx.lineTo(w / 2 - 26, -h + 10); ctx.stroke();
  if (glans) { ctx.strokeStyle = 'rgba(242,242,238,0.22)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w / 2 + 22, -h + 100); ctx.lineTo(-w / 2 + 22, -70); ctx.stroke(); }
  if (deksel) { roundRect(ctx, -w / 2 + 18, -h - 12, w - 36, 24, 8); shape(ctx, '#3A4A66', '#8FA0B5', 2); }
  ctx.restore();
  if (label) { ctx.save(); ctx.globalAlpha *= a; text(ctx, label, x, y + 52 * Math.max(0.7, s), fTekst(36, 600), C.text, 'center'); if (meta) metaText(ctx, meta, x, y + 52 * Math.max(0.7, s) + 34, C.grain, 'center', 26); ctx.restore(); }
}
const f5potTop = (y, s) => y - 300 * s + 10 * s;

// ---- knikker langs een boog ----
function f5boog(x0, y0, x1, y1, u, hb) { u = clamp(u, 0, 1); return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u - hb * Math.sin(Math.PI * u)]; }
function f5vlieg(ctx, x0, y0, x1, y1, u, r, k, a = 1, hb = 120) { if (u <= 0 || a <= 0.01) return; const [x, y] = f5boog(x0, y0, x1, y1, u, hb); knikker(ctx, x, y, r, k, a); }

// ---- naam met toelichting die later verschijnt (zelfde naam blijft staan) ----
function f5naam(ctx, naam, meta, x, y, a, am, align = 'left', col = C.text) { if (a <= 0.01) return; if (am < 0.99) naamBij(ctx, naam, null, x, y, a * (1 - am), align, col); if (am > 0.01) naamBij(ctx, naam, meta, x, y, a * am, align, col); }

// ---- groeiende pijl en zigzag ----
function f5pijl(ctx, x1, y1, x2, y2, g, col, a = 1, lw = 4) { if (g <= 0.01 || a <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, g), lerp(y1, y2, g), col, a, lw); }
function f5zig(ctx, x1, y1, x2, y2, g, kleur, lw = 5, a = 1) { if (g <= 0.01 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x1 - 30, 0, (x2 - x1) * g + 30 + (g > 0.97 ? 40 : 0), H); ctx.clip(); zigzag(ctx, x1, y1, x2, y2, kleur, lw); ctx.restore(); }

// ---- lopen zonder glijden: lineair, een geheel aantal passen ----
function f5gang(t, t0, t1, x0, x1, pas) { const d = Math.sign(x1 - x0) || 1, n = Math.max(1, Math.round(Math.abs(x1 - x0) / pas)), L = n * pas, u = clamp((t - t0) / (t1 - t0), 0, 1);
  return { x: x0 + d * u * L, fase: f5fr(u * n), loopt: t > t0 && t < t1, kijk: d }; }
// heen en weer lopen in een verblijf: één pas heen, pauze, één pas terug, pauze
function f5ijs(T, xa, pas, hz, pauze, off = 0) { const Tw = 1 / hz, P = 2 * (Tw + pauze); let u = ((T + off) % P + P) % P;
  if (u < Tw) return { x: xa + pas * u / Tw, fase: u / Tw, kijk: 1, loopt: true }; u -= Tw;
  if (u < pauze) return { x: xa + pas, fase: 0, kijk: 1, loopt: false }; u -= pauze;
  if (u < Tw) return { x: xa + pas - pas * u / Tw, fase: u / Tw, kijk: -1, loopt: true };
  return { x: xa, fase: 0, kijk: -1, loopt: false }; }
const F5_LUIP_PAS = 86 * 4.5; // pas jachtluipaard (cm) × px/cm bij s = 1

// ---- atol (Macro-nacht) met golven en wuivende palmen; vult ook buiten beeld (camerabeweging) ----
function atolMacro(ctx, o = {}) { const { storm = 0, t = 0 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(-1200, -200, W + 2400, H + 400); ctx.fillStyle = '#243656'; ctx.fillRect(-1200, 420, W + 2400, 200);
  if (storm > 0.01) { ctx.fillStyle = rgba('#0E1626', 0.45 * storm); ctx.fillRect(-1200, -200, W + 2400, 820); }
  ctx.fillStyle = '#25456E'; ctx.fillRect(-1200, 600, W + 2400, H - 400);
  ctx.strokeStyle = rgba('#5B86B8', 0.5); ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) { const yy = 650 + i * 30; ctx.beginPath(); for (let k = -18; k <= 48; k++) { const px = k * 66, py = yy + Math.sin(k * 0.9 + i - t * (0.8 + storm * 2.2)) * (4 + storm * 12); k > -18 ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  vul(ctx, [[300, 612], [520, 590], [900, 584], [1350, 588], [1620, 606], [1640, 620], [280, 622]], '#C9B07A');
  vul(ctx, [[360, 600], [560, 572], [900, 566], [1300, 570], [1560, 598], [1560, 606], [360, 606]], '#3A5540');
  const palmen = [[420, 600, 150, 0.12], [520, 590, 190, -0.1], [640, 584, 165, 0.18], [760, 580, 210, 0.05], [905, 576, 175, -0.14], [1010, 578, 200, 0.16], [1130, 580, 160, 0.02], [1240, 584, 195, -0.12], [1380, 592, 150, 0.2], [1490, 600, 170, -0.06]];
  for (const [px, py, ph, b] of palmen) palm(ctx, px, py, ph, b + storm * 0.35 + 0.025 * Math.sin(t * 1.1 + px * 0.01) + storm * 0.07 * Math.sin(t * 4.5 + px * 0.02));
  if (storm > 0.01) { ctx.save(); ctx.strokeStyle = rgba('#AFC0D0', 0.45 * storm); ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < 46; i++) { const x0 = hash(i * 3.3) * (W + 400), y0 = ((hash(i * 7.1) * 900 + t * 900) % 900) - 60; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 - 45, y0 + 105); ctx.stroke(); }
    ctx.restore(); }
}

// ---- frequentiegrafiek die zich generatie voor generatie tekent ----
// o.tot = aantal getekende generaties (getal of array per lijn); o.assen = alpha van de assen; o.kop = stip aan de kop van de lijn
function f5graf(ctx, x, y, w, h, lijnen, o = {}) {
  const { gen = 60, kleur = C.goud, a = 1, titel = null, markeer = -1, mA = 1, kleuren = null, lw = 3.5, tot = null, assen = 1, kop = false, la = null, blauw = true } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.globalAlpha *= assen;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w + 10, y); ctx.stroke();
  metaText(ctx, '100%', x - 16, y - h + 10, C.text2, 'right', 28); metaText(ctx, '50%', x - 16, y - h / 2 + 10, C.text2, 'right', 28); metaText(ctx, '0%', x - 16, y + 10, C.text2, 'right', 28);
  if (blauw) knikker(ctx, x - 112, y - h, 11, EVO.a1);
  metaText(ctx, 'generatie', x + w, y + 46, C.text2, 'right', 28); metaText(ctx, '0', x, y + 46, C.text2, 'left', 28); metaText(ctx, String(gen), x + w - 190, y + 46, C.text2, 'right', 28);
  if (titel) metaText(ctx, titel, x, y - h - 40, C.grain, 'left', 28);
  ctx.restore();
  lijnen.forEach((L, i) => { const n = tot == null ? gen : Array.isArray(tot) ? tot[i] : tot; if (n <= 0) return; const k = kleuren ? kleuren[i] : kleur;
    const dim = markeer >= 0 && i !== markeer; const al = (la ? la[i] : 1) * (dim ? lerp(1, 0.3, mA) : 1); if (al <= 0.01) return;
    ctx.strokeStyle = rgba(k, al); ctx.lineWidth = (!dim && markeer >= 0) ? lw + 1.5 * mA : lw; ctx.lineJoin = 'round'; ctx.beginPath();
    const nn = Math.min(gen, n), g0 = Math.floor(nn); let hx = x, hy = y - L[0] * h;
    for (let g = 0; g <= g0; g++) { const px = x + g / gen * w, py = y - L[g] * h; g ? ctx.lineTo(px, py) : ctx.moveTo(px, py); hx = px; hy = py; }
    if (nn > g0 && g0 + 1 < L.length) { const f = nn - g0; hx = x + (g0 + f) / gen * w; hy = y - lerp(L[g0], L[g0 + 1], f) * h; ctx.lineTo(hx, hy); }
    ctx.stroke(); if (kop && nn < gen) circ(ctx, hx, hy, 6, rgba(k, al)); });
  ctx.restore();
}
function f5kopPunt(x, y, w, h, L, n, gen = 60) { const nn = clamp(n, 0, gen), g0 = Math.floor(nn), f = nn - g0; const p = g0 + 1 < L.length ? lerp(L[g0], L[g0 + 1], f) : L[g0]; return [x + nn / gen * w, y - p * h]; }
function f5vast(L) { for (let g = 0; g < L.length; g++) if (L[g] <= 0 || L[g] >= 1) return g; return -1; }

// ---- genotypebalk die per vak opbouwt ----
function f5gBalk(ctx, x, y, w, p, o = {}) { const { h = 70, a = 1, zicht = [1, 1, 1] } = o; if (a <= 0.01) return; const q = 1 - p;
  const D = [[p * p, EVO.a1, 'p²'], [2 * p * q, '#8FA67F', '2pq'], [q * q, EVO.a2, 'q²']];
  ctx.save(); ctx.globalAlpha *= a; let xx = x;
  D.forEach(([f, k, n], i) => { const ww = w * f, z = zicht[i]; if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; const gw = (ww - 4) * (0.6 + 0.4 * ease(z));
      roundRect(ctx, xx + 2 + (ww - 4 - gw) / 2, y, gw, h, 10); shape(ctx, rgba(k, 0.85), _lt(k, 0.35), 2); if (ww > 90) text(ctx, n, xx + ww / 2, y + h / 2 + 14, fTekst(40, 700), C.bgMicro, 'center'); ctx.restore(); }
    xx += ww; });
  ctx.restore(); }

// ---- vier krachten rond één pot (opbouw per kracht) ----
// o = { p, potA, vis, sel:[a, groei, meta], drift:[...], stroom:[...], mut:[...], t, stroomStroom, mutKnikker:u, extra }
function f5vier(ctx, o) { const { p = 0.6, potA = 1, vis = null, t = 0, sel = [0, 0, 0], drift = [0, 0, 0], stroom = [0, 0, 0], mut = [0, 0, 0], stroomLoop = 0, mutU = -1, mutIn = 0, vraag = 0 } = o;
  pot(ctx, 960, 760, 1.2, { p: 0.6, n: 70, seed: 9, a: potA, vis, extra: mutIn > 0.5 ? [[K.mutatie, 1]] : null }); allelBalk(ctx, 800, 800, 320, p, { procent: false, a: potA });
  if (sel[0] > 0.01) { f5pijl(ctx, 1460, 420, 1150, 560, sel[1], K.selectie, sel[0], 5); f5naam(ctx, 'selectie', 'hangt af van de omgeving', 1600, 360, sel[0], sel[2], 'center', K.selectie); }
  if (drift[0] > 0.01) { f5zig(ctx, 420, 420, 770, 560, drift[1], K.drift, 5, drift[0]); f5naam(ctx, 'drift', 'toeval, geen richting', 400, 400, drift[0], drift[2], 'right', K.drift); }
  if (stroom[0] > 0.01) { f5pijl(ctx, 420, 740, 760, 690, stroom[1], K.stroom, stroom[0], 5); f5pijl(ctx, 760, 730, 420, 800, stroom[1], K.stroom, stroom[0], 5);
    f5naam(ctx, 'genenstroom', 'allelen erin en eruit', 400, 836, stroom[0], stroom[2], 'right', _lt(K.stroom, 0.3));
    if (stroomLoop > 0.01) for (let k = 0; k < 3; k++) { const u = f5fr(t * 0.45 + k / 3), fa = Math.sin(Math.PI * u) * stroomLoop * stroom[0];
      knikker(ctx, lerp(440, 740, u), lerp(736, 694, u) - 22, 11, k % 2 ? EVO.a2 : EVO.a1, fa); knikker(ctx, lerp(740, 440, u), lerp(734, 796, u) - 22, 11, k % 2 ? EVO.a1 : EVO.a2, fa); } }
  if (mut[0] > 0.01) { const [mx, my] = mutU < 0 ? [1300, 640] : [lerp(1300, 1080, ease(mutU)), lerp(640, 690, ease(mutU)) - 60 * Math.sin(Math.PI * mutU)];
    if (mutIn < 0.5) knikker(ctx, mx, my, 18, K.mutatie, mut[0] * (mutU > 0.85 ? (1 - mutU) / 0.15 : 1)); f5pijl(ctx, 1280, 660, 1150, 720, mut[1], K.mutatie, mut[0], 4);
    f5naam(ctx, 'mutatie', 'zeldzaam, nieuwe knikker', 1340, 610, mut[0], mut[2], 'left', _lt(K.mutatie, 0.3)); }
  if (vraag > 0.01) { ctx.save(); ctx.globalAlpha *= vraag; text(ctx, '?', 960, 330, fTitel(150), C.goud, 'center'); ctx.restore(); }
}

// ---- telraster (kleine rechthoekjes) dat rij voor rij verschijnt ----
function f5raster(ctx, x, y, kol, rij, dx, dy, bw, bh, zicht, spec = []) { ctx.fillStyle = rgba(C.text2, 0.3);
  for (let r = 0; r < rij; r++) { const ar = clamp(zicht * rij - r, 0, 1); if (ar <= 0) break; ctx.save(); ctx.globalAlpha *= ar; for (let k = 0; k < kol; k++) ctx.fillRect(x + k * dx, y + r * dy, bw, bh); ctx.restore(); }
  for (const [k, r, kl, a] of spec) { if (a <= 0.01) continue; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kl; ctx.fillRect(x + k * dx - 2, y + r * dy - 2, bw + 4, bh + 4); ctx.restore(); } }

// kleur van plek i in een pot (zelfde verdeling als pot())
function f5potKleur(p, n, seed, i, extra = null) { const nE = extra ? extra.reduce((t, e) => t + e[1], 0) : 0, n1 = Math.round((n - nE) * p);
  const perm = []; for (let k = 0; k < n; k++) perm.push(k); for (let k = n - 1; k > 0; k--) { const j = Math.floor(hash(seed * 31 + k * 7) * (k + 1)); [perm[k], perm[j]] = [perm[j], perm[k]]; }
  const src = perm[i]; return src < n1 ? EVO.a1 : src < n - nE ? EVO.a2 : (extra ? extra[0][0] : EVO.a2); }
// plek i in een pot (schermcoördinaten)
function f5potPlek(x, y, s, i, seed) { const kr = 13, kol = 9, rij = Math.floor(i / kol), k = i % kol, verschuif = (rij % 2) * kr;
  return [x + s * (-130 + 26 + k * (kr * 2.25) + verschuif + (hash(seed + i * 3.1) - 0.5) * 5), y + s * (-18 - rij * (kr * 1.95) + (hash(seed + i * 5.7) - 0.5) * 4)]; }
// stroom knikkers van (x0,y0) naar een pot: geeft aantal aangekomen terug en tekent de vliegende
function f5stroom(ctx, t, T0, Tdur, n, x0, y0, px, py, ps, pp, pn, pseed, o = {}) { const { vlucht = 0.7, hb = 140, r = 13, skip = [], extra = null } = o; let aan = 0;
  for (let i = 0; i < n; i++) { const ti = T0 + (n > 1 ? i * (Tdur / (n - 1)) : 0), u = (t - ti) / vlucht; if (u >= 1) { aan = i + 1; continue; } if (u <= 0 || skip.includes(i)) continue;
    const [tx, ty] = f5potPlek(px, py, ps, i, pseed); f5vlieg(ctx, x0, y0, tx, ty, ease(u), r * ps, f5potKleur(pp, pn, pseed, i, extra), 1, hb); }
  return aan; }

// bron-index -> plek in de pot (voor een knikker die op zijn eigen plek moet landen)
function f5potSlot(n, seed, src) { const perm = []; for (let k = 0; k < n; k++) perm.push(k); for (let k = n - 1; k > 0; k--) { const j = Math.floor(hash(seed * 31 + k * 7) * (k + 1)); [perm[k], perm[j]] = [perm[j], perm[k]]; } return perm.indexOf(src); }

// ---- savanne-decor (Macro-nacht): acacia en graspol ----
function f5acacia(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#2A3A2E'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4, -70); ctx.moveTo(4, -60); ctx.lineTo(-30, -95); ctx.moveTo(4, -66); ctx.lineTo(36, -100); ctx.stroke();
  ctx.fillStyle = '#2E4434'; ctx.beginPath(); ctx.ellipse(2, -108, 95, 20, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(-30, -118, 50, 14, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function f5gras(ctx, x, y, s = 1) { ctx.save(); ctx.strokeStyle = '#4E6A50'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x + i * 3 * s, y); ctx.quadraticCurveTo(x + i * 5 * s, y - 14 * s, x + i * 8 * s, y - (22 - Math.abs(i) * 3) * s); ctx.stroke(); } ctx.restore(); }

// ---- reservaten in Zuid-Afrika (s22/s23) ----
const F5R = [[220, 260, 520, 300], [1180, 230, 520, 300], [260, 610, 520, 260], [1150, 590, 560, 280]];
function f5reservaten(ctx, t, q, o = {}) { const { verschijn = false, verhuis = false } = o; const sL = 0.28, pas = F5_LUIP_PAS * sL;
  const Tv = verhuis ? q.at('verhuizen') : 0, Tp = verhuis ? q.at('pot') : 0, Tu = verhuis ? q.at('Uitwisseling') : 0, Tdr = verschijn ? q.at('drift') : 0;
  let P0 = [0.9, 0.3, 0.6, 1];
  if (verschijn) { const d = ease(f5u(t, Tdr, Tdr + 2.2)); P0 = [lerp(0.9, 1, d), lerp(0.3, 0.1, d), lerp(0.6, 0.72, d), 1]; } else P0 = [1, 0.1, 0.72, 1];
  F5R.forEach(([x, y, w, h], i) => { const a = verschijn ? ramp(t, q.at('leven') + i * 0.3, 0.5) : 1; if (a <= 0.01) return;
    reservaat(ctx, x, y, w, h, { a }); const kl = verschijn ? q.on('klein', 1, 0.4) * (1 - q.on('Kleine', 1, 0.6)) : 0;
    if (kl > 0.01) { ctx.save(); ctx.globalAlpha *= kl; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 8, y - 8, w + 16, h + 16, 30); ctx.stroke(); ctx.restore(); }
    let la = a; if (verhuis && i === 1) la = t < Tv ? 1 : lerp(1, 0.35, ramp(t, Tv, 0.4));
    const g = f5ijs(t, x + w * 0.2, pas, 1 / 1.35, 1.6 + hash(i) * 1.4, i * 2.3);
    jachtluipaard(ctx, g.x, y + h * 0.8, sL, { houding: g.loopt ? 'lopen' : 'staan', t: g.fase, kijk: g.kijk, a: la });
    let p = P0[i]; if (verhuis && i === 2) p = lerp(p, 0.55, ease(f5u(t, Tp, Tp + 1.2))); if (verhuis && i === 1) p = lerp(p, 0.25, ease(f5u(t, Tu + 0.8, Tu + 2.2)));
    pot(ctx, x + w * 0.8, y + h * 0.82, 0.55, { p, n: 12, seed: 60 + i, a }); });
  if (!verhuis) return;
  // een jachtluipaard verhuist van reservaat 2 naar reservaat 3, met twee allelen
  const A = [1300, 560], B = [760, 690], L = Math.hypot(B[0] - A[0], B[1] - A[1]), ga = q.on('verhuizen', 1, 0.6);
  f5pijl(ctx, A[0], A[1], B[0], B[1], f5u(t, Tv, Tv + 0.8), K.stroom, 1, 6);
  const Tr = Tv + 0.6, Te = Tp - 0.3, n = Math.max(1, Math.round(L / pas)), u = clamp((t - Tr) / (Te - Tr), 0, 1);
  if (t > Tr && t < Te + 0.6) { const d = u * n * pas / L, x = lerp(A[0] - 20, B[0] + 40, d), y = lerp(A[1] + 60, B[1] + 60, d), aa = 1 - ramp(t, Te, 0.5);
    jachtluipaard(ctx, x, y, sL, { houding: u < 1 ? 'lopen' : 'staan', t: u * n, kijk: -1, a: aa });
    knikker(ctx, x - 16, y - 135, 16, EVO.a2, aa); knikker(ctx, x + 20, y - 143, 16, EVO.a2, aa); }
  // allelen landen in de pot van reservaat 3
  const [px, py] = [F5R[2][0] + F5R[2][2] * 0.8, F5R[2][1] + F5R[2][3] * 0.82];
  for (let k = 0; k < 2; k++) { const uu = (t - Tp - k * 0.2) / 0.7; if (uu <= 0 || uu >= 1) continue; const [x, y] = f5boog(B[0] + 40 + (k ? 20 : -16), B[1] - 80, px, py - 50, ease(uu), 80); knikker(ctx, x, y, lerp(16, 6, uu), EVO.a2); }
  f5pijl(ctx, 780, 400, 1160, 380, f5u(t, Tu, Tu + 0.8), K.stroom, 1, 6);
  for (let k = 0; k < 2; k++) { const uu = (t - Tu - 0.6 - k * 0.25) / 1.4; if (uu <= 0 || uu >= 1) continue; const [x, y] = f5boog(800, 380, 1140, 360, ease(uu), 40); knikker(ctx, x, y, 14, EVO.a1, Math.min(1, Math.sin(Math.PI * uu) * 3)); }
}

// ---- bloedvat met cellen die sikkelvormig worden (s42, Micro) ----
function f5vat42(ctx, t, q) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
  bloedvat(ctx, [[-50, 560], [500, 520], [1000, 600], [1500, 540], [1980, 580]], 150, 0, { n: 0 });
  const sk = q.on('stijf', 1, 1.0), ab = q.at('stijf');
  const CE = [[260, 540, 0.2, 0], [520, 500, -0.3, 1], [780, 560, 0.1, 0], [1040, 600, 0.5, 1], [1300, 560, -0.2, 1], [1560, 540, 0.3, 0], [1760, 590, -0.1, 1]];
  CE.forEach(([x, y, an, s], i) => { const vrij = 1 - sk * s, dx = 14 * Math.sin(t * 0.7 + i) * vrij, dy = 6 * Math.sin(t * 1.1 + i * 2) * vrij, x2 = x + dx, y2 = y + dy, a2 = an + 0.15 * Math.sin(t * 0.9 + i) * vrij;
    if (s) { rodeBloedcel(ctx, x2, y2, 52, a2, 0, 1 - sk); sikkelcel(ctx, x2, y2, 46, a2, sk); } else rodeBloedcel(ctx, x2, y2, 52, a2, 0); });
  naamBij(ctx, 'normale rode bloedcel', null, 260, 680, q.on('rode', 1, 0.6), 'center');
  naamBij(ctx, 'sikkelcel', 'bij weinig zuurstof', 520, 380, q.on('sikkelvormig', 1, 0.6), 'center');
  if (q.on('rode', 1, 0.6) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('rode', 1, 0.6); evoSchaal(ctx, 'rode bloedcel ± 7 micrometer · vergroot'); ctx.restore(); } }

// ---- dragers van het sikkelcelallel in malariagebieden (s43/s44) ----
function f5dragersRij(ctx, t, q, T0) { const ta = q ? q.at('tien') : -99, tb = q ? q.at('veertig') : -99; const nO = q ? (t < ta ? 0 : t < tb ? 1 : 1 + Math.round(3 * ease((t - tb) / 1.2))) : 4;
  const D = [2, 6, 0, 8]; for (let i = 0; i < 10; i++) { const a = q ? ramp(t, T0 + i * 0.05, 0.3) : 1; const x = 510 + i * 100, isO = D.slice(0, nO).includes(i);
    telpop(ctx, x, 700, 150, isO ? C.oker : C.text2, a * (isO ? 1 : 0.55)); }
  naamBij(ctx, 'dragers van het sikkelcelallel', 'malariagebieden · 10 tot 40%', 960, 780, q ? q.on('draagt', 1, 0.6) : 1, 'center', EVO.a2R); }

function f5inPot(x, y, px, py, s) { return Math.abs(x - px) <= s * 100 && y >= py - s * 250; }
