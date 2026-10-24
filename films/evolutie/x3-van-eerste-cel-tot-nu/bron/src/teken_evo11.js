// Evolutie v2 — extra film 11 'Van eerste cel tot nu' — film-eigen tekeningen (23 okt 2026). Voorvoegsel e11.
// Laad na micro_evo.js en pop_rept_chimp.js; e11_aarde.js levert e11Aarde().
const E11 = { leven: '#7FC48F', cel: '#5FA86E', cyano: '#4FA08A', roest: '#B5552E', zand: '#3B4436', zee: '#1C3A58', zeeL: '#22466A',
  bot: '#B9A98C', fossiel: '#8C7A62' };
const e11U = (u) => -Math.PI / 2 + u / 24 * 2 * Math.PI; // uur → hoek (middernacht boven)
function e11Tijd(mj) { return (4540 - mj) / 4540 * 24; } // miljoen jaar geleden → uur op de klok (aarde 4540 Mj)

// ---- 24-uursklok van de aardgeschiedenis ----
// o.uur = stand van de wijzer; o.leven = begin groene boog (uur, standaard 05:36); o.bogen = [{van, tot, kleur, a}];
// o.merk = [{u, kleur, tekst, meta, r: afstand factor, al: 'left'|'right'|'center'}]; o.cijfers = true; o.a
function e11Klok(ctx, x, y, r, o = {}) {
  const { uur = null, leven = e11Tijd(3480), bogen = [], merk = [], cijfers = true, a = 1, wijzer = C.goud, toonLeven = true, dikte = 26 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#22304C', C.line, 3);
  // tijdring: donker = aarde zonder bekend leven, groen = leven
  ctx.lineCap = 'butt'; ctx.lineWidth = dikte;
  ctx.strokeStyle = '#33415E'; ctx.beginPath(); ctx.arc(x, y, r - dikte / 2 - 8, 0, 6.283); ctx.stroke();
  if (toonLeven) { ctx.strokeStyle = rgba(E11.leven, 0.75); ctx.beginPath(); ctx.arc(x, y, r - dikte / 2 - 8, e11U(leven), e11U(uur == null ? 24 : Math.max(leven, uur))); ctx.stroke(); }
  for (const b of bogen) { ctx.strokeStyle = rgba(b.kleur, b.a == null ? 0.95 : b.a); ctx.lineWidth = b.dikte || dikte; ctx.beginPath(); ctx.arc(x, y, r - dikte / 2 - 8, e11U(b.van), e11U(b.tot)); ctx.stroke(); }
  // uurstreepjes
  for (let h = 0; h < 24; h++) { const an = e11U(h), l = h % 6 === 0 ? 22 : 12; ctx.strokeStyle = h % 6 === 0 ? C.text : C.line; ctx.lineWidth = h % 6 === 0 ? 3 : 2;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - dikte - 18), y + Math.sin(an) * (r - dikte - 18)); ctx.lineTo(x + Math.cos(an) * (r - dikte - 18 - l), y + Math.sin(an) * (r - dikte - 18 - l)); ctx.stroke(); }
  if (cijfers && r >= 150) for (const [h, t] of [[0, '0:00'], [6, '6:00'], [12, '12:00'], [18, '18:00']]) { const an = e11U(h), rr = r * 0.48;
    metaText(ctx, t, x + Math.cos(an) * rr, y + Math.sin(an) * rr + 10, C.text2, 'center', 28); }
  for (const m of merk) { const an = e11U(m.u), rr = r + 14; ctx.strokeStyle = m.kleur || C.goud; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - dikte - 10), y + Math.sin(an) * (r - dikte - 10)); ctx.lineTo(x + Math.cos(an) * (r + 6), y + Math.sin(an) * (r + 6)); ctx.stroke();
    if (m.tekst) { const f = m.r || 1.12, tx = x + Math.cos(an) * r * f, ty = y + Math.sin(an) * r * f; const al = m.al || (Math.cos(an) > 0.2 ? 'left' : Math.cos(an) < -0.2 ? 'right' : 'center');
      naamBij(ctx, m.tekst, m.meta || null, tx, ty + 12, 1, al, m.kleur || C.text); } }
  if (uur != null) { const an = e11U(uur); ctx.strokeStyle = wijzer; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * 20, y - Math.sin(an) * 20); ctx.lineTo(x + Math.cos(an) * (r - dikte - 30), y + Math.sin(an) * (r - dikte - 30)); ctx.stroke(); }
  circ(ctx, x, y, 12, C.goud, _lt(C.goud, 0.3), 2);
  ctx.restore();
}

// ---- Cellen (Micro) ----
// prokaryote cel als bolletje/staafje met nucleoïde (geen kern). kleur: bacterie teal, archaeon oker-grijs
function e11Prok(ctx, x, y, len, rot = 0, o = {}) { const { kleur = C.teal, a = 1, bol = false, dood = false } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a * (dood ? 0.45 : 1); ctx.translate(x, y); ctx.rotate(rot);
  const r = bol ? len / 2 : len * 0.2, L = bol ? 0 : len / 2 - r; const k = dood ? '#7A8290' : kleur;
  ctx.beginPath(); ctx.moveTo(-L, -r); ctx.lineTo(L, -r); ctx.arc(L, 0, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(-L, r); ctx.arc(-L, 0, r, Math.PI / 2, 1.5 * Math.PI); ctx.closePath();
  shape(ctx, rgba(k, 0.32), _lt(k, 0.35), 2);
  ctx.strokeStyle = rgba(C.kernR, 0.75); ctx.lineWidth = Math.max(1.2, r * 0.07); ctx.lineJoin = 'round'; e11Kluwen(ctx, 0, 0, (L + r) * 0.55, r * 0.5, 7);
  ctx.restore(); }
// losse DNA-kluwen (nucleoïde): een paar zachte lussen
function e11Kluwen(ctx, x, y, rx, ry, seed) { const P = []; for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + hash(seed + i) * 0.6, rr = 0.35 + hash(seed * 3 + i) * 0.65; P.push([x + Math.cos(an * 2) * rx * rr, y + Math.sin(an * 3) * ry * rr]); } lijn(ctx, P, ctx.strokeStyle, ctx.lineWidth, true); }
// cyanobacterie: draadje van cellen (Oscillatoria/Nostoc-achtig)
function e11Cyano(ctx, x, y, n = 8, o = {}) { const { r = 9, rot = 0, a = 1, golf = 0.25 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  for (let i = 0; i < n; i++) { const px = i * r * 1.9, py = Math.sin(i * golf * 2) * r * 1.2; ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.9, 0, 0, 6.283); shape(ctx, rgba(E11.cyano, 0.85), _lt(E11.cyano, 0.35), 1.5); circ(ctx, px, py, r * 0.3, rgba('#C8E8B0', 0.5)); }
  ctx.restore(); }
// stromatoliet: bolle kussens opgebouwd uit dunne laagjes, bovenop een groen matje cyanobacteriën
function e11Stromatoliet(ctx, x, y, s = 1, o = {}) { const { a = 1, seed = 1, laag = 9 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 110 + hash(seed) * 40, h = 90 + hash(seed + 2) * 40;
  for (let i = laag; i >= 0; i--) { const f = i / laag, ww = w * (0.55 + 0.45 * (1 - f * 0.3)), hh = h * (1 - f * 0.92) + 6;
    ctx.beginPath(); ctx.moveTo(-ww * 0.62, 0); ctx.bezierCurveTo(-ww * 0.62, -hh * 0.4, -ww * 0.48, -hh, 0, -hh); ctx.bezierCurveTo(ww * 0.48, -hh, ww * 0.62, -hh * 0.4, ww * 0.62, 0); ctx.closePath();
    ctx.fillStyle = i % 2 ? '#6E6450' : '#7E735C'; ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(-w * 0.62, -h * 0.05); ctx.bezierCurveTo(-w * 0.62, -h * 0.45, -w * 0.48, -h - 4, 0, -h - 4); ctx.bezierCurveTo(w * 0.48, -h - 4, w * 0.62, -h * 0.45, w * 0.62, -h * 0.05);
  ctx.strokeStyle = E11.cyano; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }

// mitochondrium met eigen DNA-ring (paars) en dubbele wand
function e11Mito(ctx, x, y, len, rot = 0, o = {}) { const { a = 1, ring = true, deling = 0 } = o; if (a <= 0.01) return;
  if (deling > 0) { const d = len * 0.28 * deling; e11Mito(ctx, x - Math.cos(rot) * d, y - Math.sin(rot) * d, len * (1 - 0.35 * deling), rot, { a, ring }); e11Mito(ctx, x + Math.cos(rot) * d, y + Math.sin(rot) * d, len * (1 - 0.35 * deling), rot, { a, ring }); return; }
  mitochondrion(ctx, x, y, len, rot, a, Math.max(3, Math.round(len / 40)));
  if (ring) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(2, len / 60);
    ctx.beginPath(); ctx.ellipse(len * 0.12, 0, len * 0.09, len * 0.07, 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } }

// eukaryote cel (rond, kern niet in het midden, mitochondriën, ER, textuur) — r = straal
function e11Euk(ctx, x, y, r, o = {}) { const { a = 1, focus = null, chloro = false, seed = 3 } = o; if (a <= 0.01) return;
  const A = (n) => focus === null || focus === n || (Array.isArray(focus) && focus.includes(n)) ? 1 : 0.35;
  ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.93, 0.03, seed); ctx.fillStyle = '#18233A'; ctx.fill();
  ctx.save(); blob(ctx, x, y, r - 6, r * 0.93 - 6, 0.03, seed); ctx.clip();
  for (let i = 0; i < r * 1.3; i++) { const an = hash(i * 7 + seed) * 6.283, d = Math.sqrt(hash(i * 13 + seed)) * r * 0.92; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 1.6, rgba('#C9B896', 0.13)); }
  ctx.globalAlpha *= A('er'); roughER(ctx, x + r * 0.15, y - r * 0.42, r * 0.7, 2, 1); ctx.globalAlpha /= A('er');
  ctx.restore();
  nucleus(ctx, x - r * 0.28, y - r * 0.05, r * 0.33, A('kern'));
  const M = [[0.42, 0.25, 0.4], [0.05, 0.55, -0.3], [0.55, -0.1, 1.2], [-0.5, 0.48, 0.6], [-0.62, -0.38, -0.9]];
  M.forEach(([dx, dy, rt]) => e11Mito(ctx, x + dx * r, y + dy * r, r * 0.27, rt, { a: A('mito') }));
  if (chloro) [[0.3, -0.62, 0.2], [0.62, 0.42, -0.5], [-0.15, 0.7, 0.4]].forEach(([dx, dy, rt]) => chloroplast(ctx, x + dx * r, y + dy * r, r * 0.3, A('chloro'), rt));
  membrane(ctx, x, y, r, r * 0.93, C.er, 0.03, seed);
  ctx.restore(); }

// endosymbiose: grote cel (archaeon, oker-grijs) omsluit een bacterie. fase 0 = bacterie buiten, 0.5 = membraan stulpt eromheen, 1 = binnen (met blaasje)
function e11Endo(ctx, x, y, r, fase, o = {}) { const { a = 1, gast = 'bacterie' } = o; ctx.save(); ctx.globalAlpha *= a;
  const k = '#A89878', bx = x + r * (1.25 - 0.8 * Math.min(1, fase)), by = y - r * 0.1;
  // grote cel: rond, met een uitstulping (armpjes) richting de gast
  const Q = []; const N = 48; for (let i = 0; i < N; i++) { const an = i / N * 6.283; let rr = r * (1 + 0.03 * Math.sin(an * 3 + 1));
    const d = Math.atan2(Math.sin(an + 0.1), Math.cos(an + 0.1)); const arm = fase > 0 && fase < 1 ? Math.exp(-Math.pow((Math.abs(d) - 0.42) / 0.22, 2)) * 0.5 * Math.sin(fase * Math.PI) : 0;
    rr *= 1 + arm; Q.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.92]); }
  zacht(ctx, Q); ctx.fillStyle = rgba(k, 0.22); ctx.fill(); ctx.strokeStyle = _lt(k, 0.3); ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.clip(); for (let i = 0; i < 70; i++) { const an = hash(i * 3.3) * 6.283, d = Math.sqrt(hash(i * 5.1)) * r * 0.9; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 1.6, rgba('#C9B896', 0.13)); }
  ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 2.5; e11Kluwen(ctx, x - r * 0.3, y + r * 0.1, r * 0.3, r * 0.22, 11); ctx.restore();
  if (fase >= 1) { ctx.strokeStyle = rgba(_lt(k, 0.3), 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(bx, by, r * 0.24, r * 0.13, 0.2, 0, 6.283); ctx.stroke(); }
  if (gast === 'bacterie') e11Prok(ctx, bx, by, r * 0.38, 0.2, { kleur: C.teal });
  else e11Cyano(ctx, bx - r * 0.18, by, 4, { r: r * 0.06, rot: 0.2 });
  ctx.restore(); }

// ---- Levensboom (Schema) ----
// o.stap: 1 = bacteriën / archaea, 2 = + eukaryoten als zijtak van archaea, 3 = eukaryoten splitsen in planten | (schimmels + dieren)
// o.markeer: 'schimmeldier'; o.ster: ['dieren','schimmels','planten','algen'] voor 'meercellig'
function e11Levensboom(ctx, x, y, w, h, o = {}) { const { stap = 3, markeer = null, ster = [], kenmerken = false, a = 1, iconen = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = (x1, y1, x2, y2, k = C.line, lw = 6) => { ctx.strokeStyle = k; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
  const wortel = [x + w * 0.3, y], top = y - h;
  const knA = [x + w * 0.52, y - h * 0.38], knE = [x + w * 0.66, y - h * 0.6], knO = [x + w * 0.8, y - h * 0.8];
  const blad = { bact: [x, top], arch: [x + w * 0.38, top], plant: [x + w * 0.6, top], schim: [x + w * 0.8, top], dier: [x + w, top] };
  L(wortel[0], wortel[1] + 40, wortel[0], wortel[1]); L(wortel[0], wortel[1], blad.bact[0], blad.bact[1]); L(wortel[0], wortel[1], knA[0], knA[1]); L(knA[0], knA[1], blad.arch[0], blad.arch[1]);
  if (stap >= 2) { const kE = stap >= 3 ? C.line : C.paars; L(knA[0], knA[1], knE[0], knE[1], kE); if (stap === 2) L(knE[0], knE[1], x + w * 0.8, top, C.paars); }
  if (stap >= 3) { L(knE[0], knE[1], blad.plant[0], blad.plant[1]); const km = markeer === 'schimmeldier' ? C.goud : C.line; L(knE[0], knE[1], knO[0], knO[1], km); L(knO[0], knO[1], blad.schim[0], blad.schim[1], km); L(knO[0], knO[1], blad.dier[0], blad.dier[1], km); }
  for (const k of [wortel, knA].concat(stap >= 2 ? [knE] : []).concat(stap >= 3 ? [knO] : [])) circ(ctx, k[0], k[1], 9, C.bgSchema, C.line, 3.5);
  naamBij(ctx, 'LUCA', null, wortel[0], wortel[1] + 84, 1, 'center', C.goud);
  const nm = (t, p, kl = C.text, meta = null) => naamBij(ctx, t, meta, p[0], p[1] - 22, 1, 'center', kl);
  nm('bacteriën', blad.bact); nm('archaea', blad.arch);
  if (stap === 2) nm('eukaryoten', [x + w * 0.8, top], C.paars, 'cellen met een kern');
  if (stap >= 3) { nm('planten', blad.plant); nm('schimmels', blad.schim, markeer ? C.goud : C.text); nm('dieren', blad.dier, markeer ? C.goud : C.text);
    naamBij(ctx, 'eukaryoten', null, knE[0] + 24, knE[1] + 34, 1, 'left', C.paars); }
  if (iconen) { const iy = top - 100;
    e11Prok(ctx, blad.bact[0], iy, 64, 0.2, { kleur: C.teal }); e11Prok(ctx, blad.arch[0], iy, 50, 0, { kleur: '#A89878', bol: true });
    if (stap >= 3) { e11Plantje(ctx, blad.plant[0], iy + 40, 0.45); e11Paddenstoel(ctx, blad.schim[0], iy + 36, 0.45, { draden: false }); if (o.dier) o.dier(ctx, blad.dier[0], iy + 36); } }
  for (const s of ster) { const p = { dieren: blad.dier, schimmels: blad.schim, planten: blad.plant, algen: [ (knE[0] + blad.plant[0]) / 2, (knE[1] + blad.plant[1]) / 2 ] }[s]; if (!p) continue;
    const q = s === 'algen' ? p : [(p[0] * 2 + knO[0]) / 3, (p[1] * 2 + knO[1]) / 3]; e11Ster(ctx, s === 'planten' ? (p[0] * 2 + knE[0]) / 3 : q[0], s === 'planten' ? (p[1] * 2 + knE[1]) / 3 : q[1], 16); }
  ctx.restore(); return { wortel, knA, knE, knO, blad }; }
function e11Ster(ctx, x, y, r, kleur = C.goud) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, kleur, _lt(kleur, 0.3), 1.5); }

// ---- Ediacara ----
// frond (Charnia/Charniodiscus-achtig): hechtschijf, steel, blad met zijtakjes; h = hoogte in px
function e11Frond(ctx, x, y, h, o = {}) { const { a = 1, buig = 0.06, kleur = '#B8A27A' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.beginPath(); ctx.ellipse(0, 0, h * 0.11, h * 0.035, 0, 0, 6.283); shape(ctx, _dk(kleur, 0.2), _lt(kleur, 0.2), 1.5);
  const top = (u) => [Math.sin(u * 1.4) * h * buig * u * 2, -h * u];
  ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = Math.max(2, h * 0.02); ctx.beginPath(); for (let i = 0; i <= 20; i++) { const p = top(i / 20 * 0.35); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  const P = []; for (let i = 0; i <= 24; i++) { const u = 0.33 + i / 24 * 0.67, p = top(u), br = h * 0.13 * Math.sin((u - 0.33) / 0.67 * Math.PI) ** 0.7; P.push([p[0] - br, p[1]]); }
  for (let i = 24; i >= 0; i--) { const u = 0.33 + i / 24 * 0.67, p = top(u), br = h * 0.13 * Math.sin((u - 0.33) / 0.67 * Math.PI) ** 0.7; P.push([p[0] + br, p[1]]); }
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.5);
  ctx.strokeStyle = _dk(kleur, 0.25); ctx.lineWidth = 1.5; for (let i = 1; i < 14; i++) { const u = 0.35 + i / 14 * 0.63, p = top(u), br = h * 0.12 * Math.sin((u - 0.33) / 0.67 * Math.PI) ** 0.7;
    ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - br, p[1] - h * 0.025); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + br, p[1] - h * 0.025); ctx.stroke(); }
  lijn(ctx, [top(0.33), top(0.66), top(1)], _dk(kleur, 0.3), 2); ctx.restore(); }
// Dickinsonia: ovaal, middennaad, ribbels die afwisselen (glide-symmetrie), schuin bovenaanzicht; l = lengte px
function e11Dickinsonia(ctx, x, y, l, o = {}) { const { a = 1, rot = 0, plat = 0.45, kleur = '#C2A878' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, plat);
  const rx = l / 2, ry = l * 0.36; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); shape(ctx, kleur, _lt(kleur, 0.25), 2);
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.clip(); ctx.strokeStyle = _dk(kleur, 0.28); ctx.lineWidth = Math.max(1.5, l / 120);
  const n = 22; for (let i = 0; i < n; i++) { const px = -rx + (i + 0.5) / n * 2 * rx; ctx.beginPath(); ctx.moveTo(px + 2, 0); ctx.quadraticCurveTo(px - l * 0.02, -ry * 0.6, px - l * 0.05, -ry); ctx.stroke();
    const qx = px + rx / n; ctx.beginPath(); ctx.moveTo(qx + 2, 0); ctx.quadraticCurveTo(qx - l * 0.02, ry * 0.6, qx - l * 0.05, ry); ctx.stroke(); }
  ctx.restore(); lijn(ctx, [[-rx * 0.95, 0], [rx * 0.98, 0]], _dk(kleur, 0.35), 2); ctx.restore(); }

// ---- Cambrium (bovenaanzicht) ----
// trilobiet: kop (cephalon) halve maan met wangen en ogen, borststuk met segmenten, staartschild; drie lobben in de lengte. l = lengte px; rot in radialen (0 = kop naar rechts)
function e11Trilobiet(ctx, x, y, l, o = {}) { const { a = 1, rot = 0, kleur = '#8C7258' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const b = l * 0.62, kL = l * 0.3, tL = l * 0.18; const romp = l - kL - tL;
  // borststuk: segmenten met pleurale punten
  const n = 10; for (let i = 0; i < n; i++) { const x0 = l / 2 - kL - i * romp / n, ww = b * (1 - i * 0.035);
    ctx.beginPath(); ctx.moveTo(x0, -ww / 2); ctx.lineTo(x0 - romp / n - 3, -ww / 2 - 4); ctx.lineTo(x0 - romp / n, ww / 2 + 4); ctx.lineTo(x0, ww / 2); ctx.closePath(); shape(ctx, i % 2 ? kleur : _lt(kleur, 0.06), _lt(kleur, 0.3), 1.2); }
  // staartschild
  const xs = l / 2 - kL - romp; ctx.beginPath(); ctx.moveTo(xs, -b * 0.33); ctx.quadraticCurveTo(xs - tL * 1.3, 0, xs, b * 0.33); ctx.closePath(); shape(ctx, kleur, _lt(kleur, 0.3), 1.2);
  // kop
  ctx.beginPath(); ctx.moveTo(l / 2 - kL, -b * 0.62); ctx.quadraticCurveTo(l / 2 + kL * 0.15, -b * 0.55, l / 2, 0); ctx.quadraticCurveTo(l / 2 + kL * 0.15, b * 0.55, l / 2 - kL, b * 0.62); ctx.quadraticCurveTo(l / 2 - kL * 0.95, b * 0.66, l / 2 - kL - 4, b * 0.66);
  ctx.lineTo(l / 2 - kL - 4, -b * 0.66); ctx.closePath(); shape(ctx, _lt(kleur, 0.05), _lt(kleur, 0.3), 1.5);
  // axiale lob
  ctx.beginPath(); ctx.moveTo(l / 2 - kL * 0.05, 0); ctx.quadraticCurveTo(l / 2 - kL * 0.2, -b * 0.17, l / 2 - kL, -b * 0.13); ctx.lineTo(xs, -b * 0.09); ctx.quadraticCurveTo(xs - tL * 0.8, 0, xs, b * 0.09); ctx.lineTo(l / 2 - kL, b * 0.13); ctx.quadraticCurveTo(l / 2 - kL * 0.2, b * 0.17, l / 2 - kL * 0.05, 0);
  shape(ctx, _dk(kleur, 0.15), _lt(kleur, 0.2), 1.2);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(l / 2 - kL * 0.55, k * b * 0.28, kL * 0.16, b * 0.06, 0.4 * k, 0, 6.283); shape(ctx, '#3A3028', _lt(kleur, 0.35), 1.2); }
  ctx.restore(); }
// Anomalocaris: bovenaanzicht; kop met twee grijparmen (14 segmenten, stekels naar binnen), ogen op korte steeltjes, 13 paar overlappende flappen, staartwaaier van 3 paar bladen. l = lengte zonder grijparmen
function e11Anomalocaris(ctx, x, y, l, o = {}) { const { a = 1, rot = 0, t = 0, kleur = '#B06A4C' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const B = (u) => l * 0.15 * Math.sin(Math.min(1, (u + 0.08) / 0.35) * Math.PI / 2) * (1 - 0.75 * Math.max(0, (u - 0.25) / 0.75)); // halve breedte langs u (0 kop … 1 staart)
  const X = (u) => l / 2 - u * l;
  // staartwaaier
  for (const k of [-1, 1]) for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.ellipse(X(1.0) - j * l * 0.03, k * (l * 0.03 + j * l * 0.02), l * 0.1, l * 0.022, k * (0.5 + j * 0.25), 0, 6.283); shape(ctx, _dk(kleur, 0.1), _lt(kleur, 0.25), 1.2); }
  // flappen
  for (let i = 12; i >= 0; i--) { const u = 0.22 + i * 0.058, bw = B(u), golf = Math.sin(t * 6 - i * 0.7) * 0.18;
    for (const k of [-1, 1]) { ctx.save(); ctx.translate(X(u), k * bw * 0.7); ctx.rotate(k * (0.35 + golf)); ctx.beginPath(); ctx.ellipse(-l * 0.02, k * bw * 0.55, l * 0.05, bw * 0.75, 0, 0, 6.283); shape(ctx, _lt(kleur, 0.08), _lt(kleur, 0.3), 1.2); ctx.restore(); } }
  // romp
  const P = []; for (let i = 0; i <= 20; i++) { const u = i / 20 * 0.98; P.push([X(u), -B(u) * 0.75]); } for (let i = 20; i >= 0; i--) { const u = i / 20 * 0.98; P.push([X(u), B(u) * 0.75]); }
  vul(ctx, P, kleur, _lt(kleur, 0.3), 1.5); for (let i = 1; i < 13; i++) { const u = 0.22 + i * 0.058; lijn(ctx, [[X(u), -B(u) * 0.6], [X(u), B(u) * 0.6]], _dk(kleur, 0.2), 1.2); }
  // kopschild
  ctx.beginPath(); ctx.ellipse(X(0.08), 0, l * 0.07, l * 0.06, 0, 0, 6.283); shape(ctx, _dk(kleur, 0.1), _lt(kleur, 0.3), 1.5);
  // ogen op steeltjes
  for (const k of [-1, 1]) { lijn(ctx, [[X(0.1), k * l * 0.05], [X(0.13), k * l * 0.12]], _dk(kleur, 0.2), l * 0.012); ctx.beginPath(); ctx.ellipse(X(0.13), k * l * 0.13, l * 0.028, l * 0.022, 0, 0, 6.283); shape(ctx, '#2A2622', '#6A5A50', 1.2); }
  // grijparmen: 14 segmenten die naar binnen krullen, stekels naar binnen
  for (const k of [-1, 1]) { let px = X(0) + l * 0.01, py = k * l * 0.035, an = 0.35 * k; const seg = l * 0.032;
    for (let i = 0; i < 14; i++) { const nx = px + Math.cos(an) * seg, ny = py + Math.sin(an) * seg; const d = l * 0.02 * (1 - i / 18);
      lijn(ctx, [[px, py], [nx, ny]], _lt(kleur, 0.05), d * 1.6); const sx = (px + nx) / 2, sy = (py + ny) / 2, sn = an + Math.PI / 2 * -k;
      lijn(ctx, [[sx, sy], [sx + Math.cos(sn) * d * 1.3, sy + Math.sin(sn) * d * 1.3]], _lt(kleur, 0.35), 1.5); px = nx; py = ny; an -= k * 0.13; } }
  ctx.restore(); }

// ---- Land ----
// Cooksonia: gaffelvertakte stengeltjes (enkele cm), op elk eind een sporendoosje; h = hoogte px
function e11Cooksonia(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, kleur = '#7FB06A' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineCap = 'round';
  const tak = (px, py, an, len, d) => { const nx = px + Math.cos(an) * len, ny = py + Math.sin(an) * len; ctx.lineWidth = Math.max(1.5, h * 0.025 * (1 - d * 0.2)); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx, ny); ctx.stroke();
    if (d < 3) { const sp = 0.32 + hash(seed + d + px) * 0.15; tak(nx, ny, an - sp, len * 0.8, d + 1); tak(nx, ny, an + sp, len * 0.8, d + 1); }
    else { ctx.save(); ctx.translate(nx, ny); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -h * 0.03, h * 0.045, h * 0.032, 0, 0, 6.283); shape(ctx, '#C9A35C', _lt('#C9A35C', 0.3), 1.2); ctx.restore(); } };
  tak(x, y, -Math.PI / 2, h * 0.36, 0); ctx.restore(); }
// eenvoudig plantje (zaadplant, voor de vraagkaart en de boom)
function e11Plantje(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  lijn(ctx, [[0, 0], [2, -60], [0, -130]], '#5FA86E', 6); for (const [yy, k] of [[-40, -1], [-70, 1], [-100, -1]]) { ctx.save(); ctx.translate(1, yy); ctx.rotate(k * 0.9); ctx.beginPath(); ctx.ellipse(k * 0, -22, 11, 26, 0, 0, 6.283); shape(ctx, '#7FC48F', _lt('#7FC48F', 0.3), 1.5); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, -140, 12, 14, 0, 0, 6.283); shape(ctx, '#7FC48F', _lt('#7FC48F', 0.3), 1.5); ctx.restore(); }
// paddenstoel (vruchtlichaam) met zwamvlok (schimmeldraden) in de grond
function e11Paddenstoel(ctx, x, y, s = 1, o = {}) { const { a = 1, draden = true } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (draden) { ctx.strokeStyle = rgba('#E6E1D3', 0.55); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, 4); let px = 0, py = 4; for (let k = 0; k < 6; k++) { px += (hash(i * 9 + k) - 0.5) * 40 + (i - 4) * 4; py += 6 + hash(i + k * 3) * 8; ctx.lineTo(px, py); } ctx.stroke(); } }
  ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-10, -50, -9, -86); ctx.lineTo(9, -86); ctx.quadraticCurveTo(10, -50, 12, 0); ctx.closePath(); shape(ctx, '#E6E1D3', '#F5F2EA', 1.5);
  ctx.beginPath(); ctx.moveTo(-58, -78); ctx.bezierCurveTo(-56, -140, 56, -140, 58, -78); ctx.quadraticCurveTo(0, -88, -58, -78); shape(ctx, '#A8664A', _lt('#A8664A', 0.25), 1.5);
  ctx.strokeStyle = rgba('#5A3A2A', 0.6); ctx.lineWidth = 1; for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 4, -86); ctx.lineTo(i * 8.5, -79); ctx.stroke(); }
  ctx.restore(); }

// Tiktaalik roseae (Daeschler e.a. 2006): ±2,7 m; platte brede kop (±1/5 van de lengte) met ogen bovenop, beweeglijke nek, schubben, borstvinnen met inwendige botten (pols), kleine buikvinnen, staart met vinzoom. Zijaanzicht; l = lengte px
function e11Tiktaalik(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, steun = 1, kleur = '#7A7A5A' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const u = l / 100; // 1 eenheid = 1 % lengte; anker = onderkant borst
  // verre borstvin
  vul(ctx, [[30 * u, -3 * u], [36 * u, 2 * u], [42 * u, 4 * u], [40 * u, -1 * u]], _dk(kleur, 0.3));
  // lijf: van snuit (rechts, x=50u) naar staart (x=-50u)
  const P = [[50 * u, -5 * u], [46 * u, -8.5 * u], [36 * u, -10 * u], [30 * u, -11 * u], [20 * u, -12.5 * u], [5 * u, -12 * u], [-12 * u, -10 * u], [-30 * u, -7 * u], [-44 * u, -4.5 * u], [-50 * u, -3 * u],
    [-44 * u, -1.5 * u], [-30 * u, -1 * u], [-12 * u, -0.5 * u], [5 * u, -0.3 * u], [20 * u, -0.8 * u], [32 * u, -1.5 * u], [44 * u, -2.5 * u], [50 * u, -4 * u]];
  // vinzoom staart
  vul(ctx, [[-28 * u, -7.4 * u], [-40 * u, -8.5 * u], [-50 * u, -6 * u], [-52 * u, -3 * u], [-50 * u, 0], [-40 * u, 1.8 * u], [-28 * u, -0.8 * u]], _dk(kleur, 0.15), _lt(kleur, 0.2), 1.2);
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.5);
  binnen(ctx, P, () => { vul(ctx, [[48 * u, -3 * u], [20 * u, -1 * u], [-30 * u, -1.2 * u], [-30 * u, 2 * u], [48 * u, 2 * u]], _lt(kleur, 0.25));
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 1; for (let i = 0; i < 22; i++) { const px = (40 - i * 3.8) * u; ctx.beginPath(); ctx.arc(px, -6 * u, 3.2 * u, -1.1, 1.1); ctx.stroke(); }
    vul(ctx, [[50 * u, -5.5 * u], [33 * u, -4.6 * u], [33 * u, -3.9 * u], [50 * u, -4.4 * u]], _dk(kleur, 0.45)); // bek
    lijn(ctx, [[30 * u, -11 * u], [28 * u, -6 * u], [30 * u, -1.5 * u]], _dk(kleur, 0.25), 1.5); }); // achterrand kop / nek
  dierOog(ctx, 40 * u, -9.6 * u, Math.max(2.5, 1.1 * u), '#2A2414'); // oog bovenop de platte kop
  // buikvin
  vul(ctx, [[-14 * u, -0.7 * u], [-19 * u, 3 * u], [-12 * u, 2.5 * u]], _dk(kleur, 0.1), _lt(kleur, 0.2), 1);
  // nabije borstvin: stevige steel (botten) en vinstralen, steunend op de bodem (steun 1) of gestrekt (0)
  ctx.save(); ctx.translate(26 * u, -2 * u); ctx.rotate(steun ? 0.95 : 0.4);
  vul(ctx, [[0, -1.6 * u], [7 * u, -1.3 * u], [12 * u, -0.4 * u], [16 * u, 0.4 * u], [12 * u, 2.4 * u], [6 * u, 1.8 * u], [0, 1.6 * u]], _lt(kleur, 0.1), _lt(kleur, 0.3), 1.2);
  ctx.strokeStyle = rgba(E11.bot, 0.7); ctx.lineWidth = 1.6; lijn(ctx, [[1 * u, 0], [6 * u, 0.1 * u]], E11.bot, 2); lijn(ctx, [[6 * u, 0.1 * u], [10 * u, 0.6 * u]], E11.bot, 1.6); ctx.restore();
  ctx.restore(); }

// Tyrannosaurus (SUE: 12,3 m lang, heup 4 m). Zijaanzicht, romp horizontaal, staart vrij van de grond, armpjes met twee vingers, teenganger. l = lengte px; silhouet = egaal donker (tegenlicht)
function e11TRex(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, silhouet = false, kleur = '#6E6A50', t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const u = l / 123; // 1 eenheid = 10 cm; anker = grond onder de heup
  const k = silhouet ? '#141C2A' : kleur, kd = silhouet ? '#10161F' : _dk(kleur, 0.3), rand = silhouet ? null : _lt(kleur, 0.2);
  const been = (dx, ver) => { const c = ver ? kd : k; const sw = Math.sin(t * 6.283 + (ver ? Math.PI : 0)) * 0.25;
    ctx.save(); ctx.translate(dx * u, -40 * u); ctx.rotate(0.15 + sw);
    vul(ctx, [[-9 * u, -6 * u], [8 * u, -7 * u], [6 * u, 12 * u], [1 * u, 18 * u], [-6 * u, 15 * u]], c, ver ? null : rand, 1.2); // dij
    ctx.translate(1 * u, 17 * u); ctx.rotate(-0.55 - sw * 0.5); vul(ctx, [[-3.6 * u, 0], [3.6 * u, -1 * u], [2.2 * u, 13 * u], [-1.6 * u, 13 * u]], c, ver ? null : rand, 1.2); // scheen
    ctx.translate(0.3 * u, 13 * u); ctx.rotate(0.55 + sw * 0.4); vul(ctx, [[-1.8 * u, 0], [1.8 * u, 0], [2.4 * u, 9 * u], [-1.4 * u, 9.6 * u]], c, ver ? null : rand, 1.2); // middenvoet
    ctx.translate(0, 9.5 * u); ctx.rotate(-0.15); vul(ctx, [[-2 * u, -0.6 * u], [6 * u, 0], [7 * u, 1 * u], [-2 * u, 1.2 * u]], c); ctx.restore(); };
  been(2, true);
  // staart + romp + nek + kop als één omtrek (heup op x=0, hoogte 40u)
  const P = [[-70 * u, -38 * u], [-50 * u, -43 * u], [-25 * u, -46 * u], [-5 * u, -47 * u], [10 * u, -46 * u], [22 * u, -44 * u], [30 * u, -46 * u], [36 * u, -54 * u], [41 * u, -58 * u], [48 * u, -58.5 * u],
    [54 * u, -56 * u], [56 * u, -50 * u], [54 * u, -43 * u], [45 * u, -41 * u], [38 * u, -40 * u], [33 * u, -35 * u], [26 * u, -26 * u], [14 * u, -21 * u], [2 * u, -23 * u], [-10 * u, -30 * u], [-30 * u, -36 * u], [-50 * u, -37.5 * u]];
  vul(ctx, P, k, rand, 1.5);
  if (!silhouet) { binnen(ctx, P, () => { vul(ctx, [[36 * u, -40 * u], [26 * u, -30 * u], [10 * u, -27 * u], [-10 * u, -33 * u], [-40 * u, -36 * u], [-40 * u, -30 * u], [40 * u, -30 * u]], _lt(kleur, 0.18));
    lijn(ctx, [[42 * u, -46.5 * u], [54 * u, -48 * u]], _dk(kleur, 0.45), 2); for (let i = 0; i < 5; i++) lijn(ctx, [[45 * u + i * 1.8 * u, -47 * u], [45.6 * u + i * 1.8 * u, -45.6 * u]], '#E6E1D3', 1.5); });
    dierOog(ctx, 44 * u, -51.5 * u, Math.max(2.2, 0.55 * u), '#C9A35C', { pupil: 'spleet' }); }
  // armpje met twee vingers
  ctx.save(); ctx.translate(28 * u, -36 * u); ctx.rotate(0.9); vul(ctx, [[-0.9 * u, 0], [0.9 * u, 0], [0.7 * u, 4 * u], [-0.7 * u, 4 * u]], silhouet ? k : _dk(kleur, 0.1)); ctx.translate(0, 4 * u); ctx.rotate(-0.8); vul(ctx, [[-0.7 * u, 0], [0.7 * u, 0], [0.5 * u, 3.2 * u], [-0.5 * u, 3.2 * u]], silhouet ? k : _dk(kleur, 0.1));
  lijn(ctx, [[0, 3 * u], [-0.5 * u, 4.6 * u]], silhouet ? k : _dk(kleur, 0.2), 2); lijn(ctx, [[0.3 * u, 3 * u], [0.6 * u, 4.4 * u]], silhouet ? k : _dk(kleur, 0.2), 2); ctx.restore();
  been(-2, false);
  ctx.restore(); }
// Morganucodon: spitsmuisachtig, romp ±10 cm, schedel 2–3 cm, staart matig lang, zoolganger, vacht. l = romplengte px (anker = grond onder het midden)
function e11Morganucodon(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, kleur = '#8C6A4A' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const u = l / 10; // 1 eenheid = 1 cm
  lijn(ctx, [[-5 * u, -1.6 * u], [-8 * u, -1.4 * u], [-11 * u, -0.6 * u]], _dk(kleur, 0.15), Math.max(2, 0.45 * u)); // staart
  for (const [dx, ver] of [[3, true], [-3, true]]) vul(ctx, [[dx * u - 0.5 * u, -1.5 * u], [dx * u + 0.5 * u, -1.5 * u], [dx * u + 0.6 * u, 0], [dx * u - 0.4 * u, 0]], _dk(kleur, 0.35));
  const P = [[-5.4 * u, -1.4 * u], [-5 * u, -3 * u], [-2 * u, -3.9 * u], [2 * u, -3.7 * u], [4.2 * u, -3.2 * u], [6 * u, -2.6 * u], [7.6 * u, -1.9 * u], [8.4 * u, -1.5 * u], [7.4 * u, -1.1 * u], [5 * u, -1 * u], [2 * u, -1.1 * u], [-3 * u, -1.1 * u]];
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.2); binnen(ctx, P, () => vul(ctx, [[-5 * u, -1.8 * u], [6 * u, -1.5 * u], [8 * u, -1 * u], [-5 * u, -0.5 * u]], _lt(kleur, 0.3)));
  vul(ctx, [[4.3 * u, -3.2 * u], [4.6 * u, -4.1 * u], [5.2 * u, -3.1 * u]], _dk(kleur, 0.1), _lt(kleur, 0.2), 1); // oortje
  dierOog(ctx, 6.1 * u, -2.6 * u, Math.max(1.6, 0.28 * u), '#140E0A');
  for (const [dx] of [[2.6], [-2.6]]) vul(ctx, [[dx * u - 0.6 * u, -1.5 * u], [dx * u + 0.6 * u, -1.5 * u], [dx * u + 0.9 * u, 0], [dx * u - 0.5 * u, 0]], _dk(kleur, 0.1));
  ctx.strokeStyle = rgba('#E6E1D3', 0.5); ctx.lineWidth = 1; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(8 * u, -1.6 * u); ctx.lineTo(9.6 * u, -1.6 * u + s * 0.5 * u); ctx.stroke(); }
  ctx.restore(); }

// gestileerde lijn 'aantal soorten' met vijf dalen (Big Five, posities op tijd); x0..x1 = 540 Mj .. nu
function e11Soortenlijn(ctx, x0, y0, w, h, o = {}) { const { a = 1, tot = 0, markeer = [] } = o; ctx.save(); ctx.globalAlpha *= a;
  const big = [[444, 0.55], [372, 0.5], [252, 0.85], [201, 0.6], [66, 0.62]]; const X = (mj) => x0 + (540 - mj) / 540 * w;
  const f = (mj) => { let v = 0.25 + 0.75 * Math.pow((540 - mj) / 540, 1.4); for (const [m, d] of big) { if (mj <= m) { const dt = m - mj; v *= 1 - d * Math.exp(-dt / 18) * (dt >= 0 ? 1 : 0); } } return v; };
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + w + 10, y0); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 - h - 20); ctx.stroke();
  ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let mj = 540; mj >= tot; mj -= 1) { const px = X(mj), py = y0 - f(mj) * h; mj === 540 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  for (const [m] of big) { if (m < tot) continue; const px = X(m), py = y0 - f(m - 2) * h; circ(ctx, px, py + 8, 10, markeer.includes(m) ? C.koraal : rgba(C.koraal, 0.7), _lt(C.koraal, 0.3), 2);
    metaText(ctx, String(m), px, y0 + 40, markeer.includes(m) ? C.koraal : C.text2, 'center', 28); }
  metaText(ctx, 'MILJOEN JAAR GELEDEN', x0 + w, y0 + 84, C.text2, 'right', 26); metaText(ctx, 'AANTAL SOORTEN · GESTILEERD', x0, y0 - h - 40, C.grain, 'left', 26);
  ctx.restore(); return X; }

// vroege duizendpootachtige (Kampecaris obanensis, ±425 Mj): langwerpig, segmenten als banden in één lijf, veel korte pootjes; zijaanzicht. l = lengte px
function e11Duizendpoot(ctx, x, y, l, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#8C6040' } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const h = l * 0.09, n = 14; ctx.strokeStyle = _dk(kleur, 0.3); ctx.lineWidth = Math.max(1.5, l * 0.008); ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const px = -l / 2 + (i + 0.5) * l / n, f = Math.sin(t * 8 - i * 0.9) * l * 0.012; ctx.beginPath(); ctx.moveTo(px, -h * 0.3); ctx.lineTo(px + f + l * 0.01, h * 0.9); ctx.stroke(); }
  const P = [[-l / 2, -h * 0.5], [-l * 0.3, -h * 1.05], [l * 0.3, -h * 1.1], [l * 0.47, -h * 0.9], [l / 2, -h * 0.4], [l * 0.46, 0], [-l / 2, 0]];
  vul(ctx, P, kleur, _lt(kleur, 0.25), 1.2); binnen(ctx, P, () => { for (let i = 1; i < n; i++) lijn(ctx, [[-l / 2 + i * l / n, -h * 1.2], [-l / 2 + i * l / n, 0]], _dk(kleur, 0.25), 1.2); });
  lijn(ctx, [[l * 0.48, -h * 0.8], [l * 0.58, -h * 1.6], [l * 0.64, -h * 1.5]], _dk(kleur, 0.2), Math.max(1.2, l * 0.006));
  ctx.restore(); }
