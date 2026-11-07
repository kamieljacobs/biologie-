// DEFINITIEF (inbouw 28 okt 2026): variant C, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// DIERLIJKE CEL met alle organellen (Micro-look), opbouw zoals een leerboekplaat — ronde 2: cel ronder
// (940 × 840), ruw ER sluit op zes plekken met brede halsjes aan op het buitenste kernmembraan (lumen in
// dezelfde kleur als de perinucleaire ruimte), mitochondriën ± 1/3 van de kerndiameter, groter
// exocytoseblaasje dat in het membraan opgaat. Recept: de cel is rond
// (hier bijna rond, 910 × 850), celmembraan als gebogen dubbellaag; de kern ± 1/3 van de celdiameter en
// niet in het midden, met dubbel kernmembraan, poriën, chromatine en nucleolus. Het ruw ER buigt in lagen om
// de kern en loopt door in het buitenste kernmembraan; aan het eind gaat het over in het glad ER (buisjes).
// Het golgi-apparaat ligt naast de kern met de cis-kant naar de kern; blaasjes snoeren aan de transkant af,
// reizen langs microtubuli naar het celmembraan en versmelten ermee (exocytose, animatie met t). Naast de kern
// het centrosoom: twee centriolen haaks op elkaar (elk 9 tripletten microtubuli), met een ster van
// microtubuli tot aan het membraan. Mitochondriën (± 1/10 van de cellengte), lysosomen, losse ribosomen en
// een rustige textuur in het cytoplasma. Alles blijft binnen het celmembraan, behalve wat versmelt.
// Bron: OpenStax Biology 2e fig. 4.10, 4.13, 4.14 (centrosoom: twee centriolen haaks, elk 9 tripletten) en
// § 4.4 (ER doorlopend met de kernenvelop, glad ER doorlopend met ruw ER, cis-kant naar het ER, blaasjes naar
// het plasmamembraan); BioNumbers 100436 (mitochondrion ± 1 µm). Referentieplaat (ElevenLabs): organel/cel.png.
// Bekende fouten: een lege cel met vijf losse organellen; kern precies in het midden; ER los van de kern;
// golgi zonder richting; één centriool of twee evenwijdige; organellen die over het membraan steken.
// Gebruik: celDier(ctx, x, y, s, { a, t, nadruk = null | 'kern'|'er'|'golgi'|'mito'|'lyso'|'centrosoom'|
//   'blaasje'|'membraan'|'ribosoom'|'cytoskelet', exo = true, mrna = -1 }). Ontwerpmaat 910 × 850 bij s = 1.
//   nadruk: dat organel blijft vol, de rest gaat naar 35 %.
// Geeft ankerpunten terug (scherm): { cel, membraan, cytoplasma, kern, nucleolus, kernporie, ruwER, gladER,
//   golgi, golgiCis, golgiTrans, mito, mitos[], lysosoom, centrosoom, blaasje, ribosoom, microtubulus }.
// Vereist: mitochondrionEcht, ruwER, kernEnvelopPorie, golgiStapel, blaasjeVersmelt (zelfde ronde), en uit
//   lib.js: C, rgba, lighten, hash, clamp, lerp, ease, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function celDier(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, nadruk = null, exo = true, mrna = -1 } = o;
  const RX = 455, RY = 425; const rFn = (f) => { const c = Math.cos(f), sn = Math.sin(f); return 1 / Math.sqrt(c * c / (RX * RX) + sn * sn / (RY * RY)) * (1 + 0.009 * Math.sin(4 * f + 1) + 0.006 * Math.sin(7 * f + 2)); };
  const P = (lx, ly) => [x + lx * s, y + ly * s]; const pol = (f, d = 0) => [Math.cos(f) * (rFn(f) - d), Math.sin(f) * (rFn(f) - d)];
  const K = { x: -150, y: -10, r: 165 }, G = { x: 205, y: -40, rot: Math.PI / 2 }, CS = { x: 105, y: -250 };
  const MITO = [[-385, -40, 1.75, 100], [-300, 235, 0.6, 108], [-95, 320, -0.15, 96], [130, 300, 0.3, 104], [320, 215, -0.65, 92], [385, -60, 1.45, 96], [255, -300, 0.55, 88], [-275, -290, -0.55, 94]];
  const LYSO = [[-395, 110, 17], [-170, -345, 14], [385, 70, 16], [20, 375, 13]];
  // exocytose: drie banen golgi(trans) → membraan, versprongen in de tijd
  const SITES = [-0.62, 0.05, 0.42], PER = 8, rv = 28;
  const golgiT = [G.x + 70, G.y];
  const baan = SITES.map((f, i) => { const u = (((t / PER) + i / SITES.length) % 1 + 1) % 1; const eind = pol(f, rv * 3.6 + 3); return { f, u, eind, reis: ease(clamp(u / 0.5, 0, 1)), fus: clamp((u - 0.5) / 0.5, 0, 1) }; });
  const vesPos = (b) => [lerp(golgiT[0] + 10, b.eind[0], b.reis), lerp(golgiT[1], b.eind[1], b.reis) + Math.sin(b.reis * Math.PI) * -20];
  const anker = { cel: P(0, 0), membraan: P(...pol(-2.4, 0)), cytoplasma: P(-60, 360), kern: P(K.x, K.y), nucleolus: P(K.x - K.r * 0.22, K.y + K.r * 0.12), kernporie: P(K.x + Math.cos(2.9) * K.r, K.y + Math.sin(2.9) * K.r),
    ruwER: P(K.x + Math.cos(-0.3) * (K.r + 50), K.y + Math.sin(-0.3) * (K.r + 50)), gladER: P(K.x + Math.cos(1.75) * (K.r + 70), K.y + Math.sin(1.75) * (K.r + 70)), golgi: P(G.x, G.y), golgiCis: P(G.x - 40, G.y), golgiTrans: P(G.x + 50, G.y),
    mito: P(MITO[4][0], MITO[4][1]), mitos: MITO.map(m => P(m[0], m[1])), lysosoom: P(LYSO[2][0], LYSO[2][1]), centrosoom: P(CS.x, CS.y), blaasje: P(...vesPos(baan[1])), ribosoom: P(-330, 60), microtubulus: P(150, -290) };
  if (a <= 0.01) return anker;
  const A = (n) => (nadruk === null || nadruk === n) ? 1 : 0.35;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a;
  // cytoplasma
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const omtrek = (d) => { ctx.beginPath(); for (let i = 0; i <= 160; i++) { const f = i / 160 * 6.283; const [px, py] = pol(f, d); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  omtrek(0); ctx.fillStyle = '#26324A'; ctx.fill();
  omtrek(5); ctx.clip();
  // rustige textuur
  for (let i = 0; i < 160; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)); ctx.beginPath(); ctx.arc(Math.cos(an) * rr * RX, Math.sin(an) * rr * RY, 1.5, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.11); ctx.fill(); }
  // microtubuli: ster vanuit het centrosoom tot vlak onder het membraan
  ctx.save(); ctx.globalAlpha *= A('cytoskelet') * 0.6; ctx.strokeStyle = C.line; ctx.lineWidth = lw(0.9);
  for (let i = 0; i < 26; i++) { const f = i / 26 * 6.283 + 0.1; const [ex, ey] = pol(Math.atan2(CS.y + Math.sin(f) * 900, CS.x + Math.cos(f) * 900) , 9);
    const dx = ex - CS.x, dy = ey - CS.y; const kr = (hash(i * 3) - 0.5) * 0.18; ctx.beginPath(); ctx.moveTo(CS.x + Math.cos(f) * 16, CS.y + Math.sin(f) * 16); ctx.quadraticCurveTo(CS.x + dx / 2 - dy * kr, CS.y + dy / 2 + dx * kr, ex, ey); ctx.stroke(); }
  ctx.restore();
  // losse ribosomen
  ctx.save(); ctx.globalAlpha *= A('ribosoom'); ctx.fillStyle = C.ribo;
  for (let i = 0; i < 170; i++) { const an = hash(i * 17) * 6.283, d = Math.sqrt(hash(i * 17 + 1)) * 0.93; const px = Math.cos(an) * d * RX, py = Math.sin(an) * d * RY;
    if (Math.hypot(px - K.x, py - K.y) < K.r + 105 || Math.hypot(px - G.x, py - G.y) < 110) continue; const w = wander(i, t, 2, 0.5); ctx.beginPath(); ctx.arc(px + w.x, py + w.y, 2, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.restore();
  // ruw + glad ER (rechts om de kern, glad ER loopt naar onder), en een kleinere stapel links
  const Pk = P(K.x, K.y);
  // kern eerst, dan het ER erop: de halsjes overbruggen het buitenste kernmembraan (lumen loopt door)
  const gapK = Math.max(7, K.r * 0.075), kLum = _mixHex(C.er, '#1A2740', 0.72);
  kernEnvelopPorie(ctx, Pk[0], Pk[1], s, { a: A('kern'), t, r: K.r, mrna, mrnaPorie: 6, tusKleur: kLum });
  const pf = Array.from({ length: 14 }, (_, i) => 0.31 + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / 14 * 6.283); // poriën van kernEnvelopPorie (doorsnede)
  const vrij = (f) => { let g = f; for (let it = 0; it < 6; it++) { const q = pf.map(p => Math.atan2(Math.sin(g - p), Math.cos(g - p))).reduce((m, d) => Math.abs(d) < Math.abs(m) ? d : m, 9); if (Math.abs(q) > 0.16) break; g += (q >= 0 ? 1 : -1) * 0.06; } return g; };
  ruwER(ctx, Pk[0], Pk[1], s, { a: A('er'), t, r0: K.r, gap: gapK, a0: -1.25, a1: 1.15, lagen: 4, kern: false, envelop: false, aansl: [-1.08, -0.45, 0.25, 0.95].map(vrij), glad: 1 });
  ruwER(ctx, Pk[0], Pk[1], s, { a: A('er'), t, r0: K.r, gap: gapK, a0: 2.35, a1: 3.55, lagen: 3, kern: false, envelop: false, aansl: [2.6, 3.3].map(vrij), glad: 0 });
  const Pg = P(G.x, G.y); const ga = golgiStapel(ctx, Pg[0], Pg[1], s * 0.95, { a: A('golgi'), t, rot: G.rot, blaasjes: true }); anker.golgiCis = ga.cis; anker.golgiTrans = ga.trans;
  MITO.forEach(([mx, my, mr, ml], i) => { const w = wander(i + 50, t, 3, 0.3); const Pm = P(mx + w.x, my + w.y); mitochondrionEcht(ctx, Pm[0], Pm[1], s, { a: A('mito'), t, rot: mr, lang: ml, dik: ml * 0.4, seed: i }); });
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // lysosomen: rond, met verteringsdeeltjes
  LYSO.forEach(([lx, ly, lr], i) => { ctx.save(); ctx.globalAlpha *= A('lyso'); ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 6.283); ctx.fillStyle = _mixHex(C.lyso, '#1A2740', 0.35); ctx.fill(); ctx.strokeStyle = lighten(C.lyso, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
    ctx.fillStyle = rgba(lighten(C.lyso, 0.5).replace(/rgb\((\d+),(\d+),(\d+)\)/, (m, r, g, b) => '#' + [r, g, b].map(v => (+v).toString(16).padStart(2, '0')).join('')), 0.6); for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(lx + (hash(k + i * 9) - 0.5) * lr, ly + (hash(k * 3 + i) - 0.5) * lr, 1.6, 0, 6.283); ctx.fill(); } ctx.restore(); });
  // centrosoom: twee centriolen haaks op elkaar (één in lengte, één van boven: ring van 9 tripletten)
  ctx.save(); ctx.globalAlpha *= A('centrosoom'); const kc = '#BFC8D8';
  ctx.beginPath(); ctx.arc(CS.x, CS.y, 30, 0, 6.283); ctx.fillStyle = rgba(C.line, 0.12); ctx.fill();
  ctx.save(); ctx.translate(CS.x - 9, CS.y); ctx.rotate(0.5); ctx.fillStyle = _mixHex(kc, '#1A2740', 0.5); ctx.fillRect(-7, -17, 14, 34); ctx.strokeStyle = kc; ctx.lineWidth = lw(1.1); ctx.strokeRect(-7, -17, 14, 34);
  for (const dx of [-4.5, -1.5, 1.5, 4.5]) { ctx.beginPath(); ctx.moveTo(dx, -16); ctx.lineTo(dx, 16); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.translate(CS.x + 13, CS.y + 6); for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283 + 0.3; ctx.save(); ctx.translate(Math.cos(an) * 9, Math.sin(an) * 9); ctx.rotate(an + 1.1);
    for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.arc(j * 2.6 - 2.6, 0, 1.35, 0, 6.283); ctx.fillStyle = kc; ctx.fill(); } ctx.restore(); } ctx.restore();
  ctx.restore();
  // reizende blaasjes (golgi → membraan) met een eiwit met suikerketen
  if (exo) baan.forEach((b) => { if (b.u >= 0.5) return; const [vx, vy] = vesPos(b); const g = ease(clamp(b.u / 0.06, 0, 1)); ctx.save(); ctx.globalAlpha *= A('blaasje');
    ctx.beginPath(); ctx.arc(vx, vy, rv * g, 0, 6.283); ctx.fillStyle = _mixHex(C.ves, '#1A2740', 0.55); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.5); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx, vy, (rv - 6) * g, 0, 6.283); ctx.stroke(); ctx.fillStyle = C.oker; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(vx + (hash(k * 7) - 0.5) * 18 * g, vy + (hash(k * 7 + 1) - 0.5) * 18 * g, 3, 0, 6.283); ctx.fill(); } ctx.restore(); });
  ctx.restore();
  // celmembraan (dubbele lijn) met gaten waar een blaasje versmelt; het stuk daar tekent blaasjeVersmelt
  ctx.save(); ctx.globalAlpha *= A('membraan'); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.er; ctx.lineWidth = lw(1.5);
  const U = rv * 3.4; const gaten = exo ? SITES.map(f => [f - U / rFn(f) + 0.004, f + U / rFn(f) - 0.004]) : [];
  for (const d of [-3, 3]) { ctx.beginPath(); let pen = false; for (let i = 0; i <= 400; i++) { const f = i / 400 * 6.283 - Math.PI; if (gaten.some(([g0, g1]) => f > g0 && f < g1)) { pen = false; continue; } const [px, py] = pol(f, d); if (pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; } } ctx.stroke(); }
  ctx.fillStyle = lighten(C.enzym, 0.2); for (let i = 0; i < 18; i++) { const f = i / 18 * 6.283 + 0.17; if (gaten.some(([g0, g1]) => f > g0 - 0.05 && f < g1 + 0.05)) continue; const [px, py] = pol(f, 0); ctx.save(); ctx.translate(px, py); ctx.rotate(f); ctx.fillRect(-5, -3.5, 10, 7); ctx.restore(); }
  ctx.restore();
  if (exo) { ctx.save(); ctx.globalAlpha *= A('membraan') > A('blaasje') ? A('membraan') : A('blaasje');
    baan.forEach((b) => blaasjeVersmelt(ctx, 0, 0, s, { cx: x, cy: y, hoek: b.f, rFn, rv, dikte: 6, f: b.fus, t, alleenMembraan: b.u < 0.5, cytoplasma: false })); ctx.restore(); }
  ctx.restore();
  return anker;
}
