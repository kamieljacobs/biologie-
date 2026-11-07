// Het kabelnetwerk 2.0 — scènes (één functie per gesproken alinea; cue via q.at / q.on). 29 okt 2026.
// Beeld volgt de bestaande stem (takes van versie 1.0; vraagalinea's opnieuw ingesproken).
CAST.noor.garderobe.nacht = { top: 'tshirt', topKleur: '#5E7FA8', topAccent: '#4D6E90', broek: '#46597A', kort: false, schoen: '#D9A982', schoenAccent: '#BF8C66' }; // nachtkleding, blote voeten (alleen in deze film)
const NH = 600, NX = 640; // Noor in de keuken: lengte en stoppunt (teen tegen de tafelpoot)

function noorNacht(ctx, t, x, o = {}) { return persoon(ctx, 'noor', x, VLOER2, NH, Object.assign({ zij: true, kijk: 1, outfit: 'nacht', t }, o)); }
function axonGolf(ctx, x1, x2, y, pos, a = 1, breed = 70) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(0, 0, 1, 0); // geen verloop: vlakke band
  ctx.fillStyle = rgba(Z2.sig, 0.85); roundRect(ctx, clamp(pos - breed / 2, x1, x2), y - 18, Math.max(0, Math.min(x2, pos + breed / 2) - clamp(pos - breed / 2, x1, x2)), 36, 14); ctx.fill(); ctx.restore(); }

Object.assign(SCENES, {
  // ---------------- titel: één zenuwcel, een impuls springt over de myeline
  title(ctx, t) { neuronH(ctx, 1060, 640, 1820, { s: 1.5, puls: (t * 0.35) % 1, a: 0.95 }); metaText(ctx, 'zenuwcel · vergroot', 1060, 840, C.text2, 'left', 28); },

  // ---------------- Cold open: 's nachts naar de keuken, teen tegen de tafelpoot
  s01(ctx, t, q) { const bam = q.at('Bam'), schok = fade(t, bam, bam + 0.5, 0.05) * (1 - ramp(t, bam, 0.6));
    keuken(ctx); tafel(ctx, NX + 30, 1, schok);
    const v = gangSnelheid('noor', NH, 'loop'), x0 = NX - v * (bam - 0.05);
    let r; if (t < bam) r = noorNacht(ctx, t, x0, { gang: 'loop', vooruit: true, uit: 'neutraal' }); else r = noorNacht(ctx, t, NX - NH / 6.1 * 0.25, { uit: t < q.at('pijn') ? 'verbaasd' : 'bezorgd' });
    // klap
    if (t > bam && t < bam + 0.8) { const u = (t - bam) / 0.8; ctx.save(); ctx.globalAlpha = 1 - u; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 7; i++) { const an = -Math.PI * (0.1 + i * 0.13); ctx.beginPath(); ctx.moveTo(NX + 10 + Math.cos(an) * 30, VLOER2 - 18 + Math.sin(an) * 30); ctx.lineTo(NX + 10 + Math.cos(an) * (60 + 30 * u), VLOER2 - 18 + Math.sin(an) * (60 + 30 * u)); ctx.stroke(); } ctx.restore(); }
    // twee berichten: zelfde baan, verschillende snelheid
    const pts = beenBaan(ctx, null, NH, NX - NH / 6.1 * 0.25, VLOER2), tS = q.at('stoot'), tP = q.at('pijn'), b = ramp(t, tS - 0.6, 0.5);
    if (b > 0.01) { baanTeken(ctx, pts, b * 0.8, Z2.sig, 6, [4, 10]);
      const uS = ramp(t, tS - 0.3, 0.45), uP = clamp((t - (tS - 0.3)) / (tP - tS + 0.3), 0, 1); const pS = baanPunt(pts, uS), pP = baanPunt(pts, uP);
      signaal(ctx, pS[0], pS[1], b, 15); signaal(ctx, pP[0], pP[1], b, 10, lighten(Z2.sig, 0.0));
      const top = pts[pts.length - 1]; naamBij(ctx, 'stoot', 'snel', top[0] - 120, top[1] - 60, ramp(t, tS + 0.1, 0.4), 'right', C.text);
      naamBij(ctx, 'pijn', 'bijna een seconde later', top[0] - 120, top[1] + 20, ramp(t, tP, 0.4), 'right', C.text);
      metaText(ctx, 'zenuwbaan · schematisch', pts[2][0] - 40, pts[2][1] + 10, C.text2, 'right', 26 + 2); }
    const tw = q.at('Twee'); tijdbalk(ctx, 1320, 660, 500, ramp(t, tw - 0.2, 0.5) * 1, [{ u: 0.02, naam: 'stoot', a: ramp(t, tw, 0.4), hoog: 0 }, { u: 0.95, naam: 'pijn', a: ramp(t, tw + 0.6, 0.4), hoog: 0 }]);
    vraagteken(ctx, 1520, 520, ramp(t, q.at('aankomen') - 0.4, 0.5), 130); },

  // ---------------- H1 vraag: waar begint een impuls?
  s03(ctx, t, q) { bgZ(ctx); const n = neuronH(ctx, 520, 470, 1500, { s: 1.7, a: 0.9 });
    const a1 = ramp(t, q.at('Waar') - 0.2, 0.5); vraagteken(ctx, 300, 330, a1, 110); vraagteken(ctx, 1590, 330, a1, 110);
    const a2 = ramp(t, q.at('welke') - 0.1, 0.5); pijl(ctx, 1000, 650, 1240, 650, C.text2, a2, 4); pijl(ctx, 940, 650, 700, 650, C.text2, a2, 4);
    metaText(ctx, 'neuron · vergroot', 520, 840, C.text2, 'left', 28); },

  // ---------------- H1 antwoord: van been naar neuron
  s05(ctx, t, q) { const tz = q.at('zoomen'), tN = q.at('neuron'), sw = ramp(t, tN - 0.6, 0.6);
    if (sw < 0.99) { ctx.save(); ctx.globalAlpha = 1 - sw; bgZ(ctx, 'schema');
      const r = persoon(ctx, 'noor', 380, 860, 640, { zij: true, kijk: 1, outfit: 'nacht', uit: 'neutraal', t });
      const hh = 640 / 6.1, bx = 380 - hh * 0.08, by = 860 - hh * 1.2; const z = ramp(t, tz, 0.8);
      zoomCircle(ctx, 1180, 450, 340, bx, by, 'zenuw in je been · dwarsdoorsnede · vergroot', z, () => { bgZ(ctx); zenuwDoorsnede(ctx, 1180, 450, 300, { focus: 37, fA: ramp(t, q.at('één') - 0.2, 0.4) }); });
      naamBij(ctx, 'zenuw', 'duizenden uitlopers', 1560, 230, ramp(t, q.at('zenuw'), 0.5) * z, 'left');
      ctx.restore(); }
    if (sw > 0.01) { ctx.save(); ctx.globalAlpha = sw; bgZ(ctx);
      const tA = q.at('begint'), tNo = q.at('andersom'); const puls = t > tA + 1.0 ? ((t - tA - 1.0) * 0.32) % 1 : -1;
      const n = neuronH(ctx, 420, 470, 1680, { s: 2, puls: t < tNo ? puls : -1 });
      // impuls in een dendriet naar het cellichaam (vóór de puls in het axon)
      if (t > tA && t < tA + 1.1) { const u = (t - tA) / 1.1; signaal(ctx, lerp(200, 400, u), lerp(390, 462, u), 1, 12); }
      const L = (w, nm, meta, x, y, al = 'left', d = 0) => naamBij(ctx, nm, meta, x, y, ramp(t, q.at(w) + d, 0.5), al);
      L('dendrieten', 'dendrieten', 'informatie komt binnen', 120, 300, 'left');
      L('cellichaam', 'cellichaam', 'met de kern', 420, 600, 'center');
      L('axon', 'axon', 'lange uitloper', 600, 395, 'center');
      const worst = n.worst[5] || 1000;
      L('myelineschede', 'myelineschede', 'vettige laag', n.worst[3] || 900, 570, 'center');
      if (t > q.at('Schwann') - 0.1) { const a = fade(t, q.at('Schwann'), q.at('insnoeringen') + 1.5, 0.4); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, n.worst[5] - 50, 470 - 34, 100, 68, 30); ctx.stroke(); ctx.restore(); naamBij(ctx, 'cel van Schwann', 'maakt één stukje myeline', n.worst[5], 395, a, 'center'); }
      if (t > q.at('insnoeringen') - 0.1) { const a = ramp(t, q.at('insnoeringen'), 0.4); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (const k of n.knopen.slice(6, 9)) { ctx.beginPath(); ctx.arc(k, 470, 22, 0, 6.283); ctx.stroke(); } ctx.restore(); naamBij(ctx, 'insnoeringen', null, n.knopen[7], 400, a, 'center'); }
      L('eindknopjes', 'eindknopjes', null, 1700, 360, 'center', 0);
      // een meter lang
      const m = fade(t, q.at('meter'), q.at('vettige'), 0.4); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.fillStyle = C.bgMicro; ctx.fillRect(960, 440, 40, 60); ctx.strokeStyle = C.text; ctx.lineWidth = 3; for (const dx of [0, 18]) { ctx.beginPath(); ctx.moveTo(962 + dx, 500); ctx.lineTo(982 + dx, 440); ctx.stroke(); } ctx.restore();
        naamBij(ctx, 'tot ± 1 meter lang', 'van je teen tot in je ruggenmerg', 990, 330, m, 'center', C.goud); }
      // richting
      const ar = ramp(t, tA, 0.6); pijl(ctx, 300, 720, 1600, 720, Z2.sig, ar, 6, 24); naamBij(ctx, 'richting van de impuls', null, 950, 790, ar, 'center');
      const no = ramp(t, tNo, 0.4); if (no > 0.01) { pijl(ctx, 1600, 760, 300, 760, C.koraal, no * 0.0, 4); kruis(ctx, 1450, 650, 40, no); naamBij(ctx, 'nooit andersom', null, 1450, 600, no, 'center', C.koraal); }
      metaText(ctx, 'neuron · schematisch · axon ingekort', W - 40, 870, C.text2, 'right', 28); ctx.restore(); } },

  // ---------------- H2 rust
  s06(ctx, t, q) { rustScene(ctx, t, q, { pomp: true }); },
  s07(ctx, t, q) { rustScene(ctx, t, q, { vraag: true }); },
  s09(ctx, t, q) { rustScene(ctx, t, q, { leeg: true }); },

  // ---------------- H3 de impuls
  s10(ctx, t, q) { impulsScene(ctx, t, q); },
  s11(ctx, t, q) { bgZ(ctx, 'schema'); const d = 0.5 + 0.5 * ramp(t, q.at('harder'), 0.6); huidStuk(ctx, 200, 520, 760, 360, d); vinger(ctx, 580, 520 + 40 * d); drukReceptor(ctx, 580, 700, d * 0.6, 1);
    GR.x = 1120; GR.y = 180; GR.w = 640; GR.h = 360; grafiekAssen(ctx, ramp(t, q.at('impulsen'), 0.5), { xl: 'tijd' }); vraagteken(ctx, 1440, 380, ramp(t, q.at('impulsen') + 0.3, 0.5), 120); GR.x = 1080; GR.y = 110; GR.w = 760; GR.h = 420; },
  s13(ctx, t, q) { bgZ(ctx, 'schema'); const tg = q.at('groot'), rij = [[q.at('groot'), 'zachte prikkel', 3], [q.at('sterkere'), 'harde prikkel', 8]];
    rij.forEach(([t0, nm, n], i) => { const y = 330 + i * 250, a = ramp(t, t0 - 0.3, 0.5); ctx.save(); ctx.strokeStyle = rgba(Z2.sig, 0.35); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(420, y); ctx.lineTo(1720, y); ctx.stroke(); ctx.restore(); spikeReeks(ctx, 420, y, 1300, 150, n, a, ramp(t, t0, 2.5)); naamBij(ctx, nm, n + ' impulsen per seconde', 380, y - 40, a, 'right'); });
    const gh = fade(t, q.at('grotere') - 0.2, q.at('Hij') + 0.4, 0.4); if (gh > 0.01) { ctx.save(); ctx.globalAlpha *= gh; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1000, 580); ctx.lineTo(1030, 330); ctx.lineTo(1060, 580); ctx.stroke(); ctx.restore(); kruis(ctx, 1030, 420, 40, gh); naamBij(ctx, 'geen grotere impuls', null, 1030, 300, gh, 'center', C.koraal); }
    haak(ctx, 420, 1720, 120, '', C.groen, 0); const an = ramp(t, q.at('alles-of-niets'), 0.5); naamBij(ctx, 'alles-of-niets', 'elke impuls even groot', 1070, 130, an, 'center', C.groen);
    const fr = ramp(t, q.at('frequentie'), 0.5); haak(ctx, 420, 1720, 640, 'de sterkte zit in de frequentie', C.groen, fr); },

  // ---------------- H4 snel en langzaam
  s14(ctx, t, q) { bgZ(ctx); const a1 = ramp(t, q.at('dik'), 0.5), a2 = ramp(t, q.at('dun'), 0.5);
    kabel(ctx, 260, 1640, 380, 16, false, 0.35 + 0.65 * a2); kabel(ctx, 260, 1640, 640, 34, true, 0.35 + 0.65 * a1);
    naamBij(ctx, 'dun, zonder myeline', null, 260, 330, a2, 'left'); naamBij(ctx, 'dik, met myeline', null, 260, 560, a1, 'left');
    const f = ramp(t, q.at('eerst'), 0.5); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; ctx.strokeStyle = C.text2; ctx.setLineDash([10, 10]); ctx.lineWidth = 3; for (const x of [260, 1640]) { ctx.beginPath(); ctx.moveTo(x, 260); ctx.lineTo(x, 760); ctx.stroke(); } ctx.restore(); metaText(ctx, 'start', 260, 810, C.text2, 'center', 28); metaText(ctx, 'finish', 1640, 810, C.text2, 'center', 28); }
    vraagteken(ctx, 1760, 540, ramp(t, q.at('eerst') + 0.4, 0.5), 120); },
  s16(ctx, t, q) { raceScene(ctx, t, q); },

  // ---------------- H5 van prikkel naar impuls
  s17(ctx, t, q) { bgZ(ctx, 'schema'); huidStuk(ctx, 300, 520, 900, 360, 0.4); vinger(ctx, 750, 536); drukReceptor(ctx, 750, 720, 0.2, 1); naamBij(ctx, 'drukreceptor', 'in de lederhuid', 900, 760, ramp(t, q.at('drukreceptor'), 0.5), 'left');
    vraagteken(ctx, 1500, 420, ramp(t, q.at('makkelijkst'), 0.5), 140); },
  s19(ctx, t, q) { receptorScene(ctx, t, q); },

  // ---------------- samenvatting
  s20(ctx, t, q) { recapScene(ctx, t, q); },
});

// ===================== H2: rustpotentiaal =====================
// ionen op vaste plekken die niet onder labels of de meter vallen (deterministisch)
function ionPlekken(n, seed, x0, x1, yLo, yHi, mijd) { const out = []; for (let i = 0; out.length < n && i < n * 30; i++) { const x = x0 + hash(i * 17 + seed) * (x1 - x0), u = hash(i * 29 + seed * 3); const y0 = yLo(x), y1 = yHi(x); if (y1 - y0 < 40) continue; const y = y0 + u * (y1 - y0);
    if (mijd.some(r => x > r[0] - 30 && x < r[2] + 30 && y > r[1] - 30 && y < r[3] + 30)) continue; if (out.some(p => Math.hypot(p[0] - x, p[1] - y) < 66)) continue; out.push([x, y]); } return out; }
const RUST = { yT: 470, pomp: 640, lek: 1210 };
function rustScene(ctx, t, q, o) { bgZ(ctx); const yT = RUST.yT, pompX = RUST.pomp, lekX = RUST.lek;
  textuurIn(ctx, () => binnenClip(ctx, yT), 70);
  const aMem = o.pomp ? ramp(t, q.at('membraan') - 0.4, 0.6) : 1;
  const aNa = o.pomp ? ramp(t, q.at('natrium'), 0.5) : 1, aK = o.pomp ? ramp(t, q.at('kalium'), 0.5) : 1, aP = o.pomp ? ramp(t, q.at('pomp') - 0.3, 0.5) : 1, aL = o.pomp ? ramp(t, q.at('kanaaltjes') - 0.3, 0.5) : 1;
  const leeg = o.leeg ? ramp(t, q.at('lekt') - 0.3, q.at('leeg') - q.at('lekt') + 0.6) : 0;
  const eiw = [{ x: pompX, soort: 'eiwit' }]; if (aL > 0.01) eiw.push({ x: lekX, soort: 'kanaal', open: 1 });
  membraanZ(ctx, yT, t, eiw, { a: aMem, ionKleur: Z2.k });
  const mijdB = [[1430, 80, 1860, 470], [pompX - 70, 80, pompX + 70, 470], [lekX - 60, 300, lekX + 60, 470], [40, 90, 520, 150]], mijdI = [[pompX - 300, 0, pompX + 300, 760], [lekX - 220, 0, lekX + 220, 760], [1480, 0, 1900, 900], [40, 820, 520, 900]];
  const PB = ionPlekken(18, 5, 60, 1420, () => 140, x => memY(x, yT) - 110, mijdB), PI = ionPlekken(18, 9, 60, 1460, x => memY(x, yT) + 110, () => 860, mijdI);
  const nNaB = Math.round(lerp(14, 9, leeg)), nKB = Math.round(lerp(2, 6, leeg)), nKI = Math.round(lerp(13, 9, leeg)), nNaI = Math.round(lerp(2, 6, leeg));
  PB.forEach(([x, y], i) => { const w = wander(i, t, 8, 0.4); if (i < nNaB) ion(ctx, 'na', x + w.x, y + w.y, aNa); else if (i < nNaB + nKB) ion(ctx, 'k', x + w.x, y + w.y, aK); });
  PI.forEach(([x, y], i) => { const w = wander(i + 40, t, 8, 0.4); if (i < nKI) ion(ctx, 'k', x + w.x, y + w.y, aK); else if (i < nKI + nNaI) ion(ctx, 'na', x + w.x, y + w.y, aNa); });
  if (o.pomp) { naamBij(ctx, 'veel natrium buiten', null, 60, 130, aNa, 'left', Z2.na); naamBij(ctx, 'veel kalium binnen', null, 60, 870, aK, 'left', Z2.k); }
  else { metaText(ctx, 'buiten', 60, 130, C.text2, 'left', 28); metaText(ctx, 'binnen', 60, 870, C.text2, 'left', 28); }
  const pompAan = o.pomp ? ramp(t, q.at('drie') - 0.3, 0.4) : 0; const pY = memY(pompX, yT);
  if (pompAan > 0.01) { const c = ((t - q.at('drie') + 0.3) / 3) % 1; for (let k = 0; k < 3; k++) { const u = clamp((c - k * 0.05) / 0.45, 0, 1); if (u > 0 && u < 1) ion(ctx, 'na', pompX - 30 + k * 30, lerp(pY + 120, pY - 140, ease(u)), pompAan, 22); }
    for (let k = 0; k < 2; k++) { const u = clamp((c - 0.5 - k * 0.05) / 0.45, 0, 1); if (u > 0 && u < 1) ion(ctx, 'k', pompX - 15 + k * 30, lerp(pY - 140, pY + 120, ease(u)), pompAan, 22); } }
  const stil = o.leeg || o.vraag; naamBij(ctx, 'natrium-kaliumpomp', stil ? 'stilgelegd' : (pompAan > 0.5 ? '3 Na⁺ naar buiten · 2 K⁺ naar binnen' : null), pompX, pY + 195, aP, 'center', stil ? C.text2 : C.text);
  if (stil) kruis(ctx, pompX, pY, 48, 1, C.koraal);
  const aA = o.pomp ? ramp(t, q.at('ATP'), 0.4) : 0; if (aA > 0.01) tag(ctx, 'ATP', pompX - 170, pY + 100, Z2.atp, aA, 'center', 32);
  const lY = memY(lekX, yT), lek = o.pomp ? ramp(t, q.at('lekt') - 0.2, 0.4) : (o.leeg ? 1 : 0);
  if (lek > 0.01) for (let k = 0; k < 3; k++) { const u = ((t * 0.4 + k / 3) % 1); ion(ctx, 'k', lekX + Math.sin(u * 3 + k) * 6, lerp(lY + 130, lY - 150, ease(u)), lek * Math.sin(u * Math.PI), 22); }
  naamBij(ctx, 'kaliumlekkanaal', 'staat altijd open', lekX, lY + 175, aL, 'center');
  const pl = o.pomp ? ramp(t, q.at('Positieve'), 0.5) : (o.leeg ? 1 - leeg * 0.8 : 1); for (let i = 0; i < 4; i++) { const x = 1300 + i * 46; plusje(ctx, x, memY(x, yT) - 70, pl, C.text, 12); minnetje(ctx, x, memY(x, yT) + 72, pl, C.text, 12); }
  const vm = o.pomp ? ramp(t, q.at('voltmeter'), 0.5) : 1, mv = o.pomp ? lerp(0, -70, ramp(t, q.at('voltmeter') + 0.3, q.at('zeventig') - q.at('voltmeter'))) : (o.leeg ? lerp(-70, -15, leeg) : -70);
  voltmeter(ctx, 1650, 230, mv, vm);
  if (vm > 0.01) { ctx.save(); ctx.globalAlpha *= vm; ctx.strokeStyle = C.text2; ctx.lineWidth = 3; const xb = 1520, xi = 1780; ctx.beginPath(); ctx.moveTo(1560, 345); ctx.lineTo(xb, memY(xb, yT) - 60); ctx.moveTo(1740, 345); ctx.lineTo(xi, memY(xi, yT) + 90); ctx.stroke(); circ(ctx, xb, memY(xb, yT) - 60, 8, C.text2); circ(ctx, xi, memY(xi, yT) + 90, 8, C.text2); ctx.restore(); }
  const rp = o.pomp ? ramp(t, q.at('rustpotentiaal'), 0.5) : 0; naamBij(ctx, 'rustpotentiaal', 'binnen ± −70 mV t.o.v. buiten', 1650, 690, rp, 'center', C.goud);
  const bt = o.pomp ? ramp(t, q.at('batterij'), 0.5) : (o.leeg ? ramp(t, q.at('leeg') - 0.3, 0.5) : 0); if (bt > 0.01) batterij(ctx, 1650, 800, o.leeg ? 1 - leeg * 0.9 : 1, bt);
  if (o.leeg) metaText(ctx, 'op den duur · versneld', W / 2, 130, C.text2, 'center', 28);
  if (o.vraag) vraagteken(ctx, 1650, 790, ramp(t, q.at('rustpotentiaal'), 0.5), 110);
  metaText(ctx, 'membraan · sterk vergroot', W - 40, 46, C.text2, 'right', 28); }
function batterij(ctx, x, y, vol, a = 1) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 34, 150, 68, 10); shape(ctx, '#2A3A58', C.text2, 3); ctx.fillStyle = C.text2; ctx.fillRect(x + 70, y - 14, 14, 28);
  ctx.fillStyle = vol > 0.3 ? C.groen : C.koraal; roundRect(ctx, x - 72, y - 26, 134 * clamp(vol, 0.03, 1), 52, 6); ctx.fill(); ctx.restore(); }

// ===================== H3: actiepotentiaal =====================
function vAP(q, tt) { const T = w => q.at(w); const tM = T('membraan'), tN = T('Natriumkanalen'), tB = T('depolarisatie'), tS = T('sluiten'), tR = T('repolarisatie'), tH = T('hyperpolarisatie'), tE = T('golfje');
  if (tt < tM) return -70; if (tt < T('Even')) return lerp(-70, -62, ease((tt - tM) / (T('Even') - tM)));
  if (tt < T('Maar')) return -62; if (tt < tN) return lerp(-62, -55, ease((tt - T('Maar')) / (tN - T('Maar'))));
  if (tt < tB) return lerp(-55, 30, ease((tt - tN) / (tB - tN))); if (tt < tS) return 30;
  if (tt < tR + 0.3) return lerp(30, -70, ease((tt - tS) / (tR + 0.3 - tS))); if (tt < tH + 0.4) return lerp(-70, -82, ease((tt - tR - 0.3) / (tH + 0.1 - tR)));
  if (tt < tE) return lerp(-82, -70, ease((tt - tH - 0.4) / (tE - tH - 0.4))); return -70; }
const IMP = { yT: 600, na: 330, k: 640 };
function impulsScene(ctx, t, q) { bgZ(ctx); const yT = IMP.yT, naX = IMP.na, kX = IMP.k; const tR = q.at('prikkelt') - 0.3, sw = ramp(t, tR, 0.6);
  if (sw < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sw; textuurIn(ctx, () => binnenClip(ctx, yT), 60);
    const tN = q.at('Natriumkanalen'), tS = q.at('sluiten'), tK = q.at('Kaliumkanalen'), tKd = q.at('golfje');
    const naOpen = ramp(t, tN, 0.3) * (1 - ramp(t, tS, 0.3)), kOpen = ramp(t, tK, 0.4) * (1 - ramp(t, tKd - 1.2, 0.8));
    membraanZ(ctx, yT, t, [{ x: naX, soort: 'kanaal', open: naOpen }, { x: kX, soort: 'kanaal', open: kOpen }], { ionKleur: naOpen > kOpen ? Z2.na : Z2.k });
    naamBij(ctx, 'natriumkanaal', naOpen > 0.5 ? 'open' : 'dicht', naX, memY(naX, yT) + 180, 1, 'center'); naamBij(ctx, 'kaliumkanaal', kOpen > 0.5 ? 'open' : (t > tKd - 1.2 ? 'weer dicht' : 'dicht'), kX, memY(kX, yT) + 180, 1, 'center');
    const mijdB = [[naX - 70, 0, naX + 70, 900], [kX - 70, 0, kX + 70, 900], [60, 100, 300, 260]], mijdI = [[naX - 170, 0, naX + 170, 900], [kX - 170, 0, kX + 170, 900], [40, 760, 400, 900]];
    const PB = ionPlekken(10, 4, 60, 980, () => 150, x => memY(x, yT) - 110, mijdB), PI = ionPlekken(8, 8, 60, 1000, x => memY(x, yT) + 110, () => 860, mijdI);
    const naIn = Math.round(3 * ramp(t, q.at('stroomt') - 0.2, 2.0)), kUit = Math.round(3 * ramp(t, q.at('stroomt', 2) - 0.2, 2.0));
    PB.forEach(([x, y], i) => { const w = wander(i, t, 8, 0.4); ion(ctx, 'na', x + w.x, y + w.y, i < PB.length - naIn ? 1 : 0, 24); });
    PI.forEach(([x, y], i) => { const w = wander(i + 30, t, 8, 0.4); ion(ctx, 'k', x + w.x, y + w.y, i < PI.length - kUit ? 1 : 0, 24); });
    for (let k = 0; k < naIn; k++) { const w = wander(k + 70, t, 8, 0.4); ion(ctx, 'na', 150 + k * 75 + w.x, memY(150 + k * 75, yT) + 95 + w.y, 1, 24); }
    for (let k = 0; k < kUit; k++) { const w = wander(k + 80, t, 8, 0.4); ion(ctx, 'k', kX - 90 + k * 90 + w.x, memY(kX, yT) - 220 + w.y, 1, 24); }
    const ny = memY(naX, yT), ky = memY(kX, yT);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); ion(ctx, 'na', naX, lerp(ny - 160, ny + 160, ease(u)), naOpen * Math.sin(u * Math.PI), 22); }
    for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1); ion(ctx, 'k', kX, lerp(ky + 160, ky - 160, ease(u)), kOpen * Math.sin(u * Math.PI), 22); }
    metaText(ctx, 'buiten', 60, 130, C.text2, 'left', 28); metaText(ctx, 'binnen', 60, 870, C.text2, 'left', 28);
    const pk = fade(t, q.at('prikkel') - 0.1, q.at('drempelwaarde'), 0.4); if (pk > 0.01) { pijl(ctx, 870, 170, 870, memY(870, yT) - 70, C.goud, pk, 5, 20); naamBij(ctx, 'prikkel', null, 900, 200, pk, 'left', C.goud); }
    GR.x = 1140; GR.y = 130; GR.w = 680; GR.h = 360;
    const dr = ramp(t, q.at('vijfenvijftig'), 0.5); grafiekAssen(ctx, 1, { drempel: dr, xl: 'tijd · vertraagd' });
    const tEnd = q.at('golfje') + 0.6, u1 = clamp(t / tEnd, 0, 1) * 0.92 + 0.02, f = u => vAP(q, (u - 0.02) / 0.92 * tEnd);
    grafiekLijn(ctx, f, Math.min(u1, 0.94)); const X = tt => GR.x + (0.02 + 0.92 * tt / tEnd) * GR.w;
    naamBij(ctx, 'drempelwaarde', '± −55 mV', GR.x + GR.w - 10, grY(-55) - 12, ramp(t, q.at('drempelwaarde'), 0.4), 'right', C.goud);
    const lab = (w, nm, x, y, al = 'left', col = C.text) => naamBij(ctx, nm, null, x, y, ramp(t, q.at(w), 0.4), al, col);
    lab('depolarisatie', 'depolarisatie', X(q.at('Natriumkanalen')) - 16, grY(0) - 20, 'right', Z2.na); lab('repolarisatie', 'repolarisatie', X(q.at('sluiten')) + 50, grY(-15), 'left', Z2.k); lab('hyperpolarisatie', 'hyperpolarisatie', X(q.at('hyperpolarisatie')) + 30, grY(-82) + 6, 'left');
    const ap = ramp(t, q.at('actiepotentiaal'), 0.5); naamBij(ctx, 'actiepotentiaal', null, GR.x + GR.w - 16, GR.y + 40, ap, 'right', Z2.sig); if (t > q.at('duizendste')) metaText(ctx, 'duur: een paar duizendste seconde', GR.x + GR.w, GR.y + GR.h + 100, Z2.sig, 'right', 28);
    GR.x = 1080; GR.y = 110; GR.w = 760; GR.h = 420; ctx.restore(); }
  if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; rolScene(ctx, t, q, tR); ctx.restore(); } }
// het rollen over een axon zonder myeline (stukje voor stukje), refractaire zone erachter
function rolScene(ctx, t, q, t0) { const y = 470, x1 = 120, x2 = 1800, hb = 150; const pos = lerp(x1 + 220, x2 - 240, clamp((t - t0 - 0.3) / 13.5, 0, 1));
  ctx.fillStyle = '#1E2A3C'; roundRect(ctx, x1, y - hb, x2 - x1, 2 * hb, hb); ctx.fill(); textuurIn(ctx, () => roundRect(ctx, x1, y - hb + 12, x2 - x1, 2 * hb - 24, hb), 50, 9);
  ctx.strokeStyle = C.er; ctx.lineWidth = 4; for (const yy of [y - hb, y + hb]) { ctx.beginPath(); ctx.moveTo(x1 + hb, yy); ctx.lineTo(x2 - hb, yy); ctx.stroke(); }
  const rf = ramp(t, q.at('erachter') - 0.2, 0.5), rx = Math.max(x1 + hb, pos - 360); if (rf > 0.01) { ctx.save(); ctx.globalAlpha *= rf; ctx.fillStyle = rgba(C.line, 0.25); ctx.fillRect(rx, y - hb - 16, pos - 70 - rx, 2 * hb + 32); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; for (let x = rx; x < pos - 90; x += 26) { for (const yy of [y - hb, y + hb]) { ctx.beginPath(); ctx.moveTo(x, yy - 14); ctx.lineTo(x + 20, yy + 14); ctx.stroke(); } } ctx.restore(); }
  ctx.save(); ctx.fillStyle = rgba(Z2.sig, 0.9); for (const yy of [y - hb, y + hb]) { roundRect(ctx, pos - 70, yy - 16, 140, 32, 14); ctx.fill(); } ctx.restore();
  for (let k = -1; k <= 1; k++) { plusje(ctx, pos + k * 40, y - hb + 50, 1, C.text, 13); minnetje(ctx, pos + k * 40, y - hb - 50, 1, C.text, 13); plusje(ctx, pos + k * 40, y + hb - 50, 1, C.text, 13); minnetje(ctx, pos + k * 40, y + hb + 50, 1, C.text, 13); }
  const pv = ramp(t, q.at('volgende'), 0.4); pijl(ctx, pos + 80, y, pos + 230, y, Z2.sig, pv, 6, 22);
  naamBij(ctx, 'actiepotentiaal', null, pos, y - hb - 90, ramp(t, q.at('rolt'), 0.4), 'center', Z2.sig);
  naamBij(ctx, 'refractaire periode', 'even niet prikkelbaar', Math.max(x1 + 200, pos - 230), y + hb + 76, ramp(t, q.at('refractaire'), 0.4), 'center', C.text);
  const ek = ramp(t, q.at('Daarom'), 0.5); pijl(ctx, 620, 860, 1300, 860, Z2.sig, ek, 6, 22); naamBij(ctx, 'één kant op', null, 960, 836, ek, 'center', Z2.sig);
  metaText(ctx, 'axon zonder myeline · vertraagd', W - 40, 46, C.text2, 'right', 28); }

// ===================== H4: de race =====================
function raceScene(ctx, t, q) { const tT = q.at('teen'), sw = ramp(t, tT - 0.4, 0.6);
  if (sw < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sw; bgZ(ctx); const x1 = 220, x2 = 1660, yA = 330, yB = 620; const st = q.at('race');
    kabel(ctx, x1, x2, yA, 16, false, 1); const kn = kabel(ctx, x1, x2, yB, 34, true, 1, { nodeA: fade(t, q.at('insnoeringen') - 0.2, q.at('honderdtwintig'), 0.4) });
    naamBij(ctx, 'dun, zonder myeline', null, x1, yA - 50, 1, 'left'); naamBij(ctx, 'dik, met myeline', null, x1, yB - 70, 1, 'left');
    // dun: golf stap voor stap (langzaam)
    const uA = clamp((t - st) / 30, 0, 1); axonGolf(ctx, x1, x2, yA, x1 + 20 + uA * (x2 - x1 - 40), ramp(t, st, 0.3), 60);
    // dik: springt van knoop naar knoop, telkens opnieuw (snel)
    if (t > st) { const per = 1.6, c = ((t - st) % per) / per, k = Math.min(kn.length - 1, Math.floor(c * (kn.length + 2))); if (k < kn.length) { circ(ctx, kn[k], yB, 22, rgba(Z2.sig, 0.9), lighten(Z2.sig, 0.4), 3); } }
    naamBij(ctx, '± 1 meter per seconde', 'stap voor stap', x2, yA - 50, ramp(t, q.at('één'), 0.4), 'right', C.text);
    // ionen ketsen af op de myeline
    const io = fade(t, q.at('ionen') - 0.3, q.at('insnoeringen') + 0.5, 0.4); if (io > 0.01) for (let i = 0; i < 4; i++) { const x = 620 + i * 280, u = ((t * 0.8 + i * 0.3) % 1), yy = yB - 150 + 90 * Math.sin(u * Math.PI); ion(ctx, 'na', x, yy, io * 0.9, 20); }
    if (io > 0.01) naamBij(ctx, 'myeline laat geen ionen door', null, 960, yB - 190, io, 'center');
    naamBij(ctx, 'insnoeringen', 'hier ontstaat de actiepotentiaal', kn[5] || 900, yB + 110, fade(t, q.at('insnoeringen'), q.at('honderdtwintig'), 0.4), 'center', C.goud);
    naamBij(ctx, 'sprongsgewijze geleiding', 'tot 120 meter per seconde', x2, yB + 110, ramp(t, q.at('sprongsgewijze'), 0.4), 'right', Z2.sig);
    const dk = ramp(t, q.at('dikker'), 0.5); haak(ctx, x1, x2, 780, 'hoe dikker het axon, hoe sneller', C.groen, dk);
    metaText(ctx, 'schematisch · snelheden niet op schaal', W - 40, 40, C.text2, 'right', 28); ctx.restore(); }
  if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; keuken(ctx); tafel(ctx, NX + 30); const xN = NX - NH / 6.1 * 0.25; noorNacht(ctx, t, xN, { uit: t > q.at('pijn') + 1.5 ? 'bezorgd' : 'neutraal' });
    const pts = beenBaan(ctx, null, NH, xN, VLOER2); const tA = q.at('aanraking'), tP = q.at('doffe');
    baanTeken(ctx, pts, 0.8, Z2.sig, 6, [4, 10]);
    const uA = ramp(t, tA, 0.5), uP = clamp((t - tP) / (q.at('seconde.', 2) - tP + 0.6), 0, 1);
    if (t > tA) { const p = baanPunt(pts, uA); signaal(ctx, p[0], p[1], 1, 15); }
    if (t > tP) { const p = baanPunt(pts, uP); signaal(ctx, p[0], p[1], 1, 10); }
    const top = pts[pts.length - 1]; naamBij(ctx, 'ruggenmerg', null, top[0] - 30, top[1] - 30, ramp(t, q.at('ruggenmerg'), 0.4), 'right');
    tijdbalk(ctx, 1320, 660, 500, 1, [{ u: 0.02, naam: 'aanraking', meta: 'dik · myeline · 20 ms', a: ramp(t, q.at('twintig'), 0.4) }, { u: 1, naam: 'pijn', meta: 'dun · geen myeline · 1 s', a: ramp(t, q.at('hele'), 0.4), hoog: 90 }]);
    const pz = ramp(t, q.at('kabels'), 0.5); naamBij(ctx, 'twee kabels, twee snelheden', null, 1520, 520, pz, 'center', C.goud);
    metaText(ctx, 'zenuwbaan · schematisch', W - 40, 40, C.text2, 'right', 28); ctx.restore(); } }

// ===================== H5: de receptor =====================
function receptorScene(ctx, t, q) { bgZ(ctx, 'schema'); const tAd = q.at('Elke'), sw = ramp(t, tAd - 0.4, 0.6);
  if (sw < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sw; const tZ = q.at('Zacht'), tH1 = q.at('Harder'), tH2 = q.at('Harder', 2);
    const druk = t < q.at('vervormt') ? 0 : (t < tZ ? 0.6 * ramp(t, q.at('vervormt'), 0.6) : (t < tH1 ? 0.35 : (t < tH2 ? 0.7 : 1)));
    const dip = huidStuk(ctx, 140, 470, 820, 420, druk); vinger(ctx, 550, 470 + 40 * druk, ramp(t, q.at('vervormt') - 0.6, 0.4));
    drukReceptor(ctx, 550, 690, druk, 1); naamBij(ctx, 'receptor', 'cel met een gevoelig membraan', 700, 720, ramp(t, q.at('receptor'), 0.5), 'left');
    const ko = ramp(t, q.at('kanaaltjes'), 0.4) * (druk > 0.2 ? 1 : 0.3); if (ko > 0.01) { for (let k = 0; k < 4; k++) { const an = k * 1.57 + 0.6; ion(ctx, 'na', 550 + Math.cos(an) * 60, 690 + Math.sin(an) * 80, ko * 0.9, 16); } naamBij(ctx, 'kanaaltjes open', 'Na⁺ naar binnen', 700, 800, ko, 'left'); }
    // spanning van de receptor + impulsen
    GR.x = 1120; GR.y = 150; GR.w = 680; GR.h = 360; grafiekAssen(ctx, ramp(t, q.at('negatief') - 0.4, 0.5), { drempel: ramp(t, q.at('drempel'), 0.4), xl: 'tijd' });
    const niveau = druk < 0.01 ? -70 : (t < tH1 ? -62 : -55); const n = t < tH1 ? 0 : (t < tH2 ? 3 : 9);
    if (t > q.at('negatief') - 0.4) { ctx.save(); ctx.strokeStyle = Z2.sig; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(GR.x, grY(-70)); ctx.lineTo(GR.x + 60, grY(-70)); ctx.lineTo(GR.x + 100, grY(niveau)); ctx.stroke(); ctx.restore();
      spikeReeks(ctx, GR.x + 100, grY(niveau), GR.w - 110, grY(niveau) - grY(30), n, 1, 1); }
    naamBij(ctx, 'te weinig', 'onder de drempel', GR.x + GR.w / 2, GR.y + GR.h + 100, fade(t, tZ, tH1, 0.3), 'center', C.koraal);
    naamBij(ctx, 'drempel gehaald', 'een impuls', GR.x + GR.w / 2, GR.y + GR.h + 100, fade(t, q.at('gehaald'), tH2, 0.3), 'center', C.groen);
    naamBij(ctx, 'meer impulsen per seconde', null, GR.x + GR.w / 2, GR.y + GR.h + 100, ramp(t, q.at('seconde'), 0.3), 'center', C.groen);
    GR.x = 1080; GR.y = 110; GR.w = 760; GR.h = 420; ctx.restore(); }
  if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw; const rij = [['huid · drukreceptor', 'druk', q.at('huid')], ['oog · lichtreceptor', 'licht', q.at('oog')]];
    rij.forEach(([o, p, t0], i) => { const y = 260 + i * 140, a = ramp(t, t0 - 0.2, 0.4); naamBij(ctx, o, null, 360, y, a, 'left'); pijl(ctx, 860, y - 12, 1040, y - 12, C.line, a, 3); naamBij(ctx, p, null, 1080, y, a, 'left', C.goud); });
    const ad = ramp(t, q.at('adequate'), 0.5); naamBij(ctx, 'adequate prikkel', 'daar reageert hij het makkelijkst op', 1400, 330, ad, 'left', C.goud);
    if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; metaText(ctx, 'een heel sterke andere prikkel kan het soms ook (druk op je oog → licht)', 360, 560, C.text2, 'left', 28); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= ramp(t, q.at('nooit'), 0.5); const ch = [['prikkel', C.goud], ['receptor', C.text], ['impulsen', Z2.sig]]; ch.forEach(([s, c], i) => { tag(ctx, s, 520 + i * 440, 760, c, 1, 'center', 40); if (i < 2) pijl(ctx, 640 + i * 440, 742, 820 + i * 440, 742, C.line, 1, 3); }); ctx.restore();
    naamBij(ctx, 'de receptor vertaalt de prikkel', null, 960, 660, ramp(t, q.at('vertaalt'), 0.5), 'center', C.text); ctx.restore(); } }

// ===================== samenvatting =====================
function recapScene(ctx, t, q) { bgZ(ctx, 'schema'); const items = [
    ['receptoren', 'receptor vertaalt de klap', 'druk vervormt het membraan'], ['drempel', 'drempel gehaald', '± −55 mV'], ['actiepotentiaal', 'actiepotentiaal', 'Na⁺ in · K⁺ uit'],
    ['groot', 'alles-of-niets, één kant op', 'sterkte = frequentie'], ['snelle', 'snelle kabel: dik, met myeline', 'springt · 20 ms'], ['langzame', 'langzame kabel: dun, zonder myeline', 'stap voor stap · 1 s']];
  items.forEach(([w, nm, meta], i) => { const a = ramp(t, q.at(w) - 0.2, 0.5), y = 150 + i * 118; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 300, y - 44, 1320, 96, 14); shape(ctx, rgba(C.fill, 0.7), rgba(C.line, 0.5), 1.5);
    circ(ctx, 360, y + 4, 14, i >= 4 ? Z2.sig : (i === 0 ? C.goud : Z2.sig)); text(ctx, nm, 400, y + 14, fTekst(40, 600), C.text); metaText(ctx, meta, 1590, y + 12, C.grain, 'right', 28); ctx.restore(); });
  const tw = q.at('aankomsttijden'); naamBij(ctx, 'één klap · twee kabels · twee aankomsttijden', null, 960, 880 - 10, ramp(t, q.at('klap', 2) - 0.2, 0.5), 'center', C.goud); }
