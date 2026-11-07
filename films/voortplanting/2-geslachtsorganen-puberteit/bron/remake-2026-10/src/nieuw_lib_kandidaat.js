// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 1 (testvel-niveau). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, vorm, k] = HORM[soort];
  hormoonVorm(ctx, x, y, r * k, vorm, a, col);
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); } // C8: één deeltje volgen, goud omlijnd (geen gloed)
}

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
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hypothalamusweefsel (boven) als zachte band, met de derde hersenkamer als spleet in het midden
  ctx.beginPath(); bioPad(ctx, [P(-430, -330), P(-200, -360), P(200, -360), P(430, -330), P(430, -70), P(150, -40), P(60, 0), P(-60, 0), P(-150, -40), P(-430, -70)], true);
  shape(ctx, rgba(BIO.brein, 0.32), rgba(BIO.breinS, 0.7), 2);
  ctx.beginPath(); bioPad(ctx, [P(-14, -360), P(-10, -200), P(0, -90), P(10, -200), P(14, -360)], true); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill();
  // Turks zadel (bot) onder de hypofyse
  ctx.beginPath(); bioPad(ctx, [P(-300, 210), P(-250, 330), P(-60, 420), P(140, 420), P(300, 340), P(350, 220)], false); ctx.strokeStyle = rgba(BIO.bot, 0.7); ctx.lineWidth = 16 * s; ctx.stroke();
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
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (naar rechtsonder)
  const UIT = [P(250, 300), P(330, 350), P(420, 420), P(520, 470)];
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}

// =====================================================================================
// MANNELIJKE GESLACHTSORGANEN, mediane doorsnede (zijaanzicht, buik = rechts), OP SCHAAL (1 cm = 14 px bij s = 1).
// Recept (cm): zaadbal 4–5 lang, bijbal 4–5 langs de achterkant; zaadleider ± 30 cm: vanaf de staart van de bijbal
// omhoog in de zaadstreng, door het lieskanaal de buik in, met een boog óver de urineleider naar de ACHTERkant van de
// blaas, verwijdt tot ampulla; zaadblaasje 4–5 × 1,5–2,5 tegen de achterkant van de blaas, boven de prostaat; samen
// vormen ze de spuitbuis die DOOR de prostaat in de urinebuis uitkomt; prostaat 3 × 4 × 5 (walnoot) onder de blaashals
// rond de urinebuis; schaambeen vóór de blaas, endeldarm achter prostaat en zaadblaasjes. Penis in rust ± 9 cm.
// Bron: OpenStax A&P 27.1 (maten zaadbal, route, aandelen sperma); Semmelweis anatomie (zaadleider ± 30 cm, over de
// urineleider, zaadblaasje, prostaat 3 × 4 × 5); Yale Guided Anatomy (zaadleider naar de achterkant van de blaas).
// Bekende fouten: zaadleider die rechtstreeks vanaf de zaadbal naar de prostaat loopt; zaadblaasje vóór de blaas;
// prostaat boven de blaas; zaadleider die in de blaas uitkomt.
// Oorsprong = bovenkant schaambeenvoeg. o.hl = { zaadbal, bijbal, leider, blaasjes, prostaat, blaas, buis, lies } 0..1,
// o.kring 0..1 (kringspier blaashals dicht), o.zw 0..1 (zwellichamen vol), o.dim = lijst van delen die 35 % krijgen.
// Geeft { P(cmX, cmY), route: [...px], naam: {deel: [x,y]} } terug.
// =====================================================================================
const MD = { k: 14 };
const MD_VAS = [[-0.3, 13.6], [-0.75, 11.4], [-0.2, 8.6], [1.3, 5.4], [1.7, 2.2], [1.4, -0.6], [0.4, -2.6], [-1.6, -3.7], [-4.2, -3.6], [-6.6, -2.4], [-7.6, -0.4], [-7.3, 1.6], [-6.5, 3.1], [-5.3, 4.2], [-3.9, 4.9]];
const MD_URE = [[-3.4, 3.1], [-3.4, 4.6], [-3.1, 6.2], [-2.4, 7.3], [-0.9, 7.7], [0.9, 7.2], [2.1, 6.9], [2.6, 8.2], [2.72, 10.5], [2.8, 13.4], [3.0, 14.75]]; // urinebuis langs de onderkant (kant van de balzak) in het kleine zwellichaam
const MD_BIJ = [[0.25, 9.95], [-0.45, 10.6], [-0.75, 12.0], [-0.55, 13.2], [-0.3, 13.6]];
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5) };
  if (a <= 0.01) return { P, route, naam };
  const al = d => (dim.includes(d) ? 0.35 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); shape(ctx, rgba(BIO.huid, 0.13), rgba(BIO.huid, 0.6), 2);
  // endeldarm (achter)
  ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.55); ctx.lineWidth = 3.0 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore();
  // schaambeen(voeg)
  ctx.save(); ctx.globalAlpha *= al('bot'); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.6), BIO.botS, 2); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas)
  ctx.save(); ctx.globalAlpha *= 0.6; ctx.strokeStyle = '#D9C27A'; ctx.lineWidth = 0.45 * k; ctx.beginPath(); bioPad(ctx, Ps([[-9.4, -8.5], [-8.8, -4], [-7.8, -0.6], [-6.9, 0.9]]), false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(C.teal, 0.22), C.teal, 2.5);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.strokeStyle = rgba(C.teal, 0.45); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.5), lighten(C.groen, 0.3), 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba(C.paars, 0.55), lighten(C.paars, 0.3), 2); ctx.restore();
  // zwellichamen + penis (rust ± 9 cm; zw maakt ze iets voller)
  ctx.save(); ctx.globalAlpha *= al('penis'); const zb = 1 + 0.12 * zw;
  ctx.beginPath(); bioPad(ctx, Ps([[0.9, 6.0], [2.6, 6.2], [3.9 * zb, 8.6], [4.05 * zb, 13.0], [3.7, 14.6], [3.1, 14.9], [2.55, 13.8], [2.45, 9.4], [2.0, 7.6], [0.7, 7.0]]), true); shape(ctx, rgba(BIO.huid, 0.22), rgba(BIO.huid, 0.75), 2);
  ctx.beginPath(); bioPad(ctx, Ps([[1.6, 6.3], [2.9, 6.5], [3.8 * zb, 8.8], [3.85 * zb, 12.9], [3.5, 13.6], [3.05, 12.8], [3.0, 9.0], [2.6, 7.2]]), true); shape(ctx, _mixHex('#8A4A48', '#B5302C', zw), rgba('#C97A70', 0.8), 1.2);
  ctx.restore();
  // zaadbal (in de balzak) met kronkelige zaadbuisjes en bijbal langs de achterkant
  ctx.save(); ctx.globalAlpha *= al('balzak'); ctx.beginPath(); bioPad(ctx, Ps([[-0.9, 10.2], [-1.5, 12.4], [-0.9, 14.6], [1.0, 15.3], [2.5, 14.4], [2.6, 12.0], [2.2, 9.9], [0.7, 9.4]]), true); shape(ctx, rgba(BIO.huid, 0.2), rgba(BIO.huid, 0.7), 2); ctx.restore();
  gl(P(1.0, 12.0), 3.0, '#D9A48F', hl.zaadbal || 0);
  ctx.save(); ctx.globalAlpha *= al('zaadbal'); const [zx, zy] = P(1.0, 12.0); ctx.translate(zx, zy); ctx.rotate(0.22); ctx.beginPath(); ctx.ellipse(0, 0, 1.3 * k, 2.2 * k, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.8), lighten('#D9A48F', 0.3), 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A4438', 0.6); ctx.lineWidth = 1.6; for (let r = 0; r < 6; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = (-1 + 2 * u) * 1.2 * k, py = (-1.8 + r * 0.7) * k + Math.sin(u * 22 + r) * 0.22 * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); ctx.restore();
  gl(P(-0.5, 11.8), 1.8, C.oker, hl.bijbal || 0);
  ctx.save(); ctx.globalAlpha *= al('bijbal'); ctx.strokeStyle = C.oker; ctx.lineWidth = 0.75 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_BIJ), false); ctx.stroke(); ctx.restore();
  // zaadleider
  const leid = hl.leider || 0; ctx.save(); ctx.globalAlpha *= al('leider'); ctx.strokeStyle = C.goud; ctx.lineWidth = (0.3 + 0.12 * leid) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke();
  const [ax, ay] = P(-7.25, 1.4); ctx.beginPath(); ctx.ellipse(ax, ay, 0.35 * k, 0.8 * k, 0.3, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); // ampulla
  // lieskanaal (schuine opening in de buikwand)
  if ((hl.lies || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.lies; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; const [lx, ly] = P(1.0, -1.6); ctx.beginPath(); ctx.ellipse(lx, ly, 0.9 * k, 1.8 * k, 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // urinebuis
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = (0.22 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE. Recept: twee zwellichamen (corpora cavernosa) naast elkaar aan de bovenkant, elk met een
// slagader in het midden, samen in een stevig vlies; één kleiner zwellichaam (corpus spongiosum) onderaan met de
// urinebuis erin; huid erom. Bij een erectie lopen de holten van de bovenste zwellichamen vol met bloed: ze worden
// groter en ronder, het vlies spant en drukt de afvoerende aders dicht. Bron: OpenStax A&P 27.1; MSD Manual 'Structure
// of the male reproductive system'. Bekende fouten: één buis; urinebuis in de bovenste zwellichamen.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = r * (1 + 0.22 * vul);
  ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), rgba(BIO.huid, 0.9), 2);
  const cr = R * (0.42 + 0.04 * vul);
  for (const d of [-1, 1]) { const cx = x + d * R * 0.44, cy = y - R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.283); shape(ctx, _mixHex('#7A3E44', '#B02A2A', vul), '#E8D8DE', 2.5 + 1.5 * vul);
    for (let i = 0; i < 22; i++) { const an = i * 2.39996, rr = cr * 0.85 * Math.sqrt((i + 0.5) / 22); const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
      ctx.beginPath(); ctx.arc(px, py, cr * (0.06 + 0.08 * vul), 0, 6.283); ctx.fillStyle = rgba(vul > 0.5 ? '#E05A4A' : '#3A1A22', 0.8); ctx.fill(); }
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.12, 0, 6.283); shape(ctx, '#C2453E', '#F0B0A0', 1.2); }
  const sx = x, sy = y + R * 0.52; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3, R * 0.26, 0, 0, 6.283); shape(ctx, rgba('#9A5A5A', 0.8), '#E8D8DE', 1.5);
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12, R * 0.03, 0, 0, 6.283); ctx.fillStyle = '#C9CED6'; ctx.fill();
  ctx.restore(); return { cav: [x - R * 0.44, y - R * 0.18], spons: [sx, sy], R };
}

// =====================================================================================
// BUITENKANT VROUW (vulva), vooraanzicht, vlak schema. Recept: van boven naar onder in de middellijn: venusheuvel,
// clitoris (eikel met voorhuid) waar de kleine schaamlippen vooraan samenkomen, opening van de urinebuis, opening van
// de vagina, dan het perineum en de anus; grote schaamlippen aan de buitenkant, kleine schaamlippen erbinnen.
// Bron: OpenStax A&P 27.2 ('clitoris waar de kleine schaamlippen vooraan samenkomen'; vaginaopening tussen
// urinebuisopening en anus). Bekende fouten: urinebuis in de vagina; clitoris onder de urinebuis.
// Ontwerpeenheden: ± 260 × 460, oorsprong = vaginaopening. o.hl = { cli, buis, vag, lip } 0..1.
// =====================================================================================
function vulvaSchema(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const naam = { cli: P(0, -128), buis: P(0, -66), vag: P(0, 0), groot: P(-102, -10), klein: P(-44, -40), anus: P(0, 150) };
  if (a <= 0.01) return naam; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const HUID = BIO.huid, D = _bioDonker(HUID, 0.25);
  ctx.beginPath(); ctx.ellipse(...P(0, -168), 105 * s, 40 * s, 0, 0, 6.283); ctx.fillStyle = rgba(HUID, 0.1); ctx.fill(); // venusheuvel
  for (const d of [-1, 1]) { // grote schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 14, -170), P(d * 86, -130), P(d * 108, -10), P(d * 70, 100), P(d * 12, 118), P(d * 28, 40), P(d * 40, -60), P(d * 26, -150)], true);
    shape(ctx, rgba(HUID, 0.5 + 0.2 * (hl.lip || 0)), rgba(D, 0.9), 2); }
  for (const d of [-1, 1]) { // kleine schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 4, -126), P(d * 34, -96), P(d * 44, -20), P(d * 30, 60), P(d * 6, 84), P(d * 14, 10), P(d * 16, -70)], true);
    shape(ctx, rgba('#C98A8A', 0.75), rgba('#A8646A', 0.9), 1.8); }
  ctx.beginPath(); bioPad(ctx, [P(-20, -150), P(0, -158), P(20, -150), P(14, -128), P(-14, -128)], true); shape(ctx, rgba('#C98A8A', 0.85), '#A8646A', 1.5); // voorhuid clitoris
  ctx.beginPath(); ctx.ellipse(...P(0, -128), 9 * s, 8 * s, 0, 0, 6.283); shape(ctx, _mixHex('#E0A08C', '#F2C0B0', hl.cli || 0), '#B86A68', 1.5);
  ctx.beginPath(); ctx.ellipse(...P(0, -66), 4.5 * s, 3 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#5BA4C9', hl.buis || 0), 1.5 + 1.5 * (hl.buis || 0));
  ctx.beginPath(); ctx.ellipse(...P(0, 0), 13 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#E0A08C', hl.vag || 0), 1.5 + 1.5 * (hl.vag || 0));
  ctx.beginPath(); ctx.arc(...P(0, 150), 8 * s, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.6), rgba(D, 0.8), 1.5);
  ctx.restore(); return naam;
}

// ---------- klein: schaalstreep met eenheid voluit ----------
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }
