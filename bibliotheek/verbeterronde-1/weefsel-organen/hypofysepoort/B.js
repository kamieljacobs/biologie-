// =====================================================================================
// HYPOTHALAMUS EN HYPOFYSE MET HET POORTADERSYSTEEM (mediaan, voorkant = rechts).
// Recept: GnRH-cellen liggen in de hypothalamus; hun axonen eindigen in de eminentia mediana bovenaan het steeltje,
// waar ze GnRH afgeven aan een eerste haarvatnet. Poortaders lopen langs het steeltje naar een tweede haarvatnet in de
// VOORkwab; daar maken dezelfde cellen (gonadotrofe cellen) FSH en LH, die via een ader het lichaam in gaan. De
// achterkwab (zenuwweefsel) is de voortzetting van het steeltje. Hypofyse ± 1 cm (erwt), in het Turkse zadel.
// Bron: Kenhub 'Pituitary gland' (portaalsysteem naar de voorkwab, gonadotrofe cellen maken FSH en LH);
// StatPearls 'Physiology, Puberty' (GnRH in stoten). Bekende fouten: GnRH dat 'door de lucht' naar de hypofyse
// zweeft; FSH/LH uit de achterkwab; hypofyse los onder de hersenen.
// Ontwerpeenheden: ± 900 × 760, oorsprong = onderkant van de hypothalamus (bovenkant steeltje).
// o: puls 0..1 (stoot GnRH loopt door de poortaders: 0 = net afgegeven, 1 = in de voorkwab), aan 0..1 (cellen
// voorkwab maken FSH/LH), uit 0..1 (FSH/LH in de uitgaande ader), stoten 0..1 (hoe vaak: kindertijd → puberteit), t.
// =====================================================================================
// v2 (beeldbank 27 okt 2026): hypothalamus als onderkant van de hersenen (koepel van de tussenhersenen met thalamus, sulcus,
// derde hersenkamer als trechter in het steeltje, corpus mamillare achter en oogzenuwkruising vóór het steeltje); Turks zadel
// als bot met dikte en de wiggenbeenholte eronder (bron: OpenStax A&P 2e 17.3; Radiology Assistant 'Sella turcica');
// uitgaande ader opzij in plaats van door het bot.
// Variant 'venster': het geheel staat in een ronde zoomcirkel (goud) die tot de rand vol weefsel is, zoals ingezoomd vanuit
// hoofdHersenen; o.venster = false tekent hem los. Cirkel ± 520 eenheden rond (40, 60).
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const VENSTER = o.venster !== false; const VC = P(40, 60), VR = 520 * s;
  if (VENSTER) { ctx.save(); ctx.beginPath(); ctx.arc(VC[0], VC[1], VR, 0, 6.283); ctx.fillStyle = '#121A26'; ctx.fill(); ctx.clip(); }
  // ---- hersenweefsel boven: thalamus, daaronder de hypothalamus (wand en bodem van de derde hersenkamer) ----
  // mediaan gezien, voorkant rechts: achter het steeltje het corpus mamillare (bolletje), ervóór de oogzenuwkruising;
  // de bodem van de derde hersenkamer loopt als trechter (recessus) het steeltje in.
  const TOPY = -620;
  const HERSEN = [P(-640, -620), P(640, -620), P(640, -150), P(340, -110), P(250, -62), P(205, -44), P(118, -30), P(80, -20), P(60, 0), P(-60, 0), P(-100, -14), P(-140, -18), P(-210, -24), P(-260, -58), P(-340, -110), P(-640, -150), P(-640, -190)];
  ctx.beginPath(); bioPad(ctx, HERSEN, true); shape(ctx, rgba(BIO.brein, 0.5), rgba(BIO.breinS, 0.8), 2);
  // thalamus (boven), gescheiden van de hypothalamus door de groeve (sulcus hypothalamicus)
  ctx.beginPath(); ctx.ellipse(...P(-70, -330), 230 * s, 70 * s, -0.05, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.45), rgba(BIO.breinD, 0.6), 1.5);
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = 3 * s; ctx.beginPath(); bioPad(ctx, [P(-330, -230), P(-160, -250), P(40, -240), P(220, -210)], false); ctx.stroke();
  // hypothalamus iets donkerder (grijze stof met kernen)
  ctx.beginPath(); bioPad(ctx, [P(-300, -225), P(-60, -245), P(200, -205), P(240, -80), P(118, -38), P(60, -4), P(-60, -4), P(-150, -26), P(-250, -70)], true); ctx.fillStyle = rgba(BIO.breinS, 0.32); ctx.fill();
  // derde hersenkamer: smalle spleet die onderaan als trechter in het steeltje loopt
  ctx.beginPath(); bioPad(ctx, [P(-40, TOPY + 30), P(-26, -230), P(-30, -110), P(-14, -20), P(0, 30), P(14, -20), P(30, -110), P(26, -230), P(40, TOPY + 30)], true); ctx.fillStyle = rgba('#0D1420', 0.55); ctx.fill();
  // corpus mamillare (achter het steeltje) en oogzenuwkruising (vóór het steeltje, witte stof)
  ctx.beginPath(); ctx.ellipse(...P(-185, -20), 40 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  ctx.beginPath(); ctx.ellipse(...P(165, -42), 58 * s, 26 * s, -0.25, 0, 6.283); shape(ctx, rgba(BIO.wit, 0.85), rgba(BIO.breinS, 0.8), 1.5);
  // ---- Turks zadel: bot met dikte (wiggenbeen) ----
  // achterwand (dorsum sellae) met uitsteeksel, bodem onder de hypofyse, voorkant (tuberculum) en daaronder de
  // wiggenbeenholte (lucht). Het zadel omsluit de hypofyse van onder; de hypofyse raakt het bot niet.
  const ZADEL = [P(-330, 115), P(-285, 105), P(-262, 150), P(-270, 250), P(-220, 345), P(-60, 418), P(140, 420), P(290, 345), P(345, 228), P(380, 200), P(640, 205), P(640, 700), P(-640, 700), P(-640, 200)];
  ctx.beginPath(); bioPad(ctx, ZADEL, true); shape(ctx, rgba(BIO.bot, 0.82), BIO.botS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, ZADEL, true); ctx.clip();
  ctx.beginPath(); bioPad(ctx, [P(-210, 505), P(-40, 478), P(200, 478), P(380, 520), P(400, 600), P(250, 650), P(-60, 650), P(-220, 600)], true); shape(ctx, '#2A3348', rgba(BIO.botS, 0.9), 2); // wiggenbeenholte
  for (let i = 0; i < 60; i++) { const px = lerp(-340, 460, hash(i * 3.1 + 7)), py = lerp(140, 470, hash(i * 5.3 + 2)); ctx.beginPath(); ctx.arc(...P(px, py), (2 + 3 * hash(i)) * s, 0, 6.283); ctx.fillStyle = rgba(BIO.botS, 0.45); ctx.fill(); } // sponsachtig bot
  ctx.restore();
  // achterkwab (zenuwweefsel, links) en voorkwab (klierweefsel, rechts)
  const ACHTER = [P(-40, 150), P(-170, 170), P(-215, 250), P(-170, 330), P(-60, 340), P(-10, 280), P(0, 190)];
  ctx.beginPath(); bioPad(ctx, ACHTER, true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  const VOOR = [P(10, 140), P(140, 120), P(270, 170), P(300, 260), P(240, 345), P(90, 370), P(0, 330), P(-10, 240)];
  ctx.beginPath(); bioPad(ctx, VOOR, true); shape(ctx, rgba('#C98A6A', 0.38), rgba('#E0A88A', 0.85), 2.5);
  // cellen in de voorkwab (Voronoi), de gonadotrofe cellen lichten op bij 'aan'
  const pts = []; for (let i = 0; i < 46; i++) { const rr = 16 * Math.sqrt(i + 0.6), an = i * 2.39996; pts.push([150 + Math.cos(an) * rr * 1.25, 250 + Math.sin(an) * rr * 0.95]); }
  const cellen = _bioVoronoi('hypVoor', pts, 20, 3, 20);
  ctx.save(); ctx.beginPath(); bioPad(ctx, VOOR, true); ctx.clip();
  cellen.forEach((c, i) => { const gon = i % 3 === 0; const g = gon ? aan : 0;
    ctx.beginPath(); c.pts.forEach((p, k) => { const q = P(p[0], p[1]); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    shape(ctx, gon ? _mixHex('#D9A48F', '#8FD0E8', g * 0.6) : rgba('#D9A48F', 0.55), rgba('#F2D6C4', 0.5), 1);
    const q = P(c.c[0], c.c[1]); ctx.beginPath(); ctx.arc(q[0], q[1], 4.5 * s, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); });
  ctx.restore();
  // steeltje
  ctx.beginPath(); bioPad(ctx, [P(-60, 0), P(-40, 80), P(-40, 160), P(30, 160), P(40, 80), P(60, 0)], true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  // GnRH-cellen in de hypothalamus met axonen naar de eminentia mediana
  const cel = [[-260, -250], [-120, -290], [210, -270]]; const eind = [];
  cel.forEach(([cx, cy], i) => { const [qx, qy] = P(cx, cy); const e = zenuwcel(ctx, qx, qy, { s: s * 0.9, col: '#B79AE6', naar: P(-16 + i * 16, -20), seed: i + 2, takken: 5, axonDik: 4, puls: puls >= 0 && puls < 0.25 ? puls * 4 : -1 }); eind.push(e); });
  // eerste haarvatnet (bovenaan het steeltje) → poortaders → tweede haarvatnet in de voorkwab
  const PA = [[[-10, -10], [-4, 60], [30, 120], [90, 170], [140, 220]], [[20, -10], [36, 60], [80, 110], [170, 160], [230, 230]]];
  PA.forEach((pa, i) => bloedvat(ctx, pa.map(p => P(p[0], p[1])), 8 * s, t + i * 0.3, { n: 4, cel: 5 * s, speed: 0.12, haarvat: true }));
  ctx.strokeStyle = rgba(BIO.bloed, 0.8); ctx.lineWidth = 3 * s; for (let k = -2; k <= 2; k++) { ctx.beginPath(); bioPad(ctx, [P(-40 + k * 8, -6), P(-20 + k * 12, -30), P(10 + k * 10, -8), P(40 + k * 6, -24)], false); ctx.stroke(); }
  // GnRH-stoot: deeltjes van de axoneinden langs de poortaders naar de voorkwab
  if (puls >= 0) { const u = clamp(puls, 0, 1); for (let i = 0; i < 12; i++) { const pa = PA[i % 2]; const f = clamp(u * 1.25 - (i / 12) * 0.25, 0, 1); if (f <= 0.001 || f >= 0.999) continue;
      const D = bioDicht(pa.map(p => P(p[0], p[1])), 12); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i) - 0.5) * 6 * s, py, 'gnrh', 7 * s, Math.min(1, (1 - f) * 6)); } }
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (opzij, niet door het bot)
  const UIT = [P(250, 250), P(320, 190), P(400, 150), P(520, 120)]; // naar opzij, boven het zadel langs (sinus cavernosus)
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  if (VENSTER) { ctx.restore(); ctx.save(); ctx.beginPath(); ctx.arc(VC[0], VC[1], VR, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 6 * s); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}
