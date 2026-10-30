// Celorganellen 2.0 (30 okt 2026): beeld-remake op het niveau van de beeldbank (prompt v13). Eén scènefunctie per gesproken
// segment: draw(ctx, t, q) met t = seconden in de take en q.at('woord', n) = begintijd van het n-de woord dat 'woord' bevat.
// Wereld = de alvleeskliercel uit de beeldbank (celDier); de camera (camPad/zicht in celhulp.js) zoomt en schuift erin.
// Het gevolgde enzym heeft steeds een gouden rand (C8 'één molecuul volgen').

let BODY = { cx: 960, yb: 880, h: 700 }; // anatomie-lichaam (s01), wordt per beeld op het personage gezet
function boterham(ctx, x, y, ang, s = 1) { // sneetje bruin brood met een hap eruit, in de hand (± 10 cm naast een persoon van 1,65 m)
  if (s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(ang - 0.35); ctx.scale(s, s);
  const P = () => { ctx.beginPath(); ctx.moveTo(-34, 40); ctx.lineTo(-36, -8); ctx.bezierCurveTo(-52, -26, -40, -56, -14, -52); ctx.bezierCurveTo(-6, -60, 4, -60, 10, -54);
    ctx.quadraticCurveTo(12, -38, 25, -32); ctx.quadraticCurveTo(26, -16, 38, -10); ctx.lineTo(34, 40); ctx.closePath(); };
  P(); ctx.fillStyle = '#9A6232'; ctx.fill();
  ctx.save(); ctx.translate(0, 3); ctx.scale(0.84, 0.86); P(); ctx.fillStyle = '#E2B676'; ctx.fill(); ctx.restore();
  ctx.globalAlpha *= 0.5; ctx.fillStyle = '#C98F4E'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.arc(-24 + hash(k + 40) * 40, -30 + hash(k + 60) * 58, 1.8, 0, 6.283); ctx.fill(); }
  ctx.restore();
}
function card(ctx, x, y, w, h, title, body, alpha = 1, accent = C.goud) {
  if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.bgSchema, 0.94), C.line, 1);
  if (title) text(ctx, title, x + 28, y + 52, fTekst(36, 600), accent);
  if (body) { ctx.font = fTekst(32); ctx.fillStyle = C.text; wrap(ctx, body, x + 28, y + (title ? 100 : 52), w - 56, 42); }
  ctx.restore();
}
function wrap(ctx, s, x, y, maxW, lh) { const words = s.split(' '); let line = ''; for (const w of words) { const test = line ? line + ' ' + w : w; if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = w; } else line = test; } if (line) ctx.fillText(line, x, y); return y; }
// naam bij een schermpunt p (met verschuiving), altijd binnen het beeld en boven de ondertitels
function nm(ctx, name, meta, p, dx, dy, a, align = 'left', col = C.text) { if (a <= 0.01 || !p) return; const y = clamp(p[1] + dy, 64, CAPTION_Y - (meta ? 52 : 24)); naamBij(ctx, name, meta, p[0] + dx, y, a, align, col); }
function pil(ctx, s, x, y, a, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(26); ctx.letterSpacing = '3px'; const w = ctx.measureText(s.toUpperCase()).width + 44; ctx.letterSpacing = '0px';
  roundRect(ctx, x - w / 2, y - 30, w, 48, 10); shape(ctx, rgba(C.bgSchema, 0.92), col, 1.5); metaText(ctx, s, x, y + 2, col, 'center', 26); ctx.restore(); }
// cytoplasma als achtergrond (we zitten ín een cel): vlak met weinig rustige deeltjes
let _cytoCache = null;
function cytoGrond(ctx) { if (!_cytoCache) { _cytoCache = document.createElement('canvas'); _cytoCache.width = W; _cytoCache.height = H; const g = _cytoCache.getContext('2d'); g.fillStyle = '#222D43'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) { g.fillStyle = rgba(C.grain, 0.08 + 0.06 * hash(i * 5)); g.beginPath(); g.arc(hash(i * 2 + 7) * W, hash(i * 2 + 8) * H, 1.4 + 1.2 * hash(i * 9), 0, 6.283); g.fill(); } }
  ctx.drawImage(_cytoCache, 0, 0); }

// ---- vaste punten van de route (wereld = ontwerpcoördinaten van celDier) ----
const HPOR = 10;                                                     // kernporie bovenop de kern
const RS = [-110, -262];                                             // hier bindt het ribosoom het mRNA (vrij cytoplasma)
const DOCK = erPunt(3, -1.0, 9);                                     // ribosoom vast op het buitenste ER-blad
const BUD = erPunt(3, -0.5, 5), BUDN = [Math.cos(-0.5), Math.sin(-0.5)]; // hier snoert het ER-blaasje af
const GWY = -95;                                                     // hoogte waarop het enzym door het golgisysteem gaat
function golgiX(k, wy) { const Wk = [104, 120, 126, 118, 98], yk = (2 - k) * 21, lx = (wy + 40) / 0.95; return 205 - 0.95 * (yk + 18 * (1 - Math.pow(lx / Wk[k], 2))); }
const CIS = [golgiX(0, GWY) - 6, GWY - 4], TRANSB = [golgiX(4, GWY) + 4, GWY];
const HOEK = -0.45, NAAR = celPunt(HOEK, 100.8);                     // exocytose: plek op het membraan en waar het blaasje aanlegt
const LYSO2 = [385, 70];                                             // lysosoom in celDier (LYSO[2])
const MRNA_PAD = [[-150, -110], [-149, -150], poriePunt(HPOR, 0), [-140, -215], RS, [-86, -282], [-58, -292]];
// gouden kraal (het gevolgde enzym) in het golgisysteem: zakje k (0..4, mag fractioneel)
function golgiPos(k) { const k0 = Math.floor(clamp(k, 0, 4)), k1 = Math.min(4, k0 + 1), u = ease(clamp(k, 0, 4) - k0); return [lerp(golgiX(k0, GWY), golgiX(k1, GWY), u), GWY + Math.sin(u * Math.PI) * -6]; }

// Het gevolgde enzym door de cel, op celschaal (gebruikt door s09 en s11). T = tijden van de fasen (seconden in de take).
// Geeft de schermpositie van het enzym terug (voor de zoomcirkels).
function route(ctx, V, t, T) {
  const P = V.P, s = V.s; let pos = null;
  // 1. mRNA uit de kernporie naar het ribosoom
  const mU = ramp(t, T.mrna0, T.mrna1 - T.mrna0), mA = 1 - ramp(t, T.mrnaUit ?? 1e9, 0.8);
  if (t > T.mrna0 && mA > 0.01) mrnaLangs(ctx, MRNA_PAD.map(P), 0, lerp(0.05, 1, mU), Math.max(1.6, 1.3 * s), mA, t);
  // 2. ribosoom: bindt bij RS, maakt een keten, schuift naar het ER (DOCK)
  const rA = ramp(t, T.ribo, 0.5) * (1 - ramp(t, T.riboUit ?? 1e9, 0.6));
  if (rA > 0.01) { const d = ramp(t, T.dock0, T.dock1 - T.dock0); const w = [lerp(RS[0], DOCK[0], d), lerp(RS[1], DOCK[1], d)]; const p = P(w); const an = lerp(0, Math.atan2(DOCK[1] + 10, DOCK[0] + 150) + Math.PI / 2, d);
    const n = Math.round(lerp(0, 7, ramp(t, T.keten, 2.5))); if (d < 0.99) ketenKlein(ctx, p[0], p[1] - 6 * s, -Math.PI / 2 - 0.3, n, Math.max(1.2, 1.1 * s), t, rA);
    riboKlein(ctx, p[0], p[1], Math.max(3, 5 * s), an, rA); goudRing(ctx, p[0], p[1], Math.max(9, 10 * s), rA * (1 - ramp(t, T.inER, 0.6))); if (t < T.inER) pos = p; }
  // 3. in het lumen van het ruw ER (gevouwen en gecontroleerd), dan een knop die afsnoert
  if (t >= T.inER && t < T.knop1) { const u = ramp(t, T.inER, T.knop0 - T.inER); const f = lerp(-1.0, -0.5, u); const p = P(erPunt(3, f, 0)); heldDeeltje(ctx, p[0], p[1], Math.max(2.5, 2.6 * s)); goudRing(ctx, p[0], p[1], Math.max(8, 7 * s), ramp(t, T.inER, 0.5)); pos = p; }
  if (t >= T.knop0 && t < T.reis0) { const p = P(BUD); pos = knop(ctx, p[0], p[1], BUDN[0], BUDN[1], 17 * s, ramp(t, T.knop0, T.knop1 - T.knop0) * 1.0, 'er') || pos; }
  // 4. ER-blaasje reist naar de ciskant van het golgisysteem en versmelt ermee
  if (t >= T.reis0 && t < T.cis1) { const st = [BUD[0] + BUDN[0] * 19.5, BUD[1] + BUDN[1] * 19.5]; const u = ramp(t, T.reis0, T.cis0 - T.reis0); const w = [lerp(st[0], CIS[0], u), lerp(st[1], CIS[1], u) - Math.sin(u * Math.PI) * 14];
    const k = 1 - ramp(t, T.cis0, T.cis1 - T.cis0); const p = P(w); if (k > 0.02) blaasjeHeld(ctx, p[0], p[1], 17 * s * lerp(0.35, 1, k), 'er', 1, { lading: false }); pos = p; }
  // 5. van zakje naar zakje (cis → trans)
  if (t >= T.cis1 && t < T.trans1) { const k = lerp(0, 4, ramp(t, T.zak0, T.zak1 - T.zak0)); const p = P(golgiPos(k)); heldDeeltje(ctx, p[0], p[1], Math.max(2.5, 2.6 * s)); goudRing(ctx, p[0], p[1], Math.max(8, 7 * s)); pos = p;
    if (T.label != null) adresLabel(ctx, p[0] + 3 * s, p[1] - 3 * s, Math.max(3, 2.2 * s), C.goud, ramp(t, T.label, 0.6)); }
  // 6. transblaasje snoert af, reist naar het membraan (met adreslabel), en versmelt (exocytose)
  if (t >= T.trans0 && t < T.reis2) { const p = P(TRANSB); pos = knop(ctx, p[0], p[1], 1, 0, 17 * s, ramp(t, T.trans0, T.trans1 - T.trans0), 'golgi') || pos; }
  if (t >= T.reis2 && t < T.fus0) { const st = [TRANSB[0] + 19.5, TRANSB[1]]; const u = ramp(t, T.reis2, T.fus0 - T.reis2); const w = [lerp(st[0], NAAR[0], u), lerp(st[1], NAAR[1], u) - Math.sin(u * Math.PI) * 18]; const p = P(w);
    blaasjeHeld(ctx, p[0], p[1], 17 * s, 'golgi', 1, { label: T.label != null ? C.goud : null }); pos = p; }
  if (t >= T.fus0) { const f = ramp(t, T.fus0, T.fus1 - T.fus0) * 1.0; const ank = fusieOpCel(ctx, V, HOEK, f, t, { rv: 17 / 0.6 }); pos = ank.lading;
    if (f < 0.6) goudRing(ctx, ank.blaasje[0], ank.blaasje[1], 17 * s + 8, 1 - ramp(f, 0.5, 0.1)); }
  return pos;
}

const SCENES = {
// ---------- Cold open: jij eet een boterham; doorkijkje in de buik; zoomcirkel naar één kliercel ----------
s01(ctx, t, q, st) {
  bg(ctx, 'schema');
  const tK = q.at('klier'), win = ramp(t, tK - 0.2, 0.8), aMaag = ramp(t, q.at('maag'), 0.5), aAlv = q.on('alvleesklier', 1, 0.5);
  const hx = 900, hy = 880, z = ramp(t, q.at('kliercellen'), 0.8);
  const r = persoon(ctx, 'noor', hx, hy, 700, { a: Math.max(0.02, ramp(t, 0, 0.4)), pose: 'vasthouden', uit: 'blij', hold: (c, x, y, an) => boterham(c, x, y, an, 1.1) });
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.62);
  BODY = { cx: r.heup.x, yb: yM - 2.85 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0.04, 2.8), wr = 0.78 * HHn;
  if (win > 0.01) { ctx.save(); ctx.globalAlpha *= win;
    ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr * win, wr * 1.05 * win, 0, 0, 6.283); ctx.clip();
    ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9);
    anDigest(0.55 * (1 - 0.4 * aAlv), t);
    ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * aMaag; anShape(AN_MAAG, ANA.maag, ANA.maagS, 2, true, 0.6 * aMaag * (1 - aAlv)); ctx.restore();
    const g = aAlv * (0.8 + 0.2 * Math.sin(t * 3)); pancreas(Math.max(0.35, aAlv), g); if (aAlv > 0) pancreas(aAlv * 0.5, g);
    ctx.restore();
    ctx.beginPath(); ctx.ellipse(wx, wy, wr * win, wr * 1.05 * win, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke();
    ctx.restore(); }
  const [px, py] = AP(0.22, 2.77);
  const xl = Math.min(wx - wr, (r.handL ? r.handL.x : wx - wr)) - 46;
  naamBij(ctx, 'maag', '', xl, AP(0, 2.5)[1] + 12, aMaag * (1 - aAlv) * win, 'right');
  naamBij(ctx, 'alvleesklier', 'ruim een liter sap per dag', xl, py + 4, aAlv * (1 - ramp(t, q.at('kliercellen'), 0.5)), 'right');
  // zoomcirkel: één kliercel uit de beeldbank; blaasjes versmelten met het membraan en het enzym gaat naar buiten
  zoomCircle(ctx, 1590, 420, 250, px, py, 'één kliercel · vergroot', z, () => {
    ctx.fillStyle = C.bgMicro; ctx.fillRect(1340, 170, 500, 500);
    celDier(ctx, 1590, 420, 0.5, { t: t * 1.6, exo: true, a: 1 });
  });
  naamBij(ctx, 'enzymen', 'naar buiten, netjes verpakt', 1880, 140, ramp(t, q.at('netjes'), 0.6) * z, 'right');
  scaleBar(ctx, 'vereenvoudigd');
},
// ---------- H1: bacterie (prokaryoot) en jouw cel (eukaryoot) ----------
s04(ctx, t, q, st) {
  bg(ctx, 'micro');
  const aCel = ramp(t, 0.1, 0.6), aBac = ramp(t, q.at('bacterie', 1), 0.6), tien = ramp(t, q.at('tien'), 1.6);
  const tA = q.at('afdelingen', 1), groot = ramp(t, tA, 1.2);
  // jouw cel: links, na 'afdelingen' groter en in het midden
  const cs = lerp(0.5, 0.78, groot), cx = lerp(lerp(560, 640, tien), 860, groot), cy = 440;
  const tO = q.at('organel', 2), n = t < tO ? null : (t < tO + 0.8 ? 'er' : t < tO + 1.6 ? 'golgi' : t < tO + 2.4 ? 'mito' : null);
  const nadruk = t >= q.at('kern', 3) && t < tA + 0.6 ? 'kern' : n;
  const ank = celDier(ctx, cx, cy, cs, { t, a: aCel, exo: true, nadruk: nadruk && t > tA - 3 ? nadruk : null });
  nm(ctx, 'jouw cel', 'eukaryoot · met kern en organellen', [cx, cy - 425 * cs], 0, -24, aCel * ramp(t, q.at('eukaryoot'), 0.5), 'center');
  nm(ctx, 'kern', '', ank.kern, 0, 12, ramp(t, q.at('kern', 3), 0.5) * (1 - ramp(t, tO, 0.5)), 'center');
  if (n) nm(ctx, 'organel', n === 'er' ? 'ruw ER' : n === 'golgi' ? 'golgisysteem' : 'mitochondrium', n === 'er' ? ank.ruwER : n === 'golgi' ? ank.golgi : ank.mito, 30, -30, 1, 'left');
  // bacterie: eerst groot (vergroot), bij 'tien keer' op dezelfde schaal als jouw cel (1 µm breed en ± 2 µm lang tegen een cel van ± 20 µm)
  const bL = lerp(560, 910 * cs * 0.1, tien), bx = lerp(1370, cx + 455 * cs + 90, tien), by = lerp(430, cy + 200 * cs, tien);
  const ab = aBac;
  const bank = bacterieEcht(ctx, bx, by, bL, { t, a: ab, riboHl: 0.45 * ramp(t, q.at('losse'), 0.6) * (1 - ramp(t, q.at('prokaryoot'), 0.6)), flagel: false });
  nm(ctx, 'bacterie', tien > 0.5 ? 'op dezelfde schaal' : 'vergroot', [bx, by - bL * 0.25], tien > 0.5 ? 40 : 0, tien > 0.5 ? -10 : -40, ab, tien > 0.5 ? 'left' : 'center');
  nm(ctx, 'geen kern', 'het DNA ligt los in de cel', [bx, by + bL * 0.2], 0, 40, ab * ramp(t, q.at('zonder', 1), 0.5) * (1 - ramp(t, q.at('Dus'), 0.5)) * (1 - tien), 'center');
  if (ab > 0.01 && tien < 0.5) { const ar = ramp(t, q.at('ruimte', 1), 0.5) * (1 - ramp(t, q.at('losse'), 0.4)); if (ar > 0.01) pil(ctx, 'één ruimte · geen aparte kamers', bx, by + bL * 0.36, ar, C.teal);
    nm(ctx, 'losse ribosomen', '', bank.ribo, 0, 90, ramp(t, q.at('losse'), 0.5) * (1 - ramp(t, q.at('prokaryoot'), 0.5)), 'center');
    nm(ctx, 'prokaryoot', 'cel zonder kern', [bx, by + bL * 0.3], 0, 30, ramp(t, q.at('prokaryoot'), 0.5) * (1 - ramp(t, q.at('Jouw'), 0.5)), 'center', C.teal); }
  if (tien > 0.01 && groot < 0.99) { ctx.save(); ctx.globalAlpha *= tien * (1 - groot); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; const xL = cx - 455 * 0.5, xR = cx + 455 * 0.5, yy = cy + 455 * 0.5 + 34;
    ctx.beginPath(); ctx.moveTo(xL, yy - 8); ctx.lineTo(xL, yy); ctx.lineTo(xR, yy); ctx.lineTo(xR, yy - 8); ctx.stroke(); metaText(ctx, '± 10 × zo lang en breed', cx, yy + 34, C.goud, 'center', 26); ctx.restore(); }
  haak(ctx, 1260, 1840, 300, 'veel taken: een eigen afdeling', C.groen, ramp(t, q.at('afdeling', 2), 0.5) * (1 - ramp(t, q.at('film'), 0.5)));
  scaleBar(ctx, tien > 0.5 ? 'vereenvoudigd · cel en bacterie op schaal' : 'vereenvoudigd · niet op schaal');
},
// ---------- H1b: een alvleeskliercel van dichtbij ----------
s05(ctx, t, q, st) {
  bg(ctx, 'micro'); const cx = 900, cy = 478, s = 0.82;
  const blok = ramp(t, q.at('blokje'), 0.9) * (1 - ramp(t, q.at('plat', 2), 0.9)); const k = lerp(1, 0.5, blok), T = 70 * blok;
  const tM = q.at('celmembraan'), tC = q.at('cytoplasma'), tO = q.at('organellen', 2), tE = q.at('eiwitten', 1);
  const nadruk = t >= tM && t < tC ? 'membraan' : t >= tC && t < tO ? 'cytoplasma' : t >= q.at('begint') ? 'kern' : null;
  if (T > 0.5) { ctx.save(); ctx.translate(cx, cy + T); ctx.scale(1, k); ctx.beginPath(); ctx.ellipse(0, 0, 455 * s, 425 * s, 0, 0, 6.283); ctx.restore(); ctx.fillStyle = '#1C2638'; ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#1C2638'; ctx.fillRect(cx - 455 * s, cy, 910 * s, T); ctx.beginPath(); ctx.moveTo(cx - 455 * s, cy); ctx.lineTo(cx - 455 * s, cy + T); ctx.moveTo(cx + 455 * s, cy); ctx.lineTo(cx + 455 * s, cy + T); ctx.stroke(); }
  ctx.save(); ctx.translate(cx, cy); ctx.scale(1, k); ctx.translate(-cx, -cy);
  const ank = celDier(ctx, cx, cy, s, { t, exo: t > tE - 1, nadruk });
  ctx.restore();
  nm(ctx, 'een cel uit de alvleesklier', '', [cx, cy - 425 * s * k], 0, -26, ramp(t, 0, 0.6) * (1 - ramp(t, q.at('plat'), 0.5)), 'center');
  { const a = ramp(t, q.at('honderdste'), 0.6) * (1 - ramp(t, q.at('plat'), 0.5)); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; const yy = cy + 425 * s + 22, xL = cx - 455 * s, xR = cx + 455 * s;
    ctx.beginPath(); ctx.moveTo(xL, yy - 8); ctx.lineTo(xL, yy); ctx.lineTo(xR, yy); ctx.lineTo(xR, yy - 8); ctx.stroke(); metaText(ctx, 'ongeveer 0,01 mm', cx, yy + 34, C.goud, 'center', 28); ctx.restore(); } }
  nm(ctx, 'blokje', 'organellen liggen ook voor en achter elkaar', [cx, 215], 0, 0, blok, 'center');
  pil(ctx, 'vereenvoudigd · niet op schaal', 1600, 150, ramp(t, q.at('vereenvoudigd'), 0.5) * (1 - ramp(t, q.at('Eromheen'), 0.5)), C.grain);
  nm(ctx, 'celmembraan', 'dun vlies om de cel', [cx + 455 * s * 0.72, cy - 425 * s * 0.7], 30, -20, ramp(t, tM, 0.5) * (1 - ramp(t, tC, 0.5)), 'left');
  nm(ctx, 'cytoplasma', 'stroperige vulling', [cx - 455 * s * 0.35, cy + 425 * s * 0.62], 0, 0, ramp(t, tC, 0.5) * (1 - ramp(t, tO, 0.5)), 'center');
  if (t > tO - 0.2) { const lijst = [['kern', ank.kern], ['ruw ER', ank.ruwER], ['golgisysteem', ank.golgi], ['mitochondrium', ank.mito]];
    lijst.forEach(([n, p], i) => { const a = ramp(t, tO + i * 0.35, 0.4) * (1 - ramp(t, tE, 0.5)); goudRing(ctx, p[0], p[1], i === 0 ? 150 * s : 40, a * 0.9); });
    nm(ctx, 'organellen', 'elk met eigen bouw en taak', [cx + 455 * s, cy + 200], 30, 0, ramp(t, tO, 0.5) * (1 - ramp(t, q.at('begint'), 0.5)), 'left'); }
  nm(ctx, 'blaasjes met enzymen', 'naar buiten', [cx + 455 * s, cy + 40], 30, 0, ramp(t, tE, 0.5) * (1 - ramp(t, q.at('begint'), 0.5)), 'left');
  scaleBar(ctx, 'vereenvoudigd · niet op schaal · plat getekend');
},
// ---------- H2: de kern ----------
s07(ctx, t, q, st) {
  bg(ctx, 'micro');
  const tW = q.at('werkkopieën', 1), tB = q.at('bestuurt'), tR = q.at('gekopieerd'), tRode = q.at('rode');
  const tU = tB - 0.8; // 2.1 (open punt frisse review): zoomcirkel, TRANSCRIPTIE-label en haak zijn weg vóór de mythekaart verschijnt
  const V = camPad(t, [[0, 0, -60, -10, 1.0], [0, 2.4, -150, -40, 2.1, 640, 470]]);
  const ank = celMet(ctx, V, t, [], { exo: false });
  nm(ctx, 'celkern', 'grootste losse organel', V.P([-150, 60]), 0, 0, ramp(t, q.at('celkern'), 0.5) * (1 - ramp(t, q.at('kernmembraan'), 0.4)), 'center');
  // kernmembraan en poriën
  nm(ctx, 'kernmembraan', 'dubbel membraan', V.P([-150 - 175, -10]), -14, 0, ramp(t, q.at('kernmembraan'), 0.5) * (1 - ramp(t, tB, 0.5)), 'right');
  const ap = ramp(t, q.at('kernporiën'), 0.5) * (1 - ramp(t, tB, 0.6)); [9, 10, 11].forEach(i => { const p = V.P(poriePunt(i)); goudRing(ctx, p[0], p[1], 14, ap); });
  nm(ctx, 'kernporiën', 'gaten in het kernmembraan', V.P(poriePunt(9)), -16, -20, ap, 'right');
  // werkkopieën (mRNA) gaan door de poriën naar buiten; later meer (de kern bepaalt welke)
  const am = ramp(t, tW + 1.5, 0.6) * (1 - ramp(t, tRode, 0.6)); if (am > 0.01) { const u = ramp(t, tW + 1.5, 3.0);
    mrnaLangs(ctx, MRNA_PAD.slice(0, 6).map(V.P), 0, lerp(0.1, 1, u), 2.6, am, t); goudRing(ctx, ...V.P(poriePunt(HPOR)), 0, 0);
    const m2 = ramp(t, q.at('bepaalt', 1), 2.5); for (const [pi, dx] of [[9, -60], [11, 50]]) { const pp = poriePunt(pi); const pad = [[pp[0] * 0.6 - 60, pp[1] * 0.6 + 40], pp, [pp[0] + dx * 0.5, pp[1] - 40], [pp[0] + dx, pp[1] - 85]].map(V.P); mrnaLangs(ctx, pad, 0, lerp(0.05, 1, m2), 2.6, am * ramp(m2, 0, 0.1), t); } }
  nm(ctx, 'werkkopie', 'van één gen', V.P(MRNA_PAD[4]), 22, -20, ramp(t, tW + 2.5, 0.5) * (1 - ramp(t, tB, 0.5)), 'left');
  // zoomcirkel: een stukje DNA (palet B); transcriptie leest één gen, bij replicatie wordt al het DNA verdubbeld
  const Z = { x: 1450, y: 470, r: 255 }; const az = ramp(t, q.at('dna', 1), 0.8) * (1 - ramp(t, tU, 0.6)) + ramp(t, q.at('deelt'), 0.6) * (1 - ramp(t, tRode, 0.5));
  const tr = ramp(t, tW, 0.8), rep = ramp(t, tR, 2.0); const bron = V.P([-180, 10]);
  zoomCircle(ctx, Z.x, Z.y, Z.r, bron[0], bron[1], 'een stukje DNA · vergroot', az, () => {
    ctx.fillStyle = _mixHex(C.kern, '#121A26', 0.6); ctx.fillRect(Z.x - Z.r, Z.y - Z.r, 2 * Z.r, 2 * Z.r);
    const seq = 'TACGGATCCATGAAGTTCGGACTGATCCGTAGCTTAGCA';
    if (t < tB + 0.5) { // DNA, daarna transcriptie
      if (tr < 1) dnaLadderHelix(ctx, Z.x - 260, Z.y + 10, 14, seq, { draai: 1, R: 52, s: 0.5, a: 1 - tr });
      if (tr > 0) rnaPolymerase(ctx, Z.x + 40, Z.y + 30, 1.5, { stand: 'lees', mrna: lerp(20, 230, ramp(t, tW, 4)), x0: Z.x - Z.r, x1: Z.x + Z.r, t, a: tr });
    } else { // replicatie: de helix opent en wordt twee helixen
      const o = ramp(rep, 0, 0.4), d = ramp(rep, 0.4, 0.6);
      if (d < 1) dnaLadderHelix(ctx, Z.x - 260, Z.y, 14, seq, { draai: 1, R: 52, s: 0.5, sep: o, a: 1 - d });
      for (const sg of [-1, 1]) dnaLadderHelix(ctx, Z.x - 260, Z.y + sg * 95, 14, seq, { draai: 1, R: 40, s: 0.42, a: d, fase: sg }); }
  });
  { const isT = t < tB + 0.5; const bt = isT ? 'TRANSCRIPTIE' : 'DNA-REPLICATIE', bs = isT ? 'één gen → één werkkopie (RNA)' : 'al het DNA → twee kopieën, vóór de deling'; const bc = isT ? C.teal : '#DCE3EC';
    const ba = az * (isT ? tr : ramp(t, tR, 0.5)); if (ba > 0.01) { ctx.save(); ctx.globalAlpha *= ba; roundRect(ctx, Z.x - 300, Z.y - Z.r - 96, 600, 70, 12); shape(ctx, rgba(C.bgSchema, 0.94), bc, 2); text(ctx, bt, Z.x, Z.y - Z.r - 62, fTekst(30, 700), bc, 'center'); metaText(ctx, bs, Z.x, Z.y - Z.r - 36, C.grain, 'center', 20); ctx.restore(); } }
  nm(ctx, 'DNA', 'bouwtekening · dubbele helix', [Z.x, Z.y - Z.r], 0, -24, az * ramp(t, q.at('dna', 1), 0.5) * (1 - tr), 'center');
  haak(ctx, Z.x - Z.r, Z.x + Z.r, Z.y + Z.r + 50, 'het DNA zelf blijft in de kern', C.groen, ramp(t, q.at('blijft'), 0.5) * (1 - ramp(t, tU, 0.5)));
  card(ctx, 1060, 250, 800, 180, '"De kern bestuurt de cel"', 'Klopt, maar niet met bevelen: de kern bepaalt welke werkkopieën eruit gaan.', ramp(t, tB + 0.6, 0.5) * (1 - ramp(t, q.at('deelt'), 0.5)), C.groen);
  haak(ctx, Z.x - Z.r, Z.x + Z.r, Z.y + Z.r + 50, 'al het DNA gekopieerd → de cel kan delen', C.groen, ramp(t, tR + 1.5, 0.5) * (1 - ramp(t, tRode, 0.5)));
  // rode bloedcel: geen kern
  const rb = ramp(t, tRode, 0.6); if (rb > 0.01) { ctx.save(); ctx.globalAlpha = rb * 0.95; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ctx.restore();
    const oud = ramp(t, q.at('versleten'), 1.2); ctx.save(); ctx.globalAlpha *= rb;
    if (oud > 0.01) ctx.filter = 'saturate(' + (1 - 0.65 * oud).toFixed(2) + ') brightness(' + (1 - 0.2 * oud).toFixed(2) + ')';
    rodeBloedcel(ctx, 720, 440, 190, 0, 0, 1); rodeBloedcel(ctx, 1260, 440, 190, 0.0, 1, 1); ctx.filter = 'none';
    ctx.restore();
    nm(ctx, 'rode bloedcel', 'van boven · geen kern', [720, 640], 0, 10, rb, 'center'); nm(ctx, 'rode bloedcel', 'van opzij', [1260, 520], 0, 40, rb, 'center');
    pil(ctx, oud > 0.5 ? 'na ± 120 dagen versleten' : 'leeft ± 120 dagen', 960, 160, ramp(t, q.at('maanden'), 0.5), C.koraal); }
  scaleBar(ctx, rb > 0.5 ? 'vergroot · schematisch' : 'vereenvoudigd · niet op schaal');
},
// ---------- H3: ribosomen, ER en golgisysteem — het enzym reist door de cel ----------
s09(ctx, t, q, st) {
  bg(ctx, 'micro');
  const tRib = q.at('ribosoom', 1), tMil = q.at('miljoenen'), tVer = q.at('verteringsenzymen'), tHoudt = q.at('houdt'), tNet = q.at('netwerk'), tRuw = q.at('ruw', 1), tIn = q.at('gaan') + 0.9;
  const tGev = q.at('gevouwen'), tBl = q.at('blaasjes', 1), tGol = q.at('golgisysteem', 1), tBew = q.at('bewerkt'), tNieuw = q.at('nieuwe'), tReist = q.at('reist'), tVers = q.at('versmelt'), tBui = q.at('buiten', 2), tSt = q.at('stoffen'), tAlv = q.at('alvleeskliercel');
  const V0 = camPad(t, [[0, 0, -120, -215, 2.6], [tMil - 0.2, tMil + 1.4, -40, 0, 1.0], [tNet - 0.5, tNet + 1.5, -60, -130, 1.9], [tIn - 1.2, tIn + 0.3, -60, -210, 3.0, 760, 430],
    [tBl, tBl + 1.6, 100, -120, 3.0, 800, 430], [tGol + 0.6, tGol + 1.8, 170, -95, 2.6, 760, 430], [tReist - 0.3, tReist + 1.4, 320, -90, 2.4, 760, 430], [tSt - 0.4, tSt + 1.4, 0, 0, 1.0], [tAlv - 0.3, tAlv + 1.4, 260, 20, 0.62, 960, 430]]);
  const groei = ramp(t, tHoudt, 1.2) * (1 - ramp(t, tNet - 0.5, 1.0)); const V = groei > 0.001 ? zicht(V0.terug([960, 450]), V0.Z * (1 + 0.07 * groei)) : V0;
  if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= groei; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.text2; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const f = i / 80 * 6.283; const p = V0.P(celPunt(f)); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); }
  const lagen = nadrukLagen(t, [['ribosoom', tMil, tVer], ['er', tNet, tIn - 1], ['golgi', tGol, tBew + 2]]);
  const ank = celMet(ctx, V, t, lagen, { exo: false });
  const T = { mrna0: 0, mrna1: 2.8, mrnaUit: tIn + 2, ribo: tRib, keten: q.at('maakt', 1), dock0: q.at('vast'), dock1: q.at('vast') + 1.6, inER: tIn - 0.4, riboUit: tGev + 1, knop0: tBl - 0.2, knop1: tBl + 1.2, reis0: tBl + 1.2, cis0: tGol - 0.6, cis1: tGol + 0.2,
    zak0: tBew - 0.2, zak1: tNieuw - 0.4, trans0: tNieuw - 0.4, trans1: tNieuw + 1.0, reis2: tNieuw + 1.0, fus0: tVers - 0.6, fus1: tBui + 0.6 };
  const pos = route(ctx, V, t, T);
  // namen direct bij het onderdeel
  nm(ctx, 'ribosoom', 'maakt eiwitten', V.P(RS), -26, -16, ramp(t, tRib, 0.5) * (1 - ramp(t, tMil, 0.4)), 'right');
  nm(ctx, 'miljoenen ribosomen', 'los en op het ER', ank.ribosoom, -20, 0, ramp(t, tMil + 0.8, 0.5) * (1 - ramp(t, tVer, 0.5)), 'right');
  nm(ctx, 'ruw ER', 'met ribosomen erop', ank.ruwER, 40, 40, ramp(t, tRuw, 0.5) * (1 - ramp(t, tIn - 1.2, 0.5)), 'left');
  nm(ctx, 'endoplasmatisch reticulum', 'netwerk van membranen', V.P([-150 - 30, -300]), 0, -16, ramp(t, q.at('reticulum'), 0.5) * (1 - ramp(t, tRuw, 0.5)), 'center');
  nm(ctx, 'blaasje', '', pos, 30, -36, ramp(t, tBl + 0.6, 0.4) * (1 - ramp(t, T.cis0, 0.4)), 'left');
  nm(ctx, 'golgisysteem', 'stapel platte zakjes', V.P([235, 75]), 0, 30, ramp(t, tGol, 0.5) * (1 - ramp(t, tReist, 0.5)), 'center');
  nm(ctx, 'bewerkt · sorteert · verpakt', '', V.P([205, -175]), 0, -10, ramp(t, tBew, 0.5) * (1 - ramp(t, tReist, 0.5)), 'center', C.goud);
  nm(ctx, 'celmembraan', '', V.P(celPunt(HOEK - 0.36)), 24, 0, ramp(t, tReist, 0.5) * (1 - ramp(t, tSt, 0.5)), 'left');
  nm(ctx, 'enzymen', 'buiten de cel', V.P(celPunt(HOEK, -70)), 20, -40, ramp(t, tBui, 0.5) * (1 - ramp(t, tSt, 0.5)), 'left');
  // zoomcirkel A: het ribosoom maakt een keten die vouwt tot een enzym
  const zA = ramp(t, tVer - 0.3, 0.6) * (1 - ramp(t, tHoudt - 0.2, 0.6)); if (zA > 0.01) { const src = V.P(RS); const Zc = { x: 1620, y: 330, r: 230 };
    zoomCircle(ctx, Zc.x, Zc.y, Zc.r, src[0], src[1], 'ribosoom · vergroot', zA, () => { ctx.fillStyle = '#222D43'; ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, 2 * Zc.r);
      const f = ramp(t, tVer + 0.6, 2.4); mrnaSliert(ctx, Zc.x - 230, Zc.y + 110, 460, { t, basen: 0.3, kronkel: 0.3, a: 1 - f });
      ribosoomEcht(ctx, Zc.x - 40, Zc.y + 110, 0.8, { keten: 16, t, a: 1 - f }); if (f > 0.01) eiwitVouw(ctx, Zc.x, Zc.y - 10, 1.0, f, Array.from({ length: 46 }, (_, i) => i % 20), { t, a: f, kleur: 'eiwit' }); });
    nm(ctx, 'enzym = eiwit', '', [1620, 560], 0, 96, zA * ramp(t, q.at('eiwitten', 2), 0.4), 'center', C.goud); }
  nm(ctx, 'eiwitten die de cel zelf houdt', 'de cel groeit', [960, 80], 0, 0, groei, 'center');
  // zoomcirkel B: ribosoom op het ER, de keten gaat het ER in en vouwt daar
  const zB = ramp(t, tIn - 0.6, 0.6) * (1 - ramp(t, tBl - 0.2, 0.5)); if (zB > 0.01) { const src = V.P(DOCK); const Zc = { x: 1500, y: 360, r: 260 };
    zoomCircle(ctx, Zc.x, Zc.y, Zc.r, src[0], src[1], 'ribosoom op het ruw ER · vergroot', zB, () => { ctx.fillStyle = '#222D43'; ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, 2 * Zc.r);
      const vouw = ramp(t, tGev, 1.4); ctx.fillStyle = _mixHex(C.er, '#1A2740', 0.72); ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, (Zc.y + 190 - 1.62 * 95) - (Zc.y - Zc.r)); // lumen boven het ER-membraan
      ribosoomEcht(ctx, Zc.x, Zc.y + 190, 0.95, { stand: 'er', keten: Math.round(lerp(4, 20, ramp(t, tIn - 0.6, 2.5))), t, a: 1 - vouw * 0.6 });
      if (vouw > 0.01) eiwitVouw(ctx, Zc.x + 10, Zc.y - 150, 0.8, vouw, Array.from({ length: 46 }, (_, i) => i % 20), { t, a: vouw, kleur: 'eiwit' });
      metaText(ctx, 'binnen in het ER', Zc.x, Zc.y - 210, C.grain, 'center', 22); metaText(ctx, 'cytoplasma', Zc.x - 150, Zc.y + 60, C.grain, 'center', 22); });
    nm(ctx, 'gevouwen en gecontroleerd', '', [1500, 650], 0, 100, zB * ramp(t, tGev, 0.5), 'center', C.goud); }
  haak(ctx, 520, 1400, 800, 'stoffen omzetten tot iets nieuws: stofwisseling (opbouw)', C.groen, ramp(t, q.at('opbouwkant'), 0.6) * (1 - ramp(t, tAlv, 0.5)));
  // vergelijking: alvleeskliercel naast huidcel
  const av = ramp(t, tAlv + 0.6, 0.8); if (av > 0.01) { huidcel(ctx, 1450, 430, 230, t, av); nm(ctx, 'alvleeskliercel', 'veel ruw ER', V.P([0, -430]), 0, -14, av, 'center'); nm(ctx, 'huidcel', 'weinig ER', [1450, 200], 0, -14, av, 'center'); }
  scaleBar(ctx, 'vereenvoudigd · niet op schaal');
},
// ---------- H3 vwo: één enzym van bouwtekening tot buiten ----------
s11(ctx, t, q, st) {
  bg(ctx, 'micro');
  const tKan = q.at('kanaal'), tGl = q.at('glijdt'), tVouwt = q.at('vouwt'), tSuik = q.at('suikerlabel'), tSn1 = q.at('snoert', 1), tVer1 = q.at('versmelt', 1), tSch = q.at('schuift'), tBij = q.at('bijgewerkt'), tAdr = q.at('adreslabel', 1);
  const tSn2 = q.at('snoert', 2), tSort = q.at('sorteert'), tCel = q.at('celmembraan.', 1), tVer2 = q.at('versmelt', 2), tExo = q.at('exocytose'), tAnd = q.at('ander', 2), tOpr = q.at('opruimdienst', 1), tStulpt = q.at('stulpt'), tEndo = q.at('endocytose'), tTwee = q.at('twee');
  const V = camPad(t, [[0, 0, 0, 0, 1.0], [2.4, 3.6, -40, -205, 4.0, 700, 440], [tSn1 - 0.4, tSn1 + 0.8, 60, -150, 3.6, 760, 430], [tVer1 - 0.6, tVer1 + 0.8, 160, -110, 3.6, 760, 430],
    [tSn2 - 0.6, tSn2 + 0.6, 260, -100, 3.4, 760, 430], [tSort, tCel, 390, -100, 3.2, 760, 430], [tAnd - 0.4, tAnd + 1.2, 290, -10, 2.2, 860, 440], [tStulpt - 1.8, tStulpt - 0.4, 300, 250, 3.0, 860, 420], [tTwee - 0.4, tTwee + 1.2, 250, -60, 2.6, 760, 440]]);
  const ank = celMet(ctx, V, t, [], { exo: false });
  const T = { mrna0: -3, mrna1: -1, mrnaUit: 2, ribo: -2, keten: -2, dock0: -2, dock1: -1, inER: tVouwt - 0.6, riboUit: tSn1 - 1, knop0: tSn1 - 0.2, knop1: tSn1 + 1.4, reis0: tSn1 + 1.4, cis0: tVer1 + 0.2, cis1: tVer1 + 1.2,
    zak0: tSch - 0.2, zak1: tSch + 1.4, trans0: tSn2 - 0.3, trans1: tSn2 + 1.2, reis2: tSn2 + 1.2, fus0: tVer2 - 0.6, fus1: tExo, label: tAdr };
  // in het begin zit het ribosoom al op het ER (zelfde plek als in hoofdstuk 3); de route-functie tekent het
  const pos = route(ctx, V, t, T);
  const a0 = ramp(t, 0, 0.6) * (1 - ramp(t, 2.4, 0.4)); if (a0 > 0.01) { const p = V.P(DOCK); goudRing(ctx, p[0], p[1], 18, a0); nm(ctx, 'één enzym', 'we volgen het tot buiten', p, 30, -30, a0, 'left'); }
  // zoomcirkel 1: ribosoom op een kanaal in het ER-membraan; de keten glijdt erdoorheen, vouwt en krijgt een suikerketen
  const z1 = ramp(t, tKan - 0.6, 0.6) * (1 - ramp(t, tSn1 - 0.4, 0.5)); if (z1 > 0.01) { const src = V.P(DOCK); const Zc = { x: 1480, y: 380, r: 290 };
    zoomCircle(ctx, Zc.x, Zc.y, Zc.r, src[0], src[1], 'ribosoom op het ER-membraan · vergroot', z1, () => { ctx.fillStyle = '#222D43'; ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, 2 * Zc.r);
      ctx.fillStyle = _mixHex(C.er, '#1A2740', 0.72); ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, (Zc.y + 215 - 162) - (Zc.y - Zc.r));
      const vouw = ramp(t, tVouwt, 1.6), x0 = Zc.x - 10, y0 = Zc.y + 215, u = 100;
      const r = ribosoomEcht(ctx, x0, y0, 1.0, { stand: 'er', keten: Math.round(lerp(1, 16, ramp(t, tGl - 0.4, 2.6))), t, a: 1 - 0.65 * vouw });
      // kanaal (translocon): eiwit in het membraan rond de keten, als twee kolommen kralen
      if (r.tunnel) for (const sg of [-1, 1]) { const kx = r.tunnel[0] + sg * 11, yA = y0 - 1.6 * u, yB = y0 - 1.86 * u; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(kx + sg * (k % 2) * 3, lerp(yA, yB, k / 3), 6, 0, 6.283); shape(ctx, k % 2 ? '#8E9CB8' : '#A4B2CA', lighten('#A4B2CA', 0.25), 1); } }
      if (vouw > 0.01) { const P = eiwitVouw(ctx, Zc.x + 20, Zc.y - 140, 0.75, vouw, Array.from({ length: 46 }, (_, i) => i % 20), { t, a: vouw, kleur: 'eiwit' }); if (P && P.length) suikerBoom(ctx, P[30][0], P[30][1], -2.4, 6, 7, 0, ramp(t, tSuik - 0.6, 0.8)); }
      metaText(ctx, 'binnen in het ER', Zc.x, Zc.y - 230, C.grain, 'center', 22); metaText(ctx, 'cytoplasma', Zc.x - 170, Zc.y + 50, C.grain, 'center', 22); });
    nm(ctx, 'kanaal', 'in het ER-membraan', [1480 - 290, 380 + 120], -16, 0, z1 * ramp(t, tKan, 0.5) * (1 - ramp(t, tVouwt, 0.5)), 'right');
    nm(ctx, 'eerste suikerlabel', '', [1480, 90], 0, -16, z1 * ramp(t, tSuik - 0.4, 0.5), 'center', C.groen); }
  nm(ctx, 'ruw ER', '', ank.ruwER, 40, 60, ramp(t, 3, 0.5) * (1 - ramp(t, tKan - 0.6, 0.5)), 'left');
  nm(ctx, 'stuk ER-membraan snoert af', 'tot een blaasje', pos, -40, -40, ramp(t, tSn1, 0.5) * (1 - ramp(t, tVer1, 0.4)), 'right');
  nm(ctx, 'golgisysteem', 'ciskant', V.P([CIS[0] - 10, 30]), 0, 0, ramp(t, tVer1, 0.5) * (1 - ramp(t, tSch, 0.5)), 'center');
  nm(ctx, 'van zakje naar zakje', '', V.P([200, -175]), 0, 0, ramp(t, tSch, 0.5) * (1 - ramp(t, tBij, 0.5)), 'center', C.goud);
  // zoomcirkel 2: suikers aangepast, adreslabel erop
  const z2 = ramp(t, tBij - 0.4, 0.5) * (1 - ramp(t, tSn2 - 0.4, 0.5)); if (z2 > 0.01 && pos) { const Zc = { x: 1500, y: 360, r: 250 };
    zoomCircle(ctx, Zc.x, Zc.y, Zc.r, pos[0], pos[1], '', z2, () => { ctx.fillStyle = _mixHex(_mixHex(C.golgi, C.er, 0.2), '#1A2740', 0.72); ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, 2 * Zc.r);
      const P = eiwitVouw(ctx, Zc.x - 20, Zc.y + 30, 1.4, 1, Array.from({ length: 46 }, (_, i) => i % 20), { t, kleur: 'eiwit' });
      if (P && P.length) { suikerBoom(ctx, P[30][0], P[30][1], -2.4, 9, 7, ramp(t, q.at('aangepast'), 1.0)); adresLabel(ctx, P[12][0] + 10, P[12][1] - 34, 20, C.goud, ramp(t, tAdr, 0.6)); } });
    nm(ctx, 'suikers aangepast', '', [1500, 360 - 250], 0, -20, z2 * ramp(t, q.at('aangepast'), 0.5), 'center', C.groen);
    nm(ctx, 'adreslabel', 'bepaalt waar het heen gaat', [1500, 360 + 250], 0, 52, z2 * ramp(t, tAdr, 0.5), 'center', C.goud); }
  nm(ctx, 'transkant', 'blaasje snoert af', V.P([TRANSB[0], 30]), 0, 0, ramp(t, tSn2, 0.5) * (1 - ramp(t, tSort, 0.5)), 'center');
  pil(ctx, 'adreslabel: celmembraan', 960, 120, ramp(t, tSort, 0.5) * (1 - ramp(t, tVer2, 0.5)), C.goud);
  nm(ctx, 'exocytose', 'blaasje versmelt met het celmembraan', V.P(celPunt(HOEK, 0)), -40, -120, ramp(t, tExo, 0.5) * (1 - ramp(t, tAnd, 0.5)), 'right');
  nm(ctx, 'de inhoud komt buiten', '', V.P(celPunt(HOEK, -60)), 10, 80, ramp(t, q.at('inhoud'), 0.5) * (1 - ramp(t, tAnd, 0.5)), 'left');
  // ander adreslabel → naar het lysosoom (opruimdienst)
  if (t > tAnd - 0.2) { const u = ramp(t, tAnd, Math.max(1, tOpr - tAnd + 0.6)), m = ramp(t, tOpr + 0.6, 0.8); const st0 = [TRANSB[0] + 12, -10]; const w = [lerp(st0[0], LYSO2[0], u), lerp(st0[1], LYSO2[1], u) + Math.sin(u * Math.PI) * 20]; const p = V.P(w);
    if (m < 0.98) blaasjeHeld(ctx, p[0], p[1], 15 * V.s * (1 - 0.5 * m), 'golgi', 1 - m, { label: C.groen, ring: false });
    const lp = V.P(LYSO2); goudRing(ctx, lp[0], lp[1], 16 * V.s + 6, m * (1 - ramp(t, tStulpt - 1.8, 0.4)));
    nm(ctx, 'lysosoom', 'opruimdienst · hoofdstuk 5', lp, 30, 30, ramp(t, tOpr, 0.5) * (1 - ramp(t, tStulpt - 1.8, 0.4)), 'left'); pil(ctx, 'adreslabel: lysosoom', 960, 120, ramp(t, tAnd, 0.5) * (1 - ramp(t, tStulpt - 1.8, 0.4)), C.groen); }
  // endocytose: een stuk celmembraan stulpt in en snoert af
  if (t > tStulpt - 1.8) { const f = ramp(t, tStulpt - 0.6, tEndo - tStulpt + 1.6); const ae = ramp(t, tStulpt - 1.6, 0.4) * (1 - ramp(t, tTwee - 0.4, 0.5));
    if (ae > 0.01) { ctx.save(); ctx.globalAlpha *= ae; fusieOpCel(ctx, V, 0.72, f, t, { richting: 'endo', eiwit: false, rv: 26 }); ctx.restore(); }
    nm(ctx, 'endocytose', 'membraan stulpt in en snoert af', V.P(celPunt(0.72, -40)), 30, 30, ramp(t, tEndo, 0.5) * ae, 'left'); }
  // twee eiwitten verlaten het golgisysteem
  if (t > tTwee - 0.4) { const a = ramp(t, tTwee, 0.5); const u = ((t - tTwee) * 0.18) % 1;
    const p1 = V.P([lerp(TRANSB[0] + 20, 360, u), GWY + 10 - Math.sin(u * Math.PI) * 10]), p2 = V.P([lerp(TRANSB[0] + 10, 340, u), lerp(20, 60, u)]);
    blaasjeHeld(ctx, p1[0], p1[1], 15 * V.s, 'golgi', a, { label: C.goud }); blaasjeHeld(ctx, p2[0], p2[1], 15 * V.s, 'golgi', a, { label: C.groen, ring: false }); }
  scaleBar(ctx, 'vereenvoudigd · niet op schaal');
},
s13(ctx, t, q, st) { bg(ctx, 'schema');
  const items = [['gemaakt', 'ribosoom', (x, y) => ribosoomEcht(ctx, x, y + 30, 0.36, { keten: 10, t })], ['bewerkt', 'ER + golgisysteem', (x, y) => golgiStapel(ctx, x, y + 10, 0.55, { t })],
    ['verpakt', 'blaasje', (x, y) => blaasjeHeld(ctx, x, y, 30, 'golgi', 1, { label: C.goud })], ['buiten', 'exocytose', (x, y) => blaasjeVersmelt(ctx, x, y + 22, 1.1, { f: 0.85, R: 420, t })]];
  items.forEach((s, i) => { const a = ramp(t, q.at(s[0]), 0.4); const x = 330 + i * 420; beeldKaart(ctx, x, 470, 340, 330, s[0], s[1], 0.4 + 0.6 * a, a, s[2]);
    if (i < 3) { ctx.save(); ctx.globalAlpha = 0.4 + 0.6 * a; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 180, 470); ctx.lineTo(x + 240, 470); ctx.lineTo(x + 230, 462); ctx.moveTo(x + 240, 470); ctx.lineTo(x + 230, 478); ctx.stroke(); ctx.restore(); } });
},
// ---------- H4: het mitochondrium ----------
s14(ctx, t, q, st) {
  const tMi = q.at('mitochondriën'), tBo = q.at('bonen'), tBu = q.at('buizen'), tVb = q.at('verbranding', 1), tAtp = q.at('atp'), tTw = q.at('twee'), tCr = q.at('cristae');
  if (t < tBo - 0.3) { bg(ctx, 'micro'); const MI = [320, 215]; const V = camPad(t, [[0, 0, 0, 0, 1.0], [tMi - 0.6, tBo - 0.3, MI[0], MI[1], 2.4]]);
    const ank = celMet(ctx, V, t, nadrukLagen(t, [['mito', 1.4, 99]]), { exo: true }); ank.mitos.forEach((p, i) => goudRing(ctx, p[0], p[1], 52 * V.s, ramp(t, tMi, 0.5) * 0.8));
    nm(ctx, 'mitochondriën', 'boonvormige organellen', V.P([MI[0], MI[1] - 60]), 0, -20, ramp(t, tMi, 0.5), 'center'); scaleBar(ctx); return; }
  cytoGrond(ctx); const M = { x: 820, y: 470 };
  const flow = ramp(t, tVb, 0.6) * (1 - ramp(t, tTw - 0.4, 0.6));
  const ank = mitochondrionEcht(ctx, M.x, M.y, 3.3, { t, cristae: 11, stoffen: flow, seed: 3 });
  nm(ctx, 'mitochondrium', 'zo staat het op plaatjes', [M.x, M.y - 150], 0, -20, ramp(t, tBo - 0.3, 0.5) * (1 - ramp(t, tVb, 0.5)), 'center');
  // in een levende cel: buizen die splitsen en samensmelten
  const ab = ramp(t, tBu - 0.4, 0.5) * (1 - ramp(t, tVb, 0.6)); if (ab > 0.01) { const d = ramp(t, q.at('splitsen'), 1.0) * (1 - ramp(t, q.at('samensmelten'), 1.2));
    mitochondrionEcht(ctx, 1560, 180, 1.0, { t, lang: 520, dik: 70, cristae: 14, deling: d, a: ab, rot: 0.08, seed: 5 }); nm(ctx, 'levende cel', 'buizen splitsen en smelten samen', [1560, 250], 0, 30, ab, 'center'); }
  if (flow > 0.01) { const c = (t * 0.45) % 1, sp = ease((c - 0.45) / 0.3);
    if (c < 0.45) glucoseMol(ctx, 200, 760, 2.2, flow * ramp(c, 0, 0.1)); else { pyruvaatMol(ctx, 200 + sp * 40, 760 - sp * 26, 1.9, flow * (1 - ramp(c, 0.85, 0.15))); pyruvaatMol(ctx, 200 + sp * 40, 760 + sp * 26, 1.9, flow * (1 - ramp(c, 0.85, 0.15)), 0.2); }
    molFlow(ctx, [[300, 740], [M.x - 260, M.y + 60]], 6, t, 70, (x, y, a, k) => pyruvaatMol(ctx, x, y, 1.5, a, Math.sin(t + k) * 0.6), 100, flow);
    molFlow(ctx, [[260, 300], [M.x - 260, M.y - 30]], 6, t, 80, (x, y, a) => o2Mol(ctx, x, y, 1.4, a), 200, flow);
    naamBij(ctx, 'glucose → twee brokstukken', 'in het cytoplasma', 120, 840 - 20, flow, 'left'); naamBij(ctx, 'zuurstof', '', 200, 270, flow, 'left');
    molFlow(ctx, [[M.x + 260, M.y + 100], [1620, 760]], 6, t, 80, (x, y, a) => co2Mol(ctx, x, y, 1.4, a), 350, flow); naamBij(ctx, 'koolstofdioxide', 'komt vrij', 1620, 840 - 20, flow, 'center');
    const ao = ramp(t, tAtp, 0.5) * flow; molFlow(ctx, [[M.x + 280, M.y - 20], [1640, 420]], 7, t, 90, (x, y, a) => atpMol(ctx, x, y, 1.5, a), 300, ao); naamBij(ctx, 'ATP', 'energiedrager van de cel', 1640, 380, ao, 'center'); }
  const am = ramp(t, tTw, 0.5); nm(ctx, 'buitenmembraan', 'glad', ank.buiten, 0, 70, am * (1 - ramp(t, tCr, 0.5)), 'center'); nm(ctx, 'binnenmembraan', '', ank.binnen, -30, -60, am, 'right');
  const ac = ramp(t, tCr, 0.5); if (ac > 0.01) { goudRing(ctx, ank.crista[0], ank.crista[1], 70, ac); nm(ctx, 'cristae', 'plooien van het binnenmembraan', ank.crista, 0, 230, ac, 'center', C.goud); }
  scaleBar(ctx);
},
s16(ctx, t, q, st) {
  bg(ctx, 'schema'); const y = 400, aa = ramp(t, 0, 0.5);
  const tH = q.at('hartspiercel'), ah = ramp(t, tH, 0.6);
  if (ah < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - ah;
    mitochondrionEcht(ctx, 520, y, 2.2, { cristae: 0, a: aa, seed: 2 }); mitochondrionEcht(ctx, 1260, y, 2.2, { cristae: 11, a: aa, seed: 3 });
    metaText(ctx, 'glad', 520, y + 140, C.grain, 'center', 28); metaText(ctx, 'geplooid', 1260, y + 140, C.grain, 'center', 28);
    const ab = ramp(t, q.at('vijf'), 0.8); if (ab > 0.01) { ctx.save(); ctx.globalAlpha *= ab; const base = 600; ctx.fillStyle = C.fill; roundRect(ctx, 420, base, 200, 30, 6); ctx.fill(); roundRect(ctx, 1160, base, 200, 30, 6); ctx.fill(); ctx.fillStyle = C.goud; roundRect(ctx, 420, base, 40, 30, 6); ctx.fill(); roundRect(ctx, 1160, base, 200 * ab, 30, 6); ctx.fill();
      metaText(ctx, 'oppervlak binnenmembraan 1 ×', 520, base + 66, C.grain, 'center', 24); metaText(ctx, '± 5 × (levercel)', 1260, base + 66, C.grain, 'center', 24); ctx.restore(); }
    const ae = ramp(t, q.at('eiwitten', 1), 0.6); if (ae > 0.01) { molFlow(ctx, [[520, y - 110], [520, 170]], 2, t, 60, (x, yy, a) => atpMol(ctx, x, yy, 1.3, a), 400, ae); molFlow(ctx, [[1260, y - 110], [1260, 170]], 10, t, 60, (x, yy, a) => atpMol(ctx, x, yy, 1.3, a), 500, ae);
      naamBij(ctx, 'ATP', '', 600, 200, ae, 'left'); naamBij(ctx, 'ATP', '', 1340, 200, ae, 'left'); }
    haak(ctx, 330, 1450, 720, 'meer plooien → meer oppervlak → meer ATP', C.groen, ramp(t, q.at('plooien', 1), 0.6)); ctx.restore(); }
  if (ah > 0.01) { ctx.save(); ctx.globalAlpha *= ah; hartspiercel(ctx, 600, 420, 760, 240, t); huidcel(ctx, 1460, 420, 190, t); ctx.restore();
    nm(ctx, 'hartspiercel', 'een derde vol mitochondriën · duizenden', [600, 270], 0, -80, ah, 'center'); nm(ctx, 'huidcel', 'een paar honderd', [1460, 210], 0, -10, ramp(t, q.at('huidcel'), 0.5), 'center');
    metaText(ctx, 'schematisch · aantallen niet op schaal', 960, 690, C.text2, 'center', 22); }
  const as = ramp(t, q.at('afbraakkant'), 0.5); if (as > 0.01) { ctx.save(); ctx.globalAlpha = as; roundRect(ctx, 460, 740, 1000, 90, 12); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1); text(ctx, ramp(t, q.at('assimilatie'), 0.3) > 0.5 ? 'opbouw = assimilatie   ·   afbraak = dissimilatie' : 'energie vrijmaken = stofwisseling (afbraak)', 960, 797, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
},
s17(ctx, t, q, st) {
  bg(ctx, 'schema'); const y = 430;
  const a1 = mitochondrionEcht(ctx, 540, y, 2.5, { cristae: 18, seed: 4 }), a2 = mitochondrionEcht(ctx, 1380, y, 2.5, { cristae: 3, seed: 6 });
  const a0 = ramp(t, 0, 0.5) * (1 - ramp(t, q.at('hartspiercel'), 0.5)); nm(ctx, 'buitenmembraan', 'glad', a1.buiten, 0, 70, a0, 'center'); nm(ctx, 'binnenmembraan', 'geplooid tot cristae', a1.binnen, 0, -80, a0, 'center', C.goud);
  nm(ctx, 'hartspiercel', 'dicht opeengepakte cristae', [540, y - 170], 0, 0, ramp(t, q.at('hartspiercel'), 0.5), 'center');
  nm(ctx, 'witte vetcel', 'maar een paar cristae', [1380, y - 170], 0, 0, ramp(t, q.at('vetcel'), 0.5), 'center');
  haak(ctx, 300, 1620, 690, 'uit de bouw van één mitochondrium lees je af hoe hard de cel werkt', C.groen, ramp(t, q.at('raden'), 0.5));
},
// ---------- H5: lysosomen en de vacuole ----------
s18(ctx, t, q, st) {
  cytoGrond(ctx);
  const tA = q.at('afval', 1), tVo = q.at('versleten'), tKa = q.at('kapotte'), tWi = q.at('witte', 2), tLy = q.at('lysosomen'), tBl = q.at('blaasje', 2), tVm = q.at('versmelt'), tBr = q.at('breekt'), tBs = q.at('bouwstenen'), tZ = q.at('zuur');
  const wx = 760, wy = 470, R = 150;
  // afval: een versleten mitochondrium (dof), kapotte eiwitten, een binnengehaalde bacterie
  const op = ramp(t, tBr, 1.6);
  const am = ramp(t, 0.3, 0.6) * (1 - op); if (am > 0.01) { ctx.save(); ctx.globalAlpha *= am; ctx.filter = 'saturate(0.25) brightness(0.8)'; mitochondrionEcht(ctx, wx, wy, 1.2, { cristae: 7, rot: 0.3, seed: 8 }); ctx.filter = 'none'; ctx.restore(); }
  const ak = ramp(t, tKa, 0.5) * (1 - ramp(t, tBl, 0.6)); if (ak > 0.01) { ketenKlein(ctx, 1150, 300, 0.4, 9, 6, t, ak); ketenKlein(ctx, 1220, 380, 2.8, 7, 6, t + 1, ak); }
  const aw = ramp(t, tWi, 0.5) * (1 - ramp(t, tLy, 0.6)); if (aw > 0.01) { bacterieEcht(ctx, 1450, 600, 160, { t, a: aw, flagel: false }); nm(ctx, 'binnengehaalde bacterie', 'in witte bloedcellen', [1450, 650], 0, 30, aw, 'center'); }
  nm(ctx, 'versleten organel', 'oud mitochondrium', [wx, wy - 110], 0, -10, am * (1 - ramp(t, tLy, 0.5)), 'center'); nm(ctx, 'kapotte eiwitten', '', [1190, 300], 0, -40, ak, 'center');
  // het afval zit in een blaasje; een lysosoom komt aan en versmelt ermee (één blaas)
  const ab = ramp(t, tBl - 0.8, 0.8); const u = ramp(t, tLy + 0.6, Math.max(0.8, tVm - tLy)); const lx = lerp(1250, wx + R + 40, u), ly = lerp(720, wy + 40, u); const fz = ramp(t, tVm, 1.2);
  const Rb = lerp(R, R * 1.06, fz); if (ab > 0.01) { ctx.save(); ctx.globalAlpha *= ab; ctx.beginPath(); ctx.arc(wx, wy, Rb, 0, 6.283); ctx.fillStyle = rgba(fz > 0.5 ? C.lyso : C.ves, 0.14 + 0.1 * fz); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(wx, wy, Rb - 6, 0, 6.283); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
  const al = ramp(t, tLy, 0.5); const rl = 58 * (1 - fz); if (al > 0.01 && rl > 2) { ctx.save(); ctx.globalAlpha *= al; const fx = lerp(lx, wx + R - 10, fz); ctx.beginPath(); ctx.arc(fx, ly, rl, 0, 6.283); ctx.fillStyle = _mixHex(C.lyso, '#1A2740', 0.35); ctx.fill(); ctx.strokeStyle = lighten(C.lyso, 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  // afbraakenzymen (kleine kluwens): eerst in het lysosoom, na de fusie verspreid door de blaas
  if (al > 0.01) for (let k = 0; k < 6; k++) { const a0 = hash(k * 7) * 6.283, d0 = hash(k * 7 + 1) * 30; const w = wander(k + 600, t, 4, 1.5); const pA = [lx + Math.cos(a0) * d0, ly + Math.sin(a0) * d0], pB = [wx + Math.cos(a0) * (40 + d0 * 2.6), wy + Math.sin(a0) * (40 + d0 * 2.6)];
    enzymKluwen(ctx, lerp(pA[0], pB[0], fz) + w.x, lerp(pA[1], pB[1], fz) + w.y, 13, { a: al, sub: null, seed: k, an: t * 0.2 + k }); }
  nm(ctx, 'lysosoom', 'blaasje vol afbraakenzymen', [lx + 70, ly], 0, 0, al * (1 - fz), 'left');
  nm(ctx, 'afval in een blaasje', '', [wx, wy + R], 0, 44, ab * (1 - ramp(t, tVm, 0.5)), 'center');
  // afgebroken tot bouwstenen die de cel opnieuw gebruikt
  if (op > 0.01) { const vrij = ramp(t, tBs, 2.5); for (let k = 0; k < 18; k++) { const an = hash(k * 3) * 6.283, d = hash(k * 3 + 1) * 90 * op + vrij * (180 + 120 * hash(k)); const x = wx + Math.cos(an) * d, y = wy + Math.sin(an) * d * 0.8;
      ctx.save(); ctx.globalAlpha *= op * (1 - ramp(vrij, 0.7, 0.3)); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); shape(ctx, ['#C9A35C', '#B08A5C', '#DCC07F'][k % 3], '#E0C98F', 1); ctx.restore(); } }
  nm(ctx, 'bouwstenen', 'de cel gebruikt ze opnieuw', [wx, wy + R], 0, 44, ramp(t, tBs, 0.5) * (1 - ramp(t, tZ, 0.5)), 'center', C.groen);
  // zuurgraad
  const az = ramp(t, tZ, 0.6); if (az > 0.01) { ctx.save(); ctx.globalAlpha = az; roundRect(ctx, 1240, 360, 560, 260, 14); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1); text(ctx, 'zuurgraad (pH)', 1270, 412, fTekst(34, 600), C.text);
    const bx = 1280, by = 480, bw = 480; ctx.fillStyle = C.fill; roundRect(ctx, bx, by, bw, 22, 11); ctx.fill(); metaText(ctx, 'zuur', bx, by + 54, C.text2, 'left', 22); metaText(ctx, 'neutraal', bx + bw, by + 54, C.text2, 'right', 22);
    for (const [ph, col, nmT] of [[4.8, C.koraal, 'lysosoom ± 4,8'], [7.2, C.teal, 'cytoplasma ± 7,2']]) { const px = bx + bw * (ph - 3) / 5; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, by + 11, 11, 0, 6.283); ctx.fill(); metaText(ctx, nmT, px, by + (ph < 6 ? -18 : 90), col, 'center', 24); }
    text(ctx, 'deze enzymen werken het best in zuur', 1520, 600, fTekst(28), C.text2, 'center'); ctx.restore(); }
  scaleBar(ctx);
},
s20(ctx, t, q, st) {
  bg(ctx, 'micro');
  const tVa = q.at('vacuole', 1), tW = q.at('water', 1), tD = q.at('druk', 1), tWa = q.at('wand', 1), tVl = q.at('verliest'), tZ = q.at('zakt'), tH = q.at('homeostase'), tAf = q.at('afval');
  const terug = ramp(t, tAf, 1.6); const pl = lerp(0, 0.38, ramp(t, tVl, 2.0)) * (1 - terug);
  const cx = 720, cy = 440, s = 1.35;
  const nad = t >= tVa && t < tW ? 'vacuole' : t >= tWa && t < q.at('straks') + 0.5 ? 'wand' : null;
  const ank = plantencel(ctx, cx, cy, s, { t, plasmolyse: pl, nadruk: nad });
  nm(ctx, 'vacuole', 'blaas met een membraan, vol celvocht', [cx + 40 * s, cy - 10 * s], 0, -10, ramp(t, tVa, 0.5) * (1 - ramp(t, tVl, 0.5)), 'center');
  // water stroomt erin (door de wand en het membraan, de vacuole in); druk tegen de wand
  const aw = ramp(t, tW, 0.5) * (1 - ramp(t, tVl, 0.5)); if (aw > 0.01) { for (let k = 0; k < 14; k++) { const u = ((t * 0.18 + hash(k + 70)) % 1); const an = hash(k * 5) * 6.283; const r0 = 520, r1 = 120;
      const x = cx + Math.cos(an) * lerp(r0, r1, u) * 1.1, y = cy + Math.sin(an) * lerp(r0, r1, u) * 0.75; waterMol(ctx, x, y, 1.4, aw * (u < 0.85 ? 1 : (1 - u) / 0.15), an); } }
  const ap = ramp(t, tD, 0.8) * (1 - ramp(t, tVl, 1.2)) + ramp(t, tAf + 0.8, 0.8) * (1 - ramp(t, tH + 0.8, 0.5)); if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; ctx.strokeStyle = C.goud; ctx.lineWidth = 3;
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + 0.3; const x0 = cx + Math.cos(a) * 170 * s * 0.75, y0 = cy + Math.sin(a) * 110 * s * 0.75, x1 = cx + Math.cos(a) * 215 * s, y1 = cy + Math.sin(a) * 140 * s; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 14 * Math.cos(an - 0.5), y1 - 14 * Math.sin(an - 0.5)); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 14 * Math.cos(an + 0.5), y1 - 14 * Math.sin(an + 0.5)); ctx.stroke(); } ctx.restore(); }
  nm(ctx, 'druk', 'van binnen tegen de wand', [cx, cy + 236 * s], 0, 44, ramp(t, tD, 0.5) * (1 - ramp(t, tWa + 2.4, 0.5)), 'center', C.goud);
  nm(ctx, 'celwand', 'stevig · die zie je straks', ank.celwand, 20, -40, ramp(t, tWa, 0.5) * (1 - ramp(t, tVl, 0.5)), 'left');
  nm(ctx, 'de vacuole verliest water', 'de druk valt weg', [cx, cy + 236 * s], 0, 44, ramp(t, tVl, 0.5) * (1 - ramp(t, tAf, 0.5)), 'center', C.koraal);
  // plantje: stevig bij druk, slap bij waterverlies
  const slap = ramp(t, tZ - 1.2, 1.4) * (1 - terug); plantje(ctx, 1600, 600, 1.2, slap); metaText(ctx, slap > 0.5 ? 'druk weg → slap' : 'druk → stevig', 1600, 720, C.grain, 'center', 26);
  haak(ctx, 300, 1200, 790, 'afval opruimen en water vasthouden: homeostase', C.groen, ramp(t, tH - 1.5, 0.6));
  scaleBar(ctx);
},
// ---------- H6: celmembraan en cytoskelet ----------
s21(ctx, t, q, st) {
  const tS = q.at('stilliggen');
  if (t < tS) { bg(ctx, 'micro'); const MC = { x: 960, y: 520 + 1700, R: 1700 }; // stuk van een ronde cel: binnen = onder
    ctx.save(); ctx.beginPath(); ctx.arc(MC.x, MC.y, MC.R, 0, 6.283); ctx.fillStyle = '#26324A'; ctx.fill(); ctx.restore();
    const tH = q.at('hormoon'), tV = q.at('verandert'), aR = ramp(t, tH - 0.5, 0.6), anR = -Math.PI / 2 + 0.24;
    membraanBoog(ctx, MC.x, MC.y, MC.R, -Math.PI / 2 - 0.62, -Math.PI / 2 + 0.62, { s: 1.5, t, eiwitten: [{ an: -Math.PI / 2 - 0.12, soort: 'kanaal', open: 1 }, anR] });
    const rp = [MC.x + Math.cos(anR) * MC.R, MC.y + Math.sin(anR) * MC.R];
    if (aR > 0.01) membraanReceptor(ctx, rp[0], rp[1], 1.25, { a: aR, ang: anR, R: MC.R, membraan: false, bind: ramp(t, tH, 1.0), signaal: ramp(t, tV, 1.0), ligCol: C.goud, t });
    metaText(ctx, 'buiten de cel', 160, 230, C.grain, 'left', 26); metaText(ctx, 'binnen de cel', 300, 830, C.grain, 'left', 26);
    // kleine moleculen gaan door (via het kanaal en tussen de lipiden), grote niet
    const ap = ramp(t, q.at('sommige'), 0.4) * (1 - ramp(t, tH - 0.6, 0.5)); if (ap > 0.01) { const kx = MC.x + Math.cos(-Math.PI / 2 - 0.12) * MC.R;
      for (let k = 0; k < 5; k++) { const ph = (t * 0.35 + k / 5) % 1; const x = kx + (k - 2) * 6, y = lerp(250, 720, ph); waterMol(ctx, x + Math.sin(ph * 9 + k) * 6, y, 1.6, ap * Math.min(1, ph * 6, (1 - ph) * 6), k); }
      for (let k = 0; k < 4; k++) { const ph = (t * 0.4 + k / 4) % 1; const x = 520 + k * 120; const y = 330 + 120 * Math.abs(Math.sin(ph * Math.PI)) - 120; glucoseMol(ctx, x, 360 - Math.abs(Math.sin(ph * Math.PI * 2)) * 110, 2.2, ap, ph); }
      naamBij(ctx, 'klein: gaat erdoor', '', kx + 40, 300, ap, 'left'); naamBij(ctx, 'groot: niet', '', 560, 190, ap, 'left'); }
    nm(ctx, 'hormoon', 'signaal van buiten', [rp[0], 190], 30, 0, ramp(t, tH, 0.5), 'left', C.goud); nm(ctx, 'ontvanger-eiwit', 'past precies op één hormoon', [rp[0] - 90, rp[1] - 200], 0, 0, aR, 'right');
    nm(ctx, 'de cel doet iets anders', '', [rp[0], rp[1] + 230], 0, 0, ramp(t, tV, 0.5), 'center', C.goud);
    nm(ctx, 'celmembraan', 'gebogen: een cel is rond', [960, 680], 0, 0, ramp(t, 0.2, 0.5) * (1 - ramp(t, q.at('sommige'), 0.5)), 'center');
    scaleBar(ctx, 'sterk vergroot · schematisch'); return; }
  bg(ctx, 'micro'); const mo = ramp(t, q.at('beweegt'), 0.8); const tN = q.at('netwerk');
  const ank = celDier(ctx, 640, 440, 0.82, { t: t * (1 + 5 * mo), exo: true, nadruk: t > tN - 0.3 && t < q.at('kruipen') ? 'cytoskelet' : null });
  pil(ctx, 'timelapse · versneld', 640, 70, ramp(t, q.at('beweegt'), 0.5), C.grain);
  nm(ctx, 'cytoskelet', 'netwerk van eiwitdraden', ank.microtubulus, 40, -40, ramp(t, tN, 0.5), 'left');
  const ak = ramp(t, q.at('kruipen'), 0.5); if (ak > 0.01) { kruipCel(ctx, 1500, 310, 95, t, ak); nm(ctx, 'kruipen', '', [1500, 200], 0, -10, ak, 'center'); }
  const at = ramp(t, q.at('trilharen'), 0.5); if (at > 0.01) { trilharen(ctx, 1340, 1720, 600, 120, t, at); nm(ctx, 'trilharen', '', [1530, 760], 0, 20, at, 'center'); }
  scaleBar(ctx);
},
s22(ctx, t, q, st) {
  cytoGrond(ctx);
  ruwER(ctx, 120, 470, 1.25, { r0: 140, gap: 9, a0: -0.75, a1: 0.75, lagen: 3, kern: true, glad: 0, t }); golgiStapel(ctx, 1640, 450, 1.3, { t, rot: Math.PI / 2 });
  naamBij(ctx, 'ER', '', 260, 170, 1, 'center'); naamBij(ctx, 'golgisysteem', '', 1640, 220, 1, 'center');
  const yR = 560; microtubulus(ctx, 470, 1460, yR, 10, ramp(t, 0.3, 0.6));
  const drift = ramp(t, q.at('drijven'), 0.5) * (1 - ramp(t, q.at('motoreiwitten'), 0.5)); if (drift > 0.01) { const w = wander(1, t, 70, 1.2); blaasjeHeld(ctx, 760 + w.x, 380 + w.y, 34, 'er', drift, { ring: false }); pil(ctx, 'drijven: geen richting', 760, 250, drift, C.grain); }
  const am = ramp(t, q.at('motoreiwitten'), 0.5); if (am > 0.01) { const x = lerp(520, 1400, ((t - q.at('motoreiwitten')) * 0.09) % 1); const top = motorEiwit(ctx, x, yR, 10, 70, am); blaasjeHeld(ctx, top[0], top[1] - 32, 34, 'er', am);
    nm(ctx, 'motoreiwit', 'stapt hand over hand', [x + 60, yR - 40], 0, 0, am, 'left'); }
  nm(ctx, 'cytoskelet', 'draad = rails', [600, yR], 0, 70, ramp(t, q.at('rails'), 0.5), 'center');
  scaleBar(ctx, 'sterk vergroot · stap van 8 nm');
},
// ---------- H7: plantencel en dierlijke cel ----------
s23(ctx, t, q, st) {
  bg(ctx, 'schema'); const base = 760; ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(120, base); ctx.lineTo(1800, base); ctx.stroke();
  const w = (s, n) => q.at(s, n || 1);
  const tK = w('kern'), tMi = w('mitochondriën'), tRi = w('ribosomen'), tEr = w('allebei') + 0.8, tGo = w('golgisysteem'), tMe = w('celmembraan'), tLy = w('lysosomen'), tVa = w('vacuole', 1), tVast = w('vast'), tCw = w('celwand'), tZe = w('zeef'), tAl = w('allebei', 2), tCh = w('chloroplasten'), tV2 = w('vacuole', 2), tMi2 = w('mitochondriën', 2);
  const fase = (a, b) => t >= a && t < b;
  const nD = fase(tK, tMi) ? 'kern' : fase(tMi, tRi) ? 'mito' : fase(tRi, tEr) ? 'ribosoom' : fase(tEr, tGo) ? 'er' : fase(tGo, tMe) ? 'golgi' : fase(tMe, tLy) ? 'membraan' : fase(tLy, tVast) ? 'lyso' : t >= tMi2 ? 'mito' : null;
  const nP = fase(tK, tMi) ? 'kern' : fase(tMi, tRi) ? 'mito' : fase(tRi, tMe) ? 'cytoplasma' : fase(tMe, tLy) ? 'membraan' : fase(tLy, tVast) ? 'vacuole' : fase(tCw, tCh) ? 'wand' : fase(tCh, tV2) ? 'bladgroen' : fase(tV2, tMi2) ? 'vacuole' : t >= tMi2 ? 'mito' : null;
  const A = celDier(ctx, 470, 470, 0.5, { t, exo: true, nadruk: nD }); const P = plantencel(ctx, 1250, 470, 1.0, { t, nadruk: nP });
  // ook in de plantencel: ER en een golgisysteem bij de kern
  { const k = P.kern; ctx.save(); ctx.globalAlpha *= (nP === null || nP === 'cytoplasma') ? 1 : 0.35; golgiStapel(ctx, k[0] + 70, k[1] - 40, 0.22, { t, rot: 0.5 }); ctx.restore(); }
  text(ctx, 'dierlijke cel', 470, base + 50, fTekst(36, 600), C.text, 'center'); text(ctx, 'plantencel', 1250, base + 50, fTekst(36, 600), C.text, 'center');
  const lab = { kern: 'kern', mito: 'mitochondriën', ribosoom: 'ribosomen', er: 'ER', golgi: 'golgisysteem', membraan: 'celmembraan', lyso: 'lysosomen' };
  if (nD && t < tLy) nm(ctx, lab[nD], 'in allebei', [960, 150], 0, 0, 1, 'center', C.goud);
  nm(ctx, 'lysosomen', 'vooral in dierlijke cellen', A.lysosoom, 20, -20, ramp(t, tLy, 0.4) * (1 - ramp(t, tVa, 0.4)), 'left'); nm(ctx, 'vacuole', 'doet dat werk bij planten', P.vacuole, 0, 0, ramp(t, tVa, 0.4) * (1 - ramp(t, tVast, 0.4)), 'center');
  card(ctx, 1260, 70, 620, 150, 'een plant zit vast', 'en maakt zelf zijn voedsel: drie dingen extra', ramp(t, tVast, 0.5) * (1 - ramp(t, tCw, 0.5)), C.groen);
  nm(ctx, 'celwand', 'van cellulose · voor stevigheid', P.celwand, 30, -30, ramp(t, tCw, 0.5) * (1 - ramp(t, tZe - 0.6, 0.5)), 'left');
  // de wand is een zeef: water en opgeloste stoffen gaan erdoor, het membraan kiest
  const az = ramp(t, tZe - 0.6, 0.5) * (1 - ramp(t, tCh, 0.5)); if (az > 0.01) { const src = P.celwand; const Zc = { x: 1610, y: 340, r: 220 };
    zoomCircle(ctx, Zc.x, Zc.y, Zc.r, src[0], src[1], 'wand en membraan · vergroot', az, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(Zc.x - Zc.r, Zc.y - Zc.r, 2 * Zc.r, 2 * Zc.r);
      const xw = Zc.x - 60; ctx.fillStyle = rgba(C.groen, 0.18); ctx.fillRect(xw - 40, Zc.y - Zc.r, 80, 2 * Zc.r); ctx.strokeStyle = rgba(C.groen, 0.7); ctx.lineWidth = 2;
      for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(xw - 40 + k * 10, Zc.y - Zc.r); ctx.lineTo(xw - 40 + ((k * 3) % 9) * 10, Zc.y + Zc.r); ctx.stroke(); } // vezels cellulose, kruislings
      membraanBoog(ctx, Zc.x + 1400, Zc.y, 1400 - 0, Math.PI - 0.2, Math.PI + 0.2, { s: 0.9, t, eiwitten: [{ an: Math.PI - 0.02, soort: 'kanaal', open: 1 }] });
      for (let k = 0; k < 8; k++) { const ph = (t * 0.35 + k / 8) % 1, y = Zc.y - 180 + k * 48; const groot = k % 3 === 0; const xe = groot ? Zc.x + 6 : Zc.x + 200; const x = lerp(Zc.x - 230, xe, Math.min(1, ph * 1.2));
        if (groot) glucoseMol(ctx, x, y, 1.6, az * (1 - ramp(ph, 0.85, 0.15))); else waterMol(ctx, x, y, 1.5, az * (1 - ramp(ph, 0.9, 0.1)), k); }
      metaText(ctx, 'wand', Zc.x - 40, Zc.y + Zc.r - 80, C.groen, 'right', 22); metaText(ctx, 'membraan', Zc.x + 50, Zc.y + Zc.r - 80, C.er, 'left', 22); });
    nm(ctx, 'wand = zeef', 'het membraan kiest', [1610, 120], 0, -34, az, 'center', C.goud); }
  haak(ctx, 960, 1560, base + 70, 'wand eromheen, membraan ertegenaan: allebei', C.groen, ramp(t, tAl, 0.5) * (1 - ramp(t, tCh, 0.5)));
  nm(ctx, 'chloroplasten', 'bladgroenkorrels · fotosynthese', P.bladgroenkorrel, 20, -30, ramp(t, tCh + 0.4, 0.5) * (1 - ramp(t, tV2, 0.5)), 'left');
  card(ctx, 1300, 70, 580, 150, 'fotosynthese', 'licht + water + CO₂ → glucose', ramp(t, w('fotosynthese'), 0.5) * (1 - ramp(t, tV2, 0.4)), C.groen);
  nm(ctx, 'grote vacuole', '', P.vacuole, 0, 0, ramp(t, tV2, 0.5) * (1 - ramp(t, tMi2, 0.5)), 'center');
  if (t >= tMi2) nm(ctx, 'mitochondriën?', '', [960, 150], 0, 0, ramp(t, tMi2, 0.5), 'center', C.goud);
  scaleBar(ctx, 'vereenvoudigd · niet op schaal');
},
s25(ctx, t, q, st) {
  bg(ctx, 'schema');
  const night = ramp(t, q.at('donker'), 1.0) * (1 - ramp(t, q.at('mitochondrium'), 0.8));
  ctx.save(); ctx.globalAlpha = 1 - night; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(960, 170, 54, 0, 6.283); ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha = night; ctx.fillStyle = C.text2; ctx.beginPath(); ctx.arc(960, 170, 46, 0, 6.283); ctx.fill(); ctx.fillStyle = C.bgSchema; ctx.beginPath(); ctx.arc(983, 156, 42, 0, 6.283); ctx.fill(); ctx.restore();
  const hyp = 1 - ramp(t, q.at('mitochondrium'), 0.8);
  chloroplastEcht(ctx, 650, 470, 2.0, { t, licht: 1 - night }); mitochondrionEcht(ctx, 1290, 470, 2.0, { t, cristae: 11, a: lerp(1, 0.3, hyp), seed: 3 });
  const gl = 1 - night; molFlow(ctx, [[860, 470], [1080, 470]], 5, t, 80, (x, y, a, k) => glucoseMol(ctx, x, y, 1.5, a, t * 0.5 + k), 1000, gl); naamBij(ctx, 'glucose', '', 970, 420, gl, 'center', C.oker);
  molFlow(ctx, [[1500, 470], [1720, 360]], 6, t, 90, (x, y, a) => atpMol(ctx, x, y, 1.4, a), 1100, 1 - night * hyp); naamBij(ctx, 'ATP', '', 1730, 330, 1 - night * hyp, 'center', C.koraal);
  if (night > 0.3) pil(ctx, 'geen licht → geen nieuwe glucose', 650, 300, night, C.koraal);
  nm(ctx, 'chloroplast', 'maakt glucose · alleen bij licht', [615, 600], 0, 40, 1, 'center'); nm(ctx, 'mitochondrium', 'verbrandt glucose · dag en nacht', [1325, 600], 0, 40, 1, 'center');
  haak(ctx, 450, 1490, 720, 'allebei nodig, in elke plantencel', C.groen, ramp(t, q.at('allebei'), 0.5));
},
s26(ctx, t, q, st) {
  cytoGrond(ctx);
  const ag = ramp(t, q.at('grana'), 0.6); const c = chloroplastEcht(ctx, 560, 470, 3.0, { t, licht: 1 });
  const src = c.granum || [560, 470];
  zoomCircle(ctx, 1380, 430, 280, src[0], src[1], 'granum: stapel schijfjes (thylakoïden)', ag, () => { ctx.fillStyle = '#2B4A36'; ctx.fillRect(1100, 150, 560, 560); granum(ctx, 1380, 430, 300, 6, ramp(t, q.at('eiwitten'), 0.6)); });
  nm(ctx, 'eiwitten die licht vangen', '', [1380, 150], 0, -62, ramp(t, q.at('eiwitten'), 0.5), 'center', C.goud);
  const al = ramp(t, q.at('licht', 1), 0.5); if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; for (let k = 0; k < 3; k++) { const x = 1150 + k * 90, y = 120; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20; ctx.lineTo(x + u * 80 + Math.sin(u * 18 + t * 6) * 6, y + u * 120); } ctx.stroke(); } ctx.restore(); }
  haak(ctx, 1100, 1660, 790, 'veel oppervlak, veel licht · net als de cristae', C.groen, ramp(t, q.at('cristae'), 0.5));
  scaleBar(ctx);
},
// ---------- Recap ----------
s27(ctx, t, q, st) {
  bg(ctx, 'schema');
  const rr = ramp(t, q.at('route'), 0.6);
  const ab = ramp(t, q.at('bacterie'), 0.5) * (1 - rr); if (ab > 0.01) { bacterieEcht(ctx, 560, 400, 300, { t, a: ab }); celDier(ctx, 1300, 420, 0.42, { t, a: ab * ramp(t, q.at('jouw'), 0.5) });
    nm(ctx, 'één ruimte', 'bacterie · vergroot', [560, 480], 0, 40, ab, 'center'); // 2.1: in s04 op schaal, hier vergroot nm(ctx, 'afdelingen', 'organellen', [1300, 600], 0, 40, ab * ramp(t, q.at('organellen'), 0.5), 'center');
    pil(ctx, 'niet lekken · niet pompen', 960, 760, ramp(t, q.at('puzzel'), 0.5) * ab, C.goud); }
  const items = [['kern', 'bouwtekening', 'kern,', (x, y) => kernEnvelopPorie(ctx, x, y, 0.36, { r: 150, t, mrna: 0.6, mrnaPorie: 10 })], ['ribosomen', 'maken eiwit', 'ribosomen,', (x, y) => ribosoomEcht(ctx, x, y + 24, 0.32, { keten: 9, t })],
    ['ER', 'vouwen', q.at('golgisysteem') - 0.9, (x, y) => ruwER(ctx, x - 70, y + 60, 0.55, { r0: 90, a0: -1.45, a1: -0.25, lagen: 3, kern: true, glad: 0, t })], ['golgisysteem', 'sorteert, verpakt', 'golgisysteem,', (x, y) => golgiStapel(ctx, x, y + 6, 0.5, { t })],
    ['blaasjes', 'vervoer', 'blaasjes.', (x, y) => blaasjeHeld(ctx, x, y, 28, 'golgi', 1, { ring: false })], ['membraan', 'poort', 'membraan', (x, y) => blaasjeVersmelt(ctx, x, y + 22, 1.0, { f: 0.85, R: 420, t })]];
  items.forEach((it, i) => { const cue = (k) => typeof k === 'number' ? k : q.at(k); const a = rr * ramp(t, cue(it[2]), 0.4); if (a <= 0.01) return; const x = 190 + i * 308; beeldKaart(ctx, x, 470, 270, 300, it[0], it[1], a, ramp(t, cue(it[2]), 0.2) * (1 - ramp(t, cue(items[Math.min(5, i + 1)][2]), 0.2)) + (i === 5 ? ramp(t, q.at('poort'), 0.2) : 0), it[3]);
    if (i < 5) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 140, 470); ctx.lineTo(x + 168, 470); ctx.lineTo(x + 160, 463); ctx.moveTo(x + 168, 470); ctx.lineTo(x + 160, 477); ctx.stroke(); ctx.restore(); } });
  haak(ctx, 100, 1820, 650, 'een fabriek die leeft', C.groen, ramp(t, q.at('fabriek'), 0.5));
}
};
