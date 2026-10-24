// Evolutie v2 · extra film 10 'Het ontstaan van het leven' (23 okt 2026) — film-eigen tekeningen, voorvoegsel 'ol' (oorsprong leven).
// Laden na lib.js, base.js, dier_basis.js, lib_cast.js, lib_bio.js, lib_evo.js en micro_evo.js (dnaDraad, nucleoide, _mvL/_mvD).
// Recepten (C9) staan boven elke functie; maten en feiten met bron, bekende fouten erbij.

// ---------- kleuren van deze film (Part C: alleen bestaande betekeniskleuren en hun tinten) ----------
// RNA = teal (zoals de DNA-reeks en Celorganellen al vastlegden: RC/RBB, mrnaStrand); DNA = paars; aminozuren = oker (Voeding: V.ew);
// vetzuurstaart = donkere oker (Voeding: V.vt), kop = lichtgrijsblauw (membraankop C.er); enzym/eiwit = grijsblauw C.enzym; water/zuurstof teal.
const OL = {
  rnaBB: '#24506A', rnaBBR: '#5BA4C9', basis: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, basisL: { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' },
  aa: '#C9A35C', aaR: '#E6CC94', vet: '#9C7A3C', vetR: '#C9A35C', kop: '#AFC0D0', kopR: '#DCE4EC',
  H: '#E6E1D3', Catoom: '#6F7886', N: '#8FA0B5', O: '#5BA4C9',
  zee: '#1A3A58', zeeL: '#22466A', rots: '#4E4A48', rotsL: '#6E6660', zand: '#8C7A5A'
};

// ---------- UI: tag linksboven, bewijsniveau rechtsboven (type H: elke bewering met haar bewijsniveau) ----------
function olTag(ctx, hfst) { metaText(ctx, `EVOLUTIE · EXTRA 2/4 · ${hfst}`, 80, 78, C.text2, 'left', 28); }
// soort: 'gemeten' (vastgesteld in experiment of gesteente), 'hypothese', 'onzeker'
function olBewijs(ctx, soort, x = W - 80, y = 62) {
  const T = { gemeten: ['VASTGESTELD', C.groen], hypothese: ['HYPOTHESE', C.text2], onzeker: ['NOG ONZEKER', C.text2], model: ['MODEL', C.text2] }[soort];
  ctx.save(); ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(T[0]).width + 56;
  roundRect(ctx, x - w, y - 22, w, 50, 25); shape(ctx, rgba(C.bgMicro, 0.85), T[1], 2);
  circ(ctx, x - w + 24, y + 3, 7, soort === 'gemeten' ? C.groen : null, T[1], 2);
  ctx.restore(); metaText(ctx, T[0], x - 22, y + 13, soort === 'gemeten' ? C.groen : C.text, 'right', 28);
}
function olTitelKaart(ctx, beeld) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'HAVO · VWO · EVOLUTIE · EXTRA 2/4', W - 80, 78, C.text2, 'right', 28);
  text(ctx, 'Het ontstaan', 120, 300, fTitel(92), C.text, 'left'); text(ctx, 'van het leven', 120, 400, fTitel(92), C.text, 'left');
  ['Hoe word je van losse moleculen', 'een cel die zichzelf kopieert?'].forEach((r, i) => text(ctx, r, 120, 500 + i * 60, fTekst(48, 500), C.text2, 'left')); if (beeld) beeld(ctx); }
function olVraag(ctx, vraag, opties) { vraagKaart(ctx, vraag, opties); olTag(ctx, 'VRAAG'); }
function olEindKaart(ctx, zinnen) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); olTag(ctx, 'SAMENVATTING');
  zinnen.forEach((z, i) => text(ctx, z, 170, 250 + i * 104, fTekst(46, 600), i === zinnen.length - 1 ? C.text2 : C.text, 'left'));
  const yb = 250 + (zinnen.length - 2) * 104 + 20; ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(140, 196); ctx.lineTo(124, 196); ctx.lineTo(124, yb); ctx.lineTo(140, yb); ctx.stroke(); }

// =====================================================================================
// KLEINE MOLECULEN als ruimtevullende bolletjes (BEELDAFSPRAKEN: herkenbare structuurvorm, geen stipjes). Geen letters op de atomen
// (Part C: atomen en bindingen alleen in vwo); de naam staat ernaast. Verhoudingen: H klein (r), C/N/O ± 1,45 r; hoeken uit de echte
// bouw, plat geprojecteerd: H₂O 104,5°, NH₃ piramide (drie H onder), CH₄ tetraëder (vier H, één achter), CO₂ en N₂ lineair.
// Kleuren: O teal (water, zuurstof), H licht neutraal, C donkergrijs, N grijsblauw. Bekende fout: alle moleculen als gelijke bolletjes.
// =====================================================================================
function olMolecuul(ctx, soort, x, y, s = 1, o = {}) {
  const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const r = 9, R = 13; const at = (px, py, rr, col) => circ(ctx, px, py, rr, col, _mvL(col, 0.35), 1.5);
  const H2 = (px, py) => at(px, py, r, OL.H);
  if (soort === 'h2o') { at(0, 0, R, OL.O); const d = R * 0.95; H2(-Math.sin(0.91) * d, Math.cos(0.91) * d); H2(Math.sin(0.91) * d, Math.cos(0.91) * d); }
  else if (soort === 'ch4') { H2(4, -16); at(0, 0, R, OL.Catoom); H2(-15, 9); H2(15, 9); H2(-3, 15); }
  else if (soort === 'nh3') { at(0, -2, R, OL.N); H2(-14, 10); H2(14, 10); H2(0, 15); }
  else if (soort === 'h2') { H2(-6, 0); H2(6, 0); }
  else if (soort === 'n2') { at(-9, 0, R * 0.95, OL.N); at(9, 0, R * 0.95, OL.N); }
  else if (soort === 'co2') { at(-19, 0, R * 0.95, OL.O); at(19, 0, R * 0.95, OL.O); at(0, 0, R, OL.Catoom); }
  ctx.restore();
}

// =====================================================================================
// AMINOZUUR in structuurvorm (vlak geprojecteerd, ruimtevullend, in oker = voedsel/eiwitbouwsteen zoals in Voeding).
// Recept: centrale C (α-koolstof) met vier groepen: aminogroep (N + 2 H) links, zuurgroep (C met twee O) rechts, één H omhoog,
// zijketen omlaag. Glycine: zijketen = H. Alanine: zijketen = CH₃ (een C met drie H). Zo zie je het verschil tussen soorten
// alleen aan de zijketen, en een eiwit is een keten van deze stukjes. Bron: elk biochemieboek (Berg, Biochemistry, H2).
// Bekende fout: een aminozuur als egaal bolletje; zijketen op de verkeerde plek (niet aan de α-C).
// =====================================================================================
function olAminozuur(ctx, x, y, s = 1, o = {}) {
  const { soort = 'glycine', a = 1, rot = 0, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const aa = OL.aa, aaD = _mvD(OL.aa, 0.25), aaL = _mvL(OL.aa, 0.35), lo = (col) => _mvL(col, 0.35);
  const at = (px, py, rr, col) => circ(ctx, px, py, rr, col, rand || lo(col), rand ? 3 : 1.5);
  // bindingen als korte dikke stukken (achter de bollen)
  ctx.strokeStyle = aaL; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(34, 0); ctx.moveTo(0, 0); ctx.lineTo(0, -26); ctx.moveTo(0, 0); ctx.lineTo(0, 30); ctx.stroke();
  // aminogroep
  at(-50, -12, 8, OL.H); at(-50, 12, 8, OL.H); at(-36, 0, 13, aaD);
  // zuurgroep: C met twee O
  at(50, -14, 12, aaL); at(52, 14, 12, aaL); at(36, 0, 12, aa);
  // H omhoog
  at(0, -27, 8, OL.H);
  // zijketen
  if (soort === 'alanine') { at(-12, 46, 8, OL.H); at(12, 46, 8, OL.H); at(0, 56, 8, OL.H); at(0, 33, 12, aa); }
  else at(0, 29, 8, OL.H);
  // α-C
  at(0, 0, 13, aa);
  ctx.restore();
}

// =====================================================================================
// RNA-BASEN en NUCLEOTIDE. Vormen overgenomen uit de DNA-reeks (dnalib.js basePath: A punt, U inkeping, C smalle nek, G brede nek),
// tinten uit de DNA-reeks (RC, teal); suiker = vijfhoek (ribose), fosfaat = rondje. Zo ziet een RNA-letter er in elke film hetzelfde uit.
// =====================================================================================
function _olBasisPad(ctx, x, y, b, dir, s) { const L = 130 * s, hw = 26 * s, d = 16 * s, tw = hw * 0.48; const yb = y + dir * (L - d), yo = y + dir * L;
  ctx.beginPath(); ctx.moveTo(x - hw, y); ctx.lineTo(x + hw, y);
  if (b === 'A') { ctx.lineTo(x + hw, yb); ctx.lineTo(x, yo); ctx.lineTo(x - hw, yb); }
  else if (b === 'U' || b === 'T') { ctx.lineTo(x + hw, yo); ctx.lineTo(x, yb); ctx.lineTo(x - hw, yo); }
  else if (b === 'C') { ctx.lineTo(x + hw, yb); ctx.lineTo(x + tw, yb); ctx.lineTo(x + tw, yo); ctx.lineTo(x - tw, yo); ctx.lineTo(x - tw, yb); ctx.lineTo(x - hw, yb); }
  else { ctx.lineTo(x + hw, yo); ctx.lineTo(x + tw, yo); ctx.lineTo(x + tw, yb); ctx.lineTo(x - tw, yb); ctx.lineTo(x - tw, yo); ctx.lineTo(x - hw, yo); }
  ctx.closePath(); }
function olBase(ctx, x, y, b, s = 1, o = {}) { const { dir = 1, letter = true, a = 1, rand = null } = o; if (a <= 0.01) return; const f = OL.basis[b] || OL.basis.A;
  ctx.save(); ctx.globalAlpha *= a; _olBasisPad(ctx, x, y, b, dir, s); shape(ctx, f, rand || _mvL(f, 0.35), rand ? 3 : 1.5);
  if (letter && s >= 0.35) text(ctx, b, x, y + dir * 62 * s + 14 * s, fTekst(Math.round(40 * s), 700), OL.basisL[b], 'center'); ctx.restore(); }
function olNucleotide(ctx, x, y, b, s = 1, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = OL.rnaBBR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-60 * s, 0); ctx.lineTo(0, 0); ctx.stroke();
  circ(ctx, -62 * s, 0, 18 * s, OL.rnaBBR, _mvL(OL.rnaBBR, 0.35), 1.5);
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = (-90 + k * 72) * Math.PI / 180; const X = 26 * s * Math.cos(an), Y = 26 * s * Math.sin(an); k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); shape(ctx, '#2F6E8E', _mvL('#2F6E8E', 0.35), 1.5);
  ctx.save(); ctx.translate(18 * s, 0); ctx.rotate(-Math.PI / 2); olBase(ctx, 0, 0, b, s * 0.8, { letter: false }); ctx.restore();
  if (s >= 0.5) text(ctx, b, 18 * s + 58 * s * 0.8, 13 * s, fTekst(Math.round(36 * s), 700), OL.basisL[b], 'center');
  ctx.restore(); }

// =====================================================================================
// RNA-STRENG (C9 mRNA): dunne, slappe enkele streng (± half zo dik als DNA), zacht gebogen, nooit een rechte staaf; basen als korte
// pootjes aan één kant. P = punten van het pad; seq = letters (één per pootje). o.groot: basen als echte vormen met letters.
// =====================================================================================
function olRnaStreng(ctx, P, seq, o = {}) {
  const { a = 1, w = 5, groot = 0, stap = null, kant = 1, rand = null, letters = false } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = _mvCR(P, false, 10); const L = []; let acc = 0; L.push(0); for (let i = 1; i < pts.length; i++) { acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(acc); }
  const n = seq.length, dst = stap || acc / n; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // basen
  let j = 0; for (let k = 0; k < n; k++) { const target = (k + 0.5) * dst; if (target > acc) break; while (j < L.length - 2 && L[j + 1] < target) j++;
    const u = (target - L[j]) / Math.max(1e-6, L[j + 1] - L[j]); const px = lerp(pts[j][0], pts[j + 1][0], u), py = lerp(pts[j][1], pts[j + 1][1], u);
    const an = Math.atan2(pts[j + 1][1] - pts[j][1], pts[j + 1][0] - pts[j][0]); const b = seq[k];
    if (groot) { ctx.save(); ctx.translate(px, py); ctx.rotate(an + (kant > 0 ? 0 : Math.PI)); olBase(ctx, 0, w * 0.4, b, groot, { letter: letters }); ctx.restore(); }
    else { const nx = -Math.sin(an) * kant, ny = Math.cos(an) * kant; ctx.strokeStyle = OL.basis[b]; ctx.lineWidth = Math.max(2, w * 0.7); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - nx * -w * 2.6, py - ny * -w * 2.6); ctx.stroke(); } }
  // ruggengraat
  ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = rand || OL.rnaBBR; ctx.lineWidth = w + (rand ? 4 : 2); ctx.stroke();
  ctx.strokeStyle = OL.rnaBB; ctx.lineWidth = w; ctx.stroke();
  ctx.restore();
}
// slappe RNA-streng van lengte len rond (x, y), golvend; geeft punten terug
function olSlap(x, y, len, ang = 0, seed = 1, amp = 1) { const P = []; const n = 7; for (let i = 0; i <= n; i++) { const u = i / n - 0.5; const d = Math.sin(i * 1.3 + seed) * 18 * amp + Math.sin(i * 0.6 + seed * 2) * 10 * amp;
  P.push([x + Math.cos(ang) * u * len - Math.sin(ang) * d, y + Math.sin(ang) * u * len + Math.cos(ang) * d]); } return P; }

// =====================================================================================
// RIBOZYM: een RNA-streng die op zichzelf terugvouwt. Recept: stukken van de streng paren met elkaar (stengels met dwarse
// baseparen, zoals in DNA maar binnen één streng) en vormen lussen; drie stengels die in één knooppunt samenkomen (hamerkop-ribozym,
// Pley e.a. 1994; Scott e.a. 1995). Op het knooppunt zit de actieve plek (goud). fold 0 = slappe streng, 1 = gevouwen.
// Bekende fout: RNA als dubbele helix van twee strengen; een gevouwen RNA als bolletje zonder te zien dat het één streng is.
// =====================================================================================
function _olRibozymVorm(s) { // één doorlopende streng: 5'-staart → stengel I (links) → stengel II (boven) → stengel III (rechts) → 3'-staart.
  // Per stengel loopt de streng langs de ene kant naar buiten, maakt een lus en komt langs de andere kant terug; tegenover elkaar liggende
  // basen vormen paren (sporten). Geeft {P: punten [x, y, nx, ny], paren: [[i, j]]} terug.
  const st = 30 * s, g = 26 * s, R0 = 64 * s, P = [], paren = [];
  const push = (x, y, nx, ny) => { P.push([x, y, nx, ny]); return P.length - 1; };
  push(-30 * s, 90 * s, 0, 1); push(-34 * s, 62 * s, 0, 1);
  for (const [an, np] of [[Math.PI, 4], [-Math.PI / 2, 3], [0, 4]]) { const ux = Math.cos(an), uy = Math.sin(an), vx = -uy, vy = ux; // v = zijwaarts
    const uit = []; for (let i = 0; i < np; i++) { const d = R0 + i * st; uit.push(push(ux * d + vx * g, uy * d + vy * g, -vx, -vy)); }
    const dE = R0 + (np - 1) * st; for (let k = 1; k <= 5; k++) { const th = Math.PI / 2 - k * Math.PI / 6; const lr = g + 8 * s; push(ux * (dE + 6 * s + Math.cos(th) * lr * 1.25) + vx * Math.sin(th) * lr, uy * (dE + 6 * s + Math.cos(th) * lr * 1.25) + vy * Math.sin(th) * lr, ux * Math.cos(th) + vx * Math.sin(th), uy * Math.cos(th) + vy * Math.sin(th)); }
    const terug = []; for (let i = np - 1; i >= 0; i--) { const d = R0 + i * st; terug.push(push(ux * d - vx * g, uy * d - vy * g, vx, vy)); }
    for (let i = 0; i < np; i++) paren.push([uit[i], terug[np - 1 - i]]);
    const an2 = an + Math.PI / 4; push(Math.cos(an2) * 52 * s, Math.sin(an2) * 52 * s, Math.cos(an2), Math.sin(an2)); }
  push(34 * s, 62 * s, 0, 1); push(30 * s, 92 * s, 0, 1);
  return { P, paren };
}
const OL_RZ_SEQ = 'GCUGAUGAGGCCGAAAGGCCGAAACGCAGUCCGAGG';
function olRibozym(ctx, x, y, s = 1, o = {}) {
  const { fold = 1, a = 1, t = 0, actief = true, rot = 0, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const { P: D, paren } = _olRibozymVorm(s), n = D.length; const f = ease(fold); const bk = (i) => OL_RZ_SEQ[i % OL_RZ_SEQ.length];
  const B = D.map((p, i) => { const u = i / (n - 1); return [(u - 0.5) * n * 20 * s, Math.sin(u * 9 + t) * 36 * s + Math.sin(u * 4.3) * 22 * s]; });
  const P = D.map((p, i) => [lerp(B[i][0], p[0], f), lerp(B[i][1], p[1], f)]);
  const gep = new Set(); paren.forEach(([i, j]) => { gep.add(i); gep.add(j); });
  ctx.lineCap = 'round';
  // sporten (baseparen) zodra gevouwen: elk half in de kleur van zijn eigen base
  if (f > 0.55) { ctx.save(); ctx.globalAlpha *= (f - 0.55) / 0.45; for (const [i, j] of paren) { const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2;
      for (const k of [i, j]) { ctx.strokeStyle = OL.basis[bk(k)]; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(P[k][0], P[k][1]); ctx.lineTo(lerp(P[k][0], mx, 0.84), lerp(P[k][1], my, 0.84)); ctx.stroke(); } } ctx.restore(); }
  // ongepaarde basen als korte pootjes; ongevouwen: alle basen naar één kant
  for (let i = 0; i < n; i++) { if (f > 0.55 && gep.has(i)) continue; const p = P[i]; let nx, ny;
    if (f > 0.5) { nx = D[i][2]; ny = D[i][3]; } else { const q = P[Math.min(n - 1, i + 1)], pr = P[Math.max(0, i - 1)]; const an = Math.atan2(q[1] - pr[1], q[0] - pr[0]); nx = -Math.sin(an); ny = Math.cos(an); }
    ctx.strokeStyle = OL.basis[bk(i)]; ctx.lineWidth = 8 * s; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + nx * 20 * s, p[1] + ny * 20 * s); ctx.stroke(); }
  // ruggengraat
  const PP = P.map(p => [p[0], p[1]]); ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, PP, false); ctx.strokeStyle = rand || OL.rnaBBR; ctx.lineWidth = 12 * s + (rand ? 5 : 0); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, PP, false); ctx.strokeStyle = OL.rnaBB; ctx.lineWidth = 8 * s; ctx.stroke();
  if (actief && f > 0.8) { ctx.save(); ctx.globalAlpha *= (f - 0.8) / 0.2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.arc(0, 10 * s, 40 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { actief: [x, y + 10 * s] };
}

// =====================================================================================
// EIWIT (C9): kralenketen die vouwt tot helices en een haarspeld, grijsblauw (enzym, Part C2), actieve plek goud.
// Geometrie hergebruikt uit lib_bio (_eiwitVorm, 'eiwitVouw'), kralen hier eenkleurig grijsblauw omdat het een enzym is.
// =====================================================================================
function olEiwit(ctx, x, y, s = 1, o = {}) { const { a = 1, actief = true, n = 44 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pts = _eiwitVorm(n, s).map(p => [x + p[0], y + p[1], p[2]]); ctx.strokeStyle = _mvL(C.enzym, 0.35); ctx.lineWidth = 3 * s; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]).forEach(i => { const p = pts[i]; const r = 12 * s * (0.82 + 0.18 * ((p[2] || 0) + 1) / 2); circ(ctx, p[0], p[1], r, i % 5 === 2 ? _mvL(C.enzym, 0.15) : C.enzym, _mvL(C.enzym, 0.4), 1.4); });
  if (actief) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.arc(x + 150 * s, y - 40 * s, 30 * s, 2.2, 4.2); ctx.stroke(); }
  ctx.restore(); }

// =====================================================================================
// VETZUUR (C9 membraan, aangepast): één kop (rond, waterlievend, lichtgrijsblauw zoals membraankoppen) + ÉÉN staart (zigzag,
// koolwaterstofketen ± 2× de kopdiameter, donkere oker = vet). Een fosfolipide (celmembraan) heeft er twee; een vetzuur één.
// Bron: Deamer & Dworkin 2005; Hanczyc e.a. 2003 (decaanzuur en oliezuur in proeven). Bekende fout: vetzuur met twee staarten.
// =====================================================================================
function olVetzuur(ctx, x, y, ang, s = 1, o = {}) { const { a = 1, kop = OL.kop } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const kr = 9 * s, L = kr * 4.4; ctx.strokeStyle = _mvL(OL.vet, 0.25); ctx.lineWidth = 3.4 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(kr * 0.8, 0); const nz = 6; for (let i = 1; i <= nz; i++) ctx.lineTo(kr * 0.8 + L * i / nz, (i % 2 ? 3.2 : -3.2) * s); ctx.stroke();
  circ(ctx, 0, 0, kr, kop, _mvL(kop, 0.4), 1.4); ctx.restore(); }

// =====================================================================================
// DUBBELE LAAG langs een gesloten (of open) contour P: buitenste blad met koppen naar buiten, binnenste blad met koppen naar binnen,
// staarten raken elkaar in het midden. Altijd gebogen (een blaasje is rond). Geeft de binnenste contour terug (voor clippen: inhoud blijft
// binnen het binnenste blad, BEELDAFSPRAKEN 23 okt). o.gat = [u0, u1] (fracties) waar een kopje ontbreekt (iets gaat erdoor).
// =====================================================================================
function _olContour(P, dicht = true) { const pts = _mvCR(P, dicht, 8); const out = []; let acc = 0; for (let i = 0; i < pts.length; i++) { if (i) acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); out.push([pts[i][0], pts[i][1], acc]); } return { pts: out, L: acc }; }
function _olOp(C0, d) { const p = C0.pts; let j = 0; while (j < p.length - 2 && p[j + 1][2] < d) j++; const u = (d - p[j][2]) / Math.max(1e-6, p[j + 1][2] - p[j][2]); const x = lerp(p[j][0], p[j + 1][0], u), y = lerp(p[j][1], p[j + 1][1], u); const an = Math.atan2(p[j + 1][1] - p[j][1], p[j + 1][0] - p[j][0]); return [x, y, an]; }
function olBilaag(ctx, P, o = {}) { const { s = 1, a = 1, dicht = true, buitenNaar = 1, gat = null, binnenAlleen = false } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const C0 = _olContour(P, dicht); const kr = 9 * s, off = kr * 5.6, stap = kr * 2.25; const n = Math.floor(C0.L / stap);
  const binnen = [];
  for (let i = 0; i < n; i++) { const d = (i + 0.5) * C0.L / n; const [x, y, an] = _olOp(C0, d); const nx = Math.sin(an) * buitenNaar, ny = -Math.cos(an) * buitenNaar; // normaal naar buiten (voor een contour tegen de klok in)
    const u = d / C0.L; const open = gat && u > gat[0] && u < gat[1];
    if (!open && !binnenAlleen) olVetzuur(ctx, x + nx * off * 0.5, y + ny * off * 0.5, Math.atan2(-ny, -nx), s); // buitenblad: kop buiten, staart naar het midden
    const bi = [x - nx * off * 0.5, y - ny * off * 0.5]; binnen.push([x - nx * (off * 0.5 + kr), y - ny * (off * 0.5 + kr)]);
    if (!open) olVetzuur(ctx, bi[0], bi[1], Math.atan2(ny, nx), s); }
  ctx.restore(); return binnen; }
function olCirkelPad(cx, cy, rx, ry, n = 24, vorm = null) { const P = []; for (let i = 0; i < n; i++) { const th = i / n * 6.283; const k = vorm ? vorm(th) : [1, 1]; P.push([cx + Math.cos(th) * rx * k[0], cy + Math.sin(th) * ry * k[1]]); } return P; }
// blaasje (doorsnede) met optionele inhoud; u = deling 0..1 (pinda-vorm met insnoering in het midden)
function olBlaasje(ctx, cx, cy, R, o = {}) { const { s = R / 150, a = 1, inhoud = null, deling = 0, gat = null, vul = true } = o; if (a <= 0.01) return;
  const vorm = deling > 0 ? (th) => { const c = Math.cos(th), sn = Math.sin(th); const kn = 1 - deling * 0.82 * Math.exp(-c * c / 0.06); return [1 + 0.55 * deling, (1 - 0.15 * deling) * kn]; } : null;
  const P = olCirkelPad(cx, cy, R, R, 28, vorm);
  ctx.save(); ctx.globalAlpha *= a;
  if (vul) { ctx.beginPath(); bioPad(ctx, P, true); ctx.fillStyle = rgba('#2A3448', 0.5); ctx.fill(); }
  const Pb = olCirkelPad(cx, cy, R - 9 * s * 5.6 * 0.5 - 9 * s, R - 9 * s * 5.6 * 0.5 - 9 * s, 28, vorm);
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, Pb, true); ctx.clip(); inhoud(); ctx.restore(); }
  olBilaag(ctx, P, { s, gat }); ctx.restore(); return Pb; }

// =====================================================================================
// MILLERS OPSTELLING (1953). Recept (Miller 1953, Science 117:528; beschrijving en tekening op Wikipedia 'Miller–Urey experiment'):
// grote bolle kolf van 5 liter met de gassen (methaan, ammoniak, waterstof 2 : 2 : 1) en twee wolfraam-elektroden met vonk;
// kleine kolf van 500 ml met water, verwarmd (de damp stijgt via een buis naar de grote kolf); onder de grote kolf een koeler
// (mantelbuis) waarin de damp condenseert; het condensaat loopt via een U-vormige buis (de 'val', waar monsters worden afgetapt)
// terug naar de kleine kolf. Kleur: na een dag roze, na een week dieprood en troebel. Lijntekening (Part C4: lab als lijn #AFC0D0,
// vloeistof als vlak in een betekeniskleur). kleur 0 = helder, 0,5 = roze, 1 = dieprood. Bekende fout: een open bekerglas.
// =====================================================================================
function olMiller(ctx, x, y, s = 1, o = {}) {
  const { kleur = 0, vonk = 1, gas = true, a = 1, labels = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const glas = '#AFC0D0', lw = 4; const vl = kleur < 0.5 ? _mixHex('#7FB8D8', '#D98AA0', kleur * 2) : _mixHex('#D98AA0', '#9A2E3A', (kleur - 0.5) * 2);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // posities: grote kolf rechtsboven (midden 300,-330, r 170), kleine kolf linksonder (midden -300, 40, r 86)
  const G = [300, -330, 170], K = [-300, 40, 86];
  // vloeistof in kleine kolf
  ctx.save(); ctx.beginPath(); ctx.arc(K[0], K[1], K[2] - 3, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba(vl, 0.75); ctx.fillRect(K[0] - 100, K[1] - 10, 200, 120); ctx.restore();
  // gas in grote kolf (moleculen)
  if (gas) { const soorten = ['ch4', 'nh3', 'h2', 'ch4', 'h2o', 'nh3', 'ch4', 'h2', 'nh3', 'h2o', 'ch4', 'nh3']; soorten.forEach((sd, i) => { const an = i * 2.39 + 0.4, rr = Math.sqrt((i + 0.5) / soorten.length) * 128; olMolecuul(ctx, sd, G[0] + Math.cos(an) * rr, G[1] + Math.sin(an) * rr * 0.9, 1.05, { rot: i }); }); }
  // grote kolf
  ctx.strokeStyle = glas; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(G[0], G[1], G[2], -Math.PI / 2 + 0.2, Math.PI * 1.5 - 0.2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(G[0] - 34, G[1] - G[2] + 6); ctx.lineTo(G[0] - 34, G[1] - G[2] - 60); ctx.moveTo(G[0] + 34, G[1] - G[2] + 6); ctx.lineTo(G[0] + 34, G[1] - G[2] - 60); ctx.stroke(); roundRect(ctx, G[0] - 46, G[1] - G[2] - 82, 92, 24, 8); shape(ctx, '#3A4A66', glas, 2);
  // elektroden (schuin van boven links en rechts naar het midden) + vonk
  ctx.strokeStyle = '#C9C9C9'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(G[0] - 220, G[1] - 120); ctx.lineTo(G[0] - 28, G[1] - 10); ctx.moveTo(G[0] + 220, G[1] - 120); ctx.lineTo(G[0] + 28, G[1] - 10); ctx.stroke();
  circ(ctx, G[0] - 220, G[1] - 120, 10, '#5A6272', glas, 2); circ(ctx, G[0] + 220, G[1] - 120, 10, '#5A6272', glas, 2);
  if (vonk > 0) { ctx.save(); ctx.globalAlpha *= vonk; ctx.strokeStyle = '#F6F2D8'; ctx.lineWidth = 4; ctx.beginPath(); const pz = [[-28, -10], [-14, -24], [-4, 2], [8, -20], [18, 4], [28, -10]]; pz.forEach((p, i) => i ? ctx.lineTo(G[0] + p[0], G[1] + p[1] + Math.sin(t * 40 + i) * 3) : ctx.moveTo(G[0] + p[0], G[1] + p[1])); ctx.stroke();
    ctx.strokeStyle = rgba('#F6F2D8', 0.4); ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  // kleine kolf + hals
  ctx.strokeStyle = glas; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(K[0], K[1], K[2], -Math.PI / 2 + 0.3, Math.PI * 1.5 - 0.3); ctx.stroke();
  // stijgbuis: van kleine kolf omhoog en naar de grote kolf
  ctx.beginPath(); ctx.moveTo(K[0] - 25, K[1] - K[2] + 4); ctx.lineTo(K[0] - 25, -470); ctx.quadraticCurveTo(K[0] - 25, -520, K[0] + 25, -520); ctx.lineTo(G[0] - 150, -520); ctx.quadraticCurveTo(G[0] - 120, -520, G[0] - 125, -455); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(K[0] + 25, K[1] - K[2] + 4); ctx.lineTo(K[0] + 25, -470); ctx.quadraticCurveTo(K[0] + 25, -490, K[0] + 45, -490); ctx.lineTo(G[0] - 160, -490); ctx.quadraticCurveTo(G[0] - 150, -490, G[0] - 150, -440); ctx.stroke();
  // koeler onder de grote kolf (mantelbuis)
  const kx = G[0], k0 = G[1] + G[2] - 4, k1 = k0 + 230; ctx.beginPath(); ctx.moveTo(kx - 14, k0); ctx.lineTo(kx - 14, k1); ctx.moveTo(kx + 14, k0); ctx.lineTo(kx + 14, k1); ctx.stroke();
  roundRect(ctx, kx - 40, k0 + 40, 80, 150, 18); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx + 40, k0 + 60); ctx.lineTo(kx + 80, k0 + 60); ctx.moveTo(kx - 40, k0 + 170); ctx.lineTo(kx - 80, k0 + 170); ctx.stroke(); ctx.lineWidth = lw;
  // druppels in de koeler
  ctx.fillStyle = rgba(vl, 0.8); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(kx, k0 + 60 + i * 44, 4, 7, 0, 0, 6.283); ctx.fill(); }
  // U-val: van onder de koeler naar beneden, naar links en omhoog naar de kleine kolf
  const uy = 230; ctx.beginPath(); ctx.moveTo(kx - 12, k1); ctx.lineTo(kx - 12, uy - 20); ctx.quadraticCurveTo(kx - 12, uy + 30, kx - 70, uy + 30); ctx.lineTo(80, uy + 30); ctx.quadraticCurveTo(40, uy + 30, 40, uy - 20); ctx.lineTo(40, 120); ctx.quadraticCurveTo(40, 80, 0, 80); ctx.lineTo(K[0] + K[2] - 4, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kx + 12, k1); ctx.lineTo(kx + 12, uy - 20); ctx.quadraticCurveTo(kx + 12, uy + 58, kx - 70, uy + 58); ctx.lineTo(80, uy + 58); ctx.quadraticCurveTo(12, uy + 58, 12, uy - 20); ctx.lineTo(12, 132); ctx.quadraticCurveTo(12, 108, -14, 108); ctx.lineTo(K[0] + K[2] - 10, 108); ctx.stroke();
  // vloeistof in de U-val (de onderkant)
  ctx.strokeStyle = rgba(vl, 0.9); ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(kx, uy - 10); ctx.quadraticCurveTo(kx, uy + 44, kx - 70, uy + 44); ctx.lineTo(80, uy + 44); ctx.quadraticCurveTo(26, uy + 44, 26, uy - 10); ctx.stroke();
  // kraantje (monsters aftappen) onder in de U
  ctx.strokeStyle = glas; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(160, uy + 58); ctx.lineTo(160, uy + 92); ctx.stroke(); roundRect(ctx, 144, uy + 70, 32, 12, 4); shape(ctx, '#3A4A66', glas, 2);
  // verwarming onder de kleine kolf (vlam: koraal = warmte)
  ctx.fillStyle = C.koraal; for (const dx of [-26, 0, 26]) { ctx.beginPath(); ctx.moveTo(K[0] + dx - 12, K[1] + K[2] + 48); ctx.quadraticCurveTo(K[0] + dx - 10, K[1] + K[2] + 20, K[0] + dx, K[1] + K[2] + 8); ctx.quadraticCurveTo(K[0] + dx + 10, K[1] + K[2] + 20, K[0] + dx + 12, K[1] + K[2] + 48); ctx.closePath(); ctx.fill(); }
  roundRect(ctx, K[0] - 60, K[1] + K[2] + 48, 120, 18, 6); shape(ctx, '#5A6272', glas, 2);
  ctx.restore();
  if (labels) { naamBij(ctx, 'gassen', 'de oerlucht', x + (G[0] + 190) * s, y + (G[1] - 150) * s, 1, 'left'); naamBij(ctx, 'vonken', 'de bliksem', x + (G[0] + 190) * s, y + (G[1] + 40) * s, 1, 'left');
    naamBij(ctx, 'water', 'de oceaan, verwarmd', x + (K[0] - 120) * s, y + (K[1] - 30) * s, 1, 'right'); }
  return { kolf: [x + G[0] * s, y + G[1] * s], val: [x + (kx - 120) * s, y + (uy + 44) * s] };
}
// Stanley Miller (1930–2007) als historische persoon in castboekstijl: in 1953 een promovendus van 23 in Chicago; foto's uit die tijd:
// kort donker haar, achterover gekamd, wit overhemd. Eigen figuur (geen bestaand personage), via de castmotor getekend.
if (typeof CAST !== 'undefined' && !CAST.miller) CAST.miller = { naam: 'Stanley Miller', leeftijd: 23, rol: 'historisch · scheikundestudent in Chicago, 1953', huid: '#EBC6A6', haar: '#2A2018', kapsel: 'kort', wenkbrauw: '#2A2018',
  top: 'overhemd', topKleur: '#E8E4DA', topAccent: '#CFC9BC', broek: '#3A3F4E', schoen: '#2A2018', schoenAccent: '#1A1410', accessoire: [], lengte: 1.02 };

// =====================================================================================
// JONGE AARDE (Macro, nacht): ± 4 miljard jaar geleden. Recept: oceanen (vloeibaar water al 4,4 miljard jaar geleden: Wilde e.a. 2001),
// vulkanische eilanden, onweer; geen zuurstof in de lucht (pas vanaf 2,4 miljard jaar). Vulkanen als driehoeken met krater en een
// lavastroom in koraal (warmte); bliksem als witte zigzag. Geen planten, geen dieren: een kaal landschap.
// =====================================================================================
function olBliksem(ctx, x, y, h, seed = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = [[x, y]]; let px = x; for (let i = 1; i <= 7; i++) { px += (hash(seed * 7 + i) - 0.5) * 70; P.push([px, y + h * i / 7]); }
  ctx.lineJoin = 'miter'; ctx.strokeStyle = rgba('#F6F2D8', 0.35); ctx.lineWidth = 12; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = '#F6F2D8'; ctx.lineWidth = 4; ctx.stroke();
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(P[3][0], P[3][1]); ctx.lineTo(P[3][0] + 50, P[3][1] + 60); ctx.lineTo(P[3][0] + 40, P[3][1] + 110); ctx.stroke(); ctx.restore(); }
function olVulkaan(ctx, x, y, w, h, o = {}) { const { a = 1, rook = true, lava = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vul(ctx, [[x - w / 2, y], [x - w * 0.12, y - h], [x - w * 0.06, y - h * 0.97], [x + w * 0.06, y - h * 0.97], [x + w * 0.12, y - h], [x + w / 2, y]], '#3E3A3C', '#5A5456', 2);
  vul(ctx, [[x - w * 0.12, y - h], [x + w * 0.12, y - h], [x + w * 0.2, y - h * 0.72], [x + w * 0.05, y - h * 0.8], [x - w * 0.1, y - h * 0.7], [x - w * 0.22, y - h * 0.74]], '#55504E', null);
  if (lava) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.03, y - h * 0.97); ctx.quadraticCurveTo(x + w * 0.1, y - h * 0.6, x + w * 0.05, y - h * 0.35); ctx.quadraticCurveTo(x, y - h * 0.15, x + w * 0.08, y); ctx.stroke(); }
  if (rook) { for (let i = 0; i < 5; i++) circ(ctx, x + (i - 1) * w * 0.07 + Math.sin(i) * 12, y - h - 30 - i * 38, 26 + i * 9, rgba('#8A8E96', 0.35 - i * 0.04)); }
  ctx.restore(); }
function olJongeAarde(ctx, o = {}) { const { hor = 560, bliksem = true, bliksem2 = true } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, hor - 140, W, 140);
  // wolken (vlak)
  ctx.fillStyle = '#2C3B58'; for (const [cx, cy, rw] of [[300, 170, 260], [820, 130, 320], [1420, 190, 280], [1760, 120, 200]]) { ctx.beginPath(); ctx.ellipse(cx, cy, rw, 46, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx + rw * 0.3, cy - 30, rw * 0.5, 40, 0, 0, 6.283); ctx.fill(); }
  olVulkaan(ctx, 420, hor + 30, 560, 300); olVulkaan(ctx, 1500, hor + 30, 420, 220, { lava: false }); olVulkaan(ctx, 1080, hor + 40, 300, 140, { rook: false });
  if (bliksem) { olBliksem(ctx, 860, 150, 380, 3); if (bliksem2) olBliksem(ctx, 1720, 160, 300, 5, 0.7); }
  ctx.fillStyle = OL.zeeL; ctx.fillRect(0, hor + 20, W, H - hor - 20); ctx.fillStyle = OL.zee; ctx.fillRect(0, hor + 140, W, H - hor - 140);
  ctx.strokeStyle = rgba('#9CCBE3', 0.4); ctx.lineWidth = 2; for (let r = 0; r < 4; r++) { ctx.beginPath(); for (let x = 0; x <= W; x += 24) { const yy = hor + 50 + r * 70 + Math.sin(x / 70 + r) * 4; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } }

// =====================================================================================
// METEORIET (Murchison, Australië, 28 sept 1969; ± 100 kg verzameld, grootste stuk ± 7 kg; koolstofhoudende chondriet: donkergrijs-zwart,
// smeltkorst, lichte insluitsels (chondrulen)). Bron: Museums Victoria 'The Murchison meteorite'. Brok in doorsnede met chondrulen.
// =====================================================================================
function olMeteorietBrok(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = []; for (let i = 0; i < 11; i++) { const th = i / 11 * 6.283; const rr = r * (0.82 + 0.3 * hash(i * 3.3 + 2)); P.push([x + Math.cos(th) * rr, y + Math.sin(th) * rr * 0.78]); }
  vul(ctx, P, '#2E2C2E', '#141214', 4); ctx.save(); zacht(ctx, P); ctx.clip(); for (let i = 0; i < 26; i++) { const an = hash(i * 5.1) * 6.283, rr = Math.sqrt(hash(i * 2.7)) * r * 0.85; circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.75, 2 + hash(i) * r * 0.06, rgba('#B8B0A0', 0.55)); } ctx.restore(); ctx.restore(); }
function olVuurbal(ctx, x, y, ang, len, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba(i < 2 ? '#F6F2D8' : C.koraal, 0.5 - i * 0.1); ctx.lineWidth = 18 - i * 3; ctx.beginPath(); ctx.moveTo(0, (i - 1.5) * 4); ctx.lineTo(-len * (1 - i * 0.15), (i - 1.5) * 9); ctx.stroke(); }
  circ(ctx, 0, 0, 16, '#F6F2D8', C.koraal, 3); ctx.restore(); }

// =====================================================================================
// HETE BRON OP DE OCEAANBODEM (alkalische bron, zoals Lost City: witte schoorstenen van carbonaat, 30–60 m hoog, water 40–90 °C;
// Kelley e.a. 2001) en ONDIEPE POEL op vulkanisch land (heetwaterbron die opdroogt en weer volloopt: Damer & Deamer 2020; Darwin 1871:
// 'some warm little pond'). Beide Macro, vlak. Bekende fout: een zwarte roker als enige soort bron (die zijn heter, ± 350 °C, en zuur).
// =====================================================================================
function olSchoorsteen(ctx, x, y, h, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = [[x - w / 2, y], [x - w * 0.42, y - h * 0.3], [x - w * 0.3, y - h * 0.55], [x - w * 0.22, y - h * 0.8], [x - w * 0.12, y - h], [x + w * 0.1, y - h * 0.98], [x + w * 0.2, y - h * 0.75], [x + w * 0.34, y - h * 0.5], [x + w * 0.4, y - h * 0.28], [x + w / 2, y]];
  vul(ctx, P, '#C9C2B2', '#E6E1D3', 2); ctx.save(); zacht(ctx, P); ctx.clip(); ctx.strokeStyle = rgba('#8C8676', 0.6); ctx.lineWidth = 2; for (let i = 1; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x - w, y - h * i / 9); ctx.quadraticCurveTo(x, y - h * i / 9 - 10, x + w, y - h * i / 9 + 4); ctx.stroke(); } ctx.restore();
  for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba('#DCE4EC', 0.35 - i * 0.07); ctx.lineWidth = 10 + i * 6; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.quadraticCurveTo(x - 20 + i * 14, y - h - 60 - i * 30, x + 10 + i * 10, y - h - 120 - i * 45); ctx.stroke(); } ctx.restore(); }
function olDiepzee(ctx, o = {}) { const { x0 = 0, w = W } = o; ctx.fillStyle = '#132C44'; ctx.fillRect(x0, 0, w, H); ctx.fillStyle = '#183652'; ctx.fillRect(x0, 0, w, 220);
  ctx.fillStyle = OL.rots; ctx.beginPath(); ctx.moveTo(x0, 780); ctx.quadraticCurveTo(x0 + w * 0.3, 744, x0 + w * 0.6, 786); ctx.quadraticCurveTo(x0 + w * 0.8, 800, x0 + w, 764); ctx.lineTo(x0 + w, H); ctx.lineTo(x0, H); ctx.closePath(); ctx.fill();
  olSchoorsteen(ctx, x0 + w * 0.42, 780, 440, 150); olSchoorsteen(ctx, x0 + w * 0.68, 770, 300, 110); olSchoorsteen(ctx, x0 + w * 0.22, 790, 200, 80); }
function olPoelLand(ctx, o = {}) { const { x0 = 0, w = W, droog = 0.3 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x0, 0, w, H); ctx.fillStyle = '#243656'; ctx.fillRect(x0, 420, w, 140);
  olVulkaan(ctx, x0 + w * 0.72, 560, w * 0.5, 250, { lava: false }); ctx.fillStyle = '#4A4440'; ctx.beginPath(); ctx.moveTo(x0, 560); ctx.quadraticCurveTo(x0 + w * 0.4, 536, x0 + w, 556); ctx.lineTo(x0 + w, H); ctx.lineTo(x0, H); ctx.closePath(); ctx.fill();
  // poel: ondiepe kom met badrand (droogteringen)
  const cx = x0 + w * 0.45, cy = 740, rx = w * 0.3, ry = 70; ctx.beginPath(); ctx.ellipse(cx, cy, rx + 26, ry + 16, 0, 0, 6.283); ctx.fillStyle = '#6E6660'; ctx.fill();
  for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(cx, cy, rx + 18 - k * 9, ry + 11 - k * 5, 0, 0, 6.283); ctx.strokeStyle = rgba('#E6E1D3', 0.35 - k * 0.08); ctx.lineWidth = 3; ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(cx, cy, rx * (1 - droog * 0.4), ry * (1 - droog * 0.4), 0, 0, 6.283); ctx.fillStyle = '#3A7A9A'; ctx.fill(); ctx.strokeStyle = '#9CCBE3'; ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba('#DCE4EC', 0.3 - i * 0.05); ctx.lineWidth = 8 + i * 4; ctx.beginPath(); ctx.moveTo(cx - 80 + i * 50, cy - 20); ctx.quadraticCurveTo(cx - 100 + i * 50, cy - 90, cx - 60 + i * 50, cy - 150 - i * 20); ctx.stroke(); } }

// =====================================================================================
// STROMATOLIETEN (Macro). Recept: koepels of kegels van fijne laagjes (mm) die bacteriematten opbouwen door sediment te vangen;
// koepels 10 cm tot ± 1 m; in doorsnede gebogen laagjes als omgekeerde schalen op elkaar. Oudste breed aanvaarde: Dresser-formatie,
// Pilbara, West-Australië, ± 3,48 miljard jaar (Walter e.a. 1980; Van Kranendonk e.a. 2008). Hier: ondiep water met koepels, één
// doorgezaagd. Bekende fout: losse ronde stenen zonder laagjes.
// =====================================================================================
function olStromatoliet(ctx, x, y, w, h, o = {}) { const { a = 1, doorsnede = false, n = 14 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kl = ['#8C7A5A', '#A8916A', '#7A6A50', '#B8A07A']; const koepel = (k) => { const hh = h * (1 - k / n), ww = w * (1 - k / n * 0.6); ctx.beginPath(); ctx.moveTo(x - ww / 2, y); ctx.bezierCurveTo(x - ww / 2, y - hh * 0.9, x - ww * 0.25, y - hh, x, y - hh); ctx.bezierCurveTo(x + ww * 0.25, y - hh, x + ww / 2, y - hh * 0.9, x + ww / 2, y); ctx.closePath(); };
  if (doorsnede) { for (let k = 0; k < n; k++) { koepel(k); ctx.fillStyle = kl[k % 4]; ctx.fill(); } koepel(0); ctx.strokeStyle = '#D2C2A0'; ctx.lineWidth = 2; ctx.stroke(); }
  else { koepel(0); shape(ctx, '#7A6A50', '#9C8A68', 2); ctx.save(); koepel(0); ctx.clip(); ctx.strokeStyle = rgba('#B8A07A', 0.5); ctx.lineWidth = 2; for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x - w, y - h * k / 6); ctx.quadraticCurveTo(x, y - h * k / 6 - 14, x + w, y - h * k / 6); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.ellipse(x, y - h + 4, w * 0.18, 6, 0, 0, 6.283); ctx.fillStyle = rgba('#4F7A5A', 0.85); ctx.fill(); }
  ctx.restore(); }

// =====================================================================================
// LUCA-MODEL (Micro): een prokaryote cel (geen kern), ± zo groot als een bacterie nu; ringvormig DNA (nucleoïde, paars), veel ribosomen,
// een membraan. Moody e.a. 2024: genoom ≥ 2,5 Mb, ± 2600 eiwitten, anaeroob (leefde zonder zuurstof), had al een vroeg afweersysteem.
// Vorm onbekend: getekend als ovale cel met het label 'model'. Inhoud geclipt binnen het membraan.
// =====================================================================================
function olLuca(ctx, cx, cy, rx, ry, o = {}) { const { a = 1, rand = C.goud, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.7); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, rx - 16, ry - 16, 0, 0, 6.283); ctx.clip();
  for (let i = 0; i < 220; i++) { const an = hash(i * 3.7) * 6.283, d = Math.sqrt(hash(i * 1.9 + 4)); circ(ctx, cx + Math.cos(an) * d * rx, cy + Math.sin(an) * d * ry, 3.2, rgba(C.ribo, 0.75)); }
  nucleoide(ctx, cx - rx * 0.05, cy, rx * 0.42, ry * 0.5, { w: 4, lussen: 12, seed: 4 });
  for (let i = 0; i < 9; i++) { const an = hash(i * 9.1 + 2) * 6.283, d = 0.55 + 0.3 * hash(i * 4.4); olMiniEiwit(ctx, cx + Math.cos(an) * d * rx, cy + Math.sin(an) * d * ry, 0.9, i); }
  ctx.restore();
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, cy, rx - 9, ry - 9, 0, 0, 6.283); ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.er; const nm = Math.round((rx + ry) / 6); for (let i = 0; i < nm; i++) { const an = i / nm * 6.283; circ(ctx, cx + Math.cos(an) * (rx - 4.5), cy + Math.sin(an) * (ry - 4.5), 2.2, C.er); }
  if (rand) { ctx.beginPath(); ctx.ellipse(cx, cy, rx + 10, ry + 10, 0, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore(); }
function olMiniEiwit(ctx, x, y, s = 1, seed = 0) { const P = []; for (let k = 0; k < 9; k++) { const an = k * 1.9 + seed, rr = 8 + 6 * hash(k * 2.1 + seed); P.push([x + Math.cos(an) * rr * s, y + Math.sin(an) * rr * s]); }
  ctx.strokeStyle = _mvL(C.enzym, 0.3); ctx.lineWidth = 1.5; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach(p => circ(ctx, p[0], p[1], 3.6 * s, C.enzym)); }

// ---------- kleine celpictogrammen voor de stamboom (Schema) ----------
// bacterie: staafje met dubbele rand en nucleoïde; archaeon: ronde/hoekige cel met enkele rand; eukaryoot: grotere cel met kern (paars)
function olCelIcoon(ctx, soort, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'bacterie') { roundRect(ctx, -60, -22, 120, 44, 22); shape(ctx, rgba('#2A3448', 0.9), C.er, 3); roundRect(ctx, -52, -14, 104, 28, 14); ctx.strokeStyle = rgba(C.er, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
    ctx.save(); roundRect(ctx, -52, -14, 104, 28, 14); ctx.clip(); nucleoide(ctx, 0, 0, 30, 9, { w: 2.5, lussen: 8, seed: 2 }); ctx.restore(); }
  else if (soort === 'archaeon') { const P = []; for (let i = 0; i < 9; i++) { const th = i / 9 * 6.283; P.push([Math.cos(th) * 38 * (1 + 0.1 * Math.sin(i * 2)), Math.sin(th) * 34]); } vul(ctx, P, rgba('#2A3448', 0.9), C.er, 3);
    ctx.save(); zacht(ctx, P); ctx.clip(); nucleoide(ctx, 0, 0, 18, 14, { w: 2.5, lussen: 7, seed: 5 }); ctx.restore(); }
  else { const P = olCirkelPad(0, 0, 58, 50, 14, (th) => [1 + 0.06 * Math.sin(th * 3), 1 + 0.05 * Math.cos(th * 2)]); vul(ctx, P, rgba('#2A3448', 0.9), C.er, 3); nucleus(ctx, 12, -6, 20, 1);
    mitochondrion(ctx, -24, 24, 44, 0.4, 1, 3); }
  ctx.restore(); }

// eik (Macro-plant, vlak): stam + kroon van gelobde vlakken; eik ± 20–30 m, hier als pictogram met 'niet op schaal'
function olEik(ctx, x, y, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 300;
  vul(ctx, [[x - 16 * s, y], [x - 12 * s, y - 120 * s], [x - 40 * s, y - 170 * s], [x - 8 * s, y - 150 * s], [x + 6 * s, y - 180 * s], [x + 14 * s, y - 120 * s], [x + 18 * s, y]], '#6B4E3A', '#8A6A50', 2);
  for (const [dx, dy, r, c] of [[-70, -170, 62, '#4F7A3C'], [62, -175, 66, '#4F7A3C'], [0, -235, 78, '#5FA86E'], [-50, -230, 52, '#4F7A3C'], [56, -238, 50, '#5FA86E'], [0, -180, 60, '#5FA86E']]) { circ(ctx, x + dx * s, y + dy * s, r * s, c, _mvL(c, 0.25), 1.5); }
  ctx.restore(); }

// codon: drie RNA-basen als tegels + pijl + aminozuur (alanine); hetzelfde in elk organisme
function olCodon(ctx, x, y, s = 1, o = {}) { const { a = 1, seq = 'GCU', aa = 'alanine' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(x + i * 62 * s, y); olBase(ctx, 0, 0, seq[i], 0.62 * s, { letter: true }); ctx.restore(); }
  ctx.strokeStyle = OL.rnaBB; ctx.lineWidth = 16 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 24 * s, y); ctx.lineTo(x + 148 * s, y); ctx.stroke(); ctx.strokeStyle = OL.rnaBBR; ctx.lineWidth = 2; ctx.stroke();
  pijl(ctx, x + 190 * s, y + 40 * s, x + 260 * s, y + 40 * s, C.line, 1, 3, 14); olAminozuur(ctx, x + 340 * s, y + 34 * s, 0.75 * s, { soort: aa });
  ctx.restore(); }

// familie-ketting voor de cold open: per generatie een bevruchte eicel (lib_bio eicelEcht) tussen de mensen
function olZygote(ctx, x, y, r, a = 1) { eicelEcht(ctx, x, y, r, a, false); }

// =====================================================================================
// RIBOSOOM (doorsnede, schematisch). Recept: twee subeenheden, de grote ± 2× zo zwaar als de kleine; ± 25 nm; voor ± 2/3 rRNA, met
// eiwitten vooral aan het oppervlak. Het mRNA loopt tussen de subeenheden door; de nieuwe eiwitketen verlaat de grote subeenheid door een
// tunnel. De plek waar aminozuren aan elkaar worden gezet (peptidyltransferase-centrum) bestaat alleen uit RNA (Ban, Nissen e.a. 2000;
// Nissen e.a. 2000 Science 289:920; Cech 2000 'The ribosome is a ribozyme'). rRNA getekend als teal stengel-lussen, eiwitten grijsblauw.
// Bekende fout: ribosoom als één bolletje; eiwitketen die uit de kleine subeenheid komt.
// =====================================================================================
function olRibosoom(ctx, x, y, s = 1, o = {}) { const { a = 1, keten = 6, kern = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const groot = [[-170, -10], [-180, -90], [-120, -160], [-30, -185], [70, -175], [150, -130], [180, -50], [160, -8]], klein = [[-150, 30], [-120, 92], [-40, 118], [60, 116], [140, 84], [160, 30]];
  // mRNA tussen de subeenheden
  olRnaStreng(ctx, [[-330, 20], [-200, 14], [0, 10], [200, 16], [330, 6]], 'AUGGCUAAGUUCGACGAUCCA', { w: 5 });
  for (const [P, f] of [[klein, '#2A4C62'], [groot, '#24485E']]) { vul(ctx, P, f, OL.rnaBBR, 3); ctx.save(); zacht(ctx, P); ctx.clip();
    ctx.strokeStyle = rgba(OL.rnaBBR, 0.55); ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let k = 0; k < 14; k++) { const cx0 = -160 + (k % 7) * 52 + (k > 6 ? 26 : 0), cy0 = P === groot ? -40 - (k > 6 ? 80 : 0) : 70; ctx.beginPath(); ctx.moveTo(cx0 - 8, cy0 + 24); ctx.lineTo(cx0 - 8, cy0 - 8); ctx.arc(cx0, cy0 - 8, 8, Math.PI, 0); ctx.lineTo(cx0 + 8, cy0 + 24); ctx.stroke(); }
    ctx.restore(); }
  for (const [px, py, r] of [[-150, -110, 18], [120, -150, 16], [165, -70, 14], [-120, 96, 14], [120, 92, 15]]) olMiniEiwit(ctx, px, py, r / 12, px);
  // tunnel + eiwitketen (oker kralen) die eruit komt
  ctx.strokeStyle = rgba('#121A26', 0.85); ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(10, -120, 40, -190); ctx.stroke();
  for (let i = 0; i < keten; i++) { const u = i / Math.max(1, keten - 1); const px = lerp(4, 70, u) + Math.sin(i * 1.4) * 14 * u, py = lerp(-60, -260, u) - (i > 3 ? (i - 3) * 14 : 0); circ(ctx, px, py, 12, OL.aa, OL.aaR, 1.5); }
  if (kern) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -40, 36, 0, 6.283); ctx.stroke(); }
  ctx.restore(); return { kern: [x, y - 40 * s] }; }

// PADDENSTOEL (vruchtlichaam van een schimmel; de schimmel zelf is het draadnetwerk, mycelium, in de grond). Vlak: hoed, plaatjes,
// steel, mycelium als fijne lijntjes in de grond. Bekende fout: alleen de paddenstoel tekenen alsof dat de hele schimmel is.
function olPaddenstoel(ctx, x, y, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 200;
  ctx.strokeStyle = rgba('#E6E1D3', 0.45); ctx.lineWidth = 1.5; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (k - 4) * 22 * s, y + 20 * s, x + (k - 4) * 40 * s, y + (30 + 20 * hash(k)) * s); ctx.stroke(); }
  vul(ctx, [[x - 18 * s, y], [x - 14 * s, y - 110 * s], [x + 14 * s, y - 110 * s], [x + 18 * s, y]], '#E6E1D3', '#C9C2B2', 2);
  vul(ctx, [[x - 95 * s, y - 104 * s], [x - 80 * s, y - 160 * s], [x - 30 * s, y - 196 * s], [x + 30 * s, y - 196 * s], [x + 80 * s, y - 160 * s], [x + 95 * s, y - 104 * s]], '#8C5A3A', '#B07A5A', 2);
  ctx.strokeStyle = rgba('#C9B896', 0.8); ctx.lineWidth = 1.5; for (let k = -8; k <= 8; k++) { ctx.beginPath(); ctx.moveTo(x + k * 10 * s, y - 104 * s); ctx.lineTo(x + k * 4 * s, y - 114 * s); ctx.stroke(); }
  ctx.restore(); }
