// ===== Diffusie en osmose 2.0: moleculen en transporteiwitten (29 okt 2026, prompt v13) =====
// Nieuwe objecten voor deze film (C9). Staan nog niet in bibliotheek/lib_bio.js; zie bron/opwaardering-v13.md
// 'Voor de bibliotheek'. Kleuren volgens Part C: water en zuurstof teal, kleurstof goud (focus in deze film),
// glucose en mineralen oker, Na⁺ oker, Cl⁻ grijsblauw, K⁺ groen (zelfde als de zenuwfilms), eiwitten C.enzym.

// WATER (H₂O). Recept: één O-atoom met twee H-atomen in een V van 104,5°; O-straal ± 1,5 × H-straal
// (O-atoom groter dan H). O teal, H licht. Bekende fouten: water als
// bolletje of als rechte H-O-H; H groter dan O.
const H2O_HOEK = 104.5 / 2 * Math.PI / 180;
function h2o(ctx, x, y, r = 5, an = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(Math.sin(k * H2O_HOEK) * r * 1.05, Math.cos(k * H2O_HOEK) * r * 1.05, r * 0.62, 0, 6.283); ctx.fillStyle = '#DCE6EE'; ctx.fill(); }
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fillStyle = C.teal; ctx.fill();
  ctx.restore();
}
// watermoleculen in een rechthoek, rustig dwalend en draaiend (deterministisch, terugspoelbaar).
// mijd(x, y) → true = hier geen molecuul (bv. de lege zone bij het gaatje in s21).
function waterField(ctx, x0, y0, x1, y1, n, t, speed = 1.6, alpha = 0.55, seed = 0, r = 3.2, mijd = null) {
  if (alpha <= 0.01) return; const rr = Math.max(3, r * 1.15);
  for (let i = 0; i < n; i++) { const bx = x0 + hash(i * 2 + seed) * (x1 - x0), by = y0 + hash(i * 2 + 1 + seed) * (y1 - y0); const w = wander(i + seed, t, 18, speed);
    const x = clamp(bx + w.x, x0, x1), y = clamp(by + w.y, y0, y1); let a = alpha; if (mijd) { const m = mijd(x, y); if (m >= 1) continue; a *= 1 - m; }
    h2o(ctx, x, y, rr, hash(i * 5 + seed) * 6.283 + t * speed * 0.3 * (hash(i + seed) - 0.5), a); }
}
// KLEURSTOF: een klein organisch kleurstofmolecuul, getekend als twee gekoppelde zesringen (± 1 nm, iets groter
// dan glucose, veel groter dan water). Goud = het onderwerp van deze film. foc = gouden rand (één molecuul volgen, C8).
function kleurstof(ctx, x, y, s = 1, an = 0, a = 1, foc = false) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); const r = 7 * s, dx = r * Math.cos(Math.PI / 6);
  for (const k of [-1, 1]) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const q = Math.PI / 6 + i * Math.PI / 3; const px = k * dx + Math.cos(q) * r, py = Math.sin(q) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
    shape(ctx, foc ? '#F2F2EE' : C.goud, foc ? C.goud : lighten(C.goud, 0.4), foc ? 2.5 * s : 1.2); }
  ctx.restore();
}
// IONEN. Na⁺ klein, Cl⁻ duidelijk groter (ionstraal ± 1,8×). In water zit elk ion in een watermantel: bij Na⁺ wijzen
// de O-kanten van ± 6 watermoleculen naar het ion, bij Cl⁻ de H-kanten (Colorado State University BC401, 'Ion-dipole'). Daardoor is een opgelost ion veel groter dan het kale ion en komt het
// niet door de vetlaag (OpenStax Biology AP 5.2: ionen hebben hulp nodig). Bekende fouten: mantel met water dat
// de verkeerde kant op wijst; Cl⁻ even klein als Na⁺.
const ION = { na: C.oker, cl: '#9FB3C8', k: C.groen };
function ionMol(ctx, x, y, soort = 'na', s = 1, a = 1, mantel = false, t = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = (soort === 'cl' ? 12.5 : soort === 'k' ? 10.5 : 8) * s, col = ION[soort] || C.oker;
  if (mantel) { const nm = soort === 'cl' ? 7 : 6, R = r + 8.5 * s; for (let k = 0; k < nm; k++) { const q = k / nm * 6.283 + 0.4 + Math.sin(t * 1.3 + k) * 0.08;
      h2o(ctx, x + Math.cos(q) * R, y + Math.sin(q) * R, 4.6 * s, soort === 'cl' ? q - Math.PI / 2 : q + Math.PI / 2, 0.95); } }
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.3);
  text(ctx, soort === 'cl' ? '−' : '+', x, y + r * 0.42, fTekst(Math.round(r * 1.25), 700), C.bgMicro, 'center');
  ctx.restore();
}
// Zout als paar losse ionen (Na⁺ en Cl⁻ naast elkaar, opgelost, dus niet tegen elkaar aan).
function zoutDeeltjes(ctx, x, y, s = 1, a = 1, mantel = false, t = 0, k = 0) {
  ionMol(ctx, x, y, k % 2 ? 'cl' : 'na', s, a, mantel, t);
}
// GLUCOSE: zesring (vijf C en één O in de ring) met een CH₂OH-zijtak; oker (voedsel, C1). ± 1 nm.
function glucoseMol(ctx, x, y, s = 1, a = 1, an = 0) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); const r = 13 * s;
  const P = []; for (let i = 0; i < 6; i++) { const q = Math.PI / 6 + i * Math.PI / 3; P.push([Math.cos(q) * r, Math.sin(q) * r]); }
  ctx.strokeStyle = lighten(C.oker, 0.35); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(P[4][0], P[4][1]); ctx.lineTo(P[4][0] - 2 * s, P[4][1] - 9 * s); ctx.stroke();
  ctx.beginPath(); ctx.arc(P[4][0] - 2 * s, P[4][1] - 11 * s, 3 * s, 0, 6.283); ctx.fillStyle = lighten(C.oker, 0.35); ctx.fill();
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, C.oker, lighten(C.oker, 0.4), 1.4 * s);
  ctx.beginPath(); ctx.arc(P[5][0], P[5][1], 3.2 * s, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); // O in de ring
  ctx.restore();
}
function o2(ctx, x, y, s = 1, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(x + k * 5.5 * s, y, 7 * s, 0, 6.283); shape(ctx, C.teal, lighten(C.teal, 0.35), 1.2); } ctx.restore(); }
function co2(ctx, x, y, s = 1, alpha = 1) { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(x + k * 11 * s, y, 6.5 * s, 0, 6.283); shape(ctx, '#AEB6C2', lighten('#AEB6C2', 0.3), 1.1); } ctx.beginPath(); ctx.arc(x, y, 7.5 * s, 0, 6.283); shape(ctx, '#5E6878', lighten('#8A93A3', 0.2), 1.1); ctx.restore(); }
// mineraal in de bodem (bv. nitraat of kalium): klein oker ion
function mineraalIon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 7 * s, 0, 6.283); shape(ctx, C.oker, lighten(C.oker, 0.4), 1.2); ctx.restore(); }

// ===== membraan op de beeldbank =====
// Horizontaal membraan (bolle kant boven = buiten) als stukje van een grote cirkel: membraanBoog uit de beeldbank,
// middellijn volgt mY(x, y) uit scenes_lib.js. gaten: [[xa, xb], ...] waar een eigen eiwit komt (drager, pomp).
const MEM_S = 1.6;
const anH = (x) => -Math.PI / 2 + Math.asin(clamp((x - MEM_CX) / MEM_R, -1, 1));
function memH(ctx, y, x0, x1, o = {}) {
  const { t = 0, s = MEM_S, gaten = [], kanalen = [], a = 1 } = o; if (a <= 0.01) return;
  const cy = y + MEM_R; const delen = []; let start = x0; [...gaten].sort((p, q) => p[0] - q[0]).forEach(g => { delen.push([start, g[0]]); start = g[1]; }); delen.push([start, x1]);
  delen.forEach(([p, q]) => { if (q - p < 10) return; const eiw = kanalen.filter(k => k.x > p && k.x < q).map(k => ({ an: anH(k.x), soort: 'kanaal', open: k.open == null ? 1 : k.open }));
    membraanBoog(ctx, MEM_CX, cy, MEM_R, anH(p), anH(q), { s, t, a, eiwitten: eiw }); });
}
// Verticaal membraan (bolle kant links): middelpunt rechts op (x + R, cy). anV(y) = hoek bij hoogte y.
function memV(ctx, x, y0, y1, o = {}) {
  const { t = 0, s = MEM_S, R = 1300, cy = (y0 + y1) / 2, kanalen = [], a = 1 } = o; if (a <= 0.01) return;
  const an = (y) => Math.PI - Math.asin(clamp((y - cy) / R, -1, 1));
  return membraanBoog(ctx, x + R, cy, R, an(y0), an(y1), { s, t, a, eiwitten: kanalen.map(k => ({ an: an(k.y), soort: 'kanaal', open: k.open == null ? 1 : k.open })) });
}
const memVX = (x, y, R = 1300, cy) => x + R - Math.sqrt(R * R - (y - cy) * (y - cy));

// DRAGEREIWIT (gefaciliteerde diffusie) en POMP (actief transport). Recept (OpenStax Biology for AP Courses 5.2–5.3):
// één eiwit dat het membraan met ± 10–12 α-helices oversteekt, getekend als twee helften van kralen-helices (zelfde
// kralenstijl als de eiwitten in membraanBoog); het bindt het deeltje in een holte in het midden en klapt om
// ('alternating access'): eerst open naar buiten, dan naar binnen. Er is nooit een doorlopende tunnel (anders dan een
// kanaal). flip 0 = open naar buiten (boven), 1 = open naar binnen. De pomp heeft binnen een ATP-bindend domein (een
// gevouwen kralenkluwen, eiwitVouw) waar ATP → ADP + P gebeurt. Bekende fouten: drager als tunnel; pomp zonder
// energiebron; eiwit als gladde pil.
function _transportHelft(ctx, sd, hw, H, kb, col, nHelix, fase) {
  for (let k = 0; k < nHelix; k++) { const x0 = sd * hw * (0.55 + k * 1.05), h = H * (0.9 - 0.06 * k);
    _kkHelix(ctx, [x0, -h / 2], [x0, h / 2], kb, col, { fase: fase + k * 1.7, amp: 0.55, stap: 0.95 }); }
  for (let k = 0; k < nHelix - 1; k++) { const xa = sd * hw * (0.55 + k * 1.05), xb = sd * hw * (0.55 + (k + 1) * 1.05), boven = k % 2 === 0, yy = (boven ? -1 : 1) * H * 0.45;
    _kkPad(ctx, [[xa, yy], [(xa + xb) / 2, yy + (boven ? -1 : 1) * hw * 0.55], [xb, yy]], kb, col, { stap: 2.1 }); }
}
function dragerEiwit(ctx, x, y, an, s = 1, flip = 0, o = {}) {
  const { a = 1, col = C.enzym, nHelix = 2, t = 0 } = o; if (a <= 0.01) return; const kr = 6 * s, hw = kr * 1.9, H = kr * 15, kb = Math.max(hw * 0.32, 2.2);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const th = lerp(0.2, -0.2, ease(flip));
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * hw * 0.35, 0); ctx.rotate(sd * th); _transportHelft(ctx, sd, hw, H, kb, col, nHelix, sd * 0.8 + t * 0.2); ctx.restore(); }
  ctx.restore();
}
function pompEiwit(ctx, x, y, an, s = 1, flip = 0, o = {}) {
  const { a = 1, t = 0, domein = true } = o; if (a <= 0.01) return;
  dragerEiwit(ctx, x, y, an, s, flip, { a, nHelix: 3, t });
  if (domein) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
    eiwitVouw(ctx, -6 * s * 4, 6 * s * 13, 0.42 * s, 1, Array.from({ length: 44 }, (_, i) => i % 8), { kleur: 'eiwit', t, seed: 3 }); ctx.restore(); }
}
// hoek (rotatie) van het membraan bij x, zodat een eiwit loodrecht in de laag staat
const memRot = (x) => mA(x);

// RODE BLOEDCEL bij osmose. Normaal = rodeBloedcel (ingedeukte schijf, 7–8 µm). In hypotone oplossing neemt hij water op
// en wordt bol (sferocyt) zonder deuk; boven ± 1,7× het volume scheurt het membraan: het hemoglobine stroomt eruit en
// er blijft een bleek, leeg membraan over (een 'ghost'): hemolyse. In hypertone oplossing verliest hij water en
// krimpt hij met uitstulpingen (gekarteld, crenatie). Bron: OpenStax Biology for AP Courses 5.2 (lyse, crenatie). Bekende fouten: een bloedcel die in stukken uit elkaar spat (het membraan blijft als vlies over).
function bloedcelOsmose(ctx, x, y, r, swell = 0, cren = 0, burst = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (burst > 0) { const rr = r * 1.22;
    for (let k = 0; k < 46; k++) { const q = hash(k * 5) * 6.283, d = rr * (0.3 + 1.5 * burst * Math.sqrt(hash(k * 5 + 1))); ctx.beginPath(); ctx.arc(x + Math.cos(q) * d, y + Math.sin(q) * d, 3, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.7 * (1 - burst * 0.5)); ctx.fill(); }
    ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.85 * (1 - burst)); ctx.fill();
    ctx.strokeStyle = rgba('#E8B8B0', 0.85); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, rr, -0.9 + burst * 0.25, 4.9 - burst * 0.25); ctx.stroke();
    ctx.restore(); return; }
  if (swell <= 0.01 && cren <= 0.01) { rodeBloedcel(ctx, x, y, r, 0, 0, 1); ctx.restore(); return; }
  const rr = r * (1 + 0.2 * swell) * (1 - 0.18 * cren);
  ctx.beginPath(); for (let i = 0; i <= 120; i++) { const q = i / 120 * 6.283; const sp = 1 + cren * 0.12 * Math.pow(Math.max(0, Math.sin(q * 11)), 2); const px = x + Math.cos(q) * rr * sp, py = y + Math.sin(q) * rr * sp; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.closePath(); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1.5);
  ctx.beginPath(); ctx.ellipse(x, y, rr * 0.45 * (1 - swell), rr * 0.45 * (1 - swell), 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - swell) * (1 - cren)); ctx.fill();
  if (swell > 0.3) { ctx.beginPath(); ctx.arc(x - rr * 0.3, y - rr * 0.3, rr * 0.28, 0, 6.283); ctx.fillStyle = rgba('#F0A090', 0.18 * swell); ctx.fill(); }
  ctx.restore();
}
// Eén fosfolipide groot, in dezelfde kleuren als membraanBoog (kop C.er, staarten vetkleur V.vt): kop rond, twee
// staarten ± 2× zo lang als de kop breed is, één met een knik (onverzadigd). dir 1 = staarten omlaag.
function fosfolipideGroot(ctx, x, y, s = 1, dir = 1, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * dir);
  ctx.strokeStyle = V.vt; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-9, 18); ctx.lineTo(-9, 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(9, 18); ctx.lineTo(9, 56); ctx.lineTo(18, 68); ctx.lineTo(18, 100); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 22, 0, 6.283); shape(ctx, C.er, _mixHex(C.er, '#FFFFFF', 0.3), 2);
  ctx.restore();
}
